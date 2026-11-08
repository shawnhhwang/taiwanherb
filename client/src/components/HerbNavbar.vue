<template>
  <header class="top-navbar">
    <div class="navbar-inner">
      <!-- 左側群組：品牌標誌 + 核心導覽標籤 (桌機主流解析度自適應) -->
      <div class="nav-left-cluster">
        <div class="brand-section" @click="$emit('switch-tab', 'home')" title="返回台灣肯信本草研究室首頁">
          <div class="brand-seal">肯</div>
          <div class="brand-text-block">
            <div class="brand-title">台灣肯信本草研究室</div>
            <div class="brand-subtitle">TAIWAN KENSHIN HERB LAB</div>
          </div>
        </div>

        <!-- 核心導航選單 (自適應各主流桌機解析度) -->
        <nav class="nav-tabs-group">
          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'home' }"
            title="探索島嶼風土與節氣時序"
            @click="$emit('switch-tab', 'home')"
          >
            <span class="tab-icon">🏡</span>
            <span class="tab-label">首頁</span>
          </button>

          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'catalog' }"
            title="進入本草知識庫查詢與多維度圖鑑篩選"
            @click="$emit('switch-tab', 'catalog')"
          >
            <span class="tab-icon">🌿</span>
            <span class="tab-label">
              <span class="label-full">本草知識庫</span>
              <span class="label-short">知識庫</span>
            </span>
          </button>

          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'alchemy' }"
            title="方劑研製所 · 角色傳承名方與 AI 神來一配實驗室"
            @click="$emit('switch-tab', 'alchemy')"
          >
            <span class="tab-icon">🧪</span>
            <span class="tab-label">
              <span class="label-full">方劑實驗室</span>
              <span class="label-short">實驗室</span>
            </span>
          </button>

          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'shops' }"
            title="尋訪全臺結盟青草老舖與採買避坑指南"
            @click="$emit('switch-tab', 'shops')"
          >
            <span class="tab-icon">🏪</span>
            <span class="tab-label">
              <span class="label-full">結盟青草店</span>
              <span class="label-short">青草店</span>
            </span>
          </button>

          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'books' }"
            title="草木書閣 · 線上購買實體書、電子書與精彩試閱"
            @click="$emit('switch-tab', 'books')"
          >
            <span class="tab-icon">📚</span>
            <span class="tab-label">
              <span class="label-full">草木書閣</span>
              <span class="label-short">書閣</span>
            </span>
          </button>

          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'diet' }"
            title="藥膳食療 · 《藥膳學》食材名方檢索與名師 RAG 智慧問答"
            @click="$emit('switch-tab', 'diet')"
          >
            <span class="tab-icon">🍲</span>
            <span class="tab-label">
              <span class="label-full">藥膳食療</span>
              <span class="label-short">藥膳</span>
            </span>
          </button>

          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'consult' }"
            title="請益本草耆老與風土達人 (RAG 語意問答)"
            @click="$emit('switch-tab', 'consult')"
          >
            <span class="tab-icon">🍵</span>
            <span class="tab-label">
              <span class="label-full">諮詢茶堂</span>
              <span class="label-short">茶堂</span>
            </span>
          </button>

          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'admin' }"
            title="進入本草典藏後台與數據中心"
            @click="$emit('switch-tab', 'admin')"
          >
            <span class="tab-icon">⚙️</span>
            <span class="tab-label">
              <span class="label-full">管理後台</span>
              <span class="label-short">後台</span>
            </span>
          </button>
        </nav>
      </div>

      <!-- 中間：智能模糊搜尋欄 (自適應彈性伸縮) -->
      <div class="nav-search-container" @click="$emit('open-cmd')">
        <span class="nav-search-icon">🔍</span>
        <input
          type="text"
          class="nav-search-input"
          placeholder="搜尋藥材、學名、經絡、功效 (Ctrl+K)..."
          :value="searchQuery"
          @input="onSearchInput"
          @click.stop
        />
        <div class="nav-search-actions">
          <button
            v-if="searchQuery"
            class="nav-search-clear"
            title="清除搜尋"
            @click.stop="clearSearch"
          >
            ✕
          </button>
          <kbd class="nav-kbd-hint" @click.stop="$emit('open-cmd')">⌘K</kbd>
        </div>
      </div>

      <!-- 右側群組：功能工具與身分 -->
      <div class="nav-right-cluster">
        <!-- 系統監控與 Failover 節點狀態 (只有系統管理使用者才能看到) -->
        <button
          v-if="isSuperAdmin"
          class="health-status-badge"
          :title="'伺服器狀態: ' + (healthInfo?.database?.modeDescription || '連線中') + ' (點擊查看節點監控與演練)'"
          @click="$emit('open-health')"
        >
          <span class="pulse-dot"></span>
          <span class="health-badge-label">
            {{ healthInfo?.database?.isMemoryMode ? '節點 (Memory)' : `節點 (${healthInfo?.database?.activeNode})` }}
          </span>
        </button>

        <!-- 節令推薦 (與當令節氣一致) -->
        <button class="nav-tool-btn btn-pill-accent" title="推薦當令節氣契合之島嶼本草（依當前時序自動對應）" @click="$emit('random-pick')">
          <span>🍂</span>
          <span class="tool-btn-text-full">節令推薦</span>
          <span class="tool-btn-text-short">節令</span>
        </button>

        <!-- 藥材對照比對 (無障礙點擊，支援一鍵載入比對組合) -->
        <button
          class="nav-tool-btn"
          :class="{ 'has-badge': compareList.length > 0, 'btn-tool-active': compareList.length > 0 }"
          :title="compareList.length > 0 ? `開啟 ${compareList.length} 味藥材多方對照比對` : '開啟藥材對照比對視窗 (支援一鍵載入經典對照)'"
          @click="$emit('open-compare')"
        >
          <span>⚖️</span>
          <span class="tool-btn-text">比對</span>
          <span v-if="compareList.length > 0" class="compare-badge-num">{{ compareList.length }}</span>
        </button>

        <!-- 使用者操作說明手冊 -->
        <button
          class="nav-tool-btn btn-pill-manual"
          title="查閱完整使用者操作說明手冊 (支援情境速查與直接跳轉)"
          @click="$emit('open-manual')"
        >
          <span>📖</span>
          <span class="tool-btn-text-full">操作手冊</span>
          <span class="tool-btn-text-short">手冊</span>
        </button>

        <!-- 免責聲明 -->
        <button
          class="nav-tool-btn"
          title="閱讀民間知識分享與非醫療宣告"
          @click="$emit('open-disclaimer')"
        >
          <span>📜</span>
          <span class="tool-btn-text-full">免責聲明</span>
          <span class="tool-btn-text-short">免責</span>
        </button>

        <!-- 主題與聲景膠囊 -->
        <div class="nav-ambient-capsule">
          <div class="theme-switcher-group" title="切換東方美學主題">
            <button
              class="theme-dot parchment-dot"
              :class="{ active: currentTheme === 'parchment' }"
              title="宣紙本草 (古卷米黃)"
              @click="setTheme('parchment')"
            ></button>
            <button
              class="theme-dot bamboo-dot"
              :class="{ active: currentTheme === 'bamboo' }"
              title="晨曦竹林 (蒼翠淡雅)"
              @click="setTheme('bamboo')"
            ></button>
            <button
              class="theme-dot midnight-dot"
              :class="{ active: currentTheme === 'midnight' }"
              title="暮夜玄青 (深黛墨玉)"
              @click="setTheme('midnight')"
            ></button>
          </div>

          <button
            class="audio-toggle-btn"
            :class="{ active: !isMuted }"
            :title="isMuted ? '開啟東方草木聲景 (Web Audio)' : '靜音'"
            @click="toggleAudio"
          >
            <span>{{ isMuted ? '🔇' : '🔔' }}</span>
          </button>

          <button
            class="audio-toggle-btn ambient-btn"
            :class="{ active: isAmbientOn }"
            :title="isAmbientOn ? '停止山嵐松風聲' : '聆聽山嵐松風 (自然白噪音)'"
            @click="toggleAmbientSound"
          >
            <span>🍃</span>
          </button>
        </div>

        <!-- 獨立分隔線 -->
        <div class="nav-auth-divider"></div>

        <!-- 使用者身分與登入 (RBAC) 移至最右側 -->
        <button
          class="btn-user-auth"
          :class="currentUser ? 'btn-pill-auth-active' : 'btn-pill-auth-guest'"
          :title="currentUser ? `目前身分: ${currentUser.name} (${currentUser.roleTitle || currentUser.role}) - 點擊切換或管理權限` : '登入 / 切換使用者與檢視前後台權限'"
          @click="$emit('open-auth')"
        >
          <span class="user-avatar-tag">{{ currentUser?.avatar || '👤' }}</span>
          <span class="user-name-tag">{{ currentUser ? currentUser.name : '登入' }}</span>
          <span v-if="currentUser" class="user-role-pill">{{ currentUser.roleTitle || currentUser.role }}</span>
        </button>

        <!-- 行動裝置 / 平板漢堡選單開關按鈕 (<= 992px 顯示) -->
        <button
          class="mobile-menu-toggle-btn"
          :class="{ active: isMobileMenuOpen }"
          title="開啟行動導覽選單"
          @click="toggleMobileMenu"
        >
          <span v-if="!isMobileMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>

    <!-- 行動裝置下拉導航抽屜 (Mobile Nav Drawer) -->
    <transition name="mobile-drawer-slide">
      <div v-if="isMobileMenuOpen" class="mobile-nav-drawer">
        <!-- 抽屜內頂部搜尋 -->
        <div class="mobile-drawer-search" @click="$emit('open-cmd')">
          <span class="nav-search-icon">🔍</span>
          <input
            type="text"
            class="mobile-search-input"
            placeholder="搜尋藥材、學名、經絡、功效..."
            :value="searchQuery"
            @input="onSearchInput"
            @click.stop
          />
        </div>

        <!-- 核心 7 大分頁導覽清單 -->
        <div class="mobile-tabs-grid">
          <button
            class="mobile-tab-card"
            :class="{ active: activeTab === 'home' }"
            @click="handleMobileTabSwitch('home')"
          >
            <span class="m-tab-icon">🏡</span>
            <div class="m-tab-info">
              <span class="m-tab-title">首頁</span>
              <span class="m-tab-desc">島嶼風土與二十四節氣時序</span>
            </div>
          </button>

          <button
            class="mobile-tab-card"
            :class="{ active: activeTab === 'catalog' }"
            @click="handleMobileTabSwitch('catalog')"
          >
            <span class="m-tab-icon">🌿</span>
            <div class="m-tab-info">
              <span class="m-tab-title">本草知識庫</span>
              <span class="m-tab-desc">全島本草植物百科與多維檢索</span>
            </div>
          </button>

          <button
            class="mobile-tab-card"
            :class="{ active: activeTab === 'alchemy' }"
            @click="handleMobileTabSwitch('alchemy')"
          >
            <span class="m-tab-icon">🧪</span>
            <div class="m-tab-info">
              <span class="m-tab-title">方劑實驗室</span>
              <span class="m-tab-desc">角色名方與 AI 神來一配調和</span>
            </div>
          </button>

          <button
            class="mobile-tab-card"
            :class="{ active: activeTab === 'shops' }"
            @click="handleMobileTabSwitch('shops')"
          >
            <span class="m-tab-icon">🏪</span>
            <div class="m-tab-info">
              <span class="m-tab-title">結盟青草店</span>
              <span class="m-tab-desc">全臺結盟青草老舖地圖與採買指南</span>
            </div>
          </button>

          <button
            class="mobile-tab-card"
            :class="{ active: activeTab === 'books' }"
            @click="handleMobileTabSwitch('books')"
          >
            <span class="m-tab-icon">📚</span>
            <div class="m-tab-info">
              <span class="m-tab-title">草木書閣</span>
              <span class="m-tab-desc">線上購書與沈浸式線上試閱</span>
            </div>
          </button>

          <button
            class="mobile-tab-card"
            :class="{ active: activeTab === 'diet' }"
            @click="handleMobileTabSwitch('diet')"
          >
            <span class="m-tab-icon">🍲</span>
            <div class="m-tab-info">
              <span class="m-tab-title">藥膳食療</span>
              <span class="m-tab-desc">《藥膳學》食材名方與名師 RAG 問答</span>
            </div>
          </button>

          <button
            class="mobile-tab-card"
            :class="{ active: activeTab === 'consult' }"
            @click="handleMobileTabSwitch('consult')"
          >
            <span class="m-tab-icon">🍵</span>
            <div class="m-tab-info">
              <span class="m-tab-title">諮詢茶堂</span>
              <span class="m-tab-desc">請益本草耆老 RAG 語意問答</span>
            </div>
          </button>

          <button
            class="mobile-tab-card"
            :class="{ active: activeTab === 'admin' }"
            @click="handleMobileTabSwitch('admin')"
          >
            <span class="m-tab-icon">⚙️</span>
            <div class="m-tab-info">
              <span class="m-tab-title">管理後台</span>
              <span class="m-tab-desc">典藏維護、RBAC 與 LLM 引擎</span>
            </div>
          </button>
        </div>

        <!-- 快捷功能區塊 -->
        <div class="mobile-drawer-footer">
          <div class="mobile-quick-actions">
            <button class="mobile-action-pill" @click="handleMobileAction('random-pick')">
              <span>🍂</span>
              <span>節令推薦（當令二十四節氣本草）</span>
            </button>
            <button class="mobile-action-pill" @click="handleMobileAction('open-compare')">
              <span>⚖️</span>
              <span>藥材對照比對 ({{ compareList.length }})</span>
            </button>
            <button class="mobile-action-pill" @click="handleMobileAction('open-manual')">
              <span>📖</span>
              <span>使用者操作說明手冊</span>
            </button>
            <button class="mobile-action-pill" @click="handleMobileAction('open-disclaimer')">
              <span>📜</span>
              <span>非醫療免責聲明</span>
            </button>
            <button v-if="isSuperAdmin" class="mobile-action-pill" @click="handleMobileAction('open-health')">
              <span>🟢</span>
              <span>系統節點狀態監控</span>
            </button>
          </div>

          <!-- 使用者身分卡片 (行動端快捷操作) -->
          <div class="mobile-user-card" @click="handleMobileAction('open-auth')">
            <div class="m-user-left">
              <span class="m-user-avatar">{{ currentUser?.avatar || '👤' }}</span>
              <div>
                <div class="m-user-name">{{ currentUser ? currentUser.name : '登入 / 身分切換' }}</div>
                <div class="m-user-role">{{ currentUser ? (currentUser.roleTitle || currentUser.role) : '點擊切換角色或登入管理' }}</div>
              </div>
            </div>
            <span class="m-user-arrow">➔</span>
          </div>

          <!-- 主題與聲景控制 (行動端專用面板) -->
          <div class="mobile-theme-audio-box">
            <div class="m-box-title">🎨 東方美學主題與草木聲景</div>
            <div class="m-theme-options">
              <button
                class="m-theme-btn"
                :class="{ active: currentTheme === 'parchment' }"
                @click="setTheme('parchment')"
              >
                <span class="m-theme-dot" style="background: #d4a373;"></span>
                <span>宣紙米黃</span>
              </button>
              <button
                class="m-theme-btn"
                :class="{ active: currentTheme === 'bamboo' }"
                @click="setTheme('bamboo')"
              >
                <span class="m-theme-dot" style="background: #2d6a4f;"></span>
                <span>晨曦竹林</span>
              </button>
              <button
                class="m-theme-btn"
                :class="{ active: currentTheme === 'midnight' }"
                @click="setTheme('midnight')"
              >
                <span class="m-theme-dot" style="background: #111827;"></span>
                <span>暮夜玄青</span>
              </button>
            </div>
            <div class="m-audio-options">
              <button class="m-audio-btn" :class="{ active: !isMuted }" @click="toggleAudio">
                <span>{{ isMuted ? '🔇' : '🔔' }}</span>
                <span>{{ isMuted ? '音效：靜音' : '音效：已開' }}</span>
              </button>
              <button class="m-audio-btn" :class="{ active: isAmbientOn }" @click="toggleAmbientSound">
                <span>🍃</span>
                <span>{{ isAmbientOn ? '松風：播放中' : '松風：暫停' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { audio } from '../services/audioService';

const props = defineProps({
  searchQuery: { type: String, default: '' },
  compareList: { type: Array, default: () => [] },
  healthInfo: { type: Object, default: null },
  currentTheme: { type: String, default: 'parchment' },
  activeTab: { type: String, default: 'home' },
  currentUser: { type: Object, default: null }
});

const emit = defineEmits([
  'update:searchQuery',
  'go-home',
  'random-pick',
  'open-compare',
  'open-health',
  'open-cmd',
  'open-disclaimer',
  'open-manual',
  'change-theme',
  'switch-tab',
  'open-auth'
]);

// 系統管理使用者權限判斷（只有超級管理員或管理員能看見 Failover 與系統監控按鈕）
const isSuperAdmin = computed(() => {
  if (!props.currentUser) return false;
  const role = props.currentUser.role;
  return role === 'super_admin' || role === 'admin';
});

const isMuted = ref(audio.isMuted);
const isAmbientOn = ref(audio.isAmbientPlaying);
const isMobileMenuOpen = ref(false);

let debounceTimer = null;

const onSearchInput = (e) => {
  const value = e.target.value;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    emit('update:searchQuery', value);
  }, 250);
};

