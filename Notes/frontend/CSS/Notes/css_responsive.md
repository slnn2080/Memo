## 适配操作的总结:
非常的简单  
首先我们根据设计稿iphone6(375px) 还原设计

1. 我们将html fs修改为100px
2. 通过 375px 和 html fs的100px 我们可以计算出各个元素的rem单位
3. 通过js, 依照工具我们完成各个设备的适配

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scss</title>
  <style>
    html, body {
      height: 100%;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      
      background-color: #f6ece1;

      /* 1. 设置 html fs 为 100px */
      font-size: 100px;
    }
    
    /* 2. 根据 设计稿 375px 和 固定设置的 fs100px 得出各个元素的 rem值 */
    .one {
      width: 3rem;
      height: 1rem;
      margin: 0.5rem auto;

      background-color: #edb85f;
    }

    .two {
      width: 2rem;
      height: 0.5rem;

      margin: 0 auto;
      background-color: #f1c8c1;
    }

    .three {
      width: 3.75rem;
      height: 0.5rem;

      margin: 0.5rem auto 0rem;
      background-color: #e6807d;
    }

  </style>
</head>
<body>
  <div class="one"></div>
  <div class="two"></div>
  <div class="three"></div>

  <script>
    /*
      设计师出图         新设备

            100      ?
            ---  x  ---
            375     414
    */
   
    // 3. 切换设备时 动态设置 html fs 的值
    function adapter() {
      // 3.1. 获取 布局视口 的宽度 = 设备的设备独立像素
      const dpi = document.documentElement.clientWidth
      // 3.2. 根据上述公式拿到 新设备的html fs
       const htmlFs = dpi * 100 / 375
       document.documentElement.style.fontSize = htmlFs + "px"
    }

    // 先调用下 让其在页面加载的时候进行适配
    adapter()
    // 当屏幕尺寸变化的时候我们实时进行适配
    window.addEventListener("resize", adapter)
   

  </script>
</body>
</html>
```

<br><br>

# 响应式

# 响应式前言:
响应式布局要先创建一个容器, 然后不同尺寸给这个容器一个固定的宽度

PC 端一套页面, 移动端一套页面, 平板一套页面, 现在响应式一套可以解决, 但是响应式虽然好, 但也不是万能的, 它只能画一些简单的三端布局  
像淘宝, 京东, app 里面布局方案跟 PC 端有很大差异的, 这时候必须分开设计页面

<br><br>

# 媒体查询
可以根据不同的屏幕尺寸 设置不同的样式 CSS3 **媒体查询是响应式方案的核心**

<br>

### 扩展: link标签的 media属性:
可以在引入样式表的时候 指定该样式表何时生效
```html
<!-- media属性, 当前样式表只有在打印的时候才有作用 -->
<link rel="stylesheet" href="index.css" media='print'>
```

<br>

**media属性的可选值:**  
- print     打印设备
- screen    彩色屏幕设备

<br>


## CSS3媒体查询

### 格式:
```css
/* 单一媒体查询 */
@media [only] 媒体类型 [逻辑运算符] (媒体特征) {
  /* 规则部分: 选择器 + 声明快 */
}


/* 多个媒体查询 */
@media 媒体类型 (媒体特征),
       媒体类型 (媒体特征) {
  /* 规则部分: 选择器 + 声明快 */
}
```

<br>

**示例:**  
只有在屏幕的时候才能用到里面的样式, **一般媒体查询写在下面, 用来覆盖**  
```css
@media screen {
  /* 规则 */
}
```

<br>

**scss / less 中媒体查询的写法:**
```css
@media only screen {
  @media (min-width:768px) {
    ...
  }
}
```

<br>

### 媒体类型 (指的就是设备类型)
- screen  带屏幕的设备
- all: 所有设备
- print: 打印设备
- speech: 屏幕阅读器
- projection: 手持设备
- tv: 电视
- braille: 盲文触觉设备
- embossed: 盲文打印机
- speech: "听觉" 类似的媒体设备
- tty: 不适用像素的设备

<br>

### 逻辑运算符:
用于连接 媒体类型 和 媒体特征

组合多个媒体特征条件, 以确定是否应用相应的样式。通过使用 and, 可以将多个媒体特征组合在一起, 形成更复杂的媒体查询条件

<br>

**常见的逻辑运算符有:**
- and: 并且的意思, 可以连接多个媒体特征 如
```css
@media screen and (min-width: 768px) and (max-width: 1024px) { ... }
```

- ,: 或者的意思
- not: 取反的意思
```css
/* 只要不是横屏的彩色屏幕 就可以应用 */
@media not screen and (orientation:portrait) { ... }
```

<br>

### only关键字:
用于指定媒体查询的时候 仅适用于当前的媒体类型 如果不支持该媒体类型的时候 媒体查询中的规则将被忽略

使用 only 关键词可以防止旧版的浏览器错误地应用媒体查询, 因为这些浏览器可能不理解媒体查询的语法。通过使用 only, 你可以确保媒体查询仅在支持的浏览器中生效, 而在不支持的浏览器中将其忽略。

```css
@media only screen and (max-width: 768px) {
  /* CSS 规则 */
}
```

<br>

### 媒体特征:
**width:**   
浏览器窗口的尺寸(可添加 min- max- 前缀)
```css
/* >=800px 才有用 */
min-width: 800px  

