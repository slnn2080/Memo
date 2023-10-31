### 常量路由
```js
const router = createRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/view/Login.vue')
    },
    {
      path: '/home',
      component: () => import('@/view/Home.vue')
    }
  ]
})
```

<br>

### 登录接口:
当我们登录成功后 会返回一个路由列表, 不同的角色登录 返回的列表也是不一样的
- admin: 返回 3个路由
- other: 返回 2个路由

不同的角色返回不同的路由
```js
if (req.query.user === 'admin' && req.query.pwd === 'admin') {
  res.json({
    route: [
      { path: '/demo1', name: 'Demo01', component: 'demo1.vue' },
      { path: '/demo2', name: 'Demo02', component: 'demo2.vue' },
      { path: '/demo3', name: 'Demo03', component: 'demo3.vue' },
    ]
  })
} else {
  res.json({
    route: [
      { path: '/demo1', name: 'Demo01', component: 'demo1.vue' },
      { path: '/demo2', name: 'Demo02', component: 'demo2.vue' },
    ]
  })
}
```

<br>

### 登录方法:
```js
const login = () => {
  const result = await axios.get(url, params)
  // result.data.route 就是上面接口中返回的路由列表

  result.data.route.forEach(route => {
    router.addRoute({
      path: route.path,
      name: route.name,
      // 拼接路径: vite动态添加路由的时候 不能使用别名 @
      component: () => import(`../view/${route.component}`)
    })
  })

  // 查看是否添加路由成功
  console.log(router.getRoutes())
}
```

<br>

### **<font color='#C2185B'>router.addRoute()</font>**
往路由器中添加一个路由

<br>

**参数: 对象**   
我们只传入一个参数, 这个参数的类型是一个对象, 用于表示一条路由的信息
```js
{
  path: ,
  name: ,
  component: ,
}

router.addRoute({
  path: ,
  name: ,
  component: ,
})
```

<br>

**参数: 两个参数, 适用于添加嵌套路由**  
1. 父路由的name属性值
2. 一条路由对象
```js
router.addRoute('admin', {
  path: ,
  name: ,
  component: ,
})

// 相当于
router.addRoute({
  name: '/admin',
  path: '/admin',
  component: Admin,
  children: [
    {
      path: ,
      name: ,
      component: ,
    }
  ]
})
```

<br>

### 重置路由: 
### **<font color='#C2185B'>router.removeRoute(路由name)</font>**
在router3中使用 ``matcher`` 重置路由匹配器来重置路由

但是 在router4 不存在 ``matcher`` 属性, 使用 **getRoutes** **和removeRoute** 重置

```js
function resetRouter() {
   //获取所有路由
  router.getRoutes().forEach((route) => {
    const { name } = route;   //获取路由name
    // 路由不属于白名单,则删除
    if (name && !whiteList.includes(name as string)) {      
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
```

### 参考: 动态路由的重置
```js
// 假设你已经创建了router实例
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 初始路由配置
  ]
});

// 获取你要添加的新路由数据
const newRoutes = [
  // 新的路由数据
];

// 移除现有的children路由
router.getRoutes().forEach((route) => {
  if (route.name === 'Module') {
    router.removeRoute(route);
  }
});

// 添加新的children路由
router.addRoute({
  path: '/gwes/module',
  alias: ['/gwes/pa', '/gwes/wa', '/gwes/ia', '/gwes/so', '/gwes/ro', '/gwes/me', '/gwes/dc', '/gwes/bm', '/gwes/wf'],
  component: Layout,
  name: 'Module',
  meta: {
    hasSubMenu: true,
    hidden: true
  },
  children: newRoutes
});

```