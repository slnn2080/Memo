### <font color="#C2185">DOM</font>
DOM 全称 document object model 文档对象模型
``` 
js中通过DOM来对HTML文档进行操作只要理解了DOM就可以随心所欲的操作web页面 
```

文档:
就是整个的HTML网页文档

对象:
表示将网页中的每一个部分都转换为了一个对象

模型:
使用模型来表示对象之间的关系这样方便我们获取对象

我们获取过来的DOM元素是一个对象(object), 所以称为文档对象模型

<br>

# DOM树:
```html 
<!DOCTYPE html>
<html>
<head>
  <title>Document</title>
</head>

<body>
  <a href="#">超链接</a>
</body>
</html> 
```

上面的页面比如 1.html 也是个对象html下面有谁？html标签

      文档
        ↓
      html
  ↙       ↘
head            body
↓               ↓
title             a  →  属性: href
↓               ↓
标签里的文字       标签里的文字
(文本节点)       (文本节点)



<br>

### <font color="#C2185">文档</font>
DOM中使用 document表示


<br>

### <font color="#C2185">元素</font>
DOM中使用 element表示(页面中的所有标签都是元素)


<br>

### <font color="#C2185">节点</font>
网页中所有内容都是节点(标签 属性 文本 注释) DOM中使用node表示

<br>


<br>

### <font color="#C2185">节点</font>
我们的互联网就是由一个个节点构成的 每一个计算机 每一个路由器 每一个交换机都是节点, 是节点构成了整个网络

是构成我们网页的最基本的组成部分网页中的每一个部分都可以成为是一个节点
``` html标签属性文本注释整个文档等都是一个节点```

虽然都是节点但是实际上他们的具体类型是不同的
比如:
标签称为元素节点
属性称为属性节点
文本称为文本节点
文档称为文档节点

节点的类型不同属性和方法也都不仅相同



<br>

### <font color="#C2185">常用的节点分为四类</font>
1. 文档节点: 整个html文档
2. 元素节点: html文档中的html标签
3. 属性节点: 元素的属性
4. 文本节点: html标签中文本内容

```html
<p id="pId">This is a pargraph</p>

<p></p>                 是元素节点
id="pId"                是属性节点
This is a pargraph      文本节点
```


<br>

### <font color="#C2185">节点的属性</font>
都是通过节点来调用 *节点.nodeName*
nodeName 都是大写 DIV

      nodeName    nodeType    nodeValue

文档节点    #document      9          null

元素节点    标签名          1          null

属性节点    属性名          2          属性值

文本节点    text           3          文本内容 空格换行都是

``` 通过值可以判断文档类型```

```js
let btn = document.querySelector("button")
console.log(btn.nodeName)   // BUTTON
console.log(btn.nodeType)   // 1
console.log(btn.nodeValue)  // null
```



<br>

### <font color="#C2185">文档节点 document </font>
代表的是整个html文档网页中的所有节点都是它的子节点
document对象作为window对象的属性存在的 我们不用获取可以直接使用
通过该对象我们可以在整个文档访问内查找节点对象并可以通过该对象创建各种节点对象 



<br>

### <font color="#C2185">元素节点 Element</font>
html中的各种标签都是元素节点这也是我们常用的一个节点, 浏览器会将页面中所有的标签都转换为一个元素节点, 我们可以通过document的方法来获取元素节点

比如:
根据id属性值获取一个元素节点对象
document.getElementById()



<br>

### <font color="#C2185">文本节点Text</font>
文本节点表示的是html标签以外的文本内容任意非html的文本都是文本节点, 它包括可以字面解释的纯文本内容

文本节点一般是作为元素节点的子节点存在的
获取文本节点时一般要先获取元素节点在通过元素节点获取文本节点

比如:
获取*元素节点的第一个子节点一般为文本节点*
\\ 元素节点.firstChild;



<br>

### <font color="#C2185">属性节点 Attr</font>
属性节点表示的是标签中的一个一个的属性这里要注意的是属性节点并非是元素节点的子节点, 而是元素节点的一部分
可以用过元素节点来获取指定的属性节点

比如:
元素节点.getAttributeNode("属性名");

<br>

# 文档的加载
```html 
<button id="btn">我是一个按钮</button>
```

```js
var btn = document.getElementById('btn');

btn.onclick = function(){
  alert("你还点？");
}
```

浏览器加载一个页面时是按照自上向下的顺序加载的
读取到一行就运行一行
如果将script标签写在页面的上面时 在代码执行时页面还没有加载, 页面没有加载 DOM对象也没有加载 会导致无法获取到DOM对象



<br>

### <font color="#C2185">写上面好还是写下面好</font>
如果追求性能的话写下面 后加载后执行, 写在上面好管理 好修改



<br>

### <font color="#C2185">window.onload 事件</font>
该事件会在整个页面加载完成之后才触发

为window绑定一个onload事件
该事件对应的响应函数将会在页面加载完成之后执行, 这样可以确保代码执行时所有的dom对象已经加载完毕了

```js
window.onload = function(){ };
```

<br>

# DOM 查询

<br>

### <font color="#C2185">console.dir()</font>
打印我们返回的元素对象, 更好的查看里面的属性和方法



<br>

### <font color="#C2185">获取 body:  document.body</font>

<br>

### <font color="#C2185">获取 html: document.documentElement</font>
```js
let body = document.body
console.log(body)       // <body>...</body>

let html = document.documentElement
console.log(html)       // <html>...</html>
```

<br>


<br>

### <font color="#C2185">获取页面元素</font>

<br>

### <font color="#C2185">document.getElementById("id")</font>
通过 id属性 获取 一个 元素节点对象

<br>


<br>

### <font color="#C2185">document.getElementsByName("")</font>
通过 name属性 获取 一组 元素节点对象
*以伪数组的形式存储*, 得到的元素是动态的, 上面html部分的内部变了 下面js的结果也会变

页面中只有一个 也是以数组返回
页面中没有这个元素的话, 返回的是空的伪数组

<br>


<br>

### <font color="#C2185">document.getElementsByClassName('类名')</font>
根据类名返回元素节点
H5新增的方法, ie678不支持, 但是移动端没有问题 
返回的也是伪数组

<br>


<br>

### <font color="#C2185">document.querySelector('选择器');</font>
H5新增的方法, ie8可以使用这个代替className 但是移动端没有问题

<br>


<br>

### <font color="#C2185">document.getElementsByTagName("")</font>
通过 标签名 获取 一组 元素节点对象

<br>


<br>

### <font color="#C2185">元素对象.getElementsByTagName("")</font>
获取元素节点的子节点

<br>

# 获取父节点 子节点 兄弟节点
利用DOM提供的方法获取元素(id TagName等), 逻辑性不强, 繁琐

利用节点层级关系获取元素(父子兄)节点关系获取元素, 逻辑性强, 但兼容性差, 但是节点操作获取元素更简单一些

注意:
页面中所有的东西都是节点 比如空格



<br>

### <font color="#C2185">元素对象.parentElement</font>

<br>

### <font color="#C2185">元素对象.parentNode(不会获取到空白文本因为父元素就一个)</font>
属性 *表示当前节点的父节点*
得到的是离元素最近的父级节点(*亲爸爸*) 找不到父节点就为null
```js
let p = document.querySelec('p')
p.parentNode;
```

<br>


<br>

### <font color="#C2185">元素对象.childNodes (标准, 一般不使用) </font>
表示 当前节点 的所有 子节点

返回值:
节点类数组

**要点:**
1. 只找子元素不找后代
2. 这个属性 会获取 包括文本在内的所有节点, 标签和标签之间的空白也会当成文本节点
但是在ie8以及以下的浏览器中不会将空白文本当成子节点, 所以该属性在ie8中会返回4个子元素而其他浏览器是9个
```js
// 可以利用 nodeType 来挑选元素节点, 不要文本节点(空格)
let ul = document.querySelector('ul');
console.log(ul.childNodes);

for(let i=0; i<ul.childNodes.length; i++) {
  if(ul.childNodes[i].nodeType == 1) {
      console.log(ul.childNodes[i]);
  }
}
```

<br>


<br>

### <font color="#C2185">元素对象.children (和上面比推荐):     只找子元素不找后代</font>
各个浏览器都支持
属性 可以获取 当前元素 的所有 子元素(一说元素肯定是标签了也就是不会返回空白了)

不会返回空白节点

<br>


<br>

### <font color="#C2185">元素对象.firstChild</font>
属性 表示当前节点的第一个子节点(包括空白文本节点)

<br>


<br>

### <font color="#C2185">元素对象.firstElementChild(不建议使用)</font>
属性 获取 当前元素 的 第一个子元素
兼容性的问题 只兼容ie9以上如果做pc端的话肯定要兼容ie8的

<br>


<br>

### <font color="#C2185">元素对象.lastChild</font>
属性 表示当前节点的最后一个子节点(包括空白文本节点)

<br>


<br>

### <font color="#C2185">元素对象.lastElementChild(不建议使用)</font>
属性 获取 当前元素 的 最后一个子元素
兼容性的问题 只兼容ie9以上如果做pc端的话肯定要兼容ie8的

<br>


<br>

### <font color="#C2185">实际开发中 如何获取 第一个 最后一个 节点的问题</font>

<br>

### <font color="#C2185">第一个元素子节点: ul.children[0]</font>

<br>

### <font color="#C2185">最后一个元素子节点 : ul.children[ul.children.length-1]</font>

<br>


<br>

### <font color="#C2185">元素对象.previousSibling(也可能获取到空白文本)</font>
属性 表示当前节点的前一个兄弟节点
会获取到空格 #text

<br>


<br>

### <font color="#C2185">元素对象.previousElementSibling(不会获取到空白文本)</font>
属性 表示获取前一个兄弟元素IE8以下不支持

<br>


<br>

### <font color="#C2185">元素对象.nextSibling(也可能获取到空白文本)</font>
属性 表示当前节点的后一个兄弟节点
会获取到空格 #text

<br>


<br>

### <font color="#C2185">元素对象.nextElementSibling</font>
属性 表示当前节点的后一个兄弟节点, IE8以下不支持

<br>


<br>

### <font color="#C2185">元素对象.innerHTML</font>
通过这个属性可以获取到元素内容的html代码
可以获取到标签内的内容但是对于自结束标签 没有意义 获取到的内容为空

<br>


<br>

### <font color="#C2185">元素对象.innerText</font>
该属性可以获取到元素内部的文本内容
它和innerHTML类似不同的是它会自动将HTML标签去除
``` innerHTML有标签innerText没有标签 就这么个区别```

<br>


<br>

### <font color="#C2185">元素对象.outerHTML</font>
innerHTML 获取的是 给定元素对象内部的 HTML 结构
比如:
```html
<div>
<span>test</span>
</div>
```

innerHTML 获取的是 <span>test</span>

而outerHTML 获取的是 包含给定元素对象在内的HTML结构
outerHTML 获取的是 全部
```html
<div>
<span>test</span>
</div>
```

**注意:**  
该方法火狐不认 所以针对这里要做兼容处理

很巧妙哈, 思路:  
我要获取的是 目标节点(包括目标节点) 也就是 app 本身
```html
<div id="app">
内容
</div>
```

但是火狐不认 那我就创建一个 div作为container 然后让这个 container中添加 复制后的 app节点
```html
<div id="container">
``` cloneNode(true)后的app```
<div id="app">
  内容
</div>
</div>
```

然后 我们取 container.innerHTML 不就能取到 app 了么

```js
if(el.outerHTML) {
return el.outerHTML
} else {
// 兼容处理
const container = document.createElement("div")
container.appendChild(el.cloneNode(true))
return container.innerHTML
}
```

<br>


<br>

### <font color="#C2185">元素对象.outerText</font>
获取给定元素对象在内的文本

<br>

# 创建节点

<br>

### <font color="#C2185">document.createElement("")</font>
可以用于创建一个元素节点对象需要一个标签名作为参数, 将会根据该标签名创建元素节点对象并将创建好的对象作为返回值返回

