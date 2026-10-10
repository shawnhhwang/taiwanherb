/**
 * server/routes/consultRoutes.js
 * 本草名醫與風土專家 RAG 諮詢路由
 */
const express = require('express');
const router = express.Router();
const consultController = require('../controllers/consultController');

router.get('/experts', consultController.getExperts);
router.get('/experts/:id', consultController.getExpertById);
router.post('/', consultController.consult);

module.exports = router;
