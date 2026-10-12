<template>
  <div class="allied-shops-container">
    <!-- 頂部殿堂級橫幅 -->
    <div class="shops-banner">
      <div class="shops-banner-content">
        <div class="shops-seal-badge">
          <span class="banner-seal">青草舖</span>
          <span class="banner-badge-text">TAIWAN ALLIED HERB SHOPS · 全台結盟青草店與採買避坑指引</span>
        </div>
        <h2 class="shops-main-title">
          <span>穿街走巷尋草香，</span>
          <em>全臺在地結盟青草老舖採買指引</em>
        </h2>
        <p class="shops-subtitle">
          收錄艋舺西昌街、客家山城、鹿港老街至花東原鄉 12 家特約老牌青草店，提供生鮮現採、古法烘乾與客製代熬指引，守護常民草本生活品質。
        </p>
      </div>
    </div>

    <!-- 古早常民文化與生活茶飲免責聲明 -->
    <div class="shops-legal-strip">
      <div class="strip-icon">⚖️</div>
      <div class="strip-text">
        <strong>【常民採買與非醫療聲明】</strong>
        本指引所列店家為臺灣民間傳統青草、茶飲與民俗藥浴原料販售店家。所售草本植物皆屬民間常民茶飲、膳食料理與生活文化用途，<strong>非屬醫療院所或中西藥處方，絕不宣稱任何疾病療效</strong>。身體不適請務必尋求合格醫師診治。
      </div>
    </div>

    <!-- 採買避坑與煎熬指南四大手帖 (可切換展開) -->
    <div class="guides-section">
      <div class="section-title-row">
        <span class="section-seal">指南</span>
        <h3 class="section-title">常民草本採買避坑四大手帖</h3>
        <span class="section-hint">老藥師傳授挑選鮮草、乾草與火候秘訣</span>
      </div>

      <div class="guides-grid">
        <div
          v-for="guide in buyingGuides"
          :key="guide.id"
          class="guide-card"
          :class="{ active: activeGuideId === guide.id }"
          @click="activeGuideId = activeGuideId === guide.id ? null : guide.id"
        >
          <div class="guide-card-header">
            <span class="guide-icon">{{ guide.icon }}</span>
            <div class="guide-title-block">
              <h4 class="guide-title">{{ guide.title }}</h4>
              <span class="guide-subtitle">{{ guide.subtitle }}</span>
            </div>
            <span class="guide-toggle-btn">{{ activeGuideId === guide.id ? '▲ 收起' : '▼ 詳讀' }}</span>
          </div>

          <p class="guide-overview">{{ guide.overview }}</p>

          <div v-if="activeGuideId === guide.id" class="guide-details-panel">
            <div class="guide-points-box">
              <div class="points-label">🎯 挑選心法與要點：</div>
              <ul class="points-list">
                <li v-for="(pt, idx) in guide.keyPoints" :key="idx">{{ pt }}</li>
              </ul>
            </div>

            <div class="guide-pitfalls-box">
              <div class="pitfalls-label">⚠️ 避坑提醒（勿踩雷）：</div>
              <ul class="pitfalls-list">
                <li v-for="(pit, pIdx) in guide.pitfalls" :key="pIdx">{{ pit }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 結盟青草店檢索與篩選控制列 -->
    <div class="shops-control-bar">
      <div class="filters-row">
        <!-- 分區篩選 -->
        <div class="filter-group">
          <span class="filter-label">產區區域：</span>
          <div class="region-buttons">
            <button
              v-for="reg in regions"
              :key="reg"
              class="filter-pill-btn"
              :class="{ active: currentRegion === reg }"
              @click="setRegion(reg)"
            >
              {{ reg }}
            </button>
          </div>
        </div>

        <!-- 關鍵字搜尋 -->
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            class="shop-search-input"
            placeholder="搜尋青草老店名稱、縣市、招牌草藥..."
            @input="onSearchChange"
          />
          <button v-if="searchQuery" class="clear-btn" @click="clearSearch">✕</button>
        </div>
      </div>

      <div class="stats-row">
        <span>共收錄全台 <strong>{{ filteredShops.length }}</strong> 家優質結盟青草老舖</span>
        <span v-if="currentRegion !== '全部'"> · 目前分區：{{ currentRegion }}</span>
        <span v-if="searchQuery"> · 搜尋關鍵字：「{{ searchQuery }}」</span>
      </div>
    </div>

    <!-- 青草店卡片列表 -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner">🌿</div>
      <div>正在尋訪全島結盟青草老舖...</div>
    </div>

    <div v-else-if="filteredShops.length === 0" class="empty-state">
      <div class="empty-icon">🍃</div>
      <h4>未找到符合篩選條件的青草店</h4>
      <p>建議清除搜尋關鍵字，或切換為全臺灣所有區域。</p>
      <button class="btn-reset" @click="resetFilters">重設篩選條件</button>
    </div>

    <div v-else class="shops-cards-grid">
      <div
        v-for="shop in filteredShops"
        :key="shop.id"
        class="shop-card"
      >
        <!-- 卡片頂部：店名與年份證照 -->
        <div class="shop-card-head">
          <div class="shop-title-wrap">
            <span class="shop-city-badge">{{ shop.city }}</span>
            <h3 class="shop-name">{{ shop.name }}</h3>
          </div>
          <div class="shop-years-badge">{{ shop.years }}</div>
        </div>

        <!-- 標籤與特色徽章 -->
        <div class="shop-tags-wrap">
          <span v-for="tag in shop.tags" :key="tag" class="shop-tag">
            #{{ tag }}
          </span>
        </div>

        <!-- 核心資訊列表 -->
        <div class="shop-info-list">
          <div class="info-item">
            <span class="info-icon">📍</span>
            <div class="info-content">
              <strong>地址：</strong>
              <span>{{ shop.address }}</span>
              <a
                :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.address)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="map-link-btn"
                title="在 Google Maps 開啟導航"
              >
                🗺️ 地圖導航
              </a>
            </div>
          </div>

          <div class="info-item">
            <span class="info-icon">📞</span>
            <div class="info-content">
              <strong>電話：</strong>
              <a :href="`tel:${shop.phone.replace(/[^0-9]/g, '')}`" class="phone-link">{{ shop.phone }}</a>
            </div>
          </div>

          <div class="info-item">
            <span class="info-icon">⏰</span>
            <div class="info-content">
              <strong>營業時間：</strong>
              <span>{{ shop.businessHours }}</span>
            </div>
          </div>
        </div>

        <!-- 招牌拿手本草 (點擊可查看或投入調配) -->
        <div class="shop-specialties-box">
          <div class="box-title">🌿 招牌道地草藥：</div>
          <div class="herb-chips-row">
            <span
              v-for="herb in shop.featuredHerbs"
              :key="herb"
              class="herb-chip"
              :title="`在知識庫檢索「${herb}」`"
              @click="$emit('view-herb-name', herb)"
            >
              {{ herb }} ➔
            </span>
          </div>
        </div>

        <!-- 購買指引與店家叮嚀 -->
        <div class="shop-guide-note">
          <div class="note-title">💡 採買避坑指引：</div>
          <p class="note-desc">{{ shop.buyingAdvice }}</p>
        </div>

        <!-- 卡片底部動作按鈕 -->
        <div class="shop-card-footer">
          <button
            class="btn-action-primary"
            @click="copyShopInfo(shop)"
          >
            📋 複製店鋪資訊
          </button>
          <button
            class="btn-action-subtle"
            @click="$emit('jump-to-alchemy')"
          >
            🧪 帶配方調配 ➔
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { HerbApi } from '../services/api';
import { audio } from '../services/audioService';

