/**
 * server/data/booksData.js
 * 臺灣本草植物誌 · 草木書閣書籍資料庫種子
 * 包含 6 部由傳承專家、生技博士與原鄉學者撰寫之經典本草書籍、線上試閱章節與初始訂單資料
 */

const initialBooks = [
  {
    id: 'book_wanhua_classic',
    title: '萬華百年青草茶香',
    subtitle: '西昌街老茶師的四時退火秘笈與常民生活草木方',
    author: '林萬吉 老茶師',
    authorRole: '萬華西昌街百年青草巷第三代傳人',
    category: 'tea_culture',
    categoryName: '青草茶文化',
    coverBadge: '百年經典',
    coverColor: '#2d6a4f',
    coverIcon: '🍵',
    isbn: '978-986-041-882-1',
    publisher: '艋舺風土文化出版社',
    publishDate: '2024-06-15',
    pages: 268,
    rating: 4.9,
    reviewCount: 142,
    tags: ['退火清熱', '萬華西昌街', '百年古法', '青草茶配方', '君臣佐使'],
    summary: '艋舺西昌街青草巷，全臺灣最具風土記憶的草藥街市。本書由西昌街第三代老茶師林萬吉親自口述撰著，完整公開大花咸豐草、鳳尾草、六角英與薄荷之四時調配秘辛，解密古法熬茶如何「君臣相佐、佐使護中」，讓苦茶入口甘潤、常民消暑不傷脾胃。',
    tableOfContents: [
      '第一章：艋舺西昌街的青草歲月與百年地景',
      '第二章：辨認島嶼退火三寶——咸豐草、鳳尾草與車前草',
      '第三章：古法青草茶熬煮心法——火候、水質與君臣佐使',
      '第四章：春夏秋冬四時節氣養生青草飲品',
      '第五章：市井青草茶攤的民間傳承故事'
    ],
    pricing: {
      physical: {
        price: 450,
        originalPrice: 520,
        stock: 38,
        format: '精裝 16 開 · 全彩特銅紙印製',
        shippingDays: '下單後 24 小時快速出貨'
      },
      ebook: {
        price: 290,
        originalPrice: 380,
        format: 'EPUB / 向量全彩 PDF (支援跨載具即時雲端閱讀)',
        instantAccess: true
      },
      bundle: {
        price: 580,
        originalPrice: 900,
        discountDesc: '實體典藏本 + 電子書終身授權 · 享 64 折合購超值特惠'
      }
    },
    samplePreview: {
      available: true,
      previewTitle: '【精彩試閱】第一章：艋舺西昌街的青草歲月 & 第三章熬茶心法精要',
      previewSubtitle: '精選萬華老街風土紀實與老茶師親傳之青草茶武火文火三候法',
      readTimeMinutes: 8,
      chapters: [
        {
          chapterId: 'ch1',
          title: '序言與第一章：艋舺西昌街的青草歲月',
          content: `### 序言：大火煮水，小火化苦

我十一歲那年，老艋舺的夏日還沒有冷氣。正中午太陽把西昌街紅磚曬得發燙，店門口一口直徑三尺的大銅鍋滾著熱氣，滿街都是苦涼微甘的藥草香。

父親拿著大竹杓攪動滿鍋的大花咸豐草與鳳尾草，對我說：「萬吉啊，煮青草茶不只是把草丟進熱水裡。草木有靈，天生帶有土地的烈性。君藥主攻退火，臣藥輔助宣透，若沒有甘草與薄荷作佐使，大苦大寒進了肚子，只會傷了常民百姓的脾胃。」

這句話，我記了整整六十年。

#### 西昌街的風土根脈
萬華在淡水河畔，是北部草藥集散的最前線。早期三峽、淡水、新店山區採草人天未亮便挑著濕淋淋的鮮草進城。咸豐草生於荒野田埂，吸飽日光，性微寒能清熱；鳳尾草生於幽陰井邊，性寒能涼血。先民在潮濕悶熱的島嶼氣候中勞動，青草茶便是最道地的生命之水。`
        },
        {
          chapterId: 'ch3',
          title: '第三章精選：古法青草茶熬煮三候法（君臣佐使調和）',
          content: `### 熬煮心法：君臣佐使在茶釜中的轉化

很多人問老茶師：「為什麼家裡煮的青草茶苦澀難以下嚥，青草街煮的卻能留香回甘？」關鍵在於「君臣佐使」的比例與熬煮時序。

#### 一、配伍法度
* **君藥（大花咸豐草 40%）**：全方靈魂，直攻體內鬱熱。
* **臣藥（鳳尾草 28%）**：輔翼君藥，清血熱、去濕滯。
* **佐藥（枸杞子或微量紫蘇 18%）**：**佐制寒性**，護衛脾胃陽氣，防止腹瀉。
* **使藥（甘草 14%）**：國老調和百藥，引藥歸經，賦予茶湯天然蜜甜。

#### 二、三候煎煮時序
1. **武火急沸（5-8 分鐘）**：水沸後投入洗淨之鮮草或乾草，大火滾煮，逼出輕揚之芳香揮發油。
2. **文火細熬（20-30 分鐘）**：轉微滾文火，讓木質莖與厚葉深層之多酚微量成分慢慢析出入水。
3. **熄火悶香（10 分鐘）**：關火加蓋，待藥草下沉，香氣回鎖茶湯中。濾渣後溫涼飲用，甘美回甘。`
        }
      ],
      previewNotice: '線上試閱篇章已告一段落。全書共五章二十八節，包含全套 24 道傳統青草茶古方配比，欲閱讀全本請選購實體書或電子書！'
    }
  },
  {
    id: 'book_hakka_herbal_lore',
    title: '客庄常民青草經',
    subtitle: '彭秀妹阿婆的野草沐浴、紫蘇暖胃與客家山林生活智慧',
    author: '彭秀妹 老藥師',
    authorRole: '苗栗客庄草藥研究會耆老兼草藥沐浴實踐者',
    category: 'indigenous_folk',
    categoryName: '原鄉民俗',
    coverBadge: '客庄智慧',
    coverColor: '#b45309',
    coverIcon: '👵',
    isbn: '978-986-041-893-7',
    publisher: '獅潭山林文史工作室',
    publishDate: '2023-11-20',
    pages: 232,
    rating: 4.8,
    reviewCount: 98,
    tags: ['客家青草', '野草沐浴', '抹草避邪', '紫蘇暖胃', '民俗生活'],
    summary: '苗栗丘陵客家庄，老一輩客家人懂得「拔一株野草，解一家寒暑」。彭秀妹阿婆用溫暖親切的客庄口吻，娓娓道來抹草、艾草、大風草之洗浴辟邪傳承，以及紫蘇炒蛋暖胃、香茅煮水驅寒之生活藥膳方。是一本滿懷泥土芬芳與長輩慈愛的常民植物誌。',
    tableOfContents: [
      '第一章：客庄丘陵邊的野草童年與阿婆的菜園',
      '第二章：洗身辟邪三草——艾草、抹草與大風草之民俗儀軌',
      '第三章：後院紫蘇與生薑——客家婦女做月子與暖中妙法',
      '第四章：夏採魚腥草，秋曬假酸漿——季節採集的客庄時序',
      '第五章：客家草藥茶湯與常民點心手作'
    ],
    pricing: {
      physical: {
        price: 420,
        originalPrice: 480,
        stock: 25,
        format: '平裝 18 開 · 手感再生環保紙印製',
        shippingDays: '下單後 24 小時快速出貨'
      },
      ebook: {
        price: 260,
        originalPrice: 350,
        format: 'EPUB / PDF 雙格式電子書',
        instantAccess: true
      },
      bundle: {
        price: 520,
        originalPrice: 830,
        discountDesc: '實體紙本書 + 電子書即時閱讀 · 現省 310 元'
      }
    },
    samplePreview: {
      available: true,
      previewTitle: '【精彩試閱】第一章：野草童年 & 第二章辟邪三草沐浴配伍',
      previewSubtitle: '阿婆親述：客家人帶小孩如何用艾草、抹草洗身安神定驚',
      readTimeMinutes: 7,
      chapters: [
        {
          chapterId: 'ch1',
          title: '序章：阿妹阿弟，屋後山邊全是寶',
          content: `### 阿婆的話：拔草要識草，草草有神明

在我們客家話裡，草藥常叫做「山青」或「野草」。鄉下地方以前沒有大西藥房，頭暈發熱、孩子夜啼啼哭，阿婆走進後山草叢裡，抓幾把葉子在手心搓一搓，一聞氣味就知道對不對症。

草長在石縫裡，天生帶著客家人硬頸打拼的硬氣。艾草性溫微辛，能驅寒濕；抹草葉尖如心，香氣清冽能安神。這些不是迷信，是幾百年來客家祖先在山林間與蚊蟲濕氣周旋累積下來的血脈經驗。`
        },
        {
          chapterId: 'ch2',
          title: '第二章精選：客家避邪安神洗身包秘方',
          content: `### 民俗三草洗浴包之君臣配伍

小孩去墳山受驚、晚上哭鬧不停，或是出遠門剛回到家，阿婆便會包一帖「洗身草」：

* **君（抹草 15g）**：香氣芳烈，民俗相傳能定魂辟穢，主治心神不寧。
* **臣（艾草 12g）**：溫通經絡，散寒行氣，讓肌膚微溫發汗。
* **佐（大風草或香茅 10g）**：行氣活血，驅除山嵐風寒濕氣。
* **使（芙蓉葉 5g）**：引藥透肌，潤澤毛孔，清香怡人。

#### 煮水外洗方法：
將四味藥草裝入棉布袋中，加入清水 3,000 毫升，武火沸煮 10 分鐘，將青綠溫潤的藥湯倒入浴盆。待水溫降至 38-40 度時沐浴洗擦背脊與四肢，浴後神清氣爽，安穩入眠。`
        }
      ],
      previewNotice: '線上試閱完畢！全書收錄 18 道客庄草藥日常洗浴與藥膳手作，購買電子書即可立即在線閱讀全本！'
    }
  },
  {
    id: 'book_taiwan_flora_field_guide',
    title: '臺灣野生本草圖鑑全書',
    subtitle: '全島 70 味常用藥用植物生境探索、植物特徵與圖解鑑別指南',
    author: '臺灣本草研究學會 編著',
    authorRole: '臺灣植物分類學者與民俗草藥調查小組共同編審',
    category: 'terroir_field',
    categoryName: '野外圖鑑',
    coverBadge: '權威鑑定',
    coverColor: '#1e3a8a',
    coverIcon: '🌿',
    isbn: '978-986-041-901-9',
    publisher: '國家植物地理學會',
    publishDate: '2024-03-01',
    pages: 384,
    rating: 5.0,
    reviewCount: 215,
    tags: ['植物圖鑑', '生境分布', '野外採集', '高解析圖解', '學名檢索'],
    summary: '歷時五年踏遍台灣海岸、平原、丘陵至高山，完整收錄 70 味臺灣常用藥用植物。以國際植物學標準呈現拉丁學名、科屬、性味歸經、化學成分、生態棲地分布與安全辨識特徵，特別收錄容易混淆之有毒假草辨偽圖解，是野外採集與草本愛好者案頭必備工具書。',
    tableOfContents: [
      '導言：臺灣島嶼生物多樣性與藥用植物地理分區',
      '第一單元：荒地與田埂野草篇（大花咸豐草、雷公根、車前草等 20 味）',
      '第二單元：林緣與丘陵灌木篇（黃花蜜菜、白鶴靈芝、左手香等 18 味）',
      '第三單元：濕地與溪畔水生本草篇（魚腥草、半枝蓮、水丁香等 16 味）',
      '第四單元：中高山原鄉藥用植物篇（刺蔥、土人參、假酸漿等 16 味）',
      '附錄：臺灣常見有毒植物辨偽避坑指南'
    ],
    pricing: {
      physical: {
        price: 680,
        originalPrice: 800,
        stock: 45,
        format: '特裝精裝防水野外硬殼本 · 全彩微距微噴印製',
        shippingDays: '下單後 24 小時快速出貨'
      },
      ebook: {
        price: 420,
        originalPrice: 560,
        format: '高畫質向量可縮放 PDF + EPUB3 (支援植物學名全文檢索)',
        instantAccess: true
      },
      bundle: {
        price: 880,
        originalPrice: 1360,
        discountDesc: '防水硬殼野外實體書 + 高清檢索電子書合購特惠 65 折'
      }
    },
    samplePreview: {
      available: true,
      previewTitle: '【精彩試閱】導言：島嶼植物分區 & 荒地之王「大花咸豐草」微距解密',
      previewSubtitle: '植物學者專業圖解：如何從舌狀花、瘦果與葉緣鋸齒確認正品',
      readTimeMinutes: 10,
      chapters: [
        {
          chapterId: 'ch1',
          title: '導言：臺灣本草的三維立體風土生態',
          content: `### 臺灣本草的風土基因

臺灣面積僅三萬六千平方公里，卻跨越熱帶、亞熱帶至溫帶寒帶，海拔落差接近四千公尺。

* **北部河谷盆地**：多雨高濕，酸性土壤孕育大花咸豐草、鳳尾草之清熱利濕群落。
* **中部彰化南投**：日照充足，紅壤丘陵成就艾草、香茅之芳香揮發油含量頂峰。
* **東部花東縱谷**：受太平洋黑潮水氣吹拂，土壤純淨無污染，野生假酸漿與台灣藜抗氧化酚類極高。`
        },
        {
          chapterId: 'ch2',
          title: '物種詳解 01：大花咸豐草 (Bidens pilosa var. radiata)',
          content: `### 物種分類與鑑定要點

* **中文正名**：大花咸豐草
* **學名**：*Bidens pilosa* L. var. *radiata* Sch. Bip.
* **科名**：菊科 (Asteraceae)
* **俗名**：鬼針草、同治草、白花婆婆針、恰某（台語）

#### 生態辨識特徵
1. **花序特徵**：頭狀花序邊緣具白色舌狀花 5-8 枚，花冠較大長度大於 1cm，與本地原生咸豐草之無舌狀花或微小舌狀花有顯著區別。
2. **果實特徵**：瘦果黑褐色，具倒刺芒 2-3 枚，極易附著於衣物傳播種子。
3. **藥用部位**：全草乾燥或鮮用。性涼、味微苦甘，歸肝、胃、大腸經。`
        }
      ],
      previewNotice: '線上試閱到此結束。欲查閱全書 70 味高畫質本草剖面圖、微距照與採集座標指引，請購買實體或電子書！'
    }
  },
  {
    id: 'book_biotech_pharma_dialogue',
    title: '生化與草本的對話',
    subtitle: '臺灣藥用植物有效成分、藥理機轉與現代生醫實踐',
    author: '黃世勳 教授',
    authorRole: '中國醫藥大學 藥學院藥學系 教授 / 藥學博士',
    category: 'biotech_science',
    categoryName: '科學機轉',
    coverBadge: '真實學者',
    coverColor: '#4338ca',
    coverIcon: '🎓',
    isbn: '978-986-041-912-5',
    publisher: '中國醫藥大學學術典藏出版',
    publishDate: '2024-05-10',
    pages: 310,
    rating: 4.9,
    reviewCount: 96,
    tags: ['現代生技', '藥用植物學', '本草學考證', '中藥藥理學', '臨床安全'],
    summary: '中國醫藥大學藥學院藥學系黃世勳教授深耕臺灣藥用植物學與本草學，透過本草古籍考證、田野調查與現代中藥藥理學實驗，深度解析咸豐草聚乙炔類、魚腥草精油、白花蛇舌草三萜酸之微觀分子作用路徑與臨床安全配伍，將歷代古老智慧昇華為科學實證語彙。',
    tableOfContents: [
      '第一章：從「退火」到抗發炎訊號路徑——民俗概念的現代生化詮釋',
      '第二章：酚類與黃酮類化合物在臺灣野草中的富集特徵',
      '第三章：魚腥草葵醯乙醛對呼吸道黏膜屏障之防護機制',
      '第四章：大花咸豐草聚乙炔對醣代謝調節之實驗數據',
      '第五章：中草藥與現代藥物之細胞色素 P450 酵素交互作用安全指南'
    ],
    pricing: {
      physical: {
        price: 520,
        originalPrice: 600,
        stock: 30,
        format: '精裝 16 開 · 附全彩實驗圖譜與分子結構式',
        shippingDays: '下單後 24 小時快速出貨'
      },
      ebook: {
        price: 350,
        originalPrice: 450,
        format: '可搜尋 EPUB / PDF 雙版本',
        instantAccess: true
      },
      bundle: {
        price: 690,
        originalPrice: 1050,
        discountDesc: '實驗室必備精裝實體本 + 論文引用必備電子書 · 66 折'
      }
    },
    samplePreview: {
      available: true,
      previewTitle: '【精彩試閱】第一章：「退火」概念之 NF-κB 發炎訊號路徑轉譯',
      previewSubtitle: '科學解答：為什麼喝青草茶能迅速緩解喉嚨痛與口乾舌燥？',
      readTimeMinutes: 9,
      chapters: [
        {
          chapterId: 'ch1',
          title: '第一章精要：傳統「退火」的生化分型',
          content: `### 解構「火氣」的現代分子語言

常民口中的「上火」或「火氣大」，在臨床生化指標上通常對應於微發炎狀態（Low-grade chronic inflammation）與氧化壓力（Oxidative stress）的失衡表現：

1. **黏膜局部發炎**：促發炎細胞激素（TNF-α, IL-6, IL-1β）分泌增加，導致咽喉充血、牙齦腫脹。
2. **一氧化氮合酶 (iNOS) 活化**：局部組織過量生成 NO，引起毛細血管過度擴張與灼熱感。
3. **活性氧自由基 (ROS) 堆積**：熬夜代謝失調造成粒線體過氧化物激增，引發倦怠與口乾舌燥。

#### 咸豐草與金銀花的雙重阻斷
咸豐草提取物中所含之咖啡酸衍生物與木犀草素（Luteolin），能專一性抑制 IκBα 磷酸化，阻斷 NF-κB 轉錄因子向細胞核移位，從根本調降發炎介質基因表達，達到真正的「退火」效果。`
        }
      ],
      previewNotice: '線上試閱完畢！欲深入探討各類化學成分與現代藥物交互作用實驗數據，請選購全書。'
    }
  },
  {
    id: 'book_bunun_hunter_herbal_trail',
    title: '中央山脈獵人野草記',
    subtitle: '布農族獵人的高山植物智慧、山林採集與野外生存藥草錄',
    author: '達亥·拿憲 (Tahai Nahsien)',
    authorRole: '花東部落高山獵人兼野菜生態文化嚮導',
    category: 'indigenous_folk',
    categoryName: '原鄉民俗',
    coverBadge: '山林原鄉',
    coverColor: '#047857',
    coverIcon: '🏹',
    isbn: '978-986-041-923-1',
    publisher: '南橫高山布農族文化傳承會',
    publishDate: '2023-09-18',
    pages: 248,
    rating: 4.9,
    reviewCount: 112,
    tags: ['布農獵人', '中央山脈', '高山採集', '刺蔥驅寒', '獵人生存'],
    summary: '跟隨布農族資深獵人達亥的步伐，走進中央山脈南橫古道。高山森林中沒有西藥房，獵人如何用食茱萸（刺蔥）驅散高山寒氣？如何用假酸漿葉包裹獵肉消食化積？如何辨識土人參補充體能？這是一本刻印在山風與獵徑上的原住民族生態哲學與生存大典。',
    tableOfContents: [
      '第一章：聽大山的呼吸——布農族獵人的採集戒律與感謝之禮',
      '第二章：長征山路的暖身之王——食茱萸（刺蔥）與老薑高山湯',
      '第三章：獵人飯包的綠葉護衛——假酸漿葉之葉綠素與天然助消化酶',
      '第四章：跌打損傷的野林敷貼——左手香與倒吊蓮的急救智慧',
      '第五章：守護部落山林的永續傳承法'
    ],
    pricing: {
      physical: {
        price: 460,
        originalPrice: 520,
        stock: 32,
        format: '平裝 18 開 · 附原鄉手繪山林動植物地圖',
        shippingDays: '下單後 24 小時快速出貨'
      },
      ebook: {
        price: 280,
        originalPrice: 360,
        format: 'EPUB / PDF 雙格式電子書',
        instantAccess: true
      },
      bundle: {
        price: 560,
        originalPrice: 880,
        discountDesc: '手繪地圖實體書 + 電子書隨身行 · 63 折超值合購'
      }
    },
    samplePreview: {
      available: true,
      previewTitle: '【精彩試閱】第一章：採集戒律 & 第二章刺蔥長征驅寒秘方',
      previewSubtitle: '獵人叮嚀：只採成熟葉、留下根與種子，山神才會繼續賜福',
      readTimeMinutes: 7,
      chapters: [
        {
          chapterId: 'ch1',
          title: '第一章：採集戒律——對土地永遠謙卑',
          content: `### 獵人的第一堂課：取你所需，留下生命

走進高山森林，我們不叫「採藥」，我們叫「接受山林的給予」。

獵人長老教我們：看到一叢漂亮的野生刺蔥，千萬不能把頂芽連根拔起。你摘下三片老葉，留下嫩芽讓它繼續向上曬太陽；看到土人參，只挖取旁邊的旁根，主根留給大地孕育下一季的花朵。

土地不是我們的倉庫，我們只是這座大山借宿的旅人。懂得分寸，草木才會在危急時救你的命。`
        },
        {
          chapterId: 'ch2',
          title: '第二章精選：刺蔥獵人熱湯與高山驅寒法',
          content: `### 食茱萸（刺蔥）的高山能量

中央山脈稜線上，入夜氣溫驟降到攝氏零度。霧雨打在獵裝上，體溫流失會奪走人的意志。這時獵人會在石洞下升起文火，丟入隨身採擷的刺蔥嫩葉。

刺蔥樹幹長滿銳刺，葉片卻帶有極其濃烈奔放的柑橘芳香與辛辣感。

* **刺蔥驅寒湯做法**：以山泉水沸煮刺蔥鮮葉 10 克，投入炙烤山薑與微量食鹽，滾煮 5 分鐘熱飲。
* **體感效果**：辛香直衝泥丸宮，周身毛孔微舒，寒氣頓消，四肢迅速回暖！`
        }
      ],
      previewNotice: '線上試閱結束！全書收錄 20 種高山野菜採集實錄與獵人傳奇，敬請支持原鄉文化購買全本！'
    }
  },
  {
    id: 'book_seasonal_wellness_pot',
    title: '二十四節氣常民茶方錄',
    subtitle: '依時順氣的臺灣本草調養生活指南，全家人的一年四季溫潤茶壺',
    author: '臺灣青草同業聯盟 專家組',
    authorRole: '全臺青草老店傳人與漢方生活實踐小組共同策劃',
    category: 'seasonal_health',
    categoryName: '節氣養生',
    coverBadge: '節氣時序',
    coverColor: '#0f766e',
    coverIcon: '🫖',
    isbn: '978-986-041-934-7',
    publisher: '常民生活美學社',
    publishDate: '2024-01-10',
    pages: 256,
    rating: 4.8,
    reviewCount: 76,
    tags: ['二十四節氣', '四季青草', '家庭保健', '茶壺煮法', '溫和不傷胃'],
    summary: '從立春的紫蘇發散、夏至的仙草消暑，到秋分的桑葉潤燥、冬至的狗尾草健脾燉湯。本書緊扣臺灣氣候特色與農曆二十四節氣時序，提供 24 款家庭日常茶方，不論大人小孩、體質偏寒偏燥，都能在四季轉折中找到最溫和平衡的草木芳香。',
    tableOfContents: [
      '春之生發：立春、雨水、驚蟄、春分、清明、穀雨之疏肝理氣茶',
      '夏之長茂：立夏、小滿、芒種、夏至、小暑、大暑之清熱解暑涼水',
      '秋之收斂：立秋、處暑、白露、秋分、寒露、霜降之潤肺生津甘露',
      '冬之閉藏：立冬、小雪、大雪、冬至、小寒、大寒之溫陽健脾暖飲',
      '附錄：家庭煮茶常用器具與草藥保存保鮮秘訣'
    ],
    pricing: {
      physical: {
        price: 430,
        originalPrice: 490,
        stock: 50,
        format: '平裝全彩 16 開 · 特厚紙質防水覆膜',
        shippingDays: '下單後 24 小時快速出貨'
      },
      ebook: {
        price: 270,
        originalPrice: 360,
        format: 'EPUB / 手機翻閱專屬直排版 PDF',
        instantAccess: true
      },
      bundle: {
        price: 540,
        originalPrice: 850,
        discountDesc: '廚房茶几放一本 + 手機隨身看一本 · 63 折超值特惠'
      }
    },
    samplePreview: {
      available: true,
      previewTitle: '【精彩試閱】春分疏肝紫蘇茶 & 夏至仙草甘草雙清涼飲',
      previewSubtitle: '依循四時陰陽升降，讓一家老小喝得舒服又心安',
      readTimeMinutes: 6,
      chapters: [
        {
          chapterId: 'ch1',
          title: '節氣茶方 04：春分 · 紫蘇薄荷疏肝飲',
          content: `### 春分：陰陽均分，東風解凍

春分時節，晝夜平分。此時肝氣旺盛，人容易春困、情緒鬱結或受春風過敏。

* **方劑組成**：紫蘇葉 8g、薄荷 5g、甘草 3g、紅棗 2 枚（剖開）。
* **配伍作用**：以紫蘇行氣散鬱為君，薄荷輕揚宣透為臣，甘草紅棗健脾養血為佐使。
* **煮法**：水 1,200 毫升煮沸，先下紅棗煮 5 分鐘，關火前投入紫蘇與薄荷，加蓋悶 3 分鐘即可濾出。香氣撲鼻，精神清爽！`
        },
        {
          chapterId: 'ch2',
          title: '節氣茶方 10：夏至 · 仙草黃花蜜菜雙清茶',
          content: `### 夏至：陽極之至，盛暑生濕

夏至日照最長，熱邪與濕氣相蒸，人多心煩氣躁、口渴多汗。

* **方劑組成**：老仙草乾 20g、黃花蜜菜 10g、甘草 5g。
* **配伍作用**：仙草性涼味甘，直消臟腑暑氣；黃花蜜菜清熱利濕；甘草調和，防止寒涼攻胃。
* **煮法**：仙草乾洗淨後浸泡 15 分鐘，以 2,500 毫升水武火煮沸，轉文火慢熬 40 分鐘，熄火前 5 分鐘加入黃花蜜菜與甘草。放涼後甘甜沁涼，是全臺灣最道地的夏至甘露！`
        }
      ],
      previewNotice: '線上試閱結束！全書包含 24 節氣完整茶譜與食材搭配，選購電子書即可立即翻閱全本！'
    }
  }
];

// 初始示範訂單資料
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
