self.addEventListener("install", (e) => {
  console.log("install")
  // 为了防止self.skipWaiting()异步操作没走完就进入下一个生命周期 我们要加如下的操作
  e.waitUntil(self.skipWaiting())
})

self.addEventListener("activate", (e) => {
  console.log("activate")
  // 表示serviceworker激活后 立即获取控制权
  e.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", (e) => {
  // 表示serviceworker激活后 立即获取控制权
  console.log("fetch", e)
})