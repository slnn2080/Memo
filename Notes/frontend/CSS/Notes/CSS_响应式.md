### 响应式

### 响应式布局要先创建一个容器, 然后不同尺寸给这个容器一个固定的宽度

PC 端一套页面, 移动端一套页面, 平板一套页面, 现在响应式一套可以解决,
但是响应式虽然好, 但也不是万能的, 它只能画一些简单的三端布局

像淘宝, 京东, app 里面布局方案跟 PC 端有很大差异的, 这时候必须分着设计



### 媒体查询
- 可以根据不同的屏幕尺寸 设置不同的样式
- CSS3 媒体查询是响应式方案的核心

> media 属性:
 <!-- media属性, 当前样式表只有在打印的时候才有作用 -->
<link rel="stylesheet" href="index.css" media='print'>
- 可选值:
- print     打印设备
- screen    彩色屏幕设备



### CSS3 媒体查询
只有在屏幕的时候才能用到里面的样式, 一般媒体查询写在下面, 用来覆盖
@media screen {
/_ 这里是规则:选择器+声明块 _/
}



### Less 中的媒体查询写法
@media only screen {
    @media (min-width:768px) {
        ...
    }
}

### 媒体类型(指的就是设备类型)
all     所有设备
print   打印设备
screen  带屏幕的设备
speech  屏幕阅读器

projection  手持设备
tv          电视
braille     盲文触觉设备
embossed    盲文打印机
speech      “听觉”类似的媒体设备
tty         不适用像素的设备



### 媒体属性
width: 浏览器窗口的尺寸(可添加 min- max- 前缀)
min-width:800px >=800px 才有用
max-width:800px <=800px 才有用

device-width: 设备独立宽度(设备分辨率)(可添加 min- max- 前缀)
<!--
    device-width为设备宽度 也就是分辨率, 当我的设备的分辨率为414px时, 才会起作用, 比如我的电脑的分辨率是1366, device-width:1366px
    @media screen and (device-width:414px) {        }

    PC端: 查看分辨率
    移动端: 查看设备的参数320 X 480
-->

device-pixel-ratio: 设备的像素比(必须加-webkit-前缀)(可添加 min- max- 前缀)
- PC 端: 1
- 移动端: 在网上查看 DPR 参数
<!--
    只有当设备的像素比为 1 时 才会有用
    @media screen and (-webkit-device-pixel-ratio: 1) {        }
 -->

orientation: 代表横竖屏
-
- 可选值:
- portrait 竖屏
- landscape 横屏
<!--
    @media screen and (orientation:portrait) {        }
    宽度 比 高度小就是竖屏呗
 -->



### 操作符(关键字)

and     与      一般用 and 来接媒体类型 和 媒体属性 可链接多个属性

,       或      , 号前可以应用 , 号后也可以应用

not     取反    只要不是横屏的彩色屏幕 就可以应用
<!-- @media not screen and (orientation:portrait) {        } -->

only    没有    only 的设备 规则会被忽略, 它只会影响紧跟的媒体类型

> @media only screen and (orientation:portrait) { } 解决兼容性问题
<!-- 老版本浏览器只支持查询媒体类型, 不支持带媒体属性的查询,  防止老旧浏览器不支持带媒体属性的查询 而应用到给定样式 -->



### 尺寸区间
> 超小屏幕(手机) < 768px
> 小屏设备(平板) >=768px ~ < 992px
> 中等屏幕(电脑) >=992px ~ < 1200px
> 宽屏设备(超电) >=1200px



### 响应式操作步骤
> 创建 响应式布局容器(宽度为固定的)
- 响应式需要一个父级作为布局容器, 然后根据布局容器的宽度变化 修改里面元素的排列方式
<!--
    在响应式里面没办法控制每一个元素的宽度变化, 我们通过布局容器来改变子元素的变化, 不同的档位设置不同的宽度
 -->

> 响应式尺寸的划分
- 超小屏幕 (手机, <768px): 设置宽度为 100%
- 小屏幕 (平板, >=768px): 设置宽度为 750px

- 中等屏幕 (桌面显示器, >=992px): 设置宽度为 970px
- 大屏幕 (大桌面显示器, >=1200px): 设置宽度为 1170px
<!--
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
 -->



### BootStrap 开发框架
- 推荐使用: http://bootstrap.css88.com

