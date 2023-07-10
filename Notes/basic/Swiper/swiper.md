# Swiper
swiper现在已经是8的版本, 下面主要介绍下两种场景下的使用方式
1. 原生的html
2. vue的项目中

<br>

原生的html其实也是通用的使用方式, 因为不管什么项目我们都可以使用原生的html方式来实现  
如果是vue项目的时候, 我们既可以使用原生html的方式, 也可以使用swiper中给我们提供的组件

<br>

### 官网:
```s
https://www.swiper.com.cn/
```

<br>

### 安装:

**npm方式:**
```s
npm install swiper

# vue2版本建议使用 swiper@5
npm install swiper@5

# vue3版本建议使用 swiper@7 8
npm install swiper@7
```

<br>

**下载压缩包的方式:**
我们只需要压缩包中的 ``<dist>`` 文件夹

<br>

### 注意:
- swiper6之前版本(5版本), 最外层容器的类名为 ``.swiper-container``
- swiper7版本, 最外层容器的类名为 ``.swiper``

<br><br>

# Swiper: html中的基本使用

### 引入:
1. 引入css和js文件
2. 然后复制DOM结构 以及JS部分

```js
import Swiper from 'swiper';    
var mySwiper = new Swiper('.swiper', { /* ... */ });
```

<br>

### 基本示例:
```html
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
  <!-- 如果需要分页器 -->
  <div class="swiper-pagination"></div>
  
  <!-- 如果需要导航按钮 -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  
  <!-- 如果需要滚动条 -->
  <div class="swiper-scrollbar"></div>
</div>
```

```js
var mySwiper = new Swiper ('.swiper-container', {
  direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
  
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // 如果需要滚动条
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})
```

<br><br>

## swiper的结构说明

### 是否需要滚动条
```html
<div class="swiper-scrollbar"></div>
```

<br>

### 是否需要导航按钮
<div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div>

<br>

### 是否需要分页器 (下面的小点点)
<div class="swiper-pagination"></div>

<br>

### 代表每一个item
<div class="swiper-slide">Slide 1</div>

<br>

### 修改样式：
1. 可以直接使用 swiper 中提供的类名来修改
2. 为了解决权重问题 可以直接复制swiper的全部类名

<br>

### 创建swiper实例
默认不是自动循环
```js
let swiper = new Swiper(外层容器css选择器, {配置项})
```

如果需要创建多个swiper 那就要创建对应的多个实例来管理

<br><br>

# 样式相关:

## Swiper7样式的引入
```js
import "swiper/css"  // 核心样式
```

如果我们还需要使用 swiper的其他组件 则需要导入其它组件对应的样式 比如
```js
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
```

还可以导入所有组件的样式
```js
import "swiper/css/bundle"
```

<br>

### 样式列表
- swiper/css/a11y- A11y模块所需的样式
- swiper/css/autoplay- 自动播放模块所需的样式
- swiper/css/controller- 控制器模块所需的样式
- swiper/css/effect-cards- 卡牌效果模块所需的样式
- swiper/css/effect-coverflow- Coverflow - Effect 模块所需的样式
- swiper/css/effect-creative- 创意效果模块所需的样式
- swiper/css/effect-cube- 立方体效果模块所需的样式
- swiper/css/effect-fade- 淡入淡出效果模块所需的样式
- swiper/css/effect-flip- 翻转效果模块所需的样式
- swiper/css/free-mode- 自由模式模块所需的样式
- swiper/css/grid- 网格模块所需的样式
- swiper/css/hash-navigation- 哈希导航模块所需的样式
- swiper/css/history- 历史模块所需的样式
- swiper/css/keyboard- 键盘模块所需的样式
- swiper/css/manipulation- 操作模块所需的样式
- swiper/css/mousewheel- 鼠标滚轮模块所需的样式
- swiper/css/navigation- 导航模块所需的样式
- swiper/css/pagination- 分页模块所需的样式
- swiper/css/parallax- 视差模块所需的样式
- swiper/css/scrollbar- 滚动条模块所需的样式
- swiper/css/thumbs- Thumbs 模块所需的样式
- swiper/css/virtual- 虚拟模块所需的样式
- swiper/css/zoom- Zoom 模块所需的样式

<br>

### 对于 Less 样式，替换css为less导入路径 (scss同理)
```js
import 'swiper/less';
import 'swiper/less/navigation';
import 'swiper/less/pagination';
```

<br><br>

## Swiper5样式的引入
```js
import 'swiper/css/swiper.min.css';
```

<br><br>

# Swiper: 配置项
```s
https://www.swiper.com.cn/api/start/new.html
```
<br>

## 配置项: Swiper一般选项
我们的配置项都是写在配置对象中的 比如

```js
const ops = {
  initialSlide: 2
}
```

<br>

### initialSlide: number
设定初始化时slide的索引, Swiper默认初始化时显示第一个slide

如果想在初始化时直接显示其他slide，可以做此设置, 也就是设定初始化时的slide的索引
```js
const ops = {
  initialSlide: 2
}
```

<br>

### direction: string
Swiper的滑动方向，可设置为水平方向切换 horizontal 或垂直方向切换 vertical 。

可使用断点（breakpoints,4.5.0后）设置不同分辨率下的切换方向。

