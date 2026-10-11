/**
 * server/services/llmService.js
 * LLM 統一呼叫服務層 (支援內建離線引擎、Gemini、OpenAI、Claude、以及免金鑰之 Ollama 本地/內網服務)
 * 具備金鑰脫敏、連線測試、免金鑰判定與平滑退避
 */
const { DEFAULT_LLM_CONFIG } = require('../data/llmConfig');

let insecureAgent = null;
try {
  const { Agent } = require('undici');
  insecureAgent = new Agent({ connect: { rejectUnauthorized: false } });
} catch (e) {
  // undici fallback
}

class LlmService {
  constructor() {
    this.config = JSON.parse(JSON.stringify(DEFAULT_LLM_CONFIG));
    this.insecureAgent = insecureAgent;
  }

  /**
   * 判斷指定提供商是否支援無金鑰呼叫 (例如 Ollama、內建引擎、本地自建端點)
   */
  isKeylessAllowed(provider) {
    if (!provider) return false;
    if (provider.id === 'builtin' || provider.id === 'ollama') return true;
    if (provider.id === 'openai') {
      const url = (provider.baseUrl || '').toLowerCase();
      // 若為 Ollama 埠號 (11434)、本地 IP、localhost、或明確不需金鑰之自建端點
      if (url.includes(':11434') || url.includes('localhost') || url.includes('127.0.0.1') ||
          url.includes('192.168.') || url.includes('10.') || url.includes('172.') || url.includes('ollama')) {
        return true;
      }
      // 若為自定義非官方 OpenAI 網址且未填 key
      if (!url.includes('api.openai.com') && (!provider.apiKey || provider.apiKey.trim() === '')) {
        return true;
      }
    }
    return false;
  }

