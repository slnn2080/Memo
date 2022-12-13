# 使用 NestJs 的优点:
我们在使用 NodeJs 的时候 都会使用 Express 框架来帮助我们开发Node的服务端逻辑

NestJs使用TypeScript构建 提供了一个开箱即用的应用程序架构 允许开发人员和团队创建高度可测试 可扩展 松耦合且易于维护的应用程序

它是 NodeJs 本身之上的一个层 用于抽象出困难的任务 工具和样板代码 同时还为您的应用程序开发添加了一个完整的工具包

使用NestJs不会将我们锁定在一个框架中 而是我们可以任意的更新底层的框架 

比如我们可以不用默认使用的 Express 而是使用其他的框架 Nest在此提供的灵活性使我们能够创建与平台无关的模块

使用 NestJs可以构建 restAPI MVC 应用程序 微服务 GraphQL应用程序 web套接字 甚至 cli 和 cron 作业

我们可以毫不费力的更换底层机制 

<br>

# NestJs 的安装
首先要确保 node 的版本在 12 以上

### 安装命令:

    npm i -g @nestjs@cli

<br>

### 查看 Nest 是否安装成功:

    nest --version

视频中是 v7.1.2 我下载的是 9.1.3

<br>

nestcli是nestjs的配套工具 可以帮我们我们
- 生成文件 
- 运行编译 
- 捆绑我们的应用程序等

它包含很多命令 我们可以使用 下面的命令来查看 nest cli 为我们提供了什么

    nest --help

<br>

# Nest项目的创建:

    nest new

该命令用来创建 nest 项目:

- what name would you like to ...   
新项目的名称

- whick packge manager ...  
npm  
yarn

创建完毕后 我们运行如下的命令 启动项目 项目会监听 3000 端口

    cd slnn
    npm start

<br>

# Nest目录结构:

    | - dist
    | - node_modules
    | - src
      - app.controller.spec.ts
      - app.controller.ts
      - app.module.ts
      - app.service.ts
      - main.ts
  
    | - test
    - .eslintrc.js
    - .gitgnore
    - .prettierrc
    - nest-cli.json
    - package.json
    - tsconfig.build.json
    - tsconfig.json

Nest应用程序内部 所有东西都是定义好的 我们可以专注手头的任务 而不用关注配置

我们 nest应用会从 main.ts 开始 通过这个文件我们能看到 整个应用是通过 ``NestFactory.create()`` 创建的

```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

我们看看 ``AppModule`` 是什么? 

<br>

### **AppModule:**  
位置:  

    /src/app.module.ts


它相当于 Vue 中的 App 根组件 它内部包含了我们应用程序运行所需的一切 我们可以理解为 Nest项目的根模块

模块本身可以包含其他的小模块 这些模块都是不同的功能 然后组合在 app 根模块中 这样我们就能得到一个完整的应用程序


```js
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 装饰器
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
```

我们能看到 @Module 装饰器, 装饰器可以装饰类和方法 属性 参数 NestJs中会广泛的使用到装饰器

我们在 @Module 装饰器中封装了 控制层 和 service层

<br>

### **控制层:**
位置:  

    /src/app.controller.ts

```js
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

app的控制层也是一个类, 类的上方同样使用了 装饰器 ``@Controller()``

控制层是我们应用程序在 处理请求的地方 在这个类中我们还能看到 业务层(AppService) 它来帮助我们将业务逻辑从控制层中分离出来

<br>

### **业务层:**
位置:

    /src/app.service.ts

```js
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

```

当有get请求的时候我们实际上是调用了 业务层中的 getHello的方法 我们返回了 'Hello World!'

<br>

# Insomnia 工具:
它是一个 rest 客户端 使用它我们可以轻松的向我们的应用程序发出请求 类似的工具好有 **postman**

### 下载 Insomnia:
网址: https://insomnia.rest/

<br>

# Nest中的 Development Mode
它是 nest 提供的一个额外的脚本 我们可以在开发应用程序的时候使用它 每次我们在修改代码之后 会为我们提供实时编译和自动服务器重建

<br> 

### 使用方式:
在根目录的控制台上输入: watch更新

    npm run start:dev

<br>

# 创建基本的 控制层(控制器):
控制层是 NestJs 在处理请求时最重要的模块之一 我们可以通过 cli 来生成一个 控制器

<br>

**<font color="#C2185B">nest generate controller: </font>**  
通过 cli 命令 创建一个控制器 

简写:

    nest g co

<br>

- what name would you like ...  
填写 控制器 的name 比如我们这里起 coffees

创建完毕后 我们会发现 src 目录下多了一个 coffees 目录 该目录下还有如下的两个文件

    app.controller.ts   // 控制器
    coffees.controller.spec.ts  // 测试文件

如果我们不想生成测试文件 我们可以使用如下命令

    nest g co --no-spec 

如果我们想指定控制器生成的位置 我们可以使用如下的命令

    nest generate controller modules/abc 

如果我们不确定 想要创建的控制器是否会在我们指定的目录上 我们可以运行如下命令

    nest generate controller modules/abc --dry-run

上面的命令不会创建任何的文件 只是测试它会在哪里创建

下面就是我们生成的控制器的代码
```js
import { Controller } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {}
```

每一个控制器都是由 类 和 装饰器 组成  

控制器是在应用程序中负责处理请求的 但是怎么才能知道 请求那个url会对应哪个控制器呢?

我们可以发现下面的装饰器中我们传递了一个字符串 这个字符串就是 接口

    @Controller('coffees')

当我们的请求发向该接口时 就会处理对应的控制器 将我们的请求绑定在对应的控制器上 

<br>

当我们在地址栏中输入:

    localhost:3000/coffees 

会发现返回的是 404 

    {
      "statusCode": 404,
      "message": "Cannot GET /coffees",
      "error": "Not Found"
    }

Cannot GET /coffees 不能获取 该接口 原因很简单 我们创建的控制器是空的

<br>

控制器中还需要设置 Get 路由

<br>

Nest中为所有常见的 HTTP 动词都提供了对应的装饰器 它们都是 ``@nestjs/common`` 包中 使得在我们定义何种请求的时候 会变的异常的简单

所有的装饰器都可以从 @nestjs/common 包中获取么?
```js
import { Controller, Get } from '@nestjs/common';
```

接下来我们就在新创建的 控制器 中使用 Get装饰器 处理 HTTP请求

```js
import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

  /*
    我们在控制器的类中定义一个方法 方法名无关紧要
    该方法用于获取控制器的所有结果
  */
  @Get()
  findAll() {
    // return 用于 get 请求返回的内容
    return "this action returns all coffees"
  }
}
```

当走 /coffees 的是Get请求的时候 就会触发 findAll() 方法 返回一个字符串

同理该控制器中还可以处理 其他的请求比如 post patch 等

<br>

当我们想请求如下路径的接口怎么办? 嵌套url

    localhost:3000/coffees/flavors

<br>

**<font color="#C2185B">@Get(字符串参数): </font>**  
就像在控制器中那样 所有的HTTP请求的装饰器也可以接受一个字符串参数 
它会创建一个具有 嵌套路径 格式的接口 当发向该接口的请求都会被绑定到对应的控制器上
```js
import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

  // 当访问 /coffees 走的逻辑
  @Get()
  findAll() {
    return "this action returns all coffees"
  }

  // 当访问 /coffees/flavors 走的逻辑
  @Get("flavors")
  flavors() {
    return "/coffees/flavors content"
  }
}

```

以上我们可以看到 通过 nest 框架 来处理请求是多么的方便 同时使用 nest 框架代码的逻辑也会异常的统一

<br>

同时我们在创建新的控制器后 app.module.ts 文件中 会自动添加我们新创建的控制器
```js
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';

@Module({
  imports: [],

  // 这里会自动添加我们新创建的 控制器
  controllers: [AppController, CoffeesController],
  providers: [AppService],
})
export class AppModule {}
```

<br>

# 获取 params 参数:
**目标:**  动态接口

当我们需要接收动态数据作为请求的一部分的时候 静态路径的路由就不起作用了

比如我们有这样的一个 Get 请求 其中 123 就是动态的数据例如商品编号

    /coffees/123

我们要获取 请求地址中的 123 部分将其传入到 Get请求对应的方法中  

<br>

