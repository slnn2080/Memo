# Axios的二次封装

## 二次封装的配置内容

### 1. 全局的基础配置
在基础的全局配置中我们可以配置如下的内容
1. baseURL
2. timeout
3. headers
4. responseType
5. withCredentials

<br>

```js
import axios from "axios"

// 封装 专门向服务器A发送请求的 方法
function request(config) {
  const instance = axios.create({

     // 配置该实例的全局配置

  })

  return instance(config)
}
```

<br>

### 要点:
1. request方法会返回一个axios的实例 该实例可以用于发送请求
2. request方法是专门给 服务器A发送请求的方法
3. request方法内部创建了一个axios实例 我们直接返回该instance实例 它本身就是promise
4. 我们会在 create(配置对象) 的配置对象配置该实例的全局配置

```js
import axios from "axios"

// 封装 专门向服务器A发送请求的 方法
function request(config) {

  const instance = axios.create({

    // 属于该实例自己的全局配置
    baseURL: "http://localhost:3333/users/list",
    timeout: 30 * 1000,
    responseType: "json",
    headers: {
      customHeaders: "random content"
    }

  })


  // 请求拦截:

  // 响应拦截:


  return instance(config)
}
```

<br><br>

# 拦截器
```js
import axios from "axios"

// 封装 专门向服务器A发送请求的 方法
function request(config) {

  const instance = axios.create({

    // 基础配置...

  })


  // 请求拦截:
  instance.interceptors.request.use(config => {

  })

  // 响应拦截:
  instance.interceptors.response.use(() => {

  })


  return instance(config)
}
```

## 配置请求拦截器
在请求拦截器中 我们可以完成如下的逻辑:
- 请求成功的拦截(use中的第一个回调参数)
  1. 动态在请求头中添加token
  2. 对token进行加密处理

- 请求失败的拦截(use中的第二个回调参数)
  - 将错误对象抛出去

<br>

**关于将错误对象抛出去的处理相关:**  
一般前台在写逻辑的时候 会使用catch 也就是处理这种情况下 一般有两种处理方式
1. 在catch中处理
2. 在响应拦截中处理
```js
// 响应失败的拦截
err => {
  // 考虑到页面人员可能不会写catch 所以我们可以在这里进行统一的错误处理 $message 组件
  alert("出错了")
  return Promise.reject(new Error(err))
}
```
<br>

### token相关:
项目中有一些路径是不需要token的 所以这里我们可以设置一个白名单 来处理这样的逻辑

<br>

### 对token进行加密处理
token存放在localStorage中 它是明晃晃的存在那里 用户一旦登录 则这次的token已经固定下来了 

也就是我们的使用者能够很轻易的知道token是什么 是多少, 如果是这样有有恶意的人就很容易拿到该用户的token 来伪造请求 随意访问接口了

为了避免这些问题 我们可以使用密钥 对token进行加密处理 防止伪造请求 请求攻击等问题

<br>

配置文件中的 secret 密钥, 可以来自于后台, **它相当于加盐算法中的盐的部分**

<br>

前台会将该密钥进行md5加密 并放入到请求头中 这样别人拿到该密钥也不知道它是使用什么算法生成的

这样他就没有办法伪造请求

<br>

**配置文件: global.config.js**  
我们将配置相关的东西 都放在该js文件中进行统一的管理
```js
// 不需要加 token 的接口 白名单中的接口 不需要token验证
export default {
  // 白名单
  whiteList: ["/login", "/home", "/about"],

  // 密钥
  secret: "i am salt"
}
```

<br>

### 请求拦截的代码部分
```js
// 请求拦截
instance.interceptors.request.use(

  // 请求成功的回调
  config => {

    // 获取接口的白名单 和 token加密需要用到的盐
    const {whiteList, secret} = globalConfig

    // 获取请求接口地址
    const requestUrl = config.url

    // 当用户登录后 localStorage 中就会有 token
    const token = localStorage.getItem("token")

    // 判断请求的接口地址是否在 白名单 中
    // 如果不存在白名单中 则token有值(表示用于已经登录有token) 则将token追加到请求头中
    if(!whiteList.includes(requestUrl) && token) {
      config.headers.token = token
    }

    /*
      使用 update() 方法将明文密码传递给它
      使用 digest() 方法将 Hash 对象转换为十六进制字符串
    */
    const hash = crypto.createHash('md5').update(secret).digest('hex');

    // 将 密钥 放入请求头中
    config.headers.secret = hash

    return config
  },

  // 请求失败的回调
  err => Promise.reject(new Error(err))
)
```

