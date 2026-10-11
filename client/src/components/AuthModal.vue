<template>
  <div v-if="isOpen" class="auth-modal-overlay" @click.self="$emit('close')">
    <div class="auth-modal-card">
      <!-- 彈窗頂部標題列 -->
      <div class="auth-modal-header">
        <div class="header-seal-wrap">
          <span class="auth-seal">令</span>
          <div>
            <h3 class="auth-modal-title">臺灣本草 · 使用者身分登入與權限中樞</h3>
            <div class="auth-modal-subtitle">User Authentication & Role-Based Access Control (RBAC)</div>
          </div>
        </div>
        <button class="modal-close" title="關閉" @click="$emit('close')">✕</button>
      </div>

      <!-- 標籤切換 -->
      <div class="auth-tab-bar">
        <button
          class="auth-tab-btn"
          :class="{ active: activeAuthTab === 'login' }"
          @click="activeAuthTab = 'login'"
        >
          <span>🔑</span>
          <span>帳號登入</span>
        </button>
        <button
          class="auth-tab-btn"
          :class="{ active: activeAuthTab === 'roles' }"
          @click="activeAuthTab = 'roles'"
        >
          <span>⚡</span>
          <span>5 大角色一鍵切換</span>
        </button>
        <button
          class="auth-tab-btn"
          :class="{ active: activeAuthTab === 'matrix' }"
          @click="activeAuthTab = 'matrix'"
        >
          <span>📜</span>
          <span>前後台權限矩陣</span>
        </button>
      </div>

      <!-- 彈窗內容區 -->
      <div class="auth-modal-body">
        <!-- 1. 當前已登入狀態顯示橫幅 -->
        <div v-if="currentUser" class="current-user-banner">
          <div class="banner-user-left">
            <span class="banner-avatar">{{ currentUser.avatar || '👤' }}</span>
            <div>
              <div class="banner-name-row">
                <strong class="banner-name">{{ currentUser.name }}</strong>
                <span class="banner-username">(@{{ currentUser.username }})</span>
                <span class="banner-role-badge" :class="currentUser.role">
                  {{ roleNameMap[currentUser.role] || currentUser.role }}
                </span>
              </div>
              <div class="banner-email">{{ currentUser.email }}</div>
            </div>
          </div>
          <div class="banner-user-actions">
            <button
              v-if="hasAdminAccess"
              class="btn-enter-admin"
              @click="enterAdmin"
            >
              進入管理後台 ➔
            </button>
            <button class="btn-logout" @click="handleLogout">
              登出帳號
            </button>
          </div>
        </div>

        <!-- 標籤 1: 帳號密碼登入 -->
        <div v-if="activeAuthTab === 'login'" class="auth-panel">
          <form class="login-form-box" @submit.prevent="handleFormLogin">
            <div class="form-title">
              <span>{{ currentUser ? '切換其他使用者帳號' : '使用者登入驗證' }}</span>
              <small class="form-desc">輸入指定帳號密碼，系統將依據角色指派前後台相應操作權限</small>
            </div>

            <div v-if="errorMessage" class="auth-alert-error">
              <span>⚠️</span>
              <span>{{ errorMessage }}</span>
            </div>

            <div v-if="successMessage" class="auth-alert-success">
              <span>✅</span>
              <span>{{ successMessage }}</span>
            </div>

            <div class="form-group">
              <label>使用者帳號 (Username)：</label>
              <input
                v-model="loginForm.username"
                type="text"
                class="custom-input"
                placeholder="例如: admin / curator_lin / expert_chen / auditor_wang / member_liao"
                required
              />
            </div>

            <div class="form-group">
              <label>登入密碼 (Password)：</label>
              <input
                v-model="loginForm.password"
                type="password"
                class="custom-input"
                placeholder="請輸入密碼 (預設: taiwanherb2026 或 角色名稱+2026)"
                required
              />
            </div>

            <button type="submit" class="btn-auth-submit" :disabled="isSubmitting">
              {{ isSubmitting ? '驗證授權中...' : '確認登入驗證 ➔' }}
            </button>
          </form>

          <!-- 快速指引提示 -->
          <div class="quick-credentials-hint">
            <div class="hint-title">💡 快速測試帳密備忘：</div>
            <div class="hint-grid">
              <div class="hint-item" @click="fillCreds('admin', 'taiwanherb2026')">
                👑 <strong>admin</strong> / <code>taiwanherb2026</code> (至高管理員)
              </div>
              <div class="hint-item" @click="fillCreds('curator_lin', 'curator2026')">
                📜 <strong>curator_lin</strong> / <code>curator2026</code> (本草策展師)
              </div>
              <div class="hint-item" @click="fillCreds('expert_chen', 'consultant2026')">
                🍵 <strong>expert_chen</strong> / <code>consultant2026</code> (本草諮詢顧問)
              </div>
              <div class="hint-item" @click="fillCreds('auditor_wang', 'auditor2026')">
                🔍 <strong>auditor_wang</strong> / <code>auditor2026</code> (典藏觀察員)
              </div>
              <div class="hint-item" @click="fillCreds('member_liao', 'member2026')">
                🌱 <strong>member_liao</strong> / <code>member2026</code> (草木學員 · 前台)
              </div>
            </div>
            <small class="hint-click-note">（點擊上方任一列即可自動填入）</small>
          </div>
        </div>

        <!-- 標籤 2: 5 大角色一鍵切換卡片 -->
        <div v-if="activeAuthTab === 'roles'" class="auth-panel">
          <div class="roles-picker-header">
            <h4>⚡ 一鍵切換 5 大角色 身分與權限</h4>
            <p>點選下方任一身分，系統將即時切換權限 Token，方便檢驗前後台權限隔離。</p>
          </div>

          <div class="role-cards-grid">
            <div
              v-for="roleItem in presetRoles"
              :key="roleItem.username"
              class="role-switch-card"
              :class="{
                active: currentUser && currentUser.username === roleItem.username,
                [roleItem.key]: true
              }"
              @click="quickLoginRole(roleItem)"
            >
              <div class="card-top-row">
                <span class="role-icon">{{ roleItem.avatar }}</span>
                <span class="role-badge">{{ roleItem.badge }}</span>
              </div>
              <div class="role-name-title">{{ roleItem.name }}</div>
              <div class="role-acc-info">
                帳號：<code>{{ roleItem.username }}</code>
              </div>
              <p class="role-desc-text">{{ roleItem.description }}</p>
              <div class="role-scope-pill" :class="roleItem.scope">
                {{ roleItem.scopeText }}
              </div>
              <button class="btn-role-select">
                {{ currentUser && currentUser.username === roleItem.username ? '目前使用中 ✓' : '一鍵登入此角色 ➔' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 標籤 3: 前後台權限矩陣 -->
        <div v-if="activeAuthTab === 'matrix'" class="auth-panel">
          <div class="matrix-header">
            <h4>📜 臺灣本草植物誌 · 角色與功能權限對照矩陣 (RBAC Matrix)</h4>
            <p>嚴格區分前台常民文化探索與後台典藏資料治理權限，杜絕越權操作。</p>
          </div>

          <div class="matrix-table-wrap">
            <table class="matrix-table">
              <thead>
                <tr>
                  <th>系統功能模組 / 操作權限</th>
                  <th>👑 至高管理員</th>
                  <th>📜 本草策展師</th>
                  <th>🍵 諮詢顧問</th>
                  <th>🔍 典藏觀察員</th>
                  <th>🌱 前台學員</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>前台圖鑑檢索與地圖探索</strong></td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                </tr>
                <tr>
                  <td><strong>風土茶堂 RAG 專家諮詢</strong></td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                </tr>
                <tr>
                  <td><strong>草木茶飲風味研製 (Alchemy Lab)</strong></td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                </tr>
                <tr>
                  <td><strong>進入典藏後台管理中心 (Admin CMS)</strong></td>
                  <td class="perm-yes">✓ 完全開放</td>
                  <td class="perm-yes">✓ 策展管理</td>
                  <td class="perm-yes">✓ 專家調校</td>
                  <td class="perm-read">◎ 唯讀查閱</td>
                  <td class="perm-no">✕ 禁止訪問</td>
                </tr>
                <tr>
                  <td><strong>本草資料庫維護 (CRUD / 批次匯入)</strong></td>
                  <td class="perm-yes">✓ 完全寫入</td>
                  <td class="perm-yes">✓ 編輯匯入</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-read">◎ 唯讀</td>
                  <td class="perm-no">✕ 禁止</td>
                </tr>
                <tr>
                  <td><strong>專題文章生成實驗室 (Article Studio)</strong></td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-yes">✓ 審閱調校</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-no">✕ 禁止</td>
                </tr>
                <tr>
                  <td><strong>專家 Persona 與提示詞調校 (RAG Tuner)</strong></td>
                  <td class="perm-yes">✓ 允許</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-yes">✓ 專家權責</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-no">✕ 禁止</td>
                </tr>
                <tr>
                  <td><strong>LLM 提供商與 API 來源配置 (Ollama/Gemini)</strong></td>
                  <td class="perm-yes">✓ 最高專屬</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-no">✕ 禁止</td>
                </tr>
                <tr>
                  <td><strong>使用者帳號管理與權限分配 (RBAC Manager)</strong></td>
                  <td class="perm-yes">✓ 最高專屬</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-no">✕ 禁止</td>
                  <td class="perm-no">✕ 禁止</td>
                </tr>
                <tr>
                  <td><strong>系統審計日誌與統計報表查閱</strong></td>
                  <td class="perm-yes">✓ 查閱/審計</td>
                  <td class="perm-yes">✓ 查閱</td>
                  <td class="perm-yes">✓ 查閱</td>
                  <td class="perm-yes">✓ 稽核職責</td>
                  <td class="perm-no">✕ 禁止</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { HerbApi } from '../services/api';
import { audio } from '../services/audioService';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  currentUser: { type: Object, default: null }
});

