# 🌿 台灣本草植物 Wiki 資料庫系統 (Taiwan Herb Wiki)

> **國際數位設計獎項標竿 (Awwwards Site of the Day / Webby Awards / FWA 級別設計)**
> 融合「四百年島嶼青草風土」、「客家與原住民野草文化」、「RAG 專家語意諮詢茶堂」、「典藏後台 CMS」與「草木茶飲風味研製」。
> 全端架構基於 **Node.js (Express)** 與 **Vue.js 3**，具備原生 Web Audio 聲學合成與 3D 微互動。

> ⚠️ **【重要聲明 · 民間傳統知識分享與醫療法規合規宣告】**  
> 本系統（臺灣本草植物誌）所收錄之植物性味、文獻記載、常民智慧與專家 RAG 諮詢內容，**純屬臺灣本土傳統草木文化考證與生活經驗分享，絕不具任何醫療效果宣稱，亦非臨床診斷、處方或治療**。有任何健康或疾病問題，請務必諮詢合格之中西醫專業醫療機構。

---

## 🏆 設計亮點與國際獎項級特色 (Award-Winning Highlights)

### 1. 台灣本土草藥多維度檢索與風土探索 (`TaiwanTerroirMap`)
* **全島六大風土產區分佈**：直觀篩選北部青草巷、桃竹苗客庄丘陵、中彰投台地、嘉南平原古都、六堆高屏半島與花東原鄉山林。
* **民間生活情境應用維度**：涵蓋萬華退火青草茶、客家辟邪抹草沐浴、坐月子大風草驅風擦澡、狗尾草開脾燉雞、原民野菜野炊等日常情境。
* **方言俗名與全維檢索**：支援台語俗名（如「恰芒草」、「狗貼耳」、「到手香」）、客語名、原住民語名（泰雅/阿美 Tana）、學名、科屬與活性成分模糊檢索。
* **安全指引分級**：溫和常飲、體虛胃寒慎用、孕婦慎用/忌用、大苦大寒遵醫囑。

### 2. 本草耆老與風土達人諮詢茶堂 (`HerbConsultationLab` · RAG 語意系統)
* **四大在地專家 Persona 切換**：
  * 🍵 **萬華老茶師 林萬吉**：百年西昌街青草巷老茶師口吻，強調退火退癀、文火慢熬與保護胃底氣。
  * 👵 **客庄草藥阿婆 彭秀妹**：慈祥溫厚客家長輩，注重抹草辟邪、大風草月子散寒與家常食療。
  * 🎓 **生藥學博士 黃世勳 教授**：中國醫藥大學 藥學院藥學系教授（產學合作共同策劃典藏），結合三十載全臺山川踏查考證與現代生藥機轉。
  * 🏹 **山林野菜獵人 督邁 (Dumay)**：豪邁質樸的原住民獵人智慧，傳授刺蔥野炊與山林永續採集倫理。
* **RAG 檢索增強生成**：根據提問語意從資料庫中檢索關聯度最高的本土草藥，並以專家的獨特口吻進行深度解方回答。
* **Citations 本草標本引證卡廊**：回答中自動列出引用的草藥標本卡，點擊直接開卷查閱詳情。
* **追問建議與生活情境預設**：提供風土情境推薦提問，一鍵帶入對話。

### 3. 典藏後台與數據中樞 (`HerbAdminDashboard` · Curator Mode)
* **前後台使用者管理與角色權限 (RBAC)**：
  * 👑 **至高管理員 (`super_admin`)**：全庫最高管理權限，包含使用者帳號指派、LLM API 金鑰管理、全庫重置。
  * 📜 **本草策展師 (`curator`)**：負責本草典藏資料庫之維護、資料批次匯入/線上工作台編輯、多格式匯出以及專題文章生成。
  * 🍵 **本草諮詢顧問 (`consultant`)**：負責專家 Persona 語意微調、RAG 提示詞設定、諮詢沙盒測試與專題文章審閱。
  * 🔍 **典藏觀察員 (`auditor`)**：唯讀檢視權限，可查閱審計日誌、統計分析報表與本草全庫，無資料修改與配置權限。
  * 🌱 **草木學員 (`member`)**：前台一般會員，專注於圖鑑檢索、茶堂諮詢與方劑研製。
