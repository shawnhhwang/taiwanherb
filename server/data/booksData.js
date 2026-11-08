/**
 * server/data/booksData.js
 * 臺灣本草植物誌 · 草木書閣書籍資料庫種子
 * 包含經典本草書籍、最新入庫臺灣鄉野藥用植物專著、線上試閱章節與初始訂單資料
 */

const initialBooks = [
  {
    "id": "book_wanhua_classic",
    "title": "萬華百年青草茶香",
    "subtitle": "西昌街老茶師的四時退火秘笈與常民生活草木方",
    "author": "林萬吉 老茶師",
    "authorRole": "萬華西昌街百年青草巷第三代傳人",
    "category": "tea_culture",
    "categoryName": "青草茶文化",
    "coverBadge": "百年經典",
    "coverColor": "#2d6a4f",
    "coverIcon": "🍵",
    "isbn": "978-986-041-882-1",
    "publisher": "艋舺風土文化出版社",
    "publishDate": "2024-06-15",
    "pages": 268,
    "rating": 4.9,
    "reviewCount": 142,
    "tags": [
      "退火清熱",
      "萬華西昌街",
      "百年古法",
      "青草茶配方",
      "君臣佐使"
    ],
    "summary": "艋舺西昌街青草巷，全臺灣最具風土記憶的草藥街市。本書由西昌街第三代老茶師林萬吉親自口述撰著，完整公開大花咸豐草、鳳尾草、六角英與薄荷之四時調配秘辛，解密古法熬茶如何「君臣相佐、佐使護中」，讓苦茶入口甘潤、常民消暑不傷脾胃。",
    "tableOfContents": [
      "第一章：艋舺西昌街的青草歲月與百年地景",
      "第二章：辨認島嶼退火三寶——咸豐草、鳳尾草與車前草",
      "第三章：古法青草茶熬煮心法——火候、水質與君臣佐使",
      "第四章：春夏秋冬四時節氣養生青草飲品",
      "第五章：市井青草茶攤的民間傳承故事"
    ],
    "pricing": {
      "physical": {
        "price": 450,
        "originalPrice": 520,
        "stock": 36,
        "format": "精裝 16 開 · 全彩特銅紙印製",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 290,
        "originalPrice": 380,
        "format": "EPUB / 向量全彩 PDF (支援跨載具即時雲端閱讀)",
        "instantAccess": true
      },
      "bundle": {
        "price": 580,
        "originalPrice": 900,
        "discountDesc": "實體典藏本 + 電子書終身授權 · 享 64 折合購超值特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：艋舺西昌街的青草歲月 & 第三章熬茶心法精要",
      "previewSubtitle": "精選萬華老街風土紀實與老茶師親傳之青草茶武火文火三候法",
      "readTimeMinutes": 8,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "序言與第一章：艋舺西昌街的青草歲月",
          "content": "### 序言：大火煮水，小火化苦\n\n我十一歲那年，老艋舺的夏日還沒有冷氣。正中午太陽把西昌街紅磚曬得發燙，店門口一口直徑三尺的大銅鍋滾著熱氣，滿街都是苦涼微甘的藥草香。\n\n父親拿著大竹杓攪動滿鍋的大花咸豐草與鳳尾草，對我說：「萬吉啊，煮青草茶不只是把草丟進熱水裡。草木有靈，天生帶有土地的烈性。君藥主攻退火，臣藥輔助宣透，若沒有甘草與薄荷作佐使，大苦大寒進了肚子，只會傷了常民百姓的脾胃。」\n\n這句話，我記了整整六十年。\n\n#### 西昌街的風土根脈\n萬華在淡水河畔，是北部草藥集散的最前線。早期三峽、淡水、新店山區採草人天未亮便挑著濕淋淋的鮮草進城。咸豐草生於荒野田埂，吸飽日光，性微寒能清熱；鳳尾草生於幽陰井邊，性寒能涼血。先民在潮濕悶熱的島嶼氣候中勞動，青草茶便是最道地的生命之水。"
        },
        {
          "chapterId": "ch3",
          "title": "第三章精選：古法青草茶熬煮三候法（君臣佐使調和）",
          "content": "### 熬煮心法：君臣佐使在茶釜中的轉化\n\n很多人問老茶師：「為什麼家裡煮的青草茶苦澀難以下嚥，青草街煮的卻能留香回甘？」關鍵在於「君臣佐使」的比例與熬煮時序。\n\n#### 一、配伍法度\n* **君藥（大花咸豐草 40%）**：全方靈魂，直攻體內鬱熱。\n* **臣藥（鳳尾草 28%）**：輔翼君藥，清血熱、去濕滯。\n* **佐藥（枸杞子或微量紫蘇 18%）**：**佐制寒性**，護衛脾胃陽氣，防止腹瀉。\n* **使藥（甘草 14%）**：國老調和百藥，引藥歸經，賦予茶湯天然蜜甜。\n\n#### 二、三候煎煮時序\n1. **武火急沸（5-8 分鐘）**：水沸後投入洗淨之鮮草或乾草，大火滾煮，逼出輕揚之芳香揮發油。\n2. **文火細熬（20-30 分鐘）**：轉微滾文火，讓木質莖與厚葉深層之多酚微量成分慢慢析出入水。\n3. **熄火悶香（10 分鐘）**：關火加蓋，待藥草下沉，香氣回鎖茶湯中。濾渣後溫涼飲用，甘美回甘。"
        }
      ],
      "previewNotice": "線上試閱篇章已告一段落。全書共五章二十八節，包含全套 24 道傳統青草茶古方配比，欲閱讀全本請選購實體書或電子書！"
    }
  },
  {
    "id": "book_hakka_herbal_lore",
    "title": "客庄常民青草經",
    "subtitle": "彭秀妹阿婆的野草沐浴、紫蘇暖胃與客家山林生活智慧",
    "author": "彭秀妹 老藥師",
    "authorRole": "苗栗客庄草藥研究會耆老兼草藥沐浴實踐者",
    "category": "indigenous_folk",
    "categoryName": "原鄉民俗",
    "coverBadge": "客庄智慧",
    "coverColor": "#b45309",
    "coverIcon": "👵",
    "isbn": "978-986-041-893-7",
    "publisher": "獅潭山林文史工作室",
    "publishDate": "2023-11-20",
    "pages": 232,
    "rating": 4.8,
    "reviewCount": 98,
    "tags": [
      "客家青草",
      "野草沐浴",
      "抹草避邪",
      "紫蘇暖胃",
      "民俗生活"
    ],
    "summary": "苗栗丘陵客家庄，老一輩客家人懂得「拔一株野草，解一家寒暑」。彭秀妹阿婆用溫暖親切的客庄口吻，娓娓道來抹草、艾草、大風草之洗浴辟邪傳承，以及紫蘇炒蛋暖胃、香茅煮水驅寒之生活藥膳方。是一本滿懷泥土芬芳與長輩慈愛的常民植物誌。",
    "tableOfContents": [
      "第一章：客庄丘陵邊的野草童年與阿婆的菜園",
      "第二章：洗身辟邪三草——艾草、抹草與大風草之民俗儀軌",
      "第三章：後院紫蘇與生薑——客家婦女做月子與暖中妙法",
      "第四章：夏採魚腥草，秋曬假酸漿——季節採集的客庄時序",
      "第五章：客家草藥茶湯與常民點心手作"
    ],
    "pricing": {
      "physical": {
        "price": 420,
        "originalPrice": 480,
        "stock": 25,
        "format": "平裝 18 開 · 手感再生環保紙印製",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 260,
        "originalPrice": 350,
        "format": "EPUB / PDF 雙格式電子書",
        "instantAccess": true
      },
      "bundle": {
        "price": 520,
        "originalPrice": 830,
        "discountDesc": "實體紙本書 + 電子書即時閱讀 · 現省 310 元"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：野草童年 & 第二章辟邪三草沐浴配伍",
      "previewSubtitle": "阿婆親述：客家人帶小孩如何用艾草、抹草洗身安神定驚",
      "readTimeMinutes": 7,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "序章：阿妹阿弟，屋後山邊全是寶",
          "content": "### 阿婆的話：拔草要識草，草草有神明\n\n在我們客家話裡，草藥常叫做「山青」或「野草」。鄉下地方以前沒有大西藥房，頭暈發熱、孩子夜啼啼哭，阿婆走進後山草叢裡，抓幾把葉子在手心搓一搓，一聞氣味就知道對不對症。\n\n草長在石縫裡，天生帶著客家人硬頸打拼的硬氣。艾草性溫微辛，能驅寒濕；抹草葉尖如心，香氣清冽能安神。這些不是迷信，是幾百年來客家祖先在山林間與蚊蟲濕氣周旋累積下來的血脈經驗。"
        },
        {
          "chapterId": "ch2",
          "title": "第二章精選：客家避邪安神洗身包秘方",
          "content": "### 民俗三草洗浴包之君臣配伍\n\n小孩去墳山受驚、晚上哭鬧不停，或是出遠門剛回到家，阿婆便會包一帖「洗身草」：\n\n* **君（抹草 15g）**：香氣芳烈，民俗相傳能定魂辟穢，主治心神不寧。\n* **臣（艾草 12g）**：溫通經絡，散寒行氣，讓肌膚微溫發汗。\n* **佐（大風草或香茅 10g）**：行氣活血，驅除山嵐風寒濕氣。\n* **使（芙蓉葉 5g）**：引藥透肌，潤澤毛孔，清香怡人。\n\n#### 煮水外洗方法：\n將四味藥草裝入棉布袋中，加入清水 3,000 毫升，武火沸煮 10 分鐘，將青綠溫潤的藥湯倒入浴盆。待水溫降至 38-40 度時沐浴洗擦背脊與四肢，浴後神清氣爽，安穩入眠。"
        }
      ],
      "previewNotice": "線上試閱完畢！全書收錄 18 道客庄草藥日常洗浴與藥膳手作，購買電子書即可立即在線閱讀全本！"
    }
  },
  {
    "id": "book_taiwan_flora_field_guide",
    "title": "臺灣野生本草圖鑑全書",
    "subtitle": "全島 70 味常用藥用植物生境探索、植物特徵與圖解鑑別指南",
    "author": "臺灣本草研究學會 編著",
    "authorRole": "臺灣植物分類學者與民俗草藥調查小組共同編審",
    "category": "terroir_field",
    "categoryName": "野外圖鑑",
    "coverBadge": "權威鑑定",
    "coverColor": "#1e3a8a",
    "coverIcon": "🌿",
    "isbn": "978-986-041-901-9",
    "publisher": "國家植物地理學會",
    "publishDate": "2024-03-01",
    "pages": 384,
    "rating": 5,
    "reviewCount": 215,
    "tags": [
      "植物圖鑑",
      "生境分布",
      "野外採集",
      "高解析圖解",
      "學名檢索"
    ],
    "summary": "歷時五年踏遍台灣海岸、平原、丘陵至高山，完整收錄 70 味臺灣常用藥用植物。以國際植物學標準呈現拉丁學名、科屬、性味歸經、化學成分、生態棲地分布與安全辨識特徵，特別收錄容易混淆之有毒假草辨偽圖解，是野外採集與草本愛好者案頭必備工具書。",
    "tableOfContents": [
      "導言：臺灣島嶼生物多樣性與藥用植物地理分區",
      "第一單元：荒地與田埂野草篇（大花咸豐草、雷公根、車前草等 20 味）",
      "第二單元：林緣與丘陵灌木篇（黃花蜜菜、白鶴靈芝、左手香等 18 味）",
      "第三單元：濕地與溪畔水生本草篇（魚腥草、半枝蓮、水丁香等 16 味）",
      "第四單元：中高山原鄉藥用植物篇（刺蔥、土人參、假酸漿等 16 味）",
      "附錄：臺灣常見有毒植物辨偽避坑指南"
    ],
    "pricing": {
      "physical": {
        "price": 680,
        "originalPrice": 800,
        "stock": 45,
        "format": "特裝精裝防水野外硬殼本 · 全彩微距微噴印製",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 420,
        "originalPrice": 560,
        "format": "高畫質向量可縮放 PDF + EPUB3 (支援植物學名全文檢索)",
        "instantAccess": true
      },
      "bundle": {
        "price": 880,
        "originalPrice": 1360,
        "discountDesc": "防水硬殼野外實體書 + 高清檢索電子書合購特惠 65 折"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】導言：島嶼植物分區 & 荒地之王「大花咸豐草」微距解密",
      "previewSubtitle": "植物學者專業圖解：如何從舌狀花、瘦果與葉緣鋸齒確認正品",
      "readTimeMinutes": 10,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "導言：臺灣本草的三維立體風土生態",
          "content": "### 臺灣本草的風土基因\n\n臺灣面積僅三萬六千平方公里，卻跨越熱帶、亞熱帶至溫帶寒帶，海拔落差接近四千公尺。\n\n* **北部河谷盆地**：多雨高濕，酸性土壤孕育大花咸豐草、鳳尾草之清熱利濕群落。\n* **中部彰化南投**：日照充足，紅壤丘陵成就艾草、香茅之芳香揮發油含量頂峰。\n* **東部花東縱谷**：受太平洋黑潮水氣吹拂，土壤純淨無污染，野生假酸漿與台灣藜抗氧化酚類極高。"
        },
        {
          "chapterId": "ch2",
          "title": "物種詳解 01：大花咸豐草 (Bidens pilosa var. radiata)",
          "content": "### 物種分類與鑑定要點\n\n* **中文正名**：大花咸豐草\n* **學名**：*Bidens pilosa* L. var. *radiata* Sch. Bip.\n* **科名**：菊科 (Asteraceae)\n* **俗名**：鬼針草、同治草、白花婆婆針、恰某（台語）\n\n#### 生態辨識特徵\n1. **花序特徵**：頭狀花序邊緣具白色舌狀花 5-8 枚，花冠較大長度大於 1cm，與本地原生咸豐草之無舌狀花或微小舌狀花有顯著區別。\n2. **果實特徵**：瘦果黑褐色，具倒刺芒 2-3 枚，極易附著於衣物傳播種子。\n3. **藥用部位**：全草乾燥或鮮用。性涼、味微苦甘，歸肝、胃、大腸經。"
        }
      ],
      "previewNotice": "線上試閱到此結束。欲查閱全書 70 味高畫質本草剖面圖、微距照與採集座標指引，請購買實體或電子書！"
    }
  },
  {
    "id": "book_biotech_pharma_dialogue",
    "title": "生化與草本的對話：臺灣本草三十載考證錄",
    "subtitle": "鹿港望族仁心濟世篇章 · 上百部專著精選與現代藥用植物生藥學實踐",
    "author": "黃世勳 教授 / 藥學博士",
    "authorRole": "中國醫藥大學 藥學院藥學系 教授・前系主任 / 中華藥用植物學會與慈善社團理事長",
    "category": "biotech_science",
    "categoryName": "科學機轉",
    "coverBadge": "🎓 產學合作巨著",
    "coverColor": "#4338ca",
    "coverIcon": "🎓",
    "collaborationNotice": "本專案與黃世勳教授產學合作共同策劃之生藥考證專著",
    "isbn": "978-986-041-912-5",
    "publisher": "中國醫藥大學學術典藏出版",
    "publishDate": "2024-05-10",
    "pages": 360,
    "rating": 5,
    "reviewCount": 168,
    "tags": [
      "鹿港望族",
      "三十載本草踏查",
      "上百本專著精粹",
      "生藥學實證",
      "慈善仁心"
    ],
    "summary": "出身彰化縣鹿港鎮望族的黃世勳教授，秉承鹿港文風與仁心濟世博愛精神，深耕臺灣本草與藥用植物調查研究逾三十載，著作逾百部。本書為其三十年田野山川踏查與學術實驗之集大成，透過嚴謹本草古籍考證與現代藥理分析，解密大花咸豐草、魚腥草、白花蛇舌草等草木的分子作用路徑，兼顧傳統人文厚度與現代循證科學。",
    "tableOfContents": [
      "第一章：從「退火」到抗發炎訊號路徑——民俗概念的現代生化詮釋",
      "第二章：酚類與黃酮類化合物在臺灣野草中的富集特徵",
      "第三章：魚腥草葵醯乙醛對呼吸道黏膜屏障之防護機制",
      "第四章：大花咸豐草聚乙炔對醣代謝調節之實驗數據",
      "第五章：中草藥與現代藥物之細胞色素 P450 酵素交互作用安全指南"
    ],
    "pricing": {
      "physical": {
        "price": 520,
        "originalPrice": 600,
        "stock": 30,
        "format": "精裝 16 開 · 附全彩實驗圖譜與分子結構式",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 350,
        "originalPrice": 450,
        "format": "可搜尋 EPUB / PDF 雙版本",
        "instantAccess": true
      },
      "bundle": {
        "price": 690,
        "originalPrice": 1050,
        "discountDesc": "實驗室必備精裝實體本 + 論文引用必備電子書 · 66 折"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：「退火」概念之 NF-κB 發炎訊號路徑轉譯",
      "previewSubtitle": "科學解答：為什麼喝青草茶能迅速緩解喉嚨痛與口乾舌燥？",
      "readTimeMinutes": 9,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "第一章精要：傳統「退火」的生化分型",
          "content": "### 解構「火氣」的現代分子語言\n\n常民口中的「上火」或「火氣大」，在臨床生化指標上通常對應於微發炎狀態（Low-grade chronic inflammation）與氧化壓力（Oxidative stress）的失衡表現：\n\n1. **黏膜局部發炎**：促發炎細胞激素（TNF-α, IL-6, IL-1β）分泌增加，導致咽喉充血、牙齦腫脹。\n2. **一氧化氮合酶 (iNOS) 活化**：局部組織過量生成 NO，引起毛細血管過度擴張與灼熱感。\n3. **活性氧自由基 (ROS) 堆積**：熬夜代謝失調造成粒線體過氧化物激增，引發倦怠與口乾舌燥。\n\n#### 咸豐草與金銀花的雙重阻斷\n咸豐草提取物中所含之咖啡酸衍生物與木犀草素（Luteolin），能專一性抑制 IκBα 磷酸化，阻斷 NF-κB 轉錄因子向細胞核移位，從根本調降發炎介質基因表達，達到真正的「退火」效果。"
        }
      ],
      "previewNotice": "線上試閱完畢！欲深入探討各類化學成分與現代藥物交互作用實驗數據，請選購全書。"
    }
  },
  {
    "id": "book_bunun_hunter_herbal_trail",
    "title": "中央山脈獵人野草記",
    "subtitle": "布農族獵人的高山植物智慧、山林採集與野外生存藥草錄",
    "author": "達亥·拿憲 (Tahai Nahsien)",
    "authorRole": "花東部落高山獵人兼野菜生態文化嚮導",
    "category": "indigenous_folk",
    "categoryName": "原鄉民俗",
    "coverBadge": "山林原鄉",
    "coverColor": "#047857",
    "coverIcon": "🏹",
    "isbn": "978-986-041-923-1",
    "publisher": "南橫高山布農族文化傳承會",
    "publishDate": "2023-09-18",
    "pages": 248,
    "rating": 4.9,
    "reviewCount": 112,
    "tags": [
      "布農獵人",
      "中央山脈",
      "高山採集",
      "刺蔥驅寒",
      "獵人生存"
    ],
    "summary": "跟隨布農族資深獵人達亥的步伐，走進中央山脈南橫古道。高山森林中沒有西藥房，獵人如何用食茱萸（刺蔥）驅散高山寒氣？如何用假酸漿葉包裹獵肉消食化積？如何辨識土人參補充體能？這是一本刻印在山風與獵徑上的原住民族生態哲學與生存大典。",
    "tableOfContents": [
      "第一章：聽大山的呼吸——布農族獵人的採集戒律與感謝之禮",
      "第二章：長征山路的暖身之王——食茱萸（刺蔥）與老薑高山湯",
      "第三章：獵人飯包的綠葉護衛——假酸漿葉之葉綠素與天然助消化酶",
      "第四章：跌打損傷的野林敷貼——左手香與倒吊蓮的急救智慧",
      "第五章：守護部落山林的永續傳承法"
    ],
    "pricing": {
      "physical": {
        "price": 460,
        "originalPrice": 520,
        "stock": 32,
        "format": "平裝 18 開 · 附原鄉手繪山林動植物地圖",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 280,
        "originalPrice": 360,
        "format": "EPUB / PDF 雙格式電子書",
        "instantAccess": true
      },
      "bundle": {
        "price": 560,
        "originalPrice": 880,
        "discountDesc": "手繪地圖實體書 + 電子書隨身行 · 63 折超值合購"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：採集戒律 & 第二章刺蔥長征驅寒秘方",
      "previewSubtitle": "獵人叮嚀：只採成熟葉、留下根與種子，山神才會繼續賜福",
      "readTimeMinutes": 7,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "第一章：採集戒律——對土地永遠謙卑",
          "content": "### 獵人的第一堂課：取你所需，留下生命\n\n走進高山森林，我們不叫「採藥」，我們叫「接受山林的給予」。\n\n獵人長老教我們：看到一叢漂亮的野生刺蔥，千萬不能把頂芽連根拔起。你摘下三片老葉，留下嫩芽讓它繼續向上曬太陽；看到土人參，只挖取旁邊的旁根，主根留給大地孕育下一季的花朵。\n\n土地不是我們的倉庫，我們只是這座大山借宿的旅人。懂得分寸，草木才會在危急時救你的命。"
        },
        {
          "chapterId": "ch2",
          "title": "第二章精選：刺蔥獵人熱湯與高山驅寒法",
          "content": "### 食茱萸（刺蔥）的高山能量\n\n中央山脈稜線上，入夜氣溫驟降到攝氏零度。霧雨打在獵裝上，體溫流失會奪走人的意志。這時獵人會在石洞下升起文火，丟入隨身採擷的刺蔥嫩葉。\n\n刺蔥樹幹長滿銳刺，葉片卻帶有極其濃烈奔放的柑橘芳香與辛辣感。\n\n* **刺蔥驅寒湯做法**：以山泉水沸煮刺蔥鮮葉 10 克，投入炙烤山薑與微量食鹽，滾煮 5 分鐘熱飲。\n* **體感效果**：辛香直衝泥丸宮，周身毛孔微舒，寒氣頓消，四肢迅速回暖！"
        }
      ],
      "previewNotice": "線上試閱結束！全書收錄 20 種高山野菜採集實錄與獵人傳奇，敬請支持原鄉文化購買全本！"
    }
  },
  {
    "id": "book_seasonal_wellness_pot",
    "title": "二十四節氣常民茶方錄",
    "subtitle": "依時順氣的臺灣本草調養生活指南，全家人的一年四季溫潤茶壺",
    "author": "臺灣青草同業聯盟 專家組",
    "authorRole": "全臺青草老店傳人與漢方生活實踐小組共同策劃",
    "category": "seasonal_health",
    "categoryName": "節氣養生",
    "coverBadge": "節氣時序",
    "coverColor": "#0f766e",
    "coverIcon": "🫖",
    "isbn": "978-986-041-934-7",
    "publisher": "常民生活美學社",
    "publishDate": "2024-01-10",
    "pages": 256,
    "rating": 4.8,
    "reviewCount": 76,
    "tags": [
      "二十四節氣",
      "四季青草",
      "家庭保健",
      "茶壺煮法",
      "溫和不傷胃"
    ],
    "summary": "從立春的紫蘇發散、夏至的仙草消暑，到秋分的桑葉潤燥、冬至的狗尾草健脾燉湯。本書緊扣臺灣氣候特色與農曆二十四節氣時序，提供 24 款家庭日常茶方，不論大人小孩、體質偏寒偏燥，都能在四季轉折中找到最溫和平衡的草木芳香。",
    "tableOfContents": [
      "春之生發：立春、雨水、驚蟄、春分、清明、穀雨之疏肝理氣茶",
      "夏之長茂：立夏、小滿、芒種、夏至、小暑、大暑之清熱解暑涼水",
      "秋之收斂：立秋、處暑、白露、秋分、寒露、霜降之潤肺生津甘露",
      "冬之閉藏：立冬、小雪、大雪、冬至、小寒、大寒之溫陽健脾暖飲",
      "附錄：家庭煮茶常用器具與草藥保存保鮮秘訣"
    ],
    "pricing": {
      "physical": {
        "price": 430,
        "originalPrice": 490,
        "stock": 50,
        "format": "平裝全彩 16 開 · 特厚紙質防水覆膜",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 270,
        "originalPrice": 360,
        "format": "EPUB / 手機翻閱專屬直排版 PDF",
        "instantAccess": true
      },
      "bundle": {
        "price": 540,
        "originalPrice": 850,
        "discountDesc": "廚房茶几放一本 + 手機隨身看一本 · 63 折超值特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】春分疏肝紫蘇茶 & 夏至仙草甘草雙清涼飲",
      "previewSubtitle": "依循四時陰陽升降，讓一家老小喝得舒服又心安",
      "readTimeMinutes": 6,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "節氣茶方 04：春分 · 紫蘇薄荷疏肝飲",
          "content": "### 春分：陰陽均分，東風解凍\n\n春分時節，晝夜平分。此時肝氣旺盛，人容易春困、情緒鬱結或受春風過敏。\n\n* **方劑組成**：紫蘇葉 8g、薄荷 5g、甘草 3g、紅棗 2 枚（剖開）。\n* **配伍作用**：以紫蘇行氣散鬱為君，薄荷輕揚宣透為臣，甘草紅棗健脾養血為佐使。\n* **煮法**：水 1,200 毫升煮沸，先下紅棗煮 5 分鐘，關火前投入紫蘇與薄荷，加蓋悶 3 分鐘即可濾出。香氣撲鼻，精神清爽！"
        },
        {
          "chapterId": "ch2",
          "title": "節氣茶方 10：夏至 · 仙草黃花蜜菜雙清茶",
          "content": "### 夏至：陽極之至，盛暑生濕\n\n夏至日照最長，熱邪與濕氣相蒸，人多心煩氣躁、口渴多汗。\n\n* **方劑組成**：老仙草乾 20g、黃花蜜菜 10g、甘草 5g。\n* **配伍作用**：仙草性涼味甘，直消臟腑暑氣；黃花蜜菜清熱利濕；甘草調和，防止寒涼攻胃。\n* **煮法**：仙草乾洗淨後浸泡 15 分鐘，以 2,500 毫升水武火煮沸，轉文火慢熬 40 分鐘，熄火前 5 分鐘加入黃花蜜菜與甘草。放涼後甘甜沁涼，是全臺灣最道地的夏至甘露！"
        }
      ],
      "previewNotice": "線上試閱結束！全書包含 24 節氣完整茶譜與食材搭配，選購電子書即可立即翻閱全本！"
    }
  },
  {
    "id": "book_taiwan_countryside_herbs_vol3",
    "title": "臺灣鄉野藥用植物（第3輯）",
    "subtitle": "彩色本草大系 · 臺灣鄉野常見藥草採集辨識與臨床驗方",
    "author": "黃世勳, 洪心容",
    "authorRole": "中國醫藥大學藥學博士・教授 / 知名中醫師",
    "category": "terroir_field",
    "categoryName": "野外圖鑑",
    "coverBadge": "鄉野本草",
    "coverColor": "#2d6a4f",
    "coverIcon": "🌿",
    "isbn": "978-986-6784-13-2",
    "publisher": "文興出版",
    "publishDate": "2010-07-01",
    "pages": 236,
    "rating": 4.9,
    "reviewCount": 86,
    "tags": [
      "臺灣鄉野",
      "藥用植物",
      "野外採集",
      "臨床驗方",
      "彩色本草大系"
    ],
    "summary": "深入臺灣平原、淺山與鄉野田埂，系統記錄臺灣鄉野藥用植物之形態特徵、生育環境、採收季節、性味歸經與傳統民間驗方。全書以全彩微距圖片忠實呈現藥用植物關鍵鑑別點，是鄉野踏查與本草研究不可或缺的野外實用圖鑑。",
    "tableOfContents": [
      "第一章：臺灣鄉野藥用植物生境概論與採集準則",
      "第二章：草本藥用植物形態特徵與彩色圖解",
      "第三章：灌木及藤本藥用植物之鑑別要點",
      "第四章：民間傳統驗方與現代藥理活性分析",
      "第五章：鄉野採集安全守則與易混淆植物辨偽"
    ],
    "pricing": {
      "physical": {
        "price": 420,
        "originalPrice": 480,
        "stock": 30,
        "format": "平裝 16 開 · 全彩印刷",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 280,
        "originalPrice": 380,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 560,
        "originalPrice": 860,
        "discountDesc": "平裝實體書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：臺灣鄉野草木生機 & 第二章草本形態圖解",
      "previewSubtitle": "黃世勳教授與洪心容醫師親撰：如何從田埂野草辨認真正藥效部位",
      "readTimeMinutes": 7,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "序言：走入鄉野，草草皆是天地造化",
          "content": "### 序言：臺灣鄉野草木的生機與智慧\n\n臺灣得天獨厚，擁有極度豐富的植物多樣性。從海濱防風林到中低海拔淺山田埂，遍布著先民歷經數百年實踐所累積的民間草藥資源。\n\n編撰《彩色本草大系》第三輯的初衷，正是希望將這些隨處可見卻常被視為雜草的本土植物，賦予精準的植物分類學鑑別與生藥學性味考證。一草一木皆有其特定生長節律與化學活性成分，唯有深刻理解其微觀特徵，方能在鄉野踏查中準確認出真正具有療效的本草正品。"
        },
        {
          "chapterId": "ch2",
          "title": "第二章精選：咸豐草、車前草與鳳尾草之生境鑑別",
          "content": "### 草本形態與鑑別要點\n\n#### 一、大花咸豐草與本地咸豐草辨異\n鄉野路旁最常見之「鬼針草」，大花咸豐草（*Bidens pilosa* var. *radiata*）具發達白色舌狀花，全草清熱解毒、活血散瘀力道較為輕揚；而原生種小花咸豐草舌狀花退化或極小，性味微偏苦寒。\n\n#### 二、田埂車前草的採集規範\n車前草多生於路邊踏壓堅實之泥土上，採收時宜在花穗初成、葉片肥厚之春夏之交。根系入土深，洗淨乾燥後具極佳利尿通淋、清肝明目之功。"
        }
      ],
      "previewNotice": "線上試閱章節已結束。欲獲取全書收錄之完整鄉野藥用植物彩色微距圖解與臨床配方，歡迎選購實體書或電子書！"
    }
  },
  {
    "id": "book_taiwan_countryside_herbs_vol1",
    "title": "臺灣鄉野藥用植物（第1輯）",
    "subtitle": "彩色本草大系 · 開啟臺灣本土藥草野外辨識與民間療法的開山之作",
    "author": "洪心容, 黃世勳",
    "authorRole": "中醫師 / 中國醫藥大學藥學博士",
    "category": "terroir_field",
    "categoryName": "野外圖鑑",
    "coverBadge": "創始首輯",
    "coverColor": "#365314",
    "coverIcon": "🌱",
    "isbn": "978-957-28932-7-2",
    "publisher": "文興出版",
    "publishDate": "2004-05-01",
    "pages": 239,
    "rating": 4.8,
    "reviewCount": 95,
    "tags": [
      "彩色本草大系",
      "鄉野本草",
      "民間草藥",
      "圖鑑開山",
      "生藥考證"
    ],
    "summary": "《彩色本草大系》第一輯奠基之作。作者洪心容醫師與黃世勳博士歷經數年深入臺灣各地鄉野踏查，精選常民生活中最親近、最實用的鄉野藥用植物。詳述每種草木的根、莖、葉、花、果辨識特徵，並記錄老一輩口傳之民間草藥調配與煎服經驗。",
    "tableOfContents": [
      "第一章：走進臺灣鄉野——民間青草文化之源流",
      "第二章：常見清熱解毒鄉野草本圖鑑（一）",
      "第三章：常見祛風利濕鄉野草本圖鑑（二）",
      "第四章：消食化積與理氣活血民間藥方",
      "第五章：藥草鮮用與乾燥炮製傳統工藝"
    ],
    "pricing": {
      "physical": {
        "price": 420,
        "originalPrice": 480,
        "stock": 25,
        "format": "平裝 16 開 · 全彩特銅紙印製",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 280,
        "originalPrice": 380,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 560,
        "originalPrice": 860,
        "discountDesc": "平裝實體書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：民間青草文化之源流 & 清熱解毒篇",
      "previewSubtitle": "探尋百年本草記憶：田間雜草何以成為常民保命良方",
      "readTimeMinutes": 6,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "緒言：走出診間，走入臺灣鄉野",
          "content": "### 走出診間，走向泥土芬芳\n\n傳統中醫處方大多依賴藥肆加工炮製之中藥飲片，然而在臺灣廣袤的鄉間農村，常民百姓面對日常的傷風發熱、跌打勞損，往往只需跨出門檻、漫步田埂，便能尋得解疾草木。\n\n本書是我們十餘年野外踏查的起點。我們用鏡頭記錄每株野草在陽光晨露下的鮮活姿態，探詢老農夫與草藥店老掌櫃口耳相傳的經驗，將民俗智慧與現代醫學理論相互印證。"
        }
      ],
      "previewNotice": "線上試閱到此結束。欲閱讀全本植物詳細鑑別指南，請購書支持！"
    }
  },
  {
    "id": "book_taiwan_countryside_herbs_vol2",
    "title": "臺灣鄉野藥用植物（第2輯）",
    "subtitle": "彩色本草大系 · 拓展中南部與海岸丘陵草本植物精華",
    "author": "洪心容, 黃世勳",
    "authorRole": "中醫師 / 中國醫藥大學藥學博士",
    "category": "terroir_field",
    "categoryName": "野外圖鑑",
    "coverBadge": "本草大系",
    "coverColor": "#15803d",
    "coverIcon": "🌾",
    "isbn": "978-986-82920-6-2",
    "publisher": "文興出版",
    "publishDate": "2007-05-01",
    "pages": 230,
    "rating": 4.9,
    "reviewCount": 74,
    "tags": [
      "彩色本草大系",
      "海岸本草",
      "丘陵藥草",
      "臨床驗方",
      "生藥鑑定"
    ],
    "summary": "延續第一輯之嚴謹本草考證，第二輯將調查足跡拓展至臺灣中南部丘陵、沿海防風林及荒郊野地。收錄更多民間珍貴、少見但療效顯著之鄉野藥用植物，深入剖析其性味功用、古今文獻考證及現代臨床經驗配伍。",
    "tableOfContents": [
      "第一章：臺灣海岸與丘陵地帶藥用植物生態特質",
      "第二章：中南部鄉野常見藥草分類鑑別（一）",
      "第三章：中南部鄉野常見藥草分類鑑別（二）",
      "第四章：民間單方與複方驗案解析",
      "第五章：臺灣本土藥草之資源永續與保育思維"
    ],
    "pricing": {
      "physical": {
        "price": 420,
        "originalPrice": 480,
        "stock": 28,
        "format": "平裝 16 開 · 全彩印刷",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 280,
        "originalPrice": 380,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 560,
        "originalPrice": 860,
        "discountDesc": "平裝實體書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：海濱丘陵生態 & 白鶴靈芝與黃花蜜菜鑑別",
      "previewSubtitle": "耐旱、耐鹽耐風的島嶼草木堅韌生命力解析",
      "readTimeMinutes": 6,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "海風與丘陵間的本草足跡",
          "content": "### 海濱丘陵生境之特殊性\n\n臺灣西部海岸線烈日曝曬、季風強勁且土壤鹽鹼，然而在這樣的嚴苛環境中，黃花蜜菜、草海桐、濱豇豆等植物發展出厚實的角質層與高含量的黃酮多酚類抗氧化物。\n\n這些逆境生長特性，使海濱本草在清熱涼血、護肝解毒等方面展現出極為獨特的生物活性價值。"
        }
      ],
      "previewNotice": "線上試閱告一段落。歡迎閱讀全書深度內容！"
    }
  },
  {
    "id": "book_dakeng_herbal_guide_trails_1_to_5",
    "title": "大坑藥用植物解說手冊: 1至5號登山步道",
    "subtitle": "臺中後花園步道踏青與本草生態實地解說指南",
    "author": "黃冠中, 黃世勳, 吳介信",
    "authorRole": "藥用植物學者 / 中國醫藥大學教授團隊",
    "category": "terroir_field",
    "categoryName": "野外圖鑑",
    "coverBadge": "登山必備",
    "coverColor": "#047857",
    "coverIcon": "🥾",
    "isbn": "978-986-6784-17-0",
    "publisher": "文興出版",
    "publishDate": "2011-10-01",
    "pages": 222,
    "rating": 4.9,
    "reviewCount": 112,
    "tags": [
      "大坑步道",
      "臺中後花園",
      "登山健行",
      "步道生態",
      "藥用植物解說"
    ],
    "summary": "大坑風景區素有「臺中陽明山」之美譽，1至5號步道山勢起伏、林相豐茂。本書由中國醫藥大學專家學者沿著步道實地普查，詳實記錄沿線分佈之藥用植物生態，附步道觀察點指示與精緻彩圖，讓登山健行轉化為生動有趣的自然本草探索之旅。",
    "tableOfContents": [
      "第一章：大坑風景區地理環境與藥用植物資源總覽",
      "第二章：大坑1號、2號步道常見本草與相思林植物",
      "第三章：大坑3號、4號步道稜線植物與陡坡藥草群落",
      "第四章：大坑5號步道頭嵙山周邊珍稀藥用植物",
      "第五章：登山休閒與本草生態觀察實用裝備及安全須知"
    ],
    "pricing": {
      "physical": {
        "price": 390,
        "originalPrice": 450,
        "stock": 40,
        "format": "平裝 18 開 · 野外便攜防水封面",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 260,
        "originalPrice": 350,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 520,
        "originalPrice": 800,
        "discountDesc": "實體隨身冊 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：漫步大坑綠色藥庫 & 2號步道相思林草木",
      "previewSubtitle": "週末登山踏青：邊走邊認身旁的天然青草本草",
      "readTimeMinutes": 7,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "導讀：漫步大坑風景區的綠色藥庫",
          "content": "### 登山與本草的完美邂逅\n\n大坑登山步道是無數臺中市民晨昏強身健體的休閒勝地。在枕木步道兩側，其實隱藏著數以百計的藥用植物。\n\n從步道口攀援的千根草、地膽草，到稜線旁迎風而立的山黃梔、土伏苓與九節木，大坑山區豐富的微氣候塑造了多層次的植物社會。帶著本書走入步道，您將發現眼前的每片綠葉都擁有令人驚嘆的身世與藥用價值。"
        }
      ],
      "previewNotice": "線上試閱結束，全書收錄大坑1至5號步道完整植物地圖與座標指引！"
    }
  },
  {
    "id": "book_yaoshan_dietary_therapy",
    "title": "藥膳學",
    "subtitle": "醫食同源 · 從傳統養生理論到現代家庭保健藥膳食療全書",
    "author": "李昭瑩, 王儀絜, 黃世勳",
    "authorRole": "藥膳專家 / 臨床中醫師 / 藥學系教授",
    "category": "seasonal_health",
    "categoryName": "節氣養生",
    "coverBadge": "食養經典",
    "coverColor": "#7c2d12",
    "coverIcon": "🍲",
    "isbn": "978-986-6784-30-9",
    "publisher": "文興印刷事業有限公司",
    "publishDate": "2017-09-01",
    "pages": 224,
    "rating": 4.8,
    "reviewCount": 105,
    "tags": [
      "藥膳學",
      "食醫同源",
      "四季養生",
      "藥材食材",
      "安心食療"
    ],
    "summary": "系統闡述中醫「藥食同源」與藥膳之源流發展、配伍原則與調治禁忌。全書詳述常用藥膳藥材與常見食材之性味功效，針對四季養生、體質調理、婦女保健、青少年發育及中老年延年益壽，設計兼具美味口感與療效之日常藥膳食譜，並教導民眾如何選購安全無毒的安心藥材。",
    "tableOfContents": [
      "第一章：藥膳學之起源、發展與理論核心",
      "第二章：常用藥膳藥材與食材性味配伍宜忌",
      "第三章：四季順時養生藥膳茶飲與湯品",
      "第四章：婦女調經安胎、產後坐月子與美顏藥膳",
      "第五章：兒童體質改善與中老年慢性病養生藥膳方"
    ],
    "pricing": {
      "physical": {
        "price": 300,
        "originalPrice": 350,
        "stock": 35,
        "format": "平裝 16 開 · 全彩精印",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 200,
        "originalPrice": 280,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 420,
        "originalPrice": 630,
        "discountDesc": "實體食譜書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：藥膳源流核心理論 & 第三章四季順時煲湯",
      "previewSubtitle": "大廚與中醫師聯手：煮出不苦口、全家人都愛喝的溫潤藥膳",
      "readTimeMinutes": 8,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "緒論：藥膳的起源、發展與「醫食同源」心法",
          "content": "### 藥膳的核心哲學：補而不滯、溫而不燥\n\n《黃帝內經》云：「毒藥攻邪，五穀為養，五果為助，五畜為益，五菜為充，氣味合而服之，以補精益氣。」藥膳絕非將中藥材生硬投入菜餚之中，而是講究「性味相投、調和鼎鼐」。\n\n春養肝、夏養心、長夏健脾、秋潤肺、冬固腎。本書將艱深之中醫辨證化為生活化廚房實踐，指導讀者如何依據體質與節氣調和百味。"
        }
      ],
      "previewNotice": "線上試閱結束！全書包含 60 道完整家常安心藥膳食譜步驟與選材密技！"
    }
  },
  {
    "id": "book_taitung_medicinal_plants_atlas",
    "title": "臺東地區藥用植物圖鑑",
    "subtitle": "太平洋黑潮島嶼邊陲的純淨草木精粹 · 100種在地常見藥草生活實踐",
    "author": "吳茂雄 總編輯（臺東縣藥用植物學會）",
    "authorRole": "臺東縣藥用植物學會理事長兼資深本草採集家",
    "category": "indigenous_folk",
    "categoryName": "原鄉民俗",
    "coverBadge": "後山草木",
    "coverColor": "#854d0e",
    "coverIcon": "🏝️",
    "isbn": "978-986-86817-0-5",
    "publisher": "臺東縣藥用植物學會 / 文興出版事業有限公司",
    "publishDate": "2010-11-01",
    "pages": 240,
    "rating": 4.9,
    "reviewCount": 68,
    "tags": [
      "臺東藥草",
      "後山植物",
      "藥用植物圖鑑",
      "原鄉草藥",
      "民間驗方"
    ],
    "summary": "臺東背倚中央山脈、面迎太平洋，純淨無污染的風土孕育出生命力強韌的草木。本書由臺東縣藥用植物學會歷經長年實地踏查與臨床驗證編纂而成，嚴選後山最常見且具實效的100種藥用植物。每種藥草均附清晰生態圖片、生長習性、採收加工、民間秘方及家庭栽種要訣。",
    "tableOfContents": [
      "第一章：臺東地理氣候特色與藥用植物生境優勢",
      "第二章：縱谷與平原常見解毒退火本草精粹",
      "第三章：海岸山脈原住民族民俗傳統藥用植物",
      "第四章：臺東在地百種藥用植物圖解鑑賞與栽培指南",
      "第五章：臺東縣藥用植物學會耆老實踐經驗方精選"
    ],
    "pricing": {
      "physical": {
        "price": 450,
        "originalPrice": 500,
        "stock": 22,
        "format": "精裝 16 開 · 高級雪銅紙全彩精裝典藏本",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 300,
        "originalPrice": 400,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 600,
        "originalPrice": 900,
        "discountDesc": "精裝典藏本 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：後山純淨風土 & 原住民族民俗草藥智慧",
      "previewSubtitle": "後山耆老親傳：假酸漿、刺蔥與雷公根的生活實踐",
      "readTimeMinutes": 6,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "序言：太平洋風吹拂的後山草木傳奇",
          "content": "### 臺東淨土孕育的強韌本草\n\n臺東擁有全臺灣最廣袤純淨的土地，東臨太平洋，西枕中央山脈，沒有重工業污染的空氣與水源造就了藥用植物無與倫比的高品質活性。\n\n在這裡，卑南族、阿美族、布農族與排灣族先民與自然和諧共存。包阿粨（Abai）所用的假酸漿葉不仅助消化防脹氣，更是原鄉生活中的護胃要藥。本書記錄下這片土地最純粹的綠色恩賜。"
        }
      ],
      "previewNotice": "線上試閱結束！全書收錄 100 味臺東代表性草藥之完整栽培圖解與驗方！"
    }
  },
  {
    "id": "book_taiwan_gynecology_herbal_lore",
    "title": "臺灣婦科病藥草圖鑑及驗方（珍藏本草3）",
    "subtitle": "守護女性全生命週期健康的草本良方與臨床調養指南",
    "author": "洪心容, 黃世勳",
    "authorRole": "知名婦科中醫師 / 藥學博士",
    "category": "seasonal_health",
    "categoryName": "節氣養生",
    "coverBadge": "珍藏本草",
    "coverColor": "#831843",
    "coverIcon": "🌸",
    "isbn": "978-986-82262-3-4",
    "publisher": "文興出版",
    "publishDate": "2006-08-01",
    "pages": 134,
    "rating": 4.8,
    "reviewCount": 79,
    "tags": [
      "婦科藥草",
      "女性保健",
      "調經理帶",
      "產後調理",
      "民間驗方"
    ],
    "summary": "中醫婦科名醫洪心容醫師與生藥學者黃世勳博士聯手巨著。專注於女性從青春期月經不調、痛經、育齡期備孕、產後坐月子到更年期症候群之全週期調理。詳細介紹益母草、當歸、艾葉、白花蛇舌草等婦科要藥在臺灣的生長形態，並公開數十道溫和、安全且經過驗證的婦科家庭調理茶方與藥膳。",
    "tableOfContents": [
      "第一章：女性生理特質與中醫「氣血調和」核心理論",
      "第二章：月經不順、痛經與閉經之常用草藥鑑別與驗方",
      "第三章：帶下病與婦科骨盆炎症之清熱祛濕草藥調理",
      "第四章：產前產後調理與坐月子古法草藥沐浴洗身方",
      "第五章：更年期心悸潮熱與失眠之草木滋陰安神方"
    ],
    "pricing": {
      "physical": {
        "price": 250,
        "originalPrice": 280,
        "stock": 26,
        "format": "平裝 18 開 · 全彩特銅紙印製",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 160,
        "originalPrice": 220,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 330,
        "originalPrice": 500,
        "discountDesc": "實體書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：女性生理氣血調和 & 第二章益母草驗方精解",
      "previewSubtitle": "女中醫親傳：以天然草本溫和撫平生理期不適",
      "readTimeMinutes": 6,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "總論：女性生理病理與中草藥「氣血和合」要義",
          "content": "### 婦人以血為本，以氣為用\n\n女性一生經歷經、孕、產、乳各階段，氣血耗損尤甚。中醫治療婦女疾病，最重調和肝、脾、腎三臟氣血。\n\n臺灣本土生長的益母草，全草入藥，活血調經而不傷正氣；艾葉溫經止血、散寒止痛，是虛寒痛經之克星。善用草本之力，調暢情志與經絡，方能讓女性由內而外綻放健康氣色。"
        }
      ],
      "previewNotice": "線上試閱到此結束。欲獲取全書收錄之婦科對症驗方與茶飲配方，請選購全書！"
    }
  },
  {
    "id": "book_color_medicinal_plants_atlas_500",
    "title": "彩色藥用植物圖鑑: 超強收錄500種",
    "subtitle": "珍藏本草 · 醫療與保健雙重導向 · 臺灣規模宏大之本草植物百科",
    "author": "黃冠中, 黃世勳, 洪心容",
    "authorRole": "藥學教授 / 生藥學專家 / 中醫師共同審定",
    "category": "terroir_field",
    "categoryName": "野外圖鑑",
    "coverBadge": "收錄500種",
    "coverColor": "#065f46",
    "coverIcon": "📗",
    "isbn": "978-986-6784-10-1",
    "publisher": "文興出版",
    "publishDate": "2009-03-01",
    "pages": 178,
    "rating": 4.9,
    "reviewCount": 135,
    "tags": [
      "500種藥草",
      "醫療保健",
      "彩色圖鑑",
      "藥用植物",
      "臨床應用"
    ],
    "summary": "彙整臺灣民間與中醫藥臨床最實用之500種藥用植物，圖文並茂，每種植物均以高畫質彩照展現花、果、葉、根等微觀結構。內容兼顧植物分類學的嚴謹性與醫藥臨床的實用性，詳細載明拉丁學名、科屬別名、生長環境、主治功效、現代藥理活性與用法用量，為專業醫療從業人員與自然愛好者案頭不可或缺的工具大典。",
    "tableOfContents": [
      "第一章：藥用植物學基礎鑑別指引與檢索表",
      "第二章：解表與清熱涼血類藥用植物（1-120種）",
      "第三章：利水滲濕與祛風通絡類藥用植物（121-240種）",
      "第四章：理氣活血與消食健胃類藥用植物（241-360種）",
      "第五章：補益強壯與化痰止咳類藥用植物（361-500種）"
    ],
    "pricing": {
      "physical": {
        "price": 300,
        "originalPrice": 350,
        "stock": 38,
        "format": "平裝 16 開 · 全彩精印",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 200,
        "originalPrice": 280,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 420,
        "originalPrice": 630,
        "discountDesc": "實體書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：植物鑑別檢索指引 & 清熱涼血500種精華",
      "previewSubtitle": "500種藥草巨帙：以微距視角洞察本草微觀形態",
      "readTimeMinutes": 7,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "導言：如何運用植物微觀特徵進行精準生藥鑑定",
          "content": "### 辨偽去妄，方得良藥\n\n藥用植物同名異物或同物異名之現象在民間極為普遍。若僅憑俗名採藥，極易誤採誤服甚至釀成中毒悲劇。\n\n本書收載之500種藥用植物，均嚴格依據APG植物分類系統標註標準拉丁學名，並針對其花萼、雄蕊、葉脈、腺點等鑑別要點進行高倍微距攝影，旨在建立臺灣最標準、最直觀的藥草辨析範式。"
        }
      ],
      "previewNotice": "線上試閱到此結束。欲查閱全書 500 味藥用植物彩色圖鑑，請選購全書！"
    }
  },
  {
    "id": "book_taiwan_common_medicinal_plants_atlas",
    "title": "臺灣常用藥用植物圖鑑",
    "subtitle": "深入淺出精選臺灣民間常用160味本草 · 植物名詞解說與採收加工全圖解",
    "author": "黃世勳",
    "authorRole": "中國醫藥大學藥學院教授、藥學博士",
    "category": "terroir_field",
    "categoryName": "野外圖鑑",
    "coverBadge": "常用精選",
    "coverColor": "#1e40af",
    "coverIcon": "📖",
    "isbn": "978-986-6784-11-8",
    "publisher": "文興出版",
    "publishDate": "2009-11-01",
    "pages": 212,
    "rating": 4.9,
    "reviewCount": 140,
    "tags": [
      "常用中草藥",
      "圖解辨識",
      "採收加工",
      "實用驗方",
      "黃世勳專著"
    ],
    "summary": "臺灣本草大師黃世勳教授之個人代表專著。全書精選臺灣民間最普及、最具實用價值的160味常用藥用植物。以通俗易懂的語言配合清晰微距照片，系統解說植物部位形態術語、分布產地、藥用功效、採收時節、炮製加工方法及經典驗方，是一本兼具入門普及與專業深度的高口碑圖鑑。",
    "tableOfContents": [
      "第一章：藥用植物形態學名詞圖解（根、莖、葉、花、果實與種子）",
      "第二章：民間最常用清熱解毒與消炎利尿本草圖鑑",
      "第三章：跌打損傷與祛風活血常用草藥圖鑑",
      "第四章：健脾利濕與芳香健胃藥用植物",
      "第五章：草藥採收、清洗、陰乾加工與儲藏保質實務"
    ],
    "pricing": {
      "physical": {
        "price": 330,
        "originalPrice": 380,
        "stock": 32,
        "format": "平裝 16 開 · 全彩特銅紙印製",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 220,
        "originalPrice": 300,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 450,
        "originalPrice": 680,
        "discountDesc": "實體書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：植物形態名詞解說 & 第二章常用清熱解毒本草",
      "previewSubtitle": "黃世勳教授親撰：零基礎快速看懂葉序、花冠與果實形態",
      "readTimeMinutes": 7,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "緒言：臺灣常用草藥的採收、炮製與保存心法",
          "content": "### 辨藥識藥，從形態名詞開始\n\n許多民眾想要認識青草藥，卻常被「單葉互生」、「聚繖花序」、「瘦果冠毛」等植物學術語望而卻步。本書第一章特別規劃全圖解名詞對照，讓讀者對著圖片一眼看懂葉形與花被結構。\n\n採藥更須講究時令，「春採葉、夏採花、秋採果、冬採根」。唯有在有效成分最高峰之季採收並妥善陰乾，方能鎖住藥木之精魂。"
        }
      ],
      "previewNotice": "線上試閱結束！全書收錄 160 味臺灣常用藥草之高畫質全彩圖解！"
    }
  },
  {
    "id": "book_chinese_decoction_pieces_atlas_300",
    "title": "中藥飲片彩色圖鑑: 臨床常用300種",
    "subtitle": "臨床常用300種 · 藥師與中醫師必備之中藥材飲片性狀鑑別與品管指南",
    "author": "陳世傑, 林宗輝, 黃世勳",
    "authorRole": "臺中縣藥師公會專家群 / 藥學博士",
    "category": "biotech_science",
    "categoryName": "科學機轉",
    "coverBadge": "飲片鑑別",
    "coverColor": "#3f3f46",
    "coverIcon": "🏺",
    "isbn": "978-986-87025-0-9",
    "publisher": "台中縣藥師公會",
    "publishDate": "2011-02-01",
    "pages": 141,
    "rating": 4.9,
    "reviewCount": 92,
    "tags": [
      "中藥飲片",
      "藥材切片",
      "真偽鑑別",
      "藥師公會",
      "品管規範"
    ],
    "summary": "由台中縣藥師公會組織專家撰寫，針對臨床配方調劑最常接觸的300種中藥飲片進行標準化彩色圖解。全書深入解析每味飲片之外觀性狀、斷面組織特徵、色澤氣味、真偽混淆品鑑別及品質優劣評級，填補了傳統生藥植物學與藥局臨床調劑飲片之間的辨識鴻溝。",
    "tableOfContents": [
      "第一章：中藥飲片炮製規範與現代品質管理標準",
      "第二章：根及根莖類常用中藥飲片性狀鑑別（黃耆、當歸、人參等）",
      "第三章：皮類、藤木類與葉類中藥飲片特徵",
      "第四章：花類、果實及種子類飲片鑑別與保存",
      "第五章：易混淆飲片、偽劣品防範與藥局調劑安全注意事項"
    ],
    "pricing": {
      "physical": {
        "price": 300,
        "originalPrice": 350,
        "stock": 25,
        "format": "精裝 16 開 · 典藏硬殼全彩銅版紙",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 200,
        "originalPrice": 280,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 420,
        "originalPrice": 630,
        "discountDesc": "精裝實體書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：中藥飲片現代品質管理 & 根莖類飲片斷面鑑別",
      "previewSubtitle": "藥師公會權威指引：看斷面菊花心、聞氣味辨真偽中藥材",
      "readTimeMinutes": 7,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "序論：中藥飲片炮製之「適度」與現代品質標準",
          "content": "### 飲片炮製，修事入微\n\n藥材經過切製炮製後，原有的植物形態多已改變。藥師在調劑配方時，面對的是片、絲、塊、段狀的飲片。\n\n如何從斷面的「菊花紋」、形成層環紋、射線走勢與粉性程度判斷真偽優劣？本書結合藥師臨床實務，以高解度顯微與微距鏡頭，為每味常用飲片建立嚴謹的外觀品質檢驗指引。"
        }
      ],
      "previewNotice": "線上試閱到此結束。欲查閱 300 種中藥飲片全彩斷面與品管標準，請選購全書！"
    }
  },
  {
    "id": "book_illustrated_plants_of_pai_tsao_tea",
    "title": "百草茶植物圖鑑",
    "subtitle": "The illustrated plants of Pai-tsao-tea · 臺灣百草茶文化基石與傳統青草原料全圖鑑",
    "author": "邱年永",
    "authorRole": "臺灣資深藥用植物學大師 / 《原色臺灣藥用植物圖鑑》作者",
    "category": "tea_culture",
    "categoryName": "青草茶文化",
    "coverBadge": "百草茶權威",
    "coverColor": "#166534",
    "coverIcon": "🍵",
    "isbn": "978-957-29955-0-1",
    "publisher": "文興出版",
    "publishDate": "2004-08-01",
    "pages": 186,
    "rating": 5.0,
    "reviewCount": 156,
    "tags": [
      "百草茶",
      "青草茶原料",
      "邱年永大師",
      "退火解暑",
      "植物考證"
    ],
    "summary": "臺灣藥用植物學一代泰斗邱年永大師之經典專著。聚焦於臺灣百年「百草茶（青草茶）」背後的核心原料植物。巨細靡遺記錄民間煮茶所用的大花咸豐草、鳳尾草、黃花蜜菜、車前草、六角英、魚腥草等數十種草木之生態特徵、採集乾燥工藝、性味作用與配伍法度，是研究臺灣青草茶文化最權威的基石經典。",
    "tableOfContents": [
      "第一章：臺灣百草茶的歷史淵源、民俗文化與地域流派",
      "第二章：百草茶主料「君藥」植物圖鑑（清熱解毒核心草木）",
      "第三章：百草茶輔料「臣藥」與「佐藥」植物圖鑑（利濕通絡與芳香化濁）",
      "第四章：百草茶古法煎煮要領——鮮草與乾品火候時序",
      "第五章：現代生化研究視角下的百草茶抗氧化與抗發炎活性"
    ],
    "pricing": {
      "physical": {
        "price": 300,
        "originalPrice": 350,
        "stock": 35,
        "format": "平裝 16 開 · 全彩特銅紙印製",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 200,
        "originalPrice": 280,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 420,
        "originalPrice": 630,
        "discountDesc": "實體典藏本 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：臺灣百草茶歷史淵源 & 君臣佐使配方心法",
      "previewSubtitle": "國寶級大師邱年永親傳：解開一碗甘潤清涼青草茶的百年秘辛",
      "readTimeMinutes": 8,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "緒論：臺灣百草茶百年民俗文化之傳承",
          "content": "### 寶島甘露：百草茶的歲月沉香\n\n「百草茶」又名青草茶、涼茶，是臺灣常民對抗炎暑濕熱之生命之水。往昔農忙時節，樹蔭下的奉茶大桶盛裝著熱氣騰騰的青草茶，供行旅田人飲用。\n\n茶湯之甘苦調和，全賴原料之講究。君藥如咸豐草主攻消暑退火，臣藥如鳳尾草涼血利水，佐以薄荷化濁醒脾，使以甘草益氣護中。這不僅是一碗茶，更是人與土地相濡以沫的深刻記憶。"
        }
      ],
      "previewNotice": "線上試閱到此結束。欲閱讀全書完整百草茶原料植物圖鑑與熬製配比，請選購全書！"
    }
  },
  {
    "id": "book_taichung_tcm_plants_dongshan_high_school",
    "title": "大臺中中醫師公會藥用植物調查: 東山高中篇",
    "subtitle": "本草行腳 · 184種校園常見植物觀察應用簡易入門",
    "author": "黃世勳, 蕭世洪, 林煥章",
    "authorRole": "臺中市大臺中中醫師公會總編輯群 / 中醫名家與教授",
    "category": "terroir_field",
    "categoryName": "野外圖鑑",
    "coverBadge": "本草行腳",
    "coverColor": "#1d4ed8",
    "coverIcon": "🏫",
    "isbn": "978-986-86891-3-8",
    "publisher": "臺中市大臺中中醫師公會",
    "publishDate": "2017-08-01",
    "pages": 160,
    "rating": 4.8,
    "reviewCount": 62,
    "tags": [
      "本草行腳",
      "校園植物",
      "東山高中",
      "植物觀察",
      "中醫科普"
    ],
    "summary": "大臺中中醫師公會「本草行腳」系列重要專著。以臺中市立東山高級中學自然校園環境為調查場域，詳實普查並收錄多達184種校園常見植物。結合中醫師與植物學專家視角，從日常隨手可見的庭園樹木、花圃綠化與草坪野草切入，圖解其植物特徵與在傳統中醫藥上的應用，是引導學子親近自然、認識本草的最佳生活教科書。",
    "tableOfContents": [
      "第一章：東山高中校園地理環境與生態多樣性概況",
      "第二章：校園喬木與灌木之觀賞與藥用價值解說",
      "第三章：草坪與花圃邊緣常見野草本草辨認（184種植物圖解）",
      "第四章：中醫藥生活化：校園植物中的日常養生智慧",
      "第五章：中學生本草自然觀察手記與實地探索技巧"
    ],
    "pricing": {
      "physical": {
        "price": 260,
        "originalPrice": 300,
        "stock": 25,
        "format": "平裝 18 開 · 全彩精印",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 180,
        "originalPrice": 240,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 360,
        "originalPrice": 540,
        "discountDesc": "實體書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：東山高中生態概況 & 第三章校園常見本草觀察",
      "previewSubtitle": "中醫師進校園：校園步道、花壇邊隨處可見的藥用植物圖解",
      "readTimeMinutes": 6,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "本草行腳緣起：走入東山高中的自然校園植物教室",
          "content": "### 校園無處不本草\n\n大臺中中醫師公會長期推動「本草行腳」文化工程，期盼將中醫藥文化扎根於青少年教育之中。\n\n東山高中依傍大坑山麓，校園生態極為多元。在操場旁的紅皮朱蕉、花圃邊的紫蘇與酢醬草、以及石階縫隙間的雷公根與車前草，每株草木都是一堂生動的大自然生物課與中醫藥啟蒙課。"
        }
      ],
      "previewNotice": "線上試閱到此結束。全書收錄東山高中校園 184 種植物完整形態辨識圖解！"
    }
  },
  {
    "id": "book_taichung_tcm_plants_dajia_high_school",
    "title": "大臺中中醫師公會藥用植物調查: 大甲高工篇",
    "subtitle": "本草行腳 · 校園藥用植物資源實地調查與青年學子本草教育指引",
    "author": "黃世勳, 蕭世洪, 林大傑",
    "authorRole": "臺中市大臺中中醫師公會總編輯群 / 中醫專家",
    "category": "terroir_field",
    "categoryName": "野外圖鑑",
    "coverBadge": "本草行腳",
    "coverColor": "#0f766e",
    "coverIcon": "🏛️",
    "isbn": "978-986-86891-2-1",
    "publisher": "臺中市大臺中中醫師公會",
    "publishDate": "2015-06-01",
    "pages": 145,
    "rating": 4.8,
    "reviewCount": 58,
    "tags": [
      "本草行腳",
      "校園生態",
      "大甲高工",
      "藥用植物",
      "在地中醫藥推廣"
    ],
    "summary": "大臺中中醫師公會「本草行腳」系列創始調研專案之一。秉承大甲高工「公誠勤樸」之精神，公會名醫專家親赴校園進行地毯式植物生態踏查。詳細記錄校園各角落生長之藥用植物，將嚴肅的中草藥學問轉化為青年學子與社區民眾皆能輕鬆理解的校園自然生態圖鑑，實踐中醫藥科普向下扎根。",
    "tableOfContents": [
      "第一章：大臺中中醫師公會「本草行腳」創辦緣起與精神",
      "第二章：大甲高工校園生態地圖與植物分區",
      "第三章：校園常見藥用植物圖解鑑賞與特徵辨析",
      "第四章：民間傳統驗方與校園本草的對應關係",
      "第五章：中醫藥文化在中等教育校園的推廣實踐"
    ],
    "pricing": {
      "physical": {
        "price": 260,
        "originalPrice": 300,
        "stock": 25,
        "format": "平裝 18 開 · 全彩精印",
        "shippingDays": "下單後 24 小時快速出貨"
      },
      "ebook": {
        "price": 180,
        "originalPrice": 240,
        "format": "EPUB / PDF 雙格式",
        "instantAccess": true
      },
      "bundle": {
        "price": 360,
        "originalPrice": 540,
        "discountDesc": "實體書 + 電子書合購特惠"
      }
    },
    "samplePreview": {
      "available": true,
      "previewTitle": "【精彩試閱】第一章：本草行腳精神 & 第三章校園常見藥用植物圖解",
      "previewSubtitle": "公誠勤樸校園中的草木芬芳：大甲高工實地生態踏查成果",
      "readTimeMinutes": 6,
      "chapters": [
        {
          "chapterId": "ch1",
          "title": "序言：公誠勤樸——大甲高工校園綠色生機",
          "content": "### 傳承本草精神於校園之間\n\n大甲高工校訓「公誠勤樸」勉勵學子腳踏實地。在校園踏查過程中，我們驚喜地發現工科校園內同樣蘊藏著豐饒的草本生命力。\n\n木棉的高聳清熱、水黃皮的解毒、沿階草的養陰潤肺，透過中醫師公會的專業整理，讓校園綠化樹種不再只是冰冷的造景，更成為富含人文歷史與健康智慧的本草教材。"
        }
      ],
      "previewNotice": "線上試閱到此結束。欲獲取全書完整校園植物辨識指南，請選購實體書或電子書！"
    }
  }
];

