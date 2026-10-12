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

    // 2. 若使用者未指定，或藥材不足 2 味，由 AI 根據調理意圖智能生成神來一配
    if (selectedHerbs.length < 2) {
      const intentPresets = {
        '退火解暑': [1, 12, 3, 16], // 咸豐草, 鳳尾草, 薄荷, 甘草
        '清熱解毒': [2, 9, 8, 16],  // 魚腥草, 白花蛇舌草, 金銀花, 甘草
        '潤肺止咳': [2, 15, 3, 16], // 魚腥草, 桑葉, 薄荷, 甘草
        '平肝明目': [41, 26, 14, 15], // 珠仔草, 台灣油菊, 枸杞子, 桑葉
        '客庄辟邪沐浴': [17, 5, 25, 18], // 抹草, 艾草, 香茅, 大風草
        '外用清涼敷膏': [7, 39, 40, 36], // 左手香, 倒吊蓮, 黃花蜜菜, 含羞草
        '健脾元氣': [21, 29, 38, 16], // 狗尾草, 台灣藜, 土人參, 甘草
        '原鄉長征驅寒': [28, 56, 29, 30], // 刺蔥, 刺五加, 台灣藜, 假酸漿
        '消食整腸': [30, 46, 7, 16] // 假酸漿, 雞屎藤, 左手香, 甘草
      };

      const matchedIds = intentPresets[targetIntent] || [1, 19, 3, 16];
      selectedHerbs = matchedIds.map(id => allHerbs.find(h => h.id === id)).filter(Boolean);
    }

    // 3. 君臣佐使角色指派與分析
    const roleLabels = ['君', '臣', '佐', '使'];
    const composition = selectedHerbs.map((herb, idx) => {
      let role = roleLabels[idx] || '佐';
      let reason = '';
      if (idx === 0) {
        role = '君';
        reason = `君藥。以 ${herb.name} (${herb.nature}性) 為主幹核心，主攻 ${herb.efficacy.slice(0, 24)}。`;
      } else if (idx === 1) {
        role = '臣';
        reason = `臣藥。輔助君藥，以 ${herb.nature}性 入${(herb.channels || [])[0] || '心'}經，加強調理力道。`;
      } else if (idx === selectedHerbs.length - 1 && (herb.name.includes('甘草') || herb.nature === '平' || herb.nature === '溫')) {
        role = '使';
        reason = `使藥。調和諸藥藥性，引藥歸經，護持脾胃。`;
      } else {
        role = '佐';
        reason = `佐藥。協助制衡藥性偏頗，兼顧滋味平衡。`;
      }

      return {
        herbId: herb.id,
        herbName: herb.name,
        scientificName: herb.scientificName,
        nature: herb.nature,
        taste: herb.taste || [],
        channels: herb.channels || [],
        role,
        amount: idx === 0 ? '15 - 20g' : idx === 1 ? '10 - 15g' : '5 - 10g',
        reason
      };
    });

    // 4. 計算四氣寒熱陰陽指數 (-100 ~ +100)
    const natureWeights = {
      '大寒': -40,
      '寒': -25,
      '微寒': -12,
      '涼': -6,
      '平': 0,
      '微溫': +12,
      '溫': +25,
      '熱': +40
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

    if (clampedIndex <= -40) {
      warnings.push('⚠️ 此配方整體偏大寒涼，若空腹飲用或容易胃痛腹瀉者，建議加入炙甘草 5g 或紅棗 2 枚以調和中焦胃氣。');
    }
    if (clampedIndex >= 40) {
      warnings.push('⚠️ 此配方整體偏溫熱，體內有實熱火氣、喉嚨紅腫發炎或高血壓者不宜長期連續飲用。');
    }
    if (contraStrings.includes('孕婦') || selectedHerbs.some(h => ['益母草', '烏面馬', '馬鞭草', '馬齒莧'].includes(h.name))) {
      warnings.push('🚨 【孕期特別警示】：配方中含有孕婦慎用或活血通經草藥（如益母草/烏面馬），懷孕婦女嚴禁服用。');
    }
    if (selectedHerbs.some(h => h.safetyLevel === '外用為主' || ['烏面馬', '落地生根'].includes(h.name))) {
      warnings.push('📌 此配方包含民間傳統外用草藥，若調製為敷泥膏，請注意皮膚外敷時間不宜過長，勿隨意大口內服。');
    }
    if (warnings.length === 0) {
      warnings.push('✓ 本草相生相合，性味平和，無明顯配伍衝突，適宜常民日常茶飲調養。');
    }

    // 7. 生成配方名稱與籤卷
    const herbNameJoined = selectedHerbs.map(h => h.name.slice(0, 2)).join('');
    const formulaTitle = customName && customName.trim()
      ? customName.trim()
      : `神來一配 · ${herbNameJoined}${targetIntent.includes('沐浴') ? '沐浴方' : targetIntent.includes('敷膏') ? '清涼泥' : '甘露飲'}`;

    return {
      name: formulaTitle,
      decreeName: formulaTitle,
      decreeStory: `依循古法以【${selectedHerbs.map(h => h.name).join(' + ')}】化生配伍，四氣辨定為「${natureVerdict}」，共納歸 ${Object.keys(channelCounts).join('、')} 經。`,
      targetIntent,
      isAiGenerated: true,
      timestamp: new Date().toISOString(),
      composition,
      balanceScore: clampedIndex,
      channelsCovered: Object.keys(channelCounts),
      conflictWarnings: warnings,
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
}

module.exports = new FormulaService();
