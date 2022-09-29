### Next
- 国内搜索引擎只能解析html 包括百度不能解析js
- 国外谷歌搜索可以解析js
- 多页应用

- 什么项目适合做服务端渲染?  
- 希望被搜索到的 比如(blog)


> 优势:
- 预定路由(pages)
- 在可能的情况下自动静态优化页面
- 自动代码拆分可以加快页面加载速度
- 内置css支持 并且支持任何 css in js 库
- 基于webpack的开发环境 支持热模块替换 HMR
- 可通过社区插件以及您自己的babel和webpack配置进行定制


> 服务端渲染的概念
- 后端先调用数据库 获得数据之后 将数据和页面元素进行拼装 组合成完整的html页面 再直接返回给浏览器 以后用户浏览

- 整个渲染的过程在服务器端渲染
<!-- 
  服务器端渲染需要消耗更多的服务器端资源(cpu 内存)
 -->


> 客户端渲染的概念
- 数据由浏览器通过ajax动态取得 再通过js将数据填充到dom元素伤最终展示到页面中
<!-- 
  整个过程是在浏览器上进行的 服务器上消耗的资源都分散在一个个的客户端上 另外客户端是静态的可以部署到cdn上 实现高并发
 -->

> 网址
- https://nextjs.org/docs/getting-started

> 安装
- 手动
- npm i next react react-dom

- 自动(脚手架)
- npm create next-app


> 下面我们手动配置next
- npm i next react react-dom
<!-- 
  目前版本
  "dependencies": {
    "next": "^12.1.6",
    "react": "^18.1.0",
    "react-dom": "^18.1.0"
  }

  老师版本
  "dependencies": {
    "next": "^9.3.0",
    "react": "^16.13.0",
    "react-dom": "^16.13.0"
  }
 -->

> 添加 scripts
```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

- 修改端口:
```json
"scripts": {
  "dev": "next -p 5000",
  "build": "next build",
  "start": "next start"
}
```

> 根目录下的 pages 目录
- 跟 nuxt 一样 会*自动创建路由* *pages下的文件名可以小写哦*

  pages/index.js    http://localhost:3000/index
  pages/about.js    http://localhost:3000/about
  pages/cmp/news.js http://localhost:3000/cmp/news


- 不是页面组件的组件 可以创建 components 目录 放进去

---

> 示例:
- pages目录下床架了 index.jsx 文件
```jsx
import React from "react"

// 而且我们是这么直接暴露的匿名函数
export default () => {
  return (
    <h3>next版本的react哦</h3>
  )
}
```

- 然后 访问 3000端口 就能看到页面
- 我们发现 *没有路口文件哦*


> 创建二级路由示例：

  | - pages
    - index.jsx

    | - cmp
      - index.jsx

-  访问 /cmp 就可以了

---

> public 目录
- 作用:
- 放静态文件的 我们可以把静态资源放入 public 文件夹内
- 页面引入的时候 / 就指向了 public

```jsx
export default () => {
  return (
    <div>
      <h3>我是二级路由哦</h3>
      <img src="/img/img-1.png" alt="" />
    </div>
  )
}
```

---

> 使用 脚手架 创建项目
- npm create next-app
- 然后会让我们输入项目名

> 脚手架 创建的目录结构

  | - pages
  | - public
  | - styles
  - .eslintrc.json
  - .gitignore
  - next.config.js

> next.config.js
- 就这么点

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

- 有这个网站 是 next 提供的 可以看看
- https://nextjs.org/docs
- https://nextjs.org/learn/foundations/about-nextjs
- https://github.com/vercel/next.js/tree/canary/examples
- https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app

----------------

### Next 路由跳转 -- <Link>
- 路由的跳转有两种方式

- 1. 使用 <Link> 跳转
- 2. 使用 js编程式 跳转

> <Link> 的使用方式
- 因为 <Link> 的位置:
- import Link from "next/link"

- 官方文档中 在 next 使用 <Link> 要求给该标签一个子项 但不局限于 <a>
```js
<Link href="/about">
  <a>click me</a>
