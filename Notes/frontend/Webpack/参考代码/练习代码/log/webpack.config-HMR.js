const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")
module.exports = {
  // 当我们设置 devServer - hot: true 后 我们要将 html 文件也加入依赖树 不然不能热更新了
  entry: ["./index.js", "./src/index.html"],
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭es6模块化
          esModule: false,
          outputPath: 'imgs'
        }
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /\.(css|js|html)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development",

  // 服务器
  devServer: {
    contentBase: resolve(__dirname, "build"),
    port: 3000,
    compress: true,

    // 控制台上会有输出效果 [WDS] 96%
    // progress: true,

    // 开启 HMR 功能
    hot: true
  }
}