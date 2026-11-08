<template>
  <div v-if="isOpen" class="manual-modal-overlay" @click.self="$emit('close')">
    <div class="manual-modal-container">
      <!-- 頂部牌匾標頭 -->
      <div class="manual-modal-header">
        <div class="manual-header-left">
          <div class="manual-seal-badge">冊</div>
          <div>
            <div class="manual-header-title">
              臺灣肯信本草研究室 · 完整使用者操作說明手冊
              <span class="manual-version-tag">v2.0 典藏指南</span>
            </div>
            <div class="manual-header-subtitle">
              Awwwards / Webby / FWA 級別東方數位圖鑑 · 13 大核心模組操作指引與情境速查
            </div>
          </div>
        </div>
        <div class="manual-header-actions">
          <button class="btn-download-manual" title="下載完整離線 Markdown 手冊 (USER_MANUAL.md)" @click="downloadMarkdown">
            <span>📥</span>
            <span>下載離線手冊</span>
          </button>
          <button class="manual-close-btn" title="關閉操作手冊" @click="$emit('close')">✕</button>
        </div>
      </div>

      <!-- 主體雙欄工作區 -->
      <div class="manual-modal-body">
        <!-- 左側：目錄索引導航 (TOC) -->
        <nav class="manual-toc-sidebar">
          <div class="toc-group-label">系統功能導覽目錄</div>
          <button
            v-for="item in tocItems"
            :key="item.id"
            class="toc-nav-item"
            :class="{ active: currentSection === item.id }"
            @click="switchSection(item.id)"
          >
            <span class="toc-icon">{{ item.icon }}</span>
            <span class="toc-label">{{ item.label }}</span>
            <span v-if="item.badge" class="toc-badge">{{ item.badge }}</span>
          </button>

          <!-- 底部快速捷徑：直接詢問 AGENT -->
          <div class="toc-agent-callout">
            <div class="toc-agent-title">🤖 不確定用哪個功能？</div>
            <p class="toc-agent-desc">可直接向「肯信小助手」描述您的生活或研究情境！</p>
            <button class="btn-toc-ask-agent" @click="jumpToAgent('這套系統有哪些核心功能與使用情境？')">
              <span>🍵</span>
              <span>前往茶堂詢問 AGENT</span>
            </button>
          </div>
        </nav>

        <!-- 右側：章節詳情內容展示區 -->
        <main class="manual-content-viewport">
          <!-- 章節 1：平台全景與核心理念 -->
          <section v-if="currentSection === 'overview'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">概</span>
              <div>
                <h3 class="section-title">平台全景與核心設計理念</h3>
                <div class="section-desc">國際殿堂級數位美學、四百年臺灣青草風土與產學合作典藏</div>
              </div>
            </div>

            <div class="section-prose">
              <p>
                「台灣肯信本草研究室 (Taiwan Kenshin Herb Research Lab)」融合傳統東方植物誌美學與現代前沿全端技術，以國際殿堂級數位設計大獎（Awwwards Site of the Day / Webby Awards / FWA）為標準打造。
              </p>

              <div class="feature-grid-3">
                <div class="feature-box">
                  <div class="fb-icon">🎓</div>
                  <h4>產學合作正式授權</h4>
                  <p>與<strong>中國醫藥大學 藥學院藥學系 黃世勳教授</strong>產學合作共同策劃典藏，收錄三十載全臺田野考證與專著精華。</p>
                </div>
                <div class="feature-box">
                  <div class="fb-icon">🌿</div>
                  <h4>風土常民文化智慧</h4>
                  <p>收錄 25+ 款指標性島嶼本草，涵蓋萬華百年青草巷退火心法、客庄辟邪大風草月子傳承與原民野生採集倫理。</p>
                </div>
                <div class="feature-box">
                  <div class="fb-icon">🤖</div>
                  <h4>RAG 專家語意茶堂</h4>
                  <p>建置 5 大 Persona（老茶師、客庄阿婆、黃教授、野菜獵人與肯信導航小助手），支援精準語意檢索與情境功能配對。</p>
                </div>
              </div>

              <div class="manual-callout callout-warning">
                <strong>⚖️ 法規嚴正聲明</strong>：本系統所有性味記載、古籍文獻、方劑調配與專家回答，純屬臺灣民間傳統草木飲食生活文化考證與生活茶飲分享，<strong>絕不具任何醫療效果宣稱，亦非醫療行為、處方或臨床診斷</strong>。
              </div>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="handleNavigate('home')">
                  <span>🏡 前往首頁探索 ➔</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 2：本草知識庫與臺灣風土產區探索互動地圖 -->
          <section v-if="currentSection === 'catalog'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">庫</span>
              <div>
                <h3 class="section-title">本草知識庫與臺灣風土產區地圖</h3>
                <div class="section-desc">收錄 25+ 味本土草藥、六大風土產區探索地圖與多維度側邊檢索</div>
              </div>
            </div>

            <div class="section-prose">
              <h4>🎯 操作步驟與核心工具</h4>
              <ol class="step-list">
                <li>
                  <strong>臺灣風土產區探索地圖 (`TaiwanTerroirMap`)</strong>：
                  點選地圖上方六大產區（北部青草巷、桃竹苗客庄、中彰投台地、嘉南平原、六堆高屏、花東原鄉），快速鎖定在地原生草藥。
                </li>
                <li>
                  <strong>多維度側邊篩選欄 (`HerbSidebar`)</strong>：
                  支援按「分類（青草茶/客家辟邪/原民野菜）」、「四氣五味（寒/涼/平/溫/熱）」、「十二經絡（肺/肝/脾/胃/腎）」、「生活情境（熬夜上火/月子擦澡/小兒沐浴）」及「用藥安全分級」精確過濾。
                </li>
                <li>
                  <strong>3D 卡片與清單檢視切換</strong>：
                  點選右上角「▦ 圖鑑」體驗具備鏡面流光與 3D 透視的標本卡，或切換「☰ 清單」進行密集表格查閱。
                </li>
              </ol>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="handleNavigate('catalog')">
                  <span>🌿 立即前往【本草知識庫】➔</span>
                </button>
                <button class="btn-action-secondary" @click="jumpToAgent('我想找客家產婦坐月子的大風草，哪裡可以查？')">
                  <span>🍵 向 AGENT 請教客家草藥</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 3：青草茶方劑調配研製所 -->
          <section v-if="currentSection === 'alchemy'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">研</span>
              <div>
                <h3 class="section-title">方劑研製所 · 青草茶調配實驗室</h3>
                <div class="section-desc">君臣佐使茶釜投入、四氣陰陽指針儀表、五味風味光譜與三階熬煮計時</div>
              </div>
            </div>

            <div class="section-prose">
              <h4>🧪 核心功能與調茶心法</h4>
              <ul class="bullet-list">
                <li><strong>茶釜調配槽</strong>：自由挑選 1 至 4 味草藥投入茶釜（如大花咸豐草、鳳尾草、甘草）。</li>
                <li><strong>四氣陰陽動態平衡指針</strong>：即時計算處方寒熱指數（-100 大寒 ➔ +100 大熱），動態指針偏轉並提供體質調養叮嚀。</li>
                <li><strong>五味滋味預測光譜</strong>：即時模擬苦、甘、辛、涼四維滋味比例雷達圖。</li>
                <li><strong>受納經絡臟腑共鳴</strong>：動態高亮金木水火土五行臟象受納反應。</li>
                <li><strong>古法三階熬煮計時器</strong>：武火急沸 (10m) ➔ 文火慢熬 (35m) ➔ 關火悶香 (15m)，搭配原生 Web Audio 氣泡沸水聲景與提示響音。</li>
                <li><strong>AI 神來一配</strong>：點擊「🎲 AI 神來一配」由演算法自動為您隨機配伍道地平衡茶方。</li>
              </ul>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="handleNavigate('alchemy')">
                  <span>🧪 立即前往【方劑研製所】➔</span>
                </button>
                <button class="btn-action-secondary" @click="jumpToAgent('我想自己調配青草茶飲，系統有什麼工具能用？')">
                  <span>🍵 向 AGENT 詢問配茶工具</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 4：全臺青草名店文化地圖與採買避坑指南 -->
          <section v-if="currentSection === 'shops'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">舖</span>
              <div>
                <h3 class="section-title">全臺青草名店文化地圖與採買指南</h3>
                <div class="section-desc">全島老字號青草名舖聚落、營業導覽、招牌茶飲與辨偽防坑實戰技巧</div>
              </div>
            </div>

            <div class="section-prose">
              <h4>🏪 老舖尋訪與辨真指南</h4>
              <div class="guide-cards-grid">
                <div class="guide-card">
                  <h5>🗺️ 全台風土名舖聚落</h5>
                  <p>收錄台北艋舺青草巷安立青草店、德安青草店、台中中德藥行、台南蓮玉湯等老舖歷史、特色與營業資訊。</p>
                </div>
                <div class="guide-card">
                  <h5>👃 採買避坑三訣</h5>
                  <p><strong>聞香</strong>：新鮮草料帶清新青草香，忌霉味；<strong>觀色</strong>：自然乾燥呈深綠或灰綠，過鮮防薰硫；<strong>防潮</strong>：密封遮光，生鮮 3 日內使用。</p>
                </div>
                <div class="guide-card">
                  <h5>🌿 依草藥反查老店</h5>
                  <p>在店家卡片上點擊草藥標籤，即可反向檢視有哪些老店販售該項藥材，實體採買零阻礙。</p>
                </div>
              </div>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="handleNavigate('shops')">
                  <span>🏪 立即前往【青草名店文化地圖】➔</span>
                </button>
                <button class="btn-action-secondary" @click="jumpToAgent('如何查詢全台各地老字號青草行與採買指南？')">
                  <span>🍵 向 AGENT 詢問青草老舖</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 5：草木書閣 · 典籍展閱、試閱與線上結帳 -->
          <section v-if="currentSection === 'books'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">閣</span>
              <div>
                <h3 class="section-title">草木書閣 · 專題典籍展閱與線上購書</h3>
                <div class="section-desc">收錄中醫大黃世勳教授產學合作巨著、線上試閱抽屜、結帳與消保法合規保障</div>
              </div>
            </div>

            <div class="section-prose">
              <h4>📚 經典書籍與購閱流程</h4>
              <ul class="bullet-list">
                <li><strong>《生化與草本的對話：臺灣本草三十載考證錄》</strong>：中國醫藥大學 藥學系黃世勳教授產學合作巨著，融會三十載全臺野外田野實證與現代生藥機轉。</li>
                <li><strong>線上免費試閱抽屜</strong>：點選書籍之「📖 試閱章節」，即可即時開卷研讀前言導讀與精華篇章。</li>
                <li><strong>實體典藏與電子書雙軌交付</strong>：支援線上購買實體精裝書或即時交付閱讀之授權電子書。</li>
                <li><strong>《消保法》第 19 條第 2 項合規宣告</strong>：結帳時提供明晰合規聲明（實體書享 7 日鑑賞期；電子書屬數位內容，授權交付後排除 7 日解除權）。</li>
                <li><strong>訂單查詢與個資脫敏遮罩</strong>：輸入 Email 反查訂單，系統自動對電話與收件地址實施安全掩碼。</li>
              </ul>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="handleNavigate('books')">
                  <span>📚 立即前往【草木書閣】➔</span>
                </button>
                <button class="btn-action-secondary" @click="jumpToAgent('我想買黃世勳教授的書，系統有線上購書功能嗎？')">
                  <span>🍵 向 AGENT 詢問購書事宜</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 6：風土達人諮詢茶堂與 AGENT 智慧導航 -->
          <section v-if="currentSection === 'consult'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">堂</span>
              <div>
                <h3 class="section-title">風土達人諮詢茶堂與 AGENT 智慧問答</h3>
                <div class="section-desc">5 大 Persona 專家陣容、RAG 檢索增強生成、標本引證 Citations 與系統功能導航</div>
              </div>
            </div>

            <div class="section-prose">
              <h4>🍵 6 大特色 Persona 諮詢風格</h4>
              <div class="expert-cards-mini-grid">
                <div class="exp-mini-card">
                  <div class="exp-mini-top">
                    <span class="exp-avatar">🍵</span>
                    <strong>萬華老茶師 林萬吉</strong>
                  </div>
                  <p>艋舺百年西昌街青草巷第三代，精於退火消暑、文火慢熬與護胃底氣。</p>
                </div>
                <div class="exp-mini-card">
                  <div class="exp-mini-top">
                    <span class="exp-avatar">👵</span>
                    <strong>客庄草藥阿婆 彭秀妹</strong>
                  </div>
                  <p>苗栗獅潭客庄老藥師，注重抹草辟邪、大風草坐月子擦澡與家常食療。</p>
                </div>
                <div class="exp-mini-card">
                  <div class="exp-mini-top">
                    <span class="exp-avatar">🎓</span>
                    <strong>黃世勳 教授 / 藥學博士</strong>
                  </div>
                  <p>中國醫藥大學真實產學合作學者，出身鹿港望族，融貫三十載田野實證與現代生藥學。</p>
                </div>
                <div class="exp-mini-card">
                  <div class="exp-mini-top">
                    <span class="exp-avatar">🍲</span>
                    <strong>李昭瑩 藥膳食療名師</strong>
                  </div>
                  <p>《藥膳學》編著者，文興出版權威，專精餐桌上的醫生、四氣五味食療與道地藥膳烹調。</p>
                </div>
                <div class="exp-mini-card">
                  <div class="exp-mini-top">
                    <span class="exp-avatar">🏹</span>
                    <strong>山林野菜獵人 督邁 (Dumay)</strong>
                  </div>
                  <p>花東縱谷阿美族採集者，傳承刺蔥昭和草野炊與敬畏土地永續倫理。</p>
                </div>
                <div class="exp-mini-card exp-highlight">
                  <div class="exp-mini-top">
                    <span class="exp-avatar">🧭</span>
                    <strong>肯信小助手（平台導航員）</strong>
                  </div>
                  <p>全站智慧導覽領航員，專責回答功能情境、操作路徑並提供一鍵跳轉按鈕！</p>
                </div>
              </div>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="handleNavigate('consult')">
                  <span>🍵 立即前往【諮詢茶堂】叩問 ➔</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 6.5：藥膳食療與餐桌養生指南 (根據《藥膳學》) -->
          <section v-if="currentSection === 'medicinal_diet'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">膳</span>
              <div>
                <h3 class="section-title">藥膳食療與餐桌養生指南</h3>
                <div class="section-desc">收錄《藥膳學》（李昭瑩・王儀絜・黃世勳 編著）110 項常用藥材、食材與臟腑部位食療</div>
              </div>
            </div>

            <div class="section-prose">
              <h4>🍲 核心特色與理論基礎</h4>
              <p>
                本系統依據文興出版《藥膳學》經典教材，完整收錄包含<strong>「餐桌上的醫生」</strong>（蔬菜類、果品類、糧穀豆類、肉禽水產類與臟腑部位）與<strong>「藥膳常用藥材」</strong>（溫熱藥、寒涼藥、平性藥）共 110 味道地食材與藥材。
              </p>

              <h4>🍳 經典藥膳料理與部位對應</h4>
              <ul class="bullet-list">
                <li><strong>臟腑部位與以形補形</strong>：如「天麻燉豬腦」（平肝熄風、行氣活血，頁54）、「杜仲燉豬腰」（補肝腎強筋骨，頁55）、「蓮子豬肚湯」（健脾開胃、補虛益氣，頁54）、「歸耆羊肉湯」（益氣養血、溫中暖腎，頁53）。</li>
                <li><strong>常用烹飪法解析</strong>：
                  <ul>
                    <li><strong>隔水燉（燉）</strong>：藥物與食物加入清湯，密封容器後隔水加熱，能完整保留藥效與原汁原味，香氣不散。</li>
                    <li><strong>燜與煨</strong>：文火慢燉使食材軟爛酥潤，讓藥膳成分深入滲透至食材纖維中。</li>
                    <li><strong>汆與滑炒</strong>：急火快炒或滾水短時間燙過，保留蔬菜類與果品類有效營養成分與爽脆口感。</li>
                  </ul>
                </li>
                <li><strong>衛福部規範合規</strong>：明確標註符合臺灣衛生福利部公告「可供食品使用之中藥材」215 項規範品項，落實日常餐桌藥膳之安全合法性。</li>
              </ul>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="handleNavigate('consult')">
                  <span>🍲 向【李昭瑩名師】請教藥膳食療 ➔</span>
                </button>
                <button class="btn-action-secondary" @click="jumpToAgent('我想了解天麻燉豬腦與隔水燉的烹調方法')">
                  <span>🍵 向小助手提問藥膳料理</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 7：藥材橫向多維對照比對 -->
          <section v-if="currentSection === 'compare'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">衡</span>
              <div>
                <h3 class="section-title">藥材多方橫向對照比對 (HerbCompareModal)</h3>
                <div class="section-desc">支援 2 至 4 味藥材並列剖析四氣五味、入經歸屬、化學成分與安全等級</div>
              </div>
            </div>

            <div class="section-prose">
              <h4>⚖️ 如何進行草藥多方比對</h4>
              <ol class="step-list">
                <li>在【本草知識庫】或【首頁精選】中，點擊任一草藥卡片右下角的 <strong>`+ 比對`</strong> 按鈕。</li>
                <li>點擊頂端導覽列上的 <strong>`⚖️ 比對`</strong> 膠囊按鈕，開啟跨藥材橫向對照視窗。</li>
                <li>視窗支援一鍵載入經典組合：
                  <ul>
                    <li>🔥 清熱退火雙雄：<strong>大花咸豐草</strong> vs <strong>鳳尾草</strong></li>
                    <li>🌿 客家辟邪二寶：<strong>抹草</strong> vs <strong>艾草</strong></li>
                    <li>🏹 原民山林辛香：<strong>刺蔥</strong> vs <strong>山苦瓜</strong></li>
                  </ul>
                </li>
              </ol>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="$emit('open-compare'); $emit('close');">
                  <span>⚖️ 立即開啟【藥材比對視窗】➔</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 8：五行臟腑經絡引導圖 -->
          <section v-if="currentSection === 'meridian'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">絡</span>
              <div>
                <h3 class="section-title">五行臟腑經絡氣血引導圖 (HerbMeridianMap)</h3>
                <div class="section-desc">五行相生相剋視覺化、十二經絡走向與入經草本直覺對照</div>
              </div>
            </div>

            <div class="section-prose">
              <p>
                以中醫五行（金/木/水/火/土）臟象學說為基底，將人體十二經絡視覺化呈現：
              </p>
              <ul class="bullet-list">
                <li>點選特定臟腑（例如：點擊<strong>「金 · 肺 / 大腸」</strong>），圖表立即高亮相生與相剋路徑。</li>
                <li>下方自動同步展列入該經絡之指標本草（如薄荷、魚腥草入肺經；大花咸豐草入大腸經），點選卡片可直接開卷閱讀。</li>
              </ul>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="handleNavigate('meridian')">
                  <span>🫀 立即前往【五行經絡圖】➔</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 9：典藏管理後台與權限管理 -->
          <section v-if="currentSection === 'admin'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">御</span>
              <div>
                <h3 class="section-title">典藏管理後台與數據中樞 (HerbAdminDashboard)</h3>
                <div class="section-desc">企業級 RBAC 角色、即時標本卡預覽、批次匯入/匯出、文章工作室與安全防護</div>
              </div>
            </div>

            <div class="section-prose">
              <h4>👑 5 大 RBAC 角色與專用通行憑證</h4>
              <div class="rbac-role-cards">
                <div class="rbac-card">
                  <div class="rbac-role-name">👑 至高管理員 (super_admin)</div>
                  <div class="rbac-role-desc">具備全庫最高權限，可管理使用者帳號、調整 LLM 金鑰、執行資料庫重置與全庫備份。</div>
                </div>
                <div class="rbac-card">
                  <div class="rbac-role-name">📜 本草策展師 (curator)</div>
                  <div class="rbac-role-desc">負責藥材 CRUD、所見即所得「即時標本票卡預覽」、批次匯入/線上工作台與專題文章生成。</div>
                </div>
                <div class="rbac-card">
                  <div class="rbac-role-name">🍵 本草諮詢顧問 (consultant)</div>
                  <div class="rbac-role-desc">負責專家 Persona 提示詞調整、RAG 諮詢沙盒 (Playground) 測試與文章內容審閱。</div>
                </div>
                <div class="rbac-card">
                  <div class="rbac-role-name">🔍 典藏觀察員 (auditor)</div>
                  <div class="rbac-role-desc">唯讀檢視權限，可查閱環形審計日誌與全庫數據分析報表。</div>
                </div>
              </div>

              <h4>🛠️ 後台核心功能總結</h4>
              <ul class="bullet-list">
                <li><strong>批次匯入與線上編輯工作台</strong>：提供野生草藥示範載入、JSON/CSV 解析，缺漏欄位即時校驗，編輯確認後一鍵入庫。</li>
                <li><strong>條件篩選多格式匯出</strong>：支援 JSON 備份檔、帶 UTF-8 BOM 之 CSV（Excel 雙擊不亂碼）與精美排版 Markdown 手冊。</li>
                <li><strong>專題文章生成工作室</strong>：自資料庫挑選本草 Grounding，套用名師口吻，指定上班族/長輩/學童等受眾快速生成專業專文。</li>
                <li><strong>金鑰安全防護</strong>：API 金鑰自動脫敏遮罩 (`sk-••••••••abcd`)，阻斷雲端 Metadata IP 防止 SSRF。</li>
              </ul>

              <div class="section-actions-row">
                <button class="btn-action-primary" @click="handleNavigate('admin')">
                  <span>⚙️ 立即前往【典藏管理後台】➔</span>
                </button>
              </div>
            </div>
          </section>

          <!-- 章節 10：常見生活與專業情境速查矩陣 -->
          <section v-if="currentSection === 'scenarios'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">策</span>
              <div>
                <h3 class="section-title">10 大常見生活與專業情境速查矩陣</h3>
                <div class="section-desc">依照您的需求直覺對照最佳工具，一鍵直接前往</div>
              </div>
            </div>

            <div class="scenarios-matrix-grid">
              <div v-for="(sc, idx) in scenariosList" :key="idx" class="scenario-item-card">
                <div class="sc-header">
                  <span class="sc-badge-num">情境 {{ idx + 1 }}</span>
                  <strong class="sc-title">{{ sc.title }}</strong>
                </div>
                <p class="sc-desc">{{ sc.desc }}</p>
                <div class="sc-tool-row">
                  <span class="sc-tool-tag">推薦工具：{{ sc.toolName }}</span>
                  <button class="btn-sc-go" @click="handleScenarioAction(sc)">
                    <span>前往 ➔</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- 章節 11：透過 AGENT 提問功能 -->
          <section v-if="currentSection === 'ask_agent'" class="manual-section-card">
            <div class="section-title-wrap">
              <span class="section-seal">問</span>
              <div>
                <h3 class="section-title">透過 AGENT 智慧問答尋找適用功能</h3>
                <div class="section-desc">在對話視窗描述任何使用情境，小助手即刻為您導航與生成跳轉按鈕</div>
              </div>
            </div>

            <div class="section-prose">
              <p>
                本系統的<strong>「風土達人諮詢茶堂 (`HerbConsultationLab`)」</strong>搭載了專屬的<strong>「🌱 肯信小助手（平台導航員）」</strong>，您可直接向它提問任何情境需求！
              </p>

              <div class="agent-qa-sample-box">
                <div class="qa-sample-header">💡 點擊下方常見情境問題，直接前往茶堂諮詢：</div>
                <div class="qa-sample-list">
                  <button
                    v-for="q in sampleAgentQueries"
                    :key="q"
                    class="btn-sample-query"
                    @click="jumpToAgent(q)"
                  >
                    <span>💬 {{ q }}</span>
                    <span class="sq-arrow">➔</span>
                  </button>
                </div>
              </div>

              <div class="agent-custom-input-card">
                <label class="custom-input-label">✍️ 或在下方輸入您想詢問的情境或功能：</label>
                <div class="custom-input-row">
                  <input
                    v-model="customAgentQuestion"
                    type="text"
                    class="custom-q-input"
                    placeholder="例如：我想找客家產婦坐月子的大風草，哪裡可以查？"
                    @keydown.enter="submitCustomQuestion"
                  />
                  <button
                    class="btn-submit-custom-q"
                    :disabled="!customAgentQuestion.trim()"
                    @click="submitCustomQuestion"
                  >
                    <span>🍵 送出詢問</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { audio } from '../services/audioService';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'switch-tab', 'open-compare', 'ask-agent-query']);

