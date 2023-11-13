# delete请求是可以携带请求体的
我们的 批量删除 逻辑中, 需要使用delete请求, 但是该请求携带了请求体
```js
type removeUserBatchApiType = (
  userIds: number[]
) => Promise<commonResType<null>>
export const removeUserBatchApi: removeUserBatchApiType = (userIds) => {
  // delete请求
  return service.delete(API.DELETE_BATCH_USER, { data: userIds })
}
```

在HTTP规范中，DELETE请求通常不允许携带请求体（request body）。然而，有些服务器可能允许在DELETE请求中携带请求体，虽然这并不是标准行为。如果服务器支持，并且你确实需要在DELETE请求中发送数据，你可以使用 Axios 来完成这个任务。

在 Axios 中，你可以使用 data 属性来指定请求体。但请注意，这可能不会在所有服务器上按预期工作，因为标准HTTP规范中并不允许在DELETE请求中使用请求体。

<br>

**问题:**  
delete请求需要这么携带
```js
axios.delete('https://example.com/api/resource', { data: dataToSend })
```

那 post 请求为什么直接就可以携带user对象呢 而不是装在 data 里面
```js
axios.post('https://example.com/api/resource', user)
```
 
<br>

**解答:**  
在 Axios 中，axios.post 直接接受数据作为请求的 body，而 axios.delete 之所以需要使用 data 选项，是因为标准的 HTTP 协议规范中，并不支持 DELETE 请求携带请求体。

HTTP协议规范指定，DELETE请求应该是一个幂等的、不包含请求体的请求，用于删除指定资源。因此，按照规范，DELETE请求是不应该包含请求体的。

然而，有些服务器或框架（例如Express）可能支持在DELETE请求中包含请求体，这是一种非标准的行为。**为了支持这样的服务器，Axios 提供了 data 选项，允许你在 DELETE 请求中携带请求体。**

对于 POST 请求，HTTP规范允许包含请求体，因此在 Axios 中，axios.post 的设计是更符合标准的。当你使用 axios.post('https://example.com/api/resource', user) 时，user 对象被直接放在请求体中，这符合 HTTP 规范中 POST 请求的要求。

总的来说，axios.post 直接将数据放在请求体中，而 axios.delete 提供了 data 选项以支持那些可能允许在 DELETE 请求中携带请求体的非标准情况。

<br><br>

# json-server包

### 作用:
基于rest api风格的操作方式 快速的搭建http服务, 我们发送请求需要这样的角色

<br>

### 使用方式:

**安装:**
```
npm i -g json-server
```

<br>

**根目录创建接口文件 db.json 并模拟数据:**
```js
{
  // posts接口
  "posts": [
    {"id": 1, "title": "json-server", "author": "typicode"}
  ],
  // comments接口
  "comments": [
    {"id": 1, "body": "some comment", "postId": 1}
  ]
}
```

<br>

**启动服务:**
```js
json-server --watch db.json

// 延时响应
json-server --watch db.json -d 2000
```

<br>

**使用方式:**
```js
http://localhost:3000/posts/1

// 我们可以得到如下的数据
{
  "id": 1,
  "title": "json-server",
  "author": "typicode"
}
```

<br><br>

# Axios
基于promise的http客户端 可以在浏览器和nodejs中运行

<br>

## Axios特点:
- 浏览器端: 向服务器端 发送 ajax 请求
- 服务器端: 向远程服务端 发送 http 请求
- promise风格的相关操作
- 拦截器
- 对请求和响应数据做转换
- 取消请求
- 自动将结果转换为json
- 做保护 阻挡跨站攻击

<br><br>

## Axios安装:
```
npm i axios
```

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

<br><br>

## Axios 响应结果:
```js
{
  config: {
    我们传入的配置对象
  },

  // axios会自动对响应体做JSON解析 返回的直接是可以使用的数据
  data: 服务器返回的数据

  headers: {
    响应头信息
  },

  // XMLHttpRequest实例对象 request中保存的就是axios发送请求的时候创建的ajax请求对象
  request: {
    原生的 Ajax 请求对象
  },

  status: 200,
  statusText: "OK"
}
```

<br><br>

## Axios 配置:

### **配置项:**  
**<font color="#C2185B">url:</font>**  
服务器地址

