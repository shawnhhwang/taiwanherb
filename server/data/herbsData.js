/**
 * server/data/herbsData.js
 * 台灣本草植物與常見本土草藥核心資料庫 (典藏級深度植物學與風土資料)
 * 全面收錄 70 味指標性台灣本土草藥、客家青草、原民山林野草與傳統青草巷經典
 * 所有圖片皆為自製植物學東方水墨向量典藏標本 SVG (100% 原創自製，零版權風險)
 */

const initialHerbs = [
  {
    "id": 1,
    "name": "大花咸豐草",
    "scientificName": "Bidens pilosa var. radiata Sch. Bip.",
    "pinyin": "Dà Huā Xián Fēng Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "恰芒草 (Tshah-mông-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "同治草"
      },
      {
        "dialect": "客語",
        "name": "白花婆婆針"
      }
    ],
    "family": "菊科 (Asteraceae) 鬼針草屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "聚乙炔類 (Polyacetylenes)",
      "黃酮類 (Flavonoids)",
      "咖啡酸 (Caffeic acid)"
    ],
    "harvestSeason": "四季皆可採集，以夏秋花盛期品質最優",
    "terroir": "全島平野荒地、淡水河畔堤防、萬華西昌街青草巷核心貨源",
    "region": "北部 (萬華/淡水河/雙北)",
    "folkApplication": "萬華退火青草茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "大暑",
    "commonNames": [
      "鬼針草",
      "同治草",
      "恰芒草",
      "白花婆婆針"
    ],
    "category": "台灣青草茶經典",
    "nature": "涼",
    "taste": [
      "微苦",
      "甘"
    ],
    "properties": [
      "甘",
      "微苦",
      "涼"
    ],
    "channels": [
      "肺",
      "肝",
      "大腸"
    ],
    "efficacy": "清熱解毒、利尿散瘀、消腫止瀉。為台灣最富代表性的民間青草茶主原料之一。",
    "contraindications": "性涼，脾胃虛寒、容易腹瀉者及孕婦應適量飲用，不宜過量或空腹冰飲。",
    "usage": "鮮品 60-120g 或乾品 15-30g，煎水代茶。常與鳳尾草、薄荷、車前草配伍熬製退火青草茶。",
    "taiwanHeritage": "1970 年代引進台灣以提供蜜蜂冬季蜜源，因極度適應台灣風土迅速遍布全島。老台北萬華西昌街青草巷每家老店門口必備整捆鮮草，熬出的青草茶滋味甘潤清香，是無數台灣人夏日的共同味覺記憶。",
    "thumbnailUrl": "/images/herbs/herb_1.svg",
    "tags": [
      "台灣在地",
      "青草茶靈魂",
      "退火",
      "解熱",
      "消炎"
    ],
    "status": "published"
  },
  {
    "id": 2,
    "name": "魚腥草",
    "scientificName": "Houttuynia cordata Thunb.",
    "pinyin": "Yú Xīng Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "狗貼耳 (Káu-thiap-hī)"
      },
      {
        "dialect": "客語",
        "name": "蕺菜 (Zíb-coi)"
      },
      {
        "dialect": "俗稱",
        "name": "臭菜"
      }
    ],
    "family": "三白草科 (Saururaceae) 蕺菜屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "魚腥草素 (Decanoylacetaldehyde)",
      "槲皮苷 (Quercitrin)",
      "揮發油"
    ],
    "harvestSeason": "夏季莖葉茂盛時採割，洗淨曬乾或鮮用",
    "terroir": "苗栗南庄、南投埔里水圳陰濕山澗、花蓮吉安濕地",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "民間防疫解毒飲",
    "safetyLevel": "虛寒慎用",
    "solarTermRecommendation": "白露",
    "commonNames": [
      "折耳根",
      "蕺菜",
      "狗貼耳",
      "臭菜"
    ],
    "category": "清熱解毒藥",
    "nature": "微寒",
    "taste": [
      "辛"
    ],
    "properties": [
      "辛",
      "微寒"
    ],
    "channels": [
      "肺"
    ],
    "efficacy": "清熱解毒、消癰排膿、利尿通淋。對肺熱咳嗽、上呼吸道感染及泌尿系統感染具有良效。",
    "contraindications": "虛寒證及陰疽患者慎用。因含揮發油，煎煮時間不宜過長（沸後滾 5-10 分鐘即可起鍋）。",
    "usage": "乾品 15-30g，鮮品加倍。可煮水代茶，亦為台灣「國家中醫藥防疫茶」的核心重要成分。",
    "taiwanHeritage": "台灣早期客家聚落常取生鮮嫩葉裹粉油炸或煮雞湯，具有潤肺健脾功效；青草舖將其曬乾後與甘草、桑葉同煮，熬成喉嚨沙啞與霧霾天必備的清甘潤肺飲。",
    "thumbnailUrl": "/images/herbs/herb_2.svg",
    "tags": [
      "清熱解毒",
      "防疫茶",
      "潤肺",
      "抗菌",
      "台灣常見"
    ],
    "status": "published"
  },
  {
    "id": 3,
    "name": "薄荷",
    "scientificName": "Mentha haplocalyx Briq.",
    "pinyin": "Bò He",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "薄荷 (Po̍h-hô)"
      },
      {
        "dialect": "客語",
        "name": "夜息香"
      }
    ],
    "family": "唇形科 (Lamiaceae) 薄荷屬",
    "partsUsed": "莖葉",
    "activeCompounds": [
      "薄荷醇 (Menthol)",
      "薄荷酮 (Menthone)",
      "迷迭香酸 (Rosmarinic acid)"
    ],
    "harvestSeason": "夏秋季莖葉茂密、初開花時分批割取",
    "terroir": "彰化田尾、花蓮吉安、台東知本香草園區",
    "region": "中部 (彰化田尾/南投名間/埔里)",
    "folkApplication": "潤喉開音護喉茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立夏",
    "commonNames": [
      "野薄荷",
      "夜息香",
      "番荷菜",
      "蘇薄荷"
    ],
    "category": "辛涼解表藥",
    "nature": "涼",
    "taste": [
      "辛"
    ],
    "properties": [
      "辛",
      "涼"
    ],
    "channels": [
      "肺",
      "肝"
    ],
    "efficacy": "疏散風熱、清利頭目、利咽喉、透疹、疏肝行氣。主治風熱感冒、頭痛目赤、咽喉腫痛。",
    "contraindications": "陰虛血燥、表虛自汗者慎用；芳香辛散，哺乳婦女過量飲用可能抑制乳汁分泌。",
    "usage": "內服 3-6g，宜後下（起鍋前 3 分鐘投入以保留清芬揮發油）。",
    "taiwanHeritage": "台灣青草茶熬煮的最後一道靈魂工序！在關火熄火前一把撒入沸騰青草汁中，蓋悶片刻，即能在醇厚的苦甘底蘊上點綴出令人通體舒暢的透涼香氣。",
    "thumbnailUrl": "/images/herbs/herb_3.svg",
    "tags": [
      "解表",
      "疏肝",
      "提神",
      "青草茶",
      "香草"
    ],
    "status": "published"
  },
  {
    "id": 4,
    "name": "紫蘇",
    "scientificName": "Perilla frutescens (L.) Britt.",
    "pinyin": "Zǐ Sū",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "紫蘇 (Tsí-so͘)"
      },
      {
        "dialect": "客語",
        "name": "紅紫蘇"
      }
    ],
    "family": "唇形科 (Lamiaceae) 紫蘇屬",
    "partsUsed": "莖葉",
    "activeCompounds": [
      "紫蘇醛 (Perillaldehyde)",
      "迷迭香酸",
      "芹菜素 (Apigenin)"
    ],
    "harvestSeason": "夏季枝葉茂盛、花序剛抽出時採收",
    "terroir": "苗栗公館客家庄、台中東勢、嘉義中埔山谷",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "食療燉雞開脾健胃",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "小滿",
    "commonNames": [
      "赤蘇",
      "紅紫蘇",
      "香蘇",
      "荏子"
    ],
    "category": "辛溫解表藥",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "properties": [
      "辛",
      "溫"
    ],
    "channels": [
      "肺",
      "脾"
    ],
    "efficacy": "發表散寒、行氣寬中、安胎、解魚蟹海鮮毒。用於風寒感冒、咳嗽胸悶、胃脘脹滿。",
    "contraindications": "溫燥辛散，溫熱病、熱咳及氣虛表弱者慎服。",
    "usage": "煎服 5-10g，不宜久煎。烹調海鮮魚蝦時加入鮮葉數片，提鮮又解胃寒。",
    "taiwanHeritage": "苗栗客家庄每年初夏盛大醃製「紫蘇梅」，以鹽、糖與紫蘇紅葉浸潤青梅，開胃生津；民間亦常以紫蘇葉、陳皮與生薑煮茶，為淋雨受寒後的暖胃良方。",
    "thumbnailUrl": "/images/herbs/herb_4.svg",
    "tags": [
      "解表散寒",
      "理氣",
      "解魚蟹毒",
      "客家文化",
      "食藥同源"
    ],
    "status": "published"
  },
  {
    "id": 5,
    "name": "艾草",
    "scientificName": "Artemisia argyi H. Lév. & Vaniot",
    "pinyin": "Ài Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "艾草 (Hiā-tsháu)"
      },
      {
        "dialect": "客語",
        "name": "香艾 (Hiong-ngie)"
      }
    ],
    "family": "菊科 (Asteraceae) 蒿屬",
    "partsUsed": "莖葉",
    "activeCompounds": [
      "桉葉素 (Cineole)",
      "側柏酮 (Thujone)",
      "艾草揮發油",
      "鞣質"
    ],
    "harvestSeason": "農曆五月端午前後採摘，此時香氣最濃烈陽氣最盛",
    "terroir": "彰化花壇、南投名間、全台農村田埂與丘陵邊坡",
    "region": "中部 (彰化田尾/南投名間/埔里)",
    "folkApplication": "客家辟邪抹草沐浴",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "芒種",
    "commonNames": [
      "艾葉",
      "祁艾",
      "香艾",
      "灸草",
      "家艾"
    ],
    "category": "溫經止血與理氣藥",
    "nature": "溫",
    "taste": [
      "辛",
      "苦"
    ],
    "properties": [
      "苦",
      "辛",
      "溫"
    ],
    "channels": [
      "肝",
      "脾",
      "腎"
    ],
    "efficacy": "溫經止血、散寒止痛、外用祛濕止癢、溫通經絡。用於虛寒性腹痛、婦科調經及艾灸保健。",
    "contraindications": "陰虛血熱者慎用。熱性體質不宜過量內服。",
    "usage": "內服 3-9g；外用適量供煎湯熏洗、足浴，或揉成艾絨供溫灸。",
    "taiwanHeritage": "台灣端午節門戶懸掛艾草驅邪避瘟的千百年習俗深植人心。民間巧手將艾草嫩葉煮熟搗爛，揉入糯米糰製成清香撲鼻的「草仔粿（青糰）」，內裹香菇蘿蔔絲，是無可取代的鄉土美食節慶印記。",
    "thumbnailUrl": "/images/herbs/herb_5.svg",
    "tags": [
      "溫經止血",
      "驅寒",
      "艾灸",
      "端午習俗",
      "台灣民俗"
    ],
    "status": "published"
  },
  {
    "id": 6,
    "name": "雷公根",
    "scientificName": "Centella asiatica (L.) Urban",
    "pinyin": "Léi Gōng Gēn",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "蚶殼草 (Ham-khak-tsháu)"
      },
      {
        "dialect": "客語",
        "name": "崩大碗"
      }
    ],
    "family": "繖形科 (Apiaceae) 積雪草屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "積雪草苷 (Asiaticoside)",
      "羥基積雪草酸 (Madecassic acid)",
      "黃酮類"
    ],
    "harvestSeason": "春末至深秋全生長季節皆可採收",
    "terroir": "宜蘭礁溪水田旁、花東縱谷溝渠、平地濕潤草皮",
    "region": "東部 (蘭陽濕地/花蓮吉安/台東縱谷)",
    "folkApplication": "外用搗敷消腫",
    "safetyLevel": "虛寒慎用",
    "solarTermRecommendation": "處暑",
    "commonNames": [
      "積雪草",
      "蚶殼草",
      "崩大碗",
      "含殼草",
      "神仙草"
    ],
    "category": "清熱利濕藥",
    "nature": "寒",
    "taste": [
      "苦",
      "辛"
    ],
    "properties": [
      "苦",
      "辛",
      "寒"
    ],
    "channels": [
      "肝",
      "脾",
      "腎"
    ],
    "efficacy": "清熱利濕、解毒消腫、生肌修復。現代醫學證實其積雪草苷對膠原蛋白增生與傷口修復具卓越助益。",
    "contraindications": "性大寒，體質虛弱、胃寒及容易腹痛便溏者不宜多服。",
    "usage": "鮮草 30-60g 搗汁飲或慢火煎服，乾品 15-30g。外用適量搗爛敷於患處。",
    "taiwanHeritage": "傳說老虎受傷時會在這種草地上打滾舔拭傷口因而痊癒，故又稱老虎草。台灣農村長輩早期跌打損傷必採集鮮草搗敷；近代其萃取物更成為國際頂級護膚保養品（Cica）的風雲主角。",
    "thumbnailUrl": "/images/herbs/herb_6.svg",
    "tags": [
      "清熱解毒",
      "積雪草",
      "護膚修復",
      "台灣野草",
      "利濕"
    ],
    "status": "published"
  },
  {
    "id": 7,
    "name": "左手香",
    "scientificName": "Coleus amboinicus Lour.",
    "pinyin": "Zuǒ Shǒu Xiāng",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "到手香 (Tò-tshiú-phang)"
      },
      {
        "dialect": "台語",
        "name": "著手香"
      }
    ],
    "family": "唇形科 (Lamiaceae) 鞘蕊花屬",
    "partsUsed": "嫩莖葉",
    "activeCompounds": [
      "麝香草酚 (Thymol)",
      "香荊芥酚 (Carvacrol)",
      "丁香油酚"
    ],
    "harvestSeason": "全年生長旺盛，隨採隨用",
    "terroir": "全台家戶頂樓陽台、萬華三水街青草攤、台南古厝庭院",
    "region": "嘉南 (嘉南平原/古都安平/白河)",
    "folkApplication": "外用搗敷消腫",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "小暑",
    "commonNames": [
      "到手香",
      "過手香",
      "著手香",
      "印度薄荷"
    ],
    "category": "台灣青草茶經典",
    "nature": "涼",
    "taste": [
      "辛",
      "微苦"
    ],
    "properties": [
      "辛",
      "涼"
    ],
    "channels": [
      "肺",
      "脾",
      "胃"
    ],
    "efficacy": "行氣化濕、清熱解毒、涼血消腫。外用對蚊蟲叮咬、皮膚紅腫、喉嚨沙啞不適有迅速緩解效果。",
    "contraindications": "胃寒便溏者慎用，鮮品外敷高敏感肌膚者宜先於耳後小面積測試。",
    "usage": "鮮葉洗淨煎水，或搗爛取汁外敷，民間亦有取生葉洗淨沾少許食鹽輕含汁液之傳統法。",
    "taiwanHeritage": "台灣庶民生活最具親和力的萬用神草！幾乎每個人老家的紅陶盆裡都種有一株，手輕輕撫摸葉片便留香數小時（故名到手香）。老一輩咽喉發炎或蚊叮腫包，立刻拔兩片揉碎抹敷，是世代相傳的家庭綠色寶箱。",
    "thumbnailUrl": "/images/herbs/herb_7.svg",
    "tags": [
      "家傳萬用",
      "消腫止癢",
      "芳香化濕",
      "台灣家庭必備"
    ],
    "status": "published"
  },
  {
    "id": 8,
    "name": "金銀花",
    "scientificName": "Lonicera japonica Thunb.",
    "pinyin": "Jīn Yín Huā",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "雙花 (Siang-hue)"
      },
      {
        "dialect": "俗稱",
        "name": "二寶花"
      }
    ],
    "family": "忍冬科 (Caprifoliaceae) 忍冬屬",
    "partsUsed": "花蕾",
    "activeCompounds": [
      "綠原酸 (Chlorogenic acid)",
      "木犀草素 (Luteolin)",
      "忍冬苷"
    ],
    "harvestSeason": "春末初夏花蕾花苞剛膨大時於清晨採摘",
    "terroir": "嘉義竹崎山麓、南投名間丘陵、苗栗三義林緣",
    "region": "中部 (彰化田尾/南投名間/埔里)",
    "folkApplication": "民間防疫解毒飲",
    "safetyLevel": "虛寒慎用",
    "solarTermRecommendation": "立夏",
    "commonNames": [
      "雙花",
      "忍冬花",
      "鷺鷥花",
      "二寶花"
    ],
    "category": "清熱解毒藥",
    "nature": "寒",
    "taste": [
      "甘"
    ],
    "properties": [
      "甘",
      "寒"
    ],
    "channels": [
      "肺",
      "心",
      "胃"
    ],
    "efficacy": "清熱解毒、疏散風熱、涼血止痢。用於癰腫疔瘡、喉痹、風熱感冒、溫病發熱、丹毒。",
    "contraindications": "脾胃虛寒及氣虛瘡瘍膿液稀薄清涼者忌服。",
    "usage": "煎湯 6-15g，疏風解表不宜久沸。常與薄荷、甘草、菊花調配清熱雙花露。",
    "taiwanHeritage": "初開為純白，數日後漸漸轉為金黃，枝頭金白雙色並蒂綻放，風姿綽約。冬季葉落不凋耐冬寒，故號「忍冬」。自古以來即為中醫第一解毒清喉名藥，青草茶中加入少許金銀花，入口清冽甘潤。",
    "thumbnailUrl": "/images/herbs/herb_8.svg",
    "tags": [
      "清熱解毒",
      "防疫抗炎",
      "疏散風熱",
      "喉嚨不適"
    ],
    "status": "published"
  },
  {
    "id": 9,
    "name": "白花蛇舌草",
    "scientificName": "Hedyotis diffusa Willd.",
    "pinyin": "Bái Huā Shé Shé Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "蛇舌草 (Tsuâ-tsi̍h-tsháu)"
      },
      {
        "dialect": "客語",
        "name": "羊須草"
      }
    ],
    "family": "茜草科 (Rubiaceae) 耳草屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "齊墩果酸 (Oleanolic acid)",
      "熊果酸 (Ursolic acid)",
      "去乙醯車葉草苷酸"
    ],
    "harvestSeason": "夏秋花果盛期割取全草，洗淨鮮用或曬乾",
    "terroir": "宜蘭水田濕地、屏東九如溝旁、台南官田菱角水田邊",
    "region": "東部 (蘭陽濕地/花蓮吉安/台東縱谷)",
    "folkApplication": "百草苦茶退癀降火",
    "safetyLevel": "孕婦慎用",
    "solarTermRecommendation": "秋分",
    "commonNames": [
      "蛇舌草",
      "二葉葎",
      "羊須草",
      "白花十字草"
    ],
    "category": "清熱解毒藥",
    "nature": "微寒",
    "taste": [
      "甘",
      "淡"
    ],
    "properties": [
      "甘",
      "淡",
      "微寒"
    ],
    "channels": [
      "胃",
      "大腸",
      "小腸"
    ],
    "efficacy": "清熱解毒、消癰散結、利尿消腫。臨床廣泛用於各類慢性炎症、咽喉腫痛、癰腫瘡毒。",
    "contraindications": "孕婦慎用；脾胃素來虛寒、脘腹冷痛者不宜長期過量連服。",
    "usage": "乾品 15-60g，大劑量可用至 120g。常與半枝蓮、車前草配伍熬煮抗炎排毒茶飲。",
    "taiwanHeritage": "相傳名醫在水田邊見大蛇咬傷農人後自尋此草咀嚼敷咬傷處而獲愈，故名白花蛇舌草。台灣民間草藥行常將其與半枝蓮搭配，譽為「解毒退腫雙雄」，是無數草藥名家的看家方底。",
    "thumbnailUrl": "/images/herbs/herb_9.svg",
    "tags": [
      "清熱解毒",
      "消癰散結",
      "抗炎",
      "台灣濕地草本"
    ],
    "status": "published"
  },
  {
    "id": 10,
    "name": "穿心蓮",
    "scientificName": "Andrographis paniculata (Burm. f.) Nees",
    "pinyin": "Chuān Xīn Lián",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "苦草 (Khóo-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "苦膽草"
      },
      {
        "dialect": "俗稱",
        "name": "一見喜"
      }
    ],
    "family": "爵床科 (Acanthaceae) 穿心蓮屬",
    "partsUsed": "莖葉",
    "activeCompounds": [
      "穿心蓮內酯 (Andrographolide)",
      "新穿心蓮內酯",
      "黃酮類化合物"
    ],
    "harvestSeason": "秋初蕾期或剛開花時採割，此時內酯含量達最高峰",
    "terroir": "屏東九如、高樹日照充足沖積平原、台南關廟",
    "region": "南部 (六堆屏東/高樹/恆春半島)",
    "folkApplication": "百草苦茶退癀降火",
    "safetyLevel": "苦寒遵醫囑",
    "solarTermRecommendation": "夏至",
    "commonNames": [
      "苦草",
      "一見喜",
      "苦膽草",
      "欖核蓮"
    ],
    "category": "清熱燥濕藥",
    "nature": "大寒",
    "taste": [
      "苦"
    ],
    "properties": [
      "極苦",
      "寒"
    ],
    "channels": [
      "心",
      "肺",
      "大腸",
      "膀胱"
    ],
    "efficacy": "清熱解毒、涼血消腫、燥濕止痢。有「中藥抗生素」之美譽，對急性咽炎、扁桃腺發炎具強力抑菌消炎效果。",
    "contraindications": "大苦大寒，多服易傷胃氣，脾胃虛寒、食少便溏及孕婦禁服。",
    "usage": "水煎 6-9g，研粉吞服每次 1-3g。因其味極度苦烈，入舌直穿人心，建議製成膠囊或含水吞服。",
    "taiwanHeritage": "高溫濕熱的南台灣豔陽下生長極茂盛。老一輩牙齦紅腫發炎、火氣直衝腦門時，常含一片穿心蓮鮮葉於患處，雖然苦得皺眉，但消炎降火奇效令人拍案叫絕。",
    "thumbnailUrl": "/images/herbs/herb_10.svg",
    "tags": [
      "苦寒瀉火",
      "抗生素草",
      "咽喉腫痛",
      "降火氣"
    ],
    "status": "published"
  },
  {
    "id": 11,
    "name": "車前草",
    "scientificName": "Plantago asiatica L.",
    "pinyin": "Chē Qián Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "五筋草 (Gōo-kin-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "車輪菜"
      },
      {
        "dialect": "客語",
        "name": "蝦蟆衣"
      }
    ],
    "family": "車前科 (Plantaginaceae) 車前屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "車前苷 (Plantaginin)",
      "桃葉珊瑚苷 (Aucubin)",
      "熊果酸"
    ],
    "harvestSeason": "春夏秋全季節採挖全草，夏末秋初種子成熟時割取穗狀花序",
    "terroir": "大漢溪高灘地、全島田埂路旁、陽明山國家公園步道兩側",
    "region": "北部 (萬華/淡水河/雙北)",
    "folkApplication": "萬華退火青草茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "小暑",
    "commonNames": [
      "牛遺",
      "當道",
      "蝦蟆衣",
      "車輪菜",
      "豬肚菜"
    ],
    "category": "利水滲濕藥",
    "nature": "微寒",
    "taste": [
      "甘"
    ],
    "properties": [
      "甘",
      "微寒"
    ],
    "channels": [
      "肝",
      "腎",
      "肺",
      "小腸"
    ],
    "efficacy": "清熱利尿通淋、祛痰涼血、清肝明目。主治小便不利、暑濕水腫、目赤腫痛、肺熱咳嗽。",
    "contraindications": "腎虛精滑、內無濕熱及孕婦慎用。",
    "usage": "全草煎服 15-30g，鮮品加倍；種子（車前子）包煎 5-10g。常與淡竹葉、白茅根配伍代茶。",
    "taiwanHeritage": "因耐牛車馬蹄踐踏、偏生於車轍道前而得名「車前」。生命力極度頑強，台灣早期農業時代牛車軋過之處依然昂然挺拔，農人汗流浹背水分排不出時，拔一把煮大鍋水，通體舒暢排濕消腫。",
    "thumbnailUrl": "/images/herbs/herb_11.svg",
    "tags": [
      "利尿通淋",
      "排濕退腫",
      "明目",
      "路旁名草"
    ],
    "status": "published"
  },
  {
    "id": 12,
    "name": "鳳尾草",
    "scientificName": "Pteris multifida Poir.",
    "pinyin": "Fèng Wěi Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "井口邊草 (Tsénn-kháu-pinn-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "雞腳草"
      },
      {
        "dialect": "客語",
        "name": "金雞尾"
      }
    ],
    "family": "鳳尾蕨科 (Pteridaceae) 鳳尾蕨屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "鳳尾草素 (Pterosin)",
      "木犀草素",
      "蕨苷類"
    ],
    "harvestSeason": "夏秋季孢子囊成熟前採割全草",
    "terroir": "萬華龍山寺磚石古井縫、三峽老街陰濕石壁、坪林茶園邊石坎",
    "region": "北部 (萬華/淡水河/雙北)",
    "folkApplication": "萬華退火青草茶",
    "safetyLevel": "虛寒慎用",
    "solarTermRecommendation": "大暑",
    "commonNames": [
      "井口邊草",
      "井欄茜",
      "雞腳草",
      "金雞尾"
    ],
    "category": "台灣青草茶經典",
    "nature": "涼",
    "taste": [
      "微苦",
      "澀"
    ],
    "properties": [
      "淡",
      "微苦",
      "涼"
    ],
    "channels": [
      "肝",
      "腎",
      "大腸"
    ],
    "efficacy": "清熱涼血、利濕解毒、消腫止痢。特別擅長清利大腸濕熱火氣，為急性菌痢、夏日腸胃熱毒之良藥。",
    "contraindications": "虛寒體質、慢性胃潰瘍及孕婦慎用。",
    "usage": "乾品 15-30g，鮮品 30-60g，水煎服。台灣青草茶核心底料之一。",
    "taiwanHeritage": "喜生於台灣傳統老水井井欄背陰處，因葉形如舒展的鳳凰翎羽而名鳳尾草。老萬華青草店老師傅指出，青草茶若少了鳳尾草，便少了沉穩化解體內深層濕熱濁火的力道，是青草甘苦層次的靈魂基底。",
    "thumbnailUrl": "/images/herbs/herb_12.svg",
    "tags": [
      "清熱涼血",
      "止痢",
      "老台北青草",
      "退火解燥"
    ],
    "status": "published"
  },
  {
    "id": 13,
    "name": "黃耆",
    "scientificName": "Astragalus membranaceus (Fisch.) Bunge",
    "pinyin": "Huáng Qí",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "北芪 (Pak-kî)"
      },
      {
        "dialect": "客語",
        "name": "黃芪"
      }
    ],
    "family": "豆科 (Fabaceae) 黃耆屬",
    "partsUsed": "根及根莖",
    "activeCompounds": [
      "黃耆多糖 (APS)",
      "黃耆甲苷 (Astragaloside IV)",
      "大豆皂苷"
    ],
    "harvestSeason": "秋末落葉後或初春發芽前採挖",
    "terroir": "台灣高冷溫差適宜產區試種、全台迪化街中藥行第一主力",
    "region": "北部 (萬華/淡水河/雙北)",
    "folkApplication": "辦公室防護明目茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "霜降",
    "commonNames": [
      "北芪",
      "綿芪",
      "黃芪",
      "百本"
    ],
    "category": "補虛藥 (補氣)",
    "nature": "微溫",
    "taste": [
      "甘"
    ],
    "properties": [
      "甘",
      "微溫"
    ],
    "channels": [
      "肺",
      "脾"
    ],
    "efficacy": "補氣升陽、固表止汗、利水消腫、排膿生肌。適用於氣虛乏力、中氣下陷、自汗畏風、容易疲倦。",
    "contraindications": "表實邪盛、氣滯濕阻、食積停滯、熱毒初起發炎紅腫者忌服。",
    "usage": "煎服 9-30g，大劑量可用至 60g。生黃耆擅長固表托毒，炙黃耆（蜜炙）長於溫補中氣。",
    "taiwanHeritage": "台灣國民養生第一方「黃耆枸杞紅棗茶（安迪湯）」紅遍全台辦公室與銀髮族家庭。氣虛自汗、說話無力、容易疲勞的現代人，早晚保溫杯泡幾片黃耆，益氣固表，元氣充沛。",
    "thumbnailUrl": "/images/herbs/herb_13.svg",
    "tags": [
      "補氣之長",
      "增強體力",
      "養生藥膳",
      "固表止汗"
    ],
    "status": "published"
  },
  {
    "id": 14,
    "name": "枸杞子",
    "scientificName": "Lycium barbarum L.",
    "pinyin": "Gǒu Qǐ Zǐ",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "枸杞 (Káu-kí)"
      },
      {
        "dialect": "俗稱",
        "name": "紅寶石"
      }
    ],
    "family": "茄科 (Solanaceae) 枸杞屬",
    "partsUsed": "果實",
    "activeCompounds": [
      "枸杞多糖 (LBP)",
      "玉米黃素 (Zeaxanthin)",
      "甜菜鹼 (Betaine)"
    ],
    "harvestSeason": "夏秋兩季果實呈鮮紅色時採摘，晾曬或烘乾",
    "terroir": "台灣苗栗銅鑼杭菊節同源養生配角、全台各大藥膳必備",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "辦公室防護明目茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "秋分",
    "commonNames": [
      "杞子",
      "紅寶石",
      "血枸杞",
      "地骨子"
    ],
    "category": "補虛藥 (補陰)",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "properties": [
      "甘",
      "平"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "滋補肝腎、益精明目、潤肺生津。主治虛勞精虧、腰膝痠軟、目暗昏花、內熱消渴、眩暈耳鳴。",
    "contraindications": "外感發熱發燒、脾虛有積濕、經常腹瀉便溏者不宜過量多服。",
    "usage": "煎服 6-12g，亦可直接嚼服、沖泡茶飲或入菜燉湯（如燒酒雞、藥膳排骨）。",
    "taiwanHeritage": "現代台灣科技工程師與長時間盯螢幕上班族必備的「護眼神果」！與苗栗杭菊沖泡的「杞菊茶」甘甜順口、生津明目，是台灣最具全民共識的溫和滋養良方。",
    "thumbnailUrl": "/images/herbs/herb_14.svg",
    "tags": [
      "護眼明目",
      "滋補肝腎",
      "平補良品",
      "國民養生"
    ],
    "status": "published"
  },
  {
    "id": 15,
    "name": "桑葉",
    "scientificName": "Morus alba L.",
    "pinyin": "Sāng Yè",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "桑葉 (Sng-hio̍h)"
      },
      {
        "dialect": "客語",
        "name": "鐵扇子"
      }
    ],
    "family": "桑科 (Moraceae) 桑屬",
    "partsUsed": "莖葉",
    "activeCompounds": [
      "1-脫氧野尻黴素 (DNJ)",
      "蘆丁 (Rutin)",
      "桑葉多糖"
    ],
    "harvestSeason": "晚秋初冬經霜打過後採摘，此時質厚氣純，功力最專",
    "terroir": "苗栗獅潭客家山莊、公館蠶絲文化園區、南投水里",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "客家桑葉茶清甘明目",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "霜降",
    "commonNames": [
      "霜桑葉",
      "冬桑葉",
      "鐵扇子",
      "神仙葉"
    ],
    "category": "辛涼解表藥",
    "nature": "寒",
    "taste": [
      "苦",
      "甘"
    ],
    "properties": [
      "苦",
      "甘",
      "寒"
    ],
    "channels": [
      "肺",
      "肝"
    ],
    "efficacy": "疏散風熱、清肺潤燥、清肝明目、涼血止血。用於風熱感冒、肺燥乾咳無痰、頭暈頭痛、目赤昏花。",
    "contraindications": "脾胃虛寒容易泄瀉腹瀉者慎服。",
    "usage": "煎服 5-10g。疏風解表清熱多生用，潤燥止咳可用蜜水炙炒（蜜桑葉）。",
    "taiwanHeritage": "苗栗早年為台灣蠶業核心重鎮，造就大片茂盛古桑林。經霜打過的霜桑葉所含 DNJ 成分經現代科學證實有助調節醣類代謝，客家聚落將其製成無咖啡因「桑葉養生茶」，清心解膩、降火明目。",
    "thumbnailUrl": "/images/herbs/herb_15.svg",
    "tags": [
      "清肺潤燥",
      "清肝明目",
      "客家桑葉茶",
      "平穩代謝"
    ],
    "status": "published"
  },
  {
    "id": 16,
    "name": "甘草",
    "scientificName": "Glycyrrhiza uralensis Fisch.",
    "pinyin": "Gān Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "甘草 (Kam-tsháu)"
      },
      {
        "dialect": "俗稱",
        "name": "國老"
      }
    ],
    "family": "豆科 (Fabaceae) 甘草屬",
    "partsUsed": "根及根莖",
    "activeCompounds": [
      "甘草酸 (Glycyrrhizic acid)",
      "甘草苷 (Liquiritin)",
      "異黃酮"
    ],
    "harvestSeason": "春秋季採挖，以秋季採挖者質堅粉性足，切厚片曬乾",
    "terroir": "台灣百年青草老舖調配青草茶不可或缺的和解重鎮",
    "region": "北部 (萬華/淡水河/雙北)",
    "folkApplication": "萬華退火青草茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立春",
    "commonNames": [
      "甜草",
      "密甘",
      "國老",
      "甜根子"
    ],
    "category": "補虛藥 (補氣)",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "properties": [
      "甘",
      "平"
    ],
    "channels": [
      "心",
      "肺",
      "脾",
      "胃"
    ],
    "efficacy": "補脾益氣、清熱解毒、祛痰止咳、緩急止痛、調和諸藥。被譽為中藥方劑「國老」。",
    "contraindications": "不宜與海藻、京大戟、紅大戟、甘遂、芫花同用（中醫十八反禁忌）。濕盛中滿、水腫者慎服。",
    "usage": "煎服 2-10g。生用偏於瀉火解毒，蜜炙用（炙甘草）偏於補脾益氣、潤肺復脈。",
    "taiwanHeritage": "台灣青草茶熬煮必備的「回甘之鑰」！青草藥材多屬寒苦降火之品，老師傅必抓一把甘草同煮，能神奇調和百草霸氣、保護腸胃，使煮出的青草茶初嚐甘爽微苦，入喉數秒後舌根回甘悠長。",
    "thumbnailUrl": "/images/herbs/herb_16.svg",
    "tags": [
      "調和百藥",
      "回甘潤喉",
      "補脾益氣",
      "青草茶甘味"
    ],
    "status": "published"
  },
  {
    "id": 17,
    "name": "抹草",
    "scientificName": "Desmodium paniculatum (L.) DC.",
    "pinyin": "Mǒ Cǎo",
    "dialectNames": [
      {
        "dialect": "客語",
        "name": "抹草 (Mat-coi)"
      },
      {
        "dialect": "台語",
        "name": "小花清風藤"
      },
      {
        "dialect": "民間",
        "name": "辟邪草 / 避邪草"
      }
    ],
    "family": "豆科 (Fabaceae) 山螞蝗屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "三萜皂苷",
      "黃酮類",
      "生物鹼",
      "芳香揮發油"
    ],
    "harvestSeason": "端午或夏秋枝葉繁茂時採收整株曬乾",
    "terroir": "新竹竹東山麓、苗栗三義客庄、銅鑼茶園丘陵步道邊",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "客家辟邪抹草沐浴",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "夏至",
    "commonNames": [
      "假木豆",
      "小花清風藤",
      "辟邪木",
      "防風草",
      "魔草"
    ],
    "category": "客家風土民俗草",
    "nature": "涼",
    "taste": [
      "微苦",
      "辛"
    ],
    "properties": [
      "微苦",
      "辛",
      "涼"
    ],
    "channels": [
      "心",
      "肝",
      "脾"
    ],
    "efficacy": "散風熱、除濕熱、安神定驚、清熱解毒。民間深信其具備強烈驅邪避煞、安定小兒驚嚇之民俗能量。",
    "contraindications": "內服性微涼，虛寒體質者不宜單方大劑量久服；外用洗浴無特殊禁忌。",
    "usage": "外用：抓取乾品抹草 7 片葉或一小把，加水同煮沸後兌入洗澡水，為嬰幼兒或出入醫院喪葬者淨身。內服煎水 10-20g。",
    "taiwanHeritage": "台灣客家聚落最神聖的草木護身符！客家長輩出遠門或去深山前，口袋裡必放幾片新鮮抹草葉護身；嬰孩夜半啼哭不安，阿婆必取抹草、艾草、芙蓉三味煮沸水替孩子擦澡淨心，芬芳草香中蘊含世代相傳的守護之愛。",
    "thumbnailUrl": "/images/herbs/herb_17.svg",
    "tags": [
      "客家民俗",
      "辟邪草",
      "安神淨身",
      "端午洗浴",
      "台灣風土"
    ],
    "status": "published"
  },
  {
    "id": 18,
    "name": "大風草",
    "scientificName": "Blumea balsamifera (L.) DC.",
    "pinyin": "Dà Fēng Cǎo",
    "dialectNames": [
      {
        "dialect": "客語",
        "name": "大風草 (Tai-fūng-coi)"
      },
      {
        "dialect": "台語",
        "name": "艾納香 (Hāi-la̍p-hiunn)"
      },
      {
        "dialect": "俗稱",
        "name": "冰片草"
      }
    ],
    "family": "菊科 (Asteraceae) 艾納香屬",
    "partsUsed": "嫩莖葉",
    "activeCompounds": [
      "左旋龍腦 (l-Borneol / 天然冰片)",
      "香芹酚",
      "黃酮類",
      "倍半萜內酯"
    ],
    "harvestSeason": "秋季枝葉繁盛、花未全開時採割曬乾",
    "terroir": "屏東高樹、美濃客庄田野、恆春半島向陽低海拔丘陵",
    "region": "南部 (六堆屏東/高樹/恆春半島)",
    "folkApplication": "坐月子產後驅風擦澡",
    "safetyLevel": "孕婦慎用",
    "solarTermRecommendation": "立冬",
    "commonNames": [
      "艾納香",
      "冰片草",
      "月子草",
      "大風艾"
    ],
    "category": "客家風土民俗草",
    "nature": "微溫",
    "taste": [
      "辛",
      "苦"
    ],
    "properties": [
      "辛",
      "苦",
      "微溫"
    ],
    "channels": [
      "肺",
      "脾",
      "胃"
    ],
    "efficacy": "祛風消腫、活血散瘀、溫通經絡、散寒止痛。為客家婦女坐月子期間不可動搖的「第一神草」。",
    "contraindications": "孕期婦女忌用（具活血通經作用）；產後惡露未盡但無風寒者可適度外洗，內服需遵醫囑。",
    "usage": "外用：乾品 60-120g 煮大鍋沸水，放至溫熱後供產婦擦澡、洗頭、足浴，可防坐月子受風寒入骨。內服水煎 10-15g。",
    "taiwanHeritage": "六堆客家庄每逢女兒或媳婦懷孕，老母親早在數月前就到山邊採割大風草曬乾捆紮。客家俗諺云：「產後大風草洗身，老來毋驚風痛侵。」熬煮時散發清爽的天然冰片芬芳，撫慰產婦筋骨，是南台灣客家文化的溫暖印記。",
    "thumbnailUrl": "/images/herbs/herb_18.svg",
    "tags": [
      "客家月子草",
      "祛風散寒",
      "天然冰片",
      "產後調養",
      "南台灣風土"
    ],
    "status": "published"
  },
  {
    "id": 19,
    "name": "仙草",
    "scientificName": "Platostoma palustre (Blume) A. J. Paton",
    "pinyin": "Xiān Cǎo",
    "dialectNames": [
      {
        "dialect": "客語",
        "name": "仙草 (Sên-coi)"
      },
      {
        "dialect": "台語",
        "name": "仙草 (Sian-tsháu)"
      },
      {
        "dialect": "古名",
        "name": "涼粉草"
      }
    ],
    "family": "唇形科 (Lamiaceae) 仙草屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "仙草多醣 (Mesona gum)",
      "酚酸類 (Rosmarinic acid)",
      "兒茶素",
      "黃酮類"
    ],
    "harvestSeason": "秋初開花前連根割起，經台灣日照充分曝曬「陳化」越陳越香",
    "terroir": "新竹關西丘陵、苗栗銅鑼、花蓮吉安向陽紅土坡",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "消暑仙草甘茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "小暑",
    "commonNames": [
      "涼粉草",
      "仙人草",
      "仙草舅",
      "田草"
    ],
    "category": "台灣青草茶經典",
    "nature": "涼",
    "taste": [
      "甘",
      "淡"
    ],
    "properties": [
      "甘",
      "淡",
      "涼"
    ],
    "channels": [
      "肺",
      "腎",
      "肝"
    ],
    "efficacy": "清暑解熱、生津止渴、涼血解毒。現代研究顯示仙草多醣具優秀抗氧化及保肝調節機能。",
    "contraindications": "性涼，極度虛寒易腹瀉體質者不宜冰飲過量。",
    "usage": "陳年乾品 30-60g，慢火熬煮 2-3 小時成深琥珀色仙草茶；加入少許地瓜粉或太白粉即成果凍狀仙草凍，冬天加黑糖煮成燒仙草。",
    "taiwanHeritage": "新竹關西享有「仙草之鄉」美譽。古時農人因天熱中暑昏厥，善心神人摘此草煮水予飲後立即甦醒，百姓神化為「神仙所賜之草」。台灣夏日若少了黑晶透亮的仙草冰與溫潤仙草雞湯，夏日的風景便不完整。",
    "thumbnailUrl": "/images/herbs/herb_19.svg",
    "tags": [
      "關西仙草",
      "消暑解渴",
      "燒仙草",
      "客家名產",
      "台灣國民風味"
    ],
    "status": "published"
  },
  {
    "id": 20,
    "name": "白鶴靈芝",
    "scientificName": "Rhinacanthus nasutus (L.) Kurz",
    "pinyin": "Bái Hè Líng Zhī",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "仙鶴草 (Sian-ho̍h-tsháu)"
      },
      {
        "dialect": "俗稱",
        "name": "白鶴草"
      }
    ],
    "family": "爵床科 (Acanthaceae) 白鶴靈芝屬",
    "partsUsed": "莖葉",
    "activeCompounds": [
      "靈芝素 (Rhinacanthin)",
      "萘醌類化合物 (Naphthoquinones)",
      "植物甾醇"
    ],
    "harvestSeason": "四季均可採摘，以夏秋枝葉繁盛、白花盛開時藥力最佳",
    "terroir": "台南白河平野、高雄大樹丘陵、屏東平原透光農園",
    "region": "南部 (六堆屏東/高樹/恆春半島)",
    "folkApplication": "萬華退火青草茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立秋",
    "commonNames": [
      "仙鶴靈芝草",
      "白鶴草",
      "癬草",
      "靈芝草"
    ],
    "category": "台灣青草茶經典",
    "nature": "平",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "淡",
      "平"
    ],
    "channels": [
      "肺",
      "肝",
      "胃"
    ],
    "efficacy": "潤肺降火、平肝清熱、涼血止血、殺蟲止癢。臨床常用於肺熱咳嗽、咽喉炎、慢性肝火旺盛。",
    "contraindications": "藥性平穩，一般體質皆可飲用；嚴重脾虛泄瀉者減量。",
    "usage": "乾品 15-30g，鮮品 30-60g，水煎代茶飲。常作為南台灣老字號青草茶的靈魂甘甜基底。",
    "taiwanHeritage": "小白花宛如一隻隻展翅欲飛的白鶴停歇於綠枝頭，優雅靈動；因其功效可媲美名貴靈芝，故得名「白鶴靈芝」。南台灣豔陽炙熱，在地青草舖將其切段曬乾，熬出的茶湯泛著金黃翡翠光澤，入口清潤微甘，消暑生津絕佳。",
    "thumbnailUrl": "/images/herbs/herb_20.svg",
    "tags": [
      "潤肺降火",
      "白鶴花",
      "平性草本",
      "南部青草底料",
      "甘醇潤喉"
    ],
    "status": "published"
  },
  {
    "id": 21,
    "name": "狗尾草",
    "scientificName": "Uraria crinita (L.) Desv. ex DC.",
    "pinyin": "Gǒu Wěi Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "狗尾仔草 (Káu-bué-á-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "通天草"
      },
      {
        "dialect": "俗稱",
        "name": "台灣人參"
      }
    ],
    "family": "豆科 (Fabaceae) 兔尾草屬",
    "partsUsed": "根及根莖",
    "activeCompounds": [
      "三萜皂苷",
      "黃酮類",
      "多糖體",
      "多種微量元素"
    ],
    "harvestSeason": "秋冬季全株地上部枯黃時挖取粗壯地下根",
    "terroir": "南投名間八卦山台地、彰化田中、嘉義竹崎排水良好紅土坡",
    "region": "中部 (彰化田尾/南投名間/埔里)",
    "folkApplication": "食療燉雞開脾健胃",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立秋",
    "commonNames": [
      "通天草",
      "兔尾草",
      "貓尾草",
      "狐狸尾"
    ],
    "category": "食藥同源補益",
    "nature": "溫",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "平",
      "微溫"
    ],
    "channels": [
      "脾",
      "胃"
    ],
    "efficacy": "開脾健胃、清熱止咳、涼血散瘀、消疳積殺蟲。特別擅長改善小兒食慾不振、脾虛發育不良。",
    "contraindications": "性情溫和，體質燥熱大便秘結者可配搭少量甘草或枸杞調和。",
    "usage": "根部洗淨切段 30-60g，與放山土雞或排骨、老薑、枸杞一同慢火燉煮 1-2 小時，湯頭甘醇甜美，無需過多調味。",
    "taiwanHeritage": "紫粉色花序如搖曳的毛茸茸狗尾巴，被南投名間鄉親讚譽為「台灣民間人參」。台灣早年農村物質匱乏，小孩若發育瘦弱、食慾差，母親必定燉一鍋「狗尾草燉土雞」給孩子補身開脾，飄香數十年的餐桌溫暖記憶。",
    "thumbnailUrl": "/images/herbs/herb_21.svg",
    "tags": [
      "台灣人參",
      "南投名間特產",
      "開脾健胃",
      "小兒轉骨燉雞",
      "國民藥膳"
    ],
    "status": "published"
  },
  {
    "id": 22,
    "name": "食茱萸",
    "scientificName": "Zanthoxylum ailanthoides Siebold & Zucc.",
    "pinyin": "Shí Zhū Yú",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "刺蔥 (Tshì-tshang)"
      },
      {
        "dialect": "原住民語 (泰雅/阿美)",
        "name": "Tana / Dana"
      },
      {
        "dialect": "客語",
        "name": "鳥不踏"
      }
    ],
    "family": "芸香科 (Rutaceae) 花椒屬",
    "partsUsed": "嫩莖葉",
    "activeCompounds": [
      "刺蔥揮發油 (含檸檬烯、香葉醇)",
      "生物鹼",
      "香豆素"
    ],
    "harvestSeason": "春夏秋嫩葉萌發時採摘，全樹幹布滿銳刺",
    "terroir": "台灣中低海拔向陽闊葉林、花蓮太魯閣部落、南投仁愛鄉泰雅山區",
    "region": "花東原鄉 (花蓮吉安/太魯閣/台東)",
    "folkApplication": "原民野菜與食茱萸香料",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "春分",
    "commonNames": [
      "刺蔥",
      "樗葉花椒",
      "鳥不踏",
      "越椒"
    ],
    "category": "原住民山林草本",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "properties": [
      "辛",
      "溫"
    ],
    "channels": [
      "脾",
      "胃",
      "腎"
    ],
    "efficacy": "溫中散寒、燥濕止痛、行氣活血、祛風止癢。常用於胃寒腹痛、風濕關節酸痛、感冒風寒。",
    "contraindications": "陰虛火旺、口舌生瘡燥熱者慎用；味道辛香濃郁，胃潰瘍急性發作期不宜大劑量。",
    "usage": "採嫩芽 10-20g，切碎入菜煎蛋、煮鮮魚湯或泡酒（刺蔥酒）；老葉乾品煎湯熏洗關節。",
    "taiwanHeritage": "原住民「三名蔥」之一（刺蔥、山胡椒馬告、大花咸豐草）。因全株樹幹長滿粗銳尖刺，連鳥類都無法駐足棲息，故民間戲稱為「鳥不踏」。阿美族與泰雅族獵人視其為山林至寶，烤肉或煮湯撒一把，香氣直沖雲霄，暖胃驅寒。",
    "thumbnailUrl": "/images/herbs/herb_22.svg",
    "tags": [
      "原民神草",
      "刺蔥",
      "鳥不踏",
      "溫中散寒",
      "部落傳統智慧"
    ],
    "status": "published"
  },
  {
    "id": 23,
    "name": "昭和草",
    "scientificName": "Crassocephalum crepidioides (Benth.) S. Moore",
    "pinyin": "Zhāo Hé Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "山茼蒿 (Suann-tâng-o)"
      },
      {
        "dialect": "俗稱",
        "name": "飛機草"
      },
      {
        "dialect": "俗稱",
        "name": "神仙菜"
      }
    ],
    "family": "菊科 (Asteraceae) 野茼蒿屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "黃酮類",
      "花青素",
      "多酚化合物",
      "維生素A/C"
    ],
    "harvestSeason": "春末至秋冬皆可採摘，以初春花苞未展、嫩莖肥碩時最為爽脆",
    "terroir": "阿里山林道向陽邊坡、花東縱谷休耕水田、全台丘陵荒地",
    "region": "全島平野與山林",
    "folkApplication": "原民野菜與食茱萸香料",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "雨水",
    "commonNames": [
      "山茼蒿",
      "野茼蒿",
      "飛機草",
      "革命菜",
      "飢荒草"
    ],
    "category": "原住民山林草本",
    "nature": "涼",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "涼"
    ],
    "channels": [
      "胃",
      "大腸"
    ],
    "efficacy": "清熱利尿、健脾消腫、消腫散瘀。嫩葉含特殊菊科茼蒿香氣，是台灣最著名且極具生命力的本土野菜。",
    "contraindications": "性偏涼，體虛胃寒容易便溏者，烹調時可佐以麻油、老薑煸炒以平衡寒性。",
    "usage": "鮮嫩莖葉 50-100g 蒜炒、煮蛋花湯或裹薄粉酥炸；乾品 15-30g 水煎可清熱利尿。",
    "taiwanHeritage": "相傳日治昭和年間，日本政府為解決戰時南洋軍隊野外糧食短缺，以飛機自高空撒播其種子於台灣山林，故得名「昭和草」或「飛機草」。如今已深植台灣土地，成為原鄉部落與快炒店人氣不墜的山野佳餚。",
    "thumbnailUrl": "/images/herbs/herb_23.svg",
    "tags": [
      "山茼蒿",
      "日治歷史",
      "台灣野菜",
      "清熱利濕",
      "部落山林"
    ],
    "status": "published"
  },
  {
    "id": 24,
    "name": "山苦瓜",
    "scientificName": "Momordica charantia L. var. abbreviata Ser.",
    "pinyin": "Shān Kǔ Guā",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "野苦瓜 (Iá-khóo-kue)"
      },
      {
        "dialect": "原住民語 (阿美)",
        "name": "Tatukem"
      }
    ],
    "family": "葫蘆科 (Cucurbitaceae) 苦瓜屬",
    "partsUsed": "果實",
    "activeCompounds": [
      "苦瓜胜肽 (Momordica Charantia Polypeptide)",
      "苦瓜苷 (Charantin)",
      "三萜類化合物"
    ],
    "harvestSeason": "夏秋陽光強烈時結實纍纍，採摘青果切片曬乾製茶",
    "terroir": "花蓮吉安花蓮農改場培育產區、壽豐鄉有機專區、台東縱谷",
    "region": "花東原鄉 (花蓮吉安/太魯閣/台東)",
    "folkApplication": "百草苦茶退癀降火",
    "safetyLevel": "虛寒慎用",
    "solarTermRecommendation": "夏至",
    "commonNames": [
      "野苦瓜",
      "小苦瓜",
      "原民苦瓜",
      "紅娘果"
    ],
    "category": "清熱燥濕藥",
    "nature": "寒",
    "taste": [
      "苦"
    ],
    "properties": [
      "大苦",
      "寒"
    ],
    "channels": [
      "心",
      "肝",
      "胃"
    ],
    "efficacy": "清熱解暑、瀉火明目、除煩止渴。現代生技研究證實其特定苦瓜胜肽對胰島素敏感度調節具有指標性意義。",
    "contraindications": "性大寒，脾胃虛寒容易胃痛泄瀉者及孕婦慎用。",
    "usage": "乾品切片 5-10g 沖泡熱水代茶飲；鮮果切塊可煮山苦瓜排骨湯或清炒鹹蛋以降苦火。",
    "taiwanHeritage": "阿美族餐桌上的長壽密碼！花蓮野生種果實小如核桃，滋味比一般白苦瓜濃烈數倍，原住民老人家稱其為「土地最真誠的苦甘」。花蓮農改場多年培育推廣，使這顆東台灣野果蛻變為國際矚目的機能健康之星。",
    "thumbnailUrl": "/images/herbs/herb_24.svg",
    "tags": [
      "苦瓜胜肽",
      "花蓮特產",
      "清熱瀉火",
      "代謝調節",
      "原住民健康智慧"
    ],
    "status": "published"
  },
  {
    "id": 25,
    "name": "香茅",
    "scientificName": "Cymbopogon citratus (DC.) Stapf",
    "pinyin": "Xiāng Máo",
    "dialectNames": [
      {
        "dialect": "客語",
        "name": "茅草 (Màu-coi)"
      },
      {
        "dialect": "台語",
        "name": "檸檬香茅 (Lê-bóng-hiunn-mâu)"
      }
    ],
    "family": "禾本科 (Poaceae) 香茅屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "檸檬醛 (Citral / 佔70-80%)",
      "香葉醇 (Geraniol)",
      "香茅醇"
    ],
    "harvestSeason": "全年皆可分批刈割地上長葉，陽光曝曬後蒸餾或陰乾",
    "terroir": "苗栗西湖香茅寮、南投水里丘陵、台東東河香草產區",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "客家辟邪抹草沐浴",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立夏",
    "commonNames": [
      "檸檬香茅",
      "檸檬草",
      "茅草精",
      "香巴茅"
    ],
    "category": "客家風土民俗草",
    "nature": "溫",
    "taste": [
      "辛",
      "甘"
    ],
    "properties": [
      "辛",
      "溫"
    ],
    "channels": [
      "肺",
      "脾",
      "胃"
    ],
    "efficacy": "祛風通絡、溫中和胃、消腫止痛、防蚊抑菌。具有清爽強烈的檸檬清新芳香，可舒緩神經疲勞。",
    "contraindications": "陰虛火熱、胃熱吐酸者不宜多服。",
    "usage": "鮮葉或乾草 10-15g 煮水代茶，亦常與艾草、抹草一同熬水沐浴，驅風辟穢防蚊。",
    "taiwanHeritage": "苗栗西湖與三義早期曾是全世界香茅油輸出重鎮，全盛時期全台佔全球供量七成。客家人稱之為「綠金香茅」，山丘上座落著一座座煙霧裊裊的香茅蒸餾油寮。夏夜一把香茅草掛在門窗，蚊蚋不侵，幽香綿延數代人。",
    "thumbnailUrl": "/images/herbs/herb_25.svg",
    "tags": [
      "客家香茅",
      "檸檬清香",
      "防蚊驅邪",
      "溫胃理氣",
      "苗栗風土"
    ],
    "status": "published"
  },
  {
    "id": 26,
    "name": "台灣油菊",
    "scientificName": "Dendranthema arisanense (Hayata) Y.Ling & C.Shih",
    "pinyin": "Tái Wān Yóu Jú",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "野菊花 (Iá-kiok-hue)"
      },
      {
        "dialect": "客語",
        "name": "油菊 (Yù-giúg)"
      }
    ],
    "family": "菊科 (Asteraceae) 菊屬",
    "partsUsed": "乾燥花序",
    "activeCompounds": [
      "綠原酸 (Chlorogenic acid)",
      "木犀草素 (Luteolin)",
      "香葉醇揮發油"
    ],
    "harvestSeason": "冬季 11 月至翌年 1 月花朵盛開時採摘",
    "terroir": "花蓮赤柯山、台東金針山、嘉義阿里山高海拔向陽雲霧帶",
    "region": "花東原鄉 (花蓮吉安/太魯閣/台東)",
    "folkApplication": "高山蜜香清肝油菊茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "冬至",
    "commonNames": [
      "野菊",
      "阿里山油菊",
      "蜜香野菊",
      "蓬萊油菊"
    ],
    "category": "食藥同源補益",
    "nature": "涼",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "微苦",
      "涼"
    ],
    "channels": [
      "肺",
      "肝"
    ],
    "efficacy": "疏散風熱、平肝明目、清熱解毒。具有濃烈野蜜與花果芬芳，能舒緩現代人眼力疲勞與頭面風熱。",
    "contraindications": "脾胃極度虛寒、容易腹部冷痛或腹瀉者宜酌量搭配紅棗或枸杞熱飲。",
    "usage": "取乾燥油菊花 3-5g，以 90°C 熱水沖泡 3-5 分鐘即可飲用，亦可與枸杞子或桑葉同泡。",
    "taiwanHeritage": "台灣特有種高山野菊！早年東台灣阿美族與客家移民族群於秋冬農閒時攀上稜線採集，其花朵雖細小如銅錢，沖泡時卻釋放出驚人的天然蜜香，被譽為「花東縱谷雲霧裡的金色甘露」。",
    "thumbnailUrl": "/images/herbs/herb_26.svg",
    "tags": [
      "台灣特有種",
      "花東特產",
      "高山蜜香",
      "清肝明目",
      "食藥同源"
    ],
    "status": "published"
  },
  {
    "id": 27,
    "name": "馬齒莧",
    "scientificName": "Portulaca oleracea L.",
    "pinyin": "Mǎ Chǐ Xiàn",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "豬母乳 (Ti-bó-leng)"
      },
      {
        "dialect": "客語",
        "name": "豬母菜 (Zû-mû-coi)"
      }
    ],
    "family": "馬齒莧科 (Portulacaceae) 馬齒莧屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "Omega-3 脂肪酸 (次亞麻油酸)",
      "多糖體",
      "維生素 C",
      "甜菜紅素"
    ],
    "harvestSeason": "春末至秋季多雨時生長旺盛，以開花前採摘鮮嫩莖葉為佳",
    "terroir": "全島平野農地、休耕田埂、菜園邊緣與果園樹下濕潤沃土",
    "region": "全島平野與山林",
    "folkApplication": "農村傳統清熱退火野菜",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "小暑",
    "commonNames": [
      "豬母乳",
      "五行草",
      "長命菜",
      "瓜子菜",
      "馬齒菜"
    ],
    "category": "清熱解毒藥",
    "nature": "寒",
    "taste": [
      "酸"
    ],
    "properties": [
      "酸",
      "寒"
    ],
    "channels": [
      "大腸",
      "肝"
    ],
    "efficacy": "清熱解毒、涼血止血、利水通淋、消腫化瘀。對腸道濕熱腹瀉及皮膚癰腫尤具良效。",
    "contraindications": "性寒滑利，孕婦慎用；脾胃虛弱、經常泄瀉者不宜過量多食。",
    "usage": "鮮品 60-120g 清炒或煮湯；乾品 15-30g 水煎服。鮮葉搗爛可外敷熱痱與蟲咬腫痛。",
    "taiwanHeritage": "台灣農村物資匱乏年代，這味肥厚多汁的野草曾因能催長豬隻乳汁而被稱為「豬母乳」；農人常拔取嫩芽蒜炒或滾鹹蛋湯，其酸爽滑潤的獨特口感是許多長輩童年最深刻的荒年滋味。",
    "thumbnailUrl": "/images/herbs/herb_27.svg",
    "tags": [
      "田間野菜",
      "涼血止血",
      "長命草",
      "腸胃清熱",
      "台灣古早味"
    ],
    "status": "published"
  },
  {
    "id": 28,
    "name": "刺蔥",
    "scientificName": "Zanthoxylum ailanthoides Siebold & Zucc.",
    "pinyin": "Cì Cōng",
    "dialectNames": [
      {
        "dialect": "泰雅語",
        "name": "Tana"
      },
      {
        "dialect": "阿美語",
        "name": "Alivaw"
      },
      {
        "dialect": "布農語",
        "name": "Tana"
      },
      {
        "dialect": "台語",
        "name": "鳥不踏 (Tsiáu-put-ta̍h)"
      }
    ],
    "family": "芸香科 (Rutaceae) 花椒屬",
    "partsUsed": "嫩葉、果實與樹皮",
    "activeCompounds": [
      "檸檬烯 (Limonene)",
      "香茅醛",
      "生物鹼",
      "芸香苷 (Rutin)"
    ],
    "harvestSeason": "春夏季嫩葉繁茂時採集嫩芽；秋冬採摘芳香果實",
    "terroir": "花東縱谷、雪山山脈南麓、中南部中低海拔次生林溪谷向陽坡",
    "region": "花東原鄉 (花蓮吉安/太魯閣/台東)",
    "folkApplication": "原住民山林元氣驅寒茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立春",
    "commonNames": [
      "食茱萸",
      "鳥不踏",
      "越椒",
      "野花椒",
      "紅刺蔥"
    ],
    "category": "原住民山林草本",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "properties": [
      "辛",
      "溫"
    ],
    "channels": [
      "脾",
      "胃",
      "肝"
    ],
    "efficacy": "溫中散寒、行氣止痛、祛風除濕、活血消腫。能振奮食慾、暖胃散風寒，兼具絕佳天然驅蟲抑菌力。",
    "contraindications": "陰虛火旺、實熱胃痛及咽喉紅腫發炎者不宜食用。",
    "usage": "嫩葉切碎煮魚湯、煎蛋或泡煮熱水作茶飲；鮮葉 10-20g，乾葉 5-10g。",
    "taiwanHeritage": "台灣原住民「三名蔥」之一！因全株布滿密生硬刺，連鳥類都無法棲息，民間戲稱「鳥不踏」。阿美族與泰雅族獵人入山打獵時，隨手採摘一把刺蔥葉投入溪魚湯，濃郁撲鼻的柑橘野香瞬間驅散山嵐濕寒。",
    "thumbnailUrl": "/images/herbs/herb_28.svg",
    "tags": [
      "原住民傳統",
      "花東野菜",
      "溫中散寒",
      "三名蔥",
      "鳥不踏"
    ],
    "status": "published"
  },
  {
    "id": 29,
    "name": "台灣藜",
    "scientificName": "Chenopodium formosanum Koidz.",
    "pinyin": "Tái Wān Lí",
    "dialectNames": [
      {
        "dialect": "排灣語",
        "name": "Djulis"
      },
      {
        "dialect": "魯凱語",
        "name": "Balik"
      }
    ],
    "family": "莧科 (Amaranthaceae) 藜屬",
    "partsUsed": "全草與成熟種子穗",
    "activeCompounds": [
      "甜菜色素 (Betacyanins)",
      "槲皮素 (Quercetin)",
      "蘆丁",
      "高膳食纖維"
    ],
    "harvestSeason": "秋冬播種，翌年春季 2-4 月穀穗色彩絢麗成熟時採收",
    "terroir": "屏東三地門、霧台，台東金峰、達仁及太麻里原鄉部落梯田",
    "region": "花東原鄉 (花蓮吉安/太魯閣/台東)",
    "folkApplication": "原民傳統小米釀酵母與養生穀物",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "春分",
    "commonNames": [
      "紅藜",
      "原生藜",
      "原民紅寶石",
      "台灣彩藜"
    ],
    "category": "食藥同源補益",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "properties": [
      "甘",
      "平"
    ],
    "channels": [
      "脾",
      "胃",
      "腎"
    ],
    "efficacy": "健脾益氣、調和腸胃、補虛滋養、抗氧化強身。富含多酚與甜菜色素，能活化代謝與滋補元氣。",
    "contraindications": "含高量鉀離子與膳食纖維，嚴重腎功能不全者需遵醫囑適量攝取。",
    "usage": "紅藜全穀 15-30g 與糙米蒸煮，或以整穗全草 10g 煮沸泡茶，茶湯呈現天然寶石紅酒色。",
    "taiwanHeritage": "排灣族與魯凱族四百年傳承的「穀物界紅寶石」！紅藜曾是部落釀造小米酒不可或缺的天然酒麴發酵催化劑，亦是慶典頭飾上最尊貴的斑斕裝飾。其強悍的抗旱生命力見證了台灣南島民族的土地韌性。",
    "thumbnailUrl": "/images/herbs/herb_29.svg",
    "tags": [
      "台灣特有種",
      "原住民紅寶石",
      "抗氧化",
      "健脾補虛",
      "排灣智慧"
    ],
    "status": "published"
  },
  {
    "id": 30,
    "name": "假酸漿",
    "scientificName": "Trichodesma calycosum var. formosanum (Matsum.) Brand",
    "pinyin": "Jiǎ Suān Jiāng",
    "dialectNames": [
      {
        "dialect": "魯凱語",
        "name": "Lavilu"
      },
      {
        "dialect": "排灣語",
        "name": "Kavus"
      }
    ],
    "family": "紫草科 (Boraginaceae) 田基麻屬",
    "partsUsed": "葉片與根部",
    "activeCompounds": [
      "天然水溶性黏液多醣",
      "生物鹼",
      "黃酮苷"
    ],
    "harvestSeason": "全年常綠生長，以春雨滋潤後葉片寬大厚軟時採集最優",
    "terroir": "屏東三地門、台東太麻里、大武山麓向陽林緣灌叢",
    "region": "花東原鄉 (花蓮吉安/太魯閣/台東)",
    "folkApplication": "原住民吉拿富 (Cinavu) 內層包裹葉與消食整腸茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "穀雨",
    "commonNames": [
      "碧果草",
      "吉拿富葉",
      "酸漿野草",
      "排灣整腸草"
    ],
    "category": "原住民山林草本",
    "nature": "平",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "微苦",
      "平"
    ],
    "channels": [
      "脾",
      "胃",
      "大腸"
    ],
    "efficacy": "健脾消食、化滯整腸、利水消腫、清熱潤腸。能消除糯米或肥肉引發的腹脹悶痛與消化不良。",
    "contraindications": "體質極度虛寒、長期水瀉便溏者不宜過量多食。",
    "usage": "鮮葉清洗後直接包裹山豬肉與小米蒸煮食用（連葉一起嚼食），或乾葉 10-15g 煮水飲用。",
    "taiwanHeritage": "南台灣排灣與魯凱族歲時祭儀的文化印記！每逢貴賓蒞臨或豐收慶典，部落婦女必定採摘假酸漿葉包裹傳統「吉拿富 (Cinavu)」。蒸熟後的葉子柔軟化開，帶有森林芬多精香氣，更奇妙的是即使多吃糯米也絕不脹氣。",
    "thumbnailUrl": "/images/herbs/herb_30.svg",
    "tags": [
      "排灣文化",
      "吉拿富",
      "消食整腸",
      "南島本草",
      "健胃化積"
    ],
    "status": "published"
  },
  {
    "id": 31,
    "name": "過溝菜蕨",
    "scientificName": "Diplazium esculentum (Retz.) Sw.",
    "pinyin": "Guò Gōu Cài Jué",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "過貓 (Kuè-bâ)"
      },
      {
        "dialect": "客語",
        "name": "過山貓 (Guo-san-meu)"
      }
    ],
    "family": "蹄蓋蕨科 (Athyriaceae) 雙蓋蕨屬",
    "partsUsed": "幼嫩拳卷葉與嫩莖",
    "activeCompounds": [
      "原花青素 (Proanthocyanidins)",
      "黃酮類",
      "粗纖維",
      "胡蘿蔔素"
    ],
    "harvestSeason": "全年皆產，以夏秋兩季雨水充沛、嫩梢迅速伸展時最盛",
    "terroir": "全台潮濕山澗、溝渠陰涼濕地、宜蘭三星與花蓮吉安水圳邊",
    "region": "全島平野與山林",
    "folkApplication": "台灣山產店經典涼拌安神解熱野蕨",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立夏",
    "commonNames": [
      "過貓",
      "水過貓",
      "菜蕨",
      "山鳳尾",
      "蹄蓋蕨"
    ],
    "category": "清熱利濕藥",
    "nature": "寒",
    "taste": [
      "甘",
      "淡"
    ],
    "properties": [
      "甘",
      "淡",
      "寒"
    ],
    "channels": [
      "胃",
      "大腸"
    ],
    "efficacy": "清熱解毒、安神降壓、利尿消腫、滑腸通便。能清瀉腸胃伏熱與調理夏季口舌乾渴。",
    "contraindications": "性大寒滑利，脾胃虛寒容易腹瀉、胃寒隱痛及孕婦不宜大量食用。",
    "usage": "滾水川燙後冰鎮拌麻油薑絲或生蛋黃食用，乾品 10-20g 可煮茶清火利水。",
    "taiwanHeritage": "「走過水溝，野貓探頭！」台灣早期鄉間水圳旁隨處可見這捲曲如貓爪的鮮嫩蕨苗。客庄與原鄉農民採摘後，以滾水焯去天然黏澀，再以自榨黑麻油與老薑旺火快炒，是山林最甘脆的綠色饋贈。",
    "thumbnailUrl": "/images/herbs/herb_31.svg",
    "tags": [
      "台灣野菜",
      "過貓",
      "清熱利水",
      "降火滑腸",
      "水圳生機"
    ],
    "status": "published"
  },
  {
    "id": 32,
    "name": "台灣山蘇花",
    "scientificName": "Asplenium nidus L.",
    "pinyin": "Tái Wān Shān Sū Huā",
    "dialectNames": [
      {
        "dialect": "阿美語",
        "name": "Lukut"
      },
      {
        "dialect": "泰雅語",
        "name": "Yutux"
      },
      {
        "dialect": "台語",
        "name": "山蘇 (Suann-so)"
      }
    ],
    "family": "鐵角蕨科 (Aspleniaceae) 鐵角蕨屬",
    "partsUsed": "嫩捲葉與老葉浸膏",
    "activeCompounds": [
      "酚酸類化合物",
      "植物甾醇",
      "多醣體",
      "維生素 E"
    ],
    "harvestSeason": "四季均可採摘新萌發之捲曲嫩梢，雨季萌發尤為迅速",
    "terroir": "花蓮光復、秀林、萬榮及台東卑南中低海拔原始闊葉林巨木樹幹上",
    "region": "花東原鄉 (花蓮吉安/太魯閣/台東)",
    "folkApplication": "原住民森林採集與破瘀利水珍饈",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "小滿",
    "commonNames": [
      "山蘇",
      "雀巢蕨",
      "鳥巢蕨",
      "原鄉翠羽",
      "皇冠蕨"
    ],
    "category": "原住民山林草本",
    "nature": "涼",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "微苦",
      "涼"
    ],
    "channels": [
      "肺",
      "大腸"
    ],
    "efficacy": "清熱散瘀、利尿通便、破血消腫、生津潤腸。富含纖維能促腸胃蠕動、清滌宿垢。",
    "contraindications": "脾胃虛冷、慢性腸胃虛弱腹瀉者宜少食，料理時宜佐以溫性老薑及破布子。",
    "usage": "採集新展捲尖 100g，與丁香魚、破布子大火快炒；老葉亦可曬乾煮水外洗解肌膚熱癢。",
    "taiwanHeritage": "附生於高聳古木枝椏上的「森林皇冠」！阿美族青年自古擅長攀爬參天大樹採摘，其葉柄基部的鳥巢狀構造能收集落葉形成肥沃腐植質。入口清脆滑嫩，帶有高山露水般的淡淡野味。",
    "thumbnailUrl": "/images/herbs/herb_32.svg",
    "tags": [
      "原住民山珍",
      "雀巢蕨",
      "清熱散瘀",
      "花東美食",
      "森林附生植物"
    ],
    "status": "published"
  },
  {
    "id": 33,
    "name": "鵝不食草",
    "scientificName": "Centipeda minima (L.) A. Braun & Asch.",
    "pinyin": "É Bù Shí Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "食咳草 (Tsia̍h-khik-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "地胡椒 (Tē-hōo-tsio)"
      },
      {
        "dialect": "客語",
        "name": "石胡荽 (Sag-fù-sôi)"
      }
    ],
    "family": "菊科 (Asteraceae) 石胡荽屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "蒲公英甾醇 (Taraxasterol)",
      "堆心菊素 (Helenalin)",
      "揮發油 (桉葉素)"
    ],
    "harvestSeason": "夏秋花果期割取全草，洗淨鮮用或陰乾",
    "terroir": "嘉南平原、雲林水田溝渠、休耕泥濘濕地與水圳旁",
    "region": "嘉南 (嘉南平原/古都安平/白河)",
    "folkApplication": "台灣民間通鼻竅與止咳化痰秘草",
    "safetyLevel": "適量調養",
    "solarTermRecommendation": "霜降",
    "commonNames": [
      "食咳草",
      "石胡荽",
      "雞腸草",
      "通鼻草",
      "地胡椒"
    ],
    "category": "辛溫解表藥",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "properties": [
      "辛",
      "溫"
    ],
    "channels": [
      "肺",
      "肝"
    ],
    "efficacy": "發散風寒、通鼻通竅、止咳化痰、解毒散癰。對過敏性鼻炎、慢性鼻塞及寒飲咳嗽為傳統要藥。",
    "contraindications": "氣味辛烈走竄，陰虛火旺鼻血、孕婦及體內有鬱熱者慎用。",
    "usage": "乾品 5-10g 煎服；或將乾燥草葉研極細粉少許吸入鼻腔通嚏；亦可鮮品搗爛外塞鼻孔。",
    "taiwanHeritage": "相傳連鵝鵝都不敢靠近啃食，因其辛辣刺激之揮發氣味極強！台灣早年青草舖遇有鼻竇炎、寒風受涼鼻水不止的農民，老茶師便取一小把鵝不食草，教人微火蒸氣燻鼻，頑固塞滯一瞬間通體舒泰。",
    "thumbnailUrl": "/images/herbs/herb_33.svg",
    "tags": [
      "通鼻竅",
      "鼻炎聖藥",
      "辛溫解表",
      "食咳草",
      "嘉南風土"
    ],
    "status": "published"
  },
  {
    "id": 34,
    "name": "羊蹄草",
    "scientificName": "Emilia sonchifolia (L.) DC.",
    "pinyin": "Yáng Tí Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "紫背草 (Tsí-puē-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "葉下紅 (Hio̍h-ē-âng)"
      },
      {
        "dialect": "客語",
        "name": "點紅香 (Diam-fúng-hiong)"
      }
    ],
    "family": "菊科 (Asteraceae) 一點紅屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "一點紅鹼 (Senecionine)",
      "黃酮苷",
      "金絲桃苷",
      "有機酸"
    ],
    "harvestSeason": "春末至秋季開出淡紫色頭狀花序時採收全草",
    "terroir": "全島向陽荒地、茶園邊緣、丘陵坡地與中南部路旁田埂",
    "region": "全島平野與山林",
    "folkApplication": "民間青草茶散瘀解鬱與咽喉炎配伍",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "芒種",
    "commonNames": [
      "紫背草",
      "一點紅",
      "葉下紅",
      "紅背草",
      "小葉羊蹄草"
    ],
    "category": "清熱解毒藥",
    "nature": "涼",
    "taste": [
      "苦",
      "微酸"
    ],
    "properties": [
      "苦",
      "微酸",
      "涼"
    ],
    "channels": [
      "肺",
      "肝",
      "大腸"
    ],
    "efficacy": "清熱解毒、散瘀消腫、涼血止血、利水通淋。善清咽喉火毒、赤痢腹瀉及跌打瘀滯腫痛。",
    "contraindications": "性涼，孕婦及氣血虛寒、經常大便溏軟者忌服過量。",
    "usage": "乾品 15-30g，鮮品加倍，水煎服。喉嚨乾痛時可搭配金銀花與薄荷同泡代茶。",
    "taiwanHeritage": "葉面青翠、葉背卻帶著神秘典雅的紫紅血絲，宛如大自然雙面織錦。台灣早期青草伯常將其採集曬捆，凡夏天因烈日工作火氣聚於咽喉、說不出話來的苦力勞工，喝上一碗紫背草茶，咽喉濁熱頓消。",
    "thumbnailUrl": "/images/herbs/herb_34.svg",
    "tags": [
      "紫背草",
      "一點紅",
      "清熱散瘀",
      "利咽喉",
      "農村野草"
    ],
    "status": "published"
  },
  {
    "id": 35,
    "name": "天胡荽",
    "scientificName": "Hydrocotyle sibthorpioides Lam.",
    "pinyin": "Tiān Hú Suī",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "滿天星 (Bán-thinn-tsheinn)"
      },
      {
        "dialect": "台語",
        "name": "破銅錢 (Phuà-tâng-tsînn)"
      },
      {
        "dialect": "客語",
        "name": "變地錦 (Bien-ti-gim)"
      }
    ],
    "family": "繖形科 (Apiaceae) 天胡荽屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "槲皮素",
      "山柰酚 (Kaempferol)",
      "天胡荽苷",
      "揮發性萜類"
    ],
    "harvestSeason": "夏秋季雨水充沛時全草生長繁茂，隨採隨用",
    "terroir": "全島平野及低海拔陰濕草地、水溝石隙、水田泥岸",
    "region": "全島平野與山林",
    "folkApplication": "中南部平肝退黃與退伏熱消炎草",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "夏至",
    "commonNames": [
      "滿天星",
      "破銅錢",
      "變地錦",
      "細葉天胡荽",
      "落得打"
    ],
    "category": "清熱利濕藥",
    "nature": "寒",
    "taste": [
      "辛",
      "苦"
    ],
    "properties": [
      "辛",
      "苦",
      "寒"
    ],
    "channels": [
      "肝",
      "脾",
      "腎"
    ],
    "efficacy": "清熱利濕、解毒消腫、利膽退黃、平肝明目。對肝膽濕熱、黃疸尿赤、急性結膜炎及咽喉腫痛良效。",
    "contraindications": "性寒，脾胃虛寒容易嘔吐、腹痛下利者慎服。",
    "usage": "鮮草 30-60g 搗汁沖冰糖服；乾草 15-30g 水煎服。鮮草搗爛敷疔瘡癰腫。",
    "taiwanHeritage": "圓小如綠色微型荷葉，雨後如繁星般鋪滿濕潤土地，台灣鄉村老一輩稱其為「滿天星」或「破銅錢」。在尚未有現代保肝保健品的年代，中南部老百姓常以一把鮮天胡荽絞汁兌蜂蜜，清利盛夏肝膽濁熱。",
    "thumbnailUrl": "/images/herbs/herb_35.svg",
    "tags": [
      "滿天星",
      "清熱利濕",
      "保肝草本",
      "破銅錢",
      "台灣水草"
    ],
    "status": "published"
  },
  {
    "id": 36,
    "name": "含羞草",
    "scientificName": "Mimosa pudica L.",
    "pinyin": "Hán Xiū Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "見笑草 (Kiàn-siàu-tsháu)"
      },
      {
        "dialect": "客語",
        "name": "怕羞草 (Pa-siu-coi)"
      }
    ],
    "family": "豆科 (Fabaceae) 含羞草屬",
    "partsUsed": "全草或根部",
    "activeCompounds": [
      "含羞草鹼 (Mimosine)",
      "黃酮苷",
      "鞣質",
      "硒元素"
    ],
    "harvestSeason": "夏秋開淡粉紫絨球花時採割全草；秋末採挖老根曬乾",
    "terroir": "中南部乾燥向陽荒埔、鐵路邊坡、高屏河床砂礫沙質土壤",
    "region": "南部 (六堆屏東/高樹/恆春半島)",
    "folkApplication": "南部民間安神定驚與強筋健骨根湯",
    "safetyLevel": "適量調養",
    "solarTermRecommendation": "處暑",
    "commonNames": [
      "見笑草",
      "怕羞草",
      "知羞草",
      "呼喝草",
      "含羞草根"
    ],
    "category": "溫經止血與理氣藥",
    "nature": "微寒",
    "taste": [
      "甘",
      "澀"
    ],
    "properties": [
      "甘",
      "澀",
      "微寒"
    ],
    "channels": [
      "心",
      "肝",
      "胃",
      "大腸"
    ],
    "efficacy": "清熱利尿、涼血解毒、鎮靜安神、消積化瘀。其老根（見笑草頭）性平偏溫，民間常用於舒筋活絡與筋骨痠痛。",
    "contraindications": "含有微量含羞草鹼，不可長期過量單味濃煎；孕婦忌服。",
    "usage": "乾全草 10-15g 水煎服；見笑草老根 15-30g 配紅棗燉排骨或瘦肉，調理筋骨痠軟。",
    "taiwanHeritage": "輕觸即合攏低垂，彷彿純真少女害羞垂首，台語稱「見笑草」。南部客家與閩南長輩視其為深具靈性的神草，嬰兒夜啼受驚時以枝葉煮水淨身安魂，而深掘之「見笑草頭」更是南部勞動階層舒緩腰脊筋骨的私房燉料。",
    "thumbnailUrl": "/images/herbs/herb_36.svg",
    "tags": [
      "見笑草",
      "安神定驚",
      "強筋骨",
      "民間草根",
      "南部風土"
    ],
    "status": "published"
  },
  {
    "id": 37,
    "name": "茵陳蒿",
    "scientificName": "Artemisia capillaris Thunb.",
    "pinyin": "Yīn Chén Hāo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "茵陳 (In-tîn)"
      },
      {
        "dialect": "台語",
        "name": "濱蒿 (Pin-ko)"
      }
    ],
    "family": "菊科 (Asteraceae) 蒿屬",
    "partsUsed": "幼嫩地上部全草",
    "activeCompounds": [
      "茵陳素 (Capillarisin)",
      "綠原酸",
      "對羥基苯乙酮",
      "濱蒿內酯"
    ],
    "harvestSeason": "春季幼苗高三寸時採集（綿茵陳品質最上乘）；秋季花蕾採集（茵陳花）",
    "terroir": "台南北門、七股鹽田、嘉義布袋海岸沙灘及海風吹拂的乾燥向陽沙質荒地",
    "region": "嘉南 (嘉南平原/古都安平/白河)",
    "folkApplication": "台灣西南濱海清熱利膽退黃神仙草",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "驚蟄",
    "commonNames": [
      "茵陳",
      "綿茵陳",
      "濱蒿",
      "白蒿",
      "絨蒿"
    ],
    "category": "清熱利濕藥",
    "nature": "微寒",
    "taste": [
      "苦",
      "辛"
    ],
    "properties": [
      "苦",
      "辛",
      "微寒"
    ],
    "channels": [
      "脾",
      "胃",
      "肝",
      "膽"
    ],
    "efficacy": "清利濕熱、利膽退黃。為中醫與台灣民間歷代治療黃疸、肝膽濕熱、下焦濕疹與皮膚搔癢的第一聖藥。",
    "contraindications": "蓄血發黃及脾胃極度虛寒之陰黃證宜配合溫中藥材，不可單味大量久服。",
    "usage": "乾品 15-30g，沸水沖泡或大火煎煮 15 分鐘。常與車前草、梔子同用熬製退黃利濕茶。",
    "taiwanHeritage": "「三月茵陳四月蒿，五月六月當柴燒。」古諺道破採摘時節的關鍵。在台灣西南沿海鹽分地帶，海風狂烈，茵陳卻能化沙為寶。西海岸青草師傅用它配黑糖慢熬成濃茶，拯救早年無數因烈日勞動受濕熱熏蒸的面黃消瘦漁民。",
    "thumbnailUrl": "/images/herbs/herb_37.svg",
    "tags": [
      "退黃聖藥",
      "利膽清濕熱",
      "西海岸本草",
      "保肝退火",
      "綿茵陳"
    ],
    "status": "published"
  },
  {
    "id": 38,
    "name": "土人參",
    "scientificName": "Talinum paniculatum (Jacq.) Gaertn.",
    "pinyin": "Tǔ Rén Shēn",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "參仔菜 (Tsam-á-tshài)"
      },
      {
        "dialect": "客語",
        "name": "土高麗 (Tu-go-li)"
      }
    ],
    "family": "土人參科 (Talinaceae) 土人參屬",
    "partsUsed": "肥大肉質根部與幼嫩莖葉",
    "activeCompounds": [
      "皂苷類 (Saponins)",
      "多糖體",
      "黃酮",
      "豐富黏液質"
    ],
    "harvestSeason": "春夏季採摘鮮嫩肥厚菜梢；秋末冬初掘取地下肥厚肉質根",
    "terroir": "全台農舍後院、菜園邊界、石牆裂隙與富含有機質之半遮陰庭院沃土",
    "region": "全島平野與山林",
    "folkApplication": "鄉間後院溫補元氣參仔菜排骨湯",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立冬",
    "commonNames": [
      "參仔菜",
      "假人參",
      "櫨蘭",
      "土高麗參",
      "申時花"
    ],
    "category": "食藥同源補益",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "properties": [
      "甘",
      "平"
    ],
    "channels": [
      "脾",
      "肺",
      "腎"
    ],
    "efficacy": "補中益氣、健脾潤肺、養陰生津、消腫解毒。對氣虛乏力、脾虛腹瀉、產後乳汁不足及虛勞咳嗽有滋補療效。",
    "contraindications": "體質實熱、大便乾結祕結者慎食其根部。",
    "usage": "嫩莖葉 100-200g 清炒或煮蛋花湯；肉質鮮根 30-60g（乾根 15-30g）燉土雞或排骨補中益氣。",
    "taiwanHeritage": "台灣農家紅磚牆腳下最親切的「家常人參」！其開淡粉紅細花，每於午後三點申時盛開故又名「申時花」。掘開根部圓滾如小高麗參，切片燉湯散發如人參般的芳香回甘，是物資匱乏時代農家媽媽為坐月子媳婦補養元氣的秘方。",
    "thumbnailUrl": "/images/herbs/herb_38.svg",
    "tags": [
      "參仔菜",
      "家常補氣",
      "健脾潤肺",
      "食藥同源",
      "農莊記憶"
    ],
    "status": "published"
  },
  {
    "id": 39,
    "name": "落地生根",
    "scientificName": "Bryophyllum pinnatum (Lam.) Oken",
    "pinyin": "Luò Dì Shēng Gēn",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "倒吊蓮 (Tò-tiàu-liân)"
      },
      {
        "dialect": "台語",
        "name": "打不死 (Phah-bē-sí)"
      },
      {
        "dialect": "客語",
        "name": "燈籠花 (Den-lùng-fā)"
      }
    ],
    "family": "景天科 (Crassulaceae) 落地生根屬",
    "partsUsed": "肥厚肉質葉片",
    "activeCompounds": [
      "苔藓甾醇",
      "槲皮素",
      "有機酸 (蘋果酸、檸檬酸)",
      "草酸鹽"
    ],
    "harvestSeason": "全年皆可採集肥厚肥潤之綠葉，隨摘隨用，鮮用為佳",
    "terroir": "恆春半島珊瑚礁岩、台東綠島濱海向陽岩壁及南部村落石砌駁坎",
    "region": "南部 (六堆屏東/高樹/恆春半島)",
    "folkApplication": "南部民間鮮葉搗敷消腫與清咽潤喉汁",
    "safetyLevel": "外用為主",
    "solarTermRecommendation": "大暑",
    "commonNames": [
      "倒吊蓮",
      "打不死",
      "落地生根",
      "葉生芽",
      "天燈籠"
    ],
    "category": "清熱解毒藥",
    "nature": "寒",
    "taste": [
      "酸",
      "微澀"
    ],
    "properties": [
      "酸",
      "微澀",
      "寒"
    ],
    "channels": [
      "心",
      "肺",
      "肝"
    ],
    "efficacy": "清熱解毒、涼血止血、散瘀消腫、利尿退癀。善解咽喉腫痛、吐血衄血及跌打挫傷癰疽。",
    "contraindications": "性大寒，脾胃虛弱、易瀉者禁內服；內服劑量不宜過大以防噁心滑腸。",
    "usage": "外用取鮮葉 3-5 片搗爛敷患部；內服鮮葉 1-2 片洗淨微嚼含汁吞嚥，或水煎 10-15g。",
    "taiwanHeritage": "生命力強悍無比的「不死神草」！一片葉子飄落泥土，葉緣齒刻便能萌發數十株嫩綠新苗。南部討海人與農夫被毒蟲螫咬或跌打腫痛，隨手摘兩片倒吊蓮葉以石頭搗碎敷於患處，清涼消腫的神效世代相傳。",
    "thumbnailUrl": "/images/herbs/herb_39.svg",
    "tags": [
      "倒吊蓮",
      "跌打外敷",
      "涼血止血",
      "打不死",
      "恆春岩生"
    ],
    "status": "published"
  },
  {
    "id": 40,
    "name": "蟛蜞菊",
    "scientificName": "Sphagneticola calendulacea (L.) Pruski",
    "pinyin": "Péng Qí Jú",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "黃花蜜菜 (N̂g-hue-bi̍t-tshài)"
      },
      {
        "dialect": "客語",
        "name": "地黃菊 (Ti-vòng-giúg)"
      }
    ],
    "family": "菊科 (Asteraceae) 蟛蜞菊屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "蟛蜞菊內酯 (Wedelolactone)",
      "黃酮類",
      "甾醇",
      "多炔"
    ],
    "harvestSeason": "春夏兩季生長旺盛、黃花繁茂時採收全草曬乾",
    "terroir": "北部淡水河口濕地、基隆暖暖、宜蘭濕潤溝渠邊緣與潮濕平野",
    "region": "北部 (萬華/淡水河/雙北)",
    "folkApplication": "萬華青草茶傳統「三黃」核心原料",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "夏至",
    "commonNames": [
      "黃花蜜菜",
      "蟛蜞菊",
      "地黃菊",
      "黃花仔",
      "馬蹄菊"
    ],
    "category": "台灣青草茶經典",
    "nature": "涼",
    "taste": [
      "微甜",
      "微苦"
    ],
    "properties": [
      "微甜",
      "微苦",
      "涼"
    ],
    "channels": [
      "肺",
      "肝"
    ],
    "efficacy": "清熱解毒、潤肺止咳、涼血散瘀、清火利咽。味道甘潤微香，為青草茶極佳之天然甘味與降火基底。",
    "contraindications": "脾胃虛寒體弱者應適量飲用，不宜與大寒藥過度併服。",
    "usage": "乾草 15-30g，鮮草 60-90g。常與咸豐草、薄荷、鳳尾草配伍同熬退火解暑涼茶。",
    "taiwanHeritage": "老萬華西昌街青草巷四大名旦之一！老茶師調配祖傳青草茶時，若嫌青草苦味過重，必加入一把「黃花蜜菜」。它既能退伏熱，熬出來的茶湯更有一股宛如野百花蜜般的淡淡幽甜，使青草茶老少皆宜。",
    "thumbnailUrl": "/images/herbs/herb_40.svg",
    "tags": [
      "黃花蜜菜",
      "青草巷靈魂",
      "三黃之一",
      "清肺利咽",
      "天然蜜甜"
    ],
    "status": "published"
  },
  {
    "id": 41,
    "name": "葉下珠",
    "scientificName": "Phyllanthus urinaria L.",
    "pinyin": "Yè Xià Zhū",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "珠仔草 (Tsu-á-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "夜合草 (Iā-ha̍h-tsháu)"
      },
      {
        "dialect": "客語",
        "name": "十字珍珠草 (Siip-zii-zîn-zû-coi)"
      }
    ],
    "family": "葉下珠科 (Phyllanthaceae) 葉下珠屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "沒食子酸 (Gallic acid)",
      "柯里拉賓 (Corilagin)",
      "鞣花酸",
      "木犀草素"
    ],
    "harvestSeason": "夏秋季葉背結滿如珍珠般小圓果實時割取全草",
    "terroir": "中部台中大肚山、彰化八卦山丘陵、南投中寮果園與茶園透光隙地",
    "region": "中部 (彰化田尾/南投名間/埔里)",
    "folkApplication": "台灣民間最負盛名之保肝降火退黃草",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "秋分",
    "commonNames": [
      "珠仔草",
      "葉下珠",
      "珍珠草",
      "夜合草",
      "陰陽草"
    ],
    "category": "清熱利濕藥",
    "nature": "涼",
    "taste": [
      "微苦",
      "甘"
    ],
    "properties": [
      "微苦",
      "甘",
      "涼"
    ],
    "channels": [
      "肝",
      "肺"
    ],
    "efficacy": "平肝清熱、利水消腫、明目解毒、散瘀消積。在台灣民間廣泛用於熬夜過度、肝火上升、目赤澀痛與濕熱黃疸。",
    "contraindications": "體質虛寒、頻尿胃寒者不宜長期間隔不斷頻繁飲用。",
    "usage": "乾草 15-30g，鮮草 30-60g，水煎代茶。亦常與金銀花、白鶴靈芝熬煮保肝養生飲。",
    "taiwanHeritage": "「葉如含羞排排展，葉下排珠燦若珠。」入夜後其羽狀葉會如含羞草般合攏睡眠，白晝展開，葉背整齊倒掛著一串玲瓏綠珍珠。台灣中南部早期青草店招牌上常寫著「珠仔草茶」，是老一輩勞動者熬夜護肝的天然神水。",
    "thumbnailUrl": "/images/herbs/herb_41.svg",
    "tags": [
      "珠仔草",
      "保肝名草",
      "平肝清熱",
      "明目退火",
      "中台灣風土"
    ],
    "status": "published"
  },
  {
    "id": 42,
    "name": "鐵冬青",
    "scientificName": "Ilex rotunda Thunb.",
    "pinyin": "Tiě Dōng Qīng",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "救必應 (Kiù-pit-ìng)"
      },
      {
        "dialect": "客語",
        "name": "白沉香 (Pag-tsim-hiong)"
      }
    ],
    "family": "冬青科 (Aquifoliaceae) 冬青屬",
    "partsUsed": "樹皮、根皮與嫩葉",
    "activeCompounds": [
      "救必應酸 (Rotundic acid)",
      "原兒茶酸",
      "丁香苷",
      "冬青皂苷"
    ],
    "harvestSeason": "全年皆可剝取老樹皮與枝皮曬乾；秋冬採摘成熟紅果",
    "terroir": "嘉南丘陵、白河、嘉義中埔低海拔山林次生林向陽山谷",
    "region": "嘉南 (嘉南平原/古都安平/白河)",
    "folkApplication": "台灣古法苦茶與二十四味涼茶苦甘靈魂",
    "safetyLevel": "適量調養",
    "solarTermRecommendation": "小雪",
    "commonNames": [
      "救必應",
      "鐵冬青",
      "白沉香",
      "圓葉冬青",
      "紅果冬青"
    ],
    "category": "清熱燥濕藥",
    "nature": "寒",
    "taste": [
      "苦"
    ],
    "properties": [
      "苦",
      "寒"
    ],
    "channels": [
      "肺",
      "肝",
      "胃"
    ],
    "efficacy": "清熱解毒、利濕止痛、涼血消腫。能瀉三焦之實火、清腸胃濕熱、止胃痛咽痛及皮膚熱毒癰疽。",
    "contraindications": "味極苦而大寒，脾胃虛寒胃中隱痛、食少便溏者嚴禁過量服用。",
    "usage": "乾樹皮或根 10-15g，入群藥慢火久煎。為古法二十四味大苦茶必備之主味。",
    "taiwanHeritage": "「入口極苦，落喉回甘如甘泉！」嶺南與台灣民間稱其為「救必應」，寓意服下此藥有求必應、神效奇速。夜市或廟埕前那一壺壺黑亮冒煙的老字號苦茶，其清心降火的厚重苦韻，正是由這味樹皮文火熬出。",
    "thumbnailUrl": "/images/herbs/herb_42.svg",
    "tags": [
      "救必應",
      "老字號苦茶",
      "苦盡甘來",
      "瀉三焦火",
      "嘉南林產"
    ],
    "status": "published"
  },
  {
    "id": 43,
    "name": "一枝黃花",
    "scientificName": "Solidago virgaurea var. leiocarpa (Benth.) A. Gray",
    "pinyin": "Yī Zhī Huáng Huā",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "黃花一枝香 (N̂g-hue-tsi̍t-ki-hiunn)"
      },
      {
        "dialect": "客語",
        "name": "金柴胡 (Gim-cai-fu)"
      }
    ],
    "family": "菊科 (Asteraceae) 一枝黃花屬",
    "partsUsed": "全草帶花序",
    "activeCompounds": [
      "蘆丁 (Rutin)",
      "一枝黃花酚苷 (Leiocarposide)",
      "齊墩果酸",
      "鞣質"
    ],
    "harvestSeason": "秋季 8 至 10 月黃色花序燦爛綻放時採收全草",
    "terroir": "台灣全島中高海拔山區向陽林緣草坡、合歡山、雪山步道旁",
    "region": "全島平野與山林",
    "folkApplication": "高山原住民與客庄疏風感冒草茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "寒露",
    "commonNames": [
      "一枝黃花",
      "金柴胡",
      "黃花草",
      "千根草",
      "台灣金棒菊"
    ],
    "category": "辛涼解表藥",
    "nature": "涼",
    "taste": [
      "辛",
      "苦"
    ],
    "properties": [
      "辛",
      "苦",
      "涼"
    ],
    "channels": [
      "肺",
      "肝"
    ],
    "efficacy": "疏風清熱、解毒消腫、抗菌利尿。治風熱感冒、頭痛發熱、咽喉腫痛、肺熱咳嗽及跌打傷腫。",
    "contraindications": "體質風寒感冒、惡寒無汗、脾胃虛寒泄瀉者不宜多服。",
    "usage": "乾品 10-20g，水煎服。外用鮮品搗爛外敷咽喉或跌打處。",
    "taiwanHeritage": "秋風蕭瑟之際，台灣高山步道旁總會冒出一枝枝宛若黃金權杖的挺拔花序，因而得名「一枝黃花」。台灣山區採藥人稱其為本土「金柴胡」，登山受風寒喉嚨沙啞時，摘一小把煎湯溫服，風邪立解。",
    "thumbnailUrl": "/images/herbs/herb_43.svg",
    "tags": [
      "台灣原生菊",
      "疏風解表",
      "高山金棒",
      "清肺利咽",
      "金柴胡"
    ],
    "status": "published"
  },
  {
    "id": 44,
    "name": "五爪金英",
    "scientificName": "Tithonia diversifolia (Hemsl.) A. Gray",
    "pinyin": "Wǔ Zhǎo Jīn Yīng",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "王爺葵 (Ông-iâ-kuî)"
      },
      {
        "dialect": "台語",
        "name": "五爪金英 (Góo-jiáu-kim-ing)"
      },
      {
        "dialect": "客語",
        "name": "大菊野花 (Tai-giúg-iá-fā)"
      }
    ],
    "family": "菊科 (Asteraceae) 金英屬",
    "partsUsed": "葉片與花序",
    "activeCompounds": [
      "太各辛 (Tagitinin)",
      "多酚化合物",
      "倍半萜內酯 (Sesquiterpene lactones)"
    ],
    "harvestSeason": "秋冬季 11 至 1 月黃花盛開時採摘厚葉與花頭曬乾",
    "terroir": "中部南投埔里、國姓、彰化二水與南部山路向陽邊坡荒地",
    "region": "中部 (彰化田尾/南投名間/埔里)",
    "folkApplication": "埔里民間退大癀與降實火猛烈清涼茶",
    "safetyLevel": "遵醫囑",
    "solarTermRecommendation": "大暑",
    "commonNames": [
      "王爺葵",
      "假向日葵",
      "金英花",
      "太陽花草",
      "退癀草"
    ],
    "category": "清熱燥濕藥",
    "nature": "寒",
    "taste": [
      "極苦"
    ],
    "properties": [
      "極苦",
      "寒"
    ],
    "channels": [
      "肝",
      "膽",
      "胃"
    ],
    "efficacy": "清熱解毒、消腫退癀、平肝降火、活血通絡。台灣民間傳統視為退熱消炎、清解肝膽實火之強效猛草。",
    "contraindications": "藥力猛烈且極其苦寒，孕婦、體質虛弱老人、兒童及脾胃虛寒者嚴禁服用；不可長期連續飲用。",
    "usage": "乾燥葉片僅需 3-5g（鮮葉 1-2 片），多配伍甘草、紅棗煮茶以緩和苦烈之氣。",
    "taiwanHeritage": "盛開時花徑達十公分以上，金碧輝煌宛如王爺出巡冠冕，故台語尊稱「王爺葵」。南投埔里老一輩口耳相傳，遇有身體發大炎、熱疔腫癀不退之急性火毒，採一小片五爪金英葉泡茶，苦入心脾，火氣應聲而降。",
    "thumbnailUrl": "/images/herbs/herb_44.svg",
    "tags": [
      "王爺葵",
      "五爪金英",
      "退癀神草",
      "大苦降火",
      "埔里名草"
    ],
    "status": "published"
  },
  {
    "id": 45,
    "name": "益母草",
    "scientificName": "Leonurus japonicus Houtt.",
    "pinyin": "Yì Mǔ Cǎo",
    "dialectNames": [
      {
        "dialect": "客語",
        "name": "益母草 (Yid-mu-coi)"
      },
      {
        "dialect": "客語",
        "name": "坤草 (Kun-coi)"
      },
      {
        "dialect": "台語",
        "name": "茺蔚 (Tshiong-uì)"
      }
    ],
    "family": "唇形科 (Lamiaceae) 益母草屬",
    "partsUsed": "地上全草",
    "activeCompounds": [
      "益母草鹼 (Leonurine)",
      "水蘇鹼 (Stachydrine)",
      "苯甲酸",
      "氯化鉀"
    ],
    "harvestSeason": "夏季莖葉茂盛、花未全開或初開時刈割全草",
    "terroir": "桃竹苗客庄田埂、苗栗公館、銅鑼休耕農田與向陽水圳邊緣",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "客家婦女坐月子與調經補氣血第一草",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立秋",
    "commonNames": [
      "坤草",
      "茺蔚",
      "益母草",
      "野麻",
      "九重樓"
    ],
    "category": "溫經止血與理氣藥",
    "nature": "微寒",
    "taste": [
      "辛",
      "苦"
    ],
    "properties": [
      "辛",
      "苦",
      "微寒"
    ],
    "channels": [
      "心",
      "肝",
      "膀胱"
    ],
    "efficacy": "活血調經、利水消腫、清熱解毒。善調經閉不通、產後瘀血腹痛、惡露不盡、水腫尿少及瘡癰腫毒。",
    "contraindications": "孕婦絕對禁用；血虛無瘀者及月經過多者不宜服用。",
    "usage": "乾品 10-30g，水煎服；亦常與當歸、川芎或麻油雞同燉以助產後子宮收縮。",
    "taiwanHeritage": "「本草千金，益母唯親。」客家文化中對女性關懷備至的代表本草！苗栗客家庄母親每在女兒出嫁或臨盆前，必定在庭院角落親手栽植一畦益母草。熬煮成黑色濃汁加入紅糖溫飲，溫柔呵護女人一生的氣血安康。",
    "thumbnailUrl": "/images/herbs/herb_45.svg",
    "tags": [
      "益母草",
      "客家婦女智慧",
      "活血調經",
      "月子良方",
      "坤草"
    ],
    "status": "published"
  },
  {
    "id": 46,
    "name": "雞屎藤",
    "scientificName": "Paederia foetida L.",
    "pinyin": "Jī Shǐ Téng",
    "dialectNames": [
      {
        "dialect": "客語",
        "name": "雞矢藤 (Gie-sii-tin)"
      },
      {
        "dialect": "台語",
        "name": "雞屎藤 (Ke-sái-tîn)"
      }
    ],
    "family": "茜草科 (Rubiaceae) 雞矢藤屬",
    "partsUsed": "全草帶根",
    "activeCompounds": [
      "雞矢藤苷 (Paederoside)",
      "車葉草苷 (Asperuloside)",
      "揮發油",
      "熊果酸"
    ],
    "harvestSeason": "秋季結小黃褐果實時採收全草，洗淨切段曬乾",
    "terroir": "桃竹苗客庄丘陵、新竹關西、苗栗三義林緣灌木叢與籬笆上",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "客家傳統「三月三」避邪雞矢藤粄與消食茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "清明",
    "commonNames": [
      "雞矢藤",
      "牛皮凍",
      "解暑藤",
      "斑鳩飯",
      "清風藤"
    ],
    "category": "客家風土民俗草",
    "nature": "平",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "微苦",
      "平"
    ],
    "channels": [
      "脾",
      "胃",
      "肝",
      "肺"
    ],
    "efficacy": "祛風除濕、消食健脾、活血止痛、解毒消腫。能消除小兒食積膨脹、風濕筋骨痠痛及久咳痰多。",
    "contraindications": "脾胃極度虛弱者宜配合薑棗煎服，孕婦慎用。",
    "usage": "乾品 15-30g，鮮草 30-60g。鮮葉洗淨搗碎擠汁，與糯米粉搓揉製成「雞矢藤粄」蒸食。",
    "taiwanHeritage": "初揉葉片時因含硫化物微帶特異酸臭，故稱「雞屎藤」；然而奇妙的是，經熱火蒸煮或日曬後，臭味盡散，化為如紅豆沙或仙草般芬芳溫潤的甘香！客家人每逢清明前後採葉作粄，寓意辟邪祛積、健脾強身。",
    "thumbnailUrl": "/images/herbs/herb_46.svg",
    "tags": [
      "雞屎藤粄",
      "客家古早味",
      "消食化積",
      "三月三",
      "轉臭為香"
    ],
    "status": "published"
  },
  {
    "id": 47,
    "name": "台灣扁柏",
    "scientificName": "Chamaecyparis obtusa var. formosana (Hayata) Rehder",
    "pinyin": "Tái Wān Piǎn Bǎi",
    "dialectNames": [
      {
        "dialect": "俗稱",
        "name": "黃檜 (N̂g-kuài)"
      },
      {
        "dialect": "日語借詞",
        "name": "Hinoki"
      },
      {
        "dialect": "泰雅語",
        "name": "Hinpoki"
      }
    ],
    "family": "柏科 (Cupressaceae) 扁柏屬",
    "partsUsed": "扁平鱗葉、木屑與純露精油",
    "activeCompounds": [
      "檜木醇 (Hinokitiol)",
      "α-側柏蒎烯",
      "扁柏雙黃酮",
      "萜烯醇類"
    ],
    "harvestSeason": "四季常綠，以林業疏伐後之新鮮枝葉收集蒸餾或陰乾",
    "terroir": "宜蘭棲蘭山、嘉義阿里山、拉拉山海拔 1,300-2,800 公尺雲霧巨木林帶",
    "region": "全島平野與山林",
    "folkApplication": "高山神木森林芬多精芳香辟穢與足浴",
    "safetyLevel": "外用為主",
    "solarTermRecommendation": "冬至",
    "commonNames": [
      "黃檜",
      "台灣扁柏",
      "厚殼仔",
      "Hinoki",
      "雲霧神木"
    ],
    "category": "原住民山林草本",
    "nature": "微寒",
    "taste": [
      "苦",
      "澀"
    ],
    "properties": [
      "苦",
      "澀",
      "微寒"
    ],
    "channels": [
      "肺",
      "心",
      "脾"
    ],
    "efficacy": "芳香辟穢、收斂止血、清肺化痰、強效抗菌除臭。其豐富芬多精能鎮靜中樞神經、淨化呼吸道。",
    "contraindications": "體質過敏者慎用精油；內服需在專業引導下嚴格控制劑量，不可隨意大量服食生葉。",
    "usage": "鮮枝葉 30-50g 煮沸後薰蒸室內空氣或兌入溫水浸浴足部；木屑或精油作擴香用途。",
    "taiwanHeritage": "台灣國寶神木之尊！世界七大檜木林中，台灣得天獨厚獨佔其二。棲蘭山與阿里山千百年雲霧孕育出的扁柏，其木質與枝葉富含高濃度「檜木醇」，具強悍抗菌驅蟲神力，幽遠深邃的木質芳香是台灣山林的靈魂之味。",
    "thumbnailUrl": "/images/herbs/herb_47.svg",
    "tags": [
      "台灣國寶",
      "阿里山檜木",
      "芬多精之王",
      "芳香辟穢",
      "神木氣息"
    ],
    "status": "published"
  },
  {
    "id": 48,
    "name": "貓鼻草",
    "scientificName": "Orthosiphon aristatus (Blume) Miq.",
    "pinyin": "Māo Bí Cǎo",
    "dialectNames": [
      {
        "dialect": "俗稱",
        "name": "化石草 (Huà-shí-cǎo)"
      },
      {
        "dialect": "俗稱",
        "name": "貓鬚草 (Niau-tshiu-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "腎茶 (Sīn-tê)"
      }
    ],
    "family": "唇形科 (Lamiaceae) 腎茶屬",
    "partsUsed": "全草帶花序",
    "activeCompounds": [
      "迷迭香酸 (Rosmarinic acid)",
      "橙黃酮 (Sinensetin)",
      "貓鬚草酸",
      "高鉀鹽"
    ],
    "harvestSeason": "開白紫色貓鬚狀花序盛期割取地上全草，切段曬乾",
    "terroir": "屏東高樹、內埔有機草藥園、高雄六龜溫暖濕潤坡地",
    "region": "南部 (六堆屏東/高樹/恆春半島)",
    "folkApplication": "南部民間通淋排石與利水消腫「化石茶」",
    "safetyLevel": "適量調養",
    "solarTermRecommendation": "小滿",
    "commonNames": [
      "化石草",
      "貓鬚草",
      "腎茶",
      "爪哇茶",
      "貓鼻花"
    ],
    "category": "利水滲濕藥",
    "nature": "涼",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "微苦",
      "涼"
    ],
    "channels": [
      "腎",
      "膀胱"
    ],
    "efficacy": "清熱利濕、通淋排石、利尿消腫。對泌尿道結石、腎炎水腫、小便不利及尿路感染具傳統卓效。",
    "contraindications": "腎功能嚴重衰竭者及嚴重心臟衰竭患者應遵醫囑監測，不可盲目代替常規醫學手術。",
    "usage": "乾品 15-30g，沸水沖泡悶 20 分鐘代茶飲，常與車前草、白茅根搭配促排尿。",
    "taiwanHeritage": "因雄蕊細長伸出花冠數公分、宛若貓咪鬍鬚而得名；民間更因其通淋排濁之能而盛傳其能「化結石」，尊為「化石草」。屏東高樹許多老草農家門口均栽種一排，夏日煮一大壺貓鬚茶，通利全身水道。",
    "thumbnailUrl": "/images/herbs/herb_48.svg",
    "tags": [
      "化石草",
      "貓鬚草",
      "通淋排石",
      "利尿清熱",
      "屏東農情"
    ],
    "status": "published"
  },
  {
    "id": 49,
    "name": "七葉膽",
    "scientificName": "Gynostemma pentaphyllum (Thunb.) Makino",
    "pinyin": "Qī Yè Dǎn",
    "dialectNames": [
      {
        "dialect": "俗稱",
        "name": "絞股藍 (Jiǎo-gǔ-lán)"
      },
      {
        "dialect": "台語",
        "name": "五葉參 (Gōo-hio̍h-sim)"
      },
      {
        "dialect": "俗稱",
        "name": "南山人參"
      }
    ],
    "family": "葫蘆科 (Cucurbitaceae) 絞股藍屬",
    "partsUsed": "全草帶攀援卷鬚",
    "activeCompounds": [
      "絞股藍皂苷 (Gypenosides / 超過80種)",
      "蘆丁",
      "多醣體",
      "類黃酮"
    ],
    "harvestSeason": "夏季藤蔓生長茂密時刈割，以嫩梢鮮綠、無泥土雜質者為優",
    "terroir": "南投竹山、鹿谷凍頂山區、杉林溪海拔 800-1,200 公尺雲霧林緣",
    "region": "中部 (彰化田尾/南投名間/埔里)",
    "folkApplication": "高山竹林益氣降火「南國五葉參茶」",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立秋",
    "commonNames": [
      "絞股藍",
      "七葉膽",
      "五葉參",
      "甘茶蔓",
      "福音草"
    ],
    "category": "補虛藥 (補氣)",
    "nature": "涼",
    "taste": [
      "苦",
      "微甘"
    ],
    "properties": [
      "苦",
      "微甘",
      "涼"
    ],
    "channels": [
      "肺",
      "脾",
      "腎"
    ],
    "efficacy": "益氣健脾、清熱解毒、止咳祛痰、滋補強身。其所含皂苷分子結構與人參皂苷高度相似，能雙向平衡體質。",
    "contraindications": "少數胃腸敏感者空腹飲用可能產生輕微噁心或大便稀軟，宜飯後溫飲。",
    "usage": "乾燥葉 3-5g 沸水沖泡 3-5 分鐘即可飲用，入口微苦、入喉迅速化出甘甜。",
    "taiwanHeritage": "「北有人參，南有絞股藍！」南投竹山老茶農在雲霧竹林間發現此藤本，因其葉片多為五至七片複葉、入口微苦回甘而稱之「七葉膽」。它是台灣高山茶席間最常見的養生茶，既能退燥火，又能補中氣。",
    "thumbnailUrl": "/images/herbs/herb_49.svg",
    "tags": [
      "絞股藍",
      "南方人參",
      "益氣降脂",
      "回甘神草",
      "南投高山"
    ],
    "status": "published"
  },
  {
    "id": 50,
    "name": "決明子",
    "scientificName": "Senna tora (L.) Roxb.",
    "pinyin": "Jué Míng Zǐ",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "草決明 (Tsháu-kuat-bîng)"
      },
      {
        "dialect": "台語",
        "name": "馬蹄決明"
      }
    ],
    "family": "豆科 (Fabaceae) 決明屬",
    "partsUsed": "成熟乾燥種子",
    "activeCompounds": [
      "大黃素 (Emodin)",
      "大黃酚 (Chrysophanol)",
      "決明素",
      "黏液質"
    ],
    "harvestSeason": "秋末莢果變黃褐色成熟時割取全株，曬乾打下種子去除雜質",
    "terroir": "台南下營、新化、嘉義義竹休耕農地向陽砂壤土",
    "region": "嘉南 (嘉南平原/古都安平/白河)",
    "folkApplication": "台灣古早味冰紅茶靈魂麥香與明目潤腸飲",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立秋",
    "commonNames": [
      "草決明",
      "馬蹄決明",
      "假綠豆",
      "還瞳子",
      "狗屎豆"
    ],
    "category": "清熱解毒藥",
    "nature": "微寒",
    "taste": [
      "甘",
      "苦",
      "鹹"
    ],
    "properties": [
      "甘",
      "苦",
      "鹹",
      "微寒"
    ],
    "channels": [
      "肝",
      "大腸"
    ],
    "efficacy": "清肝明目、利水通便。對肝火目赤腫痛、羞明多淚、青光眼及頭痛眩暈、腸燥便秘有顯著緩解功效。",
    "contraindications": "性微寒滑腸，脾胃虛寒容易泄瀉、低血壓者慎用；孕婦不宜長久過量頻飲。",
    "usage": "文火焙炒至微爆香氣（去除寒性與生草青味），取 10-15g 沸水悶泡，或與阿薩姆紅茶熬煮古早味紅茶。",
    "taiwanHeritage": "台灣手搖飲文化與古早味紅茶的幕後功臣！許多人喝了一輩子台灣古早味冰紅茶，總驚艷於那股醇厚麥香與咖啡香氣，殊不知正是加入焙炒決明子的奇妙點綴。它兼能清肝明目、利便排濁，堪稱常民智慧典範。",
    "thumbnailUrl": "/images/herbs/herb_50.svg",
    "tags": [
      "古早味紅茶",
      "清肝明目",
      "潤腸通便",
      "草決明",
      "麥香焙火"
    ],
    "status": "published"
  },
  {
    "id": 51,
    "name": "白花水龍",
    "scientificName": "Ludwigia adscendens (L.) H. Hara",
    "pinyin": "Bái Huā Shuǐ Lóng",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "水龍 (Tsuí-lîng)"
      },
      {
        "dialect": "台語",
        "name": "過塘蛇 (Kuè-tn̂g-tsuâ)"
      }
    ],
    "family": "柳葉菜科 (Onagraceae) 丁香蓼屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "沒食子酸",
      "鞣花酸",
      "黃酮醇苷",
      "原花青素"
    ],
    "harvestSeason": "夏秋季漂浮於水面繁茂生長時撈採，洗淨鮮用或曬乾",
    "terroir": "台南官田、白河蓮田、嘉義朴子溪畔水塘及曾文溪下游濕地",
    "region": "嘉南 (嘉南平原/古都安平/白河)",
    "folkApplication": "嘉南平原水邊清熱解毒與退癀敷草",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "小暑",
    "commonNames": [
      "水龍",
      "過塘蛇",
      "白花水龍",
      "水浮蓮",
      "水丁香近緣"
    ],
    "category": "清熱解毒藥",
    "nature": "涼",
    "taste": [
      "淡",
      "微苦"
    ],
    "properties": [
      "淡",
      "微苦",
      "涼"
    ],
    "channels": [
      "肺",
      "膀胱"
    ],
    "efficacy": "清熱解毒、利尿通淋、涼血止血、消腫退癀。善解感冒發熱、咽喉炎、水腫及皮膚熱瘡毒瘡。",
    "contraindications": "脾胃虛寒體弱者慎用；採集時需確保水質乾淨無農藥與工業重金屬污染。",
    "usage": "乾品 15-30g 水煎服；鮮品 30-60g 搗汁服用或鮮草搗爛外敷癰疽癤腫。",
    "taiwanHeritage": "生長於嘉南平原古老埤塘中的水生草本，因其白色呼吸根膨大如海綿、浮在水面宛如白龍游動而得名「水龍」。早年水田農夫下田時若遭毒蟲叮咬或皮肉劃破發炎，隨手撈起水龍嚼爛敷上，清涼退火、消腫神速。",
    "thumbnailUrl": "/images/herbs/herb_51.svg",
    "tags": [
      "水生植物",
      "水龍",
      "清熱解毒",
      "利尿通淋",
      "嘉南水澤"
    ],
    "status": "published"
  },
  {
    "id": 52,
    "name": "地骨皮",
    "scientificName": "Lycium chinense Mill.",
    "pinyin": "Dì Gǔ Pí",
    "dialectNames": [
      {
        "dialect": "俗稱",
        "name": "枸杞根皮 (Kú-kí-kin-phuê)"
      },
      {
        "dialect": "古名",
        "name": "仙人杖"
      }
    ],
    "family": "茄科 (Solanaceae) 枸杞屬",
    "partsUsed": "乾燥根皮",
    "activeCompounds": [
      "地骨皮甲素 (Kukoamine A)",
      "甜菜鹼",
      "苦柴胡醇",
      "桂皮酸"
    ],
    "harvestSeason": "春初或秋末掘取根部，剝取根皮，曬乾入藥",
    "terroir": "全島平野向陽荒地、彰化芳苑海風沿海旱田及澎湖海島防風石垣下",
    "region": "全島平野與山林",
    "folkApplication": "民間退骨蒸盜汗與清肺熱伏火經典根皮",
    "safetyLevel": "適量調養",
    "solarTermRecommendation": "白露",
    "commonNames": [
      "枸杞根",
      "地骨皮",
      "仙人杖",
      "地仙",
      "杞根皮"
    ],
    "category": "清熱解毒藥",
    "nature": "寒",
    "taste": [
      "甘"
    ],
    "properties": [
      "甘",
      "寒"
    ],
    "channels": [
      "肺",
      "肝",
      "腎"
    ],
    "efficacy": "涼血除蒸、清肺降火、生津止渴。專治陰虛潮熱、骨蒸盜汗、肺熱咳嗽少痰、咳血及內熱消渴。",
    "contraindications": "脾胃虛寒容易泄瀉溏便者及外感風寒發熱者忌服。",
    "usage": "乾根皮 9-15g，慢火水煎服；常與知母、鱉甲配伍調理陰虛骨蒸潮熱。",
    "taiwanHeritage": "「拔地三尺得仙杖，清熱除蒸透骨香。」枸杞全株皆是寶：葉為天精草、果為枸杞子、根皮即為地骨皮。古籍記載其能透徹肌骨深處伏熱，台灣早年青草老舖遇有久病虛熱、夜半冒冷汗之虛弱長輩，必以地骨皮慢火燉引。",
    "thumbnailUrl": "/images/herbs/herb_52.svg",
    "tags": [
      "地骨皮",
      "退骨蒸虛熱",
      "清肺降火",
      "茄科本草",
      "涼血甘草"
    ],
    "status": "published"
  },
  {
    "id": 53,
    "name": "藺草",
    "scientificName": "Cyperus malaccensis var. brevifolius Bock.",
    "pinyin": "Lìn Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "蓆草 (Tshi̍h-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "咸草 (Kiâm-tsháu)"
      }
    ],
    "family": "莎草科 (Cyperaceae) 莎草屬",
    "partsUsed": "全草帶地下匍匐根莖",
    "activeCompounds": [
      "三萜類化合物",
      "纖維素",
      "木質素",
      "植物多糖"
    ],
    "harvestSeason": "每年農曆三月、六月及九月分三期收割，以六月草品質最韌",
    "terroir": "苗栗苑裡大安溪與房裡溪沖積扇交界淡鹹水潮汐海口濕地",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "苑裡百年草蓆故鄉與海口清熱解暑茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "大暑",
    "commonNames": [
      "苑裡藺草",
      "三角藺草",
      "蓆草",
      "咸草",
      "短葉茳芏"
    ],
    "category": "利水滲濕藥",
    "nature": "涼",
    "taste": [
      "甘",
      "淡"
    ],
    "properties": [
      "甘",
      "淡",
      "涼"
    ],
    "channels": [
      "心",
      "肺",
      "小腸"
    ],
    "efficacy": "清熱利尿、除煩止渴、散熱通淋。其根莖清香宜人，煎水代茶能解盛夏酷暑心胸煩熱。",
    "contraindications": "脾腎虛寒小便頻數清長者不宜過量飲用。",
    "usage": "取洗淨陰乾之藺草根莖 20-30g，煮沸 15 分鐘後濾渣當茶飲，帶有一股獨特宜人草香。",
    "taiwanHeritage": "苗栗苑裡百年傳承的「綠金傳奇」！大安溪出海口的特異水質與海風，孕育出全世界質地最堅韌、草香最濃郁的三角形藺草。苑裡婦女世代以靈巧雙手編織出聞名全球的藺草蓆帽，而草根煮水更是海口人夏日必備的甘美退暑仙草。",
    "thumbnailUrl": "/images/herbs/herb_53.svg",
    "tags": [
      "苑裡藺草",
      "百年編織工藝",
      "清暑除煩",
      "海口風土",
      "草蓆之鄉"
    ],
    "status": "published"
  },
  {
    "id": 54,
    "name": "木槿花",
    "scientificName": "Hibiscus syriacus L.",
    "pinyin": "Mù Jǐn Huā",
    "dialectNames": [
      {
        "dialect": "客語",
        "name": "籬笆花 (Lì-bá-fā)"
      },
      {
        "dialect": "古名",
        "name": "朝開暮落花"
      }
    ],
    "family": "錦葵科 (Malvaceae) 木槿屬",
    "partsUsed": "乾燥花朵",
    "activeCompounds": [
      "花青素類 (Anthocyanins)",
      "黏液質",
      "肥皂草苷",
      "木槿酸"
    ],
    "harvestSeason": "夏秋季晴天清晨花朵初綻放時採摘，當日曬乾或低溫烘乾",
    "terroir": "新竹新埔、竹東、苗栗頭份客庄農家田邊天然綠籬笆",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "客庄傳統清熱潤肺花茶與炒木槿蛋",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立秋",
    "commonNames": [
      "籬笆花",
      "木槿花",
      "朝開暮落花",
      "白飯花",
      "客庄槿花"
    ],
    "category": "清熱解毒藥",
    "nature": "涼",
    "taste": [
      "甘"
    ],
    "properties": [
      "甘",
      "涼"
    ],
    "channels": [
      "肺",
      "脾",
      "大腸"
    ],
    "efficacy": "清熱利濕、涼血解毒、潤燥止咳。對肺熱燥咳、咯血、腸風瀉血、赤白痢疾及婦女濕熱帶下有良好調養之功。",
    "contraindications": "體質虛寒、容易大便水瀉滑腸者宜減量溫飲。",
    "usage": "乾花 5-10g 沖泡熱水加冰糖作花茶；客家庄亦常摘取鮮花洗淨炒蛋或煮排骨湯。",
    "taiwanHeritage": "「朝開暮落，生生不息。」客庄先民開墾丘陵時，最喜以木槿枝條插地成籬，既能阻絕家畜又能防風。花開時紅白相映，婦女信手採下一籃入菜或泡茶，滑潤順口，道盡客家勤儉與山野順時應候的浪漫生活情調。",
    "thumbnailUrl": "/images/herbs/herb_54.svg",
    "tags": [
      "木槿花",
      "客庄綠籬",
      "清熱潤燥",
      "朝開暮落",
      "食藥同源"
    ],
    "status": "published"
  },
  {
    "id": 55,
    "name": "構樹",
    "scientificName": "Broussonetia papyrifera (L.) L'Hér. ex Vent.",
    "pinyin": "Gòu Shù",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "鹿仔樹 (Lo̍k-á-tshiū)"
      },
      {
        "dialect": "客語",
        "name": "紙樹 (Zii-su)"
      },
      {
        "dialect": "阿美語",
        "name": "Tapa"
      }
    ],
    "family": "桑科 (Moraceae) 構樹屬",
    "partsUsed": "果實 (楮實子)、嫩葉與樹皮",
    "activeCompounds": [
      "楮實子皂苷",
      "黃酮類",
      "脂肪酸",
      "維生素 B 群"
    ],
    "harvestSeason": "初夏 5 至 7 月橘紅肉質球果成熟時採收果實；春夏採摘鮮葉",
    "terroir": "全島平野、低海拔向陽開闊地、河堤、休耕地及次生林邊緣",
    "region": "全島平野與山林",
    "folkApplication": "全株多用途台灣本草與楮實子補腎明目茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "芒種",
    "commonNames": [
      "鹿仔樹",
      "楮樹",
      "奶樹",
      "造紙樹",
      "楮實子"
    ],
    "category": "補虛藥 (補陰)",
    "nature": "涼",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "微苦",
      "涼"
    ],
    "channels": [
      "肝",
      "腎",
      "脾"
    ],
    "efficacy": "果實（楮實子）補腎滋陰、強筋健骨、明目清肝、利水消腫；嫩葉清熱利尿、涼血止血。",
    "contraindications": "脾胃極度虛弱、容易泄瀉不化者，服用果實劑量宜循序漸進。",
    "usage": "楮實子 6-12g 水煎服；嫩葉 30-50g 可煎水外洗皮膚濕疹癢痛。",
    "taiwanHeritage": "「南島語族起源於台灣」的活化石植物證人！構樹皮是南島先民敲打製作樹皮布 (Tapa) 的神聖原料。早期台灣農民養水鹿必採其多汁嫩葉（故名鹿仔樹），而其紅艷果實「楮實子」則是古籍中珍貴的補腎清肝良品。",
    "thumbnailUrl": "/images/herbs/herb_55.svg",
    "tags": [
      "南島樹皮布",
      "鹿仔樹",
      "楮實子",
      "補腎明目",
      "台灣原生次生林"
    ],
    "status": "published"
  },
  {
    "id": 56,
    "name": "刺五加",
    "scientificName": "Eleutherococcus trifoliatus (L.) S.Y. Hu",
    "pinyin": "Cì Wǔ Jiā",
    "dialectNames": [
      {
        "dialect": "俗稱",
        "name": "白簕 (Bái-lè)"
      },
      {
        "dialect": "台語",
        "name": "三加皮 (Sam-ka-phuê)"
      }
    ],
    "family": "五加科 (Araliaceae) 五加屬",
    "partsUsed": "根皮、莖枝及嫩葉",
    "activeCompounds": [
      "刺五加苷 (Eleutherosides)",
      "異貝殼杉烯酸",
      "金絲桃苷",
      "多醣體"
    ],
    "harvestSeason": "秋冬季採挖老根與粗莖，切片曬乾；春季採摘嫩梢作野菜",
    "terroir": "花東縱谷、花蓮玉里、台東延平山區中低海拔林緣與原住民獵徑邊",
    "region": "花東原鄉 (花蓮吉安/太魯閣/台東)",
    "folkApplication": "原住民山林長征元氣草與強筋骨三加皮茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "大雪",
    "commonNames": [
      "白簕",
      "三葉五加",
      "山加皮",
      "三加皮",
      "刺三加"
    ],
    "category": "食藥同源補益",
    "nature": "微溫",
    "taste": [
      "辛",
      "苦"
    ],
    "properties": [
      "辛",
      "苦",
      "微溫"
    ],
    "channels": [
      "脾",
      "腎",
      "心"
    ],
    "efficacy": "益氣健脾、補腎安神、祛風除濕、舒筋活絡。能提升耐力抗疲勞、強健筋骨腰膝無力。",
    "contraindications": "陰虛火旺、實熱咽痛或高血壓危象患者慎用。",
    "usage": "乾燥根莖 15-30g，水煎服或浸酒；嫩葉可熱炒或烘製成元氣養生茶。",
    "taiwanHeritage": "台灣本土原生的珍貴五加科草本！花東布農族與阿美族獵人在登高攀登中央山脈狩獵時，常隨手折下枝條咀嚼，能迅速恢復體力抗衡高山低溫與疲乏，民間讚譽其為「山林裡的綠色元氣引擎」。",
    "thumbnailUrl": "/images/herbs/herb_56.svg",
    "tags": [
      "白簕",
      "刺三加",
      "益氣抗疲勞",
      "強筋健骨",
      "原住民精力草"
    ],
    "status": "published"
  },
  {
    "id": 57,
    "name": "廣防風",
    "scientificName": "Epimeredi indicus (L.) Rothm.",
    "pinyin": "Guǎng Fáng Fēng",
    "dialectNames": [
      {
        "dialect": "俗稱",
        "name": "臭蘇 (Tshàu-soo)"
      },
      {
        "dialect": "俗稱",
        "name": "防風草 (Hông-hong-tsháu)"
      }
    ],
    "family": "唇形科 (Lamiaceae) 鉤粉草屬",
    "partsUsed": "全草",
    "activeCompounds": [
      "防風草內酯 (Ovatodiolide)",
      "廣藿香酮 (Pogostone)",
      "倍半萜",
      "揮發油"
    ],
    "harvestSeason": "夏秋季開淡紫輪傘花序時割取地上全草，洗淨切段陰乾",
    "terroir": "高雄旗山、杉林、美濃丘陵、屏東萬巒溪畔乾燥向陽荒地",
    "region": "南部 (六堆屏東/高樹/恆春半島)",
    "folkApplication": "南部傳統青草茶調香與理氣辟穢要藥",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立夏",
    "commonNames": [
      "防風草",
      "臭蘇",
      "落土成金",
      "客庄防風",
      "鉤粉草"
    ],
    "category": "辛溫解表藥",
    "nature": "微溫",
    "taste": [
      "辛",
      "微苦"
    ],
    "properties": [
      "辛",
      "微苦",
      "微溫"
    ],
    "channels": [
      "肺",
      "脾",
      "胃"
    ],
    "efficacy": "祛風解表、理氣止痛、健脾消食、燥濕解毒。善治感冒風寒、頭痛身重、脘腹脹痛及風濕痹痛。",
    "contraindications": "陰虛火旺熱病傷津者及孕婦慎用。",
    "usage": "乾草 10-20g 水煎服。在南部青草舖中常被作為青草茶調味引香的重要靈魂。",
    "taiwanHeritage": "氣味強烈芳香直竄鼻腔，初聞略帶野辛，久聞則轉為溫厚藥香，南部農民稱「臭蘇」。南部青草店熬製大鍋青草茶時，若少了這一味廣防風，整桶茶就缺少了一股能穿透鼻腔與脾胃的行氣清香。",
    "thumbnailUrl": "/images/herbs/herb_57.svg",
    "tags": [
      "廣防風",
      "南部青草靈魂",
      "祛風理氣",
      "芳香辟穢",
      "臭蘇調香"
    ],
    "status": "published"
  },
  {
    "id": 58,
    "name": "青葙",
    "scientificName": "Celosia argentea L.",
    "pinyin": "Qīng Xiāng",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "野雞冠 (Iá-ke-kuan)"
      },
      {
        "dialect": "俗稱",
        "name": "草決明 (種子俗稱)"
      }
    ],
    "family": "莧科 (Amaranthaceae) 青葙屬",
    "partsUsed": "成熟種子 (青葙子) 及全草",
    "activeCompounds": [
      "青葙子苷 (Celosian)",
      "多醣體",
      "脂肪油",
      "煙酸"
    ],
    "harvestSeason": "秋末冬初長圓柱形紅紫花穗變白、黑色種子成熟時割取花穗打下種子",
    "terroir": "嘉義民雄、台南新化休耕旱田、全台原野向陽荒埔與海堤邊",
    "region": "嘉南 (嘉南平原/古都安平/白河)",
    "folkApplication": "台灣田野紅白花穗與青葙子清肝明目茶",
    "safetyLevel": "適量調養",
    "solarTermRecommendation": "霜降",
    "commonNames": [
      "野雞冠花",
      "青葙子",
      "白青葙",
      "狗尾莧",
      "亮眼草"
    ],
    "category": "清熱解毒藥",
    "nature": "微寒",
    "taste": [
      "苦"
    ],
    "properties": [
      "苦",
      "微寒"
    ],
    "channels": [
      "肝"
    ],
    "efficacy": "清肝火、祛風熱、明目退翳。其種子（青葙子）專治肝火上炎所致之目赤腫痛、眼生翳膜及高血壓頭暈。",
    "contraindications": "青葙子具有顯著散瞳作用，青光眼患者及瞳孔散大者嚴禁服用；脾胃虛寒者慎用。",
    "usage": "種子 9-15g，慢火水煎服；全草 15-30g 水煎服或鮮草搗敷癰腫。",
    "taiwanHeritage": "秋風一起，嘉南平原的休耕農田便會染上一片如晚霞般的粉紫紅海。青葙的穗狀花序由下而上綻放，宛如小巧的粉紅羽毛毛刷。其黑亮種子在台灣民間俗稱「草決明」，是早期鄉里老中醫調治眼疾的天然靈藥。",
    "thumbnailUrl": "/images/herbs/herb_58.svg",
    "tags": [
      "青葙子",
      "清肝明目",
      "退翳靈藥",
      "秋日粉紅花海",
      "嘉南原野"
    ],
    "status": "published"
  },
  {
    "id": 59,
    "name": "烏面馬",
    "scientificName": "Plumbago zeylanica L.",
    "pinyin": "Wū Miàn Mǎ",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "烏面馬 (Oo-bīn-bé)"
      },
      {
        "dialect": "俗稱",
        "name": "白花丹 (Pe̍h-hue-tan)"
      }
    ],
    "family": "藍雪科 (Plumbaginaceae) 白花丹屬",
    "partsUsed": "全草或根部",
    "activeCompounds": [
      "白花丹素 (Plumbagin)",
      "谷甾醇",
      "香草酸",
      "生物鹼"
    ],
    "harvestSeason": "全年常綠生長，以秋冬開純白小花時採收根與莖枝",
    "terroir": "恆春半島、小琉球、台東沿海向陽乾燥灌木叢與珊瑚礁岩邊緣",
    "region": "南部 (六堆屏東/高樹/恆春半島)",
    "folkApplication": "恆春半島外敷跌打散瘀與止痛古方",
    "safetyLevel": "外用為主",
    "solarTermRecommendation": "立夏",
    "commonNames": [
      "白花丹",
      "烏面馬",
      "黑面馬",
      "白雪花",
      "化武丹"
    ],
    "category": "清熱解毒藥",
    "nature": "溫",
    "taste": [
      "辛",
      "苦"
    ],
    "properties": [
      "辛",
      "苦",
      "溫"
    ],
    "channels": [
      "肝",
      "脾"
    ],
    "efficacy": "祛風除濕、活血散瘀、解毒消腫、止痛。民間常用於跌打損傷、風濕關節痛及毒蛇咬傷。",
    "contraindications": "具顯著毒性與強烈皮膚刺激性，敷貼皮膚過久會起泡發黑（故名烏面馬）！孕婦嚴禁內服與外敷。",
    "usage": "以外用為主：鮮葉數片搗爛加酒少許外敷痛處（敷貼時間不得超過 15-20 分鐘以防起泡）。內服需由專業中醫師審慎開方。",
    "taiwanHeritage": "開著純潔無瑕白雪般花朵，性情卻猛烈無比！民間傳說若將其鮮葉敷在皮膚上過久，皮膚會泛黑宛若染墨，故戲稱「烏面馬」。在醫療不便的早年恆春半島，它是武術師傅行囊中不可或缺的跌打重傷消腫秘藥。",
    "thumbnailUrl": "/images/herbs/herb_59.svg",
    "tags": [
      "烏面馬",
      "白花丹",
      "活血散瘀",
      "跌打外敷",
      "恆春半島特產"
    ],
    "status": "published"
  },
  {
    "id": 60,
    "name": "龍葵",
    "scientificName": "Solanum nigrum L.",
    "pinyin": "Lóng Kuí",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "烏甜仔菜 (Oo-tinn-á-tshài)"
      },
      {
        "dialect": "台語",
        "name": "黑球仔 (Oo-kiû-á)"
      },
      {
        "dialect": "客語",
        "name": "黑甜菜 (Hed-tiām-coi)"
      }
    ],
    "family": "茄科 (Solanaceae) 茄屬",
    "partsUsed": "嫩葉、全草與成熟紫黑果實",
    "activeCompounds": [
      "龍葵鹼 (Solanine / 熟果與煮熟後含量大降)",
      "澳洲茄鹼",
      "維生素 C",
      "胡蘿蔔素"
    ],
    "harvestSeason": "冬春多雨季節農田休耕時採摘鮮嫩菜梢；夏秋果實變黑時摘食熟果",
    "terroir": "全島平野農田、菜園角落、休耕田、春雨過後水氣充沛的向陽沃土",
    "region": "全島平野與山林",
    "folkApplication": "農村雨後最經典鮮採烏甜仔菜鹹粥",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "雨水",
    "commonNames": [
      "烏甜仔菜",
      "黑甜仔菜",
      "黑球仔",
      "水茄",
      "天泡草"
    ],
    "category": "清熱解毒藥",
    "nature": "寒",
    "taste": [
      "苦",
      "微甘"
    ],
    "properties": [
      "苦",
      "微甘",
      "寒"
    ],
    "channels": [
      "肺",
      "肝",
      "胃"
    ],
    "efficacy": "清熱解毒、活血消腫、利尿通淋、散瘀結。對疔瘡腫毒、急性扁桃體炎、泌尿系感染及水腫有良好療效。",
    "contraindications": "未成熟之青綠色果實含較多生物鹼，切勿生食；嫩葉採摘後務必滾水川燙或煮熟食用以策安全；脾胃虛寒者慎用。",
    "usage": "採摘嫩芽洗淨，與小魚乾、白米慢火滾煮成「烏甜仔菜鹹糜」；乾草 15-30g 水煎服。",
    "taiwanHeritage": "「春雨過後，田埂飄香。」全台灣農村人最魂牽夢縈的野菜之王！幼時在田埂邊摘一顆烏黑透亮的熟果含入口中，汁水迸發清甜；媽媽採一把嫩芽，簡單丟入滾沸白米粥中煮鹹糜，微苦隨即化為無窮甘甜，百吃不厭。",
    "thumbnailUrl": "/images/herbs/herb_60.svg",
    "tags": [
      "烏甜仔菜",
      "春雨野菜",
      "清熱解毒",
      "童年記憶",
      "鹹糜風味"
    ],
    "status": "published"
  },
  {
    "id": 61,
    "name": "刺莧",
    "scientificName": "Amaranthus spinosus L.",
    "pinyin": "Cì Xiàn",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "刺莧 (Tshì-hīng)"
      },
      {
        "dialect": "台語",
        "name": "刺莧頭 (Tshì-hīng-thâu)"
      },
      {
        "dialect": "客語",
        "name": "竻莧菜 (Leg-hien-coi)"
      }
    ],
    "family": "莧科 (Amaranthaceae) 莧屬",
    "partsUsed": "肥大地下老根 (刺莧頭) 及全草",
    "activeCompounds": [
      "刺莧甾醇",
      "甜菜鹼",
      "蘆丁",
      "高有機鉀鹽"
    ],
    "harvestSeason": "秋末冬初掘取木質化老根（刺莧頭）洗淨切片曬乾",
    "terroir": "全島平原荒埔、休耕旱田、魚塭邊坡及農舍圍牆周邊向陽地",
    "region": "全島平野與山林",
    "folkApplication": "台灣傳統刺莧頭燉排骨利濕健胃湯",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立冬",
    "commonNames": [
      "刺莧",
      "野莧菜",
      "刺莧頭",
      "刺刺草",
      "竻莧"
    ],
    "category": "利水滲濕藥",
    "nature": "涼",
    "taste": [
      "甘",
      "淡"
    ],
    "properties": [
      "甘",
      "淡",
      "涼"
    ],
    "channels": [
      "大腸",
      "胃"
    ],
    "efficacy": "清熱利濕、涼血解毒、利尿消腫、健胃消疳。其根部善除下焦濕熱、解淋濁白帶，並能健運脾胃。",
    "contraindications": "脾胃虛寒泄瀉不渴者慎用；全株莖節具銳刺，採挖時宜小心穿戴防刺手套。",
    "usage": "刺莧頭乾品 30-60g，配紅棗、枸杞慢火燉排骨或老母雞，湯清甘甜；全草 15-30g 水煎服。",
    "taiwanHeritage": "「刺莧頭燉排骨，開脾利濕勝仙丹。」雖然枝梗上長滿防禦硬刺讓人不敢親近，但識貨的台灣農村長輩卻視其根部為無上至寶。掘出洗淨切厚片，燉出來的排骨湯湯色金黃澄澈，清香解暑，能排出體內頑固濕氣。",
    "thumbnailUrl": "/images/herbs/herb_61.svg",
    "tags": [
      "刺莧頭",
      "利濕健胃",
      "燉排骨藥膳",
      "下焦清熱",
      "鄉間老方"
    ],
    "status": "published"
  },
  {
    "id": 62,
    "name": "火炭母",
    "scientificName": "Polygonum chinense L.",
    "pinyin": "Huǒ Tàn Mǔ",
    "dialectNames": [
      {
        "dialect": "客語",
        "name": "火炭星 (Fó-tan-sên)"
      },
      {
        "dialect": "客語",
        "name": "赤地利 (Cag-ti-li)"
      },
      {
        "dialect": "台語",
        "name": "冷飯藤 (Líng-pn̄g-tîn)"
      }
    ],
    "family": "蓼科 (Polygonaceae) 蓼屬",
    "partsUsed": "全草帶成熟果實",
    "activeCompounds": [
      "沒食子酸",
      "山柰酚苷",
      "白藜蘆醇 (Resveratrol)",
      "槲皮苷"
    ],
    "harvestSeason": "夏秋季開白花結出如煤炭般黑果時割取全草切段曬乾",
    "terroir": "苗栗南庄、三灣潮濕山壁、溪邊林下陰涼處及茶園周圍濕地",
    "region": "桃竹苗 (客庄丘陵/關西/南庄)",
    "folkApplication": "客庄消暑清熱赤地利解熱飲",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "處暑",
    "commonNames": [
      "火炭母草",
      "冷飯藤",
      "赤地利",
      "火炭星",
      "白飯藤"
    ],
    "category": "清熱解毒藥",
    "nature": "涼",
    "taste": [
      "酸",
      "微澀"
    ],
    "properties": [
      "酸",
      "微澀",
      "涼"
    ],
    "channels": [
      "肝",
      "脾",
      "大腸"
    ],
    "efficacy": "清熱利濕、涼血解毒、平肝明目、消食活血。善治感冒發熱、腸炎痢疾、濕疹帶下及咽喉腫痛。",
    "contraindications": "脾胃虛寒泄瀉者及孕婦慎用。",
    "usage": "乾品 15-30g，鮮草 30-60g 水煎服；成熟黑色多汁小果清甜可直接鮮食，葉汁可外敷濕疹。",
    "taiwanHeritage": "葉面中央有美麗的「V」字形紫黑斑紋，熟透的果實黑色多汁宛若燒紅木炭熄滅後的炭星，故名「火炭母」。苗栗客家人尊稱為「赤地利」，每當盛夏農忙體內鬱熱、赤痢咽痛時，客家阿婆便熬上一大鍋火炭母草茶以清涼解熱。",
    "thumbnailUrl": "/images/herbs/herb_62.svg",
    "tags": [
      "火炭母",
      "赤地利",
      "客庄消暑",
      "涼血解毒",
      "冷飯藤"
    ],
    "status": "published"
  },
  {
    "id": 63,
    "name": "台灣百合",
    "scientificName": "Lilium formosanum Wallace",
    "pinyin": "Tái Wān Bǎi Hé",
    "dialectNames": [
      {
        "dialect": "魯凱語",
        "name": "Babui"
      },
      {
        "dialect": "排灣語",
        "name": "Barekuang"
      },
      {
        "dialect": "台語",
        "name": "野百合 (Iá-pah-ha̍p)"
      }
    ],
    "family": "百合科 (Liliaceae) 百合屬",
    "partsUsed": "地下肉質鱗莖與花朵",
    "activeCompounds": [
      "百合苷 (Lilioside)",
      "秋水仙鹼微量",
      "多糖體",
      "蛋白質"
    ],
    "harvestSeason": "秋季植株地上部枯萎時掘取地下肥厚鱗莖，剝開鱗片蒸透曬乾",
    "terroir": "東北角鼻頭角懸崖、花蓮太魯閣峽谷石灰岩壁至合歡山海拔 3,000 公尺高山草原",
    "region": "全島平野與山林",
    "folkApplication": "高山原生百合潤肺止咳與清心安神羹",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "寒露",
    "commonNames": [
      "台灣百合",
      "野百合",
      "師公杓",
      "高砂百合",
      "鼓吹花"
    ],
    "category": "補虛藥 (補陰)",
    "nature": "平",
    "taste": [
      "甘",
      "微苦"
    ],
    "properties": [
      "甘",
      "微苦",
      "平"
    ],
    "channels": [
      "心",
      "肺"
    ],
    "efficacy": "潤肺止咳、清心安神、補中益氣。對肺熱燥咳、虛勞咳嗽、久病後失眠神志恍惚、心煩意亂有極佳安撫滋養功效。",
    "contraindications": "風寒咳嗽、大便溏瀉便軟者慎食生冷百合。",
    "usage": "乾燥鱗片 10-20g，加蓮子、冰糖、銀耳慢火燉煮甜羹；或水煎代茶服。",
    "taiwanHeritage": "台灣靈魂的最高象徵！垂直分布從海平面峭壁橫跨至三千公尺合歡山巔，無論海風鹽霧或高山霜雪，皆能開出純白無瑕、背帶紫紅條紋的碩大喇叭花。魯凱族視其為勇士獵人的榮耀象徵與聖潔印記，堅韌生命力見證福爾摩沙之魂。",
    "thumbnailUrl": "/images/herbs/herb_63.svg",
    "tags": [
      "台灣特有種",
      "台灣之花",
      "高潔百合",
      "潤肺安神",
      "魯凱榮耀"
    ],
    "status": "published"
  },
  {
    "id": 64,
    "name": "馬鞭草",
    "scientificName": "Verbena officinalis L.",
    "pinyin": "Mǎ Biān Cǎo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "鐵馬鞭 (Thih-bé-pian)"
      },
      {
        "dialect": "台語",
        "name": "風頸草 (Hong-kíng-tsháu)"
      }
    ],
    "family": "馬鞭草科 (Verbenaceae) 馬鞭草屬",
    "partsUsed": "全草帶細長花穗",
    "activeCompounds": [
      "馬鞭草苷 (Verbenalin)",
      "戟葉馬鞭草苷",
      "環烯醚萜類",
      "鞣質"
    ],
    "harvestSeason": "6 至 8 月細碎藍紫花序由下往上綻開時割取地上全草曬乾",
    "terroir": "全島平野、中南部鐵道兩側、溪流礫石灘與向陽草地",
    "region": "全島平野與山林",
    "folkApplication": "田野活血通經與清熱截瘧草茶",
    "safetyLevel": "適量調養",
    "solarTermRecommendation": "小暑",
    "commonNames": [
      "鐵馬鞭",
      "風頸草",
      "狗尾巴草",
      "馬鞭草",
      "野涼粉藤"
    ],
    "category": "清熱解毒藥",
    "nature": "微寒",
    "taste": [
      "苦"
    ],
    "properties": [
      "苦",
      "微寒"
    ],
    "channels": [
      "肝",
      "脾"
    ],
    "efficacy": "清熱解毒、活血散瘀、利水消腫、截瘧。專治經閉癥瘕、跌打傷痛、咽喉腫痛及濕熱黃疸水腫。",
    "contraindications": "孕婦嚴禁服用（具促進子宮收縮作用）；氣血虛弱而無瘀滯者忌服。",
    "usage": "乾品 15-30g，水煎服。外用鮮草搗爛敷疔瘡腫毒。",
    "taiwanHeritage": "其細長挺立的花穗宛若策馬之皮鞭，故稱「馬鞭草」。在西方被稱為「聖草」，在台灣民間亦被青草茶師廣泛運用於調經、活血行氣與退夏日伏熱。細緻的小花在荒野中隨風搖曳，剛柔並濟。",
    "thumbnailUrl": "/images/herbs/herb_64.svg",
    "tags": [
      "馬鞭草",
      "活血散瘀",
      "清熱利水",
      "鐵馬鞭",
      "野草生機"
    ],
    "status": "published"
  },
  {
    "id": 65,
    "name": "冇骨消",
    "scientificName": "Sambucus chinensis Lindl.",
    "pinyin": "Mǒu Gǔ Xiāo",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "冇骨消 (Phànn-kut-siau)"
      },
      {
        "dialect": "客語",
        "name": "陸英 (Liuk-yin)"
      },
      {
        "dialect": "台語",
        "name": "接骨草 (Tsiap-kut-tsháu)"
      }
    ],
    "family": "五福花科 (Adoxaceae) 接骨木屬",
    "partsUsed": "莖葉、根部與花序",
    "activeCompounds": [
      "三萜皂苷",
      "綠原酸",
      "金絲桃苷",
      "熊果酸"
    ],
    "harvestSeason": "夏秋花果繁盛期採割莖葉曬乾；秋冬採挖粗根",
    "terroir": "全島低至中海拔林道邊緣、開闊荒地、南投溪頭與阿里山林道向陽灌木叢",
    "region": "全島平野與山林",
    "folkApplication": "台灣林間第一蜜源植物與跌打接骨解瘀草",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "夏至",
    "commonNames": [
      "冇骨消",
      "接骨草",
      "陸英",
      "七葉金",
      "臭草"
    ],
    "category": "溫經止血與理氣藥",
    "nature": "平",
    "taste": [
      "甘",
      "苦"
    ],
    "properties": [
      "甘",
      "苦",
      "平"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "祛風利濕、活血散瘀、舒筋活絡、利尿消腫。民間常用於風濕痹痛、跌打損傷接骨、扭傷瘀腫及水腫腳氣。",
    "contraindications": "孕婦及體質極度虛寒者慎用。",
    "usage": "乾莖葉 15-30g 水煎服；鮮根 30-60g 燉排骨服。鮮葉搗爛加酒炒熱外敷骨折傷處散瘀。",
    "taiwanHeritage": "台灣山林裡最神奇的「蝴蝶餐廳」！其花序間夾生著無數黃橙色杯狀蜜腺，盛夏時散發濃郁蜜甜，吸引成千上萬隻斑蝶與鳳蝶狂歡起舞。莖髓鬆軟如空，台語叫「冇骨」，而民間將其視為跌打消腫、接骨續筋的第一良方。",
    "thumbnailUrl": "/images/herbs/herb_65.svg",
    "tags": [
      "台灣第一蜜源",
      "接骨草",
      "冇骨消",
      "蝴蝶植物",
      "祛風活血"
    ],
    "status": "published"
  },
  {
    "id": 66,
    "name": "桑寄生",
    "scientificName": "Taxillus chinensis (DC.) Danser",
    "pinyin": "Sāng Jì Shēng",
    "dialectNames": [
      {
        "dialect": "俗稱",
        "name": "寄生草 (Ki-sing-tsháu)"
      },
      {
        "dialect": "古名",
        "name": "廣寄生"
      }
    ],
    "family": "桑寄生科 (Loranthaceae) 鈍果寄生屬",
    "partsUsed": "帶葉的乾燥莖枝",
    "activeCompounds": [
      "萹蓄苷 (Avicularin)",
      "槲皮素",
      "齊墩果酸",
      "肌醇"
    ],
    "harvestSeason": "冬季至翌年春季採割，除去粗莖，切段曬乾或蒸後曬乾",
    "terroir": "南投名間、埔里老桑園、油茶林及樟樹高大老樹寄生枝幹上",
    "region": "中部 (彰化田尾/南投名間/埔里)",
    "folkApplication": "台灣傳統桑寄生杜仲強筋骨與安胎保養茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "冬至",
    "commonNames": [
      "桑寄生",
      "廣寄生",
      "寄生草",
      "桑上寄生",
      "老桑樹寄生"
    ],
    "category": "補虛藥 (補陰)",
    "nature": "平",
    "taste": [
      "苦",
      "甘"
    ],
    "properties": [
      "苦",
      "甘",
      "平"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "補肝腎、強筋骨、祛風濕、養血安胎。善治風濕痹痛、腰膝酸軟弱、筋骨無力、胎動不安及高血壓頭目眩暈。",
    "contraindications": "採集時必須確證寄生於桑樹上；若寄生於夾竹桃、馬桑等有毒樹種之寄生木切不可誤用！",
    "usage": "乾燥帶葉莖枝 10-15g，慢火久煎。常與紅棗、枸杞、杜仲或黑豆燉茶長期飲用。",
    "taiwanHeritage": "借宿於千年老桑樹幹枝上的「木上仙客」！鳥類吞食其黏稠甜美果實後排便於樹椏，種子便紮根寄宿於桑木吸取日月精華。台灣民間將其視為補益肝腎腰膝、安胎固元的養生極品，茶湯澄紅如琥珀，溫潤回甘。",
    "thumbnailUrl": "/images/herbs/herb_66.svg",
    "tags": [
      "桑寄生",
      "補肝腎強筋骨",
      "養血安胎",
      "名木寄生",
      "南投老桑"
    ],
    "status": "published"
  },
  {
    "id": 67,
    "name": "鴨舌草",
    "scientificName": "Monochoria vaginalis (Burm. f.) C. Presl",
    "pinyin": "Yā Shé Cǎo",
    "dialectNames": [
      {
        "dialect": "客語",
        "name": "水鴨拔 (Sui-ab-bad)"
      },
      {
        "dialect": "客語",
        "name": "福菜草"
      },
      {
        "dialect": "台語",
        "name": "鴨舌草 (Ah-tsi̍h-tsháu)"
      }
    ],
    "family": "雨久花科 (Pontederiaceae) 雨久花屬",
    "partsUsed": "全草帶淡紫藍花序",
    "activeCompounds": [
      "木犀草素苷",
      "黃酮類",
      "粗纖維",
      "維生素 C"
    ],
    "harvestSeason": "夏季水稻田除草與水草盛生時採集全草，隨採鮮用或曬乾",
    "terroir": "高雄美濃水蓮田、宜蘭冬山傳統水田、花東縱谷無毒稻田水塘",
    "region": "嘉南 (嘉南平原/古都安平/白河)",
    "folkApplication": "美濃客家水田傳統清熱解毒熱炒野菜",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "大暑",
    "commonNames": [
      "鴨舌草",
      "水鴨拔",
      "鴨仔菜",
      "雨久花",
      "鴨舌頭草"
    ],
    "category": "清熱解毒藥",
    "nature": "涼",
    "taste": [
      "苦",
      "甘"
    ],
    "properties": [
      "苦",
      "甘",
      "涼"
    ],
    "channels": [
      "肺",
      "大腸"
    ],
    "efficacy": "清熱解毒、利尿消腫、止咳平喘。對暴熱口渴、咽喉炎、痢疾腸炎、水腫尿赤及牙齦腫痛有效。",
    "contraindications": "脾胃虛寒體弱者慎用；採集時需確保水田無農藥除草劑噴灑殘留。",
    "usage": "鮮嫩葉 100-150g 蒜蓉熱炒或滾湯；乾品 15-30g 水煎服。",
    "taiwanHeritage": "曾是美濃客家庄插秧季節不可或缺的桌上佳餚！早期水田完全不用化學除草劑，稻叢間冒出的鴨舌草肥嫩滑脆。客家婦女彎腰採回一大竹簍，以客家豆醬旺火爆炒，口感滑嫩爽脆勝過名貴蔬菜，更是夏日極佳的天然清火良伴。",
    "thumbnailUrl": "/images/herbs/herb_67.svg",
    "tags": [
      "客家水田野菜",
      "美濃傳統",
      "鴨舌草",
      "清熱利尿",
      "雨久花科"
    ],
    "status": "published"
  },
  {
    "id": 68,
    "name": "台灣山香",
    "scientificName": "Hyptis suaveolens (L.) Poit.",
    "pinyin": "Tái Wān Shān Xiāng",
    "dialectNames": [
      {
        "dialect": "俗稱",
        "name": "狗母香 (Káu-bú-hiunn)"
      },
      {
        "dialect": "俗稱",
        "name": "香柴草 (Hiunn-tshâ-tsháu)"
      },
      {
        "dialect": "台語",
        "name": "假薄荷 (Ké-po̍h-hô)"
      }
    ],
    "family": "唇形科 (Lamiaceae) 山香屬",
    "partsUsed": "全草及成熟小堅果 (山香子)",
    "activeCompounds": [
      "香豆素",
      "1,8-桉葉素",
      "丁香烯 (Caryophyllene)",
      "高黏液質多糖 (種子)"
    ],
    "harvestSeason": "秋末果熟時割取全草曬乾打出種子（山香子）；夏秋採割芳香莖葉",
    "terroir": "台南玉井、楠西果園邊界、高雄燕巢泥火山荒地、屏東向陽斜坡",
    "region": "南部 (六堆屏東/高樹/恆春半島)",
    "folkApplication": "南部山野天然松香驅風辟邪與山香子消暑子",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "立秋",
    "commonNames": [
      "狗母香",
      "香柴草",
      "山香",
      "假薄荷",
      "野香薷"
    ],
    "category": "辛涼解表藥",
    "nature": "平",
    "taste": [
      "辛",
      "苦"
    ],
    "properties": [
      "辛",
      "苦",
      "平"
    ],
    "channels": [
      "肺",
      "胃"
    ],
    "efficacy": "疏風解表、行氣化濕、解毒消腫、健脾消積。其種子浸水後膨脹如山粉圓，能清熱潤腸潤喉。",
    "contraindications": "體質陰虛津虧、乾咳無痰者慎服；氣味強烈，孕婦宜適量。",
    "usage": "乾草 10-15g 煮水代茶，芳香醒腦；種子 5-10g 泡開水兌蜂蜜檸檬飲用（清涼消暑）。",
    "taiwanHeritage": "南部山區野外最具辨識度的強烈香草！走過草叢衣角輕擦，便散發出一股融合了松香、樟腦與薄荷的霸氣野香。其種子泡水後迅速膨脹帶有一圈半透明晶瑩膠質，與愛玉、山粉圓並列為南部消暑奇珍。",
    "thumbnailUrl": "/images/herbs/herb_68.svg",
    "tags": [
      "狗母香",
      "松香芬芳",
      "南部荒野",
      "山香子消暑",
      "行氣辟穢"
    ],
    "status": "published"
  },
  {
    "id": 69,
    "name": "一枝香",
    "scientificName": "Cyanthillium cinereum (L.) H. Rob.",
    "pinyin": "Yī Zhī Xiāng",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "一枝香 (Tsi̍t-ki-hiunn)"
      },
      {
        "dialect": "台語",
        "name": "傷寒草 (Siong-hân-tsháu)"
      },
      {
        "dialect": "客語",
        "name": "夜香牛 (Ia-hiong-ngiu)"
      }
    ],
    "family": "菊科 (Asteraceae) 夜香牛屬",
    "partsUsed": "全草帶紫花序",
    "activeCompounds": [
      "刺五加苷",
      "木犀草素",
      "大心菊素",
      "琥珀酸"
    ],
    "harvestSeason": "春夏兩季開微細紫紅小花頭時割取全草曬乾",
    "terroir": "全島平原、果園邊坡、中南部路邊荒地、廟宇磚縫與向陽沙質草地",
    "region": "全島平野與山林",
    "folkApplication": "青草巷小兒傷寒發熱與安神鎮驚解熱茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "小雪",
    "commonNames": [
      "一枝香",
      "傷寒草",
      "夜香牛",
      "大尾雀",
      "紫花地丁近緣"
    ],
    "category": "辛涼解表藥",
    "nature": "涼",
    "taste": [
      "微苦",
      "辛"
    ],
    "properties": [
      "微苦",
      "辛",
      "涼"
    ],
    "channels": [
      "肺",
      "肝"
    ],
    "efficacy": "疏風散熱、清熱解毒、安神鎮驚、消腫止痛。專治外感風熱發熱、小兒驚熱、頭痛咳嗽、痢疾腹痛及目赤腫痛。",
    "contraindications": "體質虛寒、容易畏寒怯冷者不宜過量多飲。",
    "usage": "乾品 15-30g，鮮草 30-60g，水煎代茶飲；鮮草搗爛敷疔瘡腫毒。",
    "taiwanHeritage": "「一枝香草插路旁，小兒傷寒神效良。」株型秀麗直立，頂端綴著無數星點般的紫紅小花，宛如一把點燃的芬芳清香。萬華西昌街老茶師若遇長輩著急詢問小孩受風熱夜啼發燒，抓上一把「一枝香」慢火煎湯，往往是一帖令人安心的民間守護之草。",
    "thumbnailUrl": "/images/herbs/herb_69.svg",
    "tags": [
      "一枝香",
      "傷寒草",
      "小兒清熱",
      "安神退火",
      "田野紫花"
    ],
    "status": "published"
  },
  {
    "id": 70,
    "name": "海金沙",
    "scientificName": "Lygodium japonicum (Thunb.) Sw.",
    "pinyin": "Hǎi Jīn Shā",
    "dialectNames": [
      {
        "dialect": "台語",
        "name": "鐵線藤 (Thih-suànn-tîn)"
      },
      {
        "dialect": "台語",
        "name": "金沙蕨 (Kim-sa-jua̍h)"
      },
      {
        "dialect": "客語",
        "name": "左轉藤 (Zo-zon-tin)"
      }
    ],
    "family": "海金沙科 (Lygodiaceae) 海金沙屬",
    "partsUsed": "成熟孢子 (海金沙) 及乾燥全草 (海金沙草)",
    "activeCompounds": [
      "海金沙素 (Lygodin)",
      "脂肪油",
      "黃酮類",
      "甾醇類"
    ],
    "harvestSeason": "秋季 9 至 11 月孢子成熟時割取葉軸，曬乾後輕輕敲打抖落金黃細粉（海金沙）",
    "terroir": "全島平野與低海拔向陽灌木叢、竹林邊緣、紅壤丘陵坡地",
    "region": "全島平野與山林",
    "folkApplication": "台灣山野清熱通淋排石金沙仙茶",
    "safetyLevel": "溫和常飲",
    "solarTermRecommendation": "白露",
    "commonNames": [
      "海金沙",
      "鐵線藤",
      "金沙蕨",
      "左轉藤",
      "羅網藤"
    ],
    "category": "利水滲濕藥",
    "nature": "寒",
    "taste": [
      "甘",
      "淡"
    ],
    "properties": [
      "甘",
      "淡",
      "寒"
    ],
    "channels": [
      "膀胱",
      "小腸"
    ],
    "efficacy": "清利濕熱、通淋止痛。善治熱淋、石淋、血淋、小便澀痛、尿道感染及水腫腹脹；藤草善解咽喉腫痛與濕熱黃疸。",
    "contraindications": "腎陽虛弱、夜間多尿及體質滑精失禁者忌服；海金沙粉末極細易浮於水面，煎服時宜用布包煎。",
    "usage": "孢子粉末 6-15g（布包煎服或沖服）；全草 15-30g 水煎服。常與石韋、金錢草、車前草配伍。",
    "taiwanHeritage": "植物界的爬藤金沙奇觀！它是世界上少數具無限生長藤蔓特性的攀援蕨類，藤質堅韌如細鐵絲故稱「鐵線藤」。秋末羽葉背面密生金黃色閃爍粉末，投之火中發出劈啪金光閃爍；古早中醫以此金粉通利小便結石，如甘霖滌蕩全身濕濁。",
    "thumbnailUrl": "/images/herbs/herb_70.svg",
    "tags": [
      "海金沙",
      "通淋止痛",
      "攀援蕨類",
      "黃金孢子",
      "水道清濁"
    ],
    "status": "published"
  }
