<template>
  <div v-if="detail" class="fixed inset-0 z-40 flex justify-end">
    <!-- 半透明遮罩：点击等同返回词表 -->
    <div class="absolute inset-0 bg-slate-950/60" @click="$emit('back')"></div>

    <aside
      ref="panelRef"
      class="relative h-full w-full max-w-xl bg-slate-800 border-l border-slate-600 shadow-2xl flex flex-col"
    >
      <!-- 头部：返回词表 + 词条标题（随当前词条更新） -->
      <div class="flex items-start gap-3 px-5 py-4 border-b border-slate-700 flex-shrink-0">
        <button
          class="mt-0.5 px-2.5 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600 text-slate-200 flex items-center gap-1 flex-shrink-0"
          @click="$emit('back')"
        >
          <span aria-hidden="true">←</span> 返回词表
        </button>
        <div class="min-w-0">
          <div class="flex items-baseline gap-2 flex-wrap">
            <span class="text-xl font-bold text-cyan-400 font-mono">{{ detail.root }}</span>
            <span class="text-sm text-slate-400">{{ detail.meaning }}</span>
          </div>
          <div class="text-xs text-slate-500 mt-0.5">{{ detail.rootPeriod }}</div>
        </div>
      </div>

      <!-- 可滚动主体；:key 绑定当前词条+语种，切换词条时整体重建，绝不沿用上一词条信息 -->
      <div class="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <!-- 语种切换 -->
        <section>
          <h4 class="text-xs font-bold text-slate-400 mb-2">切换语种</h4>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="l in detail.languages"
              :key="l.language"
              class="px-2.5 py-1 rounded-full text-xs border transition-colors"
              :class="l.language === active?.language
                ? 'bg-cyan-500 border-cyan-400 text-slate-900 font-bold'
                : l.form
                  ? 'bg-slate-900 border-slate-600 text-slate-300 hover:border-cyan-500'
                  : 'bg-slate-900/60 border-slate-700 text-slate-500 hover:border-amber-500'"
              @click="$emit('switch-language', l.language)"
            >
              <span
                class="inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle"
                :class="l.form ? 'bg-emerald-400' : 'bg-amber-400'"
              ></span>
              {{ l.language }}
            </button>
          </div>
        </section>

        <!-- 当前语种详情 -->
        <section v-if="active" :key="detail.root + '|' + active.language">
          <h4 class="text-xs font-bold text-slate-400 mb-2">
            {{ active.language }} · 同源词形
          </h4>

          <!-- 缺项：独立标明原因，不展示上一词条的任何路径/词形 -->
          <div
            v-if="!active.form"
            class="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4"
          >
            <div class="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <span aria-hidden="true">⚠</span> 该语种缺项
            </div>
            <p class="text-xs text-amber-200/90 mt-2 leading-relaxed">
              {{ active.missingReason || '本词条在该语种中暂无对应同源词形。' }}
            </p>
          </div>

          <!-- 有词形 -->
          <div v-else class="rounded-lg border border-slate-700 bg-slate-900 p-4">
            <div class="flex items-baseline justify-between gap-2 flex-wrap">
              <span class="text-2xl font-bold font-mono text-cyan-300">{{ active.form }}</span>
              <span class="text-xs text-slate-400">{{ active.period }}</span>
            </div>

            <div
              v-if="active.note"
              class="mt-3 text-xs rounded p-2 leading-relaxed"
              :class="active.broken
                ? 'bg-amber-500/10 text-amber-200 border border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'"
            >
              {{ active.note }}
            </div>

            <!-- 来源路径 -->
            <div class="mt-4">
              <div class="text-xs font-bold text-slate-400 mb-2">来源路径</div>
              <ol class="relative border-l-2 border-slate-700 ml-1.5 space-y-3">
                <li
                  v-for="(stage, i) in active.path"
                  :key="i"
                  class="ml-4 relative"
                >
                  <span
                    class="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-slate-900"
                    :class="stage.broken ? 'bg-amber-400' : 'bg-cyan-400'"
                  ></span>
                  <div class="flex items-baseline gap-2 flex-wrap">
                    <span class="text-xs font-bold text-slate-300">{{ stage.stage }}</span>
                    <span
                      v-if="stage.form"
                      class="text-sm font-mono"
                      :class="i === active.path.length - 1 ? 'text-cyan-300 font-bold' : 'text-slate-200'"
                    >{{ stage.form }}</span>
                    <span
                      v-else
                      class="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    >来源中断</span>
                    <span class="text-[10px] text-slate-500">{{ stage.period }}</span>
                  </div>
                  <p v-if="stage.note" class="text-[11px] text-amber-200/90 mt-1 leading-relaxed">
                    {{ stage.note }}
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <!-- 各语系同源词概览 -->
        <section>
          <h4 class="text-xs font-bold text-slate-400 mb-2">各语系同源词形</h4>
          <div class="space-y-2">
            <div
              v-for="f in detail.families"
              :key="f.familyId"
              class="rounded-lg border border-slate-700 bg-slate-900 p-3"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: familyColor(f.familyId) }"></span>
                <span class="text-sm font-bold text-slate-200">{{ f.familyName }}</span>
              </div>
              <!-- 语系整体缺项 -->
              <p v-if="f.missingReason" class="text-[11px] text-amber-200/90 leading-relaxed flex gap-1.5">
                <span class="text-amber-400 flex-shrink-0">⚠</span>
                <span>{{ f.missingReason }}</span>
              </p>
              <div v-else class="flex flex-wrap gap-1.5">
                <button
                  v-for="m in f.members"
                  :key="m.language"
                  class="px-2 py-1 rounded text-[11px] border transition-colors text-left"
                  :class="m.form
                    ? 'bg-slate-800 border-slate-600 hover:border-cyan-500'
                    : 'bg-slate-800/50 border-slate-700 hover:border-amber-500'"
                  :title="m.form ? `切换到${m.language}查看来源路径` : `切换到${m.language}查看缺失说明`"
                  @click="$emit('switch-language', m.language)"
                >
                  <span class="text-slate-400">{{ m.language }}：</span>
                  <span v-if="m.form" class="font-mono text-cyan-300">{{ m.form }}</span>
                  <span v-else class="text-amber-400/80">缺项</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- 本词条缺项汇总 -->
        <section v-if="gapLanguages.length">
          <h4 class="text-xs font-bold text-slate-400 mb-2">缺失说明</h4>
          <ul class="space-y-1.5">
            <li
              v-for="g in gapLanguages"
              :key="g.language"
              class="text-[11px] text-slate-300 bg-slate-900 border border-slate-700 rounded p-2 leading-relaxed"
            >
              <span class="text-amber-300 font-bold">{{ g.language }}</span>：{{ g.missingReason }}
            </li>
          </ul>
        </section>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'
