# 要点:
如果 样式名中 要使用 : 的话 我们要使用 \ 来进行转义 ``\:``

```scss
.heading {
  &\:1 {
    @extend %hdg1;
  }
}
```

<br>

### 导入文件 @import 指令:
我们上面讲解了 变量的使用方式 我们发现上面我们在一个scss文件里面既定义了变量 又写了样式 都混在了一起

而实际上在实际的开发中 我们会将变量单独的抽离成一个scss文件 用来集中的管理变量 未来在修改的时候 我们可以直接定位到这个文件进行修改就可以了

比如: 我们定义一个 variable.scss 文件 当中保存了一些变量

```scss
$w-full: 100%;
$w-main: 1008px;
$txt-size-base: 14px;
$color_primary: #005D77;
```

那我们定义好了 variable.scss 文件 怎么在其他的文件里面使用呢?  
我应该怎么在 index.scss 里面使用 variable.scss 的变量呢?

<br>

**<font color="#C2185B">@import 指令</font>**  
我们在 index.scss 文件的开始处 使用 

    @import "路径"; 
    
的形式引入 这样 index.scss 文件里面就可以直接使用变量了

```scss
@import "./style/variable/variable";

$content: "你好";
$content: "hello" !default;

.target {
  background-color: $color_primary;
  padding: 30px;

  &::before {
    content: "#{$content}";
    display: block;
    padding: 30px;
    background-color: papayawhip;
  }
}
```

至于 @import指令 @use指令 区别 _xxx.scss 相关知识点 我们放在后面在细谈 这里面还是有很多细节的

有人说 老哥 @import 都被弃用啦 但是吧 因为我们使用的是 vscode + EasySass 目前呢 我们先使用着 @import 为什么的话 以后再说 咱以后再说

<br>

# 在 Vscode 里面快捷编写html
https://www.jianshu.com/p/5432d194f7e5

<br>

# @use @forward @import scss的模块化
https://zhuanlan.zhihu.com/p/413294236

**<font color="#C2185B">@use:</font>**  
从其他 sass 样式表中加载 mixins, functions, variables, *并将来自多个样式表的 CSS 组合在一起*

**由 @use 加载的样式表被称为模块** 也就是说 我们使用 @use 引入的文件 可以在当前文件中使用 比如
```scss
// a.scss 文件中 引入了 variable.scss
@use "variable.scss" as var

// 引入的变量文件里面的内容只能在 a.scss 文件中使用
var.$red
```


**<font color="#C2185B">优点:</font>**  
通过 @use 加载的模块不管被引用了多少次, 都只会在编译后输出一次到 css 中。  
Sass 一些内置模块, 其中有很多实用的函数。*但是使用 @import 多次引入同一模块, 会反复输出到 css 中。*

<br>

**<font color="#C2185B">查找:</font>**  
通过 @use "module" 使用模块时, 不需要写扩展名, 程序会自动查找:  
```
查找 ./module.scss, 没有则进行下一步
查找 ./module.sass, 没有则进行下一步
查找 ./module.css, 没有则进行下一步
查找 node_modules/module/sass/module.scss
```

<br>

**<font color="#C2185B">_ 的使用</font>**  
如果 Sass文件只打算作为模块加载, 而不是自己编译, 文件名以 _ 开头即可, 这些被称为部分(partials), 它们告诉 Sass 工具不要尝试自己编译这些文件。
*但是在导入这些模块时可以不用书写 _ 符号。*

<br>

**<font color="#C2185B">@forward:</font>**  
@forward 和 @use 使用方式相同, 但作用却完全不一样。  
使用 @forward 的文件 更像是一个公共的文件 将不同的scss文件引入到这个公共的文件内 通过这个公共的文件 可以实现在不同的scss文件中访问公共文件使用 @forward 引入的scss文件

一个scss文件使用 使用 @forward 引入了其它文件的情况下

类式 Vuex
```scss
// global.scss 公共文件 该文件引入了 variable.scss mixin.scss
@forward "variable.scss";
@forward "mixin.scss";


// 别的文件 可以引入 公共文件(global.scss) 通过公共文件来访问 forward 指定的文件 这样实现了 不同样式组件内部可以使用公共文件中定义的多个scss功能
// index.scss
@use "../global" as g
g.$red
g.get()
```

<br>

**<font color="#C2185B">文档释义:</font>**  
当本样式表被其他样式表使用 @use 加载之前, 先加载一个 Sass 样式表, 并且使其 mixins, functions, variables 可用
当使用 @use 加载一个文件时,  这个文件中可以使用 @forward 来使另一个文件中的 mixin、函数和变量可以暴露出去。通常用于跨多个文件组织 Sass 库。
@forward 的作用是转发模块成员, 而不是引入成员到当前文件使用, 也就是说, 通过 @forward 加载一个模块的成员, 这些成员并不能在当前文件内访问, 而仅仅是将这些成员当作自己的成员对外暴露出去。

<br>

**<font color="#C2185B">@import </font>**  
扩展自 css 的 @import, 用来加载其他样式表的 styles, mixins, functions, variables

css 中本身就有 @import, sass 在其基础上进行扩展, 可以用来导入模块中的变量, mixin, 函数等, 以及模块的样式。

和 css 中的 @import 不同之处在于, *css 中的 @import 可以是一个线上 url 地址, 浏览器会在运行时下载这个文件*, 而 *sass 中的 @import 只能在编译打包阶段运行, 所以在 sass 中只能导入一个本地存在的 sass/scss/css 文件。*

<br><br>

# 自我简介: 
hello, 大家好, 大家可以叫我 书包

在未来的一段时间里 我给大家带来一套scss教学视频 希望大家能够喜欢  

网上的scss视频不少 你说为什么我又出一套   
因为每一套视频 讲课的风格 和 角度 都是不一样的 希望我的这套课程可以给大家带来不一样的体验

<br>

本套课程中 大概分为两部分

- scss的基础语法
- scss的实战教程

最后的实战教程是一是为了巩固我们前面所学的知识, 二是我们看看在实战中会使用到哪些技巧

好啦 最后希望这套课程大家能够喜欢, 开心学scss, 悄悄变强大

<br><br>

# Sass的简介:
这节课我们简单的了解一下sass

我觉得大家会在某个阶段接触到scss 比如

- 已经工作的小伙伴们 在接触公司项目的时候 发现项目里面使用的scss 你还想多研究研究

- 自学的小伙伴 跟着视频学习的时候 接触到了 scss

不管是哪种情况 在大家去搜sass的相关资料的时候 可能会搜到 sass 和 scss 相关字样

当搜到它们的时候有没有蒙圈的, 会不会有它俩是个啥? 嘛关系? 学哪个?  

<br>

这节课带大家简单的了解一下 sass 同时咱也说说 sass 和 scss 之间的关系

<br>

其实现在的小伙伴很少能体会到 当初那个年代的前端程序员写代码时候的痛苦
我们现在写html有编辑器, 我们在编辑器里面写个div再来个tab就能快速的生成对应的结构

但是当初的程序员他们在写html的时候 不得不手写 开闭合标签 就像这样

```
<div></div>
```
https://s2.kingtime.jp/independent/recorder/personal/#
我也没体会过, 但是确实在当初那个年代 咱们要是写html的时候 需要手动的去写 html开闭合标签 想想就很难受 很麻烦是么 于是乎就出现了一群大大 牛逼的人 为了偷懒

写 html 太麻烦了 又尖括号 要开始又要管闭合 费劲

既然这么费劲 他们就想要是能怎么舒服怎么来多好 于是呢 他们就按照自己的编码习惯 开发一门语言 就是haml 它就是用来解决我们上面所说到的问题 


ok html的问题解决了 还有css啊 所以同样风格的 又开发出了 可以简写css的语言也出来了 就是sass

于是乎牛逼的大大么 就开发出了 haml 和 sass

没错 是haml 和 sass

### 前端基础语法中包含什么?
- html - haml
- css - sass

<br>

haml 是 html 的模版语言 咱们就简单的理解为 简写html的方式 或 扩展html功能的一种语言

sass 则是 css 的预处理语言 咱们也简单的理解为 让css写起来结构更清晰 更舒服 同时扩展了css的种种功能

<br>

我们还是说回来哈 haml sass

他们又说新语言不能仅仅是改变结构啊 还添点功能吧 于是乎在html的基础上 也就是haml上又增加了
- html可以做到条件渲染啊
- html可以做到循环渲染结构啊
- html可以定义变量 和 在魔板中进行插值啊
- html还可以利用混合到达组件的效果 减少重复编写相同代码 直接服用
- html还可以继承啊 等等等 

扩展了这么多功能的haml就叫做html的模版语言

<br>

我们简单的体会下 haml 的书写格式 不是真写哈 咱就看看 haml 样子  

因为写haml需要在电脑上安装 ruby环境 还要有 haml解释器 我们也不是想研究这门语言

仅仅是给大家演示下 haml的样式 看看怎么就在当年能解决掉些html时的痛点

1. 缩进代替了标签的嵌套
2. 简化了标签的声明方式
3. 简化了类和id选择器的使用方式

```html
<!-- 首先我们看看普通标签 -->
<p>hello world</p>

%p
  hello world


<!-- 添加标签属性 -->
<p id="name">sam</p>

%p#name
  sam

<!-- 
  有点意思吧 %就代表要写标签了 id class 都对应使用了 . # 子元素使用了缩进的形式 
  我们再看看难一些的结构 

  在一个稍微复杂点的项目中 结构的嵌套肯定少不了 比如这样
-->

<section class="layout-container">
  <div class="layout-content">
    <div class="layout-column:12">
      <h2 class="heading">
        <span>我是标题<span>
      </h2>
    </div>
  </div>
</section>

%section
  %div.layout-content
    %div.layout-column:12
      %h2.heading
        %span
          我是标题
``` 

怎么样 除了看的不太习惯 确实让html代码简洁了很多 层级关系是不是也一目了然

其实要真写多了你也会觉得haml写起来很舒服 有机会的话 我会给大家另开一套 pug 的课程 它也是html的模板语言 也很有意思

<br>

我们再把话题拉回来 拉到sass 上面说了 haml 对应着 html   

大大们解决了 写html非常麻烦的问题 很开心是吧 于是乎他们又觉得写css也很麻烦  

比如有一个dom结构嵌套层级特别深的div 我想给他添加样式 在写选择器的时候 都会写类似这样的代码

```css
.layout-container .layout-content .layout-column\:12 .heading span {
  font-size: 80px;
}

/*
  当我们写个复杂的页面的时候 肯定会遇到 嵌套层级很深的结构 或者 我们在写css选择器的时候 还要考虑权重的问题 不然很有可能我们写的样式 元素却没有添加上

  也就是说 为了准确 精确的找到目标元素 不会影响到其它的元素 我们会写很长的选择器 这样我们修改起来才是指哪打哪且不用考虑权重的问题
*/
```

所以这些大大又开发出了一门语言 sass 目的就是让css代码写起来更加的简单

```css
p {
  color: red;
}

p
  color: red
```

```html
<div>
  <h1>你好呀, <span>sam</span></h1>
</div>
```

```css
div {
  background: red;
}

div h1 {
  color: green;
}

div h1 span {
  font-size: 20px;
}
```

```scss
div
  color: red
  h1
    color: green
    span
      font-size: 20px
```


有没有发现 简洁了很多 这种缩进的形式 显得结构也清晰了很多是吧

但是有没有觉得怪怪的 对于我们写这些用css用久了的人来说 还是有点别扭 没括号 没分号啊 感觉还是有点生

<br>

因为这 sass 又想了 为了让熟悉css的人能够更加的平稳的过渡到 sass

在sass3.0之后将 将 .sass 结尾的文件 改成 .scss 结尾

<br>

那有人说了 只改了一个后缀名么? 

不是 语法规则也不一样了 它把 {} 和 ; 给你加回来了 这样就熟悉了吧

3.0版本的scss和css的写法更加的贴近 更加的舒服

```scss
div {
  color: red;

  h1 {
    color: green;

    span {
      font-size: 20px;
    }
  }
}
```

<br>

scss 是彻底和 css 兼容的, 这意味着学习scss几乎是零成本。或者说scss就是增加了一些功能的css。

而且它额外的提供了很多编程语言才有的特性 比如变量 函数 逻辑控制等等 让css的功能更加的强大了 

<br>