<br>


<br>

### <font color="#C2185">document.createAttribute("属性名")</font>
创建属性节点

```js
let attr = document.createAttribute('class');
attr.value = 'box1';
h1.setAttributeNode(attr)
```

**注意:**
元素节点.setAttributeNode()
该方法可以只设置属性名

元素节点.setAttribute('属性名', '属性值')
该方法就需要同时设置属性名 和 属性值

<br>


<br>

### <font color="#C2185">document.createTextNode("")    </font>
可以用于创建一个文本节点对象需要一个文本内容作为参数, 将会根据该内容创建文本节点并将新的节点返回

<br>

# 插入 删除 替换


<br>

### <font color="#C2185">父元素对象.appendChild()                  -- 后面添加</font>
调用父元素的方法向一个父节点中添加新的子节点 

**注意:**
该方法是用来添加节点 而不是内容

<br>


<br>

### <font color="#C2185">父元素对象.inserBefore(新节点, 指定节点)     -- 前面添加</font>
调用父元素的方法在指定的子节点前面插入新的子节点

参数:
1. 新节点
2. 指定节点

```js
let li = document.createElement('li');
ul.insertBefore(li, ul.children[0]);
```

<br>


<br>

### <font color="#C2185">父元素对象.removeChild()</font>
删除子节点

更常用的方式:
子节点.parentNode.removeChild(子节点)

场景:
```js
if(ul.children.length == 0) {
  this.disabled = true;
} else {
  ul.removeChild('li')
}
```

<br>


<br>

### <font color="#C2185">父元素对象.replaceChild(新节点, 旧节点)</font>
可以使用新子节点替换已有的子节点

<br>


<br>

### <font color="#C2185">要克隆的节点.cloneNode(浅拷贝(false) / 深拷贝(true))</font>
这个方法返回调用该方法的节点的一个副本, 也成为克隆节点 / 拷贝节点

参数:
false: 浅拷贝 只复制节点本身 (参数为空相当于 false)
true : 深拷贝 复制节点里面的内容

```js
let ul = document.querySelector('ul');

let lili = ul.children[0].cloneNode(false / true);
ul.appendChild(lili);
```

<br>

# 获取和设置 节点属性:


<br>

### <font color="#C2185">元素对象.属性值</font>
获取内置属性值(元素本身自带的属性)
```html
<div id='demo'></div>
div.id
```

<br>


<br>

### <font color="#C2185">元素对象.getAttribute('属性名')</font>
返回指定的属性值
```js
元素对象.getAttribute('id');            // demo
元素对象.getAttribute('自定义属性')
```

<br>


<br>

### <font color="#C2185">元素对象.setAttribute('属性名', ‘属性值)</font>
把指定属性设置或修改为指定的值, 可以获取自定义属性
ie8以及以下不支持该属性
```js
元素对象.setAttribute('type', 'button');
```

<br>


<br>

### <font color="#C2185">元素对象.setAttributeNode('class')</font>
在指定元素对象中设置属性

示例:
```js
// 1.创建属性 或者说 创建属性节点
let class = document.createAttribute('class');

// 2.在创建的属性中添加值
class.value/nodeValue = 'box1';

// 3.在指定元素对象内部 添加属性节点
元素对象.setAttributeNode('class')
```

**属性名才有value, 节点的话只能用innerHTML**

<br>

# JS自定义属性 data-
往HTML标签上添加自定义属性来存储和操作数据
自定义属性 是为了保存并使用数据, 有些数据可以保存到页面中而不用保存到数据库中

应用场景:
比如京东左侧的导航栏 一组一组的有手机 有家用电器 有家具等等
这时我们再有东西需要放在一组一组的归类中, 那么怎么区分应该放到哪组里(是家具还是手机还是家用电器的) 这是时候我们就习惯用自定义属性来进行区分, 比如data-index='1' 

使用方式:
在标签内部加上自定义 *data-属性名 = '属性值'*
<div id="test" data-src='links/1.jpg'></div>



<br>

### <font color="#C2185">读取data-属性值</font>

<br>

### <font color="#C2185">节点.getAttribute('data-src');</font>
```js
let box = document.querySelector('#test');
let result = box.getAttribute('data-src');
console.log(result);
```


<br>

### <font color="#C2185">设置data-属性值</font>

<br>

### <font color="#C2185">节点.setAttribute('data-src', 'value')</font>
```js
let box = document.querySelector('#test');
box.setAttribute('data-src', 'haha');
console.log(box);
```

<br>


<br>

### <font color="#C2185">使用 dataset Api获取data-属性</font>
data-前缀属性 可以在js中通过dataset取值更加方便


<br>

### <font color="#C2185">读取</font>

<br>

### <font color="#C2185">节点.dataset.属性名</font>


<br>

### <font color="#C2185">赋值</font>

<br>

### <font color="#C2185">节点.dataset.属性名 = '属性值'</font>

\\ 驼峰式属性名 会被转换为 xxx-xxx的形式
```js
box.dataset.otherName = 'otherValue'
console.log(box);   // data-other-name="otherValue"
```



<br>

### <font color="#C2185">删除</font>
设置成null 或者 delete


<br>

### <font color="#C2185">dom对象.dataset.属性名 = null;</font>

<br>

### <font color="#C2185">delete dom对象.dataset.属性名;</font>



<br>

### <font color="#C2185">jQ方法</font>
```js
let obj = $('obj');
console.log(obj.data('属性名'));
```

<br>

# 改变元素节点的内容


<br>

### <font color="#C2185">元素对象.innerHTML</font>
起始位置到终止位置的全部内容, 包括html标签 同时保留空格和换行



<br>

### <font color="#C2185">元素对象.innerText</font>
起始位置到终止位置的内容, 但它取出html标签, 同时空格和换行也会去掉



<br>

### <font color="#C2185">区别</font>
innerText 不识别html标签, 写在里面的标签会会直接显示, 非标准
innerHTML 识别标签, w3c推荐

这两个属性是可读写的
``` 
div.innerText = getDate();
getDate()是我们封装的获取时间的函数, 里面return返回的是格式化好的日期
```

<br>

# 三种创建元素的区别
document.write()
element.innerHTML
document.createElement()


<br>

### <font color="#C2185">document.write()</font>
这种方法是直接将内容写入页面的内容流, 但是文档流执行完毕 则它会导致页面的全部重绘
```js
document.write("<div>haha</div>")
```



<br>

### <font color="#C2185">重绘</font>
文本流执行完毕 就是代码从上到下走了一遍, 重绘相当于创建了一个新页面 新页面里只有div
```js
// 我们会经常 点击一个按钮后创建一个元素 如果使用这个方式会创建一个新页面
btn.onclick = function() {
  document.write('<div>123</div>')
}
```


<br>

### <font color="#C2185">element.innerHTML</font>
这种方式是将内容写入某个dom节点 不会导致全部重绘
单个标签的话 innerHTML和createElement 性能没有太大的区别 当特别多的时候 这种方式很慢, 但结合数组的形式会快很多
```js
元素对象.innerHTML = `<a>百度</a>`
```

结合数组的方式, 性能会更好
```js
let arr = [];
for(let i=0; i<100; i++){
  arr.push('<a>百度</a>');
}
元素对象.innerHTML = arr.join('');
```


<br>

### <font color="#C2185">document.createElement()</font>
创建多个元素的效率稍微低一点点, 没有innerHTML数组性能好 但是结构更清晰
```js
let a = document.createElement('a');
元素对象.appendClild(a);
```

<br>

# 表单元素的属性操作
利用DOM可以操作如下表单元素的属性
type value checked selected disabled

如果想要某个表单被禁用, 不能再点击 disabled 

``` 
let input = 
input.value = 
```

<br>

# 设置 样式属性操作
我们可以通过js修改元素的大小, 颜色, 位置等样式


<br>

### <font color="#C2185">元素对象.style</font>
通过style样式操作, 产生的是行内样式, css权重比较高
如果样式比较少 功能比较少的时候 可以用这个



<br>

### <font color="#C2185">元素对象.className</font>
当样式比较多的时候, 功能复杂的时候 我们可以使用className这个方法
会覆盖原先的类名 为了避免覆盖 可以使用 += 
先定义一个类

``` 
this.className = '原先的类名 类名'
```



<br>

### <font color="#C2185">DOM classList属性</font>
该属性用于在元素中 添加 移除 及 切换 CSS 类. *该系列方法是对class的操作*
*ie10以上才支持 使用于移动端*


<br>

### <font color="#C2185">只读</font>

<br>

### <font color="#C2185">元素对象.classList</font>
返回的是列表 伪数组的形式 可以通过索引号来获取


<br>

### <font color="#C2185">添加</font>

<br>

### <font color="#C2185">元素对象.classList.add('类名')</font>
在元素中添加一个或多个类名.如果指定的类名已存在则不会添加


<br>

### <font color="#C2185">删除</font>

<br>

### <font color="#C2185">元素对象.classList.remove('类名')</font>
移除元素中一个或多个类名.注意:  移除不存在的类名不会报错.
可以删除指定类名


<br>

### <font color="#C2185">切换</font>

<br>

### <font color="#C2185">元素对象.classList.toggle("类名", [true|false])</font>
在元素中切换类名.
参数:
- 1. 要在元素中移除的类名并返回 false.如果该类名不存在则会在元素中添加类名并返回 true.
- 2. true | false 可选参数是否强制添加或移除类不管该类名是否存在.


<br>

### <font color="#C2185">判断</font>

<br>

### <font color="#C2185">元素对象.classList.contains()</font>
判断是否有这个类

<br>

# 获取 修改 对象的样式     


<br>

### <font color="#C2185">修改 样式 --- (内联样式)</font>
在js中 样式名 采用驼峰命名法

语法:
元素.style.样式名 = 样式值

<br>


<br>

### <font color="#C2185">读取 样式 --- (内联样式)</font>
通过style属性设置和读取都是内联样式 *无法读取样式表中的样式*
语法:
元素.style.样式名

通过style属性设置的样式都是内联样式 而内联样式有较高的优先级, 所以通过js修改的样式往往会立即显示, 但是如果在样式中写了!important则此时样式会有最高的优先级即使通过js也不能覆盖该样式, 此时将会导致js修改样式失效*所以尽量不要为样式添加!important*

<br>


<br>

### <font color="#C2185">元素对象.currentStyle.样式名      (只有IE支持)</font>
读取当前元素显示的样式:
它可以用来读取当前元素正在显示的样式如果当前元素没有设置样式则获取它的默认值
currentStyle只有ie浏览器支持其他浏览器都不支持



<br>

### <font color="#C2185">getComputedStyle(元素对象, null)    直接使用      带单位的</font>
在其他浏览器中可以使用
这个方法是window的方法*可以直接使用*支持ie9以上的浏览器

参数:
1. 要获取样式的元素
2. 可以传递一个伪元素 一般不用 一般传null
比如我们可以获取 before after 的属性值

```js
let div = document.querySelector(".test")
let target = getComputedStyle(div, "after")

console.log(target.getPropertyValue("top"))
// getPropertyValue方法用于获取css中给定属性的属性值
```

返回值:
对象, 对象中封装了当前元素对应的样式

可以通过:  *对象.样式名*  来读取样式
```js
var obj = getComputedStyle(获取样式的元素, null);
obj.width;

// 或者

getComputedStyle(获取样式的元素, null).width;
```

**注意:**
1. 如果获取的样式没有设置则会获取到*真实的值*而不是默认值
2. 没有设置width它不会获取auto而是一个长度

3. 但是该方法不支持ie8 以及以下浏览器 如果想兼容ie8 就的用
``` 
box1.currentStyle.backgroundColor;
```

通过currentStyle 和 getComputedStyle()读取的样式都是只读的不能修改如果要修改必须通过style属性

<br>


<br>

### <font color="#C2185">补充</font>

<br>

### <font color="#C2185">节点.getPropertyValue("top")</font>
用于获取css中给定属性的属性值

<br>


<br>