> 版本:
- 2.x.x 停止维护 兼容性好 代码不够简洁 功能不够完善
- 3.x.x 目前使用最多, 稳定 但是放弃了 ie67 对 ie8 支持但是界面效果不好, 偏向于开发响应式布局, 移动设备优先的 web 项目
- 4.x.x 最新版 目前还不是很流行

> 使用前置
- 1, 创建文件夹结构
- 2, 创建 html 骨架结构
- 3, 引入相关样式
- 4, 书写内容

- 1, 文件夹结构
  文件夹: bootstrap
  文件夹:css
  文件夹:fonts
  文件夹:js

文件夹:css
文件夹:js
文件夹:images
index.html

<!-- 模板:
    <meta charset="UTF-8">

    <!-- 要求当前网页使用ie浏览器最高版本的内核来渲染 >
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <! 视口的设置 视口的宽度和设备一致 默认的缩放比例和pc端一致 用户不能自行缩放 >
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">


    <!-- HTML5 shim 和 Respond.js 是为了让 IE8 支持 HTML5 元素和媒体查询（media queries）功能 >
    <!-- 警告：通过 file:// 协议（就是直接将 html 页面拖拽到浏览器中）访问页面时 Respond.js 不起作用 >
    <!--
        [if lt IE 9]>
        <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
        <![endif]
    >
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
    <title>淘宝导航</title>


    js文件在/body的前面 先引入jQ.js 然后引入bootstrap.js

-->


> 解决ie 6 7 8 没有媒体查询的问题 也要写在meta标签的下面
<!--[if lt IE 9]>
    <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
<![endif]-->


> 使用图标字体
- 在官网的 组件 模块里
- 创建 span 然后 class的值 去字体库复制


> 主要就是通过类名来渲染效果
- 这是复制的源码
<!--
    <button type="button" class="btn btn-primary">（首选项）Primary</button>

    假如我要在div上应用一样的样式 class="btn btn-primary" 复制到div上就可以了

    <div class="btn btn-primary"></div>
 -->


> 在原有的基础上更改对方的样式
- 在 class 内部 添加自己的类型, 在内部样式表中更改属性
<!--
    <div class="btn btn-primary 我自己的类名"></div>
-->



### BootStrap 中的预定义类
- BootStrap 预先定义好了一个类 叫做 .cantainer

> cantainer 类
- 在 bootstrap 中使用 container 类就是响应式布局的常见尺寸
- 也就是说在 bootstrap 中使用一个 container 类就不用媒体查询了

- 在 bootstrap 中的 container 定义了 15px 的内边距 一定要小心
<!--
    - 超小屏幕  (手机, <768px):             设置宽度为 100%
    - 小屏幕    (平板, >=768px):            设置宽度为 750px

    - 中等屏幕  (桌面显示器, >=992px):       设置宽度为 970px
    - 大屏幕    (大桌面显示器, >=1200px):    设置宽度为 1170px
 -->

> container-fluid 类
- 流式布局容器 百分百宽度 和屏幕一样宽的
- 占据全部视口 viewport 的容器 适合于单独做移动端开发



### BootStrap 中的栅格系统
- grid systems 网格系统 它是指将页面布局划分为等宽的列, 然后通过列数的定义来模块化页面的布局
- bootstrap 提供了一套响应式 移动设备优先的流式栅格系统 随着屏幕或视口 view 尺寸的增加系统会自动分为最多 12 列


> 栅格选项的参数
- 栅格系统用于通过一系列的行(row)与列(column)的组合来创建页面布局, 你的内容就可以放入这些创建好的布局中

- BootStrap 把页面宽度分为 4 档

                    <768        >=768       >=992       >=1200

.container 最大宽度 100%    750px   970px       1170px

类前缀      .col-xs-      .col-sm-  .col-md-    .col-lg-

列数 12


> 给列划分前缀 只有添加前缀后才知道在什么屏幕下 划分为几份
- 行(.row)必须放到 container 布局容器里面
- 我们要实现列的平均划分 需要给列添加 类前缀
- xs:extra small 超小 sm:small 小 md:medium 中等 lg:大

- 列大于 12, 多余的列所在的元素将被作为一个整体另起一行排列
- 每一列默认有 左右 15 像素的 padding
- 可以同时为一列指定多个设备的类名, 以便划分不同份数 例如 class='col-md-4 col-sm-6'

