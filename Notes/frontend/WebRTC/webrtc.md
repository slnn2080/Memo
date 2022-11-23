# WebRTC

## 什么是 WebRTC
WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC 包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

<br><br>

## WebRTC 的应用场景
- 直播
- 游戏
- 视频会议/在线教育
- 屏幕共享/远程控制
- 等等等

<br><br>

## 媒体流
要想了解 WebRTC，首先要了解媒体流，媒体流可以是来自本地设备的，也可以是来自远程设备的。媒体流可以是实时的，也可以是非实时的。上述的应用场景中，我们都需要使用到媒体流，我们可以通过摄像头，麦克风，屏幕共享等方式获取到媒体流，然后通过 WebRTC 技术将媒体流传输到远端实现实时通讯。

<br><br>

## 摄像头获取媒体流及一些其他操作
要实现 音视频通话，我们肯定要先获取到摄像头的媒体流，然后通过 WebRTC 技术将媒体流传输到远端实现实时通讯。下面我们先通过一个简单的拍照小应用来看一下如何通过摄像头获取媒体流。

先设置好用于播放媒体流的 video 标签，添加一个 autoplay 属性，这样就可以在摄像头获取到媒体流后自动播放了
```html
<video id="localVideo" autoplay playsinline muted></video>
```

**注意**    
WebRTC 只能在 HTTPS 协议或者 localhost 下使用，如果是 HTTP 协议，会报错。

<br><br>

我们主要通过``navigator.mediaDevices.getUserMedia(constraints)``这个 api 来获取媒体流

这个方法接收一个配置对象作为参数，配置对象中包含了媒体流的类型，以及媒体流的分辨率等信息。


```js
// 获取本地音视频流
async function getLocalStream(constraints: MediaStreamConstraints) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
}
```

其中constraints指定了请求的媒体类型和相对应的参数，用于配置视频流和音频流的信息。

我可以看下constraints参数中具体支持哪些配置项，可以通过``navigator.mediaDevices.getSupportedConstraints()``这个方法来获取。

```js
console.log(
  '🚀🚀🚀 / SupportedConstraints',
  navigator.mediaDevices.getSupportedConstraints(),
)
```

通常我们不设置constraints参数，那么默认就是获取摄像头和麦克风的媒体流，如果我们只想要获取摄像头的媒体流，那么我们可以这样设置：

```js
navigator.mediaDevices.getUserMedia({
  audio: false,
  video: true,
})

// 如果我们想要获取视频的高度宽度，那么我们可以这样设置：
navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: 1280,
    height: 720,
  },
})
```

诸如此类，video 中也可以设置设备 id 或者前后置摄像头...， 大家可以在支持的情况下根据自己的需求来设置即可。

<br><br>

获取通过摄像头获取媒体流后，将媒体流赋值给 video 标签的 srcObject 属性，让其播放。
```js
// 获取本地音视频流
async function getLocalStream(constraints: MediaStreamConstraints) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  // 将媒体流设置到 video 标签上播放
  playLocalStream(stream)
}

// 播放本地视频流
function playLocalStream(stream: MediaStream) {
  const videoEl = document.getElementById('localVideo') as HTMLVideoElement
  videoEl.srcObject = stream
}

getLocalStream({
  audio: false,
  video: true,
})
```

<br><br>

## 实现拍照功能
canvas 标签可以将媒体流绘制到 canvas 上，也可以通过 toDataURL 方法将 canvas 转换为 base64 图片后做一些其他操作。
```html
<video id="localVideo" autoplay playsinline muted></video>
<div v-for="(item,index) in imgList.length" :key="index" class="item">
  <img :src="item" alt="" />
</div>
```

我们通过获取已经在播放媒体流的 video 标签，然后将其绘制到 canvas 上，再通过 toDataURL 方法将 canvas 转换为 base64 图片。

这里你可以加一些滤镜或者加一些美颜功能或是其他的操作，最终生成的 imgUrl 给到 img 标签让其展示就行了

