### inline-block vertical-align
- 当一个元素转换为 inline-block 之后 vertical-align 就可以生效了
- 用于调用行内元素的基线
- https://www.cnblogs.com/zxjwlh/p/6219896.html

- 这么说吧 将一个元素转换为 inline-block 后 如果遇到怪怪的问题 我们就要使用
vertical-align 来解决



### 解决元素之间的默认间距
- https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/

- 我们可以试试 font-size: 0px


### cover contain 区别
- 相同点: 
- background-size中的cover与contain都是将图片以相同的宽高比缩放以适应容易的宽高，

- 不同点: 
- cover:  会缩放至图片能够铺满整个容器，可能会有部分图片区域被裁剪，
- contain:则是图片会缩放至整个图片都能显示完全，但是容易可能会有留白。

<!-- 
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
 -->


### flex space-b
- 要想第2行实现左对齐的效果 我们可以在开启flex的容器上添加一个::after 让它的width等于项目的宽度就可以
<!-- 
    .wrap {
        display: flex;
        justify-content: space-between;
    }

    .wrap::after {
        content: "",
        width: 30%;
    }
 -->



### 关于图片的对齐方式
- 图片是和文字的基线对齐的 所以 可以选择使用 text-align 和 line-height 让图片垂直水平居中

- 有的时候图片并没有垂直居中 可以选择让它vertical-align:middle 还是由于图片是和文字基线对齐的原因

- 图片就属于行内块


### 禁止某元素内部选中元素
> user-select: none;


### 边框使用文本的颜色
- 通常情况下都需要手动给边框设置一个颜色，有没有办法能够使用当前元素的文本颜色来充当盒子边框颜色呢？

- 技巧就是:
- 在设置边框时不设置边框颜色，只设置边框宽度（粗细度）和边框的样式

- 没有设置边框颜色的边，边框颜色就是当前盒子的文本色，
<!-- 这种方法在所有浏览器中都能够得到支持，不存在兼容性问题。 -->



### 盒子宽度双方向变化 向左变化
> 盒子宽度双方向变化:
- 实现双向变化的关键是给要变化的dom元素，加一个父元素，并设置样式text-align: center; 

- 此时width由80px伸长为200px，虽然还是往右伸长，

- 但由于子元素始终保持居中，所以在视觉上看上去就呈现双向变化了。
<!-- 
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

    <div class="parent">
        <div class="child"></div>
    </div>
 -->

> 向左变化（向左伸长以及向右缩短）
- 类似于双向变化，只要让子元素始终保持右对齐，就可以实现向左变化（向左伸长以及向右缩短）。
<!-- 
    .parent {
        text-align: right;
    }
 -->

> 或者用相对定位 和 绝对定位 来解决
- right:0

### <link rel="icon" href="./images/favicon.ico">

### placeholder
- 该提示会在输入字段为空时显示，并会在字段获得焦点时消失。
- 注释：placeholder 属性适用于以下的 <input> 类型：text, search, url, telephon
> 修改input::placeholder 用伪类

### 当父盒子已经被完全分完(100% = 50% 25% 25%) 这时还要有空距
- 我们可以用-padding-right来解决

### 要是想加margin:0 auto 盒子必须有宽度

### 盒子不给宽度, 再加上margin的话本身区域是往里挤的

### input type还有 search

### :nth-child(n+2) 后几个
- 从第二个元素开始向后

### :nth-child(-n+2) 前几个
- 从第二个元素开始向前

### 当加完padding后元素掉下来后 可以设置box-sizing


### DPG
- 京东自主研发的图片压缩技术, 可直接节省用户近50%的浏览量, 提高用户网页打开的速度, 能够兼容jpeg, 实现全平台 去阿奴浏览器的兼容支持, 和webp的清晰度对比没有差距

### webp
- 谷歌开发的一种加快图片加载速度的图片格式, 图片压缩体积大约只有jpeg的2/3, 并能节省大量的服务器带宽资源和数据空间



