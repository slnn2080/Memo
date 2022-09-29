### React后台项目的介绍
- 这个项目是一个前后端分离的后台管理的SPA
- 包括前端PC应用 和 后端应用

- 包含了 用户管理 / 商品分类管理 / 商品管理 / 权限管理 等功能模块
- 前端：
  使用 React + Antd + Axios + ES6 + Webpack等技术

- 前台应用负责展现数据 与用户交互 与后台应用交互

- 后端：
  使用：Node + Express + MongoDB等技术
- 采用了模块化 组件化 工程化的模式开发

- 后台应用负责处理前台应用提交的请求 并给前台应用返回json数据

-------------------------

### 整个项目中使用的技术选型
- 前台数据展现 / 交互 / 组件化
    - react
    - react-router-dom
    - antd
    - redux


- 后台应用
    - node
    - mongodb
    - mongoose
    - multer
    - blueimp-md5


- 前后台交互
    - ajax请求
        - axios
        - jsonp
        - promise / async / await

    - 接口测试工具
        - postman


- 模块化
    - ES6
    - Commonjs


- 项目构建 / 工程化
    - webpack
    - create-react-app
    - eslint


- 其它
    - 富文本编程器
        - react-draft-wyslwyg
        - draft-js
        - draftjs-to-html

    - 图表库
        - echarts
        - echarts-for-react

-------------------------

### 前端路由结构
- 可以看文档

-------------------------

### API / 接口
- 全程 前后台交互API接口

- 第一种称呼的含义
- API还可以称之为语法，每种库都有它自己的使用方式 也就是使用文档

- 第二种称呼的含义
- 接口文档， 它分为请求部分 和 响应部分
    - 请求部分： url  post  参数
    - 响应部分： 成功 和 失败 的数据格式

> 重要概念：
- 1. API接口
- 2. 接口文档
- 3. 测试接口
- 4. 对接口
- 5. 调接口
- 6. 联调
<!-- 
  测试接口
  1. 看看这个url可以用不
  2. 返回的数据格式 是否跟文档上的一致 比如 有的是status 有的是code
 -->

- 7. 前后台分离
<!-- 
  一个项目分两个应用写      前后端分离
  所有的代码写在一个应用    前后端不分离
 -->

- 8. mock数据

-------------------------

### 接口文档的结构
- 1. 有整个项目的功能目录
- 2. 根据功能目录每一个功能都有以下的部分
<!-- 
  1. 请求url
      http://localhost:5000/login

  2. 请求方式
      POST

  3. 参数类型

      参数    是否必选    类型    说明
      username  yes     string  用户名


  4. 返回示例

      成功：
        {
          "status" : 0,
          "data" : {
            id
            password
            username
          },
        }
      
      失败：
        {
          "status" : 1,
          "msg" : "用户名或密码不正确"
        }
 -->

-------------------------

### Git来管理我们的项目
- 在我们创建好真正的项目之后 我们首先要对自己的项目进行版本控制

> 1. 我们先去创建一个仓库
- https://github.com/slnn2080/star_admin.git

> 2. 看看项目里的 gitnore 文件
<!-- 
  必要要有
  /.idea
  /node_modules
  /build          这个是打包生成的文件没必要管理
 -->

> 3. git init
- 对本地的项目文件夹 进行git初始化操作，让本地文件夹变成本地仓库

> 4. git add .
- 将文件添加到暂存区

> 5. git commit -m 'init app'
- 提交到版本区
- 这样项目就会提交到本地的最终仓库 默认是master分支

> 6. 在从本地仓库推送到远程仓库之前要进行双方的关联
- git remote add origin https://github.com/slnn2080/star_admin.git
- 起了一个orgin的别名

> 7. git push origin master -u
- 将本地的master分支代码推送到远程仓库的mater分支
- 数据会被推送到远程仓库，远程仓库中就会多了一个master分支

- 注意：
- 我们会将项目推送的master上 但是我们不是在master上工作 而是在dev分支

> 8. 创建一个dev分支
- git checkout -b dev 
- dev是分支的名字 你可以自己起
<!-- 
  这个命令有两个操作一个是创建分支 和 切换分分支

  这个命令输入完后就会切换到dev分支上 而且它是前面的master分支为内容创建的新的dev分支
  也就是说现在dev分支 和 master分支是一模一样的

  这样本地的仓库就会有两个分支，远程仓库只有一个master分支

      本地仓库                    远程仓库

  +-----+   +-----+             +-----+
  +     +   +     +             +     +
  +-----+   +-----+             +-----+

  master      dev               master


  接下来我们要将dev分支推送到远程 这样远程仓库就会生成dev分支
 -->

> 9. 将本地创建的dev分支推送到github上
-  git push origin dev
<!-- 
  这样做之后 远程仓库也会产生新的dev分支
  然后我们就在这个dev分支上做，做完几个模块后再合并
 -->


> 扩展
- 克隆项目
- git clone 仓库地址

- 查看当前分支
- git branch
<!-- 
  只能看到 master 分支 在将远程仓库的项目下载下来后 其实也会把上面的分支一起下载
  只是没有生成分支

  * master
 -->

- 生成本地的dev分支
- git checkout -b dev origin/dev
<!-- 
  这里是根据远程的dev生成本地的dev
  origin是远程仓库在本地的一个别名 origin/dev的dev分支

  然后我们再 git branch
  * dev
    master
 -->

- 拉取远程的dev
- git pull origin dev

-------------------------

### 项目中的目录结构

| - src
  | - api           // ajax相关
  | - assets        // 公用资源
  | - components    // 非路由组件
  | - config        // 配置
  | - pages         // 路由组件
  | - utils         // 工具模块
    - App.jsx       // 应用根组件
    - index.js      // 入口js文件


- reset.css文件定义在public文件中的css文件夹里面

-------------------------

### Antd相关
- 我们的项目使用的Antd的样式 所以要进行引入和配置 关于Antd相关的知识点我都打算写在这里

- 1. 下载
<!-- 
  npm i antd react-app-rewired customize-cra babel-plugin-import less@3.12.2 less-loader@7.1.0
 -->

- 2. 修改package.json
<!-- 
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
 -->

- 3. 配置文件
<!-- 
  const { override, fixBabelImports, addLessLoader } = require('customize-cra')

  module.exports = override(
    fixBabelImports('import', {

      // 这里要看是 antd 还是 mobile
      libraryName: 'antd-mobile',

      libraryDirectory: 'es',
      style: true,        // 更改主题
      // style: 'css',    // 按需引入
    }),

    // 更改主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,

        // 修改存储主题颜色的变量值
        // modifyVars: { '@primary-color': 'red' }
      }
    })
  );
 -->

-------------------------

### 项目： 映射路由
- 我们创建了好了Login Admin组件 首先我们需要在App页面上映射路由
- 我们要使用懒加载
    - import React, {Component, lazy, Suspense} from 'react'

- 我要使用路由
    - import {Route, Switch, Redirect} from 'react-router-dom'

<!-- 
  import Login from './pages/Login'
  const Admin = lazy(() => import('./pages/Admin'))

  <Suspense fallback={<Login />}>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/' component={Admin} />
      <Redirect to='/login' />
    </Switch>
  </Suspense>

  // 老师的写法
  <Suspense fallback={<Login />}>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/' component={Admin} />
    </Switch>
  </Suspense>
 -->

- 要点：
- 1. 懒加载的引入方式：
    const 定义变量 = lazy()   参数是回调 return import 正常引入路径

- 2. Suspense 的属性是fallback 值是 <Login> 组件标签
- 3. Redirect 的属性是to 使用方式相当于一个Link组件¥

-------------------------

### Login页面

### 前台：

> Login页面的静态组件 与 验证
- 在这个环节中我们主要完成 Login页面的静态组件 和 验证的相当逻辑

- 1. Form表单的提交事件 是添加在 Form组件上的
- 2. Form的结构
<!-- 
  <Form>
    <Form.Item>
      <Input />
    </Form.Item>

    // 当有描述文本的时候
    <Form.Item>
      <Form.Item>
        <Input />
      </Form.Item>

      <span> 描述文本的位置 </span>

    </Form.Item>
  </Form>
 -->

- 3. Form组件中的按钮必须要指定 htmlType="submit"
- 要不Form组件身上的onSubmit事件不会触发
<!-- 
  onSubmit={this.handleSubmit}

  <Button 
    type="primary" 
    htmlType="submit" 
    className="login-form-button">
    登录
  </Button>
 -->


> Login页面的前台表单验证
- 当用户输入用户名和密码正确之后 我们点击按钮会发请求 我们要先收集数据
- 也就是说我们要完成 表单验证 和 收集用户输入数据 这两件事情 antd 都能做

- 用户名 密码 验证要求：
- 1. 必须输入
- 2. 必须大于4位 小于12位
- 3. 必须是英文 数字或下划线组成


- 验证时机：
- 实时输入的过程中的验证
- 点击登录的时候统一的验证


> 收集数据
- 一定要给 <Form.Item name> 绑定name属性 不然用户输入的值 没地方放
- 相当于html form表单每一项必须要有 name 属性一样 不然没办法提交 只是这个name属性是添加在 <Form.Item name> 身上的


- 1. 想使用原生onsubmit事件 需要给<Form onFinish事件> 并且指定<Button type>
<!-- 
  1. 给 <Button htmlType='submit'> 组件指定 htmlType='submit'
  2. 给 <Form onFinish={this.handleSubmit}> 组件指定 onFinish 事件
 -->

- 2. 想使用原生onchange事件 需要给<Form onValuesChange事件>


> 表单验证
- 表单验证会在 提交按钮 被点击后触发

- 使用 rules 属性 <Form.Item name='username' rules={[]}>
- rules的类型是一个数组，在数组中的对象里面定义属性 每一种属性 对应一个message提示
  - required    必填写项
  - message     提示信息
  - pattern     正则

<!-- 
  rules={[
    {
      required: true,
      message: '请输入密码',
    },
    {
      pattern:
      message: '请输入xz',
    }
  ]}
 -->


- 验证时机可以使用 validateTrigger 属性 添加在 <Form.Item> 里面
<!-- 
  <Form.Item validateTrigger='onBlur'>

  validateTrigger='onBlur | onFocus'
 -->


- 为了防止出现多条验证失败的信息(并行校验) 我们可以给 <Form.Item validateFirst> 属性 属性值为 boolean | parallel
<!-- 
  validateFirst={true}  阻止并行校验
 -->


