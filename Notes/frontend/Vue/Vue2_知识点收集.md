# 回退再前进导致请求重复发送的问题

### 方式1:
在 Vue 的生命周期函数 beforeRouteLeave 中手动取消请求，例如使用 Axios 取消请求的方式
```js
import axios from 'axios';

export default {
  beforeRouteLeave(to, from, next) {
    axios.cancel();
    next();
  },
  ...
}
```

<br>

### 方式2:
通过设置一个标识符来避免重复请求
```js
import axios from 'axios';

export default {
  data() {
    return {
      isRequesting: false,
    };
  },
  methods: {
    getData() {
      if (this.isRequesting) {
        return;
      }
      this.isRequesting = true;
      axios.get('/api/data').then((res) => {
        this.isRequesting = false;
        // 处理数据
      });
    },
  },
  ...
}
```

<br>

# :src 引入图片路径 相关
我们使用 :src 去读取一张图片的时候 配合计算属性等功能时 可能会出现404的错误

遇到该情况下 可以尝试使用如下的方式解决:
1. :src 绑定的图片路径 需要为绝对路径 
2. 使用 require()
3. 将该图片放在public目录下

<br>

### 为什么需要使用 require() ?
```s
https://www.cnblogs.com/lisongming/p/16839892.html
```

<br>

# Vue中定义非响应式数据
```js
let obj = {
  name: "sam"
}

Object.freeze(obj)

export default {
  data() {
    return {
      obj
    }
  }
}
```

<br><br>

# Js模块中使用 router route
1. router:  
我们可以在js文件中 引入 /router/index.js 拿到router

2. route:  
``let route = router.currentRoute`` 就是route

**注意:**  
vue3中我们拿到route 是ref响应对象 我们要拿 route.value

<br><br>

# $attrs & $listeners

## Vue2:

### $attrs:
它什么时候使用呢? 当父组件给子组件传递标签属性的时候, 如果这些标签属性没有在子组件的props中接收的话, 就会到$attrs中

<br>

### $listeners
父组件给子组件绑定的自定义事件, 会存在$listeners对象中

<br>

### 使用场景
我们有3个组件, 父 -> 中转组件 -> 孙

当父组件想给孙组件传递 **数据 和 监听孙组件派发的事件时** 的时候, 需要 中转组件 做中转, 这时**需要中转组件做如下的动作:**
1. inheritAttrs:false
2. 在孙组件标签上写上 v-bind="$attrs" v-on="$listeners"

```html
- <父组件>
    - <中转组件>
        - <孙组件 v-bind="$attrs" v-on="$listeners">
```

这样在孙组件中
- 接收数据的时候 在props中声明
- 孙组件 可以直接使用 emit 来派发父组件上监听的事件 比如父组件在中转组件上监听的是@test, 那么孙组件可以直接派发 test, this.$emit("test")

<br>

## Vue3:
vue3取消了$listeners 父组件中绑定的标签属性 和 自定义事件 都会在子组件的 $attrs中, 按照下面的样式存放
```js
{
  id: 'my-input',
  onClose: () => console.log('close Event triggered')
}
```

我们使用Vue3来复现下上面的场景

<br>

### 使用场景: 
我们有3个组件, 父 -> 中转组件 -> 孙

当父组件想给孙组件传递 **数据 和 监听孙组件派发的事件时** 的时候, 需要 中转组件 做中转, 这时**需要中转组件做如下的动作:**

1. inheritAttrs:false
2. 在孙组件标签上只需要写上 v-bind="$attrs" 即可
```html
- <父组件>
    - <中转组件>
        - <孙组件 v-bind="$attrs">
```

这样在孙组件中

- 接收数据的时候 在props中声明
- 孙组件 可以直接使用 emit 来派发父组件上监听的事件 比如父组件在中转组件上监听的是@test, 那么孙组件可以直接派发 test, this.$emit("test")

<br>

**父组件**
```html
<Transfer test="测试数据" @customerEvent="customerEvent"/>
```

<br>

**中转组件:**
```html
<Son v-bind="$attrs" />

export default {
  inheritAttrs: false
}
```

<br>

**孙组件:**  
```js
// 传递的数据 在props 中接收
const props = defineProps({
  test: {
    type: String,
    default: "默认值"
  }
})

// 自定义事件使用 emits来声明
const emit = defineEmits(["customerEvent"])

// 然后可以直接使用
onMounted(() => {
  console.log(props.test)
  emit("customerEvent", "Son中的数据")
})
```

<br><br>

# 自定义生命周期:
我们可以让 computed 里面返回boolean, 然后让 watch 监视这个计算属性, 在某种规则下调用
```js
computed: {
  ready() {
      return (
        this.isNotEmptyObject(this.mapLayout) &&
        this.isNotEmptyObject(this.mapData)
      )
    },
}

watch: {
  ready(val) {
    if(val) {
      ...
    }
  }
}
```

<br><br>

# Vue3: 函数调用创建组件

**2 -> 3:**  
h、createVNode、render

这里是模仿 element ui 的 $message 方法 也相当于是通过调用 message方法 来创建组件 有点类似下面的 将 Vue组件挂载到全局上的方法

<br>

**Element UI的 Message消息提示组件:**  
当我们点击 Show message 按钮 会触发 open回调, 回调中回调ElMessage()方法 该方法会创建一个提示组件
```js
const open = () => {
  ElMessage("this is a message")
}
```

<br>