```js
// 拍照
function takePhoto() {
  const videoEl = document.getElementById('localVideo') as HTMLVideoElement
  const canvas = document.createElement('canvas')
  canvas.width = videoEl.videoWidth
  canvas.height = videoEl.videoHeight
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
  imgList.value.push(canvas.toDataURL('image/png'))
  console.log('🚀🚀🚀 / imgList', imgList)

  // 添加滤镜
  const filterList = [
    'blur(5px)', // 模糊
    'brightness(0.5)', // 亮度
    'contrast(200%)', // 对比度
    'grayscale(100%)', // 灰度
    'hue-rotate(90deg)', // 色相旋转
    'invert(100%)', // 反色
    'opacity(90%)', // 透明度
    'saturate(200%)', // 饱和度
    'saturate(20%)', // 饱和度
    'sepia(100%)', // 褐色
    'drop-shadow(4px 4px 8px blue)', // 阴影
  ]

  for (let i = 0; i < filterList.length; i++) {
    ctx.filter = filterList[i]
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
    imgList.value.push(canvas.toDataURL('image/png'))
  }
}
```

<br><br>

## 切换设备
```js
function handleDeviceChange(deviceId: string) {
  getLocalStream()
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      deviceId: { exact: deviceId },
    },
  })
}

```

这里我们把获取到的设备列表信息打印看看，我们可以看到每个设备都有一个 deviceId，我们就是通过这个 id 来切换设备的。

可以看到，获得了多个摄像头设备，我这里是一个笔记本自带的摄像头和一个 OBS 虚拟摄像头，包括最近 MacOs 更新到 Ventura 13 ,IOS 更新到 16 后的连续互通摄像头，都可以获取到。这样我们就可以在视频的时候，就可以通过拍摄更清晰的手机后置来拍摄了。

虚拟摄像头更有意思，在 OBS 中开启虚拟摄像头后，可以播放一个视频，然后进行视频会议，这样你甚至可以提前录制好一个端坐的视频（简直是上网课必备！😅），我之前试过播放特朗普的视频，然后微信视频，对面看到的确实是特朗普在演讲，所以说这方面很有安全隐患，所以大家在网上和别人视频的时候，还是需要注意下，对方可能不是真的。

<br>

说完了切换摄像头，我们再来看看如何在支持切换前后置摄像头的设备上如何切换前后摄像头。我们可以通过指定 facingMode 来实现，facingMode 有 4 个值，分别是 user、environment 和 left、right，分别对应前后摄像头和左右摄像头。

<br><br>

## 切换前后摄像头
当需要强制使用前置摄像头时，可以使用 exact 关键字，例如 facingMode: { exact: 'user' }，强制切换前后摄像头时，当摄像头不支持时，会报一个 OverconstrainedError［无法满足要求的错误］

```js
function switchCamera(val: number) {
  let constraints = {
    video: true, // 开启默认摄像头
    audio: true,
  }
  constraints.video = {
    // 强制切换前后摄像头时，当摄像头不支持时，会报一个OverconstrainedError［无法满足要求的错误］
    facingMode: { exact: val === 1 ? 'user' : 'environment' },
    // 也可以这样当前后摄像头不支持切换时，会继续使用当前摄像头，好处是不会报错
    // facingMode: val === 1 ? 'user' : 'environment',
  }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      ElMessage.success('切换成功')
      playLocalStream(stream)
    })
    .catch((err) => {
      ElMessage.error('你的设备不支持切换前后摄像头')
    })
}
switchCamera(1) // 切换前置摄像头
```

<br><br>

## 通过屏幕共享获取获取媒体流，实现录制等操作
在视频会议中，我们经常会使用到屏幕共享，已经我们经常会有录制屏幕等需求，市面上还有那么多需要付费的软件，我们通过 WebRTC 配合一些相关 api 自己实现一个不是更好吗？🤔🤔🤔 既省钱又学到了知识。
那么我们如何通过屏幕共享获取媒体流并实现录制呢？下面通过一个小 demo 来简单实现一下。
在 WebRTC 中，我们可以通过 getDisplayMedia 来获取屏幕共享的媒体流，这个 API 与 getUserMedia 类似，但是它只能获取屏幕共享的媒体流。

