### vue-lazyload
- https://github.com/hilongjw/vue-lazyload

- 作用：
- 主要完成的是图片的懒加载
- 也就是图片是否出现在一定的区域之内 它才加载 反之就不会加载


> 搭建后台
- 因为要实现图片的懒加载 那么肯定要请求图片 所以我们要先搭建后台的逻辑

- 我们在vue的项目根目录里面创建 server文件夹 使用express搭建服务器

- 我们在server下创建 img data 两个文件夹 里面放图片
<!-- 
  img文件夹下是图片
  data文件夹下是 images.json文件
  [
    {
      "id"; 1,
      "src": "http://localhost:3000/img/1.jpg",
      "title": "xxx",
      "teacher": "sam"
    },
    { ... }
  ]
 -->


> 后台逻辑代码
```js
const express = require("express")
const app = express();

const {resolve} = require("path")
const {readFileSync} = require("fs")

app.all("*", (req, res, next) => {
  // 解决跨域 所有的请求过来都可以
  res.header('Access-Control-Allow-Origin', '*')

  // 允许请求的方法
  res.header('Access-Control-Allow-mehods', 'POST, GET')

  // 允许跨域后要调用next() 下一个中间件执行
  next()
})


// 请求图片地址对应的接口
// 当我们请求 localhost:3000/img/1.jpg 的时候做的处理
app.get("/img/:filename", (req, res) => {
  res.sendFile(resolve(__dirname, "./img/" + req.params.filename))
})


// 当请求如下/imgs的时候返回对应的image.json文件
app.get("/imgs", (req, res) => {
  const imgData = JSON.parse(readFileSync(resolve(__dirname, "./data/images.json"), "utf8"))

  res.send(imgData)
})

app.listen(3000, () => {
  console.log("3000 已启动")
})
```


> 前端逻辑
- 我们这里使用下 vue-lazyload 插件

- 1. 安装
- npm i vue-lazyload -S
- npm i axios -S

```js
// main.js 文件
import Vue from "vue"
import App from "./App.vue"

// 导入lazyload
import VueLazyLoad from "vue-lazyload"

// 注册插件的同时 进行如下配置
Vue.use(VueLazyLoad, {
  // 加载未完成 展示loading
  loading: "这里是一张图片",
  loading: "http://localhost:3000/img/loading.gif",

  // 加载失败 展示error
  error: "这里是一张图片",
  error: "http://localhost:3000/img/error.gif",

  // 130%是加载范围 一屏还多1/3
  preload: 1.3
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#app")



// App组件
<template>
  <div>
    // 滚动区域
    <div class="container">
      // 每一项
      <div class="box"
        v-for="item of imgData"
        :key="item.id"
      >
        // 这时候我们图片会全部加载 如果想1.3以后的部分不加载的话 我们要将src 修改为 v-lazy
        <div class="img-box">
          <img :src="item.src" />

          // 注意v-lazy前面没有:
          <img v-lazy="item.src" />
        </div>
        <div class="content-box">
          <h1>{{item.title}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "App",
  data() {
    return {
      imgData: []
    }
  },
  async mounted() {
    const res = await axios("http://localhost:3000/imgs")

    this.imgData = res.data
  }
}
</script>
```

- 上述还有一个要点：
- 滚动区域的盒子的高度 要设置为100%
```css
html,
body,
#app,
.container {
  height: 100%
}
```

- 滚动区域的盒子 要设置 overflow: auto
- 这样会有滚动条


- 以上就是 vue-lazyload 插件的基本使用

----------------

> 源码的实践 v-lazy指令的逻辑
- https://www.bilibili.com/video/BV1gu411Z71r?p=3&spm_id_from=pageDriver