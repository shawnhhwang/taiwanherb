/**
 * server/services/importExportService.js
 * 本草資料匯入解析驗證、線上工作台編輯存檔、與多格式 (JSON / CSV / Markdown) 條件篩選匯出
 */
const herbRepository = require('../repositories/herbRepository');
const dbFactory = require('../config/dbFactory');
const formulaService = require('./formulaService');
const bookService = require('./bookService');
const shopService = require('./shopService');
const ragService = require('./ragService');
const userService = require('./userService');
const {
  SAMPLE_HERBS_JSON,
  SAMPLE_HERBS_CSV,
  SAMPLE_SHOPS_JSON,
  SAMPLE_SHOPS_CSV,
  SAMPLE_BOOKS_JSON,
  SAMPLE_BOOKS_CSV
} = require('../data/sampleImportData');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const AdmZip = require('adm-zip');

const UPLOAD_DIR_PUBLIC = path.resolve(__dirname, '../../client/public/images/uploads');
const UPLOAD_DIR_DIST = path.resolve(__dirname, '../../client/dist/images/uploads');

function ensureUploadDirs() {
  if (!fs.existsSync(UPLOAD_DIR_PUBLIC)) {
    fs.mkdirSync(UPLOAD_DIR_PUBLIC, { recursive: true });
  }
  const clientDist = path.resolve(__dirname, '../../client/dist');
  if (fs.existsSync(clientDist)) {
    if (!fs.existsSync(UPLOAD_DIR_DIST)) {
      fs.mkdirSync(UPLOAD_DIR_DIST, { recursive: true });
    }
  }
}

class ImportExportService {
  /**
   * 取得標準匯入範例資料 (支援 草藥 herbs、草藥店 shops、書庫 books；格式支援 json、csv、xlsx)
   */
  getSample(format = 'json', targetType = 'herbs') {
    const type = targetType || 'herbs';
    let jsonData = SAMPLE_HERBS_JSON;
    let csvData = SAMPLE_HERBS_CSV;
    let baseFilename = 'taiwanherb_herbs_sample';

    if (type === 'shops') {
      jsonData = SAMPLE_SHOPS_JSON;
      csvData = SAMPLE_SHOPS_CSV;
      baseFilename = 'taiwanherb_shops_sample';
    } else if (type === 'books') {
      jsonData = SAMPLE_BOOKS_JSON;
      csvData = SAMPLE_BOOKS_CSV;
      baseFilename = 'taiwanherb_books_sample';
    }

    if (format === 'csv') {
      return {
        format: 'csv',
        filename: `${baseFilename}.csv`,
        contentType: 'text/csv; charset=utf-8',
        content: csvData
      };
    }

    if (format === 'xlsx') {
      const rows = jsonData.map(item => {
        const copy = { ...item };
        for (const k in copy) {
          if (Array.isArray(copy[k])) {
            copy[k] = copy[k].join('、');
          }
        }
        return copy;
      });

      const ws = xlsx.utils.json_to_sheet(rows);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, type === 'herbs' ? '草藥典藏' : (type === 'shops' ? '草藥老舖' : '草木書庫'));
      const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

      return {
        format: 'xlsx',
        filename: `${baseFilename}.xlsx`,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        buffer
      };
    }

