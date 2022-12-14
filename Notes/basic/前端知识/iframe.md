# iframe标签
通过该标签可以将一个 HTML 页面 嵌入到当前的页面中

**示例:**  
```html
<iframe 
  id="inlineFrameExample"
  title="Inline Frame Example"
  width="300"
  height="200"
  src="url">
</iframe>
```

<br>

## CSP: 内容安全策略
```s
https://developer mozilla org/zh-CN/docs/Web/HTTP/CSP#%E6%8F%8F%E8%BF%B0%E7%AD%96%E7%95%A5
```

内容安全策略 (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS (en-US)) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。

该安全策略的实现基于一个称作 Content-Security-Policy 的 HTTP 首部。

为使 CSP 可用，你需要配置你的网络服务器返回 Content-Security-Policy HTTP 头部

除此之外， ``<meta>`` 元素也可以被用来配置该策略，例如

```html
<meta 
  http-equiv="Content-Security-Policy" 
  content="default-src 'self'; img-src https://*; child-src 'none';">

```

<br>

### 跨站脚本攻击
CSP 的主要目标是减少和报告 XSS 攻击，XSS 攻击利用了浏览器对于从服务器所获取的内容的信任。恶意脚本在受害者的浏览器中得以运行，因为浏览器信任其内容来源，即使有的时候这些脚本并非来自于它本该来的地方。

CSP 通过指定有效域——即浏览器认可的可执行脚本的有效来源——使服务器管理者有能力减少或消除 XSS 攻击所依赖的载体。一个 CSP 兼容的浏览器将会仅执行从白名单域获取到的脚本文件，忽略所有的其他脚本 (包括内联脚本和 HTML 的事件处理属性)。

作为一种终极防护形式，始终不允许执行脚本的站点可以选择全面禁止脚本执行。

<br>

### 使用 CSP:
配置内容安全策略涉及到添加 Content-Security-Policy HTTP 头部到一个页面，并配置相应的值，以控制用户代理（浏览器等）可以为该页面获取哪些资源。

比如一个可以上传文件和显示图片页面，应该允许图片来自任何地方，但限制表单的 action 属性只可以赋值为指定的端点。一个经过恰当设计的内容安全策略应该可以有效的保护页面免受跨站脚本攻击

可以使用 Content-Security-Policy HTTP 头部 来指定你的策略，像这样：

```html
Content-Security-Policy: policy
```

policy 参数是一个包含了各种描述你的 CSP 策略指令的字符串。

<br>

### 描述策略:
一个策略由一系列策略指令所组成，每个策略指令都描述了一个针对某个特定类型资源以及生效范围的策略。

你的策略应当包含一个default-src策略指令，在其他资源类型没有符合自己的策略时应用该策略 (有关完整列表查看default-src )。

一个策略可以包含 default-src 或者 script-src (en-US) 指令来防止内联脚本运行，并杜绝eval()的使用。

一个策略也可包含一个 default-src 或 style-src (en-US) 指令去限制来自一个 <style> 元素或者 style 属性的內联样式。

<br>

## iframe标签属性:

### allow:
用于为``<iframe>``指定其特征策略 

**作用:**  
allow 属性仅控制 iframe 中的功能。

**特性策略的书写规则:**  
```js
<feature name> <allowlist of origin(s)>

// 参考网址:
https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md
```

- *:  
示该特性在该文档下都是允许的，包括所有的嵌套的浏览内容(iframes),而不用管这些内容的源。

- self:  
表示该特性在该文档下都是允许的，并且仅在同源的情况下嵌套的浏览内容(iframes)才可以使用。

- src:  
(iframes的allow属性专用)表示该特性在这个iframe下允许使用，只要加载的文档来源的源和iframe的src属性指定的URL是同源的。

- none:  
表示该特性在顶层以及嵌套的浏览内容下都是被禁用的

- ``<origin(s)>``:  
表示该特性只在一些指定的源下才允许使用，多个源使用空格隔开
 
**示例:**  
比如你不允许iframe的页面全屏、不允许调用摄像头之类的行为，可以这么配置：
```html
<iframe allow="camera 'none'; fullscreen 'none'">
```

比如只允许同源的才可以使用全屏这个特性：
```html
<iframe src="https://example.com..." allow="fullscreen 'src'"></iframe>
```