* **LLM 提供商與 API 來源管理**：
  * 支援 **系統內建離線本草知識引擎 (Zero-config)**、**Google Gemini**、**OpenAI / 相容架構 (DeepSeek / Ollama)** 與 **Anthropic Claude**。
  * 實施 **API 金鑰安全脫敏遮罩** (`sk-••••••••abcd`) 與即時連線 **Ping 測試**，顯示毫秒級延遲與診斷回饋。
* **專家 RAG 管理與測試沙盒 (Interactive Playground)**：
  * 集中管理 4 大特色名師 Persona，並支援後台動態**建立自訂本草專家**。
  * 可調校名稱、頭銜、印章、風土區域、問候語、口頭禪、系統提示詞 (System Prompt) 與 Top-K 檢索參數。
  * 內建**即時測試沙盒 (Playground)**，輸入提問即時檢視召回的 Citations 標本卡與專家語意回答。
* **本草資料批次匯入與線上編輯工作台**：
  * 提供一鍵載入 5 味經典野生草藥標準示範資料 (冇骨消、假酸漿、金錢薄荷、台灣天仙果、雷公根)。
  * 提供標準 JSON 與 CSV 範例檔下載。
  * 支援檔案上傳與文字貼入解析，進入**線上表格編輯工作台**，欄位缺漏即時校驗，支援線上修改、增刪行，確認無誤後一鍵批次入庫。
* **條件篩選多格式資料匯出**：
  * 可依風土產區、本草分類、發布狀態及關鍵字條件即時過濾。
  * 支援匯出 **結構化 JSON 備份檔**、**CSV 試算表 (含 UTF-8 BOM，Excel 雙擊不亂碼)** 以及自動編譯之 **精美 Markdown 本草植物誌標本手冊**。
* **本草專題文章生成實驗室 (Herbal Narrative & Article Studio)**：
  * **真實資料庫 Grounding**：自資料庫挑選 1~3 味草藥，自動讀取性味、活性成分與風土考據。
  * **名師語調融合**：可套用萬華老茶師、客庄阿婆、生藥學博士、原民野菜達人或自訂專家口吻。
  * **指定目標受眾 (Target Audiences)**：一般大眾、國小學童親子、久坐熬夜上班族、銀髮樂齡長輩、生藥學者、戶外登山露營者。
  * **多樣文章體裁**：風土傳奇故事、居家調養指南、植物生藥誌專文、四季藥膳野炊手記。
  * 支援一鍵複製與下載 Markdown 專題文章。
* **本草數據管理 (CRUD) 與審計日誌**：
  * 完整本草列表檢索過濾，支援即時古典標本票卡預覽 (Live Specimen Plate Preview)。
  * 系統自動留存每一次新增、編輯、刪除、匯入之審計操作歷程。

### 4. 現代東方本草植物圖鑑美學 (Modern Oriental Herbarium UI)
* **三大動態美學主題**：
  * 📜 **宣紙古卷 (Parchment - Default)**：溫潤暖黃宣紙質地、竹林深綠主調與硃砂紅印。
  * 🎋 **晨曦竹林 (Bamboo)**：蒼翠淡雅冷綠、山間晨露透亮風貌。
  * 🌌 **暮夜玄青 (Midnight)**：深黛玄青暗色系、螢光翡翠綠，沉浸式夜間博物館觀感。
* **有機動態微粒畫布 (`HerbAtmosphere`)**：60fps 輕量 Canvas 渲染島嶼草木花粉與微光飄逸。

### 5. 青草茶方劑調配研製所 (`HerbAlchemyLab`)
* **茶釜調配互動槽**：遵循中醫「君、臣、佐、使」法度，自由投入 1 至 4 味草藥。
* **四氣陰陽動態指針儀表**：實時計算寒涼值與溫熱值，自動給予處方辨性與體質叮嚀。
* **五味滋味預測光譜**：即時預測苦、甘、辛、涼四維風味比例。
* **五行臟腑受納共鳴**：實時顯示金、木、水、火、土受納經絡。
* **古法三階煎煮計時器**：內建「武火急沸 ➔ 文火慢熬 ➔ 關火悶香」熬茶倒數與音效警報。

