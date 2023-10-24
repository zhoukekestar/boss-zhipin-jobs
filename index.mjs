import nodejieba from 'nodejieba'
import fs from 'fs'
import getDetailList from './detail/fe_hz_20k-50k/get.mjs'

const { cut, load } = nodejieba

load({
  userDict: './userdict.utf8'
})

function processDesc (txt) {
  const rTec = /[a-zA-Z]{2,}/g

  // 两字英文字符以上则为技术关键词
  const englishWordsList = txt.match(rTec) || []

  // 替换完关键词后的文本
  const newTxt = txt.replace(rTec, '    ')

  // 忽略列表
  const IGNORE_LIST = [
    '，',
    '：',
    '；',
    '。',
    ',',
    '.',
    '、',
    '/',
    '【',
    '】',
    '的',
    '和',
    '或'
  ]

  // 分词，并去除空字符串
  const cutResult = cut(newTxt)
    .filter(t => !!t.trim())
    .filter(t => IGNORE_LIST.indexOf(t) === -1)
    // 去除单个纯数字的
    .filter(t => !/^\d$/.test(t))

  return englishWordsList.concat(cutResult)
}

!(async () => {
  let result = []
  let resultSet = {}

  const detailList = await getDetailList()

  detailList.forEach(item => {
    result = result.concat(processDesc(item.jobDesc))
  })
  fs.writeFileSync(
    new URL('./result/list.json', import.meta.url),
    JSON.stringify(result, null, 2)
  )

  // 统计关键词次数，并按出现次数排序
  result.forEach(k => {
    // 技术关键词，统一为小写，并做相关合并
    const lowerK = k.toLowerCase();
    if (!resultSet[lowerK]) resultSet[lowerK] = 1
    resultSet[lowerK]++
  })

  let setResult = []
  Object.keys(resultSet).map(keyword => {
    setResult.push({ keyword, times: resultSet[keyword] })
  })
  setResult = setResult.sort((a, b) => b.times - a.times)

  fs.writeFileSync(
    new URL('./result/rank.json', import.meta.url),
    JSON.stringify(setResult, null, 2)
  )

  fs.writeFileSync(
    new URL('./result/rank_tec.json', import.meta.url),
    JSON.stringify(setResult.filter(t => /^[a-zA-Z]+$/.test(t.keyword)), null, 2)
  )
})()