**<font color="#C2185B">@Get(:id): </font>**  
可以获取 url 中动态参数的部分  
我们在 Get() 参数里面通过 ``:id`` 的形式指定 动态参数对应的变量

<br>

**<font color="#C2185B">@Param(): </font>**  
``@Param()`` 是参数装饰器 也是从 ``@nestjs/common`` 中导入  

作用:  
用于获取 url请求中所有的请求参数 动态的请求参数会被封装到 params 对象中 并传入对应处理函数的内部 使用在 形参的位置

```js
import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return "this action returns all coffees"
  }

  @Get("flavors")
  flavors() {
    return "/coffees/flavors content"
  }

  // 动态路由参数
  // @Param() 将 url 上请求参数都封装到 params 中
  @Get(":id")
  findOne(@Param() params) {
    return `returns #${params.id} in coffees`
  }
}
```

<br>

**<font color="#C2185B">@Param("id"): </font>**  
当我们只想使用 请求参数中的指定属性时 我们可以在 @Param("id") 传入指定的 属性名 这样 params 就是指定的属性
```js
@Get(":id")
findOne(@Param("id") params) {
  return `returns #${params} in coffees`
}
```

**注意:**  
这样操作 会接收不到其它的参数 因为我们只接受了 id

<br>

# 获取 body 参数
**目标:**  处理Post请求 & Post请求携带参数

在处理 @Post 请求参数的时候 它也有一个对应的装饰器 用于获取 req.body 的所有或特定的部分

**<font color="#C2185B">@Body(): </font>**
@Body也是参数装饰器 

```js
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

  @Post()
  create(@Body() body) {
    return `content is ${body.name} -- ${body.age}`
  }
}
```

我们回到 Insomnia 创建一个 Post 请求 并携带一些参数  

```js
localhost:3000/coffees

{
	"name": "sam",
	"age": 18
}
```

同样 如果我们不想使用 body 对象中的所有属性 我们只想使用 body中的 name, 则可以在 ``@Body("name")`` 传入指定的属性名 body变量仅仅接收的就是 name 对应的值

```js
@Post()
create(@Body("name") body) {
  // body就是 sam 接收不到其他的属性 如age
  return `content is ${body}`
}   
```

**注意:**  
这样操作 会接收不到其它的参数 因为我们只接受了 name

<br>

# 响应码:
我们会发现 上面的所有请求中 响应码都是自动回发的
- 200表示 Get 请求成功
- 201标识 Post 请求成功

这些都是 Nest 的默认行为 我们下面看下如何自定义 响应码

<br>

**<font color="#C2185B">@HttpCode(): </font>**
我们可以从 ``@nestjs/common`` 包中导入 ``@HttpCode()`` 装饰器 用于设置 响应码

参数:  
status number

``@nestjs/common``包还提供了一个 ``HttpStatus`` 枚举类 设置了 

    响应码 -- 描述文本

我们也可以从包中导入该枚举类填入到 @HttpCode() 中
```js
@Post()
@HttpCode(HttpStatus.GONE) // 我们需要传入 状态码
create(@Body("name") body) {
  return `content is ${body}`
}
```

上面的操作可以说是 我们硬设置状态码 响应会客户端的

<br>

# 访问底层框架的响应对象:
Nest中默认的底层框架是 express 当我们想访问这些底层框架的响应对象时 Nest也给我们提供了对应的装饰器

**<font color="#C2185B">@Res(): </font>**  
用于访问 底层框架 的 响应对象  

@Res()装饰器可以在 @Get() 对应的处理方法的参数中使用
```js
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';

@Get()
findAll(@Res() res) {
  return "this action returns all coffees"
}
``` 

我们获取的 res 就是 express 框架中的响应对象 因此我们可以调用 express 中响应对象身上的任何方法 比如 我们可以这样

```js
@Get()
// 是用 express 的 res 身上的方法 
findAll(@Res() res) {
  res.status(200).send("this is content in coffees")
}
```

**注意:**  
这种方式虽然很灵活 但是 和 nest 就没有太大的关系了 所以在一些细节的地方可能会出现一些兼容性的问题  

还有这样操作和底层的框架耦合就太深了 因为不同的库可能在响应对象上有不同的api 使用这样原生的代码 会让nest更加难以测试 

所以在处理响应的时候我们要尽可能的使用 Nest 的标准方法

<br>

# 删除 和 更新 的请求
上面我们演示了 Get 和 Post 也就是获取 和 创建的请求 的处理方式 下面我们看下 更新操作: 
- Put
Put操作会替换整个的资源 在我们传递参数的时候 我们要传递完整的参数信息

- Patch
Patch操作只修改部分资源 如果我们愿意 甚至可以只更新一个属性

下面看下如何处理 Patch请求, rest风格的api中 我们使用  Patch来修改资源的时候(修改一个资源的某部分属性) 一般都会提供
- 要修改资源的id 或者 编号 params
- 修改的属性 body

id我们利用 动态url参数来传递 通过 param对象来获取
请求的参数我们通过 body 传递

<br>

**<font color="#C2185B">@Patch(): </font>**  
用来处理 patch 请求 我们也可以传递 动态参数的变量

```js
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  // 获取 动态参数部分
  @Patch(":id")
  // 获取 param对象 和 body对象
  update(@Param("id") id:string, @Body() body) {
    return 
  }


  // @Param()中没有指定拿id 其类型的定义方式
  @Patch(":id")
  update(@Param() params:{id:string}, @Body() body) {
    return `用户id: ${params.id}, name: ${body.name} -- age: ${body.age}`
  }
}
```

<br>

**<font color="#C2185B">@Delete(): </font>**  
用来处理 delete 请求

当处理 delete 请求的时候 也会通过 动态参数 传递id进来 表示删除哪个资源

```js
@Delete(":id")
remove(@Param("id") id:string) {
  return `this action removes #${id} coffee`
}
```

<br>

# 获取 query 参数
**目标:**  查询参数分页逻辑

上面我们了解了:  
获取 /coffees/1 params 参数: @Param()  
获取 请求体参数: @Body()

想象一下我们数据库中的 某张表 中有成千上万表记录 如果没有不采用分页的话 会返回成千上万的记录 

通过分页我们可以将这些海量数据拆分为可管理的块 和 页面 按需求返回对应的数据就可以了是么?

如果是分页逻辑的话 我们会通过 url 上传递分页所需的参数

那如果获取 url 上传递的参数呢?

    coffees/?limit=10&offset=2

nest中有一个有用的装饰器 用于获取所有或特定部分的查询参数

**<font color="#C2185B">@Query(): </font>**  
参数装饰器  
用于获取 query 参数 会返回在一个对象中

```js
@Get()
findAll(@Query() paginationQuery) {
  const {limit, offset} = paginationQuery 
  return `this action returns all coffes limit: ${limit}, offset: ${offset}`
}
```

<br>

# 创建基本的 服务层(service):
services 是 Nest 应用程序非常重要的一个部分  
因为它帮助我们将 业务逻辑 和 控制器分开 将我们的业务逻辑分离为服务 有助于使该逻辑在我们的应用程序的多个部分中可以重用

上面的所有示例中 我们都是在控制器中完成逻辑的 比如有Get请求进行来 我们直接返回数据
```js
export class CoffeesController {

  @Get()
  flavors() {
    return "返回的数据"
  }
}
```

这相当于在 控制器(控制层) 中完成业务逻辑 我们的期望是 将业务逻辑和控制层分开 所以我们会将业务逻辑抽离出来

在控制层中调用 业务逻辑 service 中的逻辑会更好

```js
export class CoffeesController {

