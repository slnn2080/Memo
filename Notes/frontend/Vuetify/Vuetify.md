### Vuetify
- 它是建立在vue上的完备的界面框架 
- Vuetify采用移动优先的设计，这意味着无论是在手机、平板电脑还是台式电脑上，你的应用程序都可以开箱即用。


- 优势
- vuetify几乎不需要任何的css代码 而element ui许多布局样式需要我们来编写

- vuetifu从底层构建起来的语义化组件 简单易学 容易记住
- vuetify基于md(谷歌推出的多平台设计规范) 更加的美观 动画效果酷炫 且风格统一


### 安装

> vue创建项目同时载入vuetify
- 1. vue create app
<!-- 
  不要默认default 选择M开头的 手动配置
 -->

- 2. cd app
- 3. vue add vuetify
<!-- 
  // 注意
  此命令将更改你的项目模板文件、组件文件夹、vue.config.js 等。 
  如果您通过 Vue-CLI 安装 Vuetify，
  
  请确保已经提交您的代码以避免任何潜在的数据丢失。 在安装过程中选择高级安装选项可以跳过模板更改。
 -->

<!-- 
//plugins
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
- 注册完vuetify后全局就会多了 $vuetify 对象 我们可以通过this调用修改里面的特性

export default new Vuetify({
});


// main.js
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

据说使用vue add方式添加的会重写一些东西 小心备份
 -->


> 现有的项目中添加vuetify
- 1. npm i vuetify -S
- 2. vuetify的引用
    - 导入vuetify包
    - 导入css文件
<!-- 
  // main.js
  import Vue from 'vue'
  import Vuetify from "vuetify"

  Vue.use(Vuefify)
  import "vuetify/dist/vuetify.min.css"
 -->


> 安装字体
- Vuetify 使用 Google’s Roboto 字体 和 Material Design 图标。 最简单的安装方法是在你的 index.html 中加入他们的 CDN
<!-- 
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
 -->


> 安装 sass相关
- npm install sass@~1.32 sass-loader deepmerge -D
- sass版本不要太高 不然会报错


> nuxt 下安装
- 1. npm install @nuxtjs/vuetify -D
- 2. 更新你的 nuxt.config.js 文件
<!-- 
// nuxt.config.js
{
  buildModules: [
    // 简单使用
    '@nuxtjs/vuetify',

    // 和选项一起
    ['@nuxtjs/vuetify', { /* 模块选项 */ }]
  ]
}
 -->


> html直接测试
- 不用脚手架 直接在浏览器端测试的情况下
<!-- 
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>
<body>
  <div id="app">
    <v-app>
      <v-main>
        <v-container>Hello world</v-container>
      </v-main>
    </v-app>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
  <script>
    new Vue({
      el: '#app',
      vuetify: new Vuetify(),
    })
  </script>
</body>
</html>
 -->

---------------

### 教程开始
**注意：**
- vuetify的组件必须放在v-app里面才会起效果
<!-- 
  <v-app>
    <v-btn color="success">成功</v-btn>
  </v-app>
 -->

---------------

### Vuetify中的轮播
- 我们先看看基本使用
```html
<template>
  <v-carousel v-model="model">
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
    >
      <v-sheet
        :color="color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            Slide {{ i + 1 }}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>
```


> v-carousel 身上的属性
- 


---------------

### Vuetify中的栅格系统
- 这里我们主要讲3个方面 布局 -- 表格 -- 表单

- 栅格系统是基于弹性盒子flex
- https://vuetifyjs.com/zh-Hans/layout/grid

- vuetify具有一个12点的栅格系统 它使用 flex-box 构建 栅格用于布局应用程序的内容 包含5种类型的媒体断点

- 用于定位特定的屏幕大小或方向 栅格组件的属性实际上是从它们定义的属性派生的类
- 我们可以将这些辅助类指定为属性 在任何类中都可以使用

- 栅格系统:
- 如果一行分为12份 如果这一行中只有一个元素 那么它就占12份


