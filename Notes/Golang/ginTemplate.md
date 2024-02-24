# 模版引擎:
它是相当于我们
- express中的 template-art
- java中的 thymeleaf

它也属于后台渲染, 前后台不分离的技术 下面我们看看它的语法

<br>

### 模版引擎的基本使用
1. 根目录下创建 views 目录, 用于存放html文件
```s
| - views
  - index.html
```

2. 插值语法 ``{{.key}}``, 通过该语法获取后台传递到模版中的数据

3. 配置html模版读取的目录
```go
// 创建默认的路由引擎, 返回router对象 (相当于创建服务器实例 app)
router := gin.Default()

// 配置html读取目录
router.LoadHTMLGlob("views/*")
```

<br>

### **<font color='#C2185B'>ctx.HTML(状态码 int, html模版名称 string, 数据 interface{})</font>**
向前台响应渲染后的html文件

参数2: ``views/文件路径``, views已经在上面配置过了

<br>

### 示例:
```go
func main() {
  // 创建默认的路由引擎, 返回router对象 (相当于创建服务器实例 app)
  router := gin.Default()

  // 配置html读取目录
  router.LoadHTMLGlob("views/*")

  router.GET("/html", func(ctx *gin.Context) {
    // 数据为对象: 将要填入到html模版中的数据
    templateData := gin.H{
      "title": "我是标题",
    }
    ctx.HTML(200, "index.html", templateData)
  })

  // 启动web服务: 监听端口
  router.Run() // 默认监听8080
}
```

<br><br>

## views(模版文件目录) 嵌套目录时的配置
比如我们的views中有如下的文件结构
```s
| - views
  | - client
    - index.html
  | - server
    - index.html
  - index.html
```

<br>

**1. 因为我们views目录下 有嵌套的文件目录 所以我们相应的也要修改下面的部分**
```go
router.LoadHTMLGlob("views/**/*")
```

<br>

**2. html文件中开头的位置要定义模版的名称**  
比如我们是如下的目录结构
```s
| - views
  | - client
    - index.html
```

那我们就要在 index.html 的文件上方写上 ``define ... end``, 相当于给这个html文件起一个名称, 方便我们在go的后台程序中找到它
```s
{{ define "client/index.html" }}

{{ end }}
```
```html
{{ define "client/index.html" }}
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>首页</title>
  </head>
  <body>
    <h3>我是首页</h3>
    <h3>{{.title}}</h3>
  </body>
  </html>
{{ end }}
```

**3. 使用 ctx.HTML 渲染html文件时 参数2给入上面我们起的名字:**  
```go
router.GET("/client/home", func(ctx *gin.Context) {
  templateData := gin.H{
    "title": "前台页面标题",
  }

  // 模版html文件的名称为: client/index.html
  ctx.HTML(200, "client/index.html", templateData)
})
```

<br><br>

# API

## 定界符 ``{{}}``
在这里我们可以写go代码


它用来包围模板指令，告诉模板引擎在这里执行一些特定的操作，如插入变量的值、执行条件判断、循环遍历等。

这种语法使得模板能够动态地插入数据、根据条件渲染不同的HTML片段或执行其他逻辑操作。

```go
{{ }}
```

<br><br>

## 取值:
```go
{{.key}}
```

<br>

**从 map 中取数据:**  
```go
templateData := gin.H{
  "title": "我是标题",
}
ctx.HTML(200, "index.html", templateData)

{{.title}}
```

<br>

**从 结构体 中取数据:**  
```go
type User struct {
  Name string
}

user := User{"sam"}
templateData := gin.H{
  "title": "我是标题",
  "user": user
}
ctx.HTML(200, "index.html", templateData)

{{.user.Name}}
```

<br><br>

## 变量
我们可以将后台传入到html模版中的数据, 保存到一个变量中

也就是我们在模版中声明变量, 用来保存传入模版的数据 或 其它语句生成的结果

<br>

### 声明变量的方式:
跟sass一个样
```go
$变量
```