这里有一点要注意啊 我们用scss写出来的代码 浏览器不认识啊 浏览器只认识html css啊 所以我们写完的scss文件还要编译成css文件 后才能被浏览器所识别

<br>

### 总结下:
sass 和 scss 它俩是一个东西都是css的预处理器, 只是在sass3.0之后 写sass的风格发生了变化 本套课程也毋庸置疑以scss为主

<br>

# Vscode 下安装 Sass
上面咱们说了 我们使用scss写完的东西 浏览器不认识是吧 我们要将写好的scss文件 翻译成 css文件 这样浏览器才能识别

就好像咱会英语出国玩 遇到个日本人 日本人跟你讲日语 你能听懂么 听不懂啊 这个时候咱是不是就需要个翻译啊 对吧 一个意思

下面我们就来下载这个翻译官 这套课程中我们主要使用 vscode 这款编辑器 所以没有vscode的小伙伴 自行下载一下 很简单百度vscode 下载就行

然后我们讲讲怎么在 vscode 中 下载 翻译scss文件的插件

- 在扩展商店 下载 easy sass

- 打开扩展设置  
点击插件右下角的设置图标后点击扩展设置 最后点击在 settings.json 中编辑 开始设置关于easy sass的配置

- 配置: (也可以可视化配置)  
package.json中可以配置如下 关于 sass 配置

  - easysass.compileAfterSave:   
  启用或禁用保存后自动编译功能

  - easysass.formats: [{}]  
  指定导出文件的扩展名和格式。easysass.formats表示生成2种文件的格式。

    ```js
    "easysass.formats": [
      {
        "format": "expanded",
        "extension": ".css"
      },

      // 下面的可以注释掉
      {
        "format": "compressed",
        "extension": ".min.css"
      },
    ],
    ```

- easysass.targetDir: 字符串  
设置编译后文件的输出目录 说白了就是编译后的css的位置 相对路径为 当前基于vscode打开的文件夹
  ```js
  "easysass.targetDir": "./css/"
  ```

<br>

- easysass.excludeRegex  
提供文件名正则表达式, 匹配到的文件会被排除, 不会编译为css, 默认为空, 则功能关闭
  ```js
  "easysass.excludeRegex": "^_+"
  ```

<br>

会自动生成下方配置
```json
  "easysass.formats": [
    {
      "format": "expanded",
      "extension": ".css"
    },

    // 下面的可以注释掉
    {
      "format": "compressed",
      "extension": ".min.css"
    },
  ],

  // 可以将编译后的文件输出到指定的目录 比如下面这样的当前目录 默认就是当前目录
  "easysass.targetDir": "./css/"
```

<br>

# 嵌套规则:
ok上面我们配置好了插件 接下来我们就开始正式的学习scss的语法

我们在这里首先接触下 嵌套规则

上面我们在介绍里面说过 haml是使用缩进来表示html中的标签的层级关系是不 还记得么

```html
<div>
  <p>我是p标签的内容</p>
</div>
```

而scss在写css的时候也是一样的 它会通过选择器的嵌套 来表示层级关系


scss里面在写css的时候 可以使用嵌套语法

比如:
```html
<div>
  <p>我是内容<p>
</div>
```

**需求:**  
1. 给div添加高度和宽度
2. 给div里面的p元素设置 背景色

这节里我们写几个css样式 来与scss进行下对比 以后咋就不写了哈 编译后的结果我们在编译后的css里面查看

```css
div {
  width: 100px;
  height: 10px;
}

div p {
  background-color: red;
}
```

我们再看下同样的需求 我们使用scss怎么来实现
```scss
// 需求1:
// 我们发现是不是就是在写css啊 没两样吧 这也就是学习scss几乎是0成本且能由css平稳的过渡到scss的语法
div {
  width: 100px;
  height: 100px;
}

// 上面说了 scss里面可以使用嵌套的写法是么
div {
  p {
    background-color: red;
  }
}

// 有没有发现这样的结构跟 html 的结构是一样的呀?
```

比如:
```html
<div>
  <p>我是内容<a href="">点击领取优惠卷</a><p>
</div>
```

需求:
让 a链接的颜色文字变成红色

我们按照html结构的层级 使用嵌套规则写scss
div的子元素是p p的子元素是a 指定a的样式 是不是和 html 的结构一样?
```scss
div {
  p {
    a {
      color: red;
    }
  }
}


div {
  width: 100px;
  height: 100px;

  p {
    background-color: red;

    a {
      color: red;
    }
  }
}
```

我们发现结构是清晰了 那还有没有什么好处?
我们想象以往我们要是写上面的需求 css 是什么样的?
```css
div {
  width: 100px;
  height: 100px;
}

div p {
  background-color: red;
}

div p a {
  color: red;
}
```

我们在写子元素的样式的时候 需要一直带着它爸爸的类名呀 这是元素选择器 如果是自定义的class选择器 那样式名可能更长

我们再来看一个例子:
我们要让 ul 里面 的 li 里面的 span 里面的文本变成红色
```html
<ul>
  <li><span>我是内容1</span></li>
  <li><span>我是内容2</span></li>
  <li><span>我是内容3</span></li>
  <li><span>我是内容4</span></li>
  <li><span>我是内容5</span></li>
  <li><span>我是内容6</span></li>
</ul>
```

```scss
ul {
  li {
    span {
      color: red;
    }
  }
}
```

我们稍微来点复杂点的 然后观察下编译后的结果 再次的验证使用嵌套规则写css的好处
```scss
ul {
  width: 300px;
  margin: 50px auto;
  background-color: #eee;

  li {
    padding: 10px;

    span {
      color: red;
    }
  }
}
```

```css
ul {
  width: 300px;
  margin: 50px auto;
  background-color: #eee;
}

ul li {
  padding: 10px;
}

ul li span {
  color: red;
}
```

**<font color="#C2185B">总结下:</font>**  
使用嵌套语法 可以是css的结构更加的清晰 同时避免了重复输入父选择器 写起来更加的舒服

<br>

# 父选择器标识符 &
这节课我们介绍下scss在嵌套规则里面给我们提供的几个符号 首先要介绍的就是 & 它代表父选择器的标识符

**<font color="#C2185B">& 使用要点</font>**  
  1. 写在内层嵌套里面 说白了它要写在括号的里面
  2. 选择器的位置上 
  3. 代表上一层级的选择器 说白了它代表的是括号外的选择器

```html
<ul>
  <li>我是文字</li>
</ul>
```

```scss
  ul {
    // 写在内层里面 写在选择器的位置上 代表上一层的选择器 ul
    & > li { ... }  == ul > li

    & + li { ... }  == ul + li

    &:hover { ... } == ul:hover

    &:last-child { ... } == ul:last-child
  }
```

还是直接看例子 我们看下下面的结构
```html
  <ul>
    <li>我是文字</li>
    <li>我是文字</li>
    <li>我是文字</li>
    <li>我是文字</li>
    <li>我是文字</li>
  </ul>
```

1. 修改li里面的文字的颜色 为红色
```scss
ul {
  li {
    color: red;
  }
}
```

2. 修改最后一个li的文字颜色 为黑色
```scss
ul {
  li {
    color: red;

    // 我们也可以 利用 嵌套的方式 &代表 括号外的选择器吧
    &:last-child {
      color: #000;
    }
  }

  // 我们可以这么写
  // li:last-child {
  //   color: #000;
  // }
}
```

3. 将 我是span 的颜色修改为红色
```html
<section>
  <span>我是span</span>
  <div>我是div<span>我是内联span</span></div>
  <a>我是a链接</a>
</section>
```

我能这么写么? 不能吧 因为这么写 div里面的所有span元素都会变成红色是么
```scss
section {
  span {
    color: red;
  }
}
```

那应该怎么改:
```scss
section {
  & > span {
    color: red;
  }
}
```


我们再来看下下面的例子
```html
  <ul>
    <li><a href="">我是链接1</a></li>
    <li><a href="">我是链接2</a></li>
    <li><a href="">我是链接3</a></li>
    <li><a href="">我是链接4</a></li>
    <li><a href="">我是链接5</a></li>
    <li><a href="">我是链接6</a></li>
  </ul>
```

需求:
当我hover到li上面的时候 修改其背景色

简单的写些样式哈
```scss
ul {
  width: 350px;
  margin: 50px auto;
  background-color: palevioletred;
  padding: 20px;
  list-style: none;

  li {
    padding: 10px;

    // 这里的 & 就代表了 外层选择器 li 也就是说 等价于 li:hover
    &:hover {
      background-color: #eee;
    }
  }
}
```

追加一个需求 hover到li上的同时 我们也修改 a链接的文件颜色
```scss
ul {
  width: 350px;
  margin: 50px auto;
  background-color: palevioletred;
  padding: 20px;
  list-style: none;

  li {
    padding: 10px;

    // 这里的 & 就代表了 外层选择器 li 也就是说 等价于 li:hover
    &:hover {
      background-color: #eee;

      a {
        color: palevioletred;
      }
    }
  }
}
```

我们看下编译结果:
```css
ul {
  width: 350px;
  margin: 50px auto;
  background-color: palevioletred;
  padding: 20px;
  list-style: none;
}

ul li {
  padding: 10px;
}

ul li:hover {
  background-color: #eee;
}

ul li:hover a {
  color: palevioletred;
}
```

**<font color="#C2185B">为什么要提供 &标识符呢?</font>**  
我们上面知道了 & 怎么使用 那么我们返回来想想为什么要有这个 &标识符呢?
我们看看下面这个例子 

我们就权当它是一个banner 整体我们使用了a标签来包裹主体内容 就说明点击banner会进行跳转 那么我想给用户一点点提示 当我们hover上去的时候 整体会有透明度的变化

```html
<div class="banner-link">
  <a href="www.baidu.com">
    <div class="content">
      肯德基新品
    </div>
    <div class="image-area">
      <img src="./img/img-9.png" alt="">
    </div>
  </a>
</div>
```

```scss
html, body {
  font-size: 62.5%;
  background: #eee;
}

.nav {
  background-color: papayawhip;
  padding: 30px;
  color: #fff;

  a {
    display: block;
    padding: 30px;
    background-color: powderblue;
    
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 50px;
      background-color: palevioletred;
      margin-top: 20px;
    }

    :hover {
      opacity: .7;
    }
  }
}

.banner-link {
  background: #EF5A40;
  border: 5px solid #fff;
  border-radius: 10px;
  width: 500px;
  padding: 30px;
  margin: 50px auto;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    .content {
      width:200px;
      font-size: 40px;
      color: #fff;
      font-weight: bold;
      margin-right: 20px;
    }
  
    .image-area {
      flex: 1;

      img {
        width: 100%;
        height: auto;
      }
    }

    // 我就这么写 在a的层级里面 直接写 hover
    :hover {
      opacity: .6;
    }
  }
}
```

上面这么写的话 当我们hover到a上的时候 发生透明度变化的并不是a元素本身(它包裹的所有) 而是a的后代元素(文字 和 图片部分)
```css
/* a 空格 :hover 这不就是后代选择器的写法么*/
.banner-link a :hover {
  opacity: .6;
}
```

当我们使用 &:hover 的时候 我们看下编译结果 空格没有了 我们再看看效果
```scss
.banner-link a:hover {
  opacity: .6;
}
```

为什么呢?
我们写scss的这种嵌套(套娃)的写法 sass在解开一个嵌套规则时就会把 父选择器 + 空格 再连接到子选择器的前面 所以会出现编译后

  .banner-link a :hover

这种情况 这种情况在css中是后代选择器的写法吧 写在里面的样式只会对 a 的后代生效是吧
但事实上 有些情况下 我们并不希望得到上面那样的结果是么(不希望以 后代选择器的方式连接)

解决方式就非常的简单 使用一个特殊的sass选择器, 即父选择器标识符。
当包含父选择器标识符的嵌套规则被打开时, 它不会像后代选择器那样进行拼接, 而是&被父选择器直接替换: 

.banner-link a:hover


ok到这里我相信大家对嵌套的写法 和 &符号的用法有一定的了解了 有人会说兄dei 我知道了
&代表 括号外的选择器 同时它的后面可以加 :link > + ~ ::before 

那还有没有其他的用法, 有

