### 传统接口风格
- 对用户进行操作的相关接口 包括增删改查
- 在完成增删改查的时候 请求方法几乎都是 get post 来完成各种处理

> 查询某个用户 get / post
- http://ip:port/myweb/user/getUser?id=1


> 查询所有用户 get / post
- http://ip:port/myweb/user/getUsers
- http://ip:port/myweb/user/getUserList


> 添加用户 post
- http://ip:port/myweb/user/addUser


> 修改用户 post
- http://ip:port/myweb/user/updateUser


> 删除用户 get post
- http://ip:port/myweb/user/deleteUser?id=1


> 特点:
- 1. 请求方式 只需要两种 get post
- 2. url不唯一 同一个操作可能起不同的接口名字
- 3. 状态码的使用 较为单一 都是200

----------------

### Restful(表现层状态转化)风格的接口
- 它更像是一种规范, 现在项目中如果是前后端分离的项目, 建议写这种风格的接口

> 前后端不分离:
- 目前来说 我们现在做的这个news这个项目属于前后端不分离的项目, 因为前端和后端的代码都在一起都在项目文件夹内  我们将数据传到模板里面去, 然后展示到页面上

- 访问一个网站, 就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化。

> 前后端分离
- 数据渲染在前端

- 前后端是不同人员开发的, 我们适合前后端分离的写法, 比如前端是一个团队, 后端是另一个团队, 后端主要注重一些接口, 有关于页面的渲染其实是在前端去做(我们前面的项目都是后端直接渲染页面)

- 后端在接口中只需要传出去数据就可以了, 这个数据在restful风格的接口中称之为资源


> Restful接口
- 它把每一个操作都看成是对资源的操作

- 客户端用到的手段，只能是HTTP协议。具体来说，就是HTTP协议里面，四个表示操作方式的动词：

- GET、POST、PUT、DELETE。它们分别对应四种基本操作：

- 1. GET用来获取资源
- 2. POST用来新建资源（也可以用于更新资源）
- 3. PUT用来更新资源(更新的是一整条记录)
- 4. PATCH用来更新一条记录中的一个字段
- 5. DELETE用来删除资源。


> 示例:

> 查询某个用户 get
- http://ip:port/myweb/users/1   200


> 查询所有用户 get
- http://ip:port/myweb/users     200


> 添加用户 post
- http://ip:port/myweb/users     201


> 添加用户 put
- http://ip:port/myweb/users/1   201


> 删除用户 delete
- http://ip:port/myweb/users/1   204



> 特点：
- 1. 每一个URI代表一种资源； URI 可以理解为一个接口 '/get_data'

- 2. 客户端和服务器之间，传递这种资源的某种表现层(在传输过程中的加密, 到浏览器端还需要解析)；

- 3. 客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。

- 4. 一般这种接口返回出来是json数据


> RESTful接口举例：
​	GET     /users      获取用户列表
​	GET     /users/1    获取id为1的用户
​	GET     /users/2    获取id为2的用户

​	PUT     /users/3    更新id为3的用户
​	POST    /users/4    插入id为4的用户
​	DELETE  /users/5    删除id为5的用户
​	GET     /token      登录

- RESTful针对动态资源，路径为资源名词，路径不包含后缀名(动态资源不写.html)

- 之前news的项目中我们使用了 /passport/login 这种写法 这不像是针对资源像是针对某个动作


> 总结 restful 风格
- 每一个路径就是一个资源, 资源一般用名词
- 后端接口出来的数据一般都是 json格式的数据
- 前后端分离的情况下 遵守restful风格的开发会更好

```
    开发维护的时候便于团队的配合 不会在开发的时候对接口任意起名字, 大家去猜这个接口是啥 
```


> 体验restful风格的接口
```js 
    // 之前我们使用的接口 都是动词, 以动作以目的来给接口去命名, 然后为了处理跟命名相关的逻辑
    app.get('/passport/login', (req, res) => {
        ...
        res.render('index', data);
    })


    // 现在是前后端分离的话, 我们需要注重团队的配合, 在给接口去起名字的时候 最好遵守restful风格的接口规范 restful风格的接口规范是 get 对应的应该是请求资源, 在前后端分离的模式中 我们后端只需要去返回数据, 前端来负责渲染

    // 假如我们使用restful风格的接口 在接口里去请求数据库 应该是什么样的 restful风格的接口 接口必须是资源(info_category就是资源)


    // restful 风格的接口 只返回数据
    app.get('/info_category', (req, res) => {

        let result = await handleDB(res, 'info_category', 'find', '数据库查询出错了')

        res.send(result);

        // 我们响应会前端的数据还可以继续完善一些
        res.send({
            status: '0',
            data: result,
            reason: '新闻分类的请求'    // 请求原因
        });
    })

```

- 在前后端分离的模式下, 后端只需要负责给数据, 对于后端来讲, 更为方便了, 不需要考虑数据怎么渲染到页面上
- 跟vue配合的情况下, html这个东西就不会在服务端出现了
- art-template也不用了 因为我只需要负责传递数据就好了 vue自己本身有模板语法


> Rest 再次解析
- 全称: resource representational state transfer
- 对资源的访问状态的变化 通过url的变化表述出来

- Resource:
- 资源
- 资源rest架构 或者说 整个网络处理的核心

- Representational:
- 某种表现形式 比如用 json xml jpg等

- state transfer:
- 状态变化
- 通过 http method 实现

- rest描述的是在网络中client和server的一种交互形式

- 用大白话来说 就是
    - 通过url就知道要什么资源 
    - 通过http methods就知道要干什么 
    - 通过http status code就知道结果何如

- 比如:
- GET: 
    /task -- 获取所有任务

- POST: 
    /task -- 创建新的任务

- GET: 
    /task{id} -- 通过任务id获取任务

- PUT: 
    /task{id} -- 更新指定id的任务

- DELETE: 
    /task{id} -- 删除指点id的任务

- GET:
- 代表获取一个资源

- POST:
- 代表添加一个资源

- PUT:
- 代表修改一个资源

- DELETE:
- 代表删除一个资源

- server提供的restful api中 url中只使用名词来指定资源 原则上不使用动词

- 用HTTP Status Code 传递server的状态信息
- 比如最常用的200表示成功 500表示server内部的错误

- 总结下 就是用url定义资源用http描述操作

> 优势：
- 1. 风格统一 不会出现 delUser deleteUser removeUser 各种命名的代码了
- 2. 面向资源 一目了然 具有自解释性
- 3. 充分利用HTTP协议本身语义

------

> PUT 和 PATCH 的区别: 局部与整体
- 一个计量单位实体MeasurementUnit，他有name，weight，measurementUnitCategory等多个字段，在这里，我们要只修改weight这个字段，这时应该如何选择呢？

- 通常，我们为了省事，就会直接将修改了weight的完整的MeasurementUnit对象直接传给后台。但是这种做法实际上并不明智，这会浪费大量的网络带宽。

- 但是patch呢，他会只将weight传到制定资源去，表示这是一个局部更新，后端只更新收到的字段。