const currentSection = ref('overview');
const customAgentQuestion = ref('');

const tocItems = [
  { id: 'overview', icon: '📖', label: '平台全景與理念', badge: '必讀' },
  { id: 'catalog', icon: '🌿', label: '本草知識庫與風土地圖' },
  { id: 'alchemy', icon: '🧪', label: '方劑研製所與計時器', badge: '人氣' },
  { id: 'shops', icon: '🏪', label: '青草名店與採買指南' },
  { id: 'books', icon: '📚', label: '草木書閣與試閱購書' },
  { id: 'consult', icon: '🍵', label: '專家茶堂與 AGENT 問答' },
  { id: 'medicinal_diet', icon: '🍲', label: '藥膳食療與餐桌指南', badge: '新增' },
  { id: 'compare', icon: '⚖️', label: '藥材多方橫向比對' },
  { id: 'meridian', icon: '🫀', label: '五行經絡引導圖' },
  { id: 'admin', icon: '⚙️', label: '典藏管理後台與權限' },
  { id: 'scenarios', icon: '🎯', label: '11 大生活情境速查', badge: '速查' },
  { id: 'ask_agent', icon: '🤖', label: '透過 AGENT 提問功能' }
];

const scenariosList = [
  {
    title: '想查詢日常藥膳食療、臟腑燉湯與古法烹調',
    desc: '想了解天麻燉豬腦、杜仲豬腰、隔水燉或衛福部可供食品中藥材。',
    toolName: '李昭瑩名師 藥膳諮詢 (ConsultationLab)',
    tab: 'consult'
  },
  {
    title: '自製消暑退火青草茶，想掌握草藥寒熱屬性',
    desc: '想自己熬煮日常退火茶，需計算配方寒涼值並掌握大火與文火時間。',
    toolName: '方劑研製所 (HerbAlchemyLab)',
    tab: 'alchemy'
  },
  {
    title: '尋找客家給嬰兒辟邪沐浴或產婦坐月子的草藥',
    desc: '想查詢抹草、大風草、艾草的民俗應用、客語俗名與煎煮洗浴方式。',
    toolName: '本草知識庫 (Catalog)',
    tab: 'catalog'
  },
  {
    title: '尋訪台北艋舺百年青草巷的老字號青草舖',
    desc: '想實地走訪實體老字號青草店採買新鮮草料，避開品質不良藥材。',
    toolName: '全臺青草名店文化地圖 (AlliedShopsView)',
    tab: 'shops'
  },
  {
    title: '拜讀中醫大黃世勳教授的三十載本草踏查專著',
    desc: '想線上免費試閱黃世勳教授的經典生藥著作，或購買實體/電子書。',
    toolName: '草木書閣 (HerbBookshelfView)',
    tab: 'books'
  },
  {
    title: '熬夜口乾舌燥火氣大，想請教具體風土茶方建議',
    desc: '有明確體質生活困擾，想聽取萬華老茶師或生藥博士的專業見解。',
    toolName: '諮詢茶堂 (HerbConsultationLab)',
    tab: 'consult'
  },
  {
    title: '想橫向對照魚腥草與薄荷的功效與禁忌差異',
    desc: '想並列比較兩種草藥的性味、十二經絡歸屬與化學活性成分。',
    toolName: '藥材多方比對視窗 (HerbCompareModal)',
    action: 'compare'
  },
  {
    title: '想從中醫五行與經絡走向尋找入肺經的草本',
    desc: '探討人體金木水火土五行臟象，查看對應受納經絡之臺灣草本。',
    toolName: '五行經絡引導圖 (HerbMeridianMap)',
    tab: 'meridian'
  },
  {
    title: '身為網站策展師，想要批次匯入一批新草藥',
    desc: '手頭有野生草藥 JSON 或 CSV 檔，想使用線上表格校驗後批次入庫。',
    toolName: '典藏管理後台 (HerbAdminDashboard)',
    tab: 'admin'
  },
  {
    title: '想將整個知識庫匯出至 Excel 或編譯成 Markdown',
    desc: '研究或教學需要，需匯出帶 UTF-8 BOM 之 CSV 或精美 Markdown 手冊。',
    toolName: '典藏管理後台 - 資料匯出',
    tab: 'admin'
  },
  {
    title: '剛進入網站，不確定自己想做的事情該用哪個工具',
    desc: '直接向智慧小助手提問生活情境，由 AI 為您配對功能與直通跳轉。',
    toolName: '肯信小助手（平台導航員）',
    tab: 'consult'
  }
];