要注意的是，这种局部变量的声明和使用仅限于模板渲染的过程中。变量的作用域是声明它的那个模板块，如果你在模板的一个块中声明了一个局部变量，它将不会在其他块中可用，除非这些块是嵌套的。

<br>

```html
<!-- 使用go的语法赋值 -->
<body>
  <!-- 写go代码的位置 -->
  {{ $val := .title }}

  <h3>前台页面</h3>
  <h3>{{.title}}</h3>
  <button>{{ $val }}</button>
</body>
```

将后台返回的 title 保存到我们声明的变量 ``$val`` 中, 该变量可以在任何标签中使用

<br><br>

## 移除空格
有时候我们在使用模版语法的时候 会不可避免的引入一些空格或者换行符

这样模版最终渲染出来的内容可能就和我们想的不一样, 这个时候就可以使用如下的语法去除空白字段

```go
{{- .Name }}  // 取出内容左边的空白字符
{{ .Name -}}  // 取出内容右边的空白字符
{{- .Name -}}  // 取出内容左右两边的空白字符
```
<br>

**注意:**  
``-``和``{{}}``要紧挨在一起  

<br><br>

## 比较函数
布尔函数会将任何类型的零值视为 false, 其余视为 true

- eq: val1 相等 val2
- ne: val1 不相等 val2
- lt: val1 小于 val2
- le: val1 小于等于 val2
- gt: val1 大于 val2
- ge: val1 大于等于 val2

### 语法格式:
```go
// val 是否和 val2 相等
eq val1 val2

// val 是否小于 val2
lt val1 val2
```

<br><br>

## if else 条件判断
```go
// if
{{if 条件表达式}}
  内容
{{end}}

// if...else
{{if 条件表达式}}
  内容
{{else}}
  内容
{{end}}

// if...else if...else
{{ if eq .count 1 }}
  按钮
{{ else if eq .count 2 }}
  小按钮
{{ else }}
  默认值
{{ end }}
```

<br>

### 示例:
```html
<button>
  {{ if eq .count 1 }}
    按钮
  {{ else if eq .count 2 }}
    小按钮
  {{ else }}
    默认值
  {{ end }}
</button>

{{if eq .count 1 }}
  <p>段落</p>
{{ end }}
```

<br><br>

## 遍历: range
go模版语法中使用 range 关键字进行遍历, 我们可以遍历的对象有
- 数组
- 切片
- 字典
- 通道

<br>

### 遍历语法
```html
{{ range $key, $value := .data }}
  {{ $value }}
{{ end }}
```

<br>

**扩展:**  
如果要遍历的对象长度为0, 则不会有任何输出, **该语法还可以搭配else**, 还输出当对象长度为0时的情况

```go
router.GET("/client/home", func(ctx *gin.Context) {
  templateData := gin.H{
    "title": "前台页面标题",
    "count": 2,
    "arr":   [0]string{},
  }
  ctx.HTML(200, "client/index.html", templateData)
})
```
```html
<ul>
  {{ range $key, $val := .arr }}
    <li>{{ $val }}</li>
  {{ else }}
    <li>arr没值</li>
  {{ end }}
</ul>
```

<br><br>

## 解构结构体 with
以前我们要是想输出结构体中的字段需要这样
```html
<div>{{ .user.Name }} </div>
```

<br>

我们可以通过 with 将属性解构出来, **然后直接通过.来获取结构体中的字段**
```html
{{ with .user }}
<div>{{ .Name }} </div>
```

<br><br>

## 预定义函数
go中的html模版中给我们预定义了如下的全局函数, 下面的预定义函数 **类似于关键字**, 这些关键字都写在 ``{{  }}`` 中

<br>

### **<font color='#C2185B'>{{ and 条件表达式1 条件表达式2 }}</font>** 
类似 ``&&``, 当同时满足条件表达式1 和 2 的时候 返回 真

