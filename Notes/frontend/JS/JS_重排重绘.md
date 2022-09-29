### 重绘(replaint)
- 当页面中的元素只是外观或风格被改变不影响布局, 比如更换背景色backgroundColor, 这个过程就是重绘

### 重排(relayout)
- 当RenderTre中的一部分(或全部)因为元素的规模尺寸, 布局, 隐藏等改变, 浏览器为了重新渲染部分或整个页面, 重新计算页面元素位置和几何结果的过程, 也就是重新构造渲染树, 这个过程叫做重排

### 回流(reflow)
- Gecko中布局的称谓, 同时也是重排的别称

> 重排比重绘成本要高得多
- DOM Tree里的每个节点都会有reflow方法, 一个节点reflow很可能导致子节点, 甚至父节点以及同级节点的reflow


### 触发重排的因素
- 元素的布局 和 几何属性改变时 就会触发reflow, 主要有这些属性
> 页面初始渲染

> 添加 / 删除可见DOM元素

> 改变元素位置 -- 定位属性 及 浮动position float

> 改变元素尺寸(宽 高 内外边距 边框) 盒子模型相关属性 height padding margin display, border-width min-height

> 改变元素内容（文本或图片等） text-align , line-height ,vertival-align ,overflow ,font-size,font-family,font-weight

> 改变窗口尺寸

> 获取元素的offsetWidth、offsetHeight、clientWidth、clientHeight、width、height、scrollTop、scrollHeight，请求了getComputedStyle(),或者 IE的 currentStyle


### 触发重绘的因素
- 页面中的元素更新外观或风格相关的属性时就会触发重绘，如:background，color，visibility， border-style ，border-radius outline-color，cursor，text-decoration， box-shadow
<!-- 
    注意：由页面的渲染过程可知，reflow必将会引起repaint，而repaint不一定会引起reflow 
-->

### 浏览器对回流的优化
- 回流花销很大，所以大部分浏览器对于回流都会进行优化，浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。

- 虽然有了浏览器的优化，但有些代码可能会强制浏览器提前flush队列，这样浏览器的优化可能就起不到作用了。当你请求向浏览器请求一些 style信息的时候，就会让浏览器flush队列

> offsetTop, offsetLeft, offsetWidth, offsetHeight
> scrollTop/Left/Width/Height
> clientTop/Left/Width/Height
> width,height
> 请求了getComputedStyle(), 或者 IE的 currentStyle

- 当你请求上面的一些属性的时候，浏览器为了给你最精确的值，需要flush队列，因为队列中可能会有影响到这些值的操作。即使你获取元素的布局和样式信息跟最近发生或改变的布局信息无关，浏览器都会强行刷新渲染队列。


### 我们对回流 重排的一些优化
- 减少回流、重绘其实就是需要减少对render tree的操作（合并多次DOM和样式的修改），并减少对一些style信息的请求，尽量利用好浏览器的优化策略。
> 直接改变className，或者使用cssText（会把原有的cssText清掉）
<!-- 
    // bad
    el.style.left = "10px";
    el.style.top = "10px";

    // good
    el.className = " newClassName";

    //or
    el.style.cssText = "left:10px;top:10px;width:20px;height:20px;";
 -->

> 对需要操作的元素进行”离线处理”，处理完后一起更新：
- 使用DocumentFragment进行缓存操作,引发一次回流和重绘；
- 使用display:none技术，只引发两次回流和重绘；
- 使用cloneNode(true or false) 和 replaceChild 技术，引发一次回流和重绘；

>不要经常访问会引起浏览器flush队列的属性，如果你确实要访问，利用缓存(利用变量)
<!-- 
    // bad
    for (var i = 0; i < len; i++) {
        el.style.left = el.offsetLeft + x + "px";
        el.style.top = el.offsetTop + y + "px";
    }

    // good
    var x = el.offsetLeft,
        y = el.offsetTop;
    for (var i = 0; i < len; i++) {
        x += 10;
        y += 10;
        el.style = x + "px";
        el.style = y + "px";
    }
 -->

> 让动画元素脱离文档流，减少回流的Render树的规模(使用position属性的fixed值或absolute值等等)

> 避免使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局。