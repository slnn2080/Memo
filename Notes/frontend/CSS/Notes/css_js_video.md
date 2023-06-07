# video
```html
<video src=""></video>
```

<br>

### video要点:
- 视频在浏览器显示的范围 是被视频的分辨率撑开的 **视频的每一帧都是图片**
- 标签属性 width height 是调整video标签的高度 和 宽度 
- 链入后 没有显示 需要填入 控件属性

<br>

### video属性
- controls: 是否允许用户播放
- autoplay: 音频文件是否自动播放 但是目前大部分浏览器都不会自动播放
- loop: 音乐是否循环播放

<br><br>

# audio
```html
<audio src=""></audio>
```

<br>

### 使用标签链接的音视频文件的问题:
- 控件的样式不统一
- 进度条在不同的浏览器下 对进度条的支持不一样, 所以默认的控件并不会使用
- 浏览器的编解码器不一样, 导致了处理音视频文件的各种也不一样 不同浏览器会有兼容性问题

<br>

### 音频 & 视频的概述:
网页中看到的视频, 都是通过第三插件的方式嵌入的, 可能是QuickTime, 也可能是RealPlayer 或者 Flash 浏览器很好的整合了这些插件, 你完全意识不到它们的存在, 也不需要你去安装这些插件
H5出来以后浏览器不再整合这些插件, 需要客户允许操作

<br>

### 格式容器:
大多数人会认为视频文件就是 .avi .mp4, 但事实上 avi和mp4仅仅是容器的格式, 它只决定怎么将视频存储起来, 而不关系存储的内容 

比如我们现在有一个 .avi文件, 它只是容器不是视频, 这个容器里面包含了音频 视频 海报等这个容器里面可能有声音, 有字幕, 海报等

所以 .avi .mp4 有点类似于 .zip压缩包 压缩包里不管里面是什么容文件它只是个容器

不管是音频文件或视频文件, 实际上都只是一个容器文件 这点类似于压缩了一组文件的ZIP文件

<br>

### 视频文件(视频容器)包含:
- 音频轨道
- 视频轨道
- 元数据

视频播放的时候, 音频轨道和视频轨道是绑定在一起的 元数据包含了视频的封面、标题、子标题、字幕等相关信息 

<br>

###  主流的音视频文件格式(容器格式):
- MPEG-4: 通常以.mp4为扩展名				
- Flash视频: 通常以.flv为扩展名				
- Ogg: 通常以.ogv为扩展名		
- WebM: 通常以.webm为扩展名
- 音频视频交错: 通常以.avi为扩展名

- MPEG-3: .mp3
- Acc音频: .acc
- Ogg音频: .ogg

<br>

### 编解码器:
音视频文件在服务器端 浏览器要发请求去发视频文件, 服务器端返回响应 传回浏览器端 传输的过程当中不是一个完成的视频文件  
都是通过流的形式传的 服务器端会把文件编码成二进制文件进行传输, 到浏览器端后开始解码成音视频文件

音频和视频 编码/解码 是一组算法, 用来对一段特定音频或视频进行解码和编码, 以便音频和视频能够播放 

原始的媒体文件体积非常巨大, 如果不对其进行编码, 那么数据量是非常惊人的, 在互联网上传播则要耗费无法忍受的时间, 如果不对其进行解码, 就无法将编码后的数据重组为原始的媒体数据

<br>

|视频编解码器|音频编解码器|			 
|:--:|:--:|			 
|H.264|AAC|
|VP8|MPEG-3|
|Ogg Theora|Ogg Vorbis|

<br>

一款编解码器不能处理所有的音视频文件 浏览器里编解码器不能放多个, 只有一种, 可能会从市面上主流的编解码中挑选一个

浏览器的编解码器不一样导致浏览器能处理的音视频文件的格式也就不一样 就造成了浏览器在处理这些音视频文件的时候有兼容性的问题, 这些兼容性的问题就是编解码器不一致

<br>

### 编解码器 H.264: 
别名 MPEG-4 的第十部分,由MPEG研发并于2003年标准化

它的目的支持一切设备, 无论是低带宽低cpu, 还是高带宽高cpu 或者是两者之间 要做到这一点, H.264标准被分成不同的几种配置 高配置使用了更多特性, 这会导致在解码过程中更加消耗CPU, 但视频文件本身会更小, 视频效果也更好

- 苹果iphone手机:  基本配置(BaseLine)
- 正常的电视机支持: 基本配置(BaseLine) 和 主配置(Main)两种
- 正常的电脑支持:  基本配置(BaseLine) 和 主配置(Main) 高级配置(high)三种
                    
当然有一些编解码器受专利的保护, 有一些则是免费的, 例如Ogg的Vorbis音频编解码器 

