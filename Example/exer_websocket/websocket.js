// 这个文件中也要用到路由 所以要导入express
const express = require("express")
const expressWs = require("express-ws")

const router = express.Router()

// 给router注入websocket 注入后 router就会多了ws方法
expressWs(router)


// 存放sam的数据
let samStr = []


// sam访问的路径为 ws://localhost:8800/ws/sam
// app.use("/ws", websocket) 因为server.js文件里面 这么处理的 所以 这个js文件中的所有路径前都会拼接上/ws
// 当sam访问这个路径的时候 我们就给它返回一个数据
router.ws("/sam", (ws) => {

  // send() ws的方法 用来想客户端发射数据的
  // ws.send("后台往客户端发送的数据")

  // 接收客户端发送过来的数据
  ws.on("message", (msg) => {
    // 重新把拿到的数据返回给客户端
    samStr.push(msg)    // 存储sam发送的数据
    ws.send(msg)
  })
})

// 注意每一个路由中必须有一个有效的send方法 send中有一个return 写在send后面的语句都不会执行



// erin接收数据的接口
router.ws("/erin", (ws) => {
  let timer = null

  // 当监听到链接断开的时候要清空定时器
  ws.on("close", () => {
    if(timer) {
      clearInterval(timer)
    }
  })

  // 这里我们要将sam的数据 给前端erin的界面 我们不能使用for循环发依次send samStr数组 因为一个路由规则中只能有一个send方法
  // 这里我们采用定时器 每一秒发送一条数据 也就是用定时器的方式查看数组中是否有数组项 只要数组中是有数据的就返回给客户端第0项 顺便把第0项清掉
  timer = setInterval(function() {
    if(samStr.length > 0) {
      // 因为send 里面有return 所以要做下面的逻辑
      let msg = samStr[0]
      samStr.shift()
      ws.send(msg)
    }    
  }, 1000)
})


module.exports = router