,
  // ==========================================
  // 《藥膳學》（李昭瑩・王儀絜・黃世勳 編著）藥膳常用食材與藥材典藏
  // ==========================================
  {
    "id": 71,
    "name": "白芷",
    "scientificName": "繖形科植物白芷或杭白芷",
    "pinyin": "白芷",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第15頁"
      }
    ],
    "family": "祛風止痛 (繖形科根)",
    "partsUsed": "祛風止痛 (繖形科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第15頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "白芷",
      "祛風止痛 (繖形科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "肺",
      "脾",
      "胃",
      "大腸"
    ],
    "efficacy": "解表散風，通竅。生肌止痛，燥濕止帶，消腫排膿。 頭痛、眉棱骨痛、齒痛、鼻淵、風濕痹痛、白帶過多、癰疽瘡瘍、毒蛇咬傷。",
    "cautions": "通竅止痛要藥，常搭配川芎、魚頭燉湯祛風止頭痛。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以獨支、條粗壯、體重、質硬、粉性足、香氣濃者為佳。",
    "medicinalDiet": "川芎白芷魚頭湯、當歸鯉魚湯等。",
    "sourceBook": "《藥膳學》第15頁",
    "page": 15,
    "status": "published"
  },
  {
    "id": 72,
    "name": "防風",
    "scientificName": "繖形科植物防風",
    "pinyin": "防風",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第16頁"
      }
    ],
    "family": "辛溫解表 (繖形科根)",
    "partsUsed": "辛溫解表 (繖形科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第16頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "防風",
      "辛溫解表 (繖形科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "辛"
    ],
    "channels": [
      "膀胱",
      "肝",
      "脾"
    ],
    "efficacy": "發表祛風，勝濕止痛，止痙。為風藥中之潤劑。 外感風寒、頭痛身痛、風濕痹痛、骨節酸痛、破傷風角弓反張。",
    "cautions": "祛風解表而性不燥烈，被譽為風藥之潤劑。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以條粗壯、皮細而緊、質柔潤、斷面菊花心黃白色者為佳。",
    "medicinalDiet": "防風玉米濃湯、防風粥等。",
    "sourceBook": "《藥膳學》第16頁",
    "page": 16,
    "status": "published"
  },
  {
    "id": 73,
    "name": "荊芥",
    "scientificName": "唇形科植物荊芥",
    "pinyin": "荊芥",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第16頁"
      }
    ],
    "family": "辛溫解表 (唇形科地上部/花穗)",
    "partsUsed": "辛溫解表 (唇形科地上部/花穗)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第16頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "荊芥",
      "辛溫解表 (唇形科地上部/花穗)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "肺",
      "肝"
    ],
    "efficacy": "解表散風，透疹，消瘡止血。 感冒發熱、頭痛、麻疹透發不暢、風疹瘙癢、瘡瘍初起、吐血衄血、便血崩漏。",
    "cautions": "生用發汗透疹消瘡；炒炭後具苦澀收斂之性，引血歸經止血。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以淡黃綠色、穗長而花密、香氣濃者為佳。",
    "medicinalDiet": "荊芥拌黃瓜、涼拌荊芥等。",
    "sourceBook": "《藥膳學》第16頁",
    "page": 16,
    "status": "published"
  },
  {
    "id": 74,
    "name": "生薑",
    "scientificName": "薑科植物薑的新鮮根莖",
    "pinyin": "生薑",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第16頁"
      }
    ],
    "family": "祛寒溫中 (薑科根莖)",
    "partsUsed": "祛寒溫中 (薑科根莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第16頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "生薑",
      "祛寒溫中 (薑科根莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "肺",
      "脾",
      "胃"
    ],
    "efficacy": "發汗解表，溫中止嘔，溫肺止咳，解魚蟹毒。 風寒感冒、惡寒發熱、胃寒嘔吐（嘔家聖藥）、風寒咳嗽、解半夏天南星及魚蟹毒。",
    "cautions": "素有「嘔家聖藥」之稱，藥膳解表去腥暖胃最常用食材。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以肥壯、新鮮、薑絲細密、香氣辛辣者為佳；藥用以老薑為佳。",
    "medicinalDiet": "當歸生薑羊肉湯、生薑紅糖茶、薑母鴨等。",
    "sourceBook": "《藥膳學》第16頁",
    "page": 16,
    "status": "published"
  },
  {
    "id": 75,
    "name": "蒼耳子",
    "scientificName": "菊科植物蒼耳",
    "pinyin": "蒼耳子",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第17頁"
      }
    ],
    "family": "辛溫解表/通鼻竅 (菊科果實)",
    "partsUsed": "辛溫解表/通鼻竅 (菊科果實)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第17頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "蒼耳子",
      "辛溫解表/通鼻竅 (菊科果實)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "苦",
      "辛"
    ],
    "channels": [
      "肺"
    ],
    "efficacy": "散風除濕，通鼻竅，止痛，殺蟲。 鼻淵頭痛（鼻竇炎）、風寒頭痛、風濕痹痛、皮膚風疹瘙癢。",
    "cautions": "通鼻竅要藥，生品有小毒，藥膳多炒用並控制劑量。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以粒大、飽滿、色黃綠、刺堅硬者為佳。",
    "medicinalDiet": "蒼耳子茶、辛夷蒼耳魚頭湯（需遵醫囑適量）。",
    "sourceBook": "《藥膳學》第17頁",
    "page": 17,
    "status": "published"
  },
  {
    "id": 76,
    "name": "蒼朮",
    "scientificName": "菊科植物茅蒼朮或北蒼朮",
    "pinyin": "蒼朮",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第17頁"
      }
    ],
    "family": "燥濕健脾 (菊科根莖)",
    "partsUsed": "燥濕健脾 (菊科根莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第17頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "蒼朮",
      "燥濕健脾 (菊科根莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "苦",
      "辛"
    ],
    "channels": [
      "脾",
      "胃",
      "肝"
    ],
    "efficacy": "燥濕健脾，祛風散寒，明目。 濕阻中焦、脘腹脹滿、泄瀉水腫、風濕痹痛、腳氣痿軟、夜盲昏蒙。",
    "cautions": "燥濕健脾第一要藥，兼具明目之功。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以斷面硃砂點多、芳香濃烈者（茅蒼朮）為佳。",
    "medicinalDiet": "蒼朮豬肝湯、蒼朮茯苓粥等。",
    "sourceBook": "《藥膳學》第17頁",
    "page": 17,
    "status": "published"
  },
  {
    "id": 77,
    "name": "九層塔頭",
    "scientificName": "唇形科植物羅勒（九層塔）",
    "pinyin": "九層塔頭",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第17頁"
      }
    ],
    "family": "理氣活血/轉骨 (唇形科根)",
    "partsUsed": "理氣活血/轉骨 (唇形科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第17頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "九層塔頭",
      "理氣活血/轉骨 (唇形科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "肺",
      "脾",
      "胃",
      "大腸"
    ],
    "efficacy": "祛風利濕，散瘀止痛，消食健胃，解毒消腫。 小兒發育不良（轉骨發育）、筋骨酸痛、胃寒腹痛、跌打損傷。",
    "cautions": "臺灣民間極具代表性的轉骨發育、強健筋骨食療名方原料。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以根頭粗壯、鬚根多、氣味辛香濃郁者為佳。",
    "medicinalDiet": "九層塔頭燉排骨、九層塔頭燉土雞湯。",
    "sourceBook": "《藥膳學》第17頁",
    "page": 17,
    "status": "published"
  },
  {
    "id": 78,
    "name": "吳茱萸",
    "scientificName": "芸香科植物吳茱萸",
    "pinyin": "吳茱萸",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第18頁"
      }
    ],
    "family": "散寒止痛/降逆 (芸香科果實)",
    "partsUsed": "散寒止痛/降逆 (芸香科果實)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第18頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "吳茱萸",
      "散寒止痛/降逆 (芸香科果實)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "熱",
    "taste": [
      "苦",
      "辛"
    ],
    "channels": [
      "肝",
      "脾",
      "胃",
      "腎"
    ],
    "efficacy": "散寒止痛，降逆止嘔，助陽止瀉。 厥陰頭痛（巔頂痛）、寒疝腹痛、寒濕腳氣、經行腹痛、嘔吐吞酸、五更泄瀉。",
    "cautions": "暖肝溫胃之重藥，性熱味苦辛，藥膳中用量宜少。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以顆粒均勻、飽滿、氣味濃烈芳香者為佳。",
    "medicinalDiet": "吳茱萸粥、吳茱萸生薑粥（微量入膳）。",
    "sourceBook": "《藥膳學》第18頁",
    "page": 18,
    "status": "published"
  },
  {
    "id": 79,
    "name": "陳皮",
    "scientificName": "芸香科植物橘及其栽培變種",
    "pinyin": "陳皮",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第18頁"
      }
    ],
    "family": "理氣燥濕/化痰 (芸香科果皮)",
    "partsUsed": "理氣燥濕/化痰 (芸香科果皮)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第18頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "陳皮",
      "理氣燥濕/化痰 (芸香科果皮)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "苦",
      "辛"
    ],
    "channels": [
      "肺",
      "脾"
    ],
    "efficacy": "理氣健脾，燥濕化痰。 脘腹脹滿、食少吐瀉、咳嗽痰多、胸膈痞悶。",
    "cautions": "行氣醒脾與化痰名品，陳久者良，故名陳皮。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以皮薄、質柔、香氣濃、陳久者為佳。",
    "medicinalDiet": "陳皮牛肉湯、陳皮紅豆沙、陳皮鴨等。",
    "sourceBook": "《藥膳學》第18頁",
    "page": 18,
    "status": "published"
  },
  {
    "id": 80,
    "name": "紅花",
    "scientificName": "菊科植物紅花",
    "pinyin": "紅花",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第18頁"
      }
    ],
    "family": "活血通經 (菊科花)",
    "partsUsed": "活血通經 (菊科花)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第18頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "紅花",
      "活血通經 (菊科花)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "心",
      "肝"
    ],
    "efficacy": "活血通經，散瘀止痛。 經閉痛經、產後瘀阻腹痛、胸痹心痛、瘀血腫痛、跌打損傷。",
    "cautions": "少量活血養血，多量破血散瘀；孕婦忌用。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以花冠長、色紅黃、鮮艷、無枝葉雜質者為佳。",
    "medicinalDiet": "紅花炒蝦仁、桑椹紅花飲等。",
    "sourceBook": "《藥膳學》第18頁",
    "page": 18,
    "status": "published"
  },
  {
    "id": 81,
    "name": "川芎",
    "scientificName": "繖形科植物川芎",
    "pinyin": "川芎",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第19頁"
      }
    ],
    "family": "活血行氣 (繖形科根莖)",
    "partsUsed": "活血行氣 (繖形科根莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第19頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "川芎",
      "活血行氣 (繖形科根莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "肝",
      "膽",
      "心包"
    ],
    "efficacy": "活血行氣，祛風止痛。為血中之氣藥。 頭痛（偏頭痛/風寒頭痛）、胸脅刺痛、月經不調、經閉痛經、產後瘀血、風濕痹痛。",
    "cautions": "上行頭目、下行血海，被稱為「血中之氣藥」，頭痛要藥。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大、結實、黃褐色、油潤、香氣濃郁者為佳。",
    "medicinalDiet": "川芎白芷燉魚頭、川芎當歸燉雞湯等。",
    "sourceBook": "《藥膳學》第19頁",
    "page": 19,
    "status": "published"
  },
  {
    "id": 82,
    "name": "半夏",
    "scientificName": "天南星科植物半夏",
    "pinyin": "半夏",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第19頁"
      }
    ],
    "family": "燥濕化痰/降逆 (天南星科塊莖)",
    "partsUsed": "燥濕化痰/降逆 (天南星科塊莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第19頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "半夏",
      "燥濕化痰/降逆 (天南星科塊莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "脾",
      "胃",
      "肺"
    ],
    "efficacy": "燥濕化痰，降逆止嘔，消痞散結。 濕痰寒痰、咳喘痰多、痰飲眩悸、胃氣上逆之嘔吐痞滿。",
    "cautions": "化痰降逆要藥，生品有毒刺激咽喉，藥膳必須使用法半夏或薑半夏。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大、色白、粉性足、質堅實者為佳。",
    "medicinalDiet": "薑半夏瘦肉湯（嚴格法製後入藥膳）。",
    "sourceBook": "《藥膳學》第19頁",
    "page": 19,
    "status": "published"
  },
  {
    "id": 83,
    "name": "大棗",
    "scientificName": "鼠李科植物棗",
    "pinyin": "大棗",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第19頁"
      }
    ],
    "family": "補氣養血 (鼠李科果實)",
    "partsUsed": "補氣養血 (鼠李科果實)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第19頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "大棗",
      "補氣養血 (鼠李科果實)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "胃",
      "心"
    ],
    "efficacy": "補中益氣，養血安神，緩和藥性。 脾虛食少、乏力便溏、婦人臟躁、神志不安、心悸失眠、調和百藥。",
    "cautions": "藥膳最廣泛應用的甜味調和與補血益氣上品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大、肉厚核小、色紫紅、味甘甜者為佳。",
    "medicinalDiet": "紅棗枸杞燉雞、紅棗銀耳蓮子湯、紅棗粥等。",
    "sourceBook": "《藥膳學》第19頁",
    "page": 19,
    "status": "published"
  },
  {
    "id": 84,
    "name": "黃精",
    "scientificName": "百合科植物滇黃精、黃精或多花黃精",
    "pinyin": "黃精",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第20頁"
      }
    ],
    "family": "補氣養陰 (百合科根莖)",
    "partsUsed": "補氣養陰 (百合科根莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第20頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "黃精",
      "補氣養陰 (百合科根莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "肺",
      "腎"
    ],
    "efficacy": "補氣養陰，健脾潤肺，益腎填精。 脾胃氣虛、體倦乏力、胃陰不足、口乾食少、肺虛燥咳、精血不足、鬚髮早白。",
    "cautions": "氣陰雙補、平補不燥之仙家養生上品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以肉質肥厚、斷面黃白色、角質樣、味甘甜者為佳（多九蒸九曬）。",
    "medicinalDiet": "黃精燉烏骨雞、黃精枸杞茶、黃精粥等。",
    "sourceBook": "《藥膳學》第20頁",
    "page": 20,
    "status": "published"
  },
  {
    "id": 85,
    "name": "冬蟲夏草",
    "scientificName": "麥角菌科真菌冬蟲夏草菌寄生在蝙蝠蛾科昆蟲幼蟲上的子座及幼蟲屍體的乾燥複合體",
    "pinyin": "冬蟲夏草",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第20頁"
      }
    ],
    "family": "補腎益肺/止血 (麥角菌科真菌與幼蟲)",
    "partsUsed": "補腎益肺/止血 (麥角菌科真菌與幼蟲)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第20頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "冬蟲夏草",
      "補腎益肺/止血 (麥角菌科真菌與幼蟲)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "肺",
      "腎"
    ],
    "efficacy": "補腎益肺，止血化痰，秘精益氣。 腎虛精虧、陽痿遺精、腰膝酸痛、久咳虛喘、勞嗽痰血、病後虛弱。",
    "cautions": "兼顧肺腎兩經、陰陽雙補之珍貴食療名藥。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以蟲體飽滿肥大、色黃亮、內部充實、子座短者為上品。",
    "medicinalDiet": "蟲草肉蓯蓉燉羊肉、蟲草鴨湯、蟲草燉土雞湯。",
    "sourceBook": "《藥膳學》第20頁",
    "page": 20,
    "status": "published"
  },
  {
    "id": 86,
    "name": "人參",
    "scientificName": "五加科植物人參",
    "pinyin": "人參",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第21頁"
      }
    ],
    "family": "大補元氣 (五加科根)",
    "partsUsed": "大補元氣 (五加科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第21頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "人參",
      "大補元氣 (五加科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "苦"
    ],
    "channels": [
      "脾",
      "肺",
      "心",
      "腎"
    ],
    "efficacy": "大補元氣，復脈固脫，補脾益肺，生津養血，安神益智。 元氣虛脫、肢冷脈微、脾虛食少、肺虛喘咳、津傷口渴、內熱消渴、驚悸失眠、血虛萎黃。",
    "cautions": "百草之王，大補元氣要藥。服參期間不宜食蘿蔔、飲濃茶。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以蘆長、皮細、紋緊、體實、珍珠點顯著者為佳。",
    "medicinalDiet": "人參燉土雞、參棗烏雞湯、人參酒等。",
    "sourceBook": "《藥膳學》第21頁",
    "page": 21,
    "status": "published"
  },
  {
    "id": 87,
    "name": "何首烏",
    "scientificName": "蓼科植物何首烏",
    "pinyin": "何首烏",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第21頁"
      }
    ],
    "family": "補肝腎/益精血 (蓼科塊根)",
    "partsUsed": "補肝腎/益精血 (蓼科塊根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第21頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "何首烏",
      "補肝腎/益精血 (蓼科塊根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "苦",
      "澀"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "補肝腎，益精血，烏鬚髮，強筋骨，化濁降脂。 精血虧虛、頭暈目眩、鬚髮早白、腰膝酸軟、遺精崩帶、高血脂症。",
    "cautions": "製首烏滋補肝腎、烏黑鬚髮；生首烏通便解毒。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大、體重、質堅、粉性足、斷面雲錦花紋明顯者為佳。",
    "medicinalDiet": "首烏燉排骨、首烏雞蛋湯、首烏芝麻糊。",
    "sourceBook": "《藥膳學》第21頁",
    "page": 21,
    "status": "published"
  },
  {
    "id": 88,
    "name": "續斷",
    "scientificName": "川續斷科植物川續斷",
    "pinyin": "續斷",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第21頁"
      }
    ],
    "family": "補肝腎/續筋骨 (川續斷科根)",
    "partsUsed": "補肝腎/續筋骨 (川續斷科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第21頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "續斷",
      "補肝腎/續筋骨 (川續斷科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "苦",
      "辛"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "補肝腎，強筋骨，續折傷，止崩漏，安胎。 腰膝酸軟、風濕痹痛、跌撲損傷、金瘡骨折、胎漏下血、胎動不安。",
    "cautions": "能續筋骨、安胎元，傷科骨科與婦科常用之強筋骨藥材。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以條粗、質堅、斷面綠褐色、無枯心者為佳。",
    "medicinalDiet": "續斷杜仲煲豬尾湯、續斷燉排骨。",
    "sourceBook": "《藥膳學》第21頁",
    "page": 21,
    "status": "published"
  },
  {
    "id": 89,
    "name": "肉蓯蓉",
    "scientificName": "列當科植物肉蓯蓉或管花肉蓯蓉",
    "pinyin": "肉蓯蓉",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第22頁"
      }
    ],
    "family": "補腎助陽/潤腸 (列當科帶鱗葉肉質莖)",
    "partsUsed": "補腎助陽/潤腸 (列當科帶鱗葉肉質莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第22頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "肉蓯蓉",
      "補腎助陽/潤腸 (列當科帶鱗葉肉質莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "鹹"
    ],
    "channels": [
      "腎",
      "大腸"
    ],
    "efficacy": "補腎助陽，益精血，潤腸通便。溫而不燥，補而不峻。 腎陽虛衰、陽痿不孕、腰膝冷痛、筋骨無力、腸燥便秘。",
    "cautions": "有「沙漠人參」之稱，溫潤滋補，老人腸燥便秘兼腎虛者尤宜。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以條粗長、密被鱗片、色棕褐、油潤柔軟者為佳。",
    "medicinalDiet": "肉蓯蓉羊肉湯、肉蓯蓉泡酒、蓯蓉燉牛尾。",
    "sourceBook": "《藥膳學》第22頁",
    "page": 22,
    "status": "published"
  },
  {
    "id": 90,
    "name": "白朮",
    "scientificName": "菊科植物白朮",
    "pinyin": "白朮",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第22頁"
      }
    ],
    "family": "健脾益氣/燥濕 (菊科根莖)",
    "partsUsed": "健脾益氣/燥濕 (菊科根莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第22頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "白朮",
      "健脾益氣/燥濕 (菊科根莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "苦"
    ],
    "channels": [
      "脾",
      "胃"
    ],
    "efficacy": "健脾益氣，燥濕利水，止汗，安胎。 脾氣虛弱、食少倦怠、脘痞泄瀉、痰飲水腫、自汗、胎動不安。",
    "cautions": "補脾燥濕名藥，與茯苓、人參配伍為四君子健脾基礎。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以身乾個大、皮細色黃內白、斷面平坦有雲頭、質堅實者為佳。",
    "medicinalDiet": "白朮茯苓粥、四君子燉排骨、補中益氣糕。",
    "sourceBook": "《藥膳學》第22頁",
    "page": 22,
    "status": "published"
  },
  {
    "id": 91,
    "name": "當歸",
    "scientificName": "繖形科植物當歸或日本大和當歸",
    "pinyin": "當歸",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第23頁"
      }
    ],
    "family": "補血活血/調經 (繖形科根)",
    "partsUsed": "補血活血/調經 (繖形科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第23頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "當歸",
      "補血活血/調經 (繖形科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "辛"
    ],
    "channels": [
      "心",
      "肝",
      "脾"
    ],
    "efficacy": "補血活血，調經止痛，潤腸通便。 血虛萎黃、眩暈心悸、月經不調、經閉痛經、虛寒腹痛、腸燥便秘、風濕痹痛、跌撲損傷。",
    "cautions": "婦科調經聖藥，亦為藥膳滋補最普及之血分首選。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以身乾枝大、根頭肥大、體長腿少、油潤、肉質飽滿、香氣濃郁者為佳。",
    "medicinalDiet": "當歸生薑羊肉湯、當歸燉烏骨雞、參歸燉雞等。",
    "sourceBook": "《藥膳學》第23頁",
    "page": 23,
    "status": "published"
  },
  {
    "id": 92,
    "name": "杜仲",
    "scientificName": "杜仲科植物杜仲",
    "pinyin": "杜仲",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第23頁"
      }
    ],
    "family": "補肝腎/強筋骨 (杜仲科樹皮)",
    "partsUsed": "補肝腎/強筋骨 (杜仲科樹皮)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第23頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "杜仲",
      "補肝腎/強筋骨 (杜仲科樹皮)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "補肝腎，強筋骨，安胎，降血壓。 腰膝酸痛、筋骨痿軟、小便餘瀝、陰下濕癢、胎漏胎動不安、高血壓病。",
    "cautions": "強健腰脊首選，折斷具豐富彈性膠絲；與豬腰配伍是腰膝酸痛名方。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以張大完整無破、皮細肉厚、折斷白絲稠密、外面黃棕、內面黑褐光滑者為佳。",
    "medicinalDiet": "杜仲燉豬腰、杜仲寄生茶、杜仲茶。",
    "sourceBook": "《藥膳學》第23頁",
    "page": 23,
    "status": "published"
  },
  {
    "id": 93,
    "name": "淫羊藿",
    "scientificName": "小檗科植物淫羊藿",
    "pinyin": "淫羊藿",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第24頁"
      }
    ],
    "family": "補腎壯陽/強筋骨 (小檗科地上部)",
    "partsUsed": "補腎壯陽/強筋骨 (小檗科地上部)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第24頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "淫羊藿",
      "補腎壯陽/強筋骨 (小檗科地上部)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "辛"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "補腎壯陽，強筋骨，祛風除濕。 陽痿遺精、小便淋瀝、筋骨痿軟、腰膝無力、半身不遂、風濕痹痛、四肢麻木不仁、更年期高血壓。",
    "cautions": "又名仙靈脾，壯陽祛風名藥，常用於骨質疏鬆與腰膝酸軟之膳食調養。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以梗少、葉多、色黃綠、不破碎者為佳。",
    "medicinalDiet": "豬腰杜仲淫羊藿湯、人參百歲酒等。",
    "sourceBook": "《藥膳學》第24頁",
    "page": 24,
    "status": "published"
  },
  {
    "id": 94,
    "name": "肉桂",
    "scientificName": "樟科植物肉桂",
    "pinyin": "肉桂",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第24頁"
      }
    ],
    "family": "補火助陽/引火歸元 (樟科樹皮)",
    "partsUsed": "補火助陽/引火歸元 (樟科樹皮)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第24頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "肉桂",
      "補火助陽/引火歸元 (樟科樹皮)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "熱",
    "taste": [
      "甘",
      "辛"
    ],
    "channels": [
      "腎",
      "脾",
      "心",
      "肝"
    ],
    "efficacy": "補火助陽，引火歸元，散寒止痛，溫通經脈。 命門火衰、肢冷脈微、亡陽虛脫、心腹冷痛、寒疝奔豚、虛寒吐瀉、經閉痛經。",
    "cautions": "溫補命門真火之大熱重藥，引火歸元；藥膳中常用作香料與暖胃溫中調味。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以皮厚、肉細、油性足、斷面紫紅、香氣濃烈辛甜者為佳。",
    "medicinalDiet": "肉桂蘋果茶、肉桂燉牛肉、肉桂薑母茶。",
    "sourceBook": "《藥膳學》第24頁",
    "page": 24,
    "status": "published"
  },
  {
    "id": 95,
    "name": "天麻",
    "scientificName": "蘭科植物天麻",
    "pinyin": "天麻",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第24-25頁"
      }
    ],
    "family": "息風止痙/平抑肝陽 (蘭科塊莖)",
    "partsUsed": "息風止痙/平抑肝陽 (蘭科塊莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第24-25頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "天麻",
      "息風止痙/平抑肝陽 (蘭科塊莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "肝"
    ],
    "efficacy": "息風止痙，平抑肝陽，祛風通絡。 頭痛眩暈、肢體麻木、小兒驚風、癲癇抽搐、破傷風、風濕痹痛、高血壓頭暈。",
    "cautions": "治眩暈頭痛之神品，不論寒熱虛實皆可配伍使用；與豬腦同燉為健腦名膳。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大、體重、質堅硬、半透明、斷面角質狀無空心者為佳。",
    "medicinalDiet": "天麻燉豬腦、天麻燉魚頭、川芎天麻茶等。",
    "sourceBook": "《藥膳學》第24-25頁",
    "page": 24,
    "status": "published"
  },
  {
    "id": 96,
    "name": "山茱萸",
    "scientificName": "山茱萸科植物山茱萸",
    "pinyin": "山茱萸",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第25頁"
      }
    ],
    "family": "收澀/補益肝腎 (山茱萸科果肉)",
    "partsUsed": "收澀/補益肝腎 (山茱萸科果肉)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第25頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "山茱萸",
      "收澀/補益肝腎 (山茱萸科果肉)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "酸",
      "澀"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "補益肝腎，澀精固脫。 眩暈耳鳴、腰膝酸軟、陽痿遺精、遺尿尿頻、崩漏帶下、大汗虛脫、內熱消渴。",
    "cautions": "六味地黃丸之「三補」要角，溫補肝腎而能斂汗固脫。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以無核、皮肉肥厚、色紅油潤者為佳。",
    "medicinalDiet": "山茱萸肉粥、山茱萸酒等。",
    "sourceBook": "《藥膳學》第25頁",
    "page": 25,
    "status": "published"
  },
  {
    "id": 97,
    "name": "覆盆子",
    "scientificName": "薔薇科植物掌葉覆盆子",
    "pinyin": "覆盆子",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第25頁"
      }
    ],
    "family": "固精縮尿/明目 (薔薇科果實)",
    "partsUsed": "固精縮尿/明目 (薔薇科果實)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第25頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "覆盆子",
      "固精縮尿/明目 (薔薇科果實)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "酸"
    ],
    "channels": [
      "肝",
      "腎",
      "膀胱"
    ],
    "efficacy": "補肝益腎，固精縮尿，助陽，明目。 陽痿早洩、遺精滑精、宮冷不孕、帶下清稀、尿頻遺溺、目視昏暗、鬚髮早白。",
    "cautions": "固精縮尿良藥，名「覆盆」取其服後夜尿減少、便盆可覆置之意。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大、飽滿、粒整、結實、色灰綠、無葉梗者為佳。",
    "medicinalDiet": "覆盆子果醬、薄荷覆盆子飲、香蕉覆盆子蛋餅。",
    "sourceBook": "《藥膳學》第25頁",
    "page": 25,
    "status": "published"
  },
  {
    "id": 98,
    "name": "五味子",
    "scientificName": "五味子科植物五味子或華中五味子",
    "pinyin": "五味子",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第25頁"
      }
    ],
    "family": "收斂固澀/生津寧心 (五味子科果實)",
    "partsUsed": "收斂固澀/生津寧心 (五味子科果實)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第25頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "五味子",
      "收斂固澀/生津寧心 (五味子科果實)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "酸"
    ],
    "channels": [
      "肺",
      "心",
      "腎"
    ],
    "efficacy": "澀精固氣，益氣生津，斂肺鎮咳，補腎寧心。 久嗽虛喘、夢遺滑精、遺尿尿頻、久瀉不止、自汗盜汗、津傷口渴、短氣脈虛、內熱消渴、心悸失眠。",
    "cautions": "皮肉甘酸，核中辛苦，全果都有鹹味，五味齊全；保肝收斂之要藥。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以皮肉肥厚、色紫紅、油潤、肉酸甜者為佳。",
    "medicinalDiet": "五味子茶、五味子蒸豬瘦肉、五味枸杞茶。",
    "sourceBook": "《藥膳學》第25頁",
    "page": 25,
    "status": "published"
  },
  {
    "id": 99,
    "name": "生地黃",
    "scientificName": "玄參科植物地黃",
    "pinyin": "生地黃",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第28頁"
      }
    ],
    "family": "清熱涼血/養陰 (玄參科塊根)",
    "partsUsed": "清熱涼血/養陰 (玄參科塊根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第28頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "生地黃",
      "清熱涼血/養陰 (玄參科塊根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘",
      "苦"
    ],
    "channels": [
      "心",
      "肝",
      "腎"
    ],
    "efficacy": "清熱涼血，養陰生津。（蒸製加黃酒後即成熟地黃，性微溫，主補血滋陰）。 溫熱病熱入營血、發斑發疹、骨蒸潮熱、吐血衄血、咽喉腫痛、內熱消渴。",
    "cautions": "鮮地黃清熱涼血生津；生地黃清熱養陰；熟地黃滋陰補血益精填髓。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大身圓、皮細、體軟、斷面有油光者為佳。",
    "medicinalDiet": "地黃粥、生地赤豆湯、地黃酒等。",
    "sourceBook": "《藥膳學》第28頁",
    "page": 28,
    "status": "published"
  },
  {
    "id": 100,
    "name": "牡丹皮",
    "scientificName": "毛茛科植物牡丹",
    "pinyin": "牡丹皮",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第28頁"
      }
    ],
    "family": "清熱涼血/活血散瘀 (毛茛科根皮)",
    "partsUsed": "清熱涼血/活血散瘀 (毛茛科根皮)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第28頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "牡丹皮",
      "清熱涼血/活血散瘀 (毛茛科根皮)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "苦",
      "辛"
    ],
    "channels": [
      "心",
      "肝",
      "腎"
    ],
    "efficacy": "清熱涼血，活血散瘀，退虛熱。 溫毒發斑、吐血衄血、熱伏陰分發熱、陰虛骨蒸潮熱、血滯經閉痛經、癰腫瘡瘍、跌打傷痛。",
    "cautions": "涼血而不留瘀，活血而不動血，水提取物對原發性高血壓有舒緩作用。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以條粗長、皮厚、無木心、斷面粉白色、亮銀星（丹皮酚結晶）多者為佳。",
    "medicinalDiet": "牡丹皮赤芍飲、丹皮燉豆腐等。",
    "sourceBook": "《藥膳學》第28頁",
    "page": 28,
    "status": "published"
  },
  {
    "id": 101,
    "name": "赤芍",
    "scientificName": "毛茛科植物芍藥或川赤芍",
    "pinyin": "赤芍",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第29頁"
      }
    ],
    "family": "清熱涼血/散瘀止痛 (毛茛科根)",
    "partsUsed": "清熱涼血/散瘀止痛 (毛茛科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第29頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "赤芍",
      "清熱涼血/散瘀止痛 (毛茛科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "苦"
    ],
    "channels": [
      "肝"
    ],
    "efficacy": "清熱涼血，散瘀止痛，消癰腫。 溫毒發斑、吐血衄血、血痢、目赤腫痛、肝鬱脅痛、經閉痛經、癥瘕腹痛、癰腫瘡毒、跌打損傷。",
    "cautions": "白芍偏於養血柔肝斂陰，赤芍偏於清熱涼血活血散瘀。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以根條粗長、外皮易脫落、皺紋深、斷面白色粉性足者為佳。",
    "medicinalDiet": "牡丹皮赤芍飲、赤芍花酒等。",
    "sourceBook": "《藥膳學》第29頁",
    "page": 29,
    "status": "published"
  },
  {
    "id": 102,
    "name": "黃連",
    "scientificName": "毛茛科植物黃連、三角葉黃連或雲南黃連",
    "pinyin": "黃連",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第29-30頁"
      }
    ],
    "family": "清熱燥濕/瀉火解毒 (毛茛科根莖)",
    "partsUsed": "清熱燥濕/瀉火解毒 (毛茛科根莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第29-30頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "黃連",
      "清熱燥濕/瀉火解毒 (毛茛科根莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘"
    ],
    "channels": [
      "心",
      "脾",
      "胃",
      "肝",
      "膽",
      "大腸"
    ],
    "efficacy": "清熱燥濕，瀉火解毒，清心除煩。 濕熱痞滿、嘔吐吞酸、瀉痢、黃疸、高熱神昏、心火亢盛心煩失眠、心腎不交失眠、血熱吐衄、目赤牙痛、癰腫疔瘡。",
    "cautions": "酒黃連善清上焦心火；薑黃連清胃止嘔；茱萸製黃連清肝胃不和嘔吐吞酸。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以條肥壯、連珠形（雞爪形）、質堅實、斷面紅黃色者為佳。",
    "medicinalDiet": "黃連木耳燉豬肚、黃連阿膠湯等（微量入膳）。",
    "sourceBook": "《藥膳學》第29-30頁",
    "page": 29,
    "status": "published"
  },
  {
    "id": 103,
    "name": "白及",
    "scientificName": "蘭科植物白及",
    "pinyin": "白及",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第30頁"
      }
    ],
    "family": "收斂止血/消腫生肌 (蘭科塊莖)",
    "partsUsed": "收斂止血/消腫生肌 (蘭科塊莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第30頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "白及",
      "收斂止血/消腫生肌 (蘭科塊莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘",
      "苦",
      "澀"
    ],
    "channels": [
      "肺",
      "肝",
      "胃"
    ],
    "efficacy": "補肺，收斂止血，消腫生肌，斂瘡。 肺結核咳血、咯血、胃及十二指腸潰瘍出血、吐血、外傷出血、瘡瘍腫毒、燙傷皮裂。",
    "cautions": "黏液質極豐，覆蓋潰瘍面止血生肌良藥，亦為修復胃壁之藥膳上品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以根莖肥厚、色白明亮、個大堅實、無鬚根者為佳。",
    "medicinalDiet": "白及粥、白及藕節槐花飲等。",
    "sourceBook": "《藥膳學》第30頁",
    "page": 30,
    "status": "published"
  },
  {
    "id": 104,
    "name": "丹參",
    "scientificName": "唇形科植物丹參",
    "pinyin": "丹參",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第30頁"
      }
    ],
    "family": "活血祛瘀/清心涼血 (唇形科根)",
    "partsUsed": "活血祛瘀/清心涼血 (唇形科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第30頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "丹參",
      "活血祛瘀/清心涼血 (唇形科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "苦"
    ],
    "channels": [
      "心",
      "心包",
      "肝"
    ],
    "efficacy": "活血調經，祛瘀止痛，涼血消癰，清心除煩，養血安神。古稱「一味丹參功同四物」。 月經不調、經閉痛經、癥瘕積聚、胸腹刺痛、心絞痛（冠心病）、心煩不眠、肝脾腫大。",
    "cautions": "活血化瘀而不傷正，現代心血管疾病食療極為推崇。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以質堅硬、易折斷、條粗壯、皮紅褐色、斷面紫黑有菊花狀白點者為佳。",
    "medicinalDiet": "田七丹參燉雞、丹參紅花酒、丹參粥。",
    "sourceBook": "《藥膳學》第30頁",
    "page": 30,
    "status": "published"
  },
  {
    "id": 105,
    "name": "胖大海",
    "scientificName": "梧桐科植物胖大海",
    "pinyin": "胖大海",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第31頁"
      }
    ],
    "family": "清熱潤肺/利咽通便 (梧桐科種子)",
    "partsUsed": "清熱潤肺/利咽通便 (梧桐科種子)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第31頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "胖大海",
      "清熱潤肺/利咽通便 (梧桐科種子)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "涼",
    "taste": [
      "甘",
      "淡"
    ],
    "channels": [
      "肺",
      "大腸"
    ],
    "efficacy": "清熱潤肺，利咽解毒，潤腸通便。 肺熱聲啞、乾咳無痰、咽喉腫痛、慢性咽炎、熱結便秘、頭痛目赤、牙痛。",
    "cautions": "開音開嗓第一良藥，泡沸水後體積膨大數倍如海綿狀。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大、棕色、表面皺紋細、遇水膨脹度大者為佳。",
    "medicinalDiet": "膨大海茶、冰糖燉膨大海、胖大海羅漢果飲。",
    "sourceBook": "《藥膳學》第31頁",
    "page": 31,
    "status": "published"
  },
  {
    "id": 106,
    "name": "桑白皮",
    "scientificName": "桑科植物桑",
    "pinyin": "桑白皮",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第31頁"
      }
    ],
    "family": "瀉肺平喘/利水消腫 (桑科根皮)",
    "partsUsed": "瀉肺平喘/利水消腫 (桑科根皮)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第31頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "桑白皮",
      "瀉肺平喘/利水消腫 (桑科根皮)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘"
    ],
    "channels": [
      "肺",
      "脾"
    ],
    "efficacy": "瀉肺平喘，行水消腫，清肺火。 肺熱咳喘、吐血、面目浮腫、小便不利、腳氣水腫。",
    "cautions": "專瀉肺中水火，平喘止咳、利水消腫。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以色白、皮厚、粉性足者為佳。",
    "medicinalDiet": "桑白皮茶、桑菊薄荷茶等。",
    "sourceBook": "《藥膳學》第31頁",
    "page": 31,
    "status": "published"
  },
  {
    "id": 107,
    "name": "貝母",
    "scientificName": "百合科植物川貝母或浙貝母",
    "pinyin": "貝母",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第31-32頁"
      }
    ],
    "family": "清熱化痰/潤肺止咳 (百合科鱗莖)",
    "partsUsed": "清熱化痰/潤肺止咳 (百合科鱗莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第31-32頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "貝母",
      "清熱化痰/潤肺止咳 (百合科鱗莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "苦"
    ],
    "channels": [
      "肺",
      "心"
    ],
    "efficacy": "清熱化痰，潤肺止咳，散結消癰。 川貝長於潤肺化痰，主肺燥久咳、乾咳少痰；浙貝長於清火散結，主痰黃稠、瘰癧瘡癰。",
    "cautions": "咳嗽食療最常用名品，乾咳久咳選川貝，痰黃稠熱咳選浙貝。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "川貝以松貝粒小如珠、色白、粉足為佳；浙貝以個大飽滿粉足為佳。",
    "medicinalDiet": "川貝燉雪梨、雪梨貝母冰糖飲、貝母粥。",
    "sourceBook": "《藥膳學》第31-32頁",
    "page": 31,
    "status": "published"
  },
  {
    "id": 108,
    "name": "麥門冬",
    "scientificName": "百合科植物麥冬或沿階草",
    "pinyin": "麥門冬",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第32頁"
      }
    ],
    "family": "養陰生津/潤肺清心 (百合科塊根)",
    "partsUsed": "養陰生津/潤肺清心 (百合科塊根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第32頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "麥門冬",
      "養陰生津/潤肺清心 (百合科塊根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘",
      "苦"
    ],
    "channels": [
      "肺",
      "心",
      "胃"
    ],
    "efficacy": "養陰生津，潤肺止咳，清心除煩，潤腸通便。 肺燥乾咳、咯血、虛勞煩熱、津傷口渴、咽乾、心煩失眠、腸燥便秘。",
    "cautions": "養陰生津名藥，與人參、五味子同用即生脈散，夏日防中暑耗氣傷津良方。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以肥壯、半透明、黃白色、質柔、氣香、嚼之發黏者為佳。",
    "medicinalDiet": "麥冬粟米粥、麥冬燉老鴨、生脈茶（人參、麥冬、五味子）。",
    "sourceBook": "《藥膳學》第32頁",
    "page": 32,
    "status": "published"
  },
  {
    "id": 109,
    "name": "女貞子",
    "scientificName": "木犀科植物女貞",
    "pinyin": "女貞子",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第32-33頁"
      }
    ],
    "family": "滋補肝腎/明目烏髮 (木犀科果實)",
    "partsUsed": "滋補肝腎/明目烏髮 (木犀科果實)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第32-33頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "女貞子",
      "滋補肝腎/明目烏髮 (木犀科果實)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "涼",
    "taste": [
      "甘",
      "苦"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "補益肝腎，清虛熱，明目烏髮。 肝腎陰虛、頭暈目眩、腰膝酸軟、遺精耳鳴、鬚髮早白、視物昏暗、骨蒸潮熱。現代研究抑制幽門桿菌並降尿酸。",
    "cautions": "二至丸主要成分，平補肝腎陰虛要藥，現代研究能調節高尿酸血症。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以粒大、飽滿、肉質、色黑紫、無雜質者為佳。",
    "medicinalDiet": "女貞子酒、桑椹二至膏、女貞黑豆燉排骨。",
    "sourceBook": "《藥膳學》第32-33頁",
    "page": 32,
    "status": "published"
  },
  {
    "id": 110,
    "name": "白芍",
    "scientificName": "毛茛科植物芍藥除去栓皮",
    "pinyin": "白芍",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第33頁"
      }
    ],
    "family": "養血調經/斂陰止痛 (毛茛科根)",
    "partsUsed": "養血調經/斂陰止痛 (毛茛科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第33頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "白芍",
      "養血調經/斂陰止痛 (毛茛科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "苦",
      "酸"
    ],
    "channels": [
      "肝",
      "脾"
    ],
    "efficacy": "養血斂陰，柔肝止痛，平抑肝陽。 月經不調、經行腹痛、崩漏、自汗盜汗、脅肋脘腹疼痛、四肢攣痛、頭痛眩暈。",
    "cautions": "酸甘化陰之代表，與甘草合用（芍藥甘草湯）善緩急止痛解腳痙攣。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以根粗長、勻直、皮色光潔、質堅實、斷面粉白色、粉性足者為佳。",
    "medicinalDiet": "白芍藥膳蝦、白芍當歸蜜飲、白芍燉雞。",
    "sourceBook": "《藥膳學》第33頁",
    "page": 33,
    "status": "published"
  },
  {
    "id": 111,
    "name": "鉤藤",
    "scientificName": "茜草科植物鉤藤、華鉤藤或毛鉤藤",
    "pinyin": "鉤藤",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第33頁"
      }
    ],
    "family": "平肝熄風/清熱降壓 (茜草科帶鉤莖枝)",
    "partsUsed": "平肝熄風/清熱降壓 (茜草科帶鉤莖枝)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第33頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "鉤藤",
      "平肝熄風/清熱降壓 (茜草科帶鉤莖枝)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘"
    ],
    "channels": [
      "肝",
      "心包"
    ],
    "efficacy": "清熱平肝，熄風止痙，降血壓。 頭痛眩暈、肝陽上亢、高血壓病、小兒驚風抽搐、夜啼、熱盛動風。",
    "cautions": "降血壓與平息內風名藥，煎煮時間不宜超過20分鐘以保有效成分。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以雙鉤形如錨狀、莖細、鉤結實、光滑、色紅褐或紫褐者為佳。",
    "medicinalDiet": "天麻鉤藤燉豬腦、鉤藤茶（入湯劑宜後下，不可久煎）。",
    "sourceBook": "《藥膳學》第33頁",
    "page": 33,
    "status": "published"
  },
  {
    "id": 112,
    "name": "茯苓",
    "scientificName": "多孔菌科真菌茯苓",
    "pinyin": "茯苓",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第34頁"
      }
    ],
    "family": "利水滲濕/健脾寧心 (多孔菌科菌核)",
    "partsUsed": "利水滲濕/健脾寧心 (多孔菌科菌核)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第34頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "茯苓",
      "利水滲濕/健脾寧心 (多孔菌科菌核)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "淡"
    ],
    "channels": [
      "心",
      "脾",
      "肺",
      "腎"
    ],
    "efficacy": "滲濕利水，健脾和胃，寧心安神。利水而不傷正氣。 小便不利、水腫脹滿、痰飲眩悸、脾虛食少便溏、心神不安、失眠健忘。",
    "cautions": "四時皆宜之健脾化濕首選；抱松根者名茯神，專長寧心安神。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以體重堅實、外皮褐色具光澤、斷面白色細膩、嚼之黏牙者為佳。",
    "medicinalDiet": "茯苓糕、茯苓栗子粥、茯苓麥冬粥、茯苓酒。",
    "sourceBook": "《藥膳學》第34頁",
    "page": 34,
    "status": "published"
  },
  {
    "id": 113,
    "name": "牛膝",
    "scientificName": "莧科植物懷牛膝或川牛膝",
    "pinyin": "牛膝",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第34頁"
      }
    ],
    "family": "活血通經/補肝腎 (莧科根)",
    "partsUsed": "活血通經/補肝腎 (莧科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第34頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "牛膝",
      "活血通經/補肝腎 (莧科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "苦",
      "酸"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "補肝腎，強筋骨，活血通經，引火下行，利尿通淋。 腰膝酸痛、下肢痿軟、經閉痛經、產後血瘀腹痛、熱淋血淋、跌打損傷、牙齦腫痛。",
    "cautions": "生用破血行瘀、引火下行；熟用補益肝腎、強健筋骨。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以條長、皮細肉肥、色黃白者為佳。",
    "medicinalDiet": "牛膝絲瓜湯、牛膝蹄筋湯、牛膝燉豬腳。",
    "sourceBook": "《藥膳學》第34頁",
    "page": 34,
    "status": "published"
  },
  {
    "id": 114,
    "name": "枇杷葉",
    "scientificName": "薔薇科植物枇杷",
    "pinyin": "枇杷葉",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第34-35頁"
      }
    ],
    "family": "清肺止咳/和胃降逆 (薔薇科葉)",
    "partsUsed": "清肺止咳/和胃降逆 (薔薇科葉)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第34-35頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "枇杷葉",
      "清肺止咳/和胃降逆 (薔薇科葉)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "涼",
    "taste": [
      "苦"
    ],
    "channels": [
      "肺",
      "胃"
    ],
    "efficacy": "清肺止咳，和胃降逆，止渴，降氣化痰。 肺熱咳嗽、陰虛勞嗽、咳血衄血、胃熱嘔吐、呃逆、氣逆喘急。",
    "cautions": "入藥必須刷盡背部金黃色絨毛，否則刺激咽喉引起劇烈咳嗽。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以葉大、色綠或紅棕、無黃葉、背部絨毛刷除乾淨者為佳。",
    "medicinalDiet": "枇杷葉粥、枇杷葉蜜茶、枇杷葉雪梨湯。",
    "sourceBook": "《藥膳學》第34-35頁",
    "page": 34,
    "status": "published"
  },
  {
    "id": 115,
    "name": "桔梗",
    "scientificName": "桔梗科植物桔梗",
    "pinyin": "桔梗",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第35頁"
      }
    ],
    "family": "宣肺排膿/利咽 (桔梗科根)",
    "partsUsed": "宣肺排膿/利咽 (桔梗科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第35頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "桔梗",
      "宣肺排膿/利咽 (桔梗科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "苦",
      "辛"
    ],
    "channels": [
      "肺"
    ],
    "efficacy": "開宣肺氣，祛痰排膿，利咽喉，引藥上行。 咳嗽痰多、胸滿痛、咽喉腫痛、聲音嘶啞、肺癰吐膿、痢疾腹痛、小便癃閉。",
    "cautions": "為「舟楫之劑」，能載諸藥上浮入肺；利咽排膿要藥。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以蘆頭長、條粗均勻、堅實、潔白、味苦者為佳。",
    "medicinalDiet": "涼拌桔梗、桔梗冬瓜排骨湯、桔梗茶。",
    "sourceBook": "《藥膳學》第35頁",
    "page": 35,
    "status": "published"
  },
  {
    "id": 116,
    "name": "銀耳",
    "scientificName": "銀耳科真菌銀耳",
    "pinyin": "銀耳",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第36頁"
      }
    ],
    "family": "滋陰潤肺/養胃生津 (真菌子實體)",
    "partsUsed": "滋陰潤肺/養胃生津 (真菌子實體)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第36頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "銀耳",
      "滋陰潤肺/養胃生津 (真菌子實體)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "淡"
    ],
    "channels": [
      "肺",
      "胃",
      "腎"
    ],
    "efficacy": "滋陰潤肺，養胃生津，益氣和血，強心補腦。 虛勞咳嗽、痰中帶血、津少口渴、病後體虛、大便秘結、陰虛內熱。為不受參茸等溫熱補品之病患的最佳清補品。",
    "cautions": "平民燕窩，富含植物性膠質與多醣體，美容潤膚、潤肺止咳聖品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以色澤黃白、鮮潔發亮、瓣大形似梅花、帶韌性、脹性好者為佳。",
    "medicinalDiet": "冰糖銀耳蓮子湯、枸杞紅棗銀耳羹、銀耳雪梨盅。",
    "sourceBook": "《藥膳學》第36頁",
    "page": 36,
    "status": "published"
  },
  {
    "id": 117,
    "name": "山藥",
    "scientificName": "薯蕷科植物薯蕷",
    "pinyin": "山藥",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第36-37頁"
      }
    ],
    "family": "健脾補肺/固腎益精 (薯蕷科塊莖)",
    "partsUsed": "健脾補肺/固腎益精 (薯蕷科塊莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第36-37頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "山藥",
      "健脾補肺/固腎益精 (薯蕷科塊莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "肺",
      "腎"
    ],
    "efficacy": "補脾養胃，生津益肺，補腎澀精。脾肺腎三陰皆補。 脾虛食少、久瀉不止、肺虛喘咳、腎虛遺精、帶下尿頻、虛熱消渴（糖尿病）。",
    "cautions": "麩炒山藥增強補脾止瀉；鮮品黏液質豐富，護胃降糖之食補佳品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以條粗肥壯、質重堅實、粉性足、色潔白、無腐爛者為佳。",
    "medicinalDiet": "皮蛋山藥泥、山藥赤豆粥、山藥燉排骨湯、山藥紅棗芡實湯。",
    "sourceBook": "《藥膳學》第36-37頁",
    "page": 36,
    "status": "published"
  },
  {
    "id": 118,
    "name": "黨參",
    "scientificName": "桔梗科植物黨參或川黨參",
    "pinyin": "黨參",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第37頁"
      }
    ],
    "family": "健脾益肺/養血生津 (桔梗科根)",
    "partsUsed": "健脾益肺/養血生津 (桔梗科根)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第37頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "黨參",
      "健脾益肺/養血生津 (桔梗科根)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "肺"
    ],
    "efficacy": "健脾補肺，益氣養血，生津止渴。為平民人參。 脾胃虛弱、食少便溏、四肢無力、肺氣不足喘咳、氣血兩虛面黃、津傷口渴。",
    "cautions": "藥膳中常用以替代人參，補氣而性平和，不易上火。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以根條肥大、粗實、皮緊肉厚、橫紋多、香氣濃、味甜嚼之無渣者為佳。",
    "medicinalDiet": "黃耆黨參燉烏雞、黨參枸杞紅棗湯、參苓粥。",
    "sourceBook": "《藥膳學》第37頁",
    "page": 37,
    "status": "published"
  },
  {
    "id": 119,
    "name": "阿膠",
    "scientificName": "馬科動物黑驢皮經熬製加工而成",
    "pinyin": "阿膠",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第37頁"
      }
    ],
    "family": "滋陰補血/潤肺止血 (馬科驢皮膠)",
    "partsUsed": "滋陰補血/潤肺止血 (馬科驢皮膠)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第37頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "阿膠",
      "滋陰補血/潤肺止血 (馬科驢皮膠)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "肺",
      "肝",
      "腎"
    ],
    "efficacy": "滋陰養血，補肺潤燥，止血安胎。 血虛萎黃、眩暈心悸、虛勞咯血吐血、崩漏便血、胎漏下血、陰虛心煩失眠。",
    "cautions": "補血第一名膠，滋補婦女氣血、調經安胎之聖品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以整齊平正、黑褐色如琥珀、質硬脆、斷面光亮、無腥臭氣、經夏不軟者為佳。",
    "medicinalDiet": "阿膠核桃芝麻膏、阿膠燉雞蛋、阿膠黃酒羹。",
    "sourceBook": "《藥膳學》第37頁",
    "page": 37,
    "status": "published"
  },
  {
    "id": 120,
    "name": "酸棗仁",
    "scientificName": "鼠李科植物酸棗",
    "pinyin": "酸棗仁",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第37-38頁"
      }
    ],
    "family": "養心安神/斂汗 (鼠李科種子)",
    "partsUsed": "養心安神/斂汗 (鼠李科種子)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第37-38頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "酸棗仁",
      "養心安神/斂汗 (鼠李科種子)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "酸"
    ],
    "channels": [
      "心",
      "脾",
      "肝",
      "膽"
    ],
    "efficacy": "養肝寧心，安神益智，斂汗生津。 虛煩不眠、驚悸怔忡、煩渴虛汗、神經衰弱、健忘。",
    "cautions": "中醫治失眠第一神品，生用炒用皆能寧心，炒用安神力尤優。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以粒大、飽滿、有光澤、外皮紅棕色、種仁黃白色者為佳。",
    "medicinalDiet": "酸棗仁粥、酸棗仁龍眼百合湯、酸棗仁茶。",
    "sourceBook": "《藥膳學》第37-38頁",
    "page": 37,
    "status": "published"
  },
  {
    "id": 121,
    "name": "蓮子",
    "scientificName": "睡蓮科水生草本植物蓮的乾燥成熟種子",
    "pinyin": "蓮子",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第38頁"
      }
    ],
    "family": "補脾止瀉/益腎固精/安神 (睡蓮科種子)",
    "partsUsed": "補脾止瀉/益腎固精/安神 (睡蓮科種子)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第38頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "蓮子",
      "補脾止瀉/益腎固精/安神 (睡蓮科種子)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "澀"
    ],
    "channels": [
      "脾",
      "腎",
      "心"
    ],
    "efficacy": "清心醒脾，補脾止瀉，益腎固精，養心安神。健脾固腸。 脾虛久瀉、大便溏泄、男子遺精淋濁、婦女帶下、心悸失眠多夢、妊娠腰酸。",
    "cautions": "臺灣名湯四神湯四大主角之一，兼顧健脾止瀉與安神固精。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以粒大飽滿、色白、無蟲蛀、易煮爛者為佳（蓮子心偏於清心火）。",
    "medicinalDiet": "紅棗銀耳蓮子湯、蓮子百合排骨湯、四神湯。",
    "sourceBook": "《藥膳學》第38頁",
    "page": 38,
    "status": "published"
  },
  {
    "id": 122,
    "name": "羊奶頭",
    "scientificName": "桑科植物臺灣天仙果",
    "pinyin": "羊奶頭",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第38頁"
      }
    ],
    "family": "疏風清熱/強筋補腎 (桑科天仙果根莖)",
    "partsUsed": "疏風清熱/強筋補腎 (桑科天仙果根莖)",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第38頁 · 第二章 藥膳常用藥材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "羊奶頭",
      "疏風清熱/強筋補腎 (桑科天仙果根莖)"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "澀"
    ],
    "channels": [
      "肝",
      "脾",
      "腎"
    ],
    "efficacy": "健脾健胃，清熱利濕，補腎陽，強筋骨，潤肺通乳。 肝炎、腰肌勞損、風濕關節痛、水腫、小便淋痛、乳汁不足、產後或病後虛弱、陽痿。",
    "cautions": "臺灣極富盛名的本土特色青草藥膳，具獨特奶香味，強壯筋骨、補氣通乳。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以粗莖粗壯、根鬚多、乾燥、氣香、無雜質泥沙者為佳。",
    "medicinalDiet": "羊奶頭燉土雞湯、羊奶頭燉排骨湯、羊奶頭燉豬腳。",
    "sourceBook": "《藥膳學》第38頁",
    "page": 38,
    "status": "published"
  },
  {
    "id": 123,
    "name": "蔥",
    "scientificName": "百合科植物蔥的鱗莖或全株",
    "pinyin": "蔥",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第42頁"
      }
    ],
    "family": "蔬菜辛香類",
    "partsUsed": "蔬菜辛香類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第42頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "蔥",
      "蔬菜辛香類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "肺",
      "胃"
    ],
    "efficacy": "發汗解表，散寒通陽，健胃，解毒散瘀。刺激汗腺、促進消化液分泌。 風寒感冒輕症、惡寒發熱、陰寒腹痛、小便不利、癰腫瘡毒。對痢疾桿菌抑制明顯。",
    "cautions": "蔥白發汗通陽，蔥綠行氣活血；感冒初起發汗必備。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以蔥白長、粗壯、緊實、辛辣味濃者為佳。",
    "medicinalDiet": "蔥豉湯（蔥白豆豉湯）、蔥白薑茶、蔥燒豆腐。",
    "sourceBook": "《藥膳學》第42頁",
    "page": 42,
    "status": "published"
  },
  {
    "id": 124,
    "name": "薑",
    "scientificName": "薑科植物薑的新鮮或老根莖（生薑/老薑/乾薑）",
    "pinyin": "薑",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第42頁"
      }
    ],
    "family": "蔬菜辛香類",
    "partsUsed": "蔬菜辛香類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第42頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "薑",
      "蔬菜辛香類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "肺",
      "脾",
      "胃"
    ],
    "efficacy": "發汗、解熱、止咳、止嘔、祛痰。促進消化液分泌，提高消化功能。 改善水腫、胃寒嘔吐、擴張血管降低血壓、消化功能不良。",
    "cautions": "民間俗諺：冬吃生薑，不用醫生開藥方。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "生薑肥嫩汁多者利止嘔；老薑纖維多辣味重者利驅寒溫中。",
    "medicinalDiet": "薑汁撞奶、薑絲鱸魚湯、薑母鴨。",
    "sourceBook": "《藥膳學》第42頁",
    "page": 42,
    "status": "published"
  },
  {
    "id": 125,
    "name": "大蒜",
    "scientificName": "百合科植物大蒜的地下鱗莖",
    "pinyin": "大蒜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第42頁"
      }
    ],
    "family": "蔬菜辛香類",
    "partsUsed": "蔬菜辛香類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第42頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "大蒜",
      "蔬菜辛香類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "脾",
      "胃",
      "肺"
    ],
    "efficacy": "溫中行滯，解毒殺蟲。消除血管中積存脂肪，抗菌降脂。 脘腹冷痛、痢疾泄瀉、百日咳、感冒、癰疽腫毒、高血脂症、動脈硬化。多吃有礙視力。",
    "cautions": "含大蒜素，天然抗生素與降血脂聖品；陰虛火旺或目疾者少食。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以蒜瓣肥大、緊實、辛辣濃烈、無腐爛發芽者為佳。",
    "medicinalDiet": "大蒜燉田雞、大蒜蜆湯、黑蒜雞湯。",
    "sourceBook": "《藥膳學》第42頁",
    "page": 42,
    "status": "published"
  },
  {
    "id": 126,
    "name": "洋蔥",
    "scientificName": "百合科植物洋蔥的地下鱗莖",
    "pinyin": "洋蔥",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第42-43頁"
      }
    ],
    "family": "蔬菜辛香類",
    "partsUsed": "蔬菜辛香類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第42-43頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "洋蔥",
      "蔬菜辛香類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "辛"
    ],
    "channels": [
      "肺",
      "脾",
      "胃"
    ],
    "efficacy": "祛痰利尿，健胃潤腸，解毒殺蟲，降脂降壓。含前列腺素A能舒張血管。 動脈硬化、高血脂、高血壓、冠心病、食欲不振、消化不良、腸炎蟲積。",
    "cautions": "含二烯丙基二硫化物與前列腺素A，保護心血管與抗血栓名品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以球體整齊、堅實、無軟腐、外皮乾爽者為佳。",
    "medicinalDiet": "洋蔥炒牛肉、洋蔥紅酒飲、洋蔥濃湯。",
    "sourceBook": "《藥膳學》第42-43頁",
    "page": 42,
    "status": "published"
  },
  {
    "id": 127,
    "name": "韭菜",
    "scientificName": "百合科植物韭菜的嫩葉",
    "pinyin": "韭菜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第43頁"
      }
    ],
    "family": "蔬菜類",
    "partsUsed": "蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第43頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "韭菜",
      "蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "辛"
    ],
    "channels": [
      "肝",
      "胃",
      "腎"
    ],
    "efficacy": "健胃提神，止汗固澀，溫中行氣，活血化瘀，溫腎壯陽。有「起陽草」之稱。 自汗盜汗、跌打損傷、瘀血腫痛、外傷出血、腎虛腰冷陽痿、便秘。",
    "cautions": "起陽草，春季食用香氣最足，溫陽健胃而助生發。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以葉嫩、色翠綠、無枯黃殘葉者為佳。",
    "medicinalDiet": "韭菜炒蝦仁、韭菜炒雞蛋、韭菜鮮蚵湯。",
    "sourceBook": "《藥膳學》第43頁",
    "page": 43,
    "status": "published"
  },
  {
    "id": 128,
    "name": "大白菜",
    "scientificName": "十字花科植物大白菜的葉球",
    "pinyin": "大白菜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第43頁"
      }
    ],
    "family": "蔬菜類",
    "partsUsed": "蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第43頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "大白菜",
      "蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "淡"
    ],
    "channels": [
      "胃",
      "大腸"
    ],
    "efficacy": "養胃生津，除煩解渴，利尿通便，清熱解毒，消食和中。 感冒、煩渴口乾、百日咳、消化性潰瘍出血、咽乾聲嘶、大便秘結。",
    "cautions": "百菜不如白菜，富含維生素C與膳食纖維，清熱通腸利胃。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以包心緊實、葉厚、色鮮嫩、無黑斑點者為佳。",
    "medicinalDiet": "白菜燉豆腐、開水白菜、白菜排骨湯。",
    "sourceBook": "《藥膳學》第43頁",
    "page": 43,
    "status": "published"
  },
  {
    "id": 129,
    "name": "高麗菜",
    "scientificName": "十字花科甘藍屬植物結球甘藍的葉球（高麗菜/捲心菜）",
    "pinyin": "高麗菜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第43頁"
      }
    ],
    "family": "蔬菜類",
    "partsUsed": "蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第43頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "高麗菜",
      "蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "胃",
      "腎"
    ],
    "efficacy": "益脾和胃，緩急止痛，清熱散結，潤腸通便。富含維生素U。 胃及十二指腸潰瘍疼痛、消化性潰瘍、上腹脹痛、胃脘拘急、便秘。搗汁飲服能促進潰瘍癒合。",
    "cautions": "天然胃菜之王，所含維生素U是修復胃黏膜與消炎止痛最佳成分。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以葉球結實、葉片鮮翠、手感沉重者為佳。",
    "medicinalDiet": "高麗菜鮮汁、高麗菜番茄豆腐湯、清炒高麗菜枸杞。",
    "sourceBook": "《藥膳學》第43頁",
    "page": 43,
    "status": "published"
  },
  {
    "id": 130,
    "name": "芹菜",
    "scientificName": "繖形科植物旱芹或水芹的莖葉",
    "pinyin": "芹菜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第43-44頁"
      }
    ],
    "family": "蔬菜類",
    "partsUsed": "蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第43-44頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "芹菜",
      "蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "涼",
    "taste": [
      "甘",
      "苦"
    ],
    "channels": [
      "肝",
      "胃",
      "膀胱"
    ],
    "efficacy": "平肝清熱，祛風利濕，涼血止血，降血壓，降血脂。 高血壓、頭暈目眩、血管硬化、面紅目赤、小便淋痛、尿血便血。搗汁服用降壓效果佳。",
    "cautions": "天然降壓菜，清肝利尿、保護血管彈性。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以棵大、梗脆嫩、綠色清爽、香氣清新者為佳。",
    "medicinalDiet": "鮮芹汁、芹菜炒豆乾、芹菜香菇粥。",
    "sourceBook": "《藥膳學》第43-44頁",
    "page": 43,
    "status": "published"
  },
  {
    "id": 131,
    "name": "菠菜",
    "scientificName": "藜科植物菠菜的全草及葉",
    "pinyin": "菠菜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第44頁"
      }
    ],
    "family": "蔬菜類",
    "partsUsed": "蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第44頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "菠菜",
      "蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "涼",
    "taste": [
      "甘"
    ],
    "channels": [
      "腸",
      "胃"
    ],
    "efficacy": "潤燥清熱，下氣調中，養血止血，補鐵補鋅，保護眼睛延緩老化。 貧血萎黃、腸燥便秘、痔瘡出血、夜盲症、高血壓、消渴。",
    "cautions": "含豐富葉酸、胡蘿蔔素與鐵質；烹調前宜先汆燙去草酸。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以葉色濃綠、根部鮮紅、質嫩無老梗者為佳。",
    "medicinalDiet": "菠菜豬肝湯、菠菜炒蛋、涼拌芝麻菠菜。",
    "sourceBook": "《藥膳學》第44頁",
    "page": 44,
    "status": "published"
  },
  {
    "id": 132,
    "name": "白蘿蔔",
    "scientificName": "十字花科植物蘿蔔的新鮮肉質根（萊菔）",
    "pinyin": "白蘿蔔",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第44頁"
      }
    ],
    "family": "根莖蔬菜類",
    "partsUsed": "根莖蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第44頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "白蘿蔔",
      "根莖蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "涼",
    "taste": [
      "甘",
      "辛"
    ],
    "channels": [
      "肺",
      "胃"
    ],
    "efficacy": "消積滯，化痰熱，下氣寬中，解毒利尿。能破除體內致癌物亞硝胺。 消化不良、腹脹噯氣、痰咳氣喘、便秘、咽乾消渴。",
    "cautions": "俗稱小人參；生吃消食清火，熟吃下氣化痰。服人參時不宜同食。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以條形勻稱、皮光色白、掂之沉重不空心者為佳。",
    "medicinalDiet": "白蘿蔔排骨湯、蜂蜜蘿蔔汁、蘿蔔絲煎蛋。",
    "sourceBook": "《藥膳學》第44頁",
    "page": 44,
    "status": "published"
  },
  {
    "id": 133,
    "name": "胡蘿蔔",
    "scientificName": "繖形科植物胡蘿蔔的新鮮肉質根",
    "pinyin": "胡蘿蔔",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第44頁"
      }
    ],
    "family": "根莖蔬菜類",
    "partsUsed": "根莖蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第44頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "胡蘿蔔",
      "根莖蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "肺"
    ],
    "efficacy": "健脾消食，補肝明目，清熱解毒，透疹，降氣止咳。 夜盲症、小兒營養不良、角膜乾燥、麻疹透發不暢、高血壓、腸胃不適。",
    "cautions": "富含β-胡蘿蔔素，為脂溶性維生素，以油脂熱炒食用吸收率最高。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以根形平直、色橘紅、質細嫩脆甜者為佳。",
    "medicinalDiet": "胡蘿蔔炒肉絲、胡蘿蔔排骨湯、胡蘿蔔蘋果汁。",
    "sourceBook": "《藥膳學》第44頁",
    "page": 44,
    "status": "published"
  },
  {
    "id": 134,
    "name": "絲瓜",
    "scientificName": "葫蘆科植物絲瓜或粵絲瓜的新鮮果實（老者為絲瓜絡）",
    "pinyin": "絲瓜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第44-45頁"
      }
    ],
    "family": "瓜果蔬菜類",
    "partsUsed": "瓜果蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第44-45頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "絲瓜",
      "瓜果蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "涼",
    "taste": [
      "甘"
    ],
    "channels": [
      "肺",
      "肝",
      "胃"
    ],
    "efficacy": "清熱化痰，涼血解毒，通經活絡，利尿消腫，通乳下乳。 夏季暑熱煩渴、痰喘咳嗽、咽喉腫痛、血淋、便血、產後乳少、關節麻木（絡）。",
    "cautions": "夏日降火清熱美容勝品，瓜汁更有「美人水」之稱。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以條直勻稱、瓜條嫩綠、拿捏彈性佳、無老筋者為佳。",
    "medicinalDiet": "蛤蜊絲瓜湯、絲瓜炒麵線、絲瓜枸杞湯。",
    "sourceBook": "《藥膳學》第44-45頁",
    "page": 44,
    "status": "published"
  },
  {
    "id": 135,
    "name": "金針",
    "scientificName": "百合科植物萱草或黃花菜的乾燥花蕾（黃花菜/忘憂草）",
    "pinyin": "金針",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第45頁"
      }
    ],
    "family": "花菜類",
    "partsUsed": "花菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第45頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "金針",
      "花菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "涼",
    "taste": [
      "甘"
    ],
    "channels": [
      "肝",
      "脾",
      "腎"
    ],
    "efficacy": "化濕利水，清熱通淋，止渴消煩，健胃，通乳，消腫退火。富含卵磷脂健腦。 心煩失眠、健忘、小便淋痛、水腫、乳汁不足、產後虛弱。天然美容聖品。",
    "cautions": "古名萱草忘憂，富含維生素A與卵磷脂，安神助眠、通乳健腦。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以色澤黃褐微金、花條完整、香氣清爽、無二氧化硫殘留者為佳。",
    "medicinalDiet": "金針排骨湯、香菇木耳炒金針、金針燉土雞。",
    "sourceBook": "《藥膳學》第45頁",
    "page": 45,
    "status": "published"
  },
  {
    "id": 136,
    "name": "香菇",
    "scientificName": "側耳科真菌香蕈的子實體",
    "pinyin": "香菇",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第45頁"
      }
    ],
    "family": "蕈菌類",
    "partsUsed": "蕈菌類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第45頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "香菇",
      "蕈菌類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "胃",
      "脾"
    ],
    "efficacy": "補氣健脾，和胃益腎，抗腫瘤，增強免疫。含香菇多醣與麥角固醇。 脾胃虛弱、食少倦怠、高血脂、動脈硬化、小兒軟骨病、免疫低下、貧血。",
    "cautions": "富含麥角固醇經日曬轉為維生素D，菇多糖能大幅提升抗病防癌免疫力。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以朵圓整齊、菌蓋肉厚下捲、柄短、菌褶白皙、香氣濃郁者為佳（冬菇/花菇）。",
    "medicinalDiet": "香菇枸杞燉土雞湯、香菇栗子炆雞、香菇排骨粥。",
    "sourceBook": "《藥膳學》第45頁",
    "page": 45,
    "status": "published"
  },
  {
    "id": 137,
    "name": "黑木耳",
    "scientificName": "木耳科真菌木耳",
    "pinyin": "黑木耳",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第45頁"
      }
    ],
    "family": "蕈菌類",
    "partsUsed": "蕈菌類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第45頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "黑木耳",
      "蕈菌類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "胃",
      "大腸"
    ],
    "efficacy": "補氣養血，潤肺清腸，活血止血，防血栓形成。含木耳多醣改善便秘。 腸風便血、痔瘡出血、高血脂、動脈硬化、血管栓塞、習慣性便秘、貧血。",
    "cautions": "血管清道夫，抗血小板凝集、降血脂防血栓之養生聖品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以朵大肉厚、色青黑無白雜質、手捏乾燥易脆、泡發率高者為佳。",
    "medicinalDiet": "涼拌黑木耳、黑木耳紅棗桂圓湯、木耳炒肉絲。",
    "sourceBook": "《藥膳學》第45頁",
    "page": 45,
    "status": "published"
  },
  {
    "id": 138,
    "name": "苦瓜",
    "scientificName": "葫蘆科植物苦瓜的新鮮果實",
    "pinyin": "苦瓜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第45頁"
      }
    ],
    "family": "瓜果蔬菜類",
    "partsUsed": "瓜果蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第45頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "苦瓜",
      "瓜果蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "苦"
    ],
    "channels": [
      "心",
      "脾",
      "胃"
    ],
    "efficacy": "清暑滌熱，明目解毒，瀉火除煩，散瘀消腫。增強血管彈性防微血管破裂。 夏日熱病煩渴、中暑熱痱、目赤腫痛、痢疾腹痛、消渴（糖尿病降血糖）。",
    "cautions": "含植物胰島素胜肽，清熱降火抗糖尿病名品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以瓜條均稱、果瘤粗大圓滑、色白亮或翠綠、手感堅實者為佳。",
    "medicinalDiet": "鳳梨苦瓜雞湯、苦瓜排骨湯、涼拌苦瓜片。",
    "sourceBook": "《藥膳學》第45頁",
    "page": 45,
    "status": "published"
  },
  {
    "id": 139,
    "name": "冬瓜",
    "scientificName": "葫蘆科植物冬瓜的新鮮果實（皮肉瓤子皆可入藥）",
    "pinyin": "冬瓜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第46頁"
      }
    ],
    "family": "瓜果蔬菜類",
    "partsUsed": "瓜果蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第46頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "冬瓜",
      "瓜果蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘",
      "淡"
    ],
    "channels": [
      "肺",
      "大腸",
      "小腸",
      "膀胱"
    ],
    "efficacy": "利水消痰，清熱解毒，生津除煩，減肥降脂。防止黑色素沉澱。 水腫腹脹、小便不利、暑熱煩渴、消渴、肥胖症、痤瘡面斑。",
    "cautions": "不含脂肪且含丙醇二酸抑制醣類轉化為脂肪，利尿減重第一瓜。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以肉厚、白霜多、肉質緊實、皮色深綠者為佳。",
    "medicinalDiet": "冬瓜蛤蜊排骨湯、冬瓜薏仁湯、冬瓜排骨煨湯。",
    "sourceBook": "《藥膳學》第46頁",
    "page": 46,
    "status": "published"
  },
  {
    "id": 140,
    "name": "番茄",
    "scientificName": "茄科植物番茄的新鮮果實",
    "pinyin": "番茄",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第46頁"
      }
    ],
    "family": "茄果蔬菜類",
    "partsUsed": "茄果蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第46頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "番茄",
      "茄果蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘",
      "酸"
    ],
    "channels": [
      "肝",
      "胃",
      "肺"
    ],
    "efficacy": "生津止渴，健胃消食，清熱解毒，保護血管彈性，預防血栓及防癌。 熱病口渴、食欲不振、高血壓、動脈硬化、前列腺肥大與抗氧化預防癌症。",
    "cautions": "富含茄紅素（Lycopene），經油脂加熱熟煮後吸收率大幅增加。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以果形圓整、色深紅熟透、無空洞腐爛者為佳。",
    "medicinalDiet": "番茄炒蛋、番茄豆腐牛肉湯、番茄羅宋湯。",
    "sourceBook": "《藥膳學》第46頁",
    "page": 46,
    "status": "published"
  },
  {
    "id": 141,
    "name": "蓮藕",
    "scientificName": "睡蓮科植物蓮的肥大地下莖",
    "pinyin": "蓮藕",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第46頁"
      }
    ],
    "family": "根莖水生類",
    "partsUsed": "根莖水生類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第46頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "蓮藕",
      "根莖水生類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘"
    ],
    "channels": [
      "心",
      "脾",
      "胃"
    ],
    "efficacy": "生用清熱生津、涼血散瘀、解酒除煩；熟用補脾益胃、滋陰生血、止瀉收斂。 吐血衄血、咳血尿血、食少泄瀉、煩渴口乾、動脈硬化、產後瘀血（生用不忌）。",
    "cautions": "生用涼血散瘀，熟用健脾補血；民間有「男不離韭，女不離藕」之說。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以藕節肥短、外皮黃褐色無外傷、斷面肉色均勻者為佳。",
    "medicinalDiet": "蓮藕排骨湯、蜜汁糯米藕、鮮藕汁、涼拌鮮藕片。",
    "sourceBook": "《藥膳學》第46頁",
    "page": 46,
    "status": "published"
  },
  {
    "id": 142,
    "name": "海帶",
    "scientificName": "海帶科海帶屬植物海帶的乾燥葉狀體（昆布）",
    "pinyin": "海帶",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第46-47頁"
      }
    ],
    "family": "藻類海產蔬菜",
    "partsUsed": "藻類海產蔬菜",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第46-47頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "海帶",
      "藻類海產蔬菜"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "鹹"
    ],
    "channels": [
      "肝",
      "胃",
      "腎"
    ],
    "efficacy": "軟堅散結，消痰平喘，利水消腫，清熱降壓。含豐富褐藻酸鈉與碘。 癭瘤瘰癧（甲狀腺腫大）、高血壓、水腫、腳氣、動脈硬化、高血脂、便秘。",
    "cautions": "含大量有機碘與褐藻酸，降膽固醇、防動脈硬化與軟化腫塊良品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以葉寬厚、色深褐或深綠、表面附著白霜（甘露醇）多者為佳。",
    "medicinalDiet": "海帶排骨湯、涼拌海帶絲、海帶冬瓜消脂湯。",
    "sourceBook": "《藥膳學》第46-47頁",
    "page": 46,
    "status": "published"
  },
  {
    "id": 143,
    "name": "紫菜",
    "scientificName": "紅毛菜科植物紫菜的乾燥葉狀體",
    "pinyin": "紫菜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第47頁"
      }
    ],
    "family": "藻類海產蔬菜",
    "partsUsed": "藻類海產蔬菜",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第47頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "紫菜",
      "藻類海產蔬菜"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘",
      "鹹"
    ],
    "channels": [
      "肺",
      "腎"
    ],
    "efficacy": "軟堅化痰，利水通淋，清熱降壓，補腎養心。富含碘質、蛋白質與微量元素。 癭瘤瘰癧、甲狀腺腫、水腫淋病、腳氣、熱咳痰稠、高血壓病。",
    "cautions": "海中之菜，含碘量極高，軟堅散結通淋要角。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以色紫紅而有光澤、片薄均勻、口感脆嫩無泥沙者為佳。",
    "medicinalDiet": "紫菜蛋花湯、紫菜吻仔魚湯、紫菜飯糰。",
    "sourceBook": "《藥膳學》第47頁",
    "page": 47,
    "status": "published"
  },
  {
    "id": 144,
    "name": "南瓜",
    "scientificName": "葫蘆科植物南瓜的新鮮果實及成熟種子（南瓜子）",
    "pinyin": "南瓜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第47頁"
      }
    ],
    "family": "瓜果蔬菜類",
    "partsUsed": "瓜果蔬菜類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第47頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "南瓜",
      "瓜果蔬菜類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "胃"
    ],
    "efficacy": "補中益氣，消炎止痛，利尿生津；南瓜子驅蟲消腫，保養前列腺。 脾虛氣弱、食少腹脹、百日咳、痔瘡；南瓜子治絛蟲蛔蟲、前列腺肥大、產後手足水腫。",
    "cautions": "果肉補中益氣降血糖；南瓜子配檳榔煎服為驅殺絛蟲要方。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以瓜皮堅硬老熟、果肉金黃厚實、糖分充足者為佳。",
    "medicinalDiet": "南瓜濃湯、南瓜蒸排骨、南瓜十穀米飯。",
    "sourceBook": "《藥膳學》第47頁",
    "page": 47,
    "status": "published"
  },
  {
    "id": 145,
    "name": "龍眼",
    "scientificName": "無患子科植物龍眼的假種皮（新鮮龍眼/龍眼肉/桂圓）",
    "pinyin": "龍眼",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第47頁"
      }
    ],
    "family": "果品類",
    "partsUsed": "果品類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第47頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "龍眼",
      "果品類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "心",
      "脾"
    ],
    "efficacy": "補心安神，養血益脾，增智延壽。為抗衰老滋補名品。 思慮過度勞傷心脾、驚悸怔忡、失眠健忘、貧血萎黃、產後體虛大補。",
    "cautions": "滋補心脾養血安神之聖品，陰虛火旺或痰熱內盛者慎服。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以肉厚、色棕黃半透明、味極甘甜、乾爽不黏手者為佳。",
    "medicinalDiet": "桂圓紅棗茶、桂圓蓮子粥、桂圓麻油煎蛋。",
    "sourceBook": "《藥膳學》第47頁",
    "page": 47,
    "status": "published"
  },
  {
    "id": 146,
    "name": "葡萄",
    "scientificName": "葡萄科植物葡萄的成熟果實",
    "pinyin": "葡萄",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第47頁"
      }
    ],
    "family": "果品類",
    "partsUsed": "果品類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第47頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "葡萄",
      "果品類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "酸"
    ],
    "channels": [
      "肺",
      "脾",
      "腎"
    ],
    "efficacy": "補氣血，強筋骨，健脾胃，利小便，安胎通淋。 氣血虛弱、肺虛咳嗽、心悸盜汗、風濕痹痛、小便淋澀、妊娠水腫胎動。",
    "cautions": "富含白藜蘆醇與花青素，抗氧化、護心血管與補血上品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以串整粒滿、果粉濃厚、色澤紫黑深艷、味甘多汁者為佳。",
    "medicinalDiet": "葡萄乾桂圓粥、鮮葡萄汁、紅酒浸洋蔥。",
    "sourceBook": "《藥膳學》第47頁",
    "page": 47,
    "status": "published"
  },
  {
    "id": 147,
    "name": "蘋果",
    "scientificName": "薔薇科植物蘋果的成熟果實",
    "pinyin": "蘋果",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第47-48頁"
      }
    ],
    "family": "果品類",
    "partsUsed": "果品類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第47-48頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "蘋果",
      "果品類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "酸"
    ],
    "channels": [
      "脾",
      "肺"
    ],
    "efficacy": "生津止渴，潤肺除煩，健脾開胃，解暑醒酒，分解脂肪，軟化血管。 中氣不足、消化不良、輕度腹瀉與便秘雙向調節、煩熱口渴、高血壓病。",
    "cautions": "果膠生吃通便、蒸熟止瀉；每日一蘋果，排毒又降膽固醇。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以果形端正、色澤紅潤、手感重、果皮無病斑者為佳。",
    "medicinalDiet": "肉桂蘋果茶、蘋果銀耳排骨湯、蒸蘋果。",
    "sourceBook": "《藥膳學》第47-48頁",
    "page": 47,
    "status": "published"
  },
  {
    "id": 148,
    "name": "木瓜",
    "scientificName": "番木瓜科植物番木瓜",
    "pinyin": "木瓜",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第48頁"
      }
    ],
    "family": "果品類",
    "partsUsed": "果品類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第48頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "木瓜",
      "果品類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "酸"
    ],
    "channels": [
      "肝",
      "脾",
      "胃"
    ],
    "efficacy": "平肝和胃，去濕舒筋，健脾消食，通乳抗痙攣。 吐瀉轉筋、風濕痹痛、腳氣水腫、食少消化不良、婦女產後缺乳。",
    "cautions": "含木瓜蛋白酶，分解肉類蛋白質極佳，通乳舒筋名膳原料。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以果肉厚實、色橙黃、香氣濃、甘甜多汁者為佳。",
    "medicinalDiet": "青木瓜燉排骨湯、木瓜燉雪蛤、木瓜鮮奶。",
    "sourceBook": "《藥膳學》第48頁",
    "page": 48,
    "status": "published"
  },
  {
    "id": 149,
    "name": "核桃",
    "scientificName": "胡桃科植物胡桃的成熟種仁（胡桃仁）",
    "pinyin": "核桃",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第48-49頁"
      }
    ],
    "family": "堅果類",
    "partsUsed": "堅果類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第48-49頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "核桃",
      "堅果類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "腎",
      "肺",
      "大腸"
    ],
    "efficacy": "補腎固精，溫肺定喘，潤腸通便，補腦增智，潤膚烏髮。有「萬歲子」之稱。 腎虛腰酸腿軟、陽痿遺精、虛寒喘嗽、腸燥便秘、鬚髮早白、記憶力減退。",
    "cautions": "形似大腦，富含亞麻酸與維生素E，中醫自古推崇以形補形、健腦補腎。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以仁肉飽滿肥白、無油脂敗酸哈喇味、外膜淡黃者為佳。",
    "medicinalDiet": "核桃芝麻黑豆糊、核桃燉豬腰、琥珀核桃仁。",
    "sourceBook": "《藥膳學》第48-49頁",
    "page": 48,
    "status": "published"
  },
  {
    "id": 150,
    "name": "栗子",
    "scientificName": "殼斗科植物板栗",
    "pinyin": "栗子",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第48頁"
      }
    ],
    "family": "堅果類",
    "partsUsed": "堅果類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第48頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "栗子",
      "堅果類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "胃",
      "腎"
    ],
    "efficacy": "養胃健脾，補腎強筋，活血止血。被稱為「腎之果」。 脾胃虛寒泄瀉、反胃、腎虛腰痛腿腳無力、吐血衄血便血、外傷骨折。",
    "cautions": "腎之果，老人腎虛腰膝酸軟、步履蹣跚者，每日生嚼數枚極有益。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大飽滿、外殼紫褐有光澤、果仁金黃甜糯者為佳。",
    "medicinalDiet": "栗子炆土雞、栗子茯苓粥、栗子燉排骨。",
    "sourceBook": "《藥膳學》第48頁",
    "page": 48,
    "status": "published"
  },
  {
    "id": 151,
    "name": "芝麻",
    "scientificName": "胡麻科植物脂麻的乾燥成熟種子（黑芝麻/白芝麻）",
    "pinyin": "芝麻",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第49頁"
      }
    ],
    "family": "油料種子類",
    "partsUsed": "油料種子類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第49頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "芝麻",
      "油料種子類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "肝",
      "腎",
      "大腸"
    ],
    "efficacy": "滋補肝腎，養血潤燥，潤腸通便，烏髮黑髮，通乳增乳。 肝腎不足、頭暈耳鳴、鬚髮早白、病後脫髮、津枯腸燥便秘、產後缺乳。",
    "cautions": "仙家延年駐顏上品，富含不飽和脂肪酸、維生素E與鈣質。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以粒大飽滿、色漆黑（黑芝麻）、無雜質泥沙、香氣濃者為佳。",
    "medicinalDiet": "黑芝麻糊、黑芝麻核桃粥、芝麻山藥糕。",
    "sourceBook": "《藥膳學》第49頁",
    "page": 49,
    "status": "published"
  },
  {
    "id": 152,
    "name": "山楂",
    "scientificName": "薔薇科植物山里紅或山楂",
    "pinyin": "山楂",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第49頁"
      }
    ],
    "family": "消食果品類",
    "partsUsed": "消食果品類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第49頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "山楂",
      "消食果品類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "酸"
    ],
    "channels": [
      "脾",
      "胃",
      "肝"
    ],
    "efficacy": "消食健胃，行氣散瘀，化濁降脂。尤善消化肉積油膩。 肉食積滯、脘腹脹滿、瀉痢腹痛、瘀血經閉痛經、產後瘀血、高血脂症、冠心病、動脈硬化。",
    "cautions": "消肉食積滯第一要藥，兼具擴張冠狀動脈、降膽固醇奇功。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以皮紅肉厚、氣清香、酸甜適口、核小者為佳。",
    "medicinalDiet": "山楂決明子茶、山楂洛神菊花茶、山楂陳皮茶。",
    "sourceBook": "《藥膳學》第49頁",
    "page": 49,
    "status": "published"
  },
  {
    "id": 153,
    "name": "烏梅",
    "scientificName": "薔薇科植物梅的未成熟果實經燻焙加工而成",
    "pinyin": "烏梅",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第49-50頁"
      }
    ],
    "family": "收斂果品類",
    "partsUsed": "收斂果品類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第49-50頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "烏梅",
      "收斂果品類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "酸",
      "澀"
    ],
    "channels": [
      "肝",
      "脾",
      "肺",
      "大腸"
    ],
    "efficacy": "斂肺止咳，澀腸止瀉，生津止渴，安蛔止痛。酸甘化陰。 肺虛久咳、久瀉久痢、虛熱消渴、蛔厥腹痛（膽道蛔蟲）、嘔吐乾噦。",
    "cautions": "生津解渴夏令聖品，安蛔止痛、止久咳久瀉之收澀名品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個大、肉厚、核小、色烏黑、酸味濃郁者為佳。",
    "medicinalDiet": "酸梅湯（烏梅/山楂/甘草/陳皮）、烏梅冰糖茶。",
    "sourceBook": "《藥膳學》第49-50頁",
    "page": 49,
    "status": "published"
  },
  {
    "id": 154,
    "name": "紅棗與黑棗",
    "scientificName": "鼠李科植物棗",
    "pinyin": "紅棗與黑棗",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第50頁"
      }
    ],
    "family": "補氣養血果品",
    "partsUsed": "補氣養血果品",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第50頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "紅棗與黑棗",
      "補氣養血果品"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "胃"
    ],
    "efficacy": "補脾和胃，益氣生津，調營衛，養血安神。紅棗偏補脾養心安神，黑棗偏補脾養腎補血。 脾胃虛弱、食少便溏、氣血不足、倦怠心悸、臟躁、調和劇烈藥性。",
    "cautions": "藥膳中不可或缺之天然甜味滋補品；紅棗補心脾，黑棗補肝腎。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以肉厚核小、皮色光亮、甜味純正者為佳。",
    "medicinalDiet": "紅棗枸杞茶、黑棗燉排骨、紅棗蒸南瓜。",
    "sourceBook": "《藥膳學》第50頁",
    "page": 50,
    "status": "published"
  },
  {
    "id": 155,
    "name": "花生",
    "scientificName": "豆科植物落花生",
    "pinyin": "花生",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第50頁"
      }
    ],
    "family": "堅果種子類",
    "partsUsed": "堅果種子類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第50頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "花生",
      "堅果種子類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "肺"
    ],
    "efficacy": "潤肺化痰，溫中和胃，健脾利水，理氣通乳。富含白藜蘆醇與蛋白質。 燥咳少痰、反胃反酸、腳氣水腫、婦女產後缺乳。有「長生果」之稱。",
    "cautions": "紅衣能升高血小板、止血；發霉花生嚴禁食用以免黃麴毒素傷肝。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以顆粒飽滿、紅衣完整、無受潮發霉（無黃麴毒素）者為佳。",
    "medicinalDiet": "花生豬腳湯（通乳良方）、花生燉紅棗、花生眉豆湯。",
    "sourceBook": "《藥膳學》第50頁",
    "page": 50,
    "status": "published"
  },
  {
    "id": 156,
    "name": "番薯",
    "scientificName": "旋花科植物番薯的地下肉質塊根（地瓜/甘薯）",
    "pinyin": "番薯",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第50頁"
      }
    ],
    "family": "根莖薯類",
    "partsUsed": "根莖薯類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第50頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "番薯",
      "根莖薯類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "腎"
    ],
    "efficacy": "補中和血，益氣生津，寬腸胃，通便秘。富含綠原酸與膳食纖維。 脾虛氣弱、大便秘結、津少口渴、小兒疳積、高血壓動脈硬化預防。",
    "cautions": "通便排毒之天然益腸食品，與生薑、紅糖同煲暖胃又暢腑。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以個頭勻稱、皮色鮮豔、質堅實、無黑斑腐爛者為佳。",
    "medicinalDiet": "番薯生薑紅糖湯、烤地瓜、地瓜十穀米粥。",
    "sourceBook": "《藥膳學》第50頁",
    "page": 50,
    "status": "published"
  },
  {
    "id": 157,
    "name": "洛神花",
    "scientificName": "錦葵科植物玫瑰茄（洛神葵）",
    "pinyin": "洛神花",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第51頁"
      }
    ],
    "family": "花果茶飲類",
    "partsUsed": "花果茶飲類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第51頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "洛神花",
      "花果茶飲類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "涼",
    "taste": [
      "酸",
      "澀"
    ],
    "channels": [
      "心",
      "肺",
      "胃"
    ],
    "efficacy": "清熱解暑，生津止渴，消食開胃，利尿降壓，解酒醉。富含花青素與原兒茶酸。 暑熱煩渴、肺虛咳嗽、高血壓病、高血脂症、食積腹脹、醉酒不醒。",
    "cautions": "天然紅寶石茶飲，抗氧化、保護心血管與消除暑熱疲勞之良品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以色紫紅鮮亮、肉質肥厚、花萼完整、酸味濃純者為佳。",
    "medicinalDiet": "洛神山楂茶、洛神花果醬、洛神冰糖飲。",
    "sourceBook": "《藥膳學》第51頁",
    "page": 51,
    "status": "published"
  },
  {
    "id": 158,
    "name": "綠豆",
    "scientificName": "豆科植物綠豆的成熟種子",
    "pinyin": "綠豆",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第51頁"
      }
    ],
    "family": "豆類",
    "partsUsed": "豆類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第51頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "綠豆",
      "豆類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘"
    ],
    "channels": [
      "心",
      "胃"
    ],
    "efficacy": "清熱解毒，消暑除煩，止渴利水。善解百毒（附子、巴豆、重金屬等）。 暑熱煩渴、水腫淋病、瘡癰腫毒、食物中毒、藥物中毒。",
    "cautions": "綠豆皮偏於清熱解暑，綠豆肉偏於解毒解藥毒；服溫補中藥時宜隔開。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以顆粒飽滿、色翠綠、無蟲蛀、煮之易爛者為佳。",
    "medicinalDiet": "綠豆薏仁湯、綠豆百合蓮子湯、綠豆海帶排骨湯。",
    "sourceBook": "《藥膳學》第51頁",
    "page": 51,
    "status": "published"
  },
  {
    "id": 159,
    "name": "黑豆",
    "scientificName": "豆科植物大豆的黑色種子（烏豆）",
    "pinyin": "黑豆",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第51頁"
      }
    ],
    "family": "豆類",
    "partsUsed": "豆類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第51頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "黑豆",
      "豆類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "腎"
    ],
    "efficacy": "補腎益陰，健脾利濕，除熱解毒，活血祛風，烏髮黑髮。 腎虛陰虧、消渴多飲、小便頻數、頭暈目暗、鬚髮早白、腳氣水腫、腰痛痹攣。",
    "cautions": "黑入腎，補腎陰、生精血首選豆類；青仁黑豆滋補藥力更勝黃仁。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以顆粒均勻、圓潤黑亮、破開內部青綠（青仁黑豆）者為上品。",
    "medicinalDiet": "黑豆杜仲排骨湯、何首烏黑豆燉雞、黑豆茶。",
    "sourceBook": "《藥膳學》第51頁",
    "page": 51,
    "status": "published"
  },
  {
    "id": 160,
    "name": "黃豆與豆腐",
    "scientificName": "豆科植物大豆",
    "pinyin": "黃豆與豆腐",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第51-52頁"
      }
    ],
    "family": "豆類及豆製品",
    "partsUsed": "豆類及豆製品",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第51-52頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "黃豆與豆腐",
      "豆類及豆製品"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "胃",
      "大腸"
    ],
    "efficacy": "健脾利濕，益氣補虛，解毒生肌；豆腐清熱潤燥、生津解毒、和脾胃。 消瘦虛弱、貧血、營養不良、胃火口臭、便秘；富含大豆異黃酮抗衰老。",
    "cautions": "植物肉代表，植物蛋白與大豆異黃酮極佳來源，降血脂又防骨質疏鬆。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以顆粒飽滿、色金黃純淨、無雜質黴爛者為佳。",
    "medicinalDiet": "黃豆豬腳湯、香菇燉豆腐、黑芝麻豆腐羹。",
    "sourceBook": "《藥膳學》第51-52頁",
    "page": 51,
    "status": "published"
  },
  {
    "id": 161,
    "name": "米醋",
    "scientificName": "穀物（以糯米、高粱或小麥等）經發酵釀造而成",
    "pinyin": "米醋",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第53頁"
      }
    ],
    "family": "調味發酵類",
    "partsUsed": "調味發酵類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第53頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "米醋",
      "調味發酵類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "酸"
    ],
    "channels": [
      "肝",
      "胃"
    ],
    "efficacy": "祛脂降壓，降低膽固醇，消食和中，散瘀解毒，解酒，安神除煩。 食積腹脹、肉食過多、高血壓病、高血脂、動脈硬化、肝炎、蛔厥腹痛。",
    "cautions": "酸入肝經，軟化血管、消除疲勞促進血液循環之調味聖藥。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以釀造米醋、色黃澄澈、香酸醇厚、回味回甘者為佳。",
    "medicinalDiet": "薑汁黑豆醋、醋泡花生、蘋果醋沙拉。",
    "sourceBook": "《藥膳學》第53頁",
    "page": 53,
    "status": "published"
  },
  {
    "id": 162,
    "name": "羊肉",
    "scientificName": "牛科動物山羊或綿羊的肉",
    "pinyin": "羊肉",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第53頁"
      }
    ],
    "family": "禽畜肉類",
    "partsUsed": "禽畜肉類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第53頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "羊肉",
      "禽畜肉類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "腎"
    ],
    "efficacy": "補虛勞，祛寒冷，溫補氣血，益腎氣，助元陽，補益產婦，通乳治帶。 腎虛腰膝酸痛、陽痿精衰、形瘦畏寒、病後虛寒、產婦腹痛虛寒、產後無乳。",
    "cautions": "冬季溫補第一肉食，暖中祛寒之聖品；陰虛火旺或熱病初起忌服。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以肉質鮮紅、脂肪潔白、彈性緊實、羶氣自然清純者為佳。",
    "medicinalDiet": "當歸生薑羊肉湯、枸杞燉羊肉、蓯蓉羊肉湯。",
    "sourceBook": "《藥膳學》第53頁",
    "page": 53,
    "status": "published"
  },
  {
    "id": 163,
    "name": "海參",
    "scientificName": "刺參科或海參科棘皮動物海參的乾燥體",
    "pinyin": "海參",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第53頁"
      }
    ],
    "family": "海產水產類",
    "partsUsed": "海產水產類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第53頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "海參",
      "海產水產類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "鹹"
    ],
    "channels": [
      "腎",
      "心",
      "大腸"
    ],
    "efficacy": "補腎益精，養血潤燥，生肌止血，延緩衰老。高蛋白、低脂肪、低膽固醇。 精血虧損、虛弱勞怯、陽痿遺精、小便頻數、腸燥便艱、咯血便血、高血壓肝炎老人調理。",
    "cautions": "海中人參，補腎精而不燥熱，極宜病後老人滋補與抗衰老。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以體形完整、刺尖挺立、肉厚堅實、無雜質砂石者為上品（刺參尤良）。",
    "medicinalDiet": "蔥燒海參、海參枸杞小米粥、海參當歸燉烏雞。",
    "sourceBook": "《藥膳學》第53頁",
    "page": 53,
    "status": "published"
  },
  {
    "id": 164,
    "name": "鯉魚",
    "scientificName": "鯉科動物鯉魚的新鮮肉",
    "pinyin": "鯉魚",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第53-54頁"
      }
    ],
    "family": "海產水產類",
    "partsUsed": "海產水產類",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第53-54頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "鯉魚",
      "海產水產類"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "腎",
      "胃"
    ],
    "efficacy": "補脾健胃，利水消腫，通乳下乳，清熱解毒，止嗽下氣，安胎。 脾虛水腫、腳氣黃疸、腹水癃閉、氣血不足乳少、孕婦水腫胎動不安。",
    "cautions": "利水消腫與通乳名魚，搭配赤小豆同燉是水腫病經典食療名方。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以魚鰓鮮紅、鱗片完整光澤、肉質彈性緊實之活魚為佳。",
    "medicinalDiet": "赤小豆燉鯉魚（利水消腫名方）、白芷鯉魚湯、鯉魚冬瓜湯。",
    "sourceBook": "《藥膳學》第53-54頁",
    "page": 53,
    "status": "published"
  },
  {
    "id": 165,
    "name": "豬腦",
    "scientificName": "豬科動物豬的腦髓組織",
    "pinyin": "豬腦",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第54頁"
      }
    ],
    "family": "豬臟腑部位",
    "partsUsed": "豬臟腑部位",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第54頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "豬腦",
      "豬臟腑部位"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "寒",
    "taste": [
      "甘",
      "鹹"
    ],
    "channels": [
      "心",
      "腦",
      "腎"
    ],
    "efficacy": "補益腦髓，疏風熄風，潤澤生肌。改善記憶力減退。 頭痛、眩暈、失眠、神經衰弱、手足皸裂、癰腫凍瘡。（高血脂與動脈硬化者不宜過食）。",
    "cautions": "中醫以腦補腦之代表，治頭痛眩暈及神經衰弱，需挑淨血絲。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以新鮮白淨、無血污血塊、質地細嫩不散爛者為佳。",
    "medicinalDiet": "天麻燉豬腦（天麻3-5錢加豬腦一副隔水清燉）、川芎白芷燉豬腦。",
    "sourceBook": "《藥膳學》第54頁",
    "page": 54,
    "status": "published"
  },
  {
    "id": 166,
    "name": "豬肝",
    "scientificName": "豬科動物豬的新鮮肝臟",
    "pinyin": "豬肝",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第54頁"
      }
    ],
    "family": "豬臟腑部位",
    "partsUsed": "豬臟腑部位",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第54頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "豬肝",
      "豬臟腑部位"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘",
      "苦"
    ],
    "channels": [
      "肝"
    ],
    "efficacy": "補肝，養血，明目。富含鐵質、維生素A與蛋白質。 血虛萎黃、夜盲眼乾、目赤昏花、浮腫、疲勞過度引起的肝功能衰退。",
    "cautions": "以肝補肝、養血補鐵明目聖品，烹調宜熟透。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以色澤褐紅均勻、表面光澤潤滑、無硬結腫塊水泡者為佳。",
    "medicinalDiet": "菠菜豬肝湯、枸杞葉豬肝湯、麻油豬肝。",
    "sourceBook": "《藥膳學》第54頁",
    "page": 54,
    "status": "published"
  },
  {
    "id": 167,
    "name": "豬心",
    "scientificName": "豬科動物豬的心臟組織",
    "pinyin": "豬心",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第54-55頁"
      }
    ],
    "family": "豬臟腑部位",
    "partsUsed": "豬臟腑部位",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第54-55頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "豬心",
      "豬臟腑部位"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "鹹"
    ],
    "channels": [
      "心"
    ],
    "efficacy": "補虛，安神定驚，養心補血。治心氣虛衰、心神恍惚。 驚悸怔忡、自汗失眠、神志恍惚、心跳心悸不寧。",
    "cautions": "以心補心，配合酸棗仁、茯神、柏子仁同燉，善治心悸失眠。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以新鮮呈暗紅色、質地堅實、心腔內血塊洗淨者為佳。",
    "medicinalDiet": "酸棗仁百合燉豬心、丹參燉豬心、當歸燉豬心湯。",
    "sourceBook": "《藥膳學》第54-55頁",
    "page": 54,
    "status": "published"
  },
  {
    "id": 168,
    "name": "豬肚",
    "scientificName": "豬科動物豬的胃部組織",
    "pinyin": "豬肚",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第55頁"
      }
    ],
    "family": "豬臟腑部位",
    "partsUsed": "豬臟腑部位",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第55頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "豬肚",
      "豬臟腑部位"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "溫",
    "taste": [
      "甘"
    ],
    "channels": [
      "脾",
      "胃"
    ],
    "efficacy": "補虛損，健脾胃。增進消化吸收功能。 虛勞瘦弱、胃寒泄瀉、下痢、消渴、小便頻數、小兒疳積、體虛納呆。",
    "cautions": "溫補脾胃要角，加白胡椒同燉是改善胃寒腹痛與消化不良之絕妙名品。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以厚實、色白微黃、質韌有彈性、黏膜洗滌潔淨無臭味者為佳。",
    "medicinalDiet": "白胡椒燉豬肚湯（豬肚一副加白胡椒3錢）、四神豬肚湯、黃耆燉豬肚。",
    "sourceBook": "《藥膳學》第55頁",
    "page": 55,
    "status": "published"
  },
  {
    "id": 169,
    "name": "豬肺",
    "scientificName": "豬科動物豬的肺臟組織",
    "pinyin": "豬肺",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第55頁"
      }
    ],
    "family": "豬臟腑部位",
    "partsUsed": "豬臟腑部位",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第55頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "豬肺",
      "豬臟腑部位"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "肺"
    ],
    "efficacy": "補肺，止咳，止血。調養呼吸道機能。 肺虛咳嗽、久咳咯血、氣管功能不佳、容易感冒咳嗽。",
    "cautions": "以肺補肺，與粉光參或百合同燉，大幅改善氣管虛弱與久咳。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以粉紅色、無硬結斑點、灌水沖洗乾淨至潔白者為佳。",
    "medicinalDiet": "粉光參燉豬肺、川貝杏仁雪梨燉豬肺、百合豬肺湯。",
    "sourceBook": "《藥膳學》第55頁",
    "page": 55,
    "status": "published"
  },
  {
    "id": 170,
    "name": "豬腎 (豬腰子)",
    "scientificName": "豬科動物豬的腎臟器官（豬腰子）",
    "pinyin": "豬腎 (豬腰子)",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第55頁"
      }
    ],
    "family": "豬臟腑部位",
    "partsUsed": "豬臟腑部位",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第55頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "豬腎 (豬腰子)",
      "豬臟腑部位"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘",
      "鹹"
    ],
    "channels": [
      "腎"
    ],
    "efficacy": "和理腎氣，通利膀胱，補腎強腰。作用平和溫潤。 腎虛腰痛、身面水腫、遺精、盜汗、老人耳聾耳鳴、腰膝酸軟。",
    "cautions": "補腎強腰名品，去淨內部白色臊腺，與杜仲配伍是預防腰酸背痛良方。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以表面光滑、淡紅褐色、質嫩緊實、去除白色筋膜臊腺者為佳。",
    "medicinalDiet": "杜仲燉豬腰（杜仲2錢同煮）、麻油炒腰花、枸杞燉豬腰。",
    "sourceBook": "《藥膳學》第55頁",
    "page": 55,
    "status": "published"
  },
  {
    "id": 171,
    "name": "豬腳筋",
    "scientificName": "豬科動物豬腿部的肌腱組織（豬蹄筋）",
    "pinyin": "豬腳筋",
    "dialectNames": [
      {
        "dialect": "出處",
        "name": "《藥膳學》第56頁"
      }
    ],
    "family": "豬臟腑部位",
    "partsUsed": "豬臟腑部位",
    "activeCompounds": [
      "多醣類",
      "揮發油",
      "微量元素",
      "天然胺基酸"
    ],
    "harvestSeason": "四季常備食材",
    "terroir": "《藥膳學》第56頁 · 第三章 藥膳常用食材介紹",
    "region": "全島 (日常餐桌與藥膳食補)",
    "folkApplication": "日常藥膳食療與燉補",
    "safetyLevel": "衛福部可供食品使用 / 溫和食療",
    "solarTermRecommendation": "四季皆宜",
    "commonNames": [
      "豬腳筋",
      "豬臟腑部位"
    ],
    "category": "藥膳食療名著典藏",
    "nature": "平",
    "taste": [
      "甘"
    ],
    "channels": [
      "肝",
      "腎"
    ],
    "efficacy": "養血益肝，強筋壯骨，補腰健膝，舒筋活絡。富含膠原蛋白。 關節酸痛、手腳無力、腰膝酸軟、容易扭傷拉傷、筋絡弛緩。",
    "cautions": "膠原蛋白極為豐富，能強筋骨、增腿力，改善容易扭到筋骨的症狀。",
    "dailyDosage": "藥膳煲湯 10-30g，或依食譜份量。",
    "traditionalProcessing": "以色澤白潤微黃、半透明、無腐味、水發後爽脆韌滑者為佳。",
    "medicinalDiet": "黃耆川七燉豬腳筋（川七5錢、黃耆5錢同蒸）、紅燒蹄筋、杜仲蹄筋湯。",
    "sourceBook": "《藥膳學》第56頁",
    "page": 56,
    "status": "published"
  }
];

module.exports = initialHerbs;
