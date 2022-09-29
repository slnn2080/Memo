### Js 实现录制
- 首先我们先简单的实现下视频录制的功能 然后我们再围绕下面的例子使用到的API进行MDN扩充


> mediaDevices对象.getDisplayMedia([constraints])
- 它会弹出一个对话框 让用户选择 录制的区域
- 全屏
- 窗口
- 标签页

- 这个区域会作为 要录制的内容 返回一个 媒体数据流(MediaStream里面包含了请求的媒体类型的轨道)

- 这个媒体数据流用于传输


> 获取 mediaDevices对象 的方式
> navigator.mediaDevices


> 参数: constraints
- 可选
- 指定了返回 MediaStream 的要求
- 因为getDisplayMedia()需要视频轨道，所以即使constraints 对象没有明确请求视频轨道，返回的流也会有一个。

- 类型: 对象
```js
{
  audio: true,
  video: true
}
```

- constraints 参数是一个包含了video 和 audio两个成员
- 用于说明请求的媒体类型。必须至少一个类型或者两个同时可以被指定。
- 如果浏览器无法找到指定的媒体类型或者无法满足相对应的参数要求，那么返回的 Promise 对象就会处于 rejected［失败］状态


- 如果为某种媒体类型设置了 true 
- 得到的结果的流中就需要有此种类型的轨道


- 当由于隐私保护的原因，无法访问用户的摄像头和麦克风信息时，应用可以使用额外的 constraints 参数请求它所需要或者想要的摄像头和麦克风能力。

- 下面演示了应用想要使用 1280x720 的摄像头分辨率：
```js
{
  audio: true,
  video: { width: 1280, height: 720 }
}
```


> 返回值:
- 被解析为 MediaStream 的promise
- promise里面包含:
- 成功的情况:
  视频轨道(视频轨道的内容来自用户选择的屏幕区域)
  音频轨道(可选)

- 失败的情况(比如用户拒绝):
  会返回异常对象
  AbortError: 中止错误
  InvalidStateError: 拒绝错误
  NotAllowedError: 拒绝错误
  NotFoundError: 找不到错误
  NotReadableError: 无法读取错误
  OverconstrainedError: 转换错误
  TypeError: 类型错误


> MediaStream 媒体数据流
- 它里面包含了几个轨道 比如 视频和音频轨道

> 属性:
> MediaStream.active
- 布尔型。如果这个流处于活动状态值为 true，反之为 false

> MediaStream.id
- 这是一个包含 36 个字符的 DOMString ，用来作为这个对象的唯一标识符 (GUID) 。

**它身上还有事件 和 方法 我们这里先不做扩展**
- https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream

------

> MediaRecorder类的静态方法
> MediaRecorder.isTypeSupported(给定的 MIME 类型)
- 判断 是否支持 给定的 mime 类型
- 会判断其 MIME 格式能否被客户端录制。

- 返回值:
- 布尔类型
- 如果 MediaRecorder 在浏览器上的具体实现能够支持指定 MIME 类型的 Blob 对象就返回 true. 
- 如果没有足够的资源来支持录制和编码任务，最终录制依然会失败。如果返回结果是 false，用户的浏览器就无法录制指定的格式。

```js
var types = ["video/webm",
             "audio/webm",
             "video/webm\;codecs=vp8",
             "video/webm\;codecs=daala",
             "video/webm\;codecs=h264",
             "audio/webm\;codecs=opus",
             "video/mpeg"];
```

------

> MediaRecorder
- MediaRecorder 是 MediaStream Recording API 提供的用来进行媒体轻松录制的接口
- 他需要通过调用 MediaRecorder() 构造方法进行实例化。

- 通过调用 实例化对象 身上的方法 我们来实现录制的功能

> let mediaRecorder = new MediaRecorder(stream, [options])
> 参数 stream: 
- 为 MediaStream 对象 
- 比如我们上面 通过调用下面的方法获取的 要捕捉视频的区域 它的返回值就是一个 stream(MediaStream对象)

  mediaDevices对象.getDisplayMedia()


- 或者还可以通过

  mediaDevices对象.getUserMedia() 创建流

- 再或者

  <audio> <video> <canvas> 等 DOM 元素


