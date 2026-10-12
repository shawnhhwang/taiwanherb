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
        <span class="detail-specimen-no">標本編號 NO. {{ String(herb.id).padStart(3, '0') }}</span>
      </div>

      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <!-- 投入茶釜調配按鈕 -->
        <button
          class="btn-pill btn-pill-accent-tea"
          title="將此味藥材投入方劑調配研製所進行配方實驗"
          @click="onAddToCauldron"
        >
          <span>🧪</span>
          <span>投入茶釜調配</span>
        </button>

        <!-- 收藏標本按鈕 -->
        <button
          class="btn-pill btn-pill-subtle"
          :class="{ 'btn-pill-primary': isFavorite }"
          @click="onToggleFavorite"
        >
          <span>{{ isFavorite ? '★ 已典藏' : '☆ 典藏標本' }}</span>
        </button>

        <button
          class="btn-pill btn-pill-subtle"
          :class="{ 'btn-pill-primary': isComparing }"
          @click="onToggleCompare"
        >
          <span>⚖️</span>
          <span>{{ isComparing ? '已加入比對' : '加入比對' }}</span>
        </button>

        <!-- 印製/分享本草箋 -->
        <button class="btn-pill btn-pill-subtle" @click="printSpecimenPlate">
          <span>📜</span>
          <span>印製本草箋</span>
        </button>

        <button class="btn-pill btn-pill-subtle" @click="$emit('back-to-catalog')">
          <span>✕</span>
          <span>返回清單</span>
        </button>
      </div>
    </div>

    <!-- 主體雙欄排版 -->
    <div class="detail-layout">
      <!-- 左欄：植物標本圖片、科屬分類與關鍵特徵 -->
      <div>
        <div class="detail-image-box">
          <img
            :src="herb.thumbnailUrl"
            :alt="herb.name"
            class="detail-image"
            @error="onImageError"
          />
          <div class="detail-stamp-seal">島嶼本草</div>
        </div>

        <!-- 植物學科屬特徵表 -->
        <div class="detail-key-info">
          <div v-if="herb.family" class="detail-info-row">
            <span class="detail-info-label">植物科屬</span>
            <span class="detail-info-value font-highlight">{{ herb.family }}</span>
          </div>
          <div v-if="herb.partsUsed" class="detail-info-row">
            <span class="detail-info-label">入藥部位</span>
            <span class="detail-info-value">{{ herb.partsUsed }}</span>
          </div>
          <div class="detail-info-row">
            <span class="detail-info-label">藥材分類</span>
            <span class="detail-info-value">{{ herb.category }}</span>
          </div>
          <div class="detail-info-row">
            <span class="detail-info-label">四氣藥性</span>
            <span class="detail-info-value">
              <span :class="['badge-nature', natureClass(herb.nature)]">{{ herb.nature }}性</span>
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
          <div v-if="herb.harvestSeason" class="detail-info-row">
            <span class="detail-info-label">採收時節</span>
            <span class="detail-info-value">{{ herb.harvestSeason }}</span>
          </div>
          <div v-if="herb.commonNames && herb.commonNames.length" class="detail-info-row">
            <span class="detail-info-label">民間俗名</span>
            <span class="detail-info-value">{{ herb.commonNames.join('、') }}</span>
          </div>
          <div v-if="herb.dialectNames && herb.dialectNames.length" class="detail-info-row">
            <span class="detail-info-label">台灣本地方言</span>
            <span class="detail-info-value">
              <span v-for="d in herb.dialectNames" :key="d.name" class="dialect-pill" style="margin-right: 4px; background: var(--bg-subtle); padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                {{ d.dialect }}: {{ d.name }}
              </span>
            </span>
          </div>
          <div v-if="herb.region" class="detail-info-row">
            <span class="detail-info-label">風土分佈</span>
            <span class="detail-info-value font-highlight">{{ herb.region }}</span>
          </div>
          <div v-if="herb.folkApplication" class="detail-info-row">
            <span class="detail-info-label">生活情境</span>
            <span class="detail-info-value">{{ herb.folkApplication }}</span>
          </div>
          <div v-if="herb.safetyLevel" class="detail-info-row">
            <span class="detail-info-label">安全等級</span>
            <span class="detail-info-value" style="color: var(--amber-deep); font-weight: bold;">{{ herb.safetyLevel }}</span>
          </div>
        </div>

        <!-- 活性化學成分徽章雲 -->
        <div v-if="herb.activeCompounds && herb.activeCompounds.length" class="active-compounds-card">
          <div class="compounds-title">🔬 現代植物化學活性成分</div>
          <div class="compounds-chips">
            <span v-for="comp in herb.activeCompounds" :key="comp" class="compound-tag">
              {{ comp }}
            </span>
          </div>
        </div>
      </div>

      <!-- 右欄：本草文獻詳解、在地風土與配伍推薦 -->
      <div class="detail-main-info">
        <div class="detail-header-seal-wrap">
          <div>
            <h1 class="detail-title">{{ herb.name }}</h1>
            <div class="detail-scientific">{{ herb.scientificName }}</div>
            <div v-if="herb.pinyin" class="detail-pinyin">拼音：{{ herb.pinyin }}</div>
          </div>
          <div v-if="herb.solarTermRecommendation" class="solar-term-recommend-seal">
            <span class="solar-sub">當令相應</span>
            <strong class="solar-name">{{ herb.solarTermRecommendation }}</strong>
          </div>
        </div>

        <!-- 傳統古早記載與常民智慧 -->
        <div class="section-block">
          <div class="section-block-title">
            <span>📜</span>
            <span>【傳統古早記載與常民智慧】</span>
            <span class="non-medical-pill">古籍風土記錄 · 非醫療效果宣稱</span>
          </div>
          <p class="section-block-content">{{ herb.efficacy }}</p>
        </div>

        <!-- 台灣在地草藥文化與採集背景 -->
        <div v-if="herb.taiwanHeritage" class="taiwan-heritage-block">
          <div class="taiwan-heritage-title">
            <span>🍃</span>
            <span>【台灣在地風土文化與青草巷智慧】</span>
          </div>
          <p class="section-block-content" style="color: #234e3f;">{{ herb.taiwanHeritage }}</p>
          <div v-if="herb.terroir" class="terroir-footer-note">
            📍 <strong>代表生長風土：</strong> {{ herb.terroir }}
          </div>
        </div>

        <!-- 用法用量與日常青草茶煮法 -->
        <div class="section-block">
          <div class="section-block-title">
            <span>🍵</span>
            <span>【用法用量與日常煎服配伍】</span>
          </div>
          <p class="section-block-content">{{ herb.usage }}</p>
        </div>

        <!-- 禁忌警語 -->
        <div class="caution-block">
          <div class="caution-title">
            <span>⚠️</span>
            <span>【使用禁忌與體質警語】</span>
          </div>
          <p style="font-size: 14px; color: #991b1b; line-height: 1.6;">
            {{ herb.contraindications }}
          </p>
        </div>

        <!-- 推薦結盟青草店購買指引卡片 -->
        <div class="allied-shops-recommend-card">
          <div class="shop-rec-header">
            <span class="shop-rec-seal">購買指引</span>
            <div class="shop-rec-title-wrap">
              <h4 class="shop-rec-title">🏪 推薦結盟青草店購買指引</h4>
              <p class="shop-rec-subtitle">尋訪老字號道地生鮮採摘、乾燥切片與代客抓配青草茶</p>
            </div>
            <button class="btn-view-all-shops" @click="$emit('jump-to-shops')">
              查看全島結盟店家 ➔
            </button>
          </div>

          <div v-if="loadingShops" class="shops-mini-loading">
            <span>🍃 正在連線查詢供應「{{ herb.name }}」之特約青草舖...</span>
          </div>

          <div v-else-if="associatedShops.length > 0" class="shops-mini-grid">
            <div
              v-for="shop in associatedShops"
              :key="shop.id"
              class="shop-mini-card"
            >
              <div class="shop-mini-top">
                <span class="shop-mini-name">{{ shop.name }}</span>
                <span class="shop-mini-city">{{ shop.city }}</span>
              </div>
              <div class="shop-mini-address">📍 {{ shop.address }}</div>
              <div class="shop-mini-phone">📞 <a :href="`tel:${shop.phone.replace(/[^0-9]/g, '')}`">{{ shop.phone }}</a></div>
              <div class="shop-mini-advice">💡 <strong>採買建議：</strong>{{ shop.buyingAdvice }}</div>
            </div>
          </div>

          <div v-else class="shops-mini-fallback">
            全島 12 家特約指標性青草老舖皆備有本草生鮮或乾燥切片，可前往
            <a href="#" @click.prevent="$emit('jump-to-shops')">【結盟青草店目錄】</a>
            尋訪就近店家詢問客製抓配。
          </div>
        </div>

        <!-- 古早文化知識分享與醫療免責告示卡 -->
        <div class="detail-disclaimer-card">
          <div class="disclaimer-title-row">
            <span>⚖️</span>
            <strong>【民間風土知識分享與醫療免責告示】</strong>
          </div>
          <p class="disclaimer-content-p">
            本條目所載之植物性味、十二經絡與民間常民用法，純粹為臺灣傳統文化、青草古籍與地方風土歷史經驗之整理說明，<strong>本系統嚴格遵守規範，絕無宣稱或暗示任何醫療效果</strong>，亦不可作為醫療診斷或處方依據。若身體有任何不適、慢性疾病或特殊體質，請務必尋求合格專業中西醫專科醫師協助。
          </p>
        </div>

        <!-- 相關推薦藥材 -->
        <div v-if="herb.relatedHerbs && herb.relatedHerbs.length" class="related-herbs-section">
          <div class="section-block-title" style="border: none; margin-bottom: 0;">
            <span>🌿</span>
            <span>【相生相成 ‧ 關聯配伍藥材推薦】</span>
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
import { ref, watch } from 'vue';
import { HerbApi } from '../services/api';
import { audio } from '../services/audioService';