```js
// 获取屏幕共享的媒体流
async function shareScreen() {
  let localStream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: true,
  })
  // 播放本地视频流
  playStream(localStream)
}

// 在视频标签中播放视频流
function playStream(stream: MediaStream) {
  const video = document.querySelector('#localVideo') as HTMLVideoElement
  video.srcObject = stream
}

```

执行 shareScreen 函数后，会弹出一个权限询问框，询问是否允许获取屏幕共享的媒体流。 然后你就可以分享你的整个屏幕，如果你又多个屏幕的话，你可以选择其中一个进行分享

然后你也可以选择只分享你屏幕上的某个应用的窗口，不用担心你一边干嘛干嘛一边录制屏幕，它只会捕捉你选择的应用窗口的内容。非常 nice。

你甚至可以在你浏览器打开的各种页面中，选择一个你想要分享的网页，当你页面各种切换时候，你的屏幕共享也只会显示你选择的网页的内容。

共享前你可以随便选一个进行预览，然后可以选择是否分享的时候包含页面中的音频，这样你获取的媒体流就会包含音频轨道了。

这里我打开自己 github 的网页，然后点击屏幕共享，可以看到共享的只有自己的 github 页面了。不用担心会有什么奇怪的东西乱入进来，非常适合视频会议或者在线教育等场景。

说完获取屏幕媒体流，接下来我们来看看如何通过媒体流进行录制。

<br><br>

## 检查浏览器支持的 mime 类型
这里我们使用 MediaRecorder 来进行录制，它是一个用于录制媒体流的 API，它可以将媒体流中的数据进行录制，然后将录制的数据保存成一个文件。
由于 MediaRecorder api 的对 mimeType 参数的支持是有限的。所以我们需要通过 MediaRecorder.isTypeSupported 来判断当前浏览器是否支持我们需要的 mimeType。
chrome 中 MediaRecorder 支持的 mimeType 如下：

```js
"video/webm"
"video/webm;codecs=vp8"
"video/webm;codecs=vp9"
"video/webm;codecs=h264"
"video/x-matroska;codecs=avc1"
```

为了验证上述的内容，这里我把一些常用的 mimeType 列出来，拼装后通过 MediaRecorder.isTypeSupported 来判断是否支持，最后放到下拉框中供用户根据自己的需求选择合适的 mimeType。

```js
// 获取支持的媒体类型
function getSupportedMimeTypes() {
  const media = 'video'
  // 常用的视频格式
  const types = [
    'webm',
    'mp4',
    'ogg',
    'mov',
    'avi',
    'wmv',
    'flv',
    'mkv',
    'ts',
    'x-matroska',
  ]
  // 常用的视频编码
  const codecs = ['vp9', 'vp9.0', 'vp8', 'vp8.0', 'avc1', 'av1', 'h265', 'h264']
  // 支持的媒体类型
  const supported: string[] = []
  const isSupported = MediaRecorder.isTypeSupported
  // 遍历判断所有的媒体类型
  types.forEach((type: string) => {
    const mimeType = `${media}/${type}`
    codecs.forEach((codec: string) =>
      [
        `${mimeType};codecs=${codec}`,
        `${mimeType};codecs=${codec.toUpperCase()}`,
      ].forEach((variation) => {
        if (isSupported(variation)) supported.push(variation)
      }),
    )
    if (isSupported(mimeType)) supported.push(mimeType)
  })
  return supported
}

console.log(getSupportedMimeTypes())
```


<br>

也可以通过这个网址👉🏻media-mime-support 来查看当前浏览器所支持的 mimeType 的情况。
```s
https://cconcolato.github.io/media-mime-support/
```

目前最常用的一般都是 video/mp4。 截止到目前为止，最佳的 8 种视频格式为：mp4 ,webm ,mov ,avi ,mkv ,wmv ,avchd ,flv。而 webm 是 Google 专门为 web 端推出的一种视频格式。100% 开源，且 100%兼容 Google Chrome 浏览器和 Android 设备。如果你没有强烈的需求，也可以使用 webm 格式