可使用 swiper.changeDirection() 方法动态更改切换方向。

```js
const ops = {
  direction: "horizontal"  //默认
  direction: "vertical"
}
```

<br>

### speed: number ms
切换速度，即slider自动滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间。 
```js
const ops = {
  speed: 300  //默认
}
```

<br>

### width: number
强制Swiper的宽度(px)，当你的Swiper在隐藏状态下初始化时用得上。这个参数会使自适应失效。

可设置为undefined使这个参数无效。

```html
<script> 
var mySwiper = new Swiper('.swiper',{
  //设置固定宽度，隐藏时初始化swiper
  width: 800, 

  //设置宽度为全屏  
  width: window.innerWidth,

  //设置断点宽度
  breakpoints: {
    1024: {
      width: 500,
    },
    768: {
      width: undefined,//取消width，恢复自适应
    }
  },

  //窗口缩放时设置width
  on: {
    resize: function(){
      this.params.width = window.innerWidth;
      this.update();
    },
  } ,
})



/*隐藏状态显示后再初始化swiper
function initSwiper(){
  var mySwiper = new Swiper ('.swiper', {
    ...
  }
}
$(".page").css('display','block');
setTimeout('initSwiper()', 100);
*/
</script>
```

<br>

### height: number
强制Swiper的高度(px)，当你的Swiper在隐藏状态下初始化时且切换方向为垂直才用得上。这个参数会使自适应失效。

```html
<script>
  var mySwiper = new Swiper('.swiper', {
    direction: 'vertical',
    height: 300,//你的slide高度

    //全屏  height : window.innerHeight,
  }) 
</script>
```

<br>

### autoHeight: boolean (false)
自动高度。设置为 true 时，wrapper 和container **会随着当前slide 的高度而发生变化。**

<br>

```js
const ops = {
  autoHeight: true, //高度随内容变化
}
```

<br>

### nested: boolean (false)
用于嵌套相同方向的swiper时，当切换到子swiper时停止父swiper的切换。

请将子swiper的nested设置为true。
由于需要在slideChangeEnd 时判断作用块，因此滑动太快时这个选项无效。

<br>

```html
<script> 
  //父swiper
  var mySwiper = new Swiper('#swiper1')    

  //子swiper
  var mySwiper2 = new Swiper('#swiper2', {  
    nested:true,
    resistanceRatio: 0,
  })
</script>
```

<br>

### roundLengths: boolean
如果设置为true，则将slide的宽和高取整(四舍五入)，以防止某些分辨率的屏幕上文字或边界(border)模糊。

例如当你设定slidesPerView: 3的时候，则可能出现slide的宽度为341.33px，开启roundLengths后宽度取整数341px。

<br>

```js
const ops = {
  roundLengths : true, 
}
```

<br>

### breakpoints: object
断点设定，允许为不同的响应断点（屏幕尺寸）设置不同的参数。类似于CSS响应式布局的media only screen and (min-width: 480px)。

只有部分不需要变换布局方式和逻辑结构的参数支持断点设定， 如:
- slidesPerView
- slidesPerGroup、
- spaceBetween
- grid.rows、slidesPerGroupSkip
- direction

<br>

像loop、effect等则无效

<br>

```js
const ops = {
  breakpoints: { 
    320: {  //当屏幕宽度大于等于320
      slidesPerView: 2,
      spaceBetween: 10
    },
    768: {  //当屏幕宽度大于等于768 
      slidesPerView: 3,
      spaceBetween: 20
    },
    1280: {  //当屏幕宽度大于等于1280
      slidesPerView: 4,
      spaceBetween: 30
    }
  }

  breakpoints: {
    '@0.75': {  //当屏幕宽高比大于等于0.75
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '@1.00': {  //当屏幕宽高比大于等于1
      slidesPerView: 3,
      spaceBetween: 40,
    },
    '@1.50': {  //当屏幕宽高比大于等于1.5
      slidesPerView: 4,
      spaceBetween: 50,
    }
  }

  //Swiper4.x版本为小于
  breakpoints: {
    1280: {  //当屏幕宽度小于等于1280
      slidesPerView: 4,
      spaceBetween: 30
    }
    768: {  //当屏幕宽度小于等于768
      slidesPerView: 3,
      spaceBetween: 20,
    },
    320: {  //当屏幕宽度小于等于320
      slidesPerView: 2,
      spaceBetween: 10,
    }
  } 
}
```

<br>

### grabCursor: boolean
设置为true 时，鼠标覆盖Swiper 时指针会变成手掌形状，拖动时指针会变成抓手形状。
```js
const ops = {
  grabCursor : false,  //默认
}
```

<br>

### runCallbacksOnInit: boolean (true)
每次我们切换slider的时候 都会触发一些回调, 或者 当我们的slider不是第一个的时候 也会触发回调

当我们不想在上述的情况下触发回调的时候 我们可以将其设置为false

```js
var mySwiper = new Swiper('.swiper',{
  loop:true,
  //or initialSlide: 2,

  runCallbacksOnInit : true, //如果不想触发，将此设置为false
  on:{
    slideChangeTransitionStart:function(){
      alert('触发了回调');
    },
  },
})
```

<br>

### on
注册事件处理器，响应事件时所调用的函数或方法

