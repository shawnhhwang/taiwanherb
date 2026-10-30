/**
 * server/config/persistence.js
 * 輕量高可靠本機檔案持久化儲存層 (File-based Persistence Engine)
 * 確保在無需外部 MySQL 的情況下，所有草藥、書籍、訂單、老舖資料在重啟或容器更新後完整保留
 */
const fs = require('fs');
const path = require('path');

class PersistenceEngine {
  constructor() {
    this.dataDir = process.env.DATA_DIR || path.resolve(__dirname, '../../data');
    this.saveTimers = new Map();
    this.ensureDataDir();
  }

  ensureDataDir() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
    } catch (err) {
      console.warn(`[Persistence] 無法建立持久化目錄 ${this.dataDir}:`, err.message);
    }
  }

  /**
   * 載入集合資料 (若無持久化檔案則回傳 fallbackData 並建立之)
   */
  load(collectionName, fallbackData) {
    this.ensureDataDir();
    const filePath = path.join(this.dataDir, `${collectionName}.json`);

    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn(`[Persistence] 讀取 ${collectionName}.json 失敗，改用預設種子資料:`, err.message);
    }

    // 儲存種子資料至磁碟
    this.save(collectionName, fallbackData);
    return JSON.parse(JSON.stringify(fallbackData));
  }

  /**
   * 同步儲存至磁碟
   */
  save(collectionName, data) {
    this.ensureDataDir();
    const filePath = path.join(this.dataDir, `${collectionName}.json`);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error(`[Persistence] 儲存 ${collectionName}.json 失敗:`, err.message);
    }
  }

  /**
   * 防抖異步排程儲存 (避免高頻併發 I/O 造成 Event Loop 尖峰)
   */
  debounceSave(collectionName, data, delayMs = 300) {
    if (this.saveTimers.has(collectionName)) {
      clearTimeout(this.saveTimers.get(collectionName));
    }

    const timer = setTimeout(() => {
      this.saveTimers.delete(collectionName);
      this.save(collectionName, data);
    }, delayMs);

    this.saveTimers.set(collectionName, timer);
  }
}

module.exports = new PersistenceEngine();
