<template>
  <section class="herb-hero">
    <div class="hero-inner">
      <!-- 左側：標題敘事與節氣日曆 -->
      <div class="hero-narrative">
        <div class="hero-top-badge">
          <span class="solar-badge-seal">節氣</span>
          <span class="solar-term-text">島嶼時序 · <strong>{{ currentSolarTerm.name }}</strong>（{{ currentSolarTerm.dateRange }}）</span>
        </div>

        <h1 class="hero-main-title">
          <span>草木有靈，人間有情</span>
          <em class="hero-title-accent">尋訪島嶼的本草青草香</em>
        </h1>

        <p class="hero-intro-text">
          從台北萬華西昌街百年青草巷，到中央山脈潮濕林緣與苗栗客家丘陵。
          台灣先民依循四時節氣，採擷天地草木以調和體內陰陽。
          在此探索 <strong>{{ totalHerbs }}</strong> 味經典島嶼本草，體驗傳統方劑調配與現代植物學智慧。
        </p>

        <!-- 節氣青草即時推薦方 -->
        <div class="solar-wisdom-card">
          <div class="solar-wisdom-header">
            <span class="solar-icon">🍂</span>
            <strong>【{{ currentSolarTerm.name }}草本養生訓】</strong>
            <span class="solar-select-hint">可切換探索 24 節氣</span>
          </div>
          <p class="solar-wisdom-desc">{{ currentSolarTerm.wisdom }}</p>
          <div class="solar-herb-tags">
            <span class="solar-tag-label">當令推薦：</span>
            <button
              v-for="herbName in currentSolarTerm.herbs"
              :key="herbName"
              class="solar-herb-pill"
              @click="onQuickSearch(herbName)"
            >
              🌿 {{ herbName }}
            </button>
          </div>
        </div>

        <!-- 探索功能捷徑標籤 -->
        <div class="hero-navigation-pills">
          <button
            class="hero-nav-pill"
            :class="{ active: currentTab === 'catalog' }"
            @click="$emit('switch-tab', 'catalog')"
          >
            <span>🌿</span>
            <span>典藏圖鑑</span>
          </button>
          <button
            class="hero-nav-pill"
            :class="{ active: currentTab === 'alchemy' }"
            @click="$emit('switch-tab', 'alchemy')"
          >
            <span>🍵</span>
            <span>方劑調配研製所</span>
          </button>
          <button
            class="hero-nav-pill"
            :class="{ active: currentTab === 'meridian' }"
            @click="$emit('switch-tab', 'meridian')"
          >
            <span>🫀</span>
            <span>五行經絡引導圖</span>
          </button>
          <button
            class="hero-nav-pill"
            :class="{ active: currentTab === 'favorites' }"
            @click="$emit('switch-tab', 'favorites')"
          >
            <span>🔖</span>
            <span>藏書票 ({{ favoritesCount }})</span>
          </button>
        </div>
      </div>

      <!-- 右側：互動式 3D 典藏標本展台 -->
      <div class="hero-specimen-stage">
        <div
          ref="cardRef"
          class="specimen-3d-card"
          :style="cardTransformStyle"
          @mousemove="onMouseMove"
          @mouseleave="onMouseLeave"
          @click="onSpecimenClick"
        >
          <div class="card-seal-stamp">臺灣本草</div>
          <div class="card-image-window">
            <img
              :src="featuredHerb.thumbnailUrl"
              :alt="featuredHerb.name"
              class="specimen-hero-img"
            />
            <div class="card-shimmer" :style="shimmerStyle"></div>
            <div class="specimen-category-pill">{{ featuredHerb.category }}</div>
          </div>

          <div class="specimen-card-content">
            <div class="specimen-header-row">
              <div>
                <h3 class="specimen-title">{{ featuredHerb.name }}</h3>
                <div class="specimen-latin">{{ featuredHerb.scientificName }}</div>
              </div>
              <span class="specimen-nature-seal">{{ featuredHerb.nature }}性</span>
            </div>

            <p class="specimen-quote">
              「{{ featuredHerb.efficacy ? featuredHerb.efficacy.slice(0, 56) + '...' : '' }}」
            </p>

            <div class="specimen-footer-row">
              <span class="specimen-terroir-tag">📍 {{ featuredHerb.terroir || '全島常見' }}</span>
              <span class="specimen-inspect-btn">展卷檢閱 ➔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { audio } from '../services/audioService';

