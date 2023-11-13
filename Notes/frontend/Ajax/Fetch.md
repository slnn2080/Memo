# Fetch

### 语法:
### **<font color='#C2185B'>fetch(url, options)</font>**
```js
const response = await fetch("http://example.com/movies.json");
const movies = await response.json();
console.log(movies);
```

该 **Response对象** 并不直接包含实际的 JSON 响应正文，而是**整个 HTTP 响应的表示**。

为了从对象中提取 JSON 正文内容Response，我们使用该json()方法，该方法返回第二个 Promise

<br>

### 参数
```js
{
  method: 'POST | GET, | PUT | DELETE |',
  headers: {
    "Content-Type": "application/json | application/x-www-form-urlencoded | multipart/form-data | text/plain"
  },
  body: JSON.stringify(data),

  mode: "cors | no-cors",
  // 要使浏览器发送包含同源和跨源调用中包含的凭据的请求
  credentials: "same-origin | include | omit",
  redirect: "follow",
  referrerPolicy: "no-referrer"
}
```

<br>

**content-type:**  
1. application/x-www-form-urlencoded: 要求body格式为 (username=yiyi&password=123)

2. application/json: 要求body格式为 JSON.stringify

3. multipart/form-data: 上传文件发现, **并不用携带此头部**

<br>

### 返回值:
fetch方法的返回值为 response, 它是整个的响应信息对象, 如果需要获取里面的信息, 需要通过该对象继续调用 json() 等方法

```js
{
  body: (...)
  bodyUsed: false
  headers: Headers {}
  ok: false
  redirected: false
  status: 404
  statusText: "Not Found"
  type: "cors"
  url: "http://localhost:3333/get1"
}
```

<br>

**response 身上的方法**
- response.blob(): 返回 promise, 拿到blob
- response.json(): 返回 promise, 拿到json
- response.text(): 返回 promise, 拿到文本

<br><br>

## fetch方法不能用catch捕获错误

### 演示:
```js
try {
  const res = await fetch('http://localhost:3333/get1')
  console.log(res)
} catch (err) {
  console.log('catch')
  console.log(err)
}

fetch('http://localhost:3333/get1')
  .then(
    (res) => console.log('then', res),
    (err) => console.log('then', err)
  )
  .catch((err) => console.log('catch', err))
```

<br>

我们使用了上面两种方式 测试请求地址错误时候的情况, 发现 catch 的部分并不会执行, 而是在控制台抛出了错误, 也就是说 **fetch并不能使用catch来捕获错误**

fetch不能用catch主动捕获错误，就是出错了，它不会就去走catch了，它还会继续往下执行，所以出错了需要自己去处理

<br>

请求数据会出现问题：要么是地址填错了，填的地址没有数据；要么是地址是正确的，因为别的原因数据请求不回来，网络的问题也有可能。

<br>

### 解放方式: response.ok
响应结果中结果中有一个ok这个值 和 status状态这个值
- ok这个值是当请求成功就是ture，请求失败就是false
- status是请求成功为200，请求失败为404

所以我们要在第一个then后面输出一下res的值，而且要进行if条件判断，然后自己进行处理：
```js
fetch(`http://localhost:3000/users?username=${username}`)
  .then(
    res => {
    if(res.ok){
      return res.json()
    } else{
      //拒绝
      //reject后面{}放着拒绝以后要返回的值，可以自己定义，一般是返回status和
      return Promise.reject({
        status:res.status,
        statusText:res.statusText
      })
    }
  })
