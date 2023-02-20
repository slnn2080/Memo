# 适配

<br>

## pc端获取屏幕宽度的方式

### 最干净的显示区域

```js
document.documentElement.clientWidth
```

<br>

### 最干净的显示区域 + 滚动条
```js
window.innerWidth
```

<br>

### 最干净的显示区域 + 滚动条 + 浏览器边框
```js
window.outerWidth
```

<br>

### 与浏览器无关, 当前设备显示分辨率横向的值
```js
screen.width
```

<br><br>

# pc端视口
pc端视口的默认宽度和浏览器窗口宽度一致 在css标准文档中 视口也被称为 **初始包含块**

它是所有css百分比宽度推算的根源 在pc端可以通过上面的方式获取宽度 pc端没有那么多的事儿 就一个视口的概念

<br>

# 移动端视口
移动端的概念有点多有, 两个视口 一个标准

<br>

## 布局视口 (容器)
用于解决 **早期的页面** 在手机上显示的问题 早期的时候我们这样做

pc端网页宽度一般都为 960px ~ 1024px 这个范围, 就算超出了该范围 960px ~ 1024px 这个区域也依然是版心的位置

浏览器厂商针对移动端设备设计了一个容器 先用这个容器去承装pc端的网页 这个容器的宽度一般是 **980px**

不同的设备可能有所差异 但相差并不大 随后将这个容器等比例压缩到与手机等宽

<br>

### 问题:
这样就可以保证没有滚动条切能完整的呈现页面 但是这样做依然有问题:  
**网页内容被压缩的太小 严重影响用户体验**

<br>

### 移动端获取布局视口方式:
代码上pc端的是一样的但是在不同的场景下运行 获取的目标不一样
```
document.documentElement.clientWidth
```

<br>

- pc获取的是初始包含块
- sp获取的是布局视口的宽度 (一般都是固定的 980px)
```js
document.documentElement.clientWidth
// sp端的时候输出 980

document.documentElement.clientWidth
// pc端的时候输出 852
```

<br>

**注意:**
布局视口经过压缩后 横向的宽度用css像素表达就不再是375px了 而是980px 因为布局视口是被压缩 而不是截取

<br>

### 扩展:
所以我们没有写meta标签的时候 网页上的字 元素太小 是因为布局视口压缩进手机宽度里面 等比压缩后的后果

<br>

### 思考:
以iphone6为例:
```
物理像素: 750px
设备独立像素: 375px, dpr: 2
css像素: 375px
```

<br>

要想写个盒子把iphone铺满 因为dpr为2 所以程序员想铺满屏幕 要写 375px
```css
div {
  width: 375px;
}
``` 

上面的情况是设置了meta标签 也就是不缩放的情况下 ``1css像素 = 1设备独立像素`` 再考虑dpr

但是, 如果我们没有写meta标签 那么接住 我们写的 375px 元素的是布局视口 也就是980px那个

布局视口接住后 会等比缩放至和屏幕大小一样宽 所以我们写的375px一是会觉得小 二是并没有我们想想的那样 写完375px后 并没有铺满整个屏幕

<br><br>

## 视觉视口  
视觉视口就是用户可见的区域 **它的绝对宽度永远和设备屏幕一样宽** 但是这个宽度里所包含的css像素值是变化的

**也就是屏幕有多大 视觉视口就有多大**

<br>

例如: 一般手机会将980个css像素放入视觉视口中 而ipad pro会将1024个css像素放入视觉视口中

<br>

### 移动端获取视觉视口方式:
```js
window.innerWidth
```

**注意:**  
不过在 ANdroid2 Opera mini UC8 中无法正确获取, **一般不通过代码看视觉视口**

<br>

### 思考
对于 iphone6 来说 它的视觉视口

**要用物理像素表达:**  
横向就是750个物理像素

<br>

**要用设备独立像素表达:**   
375px 

<br>

**要用css像素表达:**   
写meta的情况 我们的css像素是用布局视口承接的 所以是980px  
980px 

<br><br>

## 理想视口(标准)
与屏幕(设备独立像素)等宽的布局视口 称之为理想视口  
这里是拿设备独立像素来衡量的(怪不得设计师会参考设备独立像素出图)

所以也可以说理想视口是一种标准: 放布局视口宽度与屏幕等宽(设备独立像素), 靠 meta 标签实现

<br>

### 理想视口的特点
1. 布局视口 和 屏幕等宽 以iphone6为例 符合理想视口的标准之后
  - 设备独立像素:  375px
  - 布局视口端口:  375px

2. 用户不需要缩放, 滚动就能看到网站的全部内容
3. 要为移动端设备单独设计一个移动网站

<br>

### 设置理想视口的具体方式:
meta标签的作用就是修改布局视口, 这样布局视口永远和屏幕等宽
```html
<!-- device-width就是获取的设备独立像素 -->
<!-- 将设备独立像素赋值给布局视口 就相当于开启了理想视口 -->
<meta name="viewport" content="width=device-width;">
```

<br>

### 问题:
你想啊 我们用布局视口是为了承接pc端的网页的 但是现在布局视口让我们修改的和设备屏幕等宽了(按照设备独立像素修改的)

那pc端网页的内容怎么办 原先980px的布局内容 现在变成375px的理想视口了 这布局和内容应该怎么办？

<br>

### 解答:
在现今的年代 我们已经不奢求一件事儿了 就是pc端的页面既能在电脑上展示 又能在手机上展示 为什么我们非得要让手机展示pc端的网页呢？那我们就为手机端单独设计一个网页呗 

<br>

### 总结:
**不写 meta 标签(不符合理想视口标准)**  
1. 描述屏幕: 
- 物理像素: 750px
- 设备独立像素: 375px
- css像素: 980px

2. 优点: 元素在不同设备上 呈现效果几乎一样 因为都是通过布局容器等比缩放 例如200宽的盒子 200 / 980

<br>

**写 meta 标签(符合理想视口标准)**
1. 描述屏幕
- 物理像素: 750px
- 设备独立像素: 375px
- css像素: 375px

2. 优点:  
页面清晰展现 内容不再笑到难以观察 用户体验较好