</Link>
```

- 也就是说 next文档中希望 当我们使用 Link 的时候 它最好有一个<a> 它希望当 js 被禁用时也能通过默认的 <a> 来实现跳转

<!-- 
  当然我们不写 <a> 也是可以的
 -->

- 当子项为 <a> 标签的时候 href 属性是添加在 <a href> 上的
- 当子项为 <other> 标签的时候 href 属性没有向下传递  

- 示例:
```js
// index.js
import Link from "next/link"

export default () => {
  return (
    <div>
      <h3>我是 index 页面</h3>
      <hr />
      <Link href="/about">
        <a>about</a>
      </Link>
    </div>

  )
}

// about.js  -- 子项为 <button>
import Link from "next/link"

export default () => {
  return (
    <div>
      <h3>我是 about 页面</h3>
      <hr />
      <Link href="/">
        <button>index</button>
      </Link>
    </div>
  )
}
```

**注意:**
- next的<Link>和react的<Link>还是有些不同 因为next的<Link>跳转后是刷新过后的页面 state 中会回到初始值

```js
import {useState} from "react"
import Link from "next/link"

export default () => {
  let [count, setCount] = useState(0)
  return (
    <div>
      <h3>我是 index 页面</h3>
      <hr />
      <Link href="/about" as="a">
        <a>about</a>
      </Link>
      <div>
        <button
          onClick={() => {setCount(count + 1)}}
        >加{count}</button>
      </div>
    </div>
  )
}
```

- 当我们点击按钮 加到7 后 我们再跳转会原页面发现 count为0 所以state是被刷新到最初状态了

---

> <Link> 属性
> 属性: href:
> 传参
- 添加跳转路径(默认是history的push模式 向历史记录添加一条)

- 字符串 
  "/about?abc=123"

- 对象
  {
    pathname: "/about",
    query: {name: "abc"}
  }


> 属性: <Link as>
- 重命名
  <Link href="/about" as="a">
  - 相当于我们给 /about 起了一个别名 这样当我们点击 链接跳转的时候 url上的路径为 *http://localhost:3000/a*
  - 这时候我们刷新页面会报错哦 因为实际上并没有 a 的路由

- 路由传参 list/1


> 属性: <Link replace>
- 替换history状态


> 属性: <Link scroll>
- 跳转后到页面顶部 默认为 true
- 设置为false, 比如前一个页面的y为500 跳转后的页面的y也为500
```js
<Link href="/about" scroll={false}>
```

> 属性: <Link passHref>
- 强制 Link 将 href 发给起子项 默认为 false
```js
// 默认情况下 当 <Link> 有子项 一般是 <a> 这时候 Link 的href属性 会添加给 <a> 上

<Link href="/about">  // 这个href 会默认添加到 <a> 上
  <a>
</Link>
```
- 但如果子项不是 <a> 那么 href 数值不会给到子项 而passHref是说不管子项是不是 <a> 它都会将 href 强制给到子项
```js
<Link href="/about" passHref={true}>
  <button href="/about">  // href会强制给到button上
</Link>
```


> Link 子项也可以是组件
- <Link> 下是可以传递一个组件 但是该组件必须由 React.forwardRef() 创建

> React.forwardRef() 
- 参数是一个函数 函数的参数是 props 和 ref

**注意:**
- 必须开启 *passHref* 不然收不到 传递进来的 href

```js
React.forwardRef((props, ref) => { ... })
```

- 示例: 
```js
import Link from "next/link"
import React from "react"

// 使用 React.forwardRef() 创建一个组件
const RedLink = React.forwardRef((props, ref) => {
  return (
    // href的值从props中获取 ref也要写上
    <a href={props.href} ref={ref}> click </a>
  )
})

export default () => {
  return (
    <div>
      <h3>我是 index 页面</h3>
      <hr />
      <Link href="/about" passHref>
        <RedLink />
      </Link>
    </div>

  )
}
```

----------------

### Next 动态路由
- 以下我们拿 函数式组件举例
- 函数式组件中要使用路由的话 需要以下两个部分

- 1. 引入
- import { useRouter } from 'next/router'

- 2. 获取 router 对象
- const router = useRouter()

> router对象身上的属性
```js
asPath: "/temp/[id]"    
back: ƒ ()
basePath: ""
beforePopState: ƒ ()
components: {/temp/[id]: {…}, /_app: {…}}
defaultLocale: undefined
domainLocales: undefined
events: {on: ƒ, off: ƒ, emit: ƒ}
isFallback: false
isLocaleDomain: false
isPreview: false
isReady: false
locale: undefined
locales: undefined
pathname: "/temp/[id]"
prefetch: ƒ ()
push: ƒ ()

