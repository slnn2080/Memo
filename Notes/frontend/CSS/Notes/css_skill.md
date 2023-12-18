# 立体文字
```s
https://www.bilibili.com/list/3494367522195464?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=875620604&bvid=BV1SN4y1S7NH
```

<br><br>

# 下面格式的文本框
```s
userName
________


https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=789470297&bvid=BV1JC4y1d729
```

<br><br>

# 文字交融展开效果
```s
https://www.bilibili.com/list/666759136?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=959401977&bvid=BV1Pp4y1F79g
```

<br><br>

# 图片重叠(故障风格)图样
```s
https://www.bilibili.com/list/666759136?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=960888503&bvid=BV1eH4y1D7kz
```

<br><br>

# 弧形选项卡
弧形可以使用径向渐变
```s
https://www.bilibili.com/list/666759136?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=276246790&bvid=BV18F411S7cL
```

<br><br>

# 3d卡片移入效果
```s
https://www.bilibili.com/list/666759136?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=620925797&bvid=BV11b4y1g7hE
```

<br><br>

# 下划线效果
```s
https://www.bilibili.com/list/666759136?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=620960073&bvid=BV1Rb4y1g7bp
```

<br><br>

# 卡片翻动
```s
https://www.bilibili.com/list/666759136?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=361941574&bvid=BV1U94y1C7v8
```

<br><br>

# 倾斜按钮
```s
https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=704721674&bvid=BV1KQ4y1s7Zu
```

<br><br>

# 卡片翻转
```s
https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=704721935&bvid=BV1KQ4y1s7xE
```

<br><br>

# 元素环形旋转效果
```s
https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=234718892&bvid=BV1F8411r7c2
```

<br><br>

# 会跑的边框
```s
https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=620041449&bvid=BV1c84y1R73s
```

<br><br>

# 视频文字特效
```s
https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=705026939&bvid=BV1mQ4y1p7Dh
```

<br>

### inset: 0
相当于 mx my 都为0
```scss
{
  position: absolute;
  inset: 0;
}
```

<br><br>

# 精灵图
我们需要用到 背景图 和 背景图的定位

![精灵图01](./精灵图01.png)

比如我们要在一个盒子中 展示小狗, 那么我们首先就需要移动(background-position)背景图, 将小狗移动到盒子的左上角
```scss
.container {
  width: 80px;
  height: 80px;

  background: url(./img/sprite.jpg) no-repeat -280px -240px;
}
```

<br><br>

# 两个行盒在垂直方向没有对齐的时候
在其中的一个行盒中使用
```scss
{
  vertical-align: middle | 2px | 慢慢调
}
```

<br><br>

# 尺寸百分比时的 参考系 (包含块)

1. 普通元素(非定位元素)的参考系是 **父元素的内容区域**
2. 绝对定位元素的参考系是 **第一个定位的祖先元素的 padding区域**

<br>

### width的百分比
普通元素的默认区域 默认是父元素 **内容区域(content-box)** 的100%

绝对定位的子元素的width: 80% 是参照父元素的padding, 比如父元素的padding100, contentBox为200, 则子元素的尺寸为 ``300 x 80%``

<br>

### height的百分比
如果父元素没有高度, 子元素即使设置 height: 100% 也是无效的
```html
<div class="container">
  <div class="item"></div>
</div>

<style>
  .container {
  }
  .item {
    height: 100%;
  }
</style>
```

因为, item的百分比要相对于父元素的高度, 父元素没有高度 则item的高度也没有办法计算

<br>

如下的情况 item 也没有办法计算高度
```html
<div class="container">
  <div class="item"></div>
  <div class="item2"></div>
</div>

<style>
  .container {
  }
  .item {
    height: 100%;
  }
  .item2 {
    height: 100px;
  }
</style>
```

父元素的高度是 item + item2 的高度, item2的高度是100px, 但是item要参考父元素, 而父元素现在没有办法计算出高度, 父元素只有当知道两个item的具体高度之后 才能确定父元素的高度

所以 item 始终无法计算出高度

我们什么时候设置height的百分比, 只有父元素的高度确定后 设置百分比才有效

<br>

### padding margin 的百分比
它们的百分比不管是横向和纵向都是相对于 **父元素的宽度**

<br>

### 最大最小宽高
- 最大最小宽度: max-width / min-width
- 最大最小高度: max-height / min-height

当一个元素的尺寸会自动发生变化的时候, 设置最大最小的宽高, 可以让它不至于变得过小或过大

<br>

在实际开发中 我们通常为
1. pc端的页面设置一个最小宽度, 通常此宽度为设计稿的宽度
2. img的宽度, img的宽度会自适应图片本身的宽度 默认就会溢出父元素 这时会设置最大宽度100%
```scss
html {
  min-width: 1226px;
}

img {
  // 你不能太夸张了, 最大宽度就是父元素的宽度
  max-width: 100%;
}
```


<br><br>

# 逐帧动画
![逐帧动画01](./imgs/逐帧动画01.png)

上面页面中奔跑的马就是一张雪碧图, 我们要是想让它在页面上跑起来的话, 会想到使用定时器来改变背景图的位置

但是上面的效果 使用css也能办到, 这里我们就要先知道一下 逐帧动画 的概念

<br>

### 逐帧动画的概念
![逐帧动画02](./imgs/逐帧动画02.png)

比如页面上的这个小球, 我们想让它从左边移动到右边, 使用css的话非常的简单
```scss
.ball {
  width: 100px;
  height: 100px;
  background: red;
  border-radius: 50%;

  animation: move 2s linear infinite;
}

@keyframe move {
  to {
    // 视口宽度 - 小球的width
    transform: translateX(calc(100vw - 100px))
  }
}
```

上面的不是我们想要的 我们想要的不是这么平滑的动画, 而是跳跃式的前进 这时我们只需要改动 linear 这个时间函数

