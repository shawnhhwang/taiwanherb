# 前端頁面版型與組件架構範本 (Temple.md)

本系統採用 **Vue.js 3** 搭配現代東方植物圖鑑美學（Modern Oriental Herbarium UI），打破一般呆板的灰白儀表板設計，呈現溫潤且專業的本草植物誌風格。

---

## 1. 設計語言與視覺規範 (Design Tokens)

* **主色調 (Primary)**: 本草竹林綠 (`#2D6A4F` / 深色 `#1B4332`)，象徵生機、草木與專業。
* **輔助色 (Accent)**: 煎茶琥珀褐 (`#B07D48` / `#8F531F`)，象徵溫潤陳年草藥與大地泥土。
* **背景底色 (Paper Parchment)**: 宣紙米白底 (`#FAF7F2` / 柔和底 `#F2EEE6`)，模擬古典本草圖鑑紙頁觸感。
* **字型設定**: 
  * 標題與印章: `Noto Serif TC` (思源宋體，端莊典雅)
  * 內文與資訊: `Noto Sans TC` (思源黑體，現代清晰易讀)
* **藥性四氣色彩編碼**:
  * 寒 / 大寒: 清玉藍 (`#0369A1` on `#E0F2FE`)
  * 涼 / 微涼: 碧玉青 (`#00796B` on `#E0F7FA`)
  * 平: 素雅綠 (`#2D6A4F` on `#EDF5F0`)
  * 溫 / 微溫: 薑黃橙 (`#C2410C` on `#FFEDD5`)
  * 熱 / 大熱: 丹砂紅 (`#B91C1C` on `#FEE2E2`)

---

## 2. 前端組件階層架構 (Component Hierarchy)

```
[ App.vue (主視圖、路由與狀態中樞) ]
  ├── [ HerbNavbar.vue (頂端導覽列) ]
  │     ├── 品牌印章標誌 (Brand Seal)
  │     ├── 搜尋防抖輸入框 (Debounced Search with Clear button)
  │     ├── 今日隨機推薦按鈕 (Random Pick)
  │     ├── 藥材比對按鈕 (Compare Drawer Trigger)
  │     └── 系統健康脈衝徽章 (Health Pulse Badge)
  │
  ├── [ HerbSidebar.vue (側邊多維度篩選欄) ]
  │     ├── 分類清單與數量標籤 (Category Accordion)
  │     ├── 四氣藥性標籤雲 (Nature Chips)
  │     ├── 十二經絡歸經標籤雲 (Channel Chips)
  │     └── 重設篩選 (Reset Filters)
  │
  ├── [ 主內容區 (Main Content) ]
  │     ├── [ Catalog View (圖鑑目錄模式) ]
  │     │     ├── 工具列 (排序選單 + 圖鑑/清單檢視切換)
  │     │     ├── [ HerbCard.vue (圖鑑卡片) ] x N
  │     │     └── [ List View (精簡表格檢視) ]
  │     │
  │     └── [ HerbDetail.vue (詳情展卷模式) ]
  │           ├── 麵包屑導航與返回按鈕
  │           ├── 左欄: 高解析標本照片、分類、四氣、五味、歸經、俗名
  │           └── 右欄: 功效主治、台灣在地青草文化、茶飲配方、禁忌警語、關聯推薦
  │
  ├── [ HerbCompareModal.vue (跨藥材對照彈窗) ]
  └── [ HealthModal.vue (系統監控與 Failover 演練彈窗) ]
```

---

## 3. Vue 3 核心版型範本 (App.vue 骨架)

```html
<template>
  <div class="app-container">
    <!-- 頂部固定導覽列 -->
    <HerbNavbar
      v-model:searchQuery="searchQuery"
      :compare-list="compareList"
      :health-info="healthInfo"
      @go-home="backToCatalog"
      @random-pick="fetchRandomHerb"
      @open-compare="isCompareModalOpen = true"
      @open-health="openHealthModal"
    />

    <!-- 雙欄版型主體 (響應式 RWD) -->
    <div class="main-wrapper">
      <!-- 左側多維度分類與屬性導覽 -->
      <HerbSidebar
        v-if="!selectedHerbId"
        :categories="categories"
        :channels="channels"
        :natures="natures"
        :current-category="currentCategory"
        :current-channel="currentChannel"
        :current-nature="currentNature"
        :total-herbs-count="pagination.total"
        @select-category="onSelectCategory"
        @select-channel="onSelectChannel"
        @select-nature="onSelectNature"
        @reset-filters="resetFilters"
      />

      <!-- 右側核心展示區 -->
      <main class="content-area">
        <!-- 詳情展卷模式 -->
        <HerbDetail
          v-if="selectedHerbId && herbDetail"
          :herb="herbDetail"
          @back-to-catalog="backToCatalog"
        />

        <!-- 目錄模式 -->
        <div v-else class="herbs-grid">
          <HerbCard
            v-for="herb in herbs"
            :key="herb.id"
            :herb="herb"
            @view-detail="openHerbDetail"
          />
        </div>
      </main>
    </div>
  </div>
</template>
```

---

## 4. 路由與使用者體驗 (UX / Routing)
* **客戶端路由**: 採用 URL Hash 規格 `#/herb/:id`，使用者可直接複製特定藥材網址進行分享，或使用瀏覽器上一頁/下一頁返回圖鑑目錄。
* **搜尋防抖 (Debounce)**: 避免使用者每輸入一個字母即發送大量 HTTP 請求，內建 250ms 防抖處理，確保伺服器與資料庫負載平穩。
* **零依賴快速運行**: 前端打包後自動由後端 Express 靜態代管，使用者只需啟動單一 Node.js 伺服器即可獲得完整的前後端功能。
