# 录制相关的记事
```s
https://www.mux.com/blog/how-to-use-mediarecorder

https://juejin.cn/post/7151932832041058340
```

<br><br>

# 主流视频编码器的特点 优缺点归纳 和 比较

## H.264: 

### 定义
H.264，又称H.264/AVC（或者AVC/H.264或者H.264/MPEG-4 AVC或MPEG-4/H.264 AVC），为高度压缩数字视频编解码器标准，是MPEG-4第十部分，收取版税。

H264标准各主要部分有Access Unit delimiter（访问单元分割符），SEI（附加增强信息），primary coded picture（基本图像编码），Redundant Coded Picture（冗余图像编码）。还有Instantaneous Decoding Refresh（IDR，即时解码刷新）、Hypothetical Reference Decoder（HRD，假想参考解码）、Hypothetical Stream Scheduler（HSS，假想码流调度器）。

<br>

### 特点
最常见的视频编码格式，是由国际电信联盟制定的，侧重网络传输。
H.264有着更高的数据压缩比，在同等的图像质量，H.264比其他编码格式要高1.5~3倍，所以在网络传输中需要更少的宽带，主要应用于实时传播，比如视频会议。

**H.264编码的缺点是对播放的硬件系统要求相对比较高。**

<br><br>

## HEVC

### 定义
High Efficiency Video Coding，又称H.265/HEVC，是一种新的视频压缩标准，用来扩充H.264/AVC编码标准，2013年1月26号，HEVC正式成为国际标准，收取版税。

为了应对互联网流媒体、通信、视频会议、数字存储媒体和电视广播等各种应用对运动图像更高压缩率的日益增长的需求而开发的。

<br>

### 特点
HEVC 在客厅中得到了最成功的采用，它被视为 4K 视频的推动者，尤其是具有高动态范围 (HDR) 的 4K。

<br><br>

## VP9

### 定义
由Google开发的开放格式、无使用授权费的视频压缩标准。VP9在开发初期曾被命名为Next Gen Open Video （NGOV，下一代开放视频）与VP-Next。VP9将是VP8的后继者。

### 特点
VP9 作为 VP8 的后继产品，主要竞争对手是 MPEG 的高效视频编码标准 HEVC。和 HEVC 相比，VP9 在网络浏览器中有更良好的支持性。它也以其优秀的视频编码质量和压缩效率而被广泛应用于互联网视频网站中。

<br><br>

## AV1

### 定义
Alliance for Open Media Video 1，是由AOM（Alliance for Open Media，开放媒体联盟，包括腾讯，亚马逊，Cisco，Google，Intel，Microsoft，Mozilla和Netflix）制定的一个开源、免版权费的视频编码格式，目标是解决H265昂贵的专利费用和复杂的专利授权问题并成为新一代领先的免版权费的编码标准。此外，AV1是google制定的VP9标准的继任者，也是H.265强有力的竞争者。

### 特点
AV1 的目标是取代其前身，即由谷歌开发的VP9视频压缩格式，并与动态图像专家组（MPEG）领导开发的高效率视讯编码（HEVC）以及由中国的数字音视频编码技术标准工作组主导开发的第二代数字音视频编解码技术标准（AVS2）竞争。

<br>

**是否需要专利授权费用：**  
H.264（需要）–>H.265（需要）–>VP9（不需要）–>AV1（不需要）

**兼容性：**  
H.264 > VP9 > AV1 > HEVC

<br><br>

