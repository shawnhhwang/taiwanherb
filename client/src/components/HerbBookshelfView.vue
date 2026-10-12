<template>
  <div class="bookshelf-view-container">
    <!-- 頂部氣派書閣牌匾 -->
    <div class="bookshelf-banner">
      <div class="banner-content">
        <div class="banner-seal-row">
          <span class="banner-seal">藏書</span>
          <span class="banner-badge-text">TAIWAN HERB BOOKSHELF · 草木書閣 · 島嶼青草專書與常民智慧書房</span>
        </div>
        <h2 class="banner-main-title">
          <span>開卷有益，草木傳芳，</span>
          <em>島嶼青草經典藏書閣 · 實體與電子書房</em>
        </h2>
        <p class="banner-subtitle">
          收錄萬華西昌街老茶師、苗栗客庄耆老、現代生技博士與中央山脈獵人親自撰著之本草經典。提供<strong>全書線上免費試閱</strong>、<strong>實體紙本書快速寄送</strong>，以及<strong>電子書跨載具即時雲端閱讀</strong>。
        </p>
      </div>

      <!-- 右側快速數據或藏書統計 -->
      <div class="banner-stats-box">
        <div class="bstat-item">
          <span class="bstat-val">{{ books.length }}</span>
          <span class="bstat-label">部經典專書</span>
        </div>
        <div class="bstat-divider"></div>
        <div class="bstat-item">
          <span class="bstat-val">100%</span>
          <span class="bstat-label">開放免費試閱</span>
        </div>
        <div class="bstat-divider"></div>
        <div class="bstat-item">
          <button class="btn-open-my-cabinet" @click="isMyOrdersOpen = true">
            <span>📖 我的藏書閣</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 文化記錄與非醫療宣告橫條 -->
    <div class="bookshelf-legal-strip">
      <div class="strip-icon">⚖️</div>
      <div class="strip-text">
        <strong>【常民文化典籍與非醫療宣稱】</strong>
        本草閣所列專書記載臺灣數百年常民青草茶、野草洗浴與民間青草生活智慧，屬島嶼風土文化與科普記錄，<strong>非屬西醫或中醫處方診斷</strong>。個人特殊體質請循正規醫師建議。
      </div>
    </div>

    <!-- 篩選控制列 -->
    <div class="bookshelf-filter-bar">
      <!-- 分類標籤切換 -->
      <div class="category-pills">
        <button
          v-for="cat in categoryOptions"
          :key="cat.id"
          class="cat-pill-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectCategory(cat.id)"
        >
          <span>{{ cat.icon }}</span>
          <span>{{ cat.name }}</span>
          <span v-if="cat.id !== '全部'" class="cat-count">({{ getCategoryCount(cat.id) }})</span>
        </button>
      </div>

      <!-- 搜尋與排序群組 -->
      <div class="search-sort-group">
        <div class="shelf-search-box">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜尋書名、作者、ISBN、功效關鍵字..."
            class="shelf-search-input"
            @input="onSearchChange"
          />
          <button v-if="searchQuery" class="search-clear-btn" @click="searchQuery = ''">✕</button>
        </div>

        <select v-model="selectedSort" class="shelf-sort-select" @change="fetchBooks">
          <option value="recommended">⭐ 編輯精選推薦</option>
          <option value="rating">🏆 讀者評分最高</option>
          <option value="newest">📅 最新出版年份</option>
          <option value="price_asc">💰 實體價格：低到高</option>
          <option value="price_desc">💎 實體價格：高到低</option>
        </select>
      </div>
    </div>

    <!-- 載入中狀態 -->
    <div v-if="isLoading" class="loading-state-box">
      <div class="shelf-spinner">🌿</div>
      <p>翻閱島嶼草木書目中，請稍候...</p>
    </div>

    <!-- 空白結果 -->
    <div v-else-if="books.length === 0" class="empty-state-box">
      <div class="empty-icon">🍃</div>
      <h3>未找到符合條件的本草書籍</h3>
      <p>請嘗試其他關鍵字或切換分類標籤</p>
      <button class="btn-reset-filter" @click="resetFilters">重置全部篩選</button>
    </div>

    <!-- 書籍陳列立體網格 -->
    <div v-else class="books-grid">
      <div
        v-for="book in books"
        :key="book.id"
        class="book-card"
      >
        <!-- 書本封面與徽章 -->
        <div class="book-cover-area" :style="{ background: `linear-gradient(135deg, ${book.coverColor || '#1e3a8a'}, #0f172a)` }">
          <div class="book-badge">{{ book.coverBadge || book.categoryName }}</div>
          <div class="book-spine-effect"></div>
          <div class="book-cover-art">
            <span class="cover-big-icon">{{ book.coverIcon || '📖' }}</span>
            <div class="cover-emboss-title">{{ book.title }}</div>
            <div class="cover-author-sub">{{ book.author }}</div>
          </div>
        </div>

        <!-- 書本詳細資訊區 -->
        <div class="book-info-area">
          <div class="book-category-tag">
            <span>{{ book.categoryName }}</span>
            <span class="book-isbn">ISBN: {{ book.isbn }}</span>
          </div>

          <h3 class="book-title" :title="book.title">{{ book.title }}</h3>
          <h4 class="book-subtitle">{{ book.subtitle }}</h4>

          <div class="book-author-row">
            <span class="author-icon">✍️</span>
            <strong class="author-name">{{ book.author }}</strong>
            <span class="author-role">({{ book.authorRole }})</span>
          </div>

          <div class="book-meta-row">
            <div class="rating-box">
              <span class="stars">★★★★★</span>
              <span class="rating-num">{{ book.rating }}</span>
              <span class="review-count">({{ book.reviewCount }} 則好評)</span>
            </div>
            <div class="publisher-meta">
              {{ book.publisher }} · {{ book.pages }} 頁
            </div>
          </div>

          <p class="book-summary-text">{{ book.summary }}</p>

          <!-- 關鍵字標籤 -->
          <div class="book-tags-row">
            <span v-for="tag in (book.tags || []).slice(0, 4)" :key="tag" class="book-tag-pill">
              #{{ tag }}
            </span>
          </div>

          <!-- 價格與規格區塊 -->
          <div class="book-pricing-box">
            <div class="price-spec-row">
              <div class="spec-label">
                <span class="spec-badge physical">📦 實體紙本書</span>
                <span class="spec-format-text">{{ book.pricing?.physical?.format || '平裝全彩' }}</span>
              </div>
              <div class="spec-price">
                <span class="current-price">NT$ {{ book.pricing?.physical?.price }}</span>
                <span v-if="book.pricing?.physical?.originalPrice" class="orig-price">NT$ {{ book.pricing?.physical?.originalPrice }}</span>
              </div>
            </div>

            <div class="price-spec-row">
              <div class="spec-label">
                <span class="spec-badge ebook">📱 電子書 (即時閱讀)</span>
                <span class="spec-format-text">EPUB / 高清 PDF</span>
              </div>
              <div class="spec-price">
                <span class="current-price ebook-price">NT$ {{ book.pricing?.ebook?.price }}</span>
                <span v-if="book.pricing?.ebook?.originalPrice" class="orig-price">NT$ {{ book.pricing?.ebook?.originalPrice }}</span>
              </div>
            </div>

            <div v-if="book.pricing?.bundle" class="bundle-deal-row">
              <span class="bundle-tag">🎁 雙享特惠包</span>
              <span class="bundle-desc">{{ book.pricing.bundle.discountDesc }}</span>
              <span class="bundle-price">NT$ {{ book.pricing.bundle.price }}</span>
            </div>
          </div>

          <!-- 操作按鈕列 -->
          <div class="book-actions-footer">
            <button
              class="btn-preview-reading"
              @click="openPreviewModal(book)"
            >
              <span>📖 免費線上試閱</span>
            </button>
            <button
              class="btn-buy-book"
              @click="openBuyModal(book)"
            >
              <span>🛒 立即線上購買</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 模態視窗一：沉浸式線上試閱閱讀器 (Trial Reading Modal) -->
    <!-- ======================================================== -->
    <div v-if="isPreviewOpen && activePreviewBook" class="preview-reader-overlay" @click.self="closePreviewModal">
      <div class="preview-reader-window" :class="readerThemeClass">
        <!-- 閱讀器頂部工具列 -->
        <div class="reader-toolbar">
          <div class="reader-book-title-group">
            <span class="reader-badge">試閱模式</span>
            <h3 class="reader-book-title">《{{ activePreviewBook.title }}》</h3>
            <span class="reader-author">{{ activePreviewBook.author }}</span>
          </div>

          <!-- 閱讀偏好控制項 (字體大小、護眼主題) -->
          <div class="reader-controls-group">
            <!-- 字體大小 -->
            <div class="font-size-toggles">
              <button
                class="ctrl-btn"
                :class="{ active: fontSize === 'sm' }"
                title="縮小字體"
                @click="fontSize = 'sm'"
              >A-</button>
              <button
                class="ctrl-btn"
                :class="{ active: fontSize === 'md' }"
                title="標準字體"
                @click="fontSize = 'md'"
              >A</button>
              <button
                class="ctrl-btn"
                :class="{ active: fontSize === 'lg' }"
                title="放大字體"
                @click="fontSize = 'lg'"
              >A+</button>
            </div>

            <!-- 護眼配色切換 -->
            <div class="theme-toggles">
              <button
                class="theme-btn parchment"
                :class="{ active: readerTheme === 'parchment' }"
                title="古雅羊皮紙護眼黃"
                @click="readerTheme = 'parchment'"
              >米</button>
              <button
                class="theme-btn light"
                :class="{ active: readerTheme === 'light' }"
                title="清新日曬白"
                @click="readerTheme = 'light'"
              >白</button>
              <button
                class="theme-btn dark"
                :class="{ active: readerTheme === 'dark' }"
                title="沉靜夜間黑"
                @click="readerTheme = 'dark'"
              >黑</button>
            </div>

            <!-- 關閉按鈕 -->
            <button class="reader-close-btn" title="關閉試閱" @click="closePreviewModal">✕</button>
          </div>
        </div>

        <!-- 閱讀器內文主體區 -->
        <div class="reader-body-wrapper" :class="`font-${fontSize}`">
          <!-- 試閱章節選擇籤條 -->
          <div v-if="previewChapters.length > 1" class="chapter-switch-bar">
            <span class="switch-label">試閱章節目錄：</span>
            <button
              v-for="(ch, cIdx) in previewChapters"
              :key="ch.chapterId || cIdx"
              class="chapter-tab-pill"
              :class="{ active: activeChapterIndex === cIdx }"
              @click="activeChapterIndex = cIdx"
            >
              {{ ch.title }}
            </button>
          </div>

          <!-- 正文閱讀內容 -->
          <div class="reader-content-paper">
            <div class="reader-paper-header">
              <div class="paper-seal">臺本典藏</div>
              <h2 class="paper-chapter-title">{{ currentChapter?.title || '精彩試閱' }}</h2>
              <div class="paper-subtitle">{{ activePreviewBook.samplePreview?.previewSubtitle }}</div>
              <div class="paper-divider"></div>
            </div>

            <!-- 文章段落 (格式化呈現) -->
            <div class="paper-paragraphs">
              <div
                v-for="(paragraph, pIdx) in formattedChapterParagraphs"
                :key="pIdx"
                class="paragraph-block"
              >
                <!-- Markdown 標題處理 -->
                <h3 v-if="paragraph.startsWith('### ')" class="sub-heading-3">
                  {{ paragraph.replace('### ', '') }}
                </h3>
                <h4 v-else-if="paragraph.startsWith('#### ')" class="sub-heading-4">
                  {{ paragraph.replace('#### ', '') }}
                </h4>
                <ul v-else-if="paragraph.startsWith('* ')" class="bullet-list">
                  <li v-for="(item, iIdx) in paragraph.split('\n')" :key="iIdx">
                    {{ item.replace(/^\*\s*/, '') }}
                  </li>
                </ul>
                <p v-else class="normal-paragraph">
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <!-- 試閱截斷告罄橫幅 -->
            <div class="preview-end-banner">
              <div class="end-icon">📜</div>
              <div class="end-title">【線上免費試閱篇章已完結】</div>
              <p class="end-desc">
                {{ activePreviewBook.samplePreview?.previewNotice || '全書精彩章節與經典配方皆完整收錄於全本。' }}
              </p>
              <div class="end-actions-row">
                <button
                  class="btn-upgrade-buy"
                  @click="openBuyModal(activePreviewBook)"
                >
                  <span>🛒 立即選購全本（電子書 NT$ {{ activePreviewBook.pricing?.ebook?.price }} / 實體書 NT$ {{ activePreviewBook.pricing?.physical?.price }}）</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 閱讀器底部進度列 -->
        <div class="reader-footer-bar">
          <div class="page-hint">
            章節：{{ activeChapterIndex + 1 }} / {{ previewChapters.length }} ‧ 預估閱讀時間：約 {{ activePreviewBook.samplePreview?.readTimeMinutes || 5 }} 分鐘
          </div>
          <div class="footer-action-right">
            <button
              v-if="activeChapterIndex > 0"
              class="btn-page-nav"
              @click="activeChapterIndex--"
            >
              ‹ 上一章
            </button>
            <button
              v-if="activeChapterIndex < previewChapters.length - 1"
              class="btn-page-nav next"
              @click="activeChapterIndex++"
            >
              下一章 ›
            </button>
            <button class="btn-footer-buy" @click="openBuyModal(activePreviewBook)">
              🛒 購買全本
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 模態視窗二：線上購書結帳與授權視窗 (Checkout Modal) -->
    <!-- ======================================================== -->
    <div v-if="isBuyModalOpen && activeBuyBook" class="checkout-modal-overlay" @click.self="isBuyModalOpen = false">
      <div class="checkout-modal-card">
        <div class="checkout-header">
          <div class="checkout-title-wrap">
            <span class="checkout-seal">結帳</span>
            <h3>購買本草典籍 · 《{{ activeBuyBook.title }}》</h3>
          </div>
          <button class="checkout-close-btn" @click="isBuyModalOpen = false">✕</button>
        </div>

        <!-- 購買成功畫面 -->
        <div v-if="orderSuccessData" class="checkout-success-view">
          <div class="success-icon">🎉</div>
          <h3 class="success-heading">購買成功！感謝您對臺灣本草文化的珍視</h3>
          <p class="success-sub">您的訂單編號：<strong>{{ orderSuccessData.order?.orderId }}</strong></p>

          <!-- 若含電子書：顯著提供授權碼與線上閱讀按鈕 -->
          <div v-if="orderSuccessData.order?.licenseKey" class="ebook-license-card">
            <div class="license-title">📱 電子書即時閱讀授權碼</div>
            <div class="license-key-box">{{ orderSuccessData.order.licenseKey }}</div>
            <p class="license-hint">
              數位授權已綁定您的電子信箱 <code>{{ orderSuccessData.order.buyerEmail }}</code>，您可隨時於本站或載具開啟閱讀。
            </p>
            <button class="btn-start-reading-now" @click="startReadingPurchased(activeBuyBook)">
              <span>📖 立刻在瀏覽器中開始閱讀 ➔</span>
            </button>
          </div>

          <!-- 若含實體書：物流進度提示 -->
          <div v-if="orderSuccessData.order?.trackingNumber" class="physical-shipping-card">
            <div class="shipping-title">📦 實體書出貨與物流單號</div>
            <div class="tracking-box">物流追蹤碼：<strong>{{ orderSuccessData.order.trackingNumber }}</strong></div>
            <p class="shipping-hint">
              實體書將以精緻防潮牛皮硬盒包裝，預計 24 小時內寄出至您填寫之收件地址。
            </p>
          </div>

          <div class="success-footer-actions">
            <button class="btn-finish-checkout" @click="finishCheckout">完成並返回書閣</button>
            <button class="btn-check-my-orders" @click="viewMyOrders">檢視我的藏書訂單</button>
          </div>
        </div>

        <!-- 下單表單畫面 -->
        <div v-else class="checkout-form-view">
          <!-- 書籍簡要卡片 -->
          <div class="checkout-book-summary">
            <span class="summary-icon">{{ activeBuyBook.coverIcon || '📖' }}</span>
            <div class="summary-info">
              <h4 class="summary-title">{{ activeBuyBook.title }}</h4>
              <div class="summary-author">{{ activeBuyBook.author }} · {{ activeBuyBook.publisher }}</div>
            </div>
          </div>

          <!-- 步驟一：選擇規格類型 -->
          <div class="form-group-block">
            <label class="block-label">1. 選擇購買規格型態：</label>
            <div class="spec-choices-grid">
              <!-- 電子書 -->
              <div
                class="spec-choice-card"
                :class="{ active: buyForm.purchaseType === 'ebook' }"
                @click="buyForm.purchaseType = 'ebook'"
              >
                <div class="choice-top">
                  <span class="choice-tag">📱 電子書</span>
                  <span class="choice-price">NT$ {{ activeBuyBook.pricing?.ebook?.price }}</span>
                </div>
                <div class="choice-desc">EPUB / PDF 雙版本，付款後立即取得金鑰與閱讀權限</div>
              </div>

              <!-- 實體書 -->
              <div
                class="spec-choice-card"
                :class="{ active: buyForm.purchaseType === 'physical' }"
                @click="buyForm.purchaseType = 'physical'"
              >
                <div class="choice-top">
                  <span class="choice-tag">📦 實體紙本書</span>
                  <span class="choice-price">NT$ {{ activeBuyBook.pricing?.physical?.price }}</span>
                </div>
                <div class="choice-desc">精裝全彩紙本，剩餘庫存 {{ activeBuyBook.pricing?.physical?.stock }} 本，24h 出貨</div>
              </div>

              <!-- 雙享合購 -->
              <div
                v-if="activeBuyBook.pricing?.bundle"
                class="spec-choice-card bundle"
                :class="{ active: buyForm.purchaseType === 'bundle' }"
                @click="buyForm.purchaseType = 'bundle'"
              >
                <div class="choice-top">
                  <span class="choice-tag">🎁 雙享特惠包</span>
                  <span class="choice-price">NT$ {{ activeBuyBook.pricing?.bundle?.price }}</span>
                </div>
                <div class="choice-desc">實體精裝收藏 + 電子書即時隨身閱讀，享超值折扣</div>
              </div>
            </div>
          </div>

          <!-- 數量選擇 -->
          <div v-if="buyForm.purchaseType !== 'ebook'" class="quantity-row">
            <span class="qty-label">購買本數：</span>
            <div class="qty-stepper">
              <button class="step-btn" :disabled="buyForm.quantity <= 1" @click="buyForm.quantity--">-</button>
              <input v-model.number="buyForm.quantity" type="number" min="1" max="99" class="qty-input" />
              <button class="step-btn" @click="buyForm.quantity++">+</button>
            </div>
          </div>

          <!-- 步驟二：買家基本資料 -->
          <div class="form-group-block">
            <label class="block-label">2. 填寫收件與授權資料：</label>
            <div class="inputs-grid">
              <div class="input-item">
                <span class="field-label">姓名 *</span>
                <input v-model="buyForm.buyerName" type="text" placeholder="請輸入收件人姓名" class="form-input" />
              </div>
              <div class="input-item">
                <span class="field-label">電子信箱 (接收授權/通知) *</span>
                <input v-model="buyForm.buyerEmail" type="email" placeholder="example@domain.com" class="form-input" />
              </div>
              <div class="input-item">
                <span class="field-label">聯絡電話</span>
                <input v-model="buyForm.buyerPhone" type="tel" placeholder="0912-345-678" class="form-input" />
              </div>
              <div v-if="buyForm.purchaseType !== 'ebook'" class="input-item full-span">
                <span class="field-label">實體寄送地址 (含郵遞區號) *</span>
                <input v-model="buyForm.shippingAddress" type="text" placeholder="例：台北市大安區新生南路三段..." class="form-input" />
              </div>
            </div>
          </div>

          <!-- 步驟三：付款方式 -->
          <div class="form-group-block">
            <label class="block-label">3. 選擇付款方式：</label>
            <div class="payment-options">
              <label class="payment-pill" :class="{ active: buyForm.paymentMethod === '信用卡線上刷卡' }">
                <input v-model="buyForm.paymentMethod" type="radio" value="信用卡線上刷卡" />
                <span>💳 信用卡線上刷卡 (Visa/Master/JCB)</span>
              </label>
              <label class="payment-pill" :class="{ active: buyForm.paymentMethod === 'LINE Pay 快捷支付' }">
                <input v-model="buyForm.paymentMethod" type="radio" value="LINE Pay 快捷支付" />
                <span>🟢 LINE Pay 快捷支付</span>
              </label>
              <label v-if="buyForm.purchaseType !== 'ebook'" class="payment-pill" :class="{ active: buyForm.paymentMethod === '超商取貨付款' }">
                <input v-model="buyForm.paymentMethod" type="radio" value="超商取貨付款" />
                <span>🏪 超商取貨付款</span>
              </label>
            </div>
          </div>

          <!-- 錯誤訊息提示 -->
          <div v-if="orderError" class="order-error-banner">
            ⚠️ {{ orderError }}
          </div>

          <!-- 底部小計與提交 -->
          <div class="checkout-footer-row">
            <div class="total-amount-box">
              <span class="total-label">應付金額：</span>
              <strong class="total-val">NT$ {{ calculateTotal }}</strong>
            </div>
            <button
              class="btn-submit-order"
              :class="{ loading: isSubmittingOrder }"
              :disabled="isSubmittingOrder"
              @click="submitOrder"
            >
              <span>{{ isSubmittingOrder ? '金流授權中...' : '確認付款並建立訂單 ➔' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 模態視窗三：我的藏書閣與訂單查詢抽屜 (My Orders Drawer) -->
    <!-- ======================================================== -->
    <div v-if="isMyOrdersOpen" class="my-orders-overlay" @click.self="isMyOrdersOpen = false">
      <div class="my-orders-drawer">
        <div class="drawer-header">
          <div class="drawer-title-group">
            <span class="drawer-seal">私藏</span>
            <h3>我的本草藏書閣 · 訂單與電子書授權</h3>
          </div>
          <button class="drawer-close-btn" @click="isMyOrdersOpen = false">✕</button>
        </div>

        <div class="drawer-search-row">
          <input
            v-model="myOrderEmail"
            type="email"
            placeholder="輸入購買時填寫的 Email 查詢藏書..."
            class="my-order-email-input"
            @keydown.enter="fetchMyOrders"
          />
          <button class="btn-lookup-orders" @click="fetchMyOrders">查詢</button>
        </div>

        <div v-if="isLoadingOrders" class="orders-loading">查詢中...</div>

        <div v-else-if="myOrdersList.length === 0" class="orders-empty">
          <div class="empty-book-icon">📚</div>
          <p>尚未查到任何購書紀錄，請輸入正確 Email 或至書閣選購喜愛的本草書籍！</p>
        </div>

        <div v-else class="orders-scroll-list">
          <div
            v-for="ord in myOrdersList"
            :key="ord.orderId"
            class="my-order-item-card"
          >
            <div class="order-item-top">
              <span class="order-id-tag">單號：{{ ord.orderId }}</span>
              <span class="order-status-badge" :class="ord.orderStatus">
                {{ ord.orderStatus === 'completed' ? '已完成' : ord.orderStatus === 'shipping' ? '配送中' : '處理中' }}
              </span>
            </div>

            <h4 class="order-book-title">{{ ord.bookTitle }}</h4>
            <div class="order-format-desc">{{ ord.formatDesc }} · NT$ {{ ord.totalAmount }}</div>

            <!-- 電子書授權 -->
            <div v-if="ord.licenseKey" class="order-license-box">
              <span class="license-tag">電子授權</span>
              <code>{{ ord.licenseKey }}</code>
              <button class="btn-drawer-read" @click="openPurchasedEbook(ord)">立即閱讀 ➔</button>
            </div>

            <!-- 實體物流單號 -->
            <div v-if="ord.trackingNumber" class="order-tracking-box">
              <span>物流號：{{ ord.trackingNumber }} ({{ ord.shippingAddress }})</span>
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

const emit = defineEmits(['view-herb-name', 'jump-to-alchemy', 'switch-tab']);

// 1. 書籍清單與篩選狀態
const books = ref([]);
const isLoading = ref(false);
const selectedCategory = ref('全部');
const searchQuery = ref('');
const selectedSort = ref('recommended');

const categoryOptions = [
  { id: '全部', name: '全部藏書', icon: '📚' },
  { id: 'tea_culture', name: '青草茶文化', icon: '🍵' },
  { id: 'terroir_field', name: '野外圖鑑', icon: '🌿' },
  { id: 'biotech_science', name: '科學機轉', icon: '🔬' },
  { id: 'indigenous_folk', name: '原鄉民俗', icon: '🏹' },
  { id: 'seasonal_health', name: '節氣養生', icon: '🫖' }
];

const fetchBooks = async () => {
  isLoading.value = true;
  try {
    const list = await HerbApi.getBooks({
      category: selectedCategory.value,
      query: searchQuery.value,
      sort: selectedSort.value
    });
    books.value = list;
  } catch (err) {
    console.error('Failed to load books:', err);
  } finally {
    isLoading.value = false;
  }
};

const selectCategory = (catId) => {
  audio.playClick();
  selectedCategory.value = catId;
  fetchBooks();
};

const onSearchChange = () => {
  fetchBooks();
};

const resetFilters = () => {
  audio.playClick();
  selectedCategory.value = '全部';
  searchQuery.value = '';
  selectedSort.value = 'recommended';
  fetchBooks();
};

const getCategoryCount = (catId) => {
  return books.value.filter(b => b.category === catId).length;
};

// 2. 線上試閱閱讀器狀態
const isPreviewOpen = ref(false);
const activePreviewBook = ref(null);
const activeChapterIndex = ref(0);
const fontSize = ref('md'); // 'sm' | 'md' | 'lg'
const readerTheme = ref('parchment'); // 'parchment' | 'light' | 'dark'

const readerThemeClass = computed(() => `theme-${readerTheme.value}`);

const previewChapters = computed(() => {
  return activePreviewBook.value?.samplePreview?.chapters || [];
});

const currentChapter = computed(() => {
  return previewChapters.value[activeChapterIndex.value] || null;
});

const formattedChapterParagraphs = computed(() => {
  if (!currentChapter.value || !currentChapter.value.content) return [];
  return currentChapter.value.content
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);
});

const openPreviewModal = (book) => {
  audio.playChime(620);
  activePreviewBook.value = book;
  activeChapterIndex.value = 0;
  isPreviewOpen.value = true;
};

const closePreviewModal = () => {
  audio.playClick();
  isPreviewOpen.value = false;
};

// 3. 線上購買與結帳狀態
const isBuyModalOpen = ref(false);
const activeBuyBook = ref(null);
const isSubmittingOrder = ref(false);
const orderError = ref('');
const orderSuccessData = ref(null);

const buyForm = ref({
  purchaseType: 'ebook',
  quantity: 1,
  buyerName: '',
  buyerEmail: '',
  buyerPhone: '',
  shippingAddress: '',
  paymentMethod: '信用卡線上刷卡'
});

const openBuyModal = (book) => {
  audio.playChime(750);
  activeBuyBook.value = book;
  orderSuccessData.value = null;
  orderError.value = '';
  buyForm.value = {
    purchaseType: 'ebook',
    quantity: 1,
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    shippingAddress: '',
    paymentMethod: '信用卡線上刷卡'
  };
  isBuyModalOpen.value = true;
};

const calculateTotal = computed(() => {
  if (!activeBuyBook.value) return 0;
  const pricing = activeBuyBook.value.pricing;
  if (!pricing) return 0;

  if (buyForm.value.purchaseType === 'physical') {
    return (pricing.physical?.price || 0) * (buyForm.value.quantity || 1);
  }
  if (buyForm.value.purchaseType === 'bundle') {
    return (pricing.bundle?.price || 0) * (buyForm.value.quantity || 1);
  }
  return pricing.ebook?.price || 0;
});

const submitOrder = async () => {
  if (!buyForm.value.buyerName.trim()) {
    orderError.value = '請填寫購買人姓名';
    return;
  }
  if (!buyForm.value.buyerEmail.trim() || !buyForm.value.buyerEmail.includes('@')) {
    orderError.value = '請輸入正確的電子信箱以接收數位授權';
    return;
  }
  if (buyForm.value.purchaseType !== 'ebook' && !buyForm.value.shippingAddress.trim()) {
    orderError.value = '實體書籍請填寫收件寄送地址';
    return;
  }

  orderError.value = '';
  isSubmittingOrder.value = true;
  audio.playWaterDrop();

  try {
    const res = await HerbApi.createBookOrder({
      bookId: activeBuyBook.value.id,
      purchaseType: buyForm.value.purchaseType,
      quantity: buyForm.value.quantity,
      buyerName: buyForm.value.buyerName,
      buyerEmail: buyForm.value.buyerEmail,
      buyerPhone: buyForm.value.buyerPhone,
      shippingAddress: buyForm.value.shippingAddress,
      paymentMethod: buyForm.value.paymentMethod
    });

    orderSuccessData.value = res;
    audio.playStamp();
    // 扣除前端本機快取之實體書庫存
    if (buyForm.value.purchaseType !== 'ebook' && activeBuyBook.value.pricing?.physical) {
      activeBuyBook.value.pricing.physical.stock -= buyForm.value.quantity;
    }
  } catch (err) {
    console.error('Order creation failed:', err);
    orderError.value = err.message || '購買訂單建立失敗，請稍候再試';
  } finally {
    isSubmittingOrder.value = false;
  }
};

const finishCheckout = () => {
  audio.playClick();
  isBuyModalOpen.value = false;
  orderSuccessData.value = null;
};

const startReadingPurchased = (book) => {
  isBuyModalOpen.value = false;
  openPreviewModal(book);
};

// 4. 我的藏書閣抽屜狀態
const isMyOrdersOpen = ref(false);
const myOrderEmail = ref('');
const myOrdersList = ref([]);
const isLoadingOrders = ref(false);

const fetchMyOrders = async () => {
  if (!myOrderEmail.value.trim()) return;
  isLoadingOrders.value = true;
  try {
    const orders = await HerbApi.getMyBookOrders(myOrderEmail.value.trim());
    myOrdersList.value = orders;
  } catch (err) {
    console.error('Failed to lookup orders:', err);
  } finally {
    isLoadingOrders.value = false;
  }
};

const viewMyOrders = () => {
  if (buyForm.value.buyerEmail) {
    myOrderEmail.value = buyForm.value.buyerEmail;
    fetchMyOrders();
  }
  isBuyModalOpen.value = false;
  isMyOrdersOpen.value = true;
};

const openPurchasedEbook = (order) => {
  const foundBook = books.value.find(b => b.id === order.bookId);
  if (foundBook) {
    isMyOrdersOpen.value = false;
    openPreviewModal(foundBook);
  } else {
    alert(`已開啟《${order.bookTitle}》之雲端數位閱讀。授權碼：${order.licenseKey}`);
  }
};

onMounted(() => {
  fetchBooks();
});
</script>

<style scoped>
.bookshelf-view-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px 80px;
}

