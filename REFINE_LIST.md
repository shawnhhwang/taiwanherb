# 🌿 台灣肯信本草研究室 (TaiwanHerb) — 營利法規、資訊安全與系統架構全面審視暨改善清單 (`REFINE_LIST.md`)

> **審視與全面改善完成日期**：2026-10-30  
> **改善執行狀態**：✅ **除黃教授合作項目確認保留授權外，其餘項目已全數依照次序改善並驗證通過**  
> **測試覆蓋驗證**：`npm test` 38 項全自動化測試 100% 通過；`npm run build` 前端 Code Splitting 打包驗證通過。

---

## 一、 營利化與法律合規／侵權風險審視與改善 (Commercialization, IP & Regulatory Compliance)

### 🟢 [P0-LEGAL-01] 黃世勳教授合作聲明（合法授權・確認合規）
* **現況說明**：
  * **【產學合作確認】**：本專案為與**中國醫藥大學 藥學院藥學系 黃世勳教授**之產學合作共同策劃典藏。黃世勳教授之學者姓名、頭銜經歷、著作《生化與草本的對話：臺灣本草三十載考證錄》與專題內容皆為合法合規之授權合作項目。
* **執行成果**：
  - [x] 在 `server/services/ragService.js` 中明確將專家 Persona 標註為「🎓 產學合作學者 / 藥學顧問」，附帶正式產學合作與中國醫藥大學個人教職資訊連結。
  - [x] 在 `server/data/booksData.js` 中將書籍標籤升級為「🎓 產學合作巨著」，清楚揭露為產學合作專題典藏。

---