3. 缺点:  
同一个元素 在不同屏幕设备上 呈现效果不一样 例如 375宽的盒子 375/375 和 375/414 不是等比显示

<br>

**所以要做适配 让程序员写的代码在任何设备上都能全屏展示**
理论上可以用100% 处理所有的布局 但是算起来太麻烦 比如90.6666%

<br>

只要是移动端的项目 一定会开启理想视口 一旦开启 980的布局视口 就被干掉了 

开启理想视口之后 手机有多宽 布局视口就有多宽广 
- 元素显示不成比例 --> 适配
- pc页面无法承接 --> 算了吧 不接了 直接写一个移动端页面

<br>

### 缩放
https://www.bilibili.com/video/BV1Ey4y1u7vi?p=142&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b

这个部分没有整理

<br><br>

# 适配
- pc端的设计稿 给多少写多少
- sp端的设计稿 要做适配

<br>

### 设计师出图的两种方式:
以iphone的设备独立像素出图 375px
以iphone的分辨率出图 750px

设计师设计的是一个比例关系 并不是一个死值 按照一个标准设计一个比例

<br>

### 为什么要适配?
由于移动端设备的屏幕尺寸大小不一 会出现同一个元素 在两个不同的手机上显示效果不一样(比例不同) 要想让同一个元素在不同设备上 显示效果一样 就需要适配

无论采用何种适配方式 中心原则永远是 **等比**

<br>

### 为什么不直接用百分比做适配
横向的时候 我们参考设计稿算出 横向的百分比是可以的

纵向的时候 **我们参考设计稿算出的百分比** 40%, 但是我们得到的这个40%要基于 html body 的高度 并不是我们想象中基于设计稿的高度 **也就是纵向没有办法写百分比**

```css
/* 设计稿 375px */
div {
  width: 345px;
  height: 150px;
}

/* 100%适配的问题 */
div {
  width: 92%;   (345 / 375)
    /* 
      40%是以横向做为基准算出来的 但是代码里面的横向的40%不看 375 而是看 html body 的高度 

      这样会导致 元素的高度太大了
    */
    height: 40%;  (150 / 375)
}
```

<br>

### viewport适配
方法:拿到设计稿之后 **设置布局视口宽度为设计稿宽度**
```html
<meta name="viewport" content="width=375;">
```

这样所有的设备的布局视口都是375 那我们直接按照设计稿给宽高进行布局即可

<br>

**优点:**  
不用复杂的计算 直接使用图稿上标注的px值

**缺点:**  
不能使用完整的meta标签 会导致在某些安卓手机上有兼容性的问题
**不希望适配的 东西 例如边框 也强制参与了适配**

<br>

比如我们设计稿里面写了
- 宽: 345px
- 高: 150px
- padding: 15px

这代表了 比例关系 也就是说我们要在别的设备上也要维持这种比例关系

那假如 设计稿上的盒子有1px边框 那么 1px 也要做比例关系么？

边框是否参与适配(比例)是不是要问设计师 但是 viewport 这种方式 使边框强制的使用比例了

<br>

### rem适配
em 和 rem 都是css中的长度单位 而且两个都是相对长度单位
1. em 相对的是 父级元素的字体大小
2. rem 相对的是 根元素的字体大小

<br>

### rem适配的原理:
编写样式时统一使用rem位单位 **在不同设备上动态调整字体大小**

<br>

### 方案一: (淘宝 百度 -> 设置 html fs: 100px) 
设计师以iphone6作为标准机型 375px, 设计稿的宽度为345

**在 iphone6 中**
```
------ 375 ------

   --- 345 ---
```

**在 iphone6plus 中**  
那设计稿345的宽度在 414中应该是多少?
```
------ 414 ------

    --- ? ---
```

**怎么求 ? 的值?**
```
375     414
---  =  ---   
345      ?
```

414 * 345 / 375 = ?  (380.88) 

上面告诉我们 求一个数值为多少的时候 可以通过上面的方式求得

<br>

### 将px转为rem
我们将 元素的 px 都换成 rem 作为单位 

我们也知道 rem 是相对于 根字体 的结果 那我们就可以这样

**1. 修改根字号: html的fs修改为100px**
375px 的设计稿 我们先修改 html 的 font-size 为 100px 这样我们就可以利用 rem 来设置元素的单位

这样我们修改元素的 px -> rem 的时候就很好算 比如:
- 50px -> 0.5rem
- 345px = 3.45rem

<br>

**2. 修改另一台设置的fs**  
因为我们写的是rem都是相对单位 那在 另一台设备上的时候(414px) 我们是不是修改 414设备的 font-size 的值为一个合适的值就可以了 

因为 页面元素的大小都是 rem 也就是比例关系已经确定了 **那只需要修改 "根源" 就可以了**

<br>

### 如何修改 "根源" 的字号呢？

**iphone6**   
1. 我们拿到手的设计稿是 375px (iphone6)
2. 我们手动设置的iphone6的 html fs为 100px

<br>

**iphone6 plugs**
新设备的设备独立像素能拿到 414px 那能不能求出 新设备的 html fs 应该是多少

```
100px (根字体)              ?
-----           =       ------
375px (独立像素)         414px (独立像素) 
```

414 * 100 / 375 = ?

<br>

**公式:**  
新设备的独立像素值 * 100 / 设计稿的宽度 = 新设备的 html font-size

设计稿的宽度是设计师给我们的 是我们原型

<br>

**要点:**
我们出iphone6的图的时候 要将 html font-size 设置为100px  
我们在写盒子大小的使用 单位要是rem

<br>

### 动态的设置 html font-size
每个设备的 font-size 我们要通过计算 动态确定吧

<br>

### 获取设备独立像素
当我们通过 meta 标签开启理想视口的时候 
```
布局视口 = 设备独立像素
```

