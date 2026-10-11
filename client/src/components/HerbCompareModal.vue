<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h3 style="font-family: var(--font-serif); color: var(--primary-deep); font-size: 18px;">
          ⚖️ 中草藥多方對照比對
        </h3>
        <div style="display: flex; gap: 10px; align-items: center;">
          <button class="sidebar-reset-btn" @click="$emit('clear-all')">全部清空</button>
          <button style="font-size: 18px; color: var(--ink-muted);" @click="$emit('close')">✕</button>
        </div>
      </div>

      <div class="modal-body">
        <div v-if="herbs.length === 0" style="text-align: center; padding: 40px; color: var(--ink-muted);">
          尚未選擇欲比對的藥材，請在列表卡片點擊「+ 加入比對」按鈕。
        </div>

        <table v-else class="compare-table">
          <thead>
            <tr>
              <th>比對項目</th>
              <th v-for="h in herbs" :key="h.id">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 16px; font-weight: bold; color: var(--primary-deep);">{{ h.name }}</span>
                  <button style="color: #ef4444; font-size: 12px;" @click="$emit('remove-herb', h.id)">✕ 移除</button>
                </div>
                <div style="font-size: 11px; font-style: italic; color: var(--ink-muted); margin-top: 2px;">
                  {{ h.scientificName }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>藥材分類</th>
              <td v-for="h in herbs" :key="'cat-' + h.id">
                <span class="badge-channel" style="background: var(--primary-pale); color: var(--primary-deep);">
                  {{ h.category }}
                </span>
              </td>
            </tr>
            <tr>
              <th>四氣藥性</th>
              <td v-for="h in herbs" :key="'nat-' + h.id">
                <strong>{{ h.nature }}性</strong>
              </td>
            </tr>
            <tr>
              <th>歸經臟腑</th>
              <td v-for="h in herbs" :key="'ch-' + h.id">
                <span v-for="ch in h.channels" :key="ch" class="badge-channel" style="margin-right: 4px;">{{ ch }}</span>
              </td>
            </tr>
            <tr>
              <th>古籍記載描述</th>
              <td v-for="h in herbs" :key="'eff-' + h.id">{{ h.efficacy }}</td>
            </tr>
            <tr>
              <th>禁忌體質</th>
              <td v-for="h in herbs" :key="'con-' + h.id" style="color: #b91c1c;">
                {{ h.contraindications }}
              </td>
            </tr>
            <tr>
              <th>台灣在地應用</th>
              <td v-for="h in herbs" :key="'tai-' + h.id" style="color: var(--primary-deep);">
                {{ h.taiwanHeritage || '全台普及中草藥。' }}
              </td>
            </tr>
          </tbody>
        </table>
        <div style="font-size: 11.5px; color: var(--ink-muted); padding: 12px 16px; background: var(--bg-primary); border-top: 1px solid var(--border-light);">
          ⚖️ <strong>非醫療宣告</strong>：本草比對所列資料純為臺灣傳統民間生活知識與植物古籍整理分享，絕無任何醫療效果宣稱，身體不適請務必就醫診治。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  herbs: { type: Array, default: () => [] }
});

defineEmits(['close', 'remove-herb', 'clear-all']);
</script>
