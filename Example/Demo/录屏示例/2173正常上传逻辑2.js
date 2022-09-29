let axios = require("axios")
let {$} = require("./src/assets/js/utils")

let btn = $(".record-btn")

let chunks = []
let count = 1
// let setTimeoutCount = 1

let partNumber = 1

let type = "video/webm;codecs=vp9"


btn.addEventListener("click", async function() {

  let seconds = 0
  let timer = setInterval(() => {
    seconds++
  }, 1000)

  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  })

  let mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
    ? "video/webm; codecs=vp9"
    : "video/webm"

  let mediaRecorder = new MediaRecorder(stream, {
    mimeType: mime
  })

  

  mediaRecorder.addEventListener("dataavailable", async function(e) {


    // chunks.push(e.data)
    console.log(`dataavailable事件在第 ${seconds} 秒的时候触发了 ${count++} 次`)

    // let str = await notify()
    // console.log(`在 第 ${seconds} 秒 的时候输出 await --- : ${str}`)
    // console.log("")

    // 每次触发 dataavailable 事件后 将这一个部分的 data 上传到服务器
    chunks.push(e.data)
    type = chunks[0].type
    let webm = new Blob(chunks, {type})
    chunks = []

    let formdata = new FormData()
    formdata.append("filename", partNumber++)
    formdata.append("filetype", type)
    formdata.append("file", webm)

    try {
      let {data: res} = await request({
        method: "post",
        data: formdata
      })
      console.log(`上传后的时间是: ${seconds}, 上传的结果为: ${res.msg} - ${res.partNumber}`)
      console.log("")

    } catch(err) {
      console.log("error: ", err)
    }
    
  })

  mediaRecorder.addEventListener("stop", function() {

    clearInterval(timer)

    let blob = new Blob(chunks, {
      type: chunks[0].type
    })

    let url = URL.createObjectURL(blob)
    let video = document.querySelector(".video")
    video.src = url
  })
  

  mediaRecorder.start(2000)
})


// async function notify() {
  
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(`第 ${setTimeoutCount++} 的5000的setTimout`)
//     }, 5000)
//   })
  
// }

/*
  验证1: 
    dataavailable 确实是指定 毫秒后 触发一次

  验证2: 
    看看 dataavailable 和 notify 中输出是否一致
      -- 一致

  验证3:
    dataavailable的事件回调 和 setTimeout 是否在一个队列中排队
      -- 不是 是每次触发dataavailable后 都会向 宏任务中丢一个setTimeout 
         类似在队列中只排了 setTimeout 而它的执行跟秒数有关系 会出现下面的情况
         相当于 dataavailable 只管推, setTimeout的执行在另一条路上 时间到了我就插到主干道执行

         dataavailable ----- : dataavailable  // 2秒一次
         dataavailable ----- : dataavailable  // 2秒一次

            notify ----- : setTimeout // 3秒一次

        dataavailable ----- : dataavailable  // 2秒一次
            notify ----- : setTimeout // 3秒一次

  验证4: 3000
    尝试 await 看看验证3中的结果是否有变化
      添加 await 和 async 的逻辑后 真的会依次等待

      dataavailable事件在第 4 秒的时候触发了 1 次
      第一次的await str输出放在了 第二个dataavailable事件触发中

      dataavailable事件在第 7 秒的时候触发了 2 次
      在 第 7 秒 的时候输出 await --- : 第 1 的3000的setTimout

      dataavailable事件在第 10 秒的时候触发了 3 次
      在 第 10 秒 的时候输出 await --- : 第 2 的3000的setTimout

      dataavailable事件在第 12 秒的时候触发了 4 次
      在 第 13 秒 的时候输出 await --- : 第 3 的3000的setTimout

      dataavailable事件在第 15 秒的时候触发了 5 次
      在 第 15 秒 的时候输出 await --- : 第 4 的3000的setTimout

      dataavailable事件在第 17 秒的时候触发了 6 次
      在 第 18 秒 的时候输出 await --- : 第 5 的3000的setTimout

      dataavailable事件在第 20 秒的时候触发了 7 次
      在 第 20 秒 的时候输出 await --- : 第 6 的3000的setTimout

      dataavailable事件在第 22 秒的时候触发了 8 次
      在 第 23 秒 的时候输出 await --- : 第 7 的3000的setTimout

      dataavailable事件在第 24 秒的时候触发了 9 次
      在 第 25 秒 的时候输出 await --- : 第 8 的3000的setTimout

      dataavailable事件在第 26 秒的时候触发了 10 次
      在 第 27 秒 的时候输出 await --- : 第 9 的3000的setTimout

      dataavailable事件在第 29 秒的时候触发了 11 次
      在 第 29 秒 的时候输出 await --- : 第 10 的3000的setTimout

      dataavailable事件在第 31 秒的时候触发了 12 次
      在 第 32 秒 的时候输出 await --- : 第 11 的3000的setTimout

      dataavailable事件在第 33 秒的时候触发了 13 次
      在 第 33 秒 的时候输出 await --- : 第 12 的3000的setTimout

      在 第 33 秒 的时候输出 await --- : 第 13 的3000的setTimout

------

    如果 await 的时间比 dataavailable 要长 它会等到 执行次数dataavailable的事件触发的时候再执行
      dataavailable事件在第 4 秒的时候触发了 1 次
      dataavailable事件在第 6 秒的时候触发了 2 次

      dataavailable事件在第 9 秒的时候触发了 3 次
      在 第 9 秒 的时候输出 await --- : 第 1 的5000的setTimout

      dataavailable事件在第 11 秒的时候触发了 4 次
      在 第 11 秒 的时候输出 await --- : 第 2 的5000的setTimout

      dataavailable事件在第 13 秒的时候触发了 5 次
      在 第 14 秒 的时候输出 await --- : 第 3 的5000的setTimout

      dataavailable事件在第 16 秒的时候触发了 6 次
      在 第 16 秒 的时候输出 await --- : 第 4 的5000的setTimout

      dataavailable事件在第 18 秒的时候触发了 7 次
      在 第 18 秒 的时候输出 await --- : 第 5 的5000的setTimout

      dataavailable事件在第 20 秒的时候触发了 8 次
      在 第 21 秒 的时候输出 await --- : 第 6 的5000的setTimout

      dataavailable事件在第 21 秒的时候触发了 9 次
      在 第 21 秒 的时候输出 await --- : 第 7 的5000的setTimout

    当事件结束的时候 剩下的 await 输出会补回执行
      在 第 21 秒 的时候输出 await --- : 第 8 的5000的setTimout

      在 第 21 秒 的时候输出 await --- : 第 9 的5000的setTimout

  
  验证5: 
    添加上传逻辑 看看是否能够正常的上传  -- 可以

    mediaRecorder.addEventListener("dataavailable", async function(e) {

      chunks.push(e.data)
      type = chunks[0].type
      let webm = new Blob(chunks, {type})
      chunks = []

      let formdata = new FormData()
      formdata.append("filename", partNumber++)
      formdata.append("filetype", type)
      formdata.append("file", webm)

      try {
        let {data: res} = await axios({
          url: "http://127.0.0.1:3000/upload",
          method: "post",
          data: formdata
        })

        console.log("res -----: ", res)

      } catch(err) {
        console.log("error: ", err)
      }
      
    })


  验证7: 
    开启队列上传模式
    
*/




function request(config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000/upload',
    timeout: 5000
  })

  return instance(config)
}