import type { WordDetail, LanguageDetail } from '../types'
import { LANGUAGE_FAMILIES } from '../store/etymology'

const props = defineProps<{
  detail: WordDetail
  active: LanguageDetail
  /** 打开/切换词条时希望恢复到的滚动位置（从词表返回再进入时使用） */
  savedScrollTop?: number
}>()

defineEmits<{
  (e: 'back'): void
  (e: 'switch-language', language: string): void
}>()

const panelRef = ref<HTMLElement | null>(null)

const gapLanguages = computed(() =>
  props.detail.languages.filter(l => !l.form)
)

function familyColor(id: string): string {
  return LANGUAGE_FAMILIES.find(f => f.id === id)?.color ?? '#64748b'
}

function bodyEl(): HTMLElement | null {
  return panelRef.value?.querySelector('.flex-1.overflow-y-auto') ?? null
}

// 面板挂载：同一词条再次进入时恢复上次详情位置，否则从顶部开始
watch(panelRef, async el => {
  if (!el) return
  await nextTick()
  bodyEl()?.scrollTo({ top: props.savedScrollTop ?? 0 })
})

// 面板保持挂载期间切换到新词条：回到顶部，避免残留上一词条的浏览位置
watch(() => props.detail.root, async () => {
  if (!panelRef.value) return
  await nextTick()
  bodyEl()?.scrollTo({ top: 0 })
})
</script>
