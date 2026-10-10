<template>
  <div class="admin-dashboard-container">
    <!-- 未登入狀態：古典密鑰解鎖門扉 -->
    <div v-if="!isAuthenticated" class="admin-auth-gate">
      <div class="auth-card">
        <div class="auth-seal">策</div>
        <h3 class="auth-title">台灣本草植物誌 · 典藏管理模式</h3>
        <p class="auth-desc">
          此區域提供本草資料典藏新增、風土欄位維護、專家 Persona 語意微調與全庫備份。
        </p>
        <div class="auth-input-group">
          <input
            v-model="inputPasscode"
            type="password"
            class="auth-input"
            placeholder="請輸入典藏管理通行碼 (預設: taiwanherb2026)"
            @keydown.enter="handleLogin"
          />
          <button class="auth-submit-btn" :disabled="isLoggingIn" @click="handleLogin">
            {{ isLoggingIn ? '驗證中...' : '解鎖典藏台 ➔' }}
          </button>
        </div>
        <div class="auth-hint">
          💡 提示：本展示系統已預設管理密鑰 <code>taiwanherb2026</code>，點擊即可登入。
        </div>
      </div>
    </div>

    <!-- 已登入狀態：殿堂級本草管理中樞 -->
    <div v-else class="admin-main-panel">
      <!-- 頂部管理控制列 -->
      <div class="admin-topbar">
        <div class="admin-badge-group">
          <span class="admin-seal">管</span>
          <div>
            <div class="admin-title">台灣本草知識庫 · 典藏後台與數據中樞</div>
            <div class="admin-sub">Curator Mode Active ‧ 管理員身分已授權</div>
          </div>
        </div>

        <div class="admin-actions-group">
          <!-- 備份與匯出按鈕 -->
          <a
            href="/api/admin/export?format=json"
            download="taiwanherb-export.json"
            class="admin-tool-btn"
            title="下載全庫 JSON 備份檔"
          >
            📥 備份 JSON
          </a>
          <a
            href="/api/admin/export?format=csv"
            download="taiwanherb-export.csv"
            class="admin-tool-btn"
            title="匯出 CSV 試算表"
          >
            📊 匯出 CSV
          </a>
          <button class="admin-tool-btn warning-btn" @click="confirmReset">
            🔄 重置種子庫
          </button>
          <button class="admin-tool-btn exit-btn" @click="handleLogout">
            ✕ 退出後台
          </button>
        </div>
      </div>

      <!-- 核心數據指標卡 -->
      <div class="admin-stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🌿</div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalHerbs || 0 }} <small>味</small></div>
            <div class="stat-label">全庫典藏藥材 ({{ stats.publishedHerbs || 0 }} 發布 / {{ stats.draftHerbs || 0 }} 草稿)</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🏞️</div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.regionsCount || 0 }} <small>區</small></div>
            <div class="stat-label">涵蓋台灣風土區域</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📁</div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.categoriesCount || 0 }} <small>類</small></div>
            <div class="stat-label">本草功效與分類</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🍵</div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.expertsCount || 4 }} <small>席</small></div>
            <div class="stat-label">RAG 風土諮詢名師</div>
          </div>
        </div>
      </div>

      <!-- 管理模組分頁導覽列 -->
      <div class="admin-tabs-nav">
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
          :class="{ active: currentTab === 'experts' }"
          @click="currentTab = 'experts'"
        >
          <span>🍵</span>
          <span>諮詢專家 Persona 設定</span>
        </button>
        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'analytics' }"
          @click="currentTab = 'analytics'"
        >
          <span>📈</span>
          <span>風土分佈與知識圖譜</span>
        </button>
        <button
          class="admin-nav-tab"
          :class="{ active: currentTab === 'logs' }"
          @click="currentTab = 'logs'"
        >
          <span>📋</span>
          <span>操作審計日誌 ({{ logs.length }})</span>
        </button>
      </div>

      <!-- 標籤一：本草清單管理與新增 -->
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

            <button class="btn-create-herb" @click="openCreateModal">
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
                <td>
                  <span class="table-cat-tag">{{ h.category }}</span>
                </td>
                <td>
                  <strong>{{ h.nature }}</strong> · {{ (h.taste || []).join('、') }}
                </td>
                <td>
                  <span class="table-safety-tag">{{ h.safetyLevel || '溫和常飲' }}</span>
                </td>
                <td>
                  <span
                    class="status-pill"
                    :class="h.status === 'draft' ? 'status-draft' : 'status-published'"
                  >
                    {{ h.status === 'draft' ? '草稿' : '已發布' }}
                  </span>
                </td>
                <td style="text-align: center;">
                  <button class="btn-table-action edit" title="編輯草藥" @click="openEditModal(h)">
                    ✎ 編輯
                  </button>
                  <button class="btn-table-action delete" title="刪除草藥" @click="confirmDelete(h)">
                    🗑
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 標籤二：專家 Persona 設定微調 -->
      <div v-else-if="currentTab === 'experts'" class="admin-tab-pane">
        <div class="experts-cms-grid">
          <div v-for="exp in expertList" :key="exp.id" class="expert-cms-card">
            <div class="expert-cms-header">
              <span class="expert-cms-avatar">{{ exp.avatar }}</span>
              <div>
                <h4 class="expert-cms-name">{{ exp.name }}</h4>
                <div class="expert-cms-title">{{ exp.title }}</div>
              </div>
              <span class="expert-cms-seal">{{ exp.seal }}</span>
            </div>

            <div class="expert-cms-body">
              <div class="form-group">
                <label>風土背景產區：</label>
                <input v-model="exp.region" type="text" class="input-modern" />
              </div>

              <div class="form-group">
                <label>回答口吻風格描述：</label>
                <input v-model="exp.tone" type="text" class="input-modern" />
              </div>

              <div class="form-group">
                <label>經典語錄 Catchphrase：</label>
                <input v-model="exp.catchphrase" type="text" class="input-modern" />
              </div>

              <div class="form-group">
                <label>開場問候語：</label>
                <input v-model="exp.greeting" type="text" class="input-modern" />
              </div>
            </div>

            <div class="expert-cms-footer">
              <button class="btn-save-expert" @click="saveExpertSettings(exp)">
                💾 儲存 Persona 語意設定
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 標籤三：風土分佈與圖譜統計 -->
      <div v-else-if="currentTab === 'analytics'" class="admin-tab-pane">
        <div class="analytics-panels-grid">
          <!-- 風土分佈統計 -->
          <div class="analytics-card">
            <h4 class="analytics-title">🏞️ 台灣風土區域草藥分佈</h4>
            <div class="analytics-bars">
              <div v-for="r in stats.regions" :key="r.name" class="bar-row">
                <span class="bar-name">{{ r.name }}</span>
                <div class="bar-track">
                  <div
                    class="bar-fill"
                    :style="{ width: ((r.count / (stats.totalHerbs || 1)) * 100) + '%' }"
                  ></div>
                </div>
                <span class="bar-val">{{ r.count }} 味</span>
              </div>
            </div>
          </div>

          <!-- 四氣陰陽平衡分佈 -->
          <div class="analytics-card">
            <h4 class="analytics-title">❄️🔥 四氣藥性分佈</h4>
            <div class="analytics-bars">
              <div v-for="n in stats.natures" :key="n.name" class="bar-row">
                <span class="bar-name">{{ n.name }}</span>
                <div class="bar-track">
                  <div
                    class="bar-fill nature-fill"
                    :style="{ width: ((n.count / (stats.totalHerbs || 1)) * 100) + '%' }"
                  ></div>
                </div>
                <span class="bar-val">{{ n.count }} 味</span>
              </div>
            </div>
          </div>

          <!-- 十二經絡受納分佈 -->
          <div class="analytics-card">
            <h4 class="analytics-title">🫀 十二經脈歸經受納</h4>
            <div class="analytics-bars">
              <div v-for="ch in stats.channels" :key="ch.name" class="bar-row">
                <span class="bar-name">{{ ch.name }}經</span>
                <div class="bar-track">
                  <div
                    class="bar-fill channel-fill"
                    :style="{ width: ((ch.count / (stats.totalHerbs || 1)) * 100) + '%' }"
                  ></div>
                </div>
                <span class="bar-val">{{ ch.count }} 次</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 標籤四：操作審計日誌 -->
      <div v-else-if="currentTab === 'logs'" class="admin-tab-pane">
        <div class="logs-container">
          <div v-for="log in logs" :key="log.id" class="log-item">
            <div class="log-top">
              <span class="log-action">{{ log.action }}</span>
              <span class="log-entity">{{ log.entity }}</span>
              <span class="log-time">{{ new Date(log.timestamp).toLocaleString('zh-TW') }}</span>
            </div>
            <div class="log-details">{{ log.details }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 殿堂級新增/編輯本草彈窗 (含即時古典標本票卡預覽) -->
    <div v-if="isHerbModalOpen" class="modal-overlay" @click.self="isHerbModalOpen = false">
      <div class="herb-editor-modal">
        <div class="editor-header">
          <div class="editor-title-wrap">
            <span class="editor-seal">{{ isEditing ? '修' : '典' }}</span>
            <h3 class="editor-title">{{ isEditing ? `編輯草藥：${herbForm.name}` : '典藏新增本草植物' }}</h3>
          </div>
          <button class="modal-close-btn" @click="isHerbModalOpen = false">✕</button>
        </div>

        <div class="editor-body-split">
          <!-- 左欄：表單輸入群 -->
          <div class="editor-form-col">
            <!-- 分組一：基本植物學 -->
            <div class="form-section-title">🌱 植物學基本資料</div>
            <div class="form-row-2">
              <div class="form-group">
                <label>藥材名稱 <span class="required">*</span></label>
                <input v-model="herbForm.name" type="text" class="input-modern" placeholder="例：抹草" />
              </div>
              <div class="form-group">
                <label>學名 (Scientific Name)</label>
                <input v-model="herbForm.scientificName" type="text" class="input-modern" placeholder="例：Desmodium paniculatum" />
              </div>
            </div>

            <div class="form-row-2">
              <div class="form-group">
                <label>植物科屬 (Family)</label>
                <input v-model="herbForm.family" type="text" class="input-modern" placeholder="例：豆科 (Fabaceae)" />
              </div>
              <div class="form-group">
                <label>功效分類 <span class="required">*</span></label>
                <select v-model="herbForm.category" class="input-modern">
                  <option value="台灣青草茶經典">台灣青草茶經典</option>
                  <option value="客家風土民俗草">客家風土民俗草</option>
                  <option value="原住民山林草本">原住民山林草本</option>
                  <option value="清熱解毒藥">清熱解毒藥</option>
                  <option value="清熱燥濕藥">清熱燥濕藥</option>
                  <option value="辛涼解表藥">辛涼解表藥</option>
                  <option value="辛溫解表藥">辛溫解表藥</option>
                  <option value="食藥同源補益">食藥同源補益</option>
                  <option value="溫經止血與理氣藥">溫經止血與理氣藥</option>
                </select>
              </div>
            </div>

            <!-- 分組二：風土與民間情境 -->
            <div class="form-section-title">🏞️ 台灣風土與民間文化</div>
            <div class="form-row-2">
              <div class="form-group">
                <label>風土區域分佈</label>
                <select v-model="herbForm.region" class="input-modern">
                  <option value="北部 (萬華/淡水河/雙北)">北部 (萬華/淡水河/雙北)</option>
                  <option value="桃竹苗 (客庄丘陵/關西/南庄)">桃竹苗 (客庄丘陵/關西/南庄)</option>
                  <option value="中部 (彰化田尾/南投名間/埔里)">中部 (彰化田尾/南投名間/埔里)</option>
                  <option value="南部 (六堆屏東/高樹/恆春半島)">南部 (六堆屏東/高樹/恆春半島)</option>
                  <option value="花東原鄉 (花蓮吉安/太魯閣/台東)">花東原鄉 (花蓮吉安/太魯閣/台東)</option>
                  <option value="全島平野與山林">全島平野與山林</option>
                </select>
              </div>
              <div class="form-group">
                <label>民間生活情境應用</label>
                <select v-model="herbForm.folkApplication" class="input-modern">
                  <option value="萬華退火青草茶">萬華退火青草茶</option>
                  <option value="客家辟邪抹草沐浴">客家辟邪抹草沐浴</option>
                  <option value="坐月子產後驅風擦澡">坐月子產後驅風擦澡</option>
                  <option value="食療燉雞開脾健胃">食療燉雞開脾健胃</option>
                  <option value="原民野菜與食茱萸香料">原民野菜與食茱萸香料</option>
                  <option value="消暑仙草甘茶">消暑仙草甘茶</option>
                  <option value="民間防疫解毒飲">民間防疫解毒飲</option>
                  <option value="百草苦茶退癀降火">百草苦茶退癀降火</option>
                  <option value="潤喉開音護喉茶">潤喉開音護喉茶</option>
                  <option value="外用搗敷消腫">外用搗敷消腫</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>生長風土記述 (Terroir)</label>
              <input v-model="herbForm.terroir" type="text" class="input-modern" placeholder="例：新竹竹東山麓、苗栗三義客庄" />
            </div>

            <div class="form-group">
              <label>台灣風土人文故事 (Taiwan Heritage)</label>
              <textarea v-model="herbForm.taiwanHeritage" rows="3" class="input-modern" placeholder="記錄該草藥在台灣這片土地上的民間歷史與常民生活回憶..."></textarea>
            </div>

            <!-- 分組三：性味歸經與藥性 -->
            <div class="form-section-title">❄️🔥 性味歸經與安全</div>
            <div class="form-row-3">
              <div class="form-group">
                <label>四氣藥性</label>
                <select v-model="herbForm.nature" class="input-modern">
                  <option value="大寒">大寒</option>
                  <option value="寒">寒</option>
                  <option value="微寒">微寒</option>
                  <option value="涼">涼</option>
                  <option value="平">平</option>
                  <option value="微溫">微溫</option>
                  <option value="溫">溫</option>
                  <option value="熱">熱</option>
                </select>
              </div>
              <div class="form-group">
                <label>入藥部位</label>
                <select v-model="herbForm.partsUsed" class="input-modern">
                  <option value="全草">全草</option>
                  <option value="嫩莖葉">嫩莖葉</option>
                  <option value="莖葉">莖葉</option>
                  <option value="花蕾">花蕾</option>
                  <option value="果實">果實</option>
                  <option value="根及根莖">根及根莖</option>
                </select>
              </div>
              <div class="form-group">
                <label>安全等級</label>
                <select v-model="herbForm.safetyLevel" class="input-modern">
                  <option value="溫和常飲">溫和常飲</option>
                  <option value="虛寒慎用">虛寒慎用</option>
                  <option value="孕婦慎用">孕婦慎用</option>
                  <option value="苦寒遵醫囑">苦寒遵醫囑</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>核心功效 (Efficacy)</label>
              <textarea v-model="herbForm.efficacy" rows="2" class="input-modern" placeholder="清熱解毒、利尿散瘀、消腫止瀉..."></textarea>
            </div>

            <div class="form-group">
              <label>使用禁忌 (Contraindications)</label>
              <input v-model="herbForm.contraindications" type="text" class="input-modern" placeholder="脾胃虛寒容易便溏者慎用..." />
            </div>

            <div class="form-group">
              <label>標本圖鑑網址 (Thumbnail URL)</label>
              <input v-model="herbForm.thumbnailUrl" type="text" class="input-modern" placeholder="https://..." />
            </div>
          </div>

          <!-- 右欄：所見即所得「即時古典標本票卡預覽」 -->
          <div class="editor-preview-col">
            <div class="preview-header">
              <span class="preview-seal">印</span>
              <span>即時古典標本票卡預覽 (Live Specimen Plate)</span>
            </div>

            <div class="live-specimen-plate">
              <div class="plate-top-seal">
                <span>TAIWAN HERB SPECIMEN</span>
                <span>NO. {{ herbForm.id || 'NEW' }}</span>
              </div>

              <div class="plate-img-wrap">
                <img :src="herbForm.thumbnailUrl || 'https://images.unsplash.com/photo-1596726915017-91a566ce0aa7?auto=format&fit=crop&w=600&q=80'" alt="Preview" class="plate-img" />
                <span class="plate-nature-badge">{{ herbForm.nature || '平' }}</span>
              </div>

              <div class="plate-info">
                <h3 class="plate-name">{{ herbForm.name || '草藥名稱' }}</h3>
                <div class="plate-scientific">{{ herbForm.scientificName || 'Botanical Name' }}</div>
                <div class="plate-family">{{ herbForm.family || '科屬' }}</div>

                <div class="plate-tags">
                  <span class="plate-pill">{{ herbForm.region || '風土區域' }}</span>
                  <span class="plate-pill">{{ herbForm.folkApplication || '生活情境' }}</span>
                  <span class="plate-pill">{{ herbForm.safetyLevel || '安全等級' }}</span>
                </div>

                <div class="plate-efficacy">{{ herbForm.efficacy || '輸入核心功效即可即時呈現於此處標本箋...' }}</div>

                <div class="plate-bottom-signature">
                  <span>台灣本草植物誌典藏委製</span>
                  <span class="verif-seal">印可</span>
                </div>
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

const isAuthenticated = ref(!!HerbApi.getAuthToken());
const inputPasscode = ref('');
const isLoggingIn = ref(false);

const currentTab = ref('herbs');
const stats = ref({});
const adminHerbs = ref([]);
const expertList = ref([]);
const logs = ref([]);

const herbFilterQuery = ref('');
const filterCategory = ref('全部');
const filterStatus = ref('全部');

// 編輯彈窗狀態
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
  folkApplication: '萬華退火青草茶',
  terroir: '',
  taiwanHeritage: '',
  nature: '涼',
  taste: ['微苦', '甘'],
  channels: ['肺', '胃'],
  partsUsed: '全草',
  safetyLevel: '溫和常飲',
  efficacy: '',
  contraindications: '虛寒體質者適量飲用。',
  thumbnailUrl: 'https://images.unsplash.com/photo-1596726915017-91a566ce0aa7?auto=format&fit=crop&w=800&q=85',
  status: 'published'
});

