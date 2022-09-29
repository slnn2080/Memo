### pug部分

### pug语法
> 缩进
- pug的语法是靠缩进 指定标签
```pug 
  html
    head
      title Home

      //- 这里通过 /lib/bootstrap 路径 引入服务器端的文件
      link(rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css")
      script(src="/lib/bootstrap/js/bootstrap.js")

      style

  body
    div
      h3
```

- 标签内容 直接写在标签的后面
```pug 
  h3 内容
```

-------------------------

### 标签属性
- 标签属性 写在括号里面 括号中的值为js表达式
- 属性和属性之间可以使用 , 进行分割 也可以使用空格
```pug 
  div(class="box")

  var authenticated = true
  body(class=authenticated ? 'authed' : 'anon')

  a(class='button' href='baidu.com') 百度
  a(class='button', href='baidu.com') 百度
```

- 多行属性
- 如果有很多属性的话 可以分成几行写
```pug 
  input(
    type='checkbox'
    name='agreement'
    checked
  )
```

- 如果属性值为 特殊类型 使用‘’将起括起来
```pug 
  div(class='div-class', (click)='play()')
```


- 属性的嵌套 #{url}  --- 改成模版字符串 ${ }
- a(href="/#{url}") Link
```pug 
  这种语法 已经不再被支持！  我们应该使用字符串拼接变量的方式
  a(href='/' + url) 链接

  或者使用模版字符串
```


- 特殊符号的使用 !=
- 在默认情况下，所有的属性都经过转义 也就是说 < > 的部分
- div(escaped="<code>")  ---  &lt;code&gt;
- 但是有些情况 我们就想使用未经转移的 < > 那我们就要使用 != 链接属性名 和 属性值
```pug  
  div(unescaped!="<code>")
```

- 注意：
- 未经转义的缓存代码十分危险。您必须正确处理和过滤用户的输入来避免跨站脚本攻击。



> 布尔值
- pug中的布尔值需要指定
- input(type='checkbox' checked=true)  当没有指定布尔值的时候 默认就是true
```pug 
  input(type='checkbox' checked=false)
  input(type='checkbox' checked=true.toString())
```

- 如果 doctype 是 html 的话 Pug 就不会去映射属性(就是不用像上面那样必须指定true or false)，而是使用缩写样式 也就是跟我们原生的形式一样可以见血
```pug 
  doctype html
  input(type='checkbox' checked)
```


> 样式属性
- style属性的值 可以是字符串 也可以是 { }
```pug 
  a(style={color: 'red', background: 'green'})
```


> 类属性
- class的属性的值 可以是字符串 也可以是包含多个类名的数组
```pug 
  var classes = ['foo', 'bar', 'baz']
  a(class=classes)

  a.bang(class=classes class=['bing'])

  //-  编译后
  <a class="foo bar baz"></a>
  <a class="bang foo bar baz bing"></a>
```

- class的属性的值 还可以是一个对象 类名通过布尔值控制 添加与否
```pug  
  var currentUrl = '/about'

  //- 当 currentUrl 不等于 / 的时候 该class不会被添加
  a(class={active: currentUrl === '/'} href='/') Home
  a(class={active: currentUrl === '/about'} href='/about') About
```

- 标签添加类名的简写方式 el.classname
```pug 
  a.button
  <a class="button"></a>
```


- 标签添加id的简写方式 el#id
```pug 
  a#main-link
```

- 扩展
- 因为div太常见了 我们可以直接使用 .button #test --- <div id="button / test">



> &attributes  读作: and attributes
- 可以将一个对象转化为一个元素的属性列表。
- 就是可以将 &attributes 后面的对象 以 K=V 的形式 添加到 标签属性中
```pug 
  div#foo(data-bar="foo")&attributes({'data-foo': 'bar'})
  <div id="foo" data-bar="foo" data-foo="bar"></div>


  var attributes = {};

  //- 在 attributes 对象中 添加 class: "baz"
  attributes.class = 'baz';
  div#foo(data-bar="foo")&attributes(attributes)

  <div class="baz" id="foo" data-bar="foo"></div>
```

-------------------------

### 分支条件 Case
- case 是 JavaScript 的 switch 指令的缩写

- 语法：
- case 表达式
  when 表达式
    内容；
  default:
    内容

```pug 
  var friends = 10
  case friends
    when 0
      p 您没有朋友
    when 1
      p 您有一个朋友
    default
      p 您有 #{friends} 个朋友

  <p>您有 10 个朋友</p>
```


