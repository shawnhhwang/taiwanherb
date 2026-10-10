/**
 * server/app.js
 * Express 應用程式核心配置
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const herbRoutes = require('./routes/herbRoutes');
const healthRoutes = require('./routes/healthRoutes');
const taxonomyRoutes = require('./routes/taxonomyRoutes');
const consultRoutes = require('./routes/consultRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ApiResponse = require('./utils/apiResponse');

const app = express();

// 基礎中介軟體
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// API 路由
app.use('/api/herbs', herbRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/consult', consultRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', taxonomyRoutes);

// 提供靜態檔案 (Vue 編譯成品 client/dist)
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
}

// 支援 SPA 單頁應用程式路由退避 (如果請求不是 /api 開頭)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json(ApiResponse.fail(`找不到 API 端點: ${req.method} ${req.path}`, 404));
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  // 若尚未 build client，回傳友善提示與引導
  res.type('html').send(`
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head><meta charset="utf-8"><title>台灣本草植物 Wiki API</title>
    <style>body{font-family:sans-serif;padding:40px;background:#fcfbf7;color:#2c3e50;line-height:1.6;}
    a{color:#2d5f4d;font-weight:bold;}</style></head>
    <body>
      <h2>🌿 台灣本草植物 Wiki - 後端 API 運行中</h2>
      <p>Node.js Express 伺服器已正常啟動。</p>
      <ul>
        <li><a href="/api/herbs" target="_blank">檢視藥材清單: /api/herbs</a></li>
        <li><a href="/api/categories" target="_blank">檢視分類統計: /api/categories</a></li>
        <li><a href="/api/health" target="_blank">系統健康狀態: /api/health</a></li>
      </ul>
      <p>請執行 <code>npm run build</code> 編譯 Vue 3 前端，或執行 <code>npm run dev</code> 開發前後端。</p>
    </body>
    </html>
  `);
});

// 全域錯誤處理中介軟體
app.use(errorHandler);

module.exports = app;
