# 权限控制:

## 什么是权限控制?
在我们开发项目的时候, 尤其是管理后台项目中, 都会遇到根据用户角色来进行相关功能的展示和隐藏  

比如超级管理员可以查看所有的模块, 普通用户只能看一部分模块, 而且还可能会有一个菜单管理模块, 可以对不同用户的角色进行相关配置 根据系统中各个角色进行相关的访问权限限制, 就是我们这里说的权限控制 

<br>

## 权限控制的两种方案:
一般我们进行权限控制的话, 有两种方案:
- 一种是前端保存一套路由表
- 一种是前端不保存路由表, 路由表信息全部由后端返回 

<br><br>

## 前端保存路由表:
1. 前端保存全部页面的路由信息, 并且在每个路由信息中保存当前路由对应的权限关键字 
2. 每次用户登录成功的时候, 后台返回当前用户对应的权限关键字
3. 前端根据后台返回的权限关键字, 遍历自己前端保存的路由表
4. 将符合用户权限的路由, 通过addRoute()动态添加到路由表中

<br>

### 具体实现:

### 1. 第一步, 在前端保存路由表(2套):
我们保存的有:
- 常用路由表
- 动态路由表

<br>

**常用路由表:**  
指的是我们注册路由的时候 经常写的routes中的信息
```js
const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    redirect: "/home",
    name: "首页",
    meta: { title: "首页", icon: "el-icon-s-help" }
  }
];
```

<br>

**动态路由表:**  
动态路由表指的就是 不是常用的路由表 而是特殊的需要对应权限才能访问的路由表

动态路由表中的meta配置项里要有权限关键字 如: ``roles:["admin", "ordinaryUsers"]``
```js
export const asyncRoute = [
  {
    path: "/asyncRoute1",
    name: "asyncRoute1",
    component: () => import("@/views/asyncRoute1"),
    meta: { 
      title: "动态路由1", 
      icon: "el-icon-s-help",

      // 当前路由对应的权限关键字, 超级管理员和普通用户
      roles: ['admin', 'ordinaryUsers']  
    }
  },
  {
    path: "/asyncRoute2",
    component: () => import("@/views/asyncRoute2"),
    name: "asyncRoute2",
    meta: { 
      title: "动态路由2", 
      icon: "el-icon-s-help",

      // 当前路由对应的权限关键字, 超级管理员
      roles: ['admin'],  
    }
  }
]
```

<br>

我们正常渲染路由的时候 传入的routes只是常用路由表
```js
const createRouter = () => {
  new Router({
    routes: constantRoutes // 这里只有常用路由, 并没有动态路由
  });
}
    
const router = createRouter()
export default router
```

<br>

### 2. 用户登录的时候 拿到后台返回的权限关键字 这里是admin或者ordinaryUsers 然后遍历动态路由表 动态添加路由
```js
// 引入路由对象和前端保存的动态路由表
import router, { asyncRoute } from '@/router'

// 过滤符合用户权限的路由表
let arr = asyncRoute.filter(item => {
  return item.meta.roles.includes('这里后台返回的权限关键字')
})
// 遍历符合权限的路由表, 动态添加路由
arr.forEach(item => {
  router.addRoute(item)
})
```

<br><br>

## 前端不保存路由表:
前端不保存, 全部由后台返回

<br>

### 实现思路:
1. 前端只保存常用路由, 比如登录页面 首页等 
2. 每次用户登录成功的时候, 后台返回一个路由数组, 数组中每个对象包含的信息就是我们的路由对象
3. 前端根据后台返回路由数组, 通过addRoute()动态添加到路由表中

<br>

### 注意:
这里有一个地方需要注意, 就是路由对象中的component字段, 后台只会返回给我们一个字符串, 但这里前端需要的是一个组件对象 所以前端需要将对象字段转换为前端组件, 然后才能创建动态路由 

<br>

### 1. 第一步, 前端只保存常用路由
```js
// route.js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
 
 
const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    redirect: "/home",
    name: "首页",
    meta: { title: "首页", icon: "el-icon-s-help" }
  }
];  // 常用路由表
 
 
 
 
const createRouter = () => {
  new Router({
    routes: constantRoutes // 这里只有常用路由
  });
}   
const router = createRouter()
export default router // 导出路由对象
```

<br>

### 2. 每次登录的时候, 遍历后台返回的路由数组, 然后动态添加路由
```js
//  遍历后台传来的路由字符串, 转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component); // 导入组件
      }
    }
    route.meta = { title: route.title, icon: route.icon || "el-icon-s-help" };
    route.name = route.label;
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    } else {
      route.children = [];
    }
    return true;
  });
  return accessedRouters;
}
 
 
const loadView = view => {
  // 路由懒加载
  return resolve => require([`@/views/${view}`], resolve);
};
 
 
//过滤路由
const menus = filterAsyncRouter('后台返回的路由数组');
//动态添加路由
router.addRoutes(menus);
```