## 视频编码器优缺点归纳
|名称|优点|缺点|主要应用|目前状态|
|:--|:--|:--|:--|:--|
|H.264|1.编码效率高：采用混合编码结构<br><br>2.视频画质好：低码率和低带宽提供高质量图像传输<br><br>3.压缩技术的效率高：保证数据质量的前提下，数据压缩比高<br><br>4.网络适应能力强：可以在实时通信应用低延时模式，在无延时的视频存储或视频流服务器中工作<br><br>5.兼容性好：兼容几乎所有浏览器，全部的移动和智能电视/OTT（OTT：指通过公共网络向用户提供内容分发业务，OTT可以使用任何网络接入，内容和服务可以跳过运营商通过网络直接面向用户提供，OTT完全以互联网架构为基础，典型代表有美国谷歌电视Google TV、Hulu、Netflix）<br><br>6.编码选项少：降低编码复杂度<br><br>7.错误恢复功能：提供解决网络传输包丢失问题的工具，适用高误码率无线网络中传输视频数据|1.编码计算复杂度高，解码复杂度高 H.264压缩效率比MEPG-2提升一倍多的同时，将解码难度提高了至少3倍，运算需求高达100GOPS：<br><br>2.对播放的硬件系统要求高|实时传播，比如视频会议，直播|1.已经被发明很长时间，很成熟<br><br>2.有很全面的硬件兼容能力<br><br>3.编码很快，能很快的将视频编码成H.264格式的文件<br><br>4.会产生特别大体积文件<br><br>5.压缩视频的效率不高<br><br>6.不支持4K以上分辨率的视频<br><br>7.图像质量不高，原本黑色的东西看起来是灰色的。并且当比特率很低的时候，编码结果会是一块一块的，这种问题很常见|
|HEVC（H.265）|1.码率低，编码效率高：H.265/HEVC提供了更多不同的工具来降低码率，以编码单位来说，H.264中每个宏块（macroblock/MB）大小都是固定的16x16像素，而H.265的编码单位可以选择从最小的8x8到最大的64x64，且对图像进行了有重点的编码，从而降低了整体的码率，编码效率就相应提高<br><br>2.占存储空间少：同样的画质和同样的码率，H.265比H2.64 占用的存储空间要少理论50%<br><br>3.节省带宽：H.265可以使用更少的带宽提供部分与H.264同样的功能<br><br>4.网络适应能力更强：H.264可以在低于2Mbps的速度实现标清数字图像传送，而H.265/HEVC可以在低于1.5Mbps的传输带宽下，实现1080p全高清视频传输|1.兼容性差：兼容很少的浏览器，移动设备中的安卓、IOS，和全部的智能电视/OTT<br><br>2.解码难度更大<br><br>3.解码视频时对电量消耗高<br><br>4.实时编码难度大：H.265编码复杂度较之H.264呈几何增长，编码用时也随之增长，以现有的终端设备难以实现实时编码<br><br>5.编码器使用难度大：H.265只是规定了一个可用技术的范围，编码时很多特性可以用，也可以不用。所以H.265编码器的使用难度大概是x264的2-3倍不止|1. 目前H.265几乎没有在直播领域应用，多在点播领域<br><br>2. 在企业、安防中使用较为广泛<br><br>3.4K蓝光视频 主要用HEVC|1.较之H.264，在压缩效率上有极大的提升<br><br>2.HEVC文件在编码同一个视频时，相比H.264而言文件体积仅是后者的50%，但是可以获得相同的视频质量<br><br>3.较之H.264，颜色看起来更好，人为更改看上去更不明显<br><br>4.支持 8K（8192×4320） 及以上的分辨率<br><br>5.不被iOS设备所支持，而且在大多数PC上的表现都很差；不能将HEVC编码的视频上传到YouTube上，因为YouTube不支持这个输入格式<br><br>6.专利授权复杂<br><br>7.想要保证很小的文件体积所需要付出的代价是更长的编码时间，以及在播放时所需的更大功率<br><br>8.芯片制造商正在发布SDK来允许HEVC视频在编解码的过程中使用硬件加速，这样可以大幅度的提高处理速度|
|VP9|1.编码成本低：与AV1相比，VP9可以节省很多编码时间和计算成本。对于观看时间不长的视频，AV1多码率编码带来的成本增加可能会比AV1其节省的流量费用还要多<br><br>2.Chrome类浏览器不支持HEVC解码，而VP9内容视频可以通过使用硬件加速在一些主流设备上播放<br><br>3.能在低端Android设备上更好的播放：HEVC和AV1在一些低端Android设备上无法很好地播放。对于1080p+或胶片噪声视频，VP9的性能接近HEVC，在某些情况下，VP9的性能有时甚至优于HEVC<br><br>4.无需版权费|1.应用并不广泛：在实际推广中，微软、苹果等公司不愿看到 VP9 一家独大，其他互联网厂商也不希望主流视频编码格式被垄断，因此目前在主要在 Google 自家的产品中得到支持，其他使用 VP9 的大厂并不多<br><br>2.编码速度慢：与HEVC相比，由于没有任何硬件加速编码可供VP9使用所以会更慢一些<br><br>3.不适用某些视频播放器播放：如VLC，不能流畅的播放VP9，其他基于FFplay的播放器，比如MPC-VC就没有这个问题|1.点播<br><br>2.互联网应用场景中使用较多：因为VP9 简易、实用的解决方案以及开发免费的特性|较之H.265，VP9在压缩比HD还大的视频文件上要更高一筹，因此VP9可能非常适合用于高分辨率VR视频|
|AV1|	1.压缩率高：相比VP9，压缩率进一步提升，同等画质下可比VP9节约30%的码率<br><br>2.无需版权费|1.编码速度慢：AV1编码缓慢，虽然有多线程优化的因素，但从根本上说还是因为计算太过复杂<br><br>2.涉及垄断竞争 ：电视系统巨头ROKU表示谷歌”要求合作伙伴在新推出的产品中必须支持AV1，包括安卓电视、谷歌系统电视和其他支持相关软件的智能电视，都得支持AV1编码格式“的这种做法，就是强迫所有电视支持AV1系统，属于垄断行为|应用场景为流媒体，支持直播和点播|对于8K 视频，AV1 的性能优势更为突出，比如现在在油管、奈飞以及亚马逊观看的众多流媒体视频，已经采用AV1编码格式，特别是8K视频|


