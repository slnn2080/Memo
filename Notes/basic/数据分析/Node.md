### performance
- performance该属性是windows身上的一个属性 它是一个对象
- 这里我们说说 performance.timing

> performance.timing
- 提供了在加载和使用当前页面期间发生的各种事件的性能计时信息。

- navigationStart
- 毫秒数，表征了从同一个浏览器上下文的上一个文档卸载 (unload) 结束时的 UNIX 时间戳。如果没有上一个文档，这个值会和 PerformanceTiming.fetchStart 相同。


- unloadEventStart
- 毫秒数，表征了unload (en-US)事件抛出时的 UNIX 时间戳。如果没有上一个文档，or if the previous document, or one of the needed redirects, is not of the same origin，这个值会返回 0.


- unloadEventEnd
- 毫秒数，表征了unload (en-US)事件处理完成时的 UNIX 时间戳。如果没有上一个文档，or if the previous document, or one of the needed redirects, is not of the same origin，这个值会返回 0.


- redirectStart
- 毫秒数，表征了第一个 HTTP 重定向开始时的 UNIX 时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回 0.


- redirectEnd
- 毫秒数，表征了最后一个 HTTP 重定向完成时（也就是说是 HTTP 响应的最后一个比特直接被收到的时间）的 UNIX 时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回 0.


- fetchStart
- 毫秒数，表征了浏览器准备好使用 HTTP 请求来获取 (fetch) 文档的 UNIX 时间戳。这个时间点会在检查任何应用缓存之前。


