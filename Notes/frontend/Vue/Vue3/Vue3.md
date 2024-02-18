# defineOptions 宏
```s
https://vue-macros.dev/macros/define-options.html
```

它相当于我们Vue2中的options api

在Vue3.3开始我们可以使用该宏在 setup 中 定义如下内容

```js
defineOptions({
  name: 'Layout',
  inheritAttrs: false
})
```

<br>

### 注意:
和 props 有所不同, 透传 attributes 在 JavaScript 中保留了它们原始的大小写, 所以像 foo-bar 这样的一个 attribute 需要通过 `$attrs['foo-bar']` 来访问

<br><br>

# Vue2 和 Vue3 的生命周期

|Vue2(选项式API)|Vue3(setup)|描述|
|:--|:--|:--|
|beforeCreate|-|实例创建前|
|created|-|实例创建后|
|beforeMount|onBeforeMount|DOM挂载前调用|
|mounted|onMounted|DOM挂载完成调用|
|beforeUpdate|onBeforeUpdate|数据更新之前被调用|
|updated|onUpdated|数据更新之后被调用|
|beforeDestroy|onBeforeUnmount|组件销毁前调用|
|destroyed|onUnmounted|组件销毁完成调用|

<br><br>

# Vue2 和 Vue3 的数据传递

|方式|Vue2|Vue3|
|:--|:--|:--|
|父传子|props|props|
|子传父|$emit|emits|
|父传子|$attrs|attrs|
|子传父|$listeners|无(合并到attrs方式)|
|父传子|provide|provide|
|子传父|inject|inject|
|子组件访问父组件|$parent|无|
|父组件访问子组件|$children|无|
|父组件访问子组件|$ref|expose&ref|
|兄弟传值|EventBus|mitt|

<br><br>

# Vue2 和 Vue3 中路由守卫的使用区别
|路由名|Vue2|Vue3|
|:--|:--|:--|
|全局前置路由守卫|router.beforeEach|useRouter().beforeEach|
|全局后置路由守卫|router.afterEach|useRouter().afterEach|
|独享路由守卫|routes/beforeEnter|routes/beforeEnter|
|组件内的路由守卫(进入前)|beforeRouteEnter|optionsapi(另一个script)/defineOptions|
|组件内的路由守卫(更新)|beforeRouteEnter|onBeforeRouteUpdate|
|组件内的路由守卫(离开前)|beforeRouteLeave|onBeforeRouteLeave|

<br><br>

# Vue对象的响应式类型
1. computed: ref
2. pinia - store: proxy
3. route: proxy
4. router: 普通对象

<br>

# Ts and Vue3

### import type { xxx } from 'vue'
用于导入类型信息, 而不引入具体的运行时代码

这种语法告诉TypeScript编译器在类型检查时需要关注导入的类型, 但在编译后的JavaScript代码中, 不会包含这些导入的类型信息, 从而减小了生成的代码的体积。

<br>

**我们可以从 vue 中导出的类型有:**  
- App: App类型表示一个Vue应用实例, 当你使用createApp函数创建一个Vue应用时, 它返回的就是App类型的实例。

- VNode: VNode类型表示Vue中的虚拟节点, 它是Vue中处理DOM元素的抽象表示。

- Component: Component类型表示一个Vue组件的类型。你可以使用这个类型来定义组件的结构。

- DefineComponent: DefineComponent类型是一个通用的组件类型, 你可以用它来定义一个Vue组件。

<br>

### Vue中 给 props 定义类型:

**引出 PropType**
使用了 PropType 类型, 这是Vue的类型系统用来指定props的类型的一种方式
```js
import Vue, { PropType } from 'vue';
```

**应用:**  
使用 PropType 来指定 testerConditions 属性的类型

testerConditions的类型是Object, 将这个对象的类型断言为 TesterConditions
```js
props: {
  testerConditions: {
    type: Object as PropType<TesterConditions>,
    required: true,
  },
},
```

<br>

### Vuex 和 Ts 搭配写 配置项的时候:
**1. 引入**  
```js
import { GetterTree, ActionTree, MutationTree } from 'vuex';
```

<br>

**2. 定义 state 的类型**  
1. 使用 typeof 检查state函数的类型
2. 使用 ReturnType 获取到函数中返回值的类型
3. 将这个类型作为state的类型
```js
// vue3中的state的的形式是函数, 且要return一个值
const state = () => {
  return new TesterAdapter();
};

// 获取 state 的类型 拿到上面函数中返回值的类型
type TesterState = ReturnType<typeof state>;
```

<br>

**3. getters 的写法**  
```js
const getters: GetterTree<TesterState, TesterState> = {
  // 下面是函数(想想computed)
  [types.GETTER_TESTER](state: TesterState): TesterAdapter {
    return { ...state };
  }
};
```

<br>

**4. actions 的写法**  
```js
const actions: ActionTree<TesterState, TesterState> = { }
```

<br>

**5. mutation 的写法**  
```js
const mutations: MutationTree<TesterState> = { }
```

<br><br>

# Ts如果对待Vue中this

**场景:**  
在 Vue2 的场景中 我们可以会通过 Vue.extend({}) API 来创建一个个的组件 这样 this 可能会指向其中的任意一个组件 ts会推断不了this指向谁 

所以Ts可能会利用类型断言 实现this指向不同的对象 DataPollingMixin 就是一个组件

这样我们就能将this确定为一个指定的组件了

```js
// 首先先断言这个this是实例类型 然后泛型中指明是哪个实例类型
(this as InstanceType<typeof DataPollingMixin>).startDataPolling();
```

<br>

### ``InstanceType<typeof T>``: 
返回对应组件的类型

InstanceType 是一个 TypeScript 内置的泛型工具类型, 它接受一个构造函数类型, 并返回该构造函数的实例类型。

它接收一个 **构造函数的类型** 作为参数, 并返回该构造函数的实例类型

```js
class Demo {
  name: string = 'sam'
}

type demoType = InstanceType<typeof Demo>
```

<br><br>

# 在setup中定义的变量 在哪
我大概找了下 从proxy出发 在$上, setupState 里面

<br><br>

# 静态资源的动态访问: 动态引入图片报错的404问题

### 问题描述:
我们的图片存放在 ``/src/assets`` 下, 我们页面中会有月份按钮, 点击月份按钮 动态的切换背景图

<br>

**静态状态:**  
```scss
.container {
  // 目前这里是写死的
  background: url(./assets/1.jpg)
}
```

<br>

**实现动态切换:**  
```html
<div
  class="container"
  :style="{
    backgroundImage: `url(${path})`
  }"
>
</div>
<script setup>
  const path = ref('')

  // 当我们点击 月份按钮 的时候 修改path的值
  function handleChange(val) {
    path.value = `./assets/${val}.jpg`
  }
</script>
```

代码写完后 我们点击按钮 发现页面根本没有背景, 在控制台中我们观察styles面板 能够看到 container元素的背景图片路径为
```scss
element.style {
  background-image: url(./assets/9.jpg)
}
```

<br>

### 问题:
我们能看到该元素的背景图片路径明明是存在图片的, 而且在静态的时候明明就是有背景图片的 为什么动态之后就没有了呢?

我们观察下在静态时候 控制台中图片的路径是什么?
```scss
element.style {
  background-image: url(./assets/1-35cc88d3.jpg)
}
```

<br>

**我们源码中写的图片路径明明是1, 但是运行的时候图片的路径为什么是2呢?**
1. background: url(./assets/1.jpg)
2. background-image: url(./assets/1-35cc88d3.jpg)

<br>

### 解答:
我们项目运行的环境(浏览器看到的页面)是打包的结果, 在运行的代码是打包后结果里面的代码 因此在运行的时候需要的图片路径是什么?

**是打包之后的图片路径**

我们观察下 ``./assets/1.jpg`` 这个图片 在打包后的路径是 ``/dist/assets/1-35cc88d3.jpg``

因此页面才能正常的读到

<br>

### 问题: 为什么下面的这种方式就不行呢?
```html
<script setup>
  const path = ref('')

  // 当我们点击 月份按钮 的时候 修改path的值
  function handleChange(val) {
    path.value = `./assets/${val}.jpg`
  }
</script>
```

我们写的资源路径是什么? 是源码中的路径 并不是打包结果中的路径, 那怎么解决?

我们期望vite脚手架能够帮我们进行自动转换, 但是我们写的源码中的路径既不是css中的静态路径也不是img src中静态路径

所以vite没有办法帮我们进行转换, container的背景图片仍然是源码中的路径 而不是打包结果后的路径 所以找不到资源 报了404的错误
```scss
element.style {
  background-image: url(./assets/9.jpg)
}
```

<br>

### 问题: 怎么自动转换
为什么我们写的是 ``./assets/1.jpg`` 而它能自动转换成 ``/dist/assets/1-35cc88d3.jpg``

<br>

### 解答: vite脚手架会对路径进行自动转换
这是因为脚手架工具, vite脚手架会对路径进行自动转换 它会对如下的情况的路径进行转换
1. css中的静态路径 比如如下的静态路径 vite就会帮我们将写的资源的路径 转换为 打包后的 资源路径
  1. background: url()
  2. img标签中的 src

2. import()语句, 注意路径中必须含有变量
3. new URL(), 注意路径中必须含有变量

<br>

### 动态路径下, 解决404的方式
我们解决404的问题的方式 就是要想办法让这个路径变成打包之后的路径

<br>

**方式1: 依次将静态资源import进来**  
```js
import springImg from './assets/spring.jpg'
console.log(springImg)
// /assets/spring-2ee14cc2.jpg
```  

因为我们导入的是这张图片对应的打包之后的路径

<br>

**方式2: 将assets文件夹放入到public下**   
放到public中的东西 它会将这些静态资源原封不动的放入到打包结果里面 (assets中的静态资源名 和 dist中的静态资源名 一样)

这样就磨平了源码中和打包结果中的差异 就不会报404的问题

问题: 静态资源图片丢失了文件指纹, 如果我们的图片永久都不会变化那么放入到public也可以

<br>

**方式3: 动态导入**  
import语句中必须有变量
```js
function handleChange(val) {
  import(`./assets/${val}.jpg`).then(res => {
    console.log(res)
    /*
      Module {
        default: /assets/spring-2ee14cc2.jpg
        Symbol(Symbol.toStringTag): "Module"
      }
    */  
    
    path.value = res.default
  })
} 
```

vite脚手架 看到import语句且语句有含有变量的时候 它会将该路径下(assets)所有的东西全部生成到打包结果

我们观察dist文件夹会发现每张图片都是如下的两个文件, 每一张图片都带有一个js文件
1. 1-447c06c7.jpg
2. 1-447c06c7.js

```js
const s = '/assets/spring-2ee14cc2.jpg'
export { s as default }
```

<br>

**方式4: new URL**  
它是js的原生对象 但是在vite中会有一些特别的含义 它的作用是产生一个URL地址对象 它要传递两个参数
1. 相对路径
2. 相对谁

```js
// App.vue
function handleChange(val) {
  // import.meta.url相对于当前js文件
  const url = ew URL(`./assets/${val}.jpg`, import.meta.url)
  path.value = url.pathname
} 

/*
  {
    href: 'http://127.0.0.1/assets/spring-2ee14cc2.jpg',
    pathname: '/assets/spring-2ee14cc2.jpg'
  }
*/
```

<br>

**扩展: import.meta.url**
import.meta.url 返回的是当前模块的绝对路径（URL）, 或者说 当前js文件的绝对路径
```s
project-root
├── src
│   └── main.js
├── public
├── node_modules
├── package.json
└── ...
```

比如我们要是在 main.js 里面输出 ``console.log(import.meta.url)`` 那么它的输出就是``file:///your/project/root/src/main.js``

<br><br>

# computedRefImpl的值是不能被JSON.stringify()的
就如标题这样 会报错

一般在发送请求的时候 我们的请求参数默认被JSON.stringify(), 所以这时如果有上述类型的数据就会报错

<br><br>

# 现象
我们知道在vue3中只有使用ref和reactive定义的变量才是响应式的 但是下面的这种情况 普通数据也会更新
```js
// 不是响应式数据
let test = "test的默认值"
let test2 = ref(1)

const handleClick = () => {
  test = "test修改后的值"

  // 当test 和 test2 一起更新的时候, test也会被被动更新
  test2.value = 3
}
```

<br><br>

# 全局组件:
引入的组件 不是在模版中调用 也就是我们不想写在template中, 比如插件组件, 全局组件层

<br>

### 实现步骤:
- 先将组件通过 ``createVNode`` 转换为虚拟DOM  
- 再将虚拟DOM 通过 ``render`` 挂载到真实的DOM中 
- 最后通过 vnode.component?.exposed. 的方式 找到该组件实例暴露出来的属性和方法

```js
// 导入组件
import loadingBar from "../components/loadingBar.vue"

// 从vue中导入createVNode render
import {createVNode, render} from "vue"

// 将导入的组件转换为 虚拟节点
const vnode = createVNode(loadingBar)

// 将虚拟节点挂载到 body 上
render(vnode, document.body)


// 配置白名单
const whiteList = ["/login"]

// 进入目标组件前展示 loadingBar 组件
router.beforeEach((to, from, next) => {

  vnode.component?.exposed?.startLoading()


  if(whiteList.includes(to.path) || localStorage.getItem("token")) {
    next()
  } else {
    next("/login")
  }
})

router.afterEach((to, from) => {
  vnode.component?.exposed?.endLoading()
})
```

<br>

弹幕说还可以这么调用:
```js
getCurrentInstance().proxy.$loading.show()
```

<br><br>

# 安装 less
弹幕说 vite 不用装 loader
```
npm i less less-loader -D
```

<br><br>

# 环境变量的配置 
**场景1:**  
他主要的作用就是让开发者区分不同的运行环境, 比如
- 生产环境使用线上地址
- 开发环境使用本地地址

Vue中给我们提供了环境变量 让我们区分开发环境

<br>

**场景2:**  
我们可以开发一些功能让其在测试环境中展示 而生产环境和开发环境没有

<br>

## Vue3中环境变量的位置:
```js
import.meta
```

import.meta 身上有4个属性
- import.meta.env
- import.meta.url
- import.meta.hot
- import.meta.glob

<br>

**<font color="#C2185B">url:</font>**  
文件在服务器上的位置吧
```
http://localhost:5173/src/App.vue
```

<br>

**<font color="#C2185B">hot:</font>**  
它是一个对象, 作用不明
```js
{
  accept:,
  acceptExports:,
  data: ,
  dispose:,
  invalidate: f,
  on: f,
  prune: f,
  send: f,
}
```

<br>

**<font color="#C2185B">glob:</font>**  
我们可以用来找项目中所有的指定文件
```js
const pages = import.meta.glob('../views/**/page.js')

// 属性名为: page.js 的路径
// 属性值为: 动态导入的函数 - 懒加载
{
  ../views/about/page.js: () => import('/src/views/about/page.js'),
  ../views/contact/page.js: () => import('/src/views/contact/page.js')
}

// 如果我们追加第二个参数 那么我们得到的属性值的部分就是文件的模块对象, 它的default属性中就是page.js中export出来的对象内容, 如果追加了import属性的话, 就不会default属性读取了 直接就是page.js中导出的结果
const pages = import.meta.glob('../views/**/page.js', {
  eager: true,
  import: 'default' //再读取内容的时候不用使用default属性了
})

// 不加 import: 'default'
{
  ../views/about/page.js: Module { Symbol(...) },
  ../views/contact/page.js: Module { Symbol(...) },
}
// 加 import: 'default'
{
  ../views/about/page.js: { menuOrder: 3, title: '关于'},
  ../views/contact/page.js: { menuOrder: 2, title: '联系'},
}
```

<br>

**<font color="#C2185B">env:</font>**  
它是一个对象 存放着当前Vue默认的环境变量
```js
// 路由的应用前缀
BASE_URL: "/",

// 当前运行的环境, npm run dev的话就是true
DEV: true,

// 开发环境的字符串吧 或者是 webpack 的mode?
MODE: "development",

// npm run build 的话就会设置为true
PROD: false,

// 服务端渲染的时候
SSR: false
```

上面对象中的值也可以自己设置 但是不要做动态修改下面对象中的值, 在生产环境中会使用硬编码的方式进行转化 硬编码之后是无法动态修改的

<br>

### 自定义环境变量:

**1. 创建.env.xxx文件**
比如 在根目录下创建 .env.development 文件 相当于配置dev环境下的变量
```sql
VITE_XXX = 值

-- 如:
VITE_API = http://www.baidu.com
```

<br>

我们在配置生产环境中的变量 创建 .env.production 文件
```sql
VITE_API = http://www.jd.com
```

<br>

**2. 在package.json中进行配置 使其生效:**
使用参数 ``--mode + .env.这个部分的名字`` 
```js
"script": {
  "dev": "vite --mode development",
}
```

然后我们通过 npm run dev 启动项目后 import.meta.env 对象中就会有我们预定义的环境变量

<br>

生产环境中默认就会读取 ``.env.production`` 配置文件 所以不需要在 package.json 中进行配置

<br>


## vite.config.ts 中使用环境变量
上面的方式是在项目中使用 但是 vite.config.ts 这种配置文件是没有 import.meta 的 

在这里我们会使用 vite 提供给我们的工具函数

<br>

### loadEnv
**引入:**
```
import {loadEnv} from "vite"
```


<br>

**2. 修改 vite.config.ts的形式:**  
含: 别名的配置方式
```js
// 之前
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 别名
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})



// 之后
export default ({mode:any}) => {

  // 高阶函数
  return defineConfig({
    plugins: [vue()],
    // 别名
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  })
}
```

<br>

**3. 使用 loadEnv(mode, process.cwd())获取不同环境下定义的环境变量对象:**  

**参数mode:**   
就是当前的运行环境 我们需要将 vite.config.ts 里面的形式修改为如下

**process.cwd():**  
用来获取项目的根目录

**返回值:**    
环境变量对象, 里面有我们在环境配置文件中配置的东西
```js
let env = loadEnv(mode, process.cwd())
console.log(env.VITE_API)
```

<br><br>

# Vue3的性能优化:
这个部分可以专门的看下 vite 的部分

vite的打包是通过 rollup 的 所以我们观察性能的话 可以使用 rollup 的插件

看看打包后的代码体积 看看哪个部分能优化下

**安装:**  
```
npm i rollup-plugin-visualizer
```
<br>

**引入:**  
在 vite.config.js 中引入 然后放入插件的配置项中
```js
import {visualizer} from "rollup-plugin-visualizer"

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), visualizer({
    open: true
  })],
  // 别名
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
```

<br>

**打包:**  
打包完毕后会弹出一个网页 然后我们就能看到 kinto项目中那个奇怪的页面
```
npm run build
```

<br><br>

# Vue开发桌面程序 Electron
我们用的VsCode 也是 electron 开发的

<br>

## 官网:
```
https://www.electronjs.org/
```

<br>

## 版本发布
```
npm i -D electron@latest

# Electron 19.0.8
# Node 16.14.2
# Chromium 102.0.5005.148
```

```
npm i -D electron@beta

# Electron 20.0.0-beta.9
# Node 16.15.0
# Chromium 104.0.5112.39
```

```
npm i -D electron@alpha

# Electron 20.0.0-alpha.7
# Node 16.15.0
# Chromium 104.0.5173.0
```

```
npm i -D electron@nightly

# Electron 21.0.0-nightly.7
# Node 16.15.1
# Chromium 105.0.5173.0
```


electron 内置了 Chromium 和 nodeJS 其中 Chromium 是渲染进程 主要渲染和解析HTML, Nodejs作为主进程, 其中管道用IPC 通信


<br>

### 使用vite 构建 electron项目:
```js
// 初始化vue3项目
npm init vue@lastest
```

<br>

### 安装electron:
```js
npm install electron -D

// vite中支持electron的插件
npm install vite-plugin-electron -D
```

<br>

### 配置electron:
我们在 vite.config.ts 文件中 先引入electron
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import electron from "vite-plugin-electron"

export default defineConfig({
  plugins: [vue(), electron({
    main: {
      // 指定electron的入口文件
      entry: "./electron/index.ts"
    }
  })]
})

```

<br>

### 创建 electron 的入口文件:
```js
// 根目录
| - electron
  - index.ts
```

```js
// app: 应用程序, BrowserWindow: electron框体
import { app, BrowserWindow } from 'electron'

import path from 'path'
//app 控制应用程序的事件生命周期
//BrowserWindow 创建并控制浏览器窗口
 
let win: BrowserWindow | null;

//定义全局变量获取 窗口实例
const createWindow = () => {
  win = new BrowserWindow({
    //
    webPreferences: {
      devTools: true,

      // 支持electron语法并与node做集成
      contextIsolation: false,
      nodeIntegration: true
      //允许html页面上的javascipt代码访问nodejs环境api代码的能力
    }
  })

  // 如果打包后 该属性为 true
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
        
    //VITE_DEV_SERVER_HOST 如果是undefined 换成  VITE_DEV_SERVER_HOSTNAME
    win.loadURL(`http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`)
  }
}
/*
  isPackage 不好使换下面的
  if(process.env.NODE_ENV != 'development'){
    win.loadFile(path.join(__dirname, "../index.html"));
  }else{
    win.loadURL(`http://${process.env['VITE_DEV_SERVER_HOSTNAME']}:${process.env['VITE_DEV_SE//RVER_PORT']}`)
  }
*/
   
//在Electron完成初始化时被触发
app.whenReady().then(createWindow)
```

<br>

### 修改 package.json:
- 去掉 type: module 配置项
- 配置入口文件: 添加 "main": "dist/electron/index.js"

<br>

### 启动项目:
```js
npm run dev
```

<br>

### 打包 electron 项目:
需要安装electron-builder

**安装:**
```
npm install electron-builder -D
```

<br>

**修改 package.json build命令:**
```js
"build": "vue-tsc --noEmit && vite build  &&  electron-builder",
```

<br>

**修改electron入口文件:**
当我们打完包之后 就不应该走 localhost 了 上面的入口文件已经填入了打包后入口文件的判断 直接使用就可以

<br>

**package.json中添加 electron 配置项:**
```js
"build": {
  "appId": "com.electron.desktop",
  "productName": "electron",
  "asar": true,
  "copyright": "Copyright © 2022 electron",
  "directories": {
    "output": "release/"
  },
  "files": [
    "dist"
  ],
  "mac": {
    "artifactName": "${productName}_${version}.${ext}",
    "target": [
      "dmg"
    ]
  },
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": [
          "x64"
        ]
      }
    ],
    "artifactName": "${productName}_${version}.${ext}"
  },

  // 应用安装过程的配置
  "nsis": {
    "oneClick": false,
    "perMachine": false,
    "allowToChangeInstallationDirectory": true,
    "deleteAppDataOnUninstall": false
  },
  "publish": [
    {
      "provider": "generic",
      "url": "http://127.0.0.1:8080"
    }
  ],
  "releaseInfo": {
    "releaseNotes": "版本更新的具体内容"
  }
}
```

<br>

**nsis 配置详解:**
```js

{
  "oneClick": false, // 创建一键安装程序还是辅助安装程序（默认是一键安装）

  "allowElevation": true, // 是否允许请求提升, 如果为false, 则用户必须使用提升的权限重新启动安装程序 （仅作用于辅助安装程序）

  "allowToChangeInstallationDirectory": true, // 是否允许修改安装目录 （仅作用于辅助安装程序）

  "installerIcon": "public/timg.ico",// 安装程序图标的路径

  "uninstallerIcon": "public/timg.ico",// 卸载程序图标的路径

  "installerHeader": "public/timg.ico", // 安装时头部图片路径（仅作用于辅助安装程序）

  "installerHeaderIcon": "public/timg.ico", // 安装时标题图标（进度条上方）的路径（仅作用于一键安装程序）
  
  "installerSidebar": "public/installerSiddebar.bmp", // 安装完毕界面图片的路径, 图片后缀.bmp, 尺寸164*314 （仅作用于辅助安装程序）

  "uninstallerSidebar": "public/uninstallerSiddebar.bmp", // 开始卸载界面图片的路径, 图片后缀.bmp, 尺寸164*314 （仅作用于辅助安装程序）

  "uninstallDisplayName": "${productName}${version}", // 控制面板中的卸载程序显示名称

  "createDesktopShortcut": true, // 是否创建桌面快捷方式

  "createStartMenuShortcut": true,// 是否创建开始菜单快捷方式

  "shortcutName": "SHom", // 用于快捷方式的名称, 默认为应用程序名称

  "include": "script/installer.nsi",  // NSIS包含定制安装程序脚本的路径, 安装过程中自行调用  (可用于写入注册表 开机自启动等操作)

  "script": "script/installer.nsi",  // 用于自定义安装程序的NSIS脚本的路径

  "deleteAppDataOnUninstall": false, // 是否在卸载时删除应用程序数据（仅作用于一键安装程序）

  "runAfterFinish": true,  // 完成后是否运行已安装的应用程序（对于辅助安装程序, 应删除相应的复选框）

  "menuCategory": false, // 是否为开始菜单快捷方式和程序文件目录创建子菜单, 如果为true, 则使用公司名称
}
```

<br>

**执行打包命令:**
```
npm run build
```

<br>

**electron的调试工具:**
debugtron

<br>

**应用白屏的方案:**
安装 cross-env, 通过这个包我们去设置环境变量
```
npm i cross-env 
```

<br>

安装后 在 package.json 中修改环境变量
```js
"script": {
  "dev": "cross-env NODE_ENV=dev vite"
}
```

electron中可以使用 ``process.env.NODE_ENV`` 来查看我们设置的变量

<br>

**解决方式:**    
上面 electron 入口文件中已经做了处理 我们使用 注释起来的部分就可以了


<br><br>

# 将移动端项目打包成app
- 可以使用 hbuild 云打包
- 可以使用原生安卓里面套一个webview 将我们的网页放进去做成混合开发的形式
- fullter将我们的页面放进去

<br><br>

# Vue3如何开发移动端
移动端的开发最难的就是适配 这里我们说下 vw vh 的适配方案

### 安装:
```
npm install postcss-px-to-viewport -D
```
因为vite中已经内联了 postcss 所以并不需要额外的创建 postcss.config.js 文件

<br>

### 配置 vite.config.ts
```js
import { fileURLToPath, URL } from 'url'
 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'


