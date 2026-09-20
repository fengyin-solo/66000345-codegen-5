import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { COGNATE_SETS, LANGUAGE_FAMILIES, buildGraph } from '../mock/data'
import { getWordDetail, defaultLanguage, IE_LANGUAGES } from '../mock/details'
export { LANGUAGE_FAMILIES, COGNATE_SETS, IE_LANGUAGES }

const STORAGE_KEY = 'etymology:last-word'

interface PersistedDetail {
  root: string
  language: string
}

function loadPersisted(): PersistedDetail | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedDetail
    if (typeof parsed.root !== 'string' || typeof parsed.language !== 'string') return null
    // 校验词根仍存在；语种也必须在可追踪范围内，否则回退到默认语种
    if (!getWordDetail(parsed.root)) return null
    return parsed
  } catch {
    return null
  }
}

export const useEtymologyStore = defineStore('etymology', () => {
  const graph = ref(buildGraph())
  const selectedNode = ref<any>(null)
  const searchQuery = ref('')
  const selectedFamily = ref('all')

  // 词条详情面板状态
  const detailRoot = ref<string | null>(null)
  const detailLanguage = ref<string>('英语')
  const detailOpen = ref(false)

  const filteredCognates = computed(() =>
    COGNATE_SETS.filter(cs => {
      const q = searchQuery.value.toLowerCase()
      const matchSearch = !q || cs.root.toLowerCase().includes(q) || cs.meaning.includes(q) || Object.values(cs.languages).some((w: string) => w.toLowerCase().includes(q))
      const matchFamily = selectedFamily.value === 'all' || cs.family === selectedFamily.value
      return matchSearch && matchFamily
    })
  )

  const currentDetail = computed(() =>
    detailRoot.value ? getWordDetail(detailRoot.value) : null
  )

  /** 当前在详情中选中的语种详情（缺项时同样返回该语种对象，不沿用上一词条信息） */
  const activeLanguageDetail = computed(() => {
    const detail = currentDetail.value
    if (!detail) return null
    return detail.languages.find(l => l.language === detailLanguage.value)
      ?? detail.languages.find(l => l.form)
      ?? detail.languages[0]
  })

  function persist() {
    if (!detailRoot.value) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        root: detailRoot.value,
        language: detailLanguage.value,
      } satisfies PersistedDetail))
    } catch {
      // 隐私模式等情况下写入失败不影响使用
    }
  }

  /**
   * 打开某个词根的词条详情。
   * 每次打开都以当前词条为准重新计算内容；指定 language 可直达某语种。
   */
  function openDetail(root: string, language?: string) {
    const detail = getWordDetail(root)
    if (!detail) return
    detailRoot.value = root
    detailLanguage.value = language && detail.languages.some(l => l.language === language)
      ? language
      : defaultLanguage(detail)
    detailOpen.value = true
    persist()
  }

  /** 在详情内切换语种；不改变词条，仅切换该词条下的语种视图 */
  function setDetailLanguage(language: string) {
    const detail = currentDetail.value
    if (!detail || !detail.languages.some(l => l.language === language)) return
    detailLanguage.value = language
    persist()
  }

  /** 返回词表：关闭详情面板，词表位置由调用方恢复 */
  function closeDetail() {
    detailOpen.value = false
  }

  /** 从图谱节点打开详情：根节点取默认语种，语言节点直达对应语种 */
  function openDetailFromNode(node: any) {
    if (typeof node.rootId !== 'number') return
    const cs = COGNATE_SETS[node.rootId]
    if (!cs) return
    const lang = node.language && IE_LANGUAGES.includes(node.language) ? node.language : undefined
    openDetail(cs.root, lang)
  }

  // 刷新后恢复最近查看的词条及其语种，并重新展开详情面板
  const persisted = loadPersisted()
  if (persisted) {
    detailRoot.value = persisted.root
    const detail = getWordDetail(persisted.root)
    detailLanguage.value = detail && detail.languages.some(l => l.language === persisted.language)
      ? persisted.language
      : (detail ? defaultLanguage(detail) : '英语')
    detailOpen.value = true
  }

  return {
    graph, selectedNode, searchQuery, selectedFamily, filteredCognates,
    detailRoot, detailLanguage, detailOpen, currentDetail, activeLanguageDetail,
    openDetail, setDetailLanguage, closeDetail, openDetailFromNode,
  }
})
