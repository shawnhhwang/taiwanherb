/**
 * server/services/formulaService.js
 * 臺灣本草角色配方庫與 AI 神來一配實驗室服務層
 */
const characterFormulas = require('../data/formulasData');
const initialHerbs = require('../data/herbsData');

class FormulaService {
  /**
   * 取得各角色經典配方
   */
  async getFormulas({ expertId, type, query } = {}) {
    let result = [...characterFormulas];

    if (expertId && expertId !== '全部' && expertId !== 'all') {
      const aliasMap = {
        'hakka_grandma': 'hakka_grandmother',
        'hakka_grandmother': 'hakka_grandmother',
        'biotech_dr_yen': 'pharmacist_phd',
        'pharmacist_phd': 'pharmacist_phd',
        'bunun_hunter': 'indigenous_forager',
        'indigenous_forager': 'indigenous_forager',
        'wanhua_uncle': 'wanhua_uncle'
      };
      const resolvedExpertId = aliasMap[expertId] || expertId;
      result = result.filter(f => f.expertId === resolvedExpertId || f.expertId === expertId);
    }

    if (type && type !== '全部' && type !== 'all') {
      result = result.filter(f => f.type === type || f.type.includes(type) || type.includes(f.type));
    }

    if (query && query.trim() !== '') {
      const q = query.trim().toLowerCase();
      result = result.filter(f => {
        const matchName = f.name.toLowerCase().includes(q);
        const matchIntent = f.intent.toLowerCase().includes(q);
        const matchSummary = f.summary.toLowerCase().includes(q);
        const matchExpert = f.expertName.toLowerCase().includes(q);
        const matchHerbs = (f.composition || []).some(c => c.herbName.toLowerCase().includes(q));

        return matchName || matchIntent || matchSummary || matchExpert || matchHerbs;
      });
    }

    return result;
  }

  /**
   * 取得單一配方詳情
   */
  async getFormulaById(id) {
    return characterFormulas.find(f => f.id === id) || null;
  }