<br><br>

### 两种方式的对比:
第一种前端自己保存一套路由表, 里面的name path icon等字段都是前端自己控制的, 这样在前端页面跳转时, 更加的稳定, 但是icon字段不能动态改变, 也不能动态增删路由对象, 每次对应角色的权限有变化的时候, 前端也需要进行改动 菜单之间的顺序是固定的 

第二种全部由后台决定, 里面的name path icon等字段都是后台返回的, 路由之间的顺序也是后台决定的 所以前台菜单的icon 顺序 名称都是可以动态改变的, 这里就可以做一个叫做菜单管理的模块, 用来动态配置前端菜单 

但是这里需要注意, path字段和组件也是后台返回的, 此时如果后台返回的path字段和前端页面跳转的path不一样的时候, 会影响前端页面的跳转, 组件不一样也会导致页面无法渲染出来 所以菜单管理中, 对于path和组件字段是通过下拉框形式绑定的, 用户不可以根据自己的意愿随意更改, 以此来减少对前端页面的影响 

<br><br>

## 网上视频的一种思路 里面有很有意思的技巧

### 路由的入口文件:
```js
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)


// 初始化路由
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
```

上面就是我们路由的一个大致的配置代码 上面的路由信息都是写死的 我们已经知道都有什么页面 所有的页面都是写死的

<br>

### 需求:
现在我们根据用户的权限不同 所能看到的页面和可操作性也不同 比如:  
- admin: 所有页面都能看到  
- vip: 属于vip权限的页面

每一个用户的权限所能看到的页面是不同的 所以我们要根据不用的用户去加载不用的页面

<br>

### 动态路由:
我们通过条件判断 和 addRouter() 的方式 让里面添加路由

<br>

### 准备动态路由:
```js
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)


// 初始化路由
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  }
]


// 准备动态路由
export const DynamicRoutes = [
  {
    path: "",   // 根目录
    component: Layout,
    name: "container",

    // 容器页面 到根目录页面后 就重定向到 Layout 页面
    redirect: "home",   

    // 有一些页面 我们是否需要登录后才能进入 所以我们要加入requiresAuth认证 如果没有这个属性所有的页面随便进
    meta: {
      requiresAuth: true,
      name: "首页"

      // 扩展 meta 里面还可以放下面这些
      // 1.权限 2.内存缓存, 单页面切换
      // meta: { requiresAuth: true ,keepAlive:true}
    },
    children: [
      {
        path: "home",
        component: Home,
        name: "Home",
        meta: {
          // meta里面加上name 是为了一会进行匹配规则
          name: "首页",
          icon: "icon-name"
        }
      }
    ]
  },

  // 404页面
  {
    path: "/403",
    component: Forbidden,
  },
  {
    // 所有没有匹配的路径错误的页面都是404
    path: "*",
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
```

<br>

### 服务器:
创建了两个json数据 针对 admin 和 vip 权限的
```json
{
  // code码 0: 登录成功
  "code": 0,
  "message": "登录成功",
  "data": {
    // 模拟下 jwt 生成的token
    "token": "admian"
  }
}

{
  "code": 0,
  "message": "登录成功",
  "data": {
    // 模拟下 jwt 生成的token
    "token": "vip"
  }
}
```

<br>

用户不同 回传的数据不一样  
- localhost:3300/login?user=admin  
- localhost:3300/login?user=vip

```js
const express = require("express")
const app = express()

const vipLogin = require("./data/vip_login.json")
const adminLogin = require("./data/admin_login.json")



app.post("/login", (req, res) => {

  // 根据用户的参数不同 我们返回不同的数据
  let url = new URL(req.url)
  // 然后从参数中读取前端传递过来的参数 user
  let user = url.searchParams.user

  // 根据参数 回送不同的数据
  if(user == "admin") {
    res.send(adminLogin)
  } else {
    res.send(vipLogin)
  }

})

app.listen(3300, ()=> {})
```

<br>

### 请求封装:
```
| - utils
  - http.js   
  - baseURL.js
```

<br>

### baseURL.js
对根路径的处理 针对不跨域的时候有用
```js
const baseUrl = "http://localhost:3300"
export default baseUrl
```

<br>

### 跨域的时候: 
1. cors
2. proxy: 开发环境下 我们用proxy代理

<br>

### http.js 是对axios请求的封装
**请求拦截:**  
我们做了token的添加

<br>

**响应拦截:**  
对错误信息做了处理   
在对响应拦截的时候 直接return res.data 这样省着前端去.data了 挺好