这个时间函数除了贝塞尔曲线之外 还有 **steps()** 函数
```scss
.ball {
  width: 100px;
  height: 100px;
  background: red;
  border-radius: 50%;

  // 一步步的跳跃式的前进
  animation: move 2s steps(2, jump-end) infinite;
}
```

<br>

### steps
![逐帧动画03](./imgs/逐帧动画03.png)

<br>

**steps(3, jump-start):**  
表示将整个动画过程分成三段 这三段分布在, jump-start表示跳过起点, 它最开始的位置在第一个红色球的位置

比如总的动画时间是三秒钟 那么开始它在第一个红色小球的位置, 然后再等一秒钟时间直接跳到第二个红色小球, 再等一秒直接跳到终点

<br>

**steps(3, jump-end): 不写第二个参数默认就是它**  
jump-end 表示跳过终点, 它最开始的位置在第一个红色小球的位置

<br>

**steps(3, jump-both):**  
jump-both 表示跳过起点 和 终点

<br>

**steps(3, jump-none):**  
jump-none 表示不要跳过起点 和 终点

<br>

### 使用 steps 解决
```scss
@keyframes run {
  0% {
    background-position-x: 0;
  },
  100% {
    background-position-x: -2400px;
  }
}
.container {
  background: url('./xxx.jpg') no-repeat;
  // 在一秒钟内平均分成12分
  animation: run 1s steps(12, jump-end) infinite;
}
```

<br><br>

# 逻辑样式
```s
https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=233486432&bvid=BV1n8411q7oN
```

<br>

下面的样式相当于 margin-top 和 margin-bottom
```scss
{
  // 块盒
  margin-block-start: 1em;
  margin-block-end: 1em;
  // 行盒
  margin-inline-start: 1em;
  margin-inline-end: 1em;
}
```

<br>

### 文字书写方向的样式
```scss
{
  writing-mode: horizontal-tb / sideways-lr / sideways-rl / vertical-lr / vertical-rl (垂直+从右向左);
}
```

<br>

### 数字的纵中横
```scss
{
  text-combine-upright: all;
}
```

<br><br>

# 包含块
下面说法哪些是正确的
1. 元素的 width 百分比 相对的是 父元素的宽度
2. 元素的 height 百分比 相对的是 父元素的高度
3. 元素的 margin 百分比 相对的是 父元素的宽度
4. 元素的 padding 百分比 相对的是 父元素的宽度
5. 元素的 left 相对的是 offsetParent 的左边缘
6. 元素的 top 相对的是 offsetParent 的上边缘

```s
offsetParent:
元素的父元素 或者是父元素的父元素 找到一个position等于absolute 或者 fixed等定位元素

也就是祖先元素中的第一个定位元素
```

上面的答案全错, 但是我**将父元素修改为 包含块 的话, 则全对**

<br>

### 包含块的概念:
css里面只有两个重要的知识
1. 属性计算
2. 视觉格式化模型 (bfc ifc 包含块)

<br>

它的意思是我们页面上的元素 那些盒子它们就排列在包含块中, 包含块就是一块区域 我们的元素在区域中进行排列 

这个区域包含了这个元素 这个区域叫做这个元素的包含块

<br>

**元素的盒子:**  
一个元素有4层盒子
1. margin
2. padding
3. border
4. content

<br>

**区域的确定方式:**  
包含块的区域是怎么确定的 要看我们的元素 比如

- 元素是一个 **浮动元素** 或者是 **常规的元素** 它的**包含块就是父元素的 内容区域**

- 元素是一个 **绝对定位元素**, 它的包含块就是 offsetParent 的填充盒 (祖先元素中第一个定位元素的padding盒)

![包含块](./imgs/包含块.png)

<br>



<br><br>

# CSS中的动画的暂停和恢复
```scss
@keyframes rotate {
  0% {
    transform: rotateY(0deg)
  },
  100% {
    transform: rotateY(-360deg)
  }
}

.container {
  animation: rotate 20s linear infinite;
  // 它就两个值
  animation-play-state: running;
}

.container:hover {
  animation-play-state: paused;
}
```

<br><br>

# 平滑滚动
页面中的回到顶部按钮, 当我们点击按钮的时候 会执行如下的回调
```js
const backBtn = document.querySelector('.btn')
backBtn.onclick = function() {
  window.scrollTo(0, 0)
}
```

上面的效果是瞬间回到顶部的, 我们希望的是 平滑的过度到顶部, 这里有两种方式

<br>

### 方式1: CSS
``window.scrollTo(0, 0)`` 这行代码是控制整个页面的滚动, 那我们就可以给整个页面添加一个滚动行为

```scss
html {
  scroll-behavior: 'smooth';
}
```

<br>

### 方式2: JS
```js
window.scrollTo({
  top: 0,
  behavior: 'smooth'
})
```

<br>

### 总结: 
凡是我们需要使用滚动条 并且希望他平滑的时候 都可以使用这些方式

<br><br>

# 文本溢出处理
我们的文本溢出处理可以通过css解决 文本溢出包含单行和多行, 当文本溢出的时候我们怎么才能实现溢出隐藏并且有省略号呢?

```html
<p class="single-line">
  xxxxx 溢出文本
</p>
<p class="multi-line">
  xxxxx 溢出文本
</p>
```

```scss
.single-line {
  border: 2px solid #ccc;
  width: 200px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 90px;
  color: #f40;

  // 让文本一行 排过去 不要换行
  white-space: nowrap;
  // 溢出隐藏
  overflow: hidden;
  // 文本溢出过后使用... 代替
  text-overflow: ellipse;
}

.multi-line {
  border: 2px solid #ccc;
  width: 200px;
  height: 30px;
  line-height: 30px;

  // 有兼容性的问题
  display: -webkit-box;
  // 告诉浏览器 盒子中的内容排列是纵向的
  -webkit-box-orient: vertical;
  // 告诉浏览器 我们一共有几行
  -webkit-line-clamp: 5;
  overflow: hidden;
}
```