query: {}   // 获取动态路由传递的参数

reload: ƒ ()
replace: ƒ ()
route: "/temp/[id]"
```

> 获取 参数
- 我们可以从 router.query 身上 取得动态路由传递过来的参数

> 动态路由使用的方式

  | - pages
    | - temp
      - [id].jsx
      - index.jsx

- 我们都知道 声明在 pages 目录下的文件都会对应生成一条路由
- 比如
  | - pages
    | - temp

- 就会对应生成 /temp 路由

> 1. 在 pages 下使用 [] 语法定义 接收动态路由参数的文件
> 2. 在 [id].jsx 组件中 通过 router.query 来接收使用

> [动态路由参数名].jsx
- next里面允许我们使用 [] 语法 来声明动态参数的名字
- 该名字也会作为 router.query 对象中的属性名 当有匹配的属性值的时候 就会被收集到 router.query 对象中


  | - pages
    | - temp
      - [id].jsx

- 对象生成 /temp/:id
- 当我们通过 localhost:3000/temp/1 访问的时候

- 在 [id].jsx 文件中 就可以通过 router.query 对象 接收到 1

```js
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  // localhost:3000/temp/1 
  return <p>Post: {id}</p>
}

export default Post
```

- 如果 temp 目录下 只有 [id].jsx 文件的话 
- 当我们访问 /temp 的时候 就会是 404 要想 /temp 也有对应的页面 那就要添加 index.jsx 文件
- 如下

  | - pages
    | - temp
      - [id].jsx
      - index.jsx

- 这样即使访问 /temp 会有对应页面(index.jsx) 访问/temp/1 也会有[id].jsx来对应

--- 

> 接收多个参数的 动态路由
- 如下设置后会接收所有的参数 
- /temp/12/23/55/66 都会被下面的 [...id].js 文件收到

> [...id].js
- id对象的值为 []
- 多个参数组成了数组中的各个元素

---

> 如何跳转到 动态路由?

> <Link>式动态路由的跳转
- 我们需要通过 <Link href as> href 和 as 来搭配使用
- href:
- 指定跳转到pages下面的哪个文件

- as:
- 指定传递的参数

- 多个参数
```js
<Link href="/temp/[...id]" as="/temp/123/666">
  <a>About</a>
</Link>
```

- 一个参数
```js
<Link href="/temp/[id]" as="/temp/123">
  <a>About</a>
</Link>
```


> 编程式动态路由的跳转
- 通过传递两个参数来解决
- 参数1: 指定 pages 下的哪个文件
- 参数2: 指定 传递的参数
```js
// 一个参数
router.push("/temp/[id]", "temp/123")

// 多个参数
router.push("/temp/[...id]", "temp/123/333")
```

----------------

### 编程式跳转
- 以下我们也是 通过函数式组件来演示
- 1. 首先 我们要获取 router 对象

- 通过 router 对象身上的方法 来进行路由的跳转

> router.push("/about")
> router.push({pathname: "", query: {}})

---

> 获取 router 的几种方式
- 获取到router后 后面的跳转都一样了

---

> useRouter -- ReactHook
- 引入位置:
- import {useRouter} from "next/router"

```js
import {useRouter} from "next/router"

export default () => {

  let router = useRouter()

  return (
    <div>
      <h3>我是 index 页面</h3>
      <hr />
      <button 
        onClick={() => {
          router.push("/about")
        }}
      >click</button>
    </div>
  )
}
```

> Router
- 引入方式
- import Router from "next/router"

- 使用方式:
```js
import Router from "next/router"

<button 
  onClick={() => {
    Router.push("/about")
  }}
>click</button>
```

> withRouter
- 引入方式:
- import {withRouter} from "next/router"

```js
// 包装完毕后 我们从形参中解构出 router
const Index = ({router}) => {
  console.log(router)
}

