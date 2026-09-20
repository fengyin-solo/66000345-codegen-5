import type { LanguageDetail, PathStage, WordDetail, FamilyCognates } from '../types'
import { COGNATE_SETS, LANGUAGE_FAMILIES } from './data'

/** 印欧语系在详情中可追踪的现代语种（顺序即展示顺序） */
export const IE_LANGUAGES = ['英语', '法语', '德语', '西班牙语', '俄语', '拉丁语']

/** 各语种现代词形所属时期 */
const MODERN_PERIOD: Record<string, string> = {
  '英语': '现代英语 · 1500年至今',
  '法语': '现代法语 · 1500年至今',
  '德语': '现代高地德语 · 1650年至今',
  '西班牙语': '现代西班牙语 · 1500年至今',
  '俄语': '现代俄语 · 1700年至今',
  '拉丁语': '古典拉丁语 · 公元前75年–公元3世纪',
}

/** 语族阶段的默认时期标注 */
const PERIOD: Record<string, string> = {
  'PIE': '原始印欧语 · 约公元前4500–前2500年',
  'PGmc': '原始日耳曼语 · 约公元前500年–公元200年',
  'OE': '古英语 · 450–1100年',
  'ME': '中古英语 · 1100–1500年',
  'OHG': '古高地德语 · 约750–1050年',
  'MHG': '中古高地德语 · 1050–1350年',
  'PIt': '原始意大利语 · 约公元前1500–前1000年',
  'OL': '古拉丁语 · 约公元前3–前2世纪',
  'ML': '中世纪拉丁语 · 4–15世纪',
  'VL': '通俗拉丁语 · 约公元前200年–公元800年',
  'OF': '古法语 · 9–14世纪',
  'MidF': '中古法语 · 14–17世纪',
  'OSp': '古西班牙语 · 9–15世纪',
  'PSl': '原始斯拉夫语 · 约公元4–9世纪',
  'OCS': '古教会斯拉夫语 · 9–11世纪',
  'OR': '古俄语 · 11–17世纪',
}

const S: Record<string, string> = {
  PIE: '原始印欧语', PGmc: '原始日耳曼语', OE: '古英语', ME: '中古英语',
  OHG: '古高地德语', MHG: '中古高地德语',
  PIt: '原始意大利语', OL: '古拉丁语', ML: '中世纪拉丁语', VL: '通俗拉丁语',
  OF: '古法语', MidF: '中古法语', OSp: '古西班牙语',
  PSl: '原始斯拉夫语', OCS: '古教会斯拉夫语', OR: '古俄语',
}

/** 一个来源阶段的紧凑描述：[阶段代码, 词形, 备注?] */
type RawStage = [code: string, form: string | null, note?: string]

interface RawLang {
  /** 现代词形；为 null 表示该语种缺项 */
  form: string | null
  /** 词根之后到现代词形之间的阶段；不含 PIE 词根阶段（由构建器补） */
  stages: RawStage[]
  /** 缺项原因 */
  missingReason?: string
  /** 借用 / 语义偏移等整体说明 */
  note?: string
}

type RawRoot = {
  /** 每个语种：key 为语种名，value 为来源描述 */
  langs: Partial<Record<string, RawLang>>
}

/* ----------------------------------------------------------------------------
 * 词根详情原始数据
 * stages 中 form 为 null 的阶段表示来源在此中断；missingReason 表示整语种缺项
 * ------------------------------------------------------------------------- */

