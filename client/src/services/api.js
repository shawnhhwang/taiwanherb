/**
 * client/src/services/api.js
 * 前端 API 串接服務層 (封裝 Result Pattern，具備錯誤降級、多維度風土檢索、RAG 諮詢與管理認證)
 */

const API_BASE = '/api';

export const HerbApi = {
  getAuthToken() {
    return localStorage.getItem('taiwanherb_admin_token') || '';
  },

  setAuthToken(token) {
    if (token) {
      localStorage.setItem('taiwanherb_admin_token', token);
    } else {
      localStorage.removeItem('taiwanherb_admin_token');
    }
  },

  async request(endpoint, options = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.getAuthToken();
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

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
   * 搜尋與篩選藥材 (支援風土區域、民間情境、部位、安全等級)
   */
  async getHerbs(params = {}) {
    const queryParts = [];
    if (params.q) queryParts.push(`q=${encodeURIComponent(params.q)}`);
    if (params.category && params.category !== '全部') queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (params.channel && params.channel !== '全部') queryParts.push(`channel=${encodeURIComponent(params.channel)}`);
    if (params.nature && params.nature !== '全部') queryParts.push(`nature=${encodeURIComponent(params.nature)}`);
    if (params.region && params.region !== '全部') queryParts.push(`region=${encodeURIComponent(params.region)}`);
    if (params.folkApplication && params.folkApplication !== '全部') queryParts.push(`folkApplication=${encodeURIComponent(params.folkApplication)}`);
    if (params.partsUsed && params.partsUsed !== '全部') queryParts.push(`partsUsed=${encodeURIComponent(params.partsUsed)}`);
    if (params.safetyLevel && params.safetyLevel !== '全部') queryParts.push(`safetyLevel=${encodeURIComponent(params.safetyLevel)}`);
    if (params.status && params.status !== '全部') queryParts.push(`status=${encodeURIComponent(params.status)}`);
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
   * 統計維度
   */
  async getCategories() {
    const res = await this.request('/categories');
    return res.data || [];
  },

  async getChannels() {
    const res = await this.request('/channels');
    return res.data || [];
  },

  async getNatures() {
    const res = await this.request('/natures');
    return res.data || [];
  },

  async getRegions() {
    const res = await this.request('/regions');
    return res.data || [];
  },

  async getFolkApplications() {
    const res = await this.request('/folk-applications');
    return res.data || [];
  },

  async getPartsUsed() {
    const res = await this.request('/parts-used');
    return res.data || [];
  },

  async getSafetyLevels() {
    const res = await this.request('/safety-levels');
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
  },

  /**
   * RAG 諮詢模組
   */
  async getConsultExperts() {
    const res = await this.request('/consult/experts');
    return res.data || [];
  },

  async consult(message, expertId = 'wanhua_uncle') {
    const res = await this.request('/consult', {
      method: 'POST',
      body: JSON.stringify({ message, expertId })
    });
    return res.data;
  },

  /**
   * 後台管理模組
   */
  async adminLogin(credentials) {
    const payload = typeof credentials === 'string'
      ? { password: credentials }
      : credentials;

    const res = await this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res.data?.token) {
      this.setAuthToken(res.data.token);
    }
    return res.data;
  },

  async adminLogout() {
    this.setAuthToken('');
  },

  async getAdminStatus() {
    const res = await this.request('/admin/status');
    return res.data;
  },

  async getAdminStats() {
    const res = await this.request('/admin/stats');
    return res.data;
  },

  async getAdminHerbs(params = {}) {
    const queryParts = [];
    if (params.q) queryParts.push(`q=${encodeURIComponent(params.q)}`);
    if (params.category && params.category !== '全部') queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (params.region && params.region !== '全部') queryParts.push(`region=${encodeURIComponent(params.region)}`);
    if (params.status && params.status !== '全部') queryParts.push(`status=${encodeURIComponent(params.status)}`);
    if (params.page) queryParts.push(`page=${params.page}`);
    if (params.limit) queryParts.push(`limit=${params.limit}`);

    const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';
    const res = await this.request(`/admin/herbs${queryString}`);
    return {
      items: res.data || [],
      meta: res.meta || { page: 1, limit: 50, total: res.data.length, totalPages: 1 }
    };
  },

  async createHerb(data) {
    const res = await this.request('/admin/herbs', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  async updateHerb(id, data) {
    const res = await this.request(`/admin/herbs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  async deleteHerb(id) {
    const res = await this.request(`/admin/herbs/${id}`, {
      method: 'DELETE'
    });
    return res.data;
  },

  async getAdminLogs() {
    const res = await this.request('/admin/logs');
    return res.data || [];
  },

  async resetDatabase() {
    const res = await this.request('/admin/reset', {
      method: 'POST'
    });
    return res.data;
  },

  // 1. 使用者管理與前後台權限 (RBAC)
  async getAdminUsers() {
    const res = await this.request('/admin/users');
    return res.data;
  },

  async createAdminUser(data) {
    const res = await this.request('/admin/users', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  async updateAdminUser(id, data) {
    const res = await this.request(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  async deleteAdminUser(id) {
    const res = await this.request(`/admin/users/${id}`, {
      method: 'DELETE'
    });
    return res.data;
  },

  // 2. LLM 提供商與 API 來源管理
  async getLlmConfig() {
    const res = await this.request('/admin/llm/config');
    return res.data;
  },

  async updateLlmConfig(data) {
    const res = await this.request('/admin/llm/config', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  async testLlmConnection(providerId) {
    const res = await this.request('/admin/llm/test', {
      method: 'POST',
      body: JSON.stringify({ providerId })
    });
    return res.data;
  },

  // 3. 專家 RAG Persona 管理與測試沙盒
  async getAdminExperts() {
    const res = await this.request('/admin/experts');
    return res.data || [];
  },

  async createAdminExpert(data) {
    const res = await this.request('/admin/experts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  async updateExpert(id, data) {
    const res = await this.request(`/admin/experts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  async deleteAdminExpert(id) {
    const res = await this.request(`/admin/experts/${id}`, {
      method: 'DELETE'
    });
    return res.data;
  },

  async resetAdminExperts() {
    const res = await this.request('/admin/experts/reset', {
      method: 'POST'
    });
    return res.data;
  },

  async testExpertPlayground(data) {
    const res = await this.request('/admin/experts/playground', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  // 4. 資料匯入 (範例、文字/CSV預覽編輯與批次存檔)
  async getImportSample(format = 'json') {
    const res = await this.request(`/admin/import/sample?format=${format}`);
    return res.data;
  },

  async previewImport(content, format = 'json') {
    const res = await this.request('/admin/import/preview', {
      method: 'POST',
      body: JSON.stringify({ content, format })
    });
    return res.data;
  },

  async commitImport(items) {
    const res = await this.request('/admin/import/commit', {
      method: 'POST',
      body: JSON.stringify({ items })
    });
    return res.data;
  },

  // 5. LLM 本草專題文章生成實驗室
  async getArticleOptions() {
    const res = await this.request('/admin/articles/options');
    return res.data;
  },

  async generateArticle(data) {
    const res = await this.request('/admin/articles/generate', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  }
};