<br><br>

# 保持元素的宽高比
比如我们页面上一个元素的宽度是一个百分比 高度要求是宽度的3/4
```scss
.item {
  background: red;
  width: 50%;
  margin: 0 auto;

  // 高度不能写死 要是自身宽度的 四分之三
  // height: 300px;

  // 方式1: 不使用高度 而是使用新的css属性, 这样我们设置完宽度后他会自动的设置高度
  aspect-ratio: 4 / 3;
}

-----

// 方式2: 元素结构要改 inner要撑满父元素 父元素没有高度 父元素的高度是子元素撑开的
.item {
  background: red;
  width: 50%;
  margin: 0 auto;
}

.inner {
  width: 100%;
  // height: 为父元素宽度的75%;
  // 这里就可以利用padding 因为padding的4个方向都是相对于父元素宽度的
  padding: bottom: 75%
  height: 0;
  position: relative;
}

.container {
  position: absolute;
  inset: 0;
}
```

```html
<!-- 方式1的结构 -->
<body>
  <div class="item"></div>
</body>


<!-- 方式2的结构 -->
<!-- item不能直接作为容器 而是在它的里面再放一个inner 让inner作为容器 -->
<body>
  <div class="item">
    <div class="inner">
      <div class="container">内容区</div>
    </div>
  </div>
</body>
```

<br><br>

# 圆形hover放大
```s
https://www.bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=662545070&bvid=BV1hh4y1i7sH
```

<br>

### clip-path: 用来将一个元素裁剪成不同的形状
比如将一个元素裁剪成圆形
```scss
.avatar {
  clip-path: circle(50%, at 50% 50%)
}
```

<br><br>

# 多行文本溢出

### 不考虑兼容性的写法
如下的写法文本框内的文本超出4行后, 后面会自动将内容转换为...
```scss
// 下面这三行
.text-container {
  display: -webkit-box;
  // 设置行数
  -webkit-line-clamp: 4;
  // 设置排列方向
  -webkit-box-orient: vertical;
}

.content {
  line-height: 25px;
}
```

<br>

### 考虑兼容性的写法
文本容器 text-container 它有固定的高度, 并且是overflow: hidden, 溢出隐藏

我们的想法是, div.more 元素在右下方, 其它的元素环绕这个 div.more 
```html
<div class="container">
  <div class="text-container">
    <!-- 溢出隐藏的... -->
    <div class="more">...</div>
    <!-- 文本的内容 超过了容器 -->
    <div class="content"></div>
  </div>
</div>

<style>
  .text-container {
    height: 100px;
    overflow: hidden;
  }

  /* 2. 利用 before伪元素将 ... 挤到最下方 */
  .text-container::before {
    content: '';
    display: block;
    height: 80px;
    background: #000;
  }

  .more {
    /* 1. 设置浮动 让其他的元素环绕 ... */
    float: right:
  }

  /* 利用 margin-top: 将文本提回最上方 */
  .content {
    margin-top: -80px; /* 不一定是80px 可以是很大的值 */
  }
</style>
```

<br>

当文字的内容需要变化的时候 我们就需要使用js了

我们要判断当前这个content元素 它的高度有没有超过父元素text-container的高度
- 如果没有超过的话 就表示没有溢出 就不需要写这三个点 我们就将 .more 元素干点
- 如果有溢出的话 content的高度超过了父元素的高度 表示有溢出 我们就要加上 .more

<br><br>

# 基于css变量的主题切换
我们需要提供两套css变量

如果我们的html带了一个自定义属性 ``data-theme="drak"`` 就使用暗色主题
```scss
// 亮色主题(默认主题) :root 等效与 html
:root {
  --text-color: #333;
}


// 暗色主题
html[data-theme="drak"] {
  --text-color: #fff;
}
```

<br>

### 组件内使用
1. main.js 中我们引入 上面的scss文件
```js
import './style.css'
```

2. 组件中如果要使用颜色的话, 就使用我们定义好的主题变量 两套主题的变量名字完全一样

3. 使用js往html上添加自定义 ``data-theme="drak"``
```js
// useTheme.ts 作用跟pinia一样 将 theme 定义到公共区域
import { ref, watchEffect } from 'vue'
// const theme = ref('dark')
const theme = ref(localStorage.getItem('theme'))

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value

  // 借助本地存储 防止刷新页面后重置
  localStorage.setItem('theme', theme.value)
})

export function useTheme() {
  return {
    theme
  }
}
```
```js
// 组件内使用 滑块切换 theme的值
@click="theme = theme ==='dark' ? 'light' : 'dark'"
```

<br><br>

# 元素的绘制顺序
我们的元素结构如下

![元素绘制顺序](./imgs/元素绘制顺序.png)
![元素绘制顺序](./imgs/)

```html
<!-- 背景图 -->
<img />
<!-- 红色区域 -->
<div>
  <!-- 头像 -->
  <img />
  <!-- 文本: 游客 -->
  <div />
</div>
```

现在我们要将 红色区域div 往上移动 我们可以使用 margin-top 将它的值修改为负数 ``margin-top: -27rem``

![元素绘制顺序](./imgs/元素绘制顺序02.png)

我们发现 红色的div感觉并没有上去, 只有头像上去了, 页面上显示的是往上移动了 但为什么背景没有了

![元素绘制顺序](./imgs/元素绘制顺序03.png)

<br>

### 现象原因
我们要知道原因要知道两个知识
1. 可替换元素
2. 堆叠上下文

<br>

**可替换元素:**  
元素的内容就由它的属性来决定的 比如 img 它就是典型的可替换元素 这个图片中显示啥 由它的src属性值决定, 类似的元素还有 input(显示什么由value属性决定)

可替换元素的绘制分为两块, 它是分开绘制的
1. 元素本身
2. 元素内容