### 步骤:
**步骤1: 创建消息提示组件**
```vue
<template>

<div class="wrapper">
  {{content}}
</div>

</template>

<script>
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
1. 通过 h 函数 来创建 Message组件的VNode (h 和 createVnode是一样的)
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

<br><br>

# 将Vue组件挂载到全局上 
参考资料: 
```s
https://blog.csdn.net/weixin_40352044/article/details/124794956
http://t.zoukankan.com/hmycheryl-p-11255929.html
https://vue3.chengpeiquan.com/plugin.html#%E6%9C%AC%E5%9C%B0%E6%8F%92%E4%BB%B6-new
```

<br>

### 要点:
1. 我们在插件js文件中引入 组件
2. 通过 Vue.extend(组件) 的方式 得到 VC
3. 实例化Vc得到 组件
4. 将组件放到body上

<br>

### 步骤:
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

<br><br>

# Vue 转 word
```s
https://blog.csdn.net/m0_47408822/article/details/121099257  
```

```s
npm install html-docx-js --save
npm install file-saver --save

"file-saver": "^2.0.5",
"html-docx-js": "^0.3.1",
```

<br>

### 如果想让 打印的区域有样式 有如下的两种方式:
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

<br><br>

# Vue项目 使用 history 模式 部署到 nginx 上面 会产生Nginx-Vue-History-404问题

我们的vue项目在打包后会生成 dist 文件夹 通常我们会将 dist 文件夹中的内容拖动到 nginx之类的服务器目录下 比如 nginx下的html目录中

```
| - nginx
  | - html
```

然后我们启动 nginx 来访问我们的项目 我们发现切换到其它的页面后刷新就会报404的错误

<br>

### 问题的原因:  
我们的服务器是根据页面路由 去按路径寻找资源 我们打包好的web站点只有一个html页面 不存在其他资源 服务器找不到对应的页面才报404

比如 我们访问 localhost:3000/about, 找不到 about.html 所以会报404 的错误

<br>

### 解决方案:
修改 nginx 配置, 然后 reload 配置文件, 重新定回 index.html 就可以了

我们在 location 配置项里面 添加下面的属性配置项

```sql
location / {
  root html;
  index index.html index.htm;

  try_files $uri $uri/ /index.html;
}
```

**$uri:**  
就是不当前的请求url 但是不包含?参数 然后后面会接上 /index.html

<br>

比如: 我们uri是 /about 那拼接后的结果就是 /about/index.html  
如果给出的file都没有匹配到, 则重新请求最后一个参数给定的uri, 就是新的location匹配

<br>

**常见的变量:**  
- ``$uri:`` 当前请求的 URI, 但不含“？"后的参数

- ``$args:`` 当前请求的参数, 即“？"后的宇符串

- ``$arg_xxx:`` 当前请求里的某个参数, “arg "后是参数的名字

- ``$http_xxx:`` 当前请求里的 xxx 头部对应的值

- ``$sent_http_xxx:`` 返回给客户端的响应头部对应的值

- ``$remote_addr:`` 客户端IP 地址。

- ``$http_cookie:`` 获取cookie值

- ``$cookie_xxx:`` 当前请求的cookie xxx对应的值

- ``$request_uri:`` 浏览器发起的不作任何修改的请求的url中的path 如在www.baidu.com/p1/file?d=111, 其值为/p1/file?d=111

- ``$uri:`` 指当前的请求URI, 不包括任何参数, 反映任何内部重定向或index模块所做的修改

- ``$request_method:`` 请求方法

<br><br>

# hash 配合 ``<component is>``
```s
https://tech.unifa-e.com/entry/2019/05/29/095443
```

<br>

### 思路:
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

<br><br>

# vue2中怎么使用 composition API

1. 安装
```
npm install @vue/composition-api
```

2. 注册
```js
// main.js中
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

3. 使用
```s
import { ref, reactive } from '@vue/composition-api'
```

<br><br>

### ``$attrs``
``$attrs`` 在vc实例身上, ``$attrs`` 是一个对象

``$attrs`` 有点像捡漏的 props声明接收的部分 它捡不到 没声明接收的部分就在它那  

<br>

但是还有一个知识点前面我们没有了解过 就是子组件中我们不利用props配置项来声明接收父组件传递过来的参数 这个数据也会在vc身上 我们可以通过 this 看到 在 ``$attrs`` 身上

这种方式也可以使用父组件通过props传递过来的数据 但是这种方式没有办法对传递过来的数据进行类型限制  

如果我们在子组件使用props配置项声明接收后 我们就可以在模板中直接使用了 但是如果我们不接收的话 在模板中使用的时候 就要 ``$attrs.name`` 这种方式使用  

如果我们在子组件中声明接收了 那么数据就会挂载在vc身上 ``$attrs`` 中就会没有 如果没有声明接收 那么数据就会在 ``$attrs`` 中  

当我们父组件使用props传递数据后 如果我们没有在子组件里面声明接收 数据就会在 ``$attrs``对象里面

<br>

### 问题:
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

### 扩展: attribute 和 property 的区别 
**property:**  
是DOM中的属性 是JavaScript里的对象  
Property是这个DOM元素作为对象 其附加的内容 例如childNodes、firstChild等。

<br>

**attribute:**  
是HTML标签上的特性 它的值只能够是字符串 Attribute就是dom节点自带的属性:   
例如html中常用的id、class、title、align等。

<br><br>

# $slots
这个属性也在vc身上  

### 插槽的概念:   
简单的说下 就是子组件中我们可以定义插槽 然后调用该组件的父组件 可以在子组件中的标签体部分 填入内容

如果 子组件中 没有定义插槽 那么 **父组件中填入的内容就会在** vc身上的 $slots 属性中

在$slots中的数据是Vnode 一旦我们在子组件中使用``<slot>``标签挖了坑后  
那么 $slots 中的虚拟节点就会变成真实的DOM节点

$slots: 我们可以在子组件中的 $slots 属性中 取出父组件传递过来的插槽内容

