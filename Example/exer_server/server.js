const express = require('express')
const AppConfig = require('./config')
const app = express()

new AppConfig.run(express, app)


app.listen(8000, () => {
  console.log('服务器800端口已开启');
})

