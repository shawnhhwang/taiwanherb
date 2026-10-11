<template>
  <div class="alchemy-lab-container">
    <div class="alchemy-header">
      <div class="alchemy-seal">茶席</div>
      <div>
        <h2 class="alchemy-title">青草茶方劑調配研製所 · Tea Alchemy Lab</h2>
        <p class="alchemy-subtitle">依循「君臣佐使」傳統法度，自由調配草藥，即時演算寒熱陰陽平衡、滋味圖譜與歸經共鳴。</p>
        <div style="font-size: 11.5px; color: var(--amber-deep); margin-top: 4px;">
          ⚠️ <strong>生活文化茶飲宣告</strong>：本茶釜純為臺灣古早常民生活茶飲風味與配伍文化模擬，非醫療處方，絕無任何疾病治療宣稱。
        </div>
      </div>
    </div>

    <!-- 經典古法名方快速選單 -->
    <div class="preset-formulas-bar">
      <span class="preset-label">傳承經典方：</span>
      <button
        v-for="preset in presets"
        :key="preset.name"
        class="preset-pill"
        @click="loadPreset(preset)"
      >
        🍵 {{ preset.name }}
      </button>
      <button class="preset-pill reset-pill" @click="clearPot">清空釜中草藥</button>
    </div>

    <div class="alchemy-workspace">
      <!-- 左欄：茶釜調配槽與草藥投入區 -->
      <div class="kettle-stage-card">
        <div class="kettle-illustration-box">
          <div class="steam-vapors" :class="{ boiling: isBoiling }">
            <span class="vapor v1"></span>
            <span class="vapor v2"></span>
            <span class="vapor v3"></span>
          </div>

          <div class="kettle-graphic">
            <div class="kettle-lid"></div>
            <div class="kettle-belly" :class="{ 'kettle-heat': isBoiling }">
              <div class="kettle-liquid" :style="liquidStyle">
                <div class="liquid-bubble b1"></div>
                <div class="liquid-bubble b2"></div>
                <div class="liquid-bubble b3"></div>
              </div>
            </div>
            <div class="kettle-base"></div>
          </div>

          <div class="kettle-summary-tag">
            釜中草藥：<strong>{{ selectedHerbs.length }} / 4</strong> 味
          </div>
        </div>

        <!-- 釜中已選草藥清單 -->
        <div class="selected-herbs-list">
          <div v-if="selectedHerbs.length === 0" class="empty-kettle-notice">
            <span>🍃</span>
            <span>茶釜尚空，請從下方點選 1 至 4 味草藥放入調配。</span>
          </div>

          <div
            v-for="(herb, idx) in selectedHerbs"
            :key="herb.id"
            class="pot-herb-chip"
          >
            <span class="herb-role-badge">{{ roleLabels[idx] || '使' }}</span>
            <span class="herb-chip-name">{{ herb.name }}</span>
            <span class="herb-chip-nature">({{ herb.nature }})</span>
            <button class="remove-chip-btn" @click="removeHerb(herb.id)">✕</button>
          </div>
        </div>

        <!-- 待選草藥貨架 (點擊加入) -->
        <div class="shelf-selection-box">
          <h4 class="shelf-title">🌿 百草藥櫃 (點擊投入茶釜)</h4>
          <div class="shelf-grid">
            <button
              v-for="herb in allHerbs"
              :key="herb.id"
              class="shelf-herb-btn"
              :class="{ 'in-pot': isInPot(herb.id) }"
              :disabled="isInPot(herb.id) || selectedHerbs.length >= 4"
              @click="addHerb(herb)"
            >
              <span class="shelf-herb-name">{{ herb.name }}</span>
              <span class="shelf-herb-tag">{{ herb.nature }} · 入{{ herb.channels[0] }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 右欄：陰陽寒熱指針、滋味光譜、經絡激發與熬煮定時器 -->
      <div class="analysis-stage-card">
        <!-- 陰陽四氣指針儀表 -->
        <div class="gauge-section">
          <h3 class="analysis-heading">⚖️ 四氣陰陽平衡分析</h3>
          <div class="balance-gauge-wrapper">
            <div class="balance-labels">
              <span class="label-cold">大寒涼 (清解排毒)</span>
              <span class="label-neutral">平性 (中和溫潤)</span>
              <span class="label-warm">溫熱 (行氣溫陽)</span>
            </div>
            <div class="gauge-track">
              <div class="gauge-pointer" :style="{ left: `${gaugePercentage}%` }">
                <div class="pointer-tip"></div>
              </div>
            </div>
          </div>
          <div class="balance-verdict-box" :class="balanceTypeClass">
            <strong>【方劑辨性】{{ balanceVerdict.title }}</strong>
            <p>{{ balanceVerdict.description }}</p>
          </div>
        </div>

        <!-- 五味滋味圖譜 -->
        <div class="flavor-section">
          <h3 class="analysis-heading">🍵 五味滋味預測光譜</h3>
          <div class="flavor-bars-grid">
            <div class="flavor-bar-item">
              <span class="flavor-name">微苦清降</span>
              <div class="bar-outer"><div class="bar-fill bitter" :style="{ width: `${flavorScore.bitter}%` }"></div></div>
              <span class="bar-val">{{ flavorScore.bitter }}%</span>
            </div>
            <div class="flavor-bar-item">
              <span class="flavor-name">甘醇回甘</span>
              <div class="bar-outer"><div class="bar-fill sweet" :style="{ width: `${flavorScore.sweet}%` }"></div></div>
              <span class="bar-val">{{ flavorScore.sweet }}%</span>
            </div>
            <div class="flavor-bar-item">
              <span class="flavor-name">芳香行氣</span>
              <div class="bar-outer"><div class="bar-fill pungent" :style="{ width: `${flavorScore.pungent}%` }"></div></div>
              <span class="bar-val">{{ flavorScore.pungent }}%</span>
            </div>
            <div class="flavor-bar-item">
              <span class="flavor-name">生津清涼</span>
              <div class="bar-outer"><div class="bar-fill cool" :style="{ width: `${flavorScore.cool}%` }"></div></div>
              <span class="bar-val">{{ flavorScore.cool }}%</span>
            </div>
          </div>
        </div>

        <!-- 五行臟腑引經共鳴 -->
        <div class="meridian-resonance-section">
          <h3 class="analysis-heading">🫀 五臟經絡受納共鳴</h3>
          <div class="meridian-pills-row">
            <div
              v-for="elem in meridianElements"
              :key="elem.organ"
              class="resonance-pill"
              :class="{ active: activatedChannels.includes(elem.organ) }"
            >
              <span class="elem-seal">{{ elem.element }}</span>
              <span class="elem-organ">{{ elem.organ }}經</span>
              <span class="elem-status">{{ activatedChannels.includes(elem.organ) ? '已入經' : '未及' }}</span>
            </div>
          </div>
        </div>

        <!-- 熬煮計時器 -->
        <div class="boil-timer-section">
          <div class="timer-top-row">
            <div>
              <h3 class="analysis-heading" style="margin-bottom: 2px;">⏱️ 古法煎煮時序導引</h3>
              <div class="timer-stage-title">{{ currentStage.title }} ({{ currentStage.desc }})</div>
            </div>
            <div class="timer-display-box">
              {{ formatSeconds(timerSeconds) }}
            </div>
          </div>

          <div class="timer-controls">
            <button
              class="btn-timer-action"
              :class="{ running: isBoiling }"
              @click="toggleBoilTimer"
            >
              {{ isBoiling ? '⏸ 暫停煎煮' : '🔥 開始煎煮計時' }}
            </button>
            <button class="btn-timer-subtle" @click="resetTimer">重置時鐘</button>
            <button
              class="btn-timer-subtle"
              :disabled="selectedHerbs.length === 0"
              @click="exportFormula"
            >
              📜 保存配方箋
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { audio } from '../services/audioService';

const props = defineProps({
  allHerbs: { type: Array, default: () => [] }
});

const selectedHerbs = ref([]);
const roleLabels = ['君 (主藥)', '臣 (相佐)', '佐 (調和)', '使 (引經)'];

// 預設經典名方
const presets = [
  {
    name: '萬華百年退火青草茶',
    herbNames: ['大花咸豐草', '鳳尾草', '薄荷', '甘草']
  },
  {
    name: '國家中醫清潤防疫茶',
    herbNames: ['魚腥草', '金銀花', '桑葉', '甘草']
  },
  {
    name: '客家古傳紫蘇暖胃茶',
    herbNames: ['紫蘇', '艾草', '甘草']
  },
  {
    name: '元氣固表護眼飲',
    herbNames: ['黃耆', '枸杞子', '桑葉', '甘草']
  }
];

const isInPot = (id) => selectedHerbs.value.some(h => h.id === id);

const addHerb = (herb) => {
  if (selectedHerbs.value.length >= 4) return;
  audio.playWaterDrop();
  selectedHerbs.value.push(herb);
};

const removeHerb = (id) => {
  audio.playClick();
  selectedHerbs.value = selectedHerbs.value.filter(h => h.id !== id);
};

const clearPot = () => {
  audio.playClick();
  selectedHerbs.value = [];
  resetTimer();
};

const loadPreset = (preset) => {
  audio.playChime(580);
  const found = preset.herbNames
    .map(name => props.allHerbs.find(h => h.name === name))
    .filter(Boolean);
  selectedHerbs.value = [...found];
};

// 陰陽寒熱分數演算
const balanceScore = computed(() => {
  if (selectedHerbs.value.length === 0) return 0;
  // 寒 -2, 微寒 -1, 涼 -0.8, 平 0, 微溫 +1, 溫 +1.8, 熱 +2.5
  let sum = 0;
  selectedHerbs.value.forEach(h => {
    switch (h.nature) {
      case '大寒': sum -= 2.5; break;
      case '寒': sum -= 2.0; break;
      case '微寒': sum -= 1.2; break;
      case '涼': sum -= 0.8; break;
      case '平': sum += 0; break;
      case '微溫': sum += 1.0; break;
      case '溫': sum += 1.8; break;
      case '熱': sum += 2.5; break;
      default: break;
    }
  });
  return sum / selectedHerbs.value.length;
});

// 指針位置 (0% ~ 100%, 50% 為中和)
const gaugePercentage = computed(() => {
  // score range approx -2.5 ~ +2.5 -> map to 5% ~ 95%
  const clamped = Math.max(-2.5, Math.min(2.5, balanceScore.value));
  return Math.round(50 + (clamped / 2.5) * 42);
});

// 評語判定
const balanceVerdict = computed(() => {
  const s = balanceScore.value;
  if (selectedHerbs.value.length === 0) {
    return {
      title: '請放入草藥',
      description: '茶釜目前無藥性，請選配草藥以啟動陰陽辨析。'
    };
  }
  if (s < -1.2) {
    return {
      title: '大苦大寒 · 清烈解熱毒',
      description: '性味極度偏涼，適合急性咽喉腫痛、盛夏深層熱毒、火氣暴衝者；脾胃虛寒容易腹瀉者應短飲即止，不可過量。'
    };
  }
  if (s < -0.3) {
    return {
      title: '清涼生津 · 消暑退火良品',
      description: '微涼而不傷胃氣，能生津止渴、解散夏日煩悶暑濕，為台灣青草茶最推崇之日常清爽體質配比。'
    };
  }
  if (s <= 0.4) {
    return {
      title: '四氣和諧 · 平平溫和老少咸宜',
      description: '寒熱調和、陰陽相濟，兼具清肺與健脾之效，口感甘醇回味，全年皆宜日常飲用。'
    };
  }
  return {
    title: '甘溫理氣 · 益氣暖中扶陽',
    description: '性味甘溫健脾，長於補中益氣、散寒通絡，適合秋冬畏寒肢冷、疲乏無力、體質虛弱者調理飲用。'
  };
});

const balanceTypeClass = computed(() => {
  const s = balanceScore.value;
  if (selectedHerbs.value.length === 0) return 'empty';
  if (s < -0.3) return 'cold-theme';
  if (s <= 0.4) return 'neutral-theme';
  return 'warm-theme';
});

// 滋味光譜演算
const flavorScore = computed(() => {
  if (selectedHerbs.value.length === 0) {
    return { bitter: 0, sweet: 0, pungent: 0, cool: 0 };
  }
  let bitter = 10, sweet = 10, pungent = 10, cool = 10;
  selectedHerbs.value.forEach(h => {
    const tastes = h.taste || [];
    if (tastes.includes('苦') || tastes.includes('微苦')) bitter += 28;
    if (tastes.includes('甘') || h.name === '甘草' || h.name === '枸杞子') sweet += 32;
    if (tastes.includes('辛') || h.name === '薄荷' || h.name === '紫蘇') pungent += 25;
    if (['涼', '寒', '微寒'].includes(h.nature) || h.name === '薄荷') cool += 26;
  });
  return {
    bitter: Math.min(100, bitter),
    sweet: Math.min(100, sweet),
    pungent: Math.min(100, pungent),
    cool: Math.min(100, cool)
  };
});

// 五行經絡激發
const meridianElements = [
  { element: '金', organ: '肺' },
  { element: '木', organ: '肝' },
  { element: '土', organ: '脾' },
  { element: '火', organ: '心' },
  { element: '水', organ: '腎' }
];

const activatedChannels = computed(() => {
  const chs = new Set();
  selectedHerbs.value.forEach(h => {
    (h.channels || []).forEach(c => chs.add(c));
  });
  return Array.from(chs);
});

// 煎煮計時器
const isBoiling = ref(false);
const timerSeconds = ref(300); // 5 分鐘預設
let timerInterval = null;

const currentStage = computed(() => {
  if (timerSeconds.value > 240) return { title: '階段一：武火急沸', desc: '大火催沸，釋出輕揚芳香性成分' };
  if (timerSeconds.value > 60) return { title: '階段二：文火慢煎', desc: '微滾細熬，浸透草根莖脈深層精微' };
  return { title: '階段三：關火悶香', desc: '熄火加蓋，回甘沉降，留香入湯' };
});

const formatSeconds = (sec) => {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const toggleBoilTimer = () => {
  if (isBoiling.value) {
    clearInterval(timerInterval);
    isBoiling.value = false;
  } else {
    audio.playBoiling();
    isBoiling.value = true;
    timerInterval = setInterval(() => {
      if (timerSeconds.value > 0) {
        timerSeconds.value--;
      } else {
        clearInterval(timerInterval);
        isBoiling.value = false;
        audio.playChime(880);
        alert('🍵 青草茶已完成古法慢熬！清芬滿室，請開蓋濾渣品茗。');
      }
    }, 1000);
  }
};

const resetTimer = () => {
  clearInterval(timerInterval);
  isBoiling.value = false;
  timerSeconds.value = 300;
};

const liquidStyle = computed(() => {
  if (selectedHerbs.value.length === 0) return { height: '20%', background: '#bbf7d0' };
  const s = balanceScore.value;
  let bg = '#78350f'; // 琥珀深褐
  if (s < -0.5) bg = '#285e43'; // 青草墨玉綠
  else if (s > 0.5) bg = '#92400e'; // 薑蜜琥珀紅
  return {
    height: `${Math.min(85, 25 + selectedHerbs.value.length * 15)}%`,
    background: bg
  };
});

const exportFormula = () => {
  audio.playChime(700);
  const names = selectedHerbs.value.map(h => h.name).join(' + ');
  const text = `【台灣本草茶席 · 配方箋】\n調配藥材：${names}\n方劑辨性：${balanceVerdict.value.title}\n建議用法：武火煮沸 5 分鐘，轉文火慢熬 10 分鐘，熄火悶 3 分鐘濾渣熱飲或常溫飲用。\n—— 台灣本草植物誌 Wiki 監製`;
  navigator.clipboard?.writeText(text);
  alert('📜 配方箋已複製至剪貼簿！可貼在筆記或分享給親友。');
};

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.alchemy-lab-container {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  margin-bottom: 32px;
}

.alchemy-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.alchemy-seal {
  width: 48px;
  height: 48px;
  background: var(--amber-deep);
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 900;
  box-shadow: 0 4px 12px rgba(143, 83, 31, 0.3);
}

.alchemy-title {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 800;
  color: var(--primary-deep);
}

.alchemy-subtitle {
  font-size: 13.5px;
  color: var(--ink-muted);
  margin-top: 2px;
}

/* 預設配方條 */
.preset-formulas-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 12px 16px;
  background: var(--bg-parchment);
  border-radius: 12px;
  border: 1px solid var(--border-light);
  margin-bottom: 24px;
}

.preset-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-heavy);
}

