# 函数式编程相关

## 手动创建 React 项目
我们用 npm 管理的项目 不能直接在浏览器端运行  

在我们把项目在最终交给浏览器之前必须经过打包工具 进行打包 打包之后项目才能在浏览器中进行使用

所以在这个手动的 React 项目中 我们要使用 **webpack** 作为打包工具来对react项目进行打包

所以我们在使用npm管理我们项目的同时 还要使用webpack 但是我们一点点的去配置webpack那么又会很麻烦 所以 react 给我们提供了一个包

<br>

### react-scripts:
提供了项目开发中的大部分依赖 大大的简化了项目的开发 它把包括webpack babel 测试框架 都在这个包里面集成了 有了这个包相当于我们有了react给我们自动配置好的webpack 直接用(**一行webpack的配置都不用写**)

<br>

### webpack主要对项目来说有两个功能:
1. 打包 将打包后的文件可以部署到服务器上
2. 它可以给我们提供测试服务器 devServer

<br>

### 创建 手动React项目

**安装依赖**   
```
npm i react react-dom react-scripts
```

```json
"dependencies": {
  "react": "^18.1.0",
  "react-dom": "^18.1.0",
  "react-scripts": "^5.0.1"
}
```

<br>

**react-script 约定的项目结构:**   
必须用人家用的结构
```
| - 根目录
  | - public
    - index.html (添加标签 <div id="root">)

  | - src
    - App.js
    - index.js
```

<br>

**public:**   
里面放供外部访问的资源 比如静态图片 css js 不需要webpack打包的文件 都放在这里
index.html是必须的 它会作为我们首页的模版

<br>

**src:**   
源码目录 index.js 入口文件

<br>

### index入口文件中的逻辑:

**React 17:**  
```js
import React from "react"
import ReactDOM from "react-dom"

import App from "./App.js"

ReactDOM.render(<App/>, document.querySelector("#root"))
```

<br>

**React 18:**  
在react18中 react把ReactDOM 分为两个部分

1. **<font color="#C2185B">react-dom/client 在浏览器渲染页面的库</font>**   
2. **<font color="#C2185B">react-dom/server 在服务器渲染页面的库</font>**  

这里我们希望是在浏览器端渲染, 所以我们要加载的是 react-dom/client 这里也是跟 react17 中不同的地方 

- 引入入口文件里面没有引入react
- 后面我们使用服务器端的react 那么我们就要加载 react-dom/server, 如果我们只引入 react-dom 页面会报错

```js
// 引入 ReactDOM
import ReactDOM from "react-dom/client"

const App = (
  <div>
    <h1>这是一个React项目</h1>
    <p>我终于有了第一个React项目</p>
  </div>
)

// 获取根容器
const root = ReactDOM.createRoot(document.querySelector("#root"))
// 将App渲染到根容器
root.render(App)
```

<br>

### 项目启动命令 (打包):
因为这里我们需要使用 react-scripts 库 不是脚手架 所以我们没办法通过 npm run start 来启动项目

通过 npm 管理的项目 必须通过webpack进行打包 打包后才能在浏览器上运行 而打包这个动作 已经在 react-scripts 库中处理好了 我们需要通过 以下的命令 来进行打包

```js
// 当我们执行这个命令后 它自动会调用webpack进行打包
npx react-scripts build
```

<br>

