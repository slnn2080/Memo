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
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      // 图片的loader
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        // loader的配置项
        options: {
          // url-loader在打包图片的时候 并不是原封不动的输出 
          // 当发现图片大小 < 8kb 的时候 就会被 base64 处理 将图片转换为base64编码的方式 编码成字符串 浏览器解析这个字符串就会当做是图片的内容去解析
          // 优点: 减少请求数量(减轻服务器压力)
          // 缺点: 图片体积会更大(文件请求速度更慢) 一般不会对大图片进行base64的处理 一般在8-12kb以下会
          limit: 8 * 1024,

          // url-loader默认使用es6模块化解析 而html-loader引入图片是commjs 所以解析html-loader提供的数据就会报错(img src=[objectmodule]) 关闭url-loader的es6模块化 使用commonjs解析
          esModule: false,
          // 给图片进行重命名 取图片的hash值的前10位 [ext]取文件的原来的扩展名
          // name: "[hash:10].[ext]",
          // 原来图片的名字还可以这么设置
          name: "[name].[ext]"
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development"
}