const sampleAgentQueries = [
  '我想了解天麻燉豬腦與隔水燉的藥膳烹調要訣',
  '這套系統有哪些核心功能與使用情境？',
  '我想自己調配青草茶飲，系統有什麼工具能用？',
  '如何查詢全台各地老字號青草行與採買指南？',
  '草木書閣如何線上試閱與購買書籍？',
  '我想橫向比對兩種草藥的性味與歸經，怎麼操作？',
  '典藏後台支援哪些管理功能與資料匯入？'
];

const switchSection = (sectionId) => {
  audio.playClick();
  currentSection.value = sectionId;
};

const handleNavigate = (tabName) => {
  audio.playClick();
  emit('close');
  emit('switch-tab', tabName);
};

const handleScenarioAction = (scenario) => {
  audio.playClick();
  emit('close');
  if (scenario.tab) {
    emit('switch-tab', scenario.tab);
  } else if (scenario.action === 'compare') {
    emit('open-compare');
  }
};

const jumpToAgent = (queryText) => {
  audio.playWaterDrop();
  emit('close');
  emit('ask-agent-query', queryText);
};

const submitCustomQuestion = () => {
  if (!customAgentQuestion.value.trim()) return;
  const q = customAgentQuestion.value.trim();
  customAgentQuestion.value = '';
  jumpToAgent(q);
};

