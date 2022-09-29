const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")
module.exports = {
  entry: "./src/index.js",
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

      // 打包其他资源(除了html js css以外的资源)
      {
        // 排除 正则匹配的文件 相当于打包其他资源
        exclude: /\.(css|js|html)$/,
        // 其他资源都会通过file-loader来处理
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
    // 项目构建后的路径
    contentBase: resolve(__dirname, "build"),
    port: 3000,
    // 启动 gzip 压缩
    compress: true,
    // open: true,
    progress: true
  }
}