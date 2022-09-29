const Vue = require('vue')

const express = require('express')
const server = express()

server.get('/', (req, res) => {
  const app = new Vue({
    template: `
      <div>
        <h3>我今天开始学习nuxt了</h3>
      </div>
    `
  })

  const renderer = require('vue-server-renderer').createRenderer()
  renderer.renderToString(app).then(html => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `)
  }).catch(err => {
    console.log(err)
  })
})

server.listen(8000, () => {
  console.log('服务器已开启 8000端口')
})