<template>
  <div class="medicinal-diet-container">
    <!-- 頂部氣派牌匾與典籍淵源介紹 -->
    <header class="diet-banner">
      <div class="diet-banner-content">
        <div class="diet-seal-badge">
          <span class="banner-seal">食療</span>
          <span class="banner-badge-text">TAIWAN MEDICINAL DIET PAVILION · 藥膳食療名著典藏館</span>
        </div>
        <h2 class="diet-main-title">
          <span>四氣調陰陽，五味養臟腑，</span>
          <em>《藥膳學》經典食療與餐桌養生</em>
        </h2>
        <p class="diet-subtitle">
          收錄文興出版《藥膳學》（李昭瑩、王儀絜、黃世勳 編著）典籍之 <strong>110 味</strong> 常用藥材與餐桌食材。
          本館特設 <strong>李昭瑩名師 RAG 智慧問答</strong>，為您逐一解密四氣五味、挑選品質、隔水燉煮心法與主治宜忌。
        </p>
      </div>

      <!-- 右側快速統計卡 -->
      <div class="diet-stats-box">
        <div class="diet-stat-item">
          <span class="stat-num">{{ dietItems.length }}</span>
          <span class="stat-label">味食材藥材</span>
        </div>
        <div class="diet-stat-divider"></div>
        <div class="diet-stat-item">
          <span class="stat-num">25</span>
          <span class="stat-label">道名師配方</span>
        </div>
        <div class="diet-stat-divider"></div>
        <div class="diet-stat-item">
          <span class="stat-num">100%</span>
          <span class="stat-label">RAG 頁碼考證</span>
        </div>
      </div>
    </header>

    <!-- 藥膳食療文化與非醫療免責聲明 -->
    <div class="diet-legal-strip">
      <div class="strip-icon">⚖️</div>
      <div class="strip-text">
        <strong>【常民養生與非醫療聲明】</strong>
        本館內容源自《藥膳學》中醫食療與家常烹飪知識，屬日常調理與養生保健之學術文獻整理，
        <strong>非屬醫療處方或診斷</strong>。罹患急性病症、孕婦或特殊慢性病體質者，調理前請先諮詢合格醫師或中醫師。
      </div>
    </div>

    <!-- 主體內容雙欄工作區：左側食材檢索與圖鑑卡片，右側李昭瑩名師 RAG 智慧問答 -->
    <div class="diet-workspace-grid">
      <!-- 左欄：食材篩選、搜尋與清單 -->
      <section class="diet-catalog-section">
        <!-- 搜尋與分類過濾列 -->
        <div class="diet-controls-bar">
          <div class="search-input-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              class="diet-search-input"
              placeholder="搜尋食材名、性味歸經、主治、經典菜餚（如天麻、苦瓜、羊肉、隔水燉）..."
              @keyup.enter="handleSearch"
            />
            <button v-if="searchQuery" class="clear-search-btn" @click="searchQuery = ''; activeCategory = 'all'">✕</button>
          </div>

          <!-- 分類標籤滑動列 -->
          <div class="category-tabs-row">
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="cat-tab-btn"
              :class="{ active: activeCategory === cat.id }"
              @click="activeCategory = cat.id"
            >
              <span class="cat-icon">{{ cat.icon }}</span>
              <span class="cat-name">{{ cat.name }}</span>
              <span class="cat-count">({{ getCategoryCount(cat.id) }})</span>
            </button>
          </div>
        </div>

        <!-- 快速統計提示 -->
        <div class="results-meta-row">
          <span>共篩選出 <strong>{{ filteredItems.length }}</strong> 味食藥材</span>
          <span v-if="selectedItem" class="selected-hint">
            當前選中：<strong>{{ selectedItem.name }}</strong>（點擊卡片可換選，右側連動 RAG 智慧問答）
          </span>
        </div>

        <!-- 食材卡片瀑布流網格 -->
        <div v-if="loading" class="diet-loading-state">
          <div class="diet-spinner"></div>
          <p>正在研讀《藥膳學》典藏文獻中...</p>
        </div>

        <div v-else-if="filteredItems.length === 0" class="diet-empty-state">
          <span class="empty-icon">🍃</span>
          <p>未找到符合條件的藥膳食材，請嘗試其他關鍵字或切換分類標籤。</p>
          <button class="btn-reset-filter" @click="resetFilters">重設篩選條件</button>
        </div>

        <div v-else class="diet-cards-grid">
          <article
            v-for="item in filteredItems"
            :key="item.id"
            class="diet-card"
            :class="{ active: selectedItem && selectedItem.id === item.id }"
            @click="selectItem(item)"
          >
            <div class="card-top-tag">
              <span class="page-tag">{{ item.bookRef || ('第' + item.page + '頁') }}</span>
              <span class="subcat-tag">{{ item.subCategory || item.categoryName }}</span>
            </div>

            <div class="card-title-row">
              <h3 class="item-name">{{ item.name }}</h3>
              <span class="nature-pill" :class="getNatureClass(item.natureFlavor)">
                {{ getNatureShort(item.natureFlavor) }}
              </span>
            </div>

            <div class="card-detail-line">
              <span class="label">【來源】</span>
              <span class="val">{{ item.source || '本草典藏' }}</span>
            </div>

            <div class="card-detail-line">
              <span class="label">【性味】</span>
              <span class="val">{{ item.natureFlavor }}</span>
            </div>

            <div class="card-detail-line">
              <span class="label">【功效】</span>
              <span class="val line-clamp-2">{{ item.functions }}</span>
            </div>

            <div class="card-recipe-box" v-if="item.medicinalDiet">
              <span class="recipe-icon">🍲</span>
              <span class="recipe-text"><strong>經典菜餚：</strong>{{ item.medicinalDiet }}</span>
            </div>

            <div class="card-action-bar">
              <button class="btn-card-ask" @click.stop="askAboutItem(item)">
                <span>💬 考證此食藥材</span>
              </button>
              <button class="btn-card-detail" @click.stop="openModal(item)">
                <span>📖 詳讀全文</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- 右欄：李昭瑩名師 RAG 專屬智慧食療問答視窗 -->
      <aside class="diet-rag-aside">
        <div class="rag-chat-card">
          <!-- 專家抬頭 -->
          <div class="rag-header">
            <div class="expert-avatar-wrap">
              <span class="expert-avatar">🍲</span>
              <span class="online-indicator" title="在線解答中"></span>
            </div>
            <div class="expert-info">
              <h4 class="expert-title">李昭瑩 藥膳食療名師</h4>
              <p class="expert-sub">《藥膳學》編著者 · 四氣五味與餐桌養生名師</p>
            </div>
            <button class="btn-reset-chat" title="重啟對話" @click="resetChat">
              <span>🔄</span>
            </button>
          </div>

          <!-- 快捷問答標籤建議 -->
          <div class="quick-prompts-bar">
            <span class="prompts-label">名師導引：</span>
            <button
              v-for="(p, idx) in suggestedPrompts"
              :key="idx"
              class="quick-pill"
              @click="submitQuestion(p)"
            >
              {{ p }}
            </button>
          </div>

          <!-- 聊天對話流 -->
          <div ref="chatScrollRef" class="rag-messages-box">
            <div
              v-for="(msg, idx) in chatMessages"
              :key="idx"
              class="chat-bubble-row"
              :class="msg.role"
            >
              <div class="bubble-avatar">
                {{ msg.role === 'user' ? '🧑‍🍳' : '🍲' }}
              </div>
              <div class="bubble-content-wrap">
                <div class="bubble-sender-name">
                  {{ msg.role === 'user' ? '您的提問' : '李昭瑩 名師 (RAG 典籍解答)' }}
                </div>
                <div class="bubble-text" v-html="renderMarkdown(msg.text)"></div>

                <!-- 考證出處 Citations 卡片 -->
                <div v-if="msg.citations && msg.citations.length" class="citations-container">
                  <div class="citations-title">
                    <span>📚 《藥膳學》典籍考證依據：</span>
                  </div>
                  <div class="citations-list">
                    <div
                      v-for="(cite, cIdx) in msg.citations"
                      :key="cIdx"
                      class="cite-badge"
                    >
                      <span class="cite-name">{{ cite.name }}</span>
                      <span class="cite-ref">{{ cite.bookRef || ('第' + cite.page + '頁') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 加載思考動畫 -->
            <div v-if="isAsking" class="chat-bubble-row assistant">
              <div class="bubble-avatar">🍲</div>
              <div class="bubble-content-wrap">
                <div class="bubble-sender-name">李昭瑩 名師正在檢索《藥膳學》原文...</div>
                <div class="thinking-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>

          <!-- 提問輸入列 -->
          <div class="rag-input-area">
            <textarea
              v-model="inputQuery"
              rows="2"
              class="rag-textarea"
              placeholder="請教李昭瑩名師：例如「天麻燉豬腦有何禁忌？」、「虛寒體質推薦何種溫補藥膳？」..."
              @keydown.enter.prevent="handleEnter"
            ></textarea>
            <button
              class="btn-send-question"
              :disabled="!inputQuery.trim() || isAsking"
              @click="submitQuestion(inputQuery)"
            >
              <span v-if="!isAsking">發送請益 ➔</span>
              <span v-else>檢索中...</span>
            </button>
          </div>
        </div>
      </aside>
    </div>

    <!-- 食材完整考證彈跳視窗 Modal -->
    <div v-if="modalItem" class="diet-modal-backdrop" @click.self="modalItem = null">
      <div class="diet-modal-dialog">
        <header class="modal-header">
          <div class="modal-seal-tag">{{ modalItem.categoryName }}</div>
          <h3 class="modal-item-title">{{ modalItem.name }}</h3>
          <span class="modal-page-ref">{{ modalItem.bookRef || ('《藥膳學》第' + modalItem.page + '頁') }}</span>
          <button class="btn-close-modal" @click="modalItem = null">✕</button>
        </header>

        <div class="modal-body">
          <div class="modal-meta-grid">
            <div class="meta-card">
              <span class="meta-label">四氣五味與歸經</span>
              <p class="meta-val highlight">{{ modalItem.natureFlavor }}</p>
            </div>
            <div class="meta-card">
              <span class="meta-label">部位與來源來源</span>
              <p class="meta-val">{{ modalItem.source || '植物/臟腑來源' }}</p>
            </div>
            <div class="meta-card">
              <span class="meta-label">品質挑選要訣</span>
              <p class="meta-val">{{ modalItem.quality || '以質地堅實、色正無雜質者為佳。' }}</p>
            </div>
            <div class="meta-card">
              <span class="meta-label">現代經典方劑</span>
              <p class="meta-val">{{ modalItem.prescriptions || '常隨症加減配伍。' }}</p>
            </div>
          </div>

          <div class="modal-section-box">
            <h4 class="box-title">🌿 功效與主治調養</h4>
            <p class="box-text"><strong>功能：</strong>{{ modalItem.functions }}</p>
            <p class="box-text"><strong>主治：</strong>{{ modalItem.indications }}</p>
          </div>

          <div class="modal-section-box highlight-box" v-if="modalItem.medicinalDiet">
            <h4 class="box-title">🍲 經典藥膳料理推薦</h4>
            <p class="box-text">{{ modalItem.medicinalDiet }}</p>
          </div>

          <div class="modal-section-box note-box" v-if="modalItem.notes">
            <h4 class="box-title">💡 李昭瑩名師烹飪心法與宜忌叮嚀</h4>
            <p class="box-text">{{ modalItem.notes }}</p>
          </div>
        </div>

        <footer class="modal-footer">
          <button class="btn-modal-ask" @click="askAboutItem(modalItem); modalItem = null">
            <span>🍲 一鍵請教李昭瑩名師此食材配方 ➔</span>
          </button>
          <button class="btn-modal-close" @click="modalItem = null">關閉</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

const loading = ref(false);
const dietItems = ref([]);
const searchQuery = ref('');
const activeCategory = ref('all');
const selectedItem = ref(null);
const modalItem = ref(null);
const inputQuery = ref('');
const isAsking = ref(false);
const chatScrollRef = ref(null);

const categories = [
  { id: 'all', name: '全部食藥材', icon: '🌿' },
  { id: 'herb_warm_hot', name: '溫熱藥材', icon: '🔥' },
  { id: 'herb_cool_cold', name: '寒涼藥材', icon: '❄️' },
  { id: 'herb_neutral', name: '平性藥材', icon: '⚖️' },
  { id: 'food_vegetable', name: '餐桌蔬菜', icon: '🥬' },
  { id: 'food_fruit_nut', name: '水果堅果', icon: '🍎' },
  { id: 'food_grain_bean', name: '穀豆糧油', icon: '🌾' },
  { id: 'food_meat_seafood', name: '肉禽水產', icon: '🦐' },
  { id: 'food_viscera', name: '臟腑部位', icon: '🫀' },
  { id: 'theory_culinary', name: '烹調工藝', icon: '🍲' },
];

const suggestedPrompts = [
  '天麻隔水燉豬腦的食療功效與作法？',
  '什麼是四氣五味？寒熱體質如何選食材？',
  '山藥茯苓健脾包子適合什麼體質？',
  '冬季氣血大補湯與當歸生薑羊肉湯的差別？',
];

const chatMessages = ref([
  {
    role: 'assistant',
    text: `您好！我是李昭瑩。在《藥膳學》的體系中，我們強調**「四氣調陰陽、五味合臟腑」**。

歡迎在此檢索 110 味藥膳食材，或點選左側卡片。若您有任何食材配伍、節氣藥膳或隔水燉煮烹調上的疑問，隨時向我提問，我將根據《藥膳學》典籍為您細緻解答！`,
    citations: [
      { name: '《藥膳學》緒論與常用藥材', bookRef: '文興出版 第1-133頁' }
    ]
  }
]);

// 載入資料
async function fetchDietItems() {
  loading.value = true;
  try {
    const res = await fetch('/api/diet');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      dietItems.value = json.data;
      if (dietItems.value.length > 0) {
        selectedItem.value = dietItems.value[0];
      }
    }
  } catch (err) {
    console.error('Failed to load diet items:', err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchDietItems();
});

// 計算分類計數
function getCategoryCount(catId) {
  if (catId === 'all') return dietItems.value.length;
  return dietItems.value.filter(item => item.category === catId).length;
}

// 篩選食材
const filteredItems = computed(() => {
  let list = dietItems.value;
  if (activeCategory.value !== 'all') {
    list = list.filter(item => item.category === activeCategory.value);
  }
  if (searchQuery.value && searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter(item => {
      return (
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.functions && item.functions.toLowerCase().includes(q)) ||
        (item.indications && item.indications.toLowerCase().includes(q)) ||
        (item.natureFlavor && item.natureFlavor.toLowerCase().includes(q)) ||
        (item.medicinalDiet && item.medicinalDiet.toLowerCase().includes(q)) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(q)) ||
        (item.source && item.source.toLowerCase().includes(q)) ||
        (item.notes && item.notes.toLowerCase().includes(q))
      );
    });
  }
  return list;
});