/* <=800px 才有用 */
max-width:800px
```

<br>

**device-width:**   
设备独立宽度(设备分辨率)(可添加 min- max- 前缀)

device-width为设备宽度 也就是分辨率, 当我的设备的分辨率为414px时, 才会起作用, 比如我的电脑的分辨率是1366, device-width:1366px

```css
@media screen and (device-width:414px) { ... }

/* 
PC端: 查看分辨率
移动端: 查看设备的参数320 X 480
*/
```
    
<br>

**device-pixel-ratio:**  
设备的像素比(必须加-webkit-前缀)(可添加 min- max- 前缀)

- PC 端: 1
- 移动端: 在网上查看 DPR 参数
```css
/* 只有当设备的像素比为 1 时 才会有用 */
@media screen and (-webkit-device-pixel-ratio: 1) { ... }
```

<br>

**orientation:**   
代表横竖屏

- portrait 竖屏
- landscape 横屏
```css
@media screen and (orientation:portrait) { ... }
/* 宽度 比 高度小就是竖屏呗 */
```

<br>

### 尺寸区间:
- 超小屏幕(手机) <768px
- 小屏设备(平板) >=768px ~ < 992px
- 中等屏幕(电脑) >=992px ~ < 1200px
- 宽屏设备(超电) >=1200px

<br><br>

# 响应式操作步骤
### 创建 响应式布局容器(宽度为固定的):
响应式需要一个父级作为布局容器, 然后根据布局容器的宽度变化 修改里面元素的排列方式

**在响应式里面没办法控制每一个元素的宽度变化**, 我们通过布局容器来改变子元素的变化, 不同的档位设置不同的宽度

<br>

### 响应式尺寸的划分:
- 超小屏幕 (手机, <768px): 设置宽度为 100%

- 小屏幕 (平板, >=768px): 设置宽度为 750px

- 中等屏幕 (桌面显示器, >=992px): 设置宽度为 970px

- 大屏幕 (大桌面显示器, >=1200px): 设置宽度为 1170px

```css
/* 第一档超小屏幕 */
@media only screen and (max-width:767px) {
  .container {
      width:100%;
  }
}

/* 第二档小屏幕 我们只需要关注大于768px就好, 因为后面的样式会覆盖前面的 */
@media only screen and (min-width:768px) {
  .container {
      width:750px;
  }
}

/* 第三档中等屏幕 我们只需要关注>=992px就好 */
@media only screen and (min-width:992px) {
  .container {
      width:970px;
  }
}

/* 第四档 */
@media only screen and (min-width:1200px) {
  .container {
      width:1170px;
  }
}

@media only screen and (max-width:767px) {

}
@media only screen and (min-width:768px) {

}
@media only screen and (min-width:992px) {

}
@media only screen and (min-width:1200px) {

}
```

<br><br>

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

## pc端视口
pc端视口的默认宽度和浏览器窗口宽度一致 在css标准文档中 视口也被称为 **初始包含块**

它是所有css百分比宽度推算的根源 在pc端可以通过上面的方式获取宽度 pc端没有那么多的事儿 就一个视口的概念

<br><br>

## 移动端视口
移动端的概念有点多有, 两个视口 一个标准
- 布局视口 (980px)
- 视觉视口 (和屏幕一样宽)
- 理想视口 (标准)

<br><br>

## 布局视口 (容器)
用于解决 **早期的页面** 在手机上显示的问题 早期的时候我们这样做

pc端网页宽度一般都为 960px ~ 1024px 这个范围, 就算超出了该范围 960px ~ 1024px 这个区域也依然是版心的位置

浏览器厂商针对移动端设备设计了一个容器 先用这个容器去承装pc端的网页 这个容器的宽度一般是 **980px**

不同的设备可能有所差异 但相差并不大 随后将这个容器等比例压缩到与手机等宽

<br>

### 问题:
这样就可以保证没有滚动条 且能完整的呈现页面 但是这样做依然有问题:  
**网页内容被压缩的太小 严重影响用户体验**

<br>

### 移动端获取布局视口方式:
代码上和pc端的是一样的, 但是在不同的场景下运行 获取的目标不一样
- pc获取的是 **初始包含块**
- sp获取的是 **布局视口的宽度** (一般都是固定的 980px)

```js
document.documentElement.clientWidth
/*
sp端想要输出 布局视口的话 要注释掉下面的 meta标签
<meta name="viewport" content="width=device-width, initial-scale=1.0">

sp端的时候输出 980
*/