```html
<script language="javascript"> 
var mySwiper = new Swiper('.swiper', {
  on: {
    slideChange: function () {
      console.log(this.activeIndex);
    },
  },
};

//或者

var mySwiper = new Swiper('.swiper');
mySwiper.on('slideChange', function () {
  //...
});
</script>
```

<br>

### preloadImages: boolean (true)
Swiper会强制加载所有图片后才初始化。
```js
const ops = {
  preloadImages:false,
}
```

<br>

### updateOnWindowResize: boolean (true)
默认当窗口(window) 尺寸发生变化时，比如屏幕旋转，Swiper会更新和重新计算(update和breakpoints等)。禁止可设为false。

此参数不可通过params 重写。由于设置了updateOnWindowResize: false，breakpoints 失效了。

<br>

```js
const ops = {
  updateOnWindowResize: true,
}
```

<br>

### enabled: boolean (true)
设置Swiper初始时是否可用，默认是可用(true)。当Swiper被禁用时，它将隐藏所有导航元素（分页器、按钮、滚动条）并且不会响应任何事件和交互。

后面可通过函数 enable() 和 disable() 动态启用或禁用Swiper。

```html
<script type="text/javascript">
  var mySwiper = new Swiper('.swiper', {
    pagination: {
      el: '.swiper-pagination',
    },
    enabled: false,
  }); 
</script>
```

<br>

### rewind: boolean (true)
设置为true启用“倒带”模式。

启用后，在最后一个Slide 上单击“next”导航按钮（或调用.slideNext()）将滑回到第一个Slide。在第一个Slide 上单击“prev”导航按钮（或调用.slidePrev()）将滑动到最后一个Slide。

```js
const ops = {
  rewind:true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}
```

<br>

### modules: 数组
在项目中引入swiper 时，需要用到的 Swiper 模块。

```html
<script>
  import Swiper, { Navigation, Pagination } from 'swiper';

  const swiper = new Swiper('.swiper', {
    modules: [ Navigation, Pagination ],
  });
</script>
```

<br><br>

## 配置项: 旋转木马效果配置
```s
https://www.swiper.com.cn/api/carousel/24.html
```

<br><br>

## 配置项: loop
```s
https://www.swiper.com.cn/api/loop/22.html
```

<br><br>

## 配置项: clicks

### preventClicks: boolean (true)
当swiper在触摸时阻止默认事件（preventDefault），用于防止触摸时触发链接跳转。

```js
const ops = {
  preventClicks : false,//默认true
}
```

<br>

### preventClicksPropagation: boolean (true)
阻止click冒泡。拖动Swiper时阻止click事件。

<br>

### slideToClickedSlide: boolean (false)
设置为true则点击slide会过渡到这个slide。

```js
const ops = {
  slideToClickedSlide: true,
  centeredSlides : true,
  slidesPerView : 3,
}
```

<br><br>

## 配置项: touches
跟手指滑动有关系的
```s
https://www.swiper.com.cn/api/touch/55.html
```

<br><br>

## 配置项: 滑动相关
```s
https://www.swiper.com.cn/api/swiping/39.html
```

<br><br>

## 配置项: 监视器

### observer: boolean (false)
在 Swiper 的上启用动态检查器(Mutation Observer)，如果你更改swiper 的样式（隐藏/显示）或修改其子元素（添加/删除幻灯片）

Swiper 会更新（重新初始化）并触发 **observerUpdate** 事件。

默认 false ，不开启动态检查器，此时可以使用 update() 方法手动更新。

注意：隐藏swiper 和删除slide 会触发两次事件，因为slide 不是swiper 真正的一级子元素。

```html
<script> 
  var mySwiper = new Swiper('.swiper', {
    observer: true, //开启动态检查器，监测swiper和slide
    pagination: {
      el: '.swiper-pagination',
    },
    on: {
      observerUpdate: function(){
        alert('监测到DOM变化，更新Swiper')
      }, 
    },
  })
  $('#btn1').click(function(){
    $(".swiper-slide1").remove(); // 删除Slide
    // $('.swiper').hide(); // 隐藏Swiper
  })
</script>
```

<br><br>

## 配置项: 动态操纵
### mySwiper.appendSlide(slides)
添加slide到slides的结尾。可以是HTML元素或slide数组，例

```js
mySwiper.appendSlide('<div class="swiper-slide">Slide 10</div>')
mySwiper.appendSlide([ '<div class="swiper-slide">Slide 10</div>', '<div class="swiper-slide">Slide 11</div>' ]);
```

<br>

### mySwiper.prependSlide(slides)
添加slide到slides的第一个位置。可以是HTML元素或slide数组，例

<br>

### mySwiper.addSlide(index, slides);
在指定位置增加slide。可以是HTML元素或slide数组，例

<br>

### mySwiper.removeSlide(index)
移除索引为index的slide。

<br>

### mySwiper.removeAllSlides()
移除所有slides。

<br><br>

## 配置项: 自动切换
```s
https://www.swiper.com.cn/api/autoplay/16.html
```

### autoplay: boolean (false)
设置为true的时候 启动自动切换 并使用默认的切换设置 默认停留3秒
```js
{
  autoplay: true
}
```

将autoplay的值修改为对象 可以设置自动切换的功能
```js
{
  autoplay: {
    // 每个item的停留时间
    delay: 1000,
  }
}
```