    return {
      format: 'json',
      filename: `${baseFilename}.json`,
      contentType: 'application/json; charset=utf-8',
      content: jsonData
    };
  }

  /**
   * 解析並驗證匯入資料 (Excel / CSV / JSON)，回傳線上工作台可編輯結構
   */
  parseAndValidate(input, format = 'json', targetType = 'herbs') {
    let rawContent = input;
    let base64Data = null;
    let type = targetType || 'herbs';

    if (typeof input === 'object' && input !== null && !Array.isArray(input)) {
      rawContent = input.content;
      base64Data = input.base64Data;
      format = input.format || format;
      type = input.targetType || type;
    }

    if (!rawContent && !base64Data) {
      throw new Error('匯入內容為空，請上傳檔案或貼入資料');
    }

    let parsedList = [];

    if (format === 'xlsx' || format === 'xls' || base64Data) {
      if (!base64Data && typeof rawContent === 'string') {
        base64Data = rawContent;
      }
      try {
        const pureBase64 = base64Data.replace(/^data:application\/[a-zA-Z0-9.-]+;base64,/, '');
        const buf = Buffer.from(pureBase64, 'base64');
        const wb = xlsx.read(buf, { type: 'buffer' });
        const sheetName = wb.SheetNames[0];
        if (!sheetName) throw new Error('Excel 檔案內無有效工作表 (Worksheet)');
        const ws = wb.Sheets[sheetName];
        parsedList = xlsx.utils.sheet_to_json(ws);
        parsedList = parsedList.map(row => this.normalizeRowKeys(row, type));
      } catch (err) {
        throw new Error(`Excel 檔案解析失敗：${err.message}`);
      }
    } else if (format === 'csv' || (typeof rawContent === 'string' && rawContent.includes(','))) {
      parsedList = this.parseCsv(rawContent, type);
    } else {
      parsedList = this.parseJson(rawContent);
    }

    if (!Array.isArray(parsedList) || parsedList.length === 0) {
      throw new Error(`未能解析出有效的${type === 'shops' ? '草藥店' : (type === 'books' ? '書庫' : '本草')}資料列，請檢查格式是否符合規範`);
    }

    // 依 targetType 執行規格檢驗與資料映射
    if (type === 'shops') {
      return this.validateShopItems(parsedList);
    } else if (type === 'books') {
      return this.validateBookItems(parsedList);
    } else {
      return this.validateHerbItems(parsedList);
    }
  }

  /**
   * 驗證草藥本草資料列
   */
  validateHerbItems(parsedList) {
    const validatedItems = parsedList.map((item, idx) => {
      const errors = [];
      const warnings = [];

      if (!item.name || item.name.trim() === '') {
        errors.push('藥材名稱為必填項');
      }
      if (!item.category || item.category.trim() === '') {
        errors.push('本草分類為必填項');
      }
      if (!item.nature || item.nature.trim() === '') {
        warnings.push('未指定藥性 (溫/平/寒/涼)，將預設為「平」');
      }

      const taste = this.normalizeArray(item.taste);
      const channels = this.normalizeArray(item.channels);
      const tags = this.normalizeArray(item.tags);

      const isValid = errors.length === 0;

      return {
        tempId: `import_herb_${Date.now()}_${idx + 1}`,
        name: (item.name || '').trim(),
        scientificName: (item.scientificName || '').trim(),
        family: (item.family || '').trim(),
        region: (item.region || '全島平野與山麓').trim(),
        category: (item.category || '民間草藥類').trim(),
        nature: (item.nature || '平').trim(),
        taste: taste.length > 0 ? taste : ['甘'],
        channels: channels.length > 0 ? channels : ['肺', '脾'],
        partsUsed: (item.partsUsed || '全草').trim(),
        efficacy: (item.efficacy || '清熱調和、民間習用').trim(),
        terroir: (item.terroir || '性喜台灣亞熱帶向陽氣候').trim(),
        taiwanHeritage: (item.taiwanHeritage || item.heritage || '台灣民間百年相傳之草本智慧').trim(),
        folkApplication: (item.folkApplication || '家常煎煮茶飲、外洗舒爽').trim(),
        safetyLevel: (item.safetyLevel || '無毒常服').trim(),
        contraindications: (item.contraindications || '依體質適量使用，孕婦遵醫囑').trim(),
        tags: tags.length > 0 ? tags : ['台灣本草', '民間茶飲'],
        imageUrl: item.imageUrl || item.thumbnailUrl || '/images/herbs/default_herb.svg',
        thumbnailUrl: item.thumbnailUrl || item.imageUrl || '/images/herbs/default_herb.svg',
        status: item.status || 'published',
        isValid,
        errors,
        warnings
      };
    });

    const errorCount = validatedItems.filter(i => !i.isValid).length;
    const validCount = validatedItems.length - errorCount;

    return {
      targetType: 'herbs',
      total: validatedItems.length,
      validCount,
      errorCount,
      items: validatedItems
    };
  }

  /**
   * 驗證草藥老舖資料列
   */
  validateShopItems(parsedList) {
    const validatedItems = parsedList.map((item, idx) => {
      const errors = [];
      const warnings = [];

      if (!item.name || item.name.trim() === '') {
        errors.push('店家名稱為必填項');
      }
      if (!item.address || item.address.trim() === '') {
        warnings.push('未填寫詳細地址');
      }

      const tags = this.normalizeArray(item.tags);
      const featuredHerbs = this.normalizeArray(item.featuredHerbs);
      const shippingAvailable = item.shippingAvailable === true || item.shippingAvailable === 'true' || item.shippingAvailable === '是' || item.shippingAvailable === 1;

      const isValid = errors.length === 0;

      return {
        tempId: `import_shop_${Date.now()}_${idx + 1}`,
        name: (item.name || '').trim(),
        region: (item.region || '北部 (萬華/淡水河/雙北)').trim(),
        city: (item.city || '台北市').trim(),
        district: (item.district || '').trim(),
        address: (item.address || '').trim(),
        phone: (item.phone || '').trim(),
        history: (item.history || '百年傳承青草世家').trim(),
        specialties: (item.specialties || '消暑退火茶、四季青草養生包').trim(),
        businessHours: (item.businessHours || '週一至週六 09:00 - 19:00').trim(),
        badge: (item.badge || '草藥名舖').trim(),
        tags: tags.length > 0 ? tags : ['青草名店', '老字號'],
        featuredHerbs: featuredHerbs.length > 0 ? featuredHerbs : ['大花咸豐草', '薄荷'],
        buyingGuide: (item.buyingGuide || '青草乾品應密封置於陰涼乾燥處').trim(),
        shippingAvailable,
        imageUrl: item.imageUrl || item.image || '/images/uploads/default_shop.jpg',
        isValid,
        errors,
        warnings
      };
    });

    const errorCount = validatedItems.filter(i => !i.isValid).length;
    const validCount = validatedItems.length - errorCount;

    return {
      targetType: 'shops',
      total: validatedItems.length,
      validCount,
      errorCount,
      items: validatedItems
    };
  }

  /**
   * 驗證草木書閣資料列
   */
  validateBookItems(parsedList) {
    const validatedItems = parsedList.map((item, idx) => {
      const errors = [];
      const warnings = [];

      if (!item.title || item.title.trim() === '') {
        errors.push('書籍名稱為必填項');
      }
      if (!item.author || item.author.trim() === '') {
        errors.push('作者為必填項');
      }

      const price = parseInt(item.price, 10) || 450;
      const originalPrice = parseInt(item.originalPrice, 10) || Math.round(price * 1.2);
      const pages = parseInt(item.pages, 10) || 250;
      const rating = parseFloat(item.rating) || 4.9;
      const reviewsCount = parseInt(item.reviewsCount || item.reviewCount, 10) || 50;

      const isValid = errors.length === 0;

      return {
        tempId: `import_book_${Date.now()}_${idx + 1}`,
        title: (item.title || '').trim(),
        subtitle: (item.subtitle || '').trim(),
        author: (item.author || '').trim(),
        authorRole: (item.authorRole || '臺灣本草權威專家').trim(),
        category: (item.category || 'botany_herbs').trim(),
        categoryName: (item.categoryName || '植物學與生藥誌').trim(),
        coverBadge: (item.coverBadge || '經典藏書').trim(),
        coverColor: (item.coverColor || '#1e3a8a').trim(),
        coverIcon: (item.coverIcon || '🌿').trim(),
        price,
        originalPrice,
        pages,
        isbn: (item.isbn || `978-986-${Math.floor(10000 + Math.random() * 90000)}-0`).trim(),
        rating,
        reviewsCount,
        description: (item.description || item.summary || '深度收錄臺灣本草田野考證與常民生活應用智慧。').trim(),
        trialNotice: (item.trialNotice || '開放精選試閱章節在線閱讀。').trim(),
        coverImage: item.coverImage || item.imageUrl || item.image || '/images/uploads/default_book.jpg',
        isValid,
        errors,
        warnings
      };
    });

    const errorCount = validatedItems.filter(i => !i.isValid).length;
    const validCount = validatedItems.length - errorCount;

    return {
      targetType: 'books',
      total: validatedItems.length,
      validCount,
      errorCount,
      items: validatedItems
    };
  }

  /**
   * 批次確認寫入資料庫 (支援 草藥庫 herbs、草藥店 shops、書庫 books)
   */
  async commitBatch(items, operatorName = 'Curator', targetType = 'herbs') {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('未提供欲寫入的資料項目');
    }

    const type = targetType || 'herbs';

    if (type === 'shops') {
      const res = await shopService.batchImportShops(items, operatorName);
      herbRepository.addAuditLog('IMPORT_SHOPS', 'Batch Import Shops', `由「${operatorName}」批次匯入 ${res.insertedCount} 間草藥店`);
      return res;
    }

    if (type === 'books') {
      const res = await bookService.batchImportBooks(items, operatorName);
      herbRepository.addAuditLog('IMPORT_BOOKS', 'Batch Import Books', `由「${operatorName}」批次匯入 ${res.insertedCount} 本新書`);
      return res;
    }

    // 預設為草藥典藏庫 (herbs)
    const insertedHerbs = [];
    const errors = [];

    for (const item of items) {
      try {
        if (!item.name || !item.category) {
          throw new Error(`藥材名稱與分類必填 (項目: ${item.name || '未命名'})`);
        }

        const herbPayload = {
          name: item.name,
          scientificName: item.scientificName || '',
          family: item.family || '',
          region: item.region || '全島平野',
          category: item.category,
          nature: item.nature || '平',
          taste: Array.isArray(item.taste) ? item.taste : [item.taste],
          channels: Array.isArray(item.channels) ? item.channels : [item.channels],
          partsUsed: item.partsUsed || '全草',
          efficacy: item.efficacy || '',
          terroir: item.terroir || '',
          taiwanHeritage: item.taiwanHeritage || '',
          folkApplication: item.folkApplication || '',
          safetyLevel: item.safetyLevel || '無毒常服',
          contraindications: item.contraindications || '',
          tags: Array.isArray(item.tags) ? item.tags : [item.tags],
          thumbnailUrl: item.thumbnailUrl || item.imageUrl || '/images/herbs/default_herb.svg',
          imageUrl: item.imageUrl || item.thumbnailUrl || '/images/herbs/default_herb.svg',
          status: item.status || 'published'
        };

        const created = await herbRepository.create(herbPayload);
        insertedHerbs.push(created);
      } catch (err) {
        errors.push({ name: item.name, error: err.message });
      }
    }

    // 紀錄審計日誌
    herbRepository.addAuditLog('IMPORT_BATCH', 'Batch Import', `由「${operatorName}」批次匯入 ${insertedHerbs.length} 味新本草`);

    return {
      success: true,
      totalRequested: items.length,
      insertedCount: insertedHerbs.length,
      errorCount: errors.length,
      insertedHerbs,
      errors
    };
  }

  /**
   * 條件篩選資料匯出 (支援 JSON / CSV / Markdown)
   */
  async exportHerbs({ format = 'json', region, category, status, query }) {
    // 取得所有藥材
    const rawHerbs = await herbRepository.getAllRaw();

    // 依條件篩選
    let filtered = rawHerbs;

    if (region && region !== '全部') {
      filtered = filtered.filter(h => (h.region || '').includes(region));
    }

    if (category && category !== '全部') {
      filtered = filtered.filter(h => h.category === category);
    }

    if (status && status !== '全部') {
      filtered = filtered.filter(h => (h.status || 'published') === status);
    }

    if (query && query.trim() !== '') {
      const q = query.toLowerCase();
      filtered = filtered.filter(h =>
        (h.name && h.name.toLowerCase().includes(q)) ||
        (h.scientificName && h.scientificName.toLowerCase().includes(q)) ||
        (h.efficacy && h.efficacy.toLowerCase().includes(q))
      );
    }

    const timestamp = new Date().toISOString().slice(0, 10);

    // 1. CSV 格式 (包含 UTF-8 BOM，Excel 雙擊不亂碼)
    if (format === 'csv') {
      const headers = [
        'ID',
        '藥材名稱',
        '學名',
        '科屬',
        '風土產區',
        '本草分類',
        '藥性',
        '藥味',
        '歸經',
        '部位',
        '主要功效',
        '風土記述',
        '民間應用',
        '安全等級',
        '禁忌提示',
        '狀態'
      ];

      const rows = filtered.map(h => [
        h.id,
        this.escapeCsvCell(h.name),
        this.escapeCsvCell(h.scientificName),
        this.escapeCsvCell(h.family),
        this.escapeCsvCell(h.region),
        this.escapeCsvCell(h.category),
        this.escapeCsvCell(h.nature),
        this.escapeCsvCell(Array.isArray(h.taste) ? h.taste.join('、') : h.taste),
        this.escapeCsvCell(Array.isArray(h.channels) ? h.channels.join('、') : h.channels),
        this.escapeCsvCell(h.partsUsed),
        this.escapeCsvCell(h.efficacy),
        this.escapeCsvCell(h.terroir || h.taiwanHeritage),
        this.escapeCsvCell(h.folkApplication),
        this.escapeCsvCell(h.safetyLevel),
        this.escapeCsvCell(h.contraindications),
        this.escapeCsvCell(h.status || 'published')
      ].join(','));

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');

      return {
        contentType: 'text/csv; charset=utf-8',
        filename: `taiwanherb_export_${timestamp}.csv`,
        content: csvContent,
        count: filtered.length
      };
    }

    // 2. Markdown 本草標本手冊格式 (精美排版植物誌)
    if (format === 'markdown' || format === 'md') {
      const mdContent = this.generateMarkdownSpecimenBook(filtered, { region, category, status });
      return {
        contentType: 'text/markdown; charset=utf-8',
        filename: `taiwanherb_specimen_book_${timestamp}.md`,
        content: mdContent,
        count: filtered.length
      };
    }

    // 3. JSON 格式 (預設)
    return {
      contentType: 'application/json; charset=utf-8',
      filename: `taiwanherb_export_${timestamp}.json`,
      content: JSON.stringify(filtered, null, 2),
      count: filtered.length
    };
  }

  /**
   * 產出精美 Markdown 格式之本草植物誌標本手冊
   */
  generateMarkdownSpecimenBook(herbs, filters) {
    const filterDesc = [
      filters.region && filters.region !== '全部' ? `產區：${filters.region}` : null,
      filters.category && filters.category !== '全部' ? `分類：${filters.category}` : null,
      filters.status && filters.status !== '全部' ? `狀態：${filters.status}` : null
    ].filter(Boolean).join(' ‧ ') || '全庫典藏';

    let doc = `# 🌿 臺灣本草植物誌 · 典藏標本手冊
> **典藏日期**：${new Date().toLocaleDateString('zh-TW')}  
> **典藏範圍**：${filterDesc}  
> **收錄數量**：共收錄 ${herbs.length} 味臺灣本土島嶼本草  
> **編審印記**：臺灣本草植物誌典藏委員會 ‧ 國家植物文獻彙編  
> ⚠️ **知識合規宣告**：本手冊所載本草性味與文獻條目純屬臺灣本土傳統常民文化與古籍歷史考證分享，**非屬醫療意見，不具任何醫療效果、診斷或治療疾病之功能**。若有身體不適，請遵循合格中西醫療院所診治。

---

## 📑 典藏本草目錄索隱
| 編號 | 本草名稱 | 學名 | 產區風土 | 性味歸經 | 安全等級 |
| :--- | :--- | :--- | :--- | :--- | :--- |
${herbs.map(h => `| #${h.id} | **${h.name}** | *${h.scientificName || '-'}* | ${h.region || '全島'} | ${h.nature || '平'} / ${(h.taste || []).join('、')} / ${(h.channels || []).join('、')}經 | \`${h.safetyLevel || '無毒常服'}\` |`).join('\n')}

---

## 🍃 本草標本典藏詳細條目

`;

    herbs.forEach((h, index) => {
      doc += `### 【第 ${index + 1} 味】${h.name} (*${h.scientificName || '學名待考'}*)

* **科屬類別**：${h.family || '待定'} ‧ **分類**：${h.category || '民間草藥'}
* **島嶼風土**：${h.region || '全島平野與山麓'}
* **四氣五味**：性**${h.nature || '平'}**，味**${(h.taste || []).join('、')}**
* **十二歸經**：入 **${(h.channels || []).join('、')}** 經
* **藥用部位**：${h.partsUsed || '全草'}
* **安全等級**：\`${h.safetyLevel || '無毒常服'}\`

#### 📜 古籍記載與傳統生活考證
> ${h.efficacy || '暫無文獻記載'}

#### 🏞️ 風土環境與植物學特徵
${h.terroir || '性喜臺灣溫暖濕潤島嶼氣候，在淺山、原野或客庄聚落周邊自生繁茂。'}

#### 🍵 民間生活應用與人文傳承
${h.taiwanHeritage || h.folkApplication || '臺灣先民渡海拓荒，取此草以文火熬煮成青草涼茶，消暑生津、解體內鬱熱。'}
* **常民實踐**：${h.folkApplication || '青草茶煮飲、家常沐浴淨身'}

#### ⚠️ 使用禁忌與安全指引
> **注意**：${h.contraindications || '平和無毒，脾胃虛弱者酌量調和。'}

---

`;
    });

    doc += `\n*本手冊由「臺灣本草植物誌 (TAIWAN HERB WIKI)」後台管理系統自動編譯輸出。內容純屬民間古早知識文化交流，非醫療效果宣稱。*\n`;
    return doc;
  }

  // 建立表頭對應與通用欄位映射字典
  normalizeRowKeys(row, targetType = 'herbs') {
    const fieldMap = {
      // 通用 & 草藥
      '名稱': 'name', '藥材名稱': 'name', '店家名稱': 'name', '店名': 'name', 'name': 'name',
      '學名': 'scientificName', 'scientificname': 'scientificName',
      '科屬': 'family', 'family': 'family',
      '風土產區': 'region', '產區': 'region', '風土區域': 'region', '區域': 'region', 'region': 'region',
      '本草分類': 'category', '分類': 'category', 'category': 'category',
      '藥性': 'nature', 'nature': 'nature',
      '藥味': 'taste', 'taste': 'taste',
      '歸經': 'channels', 'channels': 'channels',
      '部位': 'partsUsed', '藥用部位': 'partsUsed', 'partsused': 'partsUsed',
      '功效': 'efficacy', '主要功效': 'efficacy', '功效描述': 'efficacy', 'efficacy': 'efficacy',
      '風土': 'terroir', '風土記述': 'terroir', 'terroir': 'terroir',
      '風土傳承故事': 'taiwanHeritage', '傳承': 'taiwanHeritage', 'taiwanheritage': 'taiwanHeritage',
      '民間應用': 'folkApplication', '生活應用': 'folkApplication', '民間生活應用': 'folkApplication', 'folkapplication': 'folkApplication',
      '安全等級': 'safetyLevel', 'safetylevel': 'safetyLevel',
      '禁忌': 'contraindications', '禁忌提示': 'contraindications', 'contraindications': 'contraindications',
      '標籤': 'tags', '特色標籤': 'tags', 'tags': 'tags',
      '圖片': 'imageUrl', '圖片路徑': 'imageUrl', '縮圖': 'imageUrl', 'image': 'imageUrl', 'imageurl': 'imageUrl', 'thumbnailUrl': 'imageUrl',
      // 店家專屬
      '縣市': 'city', 'city': 'city',
      '鄉鎮市區': 'district', '行政區': 'district', 'district': 'district',
      '地址': 'address', '詳細地址': 'address', 'address': 'address',
      '電話': 'phone', '聯絡電話': 'phone', 'phone': 'phone',
      '歷史': 'history', '歷史淵源': 'history', 'history': 'history',
      '特色': 'specialties', '招牌特色': 'specialties', 'specialties': 'specialties',
      '營業時間': 'businessHours', '時間': 'businessHours', 'businesshours': 'businessHours',
      '標章': 'badge', '認證標章': 'badge', 'badge': 'badge',
      '主打藥材': 'featuredHerbs', 'featuredherbs': 'featuredHerbs',
      '採買指引': 'buyingGuide', '採買指南': 'buyingGuide', 'buyingguide': 'buyingGuide',
      '支援宅配': 'shippingAvailable', '宅配': 'shippingAvailable', 'shippingavailable': 'shippingAvailable',
      // 書籍專屬
      '書名': 'title', '書籍名稱': 'title', 'title': 'title',
      '副標題': 'subtitle', 'subtitle': 'subtitle',
      '作者': 'author', 'author': 'author',
      '作者頭銜': 'authorRole', '頭銜': 'authorRole', 'authorrole': 'authorRole',
      '分類代碼': 'category', '分類名稱': 'categoryName', 'categoryname': 'categoryName',
      '封面標章': 'coverBadge', 'coverbadge': 'coverBadge',
      '代表圖標': 'coverIcon', 'covericon': 'coverIcon',
      '封面色系': 'coverColor', 'covercolor': 'coverColor',
      '定價': 'price', '價格': 'price', 'price': 'price',
      '原價': 'originalPrice', 'originalprice': 'originalPrice',
      '頁數': 'pages', 'pages': 'pages',
      '國際書號': 'isbn', '國際書號isbn': 'isbn', 'isbn': 'isbn',
      '評分': 'rating', 'rating': 'rating',
      '評論數': 'reviewsCount', '讀者評論數': 'reviewsCount', 'reviewscount': 'reviewsCount',
      '書籍簡介': 'description', '簡介': 'description', 'description': 'description', 'summary': 'description',
      '試閱說明': 'trialNotice', '試閱': 'trialNotice', 'trialnotice': 'trialNotice',
      '封面圖片': 'coverImage', '封面圖片路徑': 'coverImage', 'coverimage': 'coverImage'
    };

    const newObj = {};
    for (const key of Object.keys(row)) {
      const cleanK = key.trim().toLowerCase();
      const mapped = fieldMap[key.trim()] || fieldMap[cleanK] || cleanK;
      newObj[mapped] = row[key];
    }
    return newObj;
  }

  // 輔助 CSV 解析
  parseCsv(csvText, targetType = 'herbs') {
    // 移除 UTF-8 BOM
    const clean = csvText.replace(/^\uFEFF/, '').trim();
    const lines = clean.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headerLine = lines[0];
    const headers = this.parseCsvLine(headerLine);
    const parsedRows = [];

    for (let i = 1; i < lines.length; i++) {
      const cells = this.parseCsvLine(lines[i]);
      if (cells.length === 0) continue;

      const rawRow = {};
      headers.forEach((h, colIdx) => {
        rawRow[h.trim()] = cells[colIdx] || '';
      });

      const normalized = this.normalizeRowKeys(rawRow, targetType);
      if (normalized.name || normalized.title) {
        parsedRows.push(normalized);
      }
    }

    return parsedRows;
  }

  parseCsvLine(line) {
    const result = [];
    let cur = '';
    let inQuote = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuote = !inQuote;
        }
      } else if (ch === ',' && !inQuote) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    result.push(cur.trim());
    return result;
  }

  parseJson(text) {
    if (typeof text === 'object') return Array.isArray(text) ? text : [text];
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [parsed];
  }

  normalizeArray(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      return val.split(/[、,，|/]/).map(s => s.trim()).filter(Boolean);
    }
    return [String(val)];
  }

  escapeCsvCell(val) {
    if (val === undefined || val === null) return '""';
    let str = String(val);
    // 防禦 CSV 公式注入 (CSV Injection / Formula Injection)
    if (/^[=+\-@\t\r]/.test(str)) {
      str = "'" + str;
    }
    return `"${str.replace(/"/g, '""')}"`;
  }

  /**
   * 儲存單張上傳的圖片 (網頁上即時編輯更換或單圖上傳)
   * 同時寫入 client/public/images/uploads 與 client/dist/images/uploads
   */
  async saveUploadedImage({ filename, base64Data }) {
    if (!filename || !base64Data) {
      throw new Error('請提供圖片檔名與 Base64 數據');
    }

    ensureUploadDirs();

    // 安全考量排除易遭注入惡意指令碼的 .svg，僅允許點陣點陣圖檔
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const ext = path.extname(filename).toLowerCase();
    if (!allowedExts.includes(ext)) {
      throw new Error(`不支援的圖片格式：${ext}。支援格式：${allowedExts.join(', ')} (基於資安考量禁止上傳 SVG)`);
    }

    const pureBase64 = base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
    const imgBuffer = Buffer.from(pureBase64, 'base64');

    const cleanBase = path.basename(filename, ext).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5-]/g, '_');
    const finalFilename = `${cleanBase}_${Date.now()}${ext}`;

    const publicFilePath = path.join(UPLOAD_DIR_PUBLIC, finalFilename);
    await fs.promises.writeFile(publicFilePath, imgBuffer);

    if (fs.existsSync(UPLOAD_DIR_DIST)) {
      const distFilePath = path.join(UPLOAD_DIR_DIST, finalFilename);
      await fs.promises.writeFile(distFilePath, imgBuffer).catch(() => {});
    }

    const relativeUrl = `/images/uploads/${finalFilename}`;

    return {
      success: true,
      filename: finalFilename,
      url: relativeUrl
    };
  }

  /**
   * 解壓整包圖片壓縮包 (ZIP Archive)
   * 支援將圖片包解壓後放入 uploads 目錄，並回傳可用圖片清單供資料匹配
   */
  async extractImageArchive({ zipBase64 }) {
    if (!zipBase64) {
      throw new Error('未提供 ZIP 壓縮包資料');
    }

    ensureUploadDirs();

    const pureBase64 = zipBase64.replace(/^data:application\/[a-zA-Z0-9.-]+;base64,/, '');
    const zipBuffer = Buffer.from(pureBase64, 'base64');
    const zip = new AdmZip(zipBuffer);
    const zipEntries = zip.getEntries();

    if (zipEntries.length > 100) {
      throw new Error('壓縮包內檔案數量過多（上限 100 張圖片），以防範伺服器過載');
    }

    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const extractedImages = [];
    let totalUncompressedSize = 0;
    const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB 總解壓限制
    const MAX_SINGLE_SIZE = 5 * 1024 * 1024; // 5MB 單檔限制

    for (const entry of zipEntries) {
      if (entry.isDirectory) continue;
      if (entry.entryName.startsWith('__MACOSX') || entry.entryName.includes('/.')) continue;

      const ext = path.extname(entry.name).toLowerCase();
      if (!allowedExts.includes(ext)) continue;

      if (entry.header.size > MAX_SINGLE_SIZE) {
        continue; // 略過超過 5MB 的異常大單圖
      }

      totalUncompressedSize += entry.header.size;
      if (totalUncompressedSize > MAX_TOTAL_SIZE) {
        throw new Error('壓縮包解壓總大小超出安全限制 (50MB)，解壓作業已中止');
      }

      const baseName = path.basename(entry.name);
      const cleanName = baseName.replace(/[^a-zA-Z0-9._\u4e00-\u9fa5-]/g, '_');

      const fileData = entry.getData();
      const publicFilePath = path.join(UPLOAD_DIR_PUBLIC, cleanName);
      await fs.promises.writeFile(publicFilePath, fileData);

      if (fs.existsSync(UPLOAD_DIR_DIST)) {
        const distFilePath = path.join(UPLOAD_DIR_DIST, cleanName);
        await fs.promises.writeFile(distFilePath, fileData).catch(() => {});
      }

      extractedImages.push({
        originalName: entry.name,
        filename: cleanName,
        url: `/images/uploads/${cleanName}`,
        size: entry.header.size
      });
    }

    return {
      success: true,
      totalExtracted: extractedImages.length,
      images: extractedImages
    };
  }

  /**
   * 後台資料庫下載備份 (支援單獨下載指定資料庫或全庫完整備份快照)
   * @param {Object} options
   * @param {string} options.type 'all' | 'herbs' | 'formulas' | 'books' | 'shops' | 'experts' | 'users'
   * @param {string} options.operatorName 操作者名稱
   */
  async exportDatabase({ type = 'all', operatorName = '管理員' } = {}) {
    const dateStr = new Date().toISOString().slice(0, 10);
    const nowIso = new Date().toISOString();

    // 1. 單獨下載：本草典藏資料庫 (Herbs)
    if (type === 'herbs') {
      const records = dbFactory.getMemoryStore();
      const content = JSON.stringify({
        database: 'herbs',
        title: '台灣肯信本草研究室 · 典藏本草資料庫單獨備份檔',
        exportedAt: nowIso,
        exportedBy: operatorName,
        totalRecords: records.length,
        records
      }, null, 2);
      return {
        format: 'json',
        filename: `taiwanherb_herbs_db_${dateStr}.json`,
        contentType: 'application/json; charset=utf-8',
        content,
        totalRecords: records.length,
        type: 'herbs'
      };
    }

    // 2. 單獨下載：方劑與傳承名方資料庫 (Formulas)
    if (type === 'formulas') {
      const formulas = await formulaService.getFormulas();
      const content = JSON.stringify({
        database: 'formulas',
        title: '台灣肯信本草研究室 · 方劑研製與傳承名方庫單獨備份檔',
        exportedAt: nowIso,
        exportedBy: operatorName,
        totalRecords: formulas.length,
        records: formulas
      }, null, 2);
      return {
        format: 'json',
        filename: `taiwanherb_formulas_db_${dateStr}.json`,
        contentType: 'application/json; charset=utf-8',
        content,
        totalRecords: formulas.length,
        type: 'formulas'
      };
    }

    // 3. 單獨下載：草木書閣藏書與試閱資料庫 (Books)
    if (type === 'books') {
      const books = await bookService.adminGetBooks();
      const content = JSON.stringify({
        database: 'books',
        title: '台灣肯信本草研究室 · 草木書閣藏書與線上試閱庫單獨備份檔',
        exportedAt: nowIso,
        exportedBy: operatorName,
        totalRecords: books.length,
        records: books
      }, null, 2);
      return {
        format: 'json',
        filename: `taiwanherb_books_db_${dateStr}.json`,
        contentType: 'application/json; charset=utf-8',
        content,
        totalRecords: books.length,
        type: 'books'
      };
    }

    // 4. 單獨下載：全臺結盟青草老舖資料庫 (Shops)
    if (type === 'shops') {
      const shops = await shopService.getShops();
      const content = JSON.stringify({
        database: 'shops',
        title: '台灣肯信本草研究室 · 全臺結盟青草老舖與採買指南庫單獨備份檔',
        exportedAt: nowIso,
        exportedBy: operatorName,
        totalRecords: shops.length,
        records: shops
      }, null, 2);
      return {
        format: 'json',
        filename: `taiwanherb_shops_db_${dateStr}.json`,
        contentType: 'application/json; charset=utf-8',
        content,
        totalRecords: shops.length,
        type: 'shops'
      };
    }

    // 5. 單獨下載：專家 Persona 與 RAG 語意資料庫 (Experts)
    if (type === 'experts') {
      const experts = ragService.getExperts();
      const content = JSON.stringify({
        database: 'experts',
        title: '台灣肯信本草研究室 · 專家 Persona 與 RAG 語意庫單獨備份檔',
        exportedAt: nowIso,
        exportedBy: operatorName,
        totalRecords: experts.length,
        records: experts
      }, null, 2);
      return {
        format: 'json',
        filename: `taiwanherb_experts_db_${dateStr}.json`,
        contentType: 'application/json; charset=utf-8',
        content,
        totalRecords: experts.length,
        type: 'experts'
      };
    }

    // 6. 單獨下載：使用者帳號與角色權限資料庫 (Users)
    if (type === 'users') {
      const users = userService.getUsers().map(u => ({
        id: u.id,
        username: u.username,
        name: u.name,
        role: u.role,
        email: u.email,
        status: u.status,
        avatar: u.avatar
      }));
      const content = JSON.stringify({
        database: 'users',
        title: '台灣肯信本草研究室 · 前後台使用者與角色權限庫單獨備份檔',
        exportedAt: nowIso,
        exportedBy: operatorName,
        totalRecords: users.length,
        records: users
      }, null, 2);
      return {
        format: 'json',
        filename: `taiwanherb_users_db_${dateStr}.json`,
        contentType: 'application/json; charset=utf-8',
        content,
        totalRecords: users.length,
        type: 'users'
      };
    }

    // 預設 (type === 'all' 或未指定)：全庫系統完整快照備份 (Full Database Snapshot)
    const herbs = dbFactory.getMemoryStore();
    const formulas = await formulaService.getFormulas();
    const books = await bookService.adminGetBooks();
    const shops = await shopService.getShops();
    const experts = ragService.getExperts();
    const users = userService.getUsers().map(u => ({
      id: u.id,
      username: u.username,
      name: u.name,
      role: u.role,
      email: u.email,
      status: u.status,
      avatar: u.avatar
    }));
    const auditLogs = await herbRepository.getAuditLogs(100);

    const fullSnapshot = {
      system: {
        name: '台灣肯信本草研究室',
        nameEn: 'Taiwan Kenshin Herb Research Lab',
        version: '2.0.0',
        environment: process.env.NODE_ENV || 'development',
        exportedAt: nowIso,
        exportedBy: operatorName,
        description: '台灣肯信本草研究室系統資料庫完整備份快照 (Full Database Snapshot)'
      },
      stats: {
        herbsCount: herbs.length,
        formulasCount: formulas.length,
        booksCount: books.length,
        shopsCount: shops.length,
        expertsCount: experts.length,
        usersCount: users.length,
        totalCollections: 6
      },
      collections: {
        herbs,
        formulas,
        books,
        shops,
        experts,
        users,
        auditLogs
      }
    };

    const content = JSON.stringify(fullSnapshot, null, 2);
    const totalRecords = herbs.length + formulas.length + books.length + shops.length + experts.length + users.length;

    return {
      format: 'json',
      filename: `taiwanherb_full_database_backup_${dateStr}.json`,
      contentType: 'application/json; charset=utf-8',
      content,
      totalRecords,
      type: 'all'
    };
  }
}

module.exports = new ImportExportService();