const emit = defineEmits(['close', 'login-success', 'logout', 'switch-to-admin']);

const activeAuthTab = ref('login'); // 'login' | 'roles' | 'matrix'
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const loginForm = ref({
  username: '',
  password: ''
});

const roleNameMap = {
  super_admin: '至高管理員',
  curator: '本草策展師',
  consultant: '本草諮詢顧問',
  auditor: '典藏觀察員',
  member: '草木學員'
};

const hasAdminAccess = computed(() => {
  if (!props.currentUser) return false;
  return ['super_admin', 'curator', 'consultant', 'auditor'].includes(props.currentUser.role);
});

// 5 大預設測試角色
const presetRoles = [
  {
    key: 'super_admin',
    name: '神農至高統籌',
    badge: '紫金御史 · 至高管理員',
    avatar: '👑',
    username: 'admin',
    password: 'taiwanherb2026',
    scope: 'all',
    scopeText: '全庫最高管理權限 (含 LLM、帳號、全庫重置)',
    description: '具備所有後台管理功能，包含 LLM API 設定、使用者權限分發與本草庫維護。'
  },
  {
    key: 'curator',
    name: '林典藏 (植物誌策展人)',
    badge: '百草掌庫 · 本草策展師',
    avatar: '📜',
    username: 'curator_lin',
    password: 'curator2026',
    scope: 'curation',
    scopeText: '本草庫維護、批次匯入、文章生成',
    description: '掌管本草植物條目新增編輯、批次 Excel/CSV 匯入驗證與專題文章實驗室。'
  },
  {
    key: 'consultant',
    name: '陳藥師 (中西整合生藥顧問)',
    badge: '懸壺仙師 · 本草諮詢顧問',
    avatar: '🍵',
    username: 'expert_chen',
    password: 'consultant2026',
    scope: 'consultation',
    scopeText: '專家 Persona 微調、RAG 提示詞設定',
    description: '負責 4 大專家 Persona 語意微調、系統提示詞調校與諮詢茶堂測試沙盒。'
  },
  {
    key: 'auditor',
    name: '王稽核 (資料安全觀察員)',
    badge: '明鏡察使 · 典藏觀察員',
    avatar: '🔍',
    username: 'auditor_wang',
    password: 'auditor2026',
    scope: 'audit_only',
    scopeText: '唯讀檢視審計日誌與統計儀表板',
    description: '僅限查閱全庫審計操作歷史與統計圖表，無法修改任何本草資料或系統配置。'
  },
  {
    key: 'member',
    name: '廖常客 (前台茶席學員)',
    badge: '問道雅客 · 草木學員',
    avatar: '🌱',
    username: 'member_liao',
    password: 'member2026',
    scope: 'frontend_only',
    scopeText: '前台一般會員 (無後台管理權限)',
    description: '前台常民文化探索、圖鑑多維檢索、茶堂請益與方劑煎煮研製。'
  }
];

