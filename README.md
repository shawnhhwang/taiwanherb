# 🌿 台灣本草植物 Wiki 資料庫系統 (Taiwan Herb Wiki)

> **國際數位設計獎項標竿 (Awwwards Site of the Day / Webby Awards / FWA 級別設計)**
> 融合「四百年島嶼青草風土」、「二十四節氣養生」、「五行經絡氣血引導」與「古法方劑煎煮研製」。
> 全端架構基於 **Node.js (Express)** 與 **Vue.js 3**，具備原生 Web Audio 聲學合成與 3D 微互動。

---

## 🏆 設計亮點與國際獎項級特色 (Award-Winning Highlights)

### 1. 現代東方本草植物圖鑑美學 (Modern Oriental Herbarium UI)
* **三大動態美學主題**：
  * 📜 **宣紙古卷 (Parchment - Default)**：溫潤暖黃宣紙質地、竹林深綠主調與硃砂紅印。
  * 🎋 **晨曦竹林 (Bamboo)**：蒼翠淡雅冷綠、山間晨露透亮風貌。
  * 🌌 **暮夜玄青 (Midnight)**：深黛玄青暗色系、螢光翡翠綠，沉浸式夜間博物館觀感。
* **有機動態微粒畫布 (`HerbAtmosphere`)**：60fps 輕量 Canvas 渲染島嶼草木花粉與微光飄逸。

### 2. 二十四節氣島嶼青草日曆 (`HerbHero`)
* 自動結合島嶼時令（如秋分、寒露、霜降、立夏、大暑），揭示先民四時養生訓言。
* 即時呈現當令推薦草藥（如春飲薄荷、夏煮咸豐、秋煎魚腥、冬燉黃耆）。
* **3D 透視傾斜標本卡片**：隨滑鼠游標產生即時 3D 空間傾斜與鏡面流光折射。

### 3. 青草茶方劑調配研製所 (`HerbAlchemyLab`)
* **茶釜調配互動槽**：遵循中醫「君、臣、佐、使」法度，自由投入 1 至 4 味草藥。
* **四氣陰陽動態指針儀表**：實時計算寒涼值與溫熱值，自動給予處方辨性與體質叮嚀。
* **五味滋味預測光譜**：即時預測苦、甘、辛、涼四維風味比例。
* **五行臟腑受納共鳴**：實時顯示金、木、水、火、土受納經絡。
* **古法三階煎煮計時器**：內建「武火急沸 ➔ 文火慢熬 ➔ 關火悶香」熬茶倒數與音效警報。
* **配方箋一鍵匯出**：生成調配紀錄並複製至剪貼簿。

### 4. 五行臟腑經絡氣血引導圖 (`HerbMeridianMap`)
* 互動式五行臟象圖譜（金-肺、木-肝、土-脾、火-心、水-腎）。
* 點選特定經脈節點，即時展示相生相剋關係、經絡生理與專屬入經草藥畫廊。

### 5. 我的本草藏書票標本室 (`FavoritesCabinet`)
* 一鍵典藏喜愛草藥，產出具備唯一編號、島嶼典藏戳記之 **Ex-Libris 藏書票**。
* 完美支援 `@media print` 列印，可直接輸出黑白植物標本卡供珍藏。

### 6. 全域快捷命令搜尋盤 (`CommandPalette` · `Ctrl+K / Cmd+K`)
* 鍵盤快捷鍵隨時喚出 Spotlight 風格搜尋器，支援上下箭頭鍵導航與熱門捷徑推薦。

### 7. 原生東方聲學設計 (`audioService.js`)
* 無需加載任何外部 mp3 音檔，採用瀏覽器原生 **Web Audio API** 演算法合成：
  * 🎋 **竹音擊節**（點擊、切換選項之清脆竹節反饋）
  * 🔔 **頌缽清磬**（卡片開卷、典藏之 528Hz 五度和弦共鳴）
  * 💧 **水滴入茶**（草藥投入茶釜時的水滴音）
  * 🔥 **沸水微響**（煎煮計時時的氣泡聲景）
  * 🍃 **山嵐松風**（可常駐開啟的自然白噪音背景音）

---

## 🛠️ 技術棧 (Tech Stack)

