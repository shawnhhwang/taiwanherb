/**
 * server/routes/healthRoutes.js
 * 系統健康監控路由
 */
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/', healthController.getHealth);
router.post('/failover-test', healthController.simulateFailover);

module.exports = router;
