### Swiper
- https://www.swiper.com.cn/
- npm install swiper

> 下载压缩包的形式
- 我们只需要压缩包中的 <dist> 文件夹

> html中的基本使用
- 1. 引入css和js文件
- 2. 然后复制DOM结构 以及JS部分
<!-- 
  添加HTML内容。
  Swiper7的默认容器是   '.swiper'，
  Swiper6之前是        '.swiper-container'。
 -->

```js
import Swiper from 'swiper';    
var mySwiper = new Swiper('.swiper', { /* ... */ });
```

> 基本示例:
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
<script>
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

> swiper的结构说明
- 是否需要滚动条
- <div class="swiper-scrollbar"></div>

- 如果不需要可以删了 容器内的滚动条就没了

---

- 是否需要导航按钮
- <div class="swiper-button-prev"></div>
- <div class="swiper-button-next"></div>

- 下面的小点点

---

- 是否需要分页器
- <div class="swiper-pagination"></div>

--- 

- 代表每一个item
- <div class="swiper-slide">Slide 1</div>



> 修改样式：
- 1. 可以直接使用 swiper 中提供的类名来修改
- 2. 为了解决权重问题 可以直接复制swiper的全部类名

> JS部分的说明
> 创建swiper实例
- 默认不是自动循环
```js
let swiper = new Swiper(外层容器css选择器, {配置项})
```
- 如果需要创建多个swiper 那就要创建对应的多个实例来管理


> 配置项说明
- https://www.swiper.com.cn/api/parameters/17.html

- 1. nitialSlide
- 设定刷新页面时显示哪个图片 也就是设定初始化时的slide的索引
```js
{
  nitialSlide: 0
}
```

- 2. direction
- 控制滑动方向
```js
{
  direction: "horizontal"  //默认
  direction: "vertical"  //默认
}
```

- 3. speed
- item的滑动的速度 从开始到结束的时间 毫秒
```js
{
  speed: 300
}
```

- 3. loop
- 设置为true 开启循环滑动的模式 默认是false
```js
{
  loop: true
}
```

- 4. autoplay
- 设置为true的时候 启动自动切换 并使用默认的切换设置
- 默认停留3秒
```js
{
  autoplay: true
}
```

- 将autoplay的值修改为对象 可以设置自动切换的功能
```js
{
  autoplay: {
    // 每个item的停留时间
    delay: 1000,
  }
}
```


> 分页器的说明
- 默认分页器的类型是原点

- https://www.swiper.com.cn/api/pagination/362.html

- 配置项
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


> 切换效果
- https://www.swiper.com.cn/api/effects/193.html


> 点击图片局部放大
- https://www.swiper.com.cn/api/zoom/311.html

- 在使用Zoom的时候 我们要创建一个容器来进行包裹
<div class="swiper-slide"> 
  <div class="swiper-zoom-container"> 
    <!-- 缩放图片 -->
    <img src="path/to/image"> </div> 
</div>


### Vue中swiper的使用
- 安装
- npm install swiper vue-awesome-swiper --save

> 全局安装
- main.js 文件里

- 引入VueAwesomeSwiper
- import Vue from 'vue'
- import VueAwesomeSwiper from 'vue-awesome-swiper'

- 引入Css
- 在node_module里面找到swiper文件夹里面的css文件

- import style (>= Swiper 6.x) 版本号
- import 'swiper/swiper-bundle.css'

- import style (<= Swiper 5.x) 版本号
- import 'swiper/css/swiper.css'

- 注册
- Vue.use(VueAwesomeSwiper, /* { 全局组件的默认选项 } */)


> 局部引入
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
  },
  directives: {
    swiper: directive
  }
}
```


> 创建组件 使用swiper
- vue里面swiper的使用方式

```js
<template>
  // ref 和 options
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

- ref的作用
- <swiper>在结构中属于父组件
- <swiper-slide>在结构中属于子组件
- 我们要调用子组件中的属性或者dom的时候就要使用ref


- slideTo()
- 控制Swiper切换到指定slide。
- https://www.swiper.com.cn/api/methods/109.html
- 上面的方式是swiper中的一些方法

- 场景
- 通过该方法可以 点击小圆点 控制 切换到第几张

- 1代表第一张 不是从0开始的那种

----------------

### vue-awesome-swiper
- 这个插件是依托于swiper来实现的

> 安装
- npm i vue-awesome-swiper swiper --save

> 全局注册
```js
// main.js
import Vue from "vue"
import VueAwesomeSwiper from "vue-awesome-swiper"

import "swiper/css/swiper.css"

Vue.use(VueAwesomeSwiper, [{配置对象}])
```


> 局部注册
```js
import {Swiper, SwiperSlide, direcive} from "vue-awesome-swiper"

import "swiper/css/swiper.css"

export default {
  components: {Swiper, SwiperSlide},
  data() {
    return {
      swOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    }
  }
}
```

> 前端模板
```html
<template>
  <swiper ref="sw" :options="swOption">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
  </swiper>

  <div class="swiper-pagination" slot="pagination"></div>
</template>
```