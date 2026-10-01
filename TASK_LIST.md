# 開發任務進度表 (Task List)

## Phase 1: 基礎架構佈署 (Node.js & Express)
- [x] 初始化根目錄與客戶端 `package.json`，配置 Express, CORS, Morgan 與 Vite 等必要依賴。
- [x] 實作 `server/utils/apiResponse.js`：建立統一包裝類別 (Result Pattern)，支援 `ok()` 與 `fail()`。
- [x] 實作 `server/config/dbFactory.js`：配置 Primary / Secondary 主從故障自動切換 (Failover) 與高效內建資料庫支援。

## Phase 2: 資料存取層與資料庫種子
- [x] 建立 `server/data/herbsData.js`：收錄台灣指標性青草（大花咸豐草、魚腥草、艾草、雷公根、左手香等）及傳統本草資料庫。
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

## Phase 5: 前端 Vue.js 3 圖鑑系統開發
- [x] 建立現代東方本草植物圖鑑 UI 樣式系統 (`client/src/assets/style.css`)，導入宣紙米白底、本草深綠色調與徽章視覺。
- [x] 撰寫 `client/src/services/api.js`：封裝 Fetch API 串接與錯誤退避。
- [x] 實作 `HerbNavbar.vue`：支援即時搜尋防抖 (Debounce)、品牌印章標誌、隨機推薦按鈕與健康狀態徽章。
- [x] 實作 `HerbSidebar.vue`：提供分類、四氣藥性、十二經絡的多維度即時篩選與重設。
- [x] 實作 `HerbCard.vue`：呈現藥材高清植物照、學名、藥性徽章、歸經標籤與摘要。
- [x] 實作 `HerbDetail.vue`：典雅展卷式詳情頁，整合台灣民間智慧、茶飲配方、使用禁忌警語與關聯推薦。
- [x] 實作 `HerbCompareModal.vue`：跨藥材多維橫向對照表。
- [x] 實作 `HealthModal.vue`：即時檢視系統健康數據與一鍵觸發 Failover 節點切換演練。
- [x] 實作 `App.vue`：整合全域響應式狀態與 URL Hash 路由 (`#/herb/:id`)。

## Phase 6: 建置整合與文檔完備
- [x] 設定 Express 同步靜態託管編譯成品 (`client/dist`) 並支援單頁路由退避。
- [x] 移除舊有未完成之 C# .NET 檔案。
- [x] 全面更新 `Spec.md`、`TASK_LIST.md`、`Temple.md`。
- [x] 撰寫詳盡且步驟清晰的繁體中文 `README.md`。