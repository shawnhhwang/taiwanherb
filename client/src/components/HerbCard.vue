<template>
  <div class="herb-card" @click="$emit('view-detail', herb.id)">
    <div class="herb-card-img-wrap">
      <img
        :src="herb.thumbnailUrl"
        :alt="herb.name"
        class="herb-card-img"
        loading="lazy"
        @error="onImageError"
      />
      <div class="herb-card-category-badge">{{ herb.category }}</div>
    </div>

    <div class="herb-card-body">
      <div class="herb-card-title-row">
        <h3 class="herb-card-name">{{ herb.name }}</h3>
        <span :class="['badge-nature', natureClass(herb.nature)]">{{ herb.nature }}性</span>
      </div>

      <div class="herb-card-scientific">{{ herb.scientificName }}</div>

      <!-- 歸經與標籤 -->
      <div class="herb-badges-row">
        <span
          v-for="ch in herb.channels"
          :key="ch"
          class="badge-channel"
        >
          歸{{ ch }}
        </span>
        <span
          v-for="t in herb.properties"
          :key="t"
          class="badge-channel"
          style="background: #fbf7ee; border-color: #e2d9c8;"
        >
          {{ t }}
        </span>
      </div>

      <!-- 功效摘要 -->
      <p class="herb-card-efficacy">{{ herb.summaryEfficacy || herb.efficacy }}</p>

      <div class="herb-card-footer" @click.stop>
        <span class="btn-card-action" @click="$emit('view-detail', herb.id)">
          查看本草詳情 ➔
        </span>

        <button
          class="btn-compare-toggle"
          :class="{ active: isComparing }"
          @click="$emit('toggle-compare', herb)"
        >
          {{ isComparing ? '已加入比對 ✓' : '+ 加入比對' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  herb: { type: Object, required: true },
  isComparing: { type: Boolean, default: false }
});

defineEmits(['view-detail', 'toggle-compare']);

const natureClass = (nature) => {
  switch (nature) {
    case '大寒':
    case '寒':
    case '微寒':
      return 'nature-cold';
    case '涼':
      return 'nature-cool';
    case '平':
      return 'nature-neutral';
    case '微溫':
    case '溫':
      return 'nature-warm';
    case '熱':
    case '大熱':
      return 'nature-hot';
    default:
      return 'nature-neutral';
  }
};

const onImageError = (e) => {
  // 圖片載入失敗時的安全後備圖案
  e.target.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
};
</script>