```

<br><br>

## 上传JSON数据: body: JSON.stringify(data)
```js
async function postJSON(data) {
  try {
    const response = await fetch("https://example.com/profile", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

const data = { username: "example" };
postJSON(data);
```

<br><br>

## 上传文件
可以使用 HTML``<input type="file" />``输入元素FormData()和fetch().

上传文件我们会使用 formData, 但是并没有配置头部信息
```js
async function upload(formData) {
  try {
    const response = await fetch("https://example.com/profile/avatar", {
      method: "PUT",
      body: formData,
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append("username", "abc123");
formData.append("avatar", fileField.files[0]);

upload(formData);
```

<br><br>

## 返回2进制数据
我们使用 res.blob() 方法拿到blob类型的数据 随后进行操作
```js
async function fetchImage(request) {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const myBlob = await response.blob();
    myImage.src = URL.createObjectURL(myBlob);
  } catch (error) {
    console.error("Error:", error);
  }
}

// 使用 Headers 对象 封装头部信息
const myHeaders = new Headers();

// 使用 Request 对象 请求体信息
const myRequest = new Request("flowers.jpg", {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
});

fetchImage(myRequest);

```

<br><br>

## 中止获取
1. 创建 controller 对象
2. 将 controller.signal 交给 fetch options 中
3. 通过 controller.abort() 取消请求
```js
const controller = new AbortController();
const signal = controller.signal;
const url = "video.mp4";

const downloadBtn = document.querySelector("#download");
const abortBtn = document.querySelector("#abort");

downloadBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(url, { signal });
    console.log("Download complete", response);
  } catch (error) {
    console.error(`Download error: ${error.message}`);
  }
});

abortBtn.addEventListener("click", () => {
  controller.abort();
  console.log("Download aborted");
});
```

<br><br>

## 给 fetch 超时功能
```s
https://www.cnblogs.com/wenruo/p/17028832.html
```
```js
// abortcontroller-polyfill 是一个用于提供 AbortController API 支持的 JavaScript 包。在一些旧版本的浏览器中，不支持 AbortController 这个现代浏览器 API。为了在这些浏览器中也能够使用 AbortController，你可以使用这个 polyfill（即填充物）库。
npm install --save abortcontroller-polyfill
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => {
    // 处理响应数据
  })
  .catch(error => {
    if (controller.signal.aborted) {
      console.log('请求已中止');
    } else {
      console.error('请求错误：', error);
    }
  });

// 中止请求的例子
// controller.abort();



// abort-controller 是一个 Node.js 和浏览器端都可以使用的库，它提供了对 AbortController 和 AbortSignal 的简单封装。这个库使得在异步操作中更容易地实现请求中止（abort）的功能。
npm install abort-controller

const AbortController = require('abort-controller');
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => {
    // 处理响应数据
  })
  .catch(error => {
    if (controller.signal.aborted) {
      console.log('请求已中止');
    } else {
      console.error('请求错误：', error);
    }
  });

// 中止请求的例子
// controller.abort();
```

<br>

### 超时相关
```js
// 记录之前的fetch api
const oldFetch = window.fetch
function request(url, options) {
  const timeout = options.timeout || 5000
}

/*
如果一个请求要请求30秒才能成功 但是我们的超时时间只有10秒 最后该次请求应该失败 我们用return function 发起请求 得到状态和fetch可能不一样

所以我们自己new了一个新的promise 在里面发送fetch请求
*/
function createRequest({baseUrl, timeout}) {
  return function(url, options) {
    return new Promise((resolve, reject) => {
      // 10秒超时后 网络传输就没有意义了 所以后面的请求要终止
      // 创建新号控制器
      const signalController = new AbortController()

      fetch(url, {
        ...options
        signal: signalController.signal
      }).then(resolve, reject)

      // 处理超时功能, 到了超时的时候 直接reject 谁先调就听谁的
      setTimeout(() => {
        reject(new Error('fetch timeout'))
        // 取消请求
        signalController.abort()
      }, timeout)
    })
  }
}

const defaultRequest = createRequest({
  baseUrl: 'xxx',
  timeout: 50000
})



// 处理err的问题
fetch(url)
  .then(res => {
    if (res.ok) {
      return res.josn()
    } else {
      return Promise.reject('err')
    }
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
```

<br>

### 拦截器 + setTimeout
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div>
    <button class="btn">send</button>
  </div>
  <script>
    const btn = document.querySelector('.btn')

    function createRequest({baseUrl, timeout}) {
      return function(url, options) {

        // --- request interceptor - start ---
        url = baseUrl + url
        // --- request interceptor - end ---

        return new Promise(async (resolve, reject) => {
          const signalController = new AbortController()

          // timeout handler
          setTimeout(() => {
            console.log('signalController')
            signalController.abort()
            return reject(new Error('fetch timeout'))
          }, timeout)

          const response = await fetch(url, {
            ...options,
            signal: signalController.signal
          })

          console.log(response)

          // --- request interceptor - start ---
          if (!response.ok && response.status === 404) {
            console.log('404的处理逻辑')
            return reject(new Error('404的处理逻辑'))
          }
          // --- request interceptor - end ---

          return resolve(response.json())
        })
      }
    }

    const defaultRequest = createRequest({
      baseUrl: 'http://localhost:3333',
      timeout: 3000
    })

    btn.addEventListener('click', async () => {
      try {
        const res = await defaultRequest('/common')
        console.log('res', res)
      } catch (err) {
        console.log('catch', err)
      }
    })
  </script>
</body>
</html>
```