- domainLookupStart
- 毫秒数，表征了域名查询开始的 UNIX 时间戳。如果使用了持续连接 (persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart 一致。


- domainLookupEnd
- 毫秒数，表征了域名查询结束的 UNIX 时间戳。如果使用了持续连接 (persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart 一致。


- connectStart
- 毫秒数，返回 HTTP 请求开始向服务器发送时的 Unix 毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于 fetchStart 属性的值。


- connectEnd
- 毫秒数，返回浏览器与服务器之间的连接建立时的 Unix 毫秒时间戳。如果建立的是持久连接，则返回值等同于 fetchStart 属性的值。连接建立指的是所有握手和认证过程全部结束。


- secureConnectionStart
- 毫秒数，返回浏览器与服务器开始安全链接的握手时的 Unix 毫秒时间戳。如果当前网页不要求安全连接，则返回 0。


- requestStart
- 毫秒数，返回浏览器向服务器发出 HTTP 请求时（或开始读取本地缓存时）的 Unix 毫秒时间戳。


- responseStart
- 毫秒数，返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的 Unix 毫秒时间戳。如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。


- responseEnd 
- 毫秒数，返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时（如果在此之前 HTTP 连接已经关闭，则返回关闭时）的 Unix 毫秒时间戳。


- domLoading
- 毫秒数，返回当前网页 DOM 结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange (en-US)事件触发时）的 Unix 毫秒时间戳。


- domInteractive
- 毫秒数，返回当前网页 DOM 结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange (en-US)事件触发时）的 Unix 毫秒时间戳。


- domContentLoadedEventStart 
- 毫秒数，返回当解析器发送DOMContentLoaded (en-US) 事件，即所有需要被执行的脚本已经被解析时的 Unix 毫秒时间戳。


- domContentLoadedEventEnd
- 毫秒数，返回当所有需要立即执行的脚本已经被执行（不论执行顺序）时的 Unix 毫秒时间戳。


- domComplete
- 毫秒数，返回当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange (en-US) 被触发时的 Unix 毫秒时间戳。


- loadEventStart
- 毫秒数，返回该文档下，load (en-US)事件被发送时的 Unix 毫秒时间戳。如果这个事件还未被发送，它的值将会是 0。


- loadEventEnd
- 毫秒数，返回当load (en-US)事件结束，即加载事件完成时的 Unix 毫秒时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是 0.



```js
console.log(performance)

// 结果：
{
  "timeOrigin": 1659017982358.9,
  "timing": {
    "connectStart": 1659017982362,
    "navigationStart": 1659017982358,
    "loadEventEnd": 0,
    "domLoading": 1659017982374,
    "secureConnectionStart": 0,
    "fetchStart": 1659017982362,
    "domContentLoadedEventStart": 0,
    "responseStart": 1659017982369,
    "responseEnd": 0,
    "domInteractive": 0,
    "domainLookupEnd": 1659017982362,
    "redirectStart": 0,
    "requestStart": 1659017982366,
    "unloadEventEnd": 1659017982373,
    "unloadEventStart": 1659017982373,
    "domComplete": 0,
    "domainLookupStart": 1659017982362,
    "loadEventStart": 0,
    "domContentLoadedEventEnd": 0,
    "redirectEnd": 0,
    "connectEnd": 1659017982362
  },
  "navigation": {
    "type": 1,
    "redirectCount": 0
  }
}


console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0))
console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))
if (t = performance.memory) {
    console.log('js内存使用占比：' +  (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%')
}
```

----------------

> 产品经理 数据分析
- 数据分析这门技术 是产品专业的人要学习的知识
- 同时前端埋点获取的数据 最终会调用接口发送到后端 后端拿到数据后 可能会过滤出有用的数据 会交由大数据人员来进行分析 获取


- 产品方面的知识体系学习链接在下面
- https://www.bilibili.com/video/BV1xS4y1M7yb?from=search&seid=932516711595202567&spm_id_from=333.337.0.0



### 数据埋点
- 作为前端 一般能接触到的就是数据埋点


> 数据埋点的目的:
- 为了尽可能完整的收集可以体现用户使用场景和真实需求的行为数据

- 所谓的埋点是**数据采集领域**(尤其是用户行为数据采集领域)的术语
- 指的是针对特定用户行为或事件进行捕获 处理和发送的相关技术及其实施过程 
- 比如用户某个icon点击次数 观看某个视频的时长等等
- 埋点的技术实质是先监听软件应用运行过程中的事件 当需要关注的事件发生时进行判断和捕获

- 因为js是跟用户直接交互的 在用户与页面的一些互动中 js都可以监听到 比如点击事件 这些也叫做行为数据
- 还有业务数据 属性数据 广告数据等 都是用户跟页面进行交互 而我们监听用户点击了哪些事件 从而收集过来的


- 特别注意需要明确事件发生时间点 判别条件 这里如果遇到不清楚的 需要和开发沟通清楚 避免采集数据与理想存在差异
- 比如进入某个页面 点击某个按钮等 会自动触发记录和存储 然后这些数据会被收集并传输到终端提供商 或者是通过后端采集用户使用服务过程中的请求数据

- 也就是说数据分析人员会通过数据获取和分析 描述客户画面 针对性的推送对应内容


> 为什么需要埋点
- 数据生产 - 数据采集 - 数据处理 - 数据分析挖掘 - 数据驱动/用户反馈 - 产品优化/迭代

- 上述是整个数据从产生到最终作用于产品优化上的过程 埋点是整个流程的开始点 
- 终端提供商在收集到埋点数据之后 通过大数据处理 数据统计 数据分析 数据挖掘等加工处理 

- 可以得到衡量产品状态的一些基本指标 比如活跃 留存 新增等大盘数据 从而洞察产品的状态 随着数据挖掘等技术的星期 埋点采集到的数据在以下方面的作用也越来越凸显


> 埋点sdk
- 有别人写好的数据埋点 我们可以直接进行调用


> 如何去埋点
- 一般情况下 主要有3类埋点：

> 1. 展现埋点
- 定义展现其实是一个服务端的触发
- 服务端被触发后 用户侧将会展现什么内容 展现埋点需要记录的是页面展现的内容信息 即服务器下发的内容是什么(这些东西一定是当前页面主要内容 不包含一些交互信息)


> 2. 曝光埋点
- 哪些下发的内容呗用户实际看到了 和展现埋点类似 由于屏幕优先 但内容可以无限 

- 哪些内容被用户侧实际看到(曝光) 需要记录的单个"内容"被看到
- 一系列下发的内容 可以触发多次曝光埋点


> 3. 交互埋点
- 交互埋点表明的是功能/内容被用户 点击 了
- 从埋点的时机来看 这个是展现 和 曝光的下游 记录对于我们提供的 服务 的 消费 情况

- 比如 一个页面用户可以点击 那么我们需要记录响应的交互动作埋点 
- 比如一个视频可以点赞 我们也可以记录交互埋点
- 比如 一个视频可以播放暂停 我们也可以记录消费埋点


> 埋点记录
- 关于埋点记录需要明确记录两个信息:
- 1. 点位信息:
  明确每个业务事件下的具体的参数信息 包含公共参数 业务参数

- 2. 点位映射
  每个埋点对应的业务含义


> 前端监控
- 一般来讲一个成熟的产品 运营与产品团队需要关注用户在产品内的行为记录 通过用户的行为记录来优化产品 研发与测试团队则需要关注产品的性能以及异常 确保产品的性能体验以及安全迭代

- 一般前端监控分为3类:

> 数据监控(监控用户行为)
- PV / UV
- PV: page view:
- 即页面浏览量或点击量

- UV:
- 指访问某个站点或点击某条新闻的不同ip地址的人数

- 用户在每一个页面的停留事件
- 用户通过什么入口来访问该网页
- 用户在响应的页面中触发的行为 等

- 同级这些数据是有意义的 如我们知道了用户来源的渠道 可以促进产品的推广
- 知道用户在每一个页面停留的时间 可以针对停留较长的页面增加广告推送等


> 性能监控(监控页面性能)
- 不同用户 不同机型和不同系统下的首屏加载时间
- 白屏时间
- http等 请求的响应时间
- 静态资源整体下载的时间
- 页面渲染时间
- 页面交互动画完成时间

- 这些性能监控的结果 可以展示前端性能的好坏 根据性能监测的结果可以进一步的去油前端性能 尽可能的提高用户体验


> 异常监控(监控产品 系统异常)
- 及时的上报异常情况 可以避免线上故障的发生 虽然大部分异常可以通过 try catch 的方式捕获 但是比如内存泄漏以及其它偶现的异常 难以捕获 常见的需要监控的异常包括

- js的异常监控
- 样式丢失的异常监控


- 为了能够得到上述的监控所需要的数据 我们就要监控这些内容 将获取的对应的数据发送到后台
- 将数据发送到后台的这个过程叫做埋点上报


> 埋点上报
- 上面我们说了前端监控的三个分类 了解了一个产品需要监控哪些内容以及为什么需要监控这些内容 那么我们应该怎么实现前端监控？

- 实现前端监控:
- 将我们要监控的事项(数据) 给收集起来 再提交给后台进行入库 最后再给数据分析组进行数据分析 最后处理好的数据再同步给运营或者是产品

- 数据收集的丰富性和准全兴会直接影响到我们做前端监控的质量 因此我们会以此为基础 为产品的未来发展指引方向


- 现在常见的埋点上报方法有3种:
- 1. 手动埋点
- 2. 可视化埋点
- 3. 无埋点


> 手动埋点:
- 也叫做代码埋点 即纯手动写代码 调用埋点 sdk 函数 在需要埋点的业务逻辑功能位置调用接口 上报埋点数据

- 像 *友盟 百度统计* 等第三方数据统计服务商都采用这种方案
- 手动埋点让使用者可以方便的设置自定义属性 自定义事件 所以当你需要深入下钻并精细化自定义分析时， 比较适合使用手动埋点

- 手动埋点的缺陷就是:
- 项目工程量大 需要埋点的位置太多 而且需要产品开发运营之间相互反复沟通 容易出现手动差错 如果错误 重新埋点的成本也很高


> 可视化埋点:
- 通过可视化交互的首端 代替上述的代码埋点 将业务代码 和 埋点代码分离 提供一个可视化交互的页面 输入为业务代码 通过这个可视化系统 可以在业务代码中自定义的增加埋点事件等 最后输出的代码耦合了业务代码和埋点代码


> 无埋点:
- 无埋点则是前端自动采集全部事件 上报埋点数据 由后端来过滤和计算出有用的数据 
- 优点是前端只要一次加载埋点脚本
- 缺点是流量和采集的数据过于庞大 服务器性能压力大


> 如何埋点
- 知道了埋点的作用以后 我们再来看看怎么埋 才能达到效果 其实埋点也有很多讲究 接下来剖析


> 手动埋点:
- 手动埋点就是代码埋点 它的本质其实就是用js代码拿到一些基本信息 然后在一些特定的位置返回给服务器
```js
域名: document.domianURL
页面标题: document.title
分辨率: window.screen.height / width
颜色深度: winodw.screen.colorDepth
Referer: document.referer
客户端语言: navigator.language
```

- 上面这些内容我们可以获取到 但是网站性能方面的信息呢？(比如我们的fiddler里面的性能) 


> 可以通过 全局对象 performance
```js
console.log(performance)

// 结果：
{
  "timeOrigin": 1659017982358.9,
  "timing": {
    "connectStart": 1659017982362,
    "navigationStart": 1659017982358,
    "loadEventEnd": 0,
    "domLoading": 1659017982374,
    "secureConnectionStart": 0,
    "fetchStart": 1659017982362,
    "domContentLoadedEventStart": 0,
    "responseStart": 1659017982369,
    "responseEnd": 0,
    "domInteractive": 0,
    "domainLookupEnd": 1659017982362,
    "redirectStart": 0,
    "requestStart": 1659017982366,
    "unloadEventEnd": 1659017982373,
    "unloadEventStart": 1659017982373,
    "domComplete": 0,
    "domainLookupStart": 1659017982362,
    "loadEventStart": 0,
    "domContentLoadedEventEnd": 0,
    "redirectEnd": 0,
    "connectEnd": 1659017982362
  },
  "navigation": {
    "type": 1,
    "redirectCount": 0
  }
}
```
- 我们可以通过 performance 能拿到 DNS 解析事件 TCP 建立连接事件 首页白屏时间 DOM渲染完成时间 页面load事件等

```js
// 拿到Performance并且初始化一些参数
let timing = performance.timing.
    start = timing.navigationStart,
    dnsTime = 0,
    tcpTime = 0,
    firstPaintTime = 0,
    domRenderTime = 0,
    loadTime = 0


// 根据提供的api和属性 拿到对应的时间
dnsTime = timing.domainLookupEnd - timing.domainLookupStart

tcpTime = timing.connectEnd - timing.connectStart

firstPaintTime = timing.responseStart - start

domRenderTime = timing.domContentLoadedEventEnd - start

loadTime = timing.loadEventEnd - start

console.log(
  ` 
    DNS解析时间: ${dnsTime},
    TCP建立时间: ${tcpTime},
    首屏时间: ${firstPaintTime},
    页面onload时间: ${loadTime},
  `
)
```

- 拿到这些数据以后我们可以在提交 或者通过图片的方式去提交埋点内容
```js
// 页面加载时间发送埋点请求
$(function() {
  sendRequest(params)
})


// 按钮点击时发送埋点请求
$("button").click(function() {
  sendRequest(params)
})


// 通过伪装成 Image 对象 传递给后端 防止跨域
// 最常用的就是 gif 格式
let img = new Image(1, 1)
let src = `http://aaaa/api/test.jpg?args=${encodeURIComponent(args)}`


// css实现的埋点
.link:active::after {
  content: url("http://www.example.com?action=yourdata")
}

<a class="link">点击我 会发埋点数据</a>


// data自定义属性 rang.js去拿到属性绑定的时间 实现埋点
<button data-mydata="{key: 'uber_comt_share_ck', act: 'click', msg: {}}">
```


> 可视化埋点
- 这种埋点方案 又叫做无痕埋点 解放了前端手动操作的工作量 其实本质就是系统去插入本来需要手动插入的埋点 这种埋点方式由于自带技术壁垒 所以开发人员基本不用考虑 花钱即可
- 比较靠谱的服务器 国外的 Mixpanel 国内焦躁支持可视化埋点的有 TalkingData 诸葛IO 腾讯MTA等


> 无埋点
- 无埋点并不是没有埋点 所谓无只是不需要工程师在业务代码里面插入侵入式的代码 只需要简单的加载了一段定义好的SDK代码 技术门槛更低 使用与部署也简单 避免了需求的变更 埋点错误导致的重新埋点 也是大多网站的选择 因为实在太简单了 我们看看百度埋点

```js
let _hmt = _hmlt || []
;(function() {
  var hm = document.createElement("script")
  hm.src = "https://hm.baidu.com/hm.js?xxxxxx"

  let s = document.getElementByTagName("script")[0]
  s.parentNode.insertBefore(hm, s)
})()
```

- 只要插入上面的代码 百度就能够帮我们统计出各种各样的数据

- 然后我们可以在 百度的相关页面能看到统计数据 省时省力就是不省钱 缺点就是由于自动完成 无法针对特定场景拿到数据 并且上面的方式是由后端来过滤和计算出有用的数据 服务端压力比较大


> 为什么用gif上报的原因
- 向服务器上报数据 可以通过请求接口 请求普通文件 或者请求图片资源的方式 只要能上报数据 无论是请求gif文件还是请求js文件或者调用页面接口 服务器其实并不关心具体的上报方式 那为什么所有系统都统一使用了请求 gif图片的方式上报数据呢

- 1. 防止跨域
- 一般而言 打点域名都不是当前域名 所以所有的接口请求都会造成跨域 而跨域请求很容易出现由于配置不当被浏览器拦截并报错 这是不能接收的 但是图片的src属性并不会跨域 并且同样可以发起请求

- 2. 放置阻塞页面加载 影响用户体现
- 通常 创建资源节点后只有将对象注入到浏览器dom树后 浏览器才会实际发送资源请求 反复操作dom不仅会引发性能问题 而且载入jscss资源还会阻塞页面渲染 影响用户体验

- *但是图片请求例外 构造图片打点不仅不用插入dom 只要在js中new出image对象就能发起请求* 而且还没有阻塞问题 在没有js的浏览器环境中也能通过img标签正常打点 这是其它类型的资源请求所做不到的

- 3. 相比png jpg gif体积最小
- 最小的bmp文件需要74个字节 png需要67个字节 而合法的gif 只需要43个字节 同样的响应 gif可以比bmp节约41%的流量

- 并且大多采用的是 1 * 1 像素的透明GIF来上报
- 1 * 1 像素是最小的合法图片 而且因为通过图片打点 所以图片最好是透明的 这样一来不会影响页面本身展示效果 二者表示图片透明只要使用一个二进制位标记图片是透明色即可 不用存储色彩空间数据 可以节约体积