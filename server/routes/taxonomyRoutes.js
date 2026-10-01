/**
 * server/routes/taxonomyRoutes.js
 * 藥材分類、歸經、藥性統計路由
 */
const express = require('express');
const router = express.Router();
const herbController = require('../controllers/herbController');

router.get('/categories', herbController.getCategories);
router.get('/channels', herbController.getChannels);
router.get('/natures', herbController.getNatures);

module.exports = router;