> 栅格系统中主要的3个标签
- 1. <v-container>
- 表示一个容器 可以想象成table
- max-width:900px
- 居中
- 同时有padding:12px


- 2. <v-row>
- 表示一行 相当于tr

- 3. <v-col>
- 表示一列 相当于td

> 单行单列布局
- 如果一行中只有一列 就属于 单行单列布局
<!-- 
  <!-- 布局容器 相当于table ->
  <v-container>
    
    - 容器中的一行 行元素 相当于tr
    <v-layout>
      
      - 容器中的一列 列元素 相当于td
      <v-flex>

        - 内容区
        <v-card color="yellow">
          单行单列布局
        </v-card>

      </v-flex>

    </v-layout>
  </v-container>
 -->

> 响应式
- xs    < 600px           小型号到大型号的手机
- sm    600px > < 900px   小型号到中型号的平板
- md    960px > < 1264px  大型号平板到手提电脑
- lg    1264px > < 1904px 桌面端
- xl    > 1904px          4k


### <v-container 属性>
- 比如 我们说container是一个table 那我们要让table居中对齐怎么操作？ 
- 比如 我们让每一列 每一行 中间有间隙？

> fluid
- 在使用v-container的时候 默认是max-width: 900px 居中
- 当我们设置这个属性之后 就是流式布局
- width: 100%
- 居中
- padding: 12px



### <v-row 属性>
- 正常我们在使用 v-row 标签的时候 它的四周会有padding:12px

> no-gutters
- 取消行间距和列间距 也就是说将padding设置为0

> dense
- 减少行间距和列间距 由 12px 减少为 4px

> align
- align-items属性
- 可选值:
  start, center, end, baseline 和 stretch

> align-content
- align-content属性
- 可选值
  start, center, end, space-between, space-around 和 stretch。

> align-content-[sm, md, lg, xl]
- 当在对应屏幕大小的时候 再去改变 align-content 属性

> align-[sm, md, lg, xl]
- 当在对应屏幕大小的时候 再去改变 align-items 属性

> justify
- 可选值
- start, center, end, space-between 和 space-around。

> justify-[sm, md, lg, xl]
- 当在对应屏幕大小的时候 再去改变 justify-content 属性


### <col 属性>
- 考虑 xs 断点已经被删除的情况， 这将会影响到 offset、justify、align 和 v-col 上的断点属性。

- 超出 12 会换行


> align-self
- 更改该列自己的对齐方式
- 可选值
  start, center, end, auto, baseline 和 stretch。

> cols="1-12"
- 该列的默认宽度
- 使用该属性 代替 xs 也就是默认情况下就是xs

> [sm md lg xl]="str / num"
- 在lg屏幕下改变当前列占的份数
<!-- 
  <v-col md=8>
 -->

**这里也可以使用 class="col-xs-1" 来控制**


> offset="str / num"
- 设置列的默认偏移量。
- 本身是2 向右偏移10

- 当右侧有元素的时候 它不会覆盖而是挤走右侧元素
- 不能是负数
<!-- 
  <v-col cols=2 offset=10>
 -->

> offset-[sm md lg xl] = "str / num"
- 在指定的屏幕尺寸下 该列偏移多少

> order="str / num"
- 修改该列的顺序
- 排序从1开始

> order-[sm md lg xl] = "str / num"
- 在指定的屏幕尺寸下 该列的顺序是多少


### <v-spacer>
- 该标签分配剩余宽度 用在标签之间 该标签会将其它标签往它的两侧挤走


### 边框
- 默认的div是有一个圆角的 我们可以通过预定义类改变圆角的形态

- 使用预定义类可以改变盒子的圆角情况
- 中缀符 sm , lg 和 xl 与边框半径 size 相关，不受断点的影响。

> class="rounded-[value]"
- value的可选值有
- circle
- pill
- xl
- lg
- md
- sm
- 0
<!-- 
  rounded-0 移除 元素所有的半径或按边角选择的半径
  还可以移除一个角的圆角
      rounded-t-0
      rounded-r-0
      rounded-b-0
      rounded-l-0
      rounded-tl-0
      rounded-tr-0
      rounded-br-0
      rounded-bl-0
 -->