const props = defineProps({
  herb: { type: Object, required: true },
  isComparing: { type: Boolean, default: false },
  isFavorite: { type: Boolean, default: false }
});

const emit = defineEmits([
  'back-to-catalog',
  'select-herb-id',
  'toggle-compare',
  'toggle-favorite',
  'add-to-cauldron',
  'jump-to-shops'
]);

const associatedShops = ref([]);
const loadingShops = ref(false);

const loadAssociatedShops = async () => {
  if (!props.herb?.name) return;
  loadingShops.value = true;
  try {
    const shops = await HerbApi.getShopsByHerb(props.herb.name);
    associatedShops.value = shops;
  } catch (err) {
    console.warn('Failed to load shops by herb:', err);
    associatedShops.value = [];
  } finally {
    loadingShops.value = false;
  }
};

watch(
  () => props.herb?.name,
  () => {
    loadAssociatedShops();
  },
  { immediate: true }
);

const onAddToCauldron = () => {
  audio.playWaterDrop();
  emit('add-to-cauldron', props.herb);
};

const onToggleFavorite = () => {
  audio.playChime(props.isFavorite ? 440 : 880);
  emit('toggle-favorite', props.herb);
};

const onToggleCompare = () => {
  audio.playClick();
  emit('toggle-compare', props.herb);
};

