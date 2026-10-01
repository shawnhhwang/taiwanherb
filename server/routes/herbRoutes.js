/**
 * server/routes/herbRoutes.js
 * 藥材相關路由定義
 */
const express = require('express');
const router = express.Router();
const herbController = require('../controllers/herbController');

// 靜態路由在前，避免被 /:id 攔截
router.get('/', herbController.getHerbs);
router.get('/random', herbController.getRandomHerb);
router.post('/compare', herbController.compareHerbs);
router.get('/:id', herbController.getHerbById);
router.post('/', herbController.createHerb);
router.put('/:id', herbController.updateHerb);
router.delete('/:id', herbController.deleteHerb);

module.exports = router;