类型: 字符串  

<br>

**<font color="#C2185B">method:</font>**  
请求方式

类型: 字符串

<br>

**<font color="#C2185B">baseURL:</font>**  
设置url的基础结构 axios会自动将baseURL和url做结合拼接

类型: 字符串

<br>

**<font color="#C2185B">params:</font>**  
设置 url 参数, 它会将我们写的对象形式转换成参数字符串缀到url的后面

类型: 对象

```js
params: {
  id: 1,
  name: "sam"
}

>

id=1&name=sam
```

<br>

**<font color="#C2185B">data:</font>**  
请求体数据对象

**注意:**  
只适用于请求方法'PUT'， 'POST'， 'DELETE'和'PATCH'

类型: 对象 or 字符串  
如果是 对象形式 axios会自动将其转换为 json字符串格式传递  
如果是 字符形式 axios会直接传递

<br>

Browser only:  
FormData, File, Blob

Node only:  
Stream, Buffer

<br>

**<font color="#C2185B">headers:</font>**  
对请求头信息做配置

类型: 对象

<br>

**<font color="#C2185B">timeout:</font>**  
超过我们给定的时间 请求就会被取消

类型: 数字 单位毫秒

<br>

**<font color="#C2185B">responseType:</font>**  
对响应体结果的格式做设置 默认服务器返回的是json格式

类型: 字符串  
默认值: json

```
'arraybuffer', 'document', 'json', 'text', 'stream'
```

<br>

**<font color="#C2185B">paramsSerializer:</font>**   
对请求参数做序列化 转换成字符串

**场景:**  
比如后台要求的格式可能各种各样 我们就可以在这里函数中都数据做处理 将数据调整为和服务器要求一致的格式

/post?a=1&b=2  
/post/a/100/b/200  
/post/a.100/b.200

类型: 函数
```js
transformRequest: function(params) {
  return Qs.stringify(params, {arrayFormat: 'brackets'})
}
```


<br>

**<font color="#C2185B">cancelToken:</font>**   
对 axios 请求做取消的设置

```js
cancelToken: new CancelToken(function (cancel) {

}),
```

<br>

**<font color="#C2185B">transformRequest:</font>**   
对请求数据做预处理 将处理后的结果发送给服务器

类型: 函数
```js
transformRequest: function(data, headers) {
  ...
}
```

<br>

**<font color="#C2185B">onUploadProgress:</font>**   
上传进度的回调 (仅浏览器端有)

类型: 函数
```js
transformRequest: function(progressEvent) {
  ...
}
```

<br>

**<font color="#C2185B">onDownloadProgress:</font>**   
下载进度的回调 (仅浏览器端有)

类型: 函数
```js
transformRequest: function(progressEvent) {
  ...
}
```

<br>

**<font color="#C2185B">transformResponse:</font>**   
对响应结果做预处理 通过自定义回调做处理 

类型: 函数
```js
transformRequest: function(data) {
  ...
}
```

<br>

**<font color="#C2185B">withCredentials:</font>**  
在跨域请求的时候 对cookie是否携带做设置 false 为不携带

类型: 布尔  
默认值: false

<br>

**<font color="#C2185B">adapter:</font>**  
对请求的适配器做设置 有两种运行环境
- 发送ajax的
- 在node环境下发送http请求的

类型: 函数  
```js
adapter: function(config) {
  ...
}
```

<br>

**<font color="#C2185B">auth:</font>**  
对请求基础验证 用来设置用户名和密码的

类型: 对象  
```js
auth: {
  username: 'janedoe',
  password: 's00pers3cret'
},
```

<br>

**<font color="#C2185B">responseEncoding:</font>**  
对响应体的字符集编码进行设置

类型: 字符串  
默认值: utf8

<br>

**<font color="#C2185B">xsrfCookieName:</font>**  
**<font color="#C2185B">xsrfHeaderName:</font>**  
跨站请求的标识 对cookie的名字 和 头信息 做设置, 保证我们的请求是来自于自己的客户端 不是其他的页面

类型: 字符串  

默认值:   
xsrfCookieName: 'XSRF-TOKEN'  
xsrfHeaderName: 'X-XSRF-TOKEN'