### 6. 原生東方聲學設計 (`audioService.js`)
* 無需加載任何外部 mp3 音檔，採用瀏覽器原生 **Web Audio API** 演算法合成：
  * 🔴 **朱砂印章用印**（後台儲存、新增成功之沉著印泥低頻）
  * 📜 **展卷微響**（標本詳情開卷之細膩翻展聲）
  * 🎋 **竹音擊節**（點擊、切換選項之清脆竹節反饋）
  * 🔔 **頌缽清磬**（卡片開卷、典藏之 528Hz 五度和弦共鳴）
  * 💧 **水滴入茶**（草藥投入茶釜、諮詢送出時的水滴音）
  * 🔥 **沸水微響**（煎煮計時時的氣泡聲景）
  * 🍃 **山嵐松風**（可常駐開啟的自然白噪音背景音）

---

## 🛠️ 技術棧 (Tech Stack)

| 領域 | 核心技術 | 說明 |
| :--- | :--- | :--- |
| **後端核心** | **Node.js 20 LTS + Express.js** | 分層架構（Controller - Service - Repository）、Result Pattern 統一回應 |
| **智慧生成** | **RAG 檢索增強生成 + Persona Synthesis** | 概念加權語意檢索、四大專家口吻回覆與 Citations 標本卡引用 |
| **管理後台** | **典藏中樞 CMS + 審計日誌** | 密鑰認證、本草 CRUD、所見即所得標本票卡預覽、JSON/CSV 備份 |
| **前端框架** | **Vue.js 3 + Vite 5** | Composition API (`<script setup>`)、高流暢度響應式狀態管理 |
| **資料庫支援** | **MySQL 8.0 / 內建記憶體資料庫** | 支援主備援 (Primary/Secondary) 自動故障轉移 (Failover)，開箱即用免裝資料庫 |
| **聲學合成** | **原生 Web Audio API** | 演算法生成無延遲聲景，支援一鍵靜音與山嵐白噪音切換 |
| **資料持久化** | **Persistence Engine (零依賴檔案持久化)** | 自動同步儲存於 `./data/*.json`，容器重啟資料不遺失 |
| **安全防護** | **RBAC + Rate Limiting + Helmet** | 密碼學安全 Session Token、防爆破限流、XSS 與 SSRF 防護 |
| **自動化測試** | **Node.js 原生測試執行器 (`node:test`)** | 零第三方測試依賴，秒級完成 38 項全自動化整合測試 |

---

## 🛡️ 企業級資安與系統架構加固 (Security & Reliability)

本系統已通過全面之安全審計與架構加固，落實生產級防護：

1. **後台 RBAC 權限全域守衛**：所有敏感管理端點（草藥與書籍增刪改、訂單審查、全庫資料庫下載備份、系統重置）均配置權限檢查，嚴防未授權存取。
2. **高熵值安全 Token 與 Session 過期**：使用 `crypto.randomBytes(24)` 簽發不可預測 Token，並配置 24 小時有效期限與過期自動清理。
3. **安全 HTTP 標頭與限流防護**：
   * 內建防爆破與防惡意刷單之速率限制器 (`Rate Limiter`)。
   * 配置 `X-Content-Type-Options: nosniff`、`X-Frame-Options: SAMEORIGIN`、`Referrer-Policy` 等安全標頭。
4. **XSS / SSRF / 公式注入防禦**：
   * 使用者圖片上傳白名單移除 `.svg`，防範 SVG 惡意腳本。
   * 前端 Markdown 渲染嚴格實施 HTML 實體跳脫消毒。
   * CSV 匯出自動轉義 `=, +, -, @` 儲存格防範 Excel 公式注入。
   * 封鎖雲端 Metadata IP (`169.254.169.254`) 防禦 SSRF。
5. **高效非同步檔案持久化**：
   * 內建檔案持久化引擎 (`server/config/persistence.js`)，自動將草藥、書籍、訂單與店家資料同步至 `./data/*.json`，容器重新啟動或更新部署時資料完整還原。
6. **前端重型元件 Code Splitting**：
   * 使用 `defineAsyncComponent` 實現非同步按需分塊載入，首屏主 JavaScript 封裝體積由 366 kB 劇降至 180 kB（縮減逾 50%）。

---

## 🚀 本地開發快速啟動

### 1. 安裝依賴
```bash
npm install
npm --prefix client install
```

### 2. 執行自動化測試
```bash
npm test
```
*執行 38 項完整測試，包含風土檢索、方言搜尋、RAG 諮詢、RBAC 權限隔離、LLM Ping、沙盒測試、資料匯入與線上編輯、條件匯出、專題文章生成與 SPA 託管。*

### 3. 編譯前端成品
```bash
npm run build
```