export default withRouter(Index)
```

----------------

### 路由如何接收参数
- 路由参数的接收 也需要使用到 router 对象
- 该对象身上的 router.query 就能获取到 我们的参数

> let {name} = router.query

----------------

### 预加载
- 什么是预加载？
- 当我们访问一个路由之前会将 路由对应的资源加载到本地 然后再访问的时候 就从缓存资源里面去访问

- 在next中有两种方式开启预加载
- 1. 预加载是性能优化技术
- 2. 所有所需的资源提前请求加载到本地 这样后面再需要用到的时候 就直接从缓存中读取资源

> <Link prefetch href="/">
- 开启预加载

> Router.prefetch("/about")
- Router对象上的prefetch() 启动

- 以上两种预加载 只在生产环境中才有效

----------------

### 404 和 错误页面的定制
- next中给我们提供了404的页面 如果不想要这个提供好的页面就自己定制错误页面

> 方式:
- 在pages目录下创建 *404.js* 和 *_error.js*

> 404.js
- 404页面是*静态页面* 
- 因为找不到页面就是这个错误 所以是静态的

> _error.js
- error是错误页面(动态页面) 服务器端的错误很多 所以是动态的
- 比如服务端出现错误了 所显示的页面
```js
// _error.js
function Error({statusCode}) {
  return (
    <p>
      {
        statusCode
          ? `An error ${statusCode} occurred on server`
          : `An error occurred on client`
      }
    </p>
  )
}

// 请求数据的方法
Error.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return {statusCode}
}

export default Error
```

----------------

### next中的样式 css scss
> css的引入方式:
- 1. 全局引入
- 2. 模块引入
- 3. 内联样式
- 4. jsx

> 全局引入的方式
- 我们在 根组件 _app.js 中引入 css 样式
  | - pages
    - _app.js

- next当中有 app.js 根组件 我们定义的 _app.js 就是重写根组件

> _app.js
- 参数:
- Component:
  动态组件 比如我们访问的是 /about 那 Component就是about组件 每次访问的地址不同 会指向不同的组件

- pageProps:
  props

```js
// 引入 全局样式
import "../style.css"

export default ({Component, pageProps}) => {
  return (
    <Component {...pageProps} />
  )
}
```

---

> 模块的引入方式
- 1. 我们在pages下创建 index.module.css 文件
- 后面的 .module.css 是固定的哦

- 2. 在 index.jsx 中 引入 因为css是一个模块 那我们就创建一个 *变量* 去接收

- 3. 创建完变量后 我们通过 *变量.选择器* 的方式 使用样式

```css
.color {
  color: red;
}
```

```js
import css from "./index.module.css"

export default () => {
  return (
    <div>
      <h3 className={css.color}>我是 index 页面</h3>
    </div>
  )
}
```

--- 

> 内联样式: 和 jsx 的写法是一样的
```js
<h3 style={{color: "green"}}>
```

---

> jsx的写法
- 写法是固定的
- css样式要使用 <style jsx>{``}</style> 包裹

> 组件内的样式 （可能吧）
```js
export default () => {
  return (
    <div>
      <h3 id="title">我是 index 页面</h3>

      <style jsx>
        {`
          #title {
            color: red;
          }
        `}
      </style>
    </div>
  )
}
```

> 影响全局的样式
- 使用 <style global jsx>{``}</style> 包裹
- 加了一个 *global* 关键字

```js
export default () => {
  return (
    <div>
      <h3 id="title">我是 index 页面</h3>

      <style jsx>
        {`
          #title {
            color: red;
          }
        `}
      </style>
    </div>
  )
}
```


---

> sass的引入方式
- npm install --save-dev sass

- 使用方式 和 上述一样
- next.js允许您使用 .scss 和 .sass 扩展名导入 Sass 您可以通过css模块和 .module.scss 或 .module.sass 扩展名来使用组件级 Sass

----------------

### next中的样式 less
- 1. 下载
- npm i less @zeit/next-less

- 2. 配置less 根目录下创建 next.config.js

- 3. 在 next.config.js 中 引入 @zeit/next-less 然后导出
```js
const withLess = require("@zeit/next-less")
module.exports = withLess()
```

- 4. 创建 less 文件

  | - pages
  - style.less

```less
@size: 50px;
.size {
  font-size: @size;
}
```

- 5. 组件中引入
```js
import "../style.less"

