### 代码规范
- 类名语义化, 必须全是小写字母, 单词之间使用"- _"来链接
- 类名嵌套层次不要超过三层
- 尽量避免直接使用元素选择器
- 属性的书写顺序:
    - 布局定位属性: display / position / float / clear / visibility / overflow
    - 尺寸属性:     width / height / margin / padding / border / background
    - 文本属性:     color / font /  text-decration / text-align / vertical-align
    - 其他属性:     content / cursor / border-radius / box-shadow / text-shadow
- 避免使用id选择器
- 避免使用通用符* 和 !important

### 目录规范
- 项目文件夹
    - 样式文件夹:css
    - 业务类图片文件夹:images
    - 样式类图片文件夹:icons
    - 字体类文件夹:fonts


### 慕客 / 蓝湖
- 很方便的测量工具 没事的时候自己使用一下

### 适配方案
- flex布局
- 百分比布局
- rem布局
- vw / vh布局
- 响应式布局


### 初始化文件
- 引入 normalize.css
- less中初始化body样式
<!-- 
    body {
        min-width:320px;
        max-width:750px;
        margin:0 auto;

    }
 -->

- 约束范围(使用flexible.js时要约束一下范围)
<!-- 
    约束当屏幕大于750px的时候, html字体大小就不要变化了 效果图是750px但是放在实际屏幕里是375像素 flexible.js是分成10份所以是37.5
    @media screen and (min-width:750px) {
        html {
            font-size:37.5px !importtant;
        }
    }
 -->







### 移动端最小约定为 320px min-width:320px

### 移动端基础

- 移动端对浏览器的兼容性的支持会比较好
- 国内的移动端浏览器暂无自己的内核 都是那 webkit 修改过来的内核 所以
- 兼容移动端主流浏览器 处理 webkit 内核浏览器即可

> https://material.io/devices

- 作为前端开发 不建议去纠结 dp dpi pt ppi 等单位

### 视口

- 视口就是一个屏幕区域, 视口分为布局视口 视觉视口 理想视口, 我们只用理想视口

> 布局视口

- 一般移动设备的浏览器都默认设置了一个布局视口 用于解决早期的 PC 端页面在手机上现实的问题
- ios android 基本都将这个视口分辨率设置为 980px 所以 pc 上的网页大多都能在手机上呈现, 只不过元素看上去很小 一般默认可以通过手动缩放网页
<!--
    以前设计网页时 一般都设计为980px 但是这样直接拿到手机上看的话 里面的元素特别的小
 -->

> 视觉视口

- 用户正在看到的网站的区域. 注意是网站的区域
- 我们可以通过缩放去操作视觉视口, 但不会影响布局视口 布局视口仍然保持原来的宽度

> 理想视口

- 为了使网站在移动端有最理想的浏览和阅读宽度而设定
- 理想视口对设备来讲是最理想的视口尺寸, 需要手动填写 meta 视口标签通知浏览器操作
- meta 视口标签的主要目的: 布局视口的宽度应该与理想视口的宽度一致, 简单的理解就是设备有多宽, 我们布局的视口就多宽
<!--
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
 -->

### meta 视口标签

- 要点: 设备有多宽 视口就有多宽 device-width

> <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

<!--
    width:          宽度设置的是viewport宽度, 可以设置device-width特殊值(设备宽度)
    initial-scale:  初始缩放比, 大于0的数字
    maximum-scale:  最大缩放比, 大于0的数字
    minimum-scale:  最小缩放比, 大于0的数字
    user-scalable:  用户是否可以缩放 yes或no 1或0
-->

### CSS 像素 物理像素

- 物理像素点指的是屏幕显示的最小颗粒, 是物理真实存在的, 这是厂商在出厂时就设置好了, 比如苹果 6 7 8 是 750\*1334
<!--
    ip8 750像素的宽, 代表在ip8下 一行有750个像素点
 -->

- 我们开发时候的 1px 不是一定等于 1 个物理像素的, pc 端页面, 1px 等于 1 个物理像素的, 但是移动端不同　并不是一一对应的关系
<!--
    比如 ip8 就是1:2 1css像素 = 2个物理像素  这种情况就叫做物理像素比
-->

- 一个 px 的能显示的物理像素点的个数, 称为物理像素比或屏幕像素比

### 物理像素 & 物理像素比