/* 頂部氣派書閣牌匾 */
.bookshelf-banner {
  background: linear-gradient(135deg, rgba(20, 50, 36, 0.96), rgba(10, 30, 22, 0.98)),
              url('data:image/svg+xml;utf8,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1.5"/></svg>');
  border-radius: 20px;
  padding: 36px 40px;
  margin-bottom: 20px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
}

.banner-content {
  flex: 1;
  min-width: 320px;
}

.banner-seal-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.banner-seal {
  background: #c2410c;
  color: #fff;
  font-family: var(--font-seal, serif);
  font-size: 13px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(194, 65, 12, 0.4);
}

.banner-badge-text {
  font-size: 12px;
  letter-spacing: 1.5px;
  color: #a7f3d0;
  font-weight: 700;
}

.banner-main-title {
  margin: 0 0 12px;
  font-size: 28px;
  font-weight: 900;
  line-height: 1.3;
}

.banner-main-title span {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #e2e8f0;
  margin-bottom: 4px;
}

.banner-main-title em {
  font-style: normal;
  color: #fef08a;
  background: linear-gradient(to right, #fef08a, #86efac);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.banner-subtitle {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #cbd5e1;
  max-width: 780px;
}

.banner-stats-box {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 16px 24px;
}

.bstat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bstat-val {
  font-size: 22px;
  font-weight: 900;
  color: #fef08a;
}

.bstat-label {
  font-size: 11.5px;
  color: #94a3b8;
  margin-top: 2px;
}

.bstat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
}