document.documentElement.clientWidth
// pc端的时候输出 852
```

<br>

**注意:**  
布局视口经过压缩后 横向的宽度用css像素表达就不再是375px了 而是980px 因为布局视口是被压缩 而不是截取

<br>

### 扩展:
所以我们没有写``<meta name="viewport">``的时候 网页上的字 元素太小 是因为布局视口压缩进手机宽度里面 等比压缩后的后果

<br>

### 思考:
以iphone6为例:
```s
物理像素: 750px

# 这个就是 F12中手机端显示的尺寸
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
例如: 一般手机会将980个css像素放入视觉视口中 而ipad pro会将1024个css像素放入视觉视口中

<br>

### 移动端获取视觉视口方式:
```js
// F12中手机端显示的尺寸 比如 iphone6plus 414
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
没写meta标签的情况下 我们的css像素是用布局视口承接的 所以是980px  

<br><br>

## 理想视口(标准)
**与屏幕(设备独立像素)等宽的布局视口** 称之为理想视口  
这里是拿设备独立像素来衡量的(怪不得设计师会参考设备独立像素出图)

所以也可以说理想视口是一种标准: 让布局视口宽度与屏幕等宽(设备独立像素), 靠 meta 标签实现

<br>

### 理想视口的特点
1. 布局视口 和 屏幕等宽 (设备独立像素) 以iphone6为例 符合理想视口的标准
```
设备独立像素:  375px
布局视口端口:  375px
```

2. 用户不需要缩放, 滚动就能看到网站的全部内容
3. 要为移动端设备单独设计一个移动网站

<br>

### 设置理想视口的具体方式:
meta标签的作用就是修改布局视口, 这样布局视口永远和屏幕等宽
```html
<!-- 
  device-width就是获取的设备独立像素 
  将设备独立像素赋值给布局视口 就相当于开启了理想视口
-->
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
```
物理像素: 750px
设备独立像素: 375px
css像素: 980px
```

2. 优点: 元素在不同设备上 呈现效果几乎一样 因为都是通过布局容器等比缩放 例如200宽的盒子 200 / 980

<br>

**写 meta 标签(符合理想视口标准)**
1. 描述屏幕
```
物理像素: 750px
设备独立像素: 375px
css像素: 375px
```

2. 优点:  
页面清晰展现 内容不再小到难以观察 用户体验较好

3. 缺点:  
同一个元素 在不同屏幕设备上 呈现效果不一样 例如 375宽的盒子 375/375 和 375/414 不是等比显示

<br>

### 适配的原因
我们使用的 meta标签解决了 理想视口的问题 但是同一个元素在不同屏幕设备上 呈现效果不一样 例如 375宽的盒子 375/375 和 375/414 不是等比显示

**所以要做适配 让程序员写的代码在任何设备上都能全屏展示**  

理论上可以用100% 处理所有的布局 但是算起来太麻烦 比如90.6666%

<br>

只要是移动端的项目 一定会开启理想视口 一旦开启 980的布局视口 就被干掉了 开启理想视口之后 手机有多宽 布局视口就有多宽广 

- 元素显示不成比例 --> 适配
- pc页面无法承接 --> 算了吧 不接了 直接写一个移动端页面

<br>

### meta标签关于 关于content中可以追加哪些参数
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- initial-scale: 页面初始化时显示的比例
  - 一般只写initial-scale=1.0也可以实现完美视口 但为了良好的兼容性 一般会写width=device-width, initial-scale=1.0

- maximum-scale: 设置允许用户最大缩放比例 苹果浏览器不认识该属性
  - 可选值: 1

- minimum-scale: 设置允许用户最小缩放比例
  - 可选值: 1

- user-scalable: 是否允许用户通过手指缩放页面 苹果浏览器不认识该属性
  - 可选值: no

- viewport-fit: **设置为cover可以解决刘海屏留白的问题**

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
横向的时候 我们参考设计稿 算出 横向的百分比是可以的

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

<br><br>

# viewport适配
拿到设计稿之后 **设置布局视口宽度为设计稿宽度**
```html
<meta name="viewport" content="width=375;">
```

这样所有的设备的布局视口都是375 那我们直接按照设计稿给宽高进行布局即可

<br>

### 优点:
不用复杂的计算 直接使用图稿上标注的px值

<br>

### 缺点:
不能使用完整的 meta标签 会导致在某些安卓手机上有兼容性的问题  
**不希望适配的 东西 例如边框 也强制参与了适配**

<br>

比如我们设计稿里面写了

- 宽: 345px
- 高: 150px
- padding: 15px

这代表了 比例关系 也就是说我们要在别的设备上也要维持这种比例关系

那假如 设计稿上的盒子有1px边框 那么 1px 也要做比例关系么？

边框是否参与适配(比例)是不是要问设计师 但是 viewport 这种方式 使边框强制的使用比例了

<br><br>

# rem适配
em 和 rem 都是css中的长度单位 而且两个都是相对长度单位
1. em 相对的是 父级元素的字体大小
2. rem 相对的是 根元素的字体大小