**扩展：**
- 上面使用rules定义的验证叫做声明式验证 直接使用别人定义好的验证规则 我们只写了min max


- 下面我们分别看看声明式验证 和 自定义验证的验证都是怎么实现的
> 声明式验证的代码部分
<!-- 
  <Form.Item
    name='username' validateTrigger='onChange' validateFirst={true}
    rules={[
      {
        required: true,
        whitespace: true,
        message: '请输入用户名',
      },
      {
        min: 4,
        message: '密码的最小长度为4'
      },
      {
        max: 12,
        message: '密码的最大长度为12'
      },
      {
        pattern: /^\w+$/,
        message: '用户名必须是英文 数字或下划线组成'
      }
    ]}
  >
 -->


> 自定义验证的代码部分
- 自定义验证在rules数组对象中 书写 validator 属性 它的值是一个函数
- 这个函数必须返回一个 promise
    - promise什么都不传 代表验证通过  Promise.resolve()
    - promise传了代表验证失败        Promise.reject('密码长度必须是6~10位')
<!-- 
  <Form.Item
    name='username'
    validateTrigger='onChange'
    validateFirst={true}

    rules={[
      {
        validator: this.validateUser
      }
    ]}
  >

  validateUser = (_, value) => {
    if(value.length >= 6 && value.length<=10) {

      // 返回的必须是promise对象 不传东西代表验证通过
      return Promise.resolve()
    }else{
        return Promise.reject('密码长度必须是6~10位')
    }
  }
 -->



> <Form> 组件的事件
> onFinish事件 -- onFinish(values) {}
- 会在点击按钮后触发
- 参数：
- values是一个对象，会收集name字段的值到 values 对象中
<!-- 
  <input name='username'>
  <input name='password'>

  当点击按钮后 会将用户输入的值放在对应的name字段里形成一个对象
  values = {username:'xxx', password: 'yyy'}
 -->


> <Form> 组件的事件
> onValuesChange事件 -- onValuesChange(value, allValue) {}
- 相当于原生input的change事件
- 用户输入的值都会实时的存在对应的name字段中
- 参数：
- value：
    用户输入的对应字段的内容会被放入到value对象中
    value: {username: 'sam'}

- allValue:
    所有form组件中拥有name字段的值都会被放入到allValue对象中 没输入到的就是undefined
    allValue: {username: 'sam', password: 'undefined'}


> <Form> 组件的事件
> onFinishFailed事件 -- onFinishFailed(values, errorFields, outOfDate) {}
- 提交表单且数据验证失败后回调事件
- 参数：
- 没试验




> 在<Form>组件中 不能使用setState 需要使用 form.setFieldsValue

------

> 发送请求的部分
- 上面前台页面已经完成了 接下来我们就需要输入用户名 密码 输入正确的格式之后发送请求
- 那就需要有后台的接口 接口我们要查看功能对应的接口文档
- 请求参数最好跟接口文档需要的参数一致 也就是说Html结构中个name名也要一致


> 发送请求前
- 在真正发送请求前 使用postman测试接口 返回数据的格式是否跟api文档一致
- 测试结果可以在postman里面保存起来


> 发送请求的方法
- 使用axios但是使用它的时候会对它进行进一步的包装
- 我们在api文件夹里面创建跟发送ajax相关的文件

<!-- 
  import axios from 'axios'

  export function request(config) {
      const instance = axios.create({
        baseURL: 'localhost:5000'
      })
      return instance(config)
  }

  // 组件中调用
  try {
    let res = await request({
      url:'/login',
      method: 'POST',
      data: values
    })

    console.log(res.data);
    
  } catch(err) {
    console.log(err);
  }
 -->

- 还有尚硅谷老师的方式 根据接口文档定义出不同接口的请求函数
<!-- 
  想知道的详情可以查看 ppt 文档
 -->


### 后台
> 数据库：
- 我们使用了mongodb + mongoose的组合来操作数据库
- 1. mongod 开启数据库服务器
- 2. 数据库中的内容是通过 mongoose 插入的
- 数据库这个部分的逻辑结束


> 后台server
- 1. 入口文件里面 使用mongoose连接数据库 和 启动服务器
- 要点：
  - 1. mongoose.connect().then() 这个方式是一个promise对象 可以使用then()方法来指定成功的回调
  - 2. mongoose的所有方法都是promise对象 好像是！！！
<!-- 
  const express = require('express')
  const mongoose = require('mongoose')
  const AppConfig = require('./config')
  const app = express()

  const appConfig = new AppConfig(express, app)
  appConfig.run()

  mongoose.connect('mongodb://localhost/admin_mongodb', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('数据库连接成功');
    app.listen('5000', () => {
      console.log('服务器启动成功, 请访问: http://localhost:5000')
    })
  })
  .catch((err) => {
    console.log(err);
  })
 -->


- 2. 创建文档 和 操作文档 必须先要有schema model document的其中model就是操作数据库数据的对象，我们把这个部分封装成一个模块，每一套（schema model document）都是一个模块对应的是操作数据库中的一个集合

- 要点：
  - 1. 将操作一个集合的Model对象提取成一个模块
  - 比如 userModel 模块
  - 用来创建对users集合进行操作的对象
    - 1. 创建Schema 创建对字段约束的实例对象
    - 2. 使用mongoose.model()方法来映射要操作的集合 和 对集合使用约束 并得到model对象
    - 3. 使用model对象来对数据库进行操作

    - 4. 对字段进行约束的时候 几乎都是利用了对象

  - 2. 对数据库数据的初始化， 可以利用查找内部进行if判断 当查找不到该用户的时候 我们使用UserModel.create()方法创建文档
<!-- 
  const mongoose = require('mongoose')
  const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    phone: String,
    create_time: {type: Number, default: Date.now},
    role_id: String
  })

  const UserModel = mongoose.model('users', userSchema)
  UserModel.findOne({username: 'admin'}).then(user => {
    if(!user) {
      UserModel.create({username: 'admin', password: 'admin'})
      .then(() => {
        console.log('初始化用户：用户名： admin， 密码：admin')
      })
    }
  })

  module.exports = UserModel
 -->


- 登录接口：
- 逻辑：
- 1. 获取login登录时的用户名和密码 利用数据查询数据库 如果有设置cookie
- 2. 如果没有返回{status: 1, msg: '用户名或密码不正确!'}
<!-- 
  const express = require('express')
  const router = express.Router()

  const UserModel = require('../models/userModel')
  const RoleModel = require('../models/RoleModel')

  router.post('/login', (req, res) => {
    const {username, password} = req.body

    // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
    UserModel.findOnae({username, password: md5(password)})
      .then(user => {
        // 登陆成功
        if (user) { 
          // 生成一个cookie(userid: user._id), 并交给浏览器保存
          res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
        } else {// 登陆失败
          res.send({status: 1, msg: '用户名或密码不正确!'})
        }
      })
      .catch(error => {
        console.error('登陆异常', error)
        res.send({status: 1, msg: '登陆异常, 请重新尝试'})
      })
  })
 -->

- 3. 前端 和 后台都搭建好后 用postman来测试接口

- 4. 跳转到指定页面
- 都好用后 怎么判断用户登录成功 还是失败 我们有res.data里面的结构根据文档就会很清楚
- status 0 就是成功
- status 1 就是失败

- 当用户点击登录按钮后 根据后台数据返回的结果（用户正确才能跳转啊）然后我们通过if判断status的值 如果是成功 则跳转到 用户管理界面
- 要点
- 跳转页面的时候我们是使用push 还是 replace 你要考虑是否能够回退的前一个页面 由于我们的页面是登录页面 那么就不需要使用push
<!-- 
  handleSubmit = async (values) => {
    try {
      let res = await request({
        url:'/login',
        method: 'POST',
        data: values
      })

      // 后台验证成功后我们需要拿到后台返回的用户结果
      // 成功的情况 {status: 0, data}
      // 失败的情况 {status: 1, msg}

      let user = res.data
      // 登录成功
      if(user.status === 0) {
        message.success('登录成功', 2)
        // 跳转到管理界面去 由于Login组件是通过Route渲染出来的里面就会有history对象
        this.props.history.replace('/')
      } else {
        message.error(user.msg, 2)
      }
    } catch(err) {
      message.error('请求出错了：' + err.message, 2);
    }
  }
 -->

-------------------------

### 登录用户信息在其他组件中做展示（登录保持的前置工作）
- 这么做的目的有几种
- 一是在其它页面能够展示用户的登录信息
    因为我们在登录接口发送请求 查询了数据库然后返回了用户信息的结果 我们可以将这个结果共享到其它组件

- 二是我们做状态保持 自动登录会需要
    因为页面的跳转是在前台通过push() 或者 <Link>实现的 这个时候我们就需要将服务器返回的结果 告诉其它组件 其它组件会根据结果做相关的逻辑


> 实现路由组件之间的传递数据
> 1. 我自己的想法 结果是错的
- Login组件中 使用的是 this.history.repalce()来进行的路由跳转 该方法可以接收第二个参数 就是数据
- 本来想通过第二个参数将数据传递到Admin组件 也实现了 但是跟需求不一样 因为这个数据是保存在浏览器的历史记录里面 记录不消失它会一直存在
<!-- 
  // Login组件
  this.props.history.replace('/', user)

  // Admin组件
  const {data} = this.props.location.state
  我们展示的是{data.username}
 -->

- 导致了 Admin组件没办法判断我是否登录了 因为Admin组件要做如果没有登录重定向到登录组件的逻辑



> 2. 方式二 老师创建了一个js文件做为数据的存放点（存在js的变量里相当于存数据在内存中）
- 创建一个 Utils 文件夹 里面放 memoryUtils.js 文件 该文件用于保存数据 和 工具
<!-- 
  export default {
    // 保存当前登录的用户user
    user: {}
  }
 -->

- 在Login组件中，在用户登录成功 验证通过的逻辑里 跳转之前 将user的信息保存到 memoryUtils中
<!--  
  if(user.status === 0) {

    message.success('登录成功', 2)
    memoryUtils.user = user.data

    this.props.history.replace('/')
  } else {
    message.error(user.msg, 2)
  }
 -->

- 在Admin组件根据 memoryUtils 里面的user做判断 如果没有 则重定向到登录页面
<!-- 
  render() {
    const user = memoryUtils.user
    if(!user || !user._id) {
      return <Redirect to='/login' />
    }
  }
 -->

