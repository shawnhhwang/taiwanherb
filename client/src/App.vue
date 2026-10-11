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
      :current-user="currentUser"
      @go-home="goCatalog"
      @random-pick="fetchRandomHerb"
      @open-compare="isCompareModalOpen = true"
      @open-health="openHealthModal"
      @open-cmd="isCmdPaletteOpen = true"
      @open-disclaimer="openDisclaimerModal"
      @open-auth="isAuthModalOpen = true"
      @change-theme="setTheme"
      @switch-tab="switchMainTab"
    />

    <!-- 當令節氣今日推薦古卷橫條 Toast -->
    <transition name="fade">
      <div v-if="isSeasonalToastVisible" class="seasonal-recommendation-toast">
        <div class="toast-content">
          <span class="toast-seal">時序</span>
          <span class="toast-text">{{ seasonalToastMessage }}</span>
        </div>
        <button class="toast-close" title="關閉提示" @click="isSeasonalToastVisible = false">✕</button>
      </div>
    </transition>

    <!-- Awwwards 殿堂級 Hero 敘事區 (僅在首頁展示「草木有靈，人間有情」) -->
    <HerbHero
      v-if="!selectedHerbId && activeTab === 'home'"
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
      <!-- 標籤頁零：首頁精選與快速導覽 (Home 模式，維持首頁美學與精選卡片) -->
      <div v-if="!selectedHerbId && activeTab === 'home'" style="grid-column: 1 / -1;" class="home-featured-wrapper">
        <div class="home-section-header">
          <div class="home-section-seal">本草精選</div>
          <h2 class="home-section-title">島嶼經典本草 · 採擷天地四時風土</h2>
          <p class="home-section-desc">
            依山傍海的臺灣島嶼孕育多樣微氣候，每一株野生草木皆蘊藏先民百年生活智慧。
          </p>
        </div>

        <!-- 6 味精選推薦草藥卡片 -->
        <div class="herbs-grid" style="margin-bottom: 36px;">
          <HerbCard
            v-for="herb in herbs.slice(0, 6)"
            :key="'home-' + herb.id"
            :herb="herb"
            :is-comparing="isInCompare(herb.id)"
            :is-favorite="isHerbFavorite(herb.id)"
            @click="openHerbDetail(herb.id)"
            @toggle-compare="toggleCompare"
            @toggle-favorite="toggleFavorite"
          />
        </div>

        <!-- 進入本草知識庫的大按鈕引導橫幅 -->
        <div class="home-cta-card">
          <div class="home-cta-text">
            <h3>探索完整臺灣島嶼 <strong>{{ pagination.total }}</strong> 味本草植物知識庫</h3>
            <p>包含多維度風土產區、性味歸經、民間情境、四氣五味精準檢索與全島地圖探索</p>
          </div>
          <button class="btn-cta-knowledge" @click="switchMainTab('catalog')">
            <span>🌿 進入本草知識庫（資料庫查詢）➔</span>
          </button>
        </div>
      </div>

      <!-- 標籤頁一：專家諮詢茶堂 (RAG Consultation Lab) - 純淨整潔，無首頁資訊 -->
      <div v-else-if="!selectedHerbId && activeTab === 'consult'" style="grid-column: 1 / -1;">
        <HerbConsultationLab @select-herb-id="openHerbDetail" />
      </div>

      <!-- 標籤頁二：典藏後台與數據中心 (Admin Dashboard) - 純淨整潔，無首頁資訊 -->
      <div v-else-if="!selectedHerbId && activeTab === 'admin'" style="grid-column: 1 / -1;">
        <HerbAdminDashboard />
      </div>

      <!-- 標籤頁三：青草茶方劑調配研製所 (Alchemy Lab) - 純淨整潔，無首頁資訊 -->
      <div v-else-if="!selectedHerbId && activeTab === 'alchemy'" style="grid-column: 1 / -1;">
        <HerbAlchemyLab :all-herbs="allHerbsFullList" />
      </div>

      <!-- 標籤頁四：五行經絡引導圖 (Meridian Body Map) - 純淨整潔，無首頁資訊 -->
      <div v-else-if="!selectedHerbId && activeTab === 'meridian'" style="grid-column: 1 / -1;">
        <HerbMeridianMap :herbs="allHerbsFullList" @select-herb="openHerbDetail" />
      </div>

      <!-- 標籤頁五：藏書票收藏冊 (Favorites Cabinet) - 純淨整潔，無首頁資訊 -->
      <div v-else-if="!selectedHerbId && activeTab === 'favorites'" style="grid-column: 1 / -1;">
        <FavoritesCabinet
          :favorite-herbs="favoriteHerbs"
          @browse-catalog="switchMainTab('catalog')"
          @view-herb="openHerbDetail"
          @remove-favorite="toggleFavorite"
        />
      </div>

      <!-- 標籤頁六：本草知識庫 (Catalog 資料庫查詢模式) - 純淨整潔，無首頁資訊 -->
      <template v-else-if="!selectedHerbId && activeTab === 'catalog'">
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
      :all-herbs="allHerbsFullList"
      @close="isCompareModalOpen = false"
      @remove-herb="removeFromCompare"
      @add-herb="toggleCompare"
      @load-preset="loadComparePreset"
      @clear-all="compareList = []"
      @view-herb="openHerbDetailFromCompare"
    />

    <!-- 系統健康監控彈窗 -->
    <HealthModal
      v-if="isHealthModalOpen"
      :health="healthInfo"
      @close="isHealthModalOpen = false"
      @trigger-failover="handleFailoverDrill"
    />

    <!-- 使用者登入與前後台權限管理視窗 (RBAC) -->
    <AuthModal
      :is-open="isAuthModalOpen"
      :current-user="currentUser"
      @close="isAuthModalOpen = false"
      @login-success="handleLoginSuccess"
      @logout="handleLogout"
      @switch-to-admin="handleSwitchToAdmin"
    />

    <!-- 全域傳統古早文化知識分享宣告欄 -->
    <div class="global-disclaimer-strip">
      <div class="disclaimer-strip-inner">
        <span class="strip-seal">告</span>
        <span class="strip-text">
          <strong>【民間文化與古早知識分享宣告】</strong>
          本系統所記載之性味、經絡歸屬、民俗應用及風土配伍，純粹說明臺灣傳統民間生活知識與文獻記錄分享，<strong>絕非醫療建議，亦無宣稱任何療效</strong>。身體有疾痛請務必尋求合格醫師診治。
        </span>
        <button class="strip-link-btn" @click="openDisclaimerModal">
          完整免責條款 ➔
        </button>
      </div>
    </div>

    <!-- 頁尾宣告 -->
    <footer class="footer-bar">
      <div>台灣本草植物 Wiki 資料庫系統 · Taiwan Herb Wiki</div>
      <div style="margin-top: 4px; font-size: 11.5px; color: var(--ink-muted);">
        榮獲數位美學與植物學知識庫設計標準 · 沉澱四百年風土草木智慧 · 純粹古早民俗文化分享 · 非醫療宣稱平台
      </div>
    </footer>

    <!-- 民間古早文化知識分享與法律免責聲明彈窗 (最前端前景) -->
    <div v-if="isDisclaimerModalOpen" class="disclaimer-modal-overlay">
      <div class="disclaimer-modal-card">
        <div class="disclaimer-modal-header">
          <div class="header-seal-wrap">
            <span class="modal-seal">法</span>
            <div>
              <h3 class="modal-title">民間古早知識分享 · 醫療免責條款聲明</h3>
              <div class="modal-subtitle">Legal & Medical Compliance Disclaimer</div>
            </div>
          </div>
          <button
            class="modal-close"
            :title="isDisclaimerAgreed ? '關閉聲明' : '請先勾選同意上述條款方可關閉'"
            @click="handleDisclaimerCloseAttempt"
          >
            ✕
          </button>
        </div>

        <div class="disclaimer-modal-body">
          <div class="disclaimer-callout">
            <span class="callout-icon">⚖️</span>
            <div class="callout-text">
              <strong>重要宣告：本系統嚴格遵循法規，絕不宣稱任何醫療效果，純粹是說明臺灣古早民俗文化與本草知識分享。</strong>
            </div>
          </div>

          <div class="disclaimer-section">
            <h4>一、文化傳承與歷史教育性質定位</h4>
            <p>
              本「台灣本草植物誌 (Taiwan Herb Wiki)」為一聚焦於臺灣四百年常民生活風土、客家與原住民族野草採集歷史、傳統民間青草茶舖文獻之<strong>文化教育與植物學普及展示平台</strong>。本網站所有內容（包含草藥性味、十二經絡、古籍文獻記述、民俗用途、RAG 專家諮詢回答、文章專題及方劑研製），均源自古代典籍考據與民間鄉野傳承記錄，純供常民文化認知與生活生活茶飲探索參考。
            </p>
          </div>

          <div class="disclaimer-section">
            <h4>二、絕無醫療效果宣稱與非醫療行為宣告</h4>
            <p>
              本系統所提及之任何植物性味、民間傳統茶飲或古早草本應用，<strong>均不得視為藥品療效，亦不具備預防、改善、減輕或治療任何人類疾病或病徵之醫療宣稱</strong>。本系統亦不提供任何形式之線上看診、醫療諮詢、病理判斷、臨床診斷或處方開立。
            </p>
          </div>

          <div class="disclaimer-section">
            <h4>三、尋求專業合格醫師之義務</h4>
            <p>
              草藥受產地微氣候、個人體質（如虛寒、燥熱、過敏、孕哺期或慢性病史）及沖泡方式影響甚鉅。若使用者有任何身體不適、疑似病徵或正在服用常規西藥，<strong>請務必立即尋求政府合格立案之中醫師或西醫專科醫師進行正規診斷與治療</strong>，切勿依賴本網站任何資訊自行診斷或延誤正規就醫。
            </p>
          </div>

          <div class="disclaimer-section">
            <h4>四、野外採集倫理與生物安全防護</h4>
            <p>
              野外野生草本常有形態相似之劇毒雜草（如大花曼陀羅、毛地黃、毒芹等），切勿於野外隨意採摘或生食未經植物學專家確證之植物。
            </p>
          </div>

          <!-- 使用者確認打勾區塊 (必須打勾後方可確認結束) -->
          <div class="disclaimer-agreement-box" :class="{ 'is-agreed': isDisclaimerAgreed, 'shake-hint': shakeDisclaimerAgreement }">
            <label class="agreement-checkbox-label">
              <input
                type="checkbox"
                v-model="isDisclaimerAgreed"
                class="agreement-checkbox"
                @change="onDisclaimerCheckboxChange"
              />
              <span class="agreement-text">
                我已詳細閱讀、充分理解並同意：<strong>本平台所載內容純屬臺灣本土傳統民間草木文化交流與古早風土知識分享，非屬醫療意見，絕無任何醫療效果宣稱或診斷處方功能。若有病痛不適將尋求合格中西醫療院所診治。</strong>
              </span>
            </label>
          </div>
        </div>

        <div class="disclaimer-modal-footer">
          <div class="footer-hint-text" v-if="!isDisclaimerAgreed">
            ⚠️ 請先勾選上方同意方框以確認理解條款
          </div>
          <button
            class="btn-ack"
            :disabled="!isDisclaimerAgreed"
            @click="confirmDisclaimer"
          >
            <span v-if="isDisclaimerAgreed">✓ 我已理解並同意上述免責聲明（確認進入） ➔</span>
            <span v-else>請先勾選同意上述免責條款 ➔</span>
          </button>
        </div>
      </div>
    </div>
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
import AuthModal from './components/AuthModal.vue';
import { getSeasonalHerbRecommendation } from './services/solarTerms';