const emit = defineEmits(['view-herb-name', 'jump-to-alchemy', 'switch-tab']);

const shops = ref([]);
const buyingGuides = ref([]);
const isLoading = ref(true);
const activeGuideId = ref('fresh');

const regions = ['全部', '北部', '中部', '南部', '東部'];
const currentRegion = ref('全部');
const searchQuery = ref('');

const loadData = async () => {
  isLoading.value = true;
  try {
    const [shopsData, guidesData] = await Promise.all([
      HerbApi.getShops(),
      HerbApi.getShopGuides()
    ]);
    shops.value = shopsData;
    buyingGuides.value = guidesData;
  } catch (err) {
    console.error('Failed to load shops or guides:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadData();
});

const setRegion = (reg) => {
  audio.playClick();
  currentRegion.value = reg;
};

const onSearchChange = () => {
  // instant local filtering
};

const clearSearch = () => {
  audio.playClick();
  searchQuery.value = '';
};

const resetFilters = () => {
  audio.playClick();
  currentRegion.value = '全部';
  searchQuery.value = '';
};

const filteredShops = computed(() => {
  let list = shops.value;

  if (currentRegion.value !== '全部') {
    list = list.filter(s => s.region === currentRegion.value);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      (s.featuredHerbs || []).some(h => h.toLowerCase().includes(q)) ||
      (s.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }

  return list;
});

const copyShopInfo = (shop) => {
  audio.playStamp();
  const text = `【${shop.name}】\n地址：${shop.address}\n電話：${shop.phone}\n營業時間：${shop.businessHours}\n招牌草藥：${shop.featuredHerbs.join('、')}\n採買指引：${shop.buyingAdvice}`;
  navigator.clipboard.writeText(text);
  alert(`已將「${shop.name}」之店家採買資訊複製到剪貼簿！`);
};
</script>

<style scoped>
.allied-shops-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px 60px;
}

/* 頂部殿堂級橫幅 */
.shops-banner {
  background: linear-gradient(135deg, rgba(35, 78, 63, 0.95), rgba(20, 52, 42, 0.98)),
              url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></svg>');
  border-radius: 18px;
  padding: 36px 36px 32px;
  margin-bottom: 20px;
  color: #fff;
  box-shadow: 0 10px 30px rgba(20, 52, 42, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.shops-seal-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.12);
  padding: 4px 14px 4px 6px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 16px;
}

.banner-seal {
  background: #b91c1c;
  color: #fff;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 13px;
  padding: 2px 8px;
  border-radius: 12px;
  letter-spacing: 1px;
}

.banner-badge-text {
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
  opacity: 0.95;
}

.shops-main-title {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 900;
  line-height: 1.3;
  margin: 0 0 12px;
  display: flex;
  flex-direction: column;
}

.shops-main-title span {
  color: rgba(255, 255, 255, 0.85);
  font-size: 20px;
  font-weight: 400;
}

.shops-main-title em {
  font-style: normal;
  color: #fef08a;
  letter-spacing: 1px;
}

.shops-subtitle {
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  max-width: 860px;
  margin: 0;
}

/* 法律免責警示條 */
.shops-legal-strip {
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-left: 5px solid #d97706;
  border-radius: 12px;
  padding: 12px 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #92400e;
}

.strip-icon {
  font-size: 20px;
  line-height: 1;
}

.strip-text {
  font-size: 13px;
  line-height: 1.5;
}

/* 採買避坑指南四大手帖 */
.guides-section {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-card);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  border-bottom: 1px dashed var(--border-light);
  padding-bottom: 12px;
}

