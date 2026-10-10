/**
 * server/repositories/herbRepository.js
 * 藥材資料存取層 (支援模糊搜尋、多維度風土篩選、分頁、審計日誌與 Failover 容錯)
 */
const dbFactory = require('../config/dbFactory');
const initialHerbs = require('../data/herbsData');

class HerbRepository {
  constructor() {
    this.auditLogs = [
      {
        id: 1,
        timestamp: new Date().toISOString(),
        action: 'SYSTEM_INIT',
        entity: 'Database',
        details: '系統啟動，載入台灣本土草藥種子資料庫 (25味典藏本草)'
      }
    ];
  }

  /**
   * 搜尋與篩選藥材 (支援全方位的台灣本土風土多維度檢索)
   */
  async searchHerbs({
    query,
    category,
    channel,
    nature,
    region,
    folkApplication,
    partsUsed,
    safetyLevel,
    status,
    page = 1,
    limit = 12,
    sort = 'id_asc'
  }) {
    const data = dbFactory.getMemoryStore();

    let filtered = [...data];

    // 狀態篩選 (未指定時僅顯示 published，管理者指定 'all' 或具體狀態時除外)
    if (status && status !== '全部' && status !== 'all') {
      filtered = filtered.filter(herb => (herb.status || 'published') === status);
    } else if (!status) {
      filtered = filtered.filter(herb => (herb.status || 'published') === 'published');
    }

    // 模糊搜尋 (名稱、學名、別名、台語/客語俗名、功效、標籤、風土產地、活性成分)
    if (query && query.trim() !== '') {
      const q = query.trim().toLowerCase();
      filtered = filtered.filter(herb => {
        const matchName = herb.name.toLowerCase().includes(q);
        const matchScientific = (herb.scientificName || '').toLowerCase().includes(q);
        const matchCommon = (herb.commonNames || []).some(c => c.toLowerCase().includes(q));
        const matchDialect = (herb.dialectNames || []).some(d => (d.name || '').toLowerCase().includes(q) || (d.dialect || '').toLowerCase().includes(q));
        const matchEfficacy = (herb.efficacy || '').toLowerCase().includes(q);
        const matchCategory = (herb.category || '').toLowerCase().includes(q);
        const matchTags = (herb.tags || []).some(t => t.toLowerCase().includes(q));
        const matchPinyin = (herb.pinyin || '').toLowerCase().includes(q);
        const matchTerroir = (herb.terroir || '').toLowerCase().includes(q);
        const matchRegion = (herb.region || '').toLowerCase().includes(q);
        const matchFolk = (herb.folkApplication || '').toLowerCase().includes(q);
        const matchActive = (herb.activeCompounds || []).some(a => a.toLowerCase().includes(q));
        const matchHeritage = (herb.taiwanHeritage || '').toLowerCase().includes(q);

        return (
          matchName ||
          matchScientific ||
          matchCommon ||
          matchDialect ||
          matchEfficacy ||
          matchCategory ||
          matchTags ||
          matchPinyin ||
          matchTerroir ||
          matchRegion ||
          matchFolk ||
          matchActive ||
          matchHeritage
        );
      });
    }

    // 分類篩選
    if (category && category !== '全部' && category !== 'all') {
      filtered = filtered.filter(herb => herb.category === category);
    }

    // 歸經篩選 (channels: 肺、肝、脾、胃、心、腎、大腸、小腸、膀胱...)
    if (channel && channel !== '全部' && channel !== 'all') {
      filtered = filtered.filter(herb => (herb.channels || []).includes(channel));
    }

    // 藥性篩選 (nature: 寒、大寒、微寒、涼、平、微溫、溫、熱)
    if (nature && nature !== '全部' && nature !== 'all') {
      filtered = filtered.filter(herb => herb.nature === nature);
    }

    // 風土區域篩選 (region: 北部, 桃竹苗, 中部, 嘉南, 南部, 花東原鄉, 全島平野與山林)
    if (region && region !== '全部' && region !== 'all') {
      filtered = filtered.filter(herb => (herb.region || '').includes(region));
    }

    // 民間生活情境應用篩選 (folkApplication)
    if (folkApplication && folkApplication !== '全部' && folkApplication !== 'all') {
      filtered = filtered.filter(herb => herb.folkApplication === folkApplication);
    }

    // 入藥部位篩選 (partsUsed)
    if (partsUsed && partsUsed !== '全部' && partsUsed !== 'all') {
      filtered = filtered.filter(herb => (herb.partsUsed || '').includes(partsUsed));
    }

    // 安全等級篩選 (safetyLevel)
    if (safetyLevel && safetyLevel !== '全部' && safetyLevel !== 'all') {
      filtered = filtered.filter(herb => herb.safetyLevel === safetyLevel);
    }

    // 排序
    filtered.sort((a, b) => {
      if (sort === 'name_asc') return a.name.localeCompare(b.name, 'zh-TW');
      if (sort === 'name_desc') return b.name.localeCompare(a.name, 'zh-TW');
      if (sort === 'id_desc') return b.id - a.id;
      if (sort === 'solar') return (a.solarTermRecommendation || '').localeCompare(b.solarTermRecommendation || '', 'zh-TW');
      return a.id - b.id;
    });

    const total = filtered.length;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 12));
    const totalPages = Math.ceil(total / limitNum) || 1;
    const startIndex = (pageNum - 1) * limitNum;
    const pagedItems = filtered.slice(startIndex, startIndex + limitNum);

    return {
      items: pagedItems,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    };
  }

  /**
   * 根據 ID 取得藥材詳情
   */
  async getById(id) {
    const data = dbFactory.getMemoryStore();
    const targetId = parseInt(id, 10);
    const item = data.find(h => h.id === targetId);
    return item ? { ...item } : null;
  }

  /**
   * 隨機推薦一味藥材
   */
  async getRandom() {
    const data = dbFactory.getMemoryStore();
    const published = data.filter(h => (h.status || 'published') === 'published');
    if (!published.length) return null;
    const randomIndex = Math.floor(Math.random() * published.length);
    return { ...published[randomIndex] };
  }

  /**
   * 取得分類及數量統計
   */
  async getCategories() {
    const data = dbFactory.getMemoryStore();
    const countMap = {};
    data.forEach(herb => {
      if ((herb.status || 'published') === 'published') {
        const cat = herb.category || '其他';
        countMap[cat] = (countMap[cat] || 0) + 1;
      }
    });

    return Object.entries(countMap).map(([name, count]) => ({
      name,
      count
    }));
  }

  /**
   * 取得歸經列表及數量統計
   */
  async getChannels() {
    const data = dbFactory.getMemoryStore();
    const countMap = {};
    data.forEach(herb => {
      if ((herb.status || 'published') === 'published') {
        (herb.channels || []).forEach(ch => {
          countMap[ch] = (countMap[ch] || 0) + 1;
        });
      }
    });

    const order = ['肺', '大腸', '胃', '脾', '心', '小腸', '膀胱', '腎', '心包', '三焦', '膽', '肝'];
    return Object.entries(countMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        const idxA = order.indexOf(a.name);
        const idxB = order.indexOf(b.name);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.name.localeCompare(b.name, 'zh-TW');
      });
  }

  /**
   * 取得藥性列表及數量統計
   */
  async getNatures() {
    const data = dbFactory.getMemoryStore();
    const countMap = { '大寒': 0, '寒': 0, '微寒': 0, '涼': 0, '平': 0, '微溫': 0, '溫': 0, '熱': 0 };
    data.forEach(herb => {
      if ((herb.status || 'published') === 'published') {
        const nat = herb.nature || '平';
        countMap[nat] = (countMap[nat] || 0) + 1;
      }
    });

    return Object.entries(countMap)
      .filter(([_, count]) => count > 0)
      .map(([name, count]) => ({ name, count }));
  }

  /**
   * 取得風土產區分佈及數量統計
   */
  async getRegions() {
    const data = dbFactory.getMemoryStore();
    const countMap = {};
    data.forEach(herb => {
      if ((herb.status || 'published') === 'published') {
        const reg = herb.region || '全島平野與山林';
        countMap[reg] = (countMap[reg] || 0) + 1;
      }
    });

    return Object.entries(countMap).map(([name, count]) => ({
      name,
      count
    }));
  }

  /**
   * 取得民間生活情境應用及數量統計
   */
  async getFolkApplications() {
    const data = dbFactory.getMemoryStore();
    const countMap = {};
    data.forEach(herb => {
      if ((herb.status || 'published') === 'published') {
        const folk = herb.folkApplication || '日常養生茶飲';
        countMap[folk] = (countMap[folk] || 0) + 1;
      }
    });

    return Object.entries(countMap).map(([name, count]) => ({
      name,
      count
    }));
  }

  /**
   * 取得入藥部位列表及統計
   */
  async getPartsUsed() {
    const data = dbFactory.getMemoryStore();
    const countMap = {};
    data.forEach(herb => {
      if ((herb.status || 'published') === 'published') {
        const part = herb.partsUsed || '全草';
        countMap[part] = (countMap[part] || 0) + 1;
      }
    });

    return Object.entries(countMap).map(([name, count]) => ({
      name,
      count
    }));
  }

  /**
   * 取得安全用藥分級列表及統計
   */
  async getSafetyLevels() {
    const data = dbFactory.getMemoryStore();
    const countMap = {};
    data.forEach(herb => {
      if ((herb.status || 'published') === 'published') {
        const lvl = herb.safetyLevel || '溫和常飲';
        countMap[lvl] = (countMap[lvl] || 0) + 1;
      }
    });

    return Object.entries(countMap).map(([name, count]) => ({
      name,
      count
    }));
  }

  /**
   * 取得全庫完整統計資訊 (供後台儀表板使用)
   */
  async getStats() {
    const data = dbFactory.getMemoryStore();
    const total = data.length;
    const published = data.filter(h => (h.status || 'published') === 'published').length;
    const drafts = total - published;

    const categories = await this.getCategories();
    const regions = await this.getRegions();
    const natures = await this.getNatures();
    const channels = await this.getChannels();
    const safetyLevels = await this.getSafetyLevels();

    return {
      totalHerbs: total,
      publishedHerbs: published,
      draftHerbs: drafts,
      categoriesCount: categories.length,
      regionsCount: regions.length,
      categories,
      regions,
      natures,
      channels,
      safetyLevels,
      auditLogCount: this.auditLogs.length
    };
  }

  /**
   * 新增藥材
   */
  async create(herbData) {
    const data = dbFactory.getMemoryStore();
    const maxId = data.reduce((max, h) => (h.id > max ? h.id : max), 0);
    const newHerb = {
      id: maxId + 1,
      ...herbData,
      status: herbData.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.push(newHerb);

    this.addAuditLog('CREATE_HERB', `Herb #${newHerb.id}`, `新增藥材「${newHerb.name}」(${newHerb.scientificName || ''})`);
    return newHerb;
  }

  /**
   * 更新藥材
   */
  async update(id, herbData) {
    const data = dbFactory.getMemoryStore();
    const targetId = parseInt(id, 10);
    const index = data.findIndex(h => h.id === targetId);
    if (index === -1) return null;

    const oldName = data[index].name;
    data[index] = {
      ...data[index],
      ...herbData,
      id: targetId,
      updatedAt: new Date().toISOString()
    };

    this.addAuditLog('UPDATE_HERB', `Herb #${targetId}`, `更新藥材「${data[index].name}」(原名: ${oldName})`);
    return data[index];
  }

  /**
   * 刪除藥材
   */
  async delete(id) {
    const data = dbFactory.getMemoryStore();
    const targetId = parseInt(id, 10);
    const index = data.findIndex(h => h.id === targetId);
    if (index === -1) return false;

    const deleted = data[index];
    data.splice(index, 1);

    this.addAuditLog('DELETE_HERB', `Herb #${targetId}`, `刪除藥材「${deleted.name}」`);
    return true;
  }

  /**
   * 取得審計日誌
   */
  getAuditLogs(limit = 50) {
    return [...this.auditLogs].reverse().slice(0, limit);
  }

  /**
   * 記錄審計日誌
   */
  addAuditLog(action, entity, details) {
    const log = {
      id: this.auditLogs.length + 1,
      timestamp: new Date().toISOString(),
      action,
      entity,
      details
    };
    this.auditLogs.push(log);
  }

  /**
   * 重設為種子資料庫
   */
  async resetToInitial() {
    const store = dbFactory.getMemoryStore();
    store.length = 0;
    const cloned = JSON.parse(JSON.stringify(initialHerbs));
    store.push(...cloned);

    this.addAuditLog('RESET_DATABASE', 'All Herbs', `重置資料庫為預設種子資料 (${cloned.length}味藥材)`);
    return store.length;
  }

  /**
   * 取得所有原始資料 (供備份與匯出)
   */
  async getAllRaw() {
    return [...dbFactory.getMemoryStore()];
  }
}

module.exports = new HerbRepository();