<br><br>

## 配置项: 按钮相关

### navigation:
它是配置对象中的一个子配置对象

```js
const ops = {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    hideOnClick: true,
  },
}
```

<br>

使用前进后退按钮来控制Swiper切换。有时你的按钮不想放在container之内，点击时可能会有蓝色的边框，加上样式outline: none 可以去除。

swiper5新增可以通过设置Swiper的风格  
--swiper-theme-color或单独设置按钮风格--swiper-navigation-color来改变按钮颜色。

swiper5新增可以通过设置--swiper-navigation-size来调整按钮大小，默认是44px。

```html
<div class="swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <div class="swiper-button-prev"></div><!--左箭头。如果放置在swiper外面，需要自定义样式。-->
    <div class="swiper-button-next"></div><!--右箭头。如果放置在swiper外面，需要自定义样式。-->
</div>
<script language="javascript"> 
  var mySwiper = new Swiper('.swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
</script>
<style type="text/css">
  .swiper{
    --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
    --swiper-navigation-color: #00ff33;/* 单独设置按钮颜色 */
    --swiper-navigation-size: 30px;/* 设置按钮大小 */
  }
</style>
```

<br>

### prevEl nextEl:
设置前进按钮的css选择器或HTML元素。
```html
<div class="swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
<script language="javascript"> 
var mySwiper = new Swiper('.swiper',{
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
</script>

<!-- 修改箭头颜色示范 -->
<div class="swiper-button-next swiper-button-white"></div> <!-- 白色 -->
<div class="swiper-button-next swiper-button-black"></div> <!-- 黑色 -->
```

<br>

### hideOnClick: boolean (true)
点击slide时显示/隐藏按钮。  
BUG处理：如果遇到无效，可增加样式 .swiper .swiper-button-hidden{ opacity : 0; }

<br>

### disabledClass: string (swiper-button-disabled)
前进后退按钮不可用时的类名。  
例如在第一个slide时，后退按钮不可用，该按钮会添加一个不可用时的类名。

```html
<script language="javascript"> 
var mySwiper = new Swiper('.swiper',{
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    disabledClass: 'my-button-disabled',
  },
})
</script>
<style>
.my-button-disabled{
  opacity:0.2;
}
</style>
```

<br>

### hiddenClass: string (swiper-button-hidden)
按钮隐藏时的Class

<br><br>

## 配置项: 分页器的说明
默认分页器的类型是原点
```s
https://www.swiper.com.cn/api/pagination/362.html
```

<br>

### 配置项
```js
{
  pagination: {
    // el指定分页器的容器
    el: ".swiper-pagination",


    // 控制分页器的类型
    type: "bullets"     // 圆点
    type: "fraction"    // 分式 
    type: "progressbar" // 进度条
    type: "custom"      // 自定义


    // 点击分页器的指示点分页器会控制Swiper切换。
    clickable: true


    // 自定义小圆点型分页器的内容和样式
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },

    renderBullet: function (index, className) {
      switch(index){
        case 0:text='壹';break;
        case 1:text='贰';break;
        case 2:text='叁';break;
        case 3:text='肆';break;
        case 4:text='伍';break;
      }
      return '<span class="' + className + '">' + text + '</span>';
    },


    // pagination分页器内元素的类名
    // 默认：swiper-pagination-bullet
    bulletClass: 'my-bullet',
        //需设置.my-bullet样式

    // 定义pagination 分页器内当前活动块的指示小点的类名。
    // 默认：swiper-pagination-bullet-active
    bulletActiveClass: 'my-bullet-active',
    
  }
}
```

<br><br>

## 配置项: 切换效果
```s
https://www.swiper.com.cn/api/effects/193.html
```

<br>

**点击图片局部放大:**  
```s
https://www.swiper.com.cn/api/zoom/311.html
```

<br>

在使用Zoom的时候 我们要创建一个容器来进行包裹
```html
<div class="swiper-slide"> 
  <div class="swiper-zoom-container"> 
    <!-- 缩放图片 -->
    <img src="path/to/image"> </div> 
</div>
```

<br><br>

# Swiper: 事件
我们可以通过配置项中的 on 属性 来绑定一个事件, 该事件在合适的时候会自动触发

```js
const ops = {
  on: {
    init: function(swiper){
      //Swiper初始化了
      alert('当前的slide序号是'+this.activeIndex);
      //或者swiper.activeIndex，swiper与this都可指代当前swiper实例

      this.emit('transitionEnd');
      //在初始化时触发一次transitionEnd事件，需要先设置transitionEnd
    }, 
  }
}
```

<br>

### 事件列表
下面以 事件(形参) 的方式 来列出所有的事件

- init(swiper): 初始化后执行

- click(swiper,event): 当你点击或轻触Swiper 后执行，相当于tap。
- tap(swiper,event): 当你轻触(tap)Swiper后执行。在移动端，click会有 200~300 ms延迟，所以请用tap代替click作为点击事件。

- reachBeginning(swiper): Swiper切换到初始化位置时执行
- reachEnd(swiper): 当Swiper切换到最后一个Slide时执行