比如只允许指定源才可以使用定位功能：
```html
<iframe src="https://google-developers.appspot.com/demos/..." allow="geolocation https://google-developers.appspot.com"></iframe>
```

<br>

有了功能策略，你可以选择一组“策略”，让浏览器强制执行整个网站使用的特定功能。这些策略限制了站点可以访问哪些 api，或者修改浏览器对某些特性的默认行为

**使用特性策略可以做什么的示例？**
- 改变手机和第三方视频自动播放的默认行为。
- 限制网站使用敏感的 api，如摄像头或麦克风。
- 允许 iframes 使用全屏 API 
- 阻止使用过时的 api，比如 synchronous XHR 和 - document write() 
- 确保图像的大小正确，对于视口来说不会太大。

<br>

**使用方式:**  
特性策略允许您在顶级页面和嵌入式框架中控制哪些源可以使用哪些特性。

功能策略提供了两种方法来指定用于控制功能的策略：
- Feature-Policy HTTP 报文头。
- 在allow iframes 之上的属性。

HTTP 标头和 allow 属性之间的主要区别在于 allow 属性仅控制 iframe 中的功能。标头控制响应中的功能以及页面内的任何嵌入式内容。

Web 提供的功能和 API 如果被滥用，可能会带来隐私或安全风险。在某些情况下，您可能希望严格限制在网站上使用此类功能的方式。有策略控制的功能，允许针对网站中的特定来源或框架启用/禁用功能。该功能在可用时与 Permissions API 或特定于功能的机制集成在一起，以检查该功能是否可用。

- 加速器
- 环境光源感测器
- 自动播放
- 摄像功能
- 加密媒体信息
- 全屏功能
- 地理定位
- 陀螺仪
- 延迟加载
- 麦克风
- Midi
- 支付请求
- 画中画 (Picture-in-picture)
- 扬声器
- USB
- VR / XR

<br>

**常见问题:iframe中嵌套的页面无法使用摄像头和麦克风**  
我们要通过 allow 属性设置访问的权限

```html
<iframe ref="iframes" src="xxx" allow="microphone *;camera *" />
```

<br>

**可以尝试的值有:**  
- microphone;camera;midi;encrypted-media;
- microphone *;camera *

microphone;camera等价于microphone *;camera *

<br>

在vue中，直接在iframe上调用，有时候也是不行的, 在vue中嵌入iframe去调取摄像头和麦克风，iframe的allow的属性必须得通过js的方式添加进去

```js
let iframeEl = this.$refs.iframes
if(iframeEl) {
  iframe.allow = "microphone *;camera *"
}
```

**注意:**  
chrome调用摄像头是需要https支持的

<br>

## Allow属性可能写的值:

### allowfullscreen:
设置为true时，可以通过调用 ``<iframe>`` 的requestFullscreen() 方法激活全屏模式。

<br>

### allowpaymentrequest:
设置为true时，跨域的 ``<iframe>`` 就可以调用 Payment Request API。

<br>

### csp:
对嵌入的资源配置内容安全策略。查看 HTMLIFrameElement.csp (en-US) 获取详情。

<br>

### height:
以 CSS 像素格式，或像素格式，或百分比格式指定 frame 的高度。默认值为150。

<br>

### importance:
表示 ``<iframe>`` 的 src 属性指定的资源的加载优先级。允许的值有：
 
- auto (default)  
不指定优先级。浏览器根据自身情况决定资源的加载顺序

- high  
资源的加载优先级较高

- low  
资源的加载优先级较低

<br>

### name:
用于定位嵌入的浏览上下文的名称。该名称可以用作 ``<a>`` 标签与 ``<form>`` 标签的 target 属性值，

也可以用作 ``<input>`` 标签和 ``<button>`` 标签的 formtarget 属性值，还可以用作 window.open() 方法的 windowName 参数值。

<br>

### referrerpolicy:
表示在获取 iframe 资源时如何发送 referrer 首部：

这个属性牵扯到了HTTP的referer策略，我们知道referer的策略是这样的：

- no-referrer:   
不发送 Referer 首部。

- no-referrer-when-downgrade (default):  
向不受 TLS (HTTPS) 保护的 origin 发送请求时，不发送 Referer 首部。

- origin:  
referrer 首部中仅包含来源页面的源。换言之，仅包含来源页面的 scheme, host, 以及 port (en-US)。

- origin-when-cross-origin:  
发起跨域请求时，仅在 referrer 中包含来源页面的源。发起同源请求时，仍然会在 referrer 中包含来源页面在服务器上的路径信息。

