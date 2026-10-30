/**
 * server/data/sampleImportData.js
 * 本草資料匯入標準範例 (支援 JSON 與 CSV 格式)
 * 示範 5 味經典台灣野生草藥欄位規範
 */

const SAMPLE_HERBS_JSON = [
  {
    name: '冇骨消',
    scientificName: 'Sambucus chinensis',
    family: '忍冬科接骨木屬',
    region: '全島平野至低海拔山麓林緣',
    category: '祛風除濕類',
    nature: '平',
    taste: ['微苦', '甘'],
    channels: ['肝', '腎'],
    partsUsed: '全草或根',
    efficacy: '祛風化濕、活血散瘀、通利關節。民間多用於跌打筋骨損傷、風濕關節痛與小兒發育。',
    terroir: '性喜向陽潮濕荒地與溪流邊緣，蜜腺豐富為台灣本土多種彩蝶重要蜜源植物。',
    taiwanHeritage: '老一輩台灣農村稱其為「七葉蓮」或「接骨草」，耕作勞動筋骨痠痛時常採新鮮枝葉煎水洗浴。',
    folkApplication: '舒筋活絡藥浴、老農跌打青草茶、山野採集蜜源觀察',
    safetyLevel: '依體質酌量',
    contraindications: '孕婦慎用；大量生食果實可能引起胃腸不適，煎劑宜依適量飲用。',
    tags: ['風濕關節', '跌打散瘀', '蝴蝶蜜源', '外洗藥浴']
  },
  {
    name: '假酸漿',
    scientificName: 'Trichodesma calycosum',
    family: '紫草科假酸漿屬',
    region: '花東縱谷與屏東排灣魯凱部落山區',
    category: '消食健胃類',
    nature: '平',
    taste: ['微甘', '淡'],
    channels: ['脾', '胃'],
    partsUsed: '葉片',
    efficacy: '生津消渴、健胃消脹、清熱利濕。葉片富含植物黏液與膳食纖維，助消化分解糯米油脂。',
    terroir: '分布於南台灣與東台灣向陽山坡林緣，族人於聚落周圍普遍栽植以備日常祭儀食用。',
    taiwanHeritage: '排灣族與魯凱族傳統美食「Cinavu (吉拿富)」與「Abai (阿拜)」不可或缺的內層包裹野菜葉，可連葉同食。',
    folkApplication: '原住民傳統阿拜美食、部落節慶點心、健胃消脹野菜茶',
    safetyLevel: '無毒常服',
    contraindications: '性味平和，日常包覆料理食用安全性極高，無特殊禁忌。',
    tags: ['原民野菜', '吉拿富', '排灣魯凱', '健胃消脹', '部落美食']
  },
  {
    name: '金錢薄荷',
    scientificName: 'Glechoma hederacea var. grandis',
    family: '唇形科活血丹屬',
    region: '北台灣淺山濕潤林下與宜蘭田埂',
    category: '清熱解毒類',
    nature: '微涼',
    taste: ['辛', '微苦'],
    channels: ['肝', '膽', '膀胱'],
    partsUsed: '全草',
    efficacy: '利水通淋、清熱解毒、散瘀消腫。對濕熱黃疸、小兒感冒發熱與咽喉腫痛具良好芳香透表效果。',
    terroir: '春季開淡紫色唇形小花，葉形圓如銅錢，揉碎具強烈濃郁的清涼芳香氣味。',
    taiwanHeritage: '台灣民間俗稱「透骨消」或「連錢草」，常與薄荷、甘草同煎煮成潤喉舒爽之山林甘露茶。',
    folkApplication: '春季芳香青草茶、小兒外洗涼水、潤喉利尿家常草本飲',
    safetyLevel: '無毒常服',
    contraindications: '虛寒體質者不宜久服或過量濃煎。',
    tags: ['芳香開竅', '利尿排石', '清熱解表', '銅錢葉']
  },
  {
    name: '台灣天仙果',
    scientificName: 'Ficus formosana',
    family: '桑科榕屬',
    region: '台灣中低海拔潮濕闊葉林下',
    category: '補虛滋養類',
    nature: '平',
    taste: ['甘', '微澀'],
    channels: ['脾', '腎', '肺'],
    partsUsed: '全株或成熟果實',
    efficacy: '健脾補腎、清熱利濕、活血舒筋。富含多種植物多酚與維生素，為台灣滋補上品。',
    terroir: '台灣特有種植物，性耐陰，隱頭果成熟時呈暗紫色如羊乳頭，故台語暱稱「羊奶頭」。',
    taiwanHeritage: '台灣民間名氣響亮的「台灣天仙果燉土雞湯（羊奶頭雞）」主藥，客家與閩南皆作轉骨調養與筋骨補養聖品。',
    folkApplication: '羊奶頭燉土雞湯、產後筋骨強健茶飲、冬令進補藥膳',
    safetyLevel: '無毒常服',
    contraindications: '體質極度燥熱或急性發炎發燒期間宜暫停食用。',
    tags: ['羊奶頭', '台灣特有種', '燉雞食療', '轉骨健脾', '客庄補養']
  },
  {
    name: '雷公根',
    scientificName: 'Centella asiatica',
    family: '繖形科積雪草屬',
    region: '全台低海拔濕潤草地、田埂與溝渠旁',
    category: '清熱利濕類',
    nature: '寒',
    taste: ['苦', '辛'],
    channels: ['肝', '脾', '腎'],
    partsUsed: '全草',
    efficacy: '清熱利濕、解毒消腫、促進膠原蛋白合成與肌膚組織修復。現代化妝品核心成分「積雪草苷 (CICA)」。',
    terroir: '春雷萌動後蔓延生長極為迅速，因名雷公根；葉圓腎形如馬蹄，又名蚶殼草。',
    taiwanHeritage: '早期台灣鄉野受傷時搗爛鮮品外敷創傷消腫，客家庄亦取其新鮮嫩葉洗淨打汁加蜂蜜飲用以退火。',
    folkApplication: '積雪草修護凝膠外用、夏日退火鮮打青草露、跌打損傷外敷',
    safetyLevel: '依體質酌量',
    contraindications: '性味偏寒，脾胃虛寒容易腹瀉者忌生冷過服；孕婦避免大劑量內服。',
    tags: ['積雪草', 'CICA修護', '外敷消腫', '退癀涼茶']
  }
];