- resize(swiper): 当你的浏览器尺寸发生变化时执行。开启resizeObserver 后当swiper尺寸发生变化时执行。
```html
<script language="javascript"> 
var mySwiper = new Swiper('.swiper',{
  on: {
    resize: function(){
      this.update(); //窗口变化时，更新Swiper的一些属性，如宽高等
    }, 
  },
})
</script>
```

- slideChange(swiper): 在当前Slide切换到另一个Slide时执行(activeIndex发生改变)，一般是在点击控制组件、释放滑动的时间点。

- touchStart(swiper,event): 当碰触到slider时执行

- touchMove(swiper,event): 手指触碰Swiper并滑动（手指）时执行

- touchEnd(swiper,event): 触摸释放时执行

- slideChangeTransitionStart(swiper): swiper从当前slide开始过渡到另一个slide时执行 
```js
// 输出的activeIndex是过渡后的slide索引
{
  on: {
    slideChangeTransitionStart: function(){
      alert(this.activeIndex);
    },
  },
}
```

- slideChangeTransitionEnd(swiper): swiper从一个slide过渡到另一个slide结束时执行

- imagesReady(swiper): 所有内置图像加载完成后执行，同时“updateOnImagesReady”需设置为“true’。

- transitionStart(swiper): 过渡开始时触发
- transitionEnd(swiper): 过渡结束时触发

- touchMoveOpposite(swiper,event): 当手指触碰Swiper并且没有按照direction设定的方向移动时执行。此时slide没有被拖动，这与sliderMove事件相反。

- sliderMove(swiper,event): 回调函数，手指触碰Swiper并拖动slide的过程中不断触发sliderMove函数。

- observerUpdate(swiper): 当observer 功能处于开启状态并监测到元素发生改变（隐藏/显示、增加/删除一级子元素）时执行。可选swiper 实例作为参数。当同一个元素多次改变时，observer 只会在结束时响应一次。例如隐藏元素的同时新增一个他的子元素。如果在不同的元素上监测到变化，则会多次触发。
```js
<script> 
  var mySwiper = new Swiper('.swiper', {
    pagination: {
      el: '.swiper-pagination',
    },
    observer: true, //开启动态检查器
    on: {
      observerUpdate: function(){
        alert('监测到Swiper 更新了');
      }, 
    },
  })
  $('#btn1').click(function(){
    $(".swiper-slide1").remove(); 
    $(".swiper-slide2").remove();
  })
</script>
```

<br><br>

# Swiper: 方法
方法都是通过 swiper实例对象 调用

<br>

### 方法列表:
- mySwiper.slideNext(speed, runCallbacks): 滑动到下一个滑块。
```js
// speed: 可选 num 切换速度(单位ms)
// runCallbacks: boolean	可选	设置为false时不会触发transition回调函数

var mySwiper = new Swiper('.swiper');
$('#btn1').click(function(){
  mySwiper.slidePrev();
})
$('#btn2').click(function(){
  mySwiper.slideNext();
})
```

- mySwiper.slidePrev(speed,runCallbacks): 滑动到前一个滑块。

- mySwiper.slideTo(index, speed, runCallbacks): 控制Swiper切换到指定slide。
```js
// index	num	必选	指定将要切换到的slide的索引
// speed	num	可选	切换速度(单位ms)
// runCallbacks	boolean	可选	设置为false时不会触发transition回调函数
var mySwiper = new Swiper('.swiper');
$('#btn').click(function(){
  mySwiper.slideTo(0, 1000, false);//切换到第一个slide，速度为1秒
})
```

- mySwiper.destroy(deleteInstance, cleanupStyles): 销毁Swiper。销毁所有绑定的监听事件，移除鼠标键盘事件，释放浏览器内存。
```js
// deleteInstance	boolean	可选	设为false则不销毁Swiper对象，默认为true
// cleanupStyles	boolean	可选	设为true则清除所有swiper设定选项和样式，比如direction等，默认为false
var mySwiper = new Swiper('.swiper',{
  autoplay: true,
  keyboard : true,
  mousewheel : true,
  on: {
    click: function(){
      alert('你点了Swiper');
    }
  }
})
mySwiper.destroy(false); //移除所有slide监听事件，所以拖动和click事件失效了。
```

- mySwiper.updateSize(): 这个方法会重新计算Swiper的尺寸。

- mySwiper.updateSlides(): 这个方法会重新计算Slides的数量，当你使用js来删除slide时可能会用到。使用mySwiper.removeSlide来删除slide则会自动计算，无需使用此方法。

- mySwiper.update(updateTranslate): 更新Swiper，就像重新初始化一样。这个方法包含了updateContainerSize，updateSlidesSize，updateProgress，updateClasses方法。

- mySwiper.detachEvents(): 移除所有监听事件

- mySwiper.attachEvents(): 重新绑定所有监听事件

- mySwiper.on(event,handler): 添加回调函数或者事件句柄。
```js
mySwiper.on('click', function(){
  alert('你点了Swiper');
})
```

- mySwiper.off(event): 移除事件的所有句柄

- mySwiper.enable(): 动态启用Swiper（如果已经禁用）。
- mySwiper.disable(): 禁用 Swiper（如果已启用）。当 Swiper 被禁用时，它将隐藏所有导航元素并且不会响应任何事件和交互。

<br><br>

# Swiper: 属性
我们可以通过 swiper的实例对象 访问它身上的属性