<br><br>

## Firefox和Chrome中MediaRecorder支持的所有MIME类型？

### chrome中 mediaRecorder支持的 mimeType
我们使用 MediaRecorder 来进行录制，它是一个用于录制媒体流的 API，它可以将媒体流中的数据进行录制，然后将录制的数据保存成一个文件。  
由于 MediaRecorder api 的对 mimeType 参数的支持是有限的。所以我们需要通过 MediaRecorder.isTypeSupported 来判断当前浏览器是否支持我们需要的 mimeType。

```
"video/webm"
"video/webm;codecs=vp8"
"video/webm;codecs=vp9"
"video/webm;codecs=h264"
"video/x-matroska;codecs=avc1"
```


<br><br>

# Js 实现录制
首先我们先简单的实现下视频录制的功能 然后我们再围绕下面的例子使用到的API进行MDN扩充

<br>

# 媒体流 MediaStream
**该接口的实例对象更多是为了创建 stream**

MediaStream是一个接口 它是一个媒体内容的流 一般媒体内容的流会包含几个轨道

- 视频轨道
- 音频轨道

实现该接口的类就是 MediaStream 类

<br>

### **new MediaStream(stream || tracks[])**

**返回值:**  
MediaStream接口的实例对象, *返回一个 stream??*

<br>

实例对象中作为媒体流的内容的集合载体, 其可能包含多个媒体数据流 每个数据轨则有一个 <font color="#C2185B">MediaStreamTrack</font> 对象表示

如果给出相应参数, 在指定的数据轨则被添加到新的流中 否则该流中不包含任何数据轨

<br>

**参数 stream:**  
MediaStream对象, 其数据轨会被自动添加到新建的流中。  
且这些数据轨不会从原流中移除,即变成了两条流共享的数据。

<br>

**参数 tracks:**  
MediaStreamTrack对象的 Array 类型的成员, 代表了每一个添加到流中的数据轨。

<br>

**MediaStreamTrack:**  
在 User Agent 中表示一段媒体源, 比如音轨或视频。