const RAW: Record<string, RawRoot> = {
  '*pṓds': { langs: {
    '英语':   { form: 'foot',   stages: [['PGmc','*fōts'], ['OE','fōt'], ['ME','foot']] },
    '德语':   { form: 'Fuß',    stages: [['PGmc','*fōts'], ['OHG','fuoz'], ['MHG','vuoz']] },
    '法语':   { form: 'pied',   stages: [['PIt','*peds'], ['OL','pēs'], ['VL','*pede'], ['OF','pié']] },
    '西班牙语': { form: 'pie',    stages: [['PIt','*peds'], ['OL','pēs'], ['VL','*pede'], ['OSp','pie']] },
    '俄语':   { form: 'ступня', stages: [['PSl',null,'原始斯拉夫语未保留 *pṓds 的直系后裔；表示“足”的词被替换'], ['OCS','ступня','改用表“脚掌”的后起词'], ['OR','ступня']],
                note: 'ступня 与 *pṓds 不同源，属替换后新造词。' },
    '拉丁语': { form: 'pēs',    stages: [['PIt','*peds'], ['OL','pēs']] },
  }},
  '*mātér': { langs: {
    '英语':   { form: 'mother', stages: [['PGmc','*mōdēr'], ['OE','mōdor'], ['ME','moder']] },
    '德语':   { form: 'Mutter', stages: [['PGmc','*mōdēr'], ['OHG','muoter'], ['MHG','muoter']] },
    '法语':   { form: 'mère',   stages: [['PIt','*mātēr'], ['OL','māter'], ['VL','*mātre'], ['OF','me(d)re']] },
    '西班牙语': { form: 'madre',  stages: [['PIt','*mātēr'], ['OL','māter'], ['VL','*mātre'], ['OSp','madre']] },
    '俄语':   { form: 'мать',   stages: [['PSl','*mati'], ['OCS','мати'], ['OR','мати']] },
    '拉丁语': { form: 'māter',  stages: [['PIt','*mātēr'], ['OL','māter']] },
  }},
  '*pṓtr': { langs: {
    '英语':   { form: 'father', stages: [['PGmc','*fader'], ['OE','fæder'], ['ME','fader']] },
    '德语':   { form: 'Vater',  stages: [['PGmc','*fader'], ['OHG','fater'], ['MHG','vater']] },
    '法语':   { form: 'père',   stages: [['PIt','*pətēr'], ['OL','pater'], ['VL','*patre'], ['OF','pere']] },
    '西班牙语': { form: 'padre',  stages: [['PIt','*pətēr'], ['OL','pater'], ['VL','*patre'], ['OSp','padre']] },
    '俄语':   { form: 'отец',   stages: [['PSl',null,'斯拉夫语族未直接继承 *pṓtr，而改用表“保护者/领主”的后起称谓'], ['OCS','отць'], ['OR','отецъ']],
                note: 'отец 与 *pṓtr 不同源，为语族内部新称谓。' },
    '拉丁语': { form: 'pater',  stages: [['PIt','*pətēr'], ['OL','pater']] },
  }},
  '*h₂épo': { langs: {
    '英语':   { form: 'aqua',   stages: [['PIt',null,'英语本族词 water 来自另一词根 *wódr̥；aqua 经拉丁语借入'], ['OL',null], ['ML','aqua','中世纪经书面语借入英语'], ['ME','aqua']],
                note: 'aqua 是拉丁语借词，并非英语直系传承。' },
    '法语':   { form: 'eau',    stages: [['PIt','*akʷā'], ['OL','aqua'], ['VL','*aqua'], ['OF','eaue'], ['MidF','eau']] },
    '德语':   { form: 'Au',     stages: [['PGmc',null,'日耳曼语族未传承该词根；Au 为本土河流地名后缀，与 *h₂épo 无关'], ['OHG','ouw','古高地德语中指“河滨湿地”']],
                note: 'Au（河漫滩/地名成分）与 aqua 仅为音义近似，来源链不成立。' },
    '西班牙语': { form: 'agua',   stages: [['PIt','*akʷā'], ['OL','aqua'], ['VL','*aqua'], ['OSp','agua']] },
    '俄语':   { form: 'вода',   stages: [['PSl',null,'斯拉夫语“水”继承自 *wódr̥ 而非 *h₂épo，本词根无对应词'], ['OCS','вода']],
                note: 'вода 同源英语 water，不属本词根。' },
    '拉丁语': { form: 'aqua',   stages: [['PIt','*akʷā'], ['OL','aqua']] },
  }},
  '*dʰómos': { langs: {
    '英语':   { form: 'dome',   stages: [['PGmc',null,'日耳曼语本族词（古英语 hām=home）未保留此义；dome 经意大利语/拉丁语借入'], ['OL',null], ['ML','doma','中世纪拉丁“穹顶”'], ['ME','dom']],
                note: 'dome 为拉丁借词，古义“房屋”已转为“穹顶”。' },
    '法语':   { form: 'maison', stages: [['PIt','*domos'], ['OL','domus'], ['VL','*mansio(nem)','通俗拉丁口语改用 mansio（驻留处），domus 退出日常用语'], ['OF','maison']],
                note: 'maison 源自 *mansio，与 *dʰómos 并非直系，属拉丁内部换词。' },
    '德语':   { form: 'Dom',    stages: [['PGmc',null,'日耳曼语本族词（Heim）未保留此义；Dom 为拉丁语借词'], ['OL',null], ['ML','domus','经教会拉丁“主教座堂”借入'], ['OHG','tuom']],
                note: 'Dom 现义“大教堂”，由“宅第”经教会拉丁转义而来。' },
    '西班牙语': { form: 'domo',   stages: [['PIt','*domos'], ['OL','domus'], ['VL','*domu'], ['OSp','domo']], note: 'domo 多作“穹顶”，日常“房屋”用 casa。' },
    '俄语':   { form: 'дом',    stages: [['PSl','*domъ'], ['OCS','домъ'], ['OR','домъ']] },
    '拉丁语': { form: 'domus',  stages: [['PIt','*domos'], ['OL','domus']] },
  }},
  '*wḗdr̥': { langs: {
    '英语':   { form: 'water',  stages: [['PGmc','*watar'], ['OE','wæter'], ['ME','water']] },
    '法语':   { form: 'onde',   stages: [['VL',null,'通俗拉丁用 *aqua 表示“水”，本词根 *unda 只保留“波浪”义'], ['OF','unde','古法语中仅指波浪'], ['MidF','onde']],
                note: '法语“水”eau 属 *h₂épo 词根；本词根仅余 onde（波浪），来源链在语义上中断。' },
    '德语':   { form: 'Wasser', stages: [['PGmc','*watar'], ['OHG','wazzar'], ['MHG','wasser']] },
    '西班牙语': { form: 'onda',   stages: [['PIt','*udōr'], ['OL','unda','拉丁语义已为“波浪”'], ['VL','*unda'], ['OSp','onda']],
                note: 'onda 义为“波浪”；西语“水”agua 属 *h₂épo，本词根源义中断。' },
    '俄语':   { form: 'вода',   stages: [['PSl','*voda'], ['OCS','вода'], ['OR','вода']] },
    '拉丁语': { form: 'unda',   stages: [['PIt','*udōr'], ['OL','unda']], note: 'unda 已由“水”转为“波浪”。' },
  }},
  '*sol-': { langs: {
    '英语':   { form: 'sun',    stages: [['PGmc','*sunnōn'], ['OE','sunne'], ['ME','sunne']] },
    '法语':   { form: 'soleil', stages: [['PIt','*sōl'], ['OL','sōl'], ['VL','*soliculum','通俗拉丁指小/日常形式'], ['OF','soleil']] },
    '德语':   { form: 'Sonne',  stages: [['PGmc','*sunnōn'], ['OHG','sunna'], ['MHG','sunne']] },
    '西班牙语': { form: 'sol',    stages: [['PIt','*sōl'], ['OL','sōl'], ['VL','*sol'], ['OSp','sol']] },
    '俄语':   { form: 'солнце', stages: [['PSl','*sъlnьce'], ['OCS','слъньце'], ['OR','солньце']] },
    '拉丁语': { form: 'sol',    stages: [['PIt','*sōl'], ['OL','sōl']] },
  }},
  '*luks-': { langs: {
    '英语':   { form: 'light',  stages: [['PGmc','*leuhtam'], ['OE','lēoht'], ['ME','light']] },
    '法语':   { form: 'lumière', stages: [['PIt','*louks'], ['OL','lūmen','拉丁改用 -men 名词形式'], ['VL','*lūminaria'], ['OF','lumiere']] },
    '德语':   { form: 'Licht',  stages: [['PGmc','*leuhtam'], ['OHG','lioht'], ['MHG','lieht']] },
    '西班牙语': { form: 'luz',    stages: [['PIt','*louks'], ['OL','lūx'], ['VL','*luce'], ['OSp','luz']] },
    '俄语':   { form: 'луч',    stages: [['PSl','*lučь'], ['OCS','лѫчъ'], ['OR','лучъ']], note: 'луч 今义偏“光线”；一般“光”用 свет。' },
    '拉丁语': { form: 'lux',    stages: [['PIt','*louks'], ['OL','lūx']] },
  }},
  '*nokʷt-': { langs: {
    '英语':   { form: 'night',  stages: [['PGmc','*nahts'], ['OE','neaht'], ['ME','night']] },
    '法语':   { form: 'nuit',   stages: [['PIt','*nokʷts'], ['OL','nox'], ['VL','*nocte'], ['OF','nuit']] },
    '德语':   { form: 'Nacht',  stages: [['PGmc','*nahts'], ['OHG','naht'], ['MHG','naht']] },
    '西班牙语': { form: 'noche',  stages: [['PIt','*nokʷts'], ['OL','nox'], ['VL','*nocte'], ['OSp','noche']] },
    '俄语':   { form: 'ночь',   stages: [['PSl','*noťь'], ['OCS','нощь'], ['OR','ночь']] },
    '拉丁语': { form: 'nox',    stages: [['PIt','*nokʷts'], ['OL','nox']] },
  }},
  '*okʷ-': { langs: {
    '英语':   { form: 'eye',    stages: [['PGmc','*augō','*augō 与 *okʷ- 的联系仅为假说，音变对应不完全'], ['OE','ēage'], ['ME','eye']],
                note: '日耳曼 *augō 与 *okʷ- 的同源关系学界有争议。' },
    '法语':   { form: 'oeil',   stages: [['PIt','*okʷelos'], ['OL','oculus'], ['VL','*oclu'], ['OF','uel']] },
    '德语':   { form: 'Auge',   stages: [['PGmc','*augō','与 *okʷ- 的对应未被普遍接受，来源链存疑'], ['OHG','ouga'], ['MHG','ouge']],
                note: '通常视作 *okʷ- 后裔，但词源联系未完全证实。' },
    '西班牙语': { form: 'ojo',    stages: [['PIt','*okʷelos'], ['OL','oculus'], ['VL','*oclu'], ['OSp','ojo']] },
    '俄语':   { form: 'око',    stages: [['PSl','*oko'], ['OCS','око'], ['OR','око','古俄语后期口语被转义词 глаз（本义“石子”）取代；око 退居书面/诗歌层']],
                note: '现代日常词为 глаз，око 为同源古语残留，日常使用层来源中断。' },
    '拉丁语': { form: 'oculus', stages: [['PIt','*okʷelos'], ['OL','oculus']] },
  }},
  '*ed-': { langs: {
    '英语':   { form: 'eat',    stages: [['PGmc','*etan'], ['OE','etan'], ['ME','eten']] },
    '法语':   { form: null, stages: [['VL',null,'通俗拉丁日常改用 mandūcāre（本义“咀嚼”），*edere 退出口语'], ['OF','mangier']],
                missingReason: '法语“吃”用 manger（源 mandūcāre），*ed- 直系词未保留。' },
    '德语':   { form: 'essen',  stages: [['PGmc','*etan'], ['OHG','ezzan'], ['MHG','ezzen']] },
    '西班牙语': { form: null, stages: [['VL',null,'通俗拉丁日常改用 mandūcāre'], ['OSp','manjar','后又被 comer（*comedere）取代，manjar 仅存“佳肴”义']],
                missingReason: '西语“吃”用 comer，*ed- 直系词未保留。' },
    '俄语':   { form: 'есть',   stages: [['PSl','*ěsti'], ['OCS','ѣсти'], ['OR','ѣсти']] },
    '拉丁语': { form: 'edere',  stages: [['PIt','*edō'], ['OL','edere']] },
  }},
  '*ǵneh₃-': { langs: {
    '英语':   { form: 'know',   stages: [['PGmc','*kunnan','*ǵneh₃- 使役态“使知道”→“能够/认识”'], ['OE','cnāwan'], ['ME','knowen']] },
    '法语':   { form: 'connaître', stages: [['PIt','*gnōskō'], ['OL','nōscere','早期拉丁已失去首音 g'], ['VL','*cognōscere','口语改用加前缀 co- 的形式'], ['OF','conoistre']],
                note: 'connaître 经由加缀形式 *cognōscere 传承，与 *ǵneh₃- 同源但非裸干直系。' },
    '德语':   { form: 'kennen', stages: [['PGmc','*kunnan'], ['OHG','kennen','由“能够”转“认识”'], ['MHG','kennen']] },
    '西班牙语': { form: 'conocer', stages: [['PIt','*gnōskō'], ['OL','nōscere'], ['VL','*cognōscere'], ['OSp','conocer']] },
    '俄语':   { form: 'знать',  stages: [['PSl','*znati'], ['OCS','знати'], ['OR','знати']] },
    '拉丁语': { form: 'gnoscere', stages: [['PIt','*gnōskō'], ['OL','(g)nōscere']] },
  }},
  '*h₃érō': { langs: {
    '英语':   { form: 'eagle',  stages: [['PIt',null,'日耳曼本族词（古英语 earn）未保留；eagle 经古法语借入'], ['OL','aquila'], ['VL','*aquila'], ['OF','aigle'], ['ME','egle']],
                note: 'eagle 为古法语借词，非英语本族传承。' },
    '法语':   { form: 'aigle',  stages: [['PIt','*akʷilos'], ['OL','aquila'], ['VL','*aquila'], ['OF','aigle']] },
    '德语':   { form: 'Adler',  stages: [['PGmc',null,'日耳曼语用复合词替代：*arō（鹰）+ 相关成分'], ['OHG','adalar','字面义“高贵的鹰”'], ['MHG','adler']],
                note: 'Adler 为日耳曼语内部新造复合词，与 *h₃érō 联系不直接。' },
    '西班牙语': { form: 'águila', stages: [['PIt','*akʷilos'], ['OL','aquila'], ['VL','*aquila'], ['OSp','águila']] },
    '俄语':   { form: null, stages: [['PSl',null,'斯拉夫语族使用本土词 *orьlъ（орёл），未传承 *h₃érō']],
                missingReason: '俄语“鹰”为 орёл（本土斯拉夫词），与 *h₃érō 不同源。' },
    '拉丁语': { form: 'aquila', stages: [['PIt','*akʷilos'], ['OL','aquila']] },
  }},
  '*sker-': { langs: {
    '英语':   { form: 'shear',  stages: [['PGmc','*skeran'], ['OE','scieran'], ['ME','scheren']] },
    '法语':   { form: null, stages: [['VL',null,'罗曼语用源自 *tondēre / *secāre 的词表示“切”，*sker- 无直系后裔'], ['OF','tailler','源拉丁 tāliāre']],
                missingReason: '法语“切割”用 tailler/couper，均非 *sker- 后裔。' },
    '德语':   { form: 'scheren', stages: [['PGmc','*skeran'], ['OHG','skeran'], ['MHG','scheren']] },
    '西班牙语': { form: null, stages: [['VL',null,'罗曼语用 *secāre 表示“切”'], ['OSp','cortar','源拉丁 *curtāre']],
                missingReason: '西语“切”用 cortar（*curtāre），*sker- 无对应词。' },
    '俄语':   { form: 'резать', stages: [['PSl','*rezati'], ['OCS','рѣзати'], ['OR','рѣзати']], note: 'резatь 与 *sker- 的归属存在不同构拟，常单列。' },
    '拉丁语': { form: 'scindere', stages: [['PIt','*skidō'], ['OL','scindere','加鼻音中缀形式']] },
  }},
  '*gʷen-': { langs: {
    '英语':   { form: 'queen',  stages: [['PGmc','*kweniz','由“女人”转为“国王之妻/王后”'], ['OE','cwēn'], ['ME','queen']] },
    '法语':   { form: 'femme',  stages: [['VL',null,'通俗拉丁用 fēmina 表示“女人”，*gʷen- 直系词未在罗曼语中存续'], ['OF','femme','换源后的形式沿用至今']],
                note: 'femme 源拉丁 fēmina（词根*dʰeh₁-“哺乳”），不属 *gʷen-，来源链在罗曼语阶段中断。' },
    '德语':   { form: 'Frau',   stages: [['OHG','frouwa','古高地德语词，词根为“高贵的妇人”，与 *gʷen- 无直接对应'], ['MHG','frouwe']],
                note: 'Frau 为日耳曼语内部后起尊称词，非 *gʷen- 直系（古高德语 quin(a) 才是该词根遗存）。' },
    '西班牙语': { form: 'mujer',  stages: [['VL',null,'通俗拉丁用 mulier 表示“女人”，*gʷen- 直系词未在罗曼语中存续'], ['OSp','muger','换源后的形式']],
                note: 'mujer 源拉丁 mulier，来源链在罗曼语阶段中断。' },
    '俄语':   { form: 'жена',   stages: [['PSl','*žena'], ['OCS','жена'], ['OR','жена']], note: 'жена 今义偏“妻子”；一般“女人”用 женщина。' },
    '拉丁语': { form: null, stages: [['PIt',null,'拉丁语支未保留 *gʷen-，而用 fēmina / mulier']],
                missingReason: '拉丁语用 fēmina、mulier 表示“女人”，无 *gʷen- 同源词。' },
  }},
}