- 上面我们已经能完成一部分逻辑了 就是在跳转到用户管理页面的时候 检查是否登录 如果没有登录就会重定向到Login页面
- 但是有一个问题 我成功登录了后 刷新页面也是会跳转到 Login页面 因为我们相当于将用户信息保存在了内存中 页面刷新js代码重新执行 memoryUtils里面保存的又是{} 所以会直接重定向到Login组件


> 登录的状态保持 自动登录的功能
- 原理：
- 我们利用了 localStorage 的特性 页面刷新 页面关闭 保存在里面的数据不会丢失
- 我们将在Login组件中 用户成功登录后 从数据库返回的user信息 保存在 localStorage 里面
- 1. 保存

- 2. 读取 到 内存中(memoryUtils.js)文件里 也就是将用户数据保存在 memoryUtils.user里
- 我们在index.js入口文件中读取 因为该文件最先执行 

\\ 在utils文件内添加 storageUtils.js 文件
- 该文件用于 存储 读取 和 删除 localStorage 中的数据
- 由于 localStorage 的兼容性不是很好 我们使用了 store 库

> store.js
- 作用跟localStorage一样 但是兼容各种平台 Api简洁
<!-- 
  import store from 'store'

  export default {

    // 保存user
    saveUser(user) {

      // 这里必须保持的是json 所以要转下
      // localStorage.setItem('user_key', JSON.stringify(user))

      store.set('user_key', user)
    },

    // 读取user
    getUser() {
      // 如果有值是一个json格式的字符串
      // 第一次的时候是取不到值的 会返回null 这样不好 最好的是 当没有数据的时候给我返回一个空对象
      // return JSON.parse(localStorage.getItem('user_key') || '{}')

      return store.get('user_key') || {}
    },

    // 删除user
    removeUser() {
      // localStorage.removeItem('user_key')

      store.remove('user_key')
    }
  }
 -->

- 那我们在什么时候保存到localStorage里面呢？
- 在Login组件中 成功登录之后 跳转页面之前
- 也就是想光存在内存中是不够的 因为只在内存中刷新页面会消失 还要存在localStorage里面
<!-- 
  // Login组件
  if(user.status === 0) {
    message.success('登录成功', 2)
    

    memoryUtils.user = user.data

    // 将用户信息保存到local中去
    storeUtils.saveUser(user.data)


    this.props.history.replace('/')
  } else {
    message.error(user.msg, 2)
  }
 -->

- 上面在用户成功登录后将从数据库获取到的用户信息保存到了local中， 那什么时候用呢？
- 刷新页面的时候要读 读到内存中来 我们这里不在Admin组件中读了 而是在入口js文件(index.js)里面读

- 因为入口js文件一上来就会执行 我们用户可能是关掉浏览器再打开 这样的话内存中就没有用户信息了

- 也就是说 我们只有在一上来在从local中读 之后的逻辑直接在内存(memoryutils.js)中读取 这样更快 也不用反复操作local
<!-- 
  import storeUtils from './utils/storageUtils'
  import memoryUtils from './utils/memoryUtils'

  // 读取local中保存的user 保存到内存中
  const user = storeUtils.getUser()
  memoryUtils.user = user

  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  , document.getElementById('root'))
 -->


> 整体逻辑
<!-- 
  在用户成功登录后会将用户信息保存在 local 中 和 内存中

  App组件
  local 将 user 交给 内存 memoryUtils

  Admin组件
  从内存 memoryUtils 中读取信息 做是否重定向的判断
 -->

- 上面有一个问题 我们已经成功登录了 跳转到Admin组件也不会产生重定向的问题 但是 我们在网址输入/login接口还是能访问到

- 这样不好 因为我们已经成功登录就不应该再次的能访问Login登录页面
- 怎么做? 
<!-- 
  // login组件的 render() {}里
  render() {
  const {user} = memoryUtils

    // 还可以严禁一些 user && user._id
    if(user) {
      return <Redirect to='/' />
    }

  return (
    <div className='login'>
  }
  
 -->

-------------------------

### 搭建 Admin 界面结构
- 我们可以选择Antd中的布局组件来帮组我们搭建结构
<!-- 
  import { Layout } from 'antd';
  const { Header, Footer, Sider, Content } = Layout;
 -->

- 同时我们左侧导航 和 头部还是有一些复杂 我们将它们两个抽取成组件

> 左侧导航栏的区域
- 我们使用antd当中的 Menu菜单 组件
<!-- 
  import { Menu, Button } from 'antd';
  import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
  } from '@ant-design/icons';

  const { SubMenu } = Menu;

  菜单 -- 菜单项 -- 如果菜单项也是个菜单就成为子菜单

  Menu        是菜单组件
  Menu.Item   是菜单项
  SubMenu     子菜单

  <Menu
    mode="inline"
    theme="dark"
  >
    <Menu.Item key="1" icon={<PieChartOutlined />}>
      首页
    </Menu.Item>
    <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
      <Menu.Item key="2" icon={<MenuUnfoldOutlined />}>品类管理</Menu.Item>
      <Menu.Item key="3" icon={<MenuFoldOutlined />}>商品管理</Menu.Item>
    </SubMenu>
    <Menu.Item key="4" icon={<AppstoreOutlined />}>
      用户管理
    </Menu.Item>
    <Menu.Item key="5" icon={<PieChartOutlined />}>
      角色管理
    </Menu.Item>
    <SubMenu key="sub2" icon={<MailOutlined />} title="图标图形">
      <Menu.Item key="6" icon={<DesktopOutlined />}>品类管理</Menu.Item>
      <Menu.Item key="7" icon={<ContainerOutlined />}>商品管理</Menu.Item>
    </SubMenu>
  </Menu>
 -->


> 中间内容区域
- 我们能发现 点击左侧按钮后 内容区域会显示不同的组件 也就是内容都是当前admin组件的子路由

> 子路由
- 路由组件在哪个组件中映射就看它在哪个组件显示
- 我们观察下二级路由会发现需要在Admin组件里面写

- 所以 Admin组件 中的 Content 区域放路由组件
<!-- 
  // Admin组件
  <Content style={{backgroundColor:'#fff'}}>
    <Switch>
      <Route path='/home' component={Home}/>
      <Route path='/charts' component={Charts}/>
      <Route path='/charts/bar' component={Bar}/>
      <Route path='/charts/line' component={Line}/>
      <Route path='/charts/pre' component={Pre}/>
      <Redirect to='/home' />
    </Switch>
  </Content>
 -->


 > 点击左侧导航区 进行 路由跳转
 - 二级路由因为都是在Admin组件里面显示的 所以我们在Admin组件 使用了<Route>
 - 接下来我们需要点击按钮进行跳转 导航按钮我们定义在 <LeftNav> 组件
 - 所以接下来我们要在 <LeftNav> 组件完成该逻辑
 <!-- 
  <Menu.Item key="1" icon={<PieChartOutlined />}>
    首页
  </Menu.Item>

  每一个结构都是这样的 其实很简单 我们将文字部分使用<Link>包裹起来就可以

  <Menu.Item key="1" icon={<PieChartOutlined />}>
    <Link to='/home'>首页</Link>
  </Menu.Item>
  -->


> 动态生成 菜单项
- 我们现在的做法是将左侧导航区的个数写死了 这样以后要是想增加导航的话我们需要修改源文件 死的太死了 以后的扩展性不是很强

- 解决上面的问题可以创建一个关于 菜单的信息
<!-- 
  导航菜单配置: 
  | - config
    - menuConfig.js
-->

- 我们观察下 菜单中都需要什么样的信息 有菜单项 和 子菜单
- 我们需要的是key icon title(显示文本) 
<!-- 
  // 看下title的结构
  <Menu.Item key="1" icon={<PieChartOutlined />}>
    首页
  </Menu.Item>

  <SubMenu key="sub2" icon={<MailOutlined />} title="图标图形">
    <Menu.Item key="6" icon={<DesktopOutlined />}>品类管理</Menu.Item>
  </SubMenu>
 -->

- 我们可以将数据组织成这样的结构 如果是二级菜单的话 里面追加上 children数组
- 要点：
  - key：我们可以将/home路径当做key 这样也能保证唯一性
  - 权限：后面的权限管理功能就要整理成这样的结构不然没办法做
  - 这样每一菜单栏里面的item就对应成数组中的一个对象
<!-- 
  const menuList = [
    { 
      title: '首页', 
      key: '/home',
      icon: 'home'
    },
    { 
      title: '商品', 
      key: '/products', 
      icon: 'appstore', 

      // 2级菜单
      children: [ 
        { 
          title: '品类管理', 
          key: '/category',  
          icon: 'bars'
        },
        { 
          title: '商品管理', 
          key: '/product', 
          icon: 'tool'
        }
      ] 
    }
  ]
 -->

- 数据结构搭建好后根据数组动态的生成结构
- 注意：
- 我们是将数据结构在Menu的里面生成
<!-- 
  <Menu>
    遍历数据结构
  </Menu>
 -->

- 上面的数据结构中 如果没有children属性的那就是一级标签 如果有children属性的那就是二级标签
- 也就是说我们需要判断 是否有children属性
<!-- 
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
   
      // 最终map需要返回一个标签结构 要么返回<Menu.Item> 要么是 <SubMenu> > Menu.Item 那到底是哪一种我们得判断吧 看看是否有children
      if(!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
        
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            <Menu.Item key={item.children.key} icon={item.children.icon}><Link to={item.children.key}>{item.children.title}</Link></Menu.Item>
          </SubMenu>
        )
      }
    })
  }
 -->

- 一级菜单项没问题的显示出来了 那二级菜单项没有显示出来 原因在于children是一个数组 数组能item.children.key? 不能吧

- 那怎么处理二级菜单项？

> 递归调用 再次调用一次 getMenuNodes方法 传递 item.children
<!-- 
  getMenuNodes = (menuList) => {
    return menuList.map(item => {

      if(!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
        
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>

            // 递归调用 getMenuNodes
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        )
      }
    })
  }
 -->

> 总结：
- 1. 生成二级菜单要使用 递归调用 因为是在if条件里面应用 没问题
- 2. if(item.children) 是找有children属性的大对象
- 3. getMenuNodes()要将mapreturn出来
- 4. 把key定义为路径 好处还挺多 又可以少写一个属性 又可以跟Menu组件动态展示谁挂钩