// 引入我们上面下载的插件
import postcsspxtoviewport from "postcss-px-to-viewport" //插件


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    postcss: {
      plugins: [

        // 调用我们能下载的插件
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度

          // up只用上面的两个配置 而且up使用的是320


          unitPrecision: 6, // 转换后的精度, 即小数点位数
          propList: ['*'], // 指定转换的css属性的单位, *代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位, 默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位, 默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名, 
          minPixelValue: 1, // 默认值1, 小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换, 默认false
          replace: true, // 是否转换后直接更换属性值
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

如果你用的vite 是 ts postcsspxtoviewport插件并没有提供声明文件我已经帮大家写好了声明文件（良心）
```js
// 先尝试安装插件的声明文件
npm i --save-dev @type/postcss-px-to-viewport
```

<br>

**手写声明文件:**  
在根目录创建: postcss-px-to-viewport.d.ts
```js
declare module 'postcss-px-to-viewport' {
 
  type Options = {
    unitToConvert: 'px' | 'rem' | 'cm' | 'em',
    viewportWidth: number,
    viewportHeight: number, // not now used; TODO: need for different units and math for different properties
    unitPrecision: number,
    viewportUnit: string,
    fontViewportUnit: string,  // vmin is more suitable.
    selectorBlackList: string[],
    propList: string[],
    minPixelValue: number,
    mediaQuery: boolean,
    replace: boolean,
    landscape: boolean,
    landscapeUnit: string,
    landscapeWidth: number
}

  export default function(options: Partial<Options>):any
}
```

<br>

**打开 tsconfig.config.json文件 添加声明文件**  
注意我们打开的文件名 还有一个 tsconfig.json 注意不要打错了 没有的话自己创建一个?

tsconfig.config.json该文件是给 vite.config.ts 使用的

tsconfig.json该文件是给vue去用的

```js
// tsconfig.config.json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",

  // 在这里的最后一个成员添加postcss-px-to-viewport.d.ts 声明文件
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue", "postcss-px-to-viewport.d.*"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```


<br><br>

# Vue3集成Tailwind CSS:
Tailwind CSS 是一个由js编写的CSS 框架 他是基于postCss 去解析的

它是根据类名去驱动样式的 跟bootstrap差不多都是通过预定义的类名去设置样式

它的生产体积特别的小

<br>

## 官网:
```
https://www.tailwindcss.cn/
```

<br>

## postCss 功能介绍:
1. 增强代码的可读性 （利用从 Can I Use 网站获取的数据为 CSS 规则添加特定厂商的前缀 Autoprefixer 自动获取浏览器的流行度和能够支持的属性, 并根据这些数据帮你自动为 CSS 规则添加前缀）

2. 将未来的 CSS 特性带到今天！（PostCSS Preset Env 帮你将最新的 CSS 语法转换成大多数浏览器都能理解的语法, 并根据你的目标浏览器或运行时环境来确定你需要的 polyfills, 此功能基于 cssdb 实现）

3. 终结全局 CSS（CSS 模块 能让你你永远不用担心命名太大众化而造成冲突, 只要用最有意义的名字就行了）

4. 避免 CSS 代码中的错误（通过使用 **stylelint** 强化一致性约束并避免样式表中的错误stylelint 是一个现代化 CSS 代码检查工具它支持最新的 CSS 语法, 也包括类似 CSS 的语法, 例如 SCSS ）

<br>

## postCss 处理 tailWind Css 大致流程:

- 将CSS解析成抽象语法树(AST树)
- 读取插件配置, 根据配置文件, 生成新的抽象语法树
- 将AST树”传递”给一系列数据转换操作处理（变量数据循环生成, 切套类名循环等）
- 清除一系列操作留下的数据痕迹
- 将处理完毕的AST树重新转换成字符串

<br>

## PostCSS的插件使用:
```
https://www.postcss.com.cn/
```

我们再使用的过程中一般都需要如下步骤：

1. PostCSS 配置文件 postcss.config.js, 新增 tailwindcss 插件
2. TaiWindCss插件需要一份配置文件, 比如:tailwind.config.js

<br>

## 使用方式:
vscode中有对应的 tailwind 插件可以装上使用

<br>

### 下载:
```js
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

<br>

### 生成配置文件:
```js
npx tailwindcss init -p
```

<br>

### 修改配置文件 tailwind.config.js:  

**2.6版本**
```js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**3.0版本**
```js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

<br>

### 创建一个index.css:
将下面的代码贴入
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

<br>

### 在main.ts 引入:
将上面的css文件在主文件中引入
```js
import "./index.css"
```

<br><br>

# 实验性的宏函数
生产环境中不要使用, 要是想试着做的话 需要升级 vue版本到, 3.2.25 以上

好像这种方式只能定义在 ``<script setup>`` 中

<br>

## 手动开启 新特性
**使用的是 vite 的情况下:**
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(
    {
      // 添加该配置就可以
      reactivityTransform: true
    }
  )]
})
``` 

<br>

**使用的是 vue-cli 的情况下:**
vue.config.js
```js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          reactivityTransform: true
        }
      })
  }
}
```

<br>

### 特性1: $ref
在之前ref 修改值 和 获取值 都要.value 一下 感觉很繁琐, 不想用.value 我们可以使用vue3的新特性$ref 我们可以直接使用$ref 宏函数 就不需要.value 了

<br>

**引入:**
```js
import {$ref} from "vue/macros"
```

<br>

**使用:**
```js
let count = $ref<支持泛型>(0)

function increment() {
  // 无需 .value
  count++
}
```

<br>

**watch时候的问题:**  
应为他编译之后就是 count.value 并不是一个ref对象所以watch 无法监听而且会抛出一个警告

解决这个问题需要$$ 符号 就是再让他编译的时候变成一个ref 对象不加.value 

```js
// 使用 $$ 将其再变回ref对象
watch($$(count),(v)=>{
  console.log(v)
})
```

<br>

### 语法糖有如下这些  
```
ref         -> $ref
computed    -> $computed
shallowRef  -> $shallowRef
customRef   -> $customRef
toRef       -> $toRef
```

<br>

**还有 ``$() $$()`` 用于结构 官方文档中有 但没看**

<br><br>

# Vue3中的样式穿透 插槽选择器 全局选择器: 

## 样式穿透:

### <font color="#C2185B">:deep(目标选择器) { ... }</font>  
```css
.ipt {
  :deep(.el-input__inner) {

  }
}

.ipt {
  &:deep(.el-input__inner) {

  }
}

.ipt :deep(.el-input__inner) {

}
```

<br>

## 插槽选择器:
### <font color="#C2185B">:slotted(目标选择器)</font>  

下面的标签体中的 .slot-area 我们是定义在父组件里面的 在父组件中定义样式是没有问题

但是如果我们是在子组件中 想通过 .slot-area 来修改样式是不行的 这时候我们要使用插槽选择器
```html
<!-- 父组件 -->
<A>
  <div class="slot-area"></div>
</A>



<!-- 子组件 -->
<style>
/* 单纯这样是不行的 */
.slot-area {

}

/* 使用插槽选择器 */
:slotted(.slot-area) {

}
</style>
```

<br>

## 全局选择器:
### <font color="#C2185B">:global(选择器)</font>  
之前我们要是写全局的样式 都是新起一个style标签 不写 scoped 然后在新的style标签中写样式就是全局样式

现在我们可以选择使用全局选择器

```css
:global(div) {
  /* 全局样式 */
}
```

<br>

## 动态css:
### <font color="#C2185B">v-bind(变量当做属性名)</font>  

```js
let color = ref("red")
// css样式
background: v-bind(color)


// 方式2:
let color = ref({
  color: "red"
})
// 加引号
background: v-bind("color.color")
```

<br>

## css module:

### 要点:
在使用cssmodule的时候要注意以下的要点
- 标签属性: 将 scoped 换成 module
- css部分使用 v-bind(变量) 的形式 读取script中的变量
- 模版中使用 **``$style.类名``** 的形式, 使用 style中定义的类名
- 修改 ``$style`` 标识符 使用 **module="自定义标识符"** 来修改

```html
<div :class="$style.container"></div>

<!-- 多个类型的时候 为数组 -->
<div 
:class="[$style.container, $style.container2]"></div>

<style module>
  /* 定义样式 */
  .container {
    background: red;
  }
</style>
```

<br>

### ``$style`` 换成自定义名:  
使用的时候 使用 **自定义名.类名的形式**
```html
<style module="自定义名">
  /* 定义样式 */
  .container {
    background: red;
  }
</style>
```

<br><br>

# Tsx:
之前我们都是通过 template 去写模版 现在我们可以使用tsx 有点类似jsx

<br>

## 安装: 
```
npm i @vitejs/plugin-vue-jsx -D
```

<br>

## 配置vite.config.js: 
安装插件什么的 可以在 plugins 中追加
```js
import {defineConfig} from "vite"
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"

export default defineConfig({
  plugins: [vue(), vueJsx()]
})
```

<br>

## 如果要使用Ts 需要配置tsconfig.json
添加如下3项配置
```js
"jsx": "preserve",
"jsxFactory": "h",
"jsxFragmentFactory": "Fragment"
```

<br>

## 创建 xxx.tsx 文件
```js
// 这就是一个组件
const Child = () => (
  <div>
    hello Tsx
  </div>
)

export default Child


// app.vue 中引入
<script setup lang="ts">
import renderDOM from "App"
</script>
```

<br>

## Tsx中的指令:
跟jsx一样 js表达式要使用{} 而不是""

<br>

### v-model:  
ref定义的变量 在模版中是不用使用.value 但是 tsx还是属于js部分 所以要使用.value

```js
// tsx文件
import {ref} from "vue"

let v = ref<string>("")

const Child = () => (
  <div>
    <input v-model={v.value} type="text" />
    {v.value}
  </div>
)

export default Child
```

<br>

### v-show:  
```js
// tsx文件
import {ref} from "vue"

let v = ref<string>("")
let flag = true

const Child = () => (
  <div>
    <div v-show={flag}>晴天</div>
    <div v-show={!flag}>阴天</div>
  </div>
)

export default Child
```

<br>

### v-if:  
不支持 所以我们可以用react的方式解决
```js
// tsx文件
import {ref} from "vue"

let v = ref<string>("")
let flag = true

const Child = () => (
  <div>
    {
      flag 
        ? <div>晴天</div>
        : <div>阴天</div>
    }
  </div>
)

export default Child
```

<br>

### v-for:  
不支持 我们可以使用map 
```js
const Child = () => (
  <div>
    {
      list.map(item => {
        return (<div>{item}</div>)
      })
    }
  </div>
)
```

<br>

### v-bind:  
不支持, 使用方式跟 jsx 一样
```js
<Child num={1} />
```

<br>

### v-on:  
不支持, 使用方式跟 jsx 一样 驼峰, 并且不支持修饰符 我们可用 event 来自己写
```js
<Child onClick={handler} />

// 传参还可以这样
<Child onClick={handler.bind(this, params)} />
```


<br>

### props:  
和 setup() 函数形式是一样的
```js
type PropsType = {
  name: string
}
const Child = (props:PropsType) => (
  <div>
    {props.name}
  </div>
)
```

<br>

### emits:  
和 setup() 函数形式是一样的
```js

// 处理函数
const handler = ctx => {
  ctx.emit()
}

const Child = (props, context:any) => (
  <div>
    {/* 我们将 context 传给函数 */}
    <Child2 onClick={handler.bind(this, context)} />
  </div>
)
```

<br><br>

# Vue3中 css 中也可以使用 v-bind
我们可以在属性值的位置上 使用 v-bind 来绑定 script标签中的变量

```html
<script>
  // 接收 provide 出来的 color
  let color = inject<Ref<string>>("color")
</script>

<style>
  .box {
    /* 绑定 color 变量*/
    background: v-bind(color)
  }
</style>
```

<br><br>

# 联合类型是没有办法使用 ? 可选链的
赋值的时候也是 左边是可选链的时候没有办法复制
```js
const color = inject<Ref<string>>("color")
// color的类型是: Ref<string> | undefined 
```

color的类型是联合类型 所以没有办法使用下面的方式
```js
color?.value = "yellow"
```

<br>

### 解决方式1: 非空断言  
```js
color!.value = "yellow"
```  

<br>

### 解决方式2: inject() 的默认值
```js
// 第二个参数就是默认值
const color = inject<Ref<string>>("color", ref("red"))
```  

<br><br>

# XMLHttpRequest的类型
```js
type nameListType = {
  name: string
}

let xhr:XMLHttpRequest = new XMLHttpRequest()
xhr.open("get", url)
xhr.onreadystatechange = () => {
  if(xhr.readyState == 4 && xhr.status == 200) {
    xhr.responseText
  }
}
xhr.send(null)
```

<br><br>

# setup语法糖中是可以 **直接使用** await
直接使用的时候不需要配合 async 

但是在某个函数中使用await的时候外层函数还是需要使用asynnc

```html
<script lang="ts" setup>
  const data = await axios()
</script>
```

<br><br>

# 全局组件 局部组件 递归组件

## 全局组件的使用场景:
类似后台管理系统中 表格 按钮 文本框 比较多 这样我们就可以将这些组件封装成全局组件 无需再引入了 可以直接的使用

<br>

## 设置全局组件:
在 main.ts 中 使用 **components**
```js
createApp(App).components("全局组件名", Card).mount("#app")
```

<br>

## 弊端:
全局组件编写起来确实非常方便, 当时全局组件就是你一旦定义了, 就会占用系统资源 它是一直存在的, 你在任何地方都可以使用这个全局组件 这势必会对性能产生影响, 比如一个真实的项目, 会有上千个组件, 这些组件由不同人编写, 如果全部是全局组件, 那这个应用打开速度一定是极慢的, 而且流畅度也会受到影响 

全局组件的概括: 只要定义了, 处处可以使用, 性能不高, 但是使用起来简单 


<br>

## 局部组件的使用场景:
使用频率不高的组件 我们只使用 import 导入就可以

<br>

## 递归组件:
如果父组件传递了这样的数据结构 要求子组件来进行渲染
```js
type TreeListType = {
  name: string,
  icon?: string,

  // children数组对象中的属性 的定义方式 可以这样啊
  children?: TreeListType[] | []
}

let data = reactice<TreeListType>([
  {
    name: "No.1",
    children: [
      {
        name: "No.1-1",
        children: [
          {
            name: "No.1-1-1",
          }
        ]
      }
    ]
  }
])


// 子组件接收
type TreeListType = {
  name: string,
  icon?: string,
  children?: TreeListType[] | []
}

// 定义props类型
type PropsType = {
  data: TreeListType[]
}

defineProps<TreeListType>()
```

<br>

如果子组件想要渲染该数据结构 不可能写多层 v-for 那假如写了50层 子组件还要写50个v-for么 这么不科学 这时我们就可以使用 递归组件

<br>

### 使用递归组件的方式1:  
引入 该组件本身 自己引用自己
```html
<!-- 然后另起一个 script 标签 写上 name 配置项 不然会报错 -->
<script lang="ts">
  export default {
    name: TreeItem
  }
</script>


<!-- 注意两个 script 上都要写上ts -->
<script setup lang="ts">
  // 这个组件就是 TreeItem 我们再次引入
  import TreeItem from "./index.vue"

  type TreeListType = {
    name: string,
    icon?: string,
    children?: TreeListType[] | []
  }

  // 定义props类型
  type PropsType = {
    data: TreeListType[]
  }

  defineProps<TreeListType>()
</script>
```

模版中这么使用
```html
<template>
  <div v-for="(item,index) of data">

    {{item.name}}

    <!-- 使用 v-if 定义结束条件 -->
    <TreeItem 
      v-if="item?.children?.length" 
      :data="item.chlidren"/>

  </div>
</template>
```

<br>

### 注意:  
当使用递归组件绑定自定义事件的时候 需要再次在 递归组件上再次绑定自定义事件
```html
<TreeItem 
  // 在绑定一次
  @send="handleClick"
  v-if="item?.children?.length" 
  :data="item.chlidren"/>
```

<br><br>

# 自定义指令 directive

## 自定义指令的声明方式: 对象式
如下的方式是在组件内部创建的自定义指令

自定义指令的名称要遵循下面呢的形式, 带v
```
v+Name

eg:vMove
```

```js
let vMove:Directive = {
  各种生命周期
}
```

由于这个自定义指令对象是在setup中的, 所以模版中就可以使用 ``v-move`` 自定义指令

<br>

## 自定义指令的Ts类型:
- DirectiveBinding 泛型中指明的是 binding 中 value 的值的类型

```js
// 自定义指令的类型
import {Directive} from "vue"

// 自定义指令周期第二个参数的类型
import {DirectiveBinding} from "vue"
```

```js
type dirType = {
  background: string
}

let vMove:Directive = {
  mounted(el:HTMLElement, dir:DirectiveBinding<dirType>) {

  },
}
```

## 自定义指令的参数
```js
<A v-move:customParams.customModifier="{background: '#C2185B'}"></A>
```
- 可以向自定义指令中传递 参数(数据) customParams
- 可以向自定义指令中传递 数据 {}
- 可以向自定义指令中传递 修饰符 

<br>

在每一个生命周期里面都可以接收到 上面传递的参数

<br>

## 演示:
```html
<template>
  <button>切换</button>
  <A></A>
</template>

<script setup lang="ts">
  let flag = ref<boolean>(true)
  
  // 定义自定义指令:
  let vMove:Directive = {

  }
</script>
```

<br>

## 自定义指令的声明方式: 函数式
如果我们只关心 mounted 和 updated 的话 可以写成函数式 其他的钩子是不会触发的

- mounted: 元素插入父级DOM调用
- updated: 我们传递的数据发生变化的时候调用

```js
import A from "./components/A.vue"
import {ref, Directive, DirectiveBinding } from "vue"

let value = ref<string>("")
type dirType = {
  background: string
}

// 定义函数式指令
let vMove: Directive = (el: HTMLElement, binding:DirectiveBinding<dirType>) => {
  el.style.background = binding.value.background
}



<A v-move="{background: 'red'}">
```

<br>

## 自定义指令的钩子函数:
和 vue2 中的不同 不是 bind inserted 等周期 和是和 vue3 的生命周期一致

一般我们会用:
- mounted
- updated
- unmounted

<br>

### 生命周期中的参数:  
每一个生命周期中都能收到 4个参数

- el: 绑定的元素
- value: {}, 我们传递的数据都在这个对象里
- vnode: 当前组件的虚拟DOM 
- prevNNode: 上一个虚拟DOM 没有则为null

```js
// 我们传递了这些 它们就在第二个参数对象中
<A v-move:customParams.customModifier="{background: '#C2185B'}"></A>

// 说明
{
  arg: "customParams",
  value: {background: '#C2185B'},
  oldValue: 上一次的值

  // 修饰符在这里
  modifiiers: {
    // true 代表我们追加了修饰符
    customModifier: true
  },
  instance: 当前组件实例
}


import { Directive, DirectiveBinding } from 'vue';
type dirType = {
  background: string
}

mounted(el:HTMLElement, dir:DirectiveBinding<dirType>) {
  console.log("元素插入父级DOM的时候会调用")

  // 当我们给DirectiveBinding<dirType>传入泛型后 ts就知道 value 中有哪些属性了
  console.log(dir.value.background)
},
```

<br>

### <font color="#C2185B">created:</font>  
元素初始化的时候调用

<br>

### <font color="#C2185B">beforeMount:</font>  
指令绑定到元素后调用 只调用一次

<br>

### <font color="#C2185B">mounted:</font>  
元素插入父级DOM调用

<br>

### <font color="#C2185B">beforeUpdate:</font>  
元素被更新之前调用

<br>

### <font color="#C2185B">updated:</font>  
元素更新的时候调用

<br>

### <font color="#C2185B">beforeUnmount:</font>  
元素被移除前调用

<br>

### <font color="#C2185B">unmounted:</font>  
指令被移除后调用 只调用一次

<br>

## 生命周期的执行顺序:
首次加载页面会执行:
- created
- beforeMount
- mounted

<br>

再次刷新页面:
- beforeUnmount
- created
- beforeMount
- unmounted
- mounted

<br>

使用 v-if 卸载会触发
- beforeUnmount
- unmounted

显示:
- created
- beforeMount
- mounted

<br>

当 value 中 也就是我们传递的数据发生了变化 会进行
- beforeUpdate
- updated

<br>

## 示例:
```html
<script setup lang="ts">
import { Directive, DirectiveBinding, nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';
import A from "./components/A.vue"

let flag = ref<boolean>(true)

// 正常来说ts不知道dir中有什么属性 我们可以定义 type 帮助ts进行推导
// 生命周期第二个参数中属性的类型
type dirType = {
  background: string
}

let vMove:Directive = {
  created() {
    console.log("元素初始化的时候调用")
  },
  beforeMount() {
    console.log("指令绑定到元素后调用 调用一次")
  },
  mounted(el:HTMLElement, dir:DirectiveBinding<dirType>) {
    console.log("元素插入父级DOM的时候会调用")

    // 当我们给DirectiveBinding<dirType>传入泛型后 ts就知道 value 中有哪些属性了
    // console.log(dir.value.background)

    // 使用我们传递的数据 修改dom的背景色
    el.style.background = dir.value.background
  },
  beforeUpdate() {
    console.log("虚拟DOM更新之前会调用")
  },
  updated() {
    console.log("更新后调用")
  },
  beforeUnmount() {
    console.log("元素被移除前调用")
  },
  unmounted() {
    console.log("元素被卸载后调用 调用一次")
  }

}
</script>

<template>
  <button>切换</button>
  <A v-move:customParams.customModifier="{background: '#C2185B'}"></A>
</template>
```

<br>

### 总结:
1. 组件内的自定义指令 直接定义含有自定义指令的对象就可以, 对象名要遵循 vXXX 的格式

2. 全局自定义指令的注册方式为 ``app.directive(key, 指令对象)``, **key要求不能含有 v- 或 v**

<br><br>

## 案例: 自定义拖拽的指令
点击 header 的部分 可以实现拖拽的效果

<br>

### 鼠标拖拽的主要逻辑:  
我们在设置 el元素的left值的时候 left的起点为el的最左边 我们想要完成的是 点击位置作为起点开始拖拽 那么就会出现两个起点  
el元素的起点  
鼠标点击的起点

这个时候 如果我们正常将鼠标位置设置给 el.style.left 那么设置的是el元素的起点 那就相当于设置多了 所以我们要将多的部分剪掉  
减多少? 当我们按下鼠标之后 就计算 **鼠标在元素内的位置: 鼠标点击的位置 - 元素左边距离屏幕的位置**
```
  el的左边
    ↓
    -------
    |   o |
    -------
        ↑
      mouse 
```

<br>

### offsetLeft 搭配 translate()时候的注意点:    
offsetLeft可以理解为获取的是 left 的值 比如 left: 200px 那么获取的就是200  
```css
el {
  left: 300px;
}
```

但是我们的位置可能是由 ``transform: translate(-50%, -50%);`` 计算出来的
```css
el {
  width: 200px;
  left: 300px;
  transform: translateX(-50%);
}
```

我们预期是 300px - 100px(元素的一半) 200px 但是实际上我们获取的还是 left: 300px 的值


```html
<template>
  <div v-move class="box">
    <div class="header"></div>
    <div>内容</div>
  </div>
</template>


<script setup lang="ts">
import { Directive, DirectiveBinding, nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';
import A from "./components/A.vue"


// 定义自定义指令 和类型 无返回值
const vMove:Directive<any,void> = (el:HTMLElement, bingding:DirectiveBinding) => {
  // 获取 header 元素
  let moveEl:HTMLDivElement = el.firstElementChild as HTMLDivElement

  // 给 header 绑定鼠标按下事件
  const mouseDown = (e: MouseEvent) => { 
    // 拿到第一次按下时候的位置
    let x = e.clientX - el.offsetLeft
    let y = e.clientY - el.offsetTop
    
    // 绑定移动事件
    const move = (e: MouseEvent) => {

      // 将鼠标的鼠标 设置给 box元素
      el.style.left = e.clientX - x + "px"
      el.style.top = e.clientY - y + "px"
    }
    document.addEventListener("mousemove", move)

    // 绑定鼠标抬起事件 清除 move 函数
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", move)
    })
  }
  moveEl.addEventListener("mousedown", mouseDown)
}

</script>
```

<br><br>

# Vue2 3之间的区别:

## v-model: component
vue2中有两种方式实现 组件与外部数据的双向绑定
- v-model
- :title.sync="vari"

两者在使用上没有太大的区别 所以在 Vue3 中就舍弃了 .sync 的写法 让 v-model 的写法更贴近于 .sync 

也就是说 component: v-model 在vue3中的使用方式和 .sync 一样

<br>

**参考网址:**
```s
https://segmentfault.com/a/1190000042261811?sort=votes
```

<br><br>

## 使用 v-model 传递数据到子组件

<br>

### 父组件要点
**1. 定义响应式数据**
```js
let strValue = ref<string>('default2')
// eslint-disable-next-line
let numValue = ref<number>(2)
```

<br>

**2. 使用 v-model 将数据传递给子组件**  
1. 父组件使用 ``v-model="strValue"`` 传递给子组件的数据, 子组件在使用props接收的时候 父组件传递的 strValue, 子组件中会使用 默认的 ``modelValue`` 作为key 来接收 

2. 父组件也可以使用 ``v-model:变量名="变量"`` 的形式, 给子组件的props起名字, 这样子组件在使用props接收的时候 key的名字为 ``testNumVal``
```html
<WorkerSearchArea
  v-model="strValue"
  v-model:testNumVal="numValue"
/>
```

<br>

### 子组件要点:
父组件使用 v-model 传递过来的数据, 我们要使用 props 来接收

**1. 不使用 TS 的接收方式**
```js
defineProps({
  modelValue: {
    // 注意: string 这种写法 控制台会提示错误 必须是String
    type: String,
    default: ''
  }
})
```

<br>

**2. 使用 TS 的接收方式**  
我们在使用TS声明接收父组件传递过来的变量的时候, 只是使用TS的type类型是不够的, 会报未声明接收的错误, 所以我们必须使用 ``withDefaults`` 默认值的形式声明接收父组件使用 ``v-model`` 传递过来的数据

1. 数据的类型的是否必须都是通过 ``type`` 来指定的
2. 使用 ``withDefaults()`` 来指定默认值
```js
type propsType = {
  modelValue: string,
  testNumVal: number
}
defineProps<propsType>()
```
```js
type propsType = {
  modelValue: string,
  testNumVal: number
}
const props = withDefaults(defineProps<propsType>(), {
  modelValue: 'default-str',
  testNumVal: 0
})
```

<br>

**3. 使用 props**  
1. 模版中可以直接使用 props 中声明的变量
2. script中需要通过 props.modelValue 来调用变量

<br>

**4. 修改 基本类型 的 props**  
如果我们要是想在子组件中修改父组件使用 v-model 传递过来的 props 需要使用 defineEmits() 宏通过 emit 来发射事件 通知父组件来进行修改, **父组件并不用在子组件身上绑定自定义事件**

1. defineEmits 写法1: 数组, 我们传入数组, 元素为 ``update:变量名``
2. defineEmits 写法1: 对象
```js
type emitsType = {
  (e:"update:msg", msg:string):void,
  (e:"update:count", count:number):void,
}

const emit = defineEmits<emitsType>()


// 3.3+：另一种更简洁的语法
const emit = defineEmits<{
  change: [id: number] // 具名元组语法
  update: [value: string]
}>()
```

<br>

**示例:**
```js
// props声明接收部分
type propsType = {
  demo: string
}
const props = withDefaults(defineProps<propsType>(), {
  demo: 'default-str'
})


// 自定义事件部分
const emit = defineEmits(['update:demo'])

const clickHandler = (): void => {
  console.log('clickHandler', props.demo)
  emit('update:demo', '修改str')
}
```

<br><br>

## v-model 使用上的通用要点:
### 1. 修改 使用 v-model 绑定的 **基本类型** 的数据
如果我们要是想在子组件中修改父组件使用 v-model 传递过来的 props 需要使用 defineEmits() 宏通过 emit 来发射事件 通知父组件来进行修改,这时 **父组件并不用在子组件身上绑定emit发射的自定义事件**

1. defineEmits 写法1: 数组, 我们传入数组, 元素为 ``update:变量名``
2. defineEmits 写法1: 对象
```js
type emitsType = {
  (e:"update:msg", msg:string):void,
  (e:"update:count", count:number):void,
}

const emit = defineEmits<emitsType>()


// 3.3+：另一种更简洁的语法
const emit = defineEmits<{
  change: [id: number] // 具名元组语法
  update: [value: string]
}>()
```

<br>

**示例:**
```js
// props声明接收部分
type propsType = {
  demo: string
}
const props = withDefaults(defineProps<propsType>(), {
  demo: 'default-str'
})


// 自定义事件部分
const emit = defineEmits(['update:demo'])

const clickHandler = (): void => {
  console.log('clickHandler', props.demo)
  emit('update:demo', '修改str')
}
```

<br>

### 2. 修改 使用 v-model 绑定的 **引用类型** 的数据
**方式1: 使用 reactive 响应式数据转换props过来的对象**  
1. 父组件使用 v-model 给子组件传递了 对象
```html
<script>
  type objType = {
    name: string,
    age: number
  }
  const obj = reactive<objType>({
    name: 'sam',
    age: 0
  })
</script>

<WorkerSearchArea
  v-model:form="obj"
/>
```

2. 子组件部分
```js
// 1. 声明接收
type propsType = {
  form: {
    name: string,
    age: number
  }
}
const props = withDefaults(defineProps<propsType>(), null)

// 2. 子组件定义响应式数据, 用于将props过来的对象转换为组件内部的state
const searchForm = reactive(props.form)

// 3. 定义 emit 通知父组件进行修改
const emit = defineEmits(['update:form'])

// 4. 按钮的回调
const clickHandler = (): void => {
  // 修改 组件内部的状态, 然后将该状态交给emit的参数2
  searchForm.name = 'erin'
  searchForm.age = 18
  emit('update:form', searchForm)
}
```

<br>

**注意:**  
如果父组件传过来的数据是异步获取的，则需要使用 watch 进行监听
```js
watch(() => props.modelValue, () => { sea.value = props.modelValue })
```

<br>

**方式2: 使用 computed**  
使用 computed 这种方式 不用使用 emit 来通知父组件进行修改, 直接就是双向绑定到父组件的对象中
```js
// 1. 声明接收props
type propsType = {
  form: {
    name: string,
    age: number
  }
}
const props = withDefaults(defineProps<propsType>(), null)


// 2. 使用 computed 返回 props.form
const searchForm = computed(() => props.form)

// 3. 模版中可以直接使用 v-model 绑定 searchForm 中的数据
<el-input v-model="searchForm.name"></el-input>
```

因为 props.form 是一个对象, 所以如下的方式的set并不起作用, 因为我们没有修改 props.form 本身 地址值的问题
```js
const searchForm = computed({
  get() {
    return props.form
  },
  set(v) {
    console.log(v)
  }
})
```

<br>

### Vue3中支持绑定多个 v-model
父组件:
```html
<template>
  <button
    @click="isShow = !isShow"
  >开关</button>

  <div>{{isShow}}</div>

  <hr>

  <!-- 绑定多个 -->
  <VModelVue 
    v-model="isShow"
    v-model:textVal="text"
  ></VModelVue>

</template>
<script setup lang="ts">
  import {ref, reactive} from "vue"
  // 引入子组件
  import VModelVue from "./components/vmodel.vue"

  // 给自定义组件绑定 isShow
  const isShow = ref<boolean>(true)
  const text = ref<string>("sam")
</script>
```

<br>

子组件接收:
```html
<template>
  <div v-if="modelValue" class="model" >
    <div class="close"> 
      <button
        @click="close"
      >关闭</button>
    </div>

    <h3>我是子组件 dialog</h3>
    <div>
      内容: <input type="text">
    </div>
  </div>
</template>
<script setup lang="ts">
  import {ref, reactive} from "vue"
  

  // 接收父组件v-model传递过来的数据 
  type props = {
    modelValue: boolean,

    // 接收另一个
    textVal: string
  }
  defineProps<props>()


  // 子组件修改父组件的数据
  let emit = defineEmits([
    "update:modelValue",
    "update:textVal"
  ])

  const change = (e:Event) => {
    // Event是没有办法读target的 所以我们断言
    const target = e.target as HTMLInputElement

    emit("update:textVal", e.target.value)
  }

  const close = () => {
    emit("update:modelValue", false)
  }
</script>
```

<br>

### v-model的自定义修饰符:
vue2中使用的 v-model都是
```html
<Child v-model.trim="text">
<Child v-model:text.trim="text">
```

在 vue3 中支持自定义的修饰符
```
v-model:变量名.修饰符="变量"
```

```html
<Child v-model:textVal.sam="text">
```

<br>

### 子组件怎么接收自定义的修饰符?  
如果 父组件没有指定 变量名 的情况下
```html
<Child v-model.sam="text">

<script>
  // 分别定义 默认情况的类型
  type PropsType = {
    modelValue: string,

    // 修饰符的类型
    modelModifiiers?: {
      // 自定义修饰符: 布尔类型
      sam: boolean
    }
  }
  let props = defineProps<props>()
</script>
```

<br>

如果 父组件有指定 变量名 的情况下
```html
<Child v-model:textVal.sam="text">

<script>
  // 分别定义 默认情况的类型
  type PropsType = {
    textVal: string,

    // 修饰符的类型
    textValModifiiers?: {
      // 自定义修饰符: 布尔类型
      sam: boolean
    }
  }
  let props = defineProps<props>()
</script>
```
<br>

### 示例:
```html
<script setup lang="ts">
  import {ref, reactive} from "vue"
  

  // 接收父组件v-model传递过来的数据 分别定义变量名的类型 和 修饰符
  type props = {
    // 父组件没有指定变量名的情况下 就是默认
    modelValue: boolean,
    textVal: string,

    // 默认的情况
    modelModifiiers?: {

    }

    // 变量 + Modifiiers 固定的
    textValModifiiers?: {
      // 有这个修饰符的时候怎么操作 和 没有修饰符的时候怎么操作
      sam: boolean
    }
  }
  
  let props = defineProps<props>()
  const handle = () => {

    // 根据是否有修饰符 执行不同的逻辑
    emit(
      "update:textVal",
      props?.textValModifiiers?.sam 
        ? target.value
        : ""
    )

  }
</script>
```

<br><br>

# ref reactive 的格式化技巧:
我们console.log这两种方式定义的数据的时候 必须要一次次的点开才能看到

- chrome浏览器上点击齿轮
- 右侧找到 Enable custom formatters

```vue
<script setup lang="ts">
import {ref, reactive} from "vue"

type ObjType = {
  name: string,
  age: 18
}

let obj = reactive<ObjType>({
  name: "sam",
  age: 18
})

let data = ref<string>("白山")

const info = () => {
  console.log(data)
  console.log(data.value)
}

// 调整完后的输出结果
Ref<"白山">
白山
</script>
```


<br><br>

# 参数资料:

### 官方  
```
https://staging-cn.vuejs.org/api/application.html#appmixin
```

### 文档:
```
https://v3.cn.vuejs.org/guide/composition-api-introduction.html#setup-%E7%BB%84%E4%BB%B6%E9%80%89%E9%A1%B9
```

### 这个文档也不错
```
https://vue3.chengpeiquan.com/update.html#%E4%BD%BF%E7%94%A8-vue-2
```

### setup:
```
https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E5%8F%82%E6%95%B0
```

### 个人文档:
```
http://www.liulongbin.top:8085/#/
```

### 资料:  
```
https://www.jianshu.com/p/0791fc7e120c
```

### composition api文档:
```
https://composition-api.nuxtjs.org/getting-started/introduction
```

### mixin 和 hooks 的区别:
```
https://www.jianshu.com/p/b1695fd3cc3a
```

### setup注意点
```
https://www.cnblogs.com/bingcola/p/15507847.html
https://cloud.tencent.com/developer/article/1981016
```

<br><br>

# Vue3 

### 源码方面有升级
- 使用 proxy 代替 defineProperty 实现响应式
- 重写虚拟DOM的实现 和 Tree-Shaking
- 更好的支持ts

<br>

### 新的特性:
- 组合api
  - setup配置
  - ref与reactive
  - watch与watchEffect
  - provide与inject

- 新的内置组件
  - fragment
  - teleport
  - suspense

<br>

### 其它的改变:
- 新的生命周期钩子
- data选项应始终被声明为一个函数
- 移除keyCode支持作为v-on的修饰符...

<br><br>

# 创建 vue3 工程

## 使用 vue-cli 创建
@vue/cli版本在4.5.0以上
```
vue create 项目名
```

<br>

可以使用如下 来查看脚手架版本
```
vue --version
```

<br>

然后进行如下命令:
```
cd 项目名
npm i
npm run dev
```

### 要求: 
node版本要在 14.17.3 以上

<br><br>

## 使用 vite 创建vue项目
vite是新一代前端的构建工具

<br>

### 优势: 
- 开发环境中 无需打包操作 可快速的冷启动(不用打包)
- 轻量快速的热重载(一改代码就会重新加载)
- 真正的按需编译 不再等待整个应用的编译完成

<br>

### 步骤:  
创建vite的项目有两个命令

**命令1:**
```js
npm init vite@latest 项目名

// 该方式可以创建 router 模版
npm init vue@latest 项目名
```

<br>

**命令2: 推荐**
```js
npm create vite@latest
```

<br>

### 区别: 
**npm create vite@latest**  
这个命令使用了 npm 包管理器的 create 命令, 它会下载最新版本的 Vite 脚手架工具, 并使用这个工具来创建一个新的 Vue 3 项目。

当你执行这个命令时, 它**会交互式地引导你输入项目的名称**、选择预设模板等信息, 最后基于你的选择生成一个新的 Vue 3 项目。

<br>

**npm init vite@latest 项目名**  
这个命令也使用了 npm 包管理器的 init 命令, 它会初始化一个新的 npm 项目并安装最新版本的 Vite 脚手架工具。然后, 它通过 vite create 命令在当前目录下创建一个新的 Vue 3 项目。你需要手动指定项目的名称作为参数。

<br><br>

## Vite的优势:

### 开发 & 生产:  
开发环境使用 Vite, 生产环境还是要使用 Webpack

<br>

### 引入js的方式:
vite是使用 ``<script type=module />`` 的形式引入 不像webpack必须打包

<br>

### 冷服务:   
默认构建的目标浏览器是能 在script标签上支持原生 ESM 和 原生ESM导入

<br>

### HMR:   
速度快到惊人的 模块热更新

<br>

### Rollup:   
使用 Rollup 打包代码 并且它是预配置的 支持大部分的rollup插件

<br><br>

## Vite package.json 命令解释
```js
"scripts": {
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview"
},
```

<br>

### dev: 启动开发服务器
```
vite dev
vite serve
```

<br>

### build: 打包  
当我们项目中使用了ts后, 可以使用这样的命令 ``vue-tsc --noEmit &&``    
``--noEmit`` 表示不打包生成文件只是检验ts是否正确
- 正确的话 则执行 打包操作
- 错误的话 停止编译

<br>

### preview: 本地预览

<br>

### 端口: 5173  
如果需要配置端口的话 需要在 vite.config.js 里面配置
```s
http://127.0.0.1:5173/
```

<br><br>

# 分析 vue3 的工程结构
```s
| - public
| - src
  | - assets
  | - components
    - App.vue
    - main.ts
    - vite-env.d.ts

- tsconfig.json
- tsconfig.node.json
- vite.config.ts
- index.html
```

<br>

### public:    
存放**无需编译**的静态资源

<br>

### assets:    
**需要被编译**的资源   
比如图片小于4kb 编译成 base64

<br>

### index.html  
入口文件, 区别于webpack webpack是以js为入口文件

<br>

### tsconfig.json:  
Ts配置文件

<br>

### vite.config.ts:
vite的配置文件

<br>


## eslint 关闭语法检查:
创建 vue.config.js 文件, **不推荐**
```js 
module.exports = {
  lintOnSave: false
}
```

<br><br>

## main.js 文件

1. 从vue身上拿到 createApp() 
2. 将要加载的组件 放入createApp()中 然后后面调用mount("节点的选择器") 

```js 
// vue3中引入的不再是Vue构造函数了 我们引入的是 createApp 工厂函数

import { createApp } from 'vue'
import App from './App.vue'


// 类似vue2 但是app比vm更轻 
createApp(App).mount('#app')
```

<br>

## vue3: 挂载 & 卸载组件
### <font color="#C2185B">app.mount('#app')</font>  
### <font color="#C2185B">app.unmount('#app')</font>  

```js 
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
app.unmount('#app')
```

<br><br>

## createApp() 详解
### <font color="#C2185B">createApp(Component, [options])</font>  
创建一个应用实例

**参数:**  
参数1, 根组件
参数2, 可选 它是要传递给 **根组件的props**

<br>

### <font color="#C2185B">createSSRApp()</font>  
以 SSR 激活 模式创建一个应用实例 用法与 createApp() 完全相同 

<br>

### 多个应用实例  
你不必再受限于一个页面只能拥有一个应用实例 createApp API 允许多个 Vue 应用共存于同一个页面上, 而且每个应用都拥有自己的用于配置和全局资源的作用域 

```js
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

<br><br>

## app.mount() 详解:
将应用程序实例挂载在一个容器元素中, 对于每个应用实例来说, mount() 仅能调用一次 

<br>

### <font color="#C2185B">app.mount(css选择器)</font>  
```js
import { createApp } from 'vue'
const app = createApp(/* ... */)

app.mount('#app')
```

<br>

### <font color="#C2185B">app.unmount()</font>  
卸载一个已经挂载好的应用实例, 会触发应用组件树上所有组件的卸载生命周期钩子 

<br><br>

## app.provide() 详解
供给一个值, 可以被应用中所有后代组件注入 

<br>

### <font color="#C2185B">app.provide("key", data)</font>  
提供数据给组件树 组件树内都可以使用 ``inject`` 引入使用

<br>

### 注意:  
该方法是app身上的 所以不用 import 导入使用

```js
import {createApp} from "vue"
const app = create(App)

app.provide("key", data)


// 某个组件
import { inject } from 'vue'

export default {
  setup() {
    console.log(inject('message')) // 'hello'
  }
}
```

<br><br>

## app.component() 详解

### <font color="#C2185B">app.component("组件名", 组件)</font>  
这样注册的组件全局可用

<br>

**注意:**    
如果我们只传递参数1 该方法将返回参数1所对应的组件
```js
const MyComponent = app.component('my-component')
```

<br>

该方法可以被链式调用
```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

<br><br>

## app.directive() 详解
注册全局指令 

如果同时传递一个名字和一个指令定义, 则注册一个全局指令；如果只传递一个名字, 则会得到一个已经注册的指令 

<br>

### <font color="#C2185B">app.directive("指令名", {} or () => {})</font>  
使用方式应该和vue2差不多

```js
import { createApp } from 'vue'

const app = createApp({
  /* ... */
})

// 注册（对象形式的指令）
app.directive('my-directive', {
  /* 自定义指令钩子 */
})

// 注册（函数形式的指令）
app.directive('my-directive', () => {
  /* ... */
})

// 得到一个已注册的指令
const myDirective = app.directive('my-directive')
```

<br><br>

# 插件
这节我们封装一个全局可以调用的插件, 我们使用过 elementUI中的插件 比如
```js
// 当我们调用的时候 会展示弹窗
this.$message.success()
```

我们也封装一个插件 当我们调用的时候展示 loading

<br>

## 封装: Loading组件
当我们调用的时候再展示
```html
<div v-if="isShow" class="loading">
  Loading...
</div>
<script setup lang="ts">
import {ref, reactive} from "vue"
let isShow = ref<boolean>(false)

const show = () => isShow.value = false
const hide = () => isShow.value = true
</script>
```

<br>

### 制作插件:
我们单独创建一个js文件 然后导出 导出的时候有两种形式我们可以选择 对象形式 或者 函数形式
- export default { }
- export default function() 

<br>

**对象形式:**    
要求: 对象内部必须有 install 函数, vue会自动调用install函数 并回传一个参数 app 它就是 vue实例对象

我们拿到app对象后 就可以实现全局挂载之类的动作了

<br>

**参数app的类型:**    
导入 + 类型就是 App
```ts
import type {App} from "vue"
export default {
  install(app: App) {

  }
}
```

<br>

### 注册插件:  
当我们写完插件后 在 main.ts 文件中进行注册
```js
// 引入插件 注册插件
import Loading from "./plugns/loading.ts"

app.use(Loading) // 当注册的时候就会将 app 回传到 插件里面
```

<br>

### 将组件挂载到全局 供每一个页面使用
我们其实是将组件转成了虚拟节点 然后放在body上 然后先将这个结构隐藏 等这调用方法再将该结构显示

<br>

### 注意:  
我们引入的 loading 组件 没有办法直接使用 我们需要将组件转成Vnode 然后通过render函数 再挂载到某个地方

<br>

### <font color="#C2185B">createVNode()</font>  
将组件转换成虚拟DOM 从 vue 中引入使用

类型: VNode

<br>

### <font color="#C2185B">render(虚拟DOM, 挂载点)</font>  
将 虚拟DOM 挂载到实例上 从 vue 中引入使用

<br>

### main.ts:

**要点: declare module "@vue/runtime-core"的目的是为了在Vue组件中使用全局属性时提供类型检查**  

在Vue 3中, 全局 API 的使用方式和Vue 2有所不同。Vue 3使用了基于函数的API, 并且引入了@vue/runtime-core模块, 该模块包含了Vue的核心功能。

我们下面的代码中使用了 declare 声明了一个模块, 其目的是 告诉TypeScript编译器, 在Vue组件中, 可以使用$loading这个全局属性, 并且它的类型应该符合loadingType的定义。

这样, 当你在Vue组件中使用this.$loading.show()或this.$loading.hide()时, TypeScript编译器就知道$loading是一个拥有show和hide方法的对象, 而不会报错。

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入插件
import Loading from "./plugins/index"

let app = createApp(App)

// 注册
app.use(Loading)
app.mount("#app")


// 对挂载到全局上的 $loading 对象进行声明
type loadingType = {
  show: () => void,
  hide: () => void
}

// "@vue/runtime-core" 还可以写成 "vue"
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $loading: loadingType
  }
}
```
<br>

### 插件文件:
```js
import type {App, VNode} from "vue"

