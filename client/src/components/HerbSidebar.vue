<template>
  <aside class="sidebar">
    <div class="sidebar-title">
      <span>🌿 台灣本草多維檢索</span>
      <button
        v-if="hasActiveFilter"
        class="sidebar-reset-btn"
        @click="$emit('reset-filters')"
      >
        清除篩選
      </button>
    </div>

    <!-- 風土產區 (Regions) -->
    <div class="filter-group">
      <div class="filter-heading">
        <span>🏞️</span>
        <span>風土產區分佈</span>
      </div>
      <div class="chip-cloud">
        <button
          class="filter-chip"
          :class="{ active: currentRegion === '全部' }"
          @click="$emit('select-region', '全部')"
        >
          全島
        </button>
        <button
          v-for="reg in regions"
          :key="reg.name"
          class="filter-chip"
          :class="{ active: currentRegion === reg.name }"
          @click="$emit('select-region', reg.name)"
        >
          {{ reg.name.split(' ')[0] }} ({{ reg.count }})
        </button>
      </div>
    </div>

    <!-- 民間生活情境 (Folk Applications) -->
    <div class="filter-group">
      <div class="filter-heading">
        <span>🍵</span>
        <span>民間生活情境</span>
      </div>
      <div class="category-list">
        <div
          class="category-item"
          :class="{ active: currentFolkApp === '全部' }"
          @click="$emit('select-folk-app', '全部')"
        >
          <span>全部情境</span>
          <span class="category-count">{{ totalHerbsCount }}</span>
        </div>
        <div
          v-for="folk in folkApplications"
          :key="folk.name"
          class="category-item"
          :class="{ active: currentFolkApp === folk.name }"
          @click="$emit('select-folk-app', folk.name)"
        >
          <span>{{ folk.name }}</span>
          <span class="category-count">{{ folk.count }}</span>
        </div>
      </div>
    </div>

    <!-- 藥材分類 (功效分類) -->
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
          <span>全部分類</span>
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

    <!-- 安全用藥分級 (Safety Levels) -->
    <div class="filter-group">
      <div class="filter-heading">
        <span>🛡️</span>
        <span>安全等級</span>
      </div>
      <div class="chip-cloud">
        <button
          class="filter-chip"
          :class="{ active: currentSafetyLevel === '全部' }"
          @click="$emit('select-safety-level', '全部')"
        >
          全部
        </button>
        <button
          v-for="lvl in safetyLevels"
          :key="lvl.name"
          class="filter-chip"
          :class="{ active: currentSafetyLevel === lvl.name }"
          @click="$emit('select-safety-level', lvl.name)"
        >
          {{ lvl.name }} ({{ lvl.count }})
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
  regions: { type: Array, default: () => [] },
  folkApplications: { type: Array, default: () => [] },
  safetyLevels: { type: Array, default: () => [] },
  currentCategory: { type: String, default: '全部' },
  currentChannel: { type: String, default: '全部' },
  currentNature: { type: String, default: '全部' },
  currentRegion: { type: String, default: '全部' },
  currentFolkApp: { type: String, default: '全部' },
  currentSafetyLevel: { type: String, default: '全部' },
  totalHerbsCount: { type: Number, default: 0 }
});

defineEmits([
  'select-category',
  'select-channel',
  'select-nature',
  'select-region',
  'select-folk-app',
  'select-safety-level',
  'reset-filters'
]);

const hasActiveFilter = computed(() => {
  return (
    props.currentCategory !== '全部' ||
    props.currentChannel !== '全部' ||
    props.currentNature !== '全部' ||
    props.currentRegion !== '全部' ||
    props.currentFolkApp !== '全部' ||
    props.currentSafetyLevel !== '全部'
  );
});
</script>