export default () => {
  return (
    <div>
      <h3 className="size">我是 index 页面</h3>
    </div>
  )
}
```


> 模块的用法
- 修改 next.config.js 配置文件
```js
const withLess = require("@zeit/next-less")
module.exports = withLess({
  cssModules: true
})
```

- 然后组件中使用
```js
import less from "../style.less"

export default () => {
  return (
    <div>
      <h3 className={less.size}>我是 index 页面</h3>
    </div>
  )
}
```

----------------

### next中获取数据
- next有两种形式的预渲染

> 服务端渲染
- 访问 xxx 路由之前 向服务器要数据 把要回来的数据和HTML加工直接返回前台展示

> 静态化
- 访问 xxx 路由之前 向服务器请求数据 将请求来的数据和HTML加工*生成真正的 xxx.html 文件*

- 场景:
- 当页面上的数据是不变的情况下 比如页面里面的功能非常多 经常变化数据的情况下还是要使用后端渲染的

- 作用:
- 下次访问同一个理由地址的时候 直接返回静态页面 减小服务器压力 已达到性能优化的目的


**弃用的方法:**
- getInitialProps 弃用了


> 请求数据的包 node-fetch
- npm i node-fetch
- https://www.npmjs.com/package/node-fetch

- 使用方式:

> 1. 返回 html 文本 -- res.text()
```js
const response = await fetch('https://github.com/');
const body = await response.text();
```

> 2. 返回 json 格式 -- res.json()

> 3. 发送 post 请求 fetch(url, {options})
- 配置对象:
- method: ""
- body: ""
- headers: {}

```js
import fetch from 'node-fetch';

const response = await fetch('https://httpbin.org/post', {method: 'POST', body: 'a=1'});
const data = await response.json();

---

import fetch from 'node-fetch';

const body = {a: 1};

const response = await fetch('https://httpbin.org/post', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});
const data = await response.json();

console.log(data);

---

import fetch from 'node-fetch';

// 注意这里 添加 params 参数
const params = new URLSearchParams();
params.append('a', 1);

const response = await fetch('https://httpbin.org/post', {method: 'POST', body: params});
const data = await response.json();

console.log(data);
```

> 捕获异常
```js
import fetch from 'node-fetch';

try {
	await fetch('https://domain.invalid/');
} catch (error) {
	console.log(error);
}
```

---

> 获取数据的几种方式:
- 我们是后端渲染的框架 next有内置的服务器 请求数据的时候都是服务器和服务器之间的请求(不是浏览器xhr请求) 这种情况下是不存在跨域问题的

**注意:**
- 这些方法只能在 页面组件中使用 比如在 components 文件目录下是使用不了的

---

> getStaticProps()
- 静态化的方法(如果页面都是静态的 数据返回以后 数据也不需要改变了 这种情况下使用该方法)
- 服务器请求(http 非xhr) & *只能在pages文件夹下使用*

- 该方法和 getServerSideProps() 的使用方式一样 区别就是一个是静态化 一个 非静态化

- 作用:
- 请求数据

---

> getStaticPaths()
- 静态化 
- 服务器请求 & *只能在pages文件夹下使用*

- 作用:
- 生成动态路由
- 有些路径是动态路由 比如我们请求数据之前要知道哪个页面上请求数据 需要相应的生成一个路由 才能请求数据

- 返回值:
```js
{
  // 会返回多条路径 所以是个数组
  paths: [],    

  // false: 匹配不到路径 使用 404 页面 true: 有后备页面
  fallback: boolean 
}
``` 

- 步骤:
- 我们要在 [list].js 文件下 通过该方法生成动态路由 然后在不同的路由下再拿到不同的数据

    | - pages
      | - case
        - [list].js

- 规定写法:
```js
export const getStaticPaths = async () => {

  return {
    paths: []
    fallback: false, // 没有匹配的路径的时候 使用 404 页面
  }
}

