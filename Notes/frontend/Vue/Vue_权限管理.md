### 权限控制
- 什么是权限控制
- 在我们开发项目的时候，尤其是管理后台项目中，都会遇到根据用户角色来进行相关功能的展示和隐藏。比如超级管理员可以查看所有的模块，普通用户只能看一部分模块，而且还可能会有一个菜单管理模块，可以对不同用户的角色进行相关配置。根据系统中各个角色进行相关的访问权限限制，就是我们这里说的权限控制。


> 权限控制的两种方案
- 一般我们进行权限控制的话，有两种方案，
- 一种是前端也保存一套路由表，
- 一种是前端不保存路由表，路由表信息全部由后端返回。


> 我们先看第一种的实现思路：
- 1. 前端保存全部页面的路由信息，并且在每个路由信息中保存当前路由对应的权限关键字。
- 2. 每次用户登录成功的时候，后台返回当前用户对应的权限关键字
- 3. 前端根据后台返回的权限关键字，遍历自己前端保存的路由表
- 4. 将符合用户权限的路由，通过addRoute()动态添加到路由表中


> 具体实现
> 1. 第一步，在前端保存一套路由表
- 我们保存的有
  常用路由表
  动态路由表

- 常用路由表
- 为我们注册路由的时候 填写到路由配置项里面的路由表
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

- 动态路由表
- 动态路由表中的meta配置项里有 roles:["admin", "ordinaryUsers"] 权限关键字
```js
export const asyncRoute = [
  {
    path: "/asyncRoute1",
    name: "asyncRoute1",
    component: () => import("@/views/asyncRoute1"),
    meta: { 
      title: "动态路由1", 
      icon: "el-icon-s-help",
      roles: ['admin', 'ordinaryUsers']  
      // 当前路由对应的权限关键字，超级管理员和普通用户
    }
  },
  {
    path: "/asyncRoute2",
    component: () => import("@/views/asyncRoute2"),
    name: "asyncRoute2",
    meta: { 
      title: "动态路由2", 
      icon: "el-icon-s-help",
      roles: ['admin'],  
      // 当前路由对应的权限关键字，超级管理员
    }
  }
]
```

- 我们正常在路由配置对象中传入的只是常用路由表
```js

const createRouter = () =>
    new Router({
        routes: constantRoutes // 这里只有常用路由，并没有动态路由
    });
    
const route = createRouter()
export default route
```


> 2. 用户登录的时候 拿到后台返回的权限关键字 这里是admin或者ordinaryUsers 然后遍历动态路由表 动态添加路由
```js
// 引入路由对象和前端保存的动态路由表
import router,{ asyncRoute } from '@/router'
// 过滤符合用户权限的路由表
let arr = asyncRoute.filter(item=>{
  return item.meta.roles.includes('这里后台返回的权限关键字')
})
// 遍历符合权限的路由表，动态添加路由
arr.forEach(item=>{
  route.addRoute(item)
})
```


> 我们先看第二种的实现思路：
- 前端不保存，全部由后台返回

> 实现思路：
- 1. 前端只保存常用路由，比如登录页面、首页等。
- 2. 每次用户登录成功的时候，后台返回一个路由数组，数组中每个对象包含的信息就是我们的路由对象
- 3. 前端根据后台返回路由数组，通过addRoute()动态添加到路由表中

- 注意：
- 这里有一个地方需要注意，就是路由对象中的component字段，后台只会返回给我们一个字符串，但这里前端需要的是一个组件对象。所以前端需要将对象字段转换为前端组件，然后才能创建动态路由。


> 1. 第一步，前端只保存常用路由。
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
 
 
 
 
const createRouter = () =>
    new Router({
        routes: constantRoutes // 这里只有常用路由
    });
    
const route = createRouter()
export default route // 导出路由对象
```

> 2. 每次登录的时候，遍历后台返回的路由数组，然后动态添加路由。
```js
//  遍历后台传来的路由字符串，转换为组件对象
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


> 两种方式的对比
- 第一种前端自己保存一套路由表，里面的name、path、icon等字段都是前端自己控制的，这样在前端页面跳转时，更加的稳定，但是icon字段不能动态改变，也不能动态增删路由对象，每次对应角色的权限有变化的时候，前端也需要进行改动。菜单之间的顺序是固定的。

- 第二种全部由后台决定，里面的name、path、icon等字段都是后台返回的，路由之间的顺序也是后台决定的。所以前台菜单的icon、顺序、名称都是可以动态改变的，这里就可以做一个叫做菜单管理的模块，用来动态配置前端菜单。

- 但是这里需要注意，path字段和组件也是后台返回的，此时如果后台返回的path字段和前端页面跳转的path不一样的时候，会影响前端页面的跳转，组件不一样也会导致页面无法渲染出来。所以菜单管理中，对于path和组件字段是通过下拉框形式绑定的，用户不可以根据自己的意愿随意更改，以此来减少对前端页面的影响。

---

### 网上视频的一种思路 里面有很有意思的技巧
> 路由的入口文件
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

- 上面就是我们路由的一个大致的配置代码 上面的路由信息都是写死的 我们已经知道都有什么页面 所有的页面都是写死的


- 需求
- 现在我们根据用户的权限不同 所能看到的页面和可操作性也不同
- 比如:
- admin: 所有页面都能看到
- vip: 属于vip权限的页面

