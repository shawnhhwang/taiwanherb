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
];

module.exports = initialHerbs;