> 第二种生成 二级菜单的方式 reduce() + 递归
<!-- 
  getMenuNodes = (menuList) => {
    // reduce是用来做累计累加的 我们现在要根据一个数据的数组生成一个标签的数组 我们可以创建一个空数组 不断的往里塞需要展示的标签 这不就是累加么
    return menuList.reduce((pre, item) => {

      // 向pre中添加<Menu.Item> 或者添加 <SubMenu>
      if(!item.children) {

        // 我们往pre里添加要展示的结构 里面的第二个()是用来包裹结构的
        pre.push((
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        ))
      } else {

        pre.push((
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        ))
      }

      return pre
    },[])
  }
 -->


> 状态保持
- 我们现在有一个问题 比如我选中了一个菜单项 当页面刷新的时候 会重新渲染页面 我浏览的状态并没有保存 用户体验不是很好
- 也就是说 刷新后应该显示 当前路径对应的菜单项
<!-- 
  /user
  那么就要选中 菜单中的用户管理按钮就应该被选中
 -->

- Menu组件中 defaultSelectedKeys 属性代表上来的时候默认选中谁
<!-- 
  defaultSelectedKeys={['/home']}
  上来 home 按钮就会被选中 可是我们不能写死 它要跟当前的请求路径有关系

  所以我们要获取当前请求路径 路由组件中的location对象的pathname属性 就是/user
 -->

- 我们可以在 <LeftNav>组件的render里面 渲染之前 先获取路径 然后将路径给属性
<!-- 
  // 获取pathname 将它作为key 给Menu组件的 defaultSelectedKeys
  const path = this.props.location.pathname
  console.log(path);

  defaultSelectedKeys={[path]}
 -->


> 包装 非路由组件 withRouter
- 但是  <LeftNav> 组件并不是路由组件 所以没有this.props.location会报错
- 我们使用 withRouter 用它来包装组件 使其拥有路由组件的方法
<!-- 
  export default withRouter(LeftNav)
 -->

- 它是一个高阶组件 用来包装非路由组件 返回一个新的组件 新的组件向非路由组件传递3个属性 history location match


- 如果我请求 http://localhost:3000/ 根路径 会直接跳转到/home 为什么呢？ 什么跳转过来后 左侧导航条的按钮并没有被选中呢？

- 第一个为什么？
- 因为地址栏上直接输入 会通过 Route 渲染对应的组件
<!-- 
  <Route path='/login' component={Login} />
  <Route path='/' component={Admin} />
 -->

- 如果我们输入了上面的路径 会匹配到 Admin 组件
- 然后会渲染 Admian组件 因为没有匹配到路径 会被 Redirect 到home
<!-- 
  // Admin组件
  <Route path='/home' component={Home}/>
  <Route path='/charts/pre' component={Pre}/>
  <Redirect to='/home' />
 -->


- 第二个为什么？
- 为什么左侧导航栏在看到/home路径后 并没有被选中
- 因为我们用户输入 http://localhost:3000/ 请求的是 Admin组件
- 而Admin组件被渲染的同时 LeftNav已经被创建了 
<!-- 
  // Admin组件里面
  <Sider>
    <LeftNav />
  </Sider>
 -->

- 它被创建的同时 就会拿到path 根据path决定哪个按钮被选中 但是这个环节拿到的是 /
<!-- 
  defaultSelectedKeys={['/']}
 -->

- defaultSelectedKeys={['key']}
    它只是在初次渲染的时候指定一次

- 修改为 另一个属性

- selectedKeys={['key']}
    它会动态的决定谁被选中


> 功能性bug 刷新页面 保持二级菜单展开
- 上面我们选中二级的菜单项 刷新页面 是选中了 但是菜单没有展开被隐藏在里面了
- 怎么指定展开谁呢？
- 我们使用 Menu组件的 defaultOpenKeys属性
- defaultOpenKeys：string[]

- 思路：
- 导航按钮的区域 我们是根据数据动态生成的 有children的为2级菜单
<!-- 
  商品
  用户
  图表        有children属性
    饼状图
    柱状图    当前路径为  key: /bar 
    折线图
 -->

- 我们在上面根据 if(!item.children) 是否存在children属性判断是否是二级菜单 有children才可能需要展开 如果是二级菜单 就找它的子项 条件是 跟 网址的路径(/bar) 和 item.key 一样的对象

- 然后我们判断这个对象是否存在 如果存在就把item.key保存在 组件自身上(this) 然后交给 defaultOpenKeys：string 使用
- 这里有点要注意 保存的是item.key 而不是 item.children.key  item.key才是能展开的

<!-- 
  if(!item.children) {
    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.key}>{item.title}</Link>
      </Menu.Item>
    )
    
  } else {

    let cItem = item.children.find(item => {    // 目标对象
      return item.key === path
    })

    console.log('f', item);   // 测试用

    if(cItem) {
      this.openKey = item.key // 这里只会找有目标对象的item

      console.log('l', item); // 测试用
    }
  }
 -->

- 这样它就能在刷新的时候自动的展开对应的二级菜单了
- 但是还有一个代码的执行顺序的问题
<!-- 
  render() {

    let {openKey} = this  所以这个地方得到的只能是 undefined

    <Menu
      mode="inline"
      theme="dark"
      // defaultSelectedKeys={[path]}
      selectedKeys={[path]}
      defaultOpenKeys={[]}
    >

      {
        this.getMenuNodes(menuList)     我们在这才执行函数
      }
    </Menu>
  }
 -->

- 所以我们换下代码的位置
<!-- 
  render() {
    // 
    const MenuNodes = this.getMenuNodes(menuList)
    let {openKey} = this

    return (
      <Menu
        mode="inline"
        theme="dark"
        // defaultSelectedKeys={[path]}
        selectedKeys={[path]}
        defaultOpenKeys={[openKey]}       这样就能把正确的openKey放在这里了
      >

        {
          MenuNodes
        }
      </Menu>
    )
  }
 -->


- 这里面还有一个问题
- 我们需要根据数据遍历的 但是render每次一执行 this.getMenuNodes(menuList) 就会又执行一遍 视频里是选择项 创建节点的功能放在componentWillMount() 里面了

- 可这个方法即将废弃了怎么办
<!-- 
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList)
  }
 -->

- componentWillMount  在第一次render之前
- componentDidMount   在第一次render之后

-------------------------

### 搭建 Header组件 静态部分
- 这个部分是静态组件的搭建没有什么难的地方 有个问题就是天气的应用 
- 视频里面使用的是百度的Api 需要注册为他们的开发者 才会颁发一个 AK
- 就是相当于密码 使用这个AK在请求中拼接进去 才能使用接口 但是百度的天气API不能用了


> 天气功能的总结
- 1. 我们拿到接口后可以利用postman去查数据的格式 和 需要的信息


> jsonp的库
- 2. 项目中要是使用jsonp发送请求的话 我们一般会在github上下载 jsonp 的库
- https://github.com/webmodules/jsonp
- $ npm install jsonp


> jsonp库的语法
> jsonp(url, opts, fn)
- url： 
- opts选项对象： 都有默认值 它可以不配 传递一个空对象就可以
    - params： 指定回调的名字 默认 callback 可以配可以不配
    - timeout：默认60s
    - fn：
      - 参数
      - err   如果有值说明失败了 没有值说明成功了
      - data  成功的数据 里面有status date results等 就是我们需要用的数据

- 要点：

> 对jsonp库的封装
- 我们在使用这样的工具的时候都要进行一遍封装 然后再使用
- 我们这是在Api文件夹里跟请求相关的模块里操作的
<!-- 
  let url = http://api.map.baidu.com/telematics/v3/weather?location=xxx&ou tput=json&ak=3p49MVra6urFRGOT9s8UBWr2

  // 上面的url中 location 要填写对应的地址 我们可以让外部告诉我们 调用该函数的时候需要传递进来 city
  let url = http://api.map.baidu.com/telematics/v3/weather?location=${city}&ou tput=json&ak=3p49MVra6urFRGOT9s8UBWr2

  

  export const reqWeather = (city) => {

    jsonp(url, {}, (err, data) => {
      
      // 我们发起的是jsonp请求 那就会有成功和失败 我们要判断下
      if(!err && data.status === 'success') {

        // 这里我们要照着数据格式去看 怎么获取对应的数据
        data.results[0].weather_data[0].weather
        data.results[0].weather_data[0].dayPictureUrl

        // 我们可以对上面的内容进行结构
        const {weather, dayPictureUrl} = data.results[0].weather_data[0]

      } else {
        // 如果失败
      }

    })
  }

  reqWeather('北京')



  - 上面解析了下 应该怎么使用 接下来我们要思考 怎么把数据交出去 在回调里面拿到了 没有用吧 一般我们都会使用 promise 将数据传递出去

  1. 
  export const reqWeather = (city) => {
    return Promise((resolve, reject) => {

    })
  }

  2. 
  export const reqWeather = (city) => {

    // 使用promise来将请求结果传递出去
    return Promise((resolve, reject) => {

      jsonp(url, {}, (err, data) => {

        // 成功
        if(!err && data.status === 'success') {
        const {weather, dayPictureUrl} = data.results[0].weather_data[0]

        // 这里交出去的竟然是 {weather, dayPictureUrl} 不是 weather, dayPictureUrl 也是我们需要传递一个参数
        resolve({weather, dayPictureUrl})

        // 失败
        } else {
          // 我们也可以在这把err传出去
          rejecet(err)

          // 也可以在这打印 错误信息 外面用catch统一处理错误
          alert('获取天气信息失败')
        }
      })
    })
  }

 -->
    

> jsonp请求的原理
- 它只能解决ajax请求跨域的问题 但是只针对get请求
- 它的本质是一般的get请求

- 它的原理：
  - 浏览器端：
    - 动态生成<script>来请求后台接口 src就是接口的url
    - 定义好用于接收响应数据的函数，并将函数名通过请求参数提交给后台 比如 callback=fn

  - 服务器端：
    - 接收到请求处理产生结果数据今后，返回一个函数调用的js代码 并将结果数据作为实参传入函数调用

  - 浏览器端
    - 收到响应自动执行函数调用的js代码 也就执行了提前定义好的回调函数 并得到了需要的结果的数据
<!-- 
  - 浏览器端：  
    - 浏览器是通过script标签去发送请求 script标签是用来获取js代码数据的 所以服务器要返回的是一段js代码

    - 后台返回的是函数执行的语句代码 实参是数据
    - 浏览器端在使用jsonp库的时候 传递的第三个fn 就是用来处理data的

  - 服务器端：
    - 服务器端接收到浏览器端传递过来的callback 然后它会调用 并 传递数据
    - fn&&fn(data)
 -->