输入命令后 选择 y 会自动往package.json中添加 兼容性配置, 打包后 我们的项目中就会多了一个 build 文件夹
```json
// 输入命令后 选择 y 会自动往package.json中添加 兼容性配置
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

<br>

### 访问页面:
然后我们在 build 文件夹里 启动 index.html 就可以访问了

<br>

**问题:**   
```html
<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Document</title><script defer="defer" src="/static/js/main.ff653062.js"></script></head><body><div id="root"></div></body></html>
```

**js引入的部分的路径是:**   
```
src="/static/js/main.ff653062.js"
```

我们发现页面是空白的状态 我们现在访问的方式是通过vscode内置的服务器访问的 也就是我们的网页会被部署到vscode的内置服务器

但是正常来说我们的代码应该部署到真正的服务器上 所以上面的路径是有问题的
```
/static/js/main.ff653062.js
```

/ 表示 根目录 就是说我们的build里面的东西应该部署到服务器的根目录中 现在我们没有部署到根目录 所以路径出了问题

<br>

**修改方式: 前面加个.**
```
./static/js/main.ff653062.js
```

<br>

**开发过程中 访问 html 页面内容:**   
```
npx react-scripts start
```
启动webpack的内置的测试服务器 供我们在开发阶段进行调试  
所有的项目开发完了 我们再通过 build 命令打包将项目部署到真正的服务器上

<br>

**整理到package.json里面:**   
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "react-scripts start",
  "build": "react-scripts build"
},

// 配置 eslint 简单代码是否符合 react 的语法规范
"eslintConfig": {
  "extends": [
    "react-app"
  ]
}
```

<br><br>

# 案例: 学习记录器


**html结构**   
```js
// 引入 ReactDOM
import ReactDOM from "react-dom/client"

const App = (
  <div className="logs">
    <div className="item">
      <div className="date">
        <div className="month">5月</div>
        <div className="day">23日</div>
      </div>

      <div className="content">
        <h2 className="desc">React</h2>
        <div className="time">1小时</div>
      </div>
    </div>
  </div>
)

// 获取根容器
const root = ReactDOM.createRoot(document.getElementById("root"))
// 将App渲染到根容器
root.render(App)
```

<br>

**style结构:**   
```
import "./index.css"
```

如果写成 import "index.css" 会被当成模块处理 会报找不到模块的错误  
**在引入样式 图片 资源的时候 我们要以 ./ 开头**   

<br><br>

# 案例: 学习记录器

**html结构**   
```js
// 引入 ReactDOM
import ReactDOM from "react-dom/client"

const App = (
  <div className="logs">
    <div className="item">
      <div className="date">
        <div className="month">5月</div>
        <div className="day">23日</div>
      </div>

      <div className="content">
        <h2 className="desc">React</h2>
        <div className="time">1小时</div>
      </div>
    </div>
  </div>
)

// 获取根容器
const root = ReactDOM.createRoot(document.getElementById("root"))
// 将App渲染到根容器
root.render(App)
```


**style结构:**   
``import "./index.css"``

如果写成 import "index.css" 会被当成模块处理 会报找不到模块的错误  
**在引入样式 图片 资源的时候 我们要以 ./ 开头**   

<br><br>

# 函数式组件
函数组件就是一个返回 JSX 的普通函数

<br>

**约定1:**   
使用函数的方式(**函数名首字母大写**)创建组件 函数名就是组件标签名  
函数会被React调用 所以函数内部必须使用return 将虚拟DOM暴露出去 

<br>

**约定2:**   
**函数组件必须有返回值** 表示该组件的结构(JSX的DOM结构)  

<br>

**约定3:**   
如果我们返回的是null 表示不渲染任何内容

<br>

接下来我们创建函数组件 将组件渲染到页面中

<br>

### React17: 创建函数式组件
```js
// 创建函数组件
function Demo() {
  return (
    <h2>
      我是用函数定义的组件(适用于简单的组件的定义)
    </h2>
  )

  // 或者

  return null
}

// 将组件渲染到页面
ReactDOM.render(<Demo />, app)


// 箭头函数的形式: 返回一个结构 + 函数名大写 就是函数式组件
const Hello = () => <h2>我是用函数定义的组件</h2>
```

<br>

### React18: 创建函数式组件
```js
// App组件
import Item from "./components/item"

const App = () => (
  <div className="logs">
    <Item />
  </div>
)

export default App


// Item组件
const Item = () => (
  <div className="item">
    <div className="date">
      <div className="month">5月</div>
      <div className="day">23</div>
    </div>

    <div className="content">
      <h2 className="desc">React</h2>
      <div className="time">1小时</div>
    </div>
  </div>
)

export default Item


// 入口index.js文件
// 引入 ReactDOM
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

// 获取根容器
const root = ReactDOM.createRoot(document.getElementById("root"))
// 将App渲染到根容器 渲染组件的时候 指定的是标签名的形式
root.render(<App />)

```

