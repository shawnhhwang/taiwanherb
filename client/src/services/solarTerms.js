/**
 * client/src/services/solarTerms.js
 * 臺灣二十四節氣時序與本土草藥當令推薦服務
 */

export const SOLAR_TERMS = [
  { name: '小寒', month: 1, day: 5, dateRange: '1/05 - 1/19', wisdom: '寒氣冷冽，陽氣初動，宜以食茱萸、紫蘇溫胃理氣、驅散體內伏寒。', herbNames: ['食茱萸', '紫蘇', '甘草'] },
  { name: '大寒', month: 1, day: 20, dateRange: '1/20 - 2/02', wisdom: '歲末極寒，陰氣至極，宜以黃耆、枸杞慢火燉補，補氣升陽、固本培元。', herbNames: ['黃耆', '枸杞子', '狗尾草'] },
  { name: '立春', month: 2, day: 3, dateRange: '2/03 - 2/18', wisdom: '天地初開，東風解凍，宜以薄荷、艾草升發陽氣、通達少陽生發之機。', herbNames: ['薄荷', '艾草', '桑葉'] },
  { name: '雨水', month: 2, day: 19, dateRange: '2/19 - 3/04', wisdom: '春雨綿綿，濕氣漸生，宜以紫蘇行氣和胃、車前草通利水道祛微濕。', herbNames: ['紫蘇', '車前草', '甘草'] },
  { name: '驚蟄', month: 3, day: 5, dateRange: '3/05 - 3/19', wisdom: '雷鳴動地，萬物復甦，宜採雷公根清利濕熱、薄荷芳香解鬱以應春陽。', herbNames: ['雷公根', '薄荷', '魚腥草'] },
  { name: '春分', month: 3, day: 20, dateRange: '3/20 - 4/04', wisdom: '天地陽氣舒發，肝氣旺盛，宜飲薄荷、桑葉以疏肝解鬱、清利頭目。', herbNames: ['薄荷', '桑葉', '枸杞子'] },
  { name: '清明', month: 4, day: 5, dateRange: '4/05 - 4/19', wisdom: '草木清明，慎終追遠，採客家抹草、艾草沐浴淨身、辟邪散寒溫經絡。', herbNames: ['艾草', '抹草', '薄荷'] },
  { name: '穀雨', month: 4, day: 20, dateRange: '4/20 - 5/04', wisdom: '暮春雨沛，濕溫交織，煮車前草排濁濕，採鳳尾草清心涼血。', herbNames: ['車前草', '鳳尾草', '桑葉'] },
  { name: '立夏', month: 5, day: 5, dateRange: '5/05 - 5/20', wisdom: '暑氣初生，心火漸熾，宜取金銀花配甘草煮露，清心涼血、芳香化濕。', herbNames: ['金銀花', '薄荷', '甘草'] },
  { name: '小滿', month: 5, day: 21, dateRange: '5/21 - 6/04', wisdom: '麥類漸滿，濕熱漸蒸，取白花蛇舌草、雷公根清熱解毒、利水消腫。', herbNames: ['白花蛇舌草', '雷公根', '車前草'] },
  { name: '芒種', month: 6, day: 5, dateRange: '6/05 - 6/20', wisdom: '梅雨濕熱交蒸，端午懸艾避穢，採艾草溫灸足三里、香茅驅穢化濕。', herbNames: ['艾草', '香茅', '抹草'] },
  { name: '夏至', month: 6, day: 21, dateRange: '6/21 - 7/06', wisdom: '陽氣之極，心煩口渴，萬華青草舖大火沸煮咸豐草、鳳尾草，退火生津。', herbNames: ['大花咸豐草', '鳳尾草', '仙草'] },
  { name: '小暑', month: 7, day: 7, dateRange: '7/07 - 7/22', wisdom: '盛夏蒸溽，多汗耗氣傷津，煮仙草甘茶解渴，摘左手香鮮葉清涼解表。', herbNames: ['仙草', '左手香', '車前草'] },
  { name: '大暑', month: 7, day: 23, dateRange: '7/23 - 8/06', wisdom: '全年至熱之節，火氣深伏，取穿心蓮、大花咸豐草苦寒解熱、消癰散毒。', herbNames: ['穿心蓮', '大花咸豐草', '白鶴靈芝'] },
  { name: '立秋', month: 8, day: 7, dateRange: '8/07 - 8/22', wisdom: '涼風將至，暑氣未除，宜引白鶴靈芝潤肺平喘，山苦瓜退心火殘熱。', herbNames: ['白鶴靈芝', '山苦瓜', '雷公根'] },
  { name: '處暑', month: 8, day: 23, dateRange: '8/23 - 9/06', wisdom: '夏秋交接，肌膚微燥，以雷公根（積雪草）清熱利濕、生肌潤膚。', herbNames: ['雷公根', '魚腥草', '甘草'] },
  { name: '白露', month: 9, day: 7, dateRange: '9/07 - 9/21', wisdom: '秋燥犯肺，咽乾少痰，取魚腥草慢火熬甘草水，清肺排濁、通利水道。', herbNames: ['魚腥草', '甘草', '桑葉'] },
  { name: '秋分', month: 9, day: 22, dateRange: '9/22 - 10/07', wisdom: '晝夜均平，陰長陽消，宜泡枸杞桑葉茶滋補肝腎、益精明目、滋陰潤燥。', herbNames: ['枸杞子', '桑葉', '白花蛇舌草'] },
  { name: '寒露', month: 10, day: 8, dateRange: '10/08 - 10/22', wisdom: '露氣寒冷，秋燥轉盛，以紫蘇行氣散微寒、解魚蟹腥毒、溫胃安中。', herbNames: ['紫蘇', '薄荷', '甘草'] },
  { name: '霜降', month: 10, day: 23, dateRange: '10/23 - 11/06', wisdom: '草木經霜，收斂精氣，摘經霜桑葉清肺潤燥，泡黃耆厚片固表抗寒。', herbNames: ['桑葉', '黃耆', '枸杞子'] },
  { name: '立冬', month: 11, day: 7, dateRange: '11/07 - 11/21', wisdom: '立冬補冬，補嘴空，臺灣民間煮狗尾草燉土雞，開脾健胃、消疳化積。', herbNames: ['狗尾草', '食茱萸', '甘草'] },
  { name: '小雪', month: 11, day: 22, dateRange: '11/22 - 12/06', wisdom: '天地初凝，寒意入骨，客庄煮大風草湯沐浴暖身、溫經散寒、祛風行氣。', herbNames: ['大風草', '食茱萸', '紫蘇'] },
  { name: '大雪', month: 12, day: 7, dateRange: '12/07 - 12/20', wisdom: '陰氣更盛，風寒侵襲，取大風草配艾草溫通經絡、活血止痛調營衛。', herbNames: ['大風草', '艾草', '黃耆'] },
  { name: '冬至', month: 12, day: 21, dateRange: '12/21 - 1/04', wisdom: '陰極生陽，萬物蟄藏，以黃耆、枸杞慢火燉補，補氣升陽、固本培元。', herbNames: ['黃耆', '枸杞子', '狗尾草'] }
];