  @Get()
  flavors() {
    
    调用 service 层中的业务逻辑

  }
}
```

servicec层中主要可能处理 数据库的操作

<br>

### **使用 nest cli 创建 service:**
**<font color="#C2185B">nest generate service: </font>**  
使用 nest cli 创建 service 

简写:

    nest g s

我们创建 coffees 的业务逻辑 也就是业务层 service服务 在创建 service 的时候 我们要起一个名字

<br>

- what name would you like ...  
填写 服务层 的name 比如我们这里起 coffees

创建完毕后 我们会发现 src 目录下多了一个 coffees 目录 该目录下多了两个文件

    coffees.service.spec     // 服务
    coffees.service.spec.ts  // 测试文件

如果我们不想生成测试文件 我们可以使用如下命令

    nest g s --no-spec 

如果我们想指定控制器生成的位置 我们可以使用如下的命令

    nest generate service modules/abc 

如果我们不确定 想要创建的控制器是否会在我们指定的目录上 我们可以运行如下命令

    nest generate service modules/abc --dry-run

上面的命令不会创建任何的文件 只是测试它会在哪里创建

下面就是我们生成的 服务 的代码
```js
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeesService {}
```

同时 当我们通过 cli 创建 service 后 对应的会在 **app.module.ts** 文件的 providers数组中 自动添加上我们刚才创建的 service
```js
@Module({
  imports: [],
  controllers: [AppController, CoffeesController],

  // 这里 CoffeesService
  providers: [AppService, CoffeesService],
})
```
 
<br>

在 NestJs 中 每一个 service 都是一个 provider (提供者)  

### 那什么是 **提供者** ?
所谓的提供者的主要思想是它可以 注入 **依赖**  

将该 service 注入到哪个 模块中

这意味着对象之间可以创建各种关系 并且将对象实例链接在一起的逻辑都可以由 Nest 运行时系统处理 而不是尝试自己创建和管理这种类型的依赖注入

<br>

### 那这些 **提供者** 在 Nest 中是什么样的?
就像在Nest中看到的其他东西一样 提供者 service程序只是一个使用 class 和 @Injectable() 注解的类

```js
@Injectable()
export class CoffeesService {}
```

CoffeesService 将负责数据存储 和 检索 供CoffeesController 或 任何其他可能需要此功能的东西使用

<br>

### 那怎么将创建好的 service 注入到 controller 中呢？
要在某个模块中注入 提供者 我们可以在该模块的类中使用 constructor(构造函数) 

**演示:**  
让我们打开 CoffeesController并定义一个 constructor

比如 我们要将 service 注入到 controller 控制器中 我们可以在该控制器的类中 使用 constructor 并指明参数

<br>

**<font color="#C2185B">private readonly coffeessService: CoffeesService: </font>** 
constructor 中的参数 

只要我们传递了该参数 service 就会被挂载到当前类的实例上 我们就可以通过

    this.xxxService.调用 service 类中的方法和属性

```js
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';

import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {

  // 在该控制器内 注入提供者(service)
  constructor(private readonly coffeessService: CoffeesService) {
    这里不用写啥
  }

}
```

**注意:**  
我们使用了 private: 意味着该 service 只能在该类内部访问  
我们使用了 readonly: 这确保我们不会修改 引用的service 只是访问 service 中的内容 

在 nest 中 由于 typescript 的原因 我们管理依赖关系非常的容易 因为它们只需要通过类型就能解决 所以参数的类型我们使用了 **CoffeesService**  

nest将自动通过创建 CoffeesService 实例并将其返回给我们的 CoffeesController 将service挂载到this上

此依赖项已解析并传递给我们的控制器构造函数或分配给此处指定的属性

<br>

上面我们建议了 service 和 controller 之间的关系 现在我们完善下 service 中的代码

通常在应用程序中 service层处理业务逻辑以及数据交互 我们现在先在CoffeesService类中创建一个属性 用来模拟数据源

```js
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeesService {
  private coffees:Coffee[] = [
    {
      id:1,
      name: "Shipwreck Roast",
      brand: "Buddy Brew",
      flavors: ["chocolate", "vanilla"]
    }
  ]
}
```

我们假设这个 coffees 数组就是数据库 我们会操作这个数据库 读取 更新 和 删除项目

为了让其更像数据库里面的记录 coffees数组中会放一个个的对象 我们给对象设置下类型 相当于记录中的字段一样

    /coffees/entities/coffees.entity.ts

```js
export class Coffee {
  id: number
  name: string
  // 品牌
  brand: string
  // 风味
  flavors: string[]
}
```

接下里我们围绕着 coffees 做一些增删改查的操作 我们会在 service 中定义一些 操作数据库的方法
```js
import { Injectable } from '@nestjs/common';
import {Coffee} from "./entities/coffees.entity"

@Injectable()
export class CoffeesService {
  private coffees:Coffee[] = [
    {
      id:1,
      name: "Shipwreck Roast",
      brand: "Buddy Brew",
      flavors: ["chocolate", "vanilla"]
    }
  ]

  // 查: 查全部
  findAll() {
    return this.coffees
  }

  // 查: 查一个
  findOne(id: string) {
    return this.coffees.find(item => item.id == +id)
  }

  // 增:
  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto)
  }

  // 改:
  update(id:string, createCoffeeDto:any) {

    // 方式1:
    /*
      for(let i = 0; i < this.coffees.length; i++) {
        if(this.coffees[i].id == +id) {
          this.coffees[i] = createCoffeeDto

          return this.coffees
        }
      }
    */

   // 方式2: 这种方式更符合 patch 请求
   return this.coffees.map(item => {
      if(item.id == +id) {
        return {...item, ...createCoffeeDto}
      }
    })

    // 错误演示:
    /*
      这样我们相当于 创建了一个变量 item item的指针指向createCoffeeDto
      而coffees数组中的第二个元素的指针仍然指向原来的 所以 return this.coffees 始终会是原来的值
      我们可以使用 map 返回一个新的数组

      this.coffees.forEach(item => {
        if(item.id == id) {
          item = createCoffeeDto
        }
      })

      return this.coffees
    */
  }

  // 删除
  remove(id: string) {
    let index = this.coffees.findIndex(item => item.id == +id)

    if(index >= 0) {
      this.coffees.splice(index, 1)
    }
  }
}

```

上面就是 service 的业务核心 接下来我们返回 CoffeesController 来进行下测试
```js
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {

  // 在该控制器内 注入提供者(service)
  constructor(private readonly coffeessService: CoffeesService) {}

  @Get()
  findAll() {
    return this.coffeessService.findAll()
  }

  @Get(":id")
  findOne(@Param() params) {
    return this.coffeessService.findOne(params.id)
  }

  @Post()
  create(@Body() body) {
    return this.coffeessService.create(body)
  }

  @Patch(":id")
  update(@Param() params: {id:string}, @Body() body) {
    return this.coffeessService.update(params.id, body)
  }

  @Delete(":id")
  delete(@Param() params: {id:string}) {
    return this.coffeessService.remove(params.id)
  }
}
```

<br>

# 向用户发送 友好的错误提示消息
当我们遇到应用程序错误时 比如 api 请求失败或超时 或者 数据库找不到我们需要的资源 怎么办? 在复杂的应用程序中 很多事情都可能出错

nest可以帮助我们轻松的向客户端发送我们想要的任何类型的友好的错误消息 我们有几种方式可以选择

- 抛出异常
- 使用 library 特定的响应对象
- 创建 拦截器 利用 异常过滤器

我们打开 CoffeesService 在 findOne 方法中 我们演示下 HTTP 异常的情况

<br>

### 抛出 Http 异常
如数据库中查找不到我们所需的资源 这时抛出的错误

```js
import { Injectable } from '@nestjs/common';
import {Coffee} from "./entities/coffees.entity"

@Injectable()
export class CoffeesService {
  private coffees:Coffee[] = [
    {
      id:1,
      name: "Shipwreck Roast",
      brand: "Buddy Brew",
      flavors: ["chocolate", "vanilla"]
    }
  ]


  // 操作数据的方法
  findOne(id: string) {
    return this.coffees.find(item => item.id == +id)
  }
}


```

<br>

**<font color="#C2185B">throw new HttpException(`错误响应消息字符串`, 响应状态码): </font>** 

HttpException 从 @nestjs/common 包下导入

```js
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