### 加了fixed的盒子一定要有宽度 可以加上最大宽度和最小宽度

### 在图片里使用background-size不是图片的百分比 而是盒子的百分比


### 出现行内块的地方一般都有vertical-align:middle

### 活动before after 和 position


### images
- 存放的是背景图片 修饰图片等

### upload
- 存放的是里面产品图片 展示图片 大图片


### 光标闪烁效果
<!-- 
    .guangbiao {
            animation:blink 1s steps(2, start) infinite;
        }

    @keyframes blink {
        to {
            visibility: hidden;
        }
    }
 -->

### 点击高亮

### background-size:
- cover: 要求把盒子完全的盖住 所以图片有移出部分 这样是不是可以调整图片的位置
- contain: 等比例拉伸图片到一边 宽度或高度铺满到了就不再拉伸了


### 私有前缀
> Trident内核： 前缀为-ms

> Gecko内核：   前缀为-moz

> Presto内核：  前缀为-o

> Webkit内核：  前缀为-webkit

prefixfree.js


### 


### 直角三角形
-  思路:
- 左边和下边的边框为0, 上边大一些

<!-- 
    .box1 {
        width:0;
        height: 0;
        border-top:50px solid pink;
        border-right:50px solid skyblue;
        border-bottom:50px solid blue;
        border-left:50px solid green;
    }

    .box1 {
        width:0;
        height: 0;
        border-top:100px solid transparent;
        border-right:50px solid skyblue;
        border-bottom:0px solid blue;
        border-left:0px solid green;
    }

    border-color:transparent red transparent transparent;
    border-style:solid;
    border-width:100px 50px 0 0;

 -->




### vw/vh和100%的区别
%单位

%（百分比）是一个相对长度单位，相对于包含块（containing block）的高宽或字体大小来取值。

关于包含块（containing block）的概念，不能简单地理解成是父元素。

如果是静态定位和相对定位，包含块一般就是其父元素。

如果是绝对定位的元素，包含块应该是离它最近的 position为非static属性的祖先元素。

如果是固定定位的元素，它的包含块是视口（viewport）。

vw单位

vw、vh、vmin、vmax是一种视窗单位，也是相对单位。它相对的不是父节点或者页面的根节点。而是由视窗（Viewport）大小来决定的，单位 1，代表类似于 1%。 视窗(Viewport)是你的浏览器实际显示内容的区域—，换句话说是你的不包括工具栏和按钮的网页浏览器。

具体描述如下：

vw：视窗宽度的百分比（1vw 代表视窗的宽度为 1%）

vh：视窗高度的百分比

vmin：取当前Vw和Vh中较小的那一个值

vmax：取当前Vw和Vh中较大的那一个值

vh和vw相对于视口的高度和宽度， 1vh 等于1/100的视口高度，1vw 等于1/100的视口宽度 比如：浏览器高度900px，宽度为750px, 1 vh = 900px/100 = 9 px，1vw = 750px/100 = 7.5 px， 很容易实现与同屏幕等高的框。





### clip:rect()
- 我自己的理解 当中间两个值为元素大小时 此时显示的是全部区域, 在这个基础上 设定 上 右 下 左 就是往里压 挤压元素 减小为挤压哦
- 如果left >= right或者bottom <= top，则元素会被完全裁掉而不可见，即“隐藏”。




### 动态添加class 并不一定要加在元素本身上
- 当期望效果为, 达到某样条件时再出发效果 比如hover上 比如js到什么样的条件在调用动画等
- 可以设定好 对目标元素的样式 然后利用后代选择器的方式添加

- 比如 当祖先元素有这个class时 后代元素出现某种效果
<!-- 
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
-->


### 新的显示也隐藏的方式
- transform:scale(0)  transform:scale(1);
- 配合transform:origin使用有不同的效果 bottom下拉, right消失


