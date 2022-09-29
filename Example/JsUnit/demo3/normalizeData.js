const getData = require("./getData")

const normalizeData = () => {

  const data = getData()

  return {
    status: 0,
    data
  }
}

module.exports = normalizeData