### 百度地图开放平台 信息
- 访问应用Ak
- IsrIX76G3A88FAGVGRGoBO94EsP3zIGE

- 应用名称
- slnn

- 应用编号
- 24728251

-------------------------

### 搭建 Header组件 动态部分
- 头部组件是一个动态的组件 其中需要变化的地方有
- 1. 时间部分
- 2. 天气部分
- 3. 用户显示部分
- 4. 显示当前处于哪个页面的title

- 既然页面需要不断的变化 那就说明 state 中的数据在不断的更新 所以首先我们要初始化state

> 1. 时间部分
- currentTime: 
- 应该是当前时间是么 Date.now()
<!-- 
  这里我们需要对时间戳进行格式化 我们在utils文件夹里面定义 时间格式化的模块文件
  | - utils
    - dateUtils.js


  export function formatDate(time) {
    if(!time) return ''

    let time = new Date(time)
    let YY = time.getFullYear()
    let MM = time.getMonth() + 1
    let DD = time.getDate()
    let h = time.getHours()
    let m = time.getMinutes()
    let s = time.getSeconds()

    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s

    return `${YY} / ${MM} / ${DD}  ${h}:${m}:${s}`
  }

  这里注意我们是 export 导出的并不是默认暴露 所以引入的方式要注意
  import {formatDate} from '../../utils/dateUtils'

  state = {
    currentTime: formatDate(Date.now())
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        currentTime: formatDate(Date.now())
      })
    }, 1000)
  }


  注意：
  开启定时器 是异步的 我们放在componentDidMount里面
  它是在第一次render之后执行 我们在这里执行异步操作 比如ajax 定时器
-->

**注意：**
- 开启定时器后的组件 每秒render里都会执行一次 写在里面的逻辑每秒都会重新执行一遍



> 4. title部分
- 思路：
- 1. 我们先在得到地址栏上的 资源部分 /user 我们使用withRouter高阶组件
- 注意： 这个资源部分会根据用户点击来自动生成 它本身就是动态的
<!-- 
  可以从location路由组件的对象上获取
  let {pathname} = this.props.location

  export default withRouter(AdminHeader)
 -->

- 2. 根据这个pathname去 /config/menuConfig.js 这里面找跟key匹配的对象取出这个对象的title

> 老师的方法
- 老师的思路是：
- 1. 用户点击按钮会引起 地址栏的变化 我们可以获取到动态的/pathname
<!-- 
  可以从location路由组件的对象上获取
  let {pathname} = this.props.location

  export default withRouter(AdminHeader)
 -->

- 2. 我们拿着/pathname 去找menuList的数据结构 根据pathname 动态的找到对应的对象的title数据
<!-- 
  根据这个pathname去 /config/menuConfig.js 这里面找跟key匹配的对象取出这个对象的title
 -->

- 3. 遍历方式
- 老师使用的是对 menuList 进行两层遍历
<!-- 
  getTitle = () => {
    let {pathname} = this.props.location
    let title = ''
    menuList.forEach(item => {
      // 如果当前当前item对象的key与pathname一样 item的title就是需要显示的title 但是并没有结束如果找到了就结束 找不到要继续看看有没有children
      if(item.key === pathname) {
        title = item.title

        // 再加一个条件 如果有children 继续匹配
      } else if(item.children) {

        // 这个cItem不一定有值 所以要做判断
        const cItem = item.children.find(cItem => cItem.key === pathname)
        if(cItem) {
          title = cItem.title
        }
      }
    })

    return title
  }
 -->

- 4. 这样我们就得到title了 因为这个title是根据用户点击变化的 所以我们拿到title之后直接在html结构中展示就可以了


> 我的方法
- 思路：
- 最开始的时候跟老师是一样的根据/pathname去 menuList 找对应的数据结构中的title
- 这里我选择了find方法 期间遇到了问题 就是find怎么将找到的对象返出去
<!-- 
  但是这个title有可能是1级的title 也有可能是2级菜单的title 我们的数据结构如下
  const menuList = [
    { title: '首页', key: '/home', icon: 1 },
    { title: '商品', ey: '/products', icon: 1,
      children: [
        { title: '品类管理', key: '/categroy', icon: 1 },
        { title: '商品管理', key: '/product', icon: 1 }
      ]
    }
  ]


  // 错误的做法
  function findItem(target) {
    let res = {}

    res = target.find(item => {
      if(!item.children) {
        return item.key === path
      } else {

        // 这里是二级菜单的情况 但是没有return 所以结果会是undfined
        item.children.find(item => {
          return item.key === path
        })
      }
    })

    return res
  }


  // 正确的做法
  getTitle = (arr) => {
    let {pathname} = this.props.location
    let res = arr.find(item => {
      if(!item.children) {
        return item.key === pathname
      } else {
        return item.children.find(item => {
          return item.key === pathname
        })
      }
    })

    return res 
  }

  注意用find方法的时候 不一定能找到结果 我们最好做判断 类似下面这样
  const cItem = item.children.find(cItem => cItem.key === pathname)
    if(cItem) {
      title = cItem.title
    }
 -->

- 2. 拿到了title文本后 我的思路就乱了
- 我认为想让页面变化就要从state中下手 我就初始化了state title
- 然后创建了方法 想给按钮再绑定点击事件 触发setState
<!-- 
  showTitle = () => {
    let item = this.getTitle(menuList)
    this.setState({
      title: item.title
    })
  }
 -->

- 我让整个逻辑乱了起来 和 复杂了起来
- 其实很简单 地址栏的路径 每次用户点击的时候就是变化的 我们拿到title后直接在DOM结构中展示就可以了 这样路径是什么 title 就是什么

-------------------------

### Header组件 退出登录功能
- 点击 退出 按钮后
  1. 显示一个模态框 点击取消不退出 点击确认退出
  2. 用户点击确认后 在成功的回调中 删除保存的user数据 跳转到login界面

- 主要的逻辑是把存储的数据 干掉
- 删除数据的地方有两个一个是 内存中的(一个js文件) 一个是local中的

- 我们需要使用 Antd 中的Modal对话框

> Modal对话框
- 引入 复制 使用
- 这个Modal对话框 antd里面提供了一个回调 我们要给按钮绑定点击事件 然后回调函数的内容就是我们复制的内容
<!-- 
  antd里面是这样的形式
  function showConfirm() {
    confirm({
      。。。
    });
  }

  我们只使用 这个部分 当事件的回调
  confirm({
    。。。
  });
 -->

- 属性
  - title
  - content 这两个写一个就可以

  - onCancel
    没有特殊的要求 这个可以不写

  - onOk

  - destroyOnClose
    关闭时销毁 Modal 里的子元素
    用于重新渲染里面最新的元素 很有用

- 注意：
- 示例中的onCancel onOk都是普通函数的写法 放在我们的类似组件里面要改成箭头函数 不然this的指向是undefined
<!-- 
  onOk() {
    this.props.history.replace('/login')
  }

  改成

  onOk: () => {
    this.props.history.replace('/login')
  }
 -->

-------------------------

### 商品 / 品类管理 组件

### 商品 / 品类管理 前台
- 我们先说说整个 Category 组件里用到了antd的什么组件
- 1. card组件
  整个品类管理就是用的这个card组件 感觉像是在用它布局
  https://ant.design/components/card-cn/

- 2. Table组件
  在card组件的下面部分里面插入了Table组件 Table组件可以自己带分页

- 也就是说我们是用 Card组件 来布局
<!-- 
  return (
    <Card>

    </Card>
  )
 -->

> Icon组件
- 4.x以后没有<Icon>这样的写法了 我们要使用的话 要从下面引入
<!-- 
  import { 引入组件 } from '@ant-design/icons';
 -->

- 属性：
  - rotate：  number
    图标旋转角度（IE9 无效）

  - spin    	boolean
    是否有旋转动画

  - style     	CSSProperties
    设置图标的样式，例如 fontSize 和 color

  - className   设置图标的样式名

  - twoToneColor	string (十六进制颜色)
    仅适用双色图标。设置双色图标的主要颜色
<!-- 
  import { PlusOutlined } from '@ant-design/icons'
  <PlusOutlined />
 -->



> Card组件
- 通用卡片容器。最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。
- <Card title="卡片标题">卡片内容</Card>

- 属性：
  - bodyStyle：   CSSProperties
    内容区域自定义样式

  - bordered：    	boolean
    是否有边框

  - defaultActiveTabKey   string	第一个页签
    初始化选中页签的 key，如果没有设置 activeTabKey

  - headStyle：   CSSProperties
    自定义标题区域样式
<!-- 
  <Card 
    title={title} 
    extra={extraNode}
    headStyle={{fontSize: '14px', fontWeight: 400}}
  >
 -->

  - hoverable   	boolean	false	
    鼠标移过时可浮起

  - size    default | small	default	
    card 的尺寸

  - title  	ReactNode
    卡片标题 card组件上部分文本

  - extra   ReactNode
    卡片右上角的操作区域 More部分的 或者可以定义成按钮

  - onTabChange   	(key) => void
    页签切换的回调


  
> Table组件
- 它先声明了两个数组 一个是字段的数据数组 一个是内容的数据数组
<!-- 
  columns 和 dataSource

  columns主要定义的是 列的字段名 key 
  
  dataIndex主要是该列显示dataSource中的哪个部分是age name？ 还是address

  columns是数组 每一列是数组里面的一个对象
 -->

- 然后 <Table 数组1 数组2> 组件标签中传递了 刚才定义的数组变量


> pagination 分页器
<!-- 
  pagination={{
    defaultPageSize: 4,       // 每页显示几条
    showQuickJumper: true     // 是否点击后进行跳转
  }}
 -->


> 表格数据 loading 动画展示
- 使用 table 组件中的 loading 属性


> 上面部分
- 上面部分我们主要完成 标题 和 添加按钮的操作
- 标题：
- 我们通过 <Card title=''> title属性来指定

- 按钮：
- 我们通过 <Card extra={ReactNode}> extra来指定
<!-- 
  let extraNode = (
    <Button type='primary'>
      <PlusOutlined /> <span>添加</span>
    </Button>
  )
  return (
    <Card title={title} extra={extraNode}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  )

  卧槽还可以这么用啊
 -->


