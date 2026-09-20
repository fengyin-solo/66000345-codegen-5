import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { COGNATE_SETS, LANGUAGE_FAMILIES, buildGraph, getWordDetail } from '../mock/data'
import type { WordDetail } from '../types'
export { LANGUAGE_FAMILIES, COGNATE_SETS }

const DETAIL_STORAGE_KEY = 'etymology:last-detail'

export const useEtymologyStore = defineStore('etymology', () => {
  const graph = ref(buildGraph())
  const selectedNode = ref<any>(null)
  const searchQuery = ref('')
  const selectedFamily = ref('all')

  // ── 词条详情追踪 ─────────────────────────────────────────────
  /** 当前详情词条，整体替换，绝不沿用上一词条的字段 */
  const detailWord = ref<WordDetail | null>(null)
  /** 详情面板滚动位置及其所属词条，用于返回词表后恢复原位置 */
  const detailScrollTop = ref(0)
  const detailScrollFor = ref('')

  function persistDetail() {
    try {
      if (detailWord.value) {
        localStorage.setItem(DETAIL_STORAGE_KEY, JSON.stringify({ word: detailWord.value.word, language: detailWord.value.language, root: detailWord.value.root }))
      } else {
        localStorage.removeItem(DETAIL_STORAGE_KEY)
      }
    } catch { /* localStorage 不可用时静默降级 */ }
  }

  /** 打开任一现代词的详情；root 用于区分同一词形属于不同词根的情况 */
  function openWordDetail(word: string, language: string, root?: string) {
    const detail = getWordDetail(word, language, root)
    if (!detail) return
    detailWord.value = detail
    persistDetail()
  }

  /** 在详情内切换语种继续查看（沿用当前词根上下文）；该语种缺项时不跳转 */
  function selectDetailLanguage(language: string) {
    const cur = detailWord.value
    if (!cur) return
    const word = cur.cognates[language]
    if (!word) return
    openWordDetail(word, language, cur.root)
  }

  /** 关闭详情，返回词表 */
  function closeWordDetail() {
    detailWord.value = null
    persistDetail()
  }

  /** 记录详情面板滚动位置 */
  function saveDetailScroll(top: number) {
    if (!detailWord.value) return
    detailScrollTop.value = top
    detailScrollFor.value = detailWord.value.id
  }

  /** 刷新后恢复最近查看的词条 */
  function restoreDetail() {
    try {
      const raw = localStorage.getItem(DETAIL_STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw)
      if (!saved || typeof saved.word !== 'string' || typeof saved.language !== 'string') return
      const detail = getWordDetail(saved.word, saved.language, typeof saved.root === 'string' ? saved.root : undefined)
      if (detail) detailWord.value = detail
    } catch { /* 数据损坏时忽略 */ }
  }
  restoreDetail()

  const filteredCognates = computed(() =>
    COGNATE_SETS.filter(cs => {
      const q = searchQuery.value.toLowerCase()
      const matchSearch = !q || cs.root.toLowerCase().includes(q) || cs.meaning.includes(q) || Object.values(cs.languages).some((w: string) => w.toLowerCase().includes(q))
      const matchFamily = selectedFamily.value === 'all' || cs.family === selectedFamily.value
      return matchSearch && matchFamily
    })
  )

  return {
    graph, selectedNode, searchQuery, selectedFamily, filteredCognates,
    detailWord, detailScrollTop, detailScrollFor,
    openWordDetail, selectDetailLanguage, closeWordDetail, saveDetailScroll,
  }
})
