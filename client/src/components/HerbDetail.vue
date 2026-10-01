<template>
  <div class="detail-container">
    <!-- 頂部操作與麵包屑 -->
    <div class="detail-back-bar">
      <div class="detail-breadcrumbs">
        <a href="#" @click.prevent="$emit('back-to-catalog')">草本圖鑑目錄</a>
        <span>›</span>
        <span>{{ herb.category }}</span>
        <span>›</span>
        <strong style="color: var(--primary-deep)">{{ herb.name }}</strong>
      </div>

      <div style="display: flex; gap: 10px;">
        <button
          class="btn-pill btn-pill-subtle"
          :class="{ 'btn-pill-primary': isComparing }"
          @click="$emit('toggle-compare', herb)"
        >
          <span>⚖️</span>
          <span>{{ isComparing ? '已加入比對' : '加入比對' }}</span>
        </button>
        <button class="btn-pill btn-pill-subtle" @click="$emit('back-to-catalog')">
          <span>✕</span>
          <span>返回清單</span>
        </button>
      </div>
    </div>

    <!-- 主體雙欄排版 -->
    <div class="detail-layout">
      <!-- 左欄：植物標本圖片與屬性卡 -->
      <div>
        <div class="detail-image-box">
          <img
            :src="herb.thumbnailUrl"
            :alt="herb.name"
            class="detail-image"
            @error="onImageError"
          />
        </div>

        <div class="detail-key-info">
          <div class="detail-info-row">
            <span class="detail-info-label">藥材分類</span>
            <span class="detail-info-value">{{ herb.category }}</span>
          </div>
          <div class="detail-info-row">
            <span class="detail-info-label">四氣藥性</span>
            <span class="detail-info-value">
              <span :class="['badge-nature', natureClass(herb.nature)]">{{ herb.nature }}</span>
            </span>
          </div>
          <div class="detail-info-row">
            <span class="detail-info-label">五味性味</span>
            <span class="detail-info-value">
              <span v-for="t in herb.taste" :key="t" class="badge-channel" style="margin-right: 4px;">{{ t }}</span>
            </span>
          </div>
          <div class="detail-info-row">
            <span class="detail-info-label">歸經臟腑</span>
            <span class="detail-info-value">
              <span v-for="ch in herb.channels" :key="ch" class="badge-channel" style="margin-right: 4px;">入{{ ch }}經</span>
            </span>
          </div>
          <div v-if="herb.commonNames && herb.commonNames.length" class="detail-info-row">
            <span class="detail-info-label">民間別名</span>
            <span class="detail-info-value">{{ herb.commonNames.join('、') }}</span>
          </div>
        </div>
      </div>

      <!-- 右欄：本草文獻詳解 -->
      <div class="detail-main-info">
        <div class="detail-header-seal-wrap">
          <div>
            <h1 class="detail-title">{{ herb.name }}</h1>
            <div class="detail-scientific">{{ herb.scientificName }}</div>
            <div v-if="herb.pinyin" class="detail-pinyin">拼音：{{ herb.pinyin }}</div>
          </div>
        </div>

        <!-- 功效主治 -->
        <div class="section-block">
          <div class="section-block-title">
            <span>✨</span>
            <span>【功效與主治】</span>
          </div>
          <p class="section-block-content">{{ herb.efficacy }}</p>
        </div>

        <!-- 台灣在地草藥文化與採集背景 -->
        <div v-if="herb.taiwanHeritage" class="taiwan-heritage-block">
          <div class="taiwan-heritage-title">
            <span>🍃</span>
            <span>【台灣在地青草智慧與民間應用】</span>
          </div>
          <p class="section-block-content" style="color: #234e3f;">{{ herb.taiwanHeritage }}</p>
        </div>

        <!-- 用法用量與日常青草茶煮法 -->
        <div class="section-block">
          <div class="section-block-title">
            <span>🍵</span>
            <span>【用法用量與煎服配伍】</span>
          </div>
          <p class="section-block-content">{{ herb.usage }}</p>
        </div>

        <!-- 禁忌警語 -->
        <div class="caution-block">
          <div class="caution-title">
            <span>⚠️</span>
            <span>【使用禁忌與體質注意】</span>
          </div>
          <p style="font-size: 14px; color: #991b1b; line-height: 1.6;">
            {{ herb.contraindications }}
          </p>
        </div>

        <!-- 相關推薦藥材 -->
        <div v-if="herb.relatedHerbs && herb.relatedHerbs.length" class="related-herbs-section">
          <div class="section-block-title" style="border: none; margin-bottom: 0;">
            <span>🌿</span>
            <span>【相生相成 ‧ 關聯推薦藥材】</span>
          </div>
          <div class="related-grid">
            <div
              v-for="rel in herb.relatedHerbs"
              :key="rel.id"
              class="related-mini-card"
              @click="$emit('select-herb-id', rel.id)"
            >
              <img
                :src="rel.thumbnailUrl"
                :alt="rel.name"
                class="related-thumb"
                @error="onImageError"
              />
              <div>
                <div class="related-info-name">{{ rel.name }}</div>
                <div class="related-info-cat">{{ rel.category }} · {{ rel.nature }}性</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  herb: { type: Object, required: true },
  isComparing: { type: Boolean, default: false }
});

defineEmits(['back-to-catalog', 'select-herb-id', 'toggle-compare']);

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
  e.target.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
};
</script>
