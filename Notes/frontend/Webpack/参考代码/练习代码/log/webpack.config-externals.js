const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")
module.exports = {
  entry: "./index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "production",

  // 指定的包 将不会打包进最终的文件中
  externals: {
    // key: 要忽略的库名, value: npm包下的包名
    jquery: "jquery",
  }
}