- 我们使用<Table>组件搭建下面的部分 
- 表格的 <Columns>组件中的 render属性 就用来生成复杂的结构的
<!-- 
  let columns = [
  {
    title: '分类的名称', 
    dataIndex: 'name', 
    key: 'name',
    onHeaderCell: () => ({style:{textAlign: 'center'}})
  },
  {
    title: '操作', 
    width: 300,
    align: 'center',
    render: () => {
      return (
        <>
          <Button type='link'>修改分类</Button><Button type='link'>查看子分类</Button>
        </>
      )
    },
    onHeaderCell: () => ({style:{textAlign: 'center'}})
  }
]

  <Table dataSource={dataSource} columns={columns}></Table>
 -->


- 上面完成的是 静态的数据 但是真实开发中 页面刚上来应该是空的 然后我们从后台捞数据拿回来在前台来显示
- 所以不能的接口我们要发不能类型的请求 同时也要注意 后台接收参数的 参数类型
- 请求接口
- 添加接口
- 修改接口


> 动态显示一级列表
- 发请求获取一级列表的数据 请求的数据要放在state里面 一更新状态数据就会重新渲染
<!-- 
  我们页面显示的一级列表的数据 就在组件的状态里面 好处就是更新状态组件就会重新渲染
  发请求 --- 得到数据 --- 更新状态
 -->

- 上面我们<Table>组件使用的 dataSource 不是规定的 而是我们在组件 state 中存放的 category
<!-- 
  state = {
    // 一级分类列表
    category: []
  }
 -->

- 也就是说 我们页面上的 表格内容 一上来就应该是空的 是根据请求回来的数据来动态的展示 那么很简单 我们应该这么操作
<!-- 
  <Table 
    // 这里 category 是从 this.state 中读取的
    dataSource={category} 

    columns={columns}
    bordered={true}
  ></Table>
 -->


> componentDidMount 中 发送请求
- 异步请求数据的时候 我们在componentDidMount中 执行异步任务
- 这个生命周期函数中不要写太复杂的逻辑 一般我们都会把复杂的逻辑拿出来定义成一个函数 在这个生命周期函数中调用即可

- 从数据库得到数据 动态显示在页面上的流程
- 1. 在state中对 Table组件的数据 进行初始化
- 2. 在render中 从state中获取 Table组件的数据 根据这个数据显示在页面上
- 3. 在componentDidMount中发送请求 请求Table组件需要的数据
<!-- 
  请求 -- render 从 state 中读取 -- 渲染
 -->

- 首先
  - 我们创建请求函数 内部定义 发起请求列表数据的函数 请求结果保存在state中
  - 在componentDidMount中调用
  - 在 ReactNode 中是使用state中保存的数据
<!--  
  1. 
  state = {
    category: [],
  }


  2.
  getCategoryList = async (parentId) => {

    // 在发送请求前 设置loading的状态为 true 展示动画
    this.setState({ loading: true })

    let res = await request({
      url: '/manage/category/list',
      method: 'GET',
      params: {
        parentId
      }
    })

    let category = res.data

    // 得到请求结果后设置为 false 不用管是否得到数据 反正请求结束了
    this.setState({ loading: false })

    if(category.status === 0) {
      message.success('请求成功', 2)
      this.setState({
        category: [...category.data]
      })
    } else {
      message.error('请求失败，请重新尝试', 2)
    }
  }


  3. 
  componentDidMount() {
    this.getCategoryList('0')
  }


  4. 
  <Table 
    dataSource={category} 
    columns={columns}
    bordered={true}
    pagination={{
      defaultPageSize: 4,
      showQuickJumper: true
    }}
    logding={loading}
    rowKey='_id'
  ></Table>
 -->



> 表格数据 加载 动画
- table组件中有一个loading属性 当设置为true的时候 会开启loading动画 当为false的时候没有
- 也就是说我们数据回来后应该是false 数据回来前应该是true
- 我们要在state中初始化 控制 loading 属性的状态
<!-- 
  state = {
    // 一级分类列表
    category: [],

    // 是否正在获取中
    loading: false
  }
 -->

- 我们在发送请求前 将 loading 设置为 true
<!-- 
  state = {
    // 一级分类列表
    category: [],
    loading: false
  }

  // 请求分类列表函数
  getCategoryList = async (parentId) => {


    // 在发送请求前 设置loading的状态为 true 展示动画
    this.setState({ loading: true })


    let res = await request({
     ...
    })
    let category = res.data


    // 得到请求结果后设置为 false 不用管是否得到数据 反正请求结束了
    this.setState({ loading: false })

    if(category.status === 0) { ... }



    // 结构中
    <Table 
      logding={loading}
    ></Table>
 -->


> 动态展示 二级列表
- 我们看下 当点击 查看子分类 的按钮 后应该完成的效果

- 1. 点击按钮后展示二级列表
- 2. 当前二级列表对应着哪个一级列表的title 也要在页面展示
<!-- 
  比如 展示电视的时候 同时在 title的位置要展示 家用电器

  家用电器

        电视
 -->

- 思路：
- 0. 我们先初始化几个属性
<!-- 
  state = {
    // 一级分类列表
    category: [],
    loading: false,

    // 当前需要显示的分类列表的parentId 也就是说我们默认获取一级列表请求
    parentId: '0',

    // 二级分类列表的初始化：
    subCategory: [],

    // 展示二级列表时的 title 因为上来默认展示一级列表所以是空串
    parentName: ''
  }
 -->

> 1. 表格渲染 一级列表 还是 二级列表
- 表格的渲染是根据 state 中的数据 渲染的 我们可以在state中初始化一级列表 和 二级列表 然后判断展示一级列表 还是 二级列表 根据什么条件 后面再说 可以先看看
<!-- 
  <Table 
    dataSource={parentId === '0' ? category : subCategory} 
  >
 -->

> 2. 发起请求 发起一级列表 还是发起二级列表的请求
- 我们有之前的 getCategoryList函数 该函数是用来发起请求 将获取的数据存放在state中 从而因为页面的更新

- 但是现在我们不仅要发起一级列表的请求 还要发起二级列表的请求 怎么处理？
- 发起请求的时候 我们需要 parentId 我们就将 parentId 放在state中 根据state中的parentId来发起请求
- 这样 默认发起 一级列表请求，当想发起二级列表请求的时候 在发起请求之前修改state中的parentId就可以了
<!-- 
  state = {
    // 当前需要显示的分类列表的parentId 也就是说我们默认获取一级列表请求
    parentId: '0',
  }


  // 请求分类列表函数
  getCategoryList = async () => {

    // 发起请求前获取 state 中的 parentId 根据这个id请求对应的列表
    let {parentId} = this.state

    let res = await request({
      url: '/manage/category/list',
      method: 'GET',
      params: parentId
    })
  }


  // 发起二级请求的时候 先修改state中的parentId 然后在发起请求
  showSubCategory = (category) => {
    this.setState({parentId: category._id, parentName: category.name}, () => {
      this.getCategoryList()    // 发起请求的函数
    })
  }
 -->


> 3. 将请求回来的数据 存到state中对应的 一级列表 和 二级列表里
<!-- 
  state = {
    // 一级分类列表
    category: [],

    // 二级分类列表的初始化：
    subCategory: [],
  }
 -->
- 我们发起请求后得到的数据 有两种情况一种是一级列表 一种是二级列表 我们要想办法将请求回来的数据存到对应的状态里面 我们可以根据 parentId === '0' 因为 parentId为0是默认值 代表它默认是一级列表
<!-- 
  if(parentId === '0') {
    this.setState({ category: [...category.data] })
  } else {
    this.setState({ subCategory: [...category.data] })
  }
 -->


> 4. 点击 查看子分类 按钮修改parentId 发起二级列表请求
- 我们点击  查看子分类 要发起二级列表的请求，那么我就要知道父分类的id是多少 我们是根据父分类的id发起二级列表的请求 所以在给  查看子分类 按钮绑定事件回调的时候 我们还要知道点击按钮的父分类id是多少

> 要点1
- render属性
  可以传递参数 该参数就是当前行的数据 里面有_id该id就是父id
<!-- 
  // 这个原本是放在组件外面的 但是放在组件外面后 找不到this 所以我给它放在了组件内部 定义在组件的身上
  columns = [
    {
      render: (category) => {
        return (
          <>
            <Button type='link'>修改分类</Button>

            // 将render里面的参数传递到事件回调中 这么传事件回调就要是高阶函数的形式
            <Button onClick={this.showSubCategory(category)} 
            type='link'>查看子分类</Button>
          </>
        )
      },
    }
  ]

  还可以这样
  <Button onClick={() => {this.showSubCategory(category)}} 
 -->


> 要点2
- 我们的思路是 在点击按钮后先修改state中parentId的值 然后调用请求数据的方法 这样请求数据就会根据我们修改后的值发起请求 但是 setState引起的页面更新时异步的 我们不能在同步的顺序上拿到正确的值
<!-- 
  // 查看子分类 按钮的 事件回调
  showSubCategory = (category) => {

    return () => {
      
      // 这样是不行的
      this.setState({parentId: category._id, parentName: category.name})
      this.getCategoryList()


      // 要这样 使用setState的第二个参数 回调
      this.setState({parentId: category._id, parentName: category.name}, () => {
        this.getCategoryList()
      })


      更新 state 中的 parentId 因为 this.getCategoryList() 是根据 parentId 获取数据 将获取到的数据 保存到状态中的对应的一级列表 或者 二级列表中 ReactNode的部分 根据这个做展示

      我们的想法是 点击 查看子分类按钮后 将state中的 parentId id修改为点击按钮的这行的id 然后下面调用getCategoryList函数 根据id发起请求

      但是 上面修改id 下面根据id发起请求 但是 this.setState 方法是异步的 也就是说 getCategoryList 里面获取的 还是 默认值 0
     
      所以我们要使用setState的第二个参数 该回调会在状态更新且重新render后执行
      
      总结： setState不能立即获取最新的状态 因为setState是异步更新状态的 （后面再说其他情况） 它不会立即更新状态 而是把事件回调函数中的代码执行完毕后 再更新状态
    }
  }
 -->


> 4. ReactNode部分
<!-- 
  render() {

    let {category, loading, subCategory, parentId, parentName} = this.state

    // card 左侧的标题
    let title = parentName === '' ? '一级分类' :  `一级分类 > ${parentName}`

    // card 右侧按钮 我们定义一个 ReactNode
    let extraNode = (
      <Button type='primary'>
        <PlusOutlined /> <span>添加</span>
      </Button>
    )
    return (
      <Card title={title} extra={extraNode}>
        <Table 
          dataSource={parentId === '0' ? category : subCategory} 
          columns={this.columns}
          bordered={true}
          pagination={{
            defaultPageSize: 4,
            showQuickJumper: true
          }}
          logding={loading}
          rowKey='_id'
        ></Table>
      </Card>
    )
  }
 -->


> 还有一些地方要优化
- 1. 隐藏按钮
- 如果进入到二级分类中 就不用显示 查看子分类 按钮了 我们可以根据 state 中的parentId来判断
<!-- 
  {
    this.state.parentId === '0' ? <Button onClick={this.showSubCategory(category)} type='link'>查看子分类</Button> : null
  }
 -->

- 2. 展示父类标题
- 当显示二级列表的时候 要展示它的父类名字 我们也可以根据state中的 parentId来判断
- 点击 一级分类 还要展示 一级分类列表
<!-- 
  let title = parentId === '0' ? '一级分类' :  (
    <span>
      <Button type='link'>一级分类</Button> <RightOutlined /> &emsp;{parentName}
    </span>
  )
 -->


- 3. 点击 父类标题 回到一级分类
- 列表我们是根据state中的数据展示的 那么我们只需要将state中的数据 重置成一级列表的状态是不是就可以了
<!-- 
  showOneList = () => {
    this.setState({
      parentId: '0',
      subCategory: [],
      parentName: ''
    })
  }
 -->



> 注意：setState是一个异步更新的状态（同步的方法但是react根据setState是异步的）
- this.setState({}, callback)
- 参数2 callback 在状态更新且重新render后执行



> 点击添加按钮逻辑
- 上面我们把一级列表和二级列表的展示逻辑都完成了
- 点击添加 会弹出一个确认框 确认框内部有表单
<!-- 
  表单信息是
  所属分类：
    一级分类

  分类名称：
    名称
 -->

- 这里我们需要用Modal组件 但是这次的Modal要有Form组件
- 上面我们使用Modal组件的时候用的是 调用confirm函数的方式 这次因为Modal组件中还要使用form组件 所以我们使用了 <Modal> 的方式
- 我们在ReactNode结构中 添加了 两个  <Modal> 组件 一个用于 添加分类 一个用于 更新分类
<!-- 
  <Modal title="添加分类" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>

  <Modal title="更新分类" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
 -->

- 但是就有一个问题 我们展示哪个对话框呢？ visible 是一个属性 用于展示该对话框与否 它是一个布尔值，那么我们就需要在state中定义状态， 而我们应该有三种状态
- 1. 两个对话框都不展示
- 2. 展示 添加分类 对话框
- 3. 展示 更新分类 对象看

- 这里我们在state中对标识对话框的状态变量进行初始化
<!-- 
  state = {
    // 标识添加 / 更新的确认框是否显示 0都不显示 1显示添加 显示更新
    modalStatus: 0
  }

  <Modal title="添加分类" visible={ modalStatus === 1}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>

  <Modal title="更新分类" visible={ modalStatus === 2}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>

  当 modalStatus = 1 的时候 展示 添加分类对话框
  当 modalStatus = 2 的时候 展示 更新分类对话框
 -->

- 上面定义好了 什么时候展示 添加分类 和 更新分类 的对话框是么
- 下面当我们点击 添加 按钮的时候 展示 分类的对话框
- 也就是说
<!-- 
  点击 添加 按钮的回调 是为了展示 添加分类的对话框 它的作用仅仅是展示对话框

    添加分类对话框里面 点击 确定后
        处理添加分类的逻辑
 -->

<!-- 
  // Modal 点击确认后 添加分类
  addCategory = () => {
    console.log('addCategory')
  }

  // Modal 点击确认后 更新分类
  updateCategory = () => {
    console.log('updateCategory')
  }

  // 点击 添加按钮 后展示 添加分类对话框
  showAddModal = () => {
    this.setState({modalStatus : 1})
  }

  showUpdateModal = () => {
    this.setState({modalStatus : 2})
  }

  // 关闭 Modal 因为我们的对话框是通过modalStatus属性来控制的 它不会自动关闭
  closeModal = () => {
    this.setState({modalStatus : 0})
  }
 -->

- Modal对话框 点击x 点击遮罩 点击cancel 都会触发onCancel的回调 但是点击OK按钮则不能关闭对话框 正常都是 点击ok后 关闭对话框

- 上面结构搭好了 接下面我们要关注下 添加分类 和 更新分类后 点击确认后里面的逻辑问题
<!-- 
  // Modal 点击确认后 添加分类
  addCategory = () => {
    逻辑。。。
  }

  // Modal 点击确认后 更新分类
  updateCategory = () => {
    逻辑。。。
  }
 -->

- 我们需要在 <Modal> 中嵌套 <Form> 组件 但是这次老师把 <Form> 组件的部分拿出来单独做一个组件来做
<!-- 
  | - Category
    | - AddForm
    | - UpdateForm

  
  // AddForm
  import React, {Component} from 'react'
  import {Form, Select, Input} from 'antd'

  const {Item} = Form
  const {Option} = Select

  export default class AddForm extends Component {
    render() {
      return (
        <Form
          name="addCategory-form"
        >
          <Item
            name='parentId'
          >
            <Select
              defaultValue='0'
            >
              <Option value='0'>一级分类</Option>
              <Option value='1'>家用电器</Option>
              <Option value='2'>食品</Option>
              <Option value='3'>服饰</Option>
              <Option value='4'>图书</Option>
            </Select>
          </Item>

          <Item
            name='categoryName'
            initialValue=''
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入分类名称',
              }
            ]}
          >
            <Input placeholder='请输入分类名称' />
          </Item>

        </Form>
      )
    }
  } 



  // UpdateForm
  import React, {Component} from 'react'
  import {Form, Input} from 'antd'

  const {Item} = Form


  export default class UpdateForm extends Component {
    render() {
      return (
        <Form
          name="updateCategory-form"
        >
          <Item
            name='categoryName'
            initialValue=''
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入分类名称',
              }
            ]}
          >
            <Input placeholder='请输入分类名称' />
          </Item>

        </Form>
      )
    }
  }
 -->


