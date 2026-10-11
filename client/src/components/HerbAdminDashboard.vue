<template>
  <div class="admin-dashboard-container">
    <!-- 未登入狀態：古典密鑰解鎖門扉與快速角色切換 -->
    <div v-if="!isAuthenticated" class="admin-auth-gate">
      <div class="auth-card">
        <div class="auth-seal">策</div>
        <h3 class="auth-title">台灣本草植物誌 · 典藏管理中樞</h3>
        <p class="auth-desc">
          提供本草資料典藏、前後台角色權限 (RBAC)、LLM API 來源配置、專家 RAG 沙盒調校、批次匯入/線上編輯、資料匯出與專題文章生成。
        </p>

        <!-- 快速示範角色切換按鈕組 -->
        <div class="demo-accounts-picker">
          <div class="picker-label">快速切換體驗角色 (點擊即可自動填入)：</div>
          <div class="roles-chips">
            <button
              v-for="acc in demoAccounts"
              :key="acc.username"
              type="button"
              class="role-chip-btn"
              :class="{ active: inputUsername === acc.username }"
              @click="selectDemoAccount(acc)"
            >
              <span>{{ acc.avatar }}</span>
              <span class="chip-name">{{ acc.name }}</span>
              <span class="chip-badge">{{ acc.roleName }}</span>
            </button>
          </div>
        </div>

        <div class="auth-input-group">
          <input
            v-model="inputUsername"
            type="text"
            class="auth-input"
            placeholder="管理員帳號 (預設: admin)"
            @keydown.enter="handleLogin"
          />
          <input
            v-model="inputPasscode"
            type="password"
            class="auth-input"
            placeholder="管理密碼 (預設: taiwanherb2026)"
            @keydown.enter="handleLogin"
          />
          <button class="auth-submit-btn" :disabled="isLoggingIn" @click="handleLogin">
            {{ isLoggingIn ? '驗證授權中...' : '解鎖典藏中樞 ➔' }}
          </button>
        </div>

        <div class="auth-hint">
          💡 提示：至高管理員 <code>admin / taiwanherb2026</code> 具備全權限；策展師 <code>curator_lin</code>、生藥顧問 <code>expert_chen</code>、觀察員 <code>auditor_wang</code> 可體驗不同前後台權限等級。
        </div>
      </div>
    </div>

    <!-- 已登入狀態：殿堂級本草管理中樞 -->
    <div v-else class="admin-main-panel">
      <!-- 頂部管理控制列 -->
      <div class="admin-topbar">
        <div class="admin-badge-group">
          <span class="admin-seal">{{ currentUser?.avatar || '管' }}</span>
          <div>
            <div class="admin-title">
              台灣本草知識庫 · 後台管理與研發中樞
              <span class="user-role-tag">{{ currentUser?.roleName || '管理員' }}</span>
            </div>
            <div class="admin-sub">
              使用者：<strong>{{ currentUser?.name || '管理員' }}</strong> ({{ currentUser?.username }}) ‧ 權限範圍：{{ currentUser?.scope || '全庫管理' }}
            </div>
          </div>
        </div>

        <div class="admin-actions-group">
          <button
            class="admin-tool-btn"
            title="快捷切換至專題文章生成實驗室"
            @click="currentTab = 'studio'"
          >
            ✍️ 專題文章生成
          </button>
          <button
            class="admin-tool-btn"
            title="快捷切換至資料匯入與編輯"
            @click="currentTab = 'import'"
          >
            📥 批次匯入
          </button>
          <button
            class="admin-tool-btn"
            title="快捷切換至條件篩選資料匯出"
            @click="currentTab = 'export'"
          >
            📤 條件匯出
          </button>
          <button
            v-if="hasPerm('system:reset')"
            class="admin-tool-btn warning-btn"
            @click="confirmReset"
          >
            🔄 重置種子庫
          </button>
          <button class="admin-tool-btn exit-btn" @click="handleLogout">
            ✕ 登出
          </button>
        </div>
      </div>

      <!-- 核心數據指標卡 -->
      <div class="admin-stats-grid">
        <div class="stat-card" @click="currentTab = 'herbs'">
          <div class="stat-icon">🌿</div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalHerbs || 0 }} <small>味</small></div>
            <div class="stat-label">全庫典藏本草 ({{ stats.publishedHerbs || 0 }} 發布 / {{ stats.draftHerbs || 0 }} 草稿)</div>
          </div>
        </div>

        <div class="stat-card" @click="currentTab = 'users'">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <div class="stat-value">{{ usersList.length || 5 }} <small>位</small></div>
            <div class="stat-label">前後台系統角色與使用者</div>
          </div>
        </div>

        <div class="stat-card" @click="currentTab = 'llm'">
          <div class="stat-icon">🤖</div>
          <div class="stat-content">
            <div class="stat-value">{{ activeLlmName }}</div>
            <div class="stat-label">當前活躍 LLM 語意引擎</div>
          </div>
        </div>

        <div class="stat-card" @click="currentTab = 'experts'">
          <div class="stat-icon">🍵</div>
          <div class="stat-content">
            <div class="stat-value">{{ expertList.length || 4 }} <small>席</small></div>
            <div class="stat-label">RAG 風土專家 Persona</div>
          </div>
        </div>
      </div>

      <!-- 管理模組分頁導覽列 (完整 9 大維度) -->
      <div class="admin-tabs-nav">
        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'users' }"
          @click="currentTab = 'users'"
        >
          <span>👥</span>
          <span>使用者與角色權限 (RBAC)</span>
        </button>

        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'llm' }"
          @click="currentTab = 'llm'"
        >
          <span>🤖</span>
          <span>LLM 來源與 API 管理</span>
        </button>

        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'experts' }"
          @click="currentTab = 'experts'"
        >
          <span>🍵</span>
          <span>專家 RAG 調校與沙盒</span>
        </button>

        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'import' }"
          @click="currentTab = 'import'"
        >
          <span>📥</span>
          <span>資料匯入與線上編輯</span>
        </button>

        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'export' }"
          @click="currentTab = 'export'"
        >
          <span>📤</span>
          <span>條件篩選資料匯出</span>
        </button>

        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'studio' }"
          @click="currentTab = 'studio'"
        >
          <span>✍️</span>
          <span>本草專題文章實驗室</span>
        </button>

        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'herbs' }"
          @click="currentTab = 'herbs'"
        >
          <span>📜</span>
          <span>本草數據管理 (CRUD)</span>
        </button>

        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'analytics' }"
          @click="currentTab = 'analytics'"
        >
          <span>📈</span>
          <span>風土分佈與圖譜</span>
        </button>

        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'logs' }"
          @click="currentTab = 'logs'"
        >
          <span>📋</span>
          <span>審計日誌 ({{ logs.length }})</span>
        </button>
      </div>

      <!-- ======================================================== -->
      <!-- 分頁一：👥 使用者與角色權限管理 (RBAC) -->
      <!-- ======================================================== -->
      <div v-if="currentTab === 'users'" class="admin-tab-pane">
        <div class="pane-header-box">
          <div>
            <h3 class="pane-title">👥 前後台使用者與角色權限中樞 (RBAC)</h3>
            <p class="pane-desc">
              系統劃分超級管理員 (至高御史)、本草策展師、諮詢顧問、觀察員與一般會員，精確控制前後台存取權限。
            </p>
          </div>
          <button
            v-if="hasPerm('users:manage')"
            class="btn-primary-action"
            @click="openCreateUserModal"
          >
            <span>➕</span>
            <span>新增使用者帳號</span>
          </button>
          <div v-else class="perm-notice-tag">
            🔒 僅「至高管理員」具備帳號異動權限
          </div>
        </div>

        <!-- 角色矩陣卡片 -->
        <div class="roles-matrix-grid">
          <div
            v-for="r in rolesList"
            :key="r.key"
            class="role-summary-card"
            :class="{ 'current-role': currentUser?.role === r.key }"
          >
            <div class="role-badge-row">
              <span class="role-badge-pill">{{ r.badge }}</span>
              <span class="role-key-name">{{ r.name }}</span>
            </div>
            <div class="role-desc-text">{{ r.description }}</div>
            <div class="role-perms-list">
              <span v-for="p in r.permissions" :key="p" class="perm-pill">{{ p }}</span>
            </div>
          </div>
        </div>

        <!-- 使用者列表表格 -->
        <div class="table-container-card">
          <div class="table-card-header">
            <h4>系統登錄使用者清單 (共 {{ usersList.length }} 位)</h4>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>身分</th>
                <th>登入帳號</th>
                <th>使用者名稱</th>
                <th>角色權限</th>
                <th>電子郵件</th>
                <th>狀態</th>
                <th>最後登入</th>
                <th style="text-align: right;">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in usersList" :key="u.id">
                <td style="font-size: 20px;">{{ u.avatar }}</td>
                <td><strong>{{ u.username }}</strong></td>
                <td>{{ u.name }}</td>
                <td>
                  <span class="role-pill-badge" :data-role="u.role">
                    {{ u.roleName }}
                  </span>
                </td>
                <td style="color: var(--ink-muted);">{{ u.email }}</td>
                <td>
                  <span class="status-indicator" :class="u.status">
                    {{ u.status === 'active' ? '正常' : '已停用' }}
                  </span>
                </td>
                <td style="font-size: 12px; color: var(--ink-muted);">
                  {{ u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('zh-TW') : '尚未登入' }}
                </td>
                <td style="text-align: right;">
                  <button
                    v-if="hasPerm('users:manage')"
                    class="action-sm-btn"
                    @click="openEditUserModal(u)"
                  >
                    編輯
                  </button>
                  <button
                    v-if="hasPerm('users:manage') && u.username !== 'admin'"
                    class="action-sm-btn danger-btn"
                    @click="deleteUser(u)"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 分頁二：🤖 LLM 提供商與 API 來源管理 -->
      <!-- ======================================================== -->
      <div v-if="currentTab === 'llm'" class="admin-tab-pane">
        <div class="pane-header-box">
          <div>
            <h3 class="pane-title">🤖 LLM 提供商與 API 來源中樞</h3>
            <p class="pane-desc">
              集中管理語意模型來源，支援系統內建離線知識引擎 (Zero-config)、Google Gemini、OpenAI/相容架構與 Anthropic Claude。
            </p>
          </div>
          <div class="engine-active-indicator">
            當前活躍：<strong>{{ activeLlmName }}</strong>
          </div>
        </div>

        <!-- 提供商選擇卡 -->
        <div class="llm-providers-grid">
          <div
            v-for="(prov, key) in llmConfig.providers"
            :key="key"
            class="llm-provider-card"
            :class="{ active: llmConfig.activeProvider === key }"
            @click="selectLlmProvider(key)"
          >
            <div class="provider-card-header">
              <span class="provider-icon">
                {{ key === 'builtin' ? '🌿' : key === 'gemini' ? '🤖' : key === 'openai' ? '⚡' : key === 'ollama' ? '🦙' : '🎭' }}
              </span>
              <div>
                <div class="provider-name">{{ prov.name }}</div>
                <div class="provider-vendor">{{ prov.vendor }}</div>
              </div>
              <span v-if="llmConfig.activeProvider === key" class="active-badge">使用中</span>
            </div>

            <div class="provider-desc">{{ prov.description }}</div>

            <div class="provider-meta-row">
              <span class="meta-label">預設模型：</span>
              <code>{{ prov.model }}</code>
            </div>

            <div class="provider-meta-row">
              <span class="meta-label">金鑰狀態：</span>
              <span :class="prov.hasApiKey || prov.isKeylessAllowed || key === 'builtin' ? 'text-success' : 'text-muted'">
                {{ key === 'builtin' ? '免金鑰 (內建)' : (prov.isKeylessAllowed ? '免金鑰 (本地/Ollama)' : (prov.hasApiKey ? '已配置 (已脫敏)' : '未設定')) }}
              </span>
            </div>
          </div>
        </div>

        <!-- 提供商詳細設定表單 -->
        <div class="llm-config-form-card" v-if="selectedProviderData">
          <div class="form-card-title">
            <span>⚙️ 設定「{{ selectedProviderData.name }}」連線參數</span>
            <button
              class="btn-ping-test"
              :disabled="isPingingLlm"
              @click="testLlmPing(llmConfig.activeProvider)"
            >
              {{ isPingingLlm ? '連線測試中...' : '⚡ 即時連線測試 (Ping)' }}
            </button>
          </div>

          <!-- 連線測試結果反饋徽章 -->
          <div v-if="pingResult" class="ping-result-box" :class="pingResult.status">
            <div class="ping-status-row">
              <strong>連線狀態：{{ pingResult.status === 'online' ? '✅ 連線成功' : '⚠️ ' + pingResult.status }}</strong>
              <span>延遲：{{ pingResult.latencyMs }} ms</span>
            </div>
            <div class="ping-msg">{{ pingResult.message }}</div>
          </div>

          <div class="llm-inputs-grid">
            <div class="input-item" v-if="llmConfig.activeProvider !== 'builtin'">
              <label>API Key (金鑰)：</label>
              <div class="input-with-button">
                <input
                  v-model="editApiKey"
                  :type="showApiKeyText ? 'text' : 'password'"
                  class="custom-input"
                  :placeholder="selectedProviderData.apiKey ? selectedProviderData.apiKey : (selectedProviderData.isKeylessAllowed ? 'Ollama / 本地端點可免填金鑰' : '請輸入 API Key (如 sk-...)')"
                />
                <button
                  type="button"
                  class="btn-toggle-eye"
                  @click="showApiKeyText = !showApiKeyText"
                >
                  {{ showApiKeyText ? '隱藏' : '檢視' }}
                </button>
              </div>
              <small class="hint-muted" v-if="selectedProviderData.isKeylessAllowed">
                🦙 本地或區域網路 Ollama 免填 API Key 即可直接呼叫連線。
              </small>
              <small class="hint-muted" v-else>系統已實施安全脫敏遮罩，保存時僅傳輸新變更之金鑰。</small>
            </div>

            <div class="input-item" v-if="llmConfig.activeProvider !== 'builtin'">
              <label>API Base URL (端點位置)：</label>
              <input
                v-model="selectedProviderData.baseUrl"
                type="text"
                class="custom-input"
                placeholder="https://..."
              />
            </div>

            <div class="input-item">
              <label>Model 名稱：</label>
              <input
                v-model="selectedProviderData.model"
                type="text"
                class="custom-input"
                placeholder="模型代碼"
              />
            </div>

            <div class="input-item">
              <label>溫度參數 (Temperature: {{ llmConfig.temperature }})：</label>
              <input
                v-model.number="llmConfig.temperature"
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                class="custom-range"
              />
            </div>

            <div class="input-item">
              <label>最大生成長度 (Max Tokens: {{ llmConfig.maxTokens }})：</label>
              <input
                v-model.number="llmConfig.maxTokens"
                type="range"
                min="500"
                max="4000"
                step="100"
                class="custom-range"
              />
            </div>
          </div>

          <div class="form-actions-row">
            <button
              v-if="hasPerm('llm:manage')"
              class="btn-save-llm"
              :disabled="isSavingLlm"
              @click="saveLlmSettings"
            >
              {{ isSavingLlm ? '儲存中...' : '💾 保存 LLM 提供商配置' }}
            </button>
            <div v-else class="perm-notice-tag">
              🔒 僅至高管理員可修改 LLM API 金鑰與提供商設定
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 分頁三：🍵 專家 RAG 調校與測試沙盒 (Playground) -->
      <!-- ======================================================== -->
      <div v-if="currentTab === 'experts'" class="admin-tab-pane">
        <div class="pane-header-box">
          <div>
            <h3 class="pane-title">🍵 專家 RAG Persona 管理與即時測試沙盒</h3>
            <p class="pane-desc">
              調校 4 大風土專家與自訂顧問之語意風格、System Prompt 與 RAG 檢索參數，並可於右側沙盒即時驗證檢索品質與回答效果。
            </p>
          </div>
          <div class="header-btns">
            <button
              v-if="hasPerm('experts:write')"
              class="btn-secondary-action"
              @click="openCreateExpertModal"
            >
              ➕ 建立自訂本草專家
            </button>
            <button
              v-if="hasPerm('experts:write')"
              class="btn-secondary-action danger-hover"
              @click="resetExperts"
            >
              🔄 重設回預設四大名師
            </button>
          </div>
        </div>

        <div class="experts-playground-split">
          <!-- 左側：專家 Persona 設定卡片列表 -->
          <div class="experts-list-col">
            <div
              v-for="exp in expertList"
              :key="exp.id"
              class="expert-admin-card"
              :class="{ selected: selectedExpertForEdit?.id === exp.id }"
              @click="selectedExpertForEdit = exp"
            >
              <div class="exp-header-row">
                <span class="exp-avatar-large">{{ exp.avatar }}</span>
                <div class="exp-title-info">
                  <div class="exp-name-line">
                    <span class="exp-name">{{ exp.name }}</span>
                    <span class="exp-seal-pill">{{ exp.seal }}</span>
                  </div>
                  <div class="exp-subtitle">{{ exp.title }}</div>
                </div>
              </div>

              <div class="exp-body-fields">
                <div class="field-row">
                  <span class="lbl">風土產區：</span>
                  <input v-model="exp.region" class="inline-edit-input" />
                </div>
                <div class="field-row">
                  <span class="lbl">代表口頭禪：</span>
                  <textarea v-model="exp.catchphrase" rows="2" class="inline-edit-textarea"></textarea>
                </div>
                <div class="field-row">
                  <span class="lbl">問候語：</span>
                  <input v-model="exp.greeting" class="inline-edit-input" />
                </div>
                <div class="field-row">
                  <span class="lbl">風格語調描述：</span>
                  <textarea v-model="exp.tone" rows="2" class="inline-edit-textarea"></textarea>
                </div>
              </div>

              <div class="exp-card-footer">
                <button
                  v-if="hasPerm('experts:write')"
                  class="btn-save-exp"
                  @click.stop="saveExpertSettings(exp)"
                >
                  💾 保存微調
                </button>
                <button
                  v-if="hasPerm('experts:write') && exp.isCustom"
                  class="btn-delete-exp"
                  @click.stop="deleteCustomExpert(exp)"
                >
                  🗑️ 刪除自訂專家
                </button>
                <button
                  class="btn-test-exp"
                  @click.stop="loadIntoPlayground(exp)"
                >
                  ⚡ 載入沙盒測試
                </button>
              </div>
            </div>
          </div>

          <!-- 右側：專家 RAG 測試沙盒 (Interactive Playground) -->
          <div class="playground-col">
            <div class="playground-card">
              <div class="pg-header">
                <h4>🎯 專家 RAG 測試沙盒 (Playground)</h4>
                <div class="pg-target-expert" v-if="playgroundExpert">
                  當前測試：<strong>{{ playgroundExpert.name }}</strong> ({{ playgroundExpert.title }})
                </div>
              </div>

              <div class="pg-body">
                <div class="pg-presets">
                  <span class="pg-lbl">快速填入提問：</span>
                  <button
                    v-for="p in playgroundPresets"
                    :key="p"
                    class="preset-chip"
                    @click="playgroundQuery = p"
                  >
                    {{ p }}
                  </button>
                </div>

                <div class="pg-input-wrap">
                  <textarea
                    v-model="playgroundQuery"
                    rows="3"
                    class="pg-textarea"
                    placeholder="請輸入欲測試之草藥提問或生活體質問題..."
                  ></textarea>
                </div>

                <div class="pg-controls-row">
                  <div class="pg-control-item">
                    <label>Top-K 檢索篇數 ({{ playgroundTopK }})：</label>
                    <input
                      v-model.number="playgroundTopK"
                      type="range"
                      min="1"
                      max="5"
                      class="custom-range"
                    />
                  </div>
                  <button
                    class="btn-run-playground"
                    :disabled="isRunningPlayground || !playgroundQuery.trim()"
                    @click="runPlaygroundTest"
                  >
                    {{ isRunningPlayground ? '檢索與生成中...' : '執行沙盒 RAG 生成測試 ➔' }}
                  </button>
                </div>

                <!-- 沙盒輸出區 -->
                <div v-if="playgroundOutput" class="pg-output-wrap">
                  <div class="pg-section-title">
                    <span>📚 檢索出的 Top-{{ playgroundOutput.retrievedHerbs.length }} 本草知識條目 (Citations)</span>
                  </div>
                  <div class="pg-citations-grid">
                    <div
                      v-for="c in playgroundOutput.retrievedHerbs"
                      :key="c.id"
                      class="pg-cite-card"
                    >
                      <div class="cite-name-row">
                        <strong>{{ c.name }}</strong>
                        <span class="cite-score">相關分: {{ c.relevanceScore }}</span>
                      </div>
                      <div class="cite-sci"><em>{{ c.scientificName }}</em></div>
                      <div class="cite-reason">{{ c.relevanceReason }}</div>
                    </div>
                  </div>

                  <div class="pg-section-title" style="margin-top: 20px;">
                    <span>💬 專家 Persona 語意生成回答</span>
                  </div>
                  <div class="pg-markdown-box">
                    <pre class="markdown-preview">{{ playgroundOutput.reply }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 分頁四：📥 本草資料匯入、範例與線上工作台編輯 -->
      <!-- ======================================================== -->
      <div v-if="currentTab === 'import'" class="admin-tab-pane">
        <div class="pane-header-box">
          <div>
            <h3 class="pane-title">📥 本草資料批次匯入與線上編輯工作台</h3>
            <p class="pane-desc">
              支援 JSON 或 CSV (含 UTF-8 BOM) 檔案上傳與純文字貼入。解析後進入線上表格直接編輯、驗證必填欄位，確認無誤後一鍵寫入資料庫。
            </p>
          </div>
          <div class="header-btns">
            <button class="btn-primary-action" @click="loadSampleImportData">
              <span>🌱</span>
              <span>載入標準示範資料 (5味野生草藥)</span>
            </button>
            <a
              href="/api/admin/import/sample?format=json&download=true"
              class="btn-secondary-action"
            >
              📄 下載範例 JSON
            </a>
            <a
              href="/api/admin/import/sample?format=csv&download=true"
              class="btn-secondary-action"
            >
              📊 下載範例 CSV
            </a>
          </div>
        </div>

        <!-- 檔案上傳與貼入區塊 -->
        <div class="import-upload-card">
          <div class="upload-dropzone">
            <input
              type="file"
              accept=".json,.csv,text/csv,application/json"
              class="file-input-hidden"
              id="herbFileInput"
              @change="handleFileUpload"
            />
            <label for="herbFileInput" class="dropzone-label">
              <span class="upload-icon">📂</span>
              <span class="upload-title">點擊選擇本草檔案 (.json 或 .csv) 或直接拖曳至此</span>
              <span class="upload-sub">支援標準本草欄位：名稱、學名、產區、分類、性味、功效、安全等級</span>
            </label>
          </div>

          <div class="text-paste-section">
            <div class="paste-header">
              <span>或直接貼上 JSON / CSV 文本：</span>
              <div class="format-radios">
                <label>
                  <input type="radio" value="json" v-model="importFormat" /> JSON
                </label>
                <label>
                  <input type="radio" value="csv" v-model="importFormat" /> CSV
                </label>
              </div>
            </div>
            <textarea
              v-model="rawImportText"
              rows="6"
              class="paste-textarea"
              placeholder="在此貼入待匯入的本草文字內容..."
            ></textarea>
            <div class="paste-footer">
              <button
                class="btn-parse-import"
                :disabled="isParsingImport || !rawImportText.trim()"
                @click="parseAndOpenEditor"
              >
                {{ isParsingImport ? '解析中...' : '解析內容並載入線上工作台 ➔' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 線上預覽與直接編輯工作台 (Interactive Inline Table Editor) -->
        <div v-if="stagedHerbs.length > 0" class="staged-editor-card">
          <div class="staged-header-row">
            <div>
              <h4>📝 本草線上編輯審查工作台</h4>
              <div class="staged-stats">
                共解析 <strong>{{ stagedHerbs.length }}</strong> 筆 ‧
                合格：<span class="text-success">{{ stagedValidCount }} 筆</span> ‧
                需補全：<span class="text-danger">{{ stagedHerbs.length - stagedValidCount }} 筆</span>
              </div>
            </div>

            <div class="staged-actions">
              <button class="btn-tool-secondary" @click="addNewStagedRow">
                ➕ 新增一行草藥
              </button>
              <button class="btn-tool-secondary" @click="stagedHerbs = []">
                🗑️ 清空工作台
              </button>
              <button
                v-if="hasPerm('import:write')"
                class="btn-primary-action"
                :disabled="isCommittingImport"
                @click="commitStagedHerbs"
              >
                {{ isCommittingImport ? '正在寫入本草庫...' : '🌿 確認批次典藏入庫 (Commit to DB) ➔' }}
              </button>
              <div v-else class="perm-notice-tag">
                🔒 僅具備 import:write 權限者可確認寫入
              </div>
            </div>
          </div>

          <div class="staged-table-wrap">
            <table class="staged-table">
              <thead>
                <tr>
                  <th style="width: 45px;">狀態</th>
                  <th style="width: 140px;">藥材名稱 *</th>
                  <th style="width: 150px;">學名</th>
                  <th style="width: 140px;">風土產區</th>
                  <th style="width: 130px;">分類 *</th>
                  <th style="width: 80px;">藥性</th>
                  <th>功效描述</th>
                  <th style="width: 120px;">安全等級</th>
                  <th style="width: 70px; text-align: center;">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in stagedHerbs" :key="item.tempId || idx">
                  <td style="text-align: center;">
                    <span :title="item.errors?.join('; ')">
                      {{ item.name && item.category ? '✅' : '⚠️' }}
                    </span>
                  </td>
                  <td>
                    <input v-model="item.name" class="cell-input" placeholder="必填藥名" />
                  </td>
                  <td>
                    <input v-model="item.scientificName" class="cell-input" placeholder="植物學名" />
                  </td>
                  <td>
                    <input v-model="item.region" class="cell-input" placeholder="風土產區" />
                  </td>
                  <td>
                    <input v-model="item.category" class="cell-input" placeholder="本草分類" />
                  </td>
                  <td>
                    <select v-model="item.nature" class="cell-select">
                      <option value="溫">溫</option>
                      <option value="平">平</option>
                      <option value="寒">寒</option>
                      <option value="涼">涼</option>
                      <option value="微溫">微溫</option>
                    </select>
                  </td>
                  <td>
                    <input v-model="item.efficacy" class="cell-input" placeholder="主要功效" />
                  </td>
                  <td>
                    <select v-model="item.safetyLevel" class="cell-select">
                      <option value="無毒常服">無毒常服</option>
                      <option value="溫和常飲">溫和常飲</option>
                      <option value="依體質酌量">依體質酌量</option>
                      <option value="需經炮製">需經炮製</option>
                    </select>
                  </td>
                  <td style="text-align: center;">
                    <button class="btn-cell-delete" @click="stagedHerbs.splice(idx, 1)">✕</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 分頁五：📤 條件篩選資料匯出 (JSON / CSV / Markdown) -->
      <!-- ======================================================== -->
      <div v-if="currentTab === 'export'" class="admin-tab-pane">
        <div class="pane-header-box">
          <div>
            <h3 class="pane-title">📤 本草資料條件篩選匯出中樞</h3>
            <p class="pane-desc">
              自由設定產區、分類與發布狀態條件，即時匯出標準 JSON 備份、含 UTF-8 BOM 之 CSV 試算表，或排版嚴謹的「臺灣本草植物誌 · 典藏標本手冊 (Markdown)」。
            </p>
          </div>
        </div>

        <div class="export-workspace-grid">
          <!-- 左側篩選與輸出控制 -->
          <div class="export-controls-card">
            <h4>🎯 設定匯出篩選條件</h4>

            <div class="control-field">
              <label>風土產區篩選：</label>
              <select v-model="exportFilters.region" class="custom-select" @change="fetchExportPreview">
                <option value="全部">全部產區</option>
                <option v-for="r in stats.regions" :key="r.name" :value="r.name">
                  {{ r.name }} ({{ r.count }})
                </option>
              </select>
            </div>

            <div class="control-field">
              <label>本草分類篩選：</label>
              <select v-model="exportFilters.category" class="custom-select" @change="fetchExportPreview">
                <option value="全部">全部分類</option>
                <option v-for="c in stats.categories" :key="c.name" :value="c.name">
                  {{ c.name }} ({{ c.count }})
                </option>
              </select>
            </div>

            <div class="control-field">
              <label>典藏狀態：</label>
              <select v-model="exportFilters.status" class="custom-select" @change="fetchExportPreview">
                <option value="全部">全部狀態</option>
                <option value="published">已發布</option>
                <option value="draft">草稿</option>
              </select>
            </div>

            <div class="control-field">
              <label>關鍵字檢索過濾：</label>
              <input
                v-model="exportFilters.query"
                type="text"
                class="custom-input"
                placeholder="輸入關鍵字..."
                @input="fetchExportPreview"
              />
            </div>

            <div class="export-matched-banner">
              符合條件本草：<strong>{{ exportMatchedCount }}</strong> 味
            </div>

            <div class="export-buttons-group">
              <button
                class="btn-export-download json"
                @click="downloadExport('json')"
              >
                📄 下載全庫 JSON 備份
              </button>
              <button
                class="btn-export-download csv"
                @click="downloadExport('csv')"
              >
                📊 匯出 CSV (UTF-8 BOM)
              </button>
              <button
                class="btn-export-download md"
                @click="downloadExport('markdown')"
              >
                📜 下載 Markdown 標本手冊
              </button>
            </div>
          </div>

          <!-- 右側匯出即時預覽視窗 -->
          <div class="export-preview-card">
            <div class="preview-header">
              <h4>👁️ 匯出內容即時預覽 (模式：{{ exportFormatPreview.toUpperCase() }})</h4>
              <div class="format-switcher">
                <button
                  :class="{ active: exportFormatPreview === 'json' }"
                  @click="switchPreviewFormat('json')"
                >
                  JSON
                </button>
                <button
                  :class="{ active: exportFormatPreview === 'csv' }"
                  @click="switchPreviewFormat('csv')"
                >
                  CSV
                </button>
                <button
                  :class="{ active: exportFormatPreview === 'markdown' }"
                  @click="switchPreviewFormat('markdown')"
                >
                  Markdown
                </button>
              </div>
            </div>

            <div class="preview-content-box">
              <pre class="preview-pre">{{ exportPreviewText }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 分頁六：✍️ 本草專題文章生成實驗室 (Article Studio) -->
      <!-- ======================================================== -->
      <div v-if="currentTab === 'studio'" class="admin-tab-pane">
        <div class="pane-header-box">
          <div>
            <h3 class="pane-title">✍️ 本草專題文章生成實驗室 (Herbal Narrative Studio)</h3>
            <p class="pane-desc">
              從資料庫中挑選 1~3 味本草，以 4 大特色專家口吻為底蘊，指定目標受眾（兒童、久坐上班族、銀髮長輩、研究員等），生成具備風土考據的精采文章。
            </p>
          </div>
        </div>

        <div class="studio-workspace-grid">
          <!-- 左側生成設定表單 -->
          <div class="studio-form-card">
            <h4>🌿 專題文章生成參數</h4>

            <!-- 步驟 1：選擇草藥 (1-3 味) -->
            <div class="studio-step-block">
              <div class="step-lbl">步驟 1：挑選資料庫草藥 (已選 {{ selectedStudioHerbs.length }} 味)：</div>
              <div class="herb-selector-chips">
                <label
                  v-for="h in adminHerbs.slice(0, 20)"
                  :key="h.id"
                  class="herb-check-chip"
                  :class="{ checked: selectedStudioHerbs.includes(h.id) }"
                >
                  <input
                    type="checkbox"
                    :value="h.id"
                    v-model="selectedStudioHerbs"
                    :disabled="selectedStudioHerbs.length >= 3 && !selectedStudioHerbs.includes(h.id)"
                  />
                  <span>{{ h.name }}</span>
                </label>
              </div>
              <small class="hint-muted">最多可選 3 味草藥，系統將自動從資料庫提取性味、化學活性與風土傳承數據。</small>
            </div>

            <!-- 步驟 2：選擇專家 Persona -->
            <div class="studio-step-block">
              <div class="step-lbl">步驟 2：選擇講述口吻 (專家 Persona)：</div>
              <div class="persona-radio-group">
                <label
                  v-for="exp in expertList"
                  :key="exp.id"
                  class="persona-radio-card"
                  :class="{ active: studioExpertId === exp.id }"
                >
                  <input type="radio" :value="exp.id" v-model="studioExpertId" />
                  <span class="p-avatar">{{ exp.avatar }}</span>
                  <div class="p-info">
                    <div class="p-name">{{ exp.name }}</div>
                    <div class="p-title">{{ exp.title }}</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- 步驟 3：指定目標受眾 -->
            <div class="studio-step-block">
              <div class="step-lbl">步驟 3：指定目標受眾 (Target Audience)：</div>
              <select v-model="studioAudience" class="custom-select">
                <option
                  v-for="aud in articleOptions.audiences || defaultAudiences"
                  :key="aud.id"
                  :value="aud.id"
                >
                  {{ aud.name }} ── {{ aud.focus }}
                </option>
              </select>
            </div>

            <!-- 步驟 4：選擇文章體裁 -->
            <div class="studio-step-block">
              <div class="step-lbl">步驟 4：文章體裁與型態：</div>
              <select v-model="studioType" class="custom-select">
                <option
                  v-for="t in articleOptions.articleTypes || defaultArticleTypes"
                  :key="t.id"
                  :value="t.id"
                >
                  {{ t.name }}
                </option>
              </select>
            </div>

            <!-- 步驟 5：附加客製備註 -->
            <div class="studio-step-block">
              <div class="step-lbl">步驟 5：附加需求備註 (選填)：</div>
              <input
                v-model="studioCustomNotes"
                type="text"
                class="custom-input"
                placeholder="例如：請強調辦公室保溫瓶簡易悶泡法、或是提醒野外露營防蚊..."
              />
            </div>

            <button
              v-if="hasPerm('articles:write')"
              class="btn-generate-article"
              :disabled="isGeneratingArticle || selectedStudioHerbs.length === 0"
              @click="generateStudioArticle"
            >
              {{ isGeneratingArticle ? '✍️ 墨水暈染生成中...' : '✨ 生成本草專題文章 ➔' }}
            </button>
            <div v-else class="perm-notice-tag">
              🔒 僅具備 articles:write 權限者可生成文章
            </div>
          </div>

          <!-- 右側生成結果視窗 -->
          <div class="studio-output-card">
            <div class="output-header-bar">
              <h4>📖 專題文章生成成果</h4>
              <div v-if="generatedArticle" class="output-action-btns">
                <button class="btn-tool-sm" @click="copyArticleMarkdown">
                  📋 複製 Markdown
                </button>
                <button class="btn-tool-sm" @click="downloadArticleMarkdown">
                  📥 下載 .md 檔案
                </button>
              </div>
            </div>

            <div v-if="generatedArticle" class="article-render-area">
              <div class="article-meta-badge-row">
                <span class="meta-tag">專家：{{ generatedArticle.expert.avatar }} {{ generatedArticle.expert.name }}</span>
                <span class="meta-tag">受眾：{{ generatedArticle.audience.name }}</span>
                <span class="meta-tag">體裁：{{ generatedArticle.articleType.name }}</span>
                <span class="meta-tag">字數：{{ generatedArticle.wordCount }} 字</span>
                <span class="meta-tag engine-tag">引擎：{{ generatedArticle.engineUsed }}</span>
              </div>

              <div class="article-body-markdown">
                <pre class="markdown-preview-rich">{{ generatedArticle.markdownContent }}</pre>
              </div>
            </div>

            <div v-else class="article-placeholder-box">
              <div class="ph-icon">🌿</div>
              <div class="ph-title">尚未生成專題文章</div>
              <div class="ph-desc">
                請於左側勾選 1~3 味草藥，選擇專家口吻與目標受眾後，點擊「生成本草專題文章」。
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 分頁七：📜 本草數據管理 (原有 CRUD) -->
      <!-- ======================================================== -->
      <div v-if="currentTab === 'herbs'" class="admin-tab-pane">
        <!-- 工具列 -->
        <div class="herbs-manager-toolbar">
          <div class="toolbar-search-wrap">
            <input
              v-model="herbFilterQuery"
              type="text"
              class="toolbar-search-input"
              placeholder="搜尋藥材、學名、風土產區..."
            />
          </div>

          <div class="toolbar-actions">
            <select v-model="filterCategory" class="select-custom">
              <option value="全部">全部分類</option>
              <option v-for="c in stats.categories" :key="c.name" :value="c.name">
                {{ c.name }} ({{ c.count }})
              </option>
            </select>

            <select v-model="filterStatus" class="select-custom">
              <option value="全部">全部狀態</option>
              <option value="published">已發布</option>
              <option value="draft">草稿 / 待審</option>
            </select>

            <button
              v-if="hasPerm('herbs:write')"
              class="btn-create-herb"
              @click="openCreateModal"
            >
              <span>➕</span>
              <span>典藏新本草</span>
            </button>
          </div>
        </div>

        <!-- 表格清單 -->
        <div class="herbs-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 50px;">標本</th>
                <th>藥材名稱 / 學名</th>
                <th>風土產區</th>
                <th>分類</th>
                <th>性味</th>
                <th>安全等級</th>
                <th>狀態</th>
                <th style="width: 130px; text-align: center;">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in filteredAdminHerbs" :key="h.id">
                <td style="text-align: center;">
                  <img :src="h.thumbnailUrl" :alt="h.name" class="table-herb-thumb" />
                </td>
                <td>
                  <div class="table-herb-name">{{ h.name }}</div>
                  <div class="table-herb-scientific">{{ h.scientificName }}</div>
                </td>
                <td>
                  <span class="table-region-tag">{{ h.region || '全島平野' }}</span>
                </td>
                <td>{{ h.category }}</td>
                <td>
                  <span class="table-nature-badge" :data-nature="h.nature">{{ h.nature }}</span>
                  <span style="font-size: 12px; margin-left: 4px;">{{ (h.taste || []).join('、') }}</span>
                </td>
                <td>
                  <span class="table-safety-tag">{{ h.safetyLevel || '無毒常服' }}</span>
                </td>
                <td>
                  <span class="table-status-pill" :class="h.status || 'published'">
                    {{ h.status === 'draft' ? '草稿' : '已典藏' }}
                  </span>
                </td>
                <td style="text-align: center;">
                  <button
                    v-if="hasPerm('herbs:write')"
                    class="table-action-btn edit-btn"
                    title="編輯本草詳情"
                    @click="openEditModal(h)"
                  >
                    ✏️
                  </button>
                  <button
                    v-if="hasPerm('herbs:write')"
                    class="table-action-btn delete-btn"
                    title="刪除"
                    @click="confirmDelete(h)"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 分頁八：📈 風土分佈與圖譜 (原有) -->
      <!-- ======================================================== -->
      <div v-if="currentTab === 'analytics'" class="admin-tab-pane">
        <div class="analytics-grid">
          <div class="analytics-card">
            <h4>🏞️ 風土產區典藏覆蓋率</h4>
            <div class="dist-list">
              <div v-for="r in stats.regions" :key="r.name" class="dist-row">
                <div class="dist-label-wrap">
                  <span class="dist-name">{{ r.name }}</span>
                  <span class="dist-count">{{ r.count }} 味</span>
                </div>
                <div class="dist-bar-bg">
                  <div class="dist-bar-fill" :style="{ width: ((r.count / (stats.totalHerbs || 1)) * 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="analytics-card">
            <h4>📁 本草分類功用分佈</h4>
            <div class="dist-list">
              <div v-for="c in stats.categories" :key="c.name" class="dist-row">
                <div class="dist-label-wrap">
                  <span class="dist-name">{{ c.name }}</span>
                  <span class="dist-count">{{ c.count }} 味</span>
                </div>
                <div class="dist-bar-bg">
                  <div class="dist-bar-fill gold-bar" :style="{ width: ((c.count / (stats.totalHerbs || 1)) * 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- 分頁九：📋 系統審計日誌 (原有) -->
      <!-- ======================================================== -->
      <div v-if="currentTab === 'logs'" class="admin-tab-pane">
        <div class="logs-card">
          <div class="logs-header">
            <h4>📜 系統異動與操作審計歷程 (近 {{ logs.length }} 筆)</h4>
          </div>
          <div class="logs-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th style="width: 170px;">時間戳記</th>
                  <th style="width: 120px;">操作類別</th>
                  <th>詳細摘要</th>
                  <th style="width: 90px;">狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="l in logs" :key="l.id">
                  <td style="color: var(--ink-muted); font-size: 13px;">
                    {{ new Date(l.timestamp).toLocaleString('zh-TW') }}
                  </td>
                  <td>
                    <span class="log-action-pill" :data-action="l.action">{{ l.action }}</span>
                  </td>
                  <td>
                    <code>{{ JSON.stringify(l.details || {}) }}</code>
                  </td>
                  <td><span class="text-success">SUCCESS</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用者編輯/新增彈窗 (Modal) -->
    <div v-if="isUserModalOpen" class="modal-backdrop" @click.self="isUserModalOpen = false">
      <div class="herb-editor-modal" style="max-width: 600px;">
        <div class="editor-header">
          <div class="editor-title-wrap">
            <div class="editor-seal">人</div>
            <h3 class="editor-title">{{ isEditingUser ? '編輯使用者帳號' : '建立新系統使用者' }}</h3>
          </div>
          <button class="modal-close-btn" @click="isUserModalOpen = false">✕</button>
        </div>

        <div class="editor-body-split" style="grid-template-columns: 1fr; padding: 20px;">
          <div class="form-row">
            <label>帳號 (Username) *：</label>
            <input
              v-model="userForm.username"
              class="form-input"
              :disabled="isEditingUser"
              placeholder="例如: curator_wang"
            />
          </div>

          <div class="form-row">
            <label>名稱 (姓名/稱號) *：</label>
            <input
              v-model="userForm.name"
              class="form-input"
              placeholder="例如: 王典藏"
            />
          </div>

          <div class="form-row">
            <label>密碼 (Password) {{ isEditingUser ? '(留空表示不變更)' : '*' }}：</label>
            <input
              v-model="userForm.password"
              type="password"
              class="form-input"
              placeholder="請輸入密碼"
            />
          </div>

          <div class="form-row">
            <label>指派角色 (Role) *：</label>
            <select v-model="userForm.role" class="form-select">
              <option v-for="r in rolesList" :key="r.key" :value="r.key">
                {{ r.name }} ({{ r.badge }}) ── {{ r.description }}
              </option>
            </select>
          </div>

          <div class="form-row">
            <label>狀態 (Status)：</label>
            <select v-model="userForm.status" class="form-select">
              <option value="active">啟用 (Active)</option>
              <option value="disabled">停用 (Disabled)</option>
            </select>
          </div>
        </div>

        <div class="editor-footer">
          <button class="btn-cancel" @click="isUserModalOpen = false">取消</button>
          <button class="btn-save" @click="saveUser">儲存確認</button>
        </div>
      </div>
    </div>

    <!-- 自訂專家 Persona 新增彈窗 (Modal) -->
    <div v-if="isExpertModalOpen" class="modal-backdrop" @click.self="isExpertModalOpen = false">
      <div class="herb-editor-modal" style="max-width: 650px;">
        <div class="editor-header">
          <div class="editor-title-wrap">
            <div class="editor-seal">師</div>
            <h3 class="editor-title">新增自訂本草諮詢名師 (Persona)</h3>
          </div>
          <button class="modal-close-btn" @click="isExpertModalOpen = false">✕</button>
        </div>

        <div class="editor-body-split" style="grid-template-columns: 1fr; padding: 20px;">
          <div class="form-row">
            <label>專家大名：</label>
            <input v-model="expertForm.name" class="form-input" placeholder="例如: 宜蘭濕地水生草師" />
          </div>
          <div class="form-row">
            <label>專家頭銜稱謂：</label>
            <input v-model="expertForm.title" class="form-input" placeholder="例如: 噶瑪蘭水草觀察與野浴傳人" />
          </div>
          <div class="form-row">
            <label>頭像 Emoji 與印章：</label>
            <div style="display: flex; gap: 10px;">
              <input v-model="expertForm.avatar" class="form-input" style="width: 70px; text-align: center;" placeholder="Emoji" />
              <input v-model="expertForm.seal" class="form-input" style="width: 120px;" placeholder="四字印章" />
              <input v-model="expertForm.region" class="form-input" style="flex: 1;" placeholder="代表風土區域" />
            </div>
          </div>
          <div class="form-row">
            <label>核心口頭禪：</label>
            <textarea v-model="expertForm.catchphrase" rows="2" class="form-textarea" placeholder="名家金句"></textarea>
          </div>
          <div class="form-row">
            <label>問候語：</label>
            <input v-model="expertForm.greeting" class="form-input" placeholder="親切開場白" />
          </div>
          <div class="form-row">
            <label>語調特徵描述：</label>
            <textarea v-model="expertForm.tone" rows="2" class="form-textarea" placeholder="描述講話方式與口吻"></textarea>
          </div>
        </div>

        <div class="editor-footer">
          <button class="btn-cancel" @click="isExpertModalOpen = false">取消</button>
          <button class="btn-save" @click="saveNewExpert">建立專家 Persona</button>
        </div>
      </div>
    </div>

    <!-- 原有草藥新增/編輯彈窗 (Modal) -->
    <div v-if="isHerbModalOpen" class="modal-backdrop" @click.self="isHerbModalOpen = false">
      <div class="herb-editor-modal">
        <div class="editor-header">
          <div class="editor-title-wrap">
            <div class="editor-seal">撰</div>
            <h3 class="editor-title">{{ isEditing ? '編輯本草典藏檔案' : '典藏新台灣本土草藥' }}</h3>
          </div>
          <button class="modal-close-btn" @click="isHerbModalOpen = false">✕</button>
        </div>

        <div class="editor-body-split">
          <div class="editor-form-col">
            <div class="form-row">
              <label>本草中文名 *</label>
              <input v-model="herbForm.name" type="text" class="form-input" placeholder="例如: 大花咸豐草" />
            </div>

            <div class="form-row-2">
              <div>
                <label>植物學名</label>
                <input v-model="herbForm.scientificName" type="text" class="form-input" placeholder="例如: Bidens alba" />
              </div>
              <div>
                <label>科屬</label>
                <input v-model="herbForm.family" type="text" class="form-input" placeholder="例如: 菊科鬼針草屬" />
              </div>
            </div>

            <div class="form-row-2">
              <div>
                <label>分類目錄</label>
                <select v-model="herbForm.category" class="form-select">
                  <option v-for="c in stats.categories" :key="c.name" :value="c.name">{{ c.name }}</option>
                  <option value="民間草藥類">民間草藥類</option>
                  <option value="清熱解毒類">清熱解毒類</option>
                </select>
              </div>
              <div>
                <label>風土產區</label>
                <select v-model="herbForm.region" class="form-select">
                  <option v-for="r in stats.regions" :key="r.name" :value="r.name">{{ r.name }}</option>
                  <option value="全島低海拔平野">全島低海拔平野</option>
                </select>
              </div>
            </div>

            <div class="form-row-2">
              <div>
                <label>藥性 (四氣)</label>
                <select v-model="herbForm.nature" class="form-select">
                  <option value="溫">溫</option>
                  <option value="平">平</option>
                  <option value="涼">涼</option>
                  <option value="寒">寒</option>
                </select>
              </div>
              <div>
                <label>安全等級</label>
                <select v-model="herbForm.safetyLevel" class="form-select">
                  <option value="無毒常服">無毒常服</option>
                  <option value="溫和常飲">溫和常飲</option>
                  <option value="依體質酌量">依體質酌量</option>
                  <option value="需經炮製">需經炮製</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <label>核心功效描述 *</label>
              <textarea v-model="herbForm.efficacy" rows="2" class="form-textarea" placeholder="主要治標治本、藥理機制..."></textarea>
            </div>

            <div class="form-row">
              <label>台灣風土與歷史人文故事 (Heritage)</label>
              <textarea v-model="herbForm.taiwanHeritage" rows="2" class="form-textarea" placeholder="先民遷徙、原鄉移植或部落日常..."></textarea>
            </div>
          </div>

          <!-- 右側標本箋即時預覽 -->
          <div class="editor-preview-col">
            <div class="specimen-plate-preview">
              <div class="plate-top-brand">
                <span>TAIWAN HERB SPECIMEN</span>
                <span class="plate-number">NO. {{ herbForm.id || 'NEW' }}</span>
              </div>
              <div class="plate-img-wrap">
                <img :src="herbForm.thumbnailUrl || 'https://images.unsplash.com/photo-1596726915017-91a566ce0aa7?auto=format&fit=crop&w=600&q=80'" alt="Preview" class="plate-img" />
                <span class="plate-nature-badge">{{ herbForm.nature || '平' }}</span>
              </div>
              <div class="plate-info">
                <h3 class="plate-name">{{ herbForm.name || '草藥名稱' }}</h3>
                <div class="plate-scientific">{{ herbForm.scientificName || 'Botanical Name' }}</div>
                <div class="plate-efficacy">{{ herbForm.efficacy || '輸入核心功效即可即時呈現於此處標本箋...' }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="editor-footer">
          <button class="btn-cancel" @click="isHerbModalOpen = false">取消</button>
          <button class="btn-save" :disabled="isSaving" @click="saveHerb">
            {{ isSaving ? '儲存中...' : (isEditing ? '💾 儲存修改' : '🌿 正式典藏入庫') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { HerbApi } from '../services/api';
import { audio } from '../services/audioService';

// 認證與使用者狀態
const isAuthenticated = ref(!!HerbApi.getAuthToken());
const inputUsername = ref('admin');
const inputPasscode = ref('taiwanherb2026');
const isLoggingIn = ref(false);
const currentUser = ref(null);

const demoAccounts = [
  { username: 'admin', name: '神農至高統籌', roleName: '至高管理員', passcode: 'taiwanherb2026', avatar: '👑' },
  { username: 'curator_lin', name: '林典藏', roleName: '本草策展師', passcode: 'curator2026', avatar: '📜' },
  { username: 'expert_chen', name: '陳藥師', roleName: '生藥顧問', passcode: 'consultant2026', avatar: '🍵' },
  { username: 'auditor_wang', name: '王稽核', roleName: '典藏觀察員', passcode: 'auditor2026', avatar: '🔍' },
  { username: 'member_liao', name: '廖常客', roleName: '前台學員', passcode: 'member2026', avatar: '🌱' }
];

const selectDemoAccount = (acc) => {
  inputUsername.value = acc.username;
  inputPasscode.value = acc.passcode;
};

// 模組切換
const currentTab = ref('users');
const stats = ref({});
const adminHerbs = ref([]);
const expertList = ref([]);
const logs = ref([]);
const usersList = ref([]);
const rolesList = ref([]);

// 權限檢查輔助
const hasPerm = (permKey) => {
  if (!currentUser.value) return true; // 預設放行
  if (currentUser.value.role === 'super_admin') return true;
  return (currentUser.value.permissions || []).includes(permKey);
};

// ==========================================
// 1. 使用者管理
// ==========================================
const isUserModalOpen = ref(false);
const isEditingUser = ref(false);
const userForm = ref({
  id: '',
  username: '',
  name: '',
  password: '',
  role: 'curator',
  status: 'active'
});

const openCreateUserModal = () => {
  isEditingUser.value = false;
  userForm.value = {
    id: '',
    username: '',
    name: '',
    password: '',
    role: 'curator',
    status: 'active'
  };
  isUserModalOpen.value = true;
};

const openEditUserModal = (user) => {
  isEditingUser.value = true;
  userForm.value = {
    id: user.id,
    username: user.username,
    name: user.name,
    password: '',
    role: user.role,
    status: user.status
  };
  isUserModalOpen.value = true;
};

const saveUser = async () => {
  try {
    if (isEditingUser.value) {
      await HerbApi.updateAdminUser(userForm.value.id, userForm.value);
    } else {
      await HerbApi.createAdminUser(userForm.value);
    }
    audio.playStamp();
    isUserModalOpen.value = false;
    await loadUsers();
    alert('使用者儲存成功！');
  } catch (err) {
    alert('儲存失敗：' + err.message);
  }
};

const deleteUser = async (user) => {
  if (!confirm(`確定要刪除使用者「${user.name}」(${user.username}) 嗎？`)) return;
  try {
    await HerbApi.deleteAdminUser(user.id);
    audio.playClick();
    await loadUsers();
  } catch (err) {
    alert('刪除失敗：' + err.message);
  }
};

// ==========================================
// 2. LLM 提供商管理
// ==========================================
const llmConfig = ref({
  activeProvider: 'builtin',
  temperature: 0.7,
  maxTokens: 2000,
  providers: {}
});
const editApiKey = ref('');
const showApiKeyText = ref(false);
const isPingingLlm = ref(false);
const pingResult = ref(null);
const isSavingLlm = ref(false);

const activeLlmName = computed(() => {
  const p = llmConfig.value.providers[llmConfig.value.activeProvider];
  return p ? p.name : '系統內建離線知識引擎';
});

const selectedProviderData = computed(() => {
  return llmConfig.value.providers[llmConfig.value.activeProvider];
});

const selectLlmProvider = (key) => {
  llmConfig.value.activeProvider = key;
  editApiKey.value = '';
  pingResult.value = null;
  audio.playClick();
};

const testLlmPing = async (providerId) => {
  isPingingLlm.value = true;
  try {
    const res = await HerbApi.testLlmConnection(providerId);
    pingResult.value = res;
    audio.playChime(660);
  } catch (err) {
    pingResult.value = {
      status: 'error',
      latencyMs: 0,
      message: err.message
    };
  } finally {
    isPingingLlm.value = false;
  }
};

const saveLlmSettings = async () => {
  isSavingLlm.value = true;
  try {
    const payload = {
      activeProvider: llmConfig.value.activeProvider,
      temperature: llmConfig.value.temperature,
      maxTokens: llmConfig.value.maxTokens,
      providers: {
        [llmConfig.value.activeProvider]: {
          ...selectedProviderData.value,
          apiKey: editApiKey.value !== '' ? editApiKey.value : (selectedProviderData.value.isKeylessAllowed ? '' : undefined)
        }
      }
    };
    const res = await HerbApi.updateLlmConfig(payload);
    llmConfig.value = res;
    audio.playStamp();
    alert('LLM 提供商與 API 設定已儲存成功！');
  } catch (err) {
    alert('儲存失敗：' + err.message);
  } finally {
    isSavingLlm.value = false;
  }
};

// ==========================================
// 3. 專家 RAG Persona 與沙盒
// ==========================================
const selectedExpertForEdit = ref(null);
const isExpertModalOpen = ref(false);
const expertForm = ref({
  name: '',
  title: '',
  avatar: '🍃',
  seal: '新篇',
  region: '全島',
  catchphrase: '',
  greeting: '',
  tone: ''
});

const playgroundExpert = ref(null);
const playgroundQuery = ref('夏天在辦公室常吹冷氣又口乾舌燥，適合喝什麼青草茶退火？');
const playgroundTopK = ref(3);
const isRunningPlayground = ref(false);
const playgroundOutput = ref(null);
const playgroundPresets = [
  '夏天在冷氣房久坐口乾舌燥，適合喝什麼青草茶？',
  '客庄阿婆，坐月子用的大風草要怎麼洗澡？',
  '生藥學陳博士，請從分子機制解析魚腥草抗炎效果',
  '阿美族獵人督邁，刺蔥在部落野炊怎麼煮好喝？'
];

const loadIntoPlayground = (exp) => {
  playgroundExpert.value = exp;
  audio.playClick();
};

const runPlaygroundTest = async () => {
  if (!playgroundExpert.value && expertList.value.length > 0) {
    playgroundExpert.value = expertList.value[0];
  }
  isRunningPlayground.value = true;
  try {
    const res = await HerbApi.testExpertPlayground({
      expertId: playgroundExpert.value?.id || 'wanhua_uncle',
      query: playgroundQuery.value,
      topK: playgroundTopK.value
    });
    playgroundOutput.value = res;
    audio.playChime(528);
  } catch (err) {
    alert('沙盒測試失敗：' + err.message);
  } finally {
    isRunningPlayground.value = false;
  }
};

const openCreateExpertModal = () => {
  expertForm.value = {
    name: '',
    title: '',
    avatar: '🍃',
    seal: '新篇',
    region: '全島',
    catchphrase: '「一草一木皆有風土。」',
    greeting: '您好！歡迎探索島嶼本草。',
    tone: '親切溫和、生活化'
  };
  isExpertModalOpen.value = true;
};

const saveNewExpert = async () => {
  try {
    await HerbApi.createAdminExpert(expertForm.value);
    audio.playStamp();
    isExpertModalOpen.value = false;
    await loadExperts();
    alert('自訂專家 Persona 建立成功！');
  } catch (err) {
    alert('建立失敗：' + err.message);
  }
};

const deleteCustomExpert = async (exp) => {
  if (!confirm(`確定要移除自訂專家「${exp.name}」嗎？`)) return;
  try {
    await HerbApi.deleteAdminExpert(exp.id);
    audio.playClick();
    await loadExperts();
  } catch (err) {
    alert('刪除失敗：' + err.message);
  }
};

const resetExperts = async () => {
  if (!confirm('確定要重置為系統預設的 4 大風土名師嗎？自訂專家將會清除。')) return;
  try {
    await HerbApi.resetAdminExperts();
    audio.playStamp();
    await loadExperts();
    alert('已成功重置為系統四大核心專家！');
  } catch (err) {
    alert('重置失敗：' + err.message);
  }
};

// ==========================================
// 4. 資料匯入與線上編輯
// ==========================================
const importFormat = ref('json');
const rawImportText = ref('');
const isParsingImport = ref(false);
const stagedHerbs = ref([]);
const isCommittingImport = ref(false);

const stagedValidCount = computed(() => {
  return stagedHerbs.value.filter(h => h.name && h.category).length;
});

const loadSampleImportData = async () => {
  try {
    const res = await HerbApi.getImportSample('json');
    rawImportText.value = JSON.stringify(res.content, null, 2);
    importFormat.value = 'json';
    await parseAndOpenEditor();
    audio.playChime(440);
  } catch (err) {
    alert('載入示範資料失敗：' + err.message);
  }
};

const handleFileUpload = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (evt) => {
    rawImportText.value = evt.target.result;
    importFormat.value = file.name.endsWith('.csv') ? 'csv' : 'json';
    await parseAndOpenEditor();
  };
  reader.readAsText(file);
};

const parseAndOpenEditor = async () => {
  if (!rawImportText.value.trim()) return;
  isParsingImport.value = true;
  try {
    const res = await HerbApi.previewImport(rawImportText.value, importFormat.value);
    stagedHerbs.value = res.items || [];
    audio.playClick();
  } catch (err) {
    alert('解析失敗：' + err.message);
  } finally {
    isParsingImport.value = false;
  }
};

const addNewStagedRow = () => {
  stagedHerbs.value.push({
    tempId: `row_${Date.now()}`,
    name: '',
    scientificName: '',
    region: '全島平野',
    category: '民間草藥類',
    nature: '平',
    efficacy: '',
    safetyLevel: '無毒常服'
  });
};

const commitStagedHerbs = async () => {
  if (stagedHerbs.value.length === 0) return;
  isCommittingImport.value = true;
  try {
    const res = await HerbApi.commitImport(stagedHerbs.value);
    audio.playStamp();
    alert(`成功匯入 ${res.insertedCount} 味本草！`);
    stagedHerbs.value = [];
    rawImportText.value = '';
    await loadDashboardData();
  } catch (err) {
    alert('匯入存檔失敗：' + err.message);
  } finally {
    isCommittingImport.value = false;
  }
};

// ==========================================
// 5. 條件篩選資料匯出
// ==========================================
const exportFilters = ref({
  region: '全部',
  category: '全部',
  status: '全部',
  query: ''
});
const exportFormatPreview = ref('json');
const exportPreviewText = ref('');
const exportMatchedCount = ref(0);

const fetchExportPreview = async () => {
  try {
    const queryParts = [`format=${exportFormatPreview.value}`];
    if (exportFilters.value.region !== '全部') queryParts.push(`region=${encodeURIComponent(exportFilters.value.region)}`);
    if (exportFilters.value.category !== '全部') queryParts.push(`category=${encodeURIComponent(exportFilters.value.category)}`);
    if (exportFilters.value.status !== '全部') queryParts.push(`status=${encodeURIComponent(exportFilters.value.status)}`);
    if (exportFilters.value.query) queryParts.push(`q=${encodeURIComponent(exportFilters.value.query)}`);

    const res = await fetch(`/api/admin/export?${queryParts.join('&')}`, {
      headers: { Authorization: `Bearer ${HerbApi.getAuthToken()}` }
    });
    const text = await res.text();
    exportPreviewText.value = text.slice(0, 1500) + (text.length > 1500 ? '\n\n...(其餘篇幅省略，下載可取得完整檔案)...' : '');

    // 計算匹配筆數
    let list = adminHerbs.value;
    if (exportFilters.value.region !== '全部') list = list.filter(h => (h.region || '').includes(exportFilters.value.region));
    if (exportFilters.value.category !== '全部') list = list.filter(h => h.category === exportFilters.value.category);
    if (exportFilters.value.status !== '全部') list = list.filter(h => (h.status || 'published') === exportFilters.value.status);
    exportMatchedCount.value = list.length;
  } catch (err) {
    console.warn(err);
  }
};

const switchPreviewFormat = (fmt) => {
  exportFormatPreview.value = fmt;
  fetchExportPreview();
};

const downloadExport = (format) => {
  const queryParts = [`format=${format}`];
  if (exportFilters.value.region !== '全部') queryParts.push(`region=${encodeURIComponent(exportFilters.value.region)}`);
  if (exportFilters.value.category !== '全部') queryParts.push(`category=${encodeURIComponent(exportFilters.value.category)}`);
  if (exportFilters.value.status !== '全部') queryParts.push(`status=${encodeURIComponent(exportFilters.value.status)}`);
  if (exportFilters.value.query) queryParts.push(`q=${encodeURIComponent(exportFilters.value.query)}`);

  window.open(`/api/admin/export?${queryParts.join('&')}`, '_blank');
  audio.playClick();
};

// ==========================================
// 6. 本草專題文章實驗室 (Studio)
// ==========================================
const articleOptions = ref({});
const defaultAudiences = [
  { id: 'general', name: '一般大眾 / 社區居民', focus: '生活化、淺顯易懂、四季茶飲' },
  { id: 'children', name: '國小學童 / 親子家庭', focus: '童話探險、五感探索、野外觀察啟蒙' },
  { id: 'office', name: '久坐熬夜上班族', focus: '眼疲勞、肩頸僵硬、辦公桌即泡草本茶' },
  { id: 'elderly', name: '銀髮樂齡長輩', focus: '溫和調養、舒筋強骨、四季節氣與安全禁忌' },
  { id: 'researcher', name: '生藥學者 / 農業研發者', focus: '次級代謝物、化學成分、藥理途徑考證' },
  { id: 'campers', name: '戶外露營登山者', focus: '野外辨識、防蚊蟲止癢、山林採集倫理' }
];
const defaultArticleTypes = [
  { id: 'story', name: '風土傳奇故事 / 文化紀行' },
  { id: 'guide', name: '居家日常調養與沖泡指南' },
  { id: 'specimen', name: '植物學與生藥誌專文' },
  { id: 'recipe', name: '四季草本藥膳與野炊手記' }
];

const selectedStudioHerbs = ref([1, 2]);
const studioExpertId = ref('wanhua_uncle');
const studioAudience = ref('office');
const studioType = ref('story');
const studioCustomNotes = ref('');
const isGeneratingArticle = ref(false);
const generatedArticle = ref(null);

const generateStudioArticle = async () => {
  if (selectedStudioHerbs.value.length === 0) {
    alert('請至少勾選一味草藥');
    return;
  }
  isGeneratingArticle.value = true;
  try {
    const res = await HerbApi.generateArticle({
      herbIds: selectedStudioHerbs.value,
      expertId: studioExpertId.value,
      targetAudience: studioAudience.value,
      articleType: studioType.value,
      customNotes: studioCustomNotes.value
    });
    generatedArticle.value = res;
    audio.playChime(660);
  } catch (err) {
    alert('文章生成失敗：' + err.message);
  } finally {
    isGeneratingArticle.value = false;
  }
};

const copyArticleMarkdown = () => {
  if (!generatedArticle.value) return;
  navigator.clipboard.writeText(generatedArticle.value.markdownContent);
  audio.playClick();
  alert('已複製文章 Markdown 至剪貼簿！');
};

const downloadArticleMarkdown = () => {
  if (!generatedArticle.value) return;
  const blob = new Blob([generatedArticle.value.markdownContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${generatedArticle.value.title.replace(/[#\\/:]/g, '_')}.md`;
  a.click();
  URL.revokeObjectURL(url);
  audio.playClick();
};

// ==========================================
// 7. 原有草藥清單 CRUD
// ==========================================
const herbFilterQuery = ref('');
const filterCategory = ref('全部');
const filterStatus = ref('全部');

const isHerbModalOpen = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const herbForm = ref({
  id: null,
  name: '',
  scientificName: '',
  family: '',
  category: '台灣青草茶經典',
  region: '北部 (萬華/淡水河/雙北)',
  nature: '涼',
  taste: ['微苦', '甘'],
  channels: ['肺', '胃'],
  partsUsed: '全草',
  safetyLevel: '溫和常飲',
  efficacy: '',
  taiwanHeritage: '',
  thumbnailUrl: 'https://images.unsplash.com/photo-1596726915017-91a566ce0aa7?auto=format&fit=crop&w=800&q=85'
});

const filteredAdminHerbs = computed(() => {
  return adminHerbs.value.filter(h => {
    const matchQ = !herbFilterQuery.value ||
      h.name.includes(herbFilterQuery.value) ||
      (h.scientificName || '').toLowerCase().includes(herbFilterQuery.value.toLowerCase()) ||
      (h.region || '').includes(herbFilterQuery.value);
    const matchCat = filterCategory.value === '全部' || h.category === filterCategory.value;
    const matchStat = filterStatus.value === '全部' || (h.status || 'published') === filterStatus.value;
    return matchQ && matchCat && matchStat;
  });
});

const openCreateModal = () => {
  isEditing.value = false;
  herbForm.value = {
    id: null,
    name: '',
    scientificName: '',
    family: '',
    category: stats.value.categories?.[0]?.name || '台灣青草茶經典',
    region: '北部 (萬華/淡水河/雙北)',
    nature: '平',
    taste: ['甘'],
    channels: ['肺'],
    partsUsed: '全草',
    safetyLevel: '無毒常服',
    efficacy: '',
    taiwanHeritage: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596726915017-91a566ce0aa7?auto=format&fit=crop&w=800&q=85'
  };
  isHerbModalOpen.value = true;
};

const openEditModal = (h) => {
  isEditing.value = true;
  herbForm.value = { ...h };
  isHerbModalOpen.value = true;
};

const saveHerb = async () => {
  if (!herbForm.value.name.trim()) {
    alert('請輸入藥材名稱');
    return;
  }
  isSaving.value = true;
  try {
    if (isEditing.value) {
      await HerbApi.updateHerb(herbForm.value.id, herbForm.value);
    } else {
      await HerbApi.createHerb(herbForm.value);
    }
    audio.playStamp();
    isHerbModalOpen.value = false;
    await loadDashboardData();
  } catch (err) {
    alert('儲存失敗：' + err.message);
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = async (herb) => {
  if (!confirm(`確定要刪除草藥「${herb.name}」嗎？`)) return;
  try {
    await HerbApi.deleteHerb(herb.id);
    audio.playClick();
    await loadDashboardData();
  } catch (err) {
    alert('刪除失敗：' + err.message);
  }
};

const saveExpertSettings = async (exp) => {
  try {
    await HerbApi.updateExpert(exp.id, exp);
    audio.playStamp();
    alert(`專家「${exp.name}」設定已成功保存！`);
    await loadExperts();
  } catch (err) {
    alert('儲存專家設定失敗：' + err.message);
  }
};

const confirmReset = async () => {
  if (!confirm('警告：此操作將重置資料庫為預設 25 味種子資料，確定繼續？')) return;
  try {
    await HerbApi.resetDatabase();
    audio.playChime(528);
    alert('資料庫已成功重置為初始 25 味指標性本草！');
    await loadDashboardData();
  } catch (err) {
    alert('重置失敗：' + err.message);
  }
};

// ==========================================
// 登入登出與資料載入
// ==========================================
const handleLogin = async () => {
  isLoggingIn.value = true;
  try {
    const res = await HerbApi.adminLogin({
      username: inputUsername.value,
      password: inputPasscode.value
    });
    isAuthenticated.value = true;
    currentUser.value = res.user;
    audio.playUnlock();
    await loadDashboardData();
  } catch (err) {
    alert(err.message || '登入失敗，請確認通行碼');
  } finally {
    isLoggingIn.value = false;
  }
};

const handleLogout = () => {
  HerbApi.adminLogout();
  isAuthenticated.value = false;
  currentUser.value = null;
  audio.playClick();
};

const loadUsers = async () => {
  try {
    const res = await HerbApi.getAdminUsers();
    usersList.value = res.users || [];
    rolesList.value = res.roles || [];
  } catch (err) {
    console.warn(err);
  }
};

const loadExperts = async () => {
  try {
    const exp = await HerbApi.getAdminExperts();
    expertList.value = exp || [];
    if (!playgroundExpert.value && expertList.value.length > 0) {
      playgroundExpert.value = expertList.value[0];
    }
  } catch (err) {
    console.warn(err);
  }
};

const loadLlmConfig = async () => {
  try {
    const cfg = await HerbApi.getLlmConfig();
    llmConfig.value = cfg;
  } catch (err) {
    console.warn(err);
  }
};

const loadArticleOptions = async () => {
  try {
    const opts = await HerbApi.getArticleOptions();
    articleOptions.value = opts;
  } catch (err) {
    console.warn(err);
  }
};

const loadDashboardData = async () => {
  try {
    const [st, herbsData, logData, statCheck] = await Promise.all([
      HerbApi.getAdminStats(),
      HerbApi.getAdminHerbs({ limit: 100 }),
      HerbApi.getAdminLogs(),
      HerbApi.getAdminStatus()
    ]);

    stats.value = st;
    adminHerbs.value = herbsData.items || [];
    logs.value = logData || [];

    if (statCheck.user) {
      currentUser.value = statCheck.user;
    }

    await Promise.all([
      loadUsers(),
      loadExperts(),
      loadLlmConfig(),
      loadArticleOptions(),
      fetchExportPreview()
    ]);
  } catch (err) {
    console.warn('Dashboard load error:', err.message);
  }
};

onMounted(() => {
  if (isAuthenticated.value) {
    loadDashboardData();
  }
});
</script>

<style scoped>
.admin-dashboard-container {
  margin-bottom: 40px;
}

/* 解鎖門扉 */
.admin-auth-gate {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
}

.auth-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  max-width: 580px;
  width: 100%;
  padding: 40px 32px;
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.auth-seal {
  width: 60px;
  height: 60px;
  background: var(--primary-deep);
  color: #fff;
  border-radius: 16px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: bold;
}

.auth-title {
  font-family: var(--font-serif);
  font-size: 22px;
  color: var(--primary-deep);
  margin-bottom: 10px;
}

.auth-desc {
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.demo-accounts-picker {
  background: var(--bg-hover);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 20px;
  text-align: left;
}

.picker-label {
  font-size: 12px;
  font-weight: bold;
  color: var(--primary-deep);
  margin-bottom: 8px;
}

.roles-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.role-chip-btn {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.role-chip-btn:hover {
  border-color: var(--primary-deep);
  background: var(--primary-subtle);
}

.role-chip-btn.active {
  border-color: var(--primary-deep);
  background: var(--primary-deep);
  color: #fff;
}

.chip-name {
  font-weight: bold;
}

.chip-badge {
  font-size: 10px;
  opacity: 0.8;
}

.auth-input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.auth-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  font-size: 14px;
  box-sizing: border-box;
}

.auth-submit-btn {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.auth-submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.auth-hint {
  font-size: 12px;
  color: var(--ink-muted);
  line-height: 1.5;
}

/* 主面板 */
.admin-main-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.admin-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 18px 24px;
  box-shadow: var(--shadow-sm);
  flex-wrap: wrap;
  gap: 16px;
}

.admin-badge-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.admin-seal {
  width: 44px;
  height: 44px;
  background: var(--primary-deep);
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.admin-title {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-deep);
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-role-tag {
  font-size: 12px;
  background: var(--amber-deep);
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
}

.admin-sub {
  font-size: 13px;
  color: var(--ink-muted);
  margin-top: 2px;
}

.admin-actions-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.admin-tool-btn {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 13px;
  cursor: pointer;
  color: var(--ink-base);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.admin-tool-btn:hover {
  background: var(--bg-hover);
  border-color: var(--primary-deep);
}

.admin-tool-btn.warning-btn {
  color: #c97a1f;
}

.admin-tool-btn.exit-btn {
  color: #c53030;
}

/* 數據指標卡 */
.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary-deep);
}

.stat-icon {
  font-size: 28px;
}

.stat-value {
  font-size: 22px;
  font-weight: bold;
  font-family: var(--font-serif);
  color: var(--primary-deep);
}

.stat-value small {
  font-size: 14px;
  font-weight: normal;
}

.stat-label {
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: 2px;
}

/* 標籤導覽列 */
.admin-tabs-nav {
  display: flex;
  gap: 6px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 6px;
  overflow-x: auto;
}

.admin-nav-tab {
  background: none;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  color: var(--ink-muted);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  transition: all 0.2s;
}

.admin-nav-tab:hover {
  color: var(--ink-base);
  background: var(--bg-hover);
}

.admin-nav-tab.active {
  background: var(--primary-deep);
  color: #fff;
  font-weight: bold;
}

/* 內容 Pane */
.admin-tab-pane {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pane-header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.pane-title {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--primary-deep);
  margin-bottom: 4px;
}

.pane-desc {
  font-size: 13px;
  color: var(--ink-muted);
  max-width: 800px;
  line-height: 1.5;
}

.btn-primary-action {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-secondary-action {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  color: var(--ink-base);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.perm-notice-tag {
  font-size: 12px;
  color: var(--ink-muted);
  background: var(--bg-hover);
  padding: 6px 12px;
  border-radius: 8px;
}

/* 角色矩陣 */
.roles-matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.role-summary-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 16px;
}

.role-summary-card.current-role {
  border-color: var(--primary-deep);
  box-shadow: 0 0 0 2px var(--primary-subtle);
}

.role-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.role-badge-pill {
  background: var(--amber-deep);
  color: #fff;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
}

.role-key-name {
  font-weight: bold;
  font-size: 14px;
  color: var(--primary-deep);
}

.role-desc-text {
  font-size: 12px;
  color: var(--ink-muted);
  line-height: 1.4;
  margin-bottom: 10px;
}

.role-perms-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.perm-pill {
  font-size: 10px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--ink-muted);
}

/* 表格樣式 */
.table-container-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.table-card-header {
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-light);
}

.table-card-header h4 {
  margin: 0;
  font-size: 15px;
  color: var(--primary-deep);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.admin-table th {
  background: var(--bg-hover);
  padding: 10px 14px;
  text-align: left;
  font-weight: 600;
  color: var(--ink-muted);
  border-bottom: 1px solid var(--border-light);
}

.admin-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-light);
}

.role-pill-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--bg-hover);
  color: var(--ink-base);
}

.role-pill-badge[data-role="super_admin"] {
  background: #7928ca;
  color: #fff;
}

.role-pill-badge[data-role="curator"] {
  background: #107569;
  color: #fff;
}

.role-pill-badge[data-role="consultant"] {
  background: #b54708;
  color: #fff;
}

.status-indicator {
  font-size: 11px;
}

.status-indicator.active {
  color: #027a48;
}

.status-indicator.disabled {
  color: #b42318;
}

.action-sm-btn {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
  margin-left: 4px;
}

.action-sm-btn.danger-btn {
  color: #b42318;
}

/* LLM 分頁 */
.llm-providers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.llm-provider-card {
  background: var(--bg-card);
  border: 2px solid var(--border-card);
  border-radius: 14px;
  padding: 18px;
  cursor: pointer;
  transition: all 0.2s;
}

.llm-provider-card:hover {
  border-color: var(--primary-deep);
}

.llm-provider-card.active {
  border-color: var(--primary-deep);
  background: var(--primary-subtle);
}

.provider-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.provider-icon {
  font-size: 26px;
}

.provider-name {
  font-weight: bold;
  font-size: 14px;
  color: var(--primary-deep);
}

.provider-vendor {
  font-size: 11px;
  color: var(--ink-muted);
}

.active-badge {
  margin-left: auto;
  font-size: 10px;
  background: var(--primary-deep);
  color: #fff;
  padding: 2px 6px;
  border-radius: 6px;
}

.provider-desc {
  font-size: 12px;
  color: var(--ink-muted);
  line-height: 1.4;
  margin-bottom: 12px;
}

.provider-meta-row {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
}

.text-success { color: #027a48; font-weight: bold; }
.text-danger { color: #b42318; font-weight: bold; }

.llm-config-form-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 20px;
}

.form-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: var(--primary-deep);
  margin-bottom: 16px;
}

.btn-ping-test {
  background: var(--amber-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
}

.ping-result-box {
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 13px;
}

.ping-result-box.online {
  background: #ecfdf3;
  border: 1px solid #a6f4c5;
  color: #027a48;
}

.ping-result-box.unconfigured {
  background: #fffaeb;
  border: 1px solid #fedf89;
  color: #b54708;
}

.ping-result-box.error, .ping-result-box.unreachable {
  background: #fef3f2;
  border: 1px solid #fecdca;
  color: #b42318;
}

.llm-inputs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.custom-input, .custom-select, .form-input, .form-select {
  width: 100%;
  padding: 9px 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  font-size: 13px;
  box-sizing: border-box;
}

.custom-range {
  width: 100%;
}

.input-with-button {
  display: flex;
  gap: 6px;
}

.btn-toggle-eye {
  background: var(--bg-hover);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 0 12px;
  font-size: 12px;
  cursor: pointer;
}

.btn-save-llm {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

/* 專家 RAG & 沙盒 */
.experts-playground-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 960px) {
  .experts-playground-split {
    grid-template-columns: 1fr;
  }
}

.experts-list-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.expert-admin-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 16px;
  transition: all 0.2s;
}

.expert-admin-card.selected {
  border-color: var(--primary-deep);
  box-shadow: 0 0 0 2px var(--primary-subtle);
}

.exp-header-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.exp-avatar-large {
  font-size: 32px;
}

.exp-name {
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-deep);
}

.exp-seal-pill {
  font-size: 11px;
  background: var(--amber-deep);
  color: #fff;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 6px;
}

.exp-subtitle {
  font-size: 12px;
  color: var(--ink-muted);
}

.inline-edit-input, .inline-edit-textarea {
  width: 100%;
  padding: 6px 10px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  font-size: 12px;
  box-sizing: border-box;
  margin-top: 2px;
}

.exp-card-footer {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  justify-content: flex-end;
}

.btn-save-exp {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
}

.btn-delete-exp {
  background: #fee4e2;
  color: #b42318;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
}

.btn-test-exp {
  background: var(--amber-deep);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
}

/* Playground */
.playground-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 20px;
  position: sticky;
  top: 20px;
}

.pg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.pg-header h4 {
  margin: 0;
  font-size: 16px;
  color: var(--primary-deep);
}

.preset-chip {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
  margin: 2px;
}

.pg-textarea {
  width: 100%;
  padding: 10px 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  font-size: 13px;
  box-sizing: border-box;
}

.pg-controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.btn-run-playground {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}

.pg-output-wrap {
  margin-top: 20px;
  border-top: 1px dashed var(--border-light);
  padding-top: 16px;
}

.pg-section-title {
  font-size: 13px;
  font-weight: bold;
  color: var(--primary-deep);
  margin-bottom: 8px;
}

.pg-citations-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pg-cite-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
}

.cite-score {
  float: right;
  font-size: 11px;
  color: var(--amber-deep);
}

.pg-markdown-box {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 12px;
  max-height: 350px;
  overflow-y: auto;
}

.markdown-preview {
  margin: 0;
  font-family: inherit;
  font-size: 12px;
  white-space: pre-wrap;
  line-height: 1.5;
}

/* 匯入工作台 */
.import-upload-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 24px;
}

.upload-dropzone {
  border: 2px dashed var(--border-light);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
}

.file-input-hidden {
  display: none;
}

.upload-icon {
  font-size: 36px;
  display: block;
  margin-bottom: 8px;
}

.upload-title {
  font-size: 15px;
  font-weight: bold;
  color: var(--primary-deep);
  display: block;
}

.upload-sub {
  font-size: 12px;
  color: var(--ink-muted);
}

.paste-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 8px;
}

.paste-textarea {
  width: 100%;
  padding: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  box-sizing: border-box;
}

.paste-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.btn-parse-import {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}

.staged-editor-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 20px;
}

.staged-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.staged-table-wrap {
  overflow-x: auto;
}

.staged-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.staged-table th {
  background: var(--bg-hover);
  padding: 8px 10px;
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.staged-table td {
  padding: 6px 8px;
  border-bottom: 1px solid var(--border-light);
}

.cell-input, .cell-select {
  width: 100%;
  padding: 5px 8px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  font-size: 12px;
  box-sizing: border-box;
}

.btn-cell-delete {
  background: none;
  border: none;
  color: #b42318;
  cursor: pointer;
  font-weight: bold;
}

/* 匯出頁面 */
.export-workspace-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 20px;
}

@media (max-width: 900px) {
  .export-workspace-grid {
    grid-template-columns: 1fr;
  }
}

.export-controls-card, .export-preview-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 20px;
}

.control-field {
  margin-bottom: 14px;
}

.control-field label {
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
  color: var(--ink-muted);
}

.export-matched-banner {
  background: var(--primary-subtle);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
  color: var(--primary-deep);
}

.export-buttons-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-export-download {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  text-align: left;
}

.btn-export-download.json { background: #344054; color: #fff; }
.btn-export-download.csv { background: #027a48; color: #fff; }
.btn-export-download.md { background: var(--primary-deep); color: #fff; }

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.format-switcher button {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  cursor: pointer;
  margin-left: 4px;
}

.format-switcher button.active {
  background: var(--primary-deep);
  color: #fff;
  border-color: var(--primary-deep);
}

.preview-content-box {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 14px;
  max-height: 480px;
  overflow-y: auto;
}

.preview-pre {
  margin: 0;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  line-height: 1.4;
}

/* Studio 專題文章實驗室 */
.studio-workspace-grid {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 20px;
}

@media (max-width: 980px) {
  .studio-workspace-grid {
    grid-template-columns: 1fr;
  }
}

.studio-form-card, .studio-output-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 20px;
}

.studio-step-block {
  margin-bottom: 18px;
}

.step-lbl {
  font-size: 13px;
  font-weight: bold;
  color: var(--primary-deep);
  margin-bottom: 8px;
}

.herb-selector-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 140px;
  overflow-y: auto;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 8px;
  background: var(--bg-primary);
}

.herb-check-chip {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  padding: 3px 8px;
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.herb-check-chip.checked {
  background: var(--primary-deep);
  color: #fff;
  border-color: var(--primary-deep);
}

.persona-radio-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.persona-radio-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.persona-radio-card.active {
  border-color: var(--primary-deep);
  background: var(--primary-subtle);
}

.persona-radio-card input {
  display: none;
}

.p-avatar {
  font-size: 22px;
}

.p-name {
  font-weight: bold;
  font-size: 12px;
}

.p-title {
  font-size: 10px;
  color: var(--ink-muted);
}

.btn-generate-article {
  width: 100%;
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.output-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.output-action-btns {
  display: flex;
  gap: 6px;
}

.btn-tool-sm {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
}

.article-meta-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.meta-tag {
  font-size: 11px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 3px 8px;
}

.meta-tag.engine-tag {
  background: var(--amber-subtle);
  color: var(--amber-deep);
}

.article-body-markdown {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  padding: 18px;
  max-height: 520px;
  overflow-y: auto;
}

.markdown-preview-rich {
  margin: 0;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  color: var(--ink-base);
}

.article-placeholder-box {
  text-align: center;
  padding: 80px 20px;
  color: var(--ink-muted);
}

.ph-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.ph-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
}

.ph-desc {
  font-size: 13px;
  max-width: 360px;
  margin: 0 auto;
}

/* 既有草藥管理工具列與彈窗 */
.herbs-manager-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.toolbar-search-input {
  width: 260px;
  padding: 8px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  font-size: 13px;
}

.toolbar-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-create-herb {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.table-herb-thumb {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 6px;
}

.table-herb-name {
  font-weight: bold;
}

.table-herb-scientific {
  font-size: 11px;
  color: var(--ink-muted);
  font-style: italic;
}

.table-region-tag {
  font-size: 11px;
  background: var(--bg-hover);
  padding: 2px 6px;
  border-radius: 4px;
}

.table-nature-badge {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.table-nature-badge[data-nature="溫"] { background: #ffe4e6; color: #e11d48; }
.table-nature-badge[data-nature="平"] { background: #e0f2fe; color: #0284c7; }
.table-nature-badge[data-nature="寒"], .table-nature-badge[data-nature="涼"] { background: #dcfce7; color: #16a34a; }

.table-action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 6px;
}

/* Analytics & Logs */
.analytics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.analytics-card, .logs-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 20px;
}

.dist-row {
  margin-bottom: 12px;
}

.dist-label-wrap {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 4px;
}

.dist-bar-bg {
  background: var(--bg-hover);
  border-radius: 4px;
  height: 8px;
  overflow: hidden;
}

.dist-bar-fill {
  background: var(--primary-deep);
  height: 100%;
}

.dist-bar-fill.gold-bar {
  background: var(--amber-deep);
}

.log-action-pill {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--bg-hover);
}

/* 彈窗 (Modals) */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.herb-editor-modal {
  background: var(--bg-card);
  border-radius: 20px;
  max-width: 1060px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-card);
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid var(--border-light);
}

.editor-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.editor-seal {
  width: 32px;
  height: 32px;
  background: var(--amber-deep);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 15px;
  font-weight: bold;
}

.editor-title {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--primary-deep);
  margin: 0;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--ink-muted);
}

.editor-body-split {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;
  padding: 24px;
  overflow-y: auto;
}

.editor-form-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-row label, .form-row-2 label {
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
  color: var(--ink-muted);
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-textarea {
  width: 100%;
  padding: 8px 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  font-size: 13px;
  box-sizing: border-box;
}

.specimen-plate-preview {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 16px;
}

.plate-top-brand {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--ink-muted);
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.plate-img-wrap {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.plate-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.plate-nature-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--primary-deep);
  color: #fff;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
}

.plate-name {
  font-family: var(--font-serif);
  font-size: 18px;
  margin: 0 0 4px;
  color: var(--primary-deep);
}

.plate-scientific {
  font-size: 12px;
  font-style: italic;
  color: var(--ink-muted);
  margin-bottom: 8px;
}

.plate-efficacy {
  font-size: 12px;
  line-height: 1.5;
  color: var(--ink-base);
}

.editor-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--border-light);
}

.btn-cancel {
  background: var(--bg-hover);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
}

.btn-save {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}
</style>
