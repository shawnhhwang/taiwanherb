/**
 * server/services/shopService.js
 * 結盟青草店與草藥採購指引服務層
 */
const { alliedShops, buyingGuides } = require('../data/shopsData');
const persistence = require('../config/persistence');

class ShopService {
  constructor() {
    this.shops = persistence.load('shops', alliedShops);
  }

  /**
   * 重設店家資料
   */
  reset() {
    this.shops = JSON.parse(JSON.stringify(alliedShops));
    persistence.save('shops', this.shops);
  }

  /**
   * 搜尋與篩選結盟青草店
   */
  async getShops({ region, query, city } = {}) {
    let result = [...this.shops];

    if (region && region !== '全部' && region !== 'all') {
      result = result.filter(s => s.region.includes(region) || region.includes(s.region));
    }

    if (city && city !== '全部' && city !== 'all') {
      result = result.filter(s => s.city === city);
    }

    if (query && query.trim() !== '') {
      const q = query.trim().toLowerCase();
      result = result.filter(s => {
        const matchName = (s.name || '').toLowerCase().includes(q);
        const matchCity = (s.city || '').toLowerCase().includes(q);
        const matchDistrict = (s.district || '').toLowerCase().includes(q);
        const matchAddress = (s.address || '').toLowerCase().includes(q);
        const matchSpecialties = (s.specialties || '').toLowerCase().includes(q);
        const matchTags = (s.tags || []).some(t => t.toLowerCase().includes(q));
        const matchHerbs = (s.featuredHerbs || []).some(h => h.toLowerCase().includes(h));

        return matchName || matchCity || matchDistrict || matchAddress || matchSpecialties || matchTags || matchHerbs;
      });
    }

    return result;
  }

  /**
   * 取得單一店家詳情
   */
  async getShopById(id) {
    return this.shops.find(s => s.id === id) || null;
  }

  /**
   * 依特定草藥名稱尋找販售/推薦之結盟青草店
   */
  async getShopsByHerb(herbName) {
    if (!herbName) return [];
    const name = herbName.trim();
    return this.shops.filter(s => {
      const matchFeatured = (s.featuredHerbs || []).some(h => h.includes(name) || name.includes(h));
      const matchSpecialty = (s.specialties || '').includes(name);
      return matchFeatured || matchSpecialty;
    });
  }

  /**
   * 建立新草藥店
   */
  async createShop(data) {
    if (!data.name || !data.name.trim()) {
      throw new Error('店家名稱為必填欄位');
    }

    const id = data.id || `shop_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
    const newShop = {
      id,
      name: data.name.trim(),
      region: data.region?.trim() || '北部 (萬華/淡水河/雙北)',
      city: data.city?.trim() || '台北市',
      district: data.district?.trim() || '',
      address: data.address?.trim() || '',
      phone: data.phone?.trim() || '',
      history: data.history?.trim() || '傳承在地青草文化',
      specialties: data.specialties?.trim() || '四季青草養生茶飲',
      businessHours: data.businessHours?.trim() || '週一至週六 09:00 - 19:00',
      alliedStatus: data.alliedStatus || 'official_partner',
      badge: data.badge?.trim() || '草藥名舖',
      tags: Array.isArray(data.tags)
        ? data.tags
        : (typeof data.tags === 'string' ? data.tags.split(/[、,，|]/).map(s => s.trim()).filter(Boolean) : ['青草名店']),
      featuredHerbs: Array.isArray(data.featuredHerbs)
        ? data.featuredHerbs
        : (typeof data.featuredHerbs === 'string' ? data.featuredHerbs.split(/[、,，|]/).map(s => s.trim()).filter(Boolean) : ['大花咸豐草']),
      buyingGuide: data.buyingGuide?.trim() || '青草乾品應密封保存於陰涼乾燥處，避免受潮。',
      shippingAvailable: data.shippingAvailable === true || data.shippingAvailable === 'true' || data.shippingAvailable === '是' || data.shippingAvailable === 1,
      imageUrl: data.imageUrl || data.image || '/images/uploads/default_shop.jpg',
      mapUrl: data.mapUrl || (data.address ? `https://maps.google.com/?q=${encodeURIComponent(data.address)}` : '')
    };

    this.shops.unshift(newShop);
    persistence.debounceSave('shops', this.shops);
    return newShop;
  }

  /**
   * 批次匯入結盟草藥店
   */
  async batchImportShops(items, operatorName = 'Curator') {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('未提供欲匯入的草藥店資料項目');
    }

    const insertedShops = [];
    const errors = [];

    for (const item of items) {
      try {
        const created = await this.createShop(item);
        insertedShops.push(created);
      } catch (err) {
        errors.push({ name: item.name || '未命名店家', error: err.message });
      }
    }

    return {
      success: true,
      totalRequested: items.length,
      insertedCount: insertedShops.length,
      errorCount: errors.length,
      insertedShops,
      errors
    };
  }

  /**
   * 取得採買避坑指南
   */
  async getBuyingGuides() {
    return buyingGuides;
  }
}

module.exports = new ShopService();