> Select 组件
- 属性：
  defaultValue：  
      string | string[] number | number[] LabeledValue |  LabeledValue[]
      指定默认选中的条目

- Option
- 属性：
  className	
      Option 器类名	

  disabled
      是否禁用

  title
      选中该 Option 后，Select 的 title

  value
      默认根据此属性值进行筛选



> AddForm组件
- 该组件用于 <Moadl>组件内部 实现嵌套关系
- 我们说下它的逻辑 
- 所属分类 是用来确定 往哪个分类里面添加 分类
- 默认显示一级分类
- 我们还要收集数据 做 表单验证 比如 我们没有输入分类名称 就会提示 不能添加
<!-- 
  <Form>
    <Select>
      <Option>一级分类</Option>
    </Select>
  </Form>
 -->

- 要把各个项包裹在 Form.Item 里面 这样各个组件之间才会有间距


> 完成 修改分类 的逻辑
- 1. 点击 修改分类 按钮 弹出的对话框里面 默认应该显示 当前行的 分类名称
- 我们可以通过props来将 当前行的分类名称 传递过来
- 也就是说 当我点击 修改分类 按钮的时候 可以把当前行的数据 存到组件的自身身上

- 然后我们在render中 读取这个 存储的值 传递给 UpdateForm组件 使用
- 要点：
- render一上来就会执行一次 然后这时候
<UpdateForm categoryName={categoryObj.name}/>

- 传递过去的会是一个空对象 因为值是在我们点击按钮的时候才确定，而render会先跑 那么这时候就是个{}.name 会报错 这点要注意 
let categoryObj = this.category || {}

