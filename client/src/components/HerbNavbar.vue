<template>
  <header class="top-navbar">
    <div class="navbar-inner">
      <!-- 品牌標誌 -->
      <div class="brand-section" @click="$emit('go-home')">
        <div class="brand-seal">本</div>
        <div>
          <div class="brand-title">台灣本草植物誌</div>
          <div class="brand-subtitle">TAIWAN HERB WIKI ‧ 傳統青草與現代植物學</div>
        </div>
      </div>

      <!-- 即時模糊搜尋欄 (防抖 Debounce) -->
      <div class="nav-search-container">
        <span class="nav-search-icon">🔍</span>
        <input
          type="text"
          class="nav-search-input"
          placeholder="搜尋藥材名稱、學名、功效 (如: 咸豐草, 防疫, 退火)..."
          :value="searchQuery"
          @input="onSearchInput"
        />
        <button
          v-if="searchQuery"
          class="nav-search-clear"
          title="清除搜尋"
          @click="clearSearch"
        >
          ✕
        </button>
      </div>

      <!-- 右側動作列 -->
      <div class="nav-actions">
        <!-- 系統狀態徽章 -->
        <button
          class="health-status-badge"
          :title="'伺服器狀態: ' + (healthInfo?.database?.modeDescription || '連線中')"
          @click="$emit('open-health')"
        >
          <span class="pulse-dot"></span>
          <span>API 正常 {{ healthInfo?.database?.isMemoryMode ? '(即開即用)' : `(${healthInfo?.database?.activeNode})` }}</span>
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

const props = defineProps({
  searchQuery: { type: String, default: '' },
  compareList: { type: Array, default: () => [] },
  healthInfo: { type: Object, default: null }
});

const emit = defineEmits(['update:searchQuery', 'go-home', 'random-pick', 'open-compare', 'open-health']);

let debounceTimer = null;

const onSearchInput = (e) => {
  const value = e.target.value;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    emit('update:searchQuery', value);
  }, 250);
};

const clearSearch = () => {
  emit('update:searchQuery', '');
};
</script>