### <font color="#C2185">自定义 获取样式函数 </font>
```js
*  参数:
*  obj 要获取样式的元素
*  name 要获取的样式名
* 
function getStyle(obj, name){

// 先判断
if(window.getComputedStyle){

  // 将指定的属性返回
  return getComputedStyle(obj, null)[name];

// 兼容ie
}else{
  return obj.currentStyle[name];
}
};
```
这是第一次处理兼容性的问题思路都是一样的如果有就用... 没有就用...



<br>

### <font color="#C2185">复制用</font>
```js
function getStyle(obj, name){
if(window.getComputedStyle){
  return getComputedStyle(obj, null)[name];
}else{
  return obj.currentStyle[name];
}
};
```

<br>

# 事件


<br>

### <font color="#C2185">基础</font>
js使我们有能力创建动态页面, 而事件是可以被js侦测到的行为
简单的理解: 触发 --- 响应 的机制

事件是有三部分组成的 事件源 事件类型 事件处理程序 这就是事件三要素

事件源:   事件被触发的对象
事件类型: 如果触发 什么时间
处理程序: 通过一个函数赋值的方式完成



<br>

### <font color="#C2185">注册事件</font>
注册事件有两种方式: 传统方式 和 方法监听注册方式



<br>

### <font color="#C2185">传统注册方式</font>
利用 on 开头的事件 如:  onclick
这种方式的注册事件 具有 唯一性

传统注册方式的特点:
同一个元素同一个事件只能设置一个处理函数, 最后注册的处理函数将会覆盖前面注册的处理函数

<br>


<br>

### <font color="#C2185">addEventListener 方法监听注册方式</font>
w3c推荐的方式


<br>

### <font color="#C2185">元素对象.addEventListener() 移动端开发使用比较多</font>
ie9之前不支持此方法, 可使用 attachEvent() 代替

参数:
type:
事件类型字符串, 比如click mousever 不要 on

listener:
事件处理函数, 事件发生时, 会调用该监听函数

useCapture:
可选参数 默认false

同一个元素 同一个事件可以添加多个监听器 依次触发

```js
let div
div.addEventListener('click', fn)
div.addEventListener('mouseover', fn)
div.addEventListener('mouseout', fn)
```



<br>

### <font color="#C2185">事件的解绑 解绑方式</font>

<br>

### <font color="#C2185">传统方式</font>

eventTarget.onclick = null

在回调函数内部解绑
```js
btn.onclick = function() {
  alert(1);
  btn.onclick = null
}
```



<br>

### <font color="#C2185">addEventListener 解绑方式</font>

<br>

### <font color="#C2185">元素对象.removeEventListener()   解绑事件</font>


<br>

### <font color="#C2185">1. 把 回调函数 提取出来</font>
```js
document.body.addEventListener('mousemove', default, false);
document.body.removeEventListener('mousemove', default, false);

function default(){  };

// 另一种写法
btn.addEventListener('click', fn);

function fn() {
  alert(2);
  btn.removeEventListener('click', fn)
}
```


<br>

### <font color="#C2185">元素对象.attachEvent()</font>

<br>

### <font color="#C2185">元素对象.detachEvent(eventName, callback)</font>
解绑的写法跟addEventListener一样

<br>


<br>

### <font color="#C2185">addEventListener 取消默认行为</font>
利用 event 事件对象来完成


<br>

### <font color="#C2185">event.preventDefault()</font>
使用addEventListener()绑定的事件 取消默认行为时不能用return false而是使用event.preventDefault()
```js
document.body.addEventListener('mousemove', function (event) {
  event.preventDefault();
},false);
```



<br>

### <font color="#C2185">attachEvent() ie9以下 绑定多个事件的方式</font>

<br>

### <font color="#C2185">元素对象.attachEvent();</font>
在IE8中可以使用attachEvent()来绑定事件
MDN不推荐使用

参数
1. 事件的字符串要on
2. 回调函数

这个方法也可以同时为一个时间绑定多个处理函数 不同的是它是后绑定先执行执行顺序和addEventListener()相反

```js
btn01.attachEvent("onclick", function(){...});
```

<br>

**注意: attachEvent 中的this**
```js
btn01.addEventListener("click", function(){
  alert(this);
},false);                  //btn01

// attachEvent() 是window
btn01.attachEvent("onclick", function(){
  alert(this)
});                        //window
```

addEventListener()中的this是绑定事件的对象
attachEvent()中的this是window



<br>

### <font color="#C2185">自定义函数 绑定事件 兼容ie9以下</font>

参数:
obj 要绑定事件的对象
eventStr 要绑定哪个事件(不要on)
callback 回调函数

```js
function bind(obj, eventStr, callback){ ... };
```

思路:
attachEvent 要on
addEventListener不要on

那传eventName的时候传不传on, 加上on容易还是去掉on容易 加上on容易吧, 所以这个地方我不要on 那么就有问题了 那ie8不就少个on么？ 所以在ie8那手动加一个 

判断obj里是否有addEventListener()这个方法 如有有的话就用它没有的话用另一个没必要去判断什么浏览器 


<br>

### <font color="#C2185">解决this问题</font>
返回来再看this的问题, ie8里是window
就意味着你在这里就不能用this了 因为不一样了 一个是btn01 一个是window 容易出问题 

我希望统一this 是btn 是被点击的对象 是obj, 我们想想this是谁 是不是由调用方式来决定的, ie8是window那么肯定底层是采用函数形式调用的

那既然是调用方式决定的 那我们只能去改函数的调用方式吧, 函数是谁调的呢？
可以这个函数是浏览器调用的 我们还控制不了, 要是能控制的话 怎么改 call()修改函数的this

callback.call(obj); 

现在callback是浏览器调用的我不让浏览器调我希望把调用回调函数的权利拿回来怎么拿回来

```js
function bind(obj, eventStr, callback){

if(obj.addEventListener){
  obj.addEventListener(eventStr,callback,false);
}else{
  // 没有解决 this 问题
  obj.attachEvent("on"+eventStr,callback);

  // 解决 this 问题
  obj.attachEvent("on"+eventStr,function(){
      callback.call(obj);
  });
}
};

bind(btn01, "click", function(){
alert("1");
});
```


```js
// 分别为三个div绑定 单击响应函数
var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");

bind(box1, "click", function(){
  alert("我是box1的响应函数");
});
bind(box2, "click", function(){
  alert("我是box2的响应函数");
});
bind(box3, "click", function(){
  alert("我是box3的响应函数");
});

// 自定义绑定事件
function bind(obj, eventStr, callback){
  if(obj.addEventListener){
      obj.addEventListener(eventStr,callback,false);
  }else{
      obj.attachEvent("on"+eventStr,function(){
      callback.call(obj);
  });
};
```

<br>

# 常用的事件

<br>

### <font color="#C2185">onfocus   获得焦点</font>

<br>

### <font color="#C2185">onblur    失去焦点</font>

<br>


<br>

### <font color="#C2185">onscroll</font>
该事件会在元素的滚动条滚动时触发

<br>


<br>

### <font color="#C2185">onmousemove</font>
该事件将会在鼠标在元素中移动时被触发

<br>


<br>

### <font color="#C2185">onmousedown</font>

<br>

### <font color="#C2185">onmouseup</font>

<br>


<br>

### <font color="#C2185">onmouseover</font>

<br>

### <font color="#C2185">onmouseout</font>
会冒泡

<br>


<br>

### <font color="#C2185">onmouseenter</font>

<br>

### <font color="#C2185">onmouseleave</font>
不会冒泡

<br>


<br>

### <font color="#C2185">contextmenu</font>
弹出右键菜单时触发该回调
给document绑定

主要控制应该何时显示上下文菜单, 主要用于程序员取消默认的上下文菜单
比如鼠标的右键菜单
```js
// 禁止鼠标右键菜单

document.addEventListener('contextmenu', function(e){
  e.preventDefault();
})
```

<br>


<br>

### <font color="#C2185">selectstart    </font>
这个事件会在选中文字后触发
点击也有效果
```js
// 禁止鼠标选中

document.addEventListener('selectstart', function(e){
  e.preventDefault();
})
```

<br>


<br>

### <font color="#C2185">input 常用的事件</font>

<br>

### <font color="#C2185">onchange      当状态被改变时会触发</font>

<br>

### <font color="#C2185">oninput       当input的value值发生变化时就会触发</font>
与onchange的区别是不用等到失去焦点就可以触发了


<br>

### <font color="#C2185">onselect      当input里的内容文本被选中后执行只要选择了就会触发不是全部选中</font>

<br>


<br>

### <font color="#C2185">常用的键盘事件</font>

<br>

### <font color="#C2185">onkeyup</font>
某个键盘按键被松开时触发


<br>

### <font color="#C2185">onkeydown</font>
某个键盘按键被按下时触发
对于onkeydown来说如果一直按着某个按键不松手则事件一直触发
``` 
当onkeydown连续触发时第一次和第二次之间会卡顿一下之后会连续触发非常快为了防止误操作的发生
```


<br>

### <font color="#C2185">onkeypress</font>
某个键盘按键被按下时触发, 但是它不识别功能键, 比如ctrl shift 箭头等
区分按下键的大小写

``` 
三个事件的执行顺序, keydown --- keypress --- keyup

keydown 和 keyup 不区分大小写
keypress 区分大小写
```

**注意:**
键盘事件一般都要绑定给一些可以获取到焦点的对象或者是document 文档对象 一般是表单项 或者 document 
比如鼠标插入了一个文本框 有光标在闪 这就叫做获取到了焦点在文本框再点下光标没了叫做失去焦点

<br>

# onmouseover 和 onmouseenter的区别
当鼠标移动到元素上时, 就会触发mouseenter事件


<br>

### <font color="#C2185">onmouseover 给父盒子绑定mouseover事件 经过父盒子会触发(正常), 经过父盒子里面的子盒子也会触发事件</font>

mouseover 鼠标经过自身盒子会触发, 经过子盒子还会触发
``` 
鼠标移动到子盒子上 得到鼠标经过, 但是没有事件 所以会往上冒泡
冒泡 是 沿着 dom树 子 往 父上冒
```

mouseenter 只会经过自身盒子触发


<br>

### <font color="#C2185">原因</font>
mouseenter mouseleave不会冒泡

<br>

# 滚轮事件

<br>

### <font color="#C2185">onmousewheel</font>
鼠标滚轮滚动事件会在滚轮滚动时触发
但火狐不支持该属性


<br>

### <font color="#C2185">DOMMouseScroll</font>
在火狐中需要使用 DOMMouseScroll 来绑定滚动事件
注意该事件 需要用addEventListener()函数来绑定



<br>

### <font color="#C2185">滚轮事件中的事件对象</font>

<br>

### <font color="#C2185">event.wheelDelta</font>
可以获取鼠标滚轮滚动的方向
向上 值为120
向下 值为-120     我们不看值的大小只看正负
但是火狐不支持

event.wheelDelta;
alert(event.wheelDelta);



<br>

### <font color="#C2185">event.detail      火狐 特殊</font>
在火狐中 可以获取鼠标滚轮滚动的方向
向上 值为-3
向下 值为3

event.detail;

```js    
document.addEventListener("mousewheel", wheel)
function wheel(e) {
let flag;

if(e.wheelDelta < 0 || e.detail > 0) {
  flag = "down"
} else {
  flag = "up"
}

switch(flag) {
  case "up":
    console.log("我往上滚啦")
    break
  case "down":
    console.log("我往下滚啦")
    break
}
}
```

<br>

# 滚动窗口至文档中的特定位置


<br>

### <font color="#C2185">window.scroll(x, y);</font>
可以让窗口的滚动到指定位置
不用加单位 直接写数字即可

window.scroll(0, 100)

<br>

