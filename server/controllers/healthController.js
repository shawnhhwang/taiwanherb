/**
 * server/controllers/healthController.js
 * 系統健康狀態與 Failover 節點監控
 */
const dbFactory = require('../config/dbFactory');
const ApiResponse = require('../utils/apiResponse');

class HealthController {
  async getHealth(req, res) {
    const dbStatus = dbFactory.getStatus();
    const uptimeSeconds = Math.floor(process.uptime());

    const healthData = {
      status: 'UP',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptimeSeconds / 60)} 分 ${uptimeSeconds % 60} 秒`,
      uptimeSeconds,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      memoryUsage: {
        rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`
      },
      database: dbStatus
    };

    return res.json(ApiResponse.ok(healthData, '系統運行正常'));
  }

  /**
   * 手動觸發測試 Failover 演練 (供測試與運維使用)
   */
  async simulateFailover(req, res) {
    const reason = req.body.reason || '手動演練故障轉移';
    await dbFactory.triggerFailover(reason);
    return res.json(ApiResponse.ok(dbFactory.getStatus(), '已成功觸發 Failover 節點切換'));
  }
}

module.exports = new HealthController();