const initialOrders = [
  {
    orderId: 'THB-BK-20261012-001',
    bookId: 'book_wanhua_classic',
    bookTitle: '萬華百年青草茶香',
    purchaseType: 'ebook',
    formatDesc: '電子書授權 (EPUB / PDF 雙版本)',
    quantity: 1,
    unitPrice: 290,
    totalAmount: 290,
    buyerName: '陳雅婷',
    buyerEmail: 'yating.chen@example.tw',
    buyerPhone: '0912-345-678',
    shippingAddress: '免寄送 (數位即時授權)',
    paymentMethod: '信用卡線上刷卡',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    licenseKey: 'EBOOK-AUTH-WNH-8821-OK',
    createdAt: '2026-10-12T08:30:00.000Z',
    trackingNumber: null
  },
  {
    orderId: 'THB-BK-20261012-002',
    bookId: 'book_taiwan_flora_field_guide',
    bookTitle: '臺灣野生本草圖鑑全書',
    purchaseType: 'physical',
    formatDesc: '精裝防水野外硬殼實體書',
    quantity: 1,
    unitPrice: 680,
    totalAmount: 680,
    buyerName: '林志豪',
    buyerEmail: 'chihhao.lin@example.tw',
    buyerPhone: '0988-765-432',
    shippingAddress: '台北市大安區新生南路三段 88 號 5 樓',
    paymentMethod: 'LINE Pay 快捷支付',
    paymentStatus: 'paid',
    orderStatus: 'shipping',
    licenseKey: null,
    createdAt: '2026-10-12T10:15:00.000Z',
    trackingNumber: 'SF-TW-20261012002'
  },
  {
    orderId: 'THB-BK-20261012-003',
    bookId: 'book_hakka_herbal_lore',
    bookTitle: '客庄常民青草經',
    purchaseType: 'bundle',
    formatDesc: '實體紙本書 + 電子書雙享合購版',
    quantity: 1,
    unitPrice: 520,
    totalAmount: 520,
    buyerName: '張美華',
    buyerEmail: 'meihua.chang@example.tw',
    buyerPhone: '0933-221-100',
    shippingAddress: '新竹縣竹北市光明六路 120 號',
    paymentMethod: '超商取貨付款',
    paymentStatus: 'pending',
    orderStatus: 'processing',
    licenseKey: 'EBOOK-AUTH-HAK-8937-BDL',
    createdAt: '2026-10-12T11:45:00.000Z',
    trackingNumber: '711-TW-89230192'
  }
];

module.exports = {
  initialBooks,
  initialOrders
};