// 将目标转成vnode 和 挂载的方法
import {createVNode, rennder} from "vue"

// 组件
import Loading from "./index.vue"


export default {
  install(app: App) {

    // vnode == Loading 组件

    // 将组件转换为虚拟DOM, 虚拟DOM的类型 VNode
    const vnode:VNode = createVNode(Loading, {这里可以传递参数, 组件内需要使用props来声明接收 不然就是attrs里})

    // 我们将loading组件结构挂载到了 body 上 相当于有 div#app div#loading 兄弟节点
    render(vnode, document.body)

    // 当我们将 vnode 挂载上去后 我们可以通过下面的方式读到 我们在组件内部声明的方法和属性 前提是Loading组件要使用 defineExpose() 来进行暴露

    // 然后我们在 全局上挂着一个对象 对象中有操作
    app.config.globalProperties.$loading = {
      show: vnode.component?.exposed?.show,
      hide: vnode.component?.exposed?.hide
    }

  }
}
```

<br>

### Loading组件:
```html
<script setup lang="ts">
import { ref } from 'vue';
let isShow = ref<boolean>(false)

// 组件内部定义 显示 隐藏的方法:
const show = () => {
  console.log("show")
  isShow.value = true
}
const hide = () => {
  console.log("hide")
  isShow.value = false
}

// 将方法暴露到组件外部 供外部进行访问
defineExpose({
  show,
  hide,
  isShow
})
</script>

<template>
  <div v-if="isShow">
    <h3 class="title">Loading...</h3>
  </div>
</template>
```

<br>

弹幕说还可以这么调用:
```js
getCurrentInstance().proxy.$loading.show()
```

<br><br>

# Vue3: 函数调用创建组件
这里是模仿 element ui 的 $message 方法 也相当于是通过调用 message方法 来创建组件 有点类似下面的 将 Vue组件挂载到全局上的方法

<br>

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

### 新的方式创建 方法组件
使用 createApp 创建了一个新的vue实例
```js
// 引入组件
import MessageBox from './component/MessageBox.vue'
import { createApp } from 'vue'

function showMsg(msg, clickHandler) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  // 渲染一个MessageBox组件, 相当于我们创建一个vue应用实例 根节点吧
  // 第二个参数就是传递 属性和方法等的配置对象
  const app = createApp(MessageBox, {
    msg,
    onClick() {
      clickHandler && clickHandler(() => {
        app.unmount(div)
        div.remove()
      })
    }
  })
  // 将该组件挂载到元素上
  app.mount(div)
}

export default showMsg
```


<br><br>

## app.use() 详解
安装一个 插件 

<br>

### <font color="#C2185B">app.use(插件, 插件选项)</font>  
希望将插件作为第一个参数, 将插件选项作为可选的第二个参数 

<br><br>

## app.mixin() 详解: 不推荐
注册全局 mixin
 
Mixins 在 Vue 3 支持主要是为了向后兼容, 因为生态中有许多库使用到 目前 mixin, 特别是全局 mixin, 都应避免在应用程序代码中使用 

若要进行逻辑重用, 推荐采用 组合式函数 来替代 

<br><br>

## app.version
提供当前应用所使用的 Vue 版本号 这在 插件 中很有用, 因为可能需要在不同的 Vue 版本上有不同的逻辑 

在一个插件中对版本作判断: 
```js
export default {
  install(app) {
    const version = Number(app.version.split('.')[0])
    if (version < 3) {
      console.warn('This plugin requires Vue 3')
    }
  }
}
```

<br><br>

## app.config
上面我们会通过 create() 来返回一个 应用的实例 app 对象
该对象身上有一个 config 属性 允许我们配置一些应用级的选项

<br>

### <font color="#C2185B">app.config</font>  
配置一些应用级的选项 也可以理解为全局配置

<br>

### <font color="#C2185B">app.config.errorHandler = (err, errComponent, errSourceStr) => { ... }</font>  
定义一个应用集的错误处理器 它将捕获由子组件上抛而未被处理的错误

**参数:**   
err:错误对象
  
errComponent: 触发该错误的组件实例
  
errSourceStr: 一个指出错误来源类型信息的字符串 

它可以从下面这些来源中捕获错误: 
- 组件渲染器
- 事件处理器
- 生命周期钩子
- setup() 函数
- 侦听器
- 自定义指令钩子
- 过渡（Transition）钩子

<br>

### <font color="#C2185B">app.config.globalProperties</font>  
该对象用于注册能够被应用内所有组件实例访问到的全局属性   
这是对 Vue 2 中 ``Vue.prototype`` 使用方式的一种替代, 此写法在 Vue 3 已经不存在了 与任何全局的东西一样, 应该谨慎使用 

如果全局属性与组件自己的属性冲突, 组件自己的属性将具有更高的优先级 

```js
app.config.globalProperties.msg = 'hello'

// 这使得 msg 在应用的任意组件模板上都可用, 并且也可以通过任意组件实例的 this 访问到: 
export default {
  mounted() {
    console.log(this.msg) // 'hello'
  }
}
```

<br>

### 模版中:  
定义在全局上的方法和属性可以在模版中直接使用

<br><br>

## Ts: app.config.globalProperties
我们在全局上挂载一个 自定义 对象
```js
app.config.globalProperties.$filters = {
  format<T>(str: T):string {
    return `真・${str}`
  }
}

// 在模版中我们可以直接使用
<div>
  {{$filters.format("hello")}}
</div>
```

但是Ts中上面的 $filters 部分会报错 原因是缺少 $filters 的声明文件

<br>

### 定义 $filters 的声明文件
``declare module "@vue/runtime-core"`` 的目的是为了在Vue组件中使用**全局属性**时提供类型检查
```js
type filtersType = {
  format: <T>(str:T) => string
}

// @vue/runtime-core 声明它
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: filtersType
  }
}
```

<br><br>

## Vue3中组件中的模板结构可以没有根标签:

### 注意:  
vue3中不支持以前的vue2中入口文件的写法了 当我们页面出现语法提示错误 可以将它改为false看下  
```s
vetur.validation.template 
```

<br><br>

## Vue3中的 store:
```js
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```

<br><br>

## Vue3中的 script 模板:

### vue3默认的script模板
```js
export default {
  setup() {
    
  }
}
```

<br>

### 这是使用 @vue/composition-api 的模板:
```html
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    
  },
})
</script>
```

<br><br>

# Vue3 API
我们先学下 setup 它是所有组合API表演的舞台

Vue3中的核心都在 setup() 和 ``<script setup>`` 语法糖身上 这里我们也分这两种情况进行整理

<br><br>

## setup()函数版本:
它是vue3中的一个新的配置项 值为一个函数

组件中所用到的: 
- 数据 
- 方法 
- 计算属性
- watch 等等 均要配置在setup中

<br>

### setup()中 变量 & 方法的调用:
因为 setup() 是一个函数 函数内的变量 方法处于同一作用域 都不用再使用``this.``的形式调用了
```js 
export default {
  name: 'App',
  setup() {
    let name = "张三"
    let age = 18

    function sayHello() {
      alert(`我叫${name} 我今天${age}岁了 你好啊`)
    }
  },
}
```

<br>

### setup()中的返回值:
setup函数有两种形式的返回值
1. 对象
2. 函数

<br>

**若返回一个对象:**  
则对象汇总的 属性 方法 在模板中均可以直接使用

<br>

**若返回一个渲染函数:**  
则可以使用 h()函数 自定义渲染模板中的内容, 此时模板中内容已经不重要了 不管是什么都会被渲染函数的内容所覆盖  

```js
// 导入 h 函数
import {h} from "vue"  
```
 
然后return一个函数 并使用 h()定义结构
```js
  // 要点: return的里面还有一个return
  return () => {
    return h("h1", "尚硅谷")
  }

  // 简写形式
  return () => h("h1", "尚硅谷")
```

<br>

### 注意: 
setup中必须要return 不然模板中读取不到数据和方法

```js 
setup() {
  let name = "张三"
  let age = 18

  function sayHello() {
    alert(`我叫${name} 我今天${age}岁了 你好啊`)
  }

  // 返回的数据在模板中可以直接使用
  return {
    name,
    age,
    sayHello
  }
},
```

<br><br>

## 使用setup函数式, 组件引入相关
我们将setup当做是vue2中的一个配置项, vue2中怎么导入组件和注册组件的vue3中一样
```js
import MyComponent from './MyComponent.vue';
import { ref } from 'vue';

export default {
  components: {
    MyComponent
  },
  setup() {
    const propName = ref('Hello');
    const propValue = ref('World');

    const handleCustomEvent = (data) => {
      // 处理自定义事件的逻辑
    };

    return {
      propName,
      propValue,
      handleCustomEvent
    };
  }
}
```

<br><br>

## Vue3 中也可以使用 Vue2 的配置项:
在vue3中可以使用vue2中的配置式方式写代码 但尽量不要与vue2配置混用  

```js 
export default {
  // vue2中的方式
  name: 'App',
  data() {
    return { sex: "男" }
  },
  methods: {
    sayWelcome() { alert("hello") }
  },

  // vue3中的方式
  setup() {
    let name = "张三"
    let age = 18

    function sayHello() {
      alert(`我叫${name} 我今天${age}岁了 你好啊`)
    }

    return {
      name, age, sayHello
    }
  },
}
```

<br>

### 当两个版本的配置项进行混用的时候:  
- vue2配置(data methods computed)中可以访问到setup中的属性方法  
- setup中不能访问到vue2配置 如果有重名 **setup优先**

<br>

### 注意:  
**setup不能是一个async函数** 

因为如果是async则函数内部的返回值不再是return对象 而是promise 这种情况下模板看不到return对象中的属性

<br>

## setup函数要点:
1. setup会在beforeCreate之前执行一次 this是undefined

2. 技巧:  
```js
setup() {
  let sum = ref(0)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({sum})
    }, 3000)
  })
}
```

<br>

**技巧是想表达这个意思吗?**  
在Vue 3的setup()函数中, 你可以返回一个包含响应式数据和方法的对象, 以供组件内部使用。在提供的技巧中, setup()函数返回了一个Promise对象, 并在3秒后通过resolve方法返回了一个包含sum响应式数据的对象。

这种做法的技巧在于, 你可以在setup()函数内部执行异步操作（比如请求数据、定时器等）, 并且返回一个Promise对象。Vue 3会等待Promise对象被解决（resolved）后, 再继续组件的渲染和生命周期。这意味着你可以在异步操作完成之前阻止组件的渲染, 然后在异步操作完成后, 再继续渲染组件。

在上述例子中, setup()函数返回的Promise对象在3秒后被解决, 将带有sum响应式数据的对象传递给组件。这样, 组件在异步操作完成后, 就能够使用sum数据了。

这种技巧可以用于在组件初始化时进行异步操作, 例如从服务器获取初始数据, 确保组件只有在异步操作完成后才会渲染。

<br>

### setup的相关注意点: 
在vue2中我们使用props向子组件传递数据的时候 子组件需要定义props配置项来声明接收

也就是父组件使用props传递数据 那子组件就要在props配置项中声明接收

```html
// App组件
<Demo name="张三">

<script>
// Demo组件
export default {
  name: "Demo",
  props: ["name"]
}
</script>
```

<br>

### setup的执行时机(setup中不能使用this的原因)  
在beforeCreate之前执行一次 this是undefined 也就是说setup函数中不可以写this 

beforeCreate是vue2中最早的钩子函数 但是setup执行的时机比它还要早

<br><br>

## setup函数的参数

```js
setup(props, context) {

}
```

<br>

### 形参1: props对象  
包含组件外部传递过来的且组件内部声明接收了的属性

当父组件中使用 ``props`` 向子组件中传递数据的时候  
1. 子组件 要先使用props配置项 声明接收数据
2. 在setup函数中的第一个参数内部就能收到这两个数据 **并且是proxy对象**

<br>

**要点:**   
1. props传递过来的数据为只读 不建议在子组件中修改 修改也无效
2. 从props(之类的代理对象)中解构出来的数据 不是响应式

3. setup() 的return中 也可以 ...props
```js
return {
  ...props
}

return {
  ...toRefs(props)    // 这样好像是响应式的
}
```

```js
// 父组件
<Demo name="erin" age="18"/>

// 子组件
<h3>{{name}}--{{age}}</h3>

