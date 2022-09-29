const Vue = require('vue')
const app = new Vue({
  template: `
    <div>
      <h3>我今天开始学习nuxt了</h3>
    </div>
  `
})

const renderer = require('vue-server-renderer').createRenderer()

// renderer.renderToString(app, (err, html) => {
//   console.log(err, html);
// })

renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.log(err)
})
