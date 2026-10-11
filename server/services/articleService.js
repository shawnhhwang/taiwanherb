/**
 * server/services/articleService.js
 * 本草專題與深度文章生成實驗室 (Herbal Narrative & Article Studio)
 * 根據資料庫真實草藥 Grounding，融合 4 大專家 Persona 口吻，並能指定特定目標受眾生成專業專題文章
 */
const herbRepository = require('../repositories/herbRepository');
const ragService = require('./ragService');
const llmService = require('./llmService');

// 目標受眾定義表
const AUDIENCES = {
  general: {
    id: 'general',
    name: '一般大眾 / 社區居民',
    focus: '生活化、淺顯易懂、居家保健茶飲、順應台灣四季生活節奏',
    styleHint: '語言親切和藹，避免過於晦澀艱深的術語，重點在於日常如何輕鬆享用。'
  },
  children: {
    id: 'children',
    name: '國小學童 / 親子家庭',
    focus: '植物童話趣味、五感自然探索、野外小偵探觀察、寓教於樂的島嶼生態啟蒙',
    styleHint: '語調生動活潑，多用譬喻與擬人化手法，引導小朋友觀察葉子形狀、花朵顏色與香氣。'
  },
  office: {
    id: 'office',
    name: '久坐熬夜上班族 / 現代外食族',
    focus: '緩解螢幕眼疲勞、肩頸緊繃、辦公室降火解燥、外食消化調和、超便利茶包沖泡',
    styleHint: '節奏明快，直擊上班族現代生活痛點，提供在辦公桌或保溫瓶就能即沖即飲的草本提案。'
  },
  elderly: {
    id: 'elderly',
    name: '銀髮樂齡長輩 / 熟齡養生者',
    focus: '溫和固本、祛風舒筋、睡眠調理、脾胃溫潤、用藥安全與西藥間隔禁忌',
    styleHint: '字句溫暖穩重，強調循序漸進、不寒不燥的傳統節氣養身之道，特別注重安全警語。'
  },
  researcher: {
    id: 'researcher',
    name: '生藥學者 / 農業生技研發者',
    focus: '天然物化學活性分子、細胞藥理機轉、生藥學文獻考據、台灣島嶼特有地理氣候成分富集',
    styleHint: '嚴謹客觀、採用學術文獻規格，解析活性化合物、萃取工藝、受體途徑與臨床毒理數據。'
  },
  campers: {
    id: 'campers',
    name: '戶外露營登山者 / 野行探險愛好者',
    focus: '野外草本辨識、防蚊蟲咬傷急救止癢、山林採集倫理、野炊草本入菜、戶外求生應用',
    styleHint: '充滿山野冒險氣息，強調敬畏自然與永續採集守則，傳授在營地野炊與輕裝徒步的實用草本妙方。'
  }
};

// 文章體裁定義
const ARTICLE_TYPES = {
  story: { id: 'story', name: '風土傳奇故事 / 文化紀行' },
  guide: { id: 'guide', name: '居家日常調養與沖泡指南' },
  specimen: { id: 'specimen', name: '植物學與生藥誌專文' },
  recipe: { id: 'recipe', name: '四季草本藥膳與野炊手記' }
};

class ArticleService {
  /**
   * 取得受眾選項與文章體裁列表
   */
  getOptions() {
    return {
      audiences: Object.values(AUDIENCES),
      articleTypes: Object.values(ARTICLE_TYPES),
      experts: ragService.getExperts()
    };
  }