// 狀態定義
const herbs = ref([]);
const allHerbsFullList = ref([]);
const categories = ref([]);
const channels = ref([]);
const natures = ref([]);
const regions = ref([]);
const folkApplications = ref([]);
const safetyLevels = ref([]);

// 當令節氣推薦橫條 Toast 狀態
const seasonalToastMessage = ref('');
const isSeasonalToastVisible = ref(false);

const currentCategory = ref('全部');
const currentChannel = ref('全部');
const currentNature = ref('全部');
const currentRegion = ref('全部');
const currentFolkApp = ref('全部');
const currentSafetyLevel = ref('全部');

const searchQuery = ref('');
const sortOption = ref('id_asc');
const viewMode = ref('grid'); // 'grid' | 'list'
const activeTab = ref('home'); // 'home' | 'catalog' | 'consult' | 'admin' | 'alchemy' | 'meridian' | 'favorites'

const selectedHerbId = ref(null);
const herbDetail = ref(null);
const isLoading = ref(false);

const compareList = ref([]);
const isCompareModalOpen = ref(false);
const isDisclaimerModalOpen = ref(false);
const isDisclaimerAgreed = ref(false);
const shakeDisclaimerAgreement = ref(false);

// 使用者身分與前後台權限狀態 (RBAC)
const isAuthModalOpen = ref(false);
const currentUser = ref(null);

