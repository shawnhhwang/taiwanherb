/**
 * server/data/llmConfig.js
 * LLM API 來源與提供商預設配置
 */

const DEFAULT_LLM_CONFIG = {
  activeProvider: 'builtin', // 'builtin' | 'gemini' | 'openai' | 'claude'
  temperature: 0.7,
  maxTokens: 2000,
  timeoutMs: 60000,
  providers: {
    builtin: {
      id: 'builtin',
      name: '系統內建離線本草知識引擎',
      vendor: 'Taiwan Herb Local AI',
      description: '免外接 API 金鑰、零網路延遲，以百萬字臺灣植物誌與漢方生藥考據為基底之純粹離線語意引擎。',
      isConfigured: true,
      model: 'taiwan-herb-embedded-v2',
      baseUrl: 'local://embedded',
      apiKey: ''
    },
    ollama: {
      id: 'ollama',
      name: 'Ollama 本地 / 內網模型服務 (免金鑰)',
      vendor: 'Ollama (Local / Self-Hosted)',
      description: '支援本地 (localhost:11434) 或區域網路 Ollama 執行之開源大模型 (如 Llama 3, Gemma, Qwen, Taiwan-LLM)，原生支援無金鑰直接呼叫。',
      isConfigured: true,
      model: process.env.OLLAMA_MODEL || 'gemma4:e2b',
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://192.168.1.3:11434',
      apiKey: ''
    },
    gemini: {
      id: 'gemini',
      name: 'Google Gemini',
      vendor: 'Google AI Studio',
      description: '支援 Google Gemini 1.5 Flash / Pro 與 2.0 模型，具備超長上下文理解與多語系植物文獻推理。',
      isConfigured: !!process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      baseUrl: process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com',
      apiKey: process.env.GEMINI_API_KEY || ''
    },
    openai: {
      id: 'openai',
      name: 'OpenAI / 相容架構 (DeepSeek / Ollama)',
      vendor: 'OpenAI / Self-Hosted',
      description: '支援標準 OpenAI ChatCompletions 協定，可無縫切換 DeepSeek、Local Ollama 或自建 vLLM 端點。本地或自建端點支援免金鑰呼叫。',
      isConfigured: true,
      model: process.env.OPENAI_MODEL || 'gemma4:e2b',
      baseUrl: process.env.OPENAI_BASE_URL || 'http://192.168.1.3:11434',
      apiKey: process.env.OPENAI_API_KEY || ''
    },
    claude: {
      id: 'claude',
      name: 'Anthropic Claude',
      vendor: 'Anthropic',
      description: '支援 Claude 3.5 Sonnet / Haiku，擅長細緻筆觸之文化散文描繪與生藥學文獻嚴謹考辨。',
      isConfigured: !!process.env.ANTHROPIC_API_KEY,
      model: process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022',
      baseUrl: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1',
      apiKey: process.env.ANTHROPIC_API_KEY || ''
    }
  }
};

module.exports = {
  DEFAULT_LLM_CONFIG
};