findOne(id: string) {
  let coffee = this.coffees.find(item => item.id == +id)

  // 如果没有该数据 我们响应一个错误
  if(!coffee) {
    throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND)
  }

  return coffee
}
```

当数据源中没有的数据时 后台会返回如下的一个错误对象 (这时页面没有崩溃 仅是返回了一个错误对象 是不是相当于我们处理了这个错误 可以验证下)

    localhost:3000/coffees/3

```
{
	"statusCode": 404,
	"message": "Coffee #3 not found"
}
```

<br>

**HttpException:**  
它的使用 需要我们传入 指定的响应码 和 错误信息字符串

当我们清晰的知道 该部分的逻辑中会出现什么异常的时候 我们还可以用指定 特定的 异常类来处理异常

如:
- NotFoundException
- InternalServerErrorException
- BadRequestException ...

我们拿 NotFoundException 来举例:

<br>

**<font color="#C2185B">throw new NotFoundException(`错误响应消息字符串`): </font>**  
它不需要参数2

```js
findOne(id: string) {
let coffee = this.coffees.find(item => item.id == +id)

if(!coffee) {
  throw new NotFoundException(`Coffee #${id} not found`)
}

return coffee
}
```

后台会响应的对象如下: 我们能看到 自动添加了 响应码 和 描述字符串
```
{
	"statusCode": 404,
	"message": "Coffee #3 not found",
	"error": "Not Found"
}
```

<br>

上面只是演示了 HTTP 的异常情况 我们的程序中还有很多的异常情况 当我们没有对异常做对应的处理的时候 

nest也会通过内置的 异常层 帮我们处理捕获这些异常 这些异常就相当于冒泡 冒泡到最上方 被异常层捕获到


比如我们可以在 findOne 方法中 手动的抛出一个异常来验证这点 

```js
// 查: 查一个
findOne(id: string) {

  // 手动抛出一个异常
  throw "A random error"
  
  let coffee = this.coffees.find(item => item.id == +id)

  if(!coffee) {
    throw new NotFoundException(`Coffee #${id} not found`)
  }

  return coffee
}
```

我们会发现 nest 自动为我们返回前端一个 500 的错误 
```
{
	"statusCode": 500,
	"message": "Internal server error"
}
```

<br>

同时后台的控制台上 也会输出 
```
ERROR [ExceptionsHandler] A random error
```

<br>

# 模块
在 NestJs 中强烈推荐使用模块组织我们应用程序组件 对于大多数的 nest 应用程序 一个理想的架构应该采用多个模块 每个模块封装一组密切相关的功能

比如我们创建了一个围绕购物车的功能 如果我们的应用程序有一个购物车的控制器 和 购物车的service

这两个都属于同一个应用域 因为他们之间的关系是非常密切的 这说明讲我们的应用程序的某些部分组合在一起 这是很推荐的做法

比如我们现在做的demo 我们把所有的东西都放在了一个大模块中 

```js
// app module
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';

@Module({
  imports: [],
  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffeesService],
})
export class AppModule {}

```

我们应该将 CoffeesController 和 CoffeesService 的所有逻辑 整合到 CoffeeModule 中

<br>

在 nest 中生成 module 只需要通过 cli 运行如下的命令:  

    nest g module 模块名

我们创建的模块会在 

    /src/coffees/coffees.module.ts

<br>

同时当我们创建了一个 coffess 模块后 会被自动的导入到 app module 中 存放在 imports 数组里面

    这里是不是相当于 我们创建的任何控制器 和 service 都会被自动的汇总到 app 模块中 好像组件啊

```js
// app module
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  // 我们创建的 coffees 模块会被导入到这里
  imports: [CoffeesModule],

  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffeesService],
})
export class AppModule {}

```

<br>

我们创建的 coffee 模块代码如下 能看到 module 也是装饰器 和 类组成的
```js
import { Module } from '@nestjs/common';

@Module({})
export class CoffeesModule {}
```

<br>

**<font color="#C2185B">@Module({}): </font>**  
@Module装饰器的参数需要一个单一的对象 对象中的属性描述了模块和所有的上下文 参数对象中主要包含4个属性:

- controllers
- exports
- imports
- providers

<br>

**controllers:**  
控制器 可以把它看做是api的根 我们希望这个模块来实例化

<br>

**exports:**  
在这里 我们写上的提供者 当其它地方导入该模块的时候 其它地方也可以使用我们给定的提供者 是不是相当于导出

<br>

**imports:**  
用来引入其他的模块 当其它的模块中有 exports 出来的提供者的时候 我们就可以使用它们暴露出来的提供者

<br>

**providers:**  
这里我们将列出需要有 nest injector 实例化的 service 这里的任何提供者将只在本模块中可用 除非我们将 sercive 写入到 exports 中

<br>

以上就是 module 的基本概念 下面我们来整合一下 CoffeesController 和 CoffeesService

首先我们将 这两个文件 纳入我们创建的 CoffeesModule 中

```js
import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {}

