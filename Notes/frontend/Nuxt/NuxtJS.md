### 官方文档
https://www.nuxtjs.cn/api/configuration-generate

日文文档
https://nuxtjs.org/ja/docs/directory-structure/nuxt-config/


### v2.1.0 | 2.4.2版本的nuxt可能会解决样式顺序的问题 vuetify
### postcss 预设环境 6.3.0 也能解决这个问题？？？

### <nuxt-img>
https://image.nuxtjs.org/components/nuxt-img/

------

### 技巧

> nuxt generate 静态页面内容
package.json: 

    "generate": "nuxt generate"

运行 npm run generate (打包)命令后 每个对应的页面都会生成一个html
该方式打包出来的结果 每个页面会对应一个html页面 只有首屏的数据是渲染好的
可以理解为静态的页面 当首屏数据发生更改的时候 它显示的还是之前的数据
<!-- 
  你在打包的时候不能关闭后台，他会请求后台数据生成首屏的数据
  这样打包有一个弊端，当你首屏的数据发生更改的时候，他还是显示的是之前的数据，要想改变的话，需要重新打包发布才行

  所以， 如果你的首屏是动态的就不建议使用这种打包方式了

  ---

  打包之后每个页面都生成了HTML页面，只有首屏的数据是之前渲染好了，
  但是其它数据还是从后台获取，比如翻页，第二页数据是重新请求后台的，你再次返回第一页也是再次请求的
 -->


> nuxt build 动态页面内容
package.json: 

    "build": "nuxt build",

build打包生成的是动态页面，当然是同样具有SEO功能


> 上述两个命令 在发布上的区别：
generate:
打包方式简单，执行 npm run generate 会生成dist文件夹，放到服务器就好了。

build:
1. build打包方式比较复杂，执行npm run build命令。
2. 执行命令之后需要把下面这几个文件/文件夹放到服务器上
.nuxt
static
nuxt.config.js
package.json

3. 放到服务器上面之后执行npm i,把需要安装的包给安装了
4. 然后执行命令npm start项目就可以运行了
<!-- 
  但是服务器上不可能用命令窗口来启动项目的，万一命令窗口关闭的话我们的项目就跑不起来了，然后就要使用pm2进行进程托管了。这样命令窗口关闭也不会影响项目运行
 -->


> 安装pm2
npm i -g pm2
https://blog.csdn.net/qq_33315564/article/details/107523958



> mock
https://blog.csdn.net/qq_21567385/article/details/108251232
https://zhuanlan.zhihu.com/p/30583316


> 组件内部 给html部分添加 script 标签
场景:
在Kinto的项目中 nuxt 环境下 有一个功能是必须在html页面里面引入 script 标签的
但是 nuxt 的项目里面 使用的是 default.vue 模板 不知道应该将 script 添加到哪里

解决方式:
我们在页面的组件内 使用 head配置项:

```js
// html側で以下読み込み必須
// <script charset="UTF-8" data-mil-loader="https://kinto.mil.movie/bosTe8/js/mil_loader.js" />

// 解决方式:
head: {
  script: [
    {
      charset: "UTF-8",
      "data-mil-loader": "https://kinto.mil.movie/bosTe8/js/mil_loader.js"
    }
  ]
}
```

> head里面添加 link标签
```js
head: {
  link: [
    {
      as: "style",
      rel: 'stylesheet preload prefetch',
      type: "text/css",
      // crossorigin: "anonymous",
      href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap',
    }
  ],
},
```

------

> nuxt里面怎么使用 事件总线

```js
// plugin-bus.js
import Vue from 'vue' // 或者使用mitt

export default (_, inject) => {
  inject('bus', new Vue())
}
```

```js
// 绑定事件
this.$nuxt.$on('init', () => {
  console.log('init')
})

// 获取事件
this.$nuxt.$emit('init')
```

------

> composition API下怎么使用的事件总线
```js
import {defineComponent, reactive, onBeforeMount, getCurrentInstance, watchEffect} from "@nuxtjs/composition-api"

setup() {
  let {proxy} = getCurrentInstance()

  function updateLayout() {
    proxy.$nuxt.$emit("updateLayout", layoutData)
  }
  function updateHeader() {
    proxy.$nuxt.$emit("updateHeader", meta)
  }
  
  onBeforeMount(() => {
    updateLayout()
    updateHeader()
  })
}
```

------

> nuxt下使用 composition API
https://composition-api.nuxtjs.org/getting-started/setup

> 安装:
1. npm i @nuxtjs/composition-api
2. nuxt.config.js
```js
{
  buildModules: [
    '@nuxtjs/composition-api/module', // 追加
  ],
}
```


> 使用 composition api 调节head标签里面的内容

1. 导入 useMeta defineComponent
import { useMeta, defineComponent } from '@nuxtjs/composition-api'

2. 先定义一个 head: {} 配置项 用以激活用 为空就可以
3. 
```js
export default defineComponent({
  
  head: {},

  setup() {
    // 1. 从useMeta中解构出 对应的 内容
    const { title } = useMeta()
    title.value = 'My page'

    // 2. 定义初始值
    const { title } = useMeta({ title: 'My page' })

    // 3. 我们传递一个对象放进 useMeta() 函数里面  该对象就是meta中的 内容
    useMeta({ title: 'My page', ... })

    // 4. 想让 meta的值是响应式的 或者说 取其它响应数据里面的值的话 我们可以传入一个函数
    const message = ref('')
    useMeta(() => ({ title: message.value }))
  }
})
```

> 扩展
我们能从 useMeta() 里面解构出来什么
1. const { script } = useMeta()
```js
const { script } = useMeta()
script.value = [
  {
    src: '/redirect.js'
  }
]
```

2. 我们可以在 useMeta({配置项}) 里面写什么?
```js
    charset (default utf-8)
    viewport (default width=device-width, initial-scale=1 ?)
    name
    description
    author
    lang
    ogSiteName / ogTitle / ogDescription / ogHost (more)
```
```js
useMeta({
  author: 'Jon Doe'
})
```

3. meta标签中的name content 怎么写
```js
// 默认配置吧
useMeta({
  title: 'My title',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'My description',
    },
  ],
})


// 赋值形态
const { meta } = useMeta()
meta.value = [
  {
    hid: 'og:description',
    property: 'og:description',
    content: 'OGPの説明',
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'OGPのURL',
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: 'OGPの画像',
  },
]


// 普通的 name content
meta: [
  // hid は一意の識別子として使用されます。 `vmid` は動作しないので使わないでください。
  {
    hid: 'description',
    name: 'description',
    content: 'My custom description'
  }
]
```


> <no-ssr>
该组件用于设置组件不在服务器渲染中呈现。
https://www.bookstack.cn/read/nuxtjs-guide/31fa4be0c4876195.md
```html
<no-ssr placeholder="Loading...">
  <!-- 此组件仅在客户端呈现 -->
  <comments />
</no-ssr>
```
<!-- 
  <client-only>
 -->

> 在nuxt下使用window 判断是在客户端还是在服务端
```js
if(process.browser) console.log(winodw)
if(process.server)
if(process.client)
```
https://www.cnblogs.com/goloving/p/11397285.html


> 在Nuxt里面自动导入组件
https://zenn.dev/kokota/articles/14beffb9e846f0

在nuxt.config.js中进行配置


> 总结问题
1. 后端使用什么语言为主 一般是使用nodejs 但是使用别的语言可以么
<!-- 
  我们的项目后台要使用什么？ 也就是我们后端服务是谁启动的
  如果是阿帕奇 那就跟 nuxt就没有关系了 

  php可以负责跟资料库的链接出api的这些事

  这里的webserver是nodejs
  淘宝的前端 用nodejs做网页的服务 
  但是api是java来做的

  在本机起了一个server run在了3000
 -->  

### CSR
客户端渲染： 
我们请求回来的数据是通过vue react art-template 等模板框架注入生成的页面，这样的页面当爬虫在爬取内容的时候是爬取不到的

---------------

### SSR
流程：
用户请求页面，后端先获取数据 通过后端的渲染引擎模板 next nuxt 把数据注入到页面结构中 
将携带数据的完整的页面结构返回给客户端 这样爬虫就能爬取到页面的数据 因为页面的数据是在后端准备好的

<!-- 
  我们可以查看 查看源代码 不是f12 body 中有没有数据结构就能看出来是否是CSR渲染 还是 SSR渲染
  简单的理解 就是在服务端将vue渲染成 html 返回给浏览器
 -->

---------------

### 区别
客户端渲染可以减轻服务端的压力 达到前端后分离开发 但是对seo优化不是很好
服务端渲染对seo优化很好 但是对服务器的要求会非常的高 不利于前后端的分离
实际开发中会 CSR 和 SSR 搭配使用

> 首屏的打开速度
首屏的打开速度 会比 spa 要快

---------------

### nuxt 服务器渲染 基本使用(基本逻辑)
> 1. 初始化 项目文件夹
npm init -y

> 2. 安装
npm i vue vue-server-renderer -save
有了这个包才能完成服务端的渲染

> 3. 创建 server.js 文件 以及配置了 启动命令
npm run dev 启动服务器文件
```js  
  "scripts": {
    "dev": "nodemon ./server.js"
  }
```

> 4. 在 server.js 文件中 创建Vue实例
注意：
我们要通过 commonjs 的语法规范引入 Vue
```js  
  const Vue = require('vue')
  const app = new Vue({
    template: `
      <div>
        <h3>我今天开始学习nuxt了</h3>
      </div>
    `
  })
```

> 5. 创建 服务端渲染对象
1. 我们要引入 vue-server-renderer 库 它是一个渲染器
2. 通过 这个库身上的 createRenderer() 方法创建 renderer对象
```js 
  const renderer = require('vue-server-renderer').createRenderer()
```

> 6. 将 vue实例渲染为HTML
我们将vue实例传入到第一个参数的位置，渲染成功后会产生html代码
也就是说 准备html的阶段是在后端完成的 我们需要将 html 代码返回到浏览器端

> 方式1：普通方式
> renderer.renderToString(vue实例, (渲染后HTML) => { })
```js  
  renderer.renderToString(app, (html) => {
    console.log(html);
  })
```

> 方式2：promise方式    推荐
> renderer.renderToString(vue实例).then(html => { })
```js  
  renderer.renderToString(app).then(html => {
    console.log(html)
  }).catch(err => {
    console.log(err)
  })
```


> 将后端生成的html代码 响应回前端浏览器
上面的内容里 我们知道如何去后端渲染一个文件 利用vue框架创建了实例， 
然后利用了vue-server-renderer库来将vue框架渲染成了html文件

接下来我们需要做的就是 将这个html文件 响应回客户端
那么这就需要 我们搭建一个 node 服务器

要点：
在请求 / 路径的时候，在回调内部
创建 vue实例 -- 使用renderer渲染html文件 -- 响应回客户端

```js  
  const Vue = require('vue')

  const express = require('express')
  const server = express()

  server.get('/', (req, res) => {
    const app = new Vue({
      template: `
        <div>
          <h3>我今天开始学习nuxt了</h3>
        </div>
      `
    })

    const renderer = require('vue-server-renderer').createRenderer()
    renderer.renderToString(app).then(html => {

      // 这里是因为 直接响应html 会没有html的整体结构 所以这样
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          ${html}   这里
        </body>
        </html>
      `)
    }).catch(err => {
      console.log(err)
    })
  })

  server.listen(8000, () => {
    console.log('服务器已开启 8000端口')
  })
