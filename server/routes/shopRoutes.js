/**
 * server/routes/shopRoutes.js
 * 結盟青草店與購買指引路由
 */
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', (req, res, next) => shopController.getShops(req, res, next));
router.get('/guides', (req, res, next) => shopController.getBuyingGuides(req, res, next));
router.get('/by-herb/:herbName', (req, res, next) => shopController.getShopsByHerb(req, res, next));
router.get('/:id', (req, res, next) => shopController.getShopById(req, res, next));

module.exports = router;
