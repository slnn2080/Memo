const { resolve } = require('path');
// 引入webpack自带的插件webpack
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> 是jquery
    // ["jquery"] 要打包的库名是jquery 因为是个数组 跟jquery相关的库都可以写里面
    jquery: ["jquery"]
  },
  output: {
    // 打包后的名字 指定为 jquery
    filename: "[name].js",
    // 将单独打包的库 打包到dll目录下
    path: resolve(__dirname, "dll"),
    // 打包的库里面向外暴露出去的内容叫什么名字
    library: "[name]_[hash:5]"
  },

  // 上面的两个配置是用来专门打包jquery的 同时jquery向外暴露的名称是"[name]_[hash:5]"


  // 上面我们将jquery单独进行打包 但是需要跟webpack建立起依赖关系 需要告诉webpack将来你在打包的时候 不要再打包jquery了 这时候我们要借助一个插件生成一个文件
  plugins: [
    // 这个插件的作用是帮我们生成一个 manifest.json 文件 该文件提供和jquery的一个映射关系 通过这个映射就能知道 webpack在打包的时候 就不用打包jquery了 并且告诉我们不需要打包的包的名称是 [name]_[hash:5]
    new webpack.DllPlugin({
      // 这个name要和上面 libray 中的值一样
      name: "[name]_[hash:5]", // 映射库的暴露的内容是什么,
      // 最终这个文件输出到哪里去
      path: resolve(__dirname, "dll/manifest.json") 
    })
  ],

  // 指定生产模式
  mode: "production"
}

// 一旦我们进行webpack 就会对jquery这个库单独打包 并生成一个 manifest.json 文件 提供和单独打包的这个库的映射关系
// 这里注意我们的库名是 webpack.dll.js 
// 当我们运行webpack指令的时候 默认会查找 webpack.config.js 这个文件 而现在我们需要运行的是 webpack.dll.js 文件
// 我们通过 webpack --config webpack.dll.js --config参数来指定我们运行的配置文件是哪一个