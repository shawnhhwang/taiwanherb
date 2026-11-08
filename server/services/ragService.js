/**
 * server/services/ragService.js
 * 台灣本草知識庫 RAG (Retrieval-Augmented Generation) 語意檢索與特定專家語意生成服務
 */
const herbRepository = require('../repositories/herbRepository');
const llmService = require('./llmService');
const medicinalDietData = require('../data/medicinalDietData');
const characterFormulas = require('../data/formulasData');

// 四大特色本草專家 Persona 設定 (黃世勳教授為真實學者，其餘三位為常民文化虛擬人物)
const EXPERTS = {
  wanhua_uncle: {
    id: 'wanhua_uncle',
    name: '林萬吉 老茶師',
    title: '萬華西昌街百年青草巷第三代傳人',
    avatar: '🍵',
    seal: '知識助理',
    isRealExpert: false,
    characterType: '知識聊天助理',
    region: '台北萬華西昌街青草巷',
    tone: '道地艋舺長輩口吻、親切溫厚、富含台灣青草傳統火候與民間經驗（數位虛擬風土角色）',
    catchphrase: '「草木有靈，冷暖在心。青草茶愛用慢火熬，退火退癀，莫傷著胃底氣。」',
    greeting: '阿兄／阿姐，坐喔！來萬華西昌街青草巷泡杯茶傾聽草木香。',
    expertise: ['萬華傳統青草茶', '退火退癀消暑', '煎煮火候心法', '四季青草茶飲配伍']
  },
  hakka_grandmother: {
    id: 'hakka_grandmother',
    name: '彭秀妹 老藥師',
    title: '苗栗獅潭客庄本草與草藥洗浴實踐者',
    avatar: '👵',
    seal: '知識助理',
    isRealExpert: false,
    characterType: '知識聊天助理',
    region: '苗栗獅潭與三義客家山莊',
    tone: '溫暖慈祥的客家長輩口吻、重視天地自然賞賜、抹草辟邪、大風草坐月子與家常食療（數位虛擬風土角色）',
    catchphrase: '「阿妹阿弟呀，山頂這兜青草儕儕是寶，抹草淨心、大風草暖骨，天地賞賜莫浪費。」',
    greeting: '阿妹阿弟呀，入來食茶！山頂風大，先喝一口甘茶暖暖身。',
    expertise: ['客家辟邪抹草沐浴', '大風草產後調養', '紫蘇桑葉家常食療', '四時山林採草經驗']
  },
  pharmacist_phd: {
    id: 'pharmacist_phd',
    name: '黃世勳 教授 / 藥學博士',
    title: '中國醫藥大學 藥學院藥學系 教授・前系主任 / 藥學博士',
    avatar: '🎓',
    seal: '產學合作學者',
    isRealExpert: true,
    collaborationNote: '本專案與中國醫藥大學 藥學系黃世勳教授產學合作共同策劃典藏',
    characterType: '產學合作真實學者・本草AI顧問',
    institution: '中國醫藥大學 藥學院藥學系',
    degree: '中國醫藥大學 藥學博士',
    profileUrl: 'https://webap.cmu.edu.tw/TchEportfolio/index_1/sshuang',
    heritage: '出身彰化縣鹿港鎮望族 · 致力臺灣本草三十餘載 · 著作逾百部',
    leadership: '創立與擔任多項藥用植物、本草學術及公益慈善社團理事長與幹部',
    region: '彰化鹿港文風底蘊 ‧ 台中中國醫藥大學水湳校區',
    tone: '鹿港望族溫文儒雅與深厚文風涵養，結合三十餘年全臺山野踏查實證、現代藥用植物學理，與創辦藥學慈善社團之仁心濟世精神（真實專家學者）',
    catchphrase: '「出身鹿港古風，踏查臺灣草木三十餘載。以經籍為本，以田野為師；融古貫今，心存仁善，方顯草木濟世之大美。」',
    greeting: '您好，我是黃世勳。出身彰化鹿港，研索臺灣本草與藥用植物三十餘載，走遍全島高山野嶺與海濱平原。讓我們以田野考證之真、現代生藥之理，結合博愛仁心探尋草木調和性命之常道。',
    expertise: [
      '臺灣藥用植物調查研究三十餘載',
      '本草學古籍典籍考證',
      '生藥學與天然物化學機轉',
      '中藥藥理學與臨床交互作用',
      '逾百部本草學術專著心血',
      '藥學社團與慈善文教濟世實踐'
    ]
  },
  indigenous_forager: {
    id: 'indigenous_forager',
    name: '督邁 (Dumay) 達人',
    title: '花東縱谷阿美族野菜採集與山林智慧守護者',
    avatar: '🏹',
    seal: '知識助理',
    isRealExpert: false,
    characterType: '知識聊天助理',
    region: '花蓮太魯閣山麓與台東海岸山脈',
    tone: '豪邁質樸、貼近土地母體、山林採集倫理、原民野菜烹調與身心元氣共鳴（數位虛擬風土角色）',
    catchphrase: '「走進山林要先敬畏祖靈。刺蔥的香氣像朝陽，野苦瓜的甘苦像泥土，大地會賜給我們力量。」',
    greeting: 'Sa\'icelen！朋友，聞到太平洋的海風與山林的刺蔥香氣了嗎？歡迎來到大地餐桌。',
    expertise: ['原住民傳統野生草本', '刺蔥昭和草野炊料理', '山林永續採集倫理', '自然共生體質調和']
  },
  yaoshan_master: {
    id: 'yaoshan_master',
    name: '李昭瑩 藥膳食療名師',
    title: '《藥膳學》編著者 · 漢方食療與廚藝養生名師',
    avatar: '🍲',
    seal: '產學名師',
    isRealExpert: true,
    collaborationNote: '《藥膳學》（李昭瑩、王儀絜、黃世勳 編著，文興出版）權威食療依據',
    characterType: '產學合作權威專家・藥膳食療顧問',
    region: '臺灣中醫藥膳學術典藏 · 餐桌上的養生之道',
    tone: '典雅溫厚、精通四氣五味、深諳食材與藥材的廚藝火候搭配，專精以食養生、醫食同源（真實權威學者名師）',
    catchphrase: '「安身之本，必資於食；不知食宜者，不足以存生。藥借食力，食助藥威，方是餐桌上的健康之道。」',
    greeting: '您好！我是李昭瑩。在《藥膳學》中，我們將四氣五味、二十四節氣與日常生活食材嚴謹結合。餐桌就是最好的養生堂，讓我們一同探尋道地藥膳與食材調補的美味精華！',
    expertise: [
      '《藥膳學》常用藥材與食材食療考證',
      '四氣五味與臟腑調補配伍',
      '隔水燉、蒸、煨、扣等古法廚藝工藝',
      '衛福部公告215項可供食品中藥材應用',
      '臟腑部位食材（天麻燉豬腦、杜仲豬腰等）對應調養',
      '四季家庭防病延年養生膳食設計'
    ]
  },
  kenshin_guide: {
    id: 'kenshin_guide',
    name: '肯信小助手（平台導航員）',
    title: '臺灣肯信本草研究室 · 智慧領航與功能導覽顧問',
    avatar: '🧭',
    seal: '系統導覽',
    isRealExpert: false,
    characterType: '系統功能問答與操作領航員',
    region: '台灣肯信本草研究室 全數位空間',
    tone: '親切專業、條理清晰，深諳全站各功能模組操作路徑與風土實踐情境，能精確對照使用者需求指出最佳操作工具',
    catchphrase: '「草木有靈，工欲善其事。告訴我您的需求，我為您指引最適合的本草功能與操作路徑！」',
    greeting: '您好！我是本草研究室的「肯信小助手」。無論您想找特定功效草藥、探索台灣風土產區、親手調配茶飲、尋訪老字號青草舖、購閱經典著作，或是使用管理後台進行批次管理，我都隨時為您導覽最合適的功能！請問您今天想完成什麼需求呢？',
    expertise: [
      '全站 10 大功能模組導覽',
      '需求情境最佳工具配對',
      '本草知識庫多維篩選教學',
      '方劑實驗室調配與計時指引',
      '青草名店文化名錄與採買避坑',
      '草木書閣試閱與購書流程',
      '管理後台批次匯入與文章生成'
    ]
  }
};

class RagService {
  constructor() {
    this.experts = { ...EXPERTS };
  }

  /**
   * 取得所有專家列表
   */
  getExperts() {
    return Object.values(this.experts);
  }

  /**
   * 取得特定專家詳情
   */
  getExpert(expertId) {
    const aliasMap = {
      'hakka_grandma': 'hakka_grandmother',
      'biotech_dr_yen': 'pharmacist_phd',
      'bunun_hunter': 'indigenous_forager'
    };
    const resolvedId = aliasMap[expertId] || expertId;
    return this.experts[resolvedId] || this.experts.wanhua_uncle;
  }

  /**
   * 新增自訂專家 Persona (供後台管理)
   */
  createExpert(data) {
    const id = data.id || `custom_expert_${Date.now()}`;
    if (this.experts[id]) {
      throw new Error(`專家 ID「${id}」已存在`);
    }

    const newExpert = {
      id,
      name: data.name || '新進本草顧問',
      title: data.title || '臺灣本草生活觀察家',
      avatar: data.avatar || '🍃',
      seal: data.seal || '草木新篇',
      region: data.region || '臺灣全島自然境域',
      tone: data.tone || '溫和親切、深入淺出、尊重天地草木',
      catchphrase: data.catchphrase || '「天地有大美而不言，一草一木皆有其滋味。」',
      greeting: data.greeting || '您好！歡迎來到本草茶席，讓我們一同探尋草木智慧。',
      expertise: Array.isArray(data.expertise) ? data.expertise : (data.expertise ? data.expertise.split(/[,、]/) : ['家常青草應用', '四季養生茶']),
      systemPrompt: data.systemPrompt || '',
      topK: parseInt(data.topK, 10) || 3,
      isCustom: true
    };

    this.experts[id] = newExpert;
    return newExpert;
  }

  /**
   * 更新特定專家設定 (供後台管理)
   */
  updateExpert(expertId, data) {
    if (!this.experts[expertId]) return null;
    this.experts[expertId] = {
      ...this.experts[expertId],
      ...data,
      id: expertId
    };
    return this.experts[expertId];
  }

  /**
   * 刪除自訂專家 (內建 4 大專家保護不可刪除)
   */
  deleteExpert(expertId) {
    if (!this.experts[expertId]) {
      throw new Error(`找不到 ID 為 ${expertId} 的專家`);
    }

    const builtInIds = ['wanhua_uncle', 'hakka_grandmother', 'pharmacist_phd', 'indigenous_forager', 'yaoshan_master', 'kenshin_guide'];
    if (builtInIds.includes(expertId)) {
      throw new Error('系統內建核心風土專家與導航助手不可刪除，僅可微調設定');
    }

    delete this.experts[expertId];
    return true;
  }

  /**
   * 重設專家列表為預設種子狀態
   */
  resetExperts() {
    this.experts = { ...EXPERTS };
    return Object.values(this.experts);
  }

