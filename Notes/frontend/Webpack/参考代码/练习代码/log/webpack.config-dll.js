const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")
const webpack = require("webpack")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")

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
    }),
    // 告诉webpack哪些库不参与打包 同时使用的时候名称也得变
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/manifest.json")
    }),
    // 将某个文件打包输出去 并在html中自动引入该文件
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, "dll/jquery.js")
    })
  ],
  mode: "production",
}


// npm i add-asset-html-webpack-plugin -D