const downloadMarkdown = () => {
  audio.playStamp();
  const link = document.createElement('a');
  link.href = '/USER_MANUAL.md';
  link.download = '臺灣肯信本草研究室_使用者操作說明手冊.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.manual-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.manual-modal-container {
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: 20px;
  width: 100%;
  max-width: 1100px;
  height: 85vh;
  max-height: 850px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  animation: modalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalScaleIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 頂部標頭 */
.manual-modal-header {
  padding: 20px 28px;
  background: var(--bg-subtle);
  border-bottom: 1px solid var(--border-card);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.manual-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.manual-seal-badge {
  width: 44px;
  height: 44px;
  background: var(--crimson-seal);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(185, 28, 28, 0.35);
  flex-shrink: 0;
}

.manual-header-title {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 700;
  color: var(--primary-deep);
  display: flex;
  align-items: center;
  gap: 10px;
}

.manual-version-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--amber-glow);
  color: var(--amber-deep);
  font-weight: 600;
  font-family: var(--font-sans);
}

.manual-header-subtitle {
  font-size: 12.5px;
  color: var(--ink-muted);
  margin-top: 3px;
}

.manual-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-download-manual {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: var(--bg-hover);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  color: var(--ink-heavy);
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-download-manual:hover {
  background: var(--bg-card);
  border-color: var(--amber-deep);
  color: var(--amber-deep);
}

.manual-close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  color: var(--ink-muted);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.manual-close-btn:hover {
  background: var(--crimson-seal);
  color: #fff;
  border-color: var(--crimson-seal);
}

/* 主體雙欄 */
.manual-modal-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 左側目錄 */
.manual-toc-sidebar {
  width: 260px;
  background: var(--bg-subtle);
  border-right: 1px solid var(--border-card);
  padding: 16px 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
}

.toc-group-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--ink-muted);
  padding: 4px 10px 8px;
  letter-spacing: 0.5px;
}