说明:  
服务器在返回结果的时候会返回唯一的标识 我们下次发送请求的时候需要将这个标识传递回去 服务器认证并检测没有问题后 才会做响应

有一些网站里面会加入一些链接 向我们的服务器去发送请求 如果我们不说唯一的标识 做校验的话 那么这个页面发送过来的请求可能会对我们的结果产生影响

而加上唯一的标识后我们的客户端是可以发送的 但是其他的网页在发送请求的时候 不能携带我们设置的参数 它没有 所以服务器会检验 这就可以避免跨站攻击了

<br>

**<font color="#C2185B">maxContentLength:</font>**   
设置 http 响应体的最大尺寸 单位字节

类型: 数字
```js
maxContentLength: 2000,
```

<br>

**<font color="#C2185B">maxBodyLength:</font>**   
设置 http 请求体的最大尺寸 单位字节

类型: 数字
```js
maxBodyLength: 2000
```

<br>

**<font color="#C2185B">validateStatus:</font>**   
设置在什么情况下才认定为成功

类型: 函数
```js
validateStatus: function (status) {
  // 下面的情况下 默认为成功
  return status >= 200 && status < 300; // default
},
```

<br>

**<font color="#C2185B">maxRedirects:</font>**   
最大的跳转次数 仅能用在node端

我们向一个服务器发送请求 它会做跳转 我们要不要往前去请求 我们设置了一个最大值

类型: 数字
```js
maxRedirects: 5
```

<br>

**<font color="#C2185B">socketPath:</font>**   
设置socket文件的位置 它的作用是向docker的守护进程发送请求 也就是做数据的转发

当我们同时设置了 socketPath 和 proxy 则优先使用socketPath

类型: 数字
```js
socketPath: null
```

<br>

**<font color="#C2185B">httpAgent:</font>**   
对客户端信息做设置

```js
new http.Agent({ keepAlive: true }),
```

<br>

**<font color="#C2185B">proxy:</font>**   
设置代理 该配置项使用在node端的

如果我们使用axios做爬虫的话 如果用一个ip去爬东西 次数太多很可能就会被禁用掉ip 这时候我们可以借助中间代理 我们可以做很多的代理 做切换 然后发送请求

**示例:**  
```s
https://blog.csdn.net/AnitaSun/article/details/121604396
```

```js
proxy: {
  protocol: 'https',
  host: '127.0.0.1',
  port: 9000,
  auth: {
    username: 'mikeymike',
    password: 'rapunz3l'
  }
},
```

<br>

**<font color="#C2185B">decompress:</font>**   
对响应结果是否解压 node端使用

```js
decompress: true
```

<br><br>


## Axios API:

### **<font color="#C2185B">axios.request({config})</font>**

**返回值:**  
promise对象

<br>

### **<font color="#C2185B">axios({config})</font>**

**返回值:**  
promise对象

<br>

### **<font color="#C2185B">axios.post(url, [data], [config])</font>**

**返回值:**  
promise对象

```js
axios.post(
  "url", 
  // 请求体对象
  {
    "body": "",
    "postId": 2
  },
  {
    配置对象
  }
)
```

<br>

### **其他请求的方式:**
```js
axios(config)             通用  
axios.request(config)  
axios.get(url[, config])  
axios.delete(url[, config])  
axios.head(url[, config])  
axios.post(url[, data[, config]])  
axios.put(url[, data[, config]])  
axios.patch(url[, data[, config]]) 
```

<br>

### **注意:**
程序开发中离不开请求, 即使我们选择了第三方框架 我们也对这个第三方框架进行封装, 然后使用我们自己封装好的模块进行网络请求  

我们不会直接使用第三方框架, 因为有一天它可能不维护了 或者 出现了严重的bug

<br><br>

## Axios 全局默认配置:
在上面的示例中, 我们的baseURL都是固定的, 事实上, 在开发中可能很多参数都是固定的, 这个时候我们可以进行一些抽取 也可以利用axios的全局配置

比如超时时间, 5秒没有响应就超时了 等等  
这样如果有请多的请求, 那么每个请求中都有 baseURL timeout header 等代码就重复了 这时我们就可以进行全局配置

<br>