onMounted(() => {
  if (isAuthenticated.value) {
    loadDashboardData();
  }
});

const handleLogin = async () => {
  if (!inputPasscode.value.trim()) return;
  isLoggingIn.value = true;
  try {
    const res = await HerbApi.adminLogin(inputPasscode.value.trim());
    if (res.authenticated) {
      isAuthenticated.value = true;
      audio.playChime(660);
      loadDashboardData();
    }
  } catch (err) {
    audio.playClick();
    alert('密碼錯誤：' + err.message);
  } finally {
    isLoggingIn.value = false;
  }
};

const handleLogout = () => {
  audio.playClick();
  HerbApi.setAuthToken('');
  isAuthenticated.value = false;
};

const loadDashboardData = async () => {
  try {
    const [statsRes, herbsRes, expertsRes, logsRes] = await Promise.all([
      HerbApi.getAdminStats(),
      HerbApi.getAdminHerbs({ limit: 100 }),
      HerbApi.getConsultExperts(),
      HerbApi.getAdminLogs()
    ]);
    stats.value = statsRes;
    adminHerbs.value = herbsRes.items;
    expertList.value = expertsRes;
    logs.value = logsRes;
  } catch (err) {
    console.error('載入後台資料失敗:', err);
  }
};

const filteredAdminHerbs = computed(() => {
  let list = adminHerbs.value;
  if (herbFilterQuery.value.trim()) {
    const q = herbFilterQuery.value.trim().toLowerCase();
    list = list.filter(h =>
      h.name.toLowerCase().includes(q) ||
      (h.scientificName || '').toLowerCase().includes(q) ||
      (h.region || '').toLowerCase().includes(q)
    );
  }
  if (filterCategory.value !== '全部') {
    list = list.filter(h => h.category === filterCategory.value);
  }
  if (filterStatus.value !== '全部') {
    list = list.filter(h => (h.status || 'published') === filterStatus.value);
  }
  return list;
});

