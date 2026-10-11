<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card compare-modal-card">
      <div class="modal-header">
        <div class="modal-title-group">
          <span class="compare-seal">辯</span>
          <div>
            <h3 class="compare-modal-title">
              本草多方對照比對鏡 · 辨析性味與風土
            </h3>
            <p class="compare-modal-subtitle">
              對照四氣五味、歸經臟腑、古籍描述、禁忌體質與民間生活智慧 (最多同時比對 4 味)
            </p>
          </div>
        </div>
        <div class="modal-header-actions">
          <button v-if="herbs.length > 0" class="btn-clear-compare" @click="$emit('clear-all')">
            清空所有 ({{ herbs.length }})
          </button>
          <button class="btn-close-modal" title="關閉視窗" @click="$emit('close')">✕</button>
        </div>
      </div>

      <!-- 快速新增列 (手動選取或一鍵載入經典組合) -->
      <div class="compare-toolbar">
        <div class="compare-add-group">
          <span class="toolbar-label">➕ 加入藥材：</span>
          <select v-model="selectedHerbToAdd" class="compare-select" :disabled="herbs.length >= 4">
            <option :value="null">請從全庫選擇欲加入比對之草藥 ({{ availableHerbsToAdd.length }} 味可選)...</option>
            <option v-for="h in availableHerbsToAdd" :key="h.id" :value="h">
              {{ h.name }}（{{ h.nature }}性 · 入{{ (h.channels || []).join('、') }}經）- {{ h.category }}
            </option>
          </select>
          <button
            class="btn-add-selected"
            :disabled="!selectedHerbToAdd || herbs.length >= 4"
            @click="addSelectedHerb"
          >
            + 加入比對
          </button>
          <span v-if="herbs.length >= 4" class="hint-full">已達 4 味上限</span>
        </div>

        <!-- 經典對照預設組合 (一鍵體驗) -->
        <div class="compare-presets-group">
          <span class="toolbar-label">⚡ 經典對照：</span>
          <button
            v-for="preset in PRESETS"
            :key="preset.id"
            class="preset-pill-btn"
            :title="preset.desc"
            @click="loadPreset(preset)"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>

      <div class="modal-body compare-body">
        <!-- 若尚未加入任何藥材時的引導空狀態 -->
        <div v-if="herbs.length === 0" class="compare-empty-state">
          <div class="empty-icon">⚖️</div>
          <h4>尚未選擇任何比對本草</h4>
          <p>
            中醫本草重在「相須相使、同類相求、寒熱辨析」。<br>
            請點擊上方<strong>「⚡ 經典對照」</strong>一鍵體驗代表性對照方，或從下拉選單手動新增草藥。
          </p>
          <div class="empty-quick-cards">
            <div
              v-for="preset in PRESETS"
              :key="'empty-' + preset.id"
              class="empty-preset-card"
              @click="loadPreset(preset)"
            >
              <div class="card-badge">{{ preset.badge }}</div>
              <h5>{{ preset.label }}</h5>
              <p>{{ preset.desc }}</p>
              <span class="card-action">一鍵載入此對照組合 ➔</span>
            </div>
          </div>
        </div>

        <!-- 比對資料表格 -->
        <div v-else class="compare-table-responsive">
          <table class="compare-table">
            <thead>
              <tr>
                <th class="th-property">比對項目</th>
                <th v-for="h in herbs" :key="h.id" class="th-herb-column">
                  <div class="herb-col-header">
                    <img
                      v-if="h.thumbnailUrl"
                      :src="h.thumbnailUrl"
                      :alt="h.name"
                      class="compare-thumb"
                      @click="$emit('view-herb', h.id)"
                    />
                    <div class="herb-col-info">
                      <div class="herb-col-title" @click="$emit('view-herb', h.id)">
                        {{ h.name }}
                        <span class="herb-inspect-icon" title="查看詳情">↗</span>
                      </div>
                      <div class="herb-col-latin">{{ h.scientificName }}</div>
                    </div>
                    <button
                      class="btn-remove-column"
                      title="從比對清單移除此藥材"
                      @click="$emit('remove-herb', h.id)"
                    >
                      ✕
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- 分類 -->
              <tr>
                <th class="td-header">本草綱領分類</th>
                <td v-for="h in herbs" :key="'cat-' + h.id">
                  <span class="badge-channel" style="background: var(--primary-pale); color: var(--primary-deep); font-weight: 600;">
                    {{ h.category }}
                  </span>
                </td>
              </tr>

              <!-- 四氣藥性 -->
              <tr>
                <th class="td-header">四氣藥性</th>
                <td v-for="h in herbs" :key="'nat-' + h.id">
                  <span class="nature-tag" :class="'nature-' + h.nature">
                    <strong>{{ h.nature }}性</strong>
                  </span>
                </td>
              </tr>

              <!-- 五味 -->
              <tr>
                <th class="td-header">五味滋味</th>
                <td v-for="h in herbs" :key="'taste-' + h.id">
                  <span class="taste-text">{{ (h.taste || ['淡']).join('、') }}</span>
                </td>
              </tr>

              <!-- 歸經臟腑 -->
              <tr>
                <th class="td-header">歸經臟腑</th>
                <td v-for="h in herbs" :key="'ch-' + h.id">
                  <div class="channel-pills">
                    <span v-for="ch in h.channels" :key="ch" class="badge-channel">
                      入{{ ch }}經
                    </span>
                  </div>
                </td>
              </tr>

              <!-- 風土產區 -->
              <tr>
                <th class="td-header">風土產區</th>
                <td v-for="h in herbs" :key="'reg-' + h.id">
                  <span class="terroir-text">📍 {{ h.region || h.terroir || '全島普及' }}</span>
                </td>
              </tr>

              <!-- 古籍記載描述 -->
              <tr>
                <th class="td-header">古籍與性味記述</th>
                <td v-for="h in herbs" :key="'eff-' + h.id" class="td-desc">
                  {{ h.summaryEfficacy || h.efficacy }}
                </td>
              </tr>

              <!-- 臺灣在地民間應用 -->
              <tr>
                <th class="td-header">臺灣民間生活智慧</th>
                <td v-for="h in herbs" :key="'tai-' + h.id" class="td-folk">
                  {{ h.taiwanHeritage || h.folkApplication || '臺灣常民生活青草茶常用原料。' }}
                </td>
              </tr>

              <!-- 禁忌體質與注意事項 -->
              <tr>
                <th class="td-header">禁忌體質注意</th>
                <td v-for="h in herbs" :key="'con-' + h.id" class="td-contra">
                  ⚠️ {{ h.contraindications || '無特別體質相剋，正常劑量安心使用。' }}
                </td>
              </tr>

              <!-- 安全等級 -->
              <tr>
                <th class="td-header">毒理安全等級</th>
                <td v-for="h in herbs" :key="'sec-' + h.id">
                  <span class="safety-badge">{{ h.safetyLevel || '無毒常服' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="compare-footer-disclaimer">
          ⚖️ <strong>民間知識分享與非醫療宣告</strong>：本草對照比對所列四氣五味、性味歸經及民俗配伍，純為臺灣傳統常民生活經驗與文獻整理分享，<strong>絕無任何醫療效果宣稱或處方功能</strong>。身體若有不適，請務必尋求合格中西醫師診治。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  herbs: { type: Array, default: () => [] },
  allHerbs: { type: Array, default: () => [] }
});

