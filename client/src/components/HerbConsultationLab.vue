<template>
  <div class="consult-lab-container">
    <!-- 茶堂殿堂級頂部牌匾 -->
    <div class="consult-banner">
      <div class="consult-banner-content">
        <div class="consult-seal-badge">
          <span class="banner-seal">諮詢</span>
          <span class="banner-badge-text">TAIWAN HERB RAG ‧ 風土專家語意諮詢茶堂</span>
        </div>
        <h2 class="consult-main-title">
          <span>坐聽山嵐風土，</span>
          <em>請益本草耆老與風土達人</em>
        </h2>
        <p class="consult-subtitle">
          結合在地草藥知識庫與檢索增強生成（RAG），依循台灣四百年青草風土民俗記錄，純粹說明古早民間智慧與生活茶飲文化分享，不具備任何醫療效果宣稱。
        </p>
      </div>
    </div>

    <!-- 古早知識分享與醫療免責告示牌匾 -->
    <div class="consult-legal-disclaimer-strip">
      <div class="strip-icon">⚖️</div>
      <div class="strip-text">
        <strong>【民間文化知識分享與非醫療宣告】</strong>
        本諮詢茶堂純屬臺灣常民傳統青草生活經驗、古早本草記載與風土民俗知識之交流分享，<strong>嚴禁且絕無宣稱任何醫療效果，亦非醫療行為或處方診斷</strong>。個人體質各異，若有疾病、身體不適或正接受治療，請務必尋求合格專業中西醫師診治。
      </div>
    </div>

    <!-- 專家 Persona 選擇抽屜廊 -->
    <div class="experts-selector-section">
      <div class="experts-section-header">
        <span class="sub-seal">名錄</span>
        <span class="experts-header-title">選擇請益專家（切換不同回答風格與視角）</span>
      </div>

      <div class="experts-cards-grid">
        <div
          v-for="exp in experts"
          :key="exp.id"
          class="expert-card"
          :class="{ active: currentExpertId === exp.id }"
          @click="selectExpert(exp.id)"
        >
          <div class="expert-card-top">
            <span class="expert-avatar">{{ exp.avatar }}</span>
            <span class="expert-seal-stamp">{{ exp.seal || '名師' }}</span>
          </div>
          <div class="expert-name-row">
            <h4 class="expert-name">{{ exp.name }}</h4>
            <span class="expert-region-pill">{{ exp.region.split(' ')[0] }}</span>
          </div>
          <div class="expert-title">{{ exp.title }}</div>
          <div class="expert-catchphrase">{{ exp.catchphrase }}</div>
          <div class="expert-tags">
            <span v-for="tag in exp.expertise" :key="tag" class="expert-tag-item">
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 諮詢問答主舞台 -->
    <div class="consult-stage">
      <!-- 快捷情境提問 Chips -->
      <div class="preset-questions-bar">
        <span class="preset-label">💡 推薦風土提問：</span>
        <button
          v-for="preset in currentPresetQuestions"
          :key="preset"
          class="preset-chip"
          @click="usePreset(preset)"
        >
          {{ preset }}
        </button>
      </div>

      <!-- 輸入互動列 -->
      <div class="consult-input-card">
        <div class="consult-input-wrapper">
          <textarea
            v-model="inputQuery"
            class="consult-textarea"
            rows="3"
            placeholder="請描述您的體質狀態、生活疑惑、或想調配的台灣青草茶飲...（例如：夏天常常吹冷氣頭昏腦脹，該喝什麼草藥退火？）"
            :disabled="isLoading"
            @keydown.enter.prevent="handleEnter"
          ></textarea>
        </div>
        <div class="consult-input-bottom">
          <div class="current-expert-hint">
            當前請益：<strong>{{ currentExpert.name }}</strong>（{{ currentExpert.title }}）
          </div>
          <button
            class="btn-consult-submit"
            :disabled="!inputQuery.trim() || isLoading"
            @click="submitConsultation"
          >
            <span v-if="isLoading" class="spinner-inline">⏳ 檢索深思中...</span>
            <span v-else>🍵 請益叩問 (Enter)</span>
          </button>
        </div>
      </div>

      <!-- 諮詢回答展開區 -->
      <div v-if="lastResult" class="consult-result-wrapper">
        <div class="result-scroll-plate">
          <!-- 專家回答頂部標籤 -->
          <div class="result-header">
            <div class="result-expert-info">
              <span class="result-expert-avatar">{{ lastResult.expert.avatar }}</span>
              <div>
                <div class="result-expert-name">{{ lastResult.expert.name }} · 開卷解方</div>
                <div class="result-expert-title">{{ lastResult.expert.title }}</div>
              </div>
            </div>
            <div class="result-query-tag">
              「{{ lastResult.query }}」
            </div>
          </div>

          <!-- 回答主文 (支援豐富排版) -->
          <div class="result-body markdown-rendered" v-html="renderedReplyHtml"></div>

          <!-- RAG 引證本草知識卡 (Citations Cards) -->
          <div v-if="lastResult.citations && lastResult.citations.length" class="citations-section">
            <div class="citations-header">
              <span class="citation-seal">引證</span>
              <span class="citations-title">本草知識庫檢索引證標本（點擊即刻開卷查閱詳情）</span>
            </div>
            <div class="citations-cards-grid">
              <div
                v-for="citation in lastResult.citations"
                :key="citation.id"
                class="citation-card"
                @click="$emit('select-herb-id', citation.id)"
              >
                <div class="citation-thumb-wrap">
                  <img :src="citation.thumbnailUrl" :alt="citation.name" class="citation-thumb" />
                  <span class="citation-nature-tag">{{ citation.nature }}</span>
                </div>
                <div class="citation-info">
                  <div class="citation-name-row">
                    <strong class="citation-name">{{ citation.name }}</strong>
                    <span class="citation-cat">{{ citation.category }}</span>
                  </div>
                  <div class="citation-scientific">{{ citation.scientificName }}</div>
                  <div class="citation-reason">📌 {{ citation.relevanceReason }}</div>
                  <div class="citation-open-hint">點擊展開標本 ➔</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 專家建議追問 (Suggested Questions) -->
          <div v-if="lastResult.suggestedQuestions && lastResult.suggestedQuestions.length" class="followup-section">
            <span class="followup-title">💭 {{ lastResult.expert.name }} 建議您進一步請益：</span>
            <div class="followup-chips">
              <button
                v-for="q in lastResult.suggestedQuestions"
                :key="q"
                class="followup-chip"
                @click="usePreset(q)"
              >
                {{ q }} ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { HerbApi } from '../services/api';
