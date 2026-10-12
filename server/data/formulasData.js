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
  // 3. 嚴敏華 博士 (臺灣大學藥用植物學教授兼臨床藥師)
  // ==========================================
  {
    id: 'formula_phd_defense_tea',
    name: '國家中醫藥防疫清潤配方',
    expertId: 'pharmacist_phd',
    expertName: '嚴敏華 博士',
    type: 'herbal_tea',
    typeName: '民俗青草茶',
    badge: '科學驗證配伍',
    intent: '流感換季時節強化上呼吸道黏膜屏障、喉嚨沙啞緊繃、咳嗽乾癢少痰、提升防護力',
    summary: '結合台灣國家中醫藥防疫茶文獻精髓，以魚腥草配伍桑葉、薄荷、黃耆，科學清潤抗病毒。',
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
    expertName: '嚴敏華 博士',
    type: 'herbal_tea',
    typeName: '民俗青草茶',
    badge: '代謝機能調控',
    intent: '大餐過後解油膩、經常外食高糖高脂、維持醣類正常代謝、退心火宿熱',
    summary: '花蓮野生山苦瓜胜肽協同竹山高山七葉膽，以天然草本活性多酚守護現代人新陳代謝。',
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
];

module.exports = characterFormulas;
