/**
 * server/controllers/consultController.js
 * 專家本草諮詢與 RAG 問答控制器
 */
const ragService = require('../services/ragService');
const ApiResponse = require('../utils/apiResponse');

class ConsultController {
  /**
   * GET /api/consult/experts
   * 取得專家 Persona 列表
   */
  async getExperts(req, res, next) {
    try {
      const experts = ragService.getExperts();
      return res.json(ApiResponse.ok(experts, '成功取得專家名錄'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/consult/experts/:id
   * 取得特定專家詳情
   */
  async getExpertById(req, res, next) {
    try {
      const { id } = req.params;
      const expert = ragService.getExpert(id);
      return res.json(ApiResponse.ok(expert, '成功取得專家詳情'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/consult
   * 執行本草 RAG 語意諮詢
   */
  async consult(req, res, next) {
    try {
      const { message, expertId } = req.body;
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json(ApiResponse.fail('請提供諮詢訊息內容', 400));
      }

      const result = await ragService.consult({
        message: message.trim(),
        expertId: expertId || 'wanhua_uncle'
      });

      return res.json(ApiResponse.ok(result, '本草專家諮詢回答生成成功'));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ConsultController();