const openCreateModal = () => {
  audio.playClick();
  isEditing.value = false;
  herbForm.value = {
    id: null,
    name: '',
    scientificName: '',
    family: '',
    category: '台灣青草茶經典',
    region: '北部 (萬華/淡水河/雙北)',
    folkApplication: '萬華退火青草茶',
    terroir: '',
    taiwanHeritage: '',
    nature: '涼',
    taste: ['微苦', '甘'],
    channels: ['肺', '胃'],
    partsUsed: '全草',
    safetyLevel: '溫和常飲',
    efficacy: '',
    contraindications: '脾胃虛寒者適量飲用。',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596726915017-91a566ce0aa7?auto=format&fit=crop&w=800&q=85',
    status: 'published'
  };
  isHerbModalOpen.value = true;
};

const openEditModal = (herb) => {
  audio.playScroll();
  isEditing.value = true;
  herbForm.value = { ...herb };
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
    alert(`專家「${exp.name}」之語意設定已成功保存！`);
    await loadDashboardData();
  } catch (err) {
    alert('儲存專家設定失敗：' + err.message);
  }
};

const confirmReset = async () => {
  if (!confirm('警告：此操作將重置資料庫為預設 25 味種子資料，自訂草藥將清除，確定繼續？')) return;
  try {
    await HerbApi.resetDatabase();
    audio.playChime(528);
    alert('資料庫已成功重置為初始 25 味指標性本草！');
    await loadDashboardData();
  } catch (err) {
    alert('重置失敗：' + err.message);
  }
};
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
  min-height: 480px;
}

