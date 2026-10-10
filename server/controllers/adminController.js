/**
 * server/controllers/adminController.js
 * 本草圖鑑後台管理控制器 (包含權限認證、本草 CRUD、專家 Persona 管理、數據分析與資料備份)
 */
const herbService = require('../services/herbService');
const ragService = require('../services/ragService');
const ApiResponse = require('../utils/apiResponse');

const ADMIN_TOKEN = 'taiwanherb-admin-session-active';
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'taiwanherb2026';

class AdminController {
  /**
   * POST /api/admin/login
   * 管理員登入
   */
  async login(req, res, next) {
    try {
      const { password } = req.body;
      if (!password || password !== DEFAULT_PASSWORD) {
        return res.status(401).json(ApiResponse.fail('管理密碼錯誤，請重新輸入', 401));
      }

      await herbService.getAuditLogs(); // ensure initialized
      return res.json(ApiResponse.ok({
        authenticated: true,
        token: ADMIN_TOKEN,
        role: 'herbal_curator',
        name: '台灣本草典藏管理員'
      }, '登入管理模式成功'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/admin/status
   * 檢查管理模式登入狀態
   */
  async getStatus(req, res, next) {
    try {
      const authHeader = req.headers.authorization || '';
      const isAuthenticated = authHeader.includes(ADMIN_TOKEN);

      return res.json(ApiResponse.ok({
        authenticated: isAuthenticated,
        adminMode: isAuthenticated ? 'active' : 'guest',
        defaultPasscodeHint: 'taiwanherb2026'
      }, '管理者權限檢查完畢'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/admin/stats
   * 儀表板數據統計
   */
  async getStats(req, res, next) {
    try {
      const stats = await herbService.getStats();
      const experts = ragService.getExperts();

      return res.json(ApiResponse.ok({
        ...stats,
        expertsCount: experts.length,
        experts: experts.map(e => ({ id: e.id, name: e.name, title: e.title, region: e.region }))
      }, '成功取得全域統計儀表板數據'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/admin/herbs
   * 管理專用清單 (含草稿、全部狀態)
   */
  async getHerbs(req, res, next) {
    try {
      const { q, category, status, region, page = 1, limit = 50 } = req.query;
      const result = await herbService.searchHerbs({
        query: q,
        category,
        status: status || 'all',
        region,
        page,
        limit,
        sort: 'id_desc'
      });
      return res.json(ApiResponse.ok(result.items, '成功取得本草管理清單', result.pagination));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/admin/herbs
   * 新增草藥
   */
  async createHerb(req, res, next) {
    try {
      const herbData = req.body;
      if (!herbData.name || !herbData.category) {
        return res.status(400).json(ApiResponse.fail('藥材名稱與分類為必填欄位', 400));
      }

      const created = await herbService.createHerb(herbData);
      return res.status(201).json(ApiResponse.ok(created, `成功典藏新草藥「${created.name}」`));
    } catch (err) {
      next(err);
    }
  }

  /**
   * PUT /api/admin/herbs/:id
   * 編輯草藥
   */
  async updateHerb(req, res, next) {
    try {
      const { id } = req.params;
      const herbData = req.body;
      const updated = await herbService.updateHerb(id, herbData);
      if (!updated) {
        return res.status(404).json(ApiResponse.fail(`找不到 ID 為 ${id} 的藥材`, 404));
      }
      return res.json(ApiResponse.ok(updated, `成功更新草藥「${updated.name}」`));
    } catch (err) {
      next(err);
    }
  }

  /**
   * DELETE /api/admin/herbs/:id
   * 刪除草藥
   */
  async deleteHerb(req, res, next) {
    try {
      const { id } = req.params;
      const success = await herbService.deleteHerb(id);
      if (!success) {
        return res.status(404).json(ApiResponse.fail(`找不到 ID 為 ${id} 的藥材`, 404));
      }
      return res.json(ApiResponse.ok({ id: parseInt(id, 10) }, `成功刪除草藥 ID #${id}`));
    } catch (err) {
      next(err);
    }
  }

  /**
   * PUT /api/admin/experts/:id
   * 更新特定專家 Persona
   */
  async updateExpert(req, res, next) {
    try {
      const { id } = req.params;
      const expertData = req.body;
      const updated = ragService.updateExpert(id, expertData);
      if (!updated) {
        return res.status(404).json(ApiResponse.fail(`找不到 ID 為 ${id} 的專家`, 404));
      }
      return res.json(ApiResponse.ok(updated, `成功更新專家「${updated.name}」之語意設定`));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/admin/logs
   * 取得審計日誌
   */
  async getAuditLogs(req, res, next) {
    try {
      const logs = await herbService.getAuditLogs(60);
      return res.json(ApiResponse.ok(logs, '成功取得系統審計日誌'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/admin/reset
   * 重置為預設種子資料庫
   */
  async resetDatabase(req, res, next) {
    try {
      const count = await herbService.resetToInitial();
      return res.json(ApiResponse.ok({ restoredCount: count }, `成功重置資料庫，恢復 ${count} 味經典本草`));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/admin/export
   * 匯出全庫資料 (JSON 或 CSV)
   */
  async exportData(req, res, next) {
    try {
      const { format = 'json' } = req.query;
      const rawHerbs = await herbService.getAllRaw();

      if (format === 'csv') {
        const headers = ['id', 'name', 'scientificName', 'family', 'region', 'category', 'nature', 'folkApplication', 'safetyLevel'];
        const rows = rawHerbs.map(h => [
          h.id,
          `"${(h.name || '').replace(/"/g, '""')}"`,
          `"${(h.scientificName || '').replace(/"/g, '""')}"`,
          `"${(h.family || '').replace(/"/g, '""')}"`,
          `"${(h.region || '').replace(/"/g, '""')}"`,
          `"${(h.category || '').replace(/"/g, '""')}"`,
          `"${(h.nature || '').replace(/"/g, '""')}"`,
          `"${(h.folkApplication || '').replace(/"/g, '""')}"`,
          `"${(h.safetyLevel || '').replace(/"/g, '""')}"`
        ].join(','));

        const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename=taiwanherb-export.csv');
        return res.send(csvContent);
      }

      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=taiwanherb-export.json');
      return res.json(ApiResponse.ok(rawHerbs, '資料庫備份匯出成功'));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