  /**
   * 專家 RAG 測試沙盒 (Playground)
   */
  async testPlayground({ expertId = 'wanhua_uncle', query, systemPromptOverride, topK = 3 }) {
    if (!query || query.trim() === '') {
      throw new Error('請輸入欲測試之本草諮詢提問');
    }

    const expert = { ...this.getExpert(expertId) };
    if (systemPromptOverride) {
      expert.systemPrompt = systemPromptOverride;
    }

    const retrieved = await this.retrieveContext(query);
    const sliced = retrieved.slice(0, Math.min(topK || 3, retrieved.length));

    const citations = sliced.map(({ herb, reason, score }) => ({
      id: herb.id,
      name: herb.name,
      scientificName: herb.scientificName,
      category: herb.category,
      nature: herb.nature,
      channels: herb.channels,
      folkApplication: herb.folkApplication,
      safetyLevel: herb.safetyLevel,
      relevanceScore: score,
      relevanceReason: reason
    }));

    const reply = this.synthesizeExpertReply(expert, query, sliced);
    const suggestedQuestions = this.generateSuggestedQuestions(expert, sliced);

    // 建立 Context 提示詞除錯預覽
    const contextPromptPreview = sliced.map((item, idx) => 
      `[知識條目 ${idx + 1}] ${item.herb.name} (${item.herb.scientificName}) | 產區: ${item.herb.region} | 性味: ${item.herb.nature} | 功效: ${item.herb.efficacy}`
    ).join('\n');

    return {
      expert,
      query,
      topK: sliced.length,
      retrievedHerbs: citations,
      contextPromptPreview,
      reply,
      suggestedQuestions,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * 執行 RAG 檢索：根據使用者問題與體質，檢索 Top-K 台灣本土草藥
   */
  async retrieveContext(query) {
    const allHerbsRes = await herbRepository.searchHerbs({ limit: 100, status: 'all' });
    const herbs = allHerbsRes.items;

    const q = (query || '').toLowerCase();

    // 概念同義詞對照權重表
    const conceptRules = [
      {
        keywords: ['喉嚨', '咽喉', '咳嗽', '扁桃腺', '沙啞', '開音', '失聲', '痰'],
        targetHerbs: ['薄荷', '魚腥草', '金銀花', '左手香', '穿心蓮', '桑葉']
      },
      {
        keywords: ['退火', '火氣', '嘴破', '口乾', '中暑', '燥熱', '發炎', '青春痘', '痘痘', '消炎', '熱氣'],
        targetHerbs: ['大花咸豐草', '魚腥草', '穿心蓮', '鳳尾草', '仙草', '白鶴靈芝', '山苦瓜', '白花蛇舌草']
      },
      {
        keywords: ['避邪', '辟邪', '驚嚇', '收驚', '洗澡', '沐浴', '端午', '淨身', '淨化', '小兒哭鬧'],
        targetHerbs: ['抹草', '艾草', '香茅']
      },
      {
        keywords: ['月子', '坐月子', '產後', '吹風', '頭風', '關節酸', '驅風', '寒氣', '筋骨'],
        targetHerbs: ['大風草', '艾草', '食茱萸', '紫蘇']
      },
      {
        keywords: ['開胃', '胃口', '食慾', '消化', '胃寒', '小兒', '轉骨', '長不高', '發育', '健脾', '土雞'],
        targetHerbs: ['狗尾草', '紫蘇', '食茱萸', '甘草']
      },
      {
        keywords: ['野菜', '原住民', '山林', '野外', '野炊', '部落', '刺蔥', '飛機草'],
        targetHerbs: ['食茱萸', '昭和草', '山苦瓜']
      },
      {
        keywords: ['青草茶', '配方', '涼茶', '解渴', '甘甜', '回甘', '熬煮', '仙草茶'],
        targetHerbs: ['大花咸豐草', '鳳尾草', '仙草', '白鶴靈芝', '薄荷', '甘草']
      },
      {
        keywords: ['疲勞', '眼睛', '酸澀', '螢幕', '上班族', '熬夜', '氣虛', '精神差', '抗氧化'],
        targetHerbs: ['黃耆', '枸杞子', '桑葉', '甘草']
      },
      {
        keywords: ['傷口', '蚊蟲', '止癢', '跌打', '紅腫', '外敷'],
        targetHerbs: ['左手香', '雷公根', '艾草']
      },
      {
        keywords: ['排濕', '水腫', '利尿', '小便', '水份', '濕氣'],
        targetHerbs: ['車前草', '雷公根', '大花咸豐草', '白花蛇舌草']
      }
    ];

    // 為每味草藥計算相關度得分
    const scoredHerbs = herbs.map(herb => {
      let score = 0;
      const reasons = [];

      // 1. 直接關鍵字匹配
      if (q.includes(herb.name.toLowerCase())) {
        score += 15;
        reasons.push(`提問精準提及草藥名「${herb.name}」`);
      }
      (herb.commonNames || []).forEach(cn => {
        if (q.includes(cn.toLowerCase())) {
          score += 10;
          reasons.push(`匹配常見俗名「${cn}」`);
        }
      });
      (herb.dialectNames || []).forEach(d => {
        if (q.includes(d.name.toLowerCase())) {
          score += 10;
          reasons.push(`匹配${d.dialect}名稱「${d.name}」`);
        }
      });

      // 2. 概念規則比對
      conceptRules.forEach(rule => {
        const hitKeywords = rule.keywords.filter(k => q.includes(k));
        if (hitKeywords.length > 0 && rule.targetHerbs.includes(herb.name)) {
          score += hitKeywords.length * 4;
          reasons.push(`符合生活情境症狀【${hitKeywords.join('、')}】`);
        }
      });

      // 3. 功效與標籤文本比對
      if ((herb.efficacy || '').toLowerCase().includes(q)) score += 3;
      (herb.tags || []).forEach(t => {
        if (q.includes(t.toLowerCase())) score += 3;
      });
      if ((herb.folkApplication || '').toLowerCase().includes(q)) score += 4;
      if ((herb.terroir || '').toLowerCase().includes(q)) score += 2;

      return {
        herb,
        score,
        reason: reasons[0] || `關聯台灣民間本草「${herb.name}」之藥理特質`
      };
    });

    // 4. 《藥膳學》食材與藥膳食譜檢索匹配 (Pages 15-59)
    const medicinalMatches = medicinalDietData.map(item => {
      let score = 0;
      const reasons = [];

      if (q.includes(item.name.toLowerCase())) {
        score += 20;
        reasons.push(`精準匹配《藥膳學》品項「${item.name}」(${item.bookRef})`);
      }
      if (item.medicinalDiet && item.medicinalDiet.split(/[、，, ]/).some(d => d.trim() && q.includes(d.trim()))) {
        score += 15;
        reasons.push(`匹配《藥膳學》道地食譜「${item.medicinalDiet}」`);
      }
      if (item.indications && q.split(/[，, 、]/).some(part => part.length >= 2 && item.indications.includes(part))) {
        score += 8;
        reasons.push(`符合《藥膳學》記載之主治條目`);
      }
      if (item.natureFlavor && q.split(/[，, 、]/).some(part => part.length >= 2 && item.natureFlavor.includes(part))) {
        score += 6;
        reasons.push(`符合《藥膳學》四氣五味歸經記載`);
      }

      // 轉換成與 Herb 格式相容的物件結構
      const herbAdapted = {
        id: item.id,
        name: item.name,
        scientificName: item.subCategory || '《藥膳學》典藏食療',
        category: item.categoryName,
        nature: item.natureFlavor,
        taste: [item.natureFlavor || '甘平'],
        channels: [item.chapter || '藥膳學'],
        efficacy: item.functions,
        folkApplication: item.medicinalDiet ? `【經典藥膳食譜】${item.medicinalDiet}（${item.bookRef}）` : `【食療功效】${item.functions}（${item.bookRef}）`,
        safetyLevel: item.quality ? `【品質評鑑】${item.quality}` : '常服食補',
        contraindications: item.notes || '依體質適量食用',
        region: item.bookRef,
        isMedicinalDiet: true,
        dietItem: item
      };

      return {
        herb: herbAdapted,
        score,
        reason: reasons[0] || `依據《藥膳學》${item.page ? `第${item.page}頁` : ''}之食療記載`
      };
    }).filter(m => m.score > 0);

    // 依分數降冪排序草藥庫與藥膳庫
    scoredHerbs.sort((a, b) => b.score - a.score);
    medicinalMatches.sort((a, b) => b.score - a.score);

    // 檢索角色傳承配方庫 (含李昭瑩名師 25 道藥膳名方)
    const formulaMatches = characterFormulas.map(form => {
      let score = 0;
      const reasons = [];
      const fName = form.name.toLowerCase();
      const fIntent = (form.intent || '').toLowerCase();
      const fSummary = (form.summary || '').toLowerCase();
      const fType = (form.typeName || '').toLowerCase();

      if (q.includes(fName) || fName.includes(q)) {
        score += 30;
        reasons.push(`精準匹配《藥膳學》傳承配方「${form.name}」(${form.sourceBook || '名方庫'})`);
      } else if (fName.split('').some((_, i) => i < fName.length - 1 && q.includes(fName.slice(i, i + 2)))) {
        score += 15;
        reasons.push(`匹配藥膳名方「${form.name}」關鍵成分`);
      }
      if (q.split(/[，, 、]/).some(part => part.length >= 2 && fIntent.includes(part))) {
        score += 12;
        reasons.push(`符合配方主治條目「${form.intent.slice(0, 18)}」`);
      }
      if (form.composition && form.composition.some(c => q.includes(c.herbName.toLowerCase()))) {
        score += 10;
        reasons.push(`方中含匹配藥材`);
      }

      const herbAdapted = {
        id: form.id,
        name: form.name,
        scientificName: `${form.expertName} · ${form.typeName}`,
        category: form.typeName || '角色傳承名方',
        nature: '配伍調和',
        taste: ['甘潤'],
        channels: [form.typeName],
        efficacy: form.intent,
        folkApplication: `【配方組成】${(form.composition || []).map(c => `${c.herbName}(${c.role}:${c.amount})`).join('、')}。${form.preparation || ''}`,
        safetyLevel: form.badge || '傳承名方',
        contraindications: form.contraindications || '依體質適量服用',
        region: form.sourceBook || '臺灣本草傳承名方庫',
        isFormula: true,
        sourceBook: form.sourceBook,
        page: form.page,
        formulaItem: form
      };

      return {
        herb: herbAdapted,
        score,
        reason: reasons[0] || `符合「${form.name}」調理方向`
      };
    }).filter(f => f.score > 0);

    formulaMatches.sort((a, b) => b.score - a.score);

    // 若有高分的藥膳配方或食材命中，將其混編至檢索結果最前列
    let combined = [];
    if (formulaMatches.length > 0 && formulaMatches[0].score >= 20) {
      combined = [formulaMatches[0], ...medicinalMatches.slice(0, 2), ...scoredHerbs.filter(s => s.score > 0).slice(0, 1)];
    } else if (medicinalMatches.length > 0) {
      combined = [...medicinalMatches.slice(0, 2), ...formulaMatches.slice(0, 1), ...scoredHerbs.filter(s => s.score > 0).slice(0, 1)];
    } else {
      combined = scoredHerbs.filter(s => s.score > 0).slice(0, 3);
    }

    let selected = combined.slice(0, 3);
    if (selected.length === 0) {
      // 預設經典台灣本草
      selected = [
        { herb: herbs.find(h => h.name === '大花咸豐草') || herbs[0], score: 5, reason: '台灣最富代表性民間百草茶底蘊' },
        { herb: herbs.find(h => h.name === '甘草') || herbs[1], score: 4, reason: '調和諸藥、甘潤脾胃之國老' },
        { herb: herbs.find(h => h.name === '薄荷') || herbs[2], score: 3, reason: '清涼解表、通透芳香' }
      ];
    }

    return selected;
  }

  /**
   * 核心 RAG 諮詢問答生成
   */
  async consult({ message, expertId = 'wanhua_uncle' }) {
    if (!message || message.trim() === '') {
      throw new Error('請輸入欲諮詢的草藥或生活體質問題');
    }

    const expert = this.getExpert(expertId);
    const retrieved = await this.retrieveContext(message);

    // 格式化引用資料 (Citations)
    const citations = retrieved.map(({ herb, reason }) => ({
      id: herb.id,
      name: herb.name,
      scientificName: herb.scientificName,
      category: herb.category,
      nature: herb.nature,
      channels: herb.channels,
      partsUsed: herb.partsUsed,
      folkApplication: herb.folkApplication,
      safetyLevel: herb.safetyLevel,
      thumbnailUrl: herb.thumbnailUrl,
      region: herb.region,
      bookRef: herb.formulaItem ? (herb.formulaItem.sourceBook || '《藥膳學》') : (herb.dietItem ? herb.dietItem.bookRef : (herb.region || null)),
      page: herb.formulaItem ? herb.formulaItem.page : (herb.dietItem ? herb.dietItem.page : null),
      medicinalDiet: herb.formulaItem ? herb.formulaItem.summary : (herb.dietItem ? herb.dietItem.medicinalDiet : null),
      relevanceReason: reason,
      isFormula: !!herb.isFormula,
      taiwanHeritage: herb.taiwanHeritage
    }));

    // 檢查是否為系統功能模組與使用情境詢問
    const scenario = this.detectSystemScenario(message, expert.id);
    let systemActions = [];

    // 專家風格回答合成 (Persona-Driven Grounded Synthesis)
    let replyMarkdown = '';
    let engineUsed = '臺灣本草內建語意特徵引擎 (Zero-Dependency Grounded)';
    const llmCfg = llmService.config;

    if (scenario) {
      console.log(`\n=================== [系統功能情境導引匹配] ===================`);
      console.log(`[Scenario Guide] 提問匹配到系統情境: ${scenario.name} (Key: ${scenario.key})`);
      console.log(`[Scenario Guide] 指定專家: ${expert.name}`);
      console.log(`==============================================================\n`);
      replyMarkdown = this.synthesizeScenarioReply(scenario, expert, message);
      systemActions = scenario.actions || [];
      engineUsed = '臺灣本草系統智慧領航特徵引擎 (Scenario Navigator)';
    } else {
      console.log(`\n=================== [RAG 語意檢索與後端資料拋接] ===================`);
      console.log(`[RAG Consult] 使用者提問: "${message}"`);
      console.log(`[RAG Consult] 指定專家: ${expert.name} (${expert.title})`);
      console.log(`[RAG Consult] 資料庫命中 ${retrieved.length} 味草藥 (Grounded Data):`);
      retrieved.forEach((r, idx) => {
        console.log(`  [草藥 ${idx + 1}] ${r.herb.name} (${r.herb.scientificName}) | 產區: ${r.herb.region} | 得分: ${r.score} | 理由: ${r.reason}`);
      });
      console.log(`[RAG Consult] 當前配置之活躍 LLM: ${llmCfg ? llmCfg.activeProvider : 'unknown'}`);

      // 若啟用外部 LLM (例如 Ollama 或其他提供商)，優先嘗試即時 LLM 推理生成
      if (llmCfg && llmCfg.activeProvider !== 'builtin') {
        const prov = llmCfg.providers[llmCfg.activeProvider];
        console.log(`[RAG Consult] 正在將資料庫欄位組裝進 Prompt，拋給後端 LLM API (${prov?.name || llmCfg.activeProvider} / ${prov?.model || 'default'})...`);
        const startTime = Date.now();
        try {
          const prompt = this.buildConsultPrompt(expert, message, retrieved);
          const externalResult = await llmService.callLlm({
            providerId: llmCfg.activeProvider,
            prompt,
            systemPrompt: `你是一位深諳臺灣本土草藥文化的本草耆老，請完全融入以下專家 Persona 口吻回覆：${expert.name}（${expert.title}）。請嚴守不宣稱任何醫療效果，純粹分享民間傳統古早知識。`
          });
          if (externalResult && externalResult.trim() !== '') {
            const duration = ((Date.now() - startTime) / 1000).toFixed(1);
            replyMarkdown = externalResult;
            engineUsed = `${prov ? prov.name : llmCfg.activeProvider} (${prov ? prov.model : 'Live LLM'}) 即時推理`;
            console.log(`[RAG Consult] 後端 LLM API 即時推理成功！耗時: ${duration}s，產出字數: ${externalResult.length}`);
            console.log(`====================================================================\n`);
          }
        } catch (err) {
          console.warn(`[RagService] External LLM consult failed (${err.message}), fallback to builtin synthesis.`);
          console.log(`====================================================================\n`);
        }
      }

      if (!replyMarkdown) {
        console.log(`[RAG Consult] 使用系統內建離線知識特徵引擎進行道地語意生成`);
        console.log(`====================================================================\n`);
        replyMarkdown = this.synthesizeExpertReply(expert, message, retrieved);
      }
    }

    // 確保附帶免責聲明
    const complianceDisclaimer = `
---

> ### 📜 【臺灣本草知識庫 · 民間古早知識分享與醫療免責告示】
> 本次諮詢內容純屬臺灣民間傳統草木文化考證、鄉土常民智慧及生活茶飲風味分享，**非屬醫療意見，不具任何醫療效果、診斷、治療或預防疾病之功能**。本草性味記載源自古籍傳承與文獻梳理，個人體質各異，若有身體不適或病症，請務必諮詢合格之中西醫專業醫療機構。
    `.trim();

    if (!replyMarkdown.includes('民間古早知識分享與醫療免責告示') && !replyMarkdown.includes('非屬醫療意見')) {
      replyMarkdown += '\n\n' + complianceDisclaimer;
    }

    // 動態推薦追問問題
    const suggestedQuestions = this.generateSuggestedQuestions(expert, retrieved);

    return {
      expert: {
        id: expert.id,
        name: expert.name,
        title: expert.title,
        avatar: expert.avatar,
        seal: expert.seal,
        region: expert.region,
        catchphrase: expert.catchphrase
      },
      query: message,
      reply: replyMarkdown,
      citations,
      suggestedQuestions,
      systemActions,
      engineUsed
    };
  }

  /**
   * 偵測使用者提問是否為系統功能模組與使用情境詢問
   */
  detectSystemScenario(message, expertId) {
    const q = (message || '').toLowerCase();
    const isGuideAgent = expertId === 'kenshin_guide';
    const hasToolIntent = /工具|功能|怎麼用|如何使用|哪裡查|在哪裡|有什麼可以用|有哪些可用|有哪些模組|操作方式|怎麼操作|如何操作|怎麼買|如何買|怎麼比對|後台|rbac|批次匯入|匯出|說明手冊|操作手冊|使用手冊|手冊|有哪些/.test(q);

    // 非導覽專員時，必須具備明確的功能或工具詢問意圖，避免將純粹的草藥性味生活提問誤判為系統操作
    if (!isGuideAgent && !hasToolIntent) {
      return null;
    }

    // 1. 方劑研製所 / 青草茶調配 / 熬煮計時
    if (/方劑|調配|自己配|配茶|配方|茶釜|君臣佐使|陰陽指針|滋味光譜|煎煮計時|熬煮|計時器/.test(q)) {
      return {
        key: 'alchemy',
        name: '方劑研製所 · 青草茶調配實驗室',
        tab: 'alchemy',
        actions: [
          { label: '🧪 立即前往【方劑研製所】', tab: 'alchemy' },
          { label: '📖 查閱【調配操作手冊】', action: 'manual' }
        ]
      };
    }

    // 2. 青草名店文化名錄 / 實體老舖採買避坑
    if (/青草店|青草行|哪裡買|老舖|老字號|採買指南|青草巷|避坑|買青草|名店|實體店/.test(q)) {
      return {
        key: 'shops',
        name: '全臺青草名店文化地圖與採買指南',
        tab: 'shops',
        actions: [
          { label: '🏪 立即前往【青草名店文化地圖】', tab: 'shops' },
          { label: '📖 查閱【採買避坑指南】', action: 'manual' }
        ]
      };
    }

    // 3. 草木書閣 / 試閱 / 線上購書 / 黃教授專著 / 消保法
    if (/書閣|買書|購書|試閱|電子書|實體書|黃教授著作|生化與草本的對話|書籍|消保法|訂單|結帳/.test(q)) {
      return {
        key: 'books',
        name: '草木書閣 · 典籍展閱、試閱與線上購書',
        tab: 'books',
        actions: [
          { label: '📚 立即前往【草木書閣】', tab: 'books' },
          { label: '📖 查閱【購書與消保法條款】', action: 'manual' }
        ]
      };
    }

    // 4. 藥材橫向多維對照比對
    if (/比對|對照|比較兩味|比較藥材|差異|橫向比對|差別/.test(q)) {
      return {
        key: 'compare',
        name: '藥材多方橫向對照比對視窗',
        action: 'compare',
        actions: [
          { label: '⚖️ 開啟【藥材橫向比對視窗】', action: 'compare' },
          { label: '🌿 前往【本草知識庫】勾選比對', tab: 'catalog' }
        ]
      };
    }

    // 5. 五行臟腑經絡引導圖
    if (/經絡|五行|臟腑|歸經圖|入經|穴位/.test(q)) {
      return {
        key: 'meridian',
        name: '五行臟腑經絡氣血引導圖',
        tab: 'meridian',
        actions: [
          { label: '🫀 立即前往【五行經絡圖】', tab: 'meridian' },
          { label: '📖 查閱【經絡導引說明】', action: 'manual' }
        ]
      };
    }

    // 6. 典藏管理後台 / RBAC / 批次匯入 / 匯出 / 文章工作室 / 金鑰
    if (/後台|管理後台|rbac|權限|批次匯入|匯出|csv|json|文章生成|文章工作室|api金鑰|備份|審計日誌|重置資料庫/.test(q)) {
      return {
        key: 'admin',
        name: '典藏管理後台與數據中樞',
        tab: 'admin',
        actions: [
          { label: '⚙️ 立即前往【典藏管理後台】', tab: 'admin' },
          { label: '📖 查閱【後台操作指南】', action: 'manual' }
        ]
      };
    }

    // 7. 本草知識庫與風土產區探索
    if (/風土地圖|產區|客家青草|原民野菜|抹草|大風草|刺蔥|客庄|篩選草藥|知識庫|圖鑑/.test(q) && (/哪裡查|怎麼查|在哪裡|有什麼工具|如何篩選|怎麼找/.test(q) || expertId === 'kenshin_guide')) {
      return {
        key: 'catalog_terroir',
        name: '本草知識庫與臺灣風土產區地圖',
        tab: 'catalog',
        actions: [
          { label: '🌿 立即前往【本草知識庫】', tab: 'catalog' },
          { label: '📖 查閱【風土探索手冊】', action: 'manual' }
        ]
      };
    }

    // 8. 藥膳食療與餐桌食材指南
    if (/藥膳|食療|餐桌上的醫生|四氣五味|食材|烹調|隔水燉|臟腑部位|可供食品/.test(q) && (/哪裡查|怎麼查|在哪裡|有什麼工具|如何篩選|怎麼找|功能|手冊/.test(q) || expertId === 'kenshin_guide')) {
      return {
        key: 'medicinal_diet',
        name: '藥膳食療與餐桌食材指南（《藥膳學》典藏）',
        tab: 'consult',
        actions: [
          { label: '🍲 請益【李昭瑩 藥膳食療名師】', tab: 'consult' },
          { label: '📖 查閱【藥膳食療操作手冊】', action: 'manual' }
        ]
      };
    }

    // 9. 全站系統功能總覽 / 說明手冊 / 操作指南 / 怎麼用
    if (/系統有哪些功能|什麼功能可以用|有哪些功能|有什麼可以用|有哪些模組|功能情境|說明手冊|使用手冊|怎麼使用系統|操作指南|平台介紹|怎麼用|如何使用|有哪些工具/.test(q) || expertId === 'kenshin_guide') {
      return {
        key: 'features_overview',
        name: '平台全景導覽與使用者操作手冊',
        actions: [
          { label: '📖 開啟【使用者操作手冊】', action: 'manual' },
          { label: '🌿 進入【本草知識庫】', tab: 'catalog' },
          { label: '🧪 前往【方劑研製所】', tab: 'alchemy' }
        ]
      };
    }

    return null;
  }

  /**
   * 根據情境與專家合成詳細功能導覽回覆
   */
  synthesizeScenarioReply(scenario, expert, query) {
    let greeting = expert.greeting;
    if (expert.id === 'kenshin_guide') {
      greeting = '您好！我是本草研究室的「肯信小助手（平台導航員）」。針對您所詢問的功能情境，我為您梳理了最適用的模組與操作指南：';
    } else if (expert.id === 'wanhua_uncle') {
      greeting = `${expert.greeting}\n\n老茶師我跟你說，你問這項功能正好，咱研究室裡頭都有整套好用的工具！`;
    } else if (expert.id === 'hakka_grandmother') {
      greeting = `${expert.greeting}\n\n阿妹阿弟呀，你問的這個功能，咱研究室有很齊全的工具可以查！`;
    } else if (expert.id === 'pharmacist_phd') {
      greeting = `${expert.greeting}\n\n您好！針對您所關注的系統功能與研究情境，本草研究室規劃了完整且嚴謹的模組架構供您運用：`;
    } else if (expert.id === 'yaoshan_master') {
      // 李昭瑩 藥膳食療名師風格
      const dietItem = mainHerb.dietItem || {};
      const bookPage = dietItem.page ? `《藥膳學》第 ${dietItem.page} 頁` : (mainHerb.region || '《藥膳學》');
      const dietRecipe = dietItem.medicinalDiet || (mainHerb.folkApplication || '道地藥膳調養');

      reply = `
${expert.greeting}

欣見您問及「**${query.trim()}**」！唐代孫思邈於《千金要方》有云：*「夫為醫者，當須先洞曉病源，知其所犯，以食治之，食療不愈，然後命藥。」* 在《藥膳學》的體系中，我們強調『四氣調陰陽、五味合臟腑』，每一道端上餐桌的藥膳，都是滋養人體的健康良方。

依循《藥膳學》典藏研究與食材配伍準則，為您推薦最合宜的食療食材與藥膳方案：${herbNames}。

---

### 🍲 【《藥膳學》典籍考證與食材解析：${mainHerb.name}】
* **典籍出處**：${bookPage}
* **分類所屬**：${dietItem.chapter || '藥膳學'} · ${dietItem.section || mainHerb.category}
* **來源與部位**：${dietItem.source || mainHerb.scientificName || '天然優質食材'}
* **四氣五味與歸經**：${dietItem.natureFlavor || `性${mainHerb.nature}`}
* **食療功能**：${dietItem.functions || mainHerb.efficacy}
* **主治調養**：${dietItem.indications || mainHerb.efficacy}
* **選材品質要領**：${dietItem.quality || '以新鮮無雜質、體質堅實飽滿者為上品。'}

---

### 🍳 【名師私房藥膳工藝：${dietRecipe}】
1. **食材備料與前置處理**：
   - 取 **${mainHerb.name}** 為主角，搭配 ${secondaryHerbs.length > 0 ? `**${secondaryHerbs[0].name}** 與優質食材（如土雞、排骨、魚頭或新鮮豆腐）` : '合宜食材與天然高湯'}。
   - 若為中藥材，應以清水快洗去塵，切勿浸泡過久以免水溶性多醣流失。
2. **廚藝烹調心法（隔水燉 / 慢火煨）**：
   - 藥膳首重「**隔水燉**」或「**文火煨**」，內鍋放進調味後的食材與高湯，外鍋放水加蓋，文火慢燉約 45 至 60 分鐘，使藥效充分滲透肉質，精華不揮發。
   - 起鍋前少鹽、免味精，保持原汁原味與清爽回甘。
3. **佐使搭配叮嚀**：
   - ${dietItem.notes || '藥借食力，食助藥威；三少三多守則：少糖、少鹽、少油；多水、多纖、多健康。'}

---

### ⚠️ 【食療守則與體質禁忌】
> **名師叮囑**：${dietItem.notes || mainHerb.contraindications || '食補需因人、因時、因體質而異。'}
> 《內經》明言「熱者寒之、寒者熱之」，若屬燥熱火旺體質宜偏寒涼清淡，若屬虛寒體質宜選溫熱補益，循序漸進，切勿暴食偏嗜。
      `.trim();
    } else if (expert.id === 'indigenous_forager') {
      greeting = `${expert.greeting}\n\nSa'icelen！朋友，這個需求在我們的系統裡有超好用的工具可以幫你！`;
    }

    let body = '';
    switch (scenario.key) {
      case 'alchemy':
        body = `
### 🧪 推薦核心工具：【方劑研製所 · 青草茶調配實驗室 (\`HerbAlchemyLab\`)]

若您想**自己調配草本茶飲、研製退火涼茶或掌握熬煮火候**，方劑研製所是最契合的專業工具：

#### 🌟 核心功能特色：
1. **君臣佐使調配槽**：自由挑選 1 至 4 味草藥投入茶釜（例如：大花咸豐草、鳳尾草、甘草）。
2. **四氣陰陽平衡動態指針**：即時計算處方的寒涼值（-100）與溫熱值（+100），指針即時偏轉，並給出體質調養叮嚀。
3. **五味滋味預測光譜**：實時預測苦味、甘味、辛味、涼味之風味雷達圖。
4. **受納經絡臟腑共鳴**：實時顯示金、木、水、火、土五行臟腑受納反饋。
5. **古法三階熬煮計時器**：
   - 第一階【武火急沸】（10分鐘，大火滾沸激發草木原香）
   - 第二階【文火慢熬】（35分鐘，細火溫燉析出黃酮與多醣）
   - 第三階【關火悶香】（15分鐘，加蓋浸潤回甘）
   - 內建聲景氣泡沸水微響與到期頌缽提示音。
6. **AI 神來一配實驗室**：點擊「🎲 AI 神來一配」，演算法將自動隨機配伍最佳茶方！

#### 📍 快速操作路徑：
- 點擊頂端導覽列上的 **「🧪 方劑實驗室」**，或點擊下方快捷按鈕直接進入！
        `.trim();
        break;

      case 'shops':
        body = `
### 🏪 推薦核心工具：【全臺青草名店文化地圖與採買指南 (\`AlliedShopsView\`)]

若您想**實地尋訪臺灣老字號青草老舖、了解店家特色或學習採買新鮮草料的辨偽技巧**：

#### 🌟 核心功能特色：
1. **全島風土名舖名錄**：收錄台北萬華西昌街青草巷（安立青草店、德安青草店）、台中中德藥行、台南蓮玉湯等老字號商號。
2. **分區聚落篩選**：直觀按「北部」、「中部」、「南部」切換各地青草老街。
3. **青草採買避坑指南**：
   - **聞香辨真**：新鮮青草具自然芳香，若有刺鼻酸味或霉味切勿購買。
   - **觀色識質**：自然日曬乾燥呈深綠或灰綠，過鮮艷者須防二氧化硫薰蒸。
   - **防潮儲存**：密封避光，生鮮青草應於 3 日內使用。
4. **依草藥反查老舖**：點選特定草藥標籤，直接反向列出販售該草藥之實體店家。

#### 📍 快速操作路徑：
- 點擊頂端導覽列上的 **「🏪 結盟青草店」**，或點擊下方快捷按鈕直接前往！
        `.trim();
        break;

      case 'books':
        body = `
### 📚 推薦核心工具：【草木書閣 · 專題典籍展閱與線上結帳 (\`HerbBookshelfView\`)]

若您想**拜讀中醫大黃世勳教授的三十載本草踏查著作、免費線上試閱章節或購買實體/電子書**：

#### 🌟 核心功能特色：
1. **收錄產學合作巨著**：
   - 🎓 **《生化與草本的對話：臺灣本草三十載考證錄》**（黃世勳教授 產學合作巨著，融貫田野踏查與生藥機轉）。
   - 🍵 **《艋舺西昌街青草巷志：四百年退火茶心法》**（萬華老茶師心傳）。
   - 👵 **《山徑香草與客庄生活手記》**（客家阿婆風土集）。
2. **免費線上試閱抽屜**：點擊書籍卡片上的「📖 試閱章節」，即可即時開卷研讀前言導讀與精華篇章。
3. **實體典藏與電子書雙軌結帳**：支援直接線上選購實體書籍或授權電子書。
4. **《消保法》第 19 條第 2 項合規保障**：實體書享有 7 日鑑賞期；電子書屬數位內容，經授權交付後排除解除權，權益明確揭露。
5. **買家訂單安全查詢**：輸入 Email 反查訂單與授權金鑰，電話與地址自動安全脫敏遮罩。

#### 📍 快速操作路徑：
- 點擊頂端導覽列上的 **「📚 草木書閣」**，或點擊下方快捷按鈕直接前往！
        `.trim();
        break;

      case 'compare':
        body = `
### ⚖️ 推薦核心工具：【藥材多方橫向對照比對視窗 (\`HerbCompareModal\`)]

若您想**同時並列比較 2 至 4 味草藥的性味、歸經、風土產區、化學活性成分或安全禁忌**：

#### 🌟 核心功能特色：
1. **多維並列對照表**：一覽四氣五味、十二經絡、活性化合物成分與用藥安全分級。
2. **一鍵載入經典比對範本**：
   - 🔥 清熱退火雙雄：**大花咸豐草** vs **鳳尾草**
   - 🌿 客家辟邪二寶：**抹草** vs **艾草**
   - 🏹 原民山林辛香：**刺蔥** vs **山苦瓜**
3. **直覺跨頁比對**：在知識庫圖鑑中點擊任一草藥的「+ 比對」，隨時點擊頂端導覽列上的「⚖️ 比對」開啟視窗。

#### 📍 快速操作路徑：
- 點擊頂端導覽列上的 **「⚖️ 比對」** 膠囊，或點擊下方快捷按鈕直接開啟！
        `.trim();
        break;

      case 'catalog_terroir':
        body = `
### 🌿 推薦核心工具：【本草知識庫與臺灣風土產區探索互動地圖 (\`TaiwanTerroirMap\` & \`HerbSidebar\`)]

若您想**按風土產區（如桃竹苗客庄、花東原鄉）、生活情境（辟邪沐浴、月子擦澡）或方言俗名精準搜尋藥材**：

#### 🌟 核心功能特色：
1. **臺灣風土產區互動探索地圖**：點選地圖六大產區（北部青草巷、桃竹苗客庄、中彰投台地、嘉南平原、六堆高屏、花東原鄉），即時鎖定原生本草。
2. **多維側邊欄過濾**：支援客家辟邪抹草、大風草月子調養、原民刺蔥野炊、台語俗名（如「恰芒草」、「狗貼耳」）模糊檢索。
3. **3D 圖鑑卡與清單表格**：自由切換 3D 傾斜卡片或密集清單檢視。

#### 📍 快速操作路徑：
- 點擊頂端導覽列上的 **「🌿 本草知識庫」**，或點擊下方快捷按鈕直接進入！
        `.trim();
        break;

      case 'meridian':
        body = `
### 🫀 推薦核心工具：【五行臟腑經絡氣血引導圖 (\`HerbMeridianMap\`)]

若您想**從中醫臟象學與十二經絡角度，探討各器官系統對應之島嶼草本**：

#### 🌟 核心功能特色：
1. **五行相生相剋視覺化**：呈現金（肺/大腸）、木（肝/膽）、水（腎/膀胱）、火（心/小腸）、土（脾/胃）臟象圖。
2. **入經草藥即時列出**：點選特定臟腑（例如點擊「金 · 肺」），圖表即刻高亮相生相剋路徑，並列出入肺經之本草名錄（如薄荷、魚腥草）。

#### 📍 快速操作路徑：
- 點擊 Hero 導覽標籤「🫀 五行經絡圖」，或點擊下方快捷按鈕直接開啟！
        `.trim();
        break;

      case 'admin':
        body = `
### ⚙️ 推薦核心工具：【典藏管理後台與數據中樞 (\`HerbAdminDashboard\`)]

若您身為**網站管理者、本草策展師或審計員，需要進行資料維護、文章撰寫、批次匯入匯出或系統配置**：

#### 🌟 核心功能特色：
1. **5 大 RBAC 角色登入**：至高管理員 (\`super_admin\`)、本草策展師 (\`curator\`)、本草諮詢顧問 (\`consultant\`)、典藏觀察員 (\`auditor\`) 與草木學員 (\`member\`)。
2. **本草 CRUD 與即時古典標本票卡預覽 (Live Specimen Plate Preview)**：所見即所得，編輯草藥表單即刻預覽卡片效果。
3. **資料批次匯入與線上編輯工作台**：支援 5 味野生草藥示範載入、JSON/CSV 解析，缺漏欄位自動提示，在線上表格校驗後一鍵入庫。
4. **條件篩選多格式匯出**：依產區篩選匯出結構化 JSON、含 UTF-8 BOM 之 CSV（Excel 雙擊不亂碼）與精美排版 Markdown 植物誌手冊。
5. **專題文章生成工作室 (Herbal Narrative Studio)**：自資料庫挑選本草 Grounding，指定目標受眾（上班族/長輩/學童）自動生成專題文章。
6. **API 金鑰脫敏遮罩與系統備份**：API 金鑰自動脫敏，阻斷 SSRF，支援下載全庫 JSON 快照與 1,000 筆環形審計日誌。

#### 📍 快速操作路徑：
- 點擊頂端導覽列上的 **「⚙️ 管理後台」**，或點擊下方快捷按鈕直接前往！
        `.trim();
        break;

      case 'medicinal_diet':
        body = `
### 🍲 推薦核心模組：【藥膳食療與餐桌食材指南 · 《藥膳學》典藏專區】

若您想**了解藥膳食材性能、四氣五味對應臟腑、餐桌上的醫生、臟腑部位食材、14 道經典養生藥膳或隔水燉燜煨等古法烹調技法**：

#### 🌟 核心功能特色：
1. **依循《藥膳學》第15至133頁權威典藏**：
   - 由李昭瑩、王儀絜、黃世勳教授編著，完整收錄第二章常用藥材（溫熱、寒涼、平性）、第三章常用食材（餐桌上的醫生、臟腑部位）與第四至十一章專題藥膳。
2. **四氣五味食療辨證**：
   - 寒涼清熱瀉火、溫熱散寒補火、甘緩補虛、辛散行氣活血、苦降瀉下、鹹軟散結。
3. **經典專題養生名膳庫（涵蓋四季、美容、婦幼與銀髮）**：
   - **春季升補**：人參山藥烏骨雞湯（大補肺脾元氣）
   - **夏季健脾消暑**：山藥茯苓健脾包子、燈心苦瓜消暑飲、清心蓮子養神粥
   - **冬令大補與驅寒**：冬季氣血大補湯、當歸生薑羊肉湯、青蝦炒韭菜
   - **臟腑部位食療**：天麻隔水燉豬腦（平肝熄風）、杜仲炒腰花（強筋骨腰膝）
   - **美容瘦身養顏**：百合薏仁美白潤膚湯、山楂烏梅決明降脂茶、四草降火龜苓退熱膏
   - **婦幼與考生健腦**：桃紅四物調理湯、元氣補腦醒神雞湯、杞菊清肝明目飲
   - **銀髮滋補延壽**：何首烏黑髮延壽粥、當歸燉土雞、茯苓健脾肉丸、冰糖銀耳蓮子羹、銀杏白果炒雞丁
4. **衛福部公告 215 項可同時提供食品之中藥材合規清單**。
5. **烹調工藝心法**：隔水燉（保持精華不散）、扣、拌、煨、蒸、燜。

#### 📍 快速操作路徑：
- 在專家諮詢茶堂選擇 **「🍲 李昭瑩 藥膳食療名師」**，直接向名師叩問任何食材搭配與食譜！
- 在方劑實驗室（HerbAlchemyLab）自由調配藥膳食材，享受 AI 君臣佐使平衡判定與神來一配！
        `.trim();
        break;

      default: // features_overview
        body = `
### 📖 臺灣肯信本草研究室 · 全站核心功能模組導覽

歡迎來到臺灣肯信本草研究室！系統提供完善且豐富的 13 大功能模組，無論您是常民生活飲茶、風土文化研究或後台資料管理，都能找到對應工具：

| 功能模組 | 主要用途 | 適用情境 |
| :--- | :--- | :--- |
| **🌿 本草知識庫** | 25+味本土草藥、風土產區地圖、3D卡片/清單 | 尋找草藥、按產區或民間情境（如月子/辟邪/退火）篩選 |
| **🧪 方劑實驗室** | 君臣佐使投入、陰陽指針、滋味光譜、熬煮計時 | 想自製青草茶飲、測算寒熱偏性、掌握文火與武火時間 |
| **🏪 結盟青草店** | 全台風土名舖聚落、營業導覽、採買避坑指南 | 實地尋訪老字號青草老舖、購買新鮮草料辨偽防坑 |
| **📚 草木書閣** | 中醫大黃教授專題巨著、線上試閱與結帳 | 拜讀經典本草著作、免費線上試閱、訂購實體/電子書 |
| **🍵 專家諮詢茶堂** | 5大Persona專家語意問答、Citations標本卡 | 針對生活體質困擾向專家請益，或向小助手詢問系統功能 |
| **⚖️ 藥材多方比對** | 2~4味草藥橫向多維並列剖析 | 橫向對照兩種以上藥材的性味、歸經、成分與安全禁忌 |
| **🫀 五行經絡圖** | 人體金木水火土臟象與經絡走向 | 從中醫十二經絡與臟象學角度尋找對應入經之草本 |
| **⚙️ 典藏管理後台** | RBAC權限、批次匯入/工作台、文章工作室 | 資料庫維護、批次匯入/匯出、撰寫專題文章、金鑰配置 |
| **⌨️ 全域快捷命令盤** | 按 \`Ctrl+K\` (Mac \`⌘K\`) 快速喚醒 | 快速搜尋藥材學名、俗名並直接鍵盤導航開卷 |
| **📖 使用者操作手冊** | 點擊頂端「📖 操作手冊」隨時查閱 | 13大模組圖文指南、10大情境速查矩陣與離線手冊下載 |

💡 **貼心叮嚀**：您可隨時點擊頂端導覽列切換模組，或點擊下方快捷按鈕直接跳轉！
        `.trim();
        break;
    }

    return `${greeting}\n\n${body}`;
  }

  /**
   * 建構 RAG 外部 LLM 諮詢 Prompt
   */
  buildConsultPrompt(expert, query, retrieved) {
    const citationsText = retrieved.map(({ herb, reason }) => `
- 草藥名稱：${herb.name} (${herb.scientificName || '臺灣草本'})
  科屬產區：${herb.family || ''} / ${herb.region || ''}
  性味歸經：性${herb.nature}，味${(herb.taste || []).join('、')}，入${(herb.channels || []).join('、')}經
  民間傳統應用：${herb.folkApplication || ''}
  古籍文獻描述：${herb.efficacy || ''}
  風土記述：${herb.taiwanHeritage || herb.terroir || ''}
  安全指引：${herb.safetyLevel || '無毒常服'}
  禁忌注意：${herb.contraindications || '無特別禁忌'}
  檢索關聯理由：${reason}
`).join('\n');

    return `
請以「${expert.name}」（${expert.title}）的獨特口吻，針對使用者的提問進行回答。

【專家 Persona 特徵】
* 稱號與風土背景：${expert.title}（${expert.region}）
* 說話口氣特徵：${expert.tone}
* 代表性口頭禪：${expert.catchphrase}
* 問候語風格：${expert.greeting}

【使用者提問】
${query}

【檢索出的臺灣本土草藥真實依據 (Grounded Citations)】
${citationsText}

【法律合規要求（極重要）】
1. 本系統為純粹民間古早傳統知識文化分享，**嚴禁聲稱任何醫療效果、療效、治癒、診斷疾病或開立處方**。
2. 遇到嚴重病痛或不適，必須明確提醒尋求合格中西醫專業醫療院所診治。
3. 語氣務必完全符合專家的性格與生活感，回答結構需包含問候引言、草木風土故事、家常茶飲生活應用及體質注意叮嚀。
    `.trim();
  }

  /**
   * 根據專家 Persona 與 RAG 檢索內容生成深入回答
   */
  synthesizeExpertReply(expert, query, retrieved) {
    const mainHerb = retrieved[0].herb;
    const secondaryHerbs = retrieved.slice(1).map(r => r.herb);
    const herbNames = retrieved.map(r => `**${r.herb.name}**`).join('、');

    let reply = '';

    if (expert.id === 'wanhua_uncle') {
      // 萬華青草伯風格
      reply = `
${expert.greeting}

聽到你問到「${query.trim()}」，老茶師我先跟你講一句心底話：**「草木若對症，一味就能解千愁；但若用毋對，反而破壞體內脾胃底氣。」**

依老萬華西昌街百年青草巷世代傳下來的實證經驗，你目前的情況，最適合引用的台灣在地好草有：${herbNames}。

---

### 🍵 【老艋舺本草解方：${mainHerb.name} 與配伍】
* **核心領銜藥材**：**${mainHerb.name}**（${mainHerb.scientificName}）
  * **藥性味覺**：性**${mainHerb.nature}**，味**${(mainHerb.taste || []).join('、')}**，入**${(mainHerb.channels || []).join('、')}**經。
  * **老老祖宗的功用**：${mainHerb.efficacy}
  * **西昌街風土記**：${mainHerb.taiwanHeritage || mainHerb.terroir}

${secondaryHerbs.length > 0 ? `* **佐使配伍好草**：${secondaryHerbs.map(h => `**${h.name}**（入${(h.channels || []).join('、')}經，主要助其${(h.efficacy || '').slice(0, 32)}）`).join('；')}。` : ''}

---

### 🔥 【老茶師獨門煎煮火候指南】
1. **備草清滌**：取 ${mainHerb.name} ${mainHerb.partsUsed || '全草'} 乾燥品約 15-20 克${secondaryHerbs.length > 0 ? `，搭配 ${secondaryHerbs[0].name} 10 克` : ''}，清水快速淘洗去掉浮塵，莫泡水太久。
2. **文火細熬**：水滾後轉**文火慢熬 20 至 25 分鐘**。青草的甘露味是慢火逼出來的，火太大苦味出得急，反倒傷了清甜。
3. **熄火悶香**：關火前三分鐘可少許加入薄荷或冰糖調味，蓋鍋蓋悶 5 分鐘，青草特有的回甘香氣才鎖得住。

---

### ⚠️ 【萬華老青草舖的叮嚀（安全與禁忌）】
> **老茶師提醒您**：${mainHerb.name}之安全等級為「**${mainHerb.safetyLevel || '依體質酌量'}**」。${mainHerb.contraindications}
> 記住喔，青草茶切忌一早空腹冰冷牛飲！溫溫地喝，喉嚨潤得快，胃腸也舒爽。
      `.trim();
    } else if (expert.id === 'hakka_grandmother') {
      // 客庄草藥阿婆風格
      reply = `
${expert.greeting}

阿妹阿弟呀，聽到你在問「${query.trim()}」，阿婆聽了真替你心疼。現代年輕人工作忙、吹冷氣、吃外食，常常把身體的節奏搞亂了。阿婆教你，**「天地造化的大地草木，早就把救急治標與溫補的藥方準備在山頭田埂邊上了。」**

依照我們客家庄老祖宗代代守護的草藥智慧，阿婆為你推薦：${herbNames}。

---

### 🌿 【客庄天地草木：${mainHerb.name} 的守護】
* **當家靈草**：**${mainHerb.name}**（客家俗稱：${(mainHerb.dialectNames || []).find(d => d.dialect === '客語')?.name || mainHerb.commonNames?.[0] || mainHerb.name}）
  * **草木性味**：性**${mainHerb.nature}**，入**${(mainHerb.channels || []).join('、')}**經。
  * **客家長輩的智慧**：${mainHerb.efficacy}
  * **阿婆記憶中的風土**：${mainHerb.taiwanHeritage || '在桃竹苗向陽山坡與丘陵田埂邊隨處可見，是客家人生活的綠色守護者。'}

${secondaryHerbs.length > 0 ? `* **客庄常備配伍草**：${secondaryHerbs.map(h => `**${h.name}**（${h.folkApplication || '客家日常茶飲'}）`).join('、')}。` : ''}

---

### 🫖 【阿婆的古法茶飲與洗浴方】
1. **生活煮茶**：採乾草抓一小把（約一把手抓得起來的份量），放入陶壺加水 1500cc，水開後慢火滾 15 分鐘。放溫了喝，入口初澀，落喉生津。
2. **客庄特別洗浴淨身**：若是感到身心不舒爽、疲憊驚擾，可取 ${mainHerb.name} 枝葉配抹草、艾草七片，煎大鍋滾水加入浴湯擦澡，祛風散邪、安神定志。

---

### 👵 【阿婆對阿妹阿弟的細心叮囑】
> **生活禁忌**：${mainHerb.contraindications}
> 喝草藥要順著節氣，不要貪快一口氣喝太多。身體暖了、心安了，元氣自然就長回來囉！
      `.trim();
    } else if (expert.id === 'pharmacist_phd') {
      // 鹿港望族・三十載本草調查學術名家風格
      reply = `
${expert.greeting}

針對您所提出的生活調理與本草疑惑：「**${query.trim()}**」，我們結合歷代本草古籍考證、三十餘載全臺山野踏查筆記、現代**植物生藥學 (Pharmacognosy)** 與天然物化學實證為您進行詳實拆解。

經本草文獻與島嶼野外調查資料交叉比對，高度契合且具藥理實證支持的臺灣本土藥用植物為：${herbNames}。

---

### 🔬 【現代生藥學深度解析：${mainHerb.name}】
* **植物學名與科屬**：*${mainHerb.scientificName}* (${mainHerb.family})
* **傳統中醫性味歸經**：四氣屬**${mainHerb.nature}**，五味屬**${(mainHerb.taste || []).join('、')}**，歸經於**${(mainHerb.channels || []).join('、')}**。
* **代表性化學活性成分 (Bioactive Compounds)**：
  ${(mainHerb.activeCompounds || ['黃酮類化合物', '多酚類', '揮發油']).map(c => `  - **${c}**`).join('\n')}
* **分子藥理機制 (Mechanisms of Action)**：
  ${mainHerb.efficacy}。現代體外及體內實驗顯示，其活性成分主要透過下調促發炎細胞因子（如 TNF-α、IL-6）及抑制 NF-κB 途徑達到消炎抗菌、清除自由基抗氧化之效益。

${secondaryHerbs.length > 0 ? `### 🧪 【協同作用配伍 (Synergistic Phytotherapy)】\n${secondaryHerbs.map(h => `- **${h.name}** (*${h.scientificName}*)：入藥部位為${h.partsUsed || '地上部'}，含 ${(h.activeCompounds || []).slice(0, 2).join('、')}，與主藥具備顯著加乘效應。`).join('\n')}` : ''}

---

### 📊 【臨床建議劑量與萃取工藝】
* **推薦給藥劑量**：乾燥品每日約 **10 - 20g**（鮮品折半或按 3:1 換算），建議以常壓熱水回流萃取（Water Extraction）20-30 分鐘，揮發油成分較多者（如薄荷、左手香）需採後下法（Post-boil 3-5 分鐘）。
* **生物利用度優化**：飯後半小時至一小時溫服，避免空腹高濃度單寧酸對胃黏膜之直接刺激。

---

### ⚠️ 【毒理安全評估與西藥交互作用警示】
> **安全等級**：**${mainHerb.safetyLevel || '標準成藥級別'}**。
> **禁忌證 (Contraindications)**：${mainHerb.contraindications}
> **藥物交互作用 (DDI)**：若您目前正在服用抗凝血劑（如 Warfarin）、免疫抑制劑或降血糖藥物，天然多酚類可能影響肝臟 CYP450 酵素代謝，建議間隔 2 小時以上，並務必諮詢專科醫師或藥師。
      `.trim();
    } else if (expert.id === 'yaoshan_master') {
      // 李昭瑩 藥膳食療名師風格
      const dietItem = mainHerb.dietItem || {};
      const bookPage = dietItem.page ? `《藥膳學》第 ${dietItem.page} 頁` : (mainHerb.region || '《藥膳學》');
      const dietRecipe = dietItem.medicinalDiet || (mainHerb.folkApplication || '道地藥膳調養');

      reply = `
${expert.greeting}

欣見您問及「**${query.trim()}**」！唐代孫思邈於《千金要方》有云：*「夫為醫者，當須先洞曉病源，知其所犯，以食治之，食療不愈，然後命藥。」* 在《藥膳學》的體系中，我們強調『四氣調陰陽、五味合臟腑』，每一道端上餐桌的藥膳，都是滋養人體的健康良方。

依循《藥膳學》典藏研究與食材配伍準則，為您推薦最合宜的食療食材與藥膳方案：${herbNames}。

---

### 🍲 【《藥膳學》典籍考證與食材解析：${mainHerb.name}】
* **典籍出處**：${bookPage}
* **分類所屬**：${dietItem.chapter || '藥膳學'} · ${dietItem.section || mainHerb.category}
* **來源與部位**：${dietItem.source || mainHerb.scientificName || '天然優質食材'}
* **四氣五味與歸經**：${dietItem.natureFlavor || `性${mainHerb.nature}`}
* **食療功能**：${dietItem.functions || mainHerb.efficacy}
* **主治調養**：${dietItem.indications || mainHerb.efficacy}
* **選材品質要領**：${dietItem.quality || '以新鮮無雜質、體質堅實飽滿者為上品。'}

---

### 🍳 【名師私房藥膳工藝：${dietRecipe}】
1. **食材備料與前置處理**：
   - 取 **${mainHerb.name}** 為主角，搭配 ${secondaryHerbs.length > 0 ? `**${secondaryHerbs[0].name}** 與優質食材（如土雞、排骨、魚頭或新鮮豆腐）` : '合宜食材與天然高湯'}。
   - 若為中藥材，應以清水快洗去塵，切勿浸泡過久以免水溶性多醣流失。
2. **廚藝烹調心法（隔水燉 / 慢火煨）**：
   - 藥膳首重「**隔水燉**」或「**文火煨**」，內鍋放進調味後的食材與高湯，外鍋放水加蓋，文火慢燉約 45 至 60 分鐘，使藥效充分滲透肉質，精華不揮發。
   - 起鍋前少鹽、免味精，保持原汁原味與清爽回甘。
3. **佐使搭配叮嚀**：
   - ${dietItem.notes || '藥借食力，食助藥威；三少三多守則：少糖、少鹽、少油；多水、多纖、多健康。'}

---

### ⚠️ 【食療守則與體質禁忌】
> **名師叮囑**：${dietItem.notes || mainHerb.contraindications || '食補需因人、因時、因體質而異。'}
> 《內經》明言「熱者寒之、寒者熱之」，若屬燥熱火旺體質宜偏寒涼清淡，若屬虛寒體質宜選溫熱補益，循序漸進，切勿暴食偏嗜。
      `.trim();
    } else if (expert.id === 'indigenous_forager') {
      // 阿美族山林野菜獵人風格
      reply = `
${expert.greeting}

朋友，你問的這件事情：「**${query.trim()}**」，正好是山林與大自然最擅長給我們的答案！獵人在山裡追隨獵物幾天幾夜，靠的就是這些隨手採集的野草保養氣力。

山林給我們的指示，正是這幾味在台灣土地上昂首生長的植物：${herbNames}。

---

### 🌿 【山林野地的大地元氣：${mainHerb.name}】
* **山林夥伴**：**${mainHerb.name}**（族語稱呼/俗名：${(mainHerb.dialectNames || [])[0]?.name || mainHerb.name}）
* **大地的脾性**：屬於**${mainHerb.nature}**性，入**${(mainHerb.channels || []).join('、')}**。
* **山林獵人的領悟**：${mainHerb.efficacy}
* **生長風土**：${mainHerb.terroir || '生長在台灣低海拔山林向陽坡與河川溪谷，享受最強烈的陽光與雨水。'}

---

### 🍲 【獵人野炊與採集指南】
1. **採集倫理（Mipalafang）**：當我們在山野採集時，**只摘取頂端最嫩的兩三片葉子**，絕對不把整株連根拔起，要留著花與根，讓蜜蜂小鳥有食物，大地才能年年茂盛。
2. **野炊烹煮**：煮一鍋山泉水，一把 ${mainHerb.name}${secondaryHerbs.length > 0 ? ` 與一把 ${secondaryHerbs[0].name}` : ''}，煮滾飄出草木青香時就可盛起飲用。若是野餐，加入溪魚或土雞同煮，湯頭野味十足，通體舒暢！

---

### 🏹 【獵人給平地朋友的誠懇提醒】
> **大地的規則**：${mainHerb.contraindications}
> 自然的力量很剛強，順著節奏吃是補，貪多暴飲是負擔。吃進乾淨的草木，心也要像山嵐一樣放鬆喔！
      `.trim();
    } else {
      // 自訂專家 Persona 通用生成模式
      reply = `
${expert.greeting || '您好！歡迎交流臺灣本草草木心得。'}

關於您所關切的「**${query.trim()}**」，我秉持著${expert.catchphrase || '「草木有靈，順應自然」'}之核心視角，為您推薦臺灣在地代表草藥：${herbNames}。

---

### 🍃 【${expert.name} 特選本草：${mainHerb.name}】
* **本草名稱**：**${mainHerb.name}** (*${mainHerb.scientificName || '臺灣草本'}*)
* **風土產區**：${mainHerb.region || expert.region || '臺灣全島'}
* **四氣五味**：性**${mainHerb.nature}**，味**${(mainHerb.taste || []).join('、')}**，入**${(mainHerb.channels || []).join('、')}**經。
* **藥性功效**：${mainHerb.efficacy}
* **風土文獻**：${mainHerb.taiwanHeritage || mainHerb.terroir || '臺灣島嶼溫暖濕潤環境孕育之特色生藥。'}

${secondaryHerbs.length > 0 ? `* **佐使配伍好草**：${secondaryHerbs.map(h => `**${h.name}**（${(h.efficacy || '').slice(0, 30)}）`).join('；')}。` : ''}

---

### 🫖 【專家專屬生活實踐叮嚀】
1. **日常運用**：${mainHerb.folkApplication || '建議採乾燥草本 10-15g，以熱水悶泡或慢火細煎 15 分鐘溫服。'}
2. **風格心法**：${expert.tone || '順應四時節氣，以草木清香涵養身心。'}

### ⚠️ 【安全與體質注意事項】
> **安全等級**：${mainHerb.safetyLevel || '無毒常服'}
> **禁忌提醒**：${mainHerb.contraindications || '依體質適量使用，孕婦或體質虛寒者請諮詢專業醫師。'}
      `.trim();
    }

    // 全專家通用法定文化知識免責宣告
    const legalDisclaimer = `
---
> 📜 **【臺灣本草知識庫 · 民間古早知識分享與醫療免責告示】**  
> 本諮詢內容純屬臺灣傳統民間風土經驗、古早青草智慧與生活文化記錄分享，**本系統嚴格遵循法規，絕無任何醫療效果宣稱，亦不可替代任何專業醫療診斷、處方或治療**。個人體質與健康狀況各異，若有任何身體不適、慢性疾病或正接受治療，請務必諮詢合格中西醫專科醫師診治。
`.trim();

    return reply + '\n\n' + legalDisclaimer;
  }

  /**
   * 根據專家與檢索結果生成追問建議
   */
  generateSuggestedQuestions(expert, retrieved) {
    const mainHerbName = retrieved[0].herb.name;

    if (expert.id === 'wanhua_uncle') {
      return [
        `青草伯，煮「${mainHerbName}」火候要怎麼拿捏才不會苦？`,
        `夏天在辦公室吹冷氣，可以天天喝青草茶退火嗎？`,
        `請問萬華老店的青草茶，除了${mainHerbName}還會加哪些底料？`
      ];
    } else if (expert.id === 'hakka_grandmother') {
      return [
        `阿婆，客家抹草跟艾草拿來洗澡有什麼特別的規矩嗎？`,
        `如果家裡有剛生產的產婦，大風草要怎麼煮水擦澡？`,
        `阿婆，紫蘇跟梅子一起醃除了好吃，對腸胃有什麼好處？`
      ];
    } else if (expert.id === 'pharmacist_phd') {
      return [
        `黃教授出身鹿港望族，您三十載田野踏查的經驗如何看待「${mainHerbName}」的常民體質調養？`,
        `從您著述上百本專著的生藥考證來看，此草藥的有效活性成分在高溫久煮後會被破壞嗎？`,
        `您創立與主持多個藥學慈善社團，在日常保健茶飲上最重視哪些用藥安全與西藥交互作用？`
      ];
    } else if (expert.id === 'yaoshan_master') {
      return [
        `李老師，《藥膳學》中提到「隔水燉」與「直接燉」在藥效提取上有何關鍵差異？`,
        `日常餐桌上如果想用「${mainHerbName}」入膳，最經典的配伍食材與烹調步驟是什麼？`,
        `請問衛福部公告之215項可同時供食品使用之中藥材，在家庭自煮藥膳時有哪些用量安全指引？`
      ];
    } else if (expert.id === 'kenshin_guide') {
      return [
        '我想自己調配青草茶飲，系統有什麼工具能用？',
        '如何查詢全台各地老字號青草行與採買指南？',
        '草木書閣如何線上試閱與購買書籍？',
        '我想橫向比對兩種草藥的性味與歸經，怎麼操作？',
        '典藏後台支援哪些管理功能與資料匯入？'
      ];
    } else {
      return [
        `督邁達人，刺蔥除了煮茶，在原住民部落裡都怎麼料理？`,
        `在台灣野外採野菜，有哪些容易認錯的安全辨識技巧？`,
        `阿美族老人家常喝的山苦瓜茶，真的能調節體力嗎？`
      ];
    }
  }

  /**
   * 專家 LLM AI 配方建議功能 (Expert Formulation Recommendation)
   */
  async formulateRecipe({ userNeeds, expertId = 'wanhua_uncle', targetType = 'herbal_tea' }) {
    if (!userNeeds || userNeeds.trim() === '') {
      throw new Error('請輸入欲諮詢的配方生活需求或體質症狀');
    }

    const expert = this.getExpert(expertId);
    const retrieved = await this.retrieveContext(userNeeds);
    const topHerbs = retrieved.slice(0, 4);

    const citations = topHerbs.map(({ herb, reason }) => ({
      id: herb.id,
      name: herb.name,
      scientificName: herb.scientificName,
      category: herb.category,
      nature: herb.nature,
      channels: herb.channels,
      partsUsed: herb.partsUsed,
      folkApplication: herb.folkApplication,
      safetyLevel: herb.safetyLevel,
      thumbnailUrl: herb.thumbnailUrl,
      relevanceReason: reason,
      taiwanHeritage: herb.taiwanHeritage
    }));

    const roles = ['君', '臣', '佐', '使'];
    const composition = topHerbs.map(({ herb }, idx) => ({
      herbId: herb.id,
      herbName: herb.name,
      scientificName: herb.scientificName,
      nature: herb.nature,
      channels: herb.channels,
      role: roles[idx] || '佐',
      amount: idx === 0 ? '15 - 20g' : idx === 1 ? '10 - 15g' : '5 - 10g',
      reason: idx === 0
        ? `君藥。以 ${herb.name} 主攻需求，發揮 ${herb.efficacy.slice(0, 24)} 核心效用。`
        : idx === 1
        ? `臣藥。輔助增強 ${herb.name} 之調理力道。`
        : idx === topHerbs.length - 1
        ? `使藥。調和諸藥氣味，引經入絡。`
        : `佐藥。佐助制約寒熱偏頗，兼顧滋味。`,
      thumbnailUrl: herb.thumbnailUrl
    }));

    let formulaName = '';
    const mainName = topHerbs[0]?.herb.name || '本土青草';
    if (expert.id === 'wanhua_uncle') {
      formulaName = `林萬吉傳承 · ${mainName}清寧甘露茶`;
    } else if (expert.id === 'hakka_grandmother') {
      formulaName = targetType === 'bath_soak'
        ? `獅潭阿婆親傳 · ${mainName}辟邪安神浴湯`
        : `客庄長老親傳 · ${mainName}溫經潤胃飲`;
    } else if (expert.id === 'pharmacist_phd') {
      formulaName = `黃世勳教授研訂 · ${mainName}本草清潤方`;
    } else if (expert.id === 'yaoshan_master') {
      formulaName = `李昭瑩名師傳承 · ${mainName}御膳滋補方`;
    } else {
      formulaName = `部落獵人古傳 · ${mainName}山林元氣精力方`;
    }

    // Persona-driven formulation synthesis
    const detailedAdviceMarkdown = this.synthesizeExpertFormulation(expert, userNeeds, targetType, topHerbs, formulaName);

    return {
      expert: {
        id: expert.id,
        name: expert.name,
        title: expert.title,
        avatar: expert.avatar,
        seal: expert.seal,
        tone: expert.tone,
        isRealExpert: !!expert.isRealExpert,
        characterType: expert.characterType || (expert.isRealExpert ? '真實學者・知識聊天助理' : '知識聊天助理'),
        profileUrl: expert.profileUrl || null
      },
      isRealExpert: !!expert.isRealExpert,
      characterType: expert.characterType || (expert.isRealExpert ? '真實學者・知識聊天助理' : '知識聊天助理'),
      profileUrl: expert.profileUrl || null,
      expertName: expert.name,
      userNeeds,
      targetType,
      formulaName,
      recipeName: formulaName,
      expertAdvice: detailedAdviceMarkdown,
      preparationGuide: '大火煮沸後轉文火慢熬 20-30 分鐘，關火悶香 5 分鐘即可濾渣享用。',
      suggestedHerbs: composition.map(c => c.herbName),
      composition,
      citations,
      detailedAdviceMarkdown,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * 合成專家專屬配方建議口吻與指導
   */
  synthesizeExpertFormulation(expert, userNeeds, targetType, retrieved, formulaName) {
    const mainHerb = retrieved[0].herb;
    const secondaryHerb = retrieved[1] ? retrieved[1].herb : mainHerb;
    const thirdHerb = retrieved[2] ? retrieved[2].herb : null;

    let greeting = '';
    let explanation = '';
    let craftsmanship = '';
    let shopAdvice = '';
    let caution = '';

    if (expert.id === 'wanhua_uncle') {
      greeting = `「少年家！看到你講這句『${userNeeds}』，老萬華青草巷第三代的耳朵就豎起來了！我們西昌街老祖宗熬了七十幾年草藥，這種身體的鬱火濁熱，急不得，要用天地草木慢慢順。」`;
      explanation = `
這次伯仔幫你量身定做的這帖**【${formulaName}】**，講究的是萬華百年老茶席的規矩：
1. **君藥：${mainHerb.name}** —— 取它的 **${mainHerb.nature}性**，走 **${(mainHerb.channels || []).join('、')}經**，先把體內悶燒的暗火從水道排解出去。
2. **臣藥：${secondaryHerb.name}** —— 在旁邊幫忙顧著，補強生津止渴、清心潤肺的力道。
${thirdHerb ? `3. **佐使藥：${thirdHerb.name}** —— 抓一把在後頭調和，讓這壺茶入口順喉，不刮胃、不苦澀。` : ''}
`.trim();
      craftsmanship = `
*   **水量火候**：抓乾草約 40-50g，注清水 2,500 mL。大火大滾 5 分鐘後，**轉文火微滾慢熬 20 分鐘**。青草的甘露味是慢火逼出來的，火太猛反而逼出苦渣味。
*   **飲用時機**：熄火放涼至溫涼即可飲用。伯仔提醒你，千萬不要加滿整杯冰塊狂飲！溫溫地喝，喉嚨跟胃腸才舒服。
`.trim();
      shopAdvice = `到萬華西昌街青草巷（像安立青草店、德安青草行），跟店家講要抓「${mainHerb.name}」跟「${secondaryHerb.name}」，指名要乾度夠、聞起來有天然青草草香的真品，不要買到受潮發霉的陳草。`;
      caution = `「性味偏涼，如果你這兩天肚子受寒拉肚子，或者女生生理期剛來，先放慢腳步別喝太濃。」`;
    } else if (expert.id === 'hakka_grandmother') {
      greeting = `「阿妹阿弟！聽阿婆一句話。你提到『${userNeeds}』，客家人講『土生土長，草木有靈』，人吃五穀雜糧，順應四時節氣，身體哪裡不順，山林裡的草葉就是最好的依靠。」`;
      explanation = `
阿婆從苗栗獅潭客庄老家，為你挑了這帖**【${formulaName}】**：
1. **${mainHerb.name}**：客家庄最珍貴的山林草木，**${mainHerb.nature}性**，溫和調理，幫你把身體裡滯留的濕濁給化開。
2. **${secondaryHerb.name}**：配伍在旁相生相助，香氣通透，安撫心神。
${thirdHerb ? `3. **${thirdHerb.name}**：性平溫潤，調和全鍋草料，喝起來或洗起來都溫暖舒服。` : ''}
`.trim();
      craftsmanship = `
*   **熬煮方法**：${targetType === 'bath_soak' ? '大鍋注水 5,000 mL，大火燒滾 20 分鐘，煮成濃金黃色藥湯倒入浴桶，調至 40°C 擦澡或浸泡 15 分鐘，洗完趕緊穿暖，切防受風！' : '注水 2,000 mL，文火慢煮 20 分鐘，茶香飄滿屋子就能起鍋。阿婆建議可以丟兩枚紅棗，滋味更甘潤。'}
`.trim();
      shopAdvice = `採購時可到客庄老字號青草舖（如苗栗獅潭老藥舖、新竹竹蓮青草行），選購無硫磺低溫乾燥的純淨客庄本草包。`;
      caution = `「洗浴或喝茶後，記得不要吹電風扇或冷氣強風，讓毛細孔自然收汗，元氣才固得住。」`;
    } else if (expert.id === 'pharmacist_phd') {
      greeting = `「您好，我是黃世勳。出身彰化鹿港，研索臺灣本草三十餘載、著述百本。針對您所諮詢的體質需求：『${userNeeds}』，我們秉持鹿港文風仁心濟世精神，結合歷代本草典籍考據與現代藥用植物學理，為您研訂具備學理依據的本草配方。」`;
      explanation = `
本方**【${formulaName}】**遵循天然植物化學成分之相乘與協同效應 (Synergy)：
1. **主要活性靶點 (君)：${mainHerb.name}** (${mainHerb.scientificName}) —— 含有 **${(mainHerb.activeCompounds || ['多酚類', '黃酮苷']).join('、')}**，能發揮抗氧化、抗發炎及調節生理機能之核心效用。
2. **協同輔助組分 (臣)：${secondaryHerb.name}** (${secondaryHerb.scientificName}) —— 提供天然植物多醣與微量元素，增強黏膜屏障與防護活性。
${thirdHerb ? `3. **緩釋與生物利用度調控 (佐/使)：${thirdHerb.name}** —— 具備天然皂苷或有機酸，增進有效成分之腸道吸收率並降低單味藥物之胃腸道刺激。` : ''}
`.trim();
      craftsmanship = `
*   **萃取規格**：建議水藥比例為 1:20 (約 30g 藥材對 1,500 mL 去離子水或純淨水)。
*   **煎煮溫度控制**：沸騰後維持微沸 (90-95°C) 煎煮 15-20 分鐘，避免高溫長時間沸騰導致揮發性萜類精油熱降解。
`.trim();
      shopAdvice = `建議前往通過檢驗合格、具備產銷履歷之結盟青草店或農會合作門市（如名間鄉草藥產銷門市、吉安鄉青草產銷中心）選購通過農殘重金屬檢驗之合格乾燥品。`;
      caution = `「本配方純屬日常機能性草本飲品，若有長期慢性病正在服用抗凝血劑、降血壓西藥者，建議與常規西藥間隔 2 小時以上分開服用。」`;
    } else if (expert.id === 'yaoshan_master') {
      greeting = `「您好！我是李昭瑩。在《藥膳學》中，我們將四氣五味與餐桌食療嚴謹結合。針對您所提的需求：『${userNeeds}』，我依據君臣佐使食療配伍與歷代食醫典籍，為您量身配製這道兼具美味與調養的道地藥膳。」`;
      explanation = `
本藥膳**【${formulaName}】**依循《藥膳學》四氣五味合臟腑之調理法則：
1. **君膳主料：${mainHerb.name}** —— 針對您的體質需求發揮主治食療效用，充養臟腑氣血。
2. **臣膳輔弼：${secondaryHerb.name}** —— 輔助主藥生發氣陰，相生相旺。
${thirdHerb ? `3. **佐使相成：${thirdHerb.name}** —— 調和全鍋滋味，護衛脾胃，使補而不滯、滋而不膩。` : ''}
`.trim();
      craftsmanship = `
*   **隔水燉與煨燉心法**：藥膳最講究「隔水燉」或「文火慢煨」，加蓋密封隔水蒸燉 45-60 分鐘，藥效深透且香氣不散。
*   **調味少鹽免精**：起鍋前僅加微量天然海鹽或米酒提香，保留食材自然清甜。
`.trim();
      shopAdvice = `推薦選購衛福部核准之 215 項可供食品使用中藥材，選擇外觀潔淨、無硫磺燻蒸與無霉變之上品食材。`;
      caution = `「《內經》有云：『熱者寒之，寒者熱之』，藥膳應隨個人寒熱虛實調整，切忌盲目大補或過食寒涼。」`;
    } else {
      greeting = `「Masalu！朋友，來自山林的問候。你說遇到『${userNeeds}』，部落獵人常在山裡走，風吹雨淋、涉溪過澗，身體有任何疲累，山林裡的草木就是最真誠的解方。」`;
      explanation = `
為你採集調配的這帖**【${formulaName}】**，凝聚了部落千百年與森林共生的生存記憶：
1. **山林主力：${mainHerb.name}** —— 吸收東台灣深山泥土與陽光精華，滋味野性強烈，幫你強固筋骨、喚醒身體沉睡的元氣。
2. **森林之翼：${secondaryHerb.name}** —— 散發大山芬多精香氣，舒展胸口沉悶濁氣。
${thirdHerb ? `3. **部落溫厚之根：${thirdHerb.name}** —— 顧好脾胃底氣，讓體力持久耐操。` : ''}
`.trim();
      craftsmanship = `
*   **山林野烹法**：${targetType === 'tonic_soup' ? '先用草木煮出甘香底湯，再投入鮮魚塊或排骨慢火滾熟，起鍋前撒入鮮葉，加一點天然海鹽，野香四溢！' : '冷水慢熬 20 分鐘，茶色如山中紅酒，溫熱大口喝下，暖流直通全身手腳。'}
`.trim();
      shopAdvice = `若想尋覓純正原鄉野生草藥，推薦聯絡花蓮吉安青草產銷中心或台東太麻里原鄉本草合作社，挑選部落小農友善耕作之自然珍品。`;
      caution = `「山林草藥力量剛烈，體質燥熱口舌發炎時請放慢節奏慢慢喝，感受土地順時節奏。」`;
    }

    const legalDisclaimer = `
---
> 📜 **【臺灣本草知識庫 · 專家 AI 客製配方非醫療宣稱告示】**  
> 本專家配方建議係根據臺灣民間傳統風土古籍、常民生活文化及生藥學特徵合成分享，**絕無任何醫療效果宣稱，亦不可取代合格醫師之診斷與處方**。若有慢性病、孕期或身體持續不適，請務必尋求合格中西醫師診治。
`.trim();

    return `
### 🌿 ${formulaName}
> **推薦專家**：${expert.name}（${expert.title}） · **調理類型**：${targetType === 'bath_soak' ? '🛁 外洗藥浴' : targetType === 'ointment_paste' ? '🧴 外用敷膏' : targetType === 'tonic_soup' ? '🍲 藥膳燉湯' : '🍵 民俗青草茶'}

${greeting}

---

#### ⚖️ 一、君臣佐使配伍心法
${explanation}

---

#### 🍯 二、傳統工藝熬煮與炮製指導
${craftsmanship}

---

#### 🏪 三、結盟青草店選購避坑指引
${shopAdvice}

---

#### ⚠️ 四、生活節制與體質禁忌
${caution}

${legalDisclaimer}
`.trim();
  }
}

module.exports = new RagService();