<br><br>

## rem适配的原理:
编写样式时统一使用 rem单位 **在不同设备上动态调整字体大小**

<br>

### (淘宝 百度 -> 设置 html fs: 100px) 
设计师以iphone6作为标准机型375px, 设计稿的宽度为345

<br>

**设计师根据标准机型(iphone6)出图:**
```
------ 375 ------

   --- 345 ---
```

<br>

**在 iphone6plus 中**  
那设计稿345的宽度在 414中应该是多少?
```
------ 414 ------

    --- ? ---
```

<br>

**计算: 怎么求 ? 的值**
```
375     414
---  =  ---   
345      ?
```

414 * 345 / 375 = ?  (380.88) 

上面告诉我们 求一个数值为多少的时候 可以通过上面的方式求得

<br><br>

## 将 px 转为 rem
我们将 元素的 px 都换成 rem 作为单位 

我们也知道 rem 是相对于 根字体 的结果 那我们就可以这样

<br>

### 1. 修改根字号: html的fs修改为100px
375px 的设计稿 我们先修改 html 的 font-size 为 100px 这样我们就可以利用 rem 来设置元素的单位

这样我们修改元素的 px -> rem 的时候就很好算 比如:
- 50px -> 0.5rem
- 345px = 3.45rem

<br>

### 2. 修改另一台设备的fs
因为我们写的是rem都是相对单位 那在 另一台设备上的时候(414px) 我们是不是修改 414设备的 font-size 的值为一个合适的值就可以了 

因为 页面元素的大小都是 rem 也就是比例关系已经确定了 **那只需要修改 "根源" 就可以了**

<br><br>

## 公式在此: 计算根字号

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

### 公式:
**<font color="#C2185B">新设备的独立像素值 * 100 / 设计稿的宽度 = 新设备的 html font-size</font>**

设计稿的宽度是设计师给我们的 是我们原型

这里有三个值是固定的
1. 新设备的独立像素
2. html fs 100px
3. 设计稿的宽度

<br>

**要点:**  
我们出iphone6的图的时候 要将 html font-size 设置为100px 我们再写盒子大小的使用 单位要是rem

<br><br>

## 动态的设置 html font-size
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
    // 获取手机横向的设备独立像素, 因为 布局视口 = 设备独立像素
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

<br>

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

<br>

iphone3下 设备独立像素为 320 * 640
因为我们开启了 meta 标签 所以 320的一半是160px 640的10%是64px

**不过 vw 和 vh 有很严重的兼容性问题**

<br><br>

# 问题部分:

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

<br><br>

# 备课: Scss课程
当一个漂亮的UI小姐姐给了你一份 750px 移动端的设计稿 我们要拿着设计稿进行还原是吧 你说 我们能不能就拿着设计稿中标记的元素尺寸 直接写移动端的布局？

<br>

**试试呗**   
比如 现在设计稿上写的 有个部分呢 要两列布局 每列320px 有人说简单呀 直接写呗 那我们就先写一列

然后我们查看下在移动设备下的显示效果 我们会发现 我们只写了 320px的一个盒子 我们会发现  
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

你想啊 我们就在编辑器上简单的写了一个 div高宽100 人家屏幕就给你显示了一个图形 这中间肯定有什么转化关系吧

简单的说咱们写的css代码 会被显示器的显示芯片接收了 显示芯片里面呢 定义了设备独立像素 **设备独立像素 和 css像素是1:1的关系** 
```s
# 不考虑缩放的情况下
1px = 1设备独立像素
```

接下来 设备独立像素 需要告诉 物理像素怎么呈现效果

**啥是物理像素?**  
物理像素你就可以理解为屏幕显示器的分辨率 咱买电脑 人家会说 这个屏幕啊 是 1920 x 1080 的 那就是说 横向有1920个像素点  
你就可以理解为 横向上有1920个会发各种颜色的小灯泡 这些小灯泡是真实存在的 这个就是物理像素

<br>

设备独立像素 会根据 dpr 来告诉物理像素 咱们用多少个小灯泡显示图形  

<br>

**啥是dpr?**  
2010年那年乔布斯发布了视网膜屏 将屏幕分为了两种 一种呢是普通屏幕 一种呢是视网膜屏

说啊 在 普通屏幕 和 视网膜屏 的屏幕大小一样的情况下 视网膜屏可以将更多的小灯泡压缩到屏幕里面去
也就是说 同样的 5寸大小的屏幕 普通屏的分辨率是320 视网膜屏的分辨率就是640 你看同样的尺寸 我压进去了更多的小灯泡 这样显示效果会更加的细腻是么

**但是你细品 sp.ai**

<br>

上面我们看了 我们的元素在各个设备上显示的效果都不一样 这时候我们就要知道 我们不能再写死px了 怎么办呢？ 

