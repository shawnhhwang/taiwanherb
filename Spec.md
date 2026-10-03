# [SPEC] 台灣本草植物 Wiki 資料庫系統 (Taiwan Herb Wiki)

> **設計品質標準**：以 **Awwwards (Site of the Day)**、**Webby Awards** 及 **FWA** 國際殿堂級數位設計獎項之標準為目標，打造兼具東方草本美學、沉浸式互動聲景與現代植物學嚴謹知識體系之全端知識庫系統。

---

## 1. 專案概述
本專案建置一個基於 **Node.js (Express)** 與 **Vue.js 3** 的現代數位植物圖鑑系統。融合「傳統青草風土」、「二十四節氣養生」、「五行臟腑經絡引領」與「古法方劑煎煮研製」，呈現兼具視覺張力、觸覺化聲學反饋（Web Audio 合成）與高流暢度微互動（Micro-interactions）之博物館級植物誌。

---

## 2. Awwwards / Webby / FWA 評審標準對照與實踐

| 評審維度 | 國際獲獎標準 | 本專案具體實踐與設計規範 |
| :--- | :--- | :--- |
| **Design & Art Direction (視覺與藝術指導)** | 獨創品牌調性、精緻字型階層、沈浸氛圍 | 宣紙古卷米黃（Parchment）、晨曦竹林（Bamboo）、暮夜玄青（Midnight）三大東方主題；思源宋體（Noto Serif TC）搭配現代無襯線排版；有機漂浮草木粒子畫布 (`HerbAtmosphere`)。 |
| **Creativity & Innovation (創意與創新特性)** | 突破傳統呆板網頁、具備實質探索價值 | **青草茶方劑調配研製所 (`HerbAlchemyLab`)**：即時演算四氣陰陽平衡指針與五味圖譜；**二十四節氣青草曆 (`HerbHero`)**；**五行臟腑氣血經絡地圖 (`HerbMeridianMap`)**。 |
| **Usability & UX (易用性與人機互動)** | 零阻礙操作、符合現代操作直覺 | 全域指令面板（`Cmd+K / Ctrl+K` 快捷搜尋）；250ms 防抖即時搜尋；卡片 3D 透視傾斜（Tilt Effect）與鏡面流光；藥材多方橫向對照比對。 |
| **Content & Depth (內容深度與風土價值)** | 具備專業文獻佐證與文化厚度 | 收錄植物科屬（Family）、入藥部位（Parts Used）、現代活性化學成分（Active Compounds）、最佳採收時節、台灣代表生長風土（萬華青草巷、苗栗客家庄等）。 |
| **Acoustic Design (聲學設計與觸覺體驗)** | 純粹原生、無感延遲、零外部資源負擔 | 內建純瀏覽器 Web Audio API 聲景合成器 (`audioService.js`)，合成竹音擊節、金屬頌缽磬音、茶釜沸水氣泡與山嵐松風自然白噪音。 |

---

## 3. 技術棧 (Tech Stack)

### 後端 (Backend)
* **Runtime**: Node.js (v18+ / v20 LTS)
* **Web Framework**: Express.js
* **架構模式**: Layered Architecture (Controller - Service - Repository Pattern), Result Pattern (`ApiResponse`)
* **資料庫支援**: MySQL 8.0 (具備 Primary / Secondary 主從故障自動切換機制) + 內建即開即用記憶體資料庫 (Zero-config Fallback)
* **日誌與監控**: Morgan 結構化時間戳日誌、`/api/health` 即時健康節點與 Failover 手動演練端點
* **測試框架**: Node.js 原生測試執行器 (`node:test`, `node:assert`)

### 前端 (Frontend)
* **Core Framework**: Vue.js 3 (Composition API, `<script setup>`)
* **Build Tool**: Vite 5
* **樣式與主題**: CSS Custom Properties 動態三色主題切換、支援 `@media print` 本草藏書票列印
* **音效合成**: 瀏覽器原生 Web Audio API，無需外部音檔
* **路由機制**: 客戶端 URL Hash 路由 (`#/herb/:id`)，支援直接分享與歷史導航

---

## 4. 系統架構定義

