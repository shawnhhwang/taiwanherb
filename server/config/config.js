/**
 * server/config/config.js
 * 伺服器與資料庫環境設定
 */
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: '/api',
  database: {
    // 主資料庫 (Primary)
    primary: {
      host: process.env.DB_PRIMARY_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PRIMARY_PORT, 10) || 3306,
      user: process.env.DB_PRIMARY_USER || 'root',
      password: process.env.DB_PRIMARY_PASSWORD || '',
      database: process.env.DB_NAME || 'taiwanherb',
      connectionLimit: 10
    },
    // 備援資料庫 (Secondary Failover Node)
    secondary: {
      host: process.env.DB_SECONDARY_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_SECONDARY_PORT, 10) || 3307,
      user: process.env.DB_SECONDARY_USER || 'root',
      password: process.env.DB_SECONDARY_PASSWORD || '',
      database: process.env.DB_NAME || 'taiwanherb',
      connectionLimit: 10
    },
    // 若無實體 MySQL 時自動啟用 Memory/JSON 模式以保證立即可開箱運行
    fallbackToMemory: process.env.DB_FALLBACK_MEMORY !== 'false',
    failoverThreshold: 2
  }
};
