### 接口文档
- baseURL:
- 

- 登录接口
- /login
- post
- 参数: username & password

- 商品接口
- /getGoodsList
- get

- 用户列表
- /getUserList
- get

- 角色列表
- /getRoleList
- get

- 权限列表
- /getAnthorityList
- get


### 要点:
> 1. shims-vue.d.ts
- src/shims-vue.d.ts
- src目录下多了一个这个文件 这个文件是给ts做适配的 因为.vue不是一个常规的文件 ts是不能理解这样的文件的

- 下面的这个文件 就在告诉Ts .vue 文件就是下面的类型
- *相当于我们定义了一个类型*

```js
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```


> 2. 安装 使用 element-plus
- https://element-plus.gitee.io/zh-CN/
- https://element-plus.gitee.io/zh-CN/guide/installation.html#%E7%8E%AF%E5%A2%83%E6%94%AF%E6%8C%81

- npm install element-plus --save
```js
"element-plus": "^2.2.8",
```

> 完整引入
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 这里
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(router).use(ElementPlus).mount('#app')
```


> 自动导入
- 安装
- 首先你需要安装这两款插件
  unplugin-vue-components
  unplugin-auto-import

- npm install -D unplugin-vue-components unplugin-auto-import


- 配置
```js
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

```js
//webpack
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
})

```


> 3. 创建路由
- 要点:
- 我们console, *process.env* 它身上有
  - NODE_ENV: 'development'
  - BASE_URL: '/'


- 1. 创建一个 page 看看 vue3 + ts 的基础模板
```vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({

})
</script>
```

- 2. 配置路由 我们看下 vue3 + ts 中的基础模板
```js
import { 
  createRouter, 
  createWebHistory, 
  RouteRecordRaw    // routes数组的类型
} from 'vue-router'

import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

```


> 路由页面
- 1. 要点 toRefs 的使用技巧
- 可以达到data配置项里面的效果
```vue
<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue"

export default defineComponent({
  setup() {

    // 相当于 data 配置项
    const data = reactive({
      ruleForm: {
        username: "",
        password: ""
      }
    })
    return {
      // 利用 toRefs 结构出来里面的属性
      ...toRefs(data)
    }
  }
})
</script>
``` 

- 2. 对数据的类型进行规范
- 我们会在 src 下创建一个 type目录 用来规范项目中的数据类型
- 比如 我们做 login.vue 页面的 数据类型

    | - type
      - login.ts

- login.vue 的类型
```js
// 我们给它添加类型限制
const data: FormData = reactive({
  ruleForm: {
    username: "",
    password: ""
  }
})
```

- type/login.ts 下定义
```js
interface LoginFormItem {
  username: string,
  password: string
}

export interface FormData {
  ruleForm: LoginFormItem,
}
```

- login.vue 引入
```vue
<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue"
import {FormData} from "../type/login"

export default defineComponent({
  setup() {

    const data: FormData = reactive({
      ruleForm: {
        username: "",
        password: ""
      }
    })

    // 老师说 这个部分不会变化 所以不用设置类型
    const rules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名的长度为3~10', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 10, message: '密码长度在3~10', trigger: 'blur' },
      ],
    })


    return {
      ...toRefs(data),

      // 这里不能使用 toRefs, toRefs是将里面的属性暴露出去 我们要暴露本身
      rules
    }
  }
})
</script>
```


> 封装 axios 简单封装

  | - src
    | - request
      - index.ts
      - request.ts

- index.ts:
- 做 axios 的基本设置

- request.ts
- 基于 index.ts 做各个接口的请求 二次封装


```js
// index.ts
import axios from "axios"

const instance = axios.create({
  baseURL: "",
  timeout: 5000
})

// 请求拦截: 请求之前我们把token加到请求中
instance.interceptors.request.use(
  config => {

    // 属性要是使用的话 必须要有值 所以我们要考虑两种情况
    config.headers = config.headers || {}

    if(localStorage.token) {
      // 属性要是使用的话 必须要有值 所以我们要考虑两种情况
      config.headers.token = localStorage.token || ""
    }

    return config
  }
)


// 响应拦截: 
instance.interceptors.response.use(
  res => {
    // 错误码来判断成功还是失败
    const code = res.data.code

    // 请求失败
    if(code != 200) {
      return Promise.reject(res.data)
    }

    return res.data
  },
  err => {
    console.log(err)
  }
)

export default instance
```

- request.js
```js
import instance from "./index"

// 我们传递进来的data参数要有自己的类型 
interface dataType {
  username: string,
  password: string | number
}

export const login = (data: dataType) => {
  return instance({
    url: "/login",
    method: "post",
    data
  })
}
```


> 表单提交的逻辑
- 1. element plus 有自己的使用方式 比如 获取dom对象的时候 它会从 提取出来 DOM 对象的类型

  import type { FormInstance } from 'element-plus'

