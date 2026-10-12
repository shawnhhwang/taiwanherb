/**
 * server/routes/bookRoutes.js
 * 草木書閣書籍、試閱與線上購買前台路由
 */
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', (req, res, next) => bookController.getBooks(req, res, next));
router.post('/order', (req, res, next) => bookController.createOrder(req, res, next));
router.get('/orders/my', (req, res, next) => bookController.getMyOrders(req, res, next));
router.get('/orders/:orderId', (req, res, next) => bookController.getOrderById(req, res, next));
router.get('/:id/preview', (req, res, next) => bookController.getSamplePreview(req, res, next));
router.get('/:id', (req, res, next) => bookController.getBookById(req, res, next));

module.exports = router;