| 領域 | 核心技術 | 說明 |
| :--- | :--- | :--- |
| **後端核心** | **Node.js 20 LTS + Express.js** | 分層架構（Controller - Service - Repository）、Result Pattern 統一回應 |
| **前端框架** | **Vue.js 3 + Vite 5** | Composition API (`<script setup>`)、高流暢度響應式狀態管理 |
| **資料庫支援** | **MySQL 8.0 / 內建記憶體資料庫** | 支援主備援 (Primary/Secondary) 自動故障轉移 (Failover)，開箱即用免裝資料庫 |
| **聲學合成** | **原生 Web Audio API** | 演算法生成無延遲聲景，支援一鍵靜音與山嵐白噪音切換 |
| **路由機制** | **客戶端 URL Hash 路由 (`#/herb/:id`)** | 支援特定藥材直連、網址書籤、歷史記錄導航 |
| **自動化測試** | **Node.js 原生測試執行器 (`node:test`)** | 零第三方測試依賴，秒級完成 11 項整合測試 |

---

## 📂 專案目錄結構

```
taiwanherb/
├── package.json               # 專案根目錄腳本 (start, dev, build, test)
├── README.md                  # 專案完整說明文件
├── Spec.md                    # 系統架構規格說明書 (含 Awwwards 標準)
├── TASK_LIST.md               # 開發進度與已完成項目表
├── Temple.md                  # 前端版型與組件架構範本
├── SKILLS.md                  # 工程編碼準則與架構規範
├── server/                    # Node.js Express 後端原始碼
│   ├── app.js                 # Express 核心配置、CORS、SPA 靜態退避路由
│   ├── server.js              # 服務啟動入口與優雅關機 (Graceful Shutdown)
│   ├── config/
│   │   ├── config.js          # 環境變數與埠號設定
│   │   └── dbFactory.js       # MySQL 連線池與 Primary/Secondary Failover 自動切換
│   ├── data/
│   │   └── herbsData.js       # 台灣本土青草與植物學深度知識庫 (16+ 款經典藥材)
│   ├── repositories/
│   │   └── herbRepository.js  # 存取層：模糊搜尋、四氣五味、經絡篩選、分頁排序
│   ├── services/
│   │   └── herbService.js     # 業務邏輯層：DTO映射、相似藥材推薦演算法、多方比對
│   ├── controllers/
│   │   ├── herbController.js  # 藥材 API 控制器
│   │   └── healthController.js# 健康檢查與 Failover 演練控制器
│   ├── routes/
│   │   ├── herbRoutes.js      # /api/herbs 端點路由
│   │   ├── healthRoutes.js    # /api/health 端點路由
│   │   └── taxonomyRoutes.js  # /api/categories, /api/channels, /api/natures
│   ├── middlewares/
│   │   ├── errorHandler.js    # 全域未捕捉異常攔截器
│   │   └── logger.js          # 結構化請求日誌中介軟體
│   └── utils/
│       └── apiResponse.js     # Result Pattern 統一回傳格式包裝器
├── client/                    # Vue 3 前端單頁應用程式
│   ├── package.json           # 前端依賴配置
│   ├── vite.config.js         # Vite 開發代理與打包配置
│   ├── index.html             # 單頁應用入口
│   └── src/
│       ├── main.js            # Vue 應用入口
│       ├── App.vue            # 主視圖、全域狀態、Hash 路由與鍵盤監控
│       ├── assets/
│       │   └── style.css      # 東方本草植物圖鑑樣式系統與三色主題規範
│       ├── services/
│       │   ├── api.js         # 前端 API 串接封裝
│       │   └── audioService.js# Web Audio 聲學合成器
│       └── components/
│           ├── HerbAtmosphere.vue   # 漂浮草木粒子 Canvas 動畫
│           ├── HerbNavbar.vue       # 頂端導覽列 (主題切換、聲音切換、搜尋)
│           ├── HerbHero.vue         # 殿堂級 Hero (24 節氣青草曆、3D 卡片)
│           ├── HerbSidebar.vue      # 側邊分類、四氣藥性、十二經絡篩選
│           ├── HerbCard.vue         # 3D 傾斜圖鑑卡片 (流光層、標本號、收藏)
│           ├── HerbDetail.vue       # 展卷詳情頁 (科屬、成分、風土故事、配伍)
│           ├── HerbAlchemyLab.vue   # 青草茶方劑研製所 (陰陽指針、五味圖譜)
│           ├── HerbMeridianMap.vue  # 五行臟腑經絡引導圖
│           ├── FavoritesCabinet.vue # 我的本草藏書票標本室
│           ├── CommandPalette.vue   # Ctrl+K 全域快捷命令搜尋盤
│           ├── HerbCompareModal.vue # 跨藥材多維橫向對照表
│           └── HealthModal.vue      # 系統健康狀態與 Failover 演練
└── tests/
    └── api.test.js            # API 與 SPA 整合測試
```

---

## 🚀 快速上手 (Quick Start)