const emit = defineEmits(['close', 'remove-herb', 'clear-all', 'add-herb', 'load-preset', 'view-herb']);

// 經典對照預設組合
const PRESETS = [
  {
    id: 'cool_tea_duo',
    label: '🍵 青草茶退火雙璧',
    badge: '艋舺老舖經驗',
    targetNames: ['大花咸豐草', '鳳尾草'],
    desc: '萬華西昌街百年青草巷經典主方：咸豐草微苦清涼，鳳尾草苦甘退火，二味相佐涼而不滯。'
  },
  {
    id: 'autumn_breeze',
    label: '🍂 秋冬潤燥疏風',
    badge: '節氣時序對照',
    targetNames: ['紫蘇', '桑葉'],
    desc: '寒露秋燥當令：紫蘇溫胃散風寒，桑葉甘涼清肺燥，一溫一涼調和秋季營衛。'
  },
  {
    id: 'hakka_warding',
    label: '🍃 客庄辟邪安神',
    badge: '客家傳統民俗',
    targetNames: ['艾草', '抹草'],
    desc: '桃竹苗客庄生活必備：抹草辟邪淨身安小兒，艾草溫經散寒通經絡。'
  },
  {
    id: 'anti_inflammatory',
    label: '🔬 苦寒清解二老',
    badge: '民間退癀名藥',
    targetNames: ['魚腥草', '穿心蓮'],
    desc: '臺灣民間最具盛名之極苦清解植物：魚腥草辛涼走肺，穿心蓮苦寒走心胃，生藥活性深厚。'
  }
];

const selectedHerbToAdd = ref(null);

// 可供手動加入的草藥清單 (排除目前已在比對清單內的)
const availableHerbsToAdd = computed(() => {
  const currentIds = new Set(props.herbs.map(h => h.id));
  return (props.allHerbs || []).filter(h => !currentIds.has(h.id));
});

const addSelectedHerb = () => {
  if (selectedHerbToAdd.value) {
    emit('add-herb', selectedHerbToAdd.value);
    selectedHerbToAdd.value = null;
  }
};

const loadPreset = (preset) => {
  emit('load-preset', preset);
};
</script>

<style scoped>
.compare-modal-card {
  max-width: 1100px;
  width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.compare-seal {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary), var(--primary-deep));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 900;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(45, 106, 79, 0.3);
}

.compare-modal-title {
  font-family: var(--font-serif);
  color: var(--primary-deep);
  font-size: 19px;
  margin: 0;
  letter-spacing: 0.5px;
}