```js
import axios from "axios"
import store from "@/store/index.js"
import baseURL from "./baseUrl"

import {Message} from "elment-ui"

const http = {}

let instance = axios.create({
  timeout: 5000
})

// 请求拦截 每次发送请求都会加上token
instance.interceptors.request.use(
  function(config) {
    // 请求头添加token token保存在vuex里面
    if(store.state.UserToken) {
      config.headers.Authorization = store.state.UserToken
    }

    return config
  },
  function(error) {
    return Primise.reject(error)
  }
)


// 响应拦截
instance.intercetors.response.use(
  // 传入了两个回调

  res => {
    return res.data
  },

  err => {
    if(err && err.response) {
      switch(err.response.status) {
        case 400: 
          err.message = "请求出错"
          break
        case 401:
          Message.waring({
            message: "授权失败 请重新登录"
          })
          store.commit("LOGIN_OUT")
          setTimeout(() => {
            location.reload()
          }, 1000)
          return 

        case 403:
          err.message = "拒绝访问"
          break
        case 404:
          err.message = "请求错误 未找到该资源"
          break
        case 500:
          err.message = "服务器出错"
          break
      } 
    } else {
      err.message = "连接服务器失败"
    }
    Message.error({
      message: err.message
    })

    return Promise.reject(err.reponse)
  }
)

// get
http.get = function(url, options) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, options)
      .then(res => {
        // 说明登录成功
        if(res.code == 0) {
          resolve(res.data)
        } else {
          Message.error({
            message: res.message
          })
          reject(res.message)
        }
      })
      .catch(e => {
        console.log(e)
      })
  })
}

// post
http.post = function(url, data, options) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, options)
      .then(res => {
        // 说明登录成功
        if(res.code == 0) {
          resolve(res.data)
        } else {
          Message.error({
            message: res.message
          })
          reject(res.message)
        }
      })
      .catch(e => {
        console.log(e)
      })
  })
}

export default http
```

<br>

### api.js
使用上面封装的 http 请求 然后封装具体的url
```
| - api
  - index.js
```

```js
import axios from "../utils/http"

// 权限请求
export function fetchPermission() {

}

// login
export function login(user) {
  return axios.get("/api/login?user=" + user)
}
```

<br>

### 前端页面:
当用户点击登录的时候的逻辑
```html
账号: <input type name="account" v-model.trim="account">

<button id="loginBtn" @click="login">
  登录
</button>
```

```js
import {login} from "../../api"

data() {
  return {
    account: "",
  }
},

methods: {
  async login() {
    // account 就是用户名
    let data = await login(this.account)
    console.log(data)
    /*
      {
        "code": 0,
        "message": "登录成功",

        "data": {
          "token": "vip"
        }
      }


      {token: vip}
    */
   let token = data.token

   // 这里先看下面的store的逻辑
   
   // 将获取的token保存到vuex中(同时也保存到了本地存储中)
   this.$store.commit("LOGIN_IN", token)

   // 登录成功后 跳转到 根目录
   this.$router.replace("/")
  }
}
```

<br>

### token存储:
上面我们在用户登录成功后 能拿到该用户的token 那接下来我们要将token保存起来

这个存储要保存两份
1. 本地: 用来判断下一次用户是否还需要登录

2. vuex:
```
| - store
  - defaultState.js
  - mutations.js
  - index.js
```

<br>

### defaultState.js
从本地存储中获取 和 设置 token 这么设置的好处是  

- 当我们读取 UserToken 的时候就是 读取  
- 当我们 UserToken = value 的时候就是设置

当普通的对象来处理的, **我们将state对象设置为了 计算属性**

```js
export default {
  get UserToken() {
    return localStoreage.getItem("token")
  },
  set UserToken(value) {
    localStoreage.setItem("token", value)
  }
}
```

<br>

### mutations.js
mutations.js是用来真实操作的  defaultState.js 做为从本地存储的中转逻辑

当我们设置 UserToken 的时候 就是修改本地存储

这样能上面的 get set 配合起来 能 *同时完成* 存储设置到本地 和 修改vuex中的数据的作用

vuex - 本地存储 关联起来了

是个技巧

```js
export default {
  LOGIN_IN(state, token) {
    state.UserToken = token
  },
  LOGIN_OUT(state, token) {
    // 删除token
    state.UserToken = ""
  },
}
```

<br>

### **store**
```js
import Vue from "vue"
import Vuex from "vuex"

import state from "./defaultState.js"
import mutations from "./mutations.js"

Vue.use(Vuex)

export default new Vuex.Stroe({
  // 通过state.UserToken 可以调用
  state: state,
  mutations: mutations
})
```