比如我们的 ``<img src="" />`` 我们看到的是只有一个元素 但是它绘制的时候是分为两块绘制的, 比如我们给img加一个border, 这个border是加到元素本身上的 我们是不可能改变元素内容的 我们只能改变元素本身

![元素绘制顺序](./imgs/元素绘制顺序04.png)

比如我们再加一个padding 它是也控制元素本身, 只有那个图片内容才是元素内容

浏览器就像画师一样 它在画这个页面的时候 它也是分开进行绘制的
 
<br>

**堆叠上下文: stack context**  
它就是页面的层次, 类似很多的图层

<br>

![元素绘制顺序](./imgs/元素绘制顺序05.png)

我们现在有突变的盒子和图片的内容 是分开的 div.main中有div本身的背景颜色

接下来就开始绘制了 它是一层一层的往上刷的

1. 首先绘制盒子本身

2. 然后绘制div盒子 然后div的margin-top为负数 于是盖上去了
![元素绘制顺序](./imgs/元素绘制顺序06.png)

3. 然后第二层再绘制图片的内容 背景图片后绘制的 所以将div.main盖住了
![元素绘制顺序](./imgs/元素绘制顺序07.png)

4. 然后再绘制头像div的内容
![元素绘制顺序](./imgs/元素绘制顺序08.png)

**这就是这个现象的原因**

<br>

### 解决问题
要解决问题很简单就是一行代码的事情 我们要关注为什么会出现这样的现象

我们可以让 div.main 和 背景图片盒子不处于同一个层次 也就是说我们要将div单独的弄一个层出来

我们可以让某一个元素在内容创建一个堆叠上下文 如果说页面上有100个元素都没有去创建堆叠上下文的话 那么这100个元素都在同一层

如果创建了堆叠上下文的话 它就跟其它的层次隔离了

<br>

**创建堆叠上下文的方式:**  
1. 设置它的 z-index
2. 设置它的 transform

都会导致这个元素在内部创建一个崭新的堆叠上下文

我们给 div.main 设置如下的样式
```scss
.main {
  margin-top: -366rem;

  // 方式1
  position: relative;
  z-index: 1;


  // 方式2
  transform: scale(1);
  // 方式3:
  transform: translateY(-136rem);
}
```

<br><br>

# 轮播图item的强制吸附 & 隐藏滚动条
```scss
.container {
  width: 100%
  height: 300px;
  display: flex;
  overflow-x: scroll;

  // x轴吸附 x: 滚动方向, mandatory: 吸附方式 - 强制吸附 (没有中间状态)
  scroll-snap-type: x mandatory;

  // y轴吸附
  // scroll-snap-type: y proximity;
}

// 隐藏滚动条
.container::-webkit-scrollbar {
  width: 0;
}

// 子元素 也要添加配置
.item {
  // 吸附的对齐方式: 放手的时候 元素的左边和父元素的左边对齐
  scroll-snap-align: start;
  // 不能跳过元素 我们永远停留在下一个元素上, 避免从1直接滑到5
  scroll-snap-stop: always;
}
```

<br><br>

# Js给css设置变量

```scss
@keyframes move {
  50% {
    transform: translateX(calc(父元素的宽度 - 自身宽度));
  }
}
```
```html
<div class="container">
  <div class="item"></div>
</div>
```

我们想求的就是
1. 父元素的宽度
2. 自身的宽度

<br>

### 自身的宽度
很简单 在transform中自身的宽度就是100%

<br>

### 父元素的宽度
css不知道, js知道, 我们让js告诉css item的父元素的宽度, **我们使用js代码给父元素设置一个css变量**

这样它的子元素就可以使用该变量
```js
const container = document.querySelector('.container')
const w = container.clientWidth

// 给container设置一个css变量 值为js中的w
container.style.setProperty('--w', w + 'px')
```

```scss
@keyframes move {
  50% {
    transform: translateX(calc(var(--w) - 100%));
  }
}
```

<br><br>

# html fs设置为 62.5%
就是为了px -> rem 好换算

一般的, 各大主流浏览器的font-size默认值为 16px, 此时 

```html
<style>
    html {
      /* rem好换算 */
      font-size: 62.5%;
    }
    div {
      /* 62.5%的情况下 我们使用rem单位则它会是16px */
      font-size: 1.6rem;
    }
  </style>
</head>
<body>
  <!-- html fs 设置为 62.5% 的时候 它是 12px -->
  <div>浏览器默认就是16px</div>
</body>
```

<br><br>

# vmin 和 xmax
移动端开发的时候 某一个东西是全屏展示的 而且是不能出现滚动条的 这就要求这个全屏的东西 **它的宽高必须是视口的最短的那条边**

- vmin: 取视口最短边
- vmax: 取视口的最长边

所以我们可以给这个东西的宽高设置为 vmin
```scss
img {
  width: 100vmin;
  height: 100vmin;
}
```

<br><br>

# 文字环形环绕
```scss
.img {
  width: 150px;
  height: 150px;
  float: left;
  margin-right: 1em;
  border-radius: 50%;
  object-fit: cover;

  // 控制环绕该元素的形状
  shape-outside: circle(50% at 50% 50%);
}
```

<br><br>

# 文字自动适配背景色
![文字自动适配背景色](./imgs/文字自动适配背景色.png)

文字色默认设置为白色, 我们只需要给文字加上一行css就可以
```scss
.title {
  mix-blend-mode: diffenrence;
}
```

该属性的作用是将当前的元素的每个像素点颜色和它的父元素进行混合从而产生一种新的颜色

<br><br>

# 复用动画技巧
![复用动画技巧](./imgs/复用动画技巧.png)

<br><br>

# 元素宽度自动适应内容
没有兼容性问题
```scss
// 目标元素
.target {
  width: fit-content;
}
```

<br><br>