- PC 端 和 早前的手机屏幕 / 普通手机屏幕: 1css 像素 = 1 物理像素
- 早期的手机屏幕并不是很清楚, 知道出现 Retina(视网膜屏幕)是一种显示技术, 可以将更多的物理像素点压缩在一块屏幕里 从而达到更高的分辨率, 并提高屏幕显示的细腻程度

### 2 倍图

- 对于一张 50\*50 的图片在 ip8 手机 retina 屏中打开 按照刚才的物理像素比会放大倍数(2 倍), 这样会造成图片的模糊
- 在标准的 viewport 设置中, 使用倍图来提高图片质量 解决在高清设备中的模糊问题
- 通常使用二倍图 因为 ip678 的影响 但是现在还存在 3 4 倍图的情况 这个看实际开发公司需求
- 背景图片注意缩放(我们准备的是 2 倍图 在应用的时候再缩小 1 倍)
<!--
    background-size:50px 50px

    %会继承父元素的宽度 注意
 -->

### 移动端开发方案

> 单独制作 移动端 页面(主流)

- 京东商城手机版
- 淘宝触屏版
- 苏宁易购手机版

> 响应式页面兼容移动端(其次)

- 三星手机官网

### 单独移动端页面

- 通常情况下, 网址域名前面加 m 可以打开移动端 通过判断设备, 如果是移动端打开的页面 则跳转到移动端页面 如果是 pc 端打开的页面则跳转到 pc 端页面

### 响应式兼容 pc 移动端

- 三星电子官网 通过判断屏幕宽度来改变样式, 以适应不同的终端
- 制作麻烦, 需要花很大的精力去调节兼容性的问题, 因为要不断的调整屏幕的宽度

### 移动端浏览器

- 移动端浏览器基本以 webkit 内核为主, 因此我们就考虑 webkit 兼容性问题
- 我们可以放心使用 h5 标签和 css3 样式 同时我们浏览器的私有前缀我们只需要考虑添加 webkit 即可

### 重置样式表

necolas.github.io/normalize.css

### 移动端常见的布局

> 单独制作移动端页面

- 流式布局(百分比布局) 京东
- flex 弹性布局(强烈推荐)
- less+rem+媒体查询 苏宁
- 混合布局

> 响应式页面兼容移动端

- 媒体查询
- BootStrap

### 流式布局(百分比布局)

- 流式布局就是百分比布局 也称非固定像素布局
- 通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩, 不受固定像素的限制, 内容向两侧填充
- 流式布局方式是移动 web 开发使用的比较常见的布局方式

- 流式布局主要指的是宽度

- 为了避免流式布局带来的问题(不能无限拉伸:内容的空白区域会增多, 不能无限缩小:内容会掉下来)
- 所以为了保护我们的盒子在合理的范围 会使用最大值 和 最小值

### max-width 最大宽度 min-width 最小宽度 用来保护我们的内容

- 我们设置这个盒子最大 不能超过多大, 最小不能 不能超过多小
  <!--
      max-width:980px;

      最大值不能超过980px 意思就是说盒子可以正常缩小, 但是拖动屏幕增大时最大也就显示980px, 再拖宽也没有用了

      最小值不能超过600px 意思就是小于600px盒子就不能再缩了
   -->
  <!--
      section {
          width:100%;
          max-width:980px;
          min-width:600px;

          background:black;
          height:100vh;
      }
   -->

### 移动端的流程

- 我们可以给 body 一个 width100%, 因为内部所有的元素都是 body 的孩子
- 同时我们要保证内容的显示 给 body 一个最大和最小的 width
<!--
    body {
        width:100%;
        min-width:320px;
        max-width:640px;
    }
 -->

> 导航栏部分

- 按照 100%的宽度正常划分

### 移动端在做按钮点击跳转的时候一般都是用 js 来做

- 因为有的 x 太小 或者文字区域太小 我们一般用 js 来获取 div 对象来绑定相关的事件

### 移动端 两边固定 中间自适应

> 要点:

- 两边的宽度是固定的 通过定位来定上去
- 中间的宽度不能给, 左右里面 margin 来空出来
<!--
    <div class="search-wrap">
        <div class="search-btn"></div>
        <div class="search"></div>
        <div class="search-login"></div>
    </div>
 -->

