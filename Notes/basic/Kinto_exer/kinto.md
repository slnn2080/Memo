### Kinto项目 页面练习 要点集锦

### css3属性
> ::before ::after
- 它们是伪元素 但也可以理解为 *目标元素的第一个子元素* 会插入到其它子元素的前面


> -webkit-text-size-adjust: 100%
- 在移动端为防止字体变大, 添加-text-size-adjust属性为100%可防止字体变大
- 放在body会导致页面缩放失效, 可以使body继承html的样式
- CSS 控制将一些手机或平板设备上使用的文本溢出算法(text inflation algorithm)。其他类型的设备上的浏览器会忽略此属性。

> 作用:
- 检索或设置移动端页面中对象文本的大小调整。

> 要点:
- 该属性只在移动设备上生效
- *如果你的页面没有定义meta viewport, 此属性定义将无效*


    因为许多网站还没有适配屏幕较小的设备, 移动设备的浏览器和桌面浏览器在渲染网页时可能会有不同。
    
    他们不是以设备屏幕宽度布局网页, 而是用比屏幕宽一些的 视窗 去布局网页, 通常是 800 到 1000 像素。
    
    为了将视窗上的布局映射到原始设备屏幕上, 手机浏览器要么只渲染整个页面的一部分, 要么将视窗缩放至原始屏幕大小。

    因为缩放适配小屏幕而导致文字会变得很小, 许多手机浏览器会使用文本溢出算法放大文本, 改善可读性。
    
    当一个包含文本的元素使用了 100% 的屏幕宽度, 该算法会增加文本大小, 但是不会修改布局。
    
    *text-size-adjust* 这个属性允许开发者去除或者修改浏览器的这种行为, 比如, 当网页已经适配了小屏幕之后, 就不需要这么做了。


------

> initial属性值
- 修改所有元素属性 或 父元素的值为其 *初始化值(浏览器的默认值)*


> inherit属性值
- 修改所有元素属性 或 父元素的值为其 *父元素的值*(是继承的意思, 跟随父元素的值的变化而变化)


> unset属性值
- 修改所有元素属性 或 父元素的值为其 *父元素的值*(如果有继承)或其初始值(具有继承特性的CSS, 则使用继承, 例如color)

------

> @media
> 格式: @media [媒体类型] (媒体特性) { ... }
- 每条媒体查询语句都由一个 *可选的媒体类型* 和 *任意数量的媒体特性* 表达式构成。
- 可以使用 *多种逻辑操作符* 合并多条媒体查询语句。

- 当媒体类型(如果指定)与在其上显示文档的设备匹配并且所有媒体功能表达式都计算为 true 时, 媒体查询将计算为 true。涉及未知媒体类型的查询始终为 false。

> 媒体类型:
- 指的就是设备类型

- all
  所有设备

- print
  打印设备

- screen
  带屏幕的设备

- speech
  屏幕阅读器

- projection
  手持设备

- tv
  电视

- braille
  盲文触觉设备

- embossed
  盲文打印机

- speech
  "听觉"类似的媒体设备

- tty
  不适用像素的设备


> 媒体特性:
- width：
  视口的宽度, 一般情况下不管宽度只管高度

- height：
  视口的高度

- min-width
  视口的最小宽度  >500 样式生效

- max-width
  视口的最大宽度  <500 样式生效

- device-width (max min)
  设备独立尺寸

- device-pixel-ratio(必须加-webkit-前缀) (max min)
  像素比

- orientation     portrait竖屏
  landscape横屏
  横竖屏切换

- resolution
  输出设备的像素密度(分辨率)


> 逻辑操作符:
  only        让老的浏览器失效 处理兼容的问题
  and         同时满足多条规则
  ,           满足a生效 或者 满足b也生效
  not         取反

```css
/* ,的用法 当 大于500 或者 小于700 的时候样式生效*/
@media (min-width: 500px), (max-width: 700px) {

}

/* > 500px  和  <700px  同时要求满足  */
@media (min-width:500px) and (max-width:700px) {
    
}

/* 必须是屏幕 在500-700之间 */
@media only screen and (min-width:500px) and (max-width:700px) {
    background-color:#bfa;
}
```