### 直线从左滑动到右侧然后在右侧消失
- 要点:
- 使用 transform:scale(0)  transform:scale(1) 来实现 隐藏 和 显示
- 使用 transform-origin 控制元素变化起点的方向

- 关键点 在49%时的原点在left, 50%的时候改变原点right 向反反向变化
- 关键点 开始的时候透明度0 scale 0 最后的时候透明度1 scale 0

- 关键点: animation-fill-mode: forwards
<!-- 
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
 -->



### ::before伪类在最底层, ::after 伪元素在最上层, 其子元素在中间层


### 描边属性 -webkit-text-stroke: 描边颜色 描边粗细
- 配合color: transparent;既可以做到字体镂空的效果


### ::before 中的 content
- css3 里面的content 可以使用动态内容结合html5的自定义属性
- content:attr(data-text) data-text不可以加引号


### 裁切显示区域
> clip-path
- 裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。
- clip-path: circle(300px at 40% 10%)
- 圆的大小 和 圆心的位置

<!-- 
    clip-path: circle(40%);

    clip-path: ellipse(130px 140px at 10% 20%);

    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);

    clip-path: path('M 0 200 L 0,75 A 5,5 0,0,1 150,75 L 200 200 z');
 -->




### 毛玻璃效果
> background:rgba(0,0,0,.1);    backdrop-filter: blur(4px);     
- 这个属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。 
- 因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。

- 不能对元素直接使用 filter: blur() 会将其内容全部模糊掉
- 为了保证文字不会模糊掉需要多一个层单独应用模糊效果
<!-- 
    模糊效果并不会应用到其背后的元素上，所以需要使用 content 区域有和背景相同的背景图并进行模糊。
 -->

- 多一个层级的方法不通过添加元素，而通过伪元素。
<!-- 
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

    这里有两点需要注意，由于伪元素不能通过 width:100% 和 height:100% 来继承宿主元素的尺寸，所以通过上述方式来继承 content 的尺寸；为了使伪元素位于 content 的下面这里给其设置 z-index:-1，为不使其隐藏到背景图的后面，这里给 content 设置 z-index:1。
 -->


### Top banner 位置 视频
> 视频的自动循环播放 muted loop autoplay
<!-- 
    <section id='wrap'>
        <video src="./source/nuan.mp4" muted loop autoplay></video>
    </section>
 -->

> 控制视频的显示区域 和 显示位置
<!-- 
    object-fit:     fill|contain|cover|scale-down|none|initial|inherit;
        
        contain	    保持原有尺寸比例。内容被缩放。
        cover	    保持原有尺寸比例。但部分内容可能被剪切。
        none	    保留原有元素内容的长度和宽度，也就是说内容不会被重置。
        scale-down	保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

    object-position: 50% 50%;right top;
 -->

> 视频上有文字的话
- 首先注意html结构, 然后让视频的容器开启定位, index:-1
<!-- 
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
 -->


### 垂直水平居中
当不知道元素高宽的时候:
position:absolute;
left:50%;
top:50%;
transform: translate3d(-50%, -50%, 0);

当知道高 和 宽时
position:absolute;
left:0;
top:0;
right:0;
bottom:0;
margin:auto;



### width:auto / 100%区别
auto 加 padding的时候, 是在内容区里往里扣的, width包含padding
<!-- <  <padding>  width  <padding>  > -->
100% 加 padding的时候, 是加在内容区外面的
<!-- <padding> <width:100%> <padding> -->



### 父元素设置opacity的时候 子元素会继承到opacity
> 解决方案1: 
- 父元素不使用opacity 使用rgba控制a的值, 兼容性不好ie6不行

> 解决方案2:
- 给子元素(child), 创建一个兄弟元素结构(opacity-bg), 在opacity-bg上设置opacity, 然后绝对定位调整child和opacity-bg层级, 让opacity-bg在child的下面
<!-- 
    <div class='parent'>
        <div class="child"></div>
        <div class="opacity-bg"></div>
    </div>

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
 -->