```html
{{if and .Condition1 .Condition2}}
  <!-- 这里是当 Condition1 和 Condition2 都为真时要执行的代码 -->
{{else}}
  <!-- 这里是当 Condition1 和 Condition2 中至少一个为假时要执行的代码 -->
{{end}}

```

<br>

### **<font color='#C2185B'>{{ or 条件表达式1 条件表达式2 }}</font>**
类似 ``||``, 有一个条件表达式满足条件 就返回 真

<br>

### **<font color='#C2185B'>{{ not 条件表达式 }}</font>**
类似 ``!``, 对条件表达式取反
```html
{{if not .LoggedIn}}
    <p>You are not logged in.</p>
{{else}}
    <p>Welcome back!</p>
{{end}}

```

<br>

### **<font color='#C2185B'>{{ len .变量 }}</font>** 
获取数组、切片、映射或字符串的长度

**字符串的情况:**  
输出的是字节数

<br>

### **<font color='#C2185B'>{{ index .数组变量 index }}</font>** 
获取 数组 或 切片 的指定元素

<br>

### **<font color='#C2185B'>{{ print .变量 }}</font>** 
### **<font color='#C2185B'>{{ printf "%T" .变量 }}</font>** 
### **<font color='#C2185B'>{{ println .Value1 .Value2 }}</font>** 
分别用于输出字符串、格式化输出和输出字符串后换行

输出在前台页面上

<br>

### **<font color='#C2185B'>{{ html .变量 }}</font>** 
对字符串进行html转义, 类似 ``v-html``

<br>

### **<font color='#C2185B'>{{ urlquery .变量 }}</font>** 
对字符串进行URL编码

当你需要将数据作为URL参数传递时，使用urlquery可以确保数据被正确编码，防止URL解析错误或注入攻击

<br>

### **<font color='#C2185B'>{{ js .变量 }}</font>** 
对字符串进行JavaScript转义，确保字符串可以安全地嵌入到JavaScript代码中

当你需要在JavaScript代码中嵌入动态数据时，使用js函数可以防止潜在的跨站脚本攻击（XSS）和确保代码的正确执行