> 结合scss的使用方式:
```scss
@use "./assets/style/foundation/global" as g;

$breakpoint: (
  md: "only screen and (min-width: 835px)"
);

@mixin mq($key: md) {
  @media #{map-get($breakpoint, $key)} {
    @content;
  }
}

.l-cnt__main {
  width: 100%;
  max-width: 1008px;
  margin: 0 auto 60px;
  background-color: gold;

  @include mq() {
    background-color: palevioletred;
  }
}
```

------



----------------

### Google fonts 的使用
> 1. 通过 google 地址请求指定的css
- 方式1:
```html
<!-- 先请求指定的 字体库 -->
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Tangerine">

<!-- 然后使用该字体 -->
<style>
  body {
    /* 使用字体的时候 还要后面跟着一个备用的字体 */
    font-family: 'Tangerine', serif;
    font-size: 48px;
  }
</style>
```

- 方式2:
- 这个 @import url() 可能是css里面的用法
```css
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap");
```

**注意:**
- 当在CSS样式表中定义一个网络字体时, 总是要*列出至少一个网络安全的回退字体*(fallback web-safe font)用来避免不希望的行为。

- 特别是在列表的最后*添加一个CSS默认字体*, 像名为"serif"或者"sans-serif"的字体。这样的话在必要的时候浏览器可以回退到它的默认字体。
```scss
body {
  font-family: 'Tangerine', serif;
}
```


> Google Fonts Api的使用方式
- 谷歌字体目录: 
  http://www.google.com/fonts

- 谷歌字体API的BaseUrl: 
  http://fonts.googleapis.com/css

> 参数: 
> ?family=字体名称
- 字体名称之间有空格的情况下要使用 + 连接
- 请求多个字体集时: 要用竖线 *|* 来隔开名字

- 请求字体的样式:
  字体API默认情况下提供了所请求字体的普通版本。要请求其它的样式或大小, 在字体的名字后面加一个冒号 : 
  跟随在后的一系列的样式和大小用逗号(, )分割
```css
@import "url(http://fonts.googleapis.com/css?family=Tangerine:bold,bolditalic|Inconsolata:italic|Droid+Sans)"
```  

- 对于您所请求的每一个样式, 您既可以提供全名也可以提供缩写, 对于大小, 您可以另外指定一个数字：

  样式	符号

  斜体	italic 或 i
  粗体	bold 或 b 或者是一个数字, 就像700
  粗体  斜体	bolditalic 或 bi

- 文档:
- https://developers.google.com/fonts/docs/getting_started
- https://fonts.google.com/ (这个是官网)

> &display=swap
- 让字体文件本身变成异步的——浏览器会先显示我们的回退(fallback)文本, 等Web字体可用时再切换过去。
```scss
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap");
```

----------------

### scss文件存放位置
- scss 文件应该存放在 src/assets/ 文件目录下

----------------

### 图片存放的位置
- 比如 background-image: url()
- cli3的情况下 放在 public 里面

- 比如:
  | - public
    | - image
      - pic1.png

```scss
div {
  background-image: url(/image/pic1.png);
}
```

----------------

### scss 的前缀名 _ & scss样式组件
- 组件有组件树
  | - 根组件
    | - loginPage组件
      - loginPageParts组件...

    | - cartPage组件
      - cartPageParts组件...


- scss文件也可以组织成样式树

  | - 根样式: 该样式也是最终引入到页面里面的样式
    | - loginPage组件的样式
      - loginPageParts组件的样式...

    | - cartPage组件样式
      - cartPageParts组件样式...


- 所有的 scss文件 也类似一个样式树 那有一个最外层的样式文件 用来包含各个样式组件

- 最终:
- main.js 应该引入一个 style.scss (类似app组件)

- 如果一个目录正在被Sass程序监测, 该目录下的所有scss/sass源文件都会被编译, 但通常不希望局部文件被编译, 
- 因为局部文件是用来被导入到其他文件的。如果不想局部文件被编译, 文件名可以以下划线 （_）开头。