- same-origin:  
对于 same origin（同源）请求，发送 referrer 首部，否则不发送。

```html
<iframe allow="fullscreen 'none'" referrerpolicy="no-referrer" src='http://127.0.0.1:3000/iframe.html'></iframe>
```

<br>

### sandbox:
iframe的沙箱模式可以提供一些额外的配置，当你把一个iframe置为沙箱的时候，意味着沙箱内的内容的行为全凭你控制了。
```s
https://zhuanlan.zhihu.com/p/88809313
```

该属性对呈现在 iframe 框架中的内容启用一些额外的限制条件。属性值可以为空字符串（这种情况下会启用所有限制），也可以是用空格分隔的一系列指定的字符串。有效的值有：

- allow-downloads-without-user-activation:  
允许在没有征求用户同意的情况下下载文件。

- allow-forms:   
允许嵌入的浏览上下文提交表单。如果没有使用该关键字，则无法提交表单。

- allow-modals:   
允许嵌入的浏览上下文打开模态窗口。

- allow-orientation-lock:   
允许嵌入的浏览上下文锁定屏幕方向（译者注：比如智能手机、平板电脑的水平朝向或垂直朝向）。

- allow-pointer-lock:   
允许嵌入的浏览上下文使用 Pointer Lock API.

- allow-popups:   
允许弹窗 (例如 window.open, target="_blank", showModalDialog)。如果没有使用该关键字，相应的功能将自动被禁用。

- allow-popups-to-escape-sandbox:   
允许沙箱化的文档打开新窗口，并且新窗口不会继承沙箱标记。例如，安全地沙箱化一个广告页面，而不会在广告链接到的新页面中启用相同的限制条件。

- allow-presentation:  
允许嵌入的浏览上下文开始一个 presentation session (en-US)。

- allow-same-origin:  
如果没有使用该关键字，嵌入的浏览上下文将被视为来自一个独立的源，这将使 same-origin policy 同源检查失败。

- allow-scripts:   
允许嵌入的浏览上下文运行脚本（但不能创建弹窗）。如果没有使用该关键字，就无法运行脚本。

- allow-storage-access-by-user-activation   
实验性: 允许嵌入的浏览上下文通过 Storage Access API (en-US) 使用父级浏览上下文的存储功能。

- allow-top-navigation:   
允许嵌入的浏览上下文导航（加载）内容到顶级的浏览上下文。

- allow-top-navigation-by-user-activation:   
允许嵌入的浏览上下文在经过用户允许后导航（加载）内容到顶级的浏览上下文。

<br>

### accelerometer:
デバイスの加速度に関する情報へのアクセス（Accelerometer インターフェイス）

<br>

### ambient-light-sensor:
デバイス周囲の光量に関する情報へのアクセス（AmbientLightSensor インターフェイス）

<br>

### autoplay:
メディアの自動再生（HTMLMediaElement インターフェイス）

<br>

### battery:
デバイスのバッテリーに関する情報へのアクセス（Battery Status API）

<br>

### camera:
デバイスのカメラへのアクセス（getUserMedia() メソッド）

<br>

### display-capture:
画面のキャプチャ（getDisplayMedia() メソッド）

<br>

### document-domain:
document.domainの設定（Document インターフェイス）

<br>

### fullscreen:
全画面モードで表示（requestFullscreen() メソッド）

<br>

### geolocation:
デバイスの位置情報へのアクセス（Geolocation インターフェイス）

<br>

### gyroscope:
デバイスの向きに関する情報へのアクセス（Gyroscope インターフェイス）

<br>

### magnetometer:
デバイスの向きに関する情報へのアクセス（Magnetometer インターフェイス）

<br>

### microphone:
デバイスのマイクへのアクセス（getUserMedia() メソッド）

<br>

### midi:
MIDIデバイスへのアクセス（Web MIDI API）

<br>

### picture-in-picture:
ピクチャー・イン・ピクチャーで動画を再生（対応するAPI）

<br>

### publickey-credentials-get:
公開鍵認証情報へのアクセス（Web Authentication API）

<br>

### screen-wake-lock:
デバイスが画面を暗くしたりオフにしてはならないことを示す（Screen Wake Lock API）

<br>

### web-share:
テキスト、リンク、画像などコンテンツを任意の宛先に共有（Web Share API）