const clearSearch = () => {
  audio.playClick();
  emit('update:searchQuery', '');
};

const setTheme = (theme) => {
  audio.playClick();
  emit('change-theme', theme);
};

const toggleAudio = () => {
  isMuted.value = audio.toggleMute();
  if (!isMuted.value) {
    audio.playChime(660);
  }
};

const toggleAmbientSound = () => {
  isAmbientOn.value = audio.toggleAmbient();
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  audio.playClick();
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleMobileTabSwitch = (tab) => {
  emit('switch-tab', tab);
  closeMobileMenu();
};

const handleMobileAction = (actionEvent) => {
  emit(actionEvent);
  closeMobileMenu();
};
</script>

<style scoped>
/* 頂部導覽列佈局容器 */
.top-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.navbar-inner {
  max-width: 1440px; /* 自動對齊全站 1440px 主流容器，避免 1680px 過寬突兀感 */
  margin: 0 auto;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: nowrap;
}

/* 左側群組：品牌 + 核心選單 */
.nav-left-cluster {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.brand-section {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
}

.brand-seal {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  color: #fff;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 900;
  box-shadow: 0 3px 8px rgba(45, 106, 79, 0.25);
  flex-shrink: 0;
}

.brand-text-block {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: var(--font-serif);
  font-size: 16.5px;
  font-weight: 900;
  color: var(--primary-deep);
  letter-spacing: 0.5px;
  line-height: 1.2;
  white-space: nowrap;
}

.brand-subtitle {
  font-size: 9px;
  color: var(--ink-muted);
  letter-spacing: 1px;
  font-weight: 600;
  white-space: nowrap;
}

/* 核心四大頁面導航選單 (橫向排列、絕不直列) */
.nav-tabs-group {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--bg-subtle);
  padding: 3px;
  border-radius: 24px;
  border: 1px solid var(--border-light);
  flex-shrink: 0;
}

.nav-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border-radius: 18px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-body);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  flex-shrink: 0;
  word-break: keep-all;
}

