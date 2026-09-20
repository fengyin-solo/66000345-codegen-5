export interface WordNode {
  id: string; word: string; language: string; meaning: string
  family: string; era?: string; x?: number; y?: number
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

/** 同源词缺项原因分类：无后裔词 / 来源链中断 / 词库未收录 */
export type MissingCategory = 'no-descendant' | 'broken-chain' | 'not-attested'

export interface MissingInfo {
  category: MissingCategory
  reason: string
}

/** 来源路径中的一个演化阶段 */
export interface SourceStep {
  stage: string      // 该阶段的词形
  language: string   // 所属语言/语支
  period: string     // 所属时期
  note?: string      // 音变或形态说明
}

/** 词条详情：同源词形、所属时期、来源路径与缺失说明 */
export interface WordDetail {
  id: string                            // `${language}::${word}::${root}`
  word: string
  language: string
  root: string                          // 所属词根（区分同一词形属于不同词根的情况）
  family: string
  meaning: string
  period: string                        // 该词所属时期
  cognates: Record<string, string | null>   // 各语种同源词形，缺项为 null
  missing: Record<string, MissingInfo>      // 缺项语种的原因说明
  sourcePath: SourceStep[]                  // 来源路径（词根 → 现代词）
  sourceBroken: boolean                     // 来源链是否中断
  sourceBreakNote?: string                  // 中断原因说明
}
