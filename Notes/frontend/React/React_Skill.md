# 技巧相关

## 待整理部分:
### react-query
### vanilla-extract/css

<br><br>

## React中的scss
react中默认支持scss 只需要下载就可以
```
npm install --save node-sass
```

<br><br>

## 样式的模块化 - 解决样式覆盖的情况
上面的案例中 我们发现, 子组件中的css文件里, 类名不能重复   

因为所有的css样式都会汇总到App组件里面, 就会发生 下面的同名样式会将上面的样式覆盖掉, 为了避免这种情况的发生 我们会将样式模块化, 相当于Vue中的 scoped


### 解决方式1: scss
使用 less 嵌套的话 就不会出现同名覆盖的问题

<br>

### 解决方式2: 样式的模块化 CssModule模式   
此方式相当于 Vue中的scoped 

<br>

**步骤:**  
- 创建css文件, 文件名要求: ``index.module.css``
- 引入css文件, ``import stylesheet from "./index.module.css"``
- 使用, ``<div className={stylesheet.app}>``

<br>


我们把index.css文件名 改成 index.module.css
``` 
index.css   --- >   index.module.css
```


我们在组件的js文件中 使用导入模块的方式导入css文件 这样所有hello相当的样式都会保存在hello对象里面
```js
import hello from './index.module.css'

// 下面使用样式的方式是 hello.title的形式
export default class Welcome extends Component {
  render() {
    return (
      {/*这里使用 样式模块.样式名的方式使用样式*/}
      <h3 className={hello.title}>
        Welcome
      </h3>
    )
  }
}
```

<br>

**注意:**  
引入的 stylesheet 中的其它选择器 比如id选择器会原封不动的编译到文件中


CSS Modules 是对现有的 CSS 做减法。为了追求**简单可控**，作者建议 **尽量** 遵循如下原则：
- 不使用选择器，只使用 class 名来定义样式
- 不层叠多个 class，只使用一个 class 把所有样式定义好
- 不嵌套
- 使用 `composes` 组合来实现复用

<br>

### 解决方式2: 自定义样式对象
```jsx
const App = () => {

  let [appStyle, setAppStyle] = useState({
    width: "300px",
    height: "80px",
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    background: "#C2185B"
  })

  const handler = () => {
    // 使用这种方式可以修改样式表
    setAppStyle({
      ...appStyle,
      width: "500px"
    })
  }

  return (
    <div style={appStyle}>
      我是App组件
      <hr />
      <button onClick={handler}>click</button>
      <h3>hello</h3>
    </div>
  )
} 
export default App
```

<br>

### 解决方式4: styled-components
通过该框架我们可以将 html元素封装成一个组件, 类似我们将 ``<div> -> <Div>``, 由我们自己来定义html元素的样式

类似我们使用 el-input 是一样的, 不仅如此这样定义的html组件, 我们还可以将js代码夹杂在css样式中

<br>

**安装:**
```
npm i styled-components
```

**引入:**
```
import styled from "styled-components"
```

**创建html组件的格式:**  
利用模版字符串
```js
const MyButton = styled.a`
  这里写css最原始的语法
  这里可以使用 &
`
```

```js
import styled from "styled-components"
const Button = styled.a`

`
const App = () => (
  <div>
    我是App组件
    <hr/>
    <Button>我是a标签</Button>
  </div>
) 

export default App

// 编译完后: <a class="sc-bcXHqe eCGCkv">我是a标签</a>
```

我们可以发现 这个样式组件帮我们给这个a标签起了一个随机的样式名 也就是说默认我们创建的组件就是带class的 所以不用我们考虑class的问题

<br>

**使用技巧:**  
```js
const MyButton = styled.a`
  & ~ & {
    三个按钮后两个加 margin-top , 后一个前面有的话就加
  }

  & + & {
    紧挨着
  }
`
```

``<MyButton className="">``也可以使用样式名

<br>

**可以向标签样式组件传递props:**  
```js
const Button = styled.a`
  background: ${props => props.color}
`

<Button color="#C2185B"></Button>
```

<br>

**示例: 移入移出的效果**  
```js
import styled from "styled-components"
import {useState} from "react"

const Container = styled.div`
  width: 300px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: ${props => props.color};
`

const App = () => {

  const [flag, setFlag] = useState(true)

  return (
    <Container color={flag ? "#C2185B" : "#C2D55B"}
      onMouseEnter={() => setFlag(true)}
      onMouseLeave={() => setFlag(false)}
    >
      我是App组件
    </Container>
  ) 
}

export default App
```

<br>

**标签样式组件可以使用变量:**  
```js
let color = "red"

const  = styled.a`
  background: ${color}

  // 当 custom 为 true 的时候 要执行什么样的样式
  ${props => props.custom && css`
    background-color: "red"
  `}
`

<Button custom={flag}
  onMouseEnter={() => setFlag(true)}
  onMouseLeave={() => setFlag(false)}
  >
```

<br>

