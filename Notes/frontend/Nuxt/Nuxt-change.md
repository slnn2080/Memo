### 现有项目中的相关总结

- vue cli的作用是自动一键生成vue + webpack的项目模板 免去我们手动安装插件 寻找cdn并一个个引入的麻烦 

> 目录结构
- 外层结构
<!-- 
  | - _sass_replace
  | - _preview
  | _ task
  | - adv
  | - html
  | - linters
  | - maintenance
  | - src
  | - stories

  - babel.config.js
  - gulpfile.babel.js
  - imageMin.js

  - csv....js
 -->

**不明要点**
- 我想知道每个文件夹的作用是什么

---------------

- 内层结构
<!-- 
  | - _sass_replace     // 里面有一些python 文件

  | - _preview
    | - assets          // 静态资源文件夹呢？
      | - img           // 每个页面的图片都放在了这里
      | - pdf           // 每个页面中用到的pdf放到了这里

  | _ task
  | - adv

  | - html              // 这个 html 文件夹 是用来干什么的？ 里面有一套套的原生html页面

  | - linters
  | - maintenance

  | - src
    | - customer        // 里面放了一些公共的 sass 样式文件
      | - base

    | - file            // csv文件

    | - html
        // 1. 里面放了一些 pug页面文件 这里的 文件夹 好像都对应着一条的路径
               http://localhost:3000/  --  作为根目录 每一个文件夹的名字作为 子目录 进行拼接

        // 2. 这里就对应着 nuxt 中的pages 吧


    | - javascripts
      | - contents
        - 这里都是 内容区的 vue组件
        - html文件夹中的主体内容都是使用vue写的 vue的部分就在这里

      | - moudules
        - 这里是一些通用的组件 和 功能性的模块

      | - util

    | - json
    | - style
      - index.js        // 空的

  | - stories
 -->


> 总结
- 他想把整个项目 nuxt化 整个的流程是什么呢？
- 首先 我要知道nuxt是什么样的一个东西 以及nuxt是怎么处理项目中的文件的

- 同时 nuxt 会将vue文件编译成 html 文件 直接渲染到前端页面
- 那它需要编译么？

- 我们要输入路径后看到nuxt生成的页面 这步怎么和现有的项目结合起来


- 现有的项目应该是 glup + pug + vue 的开发方式
- glup用来打包对应的功能 处理图片 样式 js等
- pug用来负责页面的结构 除了内容区的部分
- vue主要做的是内容区的部分

**部分问题**
<!-- 
  1. 为什么不用vue cli脚手架开发项目呢？

  2. 那nuxt里面用来构建整个项目的时候 是想使用nuxt cli
      还是自己用 webpack babel 来搭建呢？
      如果选择这种模式 那是不是意味着 我们还要使用 nodejs 写服务器的逻辑

  3. axios
      nuxt里面如果请求数据的话 一般都会在 asyncData 生命周期函数里面 
      我们的项目中如果涉及到请求数据的逻辑 是在哪里 需要不需要更改位置

  4. 关于 nuxt的路由 pages _id 的问题
      假如需要给页面传递参数的时候 
      homepage -- parm -- 定义homepage文件夹 然后定义 _id 页面

      也就是说现在现有的项目中是怎么给页面传递参数的

  5. 正常来说一个页面 包含子链接就是一个项目
      但是现有的项目中 有n套的页面 这个又怎么处理呢？
 -->


### 网络资料
>  vue中常见的优化场景
- 1. prerender-spa-plugin
- 客户端预渲染
<!--  
  https://segmentfault.com/a/1190000019909396
 -->

- 2. ssr服务端渲染



> 1. 目录结构的改造(目录结构重组)
- 这个部分就要找出现有的目录结构 和 nuxt中的目录结构的不同
<!-- 
  1. 区别比较大的就是router文件夹
  2. 怎么将原有的项目目录结构 迁到 nuxt里面
      在nuxt的下面直接创建 src文件夹 这样 nuxt的跟目录是不是就是src了

      然后将 vue项目中 src里面的东西 和 nuxt原先根目录下的东西做整合
      除了 static 和 server 剩下的 比如
      assets
      components
      layouts
      middleware
      pages
      plugins
      store
      等 都拖动到src下
 -->