# 排他思想
如果有同一组元素, 我们想要某一个元素实现某种样式, 需要用到循环的排他思想算法
把所有的去掉要用for循环去 而不是直接写btns[i]
排他其他人, 设置自己的样式
```js 
for(let i=0; i<btns.length; i++) {
  btns[i].onclick = function() {
      // 排他
      for(let i=0; i<btns.length; i++){
          btns[i].style.backgroundColor = '';
      }

      // 设置自己的样式
      this.style.backgroundColor = 'pink'
  }
}
```

<br>

# 案例 百度换肤
这个案例联系的是给一组元素注册事件
给4个小图片利用循环注册点击事件
当我们点击了这个图片, 让我们页面背景改为当前图片
核心算法 把当前图片的src路径取过来 给body做为背景

```js
document.body.style.backgroundImage = 'url('+this.src+')'
```

<br>

# 案例 表单全选取消全选

<br>

### <font color="#C2185">全选和取消全选</font>
让下面的所有复选框的checked属性 跟随 全选按钮即可

1. 给全选按钮绑定事件
2. 将所有的复选框的checked属性值 跟 全选按钮的checked属性值一致
```js
j_tbs[i].checked = this.checked
```


<br>

### <font color="#C2185">复选框全部选中 全选才能选中</font>
思路:
给下面所有复选框绑定点击事件, 每次点击, 都要循环查看下面所有的复选框是否有没选中的, 如果有一个没选中的 上面全选就不选中

可以设置一个变量 来控制全选是否选中
```js
for(let i=0; i<j_tbs.length; i++) {

  // 给所有复选框绑定事件
  j_tbs[i].onclick = function() {

      // 声明一个变量 默认是选中状态
      let flag = ture;

      for(let i=0; i<j_tbs.length; i++) {

          // 一上来都是没选中的 所以取反
          if(!j_tbs[i].checked) {         
              flag = flase;
              break;
          }
      }

      // 检查完毕后
      j_cbAll.checked = flag;
  }
}
```

方式2:
```html
<div>
全选按钮<input type="checkbox" id="all">
</div>
<div>
<ul>
<li><input type="checkbox" value="xuegao">雪糕</li>
<li><input type="checkbox" value="binqilin">冰淇淋</li>
<li><input type="checkbox" value="binggao">冰糕</li>
</ul>
</div>

<script>
let ul = document.querySelector("ul")
let checkbox = document.querySelectorAll("[type='checkbox']")
let all = document.querySelector("#all")

let total = ul.querySelectorAll("[type='checkbox']")

checkbox.forEach(el => {
el.addEventListener("click", function() {
let checkeds = ul.querySelectorAll(":checked")
all.checked = checkeds.length == total.length
})
})
</script>
```

<br>

# 案例: 分时显示不同图片, 显示不同的问候语
根据不同时间, 页面显示不同图片, 同时显示不同的问候语

需求:
如果上午打开页面, 显示上午好, 显示上午的图片
如果下午打开页面, 显示下午好, 显示下午的图片
...

分析:
根据系统不同时间判断, 所以需要用到日期内置对象
利用多分支语句设置不同的图片

需要一个图片, 并且根据时间修改图片 操作元素的src属性
需要一个div元素 显示不同的问候语, 修改元素内容即可

```js
let date = new Date();
let h = date.getHours();

if(h<12) {
  img.src = 
  div.innerHTML = 

}else if (h < 18) {
  img.src = 
  div.innerHTML = 
}
```

<br>

# 点击切换图片练习
```html

<body>
<p id="info">一共 5 张图片当前第 1 张</p>
<div id="outer">
  <img src="./links/1.jpg" alt="">
  <button id="prev">上一张</button>
  <button id="next">下一张</button>
</div>
</body> 

<script>
window.onload = function(){
// 获取 按钮
var prev = document.getElementById("prev");
var next = document.getElementById("next");

// 保存 图片路径
var imgArr = [
  "links/1.jpg",
  "links/2.jpg",
  "links/3.jpg",
  "links/4.jpg",
  "links/5.jpg"
];

// 保存当前正在显示的图片的索引, 因为默认显示的是第一个
var index = 0;

// 获取 img 标签
var img = document.getElementsByTagName("img");

// 使用上面的方式获取 img 的话 需要添加[0]
var img = document.getElementsByTagName("img")[0];
      
prev.onclick = function(){
  // 点击 上一张按钮的时候 index--
  index--;

  // 边界判断
  if(index < 0){
      index = 0;
  };

  // 根据index设置 img src 属性
  img.src = imgArr[index];
};

next.onclick = function(){
  // 切换到下一张 是index自增
  index++;

  // 边界判断
  if(index > imgArr.length-1){
      index = imgArr.length-1;
  };
  
  img.src = imgArr[index];
};

}
<script>
```

<br>

# 循环中 事件回调 [i] 的问题
```js 
var delbtn = document.getElementsByTagName("a");
for(var i=0; i<delbtn.length; i++){
  delbtn[i].onclick = delA;
}
```

delbtn[i] 是undifined 为什么？


<br>

### <font color="#C2185">解答</font>
因为for循环会在页面加载完成之后立即执行而响应函数是在超链接点击时被执行
for循环先执行响应函数后执行, 当响应函数执行时for循环早已执行完毕

for循环是从0开始的 ++ 变成1 再++变成2 再++变成3 3是不是小于allA.length的长度了, 所以不执行了, 也就是说当for循环停止时 i是3, 所以响应函数能看到的i是3 

<br>

# DOM事件流
事件流 描述的是从页面中接受事件的顺序

事件发生时会在元素节点之间按照特定的顺序传播, 这个传播的过程就是DOM事件流

事件传播的过程
DOM事件流分为3个阶段

**注意:**
js代码中只能执行捕获或者冒泡其中的一个阶段

捕获阶段
目标阶段
冒泡阶段

onclick(传统事件) 和 attachEvent 只能得到冒泡阶段



<br>

### <font color="#C2185">事件的传播</font>
关于事件的传播 网景公司和微软公司有不同的理解


<br>

### <font color="#C2185">微软公司</font>
事件应该是由内向外传播 也就是当事件触发时应该先触发当前元素上的事件然后再向当前元素的祖先元素上传播  --- 事件的冒泡


<br>

### <font color="#C2185">网景公司</font>
时间应该是由外向内传播也就是当事件触发时, 应该先触发当前元素的最外层的祖先元素的事件然后再向内传播给后代元素  --- 捕获阶段


<br>

### <font color="#C2185">w3c</font>
综合了两个公司的方案将事件的传播分成了三个阶段

>> 第一阶段:  事件的捕获阶段
在捕获阶段时从最外层的祖先元素从window向目标元素进行事件的捕获 但是默认此时不会触发事件

>> 第二阶段: 目标阶段
事件捕获到目标捕获结束后开始在目标元素上执行事件 或者说 是触发事件    中间阶段执行 冒泡往上走

>> 第三阶段: 冒泡阶段
事件从目标元素向他的祖先元素传递依次触发祖先元素上的事件

假如我希望在*捕获阶段就开始执行* 可以将addEventListener()的第三个参数设置为true
一般情况下我们不会希望在捕获阶段触发事件 很少传true

**ie8 以及浏览器 没有捕获阶段**

<br>

# 事件的冒泡
所谓的冒泡指的就是事件的向上传导当后代元素上的事件被触发时其祖先元素的相同事件也会被触发

在开发中大部分情况都是非常有用的 如果不希望事件的冒泡 可以通过事件对象来取消冒泡


<br>

### <font color="#C2185">取消冒泡 event.cancelBubble = true;</font>
可以将事件对象的cancelBubble设置为true即可取消冒泡;

event.cancelBubble = true;

要取消冒泡 就要在对应的响应函数里 先传递一个形参event
```js
// 兼容性要event = event || window.event;
window.onload = function(){

// 为s1绑定点击响应函数
var s1 = document.getElementById("s1");

s1.onclick = function(){
  alert("我是s1的单击响应函数");
};

// 为box1绑定点击响应函数
var nox1 = document.getElementById("box1");
box1.onclick = function(){
  alert("我是div的单击响应函数");
};

// 为body绑定点击响应函数
document.body.onclick=function(){
  alert("我是body的单击响应函数");
};
};
```

我现在给div span body都绑定了点击响应函数那它们三个是什么关系 祖先 后代吧
我现在点击span文字上发现分别出现了
我是s1的单击响应函数
我是div的单击响应函数
我是body的单击响应函数

这种情况就叫做事件的冒泡

<br>

# 事件委派 ---- 冒泡的应用
指将事件统一绑定给元素的共同的祖先元素这样当后代元素上的事件触发时会一直冒泡到祖先元素, 从而通过祖先元素的响应函数 来 处理事件

事件的委派是利用了冒泡 通过委派可以减少事件绑定的次数提高程序的性能 

解析:
我点击的是li, 但这个点击这个操作会冒泡到ul上, 档ul上有点击事件的时候就会触发



<br>

### <font color="#C2185">event.target</font>
返回触发此事件的元素(事件的目标节点)


<br>

### <font color="#C2185">要点</font>
利用 event.target 来判断 点击 目标节点的时候 才触发对应的是回调
```js
// 方式1: className
if(event.target.className=="link"){
  alert("看看效果");
}
```

解析案例:
```js
window.onload=function(){

// 点击按钮以后添加超链接 先获取按钮并为按钮绑定点击响应函数
var btn01 = document.getElementById("btn01");
var u1 = document.getELemengtById("u1");

// 给按钮绑定事件
btn01.onclick = function(){

  // 创建一个li
  var li = document.createElement("li");
  // 设置 li 里面的内容 新加进去的超链接 没有点击响应函数 
  li.innerHTML = "<a href='javascript:;' class='link'>新建的超链接<a>"

  // 将li添加到ul中需要先在外面获取到一个ul
  u1.appendChild(li);      
};

/*
为每一个超链接都绑定点击响应函数
思考:
这里我们为每一个超链接都绑定了单击响应函数这种操作比较麻烦 而且这些操作 只能为已有的超链接设置事件而新添加的超链接必须重新绑定 麻烦 而且 性能不好

我们希望只绑定一次事件 即可应用到所有的元素 多个元素上即使元素时候添加的我们可以尝试将其绑定给共同的祖先元素

那超链接共同的祖先元素是谁？ 不是li a各有各的li 应该是ul吧  

推荐使用:
为ul绑定单击响应函数
*/

/*
思考:
如果我们给父元素绑定事件 那么点击ul的区域都会触发回调
如果触发事件的对象是期望的元素 就执行 否则不执行

要判断
那要先干什么得知道事件是由谁触发的吧
那this行不行以前说过 事件给谁绑定的this就是谁, 所以绑定给ul this只能是ul 没办法通过this去判断触发的是谁

事件对象知道
event.target
  - 返回触发此事件的元素(事件的目标节点)
  - event中的target表示触发事件的对象
*/

// 给 他们的父元素绑定事件  -- 事件委派
u1.onclick = function(event){

  // 考虑 兼容性
  event = event || window.event;

  // 如果触发事件的对象是期望的元素 就执行 否则不执行
  if(event.target.className=="link"){
      alert("看看效果");
  }
}
}
```

<br>

# 事件对象
当事件的响应函数被触发时浏览器每次都会将一个事件对象作为实参传递进响应函数 event

event就是一个事件对象, 写到我们监听函数的小括号里面 当形参来看

事件对象 
只有有了事件才会存在
事件对象 
是我们事件的一系列相关数据的集合

在事件对象中封装了当前事件相关的一切信息
比如: 鼠标的坐标键盘哪个案件被按下鼠标滚轮滚动的方向

事件的响应函数都是被浏览器调用的
所以以后想知道事件的相关信息或者对事件进行相关的操作 都找event DOM事件
事件对象也有兼容性问题, ie 678 通过window.event


<br>

### <font color="#C2185">使用事件对象时, e = e || window.event</font>

<br>

# 事件对象的属性 和 方法


<br>

### <font color="#C2185">event.target的兼容性处理</font>
```js
event = event || window.event
let target = event.target || event.SRCElement;
```


<br>

### <font color="#C2185">阻止事件冒泡的兼容性处理</font>
```js
if(event && event.stopPropagation) {
  event.stopPropagation();
} else {
  window.event.cancleBubble = true;
}
```