```

--------------------

### nuxt框架安装 开发 打包 环境介绍
vue开发的是单页面应用 有一个缺点就是seo不友好 除非vue的组件能够在服务端完成渲染 并直接返回渲染好的页面

> npx create-nuxt-app .
使用该命令搭建nuxt环境，在*当前的项目文件夹*下安装nuxt框架 有点像脚手架呢
<!-- 
  npx create-nuxt-app@2.9.2 .
  新版本的 nuxt 不带server了
 -->

> 安装问题
01. 项目名称
02. 项目描述
03. 项目使用语言 
  js
  ts

04. 包管理工具
05. ui库
06. 服务器端渲染的框架 
07. 交互工具
08. 校验工具
09. 测试框架
10. 渲染模式 universal选这个

---------------

### 修改项目运行的端口
我们需要在package.json文件中加上

```js
"config": {
  "nuxt": {
    "host": "127.0.0.1",
    "port": "8001"
  }
},
```

---------------

### 安装scss

> 安装
npm install --save-dev node-sass sass-loader
<!-- 
  sass-loader的版本不能太高
  太高了容易报错

  "sass": "^1.46.0",
  "sass-loader": "10",

  node -v  14.11.0
 -->

> 配置
或者再 nuxt.config.js 里面配置
  - 1. 
    - 在asset文件夹下新建css文件夹，
    - 在css文件夹中新建index.scss文件，
    - 作为scss样式的总入口，
    - 然后在index.scss中通过@import引入其他scss样式文件
<!-- 
  scss文件整理到哪里 没有关系 通过 相对路径能找到就可以
 -->

  - 2. 在nuxt.config.js文件中的css配置项中 引入index.scss文件

或者组件内直接使用

```js
module.exports = {
  css: [
    // 直接加载一个 Node.js 模块。（在这里它是一个 Sass 文件）
    'bulma',

    // 项目里要用的 CSS 文件
    '@/assets/css/main.css',

    // 项目里要使用的 SCSS 文件
    '@/assets/css/main.scss'

    // 或者这么写
    { src: '~/assets/css/index.scss', lang: 'scss' }
  ],

  // 示例2:
  css: [
    "~/assets/css/base/_reset.scss",
    { src: '~/src/style/module/style.scss', lang: 'scss' },
    { src: '~/src/style/layout/_container.scss', lang: 'scss' }
  ],
}
```

~ 和 @ 在没有配置根目录的情况下 都代表项目的根目录(rootDir)
~~ 和 @@ 代表rootDir


### nuxt对components里面的组件 是自动导入 无需手动导入


### 关于 ~ @ 路径 引入的问题
http://www.qiutianaimeili.com/html/page/2021/02/202688dieg8ofch.html

---------------

### 项目目录结构：
assets
  - 资源性的文件夹
    默认情况下 nuxt使用 vue-loader file-loader url-loader
    这几个webpack加载器来处理文件的加载 

    对不需要通过webpack处理的静态资源文件 可以放置在 *static* 文件夹中
    （像 robots.txt 或 sitemap.xml 这种类型的文件就很适合放到 static 目录中。）

    放置webpack打包处理的资源文件 如scss css 图片 字体等
    <!-- 
      默认情况下, vue-loader自动使用 css-loader 和 Vue 模板编译器来编译处理 vue 文件中的样式和模板。

      .png 并非 JavaScript 文件, 
      因此 Nuxt.js 通过配置 Webpack 使用file-loader 和 url-loader 这两个加载器来处理此类引用。
     -->

components
  - vue里通用可复用的组件
    *放在这里的组件并不支持 服务端的钩子*
    <!-- 
      组件目录 components 用于组织应用的 Vue.js 组件。
      Nuxt.js 不会扩展增强该目录下 Vue.js 组件，
      即这些组件不会像页面组件那样有 asyncData 方法的特性。
     -->

layouts
  - 用于展示布局 默认情况下 有default.vue布局 未来可以更换其他布局
    我们组件最终会在这个布局文件里面
    layouts 用于定义 网页中主体部分 相当于我们如何给一个div 也就是vue挂载的区域进行布局


middleware
  - 用于存放中间件 所有的页面在运行前 可以运行这里的文件

pages
  - 路由组件

plugins
  - 存放插件 组织和配置vue在实例化之前需要的插件
  - 比如我们可以在这里配置一些初始化的操作
```js
// plugins
import Scroll from "../src/javascripts/module/Scroll";
import Tab from "../src/javascripts/module/Tab";
import EnviromentLinkChange from "../src/javascripts/module/EnvironmentLinkChange";

window.addEventListener("load", () => {
  new Scroll();
  new EnviromentLinkChange();
});

document.addEventListener("DOMContentLoaded", () => {
  new Tab();
});


// nuxt.config.js
plugins: [
  '~/plugins/itemCard.js',
  '~/plugins/vueLazy.js',

  // window对象在服务器端是看不见的 所以我们要ssr设置为false
  { src: '~/plugins/init.js', ssr: false },
]
```

server
  - 服务端的配置 主要是node里面的配置代码 node接口会写在这里文件的下面

static
  - 存放不需要webpack处理打包的静态资源文件 存放在这里js css等一些库

store
  - nuxt集成了vuex的功能 vuex相关东西会放在这里

.editorconfig
.gitignore

nuxt.config.js
    nuxt的个性化的配置一遍覆盖默认配置


> 默认的命令
npm run dev启动项目
npm run build打包项目
npm run start运行打包后的文件

---------------

### nuxt.config.js 中的配置项

> 1. target
在介绍这个属性之前 我们要先了解 怎么生成 静态网站
如果我们想要使用静态网站的话 那么整个应用就会在构建的阶段被渲染
我们可以将静态站部署到 类似 Netlify、GitHub pages、Vercel 这样的 托管服务器上 这就意味着我们不需要服务器了

当我们将 target: static 设置为 static后 所有的.vue文件都是以html和js文件生成的

而页面中所有对api的调用 都被缓存再生成的内容中一个名为static的文件夹中 从而消除了在客户端转换时调用api的需求


值为: static | server
对于静态网站，需要在你的nuxt.config文件中 标识为 static

```js
export default {
  target: 'static' // デフォルトは 'server'
}
```

当我们设置为 static 后:
在运行 npm run dev 命令后
1. 会从 context 上 删除 req res
2. 对于服务器端的渲染，$route.query和{}总是相等的
3. process.static は true になります


当我们设置为 server 后：
所谓的服务器托管 就是运行在后台的nodejs服务器上
用户打开我们的页面的时候 用户的浏览器从服务器上请求该页面
nuxt负责处理这次请求 将页面进行渲染 并生成所有内容的页面进行返回

可能我们在使用 static 静态页面的时候 我们打包的时候使用 nuxt generate
如果我们是动态的服务器渲染的时候 我们打包的时候使用 nuxt build


> 2. build
Nuxt允许你定制你的webpack配置，并按照你的意愿构建你的web应用。
<!-- 
  Nuxt.js 允许你在自动生成的 vendor.bundle.js 
  文件中添加一些模块，以减少应用 bundle 的体积。
  如果你的应用依赖第三方模块，这个配置项是十分实用的。
 -->

类型: {}
也就是说它里面有属性 属性可以叫做子配置项

\\ corejs
nuxt v2.14以后
Nuxt会自动检测Core-js的当前版本。 你还可以指定使用哪个版本。

类型: number | string
有效值: 2 3 auto
默认值: "auto"

---

\\ babel
为JavaScript和Vue文件定制Babel设置。 默认情况下，.babelrc被忽略。

类型: {}
默认:
```js
{
  babelrc: false,
  cacheDirectory: undefined,
  presets: ['@nuxt/babel-preset-app']
}
```
@nuxt/babel-preset-app的默认目标是ie: '9' 用于客户端构建，node: 'current' 用于服务器构建。


> 3. css
该配置项用于定义应用的*全局（所有页面均需引用的）样式文件*、*模块或第三方库*。
<!-- 
  如果想使用sass的情况下 需要安装 node-sass sass-loader
 -->

```js
export default {
  css: [
    // Node.js モジュールを直接ロードする（ここでは Sass ファイル）
    'bulma',
    // プロジェクト内の CSS ファイル
    '~/assets/css/main.css',
    // プロジェクト内の SCSS ファイル
    '~/assets/css/main.scss'
  ]
}
```

> 4. env
该配置项用于定义应用客户端和服务端的环境变量。
省去了在根目录写 .env.development 文件的方式
```js
env: {
  apiUrl: process.env.API_BASE_URL + "/api/v1",
  baseUrl: process.env.BASE_URL,
  isDemo: process.env.IS_DEMO,
  apiKey: process.env.API_KEY,
},
```

> 5. generate
这个配置项 是在我们的应用程序 被设为静态站的时候 使用的配置项
在我们使用 nuxt generate 命令后 会使用该配置项中定义的内容

nuxt generate 命令可以生成静态文件 这样在没有服务器的时候 也可以访问这些文件的内容 而这个命令可以按照路由来生成 html文件 并且这些html文件会在 /dist 文件夹中

该配置项用于定义每个动态路由的参数，Nuxt.js 依据这些路由配置生成对应目录结构的静态文件。
<!-- 
  做过seo的同学都知道，一些不是实时变化的页面（比如一个星期更新一次内容）我们可以生成静态的站点去让爬虫去爬去，这样就无需一次次地调用接口了。

  那么在nuxt中我们怎么去做呢？

  nuxt为我们提供了一次generate的钩子，在nuxt.config.js中，我们去添加generate钩子
 -->

generate: 的值为 { ... }

```js
generator: {
  dir: "html",      // 
  concurrency: 10   // ，
  interval: 100,    // 
  crawler: false    // 

  // 我们想要生成静态页面对应的vue文件路由，它返回一个数组对象，如下图实战代码：
  routes() {},

  cache: {
    ignore: [
      '.nuxt',  // buildDir
      'static', // dir.static
      'dist',   // generate.dir
      'node_modules',
      '.**/*',
      '.*',
      'README.md'
    ]
  }
}
```

\\ cache:
类型: Object | false

作用：
如果被追踪的文件没有发生变化 那么这个选项可以避免 rebuild

该配置项内有属性 ignore 值类型为数组
ignore里面位置的文件名 即使内容发生了改变 也不会进行 rebuild

注意：
该选项在 nuxt generate 命令下 并且 target被设置为 static的时候用的

---

\\ concurrency:
我们在批量生成文件的时候一次产生的文件数量
如果我们的路由生成的时候是并行的时候 该配置项指定一个线程中执行的路由数量
英文: 并发 同时的

类型: number
默认值: 500

---

\\ dir:
在我们使用 nuxt generate 命令后 我们生成的静态文件的目录 静态文件就会生成在html文件夹内

类型: String
默认值: dist

---

\\ devtools
设置是否允许由vue-devtools检查。
如果你已经在nuxt.config.js或其他地方启用了它，不管这个标志如何，devtools都会被启用。

类型: boolean
默认值: false

---

\\ exclude
可以在数组中指定字符串 或者 正则 可以防止匹配的路由的生成 
在使用 fallback的时候 可以继续访问该路由

类型: array 内部元素为 string 或 regexp

```js
// 准备工作
-| pages/
---| index.vue
---| admin/
-----| about.vue
-----| index.vue


默认的情况下 我们使用 nuxt generate 命令后 会根据路由生成对应的html文件
// nuxt generate 结果
-| dist/
---| index.html
---| admin/
-----| about.html
-----| index.html


// 这么设定后 可以防止 admin下的路由生成 html 文件
export default {
  generate: {
    exclude: [
      /^\/admin/ // /admin で始まるパス
    ]

    // 这样也可以
    exclude: ['/my-secret-page']
  }
}