.section-seal {
  background: var(--primary);
  color: #fff;
  font-family: var(--font-serif);
  font-size: 12px;
  font-weight: bold;
  padding: 2px 7px;
  border-radius: 4px;
}

.section-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 19px;
  color: var(--primary-deep);
  font-weight: 800;
}

.section-hint {
  font-size: 13px;
  color: var(--ink-muted);
  margin-left: auto;
}

.guides-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .guides-grid {
    grid-template-columns: 1fr;
  }
}

.guide-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.guide-card:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.08);
}

.guide-card.active {
  background: var(--bg-card);
  border-color: var(--primary);
  box-shadow: 0 4px 16px rgba(45, 106, 79, 0.12);
}

.guide-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.guide-icon {
  font-size: 24px;
}

.guide-title-block {
  flex: 1;
}

.guide-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-deep);
}

.guide-subtitle {
  font-size: 12px;
  color: var(--ink-muted);
}

.guide-toggle-btn {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  background: rgba(45, 106, 79, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
}

.guide-overview {
  font-size: 13.5px;
  color: var(--ink-body);
  line-height: 1.5;
  margin: 0;
}

.guide-details-panel {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--border-light);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.guide-points-box {
  background: rgba(45, 106, 79, 0.04);
  border-left: 3px solid var(--primary);
  padding: 10px 14px;
  border-radius: 6px;
}

.points-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 6px;
}

.points-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12.5px;
  color: var(--ink-heavy);
  line-height: 1.6;
}

.guide-pitfalls-box {
  background: #fff5f5;
  border-left: 3px solid #e53e3e;
  padding: 10px 14px;
  border-radius: 6px;
}