### 4. 啟動生產伺服器
```bash
npm start
```
預設監聽於 `http://localhost:9390`。

---

## 🐳 Docker 容器化打包與部屬方式說明 (Docker Packaging Guide)

本專案提供符合業界生產標準的 **多階段構建 (Multi-stage Build)** Docker 映像檔配置，完美結合 Vite 前端編譯與 Express 後端服務，並落實資安最佳實踐（非 root 使用者運行、最小化 Alpine 基礎映像檔、內建健康檢查探針）。

### 1. Docker 架構設計與優勢
* **多階段分離構建 (Multi-stage Build)**：
  * **Stage 1 (Builder)**：採用 `node:20-alpine` 環境安裝客戶端依賴並透過 Vite 進行生產打包，產出最精簡之前端靜態檔案（`client/dist`）。
  * **Stage 2 (Runner)**：僅安裝 Express 生產依賴 (`--omit=dev`)，不留存打包工具與編譯快取，使最終映像檔縮小至約 **150MB**。
* **資安加固 (Security Hardening)**：以內建的非 root 使用者 `node:node` 運行容器處理程序，杜絕權限過大風險。
* **健康檢查機制 (Healthcheck)**：容器內建 `curl` 定期探測 `/api/health` 端點，支援 Kubernetes、Docker Swarm 或雲端服務自動故障重啟。

---

### 2. 方式一：使用 Docker CLI 進行單一容器打包與執行

#### Step 1: 打包 Docker 映像檔
在專案根目錄下執行以下指令進行鏡像構建：
```bash
# 構建 Docker 映像檔並標記為 taiwanherb:latest
docker build -t taiwanherb:latest .
```

#### Step 2: 運行 Docker 容器
```bash
# 啟動容器，將容器 9390 埠對應至主機 9390 埠
docker run -d \
  --name taiwanherb-app \
  -p 9390:9390 \
  -e PORT=9390 \
  -e NODE_ENV=production \
  -e DB_FALLBACK_MEMORY=true \
  -e ADMIN_PASSWORD=taiwanherb2026 \
  --restart unless-stopped \
  taiwanherb:latest
```

#### Step 3: 驗證容器運行狀態
```bash
# 檢視運行中的容器與健康狀態 (healthy)
docker ps -f name=taiwanherb-app

# 檢視即時應用程式日誌
docker logs -f taiwanherb-app
```
瀏覽器造訪 `http://localhost:9390` 即可立即進入系統。

---

### 3. 方式二：使用 Docker Compose 一鍵編排與部署 (推薦)