const fillCreds = (u, p) => {
  loginForm.value.username = u;
  loginForm.value.password = p;
  audio.playClick();
};

const handleFormLogin = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  isSubmitting.value = true;

  try {
    const res = await HerbApi.adminLogin({
      username: loginForm.value.username.trim(),
      password: loginForm.value.password.trim()
    });

    audio.playStamp();
    successMessage.value = `歡迎「${res.user.name}」登入！角色：${roleNameMap[res.role] || res.role}`;
    emit('login-success', res);

    setTimeout(() => {
      emit('close');
    }, 900);
  } catch (err) {
    audio.playClick();
    errorMessage.value = err.message || '帳號或密碼錯誤，請重新確認';
  } finally {
    isSubmitting.value = false;
  }
};

const quickLoginRole = async (roleItem) => {
  loginForm.value.username = roleItem.username;
  loginForm.value.password = roleItem.password;
  await handleFormLogin();
};

const handleLogout = async () => {
  audio.playClick();
  await HerbApi.adminLogout();
  emit('logout');
  successMessage.value = '已安全登出！當前為訪客模式。';
  setTimeout(() => {
    emit('close');
  }, 600);
};

const enterAdmin = () => {
  emit('close');
  emit('switch-to-admin');
};
</script>

<style scoped>
.auth-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(12, 22, 16, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 99990;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: authFadeIn 0.25s ease-out;
}