function getNatureShort(natureFlavor) {
  if (!natureFlavor) return '平';
  if (natureFlavor.includes('大溫') || natureFlavor.includes('大熱')) return '大溫熱';
  if (natureFlavor.includes('溫')) return '溫性';
  if (natureFlavor.includes('大寒') || natureFlavor.includes('寒')) return '寒涼';
  if (natureFlavor.includes('涼')) return '涼性';
  return '平性';
}

function getNatureClass(natureFlavor) {
  if (!natureFlavor) return 'nature-neutral';
  if (natureFlavor.includes('溫') || natureFlavor.includes('熱')) return 'nature-warm';
  if (natureFlavor.includes('寒') || natureFlavor.includes('涼')) return 'nature-cold';
  return 'nature-neutral';
}

function selectItem(item) {
  selectedItem.value = item;
}

function openModal(item) {
  modalItem.value = item;
}

function resetFilters() {
  searchQuery.value = '';
  activeCategory.value = 'all';
}

function askAboutItem(item) {
  selectedItem.value = item;
  const prompt = `${item.name}在《藥膳學》中的性味功效、品質挑選要訣與推薦藥膳料理作法是什麼？`;
  submitQuestion(prompt);
}

function handleEnter(e) {
  if (!e.shiftKey) {
    submitQuestion(inputQuery.value);
  }
}