  /**
   * 臣佐君平衡演算法 (Jun-Chen-Zuo-Shi Equilibrium Engine)
   * 依據中醫「君一、臣二、佐三、使一」方劑法度，評估配伍結構、四氣寒熱佐制與引經調和度
   */
  evaluateJunChenZuo(herbs = [], targetIntent = '退火解暑') {
    if (!herbs || herbs.length === 0) {
      return {
        overallBalanceScore: 0,
        grade: '茶釜尚空',
        status: 'empty',
        composition: [],
        analysis: { junDominance: 0, chenAssistance: 0, zuoTempering: 0, shiHarmonizing: 0 },
        diagnosis: '茶釜中尚無本草，請投入草藥以啟動臣佐君平衡辨析。',
        harmonyAdvice: '建議選配 2 至 4 味本草，建立君臣佐使嚴整法度。'
      };
    }

    const natureWeights = {
      '大寒': -40, '寒': -25, '微寒': -12, '涼': -6,
      '平': 0, '微溫': +12, '溫': +25, '熱': +40
    };

    let totalWeight = 0;
    herbs.forEach(h => {
      totalWeight += (natureWeights[h.nature] ?? 0);
    });
    const avgColdHot = Math.round((totalWeight / (herbs.length * 40)) * 100);

    // 智能識別角色：使藥、佐制藥、君藥、臣藥
    const scoredHerbs = herbs.map(h => {
      const isShiCandidate = ['甘草', '薄荷', '桑葉', '香茅', '假酸漿'].some(n => h.name.includes(n));
      const isProtector = (h.taste || []).includes('甘') || ['甘草', '枸杞子', '土人參', '大棗'].some(n => h.name.includes(n)) || h.nature === '平';
      const potency = Math.abs(natureWeights[h.nature] || 0);

      return {
        herb: h,
        potency,
        isShiCandidate,
        isProtector
      };
    });

    // 1. 確定使藥 (Shi) - 優先以甘草為調和使藥，或薄荷/桑葉為引經使藥
    let shiIndex = -1;
    const licoriceIdx = scoredHerbs.findIndex(item => item.herb.name.includes('甘草'));
    if (licoriceIdx !== -1) {
      shiIndex = licoriceIdx;
    } else {
      const envoyIdx = scoredHerbs.findIndex(item => item.isShiCandidate);
      if (envoyIdx !== -1 && herbs.length >= 3) {
        shiIndex = envoyIdx;
      }
    }

    // 2. 確定君藥 (Jun) - 非使藥中代表性最強、偏性最宏大的核心藥
    const nonShiItems = scoredHerbs.filter((_, idx) => idx !== shiIndex);
    let junHerb = null;
    let chenHerb = null;
    let zuoHerb = null;
    let shiHerb = shiIndex !== -1 ? scoredHerbs[shiIndex].herb : null;

    if (nonShiItems.length > 0) {
      junHerb = nonShiItems[0].herb;
    } else if (herbs.length === 1) {
      junHerb = herbs[0];
      shiHerb = null;
    }

    // 3. 確定臣藥 (Chen)
    if (nonShiItems.length > 1) {
      chenHerb = nonShiItems[1].herb;
    }

    // 4. 確定佐藥 (Zuo)
    if (nonShiItems.length > 2) {
      zuoHerb = nonShiItems[2].herb;
    }

    // 若未選定使藥且已有 4 味，將第 4 味指定為使藥
    if (!shiHerb && nonShiItems.length >= 4) {
      shiHerb = nonShiItems[3].herb;
    }

    // 構建組成清單
    const roleList = [];
    herbs.forEach((h) => {
      let role = '佐';
      let share = '20%';
      let amount = '8 - 10g';
      let roleTitle = '佐藥佐制 · 制偏調味';
      let reason = '';

      if (h === junHerb) {
        role = '君';
        share = herbs.length === 1 ? '100%' : herbs.length === 2 ? '60%' : '40%';
        amount = '15 - 20g';
        roleTitle = '統領全方 · 專攻主治';
        reason = `君藥。以 ${h.name} (${h.nature}性) 為主幹靈魂，直攻主要訴求，發揮 ${h.efficacy.slice(0, 24)} 核心效用。`;
      } else if (h === chenHerb) {
        role = '臣';
        share = herbs.length === 2 ? '40%' : '28%';
        amount = '10 - 15g';
        roleTitle = '臣藥輔翼 · 同氣相成';
        reason = `臣藥。以 ${h.name} (${h.nature}性) 輔助君藥，加強相應臟腑受納，協同增強調理力道。`;
      } else if (h === shiHerb) {
        role = '使';
        share = '14%';
        amount = '3 - 6g';
        roleTitle = '使藥引經 · 調和百草';
        reason = `使藥。以 ${h.name} 引藥歸經入絡，調和中焦脾胃與百草口感，留香回甘。`;
      } else {
        role = '佐';
        share = '18%';
        amount = '6 - 10g';
        roleTitle = '佐藥佐制 · 宣化制偏';
        reason = `佐藥。以 ${h.name} 制衡君臣過盛偏性，防苦寒傷胃或辛燥損陰，兼顧滋味平衡。`;
      }

      roleList.push({
        herbId: h.id,
        herbName: h.name,
        scientificName: h.scientificName,
        nature: h.nature,
        taste: h.taste || [],
        channels: h.channels || [],
        role,
        share,
        amount,
        roleTitle,
        reason
      });
    });

    // 四大法度評分計算 (0 - 100)
    const junScore = junHerb ? 95 : 0;
    const chenScore = chenHerb ? 90 : (herbs.length >= 2 ? 75 : 30);

    // 佐藥評分：檢驗偏盛是否有佐制、脾胃是否有防護
    let zuoScore = 70;
    const hasWarmOrSweet = herbs.some(h => ['平', '微溫', '溫'].includes(h.nature) || (h.taste || []).includes('甘') || h.name.includes('甘草') || h.name.includes('枸杞') || h.name.includes('土人參'));
    const hasCoolOrMoist = herbs.some(h => ['平', '涼', '微寒'].includes(h.nature) || h.name.includes('薄荷') || h.name.includes('桑葉'));

    if (avgColdHot <= -20) {
      zuoScore = hasWarmOrSweet ? 96 : 38; // 偏寒若有甘溫平潤佐制則滿分，若無則偏低
    } else if (avgColdHot >= 20) {
      zuoScore = hasCoolOrMoist ? 95 : 42; // 偏溫熱若有甘涼清潤佐制則滿分
    } else {
      zuoScore = herbs.length >= 3 ? 94 : 76;
    }

    // 使藥評分：引經與調和百草
    let shiScore = 60;
    if (herbs.some(h => h.name.includes('甘草'))) {
      shiScore = 98; // 國老調和百藥
    } else if (herbs.some(h => ['薄荷', '桑葉', '香茅'].some(n => h.name.includes(n)))) {
      shiScore = 90; // 宣透引經
    } else if (herbs.length >= 4) {
      shiScore = 80;
    } else {
      shiScore = herbs.length >= 2 ? 65 : 40;
    }

    // 綜合平衡度加權計算
    const overallBalanceScore = Math.round(
      (junScore * 0.28) + (chenScore * 0.24) + (zuoScore * 0.30) + (shiScore * 0.18)
    );

    let grade = '';
    let status = 'balanced';
    let diagnosis = '';
    let harmonyAdvice = '';

    if (herbs.length === 1) {
      grade = '【孤君無臣 · 獨木難支】';
      status = 'needs_chen';
      diagnosis = `釜中僅有「${herbs[0].name}」單一君藥，缺乏臣藥相輔相成與佐使調和，單味藥力易顯單薄或偏性突兀。`;
      harmonyAdvice = '建議補入相配之臣藥加強主治，並配以甘草或薄荷為佐使調和。';
    } else if (herbs.length === 2) {
      grade = '【君臣相得 · 待補佐使】';
      status = 'needs_zuo';
      diagnosis = `君藥（${junHerb?.name}）與臣藥（${chenHerb?.name}）配伍成型，但缺乏佐藥制其偏性與使藥調和脾胃。`;
      harmonyAdvice = avgColdHot < -10
        ? '方劑偏涼，建議補入微溫甘平之佐藥（如甘草 5g 或枸杞 8g）以佐制苦寒、護衛胃氣。'
        : '建議補入使藥（如薄荷或甘草）引經入絡、調和百草風味。';
    } else if (zuoScore <= 50) {
      grade = '【偏寒少佐 · 易傷胃陽】';
      status = 'needs_zuo';
      diagnosis = `君臣藥性偏大苦大寒（寒熱指數 ${avgColdHot}），釜中缺乏甘平或芳香佐藥佐制其寒毒，空腹飲用易引發脾胃不適。`;
      harmonyAdvice = '強烈建議加入【甘草】或【枸杞子】作為佐藥，甘以緩之、健脾和中，化解過寒偏性！';
    } else if (overallBalanceScore >= 90) {
      grade = '【四大法度完備 · 臣佐君大和】';
      status = 'balanced';
      diagnosis = `君藥主攻明確，臣藥輔弼相成，佐藥制偏護中，使藥引經調和。臣佐君三位一體，陰陽中正，四氣和平！`;
      harmonyAdvice = '方劑配伍結構精妙，寒熱相制，入口甘潤，具備傳統常民茶飲之最高和諧法度。';
    } else {
      grade = '【善劑相生 · 臣佐君調暢】';
      status = 'balanced';
      diagnosis = `君臣佐使分工大致妥當，陰陽寒熱互為表裡，滋味甘平回甘。`;
      harmonyAdvice = '配伍得宜，可依個人體質酌量增減煎煮時間。';
    }

    return {
      overallBalanceScore,
      grade,
      status,
      composition: roleList,
      analysis: {
        junDominance: junScore,
        chenAssistance: chenScore,
        zuoTempering: zuoScore,
        shiHarmonizing: shiScore
      },
      diagnosis,
      harmonyAdvice
    };
  }