> 参数 options: 
- 类型: 对象
```js
{
  mimeType: 
  为新构建的 MediaRecorder 指定录制容器的 MIME 类型,
  (例如"video/webm" 或者 "video/mp4")

  audioBitsPerSecond: 
  指定音频的比特率,

  videoBitsPerSecond: 
  指定视频的比特率,

  bitsPerSecond: 
  指定音频和视频的比特率。此属性可以用来指定上面两个属性 如果上面两个属性只有其中之一和此属性被指定，则此属性可以用于设定另外一个属性。
}
```


> 事件:
> 获取录制的数据事件
> mediaRecorder对象.ondataavailable = 回调
- 回调中的事件对象 e 身上有 data 属性
- 它会提供 blob对象 这个就是录制的数据 e.data


> 发生错误时触发的事件
> mediaRecorder对象.onerror

> 发生暂停时触发的事件
> mediaRecorder对象.onpause
- 比如调用了暂停的方法 mediaRecorder对象.pause()

> 恢复录制时触发的事件
> mediaRecorder对象.onresume
- 比如调用了恢复的方法 mediaRecorder对象.resume()

> 开始录制时触发的事件
> mediaRecorder对象.onstart
- 比如调用了开始录制的方法 mediaRecorder对象.start()

> 停止录制时触发的事件
> mediaRecorder对象.onstop
- 比如调用了开始暂停的方法 mediaRecorder对象.stop()



> 方法:
> mediaRecorder对象.start([timeslice])
- 开始录制的方法
- 它会将数据录制到一个或多个 Blob 中

- 我们可以将整个视频录制成一个Blob对象(或直到调用requestData()为止)
- 也可以传递一个记录的毫秒数 这相当于一个录制时长 每录满指定时长后 都会发送到对应处理的事件中 然后开始下一次的录制


> 参数: timeslice
- 记录到每个Blob
- 如果不包含此参数，则整个媒体持续时间将被记录到一个单一 Blob的，除非requestData() 调用该方法来获取Blob并触发创建一个新 Blob的媒体继续记录到其中。

- 返回值: 无

---

> mediaRecorder对象.stop()
- 用于停止媒体捕获。


----------------

### 案例:
- 上面介绍了一部分的录制 API 下面我们看下例子
```html
<video class="video" width="600px" controls></video>
<button class="record-btn">record</button>
```

```js
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
  // 如果 start 中指定了 timeslice 则每5秒触发这个事件一次 e.data 就是指定部分的内容
  mediaRecorder.addEventListener("dataavailable", function(e) {
    console.log("mediaRecorder: ----- ", mediaRecorder)
    /*
      录制的时候该值为: recording
      当结束录制的时候: inactive
    */
    chunks.push(e.data)
  })



  // 点击分享完成 或 录制完成后
  mediaRecorder.addEventListener("stop", function() {

    // 将上面的视频流数据转换为blob
    let blob = new Blob(chunks, {
      type: chunks[0].type
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
  mediaRecorder.start(5000)
})

function $(el) {
  return document.querySelector(el)
}
```

- 1. 给按年绑定 点击事件
- 2. 指定录制区域: navigator.mediaDevices.getDisplayMedia()
- 3. 创建mine  MediaRecorder.isTypeSupported("video/webm; codecs=vp9")

在一个点击按钮的事件中 我们绑定3个 mediaRecorder 的事件

- dataavailable
每 start 毫秒数会触发一次该事件 我们将 e.data push到 chunks 数组中

- stop
stop中处理上传和展示到我们自己的 video 中的逻辑

- start
start中指定了 分部分触发 dataavailable 事件的毫秒数


----------------

### MediaStream Recording API
- MediaStream Recording API 由一个主接口MediaRecorder组成
- 这个接口负责的所有工作是从 *MediaStream* 获取数据并将其传递给你进行处理。

- 数据通过一系列dataavailable事件传递，这些数据已经成为你创建 MediaRecorder 时所声明的格式。然后，您可以进一步处理数据，或者根据需要将其写入文件。


