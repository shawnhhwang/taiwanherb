<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card" style="max-width: 600px;">
      <div class="modal-header">
        <h3 style="font-family: var(--font-serif); color: var(--primary-deep); font-size: 18px; display: flex; align-items: center; gap: 8px;">
          <span class="pulse-dot"></span>
          <span>系統監控與 Failover 節點狀態</span>
        </h3>
        <button style="font-size: 18px; color: var(--ink-muted);" @click="$emit('close')">✕</button>
      </div>

      <div class="modal-body">
        <div v-if="!health" style="text-align: center; padding: 20px;">載入系統狀態中...</div>

        <div v-else>
          <div style="background: var(--bg-parchment); border-radius: 12px; padding: 16px; margin-bottom: 20px; border: 1px solid var(--border-light);">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13.5px;">
              <div><strong>運行狀態：</strong> <span style="color: #059669; font-weight: bold;">UP (正常)</span></div>
              <div><strong>服務器時間：</strong> {{ uptime }}</div>
              <div><strong>Node.js 版本：</strong> {{ health.nodeVersion }}</div>
              <div><strong>環境：</strong> {{ health.environment }}</div>
              <div><strong>記憶體占用 (Heap)：</strong> {{ health.memoryUsage?.heapUsed }}</div>
              <div><strong>記憶體占用 (RSS)：</strong> {{ health.memoryUsage?.rss }}</div>
            </div>
          </div>

          <!-- 資料庫 Failover 區塊 -->
          <div style="border: 1px solid var(--border-light); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <h4 style="font-size: 14.5px; font-weight: bold; color: var(--primary-deep); margin-bottom: 10px;">
              💾 資料庫與容錯切換 (Failover)
            </h4>
            <div style="font-size: 13.5px; display: flex; flex-direction: column; gap: 6px;">
              <div><strong>運行模式：</strong> {{ health.database?.modeDescription }}</div>
              <div><strong>活躍節點 (Active Node)：</strong> <span class="badge-channel" style="font-weight: bold; color: var(--primary);">{{ health.database?.activeNode }}</span></div>
              <div><strong>累積故障轉移次數：</strong> {{ health.database?.failoverCount }} 次</div>
              <div v-if="health.database?.lastFailoverTime">
                <strong>最後切換時間：</strong> {{ new Date(health.database.lastFailoverTime).toLocaleString('zh-TW') }}
              </div>
              <div><strong>目前藥材資料總筆數：</strong> {{ health.database?.totalRecords }} 筆</div>
            </div>
          </div>

          <!-- Failover 測試演練按鈕 -->
          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button
              class="btn-pill btn-pill-subtle"
              :disabled="isTestingFailover"
              @click="triggerDrill"
            >
              <span>🔄</span>
              <span>{{ isTestingFailover ? '切換演練中...' : '演練 Failover 節點切換' }}</span>
            </button>
            <button class="btn-pill btn-pill-primary" @click="$emit('close')">確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  health: { type: Object, default: null }
});

const emit = defineEmits(['close', 'trigger-failover']);

const isTestingFailover = ref(false);

const uptime = computed(() => props.health?.uptime || '計算中');

const triggerDrill = async () => {
  isTestingFailover.value = true;
  try {
    await emit('trigger-failover');
  } finally {
    isTestingFailover.value = false;
  }
};
</script>