<!--
.search-wrap {
    height:44px;
    position:relative;

    .search-btn {
        position:absolute;
        left:0;
        top:0;
        width: 40px;
        height:44px;
        background:aqua;
    }
    .search-login {
        position:absolute;
        right:0;
        top:0;
        width: 40px;
        height:44px;
        background:rgb(8, 92, 92);
    }
    // 只给高不给宽要不然就撑开了
    .search {
        height:44px;
        margin: 0 50px;
        background:rgb(39, 236, 236);
    }
}
 -->

### 移动端二倍精灵图的做法

- 在 firework 里面把精灵图等比例缩放为原来的一半
- 之后根据大小测量坐标
- 注意代码里面 background-size 也要写:精灵图原来宽度的一半

> PS 里的做法

- 先把图片在属性面板里缩放一半
- 然后用矩形工具画出范围, 在属性面板里查看 x y 的坐标
- 在编辑器里 background-size 的值调节成原来的一半, 注意用 px
<!--
    background:url(../images/jd-sprites.png) no-repeat -81px 0;
    background-size:200px;
 -->

### Flex 弹性布局

> 父盒子指定完 flex 后 内部元素就是一行显示

- 优点:
- 操作方便, 布局极为简单, 移动端应用很广泛
- PC 端浏览器支持情况较差
- IE11 或更低版本 不支持或仅部分支持

- 建议:
- 如果是 PC 端页面布局, 我们还是传统布局
- 如果是移动端或者不考虑兼容性问题的 PC 端页面布局 我们还是使用 flex 弹性布局

### 布局原理

- 通过给父盒子添加 flex 属性, 来控制子盒子的位置和排列方式

- 当父盒子的宽度容纳不下更多的子元素时, 默认不会换行 而是压缩项目的宽度来容纳

- 用来为盒状模型提供最大的灵活性, 任何一个容器都可以指定为 flex 布局
- 当我们为父盒子设为 flex 布局以后, 子元素的 float clear vertical-align 属性将失效
- 伸缩布局 = 弹性布局 = 伸缩盒布局 = 弹性盒布局 = flex 布局

### flex 容器属性

> flex-direction 设置主轴的方向

- 在 flex 布局中 是分为主轴和侧轴两个方向, 同样的叫法:行和列 x 轴和 y 轴
- 默认主轴方向就是 x 轴的方向, 水平向右
- 默认侧轴方向就是 y 轴的方向, 垂直向下
  - row 从左到右 默认 1 - 2 - 3
  - row-reverse 从右到左 3 - 2 - 1
  - column 从上到下 1 - 2 - 3
  - column-reverse 从下到上 3 - 2 - 1

> flex-wrap 设置子元素是否换行

- 当父盒子的宽度容纳不下更多的子元素时, 默认不会换行 而是压缩项目的宽度来容纳
- flex 布局中 默认的子元素是不换行的 如果装不开 会缩小子元素的宽度, 放到父元素里面
  - nowrap 默认值
  - wrap 换行

> justify-content 设置主轴上的子元素的排列方式

- 注意: 使用这个属性之前一定要确定好主轴是哪个
  - flex-start 从头部开始 如果是主轴是 x 轴 则从左到右
  - flex-end 从尾部开始排列
  - center 在主轴居中对齐
  - space-around 平分剩余空间
  - space-between 先两边贴边, 再平分剩余空间(重要)

> align-content 设置侧轴上的子元素的排列方式(多行) 必须有换行哈

- 设置子项在侧轴上的排列方式 并且只能用于子项出现 换行的情况(多行), 在单行下是没有效果的
  - flex-start 从头部开始 如果是主轴是 x 轴 则从左到右
  - flex-end 从尾部开始排列
  - center 在主轴居中对齐
  - space-around 平分剩余空间
  - space-between 先两边贴边, 再平分剩余空间(重要)
  - stretch 拉伸(默认值)

> align-items 设置侧轴上的子元素的排列方式(单行)

- 该属性是控制项目在侧轴(默认是 Y 轴)上的排列方式, 在子项为单项的时候使用
  - flex-start 从上到下
  - flex-end 从下到上
  - center 挤在一起居中(垂直居中)
  - stretch 拉伸(默认值)

> flex-flow 复合属性 相当于同时设置了 flex-direction 和 flex-wrap

- flex-flow:row wrap;

