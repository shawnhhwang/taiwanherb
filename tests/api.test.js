/**
 * tests/api.test.js
 * 驗證後端 API 端點、ApiResponse 規格、搜尋與 Failover
 */
const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../server/app');
const dbFactory = require('../server/config/dbFactory');

let server;
let baseUrl;

before(async () => {
  await new Promise(resolve => {
    server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise(resolve => server.close(resolve));
});

// 輔助函式：發送 HTTP 請求
async function fetchJson(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, options);
  const json = await response.json();
  return { status: response.status, body: json };
}

describe('🌱 台灣本草 Wiki API 測試套件', () => {
  test('GET /api/health - 應回傳健康狀態與資料庫 Failover 狀態', async () => {
    const { status, body } = await fetchJson('/api/health');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(body.data.status, 'UP');
    assert.ok(body.data.database);
    assert.equal(typeof body.data.database.failoverCount, 'number');
  });

  test('GET /api/herbs - 應回傳藥材清單及分頁資訊', async () => {
    const { status, body } = await fetchJson('/api/herbs');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data));
    assert.ok(body.data.length > 0);
    assert.ok(body.meta);
    assert.equal(body.meta.page, 1);
    assert.ok(body.meta.total >= 16);

    // 檢驗 HerbSummaryDto 結構
    const first = body.data[0];
    assert.ok(first.id);
    assert.ok(first.name);
    assert.ok(first.category);
    assert.ok(Array.isArray(first.channels));
    assert.ok(first.nature);
  });

  test('GET /api/herbs?q=薄荷 - 模糊搜尋應正確篩選', async () => {
    const { status, body } = await fetchJson('/api/herbs?q=' + encodeURIComponent('薄荷'));
    assert.equal(status, 200);
    assert.equal(body.success, true);
    const hasMint = body.data.some(h => h.name.includes('薄荷'));
    assert.ok(hasMint);
  });

  test('GET /api/herbs?nature=溫 - 藥性篩選應正確生效', async () => {
    const { status, body } = await fetchJson('/api/herbs?nature=' + encodeURIComponent('溫'));
    assert.equal(status, 200);
    assert.equal(body.success, true);
    body.data.forEach(h => {
      assert.equal(h.nature, '溫');
    });
  });

  test('GET /api/herbs?channel=肺 - 歸經篩選應正確生效', async () => {
    const { status, body } = await fetchJson('/api/herbs?channel=' + encodeURIComponent('肺'));
    assert.equal(status, 200);
    assert.equal(body.success, true);
    body.data.forEach(h => {
      assert.ok(h.channels.includes('肺'));
    });
  });

  test('GET /api/herbs/:id - 取得單一藥材詳情與關聯推薦', async () => {
    const { status, body } = await fetchJson('/api/herbs/1');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(body.data.id, 1);
    assert.equal(body.data.name, '大花咸豐草');
    assert.ok(body.data.efficacy);
    assert.ok(body.data.contraindications);
    assert.ok(Array.isArray(body.data.relatedHerbs));
  });

  test('GET /api/herbs/99999 - 不存在藥材應回傳 404', async () => {
    const { status, body } = await fetchJson('/api/herbs/99999');
    assert.equal(status, 404);
    assert.equal(body.success, false);
    assert.equal(body.errorCode, 404);
  });

  test('GET /api/categories - 應回傳分類統計清單', async () => {
    const { status, body } = await fetchJson('/api/categories');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data));
    const teaCategory = body.data.find(c => c.name === '台灣青草茶經典');
    assert.ok(teaCategory);
    assert.ok(teaCategory.count > 0);
  });

  test('GET /api/channels - 應回傳歸經統計', async () => {
    const { status, body } = await fetchJson('/api/channels');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data));
  });

  test('GET / - 應正確提供 Vue 3 單頁前端靜態頁面', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('<div id="app"></div>'));
    assert.ok(html.includes('台灣本草植物誌'));
  });

  test('GET /herb/1 - 非 API 路由應退避提供 Vue 3 SPA index.html', async () => {
    const res = await fetch(`${baseUrl}/herb/1`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('<div id="app"></div>'));
  });
});