<!-- 
  // Category组件
  {
    title: '操作', 
    width: 300,
    align: 'center',

    // 我们可以从 category 中得到这个数据 name
    render: (category) => {
      return (
        <>

          // 点击 修改分类 按钮的时候 将这个数据传到事件的回调用
          <Button type='link' onClick={this.showUpdateModal(category)}>修改分类</Button>
          {
            this.state.parentId === '0' ? <Button onClick={this.showSubCategory(category)} type='link'>查看子分类</Button> : null
          }
        </>
      )
    },
    onHeaderCell: () => ({style:{textAlign: 'center'}})



  // 点击 修改分类 展示修改分类对话框
  点击修改分类按钮后 将该行的数据 保存在组件身上 供ReactNode使用

  showUpdateModal = (category) => {

    return () => {
      // category 这个每行的数据 ReactNode中要使用 要么放在state中 要么放在组件上 我们选择放在组件上 相当于点击按钮后 把这行数据保存到组件上 供ReactNode使用
      this.category = category

      this.setState({modalStatus : 2})
    }
  }


  render() { 

    // 如果没有就指定一个空对象
    let categoryObj = this.category || {}

    <UpdateForm categoryName={categoryObj.name}/>
  }
 -->

> 记录
- UpdateForm组件要根据props里面的 title 展示在 input的框里面
- 我们想使用<Item initialValue>属性 来根据数据展示 数据 但是
- 上面我从 Category组件里面获取了 input要展示的数据 数据也成功的传递到props里面了 可每次 <Item initialValue> 展示的数据还是第一次渲染的 并没有根据新的数据展示

<!-- 
  <Item
    name='categoryName'
    initialValue={categoryName}
    rules={[
      {
        required: true,
        whitespace: true,
        message: '请输入分类名称',
      }
    ]}
  >
    <Input placeholder='请输入分类名称' />
  </Item>

  原因父组件为antd的<Modal>，子组件为单独封装的一个UserForm组件，每次点击创建用户或者更新按钮，<Modal>弹出时总是获取到上一次的值，

  即传递这个user对象，UserForm能拿到最新的值，但是弹框表单总是显示上一次获取的值

  这是因为<Modal>隐藏显示时没有销毁 Modal 里的子元素UserForm，导致都每次读取上次的值。
  
  解决方法就很简单了，在 Modal 上增加属性 destroyOnClose
 -->

> 解决办法
<!-- 
  <Modal 
    title="更新分类" 
    visible={ modalStatus === 2} 
    onOk={this.updateCategory} 
    onCancel={this.closeModal}

    // 精华在这里
    destroyOnClose
  >
 -->


> 点击 修改分类 的ok按钮后真正的修改 数据
- 1. 点击按钮后 关闭对话框
<!-- 
  this.setState({modalStatus : 0})
 -->

- 2. 发送请求 更新数据


- 3. 重新显示列表
<!-- 
  this.getCategoryList()

  这里我们做的就是将请求回来的数据 更新下state中保存的数据 这样的话
  ReactNode的部分就会自动生成新的列表

  步骤2中我们发送请求 修改数据
  步骤3中我们发送请求 展示数据 公用不一样
 -->











### 商品 / 品类管理 后台
> categorys集合 一级分类 和 二级分类的关系
- 首先我们要最 categorys集合 进行约束 通过mongoose来对 categorys集合 进行操作
- 因为我们的数据库的结构是2层 一级分类和二级分类 相当于：

    家电 ---
        - 电视机
        - 电冰箱

- 这样的话 我们categorys集合中就会有多个文档 一级分类 和 二级分类之间的关系 我们可以通过_id来解决
- 比如

    一级分类：
        家电  parentId: 0
              _id: asdfasdf

    二级分类：
        电冰箱 parentId: asdfasdf
              _id: yiwuyqiyt

- 二级分类的 parentId 是 一级分类的 _id 这样就形成了 两个文档之间的父子关系

<!-- 
  const mongoose = require('mongoose')
  const categroySchema = mongoose.Schema({
    name: {type: String, required: true},
    parentId: {type: String, required: true, default: '0'}
  })

  const CategoryModel = mongoose.model('categorys', categroySchema)

  module.exports = CategoryModel


  一级分类的数据格式：
  {
    data: [
      parentId: '0',
      name: '家用电器'
      _id: 'asfdhagsdfjgajsdf'
    ]
  }

  二级分类的数据格式：
  {
    data: [
      parentId: 'asfdhagsdfjgajsdf',
      name: '电视'
      _id: '91637rasgdhjasf'
    ]
  }

  name是分类 parentId是这个分类的id
  比如我们现在查询的是 /manage/category/list?parentId=0 我们查询的是parentId为0的所有列表

  也就是一级分类列表 我们在查二级列表的时候 比如我们查询家用电器下面的商品
  /manage/category/list?parentId= asfdhagsdfjgajsdf
  接口还是一样 只不过是 asfdhagsdfjgajsdf 这个id下面的所有分类

  这两个就是一对多的关系 一级分类的parentId为0
 -->



> categorys 的约束 
- 创建了 分类列表 categorys 的约束
<!-- 
  const mongoose = require('mongoose')
  const categroySchema = mongoose.Schema({
    name: {type: String, required: true},
    parentId: {type: String, required: true, default: '0'}
  })

  const CategoryModel = mongoose.model('categorys', categroySchema)

  module.exports = CategoryModel
 -->



> 请求分类列表 的 接口
- 这个接口是一个get请求
- 需要的参数：
        parentId

- 需要根据 parentId 来查询分类 也能分清楚是 查询1级分类还是2级分类
<!-- 
  那所有的一级分类都是0啊 那怎么知道 某一个分类呢
 -->

- 返回给前台数据的时候 组织好对象 status 和 data
<!-- 
  router.get('/manage/category/list', (req, res) => {

    // 获取 parentId
    const parentId = req.query.parentId || '0'

    // 查询数据库 根据parentId
    categoryModel.find({parentId})
    .then(categorys => {

      // 如果成功 返回前端 成功状态 和 数据
      res.send({status:0, data: categorys})

    }).catch(err => {

      // 如果失败 返回前端 失败状态 和 数据
      console.log('获取分类列表异常', err)
      res.send({status:1, msg:'获取分类列表异常，请重新尝试'})

    })
  })
 -->


> 添加分类列表 的 接口
- 往分类中添加一个文档
- 需要参数：
        parentId
        我需要知道添加的是一级分类还是二级分类
        比如 0 那我添加的就是一级分类
        比如 我输入的是一级分类中的某一个id 那么就是二级分类

- 这个不管是一级分类还是二级分类都是往 category 这个集合里面插入 不是插入到某一个文档下 形成嵌套文档

<!-- 
  router.post('/manage/category/add', (req, res) => {

    // 获取请求参数
    const {categoryName, parentId} = req.body

    // 根据参数创建文档
    CategoryModel.create({name: categoryName, parentId: parentId || '0'})
      .then(category => {
        
        // 如果成功 返回前端 成功状态 和 数据
        res.send({status: 0, data: category})
      })
      .catch(error => {
        
        // 如果失败 返回前端 失败状态 和 数据
        console.error('添加分类异常', error)
        res.send({status: 1, msg: '添加分类异常, 请重新尝试'})
      })
  })
 -->



> 更新分类列表 的 接口
- 修改一个分类的信息
- 需要参数
      categoryId： 更新哪一个分类 我们添加的是 _id 这样能具体的找到一个指定的文档
      categoryName： 更新成什么名字

<!-- 
  router.post('/manage/category/update', (req, res) => {

    // 获取请求参数
    const {categoryId, categoryName} = req.body

    // 根据 id 更新一个文档 
    CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName})
      .then(oldCategory => {
        res.send({status: 0})
      })
      .catch(error => {
        console.error('更新分类名称异常', error)
        res.send({status: 1, msg: '更新分类名称异常, 请重新尝试'})
      })
  })
 -->


> 根据分类ID获取分类 接口
<!-- 
  router.get('/manage/category/info', (req, res) => {
    // 获取请求参数
    const categoryId = req.query.categoryId

    CategoryModel.findOne({_id: categoryId})
      .then(category => {
        res.send({status: 0, data: category})
      })

      .catch(error => {
        console.error('获取分类信息异常', error)
        res.send({status: 1, msg: '获取分类信息异常, 请重新尝试'})
      })
  })
 -->











### 定位


### 总结相关：

> state中的数据
- 1. 从后台请求回来的数据 要存放在 state 中 这样数据变化 页面就会重新渲染

> componentWillMount
- 不要执行异步操作 因为异步操作会在render后才执行


> bug
- 分为了两大类 一类叫做功能性bug 一类叫做异常性bug(报错)


> App组件根标签的又一种方式
- App组件的div 不写比较好一些可以用<Suspense>来代替 我在做的过程中就遇到了 css高度撑不开的情况


> 项目最开始需要展现什么的书写方式
- 我要是想 根路径展示什么组件 可以直接这么写
<!-- 
  <Route path='/' component={Admin} />
 -->


> Switch组件的使用要点
- Switch组件 最终会匹配一个 所以放在上面的会优先显示
<!-- 
  // 这么写会展示 login
  <Route path='/login' component={Login} />
  <Route path='/' component={Admin} />


  // 这么写会展示 admin
  <Route path='/' component={Admin} />
  <Route path='/login' component={Login} />

  // 看谁放在了上面
  import {Link, withRouter} from 'react-router-dom'
 -->


> 图片的引入
- 要当成组件来引入
<!-- 
  import logo from './images/logo.svg'
 -->


> 使用antd看举例的代码的时候 注意组件是怎么导出的 有的时候会是这样
<!-- 
  正常我们导出的是我们定义的类式组件
  export default class Login extends Component

  但是有的时候 antd 为了向 它内部的组件传递一个属性和方法让内部组件使用会是这样
  const WrapLogin = Form.create()(Login)
  export default WrapLogin

  这样WrapLogin装组件就会向Login组件传递一些方法工Form组件来使用
  比如视频 13集 WrapLogin 向 Login 传递了 form对象 里面是一些属性和方法用来操作 Form表单
 -->


> 高阶函数
- 一类特别的函数 接收函数类型的参数 函数的返回值是一个函数
- 常见的高阶函数：
  setTimeout / Promise / 数组的很多方法 / 闭包函数 / bind

- 优势：
- 我们接收一个函数就相当于接受了一个功能 返回一个函数就是将来可以反复使用的功能
- 具有更多的扩展性

- 高阶函数的书写格式：
- Form.create()(Login)


> 高阶组件
- 本质是一个函数
- 特点：
- 接收一个组件(被包装组件)，返回一个新的组件(包装组件)， 包装组件会向被包装组件传入特定属性和方法
- 高阶组件也是高阶函数：接收 组件函数
<!-- 
  const WrapLogin = Form.create()(Login)
 -->


> jsonp
- 只能处理get请求的跨域


> async await
- 作用：
- 简化promise对象的使用 不用再使用then()来指定成功 失败的回调函数
- 用同步的编码方式实现异步流程

- await 是等待的意思 等待成功给我们返回数据
- 写在await最近的函数 定义的左侧写async
<!-- 
  哦哦哦 所以遇到await会先执行函数体外的逻辑
 -->

- async加在 await最近的函数 函定义的左侧写async async () => { }



> 技巧： 在render() 中怎么重定向到其它组件
<!-- 
  render() {

    const user = memoryUtils.user
    if(!user || !user._id) {
      
      // 这里做判断 如果没有的话 return一个 Redirect 组件
      return <Redirect to='/login' />

    }
    
    return (
      <div>
        <h3>Admin组件</h3>
          <div>
            {/* 这里可能是空对象 也可能是一个有数据的对象 */}
            我们展示的是{user.username}
          </div>
      </div>
    )
  }
 -->


> axios 返回的结果
- res.data是我们的结果  里面包含了status 和 data（用户）
- res.data.data是用户信息


> 这么导出会报错
- Assign object to a variable before exporting as module default import/no-anonymous-default-export

export default {
  // 保存当前登录的用户user
  user: {}
}

- 改成：
const user = {
  user: {}
}
export default user





### 报错信息
- 我们开启了定时器 它要在组件被卸载的时候清除掉 不然我们跳转页面 或者 退出登录后
- 定时器还在更新状态就会报错
<!-- 
  cannot perform a react state update on an-unmounted component 
  this is a no op but it indicates a memory leak in your application 
  to fix cancel all....
 -->




### star培训
- 每年的7月 - 2月比较好（不要赶到3 4 5月在调现场）
- 超过上限有加班费 不够下限扣工资 超200小时有加班费 

- 放长假的话 先跟营业说
- 安全性严的话 放假不允许进公司 跟营业说
- 如果可以分开休的话 就分开休


### 公司的礼节
- 吴 ご     营业部长  
- 道 どう   培训日语
- 庞 ボウ   统计交通费
- 翟 たく  

- 新宿
- 品川
- 大旗
- 