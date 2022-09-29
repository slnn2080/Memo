const axios = require("axios")
// console.log(axios)


let baseURL = "http://127.0.0.1:3000"
// let num = 0;
// (async () => {
//   console.log("------")
//   let {data: res} = await axios({url: baseURL + "/test"})
//   console.log(res)
//   console.log("++++++")
// })()





// 获取按钮
let btn = $(".record-btn")

// 给 录制按钮 绑定点击事件
btn.addEventListener("click", async function() {
  
  // 会弹出弹窗 让我们选择要录制的区域 指定参数
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  })


  // 需要更好的浏览器支持 设置 我们最终的视频的格式
  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
    ? "video/webm; codecs=vp9"
    : "video/webm"
  

  // 将上面捕获的视频流对象 stream 传入
  let mediaRecorder = new MediaRecorder(stream, {
    mimeType: mime
  })


  // 监听录制的数据
  let chunks = []
  let queue = []

  let id = 0
  let temp = null
  let type = null

  // 如果 start 中指定了 timeslice 则每5秒触发这个事件一次 e.data 就是指定部分的内容
  mediaRecorder.addEventListener("dataavailable", async function(e) {
    debugger
    console.log(" --------------------- ")
    /*
      console.log("mediaRecorder: ----- ", mediaRecorder)
      录制的时候该值为: recording
      当结束录制的时候: inactive
    */

    type = e.data.type

    chunks.push(e.data)
    // console.log("chunks: ----- ", chunks)   // [Blob, Blob]

    let webm = new Blob(chunks, {type})
    chunks = []

    let formdata = new FormData()
    formdata.append("file", webm)

    // 每次都会向队列中 push
    let node = {
      id: id++,
      flag: false,
      data: formdata
    }
    queue.push(node)
    // console.log("do外面打印queue: ", queue)

    
    do {
      // console.log("do中打印 queue: ", queue)

      try {
        // 说明是第一次
        if(!temp) {
          console.log("if逻辑")
          // if(!temp) temp = queue.shift()
          temp = queue.shift()
          console.log("if中从队列中取出的temp: ", temp)

          let res = await axios({
            url: "http://127.0.0.1:3000/upload/" + temp.id,
            method: "post",
            data: temp.data
          })

          console.log("res: ", res.data)
          console.log("这里走了么？")
          
          temp.flag = true
          temp = null

          console.log("if中上传后 temp的情况: ", temp)
          break

        // 上传失败后 temp 会有值
        } else if(temp && !temp?.flag) {
          console.log("else if逻辑")
          console.log("else if中查看队列的情况: ", queue)

          console.log("上传失败后 temp 会有值: ", temp)
          /*
            request(temp.data)
            temp.flag = true
            temp = null
          */
          
          let res = await axios({
            url: "http://127.0.0.1:3000/upload/" + temp.id,
            method: "post",
            data: temp.data
          })
          console.log("else if中的res: ", res.data)

          temp.flag = true
          temp = null
          break

        }

      } catch(err) {
        console.log("err的时候 temp 是: ", temp)
        // temp.flag = false
        break
      }

    } while(true)

    // axios({
    //   url: "http://127.0.0.1:3000/upload",
    //   method: "post",
    //   data: formdata
    // }).then(res => {
    //   console.log(res)
    // }, err => {
    //   console.log(err)
    // })

    // if(mediaRecorder.state == "inactive") notify()
  })

  function notify() {
    console.log("notify 要开始执行了")
  }



  // 点击分享完成 或 录制完成后
  mediaRecorder.addEventListener("stop", function() {

    // 将上面的视频流数据转换为blob 将多个 blob 整合成一个大的blob
    let blob = new Blob(chunks, {
      type
    })

    let url = URL.createObjectURL(blob)
    
    let video = document.querySelector(".video")
    video.src = url

    // 如果想要下面的话
    // let a = document.createElement("a")
    // a.href = url
    // a.download = "video.webm"
    // a.click()
  })

  // 必须手动调用 开始录制
  // mediaRecorder.start()
  mediaRecorder.start(15000)
})

function $(el) {
  return document.querySelector(el)
}