> 录制过程概述
- 1. 建立一个 MediaStream或者HTMLMediaElement (以 <audio> 或 <video> 元素的形式) 来充当媒体数据的源
- 2. 创建一个 MediaRecorder 对象，指定源以及任何有需求的的选项 (比如容器的 MIME 类型或它轨道所需的比特率).
- 3. 给 dataavailable 事件设置MediaRecorder.ondataavailable 事件处理函数; 会在数据可利用时候调用。

- 4. 一旦媒体源播放，你已经准备好录制，使用 MediaRecorder.start() 开始录制。
- 5. dataavailable 事件处理函数正如你所愿的在每次数据准备好时调用; 这个事件有一个值为包含媒体数据的Blob 类型的 data 属性。你可以强制 dataavailable 事件发生，因此会给你传递最新的声音以至于可以让你过滤、保存或者做一些其他的事情。

- 6. 当源媒体停止播放时候，录制自动结束。
- 你可以随时结束录制通过使用 MediaRecorder.stop()

----------------


### xxx API MDN 整理

> 获取 mediaDevices 对象
> navigator.mediaDevices

- mediaDevices是navigator的只读属性 返回一个 mediaDevices 对象

- mediaDevices的作用:
- 该对象可提供对相机 和 麦克风 屏幕共享等媒体输入设备的链接访问 

```js
let mediaDevices = navigator.mediaDevices
```

---

> mediaDevices 对象:
- 它是一个接口 提供访问连接媒体输入的设备

- 照相机
- 麦克风
- 屏幕共享等

- 它可以使你取得任何硬件资源的媒体数据


> 事件:
> devicechange
- 返回 devicechange 事件类型的事件处理程序。 
- 也可通过 ondevicechange 访问


> 方法:
> mediaDevices对象.enumerateDevices()
- 请求一个可用的媒体输入和输出设备的列表，例如麦克风，摄像机，耳机设备等。

- 返回的 Promise 完成时 会带有一个描述设备的 MediaDeviceInfo 数组

- 返回值:
- Promise
- 当完成的时候 它接收一个 *MediaDeviceInfo* 对象数组 
- 每一个对象描述一个可用的媒体输入输出设备
- 如果枚举失败 promise 也会被拒绝

```js

// 返回值是promise 
if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("不支持 enumerateDevices() 方法")
  return
}


// 获取 媒体输入输出列表(res)
navigator.mediaDevices.enumerateDevices().then(devices => {
  devices.forEach(device => {
    console.log(device.kind + " : " + device.label + " id = " + device.deviceId)
  })
})



// res是 MediaDeviceInfo对象数组  结果:
[InputDeviceInfo, InputDeviceInfo, MediaDeviceInfo]

- MediaDeviceInfo:
- InputDeviceInfo:

  - deviceId: ""
  - groupId: "adb140bb347d64fe5bcaf7fd00cac7a1a2c38d92f2ff613a284e6bbf9d83d34f"
  - kind: "audioinput"
  - label: ""
```


> MediaDevicesInfo
- 该接口包含表明一个媒体是输入还是输出设备的信息。
- 它是一个对象数组, 一个元素是一个媒体设备

> MediaDevicesInfo 对象属性:
> deviceId:
- 返回一个设备标识符的DOMString。 
- 这个标识符在不同的会话中被保留。 
- 这个标识符不能被其他应用程序猜到，对调用的应用程序源来说是唯一的。 
- 当用户清除cookie时，这个标识符会被重置（一个不同的标识符用于私人浏览，不跨时段保留）。


> groupId:
- 返回组标识符的DOMString；
- 如果两个设备有相同的组标识符，它们属于同一个物理设备。 
- 这方面的例子包括一个集成了摄像头和麦克风的显示器。


> kind:
- 标识了是什么设备
- "videoinput"、"audioinput" 、"audiooutput" 返回其中的一个
- 视频输入
- 音频输入
- 音频输出


> label:
- 返回一个DOMString，这是一个描述设备的标签。
<!-- 
  出于安全原因，标签字段将始终为空，
  除非有一个活动的媒体流或用户对媒体设备授予持续授权。 
  设备标签的组合可以作为指纹的一部分来识别用户。
 -->

------

> MediaStream
- 它是一个接口
- 是一个媒体内容的流 一个流包含几个轨道 比如视频和音频轨道


> 属性:
> MediaStream.active
- 布尔型。如果这个流处于活动状态值为 true，反之为 false