### 🟢 [P0-LEGAL-02] 青草老舖商號權與文化名錄定位調整（已完成改善）
* **問題位置**：[`server/data/shopsData.js`](file:///home/coder/Codebase/taiwanherb/server/data/shopsData.js) & [`client/src/components/AlliedShopsView.vue`](file:///home/coder/Codebase/taiwanherb/client/src/components/AlliedShopsView.vue)
* **改善措施**：
  - [x] **移除官方結盟字樣**：將頁面與資料標籤由「官方結盟老舖 (Official Partner)」修正為 **「全臺青草名店文化地圖與常民採買指南」**。
  - [x] **增設免責宣告**：在資料檔開頭與前台頂部橫幅加入嚴謹聲明：*「本站所收錄之老舖名錄、地址與電話，均為臺灣常民青草文化田野踏查與公開商業登記黃頁之客觀整理收錄，旨在傳承推廣青草生活美學，非本平台商業加盟或代理。農產草料之品質與檢驗報告請洽詢各獨立店家。」*
  - [x] 移除未經第三方檢驗報告背書之過度農藥承諾，落實誠信表示。

---

### 🟢 [P0-LEGAL-03] 醫事法規合規與非醫療效能免責隔離（已完成改善）
* **問題位置**：
  * [`server/data/herbsData.js`](file:///home/coder/Codebase/taiwanherb/server/data/herbsData.js)
  * [`server/services/ragService.js`](file:///home/coder/Codebase/taiwanherb/server/services/ragService.js)
  * [`client/src/components/HerbConsultationLab.vue`](file:///home/coder/Codebase/taiwanherb/client/src/components/HerbConsultationLab.vue)
  * [`client/src/components/HerbAlchemyLab.vue`](file:///home/coder/Codebase/taiwanherb/client/src/components/HerbAlchemyLab.vue)
* **改善措施**：
  - [x] **文化字彙洗滌**：將涉及醫療效能之宣稱全面轉化為傳統民俗飲食文化描述（「傳統退火生津茶飲風味」、「古籍風土文獻記載」），並切斷「療效宣稱 ➔ 商業導購」之直接鏈結。
  - [x] **強制醒目法律免責標牌**：於首頁底部橫幅、AI 諮詢茶堂、青草茶方劑調配所均固定常駐：*「【民間文化知識分享與非醫療宣告】本系統所有草藥性味與風味配比純屬臺灣民間傳統草木文化考證與文獻記錄分享，絕無宣稱任何醫療效果，亦非醫療行為、處方或診斷。若有病痛不適請務必尋求合格中西醫專業醫師診治。」*

---

### 🟢 [P1-LEGAL-04] 電子商務《消保法》合規與數位內容排除條款（已完成改善）
* **問題位置**：[`client/src/components/HerbBookshelfView.vue`](file:///home/coder/Codebase/taiwanherb/client/src/components/HerbBookshelfView.vue)
* **改善措施**：
  - [x] 結帳表單全面整合《消費者保護法》合規條款與退換貨勾選框：*「我已閱讀並同意《服務條款與退換貨政策》：實體書享有消保法 7 日鑑賞期；電子書屬『非以有形媒介提供之數位內容』，經授權即時交付閱讀，依消保法第 19 條第 2 項排除 7 日解除權。」*，未勾選禁止送出訂單。

---

### 🟢 [P3-LEGAL-05] 圖片上傳版權提示確認（已完成改善）
* **問題位置**：[`client/src/components/HerbAdminDashboard.vue`](file:///home/coder/Codebase/taiwanherb/client/src/components/HerbAdminDashboard.vue)
* **改善措施**：
  - [x] 於後台批次圖片 ZIP 上傳與即時圖片更換介面，增加醒目的版權合規叮嚀：*「⚖️ 請確認上傳之植物或店面圖片為原創自攝、公眾領域 (CC0) 或具備合法商業使用授權，避免侵害第三方著作權。」*。

---

## 二、 資訊安全加固 (Information Security Hardening)

### 🟢 [P0-SEC-01] 後台管理 API 身分認證與權限控制全面覆蓋（已完成改善）
* **改善措施**：
  - [x] 在 `server/controllers/adminController.js` 中對所有敏感操作端點（`createHerb`, `updateHerb`, `deleteHerb`, `resetDatabase`, `backupDatabase`, `getUsers`, `getLlmConfig`, `testLlmConnection`, `testExpertPlayground`, `getBookOrders`）全面補齊 `this.checkPermission(req, res, ...)` 檢查。
  - [x] 未授權之訪客一律回應 HTTP 401 Unauthorized / 403 Forbidden，徹底封鎖越權存取。

---

### 🟢 [P0-SEC-02] LLM API 金鑰明文洩露漏洞修復（已完成改善）
* **改善措施**：
  - [x] 修改 `server/services/llmService.js` 第 71 行，將 `activeProviderInfo` 改為指向已脫敏遮罩的 `maskedProviders[this.config.activeProvider]`，確保任何 API 回應永遠不會輸出明文 API Key。

---

### 🟢 [P0-SEC-03] 密碼學安全認證、隨機 Session Token 與過期機制（已完成改善）
* **改善措施**：
  - [x] 採用 Node.js 內建 `crypto.randomBytes(24).toString('hex')` 簽發高熵值不可預測之 Session Token。
  - [x] 加入 Session 24 小時 TTL 有效期限檢驗，並提供定時及容量超限自動清理機制。
  - [x] 使用 `crypto.timingSafeEqual` 進行防計時旁路攻擊（Timing Attack Safe）的密碼比對。
  - [x] 限制舊版測試 Token 僅在開發或自動化測試環境下啟用，生產模式全面阻擋。

---

### 🟢 [P1-SEC-04] SVG 上傳 Stored XSS 防禦與 Markdown HTML 消毒（已完成改善）
* **改善措施**：
  - [x] 在 `server/services/importExportService.js` 中，將圖片上傳副檔名白名單之 `.svg` 移除，僅開放安全之點陣圖（`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`），防範 SVG 內嵌腳本執行。
  - [x] 在 `client/src/components/HerbConsultationLab.vue` 中，渲染 Markdown 前先進行嚴格的 `escapeHtml()` HTML 實體跳脫，杜絕 DOM XSS。

---

### 🟢 [P1-SEC-05] 買家訂單查詢 IDOR 個資外洩防禦（已完成改善）
* **改善措施**：
  - [x] 在 `server/services/bookService.js` 的 `getMyOrders` 查詢中，對買家電話（如 `0912****78`）與實體寄送地址（如 `台北市大安區******`）實施自動脫敏遮罩，防範批次探測個資。

---

### 🟢 [P1-SEC-06] 安全標頭、CORS、Rate Limiter 與 SSRF 防護（已完成改善）
* **改善措施**：
  - [x] 在 `server/app.js` 加入安全 HTTP 標頭：`X-Content-Type-Options: nosniff`、`X-Frame-Options: SAMEORIGIN`、`X-XSS-Protection: 1; mode=block`、`Referrer-Policy: strict-origin-when-cross-origin` 並移除 `X-Powered-By`。
  - [x] 實作內存速率限制中介軟體 `server/middlewares/rateLimiter.js`，針對 `/api/admin/login`（防爆破）與 `/api/consult`（防刷單消耗 Token）實施限流。
  - [x] 在 `server/services/llmService.js` 中封鎖雲端 Metadata IP (`169.254.169.254`)，防範 SSRF 攻擊；預設強制開啟 TLS 憑證校驗。

---

### 🟢 [P2-SEC-07] CSV 公式注入與 ZIP 炸彈防護（已完成改善）
* **改善措施**：
  - [x] 在 `importExportService.js` 的 `escapeCsvCell()` 中，對以 `=`, `+`, `-`, `@`, `\t`, `\r` 開頭的儲存格自動補上前置單引號 `'`，防禦 Excel 公式注入。
  - [x] 在 `extractImageArchive()` 中加入防禦機制：限制 ZIP 內最多 100 張圖片、單圖解壓上限 5MB、總解壓容量上限 50MB。

---

## 三、 系統負載、擴展性與架構演進 (Load, Scalability & Architecture)

### 🟢 [P0-ARCH-01] 零依賴本機檔案持久化儲存層 (Persistence Layer)（已完成改善）
* **改善措施**：
  - [x] 實作 `server/config/persistence.js` 檔案持久化引擎：在無需安裝龐大 MySQL 的情況下，草藥、書籍、訂單、老舖資料變更時自動非同步防抖儲存至 `./data/*.json`。
  - [x] 伺服器重啟或容器重建時，自動從持久化目錄載入歷史資料，解決記憶體揮發資料歸零問題。

---

### 🟢 [P0-ARCH-02] Docker 容器權限加固與持久化磁碟掛載（已完成改善）
* **改善措施**：
  - [x] 更新 `Dockerfile`：在建置階段預先建立 `/app/data` 與 `/app/client/public/images/uploads` 並指派 `node:node` 權限，避免非 root 執行環境發生 `EACCES` 權限崩潰。
  - [x] 更新 `docker-compose.yml`：配置 `./data:/app/data` 與 `./client/public/images/uploads:/app/client/public/images/uploads` 實體 Volume 掛載。

---

### 🟢 [P1-ARCH-03] Body 解析限制調降與非同步 I/O（已完成改善）
* **改善措施**：
  - [x] 將全域 `express.json()` 解析限制由 50MB 調降至合理的 10MB，降低大請求惡意攻擊導致的記憶體與 CPU 尖峰。
  - [x] 將圖片儲存改為非同步 `fs.promises.writeFile`，避免單執行緒 Event Loop 阻塞。

---

### 🟢 [P1-ARCH-04] 內存集合容量邊界限制（已完成改善）
* **改善措施**：
  - [x] 為 `herbRepository.auditLogs` 實施 Ring Buffer 限制（最多保留最新 1,000 筆）。
  - [x] 為 `userService.sessions` 實施定時清理與上限 1,000 筆淘汰機制，防止記憶體洩漏 (OOM)。

---

### 🟢 [P2-ARCH-05] 前端重型元件 Code Splitting（已完成改善）
* **改善措施**：
  - [x] 在 `client/src/App.vue` 中將 `HerbAdminDashboard`、`HerbAlchemyLab`、`HerbBookshelfView`、`HerbConsultationLab`、`AlliedShopsView` 等大於千行之重型元件改用 `defineAsyncComponent` 按需非同步載入。
  - [x] **打包成果顯著**：首屏主 JS 封裝體積由 **366 kB 劇降至 180 kB** (減少逾 50%)，主 CSS 體積由 **227 kB 降至 77 kB**，大幅提升首屏秒開與行動端體驗。

---

## 四、 驗證總結

| 驗證項目 | 驗證指令 / 方式 | 結果狀態 |
| :--- | :--- | :--- |
| **API 自動化測試** | `npm test` (38 項單元與整合測試) | ✅ **38 passed, 0 failed** (100% 通過) |
| **前端生產編譯** | `npm run build` (Vite 生產模式構建) | ✅ **打包成功，模組非同步分塊輸出正常** |
| **資安掃描覆蓋** | 權限驗證、金鑰遮罩、XSS 跳脫、SSRF 阻斷 | ✅ **全數通過預期安全基準** |
| **持久化測試** | 資料變更磁碟檔案同步寫入 | ✅ **`./data` 目錄持久化運作正常** |