```

然后我们将 app module 中的相关部分删除 因为如果我们不这么做 CoffeesController CoffeesService 会被实例化两次

```js
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  // 只要我们导入了 CoffeesModule 模块 该模块的功能就能正常的使用
  imports: [CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

以上一个功能模块只是组织了特定功能相关的代码 帮助我们保持代码的条理性 并为我们的应用程序及其功能建立清晰的逻辑 和 有助于管理复杂性 并按照 SOLID 的原则进行开发

特别是当应用程序的规模或团队不断地扩大的时候 应用的规模就会不断地增长

<br>

# 数据传输对象:
data transfer object 也被称为 DTO 它是一个对象 用于封装数据并将其从一个应用程序发送到另一个应用程序

DTO帮助我们定义系统内的接口或输入和输出 

例如:  
假设我们有一个 post 请求并使用 DTO 我们可以定义我们期望接收到的 请求体的类型

到目前为止 本课程中 我们在post和patch请求中使用了 @Body() 装饰器 但我们不知道我们期望的有效的负载是什么 这就是 DTO 的用武之地
 
<br>

### DTO的创建
要生成 DTO 我们可以使用 nest cli 提供的命令 生成一个基本类

    nest generate class 路径+文件名.后缀名

上述命令用于创建一个基本类

简写:

    nest g class coffees/dto/create-coffee.dto  --no-spec

注意:  
- 类名要用 - 链接小写
- 后缀名为 dto

我们在 CoffeesController 中为 POST 请求创建一个 CreateCoffeeDTO类

```js
// 刚创建出来的时候就长这个样子 就是一个普通类
export class CreateCoffeeDto {}
```

我们使用这个类(对象)作为 POST 请求的预期输入对象 相当于给 POST请求的负载设置类型么?

这个 DTO 将帮助我们能够做一些事情 比如运行进一步的代码之前确保请求有效负载具有我们需要的一切

我们在使用 post请求 创建一个新的资源的时候 我们需要为 DTO提供哪些属性呢？

```js
// 这里我们模拟数据源时 要求数据应该有什么样的字段
export class Coffee {
  id: number
  name: string
  brand: string
  flavors: string[]
}
```

但是我们在使用 POST请求的时候 不需要传递 id 这是数据库自动生成的 这里的其他属性都适合设置到DTO上 请POST请求的负载具有这些属性


```js
// DTO 修改如下
export class CreateCoffeeDto {
  name: string
  brand: string
  flavors: string[]
}
```

然后我们到控制器 给 @Body() 添加 DTO 约束 我们创建的DTO是类型 添加 DTO 的方式 也是按照形参类型的添加方式

我们回到 CoffeesController 控制器里面 给 body 添加 DTO 类型
```js
@Post()
create(@Body() body: CreateCoffeeDto) {
  return this.coffeessService.create(body)
}
```

DTO就是一个类型对象 它们不包含任何业务逻辑 方法或任何需要测试的东西 我们只是试图创建我们的数据传输对象的形式是我们所期望的

DTO中也就是前端传递的请求参数 我们在后台不会对其进行修改 为了确保不会修改它们 我们要保持他们的不变性

```js
// DTO 修改如下
export class CreateCoffeeDto {
  readonly ame: string
  readonly brand: string
  readonly flavors: string[]
}
```

现在我们就完成了 DTO 我们也发现DTO和我们给数据源中的一个对象 定义的类型一样的 这是不是多余呢?

这仅仅是我们还没有使用外部的数据 我们只是使用了模拟数据源 以后我们能注意到 到底有什么不同

下面我们也为 Patch 请求的负载 添加 DTO Patch请求比较特殊 因为它只是修改对象中的一个部分 所以 DTO 中的属性应该是可选的 我们定义如下

```js
// update-coffee.dto
export class UpdateCoffeeDto {
  readonly name?: string
  readonly brand?: string
  readonly flavors?: string[]
}

// controller中的Patch
@Patch(":id")
update(@Param() params: {id:string}, @Body() body: UpdateCoffeeDto) {
  return this.coffeessService.update(params.id, body)
}
```

<br>

# 使用 DTO 验证输入数据
上面我们谈到了使用 DTO 在对于给 **载荷** 添加类型 这点对于安全性上来讲 很重要

上面只是跟 请求的载荷 添加了类型 但是如果验证用户传入的类型对不对 还不清楚 比如:  
- 用户传入的参数的字段是否符合我们的期望
- 用户传入的参数的字段是否少了必传的字段 

这些都需要我们去验证 那如何验证呢?  
NestJs提供了 **ValidationPipe** 来解决上述的问题

ValidationPipe提供了一种对所有传入客户端有效负载强制执行验证规则的便捷方式 

我们可以通过在 DTO 文件中使用简单的注释来指定这些规则
下面让我们将整个应用程序设置为使用 ValidationPipe

<br>

### ValidationPipe的使用方式:
安装:

    npm i class-validator class-transformer

Nest与类验证器库(class-validator)配合得很好。  
这个功能强大的库允许您使用基于装饰器的验证。  

使用 class-validator 来验证我们 DTO 文件中为请求体设置好的类型是否符合我们的期望值

一旦安装了这些，我们就可以向CreateCatDto类添加一些装饰器。 

在这里，我们看到了这种技术的一个显著优势:CreateCatDto类仍然是Post主体对象的唯一真理源(而不必创建单独的验证类)。

我们打开 main.ts 文件并执行以下的代码: 

<br>

**<font color="#C2185B">app.useGlobalPipes(): </font>**  
注册全局管道 传入一个具体的管道

**<font color="#C2185B">app.useGlobalPipes(new ValidationPipe()): </font>**  
注册 ValidationPipe 管道 该管道是从 @nestjs/common 包中引入的

<br>

app.useGlobalPipes(new ValidationPipe())
```js
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // new了下
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
```

<br>

### class-validator 的使用方式: 
上述准备完后 我们开始向 DTO 添加验证规则了 我们打开 create-coffee.dto.ts 文件 

**文档:**  

    https://github.com/typestack/class-validator#usage

<br>

**<font color="#C2185B">@IsString(): </font>**  
它是装饰器

- 我们从 class-validator 包中导入 IsString 属性装饰器 添加到属性上方 

作用: 用于检查该字段的类型 并且还有 require 的作用吧

- 当字段是数组的时候 如果我们期望检测数组中的每一个成员是否都是string 的时候 我们需要在 **@IsString{{参数对象}}** 
```
@IsString({each: true})
```

```js
// 我们从 class-validator 导入 IsString 
import {IsString} from "class-validator"

export class CreateCoffeeDto {

  @IsString()
  readonly name: string

  @IsString()
  readonly brand: string

  @IsString({each: true})
  readonly flavors: string[]

}

```

上面相当于已经为我们的 DTO 设置了验证规则 有了这些验证规则后 如果有来自客户端的请求到我们的接口 并且请求体中的属性是不符合约束的情况下 

应用程序将 自动响应 400 BadRequest 代码 

为我们提供自动反馈和一种轻松测试请求体的方法

```js
// 如果我们没有传递 name 则nest自动响应会以下对象
{
  "statusCode": 400,
  // 同时还提供了一个关于字段应该怎么写的提示数组
	"message": [
		"name must be a string"
	],
	"error": "Bad Request"
}
```

<br>

之前我们创建了两个 DTO 文件  

**create-coffee.dto.ts:**   
**update-coffee.dto.ts:**   
```js
// 举例子所以没有使用 验证
export class CreateCoffeeDto {
  readonly name: string
  readonly brand: string
  readonly flavors: string[]
}

export class UpdateCoffeeDto {
  readonly name?: string
  readonly brand?: string
  readonly flavors?: string[]
}
```

我们在创建 UpdateCoffeeDto 文件的时候 因为 patch请求的负载内容和post请求的一样 所以我们直接复制了 CreateCoffeeDto 中的属性

但是这样做的话有些多余是么, 因为出现了很多重复的代码  

nest中提供了一些实用的函数来帮助我们 简化这样的操作 我们需要从 @nestjs/mapped-types 中导入这些函数帮助我们快速的执行这些类型的常见转换 

<br>

### @nestjs/mapped-types的使用方式:
**下载:**  
```
npm i @nestjs/mapped-types
```

然后我们回到 UpdateCoffeeDto 文件中 看看如何使用它避免这些冗余的代码

首先我们删除 UpdateCoffeeDto 类中的代码 我们继承

**<font color="#C2185B">PartialType(类型): </font>**  
这个函数接收一个 类型 作为参数

我们可以传递一个 DTO 的类进去

```js
import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "./create-coffee.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto){

}
```

这样 PartialType(DTO类) 会返回DTO的类的类型 且当中的所有属性都是可选 这样就不会出现重复的代码 

PartialType不仅标记所有字段都是可选的 <font color="#C2185B">同时它还继承了通过装饰器应用的所有验证规则</font>

<!-- 
  // 下面的话不知道啥意思 同时这里提到的装饰器 也不知道啥意思
  以及动态添加单个附加验证规则到每个字段 @IsOptional() 
 -->

<br>

# 处理 恶意 请求数据
上面我们安装了 下面的两个包

    npm i class-validator class-transformer

并且在 main.ts 中全局注册了管道
```js
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局注册管道
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
```

然后通过 ValidationPipe 配合 DTO类 在 DTO 类中引入装饰器来约束字段的类型

实现了对 请求负荷的校验和约束 当用户发请求时传入的负荷不符合我们装饰器设置的约束的时候会自动发回 400 的响应

<br>

ValidationPipe 还有很多其他的功能 比如:
可以过滤掉不应由方法处理程序接收的属性 通过 "白名单"  

通过 从class-validator包中导出的 装饰器 修饰了指定字段

```js
// 我们从 class-validator 导入 IsString 
import {IsString} from "class-validator"

export class CreateCoffeeDto {

  // 只要使用 装饰器 修饰了 就纳入了白名单
  @IsString()
  readonly name: string

  @IsString()
  readonly brand: string

  @IsString({each: true})
  readonly flavors: string[]

}

```

当使用装饰器修饰了字段后 该字段就会被纳入白名单 如果我们请求的负载中 有修饰字段之外的字段时 比如跟上面的类相比我们多传递了一个 flag 字段

多传的字段会自动从请求负荷中剔除 剥离

那如何开启 白名单 功能呢?

我们在 new ValidationPipe 的时候传入配置对象

<br>

**<font color="#C2185B">whitelist: </font>**  
值: true
```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    // 开启白名单功能
    whitelist: true
  }))


  await app.listen(3000);
}
bootstrap();
```

<br>

### 场景:
假设我们希望避免用户在创建新咖啡(post请求添加新资源)时 将无效的属性传递给我们的控制器中的 Post 请求

比如我们要新建一个资源:
```js
{
	"name": "ddd",
	"brand": "shanghai coffee",
	"flavors": [
		"yes"
  ],
  
  // 多传递一个 flag 该字段会被自动剔除
  "flag": true
}
```

<br>

### 注意:
当我们没有使用 DTO 的时候 证明所有属性都不会被纳入白名单 所以当请求发送到后台应用的时候 请求负荷中的属性都会被剔除 会只添加一个 {} 对象

<br>

除此之外 ValidationPipe 还提供了当存在非白名单中的属性将自动停止 请求的处理 的选项 并抛出错误

我们在 **new ValidationPipe({})** 传入forbidNonWhitelisted配置项 该配置项必须和白名单搭配使用

<br>

**<font color="#C2185B">forbidNonWhitelisted: </font>**  
值: true

```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({

    // 开启白名单功能
    whitelist: true,
    // 开启非白名单属性将停止请求自动抛出错误
    forbidNonWhitelisted: true

  }))

  await app.listen(3000);
}
bootstrap();

```

当我们开启该功能后

```
// 发送白名单中没有的字段 flag 
{
	"name": "ddd",
	"brand": "shanghai coffee",
	"flavors": [
		"yes"
	],
	"flag": true
}


// 应用返回 400
{
	"statusCode": 400,
	"message": [
		"property flag should not exist"
	],
	"error": "Bad Request"
}
```

<br>

# 自动将有效请求载荷转换为 DTO 实例
当我们收到的请求 请求参数是我们所期望的 也就是有效的请求时 这些有效的载荷通常作为 纯js对象通过网络传输

但是我们如何确保 这些有效的载荷符合我们的预期呢？

我们在控制层中的 Post 请求里面 使用DTO对 body 参数进行了约束 

我们输出下 看看body参数(createCoffeeDto)是否是 DTO的实例
```js
@Post()

// 约束 body 参数的类型 配合 class-validator 对 参数中的字段进行了校验
create(@Body() createCoffeeDto: CreateCoffeeDto) {

  console.log(createCoffeeDto instanceof CreateCoffeeDto);  // false
  
  return this.coffeessService.create(createCoffeeDto)
}
```

上面我们看到了 虽然我们使用DTO对body参数进行了类型的约束 但事实上 body参数并不是CreateCoffeeDto类的实例

这里我们可以利用 ValidationPipe 来帮助我们将这个对象转换为我们所期望的  

我们在 main.ts 文件中 new ValidationPipe 的配置对象中添加新的 配置项

<br>

**<font color="#C2185B">transform: </font>**  
值: true

```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    // 开启白名单功能
    whitelist: true,
    // 开启非白名单属性将停止请求自动抛出错误
    forbidNonWhitelisted: true,

    // 将请求体的载荷类型为DTO的实例
    transform:true
  }))


  await app.listen(3000);
}
bootstrap();
```

修改之后我们再进行 post 的测试的时候 就会发现结果为 true
```js
@Post()
create(@Body() createCoffeeDto: CreateCoffeeDto) {

  console.log(createCoffeeDto instanceof CreateCoffeeDto);  // true
  
  return this.coffeessService.create(createCoffeeDto)
}
```

### 那这个转换功能还有什么其他的用处么?  
这个自动转换功能还为 <font color="#C2185B">布尔值</font> 和 <font color="#C2185B">数字</font> 等内容执行原始类型的转换

如果我们查看 CoffeesController 中的 findOne() 的 Get 方法 它接收一个参数 表示并提取 id 的动态参数

```js
@Get(":id")
findOne(@Param("id") id: string) {
  return this.coffeessService.findOne(id)
}
``` 

我们知道 id 字段的类型在我们定义数据源的字段类型时设置的为 number 但是默认情况下 url查询参数经过网络的传输都会是字符串 

如果我们将id的类型更改为 number ValidationPipe将尝试自动将字符串类型的id转换为数字类型的id
```js
@Get(":id")
// 指定url参数类型为 number (原本url参数应该是字符串)
findOne(@Param("id") id: number) {
  return this.coffeessService.findOne(id)
}
``` 

上面的结果是 当我们获取 url参数的id属性时会由string转换为number

<br>

请注意: 此功能可能会对性能产生非常轻微的影响

<br>

# Mac安装Docker
Docker是一个供开发人员使用的平台 它可以构建 运行 和 共享容器内的应用程序

使用容器来部署应用程序称为容器化 容器化多年来变得越来越流程 因为它们为开发过程带来了许多好处

<br>

### **容器的好处, 轻量级:**    
这意味着您可以在本地构建它们 部署到云端并在任何地方运行 并且松耦合 这意味着容器是高度自给自足和封装的  
允许更换和升级它们 而不会破坏任何其他的容器 容器化 和 Docker 还有许多其他巨大的好处

从根本上说 容器只是一个正在运行的进程 其中应用了一些附加的封装特性 这有助于保持容器与主机和其他容器的隔离

<br>

### **Docker Compose**
它是一个用于定义和运行多个容器的Docker应用程序的工具 使用 DC我们可以使用 yaml 文件来配置我们的应用程序服务

配置上述的内容之后 我们就可以在任何机器上从我们的配置中创建和启动所有的服务了

Docker将使我们的应用程序在未来的工作变得更加的简单

<br>

### 安装 Docker
安装地址:

    https://docs.docker.com/desktop/install/mac-install/

<br>

### 查看 Docker 版本
视频中的 Version 是 19.03.5
```
doceker version

Client:
 Cloud integration: v1.0.24
 Version:           20.10.14
 API version:       1.41
 Go version:        go1.16.15
 Git commit:        a224086
 Built:             Thu Mar 24 01:49:20 2022
 OS/Arch:           darwin/amd64
 Context:           default
 Experimental:      true

Server: Docker Desktop 4.8.0 (78933)
 Engine:
  Version:          20.10.14
  API version:      1.41 (minimum version 1.12)
```

<br>

下面的命令会拉取 hello-world 镜像并运行容器 可以通过它查看拉取和运行镜像是否好用
```
docker run hello-world
```

<br>

# 运行 postgreSQL
前面的视屏中我们在 service 中模拟了数据源 从这里开始我们要使用 postgreSQL 数据库

<br>

### postgreSQL: 
它目前是性能最高 功能最丰富的数据库管理系统之一 而且它也是免费的

过去我们可能会访问 postgres 网站 在我们的机器上本地安装数据库 现在我们使用 docker 来处理这些

这里我们要使用 docker compose 它是 yaml 配置来设置我们的应用程序所需要的一切

<br>

**<font color="#C2185B">根目录下创建 docker-compose.yml 文件</font>**
运行 docker compose 需要读取这个 yml 配置文件

然后我们定义一个 yaml 格式的数据库容器
```yml
version: "3"

services: 
  db:
    image: postgres
    restart: always
    ports: 
      # 对内对外都是 5432 端口
      - "5432:5432"
    environment: 
      POSTGRES_PASSWORD: pass123
```

yaml是一个有趣的配置文件 其中间距缩进和破折号都很重要 并且可以做一些事情

如果我们希望了解 yaml 有关的信息 可以查看它的官方网站

    yaml.org

docker image 是一个多层文件 它将在 docker 容器中执行代码 在这种情况下 它将创建一个 postgresql 数据库

我们还能看到 postgresql 将使用默认端口 5432  
我们能看到 指定端口号的时候 是这种格式 5432:5432  
这向doceker表明 在容器内部 它应该在端口5432上设置数据库 但也可以在同一端口上访问 docker 外部 

这让我们能够访问这个数据库 它位于 docker 容器内部 容器外部以及我们当前的机器上

然后我们可以使用 docker compose cli 运行数据库服务

```
docker-compose up -d  后台方式运行
docker-compose up

docker-compose stop   停止运行的容器
```

**作用:**  
两者都是创建或者重新创建容器，附加给当前服务器，除此之外，除非服务已经运行，否则启动所有链接服务。

docker-compose up:  
本质是docker-compose logs -f，它会收集所有容器的日志输出直到退出命令，或者容器都停止运行。

docker-compose up -d:  
以后台的方式运行容器。不会在终端上打印运行日志

<br>

**参数 -d :**  
表示我们想以 分离 模式运行我们的容器 这意味着它们将在 后台 运行

我们的 docker compose yaml 文件中只列出了一项服务 但供将来参考 如果我们在这里有其他的服务并想运行的话 我们可以通过输入 服务的名称来传递要运行的服务

如果我们不在后面传递任何参数 docker compose 将生成所有定义的服务

<br>

### 运行步骤:
所以我们要在有 yml 配置文件的目录下 运行上面的命令 创建 postgres 数据库 并运行容器

然后再在 app.module.ts 中通过 typeorm 配置与 postgressql数据库的链接信息 

最后 通过 npm run start:dev 启动nest项目

<br>

# 介绍 TypeORM 模块
**官方网站:**  

    https://typeorm.biunav.com/zh/#%E4%BD%BF%E7%94%A8-repositories

<!-- 
  前排提示，千万不要用typeorm0.3往后的，用0.2版本的就好了，不然很多示例完全失效，typeorm进行了破坏性更新，而文档还是老的
 -->


nest本身与数据库无关 允许我们轻松选择任何 sql 或 nosql 的数据库集成 

有很多不同的方式可以将 nest 与 数据库集成 它们都取决于我们的个人编号或项目的需求

我们这里会使用 成熟的 功能齐全的对象关系映射器 TypeORM(ORM)

TypeORM将让我们以类型安全且极其简单的方式与数据库中的实体进行交互 让我们比以往更快地的完成工作

这里我们会使用 在 docker 容器中启动并运行的 postgres 数据库 设置 TypeORM

TypeORM提供了对许多其他关系数据库的支持 比如 mysql microsoft sql server sqlLite 甚至像mongodb这样的nosql数据库

因此我们要使用最适合我们项目的内容

如果要使用 TypeORM 就要为在应用程序中(nest项目)安装必要的依赖项

```
npm i @nestjs/typeorm typeorm pg
```

在本章中介绍的过程对于 TypeORM 支持的所有数据都是相同的

接下来我们在 nest 项目中设置 TypeORM 打开 AppModule.ts 文件 然后找到 imports 配置项

nestJs中有一个模块 可以帮助我们 是 TypeORM 集成变得非常的简单

我们只需要选从 下面的包中 导入 TypeOrmModule
```
import { TypeOrmModule } from '@nestjs/typeorm';
```

然后在 imports 数组中添入
```
imports: [CoffeesModule, TypeOrmModule.forRoot()],
```

我们需要初始化这个模块 所以我们需要调用 forRoot() 方法 它允许我们配置与 TypeORM 的链接 以及 一些可用将其与 nest 集成的附加工具
```
TypeOrmModule.forRoot({配置对象})
```

```js
import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule, 
    TypeOrmModule.forRoot({
      // 使用的什么类型的数据库
      type: "postgres",
      host: "localhost",
      // 我们在 docker-compose yml 中设置的的端口
      port: 5432,
      // 用户名是默认的
      username: "postgres",
      password: "pass123",
      database: "postgres",
      // 自动加载模块 而不是指定实体数组
      autoLoadEntities: true,
      // 同步设置 确保 typeorm 实体在每次运行应用程序时都会与数据部同步
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
```

当我们配置完毕后 保证 docker 处于启动状态并运行了 postgres 数据库之后 

我们启动本地项目 会发现我们已经成功建立了 与 docker postgres 数据库的链接

```
PostgresSql 数据库并没有安装到本地电脑上 而是在 docker容器中 属于一个镜像

我们在docker compose yml 中配置了 PostgresSql 数据库的对内对外端口 所以我们的nest项目可以访问到这个数据库
```

<br>

# 创建一个 TypeORM 实体(Entity)
**实体:**  
表示 TS类 和 数据库表之间的关系

在 nest 应用程序中 我们使用实体将是用 @Entity() 装饰器装饰类

在上一节关于 TypeORM 的课程中 我们在 TypeORM forRoot() 配置方法中将synchronize设置为true

```js
@Module({
  imports: [
    CoffeesModule, 
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "pass123",
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
```

这种同步设置 让 TypeORM 在使用 @Entity() 装饰器装饰类的时候 自动将类创建一张sql表 以及表中有字段的信息(类中的属性)

这种自动同步为我们节省了大量的手动编码 没有这个配置的话我们就需要手动的填写这样的逻辑 

<font color="#C2185B">但是 synchronize: true的设置仅用于开发 我们要确保在生产中禁用此功能</font>

<br>

我们之前没有使用数据库的时候 是通过在 CoffeeService类中创建了一个属性 用来模拟数据库
```js
private coffees:Coffee[] = [
  {
    id:1,
    name: "Shipwreck Roast",
    brand: "Buddy Brew",
    flavors: ["chocolate", "vanilla"]
  }
]
```

然后使用 coffee.entity.ts 文件 限制了数据源的类型 模拟创建了数据源中应该有什么样的字段
```js
export class Coffee {
  id: number
  name: string
  brand: string
  flavors: string[]
}
```

现在让我们开始更新我们现有的模拟Coffee实体 并使用 TypeORM 进行设置

<br>

### TypeORM 的使用:
我们会丢弃 模拟的数据源 而直接从我们定义的 coffee.entity.ts 中的实体类入手 我们会使用类装饰器将这个实体类直接转换为sql表

首先, 我们从 typeorm 包中导入 Entity
然后, 使用 @Entity() 装饰器 装饰实体类

<br>

### **<font color="#C2185B">表名: </font>**  

**<font color="#C2185B">@Entity(): </font>** 
使用 @Entity() 修饰的类将会通过 TypeORM 创建一张 sql 表

换句话说每一个Entity类代表一个SQL表, 默认情况下 TypeORM将根据我们的小写类名命名 SQL 表

```
默认情况下: 实体类名(小写) 和 SQL表名 一致
```

如果想更改表名则可以使用如下的方式

```
@Entity("想要更改的表名")
```

```js
// /src/coffees/entities/coffees.entity.ts

@Entity()  // sql table == "coffee"
@Entity("coffees")  // 这样就会生成一个 coffees sql表
export class Coffee {
  id: number
  name: string
  // 品牌
  brand: string
  // 风味
  flavors: string[]
}

// 实体类名和sql表明一致 所以我们生成的 sql表明 就是 coffee
```

<br>

### **<font color="#C2185B">表中的字段: </font>**  

**<font color="#C2185B">@Column()</font>**  
列装饰器, 类中每个属性都会将映射到表中的字段(列)

参数:  
当我们要标识的字段是数组的时候 数组中的元素的约束可以如下的写法 json类型 可为空 (相当于 字段的类型 和 约束 吧)
```
@Column("json", { nullable: true})
```

如上设置后 TypeORM 将会知道 该字段应该将数据存储为json类型 同时为了使该列在我们的表中可选 我们在此处将此列设置为 json 

<br>

**<font color="#C2185B">@PrimaryGeneratedColumn() </font>** 
主键列装饰器, 我们会使用这个装饰器用于修饰主键 这个装饰器不仅会将 id 属性设置为表中的主键列 还会自动增加值 

```js
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()  // sql table == "coffee"
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // 品牌
  @Column()
  brand: string

  // 风味
  @Column("json", {nullable: true})
  flavors: string[]
}
```

注意 这里的每一列都是 不能为空 也就是必选的 也就是说 上面实体类中的属性 除了 flavors 是可选的 剩下的都是必须的

设置好了之后 我们要在应用程序中注册这个 Coffee 实体 因为我们的项目现在是模块化管理 

所以我们会在 CoffeesModule 中处理这个实体

```js
// /src/coffees/coffees.module.ts
import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {}

```

<br>

我们使用 TypeOrmModule.forFeature() 将我们上面Coffee实体类(映射数据表的类) 添加到 Coffee 模块中

**引入TypeOrmModule:**  
```
import { TypeOrmModule } from '@nestjs/typeorm';
```

<br>

**TypeOrmModule.forFeature([实体类]):**  
调用该方法 传入我们使用 @Entity() 装饰的类
我们使用 forFeature() 方法将 TypeORM 注册到 CoffeeService 模块中

我们在 app.module.ts 文件中的时候 使用过一次下面的代码用来初始化 TypeORM 和 数据库的链接
```
TypeOrmModule.forRoot({})
```

但注册实体(映射表)的时候 在其它的子模块中 我们要使用TypeOrmModule.forFeature()

**参数:**  
实体数组, 相当于传递了一张表

<br>

```js
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

// 导入了实体类
import { Coffee } from './entities/coffees.entity';

@Module({
  // 在 imports 配置项中使用
  imports: [TypeOrmModule.forFeature([Coffee])],

  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {}

```

上面就相当于我们通过 实体类 通过 TypeORM 在 Postgres数据库中 创建了一张数据表

如果我们使用 数据库的可视化客户端 查看 coffee 表的时候 它应该是如下的样子:

<br>

||COFFEE||
|:---:|:---:|:---:|
|id|integer|primary key auto inc|
|name|varchar||
|brand|varchar||
|brand|json||
|flavors|json||

<br>

# 使用 Repository(存储库) 访问数据库:
TypeORM支持存储库设计模式  

这意味着我们创建的每个实体(我们之前模拟数据源中的字段的类)都有自己的存储库

```
// @Entity()修饰的类数据库字段类
实体 -- 对应 --> Repository(存储库)
```

TypeORM 提供的 Repository 类作为对我们数据源的抽象 该类中提供了各种有用的方法用于与存储在我们数据库中的数据(记录)进行交互

```
Repository(存储库)  <->  Data source
```

```
实体 -> Repository <-> Data source
```

因为我们已经在 CoffeeModule 模块中注册了 Coffee(实体类) 

所以我们可以使用从 @nestjs/typeorm 包中导出的 @InjectRepository 装饰器 修饰一个类属性 这样该属性将自动生成变成存储库

并将其注入到我们的 CoffeeServive 中 这样我们就可以在 CoffeeServive 服务层从 与 数据库进行交互了

<br>

**<font color="#C2185B">@InjectRepository(实体类) </font>**  
参数: 实体类  
导入:  
```
import { InjectRepository } from '@nestjs/typeorm';
```

使用位置:  
constructor(这里)

形参类型:  
Repository<指定实体>

```js
import { InjectRepository } from '@nestjs/typeorm';
// 类型
import { Repository } from 'typeorm';
import {Coffee} from "./entities/coffees.entity"

export class CoffeesService {

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>
  ) {}

}
```

接下来我们就在 服务层 的类中 操作数据库中的数据 因为要读写操作 这里我们会将类中的方法改写为 await 的方式

<br>

**coffeeRepository属性**  
该属性中 有 存储库 中的很多方法 用于与数据库进行交互如, 类似不用我们写sql语句了:

- coffeeRepository.findOne()
```
参数为{}
如: {where: {}}
```
- coffeeRepository.find()
- coffeeRepository.clear()
- coffeeRepository.count()
- coffeeRepository.delete()
- coffeeRepository.getId()
- coffeeRepository.hasId()
- coffeeRepository.remove()
- coffeeRepository.update()
- coffeeRepository.create()
```
将传入的请求负荷(js对象)封装成 Coffee 实体
相当于创建了一个实体对象
```
- coffeeRepository.save()  
```
保存到数据库
```

- coffeeRepository.preload()
```
更新数据库中的某个资源 它会根据参数查询数据库 数据中有则返回一个实体对象
没有 则返回 undefined
```

- coffeeRepository.createQueryBuilder()
- coffeeRepository.countBy()
- coffeeRepository.decrement()
- coffeeRepository.extend()
- coffeeRepository.findAndCountBy()
- coffeeRepository.findBy()
- coffeeRepository.findOneBy()
- coffeeRepository.findOneByOrFail()
- coffeeRepository.findOneOrFail()
- coffeeRepository.increment()
- coffeeRepository.insert()
- coffeeRepository.merger()

- coffeeRepository.query()
- coffeeRepository.recover()
- coffeeRepository.restore()
- coffeeRepository.softDelete()
- coffeeRepository.softRemove()
- coffeeRepository.upsert()

<br>

我们能看到存储库中提供了封装好了很多操作数据库的方法 我们只需要调用这些封装好的方法就可以了

接下来我们整理下 service 层中的方法 通过存储库对象操作数据库

<br>

**<font color="#C2185B">查找所有: find() </font>**  
```js
findAll() {
  // 使用了提供的 find() 查找全部
  return this.coffeeRepository.find()
}
```

<br>

**<font color="#C2185B">查找一个: findOne() </font>**  
参数: {}  
属性: where: {}  

```js
async findOne(id: number) {

  // 使用了提供的 findOne 方法 代替查找一个
  let coffee = await this.coffeeRepository.findOne({
    where: {
      id: +id
    }
  })

  if(!coffee) {
    throw new NotFoundException(`Coffee #${id} not found`)
  }

  return coffee
}
```

<br>

**<font color="#C2185B">增加记录: create() & save()</font>**  
<font color="#C2185B">create(请求体)</font>  
我们将请求体传递进去 会返回一个 实体对象 

<font color="#C2185B">save(实体对象)</font>  
将生成的实体对象传入save中 保存到数据库

```js
// 增:
create(createCoffeeDto: CreateCoffeeDto) {
  // 添加方法 我们要先创建一个 Coffee类的实例
  let coffee = this.coffeeRepository.create(createCoffeeDto)

  // 调用save()方法 将创建的 coffee 保存到数据库
  this.coffeeRepository.save(coffee)
}
```

<br>

**<font color="#C2185B">修改记录: preload() & save()</font>**  
preload(id, 载荷) 该方法会根据id 先查询数据库 如果有则将记录返回 并做修改 然后我们再调用 save() 方法将修改后的记录保存到数据库

```js
// 改:
async update(id:string, updateCoffeeDto:UpdateCoffeeDto) {

  // preload()根据传入的对象创建一个新的实体 preload会先查看数据库中是否存在实体 如果存在则返回相关数据 并将所有值替换为我们新传入的值 如果没有则返回 undefined
  let coffee = await this.coffeeRepository.preload({
    // 修改哪个数据
    id: +id,
    ...updateCoffeeDto
  })

  if(!coffee) {
    throw new NotFoundException(`coffee #${id} not found`)
  }

  return this.coffeeRepository.save(coffee)
}
```

<br>

**<font color="#C2185B">删除记录: remove()</font>**  
先利用类中定义好的 fineOne 看看有没有该记录 然后再调用 remove()方法删除数据库中的记录
```js
// 删除
async remove(id: string) {
    // 先调用类中方法 findOne 检索 coffee 是否存在 如果存在则从数据库中参数
  const coffee = await this.findOne(+id)
  return this.coffeeRepository.remove(coffee)
}
```

<br>

# 创建两个实体之间的关系
relation(关系) 它是基于每个表的公共字段 表示两个表或多个表之间的关联 通常涉及到主键和外键

<br>

### 表与表之间有3种关系:
- 一对一 的关系  
主表中的每一行在外部表中都有一个且只有一个关联行 这种关系 

我们可以使用 TypeORM 中提供的 <font color="#C2185B">@OneToOne()</font> 装饰器来完成
```
coffee - coffe detail
咖啡表中的一个咖啡 关联着 咖啡详细表中的一条记录
```

- 一对多 或 多对一 之间的关系
```
              ↗   coffee