.pitfalls-label {
  font-size: 13px;
  font-weight: 700;
  color: #c53030;
  margin-bottom: 6px;
}

.pitfalls-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12.5px;
  color: #742a2a;
  line-height: 1.6;
}

/* 控制篩選列 */
.shops-control-bar {
  background: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border-card);
  padding: 16px 20px;
  margin-bottom: 24px;
}

.filters-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink-heavy);
}

.region-buttons {
  display: flex;
  gap: 6px;
}

.filter-pill-btn {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--border-light);
  background: var(--bg-subtle);
  color: var(--ink-body);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-pill-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.search-box {
  position: relative;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ink-muted);
}

.shop-search-input {
  width: 100%;
  padding: 8px 32px 8px 36px;
  border-radius: 20px;
  border: 1px solid var(--border-light);
  background: var(--bg-parchment);
  font-size: 13.5px;
  color: var(--ink-heavy);
  outline: none;
}

.shop-search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.15);
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ink-muted);
}

.stats-row {
  margin-top: 10px;
  font-size: 12.5px;
  color: var(--ink-muted);
  border-top: 1px solid var(--border-light);
  padding-top: 10px;
}

/* 店鋪卡片網格 */
.shops-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 1100px) {
  .shops-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .shops-cards-grid {
    grid-template-columns: 1fr;
  }
}

.shop-card {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-card);
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.shop-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(45, 106, 79, 0.12);
  border-color: var(--primary);
}

.shop-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 10px;
}

.shop-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.shop-city-badge {
  background: var(--bg-subtle);
  color: var(--primary-deep);
  font-size: 11.5px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid var(--border-light);
}

.shop-name {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 900;
  color: var(--primary-deep);
}

.shop-years-badge {
  background: #fef3c7;
  color: #92400e;
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  white-space: nowrap;
  border: 1px solid #fde68a;
}

.shop-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.shop-tag {
  font-size: 11px;
  color: var(--primary-deep);
  background: rgba(45, 106, 79, 0.08);
  padding: 2px 8px;
  border-radius: 12px;
}

.shop-info-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 14px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.info-icon {
  font-size: 14px;
  line-height: 1.4;
}

.info-content {
  flex: 1;
  color: var(--ink-heavy);
  line-height: 1.4;
}

.info-content strong {
  color: var(--ink-muted);
}

.map-link-btn {
  display: inline-block;
  margin-left: 8px;
  font-size: 11px;
  color: var(--primary);
  text-decoration: underline;
  font-weight: 600;
}

.phone-link {
  color: var(--primary-deep);
  font-weight: 600;
  text-decoration: none;
}

.phone-link:hover {
  text-decoration: underline;
}

.shop-specialties-box {
  background: var(--bg-parchment);
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 12px;
  border: 1px solid var(--border-light);
}

.box-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 6px;
}

.herb-chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.herb-chip {
  font-size: 11.5px;
  background: #fff;
  border: 1px solid var(--border-light);
  color: var(--primary-deep);
  padding: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
}

.herb-chip:hover {
  border-color: var(--primary);
  background: var(--primary);
  color: #fff;
}

.shop-guide-note {
  background: #fffbeb;
  border-left: 3px solid #f59e0b;
  border-radius: 6px;
  padding: 8px 10px;
  margin-bottom: 16px;
}

.note-title {
  font-size: 11.5px;
  font-weight: 700;
  color: #92400e;
  margin-bottom: 4px;
}

.note-desc {
  font-size: 12px;
  color: #78350f;
  margin: 0;
  line-height: 1.4;
}

.shop-card-footer {
  margin-top: auto;
  display: flex;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px dashed var(--border-light);
}

.btn-action-primary {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 600;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: var(--ink-heavy);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-action-primary:hover {
  background: #fff;
  border-color: var(--primary);
  color: var(--primary);
}

.btn-action-subtle {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 600;
  background: rgba(45, 106, 79, 0.1);
  border: 1px solid transparent;
  color: var(--primary-deep);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-action-subtle:hover {
  background: var(--primary);
  color: #fff;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 60px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px dashed var(--border-light);
}

.spinner {
  font-size: 32px;
  margin-bottom: 10px;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.btn-reset {
  margin-top: 14px;
  padding: 8px 18px;
  border-radius: 20px;
  background: var(--primary);
  color: #fff;
  border: none;
  font-size: 13px;
  cursor: pointer;
}
</style>
