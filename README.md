# 🌿 台灣本草植物 Wiki 資料庫系統 (Taiwan Herb Wiki)

> 一個融合傳統青草智慧、現代植物學與東方圖鑑美學的中草藥知識庫全端系統。
> 架構採用 **Node.js (Express)** 高效能後端搭配 **Vue.js 3** 響應式現代前端。

---

## 📖 系統簡介

**台灣本草植物 Wiki** 旨在整理並保存台灣本土青草茶文化（如大花咸豐草、魚腥草、艾草、雷公根、左手香、鳳尾草等）與傳統中醫藥典植物知識。系統提供豐富的植物高清圖鑑、多維度藥性檢索（四氣五味、十二經絡歸經、分類功效）、深度展卷詳情、跨藥材多方對照比對，以及企業級資料庫故障轉移 (Failover) 與系統健康監控機制。

---

## 🛠️ 技術棧 (Tech Stack)

| 領域 | 核心技術 | 說明 |
| :--- | :--- | :--- |
| **後端核心** | **Node.js 20 LTS + Express.js** | 分層架構（Controller - Service - Repository）、Result Pattern 統一回應 |
| **前端框架** | **Vue.js 3 + Vite 5** | Composition API (`<script setup>`)、高效響應式狀態管理 |
| **前端美學** | **Modern Oriental Herbarium UI** | 東方草本宣紙色調、竹林墨綠、藥性四氣色票、流暢 RWD 佈局 |
| **資料持久化** | **MySQL 8.0 / 內建記憶體資料庫** | 支援主備援 (Primary/Secondary) 自動故障轉移，開箱即用免安裝資料庫 |
| **路由機制** | **客戶端 URL Hash 路由 (`#/herb/:id`)** | 支援特定藥材直連、網址書籤、歷史記錄導航 |
| **維運監控** | **Morgan + `/api/health`** | 結構化日誌輸出、記憶體與運行時間即時監控、線上 Failover 演練 |
| **自動化測試** | **Node.js 原生測試執行器 (`node:test`)** | 零第三方測試依賴，秒級完成 11 項整合測試 |

---

## 📂 專案目錄結構

```
taiwanherb/
├── package.json               # 專案根目錄腳本 (start, dev, build, test)
├── README.md                  # 專案完整說明文件
├── Spec.md                    # 系統架構規格說明書
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
│   │   └── herbsData.js       # 台灣本土青草與傳統本草核心知識庫 (16+ 款經典藥材)
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
│       ├── App.vue            # 主視圖、狀態管理與 Hash 路由監控
│       ├── assets/
│       │   └── style.css      # 東方本草植物圖鑑樣式系統
│       ├── services/
│       │   └── api.js         # 前端 API 串接封裝
│       └── components/
│           ├── HerbNavbar.vue       # 頂部導覽列 (搜尋防抖、今日推薦、比對切換)
│           ├── HerbSidebar.vue      # 側邊分類、四氣藥性、十二經絡多維篩選
│           ├── HerbCard.vue         # 藥材圖鑑卡片 (植物照片、標籤、功效)
│           ├── HerbDetail.vue       # 藥材詳情展卷頁 (在地故事、茶飲配方、禁忌警語)
│           ├── HerbCompareModal.vue # 多方藥材橫向對照彈窗
│           └── HealthModal.vue      # 系統健康狀態與 Failover 演練彈窗
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
👉 **http://localhost:3000** 即可開始使用！

---

### 4. 開發模式 (熱重載開發)
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
✔ 11 pass, 0 fail (219ms)
```

---

## 🎨 頁面版型與功能特色

### 1. 現代東方本草植物圖鑑 UI
* **宣紙米白質感底色** (`#FAF7F2`) 與 **竹林深綠主調** (`#2D6A4F`)，沉浸式閱讀體驗。
* 融合古典植物誌印章字形（Noto Serif TC）與現代無襯線排版。

### 2. 即時模糊搜尋防抖 (Debounced Search)
* 頂部搜尋欄支援即時模糊查詢（包含中文名稱、植物學拉丁學名、民間俗名、核心功效與標籤）。
* 內建 250ms 防抖處理，大幅優化使用者打字體驗並降低伺服器頻寬消耗。

### 3. 多維度即時篩選 (Multi-dimensional Filtering)
* **藥材分類**：全部、台灣青草茶經典、清熱解毒藥、辛涼解表藥、辛溫解表藥、利水滲濕藥、補虛藥等。
* **四氣藥性**：寒、涼、平、溫、熱（色彩編碼視覺化）。
* **十二經絡歸經**：肺經、肝經、脾經、胃經、心經、腎經、大腸經等。