coffee brand 
              ↘   coffee
```
主表中的每一行在外部表中都有一个或多个相关行 这种关系

我们可以使用 TypeORM 中提供的 <font color="#C2185B">@OneToMany() || @ManyToOne()</font> 装饰器来完成

- 多对多
当主表中的每一行在外表中都有许多相关的行 并且外表中的每条记录在主表中都有许多的相关的行 这种关系

我们可以使用 TypeORM 中提供的 <font color="#C2185B">@oManyToMany()</font> 装饰器来完成

上一节里面 我们将 实体类 中的 flavors 字段的类型定义为了 json 类型
```js
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()  // sql table == "coffee"
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // 品牌
  @Column()
  brand: string

  // 风味
  @Column("json", {nullable: true})
  flavors: string[]
}
```

因此我们可以在其中存储一个数组 现在让我们解决这个问题 以使用 relatiton 并指向一个 新的 flavors表中的多条记录

意思就是 flavors 数组中的每一个成员都会对应 新flavors表中的记录

<br>

### 创建一张新的表:
我们先创建一个 flavor 实体类:  
```
nest g class coffees/entities/flavor.entity --no-spec
```
**注意:**  我们每创建一张实体类 都要在 module 里面注册下 要不用不了
```js
// coffee.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffees.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  // 这里注册一下
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],

  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {}