.preset-pill {
  font-size: 12.5px;
  background: #fff;
  border: 1px solid var(--border-light);
  color: var(--ink-body);
  padding: 5px 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preset-pill:hover {
  border-color: var(--amber);
  color: var(--amber-deep);
}

.reset-pill {
  margin-left: auto;
  color: #ef4444;
  border-color: #fecaca;
  background: #fff;
}

.reset-pill:hover {
  background: #fee2e2;
}

/* 工作區雙欄 */
.alchemy-workspace {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 28px;
}

/* 茶釜展示台 */
.kettle-stage-card {
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.kettle-illustration-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 24px;
}

.steam-vapors {
  display: flex;
  gap: 12px;
  height: 28px;
  margin-bottom: 4px;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.steam-vapors.boiling {
  opacity: 0.85;
}

.vapor {
  width: 8px;
  height: 22px;
  background: linear-gradient(180deg, rgba(200, 200, 200, 0) 0%, rgba(180, 180, 180, 0.7) 100%);
  border-radius: 10px;
  animation: floatVapor 1.5s infinite ease-in-out;
}

.v2 { animation-delay: 0.3s; }
.v3 { animation-delay: 0.6s; }

@keyframes floatVapor {
  0% { transform: translateY(0) scaleY(0.8); opacity: 0.2; }
  50% { transform: translateY(-8px) scaleY(1.2); opacity: 0.7; }
  100% { transform: translateY(-16px) scaleY(0.6); opacity: 0; }
}

.kettle-graphic {
  width: 140px;
  position: relative;
}

.kettle-lid {
  width: 80px;
  height: 16px;
  background: #374151;
  border-radius: 8px 8px 0 0;
  margin: 0 auto;
}

.kettle-belly {
  width: 140px;
  height: 110px;
  background: #1f2937;
  border-radius: 20px 20px 30px 30px;
  overflow: hidden;
  position: relative;
  border: 2px solid #111827;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.kettle-heat {
  box-shadow: 0 0 25px rgba(239, 68, 68, 0.45);
  border-color: #ef4444;
}

.kettle-liquid {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: height 0.5s ease, background 0.5s ease;
}

.kettle-base {
  width: 110px;
  height: 8px;
  background: #111827;
  margin: 0 auto;
  border-radius: 0 0 4px 4px;
}

.kettle-summary-tag {
  font-size: 13px;
  margin-top: 14px;
  color: var(--ink-heavy);
}

/* 釜中藥材清單 */
.selected-herbs-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 110px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--border-light);
  padding: 12px;
}