说了这么多，不支持就不能录制成 mp4 了？🥲
肯定不是啊 😂

都拿到 blob 了，可以通过 ffmpeg.js 来将 webm 格式转换成 mp4 格式，但是 ffmpeg.js 的体积比较大，太重了。这里也可以通过一种 hack 的方式来实现，但是不靠谱，这种方式导出的 mp4 文件部分软件可能会识别不了，求稳的话最好还是推荐使用我们浏览器环境列出的支持的 mimeType，或者用工具转一下)

```js
// 录制媒体流
function startRecord() {
  const kbps = 1024
  const Mbps = kbps * kbps
  const options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: 'video/webm; codecs="vp8,opus"',
  }
  const mediaRecorder = new MediaRecorder(localStream, options)
  mediaRecorder.start()

  mediaRecorder.ondataavailable = (e) => {
    // 将录制的数据合并成一个 Blob 对象
    // const blob = new Blob([e.data], { type: e.data.type })

    // 🌸重点是这个地方，我们不要把获取到的 e.data.type设置成 blob 的 type，而是直接改成 mp4
    const blob = new Blob([e.data], { type: 'video/mp4' })
    downloadBlob(blob)
  }
  mediaRecorder.onstop = (e: Event) => {
    // 停止录制
  }
}

// 下载 Blob
function downloadBlob(blob: Blob) {
  // 将 Blob 对象转换成一个 URL 地址
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
  a.href = url
  // 设置 a 标签的 download 属性为文件名
  a.download = `${new Date().getTime()}.${blob.type.split('/')[1]}`
  // 模拟点击 a 标签
  a.click()
  // 释放 URL 地址
  URL.revokeObjectURL(url)
}

```

<br><br>

## 将视频流制作成gif

当然，既然都拿到了媒体流，那么我们也可以将媒体流中的视频轨道录制成 gif 图片，这样在一些场景下分享起来也会更加方便。

由于 MediaRecorder api 不支持将 mimeType 设置成 image/gif ，所以我们需要借助一个**第三方库MediaStreamRecorder**来实现。它的用法和 MediaRecorder 基本一致。我就不再赘述了。

<br>

### 注意
也是我在实际项目中遇到的问题。截止到目前为止，在使用 MediaRecorder 录制视频的时候，如果你的系统是 Windows 或者 Chrome OS，那么录制的视频没什么问题，但是在 Mac 和 Linux 上，录制摄像头和分享屏幕时，选择网页的分享方式，所拿获得的媒体流是可以拿到视频轨道和音频轨道的，但是录制整个屏幕时，由于系统的限制，只能拿到视频的轨道。好在一般录屏都不会有带音频的需求，期待后面能够支持。

<br><br>

## 实现视频的虚拟背景
在视频会议中，我们经常会看到一些人在视频中的背景是虚拟的，这样可以让我们更专注于对方的表情和语言，而不会被背景中的一些干扰因素所分散注意力。那么我们如何实现这样的效果呢？

主要原理是通过 canvas 将视频中的每一帧画到画布上，然后将画布中的像素逐个与设定的背景色（默认是绿色，你可以更换为任意符合你背景的颜色）进行计算，比较后的差值达到设定的阈值时，对其进行处理，将其更换为预先准备好的背景图的图像数据，最后将处理后的图像数据再画到虚拟背景画布上，通过虚拟背景画布拿到媒体流后给到 video 标签播放， 这样就实现了视频的虚拟背景效果。

为保持大小一致，这里我们统一设置画布和视频的宽高为 480*300。

```html
<canvas id="backgroundImg" width="480" height="300"></canvas>
<video id="real-video" width="480" height="300" autoplay muted></video>
<video id="virtual-video" width="480" height="300" autoplay muted></video>
```

首先我们需要准备好背景图，这里我使用了一张图片，你也可以使用视频作为背景。

通过 canvas 将背景图画到画布上，然后通过 getImageData 方法拿到图像数据。