# 元素的抛物线动画
抛物线是两个方向上的运动
1. 横向的均匀运动
2. 纵向的自由落体运动

元素的抛物线要注意html结构
```html
<div class="container"> 
  <div class="ball"></div>
</div>
```

- 外层div控制横向匀速移动
- 内层div控制纵向变速移动

```css
.container {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px dashed #aaa;
  left: 100px;
  top: 300px;
  /* 父元素横向移动 */
  animation: moveX 2s linear infinite;
  
  /* transition: 1s linear; */
}

.ball {
  background: red;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* 子元素纵向移动 */
  animation: moveY 1s cubic-bezier(0.5, -0.5) infinite;

  /* transition: 1s cubic-bezier(0.5, -0.5); */
}

@keyframes moveX {
  to {
    transform: translateX(100px);
  }
}
@keyframes moveY {
  to {
    transform: translateX(500px);
  }
}
```

<br>

### js部分
```js
// 强行渲染
div.clientWidth

div.style.transform = `translateX(${this.jumpTarget.x}px)`

i.style.transform = `translateY(${this.jumpTarget.y}px)`
``` 

<br><br>

# 三角函数 勾股定理 角度转弧度 弧度转角度
长度等于半径长的弧  所对的圆心角  称为1弧度的角    
它的单位是rad 读作弧度, 这种用"弧度"做单位来度量角的制度叫做弧度制．

<br><br>

# 弧长公式: l = r * |a| | l = n * PI / 180
即弧长等于弧所对的圆心角(的弧度数)的绝对值与半径的积

<br>

### 正弦函数: 邻边b, 对边a, 斜边c
```
sin = 对边 / 斜边  a / c
```

<br>

#### 余弦函数:
```
cos = 邻边 / 斜边  b / c
```

<br>

### 正切函数:
```
tan = 对边 / 邻边  a / b
```

<br>

### 余切函数:
```
cot = 邻边 / 对边  b / a
```

<br>

### 正割函数:
```
sec = 斜边 / 邻边  c / b
```

<br>

### 余割函数:
```
csc = 斜边 / 对边  c / a
```

<br>

### 角度 ---> 弧度
```
deg(角度) * 2PI / 360   =   deg * PI / 180
```

<br><br>

# inline-block遇到vertical-align的问题

### inline-block: 
行内块元素, 相当于强制转换  

把一个标签设置为 行内的块元素 既有块元素的部分特性 (支持 width height magin-top margin-bottom) 又有行内元素的部分特性(不换行)

<br>

### vertical-align:
设置元素的垂直对齐方式

**该属性定义行内元素的基线**, 相对于该元素所在行的基线的垂直对齐方式

**可选值:**  
- baseline: 默认 元素放置在父元素的基线上
- top: 把元素的顶端 与 行中最高元素的顶端对齐
- text-top: 把元素的顶端 与 父元素字体的顶端对齐
- middle: 把此元素放置在父元素的中部
- bottom: 把元素的顶端与行中最低的元素的顶端对齐
- text-bottom: 把元素的地段 与 父元素字体的低端对齐

<br>

### 问题:
当我们对一个元素转换位 inline-block 之后 可能会出现下述的问题
- 元素之间多了莫名其妙的边距
- 当我们在元素内部添加文字 元素位置发生偏移

<br>

### 解决方式:
这么说吧 将一个元素转换为 inline-block 后 如果遇到怪怪的问题 我们就要使用 vertical-align 来解决

<br>

### 原因:
inline-block的默认对齐方式是vertical-block: baseline, 由上面可知 就是inline-block元素要根据父元素的基线对齐

<br>

### 什么是基线?

如果一个inline-block元素里面是空的, 或者它本身有overflow属性, 这种情况下基线是它margin的底边缘。

如果一个inline-block元素里面不是空的(比如里面有文字或者图像), 则它的基线由正常流中最后一个line box的基线决定。

<br><br>

# 去除 inline-block 元素间 间距的N种方式
当我们行内元素在转换为 inline-block之后 标签之间如果有空格 和 换行的话 呈现在页面的时候 它们之间就会有间距

同时我们使用非 inline-block 的元素也会有同样的问题 比如

```css
div>a*3{文字描述}
```

这类间距有的时候会我们的布局是有影响的 如果我们要去除它的话 可以采用下面的方式

<br>

### 1. 移除空格
元素间留白间距出现的原因就是标签段之间的空格, 因此, 去掉HTML中的空格, 自然间距就木有了。考虑到代码可读性, 显然连成一行的写法是不可取的, 我们可以: 

```html
<div class="space">
    <a href="##">
    惆怅</a><a href="##">
    淡定</a><a href="##">
    热血</a>
</div>

<div class="space">
    <a href="##">惆怅</a
    ><a href="##">淡定</a
    ><a href="##">热血</a>
</div>
```

<br>

### 2. margin负值
至于负多少我们可以观察下面的网站
```css
.space a {
    display: inline-block;
    margin-right: -3px;
}

/* 
https://www.zhangxinxu.com/wordpress/2010/11/%e6%8b%9c%e6%8b%9c%e4%ba%86%e6%b5%ae%e5%8a%a8%e5%b8%83%e5%b1%80-%e5%9f%ba%e4%ba%8edisplayinline-block%e7%9a%84%e5%88%97%e8%a1%a8%e5%b8%83%e5%b1%80/
*/
```

<br>

### 3. font-size: 0
这个方法, 基本上可以解决大部分浏览器下inline-block元素之间的间距(IE7等浏览器有时候会有1像素的间距)。
```css
.space {
    font-size: 0;
}
.space a {
    font-size: 12px;
}
```

不过有个浏览器, 就是Chrome, 其默认有最小字体大小限制, 因为, 考虑到兼容性, 我们还需要添加: 
类似下面的代码
```css
.space {
    font-size: 0;
    -webkit-text-size-adjust:none;
}
```

<br><br>

