### 项目开发中的dev, test, prod , staging 环境是什么意思
- 软件应用开发的经典模型有这样几个环境：
- 开发环境(development)、
- 集成环境(integration)、
- 测试环境(testing)、
- QA验证，模拟环境(staging)、
- 生产环境(production)。

> 开发环境（dev）
- 开发环境是程序猿们专门用于开发的服务器，配置可以比较随意，为了开发调试方便，一般打开全部错误报告。

> 测试环境 （test） 
- 一般是克隆一份生产环境的配置，一个程序在测试环境工作不正常，那么肯定不能把它发布到生产机上。

> 生产环境（prod）
- 是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。通常说的真实环境。

> 模拟环境(staging)
- 通常一个web项目都需要一个staging环境，一来给客户做演示，二来可以作为production server的一个“预演”，正式发布新功能前能及早发现问题（特别是gem的依赖问题，环境问题等）。

----------

### 项目的 env 文件使用
- 这个文件的产生是为了区分各个开发环境 
- 文件主要的作用是存储环境变量，也就是会随着环境变化的东西， 比如数据库的用户名、密码、缓存驱动、时区，还有静态文件的存储路径之类的。

> 要点:
- 1. .env文件(在项目根目录新建)
- 2. 定义变量需要以 VUE_APP_ 作为前缀
- 3. 配置文件开始要声明运行环境
```js
NODE_ENV = development / production
```

> .env
- 无论开发环境还是生成环境都会加载

> .env.development
- 开发环境加载这个文件
```js
NODE_ENV = development
VUE_APP_TEST_URL = http://localhost:3000/
```

> .env.production
- 生成环境加载这个文件


> 访问:
- process.env.TEST_URL


> package.json中使用 --mode 来配置启动哪个环境
> 要点:
- "serve": "vue-cli-service serve --mode development"

- development = .env.development 看的是后缀部分

- 运行​​npm run serve​​​的时候主要还是看​​package.json​​​中 ​​server​​​属性的​​--mode​​​后面跟的是啥。如果是​​development​​​，就会加载​​.env.development​​文件。

- 在​​package.json​​里面配置好，执行serve的时候用开发环境的。build打包用生产或者测试的

```js
"scripts": {
  "serve": "vue-cli-service serve --mode development",
  "build": "vue-cli-service build",
  "build:sit": "vue-cli-service build --mode production.sit",
  "build:uat": "vue-cli-service build --mode production.uat",
  "build:prod": "vue-cli-service build --mode production",
  "lint": "vue-cli-service lint",
  "et": "node_modules/.bin/et",
  "et:init": "node_modules/.bin/et -i",
  "et:list": "gulp themes"
}
```

----------

### cross-env
- 是运行跨平台设置和使用环境变量的脚本
- 用来解决上述 NODE_ENV = production设置环境变量时 报错的问题

> 为什么需要cross-env?
- 我们在自定义配置环境变量的时候，由于在不同的环境下，配置方式也是不同的。
- 当设置环境变量为 NODE_ENV=production 时，易造成 Windows 命令的阻塞。（除了 Windows 上的 Bash，因其使用本机 Bash）
- cross-env 使用单个命令，而不用担心环境变量的设置。像运行在 POSIX系统 上一样进行设置，cross-env 可以进行正确的设置


> 安装
- npm install --save-dev cross-env
<!-- 
  NOTE:
  cross-env 7 仅支持 Node.js >=10
  cross-env 6 需要使用 npm install --save-dev cross-env@6
 -->

> 使用方式:
- 直接在 package.json 文件中的脚本行里面 使用 
  cross-env NODE_ENV=development

- 用上面的形式定义环境变量 这个环境环境最终会被添加到 *process.env* 上
- 也就是说我们可以通过 process.env.变量名 来获取

- 我们定义任何变量都是 不仅仅只能是 NODE_ENV


**注意:**
- nuxt里面使用这种方式 不能不能定义 NODE_ENV
- nuxt里面会根据我们运行的指令 设置 NODE_ENV 的值
  - 比如我们运行的是 npm run dev 那么 NODE_ENV 的值: development
  - 比如我们运行的是 npm run build 那么 NODE_ENV 的值: production

- *cross-env NODE_ENV=development 定义变量的时候最好在开头的位置*


> 示例:
- 设置本地 NODE_ENV 值为development
- 设置线上 NODE_ENV 值为production
```js
{
  "scripts": {
    "serve": "cross-env NODE_ENV=development vue-cli-service serve --open",
	  "build": "cross-env NODE_ENV=production vue-cli-service build"
  }
}


if(process.env.NODE_ENV!='development'){
	//线上环境
}
```


> 自定义全局变量
- 根据相对应的变量进行不同的配置。
```js
{
  "scripts": {
    "dev:oneProject": "cross-env PROJECT_NAME=oneProject vue-cli-service serve"
  }
}
```

- 这个段代码我们设置了一个PROJECT_NAME的变量，通过process.env.PROJECT_NAME来获取到变量的值oneProject 。