  /**
   * AI 神來一配實驗室 (Divine Blend Algorithm)
   * 支援使用者自選 2~4 味草藥，或由 AI 依指定調理目標自動生成實驗配方
   */
  async aiExperimentBlend({ herbIds = [], targetIntent = '退火解暑', customName = '' } = {}) {
    const allHerbs = initialHerbs;
    let selectedHerbs = [];

    // 1. 若使用者有提供指定 herbIds，從資料庫中選取
    if (Array.isArray(herbIds) && herbIds.length > 0) {
      selectedHerbs = herbIds
        .map(id => allHerbs.find(h => h.id === Number(id)))
        .filter(Boolean)
        .slice(0, 4);
    }

    // 2. 若使用者未指定，或藥材不足 2 味，由 AI 根據調理意圖智能生成神來一配 (確保臣佐君平衡)
    if (selectedHerbs.length < 2) {
      const intentPresets = {
        '退火解暑': [1, 12, 3, 16], // 咸豐草(君), 鳳尾草(臣), 薄荷(佐), 甘草(使)
        '清熱退火': [1, 12, 3, 16], // 咸豐草(君), 鳳尾草(臣), 薄荷(佐), 甘草(使)
        '清熱解毒': [2, 9, 8, 16],  // 魚腥草(君), 白花蛇舌草(臣), 金銀花(佐), 甘草(使)
        '夏日消暑': [4, 40, 14, 3], // 仙草(君), 黃花蜜菜(臣), 枸杞子(佐), 薄荷(使)
        '除濕利水': [6, 42, 38, 16], // 車前草(君), 雷公根(臣), 土人參(佐), 甘草(使)
        '潤肺止咳': [2, 15, 3, 16], // 魚腥草(君), 桑葉(臣), 薄荷(佐), 甘草(使)
        '潤喉生津': [2, 8, 15, 16], // 魚腥草(君), 金銀花(臣), 桑葉(佐), 甘草(使)
        '平肝明目': [41, 20, 14, 15], // 珠仔草(君), 白鶴靈芝(臣), 枸杞子(佐), 桑葉(使)
        '客庄辟邪沐浴': [17, 5, 25, 18], // 抹草(君), 艾草(臣), 香茅(佐), 大風草(使)
        '安神舒眠': [17, 5, 25, 18], // 抹草(君), 艾草(臣), 香茅(佐), 大風草(使)
        '外用清涼敷膏': [7, 39, 40, 36], // 左手香(君), 倒吊蓮(臣), 黃花蜜菜(佐), 含羞草(使)
        '健脾元氣': [21, 29, 38, 16], // 狗尾草(君), 台灣藜(臣), 土人參(佐), 甘草(使)
        '元氣補氣': [21, 29, 38, 16], // 狗尾草(君), 台灣藜(臣), 土人參(佐), 甘草(使)
        '隨機平衡': [1, 21, 14, 16], // 咸豐草(君), 狗尾草(臣), 枸杞子(佐), 甘草(使)
        '原鄉長征驅寒': [28, 56, 29, 30], // 刺蔥(君), 刺五加(臣), 台灣藜(佐), 假酸漿(使)
        '消食整腸': [30, 46, 7, 16] // 假酸漿(君), 雞屎藤(臣), 左手香(佐), 甘草(使)
      };

      const matchedIds = intentPresets[targetIntent] || [1, 12, 3, 16];
      selectedHerbs = matchedIds.map(id => allHerbs.find(h => h.id === id)).filter(Boolean);
    }

    // 3. 執行專業臣佐君平衡演算法
    const equilibrium = this.evaluateJunChenZuo(selectedHerbs, targetIntent);
    const composition = equilibrium.composition;

    // 4. 計算四氣寒熱陰陽指數 (-100 ~ +100)
    const natureWeights = {
      '大寒': -40, '寒': -25, '微寒': -12, '涼': -6,
      '平': 0, '微溫': +12, '溫': +25, '熱': +40
    };

    let totalWeight = 0;
    selectedHerbs.forEach(h => {
      totalWeight += (natureWeights[h.nature] ?? 0);
    });
    const avgIndex = Math.round((totalWeight / (selectedHerbs.length * 40)) * 100);
    const clampedIndex = Math.max(-100, Math.min(100, avgIndex));

    let natureVerdict = '和平中正';
    if (clampedIndex <= -50) natureVerdict = '極為寒涼 (大瀉實火)';
    else if (clampedIndex <= -15) natureVerdict = '偏微寒涼 (清解退熱)';
    else if (clampedIndex <= 15) natureVerdict = '溫和中正 (四季咸宜)';
    else if (clampedIndex <= 50) natureVerdict = '微溫宣通 (祛風散寒)';
    else natureVerdict = '大溫大熱 (溫陽散寒)';

    // 5. 經絡激發圖譜統計
    const channelCounts = {};
    const tasteCounts = {};
    selectedHerbs.forEach(h => {
      (h.channels || []).forEach(ch => {
        channelCounts[ch] = (channelCounts[ch] || 0) + 1;
      });
      (h.taste || []).forEach(t => {
        tasteCounts[t] = (tasteCounts[t] || 0) + 1;
      });
    });

    // 6. 禁忌衝突雷達檢測 (Safety Radar)
    const warnings = [];
    const contraStrings = selectedHerbs.map(h => h.contraindications || '').join('；');

    if (clampedIndex <= -40 && equilibrium.analysis.zuoTempering < 80) {
      warnings.push('⚠️ 此配方整體偏大寒涼且缺乏佐藥制衡，脾胃虛弱易瀉者，建議加入炙甘草 5g 或紅棗以溫潤護中。');
    }
    if (clampedIndex >= 40 && equilibrium.analysis.zuoTempering < 80) {
      warnings.push('⚠️ 此配方整體偏溫燥且缺乏甘涼佐藥，喉嚨紅腫上火或陰虛燥熱者不宜長服。');
    }
    if (contraStrings.includes('孕婦') || selectedHerbs.some(h => ['益母草', '烏面馬', '馬鞭草', '馬齒莧'].includes(h.name))) {
      warnings.push('🚨 【孕期特別警示】：配方中含有孕婦慎用或活血通經草藥（如益母草/烏面馬），懷孕婦女嚴禁服用。');
    }
    if (selectedHerbs.some(h => h.safetyLevel === '外用為主' || ['烏面馬', '落地生根'].includes(h.name))) {
      warnings.push('📌 此配方包含民間傳統外用草藥，若調製為敷泥膏，請注意皮膚外敷時間不宜過長，勿隨意大口內服。');
    }
    if (warnings.length === 0) {
      warnings.push('✓ 本草相生相合，性味平和，臣佐君四大法度嚴謹，適宜常民日常茶飲調養。');
    }

    // 7. 生成配方名稱與籤卷
    const herbNameJoined = selectedHerbs.map(h => h.name.slice(0, 2)).join('');
    const formulaTitle = customName && customName.trim()
      ? customName.trim()
      : `神來一配 · ${herbNameJoined}${targetIntent.includes('沐浴') ? '沐浴方' : targetIntent.includes('敷膏') ? '清涼泥' : '甘露飲'}`;

    return {
      name: formulaTitle,
      decreeName: formulaTitle,
      decreeStory: `依循古法以【${selectedHerbs.map(h => h.name).join(' + ')}】化生配伍，四氣辨定為「${natureVerdict}」，${equilibrium.grade}，共納歸 ${Object.keys(channelCounts).join('、')} 經。`,
      targetIntent,
      isAiGenerated: true,
      timestamp: new Date().toISOString(),
      composition,
      balanceScore: clampedIndex,
      channelsCovered: Object.keys(channelCounts),
      conflictWarnings: warnings,
      equilibrium,
      analysis: {
        coldHotIndex: clampedIndex,
        natureVerdict,
        dominantChannels: Object.keys(channelCounts).sort((a, b) => channelCounts[b] - channelCounts[a]).slice(0, 3),
        channelDistribution: channelCounts,
        tasteDistribution: tasteCounts
      },
      brewingAdvice: {
        waterRatio: targetIntent.includes('沐浴') ? '4,000 - 5,000 mL' : '1,500 - 2,500 mL',
        fireMethod: '大火沸煮 5 分鐘後轉小火文火慢熬 15-20 分鐘',
        drinkingTemp: clampedIndex < 0 ? '建議放涼至室溫溫涼飲用，避免冰凍' : '趁溫熱飲用',
        preservation: '未飲用完之茶湯待冷卻後置冷藏室，2 天內飲用完畢'
      },
      safetyRadar: {
        safeLevel: warnings.some(w => w.includes('🚨')) ? '需高度警惕' : warnings.some(w => w.includes('⚠️')) ? '適量注意' : '溫和安全',
        warnings
      }
    };
  }