```
taiwanherb/
├── server/                      # Node.js 後端服務
│   ├── app.js                   # Express 應用程式配置、CORS 與靜態/SPA退避路由
│   ├── server.js                # 伺服器啟動入口與優雅關機 (Graceful Shutdown)
│   ├── config/
│   │   ├── config.js            # 環境變數與伺服器埠號配置
│   │   └── dbFactory.js         # MySQL 連線池與 Primary/Secondary Failover 自動切換
│   ├── data/
│   │   └── herbsData.js         # 台灣在地特色青草與植物學深度知識庫 (16+ 款經典藥材)
│   ├── repositories/
│   │   └── herbRepository.js    # 存取層：模糊搜尋、四氣五味、經絡篩選、分頁排序
│   ├── services/
│   │   └── herbService.js       # 業務邏輯層：DTO映射、相似度關聯推薦演算法、多方比對
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
│   │   ├── App.vue              # 主視圖、全域狀態、Hash 路由與鍵盤監控
│   │   ├── assets/
│   │   │   └── style.css        # 東方本草植物圖鑑樣式系統與三色主題規範
│   │   ├── services/
│   │   │   ├── api.js           # 前端 API 請求封裝
│   │   │   └── audioService.js  # Web Audio 聲景合成器 (竹音、磬聲、水滴、沸水、山嵐)
│   │   └── components/
│   │       ├── HerbAtmosphere.vue   # 漂浮草木花粉與微光微粒 Canvas 動畫
│   │       ├── HerbNavbar.vue       # 頂端導覽、主題切換、聲音切換、Cmd+K 喚醒
│   │       ├── HerbHero.vue         # 殿堂級 Hero、24 節氣即時日曆、3D 標本卡片
│   │       ├── HerbSidebar.vue      # 側邊分類、四氣藥性、經絡歸經多維度篩選欄
│   │       ├── HerbCard.vue         # 3D 傾斜圖鑑卡片 (流光層、標本號、收藏星號)
│   │       ├── HerbDetail.vue       # 展卷詳情頁 (科屬、活性成分、風土故事、茶飲煎服)
│   │       ├── HerbAlchemyLab.vue   # 青草茶方劑研製所 (陰陽指針、五味圖譜、煎煮計時)
│   │       ├── HerbMeridianMap.vue  # 五行臟腑經絡氣血引導圖
│   │       ├── FavoritesCabinet.vue # 我的本草藏書票標本室
│   │       ├── CommandPalette.vue   # Ctrl+K 快捷命令搜尋盤
│   │       ├── HerbCompareModal.vue # 跨藥材多維橫向對照表
│   │       └── HealthModal.vue      # 系統健康狀態與線上 Failover 演練
└── tests/
    └── api.test.js              # API 整合測試與 SPA 靜態託管驗證
```

---

## 5. 完工檢查表 (Definition of Done - DoD)
- [x] 前端品質全面提升至 Awwwards、Webby Awards、FWA 級別。
- [x] 實作 `HerbHero.vue` 殿堂級敘事橫幅與 24 節氣島嶼青草日曆。
- [x] 實作 `HerbAlchemyLab.vue` 方劑研製所（陰陽平衡計、五味圖譜、煎煮計時器、配方箋匯出）。
- [x] 實作 `HerbMeridianMap.vue` 五行臟腑經絡氣血引導圖。
- [x] 實作 `FavoritesCabinet.vue` 我的本草藏書票收藏室。
- [x] 實作 `CommandPalette.vue` 全域快捷搜尋命令盤 (`Ctrl+K / Cmd+K`)。
- [x] 實作 `audioService.js` 原生 Web Audio 聲學設計（點擊竹音、頌缽磬聲、沸水微響、山嵐松風）。
- [x] 實作三種東方美學主題切換（宣紙 Parchment / 竹林 Bamboo / 暮夜 Midnight）。
- [x] 升級資料庫模型，納入植物科屬、活性成分、採集季節、產地風土與節氣相應。
- [x] 實作卡片 3D 透視傾斜（Tilt Effect）與鏡面流光反光層。
- [x] 通過全部 11 項自動化整合測試與 Vite 生產環境建置。
- [x] 全面更新對應之文檔文件。