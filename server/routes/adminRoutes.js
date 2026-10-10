/**
 * server/routes/adminRoutes.js
 * 後台管理與本草典藏維護路由
 */
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.get('/status', adminController.getStatus);
router.get('/stats', adminController.getStats);
router.get('/herbs', adminController.getHerbs);
router.post('/herbs', adminController.createHerb);
router.put('/herbs/:id', adminController.updateHerb);
router.delete('/herbs/:id', adminController.deleteHerb);
router.put('/experts/:id', adminController.updateExpert);
router.get('/logs', adminController.getAuditLogs);
router.post('/reset', adminController.resetDatabase);
router.get('/export', adminController.exportData);

module.exports = router;