在一些公司 他们对 类名 有要求 他们会在类名上体现出来 做的是什么类型的页面 做的是这个页面中的什么部分 比如
```scss
// 我做的是一个page 页面的类型是lp 做的是yaris车种 这个样式是关于 header部分的
.p-lp-yaris__header { ... }
.p-lp-yaris__footer { ... }
.p-lp-yaris__wrap { ... }
.p-lp-yaris__title { ... }
```

当然我们可以像上面这样写 但也可以利用 & 将上面的样式整合在一起
```scss
// 你不是 & 代表括号外面的选择器么
.p-lp-yaris {
  &__header { ... }
  &__footer { ... }
  &__wrap { ... }
  &__title { ... }
}
```

当然公司开发中尽可能的写代码的风格要统一 如果你去了一个项目组 大家都这么写 那咱也别另类了哈

还有一个 % 占用符 这个等到我们讲继承的时候 我们再展开讲讲 这节课就到这里

<br>

# 注释
这个部分比较轻松 关于注释 
注释是什么? 
注释说白了 就是对我们写的代码的解释和说明 目的是为了让别人 和 自己都能很容易得看懂这段代码是做什么用的。

让别人懂:
我们写项目 很可能是多人协作开发 我们写的代码 有可能将来来修改的时候 改的人不是你 所以我们写注释的目的就是让这个改的人 能快速的定位到目标 改起来更轻松

要知道 未来的css文件里面的代码也是很多的 那我们是不是可以稍微进行下注释 比如

  // 登录窗口

让自己动:
举个例子 五一放假前 我做了7个页面 放假回来了 看着一团团的代码 懵逼了 我要接着哪写?

写代码养成写注释是比较好的一样习惯 注释

sass中的注释的写法有两种
1. 单行注释
2. 多行注释

```scss
// 登录窗口
.login { ... }

/*
  这是多行注释
  这是多行注释
  这是多行注释
*/
.login { color: red; }
```

注意: 多行注释会被编译到css文件里面 单行注释不会哦

<br>

# 变量
哪门计算机语言里面都有变量这个概念 为了照顾一些可能没有听过这个概念的小伙伴们 我们简单说下 变量的含义

变量变量 代表一个可变的量, 举个例子:
打电话, wai 老王 听说你昨天扒窗台从3楼掉下来了 我今天买点 *水果* 去看看你等到了 你再跟我聊聊咋掉下来的 是因为没藏好么?

我说买点水果 这个水果就可以当看成一个变量 具体是什么水果 那就要看我去市场买什么了
买香蕉 水果就是香蕉 买苹果 水果就是苹果

  水果 = 香蕉

等我见到老王了 nuo 这是我给你买的水果 这时候的水果指的就是香蕉是什么

我再举一个例子啊, 我们都打游戏 一般游戏都会有个小地图 小地图下面 经常会有 x y
x: 123, y: 677
这代表了人物的坐标 x y 人物不断地在界面上移动 x y的值就会发现变化 x就是变量名 123就是变量的值 这个值是可以发生变化的

我们可以定义一个变量 就相当于定义了一个容器 一个塑料袋 里面可以存放各种类型的值

这时候有人说了 好滴 兄dei我大概知道变量的作用了 就是我定义一个变量 里面的值是可变的
那变量具体应用在哪里呢?

这个问题问得好哈, 用在哪里呢 我们来看一个例子
我们应该知道 每一个网站的设计 都会有一套对应的配色 整个网站几十个页面都是根据这一套配色来的

ok现在我做了一个网站 整个网站的配色如下 
产品经理来需求了 说我们现在这个网站啊 受众全体不在是女性 而是男人 所以整体的配色方案必须要换 ok那你怎么 要知道这一套配色方案应用的地方实在是太多了 什么几十个页面的 背景色 边框 文字色 都需要一一去变 那这样的工作量实在是太大了 这个时候我们就可以使用变量
```html
  <div class="electric">
    <h3>电子产品</h3>
  </div>
  <div class="beddings">
    <h3>床上用品</h3>
  </div>
  <div class="spare">
    <h3>汽车配件</h3>
  </div>
```

```scss
div {
  width: 350px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #212121;

  text-align: center;
}

.electric {
  background-color: #C2185B;

  h3 {
    color: #fff;
  }
}

.beddings {
  background-color: #f15b6c;

  h3 {
    color: #fff;
  }
}

.beddings {
  background-color: #f58f98;

  h3 {
    color: #fff;
  }
}

.spare {
  background-color: #d71345;

  h3 {
    color: #fff;
  }
}
```

我们先看下变量的定义方式:


**<font color="#C2185B">变量定义: $变量名: 值;</font>**  
变量以美元符号开头, 赋值方法与 CSS 属性的写法一样
```scss
$electric-bgcolor: #f15b6c;
$beddings-bgcolor: #f58f98;
$spare-bgcolor: #d71345;
```

上面我们就定义了3个变量 变量名就是$ electric-bgcolor ok接下来我们看看怎么使用变量
也很简单 你就把这个部分复制到你想用的位置就可以了


**<font color="#C2185B">变量使用 $变量名</font>**  
直接使用 $变量名 即可调用变量

```scss
.electric {
  // 这里我们使用的是这个变量 然后编译的时候 就会去找对应的值
  background-color: $electric-bgcolor;

  h3 {
    color: #fff;
  }
}


.beddings {
  background-color: $beddings-bgcolor;

  h3 {
    color: #fff;
  }
}

.spare {
  background-color: $spare-bgcolor;

  h3 {
    color: #fff;
  }
}
```

那有什么好处呢, 这时候 我们再整体网站的配色的时候 直接修改变量值就可以了



**<font color="#C2185B">变量的作用域</font>**  
接下来我们介绍下一个概念 就是变量的作用域 说白了就是指变量生效的范围
如果我们定义在 嵌套规则里面 那么它只在当前的{ } 内使用 这种变量也叫做局部变量
```scss
.electric {
  background-color: $electric-bgcolor;

  h3 {
    // 定义一个变量
    $title-color: #afdfe4;

    // 使用这个变量
    color: $title-color;
  }
}


.beddings {
  // 我们能在这里使用上面 { } 里面定义的变量么?
  background-color: $beddings-bgcolor;

  h3 {
    color: $title-color;
  }
}
```
结果是不行: Undefined variable 编译期报错了 说未定义的一个变量
当我们不在嵌套规则里面定义的时候 在任何地方都能使用

<br>

### 变量的默认值 !default
我们在声明一个变量的时候 可以变量值后面加上 !default 关键字 代表该值为变量的默认值

格式:
```scss
$content: 123 !default;
```

使用变量的时候 
  如果变量之前已经赋值 那么该变量还是之前的值
  如果变量之前没有被复制 那么该变量则使用默认值


```scss
// 如果变量之前被赋值了 就使用这个值 即使下面再定义默认值也没用
$content: "你好";

// 但是如果我们上面的变量注释掉 之前没有声明过 $content 那么则使用默认值
$content: "hello" !default;

.target {
  background-color: palevioletred;
  padding: 30px;

  &::before {
    content: "#{$content}";
    display: block;
    padding: 30px;
    background-color: papayawhip;
  }
}
```

比如我们编写了一个 UI组件库 肯定会暴露出去一些参数设置供用户自定义 比如用户可以选择个主题颜色 背景色等等对吧

所以我们在scss文件里面需要用上用户选择的这些配置参数 但是用户如果没有选择的话 我们是不是也应该提供默认值啊 这就是默认值该干的事儿

<br>

# 数据类型
scss在css的基础上提供了一些scssscript的新功能 听听这个词哈 scsscript scss脚本语言 或者说有点更贴近编程语言了 它为扩展了可以使用变量啊 算数运算 函数 判断等功能

既然说是scssscript那么就会跟其他的语言一样 会有变量 和 数据类型的概念 上一节中我们介绍了变量的概念 这里我们讲讲在scss中的数据类型

SassScript 支持 7 种主要的数据类型: 

**<font color="#C2185B">字符串:</font>**  
scss支持两种字符串类型
1. 有引号的字符串
  - 比如
```scss
$str: "你好 可以认识一下嘛";
$str: "滚"
```

2. 无引号的字符串 
  - 比如
```scss
$str: hellonicetomeetyou;
$str: getout
```

```scss
$str: "你好呀";

.target {
  background-color: palevioletred;
  padding: 30px;

  &::before {
    content: "#{$str}";
    display: block;
    padding: 30px;
    background-color: papayawhip;
  }
}
```

**<font color="#C2185B">插值语法: #{变量名}</font>**  
通过该语法 可以将变量的值插入
1. 字符串中
2. css属性位置
3. 选择器的位置

比如:
我们定义一个变量 用于保存小伙告白时说的话
```scss
$content: "小张, 我喜欢你很久了 能做我的女朋友么?";

  小张: 滚！ 完了 没戏了

// 小伙再接再厉 又定义了一个变量
$content: "小王, 我喜欢你很久了 能做我的女朋友么?";

  小王: 滚！ 完了 又没戏了
```

我们就上面的例子看 有没有发现 两句话中只有 姓名的地方不一样呀 那我是不是可以 把姓名单独定义成一个变量 这样其他的文本都不变 我只需要该姓名的位置就可以了
为了满足小伙的愿望 我决定帮助他
```scss
$name: "小张";

// 那我们能不能把 $name 放进下面的字符串里面呢 可以
$content: "小张, 我喜欢你很久了 能做我的女朋友么?";

// 改成:
$content: "#{$name}, 我喜欢你很久了 能做我的女朋友么?";

// 这样是不是我们每次只需要改变量里面保存的名字就可以了呀 我成功的为小伙的表白节省了大量的时间
```

上面我们说了 字符串的形式有两种 一种是带引号的 一种是不带引号的字符串
其实不带引号的字符串就是为了将变量插在 选择器 和 属性名 的位置上用的

```scss
$selector-name: div;
$attr-name: width;

#{$selector-name} {
  #{$attr-name}: 100px;
  height: 100px;
  background: red;
}
```

这里就简单了解下 以后我们讲函数的时候 会有更好玩的用法

**注意: **
在编译 CSS 文件时不会改变其类型。有引号的不会编译为无引号的
只有一种情况例外, 使用 `#{}` (相当于${}) 时, 有引号字符串将被编译为无引号字符串, 这样便于在 mixin 中引用选择器名

<br>---

**<font color="#C2185B">数字类型</font>**  
可以简单的理解 只要有数字出现就是 数字类型
我们验证一下
  1, 1px 1em 1rem 100% 1.5

```scss
$num: 1a;
$type: type-of($num);

.target {
  background-color: palevioletred;
  padding: 30px;

  &::before {
    content: "#{$str}";
    display: block;
    padding: 30px;
    background-color: papayawhip;
  }
}
```

**注意: ** 
单位会和数字当做一个整体, 进行算数运算

<br>---

**<font color="#C2185B">布尔型</font>**  
在讲布尔类型之前 我们先讲两个运算符 == !=
这两个运算符有什么用呢? 用来比较 运算符两端的值 是否相等 或 不等
比如:
  1 == 1    // true 真
  1 == 2
  2 != 3

返回值为: 布尔类型
true / false

不知道你们看没看过 一款王自健主持的 是真的么? 的节目
崴过一次脚后,很容易再次扭伤是真的吗? 是 真的就是 true 假的就是 false

我们来验证一下:
```scss
$num: 1.5;
$result: $num == 1.5;
$type: type-of($result);    // true  --  bool


$num: 1.5;
$result: $num == 2;
$type: type-of($result);    // false  --  bool
```

布尔值有什么用呢? 
举个例子 但具体的东西我们拿到 @if 的部分去讲
举例:
我们进行过html布局都知道 会将整个网页分为几个大的部分 那部分和部分之间是不是有间距呀 margin-bottom 
这是一种情况 每一个部分里面可能还会有 标题 和 正文 标题下面是不是会有间距呀 margin-bottom

这时候我们就可以这么做
如果 是情况1 那么margin-bottom的值为60px
如果 是情况2 那么margin-bottom的值为24px

<br>----

**<font color="#C2185B">maps</font>**  
map是scssscript中的一种类型 相当于javascript里面的对象
它呢也是保存数据的一种方式 我们前面了解过变量 我们前面都是将数据保存到变量里面

比如:
```scss
  $name: "青青";
  $age: 18;
  $adress: "江南";
```

我们利用变量相展示一个人的信息 但是它们都是单一的一个值 值与值之前并没有联系
那我们想体现一个人的完整的信息 也就是将上面的定义的数据 变成一个整体 就可以利用对象
我们把上面的3个变量放在一个塑料袋里 它们就变成一个整体的 怎么放呢

