<template>
  <div class="app-container" :data-theme="currentTheme">
    <!-- 典雅背景氛圍微粒畫布 -->
    <HerbAtmosphere />

    <!-- 頂部導覽列 -->
    <HerbNavbar
      v-model:searchQuery="searchQuery"
      :compare-list="compareList"
      :health-info="healthInfo"
      :current-theme="currentTheme"
      :active-tab="activeTab"
      @go-home="goCatalog"
      @random-pick="fetchRandomHerb"
      @open-compare="isCompareModalOpen = true"
      @open-health="openHealthModal"
      @open-cmd="isCmdPaletteOpen = true"
      @change-theme="setTheme"
      @switch-tab="switchMainTab"
    />

    <!-- Awwwards 殿堂級 Hero 敘事區 (僅在首頁/目錄頁展示) -->
    <HerbHero
      v-if="!selectedHerbId"
      :featured-herb="featuredHerb"
      :total-herbs="pagination.total"
      :favorites-count="favoriteHerbs.length"
      :current-tab="activeTab"
      @switch-tab="switchMainTab"
      @view-herb="openHerbDetail"
      @search-term="onHeroSearch"
    />

    <!-- 主體內容區塊 -->
    <div class="main-wrapper">
      <!-- 標籤頁一：專家諮詢茶堂 (RAG Consultation Lab) -->
      <div v-if="!selectedHerbId && activeTab === 'consult'" style="grid-column: 1 / -1;">
        <HerbConsultationLab @select-herb-id="openHerbDetail" />
      </div>

      <!-- 標籤頁二：典藏後台與數據中心 (Admin Dashboard) -->
      <div v-else-if="!selectedHerbId && activeTab === 'admin'" style="grid-column: 1 / -1;">
        <HerbAdminDashboard />
      </div>

      <!-- 標籤頁三：青草茶方劑調配研製所 (Alchemy Lab) -->
      <div v-else-if="!selectedHerbId && activeTab === 'alchemy'" style="grid-column: 1 / -1;">
        <HerbAlchemyLab :all-herbs="allHerbsFullList" />
      </div>

      <!-- 標籤頁四：五行經絡引導圖 (Meridian Body Map) -->
      <div v-else-if="!selectedHerbId && activeTab === 'meridian'" style="grid-column: 1 / -1;">
        <HerbMeridianMap :herbs="allHerbsFullList" @select-herb="openHerbDetail" />
      </div>

      <!-- 標籤頁五：藏書票收藏冊 (Favorites Cabinet) -->
      <div v-else-if="!selectedHerbId && activeTab === 'favorites'" style="grid-column: 1 / -1;">
        <FavoritesCabinet
          :favorite-herbs="favoriteHerbs"
          @browse-catalog="switchMainTab('catalog')"
          @view-herb="openHerbDetail"
          @remove-favorite="toggleFavorite"
        />
      </div>

      <!-- 標籤頁六：典藏圖鑑目錄 (Catalog) 包含側邊欄 -->
      <template v-else-if="!selectedHerbId">
        <!-- 側邊多維度篩選欄 -->
        <HerbSidebar
          :categories="categories"
          :channels="channels"
          :natures="natures"
          :regions="regions"
          :folk-applications="folkApplications"
          :safety-levels="safetyLevels"
          :current-category="currentCategory"
          :current-channel="currentChannel"
          :current-nature="currentNature"
          :current-region="currentRegion"
          :current-folk-app="currentFolkApp"
          :current-safety-level="currentSafetyLevel"
          :total-herbs-count="pagination.total"
          @select-category="onSelectCategory"
          @select-channel="onSelectChannel"
          @select-nature="onSelectNature"
          @select-region="onSelectRegion"
          @select-folk-app="onSelectFolkApp"
          @select-safety-level="onSelectSafetyLevel"
          @reset-filters="resetFilters"
        />

        <!-- 內容區 (圖鑑目錄模式) -->
        <main class="content-area">
          <!-- 台灣風土產區探索地圖導覽 -->
          <TaiwanTerroirMap
            :current-region="currentRegion"
            :all-herbs="allHerbsFullList"
            @select-region="onSelectRegion"
          />

          <!-- 頂部資訊與控制欄 -->
          <div class="catalog-header">
            <div class="catalog-title-group">
              <h2>
                {{ currentCategory === '全部' ? '台灣本土草藥植物圖鑑' : currentCategory }}
              </h2>
              <div class="catalog-stats">
                共檢索到 <strong>{{ pagination.total }}</strong> 味島嶼本草
                <span v-if="searchQuery"> · 搜尋：「{{ searchQuery }}」</span>
                <span v-if="currentRegion !== '全部'"> · 風土：{{ currentRegion }}</span>
                <span v-if="currentFolkApp !== '全部'"> · 情境：{{ currentFolkApp }}</span>
                <span v-if="currentNature !== '全部'"> · 性味：{{ currentNature }}</span>
                <span v-if="currentChannel !== '全部'"> · 歸經：{{ currentChannel }}經</span>
                <span v-if="currentSafetyLevel !== '全部'"> · 安全：{{ currentSafetyLevel }}</span>
              </div>
            </div>

            <!-- 控制列 (排序 & 檢視切換) -->
            <div class="catalog-controls">
              <select v-model="sortOption" class="select-custom" @change="loadHerbs">
                <option value="id_asc">依推薦順序</option>
                <option value="name_asc">依名稱筆劃 (升冪)</option>
                <option value="name_desc">依名稱筆劃 (降冪)</option>
                <option value="solar">依節氣時序排序</option>
              </select>

              <button
                class="view-toggle-btn"
                :class="{ active: viewMode === 'grid' }"
                title="圖鑑卡片網格"
                @click="viewMode = 'grid'"
              >
                ▦ 圖鑑
              </button>
              <button
                class="view-toggle-btn"
                :class="{ active: viewMode === 'list' }"
                title="精簡清單"
                @click="viewMode = 'list'"
              >
                ☰ 清單
              </button>
            </div>
          </div>

          <!-- 載入中狀態 -->
          <div v-if="isLoading" style="text-align: center; padding: 60px; color: var(--ink-muted);">
            <div style="font-size: 32px; margin-bottom: 12px;">🌿</div>
            <div>本草檢索中，請稍候...</div>
          </div>

          <!-- 無資料狀態 -->
          <div
            v-else-if="herbs.length === 0"
            style="background: var(--bg-card); border-radius: 14px; padding: 60px; text-align: center; border: 1px dashed var(--border-light);"
          >
            <div style="font-size: 40px; margin-bottom: 12px;">🍃</div>
            <h3 style="font-family: var(--font-serif); color: var(--primary-deep); margin-bottom: 8px;">未找到符合條件的本草藥材</h3>
            <p style="color: var(--ink-muted); margin-bottom: 20px;">建議更換搜尋關鍵字，或重設風土、性味與歸經篩選條件。</p>
            <button class="btn-pill btn-pill-primary" @click="resetFilters">重設所有篩選條件</button>
          </div>

          <!-- 卡片網格檢視 -->
          <div v-else-if="viewMode === 'grid'" class="herbs-grid">
            <HerbCard
              v-for="herb in herbs"
              :key="herb.id"
              :herb="herb"
              :is-comparing="isInCompare(herb.id)"
              :is-favorite="isHerbFavorite(herb.id)"
              @view-detail="openHerbDetail"
              @toggle-compare="toggleCompare"
              @toggle-favorite="toggleFavorite"
            />
          </div>

          <!-- 精簡清單檢視 -->
          <div v-else style="background: var(--bg-card); border-radius: 14px; border: 1px solid var(--border-card); overflow: hidden; margin-bottom: 24px;">
            <table class="compare-table" style="margin: 0;">
              <thead>
                <tr>
                  <th style="width: 70px;">圖鑑</th>
                  <th>藥材名稱 / 學名</th>
                  <th>風土產區</th>
                  <th>四氣五味</th>
                  <th>歸經</th>
                  <th>核心功效</th>
                  <th style="width: 140px; text-align: center;">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="h in herbs" :key="'list-' + h.id" style="cursor: pointer;" @click="openHerbDetail(h.id)">
                  <td style="text-align: center; padding: 8px;">
                    <img :src="h.thumbnailUrl" :alt="h.name" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;" />
                  </td>
                  <td>
                    <div style="font-weight: bold; color: var(--primary-deep); font-size: 15px;">{{ h.name }}</div>
                    <div style="font-size: 11px; font-style: italic; color: var(--ink-muted);">{{ h.scientificName }}</div>
                  </td>
                  <td>
                    <span class="badge-channel" style="background: var(--bg-subtle); color: var(--ink-heavy);">{{ h.region ? h.region.split(' ')[0] : '全島' }}</span>
                  </td>
                  <td>
                    <strong>{{ h.nature }}</strong> · {{ (h.taste || []).join('、') }}
                  </td>
                  <td>
                    <span v-for="ch in h.channels" :key="ch" class="badge-channel" style="margin-right: 4px;">{{ ch }}</span>
                  </td>
                  <td style="font-size: 12.5px; color: var(--ink-body);">{{ h.summaryEfficacy }}</td>
                  <td style="text-align: center;" @click.stop>
                    <button
                      class="btn-compare-toggle"
                      :class="{ active: isInCompare(h.id) }"
                      style="margin-right: 6px;"
                      @click="toggleCompare(h)"
                    >
                      {{ isInCompare(h.id) ? '已比對' : '+ 比對' }}
                    </button>
                    <button
                      class="btn-compare-toggle"
                      :class="{ active: isHerbFavorite(h.id) }"
                      @click="toggleFavorite(h)"
                    >
                      {{ isHerbFavorite(h.id) ? '★' : '☆' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </template>

      <!-- 模式七：藥材詳情頁 (Detail View) 跨越全欄 -->
      <main v-else class="content-area" style="grid-column: 1 / -1;">
        <HerbDetail
          :herb="herbDetail"
          :is-comparing="isInCompare(herbDetail.id)"
          :is-favorite="isHerbFavorite(herbDetail.id)"
          @back-to-catalog="backToCatalog"
          @select-herb-id="openHerbDetail"
          @toggle-compare="toggleCompare"
          @toggle-favorite="toggleFavorite"
        />
      </main>
    </div>

    <!-- 快捷搜尋命令盤 (Ctrl+K) -->
    <CommandPalette
      :is-open="isCmdPaletteOpen"
      :herbs="allHerbsFullList"
      @close="isCmdPaletteOpen = false"
      @select-herb="openHerbDetail"
      @filter-category="onSelectCategory"
    />

    <!-- 藥材對照彈窗 -->
    <HerbCompareModal
      v-if="isCompareModalOpen"
      :herbs="compareList"
      @close="isCompareModalOpen = false"
      @remove-herb="removeFromCompare"
      @clear-all="compareList = []"
    />

    <!-- 系統健康監控彈窗 -->
    <HealthModal
      v-if="isHealthModalOpen"
      :health="healthInfo"
      @close="isHealthModalOpen = false"
      @trigger-failover="handleFailoverDrill"
    />

    <!-- 頁尾宣告 -->
    <footer class="footer-bar">
      <div>台灣本草植物 Wiki 資料庫系統 · Taiwan Herb Wiki</div>
      <div style="margin-top: 4px; font-size: 11.5px; color: var(--ink-muted);">
        榮獲數位美學與植物學知識庫設計標準 · 沉澱四百年風土草木智慧 · RAG 專家語意系統
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { HerbApi } from './services/api';
import { audio } from './services/audioService';
import HerbAtmosphere from './components/HerbAtmosphere.vue';
import HerbNavbar from './components/HerbNavbar.vue';
import HerbHero from './components/HerbHero.vue';
import HerbSidebar from './components/HerbSidebar.vue';
import TaiwanTerroirMap from './components/TaiwanTerroirMap.vue';
import HerbCard from './components/HerbCard.vue';
import HerbDetail from './components/HerbDetail.vue';
import HerbConsultationLab from './components/HerbConsultationLab.vue';
import HerbAdminDashboard from './components/HerbAdminDashboard.vue';
import HerbAlchemyLab from './components/HerbAlchemyLab.vue';
import HerbMeridianMap from './components/HerbMeridianMap.vue';
import FavoritesCabinet from './components/FavoritesCabinet.vue';
import CommandPalette from './components/CommandPalette.vue';
import HerbCompareModal from './components/HerbCompareModal.vue';
import HealthModal from './components/HealthModal.vue';

// 狀態定義
const herbs = ref([]);
const allHerbsFullList = ref([]);
const categories = ref([]);
const channels = ref([]);
const natures = ref([]);
const regions = ref([]);
const folkApplications = ref([]);
const safetyLevels = ref([]);

const currentCategory = ref('全部');
const currentChannel = ref('全部');
const currentNature = ref('全部');
const currentRegion = ref('全部');
const currentFolkApp = ref('全部');
const currentSafetyLevel = ref('全部');

const searchQuery = ref('');
const sortOption = ref('id_asc');
const viewMode = ref('grid'); // 'grid' | 'list'
const activeTab = ref('catalog'); // 'catalog' | 'consult' | 'admin' | 'alchemy' | 'meridian' | 'favorites'

const selectedHerbId = ref(null);
const herbDetail = ref(null);
const isLoading = ref(false);

const compareList = ref([]);
const isCompareModalOpen = ref(false);

const healthInfo = ref(null);
const isHealthModalOpen = ref(false);

const isCmdPaletteOpen = ref(false);
const currentTheme = ref(localStorage.getItem('taiwanherb_theme') || 'parchment');

// 收藏標本 (Persistence in LocalStorage)
const favoriteHerbs = ref(JSON.parse(localStorage.getItem('taiwanherb_favorites') || '[]'));

const featuredHerb = ref({
  id: 1,
  name: '大花咸豐草',
  scientificName: 'Bidens pilosa var. radiata',
  category: '台灣青草茶經典',
  nature: '涼',
  terroir: '萬華西昌街青草巷核心',
  efficacy: '清熱解毒、利尿散瘀、消腫止瀉。台灣最富代表性的民間青草茶主原料之一。',
  thumbnailUrl: 'https://images.unsplash.com/photo-1596726915017-91a566ce0aa7?auto=format&fit=crop&w=800&q=85'
});

const pagination = ref({
  page: 1,
  limit: 30,
  total: 0,
  totalPages: 1
});

// 主題設置
const setTheme = (theme) => {
  currentTheme.value = theme;
  localStorage.setItem('taiwanherb_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

// 標籤頁切換
const switchMainTab = (tab) => {
  audio.playClick();
  activeTab.value = tab;
  if (selectedHerbId.value) {
    backToCatalog();
  }
};

// 載入藥材清單
const loadHerbs = async () => {
  isLoading.value = true;
  try {
    const res = await HerbApi.getHerbs({
      q: searchQuery.value,
      category: currentCategory.value,
      channel: currentChannel.value,
      nature: currentNature.value,
      region: currentRegion.value,
      folkApplication: currentFolkApp.value,
      safetyLevel: currentSafetyLevel.value,
      sort: sortOption.value,
      limit: pagination.value.limit
    });
    herbs.value = res.items;
    pagination.value = res.meta;

    // 若第一次載入全草藥，備份全列表供研製所、經絡圖與地圖使用
    if (allHerbsFullList.value.length === 0) {
      allHerbsFullList.value = res.items;
      if (res.items.length > 0) {
        featuredHerb.value = res.items[0];
      }
    }
  } catch (err) {
    console.error('載入藥材失敗:', err);
  } finally {
    isLoading.value = false;
  }
};

// 載入分類、風土與各維度統計
const loadTaxonomy = async () => {
  try {
    const [cats, chs, nats, regs, folks, safeties] = await Promise.all([
      HerbApi.getCategories(),
      HerbApi.getChannels(),
      HerbApi.getNatures(),
      HerbApi.getRegions(),
      HerbApi.getFolkApplications(),
      HerbApi.getSafetyLevels()
    ]);
    categories.value = cats;
    channels.value = chs;
    natures.value = nats;
    regions.value = regs;
    folkApplications.value = folks;
    safetyLevels.value = safeties;
  } catch (err) {
    console.error('載入統計資訊失敗:', err);
  }
};

// 載入健康資訊
const loadHealth = async () => {
  try {
    healthInfo.value = await HerbApi.getHealth();
  } catch (err) {
    console.error('取得健康狀態失敗:', err);
  }
};

// 開啟藥材詳情
const openHerbDetail = async (id) => {
  try {
    isLoading.value = true;
    const detail = await HerbApi.getHerbById(id);
    herbDetail.value = detail;
    selectedHerbId.value = id;
    window.location.hash = `#/herb/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    audio.playScroll();
  } catch (err) {
    console.error('載入詳情失敗:', err);
  } finally {
    isLoading.value = false;
  }
};

// 回到首頁/目錄
const backToCatalog = () => {
  selectedHerbId.value = null;
  herbDetail.value = null;
  window.location.hash = '#/';
};

const goCatalog = () => {
  audio.playClick();
  activeTab.value = 'catalog';
  backToCatalog();
};

// 隨機推薦
const fetchRandomHerb = async () => {
  try {
    audio.playChime(528);
    const random = await HerbApi.getRandomHerb();
    if (random && random.id) {
      await openHerbDetail(random.id);
    }
  } catch (err) {
    console.error('隨機推薦失敗:', err);
  }
};

const onHeroSearch = (term) => {
  searchQuery.value = term;
  activeTab.value = 'catalog';
  loadHerbs();
};

// 篩選事件處理
const onSelectCategory = (cat) => {
  audio.playClick();
  currentCategory.value = cat;
  activeTab.value = 'catalog';
  if (selectedHerbId.value) backToCatalog();
  loadHerbs();
};

const onSelectChannel = (ch) => {
  audio.playClick();
  currentChannel.value = ch;
  activeTab.value = 'catalog';
  if (selectedHerbId.value) backToCatalog();
  loadHerbs();
};

const onSelectNature = (nat) => {
  audio.playClick();
  currentNature.value = nat;
  activeTab.value = 'catalog';
  if (selectedHerbId.value) backToCatalog();
  loadHerbs();
};

const onSelectRegion = (reg) => {
  audio.playClick();
  currentRegion.value = reg;
  activeTab.value = 'catalog';
  if (selectedHerbId.value) backToCatalog();
  loadHerbs();
};

const onSelectFolkApp = (folk) => {
  audio.playClick();
  currentFolkApp.value = folk;
  activeTab.value = 'catalog';
  if (selectedHerbId.value) backToCatalog();
  loadHerbs();
};

const onSelectSafetyLevel = (lvl) => {
  audio.playClick();
  currentSafetyLevel.value = lvl;
  activeTab.value = 'catalog';
  if (selectedHerbId.value) backToCatalog();
  loadHerbs();
};

const resetFilters = () => {
  audio.playClick();
  currentCategory.value = '全部';
  currentChannel.value = '全部';
  currentNature.value = '全部';
  currentRegion.value = '全部';
  currentFolkApp.value = '全部';
  currentSafetyLevel.value = '全部';
  searchQuery.value = '';
  loadHerbs();
};

// 收藏管理 (Favorites)
const isHerbFavorite = (id) => {
  return favoriteHerbs.value.some(h => h.id === id);
};

const toggleFavorite = (herb) => {
  const index = favoriteHerbs.value.findIndex(h => h.id === herb.id);
  if (index !== -1) {
    favoriteHerbs.value.splice(index, 1);
  } else {
    favoriteHerbs.value.push(herb);
  }
  localStorage.setItem('taiwanherb_favorites', JSON.stringify(favoriteHerbs.value));
};

// 比對管理
const isInCompare = (id) => {
  return compareList.value.some(h => h.id === id);
};

const toggleCompare = async (herb) => {
  const index = compareList.value.findIndex(h => h.id === herb.id);
  if (index !== -1) {
    compareList.value.splice(index, 1);
  } else {
    if (compareList.value.length >= 4) {
      alert('最多同時比對 4 味藥材');
      return;
    }
    if (!herb.efficacy || !herb.contraindications) {
      const full = await HerbApi.getHerbById(herb.id);
      compareList.value.push(full);
    } else {
      compareList.value.push(herb);
    }
  }
};

const removeFromCompare = (id) => {
  audio.playClick();
  compareList.value = compareList.value.filter(h => h.id !== id);
};

// 健康監控與 Failover 演練
const openHealthModal = async () => {
  audio.playClick();
  await loadHealth();
  isHealthModalOpen.value = true;
};

const handleFailoverDrill = async () => {
  try {
    await HerbApi.triggerFailover('前端使用者手動測試演練 Failover');
    await loadHealth();
  } catch (err) {
    console.error('Failover 演練失敗:', err);
  }
};

// 監聽搜尋關鍵字變更
watch(searchQuery, () => {
  if (selectedHerbId.value) {
    backToCatalog();
  }
  loadHerbs();
});

// URL Hash 路由監控 (支援 #/herb/:id)
const handleHashRouting = () => {
  const hash = window.location.hash;
  const match = hash.match(/^#\/herb\/(\d+)$/);
  if (match) {
    const id = parseInt(match[1], 10);
    openHerbDetail(id);
  } else if (!hash || hash === '#/' || hash === '#/catalog') {
    selectedHerbId.value = null;
    herbDetail.value = null;
  }
};

// 全域快捷鍵監聽 (Cmd+K / Ctrl+K)
const onKeyDown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    isCmdPaletteOpen.value = !isCmdPaletteOpen.value;
  }
};

onMounted(async () => {
  setTheme(currentTheme.value);
  await Promise.all([loadHerbs(), loadTaxonomy(), loadHealth()]);
  handleHashRouting();
  window.addEventListener('hashchange', handleHashRouting);
  window.addEventListener('keydown', onKeyDown);
});
</script>
