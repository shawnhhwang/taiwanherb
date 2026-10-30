/**
 * server/services/bookService.js
 * 草木書閣書籍服務層
 * 處理前台書籍瀏覽、線上試閱、實體與電子書下單購買，以及後台書目管理與線上試閱章節建立
 */

const { initialBooks, initialOrders } = require('../data/booksData');
const persistence = require('../config/persistence');

class BookService {
  constructor() {
    // 透過持久化模組載入書目與訂單
    this.books = persistence.load('books', initialBooks);
    this.orders = persistence.load('orders', initialOrders);
  }

  /**
   * 重置書目資料 (測試或管理員重置使用)
   */
  reset() {
    this.books = JSON.parse(JSON.stringify(initialBooks));
    this.orders = JSON.parse(JSON.stringify(initialOrders));
    persistence.save('books', this.books);
    persistence.save('orders', this.orders);
  }

  /**
   * 取得書籍清單 (支援分類、關鍵字搜尋與排序)
   */
  async getBooks({ category, query, sort = 'recommended' } = {}) {
    let result = [...this.books];

    // 1. 分類篩選
    if (category && category !== '全部' && category !== 'all') {
      result = result.filter(b => b.category === category || b.categoryName === category);
    }

    // 2. 關鍵字搜尋
    if (query && query.trim() !== '') {
      const q = query.trim().toLowerCase();
      result = result.filter(b => {
        const matchTitle = (b.title || '').toLowerCase().includes(q);
        const matchSubtitle = (b.subtitle || '').toLowerCase().includes(q);
        const matchAuthor = (b.author || '').toLowerCase().includes(q);
        const matchSummary = (b.summary || '').toLowerCase().includes(q);
        const matchTags = (b.tags || []).some(t => t.toLowerCase().includes(q));
        const matchIsbn = (b.isbn || '').toLowerCase().includes(q);

        return matchTitle || matchSubtitle || matchAuthor || matchSummary || matchTags || matchIsbn;
      });
    }

    // 3. 排序
    if (sort === 'price_asc') {
      result.sort((a, b) => (a.pricing?.physical?.price || 0) - (b.pricing?.physical?.price || 0));
    } else if (sort === 'price_desc') {
      result.sort((a, b) => (b.pricing?.physical?.price || 0) - (a.pricing?.physical?.price || 0));
    } else if (sort === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'newest') {
      result.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    }

    return result;
  }

  /**
   * 取得單一書籍詳情
   */
  async getBookById(id) {
    const book = this.books.find(b => b.id === id);
    return book || null;
  }

  /**
   * 取得書籍線上試閱內容
   */
  async getSamplePreview(id) {
    const book = this.books.find(b => b.id === id);
    if (!book) return null;

    const sp = book.samplePreview || {
      available: false,
      chapters: []
    };

    return {
      bookId: book.id,
      title: book.title,
      subtitle: book.subtitle,
      author: book.author,
      authorRole: book.authorRole,
      coverBadge: book.coverBadge,
      coverColor: book.coverColor,
      coverIcon: book.coverIcon,
      pricing: book.pricing,
      available: sp.available !== false,
      previewTitle: sp.previewTitle || `【線上試閱】《${book.title}》`,
      previewSubtitle: sp.previewSubtitle || '章節精華在線閱讀',
      readTimeMinutes: sp.readTimeMinutes || 5,
      previewNotice: sp.previewNotice || '線上試閱篇章已告一段落。欲閱讀全本請購買實體書或電子書！',
      chapters: sp.chapters || [],
      samplePreview: sp
    };
  }