> 分支传递 (Case Fall Through)
- 当我们没有在when后面指定 break 的时候 一直向下传递 也就是会打印出后面的内容
- 我们可以指定 break

-------------------------

### script
- 在pug文件中嵌入 js

> script.
```pug
script.
  代码部分... 比如 location.herf = "/"
```


> "-" 连字符
- 我们在 *定义* 变量 的时候 可以使用 - 连字符 也就是说定义在连字符后面的 内容不会输出

- 它的使用分为两种情况
- 1. 不需要换行的情况
```pug
- const num = 10
```

- 2. 需要换行的情况 注意要缩进在 - 连字符下
```pug
- 
  const obj = {
    num: 10
  }
```

-------------------------

### | 的使用
- 据我感觉就是用来 换行用的 
```pug
  p hello
  | 你好
```

- 这样的话 你好就会换行了

-------------------------

### 代码
- Pug 为您在模板中嵌入 JavaScript 提供了可能

- 1. 使用 - 开始一段不直接进行输出的代码
```pug 
  - for (var x = 0; x < 3; x++)
    li item

    <li>item</li>
    <li>item</li>
    <li>item</li>

  
  使用 for 循环的时候 不用写 { } 好像
```

> each item in arr
- 遍历数组
```pug 
  var list = ["Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis"]

  each item in list
    li= item
```


- 2. 使用 = 开始一段带有输出的代码，它应该是可以被求值的一个 JavaScript 表达式。为安全起见，它将被 HTML 转义：
```pug 
  p
    = '这个代码被 <转义> 了！'

  <p>这个代码被 &lt;转义&gt; 了！</p>
```


- 3. 使用 != 开始一段不转义的，带有输出的代码。这将不会做任何转义，所以用于执行用户的输入将会不安全：
```pug 
  p
    != '这段文字 <strong>没有</strong> 被转义！'
```

-------------------------

### 注释

> 单行注释
- 带输出的注释和 JavaScript 的单行注释类似，它们像标签，能生成 HTML 注释，而且必须独立一行。
- 带输出的意思就是会解析到html结构中
```pug 
  //- 一些内容
  p foo
  p bar

  ```pug 一些内容->
  <p>foo</p>
  <p>bar</p>
```


- 可以在/的后面使用 - 该行注释就不会被解析到html模版种
```pug 
  //- 这行不会出现在结果里
```


> 块注释
```pug 
  //-

  //
```


> 条件注释
- 条件注释是一种用于分辨 Internet Explorer 新老版本的特殊标记。
- 不过因为所有以 < 开头的行都会被当作纯文本，因此直接写一个 HTML 风格的条件注释也是没问题的。
```pug 
  ```pug[if IE 8]>
  <html lang="en" class="lt-ie9">
  <![endif]-->
  ```pug[if gt IE 8]>```pug>
  <html lang="en">
  ```pug<![endif]-->
```

-------------------------

### 条件 if else if else 
- if后面的条件表达式部分可以不加小括号
- 可以省略掉开头的 -，效果是完全相同的。类似一个常规的 JavaScript 语法形式。
```pug 
  var user = { description: 'foo bar baz' }
  - var authorised = false

  #user
    if user.description
      h2.green 描述
      p.description= user.description

    else if authorised
      h2.blue 描述
      p.description.
        用户没有添加描述。
        不写点什么吗……

    else
      h2.red 描述
      p.description 用户没有描述


  <div id="user">
    <h2 class="green">描述</h2>
    <p class="description">foo bar baz</p>
  </div>
```

-------------------------

### Doctype
- doctype html  ---  <!DOCTYPE html>

```pug 
  doctype html

  doctype xml

  doctype transitional
```

- Doctype 会影响 Pug 的编译结果。
- 比如自闭合的标签是以 /> 还是以 > 结束，这取决于指定了是 HTML 还是 XML。布尔值属性也同样会受到影响。


> pug.render(html结构, {doctype: "html"})
- 使用这种方式 在渲染 pug 模版的时候指定 doctype 为 html
- 如果因为某些原因，不能在模板里使用 doctype 关键字（比如需要渲染的是 HTML 的一个片段），但您依然需要指定 doctype 的时候，您就可以通过 doctype 选项来设置了。
```pug 
  var pug = require('./');

  var source = 'img(src="foo.png")';

  pug.render(source);
  //- => '<img src="foo.png"/>'

  pug.render(source, {doctype: 'xml'});
  //- => '<img src="foo.png"></img>'

  pug.render(source, {doctype: 'html'});
  //- => '<img src="foo.png">'