### flex 布局 项目的属性

- flex 子项占的分数
- align-self 控制子项自己在侧轴的排列方式
- order 属性定义子项的排列顺序(前后顺序)

> flex 属性

- flex 属性定义子项目分配剩余空间, 用 flex 来表示占多少份数
- 首先要有剩余空间, 比如我们可以不给宽度 这样全部都是剩余空间
<!--
    .box1 {
        width:100px; height:150px;
    }
    .box2 {
        flex:1;
    }
    .box3 {
        width:100px; height:150px;
    }
 -->

> align-self

- 允许单个项目有与其他项目不一样的对齐方式, 可覆盖 align-items 属性, 默认值为 auto, 表示继承父元素的 align-items 属性, 如果没有父元素 则等同于 stretch

> order

- 数值越小 排列越靠前 默认是 0 可以是负值

### 适配

- 文字也会随着屏拖动 发生改变
- 前面的流式布局和 flex 布局主要针对于宽度布局, 那高度又如何设置
- 怎么样让屏幕发生变化的时候元素高度和宽度等比例缩放呢?

### rem

- rem(root em)是一个相对单位, 类似于 em em 是父元素的字体大小
<!--
    <div>
        <p></p>
    </div>
    div {
        font-size:12px;
    }
    p {
        width:10em;
        height:10em;
    }
 -->

- 不同的是 rem 的基准是相对于 html 元素的字体大小
<!--
    比如: 根元素html 设置font-size=12px 非根元素设置width:2rem则换成px表示就是24px;
 -->

<!--
    html {
        font-size:14px;
    }
    p {
        width:10rem;
        height:10rem;
    }
 -->

- rem 优点就是可以通过修改 html 里面的文字大小来改变页面中元素的大小 可以整体控制

> 原理:

<!--
    rem有自己的优点, 父元素的文字大小可能不一样, 有的文字的父元素可能是16px, 有的可能是12px, 通过父元素控制子盒子很难控制, 但是整个页面只有一个html, 而rem只受html控制, 页面中每一个盒子的大小不一样

    那我们为什么不把每一个盒子大小的单位都改成rem 在不同的屏幕宽度下 只需要修改html的文字大小 而html里面的子盒子就会跟着一起变化 当屏幕大html文字就大一些相对的盒子的大小也会大一些 如果屏幕变小了我就让html文字小一些 盒子相对的也会小一些 因为都用的rem单位, 就达到了一种效果 通过rem来控制所有盒子的宽度和高度
-->

### 媒体查询的一些要点

- 按照从大到小的 或者 从小到大的思路
- 注意我们有最大值 max-width 和 min-width 都是包含等于的

> 练习

- 当屏幕小于 540px 背景颜色变为蓝色 x<=539
- 当屏幕大于等于 540px 并且小于等于 969px 的时候背景颜色为绿色(540 =< x <= 969)
- 当屏幕大于等于 970px 的时候, 背景颜色为红色(x>=970)

- 从小到大的顺序 推荐
<!--
    @media only screen and (max-width:539px) {
        body {
            background:green;
        }
    }
    @media only screen and (min-width:540px) and (max-width:969px) {
        body {
            background:blue;
        }
    }

    ---

        后面的样式会重叠到前面的样式 所以可以这么写
        @media only screen and (min-width:540px) {
            body {
                background:blue;
            }
        }

    ---

    @media only screen and (min-width:970px) {
        body {
            background:red;
        }
    }
 -->

### 媒体查询+rem 实现元素动态大小的变化

- rem 单位是跟着 html 来走的, 有了 rem 页面元素可以设置不同大小的尺寸
- 媒体查询可以根据不同设备宽度来修改样式
- 媒体查询 + rem 就可以实现不同设备的宽度, 实现页面元素大小的动态变化

> 这是一个适配的案例

<!--
    @media only screen and (min-width:320px) {
        html {
            font-size:50px;
        }
    }
    @media only screen and (min-width:640px) {
        html {
            font-size:100px;
        }
    }
    .top {
        height:1rem;
        font-size:.5rem;
        background:pink;
    }
 -->

### 媒体查询引入资源

- 当布局发生大的变化的时候 针对小屏的书写一套新的样式专门针对于小屏的 也就是说针对大屏一套 css 文件 小屏一套 css 文件
- 如果屏幕尺寸在某一个范围之内就用大屏的 css 文件
- 如果屏幕尺寸在某一个范围之内就用小屏的 css 文件