- 每一个模块下对应应该有一个 _all.scss 然后 style.scss 引入各个模块下的 _all.scss

  - style.scss
    | - base
      - _reset.scss
      - _fonts.scss
      - _all.scss

> 要点:
- 1. 这样 style.scss 文件中 引入各个样式组件
- 2. 各个 样式组件 前面需要加上 _ 这样单独的样式组件不会被编译

**注意:**
- 我发现在vue项目里面 我们是用 @use 可以达到样式组件化的目的 但是在普通的vscode里面的项目使用 @use 引入的文件并没有被编译
- 类似 vscode 这种情况我们不能使用 @use 而是要使用 @import

----------------

### _xxx.scss 引入的问题
- 我们在引入 _xxx.scss 文件的时候 不用带 _ 和 后缀
```scss
@use "../../../../node_modules/reset-css/sass/reset"
```

----------------

### Kinto 样式名的命名规则
> .l-cnt__main
- l: 
  是文件夹名字的首字母 kinto的项目在样式目录规划上做了细分 l 可以迅速的定位在哪个样式目录下

- cnt:
  这个样式是管什么的

- __main:
  具体作用于哪一个部分

----------------

### base (文件夹)
- 该文件夹中里面包括 
  1. 使用reset.css修改网站的默认样式 
  2. 内部添加了 自定义的网站的默认样式
  3. 使用的 Google Fonts


> 1. reset.css
- 清除浏览器的默认样式 该scss文件内部 引入了 从下方下载的 reset.css 文件
- npm i reset-css@5.0.1


> 2. font-smoothing
- 作用:
- 该属性的作用就是让页面上的字体变得更加清晰。
- webkit在自己的渲染引擎中*增加的对字体的抗锯齿的调整*, 这个调整在iOS中表现明显, 在Windows中表现不明显

- 一般就是像下面这样使用
```scss
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

> 3. html font-size: 62.5%
- 一般的, 各大主流浏览器的font-size默认值为 16px, 此时 

  1rem = 16px (12px = 0.75rem)

- 把 html 设置成 font-size: 62.5%, 此时 

  1rem = 16px * 62.5% = 10px( 12px = 1.2rem)
  <!-- (1：10的比例更好换算) -->

```scss
html {
  font-size: 62.5%;
}
```


> 4. device-pixel-ratio 设备像素比
- 参考资料:
- https://blog.csdn.net/xueli_2017/article/details/91492971

> 作用:
- dips可以用来辅助区分 视网膜设备 还是 非视网膜设备, *devicePixelRatio = 几倍屏*

- window.devicePixelRatio是*设备物理像素*和*设备独立像素*之间的比率

  window.devicePixelRatio = 物理像素 / 设备独立像素(dips)

- 设备独立像素也叫做:
- dip或dp(device independent pixels, 设备独立像素)与屏幕密度有关

- 像素比为1的时候 一个发光的二极管就显示1个像素的内容
- 像素比为2的时候 四个发光的二极管就显示1个像素的内容 (2倍 但是长宽各2就是4)
- 像素比为3的时候 九个发光的二极管就显示1个像素的内容

----------------

### foundation (文件夹)
- 作用:
- 管理变量
- 管理混合
- 动画定义
- 类似 工具 的一个样式目录

**注意:**
- 哪个组件中需要使用 混合 变量 等样式工具了 可以在页面组件内 引入 _global.scss


- 目录结构

  | - foundation
    - _animations.scss
    - _extend.scss
    - _mixin.scss
    - _variable.scss
    - _global.scss    // 内部使用 @forward 引入混合 和 变量scss文件

- 我们在页面组件中 想要使用 混合 和 变量 需要引入 global 文件 来使用通过它暴露出来的其它样式组件
```scss
// _global.scss 文件
@forward "./mixin";
@forward "./variable"