<br><br>

## MediaStream实例属性

**<font color="#C2185B">MediaStream.active</font>**  
**只读:**  
如果这个流处于活动的状态 值为true,  
当所有轨道关闭时, 媒体流的属性置为 false。

至少有一条 MediaStreamTrack 的媒体流不是MediaStreamTrack.ended 状态时才认为是 活动的

<br>

**<font color="#C2185B">MediaStream.id</font>**    
**只读:**  
这是一个包含 36 个字符的 DOMString 用来作为这个对象的位置标识符

<br>

### 方法:
**<font color="#C2185B">MediaStream.clone()</font>**    
返回一个新的 stream

<br>

### 事件:
**<font color="#C2185B">devicechange</font>**    
每当媒体设备(如相机 麦克风或扬声器)链接到系统或从系统中移除的时候 该事件就会被发送到 MediaDevices 实例身上

此事件不可取消 也不会冒泡

<br>

**语法:**  
```js
addEventListener('devicechange', (event) => {});
ondevicechange = (event) => {};

navigator.mediaDevices.ondevicechange = (event) => {
  updateDeviceList();
};
```

<br><br>

# MediaSource

### 概念:
近几年来, 我们已经可以在 Web 应用程序上无插件地播放视频和音频了。但是, 现有架构过于简单, 只能满足一次播放整个曲目的需要, 无法实现拆分/合并数个缓冲文件。流媒体直到现在还在使用 Flash 进行服务, 以及通过 RTMP 协议进行视频串流的 Flash 媒体服务器。

<br><br>

# MediaDevices
**该接口的实例对象更多是为了获取 stream**

它是一个接口 提供访问链接媒体输入的设备, 如照相机 麦克风 以及屏幕共享等, 它可以使你取得任何硬件资源的媒体数据

我们可以通过 navigator.mediaDevices 返回MediaDevices接口的实例对象

<br>

**<font color="#C2185B">let mediaDevices = navigator.mediaDevices</font>**  
```js
let mediaDevices = navigator.mediaDevices
```

<br>

### mediaDevices实例对象身上的事件:
**<font color="#C2185B">devicechange</font>**  
返回 devicechange 事件类型的事件处理程序。   
也可通过 ondevicechange 访问

<br>

### mediaDevices实例对象身上的方法:
**<font color="#C2185B">mediaDevices.getUserMedia()</font>**  
该方法将提示用户给于使用媒体输入的许可, 许可后可以将摄像头录制的内容生成 stream流 可以赋值给video标签

没有可选的用户录制区域

```js
var promise = navigator.mediaDevices.getUserMedia(constraints)
```

<br>

**参数:**  
一个对象(MediaStreamConstraints对象), 该对象指定请求的媒体类型和相应对应的参数, 它包含了 video 和 audio 两个属性 用于说明请求的媒体类型 这两个属性必须有一个 

如果浏览器无法找到指定的媒体类型或无法满足相应的参数要求 则promise会rejected
```js
// 以下同时请求不带任何参数的音频和视频
{
  video: true,
  audio: true
}
```

如果为某种媒体类型设置了 true 得到的结果的流中就需要有此种类型的轨道 如果其中一个由于某种原因无法获得, getUserMedia()将会产生一个错误

```js
{
  audio: true,
  // 分辨率
  video: { width: 1280, height: 720 }
}
```
当由于隐私保护的原因, 无法访问用户的摄像头和麦克风信息时, 应用可以使用额外的 constraints 参数请求它所需要或者想要的摄像头和麦克风能力。上面演示了应用想要使用 1280x720 的摄像头分辨率

浏览器会试着满足这个请求参数, 但是如果无法准确满足此请求中参数要求或者用户选择覆盖了请求中的参数时, 有可能返回其它的分辨率。

强制要求获取特定的尺寸时, 可以使用关键字min、max 或者 exact（就是 min == max）。以下参数表示要求获取最低为 1280x720 的分辨率。
```js
{
  audio: true,
  video: {
    width: { min: 1280 },
    height: { min: 720 }
  }
}
```

