/**
 * scripts/generateHerbSvg.js
 * 臺灣本草植物學典藏向量圖鑑產生器 (東方水墨線描古卷風格，100% 原創自製，零版權風險)
 * 為全島 70 味本草生成獨立的 SVG 標本圖檔
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../client/public/images/herbs');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 根據植物形態學、科屬與色彩特性定義 13 大形態圖譜生成邏輯
function renderHerbBotanicalSvg(herb) {
  const {
    id,
    name,
    scientificName,
    family,
    category,
    region,
    archetype = 'aster_daisy',
    theme = 'green',
    sealText = '本草'
  } = herb;

  // 主題配色表
  const colorThemes = {
    green: {
      primary: '#2E5A44',
      secondary: '#4D8067',
      light: '#88B89C',
      accent: '#E6A15C',
      accentFill: '#FFF8E7',
      stem: '#455A46',
      dark: '#1C3829'
    },
    tea_gold: {
      primary: '#856427',
      secondary: '#AB863F',
      light: '#D4B472',
      accent: '#D97724',
      accentFill: '#FFF4D6',
      stem: '#5C4824',
      dark: '#453213'
    },
    purple: {
      primary: '#5B3B66',
      secondary: '#7A5387',
      light: '#A682B3',
      accent: '#D9779B',
      accentFill: '#FCEEF5',
      stem: '#4A3452',
      dark: '#382040'
    },
    berry_red: {
      primary: '#913535',
      secondary: '#B54C4C',
      light: '#D98282',
      accent: '#E6A817',
      accentFill: '#FFF2D9',
      stem: '#5C3838',
      dark: '#4D1C1C'
    },
    teal: {
      primary: '#2B5E63',
      secondary: '#417E85',
      light: '#72A8AF',
      accent: '#E0924A',
      accentFill: '#FFF3E8',
      stem: '#355357',
      dark: '#183B3E'
    },
    fern: {
      primary: '#325C38',
      secondary: '#4F8056',
      light: '#82B088',
      accent: '#8A6D3B',
      accentFill: '#F7EEDC',
      stem: '#3E4D38',
      dark: '#1F3B24'
    },
    sienna: {
      primary: '#734D2E',
      secondary: '#946740',
      light: '#BF946D',
      accent: '#B84D35',
      accentFill: '#FCECE8',
      stem: '#523721',
      dark: '#3D2513'
    }
  };

  const c = colorThemes[theme] || colorThemes.green;
  const numStr = String(id).padStart(3, '0');
  const watermarkChar = name.charAt(0);

  // 繪製中心植物植物學圖案
  let plantArtwork = '';

  switch (archetype) {
    case 'aster_daisy':
      // 菊科：分枝莖、鋸齒葉、頭狀花序 (舌狀花 + 管狀花心)
      plantArtwork = `
        <!-- 根部 -->
        <path d="M 400 480 Q 402 520 395 550 M 400 490 Q 380 525 365 545 M 401 500 Q 425 530 435 550" stroke="${c.stem}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.65"/>
        <!-- 主莖 -->
        <path d="M 400 480 Q 402 380 395 280 T 390 180" stroke="${c.stem}" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M 395 320 Q 340 280 310 220" stroke="${c.stem}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M 398 260 Q 450 230 480 180" stroke="${c.stem}" stroke-width="3.5" stroke-linecap="round" fill="none"/>

        <!-- 側生葉片 -->
        <!-- 左下葉 -->
        <path d="M 398 390 Q 310 390 270 340 Q 330 320 398 370 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.5" opacity="0.9"/>
        <path d="M 398 390 Q 335 355 270 340" stroke="${c.light}" stroke-width="1.5" fill="none"/>
        <!-- 右下葉 -->
        <path d="M 400 360 Q 480 365 525 315 Q 465 295 398 340 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.5" opacity="0.9"/>
        <path d="M 400 360 Q 465 330 525 315" stroke="${c.light}" stroke-width="1.5" fill="none"/>
        <!-- 中間葉 -->
        <path d="M 395 300 Q 320 285 290 240 Q 350 230 395 285 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.5"/>
        <path d="M 398 250 Q 470 240 500 195 Q 445 185 396 235 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.5"/>

        <!-- 花朵 1: 左花 -->
        <g transform="translate(310, 220)">
          <!-- 綠色花萼 -->
          <ellipse cx="0" cy="8" rx="14" ry="7" fill="${c.primary}" stroke="${c.dark}" stroke-width="1"/>
          <!-- 舌狀白色/黃色花瓣 -->
          <g fill="${c.accentFill}" stroke="${c.accent}" stroke-width="1">
            <ellipse cx="0" cy="-22" rx="7" ry="16"/>
            <ellipse cx="16" cy="-16" rx="7" ry="16" transform="rotate(35 16 -16)"/>
            <ellipse cx="22" cy="0" rx="7" ry="16" transform="rotate(70 22 0)"/>
            <ellipse cx="16" cy="16" rx="7" ry="16" transform="rotate(110 16 16)"/>
            <ellipse cx="-16" cy="16" rx="7" ry="16" transform="rotate(-110 -16 16)"/>
            <ellipse cx="-22" cy="0" rx="7" ry="16" transform="rotate(-70 -22 0)"/>
            <ellipse cx="-16" cy="-16" rx="7" ry="16" transform="rotate(-35 -16 -16)"/>
          </g>
          <!-- 黃金管狀花心 -->
          <circle cx="0" cy="0" r="13" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2"/>
          <circle cx="0" cy="0" r="9" fill="#F49D1A" stroke="#B86E00" stroke-width="0.8" stroke-dasharray="2 2"/>
        </g>

        <!-- 花朵 2: 主花頂生 -->
        <g transform="translate(390, 175) scale(1.15)">
          <ellipse cx="0" cy="8" rx="16" ry="8" fill="${c.primary}" stroke="${c.dark}" stroke-width="1"/>
          <g fill="${c.accentFill}" stroke="${c.accent}" stroke-width="1">
            <ellipse cx="0" cy="-24" rx="7.5" ry="17"/>
            <ellipse cx="17" cy="-17" rx="7.5" ry="17" transform="rotate(35 17 -17)"/>
            <ellipse cx="24" cy="0" rx="7.5" ry="17" transform="rotate(75 24 0)"/>
            <ellipse cx="17" cy="17" rx="7.5" ry="17" transform="rotate(115 17 17)"/>
            <ellipse cx="-17" cy="17" rx="7.5" ry="17" transform="rotate(-115 -17 17)"/>
            <ellipse cx="-24" cy="0" rx="7.5" ry="17" transform="rotate(-75 -24 0)"/>
            <ellipse cx="-17" cy="-17" rx="7.5" ry="17" transform="rotate(-35 -17 -17)"/>
          </g>
          <circle cx="0" cy="0" r="14" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2"/>
          <circle cx="0" cy="0" r="10" fill="#F49D1A" stroke="#B86E00" stroke-width="0.8" stroke-dasharray="2 2"/>
        </g>

        <!-- 花朵 3: 右側小花苞 -->
        <g transform="translate(480, 180) scale(0.85)">
          <ellipse cx="0" cy="8" rx="12" ry="6" fill="${c.primary}" stroke="${c.dark}" stroke-width="1"/>
          <g fill="${c.accentFill}" stroke="${c.accent}" stroke-width="1">
            <ellipse cx="0" cy="-20" rx="6" ry="14"/>
            <ellipse cx="14" cy="-14" rx="6" ry="14" transform="rotate(40 14 -14)"/>
            <ellipse cx="20" cy="0" rx="6" ry="14" transform="rotate(80 20 0)"/>
            <ellipse cx="-20" cy="0" rx="6" ry="14" transform="rotate(-80 -20 0)"/>
            <ellipse cx="-14" cy="-14" rx="6" ry="14" transform="rotate(-40 -14 -14)"/>
          </g>
          <circle cx="0" cy="0" r="11" fill="${c.accent}" stroke="${c.dark}" stroke-width="1"/>
        </g>
      `;
      break;

    case 'cordate_heart':
      // 心型葉 (魚腥草、火炭母草、鴨舌草)
      plantArtwork = `
        <!-- 地下匍匐莖與鬚根 -->
        <path d="M 320 480 Q 400 495 480 485" stroke="${c.stem}" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M 360 490 Q 355 530 350 550 M 420 490 Q 425 535 420 555 M 460 485 Q 465 520 470 545" stroke="${c.stem}" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6"/>
        <!-- 直立花莖 -->
        <path d="M 400 480 Q 395 380 405 280 T 400 170" stroke="${c.stem}" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        
        <!-- 葉柄與典型心型互生葉片 -->
        <!-- 葉片 1 (底層大心型) -->
        <g transform="translate(330, 390)">
          <path d="M 70 -10 Q 30 10 0 50 Q -30 20 -20 -20 Q -10 -50 20 -50 Q 50 -50 70 -10 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.8"/>
          <path d="M 70 -10 Q 30 -5 0 50" stroke="${c.light}" stroke-width="1.5" fill="none"/>
          <path d="M 30 -5 Q 10 -25 -10 -20 M 35 -5 Q 15 20 0 35" stroke="${c.light}" stroke-width="1" fill="none" opacity="0.8"/>
        </g>
        <!-- 葉片 2 (右側中心型) -->
        <g transform="translate(410, 330)">
          <path d="M -10 -10 Q 30 10 70 50 Q 100 20 90 -20 Q 80 -50 50 -50 Q 20 -50 -10 -10 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.8"/>
          <path d="M -10 -10 Q 30 -5 70 50" stroke="${c.light}" stroke-width="1.5" fill="none"/>
          <path d="M 30 -5 Q 50 -25 75 -20 M 35 -5 Q 45 20 60 35" stroke="${c.light}" stroke-width="1" fill="none" opacity="0.8"/>
        </g>
        <!-- 葉片 3 (頂生幼心葉) -->
        <g transform="translate(360, 260) scale(0.8)">
          <path d="M 50 -10 Q 20 10 0 50 Q -20 20 -15 -20 Q -5 -40 20 -40 Q 40 -40 50 -10 Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1.5"/>
          <path d="M 50 -10 Q 20 -5 0 50" stroke="#FFF" stroke-width="1.2" fill="none"/>
        </g>

        <!-- 頂生白色四瓣花序與圓錐穗 (魚腥草標誌) -->
        <g transform="translate(402, 170)">
          <!-- 四枚白色花瓣狀總苞片 -->
          <ellipse cx="0" cy="-22" rx="13" ry="20" fill="#FCFAF2" stroke="${c.light}" stroke-width="1.2"/>
          <ellipse cx="22" cy="0" rx="13" ry="20" transform="rotate(90 22 0)" fill="#FCFAF2" stroke="${c.light}" stroke-width="1.2"/>
          <ellipse cx="0" cy="22" rx="13" ry="20" fill="#FCFAF2" stroke="${c.light}" stroke-width="1.2"/>
          <ellipse cx="-22" cy="0" rx="13" ry="20" transform="rotate(-90 -22 0)" fill="#FCFAF2" stroke="${c.light}" stroke-width="1.2"/>
          <!-- 淡黃色圓柱花穗 -->
          <path d="M -6 10 L -4 -25 Q 0 -35 4 -25 L 6 10 Z" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2"/>
          <line x1="-3" y1="-15" x2="3" y2="-15" stroke="#FFF" stroke-width="1" opacity="0.8"/>
          <line x1="-4" y1="-5" x2="4" y2="-5" stroke="#FFF" stroke-width="1" opacity="0.8"/>
          <line x1="-4" y1="5" x2="4" y2="5" stroke="#FFF" stroke-width="1" opacity="0.8"/>
        </g>
      `;
      break;

    case 'mint_lamiaceae':
      // 唇形科：四稜莖、十字對生齒葉、輪傘花序/頂生穗狀花序 (薄荷、紫蘇、左手香、貓鬚草)
      plantArtwork = `
        <path d="M 400 480 Q 402 525 390 550 M 401 500 Q 425 535 435 555" stroke="${c.stem}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6"/>
        <!-- 四稜四方莖 -->
        <path d="M 400 480 L 400 160" stroke="${c.stem}" stroke-width="5.5" stroke-linecap="round" fill="none"/>
        <line x1="398" y1="480" x2="398" y2="160" stroke="${c.dark}" stroke-width="1" opacity="0.4"/>

        <!-- 第一對對生葉 (下) -->
        <g transform="translate(400, 420)">
          <path d="M 0 0 C -40 -20 -100 -20 -130 5 C -100 35 -40 25 0 0 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.8"/>
          <path d="M 0 0 C 40 -20 100 -20 130 5 C 100 35 40 25 0 0 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.8"/>
          <path d="M 0 0 L -120 5 M 0 0 L 120 5" stroke="${c.light}" stroke-width="1.5"/>
        </g>

        <!-- 第二對對生葉 (中) -->
        <g transform="translate(400, 340) scale(0.9)">
          <path d="M 0 0 C -40 -25 -95 -25 -125 0 C -95 30 -40 20 0 0 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.8"/>
          <path d="M 0 0 C 40 -25 95 -25 125 0 C 95 30 40 20 0 0 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.8"/>
          <path d="M 0 0 L -115 0 M 0 0 L 115 0" stroke="${c.light}" stroke-width="1.5"/>
        </g>

        <!-- 第三對對生葉 (上) -->
        <g transform="translate(400, 260) scale(0.75)">
          <path d="M 0 0 C -35 -20 -80 -20 -110 0 C -80 25 -35 15 0 0 Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1.8"/>
          <path d="M 0 0 C 35 -20 80 -20 110 0 C 80 25 35 15 0 0 Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1.8"/>
          <path d="M 0 0 L -100 0 M 0 0 L 100 0" stroke="#FFF" stroke-width="1.5"/>
        </g>

        <!-- 頂生輪傘花序/細密花穗 -->
        <g transform="translate(400, 160)">
          <!-- 穗軸 -->
          <line x1="0" y1="30" x2="0" y2="-30" stroke="${c.stem}" stroke-width="3"/>
          <!-- 密集粉紫/淡白唇形小花 -->
          <g fill="${c.accent}" stroke="${c.dark}" stroke-width="0.8">
            <circle cx="-12" cy="20" r="6"/> <circle cx="12" cy="20" r="6"/>
            <circle cx="-14" cy="8" r="5.5"/> <circle cx="14" cy="8" r="5.5"/>
            <circle cx="-10" cy="-4" r="5"/> <circle cx="10" cy="-4" r="5"/>
            <circle cx="-7" cy="-16" r="4.5"/> <circle cx="7" cy="-16" r="4.5"/>
            <circle cx="0" cy="-28" r="4"/>
          </g>
          <!-- 伸出的花絲 -->
          <path d="M -12 20 Q -24 16 -30 18 M 12 20 Q 24 16 30 18 M -14 8 Q -28 4 -32 6 M 14 8 Q 28 4 32 6" stroke="${c.accent}" stroke-width="1" fill="none"/>
        </g>
      `;
      break;

    case 'fern_frond':
      // 蕨類：羽狀裂葉、捲曲幼葉 (鳳尾草、過溝菜蕨、海金沙、山蘇)
      plantArtwork = `
        <!-- 根狀莖與褐色鱗片 -->
        <path d="M 360 490 Q 400 480 440 495" stroke="#5E432D" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M 370 495 Q 360 535 350 550 M 410 495 Q 415 540 420 555 M 435 495 Q 445 530 450 545" stroke="#4A3421" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>

        <!-- 主葉軸 (優美弧線) -->
        <path d="M 400 480 Q 410 320 370 160" stroke="${c.stem}" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M 390 480 Q 340 360 300 240" stroke="${c.stem}" stroke-width="4" stroke-linecap="round" fill="none"/>
        
        <!-- 蕨菜幼卷葉 (拳卷幼葉 Fiddlehead) -->
        <path d="M 415 480 Q 430 400 450 360 Q 460 340 450 330 Q 438 335 442 345 Q 448 350 452 344" stroke="${c.light}" stroke-width="3.5" stroke-linecap="round" fill="none"/>

        <!-- 主羽葉羽片 (左側與右側) -->
        <!-- 羽片 1 -->
        <path d="M 396 380 Q 320 380 280 370 Q 340 355 393 365 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.5"/>
        <path d="M 398 375 Q 475 365 520 350 Q 460 340 395 355 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.5"/>
        <!-- 羽片 2 -->
        <path d="M 390 320 Q 315 315 285 295 Q 340 290 388 305 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.5"/>
        <path d="M 392 315 Q 465 295 505 275 Q 450 275 388 298 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.5"/>
        <!-- 羽片 3 -->
        <path d="M 382 255 Q 320 245 295 220 Q 345 225 380 240 Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1.5"/>
        <path d="M 384 250 Q 450 230 480 205 Q 435 210 380 235 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.5"/>
        <!-- 頂羽片 -->
        <path d="M 370 180 Q 355 120 370 100 Q 385 120 370 180 Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1.5"/>

        <!-- 孢子囊群點綴 (羽片下表面金黃孢子) -->
        <g fill="${c.accent}" opacity="0.8">
          <circle cx="330" cy="373" r="2.5"/> <circle cx="350" cy="374" r="2.5"/> <circle cx="370" cy="375" r="2.5"/>
          <circle cx="430" cy="360" r="2.5"/> <circle cx="450" cy="355" r="2.5"/> <circle cx="470" cy="350" r="2.5"/>
          <circle cx="335" cy="310" r="2.5"/> <circle cx="355" cy="312" r="2.5"/>
        </g>
      `;
      break;

    case 'pinnate_shrub':
      // 羽狀複葉灌木/喬木 (食茱萸、刺蔥、刺五加、救必應、冇骨消、構樹)
      plantArtwork = `
        <!-- 木質強勁主幹 -->
        <path d="M 400 480 Q 395 360 405 260 T 400 150" stroke="${c.stem}" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M 400 340 Q 330 300 290 240" stroke="${c.stem}" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M 402 280 Q 470 240 510 180" stroke="${c.stem}" stroke-width="4" stroke-linecap="round" fill="none"/>

        <!-- 莖幹上的鳥不踏皮刺 (食茱萸/刺蔥特徵) -->
        <polygon points="397,420 385,416 397,412" fill="${c.dark}"/>
        <polygon points="403,370 415,366 403,362" fill="${c.dark}"/>
        <polygon points="397,320 385,316 397,312" fill="${c.dark}"/>

        <!-- 左側奇數羽狀複葉 -->
        <g transform="translate(290, 240)">
          <!-- 小葉 5 枚 -->
          <ellipse cx="-20" cy="-10" rx="26" ry="12" transform="rotate(-20 -20 -10)" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="20" cy="15" rx="26" ry="12" transform="rotate(20 20 15)" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="-45" cy="-35" rx="24" ry="11" transform="rotate(-30 -45 -35)" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="0" cy="-20" rx="24" ry="11" transform="rotate(10 0 -20)" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.2"/>
          <!-- 頂生小葉 -->
          <ellipse cx="-70" cy="-60" rx="28" ry="13" transform="rotate(-40 -70 -60)" fill="${c.light}" stroke="${c.dark}" stroke-width="1.2"/>
        </g>

        <!-- 右側羽狀複葉 -->
        <g transform="translate(510, 180)">
          <ellipse cx="-15" cy="15" rx="24" ry="11" transform="rotate(-15 -15 15)" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="20" cy="-10" rx="24" ry="11" transform="rotate(20 20 -10)" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="5" cy="-35" rx="22" ry="10" transform="rotate(-5 5 -35)" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="40" cy="-25" rx="22" ry="10" transform="rotate(30 40 -25)" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="60" cy="-60" rx="26" ry="12" transform="rotate(45 60 -60)" fill="${c.light}" stroke="${c.dark}" stroke-width="1.2"/>
        </g>

        <!-- 頂部聚繖花序與小紅黑漿果 -->
        <g transform="translate(400, 150)">
          <path d="M 0 0 L -25 -30 M 0 0 L 0 -40 M 0 0 L 25 -30" stroke="${c.stem}" stroke-width="2"/>
          <!-- 果實簇 -->
          <circle cx="-30" cy="-35" r="7" fill="${c.accent}" stroke="${c.dark}" stroke-width="1"/>
          <circle cx="-20" cy="-45" r="6" fill="${c.accent}" stroke="${c.dark}" stroke-width="1"/>
          <circle cx="0" cy="-48" r="7.5" fill="${c.accent}" stroke="${c.dark}" stroke-width="1"/>
          <circle cx="20" cy="-45" r="6" fill="${c.accent}" stroke="${c.dark}" stroke-width="1"/>
          <circle cx="30" cy="-35" r="7" fill="${c.accent}" stroke="${c.dark}" stroke-width="1"/>
          <!-- 高光點 -->
          <circle cx="-32" cy="-37" r="2" fill="#FFF" opacity="0.8"/>
          <circle cx="-2" cy="-50" r="2" fill="#FFF" opacity="0.8"/>
          <circle cx="28" cy="-37" r="2" fill="#FFF" opacity="0.8"/>
        </g>
      `;
      break;

    case 'grass_blade':
      // 禾草/莎草型 (香茅、藺草、車前草、咸草)
      plantArtwork = `
        <!-- 叢生鬚根 -->
        <g stroke="${c.stem}" stroke-width="2" stroke-linecap="round" opacity="0.7">
          <path d="M 400 480 Q 380 520 370 550"/>
          <path d="M 400 480 Q 395 530 395 555"/>
          <path d="M 400 480 Q 410 530 415 555"/>
          <path d="M 400 480 Q 425 520 440 550"/>
        </g>

        <!-- 莖基鱗葉鞘 (厚實基部) -->
        <path d="M 375 480 Q 400 460 425 480 Z" fill="${c.stem}" stroke="${c.dark}" stroke-width="1.5"/>

        <!-- 噴泉狀優雅長狹葉片 -->
        <!-- 左長葉 1 -->
        <path d="M 395 470 Q 300 400 240 280 Q 220 220 180 180 Q 220 230 260 310 Q 320 400 395 470 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.2"/>
        <!-- 左長葉 2 -->
        <path d="M 398 470 Q 330 360 290 230 Q 280 160 260 110 Q 290 170 310 260 Q 350 370 398 470 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.2"/>
        <!-- 中央直挺葉與花序軸 -->
        <path d="M 400 470 Q 398 320 400 180 Q 401 110 400 60 Q 403 110 402 180 Q 402 320 400 470 Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1.2"/>
        <!-- 右長葉 1 -->
        <path d="M 402 470 Q 470 360 510 230 Q 520 160 540 110 Q 510 170 490 260 Q 450 370 402 470 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.2"/>
        <!-- 右長葉 2 -->
        <path d="M 405 470 Q 500 400 560 280 Q 580 220 620 180 Q 580 230 540 310 Q 480 400 405 470 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.2"/>

        <!-- 頂生細柔圓錐花序小穗 -->
        <g transform="translate(400, 100)" stroke="${c.dark}" stroke-width="0.8">
          <line x1="0" y1="40" x2="-25" y2="10" stroke="${c.stem}" stroke-width="1.5"/>
          <line x1="0" y1="40" x2="25" y2="10" stroke="${c.stem}" stroke-width="1.5"/>
          <line x1="0" y1="20" x2="-20" y2="-15" stroke="${c.stem}" stroke-width="1.5"/>
          <line x1="0" y1="20" x2="20" y2="-15" stroke="${c.stem}" stroke-width="1.5"/>
          <ellipse cx="-25" cy="10" rx="9" ry="3.5" transform="rotate(-30 -25 10)" fill="${c.accent}"/>
          <ellipse cx="25" cy="10" rx="9" ry="3.5" transform="rotate(30 25 10)" fill="${c.accent}"/>
          <ellipse cx="-20" cy="-15" rx="8" ry="3" transform="rotate(-40 -20 -15)" fill="${c.accent}"/>
          <ellipse cx="20" cy="-15" rx="8" ry="3" transform="rotate(40 20 -15)" fill="${c.accent}"/>
          <ellipse cx="0" cy="-40" rx="10" ry="4" transform="rotate(90 0 -40)" fill="${c.accent}"/>
        </g>
      `;
      break;

    case 'succulent_fleshy':
      // 多肉厚肉草本 (落地生根、馬齒莧、土人參)
      plantArtwork = `
        <path d="M 400 480 Q 400 525 390 550 M 405 490 Q 425 530 430 550" stroke="${c.stem}" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6"/>
        <!-- 肥厚肉質多汁主莖 -->
        <path d="M 400 480 Q 402 360 398 240 T 400 150" stroke="${c.stem}" stroke-width="7" stroke-linecap="round" fill="none"/>

        <!-- 第一輪肉質圓卵形厚葉 (低) -->
        <g transform="translate(340, 420)">
          <path d="M 60 10 C 20 30 -30 20 -40 -10 C -30 -35 30 -35 60 10 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="2"/>
          <circle cx="-15" cy="-10" r="15" fill="#FFF" opacity="0.12"/>
        </g>
        <g transform="translate(460, 420)">
          <path d="M -60 10 C -20 30 30 20 40 -10 C 30 -35 -30 -35 -60 10 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="2"/>
          <circle cx="15" cy="-10" r="15" fill="#FFF" opacity="0.12"/>
        </g>

        <!-- 第二輪帶圓齒葉 (中，緣生不定芽/落地生根特徵) -->
        <g transform="translate(330, 330)">
          <path d="M 70 0 C 30 35 -20 30 -45 0 C -20 -30 30 -35 70 0 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="2"/>
          <!-- 葉緣小不定芽 -->
          <circle cx="-35" cy="-12" r="4.5" fill="${c.light}" stroke="${c.dark}" stroke-width="0.8"/>
          <circle cx="-45" cy="0" r="4.5" fill="${c.light}" stroke="${c.dark}" stroke-width="0.8"/>
          <circle cx="-35" cy="12" r="4.5" fill="${c.light}" stroke="${c.dark}" stroke-width="0.8"/>
        </g>
        <g transform="translate(470, 330)">
          <path d="M -70 0 C -30 35 20 30 45 0 C 20 -30 -30 -35 -70 0 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="2"/>
          <circle cx="35" cy="-12" r="4.5" fill="${c.light}" stroke="${c.dark}" stroke-width="0.8"/>
          <circle cx="45" cy="0" r="4.5" fill="${c.light}" stroke="${c.dark}" stroke-width="0.8"/>
          <circle cx="35" cy="12" r="4.5" fill="${c.light}" stroke="${c.dark}" stroke-width="0.8"/>
        </g>

        <!-- 頂端花序 (鐘形下垂花朵/倒吊蓮) -->
        <g transform="translate(400, 160)">
          <path d="M 0 20 Q -30 0 -40 -20 M 0 20 Q 30 0 40 -20" stroke="${c.stem}" stroke-width="2.5" fill="none"/>
          <!-- 左鐘花 -->
          <g transform="translate(-40, -20)">
            <path d="M -12 0 C -12 18 12 18 12 0 C 8 -10 -8 -10 -12 0 Z" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2"/>
            <path d="M -8 18 L -14 26 M 0 18 L 0 28 M 8 18 L 14 26" stroke="${c.accentFill}" stroke-width="1.5"/>
          </g>
          <!-- 右鐘花 -->
          <g transform="translate(40, -20)">
            <path d="M -12 0 C -12 18 12 18 12 0 C 8 -10 -8 -10 -12 0 Z" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2"/>
            <path d="M -8 18 L -14 26 M 0 18 L 0 28 M 8 18 L 14 26" stroke="${c.accentFill}" stroke-width="1.5"/>
          </g>
        </g>
      `;
      break;

    case 'climbing_vine':
      // 蔓生藤本 (金銀花、山苦瓜、白花蛇舌草、七葉膽、雞屎藤)
      plantArtwork = `
        <!-- 纏繞的主蔓 -->
        <path d="M 400 480 Q 420 400 380 340 T 410 240 T 390 140 T 420 60" stroke="${c.stem}" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <!-- 捲鬚 -->
        <path d="M 400 340 Q 450 330 465 315 Q 475 300 460 295 Q 445 300 455 310" stroke="${c.stem}" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M 390 200 Q 340 190 325 175 Q 315 160 330 155 Q 345 160 335 170" stroke="${c.stem}" stroke-width="2" stroke-linecap="round" fill="none"/>

        <!-- 互生/對生藤葉 -->
        <g transform="translate(360, 390)">
          <path d="M 40 0 C 0 30 -40 25 -60 0 C -40 -25 0 -25 40 0 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.5"/>
          <path d="M 40 0 L -50 0" stroke="${c.light}" stroke-width="1.2"/>
        </g>
        <g transform="translate(430, 310)">
          <path d="M -40 0 C 0 30 40 25 60 0 C 40 -25 0 -25 -40 0 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.5"/>
          <path d="M -40 0 L 50 0" stroke="${c.light}" stroke-width="1.2"/>
        </g>
        <g transform="translate(370, 230)">
          <path d="M 35 0 C 0 25 -35 20 -50 0 C -35 -20 0 -20 35 0 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.5"/>
        </g>

        <!-- 金銀花成對雙花 / 或山苦瓜果實 (管狀唇形金銀雙花) -->
        <g transform="translate(410, 160)">
          <!-- 白花 (銀花) -->
          <g transform="rotate(-25)">
            <path d="M 0 0 C 15 -20 30 -50 45 -70 C 35 -75 25 -65 15 -45 Z" fill="#FCFAF2" stroke="${c.accent}" stroke-width="1.2"/>
            <path d="M 45 -70 Q 55 -85 50 -95 M 40 -70 Q 45 -85 40 -95" stroke="${c.accent}" stroke-width="1" fill="none"/>
          </g>
          <!-- 金花 (金花) -->
          <g transform="rotate(25)">
            <path d="M 0 0 C -15 -20 -30 -50 -45 -70 C -35 -75 -25 -65 -15 -45 Z" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2"/>
            <path d="M -45 -70 Q -55 -85 -50 -95 M -40 -70 Q -45 -85 -40 -95" stroke="#FFF" stroke-width="1" fill="none"/>
          </g>
        </g>
      `;
      break;

    case 'bean_legume':
      // 豆科莢果草本 (抹草、狗尾草、決明子、含羞草、甘草、黃耆)
      plantArtwork = `
        <!-- 直立挺拔主莖 -->
        <path d="M 400 480 Q 398 340 402 200" stroke="${c.stem}" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M 400 370 Q 330 330 290 280" stroke="${c.stem}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M 400 300 Q 470 260 510 210" stroke="${c.stem}" stroke-width="3.5" stroke-linecap="round" fill="none"/>

        <!-- 三出複葉 (抹草/狗尾草標誌) -->
        <g transform="translate(290, 280)">
          <ellipse cx="-20" cy="0" rx="22" ry="11" transform="rotate(-20 -20 0)" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.4"/>
          <ellipse cx="20" cy="10" rx="22" ry="11" transform="rotate(20 20 10)" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.4"/>
          <ellipse cx="0" cy="-25" rx="26" ry="13" transform="rotate(-5 0 -25)" fill="${c.light}" stroke="${c.dark}" stroke-width="1.4"/>
          <path d="M 0 0 L 0 -25" stroke="${c.stem}" stroke-width="1.5"/>
        </g>
        <g transform="translate(510, 210)">
          <ellipse cx="-20" cy="10" rx="20" ry="10" transform="rotate(-20 -20 10)" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.4"/>
          <ellipse cx="20" cy="0" rx="20" ry="10" transform="rotate(20 20 0)" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.4"/>
          <ellipse cx="0" cy="-22" rx="24" ry="12" transform="rotate(5 0 -22)" fill="${c.light}" stroke="${c.dark}" stroke-width="1.4"/>
        </g>

        <!-- 頂生通天大花穗 (通天草/狗尾草長筒狀密毛花穗) -->
        <g transform="translate(402, 170)">
          <path d="M -12 30 C -18 -20 -15 -80 0 -110 C 15 -80 18 -20 12 30 Z" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.5"/>
          <!-- 密集絲狀毛茸茸長毛 -->
          <g stroke="${c.accentFill}" stroke-width="1" opacity="0.85">
            <line x1="-10" y1="10" x2="-26" y2="5"/>
            <line x1="10" y1="10" x2="26" y2="5"/>
            <line x1="-12" y1="-20" x2="-28" y2="-25"/>
            <line x1="12" y1="-20" x2="28" y2="-25"/>
            <line x1="-10" y1="-50" x2="-24" y2="-58"/>
            <line x1="10" y1="-50" x2="24" y2="-58"/>
            <line x1="-6" y1="-80" x2="-18" y2="-90"/>
            <line x1="6" y1="-80" x2="18" y2="-90"/>
            <line x1="0" y1="-105" x2="0" y2="-120"/>
          </g>
        </g>
      `;
      break;

    case 'solanaceae_berry':
      // 茄科漿果草本 (枸杞、地骨皮、龍葵)
      plantArtwork = `
        <path d="M 400 480 Q 402 360 395 250 T 405 150" stroke="${c.stem}" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M 400 370 Q 330 330 280 270" stroke="${c.stem}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M 400 290 Q 470 250 515 190" stroke="${c.stem}" stroke-width="3.5" stroke-linecap="round" fill="none"/>

        <!-- 互生單葉與短柄 -->
        <g transform="translate(300, 280)">
          <path d="M 30 0 C 0 25 -30 20 -50 0 C -30 -20 0 -20 30 0 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.4"/>
          <path d="M 30 0 L -45 0" stroke="${c.light}" stroke-width="1.2"/>
        </g>
        <g transform="translate(490, 200)">
          <path d="M -30 0 C 0 25 30 20 50 0 C 30 -20 0 -20 -30 0 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.4"/>
          <path d="M -30 0 L 45 0" stroke="${c.light}" stroke-width="1.2"/>
        </g>

        <!-- 垂吊的鮮紅或紫黑水亮漿果 -->
        <!-- 左果串 -->
        <g transform="translate(340, 310)">
          <path d="M 0 0 Q -10 25 -15 40" stroke="${c.stem}" stroke-width="1.5" fill="none"/>
          <ellipse cx="-15" cy="46" rx="9" ry="12" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="-17" cy="43" rx="2.5" ry="4" fill="#FFF" opacity="0.8"/>
        </g>
        <!-- 右果串 (雙果) -->
        <g transform="translate(440, 240)">
          <path d="M 0 0 Q 15 20 20 35 M 0 0 Q 30 15 35 30" stroke="${c.stem}" stroke-width="1.5" fill="none"/>
          <ellipse cx="20" cy="42" rx="9.5" ry="13" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="18" cy="38" rx="2.5" ry="4" fill="#FFF" opacity="0.8"/>
          <ellipse cx="37" cy="36" rx="8" ry="11" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2"/>
          <ellipse cx="35" cy="33" rx="2" ry="3.5" fill="#FFF" opacity="0.8"/>
        </g>
        <!-- 頂端星狀小花 (龍葵白花黃蕊) -->
        <g transform="translate(405, 140)">
          <polygon points="0,-18 5,-5 18,-5 8,4 12,16 0,8 -12,16 -8,4 -18,-5 -5,-5" fill="#FCFAF2" stroke="${c.dark}" stroke-width="1"/>
          <circle cx="0" cy="0" r="5" fill="#E6A817"/>
        </g>
      `;
      break;

    case 'artemisia_foliage':
      // 蒿屬深裂羽葉 (艾草、大風草、茵陳蒿)
      plantArtwork = `
        <!-- 直立芳香主莖 -->
        <path d="M 400 480 Q 402 340 398 220 T 400 130" stroke="${c.stem}" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M 400 380 Q 320 350 260 300" stroke="${c.stem}" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 400 300 Q 480 270 540 210" stroke="${c.stem}" stroke-width="3" stroke-linecap="round" fill="none"/>

        <!-- 深裂羽狀艾葉 (正面濃綠、背面銀灰白毛) -->
        <g transform="translate(260, 300)">
          <path d="M 50 0 C 30 15 10 30 -10 35 C -5 20 -15 15 -35 15 C -20 0 -35 -15 -45 -10 C -30 -25 -10 -20 0 -35 C 10 -20 30 -15 50 0 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.5"/>
          <path d="M 50 0 L -30 0" stroke="${c.light}" stroke-width="1.2"/>
        </g>
        <g transform="translate(540, 210)">
          <path d="M -50 0 C -30 15 -10 30 10 35 C 5 20 15 15 35 15 C 20 0 35 -15 45 -10 C 30 -25 10 -20 0 -35 C -10 -20 -30 -15 -50 0 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.5"/>
          <path d="M -50 0 L 30 0" stroke="${c.light}" stroke-width="1.2"/>
        </g>
        <g transform="translate(370, 220) scale(0.8)">
          <path d="M 40 0 C 20 12 10 25 -10 28 C -5 15 -15 10 -28 10 C -15 0 -28 -10 -35 -8 C -25 -20 -10 -15 0 -28 C 10 -15 25 -10 40 0 Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1.5"/>
        </g>

        <!-- 頂部密生圓錐花序小花頭 (淡黃綠色小圓頭) -->
        <g transform="translate(400, 130)" fill="${c.accent}" stroke="${c.dark}" stroke-width="0.8">
          <circle cx="0" cy="0" r="5"/>
          <circle cx="-10" cy="-10" r="4.5"/>
          <circle cx="10" cy="-10" r="4.5"/>
          <circle cx="-16" cy="-22" r="4"/>
          <circle cx="0" cy="-24" r="4.5"/>
          <circle cx="16" cy="-22" r="4"/>
          <circle cx="-8" cy="-35" r="3.5"/>
          <circle cx="8" cy="-35" r="3.5"/>
          <circle cx="0" cy="-45" r="3"/>
        </g>
      `;
      break;

    case 'quinoa_grain':
      // 穗狀穀類 (台灣藜 紅藜、刺莧、青葙)
      plantArtwork = `
        <!-- 強壯高聳主莖 -->
        <path d="M 400 480 Q 402 320 398 220" stroke="${c.stem}" stroke-width="6" stroke-linecap="round" fill="none"/>
        <!-- 菱狀卵形葉片 -->
        <g transform="translate(330, 360)">
          <path d="M 70 0 C 30 25 -10 30 -40 0 C -10 -30 30 -25 70 0 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.8"/>
        </g>
        <g transform="translate(470, 310)">
          <path d="M -70 0 C -30 25 10 30 40 0 C 10 -30 -30 -25 -70 0 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.8"/>
        </g>

        <!-- 艷麗下垂的大型紅藜穀穗 (層次分明的紅/黃/紫穗) -->
        <g transform="translate(398, 220)">
          <path d="M 0 0 Q 30 -30 50 -70 Q 60 -100 40 -130 Q 10 -150 -10 -120 Q -40 -80 -10 -20 Z" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.5"/>
          <!-- 飽滿圓潤穀粒群 -->
          <g fill="${c.accentFill}" stroke="${c.dark}" stroke-width="0.6">
            <circle cx="20" cy="-40" r="4.5"/> <circle cx="35" cy="-55" r="4.5"/>
            <circle cx="45" cy="-75" r="4"/> <circle cx="35" cy="-95" r="4"/>
            <circle cx="20" cy="-115" r="4"/> <circle cx="5" cy="-125" r="3.5"/>
            <circle cx="-15" cy="-105" r="4"/> <circle cx="-25" cy="-80" r="4.5"/>
            <circle cx="-15" cy="-50" r="5"/> <circle cx="5" cy="-70" r="5"/>
          </g>
        </g>
      `;
      break;

    case 'lily_bell':
      // 百合花型 (台灣百合)
      plantArtwork = `
        <!-- 直立細長綠莖 -->
        <path d="M 400 480 L 400 240" stroke="${c.stem}" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <!-- 密生線狀披針形狹長葉片 -->
        <g stroke="${c.dark}" stroke-width="1.2">
          <path d="M 400 440 Q 310 425 240 400" stroke="${c.stem}" stroke-width="3" fill="none"/>
          <path d="M 400 440 Q 490 425 560 400" stroke="${c.stem}" stroke-width="3" fill="none"/>
          <path d="M 400 370 Q 320 355 260 330" stroke="${c.stem}" stroke-width="3" fill="none"/>
          <path d="M 400 370 Q 480 355 540 330" stroke="${c.stem}" stroke-width="3" fill="none"/>
          <path d="M 400 300 Q 330 285 280 260" stroke="${c.stem}" stroke-width="2.5" fill="none"/>
          <path d="M 400 300 Q 470 285 520 260" stroke="${c.stem}" stroke-width="2.5" fill="none"/>
        </g>

        <!-- 台灣原生高潔喇叭狀白百合 (具酒紅色背稜) -->
        <g transform="translate(400, 240) rotate(-20)">
          <!-- 花梗 -->
          <path d="M 0 0 Q -20 -30 -30 -60" stroke="${c.stem}" stroke-width="3.5" fill="none"/>
          <!-- 喇叭花冠 (白花底 + 紫紅背筋) -->
          <g transform="translate(-30, -60)">
            <path d="M 0 0 C 10 -40 30 -70 60 -90 C 20 -80 -20 -80 -60 -90 C -30 -70 -10 -40 0 0 Z" fill="#FCFAF2" stroke="${c.dark}" stroke-width="1.5"/>
            <!-- 花被背面酒紅紫條紋 (台灣百合特徵) -->
            <path d="M 0 0 C 5 -40 15 -70 30 -85" stroke="${c.accent}" stroke-width="2.5" fill="none"/>
            <path d="M 0 0 C -5 -40 -15 -70 -30 -85" stroke="${c.accent}" stroke-width="2.5" fill="none"/>
            <!-- 雄蕊花藥 -->
            <line x1="0" y1="-30" x2="10" y2="-80" stroke="${c.stem}" stroke-width="1.2"/>
            <ellipse cx="10" cy="-80" rx="4" ry="7" fill="#E6A817"/>
          </g>
        </g>
      `;
      break;

    default:
      plantArtwork = `
        <path d="M 400 480 L 400 200" stroke="${c.stem}" stroke-width="5" stroke-linecap="round"/>
        <path d="M 400 380 Q 320 340 280 290 Q 340 280 398 350 Z" fill="${c.primary}" stroke="${c.dark}" stroke-width="1.5"/>
        <path d="M 400 320 Q 480 280 520 230 Q 460 220 402 290 Z" fill="${c.secondary}" stroke="${c.dark}" stroke-width="1.5"/>
        <circle cx="400" cy="180" r="16" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.5"/>
      `;
  }

  // 構造完整 SVG XML
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <!-- 古卷宣紙米色漸層背景 -->
    <linearGradient id="paperGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCFAF5"/>
      <stop offset="50%" stop-color="#F5EFE4"/>
      <stop offset="100%" stop-color="#EBE3D3"/>
    </linearGradient>

    <!-- 標本古典標籤漸層 -->
    <linearGradient id="cartoucheGrad_${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F9F6EE" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#F0E8D7" stop-opacity="0.95"/>
    </linearGradient>

    <!-- 朱紅印泥質感漸層 -->
    <linearGradient id="sealGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B83828"/>
      <stop offset="100%" stop-color="#96281B"/>
    </linearGradient>
  </defs>

  <!-- 1. 背景宣紙底圖 -->
  <rect width="800" height="600" fill="url(#paperGrad_${id})"/>

  <!-- 2. 古典雙框細線條與四角回紋綴飾 -->
  <rect x="24" y="24" width="752" height="552" fill="none" stroke="#C2B299" stroke-width="1.5"/>
  <rect x="30" y="30" width="740" height="540" fill="none" stroke="#A89477" stroke-width="0.8"/>
  <!-- 四角折角飾花 -->
  <path d="M 24 40 L 40 40 L 40 24" fill="none" stroke="#8C775A" stroke-width="1.8"/>
  <path d="M 776 40 L 760 40 L 760 24" fill="none" stroke="#8C775A" stroke-width="1.8"/>
  <path d="M 24 560 L 40 560 L 40 576" fill="none" stroke="#8C775A" stroke-width="1.8"/>
  <path d="M 776 560 L 760 560 L 760 576" fill="none" stroke="#8C775A" stroke-width="1.8"/>

  <!-- 3. 背景巨幅水墨篆體文字水印 (淡雅半透明) -->
  <text x="400" y="380" font-family="'Noto Serif TC', 'Songti TC', 'STSong', serif" font-size="280" font-weight="900" text-anchor="middle" fill="#806D53" opacity="0.04" user-select="none">
    ${watermarkChar}
  </text>

  <!-- 4. 頂部植物誌卷標與標本編號 -->
  <g font-family="'Noto Serif TC', 'Songti TC', serif" fill="#756247">
    <text x="48" y="56" font-size="12" letter-spacing="2">臺灣本草植物標本圖譜 · 典藏正卷</text>
    <text x="48" y="74" font-size="10" font-family="monospace" letter-spacing="1" fill="#998366">HERBARIUM FORMOSA · SPECIMEN NO. ${numStr}</text>
  </g>

  <!-- 5. 東方朱紅印章 (右上印) -->
  <g transform="translate(710, 50)">
    <rect x="0" y="0" width="42" height="42" rx="4" fill="url(#sealGrad_${id})" stroke="#7D1E12" stroke-width="1.5"/>
    <rect x="3" y="3" width="36" height="36" rx="2" fill="none" stroke="#FCECE8" stroke-width="0.8" opacity="0.85"/>
    <text x="21" y="27" font-family="'Noto Serif TC', 'Songti TC', 'Kaiti TC', serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#FFF4F0" letter-spacing="2">
      ${sealText}
    </text>
  </g>

  <!-- 6. 植物本體植物學線條與工筆水彩插圖 -->
  <g class="botanical-illustration">
    ${plantArtwork}
  </g>

  <!-- 7. 底部植物學古典名錄籤條 (Cartouche) -->
  <g transform="translate(48, 470)">
    <!-- 標籤背底框 -->
    <rect x="0" y="0" width="704" height="84" rx="6" fill="url(#cartoucheGrad_${id})" stroke="#B8A58A" stroke-width="1.2"/>
    <rect x="4" y="4" width="696" height="76" rx="4" fill="none" stroke="#D1C3AD" stroke-width="0.8"/>

    <!-- 藥材大名 -->
    <text x="24" y="38" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="28" font-weight="bold" fill="#2C241B" letter-spacing="3">
      ${name}
    </text>

    <!-- 典藏分類標籤 -->
    <rect x="24" y="50" width="100" height="20" rx="3" fill="${c.primary}" opacity="0.15"/>
    <text x="74" y="64" font-family="'Noto Sans TC', sans-serif" font-size="10.5" font-weight="600" text-anchor="middle" fill="${c.dark}">
      ${category}
    </text>

    <!-- 科屬與學名 -->
    <text x="140" y="64" font-family="'Noto Serif TC', Georgia, serif" font-size="12" fill="#5E4E3A">
      <tspan font-style="italic" font-weight="600">${scientificName}</tspan>
      <tspan fill="#8C775A"> · ${family}</tspan>
    </text>

    <!-- 風土產地銘文 (右側) -->
    <text x="680" y="38" font-family="'Noto Serif TC', serif" font-size="12" text-anchor="end" fill="#6E5C47">
      道地產區：${region ? region.split(' ')[0] : '臺灣全境'}
    </text>
    <text x="680" y="60" font-family="'Noto Serif TC', serif" font-size="10.5" text-anchor="end" fill="#998366">
      國家植物標本館 · 數位原創無版權典藏
    </text>
  </g>
</svg>
`;
}

// 產生預設草藥圖 default_herb.svg
function generateDefaultHerbSvg() {
  const defaultSvg = renderHerbBotanicalSvg({
    id: 0,
    name: '臺灣本草標本',
    scientificName: 'Plantae Herbalis Formosa',
    family: '臺灣原生植物本草群',
    category: '典藏風土植物',
    region: '臺灣全島平野山林',
    archetype: 'aster_daisy',
    theme: 'green',
    sealText: '神農'
  });
  fs.writeFileSync(path.join(OUTPUT_DIR, 'default_herb.svg'), defaultSvg, 'utf8');
}

module.exports = {
  renderHerbBotanicalSvg,
  generateDefaultHerbSvg,
  OUTPUT_DIR
};