.toc-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--ink-body);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: all 0.18s;
  width: 100%;
}

.toc-nav-item:hover {
  background: var(--bg-hover);
  color: var(--primary-deep);
}

.toc-nav-item.active {
  background: var(--bg-card);
  border-color: var(--border-gold);
  color: var(--primary-deep);
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.toc-icon {
  font-size: 15px;
  flex-shrink: 0;
}

.toc-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toc-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 6px;
  background: var(--crimson-seal);
  color: #fff;
  font-weight: 600;
}

.toc-agent-callout {
  margin-top: auto;
  padding: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: 12px;
}

.toc-agent-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary-deep);
}

.toc-agent-desc {
  font-size: 11px;
  color: var(--ink-muted);
  margin: 4px 0 10px;
  line-height: 1.4;
}

.btn-toc-ask-agent {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 10px;
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-toc-ask-agent:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* 右側內容區 */
.manual-content-viewport {
  flex: 1;
  padding: 28px 36px;
  overflow-y: auto;
  background: var(--bg-card);
}

.manual-section-card {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-card);
}

.section-seal {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: var(--amber-glow);
  color: var(--amber-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 700;
  flex-shrink: 0;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 21px;
  font-weight: 700;
  color: var(--primary-deep);
  margin: 0;
}

.section-desc {
  font-size: 13px;
  color: var(--ink-muted);
  margin-top: 4px;
}

.section-prose {
  color: var(--ink-body);
  font-size: 14.5px;
  line-height: 1.7;
}

.section-prose h4 {
  font-family: var(--font-serif);
  font-size: 16px;
  color: var(--primary-deep);
  margin: 20px 0 10px;
}

.feature-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.feature-box {
  background: var(--bg-subtle);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 16px;
}

.fb-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.feature-box h4 {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--primary-deep);
  margin: 0 0 6px;
}