### **axios.defaults属性 配置axios的全局属性:**
我们可以将所有请求的公共部分, 可以通过给 axios.defaults 对象添加默认配置, 给它添加属性就是配置全局属性 写在哪都可以  
```js
// 全局配置: GET请求
axios.defaults.method = "GET"

// 全局配置: baseURL
axios.defaults.baseURL = "https://xxx."

// 全局配置: 默认就携带 params参数
axios.defaults.params = {id: 100}

// 3秒后结果没有返回就取消请求
axios.defaults.timeout = 3000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
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

<br><br>

## Axios 并发请求:
axios提供如果想发送多个并发请求, 想**让这两个请求都成功之后再做响应处理的话**, axios提供了api  

<br>

### **<font color="#C2185B">axios.all():</font>**
**参数:**  
[axios请求1, axios请求2]

```js
axios.all([请求1, 请求2]).then(成功的结果数组)
```

then() 中会拿到多个请求的结果 当多个请求都成功的时候会到then()方法里面 results(请求成功返回的数据) 是一个数组[{}, {}]

<br>

### **示例:**
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

### **<font color="#C2185B">then(axios.spread((请求结果1, 请求结果2, ...) => { ... })): </font>**
上面我们是通过result[0] 通过下标的方式去读请求回来的数据的结果
axios直接给我们提供了直接获取请求结果的api
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

## Axios 创建实例对象:

## 场景:
当我们从axios模块中导入对象时, 使用的实例是默认的实例 当给该实例设置一些默认配置时, 这些配置就被固定下来了  

但是后续开发中, 某些配置可能会不太一样  
比如某些请求需要使用特定的baseURL或者timeout或者content-type等  

但是有些情况会有 baseURL 不一样, timeout 也不一样的情况 这个时候, 我们就可以创建新的实例, 并且传入属于该实例的配置信息

<br>

### **分布式服务器的概念:**
服务器有一个概念叫做分布式, 服务器在部署的时候, 当它的并发量(同时请求的数量)特别的高的情况下, 服务器可能就不能满足整个的业务需求, 同时有很多用户向服务器发送请求的时候, 服务器可能会处理不过来

当业务量特别的大的时候, 我们会搞很多个服务器, 那么这三个服务器的ip地址就会不一样

```
服务器A   首页请求的服务器
服务器B   类型请求的服务器
服务器C   其它的东西的服务器
```

```
客户端A                       服务器A

客户端B     反向代理服务器     服务器B
            nginx部署
客户端C                       服务器C
```

客户端不管有多少客户面对的都是一个反向代理服务器 nginx会根据哪一个服务器目前请求量不是很多, 来判断去哪一个服务器请求数据

假设 我们首页数据 我们要向 服务器A请求, 分类要向服务器B请求... 那么客户端就会有不同的ip地址(事实上不多, 事实上是上面我们了解的反向代理服务器的概念)

这个时候我们使用 axios.defaults 设置全局的baseURL就不合适了  
所以一般我们使用axios发送请求的时候 不会直接使用全局配置来进行网络请求, 而是先创建axios的实例

<br>

### **axios.create({config})**

**返回值:**  
axios的实例对象 我们可以通过该实例对象发送请求  
该实例对象 和 axios 本身的功能几乎是一样的

```js
let instance = axios.create({
  // 这里配置的是该实例的 公共配置对象
  baseURL: "xxx",
  timeout: 3000
})

instance({config})
```

<br>

**利用 intance 实例来发送请求**  
通过 intance1({ ... }) 代替 axios({ ... }) 创建 请求: 
```js 
// 之前我们发送请求都是
axios({})

// 现在我们是通过创建的实例发送
instance1({})
```

<br>

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
```

这样的话 每一个实例都会有自己独立的配置

<br>

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

<br>

假如我们很多组件都需要依赖于axios进行依赖发送请求, 我们应该单独的创建一个文件之后所有的组件在做网络请求的时候都是面向 我们自己封装的文件  
而之后我们单独创建的文件在根据axios进行一个封装 如果有一天axios不维护了那么我只需要改 我们封装的文件就可以了 以后再遇到第三方框架的时候都要用这种逻辑来使用

<br><br>