<br><br>

### 权限处理:

用户成功登录之后 下一次登录就不用再次的输入信息 这时候我们就要加上权限处理了

我们回到 router 文件目录
```
  | - router
    - index.js
    - permission.js
```

```js
// 先引入路由
import router from "./index"

import store from "@/store/index.js"

router.beforeEach((to, from, next) => {
  // 我们判断下当前token是否存在 来判断用户是否登录 两种情况 登录 和 未登录

  // 登录逻辑:
  // 处理登录用户的权限问题

  // 没有登录逻辑
  // 根据 meta 标签中的 requiresAuth 字段 看看是否需要登录 不需要登录就放行

  if(!store.state.UserToken) {
    // 取反 用户没有登录 没有登录也需要两种情况 一种是 访问的页面是否需要登录 和 不需要登录

    // matched里面是 嵌套路由的所有路由 是一个数组
    if(to.matched.length > 0 && !to.matched.some(item => item.meta.requiresAuth)) {
      // 取反了 就不需要登录
      next()
    } else {
      next({
        path: "login"
      })
    }

  } else {
    // 用户已经登录了 说明他所有的页面都能进了 这里我们就需要处理路由的访问权限了 看看登录的这个人你能看到什么页面 这个人权限所对应的页面
    
  }
})
```

<br>

### 权限处理的逻辑:
1. 先定义好 全部的路由地址
2. 通过用户不同向后台请求不同的用户权限数据
3. 对用户权限做对比 那我们请求到的用户权限数据 对比 已经定义好的全部路由
将 请求数据 和 全部路由 能对上的部分 取出来作为路由配置

对不上的部分说明不具备权限就忽略它

<br>

### 1. 定义全部路由
```
 | - router
  - dynamic-router.js
  - index.js
  - permission.js
```

dynamic-router.js
```js
// 需要权限判断的路由
const dynamicRoutes = [
  {
    path: "/order",
    component: Order,
    name: "order-manage",
    meta: {
      name: "订单管理",
      icon: "icon-email"
    },
    chlidren: [
      {
        path: "list",
        component: OrderList,
        name: "order-list",
        meta: {
          name: "订单列表",
          icon: "icon-email"
        },
      }
    ]
  }
]
```

我们拿 meta: { name: "订单列表" }   

我们拿 meta 中 的name属性 和 后台请求数据做对比 如果两个name相等就说明它具备这个权限 

<br>

### 2.服务器端的逻辑

**1. 准备好 权限相关的文件数据**
```
| - data
  - admin_permission.json
  - vip_permission.json
  - admin_login.json
  - vip_login.json
```

<br>

admin_permission.json  
admin是全部的权限  
也就前端的全部路由中的name字段都抽离出来了 数据的层次结构都和前端的路由数据结构一致
```js
{
  code: 0,
  message: "获取权限成功",
  data: [
    {
      name: "订单管理",
      children: [
        {
          name: "订单列表"
        },
        {
          name: "生产管理",
          children: [
            {
              name: "生产列表"
            }
          ]
        }
      ]
    }
  ]
}
```

<br>

**2. 增加一个前端访问接口**  
根据登录的用户不同 响应回不同的权限列表数据

```js
const adminPermission require("/admin_permission.json")

app.get("/permission", (req, res) => {
  let url = new URL(req.url)
  let user = url.searchParams.user

  if(user == "admin") {
    res.send(adminPermission)
  } else {
    res.send(vipPermission)
  }
})
``` 

<br>

### 前端的逻辑:
**1. 增添一个请求权限数据的api**
```js
import axios from "../utils/http"
import store from "../store"

// 权限请求
export function fetchPermission() {
  return axios.get("/api/permission?user=" + store.state.UserToekn)
}

// login
export function login(user) {
  return axios.get("/api/login?user=" + user)
}
```

<br>

**2. 创建一个对比的逻辑**
```
| - utils
  - recursion-router.js
```

<br>

这个文件中我们写两个方法:  
1. 用来比对路由权限
2. 指定返回的默认路由
```js
export function recursionRouter(userRouter = [], allRouter = []) {
  let realRoutes = []

  // allRouter是前端定义的全部路由
  // userRouter是后台传递过来的权限路由name表
  allRouter.forEach((item, index) => {
    userRouter.forEach((v, i) => {
      if(v.name == item.meta.name) {
        // 说明要这条数据 然后我们还要比对子元素
        if(v.children && v.children.length > 0) {
          // 如果有子元素就继续比对
          item.children = recursionRouter(v.children, item.children)
        }
        realRoutes.push(item)
      }
    })
  })

  // 过滤之后 符合
  return realRoutes
}



export function setDefaultRouter(routes) {
  routes.forEach((item. index) => {
    if(item.children && item.children.length > 0) {
      // 利用name进行跳转
      item.redirect = {
        name: v.children[0].name,
        setDefaultRouter(v.children)
      }
    }
  })
}
```