@keyframes authFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.auth-modal-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  max-width: 840px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(43, 76, 59, 0.2);
  overflow: hidden;
  position: relative;
}

.auth-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-subtle);
}

.header-seal-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.auth-seal {
  width: 38px;
  height: 38px;
  background: var(--primary-deep);
  color: #fff;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: bold;
}

.auth-modal-title {
  font-family: var(--font-serif);
  font-size: 17px;
  color: var(--primary-deep);
  margin: 0;
}

.auth-modal-subtitle {
  font-size: 11px;
  color: var(--ink-muted);
  letter-spacing: 0.5px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--ink-muted);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--ink-body);
}

.auth-tab-bar {
  display: flex;
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-card);
  padding: 0 16px;
  gap: 8px;
}

.auth-tab-btn {
  background: none;
  border: none;
  padding: 12px 18px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink-muted);
  cursor: pointer;
  border-bottom: 2.5px solid transparent;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.auth-tab-btn:hover {
  color: var(--primary-deep);
}

.auth-tab-btn.active {
  color: var(--primary-deep);
  border-bottom-color: var(--primary-deep);
}

.auth-modal-body {
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 已登入橫幅 */
.current-user-banner {
  background: var(--primary-pale);
  border: 1px solid rgba(43, 76, 59, 0.2);
  border-radius: 14px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.banner-user-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.banner-avatar {
  font-size: 32px;
}

.banner-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.banner-name {
  font-size: 15px;
  color: var(--primary-deep);
}

.banner-username {
  font-size: 12px;
  color: var(--ink-muted);
}

.banner-role-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--primary-deep);
  color: #fff;
}

