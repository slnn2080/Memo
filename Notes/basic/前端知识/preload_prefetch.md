# link标签 的 preload & prefetch

前端项目如果使用SSR服务器渲染后 HTML文档会自动使用 preload 和 prefetch 来预加载所需的资源

<br>

### 资源预加载:
是另一个性能优化技术，我们可以使用该技术来预先告知浏览器某些资源可能在将来会被使用到。


<br>

## 资源优先级:
在Chrome浏览器中，不同的资源在浏览器渲染的不同阶段进行加载的优先级不同, 一共分成五个级别

- Highest   最高
- Hight     高
- Medium    中等
- Low       低
- Lowest    最低

<br>

### HTML CSS
其中主资源 HTML 和 CSS 的优先级最高，其他资源根据情况的不同优先级不一

<br>

### JS
JS脚本根据它们在文件中的 位置、是否异步、延迟或阻塞获得不同的优先级：

- 网络在第一个图片资源之前阻塞的脚本在网络优先级中是中级
- 网络在第一个图片资源之后阻塞的脚本在网络优先级中是低级
- 异步／延迟／插入的脚本(无论在什么位置)在网络优先级中是很低级

图片(视口可见)将会获得相对于视口不可见图片(低级)的更高的优先级(中级)，所以某些程度上 Chrome 将会尽量懒加载这些图片。低优先级的图片在布局完成被视口发现时，将会获得优先级提升

<br><br>

## preload的使用
它是 ``<link rel="preload">`` 的属性值

preload是让浏览器提前加载指定的资源，加载后先存放在内存中，不会立即执行，需要的时候再执行。

这样可以让加载和执行分离开来，提前加载指定的资源，不会阻塞渲染和document的onload事件

preload和prefetch差不多，区别是preload加载的资源是当前页面可能用到的资源，而prefetch是加载下一页面可能用到的资源，所以如果是当前页面要用还是用preload。

<br>

**注意:**  
Preload 作为一个新的web标准，目前只有Chrome支持Preload。

<br>

### 使用 preload 加载的跨域文件 crossorigin标签属性
crossorigin是link标签的标签属性

```html
<link 
  rel="preload' 
  href='url' 
  as="style" 
  οnlοad="callback" 
  crossorigin
/>
```

对跨域的文件使用preload要加上crossorigin属性

<br>

**onload:**  
设置资源加载完的回调函数onload

<br>

### 对字体的提前加载
web 字体是较晚才能被发现的关键资源（late-discovered critical resources）中常见的一类 

web 字体对页面文字的渲染资至关重要，但却被深埋 CSS 中，即便是预加载器有解析 CSS，也无法确定包含字体信息的选择器是否会真正应用在 DOM 节点上。而且，即便浏览器能对字体文件做出合理的预加载，一旦有新的 css 规则覆盖了现有字体规则，前面的预加载就多余了。

但有了 preload 这个标准，简单的一段代码就能搞定字体的预加载。

```html
<link rel="preload" href="font woff2" as="font" type="font/woff2" crossorigin>
```

<br>

**注意:**  
crossorigin 属性是必须的，即便是字体资源在自家服务器上，因为用户代理必须采用匿名模式来获取字体资源。Chrome 支持 WOFF2，也是目前唯一支持 preload 的浏览器。

<br>

**字体文件:**  
preload 字体不带 crossorigin 会二次获取！ 
确保对 preload 的字体添加 crossorigin 属性，否则字体文件会被下载两次，这个请求使用匿名的跨域模式。这个建议也适用于字体文件在相同域名下，也适用于其他域名的获取(比如说默认的异步获取)


<br>

### 与 preload 配套使用的 as 属性:
``<link rel="preload" as="style">``  

浏览器可以设置正确的资源加载优先级，这种方式可以确保资源根据其重要性依次加载， 所以，Preload既不会影响重要资源的加载，又不会让次要资源影响自身的加载；



浏览器可以确保请求是符合内容安全策略的，比如，如果我们的安全策略是 

``Content-Security-Policy: script-src 'self'``

只允许浏览器执行自家服务器的脚本，as 值为 script 的外部服务器资源就不会被加载。

浏览器能根据 as 的值发送适当的 Accept 头部信息；浏览器通过 as 值能得知资源类型，因此当获取的资源相同时，浏览器能够判断前面获取的资源是否能重用

<br>

**注意:**  
如果忽略 as 属性，或者错误的 as 属性会使 preload 等同于 XHR 请求，浏览器不知道加载的是什么，因此会赋予此类资源非常低的加载优先级

**不使用as属性:**  
如果对所 preload 的资源不使用明确的 “as” 属性，将会导致二次获取

<br>

### 警告:
没有用到的 preload 资源在 Chrome 的 console 里会在 onload 事件 3s 后发生警告

<br>

### 优势:
- 将加载和执行分离开，不阻塞渲染和document的onload事件
- 提前加载指定资源，不再出现依赖的font字体隔了一段时间才刷出的情况

<br>

**方式1:**  
使用 link标签 标记需要加载的资源
```html
<link rel="preload" as="style" href="url">
```

<br>

**方式2:**  
使用脚本动态创建
```js
let link = document createElement("link")
link rel = "preload"
link as = "style"
link href = "url"
document head appendChild(link)
```

<br>

### 注意:
在不支持 preload 的浏览器环境中，会忽略对应的 link 标签，而若需要做特征检测的话，则可以使用如下代码
```js
const isPreloadSupported = () =>{
  const link = document createElement('link');const relList =link relList;
  
  if (!relList || !relList supports) {
    return false;
  }
  
  return relList supports('preload');
}
```

<br>

### 特点:
使用 preload 后，不管资源是否使用都将提前加载。若不确定资源是必定会加载的，则不要错误使用 preload，以免本末导致，给页面带来更沉重的负担

<br><br>

## prefetch的使用
它是 ``<link rel="prefetch">`` 的属性值

它的作用是告诉浏览器加载下一页面可能会用到的资源，注意，是下一页面，而不是当前页面。

因此该方法的加载优先级非常低，也就是说该方式的作用是加速下一个页面的加载速度

<br>

### 区分:
preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源

prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源

在VUE SSR生成的页面中，首页的资源均使用preload，而路由对应的资源，则使用prefetch

所以，对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch