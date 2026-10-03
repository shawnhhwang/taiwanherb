<template>
  <div v-if="isOpen" class="cmd-palette-backdrop" @click.self="close">
    <div class="cmd-palette-modal">
      <div class="cmd-search-bar">
        <span class="cmd-search-icon">🔍</span>
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          class="cmd-input"
          placeholder="搜尋草藥名、學名、經絡、功效 (支援 ↑↓ 鍵與 Enter 選擇)..."
          @keydown.down.prevent="onArrowDown"
          @keydown.up.prevent="onArrowUp"
          @keydown.enter.prevent="onEnter"
          @keydown.esc="close"
        />
        <kbd class="cmd-kbd">ESC</kbd>
      </div>

      <!-- 快速捷徑與熱門標籤 -->
      <div v-if="!query.trim()" class="cmd-shortcuts-section">
        <div class="cmd-section-title">熱門捷徑探索</div>
        <div class="cmd-shortcuts-row">
          <button
            v-for="sc in shortcuts"
            :key="sc.label"
            class="cmd-shortcut-tag"
            @click="applyShortcut(sc)"
          >
            {{ sc.label }}
          </button>
        </div>
      </div>

      <!-- 搜尋結果清單 -->
      <div class="cmd-results-list">
        <div v-if="filteredResults.length === 0 && query.trim()" class="cmd-no-results">
          未找到與「{{ query }}」相關的本草資料
        </div>

        <div
          v-for="(item, idx) in filteredResults"
          :key="item.id"
          class="cmd-item"
          :class="{ active: selectedIndex === idx }"
          @mouseenter="selectedIndex = idx"
          @click="selectItem(item)"
        >
          <img :src="item.thumbnailUrl" :alt="item.name" class="cmd-item-thumb" />
          <div class="cmd-item-info">
            <div class="cmd-item-name-row">
              <strong class="cmd-item-name">{{ item.name }}</strong>
              <span class="cmd-item-latin">{{ item.scientificName }}</span>
              <span class="cmd-item-badge">{{ item.nature }}性 · {{ item.category }}</span>
            </div>
            <div class="cmd-item-snippet">{{ item.summaryEfficacy || item.efficacy }}</div>
          </div>
          <span class="cmd-enter-hint">↵ 開啟</span>
        </div>
      </div>

      <div class="cmd-footer-bar">
        <span>使用 <kbd>↑</kbd> <kbd>↓</kbd> 瀏覽</span>
        <span><kbd>Enter</kbd> 查看詳情</span>
        <span><kbd>ESC</kbd> 關閉</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { audio } from '../services/audioService';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  herbs: { type: Array, default: () => [] }
});

const emit = defineEmits(['close', 'select-herb', 'filter-category']);

const query = ref('');
const selectedIndex = ref(0);
const inputRef = ref(null);

const shortcuts = [
  { label: '🌿 台灣青草茶經典', type: 'category', value: '台灣青草茶經典' },
  { label: '❄️ 寒涼清熱解毒', type: 'search', value: '清熱解毒' },
  { label: '🫁 宣肺潤燥入肺經', type: 'search', value: '肺' },
  { label: '🔥 溫中散寒理氣', type: 'search', value: '溫' },
  { label: '🍵 萬華青草巷必備', type: 'search', value: '青草' }
];

watch(() => props.isOpen, (open) => {
  if (open) {
    audio.playChime(750);
    query.value = '';
    selectedIndex.value = 0;
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
});

const filteredResults = computed(() => {
  if (!query.value.trim()) return props.herbs.slice(0, 6);
  const q = query.value.trim().toLowerCase();
  return props.herbs.filter(h => {
    return (
      h.name.toLowerCase().includes(q) ||
      (h.scientificName || '').toLowerCase().includes(q) ||
      (h.efficacy || '').toLowerCase().includes(q) ||
      (h.category || '').toLowerCase().includes(q) ||
      (h.channels || []).some(c => c.toLowerCase().includes(q)) ||
      (h.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }).slice(0, 8);
});

const onArrowDown = () => {
  if (filteredResults.value.length === 0) return;
  audio.playClick();
  selectedIndex.value = (selectedIndex.value + 1) % filteredResults.value.length;
};

const onArrowUp = () => {
  if (filteredResults.value.length === 0) return;
  audio.playClick();
  selectedIndex.value = (selectedIndex.value - 1 + filteredResults.value.length) % filteredResults.value.length;
};

const onEnter = () => {
  if (filteredResults.value[selectedIndex.value]) {
    selectItem(filteredResults.value[selectedIndex.value]);
  }
};

const selectItem = (herb) => {
  audio.playChime(660);
  emit('select-herb', herb.id);
  close();
};

const applyShortcut = (sc) => {
  audio.playClick();
  if (sc.type === 'category') {
    emit('filter-category', sc.value);
    close();
  } else {
    query.value = sc.value;
  }
};

const close = () => {
  emit('close');
};
</script>

<style scoped>
.cmd-palette-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(18, 30, 24, 0.7);
  backdrop-filter: blur(8px);
  z-index: 300;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
}

.cmd-palette-modal {
  width: 100%;
  max-width: 680px;
  background: #ffffff;
  border: 1px solid var(--border-light);
  border-radius: 18px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cmd-search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-parchment);
}

.cmd-search-icon {
  font-size: 18px;
  color: var(--ink-muted);
}

.cmd-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--ink-heavy);
  outline: none;
  font-family: var(--font-sans);
}

.cmd-kbd {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 11px;
  color: var(--ink-muted);
  font-family: monospace;
}

.cmd-shortcuts-section {
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-light);
}

.cmd-section-title {
  font-size: 11.5px;
  color: var(--ink-muted);
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.cmd-shortcuts-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cmd-shortcut-tag {
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 12px;
  color: var(--ink-body);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cmd-shortcut-tag:hover {
  background: var(--primary-pale);
  border-color: var(--primary);
  color: var(--primary-deep);
}

.cmd-results-list {
  max-height: 380px;
  overflow-y: auto;
  padding: 8px;
}

.cmd-no-results {
  text-align: center;
  padding: 40px;
  color: var(--ink-muted);
  font-size: 14px;
}

.cmd-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cmd-item:hover,
.cmd-item.active {
  background: var(--primary-pale);
}

.cmd-item-thumb {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.cmd-item-info {
  flex: 1;
  min-width: 0;
}

.cmd-item-name-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.cmd-item-name {
  font-size: 15px;
  color: var(--primary-deep);
}

.cmd-item-latin {
  font-size: 12px;
  font-style: italic;
  color: var(--ink-muted);
}

.cmd-item-badge {
  font-size: 11px;
  background: rgba(0, 0, 0, 0.05);
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--ink-muted);
  margin-left: auto;
}

.cmd-item-snippet {
  font-size: 12px;
  color: var(--ink-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.cmd-enter-hint {
  font-size: 11.5px;
  color: var(--primary);
  font-weight: 700;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.cmd-item.active .cmd-enter-hint {
  opacity: 1;
}

.cmd-footer-bar {
  padding: 10px 20px;
  background: var(--bg-parchment);
  border-top: 1px solid var(--border-light);
  display: flex;
  gap: 16px;
  font-size: 11.5px;
  color: var(--ink-muted);
}
</style>