.btn-open-my-cabinet {
  background: #059669;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-open-my-cabinet:hover {
  background: #047857;
  transform: translateY(-2px);
}

/* 法律宣告條 */
.bookshelf-legal-strip {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fefce8;
  border: 1px solid #fef08a;
  border-left: 5px solid #eab308;
  border-radius: 10px;
  padding: 12px 18px;
  margin-bottom: 22px;
  font-size: 13px;
  color: #854d0e;
}

/* 篩選工具列 */
.bookshelf-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--bg-card);
  padding: 14px 20px;
  border-radius: 16px;
  border: 1px solid var(--border-card);
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.category-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: var(--ink-body);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cat-pill-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.cat-pill-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.cat-count {
  font-size: 11px;
  opacity: 0.85;
}

.search-sort-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.shelf-search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  padding: 6px 14px;
}

.shelf-search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: var(--ink-heavy);
  width: 220px;
}

.search-clear-btn {
  background: none;
  border: none;
  color: var(--ink-muted);
  cursor: pointer;
  font-size: 13px;
}

.shelf-sort-select {
  padding: 7px 14px;
  border-radius: 20px;
  border: 1px solid var(--border-light);
  background: var(--bg-card);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-heavy);
  outline: none;
}

/* 書籍網格 */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 26px;
}

