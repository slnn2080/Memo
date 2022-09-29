const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

// 配合css js兼容性处理
process.env.NODE_ENV = "production"

// 生成环境配置
module.exports = {
  // 多入口的写法
  entry: {
    main: "./index.js",
    test: "./assets/js/test.js"
  },

  // [name] 这里用了该方法来指定分别打包后的文件名
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build")
  },
  module: {
  },

  plugins: [
       new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "production"
}