const props = defineProps({
  featuredHerb: {
    type: Object,
    default: () => ({
      id: 1,
      name: '大花咸豐草',
      scientificName: 'Bidens pilosa var. radiata',
      category: '台灣青草茶經典',
      nature: '涼',
      terroir: '萬華西昌街青草巷核心',
      efficacy: '清熱解毒、利尿散瘀、消腫止瀉。台灣最富代表性的民間青草茶主原料之一。',
      thumbnailUrl: 'https://images.unsplash.com/photo-1596726915017-91a566ce0aa7?auto=format&fit=crop&w=800&q=85'
    })
  },
  totalHerbs: { type: Number, default: 16 },
  favoritesCount: { type: Number, default: 0 },
  currentTab: { type: String, default: 'catalog' }
});

const emit = defineEmits(['switch-tab', 'view-herb', 'search-term']);

// 二十四節氣知識庫 (依據當前月份或時序動態映射)
const solarTerms = [
  { name: '春分', dateRange: '3/20 - 4/04', wisdom: '天地陽氣舒發，肝氣旺盛，宜飲薄荷、桑葉以疏肝解鬱、清利頭目。', herbs: ['薄荷', '桑葉'] },
  { name: '立夏', dateRange: '5/05 - 5/20', wisdom: '暑氣初生，心火漸熾，宜取金銀花配甘草煮露，清心涼血、芳香化濕。', herbs: ['金銀花', '薄荷'] },
  { name: '芒種', dateRange: '6/05 - 6/20', wisdom: '梅雨濕熱交蒸，端午懸艾避穢，採艾草溫灸足三里、驅散身內寒濕。', herbs: ['艾草', '車前草'] },
  { name: '夏至', dateRange: '6/21 - 7/06', wisdom: '陽氣之極，心煩口渴，萬華青草舖大火沸煮咸豐草、鳳尾草，甘苦生津。', herbs: ['大花咸豐草', '鳳尾草'] },
  { name: '小暑', dateRange: '7/07 - 7/22', wisdom: '盛夏蒸溽，多汗耗氣傷津，煮車前草排濁濕，摘到手香鮮葉清熱含津。', herbs: ['左手香', '車前草'] },
  { name: '大暑', dateRange: '7/23 - 8/06', wisdom: '全年至熱之節，火氣深伏，取穿心蓮、白花蛇舌草極苦解熱、消癰散熱毒。', herbs: ['穿心蓮', '大花咸豐草'] },
  { name: '處暑', dateRange: '8/23 - 9/06', wisdom: '夏秋交接，肌膚微燥，以雷公根（積雪草）清熱利濕、生肌養膚。', herbs: ['雷公根', '魚腥草'] },
  { name: '白露', dateRange: '9/07 - 9/21', wisdom: '秋燥犯肺，咽乾少痰，取魚腥草慢火熬甘草水，清肺排濁、通利水道。', herbs: ['魚腥草', '甘草'] },
  { name: '秋分', dateRange: '9/22 - 10/07', wisdom: '晝夜均平，陰長陽消，宜泡枸杞桑葉茶滋補肝腎、益精明目、滋陰潤燥。', herbs: ['枸杞子', '白花蛇舌草'] },
  { name: '寒露', dateRange: '10/08 - 10/22', wisdom: '露氣寒冷，秋燥轉盛，以紫蘇行氣散微寒、解魚蟹腥毒、溫胃安中。', herbs: ['紫蘇', '薄荷'] },
  { name: '霜降', dateRange: '10/23 - 11/06', wisdom: '草木經霜，收斂精氣，摘經霜桑葉清肺潤燥，泡黃耆厚片固表抗寒。', herbs: ['桑葉', '黃耆'] },
  { name: '冬至', dateRange: '12/21 - 1/04', wisdom: '陰極生陽，萬物蟄藏，以黃耆、當歸、枸杞慢火燉補，補氣升陽、固本培元。', herbs: ['黃耆', '枸杞子'] }
];

// 計算當前節氣 (預設秋分/寒露季節)
const currentSolarTerm = computed(() => {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 4) return solarTerms[0];
  if (month === 5) return solarTerms[1];
  if (month === 6) return solarTerms[2];
  if (month === 7) return solarTerms[4];
  if (month === 8) return solarTerms[6];
  if (month === 9) return solarTerms[8];
  if (month === 10) return solarTerms[9];
  if (month === 11) return solarTerms[10];
  return solarTerms[11];
});

// 3D 視角互動
const cardRef = ref(null);
const rotateX = ref(0);
const rotateY = ref(0);
const shimmerX = ref(50);
const shimmerY = ref(50);

const onMouseMove = (e) => {
  if (!cardRef.value) return;
  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  rotateX.value = -((y - centerY) / centerY) * 10;
  rotateY.value = ((x - centerX) / centerX) * 10;
  shimmerX.value = (x / rect.width) * 100;
  shimmerY.value = (y / rect.height) * 100;
};

const onMouseLeave = () => {
  rotateX.value = 0;
  rotateY.value = 0;
};

const cardTransformStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) translateY(-2px)`,
  transition: 'transform 0.15s ease-out'
}));

const shimmerStyle = computed(() => ({
  background: `radial-gradient(circle at ${shimmerX.value}% ${shimmerY.value}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)`
}));

const onSpecimenClick = () => {
  audio.playChime(660);
  emit('view-herb', props.featuredHerb.id);
};

const onQuickSearch = (name) => {
  audio.playClick();
  emit('search-term', name);
};
</script>

<style scoped>
.herb-hero {
  position: relative;
  background: linear-gradient(180deg, rgba(244, 239, 230, 0.6) 0%, rgba(250, 247, 242, 0.95) 100%);
  border-bottom: 1px solid var(--border-light);
  overflow: hidden;
  padding: 48px 24px;
}

.hero-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.25fr 0.85fr;
  gap: 48px;
  align-items: center;
}

.hero-narrative {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero-top-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card);
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--border-light);
  width: fit-content;
  box-shadow: var(--shadow-sm);
  font-size: 13px;
  color: var(--ink-body);
}

.solar-badge-seal {
  background: #c2410c;
  color: #fff;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 1px;
}

.hero-main-title {
  font-family: var(--font-serif);
  font-size: 40px;
  line-height: 1.25;
  color: var(--primary-deep);
  font-weight: 900;
  letter-spacing: -0.5px;
}

.hero-title-accent {
  display: block;
  font-size: 26px;
  color: var(--amber-deep);
  font-style: normal;
  font-weight: 700;
  margin-top: 8px;
  font-family: var(--font-sans);
}

.hero-intro-text {
  font-size: 15.5px;
  line-height: 1.75;
  color: var(--ink-body);
  max-width: 640px;
}

/* 節氣卡片 */
.solar-wisdom-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-left: 4px solid var(--amber);
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: var(--shadow-sm);
}

.solar-wisdom-header {
  font-size: 14px;
  color: var(--primary-deep);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.solar-select-hint {
  font-size: 11px;
  color: var(--ink-muted);
  margin-left: auto;
}

.solar-wisdom-desc {
  font-size: 13.5px;
  color: var(--ink-body);
  line-height: 1.6;
  margin-bottom: 10px;
}

.solar-herb-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.solar-tag-label {
  font-size: 12px;
  color: var(--ink-muted);
  font-weight: 600;
}

.solar-herb-pill {
  font-size: 12px;
  background: var(--primary-pale);
  color: var(--primary-deep);
  border: 1px solid rgba(45, 106, 79, 0.2);
  padding: 3px 10px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.solar-herb-pill:hover {
  background: var(--primary);
  color: #fff;
  transform: translateY(-1px);
}

/* 捷徑按鈕 */
.hero-navigation-pills {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.hero-nav-pill {
  padding: 10px 18px;
  border-radius: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  color: var(--ink-heavy);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-sm);
  transition: all 0.25s ease;
  cursor: pointer;
}

.hero-nav-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.hero-nav-pill.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
  box-shadow: 0 4px 14px rgba(45, 106, 79, 0.35);
}

/* 3D 標本卡片 */
.hero-specimen-stage {
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
}

.specimen-3d-card {
  width: 100%;
  max-width: 380px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(27, 67, 50, 0.12);
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
}

.card-seal-stamp {
  position: absolute;
  top: 14px;
  right: 14px;
  border: 2px solid #b91c1c;
  color: #b91c1c;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 11px;
  letter-spacing: 2px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  z-index: 10;
  transform: rotate(5deg);
}

.card-image-window {
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
  background: #ede6d6;
}

.specimen-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.specimen-3d-card:hover .specimen-hero-img {
  transform: scale(1.08);
}

.card-shimmer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: 0.85;
}

.specimen-category-pill {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(27, 67, 50, 0.85);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 11.5px;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.specimen-card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.specimen-header-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.specimen-title {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 800;
  color: var(--primary-deep);
}

.specimen-latin {
  font-size: 12.5px;
  font-style: italic;
  color: var(--ink-muted);
}

.specimen-nature-seal {
  background: #e0f7fa;
  color: #00796b;
  border: 1px solid #b2dfdb;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 700;
}

.specimen-quote {
  font-size: 13.5px;
  color: var(--ink-body);
  line-height: 1.6;
}

.specimen-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
  font-size: 12.5px;
}

.specimen-terroir-tag {
  color: var(--amber-deep);
  font-weight: 500;
}

.specimen-inspect-btn {
  color: var(--primary);
  font-weight: 700;
}

@media (max-width: 992px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .hero-main-title {
    font-size: 32px;
  }
  .specimen-3d-card {
    max-width: 100%;
  }
}
</style>