### 颜色
- 我们在class中直接写 颜色的英文名就是背景颜色 后面--text 就是文本颜色
> class="red"
> class="red--text"
<!-- 
  <div class="box rounded-0 pink--text">test</div>

  pink lighten-5--text  这种情况好像不好用s
 -->


### 海拔

> class="elevation-n"
- 控制两平面之间沿 z 轴方向的相对深度，或者说距离。 总共有25个高度。 您可以通过使用 elevation-{n}类设置元素的海拔， 其中 n 是0-24之间与所需海拔对应的整数。 

<!-- 
  <div class="elevation-10"></div>
 -->

### 文本的对齐方式
- 使用预定义类

> class="text-[left center rigth]"
> class="text-[sm md lg xl]-[left center rigth]"
- 指定屏幕尺寸下 文本的对齐方式


> class="text-no-wrap"
- 不让文本换行


### 显示 与 隐藏
- 通过改变 display 的值 来控制元素的显示和隐藏
- vuetify中也设定的预定义类

> class="d-[value]"   手机屏下
> class="d-[sm md lg xl]-[value]"
- 在指定的屏幕尺寸下 display的值为什么
- value的可选值为
- none
  inline
  inline-block
  block
  table
  table-cell
  table-row
  flex
  inline-flex

<!-- 
  <v-col cols="8" class="d-none d-md-block d-sm-block">
 -->

**注意：**
- 当我想设置 手机的时候隐藏的时候 单独写 d-none 哪个尺寸下都会隐藏
- 只有指定其它屏幕尺寸下的样式时 才能够达到理想的效果
- 感觉就是用其它尺寸的样式去覆盖xs时的样式


> class="d-flex"
- 给指定元素设置弹性盒子
- .d-flex
  .d-inline-flex
  .d-sm-flex
  .d-sm-inline-flex
  .d-md-flex
  .d-md-inline-flex
  .d-lg-flex
  .d-lg-inline-flex
  .d-xl-flex
  .d-xl-inline-flex

- 我们还可以指定什么屏幕尺寸的时候 设置为弹性盒子


> class="d-flex flex-row"
- .flex-row 改变元素的排列方向
- .flex-column
- .flex-reverse
<!-- 
  <div class="box d-flex flex-column">

  .flex-row
  .flex-row-reverse
  .flex-column
  .flex-column-reverse
  .flex-sm-row
  .flex-sm-row-reverse
  .flex-sm-column
  .flex-sm-column-reverse
  .flex-md-row
  .flex-md-row-reverse
  .flex-md-column
  .flex-md-column-reverse
  .flex-lg-row
  .flex-lg-row-reverse
  .flex-lg-column
  .flex-lg-column-reverse
  .flex-xl-row
  .flex-xl-row-reverse
  .flex-xl-column
  .flex-xl-column-reverse
 -->


> .justify-[start end center space-between space-acound]
- 使用该类将设置盒子中元素的对齐方式
<!-- 
  .justify-start
  .justify-end
  .justify-center
  .justify-space-between
  .justify-space-around
  .justify-sm-start
  .justify-sm-end
  .justify-sm-center
  .justify-sm-space-between
  .justify-sm-space-around
  .justify-md-start
  .justify-md-end
  .justify-md-center
  .justify-md-space-between
  .justify-md-space-around
  .justify-lg-start
  .justify-lg-end
  .justify-lg-center
  .justify-lg-space-between
  .justify-lg-space-around
  .justify-xl-start
  .justify-xl-end
  .justify-xl-center
  .justify-xl-space-between
  .justify-xl-space-around
 -->


> .align-[start end center baseline stretch]
<!-- 
  .align-start
  .align-end
  .align-center
  .align-baseline
  .align-stretch
  .align-sm-start
  .align-sm-end
  .align-sm-center
  .align-sm-baseline
  .align-sm-stretch
  .align-md-start
  .align-md-end
  .align-md-center
  .align-md-baseline
  .align-md-stretch
  .align-lg-start
  .align-lg-end
  .align-lg-center
  .align-lg-baseline
  .align-lg-stretch
  .align-xl-start
  .align-xl-end
  .align-xl-center
  .align-xl-baseline
  .align-xl-stretch
 -->