<br><br>

## 配置响应拦截器
在响应拦截器中 我们一般对返回的状态码来进行统一的处理 

**状态码:**  
这里注意 我们说的状态码不是请求本身的状态码 而是后台返回的code码 我们在响应成功拦截中 主要就是判断后台返回的这个code码

<br>

如果是发起的请求返回的是类似 404 的错误 它不会在响应拦截器的成功拦截中进行拦截 404请求本身的错误会在响应拦截器的失败拦截中进行拦截

<br>

### 响应拦截器中的逻辑:
- 对响应成功的拦截
  - 处理后台返回的code码

- 对响应失败的拦截
  - 主要拦截类似请求本身的错误 比如404 500等错误

<br>

### 响应拦截的代码部分:
```js
// 响应拦截:
instance.interceptors.response.use(

  // 响应成功的拦截
  res => {

    // 获取后台返回的 code 如果没有 默认为 200
    const code = res.data.code || 200
    // 没有附带消息的话 默认为未知错误
    const msg = res.data.msg || "未知错误"

    // 对特殊的状态码 进行处理
    if(code == 401) {
      alert("你没有权限访问")
      router.push("/login")

      // 抛出去交由页面中的catch进行处理
      return Promise.reject(new Error(msg))
    }

    // 对不是200的状态码统一进行处理
    if(code != 200) {
      alert(`错误码: ${code}, 错误消息:${msg}`)

      // 抛出去交由页面中的catch进行处理
      return Promise.reject(new Error(msg))
    }


    // 将 res 返回出去
    return res
  },


  // 响应失败的拦截
  err => {
    // 考虑到页面人员可能不会写catch 所以我们可以在这里进行统一的错误处理 $message 组件
    alert("出错了")
    return Promise.reject(new Error(err))
  }
)
```

<br>

### 完整逻辑:
/api/index.js
```js
import axios from "axios"

// 引入配置文件
import globalConfig from "./global.config.js"

// 引入加密的模块
const crypto = require('crypto');


// 封装 专门向服务器A发送请求的 方法
export function request(config) {
  const instance = axios.create({

    // 属于该实例自己的全局配置
    baseURL: "http://localhost:3333/users/list",
    timeout: 30 * 1000,
    responseType: "json",
    headers: {
      customHeaders: "random content"
    }

  })


  // 请求拦截
  instance.interceptors.request.use(

    // 请求成功的回调
    config => {

      // 获取接口的白名单 和 token加密需要用到的盐
      const {whiteList, secret} = globalConfig

      // 获取请求接口地址
      const requestUrl = config.url

      // 当用户登录后 localStorage 中就会有 token
      const token = localStorage.getItem("token")

      // 判断请求的接口地址是否在 白名单 中
      // 如果不存在白名单中 则token有值(表示用于已经登录有token) 则将token追加到请求头中
      if(!whiteList.includes(requestUrl) && token) {
        config.headers.token = token
      }

      /*
        使用 update() 方法将明文密码传递给它
        使用 digest() 方法将 Hash 对象转换为十六进制字符串
      */
      const hash = crypto.createHash('md5').update(secret).digest('hex');

      // 将 密钥 放入请求头中
      config.headers.secret = hash

      return config
    },

    // 请求失败的回调
    err => Promise.reject(new Error(err))
  )



  // 响应拦截:
  instance.interceptors.response.use(

    // 响应成功的拦截
    res => {

      // 获取后台返回的 code 如果没有 默认为 200
      const code = res.data.code || 200
      // 没有附带消息的话 默认为未知错误
      const msg = res.data.msg || "未知错误"

      // 对特殊的状态码 进行处理
      if(code == 401) {
        alert("你没有权限访问")
        router.push("/login")

        // 抛出去交由页面中的catch进行处理
        return Promise.reject(new Error(msg))
      }

      // 对不是200的状态码统一进行处理
      if(code != 200) {
        alert(`错误码: ${code}, 错误消息:${msg}`)

        // 抛出去交由页面中的catch进行处理
        return Promise.reject(new Error(msg))
      }


      // 将 res 返回出去
      return res
    },


    // 响应失败的拦截
    err => {
      // 考虑到页面人员可能不会写catch 所以我们可以在这里进行统一的错误处理 $message 组件
      alert("出错了")
      return Promise.reject(new Error(err))
    }
  )

  return instance(config)
}
```