```js
// 表单提交的逻辑
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  // 填写表单的时候 失去焦点会进行检验 同时我们提交的时候也需要做校验 
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// 表单重置的逻辑
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
```

- 2. vue3中要是想使用 router 要引入 useRouter
- import {useRouter} from "vue-router"

- 然后 获取 router
- const router = useRouter()

- 3. 登录的逻辑
```js
// 表单提交的逻辑
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  // 填写表单的时候 失去焦点会进行检验 同时我们提交的时候也需要做校验 
  formEl.validate(async (valid) => {
    if (valid) {
      // 发送请求 
      try {
        let res = await login(data.ruleForm)
        localStorage.token = res.data.token

        // vue3的页面跳转
        router.push("/")

        // 这里因为响应拦截 如果状态码不为200则Promise.reject(res.data) 所以这里我们要使用try catch
      } catch(err) {
        if(err.code == 201) {
          router.push("/login")
          console.log(err.data.msg)
        }
      }
      
    } else {
      console.log('error submit!')
      return false
    }
  })
}
```


> 设置子路由
- 我们梳理下逻辑 首先 App.vue 里面 只有一个 <router-view>
- 用于展示 
  - 登录页面 login.vue
  - 后台管理页面的主界面 home.vue

- 而 后台管理系统 我们都知道 左边导航栏 后面展示区域
- 我们点击导航栏你 后面就会展示对应的页面 而这些对应的页面都是作为子路由出现的

- 子路由都会配置到 home 路由信息下的 children 属性里面

```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: "goods",
        name: "goods",
        meta: {
          isShow: true,
          title: "商品列表"
        },
        component: () => import(/* webpackChunkName: "goods" */ '../views/GoodsView.vue')
      },
      {
        path: "user",
        name: "user",
        meta: {
          isShow: true,
          title: "用户列表"
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
      }
    ]
  }, 
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]
```

- 比如我们会如上进行配置


> 使用要点:
> 1. 要使用 router 需要先引入 useRouter
- import {useRouter} from "vue-router"
- const router = useRouter()

> 2. router.getRoutes()
- let routes = router.getRoutes()

- router身上的该方法 用于获取 应用内所有的路由信息 是一个*加工数据结构后的routes*
- 为什么是加工数据结构后的routes 比如 我们正常的 routes 是*如上的* 子路由会在 home.vue 路由下的children属性里面 
- 但是我们通过该方法返回的路由数组为如下 我们能发现 所有的原本嵌套的路由信息 都拿到第一层了
```js
routes [
  {
    "path": "/goods",
    "name": "goods",
    "meta": {
      "isShow": true,
      "title": "商品列表"
    },
    "props": {
      "default": false
    },
    "children": [],
  },
  {
    "path": "/user",
    "name": "user",
    "meta": {
      "isShow": true,
      "title": "用户列表"
    },
    "props": {
      "default": false
    },
    "children": [],
  },
  {
    "path": "/",
    "name": "home",
    "meta": {},
    "props": {
      "default": false
    },
    "children": [
      {
        "path": "goods",
        "name": "goods",
        "meta": {
          "isShow": true,
          "title": "商品列表"
        }
      },
      {
        "path": "user",
        "name": "user",
        "meta": {
          "isShow": true,
          "title": "用户列表"
        }
      }
    ],
  },
  {
    "path": "/login",
    "name": "login",
    "meta": {},
    "props": {
      "default": false
    },
    "children": [],
  }
]
```


> 3. 循环渲染 菜单栏
- 我们上面能拿到routes 全部的路由信息 那么我们就可以在每一条要渲染出来的路由信息的
- meta: {
  isShow: true,    // 用于过滤
  title: "xxx列表"  // 用于展示信息
}

- 我们可以先根据 isShow 筛选出要展示的路由 然后循环遍历 筛选后的列表
```html
<!-- index属性的作用是激活当前的菜单项 如果页面路径和该index匹配了 就变成点击后的颜色 -->
  <el-menu-item v-for="item of list" :key="item.path" :index="item.path">
    <span>{{item.meta.title}}</span>
  </el-menu-item>
</el-menu>

<script lang="ts">
import { defineComponent } from 'vue';
import {useRouter} from "vue-router"

export default defineComponent({
  name: 'HomeView',
  setup() {
    const router = useRouter()

    // router.getRoutes() 该方法可以获取整个应用中所有的路由信息 也就是 routes
    let routes = router.getRoutes()

    // 注意: 我们原本是 goods user 子路由 都作为在 HomeView 的子路由出现在其children里面的 但是 使用这个方式呈现的路由数组 是将所有的路由信息 提取出来 成为一个一维的路由数组了
    console.log("routes", JSON.stringify(routes, null, 2))

    // list: 侧边栏中的 列表项(点击会展示对应的页面的按钮) 
    // 过滤应用中的路由数组中 meta isShow 为 true 的
    let list = routes.filter(item => item.meta.isShow)

    return {
      list
    }
  }

});
</script>
```


