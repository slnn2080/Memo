
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")

module.exports = {

  // 入口起点 指示webpack以哪个文件为起点开始打包的
  entry: "./src/index.js",

  // 输出到哪里
  output: {
    // 输出到的文件名
    filename: "build.js",
    // 输出的路径 这里我们会利用path模块来写绝对路径]
    // __dirname: nodejs的变量代表当前文件的目录的绝对路径 
    path: resolve(__dirname, "build")
  },


  // loader的配置 
  module: {
    rules: [
      // 写详细的loader配置
      {
        // 匹配的文件 值通常为正则表达式 以.css结尾的文件
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },

  // 配置插件 loader帮webpack做翻译 插件帮助webpack扩展功能
  plugins: [
    // 写详细的插件配置
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],

  // 模式
  mode: "development",
  // mode: "production"
}