<br>

### 属性列表:
- mySwiper.activeIndex: 返回当前活动块(激活块)的索引。
- mySwiper.realIndex: 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将复制的块的数量计算在内。

- mySwiper.previousIndex: 返回上一个活动块的索引，切换前的索引。

- mySwiper.width: 获取swiper容器的宽度
- mySwiper.height: 获取swiper容器的高度。

- mySwiper.params: 重要参数，获取Swiper对象初始化参数，或者重写该参数，如： mySwiper.params.speed = 200。 **不是所有参数都可以重写**。

- mySwiper.slides: 获取Swiper的slides的Dom7/jQuery对象。通过mySwiper.slides[1]获取特定的slide。

- mySwiper.translate: 这个属性可以获取到wrapper的位移，过渡中得到的则是过渡完成时的位移。如需实时位移可以使用 swiper.getTranslate()

- **mySwiper.isBeginning:** 如果Swiper位于最左/上，这个值为true。可以判断是否是开始 或者 是否是最后

- mySwiper.isEnd

- mySwiper.animating: 如果Swiper正在过渡（自由滑动），这个值为true。

- mySwiper.clickedIndex: 返回最后点击Slide的索引。(click)

- **mySwiper.allowSlideNext:** 提示或设置是否允许切换至下一个slide。
```js
var mySwiper = new Swiper('.swiper');
$('#btn1').click(function(){
  mySwiper.allowSlideNext= false;//设置
  alert(mySwiper.allowSlideNext); //提示
})
```

- mySwiper.allowSlidePrev: 设置/提示是否允许切换至前一个slide


<br><br>

# Vue中的基本使用:
- vue2中建议使用 swiper@5
- vue3中建议使用 swiper@7

<br>

## Swiper@7

### 1. 下载
```s
npm i swiper@7
```

<br>

### 2. 组件内引入 swiper 和 样式
```js
import Swiper from "swiper"
import "swiper/css";
```

<br>

### 3. 组件好页面结构
```html
<template>
  <div ref="swiperRef" class="swiper-wrap swiper">
    <div class="swiper-wrapper">
      <!-- 遍历组件数组的时候要使用 component is -->
      <div 
        class="swiper-slide"
        v-for="(item, index) in sliders"
        :key="index"
      >
        <component :is="item.target" />
      </div>
    </div>
  </div>
</template>
```

<br>

### 4. 配置配置对象 和 初始化swiper
```html
<template>
  <!-- 7版本的容器类名为: swiper -->
  <div ref="swiperRef" class="swiper-wrap swiper">

    <!-- slider区域 -->
    <div class="swiper-wrapper">
      <div 
        class="swiper-slide"
        v-for="(item, index) in sliders"
        :key="index"
      >
        <component :is="item.target" />
        
      </div>
    </div>

    <!-- 按钮区域等可以放在swiper-wrapper的外面 -->
    <div class="btn-area">
      <div class="swiper-button-prev prev"></div>
      <div class="swiper-button-next next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper"
import "swiper/css";

import Item1 from "../components/SwiperItem1.vue"
import Item2 from "../components/SwiperItem2.vue"
import Item3 from "../components/SwiperItem3.vue"
export default {
  name: "SwiperTest",
  components: {
    Item1, Item2, Item3
  },
  data() {
    return {
      sliders: [
        { target: Item1, flag: 1 },
        { target: Item2, flag: 1 },
        { target: Item3, flag: 1 },
      ],
      swiperInstance: null,
      swiperOps: {
        autoplay: true
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.swiperInstance = new Swiper(this.$refs.swiperRef, this.swiperOps)
    }
  }

}
</script>
```

<br><br>

## Swiper@5: 非组件版本

### 下载:
```s
npm i swiper@5
```

<br>

### 组件中引入css 和 js
```js
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
```

<br>

### 组件中的html结构:

**注意:**  
当没有数据的时候 轮播图不应该出现
```html
<div 
  v-if="条件"
  ref="swiperRef" 
  class="swiper-wrap swiper-container">
```

```html
<template>
  <!-- 5版本的容器类名为: swiper-container -->
  <div ref="swiperRef" class="swiper-wrap swiper-container">

    <!-- slider区域 -->
    <div class="swiper-wrapper">
      <div 
        class="swiper-slide"
        v-for="(item, index) in sliders"
        :key="index"
      >
        <component :is="item.target" />
        
      </div>
    </div>

    <!-- 按钮区域等可以放在swiper-wrapper的外面 -->
    <div class="btn-area">
      <div class="swiper-button-prev prev"></div>
      <div class="swiper-button-next next"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-wrap {
  position: relative;
  width: 80%;
  height: 80%;

  .btn-area {
    width: 100%;
    background: red !important;
    height: 64px;
    z-index: 99;
  }

  // --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
  // --swiper-navigation-color: #00ff33;/* 单独设置按钮颜色 */
  // --swiper-navigation-size: 30px;/* 设置按钮大小 */
}
</style>
```

<br>