// 请求 静态数据
export const getStaticProps = aysnc() => {
  return {
    props: {}
  }
}
```

- 练习: 
- 需求: 我们有一个 新闻列表 这个部分是使用 [list].js 做的
- 也就是说 每点击一个 列表项 就会有 对应的 url 
- /case/1

- 现在我们要做的是 根据 id 1 请求对应的数据

> 要点:
- 1. 我们要 getStaticPaths() 生成一个 动态的路由数组paths 该数组里面有 动态路由后面带的数据

- /case/1
- /case/2
- /case/3

- 先得到所有的 数据
- 该方法返回的数据 可以在 getStaticProps() 的参数中接收到 

- 2. getStaticProps(context) 可以接收到 当前 url 后面的动态数据
- 比如 我们处于 /case/3 那该方法中就能收到 3

- 3. 方便我们从 context 中解构 我们可以需要整理成 params: { } 的形式 因为 context 里面有 params 对象吧
- {params: {}}

```js
// [list].js 组件内容
// props 能够收到 getStaticProps() 返回的数据
export default (props) => {
  return (
    <div>
      <h3>动态路由组件 -- list</h3>
      <hr />
    </div>
  )
}


// next 的规定写法 生成动态路径
export const getStaticPaths = async () => {

  // 请求所有的数据列表信息 拿到id
  let res = await fetch("http:localhost:3333")
  let data = await res.json()

  // 整理成 每一个item为 {params: {list:   // {params: {list: "1902387347"}}

  let paths = data.map((item) => (
    {
      // list的值必须是字符串
      params: {list: `${item.id}`}
    }
  ))

  return {
    paths,  // paths要求是一个数组 所以我们使用map遍历
    fallback: false, // 没有匹配的路径的时候 使用 404 页面
  }
}


// 请求 静态数据
export const getStaticProps = aysnc (context) => {

  console.log(context)
  // {params: {list: "1902387347"}}

  let {params: {list}} = context

  // 拿到对应新闻列表的list 去请求对应的数据
  let res = await fetch(`http:localhost:3333/${list}`)
  let data = await res.json()

  return {
    props: {data}
  }
}
```

---

> 服务器端的请求数据 类似nuxt里面的asyncData
> getServerSideProps(context)
- 非静态化的方法 (动态页面的时候使用该方法)
- 服务器请求 & *只能在pages文件夹下使用*

- 作用:
- 请求数据

- 参数: context对象 里面有的属性:
- params:

  - 接收 getStaticPaths() 返回的动态路径 方便请求动态数据 
- query: 
  - 查询字符串

- req: httpIncomingMessage对象
- res: http响应对象

- 返回值:
- 对象
- 其中对象必有一个 key 值为 props 并且这个props作为该组件的props 也就是说返回的数据 会在props中

> 要点:
- 1. next推荐使用 node-fetch
- 2. 官方推荐的方法的格式为 在组件的外部 定义一个方法
```js
export const getServerSideProps = async () => {

  let res = await fetch("http:localhost:3333")
  let data = await res.json();

  return {
    props: {}
  }
}
```

- 3. 该方法必须有返回值 为对象 其中必须有props属性
- 4. 该props会传递给上面的组件 上方的组件通过 props 来接收

- 示例:
```js
import fetch from "node-fetch"

export default (props) => {
  console.log("index组件: ", props)
  return (
    <div>
      <h3>我是 index 页面</h3>
    </div>
  )
}

// 该方法运行在服务端的 所以要在服务端来看结果
export const getServerSideProps = async () => {

  let res = await fetch("http:localhost:3333")
  let data = await res.json();

  console.log(data)

  return {
    // props: {}
    props: data
  }
}
```

- 练习:
- 上面我们使用的是 getStaticPaths() getStaticProps() 来配合完成了一个动态路由的渲染 

- 现在我们使用 getServerSideProps() 也可以完成对应的逻辑

    | - pages
      | - case
        - [id].js

> 要点:
- context: query 可以获取动态路由的参数部分

- [id].js
```js
export default () => {
  return (
    <div>
      <h3></h3>
    </div>
  )
}