我们可以按比例, 什么意思呢 比如啊 一个元素 假如我们给它的宽度设置为50% 屏幕的一半 那么这个元素是不是在各个设备下 宽度都是一样的对吧 都是屏幕的一半吗

那是不是说 当我们拿到ui小姐姐的设计稿的时候 我们只要算出各个元素和设计稿之间的比例关系 那么我们用比例去设置元素的大小 就能确保在各个设备上显示的效果都一样了对么

比如 一行两个元素 左边的占70% 右边的占30% 以这样的比例关系去布局 就没有问题了对么

<br><br>

# 扩展: 适配的相关知识
所有非视网膜屏幕的iphone在垂直的时候, 宽度为320物理像素。

当你使用 ``<meta name="viewport" content="width=device-width">`` 的时候, 会设置*视窗*布局宽度(不同于视觉区域宽度, 不放大显示情况下, 两者大小一致, 见下图)为320px, 于是, 页面很自然地覆盖在屏幕上

这样, 非视网膜屏幕的iphone上, 屏幕物理像素320像素, 独立像素也是320像素, 因此, window.devicePixelRatio等于1.

而对于视网膜屏幕的iphone, 如iphone4s, 纵向显示的时候, 屏幕物理像素640像素。同样, 当用户设置 ``<meta name="viewport" content="width=device-width">`` 的时候, 其视区宽度并不是640像素, 而是320像素, 这是为了有更好的阅读体验 – 更合适的文字大小。

这样, 在视网膜屏幕的iphone上, 屏幕物理像素640像素, 独立像素还是320像素, 因此, window.devicePixelRatio等于2.

<br>

### 设备 物理像素:
是一个物理概念, 比如设备的分辨率, Phone 5 的分辨率 640 x 1136px。一个个发光的2极管

<br>

### 设备独立像素 device-independent pixels (dips):
是一个抽象像素, 用于向CSS中的宽度、高度、媒体查询 和 meta 的 viewport 中的 device-width 提供信息。

通过观察retina和非retina设备之间的区别, 可以最好地解释它们。

比如我们可以自己调节 屏幕的分辨率 1920px 的我们可以调节成 1440px
比如 原先用一个1个物理像素 表达 一个像素 现在我们用2个物理像素 表达 一个像素 这时候分辨率就缩小了一半

逻辑像素就是用多个发光的二极管显示一个像素的内容

<br>

### CSS像素:
指的是CSS中使用的逻辑像素。在CSS规范中, 长度单位可以分为两类, 绝对(absolute)单位以及相对(relative)单位。px是一个相对单位, 相对的是设备物理像素。

比如iPhone 5 使用的是Retina屏幕, 使用 2px x 2px 的设备物理像素  代表 1px x 1px 的 CSS像素, 
  
所以设备物理像素为640 x 1136px, 而CSS逻辑像素数为320 x 568px。

也就是说 我们可以从两点上来考虑

1. 如果 dpr 是 2 的话 那么我们写的css像素当中的 1px 在retina屏下 代表 2px
2. 同理 我们设计稿 如果是640px 那么css像素我们就是320px

<br>

### dpr就是设置像素比
获得设备像素比后, 便可得知 **设备物理像素 与 CSS像素 之间的比例**
- 当这个比率为1:1时, 使用1个设备物理像素显示1个CSS像素。
- 当这个比率为2:1时, 使用4个设备物理像素显示1个CSS像素, 
- 当这个比率为3:1时, 使用9(3*3)个设备物理像素显示1个CSS像素。

<br>

### 关于设计师和前端工程师之间如何协同: 
一般由设计师按照设备像素(device pixel)为单位制作设计稿  
前端工程师, 参照相关的设备像素比(device pixel ratio), 进行换算以及编码。

<br>

### 思考:
一般普通图在的1920*1080, 是很正常的, 但是如果放在的2k或者4K屏幕里面, 背景图就是模糊掉, 为什么呢？

在不同的屏幕上(普通屏幕 vs retina屏幕), css像素所呈现的大小(物理尺寸)是一致的, 不同的是1个css像素所对应的物理像素个数是不一致的。

- 普通屏幕: 1个css像素 对应 1个物理像素(1:1)
- retina屏幕: 1个css像素对应 4个物理像素(1:4)

<br><br>

## 技巧: 当大于 dpr > 2 的时候 使文字更加的清晰

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

<br><br>

## 技巧: 图片模糊问题
我们平时使用的图片大多数都属于位图(png、jpg...), 位图由一个个像素点构成的, 每个像素都具有特定的位置和颜色值

理论上, 位图的每个像素对应在屏幕上使用一个物理像素来渲染, 才能达到最佳的显示效果。

而在 dpr > 1的屏幕上, 位图的一个像素可能由多个物理像素来渲染, 然而这些物理像素点并不能被准确的分配上对应位图像素的颜色, 只能取近似值, 所以相同的图片在dpr > 1的屏幕上就会模糊

为了保证图片质量, 我们应该尽可能让一个屏幕像素来渲染一个图片像素, 所以, 针对不同DPR的屏幕, 我们需要展示不同分辨率的图片。

