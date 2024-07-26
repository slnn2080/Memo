
# 项目开发 - tabbar引入和项目模块划分
我们引入上面开发好的tarbar 将tarbar的文件夹整体的拿过来
在html中的src等使用别名的话 前面要加上 ~
```js 
// 包括组件中的 style 标签内
@import '~assets/css/iconfont/iconfont.css';
```

我们将这个tabbar导入到app.vue文件中

<br>

### 网页 icon 图标的修改
我们把新的icon复制粘贴到我们自己的项目的public文件夹内就可以
```html 
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

<br>

### ``<%= BASE_URL %>``
获取当前文件所在的路径 在当前所在的路径取找icon 这个是jsp语法 为了动态的获取文件的路径

也不用担心jsp语法会不会被html识别, 因为我们最终会进行打包 publick这个文件夹(相当于static文件夹)最终会原封不动的复制到dist里面

打包的时候会以public文件夹里的html位置作为模板来打包 并不会出现jsp的语法

<br><br>

# 项目开发 - 首页导航栏的封装的使用
我们观察到这个项目 navbar 的部分, 每个分类中的 navbar 的部分样式都不一样, 有的页只有标题 有的页还有选项卡和箭头, 所以我们也要把导航栏封装成一个独立的组件 使用slot

<br>

### NavBar.vue 中 封装 nav-bar
我们要给整体设置下样式, 这样别人在调用的时候就可以直接使用
我们对整个组件进行些布局, 因为左右插槽需要在两侧, 剩下宽度给中间的插槽 那就势必要用到css样式

再给插槽写css样式的时候 我们要把slot套一层div 属性要写在div上, 因为插槽slot会被替换掉的

```html 
<template>
  <div class='nav-bar'>
    <div class='left'><slot name='left'></slot></div>
    <div class='center'><slot name='center'></slot></div>
    <div class='right'><slot name='right'></slot></div>
  </div>
</template>
```

<br>

### NavBar.vue的使用
我们看看封装好的组件会在各个页面中使用, 下面我们说下在 home.vue 文件中调用
```html
<template>
  <div id='home'>
    <nav-bar>

      <!-- 具名插槽的时候 要使用<template #插槽的名字> -->
      <template #center>
        <span>购物车</span>
      </template>

    </nav-bar>
  </div>
</template>
```

<br>

home.vue文件中设置nav-bar的背景颜色   

我们不能在NavBar.vue文件中设置导航条的背景颜色, 因为在这里设置后组件被调用的时候就会是默认色了 所以这里我们给 <组件> 上设置一个class 通过class给组件设置背景色
```html
<template>
  <div id='home'>

    <!-- 这里我们给 <nav-bar class='home-nav'> 设置了class  -->
    <nav-bar class='home-nav'>
      <template #center>
        <span>购物车</span>
      </template>
    </nav-bar>

  </div>
</template>


<style scoped>
  .home-nav {
    background:var(--color-tint);
    color:#fff;
  }
</style>
```

<br>

### 调试
1. 先利用f12中的vue 看看组件有没有被添加进来
2. 在去elements看看结构

<br><br>

# 首页开发 - 请求首页的多个数据
首页的导航栏我们已经封装完了, 接下来该下面的一个结构, 该轮播图了  

但是在做轮播图之前, 我们要先把轮播图的数据先请求过来, 因为即使把轮播图做好 没有数据也办法进行展示

实际开发中的逻辑  

应该先获取数据 然后再根据数据进行展示比较好, 也有种情况是公司服务器还没有开发完呢 可能还没有数据 这时候只能按照模拟的数据先把东西做好

正常的逻辑就是 我们都是从服务器拿到数据 然后根据数据来创建对应标签


1. 在network文件夹中创建 关于请求相关的request.js文件 这里我们还是需要拦截器的 因为要对请求回来的data做一步转化来返回出去 

```js
import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}

```

2. 创建 组件.js 文件 将组件中关于网络请求的事情 都在这个js文件操作 上面封装好了 网络请求后 我们要开发发送网络请求了, 接下来我们home页要发送请求

request.js文件是我们自己封装的, 我们所有的组件都是面向request.js发送请求, 这样不用担心换框架的问题

但是 实际开发中 不会在 home.vue 文件中 调用request() 发送请求 而是在network文件夹中 创建 home.js 文件

network 文件夹中 文件的结构
这样关于home页的请求 都在home.js文件中
```
| - network
  - request.js
  - home.js     跟首页相关的网络请求
```

<br>

这样封装的优点, 因为首页不仅仅是一个请求可能有多个请求 如果在home.vue文件中使用request.js是请求数据

当请求的地方很多的话, 请求的代码就会和组件内部的逻辑代码混合在一起 不方便管理 我们可以将所有关于首页的请求, 都封装在这个js文件中 做一个统一的管理 比如以后我要改哪个请求的url 直接在这个文件里修改就可以了

```js 
import {request} from './request'

// 获取首页的多个数据
export function getHomeMultidata() {

  // 将请求的数据直接return出去
  return request({
    url:'/home/multidata'
  })
}
```

<br>

我们要在首页中发送网络请求, 那什么时候发送网络请求呢? 

组件一旦创建好的时候发送网络请求 请求数据用于展示  所以我们要使用生命周期函数

```js
created() {

  在这里使用我们封装的home.js文件中额方法 发送请求

}
```

```js 
created() {

  // 这个函数内部返回的是 promise 所以我们可以通过then()方法 获取响应回来的数据
  getHomeMultidata().then(res => {

    // res 就是我们请求回来的数据

  })
}
```

<br>

### 要点:
因为函数的关系(函数调用完毕后内部的变量就会被销毁), 我们要将获取到的数据保存在组件的data中

```js 
  data() {
    result: null
  },

  created() {
    getHomeMultidata().then(res => {
      this.result = res
    })
  }
```

<br>

**原因:**  
函数调用完毕后内部的变量就会被销毁 res = { }   
res是函数中的变量, 当函数调用完毕后 变量 res 就会被销毁 那就说明没有指针指向{}, 那么{}因为没有指针指向它最终会被垃圾回收掉

this.result = res 引用类型的赋值 给result的是地址值, 说明即使res在函数调用后会被销毁但是{}还有result指向 所以{}不会被垃圾回收

<br>

获取能直接使用的数据   
上面的 then(res => { }) res是整体的数据, 里面包含了很多部分的数据 为了方便使用 我们要将res中的数据 分别提取出来, 方便使用
```js 
this.banners = res.data.banner.list
this.recommends = res.data.recommend.list
```

<br>

注意异步同步的问题  
```js 
created() {
  getHomeMultidata().then(res => {
    this.result = res

    // 在这里验证result可能获取不到 因为这个console是同步, 整个获取数据的过程是异步 所以console会在获取数据之前被打印
    console.log(result)
  })
}
```

<br>

### 完整代码
```js 
data() {
  return {
    banners: [],
    recommends:[]
  }
},
created() {
    this.banners = res.data.banner.list
    this.recommends = res.data.recommend.list
  }
)
```

<br><br>

# 首页开发 - 轮播图的展示
上面的章节 我们已经从服务器上获取到了数据 接下来我们要将数据展示到页面上  

我们需要封装一个组件, 然后进行展示
```js 
// 轮播图老师没有做而是将他自己做好的组件 复制到了我们的项目
// 老师创建了两个组件 将两个组件放在了一个index.js文件导出 方便统一导出了统一引入

import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

export {
  Swiper, SwiperItem
}

// 这样写的好处是 正常我们要是在组件中使用这个轮播图 我们需要引入两个组件
import Swiper from ''
import SwiperItem from ''

// 但是如果是通过整合到一起的 index.js 的话 写一次就好了
import { Swiper, SwiperItem } from ''
```

<br>

上面那节 我们将从服务器请求过来的数据 存到了data中的变量里
```js 
banner:[{}, {}, {}, {}]

// 每一个{}都是关于图片的信息, 每一个对象中有
image: '图片地址'
link: '点击图片跳转到哪里的地址'
title: '这张图片的title'
```

<br>

### 老师封装的轮播图的组件的使用
没事可以自己看看老师是怎么写的 将组件在 home.vue 文件中调用
```html
<swiper>
  <swiper-item 
    v-for='(item,index) of banners' 
    :key='index'
  >
    <a :href="item.link">
      <img :src="item.image">
    </a>
  </swiper-item>
</swiper>
```

<br>

### 要点:
1. 我们从服务器请求过来的数据, 要根据请求回来的数据, 动态生成结构, 所以我们使用 v-for(哪个结构要重复就在哪个结构上使用v-for)
  
2. 给属性动态的绑定值的时候 我们使用 v-bind 只要是组件data里面的属性都能获取到

<br>

### swiper部分的抽取
每一个页面的组件 主要负责将所有的组件 集成在一起, 不然所有的内容都在home.vue中 这个页面的代码量会越来越多不方便管理

所以我们将swiper的部分也拿出来, 我们在每一个页面的文件夹内 再创建一个子组件文件夹
```
| - views
  | - home
    | - childComps  home大页面中的子组件都放在这里
```

这样 Home.vue 文件里的结构会非常的清晰

```html 
<!-- Home.vue -->
<template>
  <div id='home'>

    <!-- 下面的tabbar的结构 -->
    <nav-bar class='home-nav'>
      <template #center>
        <span>购物车</span>
      </template>
    </nav-bar>

    <!-- swiper的结构 这样home.vue不用管swiper内部是怎么实现的 只需要给这些小组件整合到一起就好 -->
    <home-swiper :banners='banners'></home-swiper>
  </div>
</template>
```  

<br>

### 流程
1. 我们在home文件夹下创建了一个childComps文件夹 用于放跟home相关的子组件 在这里我们创建了 HomeSwiper.vue组件

2. 在 HomeSwiper.vue 组件中引入两个轮播的组件, 并注册
```js 
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  }
}
```

3. 因为数据在home.vue里面 所以要使用props去接收数据  
要点: 我们可以banners定义默认值的时候 因为type是对象 或者 数组的时候 我们要使用default函数的形式
```js 
props: {
  banners: {
    type: Array,
    default() {
      return []
    }
  }
}
```

4. 在home.vue组件中 要使用v-bind绑定父组件的变量
```html 
<!-- 让假糖 变成 真糖 -->
<home-swiper :banners='banners'></home-swiper>
```

<br><br>

# 首页开发 - 推荐信息的展示
上面轮播图的部分已经完成, 下面就是 推荐部分

老师说 每一个部分其实都是一个组件 我们也在home的childComps中创建 推荐的组件(recommendView.vue)

我们定义了一个组件 准备展示在home.vue文件上, 但是数据在home上 所以recommendView.vue还是需要用props用来接收父组件中的数据

```html
<template>
  <div class='recommend'>
    <div
      v-for='(item, index) of recommends'
      :key='index'
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
```

<br><br>

# 首页开发 - featrueView的封装
这个部分整体就是一张图片, 但仅是一张图片也不推荐直接在home.vue中直接``<img>``插入 我们还是通过组件的形式, 即使再简单我们也要给这个部分封装成一个组件 再在home.vue中引入

独立的组件一般都会有一个根
```js 
<template>
  <div>

  </div>
</template>
```

<br>

1. 在home文件夹的childComps文件夹里面创建 FeatureView.vue
```js 
<template>
  <div class='feature'>
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="">
    </a>
  </div>
</template>
```

<br>

2. 在home.vue文件中引入注册组件  

<br>

关于css的部分可以记录下  
nav-bar的位置因为定位了 所以宽度丢失 这里有两种方案解决

```css
position:fixed
top:0
left:0
right:0
```

<br>

这样宽度就被撑起来了 或者 不加left和right 加width100%  
另外就把这个组件当做一个html文档来写就可以 组件没什么特别的当做网页来操作就可

<br><br>

# 首页开发 - TabControl的封装
这个部分就是一个 选项卡(tabcontrol)似的东西 因为多个页面也能用的到 所以我们可以给它在公共组件(components - content)里进行封装

```js 
+------------------+
  最新   流行   新品