// CSV 格式範例字串 (草藥)
const SAMPLE_HERBS_CSV = `\uFEFF名稱,學名,科屬,風土產區,本草分類,藥性,藥味,歸經,藥用部位,功效描述,風土傳承故事,民間生活應用,安全等級,禁忌提示,標籤,圖片路徑
冇骨消,Sambucus chinensis,忍冬科接骨木屬,全島平野至低海拔山麓林緣,祛風除濕類,平,微苦、甘,肝、腎,全草或根,祛風化濕、活血散瘀、通利關節,老一輩農村稱其為接骨草，勞動筋骨痠痛常採新鮮枝葉洗浴,舒筋活絡藥浴、老農跌打青草茶,依體質酌量,孕婦慎用；生食果實易胃腸不適,風濕關節|跌打散瘀|外洗藥浴,/images/herbs/default_herb.svg
假酸漿,Trichodesma calycosum,紫草科假酸漿屬,花東縱谷與屏東排灣魯凱山區,消食健胃類,平,微甘、淡,脾、胃,葉片,生津消渴、健胃消脹、清熱利濕，分解糯米油脂,排灣魯凱傳統美食阿拜(Cinavu)包裹野菜葉，可連葉同食,原住民阿拜美食、健胃消脹野菜茶,無毒常服,性味平和，日常料理食用安全性極高,原民野菜|吉拿富|排灣魯凱|健胃消脹,/images/herbs/default_herb.svg
金錢薄荷,Glechoma hederacea var. grandis,唇形科活血丹屬,北台灣淺山濕潤林下與宜蘭田埂,清熱解毒類,微涼,辛、微苦,肝、膽、膀胱,全草,利水通淋、清熱解毒、散瘀消腫、芳香透表,民間俗稱連錢草，揉碎具清涼香氣，常與薄荷甘草同煎,春季芳香青草茶、小兒外洗涼水,無毒常服,虛寒體質者不宜久服或過量濃煎,芳香開竅|利尿排石|銅錢葉,/images/herbs/default_herb.svg
台灣天仙果,Ficus formosana,桑科榕屬,台灣中低海拔潮濕闊葉林下,補虛滋養類,平,甘、微澀,脾、腎、肺,全株或果實,健脾補腎、清熱利濕、活血舒筋，富含植物多酚,俗稱羊奶頭，為民間名氣響亮的羊奶頭燉土雞湯主藥,羊奶頭燉土雞湯、冬令進補藥膳,無毒常服,體質極度燥熱或急性發炎發燒期間暫停,羊奶頭|台灣特有種|燉雞食療|客庄補養,/images/herbs/default_herb.svg
雷公根,Centella asiatica,繖形科積雪草屬,全台低海拔濕潤草地與田埂,清熱利濕類,寒,苦、辛,肝、脾、腎,全草,清熱利濕、解毒消腫、促進膠原蛋白合成與肌膚修護,鄉野受傷時搗爛鮮品外敷消腫，現代CICA修護名藥,積雪草修護外用、夏日退火青草露,依體質酌量,性偏寒，脾胃虛寒易瀉者慎服，孕婦忌大量,積雪草|CICA修護|外敷消腫|退癀涼茶,/images/herbs/default_herb.svg`;

