/**
 * server/controllers/bookController.js
 * 草木書閣書籍與購買前台控制器
 */
const bookService = require('../services/bookService');
const ApiResponse = require('../utils/apiResponse');

class BookController {
  /**
   * GET /api/books
   * 取得書籍清單 (支援分類、關鍵字篩選與排序)
   */
  async getBooks(req, res, next) {
    try {
      const { category, query, sort } = req.query;
      const books = await bookService.getBooks({ category, query, sort });
      res.json(ApiResponse.success(books, { total: books.length }));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/books/:id
   * 取得單一書籍詳情
   */
  async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      const book = await bookService.getBookById(id);
      if (!book) {
        return res.status(404).json(ApiResponse.fail('找不到該書籍資料', 404));
      }
      res.json(ApiResponse.success(book));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/books/:id/preview
   * 取得線上試閱章節內容
   */
  async getSamplePreview(req, res, next) {
    try {
      const { id } = req.params;
      const preview = await bookService.getSamplePreview(id);
      if (!preview) {
        return res.status(404).json(ApiResponse.fail('找不到該書籍或未開放試閱', 404));
      }
      res.json(ApiResponse.success(preview));
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/books/order
   * 線上購買實體書、電子書或雙享合購版下單
   */
  async createOrder(req, res, next) {
    try {
      const {
        bookId,
        purchaseType,
        quantity,
        buyerName,
        buyerEmail,
        buyerPhone,
        shippingAddress,
        paymentMethod,
        notes
      } = req.body || {};

      const orderResult = await bookService.createOrder({
        bookId,
        purchaseType,
        quantity,
        buyerName,
        buyerEmail,
        buyerPhone,
        shippingAddress,
        paymentMethod,
        notes
      });

      res.status(201).json(ApiResponse.success(orderResult, { message: '購買成功！感謝您的支持' }));
    } catch (err) {
      res.status(400).json(ApiResponse.fail(err.message, 400));
    }
  }

  /**
   * GET /api/books/orders/my
   * 依 Email 查詢買家已訂購書籍或電子書授權
   */
  async getMyOrders(req, res, next) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json(ApiResponse.fail('請提供查詢電子信箱 (email)', 400));
      }
      const orders = await bookService.getMyOrders(email);
      res.json(ApiResponse.success(orders, { total: orders.length }));
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/books/orders/:orderId
   * 查詢單一訂單明細
   */
  async getOrderById(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await bookService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json(ApiResponse.fail('找不到該訂單紀錄', 404));
      }
      res.json(ApiResponse.success(order));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BookController();
