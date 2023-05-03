import axios from "axios"

// 引入配置文件
import globalConfig from "./global.config.js"

// 引入加密的模块
const crypto = require('crypto');


// 封装 专门向服务器A发送请求的 方法
export function request(config) {
  const instance = axios.create({

    // 属于该实例自己的全局配置
    baseURL: "http://localhost:3333/users/list",
    timeout: 30 * 1000,
    responseType: "json",
    headers: {
      customHeaders: "random content"
    }

  })


  // 请求拦截
  instance.interceptors.request.use(

    // 请求成功的回调
    config => {

      // 获取接口的白名单 和 token加密需要用到的盐
      const {whiteList, secret} = globalConfig

      // 获取请求接口地址
      const requestUrl = config.url

      // 当用户登录后 localStorage 中就会有 token
      const token = localStorage.getItem("token")

      // 判断请求的接口地址是否在 白名单 中
      // 如果不存在白名单中 则token有值(表示用于已经登录有token) 则将token追加到请求头中
      if(!whiteList.includes(requestUrl) && token) {
        config.headers.token = token
      }

      /*
        使用 update() 方法将明文密码传递给它
        使用 digest() 方法将 Hash 对象转换为十六进制字符串
      */
      const hash = crypto.createHash('md5').update(secret).digest('hex');

      // 将 密钥 放入请求头中
      config.headers.secret = hash

      return config
    },

    // 请求失败的回调
    err => Promise.reject(new Error(err))
  )



  // 响应拦截:
  instance.interceptors.response.use(

    // 响应成功的拦截
    res => {

      // 获取后台返回的 code 如果没有 默认为 200
      const code = res.data.code || 200
      // 没有附带消息的话 默认为未知错误
      const msg = res.data.msg || "未知错误"

      // 对特殊的状态码 进行处理
      if(code == 401) {
        alert("你没有权限访问")
        router.push("/login")

        // 抛出去交由页面中的catch进行处理
        return Promise.reject(new Error(msg))
      }

      // 对不是200的状态码统一进行处理
      if(code != 200) {
        alert(`错误码: ${code}, 错误消息:${msg}`)

        // 抛出去交由页面中的catch进行处理
        return Promise.reject(new Error(msg))
      }


      // 将 res 返回出去
      return res
    },


    // 响应失败的拦截
    err => {
      // 考虑到页面人员可能不会写catch 所以我们可以在这里进行统一的错误处理 $message 组件
      alert("出错了")
      return Promise.reject(new Error(err))
    }
  )

  return instance(config)
}