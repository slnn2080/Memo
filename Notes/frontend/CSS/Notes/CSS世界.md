### 焦点元素
- a元素 button元素 我们使用键盘进行Tab键切换的时候 是可以被focus的
- 表现为虚框或者外发光 这类元素成为焦点元素

### 非焦点元素
- 非焦点元素指没有设置 tabindex属性的<div> <span>等普通元素

- 在ie6 ie7下 非焦点元素对:active不起作用


### :active
- 伪类
- 鼠标按下执行:active伪类对应的css样式 鼠标抬起还原


### 块级元素
- 块级元素和display为block的元素 不是一个概念

- 块级元素的基本特征 一个水平流上只能单独显示一个元素 多个块级元素则换行显示


### CSS世界中关于盒子的概述
- css世界中只有块级盒子和内联盒子

- 块级盒子负责结构
- 内联盒子负责内容

- 之后因为list-item的出现 盒子的种类有了新的变化

- 所有的块级元素都有一个 主块级盒子
- 而list-item除此之外还有一个 附加盒子

- 之后 随着 display: inline-block元素的出现 又发生了变化

> 最终:
- 每个元素都有两个盒子
- 外在盒子
- 内在盒子(容器盒子)

- 外在盒子负责: 元素可以一行显示 还是只能换行显示

- 内在盒子负责: 高宽 内容呈现

- 于是display的属性值不同 值为block的元素的盒子实际由外在的块级盒子 和 内在的块级容器盒子 组成了 inline-block

- 所以inline-block的元素既能和图文一行显示 又能直接设置 width/height

- 因为有两个盒子 外面饿盒子是linline级别 里面的盒子是block级别

- 遵循这上面的理解方式 display: block应该是 block-block


### display: inline-table的盒子是怎么组成的
- 外面是 内联盒子 里面是table盒子 得到的旧是一个可以和文字在一行显示的表格


### width/height 作用在哪个盒子上
- 是内在盒子，也就 是“容器盒子”。


### width:auto
- width 的默认值是 auto。auto 因为是默认值

- 它至少包含了以下 4 种不同的宽度表现。
- 1. 充分利用可用空间
    <div>、<p>这些元素的宽度默认是 100%于父级容器的 这种就是充分利用可用空间的行为

- 2. 收缩与包裹
    典型代表就是浮动、绝对定位、inline-block 元素或 table 元素， 英文称为 shrink-to-fit，直译为“收缩到合适”

- 3. 收缩到最小
    这个最容易出现在 table-layout 为 auto 的表格中 比如 一柱擎天的盛况
    当每一列空间都不够的时候，文字能断就断，但中文是随便断的，英文单词不能断。于是， 第一列被无情地每个字都断掉，形成一柱擎天
    
- 4. 超出容器限制
    除非有明确的 width 相关设置 否则上面 3 种情况尺寸都不会主动 超过父级容器宽度的，但是存在一些特殊情况。
    例如，内容很长的连续的英文和数字，或者内联 元素被设置了 white-space:nowrap，则表现为“恰似一江春水向东流，流到断崖也不回头”。



- 盒子分内在盒子 和 外在盒子 
- 显示分内部显示 和 外部显示
- 尺寸分内部尺寸 和 外部尺寸

- 内部尺寸时由内部元素决定的
- 外部尺寸时由外部元素决定的


> 外部尺寸与流体特性
- 1. 正常流宽度
- 当我们在一个容器里倒入足量的水时，水一定会均匀铺满整个容器
- 在页面中随便扔一个<div>元素，其尺寸表现就会和这水流一样铺满容器。


> 内部尺寸与流体特性
- 1. 包裹性。
- 元素尺寸由内部元素决定，但永远小于“包含块”容器的 尺寸

- 因此，对于一个元素，如果其 display 属性值是 inline-block，那么即使其里面内容
再多，只要是正常文本，宽度也不会超过容器。

> 练习:
- 要点:
- 文字少的时候一行居中
- 文字多的时候左对齐

- 这里html结构部分用了两个盒子
- 外层盒子div
- 内层盒子p

- p设置了inline-block文字少的时候inline-block体现了包裹性 文字多的时候 有高度了 就可以设置左对齐的方式

```css
.box {
  padding: 10px;
  background-color: #cd0000;
  text-align: center;
  width: 240px;
}
.content {
  display: inline-block;
  background: #eee;
  text-align: left;
}
```

```html
<div class="box">
  <!-- <p id="conMore" class="content">文字内容</p> -->
  <p id="conMore" class="content">文字内容-新增文字-新增文字-新增文字</p>
</div>
```


> 首选最小宽度。
- 指的是元素最适合的最小宽度

> width 值作用的细节
- width 是作用在“内在盒子”上的

- 流动性丢失
- 对于块状元素，如果 width:auto，则元素会如水流般充满整个容器，而一旦设定了 width
具体数值，则元素的流动性就会被阻断，因为元素给定宽度就像河流中间竖了两个大闸一样， 就没有了流动性。尤其宽度作用在 content box 上，更是内外流动性全无，


> CSS 流体布局下的宽度分离原则
-  CSS 中的 width 属性*不与影响宽度的 padding/border(有时候包括 margin)属性共存*，也就是*不能*出现以下的组合:

```css
.box { 
  width: 100px; 
  border: 1px solid; 
}

or

.box { 
  width: 100px; 
  padding: 20px; 
}
```

- 那怎么写?
- 很简单 分离
- width独立占用一层标签 而padding border margin利用流动性 在内部自适应呈现

- 也就是说 之前我们是一个盒子 然后我们对这个盒子整体设置了宽度和padding之类的
- 这时候的盒子的大小高宽已经设定好了

- 现在要调整成两个盒子
- 外层盒子设置宽度
- 内层盒子设置padding之类的
- 外层盒子只设置了宽度
- 内层盒子的宽度是继承外层盒子的 内层盒子设置padding撑起了外层的盒子
```css
.box {
  width: 200px;
  background-color: #eee;
}
.son {
  padding:20px;
}
```

```html
<div class="box">
  <div class="son">文本信息</div>
</div>
```

- 嵌套一层标签，父元素定宽，子元素因为 width 使用的是默认值 auto，所以会如水流般 自动填满父级容器。因此，子元素的content box宽度就是100像素，和上面直接设置width 为 100 像素表现一样。


> min-width/max-width
- min-width/max-width 出现的场景一定是自适应布局或者流体布局中

- 它们是具有边界行为的属性，所以没有变化自然无法触发

- 比如
- 网页宽度在 1200~1400 像素自适应
- 既满足大屏的大气， 又满足笔记本的良好显示
```css
.container {
  min-width: 1200px;
  max-width: 1400px;
}
```

- 在公众号的热门文章中，经常会有图片，这些图片都是用户上传产生的，因此尺寸会有大有小，为了避免图片在移动端展示过大影响体验，常常会有下面的 max-width 限制:
```css
img {
  max-width: 100%;
  height: auto!important;
}
```

- height:auto 是必需的，否则，如果原始图片有设定 height，max-width 生效的时候， 图片就会被水平压缩。强制 height 为 auto 可以确保宽度不超出的同时使图片保持原来的比 例


- width/height 的默认值是 auto
- min-width/max-width 和 min-heigh/ max-height 的初始值则要复杂些。

- max-width 和 max-height 的初始值是 none
-  min-width/min-height 的初始值都是 auto