# cover contain 区别
### 相同点:
background-size中的cover与contain都是将图片以相同的宽高比缩放以适应容易的宽高

<br>

### 不同点:
**cover:**  
会缩放至图片能够铺满整个容器, **可能会有部分图片区域被裁剪**

**contain:**  
则是图片会缩放至整个图片都能显示完全, **但是容易可能会有留白**

<br>

```css
{
    background: url(/assets/img/ic_pdf_001.svg) no-repeat center top;

    background: url('/assets/img/triangle.svg') 0 0 no-repeat;

    background: url(/toyota_jp/yaris/assets/img/kv_yaris_sp@2x.jpg) top left no-repeat;
    background-size: 100% auto;

      @include g.mq {
        background: url(/toyota_jp/yaris/assets/img/kv_yaris@2x.jpg) top left no-repeat;
        background-size: cover;
      }
    }


    background: url(/toyota_jp/common/assets/img/text_01.svg) center center no-repeat;
    background-size: contain;
}
```

<br><br>

# flex space-between 的情况下 第二行 左对齐
要想第2行实现左对齐的效果 我们可以在开启flex的容器上添加一个::after 让它的width(::after)等于一个item的宽度就可以
```css
.wrap {
  display: flex;
  justify-content: space-between;
}

.wrap::after {
  content: "",
  width: 30%;
}
```

```html
<style>
  .wrap {
    width: 300px;
    height: 300px;
    border: 1px solid black;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .wrap::after {
    content: "";
    width: 100px
  }

  .item {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>

<body>
  <div class="wrap">
    <div class="item item1">内容1</div>
    <div class="item item2">内容2</div>
    <div class="item item3">内容3</div>
    <div class="item item4">内容4</div>
    <div class="item item5">内容5</div>
  </div>
</body>
```

<br>

![flex:space-between](./imgs/space-between.png)

<br><br>

# 关于图片的对齐方式
**图片就属于行内块**  

**图片是和文字的基线对齐的** 所以 可以选择使用 text-align 和 line-height 让图片垂直水平居中  
有的时候图片并没有垂直居中 可以选择让它 vertical-align:middle 还是由于图片是和文字基线对齐的原因

<br><br>

# 禁止某元素内部选中元素
```css
{
  user-select: none;
}
```

<br><br>

# 边框使用文本的颜色
通常情况下都需要手动给边框设置一个颜色, 有没有办法能够使用当前元素的文本颜色来充当盒子边框颜色呢？

**技巧:**  
在设置边框时不设置边框颜色, 只设置边框宽度(粗细度)和边框的样式 **没有设置边框颜色的边, 边框颜色就是当前盒子的文本色**

这种方法在所有浏览器中都能够得到支持, 不存在兼容性问题。

<br><br>

# 盒子宽度双方向变化 向左变化

### 盒子宽度双方向变化:
实现双向变化的关键是给要变化的dom元素, 加一个父元素, 并设置样式text-align: center; 

此时width由80px伸长为200px, 虽然还是往右伸长, 但由于子元素始终保持居中, 所以在视觉上看上去就呈现双向变化了。

```html
<style>
  .parent {
    text-align: center;
  }
  .child {
    display: inline-block;
    width: 80px;
    height: 6px;
    background-color: #01AAED;
    transition: width .5s;
  }
  .child:hover {
    width: 200px;
  }
</style>

<body>
  <div class="parent">
    <div class="child"></div>
  </div>
</body>
```

<br>

### 向左变化(向左伸长以及向右缩短):
1. 类似于双向变化, 只要让子元素始终保持右对齐, 就可以实现向左变化(向左伸长以及向右缩短)。
```css
.parent {
  text-align: right;
}
```

<br>

2. 或者用相对定位 和 绝对定位 来解决
```html
<style>
  .parent {
    position: relative;
    width: 200px; /* 初始宽度 */
    height: 100px;
    background-color: lightgray;
  }

  .child {
    position: absolute;
    /* 要点在这里 */
    right: 0;
    top: 0;
    width: 100px;
    height: 100px;
    background-color: gray;
    transition: width 0.5s;
  }

  .parent:hover .child {
    width: 200px;
  }
</style>

<div class="parent">
  <div class="child"></div>
</div>
```

<br><br>

# favicon的引入方式:
```html
<link rel="icon" href="./images/favicon.ico">
```

<br><br>

# input的提示信息: placeholder属性
该提示会在输入字段为空时显示, 并会在字段获得焦点时消失。

**注释:**   
placeholder 属性适用于以下的 ``<input>`` 类型: 
- text
- search
- url
- telephon

<br>

**修改 placeholder 属性:**  
使用 input::placeholder 用伪类

<br><br>

# 当父盒子已经被完全分完(100% = 50% 25% 25%) 这时还要要求父元素右侧有空白
我们可以在父元素上加上 padding-right 来解决

```html
<style>
  html, body {
    background-color: #eee;
  }

  .parent {
    width: 300px;
    height: 300px;
    background-color: #1976D2;
    display: flex;

    /* 要点在这里 */
    padding-right: 5%;
  }

  .item {
    background-color: #fff;
    width: 33.333%;
    height: 100px;
  }
</style>

<div class="parent">
  <div class="item item1">内容1</div>
  <div class="item item2">内容2</div>
  <div class="item item3">内容3</div>
</div>
```

<br><br>

# 如果想利用 margin:0 auto 来实现居中
则盒子必须有宽度

<br><br>

# 盒子不给宽度, 再加上margin的话本身区域是往里挤的

<br><br>

# ``<input type="search">`` type的可选值还有search

<br><br>

# :nth-child(n+2) 后几个
从第二个元素开始向后

<br><br>

# :nth-child(-n+2) 前几个
从第二个元素开始向前

<br><br>

# :nth-child(3n+1) 隔3个加1
1, 4, 7

<br><br>

# 当加完padding后元素掉下来后 可以设置box-sizing