```

-------------------------

### 过滤器
- pug中也可以使用过滤器 想了解这部分内容 我们去看看文档吧
- https://www.pugjs.cn/language/filters.html

-------------------------

### 模版的继承
- Pug 支持使用 block 和 extends 关键字进行模板的继承。

- 也就是说 我们可以将一个pug文件当做一个模板

> block 坑名
- 利用这种方式在模板中挖一个坑 然后在继承该模板的页 使用 block 坑名的方式
- 向坑内添加内容

- 一个称之为“块”（block）的代码块，可以被 子模板覆盖、替换。这个过程是递归的。
<!-- 
  Pug 的块可以提供一份默认内容，当然这是可选的，
  见下述 block scripts、 block content 和 block foot。
-->


> 使用步骤
- 先定义一个html模版 使用 block 关键字来挖坑 比如
  - block scripts   挖个js的坑
  - block content   挖个内容的坑
  - block foot      挖个脚部的坑

```pug 
  html
  head
    title 我的站点 - #{title}
    block scripts
      script(src='/jquery.js')
  body
    block content
    block foot
      #footer
        p 一些页脚的内容
```


- 再创建一个新文件 在新文件中使用 extends 来指出这个被继承的模板的路径
- 我们就可以在新文件中 填父文件留下来的坑了
```pug 
  extends layout.pug

  block scripts
    script(src='/jquery.js')
    script(src='/pets.js')

  block content
    h1= title
    - var pets = ['猫', '狗']
    each petName in pets
      include pet.pug
```


> append / prepend
- prepend （向头部添加内容）
- append（向尾部添加内容）

- 当使用 block append 或者 block prepend 时，block 关键字是可省略的：

- 场景：
- 假设您有一份默认的脚本要放在 head 块中，而且希望将它应用到 每一个页面，那么您可以这样做：
```pug 
  html
  head
    block head
      script(src='/vendor/jquery.js')
      script(src='/vendor/caustic.js')

  body
    block content
```

- 现在假设您有一个页面，那是一个 JavaScript 编写的游戏。您希望把一些游戏相关的脚本也像默认的那些脚本一样放进去，那么您只要简单地 append 这个块：

```pug 
  //- page.pug
  extends layout.pug

  block append head
    script(src='/vendor/three.js')
    script(src='/game.js')

  //- 简写形式
  append head
    script(src='/vendor/three.js')
    script(src='/game.js')
```

-------------------------

### Include 包含
- 包含（include）功能允许您把另外的文件内容(另外的pug页面文件)插入进来。
```pug 
  doctype html
  html
    include includes/head.pug

    body
      h1 我的网站
      p 欢迎来到我这简陋得不能再简陋的网站。
      include includes/foot.pug
```


- 被包含的如果不是 Pug 文件，那么就只会当作文本内容来引入。
- 比如我们可以通过 include 引入外部样式表 或者 js文件
```pug 
  doctype html
  html
    head
      style
        include style.css

    body
      h1 我的网站
      p 欢迎来到我这简陋得不能再简陋的网站。
      script
        include script.js
```

-------------------------

### 项目分析
- 上面介绍完了pug的简单应用 这里我们看看结合kinto的案例 怎么多元化的应用pug

- 1. _base.pug 的创建
- 

-------------------------

### 嵌入
> 字符串嵌入， 转义  #{ }
- 将字符串定义成变量 然后嵌入到模版中
```pug 
  - var title = "On Dogs: Man's Best Friend";
  - var author = "enlore";
  - var theGreat = "<span>转义!</span>";

  h1= title
  p #{author} 笔下源于真情的创作。
  p 这是安全的：#{theGreat}
```


> 字符串嵌入， 不转义 !{ }
```pug 
  - var riskyBusiness = "<em>我希望通过外籍教师 Peter 找一位英语笔友。</em>";
  .quote
    p 李华：!{riskyBusiness}