**<font color="#C2185B">map定义的格式:</font>**  
```scss
$person: (
  $name: "青青";
  $age: 18;
  $adress: "江南";
);
```

现在 name age address 就作为person身上的一个属性出现了
我们将这些变量装在一起的好处就是关系明确 方便操作 

比如:
一般我们都会将 定义的变量放到一个 文件里面 variable.scss 这个文件里面全是变量
我们也知道起变量名的时候要见名知意

那现在有个需求 我要存下 青青 小兰 的信息怎么办?
```scss
// 青青
$name: "青青";
$age: 18;
$address: "江南";

// 小兰
$name2: "小兰";
$ag2e: 18;
$address2: "江苏";

// 小花 我再来个name3么 既然我们定义的都是一个人的属性 那我是不是在定义变量的时候 定义这个人就好了 将这个人定义成一个map
$qingqing: (
  name: "青青",
  age: 18,
  address: "江南"
);

$xiaolan: (
  name: "小兰",
  ag: 18,
  address: "江苏"
);
```

这样这些数据之间的关系是不是明确了很多 也方便管理
有人这时候说了 兄嘚啊 我们定义成普通变量的时候 直接可以使用
```scss
$w-full: 100%;

width: $w-full;
```

那我们定义成对象 该怎么使用呢?
scss里面呀 有很多的内置函数 方便我们去操作我们现在在讲的数据类型
比如: 字符串 有字符串相关的内置函数 或者 你们就理解为 操作字符串的工具 数组呢 有操作数组的工作 对象map也有操作对象的工具

这些工具我们放在后面再讲 这里我们先介绍一个

**<font color="#C2185B">map-get(我们定义的对象, 对象中的key)</font>**  
比如我们想把青青的名字取出来 在页面中显示
```scss
&::before {
  content: "#{map-get($qingqing, name)}";
}
```

<br>---

**<font color="#C2185B">空值</font>**  
null 代表空
比如我们上面定义了 map
```scss
$qingqing: (
  name: "青青",
  age: 18,
);

// 如果我们把对象中的name 取出来展示到页面上 是ok的没有问题的
&::before {
  content: "#{map-get($qingqing, name)}";
}

// 如果我们要展示 address 可以么 对象中没有address吧 我们看看
// 我们将 address 取出来放在一个变量里面
$res: map-get($obj, address);

// 然后检测下 这个变量的类型
$type: type-of($res);

// 然后展示到页面上查看效果
&::before {
  content: "#{$res} -- #{$type}";   // -- null
}
```

这就是null 在后续还会有具体的应用 来巩固 不要着急

**注意: **
由于它代表空, 所以不能够使用它与任何类型进行算数运算

<br>----

**<font color="#C2185B">数组 (list)</font>**  
数组呢 也是存储数据的一种方式
我们先看看数组的定义: 
用空格或逗号作分隔符都属于数组 被分隔的每一项就称之为数组的成员

```scss
div {
  font-family: 'Courier New', Courier, monospace;
  border: 1px solid black;
  padding: 1px 2px 3px 4px;
}
```

我们可以想象成 它将被分隔的每一项(也就是每一个成员)放在了一个个的小格子里面
每一个小格子都会有一个编号 这个编号 叫做下标

下标是从1开始的

在scss里面 这个数组本身我觉得没有太大的作用 平时我们存个数据也不会特意去用这个数组, 但是scssscript给这个数组提供了一些内置函数 用来操作这个数组 配合一些条件判断 也有很好玩的用法

也就是我们先了解完整个scss的语法 api 功能 然后才能进行综合应用
还是一样 这里我们先简单的介绍下操作数组的内置函数 也就是操作数组的工具

例子:
```html
<div class="box1"></div>
<div class="box2"></div>
<span class="target"></span>
```

```scss
// 定义个数组
$margin-arr: 50px 100px;


div {
  width: 300px;
  height: 200px;
}

.box1 {
  background: #EF5A40;
}


// 应用在这个盒子里面
.box2 {
  background: #00708D;
  margin: $margin-arr;
}
```

**<font color="#C2185B">length(数组)</font>**  
获取数组的长度 有几个成员就是几

```scss
$margin-arr: 50px 100px;
$len: length($margin-arr);    // 2
```

**<font color="#C2185B">nth(数组, 下标)</font>**  
我们说了数组的下标是从1开始的
```scss
$margin-arr: 50px 100px;
$item: nth($margin-arr, 1);  // 50px
```

还有几个以后再说 这个章节我们主要讲的是数组类型 不在这里介绍太多别的知识

<br>---

**<font color="#C2185B">颜色类型</font>**  
表示颜色的值 都属于颜色类型
比如
  blue, #004961, rgba(255,0,0,0.5)

```scss
// 以下的值都是 color
$bg-color: #004961;
$bg-color: red;
$bg-color: rgba(255,0,0,0.5)

$type: type-of($bg-color);

&::before {
  content: "#{$type}";   // color
}
```

颜色类型之间也是可以计算的 用的不多 比如一个16进制的数
它会分成3段
  11 | 11 | 11
  +
  22 | 22 | 22
  得到
  33 | 33 | 33

 但一般没有对颜色进行运算的 即使有也是使用 scss提供的函数 比如

**<font color="#C2185B">mix(color1, color2, 比例(0-1))</font>**  
将两个颜色按照一定的比例 混合在一起
比例的默认值是50%
```scss
$color1: #F7AD25;
$color2: #EF5A40;

background: mix($color1, $color2, 20%);
```

<br>

# 运算
**<font color="#C2185B">相等运算符 == 和 != </font>**  
相等操作符常用于条件语句 用来判断 运算符两端的值是否相等 或 不等 返回值为布尔类型
前面我们在说布尔类型的时候 简单的使用过 相等运算符 这里就不在展开说了哈 比较简单

<br>

**<font color="#C2185B">算术操作符 + - * / %</font>**  
这些操作符的作用 就跟我们小时候学的数学是一样的
这里我们主要关注下 需要注意的部分

**<font color="#C2185B">1. 数字类型之间的运算</font>**  

**<font color="#C2185B">加法:</font>**  
```scss
// 两个数字没有单位 结果也不带单位
1 + 2   // 3 

// 两个数字有单位 结果也带单位 单位也一样
1 + 2px   // 3px
1px + 2   // 3px
1px + 2px // 3px

// 需要注意的是: 如果两个数字带的单位不一样会报错
1px + 2em // 编译期就报错了
```

**<font color="#C2185B">减法:</font>**  
跟加法一样
```scss
10 - 1     // 9
10px - 1   // 9px
10 - 1px   // 9px
10px - 1px // 9px

10px - 1em  // 编译器报错
```

**<font color="#C2185B">乘法:</font>**  
```scss
10 * 2    // 20
10px * 2  // 20px
10 * 2px  // 20px

// 注意: 两个数字都带单位的话 会报错
10px * 2px  // 报错
10px * 1em  // 单位不一致报错
```

**<font color="#C2185B">除法:</font>**  
/ 操作符 本身就是css简写语法的一部分 
比如
font-size: 16px / 24px  代表字号/行高

差不多的情况还有background属性
background: url("http://example.com") no-repeat fixed center / cover;

所以我们要进行除法计算的时候 要区别于上面的情况的是么 不然就被当做是简写语法是么

所以想要被当做是除法 要满足下面的情况
1. 计算的时候使用 () 包起来
2. 第二个数字后面不能带单位
3. 或者两个操作数其中的任意一个作为变量出现的时候 可以不用() 但还是要注意 2 必须是满足的


```scss
10 / 2  // 5
10 / 3  // 3.3333333333


$num: 100px
width: (100px / 2);   // 50px 
width: $num / 2       // 50px


width: 100px / 200px  // 会被直译为 100px / 200px
```

**<font color="#C2185B">取模 %</font>**  
两个数字相除 取余数部分

```scss
10px % 7      // 3px
10 % 7px      // 3px
10px % 7px    // 3px

// 单位不同会报错
10em % 7px
```

**<font color="#C2185B">2. 字符串类型 和 任意类型 做 + 运算 结果会是拼串</font>**  
什么叫拼串呢? 简单的说就是两个串拼接在一起

比如:
```scss
 "你好" + "中国"     // "你好中国"
 "你好" + 2         // 你好2
 true + "你好"      // true你好
```

其实里面还有一些细节, 比如说在进行拼串的时候
我们在前面讲解了字符串有两种类型 一个是带引号的 一个是不带引号
上面在示例中我们使用的都是带引号的情况 那么不带引号 和 带引号的字符串进行拼串的时候 结果是什么样的呢?

这个留作作业 你们自己去验证 我就不在这里进行过多的总结 什么情况拼串带引号 什么情况拼串不带引号 太繁琐

那要说 兄嘚 我较真 我就想总结明白 ok 
上面在做演示的时候 我们都是通过 ::before content 属性来在页面上显示的
接下来我们使用另一种方式
1. 打开终端 全局安装 sass
npm i sass -g
<!-- 
  卸载的话:
    打开终端 npm uninstall sass -g
 -->

2. sass -i
进入交互模式

3. 开始验证: 比如
```scss
>> "你好" + 1
>> "你好1"

>> "你好" + "小花"
>> "你好小花"

>> 你好 + "小花"
>> 你好小花   // 看到了么 这种情况的字符串结果就不带 ""
```

简单的说句就是开始的字符串带引号 结果就带引号
开始的字符串不带引号 结果就不带引号 自己验证下哈

4. 退出交互模式
ctrl + c

交互模式下还可以验证一些运算哈 自己可以课后玩会

<br>---

**<font color="#C2185B">比较运算符 < > <= >=</font>**  
比较运算符 用来比较的是 数值类型
比较运算符 用来比较 符号两端的数值 是 大于 还是 小于 是大于等于 还是小于等于

返回的结果是 布尔型
```scss
$res: 2px > 1px;    // true
```

比较运算符一般用于条件判断 等待我们后面讲到 @if 的时候 再详细的展开

<br>---

**<font color="#C2185B">逻辑操作符 and or not</font>**  

    部分1 and 部分2

兄弟啥叫表达式 那你就理解成 部分1 和 部分2 我们关注 部分1 和 部分2 的布尔值结果

and: 
  我们理解为 且 的关系 也就是 and操作符的两端的表达式 结果都要满足 都要为true的时候 结果才是 true 两端有任意一端不满足条件 结果就是false
```scss
$num: 10px;

// num必须大于1px 同时且 num必须小于20px res的结果才是true 如果任意一段不满足 则结果就是false
$res: $num > 1px and $num < 20px;

<br>

$num: 2px;

// num必须要大于1px 同时且 num的类型必须是字符串 res的结果是
$res: $num > 1px and type-of($num) == string;   // false
```

or:
我们理解为 或 的关系 也就是 or操作符的两端的表达式 只要有一端是true 那么结果就是true 如果全是false 结果就是false
```scss
$num: 10px;
// 两端 只要任意一段结果为true 那么res的结果就是true
$res: $num > 1px or $num > 20px;
```


not:
取反, true 变 false, false 变 true
```scss
$bool: true;

content: "#{not $bool}";
```

<br>

# @extend 继承
从字面意思也能很好理解, 比如我老爹有钱 我继承了我老爹的资产 那资产是不是就属于我了
再比如:
你说个很有意思的笑话 结果我笑死了 你成功的继承了我的花呗(当然你只能继承我的欠款)

在写网页的时候也是一样的, 有的时候一个元素使用的样式与另一个元素完全相同, 相同的样式没有必要再写 这时候我们就可以使用继承 相当于 将一个元素的样式 复制到另一个元素中一样 而且还可以扩展额外的样式。

比如:
```html
<div class="box1"></div>
<div class="box2"></div>
```

```scss
.box1 {
  width: 500px;
  height: 300px;
  background: #F7AD25;
}

.box2 {
  // 使用 extend 继承 .box1 中的样式 相当于 复制了一份
  @extend .box1;

  // 还可以扩展自己的样式
  background: #00708D;
}
```

**<font color="#C2185B">格式: @extend 目标选择器</font>**  
在{ }使用 @extend 选择器 记住就*相当于*将目标选择器里面的css内容复制一份 到元素里面