  /**
   * 線上購買實體書 / 電子書 / 雙享合購版下單
   */
  async createOrder({
    bookId,
    purchaseType = 'ebook',
    quantity = 1,
    buyerName,
    buyerEmail,
    buyerPhone = '',
    shippingAddress = '',
    paymentMethod = '信用卡線上刷卡',
    notes = ''
  } = {}) {
    if (!bookId) {
      throw new Error('請指定欲購買之書籍編號 (bookId)');
    }

    const book = this.books.find(b => b.id === bookId);
    if (!book) {
      throw new Error('找不到欲購買之書籍');
    }

    if (!buyerName || !buyerName.trim()) {
      throw new Error('請填寫購買人姓名');
    }

    if (!buyerEmail || !buyerEmail.trim() || !buyerEmail.includes('@')) {
      throw new Error('請提供正確的電子信箱 (以利接收電子書數位授權或物流通知)');
    }

    const q = Math.max(1, parseInt(quantity, 10) || 1);
    let unitPrice = 0;
    let formatDesc = '';
    let isPhysical = false;
    let isEbook = false;

    if (purchaseType === 'physical') {
      unitPrice = book.pricing.physical.price;
      formatDesc = `實體精裝紙本書 (${book.pricing.physical.format})`;
      isPhysical = true;

      // 檢查庫存
      if (book.pricing.physical.stock < q) {
        throw new Error(`實體書庫存不足，目前庫存僅剩 ${book.pricing.physical.stock} 本`);
      }
      // 扣除庫存
      book.pricing.physical.stock -= q;
    } else if (purchaseType === 'ebook') {
      unitPrice = book.pricing.ebook.price;
      formatDesc = `電子書數位授權 (${book.pricing.ebook.format})`;
      isEbook = true;
    } else if (purchaseType === 'bundle') {
      unitPrice = book.pricing.bundle?.price || (book.pricing.physical.price + book.pricing.ebook.price * 0.8);
      formatDesc = `實體紙本書 + 電子書雙享典藏版`;
      isPhysical = true;
      isEbook = true;

      if (book.pricing.physical.stock < q) {
        throw new Error(`實體書庫存不足，目前庫存僅剩 ${book.pricing.physical.stock} 本`);
      }
      book.pricing.physical.stock -= q;
    } else {
      throw new Error('未知的購買類型，僅支援 physical (實體)、ebook (電子書) 或 bundle (合購)');
    }

    const totalAmount = unitPrice * q;

    // 產生唯一訂單編號
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `THB-BK-${dateStr}-${randomSuffix}`;

    // 電子書生成授權金鑰
    let licenseKey = null;
    if (isEbook) {
      const codePart = Math.random().toString(36).substring(2, 6).toUpperCase();
      licenseKey = `EBOOK-AUTH-${bookId.slice(0, 6).toUpperCase()}-${codePart}`;
    }

    // 實體書生成物流單號
    let trackingNumber = null;
    if (isPhysical) {
      trackingNumber = `SF-TW-${dateStr}${randomSuffix}`;
    }

    const newOrder = {
      orderId,
      bookId: book.id,
      bookTitle: book.title,
      purchaseType,
      formatDesc,
      quantity: q,
      unitPrice,
      totalAmount,
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim(),
      buyerPhone: buyerPhone.trim(),
      shippingAddress: isPhysical ? (shippingAddress || '寄送至買家指定地址') : '免寄送 (數位授權即時交付)',
      paymentMethod,
      paymentStatus: 'paid', // 模擬金流成功
      orderStatus: isPhysical ? 'shipping' : 'completed',
      licenseKey,
      trackingNumber,
      notes,
      createdAt: now.toISOString()
    };

    this.orders.unshift(newOrder);
    persistence.debounceSave('orders', this.orders);
    persistence.debounceSave('books', this.books);

    return {
      order: newOrder,
      book: {
        id: book.id,
        title: book.title,
        coverIcon: book.coverIcon,
        author: book.author
      },
      accessGuide: isEbook
        ? `您已取得《${book.title}》之電子書數位授權，授權金鑰【${licenseKey}】，系統已同步寄發至 ${buyerEmail}，您亦可立即於本站線上閱讀器翻閱！`
        : `感謝您的購買！《${book.title}》實體書籍將於 24 小時內出貨，物流追蹤碼【${trackingNumber}】。`
    };
  }

  /**
   * 脫敏訂單隱私敏感資訊 (防範 IDOR 個資外洩)
   */
  maskSensitiveOrder(order) {
    if (!order) return null;
    const copy = { ...order };
    if (copy.buyerPhone && copy.buyerPhone.length >= 8) {
      copy.buyerPhone = copy.buyerPhone.slice(0, 4) + '****' + copy.buyerPhone.slice(-2);
    }
    if (copy.shippingAddress && copy.shippingAddress.length > 6) {
      copy.shippingAddress = copy.shippingAddress.slice(0, 6) + '******';
    }
    return copy;
  }

  /**
   * 查詢使用者個人訂單 (依 Email 查詢，輸出經遮罩脫敏處理)
   */
  async getMyOrders(email) {
    if (!email) return [];
    const normalized = email.trim().toLowerCase();
    const matched = this.orders.filter(o => o.buyerEmail.toLowerCase() === normalized);
    return matched.map(o => this.maskSensitiveOrder(o));
  }

  /**
   * 依訂單編號查詢
   */
  async getOrderById(orderId) {
    return this.orders.find(o => o.orderId === orderId) || null;
  }

  // ========================================================
  // 後台管理員專屬功能 (Admin Methods)
  // ========================================================

