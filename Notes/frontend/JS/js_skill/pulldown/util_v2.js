/* ---------- Filter Feature ---------- */

// 独立のpulldownフィルターした時に前結果としてデータをbackupします、
let _data = { }
let targetIndex = 1

// フィルター処理のメソッド
export function pulldownProcess(options) {
  _data = {}
  targetIndex = 1
  // eslint-disable-next-line
  let { actionQueue, target, source, raw, current } = options
  actionQueue = actionQueue.filter(item => Object.values(item).some(v => v != null))
  processQueue(actionQueue, target, source, raw)
  // 今回選択したフィールド値は元のリストをセットし直す
  if (current.fieldVal !== null) {
    target[current.fieldName] = [...current.fieldList]
  }
}

// 再帰関数: actionQueueから{k:v}をとって、execute関数でフィルター処理、処理した結果をつかって再度自分を呼ぶ
// prevResult == filterRawData
function processQueue(queue, target, source, prevResult) {
  if (queue.length === 0) {
    return
  }

  const item = queue[0]
  const result = execute(item, target, prevResult)
  targetIndex++
  const temp = queue.slice(1)
  processQueue(temp, target, source, result)
}

function execute(item, target, prevResult) {
  const result = Object.entries(item).reduce((acc, [key, value]) => {
    _data[targetIndex] = {}

    /*
      たとえば：
        simpleProcessedメソッドで処理したデータの形はいか通りに
      "workPlaceClass2": [
          "南棟",
          "北棟",
          "南棟",
          "北棟"
      ]

      backupメソッドは"南棟"のindexを計算して、「0,2」
      「0,2」のつかって、workclass1 2 3 ... をindex: 0 と index:2 のデータをとって、_dataに保存する
    */
    backup(value, prevResult, targetIndex)

    // _data(前のデータソース)から indexs(「0,2」)によってフィルター処理する
    const temp = findKeyword(value, prevResult)
    for (const key in temp) {
      if (temp[key] !== null) {
        temp[key] = temp[key].filter((item) => item !== '')
      }
    }
    target = Object.assign(target, temp)
    acc[targetIndex] = _data[targetIndex]
    return acc[targetIndex]
  }, {})

  return result
}

export function clearData() {
  _data = {}
  targetIndex = 1
}

// ++++++ Utils ++++++
function backup(lastItem, raw, level) {
  const indices = findKeywordForIndexs(lastItem, raw)
  for (const key in raw) {
    const vals = raw[key]
    const ret = []
    indices.forEach(index => {
      ret.push(vals[index])
    })
    _data[level][key] = ret
  }
}

// eslint-disable-next-line
function findKeywordForIndexs(keyword, data) {
  const indices = []
  for (const key in data) {
    const arr = data[key]
    const keyIndices = arr.reduce((acc, curr, index) => {
      if (curr === keyword) {
        acc.push(index)
      }
      return acc
    }, [])
    if (keyIndices.length > 0) {
      indices.push(...keyIndices)
    }
  }
  return indices
}

// eslint-disable-next-line
function findKeyword(keyword, data) {
  const indices = findKeywordForIndexs(keyword, data)

  const result = {}
  for (const key in data) {
    const arr = data[key]
    result[key] = indices.map(i => arr[i])
  }

  for (const key in result) {
    let v = [...new Set(result[key])]
    if (v[0] === '') {
      v = null
    }
    result[key] = v
  }

  return result
}
