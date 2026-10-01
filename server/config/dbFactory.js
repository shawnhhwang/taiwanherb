/**
 * server/config/dbFactory.js
 * 負責資料庫連線池與 Primary / Secondary 自動故障轉移 (Failover)
 */
const EventEmitter = require('events');
const initialHerbs = require('../data/herbsData');

class DbFactory extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.activeNode = 'primary'; // 'primary' | 'secondary' | 'in-memory'
    this.failoverCount = 0;
    this.lastFailoverTime = null;
    this.isMemoryMode = true; // 預設使用內存種子資料，無須額外依賴即可執行
    this.memoryData = JSON.parse(JSON.stringify(initialHerbs));
    this.pool = null;

    // 嘗試初始化 MySQL 連線 (若環境有設定 DB_PRIMARY_HOST 且非預設值)
    this.initDatabase();
  }

  async initDatabase() {
    if (process.env.USE_MYSQL === 'true') {
      try {
        const mysql = require('mysql2/promise');
        this.mysql = mysql;
        await this.connectNode('primary');
      } catch (err) {
        console.warn('⚠️ [DbFactory] MySQL 連線未就緒或未安裝 mysql2，啟用內建高可靠記憶體資料庫模式。');
        this.isMemoryMode = true;
        this.activeNode = 'in-memory';
      }
    } else {
      this.isMemoryMode = true;
      this.activeNode = 'in-memory';
    }
  }

  async connectNode(nodeName) {
    const nodeConfig = nodeName === 'primary' ? this.config.primary : this.config.secondary;
    try {
      if (this.pool) {
        await this.pool.end().catch(() => {});
      }
      this.pool = this.mysql.createPool(nodeConfig);
      await this.pool.query('SELECT 1');
      this.activeNode = nodeName;
      this.isMemoryMode = false;
      this.emit('nodeChanged', { node: nodeName, status: 'connected' });
      return true;
    } catch (err) {
      console.error(`❌ [DbFactory] 無法連線至 ${nodeName} 節點:`, err.message);
      return false;
    }
  }

  /**
   * 觸發故障轉移 (Failover)
   */
  async triggerFailover(reason = 'Connection lost') {
    this.failoverCount++;
    this.lastFailoverTime = new Date().toISOString();
    const previousNode = this.activeNode;

    if (this.isMemoryMode) {
      this.emit('failover', {
        from: previousNode,
        to: 'in-memory',
        count: this.failoverCount,
        reason
      });
      return;
    }

    const nextNode = this.activeNode === 'primary' ? 'secondary' : 'primary';
    console.warn(`🔄 [DbFactory] 觸發故障轉移: ${previousNode} -> ${nextNode}, 原因: ${reason}`);

    const success = await this.connectNode(nextNode);
    if (!success) {
      console.warn(`⚠️ [DbFactory] 次節點連線亦失敗，安全降級至 In-Memory 唯讀/讀寫模式。`);
      this.isMemoryMode = true;
      this.activeNode = 'in-memory';
    }

    this.emit('failover', {
      from: previousNode,
      to: this.activeNode,
      count: this.failoverCount,
      reason
    });
  }

  /**
   * 取得目前狀態
   */
  getStatus() {
    return {
      connected: true,
      activeNode: this.activeNode,
      isMemoryMode: this.isMemoryMode,
      failoverCount: this.failoverCount,
      lastFailoverTime: this.lastFailoverTime,
      totalRecords: this.memoryData.length,
      modeDescription: this.isMemoryMode 
        ? '內建高效記憶體儲存庫 (即開即用，支援增刪查改)' 
        : `MySQL 主從叢集 (${this.activeNode.toUpperCase()} 運行中)`
    };
  }

  /**
   * 取得內存資料參考 (供 Repository 使用)
   */
  getMemoryStore() {
    return this.memoryData;
  }
}

// 單例模式導出
const config = require('./config');
const dbFactory = new DbFactory(config.database);

module.exports = dbFactory;
