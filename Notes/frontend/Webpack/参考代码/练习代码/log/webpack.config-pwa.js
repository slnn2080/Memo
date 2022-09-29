const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const WorkboxWebpackPlugin = require("workbox-webpack-plugin")

// 配合css js兼容性处理
process.env.NODE_ENV = "production"

// 生成环境配置
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
          MniCssExtractPlugin.loader,
          "css-loader",
          // css的兼容性处理 还需要在定义 browserslist
          {
            loader: "postcss-laoder",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")()
              ]
            }
          }
        ]
      },

      // less文件也需要做兼容性处理 位置倒数第二位
      {
        test: /\.less$/,
        use: [
          MniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-laoder",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")()
              ]
            }
          },
          // 经过less-loader就是css文件了
          "less-loader"
        ]
      },
      // js的语法检查 在package.json中要添加eslintConfig配置项
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // 图片的处理
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-laoder",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "imgs",
          esModule: false
        }
      },
      // 处理html结构中的图片
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // 处理其他资源s
      {
        exclude: /\.(js|jpg|png|gif|html|css|less)/,
        loader: "file-loader",
        options: {
          outputPath: "media"
        }
      }
    ]
  },
  plugins: [
    // 提取css文件
    new MniCssExtractPlugin({
      filename: "build.css"
    }),
    // html文件打包 以及 压缩
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    // 压缩css文件
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })

  ],
  // 压缩js
  mode: "development"
}