const openDisclaimerModal = () => {
  isDisclaimerAgreed.value = false;
  isDisclaimerModalOpen.value = true;
};

const onDisclaimerCheckboxChange = () => {
  if (isDisclaimerAgreed.value) {
    audio.playClick();
  }
};

const confirmDisclaimer = () => {
  if (!isDisclaimerAgreed.value) {
    handleDisclaimerCloseAttempt();
    return;
  }
  audio.playStamp();
  localStorage.setItem('taiwanherb_disclaimer_agreed', 'true');
  isDisclaimerModalOpen.value = false;
};

const handleDisclaimerCloseAttempt = () => {
  if (isDisclaimerAgreed.value) {
    confirmDisclaimer();
  } else {
    audio.playClick();
    shakeDisclaimerAgreement.value = true;
    setTimeout(() => {
      shakeDisclaimerAgreement.value = false;
    }, 600);
  }
};

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
  thumbnailUrl: '/images/herbs/herb_1.svg'
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
  window.location.hash = `#/${tab}`;
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
  activeTab.value = 'home';
  backToCatalog();
  window.location.hash = '#/home';
};

// 今日推薦 (依據現實當前時間計算最接近之 24 節氣對應當令草藥)
const fetchRandomHerb = async () => {
  try {
    audio.playChime(528);
    // 依據當前現實日期計算節氣與當令草藥
    const recommendation = getSeasonalHerbRecommendation(allHerbsFullList.value, new Date());
    const { term, herb, reason } = recommendation;
    
    if (herb && herb.id) {
      await openHerbDetail(herb.id);
      seasonalToastMessage.value = `🍂【當令節氣 · ${term.name}（${term.dateRange}）今日推薦本草】：${herb.name} —— ${reason}`;
      isSeasonalToastVisible.value = true;
      setTimeout(() => {
        isSeasonalToastVisible.value = false;
      }, 7000);
    } else {
      const random = await HerbApi.getRandomHerb();
      if (random && random.id) {
        await openHerbDetail(random.id);
      }
    }
  } catch (err) {
    console.error('今日節氣推薦失敗:', err);
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

// 比對管理 (最多同時比對 4 味本草)
const isInCompare = (id) => {
  return compareList.value.some(h => h.id === id);
};

const toggleCompare = async (herb) => {
  audio.playClick();
  const index = compareList.value.findIndex(h => h.id === herb.id);
  if (index !== -1) {
    compareList.value.splice(index, 1);
  } else {
    if (compareList.value.length >= 4) {
      alert('最多同時比對 4 味藥材');
      return;
    }
    let targetHerb = herb;
    if (!herb.efficacy || !herb.contraindications) {
      targetHerb = await HerbApi.getHerbById(herb.id);
    }
    compareList.value.push(targetHerb);
  }
};

// 一鍵載入經典對照組合
const loadComparePreset = async (preset) => {
  audio.playStamp();
  const matchedHerbs = [];
  for (const name of preset.targetNames) {
    const found = allHerbsFullList.value.find(h => h.name === name);
    if (found) {
      let fullHerb = found;
      if (!found.efficacy || !found.contraindications) {
        fullHerb = await HerbApi.getHerbById(found.id);
      }
      matchedHerbs.push(fullHerb);
    }
  }
  if (matchedHerbs.length > 0) {
    compareList.value = matchedHerbs;
  }
};

const openHerbDetailFromCompare = (id) => {
  isCompareModalOpen.value = false;
  openHerbDetail(id);
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
  // 若使用者在首頁輸入搜尋，自動導向本草知識庫查詢模式
  if (searchQuery.value && activeTab.value === 'home') {
    activeTab.value = 'catalog';
    window.location.hash = '#/catalog';
  }
  loadHerbs();
});

// URL Hash 路由監控 (支援 #/home, #/catalog, #/consult, #/admin, #/herb/:id)
const handleHashRouting = () => {
  const hash = window.location.hash;
  const match = hash.match(/^#\/herb\/(\d+)$/);
  if (match) {
    const id = parseInt(match[1], 10);
    openHerbDetail(id);
  } else if (hash === '#/catalog') {
    selectedHerbId.value = null;
    herbDetail.value = null;
    activeTab.value = 'catalog';
  } else if (hash === '#/consult') {
    selectedHerbId.value = null;
    herbDetail.value = null;
    activeTab.value = 'consult';
  } else if (hash === '#/admin') {
    selectedHerbId.value = null;
    herbDetail.value = null;
    activeTab.value = 'admin';
  } else if (hash === '#/alchemy') {
    selectedHerbId.value = null;
    herbDetail.value = null;
    activeTab.value = 'alchemy';
  } else if (hash === '#/meridian') {
    selectedHerbId.value = null;
    herbDetail.value = null;
    activeTab.value = 'meridian';
  } else if (hash === '#/favorites') {
    selectedHerbId.value = null;
    herbDetail.value = null;
    activeTab.value = 'favorites';
  } else if (!hash || hash === '#/' || hash === '#/home') {
    selectedHerbId.value = null;
    herbDetail.value = null;
    activeTab.value = 'home';
  }
};

// 全域快捷鍵監聽 (Cmd+K / Ctrl+K)
const onKeyDown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    isCmdPaletteOpen.value = !isCmdPaletteOpen.value;
  }
};

// 使用者登入與身分狀態管理
const checkUserAuth = async () => {
  try {
    const res = await HerbApi.getAdminStatus();
    if (res && res.authenticated && res.user) {
      currentUser.value = {
        ...res.user,
        roleTitle: res.role?.name || res.user.role
      };
    } else {
      currentUser.value = null;
    }
  } catch (err) {
    currentUser.value = null;
  }
};

const handleLoginSuccess = (user) => {
  currentUser.value = user;
  isAuthModalOpen.value = false;
};

const handleLogout = () => {
  currentUser.value = null;
};

const handleSwitchToAdmin = () => {
  isAuthModalOpen.value = false;
  switchMainTab('admin');
};

onMounted(async () => {
  setTheme(currentTheme.value);
  await Promise.all([loadHerbs(), loadTaxonomy(), loadHealth(), checkUserAuth()]);
  handleHashRouting();
  window.addEventListener('hashchange', handleHashRouting);
  window.addEventListener('keydown', onKeyDown);

  // 初次造訪使用者，自動於最前方前景彈出知識免責聲明，打勾確認後方可關閉
  if (!localStorage.getItem('taiwanherb_disclaimer_agreed')) {
    openDisclaimerModal();
  }
});
</script>