// 草藥店範例資料 (JSON)
const SAMPLE_SHOPS_JSON = [
  {
    name: '三寶堂青草茶莊',
    region: '北部 (萬華/淡水河/雙北)',
    city: '台北市',
    district: '大同區',
    address: '台北市大同區迪化街一段188號',
    phone: '02-2553-8899',
    history: '大稻埕百年中藥青草世家，歷經四代相傳',
    specialties: '大稻埕百年退火涼茶、金銀花潤喉散、特調十味青草茶',
    businessHours: '週一至週六 09:00 - 20:00 / 週日公休',
    badge: '大稻埕百年名店',
    tags: ['大稻埕老店', '代客熬煮', '節氣養生飲', '真空隨身包'],
    featuredHerbs: ['金銀花', '大花咸豐草', '薄荷', '甘草', '白鶴靈芝'],
    buyingGuide: '青草乾品應置於陰涼通風處密封保存；熬茶時水滾後關文火慢熬 30 分鐘香氣最佳。',
    shippingAvailable: true,
    imageUrl: '/images/uploads/shop_sample_1.jpg'
  },
  {
    name: '南庄客家本草行',
    region: '桃竹苗 (客庄丘陵/關西/南庄)',
    city: '苗栗縣',
    district: '南庄鄉',
    address: '苗栗縣南庄鄉中正路56號',
    phone: '037-822-168',
    history: '深耕客庄五十年，傳承客家洗浴本草與坐月子藥草',
    specialties: '客家辟邪抹草艾草包、大風草月子擦澡包、古法仙草乾',
    businessHours: '週一至週日 08:30 - 18:00',
    badge: '客庄老鋪',
    tags: ['客家抹草', '大風草月子', '百年老仙草乾', '產地直採'],
    featuredHerbs: ['抹草', '艾草', '大風草', '香茅', '仙草'],
    buyingGuide: '客家沐浴草藥以乾燥全株紮捆為佳，洗澡或擦澡前浸泡熱水 15 分鐘待草氣釋出。',
    shippingAvailable: true,
    imageUrl: '/images/uploads/shop_sample_2.jpg'
  }
];

// 草藥店範例字串 (CSV)
const SAMPLE_SHOPS_CSV = `\uFEFF店家名稱,風土區域,縣市,鄉鎮市區,詳細地址,聯絡電話,歷史淵源,招牌特色,營業時間,認證標章,特色標籤,主打藥材,採買指引,支援宅配,圖片路徑
三寶堂青草茶莊,北部 (萬華/淡水河/雙北),台北市,大同區,台北市大同區迪化街一段188號,02-2553-8899,大稻埕百年中藥青草世家，歷經四代相傳,大稻埕百年退火涼茶、金銀花潤喉散、特調十味青草茶,週一至週六 09:00 - 20:00 / 週日公休,大稻埕百年名店,大稻埕老店|代客熬煮|節氣養生飲|真空隨身包,金銀花、大花咸豐草、薄荷、甘草、白鶴靈芝,青草乾品應置於陰涼通風處密封保存；熬茶時水滾後關文火慢熬 30 分鐘香氣最佳,是,/images/uploads/shop_sample_1.jpg
南庄客家本草行,桃竹苗 (客庄丘陵/關西/南庄),苗栗縣,南庄鄉,苗栗縣南庄鄉中正路56號,037-822-168,深耕客庄五十年，傳承客家洗浴本草與坐月子藥草,客家辟邪抹草艾草包、大風草月子擦澡包、古法仙草乾,週一至週日 08:30 - 18:00,客庄老鋪,客家抹草|大風草月子|百年老仙草乾|產地直採,抹草、艾草、大風草、香茅、仙草,客家沐浴草藥以乾燥全株紮捆為佳，洗澡或擦澡前浸泡熱水 15 分鐘待草氣釋出,是,/images/uploads/shop_sample_2.jpg`;