import { audio } from '../services/audioService';

const emit = defineEmits(['select-herb-id']);

const experts = ref([]);
const currentExpertId = ref('wanhua_uncle');
const inputQuery = ref('');
const isLoading = ref(false);
const lastResult = ref(null);

const currentExpert = computed(() => {
  return experts.value.find(e => e.id === currentExpertId.value) || {
    name: '林萬吉 老茶師',
    title: '萬華西昌街百年青草巷第三代傳人',
    avatar: '🍵'
  };
});

const presetMap = {
  wanhua_uncle: [
    '夏天常常吹冷氣頭昏腦脹、喉嚨又乾又痛，青草伯救命！',
    '最近天天熬夜加班火氣大、嘴破長痘痘，想煮退火青草茶',
    '萬華老店的青草茶，一般都是用哪些台灣在地青草熬煮的？'
  ],
  hakka_grandmother: [
    '客家傳統小兒受驚啼哭、夜不安寧，用什麼草沐浴安神？',
    '如果家裡有剛生產完的媳婦坐月子，大風草要怎麼煮水擦澡？',
    '阿婆，紫蘇跟桑葉在客庄家裡平時都怎麼煮成茶喝？'
  ],
  pharmacist_phd: [
    '陳博士，魚腥草與金銀花的抗菌活性成分是什麼？高溫煎煮會破壞嗎？',
    '有長期服用高血壓西藥的人，飲用大花咸豐草茶會有交互作用嗎？',
    '現代生藥學如何看待穿心蓮與山苦瓜的消炎與代謝調控潛力？'
  ],
  indigenous_forager: [
    '督邁達人，原住民部落的刺蔥（Tana）在山林野炊都怎麼料理？',
    '台灣低海拔山野常見的山苦瓜跟昭和草，有什麼天然滋補特點？',
    '走進山林採集野草時，獵人有哪些保護土地的傳統倫理？'
  ]
};