如果摄像头不支持请求的或者更高的分辨率, 返回的 Promise 会处于 rejected 状态, NotFoundError 作为rejected 回调的参数, 而且用户将不会得到要求授权的提示。

<br>

**返回值:**  
返回 promise 成功回调中是 MediaStream 

<br>

**注意:**  
单独使用 getUserMedia() 方法的时候 要想视频正常的播放
<br><br> 在 video 标签上添加自动播放
<br><br> 给 video 标签绑定 数据加载完的事件(onloadedmetadata) 调用 video.play() 方法

<br>

**示例:**  
请求用于的媒体设备 设置了摄像头的分辨率 并把结果分配给 video 元素

当我们同意用户调用摄像头后 直接开启了摄像功能
```js
let params = {
  audio: true,
  video: {
    width: 1280,
    height: 720
  }
}

navigator.mediaDevices.getUserMedia(params)
.then(function(mediaStream) {
  var video = document.querySelector('video');
  video.srcObject = mediaStream;

  // onloadedmetadata 在数据加载成功后触发
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
```

<br>

**<font color="#C2185B">mediaDevices.enumerateDevices()</font>**  
获取设备列表

该方法可以请求一个可用的媒体输入 和 输出设备的列表  
例如麦克风 摄像机 耳机等

<br>

**返回值:**  
promise 成功回调为 MediaDeviceInfo数组
```js
navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    console.log(devices)
  })



[
  // InputDeviceInfo
  {
    deviceId: "",
    groupId: "",
    kind: "audioinput",
    label: "MacBook Pro麦克风 (Built-in)"
  },
  // MediaDeviceInfo
  {
    deviceId: "",
    groupId: "",
    kind: "audiooutput"
    label: "MacBook Pro扬声器 (Built-in)"
  }
]


// 示例2:
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
```

<br>

**<font color="#C2185B">mediaDevices.getDisplayMedia()</font>**  
让用户选择区域

提示用户去选择和授权捕获展示的内容或部分内容（如一个窗口）在一个MediaStream 里

<br>

**参数:**  
```js
{
  video: true,
  audio: true
}
```

<br>

**返回值:**  
返回promise 成功的回调中为 stream

<br><br>

# MediaRecorder:
MediaRecorder 是 MediaStream Recording API 提供的用来进行媒体轻松录制的接口
他需要通过调用 MediaRecorder() 构造方法进行实例化。

通过调用 实例化对象 身上的方法 我们来实现录制的功能

这个接口负责的所有工作是从 *MediaStream* 获取数据并将其传递给你进行处理。  
数据通过一系列dataavailable事件传递, 这些数据已经成为你创建 MediaRecorder 时所声明的格式。然后, 您可以进一步处理数据, 或者根据需要将其写入文件。


说白了 这个类就是用于获取用户的录制的数据 然后我们可以处理数据

<br>

### **录制过程概述**
1. 建立一个 MediaStream或者HTMLMediaElement (以 ``<audio>`` 或 ``<video>`` 元素的形式) 来充当媒体数据的源

2. 创建一个 MediaRecorder 对象, 指定源以及任何有需求的的选项 (比如容器的 MIME 类型或它轨道所需的比特率).

3. 给 dataavailable 事件设置MediaRecorder.ondataavailable 事件处理函数; 会在数据可利用时候调用。

4. 一旦媒体源播放, 你已经准备好录制, 使用 MediaRecorder.start() 开始录制。

5. dataavailable 事件处理函数正如你所愿的在每次数据准备好时调用; 这个事件有一个值为包含媒体数据的Blob 类型的 data 属性。你可以强制 dataavailable 事件发生, 因此会给你传递最新的声音以至于可以让你过滤、保存或者做一些其他的事情。

6. 当源媒体停止播放时候, 录制自动结束。你可以随时结束录制通过使用 MediaRecorder.stop()

<br>