// 结果
-| dist/
---| index.html
```

---

\\ fallback
感觉是发生错误的时候 指定的页面
<!-- 
  要回溯的HTML文件的路径。 必须设置为错误页。 这个设置确保了未知路线也会通过Nuxt呈现。 如果没有设置或者设置了可以处理falsy的值，那么回退的HTML文件就被命名为200.html。 如果设置为真，文件名将是404.html。 如果指定了一个字符串作为值，则使用该字符串代替。
 -->
当我们设置为 true 的时候 就是404.html

类型: String | Boolean
默认值: 200.html

注意:
必须设置为 错误页面

示例:
```js
export default {
  generate: {
    fallback: '404.html'
  }
}
```

---

\\ interval:
  批量生成文件间隔

---

\\ crawler:
nuxt v2.13以后
比如我们的页面中有a链接的话，会生成a链接指向的页面的静态页面
<!-- 
  在nuxt里面会爬取相对路径 然后根据这个路径生成动态的连接
 -->

类型： boolean
如果不希望使用该功能 那么我们将其设置为false

--- 


\\ subFolders: bool
默认: true
默认情况下，运行nuxt generate将为每个路由创建一个目录并生成index.html文件。
也就是说 假如我们有一个 about文件夹 那他下面就会生成一个 index.html 文件

<!-- 
  | - pages
    | - about
      - index.html
 -->

设置为false时，将根据路由路径生成 HTML 文件：
当我们设置为 false 的时候 那么 about 文件夹就没有了 本身就会变成 about.html
<!-- 
  | - pages
    - about.html
 -->

---

\\ routes:
当我们运行 nuxt generate 命令后 nuxt会开始爬取页面中的 连接标签 根据它会安装一个边爬边生成路由的玩意

如果我们也想生成非连接的页面 可以使用这个属性

类型: array

注意:
Nuxt v2.12 以下的版本 在运行上面的命令后 会忽视动态路由

比如:
```js
-| pages/
---| index.vue
---| users/
-----| _id.vue
```

nuxt只会对非动态路由生成静态文件
如果我们也想对带有 动态参数的路由 生成静态文件的话 我们需要将动态路由 放入到 routes数组中

当我们知道 动态路由都有哪些是 可以直接传入
```js
export default {
  generate: {
    routes: ['/users/1', '/users/2', '/users/3']
  }
}

// 当我们执行 nuxt generate 的时候
/users/1/index.html
/users/2/index.html
/users/3/index.html
```

但是如果路由动态参数的值是动态的而不是固定的，应该怎么做呢？
1. 使用返回 promise 的函数
2. callback(err, params) と一緒に Function を使う。




1. 使用一个返回 Promise 对象类型 的 函数。
```js
const axios = require('axios')

module.exports = {
  generate: {
    routes() {
      return axios.get('https://my-api/users').then(res => {
        return res.data.map(user => {
          return '/users/' + user.id
        })
      })
    }
  }
}
```

2. 使用一个回调是 callback(err, params) 的 函数。
```js
module.exports = {
  generate: {
    routes(callback) {
      axios
        .get('https://my-api/users')
        .then(res => {
          const routes = res.data.map(user => {
            return '/users/' + user.id
          })
          callback(null, routes)
        })
        .catch(callback)
    }
  }
}


// 另一种演示
module.exports = {
  generate: {
    routes(callback) {
      const blogData = require('./assets/json/blog.json')
      let routes = blogData.map(blog => `/blog/${blog.id}`)
      callback(null, routes)
    }
  }
}
```


> 6. head
该配置项用于配置应用默认的 meta 标签。


> 7. loading
该配置项用于个性化定制 Nuxt.js 使用的加载组件。


> 8. plugins
该配置项用于配置那些需要在 根vue.js应用 *实例化之前需要运行的 Javascript 插件*。
插件内的写法并不是说一定要 Vue.use() 什么 简单的导入也是可以的 例如
```js
// nuxt.config.js
plugins: [
  { src: '@/plugins/poly', ssr: true },
]


// poly.js 插件的js文件里面就没有注册之类的操作 只是简单的引用而已
import 'babel-polyfill'


// .babelrc
{
  "presets": [
    [
      "env",
      {
        "modules": false,
        "useBuiltIns": "entry"
      }
    ],
    "stage-3"
  ]
}
```


> 9. rootDir
该配置项用于配置 Nuxt.js 应用的根目录。


> 10. modules
modules 是 Nuxt.js 扩展，可以扩展它的核心功能并添加无限的集成。
类型: Array

```js
export default {
  modules: [
    // パッケージ名を使う
    '@nuxtjs/axios',

    // プロジェクトの srcDir からの相対パス
    '~/modules/awesome.js',

    // オプションを渡す
    ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

    // インラインで定義
    function () {}
  ]
}
```


> 11. buildModules
有些模块只在开发和构建时需要。 buildModules可以用来加速生产启动，并大大减少部署到生产环境的node_modules的大小。



> 10. router
该配置项可用于覆盖 Nuxt.js 默认的 vue-router 配置。
```js
module.exports = {
  router: {
    base: process.env.NODE_ENV === 'dev' ? '/' : '/test/'
  }
}
```

> 11. server
此选项允许您配置 Nuxt.js 应用程序的服务器实例变量。

> 12. hooks
回调中的形参详解:
1. generator
2. generateOptions

generator形参是一个对象
```js
{
  nuxt: { ... },
  options: { ... }    // config.js
  setPayload: () => {}
}
```

generateOptions形参是一个对象
它就是 generate 配置项里面的信息 完整信息



https://qiita.com/teriyakisan/items/bdd7079cf4ab3f285a64  -- 使用方式2
1. 创建 generator_hooks.js 文件
this.nuxt.hook() 方法 我们需要传递进 钩子名 和 对应的 回调
```java
module.exports = function() {
  this.nuxt.hook("generate:before", (param1, param2) => {
    console.log("param1", param1)
    console.log("param2", param2)
  })
}
```

2. 在 config 文件里面配置
```js
modules: [
  "@nuxtjs/axios",
  "@nuxtjs/pwa",
  "@/plugins/generator_hooks"
],
```

3. 运行 npm run generate

--- 

使用方式1:
它是一个对象:
hooks 是Nuxt 事件的监听器，这些事件通常在 Nuxt 模块中使用，但也可以在 nuxt.config.js 中使用

hooks里面的属性有:
Nuxt hooks
Renderer hooks
ModulesContainer hooks
Builder hooks
Generator hooks

而每个hooks类别中 又提供了多种hooks

我们拿build来举例使用:
hooks: {
  hooks是一个函数
}

hooks: {
  // 指定具体的hook
  build: {
    它又是一个对象 里面有一个函数作为回调 这个函数是提供好的
    done() {...}
  }
}

```js
import fs from 'fs'
import path from 'path'

export default {
  hooks: {
    build: {
      done(builder) {
        const extraFilePath = path.join(
          builder.nuxt.options.buildDir,
          'extra-file'
        )
        fs.writeFileSync(extraFilePath, 'Something extra')
      }
    }
  }
}
```


\\ generate hook

generate:before	 
  - 形参: (generator, generateOptions)	
  - 作用: 生成前的回调
```js
hooks: {
  generate: {
    before(generator, generateOptions) {

    }
  }
}
```

应用:
```js
// nuxt.config
export default {
  target: 'static',
  hooks: {
    export: {
      async before ({ setPayload }) {
        const categories = await backend.getCategories()
        setPayload({ categories })
      }
    }
  }
}

// pages/index.vue
export default {
  async asyncData({ params, error, payload }) {

    // 如果有就拿负载里面的
    if (payload) { return { categories: payload.categories } }

    // 如果没有就请求新的
    return { categories: await backend.getCategories() }
  }
}
```


generate:distRemoved	
  - 形参: (generator)	
  - 作用: dis文件夹(我们指定的文件夹)当被删除的时候 触发的回调


generate:route
  - 形参: ({ route, setPayload })	
  - 作用: 页面生成前的回调 便于动态的设置负载


generate:page
  - 形参: ({ route, path, html })	
  - 作用: 用户更新生成后的path和html时 触发的回调


generate:routeCreated
  - 形参: ({ route, path, errors })
  - 作用: 成功保存生成的页面时的钩子


generate:extendRoutes
  - 形参: (routes)
  - 作用: 更新用户生成的route时的钩子


generate:routeFailed
  - 形参: ({ route, errors })
  - 作用: 保存生成的页面失败时的钩子


generate:done
  - 形参: (generator, errors)
  - 作用: 生成完了時のフック


> components: false; // 禁止自动注入component
如果要兼容IE，请不要使用；

---------------

### 路由
Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置。
所谓的路由就是 页面和页面之间的跳转 我们可以使用 点击a标签的方式 也可以使用编程式的方式
<!--  
  如果需要使用 a标签 建议使用 <nuxt-link> 
 -->

> 基础路由(静态路由)
假如我们定义了 pages 目录结构为
<!-- 
  | - pages
    | - user
      - index.vue
      - one.vue

    - index.vue
 -->

那么nuxt会自动生成下面的路由规则
```js 
  routes: [

    // pages根目录下的 index.vue 文件作为访问的根目录
    - 路径为 /
    - 组件就是文件名
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },

    // 如果有文件夹的话
    - 路径为 文件夹的名字 /user
    - 里面的 index.vue 就是 这个路径下的内容文件
    - 里面的 别的vue文件 就是这个路径下的其它页面
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },

    // 当pages下有文件夹的时候 
    - 文件夹下的文件的name值为: 文件夹-具体文件
    - 路径为: 文件名/具体vue文件
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
```

**基础路由(静态路由)的总结**
1. index.vue 为当前文件夹下的对应内容页面
<!-- 
  比如
    | - pages
      - index

  那么我们访问 localhost:3000/ 的时候 访问的就是 index 页面
 -->

2. 当前目录下除了 index.vue 文件的其它文件 都是当前路径下的其它文件
<!-- 
  比如
    | - pages
      - index
      - home

  那么 home.vue 文件对应的就是 localhost:3000/home
 -->

3. pages/ 目录下有别的文件夹的时候
  - 文件夹根目录下只有 index.vue 
  - 那 index.vue 文件对应的路径是: /lexus

  - 文件夹根目录还有除了index.vue文件 之外的文件 
  - 那 other.vue 文件对应的路径时: /lexus/other

4. 组件的name属性
当 pages 里面没有文件夹的时候 该vue组件对应的name值为 文件名
当 pages 里面有对应的文件夹的时候 该vue组件对应的name值为 文件夹名/组件文件名



> 动态路由
在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。
<!-- 
  _id.vue
 -->

假如我们这么配置动态路由组件(也就是考虑到该组件需要接收参数的时候)
<!-- 
  | - pages
    | - _slug
      - comments.vue
      - index.vue

    | - users
      - _id.vue
      

    - index.vue
 -->

那么nuxt会自动生成下面的路由规则
```js 
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },

    // 此处的要点:
    - 1. 文件夹名下不带_
    - 2. 文件夹名就是路径名 /users
    - 3. 正常我们要访问该路径下的文件 对应的是 index.vue 文件
          但是这里因为是动态路由 所以我们文件名要以 _ 作为前缀开头

    - 4. _前缀开头的文件 文件的名字 就是parm格式的 接收参数所定义的变量

    - 5. name属性 就是 文件夹名字-接收变量的名字
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
        你会发现名称为 users-id 的路由路径带有 :id? 参数，
        表示该路由是可选的。
        如果你想将它设置为必选的路由，
        需要在 users/_id 目录内创建一个 index.vue 文件。



    // 这里应该是定义动态路由的另一种形式 文件夹中使用_
        | - _slug
          - comments.vue
          - index.vue
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
```


> 嵌套路由
> nuxt-child
用于呈现子路由界面

假如我们定义如下的 嵌套路由 文件夹的结构
<!-- 
  | - pages
    | - users
      - _id.vue
      - index.vue

    - users.vue
 -->

nuxt会将嵌套的路由解析成如下的规则
<!-- 
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
 -->

**嵌套路由的总结**
根目录下都是一级路由
当根目录下的文件夹名字 和 根目录下的文件 重名的时候
<!-- 
  | - pages

    // 同名文件夹里面的文件 就是子组件
    | - users
      - _id.vue
      - index.vue

    // 他就是父组件
    - users.vue
 -->


> 动态路由的扩展
Nuxt.js 可以让你在动态路由组件中定义参数校验方法。

> validate({params}) {...}
```js 
  比如：
  pages/users/_id.vue

  export default {
    validate({ params }) {
      // 必须是number类型
      return /^\d+$/.test(params.id)
    }
  }
