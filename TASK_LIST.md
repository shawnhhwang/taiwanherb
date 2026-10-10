# 開發任務進度表 (Task List) - Awwwards / Webby / FWA 品質迭代里程碑

## Phase 1: 基礎架構佈署 (Node.js & Express)
- [x] 初始化根目錄與客戶端 `package.json`，配置 Express, CORS, Morgan 與 Vite 等必要依賴。
- [x] 實作 `server/utils/apiResponse.js`：建立統一包裝類別 (Result Pattern)，支援 `ok()` 與 `fail()`。
- [x] 實作 `server/config/dbFactory.js`：配置 Primary / Secondary 主從故障自動切換 (Failover) 與高效內建資料庫支援。

## Phase 2: 資料存取層與本土草藥知識庫擴充
- [x] 擴充 `server/data/herbsData.js`：收錄 25 款指標性台灣本土草藥（新增客家抹草、大風草、關西仙草、白鶴靈芝、南投狗尾草、原民刺蔥、昭和草、花蓮山苦瓜、香茅）。
- [x] 擴充台灣風土欄位：風土產區（`region`）、民間生活情境（`folkApplication`）、入藥部位（`partsUsed`）、安全用藥等級（`safetyLevel`）、台灣本地方言俗名（`dialectNames`）。
- [x] 升級 `server/repositories/herbRepository.js`：實作名稱、台客語俗名、學名模糊搜尋、風土產區、情境應用、四氣五味、十二經絡篩選、分頁排序與系統操作審計日誌。

## Phase 3: RAG 語意檢索諮詢與後台管理端點
- [x] 實作 `server/services/ragService.js`：建置 4 大專家 Persona（萬華老茶師、客庄阿婆、生藥學博士、原民野菜獵人），打造概念加權 RAG 語意檢索與 Citations 標本卡生成。
- [x] 實作 `server/controllers/consultController.js` 與 `server/routes/consultRoutes.js`：提供 `/api/consult` 與 `/api/consult/experts` 端點。
- [x] 實作 `server/controllers/adminController.js` 與 `server/routes/adminRoutes.js`：提供後台登入認證、本草 CRUD、全庫統計儀表板、全庫 JSON/CSV 備份與審計日誌。
- [x] 擴充 `server/routes/taxonomyRoutes.js`：支援 `/api/regions`、`/api/folk-applications`、`/api/parts-used`、`/api/safety-levels` 統計端點。

## Phase 4: 維運、日誌與自動化測試
- [x] 編寫自動化測試套件 `tests/api.test.js`：覆蓋本草清單、台客語俗名檢索、風土產區篩選、RAG 專家諮詢問答、管理者登入與 CRUD、全庫統計與 SPA 託管，22 項測試全數通過。

## Phase 5: Awwwards / Webby / FWA 殿堂級前端體驗開發
- [x] **台灣本草風土產區探索 (`TaiwanTerroirMap.vue`)**：直觀探索全島、北部青草巷、桃竹苗客庄、中部台地、南部艷陽半島與花東原鄉。
- [x] **本草名醫與風土達人諮詢茶堂 (`HerbConsultationLab.vue`)**：4 大專家切換、即時提問、生活情境預設推薦、RAG 專家語意 Markdown 回答、可點擊開卷之 Citations 本草標本卡、追問建議。
- [x] **典藏後台與數據中樞 (`HerbAdminDashboard.vue`)**：安全密碼登入、全庫指標卡、本草 CRUD 表格、所見即所得之即時標本票卡預覽 (Live Specimen Plate Preview)、專家語意微調、JSON/CSV 備份匯出與審計日誌。
- [x] **側邊多維度檢索欄升級 (`HerbSidebar.vue`)**：加入風土產區、民間情境、四氣藥性、經絡與安全等級多維篩選。
- [x] **展卷詳情頁升級 (`HerbDetail.vue`)**：呈現方言俗名標籤、風土產區、生活情境、安全等級。
- [x] **全域快捷搜尋升級 (`CommandPalette.vue`)**：支援台語客語俗名、風土產區即時搜尋。
- [x] **東方聲景合成器升級 (`audioService.js`)**：加入朱砂印章用印聲 (`playStamp`) 與展卷微響 (`playScroll`)。
- [x] **東方美學三色主題系統**：宣紙古卷（Parchment）、晨曦竹林（Bamboo）、暮夜玄青（Midnight）深度自適應。

## Phase 6: 建置整合、Docker 容器化與交付驗證
- [x] Express 靜態託管編譯成品 (`client/dist`) 並通過所有回歸驗證。
- [x] 建立生產級多階段 `Dockerfile` (Alpine 輕量化、非 root 安全使用者、健康檢查探針)、`.dockerignore` 與一鍵編排 `docker-compose.yml`。
- [x] 撰寫詳盡 Docker 容器化打包、構建、運行、環境變數與 Nginx 反向代理說明於 `README.md`。
- [x] 全面更新 `Spec.md`、`TASK_LIST.md`、`Temple.md` 與 `README.md`。