> Kinto项目中使用场景
- 环境:
- nuxt

- 需求:
- 页面中的 <a> 连接的地址在 *开发环境* 的时候使用
  https://www.kinto_one.jp

- 页面中的 <a> 连接的地址在 *模拟环境* 的时候使用
  https://stg-www.kinto_one.jp


- 也就是说不同环境下的使用的变量是不一样的 这时候我们就可以使用 cross env 插件 

- 使用步骤:
- 1. 下载: npm install --save-dev cross-env
- 2. 在跟目录定义: env.staging.js 文件 该文件中配置了 该模式环境下使用的配置变量等

- 3. nuxt.config.js 中 使用 env配置项
- 从 process.env.MODE 读取 我们设置的 环境值(development?)
- 根据 environment 去读取根目录中的环境变量配置的文件
- 然后设置到 env 配置项中
```js
let environment = process.env.MODE || 'development'
let envSet = require(`./env.${environment}.js`)

export default {
  env: envSet,
}
```

- 4. package 文件中定义 环境变量
```js
"dev-stg": "cross-env MODE=\"staging\" npm-run-all -s dev",
```

----------

### dotenv配置环境变量
- dotenv可以用来书写一些配置选项，并且加载到process.env环境变量里面

> 1. 安装
- yarn add dotenv --save

> 2. 在项目根目录新建.env文件,并且写入相关的环境变量，命名格式以常量的命名格式来最好。
- 不用前缀 不用声明
```js
HOST_NAME=http://127.0.0.1
```

> 3. 在入口js写如下指令： require("dotenv").config()
> 4. 在需要的env里面的环境变量时，只需要输入process.env.xxx就可以拿到了

----------

### npm-run-all
- 作用:
- 这个工具是为了解决官方的 npm run 命令无法同时运行多个脚本的问题
- 它可以把诸如 
  npm run clean && npm run build:css && npm run build:js && npm run build:html 
  
- 的一长串的命令通过 glob 语法简化成 
  npm-run-all clean build:css build:js build:html

- 总结:
- "命令": "脚本"
- 我们可以利用这个包 执行多个 命令 部分

> 使用方式:
- 1. 下载: npm install npm-run-all --save-dev

- 2. 这个包提供三个命令
  - npm-run-all 
  - run-s 
  - run-p

**注意格式: npm-run-all --参数 其它命令**

> npm-run-all 按顺序执行 脚本
```js
{
  "start": "npm-run-all clean lint build"
}
```

- 当我们运行 npm start 命令的时候 会依次执行上面的三个任务


> 参数: --continue-on-error
- **如果某个脚本退出时返回值为空 那么后续脚本默认是不会执行的 如果想修改这样的默认情况 可以在后面追加参数 --continue-on-error**
```js
{
  "start": "npm-run-all --continue-on-error clean lint build"
}
```

---

> 参数: --parallel 脚本并行执行
- 并行执行 --parallel *后面指定的 脚本*
```js
{
  "start": "npm-run-all --parallel lint build"
}
```

- 并行执行(同时执行) 这两个任务
- **如果某个脚本退出时返回值为空 那么后续脚本默认是不会执行的 如果想修改这样的默认情况 可以在后面追加参数 --continue-on-error**

---

> 参数: 混合执行
```js
{
  "start": "npm-run-all clean lint --parallel watch:html watch:js"
}
```

- 上面的命令首先按顺序执行 clean lint
- 然后同时执行 watch:html watch:js 这两个脚本命令

- 示例:
```js
{
  "start": "npm-run-all a b --parallel c d --sequential e f --parallel g h i"
}
```

- 上面的代码会先
  - 首先 顺序执行 a b
  - 然后 同时运行 c d
  - 再次 顺序执行 e f
  - 最后 同时执行 g h i

---

> Glob通配符
- 作用:
- 可以使用 Glob 通配符来匹配任务名称，方便指定多个名称相似的任务

**注意:**
- 我们在定义 脚本命令的key(dev)的时候 要使用 : 来连接
```js
{
  "dev": "nuxt"
}

- 比如:
{
  "watch:html": "xxx",
  "watch:js": "xxx"
}
```

- 这样设置完后 我们就可以 运行: npm-run-all --parallel watch:*
```js
{
  "start": "npm-run-all --parallel watch:*"
}
```

---

> 附带运行参数
- 在 package 定义脚本的时候 在命令上挖坑 然后在控制台输入命令的时候 提供参数

> 占位符:
- {1}, {2}: 指定序号的单个参数
- {@}: All arguments
- {*}: All arguments as combined

- 1. 在配置脚本命令的时候 挖坑
```js
// 在脚本名称的后面 使用双引号来包裹来提供参数 \" \"
{
  "start": "npm-run-all start \" start-srever -- port {1} \""
}
```

- 2. 在控制台输入命令的时候 提供参数
- npm run start 8080

- 实际的运行结果: npm-run-all start start-server --prot 8000

> 相当于 `${可以传入的参数} 固定的参数` 模版字符串的写法