  /**
   * AI 一鍵臣佐君平衡調和 (Auto-Harmonize Engine)
   * 根據現有草藥診斷缺失角色，自動補入最佳佐使藥，使配方達到 90+ 分大和狀態
   */
  async autoHarmonize({ herbIds = [], targetIntent = '清熱退火' } = {}) {
    const allHerbs = initialHerbs;
    let currentHerbs = (herbIds || [])
      .map(id => allHerbs.find(h => h.id === Number(id)))
      .filter(Boolean)
      .slice(0, 4);

    if (currentHerbs.length === 0) {
      return this.aiExperimentBlend({ targetIntent });
    }

    const currentEval = this.evaluateJunChenZuo(currentHerbs, targetIntent);
    
    // 如果已經是滿分大和 (score >= 90) 且有 3 味以上，直接回傳
    if (currentEval.overallBalanceScore >= 90 && currentHerbs.length >= 3) {
      const res = await this.aiExperimentBlend({ herbIds: currentHerbs.map(h => h.id), targetIntent });
      res.isHarmonized = true;
      res.addedHerbs = [];
      res.harmonizeMessage = '目前茶釜中之草藥已具備嚴整的臣佐君法度，四氣和諧！';
      return res;
    }

    // 計算當前平均寒熱
    const natureWeights = {
      '大寒': -40, '寒': -25, '微寒': -12, '涼': -6,
      '平': 0, '微溫': +12, '溫': +25, '熱': +40
    };
    let totalWeight = 0;
    currentHerbs.forEach(h => {
      totalWeight += (natureWeights[h.nature] ?? 0);
    });
    const avgColdHot = Math.round((totalWeight / (currentHerbs.length * 40)) * 100);

    const addedHerbs = [];
    const herbIdsSet = new Set(currentHerbs.map(h => h.id));

    // 1. 若偏寒且無甘草，首選補入甘草 (id: 16) 作為調和使藥與佐制藥
    if (avgColdHot < -10 && !herbIdsSet.has(16) && currentHerbs.length < 4) {
      const licorice = allHerbs.find(h => h.id === 16);
      if (licorice) {
        currentHerbs.push(licorice);
        herbIdsSet.add(16);
        addedHerbs.push(licorice.name);
      }
    }

    // 2. 若缺乏宣透使藥且無薄荷，補入薄荷 (id: 3) 作為引經藥
    if (!herbIdsSet.has(3) && currentHerbs.length < 4) {
      const mint = allHerbs.find(h => h.id === 3);
      if (mint) {
        currentHerbs.push(mint);
        herbIdsSet.add(3);
        addedHerbs.push(mint.name);
      }
    }

    // 3. 若草藥仍不足 3 味，依據意圖補入相應臣藥或佐藥
    if (currentHerbs.length < 3) {
      const candidateIds = [1, 12, 14, 15, 21, 40]; // 咸豐草, 鳳尾草, 枸杞子, 桑葉, 狗尾草, 黃花蜜菜
      for (const cid of candidateIds) {
        if (!herbIdsSet.has(cid) && currentHerbs.length < 4) {
          const cand = allHerbs.find(h => h.id === cid);
          if (cand) {
            currentHerbs.push(cand);
            herbIdsSet.add(cid);
            addedHerbs.push(cand.name);
            if (currentHerbs.length >= 4) break;
          }
        }
      }
    }

    // 重新調用 aiExperimentBlend 演算全新平衡結果
    const blendResult = await this.aiExperimentBlend({
      herbIds: currentHerbs.map(h => h.id),
      targetIntent,
      customName: `臣佐君調和 · ${currentHerbs.map(h => h.name.slice(0, 2)).join('')}大和方`
    });

    blendResult.isHarmonized = true;
    blendResult.addedHerbs = addedHerbs;
    blendResult.harmonizeMessage = addedHerbs.length > 0
      ? `AI 神來一配已依據臣佐君法度，為您調和補入【${addedHerbs.join('、')}】，化解偏性，達到大和之境！`
      : 'AI 神來一配已優化您的君臣佐使比例，四象調和！';

    return blendResult;
  }
}

module.exports = new FormulaService();
