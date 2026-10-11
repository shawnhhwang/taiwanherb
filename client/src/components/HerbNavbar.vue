<template>
  <header class="top-navbar">
    <div class="navbar-inner">
      <!-- 左側群組：品牌標誌 + 核心導覽標籤 -->
      <div class="nav-left-cluster">
        <div class="brand-section" @click="$emit('switch-tab', 'home')" title="返回台灣本草植物誌首頁">
          <div class="brand-seal">本</div>
          <div class="brand-text-block">
            <div class="brand-title">台灣本草植物誌</div>
            <div class="brand-subtitle">TAIWAN HERB WIKI</div>
          </div>
        </div>

        <!-- 核心四大頁面導航 -->
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
            <span class="tab-label">本草知識庫</span>
          </button>

          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'consult' }"
            title="請益本草耆老與風土達人 (RAG 語意問答)"
            @click="$emit('switch-tab', 'consult')"
          >
            <span class="tab-icon">🍵</span>
            <span class="tab-label">諮詢茶堂</span>
          </button>

          <button
            class="nav-tab-btn"
            :class="{ active: activeTab === 'admin' }"
            title="進入本草典藏後台與數據中心"
            @click="$emit('switch-tab', 'admin')"
          >
            <span class="tab-icon">⚙️</span>
            <span class="tab-label">管理後台</span>
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

        <!-- 隨機推薦藥材 -->
        <button class="nav-tool-btn btn-pill-accent" title="隨機推薦今日精選本草" @click="$emit('random-pick')">
          <span>✨</span>
          <span>今日推薦</span>
        </button>

        <!-- 藥材對照比對 -->
        <button
          class="nav-tool-btn"
          :class="{ 'has-badge': compareList.length > 0 }"
          :disabled="compareList.length === 0"
          title="開啟藥材比對清單"
          @click="$emit('open-compare')"
        >
          <span>⚖️</span>
          <span>比對 ({{ compareList.length }})</span>
        </button>

        <!-- 免責聲明 -->
        <button
          class="nav-tool-btn"
          title="閱讀民間知識分享與非醫療宣告"
          @click="$emit('open-disclaimer')"
        >
          <span>📜</span>
          <span>免責聲明</span>
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

        <!-- 使用者身分與登入 (RBAC) -->
        <button
          class="btn-user-auth"
          :class="currentUser ? 'btn-pill-auth-active' : 'btn-pill-subtle'"
          :title="currentUser ? `目前身分: ${currentUser.name} (${currentUser.roleTitle || currentUser.role}) - 點擊切換或管理權限` : '登入 / 切換使用者與檢視前後台權限'"
          @click="$emit('open-auth')"
        >
          <span class="user-avatar-tag">{{ currentUser?.avatar || '👤' }}</span>
          <span class="user-name-tag">{{ currentUser ? currentUser.name : '登入 / 身分' }}</span>
          <span v-if="currentUser" class="user-role-pill">{{ currentUser.roleTitle || currentUser.role }}</span>
        </button>
      </div>
    </div>
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
  max-width: 1680px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: nowrap;
}

/* 左側群組：品牌 + 核心選單 */
.nav-left-cluster {
  display: flex;
  align-items: center;
  gap: 18px;
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
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  color: #fff;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
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
  font-size: 17px;
  font-weight: 900;
  color: var(--primary-deep);
  letter-spacing: 0.5px;
  line-height: 1.2;
  white-space: nowrap;
}

.brand-subtitle {
  font-size: 9.5px;
  color: var(--ink-muted);
  letter-spacing: 1px;
  font-weight: 600;
  white-space: nowrap;
}

/* 核心四大頁面導航選單 (橫向排列、絕不直列) */
.nav-tabs-group {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--bg-subtle);
  padding: 4px;
  border-radius: 24px;
  border: 1px solid var(--border-light);
  flex-shrink: 0;
}

.nav-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 13px;
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

/* 中間：自適應模糊搜尋欄 */
.nav-search-container {
  flex: 1;
  min-width: 180px;
  max-width: 360px;
  position: relative;
  cursor: pointer;
}

.nav-search-input {
  width: 100%;
  padding: 8px 14px 8px 38px;
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  font-size: 13.5px;
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
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ink-muted);
  pointer-events: none;
  font-size: 14px;
}

.nav-search-actions {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
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
  padding: 1px 5px;
  font-size: 11px;
  color: var(--ink-muted);
  cursor: pointer;
}

/* 右側群組：功能工具與身分 */
.nav-right-cluster {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

/* 導覽列通用按鈕標籤 (保證橫排、絕不直列) */
.nav-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
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
  gap: 6px;
  padding: 5px 11px;
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
  width: 8px;
  height: 8px;
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
  gap: 6px;
  background: var(--bg-subtle);
  padding: 3px 8px;
  border-radius: 20px;
  border: 1px solid var(--border-light);
  flex-shrink: 0;
}

.theme-switcher-group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.theme-dot {
  width: 14px;
  height: 14px;
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
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: var(--bg-parchment);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
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
  gap: 6px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 13px;
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
  font-size: 14px;
  line-height: 1;
}

.user-name-tag {
  font-size: 13px;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role-pill {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 8px;
  background: rgba(45, 90, 39, 0.12);
  color: var(--primary-deep);
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

/* 響應式優化：避免任何小螢幕時文字變直 */
@media (max-width: 1200px) {
  .brand-subtitle {
    display: none;
  }
  .nav-search-container {
    max-width: 240px;
  }
}

@media (max-width: 992px) {
  .top-navbar {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