### 商品列表页面
- 后台的数据结构是
```js
const Mock = require("mockjs")

let list = Mock.mock({
  "data|10-30": [
    {
      "userId": 1,
      id: "@id",
      title: "@ctitle",
      desc: "'@cparagraph(1,2)"
    }
  ]
})

module.exports = list
```

- 上面是我们发送请求时 服务端回送的数据
- 在vue3里面 我们也可以使用 data配置项的形式 然后我们会使用 toRefs 的形式 将data中的外层直接暴露出去
```js
const data = reactive({
  list: [],
  search: {
    title: "",
    desc: "",
    page: 1,
    total: 0,
    pageSize: 5
  }
})
```

- 上面确定好数据结构和默认值了 接下来我们就要定义数据的类型
```ts
export type DataItem = {
  userId: string,
  id: number,
  title: string,
  desc: string
}

export type Search = {
  title: string,
  desc: string,
  page: number,
  total: number,
  pageSize: number
}

export type Data = {
  list: Array<DataItem> | [],
  search: Search
}
```

- 然后应用类型
```html
<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue"
import {getGoodsList} from "../api/request"

import {Data} from "../type/goods"

export default defineComponent({
  setup() {

    // 相当于 data 配置项
    const data:Data = reactive({
      list: [],
      search: {
        title: "",
        desc: "",
        page: 1,
        total: 0,
        pageSize: 5
      }
    })

    // 请求数据后 将请求到的结果 给你到 list
    ;(async () => {
      let res = await getGoodsList()
      data.list = res.data
    })()

    return {
      ...toRefs(data)
    }
  }
})
</script>
```

### 商品列表页面 -- 渲染表格
- 我们下面要将从后台获取的数据 渲染成表格 因为后台没有数据库的逻辑 所以这里我们会在前端完成分页逻辑 也就是: *数据切割*

- 思路
- 我们考虑下每一页需要展示多少条数据 所以我们要对数据数组进行切割


- data中的数据
```js
const data:Data = reactive({
  list: [],
  search: {
    title: "",
    desc: "",
    page: 1,
    total: 0,
    pageSize: 5
  }
})
```

- 整个分页的逻辑 也就是通过 page total pageSize 来完成的
- 所以我们也要关注下 分页器上有两个事件 他们也会影响到 page 和 pageSize 的值

```js
// 执行这个事件的时候 默认会传递过来 点击的第几页
const currentChange = (page: number) => {
  data.search.page = page
}

const sizeChange = (pageSize: number) => {
  data.search.pageSize = pageSize
}
```


- 接下来我们就要对数组进行切割 所以我们要根据这两个数据切割数据源 当然我们不要直接操作数据源 可以使用计算属性

  page: 
    当前你要显示第几页数据

  pageSize: 
    每页显示多少条

```html
<el-table :data="sourceList" style="width: 100%">
  <el-table-column prop="id" label="ID" width="180" />
  <el-table-column prop="title" label="标题" width="180" />
  <el-table-column prop="desc" label="详情" />
</el-table> 
<el-pagination 
  @current-change="currentChange"
  @size-change="sizeChange"
  layout="prev, pager, next" 
  :total="search.total" 
/>


<script lang="ts">
import {defineComponent, reactive, toRefs, computed} from "vue"
import {getGoodsList} from "../api/request"

import {Data} from "../type/goods"

export default defineComponent({
  setup() {

    // 相当于 data 配置项
    const data:Data = reactive({
      list: [],
      search: {
        title: "",
        desc: "",
        page: 1,
        total: 0,
        pageSize: 10
      }
    })

    ;(async () => {
      let res = await getGoodsList()
      data.list = res.data
      data.search.total = res.data.length
    })()

    // 事件
    // 执行这个事件的时候 默认会传递过来 点击的第几页
    const currentChange = (page: number) => {
      data.search.page = page
    }

    const sizeChange = (pageSize: number) => {
      data.search.pageSize = pageSize
    }

    // 计算属性
    let sourceList = computed(() => {
      // 1 -> [1, 10]
      // 2 -> [11, 20]
      // 3 -> [21, 30]
      let {page, pageSize} = data.search

      // 截取
      // start: 当 page 为 1 的时候 0 * 10
      // end: 当 page 为 1 的时候 1 * 10
      return data.list.slice((page - 1) * pageSize, page * pageSize)
    })

    return {
      ...toRefs(data),
      currentChange,
      sizeChange,
      sourceList
    }
  }
})
</script>
```


> 完成根据 输入关键字 查询列表中的数据的功能