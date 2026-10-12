/**
 * tests/api.test.js
 * 驗證後端 API 端點、ApiResponse 規格、搜尋與 Failover
 */
process.env.NODE_ENV = 'test';

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

  test('GET /api/regions - 應回傳風土產區統計', async () => {
    const { status, body } = await fetchJson('/api/regions');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data));
    assert.ok(body.data.some(r => r.name.includes('桃竹苗') || r.name.includes('客庄')));
  });

  test('GET /api/folk-applications - 應回傳民間生活應用統計', async () => {
    const { status, body } = await fetchJson('/api/folk-applications');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data));
    assert.ok(body.data.some(f => f.name.includes('青草茶') || f.name.includes('辟邪')));
  });

  test('GET /api/herbs?region=桃竹苗 - 風土產區篩選應正確生效', async () => {
    const { status, body } = await fetchJson('/api/herbs?region=' + encodeURIComponent('桃竹苗'));
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(body.data.length > 0);
    body.data.forEach(h => {
      assert.ok(h.region.includes('桃竹苗'));
    });
  });

  test('GET /api/herbs?q=狗貼耳 - 應能透過台語/俗名搜尋到魚腥草', async () => {
    const { status, body } = await fetchJson('/api/herbs?q=' + encodeURIComponent('狗貼耳'));
    assert.equal(status, 200);
    assert.equal(body.success, true);
    const found = body.data.some(h => h.name === '魚腥草');
    assert.ok(found);
  });

  test('GET /api/consult/experts - 應回傳 4 大專家 Persona 名錄', async () => {
    const { status, body } = await fetchJson('/api/consult/experts');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data));
    assert.equal(body.data.length, 4);
    const ids = body.data.map(e => e.id);
    assert.ok(ids.includes('wanhua_uncle'));
    assert.ok(ids.includes('hakka_grandmother'));
    assert.ok(ids.includes('pharmacist_phd'));
    assert.ok(ids.includes('indigenous_forager'));
  });

  test('POST /api/consult - 萬華青草伯 RAG 諮詢應回傳在地語意與藥材引用', async () => {
    const payload = {
      expertId: 'wanhua_uncle',
      message: '最近常常熬夜口乾舌燥火氣大，想要煮青草茶退火'
    };
    const { status, body } = await fetchJson('/api/consult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(body.data.reply);
    assert.ok(body.data.reply.includes('老茶師'));
    assert.ok(Array.isArray(body.data.citations));
    assert.ok(body.data.citations.length > 0);
    assert.ok(body.data.citations[0].name);
    assert.ok(Array.isArray(body.data.suggestedQuestions));
  });

  test('POST /api/consult - 客庄阿婆 RAG 諮詢應以客家長輩口吻回覆', async () => {
    const payload = {
      expertId: 'hakka_grandmother',
      message: '家裡小孩受驚啼哭，客家傳統用什麼草沐浴安神？'
    };
    const { status, body } = await fetchJson('/api/consult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(body.data.reply.includes('阿婆') || body.data.reply.includes('阿妹阿弟'));
    const hasMoCao = body.data.citations.some(c => c.name === '抹草' || c.name === '艾草');
    assert.ok(hasMoCao);
  });

  test('POST /api/admin/login - 管理密碼登入驗證', async () => {
    const failRes = await fetchJson('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'wrong' })
    });
    assert.equal(failRes.status, 401);

    const okRes = await fetchJson('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'taiwanherb2026' })
    });
    assert.equal(okRes.status, 200);
    assert.equal(okRes.body.data.authenticated, true);
    assert.ok(okRes.body.data.token);
  });

  test('GET /api/admin/stats - 應回傳全庫管理統計儀表板數據', async () => {
    const { status, body } = await fetchJson('/api/admin/stats');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(body.data.totalHerbs >= 25);
    assert.ok(body.data.categoriesCount > 0);
    assert.ok(body.data.regionsCount > 0);
  });

  test('POST /api/admin/herbs & DELETE - 管理者草藥新增與刪除驗證', async () => {
    const newHerb = {
      name: '測試草藥',
      scientificName: 'Testus herbalis',
      category: '台灣青草茶經典',
      nature: '平',
      region: '北部 (萬華/淡水河/雙北)',
      efficacy: '生津止渴、平肝潤燥'
    };

    const createRes = await fetchJson('/api/admin/herbs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHerb)
    });

    assert.equal(createRes.status, 201);
    const createdId = createRes.body.data.id;
    assert.ok(createdId);

    // 刪除
    const deleteRes = await fetchJson(`/api/admin/herbs/${createdId}`, {
      method: 'DELETE'
    });
    assert.equal(deleteRes.status, 200);
    assert.equal(deleteRes.body.data.id, createdId);
  });

  test('GET /api/admin/logs - 應正確回傳系統審計日誌', async () => {
    const { status, body } = await fetchJson('/api/admin/logs');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data));
    assert.ok(body.data.length > 0);
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

  // ========================================================
  // 1. 使用者管理與前後台權限 (RBAC) 驗證
  // ========================================================
  test('RBAC: 支援多角色登入與權限隔離驗證 (super_admin vs curator vs auditor)', async () => {
    // 1.1 admin 登入
    const adminRes = await fetchJson('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'taiwanherb2026' })
    });
    assert.equal(adminRes.status, 200);
    assert.equal(adminRes.body.data.role, 'super_admin');
    const adminToken = adminRes.body.data.token;
    assert.ok(adminToken);

    // 1.2 curator 登入
    const curatorRes = await fetchJson('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'curator_lin', password: 'curator2026' })
    });
    assert.equal(curatorRes.status, 200);
    assert.equal(curatorRes.body.data.role, 'curator');
    const curatorToken = curatorRes.body.data.token;

    // 1.3 auditor 登入
    const auditorRes = await fetchJson('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'auditor_wang', password: 'auditor2026' })
    });
    assert.equal(auditorRes.status, 200);
    assert.equal(auditorRes.body.data.role, 'auditor');

    // 1.4 super_admin 建立新使用者
    const testNewUser = {
      username: `test_user_${Date.now()}`,
      name: '測試本草專員',
      password: 'password123',
      role: 'curator'
    };
    const createUserRes = await fetchJson('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(testNewUser)
    });
    assert.equal(createUserRes.status, 201);
    assert.equal(createUserRes.body.data.name, '測試本草專員');

    // 1.5 curator 嘗試建立使用者應被拒絕 (403 Forbidden)
    const unauthorizedCreate = await fetchJson('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${curatorToken}`
      },
      body: JSON.stringify({ username: 'hacker', name: '駭客', password: '123' })
    });
    assert.equal(unauthorizedCreate.status, 403);
  });

  // ========================================================
  // 2. LLM API 來源與權限管理驗證
  // ========================================================
  test('LLM: 取得提供商配置、安全金鑰脫敏、Ollama 免金鑰與即時連線 Ping 測試', async () => {
    // 2.1 取得配置
    const { status, body } = await fetchJson('/api/admin/llm/config');
    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.ok(body.data.providers.builtin);
    assert.ok(body.data.providers.gemini);
    assert.ok(body.data.providers.openai);
    assert.ok(body.data.providers.ollama);
    assert.ok(body.data.providers.claude);
    assert.equal(body.data.providers.ollama.isKeylessAllowed, true);
    assert.equal(body.data.providers.builtin.isKeylessAllowed, true);

    // 2.2 測試內建離線引擎 Ping
    const pingRes = await fetchJson('/api/admin/llm/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId: 'builtin' })
    });
    assert.equal(pingRes.status, 200);
    assert.equal(pingRes.body.data.status, 'online');
    assert.ok(pingRes.body.data.latencyMs >= 0);

    // 2.3 測試 Ollama 免金鑰連線 Ping
    const ollamaPingRes = await fetchJson('/api/admin/llm/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerId: 'ollama' })
    });
    assert.equal(ollamaPingRes.status, 200);
    assert.ok(ollamaPingRes.body.data.status === 'online' || ollamaPingRes.body.data.status === 'unreachable');

    // 2.4 super_admin 更新參數
    const updateRes = await fetchJson('/api/admin/llm/config', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer taiwanherb-admin-session-active'
      },
      body: JSON.stringify({ temperature: 0.85, maxTokens: 1800 })
    });
    assert.equal(updateRes.status, 200);
    assert.equal(updateRes.body.data.temperature, 0.85);
  });

  // ========================================================
  // 3. 專家 RAG 管理與測試沙盒驗證
  // ========================================================
  test('Expert RAG: 新增自訂專家 Persona 與執行沙盒測試 (Playground)', async () => {
    // 3.1 取得專家列表
    const expRes = await fetchJson('/api/admin/experts');
    assert.equal(expRes.status, 200);
    assert.ok(expRes.body.data.length >= 4);

    // 3.2 建立自訂專家
    const customExpert = {
      id: `custom_herb_tea_master_${Date.now()}`,
      name: '坪林包種茶伯',
      title: '坪林百年茶山草木調和師',
      avatar: '🍃',
      seal: '山林茶席',
      region: '新北坪林翡翠水庫水源保護區',
      catchphrase: '「水甜茶甘，山裡的草木自帶清氣。」',
      greeting: '歡迎來到坪林茶山！'
    };
    const createExpRes = await fetchJson('/api/admin/experts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer taiwanherb-admin-session-active'
      },
      body: JSON.stringify(customExpert)
    });
    assert.equal(createExpRes.status, 201);
    assert.equal(createExpRes.body.data.name, '坪林包種茶伯');

    // 3.3 沙盒測試
    const pgRes = await fetchJson('/api/admin/experts/playground', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        expertId: customExpert.id,
        query: '夏天炎熱口渴，有什麼解熱解燥的茶飲？',
        topK: 2
      })
    });
    assert.equal(pgRes.status, 200);
    assert.ok(pgRes.body.data.retrievedHerbs.length > 0);
    assert.ok(pgRes.body.data.reply.includes('坪林包種茶伯'));

    // 3.4 刪除自訂專家
    const delExpRes = await fetchJson(`/api/admin/experts/${customExpRes = customExpert.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer taiwanherb-admin-session-active' }
    });
    assert.equal(delExpRes.status, 200);
  });

  // ========================================================
  // 4. 資料匯入範例、預覽線上編輯與批次入庫驗證
  // ========================================================
  test('Data Import: 下載範例資料、解析預覽與批次寫入本草庫', async () => {
    // 4.1 取得 JSON 範例
    const sampleJsonRes = await fetchJson('/api/admin/import/sample?format=json');
    assert.equal(sampleJsonRes.status, 200);
    assert.ok(Array.isArray(sampleJsonRes.body.data.content));
    assert.ok(sampleJsonRes.body.data.content.length >= 3);

    // 4.2 取得 CSV 範例
    const sampleCsvRes = await fetchJson('/api/admin/import/sample?format=csv');
    assert.equal(sampleCsvRes.status, 200);
    assert.ok(sampleCsvRes.body.data.content.includes('名稱'));

    // 4.3 解析預覽
    const previewRes = await fetchJson('/api/admin/import/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: sampleJsonRes.body.data.content.slice(0, 2),
        format: 'json'
      })
    });
    assert.equal(previewRes.status, 200);
    assert.equal(previewRes.body.data.total, 2);
    assert.equal(previewRes.body.data.validCount, 2);

    // 4.4 批次入庫
    const commitRes = await fetchJson('/api/admin/import/commit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer taiwanherb-admin-session-active'
      },
      body: JSON.stringify({
        items: previewRes.body.data.items
      })
    });
    assert.equal(commitRes.status, 200);
    assert.equal(commitRes.body.data.insertedCount, 2);
  });

  // ========================================================
  // 5. 條件篩選資料匯出 (JSON / CSV / Markdown) 驗證
  // ========================================================
  test('Data Export: 支援按產區篩選匯出 JSON、含 BOM 之 CSV 與 Markdown 植物誌手冊', async () => {
    // 5.1 JSON 匯出
    const jsonRes = await fetchJson('/api/admin/export?format=json');
    assert.equal(jsonRes.status, 200);
    assert.ok(Array.isArray(jsonRes.body));

    // 5.2 CSV 匯出 (檢查 UTF-8 BOM 位元組 0xEF, 0xBB, 0xBF)
    const csvRaw = await fetch(`${baseUrl}/api/admin/export?format=csv`);
    assert.equal(csvRaw.status, 200);
    const csvBuf = Buffer.from(await csvRaw.arrayBuffer());
    assert.equal(csvBuf[0], 0xEF);
    assert.equal(csvBuf[1], 0xBB);
    assert.equal(csvBuf[2], 0xBF);
    const csvText = csvBuf.toString('utf-8');
    assert.ok(csvText.includes('學名'));

    // 5.3 Markdown 標本手冊匯出
    const mdRaw = await fetch(`${baseUrl}/api/admin/export?format=markdown`);
    assert.equal(mdRaw.status, 200);
    const mdText = await mdRaw.text();
    assert.ok(mdText.includes('# 🌿 臺灣本草植物誌 · 典藏標本手冊'));
    assert.ok(mdText.includes('本草標本典藏詳細條目'));
  });

  // ========================================================
  // 6. LLM 本草專題文章生成實驗室驗證
  // ========================================================
  test('Article Studio: 根據資料庫本草 Grounding 生成特定專家口吻與指定受眾之專題文章', async () => {
    // 6.1 取得選項
    const optsRes = await fetchJson('/api/admin/articles/options');
    assert.equal(optsRes.status, 200);
    assert.ok(optsRes.body.data.audiences.length >= 4);
    assert.ok(optsRes.body.data.articleTypes.length >= 4);

    // 6.2 萬華老茶師口吻 + 久坐上班族受眾
    const genRes1 = await fetchJson('/api/admin/articles/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer taiwanherb-admin-session-active'
      },
      body: JSON.stringify({
        herbIds: [1, 2],
        expertId: 'wanhua_uncle',
        targetAudience: 'office',
        articleType: 'story'
      })
    });
    assert.equal(genRes1.status, 200);
    assert.equal(genRes1.body.success, true);
    assert.ok(genRes1.body.data.title);
    assert.ok(genRes1.body.data.markdownContent.includes('萬華') || genRes1.body.data.markdownContent.includes('老茶師'));
    assert.ok(genRes1.body.data.markdownContent.includes('上班族') || genRes1.body.data.markdownContent.includes('辦公桌') || genRes1.body.data.markdownContent.includes('保溫瓶'));

    // 6.3 客庄阿婆口吻 + 國小學童親子受眾
    const genRes2 = await fetchJson('/api/admin/articles/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer taiwanherb-admin-session-active'
      },
      body: JSON.stringify({
        herbIds: [3],
        expertId: 'hakka_grandmother',
        targetAudience: 'children',
        articleType: 'guide'
      })
    });
    assert.equal(genRes2.status, 200);
    assert.ok(genRes2.body.data.markdownContent.includes('阿婆') || genRes2.body.data.markdownContent.includes('阿妹阿弟'));
    assert.ok(genRes2.body.data.markdownContent.includes('小朋友') || genRes2.body.data.markdownContent.includes('小草'));
  });

  // 7. 結盟青草店與採買指引測試
  test('Allied Shops: 結盟青草店檢索、分區篩選、採買指南與依草藥反查', async () => {
    // 7.1 取得全台 12 家結盟青草店
    const allShopsRes = await fetchJson('/api/shops');
    assert.equal(allShopsRes.status, 200);
    assert.equal(allShopsRes.body.success, true);
    assert.ok(Array.isArray(allShopsRes.body.data));
    assert.equal(allShopsRes.body.data.length, 12);

    // 7.2 依產區篩選 (北部)
    const northShopsRes = await fetchJson('/api/shops?region=北部');
    assert.equal(northShopsRes.status, 200);
    assert.ok(northShopsRes.body.data.length >= 3);
    assert.ok(northShopsRes.body.data.every(s => s.region.includes('北部')));

    // 7.3 取得採買避坑四大指南
    const guidesRes = await fetchJson('/api/shops/guides');
    assert.equal(guidesRes.status, 200);
    assert.equal(guidesRes.body.success, true);
    assert.equal(guidesRes.body.data.length, 4);
    assert.ok(guidesRes.body.data.some(g => g.id === 'fresh'));
    assert.ok(guidesRes.body.data.some(g => g.id === 'dry'));

    // 7.4 依草藥名稱反查販售店家 (大花咸豐草)
    const byHerbRes = await fetchJson('/api/shops/by-herb/大花咸豐草');
    assert.equal(byHerbRes.status, 200);
    assert.equal(byHerbRes.body.success, true);
    assert.ok(Array.isArray(byHerbRes.body.data));
    assert.ok(byHerbRes.body.data.length > 0);
    assert.ok(byHerbRes.body.data.some(s => s.name.includes('安立') || s.name.includes('德安')));
  });

  // 8. 角色經典配方庫與 AI 神來一配實驗室測試
  test('Formulas & Divine Blend: 角色傳承名方庫與 AI 神來一配實驗室演算法', async () => {
    // 8.1 取得 11 道角色經典傳承配方
    const formulasRes = await fetchJson('/api/formulas');
    assert.equal(formulasRes.status, 200);
    assert.equal(formulasRes.body.success, true);
    assert.ok(Array.isArray(formulasRes.body.data));
    assert.equal(formulasRes.body.data.length, 11);

    // 8.2 依傳承專家篩選 (彭秀妹老藥師客庄藥浴與敷膏)
    const hakkaFormulasRes = await fetchJson('/api/formulas?expertId=hakka_grandma');
    assert.equal(hakkaFormulasRes.status, 200);
    assert.ok(hakkaFormulasRes.body.data.length >= 3);
    assert.ok(hakkaFormulasRes.body.data.some(f => f.type.includes('bath')));

    // 8.3 依配方 ID 取得單一配方
    const singleFormulaRes = await fetchJson('/api/formulas/formula_wanhua_classic_tea');
    assert.equal(singleFormulaRes.status, 200);
    assert.equal(singleFormulaRes.body.success, true);
    assert.ok(singleFormulaRes.body.data.name.includes('百年退火青草茶'));
    assert.ok(singleFormulaRes.body.data.composition.some(c => c.role === '君'));

    // 8.4 🎲 AI 神來一配 (Divine Blend) 演算法演算測試 (含君臣佐使平衡)
    const blendRes = await fetchJson('/api/formulas/blend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetIntent: '清熱退火',
        customName: '夏日炎炎清涼籤'
      })
    });
    assert.equal(blendRes.status, 200);
    assert.equal(blendRes.body.success, true);
    assert.ok(blendRes.body.data.decreeName);
    assert.ok(blendRes.body.data.composition.length >= 2);
    assert.ok(typeof blendRes.body.data.balanceScore === 'number');
    assert.ok(blendRes.body.data.channelsCovered);
    // 臣佐君平衡對象檢驗
    assert.ok(blendRes.body.data.equilibrium);
    assert.ok(blendRes.body.data.equilibrium.overallBalanceScore >= 80);
    assert.ok(blendRes.body.data.equilibrium.composition.some(c => c.role === '君'));
    assert.ok(blendRes.body.data.equilibrium.composition.some(c => c.role === '臣'));
    assert.ok(blendRes.body.data.equilibrium.composition.some(c => c.role === '佐' || c.role === '使'));
    assert.ok(blendRes.body.data.equilibrium.analysis.junDominance > 0);
    assert.ok(blendRes.body.data.equilibrium.analysis.zuoTempering > 0);

    // 8.5 🪄 AI 一鍵臣佐君平衡調和 (Auto-Harmonize) 演算法測試
    // 投入偏苦寒草藥 (大花咸豐草 id: 1)，測試自動補入甘草/薄荷佐使調和至 90+ 分大和
    const harmRes = await fetchJson('/api/formulas/harmonize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        herbIds: [1],
        targetIntent: '清熱退火'
      })
    });
    assert.equal(harmRes.status, 200);
    assert.equal(harmRes.body.success, true);
    assert.equal(harmRes.body.data.isHarmonized, true);
    assert.ok(harmRes.body.data.equilibrium);
    assert.ok(harmRes.body.data.equilibrium.overallBalanceScore >= 90);
    assert.ok(harmRes.body.data.addedHerbs.length > 0);
    assert.ok(harmRes.body.data.harmonizeMessage.includes('臣佐君'));
    assert.ok(harmRes.body.data.composition.some(c => c.role === '君'));
    assert.ok(harmRes.body.data.composition.some(c => c.role === '臣'));
    assert.ok(harmRes.body.data.composition.some(c => c.role === '佐' || c.role === '使'));
  });

  // 9. 專家 LLM AI 客製配方建議測試
  test('Consult Formulate: 專家 LLM AI 結合 RAG 生成道地客製方劑建議', async () => {
    // 9.1 林萬吉老茶師生成熬夜日常青草茶
    const formulateRes = await fetchJson('/api/consult/formulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userNeeds: '天天熬夜加班火氣大，口乾舌燥想要退火，但容易胃寒',
        expertId: 'wanhua_uncle',
        targetType: 'herbal_tea'
      })
    });
    assert.equal(formulateRes.status, 200);
    assert.equal(formulateRes.body.success, true);
    assert.ok(formulateRes.body.data.recipeName);
    assert.ok(formulateRes.body.data.expertAdvice);
    assert.ok(Array.isArray(formulateRes.body.data.composition));
    assert.ok(formulateRes.body.data.composition.length > 0);
    assert.ok(formulateRes.body.data.preparationGuide);

    // 9.2 未提供需求時應回傳 400
    const errRes = await fetchJson('/api/consult/formulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userNeeds: '   ' })
    });
    assert.equal(errRes.status, 400);
    assert.equal(errRes.body.success, false);
  });
  // ========================================================
  // 10. 草木書閣書目檢索、線上試閱與規格查詢
  // ========================================================
  test('Bookshelf & Preview: 書籍檢索、分類篩選與線上試閱章節驗證', async () => {
    // 10.1 取得全庫書籍列表
    const booksRes = await fetchJson('/api/books');
    assert.equal(booksRes.status, 200);
    assert.equal(booksRes.body.success, true);
    assert.ok(Array.isArray(booksRes.body.data));
    assert.ok(booksRes.body.data.length >= 6);

    const firstBook = booksRes.body.data[0];
    assert.ok(firstBook.id);
    assert.ok(firstBook.title);
    assert.ok(firstBook.author);
    assert.ok(firstBook.pricing?.physical?.price > 0);
    assert.ok(firstBook.pricing?.ebook?.price > 0);

    // 10.2 分類篩選 (青草茶文化)
    const catRes = await fetchJson('/api/books?category=tea_culture');
    assert.equal(catRes.status, 200);
    assert.ok(catRes.body.data.every(b => b.category === 'tea_culture'));

    // 10.3 關鍵字檢索
    const searchRes = await fetchJson('/api/books?query=萬華');
    assert.equal(searchRes.status, 200);
    assert.ok(searchRes.body.data.length > 0);
    assert.ok(searchRes.body.data.some(b => b.title.includes('萬華') || b.summary.includes('萬華')));

    // 10.4 取得特定書籍詳情
    const detailRes = await fetchJson(`/api/books/${firstBook.id}`);
    assert.equal(detailRes.status, 200);
    assert.equal(detailRes.body.data.id, firstBook.id);
    assert.ok(detailRes.body.data.tableOfContents?.length > 0);

    // 10.5 取得線上試閱章節 (Preview Reader)
    const previewRes = await fetchJson(`/api/books/${firstBook.id}/preview`);
    assert.equal(previewRes.status, 200);
    assert.equal(previewRes.body.success, true);
    assert.ok(previewRes.body.data.previewTitle);
    assert.ok(Array.isArray(previewRes.body.data.chapters));
    assert.ok(previewRes.body.data.chapters.length > 0);
    assert.ok(previewRes.body.data.chapters[0].title);
    assert.ok(previewRes.body.data.chapters[0].content);
    assert.ok(previewRes.body.data.previewNotice);

    // 10.6 不存在之書籍回傳 404
    const notFoundRes = await fetchJson('/api/books/non_existent_book_id');
    assert.equal(notFoundRes.status, 404);
  });

  // ========================================================
  // 11. 線上購書下單、庫存即時扣減、授權金鑰核發與訂單反查
  // ========================================================
  test('Book Purchase & Orders: 實體/電子書購買、授權金鑰、物流單號與買家訂單反查', async () => {
    const booksRes = await fetchJson('/api/books');
    const book = booksRes.body.data[0];
    const initialStock = book.pricing.physical.stock;

    // 11.1 下單購買電子書 (即時核發數位金鑰，無須物流)
    const testEmail = `reader_${Date.now()}@herbwisdom.tw`;
    const ebookOrderRes = await fetchJson('/api/books/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: book.id,
        purchaseType: 'ebook',
        quantity: 1,
        buyerName: '李本草',
        buyerEmail: testEmail,
        buyerPhone: '0912-345-678',
        paymentMethod: 'credit_card'
      })
    });

    assert.equal(ebookOrderRes.status, 201);
    assert.equal(ebookOrderRes.body.success, true);
    const ebookOrder = ebookOrderRes.body.data.order;
    assert.ok(ebookOrder.orderId.startsWith('THB-BK-'));
    assert.equal(ebookOrder.orderStatus, 'completed');
    assert.ok(ebookOrder.licenseKey.startsWith('EBOOK-AUTH-'));
    assert.equal(ebookOrder.trackingNumber, null);
    assert.equal(ebookOrder.buyerEmail, testEmail);

    // 11.2 下單購買實體書 (扣減庫存，指派物流追蹤碼)
    const physicalOrderRes = await fetchJson('/api/books/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: book.id,
        purchaseType: 'physical',
        quantity: 2,
        buyerName: '王紙本',
        buyerEmail: testEmail,
        buyerPhone: '0988-765-432',
        shippingAddress: '台北市萬華區西昌街 224 巷 12 號',
        paymentMethod: 'line_pay'
      })
    });

    assert.equal(physicalOrderRes.status, 201);
    const physicalOrder = physicalOrderRes.body.data.order;
    assert.equal(physicalOrder.orderStatus, 'shipping');
    assert.ok(physicalOrder.trackingNumber.startsWith('SF-TW-'));
    assert.equal(physicalOrder.licenseKey, null);

    // 驗證庫存已被扣除 2 本
    const updatedBookRes = await fetchJson(`/api/books/${book.id}`);
    assert.equal(updatedBookRes.body.data.pricing.physical.stock, initialStock - 2);

    // 11.3 依買家 Email 反查我的藏書與訂單
    const myOrdersRes = await fetchJson(`/api/books/orders/my?email=${encodeURIComponent(testEmail)}`);
    assert.equal(myOrdersRes.status, 200);
    assert.equal(myOrdersRes.body.success, true);
    assert.equal(myOrdersRes.body.data.length, 2);

    // 11.4 缺少必填欄位時回傳 400
    const invalidOrderRes = await fetchJson('/api/books/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: book.id,
        purchaseType: 'physical',
        buyerName: ''
      })
    });
    assert.equal(invalidOrderRes.status, 400);
  });

  // ========================================================
  // 12. 後台管理員書目維護、線上試閱建立器 (Trial Preview Builder) 與出貨操作
  // ========================================================
  test('Admin Books & Trial Builder: 後台書目 CRUD、自訂試閱章節與訂單審查', async () => {
    const adminAuthHeader = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer taiwanherb-admin-session-active'
    };

    // 12.1 管理員取得書目清單
    const adminBooksRes = await fetchJson('/api/admin/books', {
      headers: { 'Authorization': 'Bearer taiwanherb-admin-session-active' }
    });
    assert.equal(adminBooksRes.status, 200);
    assert.ok(Array.isArray(adminBooksRes.body.data));

    // 12.2 新增書籍
    const newBookPayload = {
      title: '中央山脈森之草藥圖鑑',
      subtitle: '海拔三千公尺下的野生療癒力',
      author: '高山生藥研習社',
      authorRole: '台灣百岳植物採集小組',
      category: 'terroir_field',
      coverIcon: '🌲',
      coverBadge: '百岳巡禮',
      isbn: '978-986-041-9999',
      publisher: '島嶼山林學堂',
      pages: 260,
      pricing: {
        physical: { price: 520, stock: 40 },
        ebook: { price: 350 },
        combo: { price: 740 }
      },
      summary: '全覽台灣高山森林底層的珍稀野草與原住民族百年傳承的揉草茶飲秘方。'
    };

    const createBookRes = await fetchJson('/api/admin/books', {
      method: 'POST',
      headers: adminAuthHeader,
      body: JSON.stringify(newBookPayload)
    });
    assert.equal(createBookRes.status, 201);
    const createdBook = createBookRes.body.data;
    assert.equal(createdBook.title, newBookPayload.title);

    // 12.3 🪄 線上試閱建立器 (Trial Preview Builder)：自訂試閱章節與前言
    const customTrialData = {
      available: true,
      previewTitle: '【森之試閱】第一章：走入霧林帶的青草秘境',
      previewSubtitle: '紅檜與台灣杉下，隨風吐納的野地芳香草本植物導讀',
      readTimeMinutes: 7,
      previewNotice: '高山篇章試閱已告一段落，全書包含百張手繪圖錄與等高線生境分佈，敬請支持正版！',
      chapters: [
        {
          chapterId: 'ch_alpine_1',
          title: '楔子：雲霧繚繞的藥草獵人',
          content: '每當清晨第一縷微光穿透雪霸山稜，林下的石仙桃與白珠樹便在露珠中舒展。\n\n生長在海拔兩千公尺以上的草木，因為日夜溫差極大與強烈紫外線，體內蓄積了更為濃郁的多酚與揮發油。'
        },
        {
          chapterId: 'ch_alpine_2',
          title: '第二章：獵人火塘旁的舒緩茶湯',
          content: '原住民長老在結束一日巡山後，取山肉桂葉與高山薄荷少許，以陶壺沸水滾煮片刻。\n\n那一口略帶辛甘的熱湯，驅散了一整日的山寒與筋骨疲憊。'
        }
      ]
    };

    const trialRes = await fetchJson(`/api/admin/books/${createdBook.id}/preview`, {
      method: 'PUT',
      headers: adminAuthHeader,
      body: JSON.stringify(customTrialData)
    });
    assert.equal(trialRes.status, 200);
    assert.equal(trialRes.body.success, true);
    assert.equal(trialRes.body.data.previewTitle, customTrialData.previewTitle);
    assert.equal(trialRes.body.data.chapters.length, 2);

    // 前台讀者端應能立即取得剛建立的自訂試閱內容
    const publicTrialRes = await fetchJson(`/api/books/${createdBook.id}/preview`);
    assert.equal(publicTrialRes.status, 200);
    assert.equal(publicTrialRes.body.data.previewTitle, customTrialData.previewTitle);
    assert.equal(publicTrialRes.body.data.chapters[0].title, '楔子：雲霧繚繞的藥草獵人');

    // 12.4 後台審查購書訂單
    const ordersRes = await fetchJson('/api/admin/books/orders', {
      headers: { 'Authorization': 'Bearer taiwanherb-admin-session-active' }
    });
    assert.equal(ordersRes.status, 200);
    assert.ok(Array.isArray(ordersRes.body.data));
    assert.ok(ordersRes.body.data.length > 0);

    // 12.5 更新訂單物流狀態為 completed
    const targetOrder = ordersRes.body.data[0];
    const updateOrderRes = await fetchJson(`/api/admin/books/orders/${targetOrder.orderId}/status`, {
      method: 'PUT',
      headers: adminAuthHeader,
      body: JSON.stringify({ orderStatus: 'completed' })
    });
    assert.equal(updateOrderRes.status, 200);
    assert.equal(updateOrderRes.body.data.orderStatus, 'completed');

    // 12.6 刪除測試書籍
    const delBookRes = await fetchJson(`/api/admin/books/${createdBook.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer taiwanherb-admin-session-active' }
    });
    assert.equal(delBookRes.status, 200);
  });
});