/** 语系整体缺项时的说明（非印欧语系与本批 PIE 词根均无可证同源关系） */
const FAMILY_GAP: Record<string, string> = {
  st: '本词根为印欧语系构拟形，与汉藏语系词汇无已证实的同源关系；现有比较证据不足以建立规则对应。',
  aa: '亚非语系语言年代久远、词根形态与印欧语系差异显著，二者通常视为无关语系；本词根无可靠同源词。',
  ural: '乌拉尔语系为独立语系，基本词与印欧语系的相似多为偶然或早期借词，本词根无可确认的同源词。',
}

function buildPath(root: string, raw: RawLang): { path: PathStage[]; broken: boolean } {
  const path: PathStage[] = [
    { stage: S.PIE, form: root, period: PERIOD.PIE },
  ]
  let broken = false
  for (const [code, form, note] of raw.stages) {
    const isGap = form === null
    if (isGap) broken = true
    path.push({
      stage: S[code] || code,
      form,
      period: PERIOD[code] || '',
      note: note || (isGap ? '该阶段来源中断' : undefined),
      broken: isGap || undefined,
    })
  }
  return { path, broken }
}

const detailCache = new Map<string, WordDetail>()

/** 获取某个词根的完整词条详情 */
export function getWordDetail(root: string): WordDetail | null {
  const cs = COGNATE_SETS.find(c => c.root === root)
  if (!cs) return null
  const cached = detailCache.get(root)
  if (cached) return cached

  const raw = RAW[root]
  const languages: LanguageDetail[] = IE_LANGUAGES.map(lang => {
    const form = cs.languages[lang] ?? null
    const r = raw?.langs[lang]
    if (!r) {
      return {
        language: lang, form,
        period: form ? (MODERN_PERIOD[lang] || '现代') : '',
        path: [{ stage: S.PIE, form: root, period: PERIOD.PIE }],
        ...(form ? {} : { missingReason: `该语料集中“${lang}”暂缺本词条的对应词形。` }),
      }
    }
    const { path, broken } = buildPath(root, r)
    const detail: LanguageDetail = {
      language: lang,
      form: r.form,
      period: r.form ? (MODERN_PERIOD[lang] || '现代') : '',
      path,
      broken: broken || undefined,
      note: r.note,
      missingReason: r.missingReason,
    }
    return detail
  })

  // 语系概览：印欧语系按语料；其他语系整体标缺项及原因
  const families: FamilyCognates[] = LANGUAGE_FAMILIES.map(f => {
    if (f.id === 'ie') {
      return {
        familyId: f.id, familyName: f.name,
        members: IE_LANGUAGES.map(lang => ({
          language: lang,
          form: cs.languages[lang] ?? null,
        })),
      }
    }
    return {
      familyId: f.id, familyName: f.name,
      members: f.languages.map(language => ({ language, form: null })),
      missingReason: FAMILY_GAP[f.id],
    }
  })

  const detail: WordDetail = {
    root: cs.root,
    meaning: cs.meaning,
    rootPeriod: PERIOD.PIE,
    languages,
    families,
  }
  detailCache.set(root, detail)
  return detail
}

/** 默认打开详情时选中的语种：优先取该词条中第一个有词形的语种 */
export function defaultLanguage(detail: WordDetail): string {
  return detail.languages.find(l => l.form)?.language ?? detail.languages[0].language
}