.auth-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 40px;
  max-width: 520px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.auth-seal {
  width: 54px;
  height: 54px;
  background: var(--amber-deep);
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 18px;
}

.auth-title {
  font-family: var(--font-serif);
  font-size: 22px;
  color: var(--primary-deep);
  margin-bottom: 10px;
}

.auth-desc {
  font-size: 13.5px;
  color: var(--ink-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.auth-input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.auth-input {
  flex-grow: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-light);
  border-radius: 10px;
  font-size: 14px;
  background: var(--bg-parchment);
  outline: none;
}

.auth-input:focus {
  border-color: var(--primary);
}

.auth-submit-btn {
  background: var(--primary);
  color: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.auth-hint {
  font-size: 12px;
  color: var(--ink-muted);
}

/* 後台主視圖 */
.admin-main-panel {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.admin-topbar {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}

.admin-badge-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-seal {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: bold;
}

.admin-title {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--primary-deep);
  font-weight: bold;
}

.admin-sub {
  font-size: 12px;
  color: var(--ink-muted);
}

.admin-actions-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.admin-tool-btn {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: var(--ink-body);
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 12.5px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.admin-tool-btn:hover {
  background: var(--bg-parchment);
  color: var(--primary);
}

.warning-btn {
  color: #c94a29;
}

.exit-btn {
  background: #fdeee9;
  border-color: #f7cfc4;
  color: #b93815;
}

/* 統計卡片 */
.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: var(--shadow-sm);
}

.stat-icon {
  font-size: 32px;
}

.stat-value {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-deep);
}

.stat-value small {
  font-size: 13px;
  color: var(--ink-muted);
  font-weight: normal;
}

.stat-label {
  font-size: 12px;
  color: var(--ink-muted);
}

/* 分頁導覽 */
.admin-tabs-nav {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid var(--border-light);
  padding-bottom: 6px;
  flex-wrap: wrap;
}

.admin-nav-tab {
  background: none;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-family: var(--font-serif);
  font-size: 14.5px;
  cursor: pointer;
  color: var(--ink-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.admin-nav-tab:hover {
  color: var(--primary);
}

.admin-nav-tab.active {
  background: var(--primary-pale);
  color: var(--primary-deep);
  font-weight: bold;
}

/* 本草清單管理工具列 */
.herbs-manager-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.toolbar-search-wrap {
  flex-grow: 1;
  max-width: 380px;
}

.toolbar-search-input {
  width: 100%;
  padding: 9px 14px;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  font-size: 13.5px;
  background: var(--bg-card);
  outline: none;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-create-herb {
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  color: #fff;
  border: none;
  padding: 9px 18px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 管理表格 */
.herbs-table-wrap {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.admin-table th {
  background: var(--bg-subtle);
  padding: 12px 14px;
  text-align: left;
  font-weight: bold;
  color: var(--ink-heavy);
  border-bottom: 1px solid var(--border-light);
}

.admin-table td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-light);
  color: var(--ink-body);
}

.table-herb-thumb {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
}

.table-herb-name {
  font-weight: bold;
  color: var(--primary-deep);
}

.table-herb-scientific {
  font-size: 11px;
  color: var(--ink-muted);
  font-style: italic;
}

.table-region-tag, .table-cat-tag {
  font-size: 11.5px;
  background: var(--bg-subtle);
  padding: 2px 6px;
  border-radius: 4px;
}

.table-safety-tag {
  font-size: 11.5px;
  color: var(--amber-deep);
}

.status-pill {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: bold;
}

.status-published {
  background: #def7ec;
  color: #03543f;
}

.status-draft {
  background: #fef08a;
  color: #854d0e;
}

.btn-table-action {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid var(--border-light);
  margin: 0 2px;
}

.btn-table-action.edit {
  background: var(--primary-pale);
  color: var(--primary-deep);
}

.btn-table-action.delete {
  background: #fee2e2;
  color: #991b1b;
}

/* 專家 CMS */
.experts-cms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 18px;
}

.expert-cms-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.expert-cms-header {
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 12px;
  margin-bottom: 16px;
}

.expert-cms-avatar {
  font-size: 32px;
}

.expert-cms-name {
  font-family: var(--font-serif);
  font-size: 17px;
  color: var(--primary-deep);
}

.expert-cms-title {
  font-size: 12px;
  color: var(--ink-muted);
}

.expert-cms-seal {
  margin-left: auto;
  font-size: 11px;
  background: var(--amber-deep);
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
}

.expert-cms-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 12px;
  color: var(--ink-muted);
  font-weight: bold;
}

.input-modern {
  padding: 8px 12px;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  font-size: 13.5px;
  background: var(--bg-parchment);
  outline: none;
}

.btn-save-expert {
  margin-top: 16px;
  width: 100%;
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 9px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

/* 圖表與統計 */
.analytics-panels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
}

.analytics-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 20px;
}

.analytics-title {
  font-family: var(--font-serif);
  font-size: 16px;
  color: var(--primary-deep);
  margin-bottom: 16px;
}

.analytics-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12.5px;
}