.nav-tab-btn:hover {
  color: var(--primary-deep);
  background: rgba(255, 255, 255, 0.6);
}

.nav-tab-btn.active {
  background: var(--bg-card);
  color: var(--primary-deep);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(45, 90, 39, 0.2);
}

.tab-icon {
  font-size: 14px;
}

.tab-label {
  white-space: nowrap;
  letter-spacing: 0.2px;
}

.label-full {
  display: inline;
}

.label-short {
  display: none;
}

/* 中間：自適應模糊搜尋欄 */
.nav-search-container {
  flex: 1;
  min-width: 140px;
  max-width: 280px;
  position: relative;
  cursor: pointer;
}

.nav-search-input {
  width: 100%;
  padding: 7px 12px 7px 34px;
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  font-size: 13px;
  color: var(--ink-heavy);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-search-input:focus {
  outline: none;
  background: #ffffff;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.15);
}

.nav-search-icon {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ink-muted);
  pointer-events: none;
  font-size: 13.5px;
}

.nav-search-actions {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-search-clear {
  color: var(--ink-muted);
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
}

.nav-search-clear:hover {
  color: var(--ink-heavy);
}

.nav-kbd-hint {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  padding: 1px 4px;
  font-size: 10px;
  color: var(--ink-muted);
  cursor: pointer;
}

/* 右側群組：功能工具與身分 */
.nav-right-cluster {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* 導覽列通用按鈕標籤 (保證橫排、絕不直列) */
.nav-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 500;
  background: var(--bg-subtle);
  color: var(--ink-body);
  border: 1px solid var(--border-light);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  word-break: keep-all;
}

.nav-tool-btn:hover:not(:disabled) {
  background: #ffffff;
  border-color: var(--primary);
  color: var(--primary);
}

.nav-tool-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tool-btn-text-full {
  display: inline;
}

.tool-btn-text-short {
  display: none;
}

.btn-pill-accent {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.btn-pill-accent:hover {
  background: var(--primary-deep);
  color: #fff;
  border-color: var(--primary-deep);
}

/* 系統狀態徽章 (僅超級管理員可見) */
.health-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  word-break: keep-all;
}

.health-status-badge:hover {
  background: #d1fae5;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2);
}

.health-badge-label {
  white-space: nowrap;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

/* 主題與聲景膠囊 */
.nav-ambient-capsule {
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--bg-subtle);
  padding: 3px 7px;
  border-radius: 20px;
  border: 1px solid var(--border-light);
  flex-shrink: 0;
}

.theme-switcher-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.theme-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
  flex-shrink: 0;
}

