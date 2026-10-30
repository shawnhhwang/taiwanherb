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

  async consultFormulate(data) {
    const res = await this.request('/consult/formulate', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  /**
   * 結盟青草店與購買指引模組
   */
  async getShops(params = {}) {
    const queryParts = [];
    if (params.region && params.region !== '全部') queryParts.push(`region=${encodeURIComponent(params.region)}`);
    if (params.city && params.city !== '全部') queryParts.push(`city=${encodeURIComponent(params.city)}`);
    if (params.query) queryParts.push(`query=${encodeURIComponent(params.query)}`);
    const qs = queryParts.length ? `?${queryParts.join('&')}` : '';
    const res = await this.request(`/shops${qs}`);
    return res.data || [];
  },

  async getShopGuides() {
    const res = await this.request('/shops/guides');
    return res.data || [];
  },

  async getShopsByHerb(herbName) {
    const res = await this.request(`/shops/by-herb/${encodeURIComponent(herbName)}`);
    return res.data || [];
  },

  /**
   * 角色經典配方與 AI 神來一配實驗室模組
   */
  async getFormulas(params = {}) {
    const queryParts = [];
    if (params.expertId && params.expertId !== '全部') queryParts.push(`expertId=${encodeURIComponent(params.expertId)}`);
    if (params.type && params.type !== '全部') queryParts.push(`type=${encodeURIComponent(params.type)}`);
    if (params.query) queryParts.push(`query=${encodeURIComponent(params.query)}`);
    const qs = queryParts.length ? `?${queryParts.join('&')}` : '';
    const res = await this.request(`/formulas${qs}`);
    return res.data || [];
  },

  async getFormulaById(id) {
    const res = await this.request(`/formulas/${id}`);
    return res.data;
  },

  async blendFormula(payload) {
    const res = await this.request('/formulas/blend', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return res.data;
  },

  async harmonizeFormula(payload) {
    const res = await this.request('/formulas/harmonize', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return res.data;
  },

  /**
   * 草木書閣書籍、試閱與線上購買模組
   */
  async getBooks(params = {}) {
    const queryParts = [];
    if (params.category && params.category !== '全部') queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (params.query) queryParts.push(`query=${encodeURIComponent(params.query)}`);
    if (params.sort) queryParts.push(`sort=${encodeURIComponent(params.sort)}`);
    const qs = queryParts.length ? `?${queryParts.join('&')}` : '';
    const res = await this.request(`/books${qs}`);
    return res.data || [];
  },

  async getBookById(id) {
    const res = await this.request(`/books/${id}`);
    return res.data;
  },

  async getBookPreview(id) {
    const res = await this.request(`/books/${id}/preview`);
    return res.data;
  },

  async createBookOrder(orderData) {
    const res = await this.request('/books/order', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    return res.data;
  },

  async getMyBookOrders(email) {
    const res = await this.request(`/books/orders/my?email=${encodeURIComponent(email)}`);
    return res.data || [];
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

  // 4. 資料匯入 (範例、文字/CSV/Excel預覽編輯、圖片上傳/解壓與批次存檔)
  async getImportSample(format = 'json', targetType = 'herbs') {
    const res = await this.request(`/admin/import/sample?format=${format}&targetType=${targetType}`);
    return res.data;
  },

  async previewImport(input, format = 'json', targetType = 'herbs') {
    let payload = { format, targetType };
    if (typeof input === 'object' && input !== null) {
      payload = { ...payload, ...input };
    } else {
      payload.content = input;
    }
    const res = await this.request('/admin/import/preview', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return res.data;
  },

  async commitImport(items, targetType = 'herbs') {
    const res = await this.request('/admin/import/commit', {
      method: 'POST',
      body: JSON.stringify({ items, targetType })
    });
    return res.data;
  },

  /**
   * 上傳單張圖片 (供草藥/店家/書籍線上更換封面圖)
   * @param {File} file 
   */
  async uploadImage(file) {
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const res = await this.request('/admin/upload-image', {
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        base64Data
      })
    });
    return res.data;
  },

  /**
   * 批次匯入圖片壓縮包 (ZIP Archive)
   * @param {File} file 
   */
  async importImageArchive(file) {
    const zipBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const res = await this.request('/admin/import/images', {
      method: 'POST',
      body: JSON.stringify({ zipBase64 })
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
  },

  // 6. 草木書閣書目管理與線上試閱編輯器
  async adminGetBooks() {
    const res = await this.request('/admin/books');
    return res.data || [];
  },

  async adminCreateBook(data) {
    const res = await this.request('/admin/books', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  async adminUpdateBook(id, data) {
    const res = await this.request(`/admin/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return res.data;
  },

  async adminDeleteBook(id) {
    const res = await this.request(`/admin/books/${id}`, {
      method: 'DELETE'
    });
    return res.data;
  },

  async adminUpdateBookPreview(id, previewData) {
    const res = await this.request(`/admin/books/${id}/preview`, {
      method: 'PUT',
      body: JSON.stringify(previewData)
    });
    return res.data;
  },

  async adminGetBookOrders() {
    const res = await this.request('/admin/books/orders');
    return res.data || [];
  },

  async adminUpdateBookOrderStatus(orderId, statusData) {
    const payload = typeof statusData === 'string' ? { orderStatus: statusData } : statusData;
    const res = await this.request(`/admin/books/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    return res.data;
  },

  /**
   * 後台資料庫下載備份 (支援單獨下載或全庫完整快照至本地端)
   */
  async downloadDatabaseBackup(type = 'all') {
    const token = this.getAuthToken();
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/admin/database/backup?type=${encodeURIComponent(type)}`, {
      headers
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `下載資料庫備份失敗 (${res.status})`);
    }

    const blob = await res.blob();
    const contentDisposition = res.headers.get('Content-Disposition') || '';
    let filename = `taiwanherb_${type}_db_backup.json`;
    const match = contentDisposition.match(/filename="?([^";]+)"?/);
    if (match && match[1]) filename = match[1];

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    return { success: true, filename };
  }
};