<br><br>

# 封装请求方法
一般我们在发送请求的时候 并不是直接使用 request 方法来发送请求

因为后台在写接口的时候 都是按照模块来写的 例如
- users模块下 有哪些请求
- login模块下 有哪些请求

所以我们每一个模块都要做成一个js文件, 该js文件对应对台的一个controller中的接口 该js文件中有该模块的所有请求方法
- 查询接口的请求方法
- 新增接口的请求方法
- 删除接口的请求方法
- 更新接口的请求方法 等等

<br>

**user.js**  
```js
import request from "./request"

export const getUserList = (p arams) => {
  return request({
    url: "/getList",
    method: "get",
    params
  })
}
```

<br><br>

## 扩展: 防止频繁提交
我们希望的是上一个请求的响应回来后 再发送新的请求

**那我们在哪里扩展功能呢?**  
上面我们分装了一个axios实例, 在 /api/index.js 文件中 该文件对外暴露出来了一个 request() 方法

<br>

我们要是想对 request() 方法扩展功能的话 可以进行如下的实现方式

<br>

### 步骤:
1. 创建 /api/request.js 文件
2. 创建匿名执行函数(利用闭包, 可以缓存数据 和 变量)

```js
// 引入封装好的 axios 
import request from "@/api/index.js"

const myRequest = (function() {

  // 记录 哪些请求地址 在请求中, 一旦发送请求我们就将请求记录在数组中
  const hasRequest = []

  return function(config) {

    // 每次发送请求前要判断 本次请求是否已经在 hasRequest 中了
    if(hasRequest.includes(config.url)) {
      // 说明请求已经发送出去了
      return Promise.reject({msg: "请求已经提交"})
    }

    // 到这里说明 提交的请求是新的请求
    // 1. 先将新请求地址 push到hasRequest数组中
    hasRequest.push(config.url)
    // 2. 请求成功后 我们将该次请求从hasRequest数组中删掉
    return request(config).then(res => {
      hasRequest = hasRequest.filter(url => url != config.url)

      // 将响应返回
      return res
    })

  }

})()

export {
  // 纯粹的请求
  request as initRequest,
  // 扩展功能的请求
  myRequest as request
}
```


<br><br>

## 扩展: 缓存响应结果  
使用 内存 缓存数据
```js
// 引入封装好的 axios 
import request from "@/api/index.js"

const myRequest = (function() {

  const hasRequest = []

  // 缓存数据, 接口地址为key, 响应数据为值
  const mem = {}

  return function(config) {

    // 每次发送请求之前 我们先判断 本地请求在缓存中是否已经有数据了
    if(mem[config.url]) {
      return Promise.resolve(mem[config.url])
    }

    // 如果没有缓存 则再进行如下的逻辑
    if(hasRequest.includes(config.url)) {
      return Promise.reject({msg: "请求已经提交"})
    }

    hasRequest.push(config.url)
    return request(config).then(res => {
      hasRequest = hasRequest.filter(url => url != config.url)

      // 1. 每次请求回来后 我们以请求地址为key 往对象中缓存请求的响应数据
      mem[config.url] = res

      return res
    })

  }

})()

export {
  // 纯粹的请求
  request as initRequest,
  // 扩展功能的请求
  myRequest as request
}
```



<br><br>

# 扩展: 装饰器方式实现防抖功能
```js
function debounce(wait) {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value;
    let timer;

    descriptor.value = function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        originalMethod.apply(this, args);
      }, wait);
    };

    return descriptor;
  };
}

class MyComponent {
  @debounce(500)
  fetchData() {
    console.log('Fetching data...');
  }
}

const myComponent = new MyComponent();
myComponent.fetchData(); // 调用 fetchData() 方法将会被防抖处理
```