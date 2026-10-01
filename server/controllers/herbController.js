/**
 * server/controllers/herbController.js
 * 藥材 API 控制器
 */
const herbService = require('../services/herbService');
const ApiResponse = require('../utils/apiResponse');

class HerbController {
  /**
   * GET /api/herbs
   * 搜尋與查詢藥材清單
   */
  async getHerbs(req, res, next) {
    try {
      const { q, query, category, channel, nature, page, limit, sort } = req.query;
      const result = await herbService.searchHerbs({
        query: q || query,
        category,
        channel,
        nature,
        page,
        limit,
        sort
      });
      return res.json(ApiResponse.ok(result.items, '成功取得藥材清單', result.pagination));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/herbs/:id
   * 取得單一藥材詳情
   */
  async getHerbById(req, res, next) {
    try {
      const { id } = req.params;
      const herb = await herbService.getHerbDetail(id);
      if (!herb) {
        return res.status(404).json(ApiResponse.fail(`找不到 ID 為 ${id} 的藥材`, 404));
      }
      return res.json(ApiResponse.ok(herb, '成功取得藥材詳情'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/herbs/random
   * 隨機推薦藥材
   */
  async getRandomHerb(req, res, next) {
    try {
      const herb = await herbService.getRandomHerb();
      if (!herb) {
        return res.status(404).json(ApiResponse.fail('資料庫尚無藥材資料', 404));
      }
      return res.json(ApiResponse.ok(herb, '成功取得隨機推薦藥材'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/categories
   */
  async getCategories(req, res, next) {
    try {
      const categories = await herbService.getCategories();
      return res.json(ApiResponse.ok(categories, '成功取得分類清單'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/channels
   */
  async getChannels(req, res, next) {
    try {
      const channels = await herbService.getChannels();
      return res.json(ApiResponse.ok(channels, '成功取得歸經清單'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/natures
   */
  async getNatures(req, res, next) {
    try {
      const natures = await herbService.getNatures();
      return res.json(ApiResponse.ok(natures, '成功取得藥性清單'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/herbs/compare
   * 比較多味藥材
   */
  async compareHerbs(req, res, next) {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json(ApiResponse.fail('請提供欲比較的藥材 ID 陣列', 400));
      }
      const comparison = await herbService.compareHerbs(ids);
      return res.json(ApiResponse.ok(comparison, '成功取得藥材比對資料'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/herbs
   */
  async createHerb(req, res, next) {
    try {
      const created = await herbService.createHerb(req.body);
      return res.status(201).json(ApiResponse.ok(created, '成功新增藥材'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * PUT /api/herbs/:id
   */
  async updateHerb(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await herbService.updateHerb(id, req.body);
      if (!updated) {
        return res.status(404).json(ApiResponse.fail(`找不到 ID 為 ${id} 的藥材`, 404));
      }
      return res.json(ApiResponse.ok(updated, '成功更新藥材'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * DELETE /api/herbs/:id
   */
  async deleteHerb(req, res, next) {
    try {
      const { id } = req.params;
      const success = await herbService.deleteHerb(id);
      if (!success) {
        return res.status(404).json(ApiResponse.fail(`找不到 ID 為 ${id} 的藥材`, 404));
      }
      return res.json(ApiResponse.ok({ id: parseInt(id, 10) }, '成功刪除藥材'));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new HerbController();