- 当样式比较繁多的时候, 我们可以针对不同的媒体使用不同 stylecss 样式, 原理就是直接在 link 中判断设备的尺寸, 然后引用不用的 css 文件

> 在 link 标签中添加 media 属性

<!--
    <link rel="stylesheet" href="sytle320.css" media='screen and (min-width:320px)'>
    <link rel="stylesheet" href="sytle640.css" media='screen and (min-width:640px)'>

    <!-- 当我们的屏幕大于等于640ox以上 div一行2个 >
    <!-- 当我们的屏幕小于等于640ox以上 div一行1个 >
    <div>1</div>
    <div>2</div>
 -->

### rem 的适配方案

> 适配的目标:

- 让一些不能等比自适应的元素, 达到当设备尺寸发生改变的时候, 等比例适配当前设备
- 使用媒体查询根据不同设备按比例设置 html 的字体大小, 然后页面元素使用 rem 做尺寸单位, 当 html 字体大小变化元素尺寸也会发生变化, 从而达到等比缩放的适配

> rem 实际开发适配方案

- 按照设计稿 与 设备宽度的比例, 动态计算并设置 html 根标签的 font0-size 大小(@media)
- css 中 设计稿元素的宽 高 相对位置等取值, 按照同等比例换算为 rem 为单位的值

### rem 适配方案

> 1

- less
- 媒体查询
- rem

> 2

- flexible.js
- rem

> 总结: 两种方案现在都存在, 方案 2 更简单, 现阶段大家无需了解里面的 js 代码

### 适配方案一

> 设计稿中常见的尺寸宽度

- ip4, 5 640px
- ip6, 7, 8 750px
- android 320px 360px 375px 384px 400px 414px 500px 720px
  大部分 4.7 ~ 5 寸的安卓设备宽度为 720px;

<!--
    一般情况下, 我么以一套或两套效果图适应大部分的屏幕, 放弃极端屏或对其优雅降级, 牺牲一些效果

    现在基本以750为准
-->

> 动态设置 html 标签 font-size 的大小

- 首先我们要选一套标准尺寸, 一般的设计稿是 750px
- 假设我们把整个屏幕划为 15 等份(划分标准不一, 可以是 20 份也可以是 10 等份)
- 每一份作为 html 字体大小, 这里就是 50px
<!--
    设计稿为750 划分为15份 每份就是50, 这个50就作为html字体的大小

    淘宝就是10等份, 苏宁就是15等份
 -->

- 那么在 320px 设备的时候, 字体大小为 320 / 15 就是 21.33px
  <!--
      当小屏幕也就是320px的设备时, 我们也要除以相同的 份数
   -->

  > ↑ 以上就是两种不同的屏幕下 html 的字体大小不一样

- 用我们页面元素的大小 除以 不同的 html 字体大小会发现他们比例还是相同的
- 比如我们以 750 为标准设计稿
- 一个 100 _ 100 像素的页面元素在 750 屏幕下, 就是 100 / 50 转为 rem 是 2rem _ 2rem 比例是 1:1
- 一个 100 \* 100 像素的页面元素在 320 屏幕下, html 字体大小为 21.33 则 2rem=42.66px, 此时宽和高都是 42.66 但是宽和高的比例还是 1:1

- 但是已经能实现不同屏幕下 页面元素盒子等比例缩放的效果

<!--
    @media only screen and (min-width:320px) {
        html {
            font-size:21.33px;
        }
    }

    @media only screen and (min-width:750px) {
        html {
            font-size:50px;
        }
    }
 -->

> 总结: 元素 除以 html 字号

### 元素大小取值方法

- 最后的公式:
  页面元素的 rem 值 = 页面元素值(px) / (屏幕宽度 / 划分的份数)

  - 屏幕宽度 / 划分的份数 就是 html font-size 的大小

  - 或者

  页面元素的 rem 值 = 页面元素值(px) / html font-size 字体大小



### 苏宁案例
> 技术选型:
- 单独制作移动端页面方案
- 技术: 布局采取rem适配布局(less + rem + 媒体查询)
- 设计图: 本设计图采用750px设计尺寸