<br>

### <font color="#C2185">event.target</font>
返回触发事件的对象            标准


<br>

### <font color="#C2185">event.srcElement</font>
返回触发事件的对象            非标准 ie678使用


<br>

### <font color="#C2185">event.type</font>
返回事件的类型, 比如click 不带on


<br>

### <font color="#C2185">event.stopPropagation()</font>
阻止冒泡                      标准
有兼容性的问题 ie678要使用cancleBubble
``` 
event.stopPropagation();
event.cancleBubble = true;
```


<br>

### <font color="#C2185">event.cancelBubble</font>
该属性阻止冒泡                非标准 ie678使用


<br>

### <font color="#C2185">event.preventDefault()</font>
该方法阻止事件(默认行为)      标准 比如 不让链接跳转


<br>

### <font color="#C2185">event.returnValue</font>
该属性阻止默认事件(默认行为)  非标准 ie678使用 比如 不让链接跳转

<br>

# 鼠标事件对象

<br>

### <font color="#C2185">event.clientX     不包括滚动区域</font>

<br>

### <font color="#C2185">event.clientY</font>
可以获取 鼠标在 *可见窗口内的* 水平 和 垂直 坐标
它不管页面拖不拖动(滚动条) 就是相对于 可见窗口 的坐标

<br>


<br>

### <font color="#C2185">event.pageX       包括滚动区域</font>

<br>

### <font color="#C2185">event.pageY</font>
可以获取鼠标相对于 当前文档页面的 坐标 *包括滚动区域*
但是这两个属性在ie8中不支持所以如果需要兼容ie678 则不要使用

比如:
可视窗口就是 height: 500px 但文档 height: 2000px 
pageY: 就能获取到 700的坐标

<br>


<br>

### <font color="#C2185">event.screenX</font>

<br>

### <font color="#C2185">event.screenY</font>
返回鼠标相对于电脑屏幕的X坐标
返回鼠标相对于电脑屏幕的Y坐标

<br>

# 键盘事件对象

<br>

### <font color="#C2185">event.keyCode</font>
返回相应的键的ASCII值

注意:
我们的keyup和keydown事件不区分字母大小写 a 和 A得到的都是65


<br>

### <font color="#C2185">event.altKey</font>

<br>

### <font color="#C2185">event.ctrlKey</font>

<br>

### <font color="#C2185">event.shiftKey</font>
这三个用来判断alt ctrl shift是否被按下 
如果按下则返回true 
没有按下返回false

```js
document.onkeyup = function(event){
  event = event || window.event;
  
  // 判断一个y键是否按下
  if(event.KeyCode === 89){
      console.log("y被按下了");
  }

  // 判断y和ctrl是否同时被按下
  if(event.KeyCode ===89 && event.ctrlKey){
      console.log("ctrl+y被按下了");
  }
}
```

以下是给input绑定的
```js
var input = document.getElementsByTagName("input")[0];
input.onkeydown = function(){

  // 取消默认行为
  // 在文本框中输入内容属于onkeydown的默认行为
  // 如果使用return false取消默认行为 则输入的文本不会在文本框中
  return false; 
};
```


<br>

### <font color="#C2185">需求:  在文本框中不能输入数字</font>
思路:
先判断用户输入的是什么得问event吧, 我们先看看数字的编码是多少 48 - 57 

0 - 9 :      48 - 57
L T R X :    37 - 40
a - z :      65 - 90

```js
input.onkeydown = function(event) {
event = event || window.event;
  if(event.keyCode >=48 && event.keyCode <=57){
  return false; 
}
}
```

<br>

# this 和 event.target

<br>

### <font color="#C2185">this      </font>
返回的是绑定事件的对象

<br>

### <font color="#C2185">target    </font>
返回的是触发事件的对象  点击了哪个元素就返回哪个元素

比如:
| - div
  |  - span

我们给div绑定事件 this就是div
但是 target 
我点div的时候 target是div 
我点span的时候 target就是span
```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
<script>

let ul = document.querySelector('ul');
ul.addEventListener('click', function(evnet){

  // this 是 ul, 绑定事件的对象
  console.log(this)

  // target 是触发事件的对象 比如我点的是li
  console.log(event.target)
})
</script>
```


<br>

### <font color="#C2185">event.currentTarget</font>
事件绑定给谁 currentTarget就是谁 某种程度上和this一样

兼容性:
ie678不支持

<br>

# PC端的特有

# 元素偏移量 offset 系列
offset翻译过来就是偏移量 我们使用offset系列相关属性
1. 可以获取 目标元素的位置 大小等
2. 可以获取 目标元素距离带有定位父元素的位置
3. 可以获取 元素自身的大小(宽度 高度)

**注意返回的数值都不带单位**

<br>


<br>

### <font color="#C2185">offset系列常见的属性</font>

示例:
```html
<div id="all">
all
<div class="outer">
outer
<div class="inner">inner</div>
</div>
</div>
```


<br>

### <font color="#C2185">元素对象.offsetParent</font>
获取当前元素的定位父元素
会获取到当前元素最近的开启了定位的祖先元素 
如果所有的祖先元素都没有开启定位 则返回body



<br>

### <font color="#C2185">元素对象.offsetParent 和 元素对象.parentNode 的区别</font>
元素对象.parentNode
返回的是亲爸爸 不管父亲有没有定位

元素对象.offsetParent
返回的是带有定位的父亲 父级没有定位 就向上查找, 直到找到body

<br>


<br>

### <font color="#C2185">元素对象.offsetTop</font>
获取当前元素 相对于 其定位父元素 的 垂直偏移量

<br>

### <font color="#C2185">元素对象.offsetLeft</font>
获取当前元素 相对于 其定位父元素 的 水平偏移量

如果父元素都没有开启定位 则相对于body


<br>

**offsetLeft 搭配 translate()时候的注意点:**  
offsetLeft可以理解为获取的是 left 的值 比如 left: 200px 那么获取的就是200  
```css
el {
left: 300px;
}
```

但是我们的位置可能是由 ``transform: translate(-50%, -50%);`` 计算出来的
```css
el {
width: 200px;
left: 300px;
transform: translateX(-50%);
}
```

我们预期是 300px - 100px(元素的一半) 200px 但是实际上我们获取的还是 left: 300px 的值

<br>


<br>

### <font color="#C2185">元素对象.offsetWidth</font>

<br>

### <font color="#C2185">元素对象.offsetHeight</font>
获取元素 整个宽度和高度 包括 
内容区
内边距
边框
滚动条的位置

```js
console.log(e.target.offsetHeight)
// 内容区 + padding + border = 232 + 30x2 + 2x2 = 296
```

<br>

# 元素偏移量 client 系列
client翻译过来就是客户端的意思, 我们使用client系列的相关属性来*获取元素可视区的相关信息*, 通过client系列的相关属性可以动态的得到该元素的边框大小, 元素大小等


<br>

### <font color="#C2185">元素对象.clientWith</font>

<br>

### <font color="#C2185">元素对象.clientHeight  可见框的大小</font>
这两个属性 *获取见框的宽度和高度*

会获取元素的宽度和高度 包括:
内容区
内边距 
*不包括边框*
*不包括滚动条*

**注意:**
这些属性都是只读的 不能修改 改只有一种方式 就是用Style属性(以下通用)
如果有滚动条的话会刨除滚动条的位置注意是可见框的大小

<br>


<br>

### <font color="#C2185">元素对象.clientTop</font>
返回元素上边框的大小(border的高度)


<br>

### <font color="#C2185">元素对象.clientLeft</font>
返回元素左边框的大小(border的高度)
``` 上面的很少去用```

<br>

# offset 和 style 区别
这两种都能得到元素的大小等属性 区别是什么?


<br>

### <font color="#C2185">offset 角度</font>
offset可以得到任意样式表中的样式值
offset系列可以获得的数值是没有单位的
offsetWidth 包含padding border width
offsetWidth 等属性是只读属性 只能获取不能赋值
``` 
所以我们想要获取元素大小位置 用offset更合适 
```


<br>

### <font color="#C2185">style 角度</font>
style只能得到行内样式表中的样式值
style.width 获得的是带有单位的字符串
style.width 获得不包含padding 和 border的值
style.width 是可读可写属性, 可以获取也可以赋值
``` 
所以我们想要给元素更改值 则需要用style改变 
```

<br>

# 元素 scroll 系列
跟滚动条相关的


<br>

### <font color="#C2185">元素对象.scrollWidth</font>
元素的实际大小(包含超出部分), 获取滚动区域的宽度, 不含边框


<br>

### <font color="#C2185">元素对象.scrollHeight</font>
元素的实际大小(包含超出部分), 获取滚动区域的高度, 不含边框
```js
alert(box4.clientHeight);   //300 可见的高度
alert(box4.scrollHeight);   //600 可以获得整个滚动区域的高度
```
      

<br>

### <font color="#C2185">元素对象.scrollLeft</font>
可以获取水平滚动条*滚动的距离*, 被卷进去的左侧距离


<br>

### <font color="#C2185">元素对象.scrollTop</font>
可以获取垂直滚动条*滚动的距离*, 被卷进去的上侧距离
```js
alert(box4.clientHeight);       //283
alert(box4.scrollHeight);       //600

alert(box4.scrollTop);          //没往下滚动的时候是0

// 当垂直滚动条到底时
alert(box4.scrollHeight - box4.scrollTop)       //283
```


<br>

### <font color="#C2185">当满足 scrollHeight - scrollTop == clientHeight</font>
说明垂直滚动条 滚动到底了
滚动区的整体高度(元素的实际高度) - 滚动的距离 = 可见框高度


<br>

### <font color="#C2185">当满足scrollWidth - scrollLeft == clientWidth</font>
说明水平滚动条 滚动到底了

场景:
有的时候上网会要注册注册时候会有一堆的条款让你去读 下面有个√ 它要确保你阅读协议了 才让你注册 什么时候才能注册呢当滚动条滚动到底了 就视为你阅读完了 才让你注册

<br>

# window.pageYOffset 页面被卷进去的距离


<br>

### <font color="#C2185">window.pageYOffset / pageYOffset</font>

<br>

### <font color="#C2185">window.pageXOffset / pageXOffset</font>
这两个属性 可以获取 页面被卷去了多少

*设置*或返回当前页面相对于窗口显示区左上角的 X 位置.
*设置*或返回当前页面相对于窗口显示区左上角的 Y 位置.

页面被卷去的头部(scrollTop) 可以通过window.pageYOffset获得
页面被卷去的左侧 可以通过window.pageXOffset 获得

**注意:**
*元素的内容*被卷进去多少是 *ele.scrollTop*获取的, 比如是某个盒子被卷进去多少
如果是*页面*被卷进去多少则是 *window.pageYOffset*



<br>

### <font color="#C2185">兼容性注意</font>
页面被卷去的头部, 有兼容性问题, 因此被卷去的头部通常有如下的几种写法


1. 声明了DTD 使用 document.documentElement.scrollTop;
2. 未声明DTD 使用 document.body.scrollTop;

3. 新方法: window.pageYOffset / pageYOffset  ie9以上支持

<br>



<br>

### <font color="#C2185">自定义函数: 获取页面被卷进去的距离</font>
```js
function getScroll() {
  return {
      left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
  }
}

// 使用的时候
getScroll().left / top
```



<br>

### <font color="#C2185">扩展: DTD</font>
<!DOCTYPE html> 这个就是DTD 加上这个就可以使用 document.documentElement.scrollTop;



<br>

### <font color="#C2185">最高兼容性写法(网上)</font>
```js

// 判断是否支持 PageOffset (给 supportPageOffset赋值 true 或 false)
var supportPageOffset = window.pageXOffset !== undefined;

// 检测浏览器渲染属性是否标准模式 (isCSS1Compat赋值 true 或 false)
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

// 如果不支持PageOffset则要使用 scrollLeft; 
// scrollLeft 根据浏览器模式(标准模式、怪异模式)使用不同语法
  // 标准模式:  document.documentElement 语法
  // 怪异模式:  document.body 语法
var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;

var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

----

var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
```

