<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <header class="border-b border-slate-700 px-6 py-4">
      <h1 class="text-2xl font-bold text-cyan-400">语言词源图谱与多语系演化追踪</h1>
      <p class="text-sm text-slate-500 mt-1">D3.js力导向图 · 印欧语系演化 · 同源词对照 · 500+词根</p>
    </header>
    <div class="p-4 space-y-4">
      <div class="grid lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-bold text-slate-400">词源力导向网络</h3>
            <div class="flex gap-3 text-xs">
              <span v-for="f in LANGUAGE_FAMILIES" :key="f.id" class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full" :style="{backgroundColor: f.color}"></span>{{ f.name }}
              </span>
            </div>
          </div>
          <svg ref="svgRef" class="w-full bg-slate-900 rounded" style="height:460px"></svg>
        </div>
        <div class="space-y-4">
          <div class="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 class="text-sm font-bold text-slate-400 mb-3">语系概览</h3>
            <div class="space-y-2">
              <div v-for="f in LANGUAGE_FAMILIES" :key="f.id" class="flex items-start gap-2 text-sm">
                <span class="w-3 h-3 rounded-full mt-0.5 flex-shrink-0" :style="{backgroundColor: f.color}"></span>
                <div><div class="font-bold">{{ f.name }}</div><div class="text-xs text-slate-500">{{ f.era }} · {{ f.languages.join('/') }}</div></div>
              </div>
            </div>
          </div>
          <div v-if="store.selectedNode" class="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 class="text-sm font-bold text-slate-400 mb-2">选中节点</h3>
            <div class="text-lg font-bold text-cyan-400">{{ store.selectedNode.word }}</div>
            <div class="text-sm text-slate-400">{{ store.selectedNode.language }} — {{ store.selectedNode.meaning }}</div>
            <button
              v-if="typeof store.selectedNode.rootId === 'number'"
              class="mt-3 px-3 py-1.5 text-xs rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
              @click="store.openDetailFromNode(store.selectedNode)"
            >
              {{ store.selectedNode.language === 'Proto-IE' ? '查看该词条详情' : `查看「${store.selectedNode.word}」详情` }}
            </button>
          </div>
          <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 text-xs text-slate-400">
            <h3 class="text-sm font-bold text-slate-400 mb-2">Grimm定律</h3>
            <div class="space-y-1">
              <div class="bg-slate-900 rounded p-2"><span class="text-cyan-400">p→f: </span>pater → father</div>
              <div class="bg-slate-900 rounded p-2"><span class="text-green-400">t→θ: </span>tres → three</div>
              <div class="bg-slate-900 rounded p-2"><span class="text-orange-400">k→h: </span>cord → heart</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 class="text-sm font-bold text-slate-400 mb-3">同源词对照表</h3>
        <div class="flex gap-2 mb-3">
          <input v-model="store.searchQuery" placeholder="搜索词根/含义..." class="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500" />
          <select v-model="store.selectedFamily" class="bg-slate-900 border border-slate-600 rounded px-2 text-sm text-slate-300">
            <option value="all">全部语系</option>
            <option v-for="f in LANGUAGE_FAMILIES" :key="f.id" :value="f.id">{{ f.name }}</option>
          </select>
        </div>
        <div ref="tableWrapRef" class="overflow-x-auto max-h-64 overflow-y-auto">
          <table class="w-full text-xs">
            <thead class="sticky top-0 bg-slate-700">
              <tr>
                <th class="px-2 py-2 text-left text-slate-300">词根</th>
                <th class="px-2 py-2 text-left text-slate-300">含义</th>
                <th class="px-2 py-2 text-left text-cyan-400">英语</th>
                <th class="px-2 py-2 text-left text-blue-400">法语</th>
                <th class="px-2 py-2 text-left text-green-400">德语</th>
                <th class="px-2 py-2 text-left text-orange-400">西班牙语</th>
                <th class="px-2 py-2 text-left text-purple-400">俄语</th>
                <th class="px-2 py-2 text-left text-yellow-400">拉丁语</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cs in store.filteredCognates" :key="cs.root" class="border-t border-slate-700 hover:bg-slate-700">
                <td class="px-2 py-1.5 font-mono text-slate-200 font-bold">
                  <button class="font-mono text-slate-200 font-bold hover:text-cyan-300 hover:underline" @click="openWord(cs.root)">
                    {{ cs.root }}
                  </button>
                </td>
                <td class="px-2 py-1.5 text-slate-400">{{ cs.meaning }}</td>
                <td v-for="lang in TABLE_LANGUAGES" :key="lang" class="px-2 py-1.5 font-mono">
                  <button
                    v-if="cs.languages[lang]"
                    class="hover:underline cursor-pointer"
                    :class="LANG_COLOR[lang]"
                    :title="`查看 ${cs.languages[lang]} 的来源路径（${lang}）`"
                    @click="openWord(cs.root, lang)"
                  >{{ cs.languages[lang] }}</button>
                  <button
                    v-else
                    class="text-amber-400/80 hover:text-amber-300"
                    title="该语种缺项，点击查看缺失说明"
                    @click="openWord(cs.root, lang)"
                  >缺项</button>
                </td>
              </tr>
              <tr v-if="store.filteredCognates.length === 0">
                <td :colspan="TABLE_LANGUAGES.length + 2" class="px-2 py-6 text-center text-slate-500">无匹配词条</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-[11px] text-slate-500 mt-2">提示：点击任一现代词形可打开词条详情，查看各语系同源词形、所属时期、来源路径与缺失说明；“缺项”亦可点开查看原因。</p>
      </div>
    </div>

    <!-- 词条详情面板：仅在打开时挂载，返回词表后卸载，不影响原图谱与词表浏览 -->
    <WordDetailView
      v-if="store.detailOpen && store.currentDetail && store.activeLanguageDetail"
      :detail="store.currentDetail"
      :active="store.activeLanguageDetail"
      :saved-scroll-top="detailScrollTop"
      @back="closeWord"
      @switch-language="store.setDetailLanguage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import { useEtymologyStore, LANGUAGE_FAMILIES } from './store/etymology'
