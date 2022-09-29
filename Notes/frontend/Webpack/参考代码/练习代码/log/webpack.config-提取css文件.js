const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = {
  entry: "./index.js",

  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 创建style标签 将样式放入
          // "style-loader", 

          // 这个loader取代style-loader 作用: 提取js中css成单独文件
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/build.css"
    })
  ],

  mode: "development"
}