### **MediaRecorder的实例化:**

**<font color="#C2185B">let mediaRecorder = new MediaRecorder(stream, [options])</font>**  
创建 MediaRecorder 对象对指定的 MediaStream 对象进行录制

<br>

**参数 stream:**  
为 MediaStream 对象, 根据 stream 对象来实例化 mediaRecorder

获取 stream 的方式:  
- mediaDevices对象.getDisplayMedia()
- mediaDevices对象.getUserMedia()
- ``<audio>`` ``<video>`` ``<canvas>`` 等 DOM 元素

<br>

**参数 options:**
类型: 可选

<br>

**<font color="#C2185B">mimeType</font>**  
为新构建的 MediaRecorder 指定录制容器的 MIME 类型。在应用中通过调用
MediaRecorder.isTypeSupported() 来检查浏览器是否支持此种mimeType

指定记录数据时使用的编解码器(vp8、vp9、h264等)。

一般来说，我喜欢将MIME类型设置为video/webm;codecs=avc1，因为这样产生的CPU使用率往往比其他可用选项低得多，而且它提供了最广泛的跨设备兼容性。  
请记住，不是每一种编解码器都兼容于每一个浏览器，所以您可能需要进行试验，以找到最适合您的目标用户的编解码器。
```js
mimeType: "video/webm;codecs=avc1"
```

<br>

**<font color="#C2185B">audioBitsPerSecond</font>**  
指定音频的比特率。

<br>

**<font color="#C2185B">videoBitsPerSecond</font>**  
指定视频的比特率。
它定义了记录内容的目标比特率。更高的比特率将产生更高的质量，但也会产生更大的文件大小和更高的性能要求。

<br>

**<font color="#C2185B">bitsPerSecond</font>**  
指定音频和视频的比特率。
此属性可以用来指定上面两个属性. 如果上面两个属性只有其中之一和此属性被指定, 则此属性可以用于设定另外一个属性。

```js
{
  // 为新构建的 MediaRecorder 指定录制容器的 MIME 类型,(例如"video/webm" 或者 "video/mp4")
  mimeType: 
  
  // 指定音频的比特率,
  audioBitsPerSecond: 
  
  // 指定视频的比特率,
  videoBitsPerSecond: 
  
  // 指定音频和视频的比特率。此属性可以用来指定上面两个属性 如果上面两个属性只有其中之一和此属性被指定, 则此属性可以用于设定另外一个属性。
  bitsPerSecond: 
}
```

如果视频和/或音频的比特率没有指定, 视频默认采用的比特率是 2.5Mbps, 但音频的默认比特率并不固定, 音频的默认比特率根据采样率和轨道数自适应。

<br><br>

## 属性:
**<font color="#C2185B">MediaRecorder.state</font>**  
返回录制对象MediaRecorder 的当前状态  
- 闲置中: inactive
- 录制中: recording
- 暂停:   paused

<br>

**<font color="#C2185B">MediaRecorder.stream</font>**  
返回录制器对象 MediaRecorder 创建时构造函数传入的 stream 对象

<br>

**<font color="#C2185B">MediaRecorder.ignoreMutedMedia</font>**  
用以指定 MediaRecorder是否录制无声的输入源。  
如果这个属性是 false. 录制器对象MediaRecorder 会录制无声的音频或者黑屏的视频, 默认值是 false

<br>

**<font color="#C2185B">MediaRecorder.videoBitsPerSecond</font>**  
返回视频采用的编码比率。它可能和构造函数的设置比率不同. (if it was provided).

<br>

**<font color="#C2185B">MediaRecorder.audioBitsPerSecond</font>**  
返回音频采用的编码比率, 它可能和构造函数中设置的比率不同. (if it was provided).

<br>

## 事件:

### **获取录制的数据事件**

**<font color="#C2185B">mediaRecorder对象.ondataavailable = 回调</font>**  
回调中的事件对象 e 身上有 data 属性   
它会提供 blob对象 这个就是录制的数据 e.data

