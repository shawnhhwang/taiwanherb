<template>
  <div class="alchemy-lab-container">
    <!-- 頂部殿堂級茶堂牌匾 -->
    <div class="alchemy-banner">
      <div class="alchemy-banner-content">
        <div class="alchemy-seal-badge">
          <span class="banner-seal">方劑</span>
          <span class="banner-badge-text">TAIWAN HERB ALCHEMY LAB · 角色傳承名方與 AI 神來一配實驗室</span>
        </div>
        <h2 class="alchemy-main-title">
          <span>格物致知，君臣佐使，</span>
          <em>草木方劑研製所 · AI 神來一配實驗室</em>
        </h2>
        <p class="alchemy-subtitle">
          收錄 5 大風土專家角色 25 道傳承秘方（茶飲、藥浴、敷膏、四季養生與臟腑藥膳），提供自由茶釜調配、AI 神來一配意圖演算，與道地專家 LLM 客製配方建議。
        </p>
      </div>
    </div>

    <!-- 古早常民生活茶飲與非醫療宣告 -->
    <div class="alchemy-legal-strip">
      <div class="strip-icon">⚖️</div>
      <div class="strip-text">
        <strong>【生活茶飲文化與非醫療宣告】</strong>
        本研製所所載之方劑配比、君臣佐使與 AI 實驗配伍，純粹說明臺灣傳統民間生活茶飲、民俗外敷與藥浴文化記錄，<strong>非屬醫療院所處方，亦無宣稱任何疾病療效</strong>。個人體質虛寒、特殊病徵或孕產婦女，請務必尋求合格醫師辨證。
      </div>
    </div>

    <!-- 頂部三大實驗功能導覽分頁 (橫向切換) -->
    <div class="alchemy-tabs-nav">
      <button
        class="tab-switch-btn"
        :class="{ active: currentTab === 'roles' }"
        @click="switchTab('roles')"
      >
        <span class="tab-icon">🍵</span>
        <span class="tab-title">角色傳承名方庫 (25道)</span>
      </button>

      <button
        class="tab-switch-btn"
        :class="{ active: currentTab === 'kettle' }"
        @click="switchTab('kettle')"
      >
        <span class="tab-icon">🧪</span>
        <span class="tab-title">茶釜調配與 AI 神來一配</span>
      </button>

      <button
        class="tab-switch-btn"
        :class="{ active: currentTab === 'consult' }"
        @click="switchTab('consult')"
      >
        <span class="tab-icon">🤖</span>
        <span class="tab-title">專家 LLM AI 客製配方建議</span>
      </button>
    </div>

    <!-- ============================================== -->
    <!-- 分頁一：角色傳承經典名方庫 (Roles Classic Formulas) -->
    <!-- ============================================== -->
    <div v-if="currentTab === 'roles'" class="roles-formulas-section">
      <!-- 篩選列 -->
      <div class="roles-filter-bar">
        <!-- 專家篩選 -->
        <div class="filter-cluster">
          <span class="cluster-label">傳承專家：</span>
          <div class="pills-cluster">
            <button
              v-for="exp in expertOptions"
              :key="exp.id"
              class="filter-pill-btn"
              :class="{ active: selectedExpertId === exp.id }"
              @click="setExpertFilter(exp.id)"
            >
              {{ exp.name }}
            </button>
          </div>
        </div>

        <!-- 類型篩選 -->
        <div class="filter-cluster">
          <span class="cluster-label">劑型類型：</span>
          <div class="pills-cluster">
            <button
              v-for="t in typeOptions"
              :key="t.id"
              class="filter-pill-btn"
              :class="{ active: selectedType === t.id }"
              @click="setTypeFilter(t.id)"
            >
              {{ t.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- 名方清單網格 -->
      <div v-if="isLoadingFormulas" class="loading-state">
        <div class="spinner">🌿</div>
        <div>翻閱專家傳承方劑秘笈中...</div>
      </div>

      <div v-else-if="filteredFormulas.length === 0" class="empty-state">
        <div class="empty-icon">🍃</div>
        <h4>未找到符合條件的傳承配方</h4>
        <button class="btn-reset" @click="resetFormulaFilters">顯示全部名方</button>
      </div>

      <div v-else class="formulas-grid">
        <div
          v-for="formula in filteredFormulas"
          :key="formula.id"
          class="formula-card"
        >
          <div class="formula-card-top">
            <div class="formula-type-tag" :class="formula.type">
              {{ formulaTypeLabel(formula.type) }}
            </div>
            <div class="formula-expert-tag">
              傳承：<strong>{{ formula.expertName }}</strong> ({{ formula.expertTitle }})
              <span
                class="formula-scholar-badge"
                :class="formula.expertId === 'pharmacist_phd' ? 'real' : 'virtual'"
              >
                {{ formula.expertId === 'pharmacist_phd' ? '🎓 真實學者' : '🎭 知識聊天助理' }}
              </span>
              <a
                v-if="formula.expertId === 'pharmacist_phd'"
                href="https://webap.cmu.edu.tw/TchEportfolio/index_1/sshuang"
                target="_blank"
                rel="noopener noreferrer"
                class="formula-cmu-link"
                @click.stop
              >
                🔗 Eportfolio ↗
              </a>
            </div>
          </div>

          <h3 class="formula-name">{{ formula.name }}</h3>
          <p class="formula-story">{{ formula.story }}</p>

          <!-- 草藥組成與比例 (君臣佐使) -->
          <div class="formula-composition-box">
            <div class="box-label">🌿 君臣佐使配伍明細：</div>
            <div class="ingredients-list">
              <div
                v-for="(ing, idx) in formula.composition"
                :key="idx"
                class="ingredient-item"
              >
                <span class="role-badge" :class="ing.role">{{ ing.role }}</span>
                <span class="ing-name">{{ ing.herbName }}</span>
                <span class="ing-ratio">{{ ing.ratio }}</span>
                <span class="ing-action">({{ ing.action }})</span>
              </div>
            </div>
          </div>

          <!-- 熬煮/製作指南 -->
          <div class="formula-instructions-box">
            <div class="inst-label">🍵 煎熬製備工藝：</div>
            <p class="inst-desc">{{ formula.instructions }}</p>
          </div>

          <!-- 警語 -->
          <div v-if="formula.cautions" class="formula-caution-box">
            ⚠️ <strong>叮嚀：</strong>{{ formula.cautions }}
          </div>

          <!-- 底部操作按鈕 -->
          <div class="formula-card-footer">
            <button
              class="btn-load-into-pot"
              @click="loadFormulaToPot(formula)"
            >
              <span>🧪 倒入茶釜調配研製 ➔</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- 分頁二：茶釜調配與 AI 神來一配 (Cauldron & Divine Blend) -->
    <!-- ============================================== -->
    <div v-else-if="currentTab === 'kettle'" class="kettle-alchemy-section">
      <!-- 經典古法名方快速選單 + AI 神來一配按鈕 -->
      <div class="preset-formulas-bar">
        <div class="quick-presets-group">
          <span class="preset-label">快速名方：</span>
          <button
            v-for="preset in quickPresets"
            :key="preset.name"
            class="preset-pill"
            @click="loadQuickPreset(preset)"
          >
            🍵 {{ preset.name }}
          </button>
          <button class="preset-pill reset-pill" @click="clearPot">清空釜中草藥</button>
          <button
            class="preset-pill saved-formulas-pill"
            :class="{ active: isSavedDrawerOpen }"
            @click="isSavedDrawerOpen = !isSavedDrawerOpen"
            title="檢視我保存的私房配方庫"
          >
            📜 私房配方庫 ({{ savedFormulas.length }})
          </button>
        </div>

        <!-- 🎲 AI 神來一配特色按鈕群 -->
        <div class="divine-blend-actions">
          <button
            class="btn-divine-blend"
            :class="{ loading: isBlending }"
            :disabled="isBlending"
            @click="triggerDivineBlend"
          >
            <span class="dice-icon">{{ isBlending ? '🌀' : '🎲' }}</span>
            <span>AI 神來一配 (Divine Blend)</span>
          </button>
          <select v-model="divineIntent" class="select-intent-dropdown">
            <option value="清熱退火">🎯 意圖：清熱退火</option>
            <option value="夏日消暑">🎯 意圖：夏日消暑</option>
            <option value="藥膳食療">🍲 意圖：藥膳食療燉補</option>
            <option value="美容養顏">✨ 意圖：美容美白養顏</option>
            <option value="除濕利水">🎯 意圖：除濕利水</option>
            <option value="元氣補氣">🎯 意圖：元氣補氣</option>
            <option value="安神舒眠">🎯 意圖：安神舒眠</option>
            <option value="潤喉生津">🎯 意圖：潤喉生津</option>
            <option value="隨機平衡">🎯 意圖：隨機平衡調和</option>
          </select>
        </div>
      </div>

      <!-- 📜 我的私房配方箋庫抽屜 (Saved Formulas Drawer) -->
      <div v-if="isSavedDrawerOpen" class="saved-formulas-drawer">
        <div class="drawer-header">
          <div class="drawer-title-group">
            <span class="drawer-seal">私房</span>
            <strong>我的私房配方庫 (共 {{ savedFormulas.length }} 首)</strong>
            <span class="drawer-hint">點選任一方劑可一鍵倒入茶釜重現或檢視箋卷</span>
          </div>
          <button class="btn-close-drawer" @click="isSavedDrawerOpen = false">✕ 收起</button>
        </div>
        <div v-if="savedFormulas.length === 0" class="saved-empty-box">
          <span>🍵</span>
          <span>尚無保存的私房配方。請於茶釜投入草藥後，點擊下方「📜 保存配方箋」珍藏您的道地調和方！</span>
        </div>
        <div v-else class="saved-cards-grid">
          <div v-for="sf in savedFormulas" :key="sf.id" class="saved-formula-card">
            <div class="saved-card-top">
              <span class="saved-date-tag">{{ sf.createdAt || '自調方' }} · {{ sf.solarTermName ? `${sf.solarTermName}當令` : '節令調和' }}</span>
              <span class="saved-score-badge" :class="sf.balanceScore >= 80 ? 'good' : 'fair'">
                {{ sf.balanceScore }}分 · {{ sf.balanceVerdict || '調和' }}
              </span>
            </div>
            <h4 class="saved-name">{{ sf.name }}</h4>
            <div class="saved-herbs-chips">
              <span v-for="sh in sf.herbs" :key="sh.name" class="saved-herb-chip" :class="`role-${sh.roleCode || 'jun'}`">
                <small>{{ sh.roleBadge || '🌿' }}</small> {{ sh.name }}
              </span>
            </div>
            <div class="saved-actions-row">
              <button class="btn-saved-load" @click="loadSavedFormulaToPot(sf)" title="將此配方載入茶釜">
                🧪 倒入茶釜
              </button>
              <button class="btn-saved-view" @click="viewSavedFormulaTicket(sf)" title="查看並印製配方箋">
                📜 檢視箋卷
              </button>
              <button class="btn-saved-delete" @click="deleteSavedFormula(sf.id)" title="刪除此配方">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>


      <!-- AI 神來一配靈感籤卷 Toast / 提示橫幅 -->
      <div v-if="blendDecree" class="divine-decree-banner">
        <div class="decree-header">
          <span class="decree-seal">籤卷</span>
          <span class="decree-title">【AI 神來一配靈感籤卷】{{ blendDecree.decreeName }}</span>
          <button class="decree-close" @click="blendDecree = null">✕</button>
        </div>
        <p class="decree-desc">{{ blendDecree.decreeStory }}</p>
        <div v-if="blendDecree.harmonizeMessage" class="decree-harmonize-pill">
          <span>⚖️ {{ blendDecree.harmonizeMessage }}</span>
        </div>
        <div v-if="blendDecree.conflictWarnings?.length" class="decree-warnings">
          <span v-for="(warn, wIdx) in blendDecree.conflictWarnings" :key="wIdx" class="warn-pill">
            ⚠️ {{ warn }}
          </span>
        </div>
      </div>

      <div class="alchemy-workspace">
        <!-- 左欄：茶釜調配槽與草藥投入區 -->
        <div class="kettle-stage-card">
          <div class="kettle-illustration-box">
            <div class="steam-vapors" :class="{ boiling: isBoiling }">
              <span class="vapor v1"></span>
              <span class="vapor v2"></span>
              <span class="vapor v3"></span>
            </div>

            <div class="kettle-graphic">
              <div class="kettle-lid"></div>
              <div class="kettle-belly" :class="{ 'kettle-heat': isBoiling }">
                <div class="kettle-liquid" :style="liquidStyle">
                  <div class="liquid-bubble b1"></div>
                  <div class="liquid-bubble b2"></div>
                  <div class="liquid-bubble b3"></div>
                </div>
              </div>
              <div class="kettle-base"></div>
            </div>

            <div class="kettle-summary-tag">
              釜中草藥：<strong>{{ selectedHerbs.length }} / 4</strong> 味
            </div>
          </div>

          <!-- 釜中已選草藥清單 (動態君臣佐使角色徽章) -->
          <div class="selected-herbs-list">
            <div v-if="selectedHerbs.length === 0" class="empty-kettle-notice">
              <span>🍃</span>
              <span>茶釜尚空，請點選上方「AI 神來一配」或下方藥櫃投入草藥。</span>
            </div>

            <div
              v-for="herb in selectedHerbs"
              :key="herb.id"
              class="pot-herb-chip"
              :class="`role-chip-${getHerbAssignedRole(herb.id).roleCode}`"
            >
              <span class="herb-role-badge" :class="`badge-${getHerbAssignedRole(herb.id).roleCode}`">
                {{ getHerbAssignedRole(herb.id).badge }}
              </span>
              <span class="herb-chip-name">{{ herb.name }}</span>
              <span class="herb-chip-nature">({{ herb.nature }})</span>
              <span class="herb-chip-share">{{ getHerbAssignedRole(herb.id).share }}</span>
              <button class="remove-chip-btn" title="移出茶釜" @click="removeHerb(herb.id)">✕</button>
            </div>
          </div>

          <!-- 待選草藥貨架 (點擊加入) -->
          <div class="shelf-selection-box">
            <div class="shelf-header-row">
              <h4 class="shelf-title">🌿 百草藥櫃 (點擊投入茶釜)</h4>
              <input
                v-model="shelfSearch"
                type="text"
                placeholder="過濾藥名/性味..."
                class="shelf-search-input"
              />
            </div>
            <div class="shelf-grid">
              <button
                v-for="herb in filteredShelfHerbs"
                :key="herb.id"
                class="shelf-herb-btn"
                :class="{ 'in-pot': isInPot(herb.id) }"
                :disabled="isInPot(herb.id) || selectedHerbs.length >= 4"
                @click="addHerb(herb)"
              >
                <span class="shelf-herb-name">{{ herb.name }}</span>
                <span class="shelf-herb-tag">{{ herb.nature }} · 入{{ herb.channels?.[0] || '經' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 右欄：陰陽寒熱指針、滋味光譜、經絡激發與熬煮定時器 -->
        <div class="analysis-stage-card">
          <!-- ⚖️ 君臣佐使配伍平衡天平 (Jun-Chen-Zuo Equilibrium Compass) -->
          <div class="equilibrium-section">
            <div class="equilibrium-header">
              <div class="eq-title-group">
                <h3 class="analysis-heading" style="margin-bottom: 4px;">⚖️ 君臣佐使配伍平衡天平</h3>
                <span class="eq-score-badge" :class="eqScoreClass">
                  {{ junChenZuoBalance.overallBalanceScore }} 分 · {{ junChenZuoBalance.grade }}
                </span>
              </div>
              <!-- 🪄 一鍵 AI 臣佐君平衡調和按鈕 -->
              <button
                class="btn-auto-harmonize"
                :class="{ loading: isHarmonizing }"
                :disabled="isHarmonizing || selectedHerbs.length === 0"
                @click="triggerAutoHarmonize"
                title="由 AI 演算缺失角色，自動補入最佳佐使草藥化解偏性"
              >
                <span class="btn-sparkle">{{ isHarmonizing ? '🌀' : '🪄' }}</span>
                <span>AI 一鍵臣佐君平衡調和</span>
              </button>
            </div>

            <!-- 總平衡度進度條 -->
            <div class="eq-meter-wrapper">
              <div class="eq-meter-track">
                <div
                  class="eq-meter-fill"
                  :class="eqMeterClass"
                  :style="{ width: `${junChenZuoBalance.overallBalanceScore}%` }"
                ></div>
              </div>
              <div class="eq-meter-hints">
                <span>孤君寡助 (偏偏不諧)</span>
                <span>臣佐相得 (調暢)</span>
                <span>四象大和 (君臣佐使完備)</span>
              </div>
            </div>

            <!-- 四象法度卡片 2x2 網格 -->
            <div class="eq-roles-grid">
              <!-- 君藥卡 -->
              <div class="eq-role-card jun" :class="{ empty: !junChenZuoBalance.analysis.junDominance }">
                <div class="role-card-top">
                  <span class="role-pillar-badge jun">👑 君藥 (主導攻堅)</span>
                  <span class="role-score-text">{{ junChenZuoBalance.analysis.junDominance }}%</span>
                </div>
                <div class="role-herb-name">{{ junChenZuoBalance.junHerb ? `${junChenZuoBalance.junHerb.name} (${junChenZuoBalance.junHerb.nature})` : '尚缺君藥統領' }}</div>
                <div class="role-herb-duty">{{ junChenZuoBalance.junHerb ? '主攻病機與核心訴求 (約佔40%)' : '需選入具核心發散/清解/補氣之力之藥材' }}</div>
              </div>

              <!-- 臣藥卡 -->
              <div class="eq-role-card chen" :class="{ empty: junChenZuoBalance.analysis.chenAssistance < 60 }">
                <div class="role-card-top">
                  <span class="role-pillar-badge chen">🛡️ 臣藥 (輔翼增效)</span>
                  <span class="role-score-text">{{ junChenZuoBalance.analysis.chenAssistance }}%</span>
                </div>
                <div class="role-herb-name">{{ junChenZuoBalance.chenHerb ? `${junChenZuoBalance.chenHerb.name} (${junChenZuoBalance.chenHerb.nature})` : '尚缺臣藥相輔' }}</div>
                <div class="role-herb-duty">{{ junChenZuoBalance.chenHerb ? '協同君藥加強腑臟受納 (約佔28%)' : '建議搭配同氣相求之草藥強化主效' }}</div>
              </div>

              <!-- 佐藥卡 -->
              <div class="eq-role-card zuo" :class="{ empty: junChenZuoBalance.analysis.zuoTempering < 60 }">
                <div class="role-card-top">
                  <span class="role-pillar-badge zuo">⚖️ 佐藥 (制偏護胃)</span>
                  <span class="role-score-text">{{ junChenZuoBalance.analysis.zuoTempering }}%</span>
                </div>
                <div class="role-herb-name">{{ junChenZuoBalance.zuoHerb ? `${junChenZuoBalance.zuoHerb.name} (${junChenZuoBalance.zuoHerb.nature})` : '佐藥偏弱 (易過偏)' }}</div>
                <div class="role-herb-duty">{{ junChenZuoBalance.zuoHerb ? '制衡苦寒或燥性，護衛脾胃 (約佔18%)' : '寒涼過盛需微溫或甘平佐制，以免傷及胃陽' }}</div>
              </div>

              <!-- 使藥卡 -->
              <div class="eq-role-card shi" :class="{ empty: junChenZuoBalance.analysis.shiHarmonizing < 60 }">
                <div class="role-card-top">
                  <span class="role-pillar-badge shi">🕊️ 使藥 (引經調和)</span>
                  <span class="role-score-text">{{ junChenZuoBalance.analysis.shiHarmonizing }}%</span>
                </div>
                <div class="role-herb-name">{{ junChenZuoBalance.shiHerb ? `${junChenZuoBalance.shiHerb.name} (${junChenZuoBalance.shiHerb.nature})` : '缺乏使藥調和' }}</div>
                <div class="role-herb-duty">{{ junChenZuoBalance.shiHerb ? '引藥歸經入絡、調和百草口感 (約佔14%)' : '可配入甘草調百藥，或薄荷輕揚宣透' }}</div>
              </div>
            </div>

            <!-- 診斷與調和心法講評 -->
            <div class="eq-verdict-banner" :class="eqStatusClass">
              <div class="verdict-icon">{{ junChenZuoBalance.status === 'balanced' ? '💮' : '⚠️' }}</div>
              <div class="verdict-body">
                <div class="verdict-title">{{ junChenZuoBalance.diagnosis }}</div>
                <div class="verdict-advice">💡 <strong>配伍調和指南：</strong>{{ junChenZuoBalance.harmonyAdvice }}</div>
              </div>
            </div>
          </div>

          <!-- 陰陽四氣指針儀表 -->
          <div class="gauge-section">
            <h3 class="analysis-heading">⚖️ 四氣陰陽平衡分析</h3>
            <div class="balance-gauge-wrapper">
              <div class="balance-labels">
                <span class="label-cold">大寒涼 (清解排毒)</span>
                <span class="label-neutral">平性 (中和溫潤)</span>
                <span class="label-warm">溫熱 (行氣溫陽)</span>
              </div>
              <div class="gauge-track">
                <div class="gauge-pointer" :style="{ left: `${gaugePercentage}%` }">
                  <div class="pointer-tip"></div>
                </div>
              </div>
            </div>
            <div class="balance-verdict-box" :class="balanceTypeClass">
              <strong>【方劑辨性】{{ balanceVerdict.title }}</strong>
              <p>{{ balanceVerdict.description }}</p>
            </div>
          </div>

          <!-- 五味滋味圖譜 -->
          <div class="flavor-section">
            <h3 class="analysis-heading">🍵 五味滋味預測光譜</h3>
            <div class="flavor-bars-grid">
              <div class="flavor-bar-item">
                <span class="flavor-name">微苦清降</span>
                <div class="bar-outer"><div class="bar-fill bitter" :style="{ width: `${flavorScore.bitter}%` }"></div></div>
                <span class="bar-val">{{ flavorScore.bitter }}%</span>
              </div>
              <div class="flavor-bar-item">
                <span class="flavor-name">甘醇回甘</span>
                <div class="bar-outer"><div class="bar-fill sweet" :style="{ width: `${flavorScore.sweet}%` }"></div></div>
                <span class="bar-val">{{ flavorScore.sweet }}%</span>
              </div>
              <div class="flavor-bar-item">
                <span class="flavor-name">芳香行氣</span>
                <div class="bar-outer"><div class="bar-fill pungent" :style="{ width: `${flavorScore.pungent}%` }"></div></div>
                <span class="bar-val">{{ flavorScore.pungent }}%</span>
              </div>
              <div class="flavor-bar-item">
                <span class="flavor-name">生津清涼</span>
                <div class="bar-outer"><div class="bar-fill cool" :style="{ width: `${flavorScore.cool}%` }"></div></div>
                <span class="bar-val">{{ flavorScore.cool }}%</span>
              </div>
            </div>
          </div>

          <!-- 五行臟腑引經共鳴 -->
          <div class="meridian-resonance-section">
            <h3 class="analysis-heading">🫀 五臟經絡受納共鳴</h3>
            <div class="meridian-pills-row">
              <div
                v-for="elem in meridianElements"
                :key="elem.organ"
                class="resonance-pill"
                :class="{ active: activatedChannels.includes(elem.organ) }"
              >
                <span class="elem-seal">{{ elem.element }}</span>
                <span class="elem-organ">{{ elem.organ }}經</span>
                <span class="elem-status">{{ activatedChannels.includes(elem.organ) ? '已入經' : '未及' }}</span>
              </div>
            </div>
          </div>

          <!-- 煎煮計時器 -->
          <div class="boil-timer-section">
            <div class="timer-top-row">
              <div>
                <h3 class="analysis-heading" style="margin-bottom: 2px;">⏱️ 古法煎煮時序導引</h3>
                <div class="timer-stage-title">{{ currentStage.title }} ({{ currentStage.desc }})</div>
              </div>
              <div class="timer-display-box">
                {{ formatSeconds(timerSeconds) }}
              </div>
            </div>

            <div class="timer-controls">
              <button
                class="btn-timer-action"
                :class="{ running: isBoiling }"
                @click="toggleBoilTimer"
              >
                {{ isBoiling ? '⏸ 暫停煎煮' : '🔥 開始煎煮計時' }}
              </button>
              <button class="btn-timer-subtle" @click="resetTimer">重置時鐘</button>
              <button
                class="btn-timer-subtle btn-ticket-trigger"
                :disabled="selectedHerbs.length === 0"
                :title="selectedHerbs.length === 0 ? '請先向茶釜投入草藥以保存配方箋' : '保存、下載與複製當前茶釜配方箋'"
                @click="openFormulaTicketModal"
              >
                📜 保存配方箋
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- 分頁三：專家 LLM AI 客製配方建議 (Expert Consultation) -->
    <!-- ============================================== -->
    <div v-else-if="currentTab === 'consult'" class="consult-formulate-section">
      <div class="consult-intro-card">
        <h3 class="consult-section-title">🤖 風土專家 LLM 客製配方研議席</h3>
        <p class="consult-section-subtitle">
          請依據您的體質症狀、生活情境與預期型態，向道地專家請益。AI 將依循專家視角、結合本草知識庫 RAG 檢索，量身生成客製配方。
        </p>
      </div>

      <div class="consult-form-grid">
        <!-- 步驟 1：選擇請益專家 -->
        <div class="form-step-card">
          <div class="step-num">步驟 1</div>
          <h4 class="step-title">選擇請益專家</h4>
          <div class="expert-select-cards">
            <div
              v-for="exp in expertPersonas"
              :key="exp.id"
              class="expert-persona-card"
              :class="{ active: consultExpertId === exp.id }"
              @click="consultExpertId = exp.id"
            >
              <div class="persona-card-header">
                <div class="persona-avatar">{{ exp.avatar }}</div>
                <span
                  class="persona-type-badge"
                  :class="exp.isReal ? 'real' : 'virtual'"
                >
                  {{ exp.isReal ? '🎓 真實學者' : '🎭 知識聊天助理' }}
                </span>
              </div>
              <div class="persona-name">{{ exp.name }}</div>
              <div class="persona-role">{{ exp.title }}</div>
              <div v-if="exp.officialUrl" class="persona-official-link-wrap">
                <a :href="exp.officialUrl" target="_blank" rel="noopener noreferrer" class="persona-official-link" @click.stop>
                  🔗 中國醫藥大學 Eportfolio ↗
                </a>
              </div>
              <div class="persona-tone">風格：{{ exp.tone }}</div>
            </div>
          </div>
        </div>

        <!-- 步驟 2：選擇預期劑型 -->
        <div class="form-step-card">
          <div class="step-num">步驟 2</div>
          <h4 class="step-title">選擇調配型態</h4>
          <div class="type-select-row">
            <button
              v-for="opt in targetTypeOptions"
              :key="opt.id"
              class="type-choice-btn"
              :class="{ active: consultTargetType === opt.id }"
              @click="consultTargetType = opt.id"
            >
              <span class="type-icon">{{ opt.icon }}</span>
              <span class="type-name">{{ opt.name }}</span>
            </button>
          </div>

          <!-- 步驟 3：輸入生活調理情境 -->
          <div class="needs-input-group">
            <div class="step-num" style="margin-top: 14px;">步驟 3</div>
            <h4 class="step-title">描述生活調理需求或體質狀態</h4>
            <textarea
              v-model="consultUserNeeds"
              rows="3"
              class="consult-textarea"
              placeholder="例如：最近天天加班熬夜，口乾舌燥嘴破，但吹冷氣容易手腳冰冷，想要一款溫潤消火氣的日常青草茶..."
            ></textarea>

            <div class="quick-prompts-row">
              <span class="prompt-hint">常見生活情境：</span>
              <button
                v-for="p in quickNeedsPrompts"
                :key="p"
                class="prompt-chip"
                @click="consultUserNeeds = p"
              >
                {{ p }}
              </button>
            </div>
          </div>

          <button
            class="btn-generate-recipe"
            :disabled="isGeneratingRecipe || !consultUserNeeds.trim()"
            @click="submitConsultFormulate"
          >
            <span v-if="isGeneratingRecipe">🌀 專家正調配道地本草方劑中...</span>
            <span v-else>🔮 請益專家 AI 生成客製配方 ➔</span>
          </button>
        </div>
      </div>

      <!-- 專家 AI 客製配方建議產出成果卡 -->
      <div v-if="recipeResult" class="recipe-result-card">
        <div class="recipe-result-header">
          <div class="recipe-seal-stamp">道地傳承</div>
          <div>
            <h3 class="recipe-result-title">{{ recipeResult.recipeName }}</h3>
            <div class="recipe-author-line">
              由 <strong>{{ recipeResult.expertName }}</strong> 親自辨證指導 · 建議劑型：{{ formulaTypeLabel(recipeResult.targetType) }}
              <span
                class="recipe-expert-type-pill"
                :class="recipeResult.isRealExpert ? 'real' : 'virtual'"
              >
                {{ recipeResult.isRealExpert ? '🎓 知識聊天助理（真實學者）' : '🎭 知識聊天助理' }}
              </span>
              <a
                v-if="recipeResult.profileUrl || recipeResult.expert?.profileUrl"
                :href="recipeResult.profileUrl || recipeResult.expert?.profileUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="recipe-cmu-link"
              >
                🔗 中國醫藥大學 Eportfolio ↗
              </a>
            </div>
            <div class="recipe-bot-annotation">
              💡 <strong>回答註解</strong>：本配方箋由【知識聊天助理】依據傳統本草文獻與君臣佐使法度演算生成。{{ recipeResult.isRealExpert ? '黃世勳教授為臺灣真實本草專家學者，本回答為其學術研究風格之 AI 知識聊天助理。' : '本角色為臺灣常民風土文化之 AI 知識聊天助理。' }}
            </div>
          </div>
          <div class="recipe-header-actions">
            <button
              v-if="recipeResult.suggestedHerbs?.length"
              class="btn-load-ai-recipe"
              @click="loadAiRecipeToPot(recipeResult)"
            >
              🧪 倒入茶釜調配研製 ➔
            </button>
            <button
              class="btn-save-ai-recipe"
              title="將此專家指導客製配方保存至私房配方庫"
              @click="openAiRecipeTicketModal(recipeResult)"
            >
              📜 保存此方劑箋
            </button>
          </div>
        </div>

        <!-- 專家叮嚀語 -->
        <div class="recipe-expert-speech">
          <div class="speech-quote-mark">“</div>
          <p>{{ recipeResult.expertAdvice }}</p>
        </div>

        <!-- 配方草藥明細 -->
        <div class="recipe-ingredients-grid">
          <div
            v-for="(herbItem, hIdx) in recipeResult.composition"
            :key="hIdx"
            class="recipe-herb-card"
          >
            <div class="herb-card-top">
              <span class="herb-role-pill" :class="herbItem.role">{{ herbItem.role }}</span>
              <strong class="herb-name-text">{{ herbItem.herbName }}</strong>
            </div>
            <div class="herb-ratio-text">份量建議：{{ herbItem.ratio }}</div>
            <div class="herb-action-text">功效作用：{{ herbItem.action }}</div>
          </div>
        </div>

        <!-- 熬煮與使用步驟 -->
        <div class="recipe-guide-section">
          <h4>🍵 煎煮與使用指南：</h4>
          <p>{{ recipeResult.preparationGuide }}</p>
        </div>

        <!-- 安全警示 -->
        <div v-if="recipeResult.contraindications" class="recipe-caution-section">
          ⚠️ <strong>體質安全禁忌：</strong>{{ recipeResult.contraindications }}
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- 📜 本草私房配方箋 (Formula Ticket Modal) -->
    <!-- ============================================== -->
    <div
      v-if="isTicketModalOpen"
      class="ticket-modal-overlay"
      @click.self="closeFormulaTicketModal"
    >
      <div class="ticket-modal-card">
        <!-- 頂部印章與標題列 -->
        <div class="ticket-modal-header">
          <div class="ticket-seal-group">
            <span class="ticket-red-seal">方箋</span>
            <div>
              <h3 class="ticket-modal-title">📜 台灣肯信本草研究室 · 私房配方箋</h3>
              <p class="ticket-modal-subtitle">
                四象法度 · 君臣佐使配伍 · 依循時序慢火細燉
              </p>
            </div>
          </div>
          <button
            class="ticket-close-btn"
            title="關閉配方箋"
            @click="closeFormulaTicketModal"
          >
            ✕
          </button>
        </div>

        <!-- 配方箋身 (古風紙卷質地) -->
        <div class="ticket-scroll-body">
          <!-- 橫幅通知 Toast -->
          <div v-if="ticketModalToast" class="ticket-toast-banner">
            <span>{{ ticketModalToast }}</span>
          </div>

          <!-- 配方名稱與元資訊編輯 -->
          <div class="ticket-meta-box">
            <div class="ticket-name-row">
              <label class="ticket-label">方劑名稱：</label>
              <input
                v-model="ticketForm.name"
                type="text"
                class="ticket-name-input"
                placeholder="為此配方命名 (例：萬華退火青草茶、客庄安神湯)..."
              />
            </div>
            <div class="ticket-meta-tags">
              <span class="ticket-meta-tag">
                📅 研製時辰：{{ ticketForm.createdAt }}
              </span>
              <span class="ticket-meta-tag" v-if="ticketForm.solarTermName">
                🍂 當令節氣：{{ ticketForm.solarTermName }}
              </span>
              <span class="ticket-meta-tag origin">
                {{ ticketForm.sourceType === 'consult' ? '🍵 專家傳承' : ticketForm.sourceType === 'ai_blend' ? '🎲 AI 神來一配' : '🧪 茶釜研製' }}
              </span>
            </div>
          </div>

          <!-- 君臣佐使配伍明細 -->
          <div class="ticket-composition-section">
            <h4 class="ticket-section-title">
              <span>🌿 君臣佐使 · 配伍明細</span>
              <span class="ticket-herbs-count">共 {{ ticketForm.herbs.length }} 味</span>
            </h4>
            <div class="ticket-herbs-grid">
              <div
                v-for="h in ticketForm.herbs"
                :key="h.name"
                class="ticket-herb-card"
                :class="`role-${h.roleCode || 'jun'}`"
              >
                <div class="ticket-herb-card-top">
                  <span class="ticket-role-badge" :class="`badge-${h.roleCode || 'jun'}`">
                    {{ h.roleBadge || h.roleTitle || '草藥' }}
                  </span>
                  <strong class="ticket-herb-name">{{ h.name }}</strong>
                  <span class="ticket-herb-share">{{ h.share || h.ratio || '' }}</span>
                </div>
                <div class="ticket-herb-details">
                  <span class="ticket-nature-pill">性味：{{ h.nature || '平' }}</span>
                  <span class="ticket-channel-pill" v-if="h.channels && h.channels.length">
                    入經：{{ h.channels.join('、') }}
                  </span>
                </div>
                <p class="ticket-herb-duty" v-if="h.action || h.roleDuty">
                  {{ h.action || h.roleDuty }}
                </p>
              </div>
            </div>
          </div>

          <!-- 四氣陰陽與平衡診斷 -->
          <div class="ticket-diagnosis-section">
            <h4 class="ticket-section-title">⚖️ 四氣陰陽辨性與平衡評析</h4>
            <div class="ticket-diagnosis-card">
              <div class="ticket-diag-score-row">
                <div class="diag-score-badge">
                  君臣天平指數：<strong>{{ ticketForm.balanceScore }}</strong> 分
                  <span class="diag-grade" v-if="ticketForm.balanceGrade">（{{ ticketForm.balanceGrade }}）</span>
                </div>
                <div class="diag-verdict-title">
                  {{ ticketForm.balanceVerdict }}
                </div>
              </div>
              <p class="ticket-diag-desc" v-if="ticketForm.diagnosisAdvice">
                💡 <strong>調和心法：</strong>{{ ticketForm.diagnosisAdvice }}
              </p>
            </div>
          </div>

          <!-- 煎煮製備工法指南 -->
          <div class="ticket-guide-section">
            <h4 class="ticket-section-title">🍵 煎熬製備工藝</h4>
            <div class="ticket-guide-content">
              {{ ticketForm.boilTime || '取清水約 1500~2000c.c.，武火催沸轉文火細燉 15~20 分鐘，濾渣即可溫服。' }}
            </div>
          </div>

          <!-- 使用者自訂備註手札 -->
          <div class="ticket-note-section">
            <label class="ticket-section-title" style="display:block; margin-bottom: 6px;">
              📝 私房研製筆記（選填）：
            </label>
            <textarea
              v-model="ticketForm.userNote"
              rows="2"
              class="ticket-note-textarea"
              placeholder="記錄口感偏好、熬煮水質、或家人飲用心得..."
            ></textarea>
          </div>

          <!-- 免責聲明 -->
          <div class="ticket-disclaimer-strip">
            ⚖️ <strong>非醫療宣告</strong>：本箋純屬臺灣民間生活青草茶飲與常民本草文化紀錄，絕無宣稱任何疾病療效，體質特殊者請遵醫囑。
          </div>
        </div>

        <!-- 底部功能操作按鈕群 -->
        <div class="ticket-modal-footer">
          <div class="ticket-footer-actions">
            <!-- 💾 保存至私房配方庫 -->
            <button
              class="btn-ticket-action btn-save-storage"
              @click="saveTicketToStorage"
            >
              <span>💾</span>
              <span>保存至私房配方庫</span>
            </button>

            <!-- 📥 下載配方箋文字檔 -->
            <button
              class="btn-ticket-action btn-download-file"
              @click="downloadTicketFile"
            >
              <span>📥</span>
              <span>下載配方箋 (.txt)</span>
            </button>

            <!-- 📋 複製配方內容 -->
            <button
              class="btn-ticket-action btn-copy-text"
              @click="copyTicketText"
            >
              <span>📋</span>
              <span>複製配方文字</span>
            </button>
          </div>

          <button
            class="btn-ticket-close"
            @click="closeFormulaTicketModal"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { HerbApi } from '../services/api';
import { audio } from '../services/audioService';
import { getCurrentSolarTerm } from '../services/solarTerms';


const props = defineProps({
  allHerbs: { type: Array, default: () => [] },
  initialHerb: { type: Object, default: null }
});

// 當前頂部標籤 ('roles' | 'kettle' | 'consult')
const currentTab = ref('kettle');

const switchTab = (tab) => {
  audio.playClick();
  currentTab.value = tab;
};

// ==============================================
// 1. 角色傳承名方庫狀態
// ==============================================
const formulas = ref([]);
const isLoadingFormulas = ref(false);
const selectedExpertId = ref('全部');
const selectedType = ref('全部');

const expertOptions = [
  { id: '全部', name: '全部專家' },
  { id: 'wanhua_uncle', name: '萬華林萬吉老茶師 (知識助理)' },
  { id: 'hakka_grandmother', name: '客庄彭秀妹老藥師 (知識助理)' },
  { id: 'pharmacist_phd', name: '黃世勳教授 (真實學者)' },
  { id: 'yaoshan_master', name: '李昭瑩名師 (藥膳食療顧問)' },
  { id: 'indigenous_forager', name: '督邁山林達人 (知識助理)' }
];

const typeOptions = [
  { id: '全部', name: '全部劑型' },
  { id: 'medicinal_diet', name: '🍲 藥膳食療' },
  { id: 'herbal_tea', name: '🍵 青草茶飲' },
  { id: 'bath', name: '🛁 民俗藥浴' },
  { id: 'poultice', name: '🌿 外用敷膏' },
  { id: 'soup', name: '🍲 精力藥膳' }
];

const formulaTypeLabel = (type) => {
  switch (type) {
    case 'medicinal_diet': return '藥膳食療';
    case 'herbal_tea': return '青草茶飲';
    case 'bath': return '民俗藥浴';
    case 'poultice': return '外用敷膏';
    case 'soup': return '精力藥膳';
    default: return '本草配方';
  }
};

const loadFormulas = async () => {
  isLoadingFormulas.value = true;
  try {
    const list = await HerbApi.getFormulas();
    formulas.value = list;
  } catch (err) {
    console.error('Failed to load formulas:', err);
  } finally {
    isLoadingFormulas.value = false;
  }
};

const setExpertFilter = (id) => {
  audio.playClick();
  selectedExpertId.value = id;
};

const setTypeFilter = (t) => {
  audio.playClick();
  selectedType.value = t;
};

const resetFormulaFilters = () => {
  audio.playClick();
  selectedExpertId.value = '全部';
  selectedType.value = '全部';
};

const filteredFormulas = computed(() => {
  let list = formulas.value;
  if (selectedExpertId.value !== '全部') {
    const aliasMap = {
      'hakka_grandma': 'hakka_grandmother',
      'biotech_dr_yen': 'pharmacist_phd',
      'bunun_hunter': 'indigenous_forager'
    };
    const targetId = aliasMap[selectedExpertId.value] || selectedExpertId.value;
    list = list.filter(f => f.expertId === targetId || (aliasMap[f.expertId] || f.expertId) === targetId);
  }
  if (selectedType.value !== '全部') {
    list = list.filter(f => f.type === selectedType.value);
  }
  return list;
});

const loadFormulaToPot = (formula) => {
  audio.playChime(580);
  const herbNames = formula.composition.map(c => c.herbName);
  const found = herbNames
    .map(name => props.allHerbs.find(h => h.name === name))
    .filter(Boolean);

  if (found.length === 0) {
    // If not found in props.allHerbs directly, construct mock herb objects
    selectedHerbs.value = formula.composition.slice(0, 4).map((c, i) => ({
      id: 900 + i,
      name: c.herbName,
      nature: '平',
      channels: ['脾', '胃'],
      taste: ['甘']
    }));
  } else {
    selectedHerbs.value = [...found.slice(0, 4)];
  }

  currentTab.value = 'kettle';
};

// ==============================================
// 2. 茶釜調配與 AI 神來一配狀態
// ==============================================
const selectedHerbs = ref([]);
const roleLabels = ['君 (主藥)', '臣 (相佐)', '佐 (調和)', '使 (引經)'];
const shelfSearch = ref('');
const isBlending = ref(false);
const isHarmonizing = ref(false);
const divineIntent = ref('清熱退火');
const blendDecree = ref(null);
const harmonizeToast = ref(null);

// 私房配方庫與配方箋 Modal 狀態
const isTicketModalOpen = ref(false);
const isSavedDrawerOpen = ref(false);
const ticketModalToast = ref('');
const ticketForm = ref({
  id: '',
  name: '',
  createdAt: '',
  solarTermName: '',
  herbs: [],
  balanceScore: 0,
  balanceGrade: '',
  balanceVerdict: '',
  diagnosisAdvice: '',
  boilTime: '',
  userNote: '',
  sourceType: 'kettle'
});

const loadSavedFormulas = () => {
  try {
    const raw = localStorage.getItem('taiwanherb_saved_formulas');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse saved formulas from localStorage:', e);
    return [];
  }
};

const savedFormulas = ref(loadSavedFormulas());

const persistSavedFormulas = () => {
  try {
    localStorage.setItem('taiwanherb_saved_formulas', JSON.stringify(savedFormulas.value));
  } catch (e) {
    console.error('Failed to persist saved formulas to localStorage:', e);
  }
};


const quickPresets = [
  { name: '萬華百年退火青草茶', herbNames: ['大花咸豐草', '鳳尾草', '薄荷', '甘草'] },
  { name: '國家中醫清潤防疫茶', herbNames: ['魚腥草', '金銀花', '桑葉', '甘草'] },
  { name: '客家古傳紫蘇暖胃茶', herbNames: ['紫蘇', '艾草', '甘草'] },
  { name: '元氣固表護眼飲', herbNames: ['黃耆', '枸杞子', '桑葉', '甘草'] },
  { name: '天麻燉豬腦藥膳方', herbNames: ['天麻', '川芎', '枸杞子'] },
  { name: '百合薏仁潤膚美白湯', herbNames: ['薏苡仁', '百合', '紅棗'] }
];

const filteredShelfHerbs = computed(() => {
  if (!shelfSearch.value.trim()) return props.allHerbs;
  const q = shelfSearch.value.trim().toLowerCase();
  return props.allHerbs.filter(h =>
    h.name.toLowerCase().includes(q) ||
    h.nature.toLowerCase().includes(q) ||
    (h.channels || []).some(c => c.toLowerCase().includes(q))
  );
});

const isInPot = (id) => selectedHerbs.value.some(h => h.id === id);

const addHerb = (herb) => {
  if (selectedHerbs.value.length >= 4) return;
  audio.playWaterDrop();
  selectedHerbs.value.push(herb);
};

const removeHerb = (id) => {
  audio.playClick();
  selectedHerbs.value = selectedHerbs.value.filter(h => h.id !== id);
};

const clearPot = () => {
  audio.playClick();
  selectedHerbs.value = [];
  blendDecree.value = null;
  harmonizeToast.value = null;
  resetTimer();
};

const loadQuickPreset = (preset) => {
  audio.playChime(580);
  const found = preset.herbNames
    .map(name => props.allHerbs.find(h => h.name === name))
    .filter(Boolean);
  selectedHerbs.value = [...found];
};

// 🎲 AI 神來一配演算法呼叫
const triggerDivineBlend = async () => {
  audio.playChime(770);
  isBlending.value = true;
  try {
    const currentIds = selectedHerbs.value.map(h => h.id);
    const result = await HerbApi.blendFormula({
      herbIds: currentIds.length ? currentIds : undefined,
      targetIntent: divineIntent.value
    });

    if (result && result.composition) {
      // populate cauldron with blend herbs
      const blendHerbNames = result.composition.map(c => c.herbName);
      const found = blendHerbNames
        .map(name => props.allHerbs.find(h => h.name === name))
        .filter(Boolean);

      if (found.length) {
        selectedHerbs.value = found.slice(0, 4);
      }
      blendDecree.value = result;
      audio.playStamp();
    }
  } catch (err) {
    console.error('Divine Blend error:', err);
    alert('AI 神來一配運算暫時忙線，請稍後重試！');
  } finally {
    isBlending.value = false;
  }
};

// 🪄 AI 一鍵臣佐君平衡調和
const triggerAutoHarmonize = async () => {
  if (selectedHerbs.value.length === 0) return;
  audio.playChime(660);
  isHarmonizing.value = true;
  try {
    const currentIds = selectedHerbs.value.map(h => h.id);
    const result = await HerbApi.harmonizeFormula({
      herbIds: currentIds,
      targetIntent: divineIntent.value
    });

    if (result && result.composition) {
      const harmonizedHerbNames = result.composition.map(c => c.herbName);
      const found = harmonizedHerbNames
        .map(name => props.allHerbs.find(h => h.name === name))
        .filter(Boolean);

      if (found.length) {
        selectedHerbs.value = found.slice(0, 4);
      }
      blendDecree.value = result;
      harmonizeToast.value = result.harmonizeMessage || 'AI 已為您完成臣佐君平衡調和！';
      audio.playStamp();
    }
  } catch (err) {
    console.error('Auto harmonize error:', err);
    alert('AI 一鍵調和運算忙線中，請稍後重試！');
  } finally {
    isHarmonizing.value = false;
  }
};

// ⚖️ 君臣佐使配伍平衡天平演算 (Jun-Chen-Zuo Equilibrium Engine)
const junChenZuoBalance = computed(() => {
  const herbs = selectedHerbs.value;
  if (!herbs || herbs.length === 0) {
    return {
      overallBalanceScore: 0,
      grade: '【茶釜尚空 · 待立君位】',
      status: 'empty',
      analysis: {
        junDominance: 0,
        chenAssistance: 0,
        zuoTempering: 0,
        shiHarmonizing: 0
      },
      junHerb: null,
      chenHerb: null,
      zuoHerb: null,
      shiHerb: null,
      diagnosis: '茶釜尚無草藥，請自百草藥櫃選入主治君藥，或點擊「AI 神來一配」建立平衡。',
      harmonyAdvice: '先立君藥（主攻核心），再配臣藥（輔助增效），次佐制偏，終以使藥引經。'
    };
  }

  // 計算平均寒熱性味
  const natureWeights = {
    '大寒': -40, '寒': -25, '微寒': -12, '涼': -6,
    '平': 0, '微溫': +12, '溫': +25, '熱': +40
  };
  let totalWeight = 0;
  herbs.forEach(h => {
    totalWeight += (natureWeights[h.nature] ?? 0);
  });
  const avgColdHot = Math.round((totalWeight / (herbs.length * 40)) * 100);

  // 君藥判定 (首味草藥)
  const junHerb = herbs[0] || null;
  // 臣藥判定 (第二味草藥)
  const chenHerb = herbs[1] || null;

  // 使藥判定：甘草優先，其次薄荷/桑葉/香茅，或第4味
  let shiHerb = herbs.slice(2).find(h =>
    h.name.includes('甘草') || ['薄荷', '桑葉', '香茅'].some(n => h.name.includes(n))
  ) || (herbs.length >= 4 ? herbs[herbs.length - 1] : null);

  // 佐藥判定：第3味或非使藥之輔助草藥
  let zuoHerb = herbs.slice(2).find(h => h !== shiHerb) || (herbs.length === 3 ? herbs[2] : null);

  if (herbs.length === 3 && !shiHerb && zuoHerb) {
    if (zuoHerb.name.includes('甘草') || ['薄荷', '桑葉', '香茅'].some(n => zuoHerb.name.includes(n))) {
      shiHerb = zuoHerb;
      zuoHerb = null;
    }
  }

  const junScore = junHerb ? 95 : 0;
  const chenScore = chenHerb ? 90 : (herbs.length >= 2 ? 75 : 30);

  let zuoScore = 70;
  const hasWarmOrSweet = herbs.some(h => ['平', '微溫', '溫'].includes(h.nature) || (h.taste || []).includes('甘') || h.name.includes('甘草') || h.name.includes('枸杞') || h.name.includes('土人參'));
  const hasCoolOrMoist = herbs.some(h => ['平', '涼', '微寒'].includes(h.nature) || h.name.includes('薄荷') || h.name.includes('桑葉'));

  if (avgColdHot <= -20) {
    zuoScore = hasWarmOrSweet ? 96 : 38;
  } else if (avgColdHot >= 20) {
    zuoScore = hasCoolOrMoist ? 95 : 42;
  } else {
    zuoScore = herbs.length >= 3 ? 94 : 76;
  }

  let shiScore = 60;
  if (herbs.some(h => h.name.includes('甘草'))) {
    shiScore = 98;
  } else if (herbs.some(h => ['薄荷', '桑葉', '香茅'].some(n => h.name.includes(n)))) {
    shiScore = 90;
  } else if (herbs.length >= 4) {
    shiScore = 80;
  } else {
    shiScore = herbs.length >= 2 ? 65 : 40;
  }

  const overallBalanceScore = Math.round(
    (junScore * 0.28) + (chenScore * 0.24) + (zuoScore * 0.30) + (shiScore * 0.18)
  );

  let grade = '';
  let status = 'balanced';
  let diagnosis = '';
  let harmonyAdvice = '';

  if (herbs.length === 1) {
    grade = '【孤君無臣 · 獨木難支】';
    status = 'needs_chen';
    diagnosis = `釜中僅有「${herbs[0].name}」單一君藥，缺乏臣藥相輔相成與佐使調和，單味藥力易顯單薄或偏性突兀。`;
    harmonyAdvice = '建議補入相配之臣藥加強主治，或點擊「AI 一鍵臣佐君平衡調和」自動配全四象。';
  } else if (herbs.length === 2) {
    grade = '【君臣相得 · 待補佐使】';
    status = 'needs_zuo';
    diagnosis = `君藥（${junHerb?.name}）與臣藥（${chenHerb?.name}）配伍成型，但缺乏佐藥制其偏性與使藥調和脾胃。`;
    harmonyAdvice = avgColdHot < -10
      ? '方劑偏涼，建議點擊「AI 一鍵臣佐君平衡調和」補入微溫甘平佐藥（如甘草或枸杞）以佐制苦寒、護衛胃氣。'
      : '建議補入使藥（如薄荷或甘草）引經入絡、調和百草風味。';
  } else if (zuoScore <= 50) {
    grade = '【偏寒少佐 · 易傷胃陽】';
    status = 'needs_zuo';
    diagnosis = `君臣藥性偏大苦大寒（寒熱指數 ${avgColdHot}），釜中缺乏甘平佐藥佐制寒毒，空腹飲用易引發脾胃不適。`;
    harmonyAdvice = '強烈建議點擊「AI 一鍵臣佐君平衡調和」補入【甘草】或【枸杞子】作為佐藥，甘以緩之、健脾和中！';
  } else if (overallBalanceScore >= 90) {
    grade = '【四大法度完備 · 臣佐君大和】';
    status = 'balanced';
    diagnosis = `君藥主攻明確，臣藥輔弼相成，佐藥制偏護中，使藥引經調和。臣佐君三位一體，陰陽中正，四氣和平！`;
    harmonyAdvice = '方劑配伍結構精妙，寒熱相制，入口甘潤，具備傳統常民茶飲之最高和諧法度。';
  } else {
    grade = '【善劑相生 · 臣佐君調暢】';
    status = 'balanced';
    diagnosis = `君臣佐使分工大致妥當，陰陽寒熱互為表裡，滋味甘平回甘。`;
    harmonyAdvice = '配伍得宜，可依個人體質酌量增減煎煮時間。';
  }

  return {
    overallBalanceScore,
    grade,
    status,
    analysis: {
      junDominance: junScore,
      chenAssistance: chenScore,
      zuoTempering: zuoScore,
      shiHarmonizing: shiScore
    },
    junHerb,
    chenHerb,
    zuoHerb,
    shiHerb,
    diagnosis,
    harmonyAdvice
  };
});

const getHerbAssignedRole = (herbId) => {
  const evalData = junChenZuoBalance.value;
  if (!evalData) return { roleCode: 'jun', badge: '👑 君', title: '君藥', share: '40%' };
  if (evalData.junHerb && evalData.junHerb.id === herbId) {
    const share = selectedHerbs.value.length === 1 ? '100%' : selectedHerbs.value.length === 2 ? '60%' : '40%';
    return { roleCode: 'jun', badge: '👑 君', title: '君藥 (主導)', share };
  }
  if (evalData.chenHerb && evalData.chenHerb.id === herbId) {
    const share = selectedHerbs.value.length === 2 ? '40%' : '28%';
    return { roleCode: 'chen', badge: '🛡️ 臣', title: '臣藥 (輔弼)', share };
  }
  if (evalData.shiHerb && evalData.shiHerb.id === herbId) {
    return { roleCode: 'shi', badge: '🕊️ 使', title: '使藥 (引經)', share: '14%' };
  }
  return { roleCode: 'zuo', badge: '⚖️ 佐', title: '佐藥 (制偏)', share: '18%' };
};

const eqScoreClass = computed(() => {
  const s = junChenZuoBalance.value.overallBalanceScore;
  if (s >= 90) return 'score-great';
  if (s >= 75) return 'score-good';
  if (s >= 50) return 'score-fair';
  return 'score-poor';
});

const eqMeterClass = computed(() => {
  const s = junChenZuoBalance.value.overallBalanceScore;
  if (s >= 90) return 'fill-great';
  if (s >= 75) return 'fill-good';
  if (s >= 50) return 'fill-fair';
  return 'fill-poor';
});

const eqStatusClass = computed(() => {
  const st = junChenZuoBalance.value.status;
  if (st === 'balanced') return 'status-balanced';
  if (st === 'needs_zuo') return 'status-warning';
  return 'status-info';
});

// 陰陽寒熱指針演算
const balanceScore = computed(() => {
  if (selectedHerbs.value.length === 0) return 0;
  let sum = 0;
  selectedHerbs.value.forEach(h => {
    switch (h.nature) {
      case '大寒': sum -= 2.5; break;
      case '寒': sum -= 2.0; break;
      case '微寒': sum -= 1.2; break;
      case '涼': sum -= 0.8; break;
      case '平': sum += 0; break;
      case '微溫': sum += 1.0; break;
      case '溫': sum += 1.8; break;
      case '熱': sum += 2.5; break;
      default: break;
    }
  });
  return sum / selectedHerbs.value.length;
});

const gaugePercentage = computed(() => {
  const clamped = Math.max(-2.5, Math.min(2.5, balanceScore.value));
  return Math.round(50 + (clamped / 2.5) * 42);
});

const balanceVerdict = computed(() => {
  const s = balanceScore.value;
  if (selectedHerbs.value.length === 0) {
    return {
      title: '請放入草藥',
      description: '茶釜目前無藥性，請選配草藥或點擊「AI 神來一配」以啟動陰陽辨析。'
    };
  }
  if (s < -1.2) {
    return {
      title: '大苦大寒 · 清烈解熱毒',
      description: '性味極度偏涼，適合咽喉腫痛、盛夏深層熱毒、火氣暴衝者；脾胃虛寒容易腹瀉者應短飲即止。'
    };
  }
  if (s < -0.3) {
    return {
      title: '清涼生津 · 消暑退火良品',
      description: '微涼而不傷胃氣，能生津止渴、解散夏日煩悶暑濕，為台灣青草茶最推崇之日常清爽體質配比。'
    };
  }
  if (s <= 0.4) {
    return {
      title: '四氣和諧 · 平平溫和老少咸宜',
      description: '寒熱調和、陰陽相濟，兼具清熱與健脾之效，口感甘醇回味，全年皆宜日常飲用。'
    };
  }
  return {
    title: '甘溫理氣 · 益氣暖中扶陽',
    description: '性味甘溫健脾，長於補中益氣、散寒通絡，適合秋冬畏寒肢冷、疲乏無力、體質虛弱者調理飲用。'
  };
});

const balanceTypeClass = computed(() => {
  const s = balanceScore.value;
  if (selectedHerbs.value.length === 0) return 'empty';
  if (s < -0.3) return 'cold-theme';
  if (s <= 0.4) return 'neutral-theme';
  return 'warm-theme';
});

// 五味滋味預測光譜
const flavorScore = computed(() => {
  if (selectedHerbs.value.length === 0) {
    return { bitter: 0, sweet: 0, pungent: 0, cool: 0 };
  }
  let bitter = 10, sweet = 10, pungent = 10, cool = 10;
  selectedHerbs.value.forEach(h => {
    const tastes = h.taste || [];
    if (tastes.includes('苦') || tastes.includes('微苦')) bitter += 28;
    if (tastes.includes('甘') || h.name === '甘草' || h.name === '枸杞子') sweet += 32;
    if (tastes.includes('辛') || h.name === '薄荷' || h.name === '紫蘇') pungent += 25;
    if (['涼', '寒', '微寒'].includes(h.nature) || h.name === '薄荷') cool += 26;
  });
  return {
    bitter: Math.min(100, bitter),
    sweet: Math.min(100, sweet),
    pungent: Math.min(100, pungent),
    cool: Math.min(100, cool)
  };
});

// 五行臟腑引經共鳴
const meridianElements = [
  { element: '金', organ: '肺' },
  { element: '木', organ: '肝' },
  { element: '土', organ: '脾' },
  { element: '火', organ: '心' },
  { element: '水', organ: '腎' }
];

const activatedChannels = computed(() => {
  const chs = new Set();
  selectedHerbs.value.forEach(h => {
    (h.channels || []).forEach(c => chs.add(c));
  });
  return Array.from(chs);
});

// 煎煮計時器
const isBoiling = ref(false);
const timerSeconds = ref(300);
let timerInterval = null;

const currentStage = computed(() => {
  if (timerSeconds.value > 240) return { title: '階段一：武火急沸', desc: '大火催沸，釋出輕揚芳香性成分' };
  if (timerSeconds.value > 60) return { title: '階段二：文火慢煎', desc: '微滾細熬，浸透草根莖脈深層精微' };
  return { title: '階段三：關火悶香', desc: '熄火加蓋，回甘沉降，留香入湯' };
});

const formatSeconds = (sec) => {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const toggleBoilTimer = () => {
  if (isBoiling.value) {
    clearInterval(timerInterval);
    isBoiling.value = false;
  } else {
    audio.playBoiling();
    isBoiling.value = true;
    timerInterval = setInterval(() => {
      if (timerSeconds.value > 0) {
        timerSeconds.value--;
      } else {
        clearInterval(timerInterval);
        isBoiling.value = false;
        audio.playChime(880);
        alert('🍵 青草茶已完成古法慢熬！清芬滿室，請開蓋濾渣品茗。');
      }
    }, 1000);
  }
};

const resetTimer = () => {
  clearInterval(timerInterval);
  isBoiling.value = false;
  timerSeconds.value = 300;
};

// ==============================================
// 📜 私房配方箋與配方庫核心操作
// ==============================================

const generateTicketPlainText = (form) => {
  const herbLines = (form.herbs || []).map((h, i) => {
    const channels = (h.channels && h.channels.length) ? ` · 入${h.channels.join('、')}經` : '';
    const share = h.share || h.ratio || '適量';
    const duty = h.action || h.roleDuty ? ` —— ${h.action || h.roleDuty}` : '';
    return `  [${h.roleBadge || h.roleTitle || '草藥'}] ${h.name} (${h.nature || '平'}性${channels}) · 份量比重：${share}${duty}`;
  }).join('\n');

  const originText = form.sourceType === 'consult' ? '道地專家傳承研定' : form.sourceType === 'ai_blend' ? 'AI 神來一配意圖演算' : '茶釜自主配伍';

  return `============================================================
           🌿 台灣肯信本草研究室 · 私房配方箋 🌿
============================================================
方劑名稱：【${form.name || '私房本草調和方'}】
研製時辰：${form.createdAt || '當日吉時'}
當令節氣：二十四節氣 · ${form.solarTermName ? `${form.solarTermName}當令` : '節令調和'}
配方來源：${originText}

【🌿 君臣佐使配伍明細】(共 ${(form.herbs || []).length} 味)
${herbLines || '  尚無草藥'}

【⚖️ 四氣陰陽與平衡評析】
  辨性評定：${form.balanceVerdict || '平潤調和'}
  天平指數：${form.balanceScore} 分 (${form.balanceGrade || '和調'})
${form.diagnosisAdvice ? `  調和心法：${form.diagnosisAdvice}\n` : ''}
【🍵 煎熬製備工法】
  ${form.boilTime || '取清水約 1500~2000c.c.，武火催沸轉文火細燉 15~20 分鐘，濾渣即可溫服。'}
${form.userNote ? `\n【📝 私房研製筆記】\n  ${form.userNote}\n` : ''}
------------------------------------------------------------
⚖️【生活文化分享與非醫療聲明】
本研製箋為臺灣本土常民傳統民間生活茶飲文化交流紀錄，
非屬醫療院所處方，亦無宣稱任何疾病療效。
個人體質虛寒、特殊病徵或孕產婦女，請務必尋求合格醫師辨證。
============================================================`;
};

const openFormulaTicketModal = () => {
  if (selectedHerbs.value.length === 0) return;
  audio.playStamp();

  const currentTerm = getCurrentSolarTerm(new Date());
  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const formulaHerbs = selectedHerbs.value.map(h => {
    const r = getHerbAssignedRole(h.id);
    return {
      id: h.id,
      name: h.name,
      nature: h.nature || '平',
      channels: h.channels || [],
      roleCode: r.roleCode,
      roleBadge: r.badge,
      roleTitle: r.title,
      share: r.share,
      roleDuty: r.roleCode === 'jun' ? '主攻病機與核心訴求 (約佔40%)' : r.roleCode === 'chen' ? '協同君藥加強腑臟受納 (約佔28%)' : r.roleCode === 'shi' ? '引藥歸經入絡、調和口感 (約佔14%)' : '制衡偏性，護衛脾胃 (約佔18%)'
    };
  });

  const defaultName = blendDecree.value?.decreeName
    ? blendDecree.value.decreeName
    : `私房本草方 · ${currentTerm.name}節令調和`;

  ticketForm.value = {
    id: `formula_${Date.now()}`,
    name: defaultName,
    createdAt: dateStr,
    solarTermName: currentTerm.name,
    herbs: formulaHerbs,
    balanceScore: junChenZuoBalance.value.overallBalanceScore || 85,
    balanceGrade: junChenZuoBalance.value.grade || '和調',
    balanceVerdict: balanceVerdict.value.title || '和暢平潤',
    diagnosisAdvice: junChenZuoBalance.value.harmonyAdvice || '',
    boilTime: '武火催沸轉文火細燉 15~20 分鐘，濾渣即可溫服飲用。',
    userNote: '',
    sourceType: blendDecree.value ? 'ai_blend' : 'kettle'
  };

  ticketModalToast.value = '';
  isTicketModalOpen.value = true;
};

const closeFormulaTicketModal = () => {
  audio.playClick();
  isTicketModalOpen.value = false;
  ticketModalToast.value = '';
};

const openAiRecipeTicketModal = (recipe) => {
  if (!recipe) return;
  audio.playStamp();

  const currentTerm = getCurrentSolarTerm(new Date());
  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const formulaHerbs = (recipe.composition || []).map((c, i) => {
    const code = c.role === '君' ? 'jun' : c.role === '臣' ? 'chen' : c.role === '使' ? 'shi' : 'zuo';
    const badge = c.role === '君' ? '👑 君' : c.role === '臣' ? '🛡️ 臣' : c.role === '使' ? '🕊️ 使' : '⚖️ 佐';
    const foundHerb = props.allHerbs.find(h => h.name === c.herbName);
    return {
      id: foundHerb ? foundHerb.id : 990 + i,
      name: c.herbName,
      nature: foundHerb?.nature || '平',
      channels: foundHerb?.channels || [],
      roleCode: code,
      roleBadge: badge,
      roleTitle: `${c.role}藥`,
      share: c.ratio || '適量',
      action: c.action || ''
    };
  });

  ticketForm.value = {
    id: `formula_consult_${Date.now()}`,
    name: recipe.recipeName || '專家傳承客製方',
    createdAt: dateStr,
    solarTermName: currentTerm.name,
    herbs: formulaHerbs,
    balanceScore: 92,
    balanceGrade: '道地傳承',
    balanceVerdict: `由【${recipe.expertName}】親傳指導`,
    diagnosisAdvice: recipe.expertAdvice || '',
    boilTime: recipe.preparationGuide || '依專家指示小火慢煮，清芳甘潤。',
    userNote: recipe.contraindications ? `⚠️ 禁忌提醒：${recipe.contraindications}` : '',
    sourceType: 'consult'
  };

  ticketModalToast.value = '';
  isTicketModalOpen.value = true;
};

const saveTicketToStorage = () => {
  audio.playStamp();
  if (!ticketForm.value.name.trim()) {
    ticketForm.value.name = '私房本草調和方';
  }

  const existingIdx = savedFormulas.value.findIndex(f => f.id === ticketForm.value.id);
  const toSave = JSON.parse(JSON.stringify(ticketForm.value));

  if (existingIdx !== -1) {
    savedFormulas.value[existingIdx] = toSave;
  } else {
    savedFormulas.value.unshift(toSave);
  }

  persistSavedFormulas();
  ticketModalToast.value = '✓ 已成功珍藏至「我的私房配方庫」！隨時可於茶釜調配清單一鍵載入。';
  setTimeout(() => {
    if (ticketModalToast.value.includes('私房配方庫')) {
      ticketModalToast.value = '';
    }
  }, 3500);
};

const downloadTicketFile = () => {
  audio.playClick();
  const form = ticketForm.value;
  const content = generateTicketPlainText(form);

  try {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeTitle = (form.name || '本草配方箋').replace(/[\s\/:*?"<>|]+/g, '_');
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `本草私房配方箋_${safeTitle}_${dateStamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    ticketModalToast.value = '✓ 配方箋文字檔下載已啟動！';
    setTimeout(() => {
      if (ticketModalToast.value.includes('下載已啟動')) {
        ticketModalToast.value = '';
      }
    }, 3500);
  } catch (err) {
    console.error('Failed to download ticket file:', err);
    ticketModalToast.value = '⚠️ 下載受限，請點擊「複製配方文字」備份！';
  }
};

const copyTicketText = async () => {
  audio.playClick();
  const text = generateTicketPlainText(ticketForm.value);
  let success = false;

  // 1. 優先使用現代 navigator.clipboard (需 HTTPS 或 localhost)
  if (navigator?.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch (e) {
      console.warn('navigator.clipboard writeText failed, trying execCommand fallback:', e);
    }
  }

  // 2. 跨環境與非 HTTPS 安全退避 (execCommand)
  if (!success) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      success = document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (err) {
      console.error('execCommand copy fallback failed:', err);
    }
  }

  if (success) {
    ticketModalToast.value = '✓ 配方箋內容已成功複製至剪貼簿！';
  } else {
    ticketModalToast.value = '⚠️ 剪貼簿存取受限，請直接點擊「下載配方箋」保存檔案！';
  }

  setTimeout(() => {
    if (ticketModalToast.value.includes('複製至剪貼簿') || ticketModalToast.value.includes('剪貼簿存取')) {
      ticketModalToast.value = '';
    }
  }, 3500);
};

const loadSavedFormulaToPot = (sf) => {
  audio.playChime(660);
  if (!sf || !sf.herbs || !sf.herbs.length) return;

  const found = sf.herbs
    .map(sh => props.allHerbs.find(h => h.id === sh.id || h.name === sh.name))
    .filter(Boolean);

  if (found.length) {
    selectedHerbs.value = [...found.slice(0, 4)];
  } else {
    selectedHerbs.value = sf.herbs.slice(0, 4).map((sh, idx) => ({
      id: sh.id || 950 + idx,
      name: sh.name,
      nature: sh.nature || '平',
      channels: sh.channels || ['脾', '胃'],
      taste: ['甘']
    }));
  }

  currentTab.value = 'kettle';
  isTicketModalOpen.value = false;
  isSavedDrawerOpen.value = false;
};

const viewSavedFormulaTicket = (sf) => {
  audio.playStamp();
  ticketForm.value = JSON.parse(JSON.stringify(sf));
  ticketModalToast.value = '';
  isTicketModalOpen.value = true;
};

const deleteSavedFormula = (id) => {
  audio.playClick();
  savedFormulas.value = savedFormulas.value.filter(f => f.id !== id);
  persistSavedFormulas();
  if (ticketForm.value?.id === id && isTicketModalOpen.value) {
    isTicketModalOpen.value = false;
  }
};

const exportFormulaTicket = () => {
  openFormulaTicketModal();
};


const liquidStyle = computed(() => {
  if (selectedHerbs.value.length === 0) {
    return { background: 'linear-gradient(to top, rgba(200, 220, 200, 0.2), rgba(240, 245, 240, 0.4))' };
  }
  const s = balanceScore.value;
  if (s < -0.3) {
    return { background: 'linear-gradient(to top, #2d6a4f, #52b788)' };
  }
  if (s <= 0.4) {
    return { background: 'linear-gradient(to top, #854d0e, #d97706)' };
  }
  return { background: 'linear-gradient(to top, #991b1b, #dc2626)' };
});

// ==============================================
// 3. 專家 LLM AI 客製配方建議狀態
// ==============================================
const consultExpertId = ref('pharmacist_phd');
const consultTargetType = ref('herbal_tea');
const consultUserNeeds = ref('');
const isGeneratingRecipe = ref(false);
const recipeResult = ref(null);

const expertPersonas = [
  {
    id: 'pharmacist_phd',
    avatar: '🎓',
    name: '黃世勳 教授 / 藥學博士',
    title: '鹿港望族・三十載本草踏查・著述逾百部・藥學慈善社團理事長',
    tone: '鹿港深厚文風涵養，結合三十載山野田野實證、生藥學理與仁心濟世理念',
    isReal: true,
    officialUrl: 'https://webap.cmu.edu.tw/TchEportfolio/index_1/sshuang'
  },
  {
    id: 'yaoshan_master',
    avatar: '🍲',
    name: '李昭瑩 藥膳食療名師',
    title: '《藥膳學》編著者・漢方食療名師・餐桌上的醫生',
    tone: '溫潤典雅名師風範、四氣五味合臟腑、道地古法隔水燉與四季食療',
    isReal: false
  },
  {
    id: 'wanhua_uncle',
    avatar: '🍵',
    name: '林萬吉 老茶師',
    title: '萬華西昌街百年青草巷第三代',
    tone: '道地台語諺語、市井親切傳承',
    isReal: false
  },
  {
    id: 'hakka_grandma',
    avatar: '👵',
    name: '彭秀妹 老藥師',
    title: '苗栗客庄草藥研究會耆老',
    tone: '客家阿婆親切叮嚀、野草沐浴',
    isReal: false
  },
  {
    id: 'bunun_hunter',
    avatar: '🏹',
    name: '督邁·達亥 達人',
    title: '花東縱谷阿美族野菜採集與山林智慧守護者',
    tone: '高山原鄉、山林野趣、獵人體力',
    isReal: false
  }
];

const targetTypeOptions = [
  { id: 'medicinal_diet', name: '餐桌養生藥膳', icon: '🍲' },
  { id: 'herbal_tea', name: '日常生活青草茶', icon: '🍵' },
  { id: 'bath', name: '常民外用藥浴湯', icon: '🛁' },
  { id: 'poultice', name: '清涼消腫草藥膏', icon: '🌿' },
  { id: 'soup', name: '原鄉滋補藥膳湯', icon: '🥣' }
];

const quickNeedsPrompts = [
  '想請教李昭瑩名師：經常熬夜用腦、頭痛眩暈，想做一道養生健腦的藥膳（如天麻燉豬腦）該如何搭配？',
  '請教黃教授：三十載本草踏查與百部著作精華中，針對長輩高血壓族群有哪些安全溫和的草本茶飲建議？',
  '天天熬夜火氣大、喉嚨乾痛口苦，但吹冷氣易手腳冰冷',
  '夏日戶外烈日曝曬，汗黏頭昏口渴，想要消暑解熱',
  '客庄辟邪安神，幫助睡眠與放鬆身心的民俗沐浴包'
];

const submitConsultFormulate = async () => {
  if (!consultUserNeeds.value.trim()) return;
  audio.playChime(660);
  isGeneratingRecipe.value = true;
  recipeResult.value = null;

  try {
    const res = await HerbApi.consultFormulate({
      userNeeds: consultUserNeeds.value.trim(),
      expertId: consultExpertId.value,
      targetType: consultTargetType.value
    });
    recipeResult.value = res;
    audio.playStamp();
  } catch (err) {
    console.error('Failed to formulate recipe:', err);
    alert('專家配方生成遭遇網路波動，請稍候重試！');
  } finally {
    isGeneratingRecipe.value = false;
  }
};

const loadAiRecipeToPot = (recipe) => {
  audio.playChime(580);
  const herbNames = recipe.composition.map(c => c.herbName);
  const found = herbNames
    .map(name => props.allHerbs.find(h => h.name === name))
    .filter(Boolean);

  if (found.length) {
    selectedHerbs.value = found.slice(0, 4);
  } else {
    selectedHerbs.value = recipe.composition.slice(0, 4).map((c, i) => ({
      id: 800 + i,
      name: c.herbName,
      nature: '涼',
      channels: ['肺', '胃'],
      taste: ['甘', '微苦']
    }));
  }

  currentTab.value = 'kettle';
};

// 處理傳入的初始草藥
watch(
  () => props.initialHerb,
  (newHerb) => {
    if (newHerb && !isInPot(newHerb.id)) {
      if (selectedHerbs.value.length < 4) {
        selectedHerbs.value.push(newHerb);
        currentTab.value = 'kettle';
      }
    }
  },
  { immediate: true }
);

const handleKeydown = (e) => {
  if (e.key === 'Escape' && isTicketModalOpen.value) {
    closeFormulaTicketModal();
  }
};

onMounted(() => {
  loadFormulas();
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval);
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.alchemy-lab-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px 60px;
}

/* 頂部殿堂級茶堂牌匾 */
.alchemy-banner {
  background: linear-gradient(135deg, rgba(45, 106, 79, 0.95), rgba(18, 56, 40, 0.98)),
              url('data:image/svg+xml;utf8,<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="2"/></svg>');
  border-radius: 18px;
  padding: 32px 36px 28px;
  margin-bottom: 20px;
  color: #fff;
  box-shadow: 0 10px 30px rgba(18, 56, 40, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.alchemy-seal-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.12);
  padding: 4px 14px 4px 6px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 14px;
}

.banner-seal {
  background: #d97706;
  color: #fff;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 13px;
  padding: 2px 8px;
  border-radius: 12px;
}

.banner-badge-text {
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
}

.alchemy-main-title {
  font-family: var(--font-serif);
  font-size: 27px;
  font-weight: 900;
  margin: 0 0 10px;
  display: flex;
  flex-direction: column;
}

.alchemy-main-title span {
  font-size: 19px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
}

.alchemy-main-title em {
  font-style: normal;
  color: #fde047;
}

.alchemy-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  max-width: 900px;
  margin: 0;
}

/* 法律免責警示條 */
.alchemy-legal-strip {
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-left: 5px solid #d97706;
  border-radius: 12px;
  padding: 12px 18px;
  margin-bottom: 22px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #92400e;
}

.strip-icon {
  font-size: 20px;
  line-height: 1;
}

.strip-text {
  font-size: 13px;
  line-height: 1.5;
}

/* 頂部三合一導覽分頁 */
.alchemy-tabs-nav {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--border-light);
  padding-bottom: 12px;
  overflow-x: auto;
}

.tab-switch-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 14.5px;
  font-weight: 700;
  border: 1px solid var(--border-light);
  background: var(--bg-card);
  color: var(--ink-body);
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.tab-switch-btn:hover {
  background: var(--bg-subtle);
  color: var(--primary);
  border-color: var(--primary);
}

.tab-switch-btn.active {
  background: var(--primary-deep);
  color: #fff;
  border-color: var(--primary-deep);
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.2);
}

.tab-icon {
  font-size: 17px;
}

/* ========================================= */
/* 分頁一：角色名方庫樣式 */
/* ========================================= */
.roles-filter-bar {
  background: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border-card);
  padding: 16px 20px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-cluster {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.cluster-label {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink-heavy);
  min-width: 80px;
}

.pills-cluster {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-pill-btn {
  padding: 5px 14px;
  border-radius: 18px;
  font-size: 12.5px;
  font-weight: 600;
  border: 1px solid var(--border-light);
  background: var(--bg-subtle);
  color: var(--ink-body);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-pill-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.formulas-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

@media (max-width: 900px) {
  .formulas-grid {
    grid-template-columns: 1fr;
  }
}

.formula-card {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-card);
  padding: 22px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.formula-card:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  box-shadow: 0 8px 24px rgba(45, 106, 79, 0.1);
}

.formula-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.formula-type-tag {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
}

.formula-type-tag.herbal_tea { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
.formula-type-tag.bath { background: #f5f3ff; color: #5b21b6; border: 1px solid #ddd6fe; }
.formula-type-tag.poultice { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
.formula-type-tag.soup { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }

.formula-expert-tag {
  font-size: 12px;
  color: var(--ink-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.formula-scholar-badge {
  font-size: 10.5px;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.formula-scholar-badge.real {
  background: #15803d;
  color: #fff;
}

.formula-scholar-badge.virtual {
  background: rgba(180, 83, 9, 0.12);
  color: #92400e;
  border: 1px solid rgba(180, 83, 9, 0.25);
}

.formula-cmu-link {
  font-size: 11px;
  color: #0369a1;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.formula-cmu-link:hover {
  color: #0284c7;
}

.formula-name {
  margin: 0 0 10px;
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 900;
  color: var(--primary-deep);
}

.formula-story {
  font-size: 13.5px;
  color: var(--ink-body);
  line-height: 1.6;
  margin: 0 0 16px;
}

.formula-composition-box {
  background: var(--bg-parchment);
  border-radius: 10px;
  padding: 12px 14px;
  border: 1px solid var(--border-light);
  margin-bottom: 14px;
}

.box-label {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 8px;
}

.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.role-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
}

.role-badge.君 { background: #fef08a; color: #854d0e; }
.role-badge.臣 { background: #e0f2fe; color: #075985; }
.role-badge.佐 { background: #dcfce7; color: #166534; }
.role-badge.使 { background: #f3e8ff; color: #6b21a8; }

.ing-name {
  font-weight: 700;
  color: var(--primary-deep);
}

.ing-ratio {
  font-weight: 600;
  color: var(--ink-muted);
}

.ing-action {
  font-size: 12px;
  color: var(--ink-muted);
}

.formula-instructions-box {
  margin-bottom: 12px;
}

.inst-label {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink-heavy);
  margin-bottom: 4px;
}

.inst-desc {
  font-size: 12.5px;
  color: var(--ink-body);
  line-height: 1.5;
  margin: 0;
}

.formula-caution-box {
  background: #fff5f5;
  border-left: 3px solid #e53e3e;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: #742a2a;
  margin-bottom: 16px;
}

.formula-card-footer {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed var(--border-light);
}

.btn-load-into-pot {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 700;
  background: var(--primary);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-load-into-pot:hover {
  background: var(--primary-deep);
}

/* ========================================= */
/* 分頁二：茶釜調配與 AI 神來一配樣式 */
/* ========================================= */
.preset-formulas-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--bg-card);
  padding: 12px 18px;
  border-radius: 14px;
  border: 1px solid var(--border-card);
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.quick-presets-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.preset-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-heavy);
}

.preset-pill {
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 12.5px;
  font-weight: 600;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: var(--ink-body);
  cursor: pointer;
  transition: all 0.2s ease;
}

.preset-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.reset-pill {
  color: #b91c1c;
}

.reset-pill:hover {
  border-color: #b91c1c;
  color: #b91c1c;
}

.divine-blend-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-divine-blend {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 13.5px;
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
  transition: all 0.25s ease;
}

.btn-divine-blend:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4);
}

.btn-divine-blend:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.select-intent-dropdown {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12.5px;
  border: 1px solid var(--border-light);
  background: var(--bg-card);
  color: var(--ink-heavy);
  outline: none;
}

.divine-decree-banner {
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  border-left: 5px solid #7c3aed;
  border-radius: 12px;
  padding: 14px 18px;
  margin-bottom: 20px;
}

.decree-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.decree-seal {
  background: #7c3aed;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.decree-title {
  font-size: 15px;
  font-weight: 800;
  color: #5b21b6;
  flex: 1;
}

.decree-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
}

.decree-desc {
  font-size: 13px;
  color: #4c1d95;
  margin: 0 0 8px;
  line-height: 1.5;
}

.decree-harmonize-pill {
  display: inline-flex;
  align-items: center;
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #bfdbfe;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 700;
  margin-bottom: 8px;
}

.decree-warnings {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.warn-pill {
  font-size: 11.5px;
  background: #fee2e2;
  color: #991b1b;
  padding: 2px 8px;
  border-radius: 4px;
}

/* 雙欄工作區 */
.alchemy-workspace {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 24px;
}

@media (max-width: 992px) {
  .alchemy-workspace {
    grid-template-columns: 1fr;
  }
}

.kettle-stage-card,
.analysis-stage-card {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-card);
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.kettle-illustration-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 16px;
  border-bottom: 1px dashed var(--border-light);
  margin-bottom: 18px;
}

/* 蒸氣與水壺 */
.steam-vapors {
  display: flex;
  gap: 14px;
  height: 24px;
  margin-bottom: 6px;
  opacity: 0.3;
  transition: opacity 0.3s;
}

.steam-vapors.boiling {
  opacity: 1;
}

.vapor {
  width: 6px;
  height: 20px;
  background: rgba(180, 200, 190, 0.6);
  border-radius: 50%;
  animation: vaporRise 1.8s infinite ease-out;
}

.vapor.v2 { animation-delay: 0.4s; }
.vapor.v3 { animation-delay: 0.8s; }

@keyframes vaporRise {
  0% { transform: translateY(10px) scale(0.6); opacity: 0; }
  50% { opacity: 0.8; }
  100% { transform: translateY(-16px) scale(1.4); opacity: 0; }
}

.kettle-graphic {
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kettle-lid {
  width: 60px;
  height: 12px;
  background: #475569;
  border-radius: 8px 8px 0 0;
}

.kettle-belly {
  width: 120px;
  height: 90px;
  background: #334155;
  border-radius: 16px 16px 24px 24px;
  overflow: hidden;
  position: relative;
  border: 3px solid #1e293b;
  display: flex;
  align-items: flex-end;
}

.kettle-belly.kettle-heat {
  border-color: #dc2626;
  box-shadow: 0 0 14px rgba(220, 38, 38, 0.35);
}

.kettle-liquid {
  width: 100%;
  height: 70%;
  position: relative;
  transition: all 0.5s ease;
}

.liquid-bubble {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: bubbleFloat 2s infinite ease-in;
}

.b1 { left: 25%; animation-delay: 0.2s; }
.b2 { left: 55%; animation-delay: 0.8s; }
.b3 { left: 75%; animation-delay: 1.4s; }

@keyframes bubbleFloat {
  0% { bottom: 0; opacity: 0; transform: scale(0.5); }
  50% { opacity: 0.8; }
  100% { bottom: 85%; opacity: 0; transform: scale(1.2); }
}

.kettle-base {
  width: 100px;
  height: 8px;
  background: #1e293b;
  border-radius: 0 0 6px 6px;
}

.kettle-summary-tag {
  margin-top: 12px;
  font-size: 13px;
  color: var(--ink-heavy);
}

/* 釜中清單 */
.selected-herbs-list {
  min-height: 80px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.empty-kettle-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  background: var(--bg-subtle);
  border-radius: 10px;
  border: 1px dashed var(--border-light);
  color: var(--ink-muted);
  font-size: 13px;
}

.pot-herb-chip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  font-size: 13px;
  transition: all 0.2s ease;
}

.pot-herb-chip.role-chip-jun {
  border-left: 4px solid #b91c1c;
  background: #fef2f2;
}

.pot-herb-chip.role-chip-chen {
  border-left: 4px solid #2563eb;
  background: #eff6ff;
}

.pot-herb-chip.role-chip-zuo {
  border-left: 4px solid #059669;
  background: #ecfdf5;
}

.pot-herb-chip.role-chip-shi {
  border-left: 4px solid #d97706;
  background: #fffbeb;
}

.herb-role-badge {
  background: var(--primary);
  color: #fff;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 4px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.herb-role-badge.badge-jun {
  background: #b91c1c;
}

.herb-role-badge.badge-chen {
  background: #2563eb;
}

.herb-role-badge.badge-zuo {
  background: #059669;
}

.herb-role-badge.badge-shi {
  background: #d97706;
}

.herb-chip-share {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-muted);
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 10px;
  margin-right: 6px;
}

.herb-chip-name {
  font-weight: 700;
  color: var(--primary-deep);
  flex: 1;
  margin: 0 8px;
}

.herb-chip-nature {
  color: var(--ink-muted);
  font-size: 12px;
}

.remove-chip-btn {
  background: none;
  border: none;
  color: var(--ink-muted);
  font-size: 14px;
  cursor: pointer;
  padding: 2px 6px;
}

.remove-chip-btn:hover {
  color: #b91c1c;
}

/* 待選貨架 */
.shelf-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.shelf-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-deep);
}

.shelf-search-input {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-light);
  background: var(--bg-subtle);
  outline: none;
  width: 140px;
}

.shelf-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  max-height: 280px;
  overflow-y: auto;
  padding-right: 4px;
}

.shelf-herb-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  background: var(--bg-subtle);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.shelf-herb-btn:hover:not(:disabled) {
  border-color: var(--primary);
  background: #fff;
}

.shelf-herb-btn.in-pot {
  opacity: 0.5;
  cursor: not-allowed;
  border-style: dashed;
}

.shelf-herb-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-heavy);
}

.shelf-herb-tag {
  font-size: 11px;
  color: var(--ink-muted);
}

/* 右欄分析面板樣式 */
.analysis-heading {
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 800;
  color: var(--primary-deep);
}

/* ⚖️ 君臣佐使配伍平衡天平樣式 */
.equilibrium-section {
  padding-bottom: 20px;
  border-bottom: 1px dashed var(--border-light);
  margin-bottom: 20px;
}

.equilibrium-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.eq-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.eq-score-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
  width: fit-content;
}

.eq-score-badge.score-great {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
}

.eq-score-badge.score-good {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.eq-score-badge.score-fair {
  background: #fffbeb;
  color: #b45309;
  border: 1px solid #fde68a;
}

.eq-score-badge.score-poor {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.btn-auto-harmonize {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 18px;
  font-size: 12.5px;
  font-weight: 800;
  background: linear-gradient(135deg, #059669, #0d9488);
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(5, 150, 105, 0.25);
  transition: all 0.25s ease;
}

.btn-auto-harmonize:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 14px rgba(5, 150, 105, 0.35);
}

.btn-auto-harmonize:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-sparkle {
  font-size: 14px;
}

/* 總平衡度進度條 */
.eq-meter-wrapper {
  margin-bottom: 16px;
}

.eq-meter-track {
  height: 12px;
  background: var(--bg-subtle);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border-light);
  position: relative;
}

.eq-meter-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.eq-meter-fill.fill-great {
  background: linear-gradient(90deg, #10b981, #059669);
}

.eq-meter-fill.fill-good {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.eq-meter-fill.fill-fair {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.eq-meter-fill.fill-poor {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.eq-meter-hints {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--ink-muted);
  margin-top: 4px;
}

/* 四象法度卡片 2x2 網格 */
.eq-roles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.eq-role-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s ease;
}

.eq-role-card.jun {
  border-top: 3px solid #b91c1c;
  background: #fef2f2;
}

.eq-role-card.chen {
  border-top: 3px solid #2563eb;
  background: #eff6ff;
}

.eq-role-card.zuo {
  border-top: 3px solid #059669;
  background: #ecfdf5;
}

.eq-role-card.shi {
  border-top: 3px solid #d97706;
  background: #fffbeb;
}

.eq-role-card.empty {
  opacity: 0.65;
  filter: grayscale(0.3);
}

.role-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.role-pillar-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.role-pillar-badge.jun {
  background: rgba(185, 28, 28, 0.12);
  color: #991b1b;
}

.role-pillar-badge.chen {
  background: rgba(37, 99, 235, 0.12);
  color: #1e40af;
}

.role-pillar-badge.zuo {
  background: rgba(5, 150, 105, 0.12);
  color: #065f46;
}

.role-pillar-badge.shi {
  background: rgba(217, 119, 6, 0.12);
  color: #92400e;
}

.role-score-text {
  font-size: 11.5px;
  font-weight: 800;
  color: var(--ink-heavy);
}

.role-herb-name {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--ink-heavy);
  margin-top: 2px;
}

.role-herb-duty {
  font-size: 11px;
  color: var(--ink-muted);
  line-height: 1.4;
}

/* 診斷與調和心法講評 */
.eq-verdict-banner {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 12.5px;
  line-height: 1.5;
}

.eq-verdict-banner.status-balanced {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #065f46;
}

.eq-verdict-banner.status-warning {
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
}

.eq-verdict-banner.status-info {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
}

.verdict-icon {
  font-size: 18px;
  line-height: 1;
}

.verdict-title {
  font-weight: 800;
  margin-bottom: 2px;
}

.verdict-advice {
  font-size: 12px;
  opacity: 0.95;
}

.gauge-section,
.flavor-section,
.meridian-resonance-section {
  padding-bottom: 18px;
  border-bottom: 1px dashed var(--border-light);
  margin-bottom: 18px;
}

.balance-gauge-wrapper {
  margin-bottom: 12px;
}

.balance-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  color: var(--ink-muted);
  margin-bottom: 6px;
}

.gauge-track {
  height: 10px;
  background: linear-gradient(to right, #3b82f6, #10b981 50%, #ef4444);
  border-radius: 5px;
  position: relative;
}

.gauge-pointer {
  position: absolute;
  top: -6px;
  transform: translateX(-50%);
  width: 16px;
  height: 22px;
  display: flex;
  justify-content: center;
}

.pointer-tip {
  width: 4px;
  height: 100%;
  background: #1e293b;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.4);
}

.balance-verdict-box {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
}

.balance-verdict-box strong {
  display: block;
  margin-bottom: 4px;
}

.balance-verdict-box p {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.5;
}

.balance-verdict-box.cold-theme { background: #eff6ff; color: #1e40af; border-left: 4px solid #3b82f6; }
.balance-verdict-box.neutral-theme { background: #ecfdf5; color: #065f46; border-left: 4px solid #10b981; }
.balance-verdict-box.warm-theme { background: #fef2f2; color: #991b1b; border-left: 4px solid #ef4444; }
.balance-verdict-box.empty { background: var(--bg-subtle); color: var(--ink-muted); }

/* 滋味條狀圖 */
.flavor-bars-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flavor-bar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.flavor-name {
  width: 60px;
  color: var(--ink-heavy);
  font-weight: 600;
}

.bar-outer {
  flex: 1;
  height: 8px;
  background: var(--bg-subtle);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.4s ease;
}

.bar-fill.bitter { background: #854d0e; }
.bar-fill.sweet { background: #f59e0b; }
.bar-fill.pungent { background: #8b5cf6; }
.bar-fill.cool { background: #10b981; }

.bar-val {
  width: 36px;
  text-align: right;
  color: var(--ink-muted);
}

/* 經絡膠囊 */
.meridian-pills-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.resonance-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 16px;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  font-size: 12px;
  color: var(--ink-muted);
}

.resonance-pill.active {
  background: rgba(45, 106, 79, 0.1);
  border-color: var(--primary);
  color: var(--primary-deep);
  font-weight: 700;
}

.elem-seal {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--border-light);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.resonance-pill.active .elem-seal {
  background: var(--primary);
}

/* 熬煮計時器 */
.timer-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.timer-stage-title {
  font-size: 12.5px;
  color: var(--amber-deep);
  font-weight: 600;
}

.timer-display-box {
  font-family: monospace;
  font-size: 26px;
  font-weight: 800;
  color: var(--primary-deep);
  background: var(--bg-subtle);
  padding: 4px 14px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
}

.timer-controls {
  display: flex;
  gap: 8px;
}

.btn-timer-action {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 700;
  background: var(--primary);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-timer-action.running {
  background: #d97706;
}

.btn-timer-subtle {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: var(--ink-heavy);
  cursor: pointer;
}

/* ========================================= */
/* 分頁三：專家 LLM 客製配方建議樣式 */
/* ========================================= */
.consult-formulate-section {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.consult-intro-card {
  background: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border-card);
  padding: 20px 24px;
}

.consult-section-title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 800;
  color: var(--primary-deep);
}

.consult-section-subtitle {
  margin: 0;
  font-size: 13.5px;
  color: var(--ink-body);
  line-height: 1.5;
}

.consult-form-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
}

@media (max-width: 900px) {
  .consult-form-grid {
    grid-template-columns: 1fr;
  }
}

.form-step-card {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-card);
  padding: 20px;
}

.step-num {
  font-size: 11px;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.step-title {
  margin: 0 0 14px;
  font-size: 16px;
  font-weight: 800;
  color: var(--primary-deep);
}

.expert-select-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.expert-persona-card {
  display: flex;
  flex-direction: column;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--border-light);
  background: var(--bg-subtle);
  cursor: pointer;
  transition: all 0.2s ease;
}

.expert-persona-card:hover {
  border-color: var(--primary);
  background: #fff;
}

.expert-persona-card.active {
  border-color: var(--primary);
  background: rgba(45, 106, 79, 0.08);
  box-shadow: 0 2px 8px rgba(45, 106, 79, 0.1);
}

.persona-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.persona-avatar {
  font-size: 20px;
}

.persona-type-badge {
  font-size: 10.5px;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.persona-type-badge.real {
  background: #15803d;
  color: #fff;
}

.persona-type-badge.virtual {
  background: rgba(180, 83, 9, 0.12);
  color: #92400e;
  border: 1px solid rgba(180, 83, 9, 0.25);
}

.persona-name {
  font-size: 14.5px;
  font-weight: 800;
  color: var(--primary-deep);
}

.persona-role {
  font-size: 12px;
  color: var(--ink-heavy);
  margin-bottom: 2px;
}

.persona-official-link-wrap {
  margin: 2px 0 4px;
}

.persona-official-link {
  font-size: 11px;
  color: #0369a1;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 500;
}

.persona-official-link:hover {
  color: #0284c7;
}

.persona-role {
  font-size: 12px;
  color: var(--ink-heavy);
  margin-bottom: 2px;
}

.persona-tone {
  font-size: 11px;
  color: var(--ink-muted);
}

.type-select-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.type-choice-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border-light);
  background: var(--bg-subtle);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-heavy);
  transition: all 0.2s ease;
}

.type-choice-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.consult-textarea {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--border-light);
  padding: 10px 12px;
  font-size: 13.5px;
  background: var(--bg-parchment);
  color: var(--ink-heavy);
  outline: none;
  resize: vertical;
  margin-bottom: 10px;
}

.consult-textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.15);
}

.quick-prompts-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.prompt-hint {
  font-size: 12px;
  color: var(--ink-muted);
}

.prompt-chip {
  font-size: 11.5px;
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  padding: 3px 8px;
  border-radius: 12px;
  cursor: pointer;
  color: var(--primary-deep);
}

.prompt-chip:hover {
  background: var(--primary);
  color: #fff;
}

.btn-generate-recipe {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(45, 106, 79, 0.25);
  transition: all 0.25s ease;
}

.btn-generate-recipe:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(45, 106, 79, 0.35);
}

.btn-generate-recipe:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 建議成果卡 */
.recipe-result-card {
  background: var(--bg-card);
  border-radius: 18px;
  border: 2px solid var(--primary);
  padding: 24px;
  box-shadow: 0 8px 30px rgba(45, 106, 79, 0.15);
}

.recipe-result-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
  border-bottom: 1px dashed var(--border-light);
  padding-bottom: 14px;
  flex-wrap: wrap;
}

.recipe-seal-stamp {
  background: #b91c1c;
  color: #fff;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 4px;
}

.recipe-result-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 900;
  color: var(--primary-deep);
}

.recipe-author-line {
  font-size: 13px;
  color: var(--ink-muted);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.recipe-expert-type-pill {
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 4px;
  font-weight: bold;
}

.recipe-expert-type-pill.real {
  background: #15803d;
  color: #fff;
}

.recipe-expert-type-pill.virtual {
  background: rgba(180, 83, 9, 0.12);
  color: #92400e;
  border: 1px solid rgba(180, 83, 9, 0.25);
}

.recipe-cmu-link {
  font-size: 12px;
  color: #0369a1;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 500;
}

.recipe-cmu-link:hover {
  color: #0284c7;
}

.recipe-bot-annotation {
  font-size: 11.5px;
  color: var(--ink-muted);
  background: rgba(201, 162, 39, 0.08);
  border-left: 3px solid var(--amber);
  padding: 4px 10px;
  border-radius: 4px;
  margin-top: 6px;
  line-height: 1.5;
}

.btn-load-ai-recipe {
  margin-left: auto;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  background: var(--primary);
  color: #fff;
  border: none;
  cursor: pointer;
}

.recipe-expert-speech {
  background: var(--bg-parchment);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 20px;
  border-left: 4px solid var(--amber-deep);
  position: relative;
}

.speech-quote-mark {
  position: absolute;
  top: 4px;
  left: 8px;
  font-size: 28px;
  color: rgba(45, 106, 79, 0.2);
  line-height: 1;
}

.recipe-expert-speech p {
  margin: 0;
  font-size: 14px;
  color: var(--ink-heavy);
  line-height: 1.6;
}

.recipe-ingredients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.recipe-herb-card {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  padding: 12px;
}

.herb-card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.herb-role-pill {
  font-size: 11px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.herb-role-pill.君 { background: #fef08a; color: #854d0e; }
.herb-role-pill.臣 { background: #e0f2fe; color: #075985; }
.herb-role-pill.佐 { background: #dcfce7; color: #166534; }
.herb-role-pill.使 { background: #f3e8ff; color: #6b21a8; }

.herb-name-text {
  font-size: 15px;
  color: var(--primary-deep);
}

.herb-ratio-text {
  font-size: 12px;
  color: var(--ink-muted);
  margin-bottom: 4px;
}

.herb-action-text {
  font-size: 12px;
  color: var(--ink-body);
}

.recipe-guide-section {
  background: rgba(45, 106, 79, 0.04);
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 14px;
}

.recipe-guide-section h4 {
  margin: 0 0 6px;
  font-size: 13.5px;
  color: var(--primary-deep);
}

.recipe-guide-section p {
  margin: 0;
  font-size: 13px;
  color: var(--ink-heavy);
  line-height: 1.5;
}

.recipe-caution-section {
  background: #fff5f5;
  border-left: 3px solid #e53e3e;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 12.5px;
  color: #742a2a;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 60px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px dashed var(--border-light);
}

.spinner {
  font-size: 32px;
  margin-bottom: 10px;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.btn-reset {
  margin-top: 14px;
  padding: 8px 18px;
  border-radius: 20px;
  background: var(--primary);
  color: #fff;
  border: none;
  font-size: 13px;
  cursor: pointer;
}

/* 行動端與 iPhone 最佳化 */
@media (max-width: 768px) {
  .alchemy-banner {
    padding: 24px 16px;
  }

  .alchemy-main-title {
    font-size: 22px;
  }

  .alchemy-tabs-nav {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    gap: 8px;
    padding-bottom: 8px;
  }

  .tab-switch-btn {
    flex-shrink: 0;
    padding: 8px 14px;
    font-size: 13px;
  }

  .roles-filter-bar {
    padding: 14px 12px;
  }

  .filter-cluster {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .pills-cluster {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    width: 100%;
    padding-bottom: 4px;
  }

  .filter-pill-btn {
    flex-shrink: 0;
  }

  .formulas-grid {
    grid-template-columns: 1fr;
  }

  .preset-formulas-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 14px 12px;
  }

  .quick-presets-group {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    width: 100%;
    padding-bottom: 4px;
  }

  .preset-pill {
    flex-shrink: 0;
  }

  .divine-blend-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-divine-blend {
    width: 100%;
    justify-content: center;
  }

  .select-intent-dropdown {
    width: 100%;
    font-size: 16px !important;
  }

  .kettle-stage-card,
  .analysis-stage-card {
    padding: 18px 14px;
  }

  .consult-form-grid {
    grid-template-columns: 1fr;
  }

  .consult-textarea {
    font-size: 16px !important;
  }

  .expert-select-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 540px) {
  .eq-roles-grid {
    grid-template-columns: 1fr;
  }

  .recipe-ingredients-grid {
    grid-template-columns: 1fr;
  }

  .recipe-result-card {
    padding: 16px 14px;
  }

  .recipe-result-title {
    font-size: 18px;
  }

  .btn-load-ai-recipe {
    width: 100%;
    text-align: center;
    margin-top: 8px;
  }
}

/* ========================================================= */
/* 📜 私房配方庫抽屜與快速按鈕 (Saved Formulas Drawer) */
/* ========================================================= */
.saved-formulas-pill {
  background: #fef3c7 !important;
  border-color: #f59e0b !important;
  color: #92400e !important;
  font-weight: 700 !important;
}

.saved-formulas-pill.active {
  background: #f59e0b !important;
  color: #ffffff !important;
  border-color: #d97706 !important;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.3);
}

.saved-formulas-drawer {
  background: #fffdf9;
  border: 1px solid #e8decb;
  border-radius: 16px;
  padding: 18px 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 18px rgba(90, 70, 45, 0.08);
  animation: fadeInDown 0.25s ease-out;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #e2d9c8;
  padding-bottom: 12px;
  margin-bottom: 14px;
}

.drawer-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.drawer-seal {
  background: #b91c1c;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 1px;
}

.drawer-hint {
  font-size: 12px;
  color: #8c7355;
}

.btn-close-drawer {
  background: none;
  border: 1px solid #d6c8b4;
  color: #78654f;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-close-drawer:hover {
  background: #f5eedc;
  color: #2c2419;
}

.saved-empty-box {
  padding: 24px 16px;
  text-align: center;
  color: #8c7860;
  font-size: 13.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: #faf6ee;
  border-radius: 10px;
}

.saved-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

.saved-formula-card {
  background: #ffffff;
  border: 1px solid #ebdcc5;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 6px rgba(60, 45, 20, 0.04);
  transition: all 0.2s;
}

.saved-formula-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(60, 45, 20, 0.08);
  border-color: #d4a373;
}

.saved-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11.5px;
}

.saved-date-tag {
  color: #8c7355;
}

.saved-score-badge {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
}

.saved-score-badge.good {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.saved-score-badge.fair {
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
}

.saved-name {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #2c251d;
  font-family: 'Noto Serif TC', serif;
}

.saved-herbs-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.saved-herb-chip {
  background: #f7f3ea;
  border: 1px solid #e2d5c3;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
  color: #4a3b2c;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.saved-herb-chip.role-jun {
  border-color: #f59e0b;
  background: #fffbeb;
  color: #92400e;
}

.saved-herb-chip.role-chen {
  border-color: #3b82f6;
  background: #eff6ff;
  color: #1e40af;
}

.saved-herb-chip.role-zuo {
  border-color: #10b981;
  background: #ecfdf5;
  color: #065f46;
}

.saved-herb-chip.role-shi {
  border-color: #8b5cf6;
  background: #f5f3ff;
  color: #5b21b6;
}

.saved-actions-row {
  display: flex;
  gap: 8px;
  margin-top: 4px;
  padding-top: 8px;
  border-top: 1px solid #f2ede4;
}

.btn-saved-load {
  flex: 1;
  background: #2d6a4f;
  color: #ffffff;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-saved-load:hover {
  background: #1b4332;
}

.btn-saved-view {
  background: #f5eedc;
  border: 1px solid #d8caa7;
  color: #634d30;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-saved-view:hover {
  background: #ebdcc0;
}

.btn-saved-delete {
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-saved-delete:hover {
  background: #fecaca;
}

/* 觸發保存按鈕強化 */
.btn-ticket-trigger {
  background: #fef3c7 !important;
  border-color: #f59e0b !important;
  color: #92400e !important;
  font-weight: 700 !important;
}

.btn-ticket-trigger:hover:not(:disabled) {
  background: #fde68a !important;
  transform: translateY(-1px);
}

.recipe-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-save-ai-recipe {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #f59e0b;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save-ai-recipe:hover {
  background: #fde68a;
  transform: translateY(-1px);
}

/* ========================================================= */
/* 📜 本草私房配方箋彈窗 (Ticket Modal) */
/* ========================================================= */
.ticket-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(18, 22, 18, 0.65);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.2s ease-out;
}

.ticket-modal-card {
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  background: #faf7f0;
  border: 2px solid #d4c3a3;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.ticket-modal-header {
  background: linear-gradient(135deg, #2d5f4d, #1b4332);
  color: #fff;
  padding: 18px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-seal-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ticket-red-seal {
  background: #b91c1c;
  color: #fff;
  font-size: 13px;
  font-weight: 900;
  padding: 4px 8px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

.ticket-modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  font-family: 'Noto Serif TC', serif;
}

.ticket-modal-subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  color: #c5ded3;
}

.ticket-close-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.ticket-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.ticket-scroll-body {
  padding: 20px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #faf7f0 url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h40v40H0z" fill="none"/><circle cx="20" cy="20" r="0.5" fill="rgba(140,115,85,0.06)"/></svg>');
}

.ticket-toast-banner {
  background: #ecfdf5;
  border: 1px solid #10b981;
  color: #065f46;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
  animation: fadeInDown 0.2s ease-out;
}

.ticket-meta-box {
  background: #ffffff;
  border: 1px solid #e5d8c3;
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ticket-name-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ticket-label {
  font-size: 14px;
  font-weight: 700;
  color: #4a3822;
  white-space: nowrap;
}

.ticket-name-input {
  flex: 1;
  border: 1.5px solid #d4c5ad;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 15px;
  font-weight: 700;
  color: #2c251d;
  background: #fffdf9;
  outline: none;
  transition: all 0.2s;
}

.ticket-name-input:focus {
  border-color: #2d6a4f;
  box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
}

.ticket-meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
}

.ticket-meta-tag {
  background: #f5eedf;
  color: #6d5438;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.ticket-meta-tag.origin {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.ticket-section-title {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 800;
  color: #3d2f1f;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-herbs-count {
  font-size: 12px;
  color: #8c7355;
  font-weight: normal;
}

.ticket-herbs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
}

.ticket-herb-card {
  background: #ffffff;
  border: 1px solid #ebdcc5;
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ticket-herb-card.role-jun { border-left: 4px solid #f59e0b; }
.ticket-herb-card.role-chen { border-left: 4px solid #3b82f6; }
.ticket-herb-card.role-zuo { border-left: 4px solid #10b981; }
.ticket-herb-card.role-shi { border-left: 4px solid #8b5cf6; }

.ticket-herb-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ticket-role-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.ticket-role-badge.badge-jun { background: #fef3c7; color: #92400e; }
.ticket-role-badge.badge-chen { background: #dbeafe; color: #1e40af; }
.ticket-role-badge.badge-zuo { background: #d1fae5; color: #065f46; }
.ticket-role-badge.badge-shi { background: #ede9fe; color: #5b21b6; }

.ticket-herb-name {
  font-size: 15px;
  color: #1f2937;
}

.ticket-herb-share {
  font-size: 12px;
  font-weight: 700;
  color: #78350f;
}

.ticket-herb-details {
  display: flex;
  gap: 6px;
  font-size: 11.5px;
}

.ticket-nature-pill,
.ticket-channel-pill {
  background: #f3ede2;
  color: #63503b;
  padding: 2px 6px;
  border-radius: 4px;
}

.ticket-herb-duty {
  margin: 0;
  font-size: 11.5px;
  color: #6b7280;
  line-height: 1.4;
}

.ticket-diagnosis-card {
  background: #ffffff;
  border: 1px solid #e5d8c3;
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ticket-diag-score-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.diag-score-badge {
  font-size: 13px;
  color: #4a3822;
}

.diag-score-badge strong {
  font-size: 16px;
  color: #b45309;
}

.diag-verdict-title {
  background: #f5eedf;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #78350f;
}

.ticket-diag-desc {
  margin: 0;
  font-size: 12px;
  color: #524230;
  line-height: 1.45;
}

.ticket-guide-content {
  background: #f7f3ea;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 12.5px;
  color: #4b3e2e;
  line-height: 1.5;
}

.ticket-note-textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid #dcd0bc;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: #2c251d;
  background: #fff;
  resize: vertical;
  outline: none;
}

.ticket-note-textarea:focus {
  border-color: #2d6a4f;
}

.ticket-disclaimer-strip {
  background: #faf2e6;
  border: 1px dashed #ddc7a7;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 11px;
  color: #8c7150;
  line-height: 1.45;
}

.ticket-modal-footer {
  background: #f5ede0;
  border-top: 1px solid #e0d1bb;
  padding: 14px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.ticket-footer-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-ticket-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-save-storage {
  background: #2d6a4f;
  color: #fff;
  box-shadow: 0 2px 6px rgba(45, 106, 79, 0.25);
}

.btn-save-storage:hover {
  background: #1b4332;
  transform: translateY(-1px);
}

.btn-download-file {
  background: #d97706;
  color: #fff;
  box-shadow: 0 2px 6px rgba(217, 119, 6, 0.25);
}

.btn-download-file:hover {
  background: #b45309;
  transform: translateY(-1px);
}

.btn-copy-text {
  background: #ffffff;
  color: #4a3822;
  border: 1px solid #d1c0a8;
}

.btn-copy-text:hover {
  background: #f7f1e6;
  border-color: #b8a388;
}

.btn-ticket-close {
  background: none;
  border: 1px solid #c9b99e;
  color: #634f36;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-ticket-close:hover {
  background: #ece0cd;
  color: #1f1810;
}

@media (max-width: 640px) {
  .ticket-modal-card {
    max-height: 95vh;
  }
  .ticket-modal-header {
    padding: 14px 16px;
  }
  .ticket-scroll-body {
    padding: 14px 16px;
  }
  .ticket-modal-footer {
    padding: 12px 16px;
    flex-direction: column-reverse;
  }
  .ticket-footer-actions {
    width: 100%;
    flex-direction: column;
  }
  .btn-ticket-action,
  .btn-ticket-close {
    width: 100%;
    justify-content: center;
  }
  .ticket-herbs-grid {
    grid-template-columns: 1fr;
  }
  .saved-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>