<br>

**3. 将我们请求回来的权限数据 保存在vuex中**
```
| - store
  | - modules   权限相关
    - index.js
    - permisstion.js
```

<br>

permisstion.js  

这里做路由权限比对的工作 然后返回一个前端能够加载的路由地址
```js
import {fetchPermission} from "../../api"
import router, {DynamciRoutes} from "./router/index.js"

import dynamicRouter from "./router/dynamic-router"

import {recursionRouter, setDefaultRouter} from "./utils/recursion-router"

export default {
  namespaced: true,
  state: {
    // 所有路由
    permissionList: null,
    // 导航菜单
    sidebarMenu: [],
    // 高亮用的当前菜单
    currentMenu: []

  },
  mutations: {
    // 设置权限的操作
    SET_PERMISSION(state, routes) {
      state.permissionList = routes
    },
    // 换用户登录了 我们要将之前的数据清理掉
    CLEAR_PERMISSION(state) {
      state.permissionList = null
    },
    // 设置菜单
    SET_MENU(state, menu) {
      state.sidebarMenu = menu
    }
    // 清理菜单
    CLEAR_MENU(state) {
      state.sidebarMenu = null
    }
  },
  // 异步访问一定要在action里面
  actions: {
    async FETCH_PERMISSION({commit, state}) {
      let permissionList = await fetchPermission()
    }
  }
}
```

<br>

modules / index.js
```js
import permission from "./permission"
export default {
  permission
}
```

<br>

store / index.js
```js
import Vue from "vue"
import Vuex from "vuex"

import state from "./defaultState.js"
import mutations from "./mutations.js"

import modules from "./modules"

Vue.use(Vuex)

export default new Vuex.Stroe({
  state: state,
  mutations: mutations,


  modules: modules
})
```

<br>

**3. permisstion.js怎么访问？**
p9 看了一半 看不动了


<br><br> 

## 使用 directives 实现权限管理
**1. 在 本地存储 中设置 所有权限的列表 类型是数据**

permission : ["create", "edit"]

<br>

**2. 自定义指令**
```
| - directives
  - has.js
```

<br>

一个指令就是一个对象
```js
export default {
  // 指令绑定到元素上的时候的回调
  bind(el, bindings) {

    // 所有权限
    const permissions = JSON.parse(localStoreage.getItem("permissions"))

    // 需要的权限
    const needPermission = bingings.value

    const hasPermission = permission.includes(needPermission)

    if(!hasPermission) {
      el.style.display = "node"

      // 我们执行到这里的时候 dom树还没有渲染完毕 这时候还不能操作dom树 所以机上了setTimeout
      setTimeout(() => {
        // 为了不让用户操作控制台 接触display
        el.parentNode.removeChild(el)
      }, 0)
    }
  }
}
```

<br>

### 前端页面:
```html
<button v-has="'create'">创建</button>
<button v-has="'edit'">编辑</button>
<button v-has="'delete'">删除</button>
```

```js
import hasDirectives from "./directives/has"
export default {
  name: "App",
  directives: {
    // v-has
    has: hasDirectives
  }
}
```

<br><br>

## 使用 router.addRoutes(数组) 实现权限管理
参数: 我们在配置routes的时候 配置的形式是一个数组 这里面我们也要添加一个routes数组

格式:
```js
routes = [
  {
    path:
    name:
    components:
  }
]
```

<br>

### **router.addRoute({一条路由})**

### **router.addRoutes(路由数组)  -- vue3 中已经废弃**
动态添加更多的路由规则 参数必须是一个符合 routes 选项要求的数组   
当原路由表中有name属性 且新添加的路由也有name属性 则会覆盖

<br>

### **回顾下普通路由的配置**
```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]
const router = new VueRouter({
  routes
})
export default router


// 使用router.addRoutes改造上面的配置,实现动态添加pageA
const router = new VueRouter({
  {
    path: '/',
    name: 'Home',
    component: Home
  }
})

let route=[
  {
    path: '/pageA',
    name: 'pageA',
    component: pageA,
  }
]

router.addRoutes(route);
export default router


// 添加之后等效于:
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pageA',
    name: 'pageA',
    component: pageA,
  }
]
const router = new VueRouter({
  routes
})
export default router
```

<br>

### **利用该方法实现权限管理**
设置一个路由数组, 设置用户权限 commonUser = ['pageA','pageB']  
这样就可以访问pageA, pageB路由了

