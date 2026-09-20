import type { MissingInfo, SourceStep, WordDetail } from '../types'

/** 详情面板覆盖的语种（与同源词对照表列一致） */
export const DETAIL_LANGUAGES = ['英语', '法语', '德语', '西班牙语', '俄语', '拉丁语']

/** 各语种现代词所属时期 */
export const LANGUAGE_PERIODS: Record<string, string> = {
  '英语': '现代英语（约1500年至今）',
  '法语': '现代法语（约1600年至今）',
  '德语': '现代德语（约1650年至今）',
  '西班牙语': '现代西班牙语（约1500年至今）',
  '俄语': '现代俄语（约1800年至今）',
  '拉丁语': '古典拉丁语（约前75年–200年）',
}

// 演化阶段常用时期
const PIE = '约前4000年'
const PGMC = '约前500年'
const OE = '约700–1100年'
const ME = '约1100–1500年'
const MOD_EN = '约1500年至今'
const PITALIC = '约前1000年'
const LATIN = '约前75年–200年'
const VLATIN = '约200–600年'
const OFR = '约842–1400年'
const MOD_FR = '约1600年至今'
const OHG = '约750–1050年'
const MHG = '约1050–1350年'
const MOD_DE = '约1650年至今'
const OSP = '约1200–1500年'
const MOD_ES = '约1500年至今'
const PBSLAV = '约前1500年'
const PSLAV = '约500–900年'
const OES = '约1000–1400年'
const MOD_RU = '约1800年至今'

interface DetailSeed {
  root: string
  meaning: string
  cognates: Record<string, string | null>
  missing?: Record<string, MissingInfo>
  paths: Record<string, SourceStep[]>
  broken?: Record<string, string>
}