```js
// 虚拟背景的 canvas中的图片数据
let backgroundImageData: ImageData
// 获取背景图像数据
function getBackgroundImageData() {
  const backgroundCanvas = document.querySelector(
    '#backgroundImg',
  ) as HTMLCanvasElement
  const backgroundCtx = backgroundCanvas.getContext('2d')!
  const img = new Image()
  img.src = 'https://xxxx.png'
  img.onload = () => {
    backgroundCtx.drawImage(
      img,
      0,
      0,
      backgroundCanvas.width,
      backgroundCanvas.height,
    )

    backgroundImageData = backgroundCtx.getImageData(
      0,
      0,
      backgroundCanvas.width,
      backgroundCanvas.height,
    )
  }
}

// 然后我们需要通过摄像头获取到视频流，还是用之前几个 demo 中的方法。

// 获取本地音视频流
async function getLocalStream(options: MediaStreamConstraints) {
  const stream = await navigator.mediaDevices.getUserMedia(options)
  return stream
}

// 播放原始视频流
function playRealVideo(stream: MediaStream) {
  realVideo = document.querySelector('#real-video') as HTMLVideoElement
  realVideo.srcObject = stream
}
```

上述步骤完成后，我们就可以通过创建 canvas 标签 先将真实的视频每隔 40ms 一次 画到画布上。
这样的话，画布就会不断的更新，能达到 25 帧的效果，这样能保证我们的视频流是非常流畅的。
一般来说，人眼舒适放松时可视帧数是每秒 24 帧，高度集中精神时不超过 30 帧。电影院里的 2D 电影一般是 24 帧的，3D 电影一般是 60 帧以上。
画到画布后，我们也相应的要通过 getImageData 方法拿到真实视频的图像数据。
然后每一帧都要与设置好的背景色进行比较，比较后的差值达到设定的阈值的像素，就要扣除（替换为之前拿到的背景图的像素。

我们把它转化为颜色差的计算公式如下：
```js
// 计算颜色差
function colorDiff(color1: number[], color2: number[]) {
  const r = color1[0] - color2[0]
  const g = color1[1] - color2[1]
  const b = color1[2] - color2[2]
  return Math.sqrt(r * r + g * g + b * b)
}
```

然后再将处理后的图像数据画到虚拟视频的画布上，再通过captureStreamapi 将画布转换为视频流，最后将视频流赋值给虚拟视频的 srcObject 属性。

```js
const WIDTH = 480 // 视频宽度
const HEIGHT = 300 // 视频高度

// 将视频写到 canvas 中
function drawVideoToCanvas(realVideo: HTMLVideoElement) {
  realVideoCanvas = document.createElement('canvas') as HTMLCanvasElement
  realVideoCtx = realVideoCanvas.getContext('2d')!
  virtualVideoCanvas = document.createElement('canvas') as HTMLCanvasElement
  virtualVideoCtx = virtualVideoCanvas.getContext('2d')!
  realVideoCanvas.width = virtualVideoCanvas.width = WIDTH
  realVideoCanvas.height = virtualVideoCanvas.height = HEIGHT

  // 每隔 100ms 将真实的视频写到 canvas 中，并获取视频的图像数据
  setInterval(() => {
    realVideoCtx.drawImage(
      realVideo,
      0,
      0,
      realVideoCanvas.width,
      realVideoCanvas.height,
    )
    // 获取 realVideoCanvas 中的图像数据
    realVideoImageData = realVideoCtx.getImageData(
      0,
      0,
      realVideoCanvas.width,
      realVideoCanvas.height,
    )
    // 处理真实视频的图像数据，将其写到虚拟视频的 canvas 中
    processFrameDrawToVirtualVideo()
  }, 40)
  // 从 VirtualVideoCanvas 中获取视频流并在 virtualVideo 中播放
  getStreamFromVirtualVideoCanvas()
}

// 从 VirtualVideoCanvas 中获取视频流并在 virtualVideo 中播放
function getStreamFromVirtualVideoCanvas() {
  virtualVideo = document.querySelector('#virtual-video') as HTMLVideoElement
  const stream = virtualVideoCanvas.captureStream(30)
  virtualVideo.srcObject = stream
}

```