```js
let route=[
  {
    path: '/pageA',
    name: 'pageA',
    component: pageA,
  },
  {
    path: '/pageB',
    name: 'pageB',
    component: pageB,
  },
  {
    path: '/pageC',
    name: 'pageC',
    component: pageC,
  }
]

let commonUser = ['pageA','pageB']
let commonUserRoute = route.filter(function(page){
    return commonUser.includes(page.name)
})

console.log(commonUserRoute);
router.addRoutes(commonUserRoute);
```

<br><br>

# Vue前后端动态路由权限
路由权限完全存在后端的 通过请求将该用户的路由权限列表返回到前端

前端通过属性结构的处理 最终生成一个新的路由表 合并到本身的静态路由中去

<br>

## 后台逻辑
后台我们选择使用 koa2 来搭建 这里我们会使用 koa2的脚手架(koa-generator)

**koa2默认启动 3000 端口**

<br>

### 脚手架的安装方式:
```js
// 安装 koa-generator 脚手架
npm install -g koa-generator

// 通过命令启动安装项目 koa2 projectName -e:代表使用模板引擎ejs
koa2 server

// 进入文件夹 安装依赖
cd server && npm install

// 启动项目
npm run dev

// 解决跨域
npm i koa2-cors
```

<br>

### 单独使用koa2时 需要用到的依赖 (这里我们没有用)
```js
npm i koa2
npm i koa-router

// 用于静态管理
npm i koa-static

// 用于链接数据库 (没用)
npm i mysql

// 用于跨域处理
npm i koa2-cors

// 用于处理post请求
npm i koa-bodyparser
```

<br><br>

## 路由权限是怎么样加入路由中的?

### 方式1:

### 第一步:
用户登录后 后端会返回一个uid 将属于用户的uid 调用路由权限接口 传到后台

<br>

### 第二步:
后端将用户对应的路由权限列表返回给前端 JSON数据

<br>

### 第三步:
**拿到后台返回的数据后 首先进行树形结构化**

后台返回的会是扁平化的数据, 而不是结构化好的数据(扁平化数据 -> 树形结构数据) 

数据结构化应该是前端处理, 后台仅会将这个用户对应的路由权限的列表返回 前端会根据 pid 自己形成树形的结构

这样才是正确的任务分配的情况, 在任务分配上一定要搞明白 谁要完成什么 不要指望后台将所有的事情都帮你做了

如果后台树形结构做好了 将它返回给前端 如果前端的需求变了的话 比如 不要某个字段了 这些不就变成后台的工作了么

前端的需求 后台是不知道的

<br>

### 第四步:
将树形结构化的数据 变成 vue路由结构

<br>

### 第五步:
将转化好的路由结构动态的加入到静态路由结构中

<br>

### 第六步:
根据树形结构化的路由结构 生成菜单组件 

<br>

### 方式2:(参考)
路由管理是从数据库中取出数据表 然后将其变成树 然后再转成路由的

有还有一种方式 在前端先把所有的路由写好静态的放在路由表中 然后从后台请求回来数据后 对比我们写好的静态表 对其进行删减 然后再合并到路由中去

<br><br>

## 后台代码:
```js
| - server
  - app.js
  | - views
    - error.pug
    - index.pug
    - layout.pug
  | - routes
    - index.js

  | - data        
    - user.js     // 用户表
    - router.js   // 路由表
```

<br>

### app.js
```js
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require("koa2-cors")

const index = require('./routes/index')

// error handler
onerror(app)


// middlewares
// 解决跨域 指定源
app.use(cors({
  origin: function(ctx) {
    return "http://localhost:8080"
  }
}))

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// 这是pug模版
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
```

<br>

### data/user.js
该数据中写了 有哪些用户 这些用户所对应的路由权限有哪些

<br>

**auth:**   
记录了 路由表中的id字段 表示该用户有访问哪些路由中的权限

我们会根据auth中的id 从路由权限表中拿出符合该用户的路由信息
```js
module.exports = [
  {
    id: 1,
    name: "sam",

    // 数字为路由表中的id 下面的含义为2个顶级路由 下面各有一个子级路由
    auth: [2, 3, 6, 7]
  },
  {
    id: 2,
    name: "erin",
    auth: [2, 3, 5, 6, 7, 8]
  },
  {
    id: 3,
    name: "nn",
    auth: [2, 3, 4, 5, 6, 7, 8]
  },
]
```
<br>

