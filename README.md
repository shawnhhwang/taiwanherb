# 🌿 台灣本草植物 Wiki 資料庫系統 (Taiwan Herb Wiki)

> **國際數位設計獎項標竿 (Awwwards Site of the Day / Webby Awards / FWA 級別設計)**
> 融合「四百年島嶼青草風土」、「客家與原住民野草文化」、「RAG 專家語意諮詢茶堂」、「典藏後台 CMS」與「古法方劑煎煮研製」。
> 全端架構基於 **Node.js (Express)** 與 **Vue.js 3**，具備原生 Web Audio 聲學合成與 3D 微互動。

---

## 🏆 設計亮點與國際獎項級特色 (Award-Winning Highlights)

### 1. 台灣本土草藥多維度檢索與風土探索 (`TaiwanTerroirMap`)
* **全島六大風土產區分佈**：直觀篩選北部青草巷、桃竹苗客庄丘陵、中彰投台地、嘉南平原古都、六堆高屏半島與花東原鄉山林。
* **民間生活情境應用維度**：涵蓋萬華退火青草茶、客家辟邪抹草沐浴、坐月子大風草驅風擦澡、狗尾草開脾燉雞、原民野菜野炊等日常情境。
* **方言俗名與全維檢索**：支援台語俗名（如「恰芒草」、「狗貼耳」、「到手香」）、客語名、原住民語名（泰雅/阿美 Tana）、學名、科屬與活性成分模糊檢索。
* **安全用藥分級**：溫和常飲、體虛胃寒慎用、孕婦慎用/忌用、大苦大寒遵醫囑。

### 2. 本草名醫與風土達人諮詢茶堂 (`HerbConsultationLab` · RAG 語意系統)
* **四大在地專家 Persona 切換**：
  * 🍵 **萬華老茶師 林萬吉**：百年西昌街青草巷老茶師口吻，強調退火退癀、文火慢熬與保護胃底氣。
  * 👵 **客庄草藥阿婆 彭秀妹**：慈祥溫厚客家長輩，注重抹草辟邪、大風草月子散寒與家常食療。
  * 🔬 **生藥學博士 陳彥廷 教授**：嚴謹生藥學與循證醫學，分析有效化學分子、作用機制與西藥交互作用。
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
| **自動化測試** | **Node.js 原生測試執行器 (`node:test`)** | 零第三方測試依賴，秒級完成 28 項整合測試 |

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
*執行 28 項完整測試，包含風土檢索、方言搜尋、RAG 諮詢、RBAC 權限隔離、LLM Ping、沙盒測試、資料匯入與線上編輯、條件匯出、專題文章生成與 SPA 託管。*

### 3. 編譯前端成品
```bash
npm run build
```

### 4. 啟動生產伺服器
```bash
npm start
```
預設監聽於 `http://localhost:3000`。

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
# 啟動容器，將容器 3000 埠對應至主機 3000 埠
docker run -d \
  --name taiwanherb-app \
  -p 3000:3000 \
  -e PORT=3000 \
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
瀏覽器造訪 `http://localhost:3000` 即可立即進入系統。

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
| `PORT` | `3000` | 容器內部 Express 伺服器監聽埠號 |
| `NODE_ENV` | `production` | Node.js 執行模式 (`production` / `development`) |
| `DB_FALLBACK_MEMORY` | `true` | 是否啟用內建零依賴的高可靠度記憶體資料庫 (若為 `true` 則無需任何外部 MySQL 即開即用) |
| `ADMIN_PASSWORD` | `taiwanherb2026` | 典藏後台管理者登入通行密鑰 |
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
        proxy_pass http://127.0.0.1:3000;
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

## 🔑 管理後台登入資訊
* **預設通行碼**：`taiwanherb2026`
* 點擊導覽列「⚙️ 管理後台」或 Hero 標籤進入，即可進行本草資料典藏、即時預覽、編輯專家 Persona 與備份匯出。