.theme-dot:hover {
  transform: scale(1.15);
}

.theme-dot.active {
  border-color: var(--primary-deep);
  transform: scale(1.2);
}

.parchment-dot { background: #d4a373; }
.bamboo-dot { background: #2d6a4f; }
.midnight-dot { background: #111827; }

.audio-toggle-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: var(--bg-parchment);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.audio-toggle-btn.active {
  background: var(--primary-pale);
  border-color: var(--primary);
}

.ambient-btn.active {
  background: #fef3c7;
  border-color: #f59e0b;
}

/* 使用者登入與身分按鈕 */
.btn-user-auth {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  flex-shrink: 0;
  word-break: keep-all;
  border: 1px solid var(--border-light);
  background: var(--bg-subtle);
  color: var(--ink-heavy);
}

.btn-pill-auth-active {
  background: var(--bg-card);
  border-color: var(--primary);
  color: var(--primary-deep);
  box-shadow: 0 2px 6px rgba(45, 90, 39, 0.12);
}

.user-avatar-tag {
  font-size: 13.5px;
  line-height: 1;
}

.user-name-tag {
  font-size: 12.5px;
  max-width: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role-pill {
  font-size: 9.5px;
  padding: 1px 5px;
  border-radius: 8px;
  background: rgba(45, 90, 39, 0.12);
  color: var(--primary-deep);
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.nav-auth-divider {
  width: 1px;
  height: 18px;
  background: var(--border-light);
  margin: 0 2px;
  flex-shrink: 0;
}

.compare-badge-num {
  background: var(--primary-deep);
  color: #fff;
  border-radius: 10px;
  padding: 1px 5px;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.2;
}

.btn-tool-active {
  background: var(--primary-pale) !important;
  border-color: var(--primary) !important;
  color: var(--primary-deep) !important;
  font-weight: 600;
}

/* 行動裝置漢堡開關鈕 */
.mobile-menu-toggle-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: var(--primary-deep);
  font-size: 17px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.mobile-menu-toggle-btn:hover,
.mobile-menu-toggle-btn.active {
  background: var(--primary-pale);
  border-color: var(--primary);
  color: var(--primary-deep);
}

/* 行動導航抽屜容器 */
.mobile-nav-drawer {
  background: var(--bg-card);
  border-top: 1px solid var(--border-light);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  padding: 16px 18px 24px;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-drawer-search {
  position: relative;
  margin-bottom: 14px;
}

.mobile-search-input {
  width: 100%;
  padding: 9px 14px 9px 36px;
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  font-size: 13.5px;
  color: var(--ink-heavy);
  outline: none;
}

.mobile-tabs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
  margin-bottom: 18px;
}

.mobile-tab-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 12px;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-tab-card:hover {
  background: #ffffff;
  border-color: var(--primary);
  transform: translateY(-1px);
}

.mobile-tab-card.active {
  background: var(--primary-pale);
  border-color: var(--primary);
  box-shadow: 0 3px 10px rgba(45, 90, 39, 0.1);
}

.m-tab-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.m-tab-info {
  display: flex;
  flex-direction: column;
}

.m-tab-title {
  font-weight: 700;
  font-size: 14px;
  color: var(--primary-deep);
}

.m-tab-desc {
  font-size: 11.5px;
  color: var(--ink-muted);
  margin-top: 1px;
}

.mobile-drawer-footer {
  border-top: 1px dashed var(--border-light);
  padding-top: 14px;
}

.mobile-quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mobile-action-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: var(--ink-body);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-action-pill:hover {
  background: #ffffff;
  color: var(--primary-deep);
  border-color: var(--primary);
}

/* 行動端抽屜使用者卡片 */
.mobile-user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  margin-top: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-user-card:hover {
  border-color: var(--primary);
  background: #ffffff;
}

.m-user-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.m-user-avatar {
  font-size: 22px;
}

.m-user-name {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--primary-deep);
}

.m-user-role {
  font-size: 11px;
  color: var(--ink-muted);
}

.m-user-arrow {
  color: var(--primary);
  font-size: 14px;
  font-weight: 700;
}

/* 行動端抽屜美學主題與聲景區塊 */
.mobile-theme-audio-box {
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 12px 14px;
  margin-top: 12px;
}

.m-box-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-heavy);
  margin-bottom: 8px;
}

.m-theme-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 8px;
}

.m-theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 7px 4px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink-body);
  cursor: pointer;
  transition: all 0.2s ease;
}