### JS部分:
```js
import Swiper from "swiper"
import "swiper/css/swiper.min.css"

import Item1 from "../components/SwiperItem1.vue"
import Item2 from "../components/SwiperItem2.vue"
import Item3 from "../components/SwiperItem3.vue"
export default {
  name: "SwiperTest",
  components: {
    Item1, Item2, Item3
  },
  data() {
    return {
      sliders: [
        { target: Item1, flag: 1 },
        { target: Item2, flag: 1 },
        { target: Item3, flag: 1 },
      ],
      swiperInstance: null,

      swiperOps: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.swiperInstance = new Swiper(this.$refs.swiperRef, this.swiperOps)
    }
  }

}
```

<br>

### 扩展: 如何修改 navigation 按钮的样式
navigation 按钮中的按钮是通过 after 伪元素设置的
```html
<!-- vuetify图表字体 -->
<div class="btn-area">
  <div class="swiper-button-prev prev">
    <v-icon>mdi mdi-arrow-left</v-icon>
  </div>
  <div class="swiper-button-next next">
    <v-icon>mdi mdi-arrow-right</v-icon>
  </div>
</div>
```

```css
.swiper-button-next:after, .swiper-button-prev:after {
  content: 'prev';
  font-family: swiper-icons;
  font-size: var(--swiper-navigation-size);
  text-transform: none!important;
  letter-spacing: 0;
  text-transform: none;
  font-variant: initial;
  line-height: 1;
}
```

<br>

所以如果我们想要取消按钮的样式 则直接将content设置为"" 就可以
```scss
.btn-area {
  width: 100%;
  height: 64px;

  .swiper-button-prev::after {
    content: "";
  }
  .swiper-button-next::after {
    content: "";
  }
}
```

<br>

### 按钮的样式:
要让 Swiper 导航按钮（如 swiper-button-next）中默认的箭头消失，并自定义其他图标或样式，您可以使用 CSS 来覆盖默认样式。

**方法一：使用 CSS 伪元素来隐藏箭头图标**  
```css
.swiper-button-next::after {
  content: none; /* 隐藏默认箭头图标 */
}
```

<br>

**方法二：使用 background-image 或 background 属性来替换默认图标**  
为 swiper-button-next 元素添加样式，并使用其他图标、背景图像或内容来替换默认图标。例如：

```css
.swiper-button-next {
  background-image: url('path/to/custom-icon.png'); /* 使用背景图像替换图标 */
  /* 或者 */
  /* background: url('path/to/custom-icon.svg') no-repeat center center; */ /* 使用背景图像替换图标 */
  /* 或者 */
  /* background: #ff0000; */ /* 使用其他内容（如纯色背景）替换图标 */
  /* 设置其他样式属性，如宽度、高度等 */
}

```

<br>

### 完整代码:
```html
<template>
  <!-- 5版本的容器类名为: swiper-container -->
  <div ref="swiperRef" class="swiper-wrap swiper-container">

    <!-- slider区域 -->
    <div class="swiper-wrapper">
      <div 
        class="swiper-slide"
        v-for="(item, index) in sliders"
        :key="index"
      >
        <component :is="item.target" />
        
      </div>
    </div>

    <!-- 按钮区域等可以放在swiper-wrapper的外面 -->
    <div class="btn-area">
      <div class="swiper-button-prev prev">
        <v-icon>mdi mdi-arrow-left</v-icon>
      </div>
      <div class="swiper-button-next next">
        <v-icon>mdi mdi-arrow-right</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper"
import "swiper/css/swiper.min.css"

import Item1 from "../components/SwiperItem1.vue"
import Item2 from "../components/SwiperItem2.vue"
import Item3 from "../components/SwiperItem3.vue"
export default {
  name: "SwiperTest",
  components: {
    Item1, Item2, Item3
  },
  data() {
    return {
      sliders: [
        { target: Item1, flag: 1 },
        { target: Item2, flag: 1 },
        { target: Item3, flag: 1 },
      ],
      swiperInstance: null,

      swiperOps: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.swiperInstance = new Swiper(this.$refs.swiperRef, this.swiperOps)
    }
  }

}
</script>

<style lang="scss" scoped>
.swiper-wrap {
  position: relative;
  width: 80%;
  height: 80%;

  .btn-area {
    width: 100%;
    height: 64px;

    .swiper-button-prev::after {
      content: "";
    }
    .swiper-button-next::after {
      content: "";
    }
  }

  // --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
  // --swiper-navigation-color: #00ff33;/* 单独设置按钮颜色 */
  // --swiper-navigation-size: 30px;/* 设置按钮大小 */
}
</style>
```

<br><br>

## Swiper@5: 组件版本

### vue-awesome-swiper 官方文档
```s
https://github.surmon.me/vue-awesome-swiper

# vue2
https://v1.github.surmon.me/vue-awesome-swiper/
```

<br>

### 安装
```s
npm install swiper@5 vue-awesome-swiper@3 --save
```

<br>

### 全局安装
main.js 文件里

```js
import Vue from 'vue'
// 引入VueAwesomeSwiper
import VueAwesomeSwiper from 'vue-awesome-swiper'

// 引入Css在node_module里面找到swiper文件夹里面的css文件

// import style (>= Swiper 6.x) 版本号
import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x) 版本号
import 'swiper/css/swiper.css'

// 注册
Vue.use(VueAwesomeSwiper, /* { 全局组件的默认选项 } */)
Vue.use(VueAwesomeSwiper, [{配置对象}])
```

<br>

### 局部引入
```js
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  }
}
```