<br><br>

# DPG
京东自主研发的图片压缩技术, 可直接节省用户近50%的浏览量, 提高用户网页打开的速度, 能够兼容jpeg, 实现全平台 去阿奴浏览器的兼容支持, 和webp的清晰度对比没有差距

<br><br>

# webp
谷歌开发的一种加快图片加载速度的图片格式, 图片压缩体积大约只有jpeg的2/3, 并能节省大量的服务器带宽资源和数据空间

<br><br>

# 加了fixed的盒子一定要有宽度 可以加上最大宽度和最小宽度

<br><br>

# 在图片里使用background-size不是图片的百分比 而是盒子的百分比

<br><br>

# 出现行内块的地方一般都有vertical-align:middle

<br><br>

# 光标闪烁效果
```css
.guangbiao {
  animation:blink 1s steps(2, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}
```

<br><br>

# 私有前缀
- Trident内核: 前缀为-ms
- Gecko内核: 前缀为-moz
- Presto内核: 前缀为-o
- Webkit内核: 前缀为-webkit

<br><br>

# 三角形的做法
利用 border 来完成 所以不用给目标设置 width 和 height
```css
.box {
    width:0px;
    height:0px;
    border:10px red solid;

    /* 
        下面是个尖朝上的三角 接下来这么操作   
        尖朝哪个方向 哪个方向的属性就设置为none
        剩下保留左右两边 和 下边
    */
    border-top:none;

    /*
        除了目标边 剩下的三边的颜色 换成透明色
        这里和上面的正好相反 尖朝上 颜色就设定在下
    */
    border-color:transparent transparent white transparent
}
```

<br>

不想加结构的话 可以通过伪元素来设置
```css
.app::after {
    content:'';
    /* 变成块元素 才能设置 width 和 height */
    display:block;

    width:0;
    height:0;

    /* 写在下面的样式 都是相当于围绕content里面的内容添加样式 */
    border:10px solid transparent;
    border-bottom-color:white;

    /* 这个放到最后吧 */
    border-top:none;

    position:absolute;
    left:0;
    right:0;
    margin-left:auto;
    margin-right:auto;
    margin-top:-10px;
}
```

<br>

**总结下:**  
::after before 里面的样式都是对content的值的设定

<br>

### 另一种做法: 
```css
.test {
  width:0;
  height:0;
  border-width:40px;
  border-style:dashed soild dashed dashed;
  
  /* 虚线起始为空阶段 */
  border-color:transparent red transparent transparent;
  overflow:hidden;
}
```

<br>

### 要点: 
1. 没有宽度 高度 三角形的大小是border决定的
2. 尖朝哪个方向 哪个方向的属性就设置为none
3. 剩下的三边的颜色 换成透明色 尖朝上 颜色就设定在下

<br>

### 扇形:

```css
.sector-item {
    width: 0;
    height: 0;
    /* 都是100px? */
    border: 100px solid transparent;
    border-radius: 100px;
    border-top-color: #C2185B;
    position: absolute;
}

.sector-item::after {
    content:'';
    display: block;
    width: 0;
    height: 0;
    border:10px solid transparent;
    border-bottom-color:#eee;
    border-top:none;
    position: absolute;
    top:-85px;
    left: -9px;
}
```


<br><br>

# vw/vh 和 100% 的区别

### %单位
%(百分比)是一个相对长度单位, 相对于包含块(containing block)的高宽或字体大小来取值。

<br>

关于包含块(containing block)的概念, 不能简单地理解成是父元素。

- 如果是静态定位和相对定位, 包含块一般就是其父元素。
- 如果是绝对定位的元素, 包含块应该是离它最近的 position为非static属性的祖先元素。
- 如果是固定定位的元素, 它的包含块是视口(viewport)。

<br>

### vw单位
vw、vh、vmin、vmax是一种视窗单位, 也是相对单位。

它相对的不是父节点或者页面的根节点。**而是由视窗(Viewport)大小来决定的**, 单位 1, 代表类似于 1%。 

视窗(Viewport)是你的浏览器实际显示内容的区域, 换句话说是你的**不包括工具栏和按钮的网页浏览器**。

<br>

### 具体描述如下: 

- vw: 视窗宽度的百分比(1vw 代表视窗的宽度为 1%)
- vh: 视窗高度的百分比
- vmin: 取当前Vw和Vh中较小的那一个值
- vmax: 取当前Vw和Vh中较大的那一个值

vh和vw相对于视口的高度和宽度,  1vh 等于1/100的视口高度, 1vw 等于1/100的视口宽度 比如: 浏览器高度900px, 宽度为750px, 1vh = 900px/100 = 9px, 1vw = 750px/100 = 7.5px,  很容易实现与同屏幕等高的框。

<br><br>

# clip:rect()
我自己的理解 当中间两个值为元素大小时 此时显示的是全部区域, 在这个基础上 设定 上 右 下 左 就是往里压 挤压元素 减小为挤压哦

如果left >= right或者bottom <= top, 则元素会被完全裁掉而不可见, 即"隐藏"。

<br><br>

# 动态添加class 并不一定要加在元素本身上
当期望效果为, 达到某样条件时再出发效果 比如hover上 或者 js到什么样的条件在调用动画等

可以设定好 对目标元素的样式 然后利用后代选择器的方式添加

比如 当祖先元素有这个class时 后代元素出现某种效果
```css
.is-animate .ef-border:after {
  content: '';
  height: 10%;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 50%;
  right: 0;
  bottom: 0;
  background-color: #fff;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  animation-name: borderInOut;
  animation-duration: 0.8s;
  animation-fill-mode: forwards; 
} 
```

<br><br>

# 另类的显示和隐藏
之前我们想要隐藏一个元素的时候 会利用如下的方式
- display: block | none
- height: 0 | 100

<br>

还有新的隐藏方式:
- transform:scale(0)  transform:scale(1);