```


> 标签嵌入 #[ pug语法的标签 ]
- 嵌入功能不仅可以嵌入 JavaScript 表达式的值，也可以嵌入用 Pug 书写的标签。它看起来应该像这样：
```pug 
  p.
  这是一个很长很长而且还很无聊的段落，还没有结束，是的，非常非常地长。
  突然出现了一个 #[strong 充满力量感的单词]，这确实让人难以 #[em 忽视]。

  p.
    使用带属性的嵌入标签的例子：
    #[q(lang="es") ¡Hola Mundo!]
```

- 我们还可以使用 空格 #[ pug语法的标签 ] 空格 的形式来美化html 结构

-------------------------

### 遍历 和 循环
- Pug 目前支持两种主要的迭代方式： each 和 while。

> each item in arr
```pug 
  ul
    each val in [1, 2, 3, 4, 5]
      li= val
```


> each item, index in arr
```pug 
  ul
    each val, index in ['〇', '一', '二']
      li= index + ': ' + val
```


> each item, index in obj
```pug 
  ul
    each val, index in {1:'一',2:'二',3:'三'}
      li= index + ': ' + val
```

```pug 
  - var values = [];
  ul
    each val in values.length ? values : ['没有内容']
      li= val
```


> each item in vals
  else

- else 块，这个语句块将会在数组与对象没有可供迭代的值时被执行。
```pug 
  - var values = [];
  ul
    each val in values
      li= val
    else
      li 没有内容
```


> while
- 您也可以使用 while 来创建一个循环：
```pug 
  - var n = 0;
  ul
    while n < 4
      li= n++
```

-------------------------

### 混入 Mixin
- 混入是一种允许您在 Pug 中重复使用一整个代码块的方法。

- 语法：
- mixin 混合结构的名字
  要混合的结构

- 定义：
- mixin list
- 下面的ul li结构就会被定义成 一个块 方便我们复用
  ul
    li foo
    li bar
    li baz


- 使用：
- +list
  +list


> 函数形式的混入
- 它们会被编译成函数形式，您可以传递一些参数：
- 1. 定义混合函数
- 2. 下行写混合函数的内容
```pug 
  mixin pet(name)
    li.pet= name

  ul
    +pet('猫')
    +pet('狗')
    +pet('猪')


  <ul>
    <li class="pet">猫</li>
    <li class="pet">狗</li>
    <li class="pet">猪</li>
  </ul>
```


> 混入的块
- 混入也可以把一整个代码块像内容一样传递进来：
```pug 
  mixin article(title)
    .article
      .article-wrapper
        h1= title
        if block
          block
        else
          p 没有提供任何内容。

  +article('Hello world')

  +article('Hello world')
    p 这是我
    p 随便写的文章
```


> 混入的属性
- 混入也可以隐式地，从“标签属性”得到一个参数 attributes：
```pug 
  mixin link(href, name)
    //- attributes == {class: "btn"}
    a(class!=attributes.class href=href)= name

  +link('/foo', 'foo')(class="btn")

  <a class="btn" href="/foo">foo</a>

  attributes 里的值已经被（作为标签属性）转义了，所以您可能需要用 != 的方式赋值以避免发生二次转义（详细解释可以查阅不转义的属性）。

  您也可以直接用 &attributes 方法来传递 attributes 参数：
  mixin link(href, name)
    a(href=href)&attributes(attributes)= name

  +link('/foo', 'foo')(class="btn")

  +link(class="btn") 这种写法也是允许的，且等价于 +link()(class="btn")，因为 Pug 会判断括号内的内容是属性还是参数。但我们鼓励您使用后者的写法，明确地传递空的参数，确保第一对括号内始终都是参数列表。
```


> 剩余参数
- 您可以用剩余参数（rest arguments）语法来表示参数列表最后传入若干个长度不定的参数，比如
```pug 
  mixin list(id, ...items)
    ul(id=id)
      each item in items
        li= item

  +list('my-list', 1, 2, 3, 4)

  <ul id="my-list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>
```

-------------------------

### 纯文本 Plain Text
- Pug 提供了四种方法来放置纯文本
```pug 
  换句话说，任何的代码或者文字都将几乎不经过任何处理，直接输出到 HTML 中。它们在不同的情况下会派上不同的用途。纯文本中依然可以使用标签和字符串的嵌入操作，不过每行开头就不再是 Pug 标签。同样，因为纯文本不经处理，因此您也可以在这里面包含原始 HTML 代码。