@media (max-width: 640px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
}

.book-card {
  background: var(--bg-card);
  border-radius: 18px;
  border: 1px solid var(--border-card);
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

/* 書本立體封面 */
.book-cover-area {
  height: 160px;
  position: relative;
  overflow: hidden;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #fff;
}

.book-spine-effect {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 14px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.35), transparent);
}

.book-badge {
  position: absolute;
  top: 14px;
  right: 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 12px;
}

.book-cover-art {
  display: flex;
  flex-direction: column;
}

.cover-big-icon {
  font-size: 32px;
  margin-bottom: 6px;
}

.cover-emboss-title {
  font-size: 18px;
  font-weight: 900;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  line-height: 1.25;
}

.cover-author-sub {
  font-size: 12px;
  opacity: 0.9;
  margin-top: 4px;
}

/* 書籍詳細內容 */
.book-info-area {
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.book-category-tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11.5px;
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 6px;
}

.book-isbn {
  color: var(--ink-muted);
  font-weight: 500;
}

.book-title {
  margin: 0 0 4px;
  font-size: 19px;
  font-weight: 800;
  color: var(--primary-deep);
  line-height: 1.35;
}

.book-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-muted);
  line-height: 1.45;
}

.book-author-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  margin-bottom: 8px;
  color: var(--ink-heavy);
}

