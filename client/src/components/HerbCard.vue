<template>
  <div
    ref="cardEl"
    class="herb-card"
    :style="tiltStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @click="onCardClick"
  >
    <div class="herb-card-img-wrap">
      <img
        :src="herb.thumbnailUrl"
        :alt="herb.name"
        class="herb-card-img"
        loading="lazy"
        @error="onImageError"
      />
      <div class="herb-card-category-badge">{{ herb.category }}</div>
      <div class="card-herb-number">NO. {{ String(herb.id).padStart(3, '0') }}</div>

      <!-- 收藏標本按鈕 -->
      <button
        class="card-fav-btn"
        :class="{ active: isFavorite }"
        :title="isFavorite ? '已收藏至我的本草' : '收藏此標本'"
        @click.stop="onToggleFavorite"
      >
        {{ isFavorite ? '★' : '☆' }}
      </button>

      <!-- 3D 鏡面流光層 -->
      <div class="card-specular-sheen" :style="sheenStyle"></div>
    </div>

    <div class="herb-card-body">
      <div class="herb-card-title-row">
        <h3 class="herb-card-name">{{ herb.name }}</h3>
        <span :class="['badge-nature', natureClass(herb.nature)]">{{ herb.nature }}性</span>
      </div>

      <div class="herb-card-scientific">{{ herb.scientificName }}</div>

      <!-- 歸經與主要性味 -->
      <div class="herb-badges-row">
        <span
          v-for="ch in herb.channels"
          :key="ch"
          class="badge-channel"
        >
          入{{ ch }}經
        </span>
        <span
          v-for="t in herb.properties"
          :key="t"
          class="badge-channel prop-badge"
        >
          {{ t }}
        </span>
      </div>

      <!-- 風土產地與民間應用微標籤 -->
      <div class="herb-card-terroir-row">
        <span v-if="herb.region" class="terroir-pill">📍 {{ herb.region.split(' ')[0] }}</span>
        <span v-else-if="herb.terroir" class="terroir-pill">📍 {{ herb.terroir.split('、')[0] }}</span>
        <span v-if="herb.folkApplication" class="compound-pill">🍵 {{ herb.folkApplication }}</span>
        <span v-else-if="herb.activeCompounds && herb.activeCompounds[0]" class="compound-pill">🔬 {{ herb.activeCompounds[0].split(' ')[0] }}</span>
      </div>

      <!-- 功效摘要 -->
      <p class="herb-card-efficacy">{{ herb.summaryEfficacy || herb.efficacy }}</p>

      <div class="herb-card-footer" @click.stop>
        <span class="btn-card-action" @click="onCardClick">
          查看本草詳解 ➔
        </span>

        <button
          class="btn-compare-toggle"
          :class="{ active: isComparing }"
          @click="onToggleCompare"
        >
          {{ isComparing ? '已加入比對 ✓' : '+ 加入比對' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { audio } from '../services/audioService';

const props = defineProps({
  herb: { type: Object, required: true },
  isComparing: { type: Boolean, default: false },
  isFavorite: { type: Boolean, default: false }
});

const emit = defineEmits(['view-detail', 'toggle-compare', 'toggle-favorite']);

// 3D 視角傾斜
const cardEl = ref(null);
const rotX = ref(0);
const rotY = ref(0);
const sheenX = ref(50);
const sheenY = ref(50);

const handleMouseMove = (e) => {
  if (!cardEl.value) return;
  const rect = cardEl.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  rotX.value = -((y - cy) / cy) * 8;
  rotY.value = ((x - cx) / cx) * 8;
  sheenX.value = (x / rect.width) * 100;
  sheenY.value = (y / rect.height) * 100;
};

const handleMouseLeave = () => {
  rotX.value = 0;
  rotY.value = 0;
};

const tiltStyle = computed(() => ({
  transform: `perspective(900px) rotateX(${rotX.value}deg) rotateY(${rotY.value}deg) translateY(${rotX.value !== 0 ? -4 : 0}px)`,
  transition: rotX.value === 0 ? 'transform 0.4s ease-out' : 'transform 0.1s ease-out'
}));

const sheenStyle = computed(() => ({
  background: `radial-gradient(circle at ${sheenX.value}% ${sheenY.value}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)`
}));

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

const onCardClick = () => {
  audio.playChime(660);
  emit('view-detail', props.herb.id);
};

const onToggleCompare = () => {
  audio.playClick();
  emit('toggle-compare', props.herb);
};

const onToggleFavorite = () => {
  audio.playChime(props.isFavorite ? 440 : 880);
  emit('toggle-favorite', props.herb);
};

const onImageError = (e) => {
  e.target.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
};
</script>

<style scoped>
.card-herb-number {
  position: absolute;
  top: 12px;
  right: 48px;
  font-family: monospace;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  padding: 2px 6px;
  border-radius: 4px;
}

.card-fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  border: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--ink-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.card-fav-btn:hover {
  transform: scale(1.15);
  color: #f59e0b;
}

.card-fav-btn.active {
  color: #f59e0b;
  background: #fff;
  border-color: #f59e0b;
}

.card-specular-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.7;
}

.prop-badge {
  background: #fbf7ee;
  border-color: #e2d9c8;
}

.herb-card-terroir-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.terroir-pill, .compound-pill {
  font-size: 10.5px;
  background: var(--bg-parchment);
  color: var(--amber-deep);
  border: 1px solid rgba(176, 125, 72, 0.25);
  padding: 2px 7px;
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}

.compound-pill {
  color: var(--primary);
  border-color: rgba(45, 106, 79, 0.25);
}
</style>
