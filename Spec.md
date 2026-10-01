# [SPEC] 台灣本草植物 Wiki 資料庫系統 (Taiwan Herb Wiki)

## 1. 專案概述
本專案建置一個基於 **Node.js (Express)** 與 **Vue.js 3** 的現代全端中草藥與台灣本土青草植物知識庫系統。提供專業植物圖鑑、藥材多維度檢索（名稱、學名、四氣藥性、五行歸經、功效主治）、深度藥性展卷詳情、多方藥材對照比對，以及企業級資料庫故障轉移 (Failover) 與系統健康監控機制。

---

## 2. 技術棧 (Tech Stack)

### 後端 (Backend)
* **Runtime**: Node.js (v18+ / v20 LTS)
* **Web Framework**: Express.js
* **架構模式**: Layered Architecture (Controller - Service - Repository Pattern), Result Pattern
* **資料庫支援**: MySQL 8.0 (具備 Primary / Secondary 主從故障自動切換機制) + 內建即開即用記憶體資料庫 (Zero-config Fallback)
* **日誌與監控**: Morgan 結構化時間戳日誌、`/api/health` 即時健康節點
* **測試框架**: Node.js 原生測試執行器 (`node --test`, `node:assert`)

### 前端 (Frontend)
* **Core Framework**: Vue.js 3 (Composition API, `<script setup>`)
* **Build Tool**: Vite 5
* **樣式與設計**: 現代東方本草植物圖鑑美學 (Modern Oriental Herbarium UI)，沉浸式宣紙米白底色、本草深綠、草本徽章與五行歸經色票
* **路由機制**: 客戶端 URL Hash 路由 (`#/herb/:id`)，支援直接分享與瀏覽器前後導航
* **互動特性**: 搜尋防抖 (Debounce)、多維度多標籤即時篩選、清單/圖鑑雙模式切換、跨藥材多方對照彈窗

---

## 3. 系統架構定義

```
taiwanherb/
├── server/                      # Node.js 後端服務
│   ├── app.js                   # Express 應用程式配置、CORS 與靜態/SPA退避路由
│   ├── server.js                # 伺服器啟動入口與優雅關機 (Graceful Shutdown)
│   ├── config/
│   │   ├── config.js            # 環境變數與伺服器埠號配置
│   │   └── dbFactory.js         # MySQL 連線池與 Primary/Secondary Failover 自動切換
│   ├── data/
│   │   └── herbsData.js         # 台灣在地特色青草與傳統中藥材核心知識庫
│   ├── repositories/
│   │   └── herbRepository.js    # 存取層：模糊搜尋、四氣五味與歸經篩選、分頁排序
│   ├── services/
│   │   └── herbService.js       # 業務邏輯層：DTO轉換、相似藥材推薦演算法、比對邏輯
│   ├── controllers/
│   │   ├── herbController.js    # 藥材 API 控制器
│   │   └── healthController.js  # 健康檢查與 Failover 演練控制器
│   ├── routes/
│   │   ├── herbRoutes.js        # /api/herbs 端點路由
│   │   ├── healthRoutes.js      # /api/health 端點路由
│   │   └── taxonomyRoutes.js    # /api/categories, /api/channels, /api/natures
│   ├── middlewares/
│   │   ├── errorHandler.js      # 全域未捕捉異常攔截器
│   │   └── logger.js            # 結構化請求日誌中介軟體
│   └── utils/
│       └── apiResponse.js       # Result Pattern 統一回傳格式包裝器
├── client/                      # Vue 3 前端單頁應用 (SPA)
│   ├── index.html               # HTML5 入口與 Noto 典雅字型載入
│   ├── vite.config.js           # Vite 開發代理與打包配置
│   ├── src/
│   │   ├── main.js              # Vue 實例掛載
│   │   ├── App.vue              # 主視圖與狀態整合、Hash 路由監控
│   │   ├── assets/
│   │   │   └── style.css        # 本草東方植物圖鑑樣式系統
│   │   ├── services/
│   │   │   └── api.js           # 前端 API 請求封裝
│   │   └── components/
│   │       ├── HerbNavbar.vue       # 頂部導覽列、搜尋防抖、隨機推薦、健康狀態
│   │       ├── HerbSidebar.vue      # 側邊分類、四氣藥性、經絡歸經篩選欄
│   │       ├── HerbCard.vue         # 藥材圖鑑卡片 (植物照片、標籤、功效、比對勾選)
│   │       ├── HerbDetail.vue       # 藥材詳情展卷頁 (在地故事、用法茶飲、禁忌警語)
│   │       ├── HerbCompareModal.vue # 多方藥材對照比對彈窗
│   │       └── HealthModal.vue      # 伺服器狀態與 Failover 演練彈窗
└── tests/
    └── api.test.js              # API 整合測試與 SPA 靜態託管驗證
```