## Axios 的封装:
在src中创建 network 文件夹 创建 request.js 文件
```js 
// 也就是说其他组件在发送网络请求的时候 面向 request.js 文件就可以了 导出这个文件的时候 使用

export function request() { ... }

// 这样以后再有别的实例 还可以继续导出

export function request1() { ... }
export function request2() { ... }
```

<br>

### **方式1:**   
request.js中 通过回调的方式 将请求的结果 和 错误对象 回调回去

**总结:**  
回调函数的利用是相互的 比如

**父组件要拿到子组件的数据:**  
函数定义在父组件中 将函数传递到子组件中 子组件调用函数 通过实参将数据传回父组件

**子组件要拿到父组件的数据:**  
函数定义在子组件中 将函数传递到父组件中 父组件调用函数 通过实参将数据传回子组件

下面的方式就是调用request的时候 传入回调 requset函数内部调用回调 通过实参将结果拿到 request外部

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

<br>

### **方式2:**  
调用者在传递参数的时候, 参数内部必须有 baseConfig, success, failure
相当于 组件在使用的时候 request({}) 中的{}就是config
```js 
// config对象里面有
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

### **方式3: Promise**   

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

### **方式4: 终版**  
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

## Axios 拦截器:
拦截器就是一些函数 它分为两大类

- ### **请求拦截器:**  
  在发送请求前 我们借助回调 对请求的参数和内容做处理 和 检测 如果说都没有问题再发送请求 如果有问题我们可以取消请求

  请求拦截器相当于一道道关卡 满足条件就放行 让其发送请求

<br>

- ### **响应拦截器:**  
  它可以在我们真正处理服务器返回的结果之前 先对这些结果做一些预处理 比如失败了的话我们可以做一些提醒 或者 对数据的结果做格式化的处理

  没有问题后再交由我们自定义的回调去处理数据

<br>

### 拦截器的使用场景:
- 比如config中的信息不符合服务器的要求 比如会config中的东西进行某种变化后再返回回去

- 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标(请求时的加载动画), 每次在发送请求的时候将动画show出来, 然后响应数据的时候 再去响应拦截里面隐藏起来  

- 某些网络请求(比如登录 token), 必须携带一些特殊的信息

<br>

### **拦截器的使用:**

**<font color="#C2185B">axios.interceptors.request.use(callback1, callback2)</font>**  

callback1的形参: config  
callback2的形参: error

<br>

**<font color="#C2185B">axios.interceptors.response.use(callback1, callback2)</font>**  

callback1的形参: response
callback2的形参: error

<br>

### **示例:**
```js
// 全局请求拦截器
axios.interceptors.request.use(
  // 请求拦截器 成功
  config => {
    return config
  },
  // 请求拦截器 失败
  err => {
    return Promise.reject(err)
  }
)



// 全局响应拦截器
axios.interceptors.response.use(
  // 响应拦截器 成功
  res => {
    return res
  },
  // 响应拦截器 失败
  err => {
    return Promise.reject(err)
  }
)
```

<br>

上面的代码的执行顺序是:  (上面的代码是成功的状态)
```js
client发起请求
   --> 请求拦截器成功的回调
     --> 服务器响应数据
       --> 响应拦截器成功的回调
         --> then指定的回调
```

也就是说 两个拦截器之间的执行顺序是
```js
请求拦截器成功的回调 --> 响应拦截器成功的回调 --> 最后then指定的回调
```

<br>

### **思考:** 
当 请求拦截器中 callback1 抛出了错误后的执行流程是什么?

我们要知道 看 axios 的话 可以当成promise来看 use里面指定的回调相当于then指定回调  
这时如果

```js
// 全局请求拦截器
axios.interceptors.request.use(
  config => {
    // 拦截成功回调中 抛出了错误      ← 失败了
    throw "error"
  },
  err => {
    return Promise.reject(err)
  }
)



// 全局响应拦截器
axios.interceptors.response.use(
  res => {
    return res
  },              // ↙ 上面失败了所以会走这里
  err => {
    return Promise.reject(err)
  }
)