### 4. 雙重視圖切換
* **圖鑑模式 (Grid View)**：植物標本照片、名稱學名、藥性徽章、歸經標籤與功效卡片。
* **清單模式 (List View)**：高密度資訊表格，適合快速掃描多筆藥材。

### 5. 展卷式藥材詳情頁 (Herb Detail View)
* 支援 URL Hash 直接定位分享：如 `http://localhost:3000/#/herb/1`。
* 包含完整本草維度：
  * 📸 高解析植物標本照片與學名
  * 📜 功效主治與臨床用途
  * 🍃 **台灣在地青草文化與採集背景**（例如萬華西昌街青草巷、客家食用習俗、野地辨識）
  * 🍵 **用法用量與日常青草茶煮法建議**
  * ⚠️ **使用禁忌與體質警語**（醒目溫和提示）
  * 🌿 **相生相成 ‧ 關聯推薦藥材**（以歸經與分類相似度即時推薦）

### 6. 跨藥材多方對照比對 (Herb Comparison)
* 可點擊卡片上的「+ 加入比對」將多味藥材加入比對欄。
* 點擊導覽列「⚖️ 比對」彈出橫向矩陣對照表，並列比較性味、歸經、功效、禁忌與台灣在地應用。

### 7. 系統健康監控與 Failover 節點演練
* 頂端即時綠色脈衝徽章顯示 API 運行狀態。
* 點擊徽章開啟系統面板，即時查看記憶體占用、伺服器運行時間、資料庫模式與活躍節點。
* 提供「🔄 演練 Failover 節點切換」按鈕，可直接於前台觸發主備援切換演練！

---

## 📡 RESTful API 端點規範

所有 API 回應皆遵循統一的 **Result Pattern (`ApiResponse`)** 格式：
```json
{
  "success": true,
  "message": "成功取得藥材清單",
  "data": [ ... ],
  "errorCode": 0,
  "timestamp": "2026-10-01T14:40:00.000Z",
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 16,
    "totalPages": 2
  }
}
```

### 1. 藥材檢索與清單
* **端點**: `GET /api/herbs`
* **Query 參數**:
  * `q`: 關鍵字模糊搜尋 (如 `q=薄荷` 或 `q=清熱`)
  * `category`: 分類篩選 (如 `category=台灣青草茶經典`)
  * `channel`: 歸經篩選 (如 `channel=肺`)
  * `nature`: 藥性篩選 (如 `nature=涼`)
  * `sort`: 排序方式 (`id_asc`, `name_asc`, `name_desc`, `id_desc`)
  * `page`: 頁碼 (預設 `1`)
  * `limit`: 每頁筆數 (預設 `12`)

### 2. 單一藥材詳情
* **端點**: `GET /api/herbs/:id`
* **範例**: `GET /api/herbs/1`
* **回傳內容**: 包含藥材詳細資訊、用法、禁忌、在地歷史及計算後的 `relatedHerbs` 關聯推薦。

### 3. 今日隨機推薦
* **端點**: `GET /api/herbs/random`
* **說明**: 隨機回傳一味藥材供首頁或每日推薦展示。

### 4. 藥材分類統計
* **端點**: `GET /api/categories`
* **說明**: 回傳各藥材分類名稱與其收錄之藥材數量。

### 5. 歸經統計
* **端點**: `GET /api/channels`
* **說明**: 回傳依中醫臟腑順序排列之經絡名稱與藥材數量。

### 6. 藥性統計
* **端點**: `GET /api/natures`
* **說明**: 回傳寒、微寒、涼、平、微溫、溫、熱之統計數量。

### 7. 藥材比對
* **端點**: `POST /api/herbs/compare`
* **Request Body**:
  ```json
  { "ids": [1, 3] }
  ```

### 8. 系統健康與 Failover 監控
* **端點**: `GET /api/health`
* **端點**: `POST /api/health/failover-test` (演練手動故障轉移)

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
當 `DbFactory` 偵測到 Primary 主節點斷線時，會自動切換至 Secondary 節點並記錄日誌；若兩者皆無法連線，系統會平滑降級至 Memory 模式，確保前端服務永不中斷。

---

## 📄 授權條款 (License)
MIT License © 2026 Taiwan Herb Wiki Team