export default {
  name: 'Demo',
  
  // 1. 先在props配置项中声明接收
  props: ["name", "age"],

  setup(props) {
    // 然后就可以从props中收到并使用
    let {name, age} = props
    console.log(name, age)
}
```

<br>

### 形参2: context:    
上下文对象 它就是一个普普通通的object对象 它有三个属性
```js
attrs: (...)
emit: (event, ...args) => instance.emit(event, ...args)
expose: exposed => {…}
slots: (...)
```

<br>

**nuxt中查看新增了如下属性:**
```js
isServer: (...)         // 可以判断是否是服务端
listeners: Object       
parent: VueComponent    // 父组件
refs: (...)             // dom节点
root: Vue               // 根组件
ssrContext: undefined
```

<br>

**attrs: 对象**   
包含props配置项里没有接收的数据 就会保存在attrs对象中 相当于 this.$attrs

<br>

**slots:**    
收到的插槽内容 相当于 this.$slots

<br>

**注意:**   
vue3中要使用具名插槽的时候 ``<template v-slot:插槽名>``
vue3只支持上面的方式
```html
<Demo @hello="showInfo" name="erin" age="18">

  <template slot="left" / #left>
    <span>我是填入的内容</span>
  </template>

</Demo>

<!-- 子组件 -->
<slot name="left"></slot>
```

<br>

**emit:**   
分发自定义事件的函数 相当于 this.$emit  

用于在setup中的方法 要发射自定义事件的时候 我们可以使用context.emit来完成

<br>

**注意:** 
因为 父组件需要在子组件标签中绑定自定义事件
```js
<Demo @hello="showInfo" name="erin" age="18"/>
```

<br>

vue3中要求 在 **子组件中要使用 emits 配置项 声明接收hello事件**
``emits: ["hello"]``   它跟methods同级

```js
// 比如 子组件给父组件发射一个自定义事件
props: ["name", "age"],

// 子组件要先声明接收 父组件绑定的自定义事件
emits: ["hello"],

// emits 还可以写成对象的格式
emits: {
  "事件名": null
}

setup(props, context) {

  // 当点击子组件中的按钮的时候 将自定义事件hello发送给父组件
  function test() {
    context.emit('hello', 666)
  }

  return {
    person,
    test
  }
}


// 父组件
<template>
  <Demo @hello="showInfo" name="erin" age="18"/>
</template>
```

<br>

**expose:**   
暴露公共属性（函数）  

expose 这个函数可以用于在父组件中通过模板 ref访问本组件时, 显式地限制所暴露的属性

```js
export default {
  setup(props, { expose }) {
    // 这样会使得该组件处于 "关闭状态"
    // 即不向父组件暴露任何东西
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // 有选择地暴露局部状态
    expose({ count: publicCount })
  }
}
```

<br>

### 注意: 标签内使用setup和不使用的区别
如果子组件使用的是 option api 或 没有使用 ``<script setup>`` 这样父组件对子组件的每一个属性和方法都有完全的访问权 通过 ref

如果子组件使用了 ``<script setup>`` 那么子组件就是私有的 一个父组件无法访问到一个使用了 ``<script setup>`` 的子组件中的任何东西

但是可以通过 ``defineExpose宏`` **显式暴露**

也就是说子组件中使用setup标签属性 父组件要使用子组件中的属性和方法的时候 就**要通过 defineExpose 显式暴露**

<br>

### 对props进行限制
利用 props 配置项, 和 vue2中的方式一样
```js
export default {
  props: {
    isShow: {
      type: String
    }
  },

  setup(props, context) {
    
    return {

    }
  }
}
```

<br><br>

# setup语法糖: ``<script setup>``
里面的代码会被编译成组件 setup() 函数的内容 这意味着与普通的 ``<script>`` 只在组件被首次引入的时候执行一次不同, ``<script setup>`` 中的代码会在每次组件实例被创建的时候执行 

因为本质是一个函数 每次它都会被调用

<br>

### setup语法糖 优势:  

### 1. 顶层的绑定会被暴露给模板  
当使用 ``<script setup>`` 的时候, 任何在 ``<script setup>`` 声明的顶层的绑定 (包括变量, 函数声明, 以及 import 引入的内容) 都能在模板中直接使用

import 导入的内容也会以同样的方式暴露 意味着可以在模板表达式中直接使用导入的 helper 函数

<br>

### 2. setup中定义的变量会自动暴露到模板  

<br>

### 3. 动态组件  
由于我们导入组件后 ,组件的引用本身是一个变量, 所以在 ``<script setup>`` 中要使用动态组件的时候, 就应该使用动态的 :is 来绑定

<br>

**:is动态绑定组件**   
动态组件是指在运行时动态地确定要渲染的组件, 而不是在模板中直接写死组件的名字。这样做的好处是, 你可以根据某些条件或用户交互, 选择性地渲染不同的组件, 使得你的应用更加灵活和可扩展。

在``<script setup>``语法中, 使用动态组件时, 你通常使用:is特性来动态绑定组件。

这意味着你可以在setup()函数中根据一些条件来确定要渲染的组件, 并将其传递给:is特性, 从而实现动态组件的渲染。

<br>

**步骤:**  
1. 模版中使用 ``<component :is="">``

```html
<template>
  <div 
    v-for="(item, index) of data"
    @click="switchComponent(item)"
  >
    {{item.name}}
  </div>

  <!-- 动态组件 -->
  <component 
    :is="current.comName"></component>
</template>

<script>
  import A from "./components/A.vue"
  import B from "./components/B.vue"
  import C from "./components/C.vue"

  type tabsType = {
    name: string,
    // 类型为组件的实例 我们可以从vue引入 Component 类型
    comName: any

    comName: Component
  }

  const data = reactive<tabsType[]>([
    {
      name: "我是A组件",
      // vue2中 组件可以写成 字符串型的 但是vue3中必须要是 组件
      // comName: "A",
      comName: A,
    },
    {
      name: "我是B组件",
      comName: B
    },
    {
      name: "我是C组件",
      comName: C
    },
  ])

  // 定义切换动态组件的变量 类型为组件实例的类型我们可以从 tabsType类型中摘取
  type currentType = Pick<tabsType, "comName">
  let current = reactive<currentType>({
    comName: data[0].comName
  })

  // 点击按钮切换组件
  const switchComponent = (item: tabsType) => {
    // 其实逻辑就是传值
    current.comName = item.comName
  }
</script>
```

<br>

**示例2:**
```html
<template>
  <div>
    <button @click="toggleComponent">Toggle Component</button>
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

const isComponentA = ref(true);
const currentComponent = ref(ComponentA);

const toggleComponent = () => {
  isComponentA.value = !isComponentA.value;
  currentComponent.value = isComponentA.value ? ComponentA : ComponentB;
};
</script>
```

<br>

### 注意:  
A组件放在reactive里面的话 会对A组件进行 proxy 代理 但是组件没有必要进行代理 所以我们要取消代理

我们使用 ``markRaw() 或者 toRaw()`` 对组件A进行包裹 让它标记成一个普通的对象

```js
const data = reactive<tabsType[]>([
  {
    name: "我是A组件",
    comName: markRaw(A),
  },
])
```

<br><br>

## 语法糖 模式: props:
正常的情况我们要接受父组件传递过来的props需要使用props配置项 但在语法糖的模式下 props 则需要使用宏

<br>

### <font color="#C2185B">defineProps(['title'])</font>  
defineProps 是一个仅 ``<script setup>`` 中可用的编译宏命令, 并不需要显式地导入 声明的 props 会自动暴露给模板

defineProps 会返回一个对象, 其中包含了可以传递给组件的所有 props

<br>

**返回值:**   
props对象

```js
let props = defineProps(["msg"])
```

``defineProps(['title'])``方法会自动将接收到属性暴露到模版中 所以我们不创建props也可以

<br>

**参数: 数组形式**   
我们在参数的1的位置传递一个数组 直接写上要接收的属性名, 使用该方式的时候 不接收返回值直接使用也可以
```js
let props = defineProps(["msg"])


defineProps(['switchTableStructure'])
:disabled="!switchTableStructure"
```

<br>

**参数: 对象形式**   
我们使用对象形式可以对数据进行验证 和 添加默认值, 这里就和vue2中的配置项一样了
```js
defineProps({
  msg: {
    type: String,
    default: "默认值",
    required: true
  }
})
```

<br>

**要点:**  
props中的数据在script中使用的时候, 不用使用 props.xxx.value 的形式


```html
<script setup lang="ts">

// 数组形式
let props = defineProps(["msg"])


// 对象形式
defineProps({
  msg: {
    type: String,
    default: "默认值"
  }
})

let computedTitle = computed(() => {
  return props.title + " -- sam"
})
</script>

<template>
  <h3>子组件</h3>
  <div>{{msg}}</div>
</template>
```

<br><br>

## Ts: defineProps的使用
上面是我们没有使用ts的时候 需要在defineProps中传入一个对象, 利用对象对props中的每个属性做验证

当我们使用ts后 就可以结合ts来对props中的属性进行验证

<br>

### 1. 使用 type 声明整个 props 对象的类型
我们在type中声明的类型, 就是props中的对象中应该有的属性

### 2. 在defineProps的泛型处 传入我们定义好的类型 ``defineProps<propsType>(空参)``
```html
<script setup lang="ts">

// 父组件传什么 子组件这里写什么 类型也要匹配
type propsType = {
  msg: string
} 

defineProps<propsType>()

</script>
```

<br><br>

## Ts: props中的默认值怎么定义?  

### <font color="#C2185B">withDefaults(defineProps(), {属性名: "默认值"})</font>  
1. 将defineProps宏作为 withDefaults 的第一个参数传入
2. 参数2就是props中各个属性对应的默认值

**返回值:**  
拥有 默认值 的 props

```js
// 将定义的属性设置为可选
type propsType = {
  msg?: string,
  obj?: {
    name: string
  }
}

// 使用withDefaults()设置默认值
const props = withDefaults(defineProps<propsType>(), {
  msg: "我是默认值",

  // 数组的默认值
  list: () => [1,2,3],

  // 对象的默认值
  obj: () => ({
    name: "sam"
  })
})
```

<br><br>

## 响应式解构props:
注意 如果我们直接解构 props 对象 ``{ ...props }``, 那么解构出来的变量将会丢失响应式, 因此我们推荐通过 ``props.xxx`` 的形式来使用其中的属性 

如果你确实需要从 props 上解构, 或者想要将某个 prop 传入到一个外部函数中但想保持响应性, 那么你可以使用 ``toRefs()`` ``toRef()`` 这两个工具 API: 

```js
import { toRefs } from 'vue'

export default {
  setup(props) {
    // 将 `props` 转为一个其中全是 ref 的对象, 然后解构
    const { title } = toRefs(props)
    // `title` 是一个追踪着 `props.title` 的 ref
    console.log(title.value)

    // 或者, 将 `props` 的单个属性转为一个 ref
    const title = toRef(props, 'title')
  }
}
```

<br><br>

## 语法糖模式: emit:
我们可以通过 ``defineEmits`` 宏来选择性地声明需要抛出的事件
1. 声明要派发的事件
2. 使用 emit 派发时间

<br>

### <font color="#C2185B">defineEmits(["事件名"])</font>  
是Vue 3中的一个辅助函数

在Vue 2中, 你可以使用this.$emit来触发父组件的事件。在Vue 3中, 使用Composition API的setup()函数时, this上下文不再存在, 因此你无法直接使用this.$emit。

defineEmits的作用是创建一个函数, **该函数包含了父组件可用的所有事件**

<br>

**返回值:**  
emit()函数

<br>

**抛出多个自定义事件:**  
我们可以在数组中传入多个事件名称, ["事件1", "事件2"], 这时我们在使用 ``emit("事件1")`` 的时候可以指明派发哪个事件

<br>

### <font color="#C2185B">emit("事件名", 数据1, 数据2)</font>   
emit()函数的使用方式

<br>

比如我们要在子组件中派发 changeData 事件, 那么如下

1. 使用 defineEimts 将子组件要派发的事件暴露出去
2. 利用返回的emit函数 来派发指定的事件

```html
<!-- 子组件 -->
<script setup lang="ts">
// 获取emit函数
let emit = defineEmits(["changeData"])
const send = () => {
  // 点击按钮派发事件
  emit("changeData", {msg: "数据"})
}

</script>

<template>
  <h3>子组件</h3>
  <div>
    <button @click="send">派发</button>
  </div>
</template>




<!-- 父组件 -->
<script setup lang="ts">
const handleData = (data:{msg:string}) => {
  console.log("data: ", data)
}

</script>

<template>
  <!-- 监听自定义事件 -->
  <Page1 @changeData="handleData"/>
</template>
```

<br><br>

## Ts: 给emit()函数定义类型
利用的是 ``defineEmits<泛型部分>()`` 泛型部分

我们使用 type别名 的方式定义 emit事件的类型, 它是一个对象, 对象中指明事件的参数 和 返回值的类型

emit()函数的返回值就是 void

```js
// 定义自定义事件和参数的类型
type emitsType = {
  (e:"update:msg", msg:string):void,
  (e:"update:count", count:number):void,
}

const emit = defineEmits<emitsType>()


// 点击按钮 派发自定义事件
const handleClick = () => {
  emit("update:msg", "sam")
}
```

<br>

父组件
```html
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';
import Page1 from "./components/Page1.vue"

// 模版默认展示 0
let count = ref<number>(0)

// 处理监听的自定义事件
const handleCount = (c:number) => {
  count.value = c
}

</script>

<template>
  <Page1 @update:count="handleCount"/>
  <br>
  <div>{{count}}</div>
</template>
```

<br>

## 语法糖模式: expose:
如果子组件使用的是 **option api** 或 没有使用 ``<script setup>`` 这样父组件对子组件的每一个属性和方法都有完全的访问权 通过 ref

如果子组件使用了 ``<script setup>`` 那么子组件就是私有的 一个父组件无法访问到一个使用了 ``<script setup>`` 的子组件中的任何东西

当父组件想要拿到子组件的实例中的属性和方法的时候 子组件需要使用 defineExpose 将子组件内部的属性或方法暴露出去 父组件才能拿到 

<br>

### <font color="#C2185B">defineExpose({})</font>  
我们可以在对象中添加属性 或 方法 将其暴露出去 供父组件使用

```html
<!-- 父组件 -->

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';
import Page1 from "./components/Page1.vue"

// 定义ref找到子组件
let child = ref(null)

onMounted(() => {
  // .value打印组件
  console.log(child.value)
})

</script>

<template>
  <Page1 ref="child" />
</template>



<!-- 子组件 -->
<script setup lang="ts">
import { reactive, ref } from 'vue';

let data1 = ref("基本形式")
let data2 = reactive({
  msg: "对象形式"
})

defineExpose({
  data1,
  data2
})

</script>
```

这样父组件就可以修改子组件中的数据了

<br><br>

# 插槽
插槽的使用方式和vue2中的使用方式差不多 这里就当复习一下

<br>

### 插槽的本质:
```s
https://www.bilibili.com/list/666759136?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=280548682&bvid=BV16c41197G2
```

<br>

## 匿名插槽
使用匿名插槽非常简单, 只需要完成下面的步骤即可使用插槽功能
1. 子组件挖坑
2. 父组件在子组件的标签体内填入内容
```html
<!-- 子组件挖坑 -->
<template>
  <h2>Demo组件</h2>
  <slot />
</template>


<!-- 父组件填坑 -->
<template>
  <div>hello</div>
  <hr>
  <DemoSlots>
    父组件填入到子组件中的内容
  </DemoSlots>
</template>
```

<br><br>

## 具名插槽
1. 定义插槽的时候 使用 name 属性指定插槽名  
2. 父组件中使用 ``<template v-slot:插槽名>`` 的形式指定使用哪个插槽 简写形式 ``<template #插槽名>``

<br>

### 要点: 
当具名插槽和默认插槽一起使用的时候, 具名插槽的内容是通过 ``v-slot:插槽名`` 指明插槽的

而匿名插槽的内容可以有两种方式插入
1. 写在具名插槽外面的内容 默认会被放入到默认插槽中
2. 使用``<template #default>``指明使用的是默认插槽

```html
<!-- 子组件使用name挖坑 -->
<template>
  <h2>Demo组件</h2>
  <!-- 具名插槽 -->
  <div>
    <slot name="position1" />
  </div>
  <!-- 默认插槽 -->
  <div>
    <slot />
  </div>
</template>


<!-- 父组件v-slot:center填坑 -->
<template>
  <div>hello</div>
  <hr>
  <!-- 方式1: -->
  <DemoSlots>
    默认插槽的内容
    <template #position1>
      具名插槽的内容
    </template>
  </DemoSlots>


  <!-- 方式2: -->
  <DemoSlots>
    <template #default>
      默认插槽的内容
    </template>
    <template #position1>
      具名插槽的内容
    </template>
  </DemoSlots>
</template>
```

<br><br>

## 作用域插槽
数据在子组件里面 将数据提供给父组件的时候使用

1. 子组件在 slot标签中 使用v-bind的方式将子组件中的数据 传递到父组件的作用域
  - 传递到父组件中的数据, 被收集到一个对象中 ``{ msg: 数据 }``

2. 父组件通过 ``<template v-slot="data">`` 的方式, 通过 ``data.xxx`` 的形式使用子组件传递过来的数据, 父组件还可以通过解构直接拿到传递到父组件中的数据 ``<template v-slot="{ 数据1, 数据2 }">``

<br>

### 技巧: 具名插槽 和 插槽作用域 同时使用方式
```js
<template #default="data">
  默认插槽的内容 {{ data.msg }}
</template>
```

```html
<div>
  <!-- 向父组件传递数据 -->
  <slot :data="data" :index="index"></slot>
</div>  

<script lang="ts" setup>

  // 子组件的数据
  type namesType = {
    name: string,
    age: number
  } 

  const data = reactive<namesType[]>([
    {
      name:"sam",
      age: 18
    },
    {
      name:"erin",
      age: 18
    }
  ])
</script>

<!-- 父组件填坑 -->
<Child>
  <template v-slot="{data, index}">
    <div>
      {{data.name}}
    </div>
  </template>
</Child>
```

<br>

父组件使用 :data :index 都会被装在一个 {} 中 所以我们可以解构出来使用 相当于
```js
// 插槽作用域送到父组件的数据都会放在一个对象中
{
  data: ,
  index: ,
}
```

<br><br>

## 动态插槽:
通过变量的形式 指定插槽名, 之前都是写死的现在可以改为动态的

```html
<!-- 父组件 -->
<Child>
  <template #[name]">
    <div>
      我是内容
    </div>
  </template>
</Child>

<script setup lang="ts">
  let name = ref("footer")
  // 然后我们可以通过修改name的值 决定插槽的内容到底显示在哪里
</script>
```

<br><br>

# ref函数:
在Vue3中实现数据响应式的效果 就要使用``ref函数``

<br>

### 示例:
我们声明的 name 和 age 是普通的声明方式, 这时我们修改它们的值, 页面是不会产生响应式的效果的

如果我们希望当我们修改了 name 和 age 的时候, 页面会发生变化则需要使用 ref函数

```vue 
<template>
  <div id="container">
    <h3>title</h3>
    <button @click="changeInfo">click</button>
  </div>
</template>

<script>
// 当我们想通过 changeInfo 方法修改name和age的时候 vue是不认的 做不到响应式 页面不会有对应的变化
setup() {
  let name = "张三"
  let age = 18

  // 函数中默认的参数还是e
  function changeInfo(e) {
    name = "李四"
    age = 20
  }

  return {
    name,
    age,
    changeInfo
  }
},
</script>
```

<br>

### ref的使用步骤:

**1. 引入**
```js
import { ref } from "vue"
```

**2. 使用 ``ref(数据)`` 函数 将数据传入**

<br>

### ``ref(数据)`` 处理基本类型数据  
ref函数的返回值则是 响应式 的数据

通过 ``ref()`` 加工完的数据 是一个 **refimpl的实例对象**(引用实现对象)

响应式数据内部实现也是通过getter 和 setter来实现的

```js
let name = ref("张三")
console.log(name)
/*
RefImpl {
  _shallow: false, 
  dep: Set(1), 
  __v_isRef: true, 
  _rawValue: '张三', 
  
  _value: '张三'

  value: (...)
}
*/
```

### ``ref(数据)`` 使用方式:
1. 在 script 中使用的时候 ``name.value``
2. 在 html 中使用的时候 ``name``

<br>

```js 
// count接收到的是一个对象 { value: 0 }
const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

<br>

### 使用要点:
**当我们修改 数据的时候 要通过 .value 的形式**  
因为通过 ref函数 将数据封装成了一个引用对象    

也就是说经过ref(变量) 包装后的变量 就变成了一个**对象** 对象中有很多别的属性

所以需要 ``对象.value``的形式 才能拿到数据

<br>

```js 
setup() {
  // 通过 ref函数 将name属性封装成了一个对象
  let name = ref("张三")
  let age = ref(18)

  function changeInfo() {

    // name属性被ref封装成了一个对象 所以我们要通过 name.value的形势取值
    name.value = "李四"
    age.value = 20
  }

  return {
    name,
    age,
    changeInfo
  }
},
```

<br>

**模板中直接使用变量就可以:**   
在模板中解析的时候 vue会发现name是一个ref引用对象 vue在解析模板的时候会**自动** ``.value`` 所以我们不用特意的在模板用``name.value``的形式取值
```js 
<h3>{{ name }}--{{ age }}</h3>
```

<br>

### ref(数据) 处理引用类型数据
当我们使用ref去 **封装对象** 的时候 数据会被封装成一个RefImpl对象  

这时候注意 ``job.value`` 不再跟上面的例子一样直接是属性值 而是一个**proxy对象** 


```js
let job = ref({
  type: "前端",
  salary: "30k"
})


jov.value: {
  type: '前端', 
  salary: '30k'
}

/*
RefImpl {
  _v_isRef: true, 
  _v_isShallow: false,
  _rawValue: {type: '前端',salary: '30k'},

  value: Proxy(object)
    [[Target]]: Object
}
*/
```

也就是说当 要做响应式的数据类型是对象的时候 整个对象会被vue包装成一个proxy代理对象

<br>

### ``ref(对象)`` 使用方式:
1. 在 script 中使用的时候 ``对象.value.属性``
2. 在 html 中使用的时候 ``对象.属性``

<br><br>

## 技巧: ref函数获取元素节点的步骤:
**1. 在 标签中使用ref属性 进行标记**
```js 
<h3 ref="test">性别: </h3>
```

<br>

**2. 引入 ref函数 & onMounted函数**
```js
import {ref, reactive, onMounted} from "vue"
```

<br>

**3. ref函数的返回值声明为 标签中ref属性指定的值**
```js 
let test = ref(null)
```

然后, 我们可以在 onMounted 或者 nextTick 周期里面 通过 test.value 获取和使用元素节点
```js 
onMounted(() => {
  // 注意 我们使用的ref()包装的 所以使用的时候 test是一个对象 我们要.value才能拿到节点
  console.log(test.value)
})
```

<br>

**4. 在setup的最后 将 test return 出去**  
setup函数 先执行 我们定义了 test 一个响应式的refimpl 对象 然后将它return出去 

这样模板中就可以使用test这个变量 利用ref标签属性 将元素节点挂载test变量身上

```s
setup -> return出去一个变量 -> 模板中使用该变量保存ref节点对象
```

<br>

### 方式2: 使用dom直接获取
我们也可以通过 选择器选择DOM节点 但要注意在 onMounted 中获取
```js
onMounted(() => {
  let oDiv = document.querySelector("#msg")
  console.log(oDiv)
})
```

<br><br>

## Ts: ref函数获取元素节点
```js
<div ref="dom"></div>


// 使用ref
const dom = ref<HTMLDivElement | null>()

// 然后在事件的回调或者mounted中可以使用
onMounted(() => {

  const.log(dom.value?.innerHTML)

  console.log((test.value as HTMLElement).innerHTML)

})
```

<br>

### 注意:
我们上面使用 ref() 函数 获取dom对象的方式的顺序是
```s
ref()定义变量 test -> return暴露 -> 该变量在标签中被ref标签属性使用 ref="test"
```

然后我们是在 onMounted 回调中使用的 也就是组件挂载后, 因为ref创建的引用（ref）是在组件挂载后才被赋值的

这就意味着 我们没有办法直接在 setup 中使用ref对应的值, 因为它setup的执行时机比beforeCreate还要早

比如我们想通过 ref获取到dom节点 获取 input 中的值 这种场景是不行的

<br>

如果你正试图观察一个模板 ref 的变化, 确保考虑到 ref 的值为 null 的情况: 
```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载, 或此元素已经被卸载（例如通过 v-if 控制）
  }
})
```

<br><br>

## Ts: ref函数获取 组件实例 (组件实例的类型)
为了获取 MyModal 的类型

我们首先需要通过 typeof 得到其类型, 再使用 TypeScript 内置的 ``InstanceType`` 工具类型来获取其实例类型：
```html
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

// InstanceType<typeof MyModal>
const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}

</script>
```

<br><br>

## 技巧: ref函数获取 组件实例 (函数写法)
我们上面通过ref来获取组件实例的时候, 我们定义了 ``const target = ref()``, 然后将 target 传入到 dom的ref标签属性中 ``<div ref="target">`` 这种叫做**字符串用法**

<br>

### 函数式ref获取组件实例
ref绑定的回调在 html模版发生变化的时候 就会触发一次, 同时会注入ref绑定的组件实例 (proxy对象)
```html
<el-input
  :ref="handler"
/>

<script>
  const handler = (elInstace) => {
    // 该回调在该组件挂载到页面上的时候执行
  }
</script>
```

<br><br>

## 总结: ref函数

- ref函数 对于 **基本数据类型的时**, 使用ref函数 来对属性值进行包装成 **引用对象** 并且数据响应式数据劫持是利用的getter和setter

- ref函数 对于 **对象类型的数据** 对象里面的属性 并没有继续使用ref函数对它进行封装 而是对这个对象进行包装 使用了es6封装成了proxy代理对象 所以在拿对象中的属性的时候不用继续.value

- ref()接收的数据可以是: 基本类型 也可以是 对象类型    
  - 基本类型的数据:  响应式依然是靠Object.defineProperty()的getset   
  - 对象类型的数据:  内部"求助"了vue3中的一个新函数 reactive函数

<br><br>

# Ts: ref函数示例: 类型相关
我们看看如何在ts中使用ref函数, 如果我们在ts中使用它 需要为它指明类型  指明类型的方式有两种
1. 直接在ref后面使用泛型
2. 使用 vue 中提供的 Ref接口

<br>

### <font color="#C2185B">``ref<泛型>(数据)``</font>
我们在 ref 的后面加入泛型 
```vue
<script setup lang="ts">
import {ref} from "vue"

type M = {
  name:string
}
const Man = ref<M>({name:"小满"})
</script>
```

<br>

### ``Ref<数据的类型>`` 接口:
从 vue 中导入 专门作为 数据的类型  

该种方式适用于类型比较复杂的时候 我们自定义类型, 我们在类型的位置使用该接口
```vue
<script setup lang="ts">

import {Ref} from "vue"

type M = {
  name:string
}

const Man:Ref<m> = ref({name:"小满"})
</script>
```

<br><br>

# reactive函数:

### 引入: 
```js
import { reactive } from 'vue'
```

<br>

### 作用:   
定义一个**对象类型**的响应式数据(基本类型别用它 用ref函数)  

该函数是为了实现对象类型数据的响应式 内部是对proxy的封装

<br>

### 语法: 
```js
const 代理对象 = reactive(被代理对象)
```

<br>

### 参数:  
接收一个对象 或 数据

**注意:**  
如果我们使用的是ts, 且我们传入的是基本数据类型的数据, 则ts会报错, ts中 reactive 必须传入引用类型 (Array Object Map Set类型)

<br>

### 返回值:  
返回一个代理器对象(proxy对象)  

reactive定义的响应式数据是 深层次 的 内部基于es6的proxy实现 通过代理对象操作源对象内部数据都是响应式的

<br>

### 使用方式:  
使用 reactive函数 封装的响应式对象 直接可以通过 **对象.属性** 的方法访问数据  

不用像ref封装的对象那样 对象.value.属性

1. script中使用: ``obj.属性``
2. html中使用: ``obj.属性``


```js 
let job = reactive({
  type: "前端",
  salary: "30k"
})

Proxy {type: '前端', salary: '30k'}

function changeInfo() {
  job.type = "ui"
}
```

<br>

### reactive 和 ref函数 的区别:  
**reactive只能定义对象类型的响应式数据** 不能定义基本类型的响应式数据, 而 ref函数 基本类型 和 对象类型 都可以

<br>

### 使用reactive处理数组类型的数据:
使用 reactive 将一个数组包装成响应式数据 当修改响应式数组的时候 我们可以**通过索引来读取和修改** 这点和vue2不同 vue2中数组的修改必须借助数组的方法

```js 
let arr = ["抽烟"]
let arr = reactive(["抽烟"])

// 读 和 改 的时候 直接通过索引即可
hobby[0] = "学习"
```

<br>

### 注意: 代理对象不能被直接赋值
reactive是一个proxy代理对象 我们不能对这个对象直接赋值 **会丢失响应式**

```vue
<script setup lang="ts">
import {reactive} from "vue"

let list = reactive<string[]>([])

const getList = () => {
  // 模拟异步请求回来的数据
  setTimeout(() => {
    let data = ["a", "b", "c"]

    // 将请求回来的数据直接赋值给 list
    list = data
  })
}
</script>
```

上面原本是响应式的list丢失了响应式, 解决方法如下

<br>

### 解决方案1:  
数组的话可以使用 push + 解构
```js
list.push(...res)
```

<br>

### 解决方案2:  
我们可以将 list 放在对象上中的一个属性上 这个给对象中的属性赋值不会破坏响应式
```js
let obj = reactive<{list: string[]}>({
  list: []
})


obj.list = data
```

<br>

### 问题: 响应式 对象 被重新赋值 会丢失响应式
上面我们说了数组的问题, 对象也是一样

在Vue 3中, 当你使用reactive函数创建响应式对象时, 如果你重新为响应式对象赋值一个新的普通对象, 它会失去响应式。

这是因为**Vue的响应式系统只能追踪已经被创建时就存在的属性**。如果你为响应式对象赋值一个新的对象, Vue 不会追踪这个新对象的变化。
```js
type objType = {
  name: string,
  age: number
}
let obj = reactive<objType>({
  name: 'sam',
  age: 18
})

console.log(obj)

const getList = (): void => {
  setTimeout(() => {
    const data = {
      name: 'erin',
      age: 18
    }

    obj = data
    console.log('click', obj)
    // obj被重新赋值后 丢失了响应式
  })
}
```

<br>

### 解决方式1: 做为对象的属性出现
上面的obj是直接定义的, 也就是在顶层(外层), 这时我们为它重新赋值为一个新的对象, 会丢失响应式

但是如果 obj 作为一个对象的属性出现的话, 则它不会丢失响应式
```js
import { reactive } from 'vue'

let data = reactive({
  animals: ['小猫', '小狗']
})

const onUp = () => {
  data.animals = ['大猫', '大狗']
}
```

<br>

### 解决方式2: 使用ref定义引用类型的数据
```js
let obj = ref<objType>({
  name: 'sam',
  age: 18
})
```

<br>

### 总结: 
在 vue2 中的时候我们操作数组的时候会很灵活 如下的方式都可以
```js
// 定义一个普通数组
let uids: number[] = [ 1, 2, 3 ];

// 从另外一个对象数组里提取数据过来
uids = api.data.map( item => item.id );

// 合并另外一个数组
let newUids: number[] = [ 4, 5, 6 ];
uids = [...uids, ...newUids];

// 重置数组
uids = [];
```

但是在 vue3 中则不行 我们在3.x中操作reactive数组的时候 **必须只使用不会改变引用地址的操作**

<br>

Vue 3的响应式系统对数组的追踪和变更是基于Proxy实现的, 所以一些操作可能不再像Vue 2中那样灵活, 需要遵循一定的规则, 以确保响应性的正确性。

在Vue 3中, 对响应式数组的操作必须只使用不会改变引用地址的操作, 例如使用数组的方法（如push, pop, shift, unshift, splice等）进行修改, 以确保Vue能够正确地跟踪数组的变化。

<br>

### 清空数组的操作:  
```js
let arr = [1,2,3]

// 清空数组
arr = []    // 这样不行 相当于改了地址值

arr.length = 0    // 这样可以
```

<br><br>

# vue3中的响应式原理: 

<br>

## vue2的响应式原理:

### 对象类型: 
通过 Object.defineProperty()对属性的读取 修改进行拦截

<br>

### 数组类型: 
通过重写更新数组的一系列方法来实现拦截

<br>

### 存在的问题:
1. 新增属性 删除属性 界面不会更新  
2. 直接通过下标修改数组 界面不会自动更新

<br><br>

## vue3的响应式原理:
vue2中存在着 当想给响应式的对象 或 数组中添加属性 或者 删除属性的时候 对象要借助特殊的api 数组要借助vue封装好的方法才能做到响应式的删除和增加   

但是在vue3中我们可以直接使用 下面的方式来修改数据 并且是响应式的
```js
person.name = "sam"
arr[0] = 1

delete person.name
```

<br>

### 实现原理:  
**通过 proxy:**   
拦截对象中任意属性的变化 包括 属性值的读写 属性的添加 属性的删除等  

**通过reflect:**  
对被代理对象的属性进行操作

<br>

我们是通过代理对象对目标对象直接的控制, 并不是像Vue2中那样在代理对象上使用 ``Object.defineProperty()`` 设置属性 利用 getter

<br><br>

## 扩展知识体系 new Proxy()

### <font color="#C2185B">let 代理对象 = new Proxy(源对象, 配置对象)</font>  
该方法是window上的方法 es6新增 

我们可以通过该方法创建 代理对象 通过对代理对象的操作 映射到源对象上  

也就是说 我们通过对 代理对象 的操作 增删改查 会直接反应到 源对象身上
```js
// 创建 源对象
let person = { name: "张三", age: 18 }

// 创建 代理对象
const p = new Proxy(person, {}) 


// 如果仅是想通过 代理对象 对 源对象 进行添加 删除 修改 读取等操作的时候 第2个参数可以传递 空对象占位

// 我通过 p 去修改 person 中的属性 person里面的属性是会发生对应的变化
p.name = "李四"
console.log(person)   // {name: '李四', age: 18}


// 但是 如果想在映射操作的同时 做一些响应式的逻辑处理 那么就需要了解下 参数2 配置对象了
```

<br>

### 参数1:源对象   
需要对哪个对象进行代理操作

<br>

### 参数2:  配置对象  
### <font color="#C2185B">get(target, propName) { ... }</font>  
该函数在有人 读取了代理对象中的属性的时候 会被调用   

- target: 源对象  
- propName: 被读取的属性值

<br>

### <font color="#C2185B">set(target, propName, value) { ... }</font>  
该函数在有人 修改 和 往p中追加属性的时候 会被调用  

- value: 被修改后的值

<br>

### <font color="#C2185B">deleteProperty(target, propName) { ... }</font>  
该函数在有人 删除了 p中的属性的时候 会被调用

<br><br>

## proxy的 getter 和 setter 和 defineProperty 中的getter setter对比:    
defineProperty中的getter 和 setter得多次为代理对象中多次添加属性 同时为每一个属性对应一套getter和setter  

而 proxy 中的getter setter一套为其所代理的所有属性服务
```js 
let person = {
  name: "张三",
  age: 18
}

const p = new Proxy(person, {

  // 当有人读取了p中的属性的时候 我们将源对象中的属性返回出去
  get(target, propName) {
    console.log("我要做响应式的逻辑了")
    return target[propName]
  },

  // 当有人修改 或往 p中追加新属性的时候该方法会被调用
  set(target, propName, value) {
    console.log("我要做响应式的逻辑了")
    target[propName] = value
  },

  // 当有人删除了p中的属性的时候该方法会被调用 内部我们使用delete关键字删除属性
  deleteProperty(target,propName) {
    
    // delete这个关键字删除属性的时候是有返回值的 我们可以将删除结果的返回值返回出去 
    console.log("我要做响应式的逻辑了")
    return delete target[propName]
  }
}) 
```

<br>

上面的get set deleteProperty方法中我们是通过下面的方修改了源数据 person
```js 
return target[propName]         getter
target[propName] = value        setter
return delete target[propName]  deleteProperty
```

但是vue3在底层并不是这么简单的修改了源数据的 在此之前 我们再了解一下 window身上的另一个方法 Reflect 它也可以直接使用

<br>

### <font color="#C2185B">Reflect.get(目标对象, '获取什么属性')</font>  
### <font color="#C2185B">Reflect.set(目标对象, '修改什么属性', '修改为什么值')</font>  
### <font color="#C2185B">Reflect.deleteProperty(目标对象, '删除什么属性')</font>  
也就是说 我们对 对象的增删改查还可以通过这个api   

ecma现在要把Object身上的很多方法移植到Reflect身上  

比如Reflect身上也有 defineProperty方法 而且Reflect身上的defineProperty方法是有返回值的

vue3在做响应式处理的时候 并不是通过 .的方式去读取属性 或者 给属性赋值 而是使用 Reflect的方式
```js 
const p = new Proxy(person, {

  get(target, propName) {
    console.log("我要做响应式的逻辑了")
    return Reflect.get(target, propName)
  },

  set(target, propName, value) {
    console.log("我要做响应式的逻辑了")
    Reflect.set(target, propName, value)
  },

  deleteProperty(target,propName) {
    console.log("我要做响应式的逻辑了")
    return Reflect.deleteProperty(target, propName)
  }
}) 
```

<br>

### 总结:
通过 Proxy:  拦截对象中任意属性的变化 包裹 属性值的读写 属性的添加 属性的删除等  

通过 Reflect:  对被代理对象(源对象)的属性进行操作

<br><br>

## reactive 和 ref 的区别:

### 从定义数据角度对比: 
- ref用来定义:  基本类型数据
- reactive用来定义:  对象 或 数组 类型的数据

<br>

### 备注: 
ref也可以用来定义对象类型数据 它背部会自动通过reactive转为代理对象

<br>

### 从原理角度对象:  
ref通过Object.defineProperty的get set来实现响应式 数据劫持   

reactive通过使用proxy来实现响应式 并通过Reflect操作源对象内部的数据

<br>

### 从使用角度对比:   
ref定义的数据: 操作数据需要.value 读取数据时模板中直接读取不需要.value   

reactive定义的数据:  操作数据与读取数据 均不需要.value

<br><br>

## 技巧: 利用 reactive 创建date配置项:
基本类型的数据也可以使用 reactive 来解决 这样就不用``.value``

```js 
let data = reactive({
  person: {
    name: 'sam',
    age: 18
  },
  student: {

  }
})
```

我们将所有的数据都放在data这个 然后用reactive来处理这个对象 这样不就行了么 而且还像以前的data配置项

<br>

### 注意:
1. ref模板中的节点的时候 不能采用这种方式
2. 采用这种方式的时候 前面都要带上data.
3. 采用这种方式的时候 不能够使用解构 let {title} = data 这样是不行的

<br><br>

# vue3中 计算属性 与 监视
虽然不建议这么做 但还是要说下 在vue3中在写计算属性的时候是可以按照vue2中的方式来写    

vue3中将计算属性变成了组合式的api 我们要是需要使用计算属性的时候 需要引入

<br><br>

## computed: 计算属性

### 引入:  
```js
import { computed } from 'vue'
```

<br>

### 使用方式:  
返回值就是我们要使用的计算属性 模版中要使用的时候 需要return出去

<br>

### <font color="#C2185B">let 计算属性 = computed(() => { return ... })</font>
其返回值在js脚本中要使用 ``.value`` 模板中不用

<br>

### 书写位置:  
vue3中 计算属性也在 setup函数内部来定义 回调中的书写方式和vue2中一样

<br>

### Ts中的类型:
我们有如下的两种方式 来表示 computed 返回的值的类型
1. 自动推导
2. 使用泛型

```js
const double = computed<number>(() => {
  // 若返回值不是 number 类型则会报错
})
```

<br>

### 简写形式: (无getter等)
```js 
let fullName = computed(() => {
  return person.firstName + '-' + person.lastName
})


// Ts写法:
type dataType = {
  [_: string]: any
}

let data = reactive<dataType>({
  firstName: "刘",
  lastName: "春杉"
})

let result = computed(() => data.firstName + ":" + data.lastName)
```

```html
<template>
  <h3>我是Demo组件</h3>
  姓:  <input type="text" v-model="person.firstName"> <br>
  名:  <input type="text" v-model="person.lastName"> <br>
  <span>全名: {{fullName}}</span> 
</template>

<script>
import {computed, reactive, ref} from "vue"

export default {
  name: 'Demo',

  setup() {

    let person = reactive({
      firstName: "张",
      lastName: "三",
    })

    let fullName = computed(() => {
      return person.firstName + '-' + person.lastName
    })

    return {
      person,
      fullName
    }
  },
}
</script>
```

<br>

### 完整形式: (getter setter)  
完整形式的写法是在computed的形参中传入一个配置对象

```js 
let fullName = computed({
  get() {
    return person.firstName + '-' + person.lastName
  },

  set(value) {
    const nameArr = value.split("-")
    person.firstName = nameArr[0]
    person.lastName = nameArr[1]
  } 
})
```

<br>

## 技巧:
我们可以在setup中任何一个需要属性的地方使用这种方式 **将该属性变为计算属性**
```js
let fullName = computed(() => {
  return person.firstName + '-' + person.lastName
})

// 上面还可以这样: 将对象中的一个属性变为计算属性
person.fullName = computed(() => {
  return person.firstName + '-' + person.lastName
})
```

<br> 

### 注意:
### 1. 计算函数不应有副作用   
计算属性的计算函数应只做计算而没有任何其他的副作用

举个例子, 不要在计算函数中做异步请求或者更改 DOM！

一个计算属性的声明中描述的是如何根据其他值派生一个值 因此计算函数的职责应该仅为计算和返回该值

<br>

### 2. 避免直接修改计算属性值  
从计算属性返回的值是派生状态 可以把它看作是一个"临时快照", 每当**源状态发生变化时**, 就会创建一个新的快照 

更改快照是没有意义的, 因此计算属性的返回值应该被视为只读的, 并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算 

<br>

### 3. 在计算属性中使用 **reverse() 和 sort()** 请保持谨慎！  
这两个方法将变更原始数组, 计算函数中不应该这么做 请在调用这些方法之前创建一个原数组的副本: 
```js
// return numbers.reverse()
return [...numbers].reverse()
```

<br>

## Ts: computed类型的定义:
泛型处指明的是 res 的类型, 也就是 computed 返回值的类型 如果不是type则会报错
```js
let res = computed<type>(() => { ... })
```

<br>

## Ts: computed的传参
```js
// 在内部返回的函数中接收参数
let res = computed<type>(() => (...args:any) => { ... }))


// flag: boolean
let flag = computed(() => {
  return (item:listType, index:number) => {
    return item.count <= 0
  }
})
```

<br>

### 计算属性的配置项:
在Vue3中, **计算属性默认是启用缓存的**, 这是因为缓存可以提高计算属性的性能, 避免不必要的重复计算。

如果你需要在计算属性中关闭缓存, 你可以使用Vue3中新增的一个选项：**cache**。

将cache选项设置为false将禁用计算属性的缓存, 每次访问计算属性都会重新计算它的值。

```js
import { computed } from 'vue'

const myComputedValue = computed(() => {
  // 计算属性逻辑
}, { cache: false })
```

<br><br>

## 案例: 购物车
很简单就是一个表格

|商品名称|商品数量|商品单价|操作|
|:--:|:--:|:--:|:--:|
| 衣服 | - count + | 1000 | 删除 |
| 裤子 | - count + | 1000 | 删除 |
|总计|

<br>

我们要完成的就是 总计金额 和 添加 - + 删除 按钮数量会发现变化的逻辑

```html
<table>
  <thead>
    <tr>
      <th>商品名称</th>
      <th>商品数量</th>
      <th>商品单价</th>
      <th>操作</th>
      <th>减少按钮的标识</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) of list" :key="index">
      <td>{{item.name}}</td>

      <td>
        <button 
          @click="handlePrice('dec', item)"
        >-</button>
        
          &emsp;{{item.count}}&emsp;
          
        <button @click="handlePrice('inc', item)">+</button>
      </td>

      <!-- 商品单价 -->
      <td>{{item.price * item.count}}</td>

      <!-- 删除按钮 -->
      <td>
        <button @click="handlePrice('del', undefined, item.id)">删除</button>
      </td>
    </tr>
  </tbody>

  <!-- 总计 -->
  <tfoot>
    <td colspan="5">总价: {{total}}</td>
  </tfoot>
</table>
```

```html
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { reactive, ref } from 'vue';

// 定义list类型
type listType = {
  id: number,
  name: string,
  count: number,
  price: number
}

// 在 reactive 泛型的位置 给定类型
let list = reactive<listType[]>([
  {
    id: 1,
    name: "sam的衣服",
    count: 1,
    price: 100
  },
  {
    id: 2,
    name: "sam的裤子",
    count: 1,
    price: 200
  },
  {
    id: 3,
    name: "sam的鞋子",
    count: 1,
    price: 300
  },
])

// 总价逻辑: (item.count * item.price) 要加上 count 的部分 这样以后count变化 总价也会发生变化
let total = computed<number>(() => list.reduce((pre, item) => pre + (item.count * item.price), 0))


// Ts中函数类型的定义方式: type + 函数
type priceEventType = (type: string, data?: listType, id?: number) => void

// 在函数名的后面给定类型, 函数参数部分不用重复定义类型
const handlePrice:priceEventType = (type, data, id) => {


  switch (type) {
    case "dec":

      // 如果使用的参数是 可选参数 那么必须要判断后才能使用
      data && data.count > 1 && data.count--
      break

    case "inc":
      data && data.count++
      break

    case "del":

      // 不行? 这样得到结果是不带响应式的
      // list = list.filter(item => item.id != id)

      // 必须调用数组的方式
      let index = list.findIndex(item => item.id == id)
      list.splice(index, 1)
      break

    default:
      break
  }
}


// 优化: 将每个事件回调封装到 对象中 通过传入的type进行读取调用
const handlePrice:priceEventType = (type, data, id) => {

  // Ts中 使用 变量当做属性名 读取对象中的属性会报错 使用了 Record 来告诉ts 对象中的key就是string 值为Function类型
  const methods: Record<string, Function> = {
    dec() {
      data && data.count--
    },
    inc() {
      data && data.count++
    },
    del() {
      let index = list.findIndex(item => item.id == id)
      list.splice(index, 1)
    }
  }
  
  type && methods[type]()


  // 方式2: 这种方式也是在告诉 type 的类型是string
  type && methods[type as keyof typeof methods]()
  /*
    typeof返回的是类型: 那么 methoods 中返回的类型是如下
      typeof = {
        dec(): void
      }

    keyof 后面接的也是类型 返回的也是类型 返回的是 类型中的key
      type test = typeof methods
      type res = keyof test

        type res = "dec"
  */
}
</script>
```

<br>

### 完成版:
```vue
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';


type listType = {
  id: number,
  name: string,
  count: number,
  price: number
}

let list = reactive<listType[]>([
  {
    id: 1,
    name: "sam的衣服",
    count: 1,
    price: 100
  },
  {
    id: 2,
    name: "sam的裤子",
    count: 1,
    price: 200
  },
  {
    id: 3,
    name: "sam的鞋子",
    count: 1,
    price: 300
  },
])


// 总计
let total = computed<number>(() => list.reduce((pre, item) => pre + (item.price * item.count), 0))
// 按钮的计算属性
let flag = computed(() => (item:listType) => item.count <= 0)

// 处理函数
type handlePriceType = (type:string, data?:listType, id?:number) => void
const handlePrice:handlePriceType = (type, data, id) => {
  
  let methods = {
    inc() {
      data && data.count++
    },
    dec() {
      console.log("我触发了么")
      data && data.count--
    },
    del() {
      let index:number = list.findIndex(item => item.id == id)
      list.splice(index, 1)
    }
  }

  methods[type as keyof typeof methods]()
}

</script>

<template>
<table>
  <thead>
    <tr>
      <th>商品名称</th>
      <th>商品数量</th>
      <th>商品单价</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) of list" :key="index">
      <td>{{item.name}}</td>

      <td>
        <button 
          :disabled="flag(item)"
          @click="handlePrice('dec', item)"
        >-</button>
        
          &emsp;{{item.count}}&emsp;
          
        <button @click="handlePrice('inc', item)">+</button>
      </td>

      <!-- 商品单价 -->
      <td>{{item.price * item.count}}</td>

      <!-- 删除按钮 -->
      <td>
        <button @click="handlePrice('del', undefined, item.id)">删除</button>
      </td>
    </tr>
  </tbody>

  <!-- 总计 -->
  <tfoot>
    <td colspan="5">总价: {{total}}</td>
  </tfoot>
</table>
</template>
```

<br>

### 注意:  
项目中我们让 商品数量在 ``<= 0`` 的时候就禁用 所以写了以下的逻辑 发现按钮一旦被禁用 按钮就不能再修复了

**网上给出的建议如下:**  
大体就是 使用 div 包裹 button 点击的逻辑用div来处理 禁用样式的逻辑 直接作用在button上
```
https://www.jianshu.com/p/a4bbeeabf4ea
```

<br><br>

## watch: 监视
它跟vue2中watch配置功能是一致的

先简单的复习一下 vue2 中的监视如果使用
```js
// vue2中 简写的方式: 
watch: {
  sum(newValue, oldValue) {
    console.log(newValue, oldValue)
  }
},

// vue2中 完整的写法: 
watch: {
  immediate: true,
  deep: true,
  sum: {
    handler(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  }
},
```

我们再来看看vue3中的watch怎么使用 vue3中的watch也是组合api 组合api都是vue中内置的一些函数 我们要是想使用的话 需要提前引入

<br>

### 引入:
```js
import {watch} from 'vue'
```

<br>

### 书写位置:  
setup 函数中书写 

<br>

### 使用方式:  
- 当监视的属性发生变化的时候 回调中的逻辑就会被调用
- watch()可以使用多次

<br>

### 形式1: watch第一个参数为 基本数据类型
### <font color="#C2185B">watch(要监视的属性, (n, o) => { }, [{配置项}])</font>  
watch() 不用创建什么变量去接返回值

### 参数1:  
监视谁

<br>

### 参数2:  
回调 

<br>

### 示例: 监视ref定义的一个 或 多个响应式数据
```js 
// 监视ref定义的一个响应式数据
setup() {
  let sum = ref(0)

  // 监视数据sum
  watch(sum, (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })

  return {
    sum
  }
},


// 监视ref定义的多个响应式数据
let sum = ref(0)
let msg = ref("你好啊")

watch(sum, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})

watch(msg, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
```

从上面我们能看出vue2和vue3中的 关于watch的一个区别 vue2中我们只能写一个监视属性(因为watch是一个配置项 没办法写2个一样配置项) 

但是vue3中我们可以多次调用watch函数来监听多个属性  
当监视多个属性的时候 我们还可以将watch函数的第一个参数 写成一个数组

<br>

### 形式2: watch第一个参数为 数组
### <font color="#C2185B">watch([监视数据1, 监视数据2], (新值数组 旧值数组) => { }, [{配置项}])</font>   

当参数1写成数组的时候 n o 对应也是数组

```js 
let sum = ref(0)
let msg = ref("你好啊")

watch([sum, msg], (newValue, oldValue) => {
  console.log(newValue, oldValue)
})


// 结果
newValue:  是一个装有监视属性新值的数据
[1, '你好啊']

oldValue:  是一个装有监视属性旧值的数据
[0, '你好啊']
```

### 参数1: 注意   
我们能监视的只能是响应式的对象 数组 getter/effect等 普通的值可能会报错

<br>

### 参数3: 配置项  
vue3中 将deep 和 immediate等配置放在了watch函数的第三个参数的位置

```js 
watch([sum, msg], (newValue, oldValue) => {

  console.log(newValue, oldValue)

}, {

  // 监听深层级对象
  deep: true,

  // 页面内一加载先执行此watch回调
  immediate: true,

  // 控制监听回调的调用时机 default: pre
  flush: "pre | post | sync",

  // 在数据源被追踪时调用
  onTrack: e => void,

  // 在监听回调被触发时调用, 可以在开发模式下帮助我们调试 比如回调中写 debugger
  onTrigger: e => void
})
```

**<font color="#C2185B">pre:</font>**   
当flush的值为"pre"时, watch回调函数将在渲染之前（pre）被调用。允许回调在模板运行前更新了其他值

比如 当你希望在模板重新渲染之前执行某些逻辑, 确保模板中的数据已经被更新。

<br>

**<font color="#C2185B">sync:</font>**  
当flush的值为"sync"时, watch回调函数将在渲染时被同步调用。

这意味着在组件渲染的过程中, watch回调函数会被立即触发。然而, 在大多数情况下, 这种同步调用并不是最佳做法, 因为它可能导致性能问题和不稳定的渲染。**不建议用**

<br>

**<font color="#C2185B">post:</font>**   
当flush的值为"post"时, watch回调函数将在渲染之后（post）被调用。

这意味着在模板重新渲染之后, watch回调函数会被触发。在这种情况下, 你可以确保回调函数在模板中的数据已经被渲染并且所有依赖项已经更新。

如果要通过 ref 操作 DOM 元素与子组件 , 需要使用这个值来启用该选项, 以达到预期的执行效果

```js
// 在我们能加上 flush 之前获取到的肯定是 null
watchEffect(() => {
  let oDiv = document.querySelector("#msg")
  console.log(oDiv)
}, {flush: "post"})

// watchEffect页面一加载就会执行一次
```

<br>

- watch中该配置在第三个参数的位置  
- watchEffect中该配置在第二个参数的位置

<br>

### 取消监视: 
watch()会返回一个变量 通过该变量可以手动取消监视 正常是不用我们管的
```js
// 定义一个取消观察的变量, 它是一个函数
const unwatch = watch(message, () => {
  // ...
})

// 在合适的时期调用它, 可以取消这个监听
unwatch()
```

<br>

### 示例: 监视reactive所定义的一个响应式数据中的全部属性
上面介绍的都是使用ref函数定义的基本类型的数据 那如果是**reactive函数定义的对象**怎么办？

```js 
let person = reactive({
  name: "erin",
  age: 18
})

// 监视person对象
watch(person, (n, o) => {
  console.log("person变化了", n, o)
})
  
// 注意:  当我们输出newValue 和 oldValue 的时候发现n 和 o是一样的 都是修改后的值
```

<br>

### 注意:
当我们将reactive所定义的数据(也就是一个对象)交给watch去监视的时候 **我们没办法获取正确的oldValue值** 它会和newValue是一样的 

当reactive所定义的对象类型的数据里面还有对象的时候(**对象嵌套的时候**) vue3在watch里面强制开启了deep深度监视 而且关不上

<br>

### 如果我们要取旧值的话 可以再起一个ref去存旧值 然后监视我们存的值
```js
let obj = reactive({
  name: "sam",
  job: {
    front: "vue"
  }
})

// 将我们要监视的值拿出来
let job = toRef(obj, "job")

watch(() => job.value.front, (n, o) => {
  console.log("旧值:", o)
  console.log("新值:", n)
})
```

<br>

### 示例: 监视reactive所定义的一个响应式数据中的 某个属性
我只想监视person中的age属性 怎么写？

<br>

**1. 将参数1设置为函数 利用函数的返回值监视某个属性:**  
利用函数的返回值监视 reactive 定义的对象中的一个属性

<br>

### <font color="#C2185B">watch(() => 对象.属性, (新值数组 旧值数组) => { }, [{配置项}])</font>   
```js
watch(() => person.name, (n, o) => {
  console.log("person变化了", n, o)
})

// 注意:  这里的n o都是正确的
```

<br>

### 示例: 监视reactive所定义的一个响应式数据中的 某些属性
这时我们把参数1设置为数组 成员则为 函数

```js
// 参数1
[
  () => person.name,
  () => person.age
]
```

```js 
watch([() => person.name, () => person.age], (n, o) => {
  console.log("person变化了", n, o)
})
```

<br><br>

## watch特殊情况: 深层次对象
当reactive定义的对象中还有对象的时候 我们使用watch监视对象中的对象中的属性的时候 要开启deep深度监视

并使用 参数1为函数的形式 监视对象中的深层对象
```js 
let person = reactive({
  name: "erin",
  age: 18,
  job: {
    j: 1
  }
})

// 我们监视job里面的j1的时候 要开启deep深度监视
watch(() => person.job, (n, o) => {
  console.log("person的job对象变化了")
}, { deep: true })
```

<br><br>

## watch监视ref定义的数据时, 是否使用 属性.value? 不用!
```js 
let sum = ref(0)

// 用了 .value 反而报错了
watch(sum.value, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
```

报错 当我们监视 sum.value 的时候会报错 说我们没办法监视一个数0 当我们**想做监视的时候往往是监视的是一个数据结构** 

<br><br>

## watch监视ref定义的对象时
当我们监视 sum 的时候 我们监视的是 refimpl{...} 这个对象中任何属性的修改我都能监测到 当我们监测的是 ``let person = ref({name: "sam"})`` 的时候

<br>
 
这里**我们使用的是ref函数定义的数据** 当它定义的数据类型是一个对象的时候 内部还是会调用reactive的

所以我们使用watch去监视person的时候 **要 person.value**  
因为 person 是 refimpl对象 person.value 才是我们要监视的 proxy 对象
```js 
watch(person.value, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})


// 我们也可以这么写 然后开启深度监视
watch(person, (newValue, oldValue) => {
  console.log(newValue, oldValue)
}, {deep: true})
```

<br>

### 上面是对 watch 监视属性的一些基本的使用方法 现在我们来了解一些概念上的问题:

计算属性允许我们声明性地计算推导值 然而, 在有些情况下, 为了应对一些状态的变化, 我们需要运行些"副作用"

例如更改 DOM, 或者根据异步操作的结果, 去修改另一处的状态 

比如下watch里面发送请求 我们可以使用 watch 函数在每次响应式状态发生变化时触发回调函数: 

```html
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>
```

<br><br>

## watch的两个坑:

### 监视reactive定义的响应式数据时候:  
oldvalue无法正确获取 强制开启了深度监视(deep配置失效)

当数据是一个基本数据类型的时候oldValue是有效的 当数据是一个对象数据类型的时候 oldValue 是无效的 

<br>

### 监视reactive定义的响应式数据中的某个属性时: deep配置有效

<br><br>

# watchEffect函数
它也是一个组合式的api 所以在使用之间需要引入 同时它也是写在setup函数中

用于创建一个响应式的副作用。它会自动追踪其依赖, 并在依赖变化时重新运行。

这与 watch 函数不同, watchEffect 不需要显式地指定要监听的响应式变量, 而是自动捕获副作用函数内部使用的响应式变量。

watchEffect 函数接受一个函数作为参数, 该函数是副作用函数。在副作用函数内部, 你可以使用任何响应式变量（例如 ref、reactive）以及其他计算属性、方法等。

**它主要监听的是响应式数据的变化**

<br>

### <font color="#C2185B">watchEffect(() => { })</font>  
这个回调上来就会执行一次  

这个回调中用到了哪些数据 就会监视哪些数据
```js 
import { ref, watchEffect } from 'vue';

const count = ref(0);

watchEffect(() => {
  console.log(`Count is: ${count.value}`);
});

// 在其他地方修改 count 的值, watchEffect 会自动触发
count.value++; // 输出: "Count is: 1"
count.value += 5; // 输出: "Count is: 6"
```

<br>

### 回调的参数: oninvalid  
oninvalid 也是一个函数 需要传递一个回调进去    
oninvalid函数 每当我们监视的值发生变化的时候 它的回调会优先执行

有点类似react useEffect 呢


```js
let ok = ref(true)

watchEffect( onInvalidate => {

  // 代码一
  console.log('执行一些代码', ok.value)
  console.log('执行更多的代码');


  // 代码二
  onInvalidate(()=>{ console.log('除了在初始运行时不被调用, 我总是在【执行一些代码】之前被执行(调用)'); }) 
})
```

<br>

### onInvalidate的使用场景:  
我们可以在这里回调里面处理防抖呀 清除一些接口呀

<br>

### 应用场景:  
watch() 是懒执行的: 仅在侦听源变化时, 才会执行回调 但在某些场景中, 我们希望在创建侦听器时, 立即执行一遍回调 

举个例子, 我们想请求一些初始数据, 然后在相关状态更改时重新请求数据 我们可以这样写: 

```js
const url = ref('https://...')
const data = ref(null)

async function fetchData() {
  const response = await fetch(url.value)
  data.value = await response.json()
}

// 立即获取
fetchData()
// ...再侦听 url 变化
watch(url, fetchData)
```

<br>

这段代码还可以用 watchEffect 函数 来简化 watchEffect() 会立即执行一遍回调函数, 如果这时函数产生了副作用, Vue 会自动追踪副作用的依赖关系, 自动分析出响应源 上面的例子可以重写为: 

```js
const url = ref('https://...')
const data = ref(null)

watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

这个例子中, 回调会立即执行 在执行期间, 它会自动追踪 url.value 作为依赖（近似于计算属性） 每当 url.value 变化时, 回调会再次执行

<br>

### watch vs watchEffect  
watch 和 watchEffect 都能响应式地执行有副作用的回调 它们之间的主要区别是追踪响应式依赖的方式: 

**watch 只追踪明确侦听的源**  
它不会追踪任何在回调中访问到的东西 另外, 仅在响应源确实改变时才会触发回调 watch 会避免在发生副作用时追踪依赖, 因此, 我们能更加精确地控制回调函数的触发时机 

**watchEffect**  
则会在副作用发生期间追踪依赖 它会在同步执行过程中, **自动追踪所有能访问到的响应式 property 这更方便**, 而且代码往往更简洁, 但其响应性依赖关系不那么明确 

<br>

### 注意: 回调的刷新时机
当你更改了响应式状态, 它可能会同时触发 Vue 组件更新和侦听器回调 
默认情况下, 用户创建的侦听器回调, 都会在 Vue 组件更新之前被调用 *这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态 *

如果想在侦听器回调中能访问被 Vue 更新之后的DOM, 你需要指明 flush: 'post' 选项: 

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

<br>

### <font color="#C2185B">watchPostEffect()</font>  
后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect():
```js
import { watchPostEffect } from 'vue'
```

```js
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

<br>

### 停止侦听器  
在 setup() 或 ``<script setup>`` 中用同步语句创建的侦听器, 会自动绑定到宿主组件实例上, 并且会在宿主组件卸载时自动停止 因此, 在大多数情况下, 你无需关心怎么停止一个侦听器 

一个关键点是, 侦听器必须用同步语句创建: 如果用**异步回调创建一个侦听器**, 那么它不会绑定到当前组件上, 你必须**手动停止它**, 以防内存泄漏 如下方这个例子: 
```html
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

<br>

### 停止监听器
要手动停止一个侦听器, 请调用 watch 或 watchEffect 返回的函数: 
```js
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

<br>

注意, 需要异步创建侦听器的情况很少, 请尽可能选择同步创建 如果需要等待一些异步数据, 你可以使用条件式的侦听逻辑: 
```js
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```

<br>

### 总结: 
**watch的套路是:**    
既要指明监视的属性 也要指明监视的回调

<br>

**watchEffect的套路是:**    
不用指明监视哪个属性 监视的回调中用到哪个属性 那就监视哪个属性

<br>

### watchEffect有点像computed  
- 但computed注重的计算出来的值(回调函数的返回值) 所以必须要写返回值  
- 而watchEffect更注重的是过程(回调函数的函数体) 所以不用写返回值

<br>

### watchEffect的注意点
```js
const speed = ref(1)
const url = ref('')
const videoRef = ref()

watchEffect(async () => {
  url.value = await fetchVideoUrl()
  videoRef.value.playbackRate = speed.value
})
```

上面是一段有问题的代码, 我们发现视频的速率(speed.value)是调整不了的 视频没有变化

<br>

**修改方式1:**   
修改成下面的样式就好了
 ```js
const speed = ref(1)
const url = ref('')
const videoRef = ref()

// 获取视频的地址不需要反复的执行 拿出来就好了
;(asunc () => {
  url.value = await fetchVideoUrl()
})();

watchEffect(async () => {
  videoRef.value.playbackRate = speed.value
})
```

<br>

**原因: watchEffect收集依赖的方式**   
vue在运行一个函数的时候 会进行依赖收集 它会看这个函数在运行的过程中 会用到哪些响应式的数据 将来这些响应式数据发生变化后 **这个函数会重新执行**

但是它在收集依赖的时候 它只会收集这个函数在同步代码中遇到的依赖
```js
watchEffect(async () => {
  url.value = await fetchVideoUrl()
  videoRef.value.playbackRate = speed.value
})
```

上面代码中 同步代码是下面这一块, await后面的代码就是异步代码 会被推到微任务队列中执行 所以同步代码就是下面这一块
```js
fetchVideoUrl()
```

那也就意味着依赖只收集到这里(``fetchVideoUrl()``)就结束了, 而fetchVideoUrl()这里没有依赖任何东西

所以 url.value 和 speed.value 的依赖都没有收集到 所以将来 speed 数据发现变化的时候 watchEffect **回调并没有重新执行**

<br>

**修改方式2: 如果将来我们一定要在watchEffect中使用异步**  
那么我们一定要在异步之前 让它进行依赖收集, 比如我们要收集speed
```js
watchEffect(async () => {
  // 读一下就可以 让watchEffect收集依赖
  speed.value
  url.value = await fetchVideoUrl()
  videoRef.value.playbackRate = speed.value
})
```

<br><br>

# Vue3的生命周期
beforeUnmount unmounted 最后两个生命周期换了下名字 剩下的并没有太多的改变
- beforeDestroy 改名为 beforeUnmount
- destrory 改名为 unmounted


给目标添加 v-if 后 当不满足条件的时候 该组件会直接被卸载掉

<br>

### 要点:
生命周期的写法 可以还像vue2中 写配置项的形式使用生命周期, 也可以利用组合api的形式将生命周期写在setup中

<br>

### 使用组合api的形式 使用生命周期 函数
vue3也提供了composition Api形式的生命周期钩子 与vue2中钩子对应关系如下

- beforeCreate  -- setup()    -- setup比beforeCreate还要早
- created       -- setup()

- beforeMount   -- onBeforeMount
- mounted       -- onMounted
- beforeUpdate  -- onBeforeUpdate
- updated       -- onUpdated
- beforeUnmount -- onBeforeUnmount
- unmounted     -- onUnmounted

<br>

其中 beforeCreate 和 created vue3中并没有给我们提供组合式的api  

vue3认为setup就相当于 beforeCreate 和 created 所以 这两个生命周期函数 不能放在setup里面 而其他的生命周期函数 要想使用组合式api的方式去写 前面要加上 on

既然是组合式的api 那我们就要先引入

<br>

### 引入 生命周期函数 都是on开头的
```js
import {
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated, 
  onBeforeUnmount, 
  onUnmounted
} from "vue"
```

<br>

### 生命周期:  
我们**引入的都是函数** 它们都可以**传递一个回调当做参数** 在对应的时机会调用回调

```js 
onBeforeMount(() => { })

setup() {
  let sum = ref(0)

  // 相当于调用这个函数 在实参里面传递回调
  onMounted(() => {
    console.log("onMounted")
  })

  return {
    
  }
},
```

<br>

### 注意: 生命周期不要放入任务队列中
当调用 onMounted 时, Vue 会自动将注册的回调函数与当前活动组件实例相关联 这就要求这些钩子在组件设置时同步注册 例如请不要这样做: 
```js
setTimeout(() => {
  onMounted(() => {
    // 这将不会正常工作
  })
}, 100)
```

请注意, 这并不意味着对 onMounted 的调用必须放在 setup() 或 ``<script setup>`` 内的词法环境下 onMounted() 也可以在一个外部函数中调用, 只要调用栈是同步的, 且最终起源自 setup() 


<br><br>

# 事件对象

## 事件对象的类型
比如下面的代码, event没有类型标注时, 这个 event 参数会隐式地标注为 **any 类型**
```js
function handleChange(event) {
  // `event` 隐式地标注为 `any` 类型
  console.log(event.target.value)
}
```

<br>

如果我们在 tsconfig.json 中配置了 如下的参数的时候 Ts就会报错
```s
"strict": true
"noImplicitAny": true
```

<br>

在处理原生 DOM 事件时, 应该给事件处理函数的参数正确地标注类型  
因此, 建议显式地为事件处理函数的参数标注类型此外, 你可能需要显式地强制转换 event 上的属性
```js
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}

const handler = (e: MouseEvent): void => {
  console.log('handler', (e.target as HTMLButtonElement).innerHTML)
}
```

<br><br>

# 自定义hook函数
什么是hook 本质是一个函数 它把setup函数中使用的composition api进行了封装 类似vue2中的mixin

自定义hook的优势: 复用代码 让setup中的逻辑更清楚易懂

<br>

### 案例:
点击屏幕打印x y的坐标

<br>

### 思路:  
我们等组件挂载完毕的时候 给window绑定点击事件 获取到鼠标的坐标 赋值给数据
```js 
setup() {
  let point = reactive({
    x: 0,
    y: 0
  })

  function savePoint(e) {
    point.x = e.pageX
    point.y = e.pageY
  }

  // 当组件挂载完毕后 我们给window绑定点击事件
  onMounted(() => {
    window.addEventListener("click", savePoint)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("click", savePoint)
  })

  return {
    point
  }
},
```

当setup中的逻辑越来越多的时候 我们很容易造成 不知道哪些逻辑是哪个功能 比如我们上面创建的功能 当别的组件想复用的时候 难道要复制粘贴么？

在这种情况下 我们就可以使用hook

<br>

### Hooks的使用场景:
**复杂逻辑的组件：**  
当你的组件逻辑变得非常复杂, 包含大量的状态、计算属性、副作用等时, 使用 Composition API 可以更好地组织和管理这些逻辑。

<br>

**逻辑复用：**  
当你希望在多个组件之间共享逻辑时, 可以将这部分逻辑提取为一个或多个 Composition API 函数, 并在需要的组件中使用它们。

<br>

**可测试性：**  
Composition API 提供了更模块化的方式来编写逻辑, 这使得你可以更容易地编写单元测试, 以验证逻辑的正确性。

<br>

**逻辑组织和可读性：**  
在大型应用中, 使用 Composition API 可以使得代码更加结构化, 提高代码的可读性和维护性。通过将相关逻辑分组到不同的函数中, 你可以更容易地理清组件的功能和责任。

<br>

**混入（Mixins）替代：**  
Composition API 可以替代 Vue 2 中的混入功能, 提供了更强大、更灵活的代码组织方式。

<br>

**逻辑解耦：**  
使用 Composition API 可以将组件中的不同逻辑解耦, 使得每个函数专注于特定的功能, 提高代码的模块化程度。

<br><br>

## Hook的使用方式:
主要的作用就是将公共的逻辑代码抽离出来 封装

<br>

## Hooks的开源库: vueuse
这个库非常的强大 有非常多的功能
```s
vueuse.org/core/useclipboard/
```

<br>

### 安装:  
```s
npm i @vueuse/core
```

<br>

### 引入:  
```js
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'
```

<br>

### **<font color="#C2185B">useLocalStorage(key, defaultValue):</font>**  
useLocalStorage 是用于在 localStorage 中存储和获取数据的 hook。

<br>

**参数:**  
1. key: 存储在 localStorage 中的数据对应的key
2. defaultValue: 当 localStorage 中没有找到对应 key 的数据时, defaultValue会做为默认值

<br>

**返回值: RefImpl**  
- 当 localStorage 里面有 count 的时候, 则返回值就是 count对应的值
- 当 localStorage 里面没有 count 的时候
  - 会将defaultValue存储到 localStorage 中
  - 然后将 defaultValue 返回供我们使用

当我们直接操作返回值的时候, localStorage 中的数据也会同时更新

```js
const count = useLocalStorage('count', 0)
const handler = (e: MouseEvent): void => {
  count.value = 1
}
```

<br>

### **<font color="#C2185B">useLocalStorage(key, defaultValue):</font>**  
useLocalStorage 是用于在 localStorage 中存储和获取数据的 hook。

<br>

**参数:**  
1. key: 存储在 localStorage 中的数据对应的key
2. defaultValue: 当 localStorage 中没有找到对应 key 的数据时, defaultValue会做为默认值

<br>

**返回值: RefImpl**  
- 当 localStorage 里面有 count 的时候, 则返回值就是 count对应的值
- 当 localStorage 里面没有 count 的时候
  - 会将defaultValue存储到 localStorage 中
  - 然后将 defaultValue 返回供我们使用

当我们直接操作返回值的时候, localStorage 中的数据也会同时更新

```js
// 1. 设置: 相当于 localStorage.setItem('count', 0)
const count = useLocalStorage('count', 0)
const handler = (e: MouseEvent): void => {
  // 2. 修改参数
  count.value = 1

  // 3. 清除storage 即 localStorage.removeItem(key)
  count.value = null
}
```

<br>

### 其它的hooks
- useMouse: 提供了当前鼠标位置和鼠标状态（按下、释放等）的信息。
```js
import { useMouse } from '@vueuse/core';
const { x, y, buttons } = useMouse();
```

- usePreferredDark: 返回用户系统的首选暗黑模式设置

- useDebounce: 创建一个 debounce 函数, 用于处理输入框等需要防抖的场景。

- useThrottle: 创建一个 throttle 函数, 用于限制事件触发频率。

- useBreakpoint: 根据屏幕宽度自动判断当前的断点（例如手机、平板、桌面）。

- useWindowSize: 获取当前窗口的大小。(只是一次)
```js
const { width, height } = useWindowSize()
console.log(width.value, height.value)
```

- useWindowScroll: 监听窗口滚动距离, 从而实现吸顶效果
```js
import { useWindowScroll } from '@vueuse/core'
const { x, y } = useWindowScroll()
```

- useDeviceOrientation: 获取设备方向的信息。

- useEventListener: 监听 DOM 事件, 可以方便地在组件中使用。

- useIntersectionObserver: 监听元素与视口的交叉状态。
```js
const target = ref(null)
const targetIsVisible = ref(false)

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
  },
)
// target: 被监听的 DOM 元素
// fn: 回调函数, 用于通知监听的动作, 其中第一个参数 isIntersecting 表示被监听的元素已经进入可视区
// options: 配置选项
// stop 是停止观察是否进入或移出可视区域的行为
```

- useRefHistory: 跟踪对 ref 所做的每一步更改, 并将其存储在数组中, 从而实现撤销和重做功能。
```js

import { ref } from 'vue' 
import { useRefHistory } from '@vueuse/core'

const counter = ref(0)
const { history, undo, redo } = useRefHistory(counter)

counter.value += 1

await nextTick()
console.log(history.value)
```

- useResizeObserver: 
```js
const el = ref(null)
const text = ref('')

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentReact

  text.value = `width: ${width}, height: ${height}`
})
```

- useFetch: 
```js
import { useFetch } from '@vueuse/core'

const { isFetching, error, data, execute, abort, canAbort } = useFetch(url, {
  // 请求拦截
  async beforeFetch({ url, options, cancel }) {...},
  // 响应拦截
  afterFetch(ctx) {},
  // 拦截错误
  onFetchError(ctx) {},
  // 防止请求立即被触发
  immediate: false
})

// 终止请求
setTimeout(() => {
  canAbort.value && abort()
}, 1000)


// 在调用之前, 防止触发请求
execute()
```

- onClickOutside: 监听元素外部的点击事件

- useMutationObserver: 监听 DOM 变化。

- useBattery: 获取设备电池状态的信息。

- useClipboard: 复制文本到剪贴板。

- useOnline: 监听设备的在线状态。

- useTimeAgo: 将时间戳转换为类似于“1小时前”这样的格式。

- useFavicon: 动态修改网页的 favicon。

- useKeyPress: 监听键盘按键。

- useRafFn: 使用 requestAnimationFrame 创建一个函数, 可以用于实现平滑动画。

- useAsync: 简化异步操作的 hook, 包括 Promise 和函数。

- useFetch: 发送网络请求。

- useStorage: 在 localStorage 或 sessionStorage 中存储和获取数据的 hook。

useWorker: 简化 Web Worker 的使用。

<br><br>

## Vue预定义的hooks
用vue中引入, 所有的hook都是一个函数

<br>

### <font color="#C2185B">useAttrs()</font>  
接收父组件传递过来的所有所有属性

**返回值: 对象**   
里面有父组件传递的所有标签属性

```js
// 父组件
<A a="456" />


// 子组件使用hooks接收传递过来的所有属性
let attr = useAttrs()
console.log(attr)
// {a: "456"}
```

<br>

### <font color="#C2185B">useSlots:</font>  
获取插槽的

在 <script setup> 使用 slots 和 attrs 的情况应该是很稀少的, 因为可以在模板中通过 $slots 和 $attrs 来访问它们。在那些稀少的需要使用它们的场景中, 可以分别用 useSlots 和 useAttrs 两个辅助函数来使用
<br>

### <font color="#C2185B">useCssModule():</font>  
场景是写tsx的时候 可能会用到

**参数:**  
可选, 如果我们使用了 自定义名 那么我们就要传入自定义名 可以获取 类名对应的css属性

<br><br>

## 自定义的hooks
自定义hook 就是一个函数 我们定义一个函数并返回 

同时hooks文件中就相当于setup中写逻辑一样 使用什么引入什么就可以

<br>

### 1. 在src文件夹下 创建 hooks 文件夹 创建 useXxx.js 文件  
```
| - src
  | - hooks
    - useXxx.js
```

<br>

### 2. 在文件中创建一个函数 并暴露出去

**思路:**  
我们在usePoint文件中 写逻辑 最后将 **App组件需要的数据返回出去**

```js
// 在 hooks 文件中引入需要的 api
import {reactive, onBeforeUnmount, onMounted} from 'vue'

// 这里我们 return 一个函数 写逻辑 最后导出 鼠标坐标
export default function () {
  let point = reactive({
    x: 0,
    y: 0
  })

  function savePoint(e) {
    point.x = e.pageX
    point.y = e.pageY
  }

  // 当组件挂载完毕后 我们给window绑定点击事件
  onMounted(() => {
    window.addEventListener("click", savePoint)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("click", savePoint)
  })

  // 最后我们将要使用的数据 return 出去
  return {
    point
  }
}
```

<br>

### 3. 在App组件中我们引入这个js模块 接收 usePoint 返回出来的数据  
调用 我们创建的 hook 拿到的就是数据
```js 
import usePoint from "./hooks/usePoint"

setup() {
    
  // 该变量内部才是hooks里面定义的数据对象 需要.出来
  let dataWrap = usePoint()

  let handleClick = () => {
    console.log(dataWrap)    // 我们定义的point是一个对象 里面有point属性
    console.log(dataWrap.point);  // point属性本身也是一个对象
    console.log(dataWrap.point.x, point.point.y);
  }

  return {
    
  }
},
```

<br>

### 要点
1. 自定义hooks里面可以用组合式 api

2. 组件里的自定义hooks调用代码最好放在setup里第一行位置 这样比较明确 不容易被遗漏 

3. 导出的function只需要return组件里要引用的数据; 对于组件里不需要引用的就不需要return 组件里只调用导入的函数即可 

<br>

### 示例: 将图片转成base64
```js
// hooks文件
import {onMounted} from "vue"

type optionsType = {
  el:string
}

// 定义成promise的
export default function(options:optionsType):Promise<{baseURL:string}> {

  return new Promise(resolve => {
    onMounted(() => {

      let img:HTMLImageElment = document.querySelector(options.el) as HTMLImageElment
      
      // 文件加载成功后再传递到 toBase64 中
      img.onload = function() {
        resolve({
          baseURL: toBase64(img)
        })
      }
      
    })


    const toBase64 = (img:HTMLImageElment) => {
      // 利用 canvas 转 base64
      let canvas = document.createElement("canvas")
      let ctx = canvas.getContext("2d")

      canvas.width = img.width
      canvas.height = img.height

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

      // 该函数会导出base64 我们传入图片的类型
      return canvas.toDataURL("image/png")
    }
  })
  
}


// 主文件中引入
import { Directive, DirectiveBinding, nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';

import useBase64 from "./hooks/useBase64"

// 定义节点ref
let oImg = ref<HTMLImageElement | null>(null);

let imgSrc = ref<string>("")

// 将hooks拿到的值 赋值给组件内部的一个值imgSrc
useBase64("#img").then(res => {
  imgSrc.value = res.base64Url
})

// 事件回调中做了这样的处理
const show = () => {
  // 这里我们要 断空
  oImg.value!.src = imgSrc.value
}
```

<br>

### 在使用 hooks 的时候的注意点:
上面示例的逻辑是 点击按钮后 将base64的url赋值给节点

注意我们hooks中使用了 onMounted 然后返回一个promse, 既然有promise那我们很自然的就能写出 async await 的代码

```js
const show = async () => {
  // 我们会在事件回调里面 使用 async await 拿到 hooks 中的数据
  let {base64Url} = await useBase64("#img")
}
```

<br>

但是报错了如下:

```s
onMounted is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.
```

<br>

**意思是:**  
大概意思就是, onMounted 被调用时, 当前并没有活跃状态的组件实例去处理生命周期钩子的注入生命周期钩子的注入只能在 setup 同步执行期间进行

如果我们想要在 async 形态的异步 setup 中注入生命周期钩子, **必须确保在第一个 await 之前进行** 也就是将onMounted放在第一个await之前

<br>

### 总结:  
- 要么 使用 hooks 的时候直接 return 一个结果 外面这样可以创建变量直接接收

- 如果 hooks里面使用了 promise 和 生命周期 那我们只能像上面的例子 那样将promise返回的数据存入到一个变量中 然后使用这个变量
```js
// 我们使用 imgSrc
useBase64("#img").then(res => {
  imgSrc.value = res.base64Url
})
```

<br><br>

# toRef函数
ref函数前面学过是专门定义一个响应式的数据的 可以接收 基本数据类型 和 对象类型

<br>

### **<font color='#C2185B'>toRef(目标对象, "对象中的属性名")</font>**  
响应式的取出响应式对象中的一条条属性 便于模板中直接使用 ``{{ 属性名 }}``

```js
// 注意属性名要加引号
const name = toRef(person, 'name')    
```

<br>

### 要点:
1. 要是取对象中多个属性 那就多次调用 toRef()
2. 取出的属性  
  - 模板: 直接使用
  - 脚本: .value

3. 该方式只适用于响应式的取对象中的某几条数据

<br>

### 需求:
下面的模板中 我们使用数据的时候 都是通过 person.name 的方式 那能不能再精简一些 也就是说 我想在模板中直接使用 name age salary
```js 
<h3>姓名: {{person.name}}</h3>
<h3>性别: {{person.age}}</h3>
<h3>薪资: {{person.job.j1.salary}}</h3>

setup() {
  
  let person = reactive({
    name: "erin", 
    age: 18,
    job: { 
      j1: { salary: 20 } }
  })

  return { person }
},
```

<br>

那我们能不能这么写? 取出响应式对象中的一条属性交给一个变量并暴露出去
```js
return {
  name: person.name
  age: person.age
  salary: person.job.j1.salary
}
```

<br>

不行 本意我们是希望将 person中的一条数据 交出去 但是 我们这么交出去的数据 只是简单的基本数据类型的赋值 

相当于 let a = 1 b = a 他们之间并没有引用关系 不是深拷贝 <font color="#C2185C">不是深拷贝的话改变页面上的数据 不会有响应式的变化</font>


### 那怎么办？ 
我还想在模板中将代码精简一些 也就是说 我想将 响应式对象person中的一条数据交出去 并且还是响应式的

<br>

### 解决方式: 
使用 ``toRef()``

它的功能就是将不是ref函数定义成响应式的东西转换为是响应式定义的东西  

它会创建一个ref对象 其value值指向另一个对象中的某个属性

<br>

### 语法: 
```js
const name = toRef(person, 'name')
```

<br>

### 应用:   
要将响应式对象中的某个属性单独提供给外部使用时 这个属性还不想丢失响应式

```js  
let name = toRef(person, "name")

console.log(name)
// ObjectRefImpl {_object: Proxy, _key: 'name', __v_isRef: true}
```

<br>

这个name被包装成了一个refimpl对象 我们要使用的话 <font color="#C2185C">得.value来获取值</font>  

当我们读取这个name的时候 它就会去person中读取name属性 像getter

也就是说像上面那样操作 name: person.name 这种形式不是响应式的 但是我们使用toRef就是响应式的

<br>

那接下来 我们是不是可以这么操作
```js 
<h3>姓名: {{name}}</h3>
<h3>性别: {{age}}</h3>
<h3>薪资: {{salary}}k</h3>

setup() {
  
  let person = reactive({
    name: "erin",
    age: 18,
    job: {
      j1: {
        salary: 20
      }
    }
  })

  let name = toRef(person, "name")
  let age = toRef(person, 'age')
  let salary = toRef(person.job.j1, "salary")

  return {
    name,
    age,
    salary
  }
},
```

<br>

我们使用 toRef 交出去的可以是**常用的对象中的某些属性** 

比如这个对象中有800个属性 那我是不是可以将这3个使用 toRef 的形式交出去 剩下的还是将整个对象交出去呢
```js 
let name = toRef(person, "name")
let age = toRef(person, 'age')
let salary = toRef(person.job.j1, "salary")

return {
  person,
  name,
  age,
  salary
}
```

<br>

### 区别: 
假如我们使用的是 ``ref函数`` 包裹了person的一个数据的时候 **这个name就和person中的name没有关系了** 是两个对象 所以改变 name 并不会影响到 person.name

```js 
return {
  person,
  name: ref(person.name)
}
```

但是如果我们使用的是 ``toRef函数`` 包裹的话 他们之间是存在引用关系的 它会去person.name中找

<br>

### 也就是说上面的使用方式:
- toRef 是引用一个对象中的属性    
- ref   是复制一个对象中的属性 成为一个新对象

<br>

### 使用场景:  
将响应式对象中的值取出来赋值给实参
```js
useDemo(toRef(man, "name"))
```

<br>

## toRefs(obj)
toRefs 与 toRef 功能一致 但可以批量创建多个ref对象  

它不用传递第二个参数 直接将对象传递进去 **该对象中的第一层属性都会变成toRef的形式** 比如对象中嵌套对象的时候

<br>

### 要点:  
1. 和toRef()的功能一样 但是可以批量创建多个ref对象 不用传递第二个参数 直接将对象传递进去 该对象中的**第一层属性**都会变成toRef的形式

2. toRefs()返回的是一个对象, 对象中的值为toRef形式的对象第一层属性

<br>

### 语法:  
```js
toRefs(person)
```

使用 toRefs 将目标对象中的所有属性都变成了 refimpl对象 

这样 该对象的所有属性交出去后 都是响应式的 因为在读取交出去的属性的时候 会像getter那样去元数据中读取和修改  

注意该方法只会把person对象的第一层转换为refimpl对象 嵌套深层次的不会管的 需要通过.来读取

<br>

### 使用场景:  
适用于解构取值

```js 
<h3>姓名: {{name}}</h3>
<h3>性别: {{age}}</h3>
<h3>薪资: {{job.j1.salary}}k</h3>


let x = toRefs(person)
console.log(x)

// 还可以进行结构
let {name, age, job} = toRefs(person)

return {
  ...x
}
```

<br>

### setup中的toRefs解构演示
```js
const data = reactive({
  msg: "hello",
  job: {
    front: "vue"
  }
})

// 使用 toRefs解构 data 中的数据
let {msg, job} = toRefs(data)


// 在button的回调中要使用解构出来的数据的时候 要.value
const changeData = () => {
  msg.value = "hello -> hi"
  job.value.front = "vue -> react"
}
```

<br><br>

## toRefs源码:
很简单
```ts
// <T extends object> 相当于约束下泛型的类型只能是object
const toRefs = <T extends object>(obj: T) => {
  const map:any = {}

  for(let key in obj) {
    // 让每一个属性都调用一下 toRef
    map[key] = toRef(obj, key)
  }

  return map
}
```

<br>

### toRefs技巧:
```js
// hooks
function useFeatureX() {
  const state = reactive({
    x: 1,
    y; 2
  })

  // 逻辑运行状态 省略 n 行

  // 返回时转换为ref
  return toRefs(state)
}


// 页面中使用
setup() {
  const {x, y} = useFeatureX()

  return {
    x, y
  }
}
```

<br><br>

## shallowReactive 与 shallowRef
既然是组合api 那我们在使用的时候也需要先引入 外层数据的响应式

<br>

## shallowReactive()
跟我们使用 reactive 的目的一样, 都是为了创建一个响应式的对象, 但是当我们的数据结构为嵌套的时候, 它只处理对象最外层属性的响应式 (浅响应式)  

<br>

### 下面的案例中 使用 ``shallowReactive`` 的结果就是:   
name age job是响应式的 但是job里面的j1 和 salary 不是响应式的  

shallowReactive只考虑对象类型里面的第一层 其它的不做考虑

```js
import {shallowReactive} from 'vue'
let person = shallowReactive({
  name: "erin",
  age: 18,
  job: {
    j1: {
      salary: 20
    }
  }
})
```

<br><br>

## shallowRef()
只处理基本数据类型的响应式 不进行对象的响应式处理   

当传入 基本数据类型的时候 Ref 和 shallowRef 没有任何区别
```js 
let x = ref(0)   == let x = shallowRef(0)

let x = ref({})  != let x = shallowRef({})
```

<br>

### 它们的应用场景:
如果有一个对象数据 结构比较深 但变化时只是外层属性变化 那我们就用 shallowReactive  

如果一个对象数据 后续功能不会修改该对象中的属性 而是生新的对象来替换 那我们就用shallowRef

<br>

### 注意:  
ref()定义的数据 和 shallowRef() 定义的数据 不能在一个逻辑里面做修改操作

我们知道 shallowRef() 对深层次的数据不会做响应式处理 但是 如果他们两个一起使用 会造成 shallowRef() 的数据一起更新
```js
const Man = ref({name: "小满"})
const Man2 = shallowRef({name: "小满2"})

const change = () => {
  Man.value.name = "我是ref"

  Man2.value.name = "我是shallowRef 我被影响了"
}
```

<br><br>

# triggerRef()
triggerRef 是一个用于手动触发 ref 响应式对象更新的函数。它的主要用途是在某些异步操作完成后, 手动通知 Vue 更新相应的响应式数据。

triggerRef 接受一个 ref 对象作为参数, 当调用 triggerRef(refObject) 时, Vue 会将该 ref 对象标记为 dirty, 意味着它需要在下一个渲染周期中重新计算, 并触发相关的依赖更新。

它会将我们传递进入的数据 进行强制性的更新
```js
import { ref, triggerRef } from 'vue';

const count = ref(0);

function asyncOperation() {
  setTimeout(() => {
    // 模拟异步操作完成
    count.value += 1;

    // 手动触发 count 的更新
    triggerRef(count);
  }, 1000);
}

// 在某个函数或事件中调用 asyncOperation
asyncOperation();
```

<br><br>

# readonly() 与 shallowReadonly()  --  只读
组合式api记得要先引入哦 

<br>

## 作用:
这两个api的意义就是给我一个数据 **我让它变成只读的**   
它可以对reactive 和 ref 函数生成的响应式数据 进行加工 变成只读 不可以修改

<br>

### 场景:   
当我们如下定义数据的时候 都是响应式的

但有些时候 我不希望你修改 sum 和 person 这个时候我们就可以借助 readonly 了
```js
let sum = ref(0)
let person = shallowReactive({
  name: "erin",
  age: 18,
  job: {
    j1: {
      salary: 20
    }
  }
})
```

<br><br>

## readonly():
使用它包裹的数据, 返回的就是一个只读的对象

<br>

### 注意:  
它会受原始对象的影响 readonly定义的只读数据会发生改变
```js
// obj是原始数据
let obj = reactive({name: "sam"})

// 创建只读数据
let read = readonly(obj)

// 事件回调中 给原始obj.name重新赋值 read里面也会发生改变
const show = () => {
  obj.name = "erin"
  console.log(read.name)  // 也变了
}
```

<br>

### 应用场景: 
不希望数据被修改时 比如 上面person这个响应式的数据 不是我们组件自己定义的   

也就是说 小刘你用这个数据行 但是你别改 你改了之后我这边受影响 那我们就可以收到这份数据的时候 给它变成只读的

<br>

### <font color="#C2185B">person = readonly(person)</font>   
这样person对象就变成只读的了  

readonly是一个函数 它接收一个响应式的数据 readonly拿到这个响应式的数据 进行加工后 返回一个新的person

这个返回的新person里面的所有东西都不允许被修改
```js 
let person = shallowReactive({
  name: "erin",
  age: 18,
  job: {
    j1: {
      salary: 20
    }
  }
})

person = readonly(person)
```

<br>

### shallowReadonly 用法和上面的 readonly 一样 但是它只考虑第一层数据
### **<font color='#C2185B'>shallowReadonly()</font>**
让一个响应式数据变为只读的(浅只读)

也就是说 当对象类型的数据 嵌套的层次很深的时候 2层以下的还是可以修改的
```js 
let person = shallowReactive({
  name: "erin",
  age: 18,
  job: {
    j1: {
      salary: 20
    }
  }
})

// 这时候job里面的j1 和 salary 还是能改的
person = shallowReadonly(person)
```

<br><br>

# toRaw 与 markRaw  响应式数据 -> 普通数据
组合式的api 你懂的要先干什么

<br>

### 思考: 
我们为什么要将数据使用ref reactive是为了将普通的数据变成响应式的数据

但是有些情况下 我们是需要将 响应式的数据 变回普通数据的 我们要实现这一点就需要用到 toRaw 函数

<br>

### **<font color="#C2185B">toRaw()</font>**  
将一个由 reactive生成的响应式对象 转为 普通对象

<br>

### 注意:   
**它只能处理reactive生成的响应式对象** ref函数生成的不可以

<br>

### 使用场景:  
用于读取响应式对象对应的普通对象 对这个普通对象的所有操作 不会引起页面的更新  

比如 ajax的时候 传递数据之前对数据进行处理 用 toRaw

```js 
let person = reactive({
  name: "erin",
  age: 18,
  job: {
    j1: {
      salary: 20
    }
  }
})
```

我们将响应式的 person 变回普通对象  

<br>

### 需求:  
点击按钮后输出 原始的person

```js
function showRawPeson() {
  // 我们定义一个中转变量p 用来接收 toRaw的结果
  const p = toRaw(person)
  console.log(p)    // 这个p就是普通对象了
}
```

<br>

### 总结:   
- reactive像是将原始对象制作成响应式的对象  
- toRaw像是还原 就响应式的对象 还原成 普通对象

<br><br>

## markRaw()
标记一个对象 **使其用于不会再成为响应式对象** 里面的属性都不再是响应式了 

<br>

### 应用场景:  
有些值不应该被设置为响应式的 例如: 复杂的第三方类库等
```js 
  let person = reactive({
    name: "张三",
    axios
  })
```

<br>

比如我们想往person里面添加 axios 但是如果这么添加进去 vue会将axios里面的所有数据不管嵌套多深 都会变成响应式的 这样效率会很低

当渲染具有不可变数据源的大列表时 跳过响应式转换可以提供性能
```js 
let car = {name:"奔驰", price: 40}
person.car = car

/*
  上面的操作 也是响应式的 因为 person是经过 reactive 包装过的 proxy 会监测数据里面的变化 从而做到响应式的处理
  但有的时候 我不希望 car 也是响应式的 car只负责展示就可以了 那这时候我们就可以使用 markRaw()
*/

person.car = markRaw(car)
// 这样添加进去的数据就不是响应式的了 也就是数据还是能该 但是vue不对它做响应式了
```

这个方法的应用场景会很多 比如第三方的库 比如很大的数据结构 他们仅仅是用来展示的 不需要做响应式 这时候我们就先将数据先markRaw一下

<br><br>

# customRef() -- 场景: 防抖

### 语法:
```js
customRef((track, trigger) => {
  return {
    get() {

    },
    set(val) {

    }
  }
})
```

上面就是customRef的语法结构, customRef中需要传入一个回调, 内容需要返回一个具有getter setter的对象  

- track(): 收集依赖 看谁在用我这个数据, **直接调用即可**  
在get中使用 用于通知vue追踪其返回值的变化 当模板中调用或者被修改后 进行对该值的追踪  

- trigger(): 派发更新, 通知那些使用数据的人 我变了 你们该重新运行了, **直接调用即可**  
用于set中最后调用 通知vue重新解析模板

<br>

### 作用:  
创建一个自定义的ref 并对其依赖项跟踪 和 更新触发进行显式控制 自定义ref是一个函数

<br>

### 案例:  
页面上有一个input 和 一个呈现数据用的h3 我们在input中输入文字然后1秒钟在h3中做呈现

customRef 和 ref的区别 ref相当于精装房 customRef属于毛坯房  
ref里面有vue配齐了的东西 customRef里面需要我们自己去进行加工

<br>

### 使用方式:

### 引入 
```js 
import {customRef} from 'vue'
```

<br>

**1. 创建具有防抖功能的 myRef 函数**  
myRef的使用方式, 和 ref 一样, 都需要传入一个初始化的值
```js 
setup() {
  function myRef(value) {

  }
}
```

<br>

**2. 调用我们自定义的函数 并传入实参 定义变量接收返回值:  **
```js 
let keyword = myRef("hello")
// 我们把数据传入了 我们自定义的函数 myRef 
```

<br>

**3. 我们自定义的函数内部 使用 customRef() Api**  

<br>

### 逻辑:  
在初始化阶段 模板中读取的是get函数的返回值  

在更新后阶段 先是将set函数中修改后的数据 赋值给我们传入myRef的value

然后在set中调用trigger() 告诉vue解析模板 然后再在get函数中调用track()让其追踪最新值的变化
```js 
setup(props, context) {

  const myRef = (value) => {

    let timer;

    // 它会返回一个自定义的ref
    let x = customRef((track, trigger) => {
      return {

        // 有人读取 myRef 中的数据的时候 get会调用
        get() {
          console.log("有人从myRef中读取数据了 我把"+value+"给它了")

          // 追踪下keyword的改变 通知vue追踪数据的变化
          track()
          return value  // 3
        },

        // 有人修改 myRef 中的数据的时候 set会调用
        set(newValue) {
          clearTimeout(timer)
          console.log("有人从myRef中修改数据了 我把"+value+"修改了")
          value = newValue    // 1

          // 通知vue重新解析模板 // 2
          // trigger()

          timer = setTimeout(() => {
            trigger()
          }, 1000)
        }
      } 
    })

    // 将我们忙活完的x暴露出去
    return x
  }
```

上面是防抖操作 等我们输入完了之后 然后再显示在h3中  
跟计算属性很像 读东西找get 改东西找set 但是就是在关键的时候 调用一些特殊的东西

同时我们要在开启一个新的定时器前 关闭上一个定时器

<br><br>

# Ts: customRef()
```js
import {customRef} from "vue"

// 它支持泛型
function MyRef<T>(value: T) {

  return customeRef((track, trigger) => {
    
    return {
      get() {
        // 它是用来收集value的依赖的
        track()
        return value
      },
      set(n) {
        value = n
        // 触发依赖做更新
        trigger()
      }
    }
  })
}

const obj = Myref<string>("hello")
```

<br><br>

# provide 与 inject
组合式api 要先引入

他们是一种组件间的通信方式 特别适用于 祖孙组件之间通信 祖孙组件也叫做跨级组件 中间隔了一个父

- provide: 提供数据
- inject: 注入数据

<br>

它们是通过原型链的方式实现的, 我们在根组件一次注入参数 所有的根节点都可以拿到该数据

<br>

```
      父            ←  provide
  
  子   子   子

孙  孙  孙  孙  孙   →  inject
```

通过 provide 将数据给祖组件 通过 inject 从孙组件里面得到数据  

<br>

### 注意:   
父使用provide传递的数据 在后代组件中都可以使用inject接收到 包括 子和孙

<br>

### 套路:   
祖组件有一个provide选项来提供数据 后代组件有一个inject选项来开始使用这些数据

接下来 我们准备了3个组件 app child son 一个套一个 我们要在app组件中的数据 传递给son组件

<br>

### 使用方式:
```js
import {provide, inject} from "vue"
```

<br>

### <font color="#C2185B">provide('给传递的数据起个变量名字', 真正的数据)</font>  
写在setup函数中
```js 
// app组件
setup() {
  let car = reactive({
    name: "奔驰",
    price: "40w"
  })

  // 给自己的后代组件传递数据
  provide('car', car)

  return {
    ...toRefs(car)
  }
},


// Ts:
let car = ref<string>("Benz")
provide("car", car)
```

<br>

### <font color="#C2185B">inject("父组件中的数据变量名")</font>
写在setup函数中  

inject还可以接收第二个参数 代表默认值
```js
const color = inject<Ref<string>>("color", ref("red"))
```

<br>

我们创建一个变量用来接收数据  同时 这个数据还是响应式的  也就是 **provide 传递过来的数据是响应式的 子组件修改后 会影响到父组件**
```js 
import {inject} from 'vue'
export default {
  name: "Son",
  setup() {
    // 我们拿到的是响应式数据
    let car = inject("car")
    
    return {
      car
    }
  }
}


// Ts: ts中接受到的car是 unknown 类型 这里我们需要引入 Ref接口 如下操作 这样根据接口就能推断出car的类型是什么
import type {Ref} from "vue"
let car = inject<Ref<string>>("car")
```

<br>

### 将 provide 提供的数据变为只读
上面说了 provide 传递的数据是响应式的可以被修改 如果不希望子组件对其进行修改 可以使用 readyonly

```js
// 这样之后子组件就没有办法修改 colorVal 了
provide("color", readyonly(colorVal))
```

<br><br>

## Ts: 为 provide / inject 标注类型
provide 和 inject 通常会在不同的组件中运行要正确地为注入的值标记类型, Vue 提供了一个 InjectionKey 接口, 它是一个继承自 Symbol 的泛型类型, 可以用来在提供者和消费者之间同步注入值的类型：
```js
import { provide, inject } from 'vue'

// 引入接口
import type { InjectionKey } from 'vue'

// 设置 provide中key对应的值的类型 
const key = Symbol() as InjectionKey<string>


provide(key, 'foo') // 若提供的是非字符串值会导致错误
const foo = inject(key) // foo 的类型：string | undefined
```

建议将注入 key 的类型放在一个单独的文件中, 这样它就可以被多个组件导入  

当使用字符串注入 key 时, 注入值的类型是 unknown, 需要通过泛型参数显式声明：
```js
const foo = inject<string>('key') // 类型：string | undefined
```

注意注入的值仍然可以是 undefined, 因为无法保证提供者一定会在运行时 provide 这个值当提供了一个默认值后, 这个 undefined 类型就可以被移除：
```js
const foo = inject<string>('foo', 'bar') // 类型：string
```

如果你确定该值将始终被提供, 则还可以强制转换该值：
```js
const foo = inject('foo') as string
```

<br><br>

# keep-alive组件
基本用法和vue2中一样 我们关注下 使用该组件后产生的生命周期在vue3中是如何体现的

```js
onActivated(() => { ... })
onDeactivated(() => { ... })
```

<br>

### 注意:  
当我们开启了 keep-alive 组件之后 它组件就不会再走 onUnmounted() 周期了

所以当开启了 keep-alive 了之后 有关一次性的操作可以写在 onMounted() 里面, onMounted只会走一次 因为组件被缓存了

有关卸载的逻辑要卸载 onDeactivated() 里面

<br><br>

# 对响应式数据进行判断的api
组合式api

<br>

## isRef(目标)
检查一个值是否为一个ref对象

<br>

## isReactive(目标)
检查一个对象是否是由 reactive 创建的响应式代理

<br>

## isReadonly(目标)
检查一个对象是否是由readonly创建的只读代理

<br>

## isProxy(目标)
检查一个对象是否是由reactive 或者 readonly 方法创建的代理  
readonly加工后的对象仍然是proxy类型的数据

<br><br>

# 组合式api的优势

## options api 存在的问题  
使用传统optionsapi中 新增或者修改一个需求 就需要分别在data methods computed里修改  

也就是说 在vue2中我们要实现一个功能 那么就需要在各种配置项里面写逻辑 一个功能的实现被打散了 当功能越来越多的时候 我们要修改一个需求那么还是要在各种配置项里面修改 找来找去特别的乱

<br>

## composition api 的优势
在组合式api里面我们可以组织我们的代码 函数 让相关功能的代码更加有序的组织在一起  

还可以用hook来配合操作 想是一块块的 也就是说 要让组合式api发挥威力 必须要借助hook函数

<br><br>

# Fragment组件
在vue2中 组件必须有一个根标签   

在vue3中 组件可以没有根标签 内部会将多个标签包含在一个Fragment虚拟元素中 最后Frament是不参与渲染的

好处: 减少标签层级 减小内存占用   

<br><br>

# Teleprot组件: 传送门 
什么是Teleport 它是一种能够将我们的组件html结构移动到指定DOM节点位置的技术

我们先看一个场景 还是 app - child - son 层层嵌套的组件结构  

我们在son组件需要一个对话框组件 对话框组件的内容简单的是 点击打开弹窗 点击关闭弹窗
```js
import {ref} from 'vue'
export default {
  name: 'Dialog',
  setup() {
    let isShow = ref(false)

    return {
      isShow
    }
  }
}
```

但是有个问题 随着弹窗的打开和关闭 整个son组件的高度会产生变化 比如打开弹窗后页面会被撑开太高 点击关闭son组件的高度又回到原来的状态 用户体验不好  

不仅如此 这个弹窗在son组件里面的一个对话框组件 一般我们使用对话框组件都希望移动对话框的位置到屏幕中间 然后周围加一些遮罩的效果 但是处于现在的这种状态 想要调整对话框的位置特别的费劲

定位不可以么？ 不行 因为我们是根据父元素定位 app - child - son - dialog 其中任何一个元素变动它们也有定位的元素都有可能影响到 dialog的位置  

这时候我们就可以使用这个 Teleprot 组件 把这个对话框 传送走 使用这个组件我们可以让 对话框 想让它去哪就去哪

<br>

## ``<teleport to="body">``目标结构``</teleport>``
我们可以使用这个组件 将要 传送的目标结构 用这个标签进行包裹  

然后使用 to 属性 移动到 想要的结构标签中 比如html 比如body

<br>

### 标签属性: to  
to: 接收各种选择器

<br>

### 标签属性: :disabled
:disabled接收boolean 如果我们设置为true to属性则不会起作用

我们可以通过这个属性来决定要不要将结构送走

```html
<template>
  <div>
    <button @click='isShow = true'>click me</button>

    <teleport to="body">

      <!-- 这个结构会直接出现在body里面 也就是 div#app 的同级 -->
      <div v-if="isShow" class="dialong">
        <h3>我是一个弹窗</h3>
        <button @click='isShow = false'>close me</button>
      </div>

    </teleport>

  </div>
</template>
```

上面那样操作可以将结构传递到body下面 这样还有一个好处就是定位的时候 可以直接参考body去定位了 不会受其他的组件结构的影响

<br><br>

## 遮罩层的逻辑
1. 给对话框组件的外层加一个div当做遮罩层
2. 将对话框的结构放在遮罩div的里面
3. 遮罩层的div上v-if

```html
<template>
  <div>
    <button @click='isShow = true'>click me</button>
    <teleport to="body">
      
      <!-- 
        遮罩层的div 因为弹窗在遮罩层的里面 弹窗弹出来的时候再遮罩 遮罩层一出来 对话框自然就出来了 
      -->
      <div v-if="isShow" class="mask">
        <div class="dialong">
          <h3>我是一个弹窗</h3>
          <button @click='isShow = false'>close me</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style>
.mask {
  position: absolute;
  top:0; bottom:0; left: 0;  right: 0;
  background-color: rgba(0,0,0,.4);
}
.dialong {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height:120px;
  background-color: pink;
  padding:10px;
}
</style>
```

<br><br>

# 异步组件 & Suspense组件

## 什么是异步组件:   
等待异步组件时渲染一些额外的内容 让应用有更好的用户体验 该api处于试验阶段 以后的相关api还可能会改

<br>

## defineAsyncComponent的使用方式:
```js
import {defineAsyncComponent} from 'vue'
```

<br>

### 静态引入:
这种方式是我们经常用的一种方式 它的效果就是 组件一起出来 一个不出来剩下的也别想出来
```js
import Child from "./components/child.vue"
```

<br>

### 动态引入:
定义一个异步组件 动态引入一个组件, 这种方式就是异步引入组件谁先加载完谁先出来
```js
const Child = defineAsyncComponent(() => import("./components/child.vue"))
```

<br>

### 渲染流程:
使用静态引入 只要组件没有引入成功 我整个app组件都不进行渲染 要等待目标组件引入完成 **整个应用什么时候展示出来取决于最慢的那个组件**

使用动态引入就不会出现上述的问题 但是也有一个问题  
就是app组件先回来会先展示 但是用户还以为页面里面没有东西呢

为了解决这个问题 满足用户的体验 我们就可以使用这个 Suspense 组件  

弹幕上也有人说 可以是用 loading 或者 骨架屏

<br>

## ``<Suspense>``包裹异步方式引入的组件``</Suspense>``
上面的异步组件需要配合 ``<Suspense>`` 来使用

这个组件的实现方式 本身也是利用了 插槽 来实现的
suspense里面准备了两个插槽 一个用于放置我们异步引入的组件 一个插槽放置当异步组件还没有回来的时候展示的内容

也就是说 ``<Suspense>`` 的结构是这样的
```html 
<Suspense>

  <template v-slot:default>
    用于放置异步组件
  </template> 

  <template v-slot:fallback>
    用于放置组件来没有回来时候的展示内容
  </template> 

</Suspense>
```


```html 
<template>
  <div class="app">
    <h3>App</h3>
    <Suspense>

      <template v-slot:default>
        <Child />
      </template> 

      <template v-slot:fallback>
        <h3>稍等加载中...</h3>
      </template> 

    </Suspense>
  </div>
</template>

<script>
  // 下面方式 只能是异步组件 和 suspense 搭配使用的时候才能这么干
  // 为了查看效果 我们可以这样 在child组件中
  setup() {
    let sum = ref(0)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({sum})
      }, 3000)
    })
  }
</script>
```

<br><br>

# Vue3中的其它变化

## 1. 全局 api 的转移 
vue2中有许多全局api和配置 比如

Vue.component 注册全局组件  
Vue.directive 注册全局指令

但是在vue3中 vue不再给我们提供Vue构造函数了 导致原来的api不能够调用了  

vue3做了一些转移 将原来放在 Vue 身上的api 转移到了 app 身上

```js 
Vue.config.xxx  ---  app.config.xxx

Vue.config.productionTip
                ---  delete

Vue.component   ---  app.component
Vue.directive   ---  app.directive
Vue.mixin       ---  app.mixin
Vue.use         ---  app.use
Vue.prototype   ---  app.config.globalProperties
```

<br>

## 2. 其它的改变
### 1. data选项应始终被声明为一个函数

<br>

### 2. 过渡类名的更改
```
vue2
.v-enter,
.v-leave-to

vue3
.v-enter-from
.v-leave-to
```

<br>

### 3. 移除keyCode作为v-on的修饰符 同时不再支持config.keyCodes

### 4. 移除v-on.native修饰符
子组件中声明自定义事件 在vue2中 给组件绑定事件的时候  

如果这么写 点碎也不会触发 因为 vue 把click当成了 自定义事件  

如果在vue2中想给组件绑定原生事件 要加上.native
```js
<Demo @click="handleData">
```

<br>

在vue3中废弃了 用于辨识是不是原生事件 的修饰符.native 是因为我们需要在子组件中使用 emits 配置项 声明接收 自定义事件
```html 
<Demo @click="handleData">
<Demo @close="handleData">
```
```js
emits:["close"]

// 子组件使用 emits 接收自定义事件 没接收的就是原生事件
emits:["close"]
```

### 5. 移除了过滤器
过滤器虽然看起来很方便 但它需要一个自定义语法 打破大括号内表达式是 只是javascript的假设 

这不仅有学习成本 而且有实现成本 建议用方法调用或计算属性去替换过滤器

<br><br>

## setup语法糖的特点
在 ``<script setup>`` 标签内部 import 的组件 会自动暴露到模板中 不需要使用 components 配置项

<br>

声明在 ``<script setup>`` 标签内部 的变量 会自动导出 可以在模版中直接使用
```html
<div>{{num}}</div>

<script setup>
  let num = 1   // 自动导出的
</script>
```

<br><br>

## Vue3的动态组件
```html
<template>
  <div>
    <component 
      :is="num % 2 == 0 ? Hello : About"
    ></component>
  </div>
</template>


<script setup>
  import Hello from "./components/Hello.vue"
  import About from "./components/About.vue"
</script>
```

<br><br>

## defineProps()

在 ``<script setup>`` 标签内部 使用 props 的时候 使用 **defineProps()**
```html
<script setup>
  
  const props = defineProps({
    msg: String
  })
  
</script>
```

<br><br>

## defineEmits()
在 ``<script setup>`` 标签内部 使用 emits 的时候 使用 **defineEmits()**

```html
<script setup>
  
  const emits = defineEmits(["sendParam"])
  const send = () => {
    emits("sendParam", data)
  }
  
</script>
```

<br><br>

## defineExpose()
在 ``<script setup>`` 标签内部 导出数据 使用 **defineExpose()**

子组件: 导出数据
```html
<script setup>
  
  const a = b = 2

  // 主动导出数据
  defineExpose({
    a, b
  })
  
</script>
```

父组件: 通过 getCurrentInstance() 方法获取当前组件的实例对象 在实例对象的refs身上能够得到子组件实例对象 然后获取 子组件导出的数据
```html
<div>
  <!-- 这里不要忘记给子组件绑定一个ref -->
  <子组件 ref="target">
</div>

<script setup>
  
  // 要获取当前实例
  import {getCurrentInstance, ref} from "vue"

  const instance = getCurrentInstance()

</script>
```

<br><br>

## 禁用 Attribute 继承
如果你不想要一个组件自动地继承 attribute, 你可以在子组件选项中设置 inheritAttrs: false 

如果你使用了 ``<script setup>``, 你需要一个额外的 ``<script>`` 块来书写这个选项声明: 

```html
<script>
// 使用一个简单的 <script> to declare options
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>

```

<br>

### useAttrs(): 在 JavaScript 中访问透传 Attribute  
如果需要, 你可以在 ``<script setup>`` 中使用 useAttrs() API 来访问一个组件的所有透传 attribute:  也就是Vue2中的 $attrs

```html
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

如果没有使用 ``<script setup>``, attrs 会作为 setup() 上下文对象的一个属性暴露: 
```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

<br><br>

# Vue3中的事件总线
Vue 3.x 移除了 $on $off 和 $once 这几个事件 API , 应用实例不再实现事件触发接口

<br>

## 使用事件总线的方式:  

### 利用 第三方插件:  
我们可以用 mitt 或者 tiny-emitter 等第三方插件来实现 EventBus  

<br>

### 创建 3.x 的 EventBus  
这里以 mitt 为例, 示范如何创建一个 Vue 3.x 的 EventBus  

<br>

## 使用方式1:

### 安装:
```s
npm install --save mitt
```

<br>

### 然后在 libs 文件夹下 创建 bus.js 文件  
相当于 黑马教程中的 引入vue 暴露new Vue()是一样的 该文件就充当了 bus 的角色
```js
import mitt from 'mitt';
export default mitt();
```

<br>

### 使用 bus 的页面需要引入
```s
import bus from "./libs/bus"
```

<br>

然后我们就可以将 这个bus.js文件当做是 bus 它内部也提供了一些和以前很相似的方法

<br>

### <font color="#C2185B">on:</font>  
注册一个监听事件, 用于接收数据

<br>

### 形式1:  
**参数:**  
- type: 方法名  
- handler: 回调  
```js
bus.on("update:title", () => {})
```

<br>

### 形式2:  
- 参数1: * 监听所有事件  
- 参数2: 有两个参数 type data 自己实验下
```js
bus.on("*", (type, data) => {})
```

<br>

### <font color="#C2185B">emit:</font>  
调用方法发起数据传递  
- type: 与 on 对应的方法名  
- data: 与 on 对应的, 允许接收的数据  

<br>

### <font color="#C2185B">off:</font>  
用来移除监听事件  
- type: 与 on 对应的方法名  
- handler: 要删除的, 与 on 对应的 handler 函数名

<br>

### 创建和移除监听事件:  
在需要暴露交流事件的组件里, 通过 on 配置好接收方法, 同时为了避免路由切换过程中造成事件多次被绑定, 多次触发, 需要在适当的时机 off 掉: 
```js
import { defineComponent, onBeforeUnmount } from 'vue'
import bus from '@libs/bus'

export default defineComponent({
  setup () {
    // 定义一个打招呼的方法
    const sayHi = (msg: string = 'Hello World!'): void => {
      console.log(msg);
    }

    // 启用监听
    bus.on('sayHi', sayHi);

    // 在组件卸载之前移除监听
    onBeforeUnmount( () => {
      bus.off('sayHi', sayHi);
    })
  }
})
```

<br>

### 调用监听事件  
```js
import { defineComponent } from 'vue'
import bus from '@libs/bus'

export default defineComponent({
  setup () {
    // 调用打招呼事件, 传入消息内容
    bus.emit('sayHi', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈');
  }
})
```

<br>

### 自己总结的代码  
```html
<!-- 父组件 监听bus中事件的组件 -->
<script>
import {ref, reactive, onMounted, watch, watchEffect, toRef, computed, $ref, $computed} from "vue"
import Child from "./components/Child.vue"
import bus from "./libs/bus"

export default {
  components: {
    Child
  },
  setup() {
    
    onMounted(() => {
      bus.on("showData", data => {
        console.log(data)
      })
    })
   
  }
}
</script>


<!-- 子组件 发送自定义事件的组件-->
<script>
import {ref, reactive, onMounted, watch, watchEffect, toRef, computed} from "vue"
import bus from "../libs/bus.js"
export default {
  name: "Child",

  setup() {
    let data = reactive({
      msg: "我是子组件中定义的数据"
    })

    function sendData() {
      bus.emit("showData", data)
    } 
    
    return {
      sendData
    }
  }
  
}
</script>
```

<br><br>

## 使用方式2: 挂载到全局属性上
既然挂载到全局了 那我们使用的时候就要利用this了

<br>

### 1. 安装:
```
npm i mitt -S
```

<br>

### 2. main.ts 初始化
全局总线, vue入口文件中挂载到全局属性上
```js
import {createApp} from "vue"
import App from "./App.vue"


import mitt from 'mitt'

// 定义类型, 不然在派发和监听事件的时候会报错
type eventsType = {
  [_: string]: any
}
const Mitt = mitt<eventsType>()

// Ts注册 由于必须要扩展componentCustomProperties类型才能获得类型提示
declare module "vue" {
  export interface ComponentCustomProperties {
    $bus: typeof Mitt
  }
}

const app = createApp(App)

// 挂载到全局
app.config.globalProperties.$bus = Mitt
app.mount("#app")
```

<br>

### 使用方式:  
```html
<script>
  import {getCurrentInstance} from "vue"
  const instance = getCurrentInstance()

  // 从 instance.proxy 上得到 bus
  instance?.proxy?.$bus.emit()
</script>
```

<br><br>

## 旧项目升级 EventBus  
在 Vue 3.x 的 EventBus, 我们可以看到它的 API 和旧版是非常接近的, 只是去掉了 $ 符号 

如果你要对旧的项目进行升级改造, 因为原来都是使用了 $on 、 $emit 等旧的 API , 一个一个组件去修改成新的 API 肯定不现实 
我们可以在创建 bus.ts 的时候, 通过自定义一个 bus 对象, 来挂载 mitt 的 API  

### 在 bus.ts 里, 改成以下代码:   
```js
import mitt from 'mitt';

// 初始化一个 mitt 实例
const emitter = mitt();

// 定义一个空对象用来承载我们的自定义方法
const bus: any = {};

// 把你要用到的方法添加到 bus 对象上
bus.$on = emitter.on;
bus.$emit = emitter.emit;

// 最终是暴露自己定义的 bus
export default bus;
```

这样我们在组件里就可以继续使用 bus.$on 、bus.$emit 等以前的老 API 了, 不影响我们旧项目的升级使用 

<br><br>

# 引入 composition api 的位置
如果是vue3的项目 我们可以从 vue 里面引入 api  
如果是nuxt或者下了composition api的包的话 我们要从 包里面引入
```js
import {defineComponent, reactive, getCurrentInstance} from "@nuxtjs/composition-api"
```

<br><br>

## 受限的全局访问
模板中的表达式将被沙盒化, 仅能够访问到有限的全局对象列表 该列表中会暴露常用的内置全局对象, 比如 Math 和 Date 

没有显式包含在列表中的全局对象将不能在模板内表达式中访问, 例如用户附加在 window 上的 property 然而, 你也可以自行在 <font color="#C2185B">app.config.globalProperties</font> 上显式地添加他们, 供所有的 Vue 表达式使用 

<br><br>

## vue3.0中注入全局方法
1. 引入 createApp 创建 实例
2. 通过实例对象 app 进行全局挂载 config.globalProperties

```js
import {createApp} from "vue"
import App from "./App.vue"

import api from "./http/api/api" // 后端数据接口
const app = createApp(App)


// 在这里进行挂载
app.config.globalProperties.$api = api

app.mount("#app")
```
<br><br>

## ``<script setup>`` 中怎么使用 async await
包一层函数
```js
const getTestData = async () => {
  const res = await homeApi.testApi(params.id)
  testData.value = res
}

getTestData()
```

<br><br>

## vue3.0中的this : getCurrentInstance 获取组件实例
getCurrentInstance代表全局上下文, ctx相当于Vue2的this

<br>

### 注意:  
ctx代替this只适用于开发阶段, 等你放到服务器上运行就会出错, 后来查阅资料说的得用proxy替代ctx, 才能在你项目正式上线版本正常运行

<br>

### 获取 proxy    
使用方式:
```js
import {getCurrentInstance} from "vue"

setup() {
  let {proxy} = getCurrentInstance()
}
```


### Ts: getCurrentInstance的类型
```js
let instance = getCurrentInstance() as ComponentInternalInstance
```

每次这么写太麻烦了 我们还可以这样
```js
import { ComponentInternalInstance, getCurrentInstance } from 'vue'

export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance

  const globalProperties = appContext.config.globalProperties
  
  return {
    globalProperties
  }
}
```

<br>

### proxy身上就是组件实例身上的属性和方法  
``$nuxt`` 就可以用来做事件总线

```js
console.log("proxy", proxy)
console.log("proxy.$nuxt", proxy.$nuxt)

console.log("proxy.$router", proxy.$router)
console.log("proxy.$route", proxy.$route)

console.log("proxy.$axios", proxy.$axios)
console.log("proxy.$config", proxy.$config)

console.log("proxy.$data", proxy.$data)   // 这个没有
```

```
proxy.$attrs
proxy.$data
proxy.$el
proxy.$emit
proxy.$forceUpdate
proxy.$nextTick
proxy.$options
proxy.$parent
proxy.$props
proxy.$refs
proxy.$root
proxy.$slots
proxy.$watch  
```

<br><br>

# ``nextTick()``  
当你更改响应式状态后, DOM 也会自动更新 然而, 你得注意 DOM 的更新并不是同步的 相反, Vue 将缓冲它们直到更新周期的 "下个时机" 以确保无论你进行了多少次声明更改, 每个组件都只需要更新一次 

nextTick() 可以在状态改变后立即使用, 以等待 DOM 更新完成 你可以传递一个回调函数作为参数, 或者 await 返回的 Promise 

```html
<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()

  // DOM 此时已经更新
  console.log(document.getElementById('counter').textContent) // 1
}
</script>

<template>
  <button id="counter" @click="increment">{{ count }}</button>
</template>
```

<br>

若要等待一个状态改变后的 DOM 更新完成, 你可以使用 **nextTick()** 这个全局 API: 

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // 访问更新后的 DOM
  })
}
```

<br><br>

# Vue3中 路由的使用
```s
https://router.vuejs.org/zh/guide/advanced/composition-api.html#%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB
```
```s
https://next.router.vuejs.org/
```

根据用户输入的地址 动态的挂载组件 

<br>

### 安装:  
- 使用 vue2 的话我们要使用 3版本的router    
- 使用 vue3 的话我们要使用 4版本的router

因为它们彼此是不兼容的 语法也不一样
```s
npm i vue-router@next --save