// 書庫藏書範例資料 (JSON)
const SAMPLE_BOOKS_JSON = [
  {
    title: '臺灣本草田野考證全集',
    subtitle: '三十載島嶼山川踏查與原生青草性味圖鑑',
    author: '黃世勳 教授',
    authorRole: '生藥學博士 · 臺灣本草考證權威',
    category: 'botany_herbs',
    categoryName: '植物學與生藥誌',
    coverBadge: '🎓 經典巨著',
    coverColor: '#1e3a8a',
    coverIcon: '🌿',
    price: 680,
    originalPrice: 850,
    pages: 420,
    isbn: '978-986-12345-6-7',
    rating: 4.9,
    reviewsCount: 168,
    description: '深度考證台灣全島七十味重要本草，結合傳統性味歸經與現代活性化學成分，兼具學術與實用價值。',
    trialNotice: '全書第一章至第二章提供免費線上試閱，包含台灣本土咸豐草與羊奶頭專章。',
    coverImage: '/images/uploads/book_sample_1.jpg'
  },
  {
    title: '客庄百草歲時記',
    subtitle: '二十四節氣洗浴食療與常民智慧',
    author: '彭秀妹 / 林志成 合著',
    authorRole: '苗栗客庄文史研究者',
    category: 'folk_wisdom',
    categoryName: '常民民俗與風土',
    coverBadge: '客庄風土',
    coverColor: '#b45309',
    coverIcon: '👵',
    price: 450,
    originalPrice: 520,
    pages: 280,
    isbn: '978-986-98765-4-3',
    rating: 4.8,
    reviewsCount: 92,
    description: '收錄客家庄代代相傳之辟邪三草、大風草擦澡與仙草熬煮古法，圖文並茂記錄生活中的草木智慧。',
    trialNotice: '前言與第一篇「抹草與艾草的節慶記事」開放全篇試閱。',
    coverImage: '/images/uploads/book_sample_2.jpg'
  }
];

// 書庫藏書範例字串 (CSV)
const SAMPLE_BOOKS_CSV = `\uFEFF書名,副標題,作者,作者頭銜,分類代碼,分類名稱,封面標章,代表圖標,封面色系,定價,原價,頁數,國際書號ISBN,評分,讀者評論數,書籍簡介,試閱說明,封面圖片路徑
臺灣本草田野考證全集,三十載島嶼山川踏查與原生青草性味圖鑑,黃世勳 教授,生藥學博士 · 臺灣本草考證權威,botany_herbs,植物學與生藥誌,🎓 經典巨著,🌿,#1e3a8a,680,850,420,978-986-12345-6-7,4.9,168,深度考證台灣全島七十味重要本草，結合傳統性味歸經與現代活性化學成分，兼具學術與實用價值,全書第一章至第二章提供免費線上試閱，包含咸豐草與羊奶頭專章,/images/uploads/book_sample_1.jpg
客庄百草歲時記,二十四節氣洗浴食療與常民智慧,彭秀妹 / 林志成 合著,苗栗客庄文史研究者,folk_wisdom,常民民俗與風土,客庄風土,👵,#b45309,450,520,280,978-986-98765-4-3,4.8,92,收錄客家庄代代相傳之辟邪三草、大風草擦澡與仙草熬煮古法，圖文並茂記錄生活中的草木智慧,前言與第一篇抹草與艾草的節慶記事開放全篇試閱,/images/uploads/book_sample_2.jpg`;

module.exports = {
  SAMPLE_HERBS_JSON,
  SAMPLE_HERBS_CSV,
  SAMPLE_SHOPS_JSON,
  SAMPLE_SHOPS_CSV,
  SAMPLE_BOOKS_JSON,
  SAMPLE_BOOKS_CSV
};