.empty-kettle-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 86px;
  color: var(--ink-muted);
  font-size: 13px;
}

.pot-herb-chip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
}

.herb-role-badge {
  background: var(--primary);
  color: #fff;
  font-size: 10.5px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.herb-chip-name {
  font-weight: 700;
  color: var(--primary-deep);
  flex: 1;
  margin-left: 10px;
}

.herb-chip-nature {
  color: var(--ink-muted);
  font-size: 12px;
  margin-right: 8px;
}

.remove-chip-btn {
  color: #ef4444;
  font-weight: bold;
  padding: 2px 6px;
}

/* 百草藥櫃選單 */
.shelf-selection-box {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 14px;
}

.shelf-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 10px;
}

.shelf-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.shelf-herb-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--border-light);
  background: var(--bg-parchment);
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}

.shelf-herb-btn:hover:not(:disabled) {
  border-color: var(--primary);
  background: var(--primary-pale);
}

.shelf-herb-btn.in-pot {
  opacity: 0.4;
  background: #f3f4f6;
  cursor: not-allowed;
}

.shelf-herb-name {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink-heavy);
}

.shelf-herb-tag {
  font-size: 10.5px;
  color: var(--ink-muted);
}

/* 右欄分析卡片 */
.analysis-stage-card {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.analysis-heading {
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 12px;
}

/* 陰陽平衡儀表 */
.balance-gauge-wrapper {
  background: var(--bg-parchment);
  border-radius: 10px;
  padding: 14px;
  border: 1px solid var(--border-light);
  margin-bottom: 10px;
}

.balance-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--ink-muted);
  font-weight: 600;
  margin-bottom: 6px;
}

