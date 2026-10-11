/**
 * server/controllers/adminController.js
 * 本草圖鑑後台管理控制器
 * 完整涵蓋：前後台使用者權限 (RBAC)、LLM API 來源管理、專家 RAG 管理、資料匯入/範例/線上編輯、多格式篩選匯出、專題文章生成實驗室
 */
const herbService = require('../services/herbService');
const ragService = require('../services/ragService');
const userService = require('../services/userService');
const llmService = require('../services/llmService');
const importExportService = require('../services/importExportService');
const articleService = require('../services/articleService');
const ApiResponse = require('../utils/apiResponse');

class AdminController {
  // 內部輔助：取得當前請求的使用者 Session
  getCurrentSession(req) {
    const authHeader = req.headers.authorization || '';
    return userService.verifyToken(authHeader);
  }

  // 內部輔助：權限檢查守衛
  checkPermission(req, res, permissionKey) {
    const session = this.getCurrentSession(req);
    // 預設若為傳統管理員 token 允許通過
    if (!session) {
      res.status(401).json(ApiResponse.fail('尚未登入或通行權限已失效，請重新登入', 401));
      return null;
    }

    if (session.user.role === 'super_admin') {
      return session; // 超級管理員擁有所有權限
    }

    if (!userService.hasPermission(session.user.role, permissionKey)) {
      res.status(403).json(ApiResponse.fail(`權限不足：您的角色「${session.role?.name || session.user.role}」無法執行此操作`, 403));
      return null;
    }

    return session;
  }

