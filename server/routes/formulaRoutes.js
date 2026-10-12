/**
 * server/routes/formulaRoutes.js
 * 角色經典配方與 AI 神來一配實驗室路由
 */
const express = require('express');
const router = express.Router();
const formulaController = require('../controllers/formulaController');

router.get('/', (req, res, next) => formulaController.getFormulas(req, res, next));
router.post('/blend', (req, res, next) => formulaController.aiExperimentBlend(req, res, next));
router.post('/harmonize', (req, res, next) => formulaController.harmonizeFormula(req, res, next));
router.get('/:id', (req, res, next) => formulaController.getFormulaById(req, res, next));

module.exports = router;