.m-theme-btn.active {
  border-color: var(--primary-deep);
  background: var(--primary-pale);
  color: var(--primary-deep);
  font-weight: 700;
}

.m-theme-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

.m-audio-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.m-audio-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 8px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  font-size: 11px;
  font-weight: 600;
  color: var(--ink-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.m-audio-btn.active {
  border-color: var(--primary);
  background: var(--primary-pale);
  color: var(--primary-deep);
}

/* 抽屜過渡動畫 */
.mobile-drawer-slide-enter-active,
.mobile-drawer-slide-leave-active {
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-drawer-slide-enter-from,
.mobile-drawer-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ======================================================== */
/* 🌟 主流解析度分級響應式自適應 (Responsive Breakpoints) */
/* ======================================================== */

/* 1. 1366px ~ 1440px (主流筆電、1080p 125% 縮放視窗)：精簡副標題與字距，完美無溢位 */
@media (max-width: 1440px) {
  .brand-subtitle {
    display: none;
  }
  .navbar-inner {
    padding: 7px 14px;
    gap: 10px;
  }
  .label-full {
    display: none;
  }
  .label-short {
    display: inline;
  }
  .nav-tab-btn {
    padding: 5px 8px;
    font-size: 12.5px;
  }
  .nav-search-container {
    max-width: 200px;
    min-width: 130px;
  }
  .tool-btn-text-full {
    display: none;
  }
  .tool-btn-text-short {
    display: inline;
  }
}

/* 2. 1100px ~ 1240px (小型筆電、iPad 橫向)：圖示化次要工具按鈕，全單行無捲軸 */
@media (max-width: 1240px) {
  .nav-left-cluster {
    gap: 8px;
  }
  .nav-tabs-group {
    gap: 2px;
    padding: 2px;
  }
  .nav-tab-btn {
    padding: 4px 7px;
    font-size: 12px;
    gap: 3px;
  }
  .nav-search-container {
    max-width: 160px;
    min-width: 110px;
  }
  .health-badge-label {
    display: none;
  }
  .health-status-badge {
    padding: 5px 7px;
  }
  .tool-btn-text-short,
  .tool-btn-text {
    display: none;
  }
  .btn-pill-accent .tool-btn-text-short {
    display: inline !important;
  }
  .nav-tool-btn {
    padding: 5px 8px;
  }
}

/* 3. 992px ~ 1100px：緊湊平板模式，依然單行整齊 */
@media (max-width: 1100px) {
  .nav-search-container {
    max-width: 130px;
    min-width: 90px;
  }
  .nav-search-input {
    font-size: 12px;
    padding-left: 28px;
  }
  .nav-search-icon {
    left: 8px;
    font-size: 12px;
  }
  .nav-kbd-hint {
    display: none;
  }
}

/* 4. <= 992px (平板直向、手機觸控端)：切換為優雅精巧 Header + 行動選單抽屜 */
@media (max-width: 992px) {
  .top-navbar {
    overflow-x: visible;
  }
  .nav-tabs-group {
    display: none;
  }
  .nav-search-container {
    display: none;
  }
  .nav-tool-btn {
    display: none;
  }
  .health-status-badge {
    display: none;
  }
  .mobile-menu-toggle-btn {
    display: inline-flex;
  }
}

/* 5. <= 540px (iPhone 等各款智慧型手機)：極致簡約且保證 0 擠壓與 0 橫向滾動 */
@media (max-width: 540px) {
  .top-navbar {
    padding-top: env(safe-area-inset-top, 0px);
  }
  .navbar-inner {
    padding: 6px 12px;
  }
  .brand-section {
    gap: 8px;
  }
  .brand-title {
    font-size: 15px;
  }
  .brand-seal {
    width: 32px;
    height: 32px;
    font-size: 17px;
  }
  /* 手機頂部僅保留頭像、鈴聲開關與漢堡選單，完整主題與聲景直接在抽屜內自如操作 */
  .theme-switcher-group,
  .ambient-btn {
    display: none;
  }
  .nav-ambient-capsule {
    padding: 2px 4px;
    background: transparent;
    border: none;
  }
  .user-name-tag,
  .user-role-pill {
    display: none;
  }
  .btn-user-auth {
    padding: 4px;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    justify-content: center;
  }
  .nav-auth-divider {
    display: none;
  }
  .mobile-tabs-grid {
    grid-template-columns: 1fr;
  }
  .mobile-nav-drawer {
    padding-bottom: calc(28px + env(safe-area-inset-bottom, 0px));
  }
}

/* 6. <= 390px (iPhone SE, iPhone 12/13 mini 等小螢幕手機) */
@media (max-width: 390px) {
  .brand-title {
    font-size: 14.5px;
  }
  .navbar-inner {
    padding: 6px 10px;
    gap: 6px;
  }
  .nav-right-cluster {
    gap: 5px;
  }
}
</style>
