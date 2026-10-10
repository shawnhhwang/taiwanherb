<template>
  <div class="terroir-map-container">
    <div class="terroir-header">
      <div class="terroir-title-group">
        <span class="terroir-seal">風土</span>
        <div>
          <h3 class="terroir-main-title">台灣本草風土產區探索</h3>
          <p class="terroir-subtitle">依循島嶼地形水文，探尋北中南東四方青草智慧</p>
        </div>
      </div>
      <div v-if="currentRegion !== '全部'" class="terroir-active-badge">
        <span>已鎖定區域：<strong>{{ currentRegion }}</strong></span>
        <button class="terroir-clear-btn" @click="selectRegion('全部')">✕ 重設全島</button>
      </div>
    </div>

    <!-- 風土區域網格卡片 -->
    <div class="terroir-regions-grid">
      <div
        v-for="region in regionsList"
        :key="region.id"
        class="terroir-card"
        :class="{ active: currentRegion === region.name || (currentRegion === '全部' && region.id === 'all') }"
        @click="selectRegion(region.name)"
      >
        <div class="terroir-card-top">
          <span class="terroir-icon">{{ region.icon }}</span>
          <span class="terroir-count-tag">{{ getHerbCountForRegion(region.name) }} 味</span>
        </div>
        <div class="terroir-card-name">{{ region.name }}</div>
        <div class="terroir-card-desc">{{ region.desc }}</div>
        <div class="terroir-card-herbs">
          <span
            v-for="h in region.featuredHerbs"
            :key="h"
            class="terroir-herb-chip"
          >
            {{ h }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { audio } from '../services/audioService';

const props = defineProps({
  currentRegion: {
    type: String,
    default: '全部'
  },
  allHerbs: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['select-region']);

const regionsList = [
  {
    id: 'all',
    name: '全部',
    icon: '🏝️',
    desc: '全台島嶼 25 味指標性本草與風土典藏',
    featuredHerbs: ['咸豐草', '魚腥草', '仙草', '大風草']
  },
  {
    id: 'north',
    name: '北部 (萬華/淡水河/雙北)',
    icon: '🏛️',
    desc: '老艋舺西昌街百年青草巷、淡水河畔與古蹟井邊',
    featuredHerbs: ['大花咸豐草', '車前草', '鳳尾草', '甘草']
  },
  {
    id: 'hakka',
    name: '桃竹苗 (客庄丘陵/關西/南庄)',
    icon: '⛰️',
    desc: '客家丘陵茶山、關西仙草、獅潭抹草辟邪與紫蘇梅',
    featuredHerbs: ['抹草', '仙草', '桑葉', '紫蘇', '香茅']
  },
  {
    id: 'central',
    name: '中部 (彰化田尾/南投名間/埔里)',
    icon: '🌾',
    desc: '八卦山台地台灣人參狗尾草、花壇艾草、金銀花',
    featuredHerbs: ['狗尾草', '艾草', '金銀花', '薄荷']
  },
  {
    id: 'south',
    name: '南部 (六堆屏東/高樹/恆春半島)',
    icon: '☀️',
    desc: '南台灣豔陽下大風草月子浴、白鶴靈芝、穿心蓮',
    featuredHerbs: ['大風草', '白鶴靈芝', '穿心蓮']
  },
  {
    id: 'east',
    name: '花東原鄉 (花蓮吉安/太魯閣/台東)',
    icon: '🌊',
    desc: '太魯閣部落神木刺蔥、花蓮農改場野生山苦瓜',
    featuredHerbs: ['食茱萸', '山苦瓜', '昭和草', '雷公根']
  }
];

const getHerbCountForRegion = (regionName) => {
  if (regionName === '全部') return props.allHerbs.length;
  return props.allHerbs.filter(h => (h.region || '').includes(regionName)).length;
};

const selectRegion = (regionName) => {
  audio.playClick();
  emit('select-region', regionName);
};
</script>

<style scoped>
.terroir-map-container {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.terroir-map-container::before {
  content: "風土志";
  position: absolute;
  right: 18px;
  bottom: 10px;
  font-family: var(--font-serif);
  font-size: 72px;
  color: var(--primary-deep);
  opacity: 0.04;
  pointer-events: none;
  font-weight: 900;
  user-select: none;
}

.terroir-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 12px;
}

.terroir-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.terroir-seal {
  width: 38px;
  height: 38px;
  background: var(--amber-deep);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: bold;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

.terroir-main-title {
  font-family: var(--font-serif);
  font-size: 19px;
  color: var(--primary-deep);
  letter-spacing: 0.5px;
}

.terroir-subtitle {
  font-size: 12.5px;
  color: var(--ink-muted);
}

.terroir-active-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--primary-pale);
  color: var(--primary-deep);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  border: 1px solid var(--border-light);
}

.terroir-clear-btn {
  background: none;
  border: none;
  color: var(--amber-deep);
  font-size: 12px;
  cursor: pointer;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
}

.terroir-clear-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.terroir-regions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
}

.terroir-card {
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.terroir-card:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
}

.terroir-card.active {
  background: var(--bg-card);
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--primary), var(--shadow-sm);
}

.terroir-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.terroir-icon {
  font-size: 22px;
}

.terroir-count-tag {
  font-size: 11px;
  background: var(--primary-pale);
  color: var(--primary-deep);
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: bold;
}

.terroir-card-name {
  font-family: var(--font-serif);
  font-weight: bold;
  font-size: 14.5px;
  color: var(--ink-heavy);
  margin-bottom: 4px;
}

.terroir-card-desc {
  font-size: 11.5px;
  color: var(--ink-muted);
  line-height: 1.45;
  margin-bottom: 10px;
  flex-grow: 1;
}

.terroir-card-herbs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.terroir-herb-chip {
  font-size: 10.5px;
  padding: 2px 6px;
  background: var(--bg-subtle);
  color: var(--primary-deep);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