### data/router.js
该数据中写了 路由权限表 每一项相当于一条路由信息
```js
// 路由表, id: 1 的是通用路由 所以就不放在这里了 从id: 2开始
module.exports = [
  {
    id: 2, 
    // 证明它没有父级 为第一层路由
    pid: 0,
    // 路由配置文件中的path
    path: "/course",
    // 对于父级路由来说 link 是没有意义的 子级才会有link 因为我们要点击 点击跳转到哪里 相当于 link to
    // link: "",
    // 页面组件的name值
    name: "Course",
    // 显示在菜单组件中的名称
    title: "课程管理"
  },
  {
    id: 3, 
    // 通过pid表示 该数据成员为 id:2 的子级
    pid: 2,

    // 子级路由前面没有 /
    path: "operate",
    // 子级路由要有link 因为我们要点击 点击跳转到哪里
    link: "/course/operate",
    name: "CourseOperate",
    title: "课程操作"
  },
  {
    id: 4, 
    // 它是id:3的子路由
    pid: 3,
    path: "info_data",
    link: "/course/operate/info_data",
    name: "CourseInfoData",
    title: "课程数据"
  },
  {
    id: 5, 
    // 它是id:2的子路由
    pid: 2,
    path: "add",
    link: "/course/add",
    name: "CourseAdd",
    title: "增加课程"
  },

  // 第二个顶级路由
  {
    id: 6, 
    // 顶级路由
    pid: 0,
    path: "/student",
    name: "Student",
    title: "学生管理"
  },
  // 下面是id为6下面的两个子路由
  {
    id: 7, 
    pid: 6,
    path: "operate",
    link: "/student/operate",
    name: "StudentOperate",
    title: "学生操作" 
  },
  {
    id: 8, 
    pid: 6,
    path: "add",
    link: "/student/add",
    name: "StudentAdd",
    title: "增加学生"
  },
]
```

<br>

### routes/index.js
我们处理了 post 请求 
```js
const router = require('koa-router')()
const users = require("../data/user")
const routes = require("../data/router")

// 这里还应该有鉴权的逻辑 但是没有写 post(接口, 鉴权函数, (req, res))
router.post('/user_router_auth', async (ctx, next) => {
  const {uid} = ctx.request.body

  if(uid) {
    // 根据uid从routes表中 选出符合用户权限的路由 放在authRouterInfo数组中
    let authRouterInfo = []

    // 根据uid从user表中找到该用户
    const userInfo = users.filter(user => uid == user.id)[0]

    // 拿到该用户中的 auth字段中的每一个id
    userInfo.auth.forEach(authId => {

      // 遍历routes数组 找到authId和routeId相同的数据
      routes.forEach(route => {
        if(route.id == authId) authRouterInfo.push(route)
      })
    })

    // 返回给后台
    ctx.body = authRouterInfo
  } else {
    next()
  }
  
})

module.exports = router
```

<br><br>

## 前台代码:

### 前端请求逻辑:
我感觉用get也行啊 他下面写的很怪 很多地方都没有必要
``/src/api/index.js``
```js
export function getUserRoutes(uid) {
  return axios({
    url: "http://localhost:3000/user_router_auth",
    method: "post",
    // headers: {
    //   "Content-type": "application/x-www-form-urlencoded"
    // },
    // data: qs.stringify({uid})
    data: {uid}
  }).then(res => res.data).catch(err => Promise.reject(err))
}
```

<br>

### 将扁平化数据转换为树形结构数据的工具函数
关于这个部分可以看笔记 小野集锦 中有写
```
| - src
  | - utils
    - utils
```

```js
export function formatRouterTree(data) {
  let parents = data.filter(route => route.pid == 0)
  let children = data.filter(route => route.pid != 0)

  dataToTree(parents, children)

  return parents

  function dataToTree(parents, children) {
    parents.map(p => {
      children.map((c, i) => {
        if(c.pid == p.id) {

          let _children = JSON.parse(JSON.stringify(children))
          // 我们要把当前遍历出来的c删掉 因为我们要找c的子级 这时就不能再有自己 为了删掉我们上面才需要复制一份
          _children.splice(i, 1)

          // 让当前的c作为父级, 再把没有c的_children放入
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

### 组织Vuex 
我们用户的相关信息 比如 uid 肯定是要存放在 vuex 中的

我们在这个部分会做在actions请求数据 将请求回来的加工后的路由表 放入vuex中

vuex中保存的是当前登录用户 一个人的信息

```
| - store
  - state.js
  - actions.js
  - mutations.js
  - index.js
```

<br>

**index.js**
```js
import Vue from "vue"
import Vuex from "vuex"

import state from "./state"
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  actions,
  mutations,
})

export default store
```

<br>

**state.js**  
```js
// 导出一个 {}
export default {
  uid: 2,
  // 标识该用户是否有特殊的路由权限表
  hasAuth: false,
  // 保存树形结构的路由数据
  userRoutes: []
}
```

<br>

**actions.js**  
```js
import { getUserRoutes } from "@/api"
import {formatRouterTree} from "../utils/utils"

