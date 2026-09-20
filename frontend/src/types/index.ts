export interface WordNode {
  id: string; word: string; language: string; meaning: string
  family: string; era?: string; x?: number; y?: number
  rootId?: number
}
export interface WordLink {
  source: string; target: string
  type: 'cognate' | 'derived' | 'borrowed' | 'reconstructed'
  description?: string
}
export interface CognateSet {
  root: string; meaning: string
  languages: Record<string, string>
  period: string; family: string
}
export interface LanguageFamily {
  id: string; name: string; color: string; languages: string[]; era: string
}

/** 来源演化路径上的一个阶段（断链时 broken 为真） */
export interface PathStage {
  /** 阶段名：原始印欧语 / 原始日耳曼语 / 古英语 / 中古英语 / 现代英语 等 */
  stage: string
  /** 该阶段词形；断链阶段为 null */
  form: string | null
  /** 该词形所属时期 */
  period: string
  /** 断链或借用、语义偏移等说明 */
  note?: string
  broken?: boolean
}

/** 单一语种在某个词根下的详情 */
export interface LanguageDetail {
  language: string
  /** 该语种现代词形；缺项时为 null */
  form: string | null
  /** 现代词形所属时期（如“现代英语 · 1500年至今”） */
  period: string
  /** 从词根到现代词形的来源路径 */
  path: PathStage[]
  /** 缺项原因（该语种无对应同源词时给出） */
  missingReason?: string
  /** 路径是否在某一阶段中断 */
  broken?: boolean
  /** 借用 / 语义偏移等额外说明 */
  note?: string
}

/** 一个语系内的同源词概览 */
export interface FamilyCognates {
  familyId: string
  familyName: string
  members: { language: string; form: string | null }[]
  /** 该语系整体缺项时的说明 */
  missingReason?: string
}

/** 某个现代词（词条）的完整详情 */
export interface WordDetail {
  root: string
  meaning: string
  rootPeriod: string
  languages: LanguageDetail[]
  families: FamilyCognates[]
}