**<font color="#C2185B">特点:</font>**  
1. 可以继承多个;
```scss
.box1 {
  width: 500px;
  height: 300px;
  background: #F7AD25;
}

.error {
  background: red;
}

.box2 {
  @extend .box1;
  @extend .error;
}
```

2. 可以连锁继承
box2继承了box1和error里面的内容 box3继承了box2
```scss
.box1 {
  width: 500px;
  height: 300px;
  background: #F7AD25;
}

.error {
  background: red;
}

.box2 {
  @extend .box1;
  @extend .error;
}

.box3 {
  @extend .box2;
  background: #4493B1;
}
```


**<font color="#C2185B">% 占位符选择器</font>**  
我们上面介绍了 @extend 继承的使用方式 但实际上我们不太会直接继承一个元素的样式
更多的是 @extend 和 % 配合使用

我们先看看怎么定义 占位符选择器
我们定义class id的时候 都是这样是么
```scss
// id
#content { ... }

// class
.item { ... }

// 定义占位符选择器
%base { ... }
```

那占位符选择器有什么样的用处呢?
1. 占位符选择器里面的内容 不会被编译到 css 文件中


有种情况 被继承的css类并没有被实际应用, 也就是说html代码中没有使用该类, 它的唯一目的就是给别人继承的

对于这样的类, 我们不希望被编译输出到最终的css文件中, 编译过去只会增加CSS文件的大小, 永远不会被使用。这时候我们就会选择用占位符选择器
```scss
%content-base {
  width: 500px;
  height: 100px;
  border: 1px solid black;
}

.box1 {
  @extend %content-base;
  background: #F7AD25;
}
.box2 {
  @extend %content-base;
  background: #00A65E;
}
```


% 和 @extend 配合最大的好处就是 逻辑清晰 方便管理 方便复用
我们体会下下面的例子

需求:
正常的链接 点我跳转 >
加上 target="_blank" 窗口图标
加上 连接 pdf 的时候 我们显示的是 pdf图标

```scss
.btn {
  width: 200px;
  height: 40px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: g.$color-primary;
}


%link-base {
  text-decoration: none;
  font-size: 1.4rem;
  position: relative;
  padding-right: calc(1em + 12px);
  line-height: 1.5;

  &::after {
    content: "";
    display: block;

    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    
    background-repeat: no-repeat;
    transition: all 0.2s;
  }

  &:hover {
    opacity: .8;
  }
}

%arrow {
  background-image: url("/image/ic_arrow.svg");
  background-size: 1.5em 3em;
  width: 1.5em;
  height: 1.5em;
}

%blank {
  background-image: url("/image/ic_blank.svg");
  background-size: 1.5em 3em;
  width: 1.5em;
  height: 1.5em;
}

%pdf {
  background-image: url("/image/ic_pdf.svg");
  background-size: 1.75em 7em;
  width: 1.75em;
  height: 1.75em;
}

.link\:normal {
  @extend %link-base;

  &::after {
    @extend %arrow;
  }

  &[target="_blank"] {
    &::after {
      @extend %blank;
    }
  }

  &[href*=".pdf"] {
    &::after {
      @extend %pdf;
    }
  }
}
```

<br>

# 控制指令 @if
我们上面说过 布尔类型 也了解过 相等运算符 比较运算符 逻辑运算符 这里简单的回顾下
  - 布尔类型:
  - 一共有两个值 true 和 false

  - 相等运算符 == != 
  - 用于判断 运算符两端的值 是否相等 或 是否不等 其结果是布尔类型的值
  - 比如 1 == 1 结果就是个 true

  - 比较运算符 > < >= <=
  - 用于比较数值 运算符两端的数值 是否符合逻辑 结果也是布尔类型的值
  - 比如 1 > 2 结果就是 false

  - 逻辑运算符 and or not
  - 格式就是 部分1 and 部分2 我们拿到 部分1 和 部分2 的布尔值结果 然后进行逻辑运算
  - 结果也是布尔值
  - 比如: $num: 15px; $num > 10px and $num < 20px; 
  - true and true 返回的是不是就是true啊


有了上面的知识后 我们再看看 @if 指令的使用方式

@if 可以理解为分支结构 什么叫做分支结构呢? 

举个例子: 
现在呢 你妈妈和老婆掉水里了 你需要思考救谁
<!-- 
    老婆    妈妈

        ↖ ↗
        条件
         ↓

         你
 -->

  如果 老婆会游泳 救妈妈
  如果 妈妈会游泳 救老婆

反正你回答啥都是挂

也就是说根据不同的条件 执行不同的操作 它是一个多选一的过程

我们看下 条件判断语句的格式 @if指令

**<font color="#C2185B">语法1:</font>**  
```scss
@if 条件 {
  ...
}
```

**<font color="#C2185B">执行思路:</font>**  
在执行 { } 内的逻辑之前需要对条件进行判断 查看条件的结果
如果条件返回的结果为 true 则执行 { ... } 内的逻辑
如果条件返回的结果为 false 则不会执行 { ... } 内的逻辑
  
举个例子:
如果 template 的值为 girl 则 执行后面{ }中的逻辑
```scss
$template: "girl";

.test {
  width: 200px;
  height: 100px;
  border: 1px solid black;

  // 我们利用 条件判断语句 对背景色进行赋值
  @if $template == "girl" {
    background-color: palevioletred;
  }

  // 那如果 是boy呢? 条件为false 则后面的逻辑就不执行了
  @if $template == "boy" {
    background-color: palevioletred;
  }
}
```
  
**<font color="#C2185B">语法2:</font>**  
```scss
@if 条件 {
  ...
}
@else {
  ...
}
```

多了一个@else, 上面只有@if的时候是查看条件 如果符合条件则执行后面的逻辑是么

**<font color="#C2185B">@if ... @else 的执行逻辑</font>**  
还是先会对条件进行判断 
  如果结果为true 则执行if后面的逻辑
  如果结果为false 则指定else后面的逻辑

也就是 2选1 两个肯定会选一个

```scss
$template: "boy";

.test {
  width: 200px;
  height: 100px;
  border: 1px solid black;

  @if $template == "girl" {
    background-color: palevioletred;
  }
  @else {
    background-color: powderblue;
  }
}
```
首先会判断条件 看看 $template == "girl" 的结果 结果是什么呀 false 那么执行的就是 @else 里面的语句
  


**<font color="#C2185B">语法3:</font>**  
```scss
@if 条件 {
  ...
}
@else if 条件 {

}
@else 条件 {
  ...
}
```

多分支语句 就是利用多个条件来选择不同的语句执行 是一个多选1的过程

**<font color="#C2185B">执行逻辑:</font>**  
@if @else if @else 当语句执行时 会从上到下一次对象条件表达式进行求值判断
如果求值的结果为true 则执行当前语句
如果求值的结果为false 则继续向下判断
如果所有的条件都不满足则执行最后的else语句(备胎) 

多选一 当一个{}逻辑被执行之后 后面的语句判断都不会进行下去了

```scss
$template: "man";

.test {
  width: 200px;
  height: 100px;
  border: 1px solid black;

  // 我们利用 条件判断语句 对背景色进行赋值
  @if $template == "girl" {
    background-color: palevioletred;
  }
  @else if $template == "boy" {
    background-color: powderblue;
  }
  @else if $template == "man" {
    background-color: palegreen;
  }
  @else {
    background-color: purple;
  }
}
```

首先会从if开始进行判断 如果不符合 则继续向下判断 直到匹配上为止 一旦其中的任意一条匹配后 整体的逻辑就结束了

多选1 只会选择一个


**<font color="#C2185B">这里再介绍个 内置的函数 if()</font>**  
**<font color="#C2185B">if(条件, value1, value2)</font>**  
会根据条件返回的布尔值 决定返回的是value1 还是value2
如果表达式是true 那么会返回value1 否则函数 value2

*三元运算符*

比如:
我们有这样的一个场景, 我们都知道页面布局的时候 会将网页分割成几个大块
这种大的部分之间的间距 往往外边距都是很大的 而利用元素之间的间距 可能就没有那么大 比如标题和正文之间的间距对么

所以呢 我们可以利用变量 动态的设置margin-top的值
section就意味着大块 如果 template 的值是section则间距就是60px 如果不是就是20px

是不是跟 if else 一样

```scss
$template: "section";

.test {
  width: 200px;
  height: 100px;
  border: 1px solid black;

  margin-top: if($template == "element", 60px, 20px);
}
```

<br>-------------

### @for 循环结构 循环指令
我们先看看 循环指令的语法
```scss
@for 变量 form <start(int)> [to/through] <end(int)> {
  循环体...
}
```

**<font color="#C2185B">start ~ end:</font>**  
要求: 他们两个必须是整数值, 也就是指定循环的次数 

**<font color="#C2185B">[to/through]:</font>**  
这两个关键字选择一个
to: 包括 start 但是不包括 end
比如: start to end: 1 to 3 那么会循环几次呢? 1 2 两次不包括end的值

through: 包括 start 包括 end
比如: start through end: 1 through 3 那么会循环几次呢? 1 2 3 三次包括end值

**<font color="#C2185B">变量</font>**  
变量名是随便起的 你起什么都可以 比如我们起一个 $index
那么
  循环第一次的时候 index的值就是1 
  循环第二次的时候 index的值就是2
  循环第三次的时候 index的值就是3

该变量可以在循环体内部使用


举例:
我们通过循环给li添加背景色
```scss
ul {
  list-style-type: none;
  li {
    width: 200px;
    height: 100px;
    border: 1px solid black;
    margin-bottom: 10px;
  }
}

<br> 

ul {
  list-style-type: none;
  li {
    width: 200px;
    height: 100px;
    border: 1px solid black;
    margin-bottom: 10px;

    
    @for $index from 1 through 6 {
      /*
        这个部分是循环体吧 循环体会执行几次? 1 2 3 4 5 6

        执行第一次的时候 index 是 1 对么 这个 index 变量可以在 循环体内部使用

        这个部分是 #{} 语法吧 可以将变量插入到指定的位置吧 那是不是就相当于
        &:nth-child(1)
        &:nth-child(2)
        &:nth-child(3)
        &:nth-child(4)
        &:nth-child(5)
        &:nth-child(6)
      */
      &:nth-child(#{$index}) {

        // 颜色值可以参与运算吧 那就让这个颜色值 * index 那么循环第一次的时候 * 1 * 2 * 3 * 4 * 5 * 6 是么
        background-color: (#293875 * $index);
      }
    }
  }
}
```

我们验证下 $index 是不是 1 2 3 4 5 6 我们修改下样式
```scss
&::before {
  content: "#{$index}";
  display: block;
  padding: 30px;
}
```

循环能利用在很多地方 你想法有多么的狂野 效果就有多么的惊人
比如我们可以这样
```scss
&::before {
  content: "今天是我爱你的第#{$index}天";
  display: block;
  padding: 30px;
}
```

hetui 渣男 周天你去找谁

再举个例子
给所有的li添加不同的背景图片
```scss
ul {
  list-style-type: none;
  li {
    width: 300px;
    height: 100px;
    border: 1px solid black;
    margin-bottom: 10px;

    @for $index from 1 through 6 {
      &:nth-child(#{$index}) {
        background-image: url(../img/img-#{$index}.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
```

<br>-------------

# @each $var in <list|map>
这节里面我们讲下 数组 和 对象的遍历
这里面有说到了数组 和 对象 还是一样我们简单的回顾下 数组和对象的概念

scss中的数组:
由空格或,分割的值 就称之为数组 比如:
1px solid black
Helvetica, Arial, sans-serif
像这样的结构 都可以称之为数组, 不仅仅只能是css语法中出现的关键字 还可以自定义 只要是满足由空格 或者 ,分割的值都算
比如 I love you

scss中的对象(maps)
定义方式:
```scss
$person: (
  name: "sam",
  age: 18,
  address: "江苏"
)

$title: (
  h1: 60px;
  h2: 48px;
  h3: 24px;
)
```

由小括号包裹 里面是 key:value 形式的一组组的值 就可能称之为对象

那什么又是遍历呢? 很简单就是将保存在 数组和对象结构里面的数据一个一个的取出来使用 就叫做数组的遍历 和 对象的遍历

**<font color="#C2185B">语法结构:</font>**  
```scss
@each 变量 in [数组结构 | 对象结构] {
  ...
}
```

变量:
变量名自己定义随意 变量可以在 { ... } 内部使用

