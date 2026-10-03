<template>
  <div class="meridian-map-container">
    <div class="map-header">
      <div class="map-seal">經絡</div>
      <div>
        <h2 class="map-title">五行臟腑經絡氣血引導圖 · Meridian Body Map</h2>
        <p class="map-subtitle">中醫「藥物歸經」為引領藥力直達病所之舟楫。點選五行臟腑節點，洞悉本草入經奧妙。</p>
      </div>
    </div>

    <!-- 五行五臟輪盤/按鈕 -->
    <div class="elements-nav-bar">
      <button
        v-for="elem in elements"
        :key="elem.name"
        class="element-btn"
        :class="[elem.themeClass, { active: activeElement.name === elem.name }]"
        @click="selectElement(elem)"
      >
        <span class="elem-char">{{ elem.element }}</span>
        <div class="elem-meta">
          <strong class="elem-organ">{{ elem.name }}</strong>
          <span class="elem-sub">{{ elem.organ }} / {{ elem.colorDesc }}</span>
        </div>
      </button>
    </div>

    <!-- 經絡詳解與草藥歸經畫廊 -->
    <div class="element-detail-card" :class="activeElement.themeClass">
      <div class="element-meta-grid">
        <div>
          <div class="element-headline">
            <span class="element-symbol-circle">{{ activeElement.element }}</span>
            <div>
              <h3 class="element-heading">{{ activeElement.name }} · {{ activeElement.title }}</h3>
              <div class="element-physiology">{{ activeElement.physiology }}</div>
            </div>
          </div>
          <p class="element-lore">{{ activeElement.lore }}</p>
        </div>

        <div class="element-quick-facts">
          <div class="fact-row">
            <span class="fact-lbl">五行行屬：</span>
            <strong>{{ activeElement.element }} ({{ activeElement.direction }})</strong>
          </div>
          <div class="fact-row">
            <span class="fact-lbl">所對應季：</span>
            <strong>{{ activeElement.season }}</strong>
          </div>
          <div class="fact-row">
            <span class="fact-lbl">相表裡腑：</span>
            <strong>{{ activeElement.paired }}</strong>
          </div>
          <div class="fact-row">
            <span class="fact-lbl">本草相生：</span>
            <strong>{{ activeElement.relation }}</strong>
          </div>
        </div>
      </div>

      <!-- 歸入該經之代表藥材 -->
      <div class="matching-herbs-section">
        <h4 class="matching-title">
          🌿 歸入【{{ activeElement.organ }}經】之本草庫典藏 (共 {{ matchingHerbs.length }} 味)
        </h4>

        <div v-if="matchingHerbs.length === 0" class="no-herbs-hint">
          資料庫目前尚無專屬歸經之藥材。
        </div>

        <div v-else class="matching-herbs-grid">
          <div
            v-for="herb in matchingHerbs"
            :key="herb.id"
            class="meridian-herb-card"
            @click="$emit('select-herb', herb.id)"
          >
            <img :src="herb.thumbnailUrl" :alt="herb.name" class="meridian-herb-thumb" />
            <div class="meridian-herb-body">
              <div class="meridian-herb-name">{{ herb.name }}</div>
              <div class="meridian-herb-nature">{{ herb.nature }}性 · {{ (herb.properties || []).join('、') }}</div>
              <p class="meridian-herb-efficacy">{{ herb.summaryEfficacy || herb.efficacy }}</p>
            </div>
            <span class="meridian-card-arrow">➔</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { audio } from '../services/audioService';

const props = defineProps({
  herbs: { type: Array, default: () => [] }
});

defineEmits(['select-herb']);