> 设置公共common.less文件 装最常见的屏幕尺寸(其它页面也要用)
- 1 新建common.less 设置好最常见的屏幕尺寸, 利用媒体查询设置不同的html字体大小, 因为除了首页其它页面也需要

- 2 我们关心的尺寸有320px 360px 375px 384px 400px 414px 424px 480px 540px 720px 750px
<!-- 
    @media only screen and (min-width:720px) {
        html {
            font-size:(720px / @num);
        }
    }

    ...
 -->

- 3 划分的份数我们定为15等分

- 4 我们pc端也可以打开我们苏宁移动端首页, 我们默认html字体大小为50px 注意这句话写到最上面
<!-- 
    // less文件中的最上面 写上
    html {
        font-size:50px;
    }

    // 解析:
    PC端也可以打开移动端的首页 当PC端打开时, 页面都是1366px再除以15也是太大了不好看 所以我们给它限定死

    如果不是pc端的那我们再根据屏幕的不同对应不同的html字体大小

 -->

### 给body设置样式
<!-- 
    body {
        min-width:320px;
        width:15rem;
        margin:0 auto;
    }

    min-width 是为了让页面有最小宽度 320px对有移动端来说已经是最低的了
    正常会有 max-width 这里因为要考虑不同的页面宽度 所以我们直接写
    width:15rem   上面750的设计稿html大小是50px 15remx50 就是750
    设计稿宽度 / 15份数
 -->

### 使用rem布局时, 背景图片也是会缩放的 不能写死
<!-- 
    background:url() no-repeat;
    background-size:(44rem / @bF) (70rem / @bF)
 -->


### 适配方案二
> flexible.js and rem


> flexible.js
- 手机淘宝团队出的简洁高效移动端适配库
- 我们再也不需要在写不同屏幕的媒体查询 因为里面js做了处理
- 它的原理是把当前设备划分为10等份, 但是在不同设备下, 比例还是一致的
- 我们要做的, 就是确定好我们当前设备的html文字大小就可以了

- 比如:
- 当前设计稿是750px 那么我们只需要把html文字大小设置为75px(750 / 10)就可以
- 里面页面元素rem值: 页面元素的px值 / 75, 剩余的让flexible.js去算

> 使用flexible.js 要下载cssrem插件
- 使用cssrem插件需要配置基准值
- cssrem插件 --- 扩展设置 --- Root Font Size 修改这个值



### 轮播图 swiper 插件的使用
- https://www.swiper.com.cn

- 下载需要的css和js文件
- 官网找到类似的案例, 复制html结构, css样式, js语法
- 根据需求定制修改模块
> 先下载 然后把css js文件放入项目中

> 先在官网上找到合适效果, 运用到页面中(先搭建结构) 再修改

> 在新窗口打开 --- 查看网页源代码

> 在index.html中引入 css 和 js 文件

> 复制html结构 -- 将网站上的源代码的结构复制到index.html中
- 可以创建一个盒子装这些代码
<!-- 
    <div class='wrap'>
        <!-- Swiper >
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
                <div class="swiper-slide">Slide 4</div>
                <div class="swiper-slide">Slide 5</div>
                <div class="swiper-slide">Slide 6</div>
                <div class="swiper-slide">Slide 7</div>
                <div class="swiper-slide">Slide 8</div>
                <div class="swiper-slide">Slide 9</div>
                <div class="swiper-slide">Slide 10</div>
            </div>
        </div>
        <!-- Add Pagination >
        <div class="swiper-pagination"></div>
    </div>

    .swiper-slide 就是轮播图每个照片的盒子
 -->

> 复制css结构 -- 复制css的样式到装swiper的盒子中
<!-- 
    .wrap {

        .swiper-container {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;

            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            transition: 300ms;
            transform: scale(0.8);
        }

        <!-- 当前选中盒子的样式>
        .swiper-slide-active,.swiper-slide-duplicate-active{
            transform: scale(1);
        }
    }
 -->