  /**
   * 生成以資料庫本草為 Grounding 的專題文章
   */
  async generateArticle({
    herbIds = [1],
    expertId = 'wanhua_uncle',
    targetAudience = 'general',
    articleType = 'story',
    customNotes = ''
  }) {
    // 1. 從資料庫提取真實本草資料 (Grounded Knowledge)
    const validIds = Array.isArray(herbIds) ? herbIds : [herbIds];
    const herbs = [];

    for (const id of validIds) {
      const herb = await herbRepository.getById(id);
      if (herb) herbs.push(herb);
    }

    if (herbs.length === 0) {
      throw new Error('請至少選擇一味資料庫中有效的本草藥材');
    }

    // 2. 取得專家 Persona 與目標受眾設定
    const expert = ragService.getExpert(expertId);
    const audience = AUDIENCES[targetAudience] || AUDIENCES.general;
    const typeInfo = ARTICLE_TYPES[articleType] || ARTICLE_TYPES.story;

    // 3. 嘗試外接 LLM 或是高品質內建語意引擎生成
    const llmCfg = llmService.config;
    let articleMarkdown = '';
    let engineUsed = 'builtin-grounded-engine';

    // 若配置了外部 LLM API (例如 Gemini / OpenAI / Claude) 且非 builtin
    if (llmCfg.activeProvider !== 'builtin') {
      try {
        const prompt = this.buildPrompt({ herbs, expert, audience, typeInfo, customNotes });
        // 呼叫外部 API
        const externalResult = await this.callExternalLlm({
          provider: llmCfg.providers[llmCfg.activeProvider],
          prompt,
          systemPrompt: `你是一位資深的臺灣本草植物誌專欄作家，請完全融入以下專家 Persona 口吻撰寫文章：${expert.name} (${expert.title})。`
        });

        if (externalResult && externalResult.trim() !== '') {
          articleMarkdown = externalResult;
          engineUsed = `${llmCfg.activeProvider} (${llmCfg.providers[llmCfg.activeProvider].model})`;
        }
      } catch (externalErr) {
        console.warn('[ArticleService] External LLM failed, fallback to builtin:', externalErr.message);
      }
    }

    // 若為內建引擎或外部 LLM 降級退避，使用精緻的內建語意合成器
    if (!articleMarkdown) {
      articleMarkdown = this.synthesizeGroundedArticle({ herbs, expert, audience, typeInfo, customNotes });
      engineUsed = '臺灣本草內建語意敘事引擎 (Zero-Dependency Offline)';
    }

    // 提煉文章標題
    const titleMatch = articleMarkdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `【${expert.name}說本草】${herbs.map(h => h.name).join('與')}之島嶼生活誌`;

    return {
      title,
      expert: {
        id: expert.id,
        name: expert.name,
        title: expert.title,
        avatar: expert.avatar,
        seal: expert.seal
      },
      audience: {
        id: audience.id,
        name: audience.name
      },
      articleType: {
        id: typeInfo.id,
        name: typeInfo.name
      },
      herbsUsed: herbs.map(h => ({
        id: h.id,
        name: h.name,
        scientificName: h.scientificName,
        region: h.region,
        nature: h.nature
      })),
      engineUsed,
      markdownContent: articleMarkdown,
      wordCount: articleMarkdown.length,
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * 內建高品質本草專題語意合成引擎 (零依賴、純離線、保證高品質)
   */
  synthesizeGroundedArticle({ herbs, expert, audience, typeInfo, customNotes }) {
    const mainHerb = herbs[0];
    const secondaryHerbs = herbs.slice(1);
    const herbNames = herbs.map(h => `「${h.name}」`).join('、');

    let title = '';
    let intro = '';
    let bodySection1 = '';
    let bodySection2 = '';
    let audienceGuidance = '';
    let expertAdvice = '';

    // 依文體生成標題
    if (typeInfo.id === 'story') {
      title = `# 🌿 島嶼本草紀行：${expert.name} 帶您尋訪 ${herbNames} 的風土歲月`;
    } else if (typeInfo.id === 'guide') {
      title = `# 🫖 ${expert.name} 傳授：專為【${audience.name}】打造的 ${herbNames} 日常調養手冊`;
    } else if (typeInfo.id === 'specimen') {
      title = `# 🔬 臺灣本草植物誌專題：${mainHerb.name} (${mainHerb.scientificName || '生藥考察'}) 的風土與現代醫學`;
    } else {
      title = `# 🍲 草木野炊食記：${expert.name} 的四季本草藥膳 —— ${herbNames} の味覺譜系`;
    }

    // 依專家 Persona 產生序言口吻
    if (expert.id === 'wanhua_uncle') {
      intro = `
${expert.greeting}

坐在萬華西昌街百年青草巷的老木板凳上，撲鼻而來的是幾代人熬煮草藥的溫潤香氣。${expert.catchphrase}

今天老茶師我特別想跟各位${audience.name}的朋友，好好聊聊我們台灣土地恩賜的${herbNames}。很多年輕人以為青草茶只是退火飲料，其實每一把青草採摘的節氣、風乾的日光，背後都是台灣人與氣候土地相依為命的深厚感情。
      `.trim();
    } else if (expert.id === 'hakka_grandmother') {
      intro = `
${expert.greeting}

山風輕輕吹過苗栗客庄的丘陵田埂，阿婆手裡剛收割完一把青翠的草藥。${expert.catchphrase}

阿妹阿弟呀，今天的這篇文章，阿婆是專門為【${audience.name}】寫的心裡話。在我們客家庄，孩子生病或長輩疲累，老祖宗不急著用猛藥，而是走到向陽的林蔭山腳下，採一把${herbNames}。天地賞賜的草木甘甜，順著喝下去，骨頭裡的寒氣與心頭的煩悶自然就解開了。
      `.trim();
    } else if (expert.id === 'pharmacist_phd') {
      intro = `
${expert.greeting}

作為長期從事中西整合生藥學與天然產物化學的研究者，${expert.catchphrase}

針對本次專題鎖定的受眾族群【${audience.name}】，我們將以現代循證植物醫學為經緯，系統性梳理臺灣特色本草${herbNames}之植物形態學、次級代謝產物（Secondary Metabolites）以及分子層級的健康調控機轉。
      `.trim();
    } else if (expert.id === 'indigenous_forager') {
      intro = `
${expert.greeting}

站在花東縱谷的溪谷山風中，遠方的太平洋泛著粼粼波光。${expert.catchphrase}

各位【${audience.name}】的朋友，獵人走進山林，第一件事不是尋找獵物，而是彎下腰認識腳下的草木。今天督邁要跟大家分享的${herbNames}，正是部落世代相傳的大地精華。山林不會說謊，只要你懂得採集的規矩與草木的性格，這片土地隨時都是最豐盛的滋養餐桌！
      `.trim();
    } else {
      intro = `
${expert.greeting || '各位朋友，大家好！'}

秉持著${expert.catchphrase || '「順應天地節氣，品讀本草芳華」'}之初衷，本期專題為【${audience.name}】精心呈現臺灣本土典藏本草${herbNames}之深度專訪與生活實踐。
      `.trim();
    }

    // 核心本草本體解析 (以資料庫 Grounding 資料嚴謹展開)
    bodySection1 = `
---

### 🍃 【本草風土考證：${mainHerb.name} 的島嶼印記】
* **植物學名**：*${mainHerb.scientificName || '學名考據中'}*（隸屬 **${mainHerb.family || '本土科屬'}**）
* **島嶼原生境域**：${mainHerb.region || '臺灣全島平野與山麓'}
* **中醫性味與十二歸經**：性**${mainHerb.nature || '平'}**，味**${(mainHerb.taste || []).join('、')}**，入**${(mainHerb.channels || []).join('、')}**經。
* **民間應用與部位**：入藥部位為${mainHerb.partsUsed || '全草'}，民間生活常作為「${mainHerb.folkApplication || '家常煎煮、清涼解表'}」。

> **風土典藏紀事**：  
> ${mainHerb.taiwanHeritage || mainHerb.terroir || '臺灣島嶼日照充沛、季風帶來豐沛雨露，造就了本草植物豐富的次級代謝成分與清冽甘美的草本氣韻。'}

${secondaryHerbs.length > 0 ? `
#### 🌿 【佐使配伍草木】
${secondaryHerbs.map(h => `* **${h.name}** (*${h.scientificName || ''}*)：性${h.nature}，歸${(h.channels || []).join('、')}經，主導功效為「${h.efficacy}」，與主草配伍可達相輔相成之妙。`).join('\n')}
` : ''}
    `.trim();

    // 藥理與生活功效解析
    bodySection2 = `
---

### 🍵 【功效機轉與生活智慧：為什麼它能調和身心？】
${mainHerb.efficacy || '清熱調和、生津止渴、舒緩身心緊繃。'}

在傳統本草記載中，${mainHerb.name}以「**${mainHerb.nature || '性平'}**」著稱，能入**${(mainHerb.channels || []).join('、')}**。若從現代生藥觀點觀察，其所蘊含的多酚類、類黃酮與揮發性芬芳分子，在熱水浸提的過程中能溫和溶出，既不傷脾胃元氣，又能迅速透過嗅覺與味蕾平撫交感神經。
    `.trim();

    // 針對指定目標受眾量身定制的指南
    audienceGuidance = this.generateAudienceGuidance(audience, mainHerb, secondaryHerbs);

    // 專家安全叮嚀
    expertAdvice = `
---

### ⚠️ 【${expert.name} 給【${audience.name}】的安全備忘錄】
> **安全等級評定**：\`${mainHerb.safetyLevel || '無毒常服'}\`  
> **日常禁忌注意**：${mainHerb.contraindications || '性味平和，唯體質偏虛寒者建議溫服或加入少量枸杞紅棗調和。'}  
${customNotes ? `> **特別客製備註**：${customNotes}\n` : ''}
> **專家心法總結**：草藥不是神藥，它是大自然送給臺灣島嶼兒女的生活良伴。學會辨認、學會慢下來喝一杯草木清茶，身體與心靈自能重新找回與大地共振的節奏！
    `.trim();

    return [
      title,
      intro,
      bodySection1,
      bodySection2,
      audienceGuidance,
      expertAdvice
    ].join('\n\n');
  }

  /**
   * 根據受眾角色生成客製化的生活引導段落
   */
  generateAudienceGuidance(audience, mainHerb, secondaryHerbs) {
    const secName = secondaryHerbs.length > 0 ? secondaryHerbs[0].name : '甘草';

    switch (audience.id) {
      case 'children':
        return `
---

### 🎒 【小草偵探時間：專屬小朋友與爸媽的野外自然課】
1. **摸一摸與聞一聞**：小朋友走進山林或公園，找找看「${mainHerb.name}」！輕輕用手指搓搓它的葉片，閉上眼睛深呼吸，有沒有聞到一股大自然剛下過雨的青草香？
2. **植物超能力的秘密**：植物不會走路，為了在強烈的太陽下保護自己，它會自己製造好香好香的法寶葉綠素與天然保護罩。泡成茶喝進肚子裡，就像在肚子裡組裝了一支綠色小小守護隊！
3. **親子共煮草本魔法茶**：請爸爸媽媽幫忙燒開熱水，放進乾燥的 ${mainHerb.name}，觀察透明的水慢慢變成淡金琥珀色，加一滴蜂蜜攪拌，就是最天然的草本夏日魔法汽水！
        `.trim();

      case 'office':
        return `
---

### 💼 【久坐外食族救星：辦公桌上的草本解壓方程式】
1. **螢幕眼澀與肩頸降火**：盯著電腦螢幕八小時，體內虛火上升、口乾舌燥。取 ${mainHerb.name} 乾燥品 5-8g，搭配少許 ${secName}，放入辦公室保溫杯。
2. **超簡便保溫瓶悶泡法**：以 95℃ 熱水注滿保溫瓶，旋緊杯蓋悶泡 10 分鐘即可飲用。下午茶時間捨棄含糖手搖飲，換成這杯無糖微甘的草本熱飲，喉嚨立即通透生津。
3. **外食油膩消除對策**：午餐吃完高油高鹽的便當後，溫熱飲用 200cc，有助脾胃運化、緩解腹脹與午後嗜睡昏沈。
        `.trim();

      case 'elderly':
        return `
---

### 👵 【樂齡頤養心法：銀髮長輩的溫和草本固本方】
1. **溫熱飲用，忌生冷牛飲**：長輩脾胃陽氣較弱，飲用 ${mainHerb.name} 切記不可喝冰涼或冷藏品。應當趁著溫熱時小口慢啜，讓草藥甘香順著食道暖暖滋潤丹田。
2. **四季配合節氣飲**：春分秋分換季容易關節酸楚或吹風頭脹，可在煎煮時佐入三片老生薑或少許枸杞，平衡涼性，更能驅寒強骨。
3. **慢病用藥間隔叮嚀**：若平時有服用降血壓、血糖或心血管慢性病處方藥，請務必與此草本茶飲**間隔 1.5 至 2 小時以上**，守護體質更安心。
        `.trim();

      case 'researcher':
        return `
---

### 🔬 【科研視角與生藥轉譯：天然物活性與應用前景】
1. **次級代謝物萃取特徵**：在溶劑回流萃取實驗中，${mainHerb.name} 之主要活性多酚分子與總黃酮類在熱水萃取中溶出率極高，且兼具良好熱穩定性。
2. **抗氧化與抗炎途徑**：在體外細胞抗炎試驗中，其提取物展現對 LPS 誘導之 RAW264.7 巨噬細胞中 NO 釋放具有顯著濃度依賴性抑制效果（IC50 顯著），提示其在預防慢性低度發炎方面具潛在轉譯價值。
3. **產業開發展望**：建議後續可針對臺灣不同海拔產區進行指紋圖譜（HPLC/LC-MS）比對，建立風土地理標誌（GI）生藥標準品規範。
        `.trim();

      case 'campers':
        return `
---

### ⛺ 【山林野行筆記：露營與登山客的荒野草本實踐】
1. **營地野炊甘露湯**：在林間搭好帳篷後，升起高山爐，取乾淨山泉水煮沸，投入洗淨的 ${mainHerb.name}${secondaryHerbs.length > 0 ? ` 與 ${secondaryHerbs[0].name}` : ''}。營火微光伴隨蒸騰的草本香氣，一口喝下驅散深秋山風的寒氣。
2. **戶外防護與急救經驗**：山野行走若遇蚊蟲叮咬或草木輕微刮擦紅腫，在未破皮情況下，取鮮草汁液外敷，具良好清涼安撫之急救效果。
3. **無痕山林採集守則 (Leave No Trace)**：牢記原住民族人的山林採集倫理 —— 只取當日所需嫩葉，不傷根系與幼苗，留花果給山鳥與蜜蜂，敬畏這片孕育草木的島嶼大地。
        `.trim();

      default:
        return `
---

### 🏡 【常民生活應用手冊：四季輕鬆享用草本清香】
1. **家常煎煮標準比例**：準備乾燥 ${mainHerb.name} 約 15-20 克，清水 1200cc。大火煮沸後轉小火慢煮 15 分鐘，熄火悶 5 分鐘後即可濾出茶湯。
2. **冷熱皆宜好口感**：溫飲甘醇潤喉；夏日若欲涼飲，待放涼至室溫即可，建議少許添加冰糖或薄荷提味，全家大小皆能安心享用。
3. **草本芳香沐浴淨身**：煎煮剩下的草藥渣莫丟棄，裝入棉布袋放入浴缸熱水中泡澡，一身草木芬芳，掃除整日勞碌與疲憊。
        `.trim();
    }
  }

  /**
   * 外部 LLM API Prompt 建構器
   */
  buildPrompt({ herbs, expert, audience, typeInfo, customNotes }) {
    return `
請你以臺灣本草專家「${expert.name}」（${expert.title}）的口吻，為目標受眾「${audience.name}」撰寫一篇引人入勝、專業嚴謹且富含風土文化的專題文章。

【專家口吻與風格規範】
* 稱號與身分：${expert.title}（風土區域：${expert.region}）
* 說話口氣特徵：${expert.tone}
* 代表性口頭禪：${expert.catchphrase}
* 問候語風格：${expert.greeting}

【目標受眾需求】
* 受眾類型：${audience.name}
* 關注重點：${audience.focus}
* 風格提示：${audience.styleHint}

【文章體裁】
* 形式：${typeInfo.name}

【資料庫真實本草 Grounding 數據（請嚴格依據下列事實展開，切勿杜撰植物學名與性味）】
${herbs.map(h => `
- 藥材名稱：${h.name} (${h.scientificName || '臺灣草本'})
- 科屬產區：${h.family} / ${h.region}
- 性味歸經：性${h.nature}，味${(h.taste || []).join('、')}，入${(h.channels || []).join('、')}經
- 藥用部位：${h.partsUsed}
- 核心功效：${h.efficacy}
- 風土記述：${h.terroir || h.taiwanHeritage}
- 民間應用：${h.folkApplication}
- 安全等級：${h.safetyLevel}
- 使用禁忌：${h.contraindications}
`).join('\n')}

${customNotes ? `【自訂附加需求】：${customNotes}` : ''}

【格式要求】
請使用精美 GitHub 格式 Markdown 輸出，包含：
1. 一級標題（富含文藝與風土氣息）
2. 專家風格的親切引言
3. 本草風土特寫與植物學性味考證（引用上述資料庫數據）
4. 針對「${audience.name}」量身打造的日常生活實踐指引或食療指南
5. 專家的安全提醒與使用禁忌
    `.trim();
  }

  /**
   * 調用外部 LLM API (依據 provider 設定)
   */
  async callExternalLlm({ provider, prompt, systemPrompt }) {
    if (!provider || !provider.apiKey) {
      throw new Error('未提供有效之 LLM API Key');
    }

    if (provider.id === 'gemini') {
      const url = `${provider.baseUrl.replace(/\/+$/, '')}/v1beta/models/${provider.model}:generateContent?key=${encodeURIComponent(provider.apiKey)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2500 }
        })
      });

      if (!res.ok) {
        throw new Error(`Gemini API 呼叫失敗 (${res.status})`);
      }
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }

    if (provider.id === 'openai') {
      const url = `${provider.baseUrl.replace(/\/+$/, '')}/chat/completions`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${provider.apiKey}`
        },
        body: JSON.stringify({
          model: provider.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2500
        })
      });

      if (!res.ok) {
        throw new Error(`OpenAI API 呼叫失敗 (${res.status})`);
      }
      const data = await res.json();
      return data.choices?.[0]?.message?.content || '';
    }

    throw new Error(`不支援的外部提供商類型：${provider.id}`);
  }
}

module.exports = new ArticleService();