.author-role {
  font-size: 12px;
  color: var(--ink-muted);
}

.book-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-bottom: 14px;
  color: var(--ink-muted);
}

.rating-box {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stars {
  color: #f59e0b;
}

.rating-num {
  font-weight: 800;
  color: var(--ink-heavy);
}

.book-summary-text {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-body);
  margin: 0 0 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-tags-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.book-tag-pill {
  font-size: 11.5px;
  background: var(--bg-subtle);
  color: var(--ink-muted);
  padding: 2px 8px;
  border-radius: 6px;
}

/* 價格與規格 */
.book-pricing-box {
  background: var(--bg-subtle);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px dashed var(--border-light);
}

.price-spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.spec-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spec-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.spec-badge.physical { background: #e0e7ff; color: #3730a3; }
.spec-badge.ebook { background: #dcfce7; color: #15803d; }

.spec-format-text {
  font-size: 11.5px;
  color: var(--ink-muted);
}

.spec-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.current-price {
  font-size: 15px;
  font-weight: 900;
  color: var(--ink-heavy);
}

.current-price.ebook-price {
  color: #15803d;
}

.orig-price {
  font-size: 12px;
  text-decoration: line-through;
  color: var(--ink-muted);
}

.bundle-deal-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px dashed var(--border-light);
  padding-top: 6px;
  font-size: 12px;
}

.bundle-tag {
  background: #fef08a;
  color: #854d0e;
  font-size: 11px;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 4px;
}

.bundle-desc {
  color: #854d0e;
  font-weight: 600;
}

.bundle-price {
  font-weight: 800;
  color: #c2410c;
}

/* 操作按鈕 */
.book-actions-footer {
  margin-top: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.btn-preview-reading {
  padding: 10px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 800;
  background: #fff;
  border: 1px solid var(--primary);
  color: var(--primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-preview-reading:hover {
  background: rgba(45, 106, 79, 0.08);
}

.btn-buy-book {
  padding: 10px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 800;
  background: var(--primary);
  border: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.25);
}

.btn-buy-book:hover {
  background: var(--primary-deep);
  transform: translateY(-2px);
}

/* ======================================================== */
/* 沉浸式線上試閱閱讀器樣式 */
/* ======================================================== */
.preview-reader-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 2100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.preview-reader-window {
  width: 900px;
  max-width: 96vw;
  height: 90vh;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

/* 配色主題 */
.theme-parchment {
  background: #fdfbf7;
  color: #292524;
}

.theme-light {
  background: #ffffff;
  color: #1e293b;
}

.theme-dark {
  background: #18181b;
  color: #e4e4e7;
}

.reader-toolbar {
  padding: 14px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.theme-dark .reader-toolbar {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.reader-book-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reader-badge {
  background: #059669;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.reader-book-title {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}

.reader-author {
  font-size: 12px;
  opacity: 0.7;
}

.reader-controls-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.font-size-toggles,
.theme-toggles {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.05);
  padding: 3px;
  border-radius: 8px;
}

.theme-dark .font-size-toggles,
.theme-dark .theme-toggles {
  background: rgba(255, 255, 255, 0.1);
}

.ctrl-btn {
  border: none;
  background: none;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  color: inherit;
}

.ctrl-btn.active {
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.theme-dark .ctrl-btn.active {
  background: #3f3f46;
}

.theme-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-btn.parchment { background: #fdfbf7; color: #78350f; }
.theme-btn.light { background: #ffffff; color: #1e293b; }
.theme-btn.dark { background: #18181b; color: #fff; border-color: #52525b; }

.theme-btn.active {
  box-shadow: 0 0 0 2px #059669;
}

.reader-close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: inherit;
  cursor: pointer;
  padding: 4px 8px;
}

/* 閱讀主體滾動區 */
.reader-body-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 32px 48px;
}

.reader-body-wrapper.font-sm { font-size: 14px; }
.reader-body-wrapper.font-md { font-size: 16px; }
.reader-body-wrapper.font-lg { font-size: 18.5px; }

.chapter-switch-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  padding-bottom: 12px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.theme-dark .chapter-switch-bar {
  border-bottom-color: rgba(255, 255, 255, 0.15);
}

.switch-label {
  font-size: 12px;
  font-weight: 700;
  opacity: 0.7;
}

.chapter-tab-pill {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.chapter-tab-pill.active {
  background: #059669;
  border-color: #059669;
  color: #fff;
}

.reader-content-paper {
  max-width: 760px;
  margin: 0 auto;
}

.reader-paper-header {
  text-align: center;
  margin-bottom: 32px;
}

.paper-seal {
  display: inline-block;
  font-family: var(--font-seal, serif);
  border: 1px solid currentColor;
  padding: 2px 6px;
  font-size: 11px;
  margin-bottom: 10px;
  opacity: 0.6;
}

.paper-chapter-title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 900;
}

.paper-subtitle {
  font-size: 13.5px;
  opacity: 0.75;
}

.paper-divider {
  width: 60px;
  height: 2px;
  background: currentColor;
  margin: 16px auto 0;
  opacity: 0.3;
}

.paper-paragraphs {
  line-height: 1.8;
  margin-bottom: 40px;
}

.normal-paragraph {
  margin: 0 0 18px;
  text-indent: 2em;
}

.sub-heading-3 {
  font-size: 1.25em;
  font-weight: 800;
  margin: 28px 0 12px;
  color: #059669;
}

.theme-dark .sub-heading-3 {
  color: #34d399;
}

.sub-heading-4 {
  font-size: 1.1em;
  font-weight: 700;
  margin: 20px 0 8px;
}

.bullet-list {
  padding-left: 24px;
  margin: 0 0 18px;
}

.bullet-list li {
  margin-bottom: 6px;
}

/* 試閱截斷橫幅 */
.preview-end-banner {
  background: rgba(5, 150, 105, 0.08);
  border: 1px solid rgba(5, 150, 105, 0.3);
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  margin-top: 36px;
}

.end-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.end-title {
  font-size: 17px;
  font-weight: 800;
  color: #059669;
  margin-bottom: 6px;
}

.theme-dark .end-title {
  color: #34d399;
}

.end-desc {
  font-size: 13.5px;
  opacity: 0.85;
  margin: 0 0 18px;
}

.btn-upgrade-buy {
  background: linear-gradient(135deg, #059669, #047857);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(5, 150, 105, 0.3);
  transition: all 0.2s ease;
}

.btn-upgrade-buy:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(5, 150, 105, 0.4);
}

/* 閱讀器底部導覽 */
.reader-footer-bar {
  padding: 12px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12.5px;
}

.theme-dark .reader-footer-bar {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.footer-action-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-page-nav {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.btn-footer-buy {
  background: #059669;
  color: #fff;
  border: none;
  padding: 5px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

/* ======================================================== */
/* 結帳對話框 (Checkout Modal) */
/* ======================================================== */
.checkout-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 2200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.checkout-modal-card {
  background: var(--bg-card);
  width: 640px;
  max-width: 95vw;
  max-height: 90vh;
  border-radius: 20px;
  border: 1px solid var(--border-card);
  overflow-y: auto;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.checkout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-light);
}

.checkout-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkout-seal {
  background: var(--primary);
  color: #fff;
  font-family: var(--font-seal, serif);
  font-size: 12px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 4px;
}

.checkout-title-wrap h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  color: var(--primary-deep);
}

.checkout-close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--ink-muted);
  cursor: pointer;
}

.checkout-book-summary {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-subtle);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 18px;
}

.summary-icon {
  font-size: 28px;
}

.summary-title {
  margin: 0 0 2px;
  font-size: 15px;
  font-weight: 800;
}

.summary-author {
  font-size: 12px;
  color: var(--ink-muted);
}

.form-group-block {
  margin-bottom: 18px;
}

.block-label {
  display: block;
  font-size: 13px;
  font-weight: 800;
  color: var(--ink-heavy);
  margin-bottom: 8px;
}

.spec-choices-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.spec-choice-card {
  border: 1.5px solid var(--border-light);
  border-radius: 12px;
  padding: 12px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--bg-card);
}

.spec-choice-card.bundle {
  grid-column: 1 / -1;
  background: #fefce8;
  border-color: #fef08a;
}

.spec-choice-card:hover {
  border-color: var(--primary);
}

.spec-choice-card.active {
  border-color: var(--primary);
  background: rgba(45, 106, 79, 0.06);
  box-shadow: 0 0 0 2px var(--primary);
}

.choice-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.choice-tag {
  font-size: 13px;
  font-weight: 800;
}

.choice-price {
  font-size: 14px;
  font-weight: 900;
  color: var(--primary-deep);
}

.choice-desc {
  font-size: 11.5px;
  color: var(--ink-muted);
  line-height: 1.4;
}

.quantity-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.qty-label {
  font-size: 13px;
  font-weight: 700;
}

.qty-stepper {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  overflow: hidden;
}

.step-btn {
  background: var(--bg-subtle);
  border: none;
  width: 32px;
  height: 32px;
  font-size: 14px;
  cursor: pointer;
}

.qty-input {
  width: 44px;
  text-align: center;
  border: none;
  font-size: 14px;
  font-weight: 700;
  outline: none;
}

.inputs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-item.full-span {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-muted);
}

.form-input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  background: var(--bg-subtle);
  font-size: 13px;
  outline: none;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.payment-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  background: var(--bg-subtle);
  font-size: 12.5px;
  cursor: pointer;
}

.payment-pill.active {
  border-color: var(--primary);
  background: #fff;
}

.order-error-banner {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 12.5px;
  margin-bottom: 14px;
}

.checkout-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-light);
  padding-top: 18px;
  margin-top: 14px;
}

.total-amount-box {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.total-label {
  font-size: 13px;
  color: var(--ink-muted);
}

.total-val {
  font-size: 24px;
  font-weight: 900;
  color: #c2410c;
}

.btn-submit-order {
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(45, 106, 79, 0.3);
  transition: all 0.2s ease;
}

.btn-submit-order:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-submit-order:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 結帳成功畫面 */
.checkout-success-view {
  text-align: center;
  padding: 12px 0;
}

.success-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.success-heading {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 800;
  color: var(--primary-deep);
}

.success-sub {
  font-size: 13px;
  color: var(--ink-muted);
  margin-bottom: 20px;
}

.ebook-license-card,
.physical-shipping-card {
  background: var(--bg-subtle);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 14px;
  text-align: left;
  border: 1px solid var(--border-light);
}

.license-title,
.shipping-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--primary-deep);
  margin-bottom: 8px;
}

.license-key-box {
  background: #0f172a;
  color: #38bdf8;
  font-family: monospace;
  font-size: 18px;
  font-weight: 800;
  padding: 10px 16px;
  border-radius: 8px;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 8px;
}

.license-hint,
.shipping-hint {
  font-size: 12px;
  color: var(--ink-muted);
  line-height: 1.4;
  margin: 0 0 12px;
}

.btn-start-reading-now {
  width: 100%;
  background: #059669;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
}

.success-footer-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.btn-finish-checkout {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  background: var(--primary);
  color: #fff;
  border: none;
  cursor: pointer;
}

.btn-check-my-orders {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  background: var(--bg-subtle);
  color: var(--ink-heavy);
  border: 1px solid var(--border-light);
  cursor: pointer;
}

/* ======================================================== */
/* 我的藏書閣抽屜 (My Orders Drawer) */
/* ======================================================== */
.my-orders-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 2200;
  display: flex;
  justify-content: flex-end;
}