那我们获取布局视口是不是就可以了
```css
* {
  margin: 0;
  padding: 0;
}

#demo {
  width: 3.45rem;
  height: 1.5rem;
  background-color: palevioletred;

  margin: 0.15rem auto 0;
}
```
```html
<div id="demo"></div>
  
<script>
const cpmputeRootFontSize = () => {
    // 获取手机横向的设备独立像素
    let dip = document.documentElement.clientWidth;

    // 计算根字体大小 (100是我们自己指定的 375是设计稿宽度)
    let rootFontSize = (dip * 100) / 375

    // 设置根字体
    document.documentElement.style.fontSize = rootFontSize + "px"
}

// 页面初加载的时候要执行
cpmputeRootFontSize()

// 当页面发生变化的时候 也要重新计算
/*
    window.addEventListener("resize", () => {
    cpmputeRootFontSize()
    })
*/
// 也可以这么写 
window.onresize = cpmputeRootFontSize

</script>
```

一般我们会将函数名起名为 adapter 适配器

<br><br>

## VW适配 (不是VH哦)
上面我们说过 为什么100%的方案不行 因为计算高度的时候是根据 html 的高度计算的

**vw / vh**  
这两个单位是相对单位
- 1vw = 等于布局视口宽度的 1%
- 1vh = 等于布局视口高度的 1%

<br>

**注意:**  
我们算比例关系的时候 不管宽度还是高度都是拿设计稿的宽度去算 而且我们算出height的值的时候 **单位也是vw哦**

```scss
#demo {
  width: 50vw;  // 160px
  height: 10vw; // 64px
  background-color: papayawhip;
}
```

iphone3下 设备独立像素为 320 * 640
因为我们开启了 meta 标签 所以 320的一半是160px 640的10%是64px

**不过 vw 和 vh 有很严重的兼容性问题**

<br><br>

### 1物理像素边框的问题 建立在边框不参与适配的基础上
```s
https://www.bilibili.com/video/BV1Ey4y1u7vi?p=149&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

高清屏幕下 1px 对应更多的物理像素 所以 1px 边框看起来比较粗 解决办法
```css
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  #demo {
    border: 0.5px solid black;
  }
}

/* 或者 */
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  #demo::after {
    transform: scaleY(0.5)
  }
}
```

<br>

**scss课程中留的一些话 没事看看**  
当一个漂亮的UI小姐姐给了你一份 750px 移动端的设计稿 我们要拿着设计稿进行还原是吧
你说 我们能不能就拿着设计稿中标记的元素尺寸 直接写移动端的布局？

**试试呗**  
比如 现在设计稿上写的 有个部分呢 要两列布局 每列320px
有人说简单呀 直接写呗 那我们就先写一列

然后我们查看下在移动设备下的显示效果 我们会发现
我们只写了 320px的一个盒子 我们会发现
在各个设备下的尺寸都不一样 比如在iphone3 下直接就全屏了

至于为什么？ 这里就不过多的讲了 因为移动端这块也是一个知识点 里面也包含了很多的概念 比如
  - css像素
  - 物理像素
  - 设备独立像素
  - dpr
  - 视网膜屏呀
  - 以及各种视口呀

要是讲的话 最少最少得一个多小时 咱们讲的scss 所以其它的就简单铺垫一下

我们写的css也叫做逻辑像素 或者 就叫做css像素 再简单点理解在编辑器上敲的px都是css像素

*画图*

你想啊 我们就在编辑器上简单的写了一个 div高宽100 人家屏幕就给你显示了一个图形 这中间肯定有什么转化关系吧

简单的说 其实呢咱们写的css代码 会被显示器的显示芯片接收了 显示芯片里面呢 定义了设备独立像素 设备独立像素 和 css像素是1:1的关系 1px = 1设备独立像素 (不考虑缩放的情况下)

接下来 设备独立像素 需要告诉 物理像素怎么呈现效果
哥们啥事物理像素, 物理像素你就可以理解为屏幕显示器的分辨率 咱买电脑 人家会说 这个屏幕啊 是 1920 x 1080 的 那就是说 横向有1920个像素点 你就可以理解为 横向上有1920个会发各种颜色的小灯泡 这些小灯泡是真实存在的 这个就是物理像素

设备独立像素 会根据 dpr 来告诉物理像素 咱们用多少个小灯泡显示图形
刚才那老哥又来了 哥们啥是dpr 2010年那年乔布斯发布了视网膜屏 将屏幕分为了两种 一种呢是普通屏幕 一种呢是视网膜屏

说啊 在 普通屏幕 和 视网膜屏 的屏幕大小一样的情况下 视网膜屏可以将更多的小灯泡压缩到屏幕里面去
也就是说 同样的 5寸大小的屏幕 普通屏的分辨率是320 视网膜屏的分辨率就是640 你看同样的尺寸 我压进去了更多的小灯泡 这样显示效果会更加的细腻是么

但是你细品 sp.ai

---

上面我们看了 我们的元素在各个设备上显示的效果都不一样 这时候我们就要知道 我们不能再写死px了 怎么办呢？ 

我们可以按比例, 什么意思呢 比如啊 一个元素 假如我们给它的宽度设置为50% 屏幕的一半 那么这个元素是不是在各个设备下 宽度都是一样的对吧 都是屏幕的一半吗

那是不是说 当我们拿到ui小姐姐的设计稿的时候 我们只要算出各个元素和设计稿之间的比例关系 那么我们用比例去设置元素的大小 就能确保在各个设备上显示的效果都一样了对么

比如 一行两个元素 左边的占70% 右边的占30% 以这样的比例关系去布局 就没有问题了对么

那适配的方案有很多 比如 vw rem 都能做适配 这里我们说下 vw 适配
vw呢是相对单位 相对于视口(也就是屏幕宽度) vw呢把屏幕分成100份

1vw = 1%

我们怎么利用vw做适配呢？ 我们举个例子
```
<!-- 




 -->

------

### 网络中关于适配的基础知识
所有非视网膜屏幕的iphone在垂直的时候, 宽度为320物理像素。
当你使用<meta name="viewport" content="width=device-width">的时候, 会设置*视窗*布局宽度(不同于视觉区域宽度, 不放大显示情况下, 两者大小一致, 见下图)为320px, 于是, 页面很自然地覆盖在屏幕上

这样, 非视网膜屏幕的iphone上, 屏幕物理像素320像素, 独立像素也是320像素, 因此, window.devicePixelRatio等于1.

而对于视网膜屏幕的iphone, 如iphone4s, 纵向显示的时候, 屏幕物理像素640像素。同样, 当用户设置<meta name="viewport" content="width=device-width">的时候, 其视区宽度并不是640像素, 而是320像素, 这是为了有更好的阅读体验 – 更合适的文字大小。

