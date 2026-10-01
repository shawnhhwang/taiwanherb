/**
 * server/server.js
 * 伺服器啟動入口與優雅關機
 */
const app = require('./app');
const config = require('./config/config');
const dbFactory = require('./config/dbFactory');

const server = app.listen(config.port, () => {
  console.log(`====================================================`);
  console.log(`🌿 台灣本草植物 Wiki 資料庫系統 (Taiwan Herb Wiki)`);
  console.log(`🚀 伺服器已成功啟動於: http://localhost:${config.port}`);
  console.log(`📦 運行環境: ${config.nodeEnv}`);
  console.log(`💾 資料庫模式: ${dbFactory.getStatus().modeDescription}`);
  console.log(`📌 API 基礎路徑: http://localhost:${config.port}/api`);
  console.log(`🩺 健康監控節點: http://localhost:${config.port}/api/health`);
  console.log(`====================================================`);
});

// 優雅關機處理
const shutdown = (signal) => {
  console.log(`\n🛑 收到 ${signal} 信號，正在優雅關閉伺服器...`);
  server.close(() => {
    console.log('✅ HTTP 伺服器已關閉。');
    process.exit(0);
  });

  // 超過 5 秒強制結束
  setTimeout(() => {
    console.error('⚠️ 強制結束進程。');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