在dpr=2的屏幕上展示两倍图(@2x), 在dpr=3的屏幕上展示三倍图(@3x)。

<br><br>

## Pink适配知识点总结

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

<br>

### 目录规范
- 项目文件夹
  - 样式文件夹:css
  - 业务类图片文件夹:images
  - 样式类图片文件夹:icons
  - 字体类文件夹:fonts

<br>

### 慕客 / 蓝湖
很方便的测量工具 没事的时候自己使用一下

<br>

### 适配方案
- flex布局
- 百分比布局
- rem布局
- vw / vh布局
- 响应式布局

<br>

### 初始化文件
引入 normalize.css less中初始化body样式

```css
body {
  min-width:320px;
  max-width:750px;
  margin:0 auto;
}
```

约束范围 (使用flexible.js时要约束一下范围)
```css
/* 约束当屏幕大于750px的时候, html字体大小就不要变化了 效果图是750px但是放在实际屏幕里是375像素 flexible.js是分成10份所以是37.5 */
@media screen and (min-width:750px) {
  html {
    font-size:37.5px !importtant;
  }
}
```

<br>

### 注意:  
移动端最小约定为 320px min-width:320px

<br>

### 移动端基础
移动端对浏览器的兼容性的支持会比较好 国内的移动端浏览器暂无自己的内核 都是那 webkit 修改过来的内核 所以 兼容移动端主流浏览器 处理 webkit 内核浏览器即可
```s
https://material.io/devices
```

作为前端开发 不建议去纠结 dp dpi pt ppi 等单位

<br>

### 视口
视口就是一个屏幕区域, 视口分为布局视口 视觉视口 理想视口, 我们只用理想视口

<br>

### 布局视口
一般移动设备的浏览器都默认设置了一个布局视口 用于解决早期的 PC 端页面在手机上现实的问题
ios android 基本都将这个视口分辨率设置为 980px 所以 pc 上的网页大多都能在手机上呈现, 只不过元素看上去很小 一般默认可以通过手动缩放网页 以前设计网页时 一般都设计为980px 但是这样直接拿到手机上看的话 里面的元素特别的小

<br>

### 视觉视口
用户正在看到的网站的区域. 注意是网站的区域  
我们可以通过缩放去操作视觉视口, 但不会影响布局视口 布局视口仍然保持原来的宽度

<br>

### 理想视口
为了使网站在移动端有最理想的浏览和阅读宽度而设定 理想视口对设备来讲是最理想的视口尺寸, 需要手动填写 meta 视口标签通知浏览器操作
meta 视口标签的主要目的: 布局视口的宽度应该与理想视口的宽度一致, 简单的理解就是设备有多宽, 我们布局的视口就多宽
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

<br>

### meta 视口标签
要点: 设备有多宽 视口就有多宽 device-width
```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

- width: 宽度设置的是viewport宽度, 可以设置device-width特殊值(设备宽度)
- initial-scale: 初始缩放比, 大于0的数字
- maximum-scale: 最大缩放比, 大于0的数字
- minimum-scale: 最小缩放比, 大于0的数字
- user-scalable: 用户是否可以缩放 yes或no 1或0

<br>

### CSS 像素 物理像素
物理像素点指的是屏幕显示的最小颗粒, 是物理真实存在的, 这是厂商在出厂时就设置好了, 比如苹果 6 7 8 是 750 * 1334  
ip8 750像素的宽, 代表在ip8下 一行有750个像素点

我们开发时候的 1px 不是一定等于 1 个物理像素的, pc 端页面, 1px 等于 1 个物理像素的, 但是移动端不同　并不是一一对应的关系  
比如 ip8 就是1:2 1css像素 = 2个物理像素  这种情况就叫做物理像素比

一个 px 的能显示的物理像素点的个数, 称为物理像素比或屏幕像素比

<br>

### 物理像素 & 物理像素比
PC 端 和 早前的手机屏幕 / 普通手机屏幕: 1css 像素 = 1 物理像素  
早期的手机屏幕并不是很清楚, 知道出现 Retina(视网膜屏幕)是一种显示技术, 可以将更多的物理像素点压缩在一块屏幕里 从而达到更高的分辨率, 并提高屏幕显示的细腻程度

<br>

### 2 倍图
对于一张 50*50 的图片在 ip8 手机 retina 屏中打开 按照刚才的物理像素比会放大倍数(2 倍), 这样会造成图片的模糊

在标准的 viewport 设置中, 使用倍图来提高图片质量 解决在高清设备中的模糊问题 通常使用二倍图 因为 ip678 的影响 但是现在还存在 3 4 倍图的情况 这个看实际开发公司需求
背景图片注意缩放(我们准备的是 2 倍图 在应用的时候再缩小 1 倍)
```css
  background-size:50px 50px
  /* 会继承父元素的宽度 注意 */
