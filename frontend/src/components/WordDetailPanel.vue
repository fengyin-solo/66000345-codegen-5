<template>
  <div v-if="detail" class="bg-slate-800 rounded-lg p-4 border border-cyan-700/60">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-bold text-slate-400">词条详情</h3>
      <div class="flex gap-3 text-xs">
        <button class="text-cyan-400 hover:text-cyan-200" @click="onBack">← 返回词表</button>
        <button class="text-slate-500 hover:text-slate-300" @click="store.closeWordDetail()">✕ 关闭</button>
      </div>
    </div>
    <div ref="bodyRef" class="max-h-96 overflow-y-auto pr-1" @scroll="onScroll">
      <!-- 词头 -->
      <div class="text-lg font-bold text-cyan-400 font-mono">{{ detail.word }}</div>
      <div class="text-xs text-slate-400">{{ detail.language }} · {{ familyName }}</div>
      <div class="text-xs text-slate-500 mb-3">{{ detail.meaning }} · 所属时期：{{ detail.period }}</div>

      <!-- 各语系同源词形 -->
      <div class="mb-3">
        <div class="text-xs font-bold text-slate-400 mb-1">各语系同源词形</div>
        <div class="space-y-1">
          <div v-for="lang in detailLanguages" :key="lang" class="flex items-start gap-2 text-xs">
            <span class="w-14 flex-shrink-0 text-slate-500 mt-0.5">{{ lang }}</span>
            <button
              v-if="detail.cognates[lang]"
              class="font-mono text-cyan-300 hover:text-cyan-100 hover:underline"
              :title="`查看 ${lang} 词条`"
              @click="store.selectDetailLanguage(lang)"
            >{{ detail.cognates[lang] }}</button>
            <div v-else class="flex-1">
              <span class="font-mono text-slate-600">— 缺失</span>
              <span v-if="detail.missing[lang]" class="ml-1 text-[10px] text-amber-500/90">
                [{{ missingLabel(detail.missing[lang].category) }}]
              </span>
              <div v-if="detail.missing[lang]" class="text-[10px] text-slate-500 leading-snug">
                {{ detail.missing[lang].reason }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 来源路径 -->
      <div>
        <div class="text-xs font-bold text-slate-400 mb-1">来源路径</div>
        <div
          v-if="detail.sourceBroken"
          class="text-[10px] text-amber-300 bg-amber-900/20 border border-amber-800/50 rounded px-2 py-1 mb-1.5"
        >⚠ 来源中断：{{ detail.sourceBreakNote }}</div>
        <div class="space-y-1.5">
          <div v-for="(step, i) in detail.sourcePath" :key="i" class="flex items-start gap-1.5 text-xs">
            <span class="text-slate-600 mt-px">{{ i === 0 ? '◈' : '↓' }}</span>
            <div>
              <span class="font-mono text-slate-200">{{ step.stage }}</span>
              <span class="text-slate-500">（{{ step.language }} · {{ step.period }}）</span>
              <div v-if="step.note" class="text-[10px] text-slate-500">{{ step.note }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { LANGUAGE_FAMILIES, useEtymologyStore } from '../store/etymology'
import { DETAIL_LANGUAGES } from '../mock/wordDetails'
import type { MissingCategory, WordDetail } from '../types'

const props = defineProps<{ detail: WordDetail | null }>()
const emit = defineEmits<{ (e: 'back'): void }>()

const store = useEtymologyStore()
const bodyRef = ref<HTMLElement | null>(null)
const detailLanguages = DETAIL_LANGUAGES

const familyName = computed(() =>
  LANGUAGE_FAMILIES.find(f => f.id === props.detail?.family)?.name || props.detail?.family || ''
)

const MISSING_LABELS: Record<MissingCategory, string> = {
  'no-descendant': '无后裔词',
  'broken-chain': '来源中断',
  'not-attested': '未收录',
}
function missingLabel(c: MissingCategory) {
  return MISSING_LABELS[c] || c
}

function onScroll() {
  if (bodyRef.value) store.saveDetailScroll(bodyRef.value.scrollTop)
}

function onBack() {
  store.closeWordDetail()
  emit('back')
}

// 词条切换时：同一词条（关闭后重开）恢复原滚动位置，新词条回到顶部，
// 保证详情完全跟随当前词条，不残留上一词条的浏览位置。
watch(() => props.detail?.id, async id => {
  if (!id) return
  await nextTick()
  const el = bodyRef.value
  if (!el) return
  el.scrollTop = id === store.detailScrollFor ? store.detailScrollTop : 0
})
</script>