```

如果校验方法返回的值不为 true或Promise中 resolve 解析为false或抛出 Error ， 
Nuxt.js 将自动加载显示 404 错误页面或 500 错误页面。

---------------

### 视图
关于 default.vue 文件的作用
整个外层是 html 文件
内层是 layout
<!-- 
  这层里包括了 vue组件 + nuxt配置的中间件和head部分
 -->

再内层就是 pages 文件夹下的内容


> 模板
src默认是应用的根目录
<!-- 
  nuxt脚手架创建的模板中并不包含src
 -->

模板指的是整个的网页(我们的layouts只是网页中的内容的主题部分)

定制化默认的html模板 只需要在src文件夹 创建一个 app.html 的文件。
<!-- 
  或者直接在根目录下创建 app.html 文件
 -->

默认模板为：
```html 
  <!DOCTYPE html>
  <html {{ HTML_ATTRS }}>
    <head {{ HEAD_ATTRS }}>
      {{ HEAD }}
    </head>
    <body {{ BODY_ATTRS }}>
      {{ APP }}
    </body>
  </html>

  这里的{{HEAD}}读取的是nuxt.config.js里的信息
  {{APP}}就是我们写的pages文件夹下的主体页面了。
  
  需要注意的是HEAD和APP都需要大写。
```

设置了默认模板后要重启服务器

```js
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head>
    {{ HEAD }}
  </head>
  <body>
    {{ APP }}
    <script type="text/javascript" src="/js/bundle.js"></script>
    <script type="text/javascript" src="/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/js/button-utils.js"></script>
    <script type="text/javascript" src="/js/footer-link.js"></script>
  </body>
</html>


<!-- nuxt config -->
head: {
  htmlAttrs: {
    prefix: 'og: http://ogp.me/ns#'
  },
  title: 'KINTO ラインアップ | 株式会社KINTO',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { hid: 'og:title', property: 'og:title', content: 'title' },
    { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    // TODO:URL差し替え
    // { hid: 'og:url', property: 'og:url', content: 'https://' },
    { name: 'robots', content: 'noindex' },
  ],
  script: [
    { src: '/customer/assets/js/jquery-3.4.1.min.js' },
    { src: '/assets/js/writeGlonav.js' }
  ],
  link: [
    { rel: 'canonical', href: 'url' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/assets/img/ic_favicon_001.ico'},
    { rel: 'stylesheet', href: '/assets/customer/css/base_layout.css' },
    { rel: 'stylesheet', href: '/assets/style/style.css' }
  ]
},
```


> 布局
> 默认布局
可通过添加 layouts/default.vue 文件来扩展应用的默认布局。
别忘了在布局文件中添加 <nuxt/> 组件用于显示页面的主体内容。
<!-- 
  <template>
    <nuxt />
  </template>
 -->


> 自定义布局 -- layout属性
layouts 目录中的每个文件 (顶级) 都将创建一个可通过页面组件中的 layout 属性访问的自定义布局。

1. 在 layouts 文件夹下创建布局
2. 在 pages 下的组件中 在配置项里面使用 layout配置项 指定 布局
<!-- 
  假设我们要创建一个 博客布局 并将其保存到layouts/blog.vue:

  然后我们必须告诉页面 (即pages/posts.vue) 使用您的自定义布局：
   export default {
    layout: 'blog'
  }
 -->


> 错误页面
你可以通过编辑 layouts/error.vue 文件来定制化错误页面.
虽然此文件放在 layouts 文件夹中, 但应该将它看作是一个 页面(page).

这个布局文件不需要包含 <nuxt/> 标签。你可以把这个布局文件当成是显示应用错误（404，500 等）的组件。

这就是一个独立的页面
<!-- 
  举一个个性化错误页面的例子 layouts/error.vue:

  <template>
    <div class="container">
      <h1 v-if="error.statusCode === 404">页面不存在</h1>
      <h1 v-else>应用发生错误异常</h1>
      <nuxt-link to="/">首 页</nuxt-link>
    </div>
  </template>

  <script>
    export default {
      props: ['error'],
      layout: 'blog' // 你可以为错误页面指定自定义的布局
    }
  </script>
 -->


> 默认 Meta 标签
Nuxt.js 允许你在 nuxt.config.js 里定义应用所需的所有默认 meta 标签，在 head 字段里配置就可以了：

一个使用自定义 viewport 和 谷歌字体 的配置示例：
```js
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  }
```


> nuxt.config.js 中配置 head 的方式
<html {{ HTML_ATTRS }}> 中的 HTML_ATTRS 也是在下方更改
```js
head: {
  title: 'dealer',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: '' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
},
```


### assets static
在模板中引入资源的时候 我们要注意下写法

```html
<!-- 引用 static 目录下的图片 -->
<img src="/my-image.png" />

<!-- 引用 assets 目录下经过 webpack 构建处理后的图片 -->
<img src="~/assets/my-image-2.png" />
```

**请注意:** 
从 Nuxt 2.0 开始，
~/alias将无法在CSS 文件中正确解析。
你必须在 url CSS 引用中使用 ~assets（没有斜杠）或@别名，即background:url("~assets/banner.svg")

试试这种
'@/assets/css/main.css',
'~/assets/css/main.css',

---------------

### 组件中新增的配置项
> head
配置当前页面的 Meta 标签, 详情参考 页面头部配置 API。

> layout
指定当前页面使用的布局（layouts 根目录下的布局文件）。详情请参考 关于 布局 的文档。

> loading
	如果设置为false，则阻止页面自动调用this.$nuxt.$loading.finish()和this.$nuxt.$loading.start(),您可以手动控制它,请看例子,仅适用于在 nuxt.config.js 中设置loading的情况下。

> transition
指定页面切换的过渡动效, 详情请参考 页面过渡动效。

> scrollToTop
布尔值，默认: false。 用于判定渲染页面前是否需要将当前页面滚动至顶部。这个配置用于 嵌套路由的应用场景。

---------------

### nuxt的生命周期
vue的生命周期跑在浏览器端，nuxt的生命周期跑在了服务端 和 客户端
需要注意的是，在任何 Vue 组件的生命周期内， 只有 *beforeCreate 和 created* 这两个方法会在 客户端和服务端被调用。其他生命周期函数仅在客户端被调用。

> 生命周期图：
```js
      incoming Request

            ↓

      nuxtServerInit      // 服务器初始化
      store action
            ↓

      middleware          // 中间件运行
      1. nuxt.config.js
      2. matching layout
      3. matching page & children

            ↓

      validate()          // 检验参数
      pages & children

            ↓

      asyncData() & fetch() // 异步数据处理
      pages & children

            ↓

          render          // 开始客户端渲染


  - 其中 中间件运行 到 开始客户端渲染
  - 会被包裹在 navigate <nuxt-link> 中

            ↓

        vue的生命周期

            ↓

  beforecreated created    // 既跑在了服务器端也跑在了浏览器端

            ↓

           其它
```

> nuxtServerInit:
请求会最先来到 nuxtServerInit 这个钩子 它只会运行一次

场景：
对vuex store的一些操作 对store的初始化会在这里操作

它需要运行在 store目录下的 actions 对象里面
```js 
  export const actions = {

    // 这个钩子中能够拿到store实例 和 上下文
    nuxtServerInit(store, context) {

      console.log('nuxtServerInit', store, context)
    }

  }
```
在这个钩子中我们经常初始化一些内容放到store中
nuxt内部会找到store目录找到主模块 并且去运行这个actions 这个钩子会在最开始运行


> middleware:
允许我们定义一些函数 让它们跑在页面和组件的渲染之前 它可以运行在全局 
也可以用在某一个布局页面之前 或运行在某一个组件之前

它的配置方案有3种：
1. nuxt.config.js
或者可以配置在这个配置文件中
如果修改了这个文件中的内容 那么必须要重新 因为它是nuxt的配置文件

1. middleware配置在router配置项中
匹配一个 auth 的中间件

2. 在middleware文件夹内定义 auth.js 文件
nuxt服务器在启动的时候就会找到这个模块 并且去运行它 路由每次跳转都会走这个中间件 它在做一个全局的守卫
```js 
  export default (context) => {
    // 在这个函数中我们可以完成一些全局守卫的逻辑
    console.log('middleware')
  }