.my-orders-drawer {
  width: 480px;
  max-width: 90vw;
  height: 100%;
  background: var(--bg-card);
  padding: 28px;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
}

.drawer-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.drawer-seal {
  background: #c2410c;
  color: #fff;
  font-family: var(--font-seal, serif);
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.drawer-title-group h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}

.drawer-close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: var(--ink-muted);
  cursor: pointer;
}

.drawer-search-row {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}

.my-order-email-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  font-size: 13px;
  outline: none;
}

.btn-lookup-orders {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.orders-loading,
.orders-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--ink-muted);
  font-size: 13px;
}

.empty-book-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.orders-scroll-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.my-order-item-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 14px;
}

.order-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11.5px;
  margin-bottom: 6px;
}

.order-id-tag {
  color: var(--ink-muted);
  font-family: monospace;
}

.order-status-badge {
  font-size: 10.5px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.order-status-badge.completed { background: #dcfce7; color: #166534; }
.order-status-badge.shipping { background: #dbeafe; color: #1e40af; }
.order-status-badge.processing { background: #fef9c3; color: #854d0e; }

.order-book-title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 800;
}

.order-format-desc {
  font-size: 12px;
  color: var(--ink-muted);
  margin-bottom: 10px;
}

.order-license-box {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.license-tag {
  background: #059669;
  color: #fff;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
}

.order-license-box code {
  flex: 1;
  font-family: monospace;
  font-weight: 700;
  color: #0369a1;
}

.btn-drawer-read {
  background: #059669;
  color: #fff;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.order-tracking-box {
  font-size: 11.5px;
  color: var(--ink-muted);
  margin-top: 6px;
}
</style>