> MediaStream.id
- 这是一个包含 36 个字符的 DOMString ，用来作为这个对象的唯一标识符 (GUID) 。


> 事件:
> MediaStream.onaddtrack
- addtrack事件在这个对象上触发时调用的事件处理器[event handler]
- 这时一个 *MediaStreamTrack对象* 被添加到这个流。


> MediaStream.onended
- 这是当流终止 [ended] 时触发的事件。


> MediaStream.onremovetrack
- 这是removetrack事件在这个对象上触发事调用的事件处理器 [event handler]，这时一个对象从流上移除。



> 方法:
> MediaStream.addTrack()
- 存储传入参数 MediaStreamTrack 的一个副本。
- 如果这个轨道已经被添加到了这个媒体流，什么也不会发生; 
- 如果目标轨道为“完成”状态（也就是已经到尾部了），一个 INVALID_STATE_RAISE 异常会产生。


> MediaStream.clone()
- 返回这个MediaStream 对象的克隆版本。返回的版本会有一个新的 ID。
- 返回给定 ID 的轨道。
  如果没有参数或者没有指定 ID 的轨道，将返回 null。
  如果有几个轨道有同一个 ID，将返回第一个。


> MediaStream.getTracks()
- 返回流中所有的MediaStreamTrack列表。


> MediaStream.getAudioTracks()
- 返回流中 kind 属性为"audio"的MediaStreamTrack列表。顺序是不确定的，不同浏览器间会有不同，每次调用也有可能不同。


> MediaStream.getTrackById()
- 返回给定 ID 的轨道。如果没有参数或者没有指定 ID 的轨道，将返回 null。如果有几个轨道有同一个 ID，将返回第一个。


> MediaStream.getVideoTracks()
- 返回流中 kind 属性为"video"的MediaStreamTrack列表。顺序是不确定的，不同浏览器间会有不同，每次调用也有可能不同。


> MediaStream.removeTrack()
- 移除作为参数传入的 MediaStreamTrack。 如果这个轨道不在MediaStream 对象中什么也不会发生； 如果目标轨道为“完成”状态，一个 INVALID_STATE_RAISE 异常会产生。

------

> MediaStreamTrack
- MediaStreamTrack 接口在 User Agent 中表示一段媒体源，比如音轨或视频。

- https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStreamTrack


------

> mediaDevices对象.getDisplayMedia()
- 提示用户去选择和授权捕获展示的内容或部分内容（如一个窗口）在一个 MediaStream 里. 然后，这个媒体流可以通过使用 MediaStream Recording API 被记录或者作为WebRTC 会话的一部分被传输。















> mediaDevices对象.getUserMedia()
- 通过调用 mediaDevices对象 身上的 getUserMedia() 方法
- 会提示用户给予使用媒体输入的许可，媒体输入会产生一个*MediaStream*
<!-- 
  里面包含了请求的媒体类型的轨道。
  此流可以包含
    一个视频轨道
      （来自硬件或者虚拟视频源，比如相机、视频采集设备和屏幕共享服务等等）

    一个音频轨道
      （同样来自硬件或虚拟音频源，比如麦克风、A/D 转换器等等），

    也可能是其它轨道类型。
 -->

- 返回值:
- Promise对象
- 成功后会 resolve 回调一个 MediaStream 对象
- 用户拒绝使用权限或者需要的媒体源不可用 会执行 reject 回调一个 PermissionDeniedError 或者 NotFoundError

**注意:**
- 返回的 promise 对象可能既不会 resolve 也不会 reject，因为用户不是必须选择允许或拒绝。

- 







----------------

### MediaRecorder
- MediaRecorder 是 MediaStream Recording API 提供的用来进行媒体录制的接口

- 它需要通过调用 MediaRecorder() 构造函数实例化


> 创建 MediaRecorder 对象
> new MediaRecorder(stream, [options])
- 创建 MediaRecorder 对象对指定的 MediaStream 对象进行录制

- 支持的配置项包括设置容器的 MIME 类型 (例如"video/webm" 或者 "video/mp4") 和音频及视频的码率或者二者同用一个码率


```js
let mediaRecorder = new MediaRecorder(stream, [options])
```