// 我们请求的时候 是动态的路由参数 我们请求的路径是不同 怎么才能拿到对应的路径呢？ context -> query  query就可以拿到 动态路由的参数部分
export const getServerSideProps = async ({query}) => {

  console.log(query)  // {id: "11283776"}

  let res = await fetch(`http:localhost:3333/${query.id}`)
  let data =await res.json()

  // 因为props要求是对象 data的类型是数组 我们将数组放到props中
  return {
    props: {data}
  }
}
```

----------------

### api路由 (可以使用 req res 的动态路由)
- next给我们提供了一些api的一些能力
- 我们需要在 pages 目录下创建 api 目录

    | - pages
      | - api 
        - xxx.js

- api目录下 创建的就是 api路由

> xxx.js 的书写方式:
- 就是导出了一个函数
- req:
  - req.method: 
    请求方式

  - req.body: 
    post请求传递过来的数据

  - req.query: 
    它是一个对象 对象中收集了 ?name=sam
    { name: 'sam' }

  - req.cookies
    {cookie: "123"}

- res:
  - res.statusCode: 
    设置状态码

  - res.setHeader: 
    设置响应头

  - res.end(): 
    发送数据 nextjs 包装后的

  - res.status(code): 
    设置状态码的功能 code必须是有效的http状态码
    ```js
      if(req.method == "GET") {
        res.status(403)
        res.send("拒绝访问")
        return
      }
    ```

  - res.send(body): 
    发送http相应 body可以使 string object buf

```js
  export default (req, res) => {
    
  }
```

> 示例:

    | - pages
      | - api
        - list.js

- list.js
```js
export default (req, res) => {
  console.log(req.method)

  // 设置响应头
  res.setHeader("content-type", "application/json")

  // 相应个json
  res.json("ok")
}
```

- 访问: http://localhost:3000/api/list
- 控制台上输出 "GET"

---


> api路由的命名
- 命名以 [xxx].js 和 [...xxx].js 为准


> 动态路由的演示

    | - pages
      | - song
        - [id].js

- [id].js
- 访问: http://localhost:3000/api/song/1

```js
export default (req, res) => {
  console.log(req.query)  // { id: '1' }

  res.json("ok")
}
```

- 正常的后台逻辑是获取参数后去数据库中获取数据
- api动态路由一般是获取数据做静态页面的渲染 并不是做后台的业务


> 匹配顺序
- /xxx.js > /[xxx].js > /[...xxx].js
- 如果有前面的了 就不会匹配后面的

---

> api路由中可以使用中间件
- 当我们接到请求后 中间件类似于工厂的流水线 每一个环节都需要一个处理程序(处理函数做一些操作 然后往下执行) 

- 什么时候 中间件没有了 就算执行完了

  | - api
    - middleware.js

> 需要使用 connect 库
- 这里都是中间件 很多功能
- https://github.com/senchalabs/connect

- 下载
- npm i connect

```js
let connect = require("connect")
let app = connect()

app.use(中间件)

export default app


--- 下面是使用例子

// 将值 加工下
app.use((req, res, next) => {
  console.log(req.body.value) // 123
  req.body.value = req.body.value + "456"
  next()
})

// 加工后返回
app.use((req, res, next) => {
  console.log(req.body.value) // 123456
  res.send("ok")
})
```

----------------

### 请求转发
- 比如前台发送过来请求了 请求到next服务器了 请求到api了
- 但是api是不去处理这次请求的 我们要再发送请求到真正的后台服务器

- 真正的后台服务器处理完结果后 返回给next next层面再返回给前台

<!-- 
    客户端  --  next  -- java
 -->

**注意:**
- 真正的后台是绝对不能做跨域的 很不安全的 所有的接口全部开放了 这样是特别危险的
- 比如 别人爬到了你的接口 随便给你上传10000个文件 服务器立马崩溃了

> 一般正确的做法是
- 1. 自己搭一个服务器做转发
- 2. nginx做转发

```js
export default async (req, res) => {

  // 前台 表单提交过来一个 name: "sam" 我们这里不做任何处理 转发给真正的后台接口

  // 将收到的数据 转发给真正的后台
  let response = await fetch("http://localhost:3333", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json"
    }
  })
  let data = await response.json()

  // 将真正后台的数据 返回给前台
  res.json(data)
}
```