> .align-self-[start end center baseline auto stretch]
<!-- 
  .align-self-start
  .align-self-end
  .align-self-center
  .align-self-baseline
  .align-self-auto
  .align-self-stretch
  .align-self-sm-start
  .align-self-sm-end
  .align-self-sm-center
  .align-self-sm-baseline
  .align-self-sm-auto
  .align-self-sm-stretch
  .align-self-md-start
  .align-self-md-end
  .align-self-md-center
  .align-self-md-baseline
  .align-self-md-auto
  .align-self-md-stretch
  .align-self-lg-start
  .align-self-lg-end
  .align-self-lg-center
  .align-self-lg-baseline
  .align-self-lg-auto
  .align-self-lg-stretch
  .align-self-xl-start
  .align-self-xl-end
  .align-self-xl-center
  .align-self-xl-baseline
  .align-self-xl-auto
  .align-self-xl-stretch
 -->

> class="align-content-space-around"
<!-- 
  align-content-start
  align-content-end
  align-content-center
  align-content-space-between
  align-content-space-around
  align-content-stretch
  align-sm-content-start
  align-sm-content-end
  align-sm-content-center
  align-sm-content-space-between
  align-sm-content-space-around
  align-sm-content-stretch
  align-md-content-start
  align-md-content-end
  align-md-content-center
  align-md-content-space-between
  align-md-content-space-around
  align-md-content-stretch
  align-lg-content-start
  align-lg-content-end
  align-lg-content-center
  align-lg-content-space-between
  align-lg-content-space-around
  align-lg-content-stretch
  align-xl-content-start
  align-xl-content-end
  align-xl-content-center
  align-xl-content-space-between
  align-xl-content-spacearound
  align-xl-content-stretch
 -->


### 收缩伸展系数
- 预定义类
<!-- 
  flex-grow-0
  flex-grow-1
  flex-shrink-0
  flex-shrink-1

  flex-sm-grow-0
  flex-md-grow-0
  flex-lg-grow-0
  flex-xl-grow-0
  flex-sm-grow-1
  flex-md-grow-1
  flex-lg-grow-1
  flex-xl-grow-1
  flex-sm-shrink-0
  flex-md-shrink-0
  flex-lg-shrink-0
  flex-xl-shrink-0
  flex-sm-shrink-1
  flex-md-shrink-1
  flex-lg-shrink-1
  flex-xl-shrink-1
 -->

### flex 换行
- 使用预定义类 达到换行的目的
.flex-nowrap
.flex-wrap
.flex-wrap-reverse

<!-- 
  .flex-sm-nowrap
  .flex-sm-wrap
  .flex-sm-wrap-reverse
  .flex-md-nowrap
  .flex-md-wrap
  .flex-md-wrap-reverse
  .flex-lg-nowrap
  .flex-lg-wrap
  .flex-lg-wrap-reverse
  .flex-xl-nowrap
  .flex-xl-wrap
  .flex-xl-wrap-reverse

 -->