.bar-name {
  width: 90px;
  color: var(--ink-body);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.bar-track {
  flex-grow: 1;
  height: 10px;
  background: var(--bg-subtle);
  border-radius: 5px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 5px;
}

.nature-fill {
  background: var(--amber);
}

.channel-fill {
  background: #3b82f6;
}

.bar-val {
  width: 40px;
  text-align: right;
  font-weight: bold;
  color: var(--ink-heavy);
}

/* 審計日誌 */
.logs-container {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 500px;
  overflow-y: auto;
}

.log-item {
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 10px;
}

.log-top {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  margin-bottom: 4px;
}

.log-action {
  background: var(--primary-pale);
  color: var(--primary-deep);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.log-entity {
  font-weight: bold;
}

.log-time {
  margin-left: auto;
  color: var(--ink-muted);
}

.log-details {
  font-size: 13px;
  color: var(--ink-body);
}

/* 編輯 Modal 樣式 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 19, 0.7);
  backdrop-filter: blur(6px);
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

.form-section-title {
  font-family: var(--font-serif);
  font-weight: bold;
  font-size: 14px;
  color: var(--primary-deep);
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 4px;
  margin-top: 6px;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-row-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.required {
  color: #dc2626;
}

/* 即時標本預覽卡 */
.editor-preview-col {
  display: flex;
  flex-direction: column;
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: var(--ink-muted);
  margin-bottom: 12px;
}

.preview-seal {
  background: var(--primary-pale);
  color: var(--primary-deep);
  font-size: 11px;
  padding: 1px 5px;
  border-radius: 4px;
}

.live-specimen-plate {
  background: var(--bg-parchment);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  padding: 18px;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.plate-top-seal {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  letter-spacing: 1px;
  color: var(--ink-muted);
  border-bottom: 1px dashed var(--border-light);
  padding-bottom: 6px;
  margin-bottom: 12px;
}

.plate-img-wrap {
  position: relative;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 14px;
}

.plate-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plate-nature-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: bold;
}

.plate-name {
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--primary-deep);
  margin-bottom: 4px;
}

.plate-scientific {
  font-size: 12px;
  font-style: italic;
  color: var(--ink-muted);
  margin-bottom: 2px;
}

.plate-family {
  font-size: 11.5px;
  color: var(--ink-muted);
  margin-bottom: 10px;
}

.plate-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
}

.plate-pill {
  font-size: 10.5px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--primary-deep);
}

.plate-efficacy {
  font-size: 12px;
  color: var(--ink-body);
  line-height: 1.5;
  margin-bottom: 16px;
}

.plate-bottom-signature {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed var(--border-light);
  padding-top: 8px;
  font-size: 10.5px;
  color: var(--ink-muted);
}

.verif-seal {
  font-family: var(--font-serif);
  background: #b91c1c;
  color: #fff;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.editor-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--border-light);
  background: var(--bg-subtle);
}

.btn-cancel {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13.5px;
}

.btn-save {
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  color: #fff;
  border: none;
  padding: 8px 24px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: bold;
  cursor: pointer;
}
</style>
