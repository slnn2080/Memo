# 给 fetch 超时功能
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