```


然后我们打开新生成的文件 定义相关的列
```js
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
```

定义 Flavor 表之后我们来处理两种表之间的关系 我们回到 Coffee 实体类 将该类中的 flavors 字段 改为 和 新表flavor表 设置为 多对多的关系

flavor风味表中一种风味可以对应多个coffee  
一个coffee也能对应多种风味 
```js
// coffee 实体类中的一个字段
@JoinTable()
@ManyToMany(type => Flavor, flavor => flavor.coffees)
flavors: string[]
```

我们引入了 <font color="#C2185B">@JoinTable()</font>装饰器 并添加到 flavors 属性上 该装饰器设置在 主表 方

现在我们已经加入了这些表 让我们定义我们希望在这些实体之间存在的关系类型 并使用相应的装饰器

在这种情况下 我们需要定义每个coffee可以有多种口味(flavor) 所以这里我们使用 @ManyToMany()来处理这种关系

我们在 @JoinTable() 的下方添加 <font color="#C2185B">@ManyToMany(回调1, 回调2)</font> 并传入参数 帮助这个装饰器理解 并为每一方建立关系

<br>

**<font color="#C2185B">@ManyToMany(回调1, 回调2)</font>**  
**回调1:**  
确定关系的 类型 是什么 它是一个函数 返回对 相关实体 的引用

**回调1:**  
该函数返回相关实体并制定需要选择的属性 在我们的 flavor表中我们将coffee引用为 coffee 属性

<br>

设置好了 Coffee 实体 我们再回到 Flavor 实体中继续设置关系
```js
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm"
import { Coffee } from "./coffees.entity"

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(type => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[]
}
```

```
@ManyToMany(type => Coffee, (coffee) => coffee.flavors)  
```
type => Coffee:  
相当于我们在这张表中指定了该字段对应哪张表

(coffee) => coffee.flavors
对应该表中的哪个字段

注意: 主表要加@JoinTable() 从表不用再加了

<br>

# 到这里就先不看了 计划整理完java侧 然后回来再看 nest 