<br>

# 对offset client scroll 系列的总结
它们都可以返回元素大小

offsetWidth  返回自身包括 padding border width 的宽度 返回值不带单位
clientWidth  返回自身包括 padding width  不包括border 返回值不带单位
scrollWidth  返回自身的实际宽度 padding 不包含边框 返回数值不带单位

它们主要用法
offset系列 主要用于获取元素的位置
client系列 主要获取元素的大小
scroll系列 主要获取滚动的距离


<br>

### <font color="#C2185">页面的滚动的距离是通过 window.pageXOffset 获取的</font>

<br>

# 淘宝 flexible.js 源码分析
```js
(function flexible(window, document){

})(window, document)
```

上面的函数是立即执行函数, 主要作用:创建一个独立的作用域
使用的立即执行函数的第二种书写方式:


<br>

### <font color="#C2185">优点</font>
这种方式的好处就是我们引入了flexible.js 再引入其它js文件不会产生 变量名冲突的情况, 都是局部变量

window, document 当实参传递进去, 这样立即执行函数就可以使用这两个参数了



<br>

### <font color="#C2185">要点</font>

<br>

### <font color="#C2185">window.devicePixelRatio 是物理像素比</font>
pc端 
输出的结果会是1

移动端
输出的结果会是2


<br>

### <font color="#C2185">var dpr = window.devicePixelRatio || 1</font>
检查当前浏览器有没有window.devicePixelRatio这个属性, 有的话就获取这个属性, 没有的话就设定为1

```js
(function flexible(window, document) {
// 获取的 html 的根元素
var docEl = document.documentElement

// dpr 物理像素比
var dpr = window.devicePixelRatio || 1


// 设置我们body 的字体大小
function setBodyFontSize() {

  // 如果页面中有body 这个元素 就设置body的字体大小
  if (document.body) {

      // 我的物理像素比是1 如果是pc端打开的就是 12 X 1
      // 如果是移动端打开的, 就是12 X 物理像素比了
      document.body.style.fontSize = (12 * dpr) + 'px'

  } else {
      // 如果没有body? 因为整个代码没有加载onload事件, 如果我的这个js文件是在head标签里引入的j 如果页面中没有body 这个元素则等着 我们页面主要的DOM元素加载完毕再去设置body的字体大小
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
  }
}

// 代码加载先执行这个函数
setBodyFontSize();


// set 1rem = viewWidth / 10    设置我们html 元素的文字大小
function setRemUnit() {
  var rem = docEl.clientWidth / 10
  docEl.style.fontSize = rem + 'px'
}

setRemUnit()

// 当我们页面尺寸大小发生变化的时候要重新设置下rem 的大小
window.addEventListener('resize', setRemUnit)

// pageshow 是我们重新加载页面触发的事件
window.addEventListener('pageshow', function(e) {
  // e.persisted 返回的是true 就是说如果这个页面是从缓存取过来的页面也需要从新计算一下rem 的大小
  if (e.persisted) {
      setRemUnit()
  }
})

// 有些移动端的浏览器不支持0.5像素的写法
if (dpr >= 2) {
  var fakeBody = document.createElement('body')
  var testElement = document.createElement('div')
  testElement.style.border = '.5px solid transparent'
  fakeBody.appendChild(testElement)
  docEl.appendChild(fakeBody)
  if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
  }
  docEl.removeChild(fakeBody)
}
}(window, document))
```


<br>

# 定时器
window对象给我们提供了2个非常好用的方法 - 定时器


<br>

### <font color="#C2185">setInterval(function() {}, 毫秒数, 数据1,  数据2)</font>
按照 指定的周期(以毫秒计)来调用函数或计算表达式 (每隔多少毫秒执行一次回调)
如果希望一段程序可以间隔一段时间执行一次可以使用定时调用, 可以将一个函数 每隔一段时间执行一次

参数:
1. 回调函数(该函数会每隔一段时间被调用一次)
2. 毫秒, 每次调用间隔的时间单位是毫秒 1000毫秒 = 1秒
3. 数据会在停止定时器的时候 传入到回调中


<br>

### <font color="#C2185">返回值</font>
定义器的标识符
Number类型的数据
开一个定时器 返回值是1 开两个就是2也就是一个页面可能开启N个定时器就是靠这些返回值来区分

```js
let num = 0
let timer = setInterval((...args) => {

// 当定时器停止的时候 会收到我们传递过来的参数
if(num == 5) {
console.log(args) // ['data1', 'data2']
clearInterval(timer)
}
console.log(num++)
}, 1000, "data1", "data2")
```



<br>

### <font color="#C2185">setTimeout(callback, ms, 数据1,  数据2)</font>
延迟定时器
用于设置一个定时器, 该定时器在指定毫秒之后执行回调



<br>

### <font color="#C2185">clearInterval(id)</font>
取消 由 setInterval() 设置的timeout
可以用来关闭一个定时器方法中需要一个定时器的标识作为参数


<br>

### <font color="#C2185">clearTimeout(id)</font>
取消 由 setTime() 设置的timeout    

<br>

# 动画函数

<br>

### <font color="#C2185">动画实现原理</font>
通过定时器 setInterval() 不断移动盒子的位置


<br>

### <font color="#C2185">实现步骤</font>
1. 获得盒子当前的位置
2. 让盒子在当前位置的基础上 再加一个移动距离
3. 然后利用定时器不断重复这个操作
4. 加一个结束定时器的条件
5. 注意此元素需要添加定位, 才能使用ele.style.left


<br>

### <font color="#C2185">简单的动画实现</font>
```js
let box = document.querySelector(".box")
let distance = 10

let timer = setInterval(() => {

// 每次计算新的left值
let x = box.offsetLeft
box.style.left = (x + distance) + "px" 

}, 1000)
```

<br>

# 动画函数的简单封装
自定义函数的参数:
1. 动画对象
2. 终点值

```js
function animate(obj, taret) {
  obj.timer = setInterval(function() {
      // 如果元素的left > 目标值 就停止动画
      if(obj.offsetLeft >= target) {
          clearInterval(obj.timer);
      }

      obj.style.left = obj.offsetLeft + 1 + 'px';
  }, 30)
}
```

<br>

# 缓动效果原理
缓动动画就是让元素运动速度有所变化, 最常见的是让速度慢慢停下来
让元素的运动速度 有一定的变化 比如我们停车前后会踩刹车


<br>

### <font color="#C2185">思路</font>
让盒子每次移动的距离慢慢变小, 速度就会慢慢的降下来


<br>

### <font color="#C2185">核心算法</font>
(目标值 - 现在的位置) / 10 作为每次移动的距离 (我们称之为步长)


<br>

### <font color="#C2185">obj.style.left = obj.offsetLeft + ((target - obj.offsetLeft) / 10) + 'px';</font>

注意:
步长值一定要写在定时器里面 这样才能不断的更新最新的位置

解析:
匀速运动:
盒子在0的位置, 目标位置为100, 每次步长为10  ---  这就是匀速运动

缓速运动:
(目标值 - 现在的位置) / 10

(100 -  0) / 10  = 10
(100 - 10) / 10  = 9
(100 - 19) / 10  = 8.1

定时器每次都会获取到现在的位置, 因为现在位置的值不断增加, 步长就会不断减少


2. 停止的条件:
让当前盒子位置等于目标位置就停止定时器

```js 
// 移动函数:
function animate(obj, taret) {
  obj.timer = setInterval(function() {

      // 步长值
      let step = (target - obj.offsetLeft) / 10;
      if(obj.offsetLeft >= target) {
          clearInterval(obj.timer);
      }
      obj.style.left = obj.offsetLeft + step + 'px';
  }, 30)
}

// 之所以是匀速运动就是因为
obj.style.left = obj.offsetLeft + 1 + 'px';

// 1的值是固定的, 我们把这个步长值改为一个慢慢变小的值
obj.style.left = obj.offsetLeft + step + 'px';
```



<br>

### <font color="#C2185">匀速动画</font>
盒子当前的位置 + 固定的值


<br>

### <font color="#C2185">缓动动画</font>
盒子当前的位置 + 变化的值(目标位置 - 现在位置) / 10
*变化在值 在定时器里面写*



<br>

### <font color="#C2185">当是正方向的时候</font>
对步长值取整 使用向上取整Math.ceil((target - obj.offsetLeft) / 10);
``` 假如是8.1 我们要让它是9 而不是8, 往前走 不要让它往后倒```


<br>

### <font color="#C2185">当是反方向的时候</font>
对步长值取整 使用向下取整Math.floor((target - obj.offsetLeft) / 10);
``` 假如是-8.1 我们要让它是-9 而不是-8, 往前走 不要让它往后倒```


<br>

### <font color="#C2185">而且这种写法不用判断speed是正还是负的问题</font>
如果是回退的话  (目标位置 - 现在位置) / 10    的计算结果会是 负数


<br>

### <font color="#C2185">因为考虑到两个条件(是正方向 还是反方向) 所以我们要判断</font>
step = step > 0 ? Math.ceil(step) : Math.floor(step);


<br>

### <font color="#C2185">整理后</font>
```js 
function animate(obj, target) {
  obj.timer = setInterval(function() {

      // 步长值
      let step = (target - obj.offsetLeft) / 10;
      // 避免停的不准的情况发生, 我们要对小数的步长值取整, 因为是两个方向的原因 我们要对两种情况来进行判断
      step = step > 0 ? Math.ceil(step) : Math.floor(step);

      if(obj.offsetLeft == target) {
          clearInterval(obj.timer);
      }
      obj.style.left = obj.offsetLeft + step + 'px';
  }, 15)
}
```

**注意:**
终止定时器的条件不要写成 >= 而是== 要不会出问题


# 缓动动画中添加 回调函数

<br>

### <font color="#C2185">回调函数</font>
上一件事件执行完毕后 才会调用回调函数


<br>

### <font color="#C2185">回调函数原理</font>
函数可以作为一个参数, 将这个函数作为参数传到另一个函数里面, 当那个函数执行完后, 再执行传进去的这个函数, 这个过程就叫做回调


<br>

### <font color="#C2185">需求: 当移动到800后变色, 这里就用到了回调函数</font>
```js 
// 就看这个函数: 如果添加回调函数

function animate(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
      let step = (target - obj.offsetLeft) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (obj.offsetLeft == target) {
          clearInterval(obj.timer);
          callback && callback();
      }
      obj.style.left = obj.offsetLeft + step + 'px';
  }, 15);
}

// 调用的时候
animate(div, 800, function(){ ... });


接下来是回调函数在哪去调用
>>> 定时器结果的位置调用 去找判断条件里

// 当进入这个条件, 代表前一个函数结束, 在这里调用
if(obj.offsetLeft == target) {
  clearInterval(obj.timer);
  callback && callback();
}
```

<br>

# 动画函数的封装
以后有经常要使用的函数, 可以封装到一个js文件中 然后用的时候引入这个js文件

1. 新建js文件
2. 粘贴代码


<br>

### <font color="#C2185">小案例</font>
需求: 鼠标经过div 里面滑动出去一条信息框
```html
``` html结构```
<div class='sliderbar'>
  <span>←</span>
  <div class='con'>问题反馈<>
</div>

<script>
  // 鼠标经过sliderbar con滑动到左侧

  - 当动画执行完毕后 ← 变为 →
  // 这时候就要用到回调函数了, 因为是动画执行完了 才改变 箭头的方向

  animate(con, -160, function(){
      // 当动画执行完毕后 ← 变为 →
      sliderbar.children[0].innerHTML = '→';
  })
</script>

```

<br>

# 类的操作

```html
<button id="btn01">点击按钮以后修改box的样式</button>
<br /><br />
<div id="box" class="b1 b2"></div>

<script>
window.onload = function(){
var box = document.getElementById("box");
var btn01 = document.getElementById("btn01");

btn01.onclick = function(){ }
}
</script>
```