**组件库提供的 css模版样式函数:**  
就是jq中的css()函数
```js
// 引入
import styled, {css} from "styled-components"

const Button = styled.a`

  // 当disabled的时候我们添加对应的样式
  ${props => props.disabled && css`
    color: #777
  `}
`

<Button disabled={true}>
```


<br><br>

## 图片的引入方式
一切皆模块
```js
import logo from "./logo.svg"
```

<br><br>

## React中特有的数据操作方式

### 修改对象中的属性:
解构 + 新kv
```js
const newObj = {...this.state.obj, num: 2}
```

<br><br>

### 扩展运算符的回顾:

**...**   
在es6中是用来展开数组的 连接数组的
```js 
// 展开一个数组
let arr = [1,2,3,4]
console.log(...arr)     1 2 3 4


// 连接两个数组
let arr = [1,2,3]
let arr2 = [4,5,6]

let arr3 = [...arr1, ...arr2]
//  [1, 2, 3, 4, 5, 6]

  
// 函数传参 用于批量的接受参数
function sum(...args) {
  console.log(args)   // [1,2,3,4]

  // 求和
  return args.reduce((tmp, value) => {
    return tmp + value
  }, 0)
}
let res = sum(1,2,3,4)
console.log(res)


// ... 可以应用到对象上么?  所以展开运算符不能展开一个对象
let person = {name: 'sam', age: 18}
console.log(...person)   // 报错 对象上没有可遍历的接口


// 还可以用于复制一个对象, 可以在对象中使用 {...person} 这是可以的
let person = {name: 'tom', age: 18}
let person2 = {...person}


// 复制对象时 修改属性
let person = { name: 'tom', age: 18 }
let person2 = {...person, name: 'erin'}

console.log(person2)
```

<br><br>

## 父组件: 更新 删除 添加数据的方法:
页面会根据 state状态 中的数据 来驱动页面更新 进而显示 这是中心思想

所以我们都是对state中的数据 进行更新的操作, state 换个方式理解 可以理解为Vue中的 data 配置项, 我们定义在data配置项里面的数据 都会被实时监测

<br>

### 场景:
数据在父组件, 操作数据的方法也应当定义在父组件  
子组件将数据传入到父组件, 父组件利用该数据更新自己的state中的数据 从而驱动页面的效果变化

<br>

**实现:**  
父组件传递一个函数到子组件, 子组件利用实参将数据传回父组件

<br>

**添加数据:**  
父组件的state中有一个对象数组 [{}, {}, {}], 子组件整理了一个用户输入的数据对象, 子组件利用父组件的回调将数据对象 传入父组件中

父组件使用如下的方式将子组件传来的数据对象追加到父组件的state中的对象数据中

1. 获取state中的原有的对象数组
2. 创建一个新的对象数组, [子组件对象, ...原有的对象数组]
3. 调用setState()方法, 将新的对象数组赋值给state中原来的变量

<br>

```js 
// addTodo用于给state中添加一条信息, 接收的参数是一个todo对象
addTodo = (todoObj) => {

  // 我们要获取state中的数据, 然后将新的对象放入到数据的前面
  const { todos } = this.state

  // 追加一个todos
  const newTodos = [todoObj, ...todos]

  // 更新状态
  this.setState({
    // 用新对象替换掉 state 中的对象
    todos: newTodos
  })
}
```

<br>

**更新对象中的数据:**  
子组件向父组件传递 目标对象的id, 目标对象的某属性对应的新值 如: updateTodo(id, done) -> updateTodo(1, false)

1. 获取父组件state中原来的对象数组
2. 使用map遍历该数组 根据 id 找到目标对象, 利用这种方式修改值 ``{...item, done:done}`` 返回一个新对象
3. 将修改后的对象数组, 调用setState()方法 将新的对象数组赋值给state中原来的变量

<br>

```js 
// updateTodo 用于更新一个todos对象
updateTodo = (id, done) => {
  // 这里需要的参数是 改的是谁, done的情况
  
  // 获取状态中的todos
  const {todos} = this.state
  
  /*
  这种方式相当于直接修改state中的数据 不行 我们要通过 setState() 来修改才可以 
  todos.forEach((item, index) => {
    if(item.id === id) {
      item[done] = done
    }
  })
  */

  // 匹配处理数据
  let newTodos = todos.map((item) => {
    if(item.id === id) {
      // 如果匹配上了 我就给你返回一个新的对象, 而且done的值被我改了
      return {...item, done:done}
    } else {

      // 如果没匹配上, 原数据返给你
      return item
    }
  })

  // 更新todos
  this.setState({
    todos: newTodos
  })
}
```

<br>

**删除数据:**  
说是删除 也是创建一个新的对象, 然后用它覆盖掉state中旧的对象
- 获取state中原来的数据
- 使用filter()方法将要删除的数据过滤掉
- 更新state

```js 
// 删除 用于删除一个todo
deleteTodo = (id) => {
  // 获取原来的todos
  const {todos} = this.state

  // 从数组里面删除指定id的元素 我们可以使用数组里面的过滤 比如我们要删除002, 那么我就用filter方法, 将除了002的item返回 那是不是就相当于删除了002
  let newTodos = todos.filter((item) => {
    return item.id !== id
  })

  // 状态更新 驱动页面显示
  this.setState({
    todos: newTodos
  })
}
```

