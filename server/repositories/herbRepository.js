/**
 * server/repositories/herbRepository.js
 * 藥材資料存取層 (支援模糊搜尋、多維度篩選、分頁與 Failover 容錯)
 */
const dbFactory = require('../config/dbFactory');

class HerbRepository {
  /**
   * 搜尋與篩選藥材
   */
  async searchHerbs({ query, category, channel, nature, page = 1, limit = 12, sort = 'id_asc' }) {
    const data = dbFactory.getMemoryStore();

    let filtered = [...data];

    // 模糊搜尋 (名稱、學名、別名、功效、標籤)
    if (query && query.trim() !== '') {
      const q = query.trim().toLowerCase();
      filtered = filtered.filter(herb => {
        const matchName = herb.name.toLowerCase().includes(q);
        const matchScientific = (herb.scientificName || '').toLowerCase().includes(q);
        const matchCommon = (herb.commonNames || []).some(c => c.toLowerCase().includes(q));
        const matchEfficacy = (herb.efficacy || '').toLowerCase().includes(q);
        const matchCategory = (herb.category || '').toLowerCase().includes(q);
        const matchTags = (herb.tags || []).some(t => t.toLowerCase().includes(q));
        const matchPinyin = (herb.pinyin || '').toLowerCase().includes(q);
        return matchName || matchScientific || matchCommon || matchEfficacy || matchCategory || matchTags || matchPinyin;
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

    // 藥性篩選 (nature: 寒、涼、平、溫、熱)
    if (nature && nature !== '全部' && nature !== 'all') {
      filtered = filtered.filter(herb => herb.nature === nature);
    }

    // 排序
    filtered.sort((a, b) => {
      if (sort === 'name_asc') return a.name.localeCompare(b.name, 'zh-TW');
      if (sort === 'name_desc') return b.name.localeCompare(a.name, 'zh-TW');
      if (sort === 'id_desc') return b.id - a.id;
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
    if (!data.length) return null;
    const randomIndex = Math.floor(Math.random() * data.length);
    return { ...data[randomIndex] };
  }

  /**
   * 取得所有藥材分類及數量統計
   */
  async getCategories() {
    const data = dbFactory.getMemoryStore();
    const countMap = {};
    data.forEach(herb => {
      const cat = herb.category || '其他';
      countMap[cat] = (countMap[cat] || 0) + 1;
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
      (herb.channels || []).forEach(ch => {
        countMap[ch] = (countMap[ch] || 0) + 1;
      });
    });

    // 依傳統中醫臟腑順序排列
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
    const countMap = { '寒': 0, '微寒': 0, '涼': 0, '平': 0, '微溫': 0, '溫': 0, '熱': 0 };
    data.forEach(herb => {
      const nat = herb.nature || '平';
      countMap[nat] = (countMap[nat] || 0) + 1;
    });

    return Object.entries(countMap)
      .filter(([_, count]) => count > 0)
      .map(([name, count]) => ({ name, count }));
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
      createdAt: new Date().toISOString()
    };
    data.push(newHerb);
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

    data[index] = {
      ...data[index],
      ...herbData,
      id: targetId,
      updatedAt: new Date().toISOString()
    };
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
    data.splice(index, 1);
    return true;
  }
}

module.exports = new HerbRepository();