这样, 在视网膜屏幕的iphone上, 屏幕物理像素640像素, 独立像素还是320像素, 因此, window.devicePixelRatio等于2.


> 设备物理像素:
是一个物理概念, 比如设备的分辨率, Phone 5 的分辨率 640 x 1136px。
一个个发光的2极管


> 设备独立像素 device-independent pixels (dips):
是一个抽象像素, 用于向CSS中的宽度、高度、媒体查询 和 meta 的 viewport 中的 device-width 提供信息。
通过观察retina和非retina设备之间的区别, 可以最好地解释它们。

比如我们可以自己调节 屏幕的分辨率 1920px 的我们可以调节成 1440px
比如 原先用一个1个物理像素 表达 一个像素 现在我们用2个物理像素 表达 一个像素 这时候分辨率就缩小了一半

逻辑像素就是用多个发光的二极管显示一个像素的内容


> CSS像素:
指的是CSS中使用的逻辑像素。在CSS规范中, 长度单位可以分为两类, 绝对(absolute)单位以及相对(relative)单位。px是一个相对单位, 相对的是设备物理像素。

比如iPhone 5 使用的是Retina屏幕, 使用 
  2px x 2px 的设备物理像素  代表 1px x 1px 的 CSS像素, 
  
所以设备物理像素为640 x 1136px, 而CSS逻辑像素数为320 x 568px。

也就是说 我们可以从两点上来考虑
1. 如果 dpr 是 2 的话 那么我们写的css像素当中的 1px 在retina屏下 代表 2px
2. 同理 我们设计稿 如果是640px 那么css像素我们就是320px


> dpr就是设置像素比
获得设备像素比后, 便可得知 *设备物理像素 与 CSS像素 之间的比例*。
  - 当这个比率为1:1时, 使用1个设备物理像素显示1个CSS像素。
  - 当这个比率为2:1时, 使用4个设备物理像素显示1个CSS像素, 
  - 当这个比率为3:1时, 使用9(3*3)个设备物理像素显示1个CSS像素。

关于设计师和前端工程师之间如何协同：
  一般由设计师按照设备像素(device pixel)为单位制作设计稿
  前端工程师, 参照相关的设备像素比(device pixel ratio), 进行换算以及编码。

> 思考:
一般普通图在的1920*1080, 是很正常的, 但是如果放在的2k或者4K屏幕里面, 背景图就是模糊掉, 为什么呢？

在不同的屏幕上(普通屏幕 vs retina屏幕), css像素所呈现的大小(物理尺寸)是一致的, 不同的是1个css像素所对应的物理像素个数是不一致的。

  普通屏幕:
    1个css像素 对应 1个物理像素(1:1)

  retina屏幕:
    1个css像素对应 4个物理像素(1:4)


```scss
// 引入 reset.css 样式
@use "../../../node_modules/reset-css/sass/reset";

html {
  font-size: 62.5%;
}

// 当大于 dpr > 2 的时候 使文字更加的清晰
@media only screen and (-webkit-min-device-pixel-ratio: 2),
  (-webkit-min-device-pixel-ratio: 2),
  (min-resolution: 2dppx) {
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

body {
  // 默认值: 在大多数non-retina显示这将给最锋利的文本
  -webkit-font-smoothing: subpixel-antialiased;
  // unset: 修改所有元素属性或父元素的值为其父元素的值(如果有继承)或其初始值
  -moz-osx-font-smoothing: unset;
  // 检索或设置移动端页面中对象文本的大小调整。
  -webkit-text-size-adjust: 100%;

  // 使用了 Noto Sans JP 的谷歌字体 并指定了默认字体
  font-family: "Noto Sans JP", sans-serif;
  font-size: 1.4rem;
  -webkit-font-smoothing: subpixel-antialiased;
  line-height: 1.75;
}
```

> 1像素问题
在手机上会比较明显
由于移动端设备大多数像素比都是大于1的
```html
<style>
  .box {
    width: 500px;
    height: 1px;
    background: red;

    /* 解决方式 像素比为3的时候 2的时候就是0.5 */
    transform: scale(1, 0.333)
  }
</style>
<div></div>
```

---

> 移动端适配相关概念

> 1. 英寸(屏幕对角线的长度)
一般用英寸描述屏幕的物理大小，如电脑显示器的17、22，手机显示器的4.8、5.7等使用的单位都是英寸。

> 2. 设备独立像素
智能手机发展非常之快，在几年之前，我们还用着分辨率非常低的手机，比如下面左侧的白色手机，它的分辨率是320x480，我们可以在上面浏览正常的文字、图片等等。

但是，随着科技的发展，低分辨率的手机已经不能满足我们的需求了。很快，更高分辨率的屏幕诞生了，比如下面的黑色手机，它的分辨率是640x940，正好是白色手机的两倍。

理论上来讲，在白色手机上相同大小的图片和文字，在黑色手机上会被缩放一倍，因为它的分辨率提高了一倍。这样，岂不是后面出现更高分辨率的手机，页面元素会变得越来越小吗？

然而，事实并不是这样的，我们现在使用的智能手机，不管分辨率多高，他们所展示的界面比例都是基本类似的。乔布斯在iPhone4的发布会上首次提出了Retina Display(视网膜屏幕)的概念，它正是解决了上面的问题，这也使它成为一款跨时代的手机。

在iPhone4使用的视网膜屏幕中，把2x2个像素当1个像素使用，这样让屏幕看起来更精致，但是元素的大小却不会改变。

如果黑色手机使用了视网膜屏幕的技术，那么显示结果应该是下面的情况，比如列表的宽度为300个像素，那么在一条水平线上，白色手机会用300个物理像素去渲染它，而黑色手机实际上会用600个物理像素去渲染它。

我们必须用一种单位来同时告诉不同分辨率的手机，它们在界面上显示元素的大小是多少，这个单位就是设备独立像素(Device Independent Pixels)简称DIP或DP。上面我们说，列表的宽度为300个像素，实际上我们可以说：列表的宽度为300个设备独立像素。