<!--
    如果孩子的分数相加等于12 则孩子能沾满整个的container宽度
    如果孩子的分数相加小于12 则占不满 会有空白
    如果孩子的分数相加大于12 则最后的份数多的那一列会另起一行显示
 -->

<!--
    // 里面有4列, 添加前缀 在大屏幕下 每一个列占三份
    // 大屏幕的时候每个盒子占4份 中等屏幕下每个盒子应该占3份
    <div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>1</div>
    <div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>2</div>
    <div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>3</div>
    <div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>4</div>
 -->


> 列嵌套
- 栅格系统内置的栅格系统将内容再次嵌套, 简单理解就是一个列内再分成若干份小列
- 我们可以通过添加一个新的 .row 元素 和 一系列的.col-sm- 元素到已经存在的 col-sm- 元素内

- row 类 会清除 padding 问题, 所以我们列嵌套时最好加上 row 结构
- 这样可以取消父元素的 padding 值 而且高度自动和父级一样高
<!--
    原理是padding-left padding-right设置为-15px
 -->

<!--
    <div class='col-md-4'>

        // 这里需要注意的是 父级盒子左右有padding 解决方式 如下
        <div class='col-md-6'>a</div>
        <div class='col-md-6'>b</div>
    </div>

    <div class='col-md-4'>
        <div class="row">                   在这里从新插入了row
            <div class='col-md-6'>a</div>
            <div class='col-md-6'>b</div>
        </div>
    </div>
 -->

<!--
    // 盒子与盒子之间的距离 不能直接给列之间加margin

    想实现上面的效果, 列的容器只是给你了一个宽度范围 里面再创建容器用padding值控制位置 从而直线有间距
-->


> 列偏移:
- 使用.col-md-offset-* 类可以将列向右侧偏移, 这些实际是通过使用 *选择器为当前元素增加了左侧的边距(margin)


> 两个盒子各自左对齐 右对齐
<!--
    <div class="container">
    <div class="row">
        <div class='col-md-4'>左盒子</div>

        // 让右侧和盒子偏移4份, 单位都是份数
        <div class='col-md-4 col-md-offset-4'>右盒子</div>
    </div>
</div>
 -->


> 一个盒子居中对齐
- (12 - 8) / 2
- 一共 12 份盒子占 8 份 还剩 4 份 偏移两份
<!-- <div class='col-md-8 col-md-offset-2'>中间盒子</div> -->


> 列排序
- 利用 推和拉改变盒子的顺序
- col-md-push-_ 和 col-md-pull-_
<!--
    <div class='col-md-4 col-md-push-8'>左侧</div>
    <div class='col-md-8 col-md-pull-4'>右侧</div>
 -->



### 响应式工具
- 为了加快对移动设备友好的页面工作, 利用媒体查询功能, 并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容

  类名      超小屏      小屏        中屏        大屏

.hidden-xs  隐藏        可见        可见        可见

.hidden-sm  可见        隐藏        可见        可见

.hidden-md  可见        可见        隐藏        可见

.hidden-lg  可见        可见        可见        隐藏

- 与之相反的, 是 visible-xs, visible-sm, visible-md, visible-lg 是 当在什么设备上现实, 比如只有在大屏幕上才显示



### 阿里百秀的案例总结
> 修改container的宽度
- 如果效果图比1170大的话 我们可以修改container的宽度
- 通过媒体查询来做
<!--
    // 修改container的最大宽度为1280 根据设计稿来定的
    @media screen and (min-width:1280px) {
        .container {
            width:1280px;
        }
    }
 -->

> 列中的padding值 去掉 padding-left:0; 但是要注意权重 比如起个类名

> 字体图标 复制类名 复制到任意盒子里 
<!-- 
    <a class='test 图标字体的类名'></a>

    原理是添加了::before
    如果位置不对 就添加一个vertical-align:middle
 -->

> bootstrap中的p有默认有下边距

> bootstrap中已经预定义好clearfix这个类了 直接使用就可以

> 当用响应式布局看布局变没变化时, 比如只有小屏有变化 大屏都没有
<!-- 
    
 -->

> 图片不想缩放的话 就max-width:100%

> 不一样的布局还是用到媒体查询