  /**
   * 後台取得完整書目
   */
  async adminGetBooks() {
    return this.books;
  }

  /**
   * 後台建立新書目 (含定價、庫存與試閱章節)
   */
  async adminCreateBook(bookData) {
    if (!bookData.title || !bookData.title.trim()) {
      throw new Error('書名為必填欄位');
    }
    if (!bookData.author || !bookData.author.trim()) {
      throw new Error('作者為必填欄位');
    }

    const id = bookData.id || `book_${Date.now()}`;
    if (this.books.some(b => b.id === id)) {
      throw new Error(`書籍編號 ${id} 已存在`);
    }

    const newBook = {
      id,
      title: bookData.title.trim(),
      subtitle: bookData.subtitle?.trim() || '',
      author: bookData.author.trim(),
      authorRole: bookData.authorRole?.trim() || '本草專題作家',
      category: bookData.category || 'tea_culture',
      categoryName: bookData.categoryName || '青草茶文化',
      coverBadge: bookData.coverBadge || '新書上架',
      coverColor: bookData.coverColor || '#2d6a4f',
      coverIcon: bookData.coverIcon || '📖',
      isbn: bookData.isbn?.trim() || `978-986-041-${Math.floor(100 + Math.random() * 900)}-0`,
      publisher: bookData.publisher?.trim() || '臺灣本草生活文化社',
      publishDate: bookData.publishDate || new Date().toISOString().slice(0, 10),
      pages: parseInt(bookData.pages, 10) || 200,
      rating: parseFloat(bookData.rating) || 5.0,
      reviewCount: 1,
      tags: Array.isArray(bookData.tags) ? bookData.tags : (bookData.tags ? bookData.tags.split(/[,、\s]+/).filter(Boolean) : ['本草新書']),
      summary: bookData.summary?.trim() || '暫無內容簡介',
      tableOfContents: Array.isArray(bookData.tableOfContents) ? bookData.tableOfContents : ['第一章：緒論', '第二章：本草圖解'],
      pricing: {
        physical: {
          price: parseInt(bookData.pricing?.physical?.price, 10) || 400,
          originalPrice: parseInt(bookData.pricing?.physical?.originalPrice, 10) || 480,
          stock: parseInt(bookData.pricing?.physical?.stock, 10) || 30,
          format: bookData.pricing?.physical?.format || '平裝 16 開 · 全彩印製',
          shippingDays: '下單後 24 小時出貨'
        },
        ebook: {
          price: parseInt(bookData.pricing?.ebook?.price, 10) || 250,
          originalPrice: parseInt(bookData.pricing?.ebook?.originalPrice, 10) || 350,
          format: bookData.pricing?.ebook?.format || 'EPUB / PDF 雙版本',
          instantAccess: true
        },
        bundle: {
          price: parseInt(bookData.pricing?.bundle?.price, 10) || 520,
          originalPrice: parseInt(bookData.pricing?.bundle?.originalPrice, 10) || 830,
          discountDesc: '實體 + 電子書合購優惠'
        }
      },
      samplePreview: bookData.samplePreview || {
        available: true,
        previewTitle: `【線上試閱】《${bookData.title.trim()}》精選章節`,
        previewSubtitle: '由作者親自撰選導讀章節，供讀者免費在線搶先閱讀',
        readTimeMinutes: 5,
        chapters: [
          {
            chapterId: 'ch1',
            title: '第一章：草木風土與島嶼記憶',
            content: `### 前言導讀\n\n草木有靈，人間有情。本書由作者深入島嶼田野採集編撰，記載最道地的草木生活智慧。\n\n欲深入閱讀全本內容，敬請支持實體書或電子書！`
          }
        ],
        previewNotice: '線上試閱篇章已告一段落。欲閱讀全本請購買實體書或電子書！'
      }
    };

    this.books.unshift(newBook);
    persistence.debounceSave('books', this.books);
    return newBook;
  }

  /**
   * 後台更新書目基本資料與定價
   */
  async adminUpdateBook(id, updateData) {
    const bookIndex = this.books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
      throw new Error(`找不到 ID 為 ${id} 之書籍`);
    }

    const current = this.books[bookIndex];

    const updated = {
      ...current,
      ...updateData,
      pricing: {
        ...current.pricing,
        ...(updateData.pricing || {}),
        physical: {
          ...current.pricing?.physical,
          ...(updateData.pricing?.physical || {})
        },
        ebook: {
          ...current.pricing?.ebook,
          ...(updateData.pricing?.ebook || {})
        },
        bundle: {
          ...current.pricing?.bundle,
          ...(updateData.pricing?.bundle || {})
        }
      },
      samplePreview: {
        ...current.samplePreview,
        ...(updateData.samplePreview || {})
      }
    };