```

<br><br>

## 移动端开发方案

### 单独制作 移动端 页面(主流)
- 京东商城手机版
- 淘宝触屏版
- 苏宁易购手机版

<br>

### 响应式页面兼容移动端(其次)
三星手机官网

<br>

### 单独移动端页面
通常情况下, 网址域名前面加 m 可以打开移动端 通过判断设备, 如果是移动端打开的页面 则跳转到移动端页面 如果是 pc 端打开的页面则跳转到 pc 端页面

<br>

### 响应式兼容 pc 移动端
三星电子官网 通过判断屏幕宽度来改变样式, 以适应不同的终端  
制作麻烦, 需要花很大的精力去调节兼容性的问题, 因为要不断的调整屏幕的宽度

<br>

### 移动端浏览器
移动端浏览器基本以 webkit 内核为主, 因此我们就考虑 webkit 兼容性问题  
我们可以放心使用 h5 标签和 css3 样式 同时我们浏览器的私有前缀我们只需要考虑添加 webkit 即可

<br>

### 重置样式表
```s
necolas.github.io/normalize.css
```

<br><br>

## 移动端常见的布局

### 单独制作移动端页面
- 流式布局(百分比布局) 京东
- flex 弹性布局(强烈推荐)
- less+rem+媒体查询 苏宁
- 混合布局

<br>

### 响应式页面兼容移动端
- 媒体查询
- BootStrap

<br>

### 流式布局(百分比布局)
流式布局就是百分比布局 也称非固定像素布局  
通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩, 不受固定像素的限制, 内容向两侧填充  
流式布局方式是移动 web 开发使用的比较常见的布局方式  

流式布局主要指的是宽度

<br>

### 注意: 使用流式布局时要使用 max min 来约束大小
为了避免流式布局带来的问题(不能无限拉伸:内容的空白区域会增多, 不能无限缩小:内容会掉下来)
所以为了保护我们的盒子在合理的范围 会使用最大值 和 最小值

<br>

### max-width 最大宽度 min-width 最小宽度 用来保护我们的内容
我们设置这个盒子最大 不能超过多大, 最小不能 不能超过多小

**max-width: 980px**    
最大值不能超过980px 意思就是说盒子可以正常缩小, 但是拖动屏幕增大时最大也就显示980px, 再拖宽也没有用了 最小值不能超过600px 意思就是小于600px盒子就不能再缩了
```css
section {
  width:100%;
  max-width:980px;
  min-width:600px;

  background:black;
  height:100vh;
}
```

<br>

### 移动端的流程
我们可以给 body 一个 width: 100%, 因为内部所有的元素都是 body 的孩子
同时我们要保证内容的显示 给 body 一个最大和最小的 width
```css
body {
  width:100%;
  min-width:320px;
  max-width:640px;
}
```

<br>

### 导航栏部分
按照 100%的宽度正常划分

<br>

### 移动端在做按钮点击跳转的时候一般都是用 js 来做
因为有的 x 太小 或者文字区域太小 我们一般用 js 来获取 div 对象来绑定相关的事件

<br>

### 移动端 两边固定 中间自适应
两边的宽度是固定的 通过定位来定上去
中间的宽度不能给, 左右里面 margin 来空出来

```html
<div class="search-wrap">
  <div class="search-btn"></div>
  <div class="search"></div>
  <div class="search-login"></div>
</div>
```
```css
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

    /* 只给高不给宽要不然就撑开了 */
    .search {
        height:44px;
        margin: 0 50px;
        background:rgb(39, 236, 236);
    }
}
```

<br>

### 移动端二倍精灵图的做法
在 firework 里面把精灵图等比例缩放为原来的一半 之后根据大小测量坐标
注意代码里面 background-size 也要写:精灵图原来宽度的一半

<br>

### PS 里的做法
先把图片在属性面板里缩放一半 然后用矩形工具画出范围, 在属性面板里查看 x y 的坐标
在编辑器里 background-size 的值调节成原来的一半, 注意用 px
```css
background:url(../images/jd-sprites.png) no-repeat -81px 0;
background-size:200px;
```

<br>

## 扩展: 媒体查询 + rem 响应式
rem 单位是跟着 html 来走的, 有了 rem 页面元素可以设置不同大小的尺寸

媒体查询可以根据不同设备宽度来修改样式

媒体查询 + rem 就可以实现不同设备的宽度, 实现页面元素大小的动态变化


```css
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
```

<br><br>

## 技巧: 媒体查询引入资源
当布局发生大的变化的时候 针对小屏的书写一套新的样式专门针对于小屏的 也就是说针对大屏一套 css 文件 小屏一套 css 文件

- 如果屏幕尺寸在某一个范围之内就用大屏的 css 文件
- 如果屏幕尺寸在某一个范围之内就用小屏的 css 文件

当样式比较繁多的时候, 我们可以针对不同的媒体使用不同 stylecss 样式, 原理就是直接在 link 中判断设备的尺寸, 然后引用不用的 css 文件

<br>

### 在 link 标签中添加 media 属性
```html
<link rel="stylesheet" href="sytle320.css" media='screen and (min-width:320px)'>