打开chrome的开发者工具，我们可以模拟各个手机型号的显示情况，每种型号上面会显示一个尺寸，比如iPhone X显示的尺寸是375x812，实际iPhone X的分辨率会比这高很多，这里显示的就是设备独立像素。


> 设备像素比
设备像素比device pixel ratio简称dpr，即物理像素和设备独立像素的比值。在web中，浏览器为我们提供了window.devicePixelRatio来帮助我们获取dpr 在css中，可以使用媒体查询min-device-pixel-ratio，区分dpr：
```css
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){ }

```

当然，上面的规则也有例外，iPhone 6、7、8 Plus的实际物理像素是1080 x 1920，在开发者工具中我们可以看到：它的设备独立像素是414 x 736，设备像素比为3，设备独立像素和设备像素比的乘积并不等于1080 x 1920，而是等于1242 x 2208。

实际上，手机会自动把1242 x 2208个像素点塞进1080 * 1920个物理像素点来渲染，我们不用关心这个过程，而1242 x 2208被称为屏幕的设计像素。我们开发过程中也是以这个设计像素为准。

为了适配所有机型，我们在写样式时需要把物理像素转换为设备独立像素：例如：如果给定一个元素的高度为200px(这里的px指物理像素，非CSS像素)，iphone6的设备像素比为2，我们给定的height应为200px/2=100dp。

当然，最好的是，你可以和设计沟通好，所有的UI图都按照设备独立像素来出。


> 视口
视口(viewport)代表当前可见的计算机图形区域。在Web浏览器术语中，通常与浏览器窗口相同，但不包括浏览器的UI， 菜单栏等——即指你正在浏览的文档的那一部分。

一般我们所说的视口共包括三种：布局视口、视觉视口和理想视口，它们在屏幕适配中起着非常重要的作用。

> 布局视口
布局视口(layout viewport)：当我们以百分比来指定一个元素的大小时，它的计算值是由这个元素的包含块计算而来的。当这个元素是最顶级的元素时，它就是基于布局视口来计算的。

所以，布局视口是网页布局的基准窗口，在PC浏览器上，布局视口就等于当前浏览器的窗口大小（不包括borders 、margins、滚动条）。

在移动端，布局视口被赋予一个默认值，大部分为980px，这保证PC的网页可以在手机浏览器上呈现，但是非常小，用户可以手动对网页进行放大。

我们可以通过调用document.documentElement.clientWidth / clientHeight来获取布局视口大小


> 视觉视口
用户通过屏幕真实看到的区域。
视觉视口默认等于当前浏览器的窗口大小（包括滚动条宽度）。当用户对浏览器进行缩放时，不会改变布局视口的大小，所以页面布局是不变的，但是缩放会改变视觉视口的大小。

例如：用户将浏览器窗口放大了200%，这时浏览器窗口中的CSS像素会随着视觉视口的放大而放大，这时一个CSS像素会跨越更多的物理像素。所以，布局视口会限制你的CSS布局而视觉视口决定用户具体能看到什么。

我们可以通过调用window.innerWidth / innerHeight来获取视觉视口大小。


> 理想视口
布局视口在移动端展示的效果并不是一个理想的效果，所以理想视口(ideal viewport)就诞生了：网站页面在移动端展示的理想大小。

如上图，我们在描述设备独立像素时曾使用过这张图，在浏览器调试移动端时页面上给定的像素大小就是理想视口大小，它的单位正是设备独立像素。

上面在介绍CSS像素时曾经提到页面的缩放系数 = CSS像素 / 设备独立像素，实际上说页面的缩放系数 = 理想视口宽度 / 视觉视口宽度更为准确。

所以，当页面缩放比例为100%时，CSS像素 = 设备独立像素，理想视口 = 视觉视口。我们可以通过调用screen.width / height来获取理想视口大小。


> vw 适配的缺点
px转换成vw不一定能完全整除，因此有一定的像素差。
比如当容器使用vw，margin采用px时，很容易造成整体宽度超过100vw，从而影响布局效果。当然我们也是可以避免的，例如使用padding代替margin，结合calc()函数使用等等...

https://blog.csdn.net/weixin_42981560/article/details/124241357


> 图片模糊问题
我们平时使用的图片大多数都属于位图（png、jpg...），位图由一个个像素点构成的，每个像素都具有特定的位置和颜色值：

理论上，位图的每个像素对应在屏幕上使用一个物理像素来渲染，才能达到最佳的显示效果。

而在dpr > 1的屏幕上，位图的一个像素可能由多个物理像素来渲染，然而这些物理像素点并不能被准确的分配上对应位图像素的颜色，只能取近似值，所以相同的图片在dpr > 1的屏幕上就会模糊:

为了保证图片质量，我们应该尽可能让一个屏幕像素来渲染一个图片像素，所以，针对不同DPR的屏幕，我们需要展示不同分辨率的图片。

在dpr=2的屏幕上展示两倍图(@2x)，在dpr=3的屏幕上展示三倍图(@3x)。

----------------

### 代码规范
类名语义化, 必须全是小写字母, 单词之间使用"- _"来链接
类名嵌套层次不要超过三层
尽量避免直接使用元素选择器
属性的书写顺序:
    - 布局定位属性: display / position / float / clear / visibility / overflow
    - 尺寸属性:     width / height / margin / padding / border / background
    - 文本属性:     color / font /  text-decration / text-align / vertical-align
    - 其他属性:     content / cursor / border-radius / box-shadow / text-shadow
避免使用id选择器
避免使用通用符* 和 !important

### 目录规范
项目文件夹
    - 样式文件夹:css
    - 业务类图片文件夹:images
    - 样式类图片文件夹:icons
    - 字体类文件夹:fonts


### 慕客 / 蓝湖
很方便的测量工具 没事的时候自己使用一下

### 适配方案
flex布局
百分比布局
rem布局
vw / vh布局
响应式布局


### 初始化文件
引入 normalize.css
less中初始化body样式
<!-- 
    body {
        min-width:320px;
        max-width:750px;
        margin:0 auto;

    }
 -->

约束范围(使用flexible.js时要约束一下范围)
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

移动端对浏览器的兼容性的支持会比较好
国内的移动端浏览器暂无自己的内核 都是那 webkit 修改过来的内核 所以
兼容移动端主流浏览器 处理 webkit 内核浏览器即可