- 每一个用户的权限所能看到的页面是不同的 所以我们要根据不用的用户去加载不用的页面

---------

> 动态路由
- 我们通过条件判断 和 addRouter() 的方式 让里面添加路由


> 准备动态路由
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
      // 1.权限 2.内存缓存，单页面切换
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


> 服务器
- 创建了两个json数据 针对 admin 和 vip 权限的
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


- 用户不同 回传的数据不一样
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

------

> 请求封装

| - utils
  - http.js   
  - baseURL.js

> baseURL.js
- 对根路径的处理
- 针对不跨域的时候有用
```js
const baseUrl = "http://localhost:3300"
export default baseUrl
```

- 跨域的时候
- 1. cors
- 2. proxy: 开发环境下 我们用proxy代理


> http.js 是对axios请求的封装
- 请求拦截:
- 我们做了token的添加

- 响应拦截:
- 对错误信息做了处理
- 在对响应拦截的时候 直接return res.data 这样省着前端去.data了 挺好

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


> api.js
- 使用上面封装的 http 请求 然后封装具体的url

  | - api
    - index.js

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

---

> 前端页面
- 当用户点击登录的时候的逻辑
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


> token存储
- 上面我们在用户登录成功后 能拿到该用户的token 那接下来我们要将token保存起来

- 这个存储要保存两份
- 1. 本地:
- 用来判断下一次用户是否还需要登录

- 2. vuex:

  | - store
    - defaultState.js
    - mutations.js
    - index.js


> defaultState.js
- 从本地存储中获取 和 设置 token
- 这么设置的好处是
- 当我们读取 UserToken 的时候就是 读取
- 当我们 UserToken = value 的时候就是设置

- 当普通的对象来处理的

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


> mutations.js
- mutations.js是用来真实操作的 
- defaultState.js 做为从本地存储的中转逻辑

- 当我们设置 UserToken 的时候 就是修改本地存储

- 这样能上面的 get set 配合起来 能*同时完成* 存储设置到本地 和 修改vuex中的数据的作用

- vuex - 本地存储 关联起来了

- 是个技巧

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



> store
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

------

> 权限处理

- 用户成功登录之后 下一次登录就不用再次的输入信息
- 这时候我们就要加上权限处理了

- 我们回到 router 文件目录

  | - router
    - index.js
    - permission.js


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

> 权限处理的逻辑
- 1. 先定义好 全部的路由地址
- 2. 通过用户不同向后台请求不同的用户权限数据
- 3. 对用户权限做对比 那我们请求到的用户权限数据 对比 已经定义好的全部路由
- 将 请求数据 和 全部路由 能对上的部分 取出来作为路由配置

- 对不上的部分说明不具备权限就忽略它


> 1. 定义全部路由
 | - router
  - dynamic-router.js
  - index.js
  - permission.js

- dynamic-router.js
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

- 我们拿 meta: { name: "订单列表" } 
- 我们拿 meta 中 的name属性 和 后台请求数据做对比 如果两个name相等就说明它具备这个权限 


> 2. 
- 服务器端的逻辑
- 1. 准备好 权限相关的文件数据
| - data
  - admin_permission.json
  - vip_permission.json
  - admin_login.json
  - vip_login.json


- admin_permission.json
- admin是全部的权限
- 也就前端的全部路由中的name字段都抽离出来了 数据的层次结构都和前端的路由数据结构一致
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

- 2. 增加一个前端访问接口
- 根据登录的用户不同 响应回不同的权限列表数据

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


> 前端的逻辑
- 1. 增添一个请求权限数据的api
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

- 2. 创建一个对比的逻辑

  | - utils
    - recursion-router.js

- 这个文件中我们写两个方法 
- 1. 用来比对路由权限
- 2. 指定返回的默认路由
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


- 3. 将我们请求回来的权限数据 保存在vuex中

    | - store
      | - modules   权限相关
        - index.js
        - permisstion.js


- permisstion.js
- 这里做路由权限比对的工作 然后返回一个前端能够加载的路由地址
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


- modules / index.js
```js
import permission from "./permission"
export default {
  permission
}
```

- store / index.js
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


- 3. permisstion.js怎么访问？
- p9 看了一半 看不动了


------ 

### 使用 directives 实现权限管理
- 1. 在 本地存储 中设置 所有权限的列表 类型是数据
- permission : ["create", "edit"]

- 2. 自定义指令

  | - directives
    - has.js

- 一个指令就是一个对象
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

> 前端页面
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

------

### 使用 router.addRoutes(数组) 实现权限管理
- 参数：
- 我们在配置routes的时候 配置的形式是一个数组 这里面我们也要添加一个routes数组

- 格式：
- routes = [
  {
    path:
    name:
    components:
  }
]

> router.addRoute({一条路由})
> router.addRoutes(路由数组)  -- vue3 中已经废弃
- 动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组。

- 当原路由表中有name属性 且新添加的路由也有name属性 则会覆盖

> 回顾下普通路由的配置
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

> 利用该方法实现权限管理
- 设置一个路由数组，设置用户权限
  commonUser = ['pageA','pageB']
- 这样就可以访问pageA，pageB路由了

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

let commonUser=['pageA','pageB']
let commonUserRoute=route.filter(function(page){
    return commonUser.includes(page.name)
})

console.log(commonUserRoute);
router.addRoutes(commonUserRoute);
```