const printSpecimenPlate = () => {
  audio.playChime(660);
  window.print();
};

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
  e.target.src = '/images/herbs/default_herb.svg';
};
</script>

<style scoped>
.detail-specimen-no {
  font-family: monospace;
  font-size: 11px;
  background: var(--bg-subtle);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--amber-deep);
  margin-left: 8px;
}

.detail-image-box {
  position: relative;
}

.detail-stamp-seal {
  position: absolute;
  bottom: 12px;
  right: 12px;
  border: 2px solid #b91c1c;
  color: #b91c1c;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.85);
  transform: rotate(-5deg);
}

.font-highlight {
  color: var(--primary-deep);
  font-weight: 700;
}

.active-compounds-card {
  margin-top: 14px;
  background: var(--bg-parchment);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border-light);
}

.compounds-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 8px;
}

.compounds-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.compound-tag {
  font-size: 11.5px;
  background: #fff;
  border: 1px solid var(--border-light);
  color: var(--ink-heavy);
  padding: 3px 8px;
  border-radius: 6px;
}

.solar-term-recommend-seal {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1.5px solid var(--amber);
  background: var(--amber-light);
  border-radius: 8px;
  padding: 6px 12px;
}

.solar-sub {
  font-size: 10px;
  color: var(--amber-deep);
}

.solar-name {
  font-size: 16px;
  font-family: var(--font-serif);
  color: var(--amber-deep);
}

.terroir-footer-note {
  margin-top: 10px;
  font-size: 13px;
  color: var(--amber-deep);
  border-top: 1px dashed rgba(45, 106, 79, 0.2);
  padding-top: 8px;
}

.non-medical-pill {
  font-size: 11px;
  font-weight: normal;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  color: var(--ink-muted);
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
}

.detail-disclaimer-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-left: 4px solid var(--amber-deep);
  border-radius: 10px;
  padding: 14px 18px;
  margin-top: 16px;
}

.disclaimer-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--primary-deep);
  margin-bottom: 6px;
}

.disclaimer-content-p {
  margin: 0;
  font-size: 12.5px;
  color: var(--ink-muted);
  line-height: 1.6;
}

.btn-pill-accent-tea {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  border-color: #059669;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
}

.btn-pill-accent-tea:hover {
  background: linear-gradient(135deg, #059669, #047857);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
}

/* 推薦結盟青草店卡片 */
.allied-shops-recommend-card {
  margin-top: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 16px 18px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
}

.shop-rec-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.shop-rec-seal {
  background: var(--primary);
  color: #fff;
  font-family: var(--font-serif);
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
}

.shop-rec-title-wrap {
  flex: 1;
}

.shop-rec-title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  color: var(--primary-deep);
}

.shop-rec-subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--ink-muted);
}

.btn-view-all-shops {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  background: rgba(45, 106, 79, 0.08);
  border: 1px solid rgba(45, 106, 79, 0.2);
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-view-all-shops:hover {
  background: var(--primary);
  color: #fff;
}

.shops-mini-loading,
.shops-mini-fallback {
  font-size: 12.5px;
  color: var(--ink-muted);
  padding: 8px 0;
}

.shops-mini-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
  margin-top: 8px;
}

.shop-mini-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
}

.shop-mini-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.shop-mini-name {
  font-weight: 700;
  color: var(--primary-deep);
  font-size: 13.5px;
}

.shop-mini-city {
  background: rgba(45, 106, 79, 0.1);
  color: var(--primary-deep);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.shop-mini-address {
  color: var(--ink-heavy);
  margin-bottom: 3px;
}

.shop-mini-phone {
  color: var(--ink-heavy);
  margin-bottom: 6px;
}

.shop-mini-phone a {
  color: var(--primary-deep);
  text-decoration: none;
  font-weight: 600;
}

.shop-mini-advice {
  background: #fff;
  border: 1px dashed var(--border-light);
  padding: 6px 8px;
  border-radius: 6px;
  color: #78350f;
  line-height: 1.4;
}
</style>
