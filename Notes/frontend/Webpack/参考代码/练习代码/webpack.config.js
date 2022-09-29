const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./index.js",
  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development",

  resolve: {
    alias: { 
      "@js": resolve(__dirname, "assets/js"),
      "@css": resolve(__dirname, "assets/style")
    },

    extensions: [".js", ".json", ".css"],
    modules: ["node_modules"]
  },

  optimization: {
    splitChunks: {
      chunks: "all",

      // 分割的chunk最小为30kb 当大于30kb的时候才开始分割 小于30kb就不分割了
      miniSize: 30 * 1024,

      // 0为默认值 最大没有限制
      maxSize: 0,

      // 要提取的chunk最少被引用一次 如果一次都没有被引用说明这个模块不是依赖 那就不用提取了
      minChunks: 1,

      // 按需加载时并行加载的文件数量最大为5 超过5个就不会打包成单独的chunk了 只能最多打包5个
      maxAsyncRequests: 5,

      // 入口js文件最大并行请求数量
      maxInitialRequests: 3,

      // 名称连接符
      automaticNameDelimiter: "~",

      // 可以使用命名规则
      name: true,

      // 分割chunk的组 有一组就有一个chunk 有二组就有二个chunk 每组有自己的分割的规则
      cacheGroups: {
        // vendors组 - 也就将来打包后的名字
        vendors: {
          // vendors组 node_modules 下面的文件会被打包到 vendors组的chunk 中
          // 这个chunk的命名为 vendors~xxx.js
          test: /[\\/]node_modules[\\/]/,

          // 打包的
          priority: -10
        },

        // default组
        default: {
          // 要提取的chunk最少要被引用2次
          minChunks: 2,
          priority: -20,

          // 如果当前要打包的模块 和 之前已经被提取的模块是同一个 就会复用 而不是重新打包模块
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      // 返回值是命名规则: 
      name: entrypoint => `runtime-${entrypoint.name}`
    },

    // 配置生产环境的压缩方案: js 和 css
    // 当版本升级到 4.26 以上的时候 压缩的时候使用的是 terser 这个库 如果我们想配置 terser这个库的方案 就可以用这个配置项
    minimizer: {

    }


  }

}