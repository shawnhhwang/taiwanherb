/**
 * server/middlewares/rateLimiter.js
 * 輕量高可靠內存速率限制中介軟體 (Rate Limiter)
 * 防止密碼暴力破解與 LLM API 惡意刷流消耗
 */

function createRateLimiter({ windowMs = 60 * 1000, max = 60, message = '請求過於頻繁，請稍後再試' } = {}) {
  const hits = new Map();

  // 定期清除過期紀錄以防記憶體洩漏
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of hits.entries()) {
      if (now > record.resetTime) {
        hits.delete(key);
      }
    }
  }, Math.max(windowMs, 30000)).unref();

  return (req, res, next) => {
    // 測試環境略過限流以防干擾單元測試
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
    const key = `${req.baseUrl || req.path}:${ip}`;
    const now = Date.now();

    let record = hits.get(key);
    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + windowMs };
      hits.set(key, record);
      return next();
    }

    record.count++;
    if (record.count > max) {
      res.setHeader('Retry-After', Math.ceil((record.resetTime - now) / 1000));
      return res.status(429).json({
        success: false,
        code: 429,
        error: {
          message,
          retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000)
        }
      });
    }

    next();
  };
}

module.exports = {
  createRateLimiter,
  loginLimiter: createRateLimiter({ windowMs: 15 * 60 * 1000, max: 20, message: '登入嘗試次數過多，請於 15 分鐘後再試' }),
  consultLimiter: createRateLimiter({ windowMs: 60 * 1000, max: 30, message: 'AI 諮詢頻率過高，請稍候重試' })
};
