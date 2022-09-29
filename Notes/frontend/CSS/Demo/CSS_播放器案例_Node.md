### 视频的宽高
- 但是好像宽高只能保持导出视频时的比例

- 可以通过css来控制
<!-- 
  vedio {
    width:100%;
    height:100%;
  } 
 -->

- 也可以通过js来控制
<!-- 
  video.width = videoWrap.offsetWidth;
  video.height = videoWrap.offsetHeight - control.offsetHeight;
 -->

- 全屏的做法:
<!-- 
  video.height=window.screenWidth;
 -->


### window.onresize
- 我们在js中设置的尺寸 是一次性的, 当浏览器窗口尺寸发生改变的时候, 有一些尺寸也应该发生变化
<!-- 
  window.onresize = function() {
    video.width = videoWrap.offsetWidth;
    video.height = videoWrap.offsetHeight - control.offsetHeight;
  }
 -->