npm i vue-router -S
# 版本: 4.0.14
```

<br>

### 创建 router 目录:
```
| - src
  | - router
    - index.ts
```

<br>

### router的创建并导出
从vue-router身上取出   
- createRouter  
- createWebHashHistory

<br>

### 配置:  
path & component是必传的
```js
import { 
  createRouter, 
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'

import Home from '../views/Home.vue'


// routes的类型
const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]


// 该方法会返回 router 的实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 最后导出
export default router
```

<br>

### 管理系统页面最基本的4条路由 (常量路由)
1. login 登录
2. home(layout) 主要展示数据的页面 主页
3. 404 错误页面
4. 任意路由 当没有匹配的url的时候 会进入该路由 它负责重定向到404

其中每条路由中应该有 name 属性, 用作菜单的权限管理

```js
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    // name属性用于权限管理, 每条路由都要追加这个命名空间
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  // 登录成功以后展示数据的路由
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  // 当上面路由都没有匹配上的时候 我们访问的路由
  {
    path: '/:pathMatch(.*)*',
    name: 'any',
    component: () => import('@/views/404/index.vue')
  }
]
```

<br>

### ``/:pathMatch(.*)*``
它是一个特殊的路由配置, 可以用于捕获任意路径并进行路由重定向
- /: 匹配根路径
- ``:pathMatch(.*)*``: 动态片段, 它使用了路由参数（以冒号 : 开头）, 其中 pathMatch 是参数的名称, ``(.*)*`` 是参数的正则表达式模式
```js
{
  path: '/:pathMatch(.*)*',
  redirect: '/my-default-route',
  name: 'Any'
}
// 或者
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound
}
```

<br>

### 注册router
main.ts文件中我们要注册router
```js
import {createApp} from "vue"
import App from "./App.vue"
import router from "./router"

