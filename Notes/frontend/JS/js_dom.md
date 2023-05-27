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
