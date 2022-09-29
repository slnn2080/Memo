### Glob包的使用方式
- node的glob模块允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件。这个glob工具基于javascript.它使用了 minimatch 库来进行匹配
- 就是可以使用正则来匹配文件


> 使用方式
- 1. 下载
- npm install glob

- 2. 调用

> glob()
- 异步查找文件 所以有第三个参数 在回调中获取要查找的文件
```js 
var glob = require("glob")

// options 是可选的
glob("**/*.js", options, function (err, files) {
  
})
```

> 参数：
> options 可选
- 里面有很多的参数 参考网址
- https://www.npmjs.com/package/glob

- cwd：
- 要搜索的当前工作目录。默认为process.cwd()。

- ignore：
- 添加一个模式或一个glob模式的数组来排除匹配。  注意：忽略模式总是在dot:true模式下，与其他任何设置无关。


> glob.sync()
- 同步的方式查找文件 没有第三个参数 返回值为匹配的文件


> Kinto项目中的示例:
```js 
const srcDir = "./src/javascripts/"
const entries = {}

glob.sync("**/app.js", {
  ignore: ['**/_*.js'],
  cwd: srcDir
}).map(function (key) {
  entries[key] = path.resolve(srcDir, key);
});


module.exports = {

  mode: 'development',

  // 设置多入口文件
  entry: entries,
}
```

