<template>
  <aside class="sidebar">
    <div class="sidebar-title">
      <span>🌿 藥材知識導覽</span>
      <button
        v-if="hasActiveFilter"
        class="sidebar-reset-btn"
        @click="$emit('reset-filters')"
      >
        清除篩選
      </button>
    </div>

    <!-- 藥材分類 -->
    <div class="filter-group">
      <div class="filter-heading">
        <span>📁</span>
        <span>功效與分類</span>
      </div>
      <div class="category-list">
        <div
          class="category-item"
          :class="{ active: currentCategory === '全部' }"
          @click="$emit('select-category', '全部')"
        >
          <span>全部藥材</span>
          <span class="category-count">{{ totalHerbsCount }}</span>
        </div>
        <div
          v-for="cat in categories"
          :key="cat.name"
          class="category-item"
          :class="{ active: currentCategory === cat.name }"
          @click="$emit('select-category', cat.name)"
        >
          <span>{{ cat.name }}</span>
          <span class="category-count">{{ cat.count }}</span>
        </div>
      </div>
    </div>

    <!-- 藥性四氣 (寒/涼/平/溫/熱) -->
    <div class="filter-group">
      <div class="filter-heading">
        <span>❄️🔥</span>
        <span>藥性 (四氣)</span>
      </div>
      <div class="chip-cloud">
        <button
          class="filter-chip"
          :class="{ active: currentNature === '全部' }"
          @click="$emit('select-nature', '全部')"
        >
          全部
        </button>
        <button
          v-for="nat in natures"
          :key="nat.name"
          class="filter-chip"
          :class="{ active: currentNature === nat.name }"
          @click="$emit('select-nature', nat.name)"
        >
          {{ nat.name }} ({{ nat.count }})
        </button>
      </div>
    </div>

    <!-- 歸經 (十二經脈臟腑) -->
    <div class="filter-group">
      <div class="filter-heading">
        <span>🫀</span>
        <span>歸經 (臟腑經絡)</span>
      </div>
      <div class="chip-cloud">
        <button
          class="filter-chip"
          :class="{ active: currentChannel === '全部' }"
          @click="$emit('select-channel', '全部')"
        >
          全部
        </button>
        <button
          v-for="ch in channels"
          :key="ch.name"
          class="filter-chip"
          :class="{ active: currentChannel === ch.name }"
          @click="$emit('select-channel', ch.name)"
        >
          {{ ch.name }}經 ({{ ch.count }})
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  categories: { type: Array, default: () => [] },
  channels: { type: Array, default: () => [] },
  natures: { type: Array, default: () => [] },
  currentCategory: { type: String, default: '全部' },
  currentChannel: { type: String, default: '全部' },
  currentNature: { type: String, default: '全部' },
  totalHerbsCount: { type: Number, default: 0 }
});

defineEmits(['select-category', 'select-channel', 'select-nature', 'reset-filters']);

const hasActiveFilter = computed(() => {
  return props.currentCategory !== '全部' || props.currentChannel !== '全部' || props.currentNature !== '全部';
});
</script>
