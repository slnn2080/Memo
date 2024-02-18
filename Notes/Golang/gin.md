# Gin
它是一个go编写的轻量级的http web框架, 运行速度非常快

Gin最擅长的就是api接口的高并发, 如果项目的规模不大, 业务相对简单, 也可以用gin

Gin是一个用Go语言编写的Web框架，专门**用于快速构建高性能的HTTP服务端程序**。

Gin提供了一套简洁有效的工具来快速开发Web应用或API服务，包括路由、中间件支持、请求处理、响应处理等功能。

使用Gin，你可以很容易地创建RESTful的API接口，处理不同类型的HTTP请求（如GET、POST、PUT、DELETE等），并以JSON或其他格式返回数据。此外，Gin还支持为路由设置中间件，允许在处理请求前后执行特定的代码，这在实现诸如日志记录、用户身份验证、数据校验等功能时非常有用。

<br>

### 官网:
```s
https://gin-gonic.com/zh-cn
```

<br>

### 安装
**1. 进入到项目根目录下, 执行如下命令**
最新的Go版本要求项目必须在模块模式下执行下面的操作
```go
// go get -u是用来更新和安装Go包的命令
go get -u github.com/gin-gonic/gin
```

<br>

**2. 引入到项目main包中**
```go
package main
import "github.com/gin-gonic/gin"
```

<br>

**3. 可选, 如果使用诸如 http.StatusOK 之类的常量，则需要引入net/http 包**  
```go
import "net/http"
```

<br>

**2xx:**    
- http.StatusOK (200)：请求成功。
- http.StatusCreated (201)：请求成功并且服务器创建了新的资源。
- http.StatusAccepted (202)：服务器已接受请求，但尚未处理。
- http.StatusNoContent (204)：服务器成功处理了请求，但没有返回任何内容。

<br>

**3xx:**  
- http.StatusMovedPermanently (301)：请求的网页已永久移动到新位置。
- http.StatusFound (302)：服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行后续的请求。
- http.StatusSeeOther (303)：对于请求的响应可以在另一个 URI 上找到。
- http.StatusTemporaryRedirect (307)：请求的资源临时从不同的 URI 响应请求。

<br>

**4xx:**    
- http.StatusBadRequest (400)：服务器无法理解请求的格式。
- http.StatusUnauthorized (401)：请求未经授权。
- http.StatusForbidden (403)：服务器拒绝请求。
- http.StatusNotFound (404)：服务器找不到给定的资源；文档不存在。
- http.StatusMethodNotAllowed (405)：不允许使用请求行中指定的方法。

<br>

**5xx:**    
- http.StatusInternalServerError (500)：服务器遇到错误，无法完成请求。
- http.StatusNotImplemented (501)：服务器不支持请求的功能，无法完成请求。
- http.StatusBadGateway (502)：服务器作为网关或代理，从上游服务器收到无效响应。
- http.StatusServiceUnavailable (503)：由于临时的服务器维护或过载，服务器当前无法处理请求。
- http.StatusGatewayTimeout (504)：服务器作为网关或代理，但是没有及时从上游服务器收到请求。

<br>

### 代码示例:
1. router: 相当于nodejs中的 app
2. ``router := gin.Default()`` 相当于 ``app = express()``
3. ``ctx`` 相当于 koa 中的 ``ctx``
4. ``router.Run()`` 可以传入参数 指定监听的端口号
5. router 的变量可以起成 app, router, server 都可以

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	// 创建默认的路由引擎, 返回router对象
	router := gin.Default()

	// Get请求, 匹配到路径后 触发回调
	router.GET("/", func(ctx *gin.Context) {
		// 给浏览器返回字符串
		// 1. 状态码
		// 2. format string: 跟printf的 %v 一样
		// 3. values ...interface{}
		ctx.String(200, "%v", "返回给浏览器的内容")
	})

	// 启动web服务: 监听端口
	// router.Run("127.0.0.1:3333")
	// router.Run(":3333")
	router.Run() // 默认监听8080
}
```

<br>

### 配置服务器的热加载
所谓的热加载就是当我们对代码进行修改的时候, 程序能自动重新加载并执行

go中的热加载需要借助第三方的工具 

1. 项目(模块根目录)执行如下命令, 下载
```s
# 首先 安装的二进制文件默认放置在 $GOPATH/bin 目录下，或者 $GOBIN 目录
go install github.com/pilu/fresh@latest