<br>

### **发生错误时触发的事件**
**<font color="#C2185B">mediaRecorder对象.onerror</font>**  

<br>

### **发生暂停时触发的事件**
**<font color="#C2185B">mediaRecorder对象.onpause</font>**  
比如调用了暂停的方法 mediaRecorder对象.pause()

<br>

### **恢复录制时触发的事件**
**<font color="#C2185B">mediaRecorder对象.onresume</font>**  
比如调用了恢复的方法 mediaRecorder对象.resume()

<br>

### **开始录制时触发的事件**
**<font color="#C2185B">mediaRecorder对象.onstart</font>**  
比如调用了开始录制的方法 mediaRecorder对象.start()

<br>

### **停止录制时触发的事件**
**<font color="#C2185B">mediaRecorder对象.onstop</font>**  
比如调用了开始暂停的方法 mediaRecorder对象.stop()

<br><br>

## 方法:

### **开始录制的方法:**
**<font color="#C2185B">mediaRecorder对象.start([timeslice])</font>**  
它会将数据录制到一个或多个 Blob 中

我们可以将整个视频录制成一个Blob对象(或直到调用requestData()为止) 也可以传递一个记录的毫秒数 这相当于一个录制时长 每录满指定时长后 都会发送到对应处理的事件中 然后开始下一次的录制

<br>

**参数: timeslice**  
记录到每个Blob   
如果不包含此参数, 则整个媒体持续时间将被记录到一个单一 Blob的, 除非requestData() 调用该方法来获取Blob并触发创建一个新 Blob的媒体继续记录到其中。

<br>

**返回值:**  
无

<br>

### **用于停止媒体捕获**
**<font color="#C2185B">mediaRecorder对象.stop()</font>**  

<br>

### **MediaRecorder类的静态方法**
**<font color="#C2185B">MediaRecorder.isTypeSupported(给定的 MIME 类型)</font>**  
判断 是否支持 给定的 mime 类型    
会判断其 MIME 格式能否被客户端录制。

<br>

**返回值:**  
布尔类型

如果 MediaRecorder 在浏览器上的具体实现能够支持指定 MIME 类型的 Blob 对象就返回 true. 如果没有足够的资源来支持录制和编码任务, 最终录制依然会失败。如果返回结果是 false, 用户的浏览器就无法录制指定的格式。

```js
var types = ["video/webm",
             "audio/webm",
             "video/webm\;codecs=vp8",
             "video/webm\;codecs=daala",
             "video/webm\;codecs=h264",
             "audio/webm\;codecs=opus",
             "video/mpeg"];
```


<br>


<br>

### **案例:**
上面介绍了一部分的录制 API 下面我们看下例子
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

1. 给按钮绑定 点击事件
2. 指定录制区域: navigator.mediaDevices.getDisplayMedia()
3. 创建mine  MediaRecorder.isTypeSupported("video/webm; codecs=vp9")

在一个点击按钮的事件中 我们绑定3个 mediaRecorder 的事件

<br>

**dataavailable:**  
每 start 毫秒数会触发一次该事件 我们将 e.data push到 chunks 数组中

<br>

**stop:**  
stop中处理上传和展示到我们自己的 video 中的逻辑

<br>

**start:**  
start中指定了 分部分触发 dataavailable 事件的毫秒数


<br><br>

# 补充API

## MediaDevicesInfo
该接口在我们调用 mediaDevices.enumerateDevices() 方法的时候 promise会返回一个MediaDeviceInfo数组

该接口包含表明一个媒体是输入还是输出设备的信息。它是一个对象数组, 一个元素是一个媒体设备

<br>

### **MediaDevicesInfo 对象属性:**
**<font color="#C2185B">deviceId:</font>**  
返回一个设备标识符的DOMString。 

这个标识符在不同的会话中被保留。 这个标识符不能被其他应用程序猜到, 对调用的应用程序源来说是唯一的。 