<br>

### 创建组件 使用swiper
vue里面swiper的使用方式

<br>

### 要点:
1. 通过v-bind绑定swiper配置

```html
<template>
  <!-- ref 和 options -->
  <swiper 
    ref="mySwiper" 
    :options="swiperOptions">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>

    <div 
      class="swiper-pagination"
      slot="pagination">
    </div>
  </swiper>
</template>

<script>
  export default {
    name: 'MySwiper',
    data() {
      return {
        // swiper的配置项
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'

            // 小圆点可以被点击
             clickable: true

             // 小圆点点击之后 图片还可以正常自动轮播
             disableOnInteraction: false
          },
          // Some Swiper option/callback...
        }
      }
    },

    // 这个计算属性在mounted里面使用的 在这里只是起到了缓存的作用
    // this.$refs.mySwiper.$swiper 我们也可以直接使用它 它身上有很多的属性和方法
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)

      // 这个不写也行好像
      // 3 表示页面打开 默认显示第3张图片
      // 1000 表示滑动的动画在1秒内结束
      // false 设置为false时不会触发transition回调函数
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
```

<br>

### 获取swiper实例:
```js
computed: {
  swiper() {
    return this.$refs.swiperRef.swiper
  }
},

this.swiper 就是实例 它身上有很多的属性和方法
```

<br>

### 绑定事件:
要在 Vue 中使用 vue-awesome-swiper 绑定事件，您可以利用 vue-awesome-swiper 组件提供的自定义事件来实现。

以下是使用 vue-awesome-swiper 绑定事件的一般步骤：

在模板中，使用 v-on 或简写的 @ 符号，将事件绑定到 swiper 组件上。例如，要监听 swiper 的 slideChange 事件，可以编写以下代码：

```html
<swiper @slideChange="handleSlideChange">
  <!-- 其他 swiper-slide 的内容 -->
</swiper>
```

在上述示例中，@slideChange 绑定了 handleSlideChange 方法，表示当 swiper 的 slideChange 事件触发时，将调用 handleSlideChange 方法。

<br>

### ref的作用
- ``<swiper>``在结构中属于父组件
- ``<swiper-slide>``在结构中属于子组件

我们要调用子组件中的属性或者dom的时候就要使用ref

<br>

### **<font color='#C2185B'>slideTo()</font>**
控制Swiper切换到指定slide

```s
# 上面的方式是swiper中的一些方法
https://www.swiper.com.cn/api/methods/109.html
```

<br>

### 场景
通过该方法可以 点击小圆点 控制 切换到第几张 1代表第一张 不是从0开始的那种

<br><br>

## 扩展: 模块
我们的 navigation 都算是swiper中的模块 当我们要使用 这些模块的时候 我们需要进行如下的操作

<br>

### 使用方式:
1. 各个按钮部分处 外部不能再包其它的div结构 只能如下的写法
2. 从 vue-awesome-swiper 中引入组件的时候 @3 是小写开头 @4 是大写开头

```js
// @3.x 版本的 ---- 引入模块时使用小写
js import { swiper, swiperSlide } from "vue-awesome-swiper";
// @4.x 版本的 ---- 引入模块时使用大写
js import { Swiper, SwiperSlide } from "vue-awesome-swiper";
```
```html
<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
    <swiper-slide>Slide 10</swiper-slide>
    <!-- 这里不能再包裹外部结构 -->
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
  // @3版本要小写开头
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'swiper-example-navigation',
    title: 'Navigation',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './base.scss';
</style>
```

<br>

### Demo代码:
```html
<template>
  <!-- 组件版本: 使用了 vue-awesome-swiper@3 -->
  <swiper ref="swiperRef" class="swiper-wrap swiper" :options="swiperOps">
    <swiper-slide
      v-for="(item, index) in sliders"
      :key="index"
    >
      <component :is="item.target" />
    </swiper-slide>
    <div class="swiper-button-prev prev" slot="button-prev">
    </div>
    <div class="swiper-button-next next" slot="button-next">
    </div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import "swiper/css/swiper.min.css"

import Item1 from "../components/SwiperItem1.vue"
import Item2 from "../components/SwiperItem2.vue"
import Item3 from "../components/SwiperItem3.vue"

export default {
  name: "SwiperTest",
  components: {
    Item1, Item2, Item3,
    swiper, swiperSlide
  },
  data() {
    return {
      sliders: [
        { target: Item1, flag: 1 },
        { target: Item2, flag: 1 },
        { target: Item3, flag: 1 },
      ],
      swiperInstance: null,

      swiperOps: {
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    }
  },
  mounted() {
    //this.init()
  },
  methods: {
    // init() {
    //   this.swiperInstance = new Swiper(this.$refs.swiperRef, this.swiperOps)
    // }
  }

}
</script>

<style lang="scss" scoped>
.swiper-wrap {
  position: relative;
  width: 80%;
  height: 80%;

  .btn-area {
    width: 100%;
    height: 64px;

    .swiper-button-prev::after {
      content: "";
    }
    .swiper-button-next::after {
      content: "";
    }
  }

  // --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
  // --swiper-navigation-color: #00ff33;/* 单独设置按钮颜色 */
  // --swiper-navigation-size: 30px;/* 设置按钮大小 */
}
</style>
```