createApp(App).use(router).mount("#app")
```


<br>

### 路由的目录结构:  
3.x 引入路由的方式和 2.x 一样, 如果你也是在创建 Vue 项目的时候选择了带上路由, 那么会自动帮你在 src 文件夹下创建如下的目录结构 如果创建时没有选择, 那么也可以按照这个结构自己创建对应的文件 
``` 
| - router
  - index.js
  - routes.js
```

**index.ts:**   
是路由的入口文件, 系统安装的时候也只有这个文件

<br>

**routes.ts:**  
是我自己加的, 主要用于集中管理路由, index.ts 只用于编写路由的创建、拦截等逻辑功能 

因为大型项目来说, 路由树是很粗壮的, 往往需要配置上二级、三级路由, 逻辑和配置都放到一个文件的话, 太臃肿了 

<br>

### 注意:
需要注意的是, 与 Vue 3.x 配套的路由版本是 vue-router 4.x 以上

<br>

### Vue 3.x 的引入方式如下（其中 RouteRecordRaw 是路由项目的 TS 类型定义   
```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // ...
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

<br>

### 配置项: history
用于配置路由的模式, 各种模式都是hook 需要导入使用

- vue2中叫 mode
- vue3中叫 history

```js
import { 
  createRouter, 
  createWebHistory,
  createWebHashHistory,
  createMemoryHistory
} from 'vue-router'

```
```s
            vue2 -- vue3
history: history -- createWebHistory()
history: hash    -- createWebHashHistory()

# 服务端渲染的时候 默认会自动开启
history: abstact -- createMemoryHistory()
```

