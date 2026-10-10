# 前端頁面版型與組件架構範本 (Temple.md)

本系統達到 **Awwwards (Site of the Day)**、**Webby Awards** 及 **FWA** 級別的設計深度，採用 **Vue.js 3** 搭配現代東方植物圖鑑美學（Modern Oriental Herbarium UI），結合聲學合成、3D 透視微互動、RAG 專家語意生成與典藏後台管理。

---

## 1. 組件拓撲與層次 (Component Topology)

```
[ App.vue (主視圖、全域主題、Hash 路由與快捷鍵監聽) ]
  ├── [ HerbAtmosphere.vue (飄逸草木粒子微光 Canvas) ]
  ├── [ HerbNavbar.vue (固定導覽、主題切換、聲音切換、諮詢與管理按鈕、Cmd+K 提示) ]
  ├── [ HerbHero.vue (敘事橫幅、24 節氣青草曆、六大功能標籤藥籤) ]
  │
  ├── [ 標籤頁視圖 (Tab Views) ]
  │     ├── [ HerbConsultationLab.vue (本草名醫與風土達人諮詢茶堂) ]
  │     │     ├── 四大專家切換抽屜卡 (萬華老茶師 / 客庄阿婆 / 生藥博士 / 野菜獵人)
  │     │     ├── 風土情境快捷問題推薦 Chips
  │     │     ├── RAG 檢索增強生成回覆 (Markdown 渲染)
  │     │     ├── Citations 本草標本引證卡廊 (點擊直接開卷查閱詳情)
  │     │     └── 專家追問建議問題列表
  │     │
  │     ├── [ HerbAdminDashboard.vue (典藏後台與數據中樞) ]
  │     │     ├── 通行碼安全解鎖門扉 (Passcode Gate)
  │     │     ├── 全域核心數據指標卡 (全庫藥材/風土區域/分類/專家)
  │     │     ├── 本草清單管理表格 (分頁、搜尋、狀態切換、刪除)
  │     │     ├── 典藏新草藥 / 編輯草藥雙欄抽屜彈窗
  │     │     │     ├── 左欄：多步驟草藥表單 (植物學/風土/性味/安全)
  │     │     │     └── 右欄：所見即所得之即時古典標本票卡預覽 (Live Specimen Plate)
  │     │     ├── 專家 Persona 語意 Prompt 微調介面
  │     │     ├── 風土產區與四氣經絡圖譜分析
  │     │     └── 全庫 JSON/CSV 備份匯出與審計日誌
  │     │
  │     ├── [ HerbAlchemyLab.vue (青草茶方劑調配研製所) ]
  │     │     ├── 煮茶釜與蒸氣動畫
  │     │     ├── 四氣陰陽平衡動態指針儀表
  │     │     ├── 五味滋味預測光譜
  │     │     └── 古法三階熬煮計時器與配方箋匯出
  │     │
  │     ├── [ HerbMeridianMap.vue (五行臟腑經絡氣血引導圖) ]
  │     │     ├── 五行臟象詳解與相生相剋
  │     │     └── 專屬入經草藥互動卡片廊
  │     │
  │     ├── [ FavoritesCabinet.vue (我的本草藏書票標本室) ]
  │     │     └── 藏書票 Specimen Plate 卡片與 @media print 列印支援
  │     │
  │     └── [ Catalog View (傳統圖鑑模式) ]
  │           ├── [ TaiwanTerroirMap.vue (台灣風土產區探索卡) ]
  │           ├── [ HerbSidebar.vue (風土產區、民間情境、四氣、經絡多維篩選) ]
  │           ├── 工具列 (排序選單 + 圖鑑/清單檢視切換)
  │           └── [ HerbCard.vue (3D 傾斜卡片、流光層、標本號、風土標籤) ]
  │
  ├── [ HerbDetail.vue (展卷詳情頁：科屬、方言俗名、活性成分、風土故事、安全等級) ]
  ├── [ CommandPalette.vue (全域 Ctrl+K 快捷命令搜尋盤，支援方言俗名檢索) ]
  ├── [ HerbCompareModal.vue (跨藥材多維橫向對照表) ]
  └── [ HealthModal.vue (系統健康狀態與 Failover 節點演練) ]
```

---

## 2. 聲學設計體系 (Web Audio Soundscape)

本系統不依賴外部音效檔，採用瀏覽器原生 **Web Audio API** 演算法合成：
* **朱砂印章用印 (`playStamp`)**: 模擬古法朱砂印泥重重用印於宣紙之沉著低頻聲。
* **展卷微響 (`playScroll`)**: 模擬翻展古卷絲帛之細膩微響。
* **竹音擊節 (`playClick`)**: 模擬竹片輕敲之爽脆音效，頻率自 620Hz 指數衰減至 140Hz。
* **頌缽清磬 (`playChime`)**: 雙正弦波五度和弦共鳴 (528Hz & 792Hz)，長餘音殘響 1.2 秒。
* **水滴入茶 (`playWaterDrop`)**: 頻率從 350Hz 躍升至 980Hz 之水珠清脆感。
* **茶釜沸水 (`playBoiling`)**: 隨機頻率氣泡爆破合成。
* **山嵐松風 (`toggleAmbient`)**: 濾波粉紅噪音自然微風白噪音。