数组或对象中有多少个成员 就会执行多少次逻辑 直到全部取出为止
1, 2, 3
先取出1 然后执行一遍逻辑
再取出2 然后执行一遍逻辑
再取出3 然后执行一遍逻辑 没了就结束了


举个例子:
给不同的li添加不同的背景色
之前我们说过 每一种数组结构 scss就提供了一套操作对应数据结构的函数(工具)
之前我们在介绍数组的时候 介绍过 nth() length() 等工具的使用方式 这里我们先回顾一下
```scss
// 我们定义一个颜色的数组
$img-url: #673AB7, #E91E63, #FF5252;

// 使用 nth() 工具 取出数组中第一个元素
$item: nth($img-url, 1);


.target {
  background-color: #FF5252;
  padding: 30px;

  &::before {
    content: "#{$item}";  // 结果是#673AB7
    display: block;
    padding: 30px;
    background-color: papayawhip;
  }
}
```

现在我们介绍一个新的 工具
**<font color="#C2185B">index(数组, 成员)</font>**  
上面的 nth() 是根据数组中元素的索引 返回对应的成员对吧
index() 则是根据成员 返回对应成员所在的索引
```scss
// 我们定义一个颜色的数组
$img-url: #673AB7, #E91E63, #FF5252;

// 使用 index() 工具 获取 成员#673AB7所在的下标
$index: index($img-url, #673AB7);


.target {
  background-color: #FF5252;
  padding: 30px;

  &::before {
    content: "#{$index}";  // 1
    display: block;
    padding: 30px;
    background-color: papayawhip;
  }
}
```

ok 接下来我们要做什么呢? 前戏够了 进入下一个环节
```scss
$color-bg: #673AB7, #E91E63, #FF5252;

ul {
  list-style-type: none;
  li {
    width: 300px;
    height: 100px;
    border: 1px solid black;
    margin-bottom: 10px;

    // 有几个成员就要遍历几次 因为遍历的目的就是依次取出数组中的成员
    @each $item in $color-bg {
      // item 在第一次的时候 是 #673AB7

      // 那我是不是可以获取到 #673AB7 所在的下标呀 
      $i: index($color-bg, $item); // #673AB7 对应的下标
      
      // 第一个li吧
      &:nth-child(#{$i}) {
        background-color: $item;
      }
    }
  }
}


// 编译后的代码
ul li:nth-child(1) {
  background-color: #673AB7;
}

ul li:nth-child(2) {
  background-color: #E91E63;
}

ul li:nth-child(3) {
  background-color: #FF5252;
}
```


上面说的是list数组的遍历 map对象同样能遍历的
```scss
@each key, value in maps {
  ...
}
```

我们上面定义两个变量是么? 为什么? 因为对象的形式就是

  (
    key: value,
  )

也就是一样 对象有多少组key value那么就会遍历多少次 每次会取出key和value

举例:
```html
<h1>我是大标题</h1>
<h2>我是中标题</h2>
<h3>我是小标题</h2>
```

```scss
$title: (
  h1: 80px,
  h2: 60px,
  h3: 30px
);

@each $key, $value in $title {
  // 我们要是想在字符串或者选择器的位置使用变量 需要用插值语法
  #{$key} {
    background: $value;
  }
}
```

<br>

# 混合指令 Mixin
我们在写样式的时候 肯定有很多部分的样式可以复用 我们在编写样式的时候 可以将这些需要重复复用的的代码 提取出来封装成一个 mixin

这样在需要封装起来的样式的时候 可以直接调用 mixin命令就可以了
比如:
我想让一个元素在父元素中 上下左右居中 我们就拿一个特别长的代码就演示
```scss
.container {
  width: 500px;
  height: 300px;
  background-color: palevioletred;
  padding: 30px;
  margin: 0 auto;
  position: relative;

  .inner {
    width: 100px;
    height: 100px;
    background-color: papayawhip;

    // 这部分就是元素居中的代码是么
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
```

那假如页面上还有很多元素 需要居中 是不是说每一个想要居中的元素里面都要写上这段代码
这时候我们就可以考虑使用 mixin

将这段代码封装起来 在需要的位置上调用就可以了
相当于
<!-- 
    一段代码
    一段代码
    一段代码    装到一个容器里面  容器A
    一段代码
    一段代码

    在需要使用这段代码的地方调用 容器A

    // 调用容器A
    容器A() 

    就相当于将塑料袋打开 把里面的东西倒出来是一样的
 -->

我们看看 mixin的时候方式

**<font color="#C2185B">定义 mixin</font>**  
```scss
@mixin 容器名 {
  ...要被封装起来的样式
}
```


那封装起来怎么调用呢?

**<font color="#C2185B">调用 mixin</font>**  
别忘记加小括号哦
```scss
@include 容器名();
```

```scss
// 定义 mixin
@mixin item-center {
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.container {
  width: 500px;
  height: 300px;
  background-color: palevioletred;
  padding: 30px;
  margin: 0 auto;
  position: relative;

  .inner {
    width: 100px;
    height: 100px;
    background-color: papayawhip;
    

    // 调用mixin
    @include item-center();
  }
}
```

mixin就是为了复用样式的

**<font color="#C2185B">mixin的优势:</font>**  
1. 可以传递参数
我们上面封装起来的代码 都是写死的是么 那就是说 我们在哪里调用 代码都是一样的
复用是解决了 但是不能实现 私人定制的要求

比如 还是居中 有的元素调用居中的时候 我希望将元素改成红色 有的元素调用居中的时候我希望将元素修改为蓝色

这是不是由调用者来指定复用样式的属性值呀

那怎么传递参数呢?

**<font color="#C2185B">定义带参数的 mixin</font>**  
```scss
@mixin 容器名($形参1, $形参n) {
  ... 样式里面就可以使用 $形参
}
```

**<font color="#C2185B">调用 mixin 的时候 向其传递参数</font>**  
```scss
@include 容器名(实参, 实参n)
```

我们在定义mixin的时候 我们可以指定一个或多个形参 多个形参之间使用,号分割
声明的形参就相当于 声明了一个变量 但是该变量没有值 没有被赋值

当我们调用 mixin 的时候 可以在小括号内传递实参(实际的参数) 相当于给形参进行了赋值

我们先来看个简单的例子
```scss
// 定义一个 带参数的 mixin  参数就相当于一个变量 那么我们就可以在 { } 里面使用这个变量是么
@mixin bg($color) {

  // 未来我在调用 mixin 的时候 会给这个变量赋值
  background-color: $color;
}

div {
  // 这个 red 会传递到形参 相当于给变量进行了赋值 $color 有值了 那是不是就意味着有背景色了
  @include bg(red);
}
```

<br>

**<font color="#C2185B">形参的默认值</font>**  
当我们定义了带形参之后 我们必须要传递实参 如果不传递的话 scss的编译器就会报错
也可以理解 我们调用 mixin 就是为了将其内部的代码倒出来 可内部的代码里面使用了变量 我们却没给这个变量赋值 那用个寂寞

为了避免上面的事情发生 我们可以给形参赋一个默认值 当我们调用mixin却没有给实参的时候 那么它就会使用默认值 当我们指定了实参的话 就使用我们指定的值

那么默认值该怎么定义呢?

```scss
@mixin 容器名($形参: 默认值) {
  ... 样式里面就可以使用 $形参
}
```

设置了默认值之后 我们再调用 mixin 也不会报错
```scss
@mixin bg($color: red) {
  background-color: $color;
}

div {
  // 即使我们没有传递实参也不会报错
  @include bg();
}
```


**<font color="#C2185B">稍微总结下要点:</font>**  
1. 调用mixin的时候 @include 容器名() 的时候 必须在 选择器内调用
2. 定义 mixin 使用的是 @mixin 指令 调用 mixin 的时候使用的是 @include 指令
3. 当我们定义形参的时候 定义几个形参 就需要对应的传递几个实参 形参和实参的位置顺序是一一对应的
```scss
@mixin bg($color, $padding) {
  background: $color;
  padding: $padding;
}

div {
  // 对的
  @include bg(red, 13px)

  // 错的
  @include bg(13px, red)
}
```

4. 形参的个数 和 实参的个数也要一一匹配 比如我定义了1个形参 但是我传递了2个实参也是不行的

<br>

接下来我们再讲点 mixin 的知识点


**<font color="#C2185B">命名实参</font>**  
我们上面说了 如果我们定义了多个形参的情况下 当我们传递实参的时候 传递的顺序要和形参的顺序一一匹配上 不然就会错乱是吧

那有人说了 我就不想按顺序来 怎么办? 能解决么? 可以
我们定义了 $color $padding 两个形参是么 相当于声明了两个变量是不 它们是不是就是变量名呀

我们在传递实参的时候 可以指定 $color的值是什么 和 指定 $padding的值是什么
```scss
@mixin bg($color, $padding) {
  background: $color;
  padding: $padding;
}

div {
  // 即使顺序没有和形参的顺序一一匹配 但是我们在传递实参的时候 就指定形参对应的值了
  @include bg($padding: 13px, $color: red)
}
```


**<font color="#C2185B">可变形参</font>**  
我们看下下面的例子 这是一个有阴影的盒子
```scss
html {
  background: rgba(221, 215, 215, 0.7);
  color: #fff;
}

div {
  width: 300px;
  height: 200px;
  background: #fff;
  border-radius: 10px;
  margin: 50px auto;
  
  box-shadow:
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    100px 100px 80px rgba(0, 0, 0, 0.07);
}
```

现在我们就将阴影部分封装起来
```scss
@mixin shadow($val) {
  box-shadow: $val
}
```

那我们传递值的时候怎么传递?

12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 100px 100px 80px rgba(0, 0, 0, 0.07);

我们要传递这个吧, 这不就相当于两个实参了么 我们先试试哈 看看可不可以
其实不行吧 因为形参的个数 和 实参的个数不一致是么

**<font color="#C2185B">定义 可变形参</font>**  
```scss
@mixin 容器名($形参...) {
  ... 样式里面就可以使用 $形参
}
```

当我们传递多个实参的时候 实参会被封装到参数数组(arglist)中被可变形参接收
```scss
@mixin shadow($val...) {
  box-shadow: $val;
}

div {
  width: 300px;
  height: 200px;
  background: #fff;
  border-radius: 10px;
  margin: 50px auto;

  @include shadow(12.5px 12.5px 10px #333, 100px 100px 80px #ccc);
}
```

别看 可变形参 长的怪 后面还带了 ... 
$val... 这只是声明成可变形参的一种方式 你就还当变量用 $val 用的时候你也不用把...带上

<br>

**<font color="#C2185B">@content 和 代码片段</font>**  
有人可能会说 兄嘚 怎么还有啊 是啊 还有呀 怎么地吧
因为 mixin 很强大 很灵活 在开发中用的是最多的哈 所以呢mixin的功能也会对应的多一些
其实也有好处 因为功能多 就代表着可以玩的花样就多 能下节课的时候给你们做几个功能
 
我们先看看代码片段在哪哈

```scss
// 定义 带参数的mixin
@mixin bg($color) {
  background: $color;
}

// 调用mixin并传递实参
div {
  @include bg(red);
}
```

到这都没有问题是么 看啊 代码片段来了 在调用 mixin 的时候 我在最后给它整个 {} 
```scss
@mixin bg($color) {
  background: $color;
}

div {
  @include bg(red) {
    ... 代码片段
  }
}
```

注意啊 是在调用mixin的最后 追加了一对花括号是么
```scss
div {
  @include 容器名(实参) {
    代码片段
  }
}
```

代码判断有什么用呢? 使用代码片段必须和 @content 一起配合使用

**<font color="#C2185B">@content的位置 在定义 mixin 的阶段 写在了定义mixin的花括号里面</font>**  
```scss
// 定义
@mixin 容器名($形参) {
  background: $color;

  // 代码片段会替换掉 @content
  @content;
}


// 调用
div {
  @include 容器名(实参) {
    代码片段
  }
}
```

我们调用mixin时指定的代码片段会传递到@content的位置 换句话说就是将 代码片段 替换掉 @content

啊 有人说了 我好像明白点了 就是在定义 mixin 的阶段 我挖个坑对吧
在调用 mixin 的阶段 传点代码片段 把坑埋了是吧

那这玩意有啥用啊?

我们定义的形参还是实参 都是传值吧, 在调用mixin的时候 将值传递进行 动态的设置 *已经定义好的* 属性

而代码片段可以实现往里面追加内容