逐像素计算与要处理的目标颜色的差值，如果差值小于容差，则将该像素设置为背景图片中的对应像素

```js
// 处理真实视频的图像数据，将其写到虚拟视频的 canvas 中
function processFrameDrawToVirtualVideo() {
  // 逐像素计算与要处理的目标颜色的差值，如果差值小于阈值，则将该像素设置为背景图片中的对应像素
  for (let i = 0; i < realVideoImageData.data.length; i += 4) {
    const r = realVideoImageData.data[i]
    const g = realVideoImageData.data[i + 1]
    const b = realVideoImageData.data[i + 2]
    const a = realVideoImageData.data[i + 3]
    const bgR = backgroundImageData.data[i]
    const bgG = backgroundImageData.data[i + 1]
    const bgB = backgroundImageData.data[i + 2]
    const bgA = backgroundImageData.data[i + 3]

    // 计算与背景色的差值
    const diff = colorDiff([r, g, b], backgroundColor)
    // 当差值小于设定的阈值，则将该像素设置为背景图片中的对应像素
    if (diff < allowance.value) {
      realVideoImageData.data[i] = bgR
      realVideoImageData.data[i + 1] = bgG
      realVideoImageData.data[i + 2] = bgB
      realVideoImageData.data[i + 3] = bgA
    }
  }
  // 将处理后的图像数据写到虚拟视频的 canvas 中
  virtualVideoCtx.putImageData(realVideoImageData, 0, 0)
}

// 计算颜色差异
function colorDiff(rgba1: number[], rgba2: number[]) {
  let d = 0
  for (let i = 0; i < rgba1.length; i++) {
    d += (rgba1[i] - rgba2[i]) ** 2
  }
  return Math.sqrt(d)
}
```

可以看到，其中backgroundColor（需要扣除的背景色）和allowance（容差值）两个变量是由外部控制的，这样我们就可以在页面上通过滑动条或是其他的组件来动态改变容差，通过取色器来动态改变需要扣除的背景色。

至此，我们就可以实现一个简单的背景替换的功能了。当然，这里只是简单的实现了一个背景替换的功能，实际上，我们还可以通过更多的技术手段来实现更加复杂的功能，比如：
目前只是针对纯色的背景进行了替换，如果复杂的背景，我们可以通过图像分割的方式来实现背景替换，比如：TensorFlow.js 中的 身体分割（BodyPix）。

或者是说，对于视频中的人脸，我们可以通过face-api.js来检测人脸，并将人脸替换为其他的图片，从而实现一个简单的换脸功能。对于视频中的人体，我们可以通过BodyPix来检测人体，并将人体替换为其他的图片，从而实现一个简单的换装功能。等等...（后续我都在这个专栏中安排~）
可以见得，用 WebRTC 相关的知识来结合一些其他相关技术，可以实现非常多的有趣的项目，可玩性非常强。
这作为我专栏的第一篇，主要是想通过这篇文章来介绍一下 WebRTC 相关的知识，以及 WebRTC 相关的一些应用场景，希望能够帮助到大家。
本来还想写下 1v1 视频聊天的实现，但是由于时间关系，我把它放到第二篇来写吧，demo 我已经放到了 我的前端公园合集仓库中，这两天抽空写完,大家也可以 follow 一下我的 Github，谢谢大家~ 🌸

<br><br>

## WebRTC
- 它历经5代跨域25年的RTC架构演化史
- 第一代: MCU阶段
- 第二代: P2P阶段
- 第三代: 单SFU阶段
- 第四代: 云SFU阶段
- 第五代: 全球实时云通信阶段(2016至今)

- webrtc不全是前端技术 如果我们想在浏览器这边实现音视频通话 需要使用webrtc
<!--  
  其他的技术在音视频通话的时候可能需要安装插件
  但是使用webrtc技术的话 是不需要安装插件的
 -->

- webrtc是H5标准之一 直接调用api就可以

> webRTC分为客户端 和 服务器端
- 客户端:
- web客户端:  
  也就是浏览器应用webrtc技术 因为是h5标准 所以可以直接调用api

