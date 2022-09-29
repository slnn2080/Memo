const {resolve} = require("path")

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "~": resolve(__dirname, "public") 
      }
    }
  }
}