// 其他的页面组件
@use "./foundation/global" as g
```

- 也就是说我们既可以通过 g 获取变量 还可以通过 g 获取混合


> variable.scss
- 用来管理变量: color width margin
- 利用这里公共的变量 在多个地方使用 达成共同管理的目的


> 要点示例1:
- 示例:
- 下面定义了一个map(scss中的对象) 我们要操作scss中的对象的话 还要借助scss中的内置函数 比如: *map-get($map, "key")*
```scss
$breakpoints: (
  'sm': 'screen and (min-width: 320px)',
  'md': 'screen and (min-width: 835px)',
  'xl': 'screen and (min-width: 1001px)',
) !default;
```

- 使用:
```html
<style lang="scss">
@use "./assets/style/foundation/global" as g;

#app {
  div {
    /* 调用 map-get() 函数 根据 key 获取 $color 对象中的 value*/
    color: map-get(g.$color, "md")
  }
}
</>
```

> 要点示例2:
- 定义的宽度变量 都是包含 padding 的数值
```scss
// width 页面宽度, 要点: pc sp 两端都要保留12px
$w-full: 100%;
$w-main: 1008px;  // 这个结果是包含 左右padding 实际是: 984px
$w-mid: 828px;
$w-small: 702px;

// padding
$w-padding: 0 12px;
```

---

> mixin.scss
> 要点1:
- @mixin mq()
  我们调用 mq() 的时候 其实使用的是 mq() { 结构... } 里面包裹的结构

- @content:
  我们在调用 mq() { 样式片段 } 会替换掉mq中的 @content 的部分

> 要点2:
- @function 是为了拿 @return 的返回值
- 比如下面的示例中 根据我们传入的参数 获取我们在变量文件中定义好的数据

> 要点3:
- 我们在写mixin的时候 不用想着特别的东西 就是在写css 比如
```scss
div {
  // 原本我们打算在这里写 width height
  width: 100px;
  height: 100px;
}

// 现在定义一个 混合
@mixin init($w, $h) {
  width: $w;
  height: $h
}

div {
  +init("200px", "200px")
}
```
  
```scss
// 引入 变量
@use "./variable" as val;

// 定义 根据参数 选择指定尺寸的媒体查询条件
// 参数: 断点, 默认值 md 835px
@mixin mq($breakpoint: "md") {
  @media #{map-get(val.$breakpoints, $breakpoint)} {
    @content;
  }
}

// 获取margin: 根据设备 和 想要获取指定区域的 margin 
// $device: "sp", 默认值为sp
// $mg_type: 想要获取指定区域的 字符串
@function getMargin($mg_type, $device: "sp") {

  // 如果我们传递的是 section 
  @if $mg_type=='section' and $device=="pc" {
    // 返回 variable 里面定义好的内容
    @return val.$mgn-xl;
  }

  @if $mg_type=='section' and $device=="sp" {
    @return val.$mgn-l;
  }

  @if $mg_type=='content' and $device=="pc" {
    @return val.$mgn-l;
  }

  @if $mg_type=='content' and $device=="sp" {
    @return val.$mgn-m;
  }

  // TODO: PC, SPそれぞれのマージンを調整, 現状共通
  @if $mg_type=='block' {
    @return val.$mgn-m;
  }

  @if $mg_type=='element' {
    @return val.$mgn-s;
  }

  @if $mg_type=='min' {
    @return val.$mgn-ss;
  }
  @return 'auto';
}


// 设置margin: 给某一个具体的margin属性设置 margin 比如: margin-bottom
// 参数: $margin: margin-bottom
@mixin setMargin($margin, $mg_type) {
  // sp的时候设置为
  #{$margin}: getMargin($mg_type, "sp");

  // pc的时候设置为
  @include mq {
    #{$margin}: getMargin($mg_type, "pc");
  }
}


// 单独设置pc 和 sp时候的margin 比如: 设置 margin-top
@mixin setMarginPC($margin, $mg_type) {
  #{$margin}: getMargin($mg_type, "pc");
}

@mixin setMarginSP($margin, $mg_type) {
  #{$margin}: getMargin($mg_type, "sp");
}

@mixin heading($size : 2.8rem, $mb : 4.8rem) {
  font-family: val.$title;
  font-weight: bold;
  font-size: $size;
  margin-bottom: $mb;
  line-height: val.$title-height;
}