+------------------+
```

<br>

### 只是文字不一样的时候就没必要搞插槽了
我们发现类似上面的结构在多页面中都需要使用, 之前我们想到可以定义插槽, 但是如果只是文字不一样的话就没必要定义插槽了(定义插槽后重复的代码量多增多)

<br>

### 不搞插槽怎么做?
我们使用props 调用的时候只需要告诉我文字是什么 有几组文字 我来决定选项卡页面中有几个选项卡

```
选项卡组件 创建 props 用来接收 父组件(home)中的变量
选项卡组件 根据 父组件中的变量 遍历 选项卡的数量

那么只需要 父组件定义变量即可 就是说不用插槽 而是使用 父传子
```

<br>

### 阶段1
完成根据父组件的变量 展示选项卡
因为只有文字不一样 我们使用的是 props 父传子

```js 
props: {
  titles: {

    // 定义了类型 我们要求父组件中需要传递数组
    type: Array,
    default() {
      return []
    }
  }
}

// 根据父组件中的数据 来进行v-for展示 结果放在了span里面
<div v-for='(item, index) of titles' :key='item'  class='tab-control-item' >
  <span>{{item}}</span>
</div>


// 父组件
<tab-control :titles="['流行', '新款', '精选']"></tab-control>
```

<br>

### 阶段2
上面做完了后并没有样式, 这个阶段我们处理一下 选项卡的样式 我们在 TabControl.vue文件中处理

```css 
.tab-control {
  display : flex;
  text-align: center;
  font-size:15px;
  height:40px;
  line-height: 40px;
}

.tab-control-item {
  flex:1;
}

.tab-control-item span {
  padding:5px;
}
```

<br>

### 阶段3
样式处理好后, 我们处理点击效果, 当点击文字后 文字会变色 同时下方会出现横线

```js 
// 先准备好样式
.active {
  color:var(--color-high-text);
}

// 点击文字后 span出现下线 所以要这么写选择器
.active span {
  border-bottom: 2px solid var(--color-tint);
}
```

<br>

使用v-bind绑定class 在组件中创建 currentIndex 变量, 点击的文字的时候将index 传递给 currentIndex 
```js 
// 标签中可以这样, 样式最终会合并到一起
<div class='test' :class="{active: currentIndex === index}">
```

<br>

### 阶段4
TabControl 吸顶效果

<br>

**思路:**   
监听滚动, 一旦到了某个位置后 将我们的选项卡 改为 position:fixed, 监听向下滚动 到某个位置后 将我们的选项卡的 fixed 属性删除

但是我们不使用上面的方法   
我们再home.vue文件中处理, 因为假如我们在TabControl.vue文件中处理 那么就意味着只要调用我们组件的地方 都会有这个效果

目前这个效果只有home.vue文件中需要, 所以我们在home.vue文件中使用

```css
.tab-control {
  position:sticky;

  // 必须写这个 还挺好用
  top:66px;
}
```

**原理:**  
当这个元素没有到某个位置之前 这个元素的position是static  
当这个元素达到了某个位置之后 这个元素的position被浏览器改为sticky

<br><br>

# 首页开发 - 保存商品的数据结构设计
接下来我们开始开发商品列表了 首先我们需要把数据请求回来
另外 在我们点击最新, 流行, 新品 按钮的时候 下面的列表中的图片没有换

```js 
+------------------+
  流行   新款   精选
+------------------+
```

因为Vue会对内部的组件进行复用 比如我点击最新上面有很多的图片, 当我点击流行的时候 vue会将最新上的图片(组件)进行复用 这样就会出现一个问题

原来组件中展示的图片, 当想展示新的图片的时候 图片就不会展示出来

解决方案就是加一个 :key

上面bug的原因知道了 我们自己做的时候就可以避免了 接下来我们就需要展示自己的商品列表


我们请求的数据会有些复杂, 因为我们既要展示流行的数据 也要展示新款的数据, 还要展示精选的数据 也就是说我的首页里面有所有的数据, 要根据不同的点击展示不同的数据

也就是说我们要定义一个变量 来保存所有的数据  
goods: /流行/新款/精选

当用户点击 流行 的时候 我们从goods中取出流行的数据展示在页面上, 以此类推

那就是说在变量中应该存放着所有的数据, 不能点击的时候再发送对应的请求那么给用户的延迟就会比较长

我们看看 保存数据的变量的模型

```js 
goods: {
  'pop': {page:1, list: []},
  'news': {page:1, list: []},
  'sell': {page:1, list: []}
}
```

- page 记录数据当前加载的时候加载到第几页的  
- list 流行对应的所有数据都是保存在list中

比如流行加载到第 5 页了 list里面保存着150条数据 
```js
'pop': {page:5, list: [150]},  
'news': {page:2, list: [60]},
``` 

goods中保存着3类数据, 我们这么设计 goods 本身是一个对象, 里面有3个对象分别对应着流行 新款 精选

当用户点击 流行 按钮的时候 我们就把 pop 数据想办法取出来 然后展示list中的150条数据

当用户点击 新款 的时候, 我们就在页面上加载60条数据, 如果用户在新款中做了 上拉加载更多 的操作 我们发现用户做了这样的操作后 又加载了30条数据 就需要把

```js
'news': {page:2, list: [60]},
```

list中的60条数据 改成90条了 同时还要把page2 改成 page3 所以page 和 list一个是用来记录当前数据加载到第几页的 和 当前已加载的数据的

因为我们请求的数据都在home页 所以我们将 goods 变量定义在home.vue中的data中

```js 
goods: {
  'pop': {
    page: 0,
    list:[]
  },
  'news': {
    page: 0,
    list:[]
  },
  'sell': {
    page: 0,
    list:[]
  }
}
```

结构设计好后 我们就将请求回来的数据 塞到list中同时更改page

<br><br>

# 首页开发 - 首页数据的请求和保存
最新接口: ``http://152.136.185.210:7878/api/m5``

上面我们设计了一个模型用来保存数据, 接下来我们就要看怎么将数据请求下来

```js 
goods: {
  'pop': { page: 0, list:[] },
  'news': { page: 0, list:[] },
  'sell': { page: 0, list:[] }
}
```

我们当前模型中是没有任何数据的, 我们先把每一个分类的第一页的数据默认请求下来

方便用户切换按钮的时候数据能够正常的展示, 第2 3页只有当用户在分类内选择上拉加载更多的时候再请求更多的数据

既然是请求数据 跟请求数据相关的操作我们都做了一层封装 都放在了 network -- home.js 文件里了

这个函数也需要传递过来一些参数 因为我们要针对不同的情况请求不同的数据  
123.207.32.32:8000/home/data?type=sell&page=1

type是类型 我们请求哪一个分类 一个有3个 pop new sell  
还有页码只有告诉页码 才能请求对应的数据
```js 
export function getHomeGoods(type, page) {
  return request({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
}
```

上面我们定义好了请求数据的函数, 接下来我们在哪个组件? 什么时候发送请求呢?

因为是home.vue的数据, 所以也在这个组件中 来获取数据, 同样也是在组件一创建的时候获取各个分类(pop new sell)第一页的数据 便于展示

但是我们思考一个问题, 假如我们获取数据, 保存数据的操作都在created函数中进行, 那么当以后需要获取数据的地方越来越多 created函数中的代码量和逻辑就会越来越多不方便管理

created是一个比较特殊的函数 一旦组件创建后vue就会执行这个函数, 所以这个函数内部需要放主要的逻辑, 而类似这种重复性的处理函数内部数据的功能 我们在methods属性中定义

我们只在created函数中 放主要的逻辑 至于具体的操作我们放在methods中进行
```js 
created() {
  // 请求数据(轮播图和下面的模块)
  this.getHomeMultidata()

  // 请求商品列表的数据 默认请求第一页 30条
  this.getHomeGoods('pop');
  this.getHomeGoods('new');
  this.getHomeGoods('sell');
}
```

这样 created 中的逻辑就会很清晰 上面都要使用this 因为调用的是methods中的方法, 使用this才是在使用组件内部的方法, 不使用this就会去全局中找这个方法

在methods中 我们再对请求数据的函数进行一层封装, 函数名定义成跟请求数据的函数名一样

这样的话 我相当于对请求数据的函数又包装了一层 包装在了methods里面 在methods里面进行一些具体的相关请求 然后在created中调用函数 这样created中的逻辑就会很清晰

```js 
methods: {

  // 请求轮播图数据的函数
  getHomeMultidata() {
    getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
  }

  /*
    形参type:
    这里对商品列表的请求数据的函数再做一层封装, 定义个形参type, 这样一个方法可以通过传参请求不同的数据
  */
  getHomeGoods(type) {

    /*
      里面请求数据的函数的形参 我们添加了 page 并没有写死

      page写死也不好, 因为当用户进行上拉加载更多的时候 这个方法会复用 写死了怎么复用

      应该是 goods:{ 'pop': { page : 0 }}
      原来的页码+1

      比如第一次请求数据(pop分类)的时候 我们在url的后面传递的是page=1
      如果上拉加载更多的时候 page 应该 +1

      let page = this.goods[type].page + 1

      当第一页请求完毕后 我们要把goods中的对应对象的page改为 新的page
    */

    // 上拉加载更多 page+1 的逻辑, 根据type取到指定对象(pop new sell)的page
    let page = this.goods[type].page + 1

      getHomeGoods(type, page).then(res => {

        // 将res中的数据保存在 goods 中 对应的分类的list数组里 res.data.list是一个数组, 我们要将这个数组中的元素 放入 goods中的list数组里
        this.goods[type].list.push(...res.data.list);
        
        // 修改goods中的page
        this.goods[type].page += 1;
      })
    }
  }
```

<br><br>

# 首页开发 - 首页商品数据的展示
前面已经把商品列表的部分的数据请求下来了保存在了home.vue中, 接下来就是开始封装组件展示在home页中
思路
``` 
+------------+
+   +----+   +
+   +    +   +
+   +----+   +
+            +
+------------+
```

整个商品列表的部分是一个大组件, 里面是每一个小结构就是一个小组件 之后通过遍历的方式往大组件里面去塞小组件 这个组件是会被复用的, 所以我们在components中的content里面创建

这里再说下组件化开发 我们把网页中的每一个部分当做一个组件, 将这个部分封装成一个个的组件再展示在页面中

<br>

### 具体步骤
1. 我们在 components - content - goods - GoodsList / GoodsListItem 创建了两个组件 分别是 整体的大组件(GoodsList) 和 每一个商品的小组件(GoodsListItem)

我们将GoodsList在home.vue中导入 注册 并 使用 为了将大组件展示在home.vue中
```js 
// 我们在home.vue中使用了 goods-list组件
<goods-list><goods-list>

import GoodsList from 'components/content/goods/GoodsList'
```


2. 数据在组件中的传递 home.vue -- > GoodsList.vue   
数据都是在home.vue中发送请求, 获取数据 保存数据, 那么我们 GoodsList.vue 组件中要展示商品列表肯定也要使用到 数据所以我们要拿到home.vue中的数据 便于展示

我们要在这一个大组件里根据按钮的点击展示对应的数据, 下面我们先拿展示 流行模块第一页数据为例 之后我们再添加点击按钮展示对应模块的数据的功能

因为只是数据不一样 我们还是通过props来进行操作
```js 
// GoodsList.vue 子组件
<div class="goods">
  // 我们根据这个数据决定遍历多少个小的item 放到这里面就可以了
  // 这里 goods 是一个数组, item是数组中的每一个对象
  <goods-list-item v-for='(item, index) of goods' :key='index'></goods-list-item>
</div>

// 我们在子组件中定义props 来接收 父组件中的数据
props: {
  goods: {
    type: Array,
    default() {
      return []
    }
  }
}

// home.vue 父组件
// 我们在父组件中使用 子组件的变量goods来接收 goods - pop - list中的数据
<goods-list :goods=goods['pop'].list><goods-list>
// 我们将goods中的pop的list中的数据拿出来 给子组件GoodsList使用
```

<br>

3. 数据在组件中的传递 GoodsList.vue  -- > GoodsListItem.vue  

大组件中是每一个小组件, 每一个小组件中的内容对应着父组件goods数组中的每一个对象 也就是我们的每一个GoodsListItem应该对应着父组件goods数组中的一个对象 所以GoodsListItem.vue 中也要使用props获取GoodsList中传递的数组中的对象
```html
<!-- GoodsListItem.vue中 -->
<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
// 我们定义一个变量 goodsItem 用来接收 父组件中的每一个对象数据
props: {
  goodsItem: {
    type: Object,
    deault() {
      return {}
    }
  }
}

/*
  goodsItem 是我们定义的变量 我们在模板中使用的时候要使用 goods-item 这种写法 驼峰的形式在模板中解析不了
*/
  

// 父组件 GoodsListItem
<goods-list-item v-for='(item, index) of goods' :key='index' :goods-item='item'></goods-list-item>

/*
  我们使用 v-bind 绑定 goods-item='item' 这里的 item 是我们遍历goods得到的每一个对象

  这样每一个 goodsItem 变量就是 goods数组中的每一个对象 比如我们在模板中使用 goodsItem 中的图片 可以这样
*/
<img :src="goodsItem.show.img" alt="">

</script>
```

<br>

4. 上面数据都已经互相的传递完毕 那我们接下来就可以通过css样式来调整每个组件的展示效果 一般这里还是采用了flex布局

<br><br>

# 首页开发 - 点击 TabControl 按钮切换商品
上面完整了展示商品列表的操作, 但是是写死的, 我们相当于直接手动取得了goods中的pop的数据
```html
<goods-list :goods=goods['pop'].list><goods-list>
```

这样我再点击 流行 新款 精选按钮后就没有对应的切换效果了 我们要通过点击谁动态选择要展示哪一类

<br>

**思路:**  
我们要对 流行 新款 精选 按钮做一个点击事件的监听, 注意这个按钮的点击是在一个组件里面 我们要将这个组件内部的点击事件传递到外面(home组件里面)
home组件里会根据你点击了谁 然后做切换数据的操作 所以我们要将组件内的点击事件传递到组件外部
使用 this.$emit()

```
外部 向 内部 传递 使用 props
内部 向 外部 传递 使用 $emit
```

<br>

### 1. 将子组件点击事件传递到外面 使用 $emit
```js 
// TabControl组件

// 我们要将下面的点击事件传递到组件外部
methods: {
  itemClick(index) {
    this.currentIndex = index;

    // 1. 使用 this.$emit()  自定义事件名 相当于给子组件事件的名字起个别名吧, 也要传出去点了谁 所以把index传递出去
    this.$emit('tabClick', index)
  }
}


// home组件
// 在模板的位置 使用v-on 绑定子组件发射出来的自定义事件
<tab-control :titles="['流行', '新款', '精选']" class='tab-control' @tabClick='tabClick'></tab-control>
```

定义一个tabClick 去本组件的methods定义对应的方法

<br>

### 2. 在父组件中使用 v-on绑定自定义事件

```js 
// 父组件
<tab-control :titles="['流行', '新款', '精选']" class='tab-control' @tabClick='tabClick'></tab-control>


// 定义 tabClick 的处理函数
tabClick(index) {

// 这里根据 index 来决定 到底是pop new 还是 sell
// <goods-list :goods="goods['pop'].list"></goods-list>

switch(index) {
  case 0:
    this.currentType = 'pop'
    break;
  case 1:
    this.currentType = 'new'
    break;
  case 2:
    this.currentType = 'sell'
    break;
}
```

这样根据index 我们知道了点击了谁, 根据点击了谁 去goods里面取对应的数据 然后将对应的数据传递到GoodsList组件里面

<br>

### 3. 模板中长的结构 要使用计算属性进行整理
```js 
// 使用计算属性 整理
<goods-list :goods="goods[currentType].list"></goods-list>
// 整理成
<goods-list :goods="showGoods"></goods-list>

computed: {
  showGoods() {
    return this.goods[currentType].list
  }
},
```

<br><br>

# Better-scroll 安装 和  使用
上面首页的效果大致上完成了 但是还有一个问题, 当我们把项目部署到服务器上
用手机去浏览页面的时候, 不会特别流程 会有卡顿等现象

现在我们用的是浏览器自带的滚动效果 这种滚动在移动端会非常卡顿的 为了解决移动端滚动时的卡顿问题, 在移动端滚动更加的顺滑 会使用 iscroll 框架  
但是 iscroll 已经不维护了 我们要改用 better-scroll

我们使用 better-scroll 对原生的滚动效果做一个重构
这里再重申下, 第三方的框架不要在组件中直接使用 我们都要对框架进行一层封装, 避免以后框架不维护了

<br>

**安装 better-scroll:**  
```js
npm install better-scroll -S

npm install better-scroll@1.13.2 --save 

npm install @better-scroll/core
// 核心滚动 大部分情况可能只需要一个简单的滚动
```
 
<br>

**在组件内引入 better-scroll:**
```
import BScroll from 'better-scroll'
```

**在生命周期函数中 new BScroll('el', {配置参数}):**  
el通过document.querySelector 选择 或者直接写类名也可以
```js 
// 不能在created中使用 better-scroll 因为template还未挂载到dom中 获取不到节点等
created() {
  不能在这里使用better-scroll
},


// 在这个生命周期中使用
mounted() {
  new BScroll(document.querySelector('.wrapper'))
}
```

<br>

### 注意:
better-scroll 要求 我们要在滚动内容的外层加一个wrapper并且指定固定高度 需要滚动的内容必须在一个标签里面
```js 
<div class='wrapper'>     给这个wrapper设置固定高度
  <div class='content'>
    这里内容很多 需要滚动
  </div>
</div>
```
也就是说 wrapper 里面只能有一个标签

<br>

### 总结
better-scroll的使用很简单
1. npm下载
2. 组件中引入 import
3. 在 mounted() {} 中使用new BScroll()创建
```
参数1: 使用document.querySelector选择滚动内容外层的包裹
参数2: 配置选项 是一个对象
```

<br>

**要求:**  
1. 必须有包裹 包裹必须指定高度
2. 包裹内部是一个元素 这个元素内部可以有很多元素 但是对于包裹来说只有一个孩子
```js 
<div class='wrapper'>
  <ul>
    很多内容
  </ul>
</div>
```

<br>

### 扩展知识点
因为 new BScroll(document.querySelector('.wrapper')) 是在声明周期函数内创建的 假如没有一个变量指向它 它可能会被回收掉 所以最好这样
```js 
data() {
  return {
    scroll: null
  }
},

mounted() {
  this.scroll = new BScroll()
}
```

<br><br>

# Better-scroll 的基本使用解析
**使用 Better-scroll 监听用户滚动到哪个位置了:**  
创建 BScroll 实例
```js 
let bscroll = new BScroll(document.querySelector('.content'));
```

<br>

**使用on绑定 scroll事件:**  
给 bscroll 使用on绑定scroll事件, position参数就是实时滚动到哪里了  
默认情况下bscroll是不可以实时监听滚动位置的 要是想要实时监听滚动的位置的话必须传递第二个配置参数

<br>

### Better-scroll配置参数:
**<font color="#C2185B">probeType</font>**  
值: 0, 1, 2

作用: 是否实时监测滚动位置
```
0 和 1 都是不实时侦测滚动位置
2 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测
3 只要是滚动都侦测, 惯性滚动过程中也侦测
```

```js 
let bscroll = new BScroll(document.querySelector('.content'), { 配置参数 });

let bscroll = new BScroll(document.querySelector('.content'), { 
  probeType:2
});
```

```js 
bscroll.on('scroll', function(position) {
  console.log(position)

  // 结果:
  {
    x:0, y:-1110
  }
})
```

<br>

**<font color="#C2185B">click</font>**  
如果我么使用better-scroll来管理滚动元素的话, 如果滚动元素中存在着按钮, 默认是不能监听按钮的点击的
```
click: true    (默认是false)
```

<br>

**<font color="#C2185B">taps: true</font>**  
**<font color="#C2185B">keepAlive: true</font>**  
用于在页面切换的时候保持原先的位置

<br>

**<font color="#C2185B">pullUpLoad</font>**  
比如我们滚动到底部的时候出现上拉加载更多, 如果想做上拉加载更多的话, 一旦滚动到最底部的 给我们回调一个事件, 现在我们只是展示了第一页的数据 然后再次上拉请求第二页数据, 再次追加到数组里面, 然后一起展示数组中的所有数据
```
pullUpLoad: boolean
```

这个配置用于做上拉加载功能, 默认为false, 当设置true或者一个object的时候, 可以开启上拉加载

版本2.x之后 这个功能需要再次安装插件
```
npm i @better-scroll/pull-up --save
```

```js 
pullUpLoad: true

pullUpLoad: {
  threshold: 50
}
```

可以配置threshold来决定开始加载的时机, 当上拉加载数据加载完毕后, 需要执行
```
bscroll.finishPullUp()
```

<br>

**使用on给实例绑定 pullingUp 事件:**  
触发时机: 在一次上拉加载的动作后, 这个时机一般用来去后端请求数据   
一旦滚动到最底部 就会触发回调
```js 
bscroll.on('pullingUp', function() {
  // 绑定pulllingUp事件, 当一次上拉加载的时候 执行回调中的代码
})
```

**注意:**  
上拉加载更多 回调只会触发一次, 为了防止多次请求, 所以在触发了一次上拉加载的回调后 内部必须调用 bscroll.finishPullUp() 方法 告诉它 一次加载已经完成
```js 
bscroll.on('pullingUp', function() {
  // 绑定pullingUp事件, 当一次上拉加载的时候 执行回调中的代码
  console.log('上拉加载更多');

  // 发送网络请求, 请求更多页的数据

  // 等数据请求完成, 并且将新的数据展示出来后 执行
  bscroll.finishPullUp()
  bscroll.refresh()
})
```
 
<br>

**<font color="#C2185B">observeImage</font>**  
弹幕上还说 当因图片的问题 没办法判断到没到底部的时候我们可以加上这个属性
```js 
observeImage: true
```

<br>

### 常用方法:
**<font color="#C2185B">bscroll.refresh()</font>**  
重新计算BetterScroll 当DOM解构发生变化时 确保滚动效果正常; 
```js 
// 每次dom结构更新之后调用这个方法
updated() {
  // 在home.vue组件中 通过获取this.$refs.scroll Scroll.vue组件对象 使用scroll实例的方法
  this.$refs.scroll.scroll.refresh()
}
```

<br>

**<font color="#C2185B">scrollTo(x, y, time(毫秒), easing, extraTransform)</font>**  
滚动到指定位置 time指定动画时间; 

上面我们创建了 scroll实例对象, 这是实例对象的方法
也就是想回到 滚动区域的顶部 需要通过 scroll实例对象调用scrollTo(x,y)方法

```js 
this.scroll.scrollTo(0, 0)
this.$refs.scroll.scroll.scrollTo(0, 0, 500)
```

<br>

### 常用事件
**<font color="#C2185B">refresh</font>**  
重新计算BetterScroll 当DOM解构发生变化时 确保滚动效果正常; 
```js 
bs.on('refresh', () => { ... })
```

<br>

下面的事件必须注册相应插件才能使用:   
**pullingDown(pull-down)下拉刷新:** 
```js 
import BScroll from '@better-scroll/core'
import Pulldown from '@better-scroll/pull-down'
//注册插件
BScroll.use(Pulldown)
export default {
  name: 'App',
  mounted() {
    this.$nextTick(() => {
      let bs = new BScroll(this.$refs.wrapper, {
        pullDownRefresh: true
    })
    bs.on('pullingDown', (position) => {
      await fetchData()
      console.log('ddd');
      bs.finishPullDown()
    })
    })
  }
}
```

**pullingUp(pull-up)上拉刷新:**
```js  
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)
export default {
  name: 'App',
  mounted() {
    this.$nextTick(() => {
      let bs = new BScroll(this.$refs.wrapper, {
        pullUpLoad: true
    })
    bs.on('pullingUp', (position) => {
      // await fetchData()异步请求数据
      console.log('ddd');
      bs.finishPullUp()
    })
    })
  }
}
```

<br>

### 完整代码:
```js 
const bscroll = new BScroll(document.querySelector('.content'), {
  probeType:3,      // 开始侦测实时滚动位置
  click: true       // 在滚动区域内可以监听点击事件
  pullUpLoad:true   // 开启上拉加载的功能
})

// 给实例绑定 scroll 事件 监听滚动位置
bscroll.on('scroll', function(position) {
  console.log(position)     // {x:0 y:100}
})

// 给实例绑定 pulllingUp 事件 监听一次上拉加载之后 执行回调
bscroll.on('pulllingUp', function() {
  
  // 防止多次请求 2秒内 因为只要没调用 bscroll.finishPullUp() 就不能再次上拉
  setTimeout(() => {
    bscroll.finishPullUp()
  }, 2000)
})
```

我们开看下Vue中代码部分
```html
<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data() {
    return {
      scroll:null
    }
  },

  // 我们在mounted函数中创建better-scroll实例 created里面取不到dom节点
  // 为什么要创建变量接收实例 因为垃圾回收的机制
  mounted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType: 2,
      pullUpLoad:true
    }),

    this.scroll.on('scroll', (position) => {
      // console.log(position)
    }),

    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');

      // 这里保存下this 因为settimeout中的this指向window
      let that = this;
      setTimeout(function() {
        console.log('进来了')
        that.scroll.finishPullUp();
        // console.log(this)
      }, 2000)
    })
  }
}
</script>