```

> 扩展: context参数
  - context是服务端的上下文集合里面有很多的内容 我们可以从context中解构出来 
  - context可以将形参 写成 这样 {store, route, redirect, params, query, req, res}
  
  - store
  - route    单条路由的信息
  - redirect 后端的跳转
  - params
  - query    客户端携带的数据
  - req      请求对象
  - res      响应对象

```js
{
  isDev, 
  route, 
  store, 
  env, 
  params, 
  query, 
  req, 
  res, 
  redirect, 
  error
}
```

> nuxt.config.js 中的配置注释
```js 
module.exports = {

  router: {
    // 授权
    middleware: 'auth'      // 看这里
  }

  // 服务端渲染模式
  mode: 'universal',
  
  // 整个页面的头信息
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  // loading配置
  loading: { color: '#fff' },
  
  // 全局样式
  css: [ ],
  
  // 插件
  - Nuxt.js 允许您在运行 Vue.js 应用程序之前执行 js 插件。这在您需要使用自己的库或第三方模块时特别有用。
  plugins: [ ],
  
  // 模块
  devModules: [ ],
  
  modules: [ ],
  
  // 创建时候的配置
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
```


2. matching layout
可以配置在 /layouts/ 目录下的组件里面

```js
  打开这个文件夹下的组件，将middleware写在script标签里面
  <script>
  export default {

    // 可以这样写 用于连接外部的中间件
    middleware: 'auth'  // 页面层级的中间件定义

    // 也可以这么写 用于在组件内部定义中间件
    middleware() {
      console.log('layout_middleware')
    }
  }
  </script>
```
也就是说 我们的应用用到了 layout 里面的组件 这个 中间件就会被调用
使用该方式 也需要在 middleware 里面定义一个对应的js文件



3. matching page & children
middleware还可以定义在 pages目录下面的文件里面
也是可以script标签中定义中间件和2中的方式一样
当这个页面被加载时，该中间件会运行在这个组件实例化之前


这三种中间件的执行顺序：
nuxt.config.js  -- layout目录下的组件 -- pages目录下的组件

在middleware内部也可以抓取服务端的上下文信息 不能抓取到客户端的上下文信息

关于上下文信息 1中有



> validate()
这个钩子可以对页面 组件 进行动态参数有效性的请求 当浏览器发出请求时我们可以去校验客户端所携带的一些数据 
在这个钩子中校验这些数据是否正确 校验成功可以进入目标页面 校验失败返回404页面

当请求发出去之后 在所有的页面初始化之前 是我们的中间件 紧跟着页面还没有初始化 
我们的*组件还没有实例化时 会进入到 validate() 钩子*

*这个钩子必须要定义在页面组件* 因为它是用来拦截是否能进入页面的 定义在pages目录下的文件里

它写在 *配置项里面 和 methods 平级*
这个钩子也能够拿到 *context 上下文信息* 因为这个钩子主要是做所携带的参数的校验 我们可以从context身上解构出来{params, query}
```js 
  methods: {},
  validate({params, query}) {
    console.log('validate')

    // 最终要return boolean true代表通过 false代表没有通过
    // 如果是false 该页面会找不到
    return true 
  }
```


> asyncData() & fetch()
这两个钩子几乎是同时运行的 通常情况下会在这两个钩子里面做一些异步数据的请求

asyncData()：
适合渲染组件前 获取异步数据 它可以选择把数据返回 之后交由组件内部处理
**注意: 它只有在页面组件里面才有**

fetch()
它也适合渲染组件前 获取异步数据 *可以用来填充vuex状态树*

这两个钩子都会在每次页面调用之前被调用 也就是在服务端或切换到目标路由之前都会被调用 数据都可以在这两个钩子里面读取
由于是在组件化初始化前就被调用 这两个钩子中的方法 this是组件实例对象

这两个钩子通常使用在页面想要抓取数据时 我们可以提前先把数据抓好 最后交由渲染函数

位置：
也是配置项的一种，与methods同级


>>> asyncData(context)
作用： 
读取数据 将读到的数据返回给目标组件 也就是它所在的组件 返回的数据会和data配置项中的数据合并
<!-- 
  我们能从vc身上的data中读到返回的数据
 -->

该钩子需要return {} 对象中写数据
```js 
  asyncData() {
    console.log('asyncData')

    return {
      str: '1'
    }
  },
```
该钩子里面需要return 将数据返回组件 数据将会和组件进行合并 
比如目标组件可能会有自己的数据 data配置项 我们返回的数据会合并到data配置项中 也就是说请求到的数据 相当于存放在了data配置项中

**注意：**
每一个*服务端的钩子*里面都能拿到context 服务端的上下文信息 我们可以在上下文信息里面提取相关的内容


>>> fetch(context)
该钩子也是异步请求数据用的但是它的作用是将请求回来的数据存放在vuex中，
该钩子不需要return 但是需要从context身上解构出来store，利用store身上的方法 将数据保存到vuex中
```js 
  fetch({store}) {
    console.log('fetch')
  }
```

这里无需用return返回而是使用store里面的方式提交到vuex 
而是可以利用服务端的上下文对象中解构出来store对象利用它身上的方法将异步获取到的数据 保存在vuex里面


> render
服务端渲染 在这之前要把数据准备好 将渲染好的页面返回给浏览器 通过render
如果用户再次请求新的页面的时候 会直接到 middleware 这个钩子 不会到达 nuxtServerinit 

render函数不同页面间需要操作相同的数据请求的时候 只要数组发生了变化 render在服务端都会重新渲染 我们从asyncData拿到数据后重新render

它的内部不要写业务逻辑 它只能渲染一些配置 写了也不执行
上述的钩子都是跑在服务器端


> beforeCreate created
看起来像vue的钩子这两个钩子既运行在服务器端 也 运行在客户端
写在这两个钩子里面的逻辑非常有可能既跑在服务端 也 跑在客户端
我们在*这两个钩子中可以通过this能拿到 服务端的上下文 和 组件的自身*

这两个钩子同时会跑在服务端和客户端 两端都有打印
```js 
  // ssr & csr
  beforeCreate() {
    console.log('beforeCreate')
  },

  created() {
    console.log('created')
  }
```


> 其它就是vue中剩下的钩子 比如组件创建前 和 创建后...
这些钩子会跑在客户端
注意：
服务器渲染不存在 keep-live 不存在组件缓存 那也就是说没有那些扩展的钩子 比如组件激活时 失活时的钩子
<!-- 
  beforeMount()
  mounted()
  beforeUpdate()
  update()
  beforeDestory()
  destoryed()

  activated()
  deactivated()

  上述的钩子都是运行在客户端
 -->


> 在服务端 以及 客户端的钩子中 怎么拿到服务端的信息 和 客户端的信息
比如 服务端的钩子 
fetch asyncData middleware等 我们可以通过context拿到服务端的信息

但是在服务端运行时不能访问客户端 比如 我们想在 服务端的钩子里面 拿window对象
```js 
  middleware(context) {
    console.log(window)   // 这不行
  }
```
所有服务端的钩子都不能访问window对象 因为在服务端还没渲染之前是拿不到window对象的

服务器的钩子里面不存在window
我们可以在客户端的钩子里面抓取window对象

总结：
在服务端访问 context 上下文信息
在客户端访问 window


> this 服务端的钩子里this指向的是undefined
在客户端的钩子里面访问到的this是组件的本身
服务端的钩子里this指向的是undefined 也就是说我们需要在服务端的钩子里面使用context抓取服务端的内容

--------------------

### 上下文对象
 服务器端所有的钩子都会参数 上下文对象 该对象中的属性 和 方法很多
一般我们都是在形参中通过解构的方式 取出对应的对象 来使用

> 解构出得 req res 对象
在服务器端调用asyncData时，您可以访问用户请求的req和res对象。
```js 
  export default {
    async asyncData({ req, res }) {
      // 请检查您是否在服务器端 使用 req 和 res
      if (process.server) {
        return { host: req.headers.host }
      }

      return {}
    }
  }
```

> process.server 是否在服务端


> 解构出得 动态路由数据
可以使用配置它的文件或文件夹的名称访问动态路径参数。所以，如果你定义一个名为_slug.vue的文件，您可以通过context.params.slug来访问它
```js 
  export default {
    async asyncData({ params }) {
      const slug = params.slug // When calling /abc the slug will be "abc"
      return { slug }
    }
  }
```

--------------------

### nuxt约定式路由
nuxt的路由采用的是约定式方式：
我们需要在项目的环境下配置相关的页面 按照一定的规则将页面设置在 pages 目录下面 路由是自动产生的

> pages目录
nuxt会监听 pages 目录中的文件的更改 因此在添加新页面时无需重新启动应用程序
nuxt会一句 pages 目录中的所有 *.vue 文件生成应用的路由配置


> 一级路由规则：
直接配置在 pages 文件夹下 不用单独去配置路由 nuxt是约定式
我们放在 pages 文件夹下的一级文件 都会被当做是路由所跳转的一级目标文件

> 1. 在 pages 目录下创建好页面
路由的页面都是放在 pages 下面 nuxt 通过监听路径 会自动跳转到对应的页面上
<!-- 
  | - pages
    - index.vue
    - goods.vue
    - login.vue
    - user.vue
 -->

同时我们能在布局页面看到 (layouts/default.vue组件)

> <nuxt /> nuxt中路由的展示区
这部分也是要点 我们需要在 default.vue 组件中 设置 跳转页面的展示区 也就是 <nuxt />
```html 
  // ayouts/default.vue组件
  <template>
    <div>
      <nuxt />    默认会有一个展示区 相当于 router-view
    </div>
  </template>
```


> 2. 在 layouts/default.vue 布局页面中 使用 <nuxt-link> 进行跳转
<nuxt-link>的使用方式和<router-link>一样
还可以通过直接输入 地址来进行跳转
```html 
  <template>
    <div>
      <nuxt-link to='/'>首页</nuxt-link>
      <nuxt-link to='/goods'>商品</nuxt-link>
      <nuxt-link to='/user'>登录</nuxt-link>
      <nuxt-link to='/login'>用户</nuxt-link>
      
      <nuxt />
    </div>
  </template>
```


> 二级路由规则：
当我们创建二级路由的时候 也就是说下面的这种状态
我们身处 Goods路由组件 它当中还有按钮区 会跳转到 它的子页面

注意:
这里是动态路由
那我们怎么配置pages文件夹下的目录结构呢？
<!-- 
  <template>
    <div>
      <h3>Goods</h3>
      <nuxt-link to='/goods/1?a=1'>商品01</nuxt-link>
      <nuxt-link to='/goods/2?a=1'>商品02</nuxt-link>
      <nuxt-link to='/goods/3?a=1'>商品03</nuxt-link>
    </div>
  </template>
 -->

想要完成上面的 二级路由的跳转 我们就需要在 pages 文件夹中整理好文件夹的结构


> 1. 整理好跳转逻辑
我们点击按钮跳转到对应的商品详情页上
<!-- 
  <nuxt-link to='/goods/1?a=1'>商品01</nuxt-link>
  <nuxt-link to='/goods/2?a=1'>商品02</nuxt-link>
 -->

> 2. 创建 跟一级路由文件的文件名 一样的 文件夹名字 和 创建动态路由的文件夹
比如我们一级路由是 goods 那么我就创建一个 goods 文件夹 里面放的就是goods的子路由

动态路由的部分 我们定义在 | - goods 文件夹中 起名_id
<!-- 
  | - pages
    - goods.vue    一级路由组件
    | - goods      跟一级路由组件同名的文件夹 里面盛放 它的二级路由
      _id.vue      这个文件就指向了动态路由所指向的组件了
 -->

规则：
同名文件的文件夹 代表 下层路由(二级路由)
下层路由中 _id.vue _下划线代表的是变量 这个变量可以指向动态路由的参数位置
同时传递的params参数(/goods/1?a=1)都会在 _id.vue 这个组件里面
<!-- 
  <nuxt-link to='/goods/1?a=1'>

  _id.vue 就是 /1 的位置
 -->

还可以这么写 
name是路由组件的别名 当没有配置别名的时候 必须是文件夹的名字-id
这里注意没有_
params中的id必须意思是和_id.vue一个意思
想要传递的数据 我们可以通过query的方式传递进来
```js 
  <nuxt-link :to='{name:'goods-id', params: {id: 3}}'>
```


> 约定子路由的展示区
```html 
  <template>
    <div>
      <h3>Goods</h3>
      <nuxt-link to='/goods/1?a=1'>商品01</nuxt-link>
      <nuxt-link to='/goods/2?a=1'>商品02</nuxt-link>
      <nuxt-link 
        :to='{name: "goods-id", params: {id:3}, query:{a: 1000}}'>商品03</nuxt-link>

      <nuxt/>
    </div>
  </template>
```

> 我们通过 query 和 url拼接产生的参数 可以在 _id.vue 文件里 通过 $route 来获取到 


> 三级路由
上面我们完成了 怎么实现2级路由 我们从 商品 - 商品详情 - 商品评论
<!-- 
  | - pages
    - goods.vue
    | - goods
      - _id.vue
      - comment.vue
 -->

我们通过这种方式来完成跳转到三级路由
```js 
  // goods.vue 文件中
  <template>
  <div>
    <h3>Goods</h3>
    <nuxt-link to='/goods/1?a=1'>商品01</nuxt-link>
    <nuxt-link to='/goods/2?a=1'>商品02</nuxt-link>
    <nuxt-link 
      :to='{name: "goods-id", params: {id:3}, query:{a: 1000}}'>商品03</nuxt-link>


    // 这里
    <nuxt-link to='/goods/comment'>评论</nuxt-link>
    <nuxt/>
  </div>
</template>
```

> 总结一下：
> 一级路由规则：
在pages文件夹目录下创建.vue文件即可

跳转方式：
在 layout/default.vue文件中配置 配置跳转连接 和 显示区
```html 
  <template>
    <div>
      <nuxt-link to='/'>首页</nuxt-link>
      <nuxt-link to='/goods'>商品</nuxt-link>
      
      <nuxt />
    </div>
  </template>
```


> 二级路由规则
在pages文件夹目录下创建和一级路由文件名同名的文件夹
该文件夹中存放的文件代表它的二级路由文件
<!-- 
  | - pages
    - goods.vue
    | - goods
      - _id.vue
 -->

比如 goods.vue 下面还有路由文件 那么就在goods.vue文件里面设置
<nuxt-link> <nuxt />

如果 二级路由为动态路由 也就是url后面使用pathinfo类型的路径 那么 我们就要根据 pathinfo 的信息 创建对应的.vue文件

这里我们的动态路由是id 那么我们就创建了 _id.vue 文件 注意 _相当于声明接收id的感觉
<!-- 
  | - pages
    - goods.vue
    | - goods
      - _id.vue

  也就是说 goods 想有详情页那么就是这样的文件夹结构 _id.vue 就是goods的详情页
 -->

跳转方式：
方式一：
<nuxt-link to='/goods/1?a=1'>商品01</nuxt-link>
携带的参数 可以在 详情页 _id.vue 文件中 通过 $route 获取


方式二：
  <nuxt-link 
    :to='{name: "goods-id", params: {id:3}, query:{a: 1000}}'>
    商品03
  </nuxt-link>
v-bind绑定to 传递对象 params代表id部分 注意要和 _id.vue 呼应
我们传递参数可以通过 query

goods-id 是按照 目录的结构写的


> 如果 comment.vue 也想要有详情页 那么我们继续嵌套文件夹
<!-- 
  | - pages
    - goods.vue
    | - goods
      - _id.vue
      - comment
 -->

变成：

<!-- 
  | - pages
    - goods.vue
    | - goods
      - _id.vue
      - comment
      | - comment
        - _cid.vue    这个文件就是 comment.vue 的详情页
 -->

```html 
  <template>
    <div>
      <h3>Comment</h3>

      <nuxt-link :to='{name:"goods-comment-cid", params: {cid:1}, query: {x: 666}}'>点击跳转到详情页</nuxt-link>

      <nuxt-link to='/goods/comment/3?name=sam'>点击跳转到详情页2</nuxt-link>

      <nuxt/>
    </div>
  </template>
```

路由：
  约定式：
    展示区： <nuxt />
    声明式跳转： <nuxt-link :to='{name:"goods-comment-cid", params: {cid:1}, query: {x: 666}}'>

    name: 路有名 目录名-其它目录-文件名
    params： key 要对等文件名

--------------------

### 扩展路由
layout/default.vue 文件里面是整体应用的布局组件，我们也可以对整个应用的布局文件进行拆分，比如导航区一个组件等

我们可以将原先的整个布局组件，拆分成导航区自己是一个组件
<!-- 
  | - layout
    - deault.vue
    - navArea.vue
-->

```js
  // deault.vue组件
  <template>
    <div>
      <navArea />
      <nuxt />
    </div>
  </template>

  // navArea组件
  <template>
    <nav>
      <nuxt-link
        to='/'
        active-class="active">首页</nuxt-link>

      <nuxt-link
        to='/goods'
        active-class="active">商品</nuxt-link>

      <nuxt-link
        to='/user'
        active-class="active">登录</nuxt-link>

      <nuxt-link
      to='/login'
      active-class="active">用户</nuxt-link>
    </nav>
  </template>

  - 同时我们还给 按钮设置了 激活时的样式
```
  

但是 有一个问题，因为我们的路径都是基于/来跳转的，不管跳到哪个连接都有/的存在 所以就会产生 有激活样式的按钮始终包含了 首页
<!-- 
  to='/'       http://localhost:3000/
  to='/goods'  http://localhost:3000/goods
 -->

页面上会同时有 首页 和 商品都是处于被激活的状态
> 解决方式1：
使用： exact-active-class="active"
<!-- 
  <nuxt-link to='/' exact-active-class="active">首页</nuxt-link>
 -->

> 解决方式2：
扩展路由
上面我们关于路由的跳转都是基于pages下的目录 也就是说我们在pages目录下创建好文件 nuxt自动帮我们生成配置 找到对应的组件
比如：
我们通过 nuxt to="/" nuxt就会去 pages 文件目录里面找对应的组件
但是假如我们手动修改了url /index 
因为 to 中没有对应的匹配项 所以会找不到该页面 这时候我们就可以用下面的方式来操作

上面的方式都是利用了 pages文件夹 + nuxt-link + nuxt

当然我们还可以像在vue中在router配置项里面操作 自己书写规则，从而达到根据路径显示对应组件的目的

扩展路由需要在 nuxt.config.js 文件中的router配置项里完成

> 1. 在 nuxt.config.js 文件中 创建 router 配置项

> 2. 在 router配置项中 写 extendRoutes(routes, resolve) {}
nuxt在启动的时候会调用这个函数 并且会传递进来所有的路由信息 和 提供了resolve函数

resolve() 用于找到磁盘上的位置
routes 是所有路由配置的数组 我们可以往里面追加 新的路由配置
<!-- 
    router: {
      extendRoutes(routes, resolve) {
        console.log('routes', routes)
        console.log('resolve', resolve)

        routes.push({
          name: "root",     路由组件的别名
          path:'/index',
          
          // 使用 resolve 找到 组件 感觉有点像 node 里面的path.join
          component: resolve(__dirname, 'pages/index.vue')
        })
      }
    },
 -->

这里其实就是讲了两种配置路由的方式 一种是文件夹式 一种是push路由对象式 他讲的这个烂啊

--------------------

### 参数校验 validate() 服务器端的钩子函数
当我们进入到目标路由时 可能会对目标组件传递一些参数 我们希望在这个目标组件的内容做一些参数上的校验 避免别人传递给该组件错误的一些参数 导致我们跳转后让该组件拿不到参数 导致页面渲染出错

比如我们跳转到 商品的详情页面时 我们会给这个页面传递一个id 这是我们就可以校验这个id
我们就可以在这个 商品详情页面组件里面做一些 参数检测的工作
在这里我们使用 服务器端的钩子 validate() {}

> validate({params, query}) { ... }
这个函数返回 true 代表ok 染回 false 代表失败
我们可以从 context 中解构出 params query对象 用于校验参数

```js
  export default {
    validate({params, query}) {
      console.log(params)
      return typeof params.id === 'number'
    }
  }
```

--------------------

### 配置错误页面
当我们找不到页面的时候，nuxt会返回一个页面 这个页面是nuxt给我们提供的
现在我们定制一个属于自己的错误页面

我们需要在 /layouts 下创建一个 error.vue 组件 名字必须是这个
因为nuxt绝大数情况下都是约定式的

> 1. 在 /layouts文件目录下 创建 error.vue 组件
当发生error的时候 nuxt会自动将error对象发送到这个组件内部
里面包括错误码 和 错误描述
<!-- 
  props: ["error"]
  error: {statusCode, message}
 -->

我们可以通过 props 来接收
```js 
  export default {
  name:'error',

    // 我们可以使用 props 来接收这个err信息 我们可以根据错误描述信息决定内容是否存在
    props: ["error"]
  }
```

--------------------

### 路由跳转的时候的特效
我们路由在跳转的时候是缺少过渡效果的 我们可以在路由跳转的时候加一些统一的过渡动画效果

我们还可以给单独的路由添加这种过渡动画效果 转场动效

> 1. 我们在 assets 文件夹里面创建 全局的css样式
我们在这个css文件中 设置所有路由统一的动画效果
<!-- 
  | - assets
    - transition.css
 -->

> 2. 在这个css文件中我们要使用 约定好的类名
> .page-enter-active .page-leave-active 过渡还是动画
> .page-enter, .page-leave-active 具体改变什么属性
<!-- 
  .page-enter-active, .page-leave-active {
    /* 动画的形式是过渡 */
    transition: opacity .5s;
  }


  /* 入场 退场 */
  .page-enter, .page-leave-active {
    /* 改变的是透明度 */
    opacity: 0;
  }
 -->

> 3. 配置 nuxt.config.js 文件
因为 transition.css 是我们自己起的名字 不是约定式的 所以我们要去这个配置文件中修改下

在这里文件中 找到 css配置项 该配置项是用来修改全局样式的 重启后 路由跳转的样式就设置好了
<!-- 
  css: [
    "assets/css/transition.css"
  ],
 -->


> 组件内部单独的动画效果
在组件内部 使用 transition 配置项 该配置项和data methods 平级
```js 
  export default {
    transition: 'test'
  }

  <style>
    .test-enter-active, .test-leave-active {
      /* 动画的形式是过渡 */
      transition: opacity .5s;
    }


    /* 入场 退场 */
    .test-enter, .test-leave-active {
      /* 改变的是透明度 */
      opacity: 0;
    }
  <style>
```

--------------------

### 路由守卫
nuxt的路由守卫分为*前置和后置*，前置主要依赖中间件(middleware)和插件，后置主要依赖vue的钩子(beforeRouteLeave)

由于中间件middleware可以在nuxt.config.js文件中，layout布局页面中，还有组件本身中配置 所以就形成了

> 全局前置守卫守卫
nuxt.config.js 的middleware中定义
在 layouts 里面定义

1. 在 nuxt.config.js 配置文件中 -- router 配置项
2. 在router 配置项中定义 middleware 配置项

  router: {
    middleware: 'auth'
  }

3. auth.js 文件我们去 middleware 文件夹中配置对应的js文件
  - 这个js文件也是需要暴露出来的

```js
  export default ({store, route, redirect, params, query}) => {
    - 我们可以从context中解构出来有用的对象 来完成全局守卫的任务
    store: 可以拿到vuex中的数据
    route: 一条目标路由的信息
    redirect: 用于强制跳转
    params, query: 校验参数的合理性

    - 这些足够我们玩按成比较好的路由守卫的逻辑了
    redirect("/login")
  }
```

> 组件独享守卫
在组件内部使用 中间件 来定义
和上面的逻辑一样


> 插件 全局前置守卫
如果通过插件来配置的话 都是全局的守卫 它可以配置全局前置守卫 和 后置守卫

使用方式：
1. 我们在 plugins 文件夹下创建一个模块 比如 router.js
在这个js文件中 定义函数 并向外暴露
```js 
  export default ({app, redirect}) => {

    我们从context中解构出来当前应用的实例(也就是vc) 和 跳转功能
    console.log('插件')

    既然app是vc 那么它身上就会有 vue身上所有的东西比如 跟vue一样了
    全局前置守卫
    app.router.beforeEach((to, from, next) => {

        这里要注意 在nuxt中 next只能这么使用
        next(true) / next(false)

        next()

        不可以像在vue中
        next('/login')

        我们需要使用redirect来完成强制跳转
    })
  }
```

2. 在nuxt.config.js配置文件中 找到 plugins 配置项 注册插件
  ~ : 代表ssr 项目的根目录
<!-- 
  plugins: [
    '~/plugins/router'
  ],
 -->

**注意：**
nuxt中别名和文件名是一致的所以我们也可以使用利用别名来进行跳转
<!-- 
  redirect({name: "login"})
 -->


> 插件 全局后置守卫
步骤大体上跟上面一样，只不过我们通过 app 调用router身上的afterEach()方法
每个路由在离开时 后置守卫都会被触发
```js 
  app.router.beforeEach((to, from) => {
    这里没有next
  })
```


> 全局后置守卫 beforeRouteLeave钩子 组件独享的
后置守卫是可以访问到window对象的 因为后置代表它已经被渲染出来了
在插件的函数中也能拿到context的上下文，所以还是可以根据这个做路由守卫逻辑

beforeRouteLeave() {} 属于一个配置项跟methods平级
这里是有next的 我们允许还是不允许过
```js
  beforeRouteLeave(to, from, next) {
    let bl = window.confirm('您是否要离开')
    next(bl)
  }
```



--------------------

### 数据交互 和 跨域 asyncData fetch
在nuxt中我们要做数据交互的话要下载两个库
@nuxtjs/axios, @nuxtjs/proxy 

axios是nuxt中自带的一个模块 但是默认是没有添加的 我们需要自己下载

> 1. npm i @nuxtjs/axios @nuxtjs/proxy --save

> 2. 我们找到 nuxt.config.js　配置文件中 找到 modules 配置项
注意：
nuxt自身携带的模块 都需要在 modules配置项里面配置进来 modules是一个数组
```js  
  // 不用添加 @nuxt/proxy
  modules: [
    "@nuxtjs/axios"
  ],
```


> 使用 asyncData 请求同域数据
添加进来的模块会以$打头，比如我们可以将axios从context中解构出来
同时static是静态文件夹 可以使用axios访问到 '/data/list.json'
asyncData请求回来的数据 需要return {}进行导出 然后该数据会合并到vc的data中
```js 
  <template>
    <div class="container">
      <h3>{{title}}</h3>
    </div>
  </template>

  <script>

  export default {

    async asyncData({$axios}) {
      let res = await $axios({
        url: '/data/list.json'
      })

      return {
        title: res.data.title
      }
    }
  }
  </script>
```

asyncData是在整个组件渲染之前就已经运行了 所以我们使用它获取到的数据是可以被爬虫爬到的



> 使用 fetch 请求同域数据
它会将读取的数据放到vuex中
```js 
  async fetch({$axios}) {
    let res = await $axios({
      url: '/data/list.json'
    })
  }
```


> 使用 asyncData 请求跨域数据
视频里面老师开了一个服务器在3001，客户端在3000
```js
  async asyncData({$axios}) {
    let res = await $axios({
      url: 'http://localhost://3001/api/home'
    })
  }
```

> 配置代理
我们需要在 nuxt.config.js 中进行配置
在 axios 配置项里 没有就创建一个
```js 
  axios: {
    proxy: true,
    // prefix: ""  // baseUrl
  },
  proxy: {
    "/api/" : {
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: {
        "^/api": ''
      }
    }
  },


  async asyncData({$axios}) {
    let res = await $axios({
      url: '/api/home'
    })
  }
```


> 扩展
放在 static 文件目录下的数据属于同域数据

--------------------

### 拦截器配置 与 token 携带
以后我们需要在每一个接口读取时需要携带服务端要求携带的token 那么我们就需要设置全局的拦截器

> 1. 在 plugin 文件夹下创建 axios.js 模块
只要在nuxt.config.js中注册的插件就能得到context服务器的上下文
```js 
  // 我们可以在这个模块中配置axios的配置 比如全局配置
  export default function({$axios, redirect, route, store}) {

    // 基本配置
    $axios.defaults.timeout = 1000,

    // 请求拦截
    // axios在发送请求时的监听函数 函数参数为 发送请求时的配置
    $axios.onRequest((config) => {
      console.log("发送请求的拦截")

      // 我们将config请求配置 进行下修改 然后返回出去
      config.headers.token = "假token"

      // 我们将添加好后的配置返回出去
      return config
    })

    // 响应拦截
    // axios在发送响应时的监听函数 函数参数为 响应体
    $axios.onResponse((res) => {

      // 我们可以在响应体中添加一些东西 最后我们将响应信息做一个返回
      // 我们可以在这里做一些响应的拦截
      // 比如我们可以判断下 响应对象中的错误信息是不是等于多少状态码 看看是不是登录页面
      if(res.data.err === 2 && route.fullPath !=='/login') {
        redirect("/login?path="+route.fullPath)
      }

      return res
    })

    // 错误处理
    // axios中所有的错误 我们可以通过下面的函数来做统一处理
    $axios.onError(err => {
      // 我们可以在这里对错误信息做一些统一操作 然后将错误对象返回给该组件
      return err
    })
  }
```

如果服务器的token过期了可以让它跳转到login 然后重新获取到token


> 2. 将 axios.js 模块 添加到 nuxt.config.js 配置文件中的plugin配置项里
```js
  // nuxt.config.js 配置文件
  plugins: [
    {
      src: "~/plugins/axios",
      ssr: true   // 开启服务端渲染 也就是让它能在服务端打印 运行
    }
  ],
```

--------------------

### login配置与定制
nuxt有一套自己的login页面，我们也可以去定义它

> 修改 nuxt 自带的进度条效果
我们在 nuxt.config.js 文件中 找到 login 配置项
我们可以在这个配置项中 定义系统默认loading效果 或者 指定一个loading组件
<!-- 
  // Customize the progress-bar color
  // 这就是nuxt自带的进度条样式

  // 读取数据时候的进度条在页面的上方
  loading: { color: 'deeppink', height: "3px" },
 -->


> 自定义 loading 组件
也是在 nuxt.config.js 文件中 找到 login 配置项 但是这次我们可以指定一个组件

我们在 components 文件夹下 创建 loading.vue 组件
该组件内有nuxt预定义的方法 
> start() { }, 该方法定义在 methods 中 代表 显示效果
> finish() {}, 该方法定义在 methods 中 代表 隐藏效果
```js 
  <template>
    <div v-if="loading">
      <h3>Loading</h3>
    </div>
  </template>

  <script>
  export default {
    name: 'Login',

    // 定义变量标识 loading 显示还是隐藏
    data() {
      return {
        loading: false
      }
    },

    methods: {
      start() {
        // 在显示的时候 更新loading上的数据
        this.loading = true
      },
      finish() {
        // 当加载工作结束的时候 我们再把这条数据变一下
        this.loading = false
      }
    }
  }
  </script>
```

nuxt中的数据是预加载的 数据预加载完毕后才会跳转到别的页面

--------------------

### Vuex的定义和使用
nuxt继承了 vuex 并且支持两种使用方式
> 方式1： 模块方式
store目录下的每个 .js 文件会被转换为vuex(指定命名的子模块)， index是根模块
就是 vuex 中 modules 配置项的感觉


> 方式2： classic(不建议使用)
store/index.js 返回创建 Vuex.Store 实例的方法
上面两种方式 不管使用哪种 我们需要注意的是 state 的值一定要一个怪异的形式
<!-- 
  export const state = () => ({k: v})
 -->


> 1. 我们在 store 文件目录下面 创建 index.js 文件 为主模块
要点：
每一个 角色 需要向外暴露 这样我们暴露出去的对象就会被vuex所接收到
state的写法比较特殊
```js 
  // 主模块 主模块中要求每一个角色必须向外暴露 其中state必须是一个函数

  export const state = () => ({
    bNav: false,
    bLoading: false
  })

  export const mutations = {
    // 修改主模块 nav 的值
    M_UPDATE_NAV(state, payload) {
      state.bNav = payload
    },
    M_UPDATE_LOADING(state, payload) {
      state.bLoading = payload
    }
  }

  export const getters = {
    getNav(state) {
      return state.bNav ? '显示' : '隐藏'
    }
  }
```


index.js 是主模块 我们还可以在store文件目录下面创建其它的子模块
```js 
  // 子模块
  export const state = () => ({
    err: 1,
    data: {}
  })

  export const mutations = {
    M_UPDATE_HOME(state, payload) {
      state.err = payload.err
      state.data = payload.data
    },
  }

  export const getters = {
    getNav(state) {
      return state.bNav ? '显示' : '隐藏'
    }
  }

  export const actions = {
    A_UPDATE_HOME({commit, state}, payload) {
      // 异步处理
      commit('M_UPDATE_HOME', {err: 0, data: {title: "模块"}})
    }
  }
```


> 组件中如果获取数据
我们在store中定义了很多的模块，接下来看看怎么在页面中使用
我们先去 pages 文件目录下的首页
获取数据的方式 跟 vuex 是一样的
```js 
  methods: {
    test() {
      this.$store.dispatch("user/A_UPDATE_USER", {err: 0, msg: "登录成功",token: "假的token",data: {title: "user模块 由action提交过来的数据"}})
    },

    // 将mapActions的执行结果 取回 我们抓取user模块
    ...mapActions("user", ["A_UPDATE_USER"]),
    ...mapMutations("user", ["M_UPDATE_USER"])

    // 解构出来的东西会变成vc身上的属性
  },
```


> vuex中的辅助函数
import {mapActions, mapGetters, mapState, mapMutations} from "vuex"

--------------------

### 状态持久化 token校验
nuxt想要拿到token信息，那token信息只能由客户端携带
一般来说 我们想要获取客户的持久化信息都是通过 localStorage 或者 cookie来实现

> 1. cookie来实现
安装
npm i cookie-universal-nuxt --save
这个包是用来做 cookie 的状态持久化的包
这是我们安装的模块，所以我们要在 nuxt.config.js 配置文件中配置一下
<!-- 
  modules: [
    "@nuxtjs/axios",
    'cookie-universal-nuxt'
  ],
 -->

安装完这个包后 nuxt上下文里面就会出现 $cookies 对象


思想：
登陆时，我们去传递 vuex 和 cookie， 用户在强制刷新之后，请求发送到服务端我们可以通过nuxtServerInit钩子，取出cookies 然后同步vuex
我们每次读取数据的时候是要携带token的，所以这时候我们可以在axios拦截器里面读取vuex(vuex不是在磁盘上所以读取的速度会很快)

这样就完成了做token校验了token的状态持久化
<!-- 
  可能 cookie 携带的信息是保存在vuex里面的
 -->


> 2. 登录功能后将后端返回的token 保存到cookie和vuex中
具体的实现流程：
比如我们在 login 页面 点击登录按钮 访问后端的接口，如果登录成功了 将拿到的数据 我们就去同步我们的状态管理和cookie

当我们 安装完 cookie-universal-nuxt 包后 全局就会多了一个 $cookies 对象，我们可以通过这个对象身上的 this.$cookies.set() 方法，将toekn保存在cookie中 和 将返回来的数据保存在vuex中
```js 
  methods: {
    login() {
      this.$axios({
        url: "/api/login",
        method: "post",
        data: {
          username: "alex",
          password: "alex123"
        }

      }).then(res => {
        // 当请求成功后 我们在这里同步vuex 和 cookie
        this.$cookies.set("user", res.data)
        this.$store.commit("user/M_UPDATE_USER", res.data)

        // 如果没有找到query里面的path 获取当前页面是登录或者注册的话 我们就直接跳转到用户页面
        if(!this.$route.query.path || /login|reg/.test(this.$route.query.path)) {
          this.$router.replace('/user')
        } else {
          // 不符合上面的情况下 比如我们访问的是首页但是没有token的话就让它跳转到登录页面
          this.$router.replace(this.$route.query.path)
        }
      })
    }
  }
```

如果出错的话 我们可以在axios的响应拦截中 做重定向的操作 


> 当用户强制刷新后 我们从vuex中取出保存在里面的token
强制刷新后vuex里面的数据就不存在了 所以在强制刷新后 我们可以选择在 nuxtServerInit这个钩子里面取出cookies里面的token 并且将它同步到状态管理里面去

我们可以在 store 文件夹目录下的 index.js (主模块) 在actions配置项中做如下操作
```js 
  export const actions = {
    // 我们从context中解构出app 再从app中解构出来 $cookies
    nuxtServerInit(store, {app:{$cookies}}) {
      // 我们要初始化 token 信息 到store中 我们从cookie中读取到token然后保存到store中
      let user = $cookies.get("user") ? $cookies.get("user") : {err: 2, msg: "未登录", token: ""}

      // 不管能不能从cookie中读取到token我们都要保存在vuex中 因为我们要在axios的拦截器里面每次从内存中读取状态

      // 在登录和强刷之后 都要听不vuex里面的状态 然后拦截器里面每次携带
      store.commit("user/M_UPDATE_USER", user)
    }
  }
```


> axios的拦截器中读取vuex里面的内容
在拦截器中我们获取的是vuex里面的token 我们可以在 /plugin/axios.js 文件中 也就是axios的配置文件中 在请求拦截的位置 做token的携带
```js 
  $axios.onRequest((config) => {

    在这里我们要拿到store对象
    config.headers.token = store.state.user.token

    // 这里有可能会取不到token 但是也没有关系 因为下面的响应拦截中 查看了错误信息 如果错误信息为2 就会跳转回登录页面
    // 我们将添加好后的配置返回出去
    return config
  })
```

为什么不从cookies对象里面拿到token 而是要vuex中取token
原因：
我们也是可以从cookies里面拿token的 比如我们可以从context中解构出app:{$cookies} 但是这样每次读的都是磁盘我们希望可以走内存 因为拦截器会被频繁调用


> 总结：
1. 我们安装了 cookie-universal-nuxt 这样全局就会多了一个 $cookies 对象用于读取和存储cookie

2. 在登录的时候同步vuex和cookies 就是说我们将获取到的token保存在了cookie和vuex中，做token的初始化，这里注意的是 即使没有token数据也要这样
<!-- 
  {err: 2, msg: "未登录", token: ""}
 -->

3. 用户强制刷新之后，我们可以在nuxtServerInit钩子里面 取出cookie中的token保存在vuex中

4. 请求拦截中从vuex中读取token并携带，如果token为空 那我们就在响应拦截中做响应的重定向的处理
 
--------------------

### nuxt中使用ui库
我们来看看nuxt中怎么使用element ui事实证明我们也是可以在项目中按照vue的方式使用element ui的

但ui库对nuxt来说是一个插件 获取我们需要在 nuxt.config.js 文件中进行配置

npm i element-ui --save

> 1. 我们在 plugin 文件目录下创建 element-ui.js 模块
别忘记在 nuxt.config.js 的 plugins 配置项中 引入我们创建的模块
```js 
  // element-ui.js

  // 整体引入 全局使用
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  Vue.use(ElementUI)

  // 按需引入 全局使用
  import {Button} from 'element-ui'
  Vue.use(Button)
```


> 2. 在 nuxt.config.js 里面 设置elementui的css样式
在nuxt的配置文件的css配置项中
```js
  css: [
    "assets/css/transition.css",
    'element-ui/lib/theme-chalk/index.css'
  ],
  
  
  plugins: [
    {
      src: "~/plugins/axios",
      ssr: true
    },
    {
      src:"~/plugins/element-ui",

      // 不支持ssr的插件只会在客户端运行不要给true
      ssr: true

      // 高版本的时候 我们使用的是mode 配置项来开启 哪端渲染 会代替ssr
      mode: "server" / "client"   v2.4+
    }
  ],
```

> 3. 设置打包时候的需求 我们可以将elementui在打包的时候摘出来
```js
  // nuxt.config.js 的 build 配置项

  build: {
    transpile: [/^element-ui/],
  }
```


> 技巧 
我们使用 导航标签 去跳转页面 比如我们现在处于商品按钮被激活的状态，当我们在强刷的时候发现 商品导航标签的样式 不是处于激活的状态了  

原因是因为 当我们强刷后 代码会回到定义时候的状态 而我们定义时候的状态是根据data配置项中的 activeIndex 的 -1 决定的 而强刷之后 代码会回归到-1的状态
```js 
  <el-menu
    default-active="activeIndex"
  >

  data(){
    return {
      activeIndex: "-1",
      navs: [
        {path: "/index", title: "首页"}
        {path: "/goods", title: "商品"}
        {path: "/user", title: "用户"}
      ]
    }
  }
```

所以 我们要想办法监听路由 当路由发生变化的时候 我们要更新activeIndex: "-1" 这里的值 来反向的激活 <el-menu>  

我们可以在 监测属性的处理函数里面 添加如下的逻辑
我们可以看看我们当前所在的位置是不是在上面的navs中的path的某一条 如果是的话 这条数据中索引的位置就可以取出来 来去影响 tiveIndex: "-1" 这条属性
```js  
  // 老师选择的是使用watch方法 我们可以监听 $route 同时为了保证首次可以运行的话 我们要加上 immediate 配置项
  watch: {
    $route: {
      immediate: true,

      // 这里可以拿到最新的route信息
      handler(route) {

        // 默认是没有找到的
        let find = false

        this.navs.map((item, index) => {
          if(item.path == ""/) this.$router.push({name: "root"})
          if(route.path == item.path) {
            this.activeIndex = Sting(index)

            // 找到的情况下 将 find 设置为true
          }
        })

        // 如果有激活状态的话就点亮该按钮，如果没有的话就将所有的激活状态都擦掉
        if(!find) {
          this.activeIndex = "-1"
        }
      }
    }
  }
```


2. 场景：
当用户的toekn失效的时候 我们希望他会跳转到登录页面 但这时我们也不希望用户能看到导航栏 也就是说 我们的应用是整体的 当有用户登录页面的时候 就不希望展现导航区

我们可以在 layouts/default.vue 页面中做处理
我们可以在这个组件中 给 导航区的组件标签 添加 v-if=”isShow“
然后使用watch监测$route 在内部做判断 如果当前的路径是登录或者注册 那就隐藏导航区 否则就展示
```js  
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if(/login|reg/.test(route.path)) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      }
    }
  }