export default {
  async setUserRoutes({commit, state}) {
    // 将state中的uid传入
    const userRoutes = await getUserRoutes(state.uid)

    // 将请求回来的 userRoutes 转为树形结构 保存到state中的userRoutes里面
    // console.log(JSON.stringify(userRoutes, null, 2))

    let payload = formatRouterTree(userRoutes)
    console.log(payload)

    // 通知 mutations 存储数据
    commit("setUserRoutes", payload)
    // 该用户有权限路由 所以设置为true
    commit("setAuth", true)
  }
}
```

<br>

**mutation.js**  
```js
export default {
  setAuth(state, auth) {
    state.hasAuth = auth
  },
  setUserRoutes(state, payload) {
    state.userRoutes = payload
  }
}
```

<br>

### 将树形结构路由权限表 转成 路由表:
```
| - src
  | - utils
    - utils
```

说白了我们就是想将 树形结构数据转成 routes配置项
```js
const routes = [
  path: "/home",
  name: "Home",
  component: Home
]
```

<br>

```js
export function generateRouter(userRoutes) {
  let newRoutes = userRoutes.map(r => {
    // 路由对象
    let route = {
      path: r.path,
      name: r.name,
      component: () => import(`@/view/${r.name}`)
    }

    // 如果 route.children 有children属性的时候 说明有子级路由 我们要递归操作
    if(r.children) {
      // 我们给上面的 route 增加 children 属性 并递归放入信息
      route.children = generateRouter(r.children)
    }

    // 每次循环都要将route对象导出去
    return route
  })

  return newRoutes
}
```

<br>

### 将组织好的路由表 在路由配置中使用
逻辑会在进入下一条路由前 决定是否发送请求 请求路由权限列表

组件中有2级路由的时候 组件中要写 router-view

```js
import { generateRouter } from "@/utils/utils"
import VueRouter from "vue-router"
import store from "../store/index"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../view/Home.vue")
  },

  // 找不到页面的情况下 
  {
    path: "*",
    name: "NotFound",
    component: () => import("../view/NotFound.vue")
  },
]

const router = new VueRouter({
  routes,
  mode: "history"
})


// 利用路由守卫
router.beforeEach(async (to, from, next) => {
  // 判断 state 中的 hasAuth 字段 是否为真 
  if(!store.state.hasAuth) {
    // 如果不是真则请求数据, 请求回来后 就会存到vuex中
    await store.dispatch("setUserRoutes")
    const newRoutes = generateRouter(store.state.userRoutes)
    console.log("路由信息:", newRoutes)

    // 标签动态添加路由
    newRoutes.forEach(route => router.addRoute(route))

    // 然后该去哪去哪
    next({path: to.path})

  } else {
    // 如果为真 直接放行
    next()
  }
}) 

export default router
```

<br>

## 递归组件
我们要创建 MenuItem.vue 

需求: 在侧边栏中点击菜单项可以进行切换

<br>

### SideBar
```html
<template>

<div class="side-bar">
  <ul>
    <li>
      <router-link to="/">首页</router-link>
    </li>
  </ul>

  <!-- 循环树形结构的数据 -->
  <div v-for="(item, index) of $store.state.userRoutes">
    <MenuItem :key="index" :item="item" />
  </div>
</div>

</template>

<script>
import MenuItem from './MenuItem.vue';


export default {
  name: "SideBar",
  components: { MenuItem }
}
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

<br>

### MenuItem
它就是递归组件 

```html
<template>

<div>
  <!-- 渲染后子级的 -->
  <ul v-if="item.children && item.children.length > 0">
    <li>
      <!-- 顶级路由没有link 所以我们使用 path -->
      <router-link 
        :to="item.link || item.path"
      >{{item.title}}</router-link>
      <div 
        v-for="(c, i) of item.children" 
        :key="i">
        <MenuItem :item="c" />
      </div>
    </li>
  </ul>
  <ul v-else>
    <li>
      <router-link 
        :to="item.link || item.path"
      >
      {{item.title}}
      </router-link>
    </li>
  </ul>
</div>

</template>

<script>

export default {
  // 递归组件一定会用到name的
  name: "MenuItem",
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
```

<br>

### 补充
在登录状态下 后台更改了用户的权限是没有用的 不能是后台改变了用户的权限 用户能实时的更新权限 一定是退出登录 然后重新登录才可以有新的权限

后台要记录用户的登录状态 如果用户现在有登录状态 那么是不返回的 只要是有登录状态就不应该返回权限

登出以后 后台在改会在redis里面改 用户的状态信息一般都是保存在redis里面 重新登录再发送权限

<br><br>