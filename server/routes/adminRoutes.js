/**
 * server/routes/adminRoutes.js
 * 後台管理與本草典藏維護路由
 * 涵蓋使用者 RBAC、LLM 提供商管理、專家 RAG 管理、資料匯入與線上編輯、多格式匯出、文章生成實驗室
 */
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// 1. 認證與狀態
router.post('/login', adminController.login.bind(adminController));
router.get('/status', adminController.getStatus.bind(adminController));
router.get('/stats', adminController.getStats.bind(adminController));

// 2. 前後台使用者與權限管理 (RBAC)
router.get('/users', adminController.getUsers.bind(adminController));
router.post('/users', adminController.createUser.bind(adminController));
router.put('/users/:id', adminController.updateUser.bind(adminController));
router.delete('/users/:id', adminController.deleteUser.bind(adminController));

// 3. LLM 提供商與 API 來源管理
router.get('/llm/config', adminController.getLlmConfig.bind(adminController));
router.put('/llm/config', adminController.updateLlmConfig.bind(adminController));
router.post('/llm/test', adminController.testLlmConnection.bind(adminController));

// 4. 專家 RAG Persona 管理與測試沙盒
router.get('/experts', adminController.getExperts.bind(adminController));
router.post('/experts', adminController.createExpert.bind(adminController));
router.put('/experts/:id', adminController.updateExpert.bind(adminController));
router.delete('/experts/:id', adminController.deleteExpert.bind(adminController));
router.post('/experts/reset', adminController.resetExperts.bind(adminController));
router.post('/experts/playground', adminController.testExpertPlayground.bind(adminController));

// 5. 資料匯入 (範例下載、文字/CSV解析預覽、線上編輯與批次寫入)
router.get('/import/sample', adminController.getImportSample.bind(adminController));
router.post('/import/preview', adminController.previewImport.bind(adminController));
router.post('/import/commit', adminController.commitImport.bind(adminController));

// 6. 條件篩選資料匯出 (JSON / CSV / Markdown)
router.get('/export', adminController.exportData.bind(adminController));

// 7. LLM 本草專題文章生成實驗室
router.get('/articles/options', adminController.getArticleOptions.bind(adminController));
router.post('/articles/generate', adminController.generateArticle.bind(adminController));

// 8. 本草清單與 CRUD (原有相容端點)
router.get('/herbs', adminController.getHerbs.bind(adminController));
router.post('/herbs', adminController.createHerb.bind(adminController));
router.put('/herbs/:id', adminController.updateHerb.bind(adminController));
router.delete('/herbs/:id', adminController.deleteHerb.bind(adminController));

// 9. 審計日誌與種子庫重置
router.get('/logs', adminController.getAuditLogs.bind(adminController));
router.post('/reset', adminController.resetDatabase.bind(adminController));

module.exports = router;