<br><br>

### hash切换页面的原理:

**主要是通过 改变hash来跳转页面**  
```js
location.hash = "/reg"
```

<br>

**通过 hashchange 事件来监听url的变化**  
```js
window.addEventListener("hashchange", e => {
  console.log(e)

  // newURL 和 oldURL

})
```

<br>

### history模式切换页面的原理:
它是基于 h5 中的api history AP 来实现的

**通过 popstate 事件来监听url的变化**  
```js
window.addEventListener("popstate", e => {
  console.log(e)

  // e.state 中的 back forward current

})
```

<br>

**跳转的话是通过 history.pushState 来进行跳转的**

<br>

### 配置项: name
给路由配置名字, 我们可以通过 name 来进行页面的跳转

```js
{
  name: "Login",
  path: "/",
  component: () => import("")
}
```
```html
<router-link :to={
  // 该name属性对应的就是 router中的name属性
  name: "Login"
}>
```

<br>

### 组件使用 router: useRouter()
因为我们在 setup 里面没有访问 this, 所以我们不能再直接访问 this.$router 或 this.$route 作为替代, 我们使用 ``useRouter`` 函数: 

<br>

### **<font color="#C2185B">useRouter()</font>**   
### **<font color="#C2185B">useRoute()</font>**  
获取 router 和 route

```js
import { useRouter, useRoute } from 'vue-router'
```

```js
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {

    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        // 可以使用 name 跳转
        name: 'search',

        // 可以使用 path 跳转
        path: "/"

        query: {
          ...route.query,
        },
      })
    }
  },
}
```

<br>

### 路由传参:

**params传参的方式:**  
该方式传递的数据在内存中 **所以刷新页面 传递的数据会丢失**, 为了解决这个问题 我们可以使用动态路由参数

动态路由的形式刷新页面数据不会丢失

<br>

**思路:**  
因为单纯的 params 传参, 传递的数据在内存中 所以刷新页面会丢失数据

所以我们使用 动态路由的方式进行传递参数, 我们可以只传递id, 子组件拿到id后 通过id去数据源中获取数据

```js
// 我们使用的是 === string 和 number 做 === 比较 肯定是false 所以我们转换下类型
let item = data.find(v => v.id === Number(router.params.id))

// 当使用 item 的时候 可能会提交 find 为 null 的情况 这时候我们可以使用 可选链
{{item?.name}}
```

<br>

### 示例:
```ts
import {data} from "./list.json"
import {useRouter} from "vue-router"

let router = useRouter()

type Item = {
  name: string,
  price: number,
  id: number
}

const forwardDetail = (item: Item) => {

  // query 传参, 体现在url上
  router.push({
    path: "/reg",
    query: item
  })

  // params 传参, 必须使用name属性项, 不会体现在url上 会在内存中
  router.push({
    name: "Reg",
    params: item
  })


  // 动态路由传参, 现在路由文件中配置动态路由 /:id
  router.push({
    name: "Reg",
    params: {
      id: item.id
    }
  })

}



// 另一个页面获取参数
import {useRoute} from "vue-router"
const route = useRoute()

// 获取query
console.log(route.query.name)

// 获取params
console.log(route.params.name)
```

<br>

### meta配置的使用
该配置在 routes 中 属于它里面的一个配置项

一般我们会在里面存放一些数据供页面使用 比如每个路由组件 存放一个 title 当路由切换的时候 将对应的值 赋值给 document.title

```js
{
  path: "/",
  component: Login,
  meta: {
    title: "登录页面",
  }
}

router.beforeEach((to, from, next) => {

  // ts类型报错: 不能将类型 unknown 分配给 string
  document.title = to.meta.title
})
```

报错原因也就是 ts 不知道 to.meta.title 是什么类型 所以我们可以使用 ts 对其进行标注, 我们通过下面的方式给 meta 中的数据 定义类型

```js
// router文件中
declare module "vue-router" {
  interface RouteMeta {
    title: string
  }
}

... 路由文件中的其他代码
```

<br>

### 路由的过渡动效
上面我们是在 meta 中存放了 title 不仅仅我们可以存放title 还可以存放 过渡的时候使用的类名
```js
declare module "vue-router" {
  interface RouteMeta {
    title: string,
    transition: string
  }
}

{
  path: "/",
  component: Login,
  meta: {
    title: "登录页面",
    transition: "animate__fadeInUp"
  }
}
```

<br>

**组件中使用:**  
vue-router@4 中 router-view 标签支持插槽
```html
<!-- 
  可以解构出 route, Component
    route是当前路由的信息
    Component是vnode
 -->
<router-view #default="{}">
  <!-- 使用 transiton 组件做过渡效果 -->
  <transition :enter-active-class="animate__animated ${route.meta.transition}">
    <!-- 我们将 vnode 传递进去 -->
    <component :is="Component"></component>
  </transition>
</router-view>
```

<br>

### 路由的滚动行为:
使用前端路由 当切换到新路由的时候 想要页面滚到到顶部 或者是保持原先的滚动位置 

就像是重新弄加载页面那样 vue-router 可以自定义路由切换时页面如何滚动

<br>

**基本使用:** 
```js
const router = createRouter({
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {
      left: 0,
      top: 0
    }
  }
})
```

<br>

**配置项: scrollBehavior函数:**  
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

<br>

**savedPosition:**  
返回滚动位置的对象信息, vue来标记的距离, 当页面没有滚动条的时候 会返回null

当我们通过 历史记录前进后退的时候 savedPosition **会记录上一个页面的位置**

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
    // 这里我们将上一个页面的位置直接返回就可以
    if(savedPosition) {
      return savedPosition
    } else {
      return {
        // vue3是top left vue2是x y
        top: 0
      }
    }

    // 我们也可以返回指定的位置
    return {
      top: 500
    }
  }
})
```

<br>

**scrollBehavior方法中也支持异步操作:**
```js
const router = createRouter({
  history: createWebHistory(),

  scrollBehavior: (to, from, savedPosition) => {
    
    // 2秒钟后去指定的位置, 2秒钟之后会走
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          top: 9999
        })
      }, 2000)
    })
  }
})
```
<br><br>

## Router 的属性
我们获取的 router 对象 是**普通对象**, 内部包含的属性有
1. addRoute: f
2. removeRoute: f
3. hasRoute: f
4. getRoutes: f

5. afterEach: f
6. beforeEach: f
7. beforeResolve: f

8. back: f
9. forward: f
10. go: f
11. push: f
12. repalce: f

13. isReady: f

14. currentRoute: RefImpl
15. options: { history, routes, scrollBehavior} 路由的配置对象

<br><br>

## Route 的属性
我们获取的 route 对象 **是proxy对象**, 内部包含的属性有
1. fullPath: ComputedRefImpl
2. hash: ComputedRefImpl
3. matched: ComputedRefImpl 数组 里面包含 url中涵盖的所有 route对象
4. params: ComputedRefImpl
5. query: ComputedRefImpl
6. redirectedFrom: ComputedRefImpl
7. meta: ComputedRefImpl
8. name: ComputedRefImpl
9. path: ComputedRefImpl

<br><br>

### 注意: vite在使用动态路由的时候无法使用别名 @ 必须使用相对路径
```js
import { useRouter } from 'vue-router'