> https://material.io/devices

作为前端开发 不建议去纠结 dp dpi pt ppi 等单位

### 视口

视口就是一个屏幕区域, 视口分为布局视口 视觉视口 理想视口, 我们只用理想视口

> 布局视口

一般移动设备的浏览器都默认设置了一个布局视口 用于解决早期的 PC 端页面在手机上现实的问题
ios android 基本都将这个视口分辨率设置为 980px 所以 pc 上的网页大多都能在手机上呈现, 只不过元素看上去很小 一般默认可以通过手动缩放网页
<!--
    以前设计网页时 一般都设计为980px 但是这样直接拿到手机上看的话 里面的元素特别的小
 -->

> 视觉视口

用户正在看到的网站的区域. 注意是网站的区域
我们可以通过缩放去操作视觉视口, 但不会影响布局视口 布局视口仍然保持原来的宽度

> 理想视口

为了使网站在移动端有最理想的浏览和阅读宽度而设定
理想视口对设备来讲是最理想的视口尺寸, 需要手动填写 meta 视口标签通知浏览器操作
meta 视口标签的主要目的: 布局视口的宽度应该与理想视口的宽度一致, 简单的理解就是设备有多宽, 我们布局的视口就多宽
<!--
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
 -->

### meta 视口标签

要点: 设备有多宽 视口就有多宽 device-width

> <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

<!--
    width:          宽度设置的是viewport宽度, 可以设置device-width特殊值(设备宽度)
    initial-scale:  初始缩放比, 大于0的数字
    maximum-scale:  最大缩放比, 大于0的数字
    minimum-scale:  最小缩放比, 大于0的数字
    user-scalable:  用户是否可以缩放 yes或no 1或0
-->

### CSS 像素 物理像素

物理像素点指的是屏幕显示的最小颗粒, 是物理真实存在的, 这是厂商在出厂时就设置好了, 比如苹果 6 7 8 是 750\*1334
<!--
    ip8 750像素的宽, 代表在ip8下 一行有750个像素点
 -->

我们开发时候的 1px 不是一定等于 1 个物理像素的, pc 端页面, 1px 等于 1 个物理像素的, 但是移动端不同　并不是一一对应的关系
<!--
    比如 ip8 就是1:2 1css像素 = 2个物理像素  这种情况就叫做物理像素比
-->

一个 px 的能显示的物理像素点的个数, 称为物理像素比或屏幕像素比

### 物理像素 & 物理像素比

PC 端 和 早前的手机屏幕 / 普通手机屏幕: 1css 像素 = 1 物理像素
早期的手机屏幕并不是很清楚, 知道出现 Retina(视网膜屏幕)是一种显示技术, 可以将更多的物理像素点压缩在一块屏幕里 从而达到更高的分辨率, 并提高屏幕显示的细腻程度

### 2 倍图

对于一张 50\*50 的图片在 ip8 手机 retina 屏中打开 按照刚才的物理像素比会放大倍数(2 倍), 这样会造成图片的模糊
在标准的 viewport 设置中, 使用倍图来提高图片质量 解决在高清设备中的模糊问题
通常使用二倍图 因为 ip678 的影响 但是现在还存在 3 4 倍图的情况 这个看实际开发公司需求
背景图片注意缩放(我们准备的是 2 倍图 在应用的时候再缩小 1 倍)
<!--
    background-size:50px 50px

    %会继承父元素的宽度 注意
 -->

### 移动端开发方案

> 单独制作 移动端 页面(主流)

京东商城手机版
淘宝触屏版
苏宁易购手机版

> 响应式页面兼容移动端(其次)

三星手机官网

### 单独移动端页面

通常情况下, 网址域名前面加 m 可以打开移动端 通过判断设备, 如果是移动端打开的页面 则跳转到移动端页面 如果是 pc 端打开的页面则跳转到 pc 端页面

### 响应式兼容 pc 移动端

三星电子官网 通过判断屏幕宽度来改变样式, 以适应不同的终端
制作麻烦, 需要花很大的精力去调节兼容性的问题, 因为要不断的调整屏幕的宽度

### 移动端浏览器

移动端浏览器基本以 webkit 内核为主, 因此我们就考虑 webkit 兼容性问题
我们可以放心使用 h5 标签和 css3 样式 同时我们浏览器的私有前缀我们只需要考虑添加 webkit 即可

### 重置样式表

necolas.github.io/normalize.css

### 移动端常见的布局

> 单独制作移动端页面

流式布局(百分比布局) 京东
flex 弹性布局(强烈推荐)
less+rem+媒体查询 苏宁
混合布局

> 响应式页面兼容移动端

媒体查询
BootStrap

### 流式布局(百分比布局)

流式布局就是百分比布局 也称非固定像素布局
通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩, 不受固定像素的限制, 内容向两侧填充
流式布局方式是移动 web 开发使用的比较常见的布局方式

流式布局主要指的是宽度

为了避免流式布局带来的问题(不能无限拉伸:内容的空白区域会增多, 不能无限缩小:内容会掉下来)
所以为了保护我们的盒子在合理的范围 会使用最大值 和 最小值

### max-width 最大宽度 min-width 最小宽度 用来保护我们的内容

我们设置这个盒子最大 不能超过多大, 最小不能 不能超过多小
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

我们可以给 body 一个 width100%, 因为内部所有的元素都是 body 的孩子
同时我们要保证内容的显示 给 body 一个最大和最小的 width
<!--
    body {
        width:100%;
        min-width:320px;
        max-width:640px;
    }
 -->

> 导航栏部分

按照 100%的宽度正常划分

### 移动端在做按钮点击跳转的时候一般都是用 js 来做

因为有的 x 太小 或者文字区域太小 我们一般用 js 来获取 div 对象来绑定相关的事件

### 移动端 两边固定 中间自适应

> 要点:

两边的宽度是固定的 通过定位来定上去
中间的宽度不能给, 左右里面 margin 来空出来
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

在 firework 里面把精灵图等比例缩放为原来的一半
之后根据大小测量坐标
注意代码里面 background-size 也要写:精灵图原来宽度的一半

> PS 里的做法