举例:
```scss
html {
  background: rgba(221, 215, 215, 0.7);
  color: #fff;
}

@mixin custom($color, $align) {
  background-color: $color;
  text-align: $align;

  @content; // line-height: 200px; 我们传递的代码片段 相当于替换掉 @content
}

div {
  width: 300px;
  height: 200px;
  background: #fff;
  border-radius: 10px;
  margin: 50px auto;
  color: black;

  @include custom(#E91E63, center) {
    // 传递代码片段
    line-height: 200px;
  }
}
```
比如我们还可以干什么呢? 在调用mixin的时候 给它元素追加不同的背景图片是不是也可以
还是那句话 你的想法决定了你能玩出什么样的花样

这时候有个老哥又说了 xiongdei 没了吧
哈哈 不好意识 其实还有 但剩下的知识点 细节 我们在以后在进行补充哈 先到这里

<br>

# @media 媒体查询
关于媒体查询怎么使用 我们就不说了哈 因为这里scss和css中的@media的使用方式是一样的 只不过 scss中的@media增加了一点点点点的功能

我们先回顾下 css 中的媒体查询的书写方式
```css
@media only screen and (min-width: 500px) {
  选择器 {
    样式
  }
}
```

css中的媒体查询肯定是包裹着选择器的 当符合规则的时候里面的样式就会执行对么

scss中的 @media 用法和css一样 但它允许写在 嵌套规则的里面
```scss
div {
  // 小于 500px 时候的样式
  width: 100%;
  height: 150px;
  background-color: palevioletred;
  padding: 30px;
  text-align: center;
  line-height: 150px;

  // 大于 500px 的时候
  @media screen and (min-width: 500px) {
    background-color: palegoldenrod;
  }
}
```

我们将 @media 写在了嵌套规则的里面 这样逻辑是顺下来的 上面小于500px的样式 下面就可以定义 当大于500px的时候是什么样式 很顺很丝滑

有人说兄嘚 我就不!!! 额 开心就好

<br>

### 封装 媒体查询
我们有没有发现 媒体查询的代码有点长啊 还有我们只指定了一个断点(大于500px) 那一个响应式的页面 要指定好几个断点吧

比如 大屏 pc 平板 sp 这就四个是么
那每次都要记尺寸 还要写这么长的代码 不累么? 程序员最大的优点就是懒 来 这节课我们讲讲怎么减少代码量 将媒体查询的逻辑进行封装

**<font color="#C2185B">1. 将断点定义为一个对象</font>**  
```scss
$breakpoints: (
  "xs": "screen",
  "sm": "screen and (min-width: 600px)",
  "md": "screen and (min-width: 1240px)",
  "lg": "screen and (min-width: 1440px)"
);
```

这样我们是不是可以根据 属性名 获取属性值呀 比如 sm 对应的就是 screen and (min-width: 600px) 是不

**<font color="#C2185B">2. 使用 mixin 封装 @media</font>**  
```scss
@mixin mq($bp: md) {
  @media #{map-get($breakpoints, $bp)} {
    @content;
  }
}
```

解析:
使用 mixin 是不是相当于 将一些代码封装起来 装到一个塑料袋里面
在选择器内调用 mixin 的时候 相当于将封装的代码倒出来对么
```scss
div {
  // 比如我们这里调用mixin
  @include mq() {}
}

-- 是不是相当于

div {
  @media #{map-get($breakpoints, $bp)} {
    @content;
  }
}

-- 对么
```

map-get($breakpoints, $bp) 是不是根据指定的属性名 获取对应的属性值
默认值是 md 我们拿着md 去对应里面能找到什么?

screen and (min-width: 1240px) 对不

#{} 是不是差值语法 那是不是说 相当于把我们取到的值放在了 #{} 的位置 代码就会变成下面的样子吧
```scss
div {
  // 是不是变成能看懂的媒体查询了
  @media screen and (min-width: 1240px) {
    @content;
  }
}
```

代码片段 当我们调用mixin的时候 如果有代码片段 是不是最终会替换掉@content的位置
也就是说
```scss
@mixin mq($bp: md) {
  @media #{map-get($breakpoints, $bp)} {
    @content;
  }
}

div {
  @include mq() {
    // 当大于1240px的时候 背景颜色为红色
    background: red;
  }
}

<br> 相当于

div {
  // 是不是变成能看懂的媒体查询了
  @media screen and (min-width: 1240px) {
    background: red;
  }
}

-- 对不
```

没事写两边哈

<br>

# 自定义函数
自定义函数的使用方式 跟 mixin 很像 比如
1. 可以定义形参 和 实参
2. 形参 和 实参的个数 传参时候的顺序 也要一一匹配
3. 也可以使用 命名实参
4. 也可以使用 可变形参

这点上和 mixin 一样 但是作用却不相同 

mixin的目的是:
  css 代码的复用 我们把一些需要多个地方使用的代码放在mixin里面 在合适的地方进行调用 这样我们就实现了 复用的目的是么

函数的目的是:
  要通过函数体里面的逻辑 最终返回一个我们需要的值 也就是*返回值*

我们先看看函数长什么样

**<font color="#C2185B">函数的定义</font>**  
```scss
@function 函数名() {
  ... 函数体

  @return 一个我们需要的值
}
```

我们先看一个简单的例子:
需求:
两个盒子之间的间距 必须是盒子宽度的 1/10

```html
<div></div>
<div></div>
```
```scss
$box-width: 200px;

@function getGutter($width) {
  @return $width / 10
}


html, body {
  height: 100%;
  display: flex;
}

div {
  width: $box-width;
  height: 100px;
  border: 1px solid black;

  &:nth-child(1) {
    margin-right: getGutter($box-width);
  }
}
```


需求:
根据我传递进来的条件 动态设置背景图片
```scss
@function bg($type: "white") {
  @if $type == "white" {
    @return url(../img/img-1.png);
  }
  @else {
    @return url(../img/img-2.png);
  }
};


div {
  width: 200px;
  height: 100px;
  border: 1px solid black;
  
  background-image: #{bg()};
}
```

从上面的例子也能看出来 写法和我们接触过的mixin一样吧
只是函数注重的是 通过函数体内的逻辑执行 最终会返回一个结果

这个结果可以插入到 我们要用的地儿 

还可以干什么呢?
作为前端选手 他不光光要会pc端的布局 还要会移动端的布局

你想啊 当有一个漂亮的UI小姐姐给了你一份 375px 的移动端设计稿的时候
我们第一个想法是什么? 小姐姐真好看 中午带她去哪吃呢? 

适配吧? 为了呢? 那我们能按照这份设计稿中标记的尺寸直接吃css么?
能不能试试呗? 我们会发现呀 很多设备上的尺寸不一样 那你说 ui小姐姐给你的设计稿不能只让你实现 iphone6 吧

所以呢 我们直接写px是不行的 那怎么办?
我们思考一个问题哈 你说我们要写一个 占页面宽度一半的盒子 怎么写?
```scss
div {
  width: 50%;
}
```
那这个盒子是不是到任何屏幕尺寸下 宽度都是一样的 因为都是屏幕的一半嘛
那这种写法的核心是什么 比例吧

其实啊 人家ui小姐姐给我们的设计稿 虽然是 375px 的 但是人家核心的意思也是让你考虑元素与设计稿之间的比例关系 我们拿着这个比例关系 去布局页面 是不是就ok了

这就是适配
由于移动端设备的屏幕尺寸大小不一 会出现同一个元素 在两个不同的手机上显示效果不一样(比例不同) 要想让同一个元素在不同设备上 显示效果一样 就需要适配

无论采用何种适配方式 中心原则永远是 *等比*

适配的方案有很多 比如 vw rem viewport呀 我们这里拿vm举例

vw / vh
这两个单位是相对单位

1vw = 等于布局视口宽度的 1%
1vh = 等于布局视口高度的 1%

兄弟啊 什么是布局视口? 这个属于移动端的知识哈 你说我要是在这里解释 移动端的知识打底就得一小时 我要解释布局视口 肯定也要解释 视觉视口 理想视口 还要说设备独立像素 css像素 物理像素 dpr 你看看这些概念对吧

所以呢 我们这里就简单的理解为 vw呢相当于你把设备宽度分割成了100份 其中一份就是 1vw = 1%

既然vw是比例 那参照的是谁呢? 
vw / vh 参照的是 375px * 667px 
比如 1vw 就是3.75px 1vh 就是6.67px

那它俩又是谁呢 它俩又叫做 设备独立像素 诶老师不对啊 你上面不说 1vw 等于 布局视口宽度的1%么 这里又说是参照 设备独立像素 这多打脸啊

当我们网页中写上 <meta name="viewport" content="width=device-width"> 的时候 这时候的 布局视口 = 设备独立像素 这个标签是 是移动端必须写的一个

这里我们就知道 vw / vh 就是参照它俩的就可以了 至于什么设备独立像素之类的 感兴趣的去看看其它的一些相关资料

这节课里啊 我们了解到 参照谁就可以了

思考
比如我们现在有ui小姐姐给我们提供的 移动端的设计稿 宽度为 375px
现在呢
设计稿上有一个 搜索框 + 搜索按钮
搜索框为300px 搜索按钮是50px

那请问 这个搜索框 和 按钮 各占 设计稿的百分比是多少?

300px 占 设计稿 375px 的百分比多少?

  300 / 375 * 100 就是百分比呗

那我们看看 直接写px的效果
我们会发现 不同设备下的效果是不一样的 有的多 有的少

但是我们使用vw适配之后 是不是所有的设备下 效果都是一样的
这就是适配 所以呢 我们不能再写px了 而是要写 vw

问题来了 终于要回到scss身上了 每个属性我们都要计算
 width
 height
 padding
 margin

没个属性的值我们都要计算 累不累 是scss支持计算 但写的多不多 你不就是想要个值么 @function 是不是就是计算值的 那我们就用函数被

```scss
* {
  margin: 0;
  padding: 0;
}

// $size: 设计稿上的px $type: 设计稿尺寸 给个默认值
@function getVw($size, $type: 375) {
  // 前面的公式 没毛病吧
  @return $size / $type * 100vw
};


// #container {
//   display: flex;

//   #search {
//     width: getVw(300);
//     height: getVw(50);
//     background-color: palevioletred;
//   }
//   #btn {
//     width: getVw(75);
//     height: getVw(50);
//     background-color: papayawhip;
//   }
// }

#container {
  display: flex;

  #search {
    width: 300px;
    height: 50px;
    background-color: palevioletred;
    flex: none;
  }
  #btn {
    width: 75px;
    height: 50px;
    background-color: papayawhip;
    flex: none;
  }
}
```

上面我们总说比例 有人肯定会说 为啥不用 100% 百分比 我怎么觉得百分比 跟vw能一样呢
试试呗
```scss
html, body {
  height: 100%;
}

#container {
  display: flex;
  // 这也要加
  height: 100%;

  #search {
    width: (300 / 375) * 100%;
    height: (50 / 375) * 100%;
    background-color: palevioletred;
    flex: none;
  }
  #btn {
    width: (75 / 375) * 100%;
    height: (50 / 375) * 100%;
    background-color: papayawhip;
    flex: none;
  }
}
```

首先 发现盒子都没有出来 因为少了 html 的高度 height %的话 是参照html的高度吧
其次 发现盒子的高度不像是正常的高度 有点高

为什么呀? 宽度的时候我们用 % 没有问题就是屏幕的宽度的百分之多少
高度我们是通过设计稿的尺寸计算出来的比例对吧 但是 height: 40% 这时候参照的不是我们设计稿的比例了 而是 html 的高度

参照物出现了问题 所以百分比就不能做适配了呗

函数的应用场景还有很多哈 开动你们智慧的小脑袋瓜 好好想想

<br>

### 内置函数
scss到这里 整个语法部分就要结束了 我们上面讲的都是些概念 还有一些api的用法 仅仅是了解这些 那只能说我们接触过scss 懂一些基本的东西 实际上 我们想要灵活的运用scss 还要通过不断的写页面 敲代码 练习

接下来我们讲讲 scss中提供的内置函数 我们前面讲了数据的类型 每一种类型 scss都对应的提供了 操作该类型的一些方法 你就可以理解工具 不难 所以接下来我就带大家 去过一遍 这些api的使用方式


**<font color="#C2185B">字符串函数</font>**  
字符串的索引 
有人会问 字符串也有索引么? 我们可以这么理解 比如我们定义一个字符串
abc