Ogg的Theora视频编解码器也是可以免费使用的 而想使用H.264的话就需要支付相关的费用了

现在的视频编解码器会使用各种技巧减少从一帧到另一帧过程中传递的信息数量, 它们不会存储每一帧的所有信息, 而只是存储两帧之间的差异信息 

编码器也分有损和无损, 无损视频文件一般太大, 在网页中没有优势, 所以我们重点研究有损编解码器 

有损编解码器中, 信息在编码过程中丢失是无法避免的, 反复的对视频编码会导致其画面不均匀 

<br>

### 浏览器对于容器和编解码器支持的情况
|Browser|MP4(H.264 + AAC)|WebM(VP8 + Vorbis)|Ogg(Theora + Vorbis)|
|:--|:--|:--|
|Internet Explorer 9|YES|NO|NO|
|Firefox 4.0|NO|YES|YES|
|Google Chrome|YES|YES|YES|
|Apple Safari 5|YES|NO|NO|
|Opera 10.6|NO|YES|YES|

```s
http://www.html5videoplayer.net/html5video/html5-video-browser-compatibility/
# 目前还没有一种编解码和容器的组合能应用于所有的浏览器中！！！
```

<br>

### 处理视频的一个流程
1. 制作一个Ogg容器中使用Theora视频和Vorbis音频的版本
2. 制作另外一个版本, 使用WebM视频容器(VP8 + Vorbis)
3. 再制作一个版本, 使用MP4视频容器, 并使用H.264基本配置的视频和ACC低配的音频
4. 链接上面3个文件到同一个video元素, 并向后兼容基于Flash的视频播放器

相当于一个音视频文件要做3个版本那怎么把一个音视频文件转成这些格式呢？
		
<br>

### 格式转化
**FFmpeg 制作MP4 视频**  
```
ffmpeg -i test.mp4 -c:v libx264 -s 1280x720 -b:v 1500k -profile:v high -level 3.1 -c:a aac -ac 2 -b:a 160k -movflags faststart OUTPUT.mp4
```

<br>

**FFmpeg 制作 WebM 视频**  
```
ffmpeg -i test.mp4 -c:v libvpx -s 1280x720 -b:v 1500k -c:a libvorbis -ac 2 -b:a 160k OUTPUT.webm
```

<br>

**FFmpeg 制作 Ogg 视频**  
```
ffmpeg -i test.mp4 -c:v libtheora -s 1280x720 -b:v 1500k -c:a libvorbis -ac 2 -b:a 160k OUTPUT.ogv
```

<br>

**FFmpeg 制作Mp3音频**  
```
ffmpeg -i test.mp3 -c:a libmp3lame -ac 2 -b:a 160k OUTPUT.mp3
```

<br>

**FFmpeg 制作Ogg音频**  
```
ffmpeg -i test.mp3 -c:a libvorbis -ac 2 -b:a 160k OUTPUT.ogg
```

<br>

**FFmpeg 制作ACC音频**  
```
ffmpeg -i test.mp3 -c:a aac -ac 2 -b:a 160k OUTPUT.aac
```

<br>

### 格式转换的流程
1. 找到 FFmpeg.exe 文件的目录 然后复制 这个文件所在的路径
2. 配置系统的环境变量 在path上 我的电脑 右键 属性 环境变量
3. 找到音视频文件所在的目录 cmd 粘贴上 上面的对应命令  配置环境变量的时候 不要有中文出现

<br>

### 音视频兼容性写法
```html
<video controls>
    <source src='./resource/video/OUTPUT.mp4' type='video/mp4'></source>
    <source src='./resource/video/OUTPUT.ogv' type='video/ogg'></source>
    <source src='./resource/video/OUTPUT.webm' type='video/webm'></source>
    <!-- 链接到视频文件上, 点击后会自动下载该视频 -->
    <span>当前浏览器不支持video直接播放, 点击这里下载视频: <a href='./resource/video/OUTPUT.mp4'>下载视频</a></span>
</video>

<audio controls>
    <source src='./resource/audio/OUTPUT.aac' type='audio/aac; codecs="aac"'></source>
    <source src='./resource/audio/OUTPUT.mp3' type='audio/mpeg'></source>
    <source src='./resource/audio/OUTPUT.ogg' type='audio/ogg; codecs="vorbis"'></source>
</audio>
```

<br>

### type属性
浏览器在加载资源的时候会查看type属性, 看看这款浏览器支持不支持该文件的播放 如果支持就下载 不支持就不下

**video标签:**  
Html5提供的播放视频的标签

- src:资源地址
- controls:该属性定义是显示还是隐藏用户控制界面

<br>

**audio:**  
Html5提供的播放音频的标签

- src:资源地址
- controls:该属性定义是显示还是隐藏用户控制界面
		
<br>

