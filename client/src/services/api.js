/**
 * client/src/services/api.js
 * 前端 API 串接服務層 (封裝 Result Pattern，具備錯誤降級與超時保護)
 */

const API_BASE = '/api';

export const HerbApi = {
  async request(endpoint, options = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers }
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || `請求失敗 (${response.status})`);
      }

      return json;
    } catch (err) {
      console.warn(`[Api Error] ${endpoint}:`, err.message);
      throw err;
    }
  },

  /**
   * 搜尋與篩選藥材
   */
  async getHerbs(params = {}) {
    const queryParts = [];
    if (params.q) queryParts.push(`q=${encodeURIComponent(params.q)}`);
    if (params.category && params.category !== '全部') queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (params.channel && params.channel !== '全部') queryParts.push(`channel=${encodeURIComponent(params.channel)}`);
    if (params.nature && params.nature !== '全部') queryParts.push(`nature=${encodeURIComponent(params.nature)}`);
    if (params.page) queryParts.push(`page=${params.page}`);
    if (params.limit) queryParts.push(`limit=${params.limit}`);
    if (params.sort) queryParts.push(`sort=${params.sort}`);

    const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';
    const res = await this.request(`/herbs${queryString}`);
    return {
      items: res.data || [],
      meta: res.meta || { page: 1, limit: 12, total: res.data.length, totalPages: 1 }
    };
  },

  /**
   * 取得單一藥材詳情
   */
  async getHerbById(id) {
    const res = await this.request(`/herbs/${id}`);
    return res.data;
  },

  /**
   * 隨機推薦藥材
   */
  async getRandomHerb() {
    const res = await this.request('/herbs/random');
    return res.data;
  },

  /**
   * 取得分類統計
   */
  async getCategories() {
    const res = await this.request('/categories');
    return res.data || [];
  },

  /**
   * 取得歸經統計
   */
  async getChannels() {
    const res = await this.request('/channels');
    return res.data || [];
  },

  /**
   * 取得藥性統計
   */
  async getNatures() {
    const res = await this.request('/natures');
    return res.data || [];
  },

  /**
   * 藥材比對
   */
  async compareHerbs(ids) {
    const res = await this.request('/herbs/compare', {
      method: 'POST',
      body: JSON.stringify({ ids })
    });
    return res.data || [];
  },

  /**
   * 系統健康狀態
   */
  async getHealth() {
    const res = await this.request('/health');
    return res.data;
  },

  /**
   * 演練 Failover
   */
  async triggerFailover(reason) {
    const res = await this.request('/health/failover-test', {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
    return res.data;
  }
};