<br>

### 函数式组件中的特点:   

**1. 函数组件中的 this 为undefined**   
正常我们直接在Demo函数中打印 this 应该是window 但是输入结果却是undefined

```js
function Demo() {
  console.log("Demo", this) // undefined

  return (
    <div>
      <h3>Demo组件</h3>
    </div>
  )
}
```

<br>

**原因:**   
因为 我们的代码要经过 babel 的翻译 (type="text/babel") 

babel在翻译完下面的东西后会开启严格模式 **严格模式中禁止 自定义的函数中的this 指向window 所以undefined**

<br>

**类和模块的内部, 默认就是严格模式, 考虑到未来所有的代码, 其实都是运行在模块之中, 所以 ES6 实际上把整个语言升级到了严格模式**   

<br><br>

# state介绍:   
state是react提供给我们的特殊变量 react会监控state的变化 当state发生变化的时候 会自动触发组件的重新渲染 使得我们的修改可以在页面中呈现

它和props类似 都是一种存储属性的方式 但是不同点在于

state只属于当前组件 其他组件无法访 并且state是可变的, 当其发生变化后相关组件会一起 **刷新**

原理很简单, 当我们去调用setState的时候 就重新调用了下render() 结合diff算法 不用担心性能的问题

<br>

## 函数式组件: state
在函数式组件中 我们需要 **通过钩子函数获取state**
 
<br>

### **<font color="#C2185B">React.useState(初始值)</font>**   
要使用函数式的state 我们首先需要导入
```js
import {useState} from "react"

useState()
```

**参数:**  
useState(), 可以输入人一直 会作为state的初始值

<br>

**返回值:**  
返回值是数组, 可以解构出 [初始值, 初始值的setter函数]
  
<br>

- 初始值: 初始值只是用来显示数据 **直接修改不会触发组件的重新渲染**
- 初始值setter: 用来修改state **修改state后会触发组件的重新渲染**, 并且使用函数实参中的值 作为新的state的值

<br>

**示例:**  
```js
const [counter, setCounter] = useState(1)
// 实参2 会替换 初始值1
setCounter(2)



const handleInc = () => {
  // 拿到 原值 再 加1
  setCounter(counter + 1)
}

const handleDec = () => {
  setCounter(counter - 1)
}
```

<br>

### 初始值的setter
setter函数的参数
1. 新的数据, 该数据会替换掉初始值
2. 回调函数

<br>

### **<font color="#C2185B">setter((preVal) => {})</font>**   

**作用:**  
修改state中的状态

<br>

**参数: preVal**  
现在state中最新的值, 使用它肯定是基于前一次最新的值 避免多次修改的时候 获取到的不是最新的值

<br>

**返回值:**  
返回值会成为新的state的值
```js
setCounter((preVal) => {
  return preVal + 1
})
```

<br>

### 要点:
1. 只有state的值发生变化的时候 组件才会重新渲染

2. 通过setState去修改一个state时 并不表示修改当前的state 它修改的是组件下一次渲染的state的值 (因为更新是异步的)
```js
const [counter, setCounter] = useState(1);

// 注意: 这里修改的并不是 旧的counter的值 而是下一次渲染组件后的counter的值
setCounter(counter + 1)
```

3. 当state的初始值是一个对象的时候 修改的时候是使用新的对象替换已有的对象 这时就要考虑对象中属性的问题 比如99个属性 我们只想修改其中的一个
```js
const [obj, setObj] = useState({name: "sam", age: 18});

// 方式1
let newObj = {...obj, name: "erin"}

// 方式2
let newObj = Object.assign({}, obj)
newObj.name = "erin"

// 加法的回调
const handleInc = () => {
  setObj(newObj)
}
```

4. setState()会触发组件的重新渲染 它是异步的 所以 **当我们调用setState的时候 需要用到旧的state值时** 有可能计算错误的情况  
**为了避免上述的情况我们可以给setState传递回调函数的形式修改state的值**   
 
