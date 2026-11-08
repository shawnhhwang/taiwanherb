/**
 * server/data/formulasData.js
 * 臺灣本草專家角色經典配方庫 (民俗青草茶、外洗藥浴、外用敷膏、原鄉藥膳)
 * 涵蓋萬華老茶師、苗栗客庄阿婆、藥學博士、花東獵人四大 Persona 之傳承秘方
 */

const characterFormulas = [
  // ==========================================
  // 1. 林萬吉 老茶師 (萬華西昌街百年青草巷第三代傳人)
  // ==========================================
  {
    id: 'formula_wanhua_classic_tea',
    name: '萬華西昌街百年退火青草茶',
    expertId: 'wanhua_uncle',
    expertName: '林萬吉 老茶師',
    type: 'herbal_tea',
    typeName: '民俗青草茶',
    badge: '青草巷鎮店之寶',
    intent: '大解盛夏溽暑口渴、熬夜火氣大、咽乾舌燥、通利水道小便赤黃',
    summary: '艋舺青草巷傳承三代的甘醇招牌，不苦不澀，清香甘潤，老少咸宜。',
    composition: [
      {
        herbId: 1,
        herbName: '大花咸豐草',
        role: '君',
        amount: '乾品 30g (鮮品 80g)',
        reason: '君藥。大花咸豐草為臺灣青草茶靈魂，善退三焦伏火、清熱解毒、生津利尿。'
      },
      {
        herbId: 12,
        herbName: '鳳尾草',
        role: '臣',
        amount: '乾品 15g',
        reason: '臣藥。苦涼入心胃，加強清心瀉火、涼血解毒之力，消暑降溫神速。'
      },
      {
        herbId: 40,
        herbName: '蟛蜞菊 (黃花蜜菜)',
        role: '臣',
        amount: '乾品 15g',
        reason: '臣藥。青草巷傳統三黃之一，氣味甘潤帶淡花蜜香，潤肺止咳，中和青草寒氣。'
      },
      {
        herbId: 3,
        herbName: '薄荷',
        role: '佐',
        amount: '乾品 6g (起鍋前下)',
        reason: '佐藥。辛涼宣透，芳香解暑，疏散頭面郁熱，令茶湯入口沁涼清爽。'
      },
      {
        herbId: 16,
        herbName: '甘草',
        role: '使',
        amount: '乾品 5g',
        reason: '使藥。甘溫調和諸藥，緩急潤肺，引藥性入脾胃，賦予茶湯天然自然回甘。'
      }
    ],
    brewingGuide: {
      waterAmount: '3,000 mL 清水',
      flameLevel: '大火煮沸後轉文火',
      timeMinutes: 25,
      steps: [
        '將咸豐草、鳳尾草、黃花蜜菜與甘草以冷水快速沖洗去除微塵，裝入純棉煮茶袋中。',
        '注入 3,000 mL 冷水，大火煮沸後立即轉為文火（小火微滾）。',
        '慢火熬煮 20 分鐘，使草木天然多醣與黃酮素充分釋放。',
        '熄火前 2 分鐘投入薄荷葉，隨即熄火蓋鍋燜 5 分鐘（避免薄荷揮發油過度蒸散）。',
        '濾出茶袋，溫飲最甘甜；若欲冷飲，放涼後置冷藏室，切忌加入大量冰塊痛飲以防寒凝傷胃。'
      ],
      sweeteningTip: '若喜微甜，可在熄火茶湯降溫至 60°C 時加入少許台灣黑糖或紅冰糖溶解，滋味更圓潤。'
    },
    usage: '每日當作日常茶飲溫熱飲用 300-500 mL，建議午後或工作勞動出汗後飲用。',
    safetyWarning: '脾胃虛寒容易腹瀉、胃寒隱痛及孕婦不宜大量空腹冰飲。',
    flavorProfile: {
      coldHotIndex: -35,
      bitterness: 2,
      sweetness: 4,
      aroma: '青草花蜜芬芳與薄荷清涼幽香'
    },
    featuredShops: ['shop_wanhua_anli', 'shop_wanhua_dean']
  },
  {
    id: 'formula_wanhua_bitter_tea',
    name: '老艋舺清心消暑大苦茶',
    expertId: 'wanhua_uncle',
    expertName: '林萬吉 老茶師',
    type: 'herbal_tea',
    typeName: '民俗青草茶',
    badge: '苦盡甘來老字號',
    intent: '大瀉體內積熱實火、重度熬夜青春痘、口腔潰瘍破洞、暴飲暴食胃火上升',
    summary: '入口極苦，落喉三秒化為澎湃甘泉！老台北廟埕前傳承百年的消癰排毒重磅涼茶。',
    composition: [
      {
        herbId: 42,
        herbName: '鐵冬青 (救必應)',
        role: '君',
        amount: '乾樹皮 20g',
        reason: '君藥。苦寒走心胃，清熱解毒燥濕，為老苦茶不可或缺的苦甘基調。'
      },
      {
        herbId: 10,
        herbName: '穿心蓮',
        role: '臣',
        amount: '乾品 10g',
        reason: '臣藥。苦寒之極，瀉三焦實火，解咽喉紅腫熱痛與急躁胃火。'
      },
      {
        herbId: 1,
        herbName: '大花咸豐草',
        role: '佐',
        amount: '乾品 25g',
        reason: '佐藥。利尿排熱，引苦寒之毒由水道排出體外。'
      },
      {
        herbId: 16,
        herbName: '甘草',
        role: '使',
        amount: '乾品 8g',
        reason: '使藥。重用甘草和中護胃，防止大苦大寒傷及脾胃正氣，激發回甘力量。'
      }
    ],
    brewingGuide: {
      waterAmount: '2,500 mL 清水',
      flameLevel: '武火滾沸後文火深熬',
      timeMinutes: 35,
      steps: [
        '將救必應樹皮洗淨拍碎，與咸豐草、穿心蓮、甘草放入陶壺或不鏽鋼鍋。',
        '武火燒沸後，轉小文火慢熬 35 分鐘，直熬至湯色烏黑澄亮。',
        '熄火後濾渣倒出，趁熱或溫涼分次小口啜飲。'
      ],
      sweeteningTip: '苦茶講究「苦盡甘來」，老茶師堅持不加糖，入口初苦，但五秒後喉頭會泛起如湧泉般的天然清甜。'
    },
    usage: '火氣極大時每次飲用 150-200 mL，不可一口氣猛灌；連續飲用 2-3 日火退即止。',
    safetyWarning: '孕婦、體質虛弱老人、兒童及慢性胃潰瘍患者嚴禁服用。',
    flavorProfile: {
      coldHotIndex: -70,
      bitterness: 5,
      sweetness: 2,
      aroma: '深沉木質中藥苦甘香'
    },
    featuredShops: ['shop_wanhua_anli', 'shop_tainan_baolai']
  },
  {
    id: 'formula_wanhua_eye_tea',
    name: '西昌街平肝清目明目青草露',
    expertId: 'wanhua_uncle',
    expertName: '林萬吉 老茶師',
    type: 'herbal_tea',
    typeName: '民俗青草茶',
    badge: '熬夜上班族必備',
    intent: '長時間觀看螢幕藍光眼乾澀、肝火頭目眩暈、視物模糊、夜寐不寧',
    summary: '清平肝膽熱毒、舒緩眼壓疲勞的溫潤青草方，茶湯澄澈甘涼，舒心明目。',
    composition: [
      {
        herbId: 41,
        herbName: '葉下珠 (珠仔草)',
        role: '君',
        amount: '乾品 20g',
        reason: '君藥。中台灣與萬華保肝名草，平肝清熱、明目解毒、退黃排濁。'
      },
      {
        herbId: 20,
        herbName: '白鶴靈芝',
        role: '臣',
        amount: '乾品 15g',
        reason: '臣藥。潤肺平肝、清降虛火，富含黃酮，舒緩視神經緊繃。'
      },
      {
        herbId: 14,
        herbName: '枸杞子',
        role: '佐',
        amount: '乾果 12g',
        reason: '佐藥。滋補肝腎、益精明目，平衡清熱藥物之微寒，賦予天然溫潤甘甜。'
      },
      {
        herbId: 15,
        herbName: '桑葉',
        role: '使',
        amount: '乾品 10g',
        reason: '使藥。輕清宣散，疏散風熱、清肝明目，引藥力直達頭面雙目。'
      }
    ],
    brewingGuide: {
      waterAmount: '2,000 mL 清水',
      flameLevel: '中火煮滾轉小火',
      timeMinutes: 20,
      steps: [
        '珠仔草與白鶴靈芝、桑葉冷水洗淨，枸杞子輕輕過水。',
        '將所有草藥投入鍋中，注水 2,000 mL。',
        '中火煮沸後，轉小火加蓋慢滾 20 分鐘即可起鍋。'
      ],
      sweeteningTip: '枸杞子本身含有大量天然枸杞多醣與果糖，茶湯自帶甘甜，無須額外添加任何糖分。'
    },
    usage: '保溫瓶隨身攜帶，上班或讀書時溫熱代茶飲用，每日 500-800 mL。',
    safetyWarning: '感冒初期發高燒惡寒時暫緩飲用枸杞，待表邪解除後再行調理。',
    flavorProfile: {
      coldHotIndex: -15,
      bitterness: 1,
      sweetness: 4,
      aroma: '枸杞甜香與桑葉淡雅清氣'
    },
    featuredShops: ['shop_wanhua_dean', 'shop_taichung_alan']
  },

  // ==========================================
  // 2. 彭秀妹 老藥師 (苗栗獅潭客庄本草與草藥洗浴實踐者)
  // ==========================================
  {
    id: 'formula_hakka_seven_bath',
    name: '客庄辟邪安神七草沐浴湯',
    expertId: 'hakka_grandmother',
    expertName: '彭秀妹 老藥師',
    type: 'bath_soak',
    typeName: '外洗藥浴',
    badge: '客庄百年民俗',
    intent: '端午節避穢淨身、孩童受驚夜啼不寧、參加喪禮或出入醫院後除穢安神、舒緩緊繃筋骨',
    summary: '客家阿婆世代相傳的沐浴神方，芳香溫通，洗去一身穢氣與風寒，通體舒暢安然好眠。',
    composition: [
      {
        herbId: 17,
        herbName: '抹草',
        role: '君',
        amount: '鮮草一束 (約 50g) 或乾品 30g',
        reason: '君藥。客家辟邪第一神草，三出複葉具強烈驅風散穢清氣，安定心神。'
      },
      {
        herbId: 5,
        herbName: '艾草',
        role: '臣',
        amount: '乾品 25g',
        reason: '臣藥。溫經通絡、理氣血、逐寒濕，散發濃厚芳香芬多精辟百穢。'
      },
      {
        herbId: 25,
        herbName: '香茅',
        role: '臣',
        amount: '乾草 20g (切段)',
        reason: '臣藥。苗栗西湖綠金芳香，檸檬醛濃香驅蚊防蟲、舒緩神經疲勞。'
      },
      {
        herbId: 18,
        herbName: '大風草',
        role: '佐',
        amount: '乾品 20g',
        reason: '佐藥。艾納香溫通經絡，祛風行氣，活絡肌表微循環。'
      },
      {
        herbId: 46,
        herbName: '雞屎藤',
        role: '使',
        amount: '乾品 15g',
        reason: '使藥。客庄三月三避邪草，溫潤調和，活血止痛解肌表鬱滯。'
      }
    ],
    brewingGuide: {
      waterAmount: '5,000 mL 大鍋水',
      flameLevel: '大火沸煮',
      timeMinutes: 20,
      steps: [
        '將抹草、艾草、香茅、大風草、雞屎藤放入大棉布袋中紮緊袋口。',
        '大鍋注入 5,000 mL 清水，大火燒滾沸煮 20 分鐘，直到水色轉為金黃琥珀色且整間屋子香氣撲鼻。',
        '將煮好的濃草藥湯倒入浴缸或洗澡木桶中，加入溫水調節水溫至 38-40°C。',
        '沐浴浸泡 15-20 分鐘，或以毛巾沾藥湯由頭頸、背部、胸腹、四肢由上至下擦拭全身。'
      ],
      sweeteningTip: '外洗藥浴切勿加糖，亦嚴禁內服！'
    },
    usage: '每週 1-2 次，或於節氣轉換、受驚心慌、遠行歸來時沐浴淨身。洗後務必迅速擦乾保暖。',
    safetyWarning: '皮膚有大面積開放性傷口或化膿破皮者暫勿浸浴；水溫切忌過熱以防燙傷頭暈。',
    flavorProfile: {
      coldHotIndex: 30,
      bitterness: 1,
      sweetness: 1,
      aroma: '香茅檸檬清芬、艾草古雅藥香與山林芬多精'
    },
    featuredShops: ['shop_miaoli_shitan', 'shop_banqiao_shunan']
  },
  {
    id: 'formula_hakka_postpartum_bath',
    name: '客家大風草產後溫經藥浴方',
    expertId: 'hakka_grandmother',
    expertName: '彭秀妹 老藥師',
    type: 'bath_soak',
    typeName: '外洗藥浴',
    badge: '客家月子國寶',
    intent: '產婦坐月子期間擦澡沐浴、驅散體內產後虛風與寒氣、預防日後筋骨酸痛頭風',
    summary: '客家婦女坐月子的守護神！以大風草配伍老薑溫通經絡，產後百日無頭風。',
    composition: [
      {
        herbId: 18,
        herbName: '大風草 (艾納香)',
        role: '君',
        amount: '乾粗碎葉 60g',
        reason: '君藥。客家婦女產後第一要草，善祛風散寒、活血調氣、溫經通絡。'
      },
      {
        herbId: 5,
        herbName: '艾草',
        role: '臣',
        amount: '乾品 30g',
        reason: '臣藥。暖宮散寒，溫通十二經脈，行氣血。'
      },
      {
        herbId: 28,
        herbName: '刺蔥 (食茱萸根/莖)',
        role: '佐',
        amount: '乾品 20g',
        reason: '佐藥。辛溫除濕，深入筋骨驅寒，防濕氣入骨。'
      },
      {
        herbId: 25,
        herbName: '香茅',
        role: '使',
        amount: '乾品 20g',
        reason: '使藥。清新解鬱，防產後情緒低落，抑菌除異味。'
      }
    ],
    brewingGuide: {
      waterAmount: '8,000 mL 大鍋滾水',
      flameLevel: '大火滾煮轉中火',
      timeMinutes: 30,
      steps: [
        '大風草藥包放入大鍋，加老薑數片拍扁。',
        '注入大鍋水大火燒沸，轉中火滾熬 30 分鐘，藥色濃黑如普洱茶。',
        '取藥湯調至適溫 40°C，產婦在緊閉門窗、無穿堂風之室內擦澡或淋浴。',
        '洗後立即穿著長袖保暖衣物並戴帽吹乾頭髮，切防吹風受涼。'
      ],
      sweeteningTip: '僅供外洗，切勿飲用！'
    },
    usage: '產婦產後第 7 天起至滿月，每日或隔日溫熱擦澡或足浴 1 次。',
    safetyWarning: '剖腹產傷口未癒合拆線前，僅可局部擦澡，不可整個人浸泡浴缸。',
    flavorProfile: {
      coldHotIndex: 50,
      bitterness: 1,
      sweetness: 1,
      aroma: '大風草濃烈溫暖辛香與老薑溫辛氣'
    },
    featuredShops: ['shop_miaoli_shitan', 'shop_pingtung_chaozhou']
  },
  {
    id: 'formula_hakka_herbal_paste',
    name: '客庄青草清熱消暑外用敷膏',
    expertId: 'hakka_grandmother',
    expertName: '彭秀妹 老藥師',
    type: 'ointment_paste',
    typeName: '外用敷膏',
    badge: '山村急救常備',
    intent: '夏季蚊蟲叮咬奇癢紅腫、熱痱濕疹、輕度撞傷瘀青、皮膚紅熱刺痛',
    summary: '客家山林先民隨手採摘新鮮多汁草藥搗爛調和之消炎青草泥，清涼退腫，一抹即舒。',
    composition: [
      {
        herbId: 7,
        herbName: '左手香',
        role: '君',
        amount: '鮮肥厚葉 10 片 (約 30g)',
        reason: '君藥。肉質多汁，抗菌消炎止癢極強，芳香清涼直透肌表。'
      },
      {
        herbId: 39,
        herbName: '落地生根 (倒吊蓮)',
        role: '臣',
        amount: '鮮葉 3 片 (約 20g)',
        reason: '臣藥。大寒涼血消腫，善退皮膚火毒癰疽，止血散瘀。'
      },
      {
        herbId: 40,
        herbName: '蟛蜞菊 (黃花蜜菜)',
        role: '佐',
        amount: '鮮草一小撮 (約 10g)',
        reason: '佐藥。解毒止癢，防止患部過敏抓破。'
      },
      {
        herbId: 36,
        herbName: '含羞草 (見笑草葉)',
        role: '使',
        amount: '鮮葉 10g',
        reason: '使藥。鎮痛消腫，收斂肌膚創口。'
      }
    ],
    brewingGuide: {
      waterAmount: '無須加水，取鮮草天然植物原汁',
      flameLevel: '純天然低溫冷搗，無須加熱',
      timeMinutes: 10,
      steps: [
        '採集鮮左手香、倒吊蓮、黃花蜜菜葉，以冷開水清洗並徹底瀝乾多餘水分。',
        '放入乾淨消毒之木臼或陶瓷研缽中，加入半茶匙食用苦茶油或冷壓麻油。',
        '細緻搗爛至呈現細緻翠綠泥狀藥膏。',
        '以乾淨刮勺塗敷於紅腫蚊蟲叮咬處或挫傷皮膚，外覆乾淨紗布輕敷 15 分鐘後取下洗淨。'
      ],
      sweeteningTip: '外用敷泥，不可食用。亦可加入少許天然蜂蠟隔水加熱融化製成常溫青草膏條。'
    },
    usage: '局部塗敷於紅腫發癢處，每次 15-20 分鐘，每日 2 次。',
    safetyWarning: '開放性深部流血傷口嚴禁塗敷未滅菌之野草泥；若塗敷後皮膚發紅灼熱應立即洗淨停用。',
    flavorProfile: {
      coldHotIndex: -40,
      bitterness: 1,
      sweetness: 1,
      aroma: '強烈薄荷樟腦冰涼感與鮮綠草汁芳香'
    },
    featuredShops: ['shop_pingtung_chaozhou', 'shop_banqiao_shunan']
  },

  // ==========================================
  // 3. 黃世勳 教授 (中國醫藥大學藥學院藥學系教授 / 藥學博士)
  // ==========================================
  {
    id: 'formula_phd_defense_tea',
    name: '國家中醫藥防疫清潤配方',
    expertId: 'pharmacist_phd',
    expertName: '黃世勳 教授 / 藥學博士',
    type: 'herbal_tea',
    typeName: '民俗青草茶',
    badge: '科學驗證配伍',
    intent: '流感換季時節強化上呼吸道黏膜屏障、喉嚨沙啞緊繃、咳嗽乾癢少痰、提升防護力',
    summary: '出身彰化鹿港望族的黃世勳教授，致力臺灣本草三十餘載，結合臺灣國家中醫藥防疫文獻與逾百部典籍精華，以魚腥草配伍桑葉、薄荷、黃耆，科學清潤抗病毒，兼顧扶正祛邪之仁心濟世配伍。',
    composition: [
      {
        herbId: 2,
        herbName: '魚腥草',
        role: '君',
        amount: '乾品 15g (或鮮品 40g)',
        reason: '君藥。富含魚腥草素與槲皮苷，具顯著抗菌抗病毒、清肺解毒排膿良效。'
      },
      {
        herbId: 15,
        herbName: '桑葉',
        role: '臣',
        amount: '乾品 10g',
        reason: '臣藥。疏散風熱、清肺潤燥，阻斷呼吸道病邪深入。'
      },
      {
        herbId: 13,
        herbName: '黃耆',
        role: '佐',
        amount: '切片 10g',
        reason: '佐藥。補氣固表、提升免疫機能，防止清解藥物寒涼傷及衛氣。'
      },
      {
        herbId: 3,
        herbName: '薄荷',
        role: '佐',
        amount: '乾品 5g (後下)',
        reason: '佐藥。辛涼利咽喉、開宣肺氣，舒緩喉嚨乾卡異物感。'
      },
      {
        herbId: 16,
        herbName: '甘草',
        role: '使',
        amount: '切片 5g',
        reason: '使藥。甘草酸抗炎抗病毒，調和黃耆與魚腥草之氣味。'
      }
    ],
    brewingGuide: {
      waterAmount: '1,500 mL 清水',
      flameLevel: '大火煮沸轉中火',
      timeMinutes: 15,
      steps: [
        '將魚腥草、桑葉、黃耆、甘草快速沖水瀝乾，裝入煎煮袋。',
        '注入 1,500 mL 清水，大火煮沸後轉中火滾 12 分鐘（魚腥草揮發成分不宜久煮超過 20 分鐘）。',
        '熄火前 2 分鐘加入薄荷，立即關火加蓋悶 5 分鐘。',
        '濾去藥渣，分裝保溫瓶，溫熱小口慢嚥，讓茶湯潤澤喉頭黏膜。'
      ],
      sweeteningTip: '若喉嚨微痛，可加入少許天然蜂蜜（待茶水降溫至 50°C 以下再加入，避免破壞酵素活性）。'
    },
    usage: '流感流行或出入公共場所頻繁期間，每日溫服 300-500 mL。',
    safetyWarning: '發高燒不退或合併嚴重細菌性肺炎時，請立即就醫治療，本方為日常養生茶飲。',
    flavorProfile: {
      coldHotIndex: -10,
      bitterness: 1,
      sweetness: 3,
      aroma: '清新草本薄荷香與黃耆甘潤微甜'
    },
    featuredShops: ['shop_banqiao_shunan', 'shop_wanhua_dean']
  },
  {
    id: 'formula_phd_metabolic_tea',
    name: '低糖代謝七葉苦瓜元氣飲',
    expertId: 'pharmacist_phd',
    expertName: '黃世勳 教授 / 藥學博士',
    type: 'herbal_tea',
    typeName: '民俗青草茶',
    badge: '代謝機能調控',
    intent: '大餐過後解油膩、經常外食高糖高脂、維持醣類正常代謝、退心火宿熱',
    summary: '黃世勳教授三十載山野踏查精萃，以花蓮野生山苦瓜胜肽協同竹山高山七葉膽，以天然草本活性多酚守護現代人新陳代謝，體現仁心調和之道。',
    composition: [
      {
        herbId: 24,
        herbName: '山苦瓜 (花蓮野生切片)',
        role: '君',
        amount: '低溫烘焙片 8g',
        reason: '君藥。富含苦瓜胜肽 (Charantin) 與多酚，促進代謝、清熱瀉心火。'
      },
      {
        herbId: 49,
        herbName: '七葉膽 (絞股藍)',
        role: '臣',
        amount: '乾葉 6g',
        reason: '臣藥。富含絞股藍皂苷，益氣健脾、調節血脂、降火平肝。'
      },
      {
        herbId: 50,
        herbName: '決明子 (焙炒)',
        role: '佐',
        amount: '炒決明 10g',
        reason: '佐藥。焙火麥香，潤腸通便、降脂清肝，排除體內油脂宿垢。'
      },
      {
        herbId: 16,
        herbName: '甘草',
        role: '使',
        amount: '切片 3g',
        reason: '使藥。和中調味，降低山苦瓜之猛烈苦澀，引出順喉甜味。'
      }
    ],
    brewingGuide: {
      waterAmount: '1,000 mL 滾沸熱水',
      flameLevel: '免開火慢熬，保溫瓶熱沖悶泡',
      timeMinutes: 10,
      steps: [
        '將山苦瓜片、七葉膽、焙決明子、甘草放入耐熱玻璃茶壺或大保溫杯。',
        '注入 95-100°C 沸水 1,000 mL。',
        '加蓋燜泡 8-10 分鐘，茶色呈現深琥珀金黃色即可飲用。',
        '可反覆回沖 2-3 次直至味淡。'
      ],
      sweeteningTip: '為維持調控代謝初衷，本茶飲嚴禁添加任何糖分或果糖。'
    },
    usage: '午餐或晚餐高油飲食後 30 分鐘溫熱飲用 1 大杯 (約 300 mL)。',
    safetyWarning: '正在服用降血糖西藥之糖尿病患者請與醫師討論監測血糖，避免低血糖不適。',
    flavorProfile: {
      coldHotIndex: -25,
      bitterness: 3,
      sweetness: 2,
      aroma: '濃郁烘焙決明麥香與苦甘瓜韻'
    },
    featuredShops: ['shop_hualien_jian', 'shop_taichung_alan']
  },

  // ==========================================
  // 4. 達亥·拿憲 獵人 (花蓮光復阿美族山林採集者兼部落青草長老)
  // ==========================================
  {
    id: 'formula_indigenous_hunter_soup',
    name: '阿美族獵人元氣刺蔥魚湯',
    expertId: 'indigenous_forager',
    expertName: '達亥·拿憲 獵人',
    type: 'tonic_soup',
    typeName: '藥膳燉湯',
    badge: '原民山林元氣',
    intent: '登山長征補充體力耐力、深山涉溪驅散山嵐濕寒、促進食慾、振奮脾胃元氣',
    summary: '阿美族與泰雅族獵人縱橫中央山脈的活力密碼！以野生刺蔥嫩葉滾魚湯，野香撲鼻，暖胃驅寒。',
    composition: [
      {
        herbId: 28,
        herbName: '刺蔥 (Tana/食茱萸嫩葉)',
        role: '君',
        amount: '鮮嫩葉 30g (或乾葉 10g)',
        reason: '君藥。原民三名蔥之首，檸檬柑橘強烈芳香，溫中散寒、祛風行氣、去腥提鮮。'
      },
      {
        herbId: 56,
        herbName: '刺五加 (白簕)',
        role: '臣',
        amount: '乾莖片 15g',
        reason: '臣藥。山林元氣引擎，益氣健脾、祛風除濕、強健腰膝筋骨。'
      },
      {
        herbId: 29,
        herbName: '台灣藜 (紅藜全穀)',
        role: '佐',
        amount: '帶殼紅藜 20g',
        reason: '佐藥。富含植物蛋白質與抗氧化多酚，滋養補虛，增添湯頭寶石酒紅色澤。'
      },
      {
        herbId: 30,
        herbName: '假酸漿 (Lavilu)',
        role: '使',
        amount: '鮮葉 3 片 (切絲)',
        reason: '使藥。健胃整腸、消食化滯，使厚重魚肉湯好消化不脹氣。'
      }
    ],
    brewingGuide: {
      waterAmount: '2,000 mL 山泉水',
      flameLevel: '大火煮沸後中火慢滾',
      timeMinutes: 25,
      steps: [
        '先將刺五加片投入 2,000 mL 鍋中，中火煮沸熬 15 分鐘煮出草木元氣高湯。',
        '放入新鮮吳郭魚、鱸魚或溪魚塊（亦可使用排骨），加拍扁老薑塊數片。',
        '待魚肉煮熟七分熟時，撒入洗淨之台灣藜與假酸漿葉絲。',
        '起鍋前 1 分鐘，大把撒入切碎之鮮刺蔥嫩葉，隨即關火！',
        '加少許海鹽調味即可享用，刺蔥的檸檬花椒清香瞬間瀰漫全室。'
      ],
      sweeteningTip: '原民野味僅以少許天然粗海鹽提鮮，不可加味精或糖。'
    },
    usage: '正餐熱騰騰連湯帶魚肉享用，寒冬或雨天進山打獵前食用最為暖身。',
    safetyWarning: '體內正在急性發炎、高燒大熱、目赤腫痛之實熱證候者慎食。',
    flavorProfile: {
      coldHotIndex: 35,
      bitterness: 1,
      sweetness: 3,
      aroma: '鮮明刺蔥柑橘芳香、山林木質芬多精與清甜魚香'
    },
    featuredShops: ['shop_hualien_jian', 'shop_taitung_taimali']
  },
  {
    id: 'formula_indigenous_trauma_paste',
    name: '山林野外急救消炎敷草膏',
    expertId: 'indigenous_forager',
    expertName: '達亥·拿憲 獵人',
    type: 'ointment_paste',
    typeName: '外用敷膏',
    badge: '獵人野外秘術',
    intent: '深山打獵採集時被刺藤割傷紅腫、毒蟲毒蜂螫咬、扭傷挫傷腫痛、皮膚急性熱腫',
    summary: '東台灣山林深處沒有西藥房，部落獵人祖傳之急救青草泥，止痛拔毒消腫神速。',
    composition: [
      {
        herbId: 39,
        herbName: '落地生根 (倒吊蓮)',
        role: '君',
        amount: '肥厚鮮葉 2 片',
        reason: '君藥。山壁岩石上生命力最強神草，清熱解毒、涼血止血、消腫拔毒。'
      },
      {
        herbId: 7,
        herbName: '左手香',
        role: '臣',
        amount: '鮮葉 5 片',
        reason: '臣藥。消炎鎮痛、抑菌除腫，濃烈百里香酚止癢止痛。'
      },
      {
        herbId: 32,
        herbName: '台灣山蘇花 (老葉汁)',
        role: '佐',
        amount: '鮮葉搗汁 10 mL',
        reason: '佐藥。破瘀散結、清涼退熱。'
      },
      {
        herbId: 65,
        herbName: '冇骨消 (嫩莖髓)',
        role: '使',
        amount: '鮮莖碎泥 10g',
        reason: '使藥。跌打接骨解瘀名草，舒筋活絡通經。'
      }
    ],
    brewingGuide: {
      waterAmount: '山溪乾淨清水清洗',
      flameLevel: '純生冷石臼搗泥',
      timeMinutes: 5,
      steps: [
        '採摘新鮮倒吊蓮與左手香葉，以乾淨山泉水徹底洗除泥沙。',
        '置於洗淨之溪石或平滑石面上，以乾淨圓石將葉片搗碎成濕潤泥狀。',
        '將青草泥厚敷於紅腫扭傷部位，以乾淨姑婆芋葉（背面）或紗布輕輕包紮固定。',
        '敷貼 15-20 分鐘後取下，紅腫與灼熱刺痛感大幅消退。'
      ],
      sweeteningTip: '僅供野外外敷，切勿吞服！'
    },
    usage: '野外緊急情況下局部冷敷 1 次，出山後若傷勢嚴重仍應儘速就醫。',
    safetyWarning: '若傷及動脈或大面積撕裂傷，應優先以止血帶壓迫止血並呼叫山難搜救，勿單純依賴草藥。',
    flavorProfile: {
      coldHotIndex: -45,
      bitterness: 1,
      sweetness: 1,
      aroma: '強烈青草泥汁與左手香刺鼻辛涼氣'
    },
    featuredShops: ['shop_hualien_jian', 'shop_taitung_taimali']
  },
  {
    id: 'formula_indigenous_djulis_vitality',
    name: '花東原鄉紅藜健脾精力飲',
    expertId: 'indigenous_forager',
    expertName: '達亥·拿憲 獵人',
    type: 'herbal_tea',
    typeName: '民俗青草茶',
    badge: '原民長壽寶石',
    intent: '食慾不振消化弱、氣虛四肢無力、容易疲勞、長者及病後體質溫和調養',
    summary: '排灣族與阿美族長老長壽的養生密碼！天然紅藜搭配油菊與甘草，滋養脾胃，元氣滿滿。',
    composition: [
      {
        herbId: 29,
        herbName: '台灣藜 (紅藜全穀/全穗)',
        role: '君',
        amount: '乾全穗 20g',
        reason: '君藥。原民穀物紅寶石，健脾益氣、補中強壯、富含高多酚抗氧化。'
      },
      {
        herbId: 26,
        herbName: '台灣油菊',
        role: '臣',
        amount: '赤柯山乾花 5g',
        reason: '臣藥。高山蜜香原生菊，清肝明目、疏散風熱，使茶湯散發天然野蜜芬芳。'
      },
      {
        herbId: 30,
        herbName: '假酸漿 (Lavilu)',
        role: '佐',
        amount: '乾葉 8g',
        reason: '佐藥。整腸健胃消滯，促進腸道蠕動順暢。'
      },
      {
        herbId: 16,
        herbName: '甘草',
        role: '使',
        amount: '切片 4g',
        reason: '使藥。調和紅藜之澀味，引藥入脾經。'
      }
    ],
    brewingGuide: {
      waterAmount: '1,500 mL 清水',
      flameLevel: '中火煮滾後轉小火',
      timeMinutes: 20,
      steps: [
        '紅藜全穗、油菊花、假酸漿葉及甘草裝入茶包袋。',
        '注水 1,500 mL，中火煮沸後轉小火微滾 20 分鐘。',
        '茶湯呈現如紅寶石般透亮色澤，撲鼻天然蜜香。',
        '溫熱飲用，全家老少皆宜。'
      ],
      sweeteningTip: '自然蜜香濃郁，無須額外加糖。'
    },
    usage: '晨起早餐後或下午茶時間溫熱飲用 1 大杯 (約 300 mL)。',
    safetyWarning: '紅藜含較豐富鉀離子，重度腎功能障礙者應遵醫囑酌量。',
    flavorProfile: {
      coldHotIndex: 10,
      bitterness: 1,
      sweetness: 4,
      aroma: '高山野菊蜜香與紅藜穀物溫厚焙香'
    },
    featuredShops: ['shop_taitung_taimali', 'shop_hualien_jian']
  }
,
  // ==========================================
  // 5. 李昭瑩 藥膳食療名師 (《藥膳學》編著者 · 四季養生與臟腑食療名膳)
  // ==========================================
  {
    "id": "formula_ys_renshen_chicken",
    "name": "人參山藥烏骨雞湯",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "四季養生藥膳",
    "badge": "春季升補首選",
    "intent": "春季生發正氣、大補肺脾元氣、滋養肝腎、抗虛勞疲乏",
    "summary": "《藥膳學》春季升補名膳。以紅棗、黨參（或高麗參）、淮山藥搭配烏骨雞文火慢燉，升發體內正氣，預防換季虛損。",
    "sourceBook": "《藥膳學》第61頁",
    "page": 61,
    "composition": [
      {
        "herbName": "烏骨雞",
        "role": "君",
        "amount": "1 隻",
        "reason": "君藥。甘平補虛，滋陰補腎，養血益氣，為補益虛損之佳品。"
      },
      {
        "herbName": "山藥",
        "role": "臣",
        "amount": "淮山藥 200g",
        "reason": "臣藥。補脾養胃，生津益肺，補腎澀精，氣陰雙補。"
      },
      {
        "herbName": "黨參",
        "role": "佐",
        "amount": "15g (或高麗參)",
        "reason": "佐藥。補中益氣，健脾益肺，協助人體春天陽氣生發。"
      },
      {
        "herbName": "紅棗",
        "role": "使",
        "amount": "30 枚",
        "reason": "使藥。補中益氣，養血安神，調和百味與甘潤湯頭。"
      },
      {
        "herbName": "枸杞",
        "role": "使",
        "amount": "1 大匙",
        "reason": "使藥。滋補肝腎，益精明目，潤肺和中。"
      }
    ],
    "preparation": "所有食材洗淨，烏骨雞汆燙去血水，一同放入燉鍋中加水漫過食材，大火煮沸後轉小火隔水燉煮 60 分鐘，起鍋前少許鹽調味即可。",
    "contraindications": "感冒發燒、喉嚨發炎紅腫等實熱外感期暫緩食用。"
  },
  {
    "id": "formula_ys_shanyao_fuling_bao",
    "name": "山藥茯苓健脾包子",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "四季養生藥膳",
    "badge": "夏季健脾名點",
    "intent": "夏季健脾和胃、祛濕利水、養陰生津、消除身重倦怠",
    "summary": "《藥膳學》夏季健脾藥膳點心。山藥茯苓研粉入餡，健脾胃又利濕濁，避免夏季生冷黏膩礙胃。",
    "sourceBook": "《藥膳學》第63頁",
    "page": 63,
    "composition": [
      {
        "herbName": "山藥",
        "role": "君",
        "amount": "100g",
        "reason": "君藥。甘平健脾補肺，益胃生津。"
      },
      {
        "herbName": "茯苓",
        "role": "臣",
        "amount": "100g",
        "reason": "臣藥。利水滲濕，健脾寧心，祛除盛夏暑濕。"
      },
      {
        "herbName": "蓮子",
        "role": "佐",
        "amount": "適量",
        "reason": "佐藥。補脾止瀉，益腎澀精，清心安神。"
      },
      {
        "herbName": "白芍",
        "role": "佐",
        "amount": "炒白芍適量",
        "reason": "佐藥。養血調經，柔肝止痛，斂陰止汗。"
      },
      {
        "herbName": "麵粉",
        "role": "使",
        "amount": "200g (白糖150g)",
        "reason": "使藥。發酵作包子皮與餡料載體，調和五味。"
      }
    ],
    "preparation": "山藥、茯苓研細粉加水調成糊狀，蒸半小時後拌入白糖、炒白芍與蓮子成餡，以發酵麵皮包捏成包子蒸熟即可。",
    "contraindications": "血糖控制不佳者應減少白糖用量。"
  },
  {
    "id": "formula_ys_dengxin_kugua",
    "name": "燈心苦瓜消暑飲",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "四季養生藥膳",
    "badge": "三伏清暑利尿",
    "intent": "清心降火、清暑解毒、利尿通淋、解尿道赤澀疼痛",
    "summary": "《藥膳學》盛夏去暑濕利水名茶。苦瓜配伍燈心草，清透心火、引熱下行從小便利出。",
    "sourceBook": "《藥膳學》第64頁",
    "page": 64,
    "composition": [
      {
        "herbName": "苦瓜",
        "role": "君",
        "amount": "鮮品 1 條",
        "reason": "君藥。苦寒清暑滌熱、明目解毒。"
      },
      {
        "herbName": "燈心草",
        "role": "臣",
        "amount": "3-5 紮",
        "reason": "臣藥。清心降火，利尿通淋，專導心火下行。"
      },
      {
        "herbName": "茶葉",
        "role": "使",
        "amount": "少許",
        "reason": "使藥。生津止渴，醒脾消滯。"
      }
    ],
    "preparation": "鮮苦瓜去瓤切片，與燈心草洗淨入砂鍋，加水煮沸後轉微火煮 15-20 分鐘，濾渣取清汁當茶頻飲。",
    "contraindications": "脾胃虛寒容易腹瀉、便溏者慎用。"
  },
  {
    "id": "formula_ys_lianzi_zhou",
    "name": "清心蓮子養神粥",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "四季養生藥膳",
    "badge": "清暑安神名粥",
    "intent": "消暑煩熱、清心火、養心安神、健脾和胃",
    "summary": "《藥膳學》夏季養心藥粥。蓮子配粳米慢熬，除煩熱止虛汗，安心神助眠。",
    "sourceBook": "《藥膳學》第65頁",
    "page": 65,
    "composition": [
      {
        "herbName": "蓮子",
        "role": "君",
        "amount": "50g",
        "reason": "君藥。清心安神，健脾止瀉，益腎固精。"
      },
      {
        "herbName": "粳米",
        "role": "臣",
        "amount": "100g (或糙米)",
        "reason": "臣藥。補脾益胃，滋養陰液，和胃生津。"
      },
      {
        "herbName": "冰糖",
        "role": "使",
        "amount": "適量",
        "reason": "使藥。潤肺生津，調和滋味。"
      }
    ],
    "preparation": "蓮子去心洗淨浸泡 30 分鐘，與淘淨粳米同入鍋，加水大火煮滾轉小火慢熬成稠粥，起鍋前加入適量冰糖溶勻。",
    "contraindications": "大便燥結、腹脹滿者不宜過量。"
  },
  {
    "id": "formula_ys_qixue_dabu",
    "name": "冬季氣血大補湯",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "四季養生藥膳",
    "badge": "冬令十全進補",
    "intent": "大補氣血、溫補脾腎、防禦嚴寒、改善手足冰冷畏寒",
    "summary": "《藥膳學》冬令進補代表方。融匯熟地、當歸、黃耆、肉桂、黨參等，佐以豬排骨、雞肉，氣血雙補，暖中驅寒。",
    "sourceBook": "《藥膳學》第71頁",
    "page": 71,
    "composition": [
      {
        "herbName": "黃耆",
        "role": "君",
        "amount": "15g",
        "reason": "君藥。大補元氣，益衛固表，利水消腫。"
      },
      {
        "herbName": "當歸",
        "role": "君",
        "amount": "10g",
        "reason": "君藥。補血活血，調經止痛，溫暖經脈。"
      },
      {
        "herbName": "熟地",
        "role": "臣",
        "amount": "15g",
        "reason": "臣藥。滋陰補血，益精填髓。"
      },
      {
        "herbName": "白朮",
        "role": "臣",
        "amount": "10g",
        "reason": "臣藥。健脾益氣，燥濕利水。"
      },
      {
        "herbName": "肉桂",
        "role": "佐",
        "amount": "5g",
        "reason": "佐藥。補火助陽，引火歸原，散寒止痛。"
      },
      {
        "herbName": "生薑",
        "role": "使",
        "amount": "3 片 (紅棗5枚)",
        "reason": "使藥。調和脾胃，溫通營衛。"
      }
    ],
    "preparation": "藥材裝入紗布包，排骨或雞肉洗淨汆燙，加入蔥薑料酒與高湯，大火煮開後轉小火慢燉 1.5 小時，熟爛後下少許鹽即成。",
    "contraindications": "高血壓未控制、急性化膿性感染或熱性發炎期忌食。"
  },
  {
    "id": "formula_ys_danggui_yangrou",
    "name": "當歸生薑羊肉湯",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "四季養生藥膳",
    "badge": "張仲景傳世金方",
    "intent": "溫中補虛、補氣養血、驅寒止痛、改善產後虛羸或虛寒腹痛",
    "summary": "《金匱要略》漢代醫聖名方，收錄於《藥膳學》第73頁。當歸生薑羊肉完美配伍，溫暖臟腑筋脈，血虛寒凝之聖方。",
    "sourceBook": "《藥膳學》第73頁",
    "page": 73,
    "composition": [
      {
        "herbName": "羊肉",
        "role": "君",
        "amount": "500g",
        "reason": "君藥。甘熱補虛，溫中暖下，開胃健力。"
      },
      {
        "herbName": "當歸",
        "role": "臣",
        "amount": "15-20g",
        "reason": "臣藥。補血活血，調經止痛，溫通血脈。"
      },
      {
        "herbName": "生薑",
        "role": "佐",
        "amount": "30-50g",
        "reason": "佐藥。溫中止嘔，散寒發汗，解羊肉羶氣。"
      },
      {
        "herbName": "黃耆",
        "role": "佐",
        "amount": "15g (或黨參)",
        "reason": "佐藥。加強補氣托毒，扶正固表。"
      },
      {
        "herbName": "米酒",
        "role": "使",
        "amount": "2 大匙 (鹽少許)",
        "reason": "使藥。通經宣導，去腥增香。"
      }
    ],
    "preparation": "羊肉切塊沸水汆燙去血沫。砂鍋中加入清水、當歸、生薑、羊肉、黃耆與米酒，大火煮滾後轉小火慢煨至肉爛湯濃，加鹽調味即可。",
    "contraindications": "體質實熱、口乾舌燥、咽喉腫痛或便秘者不宜食用。"
  },
  {
    "id": "formula_ys_duzhong_yaozi",
    "name": "杜仲炒腰花",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "臟腑部位藥膳",
    "badge": "以形補形名菜",
    "intent": "補益肝腎、強健筋骨、降血壓、緩解腎虛腰痛足膝無力",
    "summary": "《藥膳學》臟腑部位食療經典。杜仲濃汁與豬腰爆炒，以形補形，補肝腎而強腰膝。",
    "sourceBook": "《藥膳學》第55頁 / 第74頁",
    "page": 74,
    "composition": [
      {
        "herbName": "豬腰",
        "role": "君",
        "amount": "1 副 (約250g)",
        "reason": "君藥。味鹹平，理腎氣，通膀胱，以臟補臟。"
      },
      {
        "herbName": "杜仲",
        "role": "臣",
        "amount": "15g",
        "reason": "臣藥。補肝腎，強筋骨，安胎，降血壓。"
      },
      {
        "herbName": "生薑",
        "role": "佐",
        "amount": "片與蔥段適量",
        "reason": "佐藥。散寒去腥，激發腰花爽脆滋味。"
      },
      {
        "herbName": "紹興酒",
        "role": "使",
        "amount": "1 大匙 (白糖少許)",
        "reason": "使藥。調和醬汁，活血通絡。"
      }
    ],
    "preparation": "豬腰切開剔去白色筋膜，切麥穗花刀，滾水燙過濾乾。杜仲先煎濃汁。鍋下油熱後下蔥薑爆香，投入腰花快炒，淋入杜仲汁與調味料炒勻起鍋。",
    "contraindications": "高膽固醇、血脂過高者應控制食用頻率。"
  },
  {
    "id": "formula_ys_tianma_nao",
    "name": "天麻隔水燉豬腦",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "臟腑部位藥膳",
    "badge": "古法隔水燉",
    "intent": "平肝熄風、行氣活血、益智健腦、緩解眩暈偏頭痛",
    "summary": "《藥膳學》第24頁與第54頁收錄之經典燉品。天麻搭配新鮮豬腦隔水蒸燉，藥氣深融，為古傳治偏正頭風神效良方。",
    "sourceBook": "《藥膳學》第54頁",
    "page": 54,
    "composition": [
      {
        "herbName": "天麻",
        "role": "君",
        "amount": "10-15g (約3-5錢)",
        "reason": "君藥。息風止痙，平抑肝陽，通絡止痛，治頭風第一神品。"
      },
      {
        "herbName": "豬腦",
        "role": "臣",
        "amount": "1 副",
        "reason": "臣藥。甘寒入腦，補骨髓，益虛勞，滋腎健腦。"
      },
      {
        "herbName": "川芎",
        "role": "佐",
        "amount": "5g",
        "reason": "佐藥。活血行氣，祛風止痛，上行頭目引藥上達。"
      },
      {
        "herbName": "枸杞",
        "role": "使",
        "amount": "10g (生薑2片)",
        "reason": "使藥。滋補肝腎，明目除腥。"
      }
    ],
    "preparation": "天麻洗淨切薄片，豬腦撕去外層紅血絲薄膜洗淨。瓷盅內放入天麻、川芎、豬腦、生薑片，注入清湯加蓋密封，隔水蒸燉 45 分鐘，起鍋加微鹽即食。",
    "contraindications": "腦中風急性期或體內重度濕熱痰火熾盛者慎服。"
  },
  {
    "id": "formula_ys_baihe_yiren",
    "name": "百合薏仁美白潤膚湯",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "美容養顏藥膳",
    "badge": "淡斑美白首選",
    "intent": "淡化黑色素斑點、清熱利濕排膿、潤肺養陰、使肌膚細緻白皙",
    "summary": "《藥膳學》第84頁美容專方。薏苡仁健脾去濕軟化角質，百合養陰清熱潤肺皮毛，紅棗補血和中，內外雙調。",
    "sourceBook": "《藥膳學》第84頁",
    "page": 84,
    "composition": [
      {
        "herbName": "薏苡仁",
        "role": "君",
        "amount": "30g",
        "reason": "君藥。健脾滲濕，除痹止瀉，清熱排膿，美白淡斑軟化角質。"
      },
      {
        "herbName": "百合",
        "role": "臣",
        "amount": "6-10g",
        "reason": "臣藥。養陰潤肺，清心安神，改善皮膚乾燥與肺陰虛燥。"
      },
      {
        "herbName": "紅棗",
        "role": "使",
        "amount": "3 枚",
        "reason": "使藥。健脾養血，中和薏仁微寒，調和營衛。"
      }
    ],
    "preparation": "薏苡仁溫水浸泡 1 小時，百合洗淨。鍋中加入 800c.c. 水，大火煮滾後轉小火煮 40 分鐘至薏仁軟爛，溫服食用。",
    "contraindications": "孕婦慎用薏苡仁（具滑利之性）。"
  },
  {
    "id": "formula_ys_jiangzhi_shoushen",
    "name": "山楂烏梅決明降脂茶",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "輕盈瘦身藥膳",
    "badge": "消脂消水腫",
    "intent": "消食化積、活血散瘀、潤腸通便、促進水分代謝排油解膩",
    "summary": "《藥膳學》第93頁瘦身減肥茶飲。山楂化肉積消血脂，烏梅生津收斂，決明子潤腸通便，清脂不傷正氣。",
    "sourceBook": "《藥膳學》第93頁",
    "page": 93,
    "composition": [
      {
        "herbName": "山楂",
        "role": "君",
        "amount": "30g",
        "reason": "君藥。消食健胃，行氣散瘀，化濁降脂，專消肉食油膩。"
      },
      {
        "herbName": "決明子",
        "role": "臣",
        "amount": "15g",
        "reason": "臣藥。清熱明目，潤腸通便，降低血液膽固醇。"
      },
      {
        "herbName": "烏梅",
        "role": "佐",
        "amount": "15g",
        "reason": "佐藥。斂肺止渴，生津除煩，防空腹反酸。"
      },
      {
        "herbName": "冰糖",
        "role": "使",
        "amount": "少許 (或不加)",
        "reason": "使藥。中和酸味，回甘利口。"
      }
    ],
    "preparation": "材料洗淨置壺中，加水 1000c.c. 煮沸後轉小火煎煮 20 分鐘，飯後飲用去油解膩效果最佳。",
    "contraindications": "胃潰瘍、胃酸過多者宜飯後少量飲用，孕婦不宜。"
  },
  {
    "id": "formula_ys_taohong_siwu",
    "name": "桃紅四物調理湯",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "婦女保健藥膳",
    "badge": "活血調經聖藥",
    "intent": "補養陰血、活血祛瘀、行氣止痛、緩解經期腹痛血塊",
    "summary": "《醫宗金鑑》傳世名方，收錄於《藥膳學》第97頁。四物湯加桃仁紅花，專治女性氣滯血瘀、經行不暢痛經。",
    "sourceBook": "《藥膳學》第97頁",
    "page": 97,
    "composition": [
      {
        "herbName": "熟地",
        "role": "君",
        "amount": "15g",
        "reason": "君藥。滋陰補血，益精填髓。"
      },
      {
        "herbName": "當歸",
        "role": "君",
        "amount": "10g",
        "reason": "君藥。補血活血，調經止痛。"
      },
      {
        "herbName": "白芍",
        "role": "臣",
        "amount": "10g",
        "reason": "臣藥。養血調經，柔肝止痛。"
      },
      {
        "herbName": "川芎",
        "role": "臣",
        "amount": "6g",
        "reason": "臣藥。活血行氣，祛風止痛。"
      },
      {
        "herbName": "桃仁",
        "role": "佐",
        "amount": "8g",
        "reason": "佐藥。活血祛瘀，潤腸通便。"
      },
      {
        "herbName": "紅花",
        "role": "佐",
        "amount": "5g",
        "reason": "佐藥。活血通經，散瘀止痛。"
      }
    ],
    "preparation": "藥材洗淨裝入過濾紗袋，可搭配排骨或土雞肉，加水 1200c.c. 大火煮開轉小火燉 45 分鐘，經前或經後服用。",
    "contraindications": "月經量過多者、孕婦及出血性疾病者忌服。"
  },
  {
    "id": "formula_ys_yuanqi_kaoshi",
    "name": "元氣補腦醒神雞湯",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "益智健腦藥膳",
    "badge": "考生上班族首選",
    "intent": "增強大腦記憶力、提神醒腦、寧心安神、緩解用腦過度頭昏眼花",
    "summary": "《藥膳學》第122頁考生健腦名湯。天麻、西洋參、玉竹搭配枸杞與雞腿，滋補氣陰，提升專注力且清涼不上火。",
    "sourceBook": "《藥膳學》第122頁",
    "page": 122,
    "composition": [
      {
        "herbName": "雞腿",
        "role": "君",
        "amount": "1 隻",
        "reason": "君藥。溫中益氣，補精填髓，提供優質胺基酸。"
      },
      {
        "herbName": "西洋參",
        "role": "臣",
        "amount": "8g",
        "reason": "臣藥。補氣養陰，清熱生津，提振精神且不易上火。"
      },
      {
        "herbName": "天麻",
        "role": "臣",
        "amount": "8g",
        "reason": "臣藥。平抑肝陽，通絡止痛，保護腦神經消除腦霧。"
      },
      {
        "herbName": "玉竹",
        "role": "佐",
        "amount": "8g",
        "reason": "佐藥。養陰潤燥，生津止渴，生潤脾胃。"
      },
      {
        "herbName": "枸杞",
        "role": "使",
        "amount": "10g (紅棗6枚)",
        "reason": "使藥。補益肝腎，明目清神，調和全湯鮮美甘甜。"
      }
    ],
    "preparation": "將所有藥材洗淨，雞腿切塊汆燙。全部食材放入電鍋內鍋，加入 5 碗水，外鍋加 1 杯水蒸燉至開關跳起，加少許鹽調味即可。",
    "contraindications": "感冒發燒咽痛期間暫緩飲用。"
  },
  {
    "id": "formula_ys_guizhi_shouwu",
    "name": "何首烏黑髮延壽粥",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "銀髮延壽藥膳",
    "badge": "滋補肝腎白髮轉黑",
    "intent": "補益肝腎、養血益精、烏鬚黑髮、強壯筋骨、預防動脈硬化",
    "summary": "《藥膳學》第130頁老年保健名方。何首烏先煎取汁，再與糙米紅棗慢熬成粥，補腎固精、抗細胞脂質過氧化。",
    "sourceBook": "《藥膳學》第130頁",
    "page": 130,
    "composition": [
      {
        "herbName": "何首烏",
        "role": "君",
        "amount": "30g (製首烏)",
        "reason": "君藥。補肝腎，益精血，烏鬚髮，強筋骨，延緩衰老。"
      },
      {
        "herbName": "糙米",
        "role": "臣",
        "amount": "100g",
        "reason": "臣藥。健脾養胃，富含維生素B群與膳食纖維。"
      },
      {
        "herbName": "黑芝麻",
        "role": "佐",
        "amount": "20g",
        "reason": "佐藥。補肝腎，潤五臟，滑腸潤燥預防便秘。"
      },
      {
        "herbName": "紅棗",
        "role": "使",
        "amount": "5 枚",
        "reason": "使藥。養血安神，中和藥性，甘溫助脾。"
      }
    ],
    "preparation": "製首烏加適量水煎煮 30 分鐘後濾去渣取清汁，將藥汁、糙米、紅棗同入砂鍋中，加水熬煮成軟爛稀粥，早晚空腹溫服。",
    "contraindications": "大便稀溏腹瀉者不宜過量食用。"
  },
  {
    "id": "formula_ys_fuling_meatball",
    "name": "茯苓健脾和胃肉丸",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "銀髮延壽藥膳",
    "badge": "長者健脾軟食",
    "intent": "滲濕利水、益脾和胃、寧心安神、改善長者消化不良或水腫",
    "summary": "《藥膳學》第132頁銀髮藥膳佳餚。茯苓研細粉入肉餡做成肉丸，質地軟嫩好入口，健運脾胃水濕。",
    "sourceBook": "《藥膳學》第132頁",
    "page": 132,
    "composition": [
      {
        "herbName": "茯苓",
        "role": "君",
        "amount": "20g (研細粉)",
        "reason": "君藥。滲濕利水，健脾寧心，增強銀髮族消化運化機能。"
      },
      {
        "herbName": "豬絞肉",
        "role": "臣",
        "amount": "300g (五花肉或梅花肉)",
        "reason": "臣藥。滋陰潤燥，益氣補中，提供蛋白質。"
      },
      {
        "herbName": "生薑",
        "role": "佐",
        "amount": "5g (蔥段10g)",
        "reason": "佐藥。溫中散寒，理氣化痰，去腥解膩。"
      },
      {
        "herbName": "紅蘿蔔",
        "role": "佐",
        "amount": "50g",
        "reason": "佐藥。健脾消食，潤腸通便，富含胡蘿蔔素。"
      },
      {
        "herbName": "太白粉",
        "role": "使",
        "amount": "適量 (鹽、米酒少許)",
        "reason": "使藥。聚攏肉丸滑嫩質地，調和諸味。"
      }
    ],
    "preparation": "茯苓碾成極細粉。豬絞肉加入茯苓粉、生薑末、鹽、米酒、太白粉攪打起膠，揉成肉丸蒸熟或少油微煎，再入紅蘿蔔高湯燜燒入味即可。",
    "contraindications": "高血壓高血脂患者宜選用瘦肉絞肉，少油少鹽。"
  }
,
  // --- 《藥膳學》四季、美容、婦幼與銀髮增補經典名方 ---
  {
    "id": "formula_ys_qixian_jiucai",
    "name": "青蝦炒韭菜",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "四季養生藥膳",
    "badge": "補虛助陽名餚",
    "intent": "補虛助陽、溫中行氣、散瘀解毒、溫腎暖下改善宮冷與畏寒",
    "summary": "《藥膳學》第74頁冬春溫補名餚。鮮蝦甘溫補腎益氣，韭菜溫中行氣，兩者相配快炒，溫腎散寒效果極佳。",
    "sourceBook": "《藥膳學》第74頁",
    "page": 74,
    "composition": [
      {
        "herbName": "青蝦",
        "role": "君",
        "amount": "8 兩 (約300g)",
        "reason": "君藥。甘溫補腎壯陽，通乳抗衰老。"
      },
      {
        "herbName": "韭菜",
        "role": "臣",
        "amount": "3 兩 (約120g)",
        "reason": "臣藥。溫中行氣，散血解毒，助陽散寒。"
      },
      {
        "herbName": "生薑",
        "role": "佐",
        "amount": "薑絲適量",
        "reason": "佐藥。溫散寒氣，辟腥提味。"
      },
      {
        "herbName": "黃酒",
        "role": "使",
        "amount": "1 大匙 (醬油醋適量)",
        "reason": "使藥。活血行氣，引熱下行。"
      }
    ],
    "preparation": "青蝦洗淨備用，韭菜洗淨切段。油鍋燒熱先下生薑絲爆香，投入青蝦煽炒，加黃酒、醬油提味，再下韭菜大火快炒均勻即可出鍋。",
    "contraindications": "陰虛火旺或瘡瘍腫毒發炎期不宜食用。"
  },
  {
    "id": "formula_ys_shanyao_tangyuan",
    "name": "山藥滋陰補腎湯圓",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "四季養生藥膳",
    "badge": "冬令養陰甜點",
    "intent": "補腎滋陰、健脾益胃、固精縮尿、調養腰膝酸軟虛寒",
    "summary": "《藥膳學》第75頁冬令滋陰養腎點心。鮮山藥蒸熟揉泥入餡，搭配糯米粉包裹煮熟，補而不滯。",
    "sourceBook": "《藥膳學》第75頁",
    "page": 75,
    "composition": [
      {
        "herbName": "山藥",
        "role": "君",
        "amount": "4 兩 (約150g)",
        "reason": "君藥。甘平補脾養胃，生津益肺，補腎澀精。"
      },
      {
        "herbName": "糯米粉",
        "role": "臣",
        "amount": "5 兩半 (約200g)",
        "reason": "臣藥。溫中補脾，固表止汗。"
      },
      {
        "herbName": "胡椒粉",
        "role": "佐",
        "amount": "少許",
        "reason": "佐藥。辛溫散寒，醒脾開胃。"
      },
      {
        "herbName": "白糖",
        "role": "使",
        "amount": "適量",
        "reason": "使藥。調和甜潤風味。"
      }
    ],
    "preparation": "山藥洗淨蒸熟去皮搗成細泥，加入白糖與胡椒粉拌勻成餡。糯米粉加水揉糰分劑，包入山藥餡捏成湯圓，水沸下鍋煮至浮起即成。",
    "contraindications": "濕熱內盛、大便秘結或糖尿病患者慎用。"
  },
  {
    "id": "formula_ys_qiaodui_yin",
    "name": "焦棗陳皮橘對飲",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "四季養生藥膳",
    "badge": "理氣消食茶飲",
    "intent": "健脾理氣、和胃消食、燥濕化痰、改善食慾不振與飯後腹脹",
    "summary": "《藥膳學》第78頁理氣和胃經典茶飲。大紅棗炒焦入脾安神，廣東陳皮理氣醒胃，飯前代茶開胃，飯後代茶消滯。",
    "sourceBook": "《藥膳學》第78頁",
    "page": 78,
    "composition": [
      {
        "herbName": "紅棗",
        "role": "君",
        "amount": "大紅棗 10 枚 (置鍋炒焦)",
        "reason": "君藥。健脾益氣，炒焦後能溫中收斂，固腸止瀉。"
      },
      {
        "herbName": "陳皮",
        "role": "臣",
        "amount": "1-2 錢 (廣東陳皮)",
        "reason": "臣藥。理氣健脾，燥濕化痰，消解脘腹脹滿。"
      }
    ],
    "preparation": "大紅棗炒至外皮微焦香，陳皮切細絲，同置保溫杯中，以沸水 500c.c. 沖泡燜蓋 10-15 分鐘，代茶頻飲。",
    "contraindications": "舌苔黃厚、體內實熱熾盛者少飲。"
  },
  {
    "id": "formula_ys_guiqigao",
    "name": "四草降火龜苓退熱膏",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "輕盈瘦身藥膳",
    "badge": "熬夜退火甜品",
    "intent": "養陰益氣、清熱解毒、消除熬夜火氣、改善口苦便秘與面部痘瘡",
    "summary": "《藥膳學》第118頁自製退火藥膳凍。土茯苓、龜板配伍咸豐草、薄荷，清熱滋陰，特別適合青年學生與上班族熬夜虛火。",
    "sourceBook": "《藥膳學》第118頁",
    "page": 118,
    "composition": [
      {
        "herbName": "土茯苓",
        "role": "君",
        "amount": "15g (約4錢)",
        "reason": "君藥。解毒除濕，通利關節，消除體內濕熱火毒。"
      },
      {
        "herbName": "大花咸豐草",
        "role": "臣",
        "amount": "15g",
        "reason": "臣藥。清熱解毒，退三焦伏火，利尿通淋。"
      },
      {
        "herbName": "薄荷",
        "role": "佐",
        "amount": "5g (後下)",
        "reason": "佐藥。辛涼宣透，疏散上焦風熱，生津開音。"
      },
      {
        "herbName": "天然果膠",
        "role": "使",
        "amount": "3 大匙 (冰糖適量)",
        "reason": "使藥。凝固成果凍載體，甘潤入口。"
      }
    ],
    "preparation": "藥材加水 8 碗大火煮沸後小火煎至 4 碗，起鍋前 10 分鐘下薄荷，濾汁加入冰糖與調勻果膠，倒入模具冷卻冷藏結凍享用。",
    "contraindications": "孕婦、腹瀉便溏及脾胃極度虛寒者忌服。"
  },
  {
    "id": "formula_ys_qiju_yin",
    "name": "杞菊清肝明目飲",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "益智健腦藥膳",
    "badge": "視力緊張急救",
    "intent": "清肝明目、滋補肝腎、緩解長時間看書螢幕之眼部乾澀脹痛與畏光",
    "summary": "《藥膳學》第123頁視力緊張症候群專方。枸杞子滋養肝腎陰血，菊花清泄肝經鬱熱，泡茶清芬宜人。",
    "sourceBook": "《藥膳學》第123頁",
    "page": 123,
    "composition": [
      {
        "herbName": "枸杞子",
        "role": "君",
        "amount": "10g",
        "reason": "君藥。滋補肝腎，益精明目，富含胡蘿蔔素。"
      },
      {
        "herbName": "菊花",
        "role": "臣",
        "amount": "6g (白菊或油菊)",
        "reason": "臣藥。散風清熱，平肝明目，清熱解毒。"
      },
      {
        "herbName": "冰糖",
        "role": "使",
        "amount": "少許",
        "reason": "使藥。和胃潤肺生津。"
      }
    ],
    "preparation": "枸杞菊花以溫水略沖洗，置入茶壺中注入熱開水 500c.c.，燜泡 5-10 分鐘即可代茶飲用，可回沖 2-3 次。",
    "contraindications": "風寒感冒初起或腹瀉便溏者暫緩飲用。"
  },
  {
    "id": "formula_ys_ymc_zhou",
    "name": "益母草生地調經粥",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "婦女保健藥膳",
    "badge": "經前緊繃舒緩",
    "intent": "活血調經、利水消腫、清熱涼血、緩解經前煩躁頭痛與下腹脹痛",
    "summary": "《藥膳學》第124頁婦女經前調養名粥。益母草善調血脈，生地黃滋陰涼血，與白米煮粥溫服，平撫情緒與經痛。",
    "sourceBook": "《藥膳學》第124頁",
    "page": 124,
    "composition": [
      {
        "herbName": "益母草",
        "role": "君",
        "amount": "30g",
        "reason": "君藥。婦科要藥，活血調經，利水消腫，清熱解毒。"
      },
      {
        "herbName": "生地黃",
        "role": "臣",
        "amount": "30g",
        "reason": "臣藥。清熱涼血，養陰生津，防止血熱妄行。"
      },
      {
        "herbName": "白米",
        "role": "使",
        "amount": "100g (或糙米)",
        "reason": "使藥。和中健脾，顧護胃氣。"
      }
    ],
    "preparation": "益母草與生地黃洗淨加水煎煮 30 分鐘，濾去藥渣取汁，再加入淘洗乾淨的白米同入砂鍋煮成稀粥食用。",
    "contraindications": "孕婦忌服，月經已來且量多者暫緩。"
  },
  {
    "id": "formula_ys_danggui_chicken",
    "name": "當歸燉土雞",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "銀髮延壽藥膳",
    "badge": "養血益氣補虛",
    "intent": "補血益氣、溫中健脾、和胃止痛、改善病後體虛與手足不溫",
    "summary": "《藥膳學》第131頁銀髮補血強身名膳。當歸塞入雞肚內砂鍋慢火煨燉，肉爛湯濃，氣血雙榮。",
    "sourceBook": "《藥膳學》第131頁",
    "page": 131,
    "composition": [
      {
        "herbName": "土雞",
        "role": "君",
        "amount": "1 隻 (去毛內臟)",
        "reason": "君藥。甘溫補虛，益氣養血，大補五臟虧損。"
      },
      {
        "herbName": "當歸",
        "role": "臣",
        "amount": "30g",
        "reason": "臣藥。補血活血，調經止痛，潤燥滑腸。"
      },
      {
        "herbName": "生薑",
        "role": "佐",
        "amount": "3 片 (米酒少許)",
        "reason": "佐藥。溫中散寒，去雞腥味。"
      },
      {
        "herbName": "食鹽",
        "role": "使",
        "amount": "微量",
        "reason": "使藥。起鍋前調味提鮮。"
      }
    ],
    "preparation": "土雞洗淨汆燙，將當歸片塞入雞腹內，放入砂鍋加清水適量，大火煮沸撇去浮沫，轉微火慢煨 1.5 小時至雞肉熟爛，加少許鹽即成。",
    "contraindications": "感冒發燒、急性發炎期或體質燥熱火旺者慎服。"
  },
  {
    "id": "formula_ys_shuanggan_juice",
    "name": "冰糖雙柑解熱汁",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "銀髮延壽藥膳",
    "badge": "清心生津果療",
    "intent": "生津止渴、清心安神、開胃理氣、緩解口乾舌燥與心胸煩熱",
    "summary": "《藥膳學》第131頁清熱生津果品食療。廣柑與橘柑取鮮果原汁，調入冰糖溫和滋潤，老少咸宜。",
    "sourceBook": "《藥膳學》第131頁",
    "page": 131,
    "composition": [
      {
        "herbName": "廣柑",
        "role": "君",
        "amount": "500g",
        "reason": "君藥。生津止渴，開胃理氣，清潤肺胃。"
      },
      {
        "herbName": "椪柑",
        "role": "臣",
        "amount": "500g",
        "reason": "臣藥。潤肺化痰，理氣止咳，富含維生素C與有機酸。"
      },
      {
        "herbName": "冰糖",
        "role": "使",
        "amount": "50g",
        "reason": "使藥。養陰生津，調和酸甘風味。"
      }
    ],
    "preparation": "廣柑、椪柑去皮去核榨取原汁倒入杯中，加入研碎冰糖充分攪拌均勻融化，即可飲用。",
    "contraindications": "脾胃虛寒容易腹瀉、腹脹便溏者忌過量生食。"
  },
  {
    "id": "formula_ys_yiner_lianzi",
    "name": "冰糖銀耳蓮子羹",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "銀髮延壽藥膳",
    "badge": "滋陰潤燥聖品",
    "intent": "滋陰潤肺、養心安神、降壓通便、改善虛勞乾咳與失眠健忘",
    "summary": "《藥膳學》第131頁宮廷傳承養生名甜羹。銀耳出膠軟糯，蓮子清心安神，電鍋蒸燉質地晶瑩潤澤。",
    "sourceBook": "《藥膳學》第131頁",
    "page": 131,
    "composition": [
      {
        "herbName": "銀耳",
        "role": "君",
        "amount": "30g (泡發洗淨)",
        "reason": "君藥。滋陰潤肺，養胃生津，益氣強心補腦。"
      },
      {
        "herbName": "蓮子",
        "role": "臣",
        "amount": "50g",
        "reason": "臣藥。健脾止瀉，益腎澀精，養心安神。"
      },
      {
        "herbName": "冰糖",
        "role": "使",
        "amount": "30g",
        "reason": "使藥。潤肺生津，引藥入肺胃二經。"
      }
    ],
    "preparation": "蓮子銀耳洗淨泡發，銀耳去蒂剪小朵。把銀耳、蓮子、冰糖置於大碗中加水漫過，放入電鍋外鍋加水 1.5 杯蒸至跳起燜 15 分鐘即可。",
    "contraindications": "風寒咳嗽或糖尿病患者減糖或慎食。"
  },
  {
    "id": "formula_ys_guihua_hetao",
    "name": "桂花核桃潤腸凍",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "銀髮延壽藥膳",
    "badge": "潤腸通便美點",
    "intent": "清熱解毒、生津潤燥、補腎溫肺、潤腸通便緩解老年燥結",
    "summary": "《藥膳學》第132頁銀髮藥膳點心。核桃磨漿搭配鮮牛奶與桂花凝凍，香氣清雅、潤滑腸胃防止便秘。",
    "sourceBook": "《藥膳學》第132頁",
    "page": 132,
    "composition": [
      {
        "herbName": "核桃仁",
        "role": "君",
        "amount": "250g",
        "reason": "君藥。補腎固精，溫肺定喘，潤腸通便，富含亞麻油酸。"
      },
      {
        "herbName": "牛奶",
        "role": "臣",
        "amount": "100g",
        "reason": "臣藥。補虛損，益肺胃，生津潤腸。"
      },
      {
        "herbName": "桂花",
        "role": "佐",
        "amount": "15g",
        "reason": "佐藥。辛溫散寒，化痰散瘀，芳香開胃醒脾。"
      },
      {
        "herbName": "冰糖",
        "role": "使",
        "amount": "適量",
        "reason": "使藥。調和甜度成凍。"
      }
    ],
    "preparation": "核桃仁加水磨成細漿。冷水煮滾加入冰糖化開，將核桃漿、牛奶與桂花入鍋微火攪拌沸騰，倒入容器放涼冷藏成凍，切塊食用。",
    "contraindications": "腹瀉便溏者不宜過量食用。"
  },
  {
    "id": "formula_ys_yinxing_chicken",
    "name": "銀杏白果炒雞丁",
    "expertId": "yaoshan_master",
    "expertName": "李昭瑩 藥膳食療名師",
    "type": "medicinal_diet",
    "typeName": "銀髮延壽藥膳",
    "badge": "斂肺定喘名菜",
    "intent": "斂肺平喘、縮尿止帶、益氣補虛、改善長者咳嗽氣喘與夜尿頻數",
    "summary": "《藥膳學》第133頁銀髮止咳定喘藥膳名菜。白果斂肺氣止咳喘，搭配嫩雞丁滑炒，鮮香爽口好咀嚼。",
    "sourceBook": "《藥膳學》第133頁",
    "page": 133,
    "composition": [
      {
        "herbName": "雞胸肉",
        "role": "君",
        "amount": "300g (切1.2公分丁)",
        "reason": "君藥。溫中益氣，補精填髓，提供高蛋白低脂營養。"
      },
      {
        "herbName": "白果",
        "role": "臣",
        "amount": "200g (銀杏熟品)",
        "reason": "臣藥。斂肺定喘，止帶縮尿，專治老年肺虛咳喘夜尿。"
      },
      {
        "herbName": "蔥段",
        "role": "佐",
        "amount": "15g (生薑少許)",
        "reason": "佐藥。溫通陽氣，辟腥提香。"
      },
      {
        "herbName": "太白粉",
        "role": "使",
        "amount": "適量 (鹽蛋清少許)",
        "reason": "使藥。雞丁上漿滑炒，保持肉質柔嫩多汁。"
      }
    ],
    "preparation": "雞丁加蛋清太白粉上漿。熱鍋下油溫炒雞丁與白果至熟瀝油。鍋留底油爆香蔥段，投入雞丁白果大火快炒，淋太白粉水薄芡炒勻裝盤。",
    "contraindications": "白果微有毒性，必須熟食，切勿生食或一次過量食用。"
  }
];

module.exports = characterFormulas;