// @mixin button($bg-color : val.$col_primary , $color : val.$white) {
//   display: inline-block;
//   background-color: $bg-color;
//   color: $color;
//   border-radius: .5rem;
//   line-height: val.$title-height;
//   cursor: pointer;
//   position: relative;
//   text-decoration: none;
//   transition: all .2s;

//   // 数値系のスタイリングはどうしましょう・・
//   padding: 2rem 1.2rem;
//   width: 27rem;
//   font-size:1.6rem;
// }


@mixin Text($size:1.4rem, $weight: normal, $mb: val.$mgn-s) {
  font-weight: $weight;
  font-size: $size;
  line-height: val.$text-height;
  margin-bottom: $mb;
}

// 我们传递的参数是用来设置最大宽度的
@mixin Width($m-width: val.$w-main) {
  @include setMargin('margin-bottom', 'section');
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: $m-width;
  padding: val.$w-padding;
}


// image hover 时候的混合
@mixin imageHover($opacity:.7) {
  transition: .2s ease-out opacity;

  &:hover {
    opacity: $opacity;
  }
}
```

----------------

### layout (文件夹)
- 作用:
- 作用设置 布局的样式组件

- 目录下的结构:
  | - layout
    - _all.scss
    - _header.scss
    - _footer.scss
    - _container.scss

> 要点1: width 和 max-width 的区别
- min-width: 用来限制元素的 *最小宽度*
- max-width: 用来限制元素的 *最大宽度*
- 也就是说当元素的 width > max-width | width < min-width 的时候, 就被它们的值所代替, 尤其适用于网站的自适应。

- min-width 和 max-width 是两堵墙 如果 width > max-width 那么容器的宽度是 max-width 
```scss
div {
  width: 100px;
  max-width: 200px;     // 这时候元素宽度为100px 因为元素宽度没有超过 max-width
  
  
  width: 300px;
  max-width: 200px;    // 这时候元素宽度为200px 因为元素宽度超过 max-width
}
```

- 尤其是搭配100%使用的情况, 小于1008px的时候以width为准 大于1008px的时候会居中
```scss
div {
  width: 100%;
  max-width: 1008px;
  margin: auto;
}
```

> 要点:
- 1. 我们会先定位版心 一般是 width + max-width + margin: auto 组合定位

- 2. 还有一个样式为 全屏 width: 100% + 背景色

- 3. 在总 style.scss 文件中 要是汇总 all.scss 的时候 因为 都是 all 所以每一个all要起别名
```scss
@use "./base/all" as base;
@use "./module/link";
@use "./layout/all" as layout;
```

- 4. 每一个页面可以创建一个样式文件夹

  | - pages
    | - morizo
      - parts.scss
      - style.scss

- 5. 页面组件内动如样式要使用 @
```html
<style lang="scss" scoped>
@use "@/assets/style/pages/kinto_one/morizo/gryaris/style.scss";
</style>
```


> 项目代码:
```scss
.l-cnt__main {
  @include g.Width;
}

// pc固定 SPwidh100%
.l-cnt__main02 {
  margin: auto;
  @include g.setMargin('margin-bottom', 'section');
  width: 100%;
  max-width: g.$w-main;
  @include g.mq {
    padding: g.$w-padding;
  }
}

.l-cnt__full {
  width: 100%;

  &--border {
    border-bottom: 1px solid g.$col_border;
    margin-bottom: 4.8rem;
  }

  &--black {
    background: #000;
  }

  &--gray {
    background: g.$bggray;
  }

  &--lightgray {
    background: g.$bglightgray;
  }

  &--primary {
    background: g.$bgprimary;
  }

  &--darkprimary {
    background: g.$col_primary;
  }

}

// max-width: 828px
.l-cnt__mid {
  @include g.Width(g.$w-mid);
}

// max-width: 702px
.l-cnt__small {
  @include g.Width(g.$w-small);
}


.l-cnt__wrap {
  padding-top: g.getMargin('content', "sp");
  padding-bottom: g.getMargin('content', "sp");
  position: relative;
  @include g.mq {
    padding-top: g.getMargin('content', "pc");
    padding-bottom: g.getMargin('content', "pc");
  }
}
```

> 定位版心
- 我们