axios({
  method: "get",
  url: "xxx"
}).then(
  res => { ... },
  err => { ... }    // ← 最后会走到这里
)
```

上面 请求拦截成功的回调中抛出错了那它就会返回失败的promise 失败的promise在执行后续的回调的时候 走的是 **响应拦截器失败的回调**

而且 响应拦截器失败的回调 里 ``return Promise.reject(err)`` 所以会走到 then()中指定的失败的回调

<br>

### **注意:**
当我们给 axios 绑定多个请求拦截去 和 响应拦截器的时候 它们之间的执行顺序为
```js

// 第一个请求拦截
axios.interceptors.request.use(
  config => (console.log("请求拦截1号"), config),
  err => Promise.reject(err)
)

// 第二个请求拦截
axios.interceptors.request.use(
  config => (console.log("请求拦截2号"), config),
  err => Promise.reject(err)
)



// 第一个响应拦截
axios.interceptors.response.use(
  res => (console.log("响应拦截1号"), res)
  err => Promise.reject(err)
)

// 第二个响应拦截
axios.interceptors.response.use(
  res => (console.log("响应拦截2号"), res)
  err => Promise.reject(err)
)
```

之前看promise的时候看过 当给 p 绑定多个 then 的时候 所有then指定的回调都会执行
```js
// 都会执行
p.then(res => console.log(res))
p.then(res => console.log(res))
```

这里也是差不多 但是执行的顺序是不一样的
```js
请求拦截2号
请求拦截1号

响应拦截1号
响应拦截2号
```

请求拦截 后绑定的回调先执行  
响应拦截 先绑定的回调先执行

<br>

### **请求拦截器中的 config**
config就是配置对象, 也就是说在请求拦截器中可以对 配置对象进行处理的 比如修改config中的参数 追加 删除都可以
```js
axios.interceptors.request.use(
  config => {
    // 对 params 对象中的值进行修改
    config.params.a = 100

    return config
  }
  err => Promise.reject(err)
)
```

<br>

### **响应拦截器中的 response**
response就是axios生成的默认的响应结果 就是有很多属性的那个

```js
axios.interceptors.response.use(
  res => {
    // return我们想要的数据
    return res.data
  }
  err => Promise.reject(err)
)
```

<br><br>

## Axios 全局拦截器配置:

### **<font color="#C2185B">axios.interceptors.request.use(cb)</font>**
<font color="#C2185B">拦截全局</font>axios的请求(成功和失败)

<br>

### **<font color="#C2185B">axios.interceptors.response.use(cb)</font>**
<font color="#C2185B">拦截全局</font>axios的响应(成功和失败)

<br>

### **示例:**
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
    return config

  }, err => {

    // 发送都没发送出去, 比如网络断掉了
    console.log(err)
  })


  // 使用拦截器进行响应的拦截
  instance.interceptors.response.use(res => {
    // res中里面有data, 我们真正有用的就是data 我们会从res中取出data
    console.log(res)
    
    // 在这里一样 我们做完处理完拦截响应的逻辑后 要将res.data返回出去 要不组件中得不到结果 返回data就可以
    return res.data

  }, err => {
    console.log(err)
  })

  // 发送真正的网络请求
  return instance(config)
}
```

<br><br>

## Axios 取消请求:

```js
// 发送请求
axios({
  url: "http://...",
  method: "get"
}).then(res => console.log(res))
```

<br>

### **取消请求:**
我们要给上面的请求取消掉 步骤如下:

<br>

### **<font color="#C2185B">0.19版本 axios 取消请求的方式:</font>**

<br>

**1. 定义全局变量 cancel**  
当发送请求的时候会执行 axios 的逻辑 这时候它会被赋值为一个函数, 执行该函数可以取消请求
```js
let cancel = null

// 在合适的位置调用可取消请求: cancel()
```

<br>

**2. 在配置项对象中添加 cancelToken 属性**  
cancelToken: 它对应的值需要通过 **new axios.CancelToken(fn)** 来获取  
我们会传入一个 fn, fn的形参是c

我们会在回调中奖 c 赋值给 cancel

```js
let {data: res} = await axios({
  url: "http://localhost:3333/comment",
  cancelToken: new axios.CancelToken(c => (cancel = c))
})
```

<br>

**3. 在合适的位置调用 cancel() 取消请求**
```js
btn2.addEventListener("click", () => {
  cancel()
})
```

<br>