<style scoped>
  .wrapper {
    height:200px;
    background:deeppink;
    overflow-y:hidden;
  }
</style>
```

<br>

### 注意:
弹幕上有这么写
```js 
this.scroll = new BScroll(this.$refs.wrapper, {
  probeType:2,

  // 如果元素是button 不管true还是false都可以点击 但是如果是div之类的就要设置这个选项
  click:true,         
  mouseWheel:true,
  observeDOM: true
})
```

弹幕上还说 当因图片的问题 没办法判断到没到底部的时候我们可以加上这个属性
```js 
observeImage: true
```

<br><br>

# Better-scroll 在vue项目中使用过程
上面了解了 怎么使用better-scroll 接下来我们看看怎么在home.vue组件中 对 可滚动的区域进行重构 (除了导航最上面的nav-bar的位置其它的部分都需要滚动)

1. 在home.vue组件中 引入 better-scroll
2. 在mounted函数中创建better-scroll的实例 
3. 创建wrapper 创建content 将所有组件放在content中 并且给wrapper指定一个高度
```js 
<div class='wrapper'>     // 指定高度
  <div class='content'>
      ..所有组件..
  </div>
</div>
```

上面讲了一下大概的流程 但是 better-scroll毕竟是一个第三方的库, 如果有一天停止维护 仍然会出现之前我们说过的话题 所以我们还是要对better-scroll进行层封装

然后让 better-scroll --面向-- 封装文件 --面向-- 所有组件  
我们会封装成一个.vue文件, 之后所有涉及到滚动的组件 都使用.vue文件就可以了

<br><br>

# Better-scroll 的封装 以及 使用
上面提到了封装 我们要给它封装到components -- common里面 这样以后的文件中也可以进行复用
```
  | - components
    | - common
      | - scroll
        - Scroll
```

我们在上面的目录里创建了 Scroll.vue 文件 以后只要是有想滚动的部分 我们就可以放入``<scroll>`` 各种组件 ``</scroll>``  
我们在组件中使用组件scroll的时候需要给scroll组件指定一个高度, 因为每个页面中 需要滚动的区域的高度是不一样  
这样每个组件在使用<scroll>组件的时候, 可以通过加class设置滚动区域的高度
```js 
<scroll class='content'>

</scroll>

<style>
  .content {
    height: 我们指定一个高度 也就是定义一个可滚动的区域
  }
</style>
```


这里复习一个下插槽被替换的时候是什么样子的
```js 
<div>
  <slot></slot>
</div>

<组件1> </组件1>
<组件2> </组件2>

使用插槽的时候 <slot> 会被内容完全的替代掉

<div>
  <组件1> </组件1>
  <组件2> </组件2>
</div>
```


因为slot的部分会被完全的替换掉, 而better-scroll的使用需要 包裹 包裹里面只能有一个子元素 因为结构的关系 我们要像下面这么定义 ``<template>``
```js 
<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
```


知道了上面的结构是什么样子的 接下来我们就要把需要滚动的组件放到插槽里面
```js 
<scroll class='content'>
  <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends="recommends"></recommend-view>
  <feature-view></feature-view>
  <tab-control
    :titles="['流行', '新款', '精选']"
    class="tab-control"
    @tabClick="tabClick"
  ></tab-control>
  <goods-list :goods="showGoods"></goods-list>
</scroll>
```

然后 我们需要给 ``<scroll>`` 指定一个可以滚动的区域
这里 除了顶部的 ``<nav-bar>`` 和 底部的 ``<tab-bar>`` 剩下的都是可滚动的区域

页面高度 - 顶部 - 底部  
这里有两种解决的方案
```css
/* 方案一, 利用 css 中 calc() */
.content {
  height: calc(100vh - 93px); 
}

/* 
  方案二, 利用 position absolute 
  假如我们不指定高度的时候 高度默认就是自动
*/
.content {
  position:absolute;
  top:44px;           需要减去的顶部的高度
  bottom:49px;        需要减去的底部的高度
  left:0;   
  right:0;
}
```

<br><br>

# 首页开发 - BackTop组件的封装和使用
首页的开发几乎快完成了, 我们再补充一些功能, 比如在滚动到某一个位置的时候 显示回到顶部按钮
我们把这个功能封装在components -- content 里面

我们创建一个``<back-top>``组件 放在``<scroll>``组件的外面 因为这个``<back-top>``组件不需要一起滚动
而且每一个页面中``<back-top>``组件的位置都是一样 所以 ``<back-top>``组件 的样式在该组件内部定义就可以

当同一样式 就是在组件内部修改 css  
当不统一样式的时候, 在哪个组件内使用就在哪个组件修改css样式
```js 
// BackTop组件
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>
```

上面修改完样式 位置后 我们需要完成点击该按钮 返回顶部的功能 我们想想这个功能在哪完成比较好?  
```
位置1. 在 BackTop.vue 里
位置2. 在 home.vue 里
```

回到顶部的功能 我们需要调用better-scroll中的创建的scroll实例对象的scrollTo()方法来完成  
我一开始想是在 1 里面完成比较好, 但事实上却是比较麻烦 相当于在BackTop.vue监听点击事件 却操作Scroll.vue中的代码
倒是也能实现

```js 
// 位置1 实现方式
// BackTop.vue
<div class="back-top" @click='backClick'>
</div>

// 我们给div绑定点击事件
methods: {
  backClick() {
    this.$emit('backClick');
  }
}

// 然后我们把事件发送出去 并在父组件(home.vue)中接收

// 父组件 home.vue
<back-top @backClick='backClick'></back-top>
// 然后我们在父组件中定义处理方法, 想办法拿到scroll组件中的实例对象 通过调用这个实例对象的方法实现返回顶部的功能
```

但是像这样的话 不太好, 就重复了

既然 位置1 不好操作 不如我们直接在 home.vue 中监听 ``<back-top>`` 组件的点击 因为这个组件就是小按钮不是么  
这样的就不需要在``<back-top>``组件发送$emit了

我们知道元素肯定是能添加各种事件的, 但是组件可以么?

<br>

**但是组件是不能直接绑定事件的, 如果需要比如添加 @事件名.native 修饰符**  
```
Vue3.0中已经删除.native修饰符, 可以直接给组件绑定事件
```

<br>

### 怎么在父组件中获取到子组件中的对象
通过: ``<标签 ref='属性名'>`` this.$refs.属性名 的方式

```js 
// home.vue 使用 .native 给组件绑定事件
<back-top @click.native='backClick'></back-top>
      
// 也是在home.vue组件中, 在组件标签内 写了 ref='' 的方式获取该组件对象
<scroll class='content' ref='scroll'>
```

上面我们给``<scroll>``组件 添加了ref属性, 那么这里我们就可以拿到该组件对象  
通过 this.$refs.scroll 的方式 拿到了 Scroll.vue 组件  
Scroll.vue 中的 data 里面有 scroll属性, scroll属性绑定了 BScroll 对象 也就是说scroll是BScroll的实例对象  
那我们就可以调用scroll.scrollTo()方法

```js
this.$refs.scroll.scroll.scrollTo(0, 0, 500)
```

但是 this.$refs.scroll.scroll.scrollTo(0, 0, 500) 有点让人很不好理解 我们可以 在Scroll.vue中封装一个方法  
然后我们在home.vue组件中可以通过 this.$refs.scroll组件对象直接获取组件中的方法和属性 这就是封装的思想
```js
methods: {
  scrollTo(x, y, time=300) {
    this.scroll.scrollTo(x, y, time)
  }
}
```

```js
backClick() {
  this.$refs.scroll.scrollTo(0,0,500);
},
```

<br><br>

# 首页开发 - BackTop的显示和隐藏
我们观察做好的页面会发生, 当我们滚动屏幕的时候 这个组件会在某个临界值的时候显示 或者 隐藏

思路:
我们需要实时的监听滚动 比如滚动超过1000px的时候显示, 小于1000px的时候隐藏  
既然需要实时的监听滚动区域的滚动, 那么我们就要在 Scroll.vue 中开启监听滚动
```js 
this.scroll = new BScroll(this.$refs.wrapper, {
  probeType:3,        // 先定义监听滚动的属性
  click:true,
  mouseWheel:true,
  observeDOM: true,

}),

// 2 监听滚动的位置 绑定scroll事件
this.scroll.on('scroll', (position) => {

})
```

但是在Scroll.vue中这么设置并不是很好, 因为在本组件中设置的话 更改的是通用, 以后在别的地方调用该组件的时候 也是开启了监听实时滚动的效果, 但是并不是所有调用该组件的都希望有实时监听滚动的功能
```
      封装的 Scroll 组件
    ↙                   ↘
A组件                     B组件

需要实时监听              不需要实时监听
```

所以在 Scroll.vue 里面不适合开启实时监听页面滚动 probeType:3

<br>

我们可以这样, 让调用该组件的人决定 需要不需要开启实时监听 同时 我们通过this.$emit()需要将 position 传递出去, 谁想用谁用
```js 
// Scroll.vue 组件
props: {
  proType: {
    type: Number,
    default:0
  }
},

mounted() {
  this.scroll = new BScroll(this.$refs.wrapper, {

      // 这里我们设置的默认值是0, 具体的值让父组件传递过来
      probeType:this.proType,
      click:true,
      mouseWheel:true,
      observeDOM: true,

  }),

  // 2 监听滚动的位置
  this.scroll.on('scroll', (position) => {

    // 我们这个position并不是在Scroll.vue组件里面使用的, 我么需要将position传递出去
    console.log(position)

    // 这样我们就将position传递出去了, 之后谁想后这个东西, 谁就去接收
    this.$emit('scroll', postion)
  })
},


// 在父组件中
<scroll class='content' ref='scroll' :probe-type='3' @scroll='contentScroll'>
  :probe-type='3'
  在父组件中 使用v-bind传递过来 传递3相当于开启了实时监听滚动

  @scroll='contentScroll'
  用来接收子组件中传递过来的position

contentScroll(position) {
  console.log(position)

  // 这里面做显示隐藏的逻辑
  position.y > 1000 or < 1000
},
```

<br>

### 总结:
只要是让父组件决定的属性 我们使用props定义个变量, 这个变量不仅仅在DOM模板中使用, 还能在实例中当做属性使用

<br>

BackTop.vue组件的显示和隐藏
```html
<back-top @click.native='backClick' v-show='isShowBackTop'></back-top>
```

我们可以给这个组件 使用v-show 绑定一个变量 根据变量决定这个组件的显示和隐藏
```js 
// 我们在data里面定义变量
data() {
  return {
    isShowBackTop:false
  }
}

v-show='isShowBackTop';

// 当滚动到某一个位置的时候 我们就改变 isShowBackTop 为 true