<br>

### <font color="#C2185">style修改元素样式</font>
通过style属性来修改元素的样式
每修改一个样式浏览器就需要重新渲染一次页面
这样执行的性能是比较差的 而且这种形式当我们要修改多个样式时也不太方便
```js
box.style.width = "200px";
box.style.height = "200px";
box.style.backgroundColor = "yellow";
```

上面是js直接修改css样式吧 js是行为 css是表现 这么一改 行为和表现又耦合了 
我希望一行代码 可以同时修改多个样式, 这个box的样式都是通过b1的class设置的 

```css
.b2{
  height: 300px;
  background-color: yellow;
}
```
我创建一个class b2 假如我将box的class修改为b2, 样式是不是就变了
box.className = "b2";

我们可以通过修改元素的class属性来间接的修改样式 这样一来我们只需要修改一次即可同时修改多个样式 浏览器只需要重新渲染页面一次性能比较好 并且这种方式可以使表现和行为进一步的分离 

现在我不想修改width 我只想该height 和 background 这样一改 box宽度100%了 因为b1的样式去了 去了之后b1的样式都没了 但是有的时候 我不希望去掉b1 只希望加上b2 也就是在原有值的基础上增加b2 
```js
box.className += "b2";      //都没了 因为classname 变成"b1b2"了
box.className += " b2";     //b2的前面要加个空格 别忘了
```



<br>

### <font color="#C2185">自定义: 为元素添加 class </font>
参数:
1. 给谁加 obj 要添加class属性的元素
2. cn 要添加的class值 

```js
function addClass(obj, cn){
  obj.className += " " + cn;
};
```

有没有什么问题, 点一下 加进去了 class="b1 b2"
多点几下后class="b1 b2 b2 b2 b2 b2 b2 b2 b2 b2 b2", 有了一次b2后 就不要加了 有没有个方法能判断下 这个class里有没有b2 



<br>

### <font color="#C2185">自定义: 检查元素上是否已有 同名 class</font>
判断一个元素中是否含有指定的class属性值, 如果有该class则返回true没有则返回false
参数
1. obj 要判断的元素
2. cn class的名 换句话说就是判断obj中有没有cn

利用正则表达式:

```js
function hasClass(obj, cn){
var reg = new RegExp("\\b"+cn+"\\b");
return reg.test(obj.className);
};

// 或者这样
function checkClass(el, sn) {
return el.className.includes(sn)
}

function addClass(obj, cn) {
if(!hasClass(obj, cn)) {
  addClass(obj, cn);
};
}
```

还有什么问题？, 我觉得还需要一个删除一个类的功能, 删除元素中指定的class属性, 怎么删 把b2 替换成一个 空串, 是不是还得创建一个正则表达式 



<br>

### <font color="#C2185">自定义: 删除 class</font>
```js
function removeClass(obj , cn){
var reg = new RegExp("\\b"+cn+"\\b");
obj.className = obj.className.replace(reg , "");
}
```

toggleClass可以用来切换一个类, 如果元素中具有该类则删除, 如果元素中没有该类则添加



<br>

### <font color="#C2185">自定义: 切换class</font>
```js
function toggleClass(obj , cn){

if(hasClass(obj , cn)) {
  removeClass(obj , cn);
}else{
  addClass(obj , cn);
}
};
```

<br>--


# 移动端的事件


<br>

### <font color="#C2185">触屏事件概述</font>
移动端浏览器兼容性较好, 我们不需要考虑以前js的兼容性问题, 可以放心的使用原声js书写效果, 
但是移动端也有自己独特的地方, 比如 触屏事件 touch, (android 和 ios都有)

移动端没有鼠标的概念
touch对象代表一个触摸点, 触摸点可能是一根手指 也可能是一根触摸笔,
触屏事件可响应用户手指(或触控笔)对屏幕或者触控板操作



<br>

### <font color="#C2185">touchstart 事件</font>

<br>

### <font color="#C2185">div.addEventListener('touchstart', callback);</font>
相当于click事件


<br>

### <font color="#C2185">touchmove 事件</font>
相当于mousemove事件


<br>

### <font color="#C2185">touchend 事件</font>
相当于mouseup事件

<br>


<br>

### <font color="#C2185">触摸事件对象(TouchEvent)</font>
TouchEvent是一类描述手指在触摸平面(触摸屏, 触摸板等)的状态变化的时间, 这类事件用于描述一个或多个触点, 使开发者可以检测触点的移动 触点的增加 和 减少等 (比如手指移动了多少像素啊 有几个手指啊)

touchstart touchmove touchend *三个事件都会有各自的事件对象*

<br>


<br>

### <font color="#C2185">触摸事件列表: TouchEvent.touches</font>
正在触摸屏幕的所有手指的一个列表 能得到所有的触摸点(检测屏幕)
``` 
一个手指是0 length为1
如果监听的是DOM元素 touches 和 targetTouches是一样的
```


<br>

### <font color="#C2185">TouchEvent.targetTouches</font>
正在触摸当前DOM元素上的手指的一个列表(检测DOM元素)
``` 
有几个手指在触摸我的div
```


<br>

### <font color="#C2185">TouchEvent.changedTouches</font>
手指状态发生了改变的列表, 从无到有 从有到无
``` 
原来屏幕上没有手指 有了手指, 或者 有手指 然后离开了
```


<br>

### <font color="#C2185">要点</font>
当我们手指离开屏幕的时候, 就没有了touches 和 targetTouches 但是会有changedTouches
因为我们一般都是触摸元素, 所以最经常使用的是 targetTouches
因为是一个手指列表 当我们得到某个触点(手指)的话 可以event.targetTouches[0]
``` 
targetTouches[0] 就可以得到正在触摸dom元素的第一个手指的相关信息
比如:
  手指的坐标等等
      clientXY
      pageXY
      screenXY

  target:
      div 正在触摸div这个元素
```

<br>

# 案例 移动端拖动
touchstart touchmove touchend  可以实现拖动元素
但是拖动元素*需要当前手指的坐标值*, 我们可以使用 targetTouches[0]里面的pageX, pageY
移动端拖动的原理:
手指移动中, 计算出手指移动的距离, 然后用盒子原来的位置 + 手指移动的距离

- 手指移动的距离:
  没办法拿到手指的移动距离, 但是我们得到手机的当前坐标

- 手指移动的距离: 手指滑动中的位置 - 手指刚开始触摸的位置
``` 
比如第一次触摸div的时候位置是10px 然后手指移动到了30px的位置上 30-10 移动了20px的距离
```



<br>

### <font color="#C2185">拖动元素三部曲</font>
1. 触摸元素 touchstart: 获取手指初始坐标, 同时获得盒子原来的位置
2. 移动手指 touchmove:  计算手指的移动距离, 并且移动盒子
3. 离开手指 touchend

**注意:**
手指移动也会触发滚动屏幕所以这里我阻止默认的屏幕滚动 event.preventDefault();

```js
// 获取div
let div = document.querySelector('div');

// 全局定义 手指的初始坐标 (因为多个函数内部需要使用)
let startX = 0;
let startY = 0;

// 全局定义 元素盒子的初始位置
let x = 0;
let y = 0;

// 给盒子绑定 触摸开始的事件 -- 初始化赋值操作
div.addEventListener('touchstart', function(e){

// 给手指点击屏幕的初始位置赋值 获取手指点击屏幕上的初始位置 (用第一根就可以)
startX = e.targetTouches[0].pageX;
startY = e.targetTouches[0].pageY;

// 给盒子初始位置赋值
x = this.offsetLeft;
y = this.offsetTop;
})

// 给元素绑定 拖动时间
div.addEventListener('touchmove', function (e) {
// 计算手指的移动距离: 手指移动之后的坐标 - 手指初始的坐标
// 手指不断的移动就能得到最新的坐标e.targetTouches[0].pageX
let moveX = e.targetTouches[0].pageX - startX;
let moveY = e.targetTouches[0].pageY - startY;

// 移动盒子 盒子原来的位置 + 手指移动的距离
this.style.left = x + moveX + 'px';
this.style.top = y + moveY + 'px';

// 取消滚动屏幕的默认行为
e.preventDefault();
})
```

**注意: 松开手move就停止了不像pc端还要用到onmouseup**

<br>

# 案例 移动端的轮播图
要点:
移动端移动, 可以使用 translate 移动


<br>

### <font color="#C2185">无缝滚动的要点</font>
1. 设计 html 结构

- 正常 3 张图片
img1 img2 img3

↓

img3 *img1* img2 img3 img1

2. 在更改后的html结构中 我们要实现无缝滚动 就是要当自动播放到最后一张 img1 的时候, 
让起跳到 img1(红色) 的位置, 

这个步骤是利用 translate 来实现的 那就是说只要有过渡 就是有时间的消耗
```js
ul.style.transition = 'all .3s';
```
时间还没到, 过渡还没有走完 就开始判断是不合适的 所以我们判断条件是要等到图片滚动完毕再去判断, 就是过渡完成后判断
此时我们要使用 *transitionend事件*  检测过渡是否完成


<br>

### <font color="#C2185">transitionend事件</font>
检测过渡是否完成


<br>

### <font color="#C2185">实现</font>
移动端轮播图功能基本和pc端一致
1. 可以自动播放图片
2. 手指可以拖动播放轮播图


<br>

### <font color="#C2185">要点</font>
1. 用手在轮播图上可以左右拉动, 所以在html的结构里 3 1 2 3 1 在图片的前后分别要插入一张图片
```html 
<ul id='imgBox' class='test'>
  <li>
      <div class='item'>3</div>
  </li>
  <li>
      <div class='item'>1</div>
  </li>
  <li>
      <div class='item'>2</div>
  </li>
  <li>
      <div class='item'>3</div>
  </li>
  <li id='last-li'>
      <div class='item' id='last-item'>1</div>
  </li>
</ul>
```

2. ul的宽度
5张图片可以把ul的width设置为500%, 但是img的width如果设置为100%的话, 效果也会显示为500%, 所以我们手动给li也设置宽度为20%



<br>

### <font color="#C2185">案例分析</font>
1. 自动播放功能
2. 开启定时器
3. 移动端移动, 可以使用translate 移动
4. 想要图片优雅的移动, 请添加过渡效果



<br>

### <font color="#C2185">无缝滚动</font>
1. 我们判断条件是要等到图片滚动完毕再判断, 就是过度完成后判断
2. 此时需要添加检测过渡完成事件 transitionend
3. 判断条件: 如果索引号等于3 说明走到了最后一张图片, 此时索引号要复原为0  
4. 此时我们要给它去掉过渡效果, 
5. 如果索引号小于0 说明是倒着走, 索引号等于2
6. 此时图片, 去掉过渡效果, 然后移动


<br>

### <font color="#C2185">导航点的新做法</font>
小圆点跟随变化效果
把ol里面li带有current类名的选出来去掉类名remove
让当前索引号的小li添加current add
但是 也是要等着过渡结束之后变化, 所以这个写到transitionend事件里面


<br>

### <font color="#C2185">手指滑动轮播图</font>
本质就是ul跟随手指移动, 简单的说就是移动端拖动元素
``` 
// 复习下:
当手指触摸到这个元素, 拿到手指的初始坐标, 当手指移动的时候会拿到移动之后手指的坐标 让两个坐标相减就能得到手指的移动距离 然后盒子在原来的基础上加上移动的距离盒子就实现移动效果了 
```
触摸元素 touchatart:  获取手指的初始坐标
移动手指 touchmove:   计算手指的滑动距离 并且移动盒子


<br>

### <font color="#C2185">手指拖动图片时的吸附效果</font>
当拖动ul的程度小于某个值的时候 就会回到原来的图片
当拖动ul的程度大于某个值的时候 就会到目标图片

离开手指touchend      根据滑动的距离分不同的情况
如果移动距离小于50px 就回弹原来的位置
如果移动距离大于50px 就上一张下一张滑动