**代码演示:**
```js
const btn1 = document.querySelector("#btn1")
const btn2 = document.querySelector("#btn2")

// 1.
let cancel = null

btn1.addEventListener("click", async () => {
  let {data: res} = await axios({
    url: "http://localhost:3333/comment",

    // 2.
    cancelToken: new axios.CancelToken(c => (cancel = c))
  })
  console.log(JSON.stringify(res, null, 2))
})

btn2.addEventListener("click", () => {

  // 3.
  cancel()
})
```

<br>

### **<font color="#C2185B">0.22版本 axios 取消请求的方式: 方式1</font>**

**1. 通过 axios.CancelToken 创建 CancelToken 构造器:**  
```js
let CancelToken = axios.CancelToken
```

<br>

**2. 定义全局变量**
它会被赋值为一个取消请求的函数 我们会在合适的位置执行cancel函数 cancel() 取消请求
```js
let cancel = null
```

<br>

**2. 在配置项对象中添加 cancelToken 属性**  
cancelToken: 它对应的值需要通过 **new CancelToken(fn)** 来获取  
我们会传入一个 fn, fn的形参是c

我们在fn中做一件事情 将 c 赋值给 全局变量 cancel

```js
cancelToken: new CancelToken(function(c) {
  cancel = c
})
```

<br>

**3. 在点击按钮里面 执行 cancel() 取消请求:**
```js
btn.addEventListener("click", () => {
  cancel()
})
```

但是请求回来的太快了 我们上面的方式没有办法验证 点击的时候请求已经回来了 这时我们可以让服务器端 延时响应来验证是不是好用

<br>

### **<font color="#C2185B">0.22版本 axios 取消请求的方式: 方式2</font>**
```js
// 1. 获取 CancelToken 类
const CancelToken = axios.CancelToken

// 通过 CancelToken.source() 获取 source 对象 该对象中有 token 和 cancel()
const source = CancelToken.source();


// get的使用案例
// 在配置对象中 添加 cancelToken 
axios.get('user/12345', {

  // source.token
  cancelToken: source.token

}).catch(function(thrown) {

  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message)
  } else {
    // TODO: handle error
  }

})


// post的使用案例
axios.post('/user/12345', {
  name: 'name what'
}, {
  cancelToken: source.token
})



// 执行取消请求操作
source.cancel(‘请求已取消’)

---

// 在请求拦截中添加  cancelToken
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

let configData = null

let btn = document.querySelector("button")
let instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    // 添加 cancelToken
    config.cancelToken = source.token
    configData = config
    return config
  },
  err => {

  }
)

btn.addEventListener("click", () => {
  instance({
    url: "/getGoodsList",
    method: "get"
  })
    .then(({data}) => {
      console.log(data)
    })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log("cancel: ", err)
      }
    })

  source.cancel()
})
```

<br>

## Axios 取消上一次请求:
```js
let cancel = null
btn1.addEventListener("click", async () => {
  
  // 取消上一次请求, 在执行axios的时候 cancel 会被赋值为一个函数
  if(cancel != null) cancel()
  
  let {data: res} = await axios({
    url: "http://localhost:3333/comment",
    cancelToken: new axios.CancelToken(c => (cancel = c))
  })

  // 因为上面是同步的逻辑 请求结束后 将cancel初始化
  cancel = null
  
  console.log(JSON.stringify(res, null, 2))
})
```

<br>

### **实战举例:**
在实际中我们往往不会像官网例子中那样使用，更多的是在axios的拦截器中做全局配置管理。这样的话我们需要对上面的代码进行一些改变。

这里说一下我实现的大体思路：

