/**
 * server/services/shopService.js
 * 結盟青草店與草藥採購指引服務層
 */
const { alliedShops, buyingGuides } = require('../data/shopsData');

class ShopService {
  /**
   * 搜尋與篩選結盟青草店
   */
  async getShops({ region, query, city } = {}) {
    let result = [...alliedShops];

    if (region && region !== '全部' && region !== 'all') {
      result = result.filter(s => s.region.includes(region) || region.includes(s.region));
    }

    if (city && city !== '全部' && city !== 'all') {
      result = result.filter(s => s.city === city);
    }

    if (query && query.trim() !== '') {
      const q = query.trim().toLowerCase();
      result = result.filter(s => {
        const matchName = s.name.toLowerCase().includes(q);
        const matchCity = s.city.toLowerCase().includes(q);
        const matchDistrict = (s.district || '').toLowerCase().includes(q);
        const matchAddress = s.address.toLowerCase().includes(q);
        const matchSpecialties = s.specialties.toLowerCase().includes(q);
        const matchTags = (s.tags || []).some(t => t.toLowerCase().includes(q));
        const matchHerbs = (s.featuredHerbs || []).some(h => h.toLowerCase().includes(q));

        return matchName || matchCity || matchDistrict || matchAddress || matchSpecialties || matchTags || matchHerbs;
      });
    }

    return result;
  }

  /**
   * 取得單一店家詳情
   */
  async getShopById(id) {
    return alliedShops.find(s => s.id === id) || null;
  }

  /**
   * 依特定草藥名稱尋找販售/推薦之結盟青草店
   */
  async getShopsByHerb(herbName) {
    if (!herbName) return [];
    const name = herbName.trim();
    return alliedShops.filter(s => {
      const matchFeatured = (s.featuredHerbs || []).some(h => h.includes(name) || name.includes(h));
      const matchSpecialty = (s.specialties || '').includes(name);
      return matchFeatured || matchSpecialty;
    });
  }

  /**
   * 取得採買避坑指南
   */
  async getBuyingGuides() {
    return buyingGuides;
  }
}

module.exports = new ShopService();