<br><br>

## form相关的知识点
- 不指定请求方式的时候, form表单默认是get请求  
- 带的参数默认是query参数 /?是携带qurey参数的一种形式
- 如果表单项中没有name属性, 我们取不到用户输入的数据
```js
// 没指定name属性
https://www.baidu.com/?

// 指定了name属性
https://www.baidu.com/?uname=sam&pwd=123
```

- 有 form 的情况下 我们用 onsubmit 事件来提交数据
- 原生form提交后 页面会跳转 或 刷新 数据会置空, 但是ajax不会

<br><br>

## 高阶函数: 函数柯里化
通过函数调用继续返回函数的方式, 实现多次接收参数最后统一处理参数的函数编码形式

### 非柯里化示例:
```js 
// 需求 求3个数的和
function sum(num1, num2, num3) {
  return num1 + num2 + num3
}


let res = sum(1, 2, 3)
console.log(res)        // 6
```

<br>

### 柯里化示例:
```js
function sum(a) {
  // sum的返回一个函数接收到一个b
  return (b) => {

    // 它继续返回函数接收到一个c
    return (c) => {

      // 这个函数做的统一处理
      return a + b + c
    }
  }
}

let result = sum(1)(2)(3)
console.log(result)


// 我们的案例其实就用到了函数的柯里化技术
saveFormData = (dataType) => {
  return (event) => {
    this.setState({
      [dataType]: event.target.value
    })
  }
}
```

<br>

### 要点: React高阶函数接收自定义参数的位置
react在帮我们调用方法的时候会传递event, 但是我们自己传的话参数就是我们自己传递的

- Vue: 计算属性 - 内部函数接收参数
- React: 
  - 外层接收 参数
  - 内层接收 事件对象: 因为我们是将 return的函数交给react 所以event会被传到这个函数中

<br>
  
### 场景:
在受控组件的案例中 我们使用了受控组件的形式, 将input中的值取出来放在了state中, 然后从state中做了展示

但是上面的代码还是存在了一些的问题, 我们的案例中只是需要在state中保存uname 和 password, 假如我们的组件是一个注册功能

```js 
<input type="text" name='uname' onChange={this.saveUname}/>

saveUname = () => {}
savePassword = () => {}
```

那是不是说我们还需要定义如下的函数 但目的就是为了保存一个值
- saveUname
- savePassword
- saveTel
- saveMail... 

<br>

所以 我们要想办法 定义一个通用方法, 在这个方法中我们利用形参将值保存在state对应的变量中, 比如我们定义如下的方法:
```html
<input type="text" name='uname' onChange={this.saveFormData('uname')}/>
```

<br>

**问题1:**   
该函数react会帮我们直接调用 因为 saveFormData后面加了() 直接调用了

<br>

**问题2:**   
由于我们自己传递了参数, saveFormData('uname') 那么我们类中定义的saveFormData方法 接收到的参数就不是 event对象了

因为react在帮我们调用方法的时候会传递event, 但是我们自己传的话参数就是我们自己传递的

<br>

**问题3:**   
而且 ``onChange={this.saveFormData('uname')`` 这种形式的写法, 也会失去效果  

因为这种写法 是将saveFormData()的返回值 交给onchange做为回调 **而saveFormData的返回值是undefined 所是react不会帮我们调用undefined 所以就会没效果**

从上面总结的问题上来看, 我们只需要让saveFormData返回一个函数就可以了, 这样交给onChange做为回调的就不再是一个函数的返回值, 而是一个函数

```js 
saveFormData = () => {
  return () => {}
}

// 我们通过实参传递进来的参数在外层形参中接收
saveFormData = (dataType) => {
  return (event) => {
    this.setState({

      // 这里要注意, {}中的属性名其实都是'字符串'类型, 而我们需要读的是dataType这个变量, 所以要加上[]
      [dataType]: event.target.value
    })
  }
}
```

<br>

1. 形参dateType指明state中的key
2. event.target.value 获取用户输入的值

<br>

**什么是高阶函数:**   
如果一个函数符合下面2个规范中的任何一个 那么该函数就是高阶函数
- 若A函数 接收的参数是一个函数, 那么A就是高阶函数
- 若A函数 调用的返回值依然是一个函数, 那么A就是高阶函数

<br>

### 常见的高阶函数有哪些?
- Promise
```js
new Promise(() => {})  参数是函数  === > 高阶函数
setTimeout(() => {})  参数是函数  === > 高阶函数
```

- 数组身上常见的方法都是高阶函数 map reduce forEach

<br>

### 不用柯里化的写法:
```jsx
saveFormData = (dataType, value) => {
  this.setState({
    [dataType]: value
  })
}

<input type="text" name='uname' onChange={onChange={(event) => {this.saveFormData('uname', event.target.value)}}}/>
```