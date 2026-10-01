/**
 * server/middlewares/logger.js
 * 結構化請求日誌中介軟體
 */
const morgan = require('morgan');

// 自訂結構化日誌格式
const requestLogger = morgan((tokens, req, res) => {
  return [
    `🌿 [${tokens.date(req, res, 'iso')}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `- ${tokens['response-time'](req, res)} ms`
  ].join(' ');
});

module.exports = requestLogger;
