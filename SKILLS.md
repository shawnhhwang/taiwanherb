編碼準則：
Rule 1：Think Before Coding（先想再寫）：不要做隱性假設、要明說在假設什麼；面對 trade-off 攤開來討論；不確定時直接問、不要猜；存在更簡單做法時要反對複雜方案
Rule 2：Simplicity First（先求簡單）：寫能解決問題的最小程式碼；不寫推測性功能、不為一次性程式碼建抽象層；資深工程師會說太複雜的設計就要簡化
Rule 3：Surgical Changes（外科式修改）：只動該動的、不要「順手改善」相鄰程式碼、註解、格式；不重構沒壞的東西；要配合既有風格
Rule 4：Goal-Driven Execution（目標導向執行）：定義成功標準、迭代到驗證為止；不告訴 Claude 步驟、告訴它「成功長什麼樣子」讓它自己 loop
Rule 5：只把 Claude 用於需要判斷的任務（分類、起草、摘要、抽取）、確定性決策（重試 503、路由、status code 處理、確定性轉換）用一般程式碼處理
Rule 6：Token budget 不是建議—單任務 4,000 tokens、單 session 30,000 tokens 為上限、接近 budget 時要主動摘要重啟、不要無聲突破
Rule 7：兩個衝突的程式碼模式要「點明選一個」（取較新、較有測試的）、解釋為什麼選、把另一個標記待清理；混合兩種模式是最差選擇
Rule 8：寫程式碼前要先讀懂—讀檔案 exports、直接 caller、共用 utility；「看起來無關（looks orthogonal）」是最危險的措辭、不確定就要問
Rule 9：測試要驗證「意圖」、不只驗證「行為」—能寫一個「業務邏輯改變時會失敗」的測試才算合格；否則只是讓 Claude 自信、實際保護力為零
Rule 10：多步驟任務要 checkpoint—每完成一步就要總結「做了什麼、驗證了什麼、剩什麼」；無法清楚描述狀態時不要繼續
Rule 11：配合既有 codebase 慣例、即使你不同意—snake_case 就 snake_case、class component 就 class component；不認同時把它當另一場討論、不要單方面分叉
Rule 12：失敗要大聲—「migration 完成」不對如果跳過 30 筆、「測試通過」不對如果跳過任何一個；預設「主動揭露不確定」、不要「藏起不確定」

## 本專案規範補充 (Node.js + Vue.js Stack)
* 後端架構：遵循 Express Layered Architecture (Controllers -> Services -> Repositories -> DbFactory)。
* API 封裝：所有 API 均強制透過 `ApiResponse.ok()` 或 `ApiResponse.fail()` 包裝，確保前端錯誤處理一致。
* 前端架構：遵循 Vue 3 Composition API `<script setup>` 語法，狀態單向流動，模組職責清晰。
* 測試規範：所有核心路由與功能更動必須通過 `npm test` 驗證。