.label-cold { color: #0284c7; }
.label-neutral { color: #2d6a4f; }
.label-warm { color: #ea580c; }

.gauge-track {
  width: 100%;
  height: 12px;
  background: linear-gradient(90deg, #38bdf8 0%, #34d399 50%, #fb923c 100%);
  border-radius: 6px;
  position: relative;
}

.gauge-pointer {
  position: absolute;
  top: -4px;
  transform: translateX(-50%);
  width: 18px;
  height: 20px;
  transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pointer-tip {
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-top: 12px solid #1f2937;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.balance-verdict-box {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.55;
  border: 1px solid transparent;
}

.cold-theme {
  background: #f0f9ff;
  border-color: #bae6fd;
  color: #0369a1;
}

.neutral-theme {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #15803d;
}

.warm-theme {
  background: #fff7ed;
  border-color: #fed7aa;
  color: #c2410c;
}

.empty {
  background: var(--bg-subtle);
  color: var(--ink-muted);
}

/* 滋味長條圖 */
.flavor-bars-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.flavor-bar-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.flavor-name {
  width: 58px;
  color: var(--ink-body);
  flex-shrink: 0;
}

.bar-outer {
  flex: 1;
  height: 8px;
  background: var(--bg-subtle);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.bar-fill.bitter { background: #475569; }
.bar-fill.sweet { background: #b07d48; }
.bar-fill.pungent { background: #10b981; }
.bar-fill.cool { background: #06b6d4; }

.bar-val {
  font-size: 11px;
  color: var(--ink-muted);
  width: 32px;
  text-align: right;
}

/* 五行經絡共鳴 */
.meridian-pills-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.resonance-pill {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  border-radius: 8px;
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  opacity: 0.55;
  transition: all 0.3s ease;
}

.resonance-pill.active {
  opacity: 1;
  background: #fff;
  border-color: var(--primary);
  box-shadow: 0 4px 10px rgba(45, 106, 79, 0.15);
  transform: translateY(-2px);
}

.elem-seal {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 16px;
  color: var(--primary-deep);
}

.elem-organ {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--ink-heavy);
}

.elem-status {
  font-size: 10px;
  color: var(--ink-muted);
}

.resonance-pill.active .elem-status {
  color: var(--primary);
  font-weight: bold;
}

/* 煎煮時鐘 */
.boil-timer-section {
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 16px 20px;
}

.timer-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.timer-stage-title {
  font-size: 13px;
  color: var(--amber-deep);
  font-weight: 600;
}

.timer-display-box {
  font-family: monospace;
  font-size: 26px;
  font-weight: 900;
  color: var(--primary-deep);
  background: #fff;
  padding: 4px 14px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
}

.timer-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-timer-action {
  padding: 8px 18px;
  border-radius: 10px;
  background: var(--primary);
  color: #fff;
  font-weight: 700;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-timer-action.running {
  background: #c2410c;
}

.btn-timer-subtle {
  padding: 8px 14px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid var(--border-light);
  font-size: 13px;
  color: var(--ink-body);
  cursor: pointer;
}

.btn-timer-subtle:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

@media (max-width: 992px) {
  .alchemy-workspace {
    grid-template-columns: 1fr;
  }
}
</style>