js函数通过转义JavaScript中有特殊意义的字符来工作，比如引号("和')、反斜杠``(\)``、大于号``(>)``、小于号``(<)``等，以及控制字符（如换行符）。

转义这些字符意味着将它们替换为它们的字符实体或Unicode转义序列，这样浏览器就不会将这些字符解释为JavaScript代码的一部分
```js
<script>
  var data = "{{js .Data}}";
</script>

// 如果.Data的值是Alice's "cat"，那么经过js函数处理后，嵌入到JavaScript中的字符串将会是：
var data = "Alice\u0027s \"cat\"";
```

<br>

### **<font color='#C2185B'>{{ call .函数名 .参数1, .参数2 }}</font>** 
call函数允许你在模板中调用一个函数，其中函数和参数都是动态确定的

这个功能主要用于高级用途，比如当你需要在模板中根据条件调用不同的Go函数时。它提供了一种灵活的方式来动态执行函数

<br><br>

## 自定义模版函数
自定义模版函数要定义在 main.go 中

1. 在 main.go 中定义函数
```go
func UnixToTime(timestamp int64) string {
	t := time.Unix(timestamp, 0)
	fmt.Println(t)
	return t.Format("2006-01-02 15:04:05")
}
```

2. 在 ``gin.Default()`` 下面 && ``LoadHTMLGlob()`` 上面注册上面定义好的函数
```go
func main() {
	router := gin.Default()

	// 注册函数: 向模版暴露定义的函数
	router.SetFuncMap(template.FuncMap{
		"UnixToTime": UnixToTime,
	})

	router.LoadHTMLGlob("views/**/*")
}
```

3. html模版中使用
```html
<div>{{ UnixToTime .stemp }}</div>
```

<br>

在模版中调用函数的时候 ``UnixToTime .stemp`` 会将stemp变量传递到函数的参数中, 函数的返回值展示在div中

<br>

**示例代码:**  
```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"html/template"
	"time"
)

// 定义模版中要使用的函数
func UnixToTime(timestamp int64) string {
	t := time.Unix(timestamp, 0)
	fmt.Println(t)
	return t.Format("2006-01-02 15:04:05")
}

func main() {
	router := gin.Default()

	// 注册函数: 向模版暴露定义的函数
	router.SetFuncMap(template.FuncMap{
		"UnixToTime": UnixToTime,
	})
	router.LoadHTMLGlob("views/**/*")


	router.GET("/client/home", func(ctx *gin.Context) {
		templateData := gin.H{
			"title": "前台页面标题",
			"count": 2,
			"arr":   [0]string{},
			"stemp": time.Now().Unix(),
		}
		ctx.HTML(200, "client/index.html", templateData)
	})

	// 启动web服务: 监听端口
	router.Run() // 默认监听8080
}
```

<br><br>

## html的组件化 (包含)
比如我们页面上有公共的头部 或 尾部, 相当于封装一个html组件

**目录结构:**  
```s
| - GOPRO
  | - views
    | - common
      - header.html
      - footer.html
    | - client
      - index.html
```

**1. 创建 header html组件**  
1. 使用 define end 给组件起名字
2. 里面是主要的html部分就可以
```html
{{ define "common/header.html" }}

<style>
  h2 {
      color: pink;
      font-weight: bold;
  }
</style>
<h2>----- 页面的头部信息 -----</h2>

{{ end }}
```

<br>

**2. 在页面中使用如下的代码引入组件:**  
注意导入组件的时候 最后有一个 ``.``

```html
{{ template "common/header.html" . }}
```
```html
{{ define "client/index.html" }}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>首页</title>
</head>
<body>

  <!-- 引入头部组件 -->
  {{ template "common/header.html" . }}
  <h3>前台页面</h3>
  {{ template "common/footer.html" . }}
  <!-- 引入尾部组件 -->

</body>
</html>
{{ end }}
```

<br><br>

## 静态文件服务 (存放静态资源的目录)
当我们渲染的html文件中引用了静态文件的时候, 我们需要配置静态服务

比如我们需要在页面中引入 css js img 的时候

**目录结构:**  
```s
| - GOPRO
  | - static
    - 1.png
  | - views
    | - client
      - index.html
```

<br>

**1. 存放静态资源的文件夹放在根目录**  
不一定非要叫static

<br>

**2. 在 ``LoadHTMLGlob`` 方法的上面使用如下代码配置静态服务**
```go
func main() {
	router := gin.Default()

	// 注册函数: 向模版暴露定义的函数
	router.SetFuncMap(template.FuncMap{
		"UnixToTime": UnixToTime,
	})

	// 配置静态服务
  // 参数1: 表示路由(请求的接口)
  // 参数2: 路由映射的目录
	router.Static("/static", "./static")

	router.LoadHTMLGlob("views/**/*")

	router.GET("/client/home", func(ctx *gin.Context) {
		templateData := gin.H{
			"title": "前台页面标题",
			"count": 2,
			"arr":   [0]string{},
			"stemp": time.Now().Unix(),
		}
		ctx.HTML(200, "client/index.html", templateData)
	})

	// 启动web服务: 监听端口
	router.Run() // 默认监听8080
}
```

<br>

**3. 前台页面在引入静态资源的时候 起点为``/static``**  
``router.Static``接口中配置的路由是什么 我们这里就写什么
```html
<img src="/static/1.png" alt="">
```

<br>

**解析:**  
当我们 ``<img src="/static/1.png" alt="">`` 这么写的时候 相当于向 ``/static`` 接口发起请求

而 ``router.Static("/static", "./static")`` 这段代码的含义就是, 我们向 /static 发起的请求静态资源的时候, 都会从``./static目录``开始找

<br>

### 注意:
好像没有配置静态服务之前, 不能往gin的项目中放静态资源 会报错

<br><br>