**source:**  
视频
```s
# codecs是编码器
type='video/webm; codecs="vp8, vorbis"'
type='video/ogg; codecs="theora, vorbis"'
type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
```

音频:
```s
# codecs是编码器
type='audio/ogg; codecs="vorbis"'
type='audio/aac; codecs="aac"'
type='audio/mpeg'
```

<br><br>

## 音视频 标签上的属性

<br>

### video标签的属性
- width: 视频显示区域的宽度, 单位是CSS像素
- height: 视频展示区域的高度, 单位是CSS像素

- **poster:** 一个海报帧的URL, 用于在用户播放或者跳帧之前展示, 播放前的海报

- src: 要嵌到页面的视频的URL
- controls: 显示或隐藏用户控制界面
- autoplay: 媒体是否自动播放
- loop: 媒体是否循环播放
- muted: 是否静音

- preload: 该属性旨在告诉浏览器作者认为达到最佳的用户体验的方式是什么 浏览器是否需要预加载视频 不需要预加载的时候 用户点击时加载 预加载的属性值(默认值为metadata)
  - none: 提示作者认为用户不需要查看该视频, 服务器也想要最小化访问流量, 换句话说就是提示浏览器该视频不需要缓存 
  - metadata: 提示尽管作者认为用户不需要查看该视频, 不过抓取元数据(比如: 长度)还是很合理的 
  - auto: 用户需要这个视频优先加载, 换句话说就是提示: 如果需要的话, 可以下载整个视频, 即使用户并不一定会用它 
  - 空字符串: 也就代指 auto 值 

<br>

### audio标签的属性	
- src		  
- controls  
- autoplay  
- loop  	  
- muted  	  
- preload   

<br><br>

## 音视频js相关属性

### duration 
媒体总时间(只读), 单位为 秒  
duration的属性值 有些浏览器 可能延迟才能拿到音视频文件 在获取这个属性的属性值时, 要么用延时去取, 要么video audio触发一定的事件后再取 **不然的话有可能拿到的 NaN**

<br>

### currentTime
开始播放到现在所用的时间(可读写)

<br>

### muted
是否静音(可读写,相比于volume优先级要高)

<br>

### volume
0.0-1.0的音量相对值(可读写)

muted 和 volume 不会同步, 当设置为静音时, volume为1 这个现象很冲突, volume理应为0

```js
video.muted = true;
video.volume = 0;

// 当设置muted时, 要连带volume一起设置 muted属性 优先级比volume高
```

<br>

### paused:  
媒体是否暂停(只读)

<br>

### ended:  
媒体是否播放完毕(只读)

<br>

### error:  
媒体发生错误的时候, 返回错误代码(只读)

<br>

### currentSrc:  
以字符串的形式返回媒体资源地址(只读) -- 路径

<br>
	
### poster:   
视频播放前的预览图片(读写)
```js
视频对象.poster = 'url';
```

<br>

### width / height:   
设置视频的尺寸(读写) 标签的高度和宽度

<br>

### videoWidth / videoHeight:
视频的实际尺寸(只读) 本身视频的分辨率 上来尺寸是0 0 第一帧后是正常的分辨率

<br><br>

## 音视频js相关方法

### play():
媒体播放

<br>

### pause():
媒体暂停
```js
// 播放5秒后暂停
setTimeout(function(){
  video.pause();
},5000);
```

<br>

### load():
重新加载媒体 结合source标签的时候才有用

```js
// 当视频是用 video标签直接引入时
video.src = '可以直接修改视频路径'

// 当视频是用 source标签引入时 要先再修改视频路径后, 再重新加载媒体
source[0].src = 'xxx';
video.load();
```

<br><br>
	
## 音视频js相关事件

### 视频:

### abort事件
在播放被终止时触发, 例如, 当播放中的视频重新开始播放时会触发这个事件 

<br>

### canplay事件
在媒体数据已经有足够的数据(至少播放数帧)可供播放时触发 这个事件对应CAN_PLAY的readyState 

<br>

### canplaythrough事件
在媒体的readyState变为CAN_PLAY_THROUGH时触发, 表明媒体可以在保持当前的下载速度的情况下不被中断地播放完毕 注意: 手动设置currentTime会使得firefox触发一次canplaythrough事件, 其他浏览器或许不会如此 

<br>

### durationchange事件
元信息已载入或已改变, 表明媒体的长度发生了改变 例如, 在媒体已被加载足够的长度从而得知总长度时会触发这个事件 

<br>

### emptied事件
媒体被清空(初始化)时触发 

<br>

### ended事件
播放结束时触发 

<br>

### error事件
在发生错误时触发 元素的error属性会包含更多信息 参阅Error handling获得详细信息 

<br>

### loadeddata事件
媒体的第一帧已经加载完毕 

<br>

