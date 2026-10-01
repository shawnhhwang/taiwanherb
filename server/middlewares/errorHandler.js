/**
 * server/middlewares/errorHandler.js
 * 全域異常攔截器 (Global Exception Handler)
 */
const ApiResponse = require('../utils/apiResponse');

function errorHandler(err, req, res, next) {
  console.error(`💥 [Error] ${req.method} ${req.url} - ${err.message}`);
  if (err.stack) {
    console.error(err.stack);
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || '伺服器內部錯誤，請稍後再試';

  res.status(statusCode).json(ApiResponse.fail(message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : undefined));
}

module.exports = errorHandler;