/**
 * 依據日期計算當前最接近的二十四節氣
 * @param {Date} [targetDate] - 目標日期，預設當前現實時間
 * @returns {object} 當令節氣物件
 */
export function getCurrentSolarTerm(targetDate = new Date()) {
  const m = targetDate.getMonth() + 1; // 1-12
  const d = targetDate.getDate();

  // 計算每個節氣與當前日期的天數距離（轉換成一年的通算天數）
  const getDayOfYear = (month, day) => {
    const daysInMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let sum = 0;
    for (let i = 1; i < month; i++) sum += daysInMonths[i];
    return sum + day;
  };

  const targetDay = getDayOfYear(m, d);

  let closestTerm = SOLAR_TERMS[0];
  let minDiff = 999;

  for (const term of SOLAR_TERMS) {
    const termDay = getDayOfYear(term.month, term.day);
    let diff = Math.abs(targetDay - termDay);
    if (diff > 182) {
      diff = 365 - diff; // 環狀年差計算
    }
    if (diff < minDiff) {
      minDiff = diff;
      closestTerm = term;
    }
  }

  return closestTerm;
}

/**
 * 從現有本草庫中找出與當前節氣最匹配的推薦草藥
 * @param {Array} allHerbs - 全量草藥列表
 * @param {Date} [targetDate] - 目標日期
 * @returns {{ term: object, herb: object, reason: string }}
 */
export function getSeasonalHerbRecommendation(allHerbs = [], targetDate = new Date()) {
  const term = getCurrentSolarTerm(targetDate);
  
  if (!allHerbs || allHerbs.length === 0) {
    return {
      term,
      herb: null,
      reason: term.wisdom
    };
  }

  // 優先在節氣推薦清單中尋找完全符合名稱的草藥
  for (const targetName of term.herbNames) {
    const matched = allHerbs.find(h => 
      h.name === targetName || 
      (h.commonNames && h.commonNames.includes(targetName))
    );
    if (matched) {
      return {
        term,
        herb: matched,
        reason: `【${term.name}當令】${term.wisdom}`
      };
    }
  }

  // 若沒精確命中名稱，則模糊搜尋節氣關鍵字或回傳第一味草藥
  return {
    term,
    herb: allHerbs[0],
    reason: `【${term.name}當令】天地氣候轉移，宜順應四時採擷本草調養。`
  };
}