.compare-modal-subtitle {
  font-size: 12px;
  color: var(--ink-muted);
  margin: 2px 0 0 0;
}

.modal-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-clear-compare {
  background: var(--bg-subtle);
  border: 1px solid var(--border-light);
  color: #b91c1c;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-clear-compare:hover {
  background: #fee2e2;
  border-color: #fca5a5;
}

.btn-close-modal {
  background: transparent;
  border: none;
  font-size: 20px;
  color: var(--ink-muted);
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.btn-close-modal:hover {
  color: var(--ink-heavy);
}

/* 頂部操作工具列 */
.compare-toolbar {
  padding: 12px 24px;
  background: var(--bg-subtle);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.toolbar-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink-heavy);
  white-space: nowrap;
}

.compare-add-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 280px;
}

.compare-select {
  flex: 1;
  max-width: 320px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  background: #fff;
  font-size: 12.5px;
  color: var(--ink-heavy);
}

.btn-add-selected {
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.btn-add-selected:hover:not(:disabled) {
  background: var(--primary-deep);
}

.btn-add-selected:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hint-full {
  font-size: 11px;
  color: #b45309;
}

.compare-presets-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.preset-pill-btn {
  background: #fff;
  border: 1px solid var(--border-light);
  color: var(--primary-deep);
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.preset-pill-btn:hover {
  background: var(--primary-pale);
  border-color: var(--primary);
}

/* 比對本體與空狀態 */
.compare-body {
  overflow-y: auto;
  padding: 0;
  flex: 1;
}

.compare-empty-state {
  text-align: center;
  padding: 48px 24px;
  max-width: 720px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.compare-empty-state h4 {
  font-size: 20px;
  font-family: var(--font-serif);
  color: var(--primary-deep);
  margin: 0 0 8px 0;
}

.compare-empty-state p {
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.6;
  margin: 0 0 28px 0;
}

.empty-quick-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  text-align: left;
}

.empty-preset-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.empty-preset-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.15);
}

.card-badge {
  font-size: 11px;
  font-weight: 700;
  color: var(--amber-deep, #b45309);
  margin-bottom: 4px;
}

.empty-preset-card h5 {
  font-size: 16px;
  font-weight: bold;
  color: var(--primary-deep);
  margin: 0 0 6px 0;
}

.empty-preset-card p {
  font-size: 12.5px;
  color: var(--ink-body);
  margin: 0 0 10px 0;
  line-height: 1.5;
}

.card-action {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
}

/* 比對表格 */
.compare-table-responsive {
  overflow-x: auto;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
}

.th-property {
  width: 140px;
  min-width: 120px;
  background: var(--bg-subtle);
  border-bottom: 2px solid var(--border-light);
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-heavy);
  text-align: left;
  padding: 14px 16px;
}

.th-herb-column {
  min-width: 220px;
  border-bottom: 2px solid var(--border-light);
  padding: 12px 16px;
  background: #fff;
}

.herb-col-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.compare-thumb {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid var(--border-light);
}

.herb-col-info {
  flex: 1;
  text-align: left;
}

.herb-col-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--primary-deep);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.herb-col-title:hover {
  text-decoration: underline;
}

.herb-inspect-icon {
  font-size: 12px;
  color: var(--ink-muted);
}

.herb-col-latin {
  font-size: 11px;
  font-style: italic;
  color: var(--ink-muted);
  line-height: 1.2;
}

.btn-remove-column {
  background: transparent;
  border: none;
  color: var(--ink-muted);
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.btn-remove-column:hover {
  color: #ef4444;
  background: #fee2e2;
}

.td-header {
  background: var(--bg-subtle);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-heavy);
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-light);
  text-align: left;
  white-space: nowrap;
}

.compare-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-light);
  font-size: 13px;
  color: var(--ink-body);
  line-height: 1.5;
  background: #fff;
}

.nature-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
}

.nature-寒 { background: #e0f2fe; color: #0369a1; }
.nature-微寒 { background: #e0f2fe; color: #0284c7; }
.nature-涼 { background: #ecfdf5; color: #047857; }
.nature-平 { background: #f3f4f6; color: #374151; }
.nature-溫 { background: #fef3c7; color: #b45309; }
.nature-熱 { background: #fee2e2; color: #b91c1c; }

.channel-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.terroir-text {
  color: var(--primary-deep);
  font-weight: 500;
}

.td-desc {
  font-size: 12.5px;
}

.td-folk {
  color: var(--primary-deep);
  font-size: 12.5px;
}

.td-contra {
  color: #b91c1c;
  font-size: 12.5px;
  background: #fff5f5 !important;
}

.safety-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  background: rgba(45, 106, 79, 0.1);
  color: var(--primary-deep);
  font-weight: 600;
}

.compare-footer-disclaimer {
  padding: 12px 20px;
  font-size: 11.5px;
  color: var(--ink-muted);
  background: var(--bg-parchment);
  border-top: 1px solid var(--border-light);
  line-height: 1.5;
}
</style>