```


> 在用户注册 或者 登录完毕后 会返回用户当前的页面 从哪来回哪取
关键的代码：
this.$router.replace(this.$route.query.path)

--------------------

### 登录注册注销
注销的逻辑很简单 因为token是没有状态的 我们只需要将vuex中的token和cookies中的token删掉就可以了
```js  
  methods: {
    logout() {
      this.$cookies.remove("user")

      // 清空就是 重置成初始值的样式
      this.$store.commit("user/M_UPDATE_USER", {
        err:1,
        msg: "未登录",
        token: "",
        data: {}
      })
    }
  }
```

--------------------

### 组件数据 状态数据 ssr渲染


> 技巧：
elementui组件的样式名 可以直接用组件名来定义
<!-- 
  <el-menu>

  .el-menu {
    color: red;
  }

  ---- 

  // 当想找到这个组件下的每一个项的时候是这么写的
  <el-carousel-item>

  .el-carousel__item .img {

  }
 -->

-----------------

### Api
> 上下文对象
context 变量的可用属性一览:
https://www.nuxtjs.cn/api/context


> asyncData() {...}
你可能想要在服务器端获取并渲染数据。Nuxt.js 添加了asyncData方法使得你能够在渲染组件之前异步获取数据。

asyncData方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用。在这个方法被调用的时候，第一个参数被设定为当前页面的上下文对象，你可以利用 asyncData方法来获取数据并返回给当前组件。
<!-- 
  由于asyncData方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 this 来引用组件的实例对象。
 -->


> fetch() {}
fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。
fetch 方法的第一个参数是页面组件的上下文对象 context，我们可以用 fetch 方法来获取数据填充应用的状态树。为了让获取过程可以异步，你需要返回一个 Promise，Nuxt.js 会等这个 promise 完成后再渲染组件。
<!-- 

 -->


> head() {}
使用 head 方法设置当前页面的头部标签。
在 head 方法里可通过 this 关键字来获取组件的数据，你可以利用页面组件的数据来设置个性化的 meta 标签。
```js  
  export default {
    data() {
      return {
        title: 'Hello World!'
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
  }
```

**注意:**
为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号。


-----------------

### nuxt中的常见问题
在 nuxt.config.js 中配置你想引用的资源文件：
<!-- 
  module.exports = {
    head: {
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto'
        }
      ]
    }
  }
 -->

> 局部配置
可在 pages 目录内的 .vue 文件中引用外部资源，如下所示：
<!-- 
  export default {
    head: {
      script: [
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto'
        }
      ]
    }
  }
 -->


### 预处理器
记得安装这些预处理器对应的 npm 依赖包和 Webpack 加载器:
npm install --save-dev pug@2.0.3 pug-plain-loader coffeescript coffee-loader node-sass sass-loader

得益于 vue-loader, 我们可以通过 lang 属性在组件中的<template>， <script> 或 <style> 上使用各种预处理器。

举个例子，我们在 pages/index.vue 组件中使用 Pug， CoffeeScript 和 Sass：
<!-- 
  <template lang="pug">
    h1.red Hello {{ name }}!
  </template>

  <script lang="coffee">
    export default data: ->
      { name: 'World' }
  </script>

  <style lang="sass">
    .red
      color: red
  </style>
 -->


### JSX
Nuxt.js 使用 Vue.js 官方的 babel-preset-vue-app 做 babel 的默认配置。

你可以在组件的 render 方法中直接使用 JSX 而不需要做额外的配置：
<!-- 
  <script>
    export default {
      data() {
        return { name: 'World' }
      },
      render(h) {
        return <h1 class="red">{this.name}</h1>
      }
    }
  </script>
 -->


### Postcss 插件
可在 nuxt.config.js 文件增加以下配置来添加 postcss 插件：
<!-- 
  export default {
    build: {
      postcss: {
        // 添加插件名称作为键，参数作为值
        // 使用npm或yarn安装它们
        plugins: {
          // 通过传递 false 来禁用插件
          'postcss-url': false,
          'postcss-nested': {},
          'postcss-responsive-type': {},
          'postcss-hexrgba': {}
        },
        preset: {
          // 更改postcss-preset-env 设置
          autoprefixer: {
            grid: true
          }
        }
      }
    }
  }
 -->


### 如何扩展 Webpack 的配置
你可以通过 nuxt.config.js 文件中的 extend 配置项来扩展 Webpack 的配置：
<!-- 
  module.exports = {
    build: {
      extend(config, { isDev, isClient }) {
        // ...
      }
    }
  }
 -->

{ isDev, isClient } 可以判断是否是客户端


### 如何添加 Webpack 插件？
可以在 nuxt.config.js 中添加 Webpack 插件：
<!-- 
  const webpack = require('webpack')
  module.exports = {
    build: {
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          _: 'lodash'
          // ...etc.
        })
      ]
    }
  }
 -->


### 如何更改应用的主机和端口配置？ 
您可以通过不同方式配置主机和端口，如下列出从最高优先级到最低优先级。
<!-- 
  "scripts": {
    "dev": "nuxt --hostname myhost --port 3333"
  }
 -->
或者还可以像下面这样配置

> 在 nuxt.config.js 中配置:
在 nuxt.config.js 添加: 如下的配置 这种配置还可以让别人在局域网通过IP来进行访问
<!-- 
  export default {
    server: {
      port: 8000, // default: 3000
      host: '0.0.0.0' // default: localhost
    }
    // other configs
  }
 -->


### Nuxt里怎么让项目通过 https 来进行访问

> Mac:
执行完命令后会出现localhost.pem localhost-key.pem
```js
brew install mkcert
mkcert -install

// 然后在项目的根目录下执行如下的命令
mkcert localhost
```

<br>

然后再在 nuxt.config.js 中进行配置
```js
import path from 'path'
import fs from 'fs'

export default {
server: {
  port: 3000,
  host: "0.0.0.0",
  https: {
    key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem"))
},
// 以下その他設定...
```

<br>

> Windows:
使用 管理权权限打开终端 并安装如下内容:
```js
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

然后安装 mkcert
```js
cinst -y mkcert
mkcert -install

// 然后在项目的根目录下执行如下的命令
mkcert localhost
```


### 如何发起跨域资源请求？
> 用于 Nuxt.js 的 http-proxy 中间件解决方案
1. npm i @nuxtjs/proxy -D
2. 在 nuxt.config.js 配置文件中添加对应的模块，并设置代理
```js 
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://example.com',
      pathRewrite: {
        '^/api' : '/'
      }
    }
  }
```



### CSS 闪烁
这是因为在开发模式下，为了通过 Webpack 实现热加载，CSS 代码是打包在 JavaScript 代码中，并动态打到页面中去，从而元素重绘引起了闪烁。

不用担心，在生产模式下，CSS 代码会单独打包至独立的文件并置于 head 标签内，不会出现页面闪烁的现象。



### 如何在组件中使用异步数据？
如果组件不是和路由绑定的页面组件，原则上是不可以使用异步数据的。因为 Nuxt.js 仅仅扩展增强了页面组件的 data 方法，使得其可以支持异步数据处理。

对于非页面组件，有两种方式可以实现数据的异步获取：

在组件的 mounted 方法里面实现异步获取数据的逻辑，之后设置组件的数据，限制是：不支持服务端渲染。

在页面组件的asyncData或fetch方法中进行 API 调用，并将数据作为props传递给子组件。服务器渲染工作正常。缺点：asyncData或页面提取可能不太可读，因为它正在加载其他组件的数据。总之，使用哪种方法取决于你的应用是否需要支持子组件的服务端渲染。

----------------

### Nuxt Ts
https://typescript.nuxtjs.org/ja/cookbook/components


nuxt中对Ts的支持主要是通过 @nuxt/typescript-build 模块来支持的
该模块的安装方式为：

> 安装
npm install --save-dev @nuxt/typescript-build @nuxt/types

> 配置
安装完成后 我们需要在 **nuxt.config.js** 文件中的 buildModules 配置项里面添加
```js 
export default {
  buildModules: ['@nuxt/typescript-build']
}
```

然后 我们需要在 **tsconfig.json** 文件中进行如下的配置
```js 
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "Node",
    "lib": [
      "ESNext",
      "ESNext.AsyncIterable",
      "DOM"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@types/node",
      "@nuxt/types"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```