### 排序
- 也是使用预定义类
- 您可以使用 order 工具类改变 flex 项目的视觉排序.
<!-- 
  .order-first
  .order-0
  .order-1
  .order-2
  .order-3
  .order-4
  .order-5
  .order-6
  .order-7
  .order-8
  .order-9
  .order-10
  .order-11
  .order-12
  .order-last
  .order-sm-first
  .order-sm-0
  .order-sm-1
  .order-sm-2
  .order-sm-3
  .order-sm-4
  .order-sm-5
  .order-sm-6
  .order-sm-7
  .order-sm-8
  .order-sm-9
  .order-sm-10
  .order-sm-11
  .order-sm-12
  .order-sm-last
  .order-md-first
  .order-md-0
  .order-md-1
  .order-md-2
  .order-md-3
  .order-md-4
  .order-md-5
  .order-md-6
  .order-md-7
  .order-md-8
  .order-md-9
  .order-md-10
  .order-md-11
  .order-md-12
  .order-md-last
  .order-lg-first
  .order-lg-0
  .order-lg-1
  .order-lg-2
  .order-lg-3
  .order-lg-4
  .order-lg-5
  .order-lg-6
  .order-lg-7
  .order-lg-8
  .order-lg-9
  .order-lg-10
  .order-lg-11
  .order-lg-12
  .order-lg-last
  .order-lg-first
  .order-xl-0
  .order-xl-1
  .order-xl-2
  .order-xl-3
  .order-xl-4
  .order-xl-5
  .order-xl-6
  .order-xl-7
  .order-xl-8
  .order-xl-9
  .order-xl-10
  .order-xl-11
  .order-xl-12
  .order-xl-last
 -->




### margin padding
- 通过缩写的预定类指定 内外边距

> 内外边距
> p or m[a x y s e t b l r]-[0-16]
- 0-16 以4px为增量控制间距属性

<!--  
  t - 应用 margin-top 和 padding-top 的间距
  b - 应用 margin-bottom 和 padding-bottom 的间距
  l - 应用 margin-left 和 padding-left 的间距
  r - 应用 margin-right 和 padding-right 的间距

  s - 应用 margin-left/padding-left (LTR模式) 和 margin-right/padding-right(RTL模式) 的间距

  e - 应用 margin-right/padding-right (LTR模式) 和 margin-left/padding-left(RTL模式) 的间距
  
  x - 应用 *-left 和 *-right 的间距
  y - 应用 *-top 和 *-bottom 的间距
  a - 在所有方向应用该间距
 -->



> 预定义类 .mr-[auto 1-16]
- margin-right





### v-row
> 弹性盒子 - 标签属性: 
- align-center
- align-end
- align-start
- align-space-around
- align-space-between

- jusity-center
- jusity-end
- jusity-start
- jusity-space-around
- jusity-space-between

- row     横向排列
- column  纵向排列

- Nothing 默认值


















### 特性
- Vuetify 支持 RTL (从右至左) 语言，可以通过使用 rtl 选项在程序启动时激活。

<!-- 
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  rtl: true,
})
 -->

- this.$vuetify.rtl = true
<!-- 
<template>
  <v-app>
    ...
  </v-app>
</template>

<script>
  export default {
    methods: {
      changeRTL () {
        this.$vuetify.rtl = true
      },
    },
  }
</script>
 -->





> 布局
- Vuetify有两个主要布局组件， v-app 和 v-main。 v-app 组件是您的应用程序的根节点，直接替换默认的 Vue 入口<div id="app">。 
- 根节点，直接替换默认的 Vue 入口<div id="app">。 v-main 组件是替换 main HTML 元素和您应用程序的根节点 内容 的语义替代。
<!-- 
  <v-app>
    <v-main>
      Hello World
    </v-main>
  </v-app>
 -->



### 技巧 json-server全攻略
- 一个在前端本地运行，可以存储json数据的server。

- 1. npm install -g json-server

- 2. 首先准备一个json文件，如：db.json
<!-- 
  {

    "data1": [{
        "id": "001",
        "name": "Sherry",
        "age": 24,
        "friends": [{
            "id": "100",
            "name": "friend1"
        }, {
            "id": "200",
            "name": "friend2"
        }]
    }, {
        "id": "002",
        "name": "Addy",
        "age": 26
    }],
    "data2": {
        "id": "003",
        "name": "Jack",
        "age": 25
    },
    "data3": [{
        "id": "004",
        "name": "Rebeca",
        "age": 27
    }]
}

 -->

- 3. 使用全局json-server命令，启动mock服务。这个mock服务，管理的数据，就是db.json。
- $ json-server --watch --port 3001 db.json

- 4. 使用json-server支持的功能，尝试进行数据访问
- http://localhost:3001/db

- https://www.jianshu.com/p/9cfc5cdb0aeb
- 没事看看