  /**
   * POST /api/admin/login
   * 管理員登入 (支援雙欄位帳號密碼，以及單欄位通行碼相容模式)
   */
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!password) {
        return res.status(401).json(ApiResponse.fail('請提供登入通行碼', 401));
      }

      let authResult;
      try {
        authResult = userService.authenticate({ username, password });
      } catch (authErr) {
        return res.status(401).json(ApiResponse.fail(authErr.message, 401));
      }

      await herbService.getAuditLogs(); // ensure initialized
      return res.json(ApiResponse.ok({
        authenticated: true,
        token: authResult.token,
        role: authResult.user.role,
        name: authResult.user.name,
        user: authResult.user,
        permissions: authResult.permissions
      }, `登入成功，歡迎「${authResult.user.name}」`));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/admin/status
   * 檢查管理模式登入狀態與角色資訊
   */
  async getStatus(req, res, next) {
    try {
      const session = this.getCurrentSession(req);
      const isAuthenticated = Boolean(session);

      return res.json(ApiResponse.ok({
        authenticated: isAuthenticated,
        adminMode: isAuthenticated ? 'active' : 'guest',
        user: session ? session.user : null,
        role: session ? session.role : null,
        permissions: session ? session.permissions : [],
        defaultPasscodeHint: 'taiwanherb2026'
      }, '管理者權限檢查完畢'));
    } catch (err) {
      next(err);
    }
  }

  // ==========================================
  // 1. 使用者管理與前後台權限 (RBAC)
  // ==========================================

  /**
   * GET /api/admin/users
   * 取得使用者清單與角色對照表
   */
  async getUsers(req, res, next) {
    try {
      const users = userService.getUsers();
      const roles = userService.getRoles();
      return res.json(ApiResponse.ok({
        users,
        roles
      }, '成功取得使用者與角色配置清單'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/admin/users
   * 建立新使用者 (需 super_admin 權限)
   */
  async createUser(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'users:manage');
      if (!session) return;

      const newUser = userService.createUser(req.body);
      return res.status(201).json(ApiResponse.ok(newUser, `成功建立使用者「${newUser.name}」`));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  /**
   * PUT /api/admin/users/:id
   * 更新使用者 (需 super_admin 權限)
   */
  async updateUser(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'users:manage');
      if (!session) return;

      const { id } = req.params;
      const updated = userService.updateUser(id, req.body);
      return res.json(ApiResponse.ok(updated, `成功更新使用者「${updated.name}」之資訊`));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  /**
   * DELETE /api/admin/users/:id
   * 刪除使用者 (需 super_admin 權限)
   */
  async deleteUser(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'users:manage');
      if (!session) return;

      const { id } = req.params;
      userService.deleteUser(id);
      return res.json(ApiResponse.ok({ id }, `成功移除使用者帳號`));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  // ==========================================
  // 2. LLM API 來源與權限管理
  // ==========================================

  /**
   * GET /api/admin/llm/config
   * 取得 LLM 配置 (金鑰已遮罩)
   */
  async getLlmConfig(req, res, next) {
    try {
      const config = llmService.getConfig();
      return res.json(ApiResponse.ok(config, '成功取得 LLM 來源配置'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * PUT /api/admin/llm/config
   * 更新 LLM 配置 (需 super_admin 權限)
   */
  async updateLlmConfig(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'llm:manage');
      if (!session) return;

      const updated = llmService.updateConfig(req.body);
      return res.json(ApiResponse.ok(updated, '成功更新 LLM 來源與提供商配置'));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  /**
   * POST /api/admin/llm/test
   * 測試指定提供商之連線狀態
   */
  async testLlmConnection(req, res, next) {
    try {
      const { providerId } = req.body;
      const testResult = await llmService.testConnection(providerId);
      return res.json(ApiResponse.ok(testResult, '連線檢測完畢'));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  // ==========================================
  // 3. 專家 RAG 管理與測試沙盒
  // ==========================================

  /**
   * GET /api/admin/experts
   * 取得所有專家名錄
   */
  async getExperts(req, res, next) {
    try {
      const experts = ragService.getExperts();
      return res.json(ApiResponse.ok(experts, '成功取得專家 Persona 清單'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/admin/experts
   * 新增自訂專家 Persona
   */
  async createExpert(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'experts:write');
      if (!session) return;

      const created = ragService.createExpert(req.body);
      return res.status(201).json(ApiResponse.ok(created, `成功新增本草專家「${created.name}」`));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  /**
   * PUT /api/admin/experts/:id
   * 更新特定專家 Persona
   */
  async updateExpert(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'experts:write');
      if (!session) return;

      const { id } = req.params;
      const updated = ragService.updateExpert(id, req.body);
      if (!updated) {
        return res.status(404).json(ApiResponse.fail(`找不到 ID 為 ${id} 的專家`, 404));
      }
      return res.json(ApiResponse.ok(updated, `成功更新專家「${updated.name}」之語意設定`));
    } catch (err) {
      next(err);
    }
  }

  /**
   * DELETE /api/admin/experts/:id
   * 刪除自訂專家
   */
  async deleteExpert(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'experts:write');
      if (!session) return;

      const { id } = req.params;
      ragService.deleteExpert(id);
      return res.json(ApiResponse.ok({ id }, `成功移除自訂專家`));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  /**
   * POST /api/admin/experts/reset
   * 重設專家列表為系統預設值
   */
  async resetExperts(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'experts:write');
      if (!session) return;

      const experts = ragService.resetExperts();
      return res.json(ApiResponse.ok(experts, '成功重置為系統預設四大風土名師'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/admin/experts/playground
   * 專家 RAG 測試沙盒
   */
  async testExpertPlayground(req, res, next) {
    try {
      const { expertId, query, systemPromptOverride, topK } = req.body;
      const result = await ragService.testPlayground({
        expertId,
        query,
        systemPromptOverride,
        topK: parseInt(topK, 10) || 3
      });
      return res.json(ApiResponse.ok(result, '沙盒測試生成成功'));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  // ==========================================
  // 4. 資料匯入與範例及後台線上編輯
  // ==========================================

  /**
   * GET /api/admin/import/sample
   * 取得標準範例資料 (JSON 或 CSV)
   */
  async getImportSample(req, res, next) {
    try {
      const { format = 'json' } = req.query;
      const sample = importExportService.getSample(format);

      if (req.query.download === 'true') {
        res.setHeader('Content-Type', sample.contentType);
        res.setHeader('Content-Disposition', `attachment; filename=${sample.filename}`);
        return res.send(sample.content);
      }

      return res.json(ApiResponse.ok(sample, '成功取得本草匯入標準示範資料'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/admin/import/preview
   * 解析並驗證匯入文本，回傳線上工作台可編輯格式
   */
  async previewImport(req, res, next) {
    try {
      const { content, format = 'json' } = req.body;
      const previewResult = importExportService.parseAndValidate(content, format);
      return res.json(ApiResponse.ok(previewResult, `成功解析 ${previewResult.total} 筆本草資料列，請在線上工作台審閱編輯`));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  /**
   * POST /api/admin/import/commit
   * 批次確認寫入本草庫
   */
  async commitImport(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'import:write');
      if (!session) return;

      const { items } = req.body;
      const operatorName = session.user?.name || '管理員';
      const commitResult = await importExportService.commitBatch(items, operatorName);

      return res.json(ApiResponse.ok(commitResult, `成功匯入並典藏 ${commitResult.insertedCount} 味新草藥至知識庫`));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  // ==========================================
  // 5. 後台資料匯出 (條件篩選 JSON / CSV / Markdown)
  // ==========================================

  /**
   * GET /api/admin/export
   * 匯出資料 (支援 format: json, csv, markdown，並支援按產區、分類、狀態篩選)
   */
  async exportData(req, res, next) {
    try {
      const { format = 'json', region, category, status, q } = req.query;
      const exportResult = await importExportService.exportHerbs({
        format,
        region,
        category,
        status,
        query: q
      });

      res.setHeader('Content-Type', exportResult.contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${exportResult.filename}"`);

      if (format === 'json') {
        return res.send(exportResult.content);
      }

      return res.send(exportResult.content);
    } catch (err) {
      next(err);
    }
  }

  // ==========================================
  // 6. LLM 本草專題文章生成實驗室
  // ==========================================

  /**
   * GET /api/admin/articles/options
   * 取得專題文章生成所需的選項 (受眾群體、體裁、專家名錄)
   */
  async getArticleOptions(req, res, next) {
    try {
      const options = articleService.getOptions();
      return res.json(ApiResponse.ok(options, '成功取得文章生成實驗室選項'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/admin/articles/generate
   * 根據資料庫本草 Grounding 生成專題文章
   */
  async generateArticle(req, res, next) {
    try {
      const session = this.checkPermission(req, res, 'articles:write');
      if (!session) return;

      const { herbIds, expertId, targetAudience, articleType, customNotes } = req.body;
      const article = await articleService.generateArticle({
        herbIds,
        expertId,
        targetAudience,
        articleType,
        customNotes
      });

      return res.json(ApiResponse.ok(article, `成功以【${article.expert.name}】之口吻生成專題文章`));
    } catch (err) {
      return res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  // ==========================================
  // 原有草藥 CRUD 與儀表板日誌端點 (保持相容)
  // ==========================================

  /**
   * GET /api/admin/stats
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
   * GET /api/admin/logs
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
   */
  async resetDatabase(req, res, next) {
    try {
      const count = await herbService.resetToInitial();
      return res.json(ApiResponse.ok({ restoredCount: count }, `成功重置資料庫，恢復 ${count} 味經典本草`));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
