/**
 * server/services/importExportService.js
 * 本草資料匯入解析驗證、線上工作台編輯存檔、與多格式 (JSON / CSV / Markdown) 條件篩選匯出
 */
const herbRepository = require('../repositories/herbRepository');
const { SAMPLE_HERBS_JSON, SAMPLE_HERBS_CSV } = require('../data/sampleImportData');

class ImportExportService {
  /**
   * 取得標準匯入範例資料
   */
  getSample(format = 'json') {
    if (format === 'csv') {
      return {
        format: 'csv',
        filename: 'taiwanherb_import_sample.csv',
        contentType: 'text/csv; charset=utf-8',
        content: SAMPLE_HERBS_CSV
      };
    }
    return {
      format: 'json',
      filename: 'taiwanherb_import_sample.json',
      contentType: 'application/json; charset=utf-8',
      content: SAMPLE_HERBS_JSON
    };
  }

  /**
   * 解析並驗證匯入文本 (JSON 或 CSV)，回傳線上工作台可編輯結構
   */
  parseAndValidate(rawContent, format = 'json') {
    if (!rawContent || (typeof rawContent === 'string' && rawContent.trim() === '')) {
      throw new Error('匯入內容為空，請上傳檔案或貼入本草資料');
    }

    let parsedList = [];

    if (format === 'csv' || (typeof rawContent === 'string' && rawContent.includes(','))) {
      parsedList = this.parseCsv(rawContent);
    } else {
      parsedList = this.parseJson(rawContent);
    }

    if (!Array.isArray(parsedList) || parsedList.length === 0) {
      throw new Error('未能解析出有效的本草資料列，請檢查格式是否符合規範');
    }

    // 進行欄位規格檢驗與線上編輯資料映射
    const validatedItems = parsedList.map((item, idx) => {
      const errors = [];
      const warnings = [];

      // 必填欄位檢查
      if (!item.name || item.name.trim() === '') {
        errors.push('藥材名稱為必填項');
      }
      if (!item.category || item.category.trim() === '') {
        errors.push('本草分類為必填項');
      }
      if (!item.nature || item.nature.trim() === '') {
        warnings.push('未指定藥性 (溫/平/寒/涼)，將預設為「平」');
      }

      // 整理陣列型別欄位
      const taste = this.normalizeArray(item.taste);
      const channels = this.normalizeArray(item.channels);
      const tags = this.normalizeArray(item.tags);

      const isValid = errors.length === 0;

      return {
        tempId: `import_row_${Date.now()}_${idx + 1}`,
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
        status: item.status || 'published',
        isValid,
        errors,
        warnings
      };
    });

    const errorCount = validatedItems.filter(i => !i.isValid).length;
    const validCount = validatedItems.length - errorCount;

    return {
      total: validatedItems.length,
      validCount,
      errorCount,
      items: validatedItems
    };
  }

  /**
   * 批次確認寫入本草庫
   */
  async commitBatch(items, operatorName = 'Curator') {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('未提供欲寫入的本草項目');
    }

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

  // 輔助 CSV 解析
  parseCsv(csvText) {
    // 移除 UTF-8 BOM
    const clean = csvText.replace(/^\uFEFF/, '').trim();
    const lines = clean.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headerLine = lines[0];
    const headers = this.parseCsvLine(headerLine);

    // 建立表頭對應字典
    const fieldMap = {
      '名稱': 'name', '藥材名稱': 'name', 'name': 'name',
      '學名': 'scientificName', 'scientificname': 'scientificName',
      '科屬': 'family', 'family': 'family',
      '風土產區': 'region', '產區': 'region', 'region': 'region',
      '本草分類': 'category', '分類': 'category', 'category': 'category',
      '藥性': 'nature', 'nature': 'nature',
      '藥味': 'taste', 'taste': 'taste',
      '歸經': 'channels', 'channels': 'channels',
      '部位': 'partsUsed', '藥用部位': 'partsUsed', 'partsused': 'partsUsed',
      '功效': 'efficacy', '主要功效': 'efficacy', '功效描述': 'efficacy', 'efficacy': 'efficacy',
      '風土': 'terroir', '風土記述': 'terroir', 'terroir': 'terroir',
      '風土傳承故事': 'taiwanHeritage', '傳承': 'taiwanHeritage', 'taiwanheritage': 'taiwanHeritage',
      '民間應用': 'folkApplication', '生活應用': 'folkApplication', 'folkapplication': 'folkApplication',
      '安全等級': 'safetyLevel', 'safetylevel': 'safetyLevel',
      '禁忌': 'contraindications', '禁忌提示': 'contraindications', 'contraindications': 'contraindications',
      '標籤': 'tags', 'tags': 'tags'
    };

    const parsedRows = [];

    for (let i = 1; i < lines.length; i++) {
      const cells = this.parseCsvLine(lines[i]);
      if (cells.length === 0) continue;

      const rowObj = {};
      headers.forEach((h, colIdx) => {
        const cleanHeader = h.trim().toLowerCase();
        const mappedField = fieldMap[h.trim()] || fieldMap[cleanHeader] || cleanHeader;
        if (mappedField) {
          rowObj[mappedField] = cells[colIdx] || '';
        }
      });

      if (rowObj.name) {
        parsedRows.push(rowObj);
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
    const str = String(val);
    return `"${str.replace(/"/g, '""')}"`;
  }
}

module.exports = new ImportExportService();