.feature-box p {
  font-size: 12.5px;
  color: var(--ink-muted);
  margin: 0;
  line-height: 1.5;
}

.manual-callout {
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 13px;
  margin: 20px 0;
  line-height: 1.5;
}

.callout-warning {
  background: rgba(185, 28, 28, 0.06);
  border-left: 4px solid var(--crimson-seal);
  color: var(--ink-heavy);
}

.step-list, .bullet-list {
  padding-left: 20px;
  margin: 12px 0 20px;
}

.step-list li, .bullet-list li {
  margin-bottom: 10px;
  font-size: 14px;
}

.guide-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin: 16px 0;
}

.guide-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 14px;
}

.guide-card h5 {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-deep);
  margin: 0 0 8px;
}

.guide-card p {
  font-size: 12.5px;
  color: var(--ink-muted);
  margin: 0;
  line-height: 1.5;
}

.expert-cards-mini-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 16px 0;
}

.exp-mini-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 14px;
}

.exp-highlight {
  border-color: var(--border-gold);
  background: var(--bg-hover);
}

.exp-mini-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 14px;
  color: var(--primary-deep);
}

.exp-avatar {
  font-size: 20px;
}

.exp-mini-card p {
  font-size: 12px;
  color: var(--ink-muted);
  margin: 0;
  line-height: 1.45;
}

