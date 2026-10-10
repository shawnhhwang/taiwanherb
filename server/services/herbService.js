/**
 * server/services/herbService.js
 * 藥材業務邏輯層 (DTO 映射、關聯推薦演算法、搜尋邏輯、風土統計)
 */
const herbRepository = require('../repositories/herbRepository');

class HerbService {
  /**
   * 藥材列表搜尋與篩選 (回傳 HerbSummaryDto 格式)
   */
  async searchHerbs(params) {
    const result = await herbRepository.searchHerbs(params);
    return {
      items: result.items.map(item => this.toSummaryDto(item)),
      pagination: result.pagination
    };
  }

  /**
   * 取得單一藥材詳情 (回傳 HerbDetailDto 格式，含相關藥材推薦)
   */
  async getHerbDetail(id) {
    const herb = await herbRepository.getById(id);
    if (!herb) return null;

    // 計算相關藥材推薦 (同分類、共享歸經或相同風土區域，排除自身)
    const related = await this.getRelatedHerbs(herb);

    return {
      ...this.toDetailDto(herb),
      relatedHerbs: related.map(item => this.toSummaryDto(item))
    };
  }

  /**
   * 隨機推薦
   */
  async getRandomHerb() {
    const herb = await herbRepository.getRandom();
    if (!herb) return null;
    return this.toDetailDto(herb);
  }

  /**
   * 統計端點委派
   */
  async getCategories() {
    return await herbRepository.getCategories();
  }

  async getChannels() {
    return await herbRepository.getChannels();
  }

  async getNatures() {
    return await herbRepository.getNatures();
  }

  async getRegions() {
    return await herbRepository.getRegions();
  }

  async getFolkApplications() {
    return await herbRepository.getFolkApplications();
  }

  async getPartsUsed() {
    return await herbRepository.getPartsUsed();
  }

  async getSafetyLevels() {
    return await herbRepository.getSafetyLevels();
  }

  async getStats() {
    return await herbRepository.getStats();
  }

  async getAuditLogs(limit) {
    return herbRepository.getAuditLogs(limit);
  }

  async resetToInitial() {
    return await herbRepository.resetToInitial();
  }

  async getAllRaw() {
    return await herbRepository.getAllRaw();
  }

  /**
   * 比較兩味或多味藥材
   */
  async compareHerbs(ids) {
    const list = [];
    for (const id of ids) {
      const herb = await herbRepository.getById(id);
      if (herb) list.push(this.toDetailDto(herb));
    }
    return list;
  }

  /**
   * 新增藥材
   */
  async createHerb(data) {
    if (!data.name || !data.category) {
      throw new Error('藥材名稱與分類為必填欄位');
    }
    const created = await herbRepository.create(data);
    return this.toDetailDto(created);
  }

  /**
   * 更新藥材
   */
  async updateHerb(id, data) {
    const updated = await herbRepository.update(id, data);
    if (!updated) return null;
    return this.toDetailDto(updated);
  }

  /**
   * 刪除藥材
   */
  async deleteHerb(id) {
    return await herbRepository.delete(id);
  }

  /**
   * 取得關聯藥材推薦 (以歸經、分類與風土計算相似度)
   */
  async getRelatedHerbs(herb, limit = 4) {
    const all = await herbRepository.searchHerbs({ limit: 100, status: 'all' });
    const candidates = all.items.filter(h => h.id !== herb.id);

    // 評分：同分類 +3 分，每多一個相同歸經 +2 分，相同藥性 +1 分，同風土區域 +2 分
    const scored = candidates.map(candidate => {
      let score = 0;
      if (candidate.category === herb.category) score += 3;
      if (candidate.nature === herb.nature) score += 1;
      if (candidate.region && candidate.region === herb.region) score += 2;
      const sharedChannels = (candidate.channels || []).filter(c => (herb.channels || []).includes(c));
      score += sharedChannels.length * 2;
      return { herb: candidate, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(item => item.herb);
  }

  /**
   * DTO 映射：清單摘要 DTO
   */
  toSummaryDto(herb) {
    return {
      id: herb.id,
      name: herb.name,
      scientificName: herb.scientificName || '',
      category: herb.category || '',
      nature: herb.nature || '平',
      taste: herb.taste || [],
      properties: herb.properties || [],
      channels: herb.channels || [],
      family: herb.family || '',
      partsUsed: herb.partsUsed || '',
      activeCompounds: herb.activeCompounds || [],
      harvestSeason: herb.harvestSeason || '',
      terroir: herb.terroir || '',
      region: herb.region || '全島平野與山林',
      folkApplication: herb.folkApplication || '日常養生茶飲',
      safetyLevel: herb.safetyLevel || '溫和常飲',
      dialectNames: herb.dialectNames || [],
      solarTermRecommendation: herb.solarTermRecommendation || '',
      thumbnailUrl: herb.thumbnailUrl || '',
      tags: herb.tags || [],
      status: herb.status || 'published',
      summaryEfficacy: (herb.efficacy || '').slice(0, 48) + ((herb.efficacy || '').length > 48 ? '...' : '')
    };
  }

  /**
   * DTO 映射：完整詳情 DTO
   */
  toDetailDto(herb) {
    return {
      id: herb.id,
      name: herb.name,
      scientificName: herb.scientificName || '',
      pinyin: herb.pinyin || '',
      commonNames: herb.commonNames || [],
      dialectNames: herb.dialectNames || [],
      category: herb.category || '',
      nature: herb.nature || '平',
      taste: herb.taste || [],
      properties: herb.properties || [],
      channels: herb.channels || [],
      family: herb.family || '',
      partsUsed: herb.partsUsed || '',
      activeCompounds: herb.activeCompounds || [],
      harvestSeason: herb.harvestSeason || '',
      terroir: herb.terroir || '',
      region: herb.region || '全島平野與山林',
      folkApplication: herb.folkApplication || '日常養生茶飲',
      safetyLevel: herb.safetyLevel || '溫和常飲',
      solarTermRecommendation: herb.solarTermRecommendation || '',
      efficacy: herb.efficacy || '',
      contraindications: herb.contraindications || '無特殊禁忌記載，依個人體質酌量。',
      usage: herb.usage || '遵醫囑或常規煎服。',
      taiwanHeritage: herb.taiwanHeritage || '',
      thumbnailUrl: herb.thumbnailUrl || '',
      tags: herb.tags || [],
      status: herb.status || 'published',
      createdAt: herb.createdAt,
      updatedAt: herb.updatedAt
    };
  }
}

module.exports = new HerbService();