.banner-email {
  font-size: 12px;
  color: var(--ink-muted);
}

.banner-user-actions {
  display: flex;
  gap: 8px;
}

.btn-enter-admin {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
}

.btn-logout {
  background: none;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12.5px;
  color: var(--ink-body);
  cursor: pointer;
}

.btn-logout:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* 登入表單 */
.login-form-box {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-title span {
  font-size: 15px;
  font-weight: 700;
  color: var(--primary-deep);
}

.form-desc {
  display: block;
  font-size: 12px;
  color: var(--ink-muted);
  margin-top: 4px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-body);
}

.custom-input {
  background: var(--bg-card);
  border: 1.5px solid var(--border-light);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 14px;
  color: var(--ink-body);
  outline: none;
  transition: all 0.2s;
}

.custom-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(43, 76, 59, 0.15);
}

.btn-auth-submit {
  background: var(--primary-deep);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 11px 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 6px;
}

.btn-auth-submit:hover:not(:disabled) {
  opacity: 0.92;
}

.auth-alert-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.auth-alert-success {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #15803d;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 快速指引備忘 */
.quick-credentials-hint {
  margin-top: 8px;
}

.hint-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-deep);
  margin-bottom: 8px;
}

.hint-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 8px;
}

.hint-item {
  background: var(--bg-card);
  border: 1px dashed var(--border-light);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.hint-item:hover {
  background: var(--primary-pale);
  border-color: var(--primary);
}

.hint-click-note {
  display: block;
  font-size: 11px;
  color: var(--ink-muted);
  margin-top: 6px;
  text-align: right;
}

/* 角色卡片列表 */
.roles-picker-header h4 {
  font-size: 15px;
  color: var(--primary-deep);
  margin: 0 0 4px;
}

.roles-picker-header p {
  font-size: 12.5px;
  color: var(--ink-muted);
  margin: 0 0 16px;
}

.role-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.role-switch-card {
  background: var(--bg-card);
  border: 1.5px solid var(--border-light);
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.role-switch-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.role-switch-card.active {
  border-color: var(--primary-deep);
  background: var(--primary-pale);
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.role-icon {
  font-size: 26px;
}

.role-badge {
  font-size: 10.5px;
  padding: 2px 8px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.06);
  color: var(--ink-body);
  font-weight: 600;
}

.role-name-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--primary-deep);
}

.role-acc-info {
  font-size: 11.5px;
  color: var(--ink-muted);
}

.role-desc-text {
  font-size: 12px;
  color: var(--ink-body);
  line-height: 1.5;
  margin: 0;
  flex: 1;
}

.role-scope-pill {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--bg-subtle);
  color: var(--ink-muted);
}

.role-scope-pill.all {
  background: #fef3c7;
  color: #92400e;
  font-weight: 600;
}

.btn-role-select {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 7px;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-deep);
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.2s;
}

.role-switch-card:hover .btn-role-select {
  background: var(--primary-deep);
  color: #fff;
  border-color: var(--primary-deep);
}

/* 權限矩陣表格 */
.matrix-header h4 {
  font-size: 15px;
  color: var(--primary-deep);
  margin: 0 0 4px;
}

.matrix-header p {
  font-size: 12.5px;
  color: var(--ink-muted);
  margin: 0 0 16px;
}

.matrix-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border-light);
  border-radius: 12px;
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
  text-align: center;
}

.matrix-table th {
  background: var(--bg-subtle);
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-light);
  color: var(--primary-deep);
  font-weight: 700;
  white-space: nowrap;
}

.matrix-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-light);
  color: var(--ink-body);
}

.matrix-table td:first-child {
  text-align: left;
}

.perm-yes {
  color: #15803d;
  font-weight: 600;
}

.perm-read {
  color: #0369a1;
  font-weight: 600;
}

.perm-no {
  color: #dc2626;
  opacity: 0.6;
}
</style>