我们需要对所有正在进行中的请求进行缓存。在请求发起前判断缓存列表中该请求是否正在进行，如果有则取消本次请求。
在任意请求完成后，需要在缓存列表中删除该次请求，以便可以重新发送该请求
```js
// 正在进行中的请求列表
let reqList = []

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
const stopRepeatRequest = function (reqList, url, cancel, errorMessage) {
  const errorMsg = errorMessage || ''
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      cancel(errorMsg)
      return
    }
  }
  reqList.push(url)
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function (reqList, url) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      reqList.splice(i, 1)
      break
    }
  }
}

const instance = axios.create()

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 是不是每一个实例都有自己的的cancel了？
    let cancel

    // 设置cancelToken对象
    config.cancelToken = new axios.CancelToken(function(c) {
     cancel = c
    })

    // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
    stopRepeatRequest(reqList, config.url, cancel, `${config.url} 请求被中断`)
    
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 增加延迟，相同请求不得在短时间内重复发送
    setTimeout(() => {
      allowRequest(reqList, response.config.url)
    }, 1000)
    // ...请求成功后的后续操作
    // successHandler(response)
  },
  error => {
    if (axios.isCancel(thrown)) {
      console.log(thrown.message);
    } else {
      // 增加延迟，相同请求不得在短时间内重复发送
      setTimeout(() => {
        allowRequest(reqList, error.config.url)
      }, 1000)
    }
    // ...请求失败后的后续操作
    // errorHandler(error)
  }
)
```

<br>

**细节:**  
为什么没用前文方法2中的代码进行cancelToken设置？  

axios的文档中有一条备注：
```js
Note: you can cancel several requests with the same cancel token.
// 你可以使用相同的Token来取消多个请求
```

<br>

所以我不想在每个请求前都new一个新的对象   
请务必使用方法2，保证每次cancel都能正确执行。方法1会导致当出现cancel后，后续请求也会持续cancel

<br>

### **为什么在response中需要增加延迟？**  
因为不想让用户在极短的时间内重复进行相同请求。  

请注意，在response中阻止请求和在request中的阻止请求是两个概念：    
request中是阻止上个请求 未完成 时又开始了相同的请求  
response中是阻止上个请求 完成后 一段时间内不允许相同请求

<br>

# Mock 拦截 axios 请求
这个也是最终的需求功能, 我们假设axios异步请求的数据尚未上线或者不全  
我们请求的路径可能会报错 或者没有数据等 这种时候我们可以使用mock将请求拦截掉

然后再通过mock请求拦截, 随机生成填充的数据进行前端设计

<br>

### **Mock.mock('拦截的url', {mock的配置参数}):**
```js 
// 使用ajax获取数据
axios({
  method: 'get',
  url: 'https://cdn.liyanhui.com/data.json',
}).then(res => {
  console.log(res)
  // console.log(res.data.list[0].id)
})

// mock拦截
// Mock.mock('拦截的请求地址', {配置对象})
Mock.mock('https://cdn.liyanhui.com/data.json', {
  'list|5-10': [
    {
      'id|+1': 1,
      'username': '@cname',
      'email': '@email',
      'price': '@integer',
      'gender': '@boolean'
    }
  ]
})
```

<br>

### **总结:**
axios返回的res有data, status, statusText, headers, config等属性名, data是数据

所以一般我们要获取响应结果的数据的时候一般都是res.data

我们使用mock创建的数据 list是一个数组, 数组中有一个个的对象 ``console.log(res.data.list[0].id)``

<br>

### Axios post 请求体数据格式的问题:
axios 使用 post 发送数据时, 默认是直接把 json 放到请求体中提交到后端的 也就是说

**axios默认的请求头content-type类型:** 
```
application/json;charset=utf-8
```

**但是实际我们后端要求的 如下为多见**
```
'Content-Type': 'application/x-www-form-urlencoded' 
```

<br><br>

# Axios 源码:

## 目录结构
```js
| - axios
  // axios打包后的文件 我们用的就是这里的东西
  | - dist
    - axios.js
    - axios.min.js
  
  // 核心目录
  | - lib
    | - adapters

      // nodejs向远端服务发送http请求的
      - http.js

      // 客户端发送ajax请求
      - xhr.js

    // 取消相关
    | - cancel
      - Cancel.js
      - CancelToken.js
      - isCancel.js

    // 核心功能的文件
    | - core
      // axios构造函数文件
      - Axios.js
      - buildFullPath.js
      - createError.js

      // 发送请求的
      - dispatchRequest.js
      - interceptorManager.js

      // 合并配置
      - margeConfig.js

      // 根据响应状态码修改promise状态
      - settle.js

      // 对结果做格式化
      - transformData.js

    // 功能函数
    | - helpers

    // 入口文件
    - axios.js

    // 默认配置文件
    - defaults.js

    // 工具函数
    - utils.js

  - index.d.ts
  - index.js
```

<br><br>