---

## 4. API 規格與資料模型

### 統一回應格式 (ApiResponse)
```json
{
  "success": true,
  "message": "Success",
  "data": { ... },
  "errorCode": 0,
  "timestamp": "2026-10-01T14:40:00.000Z",
  "meta": { "page": 1, "limit": 12, "total": 16, "totalPages": 2 }
}
```

### 核心資料模型 (Herb Model)
* `id` (Number): 藥材唯一識別碼
* `name` (String): 藥材中文名 (如: 大花咸豐草)
* `scientificName` (String): 植物學拉丁學名 (如: Bidens pilosa var. radiata)
* `pinyin` (String): 漢語拼音
* `commonNames` (Array<String>): 民間俗名 / 別名
* `category` (String): 藥材類別 (如: 台灣青草茶經典, 清熱解毒藥, 辛涼解表藥)
* `nature` (String): 四氣藥性 (寒 / 涼 / 平 / 溫 / 熱)
* `taste` (Array<String>): 五味 (辛 / 苦 / 甘 / 酸 / 鹹 / 淡)
* `channels` (Array<String>): 歸經臟腑 (肺 / 肝 / 脾 / 胃 / 腎 / 心 / 大腸...)
* `efficacy` (String): 功效與主治
* `contraindications` (String): 體質使用禁忌與警語
* `usage` (String): 用法用量與日常青草茶煮法建議
* `taiwanHeritage` (String): 台灣在地草藥文化、青草街與採集背景
* `thumbnailUrl` (String): 植物照片連結
* `tags` (Array<String>): 檢索標籤

---

## 5. 完工檢查表 (Definition of Done - DoD)
- [x] 轉換為 Node.js (Express) 架構，移除舊有 C# .NET 檔案。
- [x] 轉換為 Vue.js 3 (Vite) 前端單頁架構，取代傳統 Vanilla JS。
- [x] 實作 `GET /api/herbs` (支援關鍵字防抖模糊搜尋、分類/歸經/藥性篩選與分頁)。
- [x] 實作 `GET /api/herbs/:id` (回傳完整藥性、台灣在地智慧、茶飲用法、禁忌與關聯推薦)。
- [x] 實作 `GET /api/categories`, `GET /api/channels`, `GET /api/natures` 統計端點。
- [x] 實作 `DbFactory` 資料庫連線池與 Primary / Secondary 自動故障轉移 (Failover) 機制。
- [x] 實作 `GET /api/health` 系統健康監控與 Failover 節點狀態檢測。
- [x] 實作全域異常攔截器 (`errorHandler.js`) 與結構化日誌 (`logger.js`)。
- [x] 打造兼具東方本草美學與現代圖鑑風格之 Vue.js 響應式介面 (RWD)。
- [x] 提供多方藥材對照比對 (HerbCompareModal) 功能。
- [x] 支援基於 URL Hash 的客戶端導航 (`#/herb/:id`)。
- [x] 撰寫自動化測試套件 (`npm test`) 並全數通過驗證。
- [x] 更新所有 Markdown 文檔並提供清楚的 `README.md`。