# 然后
go get github.com/pilu/fresh
```

2. 使用 ``fresh`` 命令替代 ``go run main.go``
```s
fresh
```

我们运行该命令之后会在根目录下创建 tmp目录

<br>

**配置文件: 可选**  
如果你的项目不需要特别的配置，fresh **将会使用默认设置**

在项目根目录创建一个名为 ``runner.conf`` 的文件，来配置 fresh 的行为

```s
root:              .
tmp_path:          ./tmp
build_name:        runner-build
build_log:         runner-build-errors.log
valid_ext:         .go, .tpl, .tmpl, .html
build_delay:       600
colors:            true
log_color_main:    cyan
log_color_build:   yellow
log_color_runner:  green
log_color_watcher: magenta
log_color_app:
```

<br>

### RESTful
- GET(select): 从服务器取出资源
- POST(create): 在服务器新建一个资源
- PUT(update): 在服务器更新资源
- DELETE(delete): 从服务器删除资源

<br><br>

## 服务器 向 浏览器 响应数据
ctx是接口方法中回调的参数 ``ctx *gin.Context``

<br>

### 响应 字符串
### **<font color='#C2185B'>ctx.String(状态码 int, 占位符 string, 内容 interface{})</font>**
```go
ctx.String(200, "%v", "返回给浏览器的内容")
```

<br>

### 响应 JSON
### **<font color='#C2185B'>ctx.JSON(状态码 int, 内容 interface{})</font>**

**响应字符串:**  
```go
router.GET("/", func(ctx *gin.Context) {
  ctx.JSON(200, "响应JSON数据")
})
```

<br>

**响应Map:**  
```go
router.GET("/", func(ctx *gin.Context) {
  // 响应个map
  res := make(map[string]interface{})
  res["code"] = 200
  res["message"] = "OK"
  res["data"] = map[string]interface{}{
    "username": "sam",
    "age": 18,
  }
  ctx.JSON(200, res)
  // 客户端呈现: {"code":200,"data":{"age":18,"username":"sam"},"message":"OK"}
})
```

<br>

**技巧: <font color='#C2185B'>gin.H{k:v}</font>**  
上面我们自己声明了一个map
```go
map[string]interface{}{
  k: v
}
```

gin中给我们提供了一个 ``gin.H{k:v}`` 它就是一个map, 相当于``map[string]interface{}``的简写
```go
router.GET("/", func(ctx *gin.Context) {
  res := gin.H{
    "code":    200,
    "message": "OK",
    "data": gin.H{
      "username": "sam",
      "age":      19,
    },
  }
  ctx.JSON(200, res)
})
```

<br>

**响应结构体:**  
```go
type User struct {
	UserName string `json:"username"`
	Age      int    `json:"age"`
}

func main() {
	// 创建默认的路由引擎, 返回router对象 (相当于创建服务器实例 app)
	router := gin.Default()

	// Get请求, 匹配到路径后 触发回调
	router.GET("/", func(ctx *gin.Context) {
		u := User{"sam", 18}
		ctx.JSON(200, u)
	})

	// 启动web服务: 监听端口
	router.Run() // 默认监听8080
}
```

<br>

### 响应 JSONP
前端需要在url上携带query参数
```s
localhost:8080/demo?callback=xxx
```

当我们定义了一个支持jsonp的接口的时候
- 如果前台请求没有携带``?callback=xxx``参数的话, 则就是一个响应JSON格式数据的接口
- 如果前台请求携带``?callback=xxx``参数的话, 则数据就会通过实参的方式传递给xxx, 自动调用 ``xxx(数据)``

<br>

### **<font color='#C2185B'>ctx.JSONP(状态码 int, 内容 interface{})</font>**

```go
router.GET("/jsonp", func(ctx *gin.Context) {
  u := User{"sam", 18}
  ctx.JSONP(200, u)
})

// 如果前台传递了callback参数 则 xxx({"username":"sam","age":18});
```

<br>

### 响应 xml数据

### **<font color='#C2185B'>ctx.XML(状态码 int, 内容 interface{})</font>**
```go
router.GET("/xml", func(ctx *gin.Context) {
  ctx.XML(200, gin.H{
    "username": "sam",
  })
})
```

客户端显示
```xml
<map>
<SCRIPT id="allow-copy_script">(function agent() { let unlock = false document.addEventListener('allow_copy', (event) => { unlock = event.detail.unlock }) const copyEvents = [ 'copy', 'cut', 'contextmenu', 'selectstart', 'mousedown', 'mouseup', 'mousemove', 'keydown', 'keypress', 'keyup', ] const rejectOtherHandlers = (e) => { if (unlock) { e.stopPropagation() if (e.stopImmediatePropagation) e.stopImmediatePropagation() } } copyEvents.forEach((evt) => { document.documentElement.addEventListener(evt, rejectOtherHandlers, { capture: true, }) }) })()</SCRIPT>
<link type="text/css" rel="stylesheet" id="dark-mode-custom-link"/>
<link type="text/css" rel="stylesheet" id="dark-mode-general-link"/>
<style lang="en" type="text/css" id="dark-mode-custom-style"/>
<style lang="en" type="text/css" id="dark-mode-native-style"/>
<style lang="en" type="text/css" id="dark-mode-native-sheet"/>
<script/>

<!-- 这里相当于map中的kv -->
<username>sam</username>

</map>
```

<br>

### 响应 html
相当于在后台定义了 html模版 (类似 nodejs中的 template-art 模版) 我们可以将后台的数据插入到html模版中

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

4. **<font color='#C2185B'>ctx.HTML(状态码 int, html模版名称 string, 数据 interface{})</font>** 向前台响应渲染后的html文件

```go
router.GET("/html", func(ctx *gin.Context) {
  // 我们将要填入到html模版中的数据 组织成一个对象
  templateData := gin.H{
    "title": "我是标题",
  }
  ctx.HTML(200, "index.html", templateData)
})
```