<link rel="stylesheet" href="sytle640.css" media='screen and (min-width:640px)'>
```

<br><br>

## 扩展: rem 的适配方案
设计稿中常见的尺寸宽度

- ip4, 5: 640px
- ip6, 7, 8: 750px
- android: 320px 360px 375px 384px 400px 414px 500px 720px
- 大部分 4.7 ~ 5 寸的安卓设备宽度为 720px;

一般情况下, 我么以一套或两套效果图适应大部分的屏幕, 放弃极端屏或对其优雅降级, 牺牲一些效果 **现在基本以750为准**

<br>

### 动态设置 html 标签 font-size 的大小
首先我们要选一套标准尺寸, 一般的设计稿是 750px

**1. 把整个屏幕划为 15 等份**   
划分标准不一, 可以是 20 份也可以是 10 等份) 每一份作为 html 字体大小, 这里就是 50px

设计稿为750 划分为15份 每份就是50, 这个50就作为html字体的大小 淘宝就是10等份, 苏宁就是15等份

<br>

那么在 320px 设备的时候, 字体大小为 320 / 15 就是 21.33px 当小屏幕也就是320px的设备时, 我们也要除以相同的 份数

<br>

**. 用我们页面元素的大小 除以 不同的 html 字体大小**
比如我们以 750 为标准设计稿
一个 100 _ 100 像素的页面元素在 750 屏幕下, 就是 100 / 50 转为 rem 是 2rem _ 2rem 比例是 1:1

一个 100 * 100 像素的页面元素在 320 屏幕下, html 字体大小为 21.33 则 2rem=42.66px, 此时宽和高都是 42.66 但是宽和高的比例还是 1:1

但是已经能实现不同屏幕下 页面元素盒子等比例缩放的效果

```css
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
```

<br>

### 元素大小取值方法
```
页面元素的 rem 值 = 页面元素值(px) / (屏幕宽度 / 划分的份数)
页面元素的 rem 值 = 页面元素值(px) / html font-size 字体大小
```

<br><br>

## 苏宁案例

### 技术选型:
单独制作移动端页面方案

- 技术: 布局采取rem适配布局 (less + rem + 媒体查询)
- 设计图: 本设计图采用750px设计尺寸

<br>

### 设置公共common.less文件 装最常见的屏幕尺寸(其它页面也要用)
1. 新建common.less 设置好最常见的屏幕尺寸, 利用媒体查询设置不同的html字体大小, 因为除了首页其它页面也需要

2. 我们关心的尺寸有320px 360px 375px 384px 400px 414px 424px 480px 540px 720px 750px
```css
    @media only screen and (min-width:720px) {
        html {
            font-size:(720px / @num);
        }
    }

    ...
```

3. 划分的份数我们定为15等分

4. 我们pc端也可以打开我们苏宁移动端首页, 我们默认html字体大小为50px 注意这句话写到最上面
```css
/* less文件中的最上面 写上 */
html {
  font-size:50px;
}
```

解析: PC端也可以打开移动端的首页 当PC端打开时, 页面都是1366px再除以15也是太大了不好看 所以我们给它限定死 如果不是pc端的那我们再根据屏幕的不同对应不同的html字体大小

<br>

### 给body设置样式
```css
body {
  min-width:320px;
  width:15rem;
  margin:0 auto;
}
```

min-width 是为了让页面有最小宽度 320px对有移动端来说已经是最低的了 正常会有 max-width 这里因为要考虑不同的页面宽度 所以我们直接写 width:15rem   上面750的设计稿html大小是50px 15remx50 就是750 设计稿宽度 / 15份数

<br>

### 使用rem布局时, 背景图片也是会缩放的 不能写死
```css
background:url() no-repeat;
background-size:(44rem / @bF) (70rem / @bF)
```

<br>

### flexible.js 源码
flexible主要是设置rem布局, rem布局是跟html字体大小有关系的
```js
(function flexible (window, document) {

  // 获取html的根元素
  var docEl = document.documentElement

  // dpr物理像素比
  var dpr = window.devicePixelRatio || 1

  // 设置body的字体大小
  function setBodyFontSize () {

    // 如果页面中有body这个元素就设置body的字体大小
    if (document.body) {
      // 动态设置body的字体大小 根据物理像素比
      // 如果是pc端打开的物理像素比就是1 那就是12px
      // 如果是移动端打开的物理像素比就是2 那就是24px
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
```

<br>

### <font color="#C2185">window.devicePixelRatio 是物理像素比</font>
- pc端: 输出的结果会是1
- sp端: 输出的结果会是2

<br>

### <font color="#C2185">var dpr = window.devicePixelRatio || 1</font>
检查当前浏览器有没有window.devicePixelRatio这个属性, 有的话就获取这个属性, 没有的话就设定为1









