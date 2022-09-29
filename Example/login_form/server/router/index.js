const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.send({
    status: 200,
    data: {
      msg: "登录成功, 我是首页页面"
    }
  })
})

router.post("/login", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  console.log(req.body)
})

module.exports = router