> 参数: stream
- 将要录制的流 它可以是来自于使用
- navigator.mediaDevices.getUserMedia() 创建的流
- 或者 audio video canvas DOM元素


> 配置项:
> mimeType
- 为新构建的 MediaRecorder 指定录制容器的 MIME 类型。在应用中通过调用
- MediaRecorder.isTypeSupported() 来检查浏览器是否支持此种mimeType


> audioBitsPerSecond
- 指定音频的比特率。

> videoBitsPerSecond
- 指定视频的比特率。

> bitsPerSecond
- 指定音频和视频的比特率。
- 此属性可以用来指定上面两个属性. 如果上面两个属性只有其中之一和此属性被指定，则此属性可以用于设定另外一个属性。

<!-- 
  如果视频和/或音频的比特率没有指定，视频默认采用的比特率是 2.5Mbps，
  但音频的默认比特率并不固定，音频的默认比特率根据采样率和轨道数自适应。
 -->


- 如果对指定的流 创建一个
  音频比特率为 128kbps
  视频比特率为 2.5Mbps 的媒体录制器。
  
- 被录制的媒体数据会以 MP4 格式封装 (因此你若获取这些媒体数据片段，并存放到磁盘上去，你就会得到一个 mp4 文件)







> state
- 返回录制对象MediaRecorder 的当前状态
- 闲置中: inactive
- 录制中: recording
- 暂停:   paused


> MediaRecorder.stream
- 返回录制器对象 MediaRecorder 创建时构造函数传入的 stream 对象


> MediaRecorder.ignoreMutedMedia
- 用以指定 MediaRecorder是否录制无声的输入源。
- 如果这个属性是 false. 录制器对象MediaRecorder 会录制无声的音频或者黑屏的视频，默认值是 false


> MediaRecorder.videoBitsPerSecond
- 返回视频采用的编码比率。它可能和构造函数的设置比率不同. (if it was provided).


> MediaRecorder.audioBitsPerSecond
- 返回音频采用的编码比率，它可能和构造函数中设置的比率不同. (if it was provided).



> 方法:
> MediaRecorder.isTypeSupported()
- 返回一个Boolean值，来表示设置的 MIME type 是否被当前用户的设备支持。


> MediaRecorder.pause()
- 暂停媒体录制


> MediaRecorder.requestData()
- 请求一个从开始到当前接收到的，存储为Blob类型的录制内容. 
- (或者是返回从上一次调用requestData() 方法之后到现在的内容)

- 调用这个方法后，录制将会继续进行，但是会创建一个新的Blob对象


> MediaRecorder.resume()
- 继续录制之前被暂停的录制动作。


> MediaRecorder.start()
- 开始录制媒体
- 这个方法调用时可以通过给timeslice参数设置一个毫秒值，如果设置这个毫秒值，那么录制的媒体会按照你设置的值进行分割成一个个单独的区块，而不是以默认的方式录制一个非常大的整块内容。


> MediaRecorder.stop()
- 停止录制。同时触发dataavailable事件，返回一个存储Blob内容的录制数据。之后不再记录

------

> 静态方法:
> MediaRecorder.isTypeSupported()
- 静态方法，判断给定的 MIME 类型是否支持。返回Boolean

------

> 事件处理:
> MediaRecorder.ondataavailable
- 调用它用来处理 dataavailable 事件，该事件可用于获取录制的媒体资源 (在事件的 data 属性中会提供一个可用的 Blob 对象.)


> MediaRecorder.onerror
- 一个被调用的事件处理程序，用于处理recordingerror事件，包括报告媒体录制中出现的错误。这些是致命的错误，会停止录制。


> MediaRecorder.onpause
用来处理 pause 事件，该事件在媒体暂停录制时触发（MediaRecorder.pause()）


> MediaRecorder.onresume
0 用来处理 resume 事件，该事件在暂停后回复录制视频时触发（MediaRecorder.resume()）.


> MediaRecorder.onstart
- 用来处理 start 事件，该事件在媒体开始录制时触发（MediaRecorder.start()）.


> MediaRecorder.onstop
- 用来处理 stop 事件，该事件会在媒体录制结束时、媒体流（MediaStream）结束时、或者调用MediaRecorder.stop() 方法后触发。