// home.vue 父组件中
// position.y 是负数 我们前面加个 - 
contentScroll(position) {
  this.isShowBackTop = (-position.y) > 1000
}
```

<br><br>

# 首页开发 - 完成上拉加载更多
这个模块我们完成以下 上拉加载 更多  
也是需要监听滚动事件吧, 在Scroll.vue里开启上拉加载更多的属性  
也是这个上拉加载更多的属性, 不一定是每一个组件里都需要使用 所以我们也不要直接定义 pullUpLoad:true, 最好也是 把它定义一个变量 谁调用的时候 谁再确定是否需要开启这个功能
```js 
// 子组件 Scroll.vue
pullUpLoad: {
  type: Boolean,
  default: false
}

this.scroll.on('pullingUp', () => {
  console.log('上拉加载更多');
  this.$emit('pullingUp')
    使用$emit将事件单独的发射出去
})




// 父组件 home.vue
<scroll class='content' 
  ref='scroll' 
  :probe-type='3' 

  // 注意 这里将驼峰改成 - -
  @scroll='contentScroll' :pull-up-load='true'    

  // 这里接收子组件中传递的事件
  @pullingUp='loadMore'
>

loadMore() {
  console.log('上拉加载更多');

  // 这里针对现在的类型加载更多的对应的数据 选中谁给对应的分类做上拉加载更多的逻辑
  // 加载谁 currentType就记录着谁 一旦调用了这个方法就会取出当前页面让页面+1 载完一次以后 必须调用scroll.finishPullUp()告诉better-scroll一次加载完成
  this.getHomeGoods(this.currentType);
  
},


// 因为 scroll.finishPullUp(); 方法是在数据加载完成后 写上, 所以在请求数据的函数里书写
getHomeGoods(type, page).then((res) => {

  this.goods[type].list.push(...res.data.list);
  this.goods[type].page += 1;

  // 加载数据完成后 需要调用scroll.finishPullUp()方法 告诉betterscroll一次加载完成
  this.$refs.scroll.scroll.finishPullUp();

  // 但是上面的可读性比较差, 我们对这个方法在scroll.vue中再做一层封装

});


// 子组件 Scroll.vue 里
methods: {
  scrollTo(x, y, time=300) {
    this.scroll.scrollTo(x, y, time)
  },
    
  // 我们对finishPullUp方法做一层封装
  finishPullUp() {
    this.scroll.finishPullUp()
  }
}
```

### 总结:
this.$emit() 不仅仅是传递参数 还是可以单独的传递事件  
上面完成了子组件将上拉加载更多的事件发射到了父组件中处理(数据在父组件啊, Scroll.vue组件也是公共的不能处理只属于home的逻辑, 所以我们将事件发送出去)

上面的滚动还是有些问题, 因为有的时候页面突然不能滚动了 原因是因为scroll插件计算出来的 和我们用到的高度不一样

**原因:**  
当我们使用better-scroll创建简单的滚动的时候 不会产生bug

但是现在比较复杂 因为better-scoll要计算可滚动的高度(内容的高度 - wrapper的高度)

但是我们的情况又比较复杂, 因为我们的内容是一个个的小组件, 当我们最开始给better-scroll的时候图片还没有加载出来 因为图片是异步加载的 所以better-scroll在计算一个小的item组件的时候 是不包含图片的 所以better-scroll在计算整个内容区的高度的时候是不包含图片的
  
比如 它计算出来的是 height:2000  
但是后面我们的图片加载过来了 也就意味着每一个小的item被撑高了 最终整个的内容区域就会变的很多 但是better-scroll并不会重新计算的

所以我们应该先监听图片加载完 然后调用refresh()方法重新计算高度
    
<br><br>

# 首页开发 - 滚动区域的Bug分析和解决
我们这里要完成的逻辑是, 一旦图片加载完成, 我们调用 scroll.refresh()方法

**思路:**  
better-scroll在决定有多少区域可以滚动时, 是根据scrollHeight属性决定

- scrollerHeight属性是根据放在better-scroll的content中的子组件的高度决定的
- 但是我们的首页中, 刚开始在计算scrollerHeight属性时, 是没有将图片计算在内的, 所以计算出来的高度是错误的
- 后来图片加载进来之后有了新的高度, 但是scrollerHeight属性并没有进行更新所以滚动出现了问题

<br>

**解决方式:**
监听每一张图片是否加载完成, 只要有一张图片加载完成了, 就执行一次refresh()

<br>

**如何监听图片加载完成了?**
原生js中 img.onload = function() {  } 但是在vue中不用这样

<br>

我们需要监听图片加载完成了没 图片在哪里?
```
components -- content -- goods -- GoodsListItem.vue中
```

使用 @load 事件 就是 原生的img.onload事件

**<font color="#C2185B">@load</font>**  
图片每加载成功一次 就会调用这个方法一次

```html
<img :src="goodsItem.show.img" alt="" @load='imgLoad'>

<script>
methods: {
  // 一旦图片加载完成 就会执行这个函数 每加载一次就会调用这个函数一次
  imgLoad() {

    // 在这里调用scroll的refresh()方法 但是这个组件中没办法直接获取到scroll组件对象

  }
}
</script>
```

我们现在遇到的问题就是, 我们先看下组件的结构
```
| - home.vue
  | - Scroll.vue                2. 拿到这个组件对象
  | - GoodsList.vue             ↑
    | - GoodsListItem.vue       1. 我们需要在这里

1. 中拿不到 scroll组件对象, 但是home.vue里面可以拿到 所以
```
  
<br>
  
### 解决办法1: 组件之间的层层传递
我们将事件从GoodsListItem传递到GoodsList再传递home里面
```
GoodsListItem.vue   -- >   GoodsList.vue   -- >   home.vue
```

上面的思路会有一些麻烦 因为组件之间的层层传递有点麻烦

<br>

### 解决办法2: VueX
我们利用 vuex 来解决, vuex里面记录的是状态, 那么每当GoodsListItem中图片加载完成一次以后 我们就改变 vuex 中定义好的一个变量  
同时在home.vue中引用vuex中的这个变量, 在实时监听这个变量 一旦这个属性发生改变的时候, 我们就执行 scroll.refresh()

``` 
  home.vue        vuex            GoodsListItem.vue

  监听变量,       定义变量         每当加载成功图片一次 就修改vuex变量一次
  变量一旦改变
  执行 refresh
  一次 

  因为 每一个组件都能通过 this.$store 访问到vuex中的属性 和 方法  
```
  
<br>

### 解决方式3   事件总线  this.$bus.emit('事件名')
有一个地方 是共用的 叫做 事件总线(我们用vue实例充当事件总线)

<br>

**事件总线的创建:**    
**<font color="#C2185B">Vue.prototype.$bus = new Vue()</font>**
main.js文件 --- 给vue原型添加$bus 并赋值vue实例

我们给vue的原型添加一个$bus, 添加的$bus是一个空的对象, 没办法发射事件对吧  
因为我们下面是用this.$bus.emit() 发射事件 但是$bus是刚创建的对象, 空的吧 哪来的emit()方法, 所以 我们可以这个$bus赋值为 Vue实例

Vue实例是可以做事件总线的
```js 
// main.js文件中
Vue.prototype.$bus = new Vue()
```

之后我们就可以使用vue发射事件和监听事件

<br>

组件1 通过 **this.$bus.$emit('事件名')** 发射事件到 事件总线  
组件2 通过 **this.$bus.$on('事件名', function() { })** 来监听 事件总线中的 事件, 回调中处理

跟vuex很像, 但是<font color="#C2185B">事件总线不是用来管理状态的 是用来管理事件的</font>

<br>

**事件总线的简单应用:**
```js 
// 组件1
this.$bus.emit('aaa')    // 将aaa事件发送的事件总线里面

// 组件2
this.$bus.on('aaa', function() {
  // 组件1中发射到 事件总线的事件, 会在这个回调中监听到
})
```


回过头来看看我们的项目
```js 
// GoodsListItem.vue中
<img :src="goodsItem.show.img" alt="" @load='imgLoad'>

methods: {
  imgLoad() {
    // 我们将 imgLoad 发射出去 发射到事件总线, 事件总线也是一个公共的区域这样别的组件就可以通过事件总线 获取我们发射到事件总线的事件
    this.$bus.$emit('imgLoad')
  }
}


// home.vue中
created() {
  // 我们在created中监听, 一旦组件创建完毕 我就等着监听imgLoad事件 监听GoodsListItem中的图片加载完成
  this.$bus.$on('imgLoad', () => {

    // 每加载完成一个图片后 重新计算一下滚动内容区的高度
    this.$refs.scroll.refresh();
  }),
}
```

<br>

### 总结:
当事件的传递 组件之间隔着层级太远, 我们可以使用事件总线的方式

事件总线包含了3部分代码
1. Vue.prototype.$bus = new Vue()    // main.js 中
2. this.$bus.$emit('事件名称', 参数)
3. this.$bus.$on('事件名称', function(参数) { })

<br>

**注意:**  
这里只是说了怎么获取数据 也就是传递数据 比如A如何给B数据 但是假如B想修改A里面的数据那怎么办? 

一样 B要往事件总线发送一个事件 同时将要修改的值带过去 A要监听事件总线里面对应的事件 拿到值来做修改  
也就是说我们要返过来使用一遍事件总线的逻辑

当组件太多的时候 再使用事件总线就太乱了 也太麻烦了 而且尤其是涉及到读写的时候

<br><br>

# refresh函数找不到的bug处理
我们通过上面的方法使用refresh()的时候 可能会报错

### 问题可能性1
```
cannot read property refresh of undefined
```
原因可能是 GoodsListItem中的图片来的太快了 当我们使用scroll.refresh()的时候, Scroll.vue组件还没有挂载

```
home.vue    --   GoodsList   --   GoodsListItem
```

**GoodsListItem中:**  
我们对img @load 监听了图片的加载
然后通过 this.$bus.$emit() 发射事件

<br>

**home.vue中:**  
这里我们监听 GoodsListItem 发射出来的事件 在监听的回调中 每成功加载一张图片 我们就在回调用 调用 this.$refs.scroll.refresh()  
我们在调用refresh()的时候 内部是 拿到 Scroll.vue 组件对象, 调用了组件对象内部的方法 而refresh()这个方法是在Scroll组件里面的

<br>

**Scroll.vue:**  
我们初始化scroll对象的时候是在mounted里面

<br>
上面报错的原因是 GoodsListItem 的图片来的太快了  
在Scroll.vue还没有挂载之前就请求回来图片了 请求图片加载完成后就会马上去home.vue中的@load中的回调里执行scroll组件对象的方法,  
但是scroll组件这时候还没有初始化完成 没初始化完成就代表是从undefined 或者 null上读取了refresh()方法 所以会报错

<br>

### 当有上面的情况的时候 我们可以这么写
你有你再滚
```js
this.scroll && this.scroll.scrollTo(x, y, time)
```

当有这个对象的时候 再调用它的方法
```js 
// Scroll.vue

methods: {
  scrollTo(x, y, time=300) {
    this.scroll && this.scroll.scrollTo(x, y, time)
  },

  finishPullUp() {
    this.scroll && this.scroll.finishPullUp()
  },

  refresh() {
    this.scroll && this.scroll.refresh()
  }
}
```

<br>

### 问题可能性2
我们关于 图片监听的处理函数 是在home.vue的created中的书写的 在 created 中去拿dom结构中的对象 可能是拿不到的
this.$refs.scroll 下面我们就使用了 this.$refs 相当于 document.getElementById去拿是一样的 都是在created中去拿dom中的对象 有可能是拿不到的因为created是阶段是拿不到dom节点的
```js 
this.$bus.$on('imgLoad', () => {
  this.$refs.scroll.refresh();
}),
```

综上 监听图片的加载事件要在mounted中去做

<br><br>

# 刷新频繁的防抖函数处理
报错的问题解决了之后 我们再说说 home.vue组件中的 图片监听事件 里面存在的刷新太过频繁的问题  
我们希望1秒钟内如果有多次调用只调用一次 1秒钟内如果有下一次的调用就等一会
```js 
this.$bus.$on('imgLoad', () => {

  // 这里面的逻辑调用的太频繁了
  
}),
```

比如说我们现在要开发一个搜索的功能, 我们在输入框内输入一个字母, 它就会想服务端发送一次请求, 请求过来的结果在输入框的下面做展示  
但是有些时候 用户输入过快, yifu 这样会往服务器发送4次请求 其实没有必要, 所以一般这个时候 我们就会给它做一个防抖动操作

用户输入一个y 然后本来想准备向服务器发送请求, 但是先不发等待100ms 看看用户是不是继续输入, 如果继续输入那就把y的那次请求取消掉 yi  
到yi后看看用户有没有继续输入 知道用户过了100ms没有输入 我们再发送网络请求

这就是防抖函数 在设定的时间内只触发一次, 如果有多次就取消上一次的请求等到时间后重新发送

放到我们的项目里也是一样的, 一张图片加载完成后先等500ms如果500ms内没有新的图片加载完成就调用refresh()方法, 如果有图片加载完成就停止调用refresh()等500ms之后一起调用refresh()方法  
节流通常用在轮播图

我们看看代码上的体现 防抖函数起作用的过程  
如果我们直接执行refresh, 那么refresh函数会被执行30次  
我们可以将刷新操作的函数refresh()放入 debounce防抖函数中 生成给一个新的函数  
之后在调用非常频繁的时候, 就使用新生成的函数, 而新生成的函数, 并不会非常频繁的调用, 如果下一次执行来的非常快, 那么就将上一次取消掉
```js 
mounted() {
  // 下面的函数是监听GoodsListItem组件中图片加载的情况, 在没有防抖的操作之前 它的内部会调用30次的刷新操作
  this.$bus.$on('imgLoad', () => {

    // 我们将下面这个代码放入防抖函数中 并在这个位置执行防抖函数
    this.$refs.scroll && this.$refs.scroll.refresh();
  })
},