### 1. 環境需求
* **Node.js**: v18.0.0 以上 (建議 v20 LTS)
* **npm**: v9.0.0 以上

### 2. 安裝依賴
在專案根目錄執行：
```bash
# 安裝根目錄與後端依賴
npm install

# 安裝前端 client 依賴
cd client && npm install && cd ..
```

### 3. 一鍵編譯與啟動 (生產模式)
```bash
# 編譯 Vue 3 前端到 client/dist
npm run build

# 啟動 Node.js 全端伺服器 (同時託管 API 與前端靜態頁面)
npm start
```
開啟瀏覽器訪問：
👉 **http://localhost:3000** 即可開始沉浸式體驗！

---

### 4. 開發模式 (前後端熱重載)
同時啟動 Node.js 後端 (Port 3000) 與 Vite 前端開發伺服器 (Port 5173，自動代理 API)：
```bash
npm run dev
```
瀏覽器開啟：
👉 **http://localhost:5173**

---

### 5. 執行自動化測試
本專案包含 11 項後端 API、分頁篩選、Failover 容錯切換與 SPA 靜態託管整合測試：
```bash
npm test
```
*測試輸出範例：*
```
▶ 🌱 台灣本草 Wiki API 測試套件
  ✔ GET /api/health - 應回傳健康狀態與資料庫 Failover 狀態
  ✔ GET /api/herbs - 應回傳藥材清單及分頁資訊
  ✔ GET /api/herbs?q=薄荷 - 模糊搜尋應正確篩選
  ✔ GET /api/herbs?nature=溫 - 藥性篩選應正確生效
  ✔ GET /api/herbs?channel=肺 - 歸經篩選應正確生效
  ✔ GET /api/herbs/:id - 取得單一藥材詳情與關聯推薦
  ✔ GET /api/herbs/99999 - 不存在藥材應回傳 404
  ✔ GET /api/categories - 應回傳分類統計清單
  ✔ GET /api/channels - 應回傳歸經統計
  ✔ GET / - 應正確提供 Vue 3 單頁前端靜態頁面
  ✔ GET /herb/1 - 非 API 路由應退避提供 Vue 3 SPA index.html
✔ 11 pass, 0 fail (237ms)
```

---

## ⌨️ 常用快捷鍵與操作指南

| 快捷鍵 / 操作 | 功能說明 |
| :--- | :--- |
| **`Ctrl + K` 或 `Cmd + K`** | 喚起全域快捷命令搜尋盤，支援上下鍵切換與 Enter 鍵立即開卷 |
| **`ESC`** | 關閉彈出視窗（命令盤、比對表、健康監控） |
| **點擊導覽列圓點** | 切換 宣紙（古卷）/ 竹林（晨曦）/ 暮夜（玄青）三色主題 |
| **點擊導覽列鈴鐺 🔔** | 開啟 / 靜音東方草木聲景（竹音、磬聲、水滴） |
| **點擊導覽列綠葉 🍃** | 開啟 / 關閉山嵐松風自然白噪音 |
| **滑鼠懸停於卡片** | 體驗 3D 透視空間傾斜與光澤折射 |
| **點擊卡片右上角星號 ☆** | 典藏至「我的本草藏書票」 |

---

## ⚙️ 資料庫與故障轉移 (Failover) 配置

本專案預設採用**內建高可靠記憶體資料庫**，無需預先安裝或設定任何資料庫軟體，即可開箱運行完整功能（支援增刪改查與即時過濾）。

若需連接實體 MySQL 主備援叢集，可於專案根目錄建立 `.env` 檔案：
```env
PORT=3000
NODE_ENV=production
USE_MYSQL=true

# Primary 主節點
DB_PRIMARY_HOST=127.0.0.1
DB_PRIMARY_PORT=3306
DB_PRIMARY_USER=root
DB_PRIMARY_PASSWORD=your_password
DB_NAME=taiwanherb

# Secondary 備援節點 (Failover)
DB_SECONDARY_HOST=127.0.0.1
DB_SECONDARY_PORT=3307
DB_SECONDARY_USER=root
DB_SECONDARY_PASSWORD=your_password
```
當 `DbFactory` 偵測到 Primary 主節點斷線時，會自動切換至 Secondary 節點並記錄日誌；若兩者皆無法連線，系統會平滑降級至 Memory 模式，確保前端服務永不中斷。亦可點擊前台健康狀態徽章，於視窗中手動點擊「🔄 演練 Failover 節點切換」！

---

## 📄 授權條款 (License)
MIT License © 2026 Taiwan Herb Wiki Team
