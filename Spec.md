# [SPEC] 台灣本草植物 Wiki 資料庫系統 (Taiwan Herb Wiki)

> **設計品質標準**：以 **Awwwards (Site of the Day)**、**Webby Awards** 及 **FWA** 國際殿堂級數位設計獎項之標準為目標，打造兼具東方草本美學、沉浸式互動聲景、RAG 專家語意諮詢、台灣風土檢索與典藏後台之全端知識庫系統。

---

## 1. 專案概述
本專案建置一個基於 **Node.js (Express)** 與 **Vue.js 3** 的現代數位植物圖鑑系統。融合「台灣傳統青草風土」、「客家辟邪與月子青草文化」、「原住民山林野菜野草智慧」、「檢索增強生成 (RAG) 專家語意諮詢茶堂」與「典藏後台 CMS 管理模式」，呈現兼具視覺張力、觸覺化聲學反饋（Web Audio 合成）與高流暢度微互動（Micro-interactions）之博物館級植物誌。

---

## 2. Awwwards / Webby / FWA 評審標準對照與實踐

| 評審維度 | 國際獲獎標準 | 本專案具體實踐與設計規範 |
| :--- | :--- | :--- |
| **Design & Art Direction (視覺與藝術指導)** | 獨創品牌調性、精緻字型階層、沈浸氛圍 | 宣紙古卷米黃（Parchment）、晨曦竹林（Bamboo）、暮夜玄青（Midnight）三大東方主題；思源宋體（Noto Serif TC）搭配現代無襯線排版；有機漂浮草木粒子畫布 (`HerbAtmosphere`)。 |
| **Creativity & Innovation (創意與創新特性)** | 突破傳統呆板網頁、具備實質探索價值 | **風土達人諮詢茶堂 (`HerbConsultationLab`)**：支援萬華老茶師、客庄草藥阿婆、生藥學博士、原民野菜獵人 4 大專家 Persona，透過 RAG 語意檢索本草知識庫並產生風格化回覆與 Citations 標本引用卡；**台灣風土產區探索 (`TaiwanTerroirMap`)**；**青草茶方劑調配研製所 (`HerbAlchemyLab`)**；**五行臟腑氣血經絡圖 (`HerbMeridianMap`)**。 |
| **Admin & CMS Capabilities (典藏管理模式)** | 完備的管理後台、即時標本卡預覽、審計日誌與備份 | **典藏後台管理中心 (`HerbAdminDashboard`)**：通行碼安全認證、全庫統計儀表板、本草 CRUD、所見即所得之「古典標本票卡即時預覽 (Live Specimen Plate Preview)」、專家語意 Prompt 微調、全庫 JSON/CSV 備份與審計日誌。 |
| **Usability & UX (易用性與人機互動)** | 零阻礙操作、符合現代操作直覺 | 全域指令面板（`Cmd+K / Ctrl+K` 快捷搜尋，支援台語/客語俗名檢索）；250ms 防抖即時搜尋；卡片 3D 透視傾斜（Tilt Effect）與鏡面流光；藥材多方橫向對照比對。 |
| **Content & Depth (內容深度與風土價值)** | 具備專業文獻佐證與文化厚度 | 收錄 25 款指標性台灣本土草藥、客家青草與原民野草；涵蓋風土產區、入藥部位、民間生活情境、四氣五味、化學活性成分、台客語俗名標音與安全用藥等級。 |
| **Acoustic Design (聲學設計與觸覺體驗)** | 純粹原生、無感延遲、零外部資源負擔 | 內建純瀏覽器 Web Audio API 聲景合成器 (`audioService.js`)，合成竹音擊節、金屬頌缽磬音、茶釜沸水氣泡、山嵐松風自然白噪音、朱砂印章用印聲與展卷紙張微響。 |

---

## 3. 技術棧 (Tech Stack)