> 复制 js 代码 -- 复制到index.html中
- 当页面中有多个轮播图的话 我们可以把包裹在自定义函数中
<!-- 
    
    var swiper = new Swiper('.swiper-container', {
      
      // 显示的个数 可以是小数
      slidesPerView: 3,

      // 每个盒子之间的距离
      spaceBetween: 30,

      // 要不要当前最大的放在中间显示
	  centeredSlides: true,

      // 是否循环
	  loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    // 包裹:

    (function(){
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    })()
 -->

> 定制我们自己的样式
- 定制我们的样式 需要查看API文档

- pagination 分页器(就是小圆点 不需要就删掉)

- 箭头
<!-- 
    // HTML
    <!-- Add Arrows >
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>

    // js
     navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

 -->

> 当有多个轮播图时
- css部分 写在自己创建的盒子样式内部
- js部分 用自调用函数包裹起来

- 页面中有多个轮播图时, 在html标签中自定义自己的类名 然后在js中 用自己的类名建立对象
<!-- 
    (function(){
        var swiper = new Swiper('.自己的类名', {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    })()
 -->


### 码云
- xl63864807@163.com
- slnn2080
- xl5467426
- 微信授权

- gitee.com

- 上传到码云并发布部署静态网站
- 准备工作:
- 下载git软件, 需要码云注册账号

- git可以把我们的本地网站提交上传到远程仓库(码云)里面 类似以前的ftp

- 码云就是远程仓库, 类似服务器
- 1 码云创建新的仓库, heimamm
- 2 利用git提交 把本地网站提交到码云新建的仓库里面
    - 在网站根目录右键 -- git bash here
    - 如果是第一次利用git提交, 请配置好全局选项
    - git config --global user.name '用户名'
    - git config --global user.email '邮箱地址'

    // 在项目的根目录下 右键 打开git

    // 初始化仓库
    - git init

    // 把本地文件放到暂存区
    git add .

    // 把本地文件放到本地仓库里面
    git commit -m '提交黑马面面网站'

    // 链接远程仓库
    git remote add origin 你新建的仓库地址

    // 把本地仓库的文件推送到远程仓库push
    git push -u origin master

    ###


### 发布静态网站
- 在当前仓库中 点击'服务', 菜单

- 选择gitee pages

- 



### flexible.js 源码分析
- flexible主要是设置rem布局, rem布局是跟html字体大小有关系的
<!-- 
    (function flexible (window, document) {

        // 获取html的根元素
        var docEl = document.documentElement

        // dpr物理像素比
        var dpr = window.devicePixelRatio || 1

        // 设置body的字体大小
        function setBodyFontSize () {

            // 如果页面中有body这个元素就设置body的字体大小
            if (document.body) {
                动态设置body的字体大小 根据物理像素比
                如果是pc端打开的物理像素比就是1 那就是12px
                如果是移动端打开的物理像素比就是2 那就是24px
                document.body.style.fontSize = (12 * dpr) + 'px'
            }

            // 当没有body的时候, 比如我们的script标签在最上面绑定的这时候我们拿不到body标签
            else {

                // DOMContentLoaded 等到页面主要的结构加载完后我再设置字体大小
                document.addEventListener('DOMContentLoaded', setBodyFontSize)
            }
        }
        setBodyFontSize();

        // 设置html字体大小
        function setRemUnit () {

            // docEl是html元素 docEl.clientWidth的宽度/10 把屏幕划分为10等分 就让我html大小设置为屏幕的10等分
            // 每等份就是一个rem
            var rem = docEl.clientWidth / 10
            docEl.style.fontSize = rem + 'px'
        }

        setRemUnit()

        // 当我们页面尺寸大小发生变化的时候, 要重新设置下rem大小
        // 当页面发生变化时, 再重新调用下setRemUnit 重新设置html字体大小
        window.addEventListener('resize', setRemUnit)

        // pageshow事件 是我们重新加载页面触发的事件, 不管是我们点击了刷新按钮还是后退按钮 我们都重新计算html字体的大小

        // 照顾各个浏览器做的兼容
        window.addEventListener('pageshow', function (e) {
            // 如果你是从缓存里面取过来的页面我也给你重新计算一下html的字体大小
            if (e.persisted) {  true就是是从缓存里面获取的页面
                setRemUnit()
            }
        })

        // 有些移动端的浏览器不支持0.5像素的写法 下面就是解决方法
        if (dpr >= 2) {
            var fakeBody = document.createElement('body')
            var testElement = document.createElement('div')
            testElement.style.border = '.5px solid transparent'
            fakeBody.appendChild(testElement)
            docEl.appendChild(fakeBody)
            if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
            }
            docEl.removeChild(fakeBody)
        }
    }(window, document))

 -->