.rbac-role-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 14px 0 20px;
}

.rbac-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border-card);
  border-radius: 10px;
  padding: 12px 14px;
}

.rbac-role-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 4px;
}

.rbac-role-desc {
  font-size: 11.5px;
  color: var(--ink-muted);
  line-height: 1.4;
}

/* 10 大情境矩陣 */
.scenarios-matrix-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.scenario-item-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;
}

.scenario-item-card:hover {
  border-color: var(--border-gold);
  background: var(--bg-hover);
  transform: translateY(-2px);
}

.sc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.sc-badge-num {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--primary-deep);
  color: #fff;
  font-weight: 700;
}

.sc-title {
  font-size: 13.5px;
  color: var(--ink-heavy);
}

.sc-desc {
  font-size: 12px;
  color: var(--ink-muted);
  line-height: 1.45;
  margin: 0 0 12px;
}

.sc-tool-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px dashed var(--border-card);
  padding-top: 10px;
  margin-top: auto;
}

.sc-tool-tag {
  font-size: 11.5px;
  color: var(--primary-deep);
  font-weight: 600;
}

.btn-sc-go {
  padding: 4px 10px;
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 11.5px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-sc-go:hover {
  opacity: 0.9;
}

/* AGENT 問答範例區塊 */
.agent-qa-sample-box {
  background: var(--bg-subtle);
  border: 1px solid var(--border-gold);
  border-radius: 12px;
  padding: 18px;
  margin: 16px 0;
}

.qa-sample-header {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 12px;
}

.qa-sample-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-sample-query {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  color: var(--ink-heavy);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-sample-query:hover {
  background: var(--bg-hover);
  border-color: var(--amber-deep);
  color: var(--primary-deep);
  transform: translateX(4px);
}

.sq-arrow {
  color: var(--amber-deep);
  font-weight: bold;
}

.agent-custom-input-card {
  margin-top: 20px;
}

.custom-input-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-heavy);
  margin-bottom: 8px;
}

