/**
 * server/services/userService.js
 * 前後台使用者與角色權限 (RBAC) 服務層
 */
const { ROLES, INITIAL_USERS } = require('../data/usersData');

class UserService {
  constructor() {
    this.roles = { ...ROLES };
    // 使用記憶體深拷貝維護使用者狀態
    this.users = JSON.parse(JSON.stringify(INITIAL_USERS));
    // 活躍 Sessions 映射表 (token -> user)
    this.sessions = new Map();

    // 預設將既有相容 Token 綁定至 super_admin
    const defaultAdmin = this.users.find(u => u.username === 'admin');
    if (defaultAdmin) {
      this.sessions.set('taiwanherb-admin-session-active', {
        user: defaultAdmin,
        token: 'taiwanherb-admin-session-active',
        createdAt: new Date().toISOString()
      });
    }
  }

  /**
   * 取得可用角色定義清單
   */
  getRoles() {
    return Object.values(this.roles);
  }

  /**
   * 取得單一角色資訊
   */
  getRole(roleKey) {
    return this.roles[roleKey] || null;
  }

  /**
   * 取得所有使用者列表 (安全過濾敏感密碼)
   */
  getUsers() {
    return this.users.map(u => this.sanitizeUser(u));
  }

  /**
   * 根據 ID 取得使用者
   */
  getUserById(id) {
    const user = this.users.find(u => u.id === id);
    return user ? this.sanitizeUser(user) : null;
  }

  /**
   * 根據帳號尋找使用者 (內部用，包含密碼)
   */
  findByUsername(username) {
    return this.users.find(u => u.username === username);
  }

  /**
   * 登入驗證
   * 支援兩種模式：
   * 1. 雙欄位: { username, password }
   * 2. 單欄位相容模式: { password } (預設以 admin 帳號進行比對)
   */
  authenticate({ username, password }) {
    if (!password) {
      throw new Error('請提供登入密碼');
    }

    let targetUser = null;

    if (username) {
      targetUser = this.findByUsername(username);
      if (!targetUser) {
        throw new Error(`找不到使用者帳號「${username}」`);
      }
      if (targetUser.password !== password) {
        throw new Error('登入密碼不正確，請重新檢查');
      }
    } else {
      // 舊版單密碼登入相容邏輯：尋找密碼相符的後台使用者
      targetUser = this.users.find(u => u.password === password);
      if (!targetUser) {
        throw new Error('管理通行碼不正確，請重新檢查');
      }
    }

    if (targetUser.status !== 'active') {
      throw new Error('該使用者帳號目前處於停用狀態，請聯絡至高管理員');
    }

    // 更新最後登入時間
    targetUser.lastLoginAt = new Date().toISOString();

    // 簽發 Session Token
    const token = `herb_session_${targetUser.username}_${Date.now()}`;
    const sanitized = this.sanitizeUser(targetUser);

    this.sessions.set(token, {
      user: sanitized,
      token,
      createdAt: new Date().toISOString()
    });

    return {
      token,
      user: sanitized,
      role: this.getRole(targetUser.role),
      permissions: this.getRole(targetUser.role)?.permissions || []
    };
  }

  /**
   * 驗證請求 Token 並取得當前使用者與權限
   */
  verifyToken(token) {
    if (!token) return null;

    // 清理 Bearer 前綴
    const cleanToken = token.replace(/^Bearer\s+/i, '').trim();

    // 檢查舊版相容 Token
    if (cleanToken === 'taiwanherb-admin-session-active') {
      const admin = this.users.find(u => u.username === 'admin');
      if (admin) {
        return {
          user: this.sanitizeUser(admin),
          role: this.getRole(admin.role),
          permissions: this.getRole(admin.role)?.permissions || []
        };
      }
    }

    const session = this.sessions.get(cleanToken);
    if (!session) return null;

    const role = this.getRole(session.user.role);
    return {
      user: session.user,
      role,
      permissions: role ? role.permissions : []
    };
  }

