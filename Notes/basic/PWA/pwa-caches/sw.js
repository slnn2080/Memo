// 我们在 serviceWorker 里面操作缓存

// sw.js 文件中是需要注册3个事件的

const CACHE_NAME = "cache_v2"
self.addEventListener("install", async e => {
  console.log("install")

  // 调用open()方法打开 cache_v1缓存存储库 得到 cache 对象
  const cache = await caches.open(CACHE_NAME)

  // 使用 await 等待 通过 cache.add() 将静态资源存储起来, 比如: logo192.png, manifest.json, index.html 这些都属于静态资源
  await cache.addAll([

    // 存储html避免以后离线访问不到 注意路径
    "/",
    "/imgs/logo192.png",
    "/manifest.json"
  ])

  await self.skipWaiting()
})

/*
  上步完成后 Cache Storage 中存储内容为:
  cache_v1 - http://127.0.0.1:8080
*/

self.addEventListener("activate", async e => {
  console.log("activate")

  // 会清除掉旧的资源
  const keys = await caches.keys()
  console.log("keys:", keys)

  keys.forEach(key => {
    // 如果 我们获取到的 key 跟 我们定义 key 不一样 则说明不是我的资源 就是旧的资源
    if(key !== CACHE_NAME) {
      caches.delete(key)
    }
  })

  // 得到控制权再传递给下一步
  await self.clients.claim()
})

/*
  上步完成后 Cache Storage 中存储内容为:
  cache_v1 - http://127.0.0.1:8080
  cache_v2 - http://127.0.0.1:8080

  等到 activate执行的时候 会删除旧的资源 剩下
  cache_v2 - http://127.0.0.1:8080
*/


self.addEventListener("fetch", async e => {
  // 打印资源请求对象中的 url
  console.log(e.request.url)

  // 判断资源是否能请求成功 如果能够请求成功 就响应成功的结果 如果断网了请求失败 就读取cache缓存

  // 获取请求对象
  const req = e.request

  // 调用 e.respondWith() 传入 res响应对象呢 调用该方法将响应交给浏览器
  e.respondWith(networkFirst(req))
})


// 网络优先, 如果网络可以走网络 网络不好走缓存
async function networkFirst(req) {
  // 先从网络读取资源, 通过fetch中获取的请求对象
  try {
    // 先从网络中读取最新的资源
    let fresh = await fetch(req)

    // 直接返回读取的结果 不要调用json() 因为请求的可能是别的类型的资源 比如还有 res.blob()
    return fresh

  } catch(err) {

    // 没网的情况 去缓存中读取, 首先打开缓存库 获取 cache 对象
    const cache = await caches.open(CACHE_NAME)

    // 调用 match 方法 根据 req 获取 res
    const cached = await cache.match(req)
    
    return cached
  }

}

// 缓存优先, 如果缓存有就先走缓存 缓存没有就走网络
function cacheFirst() {

}