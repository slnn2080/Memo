const axios = require("axios")
let httpUrl = "https://www.doutula.com/article/detail/9002522"
let options = {
  proxy: {
    // 免费的代理是没有权限验证的
    host: '171.13.202.99',
    port: 9999,
  },
}

axios.get(httpUrl, options).then((data) => {
  console.log(data.data);
})