```js 
// 获取元素
let focus = document.querySelector('.focus');
let ul = focus.children[0];

// 获得focus的宽度
let w = focus.offsetWidth;

// 利用定时器自定轮播
let index = 0;
let timer = setInterval(function(){
  // 外面定义了一个index变量 让这个变量每次++, ul的移动距离就是index*图片的宽度
  index++;
  let translatex = -index * w;

  ul.style.transition = 'all .3s';
  ul.style.transform = `translateX(${translatex})`;
},1000)


/*
无缝滚动, 当到最后一张1的时候 快速掉到其实是第二张的1

无缝滚动的要点:
我们要实现无缝滚动 就要当自动播放到最后一张1的时候, 让它跳到其实是第二张的1, 但是我们的缓动效果是用过渡实现的, 只要有过渡 就是有时间的消耗 时间还没到, 过渡还没有走完 就开始判断是不合适的

所以我们判断条件是要等到图片滚动完毕再去判断, 就是过渡完成后判断
此时我们要使用 transitionend 事件 检测过渡是否完成
*/

// 我们检测ul 因为它做的过渡效果 和 移动
ul.addEventListener('transitionend', function(){
  /*
      走到最后一张再后退, 那怎么知道走到了最后一张呢?
      我们可以通过index判断, 页面一上来我们看到的第一张就是0
      3 1 2 3 1
      0 1 2 3 -- > 索引号
      所以当走到索引号为3的时候我们就跳到0
  */
  if(index >= 3) {
      index = 0;
      // 去掉过渡效果, 这样让我们的ul 快速的跳到目标位置
      ul.style.transition = 'none';
      // 重新计算 按照最新的index滚动, 用我们最新的index * 图片的宽度
      let translatex = -index * w;
      ul.style.transform = `translateX(${translatex})`;
  } else if(index < 0) {
      /*
      还有一种特殊情况, 如果处于第一张的时候 我们往右拉会出现倒着的情况
      3 1 2 3 1
      在1的时候往右拉 会到3
      1的索引号是0 要是倒着走的话 肯定是一个负数才对 -1
      如果索引号小于0 肯定是倒着走的, 当到3的时候 迅速的跳到右手倒数第二张(索引号是2的身上)
      */
      index = 2;
      ul.style.transition = 'none';
      let translatex = -index * w;
      ul.style.transform = `translateX(${translatex})`;

      // 导航点的部分
      // 以前的做法是利用for循环 先把active类去掉 再让当前的小li添加类

      // 把ol(导航点的容器)里面的li带有current类名的选出来, 去掉类名 remove
      ol.querySelector('.current').classList.remove('current');

      // 让当前索引号的小li 加上current add
      ol.children[index].classList.add('current');
  }
});

// 手指滑动轮播图
// 触摸元素 touchstart: 获取手指初始坐标
let startX = 0;
let moveX = 0;  // 后面要使用这个移动距离所以定义全局变量

ul.addEventListener('touchstart', function(e){
  startX = e.targetTouches[0].pageX;

  // 在手指拉动图片的时候是不需要轮播效果的
  clearInterval(timer)
})
// 移动手指 touchmove 计算手指的滑动距离 并且移动盒子
ul.addEventListener('touchmove', function(e){
  // 计算移动距离
  moveX = e.targetTouches[0].pageX - startX;
  // 移动盒子: 盒子原来的位置 + 手指移动的距离
  // -index*w 是ul的原来位置, 因为滚动到第几张就是index*w
  let translatex = -index*w + moveX;
  // 手指拖动的话 是一点点的拖 所以不需要做动画效果
  ul.style.transition = 'none';
  ul.style.transform = `translateX(${translatex})`;
})

// 手指离开, 根据移动距离去判断是回弹还是播放上下一张
// 不管回弹还是滑动过去都是等到手指离开的时候发生的
ul.addEventListener('touchend', function(e){
  // 如果移动距离大于50px 就播放上下一张
  // 因为moveX是手指移动的距离 是根据两次触摸点的不同差值求出来的 所以可能是一个负值 这里我们不管正还是负 只要是大于50就可以 所以取绝对值
  if(Math.abs(moveX) > 50) {
      // 播放上一张还是下一张呢? 手指右滑是上一张 因为moveX是正值 手指左滑是下一张 因为moveX是负值
      if(moveX > 0) {
          index--;
      } else {
          index++;
      }
      
      // 求最新的index的值
      let translatex = -index * w;
      ul.style.transition = 'all .3s';
      ul.style.transform = `translateX(${translatex})`;
  } else {
      // 如果拖动小于50px 那就回弹到当前的图片
      let translatex = -index * w;
      ul.style.transition = 'all .3s';
      ul.style.transform = `translateX(${translatex})`;
  }

  // 当手指离开的时候 我们再开启定时器
  // 但是开启之前我们要清除上一个定时器, 保证页面中只有一个定时器
  clearInterval(timer);

  // 重新开启定时器 把上面的代码复制一下
  timer = setInterval(function(){
      index++;
      let translatex = -index * w;
      ul.style.transition = 'all .3s';
      ul.style.transform = `translateX(${translatex})`;
  },1000)
})
```


<br>

### <font color="#C2185">有一种情况 当我们点击轮播上的时候 不想拖动, 所以就没必要计算里面的代码(moveX>50<50什么的)</font>
```js 
// 这么我们就在外面声明一个全局变量
let flag = false;

// 只有我们手指移动过了 我们才让它计算, 否则不用
// 我们声明一个全局变量 定为false, 在move逻辑里修改为true 意思是只有移动过了才用计算 否则不用
let flag = false;

let focus = document.querySelector('.focus');
let ul = focus.children[0];
let w = focus.offsetWidth;

let index = 0;
let timer = setInterval(function(){
  index++;
  let translatex = -index * w;
  ul.style.transition = 'all .3s';
  ul.style.transform = `translateX(${translatex})`;
},1000)


ul.addEventListener('transitionend', function(){

  if(index >= 3) {
      index = 0;
      ul.style.transition = 'none';
      let translatex = -index * w;
      ul.style.transform = `translateX(${translatex})`;
  } else if(index < 0) {
      index = 2;
      ul.style.transition = 'none';
      let translatex = -index * w;
      ul.style.transform = `translateX(${translatex})`;

      ol.querySelector('.current').classList.remove('current');
      ol.children[index].classList.add('current');
  }
});

let startX = 0;
let moveX = 0;

ul.addEventListener('touchstart', function(e){
  startX = e.targetTouches[0].pageX;
  clearInterval(timer)
})


ul.addEventListener('touchmove', function(e){
  moveX = e.targetTouches[0].pageX - startX;
  let translatex = -index*w + moveX;
  ul.style.transition = 'none';
  ul.style.transform = `translateX(${translatex})`;

  // 在这里修改为true 如果用户手指移动过我们再去判断否则不做判断效果
  flag = true;

  // 取消拖动手指会滚动屏幕的默认行为
  e.preventDefault(); 
})


ul.addEventListener('touchend', function(e){

  // 在这里根据flag来 进行 相应内容的进行, 如果flag是true 那就是代码移动过了 再进行下面的逻辑判断
  if(flag) {
      if(Math.abs(moveX) > 50) {
          if(moveX > 0) {
              index--;
          } else {
              index++;
          }
          
          let translatex = -index * w;
          ul.style.transition = 'all .3s';
          ul.style.transform = `translateX(${translatex})`;
      } else {
          let translatex = -index * w;
          ul.style.transition = 'all .3s';
          ul.style.transform = `translateX(${translatex})`;
      }
  }
  

  clearInterval(timer);

  timer = setInterval(function(){
      index++;
      let translatex = -index * w;
      ul.style.transition = 'all .3s';
      ul.style.transform = `translateX(${translatex})`;
  },1000)
})
```

<br>

# 案例 移动端的返回顶部
当页面滚动到某个地方 就显示 返回顶部的按钮 否则隐藏


<br>

### <font color="#C2185">案例分析 </font>
页面滚动到某个地方, 我们需要事件 scroll 页面滚动事件
只要屏幕滚动就会产生一个卷进去的头部, 虽然有兼容性的问题 但是我们是移动端所有没问题

点击 window.scroll(0,0) 返回顶部
``` 
比如到 div7的位置上 让返回按钮显示 卷进去的头部的的值 如果 > div的offsetTop
```

```js 
// 返回顶部模块的制作
let goBack = document.querySelector('.goBack');
let nav = document.querySelector('nav');

window.addEventListener('scroll', function(e){
  if(window.pageYoffset >= nav.offsetTop) {
      goBack.style.display = 'block';
  } else {
      goBack.style.display = 'none';
  }
})

goBack.addEventListener('click', function(e){
  window.scroll(0,0);
})
```

<br>

# 移动端 Click事件 延时解决方案
移动端 click 事件会有300ms的延时, 原因是移动端屏幕双击会缩放(double tap to zoom) 页面
它会看再300ms之内有没有点击两下, 如果没有就当做点击事件来处理
``` 
因为屏幕可以放大 双指拉动, 缩小的时候双击屏幕
```
那我就想点击一下马上执行 不要等300ms应该怎么办?


<br>

### <font color="#C2185">解决方式</font>
1. 禁用缩放, 浏览器禁用默认的双击缩放行为 并且去掉300ms的点击延迟
```html
<meta name='viewport' content='user-scalable=no'>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```

2. 如果有的页面要求有缩放的功能, 我们就不能添加刚才的内容, 我们利用touch事件自己封装这个事件解决300ms延迟的问题
- 原理:
- 当我们手指触摸屏幕, 就记录当前触摸的时间
- 当我们手指离开屏幕, 又会产生一个时间, 用离开的时间减去触摸的时间
- 如果时间小于150ms 并且没有滑动过屏幕 那么我们就定义为点击

```js 
// 封装tap 解决click 300ms 延迟
function tap(obj, callback) {

  // 不移动我们的手指永远是false
  let isMove = false;

  let startTime = 0;  //记录触摸时候的时间变量
  obj.addEventListener('touchstart', function(e) {

      // 记录触摸时间, 只要触摸元素就把这个时间记入下来
      startTime = Date.now();     
  })
  obj.addEventListener('touchmove', function(e) {
      isMove = true;     // 看看是否有滑动 有滑动算拖拽 不算点击
  })
  obj.addEventListener('touchend', function(e) {

      // 手指离开的时候也有一个时间Date.now()
      if(!isMove && (Date.now()-startTime) < 150) {
          // 如果手指触摸和离开时间小于150ms算点击
          callback && callback();   // 执行回调函数
      }
      isMove = false;
      startTime = 0;
  })
}

// 调用
tap(div, function() {  执行代码 ... })
```   


<br>

### <font color="#C2185">方法2 一次只能给一个元素解决这个问题 如果页面有100个元素 就得调用100次</font>


<br>

### <font color="#C2185">方法3</font>
为了解决方案2的弊端 我们可以使用插件 fastclick插件解决300ms延迟
GitHub官网: https://github.com/ftlabs/fastclick


<br>

### <font color="#C2185">使用方法</font>
引入js文件
把这个代码复制到页面中, 就ok了
``` 如果document有addEventListener的方法```
```js
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}
```

<br>

# 移动端常用的开发插件

<br>

### <font color="#C2185">Swiper</font>
https://www.swiper.com.cn

引入插件相关文件
按照规定语法使用


<br>

### <font color="#C2185">superslide</font>
http://www.superslide2.com
网站上常用的“焦点图/幻灯片”“Tab标签切换”“图片滚动”“无缝滚动”等只需要一个SuperSlide即可解决！


<br>

### <font color="#C2185">iscroll</font>
https://github.com/cubiq/iscroll



<br>

### <font color="#C2185">移动端视频插件 zy.media.js</font>
https://github.com/ireaderlab/zyMedia

h5给我们提供了video标签, 但是浏览器的支持情况不同
不同的视频格式文件, 我们可以通过source解决
但是外观样式, 还有暂停 播放 全屏等功能我们只能自己写代码解决, 这个时候我们可以使用插件方式来制作

<br>