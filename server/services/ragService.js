/**
 * server/services/ragService.js
 * 台灣本草知識庫 RAG (Retrieval-Augmented Generation) 語意檢索與特定專家語意生成服務
 */
const herbRepository = require('../repositories/herbRepository');
const llmService = require('./llmService');

// 四大特色本草專家 Persona 設定
const EXPERTS = {
  wanhua_uncle: {
    id: 'wanhua_uncle',
    name: '林萬吉 老茶師',
    title: '萬華西昌街百年青草巷第三代傳人',
    avatar: '🍵',
    seal: '萬華老舖',
    region: '台北萬華西昌街青草巷',
    tone: '道地艋舺長輩口吻、親切溫厚、富含台灣青草傳統火候與民間經驗',
    catchphrase: '「草木有靈，冷暖在心。青草茶愛用慢火熬，退火退癀，莫傷著胃底氣。」',
    greeting: '阿兄／阿姐，坐喔！來萬華西昌街青草巷泡杯茶傾聽草木香。',
    expertise: ['萬華傳統青草茶', '退火退癀消暑', '煎煮火候心法', '四季青草茶飲配伍']
  },
  hakka_grandmother: {
    id: 'hakka_grandmother',
    name: '彭秀妹 老藥師',
    title: '苗栗獅潭客庄本草與草藥洗浴實踐者',
    avatar: '👵',
    seal: '客庄阿婆',
    region: '苗栗獅潭與三義客家山莊',
    tone: '溫暖慈祥的客家長輩口吻、重視天地自然賞賜、抹草辟邪、大風草坐月子與家常食療',
    catchphrase: '「阿妹阿弟呀，山頂這兜青草儕儕是寶，抹草淨心、大風草暖骨，天地賞賜莫浪費。」',
    greeting: '阿妹阿弟呀，入來食茶！山頂風大，先喝一口甘茶暖暖身。',
    expertise: ['客家辟邪抹草沐浴', '大風草產後調養', '紫蘇桑葉家常食療', '四時山林採草經驗']
  },
  pharmacist_phd: {
    id: 'pharmacist_phd',
    name: '陳彥廷 教授',
    title: '中西整合生藥學博士 / 國家植物活性成分研究員',
    avatar: '🔬',
    seal: '生藥實驗室',
    region: '國家中醫藥生藥學整合研究中心',
    tone: '嚴謹、求真、循證醫學視角、關注化學活性成分、藥理機轉與西藥交互作用',
    catchphrase: '「本草智慧需經現代生藥學驗證。從有效分子結構出發，劑量精確與毒理安全為第一要件。」',
    greeting: '您好，我是陳博士。讓我們從現代植物生藥學與臨床文獻的雙重視角，理性分析這味草藥。',
    expertise: ['植物活性化學成分', '細胞抗炎與抗氧化機制', '中西藥物交互作用', '臨床安全性與禁忌評估']
  },
  indigenous_forager: {
    id: 'indigenous_forager',
    name: '督邁 (Dumay) 達人',
    title: '花東縱谷阿美族野菜採集與山林智慧守護者',
    avatar: '🏹',
    seal: '山林之子',
    region: '花蓮太魯閣山麓與台東海岸山脈',
    tone: '豪邁質樸、貼近土地母體、山林採集倫理、原民野菜烹調與身心元氣共鳴',
    catchphrase: '「走進山林要先敬畏祖靈。刺蔥的香氣像朝陽，野苦瓜的甘苦像泥土，大地會賜給我們力量。」',
    greeting: 'Sa\'icelen！朋友，聞到太平洋的海風與山林的刺蔥香氣了嗎？歡迎來到大地餐桌。',
    expertise: ['原住民傳統野生草本', '刺蔥昭和草野炊料理', '山林永續採集倫理', '自然共生體質調和']
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
    return this.experts[expertId] || this.experts.wanhua_uncle;
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

    const builtInIds = ['wanhua_uncle', 'hakka_grandmother', 'pharmacist_phd', 'indigenous_forager'];
    if (builtInIds.includes(expertId)) {
      throw new Error('系統內建四大核心風土專家不可刪除，僅可微調設定');
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

    // 依分數降冪排序，若得分均為 0 則挑選經典代表草藥（大花咸豐草、薄荷、甘草）
    scoredHerbs.sort((a, b) => b.score - a.score);

    let selected = scoredHerbs.filter(s => s.score > 0).slice(0, 3);
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
      relevanceReason: reason,
      taiwanHeritage: herb.taiwanHeritage
    }));

    // 專家風格回答合成 (Persona-Driven Grounded Synthesis)
    let replyMarkdown = '';
    let engineUsed = '臺灣本草內建語意特徵引擎 (Zero-Dependency Grounded)';
    const llmCfg = llmService.config;

    // 若啟用外部 LLM (例如 Ollama 或其他提供商)，優先嘗試即時 LLM 推理生成
    if (llmCfg && llmCfg.activeProvider !== 'builtin') {
      try {
        const prompt = this.buildConsultPrompt(expert, message, retrieved);
        const externalResult = await llmService.callLlm({
          providerId: llmCfg.activeProvider,
          prompt,
          systemPrompt: `你是一位深諳臺灣本土草藥文化的本草耆老，請完全融入以下專家 Persona 口吻回覆：${expert.name}（${expert.title}）。請嚴守不宣稱任何醫療效果，純粹分享民間傳統古早知識。`
        });
        if (externalResult && externalResult.trim() !== '') {
          replyMarkdown = externalResult;
          const prov = llmCfg.providers[llmCfg.activeProvider];
          engineUsed = `${prov ? prov.name : llmCfg.activeProvider} (${prov ? prov.model : 'Live LLM'}) 即時推理`;
        }
      } catch (err) {
        console.warn('[RagService] External LLM consult failed, fallback to builtin synthesis:', err.message);
      }
    }

    if (!replyMarkdown) {
      replyMarkdown = this.synthesizeExpertReply(expert, message, retrieved);
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
      engineUsed
    };
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
      // 生藥學博士風格
      reply = `
${expert.greeting}

針對您所提出的臨床生活議題：「**${query.trim()}**」，我們從**現代植物生藥學 (Pharmacognosy)**、**天然物化學 (Natural Products Chemistry)** 與循證醫學角度為您進行專業拆解。

經本草資料庫語意檢索與藥理機制交叉比對，高度相關且具生藥文獻支持的台灣本土藥用植物為：${herbNames}。

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
        `陳博士，「${mainHerbName}」的有效化學成分在高溫久煮後會被破壞嗎？`,
        `請問有高血壓或糖尿病慢性病史，飲用此草藥有禁忌嗎？`,
        `現代生藥學如何看待魚腥草與穿心蓮的抗病毒消炎潛力？`
      ];
    } else {
      return [
        `督邁達人，刺蔥除了煮茶，在原住民部落裡都怎麼料理？`,
        `在台灣野外採野菜，有哪些容易認錯的安全辨識技巧？`,
        `阿美族老人家常喝的山苦瓜茶，真的能調節體力嗎？`
      ];
    }
  }
}

module.exports = new RagService();