專案根目錄已內建 [docker-compose.yml](file:///home/coder/Codebase/taiwanherb/docker-compose.yml)，支援最簡便的一鍵啟動與維運管理。

#### Step 1: 一鍵構建並啟動服務
```bash
docker compose up -d --build
```

#### Step 2: 常用 Docker Compose 管理指令
```bash
# 檢視服務狀態與健康度
docker compose ps

# 檢視服務即時日誌輸出
docker compose logs -f

# 重新啟動服務
docker compose restart

# 停止並移除服務容器
docker compose down
```

---

### 4. 環境變數配置說明 (Environment Variables)

於 `docker run` 或 `docker-compose.yml` 中的 `environment` 區段可自由調整以下設定：

| 環境變數名稱 | 預設值 | 說明 |
| :--- | :--- | :--- |
| `PORT` | `9390` | Express 後端伺服器監聽埠號 (預設為 9390) |
| `NODE_ENV` | `development` | Node.js 執行模式 (`production` / `development`) |
| `DEMO_MODE` | `false` | **DEMO 展示模式開關** (`true`: 開啟各測試帳號一鍵切換與快捷鈕 / `false`: 關閉快捷鈕，強制帳密登入) |
| `DB_FALLBACK_MEMORY` | `true` | 是否啟用內建零依賴的高可靠度記憶體資料庫 (若為 `true` 則無需任何外部 MySQL 即開即用) |
| `ADMIN_PASSWORD` | `taiwanherb2026` | 典藏後台管理者預設登入密碼 |
| `USE_MYSQL` | `false` | 若需串接實體 MySQL 主從叢集，設為 `true` |
| `DB_PRIMARY_HOST` | `127.0.0.1` | 主要 MySQL 資料庫主機位置 (選用) |
| `DB_SECONDARY_HOST` | `127.0.0.1` | 備援 MySQL 資料庫主機位置 (選用) |

---

### 5. 生產環境部署架構建議 (Nginx 反向代理範例)

在生產環境伺服器上，建議透過 Nginx 擔任前端反向代理，負責處理 SSL/TLS 憑證與靜態快取：

```nginx
server {
    listen 80;
    server_name herb.yourdomain.tw;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name herb.yourdomain.tw;

    ssl_certificate     /etc/letsencrypt/live/herb.yourdomain.tw/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/herb.yourdomain.tw/privkey.pem;

    # 啟用 Gzip 壓縮提升前端載入效能
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        proxy_pass http://127.0.0.1:9390;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ⚙️ DEMO 模式（展示與測試登入）設定說明

本系統提供靈活的 **DEMO 展示模式** 控制機制，可透過專案根目錄下的 `.env` 環境設定檔自由開啟或關閉：

### 1. 模式設定方式
在專案根目錄之 `.env` 檔案中加入或修改 `DEMO_MODE` 參數：

```bash
# ========================================================
# 模式一：開啟 DEMO 展示模式 (適合展示、評審與測試體驗)
# ========================================================
DEMO_MODE=true

# ========================================================
# 模式二：關閉 DEMO 模式 (正式安全模式，強制手動帳密登入)
# ========================================================
DEMO_MODE=false
```

修改完成後，請重啟伺服器以套用全新設定：
```bash
# 終止現有服務後重新啟動
node server/server.js
```

### 2. 兩種模式之行為與介面對比

| 功能特性 / 介面元件 | DEMO 模式開啟 (`DEMO_MODE=true`) | DEMO 模式關閉 (`DEMO_MODE=false` 正式模式) |
| :--- | :--- | :--- |
| **5 大角色一鍵切換分頁** | ✅ 顯示於登入彈窗頂部，點選即一鍵切換身分 Token | ❌ **完全隱藏**，無任何一鍵切換分頁 |
| **快速測試帳密備忘卡片** | ✅ 顯示於登入表單下方，點選任一列自動代入帳密 | ❌ **完全隱藏**，不洩漏任何帳密資訊 |
| **後台管理門扉快捷按鈕** | ✅ 顯示 5 位角色晶片按鈕，點擊即自動填入後台密鑰 | ❌ **完全隱藏**，無任何快捷選取按鈕 |
| **表單預填與 Placeholder** | 顯示預設帳密提示與示範帳號 | 清空所有預填值，僅提示「請輸入帳號 / 密碼」 |
| **登入身分驗證方式** | 支援一鍵快速登入或手動輸入驗證 | **必須手動輸入有效的使用者帳號與密碼方可登入** |
| **適用情境** | 成果展示、課堂示範、功能體驗評估 | 正式上線運行、嚴格資安隔離環境 |

---

## 💾 後台資料庫下載備份功能 (Database Backup & Download)

為確保典藏資料安全與方便本地端離線保存，管理後台提供完善的**資料庫單獨下載與全庫快照備份**功能：

### 1. 如何操作下載備份
* **方式一（全域快捷）**：登入典藏後台後，於頂部管理控制列直接點擊 **「💾 資料庫下載備份」** 按鈕，即可開啟全功能備份彈窗。
* **方式二（匯出中心）**：切換至 **「📤 條件匯出」** 分頁，頂部即為「系統資料庫單獨下載與完整備份中樞」。

### 2. 支援之備份類型
1. **📦 全庫完整快照備份 (`Full Snapshot`)**：
   - 一鍵打包全站所有資料，包含本草典藏 (70+味)、方劑名方 (7首)、草木藏書 (6部)、結盟青草老舖 (12家)、專家 Persona (4席) 與使用者 RBAC 角色結構。
   - 產出檔案：`taiwanherb_full_database_backup_YYYY-MM-DD.json`
2. **🌿 單獨下載：本草典藏資料庫**：
   - 僅匯出本草植物之性味、歸經、風土產區、活性成分、民俗生活應用與安全指引。
   - 產出檔案：`taiwanherb_herbs_db_YYYY-MM-DD.json`
3. **🧪 單獨下載：方劑與傳承名方庫**：
   - 匯出青草茶傳承名方、AI 研製比例、君臣佐使法度與臟腑受納規則。
   - 產出檔案：`taiwanherb_formulas_db_YYYY-MM-DD.json`
4. **📚 單獨下載：草木書閣藏書庫**：
   - 匯出黃世勳教授考證著作目錄、定價、書籍詳情與線上試閱章節。
   - 產出檔案：`taiwanherb_books_db_YYYY-MM-DD.json`
5. **🏪 單獨下載：結盟青草老舖庫**：
   - 匯出全島青草巷百年老舖聯絡資訊、特色主打草藥與採買避坑指南。
   - 產出檔案：`taiwanherb_shops_db_YYYY-MM-DD.json`
6. **🍵 單獨下載：專家 Persona 庫**：
   - 匯出四大專家設定之 RAG 語意 System Prompt 與召回權重配置。
   - 產出檔案：`taiwanherb_experts_db_YYYY-MM-DD.json`
7. **👥 單獨下載：使用者與角色庫**：
   - 匯出前後台 RBAC 權限矩陣與使用者架構（已脫敏安全處理）。
   - 產出檔案：`taiwanherb_users_db_YYYY-MM-DD.json`

---

## 📥 多類別批次資料匯入與圖片管理功能 (Batch Import & Image Management)

典藏管理後台提供殿堂級的資料匯入與圖片管理中樞，支援**草藥資料**、**結盟青草店資料**與**書庫藏書資料**之批次入庫：

### 1. 支援匯入之資料類別
* 🌿 **本草典藏資料庫 (Herbs)**：涵蓋藥材名稱、學名、科屬、風土產區、分類、四氣五味、十二歸經、主要功效、民間生活應用、安全等級與圖片路徑。
* 🏪 **結盟青草老舖資料庫 (Shops)**：涵蓋店家名稱、風土分區、縣市、詳細地址、聯絡電話、歷史淵源、招牌特色、主打草藥、支援宅配與店舖圖片。
* 📚 **草木書閣藏書資料庫 (Books)**：涵蓋書籍名稱、副標題、作者、作者頭銜、分類代碼、定價、原價、頁數、ISBN、簡介、線上試閱章節與封面圖片。

### 2. 支援之匯入檔案格式
* **📗 Excel 試算表 (`.xlsx` / `.xls`)**：可直接上傳現代 Excel 活頁簿，系統自動解析第一工作表並映射至資料欄位。
* **📊 CSV 格式檔 (`.csv`)**：標準試算表，內建 UTF-8 BOM 兼容相容機制，繁體中文不亂碼。
* **📄 JSON 格式檔 (`.json`)**：適合程式資料串接與完整資料結構導入。
* 後台各類別均提供 **「🌱 載入標準示範資料」** 以及 **「下載範例 JSON / CSV / Excel (.xlsx)」** 按鈕，方便下載格式範本直接填寫。

### 3. 圖片檔案匯入與管理機制 (雙管道支援)
* **📦 管道一：整包圖片壓縮包 (ZIP Archive) 批次匯入**
  * 若匯入的 Excel / CSV 中包含自訂圖片檔名（例如 `shop_sample_1.jpg`、`book_sample_2.jpg` 或 `71.png`），可將所有圖片打包為一個 `.zip` 壓縮檔於後台直接上傳。
  * 後端自動解壓過濾圖片（`.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`, `.gif`）並儲存至 `/images/uploads/`。
  * 提供 **「🔗 一鍵自動匹配圖片至工作台各列」** 功能，依照檔名自動關聯對應草藥、店家或書籍。
* **📷 管道二：線上工作台即時單張更換**
  * 在線上編輯表格中，每一列均即時顯示圖片縮圖與路徑框。
  * 點擊任一列的 **「📷 更換」** 按鈕，即可從電腦選取單張圖片即時上傳，伺服器立即保存並自動填入該列圖片路徑，縮圖同步更新。

---

## 🔑 管理後台登入資訊 (預設帳號與密碼)
* **至高管理員 (`super_admin`)**：`admin` / `taiwanherb2026`（全庫管理與 LLM 配置最高權限）
* **本草策展師 (`curator`)**：`curator_lin` / `curator2026`（本草資料維護、批次匯入與文章生成）
* **生藥顧問 (`consultant`)**：`expert_chen` / `consultant2026`（專家 Persona 調校與 RAG 沙盒）
* **典藏觀察員 (`auditor`)**：`auditor_wang` / `auditor2026`（審計日誌與統計數據唯讀）
* **草木學員 (`member`)**：`member_liao` / `member2026`（前台一般文化探索）
* 點擊導覽列「⚙️ 管理後台」或最右側「👤 登入」按鈕，即可依據角色權限登入系統。

