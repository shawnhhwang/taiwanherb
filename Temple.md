# 前端頁面版型與組件架構範本 (Temple.md)

本系統達到 **Awwwards (Site of the Day)**、**Webby Awards** 及 **FWA** 級別的設計深度，採用 **Vue.js 3** 搭配現代東方植物圖鑑美學（Modern Oriental Herbarium UI），結合聲學合成、3D 透視微互動與時序節氣智慧。

---

## 1. 設計語言與視覺規範 (Design Tokens)

### 三大東方美學主題 (Atmospheric Themes)
1. **宣紙古卷 (Parchment - Default)**:
   * 溫潤暖黃宣紙底色 (`#FAF7F2`)、竹林深綠主調 (`#2D6A4F`)、煎茶琥珀褐 (`#B07D48`)、硃砂紅印。
2. **晨曦竹林 (Bamboo)**:
   * 蒼翠淡雅冷綠底色 (`#F0F7F3`)、墨玉深綠 (`#143D2B`)、晨露清透邊框。
3. **暮夜玄青 (Midnight Herbarium)**:
   * 沉浸式夜間博物館體驗、深黛玄青底色 (`#0F1713`)、翡翠霓光綠 (`#52B788`)、琥珀金光。

### 字型與版印層級
* **主標題與封印**: `Noto Serif TC` (思源宋體，莊嚴古典)
* **內文與讀數**: `Noto Sans TC` (思源黑體，現代俐落)
* **標本編號與計時**: `Monospace` (工整紀錄感)

---

## 2. 聲學設計體系 (Web Audio Soundscape)

本系統不依賴外部音效檔，採用瀏覽器原生 **Web Audio API** 演算法合成：
* **竹音擊節 (`playClick`)**: 模擬竹片輕敲之爽脆音效，頻率自 620Hz 指數衰減至 140Hz。
* **頌缽清磬 (`playChime`)**: 雙正弦波五度和弦共鳴 (528Hz & 792Hz)，長餘音殘響 1.2 秒。
* **水滴入茶 (`playWaterDrop`)**: 頻率從 350Hz 躍升至 980Hz 之水珠清脆感。
* **茶釜沸水 (`playBoiling`)**: 隨機頻率氣泡爆破合成。
* **山嵐松風 (`toggleAmbient`)**: 濾波粉紅噪音自然微風白噪音。

---

## 3. 組件拓撲與層次 (Component Topology)

```
[ App.vue (主視圖、全域主題與快捷鍵監聽) ]
  ├── [ HerbAtmosphere.vue (飄逸草木粒子微光 Canvas) ]
  ├── [ HerbNavbar.vue (固定導覽、主題切換、聲音切換、Cmd+K 提示) ]
  ├── [ HerbHero.vue (敘事橫幅、24 節氣青草曆、3D 傾斜標本展台) ]
  │
  ├── [ 標籤頁視圖 (Tab Views) ]
  │     ├── [ HerbAlchemyLab.vue (青草茶方劑調配研製所) ]
  │     │     ├── 煮茶釜與蒸氣動畫
  │     │     ├── 四氣陰陽平衡動態指針儀表
  │     │     ├── 五味滋味預測光譜
  │     │     ├── 五行臟腑受納共鳴燈號
  │     │     └── 古法三階熬煮計時器
  │     │
  │     ├── [ HerbMeridianMap.vue (五行臟腑經絡氣血引導圖) ]
  │     │     ├── 五行（金木土火水）臟象詳解
  │     │     └── 專屬入經草藥互動卡片廊
  │     │
  │     ├── [ FavoritesCabinet.vue (我的本草藏書票標本室) ]
  │     │     └── 藏書票 Specimen Plate 卡片與列印支援
  │     │
  │     └── [ Catalog View (傳統圖鑑模式) ]
  │           ├── [ HerbSidebar.vue (分類、四氣、經絡多維篩選) ]
  │           ├── 工具列 (排序選單 + 圖鑑/清單檢視切換)
  │           └── [ HerbCard.vue (3D 傾斜卡片、流光層、收藏星號) ]
  │
  ├── [ HerbDetail.vue (展卷詳情頁：科屬、成分、風土故事、茶飲配方) ]
  ├── [ CommandPalette.vue (全域 Ctrl+K 快捷命令搜尋盤) ]
  ├── [ HerbCompareModal.vue (跨藥材多維橫向對照表) ]
  └── [ HealthModal.vue (系統健康狀態與 Failover 節點演練) ]
```

---

## 4. 關鍵互動規格 (Interaction Standards)
1. **3D Card Perspective Tilt**:
   * 游標在卡片上移動時，卡片以卡片中心為基準產生最多 `±8°` 至 `±10°` 之 X/Y 軸旋轉，並伴隨鏡面高光層移動。
2. **快捷搜尋鍵 (`Cmd+K / Ctrl+K`)**:
   * 全域監聽鍵盤事件，支援上下箭頭鍵無縫巡迴與 Enter 鍵立即開卷。
3. **藏書票列印相容性**:
   * 當使用者調用瀏覽器列印 (`Cmd+P` 或「印製本草箋」按鈕) 時，自動透過 `@media print` 隱藏介面按鈕與導覽列，輸出黑白分明之標本檔案。
