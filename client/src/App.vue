<template>
  <div class="app-container">
    <!-- 頂部導覽列 -->
    <HerbNavbar
      v-model:searchQuery="searchQuery"
      :compare-list="compareList"
      :health-info="healthInfo"
      @go-home="backToCatalog"
      @random-pick="fetchRandomHerb"
      @open-compare="isCompareModalOpen = true"
      @open-health="openHealthModal"
    />

    <!-- 主體內容區塊 -->
    <div class="main-wrapper">
      <!-- 側邊多維度篩選欄 (僅在目錄模式顯示) -->
      <HerbSidebar
        v-if="!selectedHerbId"
        :categories="categories"
        :channels="channels"
        :natures="natures"
        :current-category="currentCategory"
        :current-channel="currentChannel"
        :current-nature="currentNature"
        :total-herbs-count="pagination.total"
        @select-category="onSelectCategory"
        @select-channel="onSelectChannel"
        @select-nature="onSelectNature"
        @reset-filters="resetFilters"
      />

      <!-- 內容區 -->
      <main class="content-area" :style="{ gridColumn: selectedHerbId ? '1 / -1' : 'auto' }">
        <!-- 模式一：藥材詳情頁 (Detail View) -->
        <HerbDetail
          v-if="selectedHerbId && herbDetail"
          :herb="herbDetail"
          :is-comparing="isInCompare(herbDetail.id)"
          @back-to-catalog="backToCatalog"
          @select-herb-id="openHerbDetail"
          @toggle-compare="toggleCompare"
        />

        <!-- 模式二：圖鑑檢索目錄 (Catalog View) -->
        <div v-else>
          <!-- 頂部資訊與控制欄 -->
          <div class="catalog-header">
            <div class="catalog-title-group">
              <h2>
                {{ currentCategory === '全部' ? '台灣中草藥植物圖鑑' : currentCategory }}
              </h2>
              <div class="catalog-stats">
                共檢索到 <strong>{{ pagination.total }}</strong> 味藥材
                <span v-if="searchQuery"> · 搜尋關鍵字：「{{ searchQuery }}」</span>
                <span v-if="currentNature !== '全部'"> · 性味：{{ currentNature }}</span>
                <span v-if="currentChannel !== '全部'"> · 歸經：{{ currentChannel }}經</span>
              </div>
            </div>

            <!-- 控制列 (排序 & 檢視切換) -->
            <div class="catalog-controls">
              <select v-model="sortOption" class="select-custom" @change="loadHerbs">
                <option value="id_asc">依推薦順序</option>
                <option value="name_asc">依名稱筆劃 (升冪)</option>
                <option value="name_desc">依名稱筆劃 (降冪)</option>
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
            <p style="color: var(--ink-muted); margin-bottom: 20px;">建議更換搜尋關鍵字，或清除側邊的藥性與歸經篩選條件。</p>
            <button class="btn-pill btn-pill-primary" @click="resetFilters">重設所有篩選條件</button>
          </div>

          <!-- 卡片網格檢視 -->
          <div v-else-if="viewMode === 'grid'" class="herbs-grid">
            <HerbCard
              v-for="herb in herbs"
              :key="herb.id"
              :herb="herb"
              :is-comparing="isInCompare(herb.id)"
              @view-detail="openHerbDetail"
              @toggle-compare="toggleCompare"
            />
          </div>

          <!-- 精簡清單檢視 -->
          <div v-else style="background: var(--bg-card); border-radius: 14px; border: 1px solid var(--border-card); overflow: hidden; margin-bottom: 24px;">
            <table class="compare-table" style="margin: 0;">
              <thead>
                <tr>
                  <th style="width: 70px;">圖鑑</th>
                  <th>藥材名稱 / 學名</th>
                  <th>分類</th>
                  <th>四氣</th>
                  <th>歸經</th>
                  <th>核心功效</th>
                  <th style="width: 130px; text-align: center;">操作</th>
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
                    <span class="badge-channel" style="background: var(--primary-pale); color: var(--primary-deep);">{{ h.category }}</span>
                  </td>
                  <td>
                    <strong>{{ h.nature }}</strong>
                  </td>
                  <td>
                    <span v-for="ch in h.channels" :key="ch" class="badge-channel" style="margin-right: 4px;">{{ ch }}</span>
                  </td>
                  <td style="font-size: 12.5px; color: var(--ink-body);">{{ h.summaryEfficacy }}</td>
                  <td style="text-align: center;" @click.stop>
                    <button class="btn-compare-toggle" :class="{ active: isInCompare(h.id) }" @click="toggleCompare(h)">
                      {{ isInCompare(h.id) ? '已比對' : '+ 比對' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

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
      <div>台灣本草植物 Wiki 資料庫系統 · 基於 Node.js + Vue.js 現代全端架構</div>
      <div style="margin-top: 4px; font-size: 11.5px; color: var(--ink-muted);">
        傳承台灣民間草本經驗與傳統中醫藥典 · 現代植物學分類標準
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { HerbApi } from './services/api';
import HerbNavbar from './components/HerbNavbar.vue';
import HerbSidebar from './components/HerbSidebar.vue';
import HerbCard from './components/HerbCard.vue';
import HerbDetail from './components/HerbDetail.vue';
import HerbCompareModal from './components/HerbCompareModal.vue';
import HealthModal from './components/HealthModal.vue';

// 狀態定義
const herbs = ref([]);
const categories = ref([]);
const channels = ref([]);
const natures = ref([]);

const currentCategory = ref('全部');
const currentChannel = ref('全部');
const currentNature = ref('全部');
const searchQuery = ref('');
const sortOption = ref('id_asc');
const viewMode = ref('grid'); // 'grid' | 'list'

const selectedHerbId = ref(null);
const herbDetail = ref(null);
const isLoading = ref(false);

const compareList = ref([]);
const isCompareModalOpen = ref(false);

const healthInfo = ref(null);
const isHealthModalOpen = ref(false);

const pagination = ref({
  page: 1,
  limit: 24,
  total: 0,
  totalPages: 1
});

// 載入藥材清單
const loadHerbs = async () => {
  isLoading.value = true;
  try {
    const res = await HerbApi.getHerbs({
      q: searchQuery.value,
      category: currentCategory.value,
      channel: currentChannel.value,
      nature: currentNature.value,
      sort: sortOption.value,
      limit: pagination.value.limit
    });
    herbs.value = res.items;
    pagination.value = res.meta;
  } catch (err) {
    console.error('載入藥材失敗:', err);
  } finally {
    isLoading.value = false;
  }
};

// 載入分類與統計
const loadTaxonomy = async () => {
  try {
    const [cats, chs, nats] = await Promise.all([
      HerbApi.getCategories(),
      HerbApi.getChannels(),
      HerbApi.getNatures()
    ]);
    categories.value = cats;
    channels.value = chs;
    natures.value = nats;
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
  } catch (err) {
    console.error('載入詳情失敗:', err);
  } finally {
    isLoading.value = false;
  }
};

// 返回目錄
const backToCatalog = () => {
  selectedHerbId.value = null;
  herbDetail.value = null;
  window.location.hash = '#/';
};

// 隨機推薦
const fetchRandomHerb = async () => {
  try {
    const random = await HerbApi.getRandomHerb();
    if (random && random.id) {
      await openHerbDetail(random.id);
    }
  } catch (err) {
    console.error('隨機推薦失敗:', err);
  }
};

// 篩選事件處理
const onSelectCategory = (cat) => {
  currentCategory.value = cat;
  if (selectedHerbId.value) backToCatalog();
  loadHerbs();
};

const onSelectChannel = (ch) => {
  currentChannel.value = ch;
  if (selectedHerbId.value) backToCatalog();
  loadHerbs();
};

const onSelectNature = (nat) => {
  currentNature.value = nat;
  if (selectedHerbId.value) backToCatalog();
  loadHerbs();
};

const resetFilters = () => {
  currentCategory.value = '全部';
  currentChannel.value = '全部';
  currentNature.value = '全部';
  searchQuery.value = '';
  loadHerbs();
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
    // 若沒有完整 efficacy 則拉取完整資訊
    if (!herb.efficacy || !herb.contraindications) {
      const full = await HerbApi.getHerbById(herb.id);
      compareList.value.push(full);
    } else {
      compareList.value.push(herb);
    }
  }
};

const removeFromCompare = (id) => {
  compareList.value = compareList.value.filter(h => h.id !== id);
};

// 健康監控與 Failover 演練
const openHealthModal = async () => {
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

onMounted(async () => {
  await Promise.all([loadHerbs(), loadTaxonomy(), loadHealth()]);
  handleHashRouting();
  window.addEventListener('hashchange', handleHashRouting);
});
</script>