### 後端 (Backend)
* **Runtime**: Node.js (v18+ / v20 LTS)
* **Web Framework**: Express.js
* **架構模式**: Layered Architecture (Controller - Service - Repository Pattern), Result Pattern (`ApiResponse`)
* **智慧生成**: RAG (Retrieval-Augmented Generation) 知識庫語意檢索 + 4 大專家 Persona 語意生成引擎
* **資料庫支援**: MySQL 8.0 (具備 Primary / Secondary 主從故障自動切換機制) + 內建即開即用記憶體資料庫 (Zero-config Fallback)
* **日誌與監控**: Morgan 結構化時間戳日誌、`/api/health` 即時健康節點、`/api/admin/logs` 審計操作日誌
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
├── Dockerfile                   # 多階段 Alpine 容器構建檔 (Vite 前端編譯 + Express 生產環境)
├── docker-compose.yml           # 一鍵容器編排與服務部署設定
├── .dockerignore                # 容器構建排除清單
├── server/                      # Node.js 後端服務
│   ├── app.js                   # Express 應用程式配置、CORS 與靜態/SPA退避路由
│   ├── server.js                # 伺服器啟動入口與優雅關機 (Graceful Shutdown)
│   ├── config/
│   │   ├── config.js            # 環境變數與伺服器埠號配置
│   │   └── dbFactory.js         # MySQL 連線池與 Primary/Secondary Failover 自動切換
│   ├── data/
│   │   └── herbsData.js         # 台灣在地特色青草與植物學深度知識庫 (25 款經典藥材)
│   ├── repositories/
│   │   └── herbRepository.js    # 存取層：模糊搜尋、風土產區、生活情境、四氣五味、分頁排序、審計日誌
│   ├── services/
│   │   ├── herbService.js       # 業務邏輯層：DTO映射、相似度關聯推薦演算法、多方比對、全庫統計
│   │   └── ragService.js        # RAG 檢索增強生成服務：四大專家 Persona 語意生成、標本 Citations 引用
│   ├── controllers/
│   │   ├── herbController.js    # 藥材 API 控制器
│   │   ├── consultController.js # RAG 專家諮詢控制器
│   │   ├── adminController.js   # 典藏後台管理與數據控制器
│   │   └── healthController.js  # 健康檢查與 Failover 演練控制器
│   ├── routes/
│   │   ├── herbRoutes.js        # /api/herbs 端點路由
│   │   ├── consultRoutes.js     # /api/consult 端點路由
│   │   ├── adminRoutes.js       # /api/admin 端點路由
│   │   ├── healthRoutes.js      # /api/health 端點路由
│   │   └── taxonomyRoutes.js    # 分類、歸經、藥性、風土、情境、部位、安全等級統計
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
│   │   │   ├── api.js           # 前端 API 請求封裝 (支援 Admin 憑證與 RAG 諮詢)
│   │   │   └── audioService.js  # Web Audio 聲景合成器 (竹音、磬聲、水滴、沸水、印章、展卷、松風)
│   │   └── components/
│   │       ├── HerbAtmosphere.vue      # 漂浮草木花粉與微光微粒 Canvas 動畫
│   │       ├── HerbNavbar.vue          # 頂端導覽、主題切換、聲音切換、Cmd+K 喚醒、諮詢與管理按鈕
│   │       ├── HerbHero.vue            # 殿堂級 Hero、24 節氣即時日曆、功能導覽藥籤
│   │       ├── HerbSidebar.vue         # 側邊風土產區、生活情境、四氣藥性、歸經多維度篩選欄
│   │       ├── TaiwanTerroirMap.vue    # 台灣本草風土產區互動探索地圖卡
│   │       ├── HerbConsultationLab.vue # 本草名醫與風土達人諮詢茶堂 (RAG 專家語意系統)
│   │       ├── HerbAdminDashboard.vue  # 典藏後台與數據中樞 (CRUD、即時標本卡預覽、審計日誌)
│   │       ├── HerbCard.vue            # 3D 傾斜圖鑑卡片 (流光層、標本號、收藏星號)
│   │       ├── HerbDetail.vue          # 展卷詳情頁 (科屬、方言俗名、活性成分、風土故事、安全等級)
│   │       ├── HerbAlchemyLab.vue      # 青草茶方劑研製所 (陰陽指針、五味圖譜、煎煮計時)
│   │       ├── HerbMeridianMap.vue     # 五行臟腑經絡氣血引導圖
│   │       ├── FavoritesCabinet.vue    # 我的本草藏書票標本室
│   │       ├── CommandPalette.vue      # Ctrl+K 快捷命令搜尋盤
│   │       ├── HerbCompareModal.vue    # 跨藥材多維橫向對照表
│   │       └── HealthModal.vue         # 系統健康狀態與線上 Failover 演練
└── tests/
    └── api.test.js              # 22 項 API 整合測試、RAG 諮詢、Admin 管理與 SPA 託管驗證
```

---

## 5. 完工檢查表 (Definition of Done - DoD)
- [x] 前端品質全面提升至 Awwwards、Webby Awards、FWA 級別。
- [x] 擴充收錄 25 款指標性台灣本土草藥（含客家抹草、大風草、關西仙草、白鶴靈芝、南投狗尾草、原民刺蔥、昭和草、花蓮山苦瓜等）。
- [x] 實作台灣本土草藥多維度檢索（風土產區、民間生活情境、入藥部位、用藥安全分級、台客語俗名模糊搜尋）。
- [x] 實作 `TaiwanTerroirMap.vue` 台灣風土產區互動探索卡。
- [x] 實作 `HerbConsultationLab.vue` 專家諮詢茶堂（萬華青草伯、客庄阿婆、生藥學博士、原民野菜獵人 4 大 Persona）。
- [x] 實作 RAG 檢索增強生成核心，精準輸出專家口吻回答與可點擊開卷之 Citations 本草標本卡。
- [x] 實作 `HerbAdminDashboard.vue` 典藏管理後台（安全密鑰登入、本草 CRUD、所見即所得之即時標本票卡預覽、專家 Persona 微調、JSON/CSV 備份與審計日誌）。
- [x] 實作 `audioService.js` 原生 Web Audio 聲學設計（含印章用印、展卷微響、竹音、清磬、沸水、松風）。
- [x] 22 項自動化測試全數通過，Vite 生產環境建置成功。
- [x] 全面更新對應文檔。