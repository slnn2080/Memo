const delayPromise = callback => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const res = callback && callback()
        resolve(res)
      }, 1000)
    } catch(e) {
      reject(e)
    }
  })
}

module.exports = delayPromise