const SEEDS: DetailSeed[] = [
  // ── *pṓds 脚/足 ──────────────────────────────────────────────
  {
    root: '*pṓds',
    meaning: '脚/足',
    cognates: { '英语': 'foot', '法语': 'pied', '德语': 'Fuß', '西班牙语': 'pie', '俄语': 'ступня', '拉丁语': 'pēs' },
    paths: {
      '英语': [
        { stage: '*pṓds', language: '原始印欧语', period: PIE, note: '共同词根' },
        { stage: '*fōts', language: '原始日耳曼语', period: PGMC, note: 'Grimm定律：p→f' },
        { stage: 'fōt', language: '古英语', period: OE },
        { stage: 'fot / foot', language: '中古英语', period: ME },
        { stage: 'foot', language: '英语', period: MOD_EN },
      ],
      '法语': [
        { stage: '*pṓds', language: '原始印欧语', period: PIE },
        { stage: '*pods / *ped-', language: '原始意大利语族', period: PITALIC },
        { stage: 'pēs（属格 pedis）', language: '拉丁语', period: LATIN },
        { stage: '*pede', language: '通俗拉丁语', period: VLATIN, note: '源自宾格 pedem 的简化' },
        { stage: 'pié', language: '古法语', period: OFR },
        { stage: 'pied', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*pṓds', language: '原始印欧语', period: PIE },
        { stage: '*fōts', language: '原始日耳曼语', period: PGMC, note: 'Grimm定律：p→f' },
        { stage: 'fuoz', language: '古高地德语', period: OHG },
        { stage: 'vuoz', language: '中古高地德语', period: MHG },
        { stage: 'Fuß', language: '德语', period: MOD_DE },
      ],
      '西班牙语': [
        { stage: '*pṓds', language: '原始印欧语', period: PIE },
        { stage: 'pēs（属格 pedis）', language: '拉丁语', period: LATIN },
        { stage: '*pede', language: '通俗拉丁语', period: VLATIN },
        { stage: 'pie', language: '古西班牙语', period: OSP },
        { stage: 'pie', language: '西班牙语', period: MOD_ES },
      ],
      '俄语': [
        { stage: '*pṓds', language: '原始印欧语', period: PIE },
        { stage: '*stop-（踩踏）', language: '原始斯拉夫语', period: PSLAV, note: '语义由"足"转为"脚掌/台阶"' },
        { stage: 'ступня', language: '古东斯拉夫语', period: OES },
        { stage: 'ступня', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*pṓds', language: '原始印欧语', period: PIE },
        { stage: '*pēs / *pods', language: '原始意大利语族', period: PITALIC },
        { stage: 'pēs（属格 pedis）', language: '拉丁语', period: LATIN },
      ],
    },
    broken: {
      '俄语': '斯拉夫语阶段发生语义转移（足→脚掌/台阶），词形对应存疑，来源链不完整。',
    },
  },
  // ── *mātér 母亲 ─────────────────────────────────────────────
  {
    root: '*mātér',
    meaning: '母亲',
    cognates: { '英语': 'mother', '法语': 'mère', '德语': 'Mutter', '西班牙语': 'madre', '俄语': 'мать', '拉丁语': 'māter' },
    paths: {
      '英语': [
        { stage: '*mātér', language: '原始印欧语', period: PIE },
        { stage: '*mōdēr', language: '原始日耳曼语', period: PGMC },
        { stage: 'mōdor', language: '古英语', period: OE },
        { stage: 'moder / mother', language: '中古英语', period: ME },
        { stage: 'mother', language: '英语', period: MOD_EN },
      ],
      '法语': [
        { stage: '*mātér', language: '原始印欧语', period: PIE },
        { stage: 'māter（属格 mātris）', language: '拉丁语', period: LATIN },
        { stage: '*matre', language: '通俗拉丁语', period: VLATIN },
        { stage: 'mere', language: '古法语', period: OFR },
        { stage: 'mère', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*mātér', language: '原始印欧语', period: PIE },
        { stage: '*mōdēr', language: '原始日耳曼语', period: PGMC },
        { stage: 'muoter', language: '古高地德语', period: OHG },
        { stage: 'muoter', language: '中古高地德语', period: MHG },
        { stage: 'Mutter', language: '德语', period: MOD_DE },
      ],
      '西班牙语': [
        { stage: '*mātér', language: '原始印欧语', period: PIE },
        { stage: 'māter（属格 mātris）', language: '拉丁语', period: LATIN },
        { stage: '*matre', language: '通俗拉丁语', period: VLATIN },
        { stage: 'madre', language: '古西班牙语', period: OSP, note: '-tr- 浊化为 -dr-' },
        { stage: 'madre', language: '西班牙语', period: MOD_ES },
      ],
      '俄语': [
        { stage: '*mātér', language: '原始印欧语', period: PIE },
        { stage: '*mātēr', language: '原始波罗的-斯拉夫语', period: PBSLAV },
        { stage: '*mati', language: '原始斯拉夫语', period: PSLAV },
        { stage: 'мати', language: '古东斯拉夫语', period: OES },
        { stage: 'мать', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*mātér', language: '原始印欧语', period: PIE },
        { stage: '*mātēr', language: '原始意大利语族', period: PITALIC },
        { stage: 'māter（属格 mātris）', language: '拉丁语', period: LATIN },
      ],
    },
  },
  // ── *pṓtr 父亲 ──────────────────────────────────────────────
  {
    root: '*pṓtr',
    meaning: '父亲',
    cognates: { '英语': 'father', '法语': 'père', '德语': 'Vater', '西班牙语': 'padre', '俄语': 'отец', '拉丁语': 'pater' },
    paths: {
      '英语': [
        { stage: '*pṓtr', language: '原始印欧语', period: PIE },
        { stage: '*fadēr', language: '原始日耳曼语', period: PGMC, note: 'Grimm定律：p→f' },
        { stage: 'fæder', language: '古英语', period: OE },
        { stage: 'fader / father', language: '中古英语', period: ME },
        { stage: 'father', language: '英语', period: MOD_EN },
      ],
      '法语': [
        { stage: '*pṓtr', language: '原始印欧语', period: PIE },
        { stage: 'pater（属格 patris）', language: '拉丁语', period: LATIN },
        { stage: '*patre', language: '通俗拉丁语', period: VLATIN },
        { stage: 'pere', language: '古法语', period: OFR },
        { stage: 'père', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*pṓtr', language: '原始印欧语', period: PIE },
        { stage: '*fadēr', language: '原始日耳曼语', period: PGMC, note: 'Grimm定律：p→f' },
        { stage: 'fater', language: '古高地德语', period: OHG },
        { stage: 'vater', language: '中古高地德语', period: MHG },
        { stage: 'Vater', language: '德语', period: MOD_DE },
      ],
      '西班牙语': [
        { stage: '*pṓtr', language: '原始印欧语', period: PIE },
        { stage: 'pater（属格 patris）', language: '拉丁语', period: LATIN },
        { stage: '*patre', language: '通俗拉丁语', period: VLATIN },
        { stage: 'padre', language: '古西班牙语', period: OSP, note: '-tr- 浊化为 -dr-' },
        { stage: 'padre', language: '西班牙语', period: MOD_ES },
      ],
      '俄语': [
        { stage: '*pṓtr', language: '原始印欧语', period: PIE, note: '原始词形在斯拉夫语支失传' },
        { stage: '*otьcь', language: '原始斯拉夫语', period: PSLAV, note: '由 *ota（父亲）派生的替代形式' },
        { stage: 'отьць', language: '古东斯拉夫语', period: OES },
        { stage: 'отец', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*pṓtr', language: '原始印欧语', period: PIE },
        { stage: '*patēr', language: '原始意大利语族', period: PITALIC },
        { stage: 'pater（属格 patris）', language: '拉丁语', period: LATIN },
      ],
    },
    broken: {
      '俄语': '词根 *pṓtr 在斯拉夫语支中断，现代词 отец 为后起替代形式，非词根直系后裔。',
    },
  },
  // ── *h₂épo 水 ───────────────────────────────────────────────
  {
    root: '*h₂épo',
    meaning: '水',
    cognates: { '英语': 'aqua', '法语': 'eau', '德语': 'Au', '西班牙语': 'agua', '俄语': 'вода', '拉丁语': 'aqua' },
    paths: {
      '英语': [
        { stage: '*h₂épo', language: '原始印欧语', period: PIE },
        { stage: '*akʷā', language: '原始意大利语族', period: PITALIC },
        { stage: 'aqua', language: '拉丁语', period: LATIN },
        { stage: 'aqua', language: '中古英语（借词）', period: ME, note: '14世纪自拉丁语借入的学术词' },
        { stage: 'aqua', language: '英语', period: MOD_EN, note: '英语本族词为 water，aqua 多用于复合词' },
      ],
      '法语': [
        { stage: '*h₂épo', language: '原始印欧语', period: PIE },
        { stage: 'aqua', language: '拉丁语', period: LATIN },
        { stage: '*aqua /akwa/', language: '通俗拉丁语', period: VLATIN },
        { stage: 'ewe / iaue', language: '古法语', period: OFR, note: '三重元音化：aqua → eau' },
        { stage: 'eau', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*h₂épo', language: '原始印欧语', period: PIE },
        { stage: '*ahwō（流水/河洲）', language: '原始日耳曼语', period: PGMC },
        { stage: 'ouwa', language: '古高地德语', period: OHG },
        { stage: 'ouwe / awe', language: '中古高地德语', period: MHG, note: '语义转为"河滩草地"' },
        { stage: 'Au(e)', language: '德语', period: MOD_DE },
      ],
      '西班牙语': [
        { stage: '*h₂épo', language: '原始印欧语', period: PIE },
        { stage: 'aqua', language: '拉丁语', period: LATIN },
        { stage: '*aqua', language: '通俗拉丁语', period: VLATIN },
        { stage: 'agua', language: '古西班牙语', period: OSP, note: '辅音丛 -qu- 浊化为 -g-' },
        { stage: 'agua', language: '西班牙语', period: MOD_ES },
      ],
      '俄语': [
        { stage: '*h₂épo', language: '原始印欧语', period: PIE, note: '与 *wḗdr̥ 词族合流' },
        { stage: '*wodā', language: '原始斯拉夫语', period: PSLAV },
        { stage: 'вода', language: '古东斯拉夫语', period: OES },
        { stage: 'вода', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*h₂épo', language: '原始印欧语', period: PIE },
        { stage: '*akʷā', language: '原始意大利语族', period: PITALIC },
        { stage: 'aqua', language: '拉丁语', period: LATIN },
      ],
    },
    broken: {
      '俄语': 'вода 与 *wḗdr̥ 词族合流，究竟归属 *h₂épo 还是 *wédōr 存在争议，来源链不完整。',
    },
  },
  // ── *dʰómos 家 ──────────────────────────────────────────────
  {
    root: '*dʰómos',
    meaning: '家',
    cognates: { '英语': 'dome', '法语': 'maison', '德语': 'Dom', '西班牙语': 'domo', '俄语': 'дом', '拉丁语': 'domus' },
    paths: {
      '英语': [
        { stage: '*dʰómos', language: '原始印欧语', period: PIE },
        { stage: 'domus', language: '拉丁语', period: LATIN },
        { stage: 'dōme（圆顶）', language: '古法语/拉丁语借层', period: OFR },
        { stage: 'dome', language: '中古英语（借词）', period: ME, note: '16世纪经法语借入，语义转为"圆顶"' },
        { stage: 'dome', language: '英语', period: MOD_EN },
      ],
      '法语': [
        { stage: '*dʰómos', language: '原始印欧语', period: PIE },
        { stage: 'domus', language: '拉丁语', period: LATIN, note: '日常口语中被 mansio 取代' },
        { stage: 'mansio（停留/住所）', language: '通俗拉丁语', period: VLATIN, note: '词汇替换：domus → mansio' },
        { stage: 'maison', language: '古法语', period: OFR },
        { stage: 'maison', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*dʰómos', language: '原始印欧语', period: PIE },
        { stage: 'domus', language: '拉丁语', period: LATIN },
        { stage: 'dom（大教堂）', language: '古高地德语（借词）', period: OHG, note: '自拉丁语借入，语义窄化' },
        { stage: 'dom', language: '中古高地德语', period: MHG },
        { stage: 'Dom', language: '德语', period: MOD_DE, note: '现代仅指"主教座堂"' },
      ],
      '西班牙语': [
        { stage: '*dʰómos', language: '原始印欧语', period: PIE },
        { stage: 'domus', language: '拉丁语', period: LATIN },
        { stage: 'domo', language: '西班牙语（书面借词）', period: MOD_ES, note: '学术借词，日常用 casa' },
      ],
      '俄语': [
        { stage: '*dʰómos', language: '原始印欧语', period: PIE },
        { stage: '*domъ', language: '原始斯拉夫语', period: PSLAV },
        { stage: 'домъ', language: '古东斯拉夫语', period: OES },
        { stage: 'дом', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*dʰómos', language: '原始印欧语', period: PIE },
        { stage: '*domos', language: '原始意大利语族', period: PITALIC },
        { stage: 'domus', language: '拉丁语', period: LATIN },
      ],
    },
    broken: {
      '法语': '拉丁语阶段发生词汇替换（domus → mansio），现代词 maison 并非 *dʰómos 的直系词形后裔。',
    },
  },
  // ── *wḗdr̥ 水 ───────────────────────────────────────────────
  {
    root: '*wḗdr̥',
    meaning: '水/Water',
    cognates: { '英语': 'water', '法语': 'eau', '德语': 'Wasser', '西班牙语': null, '俄语': 'вода', '拉丁语': 'unda' },
    missing: {
      '西班牙语': { category: 'no-descendant', reason: '西班牙语对应词 onda 语义已转为"波浪"，未作为"水"的同源词收录。' },
    },
    paths: {
      '英语': [
        { stage: '*wḗdr̥', language: '原始印欧语', period: PIE },
        { stage: '*watōr', language: '原始日耳曼语', period: PGMC },
        { stage: 'wæter', language: '古英语', period: OE },
        { stage: 'water', language: '中古英语', period: ME },
        { stage: 'water', language: '英语', period: MOD_EN },
      ],
      '法语': [
        { stage: '*wḗdr̥', language: '原始印欧语', period: PIE, note: '对应关系存疑' },
        { stage: 'eau', language: '法语', period: MOD_FR, note: '实际源自拉丁语 aqua 系，见 *h₂épo 词条' },
      ],
      '德语': [
        { stage: '*wḗdr̥', language: '原始印欧语', period: PIE },
        { stage: '*watōr', language: '原始日耳曼语', period: PGMC },
        { stage: 'wazzar', language: '古高地德语', period: OHG },
        { stage: 'wazzer', language: '中古高地德语', period: MHG },
        { stage: 'Wasser', language: '德语', period: MOD_DE },
      ],
      '俄语': [
        { stage: '*wḗdr̥', language: '原始印欧语', period: PIE },
        { stage: '*wodā', language: '原始斯拉夫语', period: PSLAV },
        { stage: 'вода', language: '古东斯拉夫语', period: OES },
        { stage: 'вода', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*wḗdr̥', language: '原始印欧语', period: PIE },
        { stage: '*undā（波浪）', language: '原始意大利语族', period: PITALIC, note: '语义转为"波浪"' },
        { stage: 'unda', language: '拉丁语', period: LATIN },
      ],
    },
    broken: {
      '法语': 'eau 实际源自拉丁语 aqua（*h₂épo 系），与本词根 *wḗdr̥ 的对应关系不成立，来源链中断。',
    },
  },
  // ── *sol- 太阳 ──────────────────────────────────────────────
  {
    root: '*sol-',
    meaning: '太阳',
    cognates: { '英语': 'sun', '法语': 'soleil', '德语': 'Sonne', '西班牙语': 'sol', '俄语': 'солнце', '拉丁语': 'sol' },
    paths: {
      '英语': [
        { stage: '*sol- / *sóh₂wl̥', language: '原始印欧语', period: PIE },
        { stage: '*sunnōn', language: '原始日耳曼语', period: PGMC, note: '词根转换：-l- 系 → -n- 系' },
        { stage: 'sunne', language: '古英语', period: OE },
        { stage: 'sunne / sun', language: '中古英语', period: ME },
        { stage: 'sun', language: '英语', period: MOD_EN },
      ],
      '法语': [
        { stage: '*sol-', language: '原始印欧语', period: PIE },
        { stage: 'sōl（属格 sōlis）', language: '拉丁语', period: LATIN },
        { stage: '*soliculus（小太阳）', language: '通俗拉丁语', period: VLATIN, note: '小称形式取代原词' },
        { stage: 'soleil', language: '古法语', period: OFR },
        { stage: 'soleil', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*sol-', language: '原始印欧语', period: PIE },
        { stage: '*sunnōn', language: '原始日耳曼语', period: PGMC, note: '词根转换：-l- 系 → -n- 系' },
        { stage: 'sunna', language: '古高地德语', period: OHG },
        { stage: 'sunne', language: '中古高地德语', period: MHG },
        { stage: 'Sonne', language: '德语', period: MOD_DE },
      ],
      '西班牙语': [
        { stage: '*sol-', language: '原始印欧语', period: PIE },
        { stage: 'sōl（属格 sōlis）', language: '拉丁语', period: LATIN },
        { stage: 'sol', language: '古西班牙语', period: OSP },
        { stage: 'sol', language: '西班牙语', period: MOD_ES },
      ],
      '俄语': [
        { stage: '*sol-', language: '原始印欧语', period: PIE },
        { stage: '*slъnьce（小称）', language: '原始斯拉夫语', period: PSLAV, note: '小称形式，-l- 系保留' },
        { stage: 'слъньце', language: '古东斯拉夫语', period: OES },
        { stage: 'солнце', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*sol-', language: '原始印欧语', period: PIE },
        { stage: '*sāwōl', language: '原始意大利语族', period: PITALIC },
        { stage: 'sōl（属格 sōlis）', language: '拉丁语', period: LATIN },
      ],
    },
  },
  // ── *luks- 光/亮 ────────────────────────────────────────────
  {
    root: '*luks-',
    meaning: '光/亮',
    cognates: { '英语': 'light', '法语': 'lumière', '德语': 'Licht', '西班牙语': 'luz', '俄语': 'луч', '拉丁语': 'lux' },
    paths: {
      '英语': [
        { stage: '*luks- / *lewk-', language: '原始印欧语', period: PIE },
        { stage: '*leuhtą', language: '原始日耳曼语', period: PGMC, note: 'Grimm定律：k→h' },
        { stage: 'lēoht', language: '古英语', period: OE },
        { stage: 'light', language: '中古英语', period: ME },
        { stage: 'light', language: '英语', period: MOD_EN },
      ],
      '法语': [
        { stage: '*luks-', language: '原始印欧语', period: PIE },
        { stage: 'lūmen（属格 lūminis）', language: '拉丁语', period: LATIN, note: '词根扩展形式 *lewk-men-' },
        { stage: '*lūmināria（灯具）', language: '通俗拉丁语', period: VLATIN },
        { stage: 'lumiere', language: '古法语', period: OFR },
        { stage: 'lumière', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*luks-', language: '原始印欧语', period: PIE },
        { stage: '*leuhtą', language: '原始日耳曼语', period: PGMC, note: 'Grimm定律：k→h' },
        { stage: 'lioht', language: '古高地德语', period: OHG },
        { stage: 'liht', language: '中古高地德语', period: MHG },
        { stage: 'Licht', language: '德语', period: MOD_DE },
      ],
      '西班牙语': [
        { stage: '*luks-', language: '原始印欧语', period: PIE },
        { stage: 'lūx（属格 lūcis）', language: '拉丁语', period: LATIN },
        { stage: 'luz', language: '古西班牙语', period: OSP, note: '-ct- → -z-' },
        { stage: 'luz', language: '西班牙语', period: MOD_ES },
      ],
      '俄语': [
        { stage: '*luks-', language: '原始印欧语', period: PIE },
        { stage: '*lučь（光线）', language: '原始斯拉夫语', period: PSLAV, note: '语义窄化为"光束"' },
        { stage: 'лучь', language: '古东斯拉夫语', period: OES },
        { stage: 'луч', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*luks-', language: '原始印欧语', period: PIE },
        { stage: '*louks', language: '原始意大利语族', period: PITALIC },
        { stage: 'lūx（属格 lūcis）', language: '拉丁语', period: LATIN },
      ],
    },
  },
  // ── *nokʷt- 夜晚 ────────────────────────────────────────────
  {
    root: '*nokʷt-',
    meaning: '夜晚',
    cognates: { '英语': 'night', '法语': 'nuit', '德语': 'Nacht', '西班牙语': 'noche', '俄语': 'ночь', '拉丁语': 'nox' },
    paths: {
      '英语': [
        { stage: '*nokʷt- / *nókʷts', language: '原始印欧语', period: PIE },
        { stage: '*nahts', language: '原始日耳曼语', period: PGMC, note: 'Grimm定律：kʷ→h' },
        { stage: 'niht / neaht', language: '古英语', period: OE },
        { stage: 'night', language: '中古英语', period: ME },
        { stage: 'night', language: '英语', period: MOD_EN },
      ],
      '法语': [
        { stage: '*nokʷt-', language: '原始印欧语', period: PIE },
        { stage: 'nox（属格 noctis）', language: '拉丁语', period: LATIN },
        { stage: '*nocte', language: '通俗拉丁语', period: VLATIN },
        { stage: 'nuit', language: '古法语', period: OFR, note: '-ct- 腭化为 -it-' },
        { stage: 'nuit', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*nokʷt-', language: '原始印欧语', period: PIE },
        { stage: '*nahts', language: '原始日耳曼语', period: PGMC, note: 'Grimm定律：kʷ→h' },
        { stage: 'naht', language: '古高地德语', period: OHG },
        { stage: 'naht', language: '中古高地德语', period: MHG },
        { stage: 'Nacht', language: '德语', period: MOD_DE },
      ],
      '西班牙语': [
        { stage: '*nokʷt-', language: '原始印欧语', period: PIE },
        { stage: 'nox（属格 noctis）', language: '拉丁语', period: LATIN },
        { stage: '*nocte', language: '通俗拉丁语', period: VLATIN },
        { stage: 'noche', language: '古西班牙语', period: OSP, note: '-ct- 腭化为 -ch-' },
        { stage: 'noche', language: '西班牙语', period: MOD_ES },
      ],
      '俄语': [
        { stage: '*nokʷt-', language: '原始印欧语', period: PIE },
        { stage: '*noťь / *nočь', language: '原始斯拉夫语', period: PSLAV },
        { stage: 'ночь', language: '古东斯拉夫语', period: OES },
        { stage: 'ночь', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*nokʷt-', language: '原始印欧语', period: PIE },
        { stage: '*nokʷts', language: '原始意大利语族', period: PITALIC },
        { stage: 'nox（属格 noctis）', language: '拉丁语', period: LATIN },
      ],
    },
  },
  // ── *okʷ- 眼睛 ──────────────────────────────────────────────
  {
    root: '*okʷ-',
    meaning: '眼睛',
    cognates: { '英语': 'eye', '法语': 'oeil', '德语': 'Auge', '西班牙语': 'ojo', '俄语': 'oko', '拉丁语': 'oculus' },
    paths: {
      '英语': [
        { stage: '*okʷ- / *h₃ekʷ-', language: '原始印欧语', period: PIE },
        { stage: '*augō', language: '原始日耳曼语', period: PGMC },
        { stage: 'ēage', language: '古英语', period: OE },
        { stage: 'ye / eye', language: '中古英语', period: ME },
        { stage: 'eye', language: '英语', period: MOD_EN },
      ],
      '法语': [
        { stage: '*okʷ-', language: '原始印欧语', period: PIE },
        { stage: 'oculus（小称）', language: '拉丁语', period: LATIN },
        { stage: '*oclum', language: '通俗拉丁语', period: VLATIN },
        { stage: 'oil / ueil', language: '古法语', period: OFR },
        { stage: 'œil', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*okʷ-', language: '原始印欧语', period: PIE },
        { stage: '*augō', language: '原始日耳曼语', period: PGMC },
        { stage: 'ouga', language: '古高地德语', period: OHG },
        { stage: 'ouge', language: '中古高地德语', period: MHG },
        { stage: 'Auge', language: '德语', period: MOD_DE },
      ],
      '西班牙语': [
        { stage: '*okʷ-', language: '原始印欧语', period: PIE },
        { stage: 'oculus（小称）', language: '拉丁语', period: LATIN },
        { stage: '*oclum', language: '通俗拉丁语', period: VLATIN },
        { stage: 'ojo', language: '古西班牙语', period: OSP, note: '-cl- 腭化为 -j-' },
        { stage: 'ojo', language: '西班牙语', period: MOD_ES },
      ],
      '俄语': [
        { stage: '*okʷ-', language: '原始印欧语', period: PIE },
        { stage: '*oko', language: '原始斯拉夫语', period: PSLAV },
        { stage: 'око', language: '古东斯拉夫语', period: OES },
        { stage: 'oko', language: '俄语', period: MOD_RU, note: '现代口语中已被 глаз 取代，oko 为古语/诗语' },
      ],
      '拉丁语': [
        { stage: '*okʷ-', language: '原始印欧语', period: PIE },
        { stage: '*okelos（小称）', language: '原始意大利语族', period: PITALIC },
        { stage: 'oculus', language: '拉丁语', period: LATIN },
      ],
    },
  },
  // ── *ed- 吃 ─────────────────────────────────────────────────
  {
    root: '*ed-',
    meaning: '吃',
    cognates: { '英语': 'eat', '法语': null, '德语': 'essen', '西班牙语': null, '俄语': 'есть', '拉丁语': 'edere' },
    missing: {
      '法语': { category: 'no-descendant', reason: '古法语同源动词已消亡，现代法语 manger 源自拉丁语 mandūcāre（咀嚼），与本词根无谱系关系。' },
      '西班牙语': { category: 'broken-chain', reason: '现代西班牙语 comer 源自拉丁语复合词 comedere（com- + edere），与本词根仅为间接关系，未作为直接同源词收录。' },
    },
    paths: {
      '英语': [
        { stage: '*ed- / *h₁ed-', language: '原始印欧语', period: PIE },
        { stage: '*etaną', language: '原始日耳曼语', period: PGMC },
        { stage: 'etan', language: '古英语', period: OE },
        { stage: 'eten', language: '中古英语', period: ME },
        { stage: 'eat', language: '英语', period: MOD_EN },
      ],
      '德语': [
        { stage: '*ed-', language: '原始印欧语', period: PIE },
        { stage: '*etaną', language: '原始日耳曼语', period: PGMC },
        { stage: 'ezzan', language: '古高地德语', period: OHG, note: '高地德语辅音推移：t→zz' },
        { stage: 'ezzen', language: '中古高地德语', period: MHG },
        { stage: 'essen', language: '德语', period: MOD_DE },
      ],
      '俄语': [
        { stage: '*ed-', language: '原始印欧语', period: PIE },
        { stage: '*ěsti', language: '原始斯拉夫语', period: PSLAV },
        { stage: 'ѣсти', language: '古东斯拉夫语', period: OES },
        { stage: 'есть', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*ed-', language: '原始印欧语', period: PIE },
        { stage: '*edō', language: '原始意大利语族', period: PITALIC },
        { stage: 'edere', language: '拉丁语', period: LATIN },
      ],
    },
  },
  // ── *ǵneh₃- 知道 ────────────────────────────────────────────
  {
    root: '*ǵneh₃-',
    meaning: '知道',
    cognates: { '英语': 'know', '法语': null, '德语': 'kennen', '西班牙语': 'conocer', '俄语': 'знать', '拉丁语': 'gnoscere' },
    missing: {
      '法语': { category: 'not-attested', reason: '古法语 conoistre 为拉丁语 cognōscere 的直系后裔，但现代词形 connaître 未收录于本词库，标记为缺项。' },
    },
    paths: {
      '英语': [
        { stage: '*ǵneh₃-', language: '原始印欧语', period: PIE },
        { stage: '*knēaną', language: '原始日耳曼语', period: PGMC, note: '腭音软化：ǵ→k' },
        { stage: 'cnāwan', language: '古英语', period: OE },
        { stage: 'knowen', language: '中古英语', period: ME },
        { stage: 'know', language: '英语', period: MOD_EN, note: 'k- 于17世纪后停止发音' },
      ],
      '德语': [
        { stage: '*ǵneh₃-', language: '原始印欧语', period: PIE },
        { stage: '*kannjaną（使认识）', language: '原始日耳曼语', period: PGMC, note: '使役形式独立成词' },
        { stage: 'kennen', language: '古高地德语', period: OHG },
        { stage: 'kennen', language: '中古高地德语', period: MHG },
        { stage: 'kennen', language: '德语', period: MOD_DE, note: '"知道"义由 wissen 承担' },
      ],
      '西班牙语': [
        { stage: '*ǵneh₃-', language: '原始印欧语', period: PIE },
        { stage: 'gnōscere', language: '拉丁语', period: LATIN },
        { stage: 'cognōscere', language: '拉丁语（复合）', period: LATIN, note: '加前缀 con- 强化' },
        { stage: 'conocer', language: '古西班牙语', period: OSP },
        { stage: 'conocer', language: '西班牙语', period: MOD_ES },
      ],
      '俄语': [
        { stage: '*ǵneh₃-', language: '原始印欧语', period: PIE },
        { stage: '*znati', language: '原始斯拉夫语', period: PSLAV, note: 'ǵ→z' },
        { stage: 'знати', language: '古东斯拉夫语', period: OES },
        { stage: 'знать', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*ǵneh₃-', language: '原始印欧语', period: PIE },
        { stage: '*gnōskō', language: '原始意大利语族', period: PITALIC },
        { stage: 'gnōscere', language: '拉丁语', period: LATIN },
      ],
    },
  },
  // ── *h₃érō 鹰 ───────────────────────────────────────────────
  {
    root: '*h₃érō',
    meaning: '鹰',
    cognates: { '英语': 'eagle', '法语': 'aigle', '德语': 'Adler', '西班牙语': 'águila', '俄语': null, '拉丁语': 'aquila' },
    missing: {
      '俄语': { category: 'not-attested', reason: '俄语 орёл（源自原始斯拉夫语 *orьlъ）虽与本词根同源，但当前词库未收录该词形对应，标记为缺项。' },
    },
    paths: {
      '英语': [
        { stage: '*h₃érō', language: '原始印欧语', period: PIE },
        { stage: 'aquila', language: '拉丁语', period: LATIN },
        { stage: 'aigle', language: '古法语', period: OFR },
        { stage: 'egle / eagle', language: '中古英语（借词）', period: ME, note: '诺曼征服后借自古法语' },
        { stage: 'eagle', language: '英语', period: MOD_EN, note: '英语本族词为 earn（古语）' },
      ],
      '法语': [
        { stage: '*h₃érō', language: '原始印欧语', period: PIE },
        { stage: 'aquila', language: '拉丁语', period: LATIN },
        { stage: '*avīla / aigle', language: '通俗拉丁语', period: VLATIN },
        { stage: 'aigle', language: '古法语', period: OFR },
        { stage: 'aigle', language: '法语', period: MOD_FR },
      ],
      '德语': [
        { stage: '*h₃érō', language: '原始印欧语', period: PIE },
        { stage: '*arō', language: '原始日耳曼语', period: PGMC },
        { stage: 'aro', language: '古高地德语', period: OHG },
        { stage: 'adelar', language: '中古高地德语', period: MHG, note: '与 edel（高贵）发生民间词源混合' },
        { stage: 'Adler', language: '德语', period: MOD_DE },
      ],
      '西班牙语': [
        { stage: '*h₃érō', language: '原始印欧语', period: PIE },
        { stage: 'aquila', language: '拉丁语', period: LATIN },
        { stage: 'águla / águila', language: '古西班牙语', period: OSP },
        { stage: 'águila', language: '西班牙语', period: MOD_ES },
      ],
      '拉丁语': [
        { stage: '*h₃érō', language: '原始印欧语', period: PIE },
        { stage: '*akʷilā', language: '原始意大利语族', period: PITALIC },
        { stage: 'aquila', language: '拉丁语', period: LATIN },
      ],
    },
  },
  // ── *sker- 切割 ─────────────────────────────────────────────
  {
    root: '*sker-',
    meaning: '切割',
    cognates: { '英语': 'shear', '法语': null, '德语': 'scheren', '西班牙语': null, '俄语': 'резать', '拉丁语': 'scindere' },
    missing: {
      '法语': { category: 'no-descendant', reason: '古法语 escierre 已消亡，现代法语 couper 源自通俗拉丁语 *colpāre（击打），与本词根无谱系关系。' },
      '西班牙语': { category: 'no-descendant', reason: '现代西班牙语 cortar 源自拉丁语 curtāre（截短），与本词根无直接谱系，未收录。' },
    },
    paths: {
      '英语': [
        { stage: '*sker- / *(s)ker-', language: '原始印欧语', period: PIE },
        { stage: '*skeraną', language: '原始日耳曼语', period: PGMC },
        { stage: 'scieran', language: '古英语', period: OE },
        { stage: 'sheren', language: '中古英语', period: ME },
        { stage: 'shear', language: '英语', period: MOD_EN },
      ],
      '德语': [
        { stage: '*sker-', language: '原始印欧语', period: PIE },
        { stage: '*skeraną', language: '原始日耳曼语', period: PGMC },
        { stage: 'skeran', language: '古高地德语', period: OHG },
        { stage: 'scheren', language: '中古高地德语', period: MHG },
        { stage: 'scheren', language: '德语', period: MOD_DE },
      ],
      '俄语': [
        { stage: '*sker-', language: '原始印欧语', period: PIE, note: '谱系对应存疑' },
        { stage: '*rězati', language: '原始斯拉夫语', period: PSLAV, note: '词形更替，与 *(s)ker- 的关系有争议' },
        { stage: 'рѣзати', language: '古东斯拉夫语', period: OES },
        { stage: 'резать', language: '俄语', period: MOD_RU },
      ],
      '拉丁语': [
        { stage: '*sker-', language: '原始印欧语', period: PIE },
        { stage: '*skindō（鼻音中缀）', language: '原始意大利语族', period: PITALIC, note: '现在时词干插入鼻音 -n-' },
        { stage: 'scindere', language: '拉丁语', period: LATIN },
      ],
    },
    broken: {
      '俄语': 'резать 与 *(s)ker- 的谱系关系存在争议，中间演化环节缺失，来源链中断。',
    },
  },
  // ── *gʷen- 女人 ─────────────────────────────────────────────
  {
    root: '*gʷen-',
    meaning: '女人',
    cognates: { '英语': 'queen', '法语': null, '德语': 'Frau', '西班牙语': null, '俄语': 'жена', '拉丁语': null },
    missing: {
      '法语': { category: 'no-descendant', reason: '现代法语 femme 源自拉丁语 fēmina，与本词根无谱系关系。' },
      '西班牙语': { category: 'no-descendant', reason: '现代西班牙语 mujer 源自拉丁语 mulier，与本词根无谱系关系。' },
      '拉丁语': { category: 'no-descendant', reason: '拉丁语未保留该词根的独立名词形式，"女人"义由 fēmina / mulier 承担。' },
    },
    paths: {
      '英语': [
        { stage: '*gʷen- / *gʷénh₂', language: '原始印欧语', period: PIE },
        { stage: '*kwēniz', language: '原始日耳曼语', period: PGMC, note: '唇软腭音 gʷ→kw' },
        { stage: 'cwēn（女人/王后）', language: '古英语', period: OE },
        { stage: 'quene', language: '中古英语', period: ME, note: '语义升格为"王后"' },
        { stage: 'queen', language: '英语', period: MOD_EN },
      ],
      '德语': [
        { stage: '*gʷen-', language: '原始印欧语', period: PIE, note: '原始词形在德语中失传' },
        { stage: '*frawjō（女主人）', language: '原始日耳曼语', period: PGMC, note: '词汇替换：*kwēniz → *frawjō' },
        { stage: 'frouwa', language: '古高地德语', period: OHG },
        { stage: 'vrouwe', language: '中古高地德语', period: MHG },
        { stage: 'Frau', language: '德语', period: MOD_DE },
      ],
      '俄语': [
        { stage: '*gʷen-', language: '原始印欧语', period: PIE },
        { stage: '*ženā', language: '原始斯拉夫语', period: PSLAV, note: 'gʷ→ž（腭化）' },
        { stage: 'жена', language: '古东斯拉夫语', period: OES },
        { stage: 'жена', language: '俄语', period: MOD_RU },
      ],
    },
    broken: {
      '德语': '日耳曼语阶段发生词汇替换（*kwēniz → *frawjō），Frau 并非 *gʷen- 的直系词形后裔，来源链中断。',
    },
  },
]

/** 由种子数据生成的词条详情索引，键为 `${language}::${word}::${root}` */
export const WORD_DETAILS: Record<string, WordDetail> = {}

/** 按 `${language}::${word}` 的快捷索引（无词根上下文时使用，先出现的词根优先） */
const WORD_DETAILS_BY_FORM: Record<string, WordDetail> = {}

SEEDS.forEach(seed => {
  DETAIL_LANGUAGES.forEach(lang => {
    const word = seed.cognates[lang]
    if (!word || !seed.paths[lang]) return
    const cognates: Record<string, string | null> = {}
    const missing: Record<string, MissingInfo> = {}
    DETAIL_LANGUAGES.forEach(l => {
      if (l === lang) return
      cognates[l] = seed.cognates[l] ?? null
      if (!seed.cognates[l] && seed.missing?.[l]) missing[l] = seed.missing[l]
    })
    const detail: WordDetail = {
      id: lang + '::' + word + '::' + seed.root,
      word,
      language: lang,
      root: seed.root,
      family: 'ie',
      meaning: seed.meaning,
      period: LANGUAGE_PERIODS[lang],
      cognates,
      missing,
      sourcePath: seed.paths[lang],
      sourceBroken: !!seed.broken?.[lang],
      sourceBreakNote: seed.broken?.[lang],
    }
    WORD_DETAILS[detail.id] = detail
    const formKey = lang + '::' + word
    if (!WORD_DETAILS_BY_FORM[formKey]) WORD_DETAILS_BY_FORM[formKey] = detail
  })
})

export { WORD_DETAILS_BY_FORM }