当用户清除cookie时, 这个标识符会被重置（一个不同的标识符用于私人浏览, 不跨时段保留）。

<br>

**<font color="#C2185B">groupId:</font>**  
返回组标识符的DOMString; 

如果两个设备有相同的组标识符, 它们属于同一个物理设备。 
这方面的例子包括一个集成了摄像头和麦克风的显示器。

<br>

**<font color="#C2185B">kind:</font>**  
标识了是什么设备
"videoinput"、"audioinput" 、"audiooutput" 返回其中的一个 

- 视频输入
- 音频输入
- 音频输出

<br>

**<font color="#C2185B">label:</font>**  
返回一个DOMString, 这是一个描述设备的标签。
<!-- 
  出于安全原因, 标签字段将始终为空, 
  除非有一个活动的媒体流或用户对媒体设备授予持续授权。 
  设备标签的组合可以作为指纹的一部分来识别用户。
 -->

<br><br>

## MediaStream
它是一个接口
是一个媒体内容的流 一个流包含几个轨道 比如视频和音频轨道

<br>

### **属性:**
**<font color="#C2185B">MediaStream.active</font>**  
布尔型。如果这个流处于活动状态值为 true, 反之为 false

<br>

**<font color="#C2185B">MediaStream.id</font>**  
这是一个包含 36 个字符的 DOMString , 用来作为这个对象的唯一标识符 (GUID) 。

<br>

### **事件:**
**<font color="#C2185B">MediaStream.onaddtrack</font>**  
addtrack事件在这个对象上触发时调用的事件处理器[event handler]
这时一个 *MediaStreamTrack对象* 被添加到这个流。

<br>

**<font color="#C2185B">MediaStream.onended</font>**  
这是当流终止 [ended] 时触发的事件。

<br>

**<font color="#C2185B">MediaStream.onremovetrack</font>**  
这是removetrack事件在这个对象上触发事调用的事件处理器 [event handler], 这时一个对象从流上移除。

<br>

### **方法:**
**<font color="#C2185B">MediaStream.addTrack()</font>**  
存储传入参数 MediaStreamTrack 的一个副本。
如果这个轨道已经被添加到了这个媒体流, 什么也不会发生; 
如果目标轨道为“完成”状态（也就是已经到尾部了）, 一个 INVALID_STATE_RAISE 异常会产生。

<br>

**<font color="#C2185B">MediaStream.clone()</font>**  
返回这个MediaStream 对象的克隆版本。返回的版本会有一个新的 ID。
返回给定 ID 的轨道。
  如果没有参数或者没有指定 ID 的轨道, 将返回 null。
  如果有几个轨道有同一个 ID, 将返回第一个。

<br>

**<font color="#C2185B">MediaStream.getTracks()</font>**  
返回流中所有的MediaStreamTrack列表。

<br>

**<font color="#C2185B">MediaStream.getAudioTracks()</font>**  
返回流中 kind 属性为"audio"的MediaStreamTrack列表。顺序是不确定的, 不同浏览器间会有不同, 每次调用也有可能不同。

<br>

**<font color="#C2185B">MediaStream.getTrackById()</font>**  
返回给定 ID 的轨道。如果没有参数或者没有指定 ID 的轨道, 将返回 null。如果有几个轨道有同一个 ID, 将返回第一个。

<br>

**<font color="#C2185B">MediaStream.getVideoTracks()</font>**  
返回流中 kind 属性为"video"的MediaStreamTrack列表。顺序是不确定的, 不同浏览器间会有不同, 每次调用也有可能不同。

<br>

**<font color="#C2185B">MediaStream.removeTrack()</font>**  
移除作为参数传入的 MediaStreamTrack。 如果这个轨道不在MediaStream 对象中什么也不会发生;  如果目标轨道为“完成”状态, 一个 INVALID_STATE_RAISE 异常会产生。

<br><br>

## MediaStreamTrack
MediaStreamTrack 接口在 User Agent 中表示一段媒体源, 比如音轨或视频。
```
https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStreamTrack
```
