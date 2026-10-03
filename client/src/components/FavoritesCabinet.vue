<template>
  <div class="cabinet-container">
    <div class="cabinet-header">
      <div class="cabinet-seal">藏書</div>
      <div>
        <h2 class="cabinet-title">我的本草藏書票標本室 · Ex-Libris Herbarium</h2>
        <p class="cabinet-subtitle">珍藏屬於您的島嶼植物圖鑑。可預覽印製典雅藏書票卡，留存本草清芬。</p>
      </div>
    </div>

    <div v-if="favoriteHerbs.length === 0" class="empty-cabinet-card">
      <div class="empty-icon">📖</div>
      <h3 class="empty-title">尚無收藏的本草標本</h3>
      <p class="empty-desc">在圖鑑或詳情頁中點擊「🔖 典藏標本」按鈕，即可將心儀藥材收入此藏書閣。</p>
      <button class="btn-pill btn-pill-primary" @click="$emit('browse-catalog')">前往探索草木圖鑑</button>
    </div>

    <div v-else class="cabinet-grid">
      <div
        v-for="herb in favoriteHerbs"
        :key="herb.id"
        class="specimen-plate-card"
      >
        <div class="ex-libris-frame">
          <div class="plate-top-seal">
            <span>TAIWAN HERBARIUM</span>
            <span class="plate-num">NO. {{ String(herb.id).padStart(3, '0') }}</span>
          </div>

          <div class="plate-image-wrap">
            <img :src="herb.thumbnailUrl" :alt="herb.name" class="plate-img" />
            <div class="plate-stamp-red">島嶼典藏</div>
          </div>

          <div class="plate-body">
            <h4 class="plate-name">{{ herb.name }}</h4>
            <div class="plate-latin">{{ herb.scientificName }}</div>
            <div class="plate-tags">
              <span class="plate-badge">{{ herb.category }}</span>
              <span class="plate-badge">{{ herb.nature }}性</span>
            </div>
            <p class="plate-summary">{{ herb.summaryEfficacy || herb.efficacy }}</p>
          </div>

          <div class="plate-footer">
            <button class="btn-plate-action" @click="$emit('view-herb', herb.id)">檢視全卷</button>
            <button class="btn-plate-remove" @click="$emit('remove-favorite', herb.id)">移出收藏</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  favoriteHerbs: { type: Array, default: () => [] }
});

defineEmits(['browse-catalog', 'view-herb', 'remove-favorite']);
</script>

<style scoped>
.cabinet-container {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  margin-bottom: 32px;
}

.cabinet-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.cabinet-seal {
  width: 48px;
  height: 48px;
  background: #991b1b;
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 900;
  box-shadow: 0 4px 12px rgba(153, 27, 27, 0.3);
}

.cabinet-title {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 800;
  color: var(--primary-deep);
}

.cabinet-subtitle {
  font-size: 13.5px;
  color: var(--ink-muted);
  margin-top: 2px;
}

.empty-cabinet-card {
  text-align: center;
  padding: 60px 20px;
  background: var(--bg-parchment);
  border-radius: 16px;
  border: 1px dashed var(--border-light);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-title {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--primary-deep);
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 14px;
  color: var(--ink-muted);
  margin-bottom: 24px;
}

/* 藏書票格狀卡片 */
.cabinet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 24px;
}

.specimen-plate-card {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: 14px;
  padding: 12px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.specimen-plate-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

.ex-libris-frame {
  border: 1px dashed var(--border-light);
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.plate-top-seal {
  display: flex;
  justify-content: space-between;
  font-size: 10.5px;
  color: var(--ink-muted);
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.plate-num {
  font-family: monospace;
  color: var(--amber-deep);
}

.plate-image-wrap {
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: #ede6d6;
  margin-bottom: 14px;
}

.plate-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plate-stamp-red {
  position: absolute;
  bottom: 8px;
  right: 8px;
  border: 1.5px solid #b91c1c;
  color: #b91c1c;
  font-size: 10px;
  font-family: var(--font-serif);
  padding: 1px 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.85);
  font-weight: 900;
  transform: rotate(-6deg);
}

.plate-name {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--primary-deep);
  font-weight: 800;
}

.plate-latin {
  font-size: 11.5px;
  font-style: italic;
  color: var(--ink-muted);
  margin-bottom: 8px;
}

.plate-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.plate-badge {
  font-size: 11px;
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--ink-body);
}

.plate-summary {
  font-size: 12.5px;
  color: var(--ink-body);
  line-height: 1.5;
  margin-bottom: 14px;
}

.plate-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid var(--border-light);
}

.btn-plate-action {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--primary);
  cursor: pointer;
}

.btn-plate-remove {
  font-size: 12px;
  color: #ef4444;
  cursor: pointer;
}
</style>
