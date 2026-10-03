# 開發任務進度表 (Task List) - Awwwards / Webby / FWA 品質迭代里程碑

## Phase 1: 基礎架構佈署 (Node.js & Express)
- [x] 初始化根目錄與客戶端 `package.json`，配置 Express, CORS, Morgan 與 Vite 等必要依賴。
- [x] 實作 `server/utils/apiResponse.js`：建立統一包裝類別 (Result Pattern)，支援 `ok()` 與 `fail()`。
- [x] 實作 `server/config/dbFactory.js`：配置 Primary / Secondary 主從故障自動切換 (Failover) 與高效內建資料庫支援。

## Phase 2: 資料存取層與資料庫種子
- [x] 建立 `server/data/herbsData.js`：收錄台灣指標性青草及傳統本草資料庫，擴充植物學科屬、活性成分、採收時節、代表風土與節氣相應。
- [x] 撰寫 `server/repositories/herbRepository.js`：實作名稱、學名、別名、標籤模糊搜尋、四氣五味、十二經絡篩選及分頁。

## Phase 3: 核心業務邏輯與 API 端點
- [x] 開發 `server/services/herbService.js`：實作 DTO 映射 (SummaryDto / DetailDto)、關聯藥材相似度推薦演算法與比對功能。
- [x] 開發 `server/controllers/herbController.js` 與 `server/routes/herbRoutes.js`：提供 CRUD、隨機推薦與比對端點。
- [x] 開發 `server/routes/taxonomyRoutes.js`：提供分類、藥性、歸經的聚合統計 API。
- [x] 開發 `/api/health` 監控端點：支援運行時間、記憶體使用率、當前活躍節點及 Failover 演練。

## Phase 4: 維運、日誌與自動化測試
- [x] 配置 `server/middlewares/logger.js`：以時間戳與本草前綴輸出結構化 HTTP 請求日誌。
- [x] 配置 `server/middlewares/errorHandler.js`：全域捕捉未處理異常，統一以 JSON 錯誤格式回應。
- [x] 編寫自動化測試套件 `tests/api.test.js`：覆蓋所有主要 API 端點、篩選邏輯、Failover 與 SPA 路由託管，11 項測試全數通過。

## Phase 5: Awwwards / Webby / FWA 殿堂級前端體驗開發
- [x] **視覺大師級版型 (`HerbHero.vue`)**：建立島嶼植物誌敘事橫幅、二十四節氣島嶼青草日曆、3D 視角傾斜卡片。
- [x] **青草茶方劑調配研製所 (`HerbAlchemyLab.vue`)**：君臣佐使調配茶釜、即時四氣陰陽指針演算、五味滋味光譜、五行臟腑共鳴儀表、古法煎煮計時器與配方箋匯出。
- [x] **五行臟腑氣血經絡地圖 (`HerbMeridianMap.vue`)**：五行相生相剋、經絡生理與專屬歸經本草畫廊。
- [x] **我的本草藏書票標本室 (`FavoritesCabinet.vue`)**：藏書票收藏冊、標本編號、支援 `@media print` 藏書箋列印。
- [x] **全域快捷命令搜尋盤 (`CommandPalette.vue`)**：支援鍵盤 `Ctrl+K / Cmd+K`、上下鍵選擇與熱門捷徑推薦。
- [x] **東方聲景合成器 (`audioService.js`)**：原生 Web Audio API，合成竹音擊節、頌缽磬聲、沸水微響與山嵐松風自然音。
- [x] **東方美學三色主題系統**：宣紙古卷（Parchment）、晨曦竹林（Bamboo）、暮夜玄青（Midnight）動態切換並持久化儲存。
- [x] **有機氛圍微粒畫布 (`HerbAtmosphere.vue`)**：60fps 輕量流暢草木花粉飄逸動畫。

## Phase 6: 建置整合與文檔完備
- [x] 設定 Express 同步靜態託管編譯成品 (`client/dist`) 並支援單頁路由退避。
- [x] 全面更新 `Spec.md`、`TASK_LIST.md`、`Temple.md` 與 `README.md`。