先把图片在属性面板里缩放一半
然后用矩形工具画出范围, 在属性面板里查看 x y 的坐标
在编辑器里 background-size 的值调节成原来的一半, 注意用 px
<!--
    background:url(../images/jd-sprites.png) no-repeat -81px 0;
    background-size:200px;
 -->

### Flex 弹性布局

> 父盒子指定完 flex 后 内部元素就是一行显示

优点:
操作方便, 布局极为简单, 移动端应用很广泛
PC 端浏览器支持情况较差
IE11 或更低版本 不支持或仅部分支持

建议:
如果是 PC 端页面布局, 我们还是传统布局
如果是移动端或者不考虑兼容性问题的 PC 端页面布局 我们还是使用 flex 弹性布局

### 布局原理

通过给父盒子添加 flex 属性, 来控制子盒子的位置和排列方式

当父盒子的宽度容纳不下更多的子元素时, 默认不会换行 而是压缩项目的宽度来容纳

用来为盒状模型提供最大的灵活性, 任何一个容器都可以指定为 flex 布局
当我们为父盒子设为 flex 布局以后, 子元素的 float clear vertical-align 属性将失效
伸缩布局 = 弹性布局 = 伸缩盒布局 = 弹性盒布局 = flex 布局

### flex 容器属性

> flex-direction 设置主轴的方向

在 flex 布局中 是分为主轴和侧轴两个方向, 同样的叫法:行和列 x 轴和 y 轴
默认主轴方向就是 x 轴的方向, 水平向右
默认侧轴方向就是 y 轴的方向, 垂直向下
  - row 从左到右 默认 1 - 2 - 3
  - row-reverse 从右到左 3 - 2 - 1
  - column 从上到下 1 - 2 - 3
  - column-reverse 从下到上 3 - 2 - 1

> flex-wrap 设置子元素是否换行

当父盒子的宽度容纳不下更多的子元素时, 默认不会换行 而是压缩项目的宽度来容纳
flex 布局中 默认的子元素是不换行的 如果装不开 会缩小子元素的宽度, 放到父元素里面
  - nowrap 默认值
  - wrap 换行

> justify-content 设置主轴上的子元素的排列方式

注意: 使用这个属性之前一定要确定好主轴是哪个
  - flex-start 从头部开始 如果是主轴是 x 轴 则从左到右
  - flex-end 从尾部开始排列
  - center 在主轴居中对齐
  - space-around 平分剩余空间
  - space-between 先两边贴边, 再平分剩余空间(重要)

> align-content 设置侧轴上的子元素的排列方式(多行) 必须有换行哈

设置子项在侧轴上的排列方式 并且只能用于子项出现 换行的情况(多行), 在单行下是没有效果的
  - flex-start 从头部开始 如果是主轴是 x 轴 则从左到右
  - flex-end 从尾部开始排列
  - center 在主轴居中对齐
  - space-around 平分剩余空间
  - space-between 先两边贴边, 再平分剩余空间(重要)
  - stretch 拉伸(默认值)

> align-items 设置侧轴上的子元素的排列方式(单行)

该属性是控制项目在侧轴(默认是 Y 轴)上的排列方式, 在子项为单项的时候使用
  - flex-start 从上到下
  - flex-end 从下到上
  - center 挤在一起居中(垂直居中)
  - stretch 拉伸(默认值)

> flex-flow 复合属性 相当于同时设置了 flex-direction 和 flex-wrap

flex-flow:row wrap;

### flex 布局 项目的属性

flex 子项占的分数
align-self 控制子项自己在侧轴的排列方式
order 属性定义子项的排列顺序(前后顺序)

> flex 属性

flex 属性定义子项目分配剩余空间, 用 flex 来表示占多少份数
首先要有剩余空间, 比如我们可以不给宽度 这样全部都是剩余空间
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

允许单个项目有与其他项目不一样的对齐方式, 可覆盖 align-items 属性, 默认值为 auto, 表示继承父元素的 align-items 属性, 如果没有父元素 则等同于 stretch

> order

数值越小 排列越靠前 默认是 0 可以是负值

### 适配

文字也会随着屏拖动 发生改变
前面的流式布局和 flex 布局主要针对于宽度布局, 那高度又如何设置
怎么样让屏幕发生变化的时候元素高度和宽度等比例缩放呢?

### rem

rem(root em)是一个相对单位, 类似于 em em 是父元素的字体大小
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

不同的是 rem 的基准是相对于 html 元素的字体大小
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

rem 优点就是可以通过修改 html 里面的文字大小来改变页面中元素的大小 可以整体控制

> 原理:

<!--
    rem有自己的优点, 父元素的文字大小可能不一样, 有的文字的父元素可能是16px, 有的可能是12px, 通过父元素控制子盒子很难控制, 但是整个页面只有一个html, 而rem只受html控制, 页面中每一个盒子的大小不一样

    那我们为什么不把每一个盒子大小的单位都改成rem 在不同的屏幕宽度下 只需要修改html的文字大小 而html里面的子盒子就会跟着一起变化 当屏幕大html文字就大一些相对的盒子的大小也会大一些 如果屏幕变小了我就让html文字小一些 盒子相对的也会小一些 因为都用的rem单位, 就达到了一种效果 通过rem来控制所有盒子的宽度和高度
-->

### 媒体查询的一些要点

按照从大到小的 或者 从小到大的思路
注意我们有最大值 max-width 和 min-width 都是包含等于的

> 练习

当屏幕小于 540px 背景颜色变为蓝色 x<=539
当屏幕大于等于 540px 并且小于等于 969px 的时候背景颜色为绿色(540 =< x <= 969)
当屏幕大于等于 970px 的时候, 背景颜色为红色(x>=970)

从小到大的顺序 推荐
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

rem 单位是跟着 html 来走的, 有了 rem 页面元素可以设置不同大小的尺寸
媒体查询可以根据不同设备宽度来修改样式
媒体查询 + rem 就可以实现不同设备的宽度, 实现页面元素大小的动态变化

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

当布局发生大的变化的时候 针对小屏的书写一套新的样式专门针对于小屏的 也就是说针对大屏一套 css 文件 小屏一套 css 文件
如果屏幕尺寸在某一个范围之内就用大屏的 css 文件
如果屏幕尺寸在某一个范围之内就用小屏的 css 文件