  /**
   * 登出
   */
  logout(token) {
    if (!token) return true;
    const cleanToken = token.replace(/^Bearer\s+/i, '').trim();
    return this.sessions.delete(cleanToken);
  }

  /**
   * 檢查角色是否具備特定權限
   */
  hasPermission(roleKey, action) {
    const role = this.getRole(roleKey);
    if (!role) return false;
    if (role.permissions.includes('all') || role.key === 'super_admin') return true;
    return role.permissions.includes(action);
  }

  /**
   * 新增使用者 (僅限 super_admin)
   */
  createUser(userData) {
    const { username, name, password, role = 'curator', email } = userData;

    if (!username || !password || !name) {
      throw new Error('帳號 (username)、名稱 (name) 與密碼 (password) 為必填欄位');
    }

    if (this.findByUsername(username)) {
      throw new Error(`使用者帳號「${username}」已存在，請使用不同帳號`);
    }

    if (!this.roles[role]) {
      throw new Error(`無效的角色類型「${role}」`);
    }

    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      username,
      name,
      password,
      role,
      email: email || `${username}@taiwanherb.org`,
      status: 'active',
      avatar: this.getRoleAvatar(role),
      createdAt: new Date().toISOString(),
      lastLoginAt: null
    };

    this.users.unshift(newUser);
    return this.sanitizeUser(newUser);
  }

  /**
   * 更新使用者資訊與角色 (僅限 super_admin)
   */
  updateUser(id, updateData) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error(`找不到 ID 為 ${id} 的使用者`);
    }

    const current = this.users[index];

    // 若修改密碼，僅在有傳入且非空時更新
    const password = updateData.password && updateData.password.trim() !== ''
      ? updateData.password
      : current.password;

    const updated = {
      ...current,
      name: updateData.name !== undefined ? updateData.name : current.name,
      role: updateData.role && this.roles[updateData.role] ? updateData.role : current.role,
      email: updateData.email !== undefined ? updateData.email : current.email,
      status: updateData.status !== undefined ? updateData.status : current.status,
      avatar: updateData.avatar || current.avatar,
      password
    };

    this.users[index] = updated;

    // 同步更新 active session
    for (const [token, session] of this.sessions.entries()) {
      if (session.user.id === id) {
        session.user = this.sanitizeUser(updated);
      }
    }

    return this.sanitizeUser(updated);
  }

  /**
   * 刪除使用者 (僅限 super_admin，不可刪除主要 admin)
   */
  deleteUser(id) {
    const target = this.users.find(u => u.id === id);
    if (!target) {
      throw new Error(`找不到 ID 為 ${id} 的使用者`);
    }

    if (target.username === 'admin') {
      throw new Error('至高管理員 admin 為系統核心帳號，禁止刪除');
    }

    this.users = this.users.filter(u => u.id !== id);

    // 清理 session
    for (const [token, session] of this.sessions.entries()) {
      if (session.user.id === id) {
        this.sessions.delete(token);
      }
    }

    return true;
  }

  /**
   * 重設為初始種子使用者
   */
  resetUsers() {
    this.users = JSON.parse(JSON.stringify(INITIAL_USERS));
    return this.users.length;
  }

  /**
   * 安全過濾使用者敏感資訊
   */
  sanitizeUser(user) {
    const roleInfo = this.getRole(user.role);
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      roleName: roleInfo ? roleInfo.name : user.role,
      roleBadge: roleInfo ? roleInfo.badge : '官',
      email: user.email,
      status: user.status,
      avatar: user.avatar,
      scope: roleInfo ? roleInfo.scope : 'frontend_only',
      permissions: roleInfo ? roleInfo.permissions : [],
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt
    };
  }

  getRoleAvatar(role) {
    const avatars = {
      super_admin: '👑',
      curator: '📜',
      consultant: '🍵',
      auditor: '🔍',
      member: '🌱'
    };
    return avatars[role] || '👤';
  }
}

module.exports = new UserService();