- window/linux PC:
  我们可以应用 webrtc源码包(源码包本身是C) 但要用到 C++ 技术

- 移动端:
  anfroid - 安卓它有java接口 java中提供了官方的rtc的库
  ios     - ios它有object接口 object中提供了官方的rtc的库
<!-- 
  webrtc源码包 它是做客户端的
 -->  

---

- 服务器端:
- 这边要是使用 webrtc 技术 需要应用特别多的技术 如
- SRS Licode Janus Kurentos
- 服务端遵循webRTC协议实现服务端

---

> 音视频通话原理
> 问题:
- 两边通话怎么发现对方?

> 解答:
- 1. 客户端与服务器(信令服务器)链接 需要信令服务器支持
<!-- 
  信令服务器:
    比如我们有两个客户端 A B
    不管是A还是B 都需要连接到服务器 也就是说 两台客户端都需要连接服务器
 -->

- 2. 房间的概念
- 两个人要是通话 我们需要在一个频道里面 所以两个人通话要加入到同样的房间
- 比如 A 和 B 都加入到 room id: 1000 的房间
- 这是 A发送的信息 在服务器里 可以转发给同房间的人

---

> 问题:
- 怎么编码？ 音视频媒体协商

> 解答:
- 音视频传输 发送方发送之前需要编码 接受方接受之前需要解码 要解码后才能显示
- 比如摄像头数据编码为 H264
- 
<!-- 
    A: 拥有 VP8 和 H264 编码的能力
    B: 拥有 VP9 和 H264 编码的能力

      A
      -----------------
      |               |         B
      |     ----------|----------
      |      |        |          |
      |      |        |          |
      |  VP8 | H264   |          |
      |      |        |          |
      |      |        |          |
      |      |   H264 |  VP9     |
      |      |        |          |
      |------|---------          |
             |                   |
             --------------------
-->

- 如果A传递数据是使用 VP8 进行编码 但是B没有 VP8 就不能解码
- 那怎么办？

- A告诉B 自己支持 VP8 H264 告诉B
- B告诉A 自己支持 VP9 H264 告诉A

- 这样两者都知道对方的编解码能力 这样可以选择共同的编码能力 H264

> 媒体协商
- 像上面的过程叫做媒体协商 会被封装到 SDP 协议里面
- 该协议可用于这类信息在webrtc中 *参与视频通讯的双方必须先交换SDP信息* 这样双方才能知根知底 而交换SDP的过程 *叫做媒体协商*


> 网络协商
- 除了双方要彼此了解对方的编解码能力 同时也要了解对方的网络情况 这样才有可能找到一条相互通讯的链路

- 理想的网络情况是每个浏览器的电脑都是*私有公网IP* 可以直接进行点对点连接

<!-- 

              信令服务器

           ↙           ↘

     A                      B
192.168.2.219    →    192.168.2.219 
 -->

- 怎么发送数据给对方?
- 两个人在同一局域网的情况下 可以用局域网的ip 如果两个人不在同一个局域网肯定不行

- p2p:
- 如果 A 可以把数据 直接发给 B 点对点 不经过服务器 那么就是p2p

- 但是实际的情况是 AB 双方是不能点对点通信的
- 我们可以在百度上搜索 IP 能查看到 外网的ip地址 (我们往外发送数据肯定是有外网ip的 接受数据的也是从公网转到内网)

- 本机IP: 60.68.140.12日本东京 BBTEC

<!-- 

              信令服务器

           ↙           ↘

     A                      B
192.168.2.219  |     |  192.168.2.219 
公网:                    公网:
60.68.140.12            78.68.188.19

 -->

- 局域网发送数据到 NAT网关 由网关到公网
- P2P:
- 获取 STUN 的协议 获取局域网 IP + PORT 在NAT设备在外网的 IP + PORT 彼此将NAT外网信息发送给对方 如果能够连接上就是 P2P

- 如果P2P不成功 那么就会用到 *TURN协议转发* 商业方案很少采用P2P方案

- 商业方案一般采用 通过服务器转发的话 但是消耗服务器的带宽的(耗钱)

- candidate是封装网络信息的