- 同步: 调用完setState 组件马上就渲染了
- 异步: 调用完setState 组件并不是立即渲染

<br>

**解释:**  
react有一个组件渲染的队列 当我们调用setState后 组件要重新渲染 然后它会把这个事放到队列里 它会把剩下的代码执行完毕后 回过头后再渲染 

因为后面的逻辑中可以还会修改state 所以它会一直把渲染这个事往队列里面挂 直到所有的功能都执行完了 主线程都完事了 然后再从队列里面一个个的取 依次执行 有多次的话会让最后一次生效

```s
https://www.bilibili.com/video/BV1bS4y1b7NV?p=34&spm_id_from=pageDriver
```

<br>

**演示:**   
```js
const [counter, setCounter] = useState(1);

const handleInc = () => {
  setCounter(2)
  setCounter(3)
  setCounter(4)
  setCounter(5)
  setCounter(6)

  // 只会渲染一次 是最后一次 如果是同步的会执行5次
}
```

<br><br>

## 函数式组件: props
父组件传递过来的数据, 我们通过函数式组件的形参来接收
```js
// 父组件:
const App = () => (
  <div className="logs">
    <Item date={new Date()} desc={"学习前端"} time={"50"}/>

    {/*遍历的方式渲染*/}
    {
      list.map((item, index) => (
        <Item key={index} date={item.date} desc={item.desc} time={item.time}/>
      ))
    }
  </div>
)


// 子组件 在形参中接收父组件传递过来的数据
const Item = (props) => {

  console.log(props) // {test: '123'}

  /* 
    date.toLocaleString() 
    将时间转换成本地格式的时间 
    
    参数1: 以哪个国家的形式显示日期格式,
    参数2: {} 用于配置返回的日期中要显示的数据 
    {month: long} 代表显示的是月份 且为中文 
  */
  const month = props.date.toLocaleString("zh-CN", {month: "long"})

  const day = props.date.getDay()

  return (<div className="item">
    <div className="date">
      <div className="month">{month}</div>
      <div className="day">{day}</div>
    </div>

    <div className="content">
      <h2 className="desc">{props.desc}</h2>
      <div className="time">{props.time}</div>
    </div>
  </div>
  )

}

export default Item
```

<br>

# useRef()

### 技巧:
我们做定时器逻辑的时候 会将定时器的返回值放在 this.timer 上, 但是函数式组件中没有this, 我们将timer放在哪里?

<br>

**创建一个ref对象, 放在ref对象上**
```jsx
import { useState, useRef } from "react";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  // 创建一个ref对象
  const intervalRef = useRef(null);

  const startTimer = () => {
    setIsRunning(true);

    // 将 Interval 的返回值 放在 ref对象上
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);

    // 清理时 清理的也是ref对象
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <div>Time: {time}</div>
      <button onClick={isRunning ? stopTimer : startTimer}>
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}

export default Timer;
```

<br>

**要点:**  
intervalRef: 一个ref对象, 用来引用定时器的ID, 以便后面停止定时器时使用。

在使用setInterval或setTimeout等定时器函数时, 会返回一个定时器ID。这个ID可以用来在未来的某个时刻停止定时器。

通常, **我们会将这个ID保存到某个变量中**, 以便在需要停止定时器时使用。但是, 在React组件中, 如果将定时器ID保存在普通的变量中, 可能会导致一些问题。

因为React的状态更新机制是异步的, 所以在一个useState钩子中更新状态后, 该状态值并不会立即改变, 而是在稍后的某个时间点才会更新。

这就意味着, 如果我们将定时器ID保存在一个普通变量中, 可能会导致定时器ID过期, 无法停止定时器。

**为了解决这个问题, 我们可以使用useRef钩子来保存定时器ID。**

**useRef创建的引用对象在组件重新渲染时不会被重置, 因此可以保证定时器ID一直是最新的。**

具体来说, 在使用setInterval函数开启定时器时, 可以将返回值保存到一个useRef创建的引用对象中。

然后, 在需要停止定时器时, 可以通过引用对象中保存的ID来停止定时器。这样就能够避免定时器ID过期的问题。

<br>