<template>
  <header class="top-navbar">
    <div class="navbar-inner">
      <!-- 品牌標誌 -->
      <div class="brand-section" @click="$emit('go-home')">
        <div class="brand-seal">本</div>
        <div>
          <div class="brand-title">台灣本草植物誌</div>
          <div class="brand-subtitle">TAIWAN HERB WIKI ‧ 傳統風土與現代植物學</div>
        </div>
      </div>

      <!-- 即時模糊搜尋欄 (點擊或 Ctrl+K 喚醒命令盤) -->
      <div class="nav-search-container" @click="$emit('open-cmd')">
        <span class="nav-search-icon">🔍</span>
        <input
          type="text"
          class="nav-search-input"
          placeholder="搜尋藥材、學名、經絡、功效 (按 Ctrl+K 快捷導覽)..."
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

      <!-- 右側動作列 -->
      <div class="nav-actions">
        <!-- 主題切換按鈕 (宣紙 / 竹林 / 暮夜) -->
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

        <!-- 聲音切換按鈕 -->
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

        <!-- 系統狀態徽章 -->
        <button
          class="health-status-badge"
          :title="'伺服器狀態: ' + (healthInfo?.database?.modeDescription || '連線中')"
          @click="$emit('open-health')"
        >
          <span class="pulse-dot"></span>
          <span>{{ healthInfo?.database?.isMemoryMode ? '正常 (Memory)' : `正常 (${healthInfo?.database?.activeNode})` }}</span>
        </button>

        <!-- 諮詢茶堂 (RAG 專家問答) -->
        <button
          class="btn-pill"
          :class="activeTab === 'consult' ? 'btn-pill-primary' : 'btn-pill-subtle'"
          title="請益本草名醫與風土達人 (RAG 語意問答)"
          @click="$emit('switch-tab', 'consult')"
        >
          <span>🍵</span>
          <span>諮詢茶堂</span>
        </button>

        <!-- 管理後台模式 -->
        <button
          class="btn-pill"
          :class="activeTab === 'admin' ? 'btn-pill-primary' : 'btn-pill-subtle'"
          title="進入本草典藏後台與數據中心"
          @click="$emit('switch-tab', 'admin')"
        >
          <span>⚙️</span>
          <span>管理後台</span>
        </button>

        <!-- 隨機推薦藥材 -->
        <button class="btn-pill btn-pill-primary" @click="$emit('random-pick')">
          <span>✨</span>
          <span>今日推薦</span>
        </button>

        <!-- 藥材對照比對 -->
        <button
          class="btn-pill btn-pill-subtle"
          :disabled="compareList.length === 0"
          @click="$emit('open-compare')"
        >
          <span>⚖️</span>
          <span>比對 ({{ compareList.length }})</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { audio } from '../services/audioService';

const props = defineProps({
  searchQuery: { type: String, default: '' },
  compareList: { type: Array, default: () => [] },
  healthInfo: { type: Object, default: null },
  currentTheme: { type: String, default: 'parchment' },
  activeTab: { type: String, default: 'catalog' }
});

const emit = defineEmits([
  'update:searchQuery',
  'go-home',
  'random-pick',
  'open-compare',
  'open-health',
  'open-cmd',
  'change-theme',
  'switch-tab'
]);

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
.nav-search-actions {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-kbd-hint {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 1px 6px;
  font-size: 11px;
  color: var(--ink-muted);
  cursor: pointer;
}

.theme-switcher-group {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--bg-parchment);
  padding: 4px 8px;
  border-radius: 20px;
  border: 1px solid var(--border-light);
}

.theme-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: var(--bg-parchment);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.audio-toggle-btn.active {
  background: var(--primary-pale);
  border-color: var(--primary);
  box-shadow: 0 0 8px rgba(45, 106, 79, 0.3);
}

.ambient-btn.active {
  background: #fef3c7;
  border-color: #f59e0b;
}
</style>
