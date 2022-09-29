const express = require("express")
const app = express()

const multipart = require("connect-multiparty")
const multipartMiddleWare = multipart()

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.send({
    status: 200,
    data: {
      msg: "登录成功, 我是首页页面"
    }
  })
})

app.post("/login", multipartMiddleWare, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  let {username, password, email} = req.body
  let uname = "sam"
  let pwd = "123456"

  if(username != uname || password != pwd) {
    res.send({
      status: 201,
      data: {
        msg: "登录失败，请输入正确的密码 和 用户名"
      }
    })
    return
  }

  res.send({
    status: 200,
    data: {
      msg: "登录成功",
      link: "https://www.baidu.com"
    }
  })
})

app.listen(3200, () => {
  console.log("服务器已开启, 监听3200端口")
})