async function submitQuestion(text) {
  if (!text || !text.trim() || isAsking.value) return;
  const q = text.trim();
  inputQuery.value = '';

  // 加入使用者問題
  chatMessages.value.push({
    role: 'user',
    text: q
  });

  scrollToBottom();
  isAsking.value = true;

  try {
    const res = await fetch('/api/consult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: q,
        expertId: 'yaoshan_master'
      })
    });
    const json = await res.json();
    if (json.success && json.data) {
      chatMessages.value.push({
        role: 'assistant',
        text: json.data.reply || json.data.answer || '李昭瑩名師已為您梳理相關食療典藏記錄。',
        citations: json.data.citations || []
      });
    } else {
      chatMessages.value.push({
        role: 'assistant',
        text: json.message || '抱歉，暫時無法檢索到《藥膳學》相關記錄，請稍後再試。',
        citations: []
      });
    }
  } catch (err) {
    console.error('Consultation error:', err);
    chatMessages.value.push({
      role: 'assistant',
      text: '網路連線異常，無法與後端 RAG 引擎通訊，請檢查網路設置。',
      citations: []
    });
  } finally {
    isAsking.value = false;
    scrollToBottom();
  }
}

function resetChat() {
  chatMessages.value = [
    {
      role: 'assistant',
      text: `已重設對話。我是李昭瑩名師，請問今天想了解哪一道藥膳、或哪一味《藥膳學》食材的性味歸經與烹飪心法？`,
      citations: []
    }
  ];
}

