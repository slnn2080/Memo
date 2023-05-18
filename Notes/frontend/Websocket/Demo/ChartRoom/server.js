const express = require("express")
// 引入 ws
const expressWs = require("express-ws")
const websocket = require("./websocket.js")

const app = express()
// 使用expressWs方法 将app传入 这样我们就能往页面中注入websocket功能
expressWs(app)


// 利用中间件来充当路由 参数1的位置是路由 返回对应的静态资源文件夹中的html文件
app.use("/sam", express.static("public/sam.html"))
app.use("/erin", express.static("public/erin.html"))

// 当我们访问的是 /ws 的路由的时候 我们就要调用 websocket
// 我们要求访问的格式是 ws://localhost:3000/ws  不想要/ws的话 下面app.use那里去掉
// websocket是我们导入的js文件 下面这样写的话 这个js文件中的所有路径前都会拼接上/ws
app.use("/ws", websocket)

app.use(express.static("public"))

// 如果我们键入服务器网址后 没有任何对应页面的话 解决报错
app.get("/*", (req, res) => {})


app.listen(8800, () => {
  console.log("服务器已开启 监听8800")
})