### postCSS
- 通过js来转化css文件, 不同的浏览器的内核不同, 来处理兼容性等问题, 比如自动添加css3的前缀 压缩等事情

- postcss.org


### postCSS的安装
- 安装node环境
- npm install postcss-cli -g
- -o  -w
- postcss.config.js

### 使用
postcss src/main/css -o dist/demo.demo.css
postcss src/main/css -w dist/demo.demo.css  //实时监听文件的变化

### 常用插件
> autoprefixer:     给css3属性添加前缀
> postcss-import:   合并样式
> cssnano:          压缩css代码
> postcss-cssnext
> stylelint         代码检查
> postcss-sprites   雪碧图

### 使用步骤
- 在node中操作, cmd中 用命令行才操作, 要先安装 postcss-cli
- npm install postcss-cli -g

- 我们把a文件 编译到 b文件
- -o: 输出到哪里去
- -w: 实时监听文件的变化 

- 目标: 我们把
src > demo.css  这个文件转换到 dist > 下面

- 找到 包含 src文件夹 和 dist文件的 目录 在这个目录下面 cmd

- 通过 命令 postcss src/demo.css -o dist/demo.css
<!-- 把src下的demo.css输出到dist文件下名字为demo.css -->

- 如果一边改一边想对demo.css文件进行监听
- postcss src/demo.css -o dist/demo.css -w


### 安装功能性的插件 安装完插件后再看上面的使用方法

- 在对应的项目下 安装 autoprefixer
- npm install autoprefixer
- 在对应的项目下 安装 npm install postcss -D

- 之后在对应的项目下, 配置文件 创建 postcss.config.js
- 语法:
// 导入
let autoprefixer = require('autoprefixer');

// 导出
moudle.exports = {

    //以后会有很多的插件 我们为这些插件创造一个数组
    plugins:[
        //css3 前缀
        autoprefixer({
            //适配的浏览器 如果适配所有浏览器就是写成0
            browsers:['>1%']
        })
    ]
}