### loadedmetadata事件
媒体的元数据已经加载完毕, 现在所有的属性包含了它们应有的有效信息 

<br>

### loadstart事件
在媒体开始加载时触发 

<br>

### mozaudioavailable事件
当音频数据缓存并交给音频层处理时

<br>

### pause事件
播放暂停时触发 

<br>

### play事件
在媒体回放被暂停后再次开始时触发 即, 在一次暂停事件后恢复媒体回放 

<br>

### playing事件
在媒体开始播放时触发(不论是初次播放、在暂停后恢复、或是在结束后重新开始) 

<br>

### progress事件
告知媒体相关部分的下载进度时周期性地触发 有关媒体当前已下载总计的信息可以在元素的buffered属性中获取到 

<br>

### ratechange事件
在回放速率变化时触发 

<br>

### seeked事件
在跳跃操作完成时触发 

<br>

### seeking事件
在跳跃操作开始时触发 

<br>

### stalled事件
在尝试获取媒体数据, 但数据不可用时触发 

<br>

### suspend事件
在媒体资源加载终止时触发, 这可能是因为下载已完成或因为其他原因暂停 

<br>

### timeupdate事件
元素的currentTime属性表示的时间已经改变 

<br>

### volumechange事件
在音频音量改变时触发(既可以是volume属性改变, 也可以是muted属性改变)

<br>

### waiting事件
在一个待执行的操作(如回放)因等待另一个操作(如跳跃或下载)被延迟时触发

<br>


<br>

### 音频:
### abort事件
在播放被终止时触发,例如, 当播放中的视频重新开始播放时会触发这个事件 

<br>

### canplay事件
在媒体数据已经有足够的数据(至少播放数帧)可供播放时触发 这个事件对应CAN_PLAY的readyState 

<br>

### canplaythrough事件
在媒体的readyState变为CAN_PLAY_THROUGH时触发, 表明媒体可以在保持当前的下载速度的情况下不被中断地播放完毕 注意: 手动设置currentTime会使得firefox触发一次canplaythrough事件, 其他浏览器或许不会如此 

<br>

### durationchange事件
元信息已载入或已改变, 表明媒体的长度发生了改变 例如, 在媒体已被加载足够的长度从而得知总长度时会触发这个事件 

<br>

### emptied事件
媒体被清空(初始化)时触发 

<br>

### ended事件
播放结束时触发 

<br>

### error事件
在发生错误时触发 元素的error属性会包含更多信息 参阅Error handling获得详细信息 

<br>

### loadeddata事件
媒体的第一帧已经加载完毕 

<br>

### loadedmetadata事件
媒体的元数据已经加载完毕, 现在所有的属性包含了它们应有的有效信息 

<br>

### loadstart事件
在媒体开始加载时触发 

<br>

### mozaudioavailable事件
当音频数据缓存并交给音频层处理时

<br>

### pause事件
播放暂停时触发 

<br>

### play事件
在媒体回放被暂停后再次开始时触发 即, 在一次暂停事件后恢复媒体回放 

<br>

### playing事件
在媒体开始播放时触发(不论是初次播放、在暂停后恢复、或是在结束后重新开始) 

<br>

### progress事件
告知媒体相关部分的下载进度时周期性地触发 有关媒体当前已下载总计的信息可以在元素的buffered属性中获取到 

<br>

### ratechange事件
在回放速率变化时触发 

<br>

### seeked事件
在跳跃操作完成时触发 

<br>

### seeking事件
在跳跃操作开始时触发 

<br>

### stalled事件
在尝试获取媒体数据, 但数据不可用时触发 

<br>

### suspend事件
在媒体资源加载终止时触发, 这可能是因为下载已完成或因为其他原因暂停 

<br>

### timeupdate事件
元素的currentTime属性表示的时间已经改变 

<br>

### volumechange事件
在音频音量改变时触发(既可以是volume属性改变, 也可以是muted属性改变)

<br>

### waiting事件
在一个待执行的操作(如回放)因等待另一个操作(如跳跃或下载)被延迟时触发

<br>

### 磁性吸附
```js
if(nowMouseX<100){
    nowMouseX = 0;
}
```

<br>

### 碰撞测试
```js
var T1 = testNode.offsetTop;
var B1 = testNode.offsetTop + testNode.offsetHeight;
var R1 = testNode.offsetLeft + testNode.offsetWidth
var L1 = testNode.offsetLeft;

var T2 = imgNode.offsetTop;
var B2 = imgNode.offsetTop + imgNode.offsetHeight;
var R2 = imgNode.offsetLeft + imgNode.offsetWidth
var L2 = imgNode.offsetLeft;

if (R1<L2||B1<T2||L1>R2||T1>B2) {
  //没有撞到
  imgNode.src="img/tg.png";
} else {
  imgNode.src="img/xfz.png";
}
```

