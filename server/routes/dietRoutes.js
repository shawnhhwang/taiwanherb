/**
 * server/routes/dietRoutes.js
 * 藥膳學食材與典藏專館路由
 */
const express = require('express');
const router = express.Router();
const medicinalDietData = require('../data/medicinalDietData');
const ApiResponse = require('../utils/apiResponse');

// 取得所有藥膳食材與學理清單（支援分類與關鍵字搜尋）
router.get('/', (req, res, next) => {
  try {
    const { category, query } = req.query;
    let list = [...medicinalDietData];

    if (category && category !== 'all') {
      list = list.filter(item => item.category === category);
    }

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(item => {
        return (
          (item.name && item.name.toLowerCase().includes(q)) ||
          (item.functions && item.functions.toLowerCase().includes(q)) ||
          (item.indications && item.indications.toLowerCase().includes(q)) ||
          (item.natureFlavor && item.natureFlavor.toLowerCase().includes(q)) ||
          (item.medicinalDiet && item.medicinalDiet.toLowerCase().includes(q)) ||
          (item.subCategory && item.subCategory.toLowerCase().includes(q)) ||
          (item.source && item.source.toLowerCase().includes(q)) ||
          (item.notes && item.notes.toLowerCase().includes(q))
        );
      });
    }

    res.json(ApiResponse.success(list, { total: list.length }));
  } catch (err) {
    next(err);
  }
});

// 取得單一藥膳食材詳情
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const item = medicinalDietData.find(d => d.id === id);
    if (!item) {
      return res.status(404).json(ApiResponse.fail('找不到該藥膳食材品項', 404));
    }
    res.json(ApiResponse.success(item));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
