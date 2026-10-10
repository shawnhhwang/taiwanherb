/**
 * server/routes/taxonomyRoutes.js
 * 藥材分類、歸經、藥性、風土產區、民間生活情境、入藥部位與安全分級統計路由
 */
const express = require('express');
const router = express.Router();
const herbController = require('../controllers/herbController');

router.get('/categories', herbController.getCategories);
router.get('/channels', herbController.getChannels);
router.get('/natures', herbController.getNatures);
router.get('/regions', herbController.getRegions);
router.get('/folk-applications', herbController.getFolkApplications);
router.get('/parts-used', herbController.getPartsUsed);
router.get('/safety-levels', herbController.getSafetyLevels);

module.exports = router;