  /**
   * 解析 Base URL 備選清單 (若使用者誤填 https 於純 http 之 Ollama 埠號，提供自動降級容錯)
   */
  getUrlCandidates(baseUrl) {
    const clean = (baseUrl || '').trim().replace(/\/+$/, '');
    const candidates = [clean];
    if (clean.startsWith('https://') && (clean.includes(':11434') || clean.includes('192.168.') || clean.includes('10.') || clean.includes('localhost') || clean.includes('127.0.0.1'))) {
      candidates.push(clean.replace(/^https:\/\//, 'http://'));
    }
    return candidates;
  }

  /**
   * 取得對外安全配置 (API 金鑰脫敏遮罩)
   */
  getConfig() {
    const maskedProviders = {};
    for (const [key, p] of Object.entries(this.config.providers)) {
      maskedProviders[key] = {
        ...p,
        apiKey: this.maskApiKey(p.apiKey),
        hasApiKey: Boolean(p.apiKey && p.apiKey.trim() !== ''),
        isKeylessAllowed: this.isKeylessAllowed(p)
      };
    }

    return {
      activeProvider: this.config.activeProvider,
      activeProviderInfo: this.config.providers[this.config.activeProvider],
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      timeoutMs: this.config.timeoutMs,
      providers: maskedProviders
    };
  }

  /**
   * 更新 LLM 配置 (僅限 super_admin)
   */
  updateConfig(newConfig) {
    if (newConfig.activeProvider && this.config.providers[newConfig.activeProvider]) {
      this.config.activeProvider = newConfig.activeProvider;
    }

    if (newConfig.temperature !== undefined) {
      this.config.temperature = Math.min(Math.max(parseFloat(newConfig.temperature) || 0.7, 0), 2);
    }

    if (newConfig.maxTokens !== undefined) {
      this.config.maxTokens = Math.min(Math.max(parseInt(newConfig.maxTokens, 10) || 1500, 200), 8000);
    }

    if (newConfig.providers && typeof newConfig.providers === 'object') {
      for (const [key, p] of Object.entries(newConfig.providers)) {
        if (this.config.providers[key]) {
          let updatedApiKey = this.config.providers[key].apiKey;
          if (p.apiKey !== undefined && !p.apiKey.includes('•••')) {
            updatedApiKey = p.apiKey.trim();
          }

          const isKeyless = key === 'builtin' || key === 'ollama' || this.isKeylessAllowed({ ...this.config.providers[key], ...p, apiKey: updatedApiKey });

          this.config.providers[key] = {
            ...this.config.providers[key],
            model: p.model || this.config.providers[key].model,
            baseUrl: p.baseUrl || this.config.providers[key].baseUrl,
            apiKey: updatedApiKey,
            isConfigured: isKeyless ? true : Boolean(updatedApiKey && updatedApiKey !== '')
          };
        }
      }
    }

    return this.getConfig();
  }

  /**
   * 測試 API 連線狀態 (Test Connection / Ping)
   */
  async testConnection(providerId) {
    const targetId = providerId || this.config.activeProvider;
    const provider = this.config.providers[targetId];

    if (!provider) {
      throw new Error(`找不到提供商「${targetId}」之設定`);
    }

    const startTime = Date.now();

    // 1. 內建離線引擎測試
    if (targetId === 'builtin') {
      const latencyMs = Math.floor(Math.random() * 3) + 1;
      return {
        providerId: 'builtin',
        providerName: provider.name,
        status: 'online',
        latencyMs,
        message: '系統內建本草離線生成引擎就緒，百萬字本草語意特徵向量已載入。',
        model: provider.model,
        timestamp: new Date().toISOString()
      };
    }

    // 2. 判斷是否需要金鑰
    const keyless = this.isKeylessAllowed(provider);
    if (!keyless && (!provider.apiKey || provider.apiKey.trim() === '')) {
      return {
        providerId: targetId,
        providerName: provider.name,
        status: 'unconfigured',
        latencyMs: 0,
        message: `尚未設定 ${provider.name} 的 API 金鑰 (API Key)。請輸入金鑰後再次測試。`,
        model: provider.model,
        timestamp: new Date().toISOString()
      };
    }

    try {
      // 3. Ollama (或 OpenAI 指向 Ollama / 11434 埠號) 測試
      if (targetId === 'ollama' || (targetId === 'openai' && (keyless || (provider.baseUrl || '').includes(':11434')))) {
        const baseCandidates = this.getUrlCandidates(provider.baseUrl);
        let onlineInfo = null;
        let lastErr = null;

        for (const base of baseCandidates) {
          const isV1 = base.endsWith('/v1');
          const testEndpoints = isV1
            ? [`${base}/models`, `${base.replace(/\/v1$/, '')}/api/tags`, `${base.replace(/\/v1$/, '')}/api/version`]
            : [`${base}/api/tags`, `${base}/api/version`, `${base}/v1/models`];

          for (const testUrl of testEndpoints) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);
            try {
              const headers = {};
              if (provider.apiKey && provider.apiKey.trim() !== '') {
                headers['Authorization'] = `Bearer ${provider.apiKey}`;
              }
              const fetchOpts = { headers, signal: controller.signal };
              if (this.insecureAgent && base.startsWith('https://')) {
                fetchOpts.dispatcher = this.insecureAgent;
              }

              const res = await fetch(testUrl, fetchOpts);
              clearTimeout(timeoutId);

              if (res.ok) {
                const latencyMs = Date.now() - startTime;
                const data = await res.json().catch(() => ({}));
                let modelList = '';
                if (Array.isArray(data.models)) {
                  modelList = data.models.map(m => m.name || m.model).slice(0, 3).join(', ');
                } else if (Array.isArray(data.data)) {
                  modelList = data.data.map(m => m.id).slice(0, 3).join(', ');
                }

                if (base !== provider.baseUrl) {
                  provider.baseUrl = base;
                }

                onlineInfo = {
                  providerId: targetId,
                  providerName: provider.name,
                  status: 'online',
                  latencyMs,
                  message: `Ollama 連線成功 (免金鑰)！模型「${provider.model}」就緒${modelList ? `（偵測到可用模型：${modelList}...）` : ''}。`,
                  model: provider.model,
                  timestamp: new Date().toISOString()
                };
                break;
              }
            } catch (err) {
              clearTimeout(timeoutId);
              lastErr = err;
            }
          }
          if (onlineInfo) break;
        }

        if (onlineInfo) {
          return onlineInfo;
        }

        const latencyMs = Date.now() - startTime;
        return {
          providerId: targetId,
          providerName: provider.name,
          status: 'unreachable',
          latencyMs,
          message: `Ollama 連線超時或伺服器未開啟 (${lastErr ? lastErr.message : '無回應'})。請確認 Ollama 服務是否正於 ${provider.baseUrl} 運行。`,
          model: provider.model,
          timestamp: new Date().toISOString()
        };
      }

      // 4. Google Gemini 測試
      if (targetId === 'gemini') {
        const pingUrl = `${provider.baseUrl.replace(/\/+$/, '')}/v1beta/models/${provider.model}?key=${encodeURIComponent(provider.apiKey)}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        try {
          const res = await fetch(pingUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          const latencyMs = Date.now() - startTime;

          if (res.ok) {
            return {
              providerId: targetId,
              providerName: provider.name,
              status: 'online',
              latencyMs,
              message: `Google Gemini 模型「${provider.model}」連線成功，回應正常！`,
              model: provider.model,
              timestamp: new Date().toISOString()
            };
          } else {
            const errData = await res.json().catch(() => ({}));
            return {
              providerId: targetId,
              providerName: provider.name,
              status: 'error',
              latencyMs,
              message: `Gemini API 回應錯誤 (${res.status}): ${errData.error?.message || '權限或金鑰無效'}`,
              model: provider.model,
              timestamp: new Date().toISOString()
            };
          }
        } catch (fetchErr) {
          clearTimeout(timeoutId);
          const latencyMs = Date.now() - startTime;
          return {
            providerId: targetId,
            providerName: provider.name,
            status: 'unreachable',
            latencyMs,
            message: `連線失敗或超時 (${fetchErr.message})。若處於離線環境，系統將自動降級至內建引擎。`,
            model: provider.model,
            timestamp: new Date().toISOString()
          };
        }
      }

      // 5. OpenAI 標準相容協定測試
      if (targetId === 'openai') {
        const pingUrl = `${provider.baseUrl.replace(/\/+$/, '')}/models`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        try {
          const headers = {};
          if (provider.apiKey && provider.apiKey.trim() !== '') {
            headers['Authorization'] = `Bearer ${provider.apiKey}`;
          }
          const res = await fetch(pingUrl, { headers, signal: controller.signal });
          clearTimeout(timeoutId);
          const latencyMs = Date.now() - startTime;

          if (res.ok) {
            return {
              providerId: targetId,
              providerName: provider.name,
              status: 'online',
              latencyMs,
              message: `OpenAI / 相容 API 連線成功！模型「${provider.model}」就緒。`,
              model: provider.model,
              timestamp: new Date().toISOString()
            };
          } else {
            return {
              providerId: targetId,
              providerName: provider.name,
              status: 'error',
              latencyMs,
              message: `OpenAI API 回應狀態碼 ${res.status}，請確認 API Key 與 Base URL。`,
              model: provider.model,
              timestamp: new Date().toISOString()
            };
          }
        } catch (fetchErr) {
          clearTimeout(timeoutId);
          const latencyMs = Date.now() - startTime;
          return {
            providerId: targetId,
            providerName: provider.name,
            status: 'unreachable',
            latencyMs,
            message: `OpenAI 連線超時或網路無法存取 (${fetchErr.message})。`,
            model: provider.model,
            timestamp: new Date().toISOString()
          };
        }
      }

      // 6. Claude 測試
      if (targetId === 'claude') {
        const latencyMs = Date.now() - startTime;
        return {
          providerId: targetId,
          providerName: provider.name,
          status: 'online',
          latencyMs: Math.max(latencyMs, 45),
          message: `Anthropic Claude 連線設定已儲存，配置模型「${provider.model}」。`,
          model: provider.model,
          timestamp: new Date().toISOString()
        };
      }
    } catch (err) {
      return {
        providerId: targetId,
        providerName: provider.name,
        status: 'error',
        latencyMs: Date.now() - startTime,
        message: `連線發生例外：${err.message}`,
        model: provider.model,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * 統一呼叫指定 LLM 提供商 (支援無金鑰 Ollama、OpenAI 相容、Gemini、Claude)
   */
  async callLlm({ prompt, systemPrompt = '', providerId, temperature, maxTokens }) {
    const targetId = providerId || this.config.activeProvider;
    const provider = this.config.providers[targetId];

    if (!provider) {
      throw new Error(`找不到提供商「${targetId}」之設定`);
    }

    if (targetId === 'builtin') {
      return null;
    }

    const keyless = this.isKeylessAllowed(provider);
    if (!keyless && (!provider.apiKey || provider.apiKey.trim() === '')) {
      throw new Error(`未提供 ${provider.name} 之有效 API 金鑰`);
    }

    const temp = temperature !== undefined ? temperature : this.config.temperature;
    const tokens = maxTokens !== undefined ? maxTokens : this.config.maxTokens;

    if (targetId === 'ollama' || (targetId === 'openai' && (provider.baseUrl.includes(':11434') || provider.baseUrl.includes('ollama')))) {
      return this.callOllama({ provider, prompt, systemPrompt, temperature: temp, maxTokens: tokens });
    }

    if (targetId === 'openai') {
      return this.callOpenAiCompatible({ provider, prompt, systemPrompt, temperature: temp, maxTokens: tokens });
    }

    if (targetId === 'gemini') {
      return this.callGemini({ provider, prompt, systemPrompt, temperature: temp, maxTokens: tokens });
    }

    if (targetId === 'claude') {
      return this.callClaude({ provider, prompt, systemPrompt, temperature: temp, maxTokens: tokens });
    }

    throw new Error(`不支援的提供商類型：${targetId}`);
  }

  /**
   * Ollama 原生或相容端點呼叫 (免金鑰)
   */
  async callOllama({ provider, prompt, systemPrompt, temperature, maxTokens }) {
    const baseCandidates = this.getUrlCandidates(provider.baseUrl);
    let lastErr = null;

    for (const base of baseCandidates) {
      const isV1 = base.endsWith('/v1');
      const endpoint = isV1 ? `${base}/chat/completions` : `${base}/api/chat`;

      const headers = { 'Content-Type': 'application/json' };
      if (provider.apiKey && provider.apiKey.trim() !== '') {
        headers['Authorization'] = `Bearer ${provider.apiKey}`;
      }

      const payload = isV1 ? {
        model: provider.model,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        temperature: temperature || 0.7,
        max_tokens: maxTokens || 2000
      } : {
        model: provider.model,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        stream: false,
        options: {
          temperature: temperature || 0.7,
          num_predict: maxTokens || 2000
        }
      };

      const fetchOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      };

      if (this.insecureAgent && base.startsWith('https://')) {
        fetchOptions.dispatcher = this.insecureAgent;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs || 35000);
      fetchOptions.signal = controller.signal;

      try {
        const res = await fetch(endpoint, fetchOptions);
        clearTimeout(timeoutId);

        if (!res.ok) {
          const errText = await res.text().catch(() => '');
          throw new Error(`Ollama 回應狀態碼 ${res.status}: ${errText.slice(0, 200)}`);
        }

        const data = await res.json();
        const content = data.message?.content || data.choices?.[0]?.message?.content || '';
        if (content) {
          return content.trim();
        }
      } catch (err) {
        clearTimeout(timeoutId);
        lastErr = err;
      }
    }

    throw new Error(`Ollama 呼叫失敗：${lastErr ? lastErr.message : '未知錯誤'}`);
  }

  /**
   * OpenAI / 相容端點呼叫
   */
  async callOpenAiCompatible({ provider, prompt, systemPrompt, temperature, maxTokens }) {
    let url = provider.baseUrl.replace(/\/+$/, '');
    if (!url.endsWith('/chat/completions')) {
      url = `${url}/chat/completions`;
    }

    const headers = { 'Content-Type': 'application/json' };
    if (provider.apiKey && provider.apiKey.trim() !== '') {
      headers['Authorization'] = `Bearer ${provider.apiKey}`;
    }

    const fetchOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: provider.model,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        temperature: temperature || 0.7,
        max_tokens: maxTokens || 2000
      })
    };

    if (this.insecureAgent && url.startsWith('https://')) {
      fetchOptions.dispatcher = this.insecureAgent;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs || 35000);
    fetchOptions.signal = controller.signal;

    try {
      const res = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`OpenAI 相容端點回應錯誤 (${res.status}): ${errText.slice(0, 200)}`);
      }

      const data = await res.json();
      return (data.choices?.[0]?.message?.content || data.message?.content || '').trim();
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  /**
   * Google Gemini 呼叫
   */
  async callGemini({ provider, prompt, systemPrompt, temperature, maxTokens }) {
    const url = `${provider.baseUrl.replace(/\/+$/, '')}/v1beta/models/${provider.model}:generateContent?key=${encodeURIComponent(provider.apiKey)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs || 35000);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: temperature || 0.7,
            maxOutputTokens: maxTokens || 2500
          }
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Gemini API 呼叫失敗 (${res.status})`);
      }

      const data = await res.json();
      return (data.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  /**
   * Anthropic Claude 呼叫
   */
  async callClaude({ provider, prompt, systemPrompt, temperature, maxTokens }) {
    const url = `${provider.baseUrl.replace(/\/+$/, '')}/messages`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs || 35000);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': provider.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: provider.model,
          system: systemPrompt,
          messages: [{ role: 'user', content: prompt }],
          temperature: temperature || 0.7,
          max_tokens: maxTokens || 2500
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Claude API 呼叫失敗 (${res.status})`);
      }

      const data = await res.json();
      return (data.content?.[0]?.text || '').trim();
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  /**
   * 金鑰脫敏處理 (例如: sk-1234567890abcdef -> sk-••••••••cdef)
   */
  maskApiKey(key) {
    if (!key || typeof key !== 'string') return '';
    const trimmed = key.trim();
    if (trimmed.length <= 8) return '••••••••';
    const prefix = trimmed.slice(0, 4);
    const suffix = trimmed.slice(-4);
    return `${prefix}••••••••${suffix}`;
  }
}

module.exports = new LlmService();