```

> 标签中的纯文本 
- 标签 + 空格 + 文本


> 管道文本  | 
- 在一行前面加一个管道符号（|）
- 该方法在混合纯文本和行内标签时会很有用
```pug 
  p
    | 管道符号总是在最开头，
    | 不算前面的缩进。

  
  <p>管道符号总是在最开头，
    不算前面的缩进。</p>
```


> 标签中的纯文本块  .
- 有的时候您可能想要写一个非常大的纯文本块。一个典型的例子就是用 script 和 style 内嵌 JavaScript 和 CSS 代码。

- 也就是添加 <script> 标签的时候

- 要点：
- 为此，只需要在标签后面紧接一个点 .   在标签有属性的时候，则是紧接在闭括号后面。
- 在标签和点之间不要有空格
- 块内的纯文本内容必须缩进一层：
```pug 
  script.
    if (usingPug)
      console.log('这是明智的选择。')
    else
      console.log('请用 Pug。')


  <script>
    if (usingPug)
      console.log('这是明智的选择。')
    else
      console.log('请用 Pug。')
  </scripte>
```


> 空格控制
- 关于空格，只需记住两个要点。当编译渲染 HTML 的时候：
- 1. Pug 删掉缩进，以及所有元素间的空格
- 2. Pug 保留符合以下条件的元素内的空格：
    一行文本之中所有中间的空格
    在块的缩进后的开头的空格
    一行末尾的空格
    纯文本块、或者连续的管道文本行之间的换行。

- 因此，Pug 会丢掉标签之间的空格，但保留内部的空格。这将有助于完全掌握应该如何操作标签和纯文本，甚至可以让您在一个单词中间插入一个标签。


- 如果您需要添加空格，有几个选择：
- 推荐方案
- 您可以添加一个甚至更多的管道文本行——只有空格或者什么都没有的管道文本。这将会在渲染出来的 HTML 中插入空格。
```pug 
  | 千万别
  |
  button#self-destruct 按
  |
  | 我！


  千万别
  <button id="self-destruct">按</button>
  我！
```

-------------------------

### 标签 Tag
- 在默认情况下，在每行文本的开头（或者紧跟白字符的部分）书写这个 HTML 标签的名称。使用缩进来表示标签间的嵌套关系，这样可以构建一个 HTML 代码的树状结构。

```pug 
  ul
    li Item A
    li Item B
    li Item C


  <ul>
    <li>Item A</li>
    <li>Item B</li>
    <li>Item C</li>
  </ul>
```

> a: img  标签的嵌套写法
- <a><img /></a>


> 自闭合标签
- 诸如 img, meta, 和 link 之类的标签都是自动闭合的（除非您使用 XML 类型的 doctype）。 您也可以通过在标签后加上 / 来明确声明此标签是自闭合的，

```pug 
  foo/
  foo(bar='baz')/


  <foo />
  <foo bar="baz" />
```


-------------------------


> pug如何使用后台传递过来的数据
```pug 
  const data = {
    name: "sam"
  }
  res.render("index", data)


  pug模板中使用 #{name}
```  


 > pug里面后台传递到前端的数据 我们还可以保存在js中的变量里面
 > script.
- 加上.后我们可以取到后台传递过来的name的值
 ```pug 
  script.
    const name = #{name}
 ``` 

-------------------------

### Pug模版
- npm i pug


### express 相关

- pug文件默认路径就是 views的文件夹里面 
- app.set("views", "./views")


> app.use()
- 该项目文件夹里面的部分文件 变成静态的文件 提供给服务器 这样在客户端直接就可以访问到静态资源文件夹里面的文件
```pug 
  我们可以 npm i bootstrap
  然后将 node_modules / bootstrap 设置为静态资源文件夹
  这样前端就能访问到这个文件夹中的文件

  app.use(express.static("/lib/bootstrap", "node_modules/bootstrap/dist"))


  前端可以通过 /lib/bootstrap 这个路径 访问到 node_modules/bootstrap/dist 这个路径里面的资源
```

```pug 
  | - views
    - index.pug

  //- 将模板引擎设置为 pug
  app.set("view engine", "pug")

  //- 设置模板存放目录为 views文件夹
  app.set('views', path.join(__dirname, 'views'));
  //- app.set("views", "./views")

  //- 设置服务器端的静态资源文件夹 让前端通过 /lib/bootstrap 路径访问到bootstrap
  app.use("/lib/bootstrap", express.static("node_modules/bootstrap/dist"))

  app.get("/", (req, res) => {
    res.render("index")
  })
```

-------------------------