function scrollToBottom() {
  nextTick(() => {
    if (chatScrollRef.value) {
      chatScrollRef.value.scrollTop = chatScrollRef.value.scrollHeight;
    }
  });
}

function renderMarkdown(text) {
  if (!text) return '';
  // 簡易安全 Markdown 渲染（粗體、斜體、清單、段落換行）
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 粗體
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // 斜體
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // 標題
  html = html.replace(/^### (.*$)/gim, '<h5 class="md-h5">$1</h5>');
  html = html.replace(/^## (.*$)/gim, '<h4 class="md-h4">$1</h4>');
  // 分隔線
  html = html.replace(/---/g, '<hr class="md-hr" />');
  // 換行
  html = html.replace(/\n\n/g, '<p></p>');
  html = html.replace(/\n/g, '<br />');

  return html;
}
</script>

<style scoped>
.medicinal-diet-container {
  max-width: 1560px;
  margin: 0 auto;
  padding: 24px 20px 60px;
  color: #2c3e50;
}

/* 頂部橫幅 */
.diet-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  background: linear-gradient(135deg, rgba(247, 243, 233, 0.95), rgba(238, 230, 213, 0.9));
  border: 1px solid #d4c5a9;
  border-radius: 16px;
  padding: 32px 36px;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(45, 30, 15, 0.06);
}

.diet-seal-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.banner-seal {
  background: #a8422b;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 6px;
  letter-spacing: 2px;
}

.banner-badge-text {
  font-size: 12px;
  color: #6e5c46;
  font-weight: 600;
  letter-spacing: 1.5px;
}

.diet-main-title {
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: 800;
  color: #2e261f;
  line-height: 1.35;
}

.diet-main-title em {
  font-style: normal;
  color: #923820;
}

.diet-subtitle {
  margin: 0;
  font-size: 14.5px;
  color: #554838;
  line-height: 1.65;
  max-width: 820px;
}

.diet-stats-box {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid #d9cbaf;
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.diet-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 24px;
  font-weight: 800;
  color: #923820;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: #7a6a57;
  margin-top: 4px;
}

.diet-stat-divider {
  width: 1px;
  height: 32px;
  background: #e2d7c3;
}

/* 免責宣告橫條 */
.diet-legal-strip {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fdf6ec;
  border: 1px solid #faecd8;
  border-left: 4px solid #e6a23c;
  border-radius: 8px;
  padding: 12px 18px;
  font-size: 13px;
  color: #7d5a23;
  line-height: 1.55;
  margin-bottom: 24px;
}

.strip-icon {
  font-size: 18px;
}

/* 雙欄主工作區 */
.diet-workspace-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

/* 左側食材庫清單 */
.diet-catalog-section {
  background: #fff;
  border: 1px solid #e6dcce;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
}

.diet-controls-bar {
  margin-bottom: 18px;
}

.search-input-box {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.search-icon {
  position: absolute;
  left: 14px;
  font-size: 16px;
  color: #8c7b68;
}

.diet-search-input {
  width: 100%;
  padding: 12px 38px 12px 42px;
  font-size: 14px;
  border: 1px solid #d4c7b4;
  border-radius: 10px;
  background: #faf7f2;
  color: #2c3e50;
  transition: all 0.2s;
}

.diet-search-input:focus {
  outline: none;
  border-color: #a8422b;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(168, 66, 43, 0.12);
}

.clear-search-btn {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 14px;
  color: #999;
  cursor: pointer;
}

/* 分類標籤 */
.category-tabs-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cat-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f7f3ed;
  border: 1px solid #ded3c1;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  color: #554838;
  cursor: pointer;
  transition: all 0.2s;
}

.cat-tab-btn:hover {
  background: #eee4d5;
  border-color: #c9bca6;
}

.cat-tab-btn.active {
  background: #a8422b;
  border-color: #a8422b;
  color: #fff;
  box-shadow: 0 2px 8px rgba(168, 66, 43, 0.25);
}

.cat-count {
  font-size: 11px;
  opacity: 0.8;
}

.results-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #7a6a57;
  padding: 8px 4px 14px;
  border-bottom: 1px dashed #e6dcce;
  margin-bottom: 18px;
}