const currentPresetQuestions = computed(() => {
  return presetMap[currentExpertId.value] || presetMap.wanhua_uncle;
});

// 簡單 Markdown 渲染為語意 HTML
const renderedReplyHtml = computed(() => {
  if (!lastResult.value?.reply) return '';
  const text = lastResult.value.reply;
  
  // 基礎替換
  let html = text
    .replace(/^### (.*$)/gim, '<h4 class="md-h4">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="md-h3">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 class="md-h2">$1</h2>')
    .replace(/^\> (.*$)/gim, '<blockquote class="md-quote">$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li class="md-li">$1</li>')
    .replace(/\n\n/gim, '<p class="md-p"></p>');

  return html;
});

onMounted(async () => {
  try {
    const list = await HerbApi.getConsultExperts();
    if (list && list.length) {
      experts.value = list;
    }
  } catch (err) {
    console.error('載入專家清單失敗:', err);
  }
});

const selectExpert = (id) => {
  audio.playClick();
  currentExpertId.value = id;
};

const usePreset = (text) => {
  audio.playWaterDrop();
  inputQuery.value = text;
  submitConsultation();
};

const handleEnter = (e) => {
  if (!e.shiftKey) {
    submitConsultation();
  }
};

const submitConsultation = async () => {
  if (!inputQuery.value.trim() || isLoading.value) return;

  const query = inputQuery.value.trim();
  isLoading.value = true;
  audio.playWaterDrop();

  try {
    const result = await HerbApi.consult(query, currentExpertId.value);
    lastResult.value = result;
    audio.playChime(580);
  } catch (err) {
    console.error('諮詢失敗:', err);
    alert('專家諮詢生成失敗，請稍候重試：' + err.message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.consult-lab-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

/* 頂部牌匾 */
.consult-banner {
  background: linear-gradient(135deg, rgba(27, 67, 50, 0.95), rgba(45, 106, 79, 0.9)),
              url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=80') center/cover;
  border-radius: 18px;
  padding: 40px 32px;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.consult-seal-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  padding: 4px 14px 4px 6px;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 0.8px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.banner-seal {
  width: 24px;
  height: 24px;
  background: var(--amber);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 11px;
  font-weight: bold;
}

.consult-main-title {
  font-family: var(--font-serif);
  font-size: 32px;
  line-height: 1.3;
  margin-bottom: 12px;
}

.consult-main-title em {
  font-style: normal;
  color: #e2a058;
  display: block;
}

.consult-subtitle {
  font-size: 14.5px;
  opacity: 0.9;
  max-width: 780px;
  line-height: 1.6;
}

/* 專家選擇廊 */
.experts-selector-section {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 22px;
  box-shadow: var(--shadow-sm);
}

.experts-section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.sub-seal {
  font-family: var(--font-serif);
  font-weight: bold;
  background: var(--primary-pale);
  color: var(--primary-deep);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
}

.experts-header-title {
  font-family: var(--font-serif);
  font-size: 16px;
  font-weight: bold;
  color: var(--primary-deep);
}

.experts-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.expert-card {
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
}

.expert-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
}

.expert-card.active {
  background: var(--bg-card);
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--primary), var(--shadow-md);
}

.expert-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.expert-avatar {
  font-size: 28px;
}

.expert-seal-stamp {
  font-family: var(--font-serif);
  font-size: 11px;
  background: var(--amber-deep);
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.expert-name-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.expert-name {
  font-family: var(--font-serif);
  font-size: 16px;
  color: var(--primary-deep);
}

.expert-region-pill {
  font-size: 11px;
  background: var(--primary-pale);
  color: var(--primary-deep);
  padding: 1px 6px;
  border-radius: 8px;
}

.expert-title {
  font-size: 12px;
  color: var(--ink-muted);
  margin-bottom: 8px;
}

.expert-catchphrase {
  font-size: 12px;
  color: var(--ink-body);
  font-style: italic;
  line-height: 1.45;
  margin-bottom: 12px;
  flex-grow: 1;
}

.expert-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.expert-tag-item {
  font-size: 10.5px;
  background: var(--bg-subtle);
  color: var(--ink-muted);
  padding: 2px 6px;
  border-radius: 4px;
}

/* 諮詢舞台 */
.consult-stage {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.preset-questions-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.preset-label {
  color: var(--ink-muted);
  font-size: 12.5px;
}

.preset-chip {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  color: var(--ink-body);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.preset-chip:hover {
  background: var(--primary-pale);
  color: var(--primary-deep);
  border-color: var(--primary-light);
}

/* 輸入框 */
.consult-input-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.consult-textarea {
  width: 100%;
  border: 1px solid var(--border-light);
  border-radius: 10px;
  padding: 14px;
  font-family: inherit;
  font-size: 15px;
  color: var(--ink-heavy);
  background: var(--bg-parchment);
  resize: vertical;
  line-height: 1.6;
  outline: none;
  transition: border-color 0.2s;
}

.consult-textarea:focus {
  border-color: var(--primary);
  background: #fff;
}

.consult-input-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  flex-wrap: wrap;
  gap: 10px;
}

.current-expert-hint {
  font-size: 13px;
  color: var(--ink-muted);
}

.btn-consult-submit {
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.25);
  transition: all 0.2s;
}

.btn-consult-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(45, 106, 79, 0.35);
}

.btn-consult-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 結果呈現卷軸 */
.consult-result-wrapper {
  animation: fadeIn 0.4s ease-out;
}

.result-scroll-plate {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 18px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  position: relative;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.result-expert-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.result-expert-avatar {
  font-size: 36px;
}

.result-expert-name {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-deep);
}

.result-expert-title {
  font-size: 12.5px;
  color: var(--ink-muted);
}

.result-query-tag {
  background: var(--bg-subtle);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  color: var(--ink-body);
}

/* Markdown 排版樣式 */
.result-body {
  font-size: 15.5px;
  line-height: 1.8;
  color: var(--ink-body);
  margin-bottom: 30px;
}

:deep(.md-h2), :deep(.md-h3), :deep(.md-h4) {
  font-family: var(--font-serif);
  color: var(--primary-deep);
  margin-top: 24px;
  margin-bottom: 12px;
}

:deep(.md-quote) {
  background: var(--amber-light);
  border-left: 4px solid var(--amber-deep);
  padding: 12px 18px;
  margin: 18px 0;
  border-radius: 0 8px 8px 0;
  font-size: 14.5px;
  color: var(--ink-heavy);
}

:deep(.md-li) {
  margin-left: 20px;
  margin-bottom: 6px;
}

/* Citations 引證卡 */
.citations-section {
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  padding: 20px;
  margin-top: 24px;
}

.citations-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.citation-seal {
  background: var(--amber-deep);
  color: #fff;
  font-family: var(--font-serif);
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.citations-title {
  font-family: var(--font-serif);
  font-size: 14.5px;
  font-weight: bold;
  color: var(--primary-deep);
}

.citations-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.citation-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.citation-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
  box-shadow: var(--shadow-sm);
}

.citation-thumb-wrap {
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

.citation-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.citation-nature-tag {
  position: absolute;
  bottom: 2px;
  right: 2px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 4px;
}

.citation-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.citation-name-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.citation-name {
  font-family: var(--font-serif);
  font-size: 15px;
  color: var(--primary-deep);
}

.citation-cat {
  font-size: 11px;
  color: var(--ink-muted);
}

.citation-scientific {
  font-size: 11px;
  font-style: italic;
  color: var(--ink-muted);
  margin-bottom: 4px;
}

.citation-reason {
  font-size: 11.5px;
  color: var(--ink-body);
  margin-bottom: 6px;
}

.citation-open-hint {
  font-size: 11px;
  color: var(--primary);
  font-weight: bold;
  margin-top: auto;
}

/* 追問區 */
.followup-section {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px dashed var(--border-light);
}

.followup-title {
  font-size: 13.5px;
  color: var(--ink-muted);
  display: block;
  margin-bottom: 10px;
}

.followup-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.followup-chip {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: var(--primary-deep);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.2s;
}

.followup-chip:hover {
  background: var(--primary-pale);
  border-color: var(--primary);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.consult-legal-disclaimer-strip {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-left: 4px solid var(--amber-deep);
  border-radius: 12px;
  padding: 12px 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-sm);
}

.strip-icon {
  font-size: 20px;
}

.strip-text {
  font-size: 13px;
  color: var(--ink-muted);
  line-height: 1.5;
}

.strip-text strong {
  color: var(--primary-deep);
}
</style>