    this.books[bookIndex] = updated;
    persistence.debounceSave('books', this.books);
    return updated;
  }

  /**
   * 後台刪除書目
   */
  async adminDeleteBook(id) {
    const bookIndex = this.books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
      throw new Error(`找不到 ID 為 ${id} 之書籍`);
    }

    const deleted = this.books.splice(bookIndex, 1)[0];
    persistence.debounceSave('books', this.books);
    return deleted;
  }

  /**
   * 後台專門建立與編輯線上試閱內容 (Trial Reading Builder)
   */
  async adminUpdateTrialPreview(id, { previewTitle, previewSubtitle, readTimeMinutes, chapters = [], previewNotice, available = true }) {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      throw new Error(`找不到 ID 為 ${id} 之書籍`);
    }

    const formattedChapters = Array.isArray(chapters)
      ? chapters.map((ch, idx) => ({
          chapterId: ch.chapterId || `ch_${idx + 1}`,
          title: ch.title || `第 ${idx + 1} 章試閱`,
          content: ch.content || ''
        }))
      : [];

    book.samplePreview = {
      available: Boolean(available),
      previewTitle: previewTitle?.trim() || book.samplePreview?.previewTitle || `【線上試閱】《${book.title}》`,
      previewSubtitle: previewSubtitle?.trim() || book.samplePreview?.previewSubtitle || '章節精華在線閱讀',
      readTimeMinutes: parseInt(readTimeMinutes, 10) || book.samplePreview?.readTimeMinutes || 5,
      chapters: formattedChapters,
      previewNotice: previewNotice?.trim() || '線上試閱篇章已告一段落。欲閱讀全本請購買實體書或電子書！'
    };

    persistence.debounceSave('books', this.books);
    return book.samplePreview;
  }

  /**
   * 後台取得所有購買訂單
   */
  async adminGetOrders() {
    return this.orders;
  }

  /**
   * 後台更新訂單狀態 (如：已出貨、已完成、填寫物流單號)
   */
  async adminUpdateOrderStatus(orderId, { orderStatus, trackingNumber, paymentStatus }) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) {
      throw new Error(`找不到訂單編號 ${orderId}`);
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    persistence.debounceSave('orders', this.orders);

    return order;
  }

  /**
   * 批次匯入書庫藏書
   */
  async batchImportBooks(items, operatorName = 'Curator') {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('未提供欲匯入的書目資料項目');
    }

    const insertedBooks = [];
    const errors = [];

    for (const item of items) {
      try {
        const bookPayload = {
          ...item,
          pricing: {
            physical: {
              price: parseInt(item.price || item.pricing?.physical?.price, 10) || 450,
              originalPrice: parseInt(item.originalPrice || item.pricing?.physical?.originalPrice, 10) || 550,
              stock: parseInt(item.stock || item.pricing?.physical?.stock, 10) || 50,
              format: item.format || '平裝全彩'
            },
            ebook: {
              price: Math.round((parseInt(item.price || item.pricing?.physical?.price, 10) || 450) * 0.7),
              originalPrice: parseInt(item.originalPrice || item.pricing?.physical?.originalPrice, 10) || 550,
              format: 'EPUB / PDF',
              instantAccess: true
            }
          },
          summary: item.summary || item.description || '暫無內容簡介',
          coverImage: item.coverImage || item.imageUrl || item.image || '/images/uploads/default_book.jpg',
          samplePreview: item.samplePreview || {
            available: true,
            previewTitle: `【線上試閱】《${item.title}》`,
            previewSubtitle: '精選試閱章節',
            readTimeMinutes: 5,
            chapters: [
              {
                chapterId: 'ch1',
                title: '前言與試閱章節',
                content: item.trialNotice || item.description || '本書由專家團隊編纂，記錄道地草木生活文化智慧。'
              }
            ],
            previewNotice: item.trialNotice || '線上試閱篇章已告一段落。欲閱讀全本請購買實體書或電子書！'
          }
        };

        const created = await this.adminCreateBook(bookPayload);
        insertedBooks.push(created);
      } catch (err) {
        errors.push({ title: item.title || '未命名書籍', error: err.message });
      }
    }

    return {
      success: true,
      totalRequested: items.length,
      insertedCount: insertedBooks.length,
      errorCount: errors.length,
      insertedBooks,
      errors
    };
  }
}

module.exports = new BookService();