import WordDetailView from './components/WordDetailView.vue'

const store = useEtymologyStore()
const svgRef = ref<SVGSVGElement | null>(null)
const tableWrapRef = ref<HTMLElement | null>(null)
const COLORS: Record<string, string> = { ie: '#3b82f6', st: '#22c55e', aa: '#f59e0b', ural: '#8b5cf6' }

const TABLE_LANGUAGES = ['英语', '法语', '德语', '西班牙语', '俄语', '拉丁语']
const LANG_COLOR: Record<string, string> = {
  '英语': 'text-cyan-300',
  '法语': 'text-blue-300',
  '德语': 'text-green-300',
  '西班牙语': 'text-orange-300',
  '俄语': 'text-purple-300',
  '拉丁语': 'text-yellow-300',
}

// 词表与详情面板的位置记录，保证“返回词表恢复原位置、再进详情恢复详情位置”
let tableScrollTop = 0
const detailScrollTop = ref<number | undefined>(undefined)

function captureDetailScroll() {
  const el = document.querySelector('.fixed aside .flex-1.overflow-y-auto')
  return el ? (el as HTMLElement).scrollTop : 0
}

function openWord(root: string, language?: string) {
  // 重新打开另一词条时清除旧详情的滚动位置
  if (store.detailRoot !== root) detailScrollTop.value = undefined
  tableScrollTop = tableWrapRef.value?.scrollTop ?? 0
  store.openDetail(root, language)
}

function closeWord() {
  detailScrollTop.value = captureDetailScroll()
  store.closeDetail()
  // 返回词表后恢复对照表原滚动位置
  requestAnimationFrame(() => {
    if (tableWrapRef.value) tableWrapRef.value.scrollTop = tableScrollTop
  })
}

function drawGraph() {
  if (!svgRef.value) return
  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()
  const W = svgRef.value.getBoundingClientRect().width || 700, H = 460
  const nodes = store.graph.nodes.map((n: any) => ({ ...n }))
  const links = store.graph.links.map((l: any) => ({ ...l }))
  const sim = d3.forceSimulation(nodes as any)
    .force('link', d3.forceLink(links as any).id((d: any) => d.id).distance(55))
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(W / 2, H / 2))
    .force('collision', d3.forceCollide(22))
  const g = svg.append('g')
  svg.call(d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.2, 3]).on('zoom', (e) => g.attr('transform', e.transform)) as any)
  const link = g.append('g').selectAll('line').data(links).join('line')
    .attr('stroke', '#475569').attr('stroke-width', 1).attr('opacity', 0.5)
  const node = g.append('g').selectAll('g').data(nodes).join('g')
    .call(d3.drag<any, any>()
      .on('start', (e, d: any) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
      .on('drag', (e, d: any) => { d.fx = e.x; d.fy = e.y })
      .on('end', (e, d: any) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null }))
    .on('click', (_: any, d: any) => { store.selectedNode = d })
    .style('cursor', (d: any) => typeof d.rootId === 'number' ? 'pointer' : 'default')
  node.append('circle')
    .attr('r', (d: any) => d.language === 'Proto-IE' ? 12 : 7)
    .attr('fill', (d: any) => COLORS[d.family] || '#64748b')
    .attr('stroke', '#1e293b').attr('stroke-width', 1.5)
  node.append('text').attr('dy', -14).attr('text-anchor', 'middle').attr('font-size', 9).attr('fill', '#e2e8f0')
    .text((d: any) => d.word.length > 8 ? d.word.slice(0, 8) + '…' : d.word)
  node.append('title').text((d: any) => `${d.word} (${d.language}): ${d.meaning}`)
  sim.on('tick', () => {
    link.attr('x1', (d: any) => d.source.x).attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x).attr('y2', (d: any) => d.target.y)
    node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
  })
}

onMounted(() => {
  setTimeout(drawGraph, 100)
  // 若刷新后自动恢复了详情面板，词表位置按顶部处理，无需额外滚动
})
</script>