.selected-hint strong {
  color: #a8422b;
}

/* 卡片網格 */
.diet-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  max-height: 820px;
  overflow-y: auto;
  padding-right: 6px;
}

.diet-card {
  background: #faf8f5;
  border: 1px solid #e8decb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  cursor: pointer;
}

.diet-card:hover {
  transform: translateY(-2px);
  border-color: #c9b89c;
  box-shadow: 0 6px 16px rgba(45, 30, 15, 0.08);
  background: #fff;
}

.diet-card.active {
  border-color: #a8422b;
  box-shadow: 0 0 0 2px rgba(168, 66, 43, 0.35);
  background: #fffdfb;
}

.card-top-tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 11.5px;
}

.page-tag {
  background: #e9dec9;
  color: #554433;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.subcat-tag {
  color: #887460;
  font-size: 11px;
}

.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.item-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #27201b;
}

.nature-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
}

.nature-warm {
  background: #fde8e4;
  color: #b33924;
}

.nature-cold {
  background: #e3f2fd;
  color: #1976d2;
}

.nature-neutral {
  background: #edf7ed;
  color: #2e7d32;
}

.card-detail-line {
  font-size: 12.5px;
  line-height: 1.5;
  margin-bottom: 6px;
  color: #4b3e32;
}

.card-detail-line .label {
  color: #8c7965;
  font-weight: 600;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-recipe-box {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  background: #f4ecdf;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  color: #614d3a;
  line-height: 1.45;
  margin-top: 8px;
  margin-bottom: 12px;
}

.card-action-bar {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px dashed #ded4c3;
}

.btn-card-ask {
  flex: 1;
  background: #a8422b;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-card-ask:hover {
  background: #923820;
}

.btn-card-detail {
  background: #f0e6d6;
  color: #4b3e32;
  border: 1px solid #dcd0bc;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-card-detail:hover {
  background: #e6dac6;
}

/* 狀態視窗 */
.diet-loading-state,
.diet-empty-state {
  padding: 48px 20px;
  text-align: center;
  color: #7a6a57;
}

.diet-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e4d8c5;
  border-top-color: #a8422b;
  border-radius: 50%;
  margin: 0 auto 16px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn-reset-filter {
  background: #a8422b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 13px;
  cursor: pointer;
  margin-top: 12px;
}

/* 右側 RAG 問答區 */
.diet-rag-aside {
  position: sticky;
  top: 84px;
}

.rag-chat-card {
  background: #fff;
  border: 1px solid #ded2bf;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  height: 880px;
  box-shadow: 0 8px 28px rgba(45, 30, 15, 0.07);
  overflow: hidden;
}

.rag-header {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #a8422b, #8a3420);
  color: #fff;
  padding: 16px 20px;
}

.expert-avatar-wrap {
  position: relative;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #4caf50;
  border: 2px solid #fff;
  border-radius: 50%;
}

.expert-info {
  flex: 1;
}

.expert-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.expert-sub {
  margin: 2px 0 0;
  font-size: 11.5px;
  opacity: 0.9;
}

.btn-reset-chat {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-reset-chat:hover {
  background: rgba(255, 255, 255, 0.35);
}

.quick-prompts-bar {
  background: #f7f3ed;
  border-bottom: 1px solid #e8decb;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
}

.prompts-label {
  font-size: 12px;
  font-weight: 700;
  color: #7a6a57;
}

.quick-pill {
  background: #fff;
  border: 1px solid #dcd1be;
  border-radius: 14px;
  padding: 4px 12px;
  font-size: 11.5px;
  color: #554838;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-pill:hover {
  border-color: #a8422b;
  color: #a8422b;
  background: #fdf7f5;
}

/* 訊息區域 */
.rag-messages-box {
  flex: 1;
  padding: 18px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #faf8f5;
}

.chat-bubble-row {
  display: flex;
  gap: 12px;
  max-width: 95%;
}

.chat-bubble-row.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.bubble-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #e8ded0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.bubble-content-wrap {
  display: flex;
  flex-direction: column;
}

.bubble-sender-name {
  font-size: 11px;
  color: #8c7b68;
  margin-bottom: 4px;
}

.user .bubble-sender-name {
  text-align: right;
}

.bubble-text {
  background: #fff;
  border: 1px solid #e4d8c6;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 13.5px;
  line-height: 1.65;
  color: #27201b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.user .bubble-text {
  background: #a8422b;
  border-color: #a8422b;
  color: #fff;
}

.citations-container {
  margin-top: 8px;
  background: #f3ece0;
  border: 1px dashed #d9cbaf;
  border-radius: 8px;
  padding: 8px 12px;
}

.citations-title {
  font-size: 11.5px;
  font-weight: 700;
  color: #725e4a;
  margin-bottom: 6px;
}

.citations-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cite-badge {
  background: #fff;
  border: 1px solid #c9bca6;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 11px;
  display: inline-flex;
  gap: 6px;
}

.cite-name {
  font-weight: 700;
  color: #923820;
}

.cite-ref {
  color: #6b5c4b;
}

/* 思考中動畫 */
.thinking-dots {
  display: inline-flex;
  gap: 4px;
  padding: 8px 14px;
  background: #fff;
  border: 1px solid #e4d8c6;
  border-radius: 12px;
}

.thinking-dots span {
  width: 6px;
  height: 6px;
  background: #a8422b;
  border-radius: 50%;
  animation: bounce 1.2s infinite ease-in-out;
}

.thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
.thinking-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* 輸入區域 */
.rag-input-area {
  padding: 14px 18px;
  background: #fff;
  border-top: 1px solid #e4d8c6;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rag-textarea {
  width: 100%;
  border: 1px solid #dcd1be;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13.5px;
  line-height: 1.5;
  color: #2c3e50;
  resize: none;
  background: #faf8f5;
  transition: all 0.2s;
}

.rag-textarea:focus {
  outline: none;
  border-color: #a8422b;
  background: #fff;
  box-shadow: 0 0 0 2px rgba(168, 66, 43, 0.12);
}

.btn-send-question {
  align-self: flex-end;
  background: #a8422b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-send-question:hover:not(:disabled) {
  background: #8e3621;
}

.btn-send-question:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 考證彈窗 Modal */
.diet-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20, 15, 10, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.diet-modal-dialog {
  background: #fff;
  border-radius: 16px;
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.modal-header {
  position: relative;
  background: #fbf7f0;
  border-bottom: 1px solid #ebdcc5;
  padding: 20px 24px;
}

.modal-seal-tag {
  display: inline-block;
  background: #a8422b;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 6px;
}

.modal-item-title {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #27201b;
}

.modal-page-ref {
  display: block;
  font-size: 12px;
  color: #8c7b68;
  margin-top: 4px;
}

.btn-close-modal {
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  font-size: 18px;
  color: #999;
  cursor: pointer;
}

.modal-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.meta-card {
  background: #faf6f0;
  border: 1px solid #ede3d3;
  border-radius: 8px;
  padding: 10px 14px;
}

.meta-label {
  font-size: 11px;
  font-weight: 700;
  color: #887460;
  display: block;
  margin-bottom: 4px;
}

.meta-val {
  margin: 0;
  font-size: 13px;
  color: #2c3e50;
  line-height: 1.45;
}

.meta-val.highlight {
  color: #a8422b;
  font-weight: 700;
}

.modal-section-box {
  background: #faf8f5;
  border: 1px solid #e8dfcf;
  border-radius: 10px;
  padding: 14px 16px;
}

.modal-section-box.highlight-box {
  background: #fdf6ec;
  border-color: #faecd8;
}

.modal-section-box.note-box {
  background: #f4ecdf;
  border-color: #e5dac6;
}

.box-title {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: #4b3e32;
}

.box-text {
  margin: 4px 0;
  font-size: 13px;
  line-height: 1.6;
  color: #3e3226;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #ebdcc5;
  background: #faf7f2;
}

.btn-modal-ask {
  background: #a8422b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.btn-modal-close {
  background: #e8ded0;
  color: #554433;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 13px;
  cursor: pointer;
}

/* 響應式調整 */
@media (max-width: 1024px) {
  .diet-workspace-grid {
    grid-template-columns: 1fr;
  }
  .diet-rag-aside {
    position: static;
  }
  .rag-chat-card {
    height: 600px;
  }
}

@media (max-width: 768px) {
  .diet-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
  }
  .diet-stats-box {
    width: 100%;
    justify-content: space-around;
  }
  .diet-cards-grid {
    grid-template-columns: 1fr;
  }
  .modal-meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
