/**
 * server/data/usersData.js
 * 系統使用者種子資料與前後台角色權限 (RBAC) 定義
 * 包含超級管理員、本草策展師、諮詢顧問、稽核觀察員與一般前台會員
 */

const ROLES = {
  super_admin: {
    key: 'super_admin',
    name: '至高管理員',
    badge: '紫金御史',
    description: '全庫最高管理權限，包含使用者帳號、LLM API 金鑰配置、全庫重置與所有業務操作',
    scope: 'all',
    permissions: [
      'users:manage',
      'llm:manage',
      'herbs:write',
      'experts:write',
      'import:write',
      'export:read',
      'articles:write',
      'audit:read',
      'system:reset'
    ]
  },
  curator: {
    key: 'curator',
    name: '本草策展師',
    badge: '百草掌庫',
    description: '負責本草典藏資料庫之維護、資料批次匯入/線上編輯、匯出以及本草專題文章生成',
    scope: 'curation',
    permissions: [
      'herbs:write',
      'import:write',
      'export:read',
      'articles:write',
      'audit:read'
    ]
  },
  consultant: {
    key: 'consultant',
    name: '本草諮詢顧問',
    badge: '懸壺仙師',
    description: '負責專家 Persona 語意微調、RAG 提示詞設定、諮詢沙盒測試與專題文章審閱',
    scope: 'consultation',
    permissions: [
      'experts:write',
      'articles:write',
      'audit:read'
    ]
  },
  auditor: {
    key: 'auditor',
    name: '典藏觀察員',
    badge: '明鏡察使',
    description: '唯讀檢視權限，可查閱審計日誌、統計分析報表與本草全庫，無資料修改與配置權限',
    scope: 'audit_only',
    permissions: [
      'herbs:read',
      'export:read',
      'audit:read',
      'stats:read'
    ]
  },
  member: {
    key: 'member',
    name: '草木學員',
    badge: '問道雅客',
    description: '前台一般會員，可檢索圖鑑、地圖探索、使用諮詢茶堂與方劑研製，無後台權限',
    scope: 'frontend_only',
    permissions: [
      'frontend:all'
    ]
  }
};

const INITIAL_USERS = [
  {
    id: 'usr_admin_01',
    username: 'admin',
    name: '神農至高統籌',
    password: process.env.ADMIN_PASSWORD || 'taiwanherb2026',
    role: 'super_admin',
    email: 'admin@taiwanherb.org',
    status: 'active',
    avatar: '👑',
    createdAt: '2026-01-01T08:00:00.000Z',
    lastLoginAt: '2026-10-11T10:00:00.000Z'
  },
  {
    id: 'usr_curator_02',
    username: 'curator_lin',
    name: '林典藏 (植物誌策展人)',
    password: 'curator2026',
    role: 'curator',
    email: 'curator@taiwanherb.org',
    status: 'active',
    avatar: '📜',
    createdAt: '2026-02-15T09:30:00.000Z',
    lastLoginAt: '2026-10-10T14:20:00.000Z'
  },
  {
    id: 'usr_consultant_03',
    username: 'expert_chen',
    name: '陳藥師 (中西整合生藥顧問)',
    password: 'consultant2026',
    role: 'consultant',
    email: 'expert@taiwanherb.org',
    status: 'active',
    avatar: '🍵',
    createdAt: '2026-03-01T11:00:00.000Z',
    lastLoginAt: '2026-10-09T16:45:00.000Z'
  },
  {
    id: 'usr_auditor_04',
    username: 'auditor_wang',
    name: '王稽核 (資料安全觀察員)',
    password: 'auditor2026',
    role: 'auditor',
    email: 'auditor@taiwanherb.org',
    status: 'active',
    avatar: '🔍',
    createdAt: '2026-04-10T14:15:00.000Z',
    lastLoginAt: '2026-10-08T09:10:00.000Z'
  },
  {
    id: 'usr_member_05',
    username: 'member_liao',
    name: '廖常客 (前台茶席學員)',
    password: 'member2026',
    role: 'member',
    email: 'member@taiwanherb.org',
    status: 'active',
    avatar: '🌱',
    createdAt: '2026-05-20T16:00:00.000Z',
    lastLoginAt: '2026-10-11T08:00:00.000Z'
  }
];

module.exports = {
  ROLES,
  INITIAL_USERS
};