const elements = [
  {
    name: '手太陰肺經',
    organ: '肺',
    element: '金',
    direction: '西方 · 白色',
    season: '秋季 · 斂降',
    paired: '手陽明大腸經',
    relation: '脾土生肺金，肺金生腎水',
    themeClass: 'theme-metal',
    colorDesc: '秋燥宣通',
    title: '相傅之官，治節出焉',
    physiology: '主氣司呼吸，通調水道，外合皮毛，開竅於鼻。',
    lore: '肺為嬌臟，不耐寒熱，最畏秋燥。台灣地處海島，空氣多潮濕霧霾或冷氣房乾燥，草藥取魚腥草、薄荷、金銀花、桑葉等入肺經，清肺潤燥、疏風解毒。'
  },
  {
    name: '足厥陰肝經',
    organ: '肝',
    element: '木',
    direction: '東方 · 青色',
    season: '春季 · 生發',
    paired: '足少陽膽經',
    relation: '水生木，木生火',
    themeClass: 'theme-wood',
    colorDesc: '春風疏泄',
    title: '將軍之官，謀慮出焉',
    physiology: '主疏泄與藏血，調暢一身氣機，在體主筋，開竅於目。',
    lore: '現代人熬夜壓力大、肝火上亢目赤。台灣民間首重「降火保肝」，大花咸豐草、薄荷、車前草、鳳尾草直入肝經，疏肝退火、明目解熱。'
  },
  {
    name: '足太陰脾經',
    organ: '脾',
    element: '土',
    direction: '中央 · 黃色',
    season: '長夏 · 運化',
    paired: '足陽明胃經',
    relation: '火生土，土生金',
    themeClass: 'theme-earth',
    colorDesc: '土生萬物',
    title: '諫議之官，知周出焉',
    physiology: '主運化水穀精微，統血生血，後天之本，開竅於口。',
    lore: '台灣夏季濕氣深重，冰飲盛行易致「脾濕困脾」、消化腹脹。取紫蘇行氣寬中、黃耆補中益氣、甘草和百味健脾，化濕行水。'
  },
  {
    name: '手少陰心經',
    organ: '心',
    element: '火',
    direction: '南方 · 赤色',
    season: '夏季 · 炎上',
    paired: '手太陽小腸經',
    relation: '木生火，火生土',
    themeClass: 'theme-fire',
    colorDesc: '心神清明',
    title: '君主之官，神明出焉',
    physiology: '主血脈、藏神志，在體合脈，開竅於舌。',
    lore: '心火暴躁、口舌生瘡、失眠心煩之時，穿心蓮以苦寒瀉火、金銀花清心解毒，甘草緩急止痛，定神安魂。'
  },
  {
    name: '足少陰腎經',
    organ: '腎',
    element: '水',
    direction: '北方 · 黑色',
    season: '冬季 · 閉藏',
    paired: '足太陽膀胱經',
    relation: '金生水，水生木',
    themeClass: 'theme-water',
    colorDesc: '玄水固本',
    title: '作強之官，伎巧出焉',
    physiology: '藏精主骨生髓，為先天之本，主納氣與水液代謝。',
    lore: '腰膝痠軟、用腦精虧與雙眼疲憊者，取枸杞子滋補肝腎精血、雷公根與車前草通利膀胱水道，固本而澄澈精氣。'
  }
];

const activeElement = ref(elements[0]);

const selectElement = (elem) => {
  audio.playClick();
  activeElement.value = elem;
};

// 篩選歸入該臟腑的藥材
const matchingHerbs = computed(() => {
  const organ = activeElement.value.organ;
  return props.herbs.filter(h => (h.channels || []).includes(organ));
});
</script>

<style scoped>
.meridian-map-container {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  margin-bottom: 32px;
}

.map-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.map-seal {
  width: 48px;
  height: 48px;
  background: var(--primary);
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 900;
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.3);
}

.map-title {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 800;
  color: var(--primary-deep);
}

.map-subtitle {
  font-size: 13.5px;
  color: var(--ink-muted);
  margin-top: 2px;
}

/* 五行導覽標籤 */
.elements-nav-bar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.element-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-light);
  background: var(--bg-parchment);
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: left;
}

.element-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.elem-char {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 16px;
  flex-shrink: 0;
}

.theme-metal .elem-char { background: #e2e8f0; color: #334155; }
.theme-wood .elem-char { background: #dcfce7; color: #166534; }
.theme-earth .elem-char { background: #fef3c7; color: #92400e; }
.theme-fire .elem-char { background: #fee2e2; color: #b91c1c; }
.theme-water .elem-char { background: #e0f2fe; color: #075985; }

.element-btn.active {
  border-color: var(--primary);
  background: #fff;
  box-shadow: 0 4px 14px rgba(45, 106, 79, 0.2);
}

.elem-organ {
  display: block;
  font-size: 13px;
  color: var(--ink-heavy);
}

.elem-sub {
  font-size: 11px;
  color: var(--ink-muted);
}

/* 詳情卡片 */
.element-detail-card {
  border-radius: 16px;
  border: 1px solid var(--border-light);
  background: var(--bg-parchment);
  padding: 24px;
}

.element-meta-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
  padding-bottom: 20px;
  border-bottom: 1px dashed var(--border-light);
  margin-bottom: 24px;
}

.element-headline {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.element-symbol-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 900;
}

.element-heading {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 800;
  color: var(--primary-deep);
}

.element-physiology {
  font-size: 12px;
  color: var(--ink-muted);
}

.element-lore {
  font-size: 14px;
  line-height: 1.7;
  color: var(--ink-body);
}

.element-quick-facts {
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--border-light);
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
}

.fact-row {
  display: flex;
  justify-content: space-between;
}

.fact-lbl {
  color: var(--ink-muted);
}

/* 匹配草藥列表 */
.matching-title {
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 16px;
}

.matching-herbs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

.meridian-herb-card {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.meridian-herb-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.meridian-herb-thumb {
  width: 54px;
  height: 54px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.meridian-herb-body {
  flex: 1;
  min-width: 0;
}

.meridian-herb-name {
  font-weight: 700;
  font-size: 14.5px;
  color: var(--primary-deep);
}

.meridian-herb-nature {
  font-size: 11px;
  color: var(--amber-deep);
}

.meridian-herb-efficacy {
  font-size: 11.5px;
  color: var(--ink-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.meridian-card-arrow {
  color: var(--ink-muted);
  font-size: 14px;
}

@media (max-width: 992px) {
  .elements-nav-bar {
    grid-template-columns: repeat(2, 1fr);
  }
  .element-meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