**注意：**
- 在添加了src后需要修改一下项目的启动配置，在nuxt.config.js中修改srcDir为'src/'
<!-- 
  const webpack = require("webpack")
  export default {
    mode: "universal",
    srcDir: "src/",
  }
 -->


> 2. 已有vue页面迁移
- 将vue中对应的页面放到现在的nuxt目录下对应的位置，注意一下vue文件的命名就可以


> 3. 全局配置文件及第三方组件的迁移
- vue项目中有用到一些全局配置文件和第三方文件，这部分js的话，直接放在plugins中，以扩展组件的形式在项目启动时，挂载到全局中

- 1. 自定义的配置文件修改
- 将自定义的变量绑定到vue的原型中，Vue.use注册到vue项目中，在vue文件中可以直接用$config(自定义的变量名)调用该变量，而不需要再单独去import了；最后用export default抛出该变量，是为了在其他js中使用。
<!-- 
  let config = {
    baseURL: "",
  }

  let main = {
    install(Vue) {
      Vue.prototype.$config = config
    }
  }

  Vue.use(main)
  export default config
 -->

- 只有在vue页面中使用该变量时不需要import，如果要在其他的js中使用，还是需要import进来的。


- 2. 第三方组件的迁移
- 直接用npm install将第三方组件加载到项目中，在需要的vue界面用import载入就可以，

- 但是需要注意的一点是，第三方组件中可能用到了document、window等浏览器对象，而nuxt项目是需要在客户端和服务端都要进行运行的，服务端并没有window等对象，在服务端运行时会报错，

- 所以第三方组件也跟自定义组件类似的用plugins组件的形式载入比较安全，在plugins下单独创建一个同名的js文件，判定是客户端时再去加载该组件就行了。

<!-- 
  let d3 = null
  if(process.client) {
    d3 = require("d3")
  }

  export default d3

  vue process全局变量
  1、官方解释：
   process 对象是一个 global （全局变量），提供有关信息，控制当前 Node.js 进程。作为一个对象，它对于 Node.js 应用程序始终是可用的，故无需使用 require()。

2、通俗解释：
   process（进程）其实就是存在nodejs中的一个全局变量。
 -->

- plugins中扩展组件的相关配置
- 在plugins中创建的js需要再项目启动时注册到项目中，也就是在nuxt.config.js中的plugins中进行配置
<!-- 
  plugins: [
      { src: '@/plugins/config.js', ssr: true },
      { src: '@/plugins/d3.js', ssr: true }
  ]
 -->


- 3. 全局样式的迁移
- 全局样式文件css，在nuxt.config.js配置文件中的css中引入
<!-- 
  css: [
    '@/assets/index.css'
  ]
 -->


- 4. 用户登录状态store的迁移
<!-- 
  项目比较着急，实在懒得用nuxt提供的方式再去改造这部分代码，直接沿用了vue中mutations和actions方式，暂时项目并没有出现问题（后期如果有问题再做修改）

  PS：如果该js中用到了window等浏览器的对象，加个process.client去判断就行，其余的可以不用修改
 -->


- 5. element-ui的迁移
- 跟vue一样先npm install element-ui --save，之后再plugins下新建一个element-ui.js文件,内容如下：
<!-- 
  import Vue from 'vue'
  import Element from 'element-ui'
  import locale from 'element-ui/lib/locale/lang/en'

  Vue.use(Element, { locale })
 -->

- 然后再nuxt.config.js中进行配置：
<!-- 
  plugins: [
    { src: '@/plugins/element-ui', ssr: true }
  ],
  css: [
      'element-ui/lib/theme-chalk/index.css'
  ]
 -->

- 防止element-ui多次被打包，在nuxt.config.js下的build中进行配置
<!--  
  build: {
    vendor: ['element-ui']
  }
 -->


- 6. axios和$axios的使用
- 因为vue中用了axios，后期也没有修改原来的api请求，所以就继续使用了axios，直接npm install axios --save安装，在需要使用的地方import即可。
<!-- 
  如果在vue项目中已经封装了axios，直接可以把vue中写的关于api的js都挪到plugins下，把export default axios抛出，再在nuxt.config.js下按照扩展的配置在plugins中添加就可以正常使用了。
 -->