// 防抖函数
debounce(func, delay) {
  let timer = null;
  return function(...args) {
    // 判断上面的timer有没有值 如果有值的话就清除掉
    if(timer) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
},
```

<br>

### 完整的代码部分:
```js 
// home.vue中
mounted() {
  // this.$refs.scroll.refresh是不加小括号的
  const refresh = this.debounce(this.$refs.scroll.refresh, 100)
  this.$bus.$on('imgLoad', () => {
    refresh()
  })
}

// home.vue methods中定义的防抖函数
debounce(func, delay) {
  let timer = null;

  return function(...args) {
    // 判断上面的timer有没有值 如果有值的话就清除掉
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
},
```

<br>

### 知识点
1. setTimeout在下一次事件循环的时候执行 这个函数会被放到最后执行
2. 引入utils.js中的方法函数的时候, 再调用的时候不用加this, this指向组件内的实例, 如果不加this就去找公共的方法

<br><br>

# 首页开发 --- 上拉加载更多的完成
上面我们在home.vue组件中对, 对图片加载的函数做了性能上的优化, 我们做了防抖  
但是像防抖这种功能性的函数不在单独的放在一个组件里面  
我们在common -- utils 创建这个js文件  
```js 
// utils.js中
// 防抖函数
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
```

上拉加载更多的逻辑已经做完了 在上节的上节?

<br><br>

# tabControl的offsetTop获取分析
首页接下来只剩下一个 流行 新款 精选 按钮的吸顶效果 之前我们是使用 粘滞定位 但是现在已经不起效果了
```css
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
}
```

我们要判断 这个按钮栏整体的滚动位置 比如我们往上滚动了500px 我就判断滚动的距离是不是>500 如果大于500 这个时候要做吸顶, 那就改变为fixed

<br>

### 具体步骤:
**要点:**
```js
this.$refs.组件对象.$el 拿到组件内的根元素(div)部分
```

<br>

**1. 必须知道滚动到多少时, 开始有吸顶效果**  
也就是说 我们滚动到目标对象的offsetTop值的时候开始有吸顶效果 这个时候就需要获取tabControl的offsetTop
但是 如果直接在mounted中获取tabControl的offsetTop 那么值是不正确的

如果获取正确的值呢?
- 监听HomeSwiper中的img的加载完成
- 加载完成后, 发出事件, 在home.vue中 获取正确的值  
补充 为了不让HomeSwiper多次发出事件可以使用isLoad的变量进行状态的记录

```js 
------ 顶部 ------
  ^
  ^   offsetTop   400px
  ^
  div
```
那就是说滚动过了400px的时候 要有吸顶的效果

**怎么才知道offsetTop值?**  
获取到tabControl的offsetTop

1. 我们在data中定义一个变量 用来保存offsetTop
```
tabOffsetTop: 0
```

2. 既然要获取offsetTop 那就要拿到这个组件对象 就像我们要获取div到顶部的距离也得拿到div对象 vue中我们通过ref来获取 
```
ref='tabControl'   this.$refs.tabControl
```

3. 在mounted中 我们拿到组件对象, 将offsetTop的值赋值给tabOffsetTop
```
this.tabOffsetTop = this.$refs.tabControl
```

this.$refs.tabControl 拿到的是组件对象 并不是dom对象, 比如div有offsetTop数据, 那么组件对象有offsetTop属性么? 没有  
那么我们只能拿到组件里面的对应元素就可以了

```html
<template>
  <div class='tab-control'>     我们拿到组件对象中的div就可以了吧 
  </div>
</template>
```

拿到里面div div才有offsetTop吧
```js 
// 在home.vue
mounted() {
  this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  console.log(this.tabOffsetTop)    // 80
}
```
上面我们在mounted中获取的数据肯定不准 80px 太小了, 原因是因为 我们虽然在mounted中进行操作的 但是页面里面的图片还没有加载完毕, 所以这时候得到的位置是不准确的 值也就是不准确的  
所以我们要在图片加载完成后 再去获取这个值才是准确的

**上面在mounted中获取目标对象的offsetTop是不准确的 解决办法**  
1. 我们再次监听图片加载情况 加载完毕后再来获取offsetTop值

这个项目里面 tabControl组件上面 有3个部分有图片
```
轮播图

4个圆圈小图片

本周流行的大图
```
老师测试完毕 主要产生印象的还是轮播图的部分, 下面的两个部分并不会产生太大的影响

2. 这里我们主要监听一下轮播图的加载完成情况  
我们去轮播图的组件里面
```
home -- childComps -- HomeSwiper.vue中
```


```html
<a :href="item.link">
  <img :src="item.image" @load='imageLoad'/>     我们给它绑定@load事件
</a>

<script>
methods: {
  imageLoad() {
    // 在这里我们把这个事件发送出去 让home.vue去做处理
    this.$emit('swiperImageLoad')
  }
},
</script>
```

home.vue组件中
```html
<home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>

<script>
methods: {
  // tabControl 监听轮播图的图片加载情况
  swiperImageLoad() {
    // 获取tabControl组件 然后将tabControl组件上面的偏移量给到tabOffsetTop保存起来
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    console.log(this.tabOffsetTop)    // 这里面记住图片就打印几次

    // 在这里我们只需要获取一次正确的值就可以了
  },
}
</script>
```
  
因为每加载图片成功一次 HomeSwiper组件中就会发射事件一次, 一共4张图片就发射了4次事件  
但是对于高度来讲, 我们只需要知道一张图片的高度就可以了, 所以HomeSwiper组件里只需要发射一次事件就可以  
注意 在@load里面的就是图片加载后的状态


3. 让 HomeSwiper组件 只发射一次事件
```js 
data() {
  return {

    // 这里定义一个变量
    isLoad: false
  }
},

imageLoad() {
  // 这里只需要发射一次事件可以 先取反让它进入判断发射一次事情 然后修改变量让它进不来
  if(!this.isLoad) {    
    this.$emit('swiperImageLoad')
    this.isLoad = true
  }
}
```

弹幕说 获取正确的值的话 还可以在setTimeout里面做 这样是异步会等同步完成后再获取值? 好像也行啊

<br>

### 监听滚动 动态的改变tabControl的样式
之前我们做backTop组件什么时候显示和隐藏 在methods中定义了一个函数 我们可以在这个函数中 继续完成tabControl是否吸顶的逻辑
```js 
// 关于backTop组件显示和隐藏的函数
contentScroll(position) {
  // 1. 判断backTop组件是否显示
  this.isShowBackTop = (-position.y) > 1000

  /*
    2. 决定tabControl是否吸顶(position:fixed)
    我们先在data中定义一个变量 isTabFixed: false 默认false
  */
  
  this.isTabFixed = (-position.y) > this.tabOffsetTop
  /*
    通过滚动 和 offsetTop 的值的比较决定 data中isTabFixed变量的值
    我们根据位置关系动态决定变量的值
    然后根据变量的值 动态决定css样式position: fixed 动态绑定calss
  */
},


<tab-control
  :titles="['流行', '新款', '精选']"
  class="tab-control"
  @tabClick="tabClick" 
  ref='tabControl' 
  :class='{fixed:isTabFixed}'       我们这里动态绑定class
></tab-control> 
```
当isTabFixed为true的时候绑定这个class 为false的时候不绑定

<br>

上面出现了两个问题:
1. Scoll组件里 关于监听滚动的部分 加上if判断后 home.vue组件中读不到position的值
2. 我们通过定义变量isTabFixed让它控制是否让tabControl组件fixed 但是因为fixed后脱离了文档流, 下面的结构会一下子上去
3. 因为better-scroll是理论是改变transform的translatey 虽然我们给组件fixed的 本应该定位在屏幕上的一个位置, 但是translatey还是可以改变fixed的位置的 fixed的状态 随着屏幕的滚动到滚动走了

上面的问因为better-scroll的原因 class的fixed的方式行不通 那我们就不能采用 class fixed的方法了

<br>

### 解决方式
我们将 ``<tab-control>`` 组件复制一份到 ``<scroll>`` 组件的外面

界面上有两个 ``<tab-control>`` 组件 了
上面这个组件先隐藏 当滚动到一定位置后 显示, 其实下面的组件会随着better-scroll滚到上面去

也就是说在滚动区域的外面 然后对这个 ``<tab-control>`` 组件使用v-show  
也就是说 默认它是隐藏的 当滚动的距离大于下面的的offsetTop的时候 我们动态的修改了 isTabFixed 变量的值
```js 
<tab-control
  :titles="['流行', '新款', '精选']"
  class="tab-control"
  @tabClick="tabClick"
  ref="tabControl" 
  v-show='isTabFixed'     根据isTabFixed的值显示或者隐藏
></tab-control>
```

但是上面还有另一个问题 现在界面上有两个``<tab-control>``组件  
我们分别叫做 上组件 和 下组件 当我们点击下组件的新款按钮后 开始滚动 滚动到一定位置 上组件显示 但是上组件展示的 按钮内容 和下组件的不一致
```js 
上组件:   流行    新款    精选
        -----


下组件:   流行    新款    精选
                ----
```
也就是说下组件点击了什么 跟 上组件不能同步

那怎么让两个东西保持一致呢?  
只要我们能拿到``<tab-control>``组件 这个组件中有一个变量记录着谁被选中的
currentIndex

1. 我们给上组件 绑定 ref='tabControl1'    下组件的ref还是tabControl
2. 我们去methods中找到关于 点击组件的处理函数 tabClick
```js 
tabClick(index) {

switch (index) {
  case 0:
    this.currentType = "pop";
    break;
  case 1:
    this.currentType = "new";
    break;
  case 2:
    this.currentType = "sell";
    break;
}

// 这里处理逻辑
// 为了让上组件 和 下组件 的点击效果同步 我们将 index 传递给 上组件的currentIndex
// 两个组件都要设置 因为都要互相同步
this.$refs.tabControl1.currentIndex = index
this.$refs.tabControl.currentIndex = index
```

<br>

### 弹幕大神说
```js 
this.$refs.tabControl.$el.style.transform = 'translateY((-value-this.tabOffsetTop) + px)'
```

<br><br>

# Home离开时记录状态和位置
我们首页滚动到一定的位置, 但我们点击分类页面之后, 再切换到首页 我们希望的停留在用户方才在首页滚动的位置上, 并不是去了其它页面后再回来我们还要从头开是滚动
现在我们的页面的跳转都是同过 router 来管理的, 当我们从首页 -- 关于 跳转到关于界面, 那么首页就会被销毁
```js 
// 我们在home.vue组件中的实例中
destroyed() {
  console.log('首页被销毁')
}
```
当离开home页面的到分类页面的时候确实会, 打印destroy中的代码 当我们再回到home页面的时候, home页面会被重新创建

那怎么才能不让页面被销毁呢?
使用 ``<keep-alive>``  

我们在App.vue中 将页面展示区域``<router-view>``使用``<keep-alive>``包裹起来
```html 
<!-- App.vue -->
<template>
  <div id="app">
    
    <!-- 不需要重新创建页面 保持状态 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>


// 使用<keep-alive>后
destroyed() {
  console.log('首页被销毁')     // 并没有打印 因为首页没有被销毁
},
```

上面还是有些问题, 当我们多次往返之后 页面的位置会出现问题 并没有保持之前的状态, 那怎么才能让Home中的内容保持原来的位置

**解决方法:** 
1. 离开时, 保存一个位置信息
2. 进来时, 将位置设置为原来保存的位置信息

比如离开的时候 我们保存一个saveY, 回来的时候将Y值设置成saveY

想完成上面的逻辑 就要知道什么时候离开 什么时候进来的 之前我们学过两个函数

<br>

**<font color="#C2185B">activated() { ... }</font>**  
当页面处于活跃状态的时候, 执行该回调

<br>
  
**<font color="#C2185B">deactivated() { ... }</font>**  
当页面不处于活跃状态的时候, 执行该回调

<br>
  
我们定义一个变量 saveY 当离开页面的时候 将现在Y的值给变量saveY 当再进入这个页面的时候, 将Y值设置为saveY
```js 
deactivated() {
  // 那离开页面的位置 也就是当前页面的滚动的位置怎么获取?
  // scroll里面有一个属性y 记录着当前页面的当前的滚动位置
  this.saveY = this.$refs.scroll.scroll.y

  /*
    如果觉得上面的写法有点太长了 也可以对它进行下包装在Scroll.vue中 定义一个方法
  */
  
  getScrollY() {
    return this.scroll ? this.scroll.y : 0
  }
},
activated() {
  // 回到页面的时候 Y值应该是-的
  this.$refs.scroll.scrollTo(0, this.saveY, 0)
  // 回来的时候最好调用一下这个 不然后的时候会出现问题 刷新一下
  this.$refs.scroll.refresh();

  // 弹幕大佬说把refresh() 放在上面就好了
}
```


### 弹幕大佬说
对于保持位置 可以在配置里面加上
```js 
keepAlive: true
```
activated必须要用keepAlive 别搞 什么意思?

<br><br>

# 跳转到详情页并且携带id
我们可以随意的点击一个商品 进入到商品的详情页面

**逻辑:**  
点击一个商品 根据点击的商品去服务器请求关于这个商品的所有信息 然后对这个商品的信息进行展示  
也就是获取这个商品的id 根据id去请求数据 然后做展示

点击一个商品就相当于 点击一个 GoodsListItem 那就监听它的点击
```html
<!-- GoodsListItem.vue中 -->
<template>
  <div class="goods-item" @click='itemClick'>    我们给这个div绑定事件


    <img :src="goodsItem.show.img" alt="" @load='imgLoad'>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>


    </div>
  </div>
</template>

<script>
itemClick() {
  // 在这里处理跳转到详情页的逻辑
}
</script>
```

<br>

### 怎么跳转到详情页呢?
我们可以给详情页配置一个路由, 这样就是路由之间的跳转了
详情页也是views文件里的一个大模块 我们在views里面再创建一个detail文件夹

```
| - views
  | - detail
    - Detail.vue
```

然后我们配置路由的映射关系
```
| - router
  - index 中
```

```js 
const Detail = () => import('views/detail/Detail')

{
  path: '/detail',
  component: Detail
}
```

然后我们通过点击 使用 this.$router.push() 来跳转页面 我们跳转到详情页还需要传递过去一些参数 最起码要把点击的商品的id传递过去
```js 
itemClick() {
  // 在这里处理跳转到详情页的逻辑
  this.$router.push('/detail')
}
```

<br>

### 跳转到详情页的时候 传递参数
路由之间跳转传递参数有两种方式
1. 动态路由的方式
```js 
// 在router文件夹里面 index.js中配置动态路由
{
  path: '/detail/:id',
  component: Detail
}
```

2. 传递query的方式  
我们使用this.$router.push()方法的时候传递一个对象
```js 
itemClick() {

  this.$router.push({
    path: '/detail',
    query: {

    }
  })
}
```

这里我们使用动态路由的方法
```js 
itemClick() {
  // 在这里处理跳转到详情页的逻辑 我们在跳转到详情页的时候还要传递商品的id
  // 这里我们采用的是配置动态路由的方式, 那么我们使用push()方法传递数据的时候就要这样进行拼接

  this.$router.push('/detail/' + this.goodsItem.iid)
}
```

详情页接口:  
```
http://152.136.185.210:7878/api/m5/detail?iid=1lrzvr8
```

<br>

那我们通过在home.vue中点击商品 跳转到详情页的同时, 也传递了商品的id  

那么详情页中怎么接收传递过去的参数呢?
```
this.iid = this.$route.params.iid
```

我们通过$route对象的params来获取
```js 
// 组件一创建完毕 我们就获取商品的id 并且保存在data中
created() {
  this.iid = this.$route.params.iid
}
```

<br>

### 接下来我们开始写详情页的页面结构:
1. 导航栏  
因为顶部的导航栏的逻辑还是比较多的 所以我们创建一个组件 然后引入到Detail.vue中
``` 
| - views
  | - detail
    | - childComps
      - DetailNavBar
  - Detail.vue
```

之前我们封装了一个NavBar 我们将它导入到 DetailNavBar.vue 中, 然后将 DetailNavBar.vue导入Detail.vue中
```js 
Detail.vue
    -- >    DetailNavBar.vue
                      -- >    NavBar.vue
```

接下来我们看看 导航栏都需要完成什么样的逻辑
1. 返回按钮的点击
2. 四个按钮的点击
3. 四个按钮的渲染

这个逻辑的代码比较简单就不在详细的写这个部分了
```html
<template>
  <div>
    <nav-bar>
      <template #left>
        <div class='back' @click='backClick'>
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template #center>
        <div class='title'>
          <div v-for='(item, index) of titles' class='title-item' @click=titleClick(index) :class='{active:index===currentIndex}'>{{item}}</div>
        </div>
        
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
 name: 'DetailNavBar',
 components: {
   NavBar
 },
 data() {
   return {
     titles: ['商品', '参数', '评论', '推荐'],
     currentIndex: 0
   }
 },
 methods: {
   titleClick(index) {
     this.currentIndex = index
   },
   backClick() {
     // 这里返回的方法很多 this.$router.back() / go(-1)
     this.$router.back();
   }
 }
}
</script>
```

<br><br>

# $el 所有的组件对象可以通过$el才获取组建中的元素
```js 
<tab-control ref='tabControl'></tab-control>
// 我们通过设置ref this.$refs.name 的形式拿到组件对象

this.$refs.name.$el 就是 <div class='tab-control'> <template>中的所有内容

<template>
  <div class='tab-control'>
  </div>
</template>
```

<br>

# Vue中监听图片的加载
原生中使用 img.onload = function
```js
<img @load='方法'>
```

<br>

# 路径的别名
在项目开发中我们可能在src引用图片路径的时候会写这样的路径
```js 
../../../assets/img/tabbar/home.svg
```

这样写一可能是不合理, 二可能最终找到的是一个错的  
所以在开发中 我们尽量的让多个../不要出现, 那怎么才能找到图片等资源呢? 我们可以给文件夹起个别名

起别名的功能也属于webpack中的配置, 所以我们先找到webpack.base.conf.js文件  
alias属性: (起别名的配置)  
比如下面我们给 src文件夹 起了别名 就意味着以后不用在写../../的写法, 我们可以直接使用@/文件的方式, 这样就会从src文件夹的角度去找文件

真实开发中会为很多文件夹起别名  
```js 
bulid -- webpack.base.conf.js 的 resolve 部分

// webpack.base.conf.js文件
resolve: {

  // 比如配置这里以后导入文件的时候可以省略这些后缀名
  extensions: ['.js', '.vue', '.json'],


  alias: {
    // 这里给src文件夹起了个别名 叫 @
    '@': resolve('src'),
    'assets': resolve('@/assets'),
    'components': resolve('@/components'),
    'views': resolve('@/views'),

    // cli3才可以在(@) 括号中使用 @ cli2的话 写正常的路径把
  }
},
```

### 注意:
上面在webpack配置的resolve规则, 适用场景是 import 导入模块的时候  
当在标签内部的时候使用路径别名还是找不到的
```js 
<img src='@/img/xxx.jpg'>   还是找不到的
```

在标签内部的scr属性中想要使用别名的话 别名前加~ ~别名
```js 
<img src='~@/img/xxx.jpg'>
```

<br><br>

# vue的版本和vue-template-compiler的版本必须一致

<br><br>

# HTML部分: 补充

### select标签
效果就是一个下拉列表

**相关属性:**

**<font color="#C2185B">autofocus: autofocus</font>**  
页面加载后文本区域自动获得焦点

<br>

**<font color="#C2185B">disabled: disabled</font>**  
规定禁用该下拉列表。

<br>

**<font color="#C2185B">multiple: multiple</font>**  
下拉列表可显示多个选项 可以配合size属性使用 规定显示几个

<br>

**<font color="#C2185B">name: name</font>**  
规定下拉列表的名称。

<br>

**<font color="#C2185B">required: required</font>**  
规定下拉列表中可见选项的数目 所有主流浏览器都不支持 required 属性。

<br>

**<font color="#C2185B">size: number</font>**  
规定下拉列表中可见选项的数目。

<br>

**<font color="#C2185B">form: form的id</font>**  
在form表单标签外创建的下拉列表 也属于form       
```html
<select name="carlist" form="carform">
```

```html
<select name="" id="" multiple size='2'>
  <option value="volvo">volvo</option>
  <option value="saab">saab</option>
  <option value="opel">opel</option>
</select>
```

<br>

# 案例模块

# TabBar实现思路
首先 我希望页面中的底部 tabbar 封装成一个组件, 我希望这个 tabbar 不仅能在这个项目里能用, 在下一个项目里也能使用(下一个项目里图片和文字是不一样的), 所以我封装的组件的话, 希望它足够的灵活, 也就是说我这个组件里的图片和文字, 全部不是定义死的全都是由外界动态决定的

首先有一个整体的容器(TabBar组件), 我往里面放上插槽(这样别人就可以动态的往里放东西了, 让别人往里插入封装的另外一个小组件)
```
TabBar组件:
+ ------------------------------ +
+    slot插槽:                   +
+    +-----------------------------+      +
+    +                    +      +
+    +-----------------------------+      +
+ ------------------------------ +

TabBarItem小组件:
+--------+
+        +
+--------+
```

比如说我要往插槽里面放4个(首页 分类 购物车 我的), 那我就往插槽里面放4个TabBarItem小组件  
就意味着我可以用这4个TabBarItem小组件替换掉solt插槽 之后通过flex部分自动的把这4个组件布置好 

TabBarItem小组件里面还可以定义图片的插槽和文字的插槽, 就是很多东西都不要写死(这样别人在用这个小组件的时候就可以动态的决定这个小组件里面放什么东西)
```
TabBarItem小组件:
+--------+
+        +
+--------+
```

而且这个小的组件里面我希望定义一个属性props(用于别人传递过来的一些值, 这个值里我还要定义link属性, 因为点击这个小的TabBarItem的时候我要链接到某一个路由里面), 到时候根据这个link动态的进行相关的跳转

我们封装一些独立的组件, 让我直接可以传入图片传入文字, 到时候根据我传入的图片和文字, 自动显示按钮的图标和文字  
而且当我点击按钮的时候, 能够跳转到对应的组件上

<br>

### 目录结构
```
| - assets
  | - img       图片资源放在这个文件夹里面
    | - tabbar  这里放相关的图片

  | - css       css放在这里面
    base.css    公共的css样式

| - components  放公共抽出来的组件
  | - tabbar    这里面放tabbar的所有组件
    TabBar.vue
    TabBarItem.vue

| - pages / views   放大的页面  每一个页面单独放一个文件夹
  | - home
  | - profile
  | - cart
  | - category

  App.vue
```

<br>

### css的问题
css样式引入的问题?
在App组件里面``<style>``里引入, 因为 main.js 一开始渲染的是 App.vue

引入方法: @import '路径'
如果是在js里引入的话, 我们使用import...from或者require等, 但现在我们是在``<style>``里面引入所以要使用固定格式

css样式写在相关的组件里, 比如TabBar的样式就写在``<style>``标签里

1. tabbar的height一般设置为49px;
2. 当设置position:fixed的时候宽度没有了 所以设置下left:0, right:0

<br>

### 导入组件的问题
在 App.vue 中导入 TabBar.vue
在 ``<script>`` 里 import ... from ... 然后再 App.vue 组件里面注册, 注册完可以通过 ``<TabBar>`` 使用
```js 
import TabBar from './components/TabBar/TabBar'

export default {
  name: 'App',
  components: {
    TabBar
  }
}
```

<br>

### 组件的问题
TabBar组件, 只管TabBar的部分, 里面的内容(小组件)的相关设置不要在TabBar.vue里面

<br>

### 各组件中的模板
### App
```js 
<template>
  <div id="app">
    <TabBar></TabBar>
  </div>
</template>
```

### TabBar
```js 
<template>
  <div id='tab-bar'>
    <slot></slot>
  </div>
</template>
```

### TabBarItem
```js 
<template>
  <div class="tab-bar-item">
    <slot name="item-img"></slot>
    <slot name="item-text"></slot>
  </div>
</template>
```


### 使用插槽的时候
用用``<template>``标签包裹 ``<template #item-img>``
```js 
<template v-slot:item-img>
  <span class='iconfont icon'>&#xe625;</span>
</template>

<template v-slot:item-text>
  <span>首页</span>
</template>
```

### 对上总结:
1. 我们创建组件的时候最好考虑组件的复用性, 在上面的例子中 我们可以这么考虑 先创建一个TabBar组件, 里放上个插槽
2. 创建小组件TabBarItem, 里面放上两个具名插槽
3. 在App.vue文件里调用的时候, 我们通过``<template #slotname>``使用插槽

<br><br>

### TabBarItem 小组件
这个部分对 TabBarItem 小组件 里面的细节做一个补充  

我们需求:
当用户点击或者该组件处于活跃状态的时候我们应该文字和图片都响应的变化  
所以我们增加图片插槽的位置 给处于活跃状态的文件也定义了类

```js 
<template>
  <div class="tab-bar-item">
    <slot name="item-img"></slot>
    <slot name="item-img-active"></slot>
    <slot name="item-text"></slot>
  </div>
</template>
```

现在我们给图片预留出来一个插槽, 当图片处于活跃状态的时候, 我们有可能需要显示另外一张图片  
组件的应用应该是这样的, 使用的人只管放两张图片, 制作的人动态的决定两张图片中显示那张图片(负责逻辑)

一个插槽也不够用啊, 所以图片的位置应该是两个插槽, 两个插槽最终会展示一个  
下面的文字也是, 当处于活跃状态的时候, 应该变成红色吧, 也是应该动态添加某一个类

<br>

### 动态决定显示活跃图片还是非活跃图片
使用 v-if='变量名' 
我们先定义一个变量 isActive=false 默认不展示  
然后在插槽内部使用v-if v-else
```js 
// 这里我们对 isActive 取反 不然就展示 else 了
<slot v-if='!isActive' name="item-img"></slot>
<slot v-else name="item-img-active"></slot>

export default {
  name: "TabBarItem",
  data() {
    return {
      isActive: false;
    }
  }
};
```

<br>

### 动态给文字添加类
我们使用 v-bind:class='{类名: 变量名}'
v-bind:class='{active: isActive} 当 isActive为true的时候绑定active的类
``<style>``标签这也要定义好一个类

```html 
<slot v-bind:class='{active: isActive} 'name="item-text"></slot>

<style>
.active {
  color:#d4237a;
}
</style>
```

这么改完后发现 本应该应用的类并没有应用上 ``<span>``首页``<span>`` 上并没有 active的class    
原因是 ``<slot>`` 标签 最终会被 往里面填入的实际内容替换掉
```html 
<!-- App.vue文件中的代替插槽的<template> -->

<template #item-img>
  <span class='iconfont icon'>&#xe625;</span>
</template>

<!-- 最终会替换掉(ctrl+c ctrl+v)  ====> TabBarItem.vue文件的 -->
<slot v-bind:class='{active: isActive}' name="item-text"></slot>
``` 

那就意味着 App.vue文件中的代替插槽的``<template>`` 中并没有 v-bind:class='{active: isActive}' 这个部分

所以我们在封装插槽的时候 遇到添加类的问题 不会这么简单的封装  
我们会用一层div包裹插槽 然后class用在div这层包裹器上, 这样做的好处是, 即使插槽会被替换掉, 替换的也是``<slot>``的部分, div的样式照样能应用上
```js 
<div class='在这里添加类'>
  <slot></slot>
</div>
```

**最终:**
```html
<template>
  <div class="tab-bar-item">

    <!-- 我图片用的是图标字体 我也想让它有颜色的变化 所以 用一层<div>包裹, 并在上面绑定了动态class -->

    <div v-bind:class='{active: isActive}'>
      <slot v-if='!isActive' name="item-img"></slot>
      <slot v-else name="item-img-active"></slot>
    </div>


    <!-- 因为<slot>标签会被替换掉, 加上<slot>标签上面的class也会被替换掉, 跟没加似的, 所以我们把class属性放在<div>上 -->

    <div v-bind:class='{active: isActive}'>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
```

### 总结:
插槽``<slot>``最终会被替换掉, 所以尽量不要在插槽上设置v-if v-bind v-else等属性, 我们都要给``<slot>``包裹一层``<div>``把上述类似的属性放在这层``<div>``里
也就是说插槽``<slot name=''>``里尽量只有name属性, 其它属性来一层包裹``<div>``
```html
<slot v-if='isActive' name='icon-img'></slot>     错的方式

<div v-if='isActive'>
  <slot name='icon-img'></slot>                   对的方式
</div>
```

<br><br>

### tabbar-TabBarItem和router结合的结果
每当我们点击tabbar里的按钮的时候, 页面上要显示对应的组件
```
  +--------------+
  +              +
  +     首页     +
  +              +
  +--------------+
  +--------+
  +  首页  +
  +--------+
```

这样就意味每一个按钮的点击事件 应该和路由的跳转对应起来

<br>

### 父子组件之间的参数传递
跳转路由里面的路径, 我们需要让调用者传递进来, 也就是 父组件 -- 子组件 传递参数, 因为我们是在App.vue文件中调用TabBarItem.vue文件

所以我们还需要 使用 props属性

**注意:**
父组件传递参数的时候  
如果是 字符串 类型 我们直接写就可以
```html
<TabBarItem path='/home'> </TabBarItem>
```

如果是 变量 类型 我们就要用 v-bind:
```html
<TabBarItem :path='/home'> </TabBarItem>
```


```html 
<!-- TabBarItem.vue文件: -->
<template>
  <div class="tab-bar-item" @click='itemClick'>

    <div v-bind:class='{active: isActive}'>
      <slot v-if='!isActive' name="item-img"></slot>
      <slot v-else name="item-img-active"></slot>
    </div>

    <div v-bind:class='{active: isActive}'>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  props: {
    path: String
  },
  methods: {

    // 这里还有个问题就是push(谁?), 我们需要让别人传递这个路径, 让你用我Item这个组件的时候, 就告诉我跳转的路径是什么 使用props属性, 这样别人在App.vue里面 将要跳转的路径传递进来

    itemClick() {
      // 在这里面进行路由的跳转, 我们根据用户需要不需要返回来决定使用哪个方法
      this.$router.push(this.path);
      this.$router.push(this.path);

      // 看评论知道:
      // 上面直接那么写会因为重复点击按钮会报错, 我们做个判断 判断当前路径和path是否相同
      if(this.$route.path != this.path) {
        this.$router.push(this.path)
      }

      // 解决报错的另外一种方式
      this.$router.push(this.path).catch(err => err)
    }
  }
</script>
```

<br><br>

### 点击按钮让, 让处于活跃状态的组件变色
现在我希望点击按钮后 这个按钮文字变成红色, 图片也会切换到点击的状态
```js 
data() {
  return {
    isActive: false
  }
},
```
我们之前把isActive写在data()函数里面 但写在这里面没办法动态去定义true 还是 false

所以我们要写在 computed 计算属性中, 在这里我们可以动态的决定 isActive 的值
```js 
computed:{
  isActive() {

    // 哪一个路由活跃就能得到活跃路由的path, 然后我们判断下活跃路由的path里面有没有这个页面的path, 活跃的路由是/home, 我们有4个页面 item1(/home) 那就是 true

    // /home - > item1(/home) = true
    // /home - > item1(/category) = false
    // /home - > item1(/cart) = false
    // /home - > item1(/profile) = false

    return this.$route.path.indexOf(this.path) !== -1;
  }
},
```

上面动态的决定了 isActive 的属性是true 还是 false, 接下来就能通过布尔值来决定是否应用active的类了
```js 
// TabBarItem.vue组件里:
<div v-bind:class='{active: isActive}'>

</div>
```

<br>

### 添加新的需求 调用者自己决定活跃的文字颜色
现在活跃状态下的颜色是红色, 当有人想要是粉色紫色的时候怎么办  
我不希望写死颜色(或者说css样式), 我希望用的人可以自己定义颜色

我们希望在 App.vue文件里使用组件的时候, 别人在组件的标签内部 自己写个activeColor='blue', 就会变成对应的颜色  
既然是在 App.vue 里面向 TabBarItem.vue 传递参数 那又是 父子之间的通信 需要使用props属性

我们在 TabBarItem.vue 文件中 继续添加属性
```js 
props: {
  path: String,
  activeColor: {
    type: String,
    default: '#d4237a'
  }
},
```

上面我们是动态绑定 class 还决定 活跃状态的颜色的, 现在因为我们要把 父--子的参数拿到 应用在样式中, 所以没办法使用 :class 了
```js 
// 这么写 只能通过 修改源代码去改颜色
<div v-bind:class='{active: isActive}'>
  <slot name="item-text"></slot>
</div>

// 不使用 :class 了  === > 

<div :style='activeStyle'>
  <slot name="item-text"></slot>
</div>

props: {
  path: String,
  activeColor: {
    type: String,
    default: '#d4237a'
  }
},

computed: {
  activeStyle() {
    // 是否处于活跃
    return this.isActive ? {color: this.activeColor} : {}
  }
}
```

**对上解析:**  
我们要通过组件(TabBarItem.vue)调用者来决定当前的活跃状态下 文字和图片显示什么样式
1. 所以就需要使用 props 属性, 同时我们在props中设置了默认颜色
2. 我们使用 :style='activeStyle' 绑定了一个变量, 同时这个变量又是动���决定的所以 我们要将这个变量放在 computed 计算属性中
```js 
computed: {
  isActive() {
    return this.$route.path.indexOf(this.path) !== -1;
  },
  
  activeStyle() {
    // 是否处于活跃
    return this.isActive ? {color: this.activeColor} : {}
  }
}
```
this.isActive 是计算属性中的变量, 所以它是动态的 看看是否在活跃状态 如果是活跃状态 style='{color: this.activeColor}' 就会变成 用户传递的值  
this.activeColor 是 props 中的属性 用于接收父组件传递进来的参数

3. 在App.vue文件中 把颜色参数传递进来
```js 
  <TabBarItem path='/home' activeColor='purple'>
  </TabBarItem>
```

<br>

### 抽取App.vue中主要组件内容 到一个新的组件里
现在的状态是 App.vue 文件里 我们要往组件的插槽里放内容, 导致App.vue文件内的代码太多, 所以把这些代码抽取到一个组件里 再引入进来

1. 因为是公共样式, 我们抽取到了 components 文件夹里 起名为 MainTabBar.vue
2. 将``<TabBar>``里所有的内容 贴到 MainTabBar.vue的``<template>``中
3. 将 MainTabBar.vue 文件需要用的组件 导入 并注册, 还有iconfont的css文件
4. App.vue文件中引入 MainTabBar.vue 并注册

<br><br>