你可以想象成把abc这个字符串 放在了一个数组中 [a,b,c] 每一个元素就是字符串当中的一个字符

既然是放在了数组中 那么前面也说过 数组中每一个元素 都对应着有一个索引(下标)是么
字符串的索引也是这个意思

字符串的索引从1开始, 比如
  索引为1的元素就是 a
  索引为2的元素就是 b
  索引为3的元素就是 c


了解了索引的概念后 我们看下下面的方法

**<font color="#C2185B">quote(字符串)</font>**  
将传入的字符串 添加上引号 返回
返回的是新的字符串

参数:
字符串
```scss
$str: abc;

// 调用 quote() 传入字符串 会返回一个新的字符串 加引号的
$res: quote($str);   // "abc"

$str;   // abc
```
怎么验证呢? 我们可以在终端中输入 sass -i 打开交互模式 在里面进行验证


**<font color="#C2185B">unquote(字符串)</font>**  
很简单 跟上面的作用正好相反 将传入的带引号的字符串 返回一个去掉引号后的新的字符串


**<font color="#C2185B">to-lower-case(字符串)</font>**  
将字符串转为小写

**<font color="#C2185B">to-upper-case(字符串)</font>**  
将字符串转为大写
返回的都是新的字符串


**<font color="#C2185B">str-length(字符串)</font>**  
返回字符串的长度
汉字算一个


**<font color="#C2185B">str-index(字符串, 字符)</font>**  
返回给定字符 在字符串中的下标(索引)
```scss
$str: "hello"
str-index($str, h)  // 1

str-index($str, o)  // 5
```


**<font color="#C2185B">str-insert(字符串, 新字符, 位置)</font>**  
在字符串中指定的位置的*前面* 插入新字符 返回的是 插入新字符后的字符串

```scss
$str: abc;
$res: str-insert($str, d, 3);   // abdc 注意是将新字符串插入到指定位置的前面

// 比如我要是想插入到c的后面 我们可以传递个4
$res: str-insert($str, d, 4);   // abcd
```

传多了也没有用 传递5还是最后一个字符


**<font color="#C2185B">str-slice(字符串, 起始位置, 结束位置)</font>**  
截取字符串 
从开始的位置 截取到结束的位置 包括两端

```scss
$str: abcdefg;
$res: str-slice($str, 1, 3);  //abc 我们能看到是 1 3 位置都算都会截取到
```

结束位置还可以传递负数 -1代表最后一个
```scss
$str: abcdefg;
// -2就是f 那就是从a截取到f
$res: str-slice($str, 1, -2);
```

<br>---

**<font color="#C2185B">数字函数</font>**  
操作数字的函数 见名知意 很简单 简单的过下

**<font color="#C2185B">percentage(数字)</font>**  
将传入的数字 * 100% 返回 单位是%
```scss
percentage(0.9) // 90%
```

**<font color="#C2185B">round(数字)</font>**  
四舍五入为整数
```scss
>> round(1.33)
>> 1
>> round(1.53)
>> 2
```

**<font color="#C2185B">ceil(数字)</font>**  
数值向上取整 有小数就进1
```scss
>> ceil(1.33)
>> 2
```

**<font color="#C2185B">floor(数字)</font>**  
数值向下取整 会舍弃小数位

**<font color="#C2185B">abs(数字)</font>**  
获取绝对值

**<font color="#C2185B">min(多个数字)</font>**  
获取最小值
```scss
>> min(1,3,4,5)
>> 1
```

**<font color="#C2185B">max(多个数字)</font>**  
获取最大值

**<font color="#C2185B">random(数字 | 空)</font>**  
不传入值: 获得0-1的随机数
```scss
>> random()
>> 0.996883854
```

传入正整数n: 获得0-n的随机整数(左开右闭)不包括左边的 包括右边的
```scss
>> random(10)
>> 6
```

<br>---

**<font color="#C2185B">数组函数</font>**  

**<font color="#C2185B">length($list)</font>**  
获取数组长度

**<font color="#C2185B">nth($list, n)</font>**  
获取指定下标的元素

**<font color="#C2185B">set-nth($list, $n, $value)</font>**  
向$list的$n处插入$value

**<font color="#C2185B">join($list1, $list2, $separator)</font>**  
拼接$list1和list2；$separator为新list的分隔符, 默认为auto, 可选择comma、space

**<font color="#C2185B">append($list, $val, $separator)</font>**  
向$list的末尾添加$val；$separator为新list的分隔符, 默认为auto, 可选择comma、space

**<font color="#C2185B">index($list, $value)</font>**  
返回$value值在$list中的索引值

**<font color="#C2185B">zip($lists…)</font>**  
将几个列表结合成一个多维的列表；要求每个的列表个数值必须是相同的

<br>---

**<font color="#C2185B">映射函数</font>**  
**<font color="#C2185B">map-get($map, $key)</font>**  
获取$map中$key对应的$value        |

**<font color="#C2185B">map-merge($map1, $map2)</font>**  
合并$map1和$map2, 返回一个新$map

**<font color="#C2185B">map-remove($map, $key)</font>**  
从$map中删除$key, 返回一个新$map

**<font color="#C2185B">map-keys($map)</font>**  
返回$map所有的$key

**<font color="#C2185B">map-values($map)</font>**  
返回$map所有的$value

**<font color="#C2185B">map-has-key($map, $key)</font>**  
判断$map中是否存在$key, 返回对应的布尔值

**<font color="#C2185B">keywords($args)</font>**  
返回一个函数的参数, 并可以动态修改其值

<br>---

**<font color="#C2185B">颜色函数</font>**  
**<font color="#C2185B">rgb($red, $green, $blue) </font>**  
返回一个16进制颜色值

**<font color="#C2185B">rgba($red,$green,$blue,$alpha)</font>**  
返回一个rgba；$red,$green和$blue可被当作一个整体以颜色单词、hsl、rgb或16进制形式传入

**<font color="#C2185B">red($color) </font>**  
从$color中获取其中红色值

**<font color="#C2185B">green($color)</font>**  
从$color中获取其中绿色值

**<font color="#C2185B">blue($color)</font>**  
从$color中获取其中蓝色值

**<font color="#C2185B">mix($color1,$color2,$weight?)</font>**  
按照$weight比例, 将$color1和$color2混合为一个新颜色

**<font color="#C2185B">lighten(颜色, 百分比)</font>**  
通过改变颜色的亮度值, 让颜色变亮, 创建一个新的颜色

**<font color="#C2185B">darken(颜色, 百分比)</font>**  
通过改变颜色的亮度值, 让颜色变暗, 创建一个新的颜色

<br>---


**<font color="#C2185B">HSL函数</font>**  

**<font color="#C2185B">hsl($hue,$saturation,$lightness)</font>**  
通过色相(hue)、饱和度(saturation)和亮度(lightness)的值创建一个颜色

**<font color="#C2185B">hsla($hue,$saturation,$lightness,$alpha)</font>**  
通过色相(hue)、饱和度(saturation)、亮度(lightness)和透明(alpha)的值创建一个颜色

**<font color="#C2185B">saturation($color)</font>**  
从一个颜色中获取饱和度(saturation)值 

**<font color="#C2185B">lightness($color)</font>**  
从一个颜色中获取亮度(lightness)值

**<font color="#C2185B">adjust-hue($color,$degrees)</font>**  
通过改变一个颜色的色相值, 创建一个新的颜色

**<font color="#C2185B">hue($color)</font>**  
从一个颜色中获取亮度色相(hue)值 

<br>---

**<font color="#C2185B">Opacity函数</font>**  

**<font color="#C2185B">alpha($color)/opacity($color) </font>**  
获取颜色透明度值

**<font color="#C2185B">rgba($color,$alpha)</font>**  
改变颜色的透明度

**<font color="#C2185B">opacify($color, $amount) / fade-in($color, $amount)</font>**  
使颜色更不透明

**<font color="#C2185B">transparentize($color, $amount) / fade-out($color, $amount)</font>**  
使颜色更加透明

<br>---

**<font color="#C2185B">Introspection函数</font>**  
**<font color="#C2185B">type-of($value)</font>**  
返回$value的类型

**<font color="#C2185B">unit($number) </font>**  
返回$number的单位

**<font color="#C2185B">unitless($number) </font>**  
判断$number是否带单位, 返回对应的布尔值

**<font color="#C2185B">comparable($number1, $number2) </font>**  
判断$number1和$number2是否可以做加、减和合并, 返回对应的布尔值


https://baijiahao.baidu.com/s?id=1707847578036700250&wfr=spider&for=pc


<br>

# node环境下的安装

node-sass 安装:　　

  npm i -g node-sass

检查是否安装成功: node-sass -v  

      安装的时候可能会出现版本上的错误 我使用的是node17 sass不知道 应该是最新吧
      经过测试这种搭配在 node: 14版本下可以正常的运行

<br>

### vue环境下
1. 首先运行命令:  
  npm install --save-dev node-sass sass-loader

2. 指定各个版本
```js
"node-sass": "^4.14.1",
"sass-loader": "^8.0.2",

"sass": "1.32.13",  // 这个并没有指定 没写这行 备忘用
```

**注意:**
在指定上方的软件版本的情况下 还要注意对应的 node 的版本 
比如: 上面的版本在 node -v 14 的时候不会报错 但是 node -v 16 的时候就报错

<br>

### 编译文件
#### 单文件编译 语法格式:  
```
node-sass 原有的scss文件 生成的css文件  
node-sass 原有的scss文件 -o 生成目录

node-sass a.scss b.css
nod-sass a.scss -o css_file
```

<br>

#### 多文件编译 语法格式:  
node-sass 原有的scss文件目录 -o 生成的css文件目录
node-sass c -o d

<br>

#### 文件监听模式
当文件改变的时候 自动编译 在 单 和 多 的基础上添加 -w 命令行参数即可  
```
node-sass -w 原有的scss文件 -o 生成目录
node-sass -w 原有的scss文件目录 -o 生成的css文件目录
```

<br>

### dart-sass 安装
npm i -g sass
该模块为第三方库 所以可以考虑使用 npm i sass -D(-D == --save-dev)


**<font color="#C2185B">dart-sass 使用</font>**  
需要手动的调用dart语言的api 来去执行一些命令
```js
  let sass = require("sass")
  sass.render({file: scss_filename}, function(err, res) { ... })

  // or

  let res = sass.renderSync({file: scss_filename})

  // 默认情况下 renderSync的速度是render的两倍以上 这是由于异步回调所带来的开销导致的
```

<br>

### node-sass 和 dart-sass 的区别
node-sass 和 dart-sass 都是将 sass 文件编译为css文件的工具

通过 npm i sass -g 安装的是 dart-sass

**<font color="#C2185B">区别:</font>**  
node-sass 是用 node(调用 cpp 编写的 libsass)来编译 sass, 而dart-sass 是用 drat VM 来编译 sass。
node-sass是自动编译实时的, dart-sass需要保存后才会生效。
node-sass不包含最新语法, 而dart-sass包含。

**<font color="#C2185B">Easy Sass</font>**  
VScode的一款插件, 可以自动编译SASS/SCSS文件生成.css和.min.css(去空格注释的压缩文件)保存。您还可以快速编译项目中的所有SCSS/SASS文件。

**注意:**
使用easy sass自动编译产生的文件不支持sass的最新语法(可能是该插件支持的是node-sass, 是不包含最新语法, 而我们下载的是dart-sass是包含最新语法的), 例如下面语法介绍中的模块化(@use)语法就不支持。出现如下提示: 

<br>

# node-sass sass 版本的问题
vue中欲想使用sass, 需要下载sass-loader, sass-loader需要依托于node-sass运行, node-sass的运行环境是node, 所以说需要下载sass-loader和node-sass两个包, 同时node-sass要兼容node版本。

**<font color="#C2185B">以当前node版本为起点, 寻找兼容的node-sass, 根据node-sass版本寻找兼容的sass-loader版本, 依次安装即可安然使用。(为啥以node为起点呢?因为如果sass是项目开发中途加入的话, 肯定以项目为基础)</font>**  

node-sass版本库: 
  https://github.com/sass/node-sass/tags

sass-loader版本库: 
  https://github.com/webpack-contrib/sass-loader/releases/tag

参考链接
https://blog.csdn.net/weixin_43193877/article/details/122221052