<!-- 
  plugins: [
      { src: '@/plugins/api/index.js', ssr: true }
  ],
 -->

- 正常客户端的请求使用axios并没有什么问题，而在asyncData预加载服务端请求时就比较麻烦了，在asyncData请求中使用了nuxt默认集成的$axios，这个需要再nuxt.config.js下的modules中配置
<!-- 
  modules: [
    '@nuxtjs/axios',
    '@gauseen/nuxt-proxy'
  ],
 -->

<!-- 
  asyncData下数据请求
  单个请求：
  async asyncData ({ app, params }) {
     let { data } = await app.$axios.get(url).then(res => {...})
  }

  多个请求：
  async asyncData ({ app, query }) {
    // 请求带参数时的写法，query指的是当前访问的url中携带的参数
      let searchQuery = {
        type: query.searchTag,
        q: query.searchKeys,
        page: 1
      }
      const [nounList, resultList] = await Promise.all([
        app.$axios.get('请求的api地址', { params: { q: query.searchKeys }}),
        app.$axios.get(`/api/search/${searchQuery.type}`, { params: searchQuery })
      ])
      return {
        nounList: nounList.data,
        resultList: resultList.data
      }
    }
 -->

**PS：整个项目中可以同时使用axios和nuxt默认集成的$axios，可以根据自己的需求合理使用**


> 细节
- data中数据的初始化定义，不能直接使用location、window等去赋值，也不能用自定义的config配置文件中的变量直接去赋值，也不能直接require图片；这些赋值都可以挪到mounted钩子函数中完成。

- 不同界面的title等设置，每个vue界面都提供了head钩子函数
<!-- 
  head () {
    return {
      title: '百度--搜了个啥',
      meta: [
        { hid: 'index', name: 'index', content: 'index page'}
      ]
    }
  },
 -->


> 遗留的问题
- static中的html静态文件没法直接访问，查询了很多网站，都没有找到相关的文档

---------------

> 第二个网友的意见
- https://blog.csdn.net/sllailcp/article/details/109810607

- 1. 创建src文件夹 将原有和现有的文件夹整合到src中
- 这里要注意 在nuxt-config中修改 根目录的路径

- 2. 配置路由
<!-- 
  https://github.com/nuxt-community/router-module
  也可以使用上面的包来代替 使用这个包后 就相当于禁用了 pages
  放弃了 自动创建
 -->

- 3. 文件迁移
- 将vue中src下的文件全部复制到nuxt下的src中
- 此时有人会问index.html怎么办，别急，接下来我们就讲这个
- 在nuxt.config.js中head配置就是index.html的head的公用信息，css是全局的css

---------------

> 第三个网友的意见
- https://zhuanlan.zhihu.com/p/55129840

- 使用代码router，而不是nuxt自动生成的导航配置
- 可以注意到nuxt.js一个很大不同是router.js没了，按官方的说法是使用目录自动动态生成router.js。我觉得其实还可以，但没有必要那么精巧。老项目迁移，写都写了，直接拿过来就是
<!-- 
  好在可以改，nuxt.js官方提供了一个插件：nuxt-community/router-module
 -->

- npm install --save @nuxtjs/router
- 然后修改配置文件：
<!-- 
  nuxt.config.js

  modules: [
    "@nuxtjs/router"
  ]
 -->


### 总结
- 以下的想法都是基于使用 nuxt-cli 创建的项目后 如何去重构现有的vue项目到nuxt中
- 有些想法可能不成熟 仅是提供到参考性的建议
<!-- 
  - 问题:
  - 1. 为什么当初没有选择使用 vue cli 来项目呢？
  - 2. 假如我们把现有的vue项目 修改为 nuxt 的话 那我们会选择nuxt cli 来创建项目么？
       如果不选择nuxt cli创建项目的话 就意味着我们要自己用 nodejs 写服务器的代码

       nodejs的逻辑就是在后台组织好html页面 然后渲染到前台
       java服务器应用在与数据库 和 api的交互
 -->

> 1. 改造目录结构
- 因为现有的目录内的结构 和 nuxt cli 生成的目录结构不一样
- 比如nuxt里面没有src，没有router
- 所以我们要做一个整合
