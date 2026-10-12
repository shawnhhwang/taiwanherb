/**
 * server/controllers/formulaController.js
 * 角色配方庫與 AI 神來一配控制器
 */
const formulaService = require('../services/formulaService');
const ApiResponse = require('../utils/apiResponse');

class FormulaController {
  async getFormulas(req, res, next) {
    try {
      const { expertId, type, query } = req.query;
      const formulas = await formulaService.getFormulas({ expertId, type, query });
      res.json(ApiResponse.success(formulas, { total: formulas.length }));
    } catch (err) {
      next(err);
    }
  }

  async getFormulaById(req, res, next) {
    try {
      const { id } = req.params;
      const formula = await formulaService.getFormulaById(id);
      if (!formula) {
        return res.status(404).json(ApiResponse.fail('找不到該經典配方', 404));
      }
      res.json(ApiResponse.success(formula));
    } catch (err) {
      next(err);
    }
  }

  async aiExperimentBlend(req, res, next) {
    try {
      const { herbIds, targetIntent, customName } = req.body || {};
      const blendResult = await formulaService.aiExperimentBlend({ herbIds, targetIntent, customName });
      res.json(ApiResponse.success(blendResult));
    } catch (err) {
      next(err);
    }
  }

  async harmonizeFormula(req, res, next) {
    try {
      const { herbIds, targetIntent } = req.body || {};
      const harmonizedResult = await formulaService.autoHarmonize({ herbIds, targetIntent });
      res.json(ApiResponse.success(harmonizedResult));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FormulaController();