当样式比较繁多的时候, 我们可以针对不同的媒体使用不同 stylecss 样式, 原理就是直接在 link 中判断设备的尺寸, 然后引用不用的 css 文件

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

让一些不能等比自适应的元素, 达到当设备尺寸发生改变的时候, 等比例适配当前设备
使用媒体查询根据不同设备按比例设置 html 的字体大小, 然后页面元素使用 rem 做尺寸单位, 当 html 字体大小变化元素尺寸也会发生变化, 从而达到等比缩放的适配

> rem 实际开发适配方案

按照设计稿 与 设备宽度的比例, 动态计算并设置 html 根标签的 font0-size 大小(@media)
css 中 设计稿元素的宽 高 相对位置等取值, 按照同等比例换算为 rem 为单位的值

### rem 适配方案

> 1

less
媒体查询
rem

> 2

flexible.js
rem

> 总结: 两种方案现在都存在, 方案 2 更简单, 现阶段大家无需了解里面的 js 代码

### 适配方案一

> 设计稿中常见的尺寸宽度

ip4, 5 640px
ip6, 7, 8 750px
android 320px 360px 375px 384px 400px 414px 500px 720px
  大部分 4.7 ~ 5 寸的安卓设备宽度为 720px;

<!--
    一般情况下, 我么以一套或两套效果图适应大部分的屏幕, 放弃极端屏或对其优雅降级, 牺牲一些效果

    现在基本以750为准
-->

> 动态设置 html 标签 font-size 的大小

首先我们要选一套标准尺寸, 一般的设计稿是 750px
假设我们把整个屏幕划为 15 等份(划分标准不一, 可以是 20 份也可以是 10 等份)
每一份作为 html 字体大小, 这里就是 50px
<!--
    设计稿为750 划分为15份 每份就是50, 这个50就作为html字体的大小

    淘宝就是10等份, 苏宁就是15等份
 -->

那么在 320px 设备的时候, 字体大小为 320 / 15 就是 21.33px
  <!--
      当小屏幕也就是320px的设备时, 我们也要除以相同的 份数
   -->

  > ↑ 以上就是两种不同的屏幕下 html 的字体大小不一样

用我们页面元素的大小 除以 不同的 html 字体大小会发现他们比例还是相同的
比如我们以 750 为标准设计稿
一个 100 _ 100 像素的页面元素在 750 屏幕下, 就是 100 / 50 转为 rem 是 2rem _ 2rem 比例是 1:1
一个 100 \* 100 像素的页面元素在 320 屏幕下, html 字体大小为 21.33 则 2rem=42.66px, 此时宽和高都是 42.66 但是宽和高的比例还是 1:1

但是已经能实现不同屏幕下 页面元素盒子等比例缩放的效果

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

最后的公式:
  页面元素的 rem 值 = 页面元素值(px) / (屏幕宽度 / 划分的份数)

  - 屏幕宽度 / 划分的份数 就是 html font-size 的大小

  - 或者

  页面元素的 rem 值 = 页面元素值(px) / html font-size 字体大小



### 苏宁案例
> 技术选型:
单独制作移动端页面方案
技术: 布局采取rem适配布局(less + rem + 媒体查询)
设计图: 本设计图采用750px设计尺寸

> 设置公共common.less文件 装最常见的屏幕尺寸(其它页面也要用)
1 新建common.less 设置好最常见的屏幕尺寸, 利用媒体查询设置不同的html字体大小, 因为除了首页其它页面也需要

2 我们关心的尺寸有320px 360px 375px 384px 400px 414px 424px 480px 540px 720px 750px
<!-- 
    @media only screen and (min-width:720px) {
        html {
            font-size:(720px / @num);
        }
    }

    ...
 -->

3 划分的份数我们定为15等分

4 我们pc端也可以打开我们苏宁移动端首页, 我们默认html字体大小为50px 注意这句话写到最上面
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
手机淘宝团队出的简洁高效移动端适配库
我们再也不需要在写不同屏幕的媒体查询 因为里面js做了处理
它的原理是把当前设备划分为10等份, 但是在不同设备下, 比例还是一致的
我们要做的, 就是确定好我们当前设备的html文字大小就可以了

比如:
当前设计稿是750px 那么我们只需要把html文字大小设置为75px(750 / 10)就可以
里面页面元素rem值: 页面元素的px值 / 75, 剩余的让flexible.js去算

> 使用flexible.js 要下载cssrem插件
使用cssrem插件需要配置基准值
cssrem插件 --- 扩展设置 --- Root Font Size 修改这个值



### 轮播图 swiper 插件的使用
https://www.swiper.com.cn

下载需要的css和js文件
官网找到类似的案例, 复制html结构, css样式, js语法
根据需求定制修改模块
> 先下载 然后把css js文件放入项目中

> 先在官网上找到合适效果, 运用到页面中(先搭建结构) 再修改

> 在新窗口打开 --- 查看网页源代码

> 在index.html中引入 css 和 js 文件

> 复制html结构 -- 将网站上的源代码的结构复制到index.html中
可以创建一个盒子装这些代码
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
当页面中有多个轮播图的话 我们可以把包裹在自定义函数中
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
定制我们的样式 需要查看API文档

pagination 分页器(就是小圆点 不需要就删掉)

箭头
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
css部分 写在自己创建的盒子样式内部
js部分 用自调用函数包裹起来

页面中有多个轮播图时, 在html标签中自定义自己的类名 然后在js中 用自己的类名建立对象
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
xl63864807@163.com
slnn2080
xl5467426
微信授权

gitee.com

上传到码云并发布部署静态网站
准备工作:
下载git软件, 需要码云注册账号

git可以把我们的本地网站提交上传到远程仓库(码云)里面 类似以前的ftp

码云就是远程仓库, 类似服务器
1 码云创建新的仓库, heimamm
2 利用git提交 把本地网站提交到码云新建的仓库里面
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
在当前仓库中 点击'服务', 菜单

选择gitee pages





### flexible.js 源码分析
flexible主要是设置rem布局, rem布局是跟html字体大小有关系的
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