.custom-input-row {
  display: flex;
  gap: 10px;
}

.custom-q-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--border-card);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--ink-heavy);
  font-size: 13.5px;
  outline: none;
  transition: border-color 0.2s;
}

.custom-q-input:focus {
  border-color: var(--primary-deep);
}

.btn-submit-custom-q {
  padding: 10px 18px;
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-submit-custom-q:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 操作按鈕排 */
.section-actions-row {
  margin-top: 28px;
  display: flex;
  gap: 12px;
}

.btn-action-primary {
  padding: 10px 20px;
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-action-secondary {
  padding: 10px 18px;
  background: var(--bg-subtle);
  border: 1px solid var(--border-card);
  color: var(--ink-heavy);
  border-radius: 8px;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action-secondary:hover {
  background: var(--bg-hover);
  border-color: var(--amber-deep);
  color: var(--primary-deep);
}

/* 響應式 */
@media (max-width: 900px) {
  .manual-modal-body {
    flex-direction: column;
  }
  .manual-toc-sidebar {
    width: 100%;
    max-height: 180px;
    border-right: none;
    border-bottom: 1px solid var(--border-card);
  }
  .feature-grid-3, .guide-cards-grid, .expert-cards-mini-grid, .scenarios-matrix-grid, .rbac-role-cards {
    grid-template-columns: 1fr;
  }
}
</style>