const router = useRouter()
const result = [
  { name: 'A', path: '/a', component: 'A' },
  { name: 'B', path: '/b', component: 'B' },
  { name: 'C', path: '/c', component: 'C' },
]

const add = () => {
  result.forEach(e => {
    router.addRoute({
      path: e.path,
      name: e.name,
      component: () => import(`./components/${e.component}.vue`)
    })
  })
  console.log(router.getRoutes());
}

```

<br><br>

## 导航守卫:
有人喜欢把它称之为中间件 因为前进 后退都会走它

<br>

### 全局前置守卫:
**<font color="#C2185B">router.beforeEach((to, from, next) => { ... })</font>**  
在路由的配置文件写该方法, **访问某一条路由前 执行的函数**

**参数:**  
- to: 即将要进入的目标, 我们要访问的路由对象
- from: 从哪条路由来的 即正在离开的路由对象
- next: 放行的函数, 可以用它做拦截

<br>

**<font color="#C2185B">next()</font>**  
**形式1: 不传**    
表示放行

<br>

**形式2: false**  
中断当前的导航 如果浏览器的url发生变化 那么会重置到 from 路由对应的地址i

<br>

**形式3: 路径**  
跳转到一个指定的接口

<br>

**形式4: 对象**   
该对象就是 push() router-link to 绑定的传参对象
```js
next({
  path: "/"
})
```

<br>

**形式5:error**  
如果传入 next 的参数是一个 Error 实例, 则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。


<br>

### 案例:
我们有两个页面 Login 和 Index 要求是登录之后才能进入首页

**路由配置文件:**  
```js
import {createRouter, createWebHistory} from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/",
      component: () => import("@/views/Index.vue")
    }
  ]
})
```

**Login.vue组件:**  
点击登录跳转到首页
```js
import {reactive} from "vue"
import {useRouter} from "vue-router"


// elementUI的类型, 该类型是从源文件上找到 declare 定义的类型即为全局 我们可以直接引入使用 
// 找的方式 移动到报错的上面 在提示中点击 index.d.ts 文件 搜索
import type {
  FormItemRule
} from "element-plus"


type Form = {
  user: string,
  password: string
}
const form:Form = reactive({
  user: "",
  password: ""
})


// 该类型中的key是动态的 不是写死的 key就是form对象里面的那些
type Rules = {
  // keyof 切割为联合类型 然后循环变量到对象中, 值的类型是一个数组
  [P in keyof Form]?: Array<FormItemRule>
}
// 验证:
const rules = reactive<Rules>({
  user: [
    {
      required: true,
      message: "",
      type: "string",
    }
  ]
})


// 获取表单的ref节点
const oForm = ref<FormInstance>()


// 点击提交执行的回调
const onSubmit = () => {
  // 验证用的方法 ts报错可能未定义我们使用?
  form.value?.validate((validate) => {
    if(validate) {
      router.push("/")

      // 登录成功后 在 localStorage 里面存下凭证
      localStorage.setItem("token", "1")

    } else {

      // 提示验证没有通过
      ElMessage.error("请输入完整")
    }
  })
}
```

<br>

**配置路由守卫: 权限验证逻辑(白名单)**  
我们可以在退出登录的时候 将token 清掉
```js
// 配置白名单, 默认当前 /login 路径是允许进入的
const whiteList = ["/login"]

router.beforeEach((to, from, next) => {
  // 当跳转的地址在白名单中 允许进入, 或者我们登录过了
  if(whiteList.includes(to.path) || localStorage.getItem("token")) {

    // 放行到任意界面 也是就必须登录 才可以看到别的页面
    next()
  } else {
    next("/login")
  }
})
```

<br>

### 全局后置守卫:
**<font color="#C2185B">router.afterEach((to, from) => { ... })</font>**   
访问路由后 执行的函数, **在路由跳转完成后执行**, 想想一个页面刷新后的时间点, 并不是要离开该路由

<br>

### 案例:
我们点击一个按钮切换页面的时候 屏幕上方有一个进度条一闪而过 这样的效果就是根据 beforeEach 和 afterEach 实现的

进入之前走进度条   
进入之后清掉进度条

<br>

**loadingBar.vue进度条组件:**
```html
<template>
  <div class="wraps">
    <div ref="bar" class="bar"></div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue"
// 初始值为1
let speed = ref<number>(1)
let bar = ref<HTMLDivElement>()

// 开始进度条
const startLoading = () => {
  // 获取dom ts报错可能是undefined 我们使用断言
  let dom = bar.value as HTMLDivElement

  // 每次执行 startLoading 都初始化 speed
  speed.value = 1

  // requestAnimationFrame返回的id
  let timer = ref<number>(0)


  // 代替 计时器 使用 requestAnimationFrame() 方法来修改bar的长度 如果使用计时器每进行回调一次都会对页面造成回流重绘 而requestAnimationFrame它会将回流和重绘收集起来只走一次 性能要比计时器要好 而且它是以60的帧率进行绘制 视觉效果上也好

  // requestAnimationFrame该函数要配合递归使用 我们将传入的匿名函数起个名字 在if判断的一端里面继续调用
  timer.value = window.requestAnimationFrame(function fn() {
    if(speed.value < 90) {
      speed.value += 1
      dom.style.width = speed.value + "%"

      // 递归调用
      timer.value = window.requestAnimationFrame(fn)

    } else {
      speed.value = 1
      window.cancelAnimationFrame(timer.value)
    }
  })
}

// 结束进度条, startloading里面让进度条走到90% endloading直接让进度条走到100%
const endLoading = () => {
  let dom = bar.value as HTMLDivElement
   
  window.requestAnimationFrame(() => {

    // 为了显着不是那么突兀 最后的100%等1秒
    setTimeout(() => {
      speed.value = 100
      dom.style.width = speed.value + "%"
    }, 1000)
    
  })
} 


// 将上面的两个方法暴露到外部
defineExpose({
  startLoading,
  endLoading
})

</script>

<style>
.wraps {
  position: fixed;
  top: 0;
  width: 100%;
  height: 10px;

  .bar {
    height: inherit;
    width: 0;
    background: red
  }
}
</style>
```

<br>

**在路由配置文件中使用 loadingBar.vue:**  

**注意:**  
引入的组件 不是在模版中调用 也就是我们不想写在template中 那么就要  

- 先将组件通过 ``createVNode`` 转换为虚拟DOM  
- 再将虚拟DOM 通过 ``render`` 挂载到真实的DOM中 
- 最后通过 vnode.component?.exposed. 的方式 找到该组件实例暴露出来的属性和方法

```js
import loadingBar from "../components/loadingBar.vue"

// 从vue中导入
import {createVNode, render} from "vue"

// 将导入的组件转换为 虚拟节点
const vnode = createVNode(loadingBar)

// 将虚拟节点挂载到 body 上
render(vnode, document.body)


// 配置白名单
const whiteList = ["/login"]

// 进入目标组件前展示 loadingBar 组件
router.beforeEach((to, from, next) => {

  vnode.component?.exposed?.startLoading()


  if(whiteList.includes(to.path) || localStorage.getItem("token")) {
    next()
  } else {
    next("/login")
  }
})

router.afterEach((to, from) => {
  vnode.component?.exposed?.endLoading()
})
```

<br><br>

### vue-router: beforeEach 可能出现的问题
```js
[Vue Router warn]: The "next" callback was called more than once in one navigation guard when going from "/login" to "/home". It should be called exactly one time in each navigation guard. This will fail in production.
```

<br>

**参考网址:**  
```s
https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
```
```js
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 如果用户未能验证身份, 则 `next` 会被调用两次
  next()
})

// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

<br>

**解决方式:**  
在 next() 的前面 加上 return
```js
if (to.path === '/login') {
  return next()
} else {
  // 将用户想访问 而 没有访问成功的页面 带给login, 这样用户登录成功后 可以直接跳过去
  return next({ path: '/login', query: { redirect: to.path } })
}
```

<br><br>

### 动态添加路由
我们一般使用动态路由都是后台会返回一个路由表 前端通过接口拿到后处理(后端处理路由)

场景: 权限的场景下使用的比较多, 比如A用户可以看到3个菜单 B用户能看到两个菜单 C用户只会看见一个

这时候后端只需要根据不同的用户返回不同的菜单就可以了 然后前端通过 addRoute 的方法添加菜单就可以了

<br>


### 添加路由:
动态路由主要通过下面的两个函数实现

**<font color="#C2185B">router.addRoute()</font>**  

**<font color="#C2185B">router.removeRoute()</font>**  

<br>

### 案例:
我们完成上面的逻辑

<br>

### 后台代码:
```js
import express, {Express, Request, Response} from "express"

const app:Express = express()

app.get("/login", (req:Request, res:Response) => {
  res.header("Access-Control-Allow-Origin", "*")

  // 如果是用户1 返回下面的3个路由
  if(req.query.user == "admin" && req.query.password == "123456") {
    res.json({
      route: [
        {
          path: "/demo1",
          name: "Demo1",
          component: "demo1.vue"
        },
        {
          path: "/demo2",
          name: "Demo2",
          component: "demo2.vue"
        },
        {
          path: "/demo3",
          name: "Demo3",
          component: "demo3.vue"
        },
      ]
    })
    // 如果是用户2返回下面的2个路由
  } else if(req.query.user == "admin2" && req.query.password == "123456") {
    res.json({
      route: [
        {
          path: "/demo1",
          name: "Demo1",
          component: "demo1.vue"
        },
        {
          path: "/demo2",
          name: "Demo2",
          component: "demo2.vue"
        },
      ]
    })
  } else {
    res.json({
      code: 400,
      message: "账号密码错误"
    })
  }
})
```

<br>

### 前端逻辑
我们在登录的时候添加路由
```js
// 代码上面也有 我们只写最新的
const onSubmt = () => {
  // elementUI验证表单添加信息是否符合规范
  form.value?validate(validate => {
    if(validate) {

    } else {

    }
  }) 
}


const initRoute = async () => {
  let {data: res} = await axios.get("http:// ... ")

  // res.route 就是根据用户返回的路由表
  res.route.forEach(route:any => {
    router.addRoute({
      path: route.path,
      name: route.name,

      // import方式添加的时候 不能使用别名
      component: () => import(`../views/${route.component}`)
    })
  })

  // 查看有没有添加进去 获取路由的列表
  console.log(router.getRoutes())
}
```

<br>

### 公共路径:  
在配置路由之前, 需要先了解公共路径（publicPath）的概念, 在 添加项目配置 部分, 我们里面有一个参数, 叫 publicPath, 其实就是用来控制路由的公共路径, 那么它有什么用呢？

publicPath 的默认值是 /, 也就是说, 如果你不配置它, 那么所有的资源文件都是从域名根目录读取, 如果你的项目部署在域名根目录那当然好, 但是如果不是呢？那么就必须来配置它了 

配置很简单, 只要把项目要上线的最终地址, 去掉域名, 剩下的那部分就是 publicPath  

 
如果你的路由只有一级, 那么 publicPath 也可以设置为相对路径 ./, 这样你可以把项目部署到任意地方 

如果路由不止一级, 那么请准确的指定 publicPath, 并且保证它是以 / 开头,  / 结尾


假设你的项目是部署在 ``https://chengpeiquan.com/vue3/`` , 那么 publicPath 就可以设置为 /vue3/ 

通常我们开发环境, 也就是本机ip访问的时候, 都是基于根目录, 但上线后的就不一定是根目录了, 那么你在 vue.config.js 里可以通过环境变量来指定不同环境使用不同的 publicPath

```js
const IS_DEV = process.env.NODE_ENV === 'development' ? true : false;

module.exports = {
  publicPath: IS_DEV ? '/' : '/vue3/'
}
```

<br>

### 不生成 a 标签   
**vue2中不生成a标签的使用方式:**
```js
<template>
  <router-link tag="span" to="/home">首页</router-link>
</template>
```

<br>

**vue3中不生成a标签的使用方式:**  
需要通过 custom 和 v-slot 的配合来渲染为其他标签
```js
<template>
  <router-link
    to="/home"
    custom
    v-slot="{ navigate }"
  >
    <span
      class="link"
      @click="navigate"
    >
      首页
    </span>
  </router-link>
</template>
```

<br>

### 标签属性详解: custom:   
一个布尔值, 用于控制是否需要渲染为 a 标签, 当不包含 custom 或者把 custom 设置为 false 时, 则依然使用 a 标签渲染 

<br>

### 标签属性详解: v-slot:   
是一个对象, 用来决定标签的行为, 它包含了: 

- href:   
解析后的URL, 将会作为一个 a 元素的 href 属性

- route:   
解析后的规范化的地址

- navigate:   
触发导航的函数, 会在必要时自动阻止事件, 和 router-link 同理

- isActive:   
如果需要应用激活的 class 则为 true, 允许应用一个任意的 class

- isExactActive:   
如果需要应用精确激活的 class 则为 true, 允许应用一个任意的 class

<br>

一般来说, v-slot 必备的只有 navigate , 用来绑定元素的点击事件, 否则元素点击后不会有任何反应, 其他的可以根据实际需求来添加 

<br>

### 要渲染为非 a 标签, 切记两个点:
- router-link 必须带上 custom 和 v-slot 属性
- 最终要渲染的标签, 写在 router-link 里, 包括对应的 className 和点击事件

<br><br>

# Vue3 + TypeScript
怎么在创建项目后 添加 TS

1. vue create my-project-name
2. vue add typescript

<br>

或者在创建项目的时候 就选择集成ts

<br>

**推荐配置:**
1. use class style component ...: > No

2. use babel alongeide typescript: > Yes

3. convart all .js files to .ts: > Yes

4. allow .js files to be compiled: > Yes


<br>

### 使用方式:  
``<script lang="ts">``

```js
import {defineComponent} from "vue"

export default defineComponent({

})
```

<br>

给data中的数据 定义类型
```ts
// 方式1:
// 给title确定类型
let title: string = "我是Home组件"

export default defineComponent({
  data() {
    return {
      title
    }
  },
  methods: {
    // 无返回值
    setTitle(): viod {
      this.title = "修改后的Home - Tile"
    }
  }
})
```

<br>

### 通过泛型一次配置所有属性的类型  
```js
{
  title,
  userInfo: {
    username: "sam",
  },
  age: 20,
  sex: "男"
}


// 定义接口
interface News {
  title: string,
  desc: string,
  count: number | string,

  // 可选参数
  content?: string
}

// 让一份数据实现这个News接口
let newsData: News = {
  title: "新闻",
  desc: "新闻描述",
  count: 12,
  content: "新闻内容"
}

export default defineComponent({
  data() {

    // 还能这么写
    return newsData
  }
})
```

<br>

### 计算属性的ts写法  
```js
computed: {
  reverseTitle(): string {
    return "返回个字符串"
  }
}
```

<br>

### 要点:  
Ts中 引入组件的时候 要加上 .vue

<br>

### 如何在调用方法的时候传值  
```html
<button @click="setTile('改变后的title')">
```

```js
// 定义接口
interface News {
  title: string,
  desc: string,
  count: number | string,

  // 可选参数
  content?: string
}

// 让一份数据实现这个News接口
let newsData: News = {
  title: "新闻",
  desc: "新闻描述",
  count: 12,
  content: "新闻内容"
}


// 上面定义类型 下面写配置项
export default defineComponent({
  data() {
    return newsData
  },
  methods: {

    // 返回值类型
    setCount():void {
      this.count = "123456"
    },

    // 函数的参数
    setTitle(title:string):void {
      this.title = title
    }
  },

  // 返回值类型
  computed: {
    reverseTile():string {
      return this.title.split("").reverse().join("")
    }
  }
})
```

<br>

### 注意:
上面我们在 setTitle() 方法中 对形参进行了 类型的鉴定 但是我们发现个问题

当我们在 html 模板中 传入 123 'abc' 都好用
也就是当我们在 模板中 调用方法 它不会对类型做校验 但是在js部分里面调用方法 才会进行类型的校验

<br><br>

### 如何在组合式api中使用ts  
```html
<!-- 
  因为我们使用 toRefs 将对象中的属性单独拿出来了
 -->
<div>
    username={{username}} <br>
    <button @click="setUsername">click
</div>
```
```js
export default defineComponent({
  // 所有的组合式api都放在 setup 中 
  setup() {

    let user = reactive({
      username: "张三",
      age: 20,
      setUserName() {
        this.username = "李四"
      }
    })


    return {
      // 使用toRefs返回 响应式 数据
      ...toRefs(user)
    }
  }
})
```

<br>

上面还没有使用ts 如果我们想使用ts应该怎么操作呢？步骤:
1. 在 export default 的外侧 定义一个接口
2. 让reactive的对象实现接口

```js
interface User {
  username: string,
  age: number | string,
  setUsername(username: string): void,
  getUsername(): string
}

export default defineComponent({
  setup() {
    // 方式1: 
    let user: User = reactive({
      username: "张三",
      age: 20,
      setUserName(username: string) {
        this.username = name
      }
    })


    // 方式2:
    // reactive底层使用了泛型 继承了 T 所以我们可以通过泛型指定类型 User类对参数进行了约束
    let user = reactive<User>({
      username: "张三",
      age: 20,
      setUserName(username: string) {
        this.username = name
      }
    })


    // 方式3:
    // 使用 as
    let user = reactive({
      username: "张三",
      age: 20,
      setUserName(username: string) {
        this.username = name
      } 
    }) as User



    // ref的ts -- 只有这一种方式
    // ref底层是也继承了泛型 T 所以我们也可以传入泛型
    let count = ref<number | string>(20)



    // 计算属性的ts
    // 在形参()的后面指定
    let reverseUserName = computed(():stirng => {
      return user.username.split("").reverse().join("")
    })



    return {
      ...toRefs(user),
      count,
      reverseUserName
    }
  }
})
```

<br><br>

# Vue3的鉴权逻辑:

## 安装逻辑:

### 使用 vite 安装项目:
下面的命令 会依次有选择的步骤
```s
npm create vite
npm install
```

<br>

### 配置别名 & 代理:
这里应用的是新的方式 当我们使用 下面的方式引入 resolve 的时候 会有类型的问题 所以再此之前我们要安装对应的类型文件

**安装类型文件:**
```
npm i @types/node -D
```

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3333",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
})
```

<br>

### 注意:
接口前缀要是想使用正则的话 前面要加上 ^, 只有加上^后才会被标识为正则
```js
// 错误写法:
"/api/*": { }

// 正确写法:
"^/api/*": { }
```

<br>

### 安装 vuex@4 vue-router@4
```
npm i vuex@next vue-router@4
```

<br>

**安装 vue-router 的类型包**
```
npm i @types/vue-router -D
```

<br>

**vuex 是不用安装类型包的 本身就支持 并且不需要任何特殊的ts配置**

<br>

### 安装 axios
```
npm i axios
```

<br>

### 安装后台相关依赖
```js
npm i express

// express的类型文件
npm i @types/express -D
// node的类型文件
npm i @types/node -D

// 安装ts程序
npm i typescript -D

// 监听 ts 变化的工具
npm i ts-node-dev -D
```

<br>

**配置 package.json 启动命令:**
```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "ts-node-dev ./src/app.ts"
},
```

<br><br>

## 前台逻辑:

### axios相关:
里面包含类型问题, err的类型应该是 Error
```js
import axios, {AxiosRequestConfig, AxiosResponse} from "axios"

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

axios.interceptors.response.use((res: AxiosResponse) => {
  if(res.data.code == 1) {
    return Promise.reject(res.data)
  }

  // 直接将数据返回出去
  return res.data.authRoutes
}, (err) => Promise.reject(err))

export default axios
```

<br>

### 使用别名的方式引入报错的情况:
这种情况可能需要在 tsconfig.json 里面配置下 path
```js
{
  "compilerOptions": {
    // 追加
    "baseUrl": ".",
    // 追加
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

<br>

### Vuex4相关的逻辑
```
| - store
  - actions.ts
  - actionTypes.ts
  - mutations.ts
  - state.ts
  - index.ts
```

<br>

### 组件中使用store的方式:
**通过 useStore() hooks** 来获取store对象  
该 store 对象的类型为 ``store: Store<StateType>``
```js
import {useStore} from "vuex"
// 加类型的
let store: Store<StateType> = useStore()

let store = useStore()
let name = store.state.name
```
<br>

### 创建 store  

**要点1:**  
state的类型 可以在创建 store 的时候通过泛型来指定

```js
import {createStore} from "vuex"
import state, { StateType } from "./state"
import actions from "./actions"
import mutations from "./mutations"

// 通过泛型来指定 state 的类型
export default createStore<StateType>({
  state,
  actions,
  mutations
})
```

<br>

main.ts文件中要引入 store 并注册
```js
import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/index"

let app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.mount("#app")
```

<br>

### 后台返回数据的类型
``/types/index.ts``
```js
export type RouteType = {
  id: number,
  pid: number,
  path: string,
  link?: string,
  name: string,
  title: string,
  children?: RouteType[]
};

export type UserType = {
  id: number,
  username: string,
  auth: number[]
};
```

<br>

### state.ts
```js
import {RouteType} from "../types/index"

// state的类型 导出供 index.ts 中创建store的时候使用
export type StateType = {
  uid: number,
  hasAuth: boolean,
  routeList: RouteType[]
} 

export default {
  uid: 1,
  hasAuth: false,
  routeList: []
}
```

<br>

### action.ts
因为 actions 和 mutations 中的方法名是一样的 所以我们会创建下面的文件 专门放置 actions 和 mutations 的方法名 

然后在 actions 和 mutations 导入使用
```js
| - store
  - actionTypes.ts


export const SET_ROUTE_LIST: string = "SET_ROUTE_LIST"
export const SET_AUTH: string = "SET_AUTH"
```

<br>

**actions.ts**  
**要点1:**  
commit 和 state 的类型为 Commit类型是从 vuex 中解构出来的
```js
({commit, state}: {commit: Commit, state: StateType}) => { ... }
```

<br>

**要点2:**  
在 axios 拦截中我们设置了 请求返回的类型为 (res: AxiosResponse)

所以我们使用 await 接收到的数据的类型会是 AxiosResponse

这时我们要想将 请求回来的数据的类型变更为正常的类型 可以连续 </font color="#C2185B">as unknown as RouteType</font>

```js
let data = await axios.post("url", params) as unknown as RouteType[]
```

<br>

**要点3:**  
将返回的扁平化数据 转换为 树形结构的方法  
``/utils/index.ts``
```js
import { RouteType } from "../types";

export function formatRouteTree(data: RouteType[]) {
  let parents = data.filter(p => p.pid == 0)
  let children = data.filter(c => c.pid != 0)

  dataToTree(parents, children)
  return parents

  function dataToTree(parents: RouteType[], children: RouteType[]) {
    parents.forEach((p) => {
      children.forEach((c, i) => {
        if(p.id == c.pid) {

          let _children = JSON.parse(JSON.stringify(children))
          _children.splice(i, 1)
          dataToTree([c], _children)

          if(p.children) {
            p.children.push(c)
          } else {
            p.children = [c]
          }
        }
      })
    })
  }
}
```

<br>

```js
import { RouteType } from "../types"
import {SET_ROUTE_TREE, SET_AUTH} from "./actionTypes"
import { StateType } from "./state"
import { Commit } from "vuex"

import http from "../api/index"
import { formatRouteTree } from "../utils"

export default {
  
  async [SET_ROUTE_TREE]({commit, state}: {commit: Commit, state: StateType}) {
    // res: AxiosResponse<any, any> 这时候的返回值类型是 AxiosResponse 这里我们可以先给它定义成 unknown
    let routeList = await http.post("/api/user_router_list", {uid: state.uid}) as unknown as RouteType[]
    /*
      console.log("actions:", routeList) 
      Array(4)
    */

    // 将扁平化的数据转为树形结构
    const routeTree = formatRouteTree(routeList)

    // 将 routeTree 数据保存到 state 中
    commit(SET_ROUTE_TREE, routeTree)
    commit(SET_AUTH, true)

  }
}
```

<br>

**mutations.ts**
```js
import { RouteType } from "../types"
import {SET_ROUTE_TREE, SET_AUTH} from "./actionTypes"
import { StateType } from "./state"
export default {
  
  [SET_ROUTE_TREE](state: StateType, routeTree: RouteType[]) {
    state.routeTree = routeTree
  },
  [SET_AUTH](state: StateType, auth: boolean) {
    state.hasAuth = auth
  }
}
```

<br><br>

## Vue3中如何使用 mapState, mapGetters

### store中的数据
```js
import { createStore } from 'vuex'

export default createStore({
  state: {
    msg: "我是store中的数据",
    count: 1
  },
  getters: {
    enlargeCount(state) {
      return state.count * 10
    }
  },
  mutations: {
    add(state, val) {
      state.count += val
    },
    change(state, val) {
      state.msg = val
    }
  },
  actions: {
  },
  modules: {
  }
})

```

<br>

现在页面上我们想使用 mapState mapGetters, 在vue2中我们知道map系列是放在computed里面的 但是在vue3里面不行 我们要封装成hooks

<br>

### mapState -> hooks 的步骤
页面调用 useState 的时候 我们传入的是 ["key", "key"] 这样的数组
```js
import {computed} from "vue"
import {mapState, useStore} from "vuex"

// mapper是数组格式的数据
export function useState(mapper) {

  // 获取store
  const store = useStore()

  // 返回是对象: count: fn
  const stateFns = mapState(mapper)

  const state = {}

  // 遍历上面的stateFns拿到key的部分
  Object.keys(stateFns).forEach(key => {

    // 使用bind返回一个新的函数 改变了this的指向
    const fn = stateFns[key].bind({$store: store})
    state[key] = computed(fn)
  })

  return state
}
```

**页面中的使用方式:**  
```js
import {useState} from "../hooks/useState.js"
let {msg, count} = useState(["msg", "count"])
```

<br>

### mapGetters的使用方式
```js
import {computed} from "vue"
import {mapGetters, useStore} from "vuex"

// mapper是数组格式的数据
export function useGetters(mapper) {
  // 获取store
  const store = useStore()

  // 返回是对象: val是一个函数
  const getterFns = mapGetters(mapper)

  const getters = {}
  
  // 遍历上面的stateFns拿到key的部分
  Object.keys(getterFns).forEach(key => {
    // 使用bind返回一个新的函数 改变了this的指向
    const fn = getterFns[key].bind({$store: store})
    getters[key] = computed(fn)
  })

  return getters
}


// 页面使用:
let {enlargeCount} = useGetters(["enlargeCount"])
```

<br><br>

## 路由相关:

### router对象的类型是 Router
```js
(router: Router) => { ... }
```

<br>

### 路由配置 routes 的类型:
```js
import { RouteRecordRaw } from "vue-router";

const rotues: Array<RouteRecordRaw> = [

]
```

<br>

### 404页面的匹配方式: ``path: "/:pathMatch(.*)*"``
```js
{
  path: "/:pathMatch(.*)*",   
  name: "NotFound",
  component: () => import(/* webpackChunkName: "NotFound" */'@/views/NotFound.vue')
}
```


<br>

**代码部分:**
```js
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { RouteType } from "../types";
import store from "../store/index"
import Home from "../views/Home.vue"
import NotFound from "../views/NotFound.vue"
import { SET_ROUTE_TREE } from "../store/actionTypes";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:pathMatch(.*)*",   
    name: "NotFound",
    component: NotFound
  }
] 

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


// 将树形的数据结构的权限列表 转换 routes配置项的格式
function generateRoutes(tree: RouteType[]) {
  let newRoutes = tree.map(r => {
    let route: RouteRecordRaw = {
      path: r.path,
      name: r.name,
      component: () => import(`/* webpackChunkName: "${r.name}"*/@/views/${r.name}.vue`),
      children: []
    }

    if(r.children) {
      route.children = generateRoutes(r.children)
    }

    return route
  })

  return newRoutes
}

// 动态添加路由
router.beforeEach(async (to, from, next) => {
  if(!store.state.hasAuth) {
    // 执行下面的代码后 相当于请求数据 这时候store中就会有树形的数据
    await store.dispatch(SET_ROUTE_TREE)
    const newRoutes = generateRoutes(store.state.routeTree)
    console.log("newRoutes: ", newRoutes)
    newRoutes.forEach(route => router.addRoute(route))
    next({path: to.path})
  } else {
    next()
  }
})

export default router

```

<br>

### 递归组件:

**MenuItem:**
```html
<template>

<div>
  <ul v-if="item.children && item.children.length > 0">
    <li>
      <!-- 顶级路由没有link 所以我们使用 path -->
      <router-link :to="item.link || item.path">{{item.title}}</router-link>
      <div v-for="(c, i) of item.children" :key="i">
        <MenuItem :item="c" />
      </div>
    </li>
  </ul>
  <ul v-else>
    <li>
      <router-link :to="item.link || item.path">{{item.title}}</router-link>
    </li>
  </ul>
</div>

</template>

<!-- 
setup中不用写name 会自动找同名的组件进行递归操作

<script>
export default {
  // 递归组件一定会用到name的
  name: "MenuItem",
}
</script> 
-->
<script setup lang="ts">

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style scoped>

</style>
```

<br>

**SideBar:**
```html
<template>

<div class="side-bar">
  <ul>
    <li>
      <router-link to="/">首页</router-link>
    </li>
  </ul>

  <!-- 循环树形结构的数据 -->
  <div v-for="(item, index) of store.state.routeTree" :key="index">
    <MenuItem :item="item" />
  </div>
</div>

</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue';
import {useStore} from "vuex"

const store = useStore()

</script>

<style scoped>
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 200px;
  height: 100%;
  padding: 80px 15px 30px;
  box-sizing: border-box;
  background-color: rgb(227, 227, 227);
}
</style>
```

<br><br>

## 后台逻辑:
```js
| - src
  | - data
    - user.js     // 用户信息
    - router.js   // 权限路由表

  - app.js  // 入口文件
```

<br>

**user.ts and router.ts**
接口要使用 I 前缀
```
课程管理  2
  课程操作 3
    课程数据  4
  增加课程  5

学生管理  6
  学生操作  7
  增加学生  8
```
```ts
export interface IRouter {
  id: number,
  pid: number,
  path: string,
  link?: string,
  name: string,
  title: string
};

module.exports = <IRouter[]>[
  ...
]

export interface IUser {
  id: number,
  username: string,
  auth: number[]
};

module.exports = <IUser[]>[
  ...
]
```

<br>

**app.ts**
```js
import express, { Application, Request, Response } from "express"

// 引入数据
import users, {IUser} from "./data/user"
import routes, {IRoute} from "./data/routes"

// 请求体类型
type Body = {
  uid: number
}


// app的类型为Application
const app: Application = express()
const PORT: number = 3333


// 处理 post 请求
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())


// post接口
app.post("/user_router_list", (req: Request, res: Response) => {
  const {uid}: Body = req.body
  let authRoutes:IRoute[] = []

  if(uid) {
    let userInfo:IUser | undefined = users.find(user => uid == user.id)

    if(userInfo) {
      userInfo.auth.forEach(authId => {
        routes.forEach((route: IRoute) => {
          if(route.id == authId) {
            authRoutes.push(route)
          }
        })
      })

      res.status(200).json({
        code: 200,
        msg: "请求成功",
        authRoutes
      })

    } else {
      res.status(200).json({
        code: 201,
        msg: "no userInfo for this UID",
        authRoutes: null
      })
    }

  } else {
    res.status(200).json({
      code: 404,
      msg: "No UID received",
      authRoutes: null
    })
  }
  

})

app.listen(PORT , () => {
  console.log("server is running on http://localhost:" + PORT)
})
```

<br><br>