配合transform:origin使用有不同的效果 bottom下拉, right消失

<br><br>

# 直线从左滑动到右侧然后在右侧消失
1. 使用 transform:scale(0)  transform:scale(1) 来实现 隐藏 和 显示
2. 使用 transform-origin 控制元素变化起点的方向

- 关键点 在49%时的原点在left, 50%的时候改变原点right 向反反向变化
- 关键点 开始的时候透明度0 scale 0 最后的时候透明度1 scale 0

关键点: animation-fill-mode: forwards
```css
@keyframes borderInout {
  0% {
      opacity: 0;
      transform:scale(0);
      transform-origin: left;
  }
  5% {
      opacity: 1;
      transform:scale(0);
      transform-origin: left;
  }
  100% {
      opacity: 1;
      transform:scale(1);
      transform-origin: left;
  }
  50% {
      opacity: 1;
      transform:scale(1);
      transform-origin: right;
  }
  100% {
      opacity: 1;
      transform:scale(0);
      transform-origin: right;
  }
}
```

<br><br>

# ::before伪类在最底层, ::after 伪元素在最上层, 其子元素在中间层

<br><br>

# 文字描边: -webkit-text-stroke: 描边颜色 描边粗细
```s
bilibili.com/list/3494367522195464?sort_field=pubtime&spm_id_from=333.999.0.0&oid=577226380&bvid=BV1EB4y1f7Ei
```

```scss
{
  -webkit-text-stroke: #fff 2px;
  color: transparent;
}
```

配合 ``color: transparent;`` 既可以做到字体镂空的效果

<br><br>

# ::before 中的 content
css3里面的 content 的值 可以从标签属性的 data-text 上获取 例如
```html
<div data-text="data-内容">benshen</div>

<style>
  div::before {
    content: attr(data-text);

    display: block;
    width: 100px;
    height: 100px;
    background-color: #FBC02D;
  }
</style>

```

<br><br>

# 裁切显示区域

### clip-path
裁剪方式创建元素的可显示区域。区域内的部分显示, 区域外的隐藏。圆的大小 和 圆心的位置
```css
clip-path: circle(300px at 40% 10%)


clip-path: circle(40%);
clip-path: ellipse(130px 140px at 10% 20%);
clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
clip-path: path('M 0 200 L 0,75 A 5,5 0,0,1 150,75 L 200 200 z');
```

<br><br>

# 毛玻璃效果
```css
{
  background:rgba(0,0,0,.1);
  backdrop-filter: blur(4px);    
}
```

这个属性可以让你为一个元素后面区域添加图形效果(如模糊或颜色偏移)。  
因为它适用于元素背后的所有元素, 为了看到效果, 必须使元素或其背景至少部分透明。

不能对元素直接使用 ``filter: blur()`` 会将其内容全部模糊掉 为了保证文字不会模糊掉需要多一个层单独应用模糊效果 模糊效果并不会应用到其背后的元素上, 所以需要使用 content 区域有和背景相同的背景图并进行模糊。

<br>

多一个层级的方法不通过添加元素, 而通过伪元素。
```css
.content {
  z-index: 1;
}
.content:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,0.8);
  z-index: -1;
}
```

<br>

### 注意:
由于伪元素不能通过 width:100% 和 height:100% 来继承宿主元素的尺寸, 所以通过上述方式来继承 content 的尺寸；为了使伪元素位于 content 的下面这里给其设置 z-index:-1, 为不使其隐藏到背景图的后面, 这里给 content 设置 z-index:1。

<br>

# Top banner 位置 视频

### 视频的自动循环播放 muted loop autoplay
```html
<section id='wrap'>
  <video src="./source/nuan.mp4" muted loop autoplay></video>
</section>
```

<br>

### 控制视频的显示区域 和 显示位置
```css
object-fit: fill|contain|cover|scale-down|none|initial|inherit;
object-position: 50% 50%;right top;
```

- contain: 保持原有尺寸比例。内容被缩放。
- cover: 保持原有尺寸比例。但部分内容可能被剪切。
- none: 保留原有元素内容的长度和宽度, 也就是说内容不会被重置。
- scale-down: 保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同, 取决于它们两个之间谁得到的对象尺寸会更小一些。

<br>

### 视频上有文字的话
首先注意html结构, 然后让视频的容器开启定位, index:-1
```css
#wrap {
  width:100vw;
  height:70vh;
  overflow: hidden;
  margin:0 auto;
  background:cadetblue;
  text-align:right;
  position: absolute;
  top:0;
  left:0;
  z-index:-1;

  video {
    width:100%;
    height:100%;
    object-fit: cover;
    object-position: 50% 0;
  }
}
```

<br><br>

# 垂直水平居中

### 当不知道元素高宽的时候:
```css
{
  position:absolute;
  left:50%;
  top:50%;
  transform: translate3d(-50%, -50%, 0);
}
```

<br>

### 当知道高 和 宽时
```css
{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  margin:auto;
}
```

<br><br>

# width: auto / 100% 区别
- auto 加 padding的时候, 是在内容区里往里扣的, width包含padding
```
| padding width padding |
```

- 100% 加 padding的时候, 是加在内容区外面的
```
padding | width | padding
```

<br><br>

# 父元素设置opacity的时候 子元素会继承到opacity

### 解决方案1: 
父元素不使用opacity 使用rgba控制a的值, 兼容性不好ie6不行

<br>

### 解决方案2:
给子元素(child), 创建一个兄弟元素结构(opacity-bg), 在opacity-bg上设置opacity, 然后绝对定位调整child和opacity-bg层级, 让opacity-bg在child的下面

```html
<style>
  .child {
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;

    z-index: 1;
  }

  .opacity-bg {

    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;

    opacity: .5;
    z-index: 0;
  }
</style>

<div class='parent'>
  <div class="child"></div>
  <div class="opacity-bg"></div>
</div>
```