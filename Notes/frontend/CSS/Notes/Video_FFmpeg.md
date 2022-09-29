### 格式转化
用 FFmpeg 制作MP4 视频
    ffmpeg -i test.mp4 -c:v libx264 -s 1280x720 -b:v 1500k -profile:v high -level 3.1 -c:a aac -ac 2 -b:a 160k -movflags faststart OUTPUT.mp4

用 FFmpeg 制作 WebM 视频
    ffmpeg -i test.mp4 -c:v libvpx -s 1280x720 -b:v 1500k -c:a libvorbis -ac 2 -b:a 160k OUTPUT.webm

FFmpeg 制作 Ogg 视频
    ffmpeg -i test.mp4 -c:v libtheora -s 1280x720 -b:v 1500k -c:a libvorbis -ac 2 -b:a 160k OUTPUT.ogv

FFmpeg 制作Mp3音频
    ffmpeg -i test.mp3 -c:a libmp3lame -ac 2 -b:a 160k OUTPUT.mp3
    
FFmpeg 制作Ogg音频
    ffmpeg -i test.mp3 -c:a libvorbis -ac 2 -b:a 160k OUTPUT.ogg

FFmpeg 制作ACC音频	
    ffmpeg -i test.mp3 -c:a aac -ac 2 -b:a 160k OUTPUT.aac


### 格式转换的流程
1、找到 FFmpeg.exe 文件的目录 然后复制 这个文件所在的路径
2、配置系统的环境变量 在path上 我的电脑 右键 属性 环境变量
3、找到音视频文件所在的目录 cmd 粘贴上 上面的对应命令
<!-- 配置环境变量的时候 不要有中文出现 -->


### 参数介绍
ffmpeg -y -i %1 -vcodec libx264 -b:v 400k -s 2340x1080 out.mp4

ffmpeg -i test.mp4 -c:v libx264 -s 1280x720 -b:v 1500k -profile:v high -level 3.1 -c:a aac -ac 2 -b:a 160k -movflags faststart OUTPUT.mp4

-y:             当已存在out.mp4是，不提示是否覆盖。
-i name:        输入文件名（可拖动到bat文件上）。
-c:v libx264:   输出文件使用的编解码器。
-b:v 400K:      码率，一般设置为400k即可，此参数越小，文件大小越小。
-s 2340x1080:   输出分辨率，可以根据播放设备调整。 
-profile:v high 使用H.264的High模式 比較消耗資源
-pre slow       使用慢速模式 耗時間 清晰度高
out.mp4:        输出文件名。

-c:v libx264    H.264编码 估计使用这个的比较多 优点是同等清晰度 视频文件更小 缺点就是转换慢的吐血




### 码率
> bitrate = file size / duration 
- 比如一个文件20.8M，时长1分钟，那么，码率就是： 
<!-- 
    biterate = 20.8M bit/60s = 20.8*1024*1024*8 bit/60s= 2831Kbps 
 -->

> ffmpg控制码率有3种选择，
-minrate 
-maxrate    -minrate -maxrate就简单了，在线视频有时候，希望码率波动，不要超过一个阈值，可以设置maxrate。 
-b:v        主要是控制平均码率

<!-- 
    比如一个视频源的码率太高了，有10Mbps，文件太大，想把文件弄小一点，但是又不破坏分辨率。 
    ffmpeg -i input.mp4 -b:v 2000k output.mp4 

    上面把码率从原码率转成2Mbps码率，这样其实也间接让文件变小了。目测接近一半。 
    不过，ffmpeg官方wiki比较建议，设置b:v时，同时加上 -bufsize 
    -bufsize 用于设置码率控制缓冲器的大小，设置的好处是，让整体的码率更趋近于希望的值，减少波动。
 -->

> 512Kbps
- 視頻bitrate 設置為 360k 最大416k 音頻設置為64k

> 1Mbps
- 視頻bitrate 設置為720k 最大832k 音頻設置為 128k

> 2Mbps HD
- 視頻bitrate 設置為1550k 最大1792k 音頻設置為128k


### 視頻大小 建议值
240P    320×240    //Mobile iPhone MP4
360P    640×360    //SD FLV
480P    864×480    //HD MP4
720P    960×720    //HD MP4