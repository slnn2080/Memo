# video标签相关的知识点:
```html
<video></video>
```

<br> 

### video标签的基本用法:
**方式1. 使用src属性链接视频地址**
```html
<video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg" controls>
    你的浏览器不支持 <code>video</code> 标签。
</video>
```

还可以根据 **source属性** 指定视频格式
```html
<video controls>
  <source src="foo.ogg" type="video/ogg">
  <source src="foo.mp4" type="video/mp4">
  Your browser does not support the <code>video</code> element.
</video>
```

但是使用src的时候毕竟我们链接的是地址 是地址就有可能出现播放失败的情况 我们将 src属性的值 设置为 Blob对象的DOMString
```html
<video src="blob:http://abc.com/d0823f0f-2b2a-4fd6-a93a-e4c82173c107">
</video>
```

上面可以这么设置是因为 src 只是 Blob的, 但是新标准建议 使用 srcObject 替代 src 属性
```js
const mediaSource = new MediaSource();
const video = document.createElement('video');
try {
  video.srcObject = mediaSource;
} catch (error) {
  video.src = URL.createObjectURL(mediaSource);
}
```

<br>

**srcObject标签属性:**  
该属性的值为: MediaStream || MediaSource || Blob || File

<br>

### video标签身上的部分事件:
**<font color="#C2185B">loadeddata</font>**  
在媒体当前播放位置的视频帧（通常是第一帧）加载完成后触发。

<br>

**<font color="#C2185B">loadedmetadata</font>**  
在元数据（metadata）被加载完成后触发

<br><br>

# 待看前端的设计模式
FileReader Blob ArrayBuffer FormData URL.createObjectURL 上传文件 后台接收

前端5种监视器
https://mp.weixin.qq.com/s/doBnp_fN8RpH_1rBfUfwhg

待总结:
百度统计代码

<br>

# 格式化
https://blog.csdn.net/weixin_44875693/article/details/124196163

<br>

# 浮点数的处理方式
https://www.cnblogs.com/CandyDChen/p/16300638.html

<br>

# 链判断运算符
### **<font color="#C2185">?.: </font>**
以往我们要读取对象内容的属性的时候 往往需要判断一下 属性的上层是否存在  
比如: message.body.user.firstName

我们要层层的判断一下属性的上层有没有值 但是我们需要的属性在第4层 所以要判断4次 每一层是否有值
```js
// 错误的写法:
let name = message.body.user.firstName || "default"


// 正确的写法: 
let name = (
  message && message.body && message.body.user && message.body.user.firstName
) || "default"
```

es6中引入了 ?. 运算符 在链式调用的时候判断  
左侧的对象是否为null或者undefined  
如果是 null 或者 undefined 那么就返回undefined
如果不是 就执行

```js
let obj = {
  job: {
    front: "vue"
  }
}

console.log(obj?.hi?.front)
// undefined

console.log(obj.hi.front)
// Cannot read properties of undefined (reading 'front')


a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()
```

<br>

### **<font color="#C2185">??: </font>**
当运算符的左侧为null或者是undefined的时候 给予默认值
```js
const animationDuration = response.settings?.animationDuration ?? 300;
```

<br>

# 重绘后执行的回调 就当计时器用
### **<font color="#C2185">window.requestAnimationFrame(callback): </font>**
回调函数会在浏览器下一次重绘之前执行
有点类似 setTimeout()

代替 计时器 使用 requestAnimationFrame() 方法来修改bar的长度 如果使用计时器每进行回调一次都会对页面造成回流重绘 而requestAnimationFrame它会将回流和重绘收集起来只走一次 性能要比计时器要好 而且它是以60的帧率进行绘制 视觉效果上也好

回调函数执行次数通常是每秒 60 次, 但在大多数遵循 W3C 建议的浏览器中, 回调函数执行次数通常与浏览器屏幕刷新次数相匹配

**callback参数:**  
- DOMHighResTimeStamp
- 它表示requestAnimationFrame() 开始去执行回调函数的时刻。

```
指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间。在同一个帧中的多个回调函数, 它们每一个都会接受到一个相同的时间戳, 即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。
```

**返回值:**  
id: window.cancelAnimationFrame()  
以取消回调函数。兼容性不错

**注意:**  
该函数要配合递归使用 因为该回调只走一次

<br>

**示例:**  
使用requestAnimationFrame代替setTimeout, 减少了重排的次数, 极大提高了性能, 建议大家在渲染方面多使用requestAnimationFrame

```js
const renderList = async () => {
  console.time('列表时间')
  // 获取数据
  const list = await getList()

  // 总数据条数
  const total = list.length

  // 当前页码
  const page = 0

  // pageSize: 一页显示多少条
  const limit = 200

  // 一共有多少页
  const totalPage = Math.ceil(total / limit)

  // 创建渲染函数
  const render = (page) => {
    // 如果页码比总页数大 则停止 递归的停止条件
    if (page >= totalPage) return

    // 使用requestAnimationFrame代替setTimeout 传入回调 该回调会在重绘前执行
    requestAnimationFrame(() => {

      // 循环 分页
      for (let i = page * limit; i < page * limit + limit; i++) {

        // 每一个
        const item = list[i]
        const div = document.createElement('div')
        div.className = 'sunshine'
        div.innerHTML = `
          <img src="${item.src}" />
          <span>${item.text}</span>
        `

        container.appendChild(div)
      }

      // 递归调用
      render(page + 1)
    })
}
  render(page)
  console.timeEnd('列表时间')
}
```

<br>

# 文档碎片
### **<font color="#C2185">document.createDocumentFragment(): </font>**
创建文档碎片
会返回一个文档碎片的容器, 我们可以将每次加工后的dom节点放入到容器内
然后一次性的将 文档碎片 插入到页面中 *页面只会渲染文档碎片包裹着的元素, 而不会渲染文档碎片*

```js
const fragment = document.createDocumentFragment()
for() {
  fragment.appendChild(div)
}

// 一次性appendChild
container.appendChild(fragment)
```

<br>

# 滚动到指定的位置
### **<font color="#C2185">Element.scrollTo(): </font>**
可以使界面滚动到给定元素的指定坐标位置。

**参数:**  
方式1: (x-coord, y-coord)
```
x-coord 是期望滚动到位置水平轴上距元素左上角的像素。
y-coord 是期望滚动到位置竖直轴上距元素左上角的像素。
```

方式2: {options}  
```
top: 100,
left: 100,
behavior: 'smooth'
```

**兼容性:**
ie全系列不支持

<br>

### 场景: 滚动到底部
当一个盒子内部的内容增加的时候 并且超过该盒子的高度的时候 我们希望它自动滚动到底部
```js
element.scrollTo({
  top: 100,
  left: 100,
  behavior: 'smooth'
});

element.scrollTo(0, 1000);


let box = ...
box.scrollTo({
  top: box.scrollHeight,
  behavior: "smooth"
})

```

<br>

# 奇葩的初始化逻辑:
我们可以先从一个地方取出一个变量先用 然后会其进行空判断 如果为空就赋初始值 然后在放回那个地方
```js
let obj = {}
let res = obj.num + 1
```

<br>

# defaultValue
**场景:**  
我想让文本框中的值 进行 修改前 和 修改后的对比
关于修改前的值 可以用 this.defaultValue 来获取

defautValue是页面加载出来后input中的初始值, value是当前input中的值

当input中的值未修改时 value == defaultValue
当修改input值时
- value为修改后的值
- defaultValue仍为之前的

<br>

# if else 减少嵌套
https://www.jianshu.com/p/ea22123d4f62

### **场景1:**
```js
if(a为真) {
  a = a
} else {
  a = b
}   

// 修改为:
a = a || b
```

<br>

### **场景2:**
```js
if(a == b){
  a = c
}else{
  a = d
}

// 修改
a = (a == b) ? c : d
```

<br>

### **场景3:**
后台接口通常会返回这种数据: 
```js
task: 0 // 0=紧急 1=日常 2=临时

// 这种时候不能用判断 我们可以这样
let mapData = ["紧急", "日常", "临时"]
let res = mapData[task]
```

<br>

### **优化 if 逻辑:**
把最可能出现的情况放在最前面, 最不可能出现的情况放在最后面

<br>

#### **使用Array的方法或者Map等数据结构: **
如果是苹果 或者 草莓的话 输出 red
```js
function test(){
  if(fruit == 'apple' || fruit == 'strawberry'){
    console.log('red');
  }
}
```

那如果我们要添加更多的条件的时候 怎么办？ 不能一直 || || || || || || 吧  
所以我们可以修改成如下的逻辑
```js
function test(fruit) {
  const redFruit = ['apple','strawberry','cherry','cranberry'];
  if(redFruit.includes(fruit)) {
    console.log("red")
  }
}
```

那如果我们有更多的颜色呢 不光光只输出红色的水果 我们可以将  
颜色 : 水果 
组织成键值对的形式 根据key 去找对应的value

```js
const fruitColor = new Map()
fruitColor.set("red", ['apple','strawberry'])
fruitColor.set('yellow',['banana','pineapple']);
fruitColor.set('purple',['grape','plum']);

function test(color) {
  return fruitColor.get(color) || []
}
```

<br>

### **策略模式:**
定义一系列的算法, 把它们一个个封装起来, 并且使它们可以相互替换  
我们将 type 作为 key, 以要执行的逻辑 作为 value, 封装到 对象中  
能够有效避免多重条件选择语句, 显得简洁易于理解。在后期扩展也只需要再对象中新增一项, 方便维护。

```js
function fn(type) {
  if(type == "a") {
    console.log("我们执行 type a 对应的逻辑")
  } else if(type == "b") {
    console.log("我们执行 type b 对应的逻辑")
  } else if(type == "c") {
    console.log("我们执行 type c 对应的逻辑")
  }
}


// 修改为 使用策略模式优化
function fn(type) {
  let handlerA = () => console.log("我们执行 type a 对应的逻辑")
  let handlerB = () => console.log("我们执行 type b 对应的逻辑")
  let handlerC = () => console.log("我们执行 type c 对应的逻辑")

  let handlerMap = {
    a: handlerA,
    b: handlerB,
    c: handlerC,
  }

  handlerMap[type] && handlerMap[type]()
}
```

<br>

# 装饰器
装饰器(Decorator)是一种与类(class)相关的语法, 它可以放在类和类方法的定义前面

    装饰器是一种函数 写成 @函数名


**例如:** 
下面代码一共使用了四个装饰器一个用在类本身另外三个用在类方法

```js
@frozen 
class Foo {

  @configurable(false)
  @enumerable(true)

  method() {}

  @throttle(500)

  expensiveMethod() {}

}
```

<br>

### **装饰器 & webpack 的配置:**
装饰器还不是 es 的标准 我们在js环境中要想使用装饰器 还需要webpack的配合编译

在完成webpack的基本安装后 想要安装 装饰器 对应的包 需要安装如下:

    npm i @babel/plugin-proposal-decorators -D
    npm i @babel/plugin-proposal-class-properties -D
    npm i babel-loader @babel/core @babel/preset-env -D

```js
  "devDependencies": {
    "@babel/core": "^7.18.5",
    "@babel/plugin-proposal-decorators": "^7.18.2",
    "@babel/plugin-proposal-class-properties": "^7.17.12",
    "@babel/preset-env": "^7.18.2",
    "babel-loader": "^8.2.5",
    "babel-plugin-transform-decorators-legacy": "^1.3.5",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.10.3"
  }

// webpack配置 module配置项
const {resolve} = require("path")
module.exports = {
  entry: "./index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env", 
              {
                targets: {
                  "chrome": "58"
                }
              }
            ]
          ],
          // 注意它们两个的配置顺序
          plugins: [
            [
              "@babel/plugin-proposal-decorators",
              {"legacy": true}
            ],
            [
              "@babel/plugin-proposal-class-properties",
              { "loose": false }
            ]
          ]
        }
      }
    ]
  },
  plugins: [],
  mode: "development"
}


// 执行 webpack 命令
```


### **装饰器的定义:**
装饰器就是一个函数 所以定义装饰器的方式 就是定义一个函数  
装饰器是一个对类进行处理的函数.装饰器函数的第一个参数就是所要装饰的目标类.

**参数:**  
形参就是 被装饰的类 
通过装饰器 可以给 目标类 添加属性

### **定义格式:**
装饰器的定义和使用 

#### **为类添加 静态属性: **
相当于给 MyTestableClass 类本身添加属性 因为 target就是类本身
```js
// 装饰器 本身就是一个函数 参数为 标记时的类
function addStaticField(clazz) {
  clazz.isFlag = true
}


// 将装饰器 装饰 整个类 装饰哪个类 target就是哪个类
@addStaticField
class TestClass {

}

// 装饰器给类添加了静态属性 isTestable 
console.log(TestClass.isFlag) // true
```

<br>

#### **@装饰器(参数): **
默认装饰器只有一个参数就是被装饰类 如果想给装饰器添加参数 可以 **使用高阶函数的形式**

外层函数用于接收参数
内层函数则是 被装饰的类
```js
// 外层函数用于接收参数
function addStaticField(isTestable) {

  // 内部 return 的这个函数的参数 才是 被装饰类
  return function(clazz) {
    // 利用外层的参数 我们对类中的静态属性进行赋值操作
    clazz.isTestable = isTestable;
  }
}
```

像上面 高阶函数的形式定义的装饰器 就可以接收额外的参数了
```js
@addStaticField(true)
class TestClass {}
TestClass.isTestable  // true
```

示例:
```js
const addProp = param => {

  return clazz => {
    clazz.staticProp = param
  }

}

@addProp("通过实参传递进来的属性")
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  say() {
    console.log(this.name)
  }
}

console.log(Person.staticProp)  // 通过实参传递进来的属性
```

<br>

### **为类添加实例属性:**
添加实例属性 可以*通过 prototype 来操作*

```js
@addStaticField
class TestClass {

}

function addStaticField(clazz) {
  // 给类的原型对象上添加属性 这样它的实例对象就能拿到
  clazz.prototype.instanceField = true
}


let tc = new TestClass()
console.log("实例身上的属性:", tc.instanceField)
```

### **例子: **
```js
// 模拟 别的组件传递过来的数据
let data = {
  name: "sam",
  age: 18,
  address: "白山"
}


// 创建 混合参数的 装饰器
const mixinFeilds = params => {
  
  return clazz => {
    Object.assign(clazz.prototype, params)
  }

}


// 我们没有改变类本身的结构 而是通过装饰器来添加
@mixinFeilds(data)
class TestClass {

}

let tc = new TestClass()
console.log(tc.__proto__) // { name: 'sam', age: 18, address: '白山' }
```



实际开发中React 与 Redux 库结合使用时常常需要写成下面这样.
```js
class MyReactComponent extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
```

有了装饰器就可以改写上面的代码.
```js
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```


自己尝试写装饰器时候做的示例:
```js
const addProp = param => {

  return clazz => {
    // 添加 静态属性
    clazz.staticProp = param
    // 添加 动态属性
    clazz.prototype.dynamicProp = "我是动态属性"
  }
}

@addProp("通过实参传递进来的属性")
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  say() {
    console.log(this.name)
  }
}

let p = new Person("sam", 18)
console.log(Person.staticProp)  // 通过实参传递进来的属性
console.log(p.dynamicProp)  // 我是动态属性
```

<br>

### **方法的装饰: **
https://www.jianshu.com/p/c00750ecaa45
装饰器不仅可以装饰类还可以装饰*类的属性*

这类装饰器 可以装饰 类的属性 和 类的方法

### **格式: **
```js
// 方法的装饰器
const methodDecorator = (clazzPrototype, prop, propDescriptor) => {
  console.log("clazzPrototype", clazzPrototype)
  console.log("prop", prop)
  console.log("propDescriptor", propDescriptor)
}

// 方法的输出:
clazzPrototype {}
prop info
propDescriptor {
  value: [Function: info],
  writable: true,
  enumerable: false,
  configurable: true
}

<br>

// 属性的装饰器
const attrDecorator = (clazzPrototype, prop, propDescriptor) => {
  console.log("clazzPrototype", clazzPrototype)
  console.log("prop", prop)
  console.log("propDescriptor", propDescriptor)

}

// 属性输出: 
clazzPrototype {}
prop attr
propDescriptor {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: [Function: initializer]
}
```

### **参数: **
1. clazzPrototype: 类的原型对象
```js
打印输出: clazzPrototype {}
```

作用: 
我们可以通过 类的原型对象 往里面添加属性 和 方法

上例是Person.prototype
装饰器的本意是要“装饰”类的实例 但是这个时候实例还没生成所以只能去装饰原型
(这不同于类的装饰那种情况时target参数指的是类本身);


2. prop: 装饰对象的名字(属性名)
```js
打印输出: prop info (装饰的目标的名字)
比如: 装饰方法 输出方法名 装饰属性 输出属性名
```


3. propDescriptor: 该属性的描述对象

如果装饰的是方法 有 value
propDescriptor.value 能获取 目标的值哦

如果装饰的是属性 好像没有 value
那要是装饰的是属性的话 是不是能改变该属性的性质 比如不能修改等操作

```js
打印输出: 装饰目标的描述对象
propDescriptor {
  value: [Function: info],
  writable: true,
  enumerable: false,
  configurable: true
}


// 比如上面的 value: [Function: info]
const methodDecorator = (clazzPrototype, prop, propDescriptor) => {
  console.log("clazzPrototype", clazzPrototype)
  console.log("prop", prop)
  console.log("propDescriptor", propDescriptor)

  // 我们可以通过 value 获取info函数进行调用
  propDescriptor.value()
}
```

**如果没有装饰对象的时候 值为 undefined**


### **返回值: **
返回值好像必须是一个对象

装饰成员的时候 函数内部需要返回
或者返回 clazzPrototype
或者返回 propDescriptor
或者返回 propDescriptor中的一个修改后的值

示例
```js
// 类中方法的装饰器
const clazzMethodDecorator = (clazzPrototype, prop, propDescriptor) => {
  console.log("clazzPrototype", clazzPrototype)
  console.log("prop", prop)
  console.log("propDescriptor", propDescriptor)



  // 要有返回值
  return propDescriptor.value
  // or
  return {
    ...propDescriptor,
    writable: false // 覆盖为false
  }
  // or
  return clazzPrototype
}
```

```js


@clazzDecorator("通过实参传递进来的属性")
class Person {

  @clazzMethodDecorator // 装饰属性的时候 prop 就是 address
  address = "日本"


  constructor(name, age) {
    this.name = name
    this.age = age
  }


  @clazzMethodDecorator // 装饰方法的时候 prop 就是 say
  say() {
    console.log(this.name)
  }
}
```



### **示例: 给类中的属性 绑定了 setter getter: **
### **要点: 我给类中的属性 绑定了 装饰器 内部使用了 set get: **
```js
// global属性
let content = "我是全局属性"

<br>

// 类的装饰器
const clazzDecorator = param => {

  return clazz => {
    clazz.staticProp = param
    clazz.prototype.dynamicProp = "我是动态属性"
  }
}

<br>

// 类中属性的装饰器
const clazzAttr = (clazzPrototype, prop, propDescriptor) => {

  if(prop == "undefind") return

  // 默认是属性描述 现在返回的是 get set 的描述对象
  return {
    configurable: true,
    enumerable: true,
    get() {
      console.log("我读取全局中的属性")
      return content
    },
    set(value) {
      console.log("我设置了全局中的属性")
      content = value
    }
  }
}

<br>

// 类中方法的装饰器
const clazzMethodDecorator = (clazzPrototype, prop, propDescriptor) => {
  console.log("我是类中方法" + prop + "的装饰器")
}

<br>

// 装饰类
@clazzDecorator("通过实参传递进来的属性")
class Person {

  // 装饰属性
  @clazzAttr
  address = "日本"

  constructor(name, age) {
    this.name = name
    this.age = age
  }

  // 装饰方法
  @clazzMethodDecorator
  say() {
    console.log(this.name)
  }
}

let p = new Person("sam", 18)
console.log(p.address)
```


### **网道示例: 只读属性: **
下面代码说明装饰器(readonly)会修改属性的描述对象(descriptor)
然后被修改的描述对象再用来定义属性.

```js
class Person {
    @readonly
    name() {
        return `${this.first} ${this.last}`
    }
}

// 上面代码中装饰器readonly用来装饰“类”的name方法.

// 定义 readonly 装饰器
function readonly(target, name, decriptor) {
    /*
    descriptor对象原来的值如下
    {
        value: specifiedFunction,
        enumerable: false,
        configurable: true,
        writable: true
    };
    */
    descriptor.writable = false;
    return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

示例2
我们看下下面的例子:
修改属性描述对象的enumerable属性使得该属性不可遍历.
```js
class Person {
    @nonenumerable
    get kidCount() {
        return this.children.length
    }
}

// 定义装饰器
function nonenumerable(target, name, decriptor) {
    decriptor.enumerable = false;
    return decriptor
}
```


### **总结 getter setter: **
1. 我们通过装饰器给属性和方法进行装饰的时候 可以返回 装饰器对象 内部添加set get
```js
const clazzAttr = (clazzPrototype, prop, propDescriptor) => {
  return {
    ...propDescriptor,
    get() {
      return content
    },
    set(val) {
        prop = value
    }
  }
}
```

2. 如果我们想给类中的属性 添加 get set 可以将属性写成方法的形式 在其前面添加 get set 关键字
```js
class Person {
    // 定义test属性
    get test() {
        return ""
    }
}
```
同时这样我们在其上面添加装饰器 描述对象就会带有set get

https://wangdoc.com/es6/decorator.html#%E6%96%B9%E6%B3%95%E7%9A%84%E8%A3%85%E9%A5%B0
还有一些比较好玩的用法


https://baijiahao.baidu.com/s?id=1728347461413267454&wfr=spider&for=pc

<br>

# insertAdjacentHTML() 
将指定的文本解析为HTML或XML并将结果节点插入到DOM树中的指定位置
它不会重新解析它正在使用的元素因此它不会破坏元素内的现有元素
这避免了额外的序列化步骤使其比直接innerHTML操作更快.

### **<font color="#C2185">element.insertAdjacentHTML(position, text);: </font>**
position是相对于元素的位置并且必须是以下字符串之一: 

beforebegin:  元素自身的前面.
  afterend:     元素自身的后面.
  
  afterbegin:   插入元素内部的第一个子节点之前.
  beforeend:    插入元素内部的最后一个子节点之后.
  
<br>

# Window.matchMedia(mediaQueryString) 
eg:
"(max-width: 874px)"

可以直接使用 matchMedia() 方法

### **使用方式: **
let mqList = matchMedia(mediaQueryString)

### **<font color="#C2185">mqList.matches: </font>**
如果当前document匹配该媒体查询列表则其值为true;反之其值为false.*只读*


作用:
可以返回一个表示指定媒体查询字符串的已解析结果的新MediaQueryList对象
可被用于判定Document是否匹配媒体查询, 或者监控一个document 来判定它匹配了或者停止匹配了此媒体查询.

说白了就是:
视口满足 我们传入的 "(max-width: 874px)" 规则 那就返回true 否则就返回false

举例:
运行媒体查询(max-width: 600px)并在<span>;中显示MediaQueryList的matches属性值.
如果视口的宽度小于或等于600像素则输出将为true而如果窗口的宽度大于此宽度则将输出false.
```js
let mql = window.matchMedia('(max-width: 600px)');
document.querySelector(".mq-value").innerText = mql.matches;
```

<br>

# 焦点元素
### **<font color="#C2185">activeElement : </font>**
属性返回文档中当前获得焦点的元素

### **<font color="#C2185">document.activeElement.tagName;: </font>**
返回元素的标签名

### **<font color="#C2185">element.focus() : </font>**
为元素设置焦点

### **<font color="#C2185">document.hasFocus() : </font>**
查看当前元素是否获取焦点.

<br>

# 面向对象编程 - 后盾人
我们先看下函数式编程 求平均成绩
```js
let name = "Sam"
let grade = [
    {
        name: "js",
        score: 99
    },
    {
        name: "docker",
        score: 76
    }
]

function average(grade, name) {
    let total = grade.reduce((pre, item) => pre + item.score, 0)
    return `${name}: ${total / grade.length}`
}

console.log(average(grade, name))
```

上面我们将逻辑都暴露在全局 就会有函数名重复 覆盖等问题 也会让程序变得错综复杂

上面这些都是对用户的操作 我们可以把它们变成对象

我们可以将上面的逻辑放在对象中 对象中的属性可以存储不同的值
```js
let user = {
    name: "Sam",
    grade: [
        {
            name: "js",
            score: 99
        },
        {
            name: "docker",
            score: 76
        }
    ],

    // 这个函数就是方法 函数中需要的数据都在这个对象中 所以我们可以通过this来调用我们需要的属性 不用传递了
    average: function() {
        let total = this.grade.reduce((pre, item) => pre + item.score, 0)

        return `${this.name}: ${total / this.grade.length}`
    }
}

console.log(user.average())

-- 

let user = {
  name: "sam",
  grade: [
    {
      name: "js",
      score: 99
    },
    {
      name: "docker",
      score: 76
    }
  ],

  // get标识符
  get ave() {
    return this.grade.reduce((pre, item) => pre + item.score, 0)
  }
}

```


### **技巧1: **
有一个场景 下面的upload函数 里面有一个config属性 我们调用函数的时候要求传递进去一个配置对象

但要求是 如果我们只传递了type 那么只修改type 如果我们只传递了size 那么只修改size

```js
function upload(params) {
    let config = {
        type: ".jpeg",
        size: 10000
    }

    // 我们利用对象的展开语法 同名属性会被覆盖
    config = {...config, ...params}

    console.log(config)
    // {type: '.jpeg', size: 20000}
}

upload({size: 20000})

```


### **技巧2: **
情景: 
当用户没有传递必要的参数的时候 报错

```js
function oss(config) {
    if(!config.hasOwnProperty("host")) {
        throw new Error("必须设置主机地址")
    }
}

oss({user: "sam"})
```


### **技巧3: **
修改数组对象的结构

要点:
JSON.stringify(目标, 保留所有属性, 缩进2)

```js
const lessons = [
    {
        title: "媒体查询",
        category: "css"
    },
    {
        title: "Flex",
        category: "css"
    },
    {
        title: "Mysql",
        category: "mysel"
    },
]

// 我们要将上面的数组对象变为对象的形式 数组对象中的每一个对象元素作为value key为category的值就编号

let res = lessons.reduce((obj, item, index) => {
    obj[`${item["category"]} - ${index + 1}`] = item
    console.log(obj)
    return obj
}, {})

// JSON.stringify(目标, 保留所有属性, 缩进2)
console.log(JSON.stringify(res, null, 2))
```


### **对象浅拷贝的多种赋值方式: **
我们先回忆一下对象的深浅拷贝
浅拷贝指的是: 目标对象中有1层数据格式
深拷贝指的是: 目标对象中有2层数据格式


### **浅拷贝方式1: 循环赋值: **
该方式适合将数据进行修改
```js
let hd = {name: "sam", url: "www.baidu.com"}

let obj = {}
// 当对象中的属性 没有深层次的结构的时候 这样也属于深拷贝
for (const key in hd) {
    obj[key] = hd[key]
}
```

### **浅拷贝方式2: 对象的结构赋值: **
```js
// 方式2 把hd中的值压入到了新对象中
let obj = Object.assign({}, hd)
```

### **浅拷贝方式3: 扩展运算符: **
```js
// {} 相当于新开辟了一块空间
let obj = {...hd}
```

<br>

### **对象的深拷贝: **
### **情景1 对象中只有对象的情况: **
```js
let obj = {
  name: "sam",
  user: {
    name: "erin"
  }
}


// 深拷贝的实现思路就是一层一层的处理
// 递归
function deepCopy(obj) {

  let temp = {}

  for(let key in obj) {
    temp[key] = typeof obj[key] == "object" ? deepCopy(obj[key]) : obj[key]
  }

  return temp
}

let ret = deepCopy(obj)
console.log(ret)
```


### **情景2: 对象中还有数组的情况: **
数据情况:
```js
let obj = {
    name: "sam",
    user: {
        name: "erin"
    },
    arr: []
}
```

要点:
1. 判断是对象还是数组 我们可以使用 instanceof 来进行判断
```js
{} instanceof Object  // true
[] instanceof Array   // true
```

2. 我们将对象内部的元素 是数组也好 还是对象也好 都转成对数组的操作方式

我们先看看下面的预习部分
```js
// 我们看看原始数据 使用Object.entries()方法后的样式
let obj = {
    name: "sam",
    user: {
        name: "erin"
    },
    arr: []
}

-- 

console.log(JSON.stringify(Object.entries(obj), null, 2))
[
  [
    "name",
    "sam"
  ],
  [
    "user",
    {
      "name": "erin"
    }
  ],
  [
    "arr",
    []
  ]
]
```
我们发现 原本的对象数组变成了二维数组 Object.entries() 将一个对象的
key: value
["key", value]

比如 原始数据中的 user
["user", {name: "erin"}]

上面我们实现了不管原始数据中是对象也好 还是数组也好都转成 对数组的处理方式

```js
function deepCopy(obj) {

  // 判断参数的类型 是对象还是数组 因为是递归调用 所以后序还会传递参数进行再次判断
  // 进行 对象 或 数组 的初始化
  let temp = obj instanceof Array ? [] : {}
  console.log("temp", temp)
  /*
    let [key, value] of Object.entries(obj)
    我们获取的 key value 
      1. 当普通值的时候
        [name, sam]

      2. 当为对象的时候
        [user, {name: "erin"}]

      3. 当为数组的时候 是 [索引 + 值] 我们遍历获取的就是 [0, 1]
        [[0, 1], [1, 2], [2, 3]]
  */

  for(let [key, value] of Object.entries(obj)) {
    console.log("key", key)
    console.log("value", value)

    // 每次都会监测 value 的类型 如果是 对象 则递归调用 数组和对象使用 typeof 检查都是对象
    // 当 value 为引用类型的值时递归调用 再次进入逻辑 temp 就是一个 []

    // value: [1, 2, 3] 会被 Object.entries 进行处理 得到 [[0, 1], [1, 2], [2, 3]]
    // 然后 从而获取 [key, value] = [index, value]
    // 然后我们往 temp[key] == temp[index] 相当于往 temp数组中的0位置添加1
    temp[key] = typeof value == "object" ? deepCopy(value) : value
  }

  return temp
}

let ret = deepCopy(obj)
console.log("ret", ret)
```


### **技巧3: 闭包的特性也可以用来体现函数的封装性: **
比如我们创建了下面的构造函数 但是发现 构造函数的外部是可以通过 user对象修改里面的属性的

有的时候我们希望的是我们只向外暴露功能 并不希望它能够修改我们对象中的属性

```js
function User(name, age) {
    this.name = name
    this.age = age

    this.show = function() {
        console.log(this.name)
    }

    this.info = function() {
        return this.age > 50 ? this.name + "老年人" : this.name + "年轻人"
    }
}

let user = new User("Sam", 33)
// 这时候在函数外部是可以
user.name = "erin"
user.show()
```

我们可以利用闭包的方式来解决问题
```js
function User(name, age) {

    let data = {name, age}

    let info = function() {
        return age > 50 ? name + "老年人" : name + "年轻人"
    }

    this.show = function() {
        console.log(data.name + info())
    }
}
```


### **对象的访问器: **
使用场景: 
现在我们有一个对象
```js
const user = {
    name: "sam"
    age: 18
}
```

上面这个对象中的年龄我在外面可以随便的改 我们可以在对象的外部 user.age = 进行随意的复制操作

那这个数据很容易变的不稳定

那怎么做呢
方式1:
```js
const user = {
    data: {name: "sam", age: 18},
    setAge(value) {
        if(typeof value != "number" || value < 10 || value > 100) {
            throw new Error("年龄格式不匹配")
        }
    },
    getAge() {

    }
}
```

上面方式有一个不好的地方 就是我们在给属性赋值的时候 需要调用的是 user.setAge(999) 方法

那我们能不能直接通过 user.age = 999 的方式给对象设置属性呢？

这时候我们就可以使用访问器 将属性写成计算属性函数的样式 前面用关键字set来修饰

### **set 属性() { ... }: **
### **get 属性() { ... }: **
对象中的属性 通过这种方式设置的时候 当我们通过
obj.属性 = 赋值的时候 就会触发回调中的逻辑

```js
const user = {
    data: {name: "sam", age: 18},
    set age(value) {
        if(typeof value != "number" || value < 10 || value > 100) {
            throw new Error("年龄格式不匹配")
        }

        this.data.age = value
    },
    get age() {
        return "abc"
        return this.data.age
    }
}
```

这时候我们可以还通过 user.age = 999 的方式赋值


### **访问器的应用 -- 计算属性: **
我们希望 我们调用对象中的属性就能获取到总价格

```js
let lesson = {
    lists: [
        {name: "js", price: 100},
        {name: "mysql", price: 212},
        {name: "vue", price: 99},
    ],
    get total() {
        return this.lists.reduce((pre, item) => {
            return pre + item.price
        }, 0)
    }
}

console.log(lesson.total)
```


### **访问器的应用 - 批量设置属性 -- 骚操作: **
下面有这样的一个对象
```js
const web = {
  protocol: "https",
  host: "www.baidu.com",
}
```

如果我们要设置里面的属性的话 都是
web.name = ""
web.url = ""

那有没有一种方法 web.site = "erin, www.taobao.com"
当我们这么设置的时候 可以一次搞定 name url 的赋值操作呢?

可以 我们可以通过访问器
```js
const web = {
  protocol: "https",
  host: "www.baidu.com",

  get site() {
    return this.protocol + "://" + this.host
  },

  set site(val) {
    [this.protocol, this.host] = val.split("://")
  }
}

web.site = "http://taobao.com"
console.log(web.protocol)
console.log(web.host)
```


### **访问器的应用 -- token的读写处理: **
我们从后台获取的token需要存在本地 我们会使用到本地存储
```js
let Request = {
    set token(content) {
        localStorage.setItem("token", content)
    },
    get token() {
        let token = localStorage.getItem("token", content)

        if(!token) {
            // 跳转到登录页面的操作
        }

        return token
    }
}

// 当我们调用token属性的时候 就会触发保存到本地存储的逻辑
Requset.token = "293423g5jghj342g5jhghj"
```

<br><br>---

# 对象代理 proxy
访问器只是对单个属性的控制 对象代理是对整个对象进行控制
我们不是直接操作数据 而是通过代理来操作数据

我们先定义一个数据
```js
const hd = {name: "sam"}
```

### **<font color="#C2185">let proxy = new Proxy(目标对象, [配置对象]): </font>**
代理后 可以通过 proxy 操作原对象
相当于proxy就是原对象


### **参数1: 目标对象: **
对哪个对象进行代理

### **参数2: 配置对象: **
可以传空
或者传递具体的配置
```js
// config
{
  get(target, propName) { ... },
  set(target, propName, value) { ... },
  deleteProperty(target, propName) { ... }
}
```

### **<font color="#C2185">get(target, prop) { return obj[prop] }: </font>**
该函数在有人 读取了代理对象中的属性的时候 会被调用
  target: 源对象
  propName: 被读取的属性值


### **<font color="#C2185">set(target, prop, value) { obj[prop] = value }: </font>**
该函数在有人 修改 和 往target中追加属性的时候 会被调用
  target: 源对象
  propName: 被读取的属性值
  value: 被修改后的值


### **<font color="#C2185">deleteProperty(target, propName) { ... }: </font>**
该函数在有人 删除了target中的属性的时候 会被调用


```js
const flag = " -- "

const obj = {
  name: "sam",
  age: 18,
  job: {
    front: "js",
    backend: "java"
  }
}


let proxy = new Proxy(obj, {
  get(target, propName) {
    return target[propName] + flag + "!"
  },

  set(target, propName, val) {
    target[propName] = val

    // 在严格模式中要返回true
    return true
  }
})

console.log(proxy.name)
proxy.name = "erin"
console.log(proxy.name)

```

**注意:**
1. 严格模式中 我们需要在set方法中return true 不然会报错
2. 配置对象是必须要传递的


### **对函数的代理: **
代理后proxy就是原函数 以前我们是通过 fn() 调用函数
代理后 proxy() 调用函数

### **<font color="#C2185">new Proxy(函数名, [配置对象]): </font>**

### **参数2: **
配置对象里需要传递 apply(fn, obj, args)
```js
// 配置对象
{
    apply(fn, obj, args) {

    }
}


// 示例:
let proxy = new Proxy(info, {
  apply(fn, obj, args) {
    
    fn: 就是被代理的函数
    obj: 可以通过 proxy.apply(obj, params)
    args: 可以通过 proxy.apply(obj, params)
  }
})
```

fn: 
    就是代理的函数

obj 
    就是上下文对象相当于this 我们可以通过 proxy.apply() 的方法传入this指向的对象

args 就是传递进来的实参 
    - args是数组
    - proxy.apply({}, [参数])
    - 使用apply()方法传递参数的时候 *要把参数放在数组中*


示例:
```js
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1)
}


// 使用代理来调用对象
let proxy = new Proxy(factorial, {

  // 当调用proxy()的时候 会执行里面的逻辑
  apply(fn, obj, args) {
    console.log(fn)   // 被代理的函数
    console.log(obj)  // 我们传递的是this 那么obj就是window
    console.log(args) // 参数会在数组中
  }
})


// 如果我们传递一个 {} 的配置对象 可以普通调用
proxy(5)

// 如果我们传递了 配置对象 则需要这样调用
// 使用apply调用 并传递上下文对象 和 数组传参
proxy.apply(this, [5])
```


### **举例1: **
计算函数的运行时间
```js
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1)
}

console.log(factorial(5)) 

let proxy = new Proxy(factorial, {
  
  apply(fn, obj, args) {
    
    console.time("run")

    // 将收到的参数传递到原函数中
    fn.apply(this, args);

    console.timeEnd("run")
  }
})

proxy.apply({}, [5])
```


### **代理对数组的控制: **
需求:
通过代理对原数组进行加工 如果数组对象中的对象的title的长度大于5进行截断处理

也就是对数组的拦截处理

### **<font color="#C2185">new Proxy(数组, 配置对象): </font>**
代理数组后 proxy就是数组 可以通过 proxy[0] 的方式访问原数组中的元素

### **参数2: **
get(arr, index)
arr就是原数组 index就是proxy[0]对应的索引值

好像没有set


```js
let lessons = [
  {
    title: "媒体查询知多少",
    category: "css"
  },
  {
    title: "FLEX",
    category: "css"
  },
  {
    title: "MYSQL",
    category: "mysql"
  },
]

// 当获取元素的时候我们对title的长度进行截断处理
let proxy = new Proxy(lessons, {
  get(arr, key) {
    const title = arr[key].title
    const len = 5
    
    arr[key].title = title.length > len 
      ? title.substr(0, len) + ".".repeat(3) 
      : title

    return arr[key]
  }
})
console.log(proxy[0])
```


### **通过代理实现双向绑定: **
```html
<input type="text" v-model="title" />
<input type="text" v-model="title" />

<h4 v-bind="title">这里也会发生更新</h4>
```
```js
function View() {
    // 创建代理 {}里面用来存放 公共数据 相当于 data
    let proxy = new Proxy({}, {
        get(obj, prop) {

        },
        set(obj, prop, value) {
            document.querySelectAll(`[v-model="${prop}"]`).forEach(item => {
                item.value = value
            })
        }
    })

    // 绑定事件
    this.init = function() {
        const els = document.querySelectorAll("[v-model]")

        els.forEach(item => {
            item.addEventListener("keyup", function() {
                proxy[this.getAttribute("v-model")] = this.value
            })
        })
    }
}

new View().init()
```


### **代理处理表单验证: **
```js
// 工具类
class Validate {
  // 检查value是否超过最大长度
  max(value, len) {
    return value.length < len
  }

  // 检查value是否超过最小长度
  min(value, len) {
    return value.length > len
  }

  isNumber(value) {
    return /^\d+$/.test(value)
  }
}

// 创建代理工厂 将对象加工成代理对象
function ProxyFactory(target) {
  return new Proxy(target, {
    get(target, key) {
      return target[key]
    },

    // 键盘抬起的时候就会触发set方法
    set(target, key, value) {
       // value就是this 因为外面 proxy[i] = this 代表每一个表单
       // 获取表单元素上的规则
       const rule = el.getAttribute("rule")

       // 创建验证类
       const validate = new Validate()

       let state = rule.split(",").every(rule => {

          // 第一个参数是验证类中的函数 二个函数的参数
          // info ["max", "12"]
          const info = rule.split(":")

          // value是表单元素 就是this 就是input
          return validate[info[0]](value.value, info[1])
       })
       console.log(state)
    }
  })
}

// 对NodeList进行了代理
let proxy = ProxyFactory(document.querySelectorAll("[validate]"))

// 当表单触发键盘抬起事件的时候触发表单验证处理
proxy.forEach((item,i) => {
  console.log(item)
  item.addEventListener("keyup", function() {
    // 这相当于set的第三个参数就是this
    proxy[i] = this
  })
})
```

<br>

### **<font color="#C2185">Reflect.get(想从哪个对象上获取属性, '获取什么属性'): </font>**
### **<font color="#C2185">Reflect.set(想从哪个对象上修改属性, '修改什么属性', '修改为什么值'): </font>**
### **<font color="#C2185">Reflect.deleteProperty(想从哪个对象上删除属性, '删除什么属性'): </font>**
也就是说 我们对 对象的增删改查还可以通过这个api

<br><br>

# JSON
### **<font color="#C2185">JSON.stringify(目标对象, 参数2, 参数3): </font>**
参数2:
数组字符串 ["属性名"]
代表要保留的属性 可以传递多个
传递null 代表全部保留

```js
let hd = {
    title: "sam"
    url: "www.baidu.com",
    teacher: {
        name: "erin"
    }
}

JSON.stringify(hd, ["title"])
// {"title": "sam"}
```

参数2:
制表符缩进


### **自定义json返回: **
我们需要在目标对象里面设置 *toJSON: function() { return }* 方法
```js
let hd = {
    title: "sam"
    url: "www.baidu.com",
    teacher: {
        name: "erin"
    },

    // 设置toJSON方法
    toJSON: function() {
        return {
            title: this.title
        }
    }
}

let json = JSON.stringify(hd)
```


### **<font color="#C2185">JSON.parse(目标对象, callback): </font>**
参数2
当我们想对返回得JSON对象的格式进行处理的时候 可以传递一个回调
```js
let hd = {
    title: "sam"
    url: "www.baidu.com",
    teacher: {
        name: "erin"
    }
}


let obj = JSON.parse(hd, (key, value) => {
    if(key == "sam") {
        value = "[加油] - " + value
    }
})
```

<br>

# 执行上下文
```js
// 情况1:
console.log(a)  // a is not defined

// 情况2:
console.log(a)  // undefined
var a

// 情况3:
console.log(a)  // undefined
var a = 10
```

上面我们发现:
第一句:
    报错 a未定义

第二句:
第三局:
    输出都是undefined

说明浏览器在执行console.log(a)时已经知道了a是undefined但却不知道a是10

其实, 在一段js代码拿过来真正一句一句运行之前浏览器已经做了一些“准备工作”

其中就包括对变量的声明(而不是赋值)
变量赋值是在赋值语句执行的时候进行的

比如 我们在 console.log(this) 的时候 都会知道无论在哪个位置获取this都是有值的

上面说的是属性的问题
下面我们看看函数的两种情况
```js
// 情况1
console.log(fn1)    // 能输出整个函数
function fn1() {
    console.log("fn1")
}


// 情况2
console.log(fn1)    // undefined
var fn2 = function() {
    console.log("fn2")
}

// 情况2 相当于
var fn2;
console.log(fn2)
fn2 = function() {
    console.log("fn2")
}
```

在“准备工作”中对待函数表达式就像对待“ var a = 10 ”这样的变量一样只是声明.

对待函数声明时却把函数整个赋值了.

### **“准备工作”中完成了哪些工作: **
1. 变量、函数表达式——变量声明默认赋值为undefined
2. this——赋值
3. 函数声明——赋值

这三种数据的准备情况我们称之为“执行上下文”或者“执行上下文环境”.

javascript在执行一个代码段之前都会进行这些“准备工作”来生成执行上下文.

这个“代码段”其实分三种情况——全局代码函数体eval代码.


如果在函数中除了以上数据之外还会有其他数据.
```js
function fn(x) {
    console.log(arguments) // [10]
    console.log(x) // 10
}
fn(10)
```

以上代码展示了在函数体的语句执行之前arguments变量和函数的参数都已经被赋值.

从这里可以看出*函数每被调用一次都会产生一个新的执行上下文环境*.因为不同的调用可能就会有不同的参数.

外一点不同在于*函数在定义的时候(不是调用的时候)就已经确定了函数体内部自由变量的作用域.*
<!-- 至于“自由变量”和“作用域”是后面要专门拿出来讲述的重点这里就先点到为止.用一个例子说明一下:  -->

```js
var a = 10
function fn() {
    console.log(a)
    // a是自由变量 函数创建的时候 就确定了a要取值的作用域
}


function bar(f) {
    var a = 20;
    f() // 打印的是10 而不是20
}
bar(fn)
```


### **结合作用域 上下文环境 我们看看下面的知识点: **
```js
var a = 10, b = 20              // 全局作用域

function fn(x) {
    var a = 100, c = 300;       // fn的作用域

    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }

    bar(100)
    bar(200)
}

fn(10)
```

我们在上文中已经介绍了除了全局作用域之外每个函数都会创建自己的作用域
*作用域在函数定义时就已经确定了.而不是在函数调用时确定.*

我们看看结合作用域 上下文环境是怎么样的
1. 在加载程序时已经确定了全局上下文环境并随着程序的执行而对变量就行赋值.
```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }



    bar(100)
    bar(200)
}

fn(10)
```

当我们程序执行到 fn(10) 调用的时候 此时生成fn函数的上下文环境压栈并将此上下文环境设置为活动状态.
```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域

            fn(10)上下文环境
            x       10
            a       100
            c       300



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }



    bar(100)
    bar(200)
}

fn(10)
```


当程序执行到bar(100)的时候 调用bar(100) 生成此次bar函数的上下文环境 压栈并设置为活动状态

```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域

            fn(10)上下文环境
            x       10
            a       100
            c       300



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域

            bar(100)上下文环境
            x       100
            a       1000
            d       3000
    }



    bar(100)
    bar(200)
}

fn(10)
```

当执行完bar(100)这行代码 bar(100)调用完成 *则bar(100)上下文环境被销毁* 

接着执行bar(200)调用bar(200)则又生成bar(200)的上下文环境压栈设置为活动状态.

当执行完bar(200)这行代码 则bar(200)调用结束 其上下文环境被销毁 此时就会回到fn(10)上下文环境中 变为活动状态
<!-- 
    bar(200)     ->  上下文环境
    bar(100)     ->  上下文环境
    fn(10)       ->  上下文环境

    当bar(200) bar(100)都调用完毕后 其上下文环境销毁
    只剩下fn(10)处于激活状态
 -->

当执行完fn(10)这行代码后 fn(10)执行完成之后 fn(10)上下文环境被销毁 全局上下文环境又回到了活动状态

连接起来看还是挺有意思的.作用域只是一个“地盘”一个抽象的概念其中没有变量.要通过作用域对应的执行上下文环境来获取变量的值.同一个作用域下不同的调用会产生不同的执行上下文环境继而产生不同的变量的值.所以作用域中变量的值是在执行过程中产生的确定的而作用域却是在函数创建时就确定了.

所以如果要查找一个作用域下某个变量的值就需要找到这个作用域对应的执行上下文环境再在其中寻找变量的值.

<br>

# ArrayBuffer对象
ArrayBuffer 对象表示一段二进制数据用来模拟内存里面的数据.
可以通过'视图'进行操作(TypedArray, DataView), 视图内部署了数组的接口 这意味着可以用数组的方法操作内存
也就是说它不能直接读写 只能通过视图才操作 视图的作用是以指定的格式解读二进制数据

它是以数组的语法处理二进制数据 所以统称为二进制数组
<!-- 
    ArrayBuffer对象
        TypedArray视图
        DataView视图

    它们是操作二进制数据的一个接口
 -->

上述接口出现原因:
为了满足js与显卡之间大量的数据实时交换 它们之间的数据必须是二进制的 而不能是传统的文本格式
文本格式传递一个32位整数 两端的js脚本和显卡都要进行格式化的转化 将非常的耗时
所以我们需要一个能够直接操作字节 将4个字节的32位整数 以二进制形式原封不动地送入显卡


### **TypedArray 和 DataView 视图支持的数据类型: **
一共9种(DataView视图支持除Uint8C以外的其他 8 种)
<!-- 
    数据类型	字节长度	含义	                对应的 C 语言类型
    Int8	    1	    8 位带符号整数	                signed char
    Uint8	    1	    8 位不带符号整数	            unsigned char
    Uint8C	    1	    8 位不带符号整数(自动过滤溢出)    unsigned char       -- DataView不支持
    Int16	    2	    16 位带符号整数	                short
    Uint16	    2	    16 位不带符号整数	            unsigned short
    Int32	    4	    32 位带符号整数	                int
    Uint32	    4	    32 位不带符号的整数	             unsigned int
    Float32	    4	    32 位浮点数	                   float
    Float64	    8	    64 位浮点数	                   double
 -->


### **<font color="#C2185">ArrayBuffer实例化: </font>**
### **<font color="#C2185">let buf = new ArrayBuffer(整数): </font>**
作用
用来分配一段可以存放数据的连续内存区域(表示这段二进制数据占用多少字节)

默认值:
每一个字节的默认值是0

参数
整数 

```js
let buf = new ArrayBuffer(8)

// 结果:  buf占用了8个字节
byteLength: 8
[[Prototype]]: ArrayBuffer
[[Int8Array]]: Int8Array(8)
[[Uint8Array]]: Uint8Array(8)
[[Int16Array]]: Int16Array(4)
[[Int32Array]]: Int32Array(2)
[[ArrayBufferByteLength]]: 8
[[ArrayBufferData]]: 2
```

### **<font color="#C2185">buf.byteLenth: </font>**
表示当前实例占用的内存长度(字节)


### **<font color="#C2185">buf.slice(startIndex, endIndex): </font>**
用来*复制*一部分内存
拷贝生成一个新的ArrayBuffer对象.

包括开始不包括结束
如果省略第二个参数 则表示一直复制到结束
```js
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);
```

### **<font color="#C2185">buf.isView(): </font>**
ArrayBuffer有一个静态方法isView返回一个布尔值表示参数是否为ArrayBuffer的视图实例.这个方法大致相当于判断参数是否为TypedArray实例或DataView实例.
```js
const buffer = new ArrayBuffer(8);
ArrayBuffer.isView(buffer) // false

const v = new Int32Array(buffer);
ArrayBuffer.isView(v) // true
```

<br>

### **<font color="#C2185">视图: </font>**
我们创建buf对象后 通过视图构造器将buf转换为我们可以操作的数组 
接下来就是以数组的形式操作二进制buf

ArrayBuffer对象作为内存区域可以存放多种类型的数据.
同一段内存不同数据有不同的解读方式这就叫做“视图”(view).

ArrayBuffer有两种视图
1. TypedArray视图 - 同类型数据
2. DataView视图   - 可以是不同类型数据

前者的数组成员都是同一个数据类型后者的数组成员可以是不同的数据类型.

目前TypedArray视图一共包括 9 种类型每一种视图都是一种构造函数.

```js
Int8Array:          08 位有符号整数      长度 1 个字节.
Uint8Array:         08 位无符号整数      长度 1 个字节.
Uint8ClampedArray:  08 位无符号整数      长度 1 个字节溢出处理不同.
Int16Array:         16 位有符号整数      长度 2 个字节.
Uint16Array:        16 位无符号整数      长度 2 个字节.
Int32Array:         32 位有符号整数      长度 4 个字节.
Uint32Array:        32 位无符号整数      长度 4 个字节.
Float32Array:       32 位浮点数         长度 4 个字节.
Float64Array:       64 位浮点数         长度 8 个字节.
```

特点:
这 9 个构造函数生成的数组统称为TypedArray视图.
它们很像普通数组都有length属性都能用方括号运算符([])获取单个元素所有数组的方法在它们上面都能使用.

与普通数组的区别:
1. TypedArray 数组的所有成员都是同一种类型.
2. TypedArray 数组的成员是连续的不会有空位.
3. TypedArray 数组成员的默认值为 0.比如new Array(10)返回一个普通数组里面没有任何成员只是 10 个空位;new Uint8Array(10)返回一个 TypedArray 数组里面 10 个成员都是 0.

4. TypedArray *数组只是一层视图本身不储存数据*它的数据都储存在底层的ArrayBuffer对象之中要获取底层对象必须使用buffer属性.


### **DataView视图: **
### **<font color="#C2185">new DataView(buf): </font>**
DataView视图用来操作ArrayBuffer对象
当创建好ArrayBuffer独享之后 需要为该buf对选哪个指定视图
```js
const buf = new ArrayBuffer(32)
const dataView = new DataView(buf)

// 以不带符号的8位整数格式 从头读取8位二进制数据 得到0
dataView.getUint8(0)    // 0
```


### **TypedArray视图: **
该视图与DataView视图的区别 TypedArray不是一个构造函数 而是一组构造函数 代表不同的数据格式
```js
const buf = new ArrayBuffer(32)

const x1 = new Int32Array(buffer);
x1[0] = 1;


const x2 = new Uint8Array(buffer);
x2[0]  = 2;

x1[0] // 2
```
上面代码对同一段内存分别建立两种视图: 32 位带符号整数(Int32Array构造函数)和 8 位不带符号整数(Uint8Array构造函数).由于两个视图对应的是同一段内存一个视图修改底层内存会影响到另一个视图.

TypedArray视图的构造函数除了接受ArrayBuffer实例作为参数还可以接受普通数组作为参数直接分配内存生成底层的ArrayBuffer实例并同时完成对这段内存的赋值.

```js
const typedArray = new Uint8Array([0,1,2]);
typedArray.length // 3

typedArray[0] = 5;
typedArray // [5, 1, 2]
```

上面代码使用TypedArray视图的Uint8Array构造函数新建一个不带符号的 8 位整数视图.可以看到Uint8Array直接使用普通数组作为参数对底层内存的赋值同时完成.


### **二进制数组的应用: **
大量的 Web API 用到了ArrayBuffer对象和它的视图对象.

### **1. AJAX: **
传统上服务器通过 AJAX 操作只能返回文本数据即responseType属性默认为text.
XMLHttpRequest第二版XHR2允许服务器返回二进制数据这时分成两种情况.

    - 1. 如果明确知道返回的二进制数据类型可以把返回类型(responseType)设为arraybuffer;

    - 2. 如果不知道就设为blob.

```js
let xhr = new XMLHttpRequest();
xhr.open('GET', someUrl);
xhr.responseType = 'arraybuffer';

xhr.onload = function () {
  let arrayBuffer = xhr.response;
  // ···
};

xhr.send();
```

如果知道传回来的是 32 位整数可以像下面这样处理.
```js
xhr.onreadystatechange = function () {
  if (req.readyState === 4 ) {
    const arrayResponse = xhr.response;
    const dataView = new DataView(arrayResponse);
    const ints = new Uint32Array(dataView.byteLength / 4);

    xhrDiv.style.backgroundColor = "#00FF00";
    xhrDiv.innerText = "Array is " + ints.length + "uints long";
  }
}
```


### **2. File API: **
如果知道一个文件的二进制数据类型也可以将这个文件读取为ArrayBuffer对象.
```js
// 获取节点 并获取文件 
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

// 使用reader读成2进制数据
const reader = new FileReader();
reader.readAsArrayBuffer(file);

// 不光能从e.target上获取 也可以直接从this.result reader.result上获取
reader.onload = function () {
  const arrayBuffer = reader.result;
  // ···
};
```

下面以处理 bmp 文件为例.假定file变量是一个指向 bmp 文件的文件对象首先读取文件.
```js
const reader = new FileReader();
reader.addEventListener("load", processimage, false);
reader.readAsArrayBuffer(file);
```

然后定义处理图像的回调函数: 
1. 先在二进制数据之上建立一个DataView视图
2. 再建立一个bitmap对象用于存放处理后的数据最后将图像展示在Canvas元素之中.
```js
function processimage(e) {
  const buffer = e.target.result;
  const datav = new DataView(buffer);
  const bitmap = {};
  // 具体的处理步骤
}
```
https://www.wangdoc.com/es6/arraybuffer.html
太多了 没看完 我觉得自己用不到呢

<br>

# Blob对象
Blob 对象表示一个二进制文件的数据内容比如一个图片文件的内容就可以通过 Blob 对象读写.
它通常用来读写文件它的名字是 Binary Large Object (二进制大型对象)的缩写.

Blob对象 与 ArrayBuffer 的区别在于:
Blob对象 用于操作二进制文件
ArrayBuffer 用于操作内存.

### **Blob对象的实例化: **
### **<font color="#C2185">new Blob(array [, options]): </font>**
参数
1. *数组*
成员是*字符串*或*二进制对象*表示新生成的Blob实例对象的内容

2. 配置对象
参数类型是对象 
    type: 类型字符串 表示数据的 MIME 类型默认是空字符串
    endings: 
        - transparent: 代表会保持 blob 中保存的结束符不变 
        - native: 结束符会被更改为适合宿主操作系统文件系统的换行符
```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});
        // Blob {size: 43, type: 'text/html'}
```

```js
// 对象的话 我们要先序列化 然后装到数组里面作为参数
var obj = { hello: 'world' };
var blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
```

### **<font color="#C2185">实例对象.size: </font>**
### **<font color="#C2185">实例对象.type: </font>**
分别返回数据的大小和类型.
```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});

myBlob.size // 32
myBlob.type // "text/html"
```

### **<font color="#C2185">实例对象.slice(start, end, contentType): </font>**
用来拷贝原来的数据返回的也是一个Blob实例.

参数: 三个参数都是可选的.
contentType : 新实例的数据类型(默认为空字符串).


### **获取文件信息: **
文件选择器<input type="file">用来让用户选取文件
出于安全考虑浏览器不允许脚本自行设置这个控件的value属性即文件必须是用户手动选取的不能是脚本指定的 一旦用户选好了文件脚本就可以读取这个文件.

文件选择器返回一个 FileList 对象该对象是一个类似数组的成员每个成员都是一个 File 实例对象 (inp.files)

File 实例对象是一个特殊的 Blob 实例增加了name和lastModifiedDate属性.
```js
// HTML 代码如下
<input 
    type="file" 
    accept="image/*" 
    multiple 
    onchange="fileinfo(this.files)"
/>

function fileinfo(files) {
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    console.log(
      f.name, // 文件名不含路径
      f.size, // 文件大小Blob 实例属性
      f.type, // 文件类型Blob 实例属性
      f.lastModifiedDate // 文件的最后修改时间
    );
  }
}
```


### **下载文件: **
AJAX 请求时如果指定 responseType属性为blob下载下来的就是一个 Blob 对象
比如:
然后我们可以通过URL.createObjectURL 方法将blob对象转成一个url对象 给有src href属性的 

```js
    function download(url) {
        const xhr = new XMLHttpRequest()
        xhr.open("get", url)
        xhr.responseType = "blob"
        xhr.send()
        xhr.onload = function() {
            const fileBlob = xhr.response
            let imgUrl = URL.createObjectURL(fileBlob)

            let a = document.createElement("a")
            a.href = imgUrl
            a.download = "testImg"
            a.innerHTML = "hello"
            document.querySelector("body").appendChild(a)
        }
    }
    let url = "https://img1.baidu.com/it/u=2648389307,756086504&fm=26&fmt=auto"
    download(url)
```


```js
function getBlob(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    callback(xhr.response);
  }
  xhr.send(null);
}

// 上面代码中xhr.response拿到的就是一个 Blob 对象.
```


### **生成 URL -- URL.createObjectURL(): **
浏览器允许使用 URL.createObjectURL() 方法针对 *Blob* 对象生成一个临时 URL以便于某些 API 使用

这个 URL 以blob://开头表明对应一个 Blob 对象协议头后面是一个识别符用来唯一对应内存里面的 Blob 对象.

<br>

**参数:**  
Blob || MediaSource || File

```js
var droptarget = document.getElementById('droptarget');

droptarget.ondrop = function (e) {
  var files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    var type = files[i].type;
    if (type.substring(0,6) !== 'image/')
      continue;

    var img = document.createElement('img');

    // 将文件对象转成url 方便其他地方使用
    img.src = URL.createObjectURL(files[i]);

    img.onload = function () {
      this.width = 100;
      document.body.appendChild(this);
      URL.revokeObjectURL(this.src);
    }
  }
}
```

上面代码通过为拖放的图片文件生成一个 URL产生它们的缩略图从而使得用户可以预览选择的文件.

浏览器处理 Blob URL 就跟普通的 URL 一样如果 Blob 对象不存在返回404状态码;如果跨域请求返回403状态码.Blob URL 只对 GET 请求有效如果请求成功返回200状态码.由于 Blob URL 就是普通 URL因此可以下载.


### **读取文件: **
取得 Blob 对象以后可以通过FileReader对象读取 Blob 对象的内容即文件内容.

<br><br>---

# FileReader

### **FileReader实例化: **
```js
let reader = new FileReader()
```

FileReader 对象提供四个方法*处理 Blob 对象*
Blob 对象作为参数传入这些方法然后以指定的格式返回.

### **<font color="#C2185">FileReader.readAsText(目标): : </font>**
返回文本需要指定文本编码默认为 UTF-8.

### **<font color="#C2185">FileReader.readAsArrayBuffer(目标): : </font>**
返回 ArrayBuffer 对象.

### **<font color="#C2185">FileReader.readAsDataURL(目标): : </font>**
返回 Data URL.

### **<font color="#C2185">FileReader.readAsBinaryString(目标): : </font>**
返回原始的二进制字符串.


### **例子: **
FileReader.readAsText()方法的例子用来读取文本文件.

```js
// HTML 代码如下
<input type="file" onchange="readfile(this.files[0])"></input>
<pre id="output"></pre>

function readfile(f) {
  var reader = new FileReader();
  reader.readAsText(f);

  reader.onload = function () {
    var text = reader.result;

    var out = document.getElementById('output');
    out.innerHTML = '';
    out.appendChild(document.createTextNode(text));

  }
  reader.onerror = function(e) {
    console.log('Error', e);
  };
}
```

上面代码中通过指定 FileReader 实例对象的onload监听函数在实例的result属性上拿到文件内容.


### **例子: **
FileReader.readAsArrayBuffer()方法的例子用于读取二进制文件.

```js
// HTML 代码如下
<input type="file" onchange="typefile(this.files[0])"></input>


function typefile(file) {
  // 文件开头的四个字节生成一个 Blob 对象
  var slice = file.slice(0, 4);
  var reader = new FileReader();

  // 读取这四个字节
  reader.readAsArrayBuffer(slice);

  reader.onload = function (e) {
    var buffer = reader.result;

    // 将这四个字节的内容视作一个32位整数
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);

    // 根据文件的前四个字节判断它的类型
    switch(magic) {
      case 0x89504E47: file.verified_type = 'image/png'; break;
      case 0x47494638: file.verified_type = 'image/gif'; break;
      case 0x25504446: file.verified_type = 'application/pdf'; break;
      case 0x504b0304: file.verified_type = 'application/zip'; break;
    }

    console.log(file.name, file.verified_type);
  };
}
```

读取的结构要在 onload的回调里面 通过this / reader / e.target 上的result属性身上获取

<br>

# URL
网页的 URL 只能包含合法的字符.合法字符分成两类.
URL 元字符: 
分号(;)逗号(,)斜杠(/)问号(?)冒号(:)at(@)&等号(=)加号(+)美元符号($)井号(#)


语义字符: 
a-zA-Z0-9连词号(-)下划线(_)点(.)感叹号(!)波浪线(~)星号(*)单引号(')圆括号(())

除了以上字符其他字符出现在 URL 之中都必须转义规则是根据操作系统的默认编码将每个字节转为百分号(%)加上两个大写的十六进制字母.

JavaScript 提供四个 URL 的编码/解码方法.

<!-- 
  比如UTF-8 的操作系统上http://www.example.com/q=春节这个 URL 之中汉字“春节”不是 URL 的合法字符所以被浏览器自动转成

  http://www.example.com/q=%E6%98%A5%E8%8A%82.其中“春”转成了%E6%98%A5“节”转成了%E8%8A%82.这是因为“春”和“节”的 UTF-8 编码分别是E6 98 A5和E8 8A 82将每个字节前面加上百分号就构成了 URL 编码.
 -->

### **编码: **
### **<font color="#C2185">encodeURI("url字符串"): </font>**
用于转码整个 URL.
它的参数是一个字符串代表整个 URL.它会将元字符和语义字符之外的字符都进行转义.

返回值
编码后的字符串

```js
  encodeURI('http://www.example.com/q=春节')
  // "http://www.example.com/q=%E6%98%A5%E8%8A%82"

  let url = "www.baidu.com?name=杉"
  let res = encodeURI(url)
  console.log(res);
```


### **<font color="#C2185">encodeURIComponent("春节"): </font>**
该方法适用于转码url上的某一个部分


### **解码: **
### **<font color="#C2185">decodeURI(): </font>**
用于整个 URL 的解码.它是encodeURI()方法的逆运算.它接受一个参数就是转码后的 URL.

```js
  decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
  // "http://www.example.com/q=春节"


  let url2 =`www.baidu.com?name=${encodeURIComponent("杉")}`
  console.log(url2);
  // www.baidu.com?name=%E6%9D%89
```

### **<font color="#C2185">decodeURIComponent('%E6%98%A5%E8%8A%82'): </font>**
解码一个片段

<br>

# url构造函数
用来构造、解析和编码 URL.一般情况下通过window.URL可以拿到这个构造函数.

用于解析url相关的信息

### **<font color="#C2185">new URL(): </font>**
new URL()作为构造函数可以生成 URL 实例.

参数:
它接受一个表示 URL 的字符串作为参数.如果参数不是合法的 URL会报错.

```js
  var url = new URL('http://www.example.com/index.html');
  url.href
  // "http://www.example.com/index.html"
```

如果 URL 字符串是一个相对路径那么需要表示绝对路径的第二个参数作为计算基准.
```js
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"
```


### **实例属性: **
url.href: 返回整个 URL
```js
let str = "http://www.baidu.com:80/?name=杉&age=16"

let url = new URL(str)
console.log(url.href);
// http://www.baidu.com/?name=%E6%9D%89&age=16
```

url.protocol: 返回协议以冒号:结尾
<!-- 
    http:
 -->

url.hostname: 返回域名
<!-- 
    www.baidu.com
 -->

url.host: 返回域名与端口包含:号默认的80和443端口会省略
<!-- 
    www.baidu.com
 -->
url.port: 返回端口

url.origin: 返回协议、域名和端口(没返回端口啊)
<!-- 
    http://www.baidu.com
 -->

### **<font color="#C2185">url.pathname: 返回路径以斜杠/开头: </font>**
<!-- 
    /login
 -->

### **<font color="#C2185">url.search: 返回查询字符串以问号?开头: </font>**
<!-- 
    ?name=%E6%9D%89&age=16
 -->

### **<font color="#C2185">url.searchParams: 返回一个URLSearchParams实例该属性是Location对象没有的: </font>**
该对象的相关方法在下面详细的给出
```js
let queryObj = url.searchParams
```

URL.hash: 返回片段识别符以井号#开头
URL.password: 返回域名前面的密码
URL.username: 返回域名前面的用户名



### **静态方法: **
### **<font color="#C2185">URL.createObjectURL(): </font>**
用来为上传/下载的文件、流媒体文件生成一个 URL 字符串
这个字符串代表了 File对象 或 Blob对象 的 URL.

该方法会创建一个 DOMString 它是一个Blob类型的URL对象, 相当于把传入的文件放入内存URL中

<br>

**URL对象的生命周期:**  
它会在 document 触发了 unload 事件 或者 
执行 revokeObjectURL() 方法后 被释放

```js
  // HTML 代码如下
  <div id="display"/>
  <input
    type="file"
    id="fileElem"
    multiple
    accept="image/*"
    onchange="handleFiles(this.files)"
   >
```
```js
  var div = document.getElementById('display');
  let inp = document.querySelector("#inp")
  inp.addEventListener("change", handleFile)

  function handleFile(e) {
    let file = e.target.files[0]

    let img = document.createElement("img")

    let imgSrc = window.URL.createObjectURL(file)

    img.src = imgSrc
    document.querySelector("#wrap").appendChild(img)
  }
```

URL.createObjectURL()方法用来为上传的文件生成一个 URL 字符串作为<img>元素的图片来源.

**注意:**  
每次使用URL.createObjectURL()方法都会在内存里面生成一个 URL 实例
如果不再需要该方法生成的 URL 字符串为了节省内存可以使用 URL.revokeObjectURL()方法释放这个实例.


### **<font color="#C2185">URL.revokeObjectURL(): </font>**
用来释放URL.createObjectURL()方法生成的 URL 实例.它的参数就是URL.createObjectURL()方法返回的 URL 字符串
一旦图片加载成功以后为本地文件生成的 URL 字符串就没用了于是可以在img.onload回调函数里面通过URL.revokeObjectURL()方法卸载这个 URL 实例.

```js
  // 当图片加载完成后 我们释放这个url对象
  var div = document.getElementById('display');

  function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var img = document.createElement('img');

      img.src = window.URL.createObjectURL(files[i]);

      div.appendChild(img);
      img.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }
    }
  }
```


### **<font color="#C2185">new URLSearchParams(search参数): </font>**
为了要处理参数部分 我们即可以通过 URL的实例对象
url.searchParams 属性获取

还可以直接new URLSearchParams 实例化解析search参数

是浏览器的原生对象用来构造、解析和处理 URL 的查询字符串(即 URL 问号后面的部分).

它本身也是一个构造函数可以生成实例.参数可以为查询字符串起首的问号?有没有都行也可以是对应查询字符串的数组或对象.

### **方法一: 传入字符串: **
```js
  var params = new URLSearchParams('?foo=1&bar=2');
  // 等同于
  var params = new URLSearchParams(document.location.search);
```

### **方法二: 传入数组: **
```js
  var params = new URLSearchParams([['foo', 1], ['bar', 2]]);
```
  
### **方法三: 传入对象: **
```js
  var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
```

URLSearchParams会对查询字符串自动编码.
```js
var params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```


### **<font color="#C2185">实例对象.toString(): </font>**
toString方法返回实例的字符串形式.
返回得是去掉? 的字符串形式
该方法通过实例对象来调用

```js
var url = new URL('https://example.com?foo=1&bar=2');
var params = new URLSearchParams(url.search);
params.toString() // "foo=1&bar=2'
```
  


### **<font color="#C2185">实例对象.append(): </font>**
用来追加一个查询参数.它接受两个参数第一个为键名第二个为键值没有返回值.
```js
  var params = new URLSearchParams({'foo': 1 , 'bar': 2});
  params.append('baz', 3);
  params.toString() // "foo=1&bar=2&baz=3"
```

### **<font color="#C2185">实例对象.delete(): </font>**
用来删除指定的查询参数.它接受键名作为参数
```js
  var params = new URLSearchParams({'foo': 1 , 'bar': 2});
  params.delete('bar');
  params.toString() // "foo=1"
```

### **<font color="#C2185">实例对象.has(): </font>**
返回一个布尔值表示查询字符串是否包含指定的键名.
```js
  var params = new URLSearchParams({'foo': 1 , 'bar': 2});
  params.has('bar') // true
  params.has('baz') // false
```

### **<font color="#C2185">实例对象.set(): </font>**
set()方法用来设置查询字符串的键值
```js
  var params = new URLSearchParams('?foo=1');
  params.set('foo', 2);
  params.toString() // "foo=2"
```

### **<font color="#C2185">实例对象.get(): </font>**
用来读取查询字符串里面的指定键.它接受键名作为参数.
```js
  var params = new URLSearchParams('?foo=1');
  params.get('foo') // "1"
```

### **<font color="#C2185">实例对象.getAll(指定属性名): </font>**
会将获取的内容放到一个数组中返回


### **<font color="#C2185">URLSearchParams.sort(): </font>**
对查询字符串里面的键进行排序规则是按照 Unicode 码点从小到大排列.

<br>

# File 对象
File 对象代表一个文件用来读写文件信息.它继承了 Blob 对象或者说是一种特殊的 Blob 对象所有可以使用 Blob 对象的场合都可以使用它.

最常见的使用场合是表单的文件上传控件(<input type="file">)用户选中文件以后浏览器就会生成一个数组里面是每一个用户选中的文件它们都是 File 实例对象.

https://www.wangdoc.com/javascript/bom/file.html


### **<input type="file"> 所支持的属性: **
### **<font color="#C2185">required: </font>**

### **<font color="#C2185">accept: </font>**
accept 属性的值是一个包含一个或多个（用逗号分隔）这种唯一文件类型说明符的字符串。 
```js
<input type="file" accept="image/*,.pdf">


accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
```
一个不带扩展名的 MIME 类型字符串。
字符串 audio/*,  表示 “任何音频文件”。
字符串 video/*, 表示 “任何视频文件”。
字符串 image/*, 表示 “任何图片文件”。


### **<font color="#C2185">capture: </font>**
捕获图像或视频数据的源
如果 accept (en-US) 属性指出了 input 是图片或者视频类型, 则它指定了使用哪个摄像头去获取这些数据

### **<font color="#C2185">files: </font>**
FileList 对象每个已选择的文件。如果 multiple 属性没有指定, 则这个列表只有一个成员。


### **<font color="#C2185">multiple: </font>**
布尔值, 如果出现, 则表示用户可以选择多个文件


### **``<input type="file">`` 所支持的事件: **
change
input


### **获取已选择文件的信息: **
被选择的文件以 HTMLInputElement.files 属性返回, 它是一个包含一列 File 对象的 FileList 对象。FileList 的行为像一个数组, 所以你可以检查 length 属性来获得已选择文件的数量。

每个 File 包含下列信息：
name:
文件名。

lastModified:
一个数字, 指定文件最后一次修改的日期和时间, 以 UNIX 新纪元（1970 年 1 月 1 日午夜）以来的毫秒数表示。

size:
以字节数为单位的文件大小。

type:
文件的 MIME 类型。





# FileReader
FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容
浏览器原生提供一个FileReader构造函数用来生成 FileReader 实例.
```js
var reader = new FileReader();
```

### **<font color="#C2185">reader.error: </font>**
读取文件时产生的错误对象


### **<font color="#C2185">reader.readyState: </font>**
整数表示读取文件时的当前状态.一共有三种可能的状态
0表示尚未加载任何数据
1表示数据正在加载
2表示加载完成.
<!-- 
    终止读取操作readyState属性将变成2.
 -->


### **<font color="#C2185">reader.result: </font>**
**读取完成后的文件内容**有可能是字符串也可能是一个 ArrayBuffer 实例.


### **事件: **
### **<font color="#C2185">reader.onabort: </font>**
abort事件(用户终止读取操作)的监听函数.


### **<font color="#C2185">reader.onerror: </font>**
error事件(读取错误)的监听函数.


### **<font color="#C2185">reader.onload: </font>**
load事件(读取操作完成)的监听函数通常在这个函数里面**使用result属性拿到文件内容**.


### **<font color="#C2185">reader.onloadstart: </font>**
loadstart事件(读取操作开始)的监听函数.


### **<font color="#C2185">reader.onloadend: </font>**
loadend事件(读取操作结束)的监听函数.


### **<font color="#C2185">reader.onprogress: </font>**
progress事件(读取操作进行中)的监听函数.


### **读取方式: **
### **<font color="#C2185">reader.readAsText(目标): : </font>**
读取完成后result属性将返回文件内容的文本字符串.该方法的第一个参数是代表文件的 Blob 实例第二个参数是可选的表示文本编码默认为 UTF-8.


### **<font color="#C2185">reader.readAsArrayBuffer(目标): : </font>**
以 ArrayBuffer 的格式读取文件读取完成后result属性将返回一个 ArrayBuffer 实例.


### **<font color="#C2185">reader.readAsDataURL(目标): : </font>**
result属性将返回一个 Data URL 格式(Base64 编码)的字符串代表文件内容.对于图片文件这个字符串可以用于<img>元素的src属性.注意这个字符串不能直接进行 Base64 解码必须把前缀data:*/*;base64,从字符串里删除以后再进行解码.


### **<font color="#C2185">reader.readAsBinaryString(目标): : </font>**
result属性将返回原始的二进制字符串.

<br>

# js获取输入光标的位置
https://cloud.tencent.com/developer/article/1753347?from=15425

### **<font color="#C2185"><p contenteditable="true">: </font>**
我们给一个标签添加上 contenteditable 属性则该标签的内部元素则变为可编辑状态


### **如何获取光标的位置: **
### **<font color="#C2185">window.getSelection();: </font>**
selection对象是用户再页面上选择的范围的对象
```js
let selection = window.getSelection();
```

### **<font color="#C2185">selection.getRangeAt(0): </font>**
selection对象里面包含0个或多个range对象 通过range对象的属性和方法就可以获取到鼠标光标所在的位置 和 鼠标光标处插入dom节点
```js
let selection = window.getSelection();
let range = selection.getRangeAt(0);
```

### **<font color="#C2185">range.endContainer 光标所在的节点: </font>**
### **<font color="#C2185">range.endOffset 光标所在节点的偏移量: </font>**
使用range对象的endContainer属性获取光标所在的dom对象
使用range对象的endOffset获取光标所在dom对象的偏移量



### **创建要插入的dom节点: **
```js
let node = document.createElement("span")
node.setAttribute("class", "at")
node.innerHTML = "测试"
```

### **在光标处插入dom元素: **
### **<font color="#C2185">range.insertNode(node): </font>**
```js
let selection = window.getSelection();
let range = selection.getRangeAt(0)

let endDom = range.endContainer
let offset = range.endOffset

let node = document.createElement("span")
node.setAttribute("class", "at")
node.innerHTML = "测试"

range.insertNode(node)
```

<br>

# onsubmit事件
我们一般会阻止表单的自动提交
阻止表单提交事件的步骤
1. 给表单绑定submit事件
2. 在事件内部调用 e.preventDefault();
3. 按钮使用 <input type="submit">
<!-- 
  button类型必须指定为 submit 要不不会触发表单的提交
 -->

```js
let submit = document.querySelector("#sub")
form.onsubmit = function(e) {
  e.preventDefault();
}
```

<br>

# 自定义实现 监听事件 和 触发事件 逻辑

### **1. 定义 事件对象 内包含 : **
事件对象
    - 事件名: [事件回调]
    - 存放 要绑定的事件

绑定事件的方法
触发事件的方法

```js
let eventObject = {
  event: {
    // 假设事件名
    hypothesisEventName: []
  },

  // 绑定事件的方法
  on(eventName, eventFn) {
    // 如果要 绑定的事件 在event对象中 则将回调 push 到 事件回调数组中
    if(this.event[eventName]) {
      this.event[eventName].push(eventFn)
    } else {
      // 如果要绑定的事件 不在事件对象中 则进行初始化
      this.event[eventName] = []
      this.event[eventName].push(eventFn)
    }
  },

  // 触发事件
  emit(eventName, data) {
    if(this.event[eventName]) {
      this.event[eventName].forEach(fn => fn(data))
    }
  }
}


// 示例:
// 当读取数据后触发 自定义事件的回调
let fs = require("fs")
fs.readFile("./output.txt", "utf-8", (err, data) => {
  if(!err) lcEvent.emit("fileSuccess", data)
})


// 自定义事件的逻辑部分
lcEvent.on("fileSuccess", (data) => {
  console.log("查看数据库")
})

lcEvent.on("fileSuccess", (data) => {
  console.log("统计年龄比例")
})

lcEvent.on("fileSuccess", (data) => {
  console.log("查看所有用户的信息")
})

上面我们就完成了 "自定义事件的逻辑"
通过去订阅我们自己设定的事件 监听触发完成回调
```

<br>

# 视频全屏相关
全屏api可以控制浏览器的全屏显示 让一个element节点以及它的子节点占满用户的整个屏幕

现在各大浏览器都支持这个api 但是使用的时候需要加上浏览器前缀

### **<font color="#C2185">全屏的方法 requestFullscreen(): </font>**
这个方法可以使整个节点全屏状态 但是该方法必须用户手动触发才能生效
```js 
    btn.onclick = function() {
      el.requestFullscreen()
    }

    // 要加上浏览器前缀 判断有这个方法你再进行调用
    if(el.requestFullscreen) {
        el.requestFullscreen()
    }

    el.requestFullscreen
    el.mozRequestFullScreen
    el.msRequestFullscreen
    el.webkitRequestFullscreen
```

放大一个节点时 firefox和chrome在行为上略有不同
firebox自动为该节点增加一条css规则 将该元素放大至全屏状态 width 100% height 100%

而chrome则是将该节点 放在屏幕的中央 保持原来的大小 其它的部分变黑 
为了让chrome的行为与firebox保持一致 可以自定义一条css规则
<!-- 
    :-webkit-full-screen #myvideo {
        width: 100%;
        height: 100%;
    }
 -->


### **<font color="#C2185">document.exitFullscreen(): </font>**
用于取消全屏 该方法也带有浏览器前缀
```js 
    document.exitFullscreen()
    document.msExitFullscreen()
    document.mozCancelFullScreen()
    document.webkitExitFullscreen()
```

### **如何判断节点是否为全屏: **
### **<font color="#C2185">方式1: document.fullscreenElement: </font>**
该属性返回正处于全屏状态的el节点 如果当前没有节点处于全屏状态 则返回null
```js 
    document.fullscreenElement
    document.mozFullScreenElement
    document.webkitFullscreenElement
```

### **<font color="#C2185">方式2: document.fullScreen: </font>**
```js
    const isFullScreen = 
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenElement

    这个变量会返回 true / false
```


### **<font color="#C2185">document.fullscreenEnabled: </font>**
该属性返回一个布尔值 表示当前文档是否可以切换到全屏状态
判断当前浏览器是否可以全屏可以用它


### **全屏事件: **
### **<font color="#C2185">fullscreenchange事件: </font>**
浏览器进入或离开全屏的时候触发


### **<font color="#C2185">fullscreenerror事件: </font>**
浏览器无法进入全屏时触发 可能是技术或者是用户拒绝

```js  
    document.addEventListener("fullscreenchange", () => {
        if(document.fullscreenElement) {
            console.log("进入全屏")
        } else {
            console.log("退出全屏")
        }
    })
```

上面的代码发生fullscreenchange时 通过fullscreenElement属性判断到底是进入全屏还是退出全屏


### **全屏状态的css: **
全屏状态下 大多数的浏览器css支持 
    :full-screen伪类 

只有ie11支持 :fullscreen伪类 使用这个伪类 可以对全屏状态设置单独的css属性
```css
    :-webkit-full-screen
    :-moz-full-screen
    :-ms-fullscreen
    :full-screen
    :fullscreen
    
    :-webkit-full-screen video {
        width: 100%;
        height: 100%;
    }
```

<br>

# WebSocket
WebSocket 是一种网络通信协议很多高级功能都需要它.
叩丁狼 笔记:  http://codesohigh.com/subject/websocket/websocket.html

初次接触 WebSocket 的人都会问同样的问题: 我们已经有了 HTTP 协议为什么还需要另一个协议？它能带来什么好处？

因为 HTTP 协议有一个缺陷: 通信只能由客户端发起.
举例来说我们想了解今天的天气只能是客户端向服务器发出请求服务器返回查询结果.

HTTP 协议做不到服务器主动向客户端推送信息.
HTTP 协议的这种单向请求的特点注定了如果服务器有连续的状态变化客户端要获知就非常麻烦.

如果我们还需要实时获取服务端的最新动态怎么办? 用ajax的方式去访问服务器 那么
我们只能使用“轮询”: 每隔一段时候就发出一个询问了解服务器有没有新的信息.最典型的场景就是聊天室.

轮询的效率低非常浪费资源(因为必须不停连接或者 HTTP 连接始终打开).因此工程师们一直在思考有没有更好的方法.WebSocket 就是这样发明的.


### **Ajax轮询: **
ajax轮询一般分为两种.
1. 设定一个定时器无论有无结果返回, 时间一到就会继续发起请求这种轮询耗费资源也不一定能得到想要的数据这样的轮询是不推荐的.

2. 在第一次请求的时候 如果返回数据了那么就在成功的回调里面再次发起这个请求就像递归一样调用本方法.如果时间太久失败了同样的再次调用这个请求也就是本函数.当然长轮询也需要后台配合没有数据改变的时候就不用返回或者约定好逻辑.

3. 客户端按规定时间定时向服务端发送ajax请求服务器接到请求后马上返回响应信息并关闭连接. Ajax轮询需要服务器有很快的处理速度与快速响应.

客户端是按照规定时间(这个时间由你设定此处默认为1秒)像服务端发送请求前一次请求完成后无论有无结果返回一秒之后下一次请求又会发出.这就叫做Ajax轮询.

https://www.cnblogs.com/-wenli/p/10982264.html


### **websocket的特点: **
服务器可以主动向客户端推送信息客户端也可以主动向服务器发送信息是真正的双向平等对话

1. 属于服务器推送技术的一种
<!-- 
    HTTP 协议有点像发电子邮件发出后必须等待对方回信;
    WebSocket 则是像打电话
    
    服务器端和客户端可以同时向对方发送数据它们之间存着一条持续打开的数据通道.
 -->

2. 与 HTTP 协议有着良好的兼容性.默认端口也是80和443
并且握手阶段采用 HTTP 协议因此握手时不容易屏蔽能通过各种 HTTP 代理服务器.

3. 数据格式比较轻量性能开销小通信高效.
4. 可以发送文本也可以发送二进制数据.
5. 没有同源限制客户端可以与任意服务器通信完全可以取代 Ajax.

6. 协议标识符是ws(如果加密则为wss对应 HTTPS 协议)服务器网址就是 URL.
<!-- 
    ws://example.com:80/some/path
 -->


### **WebSocket 握手请求头 和 响应头 解析: **
浏览器发出的 WebSocket 握手请求类似于下面的样子: 
```js 
    GET / HTTP/1.1

    // Connection字段表示浏览器通知服务器如果可以的话就升级到 WebSocket 协议
    Connection: Upgrade

    // Upgrade字段表示将通信协议从HTTP/1.1转向该字段指定的协议
    Upgrade: websocket
    Host: example.com
    Origin: null

    // Sec-WebSocket-Key则是用于握手协议的密钥是 Base64 编码的16字节随机字符串.
    Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
    Sec-WebSocket-Version: 13
```

服务器的 WebSocket 回应如下.
```js
    HTTP/1.1 101 Switching Protocols

    // Connection字段通知浏览器需要改变协议.
    Connection: Upgrade
    Upgrade: websocket

    // Sec-WebSocket-Accept字段是服务器在浏览器提供的
    Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
    Sec-WebSocket-Origin: null

    // Sec-WebSocket-Location字段表示进行通信的 WebSocket 网址.
    Sec-WebSocket-Location: ws://example.com/
```

Sec-WebSocket-Accept字段: 
服务器在浏览器提供的Sec-WebSocket-Key字符串后面添加 RFC6456 标准规定的
“258EAFA5-E914-47DA-95CA-C5AB0DC85B11”字符串然后再取 SHA-1 的哈希值.浏览器将对这个值进行验证以证明确实是目标服务器回应了 WebSocket 请求.Sec-WebSocket-Location字段表示进行通信的 WebSocket 网址.

完成握手以后WebSocket 协议就在 TCP 协议之上开始传送数据.


### **客户端 API : **
浏览器对 WebSocket 协议的处理无非就是三件事.
1. 建立连接和断开连接
2. 发送数据和接收数据
3. 处理错误


### **当创建ws实例对象后 客户端就会与服务器进行连接: **
### **<font color="#C2185">let ws = new WebSocket("服务器地址"): </font>**
**注意:**
服务器地址的协议必须由 http -> ws 改为ws
```js 
    let serverURL = "ws://localhost:8800/"  // ws
    let ws = new WebSocket(serverURL)
 ```


### **实例对象身上的属性: **
### **<font color="#C2185">ws.readyState: </font>**
返回实例对象的当前状态共有四种
1. CONNECTING:    值为0表示正在连接.
2. OPEN:          值为1表示连接成功可以通信了.
3. CLOSING:       值为2表示连接正在关闭.
4. CLOSED:        值为3表示连接已经关闭或者打开连接失败.
```js 
    console.log(ws.readyState)   // 0
```


### **<font color="#C2185">ws.onopen: </font>**
用于指定连接成功后的回调函数
```js 
    // 如果要指定多个回调函数可以使用addEventListener方法.
    ws.onopen = function(e) {
        if(e) console.log("open", e)
        let data = {msg: "我是数据呀"}
        ws.send(data)
    }
```


### **<font color="#C2185">ws.onclose: </font>**
用于指定连接关闭后的回调函数.
```js 
    ws.onclose = function(e) {
        if(e) console.log("close", e)
    }
```


### **<font color="#C2185">ws.onmessage: </font>**
用于指定 收到服务器数据 后的回调函数.
```js 
    // 注意服务器数据可能是文本也可能是二进制数据(blob对象或Arraybuffer对象).
    ws.onmessage = function(event){
        if(typeOf event.data === String) {
            console.log("Received data string");
        }

        if(event.data instanceof ArrayBuffer){
            var buffer = event.data;
            console.log("Received arraybuffer");
        }
    }

    ws.onmessage = function(e) {
        if(e) console.log("message", e)
        console.log("onmessage, 这里能收到来自服务器的数据")
    }
```


### **<font color="#C2185">ws.onerror: </font>**
用于指定报错时的回调函数.


### **<font color="#C2185">ws.send(): </font>**
实例对象的send()方法用于向服务器发送数据.
```js 
    // 发送文本的例子.
    ws.send('your message');


    // 发送 Blob 对象的例子.
    var file = document
    .querySelector('input[type="file"]')
    .files[0];

    ws.send(file);


    // 发送 ArrayBuffer 对象的例子.
    var img = canvas_context.getImageData(0, 0, 400, 320);
    var binary = new Uint8Array(img.data.length);
    for (var i = 0; i < img.data.length; i++) {
        binary[i] = img.data[i];
    }
    ws.send(binary.buffer);
```


### **实例对象的属性: **
### **<font color="#C2185">ws.binaryType: </font>**
显式指定收到的二进制数据类型.
```js 
    // 收到的是 blob 数据
    ws.binaryType = "blob";
    ws.onmessage = function(e) {
        console.log(e.data.size);
    };

    // 收到的是 ArrayBuffer 数据
    ws.binaryType = "arraybuffer";
    ws.onmessage = function(e) {
        console.log(e.data.byteLength);
    };
```


### **<font color="#C2185">ws.bufferedAmount: </font>**
表示还有多少字节的二进制数据没有发送出去.它可以用来判断发送是否结束.
```js 
    var data = new ArrayBuffer(10000000);
    socket.send(data);

    if (socket.bufferedAmount === 0) {
        // 发送完毕
    } else {
        // 发送还没结束
    }
```


### **服务端的方法: **
### **<font color="#C2185">ws.send() : </font>**
    用于向客户端发送数据

### **<font color="#C2185">ws.on("message", () => { }) : </font>**
    用于接收客户端发送过来的数据



### **服务器端 逻辑: **
Web端我们主要借助 *express* 与 *express-ws*

这个项目里我们创建一个两个人实时对话的效果

1. npm init -y 项目初始化
2. npm express express-ws
3. 根目录下创建静态资源文件夹 创建index.html 创建角色A 和 角色B
<!-- 
    | - public
        - index.html
            这个页面主要的效果就是 点击头像跳转到 
            sam.html 或者 erin.tml

        - sam.html
        - erin.html

        - 两张图片.jpg
 -->

4. 写web端逻辑 自己看吧 随便一个网页都可以 逻辑都是一样的

5. 写服务端代码
```js 
    const express = require("express")

    // 引入 ws
    const expressWs = require("express-ws")

    const app = express()

    // 使用expressWs方法 将app传入 这样我们就能往页面中注入websocket功能
    expressWs(app)
```

6. 在根目录下创建 websocket.js 
```js 
    // 这个文件中也要用到路由 所以要导入express
    const express = require("express")
    const expressWs = require("express-ws")

    const router = express.Router()

    // 给router注入websocket 注入后 router就会多了ws方法
    expressWs(router)

    // sam访问的路径为 ws://localhost:8800/ws/sam
    // app.use("/ws", websocket) 因为server.js文件里面 这么处理的 所以 这个js文件中的所有路径前都会拼接上/ws

    // 当sam访问这个路径的时候 我们就给它返回一个数据
    router.ws("/sam", (ws) => {
        ws.send("sam链接成功")
    })

    module.exports = router
```

7. 前端的ws逻辑
```js 
    // ws的方法
    // 一个页面对应一个服务端的路由规则 比如前端sam 要进入 后台sam 这才算链接在一起 我们指定的url就是 后台 router定义的对应的路由规则 router.ws("/sam", (ws) => {})
    let ws = new WebSocket("ws://localhost:8800/ws/sam")

    // 链接打开时的回调
    ws.onopen = function() {
      // 得到链接状态 值为1链接成功
      console.log(ws.readyState)
    }

    ws.onclose = function() {
      console.log("链接已断开")
    }

    ws.onerror = function(err) {
      console.log("链接发生错误", err)
    }

    // 该方法用于接收服务端传递过来的数据
    ws.onmessage = function(res) {
      console.log(res)
      console.log(res.data)
    }
```


8. 上面做了下布局 和 ws的链接
现在我们思考一个问题 比如我在sam页面 发送了一条消息 怎么才能到erin页面呢？

当我们再输入框输入文本后 我们判断非空 上面的逻辑是 直接拿到 输入的值 然后拼装好结构 插入到了sam的页面中

其实这个部分的逻辑不对 我们应该是从 onmessage 中拿到内容 也就是从服务端拿到内容 在拼接 再放入到页面中

我们应该是 按下回车 走服务端 从服务端返回数据 然后再做拼接 插入页面的逻辑
这样数据经过服务端 服务端就可以存储起来 这样erin就可以接收到sam的消息
```js 
    // 服务端代码 服务端使用on方法接收客户端发送的数据 然后在给客户端
    ws.on("message", (msg) => {
        // 重新把拿到的数据返回给客户端
        ws.send(msg)
    })
```

### **这个阶段的 客户端代码: **
```js 
    let txt = $("#txt")[0]
    let contentWrap = $(".contents")[0]
    let tips = $(".tips")[0]

    // ws的方法
    let ws = new WebSocket("ws://localhost:8800/ws/sam")

    // 链接打开时的回调
    ws.onopen = function() {
      // 得到链接状态 值为1链接成功
      // console.log(ws.readyState)
    }

    ws.onclose = function() {
      console.log("链接已断开")
    }

    ws.onerror = function(err) {
      console.log("链接发生错误", err)
    }

    // 该方法用于接收服务端传递过来的数据
    ws.onmessage = function(res) {

      let tNode = rightMsg(res.data, true)
      contentWrap.innerHTML += tNode

      contentWrap.scrollTo({
        top: contentWrap.scrollHeight,
        behavior: "smooth"
      })

      txt.value = ""
    }



    // 既然是回车的发起人 那么必然我们要添加到右侧
    txt.onkeyup = function(e) {
      if(e.keyCode == 13) {
        if(this.value.trim() == "") {
          tips.style.display = "block"
          this.timer = setTimeout(function(){
            tips.style.display = "none"
          }, 2500)
          this.value = ""
          return
        }

        let value = this.value

        // 将获取到的数据发送给服务端
        ws.send(value)
        
        // 下面添加到页面的逻辑 我们要在 onmessage 事件里面完成 因为它理由有服务端返回的数据
      }
    }

    function rightMsg(value, type) {
      if(type) {
        let rightHtml = `
          <div class="dialog right">
            <div>${value}</div>
            <img src="./sam.png" alt="">
          </div>
        `
        return rightHtml
      } else if(type == false) {
        let leftHtml = `
          <div class="dialog left">
            <img src="./erin.png" alt="">
            <div>${value}</div>
          </div>
        `
        return leftHtml
      }
    }

    function $(el) {
      return document.querySelectorAll(el)
    }
```


### **这个阶段的服务端代码: **
```js 
    // 这个文件中也要用到路由 所以要导入express
    const express = require("express")
    const expressWs = require("express-ws")

    const router = express.Router()

    expressWs(router)

    router.ws("/sam", (ws) => {


    // 接收客户端发送过来的数据
    ws.on("message", (msg) => {
        // 重新把拿到的数据返回给客户端
        ws.send(msg)
    })
    })

    // 注意每一个路由中必须有一个有效的send方法 send中有一个return 写在send后面的语句都不会执行

    module.exports = router
```


我们还要思考下 sam发送的数据 给了服务端 由服务端再返回 我们渲染到了页面上 但是sam的信息 erin那边也要收到吧

erin那边怎么才能收到呢？

服务端的代码 发送数据 和 接收数据的逻辑最好是分离开 这样思路比较清晰
```js 
    // 存放sam的数据
    let samStr = []


    router.ws("/sam", (ws) => {
        ws.on("message", (msg) => {
            samStr.push(msg)    // 存储sam发送的数据
            ws.send(msg)
        })
    })


    // erin接收数据的接口
    router.ws("/erin", (ws) => {
    // 这里我们要将sam的数据 给前端erin的界面 我们不能使用for循环发依次send samStr数组 因为一个路由规则中只能有一个send方法

    // 这里我们采用定时器 每一秒发送一条数据 也就是用定时器的方式查看数组中是否有数组项 只要数组中是有数据的就返回给客户端第0项 顺便把第0项清掉

    setInterval(function() {
        if(samStr.length > 0) {
            // 因为send 里面有return 所以要做下面的逻辑
            let msg = samStr[0]
            samStr.shift()
            ws.send(msg)
            }    
        }, 1000)
    })
```

这里的要点就是 使用定时器 每1秒就查看一下samStr数组中有没有数据 如果有数据 那么就将它返回给客户端 然后再将数组里面的数据删掉 这样数组中始终都是一条数据 返回给客户端就删掉


几乎就是可以了 然后没事自己做一遍
要点: 
我们前端一套ws方法 对应 后台一套ws接口
前端 new WebSocket 时填入的 接口url 这样前端这一套方法 才能与 后台路由接口中的方法配套 互相接发数据


### **完整代码总结: **
```js 
    // 客户端 sam
    let txt = $("#txt")[0]
    let contentWrap = $(".contents")[0]
    let tips = $(".tips")[0]

    // ws的方法
    let ws = new WebSocket("ws://localhost:8800/ws/sam")

    // 链接打开时的回调
    ws.onopen = function() {
    }

    ws.onclose = function() {
      console.log("链接已断开")
    }

    ws.onerror = function(err) {
      console.log("链接发生错误", err)
    }

    // 该方法用于接收服务端传递过来的数据
    ws.onmessage = function(res) {

      let tNode = rightMsg(res.data, true)
      contentWrap.innerHTML += tNode

      contentWrap.scrollTo({
        top: contentWrap.scrollHeight,
        behavior: "smooth"
      })

      txt.value = ""
    }

    txt.onkeyup = function(e) {
      if(e.keyCode == 13) {
        if(this.value.trim() == "") {
          tips.style.display = "block"
          this.timer = setTimeout(function(){
            tips.style.display = "none"
          }, 2500)
          this.value = ""
          return
        }

        let value = this.value
        ws.send(value)
        
        // 下面添加到页面的逻辑 我们要在 onmessage 事件里面完成 因为它理由有服务端返回的数据
      }
    }

    // 创建一个生成 对话框区域 的代码 传入true代表添加右侧结构 false左侧
    function rightMsg(value, type) {
      if(type) {
        let rightHtml = `
          <div class="dialog right">
            <div>${value}</div>
            <img src="./sam.png" alt="">
          </div>
        `
        return rightHtml
      } else if(type == false) {
        let leftHtml = `
          <div class="dialog left">
            <img src="./erin.png" alt="">
            <div>${value}</div>
          </div>
        `
        return leftHtml
      }
    }

    function $(el) {
      return document.querySelectorAll(el)
    }


    // 后台 websocket 逻辑
    const express = require("express")
    const expressWs = require("express-ws")

    const router = express.Router()

    // 给router注入websocket 注入后 router就会多了ws方法
    expressWs(router)


    // 存放sam的数据
    let samStr = []

    // sam访问的路径为 ws://localhost:8800/ws/sam
    // app.use("/ws", websocket) 因为server.js文件里面 这么处理的 所以 这个js文件中的所有路径前都会拼接上/ws
    // 当sam访问这个路径的时候 我们就给它返回一个数据
    router.ws("/sam", (ws) => {

    // send() ws的方法 用来想客户端发射数据的
    // ws.send("后台往客户端发送的数据")

    // 接收客户端发送过来的数据
    ws.on("message", (msg) => {
        // 重新把拿到的数据返回给客户端
        samStr.push(msg)    // 存储sam发送的数据
        ws.send(msg)
    })
    })

    // 注意每一个路由中必须有一个有效的send方法 send中有一个return 写在send后面的语句都不会执行



    // erin接收数据的接口
    router.ws("/erin", (ws) => {
    let timer = null

    // 当监听到链接断开的时候要清空定时器
    ws.on("close", () => {
        if(timer) {
        clearInterval(timer)
        }
    })

    // 这里我们要将sam的数据 给前端erin的界面 我们不能使用for循环发依次send samStr数组 因为一个路由规则中只能有一个send方法
    // 这里我们采用定时器 每一秒发送一条数据 也就是用定时器的方式查看数组中是否有数组项 只要数组中是有数据的就返回给客户端第0项 顺便把第0项清掉
    timer = setInterval(function() {
        if(samStr.length > 0) {
        // 因为send 里面有return 所以要做下面的逻辑
        let msg = samStr[0]
        samStr.shift()
        ws.send(msg)
        }    
    }, 1000)
    })

    module.exports = router


    const express = require("express")
    // 引入 ws
    const expressWs = require("express-ws")
    const websocket = require("./websocket.js")

    const app = express()
    // 使用expressWs方法 将app传入 这样我们就能往页面中注入websocket功能
    expressWs(app)


    // 利用中间件来充当路由 参数1的位置是路由 返回对应的静态资源文件夹中的html文件
    app.use("/sam", express.static("public/sam.html"))
    app.use("/erin", express.static("public/erin.html"))

    // 当我们访问的是 /ws 的路由的时候 我们就要调用 websocket
    // 我们要求访问的格式是 ws://localhost:3000/ws  不想要/ws的话 下面app.use那里去掉
    // websocket是我们导入的js文件 下面这样写的话 这个js文件中的所有路径前都会拼接上/ws
    app.use("/ws", websocket)

    app.use(express.static("public"))

    // 如果我们键入服务器网址后 没有任何对应页面的话 解决报错
    app.get("/*", (req, res) => {})


    app.listen(8800, () => {
    console.log("服务器已开启 监听8800")
    })
```

<br>

# bitbug
制作favicon图标
https://www.bitbug.net/
正方形图片 图片尺寸不要过大

<br>

# postMessage
postMessage是html5引入的API,
postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,

可以实现跨文本文档
多窗口
跨域消息传递
多用于窗口间数据通信

这也使它成为跨域通信的一种有效的解决方案.

### **发送数据: **
### **<font color="#C2185">otherWindow.postMessage(message, targetOrigin, [transfer]);: </font>**
解析: 
otherWindow
向该窗口发送数据
otherWindow是窗口的一个引用,
<!-- 
    - 比如iframe的contentWindow属性,
    - 执行window.open返回的窗口对象,
    - 或者是命名过的或数值索引的window.frames.
 -->

message
数据

targetOrigin
通过窗口的origin属性来指定哪些窗口能接收到消息事件
指定后只有对应origin下的窗口才可以接收到消息,设置为通配符"*"表示可以发送到任何窗口,
<!-- 
    如果想要发送到与当前窗口同源的窗口,可设置为"/"
 -->

transfer
是一串和message同时传递的**Transferable**对象,这些对象的所有权将被转移给消息的接收方,而发送一方将不再保有所有权.


### **接收数据: **
接收方 给 window 绑定 "message" 事件 事件的回调中的 event 身上有我们想要得数据
```js
    window.addEventListener("message", fn, false) ;

    function fn(event) {
        var origin= event.origin;
        console.log(event);
    }
```

### **<font color="#C2185">event.data: </font>**
指的是从其他窗口发送过来的消息对象

### **<font color="#C2185">event.type: </font>**
指的是发送消息的类型;

### **<font color="#C2185">event.source: </font>**
指的是发送消息的窗口对象;

### **<font color="#C2185">origin: </font>**
指的是发送消息的窗口的源


### **应用场景: **
我们都知道JSONP可以实现解决GET请求的跨域问题,但是不能解决POST请求的跨域问题.而postMessage都可以

要点: 
1. document.getElementById("otherPage").contentWindow
获取iframe的窗口对象

1. 父窗体创建跨域iframe并发送信息
```html 
<script type="text/JavaScript">    
    function sendPost() { 
                     
        // 获取id为otherPage的iframe窗口对象       
        var iframeWin = document.getElementById("otherPage").contentWindow;       

        // 向该窗口发送消息       
        iframeWin.postMessage(document.getElementById("message").value, 'http://moweide.gitcafe.io');
    }   

    // 监听跨域请求的返回   
    window.addEventListener("message", function(event) {
        console.log(event, event.data);
    }, false);
</script>
```

<br>

# formData对象
用户点击“提交”按钮每一个控件都会生成一个键值对键名是控件的name属性键值是控件的value属性

所有的键值对都会提交到服务器.
但是提交的数据格式跟<form>元素的method属性有关.该属性指定了提交数据的 HTTP 方法.如果是 GET 方法所有键值对会以 URL 的查询字符串形式提交到服务器
比如: /handling-page?user_name=张三

如果是 POST 方法所有键值对会连接成一行作为 HTTP 请求的数据体发送到服务器
比如: user_name=张三&user_passwd=123&submit_button=提交
下面就是 POST 请求的头信息.

注意:
实际提交的时候只要键值不是 URL 的合法字符(比如汉字“张三”和“提交”)浏览器会自动对其进行编码.


### **<font color="#C2185">new FormData(form): </font>**
原生当中根据form自动收集表单数据到 formData 对象中
```js 
    let formData = new FormData(document.querySelector("form"))
```

参数: 
    - DOM表单元素
    - 构造函数会自动处理表单的键值对

    - 空
    - 那就创建一个空的表单对象 需要我们自己往里面添加值


### **实例方法: **
### **<font color="#C2185">formData.get(key): </font>**
获取指定键名对应的键值参数为键名.如果有多个同名的键值对则返回第一个键值对的键值.

### **<font color="#C2185">formData.getAll(key): </font>**
返回一个数组表示指定键名对应的所有键值.
如果有多个同名的键值对数组会包含所有的键值.

### **<font color="#C2185">formData.set(key, value): </font>**
设置指定键名的键值, 没有就添加 已有就更新
如果第二个参数是文件还可以使用第三个参数表示文件名.

### **<font color="#C2185">formData.delete(key): </font>**
删除一个键值对参数为键名.

### **<font color="#C2185">formData.append(key, value): </font>**
添加一个键值对.如果键名重复则会生成两个相同键名的键值对.
如果第二个参数是文件还可以使用第三个参数表示文件名.
<!-- 
    formData.append('userpic[]', myFileInput.files[0], 'user1.jpg');
 -->

### **<font color="#C2185">formData.has(key): </font>**
返回一个布尔值表示是否具有该键名的键值对.

### **<font color="#C2185">formData.keys(): </font>**
返回一个遍历器对象
用于for...of循环遍历所有的键名.

### **<font color="#C2185">formData.values(): </font>**
返回一个遍历器对象
用于for...of循环遍历所有的键值.

### **<font color="#C2185">formData.entries(): </font>**
返回一个遍历器对象
用于for...of循环遍历所有的键值对.
结果是
    ["key", "value"]

<!-- 
    如果直接用for...of循环遍历 FormData 实例默认就会调用这个方法.
 -->


### **属性: **
### **<font color="#C2185">enctype: </font>**
表单能够用四种编码向服务器发送数据.编码格式由表单的enctype属性决定.
对 请求体 进行编码的格式

### **<font color="#C2185">GET: </font>**
如果表单使用GET方法发送数据enctype属性无效.
因为:
?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
```js
    <form
        action="register.php"
        method="get"
        onsubmit="AJAXSubmit(this); return false;"
    >
    </form>
```


### **<font color="#C2185">POST: </font>**
application/x-www-form-urlencoded
如果表单用POST方法发送数据并省略enctype属性那么数据以application/x-www-form-urlencoded格式发送(因为这是默认值).

```js
    Content-Type: application/x-www-form-urlencoded
    foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A
```

text/plain
如果表单使用POST方法发送数据enctype属性为text/plain那么数据将以纯文本格式发送.
```js
    Content-Type: text/plain

    foo=bar
    baz=The first line.
    The second line.
```

multipart/form-data
如果表单使用POST方法enctype属性为multipart/form-data那么数据将以混合的格式发送.
```js 
    Content-Type: multipart/form-data; boundary=<br><br><br>314911788813839

    <br><br>----314911788813839
    Content-Disposition: form-data; name="foo"

    bar
    <br><br>----314911788813839
    Content-Disposition: form-data; name="baz"

    The first line.
    The second line.

    <br><br>----314911788813839--
```

### **node后台接收到的数据类型就是 利用了multipart中间件: **
```js
{ username: [ 'sam', 'erin' ], password: [ '123' ] }
```

<br>

### **文件上传: **
用户上传文件也是通过表单.具体来说就是通过文件输入框选择本地文件提交表单的时候浏览器就会把这个文件发送到服务器.
```js 
    <input type="file" id="file" name="myFile">
```

### **要点: **
1. 将 form 的 method 设置为 post
2. enctype 设置为 multipart/form-data
<!-- 
    enctype属性决定了 HTTP 头信息的Content-Type字段的值
    默认情况下这个字段的值是application/x-www-form-urlencoded
    但是文件上传的时候要改成multipart/form-data.
 -->

3. 新建一个 FormData 实例对象 把选中的文件添加到这个对象上面.
```js 
    var formData = new FormData();

    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // 只上传图片文件
        if (!file.type.match('image.*')) {
            continue;
        }

        formData.append('photos[]', file, file.name);
    }
```

4. 最后使用 Ajax 向服务器上传文件.
```js 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'handler.php', true);

    xhr.onload = function () {
        if (xhr.status !== 200) {
            console.log('An error occurred!');
        }
    };

    xhr.send(formData)


    // 除了发送 FormData 实例也可以直接 AJAX 发送文件.
    var file = document.getElementById('test-input').files[0];
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'myserver/uploads');
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
```


<br>

# image对象
当我们创建一个 Image 对象时, 就相当于给浏览器缓存了一张图片

### **通过构造函数的方式: **
创建 image 对象:
```js
let img = new Image([宽度],[高度])
```

img 也相当于一个节点对象 节点身上有的属性 它都有 如
```js
// 给浏览器缓存了一张图片
img.src = ""
```


**注意:**
src 属性一定要写到 onload 的后面否则程序在 IE 中会出错.


### **图片对象身上的属性: **
img.complete:
    - 返回一个布尔值
    - 可以通过Image对象的complete 属性来检测图像是否加载完成

每个Image对象都有一个complete属性当图像处于装载过程中时该属性值false
当发生了onload、onerror、onabort中*任何一个事件后则表示图像装载过程结束(不管成没成功)此时complete属性为true*

img.border  
img.height  
img.width
img.src  
img.name  
img.vspace  
img.hspace  
img.lowsrc  


### **图片对象身上的事件: **
onabort
当用户放弃图像的装载时调用

onload
当图像装载完毕时调用

onerror
在装载图像的过程中发生错误时调用

```js
    var img = new Image();    
    img.src = oImg[0].src = this.src.replace(/small/, "big");    
    oDiv.style.display = "block";    
    img.complete ? oDiv.style.display = "none" : (oImg[0].onload = function() {oDiv.style.display = "none"})  
```

onkeydown 
onkeypress 
onkeyup


### **应用场景: **
Image 对象也常用来做预加载图片（也就是将图片预先加载到浏览器中, 当浏览图片的时候就能享受到极快的加载速度）。

在HTML页面中, <img> 标签每出现一次, 也就创建了一个 Image 对象。

HTML代码的加载 和 图片的加载是同时的, 虽然 图片已经进行过预加载, 但是尽管这样 加载的速度 相比较 HTML 代码的加载速度 还是要慢一些的。就需要用 Image对象中的 onload事件来解决这个问题了。。


### **image对象的src: **
当我的src指向一个地址时 我会发送请求去拿它, 这是浏览器自己会做的
img.src = arr[i];

<br>

# IntersectionObserver
该API在兼容性上有很大的问题 所以w3c提供了一个 npm包 专门用来解决兼容性的问题 也就是我们 要我们要先使用这个包 然后才能接着用 IntersectionObserver API

### **安装: **
npm install intersection-observer

### **引入: **
import "intersection-observer"
确保它在最前面
在html页面里面的话 相当于如下:
```html
<script src="./js/intersection-observer.js" />
```

### **作用: **
当我们想监听一个元素从不可见到可见从可见到不可见 就可以使用这个api 
自动"观察"元素是否进入视口  
网页开发时常常需要了解某个元素是否进入了“视口”(viewport)即用户能不能看到它.

传统的实现方法是监听到scroll事件后调用目标元素(绿色方块)的getBoundingClientRect()方法得到它对应于视口左上角的坐标再判断是否在视口之内.这种方法的缺点是由于scroll事件密集发生计算量很大容易造成性能问题.

IntersectionObserver API 的用法简单来说就是两行.
```js 
    var observer = new IntersectionObserver(callback, options);
    observer.observe(target);
```


### **<font color="#C2185">new IntersectionObserver(callback, [option]): </font>**
IntersectionObserver是浏览器原生提供的构造函数
根据元素的可见性的变化, 就会调用观察器的回调函数, 回调函数会触发两次, 一次是目标刚刚进入视口, 另一次是完全离开视口

要点:
1. 通过它创建的构造函数 需要创建变量来接收实例
2. 调用实例对象.observe() 方法 指定要观察的DOM节点
```js  
    let observer = new IntersectionObserver(callback, options);
    
    // 开始观察
    observer.observe(document.getElementById('example'));

    // 停止观察
    observer.unobserve(element);

    // 关闭观察器
    observer.disconnect();
```


### **实例对象身上的方法: **
### **<font color="#C2185">observer.observe(document.getElementById('example')): </font>**
开始观察
observe()的参数是一个 DOM 节点对象.如果要观察多个节点就要多次调用这个方法.
```js 
    observer.observe(elementA);
    observer.observe(elementB);
```

### **<font color="#C2185">observer.unobserve(element);: </font>**
停止观察
取消对某个目标元素的观察延迟加载通常都是一次性的observe 的回调里应该直接调用 unobserve() 那个元素
```js  
    let observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                 entry.target.classList.add('active');

                 // 延迟加载通常都是一次性的
                 observer.unobserve(entry.target);
            }
        })
    })
```

### **<font color="#C2185">observer.disconnect();: </font>**
关闭观察器

**注意:**
IntersectionObserver API 是异步的不随着目标元素的滚动同步触发.规格写明IntersectionObserver的实现应该采用requestIdleCallback()即只有线程空闲下来才会执行观察器.这意味着这个观察器的优先级非常低只在其他任务执行完浏览器有了空闲才会执行.



### **<font color="#C2185">new IntersectionObserver(callback, [option]): </font>**
该方法接受两个参数: 回调函数callback和配置对象options.
当 目标元素的可见性变化时就会调用观察器的回调函数callback.
<!-- 
    callback会触发两次.一次是目标元素刚刚进入视口(开始可见)另一次是完全离开视口(开始不可见)
 -->

### **<font color="#C2185">callback中的参数1. entries:  : </font>**
        是一个数组, 里面的元素为被观察的对象
<!-- 
    如果同时有两个被观察的对象的可见性发生变化entries数组就会有两个成员.
 -->

### **<font color="#C2185">entry对象: </font>**
该对象是 需要通过 遍历 entries 数组 然后在回调中指定entry 才能使用
```js
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        console.log(entry)
    })
}, {})
```

每一个对象身上还有 entry对象 用于提供目标元素的信息(在回调中使用可以得到被观察元素的信息) 
一共有6个属性

```js 
    {
        time: 3893.92,
        rootBounds: ClientRect {
            bottom: 920,
            height: 1024,
            left: 0,
            right: 1024,
            top: 0,
            width: 920
        },
        boundingClientRect: ClientRect {
            // ...
        },
        intersectionRect: ClientRect {
            // ...
        },
        intersectionRatio: 0.54,
        target: element
    }
```

### **属性解析: **
entry.target:   
被观察的目标元素是一个 DOM 节点对象


entry.rootBounds:
容器元素的矩形区域的信息
getBoundingClientRect()方法的返回值
如果没有根元素(即直接相对于视口滚动)则返回null


entry.boundingClientRect:
目标元素的矩形区域的信息


entry.intersectionRect:
目标元素与视口(或容器元素)的交叉区域的信息


entry.isIntersecting:
如果是true 则表示元素从视区外进入视区内.


entry.intersectionRatio: 0 到 1 的数值
目标元素的可见比例
即intersectionRect占boundingClientRect的比例 完全可见时为1 完全不可见时小于等于0


entry.time:     
可见性发生变化的时间是一个高精度时间戳单位为毫秒



### **callback中的参数2 创建的实例对象 observer: **
```js  
    var observer = new IntersectionObserver(
        (entries, observer) => {
            console.log(entries);
        }
    );
```

**要点:**
1. 在合适的位置上操作元素的话 需要用到 entry.target 属性 它是一个DOM节点

2. 这个回调内部逻辑一上来就会执行一次然后目标元素再次进入视口和离开视口的时候都会再触发一次

所以 内部使用 entry.isIntersecting 来进行判断下比较好 当元素进入视口后 执行什么逻辑
```js  
    let observer = new IntersectionObserver((entries, observer) => {
        console.log("我进来了")
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                entry.target.style.background = "pink"
            } else {
                entry.target.style.background = ""
            }
        })
    }, {threshold: [0.25]})

    observer.observe($(".box")[0])
```


因为它会触发两次回调函数 为了解决这个问题 我们可以 当元素进入的时候就添加样式 随后下一行就移除监视
```js
eventBind() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("is-show")

          // 为了解决两次回调的问题 刚添加样式后就移除样式
          observer.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: "0px 0px",
      threshold: 0,
      root: null,
    })

    Array.prototype.forEach.call(this.title, (element) => {
      observer.observe(element)
    })
  }
```


### **option参数 intersection(function(){}, {option}): **
### **option配置对象中的属性: **

### **<font color="#C2185">threshold: : </font>**
决定了什么时候触发回调函数, 即元素进入视口(或者容器元素)多少比例时执行回调函数.
它是一个数组, 默认值为0 (目标元素与视口交叉面积大于多少时, 触发回调)

要点: 元素的比例
目标元素在容器中显示了多少? 在指定值的时候分别触发
<!-- 
    它是一个数组每个成员都是一个门槛值默认为[0]即交叉比例(intersectionRatio)达到0时触发回调函数.
 -->
<!-- 
    {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    }

    默认值为0, 当为1时, 元素完全显示后触发回调函数

    如果threshold属性是0.5 当元素进入视口50%时触发回调函数.
    如果值为[0.3, 0.6] 则当元素进入30％和60％是触发回调函数.

    用户可以自定义这个数组.
    比如上例的[0, 0.25, 0.5, 0.75, 1]就表示当目标元素 0%、25%、50%、75%、100% 
    可见时会触发回调函数.
 -->


### **<font color="#C2185">root: : </font>**
IntersectionObserver不仅可以观察元素相对于视口的可见性还可以观察元素相对于其所在容器的可见性.容器内滚动也会影响目标元素的可见性

root属性指定目标元素所在的容器节点.
<!-- 
    它有很多后代元素想要做的就是判断它的某个后代元素是否滚动进了自己的可视区域范围.这个 root 参数就是用来指定根元素的默认值是 null.

    如果它的值是 null根元素就不是个真正意义上的元素了而是这个浏览器窗口了可以理解成 window但 window 也不是元素(甚至不是节点).这时当前窗口里的所有元素都可以理解成是 null 根元素的后代元素都是可以被观察的.
 -->

<!-- 
    var opts = {
        root: document.querySelector('.container'),
        rootMargin: '0px 0px -200px 0px'
    };

    var observer = new IntersectionObserver(
        callback,
        opts
    );

    表示容器的下边缘向上收缩200像素导致页面向下滚动时目标元素的顶部进入可视区域200像素以后才会触发回调函数.

    这样设置以后不管是窗口滚动或者容器内滚动只要目标元素可见性变化都会触发观察器
 -->

### **<font color="#C2185">rootMagin: : </font>**
root如果代表视口 那么进去视口则进入的观察范围, rootMagin用来扩展, 或缩小观察范围, 正值为扩大, 负值为缩小

它的写法类似于 CSS 的margin属性比如0px 0px 0px 0px依次表示 top、right、bottom 和 left 四个方向的值.

减小根元素下方的观察范围, rootMagin:'0 0 -10% 0' 能变相的提高显示基线
<!-- 
    这个 API 的主要用途之一就是用来实现延迟加载那么真正的延迟加载会等 img 标签或者其它类型的目标区块进入视口才执行加载动作吗？显然那就太迟了.我们通常都会提前几百像素预先加载rootMargin 就是用来干这个的.
 -->

### **基本用法解析: **
```js  
    let observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){
            if(entry.isIntersecting){
                entry.target.classList.add('active');
            }
        })
    }, {
        threshold:[1]
    });


    document.querySelectorAll('.box').forEach(function(value){
        observer.observe(value);
    })
```

1. 首先创建实例对象, observer
2. 在回调函数中传递目标元素数组形参 entries
3. 在回调内部 遍历数组 并传入 entry形参
4. 判断 目标元素是否进入可视区域 如果进入 则添加什么效果
5. option传入对象 threshold 1



### **图片的懒加载: **
我们希望某些静态资源(比如图片)只有用户向下滚动它们进入视口时才加载这样可以节省带宽提高网页性能.这就叫做“惰性加载”.

1. 图像的 HTML 代码可以写成下面这样.
```js 
    // 图像默认显示一个占位符 data-src属性是惰性加载的真正图像.
    <img src="placeholder.png" data-src="img-1.jpg">
    <img src="placeholder.png" data-src="img-2.jpg">
    <img src="placeholder.png" data-src="img-3.jpg">
```

 - 2. 只有图像开始可见时才会加载真正的图像文件.
```js  
    function query(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    var observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            });
        }
    );

    query('.lazy-loaded').forEach(function (item) {
        observer.observe(item);
    });
```


### **下拉加载更多: **
随着网页滚动到底部不断加载新的内容到页面它的实现也很简单.
```js  
    var intersectionObserver = new IntersectionObserver(
        function (entries) {
            // 如果不可见就返回
            if (entries[0].intersectionRatio <= 0) return;
            loadItems(10);
            console.log('Loaded new items');
        }
    );

    // 开始观察
    intersectionObserver.observe(
        document.querySelector('.scrollerFooter')
    );
```
无限滚动时最好像上例那样页面底部有一个页尾栏(又称sentinels上例是.scrollerFooter).一旦页尾栏可见就表示用户到达了页面底部从而加载新的条目放在页尾栏前面.否则就需要每一次页面加入新内容时都调用observe()方法对新增内容的底部建立观察.


### **视频自动播放: **
下面是一个视频元素希望它完全进入视口的时候自动播放离开视口的时候自动暂停.
<!-- 
    <video src="foo.mp4" controls=""></video>
 -->

```js 
let video = document.querySelector('video');
let isPaused = false;

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio != 1  && !video.paused) {
      video.pause();
      isPaused = true;
    } else if (isPaused) {
      video.play();
      isPaused=false;
    }
  });
}, {threshold: 1});

observer.observe(video);
```
上面代码中IntersectionObserver()的第二个参数是配置对象它的threshold属性等于1即目标元素完全可见时触发回调函数.

<br>

# MutationObserver
监听一个普通 JS 对象的变化我们会用 Object.defineProperty 或者 Proxy

```js
const person = new Proxy({}, {
    set(obj, prop, value) {
        console.log("set", prop,value)
        obj[prop] = value

        return true
    }
})

person.name = guang
```

### **作用: **
而*监听元素的属性和子节点*的变化我们可以用 MutationObserver: 

```html
<!-- 我们准备这样一个盒子:  -->
<div id="box"><button>光</button></div>
```

```css
#box {
    width: 100px;
    height: 100px;
    background: blue;

    position: relative;
}
```

我们定时对它做下修改: 
```js
setTimeout(() => {
    box.style.background = 'red';
},2000);

setTimeout(() => {
    const dom = document.createElement('button');
    dom.textContent = '东东东';
    box.appendChild(dom);
},3000);

setTimeout(() => {
   document.querySelectorAll('button')[0].remove();
},5000);
```

2s 的时候修改背景颜色为红色
3s 的时候添加一个 button 的子元素
5s 的时候删除第一个 button.

然后监听它的变化: 
```js
const mutationObserver = new MutationObserver((mutationsList) => {
    // 当节点有变化的时候 会执行回调
    console.log(mutationsList)
});

// 监听 属性 和 子节点
mutationObserver.observe(box, {
    attributes: true,
    childList: true
});
```

创建一个 MutationObserver 对象监听这个盒子的属性和子节点的变化.

mutationsList是一个对象
type: 字符串 可以知道是属性发生了变化 还是 节点发生了变化

addedNodes: 默认值是 NodeList[]
当发生变化的时候 数组里面会有值

removedNodes: 默认值是 NodeList[]

<br>

# ResizeObserver
窗口我们可以用 addEventListener 监听 resize 事件那元素呢？
*元素可以用 ResizeObserver 监听大小的改变*当 width、height 被修改时会触发回调.

除了元素的大小、可见性、属性子节点等变化的监听外还支持对 performance 录制行为的监听

我们准备这样一个元素: 
```html
<div id="box"></div>
```

```css

#box {
    width: 100px;
    height: 100px;
    background: blue;
}
```

在 2s 的时候修改它的高度: 
```js
const box = document.querySelector('#box');

setTimeout(() => {
    box.style.width = '200px';
}, 3000);
```

然后我们用 ResizeObserver 监听它的变化: 
```js
const resizeObserver = new ResizeObserver(entries => {
    console.log('当前大小', entries)
});

resizeObserver.observe(box);
```

target属性:
监听的元素

contentRect属性
这个元素的详细信息

<br>

# 零散小方法

### **判断是否是数组还是对象: **
### **<font color="#C2185">Object.prototype.toString.call(目标对象): </font>**
```js
function checkType(target) {

  let info = {
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Boolean]": "boolean",
    "[object Function]": "function",
    "[object String]": "string",
    "[object Number]": "number",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
  }

  return info[Object.prototype.toString.call(target)]
}
```

<br>

### **全屏 和 退出全屏: **
### **<font color="#C2185">documentElement.requestFullscreen(): </font>**
### **<font color="#C2185">document.exitFullscreen();: </font>**
全屏和退出全屏的方法不在一个元素上哦

```js 
    fullScreen() {
        this.isFullscreen = true
        if(this.isFullscreen) {
            // 打开全屏
            let documentElement = document.documentElement
            if(documentElement.requestFullscreen) {
                documentElement.requestFullscreen()
            } else if (documentElement.mozRequestFullScreen) {
                documentElement.mozRequestFullScreen()
            } else if(documentElement.webkitRequestFullScreen) {
                documentElement.webkitRequestFullScreen()
            }
        }
    }

    exitFullScreen() {
        this.isFullscreen = false
        if(document.exitFullscreen) {
            document.exitFullscreen()
        }
    }
```

<br>

### **<font color="#C2185">delete 对象: </font>**
删除对象中的属性
```js 
    delete req.session['id']
```

删除数组中的指定元素
```js 
    let arr = [1, 2, 3]
    delete arr[1]
    console.log(arr)        [1, empty, 3]
```

<br>

### **<font color="#C2185">数字对象.toFixed(2): </font>**
保留几位小数
会四舍五入

该方法会将结果转为字符串型 但是不会影响原数据
```js  
    let num = 1.123
    let res = num.toFixed(2)
    console.log(typeof num.toFixed(2))      // string
```

<br>

### **<font color="#C2185">元素对象.setCapture(): </font>**
针对鼠标按下事件
设置btn01对鼠标按下的相关的事件进行捕获 不管点击谁都显示元素对象身上的事件
<!-- 
    该方法是针对鼠标按下事件的一种解决方案
    不管点击谁 都会触发元素对象身上的事件(点击事件)
 -->
只有ie支持但是在火狐中调用时不会报错, 而如果在chrome调用 会报错

使用的时候要先进行判断
```js  
    if(box1.setCapture){
        box1.setCapture();
    }

    box1.setCapture && box1.setCapture();
```
<!-- 
    我们去拖拽一个网页中的内容时浏览器会默认去搜索引擎中去搜索内容, 此时会导致拖拽功能异常这个是浏览器提供的默认行为 
    
    如果不希望发生这个行为则可以通过return false 来取消默认行为
    最简单的方式在onmousedown的最后来个return false;, 
    
    但是ie8 不起作用 这时候我们就需要使用, 元素对象.setCapture()
 -->


### **<font color="#C2185">元素对象.releaseCapture();: </font>**
取消对事件的捕获

当调用一个元素的setCapture()方法以后这个元素将会把下一次所有的鼠标按下相关的事件捕获到自身上 触发自己身上的事件

<!-- 
    比如:即使按下按钮2 也会提示alert1 
    换个说法 我给btn01设置完setCapture以后 btn01就像一个强盗一样 它把所有鼠标点击的事件都抢过来, 虽然页面上我点的02

    但btn01设置了setCapture就说 点02就相当于点我 所以弹出了1

    因为btn02的事件被btn01捕获了, 更横的是 不光点按钮鼠标进行的点击相关所有事件都被btn01抢过来显示1了 
-->

因为setCapture是针对鼠标点击 按下等事件 解决ie浏览器的默认行为的现象
那我们可以在鼠标抬起的时候解绑setCapture
```js 
    document.onmouseup = function(){
        document.onmousemove = null;

        // 当鼠标抬起的时候 两种方式都可以
        document.releaseCapture?
        canvas
        document.releaseCapture && document.releaseCapture();
    };
```

<br>

### **<font color="#C2185">confirm(): </font>**
用于弹出一个带有确认和取消按钮的提示框需要一个字符串作为参数
该字符串作为提示文字显示出来
    确定返回true
    取消返回false
```js 
    let result = confirm('确定要点击么');
    console.log(result);
```

<br>

### **<font color="#C2185">prompt()可以弹出一个输入框: </font>**
该提示框中会有一个文本框用户可以在文本框中输入一段内容
该函数需要一个字符串作为参数该字符串将会作为提示框的提示文字

这个函数的返回值是String类型的

```js 
    // 用户输入的内容将会作为函数的返回值返回可以定义一个变量来接受该内容
    var score = prompt("提示内容"); 
```

<br>

### **<font color="#C2185">isNaN(): </font>**
这个方法用来 判断非数字, 并且返回一个值, 
如果是数字        false, 
如果不是数字      true

原理: 
它是判断一个值能否被 Number() 合法地转化成数字.
如果能转化那就算做是数字, 所以isNaN()的结果会是 false

### **1. 数字形式的字符串.: **
    例如 "123"、"-3.14" 虽然是字符串型
    但被 isNaN() 判为数字 返回 false.("12,345,678""1.2.3" 这些返回 true)

### **2. 空值.: **
    null、 空字符串""、 空数组[] 都可被Number()合法的转为0
    于是被isNaN认为是数返回false.
            
    但是 (undefined、空对象{}、空函数等无法转数字返回true) ！！！

### **3. 布尔值.: **
    Number(true)=1, 
    Number(false)=0 所以isNaN对布尔值也返回false.

### **4. 长度为 1 的数组.: **
    结果取决于其中元素即: isNaN([a])=isNaN(a)可递归.
    例如isNaN([["1.5"]])=false.

### **5. 数字特殊形式: **
    例如"0xabc"、"2.5e+7"这样的十六进制和科学计数法即使是字符串也能转数字所以也返回false.


### **<font color="#C2185">Math.sqrt(): </font>**
可以通过Math.sqrt()对一个数进行开方
<!-- 
    var result = Math.sqrt(4);
    console.log(result);        //值为2 
-->


### **<font color="#C2185">console.time("") 和 console.timeEnd(""): </font>**
开发代码的过程中我们要考虑提升性能也就是提升处理速度
console.time / timeEnd 用来测试花费的毫秒数可以用来测试性能
它需要一个字符串作为参数这个字符串将会作为计时器的标识 或者理解为计时器的name
<!-- 
    console.time("test");开始
    +
    程序
    +
    console.timeEnd("test");停止
 -->
    

### **<font color="#C2185">for...in -- 枚举(遍历)对象中的属性: </font>**
语句: 

    for(let 变量 in 对象) {
        
    }
```js  
    for(let key in obj) {
        console.log(key)
    }
```

for...in语句 对象中有几个属性循环体就会执行几次, 每次执行时会将对象中的一个属性的名字赋值给变量
```js  
    var obj = {
        name:"sunwukong",
        age:18,
        gender:"男",
        address:"花果山"
    }

    for(var n in obj){
        console.log(obj[n]);       
        // []的特点就是可以传变量假如直接写obj.n的话就是在obj中找叫n的属性 
    }
```

key         -- >     属性名
obj[key]    -- >     属性值



### **<font color="#C2185">in 运算符: : </font>**
通过该运算符可以检查一个对象中是否含有指定的属性
如果有返回true没有返回false
语法: 

    "属性名" in 对象
<!-- 
    检查obj中是否含有test2这个属性: 
    console.log("test2" in obj);
-->
    

### **<font color="#C2185">instanceof 运算符: </font>**
使用instanceof可以检查一个对象是否是一个类的实例
```js  
    class Demo {
        name = "sam"
    }
    let d = new Demo()
    console.log(d instanceof Demo)      // true
```


比如我们可以利用instanceof来判断一个对象是不是数组
```js  
    console.log(arr instansof Array) 

    function checkType(target) {
        return target instanceof Array
    }
    
    let arr = []
    let obj = {}
    let res = checkType(obj)
    console.log(res)            // false
```

### **<font color="#C2185">对象 instanceof 构造函数: </font>**
检查这个对象是不是这个构造函数的实例, 是为true否为false 

**注意:**
所有的对象都是object的后代所以任何对象和object做instanceof检查时都会返回true 
<!-- 
    console.log(per instanceof Person);
-->


### **<font color="#C2185">Array.isArray(arr): </font>**
是返回true 不是false 这个方法会优先于instanceof
H5新增 ie9以上才支持

<br>

# JS
一种运行在客户端的脚本语言(script是脚本意思)
脚本语言不需要编译, 运行过程中有js解释器来逐行来进行解释并执行

### **JS能做的事情: **
表单的动态校验(密码强度检测)
网页特效
服务器开发(Node.js)
桌面程序(Electron)
APP(Cordova)
控件硬件-物联网(Ruff)
游戏开发(cocosd.js)

<br>

# 浏览器执行JS简介
浏览器分为两个部分, 渲染引擎 和 JS引擎

### **渲染引擎: **
用来解析HTML CSS 俗称内核, 比如chrome浏览器的blink 老版本的webkit

### **JS引擎: : **
也成为JS解释器, 用来读取网页中的js代码, 对其处理后运行, 比如chrome浏览器的v8
浏览器本身并不会执行js代码, 而是通过内置js引擎(解析器)来执行js代码,
    
js引擎执行代码时逐行解释每一句源码转换为机器语言, 然后由计算机去执行 所以js语言归为脚本语言, 会逐行解释执行

<br>

# 解释型语言 编译型语言
计算机是不能直接理解任何除机器语言以外的语言, 所以必须要把程序员所写的程序语言翻译成机器语言才能执行程序, 程序语言翻译成机器语言的工具, 被称为翻译器

编程语言 -> 翻译器 -> 机器语言(二进制)

翻译器翻译的方式有两种: 
    一种是编译(java)
    一种是解释(js)
    
两种方式之间的区别在于翻译的时间点不同

编译器在代码执行之前进行编译, 生成中间代码文件 比如.class字节码文件
解释器是在运行时进行及时解释, 并立即执行(当编译器以解释方式运行的时候, 也称之为解释器)
<!-- 
    编译语言: 先把所有的菜做好, 才能上桌吃饭
    解释语言: 好比吃火锅, 边吃边涮, 同时进行
 -->

<br>

# 标识符 关键字 保留字

### **标识符(不能是关键字 或 保留字): **
就是指开发人员为变量 属性 函数 参数取的名字

### **关键字: **
是指js本身已经使用了的字 不能再用他们充当变量名 方法名
<!-- 
    break case catch continue default delete do else等
 -->

### **保留字: **
预留的关键字, 意思是现在虽然还不是关键字, 但是未来可能会成为关键字, 同样不能使用他们当变量名 或 方法名
<!-- 
    boolean byte char class const debugger double enum export
    fimal float goto等 
 -->

<br>

# 表达式 和 返回值
### **表达式: 是由数字 运算符 变量等组成的式子: **
是由数字, 运算符 变量等以能求得数值的有意义排列方法所得的组合

### **返回值: **
表达式最终都会有一个结果, 返回给我们, 我们称为返回值
等式的右边表达式计算完毕把返回值给左边

<br>

# JS的组成
ES5
DOM
BOM

<br>

# 变量
变量就是一个装东西的盒子
变量是用于存放数据的容器, 我们通过变量名来获取数据, 修改数据

变量可以保存字面量而且变量的值是可以任意改变的
变量更加方便使用所以在开发中我们都是通过变量去保存一个字面量

### **变量本质: **
变量是程序在内存中申请的一块用来存放数据的空间, 每次创建变量都会创建一个空间
<!-- 
    比如去酒店住, 空间就相当于房间, 房间号相当于变量名
 -->

### **变量的使用: **
声明变量 和 赋值

### **声明变量 & 赋值: : **
在js中使用 var关键字 来声明一个变量 variable
使用关键字声明变量后, 计算机会自动为变量分配一个内存空间

    var a;              // 声明一个变量但是没有值.
    a = 123;            // 给a赋值.

### **变量的初始化: **
声明一个变量的同时赋值 叫做变量的初始化

    var b = 789;        // 或者在声明变量的同时赋值  

很多情况下对于单纯的数字来讲没办法知道它所表达的含义是什么所以可以通过变量给字面量进行描述.


### **变量的修改(更新): **
一个变量被重新赋值后, 它原有的值就会被覆盖, 以最后一次的为准
在原有的空间里修改, 不会新创建变量(房间)


### **声明多个变量: **

    let age = 18, 
        address = '火影村',
        gz = 2000;


### **声明变量的特殊情况: **
只声明没有赋值, 结果是:   undefined
不声明不赋值, 结果是:     报错
不声明直接赋值, 结果是:   会成为全局变量可以使用, 不推荐


### **变量的命名规范: **
在js中所有的可以由我们自主命名的都可以成为标识符
1.标识符可以含有字母数字_ $
2.标识符不能以数字开头
3.标识符不能是JS中的关键字或者是保留字
4.标识符一般都采用驼峰命名法
5.严格区分大小写

<br>

# 数据类型: 
在计算机中, 不同的数据所需占用的存储空间是不同的, 为了把数据分成所需内存大小不同的数据, 充分利用储存空间, 于是定义了不同的数据类型
<!-- 
    一个瘦的人睡单人床, 一个胖的人睡双人床, 占用的空间大小是不一样的
 -->

也就是说 数据都是要占用内存的 我们设置数据类型是为了给对应类型的分配所需内存


### **变量的数据类型: **
变量是用来存储值的所在处, 它们有名字和数据类型, 变量的数据类型决定了如何将代表这些值的位存储到计算机的内存中

js是一种弱类型或者说动态语言, 这意味着不用提前声明变量的类型, 在程序运行过程中, 类型会自动确定

js的变量数据类型是只有*程序在运行过程中*, *根据等号右边的值来确定的*
```js
    // 当 = 后是10的时候才知道 num的数据类型是什么
    let num = 10;
```

指的就是字面量的类型在js种一共有7种数据类型

    String      字符串   
    Number      数值
    Boolean     布尔值
    Null        空值
    Undefined   未定义

    Object      对象

前5个是属于基本数据类型Object属于引用数据类型.

对以往的数据类型总结  USONB  you are so niubility
    - u = undefined
    - s = string symbol
    - o = object
    - n = null number
    - b = boolean 

<br>

# 数字型 Number
在js中所有的数值都是Number类型包括整数和浮点数(小数)

数字型进制:
二进制, 八进制, 十六进制


### **八进制: : **
我们程序里面*数字前面加0*, 表示8进制, 
位数: 0 ~ 7

```js
    let num = 010;
    console.log(num);
/*
    010 八进制转换为10进制 就是 8
    0 1 2 3 4 5 6 7 数字8的时候该进位了 10
    7 再加1 需要进位 个位变为0 十位为1 所以是10 八进制前面要加0 最后为010
*/

```


### **十六进制: : **
数字的*前面加0x*, 表示16进制, 
位数: 0 ~ 9 a ~ f

```js
    let num = 0x9;
    console.log(num);    // 9

    num = oxd
    console.log(num)    // 13
```


### **js中数值的最大 和 最小值: **
Number.MAX_VALUE      1.7976931348623157e+308
Number.MIN_VALUE      5e-324

Number.MAX_VALUE 数字的最大值是 Number.MAX_VALUE是保存最大值的常量
Number.MIN_VALUE 大于0的最小值


### **数字型的三个特殊值 (常量): **
Infinity      代表无穷大
-Infinity     代表无穷小
NaN           Not a number 不是一个数字

```js
    console.log(Infinity)       // Infinity
```

如果使用Number表示的数字超过了最大值
```js
    Number.MAX_VALUE * Number.MAX_VALUE  //最大值x最大值
```

则会返回一个
    Infinity  表示正无穷        // Infinity就是一个字面量
    -Infinity 表示负无穷


### **<font color="#C2185">NaN: </font>**
是一个特殊的数字表示 Not A Number 
表示非数字NaN也是字面量, 也属性数值类型

**注意:**
在js中正数的运算基本可以保证精确但如果使用js进行浮点数运算可能会得到一个不精确的结果.千万不要用js进行精确度比较高的运算

比如: 钱
```js
    var c = 0.1 + 0.2;
    console.log(c);     // 结果是: 0.30000000000000004
```


### **<font color="#C2185">BigInt 整型: </font>**
BigInt是一种特殊的数字类型, *它支持任意长度的整数*.
在对大整数执行数学运算时以任意精度表示整数的能力尤为重要.使用 BigInt 整数溢出将不再是问题.

 
对于学过其他语言的程序员来说JS中缺少显式整数类型常常令人困惑.
许多编程语言支持多种数字类型如浮点型、双精度型、整数型和双精度型 但JS却不是这样.在JS中按照IEEE 754-2008标准的定义所有数字都以双精度64位浮点格式表示.

在此标准下无法精确表示的非常大的整数将自动四舍五入. 确切地说 JS 中的 Number类型只能安全地表示 
        
        -9007199254740991(-(2^53-1)) 和 9007199254740991(2^53-1)
        
之间的整数任何超出此范围的整数值都可能失去精度.
该整数大于JS Number 类型所能表示的最大整数因此它被四舍五入的.意外四舍五入会损害程序的可靠性和安全性.

\\ Number.MAX_SAFE_INTEGER  常量表示 最大安全整数
\\ Number.MIN_SAFE_INTEGER  常量表示 最小安全整数



### **<font color="#C2185">BigInt 创建: </font>**
利用末尾的n 标识 BigInt 类型吧

### **1. 在整数末尾 追加 n: **
```js
let bigNum1 = 12n
let bigNum2 = 33n

console.log(bigNum1 + bigNum2)  // 45n
```

### **2. 用 BigInt()构造函数: **
参数:
数字 | 数字型字符串
参数不用手动加n

```js
let bigNum3 = BigInt("33")
console.log(bigNum3)  // 33n

BigInt("10");    // → 10n	
BigInt(10);      // → 10n	
BigInt(true);    // → 1n

// 无法转换的数据类型和值会引发异常:
BigInt(10.2);     // → RangeError	
BigInt(null);     // → TypeError	
BigInt("abc");    // → SyntaxError

// 可以直接对使用构造函数创建的 BigInt执行算术操作
BigInt(10) * 10n;    // → 100n

// 使用严格相等运算符的操作数时使用构造函数创建的 Bigint与常规 Bigint的处理方式类似
BigInt(true) === 1n;    // → true
```


**要点:**
1. BigInt文字也可以用二进制 八进制 十六进制表示
```js
console.log(0b888776666n)
console.log(0x888776666n)
console.log(0o888776666n)
console.log(04888776666n)
```

2. 不能使用严格相等运算符将 BigInt与常规数字进行比较因为它们的类型不同: 
```js
console.log(10n === 10)     false
console.log(typeof 10n)     // bigint
console.log(typeof 10)      // number
```

3. 可以使用等号运算符它在处理操作数之前执行隐式类型转换
```js
console.log(10n == 10)      true
```

4. 除一元加号(+)运算符外所有算术运算符都可用于 BigInt
```js
    10n + 20n;    // → 30n	
    10n - 20n;    // → -10n	


    +10n;         
            // → TypeError: Cannot convert a BigInt value to a number	


    -10n;         // → -10n	
    10n * 20n;    // → 200n	
    20n / 10n;    // → 2n	
    23n % 10n;    // → 3n	
    10n ** 3n;    // → 1000n	
    const x = 10n;	
    ++x;          // → 11n	
    --x;          // → 9n
```
<!-- 
    不支持一元加号( +)运算符的原因是某些程序可能依赖于 +始终生成 Number的不变量或者抛出异常. 更改 +的行为也会破坏 asm.js代码.
 -->


5. 与 BigInt操作数一起使用时算术运算符应该返回 BigInt值.因此除法(/)运算符的结果会自动向下舍入到最接近的整数.例如:
```js
25 / 10;      // → 2.5	
25n / 10n;    // → 2n
```

6. 因为隐式类型转换可能丢失信息所以不允许在 bigint和 Number 之间进行混合操作.
```js
let bigNum1 = 12n
console.log(bigNum1 + 1)    
    // 报错: Cannot mix BigInt and other types, use explicit conversions
```

7. BigInt不能传递给 Web api 和 内置的 JS 函数
这些函数需要的是一个 Number 类型的数字.我们传递 BigInt类型的情况下会报错TypeError错误
```js
Math.max(2n, 4n, 6n);    // → TypeError
```

8. 请注意关系运算符不遵循此规则如下例所示: 
```js
10n > 5;    // → true
```

9. 如果希望使用 BigInt和 Number 执行算术计算
首先需要确定应该在哪个类型中执行该操作.
为此只需通过调用 Number()或 BigInt()来转换操作数: 
```js
BigInt(10) + 10n;    // → 20n	
// or	
10 + Number(10n);    // → 20
```

10. 当 Boolean 类型与 BigInt 类型相遇时 BigInt的处理方式与 Number类似
换句话说只要不是 0n BigInt就被视为 truthy 的值:  (0: false, 1: true)
```js
if (5n) {	
    // 这里代码块将被执行	
}	
if (0n) {	
    // 这里代码块不会执行	
}
```

11. 排序 BigInts 和 Numbers 数组时不会发生隐式类型转换: 
```js
const arr = [3n, 4, 2, 1n, 0, -1n];	
arr.sort();    // → [-1n, 0, 1n, 2, 3n, 4]
```

12. 位操作符如 | & << >> 和 ^ 对 Bigint的操作方式与 Number类似.
下面是一些例子
```js
90 | 115;      // → 123	
90n | 115n;    // → 123n	
90n | 115;     // → TypeError
```


### **<font color="#C2185">BigDecimal(): </font>**
js中没有这个类 如果需要使用的话 还需要安装对应的js库


### **相关的js库有: **
Math.js
用于 JavaScript 和 Node.js 的扩展数学库。
它具有支持符号计算的灵活表达式解析器, 大量内置函数和常量, 并提供了集成的解决方案来处理不同的数据类型, 例如数字, 大数, 复数, 分数, 单位和矩阵。强大且易于使用。


decimal.js
JavaScript 的任意精度的十进制类型。

big.js
一个小型, 快速, 易于使用的库, 用于任意精度的十进制算术运算。

bignumber.js
一个用于任意精度算术的 JavaScript 库。

<br>

# 字符串型 String
在js中的字符串需要使用引号引起来 推荐使用单引号

    var str = "hello";
    str = "还可以修改已赋值的字面量";


### **字符串转义符 \: **
类似HTML中的特殊符号, 字符串中也有特殊字符, 我们称之为转义符
在字符串中我们可以使用\作为转义字符 当表示一些特殊符号时可以用 \ 进行转义

    \"
    \'
    \n  表示换行
    \t  表示制表符
    \\  自己转义自己 是\
    \b  表示退格符
    \r  表示回车

```js 
    // 字符串转移字符, 都是用 \ 开头 但是这些转义字符写到引号里面
    console.log("今天天气\n真不错！！！")
```


### **str.length 字符串的长度 : **
字符串是由若干字符组成的, 这些字符的数量就是字符串的长度, 通过字符串的属性length可以获取整个字符串的长度


### **字符串的拼接 '' + (数值相加, 字符相连): **
多个字符串之间可以用 + 进行拼接, 拼接方式 字符串 + 任意类型 = 拼接之后的字符串
拼接前会把与字符串相加的任何类型转为字符换, 再拼接成一个新的字符串


### **技巧: **
字符串中拼接变量 *引引加加*
```js
    let age = 33
    let msg = 'pink老师今年' + age + '岁'
```

<br>

# 布尔型 Boolean
布尔值只有两个用来进行逻辑判断

    true    - 表示 真
    false   - 表示 假

布尔值在进行加法运算时 
    true  当 1
    false 当 0  

<br>

# Null 空值: 
这个类型的值 只有一个 就是null
null这个值专门用来表示一个为空的对象

**注意:**
使用typeof检查null值时会返回object

```js
    // 一个声明变量给null值, 里面存的值为空
    var x = null;
    console.log(x);                 //null的值为 null
    console.log(typeof x);          //null的对象类型是 Object

    let x = null;
    console.log(x + 1);             // 1 因为null为空
```

<br>

# Undefined 未定义:
这个类型的值 只有一个 就是undefined
当我们*声明一个变量* 但*不*给这个变量*赋值*时它的值就是undefined

```js
    let a = undefined;
    console.log(a + '123')      //undefined123  拼串
```

<br>

# typeof
可以使用一个运算符typeof来检查 一个变量 的类型.

### **<font color="#C2185">语法:  typeof 变量名: </font>**
```js
    console.log(typeof a);
```

返回值:
小写类型字符串

检查字符串时      
        会返回string

检查数字时        
        会返回number

检查布尔时        
        会返回boolean

检查null时        
        会返回object

检查undefined     
        会返回undefined

<br>

# 字面量
字面量是在源代码中一个固定值的表示法, 通俗来说, 就是字面量表示如何表达这个值
数字字面量:   8 9 10
字符串字面量:  '黑马程序员'
布尔值字面量: true false

<br>

# 强制的类型转换:
指将一个数据类型强制转换为其他的数据类型
类型转换主要指将其他的数据类型转换为 String Number Boolean (5种基本数据类型中的前三种 最后两种是null undefined)

### **场景: : **
使用表单, prompt获取过来的数据默认是字符串类型的, 
此时就不能直接简单的进行加法运算, 需要转换变量的数据类型

经常转换的3种类型:
    - 转换为 字符串型
    - 转换为 数字型
    - 转换为 布尔型

<br>

# 转换为 String: 
### **方式一:  toString(): **
通过 目标数据 调用toString()方法

该方法不会改变原变量的类型, *它会将转换的结果返回*
```js
let num = 1
let res = num.toString()

console.log(typeof num)   // number
console.log(typeof res)   // string

// 可以赋值回去
num = num.toString()
```

**注意:**
null和undefined这两个值没有toString()方法如果调用他们的方法会报错


### **<font color="#C2185">扩展: Number类型数据.toString(进制数): </font>**
使用toString()对 数字 进行转换时, 可以在()中传递一个整数作为参数
它将会把数字转换为指定的进制, 如果不指定则*默认转换为10进制*
```js
    var a = 255;
    a = a.toString(2);

    console.log(a);
    console.log(typeof a);
```

<br>

### **<font color="#C2185">方式二: String(变量): </font>**
调用 String() 函数并将被转换的数据作为参数传递给函数
使用String()函数做强制转换时对于Number和Boolean实际上就是调用的toString()方法 


**注意:**
1. 这种方式可以改变 null 和 undefined 这个类型
```js
let data1 = undefined
let data2 = null

data1 = String(data1)
console.log(data1, typeof data1)  // undefined string

data2 = String(data2)
console.log(data2, typeof data2)  // null string
```

2. String() 能转换数组 但不能转换对象
```js
// 1维数组 -> 字符串
let arr = [1,2,3]
arr = arr.toString()
console.log(arr)

arr = String(arr)
console.log(arr)    // 1,2,3

// 2维数组 -> 被展开了 成 字符串
let arr2 = [[1,2,3], [4,5,6]]
arr2 = String(arr2)
console.log(arr2)   // 1,2,3,4,5,6

// 利用 split() 再转为 1维数组
let ret = arr2.split(",")
console.log(ret)    // ['1', '2', '3', '4', '5', '6']


// 不能转换对象
let obj = {name: "sam"}
obj = String(obj)
console.log(obj)    // [object Object]
```

<br>

### **<font color="#C2185">方法三: 隐式转换 b = b + "": </font>**
利用任何值和字符串做加法运算时都会先把该值转换为字符串然后再进行运算的原理

    b = b + "";

```js
let arr = [1, 2, 3]
let res = arr + ""
console.log(res)    // 1, 2, 3
```

<br>

# 插入: Number对象身上的方法 
### **<font color="#C2185">num.toPrecision(精度): </font>**
参数:
精度, 也可以理解为 整数和小数一共保留多少位

返回值:
字符串

```js
let num = 12.3323232
num.toPrecision(2)
'12'
num.toPrecision(4)
'12.33'
num.toPrecision(6)
'12.3323'
```

数据处理时, 这两个函数很容易混淆。它们的共同点是把数字转成字符串供展示使用。注意在计算的中间过程不要使用, 只用于最终结果。

不同点就需要注意一下：
toPrecision 
是处理精度, 精度是从左至右***个不为0的数开始数起。

toFixed 
是小数点后指定位数取整, 从小数点开始数起。

当你拿到 1.4000000000000001 这样的数据要展示时, 建议使用 toPrecision 凑整并 parseFloat 转成数字后再显示, 如下：
```js
parseFloat(1.4000000000000001.toPrecision(12)) === 1.4 // True 


let num = 1.4000000000000001
let temp = num.toPrecision(12)

temp
'1.40000000000'

// 后面的0没有了
parseFloat(temp)
1.4
```

num.toPrecision(12)
这是一个经验的选择, 一般选12就能解决掉大部分0001和0009问题, 而且大部分情况下也够用了, 如果你需要更精确可以调高。

### **<font color="#C2185">总结: </font>**
当我们遇到 浮点数的精度的问题的时候
1.4000000000000001
我们可以先通过 num.toPrecision(12) 指定 12
这样可以解决大多数的 0000001 的问题

得到的结果是
'1.40000000000'

然后我们再通过 parseFloat() 提取 这样提取的字符是没有0000的

1.4
 



补充:
parseFloat(字符串数字)
提取小数部分, 会省略掉00000
```js
let num2 = "12.22000"
parseFloat(num2)
12.22
```

<br>

# 转换为 Number

### **<font color="#C2185">方式一: </font>**
### **<font color="#C2185">parseInt(stringnumber, [进制]): </font>**
从一个字符串中 提取整数部分 并转换为Number类型
如果传递进制 stringnumber 被看成2进制进行解析到10进制 取值范围为2-36

```js
let str = "10"
let ret = parseInt(str, 2)
console.log(ret)   // 2

// 因为 10 会看成2进制 解析后展示10进制 2
```

### **<font color="#C2185">parseFloat(): </font>**
从一个字符串中 包含小数部分 并转换为Number类型
使用上述两个方法可以将 一个字符串类型的数字 转换为 对应的 number类型结果


参数1: 
    要被转换的数字

参数2: 
    进制

```js
let str = "123"
let num = parseInt(str)
console.log(num)        // number 123

let str2 = "123.23"
let num2 = parseInt(str2)
console.log(num2)       // number 123 只会提取整数部分

num2 = parseFloat(str2)
console.log(num2)       // 123.23 包含小数部分的字符串被转为number

<br> 进制示例:
// 这是一个字符串接下来把它转成Number数据类型
var a = "070"
a = parseInt(a);

console.log(typeof a);
console.log(a);          // 70

// 所以为了统一我们可以在parseInt()中传递第二个参数 来指定数字的进制
a = parseInt(a, 8)       // 56
```


**注意:**
如果是对 非字符串类型 使用上述方法转换 它会先将其转换为String然后在操作
123: 
    number类型的123 - > 字符串类型的"123" - > 再通过pareseInt()


### **<font color="#C2185">技巧: </font>**
可以使用 isNaN() 来对 parseInt() 和 parseFloat() 的结果做判断看看得到的结果合不合法
```js
    let num = parseInt(prompt("请输入一个数字"))

    if(isNaN(num)) {
        alert("您输入的数字不合法")
    } else {
        console.log(num)
    }
```

<br>

### **<font color="#C2185">方式二:   +(正): </font>**
利用一元运算符 + -正号负号的运算方式可以把非Number类型的数据强制转换为Number
```js
    var a = "123";
    a = +a;
```

<br>

### **<font color="#C2185">方式三:   - * /: </font>**
任何值- * / 运算时都会自动转换为Number, 所以我们可以用 -0*1/1的方式把它们转换为Number.
```js
    var a = "123";
        a = true;
        a = false;
        a = " ";

    a = a - 0;
```

<br>

### **<font color="#C2185">方式四: : </font>**
使用Number()函数它可以转换任意类型的数据

    []        转为 数字 是 0
    ''        转为 数字 是 0
    null      转为 数字 是 0

    *undefined {} 空函数 无法转为数字*

长度为1的数字数组 会被转化为该数字 十六进制   也能转化为数字

<br>

### **<font color="#C2185">规则: </font>**
### **<font color="#C2185">字符串 --> 数字: </font>**
1. 如果是纯数字字符串则直接将其转换为数字           //var a = "123";
2. 如果字符串有非数字内容则转换为NaN               //var a = "12fff3";
3. 如果字符串中是空串或者全是空格的字符串值会是0     //var a = "" 或者 " ";


### **<font color="#C2185">布尔 --> 数字: </font>**
    true    转成 1
    false   转成 0


### **<font color="#C2185">Null --> 数字: </font>**
    结果是0


### **<font color="#C2185">undefined --> 数字: </font>**
    结果是NaN


**注意:**
1. null、空字符串""、空数组[]
        - 都可被Number() 合法的转为0

2. undefined、空对象{}、空函数等   
        - Number() 的结果是NaN

<br>

# 转换为 Boolean

### **<font color="#C2185">方法一:  !运算: </font>**
利用逻辑运算中的 !运算 来对非布尔值进行运算会将会将其转化为布尔值让后进行取反 我们可以利用该特点来将一个其他的数据类型转换为布尔值
    
    !!b

```js
    let flag = 1
    console.log(!flag)      // false
    console.log(!!flag)     // true
```


### **<font color="#C2185">方法二: Boolean()函数: </font>**
代表 空 否定的值会转换为false, 其它的都是true
<!-- 
    // 代表 空 否定的值
    0 null NaN undefined
 -->

```js
var a = 123;
a = Boolean(a);         //调用Boolean()函数来将a转换为布尔值

console.log(type a);    // "boolean"
console.log(a);         // true
```


### **<font color="#C2185">规则: </font>**
### **<font color="#C2185">数字 --> 布尔: </font>**
除了0 和 Nan是false其余的都是true;

### **<font color="#C2185">字符串 --> 布尔: </font>**
除了空串是false其余的都是true

### **<font color="#C2185">Null / undefined--> 布尔  都是false: </font>**


**注意:**
对象也会转换为true
```js
let obj = {name: "sam"}
if(obj) {
    console.log(obj)
}
```

<br>-

# 运算符
运算符也叫作操作符通过运算符可以对一个或者多个值进行运算并获取运算结果
typeof就是一个运算符可以来获得一个值的类型它会将该值的类型以字符串的形式返回

<br>-

# 算数运算符: + - * / %

### **<font color="#C2185">js中常用的运算符: </font>**
-   可以对两个值进行减法运算并 返回一个值
*   可以对两个值进行乘法并 返回一个值
/   可以对两个值进行除法并 返回一个值
%   取模运算(取余数) 9 % 3 = (9除以3取余数余数为0 结果: *0*)

<br>

**要点:**
1. a % b 的时候 如果 a < b 余数就是本身
```js
console.log(3 % 5)  // 3
```

2. 对 浮点数 进行运算 会有问题
```js
console.log(0.1 + 0.2)  // 0.30000000000000004
console.log(0.1 * 0.2)  // 0.020000000000000004
```

原因:
我们不管是做什么最终都会转为2进制的语言
小数已经很小了, 还要转换为2进制 让2进制再进行运算 这时候就会有误差 不仅仅是js java也一样


3. 不能拿着浮点数来进行比较
```js
    let num = 0.1 + 0.2
    console.log(num == 0.3)     //false
```


**注意:**
1. 算数运算符也有优先级 先乘除后加减, 有小括号先算小括号
2. 当对非Number类型的值进行运算时会将这些值转换为Number然后再运算(除了字符串的加法)
3. 任何值和NaN做运算都得NaN


4. 注意拼串
```js
    // 如果对两个字符串进行加法运算 则会进行拼串
    "123"+"456"      //  "123456"
```

<br>

# 递增 递减 运算符
如果需要反复给数字变量添加 或 减去1, 可以使用++ -- 运算符来完成
js中 递增 和 递减 既可以放在变量的前面, 也可以放在变量的后面

放在前面时, 我们称为前置递增(递减)运算符
放在后面时, 我们称为后置递增(递减)运算符

**注意:** 
递增和递减运算符必须和变量配合使用 num++


### **<font color="#C2185">前置递增运算符 ++num (等于原变量自增后的值也就是*新值*): </font>**
就是自加1, 类似num = num + 1
<!-- 
    口诀:
    先自加, 后返回值
 -->

### **<font color="#C2185">后置递增运算符 num++ (等于原变量的值自增前的值也就是*原值*): </font>**
前置自增 和 后置自增如果单独使用效果是一样的
先表达式返回原值, 后面变量再自加1, 也就是说变量永远比表达式大1
<!-- 
    口诀:
    先返回原值, 后自加
 -->

```js 
    let num = 10;
    num++;                      // 11
    let result = num++ + 2;     // num++ 是11(原值), 11+2
    console.log(result);        // 13

    // num++ 单独使用都是自加1, 但是连在一起使用时, num++ + 2  -- >  num++代表的就是原值, 

    ---

    let a = 10;
    let b = a++ + ++a;
    console.log(b);             //22    不是21

    // a++为原值10 --- 这时变量a为11 --- ++a在新值12 --- 最后10+12
```

开发时, 大多使用后置递增, 并且代码独占一行

**注意:**
当 n 的值为 0 的时候 进行++ 是没有意义的 结果还是0
```js
let num = 0
console.log(num++)  // 0
```

<br>

# 比较运算符
两个数据进行比较时所使用的运算符
比较运算后, 会*返回一个布尔值作为比较运算的结果*

    <
    >
    >=
    <=
    ==      判等号(有隐式转换)  只要求值相等
            console.log(18 == '18');    //true

    !=      不等号
    ===     全等 要求值和数据类型都一致
    !==


**注意:**
非数值比较时会将其转换为Number类型然后再比较
NaN不和任和值相等包括它本身


### **<font color="#C2185">总结: </font>**
1. 非数值比较时会将其转换为Number类型然后再比较
2. 任何值和NaN比较都是false
3. 如果符号两侧的值都是字符串时将比较 unicode 编码
<!-- 
    字符串进行比较的时候
    不会将其转换为Number进行比较
    而会分别比较字符串中字符的Unicode编码可以用这种方式排序英文名
 -->
```js
    console.log("a" < "b");
        //比较的是字符编码16进制小a是0061小b是0062

    console.log("abc" < "b"); 
        //比较字符编码时是一位一位进行比较abc
        // 先同时比较左侧位 然后比较中间位(右侧没有中间位所以是false) 最后比较最后位 (如果第一位小 那么后面的也不用看了吧)
```

4. 比较中文时没有意义
*比较两个字符串的数字*可能会得到不可预期的结果*一定要把一个数字字符串转为Number类型*就可以正常比较了
```js
    console.log("1123457654" < "5");    //正常结果是false
    
    console.log("1123457654" < +"5");   //进行Number转换之后才是true
 ```

5. 注意 ==
比较两个值是否相等如果相等会返回true否则会返回false
当使用==来比较两个值时如果值的类型不同则会自动进行类型转换将其转换为相同的类型然后再比较

转换成什么不一定但大部分情况都会转换为数字
undefined 衍生自 null 所以这两个值做相等判断时会返回true


### **<font color="#C2185">场景: </font>**
比如: 网购时的购物车可以填写购买的数量但这时候填写的都是字符串而非数字
这时候可能限制用户的购物量不能超过20, 不能超过最大库存这时候比较可能就会出现问题


### **<font color="#C2185">扩展知识: </font>**
1. 任何对象转换为boolean值都为true
2. undefined null对应的boolean值为false
3. == 操作符不会尝试将左右操作数转换为boolean值后再进行比较

4. 如果 一个值为对象 另一个为数字或字符串 那么会
    - 1. 将对象转换为原始值先使用 *valueOf()* 转化为原始值
    - 2. 不能转换为原始值的再尝试使用 *toString()* 方法转换为原始字符串


>> 目标.valueOf()
该方法会将目标转换为基本类型, 如果无法转换为基本类型则返回原对象.
```js
let num = 123
console.log(num.valueOf())  // 123 因为可以转换为基本数据类型

let val1 = {name: "sam"}
console.log(val1.valueOf()) 
    // 没有办法转换为基本数据类型 所以返回的是 { name: 'sam' }


// 对象 和 数字 进行比较
let val1 = {name: "sam"}
let val2 = 123
console.log(val1 > val2)    // false

// 1. 先将 val1 进行 valueOf() 转换 得到的是 {name: "sam"} 本身
// 2. valueOf()转换不了的会进行 toString() 得到的是 [object Object]
// 3. [object Object]转换为数字 会是 NaN 所以结果就是 NaN
```

<br>

# 逻辑运算符
作用:
用来进行布尔值运算的运算符

返回值:
布尔值

场景:
用于多个条件的判断


    与  &&    and     true && false
    或  ||    or      true || false
    非  !     not     !true           
<!-- !非运算可以将其他数据类型转换为布尔 !!b -->

<br>

### **<font color="#C2185">与 &&: </font>**
两侧都为true 结果才是true 只要有一侧是false 结果就是false
<!-- 
    3 > 5 && 3 > 2      //false
    3 < 5 && 3 > 2      //true
 -->

### **<font color="#C2185">或 ||: </font>**
两侧都为false 结果才是false 只要有一侧为true 结果就是true
<!-- 
    3 > 5 || 3 > 2      // true
    3 > 5 || 3 < 2      // false
 -->


### **<font color="#C2185">非 !: </font>**
也叫作取反符, 用来取一个布尔值相反的值, 如: true的相反值就是false
如果对非布尔值进行运算则会将其转化为布尔值让后进行取反
我们可以利用该特点来将一个其他的数据类型转换为布尔值!!b
<!-- 
    var b = 10;
    b = !b;

    console.log(typeof b);      //b = false
    console.log(b);             //Boolean
 -->

<br>

# 短路运算(逻辑中断)
短路运算的原理: 当有多个表达式(值)时 也就是说:

    表达式1 逻辑运算符 表达式2


### **<font color="#C2185">逻辑与 的短路运算: 表达式1 && 表达式2: </font>**
如果第一个表达式的值为真, 则返回表达式2
如果第一个表达式的值为假, 则返回表达式1

技巧:
1. 有了你再用

```js
    123 && 456                  // 456
    0 && 456                    // 0
    0 && 1 + 2 && 456*789       // 0 因为0是false后面的就不看了

    // 如果有空 或者 否定的为假, 其余的都是真 0 null undefined NaN ''
```


### **<font color="#C2185">逻辑或 的短路运算: 表达式1 || 表达式2: </font>**
如果第一个表达式的值为真, 则返回表达式1
如果第一个表达式的值为假, 则返回表达式2

技巧:
1. 有哪个用哪个

```js
    123 || 456      // 123 第一个表达式为true返回表达式1
```


### **<font color="#C2185">练习: </font>**
```js
    let num = 0;
    console.log(123 || num++);
    console.log(num);           // 0 num++没有执行 逻辑中断了
```

<br>

# 赋值运算符
用来把数据赋值给变量的运算符

### **<font color="#C2185">=         直接赋值: </font>**
    - 可以将符号右侧的值赋值给符号左侧的变量eg: var a = 10

### **<font color="#C2185">+= -=     加 减一个数后 再赋值: </font>**
a += 5 等价于 a = a + 5a变量增加5
a -= 5 等价于 a = a - 5a变量减5


### **<font color="#C2185">*= /= %=  乘, 除, 取模后 再赋值: </font>**
a *= 5 等价于 a = a * 5a变量乘以5
a /= 5 等价于 a = a / 5a变量除以5
a %= 5 等价于 a = a % 5a变量除以5取余数  

a++ 等价于 a = a + 1

<br>

# 一元运算符
可以对一个其他的数据类型(任意值 string boolean 都可以)使用 + 
来将其转换为Number它的原理和Number函数一样

### **<font color="#C2185">要点: </font>**
只需要一个操作数, 比如 ++num !num (2个操作数 2+3)

### **<font color="#C2185">规则: </font>**
对于非Number类型的值先转成Number然后再运算


+ 正号 & - 正号不会对数值产生任何影响
```js
    //我想通过一元运算符对String类型进行强制Number类型转换
    let a = "18";       
    a = +a;
    console.log(typeof a, a + 1);   // number 19
```

```js
    var a = 1 + "2" + 3;
    console.log("a=" + a);        //结果是123

    var a = 1 + +"2" + 3;
    console.log("a=" + a);        //结果是6, 在字符串前添加了 “ + ”
```

负号      
负号可以对数字进行负号的取反
```js
let a = -18
console.log(a + 1)      // -17
console.log(-a + 1)     // 19
```

<br>

# 运算符的优先级

在js中有一个运算符优先级的表在表中越高上则优先级越高就会越优先计算
如果优先级一样则从左往右计算

    1       小括号          ()
    2       一元运算符      ++ -- !
    3       算数运算符      先 * / % 后 + -
    4       关系运算符      > >= < <=
    5       相等运算符      == != === !==
    6       逻辑运算符      先&& 后||
    7       赋值运算符      =
    8       逗号运算符      , 

<!-- 
    逗号运算符:
    使用, 可以分割多个语句一般可以在声明多个变量时使用. 
-->


一元运算符里面 逻辑非 优先级很高　根据逻辑运算符来区分

```js
    let c = 2 === '2'       
    // ===的优先级比较高, 先看 2 === '2'    c的值是false

    let d = !c || b && a
    // !的优先级高
```

<br>

# 位运算符
位运算符是在数字底层(即表示数字的 32 个数位)进行操作的.
ES当中整数有两种类型, 所有的整数字面量默认都是有符号的整数

1. 有符号的整数(正数, 负数)
2. 无符号的正数(只允许正数)


### **<font color="#C2185">有符号的整数: </font>**
符号位为最高位

     符号位
    (第31位)      -     (第0位)

符号位 = 0    -> 正数
符号位 = 1    -> 负数


ES中有两种不同的方式存储二进制形式的有符号整数
1. 用于存储负数
2. 用于存储正数

正数是以真二进制形式存储的前 31 位中的每一位都表示 2 的幂

    (二进制数字的位数)
    4位     3位     2位     1位     0位

    2^4     2^3     2^2    2^1     2^0

比如:
    1 1 1 1
    8 4 2 1 = 15

    1 0 1 0
    8 0 2 0 = 10

技巧:
先看二进制对应的位数是0还是1 相当于开关 1就是打开开关 0就是关闭开关
如果是1 那对应的数就是2的几次幂(看在几位) 如果是0 那该位对应的就是0

```js
let num = 0b1010
console.log(num)    // 10

// 10进制的4 对应 2进制的多少
let num = 4;
console.log(num.toString(2));   // 100
```


### **<font color="#C2185">负数: </font>**
10进制的负数也会存储为二进制代码, 不过采用的形式是二进制补码.
在计算机底层我们采用 负数的补码的方式 存储负数
<!-- 
    -18 会使用-18的补码 在底层存储-18
 -->

### **<font color="#C2185">计算数字二进制补码的步骤有三步: : </font>**
1. 负数-18 去掉负号 找到18对应的二进制表示 - 原码
<!-- 
    例如要计算 -18的二进制补码, 首先要确定 18 的二进制表示
    要展示全的32位
-->

2. 将1中拿到的原码 每位依次取反, 即要把 0 替换为 1 , 把 1 替换为 0   -- 反码
3. 在2中取得反码二进制数上加1

<!-- 
    要确定 -18 的二进制表示首先必须得到 18 的二进制表示如下所示: 
    0000 0000 0000 0000 0000 0000 0001 0010

    计算二进制反码
    1111 1111 1111 1111 1111 1111 1110 1101

    在二进制反码上加 1
    1111 1111 1111 1111 1111 1111 1110 1101
                                            各位+1
    1111 1111 1111 1111 1111 1111 1110 1110
 -->

**注意:**
1. 记住在处理有符号整数时开发者不能访问 31 位.
2. 负数的二进制显示 只是在该数字正数的2进制前加上-号
因为ES在显示负数的二进制的时候 并不以二进制补码的形式显示
而是用数字绝对值的标准二进制代码前面加负号的形式输出.例如: 

```js
    num = 4   // 100    二进制的显示
    num = -4  // -100   二进制的显示
```

这是为避免访问位 31.
为了简便ECMAScript 用一种简单的方式处理整数使得开发者不必关心它们的用法.

<br>

### **<font color="#C2185">位运算 NOT ~: </font>**
位运算 NOT 由否定号(~)表示
位运算 NOT 实质上是: *对数字求负(求反码)然后减1*

位运算 NOT 是三步的处理过程: 
1. 把运算数转换成 32 位二进制数字
2. 把二进制数转换成它的二进制反码
3. 把二进制数转换成浮点数

```js
    let num = 25    
    console.log(~num)   // -26

    1. 00000000000000000000000000011001
    2. 11111111111111111111111111100110
    3. 结果是-26
```

用下面的方法也可以得到同样的方法: 

```js
    let num = 18
    let num2 = ~18
    console.log(num2);  // -19

    console.log(~20)    // -21

    let num = -18
    console.log(~num)   // 17 |  -18 + - = 18, 18 - 1 = 17
```

### **<font color="#C2185">总结: 20的 ~运算 该数字的前面+ -号 再-1: </font>**
20 -> -20 - 1 = -21

<br>

### **<font color="#C2185">位运算 AND    &: </font>**
位运算 AND 由(&)表示 
该运算是直接*对数字的二进制形式进行运算*.

规则:
两个两进制数 进行 & 运算 将两个2进制数对其 依次按位来比较 

它把每个数字中的数位对齐然后用下面的规则对同一位置上的两个数位进行 AND 运算: 
*找1* 11为1 其它的是0
<!-- 
    数字1中的数位	数字2中的数位	结果
    1	            1	            1
    1	            0	            0
    0	            1	            0
    0	            0	            0
 -->

比如:
要对数字 25 和 3 进行 AND 运算代码如下所示:

```js
    let num = 25
    console.log(num.toString(2));   // 11001

    let num2 = 3
    console.log(num2.toString(2));  // 11

    let result = 25 & 3
    console.log(result);    // 1
    console.log(25 & 3)     // 1

    11001
    00011
    00001
```

<br>

### **<font color="#C2185">位运算 OR     |: </font>**
位运算 OR 由符号(|)表示
该运算是直接*对数字的二进制形式进行运算*.

在计算每位时OR 运算符采用下列规则: 
*找0* 00为0 其它的是1
<!-- 
    数字1中的数位	数字2中的数位	结果
    1	            1	            1
    1	            0	            1
    0	            1	            1
    0	            0	            0
 -->

比如:
要对数字 25 和 3 进行 OR (|) 运算代码如下所示: 

```js
    let num = 25
    console.log(num.toString(2));   // 11001

    let num2 = 3
    console.log(num2.toString(2));  // 11

    let result = 25 | 3
    console.log(result);    // 27

    11001
    00011
    11011 = 16 + 8 + 0 + 2 + 1 = 27
```

<br>

### **<font color="#C2185">位运算 XOR    ^: </font>**
位运算 XOR 由符号(^)表示
该运算是直接*对数字的二进制形式进行运算*.

规则:
*找异*, 每位相比较不一样的为1 一样的为0

比如
对 25 和 3 进行 XOR 运算代码如下
```js
    let num = 25
    console.log(num.toString(2));   // 11001

    let num2 = 3
    console.log(num2.toString(2));  // 11

    let result = 25 ^ 3
    console.log(result);    // 26

    11001
    00011
    11010 = 16 + 8 + 0 + 2 + 0 = 26
```

思考:
为什么当布尔类型的值进行 ^ 运算的时候 得到的是数字呢？
```js
let a = true
let b = false

let flag = a ^ b;
console.log(flag)       // 1

a = true = 1
b = false = 0

console.log(1 ^ 0)

0001
0000
0001    // 1
```

那是不是说 数字1 ^ 0 = 数字1 ？？

<br>

### **<font color="#C2185">左移运算 << (左移运算保留数字的符号位): </font>**
它把数字中的所有数位向左移动指定的数量 相当于 *扩大n倍*

**注意: 左移使用0补位** 
1. 扩展n倍 不是说直接 x number
比如 25 << 2 
不是 25 x 2
而是 25 扩大一倍后为 50 再扩大一倍后 100
也就是说 当我们想 x 的时候 x 2^n
也就是说 25 << 2 == 25 x 2^2

2. 在左移数位时数字右边多出 5 个空位.左移运算用 0 填充这些空位使结果成为完整的 32 位数字.


例如:
10 << 5 = 10 x 2^5
```js
    // 2^5 = 2 x 2 x 2 x 2 x 2 = 32
    console.log(10 << 5)    // 320
    console.log(-2 << 5)    // -64
```


### **<font color="#C2185">注意: </font>**
左移运算保留数字的符号位.
例如 如果把 -2 左移 5 位得到的是 -64而不是 64. “符号仍然存储在第 32 位中吗？”

是的不过这在 ECMAScript 后台进行开发者不能直接访问第 32 个数位. 即使输出二进制字符串形式的负数显示的也是负号形式 (例如-2 将显示 -10.) 
    
<br>

### **<font color="#C2185">有符号右移运算    >>: </font>**
有符号右移运算符由两个大于号表示(>>) 相当于 *缩小n倍 做除法*
它把 32 位数字中的所有数位整体右移同时保留该数的符号(正号或负号).
有符号右移运算符恰好与左移运算相反.例如把 64 右移 5 位将变为 2: 

同样移动数位后会造成空位.这次空位位于数字的左侧但位于符号位之后.ECMAScript 用符号位的值填充这些空位创建完整的数字如下图所示: 
```js 
    num = 64            // 1000000
    result = num >> 5   // 0000010

    result = 2
```

<br>

# 编码
在ES中想用Unicode编码就是 
    *\u四位编码编码为16进制*

在网页中想用Unicode编码就是 
    *&#编码;* (编码为10进制)


### **<font color="#C2185">&编码;: </font>**
正常是&开头;结尾
比如 &nbsp; 但要输入Unicode编码则要如下
     
使用转义字符 &#编码; 但这里的编码是需要10进制的可以打开计算机选择程序员转换 

<br>

# 语句
我们的程序是由一条一条语句构成的语句是按照自上向下的顺序一条一条执行的, 在JS中我们可以使用{}来为语句进行分组
    
同一个{ }中的语句我们称为一组语句它们*要么都执行要么都不执行*, 一个{ }中的语句我们也称为一个代码块

代码块
```js
    {
        alert("");
        console.log("");
        document.write("");
    }
```

<br>

# 流程控制
在一个程序执行的过程中, 各条代码的执行顺序对程序的结果是有直接影响的, 很多时候我们要通过控制代码的执行顺序来实现我们要完成的功能

简单理解:
流程控制就是来控制我们的代码按照什么结构顺序来执行

流程控制的三种结构:

顺序结构
分支结构
循环结构


        顺序结构        分支结构            循环结构     

        顺序执行        条件执行            循环执行
           ↓               ↓ 
           A             判 断                A   ←
           ↓               ↓                  ↓      ↑
           B           A       B            判 断    yes
           ↓           ↓       ↓              ↓


### **<font color="#C2185">分支结构: </font>**
由上到下执行代码的过程中, 根据不同的条件, 执行不同的路径代码
执行代码*多选一*的过程, 从而得到不同的结果

if语句
switch语句


### **<font color="#C2185">条件判断语句: </font>**
使用条件判断语句可以在执行某个语句之前进行判断, 如果条件成立才会执行语句不成立不执行

### **<font color="#C2185">if语句 -- 语法一: : </font>**
```js
    if(条件表达式){
        语句 .....   
    }
```

### **<font color="#C2185">执行思路: </font>**
if语句在执行时会先对条件表达式进行求值判断
如果条件表达式的值为true  则执行if后的语句, 
如果条件表达式的值为false 则不会执行if后的语句 

要点:
if语句只能控制紧随其后的语句如果希望if语句可以多条语句可以将这些语句统一放入代码块中, if语句后的代码块不是必须的但在开发过程中尽量写上代码块 


```js
    if(true)
        alert("你猜我出来么？");

    var a = 10;
    if(a > 10) {
        alert("a比10大");
        alert("谁也管不了我");
    }

    var a = 5;

    //当想加入多个条件时可以用与运算只有两端同时都是true都满足时才会执行下面的语句
    if(a > 10 && a <= 20){
        alert("a大于10并且小于等于20");
    }
```

<br>

### **<font color="#C2185">if...else语句 -- 语法二: : </font>**
```js
    if(条件表达式){
        语句...
    } else {
        语句...
    } 
```

### **<font color="#C2185">执行思路:   : </font>**
if...else...语句: 当该语句执行时会先对我们if后的表达式求值判断
如果该值为true则执行if后的语句
如果该值为false则执行else后的语句
不管是if 还是 else 执行哪个整个结构都执行完毕
```js
    var age = 50;
    if(age >= 60) {
        alert("你已经60退休了");
    } else {
        alert("你还得继续工作")
    }
```


### **<font color="#C2185">if...else if...else语句 -- 语法三: : </font>**
多分支语句 就是利用多个条件来选择不同的语句执行, 得到不同的结果 多选1的过程
```js
    if(条件表达式){
        语句.....
    } else if(条件表达式) {
        语句.....
    } else if(条件表达式) {
        语句.....
    } else {
        语句.....
    }
```

### **<font color="#C2185">执行思路: </font>**
if...else if...else语句: 当该语句执行时会从上到下一次对条件表达式进行求值判断
如果求值结果为true则执行当前的语句
如果求值结果为false则继续向下判断
如果所有的条件都不满足则执行最后的else语句, 该语句中只会有一个代码块被执行一旦代码块被执行则直接结束语句
```js
     var age = 50;
    if(age > 100){
        alert("活着挺没意思的");
    }else if(age > 80){
        alert("你也老大不小的了");
    }else if(age > 60){
        alert("你退休了");
    }else if(age > 30){
        alert("你已经中年了");
    }else if(age > 17){
        alert("你已经成年了");
    }else{
        alert("你还是个孩子")
    }
```

<br>

# 三元表达式(二选一的过程)
由三元运算符组成的式子我们称为三元表达式 ? :

### **<font color="#C2185">语法: 条件表达式 ? 表达式1 : 表达式2: </font>**
执行流程: 
条件运算符在执行时首先对条件表达式进行求值

如果该值为真则执行 表达式1并返回执行结果
如果该值为假则执行 表达式2并返回执行结果

```js
    条件表达式 ? 表达式1 : 表达式2   
        // 这个部分是一个表达式, 既然是表达式就会有返回值

    let num = 10;
    let result = num > 5 ? '是的' : '不是的';
    console.log(result);    // 是的
```


### **<font color="#C2185">场景: : </font>**
动态给变量赋值

变量 = 表达式 ? 值1 : 值2

<br>

# 分支流程控制 --- switch 语句
switch语句也是多分支语句, 它用于基于不同的条件来执行不同的代码, 当要针对 @变量@ 设置一系列的特定值的选项时, 就可以使用switch语句

### **<font color="#C2185">switch语句 语法: : </font>**
```js
    switch(条件表达式){
        case 常量: 
            语句...
            //使用break可以来退出switch语句不会向下执行所有的case代码
            break;

        case 常量: 
            语句...
            break;

        //如果没有case和switch全等的条件则会执行default后的语句
        default:                
            语句...
            break;
    }
```

### **<font color="#C2185">执行思路: : </font>**
switch...case...语句
在执行时会依次将 case后的表达式的值 和 switch后的条件表达式的值 进行*全等比较*
如果比较结果为true(全等)则从当前case处开始执行代码
如果比较结果为false则继续向下比较
如果所有的比较结果都为false则只执行default后的语句

```js
    // 当前case后的代码都会执行, 为了只执行一个case 可以在case后面跟上break 这样可以确保只会执行当前case的语句而不会执行其他的case后的语句
    var num = 1;
    switch(num){

        //先会看此处case值和switch条件表达式进行全等比较如果全等则输出下面代码
        case 1:                     
            console.log("一");

            //使用break可以来退出switch语句
            break;       

        case 2:
            console.log("二");
    }
```

### **<font color="#C2185">技巧: </font>**
开发时会把 switch(变量) 这么写
```js
    // 将 switch 后面的表达式定义为 变量
    let num = 3;

    switch(num){
        // case后面的值为常量进行匹配
        case 1: 
    }
```


### **<font color="#C2185">练习1: </font>**
对于成绩大于60分的输出 合格低于60分的输出 不合格

要点:
假如写具体的分数的话情况得从60-100都写上太长所以用除以10 变成 10种情况但是这么写的话只对整数才有意义, 所以应该对条件表达式里的结果取整
```js
    var score = 60;

    // switch(score/10){ ... }  

    //利用parseInt来对结果取整
    switch(parseInt(score/10)){        

        case 10:                       
        case 9:
        case 8:
        case 7:
        case 6:
            console.log("合格");
            break;
    }
```

### **<font color="#C2185">练习2: </font>**
水果价格查询

思路:
创建变量保存用户输入的水果名
将这个变量作为条件表达式
case后面的值写几个不同的水果名称 
<!-- 注意: 一定要加上引号, 因为是全等匹配 -->

弹出不同价格即可, 同样注意每个case之后加上break 以使退出switch语句
都没有就设置default

```js
let fruit = prompt("请输入要查询的水果名")

switch(fruit) {
    case "苹果":
        alert("10元一斤")
        break

    case "香蕉":
        alert("5元一斤")
        break

    default: 
        alert("没有您查询的结果")
}
```

<br>

# switch语句 和 if else if 区别
一般情况下, 他们两个语句可以相互替换的

switch语句通常在处理case为比较确定值的情况
if else语句更加的灵活, 常用语范围判断(大于等于某个范围)

switch语句进行条件判断后会直接执行到程序的条件语句, 效率更高
if else语句有几种条件, 就得判断多少次

分支比较少的时候 if else语句的执行效率比switch语句高
分支比较多的时候 switch语句的执行效率比较高 而且结构清晰

<br>

# 循环
在程序中, 一组被重复执行的语句称之为循环体, 能否继续重复执行, 取决于循环的终止条件 由循环体 和 循环终止条件 组成的语句 称之为循环语句

### **<font color="#C2185">for循环: </font>**
重复执行某些代码, 通常跟计数有关系
在for循环中为我们提供了专门的位置用来放三个表达式: 

    - 1. 初始化表达式     通常用于作为计数器使用
    - 2. 条件表达式       *当不满足条件表达式的时候会终止循环*
    - 3. 更新表达式       每次循环最后执行的代码, 用于对初始化表达式进行更新
    
### **<font color="#C2185">语法: : </font>**
```js
    for(1初始化表达式; 2条件表达式; 4更新表达式){
        3语句...
    }
```

执行顺序: 1   2 3 4   2 3 4   2 3 4

执行流程: 
    1. 执行初始化表达式初始化变量 此处只会执行一次
    ↓
    2. 执行条件表达式判断是否执行循环
        如果是true则执行循环  →   3.语句
        如果是false终止循环
    ↓
    4. 执行更新表达式更新表达式执行完毕后继续重复
    ↓
    2


### **<font color="#C2185">while 和 for 的语法结构对比: </font>**
```js 
    // 创建一个10次的while循环
    var a = 0;                  //1 初始化表达式初始化一个变量
    while (a < 10){             //2 条件表达式
        document.write(a++);    //3 更新表达式
    }


    // 把上面的while循环转换成for循环: 
    for (var a = 0; i < 10; i++){
        alert(i);
    }
```


### **<font color="#C2185">利用for循环重复执行不同的代码: </font>**
for循环可以重复执行不同的代码, 这主要是因为使用了计数器i的存在, 计数器i在每次循环过程中都会有变化

```js
    for(let i=1; i<100; i++){
        console.log('这个人今年'+ i +'岁')
    }

    for(let i=1; i<=100; i++){
        if(i == 1){
            console.log('1岁了')
        }else if(i == 100){
            console.log('这个人shi掉了')
        }
    }
```

### **<font color="#C2185">总结: : </font>**
我们可以利用到for循环了i的值, 用if判断语句来写的话 并不是会把for {...} 执行多少次, 而是只输出了 if 里 符合判断的的语句 会一起出来

<br>

# while循环: 
语法: 
```js
    while(条件表达式){
        语句...(循环体)// 这里面要做 初始值的更新操作
    }
```

执行流程: 
    while语句在执行时先对条件表达式进行判断
    如果值是true  则执行循环体循环体执行完毕以后继续对表达式进行判断
    如果值为true  则继续执行循环体以此类推
    如果值为false 则终止循环

```js 
    var n = 1;

    //像这种将条件表达式写死的true的循环叫做死循环
    while(true){            
        alert("n++");       

        //n等于10的时候再执行break                            
        if(n == 10){
            break;          
        }
    } 
```

创建一个循环往往需要三个步骤
1. 创建一个初始化的变量
        var a = 0;

2. 再在循环中设置一个条件表达式
        while(a < 10)

3. 在定义一个更新表达每次更新初始化变量
        a++;

4. 终止条件
```js
    var i = 0;

    // i 小于 10 的时候 会进入到循环
    while(i < 10){
        document.write(i++ + "<br />")
    }


    let message = prompt('你爱我么?');
    while(message !== '我爱你'){
        message = prompt('你爱我么?');
    }
```


### **<font color="#C2185">do...while循环: </font>**
它是while语句的一个变体, 该循环会先执行一次代码块, 然后对条件表达式进行判断, 如果条件为真, 就会重复执行循环体, 否则退出循环

语法: 
```js
    do {
        循环体语句...
    } while(条件表达式)
```

示例:
```js 
    var i = 0;
    do{
        document.write(i++ + "<br />")
    } while(i < 10) 
```

执行流程
    do...while语句在执行时会先执行循环体
    循环体在执行完毕后再对while后的表达式进行判断
    如果结果为true    则继续执行循环体执行完毕继续判断
    如果结果为false   则终止

实际上这两个语句类似功能类似while是先判断再执行do是先执行后判断
区别为: 
do...while可以保证循环体至少执行一次而while不行 

<br>

# break 和 continue 和 return

### **<font color="#C2185">continue: </font>**
continnue关键字用于*立即跳出本次循环*, 继续下一次循环(本次循环中continue之后的代码就会少执行一次), 并不会结束整个循环.

注意:
continue只能在循环中使用不能出现在其他的结构中.
<!-- 
    例如:
    吃5个包子 第3个有虫子, 就扔掉第3个 继续吃第4个第5个包子
 -->


```js
    for(let i=1; =<=5; i++){
        if(i==3){
            continue;
        }
        console.log(`我正在吃第${i}个包子`)
    }

    // 当i为3时, 会跳出本次循环的所有内容 不会输出console语句, 会直接跳到i为4
```

 
需求: 求1 - 100之间, 除了能被7整除之外的整数和
```js
    let sum = 0;
    for(let i = 0; i<=100; i++){

        // 跳出这个部分
        if(i%7 == 0){
            continue;
        }
        sum += i;
    }
    console.log(sum);
```

<br>

### **<font color="#C2185">break: </font>**
关键字可以立刻退出最近的循环语句强制执行循环后面的语句不能用于if
退出整个循环
<!-- 
    例如:
    吃5个包子 吃到第3个发现里面有 半个虫子, 剩下的都不吃了
 -->

```js
    for(let i = 0; i<=5; i++){

        if(i == 3){
            break;
        }
        console.log(`我正在吃第${i}个包子`)
    }
```
    
break和continue语句只在循环和switch语句中使用.

<br>

### **<font color="#C2185">label: </font>**
不是必须使用 label 可以定义为其它的名字

### **<font color="#C2185">作用: </font>**
给for循环起了一个名字

### **<font color="#C2185">语法: : </font>**
    label: for...

### **<font color="#C2185">break 和 continue 都可以使用 lable: </font>**

### **<font color="#C2185">示例: </font>**
if(...) break label
if(...) continue label

```js 
    // 为这下面的for循环起了一个hello的名字
    hello: for(i=0; i<5; i++){
        console.log("@外层循环" + i)

        for(j=0; j<5; j++){

            //看这里在break后输入了 我们为这个循环创建的名字 hello
            break hello;                  
            console.log("内层循环" + j)
        }
    } 
```

### **<font color="#C2185">return: </font>**
不仅可以退出循环, 还能够返回return语句中的值, 同时还可以结束当前的函数体内部的代码

<br>

# 数组简介: 
数组是指一组数据的集合, 其中的每个数据被称为元素, 在数组中可以存放任意类型的元素, 数组是一种将一组数据存储在单个变量名下的优雅方式

内建对象
宿主对象
自定义对象

目前我们应用最多的都是内建对象和宿主对象

内建对象: 数组


### **<font color="#C2185">数组(Array): </font>**
数组也是一个对象 它和普通的对象功能类似也是用来存储数据的
不同的是普通对象是使用*字符串作为属性名*
而数组是使用*数字来作为索引操作元素的*, 在对象中称之为属性在数组中叫元素


### **<font color="#C2185">索引: : </font>**
用来访问数组元素的序号(数组下标从0开始)
数组的存储性能比普通对象要好在开发中我们经常使用数组来存储一些数据 
        
        正常对象是                           数组是

     属性名 和 属性值                    索引(index) 和 值
     name     孙悟空                     0             10

一个索引一个值 叫做一个 元素 arr[0] = 10;

<br>

# 数组的创建
js中创建数组有两种方式

1. 利用 new 创建数组
2. 利用数组字面量创建数组


### **<font color="#C2185">创建数组: new Array(): </font>**
    var arr = new Array();

**注意:**
使用typeof检查下数组的类型, 会返回object
```js
    console.log(typeof arr);    // object
```


### **<font color="#C2185">构造函数 初始化的方式: </font>**

创建指定长度的空数组
```js
    var arr = new Array(number);
```

创建指定元素的数组
```js
    var arr = new Array(el1, el2, el3);
```

创建数组时直接向里面添加了3个元素
使用构造函数的方式也可以在创建的时候就指定数组中的元素
可以将要添加的元素作为构造函数的参数来传递用逗号隔开 

如果()中只有一个整数值时, 创建一个长度为该整数值的数组
```js
let arr = new Array(5)
console.log(arr)    // [ <5 empty items> ]

let arr2 = new Array(1, 2, 3)
console.log(arr2)   // [ 1, 2, 3 ]
```


### **<font color="#C2185">添加元素: </font>**
语法: 
    数组[索引] = 值
```js 
    arr[0] = 10;
```


### **<font color="#C2185">读取元素: </font>**
语法: 
    数组[索引];

注意:
如果读取不存在的索引他不会报错而是返回undefined 



### **<font color="#C2185">数组的 length 属性: </font>**
length属性来获取数组的长度也就是*元素的个数*

语法: 
    数组.length

最大索引(index)+1 就是元素的个数
    arr.length + 1  = 元素的个数

对于连续的数组可以获取数组的长度也就是元素的个数
```js
    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;
    arr[3] = 40;
    console.log(arr.length);    //4
```

但是对于非连续的数组会获取到最大的索引+1
```js
    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;
    arr[3] = 40;
    arr[10] = 90;
    arr[30] = 100;

    //[10, 20, 30, 40, empty × 6, 90, empty × 19, 100]
    console.log(arr.length);   
``` 

注意:
非连续的数组 会把中间的地方给你空出来会留地方所以尽量不要写非连续的数组 


### **<font color="#C2185">修改length, 也可以理解为修改数组的长度: </font>**
如果修改的length 大于 原长度 则多出的部分会空出来
如果修改的length 小于 原长度 则多出的元素会被删除

    arr.length = 10;
    arr.length = 3;

所以我们可以通过修改length来删除一些元素


### **<font color="#C2185">向数组的最后一个位置添加元素: </font>**
语法:  
    数组[数组.length] = 值;

```js
    arr[arr.length] = 70;
    arr[arr.length] = 80;
    arr[arr.length] = 90;
```  

因为打印数组的length的值时 比最后元素所处的索引大1 比如最后一个索引是[3] 那么arr.length的值是就是4, 把这个length的值作为索引数的话 就是数组的最后

<br>

### **<font color="#C2185">创建数组: 数组的字面量: </font>**

语法: 
    var arr = [];


### **<font color="#C2185">数组的初始化: </font>**
使用字面量创建数组时可以在创建时就指定数组中的元素
    var arr = [1,2,3,4,5,10]

在创建数组时同时向数组内添加了6个元素索引为1的值为1索引为2的值为2,.... 


### **<font color="#C2185">数组内元素的类型: </font>**
可以是任意类型
arr = ["hello", 1, true, null, undefined]

1. 可以是对象
```js
    var obj ={
        name:"孙悟空"
    };

    //向它最后添加一个元素是对象
    arr[arr.length] = obj;      

    //数组里放了3个对象
    arr = [
        {name:"孙悟空"}
        {name:"猪八戒"}
        {name:"沙和尚"}
    ]  
```
                             

2. 可以是个函数
```js 
    arr = [
        function(){},
        function(){},
        function(){}
    ]  
```
    

3. 可以是个数组, (这种数组叫做二维数组)
```js
    arr = [[1,2,3], [3,4,5], [4,5,6]];
    console.log(arr[0]);    // [1,2,3]
```
    
### **<font color="#C2185">向数组中新增元素: </font>**
可以通过修改length长度 以及 索引号增加数组元素

<br>

# 数组的遍历

数组:
    var arr = ["孙悟空","猪八戒","沙和尚"];

所谓的遍历数组就是将数组中所有的元素都取出来


### **<font color="#C2185">方式1: 利用for循环来遍历数组中的元素.: </font>**
要点:
arr.length 统计数组的长度 (数组的长度是元素个数, 不要跟索引号混淆)
arr.length 可以*动态监测数组元素的个数*

遍历的思路:
数组里面的元素怎么取出来呢？
```js
    console.log(arr[0]);
    console.log(arr[1]);
    console.log(arr[2]);
```

我们看下0123都是索引吧, 都是从0开始的整数吧, 都是有规律的吧
arr是定的 最关键的是获取到索引

```js
    for (i=0; i<10; i++) {
        //这是10次的for循环0-9的整数是不是跟我们的索引的数字是一样的
        console.log(arr[i]);      
    }
```

写死了也不好, 假如我在数组中添加或者增减元素时还得同时改变i的值要不有的输出不出来, 所以写死了不好我们可以发现 当数组里面有4个元素的时候i < 4, 5个元素的时候i < 5, 所以我们能看出 这小于的是数组的长度, 所以我们要这么写

```js
    for(i=0; i < arr.length; i++){
        console.log(arr[i]);
    }
```

<br> 

### **<font color="#C2185">arr.forEach(callback): </font>**
数组的方法一般我们都是使用for循环去遍历数组, js中还为我们提供了一个方法来遍历数组
这个方法只支持ie8以上的浏览器,8以及以下的浏览器不兼容 

forEach方法需要一个函数作为参数

    forEach(回调);
    forEach(function(value, index, arr){ ... });

参数:
1. value:
    就是当前正在遍历的元素  ----  孙悟空

2. index:
    就是当前正在遍历的元素的索引  ----  0 1 2 3 4

3. arr:
    就是当前遍历的数组  -----  整个数组里的内容

像这种函数由我们创建但是不由我们调用的我们称为回调函数浏览器调的回调函数是异步执行


### **<font color="#C2185">执行原理: </font>**
我们数组中有几个元素函数就会执行几次每次执行时, 浏览器会将遍历到的元素以实参的形式传递进来我们可以来定义形参来读取这些内容

<br>

# 数组的方法(详解):
数组中的方法都定义在 Array原型对象身上 所以我们可以直接调用

### **<font color="#C2185">arr.forEach(callback[, this]): </font>**
### **<font color="#C2185">作用: </font>**
遍历数组

### **<font color="#C2185">参数: </font>**
callback:
    - 对数组中的每个元素 都会执行一遍回调

this
    - 改变回调函数中的this指向
    - function - 当中的this为winodw
    - 箭头函数 - 当中的this为window

参数1的演示:
```js
let arr = [1,2,3]

arr.forEach(value => {
    // 每一个元素都会执行这个回调操作
    console.log(value)
})
```

参数2的演示:
```js
let arr = [1,2,3]
let obj = {name: "sam"}

arr.forEach(value => {
    console.log(this)       // window
})

arr.forEach(value => {
    console.log(this)       // {name: "sam"}
}, obj)
```

### **<font color="#C2185">返回值: </font>**
undefined

**要点:**
1. forEach() 不可以链式调用
2. forEach() 会改变原数组
3. 数组中的有效值会触发回调 已删除或未初始化的元素会被跳过
```js
// 不会遍历 空元素
let arr = [1,3,,7]
arr.forEach(function(value) {
    console.log(value)
})


// 每次循环 index 的顺序不会变 比如循环到第2次 那对应的index2的元素 会触发回调 即使元素被删除导致数组元素的位置发生了变化 那也是删除后的数组的index为2的元素 触发回调, 比如
let arr = ["one", "two", "three", "four"]

// 当元素为two的时候 删除数组中的第一个元素
arr.forEach((value,index,arr) => {
  console.log(value)

  if(value == "two") {

    // 当value=two的是时候 本轮的index为1 下一轮的index为2
    console.log("当前index为", index)   // 1
    arr.shift()
  }
})


["one", "two", "three", "four"]
↓
["two", "three", "four"]

// 也就是说 index 为 2 的时候 元素会是four three则会被跳过
```

4. forEach() 的退出 只能使用 抛出异常

5. 下面的使用方式是因为 this.containers 是node节点 它身上并没有forEach() 方法 所以用的下面的方式
一般情况下 我们都是通过 数组.forEach() 来使用的 如果前面的不是数组的话 就可以使用

Array.prototype.forEach.call()
```js
Array.prototype.forEach.call(this.containers, ($container) => {
    this.setSwiper($container)
})
```

### **<font color="#C2185">必要的知识点: 方法名.call(): </font>**
它可以传递一个对象 让该对象临时拥有前面指定的方法

*https://www.cnblogs.com/echolun/p/11544045.html*

<br>

### **<font color="#C2185">arr.at(index): </font>**
返回数组中的指定元素

参数:
索引, 正数从左往右(从0开始) | 负数从右往左(从-1开始)

返回值:
对应元素 如果匹配不到则为 undefined

```js
let arr = [1,2,3]
let item = arr.at(0)
console.log(item)       // 1


let arr = [1,2,3]
let item = arr.at(-1)
console.log(item)       // 3
```

### **<font color="#C2185">兼容性: </font>**
ie 和 opera 不行

<br>

### **<font color="#C2185">arr.concat(): </font>**
用于合并 两个 或 多个数组
将指定的数组 添加到 arr 数组中

参数:
数组和值 可以传递多个,  多个item之间使用 , 分割

返回值:
新数组 []

注意:
该方法属于浅拷贝 如果是引用类型的对象 那么引用对象被修改 对于原始数组和新数组之间都是可见的


### **<font color="#C2185">示例: </font>**
连接两个数组: 两个数组中的元素会结合在一起
```js
let arr = [1,2,3]
let arr2 = [4,5,6]
let res = arr.concat(arr2)
console.log(res)    
    // [1, 2, 3, 4, 5, 6]
```

连接的是二维数组
```js
let arr = [1,2,3]
let arr2 = [[4,5,6], ["a", "b", "c"]]
let res = arr.concat(arr2)
console.log(JSON.stringify(res, null, 2))

// [1,2,3, [4,5,6], ["a", "b", "c"]]
```

### **<font color="#C2185">兼容性: : </font>**
全部

<br>

### **<font color="#C2185">arr.copyWithin(target[,start[,end]]): </font>**
复制数组中的一部分到同数组中的另一个位置 *不会改变原数组的长度*

参数:
target:
将数组的一部分复制到哪里
如果是负数 target将从末尾开始计算
如果指定的 target > arr.length 那么不会发生拷贝
如果指定的 target 在 start 之后 那么复制的序列将被修改以符合 arr.length

start:
开始复制元素的*起始位置*
如果为负数则从末尾开始计算
如果start被忽略则从0开始进行复制

end:
开始复制元素的*结束位置(不包括这个位置)*
如果为负数则从末尾开始计算
如果end被忽略该方法将会一直复制到数组结尾


返回值:
无, 对原数组进行操作

### **<font color="#C2185">示例: </font>**
```js
let arr = [1, 2, 3, "a", "b", "c"]
arr.copyWithin(0, 3, arr.length)
console.log(arr)
// ['a', 'b', 'c', 'a', 'b', 'c']
```
### **<font color="#C2185">↑解析: </font>**
将 abc 复制到数组开始的位置 
注意: 因为数组的长度不会发生变化 那么abc将会覆盖掉原数组当中的元素

<br>

```js
let arr = [1, 2, 3, "a", "b", "c"]
arr.copyWithin(-2)
console.log(arr)
// [1, 2, 3, 'a', 1, 2]
```
### **<font color="#C2185">↑解析: </font>**
target为-2 则目标位 "b" 所在的位置
start为空 则从0开始复制全部
数组的长度不会发生变化 则只有 "b" "c" 会被替换成 1 2

<br>

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```
### **<font color="#C2185">↑解析: </font>**
target为0, 目标位置为1所在的位置
start为3, 则从4开始进行复制
将4 5放到1 2的位置 1 2 会被覆盖掉


### **<font color="#C2185">兼容性: </font>**
ie不支持

<br>

### **<font color="#C2185">arr.entries(): </font>**
返回一个迭代器对象, 该迭代器对象可以使用 for...of 来进行遍历

*迭代器对象中每个元素是[index:value]组成的数组* 可以利用 iterator.next().value来进行获取

```js
let arr = ["a", "b", "c"]
let iterator = arr.entries()
```

iterator迭代器对象中有 next() 方法 用于获取迭代器对象中封装的 元素(entries封装的就是 kv)

```js
console.log(iterator.next())
// {value: Array(2), done: false

console.log(iterator.next().value)
// [0, "a"]
```

### **<font color="#C2185">iterator.next(): </font>**
返回的是一个对象
```js
{
    value: [index, value]   // 类型数组
    done: boolean
}
```

value: 就是封装在迭代器对象中的 [index,value]
done: 
用于指示迭代器是否完成 只有获取不到数据了才是 true
true代表已经完成迭代

**注意:**
```js
let arr = ["a", "b", "c"]
let iterator = arr.entries()

console.table(iterator.next())
// {value: [0, "a"], done: false}

console.table(iterator.next())
// {value: [1, "b"], done: false}

console.table(iterator.next())
// {value: [2, "c"], done: false}

console.table(iterator.next())
// {done: true}
```

我们上面能看到 数组中只有3个元素 当执行3遍 都是false
当执行第四遍 也就是 arr.length + 1 的时候 done为true

**当我们使用for i循环迭代器的时候为了保证取出所有的数据 循环次数要定义为arr.length+1**


示例:
将 [index:value] 整理到新数组中
```js
let arr = ["a", "b", "c"]
let iterator = arr.entries()

let newArr = []

for(let i=0; i<arr.length + 1; i++) {
  // 获取 next 对象
  let _iterator = iterator.next()

  // 可以用来表示 遍历是否完成
  console.log(_iterator.done)

  // _iterator.done == false 的时候才是有值的
  if(_iterator.done != true) {
    newArr[i] = _iterator.value
  }
}

console.log(newArr)
[
    [0, 'a'],
    [1, 'b'],
    [2, 'c']
]
```

示例:
二维数组中的数组按小到大的顺序进行排序
```js
function sortArr(arr) {
    var goNext = true;
    var entries = arr.entries();
    while (goNext) {
        var result = entries.next();
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b);

            // 这里修改为 true 是为了能够再次的进入到循环
            goNext = true;
        } else {
            // 当获取不到值了 改为false 就进不去循环了
            goNext = false;
        }
    }
    return arr;
}

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
sortArr(arr);


0:(2) [1, 34]
1:(5) [2, 3, 44, 234, 456]
2:(5) [1, 4, 5, 6, 4567]
3:(4) [1, 23, 34, 78]
```

### **<font color="#C2185">↑要点: </font>**
以往我们在使用 while() 循环的时候 都是定义循环条件
这里可以利用 flag 来标识再次进入的循环条件可以！！！

<br>

### **<font color="#C2185">简洁操作: for...of: </font>**
上面讲解的是如何使用 iterator 迭代器对象
iterator 迭代器对象 本身就可以通过 for of 来进行遍历 获取到的就是 next对象中的 value 对应的值

```js
let arr = ["a", "b", "c"]
for(let item of arr.entries()) {
  console.log(item) // [0, "a"]
}
```

### **<font color="#C2185">兼容性: </font>**
ie不支持

### **<font color="#C2185">arr.values(): </font>**
数组当中的元素

### **<font color="#C2185">arr.keys(): </font>**
数组当中元素对应的index

<br>

### **<font color="#C2185">arr.every(): </font>**
数组中所有的元素都符合条件才会返回 true

只有数组中每个元素 都符合回调的测试返回true 则整体结果返回 true 只要一个元素返回false 则整体结果就会 fasle

参数:
callback
用来测试每个元素的函数, callback必须返回一个 boolean
    - value
    - index
    - arr

返回值:
boolean

**注意:**
若传入一个空数组, 无论如何都会返回 true


示例:
检测数组中的所有元素是否都大于 10。
```js
let arr = [12, 54, 9, 130, 44]
let flag = arr.every(item => item > 10)
console.log(flag)   // false
```

### **<font color="#C2185">兼容性: </font>**
ok

<br>

### **<font color="#C2185">arr.some(): </font>**
数组中的元素只要有一个符合条件 就会返回 true

参数:
callback
    - value
    - index
    - arr

返回值:
boolean

```js
let arr = [12, 54, 9, 130, 44]
let flag = arr.some(item => item > 10)
console.log(flag)   // true
```

示例:
```js
let arr = [];
data.some(function(value) {
    // some方法返回的是布尔值 所以在内部可以这么写
    // 如果用户输入的商品 和 当前产品的名称一样
    if(value.pname === product.value) {

        console.log(value);     // 找到的数据

        // 但是返回的是一个对象, 我们上面定义的函数必须传递进去一个数组
        arr.push(value);

        // 如果找到就会返回true 必须这么写 现在就属于拿到这个数据了
        return true;
    } 
});

// 把拿到的数据渲染到页面中
setData(arr);
```

### **<font color="#C2185">兼容性: </font>**
ok

<br>

### **<font color="#C2185">arr.fill(value[, start[, end]]): </font>**
用指定值 设置数组中的元素 也可以设置指定位置

参数:
value:
start:
起始索引, 默认值为0
如果start是个负数, 则start = length + start

end:
终止索引, 默认值为 this.length
如果end是个负数, 则end = length + end


返回值:
修改后的数组

**注意:**
arr不能是空数组

```js
let arr = [1, 2, 3]
let res = arr.fill("a")
console.log(res)    // [ 'a', 'a', 'a' ]


let arr = [1, 2, 3]
let res = arr.fill("a", 1)
console.log(res)    // [ 1, 'a', 'a' ]
```

<br>

### **<font color="#C2185">arr.filter(): </font>**
根据回调函数中的 boolean 决定是否保留当前进行遍历的元素 将保留的元素作为新数组返回

常用于过滤(删除符合条件元素, 查找符合条件的元素)

参数:
callback
回调函数中需要返回布尔值

    - value
    - index
    - arr

this

返回值:
新数组

示例:
返回大于10的元素
```js
let arr = [12, 5, 8, 130, 33]

let res = arr.filter(item => item > 10)
console.log(res)    // [ 12, 130, 33 ]
```


根据输入的信息 返回数组中对应的元素
```js
let fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']

const filterItems = query => {
  // 字符串.indexOf() 方法 看看元素中的字符是否包含传入项
  return fruits.filter(item => item.indexOf(query) > -1)
}

let res = filterItems("ap")
console.log(res)    // [ 'apple', 'grapes' ]
```

### **<font color="#C2185">兼容性: </font>**
ok

<br>

### **<font color="#C2185">arr.find(): </font>**
根据回调中返回的boolean 返回数组中满足条件的*第一个元素*

参数:
callback
回调函数中要返回 boolean

返回值:
符合条件则 返回 符合条件的第一个元素
否则为 undefined

示例:
```js
const inventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];

let res = inventory.find(item => item.quantity == 2)
console.log(res)    // { name: 'apples', quantity: 2 }
```

### **<font color="#C2185">兼容性: </font>**
ie不行

<br>

### **<font color="#C2185">arr.findIndex(): </font>**
根据回调中返回的boolean 返回数组中满足条件的*第一个元素所在的index*

没有找到则为 -1

<br>

### **<font color="#C2185">arr.includes(): </font>**
用来判断一个数组是否包含一个指定的值 
如果包含则返回 true, 否则返回 false

参数:
1. 指定值
2. fromIndex
如果为负值则安升序从 arr.length + fromIndex 开始搜索

返回值:
boolean

**注意:**
1. 0的值将全部视为相等
2. 使用 includes()比较字符串和字符时是区分大小写的。
3. 如果 fromIndex >= arr.length 则直接返回false 且不搜索该数组

<br>

### **<font color="#C2185">arr.map(): </font>**
通过回调加工数组中的元素

参数:
callback

返回值:
新数组(一个由原数组每个元素执行回调函数的结果组成的新数组)

示例:
使用 map 重新格式化数组中的对象
```js
let arr = [
  {key: 1, value: 10},
  {key: 2, value: 20},
  {key: 3, value: 30}
]

let res = arr.map(item => {
  let obj = {}
  obj[item.key] = item.value
  return obj
})

console.log(res)
```

示例:
获取html结构中 被选中的表单项
```js
let nodes = document.querySelectorAll([type=checkbox]);

let res = [...nodes].map(item => item.value)
```

<br>

### **<font color="#C2185">arr.reduce(callback, 初始值): </font>**
对数组中的每个元素按序执行一个由您提供的 reducer 函数
每一次运行 reducer 会将先前元素的计算结果作为参数传入, 最后将其结果汇总为单个返回值。

### **<font color="#C2185">参数: </font>**
callback
    - preVal
    - currentVal
    - currentIndex
    - arr

### **<font color="#C2185">异常: </font>**
数组为空且初始值 initialValue 未提供。

### **<font color="#C2185">返回值: </font>**
reduce() 方法会归纳一个结果 这个结果就是返回值
所以 reduce() 中的回调要 return 一个结果

### **<font color="#C2185">场景: </font>**
汇总, 多个出来一个

**注意:**
第一次执行回调函数时, 不存在“上一次的计算结果”
如果需要回调函数从数组索引为 0 的元素开始执行, 则需要传递初始值()

否则, 数组索引为 0 的元素将被作为初始值, 这时候迭代器将从第二个元素开始执行(索引为 1 而不是 0)。


### **<font color="#C2185">示例: </font>**
1. 求数组所有值的和
```js
let arr = [1,2,3,4,5]
let res = arr.reduce((pre, item) => pre + item, 0)
console.log(res)
```

2. 累加对象数组里的值
```js
let arr = [
  {name: "sam", price: 400000},
  {name: "erin", price: 250000},
]

let res = arr.reduce((pre, item) => pre + item.price, 0)
console.log(res)
```

3. 将二维数组转化为一维
```js
let arr = [[0, 1], [2, 3], [4, 5]]

let res = arr.reduce((pre, item) => {
  // 方式1
  return [...pre, ...item]

  // 方式2
  return pre.concat(item)

}, [])

console.log(res)
// [ 0, 1, 2, 3, 4, 5 ]
```

4. 计算数组中每个元素出现的次数
```js
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']

let res = names.reduce((pre, item) => {
  if(pre[item]) {
    pre[item]++
  } else {
    pre[item] = 1
  }

  return pre
}, {})

console.log(res)
```

5. 按属性对 object 分类
比如: 
我们按照年龄来分类 将20岁的对象 放在一个数组中

```js
let people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

{
    20: [xx, xx],
    21: [xx, xx]
}
```

整理:
```js
let people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

/**
 * 
 * @param {*} arr 目标对象数组
 * @param {*} prop 指定按照什么属性来进行分组
 * @returns 
 */
const groupBy = (arr, prop) => {
  return arr.reduce((pre, item) => {

    // 将 age 的值取出来作为 对象中的 key
    let key = item[prop]

    // 如果pre对象中没有该属性名的话 进行初始化
    if(!pre[key]) {
      pre[key] = []
    }

    pre[key].push(item)

    return pre
  }, {})
}

let res = groupBy(people, "age")
console.log(res)

```


### **<font color="#C2185">高级应用: 按顺序运行 promise: </font>**
利用了 then() 方法中 return 的传递 形成了 promise链

### **<font color="#C2185">要点: </font>**
1. p1 p2 f3 p4 相当于 在定义 then() 中的回调 也就是怎么处理 then() 中的 resolve出来的结果
```js
function test(x) {
  console.log(x)
}

// 下面就是在定义 then() 的回调
runPromise(10).then(test)
runPromise(10).then(x => console.log(x))
```

2. p1 p2 f3 p4作为then()的回调 相当于在then中renturn, 那么return的结果会被包装为一个promise在下一个then()中接收到 相当于形成了一个 promise链

```js
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5)
  })
}

function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2)
  })
}

function f3(a) {
  return a * 3
}

 function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4)
  })
}


// 定义 汇总 promise链
function runPromiseSequence(promiseArr, input) {
  return promiseArr.reduce((promise, fn) => {

    // 参数 promise 是初始值 Promise.resolve的结果 也就是说在它的then中可以拿到 resolve出来的结果

    // 方式1:
    return promise.then(fn)

    // 方式2:
    return promise.then(res => {
      return fn(res)
    })
  
  // 该值作为 promise初始值 会被下一个promise then中接收
  }, Promise.resolve(input))
}

// 将上面的 promise 整理成一个数组
let promiseArr = [p1, p2, f3, p4]

runPromiseSequence(promiseArr, 10).then(res => {
  console.log(res)  // 1200
})
```

<br>

### **<font color="#C2185">arr.flat(num): </font>**
当数组中有*嵌套数组*的时候 用于扁平化数组的操作

参数:
1: 拉平2层嵌套  (默认值)
2: 拉平2层嵌套
3: 拉平3层嵌套

```js
let arr = [1,2,3,[4,5,6]]
let res = arr.flat()
console.log(res)    // [ 1, 2, 3, 4, 5, 6 ]


// 当有2层嵌套的时候 不传递参数 则[7,8,9]打不开
let arr = [1,2,3,[4,5,6, [7,8,9]]]
let res = arr.flat()
console.log(res)
// [ 1, 2, 3, 4, 5, 6, [ 7, 8, 9 ] ]
```

**注意:**
如果数组中有空项 则会移除掉该空项(不包括空字符串)
```js
let arr = [1,2,,5]
let res = arr.flat()
console.log(res)  // [1,2,5]
```

### **<font color="#C2185">兼容性: </font>**
ie不行

<br>

### **<font color="#C2185">arr.flatMap(): </font>**
该方法只能用于 1维数组 使用方式类似 map()
也可以通过回调来加工每一个元素
但是如果加工结果是2维数组的话 会自动拉成一维数组

也就是说 在map()的同时直接拉平

参数
callback

返回值:
新数组

示例:
使用map()的效果 
将每一个元素加工成一个数组
```js
let arr = [1,2,3]

let res = arr.map(item => {
  return [item * 2]
})
console.log(res)
// [ [ 2 ], [ 4 ], [ 6 ] ]
```

使用 flatMap() 的效果
结果自动被拉平了
```js
let arr = [1,2,3]

let res = arr.flatMap(item => {
  return [item * 2]
})
console.log(res)
// [ 2, 4, 6 ]
```

场景1:
我们在使用 str.split() 的时候 会将字符串按照规则切割成数组 那么就会产生下面的效果 结果是一个二维的

需求: 
将每一个单词收集到数组中

使用 map() 的效果: 结果是一个二维数组
```js
let arr = ["This is a new technology stack", "", "vue"]

// 将每一个单词收集到数组中
let res = arr.map(item => {
  return item.split(" ")
})

console.log(res)

[
  [ 'This', 'is', 'a', 'new', 'technology', 'stack' ],
  [ '' ],
  [ 'vue' ]
]
```

使用 flatMap() 的效果 跟上面的map()一样 但是结果会拉平二维数组
```js
let arr = ["This is a new technology stack", "", "vue"]

let res = arr.flatMap(item => {
  return item.split(" ")
})

console.log(res)
// [ 'This', 'is', 'a', 'new', 'technology', 'stack', '', 'vue' ]
```

<br>

### **<font color="#C2185">arr.push(): </font>**
将一个或多个元素添加到数组的末尾, 并返回

参数:
直接写数组元素

返回值:
该数组的新长度。

示例:
合并两个数组
```js
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables);
// ['parsnip', 'potato', 'celery', 'beetroot']
```
    
<br>

### **<font color="#C2185">arr.pop(): </font>**
从数组中删除最后一个元素, 并返回该元素的值 一次删除一个
*对数组的末尾进行操作*

参数:
没有参数

返回值:
删掉的元素
当数组为空时返回undefined


示例:
删除掉数组的最后一个元素
```js
const arr = ['Fire', 'Air', 'Water'];

let res = arr.pop()
console.log(res)  // Water
console.log(arr)  // [ 'Fire', 'Air' ]
```


<br>

### **<font color="#C2185">arr.unshift(): </font>**
在数组前面添加多个元素    
参数:
    - 直接写数组元素

返回值:
    - 新的长度(可以创建变量 接收这个方法的返回值)

是否影响原数组:
    - yes

<br>

### **<font color="#C2185">arr.shift(): </font>**
删除数组中的第一个元素, 一次删除一个
对数组的前面进行操作

参数:
没有参数

返回值:
删掉的元素
如果数组为空则返回undefined

是否影响原数组:
yes

示例:
shift() 方法经常用于 while loop 的环境中.。下例中每个循环将要从一个数组中移除下一项元素, 直至它成为空数组
```js
var names = ["Andrew", "Edward", "Paul", "Chris" ,"John"];

while( (i = names.shift()) !== undefined ) {
    console.log(i);
}
// Andrew, Edward, Paul, Chris, John
```

<br>

### **<font color="#C2185">arr.slice()  : </font>**
提取指定元素 返回新数组

参数:
开始索引(包括): 默认值为0
<!-- 
    可以为负值, 则表示从原数组中的倒数第几个元素开始提取, slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素(包含最后一个元素)。 
-->

结束索引(不含)


是否影响元素组:
no

返回值
新数组

示例:
```js 
    let arr = [1, 3, 5]
    let res = arr.slice(0, 2)
    console.log(res)    // [ 1, 3 ]
```

利用 slice() 方法 提取数组中的 3 4
```js
let arr = [1,2,3,4,5]

// slice() 方法要求传递的是 开始索引 和 结束索引 元素3 4所处的索引是 -3 和 -2
let res = arr.slice(-3, -1)

console.log(res)    // [3, 4]
```


### **<font color="#C2185">技巧: </font>**
提取一个元素: 
两个参数为相邻:  0 1 和 1 2 和 2 3

负数为数组的末尾开始数 倒数第一个元素为 -1
  
<br>

### **<font color="#C2185">arr.splice(): </font>**
可以删除(插入 替换)数组中的指定元素并将被删除元素作返为回值返回

参数:
1. 开始位置(包含)
2. 删除几个
3. 传递新的元素会插在开始索引的前面

返回值:
删掉的元素(删除的元素也是在一个数组当中)

是否影响原数组:
yes

### **<font color="#C2185">技巧: </font>**
1. 我们经常会从数组中删除一个指定的元素 那就需要知道该元素在数组中的索引值

所以我们会使用 indexOf() 方法 它会返回该元素的索引值
```js 
    let arr = [1, 3, 5]
    let index = arr.indexOf(3)
    
    arr.splice(index, 1)
```

2. 删除指定元素: 
第一个参数决定位置 第二个参数为1就是删一个

3. 插入元素
第二个元素为0(代表不删)第一个元素决定插入位置(前面)
<!-- 
    从头插入新的元素 arr.splice(0,0,"新的元素")  
 -->    

4. 替换元素: 
可以删除的同时添加新元素就起到了替换的效果 
原位置替换
```js
    var result = arr.splice(0,1,"新插入的元素");
    console.log(result);
    console.log(arr);
```
    
<br>

### **<font color="#C2185">arr.join(): </font>**
将一个数组(或一个类数组对象)的所有元素连接成一个字符串
如果数组只有一个项目, 那么将返回该项目而不使用分隔符。

参数:
指定连接数组元素的符号

默认情况下使用 , 进行分割
```js
const arr = ['Fire', 'Air', 'Water'];

let str = arr.join()
console.log(str)    // Fire,Air,Water
```

如果传递空字符串则 元素会连接在一起
```js
const arr = ['Fire', 'Air', 'Water'];

let str = arr.join("")
console.log(str)    // FireAirWater
```

返回值:
字符串
如果 arr.length == 0, 则返回空字符串。


**注意:**
如果一个元素为 *undefined 或 null*, 它会被转换为*空字符串。*


### **<font color="#C2185">技巧: </font>**
这个方法可以将2维数组 直接转换成字符串
```js
    let arr = [[1,2], [3,4]]
    let res = arr.join()        // 1,2,3,4
```

<br>

### **<font color="#C2185">arr.toString(): </font>**
把数组转换为字符串, 逗号分隔每一项

参数:
貌似没有

返回值:
转换后的字符串

是否影响原数组:
no

```js
let arr = [1, 3, 5]
console.log(arr.toString())
// 1,3,5
```

<br>

### **<font color="#C2185">arr.reverse(): </font>**
翻转数组
该方法用来反转数组前边的去后边后边的去前面

参数:
没有

返回值:
没有

是否影响原数组:
yes

示例:
```js
let arr = ["a", "b", "c"]
arr.reverse()
console.log(arr)    // [ 'c', 'b', 'a' ]
```

颠倒类数组中的元素
类数组的要点:
1. 属性名为 index
2. 对象中要有 length 属性

```js
const a = {
  0: 1, 
  1: 2, 
  2: 3, 
  length: 3
};

Array.prototype.reverse.call(a)
console.log(a)
// { '0': 3, '1': 2, '2': 1, length: 3 }
```

<br>

### **<font color="#C2185">arr.sort(): </font>**
排序
可以用来对数组中的元素进行排序

默认顺序
将元素转换为字符串, 然后比较它们的 unicode

参数:
回调

返回值:
没有

是否影响原数组:
yes
        
**注意:**
如果是单位还可以, 双位会出现问题
默认按照unicode编码进行排序
```js
let arr = [3,4,2,11,5]      
console.log(arr.sort())
    // [ 11, 2, 3, 4, 5 ]

// 11在最前面了 即使对于纯数字的数组排序使用sort排序也会按照unicode排所以对数字, 进行排序时可能会得到错误的结果 
```
    

### **<font color="#C2185">sort(function(a, b){ return a-b or b-a}): </font>**
我们可以在sort()中添加一个回调函数来指定排序规则
回调函数需要定义两个形参

 - 浏览器会根据回调函数的返回值来决定元素的顺序
    
    如果返回一个大于0的值则会交换位置
    如果返回一个小于0的值则元素位置不变
    如果返回一个等于0的值则认为两个元素相等位置也不变
    
    return a-b;     升序排列          
    return b-a;     降序排列


### **<font color="#C2185">定义排序规则: </font>**
我们可以自己指定排序的规则
```js
var arr = [5,4,2,1,3,6,8,7];
arr.sort(function(a,b){
    if(a>b{
        return 1;

    }else if(a<b){
        return -1;
        
    }else{
        return 0;
    })
});

console.log(arr);
```

**注意:**
1. 元素数组为字符串的时候
方式1:
我们可以直接使用 sort()

方式2:
我们可以按照 字符串的length进行排序 但是 字符一样的时候 没办法
(a, b) => a.length - b.length

方式3:
### **<font color="#C2185">str1.localeCompare(str2): </font>**
如果 str1 < str2 则返回-1
如果 str1 > str2 则返回 1
如果相当 则返回0 

```js
arr.sort((a, b) => {
  return b.localeCompare(a)
})
```

vue里
```js
<li><button @click="changeSort(true)">升序</button></li>
<li><button @click="changeSort(false)">降序</button></li>

data() {
    return {
        list: ["abc", "zan", "bde", "cdf"],
    }
},

changeSort(flag) {
    flag
        ? this.list.sort((a, b) => a.localeCompare(b))
        : this.list.sort((a, b) => b.localeCompare(a))
} 
```

<br>

### **<font color="#C2185">arr.indexOf()     根据元素 返回索引: </font>**
通过给定元素数组中查找给定元素的第一个索引

参数:
1. 元素(数组中元素的整体)

2. fromIndex
开始查找的位置
如果 fromIndex >= arr.length 则直接返回 -1
如果 fromIndex 为负数 则从最后一个元素开始也就是 -1的位置

**注意:**
如果 fromIndex 为负值 并不改变其查找顺序, 查找顺序仍然是从前向后查询数组

返回值:
给定元素所在的索引, 如果不存在则返回 -1

示例:
```js
var arr = [2, 5, 9];

let index = arr.indexOf(2)
console.log(index)  // 0

index = arr.indexOf(7)
console.log(index)  // -1

// 因为从-1的位置开始查找的话 找不到2
index = arr.indexOf(2, -1)
console.log(index)  // -1
```

示例:
查找指定元素出现的所有位置
```js
let arr = ['a', 'b', 'a', 'c', 'a', 'd'];
let subscripts = []

// 先确定 指定元素的起始位置
let index = arr.indexOf("a")

while(index != -1) {
  // 每次先推到下标数组中
  subscripts.push(index)

  // 更新index的位置
  index = arr.indexOf("a", index + 1)
}

console.log(subscripts)
```

判断一个元素是否在数组里 不在则更新
```js
let veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];

function updateView(arr, item) {

  // 证明元素不在数组中
  if(arr.indexOf(item) == -1) {
    // 元素不在数组中则推进去
    arr.push(item)

  // 证明元素在数组中
  } else if(arr.indexOf(item) > -1) {
    // 元素在数组中则做对应的操作
    console.log("一些操作")
  }
}
```

<br>

### **<font color="#C2185">arr.lastIndexOf()     根据元素 返回索引: </font>**
通过给定元素数组中查找给定元素的第一个索引
*从后往前查找*(从 fromIndex 开始) 

返回值: 
如果存在返回索引号, 如果不存在则返回-1
找到的结果索引 还是从左往右数的结果

参数:
1. 被查找的元素
2. fromIndex
从此为止开始逆向查找 默认值: arr.length - 1

示例:
```js
var arr = [2, 5, 9, 2]

let index = arr.lastIndexOf(2)
// 因为是从后往前查找 所以首先返回的是最后的2
console.log(index)  // 3
```

<br>

### **<font color="#C2185">Array.from(): </font>**
将一个类数组或可迭代对象创建新的数组
比如: 
我们可以传递 节点 或者 字符串 或 可迭代对象(Map Set)

参数:
1. arrLike
2. mapFn
3. this

示例:
将 String 生成数组
```js
Array.from('foo');
// [ "f", "o", "o" ]
```

将 Set 转成数组
```js
let set = new Set(["a", "b", "c"])
console.log(set)
//  Set(3) { 'a', 'b', 'c' }

set = Array.from(set)
console.log(set)
// [ 'a', 'b', 'c' ]
```

将 Map 转成数组
```js
const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([['1', 'a'], ['2', 'b']]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];

```

数组去重合并
```js
function combine() {
  // [ [ 1, 2, 3 ], [ 2, 3, 5 ] ] 整合到一起
  // 方式1:
  let arr = [...arguments].flat()

  // 方式2:
  let arr2 = [...arguments].reduce((pre, item) => {
    return [...pre, ...item]
  }, [])
  
  // 方式3:
  let arr3 = [].concat.apply([], arguments)

  // 进行去重
  return Array.from(new Set(arr))
}

let arr = [1,2,3]
let arr2 = [2,3,5]

combine(arr, arr2)
```

### **<font color="#C2185">兼容性: </font>**
ie不行

<br>

### **<font color="#C2185">Array.of(): </font>**
根据传入的参数 创建数组

```js
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]


// 这里和 构造函数 创建数组的方式不同
new Array(7);          // [ , , , , , , ]
```

<br>

### **<font color="#C2185">Array.isArray(): </font>**
判断传递的值是否是一个数组

返回值:
boolean

```js
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array('a', 'b', 'c', 'd'))

// 鲜为人知的事实: 其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype);

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray(new Uint8Array(32))
Array.isArray({ __proto__: Array.prototype });

```

**注意:**
当检测 Array 实例时, Array.isArray 优于 instanceof, 因为 Array.isArray 能检测 iframes。
```js
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
const arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true

// 被认为是有害的, 因为不能通过iframes来工作
arr instanceof Array; // false
```

<br>

# forEach() 和 some()的区别

### **<font color="#C2185">要点: </font>**
1. 在forEach中return不会终止迭代
2. 在some中return true 会终止迭代
some()一定要写return true 意思是找到元素就不要继续遍历了, 如果写false说明没有找到这个元素 会一直往下去找
```js
    let arr = ['red', 'green', 'blue', 'pink'];
    arr.forEach(function(value) {
        if(value == 'green') {
            console.log('找到了该元素');

            // 想到找元素后就退出
            return true;        // 在forEach中return不会终止迭代
        }

        console.log(11);        // 依然输出了3次
    })


    arr.some(function(value) {
        if(value == 'green') {
            console.log('找到了该元素');

            // 想到找元素后就退出
            // 在some里面遇到return true就会终止遍历 迭代效率更高
            return true;        
        }

        console.log(11);        // 没有输出
    })
```

### **<font color="#C2185">filter是满足条件的所有元素放入到一个新数组里面: </font>**
那filter能不能 return true来终止循环呢?
filter和forEach一样的 遇到return true不会终止循环

<br>

# 对象(具体的事物)
现实生活中, 万物皆对象, *对象是一个具体的事物*, 看得见摸得着的实物, 例如. 一本书, 一辆汽车, 一个人, 都可以是对象, 一个数据库, 一张网页, 一个与远程服务器的链接也可以是对象

<!-- 
    非对象      对象
    明星        周星驰

    女朋友      迪丽热巴
    班主任      咱班班主任

    苹果        这个苹果
    手机        小米手机
    游戏        刺激战场

    左列都是泛指的 右列才是具体的事物
 -->

js中的对象, 是一组无序的相关属性 和 方法的集合, 所有的事物都是对象, 例如:字符串, 数值, 数组, 函数等


### **<font color="#C2185">对象是由 属性 和 方法 组成的: </font>**
属性: 事物的特征, 在对象中用属性来表示(常用名词)
方法: 事物的行为, 在对象中用方法来表示(常用动词)

<!-- 
大小, 颜色, 重量                打电话, 发短信, 玩游戏

                    手机
      属性                            方法
 -->


### **<font color="#C2185">为什么需要对象: </font>**
保存一个值的时候, 可以使用变量, 保存多个值(一组值)时, 可以使用数组, 如果要保存一个人的完整信息(体重 身高 年龄)
<!--
    数组也可以但是结构不清晰, 比如let arr = [128, 134] 这是什么? 
--> 

js中的对象表达结构更清晰, 更强大
```js
    let sam = {
        age:128,
        height:154,
        sex:
        address
    }
```


### **<font color="#C2185">js中的数值类型: : </font>**
String
Number
Boolean
Null
Undefined
<!-- 
    以上的五种为基本数据类型以后我们看到的值只要不是上面的5种都是对象 
-->

Object


### **<font color="#C2185">基本数据类型的不足: : </font>**
基本数据的类型都是单一的值, 值和值之间没有任何的联系但如果在js中表示人的信息
比如:姓名 性别 年龄(如果用基本数据类型怎么表示)

        var name = "孙悟空"
        var gender = "男"
        var age = 18
        
基本数据类型也能表示人的信息但是他们之间没有关系互相都是独立的并不是一个整体, 
但将这三个数据放到一个塑料袋里就成为一个整体了塑料袋就是对象

装在一起好处: 关系明确方便操作


**对象属于一种复合的数据类型在对象中可以保存多个不同数据类型的属性**


### **<font color="#C2185">对象的分类: : </font>**
1. 内建对象
由ES标准中定义的对象在任何的ES的实现中都可以使用
比如: 
Math String Number Boolean Function Object

2. 宿主对象
由JS的运行环境提供的对象目前来讲主要指由浏览器提供的对象
比如: BOM(浏览器对象模型) DOM(文档对象模型)

3. 自定义对象
由开发人员自己创建的对象这个最难从这个开始学习

<br>

# 变量, 属性, 函数, 方法的区别
### **<font color="#C2185">变量和属性的相同点: </font>**
都是存储数据的

### **<font color="#C2185">变量和属性的不同点: </font>**
变量:
    单独声明并赋值 使用的时候直接写变量名 (单独存在)

属性:
    在对象里面 不需要声明, 使用的时候必须是 *对象.属性*


### **<font color="#C2185">函数和方法的相同点: </font>**
都是实现某种功能, 某件事


### **<font color="#C2185">函数和方法的不同点: </font>**
函数:
    单独声明, 并且调用的时候 函数名() (单独存在)

方法: 
    在对象里面 调用的时候 对象.方法()


### **<font color="#C2185">创建对象的方式: 对象字面量 创建对象: </font>**
里面的属性或方法我们采取键值对的形式, 
    
    键: 属性名(String),  值: 属性值

多个属性或者方法中间用逗号隔开的 方法冒号后面跟的是一个匿名函数

```js
    let obj = {
        uname: '张三疯',
        age: 18,
        sex: '男',

        sayHi: function() {
            console.log('hi~');
        }
    };
```

**注意:**
使用对象字面量可以在创建对象时直接指定我们对象中的属性
属性名可以加引号也可以不加但属性名太怪的话要加上 引号
```js
    let obj = {
        'default-name': "sam"
    }
```


### **<font color="#C2185">使用对象: </font>**
调用对象的属性, 采取 . 我们理解为 xx的xx属性

    对象名.属性名
    对象名[属性名]


调用对象的方法, 别忘记添加小括号

    对象名.方法名();

<br>

### **<font color="#C2185">创建对象的方式: new Object(): </font>**
构造函数是专门用来创建对象的函数, 使用typeof检查一个对象时会返回object

```js
    // 使用new关键字调用的函数是构造函数constructor
    var obj = new Object();     // 创建了一个空对象
```


### **<font color="#C2185">添加属性: </font>**
### **<font color="#C2185">语法: 对象.属性名 = 属性值;: </font>**

```js
    var obj = new Object();

    obj.name = "孙悟空"; 
    obj.gender = "男";
    obj.age = 18;
```

我们是利用 等号 = 赋值的方法 添加对象的属性和方法
每个属性和方法之间用分号结束


### **<font color="#C2185">读取对象属性: </font>**
### **<font color="#C2185">语法: 对象.属性名: </font>**

```js
    obj.name;
    obj.gender;
    obj.age;

    obj.sayHi();

    // 如果读取对象中没有的属性不会报错而是返回undefined
    console.log(obj.name);
```


### **<font color="#C2185">修改属性: </font>**
### **<font color="#C2185">语法: 对象.属性名 = 新值: </font>**
```js
    obj.name = "tom";
```

### **<font color="#C2185">删除对象属性: </font>**
### **<font color="#C2185">语法: delete obj.name: </font>**


```js
    // 如果输出: 
    console.log(say)    //会是一个对象
    console.log(say())  //会是内部语句产生的结果
        
    // 如果函数内部没有return输出时, 会是内部语句产生的结果+undefined 
    console.log(say())
```

<br>

### **<font color="#C2185">创建对象的方式: 使用工厂方法创建对象: </font>**
工厂方法可以大批量创建对象

```js
    function creatPerson(name, age, gender){

        // 在函数内部创建一个新的对象
        var obj = new Object();

        // 创建完新的对象后向我们的新对象添加属性 
        obj.name=name;
        obj.age=age;
        obj.gender=gender;

        obj.sayName=function(){
            alert(this.name);
        }

        // 将新的对象返回
        return obj;
    }

    var obj2 = creatPerson("孙悟空",18,"男");      
    var obj3 = creatPerson("白骨精",16,"女");      
    var obj4 = creatPerson("蜘蛛精",18,"女"); 
```

### **<font color="#C2185">利用工厂函数创建的对象的区别: </font>**
使用工厂方法创建的对象使用的构造函数都是Object, 所以创建的对象都是Object这个类型就导致我们无法区分出不同类型的对象

<br>

# 构造函数 与 原型
class的概念是es6的时候提出的, 在以前的时候我们是通过构造函数 和 原型来做的

在典型的OOP的语言中(java), 都存在类的概念, 类就是对象的模板, 对象就是类的实例, 但是在es6之前 js中并没有引入类的概念

es6是2015年的时候发布, 但是目前浏览器的js是es5版本, 大多数高版本的浏览器也支持es6, 但是只不过实现了es6的部分功能

在es6之前, 对象不是基于类创建的, 而是用一种称为构造函数的特殊函数来定义对象和他们的特征
<!-- 
    面向对象的主要思路
    就是把公共的部分抽取出来 抽成一个类 通过这个类来创建对象
 -->

### **<font color="#C2185">创建对象可以通过以下的3种方式: </font>**
1. 对象字面量
2. new Object()
3. 自定义构造函数

<br>

### **<font color="#C2185">创建对象的方式: 构造函数(通过类的实例化创建对象): </font>**
前面的两种方式创建对象时, 一次只能创建一个对象, 里面很多的属性和方法是大量相同的, 我们只能复制, 因此可以利用函数的方法, 重复这些相同的代码, 我们就把这个函数称为 构造函数

为什么是构造函数? 里面封装的不是普通的代码, 而是对象
构造函数封装的是一个对象 所以才叫构造函数？？？？？？？ 卧槽


### **<font color="#C2185">构造函数: </font>**
是一种特殊的函数, *主要用来初始化对象*, 即为对象成员变量赋初始值 它总与*new运算符一起使用*, 把我们对象里面一些相同的属性 和 方法抽象出来封装到函数里面

### **<font color="#C2185">要点: </font>**
调用构造函数必须使用 new 类名()
我们只要new Star() 调用函数就创建一个对象


### **<font color="#C2185">书写格式: </font>**
构造函数的首字母要大写
构造函数不需要 return 就可以返回结果

```js
    function 构造函数名() {
        // this可以理解当前的意思 表示是哪个对象
        this.属性 = 值;
        this.方法 = function() {};
    }

    // 使用的使用要用new
    let intance = new 构造函数名();
```

示例:
这里就相当于把公共部分抽取了出来, 然后通过实例来创建对象
```js 
    function Star(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.sing = function(sang) {
            console.log(sang)
        }
    };

    let ldh = new Star('刘德华', 18, '男');
    ldh.sing('冰雨');
```
    

对象的属性值可也是任何的数据类型, 能是对象也能是函数
<!-- 
    函数也可以成为对象的属性
    如果一个函数作为对象的属性来保存 那我们称这个函数是这个对象的方法
    
    调用函数就是说调用对象的方法(method), 但是它只是名称上的区别没有其它的区别 
-->

### **<font color="#C2185">new 关键字执行过程: </font>**
1. 当我们构造函数遇见new时候 会在内存中创建一个空的对象
2. this都会指向这个空的对象
3. 执行构造函数里面的代码, 给这个空对象添加属性 和 方法
4. 返回这个对象, new的最后会返回这个对象, 所以就不需要return了

<br> 

### **<font color="#C2185">类中的: 静态成员 实例成员: </font>**
js的构造函数中可以添加一些成员

成员:
构造函数中的属性和方法我们叫成员, 成员可以添加, 因为构造函数的本质就是一个对象 所以叫做添加成员

可以在构造函数本身上添加, 也可以在构造函数内部的this上添加, 通过这两种方式添加的成员, 就分别称为*静态成员和实例成员*


### **<font color="#C2185">静态成员: </font>**
在构造函数本身添加的成为成为静态成员, 只能由构造函数本身来访问
也就是通过 
    类名.属性 = xx
    类名.方法 = xx

```js
    function Person(name, age) {
        this.name = name;
        this.age = age;
        
        // 内部添加静态成员
        Person.address = '中国';
    }

    let per1 = new Person('sam', 18)
    console.log(Person.sex)

    // 外部添加静态成员
    Person.sex = '男';
```

### **<font color="#C2185">要点: </font>**
1. 在构造函数内部 也可以添加 静态属性和方法 但是这种添加方式必须要 new Person() 之后才能调用 不然就是undefined
在外部添加的成员 不用 new Person() 就可以直接调用

2. 静态成员只能通过构造函数来访问
```js
console.log(Person.sex)
```

3. 不能通过实例对象来访问
```js
console.log(ldh.sex)   // undefined
```

<br>

### **<font color="#C2185">实例成员: </font>**
在构造函数内部创建的对象成员称为实例成员, 只能由实例化的对象来访问

就是构造函数内部通过this添加的成员
    this.属性 = xx
    this.方法 = xx
<!-- 
    构造函数中的name age sing就是实例成员 他们都是通过this来添加的 
    添加到new时创建的实例对象身上
-->
    
### **<font color="#C2185">要点: </font>**
1. 实例成员只能通过实例化对象后 通过实例化的对象来访问
```js
let ldh = new Star("刘德华", 18, "冰雨")
console.log(ldh.name)
```

2. 实例成员不能通过构造函数来访问
```js
console.log(Star.name)     // undefined
```

<br>

### **<font color="#C2185">在构造函数(类)中 给实例对象添加 固定死的数据: </font>**
es5
```js
function Father() {
    this.name = "张三"
}
```

es6
```js
class Father {
    name = "张三"
}
```


### **<font color="#C2185">在构造函数(类)中 给实例对象添加 动态数据: </font>**
如果需要通过 实例对象的实参传递数据的话
es5
```js 
    function Father(name, age) {
        this.name = name
        this.age = age
    }
```

es6
```js 
    class Father {
        constructor(name) {
            this.name = name
            this.age = age
        }
    }
```

<br>

### **<font color="#C2185">构造函数的问题: </font>**
构造函数方法很好用, 但是存在浪费内存的问题
```js
    function Star(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.sing = function(sang) {
            console.log(sang)
        }
    };

    let ldh = new Star('刘德华', 18);
    let zxy = new Star('张学友', 19);
```

### **<font color="#C2185">解析: : </font>**
当创建第一个实例对象的时候 new就开辟了一个空间name age sex还好简单的数据类型 

但是 sing是个函数 函数也是对象 也就是说 它还要单独开辟一个空间用来存放这个函数对象

zxy的实例对象也是一样需要单独开辟一个存放函数对象的空间, 而且, 这两个空间还是同一个功能的函数对象, 这就是浪费内存的问题

    ldh.sing === zxy.sing   // false   
    
因为比较的是内存地址, 说明每一个空间都是独立的 这样不好吧 因为功能是一样的, 你还单独开辟空间

<br>

### **<font color="#C2185">构造函数原型 prototype: </font>**
构造函数通过原型, *原型上的属性和方法都是所有实例对象所共享的*

js规定, 每一个构造函数都有一个prototype属性, 指向另一个对象, 注意这个prototype就是一个对象, 这个对象的所有属性和方法 都会被构造函数所拥有

我们可以把那些不变的方法, 直接定义在prototype对象上, 这样所有的对象的实例都可以共享这些方法

```js
    function Star(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    };

    // 向构造函数的原型对象上添加方法
    Star.prototype.sing = function(sang) {
        console.log(sang);
    }

    ldh.sing('冰雨');
```

**原型对象的主要作用就是共享方法 不需要开辟新的内存空间 节约资源**


一般情况下, 
    公共属性定义到构造函数里面
    公共的方法我们放到原型对象上


### **<font color="#C2185">示例: </font>**
要点:
即使是原型对象上的公共方法我们也可以向其传递参数
原型对象中的方法中的this 仍然指向实例对象
```js
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.say = function(content) {
  console.log(this.name + ": " + content)
}

let p = new Person("sam", 18)
p.say("加油！")
```

<br>

### **<font color="#C2185">实例对象身上的 __proto__: </font>**
实例对象都会有一个属性 __proto__指向构造函数的prototype原型对象,之所以我们对象可以使用构造函数prototype原型对象的属性和方法, 就是因为实例对象有__proto__原型的存在

```js
p.__proto__ == Person.prototyp  // true
```

当我们实例化对象的时候 系统会自动在实例对象身上添加 __proto__ 属性 指向 构造函数(类).prototype 原型对象


**__proto__对象原型和原型对象prototype是等价的**


### **<font color="#C2185">方法的查找规则: </font>**
首先先看实例对象身上有没有sing方法, 如果有就执行这个对象上的sing方法
如果没有sing这个方法, 因为有__proto__的存在, 就去构造函数原型对象身上去查找sing这个方法

**__proto__ 不能赋值, 它只是指明了一条可以查找的线路**

<br>

### **<font color="#C2185">constructor 构造函数: </font>**
对象原型(__proto__)和构造函数(prototype)原型对象里面都有一个属性 constructor属性, constructor我们称为构造函数, 因为它指回构造函数本身
<!-- 
    实例对象__proto__
    构造函数prototype
            它们都指向了 构造函数本身
 -->

### **<font color="#C2185">原型对象中constructor属性(es5)的作用: </font>**
constructor主要用于记录该对象引用于哪个构造函数, 它可以让原型对象重新指向原来的构造函数

```js 
    // 这样能看的更明确一切
    console.log(Person.prototype.constructor)
    // [Function: Person]
    console.log(p.__proto__.constructor)
    // [Function: Person]
```


**注意:**
如果我们是以对象的形式修改了prototype的话(进行了对象的赋值操作), 我们必须手动的把constructor修改回去

示例:
我们可以把一些公共的方法放到原型对象里面, 所以里面的方法可能不只有一个

```js
Star.prototype.sing = function() {
    console.log('我会唱歌')
}

Star.prototype.movie = function() {
    console.log('我会演电影')
}

// 这时候 constructor指向的还是原来的构造函数 Star
console.log(Star.prototype.constructor);
console.log(ldh.__proto__.constructor);
```

这么添加的方法的话 还是有些麻烦, 为什么不用对象的方式创建它们呢? 对象的结构比较清晰
```js
    Star.prototype = {
        sing: function() {
            console.log('我会唱歌')
        }, 
        movie: function() {
            console.log('我会演电影')
        }
    }

    // 此时指向的就不是原来的构造函数了, Object
    console.log(Star.prototype.constructor);    
    console.log(ldh.__proto__.constructor);
```

 原因:
Star.prototype是一个对象, 如果是通过 . 的形式 就是在这个对象里面添加新的方法 

但是如果是Star.prototype = { }
相当于把原先的给覆盖掉了, 覆盖后里面就没有constructor这个属性了 要是没有constructor的话就没办法指回Star了 这时候我们就要手动的指回去, 这样

我们要再在原型对象中 添加 constructor 属性 值为 构造函数
```js
Star.prototype = {


    constructor: Star //手动添加


    sing: function() {
        console.log('我会唱歌')
    }, 
    movie: function() {
        console.log('我会演电影')
    }
}
```

<br>

### **<font color="#C2185">构造函数(类) 实例对象 原型对象 三者之间的关系: </font>**

                Star.prototype
Star构造函数        ---- >          Star原型对象
      ↓                              prototype
                   < ----           
            Star.prototype.constructor
      ↓                                 ↑

            通过new创建了               ↗
            ldh实例对象         ldh.__proto__

<br>

# ES6中的类和对象
面向对象更贴近我们的实际生活 可以使用面向对象描述现实世界事物, 但事物分为具有的事物和抽象的事物
<!-- 
    比如 抽象的(泛指的):    手机        它是一个类别
         具体的(特指的):    我的手机    就是有具体的
 -->

### **<font color="#C2185">面向对象的思维特点: </font>**
抽取(抽象)对象共用的属性和行为组织(封装)成一个类(模板)
对类进行实例化, 获取类的对象
面向对象编程 我们考虑是有哪些对象, 按照面向对象的思维特点 不断的创建对象, 使用对象, 指挥对象做事情
<!-- 
    比如:
    首先我们把手机的公共的行为和属性抽取出来, 封装为一个模板 这个模板里面有我们共用的属性和方法 手机都可以打电话发短信 手机有屏幕尺寸和重量之类的

    根据这个类(模板) 生产出很多对象  
 -->

### **<font color="#C2185">类 class: </font>**
在es6中新增加了类的概念, 可以使用class关键字声明一个类, 之后以这个类实例化对象
类抽象了对象的公共部分, 它泛指某一大类(class)
对象特质某一个 通过类实例化一个具体的对象


### **<font color="#C2185">创建 类: </font>**
语法:
```js
    class name {
        // classbody
    }
```

示例:
创建一个明星类
```js
class Star {

}
```


### **<font color="#C2185">实例化对象: </font>**
```js
new Star()
```

### **<font color="#C2185">es6 实例化对象传参: </font>**

### **<font color="#C2185">constructor 构造函数 : </font>**
有了它就可以传递参数了
constructor()方法是类的构造函数(默认方法), 用于传递参数 返回实例对象, 有了它就不用return了 

通过 new 命令生成对象实例时, 自动调用该方法, 如果没有显示定义, 类内部会自动给我们创建一个constructor()

### **<font color="#C2185">使用方法: </font>**
```js
class Star {
    constructor(形参uname) {
        this.uname = uname;
    }
}

let ldh = new Star('刘德华');
```

只要用new创建的实例 就会自动调用constructor函数
实参(刘德华) 传递给 形参uname, 形参uname会把刘德华传递给this.uname
this指向的是ldh这个创建的实例


**注意:**
1. 通过class关键字 创建类 类名我们还是习惯定义首字母大写
2. 类里面有个constructor函数, 可以接受传递过来的参数, 同时返回实例对象

3. constructor函数只要new生成实例时, 就会自动调用这个函数, 如果我们不写这个函数, 类也会自动生成这个函数

4. 生成实例 new 不能省略
5. 最后注意语法规范, 创建类 类名后面不要加小括号, 生成实例, 类名后面加小括号, 构造函数不需要加function


### **<font color="#C2185">总结: </font>**
```js
class Star {

    // 我们使用constructor构造函数来传递参数, 它会返回实例对象
    constructor(name, age) {
        // 这里注意 因为constructor中的属性会返回给实例对象, 所以必须要用this动态的指回实例对象
        this.name = name;
        this.age = age;
    }
};

// 通过new来生成实例对象时, 会自动调用constructor方法
let ldh = new Star('刘德华', 18);
console.log(ldh);
```


### **<font color="#C2185">class - 方法: </font>**
直接将函数写在Star类中就可以了
不需要写function关键字
在类里 多个函数 方法之间不需要添加逗号分隔 不需要写 ,
```js
class Star {
    // 传递参数用的
    constructor(name) {
        this.name = name;
    }

    // 方法直接写在class部分里,写在这里, 在这里所有的函数不需要加 function 关键字
    say() {
        console.log(this.name+'你好')
    }
}

ldh.sing();     // 也可以传递参数
```


### **<font color="#C2185">class - 继承 extends: </font>**
在程序里 子类可以继承父类的一些属性 和 方法
使用 extends 关键字

```js
    // 创建 父类
    class Father {
        constructor() {

        }

        // 创建一个方法 等着别的类过来继承
        money() {
            console.log(100)
        }
    }

    // 创建一个子类
    class Son extends Father { 

    }

    let son = new Son();

    // 使用extends后就可以继承到父类中的方法
    son.money();
```


### **<font color="#C2185">用父类型中的方法, 使用子类型中的参数怎么办?: </font>**
```js
    class Father {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }

        sum() {
            console.log(this.x + this.y);
        }
    }

    class Son extends Father { 
        // 孩子需要传递参数 所以
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }

    }

    let son = new Son(1,2);
    son.sum();      // 报错了

/*
    原因很简单, 我们本意是想把1 2传递给父类中调用父类的方法输出3

    但是 我们传递进去的参数只能传递到自己类的constructor里
    那么怎么才能做到呢?
*/
```

### **<font color="#C2185">Super 关键字: </font>**
super关键字用于访问和调用对象父类上的函数 可以调用父类的构造函数, 也可以调用父类的普通函数
```js
    class Father {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }

        sum() {
            console.log(this.x + this.y);
        }
    }

    class Son extends Father { 
        
        constructor(x,y) {
            // 这里就不要写this.x = x了, 直接调用super关键字
            super(x, y);  // 调用了父类中的构造函数
            
            /*
                相当于把父类中的构造函数内容粘贴到了这里 this指向还是父类的
                使用super()方法 调用了父类型中的constructor中的属性, 数据以 
                    实参 --- 
                        子类型constructor中的形参x,y --- 
                            传递给super(x,y) --- 
                                传递给父类型中干的constructor中的 x,y
            */

        }

    }

    let son = new Son(1,2);
    son.sum(); 
```
执行流程:
    let son = new Son(1,2); 
    
我们传递了实参 实参会传递到子类中的constructor(x,y) 形参里 然后子类的构造函数里调用了super(x,y) 然后又把得到的实参传递给了super里的形参 super里的形参又链接着父类的构造函数, 所以就能变相的访问到了 父类构造函数中的数据


### **<font color="#C2185">继承中的属性或者方法查找原则: 就近原则: </font>**
继承中 如果实例化子类输出一个方法, 先看之类有没有这个方法 如果有就先执行子类的
继承中 如果子类里面有, 就去找父类有没有这个方法 如果有 就执行父类的这个方法


### **<font color="#C2185">通过super关键字 在子类中可以调用父类中的方法: </font>**
```js
    class Father {
        say() {
            return '我是爸爸'
        }
    }

    // 这样子类就继承了父类的属性和方法
    class Son {  

        say() {
            return '我是儿子';
        }
    }

    let son1 = new Son();
    son1.say();     //我是儿子


    // 调用父类中的方法
    class Son extends Father {
        say() {

            // 通过super关键字调用了父类中的say
            console.log(super.say())
        }
    }
    let son1 = new Son();
    son1.say();     // 我是爸爸
```


### **<font color="#C2185">还有一种情况 儿子继承了爸爸的方法, 但是儿子自己还有新方法: </font>**
需求: 子类继承父类加法的方法, 同时 扩展减法的方法
```js
    // 父类
    class Father {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }

        sum() {
            console.log(this.x + this.y);
        }
    }

    // 子类
    class Son {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }
        // 定义个减法的方法 这个减法是儿子独有的
        subtract() {
            console.log(this.x - this.y);
        }
    }
    let son = new Son(5, 3);

    // 不继承的时候 正常使用到了子类中的减法
    son.subtract();     // 2

    // 子类继承父类加法的方法
    class Son extends Father {
        constructor(x,y) {
            // 因为this的指向是不同的, 各自指向各自的类 这里利用super关键字调用父类的构造函数

            // 一定要在this的上方 
            super(x,y)

            this.x = x;
            this.y = y;
        }
    }
    let son = new Son(5, 3);
    son.subtract();     // 2
    son.sum();          // 8 
```

### **<font color="#C2185">总结: </font>**
当使用extends后 既可以使用父类中的方法, 又可以使用子类中的方法
但是 super(x, y), 一定要在子类constructor中的参数的最前面

**注意:** 
super必须在子类的构造函数中的this之前, 也就是说必须要先调用父类的构造方法 再使用子类的构造方法

<!-- 
    执行流程:
    首先 先把5 和 3 传递给 子类中的构造函数 开始的this指向子类内部, 这样我们子类的减法可以拥有形参 

    然后通过super调用了父类中的构造函数 相当于通过这个中介 把实参5 3传递了给父类构造函数中 再调用父类中的sum
 -->

<br>

# 类和对象 在使用时的三个注意点

1. 在es6中类没有变量提升, 所以必须先定义类, 才能通过类实例化对象
2. 类里面的共有的属性和方法一定要加this使用, 说白了就是构造函数里都要加this

3. 类里面this指向的问题
<!-- 
    constructor里面会有this
        -- 主要的作用是创建实例, this指向的就是这个创建出来的实例

    类的方法里会有this
        -- 方法里面的this 是看谁调用了这个方法, this就是谁 这里ldh调用了这个方法
 -->

### **<font color="#C2185">总结: </font>**
constructor里面的this指向实例对象, 方法里面的this指向这个方法的调用者
<!-- 
    我们想用别的部分的this 可以把this存到全局变量that
    我们输出that
 -->

```js
    class Star {
        constructor(name, age) {
            this.name = name;
            this.age =age;

            this.sing(); // 写在这里的一定要加this
            --2--
            // 如果我把sing()方法写在constructor里面, 那么用new来创建实例的时候会自动调用该方法

        }

        // --1-- 如果方法写在类了 需要通过实例来手动调用比如ldh.sing()
        sing() {
            console.log(this.name)
        }
    }

    let ldh = new Star();

    --1--
    ldh.sing();
    // 如果是 --2-- 是不需要这么调用了 因为new的原因会自动调用方法
```

### **<font color="#C2185">我们做个按钮点击后 再调用sing()的案例: </font>**
```js
    class Star {
        constructor(name, age) {
            this.name = name;
            this.age =age;
            this.btn = ducument.querySelector('button');
            this.btn.onclick = this.sing;
            // 这里不要加() 要不new下就自己调用了 我们要点击后再调用
        }

        sing() {
            console.log(this.name)
        }
    }
```

首先我们要获取button, 因为用new调用时, 会自动执行constructor里面代码 所以我们把获取btn的动作写在构造函数里面 同时btn属于哪个对象的 ldh吧 所以前面要加上this 绑定点击事件的时候 不能直接写btn.onclick 也是 我们要知道哪个按钮被点击了this.btn.onclick

<br>

# 超哥版: 原型对象 - prototype
我们所创建的每一个函数我们的解析器都会向函数中添加一个属性prototype 每一个函数都有自己的prototype


### **<font color="#C2185">prototype作用: </font>**
这个属性对应的对象就是原型对象
在函数对象中有一个属性属性指向着原型对象每个函数都用而且都是不一样的 


### **<font color="#C2185">图解: </font>**
Myclass函数.         原型对象(ox123)
prototype: (ox123)   ↗              
<!-- 
    文字描述: 
    我们可以理解为Myclass函数对象下面有个属性是prototype, 
    这个prototype的值为内存空间地址链接这另一个对象的内存空间
    
    这个另一个对象就是原型对象
-->


### **<font color="#C2185">构造函数 prototype属性: </font>**
当我们的函数作为普通函数调用 这个prototype没有任何作用
当函数以构造函数调用时(也就是通过 new 来调用的时候)

    function Myclass(){ ... }
    var mc = new Myclass();

以构造函数调用就有了原型对象的概念 也就有了prototype属性


### **<font color="#C2185">实例对象 __proto__属性: </font>**
用Myclass创建了一个对象叫做mc
Myclass有个属性叫做protptype由于mc是由Myclass创建的, 所以mc里面也会有一个属性指向prototype

换句话说mc里面有个隐含属性也指向ox123, 这个隐含属性我们可以通过*__Proto__*来访问该属性

也就是说 实例对象可以通过 __proto__ 来访问 构造函数的原型对象

我们用图和文字分别描述下上行的状态: 
图1: 
    Myclass                         原型对象(ox123)
    prototype      ox123       指向↗
                        
图2: 
    实例对象 mc                  指向↗
    __proto__      ox123

mc.__proto__ == Myclass.prototype   // true
意味着它们指向了同一个对象


### **<font color="#C2185">原型对象的作用: </font>**
这个原型对象有什么用的别忘了 这个原型对象包括我们的构造函数 包括我们的实例都能看见, 所以原型对象就相当于一个*公共的区域*
*所有同一个类的实例 都可以访问到这个原型对象*

mc1 mc2 mc3 都可以访问到__proto__这个属性, 所以我们可以将对象中共有的内容统一设置到原型对象中


### **<font color="#C2185">原型链: </font>**
查找属性和方法时, 会沿着原型链来查找
所以当我们访问对象的一个属性或方法时它会先在对象自身中寻找如果有则直接使用没有就去原型对象中寻找


### **<font color="#C2185">总结: : </font>**
以后再出现每一个类都需要用的属性或者方法我们就添加到原型对象中
以后我们创建构造函数时可以将这些对象共有的属性和方法统一添加到构造函数的原型对象中

这样不用分别为每一个对象添加也不会影响到全局作用域就可以使每个对象都具有这些属性和方法了

<br>

# 检查某属性是否在对象中
### **<font color="#C2185">'属性名' in 对象: </font>**
返回的是布尔值, 如果对象中没有但是原型中有 也会返回ture 
<!-- console.log('name' in obj); -->

### **<font color="#C2185">对象.hasOwnProperty("属性名"): </font>**
检查该对象自身是否有这个属性 *不会检查原型对象上的属性*

<br>

# 原型链
Star.prototype 是 Star构造函数的原型对象, 既然是对象那么就会有__proto__

Star.prototype.__proto__它指向了另一个原型对象

 
    ldh实例对象
        通过ldh.__proto__指向了Star.prototype

    Star.prototype原型对象
        通过Star.prototype.__proto__指向了Object.prototype

    Object.prototype原型对象
        通过Object.prototype.__proto__指向了null

    *这就是原型链*


Star.prototype.__proto__ == Object.prototype
Object.prototype.__proto__ == null


### **<font color="#C2185">js中的成员查找机制(规则);: </font>**
当访问一个对象的属性(包括方法)时, 首先查找这个对象自身有没有该属性
如果没有就查找它的原型(也就是__proto__指向的prototype原型对象)
如果还没有就查找原型对象的原型(Object的原型对象)
依次类推一直找到Object为止(null)
<!-- 
    object对象的原型没有原型如果在object原型中依然没有找到则返回undefined, 一般2层就完事了  
-->

<br>

# 垃圾回收(GC): 
一个程序运行时间长了也会产生垃圾这些垃圾积攒过多程序的运行速度就会过慢
所以我们需要一个垃圾回收的机制来处理程序运行过程中产生的垃圾

比如:
    var obj = new Object();
    obj = null

这样就不会指向堆内存的对象断开连接了这样堆内存中就没有任何变量可以进行引用了 这个对象就不能进行任何操作了  
                        
当一个对象没有任何的变量或属性对它进行引用
此时我们将永远无法操作该对象, 此时这种对象就是一个垃圾
这种对象过多会占用大量的内存空间导致程序运行变慢, 所以这种垃圾必须进行清理

在js中拥有自动的垃圾回收机制会自动将垃圾对象从内存中销毁, 我们不需要也不能进行垃圾回收操作

**需要回收就要写上obj = null这样浏览器才会识别出 该对象需要被回收**

<br> 

# 函数的调用方式

### **<font color="#C2185">普通函数: </font>**
```js
function fn() {
  console.log("普通函数", this)
}

fn()    // this: window
```


### **<font color="#C2185">对象的方法: </font>**
```js
let obj = {
  name: "sam",
  say() {
    console.log("方法: ", this)
  }
}

obj.say()
// this: {name: 'sam', say: ƒ}
```


### **<font color="#C2185">构造函数: </font>**
```js
function Person (name, age) {
  this.name = name
  this.age = age

  this.sing = function() {
    console.log(this.name)
  }
}

let p = new Person("sam", 18)
p.sing()
// this: 实例对象
```


### **<font color="#C2185">绑定事件函数: </font>**
```js
btn.onclick = function() {}
    // 点击按钮调用
```
    


### **<font color="#C2185">定时器函数: </font>**
```js
setTimeout(function() {
  console.log(this)
}, 1000)
// this: window
```


### **<font color="#C2185">立即执行函数: </font>**
```js
(function() {
  console.log(this)
})()
```

<br>

# this
*解析器*在调用函数时每次都*会向函数内部传递进一个隐含的参数*
这个隐含的参数就是this
this是一个参数跟ab没区别只是浏览器传进来的


### **<font color="#C2185">this的指向: </font>**
this的指向在函数定义的时候是确定不了的, 只有*函数执行的时候才能确定this到底指向谁*, 一般情况的最终指向的是那个调用它的对象(定时器的this是window, 因为window.setInterval())


### **<font color="#C2185">根据的是调用的方式不同this会指向不同的对象: </font>**
1. 以函数形式调用this永远是window
2. 以方法形式调用this就是调用方法的那个对象
3. 当函数以构造函数调用的时候this就是那个新创建的对象(实例对象)
<!-- 
    在构造函数中的this指向对象实例 new的时候会创建空对象, 让this指向这个空的对象
-->

**注意:**
构造函数的原型对象中的this指向的是谁? 原型对象函数里面的this 指向的是 实例对象
this可以根据调用者的不同变成不同的值


### **<font color="#C2185">总结:调用方式       this指向: </font>**
普通函数调用        window
构造函数调用        实例对象(原型对象里面的方法也指向实例对象)
对象方法调用        该方法所属对象
事件绑定方法        绑定事件对象
定时器函数          window
立即执行函数        window

<br>

# 利用方法 改变函数内部 this 指向
js中为我们提供了一些函数方法来帮我们更优雅的处理函数内部this的指向问题, 常用的bind(), call(), apply()

### **<font color="#C2185">函数名.call() | apply() | bind(): </font>**


### **<font color="#C2185">函数名.call(目标): </font>**
它可以改变函数的this指向 让目标临时有这个方法 该函数中的this就指向这个目标
它可以调用函数

参数:  
参数1:  this 或者是 目标对象  
参数2:  实参, 我们传递的数据可以在函数的形参中被接收到

```js
let obj = {name: 'sam'}

// 全局 name
name = 'erin'


function fn() {
    console.log(this);
    console.log(this.name);
}

fn()                // erin window
fn.call(obj);       // sam  obj

<br>

function fn(a, b, c) {
    console.log(this.name)
    console.log(a,b,c)
}
fn.call(obj, "a", "b", [1,2,3])


// 假如我们使用...args形参接收实参的话 我们传递的数据都会在数组中体现
function fn(...args) { }   // ["a", "b", [1,2,3]]
```

### **<font color="#C2185">场景: </font>**
call()的主要作用可以实现继承 
```js
function Father(name, age) {
  this.name = name
  this.age = age
}

function Son(name, age) {
  
  // 将Son的this传递进去 相当于执行Father里面的逻辑时 是往Son的实例对象上添加属性
  Father.call(this, name, age)
}

let s = new Son("sam", 18)
console.log("s", s)
// Son { name: 'sam', age: 18 }
```

<br>


### **<font color="#C2185">fn.apply() 方法: </font>**
用法跟call()一样 但是*传递实参的时候必须要以数组的形式传递*

在传递实参的时候 是字符串的形式拿到的就是字符串的形式 是数组的形式拿到的就是数组的形式

返回值就是函数的返回值, 因为它就是调用函数

    fn.apply(o, ['pink']);

### **<font color="#C2185">技巧: </font>**
我们可以利用apply 借助于数学内置对象求最大值
```js
    let arr = [1, 66, 3, 99, 4];
    
    // Math.max是求数字中的最大值, 但是它求的是数字的 不是数组的 
    Math.max()

    // 现在我们可以利用这种方式 来求数组中元素的最大值
    Math.max.apply()
    
    // 我们可以写个空不需要改变this指向 
    Math.max.apply(null, arr)  

    // 写null也不太好, 就好让它指向函数的调用者, Math调用的吧 让它重新指回Math
    Math.max.apply(Math, arr)
```


**注意:**
1. apply传递参数的时候 必须是数组
2. 函数接收参数的时候 可以使用 
    ...args 接收 那么 args就是参数数组
    定义单独变量接收, 定义几个变量 可以接收几个参数
```js
// 下面我们传递的是数组 但是这里可以定义变量分别接收
let fn = (a, b) => {
  console.log(a)
}

fn.apply(this, ["sam", 18])
```


<br>

### **<font color="#C2185">fn.bind() 方法: </font>**
bind()方法不会调用函数, 但是能改变函数内部的this指向
把原函数改造完产生一个新的函数返回给我们 需要一个变量来接收

语法:
    fun.bind(thisAsg, arg1, arg2);

参数:
    thisAsg:    在fun函数运行时指定的this值
    arg1:       传递的其它参数


返回由指定的this值和初始化参数改造的原函数拷贝(返回的是原函数改变this之后产生的新函数)

```js
    let o = {
        name:'andy'
    }

    function fn() {
        console.log(this);
    }

    // 普通函数指向的是window, 我想让它指向o 给fn绑定bind这个方法,  它不会调用这个函数 只会改变this的指向 
    fn.bind(o);  

    // 它会返回一个bind完新的函数
    let f = fn.bind(o);
    f();
```

### **<font color="#C2185">场景: </font>**
如果有的函数我们不需要立即调用, 但是又想改变这个函数内部的this指向此时用bind是最合适的

需求:
当我们有一个按钮, 当我们点击了之后, 就禁用这个按钮, 3秒钟之后开启这个按钮

```js 
    let button = document.querySelector('button');
    button.onclick = function(){
    
        // 事件函数的this指向的是btn
        this.disabled = true;

        setTimeout(function(){
            // 我能这么写么? 不能因为定时器函数this指向的是window
            this.disabled = false;  
        }, 3000)
    }

    // 以前的做法
    button.onclick = function(){
        // 以前我们的做法是
        let that = this;
        this.disabled = true;

        setTimeout(function(){
            that.disabled = false;  
        }, 3000)
    }

    // 高级做法
    button.onclick = function(){
        this.disabled = true;

        setTimeout(function(){
        
            // 现在我就想让定时器函数里面的this指向btn 同时定时器里面的函数并不是马上执行 所以我们选择bind(), bind()写在定时器的外面
            this.disabled = false;  
        }.bind(this), 3000)
    }
```

上面这个bind()是在定时器函数的外面, 这个this又是在button函数的里面, 这个this指向的就是btn

setTimeout(funcion(){}.bind(button), 3000)
给定时器函数绑定了一个bind方法, 它不会立即调用函数, 同时我让这个定时器函数里面的this 指向了btn 因为点了谁, 谁就是this, 说以bind(button) 里面不要写button 改成this

<br>

### **<font color="#C2185">call apply bind总结: </font>**

### **相同点:**
都可以改变函数内部的this指向

<br>

### **区别点:**
call apply会调用函数, 并且改变函数内部的this指向  
call和apply传递的参数不一样, call传递参数arg1 arg2形式, apply必须是数组的形式[args]

bind 不会调用函数, 可以改变函数内部this指向

<br>

### **性能:**
传参超过3个以上的时候 call 的性能要好

<br>


### **应用场景:**
**<font color="#C2185">call: </font>**  
call经常做继承

<br>

**<font color="#C2185">apply: </font>**  
apply经常跟数组有关系的, 比如借助于数学对象实现数组最大值最小值  
跟数组传参相关的时候 使用 apply 比较好  
```js
let arr = [10, 20, 30]
let obj = {}

function fn(x, y, z) {}
fn.apply(obj, arr)
```

<br>

**<font color="#C2185">bind: </font>**  
bind 不调用函数, 但是还想改变this指向, 比如改变定时器内部的this指向 定时器不需要我们调用 是每隔一段时间自动 改变this时
        
<br>

# 原型对象的应用 -- 扩展内置对象
可以通过原型对象, 对原来的内置对象进行扩展自定义的方法, 比如给数组增加自定义求偶数和的功能

数组里已经有了很多方法 比如翻转数组, 数组排序等 我们再添加一个求偶数和

```js
// 看看数组的原型对象中有什么样的方法
console.log(Array.prototype);

// 添加求和方法
Array.prototype.sum = function() {
    let sum = 0;

    // 谁调用这个方法就是谁的length
    for(let i=0; i<this.length; i++) {
        if(this[i] % 2 == 0) {
            sum += this[i];
        }
        return sum;
    }
}

// 这个arr其实是new Array出来的 所以它可以使用原型对象中的方法
let arr = [1,2,3];
arr.sum();
```

**注意:**
数组和字符串内置对象不要覆盖原型对
    Array.prototype = {}        -- 这样不行

只能以 Array.prototype.xxx = function(){} 的形式添加

<br>

# 扩展: 当我们打印一个对象的时候 输出的是 对象.toString()方法的返回值
```js
function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
}

// 创建一个Person的实例
var per = new Person("孙悟空" 18, "男");

// 这里有个问题为什么打印per是[object Object] 而不是别
console.log(per);    //[object Object]
console.log(per.toString());   //[object Object]
```

当我们直接在页面中打印一个对象时实际上是输出的对象的toString()方法的返回值 [object Object]

观察:
```js
// Person里面也没有toString()哪来的？
console.log(per.hasOwnProperty("toString"));    // false

// 结果是 false没有看看原型里面有没有 
console.log(per.__proto__.hasOwnProperty("toString"));

// 也没有看看原型的原型里有没有
console.log(per.__proto__.__proto__.hasOwnProperty("toString"));    //true
```


如果我们希望在输出对象时不输出[Object Object]
可以直接为对象添加一个toString()方法 也不去使用原型对象的原型对象里面定义的toString()方法

```js
// 给对象本身添加 toString() 方法
per.toString = function(){
    // 定义其返回值
    return "我是一个快乐的小person"
};

var result = per.toString();
console.log(per);  // 结果是我是一个快乐的小person
```

但是打印上面的也没有用啊我希望在打印的时候能打印出来详细信息
比如:
    Person[name=孙悟空age=18gender=男]

```js
Person.prototype.toString = function(){
    return "Person["name="+this.name+",age="+this.age+",gender="+this.gender]"
}
```

<br>

# 继承
比如我们在父类中已经写好了很多的方法, 在子类直接拿来使用继承父类的方法, 代码就会更简单

在es6之前并没有给我们提供extends继承, 我们可以通过 构造函数+原型对象 模拟实现继承, 被称为组合继承

要点: 
### **<font color="#C2185">call(): </font>**
调用这个函数, 并且修改函数运行时的this指向
    fun.call(thisArg, arg1, arg2...)

参数
1. thisArg: 当前调用函数this的指向对象
2. 后面的两个就是传递的普通参数


### **<font color="#C2185">调用父构造函数 继承父类中的属性: </font>**
核心原理:
通过 父类.call(this) 把父类型的this改成子类型中的this, 这样父类中的this.name = name 中的this就是子类的this 也就相当于在子类中书写了this.name = name 是一样的


\\ 定义父构造函数
```js
function Father(uname, age) {
    this.name = name;
    this.age = age;
}
```

\\ 定义子构造函数
```js
function Son(uname, age, score) {

}
```

现在我想让子构造函数使用父构造函数中的属性, 但是现在父 子构造函数并没有相连的关系

*而且父 子构造函数中的this指向也不一样*
父构造函数 指向 父构造函数的对象实例
子构造函数 指向 子构造函数的对象实例

那子构造函数怎么才能拿父构造函数中的属性呢? 
我们可以在子构造函数中调用父构造函数

我们把父构造函数当做一个普通的函数来调用 但是注意在父构造函数里面的this是父构造函数的实例对象, 子构造函数是指向子构造函数中的实例对象

父构造函数里面的uname是在父构造函数身上的, 那么子构造函数想要使用父构造函数中的属性, 一定要把父构造函数的this改成子构造函数, 然后我就可以使用这个属性了

现在就指向了自构造函数的实例对象 还可以创建自己的属性
```js
function Son(uname, age, score) {
    Father.call(this, uname, age);
    this.score = score;
}

let son = new Son('刘德华', 18, 100);
console.log(son);
```

上面的方式只能继承定义在父类中的属性和方法 要想继承原型链上的属性和方法需要下面的知识

<br>

# 借用原型对象 继承 父类型的方法
一些共有的属性 我们写在构造函数里面, 但是共有的方法 我们要写在原型对象上比较合适

\\ 定义父构造函数
```js
function Father(uname, age) {
    this.name = name;
    this.age = age;
}
```

\\ 往父构造函数中添加方法
```js
Father.prototype.money = function() {
    console.log(10000);
};
```


怎么样继承父类中原型对象里的方法呢?
### **<font color="#C2185">方式1:  这样可以么？: </font>**
```js
Son.prototype = Father.prototype
```

这么做是不行的, 这样直接赋值会有问题, 如果修改了子原型对象, 父原型对象也会同样被修改


### **<font color="#C2185">方式2:  这样做呢？    可以: </font>**
### **<font color="#C2185">Son.prototype = new Father();: </font>**

```js
    Son.prototype = new Father();
```
new Father() 相当于实例化了父构造函数
new Father相当于创建了一个Father的实例对象 这是Father实例对象 和 Father的原型对象不在一个内存机制里

然后我又把 创建的Father实例对象 赋值给了 Son.prototype
相当于

Son构造函数 的 Son原型对象 指向了刚才创建的Father实例对象
Father的实例对象 能访问 Father原型对象里面的方法 而son原型对象 也可以通过Father实例对象访问到 Father原型对象里面的方法


                Father.prototype
Father构造函数      ----- >        Father原型对象

        ↘                               ↑

    new Father()后创建了一个
    Father实例对象                  Father.__proto__

                    ↘           ↗

                    Father实例对象

                                ↖
               Son.prototype
Son构造函数      ----- >        Son原型对象


new Father()会创建一个Father的实例对象, 将这个实例对象的地址 给 Son构造函数的原型对象

因为Father的实例对象可以访问到在Father原型对象身上的方法,而Son构造函数的原型对象和Father的实例对象又是一个 所以同样可以访问到Father原型对象身上的方法

*Son.prototype = Father的实例对象  指向  Father的原型对象*

### **<font color="#C2185">总结下: </font>**
```js
function Father() {

};

Father.prototype.sing = function() {
    console.log(1);
}


Son.prototype = new Father();

function Son() {

};

let son = new Son();
son.sing();
```

**注意:**
    Son.prototype = new Father();

上面这样做相当于: Son.prototype = {};
这样就会把Son.prototype里面的东西覆盖掉, 所以Son.prototype里面就没有constructor了
```js
console.log(Son.prototype.constructor)  //Father
```

这就是问题 按道理Son.prototype.constructor应该指向Son才对 因为是一个覆盖操作
    
如果利用对象的形式修改了原型对象, 别忘了利用constructor指回原来的构造函数


### **<font color="#C2185">解决方案 手动给原型对象中添加 constructor 属性: </font>**
Son.prototype.constructor = Son


### **<font color="#C2185">整理: </font>**
```js
    function Father(name, age) {
        this.name = name 
        this.age = age
    }

    Father.prototype.sing = function() {
        console.log("hi")
    }

    function Son(name, age, gender) {
        Father.call(this, name, age)
    }


    // 关键的两步
    Son.prototype = new Father()
    Son.prototype.constructor = Son


    let s = new Son("nn", 5)
    s.sing()
```

**注意:**
Father的constructor要指向Father, Son的constructor要指向 Son
    
<br>

# new 关键字执行过程
1. 当我们构造函数遇见new时候 会在内存中创建一个空的对象
2. this都会指向这个空的对象
3. 执行构造函数里面的代码, 给这个空对象添加属性 和 方法
4. 返回这个对象
<!-- new的最后会返回这个对象, 所以就不需要return了 -->

<br>

# 原型链的总结
首先我们要明确
函数(Function)才有prototype属性对象(除Object)拥有__proto__.
https://www.cnblogs.com/libin-1/p/5820550.html?ivk_sa=1024320u

<br>

# for...in 对象遍历
for...in用于对数组或者对象的属性 进行循环操作, 建议对对象使用

我们使用for in 里面的变量 我们喜欢用key 或者 k
```js
    let obj = {
        name: '',
        age: 18,
        sex: '男'
    };

    for (let 变量 in 对象) {
        
    }
```

变量:       属性名(键名)
对象[变量]:  属性值(通过对象[键名]的形式获取元素)


### **<font color="#C2185">for...in 的特点: </font>**
遍历数组
1. index索引为字符串型数字不能直接进行几何运算
2. 遍历顺序有可能不是按照实际数组的内部顺序
3. 使用for in会遍历数组所有的可枚举属性包括原型
例如上例的原型方法method和name属性 所以for in更适合遍历对象不要使用for in遍历数组

**for...in 变遍历整个原型链**

<br>

# for...of 遍历数组 字符串 
如果说for...in遍历的是数组的索引(键名)
那么for...of遍历的是数组的元素的值(直接就是属性值)

它适合遍历数组 字符串等 *不能遍历对象*

```js
    for (let 变量 in 数组) {

    }

    console.log(变量);       // 属性值
```

<br>

# 内置对象
js中对象分为3中: 
    自定义对象
    内置对象
    浏览器对象

前两种对象是js基础内容, 属于ES, 第三个浏览器对象属于我们js独有的

内置对象
内置对象就是指JS语言自带的一些对象, 这些对象供开发者使用, 并提供了一些常用的或者最基本而必要的功能(属性方法等)


# 查阅文档
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

MDN 学习一个内置对象的使用, 只要学会其常用成员的使用即可, 我们可以通过查文档学习, w3c和mdn 推荐使用MDN

查阅该方法的功能
查看里面参数的意义和类型
查看返回值的意义和类型
通过demo进行测试

<br>

# Object对象

### **<font color="#C2185">Object.assign(目标对象, 源对象): </font>**
该方法将所有可枚举 和 自有属性(Object.hasOwnProperty() 返回 true) *从一个或多个源对象复制到目标对象*

将 源对象 的符合条件的属性复制到 目标对象

参数:
target
目标对象, 接收源对象属性的对象, 也是修改后的返回值。

sources
源对象, 包含将被合并的属性

返回值:
合并后的对象

**注意:**
1. 如果目标对象 和 源对象 具有相同的key 则目标对象中的属性会被源对象中的属性覆盖 (后面的覆盖前面的)

2. Object.assign 方法只会拷贝源对象 可枚举的 和 自身的 属性到目标对象。

3. 深浅拷贝的问题
因为 Object.assign() 只复制属性值。假如源对象是一个对象的引用, 它仅仅会*复制其引用值*。



### **<font color="#C2185">示例: </font>**
复制对象
```js
let obj = {name: "sam"}
let res = Object.assign({}, obj)
console.log(obj)
```

合并对象
target目标对象就是返回值
```js
let o1 = {a: 1}
let o2 = {b: 2}
let o3 = {c: 3}

let res = Object.assign(o1, o2, o3)
console.log(res)
    // { a: 1, b: 2, c: 3 }

console.log(o1)
    // { a: 1, b: 2, c: 3 }
```

<br>

### **<font color="#C2185">Object.create(proto, [propertiesObject]): </font>**
Object.create()方法可以创建一个新对象
并且通过给定的对象(作为新对象的原型对象)

返回的是新对象, 我们传入的参数1 是新对象的原型对象


参数:
1. proto:
新创建对象的原型对象

2. propertiesObject:
需要传入一个对象, 该对象的属性类型参照Object.defineProperties()的第二个参数。

返回值:
一个新对象, 带着指定的原型对象和属性。

示例: 
```js
let person = {
  name: "sam",
  say() {
    console.log(this.name)
  }
}

let newPerson = Object.create(person)
console.log(newPerson)

console.log(newPerson.name) // sam
newPerson.say() // sam
```

示例:
```js
// 取得 Array 的原型对象
let oldArrayProto = Array.prototype

// 生成了一个新的对象
// 新对象的原型对象就是oldArrayProto 我们可以通过 newArrayProto.__proto__ 访问到oldArrayProto
let newArrayProto = Object.create(oldArrayProto)
console.log(newArrayProto)
```

示例:
实现类式继承
```js
Son.prototype = new Person()
↓ 改成  创建一个新对象 该新对象的原型对象为 Person.prototype
Son.prototype = Object.create(Person.prototype)
```

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.say = function(content) {
  console.log(this.name + ": " + content)
}

function Son(name, age, price) {
  Person.call(this, name, age)
  this.price = price
}

// let son = new Son("sam", 18, 400000)
// console.log(son)

// 上面是简单的继承 但是不能继承到原型中的方法
// son.say()  // son.say is not a function

// 继承原型对象上的方法
Son.prototype = Object.create(Person.prototype)
Son.prototype.constructor = Son

let son = new Son("sam", 18, 400000)
son.say("加油!")
```

示例:
使用使用 Object.create() 的 propertyObject 参数(第二个参数)

```js
let o = Object.create(Object.prototype, {
  // foo 会成为所创建对象的数据属性
  foo: {
    writable:true,
    configurable:true,
    value: "hello"
  },

  // bar 会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});
```

<br>

### **<font color="#C2185">Object.defineProperty(obj, 'prop', descriptor): </font>**
我们可以通过该方法, 在对象中添加 属性 和 属性值, 同时可以对属性值进行限制以及控制

直接在一个对象上定义一个新属性, 或者修改一个对象的现有属性


参数:
1. obj:   目标对象(必传项)
2. prop:  需要定义或修改的属性的名字(原先没有的会添加)

3. descriptor:
    3.1 数据描述符: 
        configurable
        enumerabl
        value
        writable 等配置项.

    3.2 访问器描述符:  
        get 
        set 
        configurable 
        enumerable 等配置项.

**数据描述符和访问器描述符不能混合使用**

### **<font color="#C2185">配置项: value: </font>**
设置属性的值, 默认为undefined

### **<font color="#C2185">配置项: writable: : </font>**
设置值是否可以重写, true | false, 默认为false
<!-- 
    我们的对象中有很多属性是很重要的, 不可以修改的, 这时候可以通过这个属性限定不允许被修改
-->

### **<font color="#C2185">配置项: enumerable: : </font>**
设置目标属性是否可以被枚举, true | false, 默认为false
<!-- 
    比如买了个东西 我往对象里添加了用户的地址, 这个地址比较隐私, 不想让被枚举出来, 这时候就可以用这个属性
    -->

### **<font color="#C2185">配置项: configurable: : </font>**
设置目标属性是否可以被删除或是否可以再次修改特性, 默认为false
<!-- 
    添加的属性不允许被删除, 并且不能给这个属性的第三个参数再次修改特性
-->


当我们需要设置或获取对象的某个属性的值的时候我们可以使用 setter/getter方法.

### **<font color="#C2185">配置项: get: : </font>**
当我们读取给定属性的时候会调用get函数, get函数的返回值就是给定属性的属性值

### **<font color="#C2185">配置项: set: : </font>**
当我们修改给定属性的时候会调用set函数, set函数的形参value就是新修改之后的值

```js
const address = "白山"

const obj = {
  name: "sam",
  age: 18
}

Object.defineProperty(obj, "address", {
  get() {
    return address
  }
})

console.log(obj.address)  // 白山
```

**注意:**
如果我们使用 Object.defineProperty 往对象中添加 对象已有属性 那么该对象该属性会被删掉
比如 我们往 obj 中添加 name 属性 那么obj本身就变成 obj:{age: 18} name就没有了

利用上面的特性 我们可以进行通过指定的属性名 过滤对象剩余属性
```js
const obj = {
  name: "sam",
  age: 18
}

Object.defineProperty(obj, "name", {
  get() {
    return obj
  }
})

function filter(obj, key) {
  return Object.defineProperty(obj, key, {
    get() {
      return obj
    }
  })
}

console.log(filter(obj, "age"))
```
    

### **<font color="#C2185">案例一: : </font>**
使用 Object.defineProperty 给对象添加属性
数据描述符
```js
   let obj = {
        id:1,
        pname:'小米',
        price:1999,
        num:2000
    }
    
    Object.defineProperty(obj, 'sex', {
        value:1000,
        writable:
    })
```


### **<font color="#C2185">案例二: : </font>**
使用 Object.defineProperty 实现双向绑定
访问器描述符
```js
    <input type="text" id="demo" />
    <div id="xxx">{{name}}</div>

    const obj = {};

    Object.defineProperty(obj, 'name', {
        set: function (value) {
            document.getElementById('xxx').innerHTML = value;
            document.getElementById('demo').value = value;
        }
    });

    document.querySelector('#demo').oninput = function (e) {
        obj.name = e.target.value;
    }
    obj.name = '';
```


### **<font color="#C2185">Object.defineProperties(obj, props): </font>**
设置多个属性
```js
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
});
```

<br>

### **<font color="#C2185">Object.entries(目标对象): </font>**
将目标对象中 可枚举的属性 组织成 [key,value] 放到一个数组中

返回值:
二维数组 [[key,value], [key,value], [key,value]]

示例:
```js
let obj = {
  name: "sam",
  age: 18,
  sex: "男"
}

let res = Object.entries(obj)
console.log(res)
// [['name','sam'], ['age',18], ['sex','男']]
```

### **<font color="#C2185">要点: </font>**
1. 因为得到的是 二维数组 所以可以利用解构
2. 可以使用 for...of 遍历 (数组嘛)
```js
let obj = {
  name: "sam",
  age: 18,
  sex: "男"
}

// 解构
for(let [key, value] of Object.entries(obj)) {
  console.log(key, value)
}
```


### **<font color="#C2185">将Object转换为Map: </font>**
new Map() 构造函数接受一个可迭代的entries。
借助Object.entries方法你可以很容易的将Object转换为Map
```js
let obj = {
  name: "sam",
  age: 18,
  sex: "男"
}

let map = new Map(Object.entries(obj))
console.log(map)
```

<br>

### **<font color="#C2185">Object.fromEntries(目标对象): </font>**
把键值对列表转换为一个对象
也就 Object.entries() 逆效果

参数:
类似 Array Map 或 其他的可迭代对象
(键值对形式的二维数组)

```js
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```

### **<font color="#C2185">示例: 利用 map() 修改对象中属性的值: </font>**
```js
let obj = {a: 1, b: 2, c:3}

// 将其转换成2维数组 利用map() 得到的是修改后的二维数组
let res = Object.entries(obj).map(([key, value]) => [key, value * 2])

let _obj = Object.fromEntries(res)
console.log(_obj)  // { a: 2, b: 4, c: 6 }
```

<br>

### **<font color="#C2185">Object.keys(目标对象): </font>**
将给定对象中的*属性名* 组成一个数组

返回值
属性名数组

<br>

### **<font color="#C2185">Object.values(目标对象): </font>**
将给定对象中的*属性值* 组成一个数组

返回值
属性值数组

<br>

### **<font color="#C2185">Object.freeze(目标对象): </font>**
可以冻结一个对象。一个被冻结的对象再也不能被修改
如:
    - 冻结了一个对象则不能向这个对象添加新的属性
    - 不能删除已有属性
    - 能修改该对象已有属性的可枚举性、可配置性、可写性
    - 不能修改已有属性的值
    - 冻结一个对象后该对象的原型也不能被修改

返回值:
被冻结的对象

```js
let obj = {
  name: "sam",
  age: 18,
}

Object.freeze(obj)

// 当我们试图修改对象中的属性值时 会静默不做任何处理
obj.name = "erin"
console.log(obj)
```

<br>

### **<font color="#C2185">Object.isFrozen(目标对象): </font>**
给定对象是否被冻结

返回值:
boolean

<br>

### **<font color="#C2185">Object.getOwnPropertyDescriptor(): </font>**
返回指定对象上一个自有属性对应的属性描述符。
```js
const object1 = {
  property1: 42
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1.configurable);
// expected output: true

console.log(descriptor1.value);
// expected output: 42
```

<br>

### **<font color="#C2185">Object.getOwnPropertyNames(): </font>**
返回一个由指定对象的所有自身属性的属性名

<br> 

### **<font color="#C2185">Object.getPrototypeOf(): </font>**
返回指定对象的原型(内部[[Prototype]]属性的值)。

参数:
目标对象

返回值
给定对象的原型。如果没有继承属性, 则返回 null 。

```js
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

<br>

### **<font color="#C2185">Object.is(value1, value2): </font>**
判断两个值是否为同一个值。

返回值:
boolean

规则:
  都是 undefined
    都是 null
    都是 true 或都是 false
    *都是相同长度、相同字符、按相同顺序排列的字符串*
    *都是相同对象(意味着都是同一个对象的值引用)*
    都是数字且
        都是 +0
        都是 -0
        都是 NaN
        都是同一个值, 非零且都不是 NaN

### **<font color="#C2185">扩展: </font>**
Object.is() 与 == 不同:
    Object.is 不会强制转换两边的值

Object.is() 与 === 也不相同
    差别是它们对待有符号的零和 NaN 不同
    === 运算符(也包括 == 运算符)将数字 -0 和 +0 视为相等, 而将 Number.NaN 与 NaN 视为不相等。

```js
// Case 1: Evaluation result is the same as using ===
Object.is(25, 25);                // true
Object.is('foo', 'foo');          // true
Object.is('foo', 'bar');          // false
Object.is(null, null);            // true
Object.is(undefined, undefined);  // true
Object.is(window, window);        // true
Object.is([], []);                // false
var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);              // true
Object.is(foo, bar);              // false

// Case 2: Signed zero
Object.is(0, -0);                 // false
Object.is(+0, -0);                // false
Object.is(-0, -0);                // true
Object.is(0n, -0n);               // true

// Case 3: NaN
Object.is(NaN, 0/0);              // true
Object.is(NaN, Number.NaN)        // true

```

<br>

# Math对象
Math数学对象 不是一个构造函数, 所以我们不需要new 来调用 直接使用即可

### **<font color="#C2185">Math.PI: </font>**
圆周率


### **<font color="#C2185">Math.floor(): </font>**
向下取整
往小了取值


### **<font color="#C2185">Math.ceil(): </font>**
向上取整
有小数就进1


### **<font color="#C2185">Math.abs() : </font>**
可以用来计算一个数的绝对值
隐式转换 会把字符串型的-1 转换为数字型
如果不是数字型的 会是NaN
<!-- Math.abs('-1'); -->


### **<font color="#C2185">Math.round(): </font>**
可以对一个数进行四舍五入 取整
.5会往大了取 所以当为-1.5的时候 会取-1 而不是 -2 因为-1 比 -2大


### **<font color="#C2185">Math.random(): </font>**
可以用来生成一个0-1之间的随机数 0-1之间 不会出现0 和 1

### **<font color="#C2185">Math.random()*10: </font>**
生成一个0-10的随机数: 
    

### **<font color="#C2185">Math.round(Math.random()*x): </font>**
生成一个0-x之间的随机数, 可以对结果四舍五入下能取得包括0和10的0-10之间的随机数


### **<font color="#C2185">Math.round(Math.random()*(y-x))+x: </font>**
生成一个x-y之间的随机数
    

### **<font color="#C2185">Math.floor(Math.random() * (max - min)) + min : </font>**
得到一个两数之间的随机整数
    

### **<font color="#C2185">Math.floor(Math.random() * (max - min + 1)) + min: </font>**
得到一个两数之间的随机整数包括两个数在内


示例:
```js
// 生成一个1-10之间的随机数可以先生成0-9之间的数+1 这样最小数+1 等于1 最大数+1 等于10
Math.round(Math.random()*9)+1;

// 生成一个2-10之间的随机数
Math.round(Math.random()*8)+2;
```
    
封装函数:
```js
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
```

### **<font color="#C2185">Math.max(): </font>**
可以获取多个数中的最大值


### **<font color="#C2185">Math.min(): </font>**
可以获取多个数中的最小值


### **<font color="#C2185">Math.pow(): </font>**
Math.pow(x,y) 返回x的y次幂


### **<font color="#C2185">Math.sqrt(): </font>**
开方

<br>

# Date对象 (日期对象)
Date对象是一个构造函数, 必须使用new来调用创建我们的日期对象
在js中使用Date对象来表示一个时间


### **<font color="#C2185">构造函数 创建Date对象: </font>**
```js
let date = new Date()

console.log(date)
// 2022-06-12T14:08:45.524Z

<br>

// 我们写的是5月 实际输出才是6月
let date = new Date(2022,5,12)
console.log(date)
// 2022-06-12T14:08:45.524Z
```

### **<font color="#C2185">参数: </font>**
空参: 
    如果没有输入任何参数, 返回系统的当前时间

指定时间
指定时间的常用写法:
    - 数字型: 2019,10,01
    - 字符型: 
        '2019-10-1 08:08:08'
        "12/03/2016 11:10:30"

**注意:**
如果输入的是数字型的时候要 实际月份-1
字符串型没有问题

<br>

### **<font color="#C2185">date.toLocaleString([locales [, options]]): </font>**
当前系统时间:
默认返回的格式: 2022/6/12 下午11:13:00

### **<font color="#C2185">返回值: </font>**
根据当地语言规定 返回时间字符串

### **<font color="#C2185">参数: </font>**
有些浏览器因为兼容性 不支持locales和options参数
为了检测是否支持参数 我们可以做下检测
```js
function toLocaleStringSupportsLocales() {
    try {
        new Date().toLocaleString("i");
    } catch (e) {
        return e​.name === "RangeError";
    }
    return false;
}
```

locales:
国家地区字符串
    - 美国: "en-US"
    - 英语: "en-GB"
    - 韩国: "ko-KR"
    - 日本: "ja-JP-u-ca-japanese" | "ja-JP"

options:
自定义 toLocaleString 方法返回的字符串
    - weekday:
    - year:
    - month:
    - day:

options对象 key用于配置要显示的数据 value决定如何显示数据, value的可选值为:
    - long: 中文
    - short:
    - narrow
    - numberic: 数字
    - 2-digit

```js
let date = new Date(2022,5,12,23,13)

console.log(date.toLocaleString("ja-JP", {
  year: "numeric",
  month: "long"
}))

// 2022年6月
```

```js
<div className="month">
    {props.date.toLocaleString("zh-CN", {month: "long"})}
</div>
```

网址:
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

<br>

### **<font color="#C2185">date.toLocaleDateString(): </font>**
返回的时间格式为: 2022/6/12

<br>

### **<font color="#C2185">date.toLocaleTimeString(): </font>**
返回的时间格式为: 下午11:13:00

<br>

### **<font color="#C2185">getFullYear(): </font>**
该方法可以获取当前对象所封装的日期中的  年份

### **<font color="#C2185">getMonth()  得到的月份要+1    getMonth()+1: </font>**
该方法可以获取当前对象所封装的日期中的  月份(0-11).
它会返回0-11的值0是1月11是12月

### **<font color="#C2185">getDate(): </font>**
该方法可以获取当前对象所封装的日期中的 几号(1-31)
```js
    var d2 = new Date("12/03/2016 11:10:30");
    var date = d2.getDate();
    console.log("date = " + date);
```

### **<font color="#C2185">getDay()  周日是0: </font>**
该方法可以获取当前对象所封装的日期中的 周几(0-6)
它会返回0-6的值0是周日1是周1
```js
    var d2 = new Date("12/03/2016 11:10:30");
    var date = d2.getDate();
    var day = d2.getDay();
    console.log("day = " + day);
```

### **<font color="#C2185">.getHours()       时: </font>**
### **<font color="#C2185">.getMinutes()     分: </font>**
### **<font color="#C2185">.getSeconds()     秒: </font>**


### **<font color="#C2185">获取 至今毫秒数(时间戳): </font>**
### **<font color="#C2185">1. valueOf();: </font>**
### **<font color="#C2185">2. getTime();: </font>**
### **<font color="#C2185">3. +new Date();  常用: </font>**
### **<font color="#C2185">4. Date.now();   H5新增 低版本的浏览器不支持: </font>**
获取距离1970年1月1日开始到现在总的毫秒数(当前日期的时间戳)
指的是从格林威治标准时间的1970年1月1日0时0分0秒, 到当前日期所花费的毫秒数

返回值:
毫秒数

<!--
    从  1970年1月1日0时0分0秒
    到  12/03/2016 11:10:30
    经过的毫秒数    1秒 = 1000毫秒

    时间的单位极乱因为年可以理解为12进制月是12进制日是30进制时是60进制分秒毫秒, 所以就导致想在计算机里储存时间 特别麻烦单位不统一

    所以统一转换为毫秒为了好保存, 计算机底层在保存时间时使用的都是时间戳
-->
```js
    let time = +new Date();
    var time = d2.getTime();
    console.log(time);
    //time/1000/60/60/24/365
```

```js
    var d3 = new Date("1/1/1970 0:0:0");
    time = d3.getTime();
    console.log(time);
    //正常来讲的话应该是0 可是结果是 -28800000
```
 1/1/1970 0:0:0 这个时间是中国时间(中文系统)
 -28800000除完后正好是8小时也就是时差 

<br>

### **<font color="#C2185">Date.now(): </font>**
获取时间戳
    time = Date.now();
    console.log(time);
<!-- 
    我们获取到了一个时间戳这个时间戳是在3377代码执行时的时间戳相当于在执行的时候 盖了一个章
-->
                                        

### **<font color="#C2185">场景: </font>**
我们可以利用时间戳来干很多事情 - 测试代码的执行性能
```js
    var start = Date.now();

    for(var i=0; i<100; i++){
        console.log(i);
    }

    var end = Date.now();
    console.log(end - start);
```

<!-- 
    我们来看看100次for循环用多长时间我们可以在执行前获取一个时间戳在执行后获取一个时间戳我们再来做减法
-->

<br>

# 函数
在js里面, 可能会定义非常多的相同代码或者功能相似的代码, 这些代码可能需要大量重复使用, 虽然for循环语句也能实现一些简单的重复操作, 但是比较具有局限性, 此时我们就可以使用js中的函数

就是封装了一段可被重复调用执行的代码块, 通过它可以实现大量代码的重复使用
<!-- 
    普通对象像一个塑料袋只是一个容器
    
    而函数对象可以封装一些功能(代码)在需要时可以执行这些功能(代码) 
-->

使用typeof来检查一个对象时会返回 "function"
    
### **<font color="#C2185">函数的使用分为两大步: </font>**
声明函数
调用函数


### **<font color="#C2185">创建函数对象 - 构造函数: : </font>**
语法:
```js
    var fun = new Function();
```

可以将要封装的代码以字符串的形式传递给构造函数
```js
    // 这个相当于把我们的代码装到了字符串里
    var fun = new Function("console.log('hello,这是我的第一个函数')");
```

封装到我们函数中的代码不会立即执行仅仅是存起来了, 函数中的代码会在函数被调用的时候执行

### **<font color="#C2185">调用函数: 函数名(): </font>**
当调用函数时函数中封装的代码会按照顺序执行
函数对象具有所有普通对象的功能

<br> 

### **<font color="#C2185">创建函数对象 - 函数声明: : </font>**
function 声明函数的关键字, 全部小写

函数是做某件事情, 函数名一般是动词 sayHi

语法: 
```js
    function 函数名([形参1形参2.....形参N]){
        语句...
    }
```

调用: 
    fun2()

<br>

### **<font color="#C2185">创建函数对象 - 函数表达式: </font>**
语法:
```js
    let 变量名 = function() { ... };
    let fn = function() {};
```

函数表达式声明方式 跟 声明变量差不多, 只不过变量里面存的是值, 而 函数表达式里存的是函数

调用:
    函数名();


### **<font color="#C2185">函数的封装的概念: </font>**
就是把一个或者多个功能通过函数的方式封装起来, 对外只提供一个简单的函数借口

简单理解: 封装类似于将电脑配件整合组装到机箱中

<br>

# 函数的参数
在声明函数的小括号里面是形参
在函数调用的小括号里面是实参

```js
    function 函数名([形参1形参2.....形参N]){
        语句...
    }

    fun2(实参1, 实参2.....);
```

我们可以在函数的()中来指定一个或者多个形参(形式上的参数没有任和值占地用), 多个形参之间用逗号隔开声明形参就相当于在函数的内部声明了对应的变量, 但是并不赋值

在调用函数时可以在()中指定实参(实际参数)实参将会赋值给函数中对应的形参


### **<font color="#C2185">形参 和 实参的执行过程: </font>**
```js
    1 function sum(a, b) {
    2     console.log(a+b);
    3 }
    4 sum(1,2);
```

代码读到 第1行 不会执行, 会跳过到 sum()函数调用这
sum(1,2) 调用再回头找function函数声明, 然后把实参传递给形参 然后再执行

示例:
定义一个用来求 两个数和 的函数
```js
    function sum(){
        console.log(1+1);
    }
    sum();

    function sum(a, b){
        console.log(a+b);
    }

    // 会拼串
    sum(123, hello); 
```

**注意:** 
调用函数时解析器不会检查实参的类型所以要注意是否有可能会接受到非法的参数如果有可能则需要对我们的参数的类型进行一个检查


### **<font color="#C2185">规则: </font>**
1. 如果实参的数量多于形参的数量多余的实参不会被赋值
2. 如果实参的数量少于形参的数量则没有对应的实参的形参将是undefined

3. 解析器不会检查实参的数量

<br>

# 函数的返回值
```js
    function cook(aru) {
        console.log(aru);
    }
    cook('大肘子')
```

其实把输出语句写在函数内部是不合理的, 写在函数内部就好比是厨师把大肘子自己吃了, 不合理把 按道理来说函数只是为了实现某种功能, 菜抄完了应该端给使用者

所以函数应该返回一个结果给调用者, 这么做才是合理的
在实际开发里面, 我们经常用一个变量来接受函数的返回结果

### **<font color="#C2185">return: </font>**
有的时候, 我们希望函数将值返回给调用者, 此时通过使用return 语句就可以实现

只要函数遇到return 就把后面的结果 返回给函数的调用者

语法: 
```js
    function 函数名() {
        return 需要返回的结果;
    }
    let 结果 = 函数名();
    // 把返回的结果给调用者(函数名())
```

return后面的值将会作为函数的执行结果返回
函数一般是用来返回结果的并不需要函数做一些特殊处理, 在函数中return后的语句都不会执行因为结果已经被装进 return 值中了

### **<font color="#C2185">return 终止函数: </font>**
return之后的代码不被执行

### **<font color="#C2185">return 只能返回一个值: </font>**
返回的结果是最后一个值
```js
    function fn(num1, num2) {
        return num1, num2;

        // 如果想返回多个结果 可以利用数组
        return [num1+num2, num1*num2];
    }
    console.log(fn(1,2));       // 2
    
```

**函数没有return 返回undefined**

<br>

# arguments --- 装实参的类数组
当我们不确定有多少个参数传递的时候, 可以用arguments来获取, 在js中, arguments实际上它是当前函数的一个内置对象, 所有函数都内置了一个arguments对象, arguments对象中存储了传递的所有实参

### **<font color="#C2185">arguments的使用: </font>**
```js
    function fn() {
        console.log(arguments)
        console.log(arguments[0] + arguments[1] + arguments[2])
    }
    fn(1,2,3);
```

在调用函数时浏览器每次都会传递进两个隐含参数
1. 函数的上下文对象this
2. 封装实参的对象arguments 


### **<font color="#C2185">类数组: </font>**
arguments是一个 伪 数组对象不是数组 类似数组

它也可以通过索引来操作数组也可以获取长度
1. 具有数组的length属性
2. 按照索引的方式存储的
3. 它没有真正数组的方法
4. 在调用函数时我们所传递的实参都会在arguments中保存
5. 我们即使不定义形参也可以通过arguments来使用实参
```js
    arguments[0]        第一个实参
    arguments[1]        第二个实参
```

### **<font color="#C2185">arguments.callee: </font>**
这个属性对应一个函数对象就是当前正在执行的函数对象调用谁, callee就是谁
```js
    // 打印出了函数对象的整个内容 
    console.log(arguments.callee); 
```

<br>

# 函数的实参可以是任意值

创建一个函数可以在控制台中输出一个人的信息
可以输出人的name age gender address
```js
    function sayHello(name,age,gender,address){
        console.log(name,age,gender,address)
    }
    sayHello("猪八戒", 28, 男, "高老庄");
```

现在需要4个参数参数太多了当参数太多的时候容易乱 
```js
    var obj = {
        name = "猪八戒",
        age = 18,
        gender = "男",
        address = "花果山"
    }
```

**实参可以是任意数据类型也可以是一个对象**

当我们的参数过多时可以将参数封装到一个对象然后通过对象传递
```js
    function sayhello(o){
        console.log(o.name,o.age,o.gender,o.address);
    }
    sayhello(obj);
```

形参那里是相当于定义了一个变量o

    o.name
    o.age
    o.gender

实参那里传进去一个对象的内容就相当于obj.name


### **<font color="#C2185">实参既然可以是对象那么实参还可以是个函数: </font>**
```js
    function fun(a){
        console.log("a = " + a );
    }
    fun(123);
```

接下来实参里面传递一个函数
```js
//我把实参传进去了现在a相当于sayhello
fun(sayhello)   
```
在开发的时候经常会用到将一个匿名函数作为实参传递给函数 

<br>

# 立即执行函数
函数定义完立即被调用这种函数叫做立即执行函数立即执行函数往往只会执行一次
```js
    function(){
        alert("我是一个匿名函数");          //匿名函数会报错
    }
```

用一个括号用来圈起来一个函数代表一个整体直接写那会报错
```js
    (function () {
        alert("我是一个匿名函数");  
    })
```

调用:
```js
    (function(){
        alert("我是一个匿名函数");     
    })();
```

<!-- 
    上面的就是立即执行函数往往只会执行一次, 假如上面的函数我只想调用一次调用一次之后就丢了这种函数假如我要是创建一个对象的话有点亏了 
-->

上面的函数是立即执行函数, 

### **<font color="#C2185">主要作用: </font>**
创建一个独立的作用域

### **<font color="#C2185">立即执行函数的两种写法: </font>**
(function(a){ ... })(1)
(function(a,b){ ... }(1,2))

立即执行函数 也可以写函数名

**立即执行函数的最大作用就是 独立创建了一个作用域**
所有的变量都是局部变量, 函数执行完毕变量自动释放

<br>

# 作用域
通常的来说, 一段程序代码中所用到的名字并不总是有效和可用的, 而限定这个名字的可用性的代码范围就是这个名字的作用域
作用域的使用提高了程序逻辑的局部性, 增强了程序的可靠性, 减少了名字的冲突

简单的来说, 就是代码名字在某个范围内起作用和效果, 作用域指一个变量的作用的范围


### **<font color="#C2185">作用域就分为两种: </font>**
### **<font color="#C2185">1. 全局作用域: </font>**
整个script标签, 或者 是一个单独的js文件
全局作用域中的变量都是全局变量, 在页面的任意部分都可以访问的到

全局作用域在
    页面打开时创建
    页面关闭时销毁
    
在全局作用域中有一个全局对象window它代表的是一个浏览器窗口, 它由浏览器创建我们可直接使用 

在全局作用域中: 
创建的变量都会作为window对象的属性保存
创建的函数都会作为window的方法来保存

```js 
    var a = 10;
    console.log(a);         //这个a是保存在window的属性里
    console.log(window.a)   //我们来试一下看看能不能打出 10

    function fun(){
        console.log("我是fun函数");
    }
    window.fun();
    window.alert(); 
```

**注意:**
使用 var 和 函数声明 方式 定义的 属性 和 方法 会 挂载在window上
是用 let 和 const 声明的变量 不会挂载在window上

全局环境是一个复合环境 由下面的两个环境组成
    - global(顶层对象)
    - declsEnv(一般声明环境)

ES6之后 let const class 命令声明的全局变量 不属于顶层对象的属性 而是在一般声明环境 declsEnv 中

var声明的变量在 Global 中

<br>

### **<font color="#C2185">2. 局部作用域(函数作用域): </font>**
在函数内部就是局部作用域 这个代码的名字值在函数内起效果和作用
如果全局作用域像一个学校的话那么函数作用域就相当于一个个的班级
```js 
    function fn() {
        // 局部作用域
    }
```

调用函数时
    创建函数作用域函数
    
执行完毕后
    函数作用域销毁
    
每调用一次函数就会创建一个新的函数作用域它们之间相互是独立的
班级中可以访问到全局作用域里的变量, 在全局作用域中无法访问到函数作用域的变量 


<br>

### **<font color="#C2185">变量的作用域: </font>**
在js中 根据作用域的不同, 变量可以分为两种

1. 全局变量:  
在全局作用域下的变量, 在全局在都可以使用
<!-- 在函数内部没有声明 直接赋值的变量也是全局变量 -->

2. 局部变量:  
在局部作用域下的变量, 或者在函数内部的变量就是 局部变量, 局部变量只能在函数内部使用
<!-- 函数的形参也是局部变量 -->

从执行效率来看全局变量和局部变量:
1. 全局变量 只有浏览器关闭的时候才会销毁, 比较占内存资源
2. 局部变量 当我们程序执行完毕后就会销毁, 比较节约资源

<br>

# 作用域链 (查找变量的规则)
只要是代码就有作用域 写在函数内部的就是局部作用域
如果函数中还有函数, 那么在这个作用域中就又可以诞生一个作用域

根据在内部函数可以访问外部函数变量的这种机制, 用链式查找决定哪些数据能被内部函数访问, 就称作作用域链
```js
    let num = 10;
    function fn() {              // 外部函数
        let num1 = 20;

    function fn2() {            // 内部函数
            console.log(num1);  // 内部函数可以访问外部函数的变量
        }
    }
```


### **<font color="#C2185">总结: : </font>**
内部函数访问外部函数的变量, 采取的是链式查找的方式来决定取哪个值, 这种结构我们称为作用域链 --- *就近原则*

一层一层依次向外层查找

多个上下级关系的作用域形成的链它的方向是从下向上或者从内到外, 查找变量时就是沿着作用域链来查找的 最外层的可以叫做0级链


### **<font color="#C2185">变量的查找规则: </font>**
当在函数作用域中操作一个变量时会先在自身的作用域中寻找如果有就直接使用
    如果没有就向上一级进行寻找注意是上一级直到找到全局作用域
    如果全局作用域也没有会报错

在函数中要访问全局变量可以使用window对象

在函数作用域中也有声明提前的特性
    使用var关键字声明的变量会在函数中所有的代码执行之前被声明
    函数声明也会在函数中所有的代码执行之前执行

<br>

# 预解析
js代码是由浏览器中的js解析器(引擎)来执行的, js解析器在运行js代码的时候分为两步:
预解析
代码执行

### **<font color="#C2185">预解析: </font>**
js引擎会把js里面所有的 var 还有 function 提升到 当前作用域 的最前面
预解析分为 变量预解析(变量提升) 和 函数预解析(函数提升)

**注意:**
函数提升优先级比变量提升要高, 且不会被变量声明覆盖, 但是会被变量赋值覆盖。
同一个标识符的情况下, 变量声明与函数声明都会提升；函数声明会覆盖变量声明, 但不会覆盖变量赋值, 即: 如果声明变量的同时初始化或赋值那么变量优先级高于函数。
<!-- 
    提升按照书写顺序提升 不分变量 和 函数提升的优先级的问题 
-->

```js
var a = 4
function a() {
  console.log("a")
}

// 函数先提升 被 a = 赋值 覆盖
console.log(a)
```


### **<font color="#C2185">变量提升: </font>**
就是把所有的变量声明提升到当前的作用域的最前面 只提升声明 不提升赋值
*变量提升不能跨 script*
```js
    console.log(num)    //undefined
    var num = 10;

        ↓
    
    var num;
    console.log(num);
    num = 10;
```

```js 
    fun();                  // 报错 fun不是一个函数
    var fun = function() {
        console.log(22);
    }

        ↓
    
    var fun;
    fun();
    fun = function() {
        console.log(22);
    }
```

<br>

### **<font color="#C2185">函数提升: </font>**
就是把所有的函数声明提升到当前作用域的最前面, 不调用函数
```js
    fn();
    function fn() {
        console.log(2);
    }
    
        ↓
    
    function fn() {         // 把整个函数声明提升到作用域的最前面
        console.log(2);
    }
    fn();
```


### **<font color="#C2185">代码执行: </font>**
按照代码书写的顺序从上往下执行


### **<font color="#C2185">案例: </font>**
```js 
    f1();
    console.log(c);
    console.log(b);
    console.log(a);

    function f1() {
        var a=b=c=9;
        console.log(a);
        console.log(b);
        console.log(c);
    }

        ↓
    // 函数先提升到最前面
    function f1() {             
        var a=b=c=9;
        // 相当于: var a = 9;  b = 9;  c = 9;
        // 如果想多个赋值的话: var a = 9, b = 9, c = 9
        console.log(a);
        console.log(b);
        console.log(c);
    }
    f1();
    console.log(c);
    console.log(b);
    console.log(a);         // 报错  函数内部的变量访问不到会报未定义的错
```

<br>

# 基本包装类型
```js
    let str = 'andy';
    console.log(str.length);
```

### **<font color="#C2185">思考: </font>**
为什么会有str.length的属性, 前面说过, 只有复杂的数据类型才有 属性和方法
简单数据类型为什么length属性呢?


### **<font color="#C2185">基本包装类型: 就是把简单数据类型 包装成 复杂数据类型: </font>**
简单的两行代码 其实内部进行了如下的操作
```js
    // 包装的类型
    let str = 'andy';
    console.log(str.length);

    // 1. 把简单数据类型包装为复杂数据类型
    let temp = new String('andy');
    
    // 把临时变量的值 给str 这样str就变成复杂数据类型就有属性和方法了
    str = temp;

    // 销毁临时变量
    temp = null;
```

在js中为我们提供了三个包装类通过这三个包装类可以将基本数据类型的数据转换为对象, 三个包装类都是什么呢？

### **<font color="#C2185">String(): </font>**
可以将基本数据类型的字符串转换为String对象
    var str = new String();


### **<font color="#C2185">Number(): </font>**
可以将基本数据类型的数值转换为Number对象
    var num = new Number();
    
### **<font color="#C2185">Boolean(): </font>**
可以将基本数据类型的布尔值转换为Boolean对象
    var bool = new Boolean();

```js
    var num = new Number(3);
    var num2 = new Number(3);
    var str = new String("hello");
    var str2 = new String("hello");
    var bool = new Boolean(true);
```

**注意:** 
我们在实际应用中不会使用基本数据的对象, 因为在用基本数据类型的对象做比较时会带来一些不可预料的结果 

既然不让我们用它们有什么用呢？ 浏览器底层自己会用 方法和属性只能添加给对象不能添加给数据类型
 
<br>

# 字符串不可变
指的是里面的值不可变, 虽然看上去可以改变内容, 但是其实是地址变了, 内存中新开辟了一个内存空间 *因为我们的字符串的不可变所以不要大量的拼接字符串*
```js
    let str = 'andy';
    console.log(str);   // andy

    str = 'red'
    console.log(str)    // red
```

<!-- 
    上面看上去虽然字符串值发生了变化 实际上在重新赋值为red时, 是新开辟了一个块空间, str指向了这个空间, 而andy还是在的

    所以不要大量的对字符串进行重新赋值, 也不要大量拼接字符串, 因为都会开辟新的空间
 -->

<br>

# 字符串
字符串的所有方法, 都不会修改字符串本身(字符串是不可变的), 操作完成后会返回一个新的字符串

### **<font color="#C2185">str.length属性: : </font>**
可以获取字符串的长度


### **<font color="#C2185">str[index]: </font>**
H5 IE8+支持, 和charAt()等效


### **<font color="#C2185">str.charAt(index): : </font>**
根据索引返回指定位置的字符

参数:
默认值: 0

```js
    str = "hello,Atguigu";
    var result = str.charAt(0);

    //索引为0的元素上面的式子还可以这么写
    var result = str[6];
    console.log(result);         //h
```

<br>

### **<font color="#C2185">str.charCodeAt(index): </font>**
根据索引返回指定位置的字符的ASCII编码
我们键盘上的每一个键位都会对应一个ASCII码 我们可以判断用户按了哪个键

```js
let str = "sam"
let code = str.charCodeAt()
console.log(code)   // 115
```

<br>

### **<font color="#C2185">String.fromCharCode(): </font>**
可以根据字符编码去获取字符, 这个方法是构造函数对象的 得通过构造函数对象取调用
表示16进制的时候要以0x开头, 另外它可以获取Unicode编码中的字符跟我们之前的var 没关系
    
    result = String.fromCharcode(72);
    console.log(result);            //H

<br>

### **<font color="#C2185">str.concat(str2, [, ...strN])): </font>**
将一个或多个字符串与原字符串连接合并, 形成一个新的字符串并返回。

参数:
需要连接的字符串

**注意:**
强烈建议使用赋值操作符（+, +=）代替 concat 方法。

<br>

### **<font color="#C2185">str.endsWith(): </font>**
用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的

参数:
子串

返回值:
boolean

```js
let str = "demo.jpg"
console.log(str.endsWith(".jpg"))
```

<br>

### **<font color="#C2185">str.startsWith(): </font>**
用来判断当前字符串是否以另外一个给定的子字符串开头

返回值:
boolean

<br>

### **<font color="#C2185">str.includes(): </font>**
用于判断给定字符串是否包含在str中

参数:
1. searchString: 要搜索的字符串
2. position: 开始搜索的位置


返回值
boolean

```js
let str = "demo.jpg"
console.log(str.includes("."))  // true
```

<br>

### **<font color="#C2185">str.indexOf(): </font>**
检索给定字符串是否在str中

返回值:
给定字符串 第一次出现的索引
如果没有找到 返回 -1

参数:
1. 给定字符串(默认值: undefined)
2. fromIndex
默认值: 0


**注意:**
1. 当我们查找的是空值的时候 会返回0
2. 当我们传入fromIndex 并查找空值的时候 会返回 fromIndex
```js
let str = "demo.jpg"
console.log(str.indexOf(""))    //0

<br>

'hello world'.indexOf('', 11) // 11
```

3. indexOf()区分大小写

示例:
统计一个字符串中某个字母出现的次数
```js
var str = 'To be, or not to be, that is the question.';

var count = 0;
var pos = str.indexOf('e');

while (pos !== -1) {
  count++;
  pos = str.indexOf('e', pos + 1);
}

console.log(count); // displays 4
```

<br>

### **<font color="#C2185">str.lastIndexOf(): </font>**
该方法的用法跟indexOf一样不同的是indexOf是从前往后找, 而lastIndexOf是从后往前找

可以传递第二个参数来决定开始查找的位置

<br>

### **<font color="#C2185">str.localeCompare(str2, [locales], [options]): </font>**
比较两个字符串的位置 根据返回的数字 可以看出谁在前 谁在后
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

参数:
str2: 比较的字符串

*locales 和 options 不是所有的浏览器都支持*

locales:
指定用来排序的语言: 可选的

options:
    - localeMatcher:
        - 可选值: lookup | best fit
        - 默认值: best fit

    - usage:
        - 指定比较的目标是排序或者是搜索
        - 可选值: sort | search
        - 默认值: sort

    - sensitivity:
        - 指定排序程序的敏感度
        - 可选值: sort | search
        - 默认值: sort

返回值:
如果 str1 在 str2 之前 则为 负数
如果 str1 在 str2 之后 则为 正数
相等的时候返回 0

```js
let str1 = "a"
let str2 = "b"

let res = str1.localeCompare(str2)
console.log(res)    // -1


let str1 = "c"
let str2 = "b"

let res = str1.localeCompare(str2)
console.log(res)    // 1
```

<br>

### **<font color="#C2185">str.match(): </font>**
返回匹配的结果(字符串数组), 根据正则 | 给定字符

### **<font color="#C2185">参数: </font>**
正则表达式 | 字符串
(如果我们传入的是字符串 会隐式的使用 new RegExp() 对其进行转换)

### **<font color="#C2185">返回值: </font>**
匹配的结果 数组
如果*没有传递任何参数* 则返回的就是 [""]
如果*没有匹配成功* 则返回 null

### **<font color="#C2185">返回值分为两种情况: </font>**
1. 使用 g 模式:
    将返回与完整正则表达式匹配的所有结果 但*不会返回 捕获组()*
```js
    let str = 'The quick brown fox jumps over the lazy dog. It barked.';

    let res = str.match(/The/g)
    console.log(res)  // ['The']
```

2. 不用 g 模式:
    仅返回 *第一个完整匹配及其相关的 捕获组()*
    这种情况下 返回的项目将具有附加属性
```js
    let str = 'The quick brown fox jumps over the lazy dog. It barked.';

    let res = str.match(/The/)
    console.log(res)

// 结果
[
  '',
  index: 0,
  input: 'The quick brown fox jumps over the lazy dog. It barked.',
  groups: undefined
]
```

    - 附加属性:
        - groups:
            - 一个命名捕获组对象, 其键是捕获组名称, 值是捕获组, 如果未定义命名捕获组, 则为 undefined
        - index: 匹配的结果的开始位置
        - input: 搜索的字符串。

示例:
使用 match 查找 "Chapter" 紧跟着 1 个或多个数值字符, 再紧跟着一个小数点和数值字符 0 次或多次。正则表达式包含 i 标志, 因此大小写会被忽略。

```js
let str = 'For more information, see Chapter 3.4.5.1';

let reg = /see (chapter \d+(\.\d)*)/i;
let res = str.match(reg)

console.log(res)


[
  // 'see Chapter 3.4.5.1' 是整个匹配。
  'see Chapter 3.4.5.1',

  // 'Chapter 3.4.5.1' 被'(chapter \d+(\.\d)*)'捕获。
  'Chapter 3.4.5.1',

  // '.1' 是被'(\.\d)'捕获的最后一个值。
  '.1',

  // 'index' 属性 (22) 是整个匹配从零开始的索引。
  index: 22,
  input: 'For more information, see Chapter 3.4.5.1',
  groups: undefined
]
```

<br>

### **<font color="#C2185">str.matchAll(): </font>**
返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

**注意:**
必须配合 g 模式使用呢

参数:
正则表达式

返回值:
一个迭代器
(跟 match()方法不加g的返回结果是一样的 也有附加信息)
(不可重用, 结果耗尽需要再次调用方法, 获取一个新的迭代器)

迭代器 配合 for...of 和 ... 和 Array.from 使用 可以单独拿到每一个

示例:
```js
let str = "test1test2"

// 必须使用 g
let reg = /t(e)(st(\d?))/g

// res 是 迭代器 里面有单个详情的 匹配结果
let res = str.matchAll(reg)

/*  
    res:
    [
        [
            'test1',
            'e',
            'st1',
            '1',
            index: 0,
            input: 'test1test2',
            groups: undefined
        ],
        [
            'test2',
            'e',
            'st2',
            '2',
            index: 5,
            input: 'test1test2',
            groups: undefined
        ]
    ]
*/

// 可以将迭代器 转换为数组 或者使用数组的方法操作
Array.from(res).map(item => {
  console.log(item)
})

for (let matched of res) {
  console.log("matched", matched)
}

const array = [...str.matchAll(regexp)];
console.log(array[0])
```

<br>

### **<font color="#C2185">str.padEnd(num:指定长度, "用什么字符来补位"): </font>**
### **<font color="#C2185">str.padStart(num:指定长度, "用什么字符来补位"): </font>**
```js
'x'.padStart(5, 'ab')
```

返回值:
新的str

如果省略第二个参数 默认使用空格补全长度

应用场景: 
为数值补全指定位数
```js
'1'.padStart(10, '0') // "0000000001"
```

提示字符串格式。
```js
'12'.padStart(10, 'YYYY-MM-DD')
```

<br>

### **<font color="#C2185">str.replace(给定部分, 指定部分): </font>**
将 str 中 给定部分 替换成 指定部分 并将结果返回

### **<font color="#C2185">参数: </font>**
### **<font color="#C2185">给定部分: 字符串 | 正则表达式: </font>**
    - 如果 给定部分 仅是一个字符串 那么仅第一个匹配项会被替换
```js
let str = "this is a good job"

let res = str.replace("this", "hello")
console.log(res)
// hello is a good job
```

### **<font color="#C2185">指定部分可以是 新内容(字符串) | Fn: </font>**
### **<font color="#C2185">指定部分: 新内容: </font>**
    - 指定部分(*指定部分为字符串的时候可以使用下面的特殊参数*)中可以内插一些特殊的变量名作为参数
    - $$: 插入一个 "$"。
    - $&: 插入匹配的子串。
    - $`: 插入当前匹配的子串左边的内容。
    - $': 插入当前匹配的子串右边的内容。
    - $n: 第几组
    - $<Name>: 分组名
```js
let str = "this is a good job"

let res = str.replace("this", "$$$&")
// 或者 上下两个是一个结果
let res = str.replace("this", "$$this")

console.log(res)
```

### **<font color="#C2185">指定部分: Fn: </font>**
当我们指定部分为Fn的时候 当匹配指定后 该回调就会执行 回调中的返回值作为 替换字符串

如果第一个参数是正则表达式 并且为全局模式 那么这个回调将被多次调用 每次匹配都会被调用

Fn的形参
    - match: 
        匹配的内容

    - s1, s2...: 
        代表第n个括号匹配的字符串

    - offset:
        匹配到的子字符串在原字符串中的偏移量
        比如: 如果原字符串是 'abcd', 匹配到的子字符串是 'bc', 那么这个参数将会是 1

    - string:
        被匹配的原字符串。


### **<font color="#C2185">返回值: </font>**
新的字符串


### **<font color="#C2185">示例: 指定部分为 回调: </font>**
需求:
abc12345#$*%
abc - 12345 - #$*%

```js
let str = "abc12345#$*%"
let reg = /([a-z]+)(\d+)([^\w+])/

str = str.replace(reg, (_, s1, s2, s3) => {
  return `${s1} - ${s2} - ${s3}`
})

console.log(str)
```


### **<font color="#C2185">示例: 指定部分为 字符串: </font>**
需求: 交换字符串中的两个单词
这个脚本使用$1 和 $2 代替替换文本。
```js
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
// Smith, John
console.log(newstr);
```

### **<font color="#C2185">示例: 大写字母前 + "-": </font>**
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
```js
var newString = propertyName.replace(/[A-Z]/g, '-' + '$&'.toLowerCase());  // won't work
```

<br>

### **<font color="#C2185">str.replaceAll(给定部分, 指定部分): </font>**
将 str 中 给定部分 替换成 指定部分 并将结果返回

**注意:**
模式必须为 g

剩下的和上面的 replace() 一样

<br>

### **<font color="#C2185">str.search(): </font>**
根据 正则 返回匹配部分 在str的首次出现的 索引

参数:
字符串 | 正则
如果传递字符串吗默认会被 new RegExp(regexp) 隐式地将其转换为正则表达式对象。

```js
let str = "abc12345#$*%abc"

let reg = /[a-z]/g

let res = str.search(reg)
console.log(res)    // 0
```

### **<font color="#C2185">兼容性: </font>**
全红

<br>

### **<font color="#C2185">str.slice(): </font>**
可以从字符串中截取指定的内容 不影响原字符串而是将截取到的内容返回

参数:
start: 
开始索引(包括)

end:
结束索引(不包括)

如果省略 end 则从开始截取到最后
如果是负数 则从后面开始计算

start end 都可以传递负数 最后一位为-1

```js
let str = "abcderrtg";
let res = str.slice(0,2);

console.log(res);   //ab


let str = "abcderrtg";
let res = str.slice(-3);

console.log(res);   // rtg
```

<br>

### **<font color="#C2185">str.substring(): </font>**
可以用来截取一个字符串和slice类似

参数:
start: 
开始索引(包括)

end:
结束索引(不包括)

省略 end 就是从开始的全部

**注意:**
这个方法不能接受负值如果传递了一个负值则默认使用0
他会自动调整参数的位置如果第二个参数小于第一个则自动交换
(1 0) 自动交换 (01) 

<br>

### **<font color="#C2185">str.substr()  --- 废弃了: </font>**
用来截取字符串对原数组没有影响

参数
1. 截取开始位置的索引
2. 截取的长度

<br>

### **<font color="#C2185">arr.join()    将数组转为字符串: </font>**
### **<font color="#C2185">str.split()   将字符串转为数组: </font>**
传入一个指定的分隔符 | 正则 根据指定部分将str拆分成数组

参数:
separator:
它可以是字符串 或者 正则表达式

如果传入空串 "" 则每个字符会被单独作为数组中的元素
如果不传参数 则整个字符串作为数组中的元素

limit:
一个整数
限定返回的分割片段数量, 如设置为3 则数组中有3个片段

```js
let str = "The quick brown fox jumps over the lazy dog";

let res = str.split(" ", 3)
console.log(res)

// [ 'The', 'quick', 'brown' ]

```
<br>

### **<font color="#C2185">str.toLowerCase(): </font>**
把字符串转换为小写, 并返回 不会影响到原字符串
  
        str = "abcffsdf"
        result = str.toLowerCase();
        console.log(result);

### **<font color="#C2185">str.toUpperCase(): </font>**
把字符串转换为大写, 并返回 不会影响到原字符串

<br>

### **<font color="#C2185">str.trim() : </font>**
去除字符串两端空格

### **<font color="#C2185">str.trimEnd(): </font>**
去除字符串末尾空格

### **<font color="#C2185">str.trimStart(): </font>**
去除字符串开始空格


<br>

# 正则表达式
用于定义一些字符串的规则我们的计算机可以根据正则表达式来检查一个字符串是否符合规则, 或者将字符串符合规则的内容提取出来

正则表达式是一个对象所以第一步我们要创建正则表达式的对象

### **<font color="#C2185">场景: </font>**
1. 验证表单
用户名表单只能输入英文字母, 数字 或者下划线 昵称输入框中可以输入中文

密码框的位数限制 6-16位

2. 过滤掉页面内容中的一些敏感词(替换)
3. 从字符串中获取我们想要的特定部分(提取)等
比如搜索框 输入两个字 提取相关信息


### **<font color="#C2185">特点: </font>**
灵活性, 逻辑性 功能性非常的强
可以迅速的用极简单的方式达到字符串的复杂控制
```js
    // 验证邮箱的正则表达式
    ^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$

    // 验证用户名
    /^[a-z0-9_-]{3,16}$/
```


### **<font color="#C2185">创建正则表达式的二种方式: </font>**
正则表达式里面不需要加引号, 不管是数字型还是字符串型

    let reg = /123/;
    let reg = /今天天气真不错/


### **<font color="#C2185">var reg = new RegExp(/正则/);: </font>**
通过构造函数的方式来创建正则表达式

    var reg = new RegExp("a");
    var str = "a";

语法: 
    var 变量 = new RegExp("正则表达式", "匹配模式");

严格区分大小写内容要被""包起来


在构造函数中可以传递一个匹配模式作用第二个参数
    可以是: 
    i   忽略大小写
    g   全局匹配模式
<!-- 
    找这个字符串中有没有a并且忽略大小写
    var reg = new RegExp("a");
    var reg = new RegExp("a", "i");
 -->


### **<font color="#C2185">var reg = /正则/: </font>**
通过字面量来创建正则表达式
语法: 
    var 变量 = /正则表达式/匹配模式(ig)
    var reg = /a/i;    ==   var reg = new RegExp("a", "i");

使用字面量创建更加简单但是使用构造函数创建更加的灵活
使用构造函数创建因为它里面传递的是字符串所以可以传递变量查找变量更加灵活 而 使用字面量字面量没办法变化相当于写死了 


### **<font color="#C2185">正则表达式参数: </font>**
有三种值

g :   全局匹配
i :   忽略大小写
gi:   全局匹配 + 忽略大小写



### **<font color="#C2185">正则对象.test('字符串'): </font>**
创建一个正则表达式检查一个字符串中的情况

    var reg = / /
    reg.test()  


### **<font color="#C2185">正则对象.exec("字符串"): </font>**
返回匹配的字符串
返回一个数组 找不到的话返回null

数组中第一个元素是 与正则表达式相匹配的文本
数组中第二个元素是 正则表达式的第 1 个子表达式相匹配的文本(如果有的话)

当我们使用()进行分组的时候 我们匹配的结果会体现在数组的的一个个元素上
<!-- 
    let reg = /<a href="(.*)">(.*)<\/a>/igs
    这就是两个组 () ()

    我们在获取结果的时候就是 res[1] res[2]
 -->


### **<font color="#C2185">正则表达式的组成: </font>**
一个正则表达式可以由简单的字符构成, 比如/abc/ 也可以是简单的特殊字符的组合, 比如/ab*c/, 其中特殊字符也被称为元字符 


### **<font color="#C2185">边界符: </font>**
^           表示匹配行首的文本(以xx开始)
$           表示匹配行尾的文本(以xx结束)

### **<font color="#C2185">字符类: </font>**
[]          有一系列字符可供选择, 只要匹配其中一个就可以了
    let reg = /[abc]/; 
<!-- 只要是包含有a或者包含有b或者包含有c -->

    reg.test('andy')        // true
    reg.test('baby')        // true
    reg.test('color')       // true

    reg = /^[abc]$/
<!-- 比如是以a开头以a结尾, 或者以b开头以b结尾, 或者以c开头以c结尾 -->


### **<font color="#C2185">范围: </font>**
[A-z]       当中的任意字符
[0-9]       任意数字


### **<font color="#C2185">字符组合: </font>**
[A-Za-z0-9]


### **<font color="#C2185">内部取反: </font>**
[^ ]        除了    [^ab] 除了ab 检索其它 或者理解为 除了括号里的东西都可以


### **<font color="#C2185">量词符: </font>**
量词符用来设定某个模式出现的次数
使用量词的时候中间不要有空格

*           重复零次或更多次
<!-- 
    - 相当于 >= 0, 可以出现0次或很多次
    - eg:   reg= /^a*$/     允许a出现0次或很多次
    - reg.test('');         // true
    - reg.test('a');        // true
    - reg.test('aaaa');     // true
 -->
   
+           重复一次或更多次
<!-- 
    - 相当于 >= 1, 可以出现1次或很多次
    - eg:   reg= /^a*$/     允许a出现0次或很多次
    - reg.test('');         // false
    - reg.test('a');        // true
    - reg.test('aaaa');     // true
 -->

?           重复零次或一次
<!-- 
    - 相当于 1 || 0
    - reg.test('');         // true
    - reg.test('a');        // true
    - reg.test('aaaa');     // false
 -->

{n}         重复n次
<!-- 
    {3}     就是重复3次
    - reg.test('');         // false
    - reg.test('a');        // false
    - reg.test('aaa');      // true
 -->

{n,}        重复n次或更多次
<!-- 
    {3,}    大于等于3
 -->

{n,m}       重复n到m次
<!-- 
    {3,16}  大于等于3 并且 小于等于16
 -->


### **<font color="#C2185">括号总结: </font>**
[ ]       字符集合 匹配方括号中的任意字符     a || b || c   [abc]
{ }       量词符 里面表示重复次数

( )       表示优先级
<!-- 
    let reg = /^abc{3}$/
    str = abccc

    let reg = /^(abc){3}$/
    str = abcabcabc
 -->


### **<font color="#C2185">预定义类: </font>**
预定义类指的是某些常见模式的简写方式

\w          任意字母和数字和_       [A-z0-9_]
\W          除了字母 和 数字 和 _   [^A-z0-9_]

\d          任意数字                [0-9]
\D          除了数字                [^0-9]

\s          空格(包括换行符 制表符 空格符) 相当于 [\t\r\n\v\f]
\S          除了空格                [^\t\r\n\v\f]

\b          单词边界
\B          除了单词边界



### **<font color="#C2185">转义字符: </font>**
创建一个正则表达式检查一个字符串中是否含有 . 

    var reg = /./;                  
<!-- 
    //var reg = /\./;   要加上转义字符
 -->
    console.log(reg.test("."));

<!-- 
    需要注意的是, 假如用构造函数创建的话
    reg = new RegExp("\.");
    console.log(reg);       //结果就是一个. 没有\
    
    总结字面量里有转义字符一个\就可以但是构造函数中得是\\ 
-->

### **<font color="#C2185">单词边界: </font>**
创建一个正则表达式检查一个字符串中是否含有单词child

    reg = /child/
    console.log(reg.test("child"));     //true
        
    reg = /\bchild\b/
    console.log(reg.test("hello children"));
<!-- 只能找child这个单词 -->


### **<font color="#C2185">/指定字符(?=空格n)/: </font>**
匹配紧跟n的指定字符
<!-- 
    <p>this is all ok this</p>

    let reg = /is(?= all)/;
    let res = pStr.match(reg)       // is
 -->

### **<font color="#C2185">/指定字符(?!空格n)/: </font>**
匹配没有紧跟n的指定字符
<!-- 
    <p>this this all ok this</p>

    let reg = /this(?! all)/g;
    let res = pStr.match(reg)    // ['this', 'this']
 -->


### **<font color="#C2185">对目标文本后面的情况作为条件: </font>**
    // 查找abc 条件是abc的后面是d
    let reg1 = /abc(?=d)/g

    // 查找abc 条件是abc的后面不是d
    let reg2 = /abc(?!d)/g


### **<font color="#C2185">对目标文本前面的情况作为条件: </font>**
    // 查找d 条件是d的前面是abc
    let reg3 = /(?<=abc)d/g

    // 查找d 条件是d的前面不是abc
    let reg4 = /(?<!abc)d/g


https://c.runoob.com/front-end/854

<br>

### **<font color="#C2185">正则的小练习: </font>**
### **<font color="#C2185">案例 用户名的验证 : </font>**

    let reg = /^[a-zA-Z0-9_-]$/;
<!-- 
    这个模式勇士孰能输入英文字母 数字 下划线 短横线但是有边界符 和 []
    这就限定了只能 出现1次

    reg.test('a')       // true
    reg.test('1')       // true
    reg.test('18')      // false
 -->

所以我们可以使用量词 让这个模式出现的次数是6-16之间 这样就能匹配多个字符
    let reg = /^[a-zA-Z0-9_-]{6,16}$/;
<!-- 
    reg.test('aaasdf'); // true
 -->


### **<font color="#C2185">案例 验证座机号码: </font>**
座机号验证: 全国座机号 两种格式
    010-12345678
    0530-1234567

    let reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;


### **<font color="#C2185">案例 验证手机号: </font>**
创建一个正则表达式用来检查一个字符串是否是一个合法手机号
手机号规则: 
    1. 1 3 5670123
    2. 以1开头
    3. 第二位为3-9的任意数字
    4. 3位以后任意数字

    var phoneStr = "135670123"
    var phoneReg = /^1[3-9][0-9]{9}$/;
    console.log(phoneReg.test(phoneStr));


### **<font color="#C2185">案例 验证邮箱: : </font>**
电子邮件: 

    hello@abc.com.cn

任意字母数字下划线   .任意字母下划线   @   任意字母数字   .任意字母(2-5位)   .任意字母(2-5位)

<!-- 
    /\w+\.\w*@\[A-z0-9]+\.\w{2,5}(\.\w{2,5})?/g

    ^\w{3, }(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$      //^$不要省略

    var emailReg = /\w{3, }(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}/
    var email = "hello@abc.com.cn";
    console.log(emailReg.test(email));
 -->


### **<font color="#C2185">案例 去除空格: </font>**
接收一个用户输入
    var str = prompt("请输入你的用户名");

去除字符串中的多余空格: 使用空串来替换掉空格 替换的str.replace();

    str = "     hello     ";
    str.replace(/\s/, "");
<!-- 这样不行 输出str不会有变化因为不会影响到原字符串 -->

    str = str.replace(/\s/, ""); 
<!-- 要把值再重新的赋回去 -->

    console.log(str);
<!-- 就替换掉了一个空格 要加上g 才是全局匹配模式(/\s/g, "") -->

假设有些空格我们不想删掉
    str = "     he llo     ";
    str = str.replace(/^\s*|\s*$/g, "");



### **<font color="#C2185">案例: 将is前面的this选中 修改字体颜色为pink: </font>**
思路:
我们先利用正则把符合条件的文本选中 并且替换成带标签的样式 replace()
然后利用正则把目标文字选中 配合replace()替换到指定位置
最后把修改好的内容重新插入到标签中
<!-- 
    <p>this is all ok this</p>

    let p = document.querySelector('p');

    // 1. 定义正则 检索什么字符
    let reg = /^this/g

    // 2. 获取标签内部的文本
    let pContent = p.innerHTML

    // 3. 将目标字符串提取出来, match的结果是数组 转成字符串
    let targetTxt = pContent.match(reg) + '';

    // 4. 将标签内部的文本 根据正则 替换成 指定样式
    let newContent = pContent.replace(reg, `<span style='color:red'>${targetTxt}</span>`)
    
    // 5. 将标签内部文本替换成修改好的样式
    p.innerHTML = newContent
 -->
       

<br>

# 和正则相关的字符串方法

### **<font color="#C2185">split(): </font>**
拆成数组
可以将一个字符串拆分为一个数组
方法可以传递一个正则表达式作为参数这样方法将会根据正则表达式去拆分字符串

如果不传递参数 代表将整个字符串转为数组

    var str = "1a3f4g5h6h7j7"
    var result = str.split(g);
<!-- 以g开始拆分字符串成数组 g没了 -->

    var result = str.split(/[A-z]/);
<!-- 根据任意字母将字符串拆分 -->


### **<font color="#C2185">search(): </font>**
检索
可以搜索字符串中是否含有指定内容
如果搜到指定内容则会返回第一次出现的索引如果没有搜索到返回-1

它可以接收一个正则表达式作为参数然后会根据正则表达式去检索字符串

    str = "hello abc hello abc aec afc"
    result = str.search("abc");

<!-- 搜索字符串中是否含有abc 或aec 或afc -->
    str = "hello abc hello abc aec afc"
    result = str.search(/a[A-z]c/);


### **<font color="#C2185">match(正则): </font>**
提取
可以根据正则表达式从一个字符串中将符合条件的内容提取出来 封装到一个数组中返回
()里传递一个正则表达式

### **<font color="#C2185">match返回的是数组: </font>**
返回的为数组 Array.isArrray()
match()会将匹配到的内容封装到一个数组中返回即使只查询到一个结果
<!-- 
    默认情况下 我们的match 只会找到第一个符合要求的内容找到以后就停止检索
    我们可以设置正则表达式为全局匹配模式这样就会匹配到所有内容
    可以为一个正则表达式设置多个匹配模式且顺序无所谓 
-->
    
    var str = "1a3f4g5h6h7j7"
<!-- 把上面的变量中的所有字母提取出来 -->

    result = str.match(/[A-z]/);    //提取出任意字母 提了个['a']
    result = str.match(/[A-z]/g);   // ['a', 'f', 'g', 'h', 'h', 'j']


### **<font color="#C2185">replace(被替换的内容, 新的内容): </font>**
替换(和删除)
可以将字符串中指定的内容替换为新的内容
参数
    第一个参数: 被替换的内容(正则选中的部分)
    第二个参数: 新的内容

默认只会替换第一个设置为正则表达式后 修改为全局匹配模式g
空串是删除

    str = "hello abc hello abc aec afc"
    result = str.replace("/a/gi", "@_@");

### **<font color="#C2185">过滤敏感词汇: </font>**
<!-- 
    let text = document.querySelector('textarea')
    let btn = document.querySelector('button');
    btn.onclick = function() {
        div.innerHTML = text.value.replace(/激情/, '**');
    }
 -->

<br>

# 引用数据类型: 

js中的数值类型: 
String
Number
Boolean
Null
Undefined
            
引用数据类型: 
Object

### **<font color="#C2185">例1:  : </font>**
```js
    var a = 123;
    var b = a;

    a++;            // a自增后b的值是多少？
```

答案是b并没用发生改变a和b的值完全是独立的一个值发生了变化并不影响另外一个值 


### **<font color="#C2185">例2: </font>**
```js
    var obj = new Object();
    obj.name = "孙悟空";

    var obj2 = obj

    console.log(obj.name);      //孙悟空
    console.log(obj2.name);     //孙悟空

// obj.name 和 obj2.name都是孙悟空 接下来我们修改obj的name属性: 

    obj.name = "猪八戒";
    console.log(obj.name);      // 猪八戒
    console.log(obj2.name);     // ?  猪八戒
```

也就是说修改一个变量也影响到另一个了！ 这就是引用数据类型和基本数据类型的区别 
    


### **<font color="#C2185">基本数据类型 和 引用数据类型的区别: </font>**
js中的变量都是保存在栈内存按照 变量和值的模式 保存

### **<font color="#C2185">基本数据类型: : </font>**
基本数据类型的值直接在栈内存中存储值与值之间是独立存在的, 修改一个变量并不会影响其他的变量解释如下
<!-- 
    想象成两列的表左边的是变量右边的是值
    var a = 123;
    就是我在栈内存的左列存了个a右列存了值123

    var b = a;
    就是我在栈内存的左列存了个b右列的值是从a的值复制过来的
    a和b都是123但是a的123和b的123没关系是互相独立的

    a++;
    a现在自增了此时对变量b产生影响了么？没有a爱咋变咋变和b没关系
 -->

### **<font color="#C2185">结构图: </font>**
变量和值在内存中的结构

    var a = 123;
    var b = a;

        栈内存                              堆内存
    
    属性名      属性值
      a          123
      b          123(从a的123复制来的)

    
### **<font color="#C2185">引用数据类型: : </font>**
引用数据类型的值(对象)是保存在堆内存中的每创建一个新的对象就会在堆内存中开辟出一个新的空间

而变量保存的是对象的内存地址(对象的引用)如果两个变量保存的是同一个对象引用时当一个通过一个变量修改属性时另一个也会受到影响, 解释如下: 
<!-- 
    想象成左边是栈内存为2列的表右边是堆内存为一个整体
    var obj = new object();

    首先是创建了一个变量所以把变量保存在左侧栈内存左列中的格子里值保存在哪？

    一旦看见new就意味着 我要在堆内存里开辟出一个新的空间这个空间专门用来保存这个对象的
    因为变量在栈内存中而对象在堆内存中所以它们之间没有关系要用变量就操作不了对象

    既然对象保存在堆内存的一个空间里那么这块空间就会有一个对应的内存地址(比如是ox123)

    这个内存空间的地址就是专门来保存 obj这个对象的

    那堆内存中的对象和栈内存中的变量是怎么建立联系的？
    所以在我们变量里保存的其实是内存地址

    想象成 栈内存左列中为obj右列中为 对象的内存地址ox123
    通过这个内存地址0x123把变量和对象联系起来了

    也就是说对象本身是没有名字的有的只是一串内存地址
 -->


现在我往obj里添加了一个name属性叫孙悟空那么我是我往变量里面添加的么？
不是吧我们是往变量里对应的地址对应的对象里添加的 所以我们是通过地址在右侧堆内存中 刚才创建的对象空间中 添加的孙悟空 
```js
    var obj = new object();
    obj.name = "孙悟空";

    // 如果: 
    var obj2 = obj;         //相当于把内存地址给了obj2
```

### **<font color="#C2185">结构图: </font>**

            栈内存                                  堆内存
    变量名              值                       
    a                   123                    内存地址: 0x123
    obj             内存地址: 0x123      ↗       name:孙悟空
    obj2            内存地址: 0x123


    接上假如: 
    obj2 = null;

相当于我修改了obj2的值之前存的是 内存地址现在为null但只是少了链接地址并没有对堆内存的空间产生影响只是断了联系 


**注意:**
两个一模一样的对象 做全等比较 也是false

<br>

# 简单类型 和 复杂类型
简单类型又叫做基本数据类型或者值类型, 复杂类型又叫做引用类型

### **<font color="#C2185">值类型: </font>**
简单数据类型(基本数据类型), 在存储时变量中存储的是值本身, 因此叫做值类型

    string number boolean undefined null

null 返回的是 空的对象
<!-- 
    如果有个变量我们以后打算存储为对象, 暂时没想好放啥, 这个时候就给null
 -->


### **<font color="#C2185">复杂数据类型 引用类型: </font>**
在存储时变量中存储的仅仅是地址(引用) 因此叫做引用数据类型, 通过new关键字创建的对象(系统对象, 自定义对象), 如Object Array Date等

<br>

# 堆和栈
### **<font color="#C2185">栈(操作系统): : </font>**
简单数据类型 是存放在栈里面, 里面直接开辟一个空间 存放的是 值


### **<font color="#C2185">堆(操作系统): </font>**
复杂数据类型 首先在栈里面存放地址, 16进制表示 然后这个地址指向堆里面的 数据


### **<font color="#C2185">简单类型传参: </font>**
函数的形参也可以看做是一个变量, 当我们把一个值类型变量作为参数传给函数的形参时, 其实是把变量在栈空间里的值复制了一份给形参, 那么在*方法内部对形参做任何修改, 都不会影响到外部变量*

```js
    function fn(a) {
        a++;
        console.log(a);     11
    }

    let x = 10;

    fn(x);

    console.log(x);         10
```

**总结: 简单类型的传参是 值传递**

<br>

### **<font color="#C2185">复杂数据类型的传参: </font>**
x 赋值给 p 是地址 两个变量指向同一个对象 其中一个修改后 另一个也有影响
```js
    function Person(name) {
        this.name = name;
    }

    function f1(x) {
        console.log(x.name);        // 刘德华
        x.name = '张学友'
        console.log(x.name);        // 张学友
    }

    let p = new Person('刘德华')
    console.log(p.name);            刘德华
    f1(p);
    console.log(p.name)             张学友
```

<br>

# 名词解释: 

### **<font color="#C2185">API: </font>**
预定义的函数, 给程序员提供的一种工具, 以便能更轻松的实现想要完成的功能

### **<font color="#C2185">Web API: </font>**
是浏览器提供的一套操作浏览器功能 和 页面元素的API(BOM DOM)

### **<font color="#C2185">DOM: </font>**
DOM 全称 document object model 文档对象模型
<!-- 
    js中通过DOM来对HTML文档进行操作只要理解了DOM就可以随心所欲的操作web页面 
-->

文档: 
    就是整个的HTML网页文档

对象: 
    表示将网页中的每一个部分都转换为了一个对象

模型: 
    使用模型来表示对象之间的关系这样方便我们获取对象

我们获取过来的DOM元素是一个对象(object), 所以称为文档对象模型

<br>

# DOM树: 
```html 
    <!DOCTYPE html>
    <html>
    <head>
        <title>Document</title>
    </head>

    <body>
        <a href="#">超链接</a>
    </body>
    </html> 
```

上面的页面比如 1.html 也是个对象html下面有谁？html标签

            文档
             ↓
            html
        ↙       ↘
    head            body
      ↓               ↓
    title             a  →  属性: href
      ↓               ↓
标签里的文字       标签里的文字
(文本节点)       (文本节点)


### **<font color="#C2185">文档: : </font>**
    DOM中使用 document表示

### **<font color="#C2185">元素: : </font>**
    DOM中使用 element表示(页面中的所有标签都是元素)

### **<font color="#C2185">节点: : </font>**
    网页中所有内容都是节点(标签 属性 文本 注释) DOM中使用node表示

<br>

### **<font color="#C2185">节点: : </font>**
我们的互联网就是由一个个节点构成的 每一个计算机 每一个路由器 每一个交换机都是节点, 是节点构成了整个网络

是构成我们网页的最基本的组成部分网页中的每一个部分都可以成为是一个节点
<!-- html标签属性文本注释整个文档等都是一个节点 -->

虽然都是节点但是实际上他们的具体类型是不同的
比如:
标签称为元素节点
属性称为属性节点
文本称为文本节点
文档称为文档节点

节点的类型不同属性和方法也都不仅相同


### **<font color="#C2185">常用的节点分为四类: : </font>**
1. 文档节点: 整个html文档
2. 元素节点: html文档中的html标签
3. 属性节点: 元素的属性
4. 文本节点: html标签中文本内容

```html
<p id="pId">This is a pargraph</p>

<p></p>                 是元素节点
id="pId"                是属性节点
This is a pargraph      文本节点
```

### **<font color="#C2185">节点的属性: </font>**
都是通过节点来调用 *节点.nodeName*
nodeName 都是大写 DIV

           nodeName    nodeType    nodeValue

文档节点    #document      9          null

元素节点    标签名          1          null

属性节点    属性名          2          属性值

文本节点    text           3          文本内容 空格换行都是

<!-- 通过值可以判断文档类型 -->

```js
let btn = document.querySelector("button")
console.log(btn.nodeName)   // BUTTON
console.log(btn.nodeType)   // 1
console.log(btn.nodeValue)  // null
```


### **<font color="#C2185">文档节点 document : : </font>**
代表的是整个html文档网页中的所有节点都是它的子节点
document对象作为window对象的属性存在的 我们不用获取可以直接使用
通过该对象我们可以在整个文档访问内查找节点对象并可以通过该对象创建各种节点对象 


### **<font color="#C2185">元素节点 Element: : </font>**
html中的各种标签都是元素节点这也是我们常用的一个节点, 浏览器会将页面中所有的标签都转换为一个元素节点, 我们可以通过document的方法来获取元素节点

比如:
根据id属性值获取一个元素节点对象
    document.getElementById()


### **<font color="#C2185">文本节点Text: : </font>**
文本节点表示的是html标签以外的文本内容任意非html的文本都是文本节点, 它包括可以字面解释的纯文本内容

文本节点一般是作为元素节点的子节点存在的
获取文本节点时一般要先获取元素节点在通过元素节点获取文本节点

比如: 
获取*元素节点的第一个子节点一般为文本节点*
\\ 元素节点.firstChild;

    
### **<font color="#C2185">属性节点 Attr: : </font>**
属性节点表示的是标签中的一个一个的属性这里要注意的是属性节点并非是元素节点的子节点, 而是元素节点的一部分
可以用过元素节点来获取指定的属性节点

比如:
    元素节点.getAttributeNode("属性名");

<br>

# 文档的加载
```html 
    <button id="btn">我是一个按钮</button>
```

```js
    var btn = document.getElementById('btn');

    btn.onclick = function(){
        alert("你还点？");
    }
```

浏览器加载一个页面时是按照自上向下的顺序加载的
读取到一行就运行一行
如果将script标签写在页面的上面时 在代码执行时页面还没有加载, 页面没有加载 DOM对象也没有加载 会导致无法获取到DOM对象


### **<font color="#C2185">写上面好还是写下面好: </font>**
如果追求性能的话写下面 后加载后执行, 写在上面好管理 好修改


### **<font color="#C2185">window.onload 事件: </font>**
该事件会在整个页面加载完成之后才触发

为window绑定一个onload事件
该事件对应的响应函数将会在页面加载完成之后执行, 这样可以确保代码执行时所有的dom对象已经加载完毕了

```js
    window.onload = function(){ };
```

<br>

# DOM 查询
### **<font color="#C2185">console.dir(): </font>**
打印我们返回的元素对象, 更好的查看里面的属性和方法


### **<font color="#C2185">获取 body:  document.body: </font>**
### **<font color="#C2185">获取 html: document.documentElement: </font>**
```js
    let body = document.body
    console.log(body)       // <body>...</body>

    let html = document.documentElement
    console.log(html)       // <html>...</html>
```

<br>

### **<font color="#C2185">获取页面元素: </font>**
### **<font color="#C2185">document.getElementById("id"): </font>**
通过 id属性 获取 一个 元素节点对象

<br>

### **<font color="#C2185">document.getElementsByName(""): </font>**
通过 name属性 获取 一组 元素节点对象
*以伪数组的形式存储*, 得到的元素是动态的, 上面html部分的内部变了 下面js的结果也会变

页面中只有一个 也是以数组返回
页面中没有这个元素的话, 返回的是空的伪数组

<br>

### **<font color="#C2185">document.getElementsByClassName('类名'): </font>**
根据类名返回元素节点
H5新增的方法, ie678不支持, 但是移动端没有问题 
返回的也是伪数组

<br>

### **<font color="#C2185">document.querySelector('选择器');: </font>**
H5新增的方法, ie8可以使用这个代替className 但是移动端没有问题

<br>

### **<font color="#C2185">document.getElementsByTagName(""): </font>**
通过 标签名 获取 一组 元素节点对象

<br>

### **<font color="#C2185">元素对象.getElementsByTagName(""): </font>**
获取元素节点的子节点

<br>

# 获取父节点 子节点 兄弟节点
利用DOM提供的方法获取元素(id TagName等), 逻辑性不强, 繁琐

利用节点层级关系获取元素(父子兄)节点关系获取元素, 逻辑性强, 但兼容性差, 但是节点操作获取元素更简单一些

注意:
页面中所有的东西都是节点 比如空格


### **<font color="#C2185">元素对象.parentElement: </font>**
### **<font color="#C2185">元素对象.parentNode(不会获取到空白文本因为父元素就一个): </font>**
属性 *表示当前节点的父节点*
得到的是离元素最近的父级节点(*亲爸爸*) 找不到父节点就为null
```js
    let p = document.querySelec('p')
    p.parentNode;
```

<br>

### **<font color="#C2185">元素对象.childNodes (标准, 一般不使用) : </font>**
表示 当前节点 的所有 子节点

返回值:
节点类数组

**要点:**
1. 只找子元素不找后代
2. 这个属性 会获取 包括文本在内的所有节点, 标签和标签之间的空白也会当成文本节点
但是在ie8以及以下的浏览器中不会将空白文本当成子节点, 所以该属性在ie8中会返回4个子元素而其他浏览器是9个
```js
    // 可以利用 nodeType 来挑选元素节点, 不要文本节点(空格)
    let ul = document.querySelector('ul');
    console.log(ul.childNodes);

    for(let i=0; i<ul.childNodes.length; i++) {
        if(ul.childNodes[i].nodeType == 1) {
            console.log(ul.childNodes[i]);
        }
    }
```

<br>

### **<font color="#C2185">元素对象.children (和上面比推荐):     只找子元素不找后代: </font>**
各个浏览器都支持
属性 可以获取 当前元素 的所有 子元素(一说元素肯定是标签了也就是不会返回空白了)

不会返回空白节点

<br>

### **<font color="#C2185">元素对象.firstChild: </font>**
属性 表示当前节点的第一个子节点(包括空白文本节点)

<br>

### **<font color="#C2185">元素对象.firstElementChild(不建议使用): </font>**
属性 获取 当前元素 的 第一个子元素
兼容性的问题 只兼容ie9以上如果做pc端的话肯定要兼容ie8的

<br>

### **<font color="#C2185">元素对象.lastChild: </font>**
属性 表示当前节点的最后一个子节点(包括空白文本节点)

<br>

### **<font color="#C2185">元素对象.lastElementChild(不建议使用): </font>**
属性 获取 当前元素 的 最后一个子元素
兼容性的问题 只兼容ie9以上如果做pc端的话肯定要兼容ie8的

<br>

### **<font color="#C2185">实际开发中 如何获取 第一个 最后一个 节点的问题: </font>**
### **<font color="#C2185">第一个元素子节点: ul.children[0]: </font>**
### **<font color="#C2185">最后一个元素子节点 : ul.children[ul.children.length-1]: </font>**

<br>

### **<font color="#C2185">元素对象.previousSibling(也可能获取到空白文本): </font>**
属性 表示当前节点的前一个兄弟节点
会获取到空格 #text

<br>

### **<font color="#C2185">元素对象.previousElementSibling(不会获取到空白文本): </font>**
属性 表示获取前一个兄弟元素IE8以下不支持

<br>

### **<font color="#C2185">元素对象.nextSibling(也可能获取到空白文本): </font>**
属性 表示当前节点的后一个兄弟节点
会获取到空格 #text

<br>

### **<font color="#C2185">元素对象.nextElementSibling: </font>**
属性 表示当前节点的后一个兄弟节点, IE8以下不支持

<br>

### **<font color="#C2185">元素对象.innerHTML: : </font>**
通过这个属性可以获取到元素内容的html代码
可以获取到标签内的内容但是对于自结束标签 没有意义 获取到的内容为空

<br>

### **<font color="#C2185">元素对象.innerText: </font>**
该属性可以获取到元素内部的文本内容
它和innerHTML类似不同的是它会自动将HTML标签去除
<!-- innerHTML有标签innerText没有标签 就这么个区别 -->

<br>

### **<font color="#C2185">元素对象.outerHTML: </font>**
innerHTML 获取的是 给定元素对象内部的 HTML 结构
比如:
```html
<div>
    <span>test</span>
</div>
```

innerHTML 获取的是 <span>test</span>

而outerHTML 获取的是 包含给定元素对象在内的HTML结构
outerHTML 获取的是 全部
```html
<div>
    <span>test</span>
</div>
```

**注意:**  
该方法火狐不认 所以针对这里要做兼容处理

很巧妙哈, 思路:  
我要获取的是 目标节点(包括目标节点) 也就是 app 本身
```html
<div id="app">
    内容
</div>
```

但是火狐不认 那我就创建一个 div作为container 然后让这个 container中添加 复制后的 app节点
```html
<div id="container">
    <!-- cloneNode(true)后的app -->
    <div id="app">
        内容
    </div>
</div>
```

然后 我们取 container.innerHTML 不就能取到 app 了么

```js
if(el.outerHTML) {
    return el.outerHTML
} else {
    // 兼容处理
    const container = document.createElement("div")
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
}
```

<br>

### **<font color="#C2185">元素对象.outerText: </font>**
获取给定元素对象在内的文本

<br>

# 创建节点
### **<font color="#C2185">document.createElement(""): </font>**
可以用于创建一个元素节点对象需要一个标签名作为参数, 将会根据该标签名创建元素节点对象并将创建好的对象作为返回值返回

<br>

### **<font color="#C2185">document.createAttribute("属性名"): </font>**
创建属性节点

```js
let attr = document.createAttribute('class');
attr.value = 'box1';
h1.setAttributeNode(attr)
```

**注意:**
元素节点.setAttributeNode()
该方法可以只设置属性名

元素节点.setAttribute('属性名', '属性值')
该方法就需要同时设置属性名 和 属性值

<br>

### **<font color="#C2185">document.createTextNode("")    : </font>**
可以用于创建一个文本节点对象需要一个文本内容作为参数, 将会根据该内容创建文本节点并将新的节点返回

<br>

# 插入 删除 替换

### **<font color="#C2185">父元素对象.appendChild()                  -- 后面添加: </font>**
调用父元素的方法向一个父节点中添加新的子节点 

**注意:**
该方法是用来添加节点 而不是内容

<br>

### **<font color="#C2185">父元素对象.inserBefore(新节点, 指定节点)     -- 前面添加: </font>**
调用父元素的方法在指定的子节点前面插入新的子节点

参数: 
1. 新节点
2. 指定节点

```js
 let li = document.createElement('li');
ul.insertBefore(li, ul.children[0]);
```

<br>

### **<font color="#C2185">父元素对象.removeChild(): </font>**
删除子节点

更常用的方式:
子节点.parentNode.removeChild(子节点)

场景:
```js
    if(ul.children.length == 0) {
        this.disabled = true;
    } else {
        ul.removeChild('li')
    }
```

<br>

### **<font color="#C2185">父元素对象.replaceChild(新节点, 旧节点): </font>**
可以使用新子节点替换已有的子节点

<br>

### **<font color="#C2185">要克隆的节点.cloneNode(浅拷贝(false) / 深拷贝(true)): </font>**
这个方法返回调用该方法的节点的一个副本, 也成为克隆节点 / 拷贝节点

参数:
false: 浅拷贝 只复制节点本身 (参数为空相当于 false)
true : 深拷贝 复制节点里面的内容

```js
let ul = document.querySelector('ul');

let lili = ul.children[0].cloneNode(false / true);
ul.appendChild(lili);
```
    
<br>

# 获取和设置 节点属性: 

### **<font color="#C2185">元素对象.属性值: </font>**
获取内置属性值(元素本身自带的属性)
```html
    <div id='demo'></div>
    div.id
```

<br>

### **<font color="#C2185">元素对象.getAttribute('属性名'): </font>**
返回指定的属性值
```js
    元素对象.getAttribute('id');            // demo
    元素对象.getAttribute('自定义属性')
```

<br>

### **<font color="#C2185">元素对象.setAttribute('属性名', ‘属性值): </font>**
把指定属性设置或修改为指定的值, 可以获取自定义属性
ie8以及以下不支持该属性
```js
    元素对象.setAttribute('type', 'button');
```

<br>

### **<font color="#C2185">元素对象.setAttributeNode('class'): </font>**
在指定元素对象中设置属性

示例:
```js
// 1.创建属性 或者说 创建属性节点
let class = document.createAttribute('class');

// 2.在创建的属性中添加值
class.value/nodeValue = 'box1';

// 3.在指定元素对象内部 添加属性节点
元素对象.setAttributeNode('class')
```

**属性名才有value, 节点的话只能用innerHTML**

<br>

# JS自定义属性 data-
往HTML标签上添加自定义属性来存储和操作数据
自定义属性 是为了保存并使用数据, 有些数据可以保存到页面中而不用保存到数据库中

应用场景: 
比如京东左侧的导航栏 一组一组的有手机 有家用电器 有家具等等
这时我们再有东西需要放在一组一组的归类中, 那么怎么区分应该放到哪组里(是家具还是手机还是家用电器的) 这是时候我们就习惯用自定义属性来进行区分, 比如data-index='1' 

使用方式:
在标签内部加上自定义 *data-属性名 = '属性值'*
<div id="test" data-src='links/1.jpg'></div>


### **<font color="#C2185">读取data-属性值: </font>**
### **<font color="#C2185">节点.getAttribute('data-src');: </font>**
```js
    let box = document.querySelector('#test');
    let result = box.getAttribute('data-src');
    console.log(result);
```

### **<font color="#C2185">设置data-属性值: </font>**
### **<font color="#C2185">节点.setAttribute('data-src', 'value'): </font>**
```js
    let box = document.querySelector('#test');
    box.setAttribute('data-src', 'haha');
    console.log(box);
```

<br>

### **<font color="#C2185">使用 dataset Api获取data-属性: </font>**
data-前缀属性 可以在js中通过dataset取值更加方便

### **<font color="#C2185">读取: </font>**
### **<font color="#C2185">节点.dataset.属性名: </font>**

### **<font color="#C2185">赋值: </font>**
### **<font color="#C2185">节点.dataset.属性名 = '属性值': </font>**

\\ 驼峰式属性名 会被转换为 xxx-xxx的形式
```js
    box.dataset.otherName = 'otherValue'
    console.log(box);   // data-other-name="otherValue"
```


### **<font color="#C2185">删除: : </font>**
设置成null 或者 delete

### **<font color="#C2185">dom对象.dataset.属性名 = null;: </font>**
### **<font color="#C2185">delete dom对象.dataset.属性名;: </font>**


### **<font color="#C2185">jQ方法: </font>**
```js
let obj = $('obj');
console.log(obj.data('属性名'));
```

<br>

# 改变元素节点的内容

### **<font color="#C2185">元素对象.innerHTML: </font>**
起始位置到终止位置的全部内容, 包括html标签 同时保留空格和换行


### **<font color="#C2185">元素对象.innerText: </font>**
起始位置到终止位置的内容, 但它取出html标签, 同时空格和换行也会去掉


### **<font color="#C2185">区别: </font>**
innerText 不识别html标签, 写在里面的标签会会直接显示, 非标准
innerHTML 识别标签, w3c推荐

这两个属性是可读写的
<!-- 
    div.innerText = getDate();
    getDate()是我们封装的获取时间的函数, 里面return返回的是格式化好的日期
 -->

<br>

# 三种创建元素的区别
document.write()
element.innerHTML
document.createElement()

### **<font color="#C2185">document.write(): </font>**
这种方法是直接将内容写入页面的内容流, 但是文档流执行完毕 则它会导致页面的全部重绘
```js
document.write("<div>haha</div>")
```


### **<font color="#C2185">重绘: </font>**
文本流执行完毕 就是代码从上到下走了一遍, 重绘相当于创建了一个新页面 新页面里只有div
```js
    // 我们会经常 点击一个按钮后创建一个元素 如果使用这个方式会创建一个新页面
    btn.onclick = function() {
        document.write('<div>123</div>')
    }
```

### **<font color="#C2185">element.innerHTML: </font>**
这种方式是将内容写入某个dom节点 不会导致全部重绘
单个标签的话 innerHTML和createElement 性能没有太大的区别 当特别多的时候 这种方式很慢, 但结合数组的形式会快很多
```js
    元素对象.innerHTML = `<a>百度</a>`
```

结合数组的方式, 性能会更好
```js
    let arr = [];
    for(let i=0; i<100; i++){
        arr.push('<a>百度</a>');
    }
    元素对象.innerHTML = arr.join('');
```

### **<font color="#C2185">document.createElement(): </font>**
创建多个元素的效率稍微低一点点, 没有innerHTML数组性能好 但是结构更清晰
```js
    let a = document.createElement('a');
    元素对象.appendClild(a);
```

<br>

# 表单元素的属性操作
利用DOM可以操作如下表单元素的属性
type value checked selected disabled

如果想要某个表单被禁用, 不能再点击 disabled 

<!-- 
    let input = 
    input.value = 
 -->

<br>

# 设置 样式属性操作
我们可以通过js修改元素的大小, 颜色, 位置等样式

### **<font color="#C2185">元素对象.style: </font>**
通过style样式操作, 产生的是行内样式, css权重比较高
如果样式比较少 功能比较少的时候 可以用这个


### **<font color="#C2185">元素对象.className: </font>**
当样式比较多的时候, 功能复杂的时候 我们可以使用className这个方法
会覆盖原先的类名 为了避免覆盖 可以使用 += 
先定义一个类

<!-- 
    this.className = '原先的类名 类名'
 -->


### **<font color="#C2185">DOM classList属性: </font>**
该属性用于在元素中 添加 移除 及 切换 CSS 类. *该系列方法是对class的操作*
*ie10以上才支持 使用于移动端*

### **<font color="#C2185">只读: : </font>**
### **<font color="#C2185">元素对象.classList: </font>**
返回的是列表 伪数组的形式 可以通过索引号来获取

### **<font color="#C2185">添加: : </font>**
### **<font color="#C2185">元素对象.classList.add('类名'): </font>**
在元素中添加一个或多个类名.如果指定的类名已存在则不会添加

### **<font color="#C2185">删除: : </font>**
### **<font color="#C2185">元素对象.classList.remove('类名'): </font>**
移除元素中一个或多个类名.注意:  移除不存在的类名不会报错.
可以删除指定类名

### **<font color="#C2185">切换: : </font>**
### **<font color="#C2185">元素对象.classList.toggle("类名", [true|false]): </font>**
在元素中切换类名.
参数: 
    - 1. 要在元素中移除的类名并返回 false.如果该类名不存在则会在元素中添加类名并返回 true.
    - 2. true | false 可选参数是否强制添加或移除类不管该类名是否存在.

### **<font color="#C2185">判断: : </font>**
### **<font color="#C2185">元素对象.classList.contains(): </font>**
判断是否有这个类

<br>

# 获取 修改 对象的样式     

### **<font color="#C2185">修改 样式 --- (内联样式): </font>**
在js中 样式名 采用驼峰命名法

语法: 
    元素.style.样式名 = 样式值

<br>

### **<font color="#C2185">读取 样式 --- (内联样式): </font>**
通过style属性设置和读取都是内联样式 *无法读取样式表中的样式*
语法: 
    元素.style.样式名

通过style属性设置的样式都是内联样式 而内联样式有较高的优先级, 所以通过js修改的样式往往会立即显示, 但是如果在样式中写了!important则此时样式会有最高的优先级即使通过js也不能覆盖该样式, 此时将会导致js修改样式失效*所以尽量不要为样式添加!important*

<br>

### **<font color="#C2185">元素对象.currentStyle.样式名      (只有IE支持): </font>**
读取当前元素显示的样式: 
它可以用来读取当前元素正在显示的样式如果当前元素没有设置样式则获取它的默认值
currentStyle只有ie浏览器支持其他浏览器都不支持


### **<font color="#C2185">getComputedStyle(元素对象, null)    直接使用      带单位的: </font>**
在其他浏览器中可以使用
这个方法是window的方法*可以直接使用*支持ie9以上的浏览器

参数:
1. 要获取样式的元素
2. 可以传递一个伪元素 一般不用 一般传null
比如我们可以获取 before after 的属性值

```js
    let div = document.querySelector(".test")
    let target = getComputedStyle(div, "after")

    console.log(target.getPropertyValue("top"))
    // getPropertyValue方法用于获取css中给定属性的属性值
```

返回值:
对象, 对象中封装了当前元素对应的样式

可以通过:  *对象.样式名*  来读取样式
```js
    var obj = getComputedStyle(获取样式的元素, null);
    obj.width;

    // 或者

    getComputedStyle(获取样式的元素, null).width;
```

**注意:**
1. 如果获取的样式没有设置则会获取到*真实的值*而不是默认值
2. 没有设置width它不会获取auto而是一个长度

3. 但是该方法不支持ie8 以及以下浏览器 如果想兼容ie8 就的用
<!-- 
    box1.currentStyle.backgroundColor;
 -->
    
通过currentStyle 和 getComputedStyle()读取的样式都是只读的不能修改如果要修改必须通过style属性

<br>

### **<font color="#C2185">补充: </font>**
### **<font color="#C2185">节点.getPropertyValue("top"): </font>**
用于获取css中给定属性的属性值

<br>

### **<font color="#C2185">自定义 获取样式函数 : </font>**
```js
*  参数: 
*  obj 要获取样式的元素
*  name 要获取的样式名
* 
function getStyle(obj, name){

    // 先判断
    if(window.getComputedStyle){

        // 将指定的属性返回
        return getComputedStyle(obj, null)[name];

    // 兼容ie
    }else{
        return obj.currentStyle[name];
    }
};
```
这是第一次处理兼容性的问题思路都是一样的如果有就用... 没有就用...


### **<font color="#C2185">复制用: </font>**
```js
function getStyle(obj, name){
    if(window.getComputedStyle){
        return getComputedStyle(obj, null)[name];
    }else{
        return obj.currentStyle[name];
    }
};
```

<br>

# 事件

### **<font color="#C2185">基础: </font>**
js使我们有能力创建动态页面, 而事件是可以被js侦测到的行为
简单的理解: 触发 --- 响应 的机制

事件是有三部分组成的 事件源 事件类型 事件处理程序 这就是事件三要素

事件源:   事件被触发的对象
事件类型: 如果触发 什么时间
处理程序: 通过一个函数赋值的方式完成


### **<font color="#C2185">注册事件: </font>**
注册事件有两种方式: 传统方式 和 方法监听注册方式


### **<font color="#C2185">传统注册方式: </font>**
利用 on 开头的事件 如:  onclick
这种方式的注册事件 具有 唯一性

传统注册方式的特点:
同一个元素同一个事件只能设置一个处理函数, 最后注册的处理函数将会覆盖前面注册的处理函数

<br>

### **<font color="#C2185">addEventListener 方法监听注册方式: </font>**
w3c推荐的方式

### **<font color="#C2185">元素对象.addEventListener() 移动端开发使用比较多: </font>**
ie9之前不支持此方法, 可使用 attachEvent() 代替

参数:
type: 
    事件类型字符串, 比如click mousever 不要 on

listener: 
    事件处理函数, 事件发生时, 会调用该监听函数

useCapture: 
    可选参数 默认false

同一个元素 同一个事件可以添加多个监听器 依次触发

```js
    let div
    div.addEventListener('click', fn)
    div.addEventListener('mouseover', fn)
    div.addEventListener('mouseout', fn)
```


### **<font color="#C2185">事件的解绑 解绑方式: </font>**
### **<font color="#C2185">传统方式: </font>**

eventTarget.onclick = null

在回调函数内部解绑
```js
    btn.onclick = function() {
        alert(1);
        btn.onclick = null
    }
```


### **<font color="#C2185">addEventListener 解绑方式: </font>**
### **<font color="#C2185">元素对象.removeEventListener()   解绑事件: </font>**

### **<font color="#C2185">1. 把 回调函数 提取出来: </font>**
```js
    document.body.addEventListener('mousemove', default, false);
    document.body.removeEventListener('mousemove', default, false);

    function default(){  };

    // 另一种写法
    btn.addEventListener('click', fn);

    function fn() {
        alert(2);
        btn.removeEventListener('click', fn)
    }
 ```

### **<font color="#C2185">元素对象.attachEvent(): </font>**
### **<font color="#C2185">元素对象.detachEvent(eventName, callback): </font>**
解绑的写法跟addEventListener一样

<br>

### **<font color="#C2185">addEventListener 取消默认行为: </font>**
利用 event 事件对象来完成

### **<font color="#C2185">event.preventDefault(): </font>**
使用addEventListener()绑定的事件 取消默认行为时不能用return false而是使用event.preventDefault()
```js
    document.body.addEventListener('mousemove', function (event) {
        event.preventDefault();
    },false);
```


### **<font color="#C2185">attachEvent() ie9以下 绑定多个事件的方式: </font>**
### **<font color="#C2185">元素对象.attachEvent();: </font>**
在IE8中可以使用attachEvent()来绑定事件
MDN不推荐使用

参数
1. 事件的字符串要on
2. 回调函数

这个方法也可以同时为一个时间绑定多个处理函数 不同的是它是后绑定先执行执行顺序和addEventListener()相反

```js
    btn01.attachEvent("onclick", function(){...});
```

<br>

**注意: attachEvent 中的this**
```js
    btn01.addEventListener("click", function(){
        alert(this);
    },false);                  //btn01

    // attachEvent() 是window
    btn01.attachEvent("onclick", function(){
        alert(this)
    });                        //window
```

addEventListener()中的this是绑定事件的对象
attachEvent()中的this是window


### **<font color="#C2185">自定义函数 绑定事件 兼容ie9以下: </font>**

参数: 
    obj 要绑定事件的对象
    eventStr 要绑定哪个事件(不要on)
    callback 回调函数

```js
    function bind(obj, eventStr, callback){ ... };
```

思路:
attachEvent 要on
addEventListener不要on

那传eventName的时候传不传on, 加上on容易还是去掉on容易 加上on容易吧, 所以这个地方我不要on 那么就有问题了 那ie8不就少个on么？ 所以在ie8那手动加一个 

判断obj里是否有addEventListener()这个方法 如有有的话就用它没有的话用另一个没必要去判断什么浏览器 

### **<font color="#C2185">解决this问题: </font>**
返回来再看this的问题, ie8里是window
就意味着你在这里就不能用this了 因为不一样了 一个是btn01 一个是window 容易出问题 

我希望统一this 是btn 是被点击的对象 是obj, 我们想想this是谁 是不是由调用方式来决定的, ie8是window那么肯定底层是采用函数形式调用的

那既然是调用方式决定的 那我们只能去改函数的调用方式吧, 函数是谁调的呢？
可以这个函数是浏览器调用的 我们还控制不了, 要是能控制的话 怎么改 call()修改函数的this

    callback.call(obj); 

现在callback是浏览器调用的我不让浏览器调我希望把调用回调函数的权利拿回来怎么拿回来

```js
function bind(obj, eventStr, callback){

    if(obj.addEventListener){
        obj.addEventListener(eventStr,callback,false);
    }else{
        // 没有解决 this 问题
        obj.attachEvent("on"+eventStr,callback);

        // 解决 this 问题
        obj.attachEvent("on"+eventStr,function(){
            callback.call(obj);
        });
    }
};

bind(btn01, "click", function(){
    alert("1");
});
```


```js
    // 分别为三个div绑定 单击响应函数
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    var box3 = document.getElementById("box3");

    bind(box1, "click", function(){
        alert("我是box1的响应函数");
    });
    bind(box2, "click", function(){
        alert("我是box2的响应函数");
    });
    bind(box3, "click", function(){
        alert("我是box3的响应函数");
    });

    // 自定义绑定事件
    function bind(obj, eventStr, callback){
        if(obj.addEventListener){
            obj.addEventListener(eventStr,callback,false);
        }else{
            obj.attachEvent("on"+eventStr,function(){
            callback.call(obj);
        });
    };
```

<br>

# 常用的事件
### **<font color="#C2185">onfocus   获得焦点: </font>**
### **<font color="#C2185">onblur    失去焦点: </font>**

<br>

### **<font color="#C2185">onscroll: </font>**
该事件会在元素的滚动条滚动时触发

<br>

### **<font color="#C2185">onmousemove: </font>**
该事件将会在鼠标在元素中移动时被触发

<br>

### **<font color="#C2185">onmousedown: </font>**
### **<font color="#C2185">onmouseup: </font>**

<br>

### **<font color="#C2185">onmouseover: </font>**
### **<font color="#C2185">onmouseout: </font>**
会冒泡

<br>

### **<font color="#C2185">onmouseenter: </font>**
### **<font color="#C2185">onmouseleave: </font>**
不会冒泡

<br>

### **<font color="#C2185">contextmenu: </font>**
弹出右键菜单时触发该回调
给document绑定

主要控制应该何时显示上下文菜单, 主要用于程序员取消默认的上下文菜单
比如鼠标的右键菜单
```js
    // 禁止鼠标右键菜单

    document.addEventListener('contextmenu', function(e){
        e.preventDefault();
    })
```

<br>

### **<font color="#C2185">selectstart    : </font>**
这个事件会在选中文字后触发
点击也有效果
```js
    // 禁止鼠标选中

    document.addEventListener('selectstart', function(e){
        e.preventDefault();
    })
```

<br>

### **<font color="#C2185">input 常用的事件: </font>**
### **<font color="#C2185">onchange      当状态被改变时会触发: </font>**
### **<font color="#C2185">oninput       当input的value值发生变化时就会触发: </font>**
与onchange的区别是不用等到失去焦点就可以触发了

### **<font color="#C2185">onselect      当input里的内容文本被选中后执行只要选择了就会触发不是全部选中: </font>**

<br>

### **<font color="#C2185">常用的键盘事件: </font>**
### **<font color="#C2185">onkeyup: </font>**
某个键盘按键被松开时触发

### **<font color="#C2185">onkeydown: </font>**
某个键盘按键被按下时触发
对于onkeydown来说如果一直按着某个按键不松手则事件一直触发
<!-- 
    当onkeydown连续触发时第一次和第二次之间会卡顿一下之后会连续触发非常快为了防止误操作的发生
 -->

### **<font color="#C2185">onkeypress: </font>**
某个键盘按键被按下时触发, 但是它不识别功能键, 比如ctrl shift 箭头等
区分按下键的大小写

<!-- 
    三个事件的执行顺序, keydown --- keypress --- keyup

    keydown 和 keyup 不区分大小写
    keypress 区分大小写
 -->

**注意:**
键盘事件一般都要绑定给一些可以获取到焦点的对象或者是document 文档对象 一般是表单项 或者 document 
比如鼠标插入了一个文本框 有光标在闪 这就叫做获取到了焦点在文本框再点下光标没了叫做失去焦点

<br>

# onmouseover 和 onmouseenter的区别
当鼠标移动到元素上时, 就会触发mouseenter事件

### **<font color="#C2185">onmouseover 给父盒子绑定mouseover事件 经过父盒子会触发(正常), 经过父盒子里面的子盒子也会触发事件: </font>**

mouseover 鼠标经过自身盒子会触发, 经过子盒子还会触发
<!-- 
    鼠标移动到子盒子上 得到鼠标经过, 但是没有事件 所以会往上冒泡
    冒泡 是 沿着 dom树 子 往 父上冒
 -->

mouseenter 只会经过自身盒子触发

### **<font color="#C2185">原因: </font>**
mouseenter mouseleave不会冒泡

<br>

# 滚轮事件
### **<font color="#C2185">onmousewheel: </font>**
鼠标滚轮滚动事件会在滚轮滚动时触发
但火狐不支持该属性

### **<font color="#C2185">DOMMouseScroll: </font>**
在火狐中需要使用 DOMMouseScroll 来绑定滚动事件
注意该事件 需要用addEventListener()函数来绑定


### **<font color="#C2185">滚轮事件中的事件对象: </font>**
### **<font color="#C2185">event.wheelDelta: </font>**
可以获取鼠标滚轮滚动的方向
向上 值为120
向下 值为-120     我们不看值的大小只看正负
但是火狐不支持

    event.wheelDelta;
    alert(event.wheelDelta);


### **<font color="#C2185">event.detail      火狐 特殊: </font>**
在火狐中 可以获取鼠标滚轮滚动的方向
向上 值为-3
向下 值为3

    event.detail;
    
```js    
    document.addEventListener("mousewheel", wheel)
    function wheel(e) {
      let flag;

      if(e.wheelDelta < 0 || e.detail > 0) {
        flag = "down"
      } else {
        flag = "up"
      }

      switch(flag) {
        case "up":
          console.log("我往上滚啦")
          break
        case "down":
          console.log("我往下滚啦")
          break
      }
    }
```

<br>

# 滚动窗口至文档中的特定位置

### **<font color="#C2185">window.scroll(x, y);: </font>**
可以让窗口的滚动到指定位置
不用加单位 直接写数字即可

    window.scroll(0, 100)

<br>

# 排他思想
如果有同一组元素, 我们想要某一个元素实现某种样式, 需要用到循环的排他思想算法
把所有的去掉要用for循环去 而不是直接写btns[i]
排他其他人, 设置自己的样式
```js 
    for(let i=0; i<btns.length; i++) {
        btns[i].onclick = function() {
            // 排他
            for(let i=0; i<btns.length; i++){
                btns[i].style.backgroundColor = '';
            }

            // 设置自己的样式
            this.style.backgroundColor = 'pink'
        }
    }
```

<br>

# 案例 百度换肤
这个案例联系的是给一组元素注册事件
给4个小图片利用循环注册点击事件
当我们点击了这个图片, 让我们页面背景改为当前图片
核心算法 把当前图片的src路径取过来 给body做为背景

```js
    document.body.style.backgroundImage = 'url('+this.src+')'
```

<br>

# 案例 表单全选取消全选
### **<font color="#C2185">全选和取消全选: : </font>**
让下面的所有复选框的checked属性 跟随 全选按钮即可

1. 给全选按钮绑定事件
2. 将所有的复选框的checked属性值 跟 全选按钮的checked属性值一致
```js
    j_tbs[i].checked = this.checked
```

### **<font color="#C2185">复选框全部选中 全选才能选中: </font>**
思路:
给下面所有复选框绑定点击事件, 每次点击, 都要循环查看下面所有的复选框是否有没选中的, 如果有一个没选中的 上面全选就不选中

可以设置一个变量 来控制全选是否选中
```js
    for(let i=0; i<j_tbs.length; i++) {

        // 给所有复选框绑定事件
        j_tbs[i].onclick = function() {

            // 声明一个变量 默认是选中状态
            let flag = ture;

            for(let i=0; i<j_tbs.length; i++) {

                // 一上来都是没选中的 所以取反
                if(!j_tbs[i].checked) {         
                    flag = flase;
                    break;
                }
            }

            // 检查完毕后
            j_cbAll.checked = flag;
        }
    }
```

方式2:
```html
<div>
  全选按钮: <input type="checkbox" id="all">
</div>
<div>
  <ul>
    <li><input type="checkbox" value="xuegao">雪糕</li>
    <li><input type="checkbox" value="binqilin">冰淇淋</li>
    <li><input type="checkbox" value="binggao">冰糕</li>
  </ul>
</div>

<script>
let ul = document.querySelector("ul")
let checkbox = document.querySelectorAll("[type='checkbox']")
let all = document.querySelector("#all")

let total = ul.querySelectorAll("[type='checkbox']")

checkbox.forEach(el => {
  el.addEventListener("click", function() {
    let checkeds = ul.querySelectorAll(":checked")
    all.checked = checkeds.length == total.length
  })
})
</script>
```

<br>

# 案例: 分时显示不同图片, 显示不同的问候语
根据不同时间, 页面显示不同图片, 同时显示不同的问候语

需求:
如果上午打开页面, 显示上午好, 显示上午的图片
如果下午打开页面, 显示下午好, 显示下午的图片
...

分析:
根据系统不同时间判断, 所以需要用到日期内置对象
利用多分支语句设置不同的图片

需要一个图片, 并且根据时间修改图片 操作元素的src属性
需要一个div元素 显示不同的问候语, 修改元素内容即可

```js
    let date = new Date();
    let h = date.getHours();

    if(h<12) {
        img.src = 
        div.innerHTML = 

    }else if (h < 18) {
        img.src = 
        div.innerHTML = 
    }
```

<br>

# 点击切换图片练习
```html
    
<body>
    <p id="info">一共 5 张图片当前第 1 张</p>
    <div id="outer">
        <img src="./links/1.jpg" alt="">
        <button id="prev">上一张</button>
        <button id="next">下一张</button>
    </div>
</body> 

<script>
window.onload = function(){
    // 获取 按钮
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");

    // 保存 图片路径
    var imgArr = [
        "links/1.jpg",
        "links/2.jpg",
        "links/3.jpg",
        "links/4.jpg",
        "links/5.jpg"
    ];

    // 保存当前正在显示的图片的索引, 因为默认显示的是第一个
    var index = 0;

    // 获取 img 标签
    var img = document.getElementsByTagName("img");

    // 使用上面的方式获取 img 的话 需要添加[0]
    var img = document.getElementsByTagName("img")[0];
            
    prev.onclick = function(){
        // 点击 上一张按钮的时候 index--
        index--;

        // 边界判断
        if(index < 0){
            index = 0;
        };

        // 根据index设置 img src 属性
        img.src = imgArr[index];
    };

    next.onclick = function(){
        // 切换到下一张 是index自增
        index++;

        // 边界判断
        if(index > imgArr.length-1){
            index = imgArr.length-1;
        };
        
        img.src = imgArr[index];
    };
    
}
<script>
```

<br>

# 循环中 事件回调 [i] 的问题
```js 
var delbtn = document.getElementsByTagName("a");
    for(var i=0; i<delbtn.length; i++){
        delbtn[i].onclick = delA;
    }
```

delbtn[i] 是undifined 为什么？

### **<font color="#C2185">解答: </font>**
因为for循环会在页面加载完成之后立即执行而响应函数是在超链接点击时被执行
for循环先执行响应函数后执行, 当响应函数执行时for循环早已执行完毕

for循环是从0开始的 ++ 变成1 再++变成2 再++变成3 3是不是小于allA.length的长度了, 所以不执行了, 也就是说当for循环停止时 i是3, 所以响应函数能看到的i是3 

<br>

# DOM事件流
事件流 描述的是从页面中接受事件的顺序

事件发生时会在元素节点之间按照特定的顺序传播, 这个传播的过程就是DOM事件流

事件传播的过程
DOM事件流分为3个阶段

**注意:**
js代码中只能执行捕获或者冒泡其中的一个阶段

    捕获阶段
    目标阶段
    冒泡阶段

onclick(传统事件) 和 attachEvent 只能得到冒泡阶段


### **<font color="#C2185">事件的传播: </font>**
关于事件的传播 网景公司和微软公司有不同的理解

### **<font color="#C2185">微软公司: </font>**
事件应该是由内向外传播 也就是当事件触发时应该先触发当前元素上的事件然后再向当前元素的祖先元素上传播  --- 事件的冒泡

### **<font color="#C2185">网景公司: </font>**
时间应该是由外向内传播也就是当事件触发时, 应该先触发当前元素的最外层的祖先元素的事件然后再向内传播给后代元素  --- 捕获阶段

### **<font color="#C2185">w3c: </font>**
综合了两个公司的方案将事件的传播分成了三个阶段

>> 第一阶段:  事件的捕获阶段
    在捕获阶段时从最外层的祖先元素从window向目标元素进行事件的捕获 但是默认此时不会触发事件

>> 第二阶段: 目标阶段
    事件捕获到目标捕获结束后开始在目标元素上执行事件 或者说 是触发事件    中间阶段执行 冒泡往上走

>> 第三阶段: 冒泡阶段
    事件从目标元素向他的祖先元素传递依次触发祖先元素上的事件

假如我希望在*捕获阶段就开始执行* 可以将addEventListener()的第三个参数设置为true
一般情况下我们不会希望在捕获阶段触发事件 很少传true

**ie8 以及浏览器 没有捕获阶段**

<br>

# 事件的冒泡
所谓的冒泡指的就是事件的向上传导当后代元素上的事件被触发时其祖先元素的相同事件也会被触发

在开发中大部分情况都是非常有用的 如果不希望事件的冒泡 可以通过事件对象来取消冒泡

### **<font color="#C2185">取消冒泡 event.cancelBubble = true;: </font>**
可以将事件对象的cancelBubble设置为true即可取消冒泡;

    event.cancelBubble = true;

要取消冒泡 就要在对应的响应函数里 先传递一个形参event
```js
// 兼容性要event = event || window.event;
window.onload = function(){

    // 为s1绑定点击响应函数
    var s1 = document.getElementById("s1");

    s1.onclick = function(){
        alert("我是s1的单击响应函数");
    };

    // 为box1绑定点击响应函数
    var nox1 = document.getElementById("box1");
    box1.onclick = function(){
        alert("我是div的单击响应函数");
    };

    // 为body绑定点击响应函数
    document.body.onclick=function(){
        alert("我是body的单击响应函数");
    };
};
```

我现在给div span body都绑定了点击响应函数那它们三个是什么关系 祖先 后代吧
我现在点击span文字上发现分别出现了
    我是s1的单击响应函数
    我是div的单击响应函数
    我是body的单击响应函数

这种情况就叫做事件的冒泡

<br>

# 事件委派 ---- 冒泡的应用
指将事件统一绑定给元素的共同的祖先元素这样当后代元素上的事件触发时会一直冒泡到祖先元素, 从而通过祖先元素的响应函数 来 处理事件

事件的委派是利用了冒泡 通过委派可以减少事件绑定的次数提高程序的性能 

解析: 
我点击的是li, 但这个点击这个操作会冒泡到ul上, 档ul上有点击事件的时候就会触发


### **<font color="#C2185">event.target: </font>**
返回触发此事件的元素(事件的目标节点)

### **<font color="#C2185">要点: </font>**
利用 event.target 来判断 点击 目标节点的时候 才触发对应的是回调
```js
    // 方式1: className
    if(event.target.className=="link"){
        alert("看看效果");
    }
```

解析案例:
```js
    window.onload=function(){

    // 点击按钮以后添加超链接 先获取按钮并为按钮绑定点击响应函数
    var btn01 = document.getElementById("btn01");
    var u1 = document.getELemengtById("u1");

    // 给按钮绑定事件
    btn01.onclick = function(){

        // 创建一个li
        var li = document.createElement("li");
        // 设置 li 里面的内容 新加进去的超链接 没有点击响应函数 
        li.innerHTML = "<a href='javascript:;' class='link'>新建的超链接<a>"

        // 将li添加到ul中需要先在外面获取到一个ul
        u1.appendChild(li);      
    };

/*
    为每一个超链接都绑定点击响应函数
    思考: 
    这里我们为每一个超链接都绑定了单击响应函数这种操作比较麻烦 而且这些操作 只能为已有的超链接设置事件而新添加的超链接必须重新绑定 麻烦 而且 性能不好

    我们希望只绑定一次事件 即可应用到所有的元素 多个元素上即使元素时候添加的我们可以尝试将其绑定给共同的祖先元素

    那超链接共同的祖先元素是谁？ 不是li a各有各的li 应该是ul吧  

    推荐使用: 
    为ul绑定单击响应函数
*/

/*
    思考:
    如果我们给父元素绑定事件 那么点击ul的区域都会触发回调
    如果触发事件的对象是期望的元素 就执行 否则不执行

    要判断
    那要先干什么得知道事件是由谁触发的吧
    那this行不行以前说过 事件给谁绑定的this就是谁, 所以绑定给ul this只能是ul 没办法通过this去判断触发的是谁

    事件对象知道
    event.target
        - 返回触发此事件的元素(事件的目标节点)
        - event中的target表示触发事件的对象
*/

    // 给 他们的父元素绑定事件  -- 事件委派
    u1.onclick = function(event){
    
        // 考虑 兼容性
        event = event || window.event;

        // 如果触发事件的对象是期望的元素 就执行 否则不执行
        if(event.target.className=="link"){
            alert("看看效果");
        }
    }
}
```

<br>

# JS的执行机制

### **<font color="#C2185">js是单线程: </font>**
js语言的一大特点就是单线程, 也就是说, 同一个事件只能做一件事, 这是因为js这门脚本语言诞生的使命所致, js是为了处理页面中的用户的交互, 以及操作DOM而诞生的

比如我们对某个DOM进行添加和删除操作, 不能同时进行, 应该先进行添加, 之后再删除 要不这个代码还没有呢 怎么删


### **<font color="#C2185">单线程就意味着: </font>**
所有任务需要排队 前一个任务结束, 才会执行后一个任务, 这样所导致的问题是: 
如果某一个js代码执行的时间过长, 后面的代码就需要排队, 等好长时间 这样就会造成页面的渲染不连贯, 导致页面渲染加载阻塞的感觉


### **<font color="#C2185">同步 异步: </font>**
为了解决前一个代码执行完 才能 执行后一段代码的问题, 我们利用了多核cpu的计算能力, HTML5提出了web worker标准, 允许js脚本创建多个线程, 于是js中出现了同步和异步

### **<font color="#C2185">同步: </font>**
前一个任务结束后再执行后一个任务, 程序的执行顺序与任务的排列顺序是一致的, 同步的
比如: 做饭的同步做法, 我要烧水煮饭, 等水开了(10分钟) 再去切菜 炒菜

### **<font color="#C2185">异步: </font>**
在做一件事情的时候, 因为这件事情会花费很长时间, 在做这件事的同时, 你还可以去处理其他的事情, 比如做饭的异步做法, 我们在烧水的同时, 利用这10分钟去切菜 炒菜

### **<font color="#C2185">总结: : </font>**
本质区别就是 这条流水线上各个流程的执行顺序不同 


js为了解决排队或者等待时间较长的问题 把我们的任务分为了两大类

### **<font color="#C2185">同步任务: </font>**
同步任务都在*主线程上执行*, 形成一个执行栈

### **<font color="#C2185">异步任务: </font>**
js的异步是通过回调函数实现的
异步任务相关的回调函数 添加到 *任务队列*中(任务队列也成为消息队列)

常见的异步任务
普通事件,     onclick
资源加载,     load error
定时器,       setInterval


```js 
    console.log(1);

    setTimeout(function(){
        console.log(2);
    }, 0);

    console.log(3);
```

    执行栈                      任务队列        
    console.log(1)             function(){ console.log(3) }

    setTimeout(fn, 0)     ↗

    console.log(3)


### **<font color="#C2185">js的执行顺序: </font>**
先执行 执行栈中的同步任务
异步任务(回调函数)先放到 任务队列中 先不执行

一旦执行栈中的所有同步任务执行完毕, 系统就会按次序读取任务队列中的异步任务, 于是被读取的异步任务结束等待状态, 进行执行栈(放入执行栈的下方代码的后面), 开始执行
<!-- 
    任务队列有点像应急车道
    执行栈有点像主车道
 -->
 
<br>

# 事件对象
当事件的响应函数被触发时浏览器每次都会将一个事件对象作为实参传递进响应函数 event

event就是一个事件对象, 写到我们监听函数的小括号里面 当形参来看

事件对象 
    只有有了事件才会存在
事件对象 
    是我们事件的一系列相关数据的集合

在事件对象中封装了当前事件相关的一切信息
比如: 鼠标的坐标键盘哪个案件被按下鼠标滚轮滚动的方向

事件的响应函数都是被浏览器调用的
所以以后想知道事件的相关信息或者对事件进行相关的操作 都找event DOM事件
事件对象也有兼容性问题, ie 678 通过window.event

### **<font color="#C2185">使用事件对象时, e = e || window.event: </font>**

<br>

# 事件对象的属性 和 方法

### **<font color="#C2185">event.target的兼容性处理: </font>**
```js
    event = event || window.event
    let target = event.target || event.SRCElement;
```

### **<font color="#C2185">阻止事件冒泡的兼容性处理: </font>**
```js
    if(event && event.stopPropagation) {
        event.stopPropagation();
    } else {
        window.event.cancleBubble = true;
    }
```

### **<font color="#C2185">event.target: </font>**
返回触发事件的对象            标准

### **<font color="#C2185">event.srcElement: </font>**
返回触发事件的对象            非标准 ie678使用

### **<font color="#C2185">event.type: </font>**
返回事件的类型, 比如click 不带on

### **<font color="#C2185">event.stopPropagation(): </font>**
阻止冒泡                      标准
有兼容性的问题 ie678要使用cancleBubble
<!-- 
    event.stopPropagation();
    event.cancleBubble = true;
 -->

### **<font color="#C2185">event.cancelBubble: </font>**
该属性阻止冒泡                非标准 ie678使用

### **<font color="#C2185">event.preventDefault(): </font>**
该方法阻止事件(默认行为)      标准 比如 不让链接跳转

### **<font color="#C2185">event.returnValue: </font>**
该属性阻止默认事件(默认行为)  非标准 ie678使用 比如 不让链接跳转

<br>

# 鼠标事件对象
### **<font color="#C2185">event.clientX     不包括滚动区域: </font>**
### **<font color="#C2185">event.clientY: </font>**
可以获取 鼠标在 *可见窗口内的* 水平 和 垂直 坐标
它不管页面拖不拖动(滚动条) 就是相对于 可见窗口 的坐标

<br>

### **<font color="#C2185">event.pageX       包括滚动区域: </font>**
### **<font color="#C2185">event.pageY: </font>**
可以获取鼠标相对于 当前文档页面的 坐标 *包括滚动区域*
但是这两个属性在ie8中不支持所以如果需要兼容ie678 则不要使用

比如:
可视窗口就是 height: 500px 但文档 height: 2000px 
pageY: 就能获取到 700的坐标

<br>

### **<font color="#C2185">event.screenX: </font>**
### **<font color="#C2185">event.screenY: </font>**
返回鼠标相对于电脑屏幕的X坐标
返回鼠标相对于电脑屏幕的Y坐标

<br>

# 键盘事件对象
### **<font color="#C2185">event.keyCode: </font>**
返回相应的键的ASCII值

注意:
我们的keyup和keydown事件不区分字母大小写 a 和 A得到的都是65

### **<font color="#C2185">event.altKey: </font>**
### **<font color="#C2185">event.ctrlKey: </font>**
### **<font color="#C2185">event.shiftKey: </font>**
这三个用来判断alt ctrl shift是否被按下 
    如果按下则返回true 
    没有按下返回false

```js
    document.onkeyup = function(event){
        event = event || window.event;
        
        // 判断一个y键是否按下
        if(event.KeyCode === 89){
            console.log("y被按下了");
        }

        // 判断y和ctrl是否同时被按下
        if(event.KeyCode ===89 && event.ctrlKey){
            console.log("ctrl+y被按下了");
        }
    }
```

以下是给input绑定的
```js
    var input = document.getElementsByTagName("input")[0];
    input.onkeydown = function(){

        // 取消默认行为
        // 在文本框中输入内容属于onkeydown的默认行为
        // 如果使用return false取消默认行为 则输入的文本不会在文本框中
        return false; 
    };
```

### **<font color="#C2185">需求:  在文本框中不能输入数字: </font>**
思路:
先判断用户输入的是什么得问event吧, 我们先看看数字的编码是多少 48 - 57 

    0 - 9 :      48 - 57
    L T R X :    37 - 40
    a - z :      65 - 90

```js
input.onkeydown = function(event) {
    event = event || window.event;
        if(event.keyCode >=48 && event.keyCode <=57){
        return false; 
    }
}
```

<br>

# this 和 event.target
### **<font color="#C2185">this      : </font>**
返回的是绑定事件的对象
### **<font color="#C2185">target    : </font>**
返回的是触发事件的对象  点击了哪个元素就返回哪个元素

比如:
    | - div
        |  - span

我们给div绑定事件 this就是div
但是 target 
    我点div的时候 target是div 
    我点span的时候 target就是span
```html
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
<script>

    let ul = document.querySelector('ul');
    ul.addEventListener('click', function(evnet){

        // this 是 ul, 绑定事件的对象
        console.log(this)

        // target 是触发事件的对象 比如我点的是li
        console.log(event.target)
    })
</script>
```

### **<font color="#C2185">event.currentTarget: </font>**
事件绑定给谁 currentTarget就是谁 某种程度上和this一样

兼容性:
 ie678不支持

<br>

# PC端的特有

# 元素偏移量 offset 系列
offset翻译过来就是偏移量 我们使用offset系列相关属性
1. 可以获取 目标元素的位置 大小等
2. 可以获取 目标元素距离带有定位父元素的位置
3. 可以获取 元素自身的大小(宽度 高度)

**注意返回的数值都不带单位**

<br>

### **<font color="#C2185">offset系列常见的属性: </font>**

示例:
```html
<div id="all">
  all
  <div class="outer">
    outer
    <div class="inner">inner</div>
  </div>
</div>
```

### **<font color="#C2185">元素对象.offsetParent: </font>**
获取当前元素的定位父元素
会获取到当前元素最近的开启了定位的祖先元素 
如果所有的祖先元素都没有开启定位 则返回body


### **<font color="#C2185">元素对象.offsetParent 和 元素对象.parentNode 的区别: </font>**
元素对象.parentNode
    返回的是亲爸爸 不管父亲有没有定位

元素对象.offsetParent
    返回的是带有定位的父亲 父级没有定位 就向上查找, 直到找到body

<br>

### **<font color="#C2185">元素对象.offsetTop: </font>**
获取当前元素 相对于 其定位父元素 的 垂直偏移量
### **<font color="#C2185">元素对象.offsetLeft: </font>**
获取当前元素 相对于 其定位父元素 的 水平偏移量

如果父元素都没有开启定位 则相对于body


<br>

**offsetLeft 搭配 translate()时候的注意点:**  
offsetLeft可以理解为获取的是 left 的值 比如 left: 200px 那么获取的就是200  
```css
el {
  left: 300px;
}
```

但是我们的位置可能是由 ``transform: translate(-50%, -50%);`` 计算出来的
```css
el {
  width: 200px;
  left: 300px;
  transform: translateX(-50%);
}
```

我们预期是 300px - 100px(元素的一半) 200px 但是实际上我们获取的还是 left: 300px 的值

<br>

### **<font color="#C2185">元素对象.offsetWidth: </font>**
### **<font color="#C2185">元素对象.offsetHeight: </font>**
获取元素 整个宽度和高度 包括 
    内容区
    内边距
    边框
    滚动条的位置

```js
console.log(e.target.offsetHeight)
// 内容区 + padding + border = 232 + 30x2 + 2x2 = 296
```

<br>

# 元素偏移量 client 系列
client翻译过来就是客户端的意思, 我们使用client系列的相关属性来*获取元素可视区的相关信息*, 通过client系列的相关属性可以动态的得到该元素的边框大小, 元素大小等

### **<font color="#C2185">元素对象.clientWith: </font>**
### **<font color="#C2185">元素对象.clientHeight  可见框的大小: </font>**
这两个属性 *获取见框的宽度和高度*

会获取元素的宽度和高度 包括: 
    内容区
    内边距 
    *不包括边框*
    *不包括滚动条*

**注意:**
这些属性都是只读的 不能修改 改只有一种方式 就是用Style属性(以下通用)
如果有滚动条的话会刨除滚动条的位置注意是可见框的大小

<br>

### **<font color="#C2185">元素对象.clientTop: </font>**
返回元素上边框的大小(border的高度)

### **<font color="#C2185">元素对象.clientLeft: </font>**
返回元素左边框的大小(border的高度)
<!-- 上面的很少去用 -->

<br>

# offset 和 style 区别
这两种都能得到元素的大小等属性 区别是什么?

### **<font color="#C2185">offset 角度: </font>**
offset可以得到任意样式表中的样式值
offset系列可以获得的数值是没有单位的
offsetWidth 包含padding border width
offsetWidth 等属性是只读属性 只能获取不能赋值
<!-- 
    所以我们想要获取元素大小位置 用offset更合适 
-->

### **<font color="#C2185">style 角度: </font>**
style只能得到行内样式表中的样式值
style.width 获得的是带有单位的字符串
style.width 获得不包含padding 和 border的值
style.width 是可读可写属性, 可以获取也可以赋值
<!-- 
    所以我们想要给元素更改值 则需要用style改变 
-->

<br>

# 元素 scroll 系列
跟滚动条相关的

### **<font color="#C2185">元素对象.scrollWidth: </font>**
元素的实际大小(包含超出部分), 获取滚动区域的宽度, 不含边框

### **<font color="#C2185">元素对象.scrollHeight: </font>**
元素的实际大小(包含超出部分), 获取滚动区域的高度, 不含边框
```js
    alert(box4.clientHeight);   //300 可见的高度
    alert(box4.scrollHeight);   //600 可以获得整个滚动区域的高度
```
            
### **<font color="#C2185">元素对象.scrollLeft: </font>**
可以获取水平滚动条*滚动的距离*, 被卷进去的左侧距离

### **<font color="#C2185">元素对象.scrollTop: </font>**
可以获取垂直滚动条*滚动的距离*, 被卷进去的上侧距离
```js
    alert(box4.clientHeight);       //283
    alert(box4.scrollHeight);       //600

    alert(box4.scrollTop);          //没往下滚动的时候是0

    // 当垂直滚动条到底时
    alert(box4.scrollHeight - box4.scrollTop)       //283
```

### **<font color="#C2185">当满足 scrollHeight - scrollTop == clientHeight: </font>**
说明垂直滚动条 滚动到底了
滚动区的整体高度(元素的实际高度) - 滚动的距离 = 可见框高度

### **<font color="#C2185">当满足scrollWidth - scrollLeft == clientWidth: </font>**
说明水平滚动条 滚动到底了

场景:
有的时候上网会要注册注册时候会有一堆的条款让你去读 下面有个√ 它要确保你阅读协议了 才让你注册 什么时候才能注册呢当滚动条滚动到底了 就视为你阅读完了 才让你注册

<br>

# window.pageYOffset 页面被卷进去的距离

### **<font color="#C2185">window.pageYOffset / pageYOffset: </font>**
### **<font color="#C2185">window.pageXOffset / pageXOffset: </font>**
这两个属性 可以获取 页面被卷去了多少

*设置*或返回当前页面相对于窗口显示区左上角的 X 位置.
*设置*或返回当前页面相对于窗口显示区左上角的 Y 位置.

页面被卷去的头部(scrollTop) 可以通过window.pageYOffset获得
页面被卷去的左侧 可以通过window.pageXOffset 获得

**注意:**
*元素的内容*被卷进去多少是 *ele.scrollTop*获取的, 比如是某个盒子被卷进去多少
如果是*页面*被卷进去多少则是 *window.pageYOffset*


### **<font color="#C2185">兼容性注意: </font>**
页面被卷去的头部, 有兼容性问题, 因此被卷去的头部通常有如下的几种写法


1. 声明了DTD 使用 document.documentElement.scrollTop;
2. 未声明DTD 使用 document.body.scrollTop;

3. 新方法: window.pageYOffset / pageYOffset  ie9以上支持

<br>


### **<font color="#C2185">自定义函数: 获取页面被卷进去的距离: </font>**
```js
    function getScroll() {
        return {
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        }
    }

    // 使用的时候
    getScroll().left / top
```


### **<font color="#C2185">扩展: DTD: </font>**
<!DOCTYPE html> 这个就是DTD 加上这个就可以使用 document.documentElement.scrollTop;


### **<font color="#C2185">最高兼容性写法(网上): </font>**
```js

    // 判断是否支持 PageOffset (给 supportPageOffset赋值 true 或 false)
    var supportPageOffset = window.pageXOffset !== undefined;
 
    // 检测浏览器渲染属性是否标准模式 (isCSS1Compat赋值 true 或 false)
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    
    // 如果不支持PageOffset则要使用 scrollLeft; 
    // scrollLeft 根据浏览器模式(标准模式、怪异模式)使用不同语法
        // 标准模式:  document.documentElement 语法
        // 怪异模式:  document.body 语法
    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

    ----

    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
```

<br>

# 对offset client scroll 系列的总结
它们都可以返回元素大小

offsetWidth  返回自身包括 padding border width 的宽度 返回值不带单位
clientWidth  返回自身包括 padding width  不包括border 返回值不带单位
scrollWidth  返回自身的实际宽度 padding 不包含边框 返回数值不带单位

它们主要用法
offset系列 主要用于获取元素的位置
client系列 主要获取元素的大小
scroll系列 主要获取滚动的距离

### **<font color="#C2185">页面的滚动的距离是通过 window.pageXOffset 获取的: </font>**

<br>

# 淘宝 flexible.js 源码分析
```js
(function flexible(window, document){

})(window, document)
```

上面的函数是立即执行函数, 主要作用:创建一个独立的作用域
使用的立即执行函数的第二种书写方式:

### **<font color="#C2185">优点: </font>**
这种方式的好处就是我们引入了flexible.js 再引入其它js文件不会产生 变量名冲突的情况, 都是局部变量

window, document 当实参传递进去, 这样立即执行函数就可以使用这两个参数了


### **<font color="#C2185">要点: </font>**
### **<font color="#C2185">window.devicePixelRatio 是物理像素比: </font>**
pc端 
    输出的结果会是1

移动端
    输出的结果会是2

### **<font color="#C2185">var dpr = window.devicePixelRatio || 1: </font>**
检查当前浏览器有没有window.devicePixelRatio这个属性, 有的话就获取这个属性, 没有的话就设定为1

```js
(function flexible(window, document) {
    // 获取的 html 的根元素
    var docEl = document.documentElement

    // dpr 物理像素比
    var dpr = window.devicePixelRatio || 1


    // 设置我们body 的字体大小
    function setBodyFontSize() {

        // 如果页面中有body 这个元素 就设置body的字体大小
        if (document.body) {

            // 我的物理像素比是1 如果是pc端打开的就是 12 X 1
            // 如果是移动端打开的, 就是12 X 物理像素比了
            document.body.style.fontSize = (12 * dpr) + 'px'

        } else {
            // 如果没有body? 因为整个代码没有加载onload事件, 如果我的这个js文件是在head标签里引入的j 如果页面中没有body 这个元素则等着 我们页面主要的DOM元素加载完毕再去设置body的字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }

    // 代码加载先执行这个函数
    setBodyFontSize();


    // set 1rem = viewWidth / 10    设置我们html 元素的文字大小
    function setRemUnit() {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // 当我们页面尺寸大小发生变化的时候要重新设置下rem 的大小
    window.addEventListener('resize', setRemUnit)

    // pageshow 是我们重新加载页面触发的事件
    window.addEventListener('pageshow', function(e) {
        // e.persisted 返回的是true 就是说如果这个页面是从缓存取过来的页面也需要从新计算一下rem 的大小
        if (e.persisted) {
            setRemUnit()
        }
    })

    // 有些移动端的浏览器不支持0.5像素的写法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))
```

<br>

# 定时器
window对象给我们提供了2个非常好用的方法 - 定时器

### **<font color="#C2185">setInterval(function() {}, 毫秒数): </font>**
按照 指定的周期(以毫秒计)来调用函数或计算表达式 (每隔多少毫秒执行一次回调)
如果希望一段程序可以间隔一段时间执行一次可以使用定时调用, 可以将一个函数 每隔一段时间执行一次

参数: 
1. 回调函数(该函数会每隔一段时间被调用一次)
2. 毫秒, 每次调用间隔的时间单位是毫秒 1000毫秒 = 1秒


### **<font color="#C2185">返回值: </font>**
定义器的标识符
Number类型的数据
开一个定时器 返回值是1 开两个就是2也就是一个页面可能开启N个定时器就是靠这些返回值来区分


### **<font color="#C2185">setTimeout(callback, ms): </font>**
延迟定时器
用于设置一个定时器, 该定时器在指定毫秒之后执行回调


### **<font color="#C2185">clearInterval(id): </font>**
取消 由 setInterval() 设置的timeout
可以用来关闭一个定时器方法中需要一个定时器的标识作为参数

### **<font color="#C2185">clearTimeout(id): </font>**
取消 由 setTime() 设置的timeout    

<br>

# 动画函数
### **<font color="#C2185">动画实现原理: </font>**
通过定时器 setInterval() 不断移动盒子的位置

### **<font color="#C2185">实现步骤: </font>**
1. 获得盒子当前的位置
2. 让盒子在当前位置的基础上 再加一个移动距离
3. 然后利用定时器不断重复这个操作
4. 加一个结束定时器的条件
5. 注意此元素需要添加定位, 才能使用ele.style.left

### **<font color="#C2185">简单的动画实现: </font>**
```js
let box = document.querySelector(".box")
let distance = 10

let timer = setInterval(() => {

  // 每次计算新的left值
  let x = box.offsetLeft
  box.style.left = (x + distance) + "px" 

}, 1000)
```

<br>

# 动画函数的简单封装
自定义函数的参数:
1. 动画对象
2. 终点值

```js
    function animate(obj, taret) {
        obj.timer = setInterval(function() {
            // 如果元素的left > 目标值 就停止动画
            if(obj.offsetLeft >= target) {
                clearInterval(obj.timer);
            }

            obj.style.left = obj.offsetLeft + 1 + 'px';
        }, 30)
    }
```

<br>

# 缓动效果原理
缓动动画就是让元素运动速度有所变化, 最常见的是让速度慢慢停下来
让元素的运动速度 有一定的变化 比如我们停车前后会踩刹车

### **<font color="#C2185">思路: </font>**
让盒子每次移动的距离慢慢变小, 速度就会慢慢的降下来

### **<font color="#C2185">核心算法: : </font>**
    (目标值 - 现在的位置) / 10 作为每次移动的距离 (我们称之为步长)

### **<font color="#C2185">obj.style.left = obj.offsetLeft + ((target - obj.offsetLeft) / 10) + 'px';: </font>**

注意: 
步长值一定要写在定时器里面 这样才能不断的更新最新的位置

解析:
匀速运动:
    盒子在0的位置, 目标位置为100, 每次步长为10  ---  这就是匀速运动

缓速运动:
    (目标值 - 现在的位置) / 10

    (100 -  0) / 10  = 10
    (100 - 10) / 10  = 9
    (100 - 19) / 10  = 8.1

定时器每次都会获取到现在的位置, 因为现在位置的值不断增加, 步长就会不断减少


2. 停止的条件: 
    让当前盒子位置等于目标位置就停止定时器

```js 
    // 移动函数:
    function animate(obj, taret) {
        obj.timer = setInterval(function() {

            // 步长值
            let step = (target - obj.offsetLeft) / 10;
            if(obj.offsetLeft >= target) {
                clearInterval(obj.timer);
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 30)
    }

    // 之所以是匀速运动就是因为
    obj.style.left = obj.offsetLeft + 1 + 'px';

    // 1的值是固定的, 我们把这个步长值改为一个慢慢变小的值
    obj.style.left = obj.offsetLeft + step + 'px';
```


### **<font color="#C2185">匀速动画: </font>**
盒子当前的位置 + 固定的值

### **<font color="#C2185">缓动动画: </font>**
盒子当前的位置 + 变化的值(目标位置 - 现在位置) / 10
*变化在值 在定时器里面写*


### **<font color="#C2185">当是正方向的时候: </font>**
对步长值取整 使用向上取整Math.ceil((target - obj.offsetLeft) / 10);
<!-- 假如是8.1 我们要让它是9 而不是8, 往前走 不要让它往后倒 -->

### **<font color="#C2185">当是反方向的时候: </font>**
对步长值取整 使用向下取整Math.floor((target - obj.offsetLeft) / 10);
<!-- 假如是-8.1 我们要让它是-9 而不是-8, 往前走 不要让它往后倒 -->

### **<font color="#C2185">而且这种写法不用判断speed是正还是负的问题: </font>**
如果是回退的话  (目标位置 - 现在位置) / 10    的计算结果会是 负数

### **<font color="#C2185">因为考虑到两个条件(是正方向 还是反方向) 所以我们要判断: </font>**
step = step > 0 ? Math.ceil(step) : Math.floor(step);

### **<font color="#C2185">整理后: </font>**
```js 
    function animate(obj, target) {
        obj.timer = setInterval(function() {

            // 步长值
            let step = (target - obj.offsetLeft) / 10;
            // 避免停的不准的情况发生, 我们要对小数的步长值取整, 因为是两个方向的原因 我们要对两种情况来进行判断
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            if(obj.offsetLeft == target) {
                clearInterval(obj.timer);
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15)
    }
```

**注意:**
终止定时器的条件不要写成 >= 而是== 要不会出问题


# 缓动动画中添加 回调函数
### **<font color="#C2185">回调函数: </font>**
上一件事件执行完毕后 才会调用回调函数

### **<font color="#C2185">回调函数原理: </font>**
函数可以作为一个参数, 将这个函数作为参数传到另一个函数里面, 当那个函数执行完后, 再执行传进去的这个函数, 这个过程就叫做回调

### **<font color="#C2185">需求: 当移动到800后变色, 这里就用到了回调函数: </font>**
```js 
    // 就看这个函数: 如果添加回调函数

    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }

    // 调用的时候
    animate(div, 800, function(){ ... });


    接下来是回调函数在哪去调用
    >>> 定时器结果的位置调用 去找判断条件里

    // 当进入这个条件, 代表前一个函数结束, 在这里调用
    if(obj.offsetLeft == target) {
        clearInterval(obj.timer);
        callback && callback();
    }
```

<br>

# 动画函数的封装
以后有经常要使用的函数, 可以封装到一个js文件中 然后用的时候引入这个js文件

1. 新建js文件
2. 粘贴代码

### **<font color="#C2185">小案例: </font>**
需求: 鼠标经过div 里面滑动出去一条信息框
```html
    <!-- html结构 -->
    <div class='sliderbar'>
        <span>←</span>
        <div class='con'>问题反馈<>
    </div>

    <script>
        // 鼠标经过sliderbar con滑动到左侧

        - 当动画执行完毕后 ← 变为 →
        // 这时候就要用到回调函数了, 因为是动画执行完了 才改变 箭头的方向

        animate(con, -160, function(){
            // 当动画执行完毕后 ← 变为 →
            sliderbar.children[0].innerHTML = '→';
        })
    </script>
    
```

<br>

# 类的操作

```html
<button id="btn01">点击按钮以后修改box的样式</button>
<br /><br />
<div id="box" class="b1 b2"></div>

<script>
window.onload = function(){
    var box = document.getElementById("box");
    var btn01 = document.getElementById("btn01");

    btn01.onclick = function(){ }
}
</script>
```

### **<font color="#C2185">style修改元素样式: </font>**
通过style属性来修改元素的样式
每修改一个样式浏览器就需要重新渲染一次页面
这样执行的性能是比较差的 而且这种形式当我们要修改多个样式时也不太方便
```js
    box.style.width = "200px";
    box.style.height = "200px";
    box.style.backgroundColor = "yellow";
```

上面是js直接修改css样式吧 js是行为 css是表现 这么一改 行为和表现又耦合了 
我希望一行代码 可以同时修改多个样式, 这个box的样式都是通过b1的class设置的 

```css
    .b2{
        height: 300px;
        background-color: yellow;
    }
```
我创建一个class b2 假如我将box的class修改为b2, 样式是不是就变了
    box.className = "b2";

我们可以通过修改元素的class属性来间接的修改样式 这样一来我们只需要修改一次即可同时修改多个样式 浏览器只需要重新渲染页面一次性能比较好 并且这种方式可以使表现和行为进一步的分离 

现在我不想修改width 我只想该height 和 background 这样一改 box宽度100%了 因为b1的样式去了 去了之后b1的样式都没了 但是有的时候 我不希望去掉b1 只希望加上b2 也就是在原有值的基础上增加b2 
```js
    box.className += "b2";      //都没了 因为classname 变成"b1b2"了
    box.className += " b2";     //b2的前面要加个空格 别忘了
```


### **<font color="#C2185">自定义: 为元素添加 class : </font>**
参数: 
    1. 给谁加 obj 要添加class属性的元素
    2. cn 要添加的class值 

```js
    function addClass(obj, cn){
        obj.className += " " + cn;
    };
```

有没有什么问题, 点一下 加进去了 class="b1 b2"
多点几下后class="b1 b2 b2 b2 b2 b2 b2 b2 b2 b2 b2", 有了一次b2后 就不要加了 有没有个方法能判断下 这个class里有没有b2 


### **<font color="#C2185">自定义: 检查元素上是否已有 同名 class: </font>**
判断一个元素中是否含有指定的class属性值, 如果有该class则返回true没有则返回false
参数
1. obj 要判断的元素
2. cn class的名 换句话说就是判断obj中有没有cn

利用正则表达式:

```js
function hasClass(obj, cn){
    var reg = new RegExp("\\b"+cn+"\\b");
    return reg.test(obj.className);
};

// 或者这样
function checkClass(el, sn) {
  return el.className.includes(sn)
}

function addClass(obj, cn) {
    if(!hasClass(obj, cn)) {
        addClass(obj, cn);
    };
}
```

还有什么问题？, 我觉得还需要一个删除一个类的功能, 删除元素中指定的class属性, 怎么删 把b2 替换成一个 空串, 是不是还得创建一个正则表达式 


### **<font color="#C2185">自定义: 删除 class: </font>**
```js
function removeClass(obj , cn){
    var reg = new RegExp("\\b"+cn+"\\b");
    obj.className = obj.className.replace(reg , "");
}
```

toggleClass可以用来切换一个类, 如果元素中具有该类则删除, 如果元素中没有该类则添加


### **<font color="#C2185">自定义: 切换class: </font>**
```js
function toggleClass(obj , cn){
    
    if(hasClass(obj , cn)) {
        removeClass(obj , cn);
    }else{
        addClass(obj , cn);
    }
};
```

<br>--

# JSON
创建一个对象
```js
// 以前说过 写属性名的时候 可以加引号或者不加 加了也不算错 name == "name"
var obj = {
    name: "孙悟空"
};

var obj = {
    "name": "孙悟空",
    "age": 18,
    "gender": "男"
};

console.log(obj.age);
```


### **<font color="#C2185">obj 和 json之间的关系: </font>**
以后我们开发的时候 不是只有一个页面 往往有前端和后台服务器, 网页和服务器之间要交互数据

现在我要把上面的对象传递给服务器 服务器是java写的能传过去么？
不能传 js 和 java互相不认识, 也就是js中的对象只有js自己认识其他的语言都不认识
现在的问题就是 需要把对象传递给java, 能不能将这个对象 转换成 所有语言都认识的东西, 
既然对象不认识 能不能将这些东西转换成 大家都认识的东西呢 
比如 number string boolean, 那给对象 转换为 字符串

```js
var obj = {
    "name":"孙悟空",
    "age":18,
    "gender":"男"
};

<!-- 转换 -->

var obj = "{
    "name":"孙悟空",
    "age":18,
    "gender":"男"
}"
```

### **<font color="#C2185">JSON就是一个特殊格式的字符串这个字符串可以被任意的语言所识别: </font>**
并且可以转换为任意语言中的对象 JSON在开发中主要用来*数据的交互*

### **<font color="#C2185">JSON: </font>**
JavaScript Object Notation JS对象表示法
JSON和JS对象的格式一样只不过JSON字符串中的属性名必须加双引号, 其他的和JS语法一致

### **<font color="#C2185">JSON的写法: : </font>**
1. 对象 {}
```json
    var obj = '{"name":"孙悟空", "age":18, "gender":"男"}';
```

2. 数组 []
```js
    var arr = '{1,2,3}'; 
```

### **<font color="#C2185">JSON中允许的值: : </font>**
1. 字符串
2. 数值
3. 布尔值
4. null
5. 对象(普通对象)
6. 数组

**函数和undefined不行 函数只有js自己认识**

json对象写好了数据到后台了 那怎么才能用？
要是想取的话 得把
    var obj = '{"name":"孙悟空", "age":18, "gender":"男"}'

转换为对象, 我需要一个方法 将一个字符串 转换为 对象
将JSON字符串转换为JS中的对象, 在JS中为我们提供了一个工具类就叫JSON 这个对象可以帮助我们将一个JSON转换为JS对象也可以将一个JS对象转换为JSON


### **<font color="#C2185">json --> js对象: </font>**
### **<font color="#C2185">JSON.parse(): </font>**
可以将以JSON字符串转换为js对象
它需要一个JSON字符串作为参数 会将该字符串转换为JS对象并返回
```js
    var o = JSON.parse(json);   //它的返回值应该是对象
    console.log(o.age);

    // var obj3 = {name:"猪八戒" , age:28 , gender:"男"};
```

<br>

### **<font color="#C2185">JS对象 ---> JSON: </font>**
### **<font color="#C2185">JSON.stringify(): </font>**
可以将一个JS对象转换为JSON字符串
需要一个js对象作为参数会返回一个JSON字符串
```js 
    var str3 = {"name":"孙悟空","age":18,"gender":"男"};

    // JSON这个对象在IE7和以下浏览器不支持所以在这些浏览器中会报错
    let json = JSON.stringify(str3);
```


### **<font color="#C2185">IE7和以下浏览器: </font>**
### **<font color="#C2185">eval(): </font>**
这个函数 会将传入的字符串当做js代码来解析执行 并返回结果

**注意:**
如果使用eval()执行的字符串中含有{},它会将{}当成是代码块
如果不希望将其当成代码块解析则需要在字符串前后各加一个()
```js
    var str = '({"name":"孙悟空","age":18,"gender":"男"})';
```

eval()这个函数的功能很强大可以直接执行一个字符串中的js代码
但是在开发中尽量不要使用首先它的执行性能比较差然后它还具有安全隐患

示例:
```js
    // 这是个字符串吧 字符串中是alert代码吧
    var str2 = "alert('hello');";

    // 但是我就想让上面的代码执行, 这时候我们就可以用eval()
    eval(str2);


    // 那现在我想把var str = '{"name":"孙悟空","age":18,"gender":"男"}'
    eval(str);      //报错了 缺少分号 问题在{}这
        
    var str = '({"name":"孙悟空","age":18,"gender":"男"})';
    var obj = eval("("+str+")");
```

如果需要兼容ie7以及以下的json操作则可以通过引入一个外部的js文件来处理, 外部文件 叫 *json2.js*



### **<font color="#C2185">JSON特殊的使用技巧: </font>**

### **<font color="#C2185">技巧1: 对象的深拷贝: </font>**
### **<font color="#C2185">JSON.parse(JSON.stringify(obj): </font>**
利用 JSON API 实现对象的深拷贝
```js
let obj = {
    name: "sam",
    job: {
        frontend: "vue"
    }
}

let _obj = JSON.parse(JSON.stringify(obj))
```

<br>

**注意1!!!!!!:**  
JSON.parse(JSON.stringify(obj))这种方式 当数据的值为 undefined 的时候 该字段将会被舍弃


**注意2!!!!!!:**  
JSON.parse(JSON.stringify(obj))这种方式 在循环引用：JSON.stringify() 会在传入递归数据结构时抛出异常。

<br>

### **<font color="#C2185">技巧2: 数据的格式化: </font>**
### **<font color="#C2185">JSON.stringify(obj, null, 2): </font>**

<br>

# 移动端的事件

### **<font color="#C2185">触屏事件概述: </font>**
移动端浏览器兼容性较好, 我们不需要考虑以前js的兼容性问题, 可以放心的使用原声js书写效果, 
但是移动端也有自己独特的地方, 比如 触屏事件 touch, (android 和 ios都有)

移动端没有鼠标的概念
touch对象代表一个触摸点, 触摸点可能是一根手指 也可能是一根触摸笔,
触屏事件可响应用户手指(或触控笔)对屏幕或者触控板操作


### **<font color="#C2185">touchstart 事件: </font>**
### **<font color="#C2185">div.addEventListener('touchstart', callback);: </font>**
相当于click事件

### **<font color="#C2185">touchmove 事件: </font>**
相当于mousemove事件

### **<font color="#C2185">touchend 事件: </font>**
相当于mouseup事件

<br>

### **<font color="#C2185">触摸事件对象(TouchEvent): </font>**
TouchEvent是一类描述手指在触摸平面(触摸屏, 触摸板等)的状态变化的时间, 这类事件用于描述一个或多个触点, 使开发者可以检测触点的移动 触点的增加 和 减少等 (比如手指移动了多少像素啊 有几个手指啊)

touchstart touchmove touchend *三个事件都会有各自的事件对象*

<br>

### **<font color="#C2185">触摸事件列表: TouchEvent.touches: </font>**
正在触摸屏幕的所有手指的一个列表 能得到所有的触摸点(检测屏幕)
<!-- 
    一个手指是0 length为1
    如果监听的是DOM元素 touches 和 targetTouches是一样的
 -->

### **<font color="#C2185">TouchEvent.targetTouches: </font>**
正在触摸当前DOM元素上的手指的一个列表(检测DOM元素)
<!-- 
    有几个手指在触摸我的div
 -->

### **<font color="#C2185">TouchEvent.changedTouches: </font>**
手指状态发生了改变的列表, 从无到有 从有到无
<!-- 
    原来屏幕上没有手指 有了手指, 或者 有手指 然后离开了
 -->

### **<font color="#C2185">要点: </font>**
当我们手指离开屏幕的时候, 就没有了touches 和 targetTouches 但是会有changedTouches
因为我们一般都是触摸元素, 所以最经常使用的是 targetTouches
因为是一个手指列表 当我们得到某个触点(手指)的话 可以event.targetTouches[0]
<!-- 
    targetTouches[0] 就可以得到正在触摸dom元素的第一个手指的相关信息
    比如:
        手指的坐标等等
            clientXY
            pageXY
            screenXY

        target:
            div 正在触摸div这个元素
 -->

<br>

# 案例 移动端拖动
touchstart touchmove touchend  可以实现拖动元素
但是拖动元素*需要当前手指的坐标值*, 我们可以使用 targetTouches[0]里面的pageX, pageY
移动端拖动的原理: 
    手指移动中, 计算出手指移动的距离, 然后用盒子原来的位置 + 手指移动的距离

    - 手指移动的距离: 
        没办法拿到手指的移动距离, 但是我们得到手机的当前坐标

    - 手指移动的距离: 手指滑动中的位置 - 手指刚开始触摸的位置
<!-- 
    比如第一次触摸div的时候位置是10px 然后手指移动到了30px的位置上 30-10 移动了20px的距离
 -->


### **<font color="#C2185">拖动元素三部曲: </font>**
1. 触摸元素 touchstart: 获取手指初始坐标, 同时获得盒子原来的位置
2. 移动手指 touchmove:  计算手指的移动距离, 并且移动盒子
3. 离开手指 touchend

**注意:**
手指移动也会触发滚动屏幕所以这里我阻止默认的屏幕滚动 event.preventDefault();

```js
// 获取div
let div = document.querySelector('div');

// 全局定义 手指的初始坐标 (因为多个函数内部需要使用)
let startX = 0;
let startY = 0;

// 全局定义 元素盒子的初始位置
let x = 0;
let y = 0;

// 给盒子绑定 触摸开始的事件 -- 初始化赋值操作
div.addEventListener('touchstart', function(e){
    
    // 给手指点击屏幕的初始位置赋值 获取手指点击屏幕上的初始位置 (用第一根就可以)
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;

    // 给盒子初始位置赋值
    x = this.offsetLeft;
    y = this.offsetTop;
})

// 给元素绑定 拖动时间
div.addEventListener('touchmove', function (e) {
    // 计算手指的移动距离: 手指移动之后的坐标 - 手指初始的坐标
    // 手指不断的移动就能得到最新的坐标e.targetTouches[0].pageX
    let moveX = e.targetTouches[0].pageX - startX;
    let moveY = e.targetTouches[0].pageY - startY;

    // 移动盒子 盒子原来的位置 + 手指移动的距离
    this.style.left = x + moveX + 'px';
    this.style.top = y + moveY + 'px';

    // 取消滚动屏幕的默认行为
    e.preventDefault();
})
```

**注意: 松开手move就停止了不像pc端还要用到onmouseup**

<br>

# 案例 移动端的轮播图
要点:
移动端移动, 可以使用 translate 移动

### **<font color="#C2185">无缝滚动的要点: </font>**
1. 设计 html 结构

    - 正常 3 张图片
    img1 img2 img3

    ↓

    img3 *img1* img2 img3 img1

2. 在更改后的html结构中 我们要实现无缝滚动 就是要当自动播放到最后一张 img1 的时候, 
让起跳到 img1(红色) 的位置, 

这个步骤是利用 translate 来实现的 那就是说只要有过渡 就是有时间的消耗
```js
ul.style.transition = 'all .3s';
```
时间还没到, 过渡还没有走完 就开始判断是不合适的 所以我们判断条件是要等到图片滚动完毕再去判断, 就是过渡完成后判断
此时我们要使用 *transitionend事件*  检测过渡是否完成

### **<font color="#C2185">transitionend事件: </font>**
检测过渡是否完成

### **<font color="#C2185">实现: : </font>**
移动端轮播图功能基本和pc端一致
1. 可以自动播放图片
2. 手指可以拖动播放轮播图

### **<font color="#C2185">要点: </font>**
1. 用手在轮播图上可以左右拉动, 所以在html的结构里 3 1 2 3 1 在图片的前后分别要插入一张图片
```html 
    <ul id='imgBox' class='test'>
        <li>
            <div class='item'>3</div>
        </li>
        <li>
            <div class='item'>1</div>
        </li>
        <li>
            <div class='item'>2</div>
        </li>
        <li>
            <div class='item'>3</div>
        </li>
        <li id='last-li'>
            <div class='item' id='last-item'>1</div>
        </li>
    </ul>
```

2. ul的宽度
5张图片可以把ul的width设置为500%, 但是img的width如果设置为100%的话, 效果也会显示为500%, 所以我们手动给li也设置宽度为20%


### **<font color="#C2185">案例分析: </font>**
1. 自动播放功能
2. 开启定时器
3. 移动端移动, 可以使用translate 移动
4. 想要图片优雅的移动, 请添加过渡效果


### **<font color="#C2185">无缝滚动: </font>**
1. 我们判断条件是要等到图片滚动完毕再判断, 就是过度完成后判断
2. 此时需要添加检测过渡完成事件 transitionend
3. 判断条件: 如果索引号等于3 说明走到了最后一张图片, 此时索引号要复原为0  
4. 此时我们要给它去掉过渡效果, 
5. 如果索引号小于0 说明是倒着走, 索引号等于2
6. 此时图片, 去掉过渡效果, 然后移动

### **<font color="#C2185">导航点的新做法: </font>**
小圆点跟随变化效果
把ol里面li带有current类名的选出来去掉类名remove
让当前索引号的小li添加current add
但是 也是要等着过渡结束之后变化, 所以这个写到transitionend事件里面

### **<font color="#C2185">手指滑动轮播图: </font>**
本质就是ul跟随手指移动, 简单的说就是移动端拖动元素
<!-- 
    // 复习下:
    当手指触摸到这个元素, 拿到手指的初始坐标, 当手指移动的时候会拿到移动之后手指的坐标 让两个坐标相减就能得到手指的移动距离 然后盒子在原来的基础上加上移动的距离盒子就实现移动效果了 
-->
触摸元素 touchatart:  获取手指的初始坐标
移动手指 touchmove:   计算手指的滑动距离 并且移动盒子

### **<font color="#C2185">手指拖动图片时的吸附效果: </font>**
当拖动ul的程度小于某个值的时候 就会回到原来的图片
当拖动ul的程度大于某个值的时候 就会到目标图片

离开手指touchend      根据滑动的距离分不同的情况
如果移动距离小于50px 就回弹原来的位置
如果移动距离大于50px 就上一张下一张滑动

```js 
    // 获取元素
    let focus = document.querySelector('.focus');
    let ul = focus.children[0];

    // 获得focus的宽度
    let w = focus.offsetWidth;

    // 利用定时器自定轮播
    let index = 0;
    let timer = setInterval(function(){
        // 外面定义了一个index变量 让这个变量每次++, ul的移动距离就是index*图片的宽度
        index++;
        let translatex = -index * w;

        ul.style.transition = 'all .3s';
        ul.style.transform = `translateX(${translatex})`;
    },1000)

    
    /*
    无缝滚动, 当到最后一张1的时候 快速掉到其实是第二张的1

    无缝滚动的要点:
    我们要实现无缝滚动 就要当自动播放到最后一张1的时候, 让它跳到其实是第二张的1, 但是我们的缓动效果是用过渡实现的, 只要有过渡 就是有时间的消耗 时间还没到, 过渡还没有走完 就开始判断是不合适的

    所以我们判断条件是要等到图片滚动完毕再去判断, 就是过渡完成后判断
    此时我们要使用 transitionend 事件 检测过渡是否完成
    */
   
    // 我们检测ul 因为它做的过渡效果 和 移动
    ul.addEventListener('transitionend', function(){
        /*
            走到最后一张再后退, 那怎么知道走到了最后一张呢?
            我们可以通过index判断, 页面一上来我们看到的第一张就是0
            3 1 2 3 1
            0 1 2 3 -- > 索引号
            所以当走到索引号为3的时候我们就跳到0
        */
        if(index >= 3) {
            index = 0;
            // 去掉过渡效果, 这样让我们的ul 快速的跳到目标位置
            ul.style.transition = 'none';
            // 重新计算 按照最新的index滚动, 用我们最新的index * 图片的宽度
            let translatex = -index * w;
            ul.style.transform = `translateX(${translatex})`;
        } else if(index < 0) {
            /*
            还有一种特殊情况, 如果处于第一张的时候 我们往右拉会出现倒着的情况
            3 1 2 3 1
            在1的时候往右拉 会到3
            1的索引号是0 要是倒着走的话 肯定是一个负数才对 -1
            如果索引号小于0 肯定是倒着走的, 当到3的时候 迅速的跳到右手倒数第二张(索引号是2的身上)
            */
            index = 2;
            ul.style.transition = 'none';
            let translatex = -index * w;
            ul.style.transform = `translateX(${translatex})`;

            // 导航点的部分
            // 以前的做法是利用for循环 先把active类去掉 再让当前的小li添加类

            // 把ol(导航点的容器)里面的li带有current类名的选出来, 去掉类名 remove
            ol.querySelector('.current').classList.remove('current');

            // 让当前索引号的小li 加上current add
            ol.children[index].classList.add('current');
        }
    });

    // 手指滑动轮播图
    // 触摸元素 touchstart: 获取手指初始坐标
    let startX = 0;
    let moveX = 0;  // 后面要使用这个移动距离所以定义全局变量

    ul.addEventListener('touchstart', function(e){
        startX = e.targetTouches[0].pageX;

        // 在手指拉动图片的时候是不需要轮播效果的
        clearInterval(timer)
    })
    // 移动手指 touchmove 计算手指的滑动距离 并且移动盒子
    ul.addEventListener('touchmove', function(e){
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子: 盒子原来的位置 + 手指移动的距离
        // -index*w 是ul的原来位置, 因为滚动到第几张就是index*w
        let translatex = -index*w + moveX;
        // 手指拖动的话 是一点点的拖 所以不需要做动画效果
        ul.style.transition = 'none';
        ul.style.transform = `translateX(${translatex})`;
    })

    // 手指离开, 根据移动距离去判断是回弹还是播放上下一张
    // 不管回弹还是滑动过去都是等到手指离开的时候发生的
    ul.addEventListener('touchend', function(e){
        // 如果移动距离大于50px 就播放上下一张
        // 因为moveX是手指移动的距离 是根据两次触摸点的不同差值求出来的 所以可能是一个负值 这里我们不管正还是负 只要是大于50就可以 所以取绝对值
        if(Math.abs(moveX) > 50) {
            // 播放上一张还是下一张呢? 手指右滑是上一张 因为moveX是正值 手指左滑是下一张 因为moveX是负值
            if(moveX > 0) {
                index--;
            } else {
                index++;
            }
            
            // 求最新的index的值
            let translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translatex})`;
        } else {
            // 如果拖动小于50px 那就回弹到当前的图片
            let translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translatex})`;
        }

        // 当手指离开的时候 我们再开启定时器
        // 但是开启之前我们要清除上一个定时器, 保证页面中只有一个定时器
        clearInterval(timer);

        // 重新开启定时器 把上面的代码复制一下
        timer = setInterval(function(){
            index++;
            let translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translatex})`;
        },1000)
    })
```

### **<font color="#C2185">有一种情况 当我们点击轮播上的时候 不想拖动, 所以就没必要计算里面的代码(moveX>50<50什么的): </font>**
```js 
    // 这么我们就在外面声明一个全局变量
    let flag = false;

    // 只有我们手指移动过了 我们才让它计算, 否则不用
    // 我们声明一个全局变量 定为false, 在move逻辑里修改为true 意思是只有移动过了才用计算 否则不用
    let flag = false;

    let focus = document.querySelector('.focus');
    let ul = focus.children[0];
    let w = focus.offsetWidth;

    let index = 0;
    let timer = setInterval(function(){
        index++;
        let translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = `translateX(${translatex})`;
    },1000)

    
    ul.addEventListener('transitionend', function(){

        if(index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            let translatex = -index * w;
            ul.style.transform = `translateX(${translatex})`;
        } else if(index < 0) {
            index = 2;
            ul.style.transition = 'none';
            let translatex = -index * w;
            ul.style.transform = `translateX(${translatex})`;

            ol.querySelector('.current').classList.remove('current');
            ol.children[index].classList.add('current');
        }
    });

    let startX = 0;
    let moveX = 0;

    ul.addEventListener('touchstart', function(e){
        startX = e.targetTouches[0].pageX;
        clearInterval(timer)
    })


    ul.addEventListener('touchmove', function(e){
        moveX = e.targetTouches[0].pageX - startX;
        let translatex = -index*w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = `translateX(${translatex})`;

        // 在这里修改为true 如果用户手指移动过我们再去判断否则不做判断效果
        flag = true;

        // 取消拖动手指会滚动屏幕的默认行为
        e.preventDefault(); 
    })


    ul.addEventListener('touchend', function(e){

        // 在这里根据flag来 进行 相应内容的进行, 如果flag是true 那就是代码移动过了 再进行下面的逻辑判断
        if(flag) {
            if(Math.abs(moveX) > 50) {
                if(moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                
                let translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = `translateX(${translatex})`;
            } else {
                let translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = `translateX(${translatex})`;
            }
        }
        

        clearInterval(timer);

        timer = setInterval(function(){
            index++;
            let translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translatex})`;
        },1000)
    })
```

<br>

# 案例 移动端的返回顶部
当页面滚动到某个地方 就显示 返回顶部的按钮 否则隐藏

### **<font color="#C2185">案例分析 : </font>**
页面滚动到某个地方, 我们需要事件 scroll 页面滚动事件
只要屏幕滚动就会产生一个卷进去的头部, 虽然有兼容性的问题 但是我们是移动端所有没问题

点击 window.scroll(0,0) 返回顶部
<!-- 
    比如到 div7的位置上 让返回按钮显示 卷进去的头部的的值 如果 > div的offsetTop
 -->

```js 
    // 返回顶部模块的制作
    let goBack = document.querySelector('.goBack');
    let nav = document.querySelector('nav');

    window.addEventListener('scroll', function(e){
        if(window.pageYoffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })

    goBack.addEventListener('click', function(e){
        window.scroll(0,0);
    })
```

<br>

# 移动端 Click事件 延时解决方案
移动端 click 事件会有300ms的延时, 原因是移动端屏幕双击会缩放(double tap to zoom) 页面
它会看再300ms之内有没有点击两下, 如果没有就当做点击事件来处理
<!-- 
    因为屏幕可以放大 双指拉动, 缩小的时候双击屏幕
 -->
那我就想点击一下马上执行 不要等300ms应该怎么办?

### **<font color="#C2185">解决方式: </font>**
1. 禁用缩放, 浏览器禁用默认的双击缩放行为 并且去掉300ms的点击延迟
```html
    <meta name='viewport' content='user-scalable=no'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```

2. 如果有的页面要求有缩放的功能, 我们就不能添加刚才的内容, 我们利用touch事件自己封装这个事件解决300ms延迟的问题
    - 原理:
    - 当我们手指触摸屏幕, 就记录当前触摸的时间
    - 当我们手指离开屏幕, 又会产生一个时间, 用离开的时间减去触摸的时间
    - 如果时间小于150ms 并且没有滑动过屏幕 那么我们就定义为点击

```js 
    // 封装tap 解决click 300ms 延迟
    function tap(obj, callback) {

        // 不移动我们的手指永远是false
        let isMove = false;

        let startTime = 0;  //记录触摸时候的时间变量
        obj.addEventListener('touchstart', function(e) {

            // 记录触摸时间, 只要触摸元素就把这个时间记入下来
            startTime = Date.now();     
        })
        obj.addEventListener('touchmove', function(e) {
            isMove = true;     // 看看是否有滑动 有滑动算拖拽 不算点击
        })
        obj.addEventListener('touchend', function(e) {

            // 手指离开的时候也有一个时间Date.now()
            if(!isMove && (Date.now()-startTime) < 150) {
                // 如果手指触摸和离开时间小于150ms算点击
                callback && callback();   // 执行回调函数
            }
            isMove = false;
            startTime = 0;
        })
    }

    // 调用
    tap(div, function() {  执行代码 ... })
```   

### **<font color="#C2185">方法2 一次只能给一个元素解决这个问题 如果页面有100个元素 就得调用100次: </font>**

### **<font color="#C2185">方法3: </font>**
为了解决方案2的弊端 我们可以使用插件 fastclick插件解决300ms延迟
GitHub官网: https://github.com/ftlabs/fastclick

### **<font color="#C2185">使用方法: </font>**
引入js文件
把这个代码复制到页面中, 就ok了
<!-- 如果document有addEventListener的方法 -->
```js
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
```

<br>

# 移动端常用的开发插件
### **<font color="#C2185">Swiper: </font>**
https://www.swiper.com.cn

引入插件相关文件
按照规定语法使用

### **<font color="#C2185">superslide: </font>**
http://www.superslide2.com
网站上常用的“焦点图/幻灯片”“Tab标签切换”“图片滚动”“无缝滚动”等只需要一个SuperSlide即可解决！

### **<font color="#C2185">iscroll: </font>**
https://github.com/cubiq/iscroll


### **<font color="#C2185">移动端视频插件 zy.media.js: </font>**
https://github.com/ireaderlab/zyMedia

h5给我们提供了video标签, 但是浏览器的支持情况不同
不同的视频格式文件, 我们可以通过source解决
但是外观样式, 还有暂停 播放 全屏等功能我们只能自己写代码解决, 这个时候我们可以使用插件方式来制作

<br>

# 严格模式

js除了提供正常的模式外还有严格模式(strict mode)
es5的严格模式是采用具有限制性js变体的一种方式, 即在严格条件下运行js代码

ie10以上才支持

### **<font color="#C2185">严格模式对正常的js语义做了一些更改: </font>**
效果js语法的一些不合理 不严谨的地方 减少了一些怪异行为
消除代码原型的一些不安全的地方, 保证代码运行的安全
提高编译器效率 增加运行速度
禁用了es的未来版本中可能会定义的一些语法, 为未来新版本的js做好铺垫, 比如一些保留字 class enum export extends import super不能做变量名

### **<font color="#C2185">开启严格模式: </font>**
可以在js中开启
可以在个别函数内部开启

因此在使用时, 我们可以将严格模式分 为脚本开启严格模式 和 为函数开启严格模式两种情况

### **<font color="#C2185">为脚本开启严格模式: </font>**
为整个脚本文件开启严格模式, 需要在所有语句之前放一个特定语句

```js
    "user strict";

    <script>
        "user strict";
    </>

    // 或者

    <script>
        (function(){
            "user strict";
            // 把所有的代码都写在这个立即执行函数里面
        })()
    </>
```

### **<font color="#C2185">为函数开启严格模式: </font>**
给某个函数开启严格模式, 需要把 "user strict"; 声明放在函数体所有语句之前
```js
    function fn() {
        "user strict";

        函数体;
    }
```

<br>

# 严格模式中的变化

### **<font color="#C2185">1. 变量规定: </font>**
在正常模式中 如果一个变量没有声明就被赋值, 默认是全局变量, 严格模式禁止这种用法, 变量都必须先用var命令声明, 然后再使用
<!-- 变量名先声明 再使用 -->

### **<font color="#C2185">2. 严禁删除已经声明的变量: </font>**
例如 delete x; 语法是错误的
<!-- 不能随意删除已经声明好的变量 -->

### **<font color="#C2185">3. 全局作用域中函数中的this是undefined: </font>**
以前在全局作用域函数中的this指向window对象
严格模式下全局作用域中函数中的this是undefined

### **<font color="#C2185">4. 严格模式下, 构造函数不加new调用 this指向undefined 会报错: </font>**
以前构造函数时, 不加new也可以调用当做普通函数 里面this指向全局对象
加了this去调用还是指向创建的对象实例
```js
    // 不加new调用作为普通函数调用 这时的this指向window
    function Star() {
        this.sex = 'nan'
    }

    Star();
    console.log(window.sex)     // 因为this指向window所以可以输出 男
```

### **<font color="#C2185">5. 定时器里面的this还是指向window: </font>**


### **<font color="#C2185">函数的变化: </font>**
函数不能有重名的参数
```js
    // 以前是可以这样的
    function fn(a, a) {
        console.log(a + a);
    }
    fn(1, 2)    // 4
```
首先不在严格模式下是可以声明重名参数的

    其次上面打印出4到的原因是
    实参1 传递给a
    a = 1
    实参2 传递给a
    a = 2

    现在都被改成 a=2 a=2 所以结果是4

函数必须声明在顶层, 新版本的js会引入'块级作用域' 为了与新版本接轨, 不允许在非函数的代码块内声明函数
非函数代码块
```js 
    if(true) {
        function fn() {}
        fn();               !!!语法错误
    }

    for(let i=0; i<5; i++) {
        function fn() {}
        fn();               !!!语法错误
    }
```

### **<font color="#C2185">严格模式中也不允许使用8进制: </font>**

<br>

# 高级函数
高阶函数是对其它函数进行操作的函数, 它接收函数作为参数, 或将函数作为返回值输出
```js    
    // 参数是个函数
    function fn(callback) {
        callback&&callback();
    }
    fn(function() {alert(1)});

    // 函数作为返回值
    function fn() {
        return function() {}
    }
    fn()
```

函数也是一种数据类型, 同样可以作为参数, 传递给另一个参数使用, 最典型的就是作为回调函数
```js 
    function fn(a, b, callback) {
        console.log(a+b);

        // 这条语句写在最下面
        callback && callback();
    }

    fn(1,2,function() {

        // 当fn中的代码执行完毕才会执行回调函数
        console.log('我是最后调用的');
    })
```

<br>

# 什么是闭包
闭包(closure)指:
    有权访问另一个函数作用域中变量的函数 被访问的变量所在的函数就是闭包函数

### **<font color="#C2185">闭包的作用: </font>**
延伸了变量的作用范围

闭包是一个函数
简单的理解就是 一个作用域可以访问另外一个函数内部的局部变量

```js
    // 我们fun这个函数作用域 访问了另外一个函数 fn 里面的局部变量 num 此时就满足了闭包的条件

    function fn() {
        let num = 10;               // 访问了这个作用域中的变量
                                            ↑
        function fun() {                    ↑
            console.log(num)        // 这个作用域
        }
        fun()
    }
    fn()
```

<br>

### **<font color="#C2185">fn外面的作用域可以访问fn内部的局部变量: </font>**
```js
    function fn() {
        let num = 10;
        function fun() {
            console.log(num)
        }
        
        return fun;
    }
    let f = fn();

    类似于:

    f = function fun() {
        console.log(num)
    }
    
    // 这里f里存的就是一个函数, 既然是函数就可以调用 这里是就全局作用域 访问到了局部作用域里的值
    f();
```


我们通过几个例子观察下闭包

### **<font color="#C2185">例子0: </font>**
一个函数, 可以访问它相同的作用域的外部变量
```js
    var a = 0;

    function m1(){
        console.log(a++);
    };
```

\\\\    ↓    \\\\

接下来有这么两个函数, m2函数显然是不能访问到变量a的 因为不在一个作用域里, *那怎么才让m2访问到m1中的私有变量呢?*
```js
    function m1(){
        var a = 100;
        console.log(a++);
    };

    function m2(){
        console.log(a++);
    }
```
\\\\    ↓    \\\\

为了是m2能够访问到m1中的私有变量, 我们可以这样
1. 在 m1 的内部创建 m3 函数, 这是m3函数访问变量a肯定是没有问题的
```js
    function m1(){
        var a = 100;

        // 或者在这写也可以
        return function m3(){
            console.log(a++);
        }

        // 一般这么写 然后我们把 m3 当做对象 return 出去, 在编程中函数可以被当做对象使用
        return m3;
    };
```

2. 我们在全局范围内调用 m1
```js
    function m1(){
        var a = 100;

        function m3(){ 
            console.log(a++);
        }
        return m3;                         
    };

    var _m3 = m1();
    // 我们再全局范围内又做了一个变量_m3 而_m3是和m3是等价的, 可以理解为在全局范围内给m3创建了一个快捷方式
    // 由于作用域的关系, m2 是可以条用 _m3 的

    function m1(){
        var a = 100;

        function m3(){ 
            console.log(a++);
        }
        return m3;                         
    };

    var _m3 = m1();

    function m2(){
        _m3();
    }
    // 由于作用域的关系, m2可以调用m3等价于m2间接访问了变量a 在这个过程当中函数m3 起到了最关键的作用, 函数m3就是一个闭包
```

垃圾回收:
正常来讲 当m1执行结束的时候, 内部变量a就应该被回收, 之所以没有被回收 因为m3还在引用a



### **<font color="#C2185">例子1: </font>**
```js
    function fn(){
        var a = 2;

        function fn2(){
            console.log(a);
        };

        return fn2;
    };

    // 我们将fn()的返回值(也就是fn2函数赋予一个变量func)  然后我们实际调用func(), 理所当然的调用fn2(), 只不过通过不同的标识符

    var func = fn();
    func();
    /*  
        fn()在执行后按理来说它内部的作用域应该被垃圾回收机制回收, 但因为fn2的声明位置在fn的内部, fn2()拥有一个词法作用域闭包, 覆盖着fn()的内部作用域(fn2的作用域气泡 覆盖着fn的作用域气泡)

        fn2()的作用域闭包为了使fn2()以后在任意时刻都能引用这个作用域而保持它的存在, 这就叫做闭包

        当func()在调用时(调用的其实是fn2的内部函数), fn2理所应当的拥有对编写fn2时的词法作用域的 访问权, 所以fn2()可以访问到 a
    */
```

### **<font color="#C2185">例子2: </font>**
```js
    for(var i=0; i<5; i++){

        setTimeout(function timer(){
            cosole.log(i)
        },i*1000)

    }
```

我们的需求是 每隔一秒分别打印数字, 1 2 3 4 5 一秒一个
但是 实际得到的结果却是打印了5个6, 一秒一个

上面for循环的终止条件是, i不<=5, 也就是当i满足终止循环的条件时,i的值为6
所以输出的结果反映的是 i在循环结束后的最终值 那上面的代码缺少了什么? 让我们不能打印出需求

for循环在每次进行时, 都会 捕捉 一次 i, 循环体每执行一次, 就会创建一个函数, 执行5次就会创建5个函数, 虽然这5个函数在循环中分离定义, 由于作用域的工作方式, 他们都闭包在同一个共享的全局作用域中, 而事实上只有一个i, 这样所有的函数共享一个i的引用

### **<font color="#C2185">↑ 修改下上面的代码, 这样会好用么?: </font>**
```js
    for(var i=0; i<5; i++){

        (function(){
            setTimeout(function timer(){
                cosole.log(i)
            },i*1000)
        })()

    }
    // 依然不好用, 这样做确实把 超时函数 放在了一个封闭的函数作用域中, 但有用一个被闭包的 空的作用域 是不够的, IIFE只是一个空的什么都不做的作用域, 它内部还需要一些东西 才能变得对我们有用 IIFE需要一个自己的变量 每次循环时都能持有一份对 i 的值的拷贝

    for(var i=0; i<5; i++){
        (function(){

            var j = i;          --->  这里

            setTimeout(function timer(){
                cosole.log(j)
            },j*1000)
        })()
    }
```

### **<font color="#C2185">还可以改成这样 ↓ : </font>**
```js
    for(var i=0; i<5; i++){
        (function(j){
            setTimeout(function timer(){
                cosole.log(j)
            },j*1000)
        })(i)
    }
```

### **<font color="#C2185">实例1: </font>**
### **<font color="#C2185">需求: 点击li 输出当前li的index: </font>**
```js
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i=0; i<lis.length; i++){
    // 给li绑定点击事件
    lis[i].onclick = function(){

        // 在这个事件回调用不能直接打印 i
        // 因为事件回调是异步任务, 循环是同步任务循环会立马执行, 停止循环的条件是5, 所以点击任何的 li 输出的结果都会是5
        console.log(i);
    };
}
```

### **<font color="#C2185">那为了达到我们的需求, 我们会给lis[i] 添加一个index属性: </font>**
```js
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i=0; i<lis.length; i++){

    lis[i].index = i;               // 给lis[i] 添加了 index 属性

    lis[i].onclick = function(){
        console.log(this.index);
    };
}
```

### **<font color="#C2185">闭包的方式 得到 li 的当前index: </font>**
```js
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i=0; i<lis.length; i++){

    // 立即实行函数 立马会执行 这里利用for循环创建了4个的立即执行函数 立即执行函数就相当于独立的作用域 块级
    (function(){    
                
    })()      

}
```

\\\\    ↓   \\\\ 
```js
for(var i=0; i<lis.length; i++){

    (function(i){       // 2, 定义形参i 用来接收实参 IFEE的i的值是实参传递进来的

        console.log(i); // 4, 这时打印i 就会是0 1 2 3 4

    })(i)               // 1, 这个小括号可以接收一个参数, 我们把 i 传递进去
}
```

3, 当第一次循环时 i=0, 我们就会把0 传递到IFEE的实参中, 这时实参i就为0
5, 因为每次循环都会创建一个立即执行函数 第一轮循环时 把i=0传递进了IFEE中
    打印出了0
    第二轮循环时, 再次创建一个IFEE, 并把i=1传递进了IFEE中, 打印出了1 ...

这个IFEE每次都会创建IFEE, 而IFEE存的是当次循环里面的i值

\\\\    ↓   \\\\ 
```js
for(var i=0; i<lis.length; i++){

    (function(i){
        lis[i].onclick = function(){
            console.log(i);
        };
    })(i)
}
```

那有闭包的产生么?
有, 事件回调是一个函数, IFEE也是一个函数, 现在事件回调里的 i 是IFEE中的变量 也就是里面的函数, 使用了外部函数的变量 这就是一个闭包

<br>

### **<font color="#C2185">实例2:循环中的setTimeout(): </font>**
需求: 3秒钟后, 打印所有li中的内容
```js
var lis = document.querySelector('.nav').querySelectorAll('li');

for(var i=0; i<lis.length; i++){

    setTimeout(function(){

        console.log(lis[i].innerHTML);
        // cannot read property 'inndeHTML' of undefind

    },3000)
}
```

定时器的回调函数也是异步任务, 所以还是会出现和实例1中一样的情况 解决办法还是一样的, 我们每次循环的时候传递进去独一无二的i就可以了

\\\\    ↓    \\\\
```js
for(var i=0; i<lis.length; i++){

    (function(i){
        setTimeout(function(){
            console.log(lis[i].innerHTML);
        },3000)
    })(i)
    
}
```
只要在IFEE中的任何函数都可以使用IFEE中的变量, 这就是闭包的应用

<br>

### **<font color="#C2185">实例3:打车价格: </font>**
需求: 打车起步价格为13(3公里内), 之后每多一公里增加5块钱, 用户输入公里数就可以计算打车价格, 如果有拥堵的情况, 总价格要多收10块钱的拥堵费

之前我们都会先声明一个函数, 那这个函数最终一定会执行, 又要声明又要调用很麻烦, 所以我们就直接写在匿名函数里面, 就不需要调用了
    function fn(){};
    fn();

\\\\    ↓     \\\\

```js
var car = (function(){

    let start = 13;     //起步价
    let total = 0;      //总价

    // 这里有两个功能: 1 正常价格, 2 拥堵时的价格, 既然是两个函数我们可以这样
    return {
        // 1
        price:function(n){      //n为用户传递进来的参数, 代表公里数

            if(n<=3>){
                total = start;
            }else{
                total = start+(n-3)*5
            }

            return total;       // 最终把总价返回
        },

        // 2
        yd:function(flag){
            // 这里我们要判断是否是拥堵, 如果拥堵在原价上加10, 如果没有是原价
            return flag ?total+10 :total;
        }
    }
})()

car.price(5);
car.yd(true);

```

这是一个立即执行函数, 一执行后返回了两个函数, 既然有返回值, 我们就可以创建变量把返回值接回来, 我们定义了一个car 来接收返回的对象
car里有两个方法, 我们可以通过点的方式使用这两个方法

<br>

### **<font color="#C2185">名词解释: </font>**
### **<font color="#C2185">词法作用域: : </font>**
 也就是在词法阶段定义的作用域.
词法作用域意味着作用域是由书写代码时函数声明的位置来决定的.

js中其实只有词法作用域并没有动态作用域
this的执行机制让作用域表现的像动态作用域 this的绑定是在代码执行的时候确定的.

### **<font color="#C2185">迭代: </font>**
迭代计算是指迭代计算是重复计算工作表直到满足特定数值条件为止

### **<font color="#C2185">异步任务主要的三种情况: </font>**
1. 回调函数
2. 定时器中的回调函数
3. 事件中的回调函数
4. ajax中的回调函数

异步任务多是, 只有你触发了才会执行 比如定时器(setTimeout(function(){}.3000)) 3秒后 才执行,没有到时间是不会执行的,即使我们把3000改为0, 它也不立马执行
 而是把函数放到任务队列里

<br>

### **<font color="#C2185">思考题 下面的题中有没有闭包的产生: </font>**
```js
    let name = 'the Window';
    let obj = {
        name:'my object',
        getNameFunc: function() {
            return function() {         // 匿名函数中的this指向window
                return this.name;
            }
        }
    }

    console.log(obj.getNameFunc()())      // the Window
    let f = obj.getNameFunc();

    // 相当于
    f = function () {
        return this.name;
    }

    // 普通函数调用this指向window
    f();    
``` 

### **<font color="#C2185">↑ 对上解答 没有闭包的产生 因为内部函数没有用到外部函数的变量: </font>**

<br>

# 闭包 (另一个老师的理解)
### **<font color="#C2185">如何产生闭包？: </font>**
当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时就产生了闭包
```js
    function fn1(){
        var a = 2;
        function fn2(){
            // 这里我引用了外部函数的变量a fn2中的闭包里才有a属性
            console.log(a);     
        };
    };

    fn1(); 
```
 假如我只执行fn1 不执行fn2 fn2中的console能输出么？ 
那fn2这个函数对象有没有产生 产生了

<br>

### **<font color="#C2185">闭包到底是什么？: </font>**
我们可以通过chrome工具 通过debug调试来查看 
    理解一: 闭包是嵌套的内部函数(绝大部分人)
    理解二: 包含被引用变量(函数)的对象(极少数人)

注意: 闭包存在于嵌套的内部函数中


### **<font color="#C2185">产生闭包的条件？ : </font>**
执行函数定义就会产生闭包(不用调用内部函数)
函数嵌套, 内部函数引用了外部函数的数据(变量/函数) 还要执行外部函数

    <button>测试1</button>
    <button>测试2</button>
    <button>测试3</button>

需求: 点击某个按钮提示 点击的是第N个按钮

```js
    var bts = documen.getElementsByTagName("button");

    /*
        这里的bts是个数组么？不是 它是一个伪数组 而且.length不是一个固定的值而是在for循环内每次需要通过计算才能得到结果
        如果写bts.length要计算多遍
        那怎么做呢？ 要不然拿出去在外边定义
    */
    for(var i=0; i<bts.length; i++){        
        var obj = bts[i];
    }

    
    for(var i=0, length=bts.length; i<length; i++){

        // 减少多次计算, 提供性能 把bts[i] 存放到一个变量里面
        var btn = bts[i];
        btn.onclick = function(){
            
            // 这么写不对因为i是从0开始的
            alert("第"+  i +"个")
            alert("第"+  (i+1) +"个")   
        }
    }

    /*
        向上面这么写完点击按钮后全是第4个 那就说明i是3, 因为
        我们的函数在后面的某一个时刻才执行 当我这个函数执行的时候 循环已经结束了
        整个过程中产生了几个i 就一个i i是一个全局变量 在外面也能看到i 而我的函数还是在for循环执行完毕之后才执行, for循环执行完毕后 i是3, 也就是说这种写法不行
    */

   /*
        循环遍历加监听 肯定是要加的 就是最后我怎么才能得到一个正确的i呢？
        我们要把每一个i 要跟 btn 对应起来吧 也就是说 每一个btn都要知道自己的下标才行, 那我就把下标 等于 i
        btn.index = i;
    */

    for(var i=0, length=bts.length; i<length; i++){
        var btn = bts[i];
        // 将btn所对应的下标 保存在btn上
        btn.index = 1;
        btn.onclick = function(){
            alert("第"+  (this.index+1) +"个")   
    }   
```

### **<font color="#C2185">换个写法:  下面的写法就是闭包: </font>**
```js
    for(var i=0, length=bts.length; i<length; i++){
        (function(i){
            // 我把这段代码放在了 匿名函数自调用 里面
            var btn = btns[i];                  
            btn.onclick = function(){
                alert("第"+  (i+1) +"个")  
            };
        })(i);
    }
```

<br>

### **<font color="#C2185">闭包的常用写法: </font>**
```js
function aaa() {
    var a = 1;

    return function(){
        a++;
        alert(a)
    }
}

    var bbb = aaa();
    bbb();          // 2
    bbb();          // 3
    bbb();          // 4
```

### **<font color="#C2185">函数表达式的写法: </font>**
```js
    var aaa = (function () {
        var a = 1;
        return function () {
            a++;
            alert(a)
        }
    })()

    aaa()       // 2
    aaa()       // 3
    aaa()       // 4
```

### **<font color="#C2185">常见的闭包: </font>**
### **<font color="#C2185">将函数作为另一个函数的返回值: </font>**
```js
    function fn1(){
        function fn2(){

        };
        // 将内部函数作为外部函数的返回值
        return fn2;     
    };
    fn1();
```

上面的还没有产生闭包 正常要在fn1里定义一个变量然后fn2里引用这个变量才会产生闭包 
这次我换个引用方式
```js
    function fn1(){
        var a = 2;

        function fn2(){
            a++;
            // 引用就是使用
            console.log(a);     
        };
        return fn2;     
    };
    fn1();
    /*
        我外部执行得到了什么？ 得到了整个fn2
        那我可以用一个变量来存 没有输出a 没执行呢 但闭包产生了
        如果没有闭包 这行一执行var a = 2 就消失了
    */

    // 外部函数调用了一次
    var f = fn1();

    // 实际上是执行fn2 相当于 fn1()() 也就是调用的内部函数
    f();        // 3       
    f();        // 4       

    // 这里a在不断的累加 那就说明了一个问题 a没有消失 a是一个局部变量吧 是fn1里的局部变量
    // a什么时候产生 执行fn1的时候产生 局部变量在函数调用的时候产生调用结束后就会死亡 但是如果是3和4 那它就没有死亡
```

### **<font color="#C2185">上述的代码块中一共产生了几个闭包: </font>**
一个
如果我想产生两个闭包 该怎么办？ 就看你产生了几个内部函数对象 就看你调用了几次外部函数
<!-- 
    fn1() 这么一执行 我又把内部函数执行一次吧 说白了 怎么看闭包产生了几个 就看外部函数执行了几次
    因为你在执行外部函数的时候 才会执行内部函数对象 跟内部函数执行几次没有关系,     那也就是说 我在反复执行内部函数过程中 我闭包里的数据并没有消失 为什么没有消失呢？
 -->


### **<font color="#C2185">将函数作为实参传递给另一个函数调用: </font>**
```js
    function showDelay(msg, time){
        setTimeout(function(){
            alert("msg");
        }, time)
    }
    showDelay('atguigu', 2000);
```

有没有闭包？ 有 首先有外部函数 有内部函数 内部函数引用了外部函数变量 是因为msg 不是因为time

<br>

# 闭包的作用
1. 使用函数的变量在函数执行后仍然存活在内存中(延长了局部变量的生命周期)
2. 让函数外部可以操作(读写)到函数内部的数据(变量/函数)
```js
    function fn1(){
        var a = 2;
        function fn2(){
            a++;
            console.log(a); 
        };

        // 把fn2暴露出去 让外部能看见
        return fn2;                      
    };
    fn1(); 
    var f = fn1();  
    f();        // 3       
    f();        // 4  

    /*
        如果没有闭包 函数一执行完 局部变量就会立即释放 后面再想访问就不行了
        作为局部变量在外面看不见但事实上 我们却能在外部操作局部变量

        我们又看不见���部变量 但我们能用闭包的技术能够在外部操作局部变量 相当于间接可以访问, 譬如 我现在在函数内部有一个变量希望外部能读到这个a 但不希望被改变
    */
```

 > 问题: 
1. 函数执行完后函数内部声明的局部变量是否还存在？
    一般情况下是不存在的 但是存在于闭包中的变量才可能存在

2. 在函数外部能直接访问函数内部的局部变量么？
    不能但是通过闭包这个技术 让外部操作
```js
    function fn1(){
        // 这里的a 在函数执行后还存在么？ 存在 因为在闭包里
        var a = 2;

        function fn2(){
            a++;                        
            console.log(a); 
        };
        /*
            那这个fn2整个函数对象还在不在？ 不在了 没有人引用它 成为了垃圾对象
            括号前的fn2相当于一个局部变量 闭包里没有fn2 所以自动释放
        */


        // fn3呢？有自动释放么？fn3也不在闭包里 闭包里只有a 所以fn3这个变量在函数执行完后会被自动释放
        /*
            那你说连fn3都自动释放了函数对象不成为垃圾对象了么？可函数对象没有成为垃圾对象 为什么？
            是哪行导致fn3没有被释放的？ 是第11708行 我用变量f 指向了 11706行console.log(a);  函数对象
            也就是说闭包还存在没消失的原因是谁导致的？var f = fn1(); 中的f导致的
        */
        function fn3(){
            a--;                    
            console.log(a);             
        };
        
        return fn3;
        /*
            把fn3暴露出去(把内部函数 return)     return fn3 实际上 return的fn3的地址吧 里面保存的内容一旦返回后 fn3本身这个变量还在不在
            fn3本身不在了fn3虽然不在了但并不代表我函数对象成为垃圾对象了 为什么？因为 f 引用着
            只要有一个引用对象 指向着 这个对象这个对象是不会成为垃圾对象的 
        */
                          
    };

    fn1(); 

    var f = fn1();          
    f();        // 1       
    f();        // 0  

    /*
        这个函数对象关联这个闭包闭包里有a 关键点在于var f = fn1() f把返回值存起来了 
        假如这里改成fn1(); 后 执行完 fn3就不会存在了 
    */
```

<br>

# 闭包的生命周期

### **<font color="#C2185">产生:  : </font>**
在嵌套内部函数定义执行完时就产生了(不是在调用)定义执行不是函数执行 只是创建了函数对象

### **<font color="#C2185">死亡:  : </font>**
在嵌套的内部函数成为垃圾对象时
```js
    function fn1(){
        // 在这行闭包就存在了 因为函数提升 内部函数对象已经创建了
        var a = 2;

        function fn2(){ 
            a++;             
            console.log(a); 
        };

        return fn2;                             
    };

    // 这时候产生了闭包
    var f = fn1();
    f();        // 1       
    f();        // 0

    // 这时候闭包死亡 因为包含闭包的函数对象成为了垃圾对象也就是引用它的变量不再引用它了 
    f = null

    // 闭包是一个对象一个对象就有产生和死亡 执行完函数定义创建完内部函数就产生 
    function fn1(){
        var a = 2;    
        var fn2 = function(){       
            a++;             
            console.log(a); 
        };
        return fn2;           
    };
```

<br>

# 闭包的应用 ---- js自定义模块
什么是js模块, 具有特定功能的js文件, 将所有的数据和功能都封装在一个函数内部(私有的) 只向外暴露一个包含n个方法的对象或函数
模块的使用者 只需要通过模块暴露的对象调用方法来实现对应的功能

把下面的文件写在js文件中在外面还能看到下面的内容么？ 看不见 它是私有的数据 
```js
    function myModule(){
        ar msg = 'My aiguigu'
        function doSometing(){
            console.log('doSomething()' + msg.toUpperCase())
        }

        function doOtherthing(){
            console.log('doOtherthing()' + msg.toLowerCase())
        }
    }

// 将上面的js文件引入
script type="text/javascript"sc="myModule.js"

    myModule(); 

    // 执行它没意义啊 我执行它以后 js文件中的数据又释放掉了 还是不能去操作里面的msg 我得向外面暴露一些东西
    function myModule(){
        var msg = 'My aiguigu'

        // 操作数据的函数
        function doSometing(){
            console.log('doSomething()' + msg.toUpperCase())
        }

        function doOtherthing(){
            console.log('doOtherthing()' + msg.toLowerCase())
        }

        // 向外暴露
        return doSometing;
    }

    // 暴露doSometing出去后怎么用？
    var fn = myModule();  
    // 执行后 得到的是函数 把它放进fn中 这样再执行 相当于myModule()()
    fn();  
```

假如现在我想向外暴露doSometing doOtherthing怎么做？
现在我要暴露两个数据怎么办呢？
是不是用一个容器把这两个数据封装起来啊, 用什么容器？ 对象呗
```js
    // 向外暴露 给外部使用的方法
    return {
        doSometing:doSometing,
        doOtherthing:doOtherthing      
    }

    // 这么调用
    var module = mymodule();
    module.doSometing()
    module.doOtherthing()
```


### **<font color="#C2185">换一个写法: </font>**
```js
(function(){

    var msg = 'My aiguigu' 
    function doSometing(){
        console.log('doSomething()' + msg.toUpperCase())
    } 
    // 这部分还是私有的 不向外部暴露的话 外部是看不见的
    function doOtherthing(){    
        console.log('doOtherthing()' + msg.toLowerCase())
    }
})()
```

### **<font color="#C2185">之前是用return向外暴露如果是匿名函数自调用怎么向外暴露呢？,把这个要暴露的东西 添加到 window的属性: </font>**
```js
    window.myModule2 = {
        doSometing:doSometing,
        doOtherthing:doOtherthing   
    }
```


### **<font color="#C2185">外部是用匿名函数自调用写的: </font>**
上面的js文件写好后怎么用呢？
```js
script type="text/javascript"src="myModule2.js">

// 我直接就能看见我的模块对象 直接
myModule2.doSometing();
myModule2.doOtherthing();
```

### **<font color="#C2185">这两种方式哪个好一些？ 第二种: </font>**
第一种 要想获取 js模块 必须要先执行函数才行 var module = mymodule();
return后, 执行函数后 才能得到想要的闭包吧
第二种 一引用就能用了

### **<font color="#C2185">有的时候我们会这么写: </font>**
```js
    (function(window){
        var msg = 'My aiguigu'       
        function doSometing(){
            console.log('doSomething()' + msg.toUpperCase())
        }                                                     
        function doOtherthing(){    
            console.log('doOtherthing()' + msg.toLowerCase())
        }  

        window.myModule2 =  {
            doSometing:doSometing,
            doOtherthing:doOtherthing   
        }

    })(window);
// 这种写法有一个好处在代码压缩的时候 会把局部变量一些函数 变成abcd 也就是说 window可能会被压缩成w. 如果没有定义就不能压缩成w
```

<br>

# 闭包有什么样的缺点
1. 缺点
函数执行完后函数内的局部变量没有释放占用内存时间会变长, 容易造成内存泄漏

2. 解决
能不用闭包就不用, 及时释放
```js
function fn1(){
    var arr = new Array[100000];
    function fn2(){
        console.log(arr.length);
    };
    return fn2;
}

// 产生闭包了么？ 产生了 闭包死了么？ 没有 因为 f 在, 但是也有问题f在就会导致我的数组一直没有被释放
var f = fn1();   
// 解决办法 让内部函数 成为垃圾对象 回收闭包
f = null 
```

<br>

# 内存溢出 以及 内存泄漏

1. 内存溢出
一种程序运行出现的错误, 当程序运行需要的内存超过了剩余内存时就抛出内存溢出的错误
一个程序能拥有的内存空间是有限的 超出了这个空间程序就没办法运行 就崩溃了

```js
    var obj = {};
    for(var i=0; i<10000; i++){
        obj[i] = new Array(100000000)
    }

    // 这个循环遍历会产生很多个Array对象我要把所有的对象都放在obj里面去 怎么放进去 也就是obj占用的内存会特别大
    obj[i] = new Array(100000000)
```

2. 内存泄漏  意思是本来我有很大的内存可以用但是你泄漏了一部分的内存 我可用的内存变小了, 占用的内存没有及时释放, 内存泄漏积累多了就容易导致内存溢出

### **<font color="#C2185">常见的内存泄漏: </font>**
意外的全局变量
```js
    function fn(){
        // 这里程序员以为是局部变量
        a = 3; 
        console.log(a);
    }
    // 如果a =3 是局部变量的话 fn()调用完 a就会被释放 这就是意外的全局变量
    fn()
```

没有及时清理的计时器或回调函数
```js
    // 启动定时器后不清理
    var a = setInterval(function(){
        console.log('---');
    },1000)
    
    clearInterval(a);
```

<br>

# 递归函数
如果一个函数在内部可以调用其本身, 那么这个函数就是递归函数
简单的说就是自己调用自己的函数就是递归函数

递归函数的作用 和 循环效果一样 反复执行
由于递归很容易发生 '栈溢出' 的错误 所以必须要加条件 return
(因为每次调用函数都会开辟内存空间, 越开越多就死了)


### **<font color="#C2185">简单的写法: </font>**
```js
    // 在内部又调用了次自己
    function fn() {
        fn();
    }
    fn();
```
先执行全局中fn() 然后进入到fn函数内部 又再次调用fn, 又进入到这个函数内部 有点像for循环


### **<font color="#C2185">练习: 利用递归打印6句话: </font>**
```js
    let num = 1;

    function fn() {
        console.log(num);

        if(num == 6) {
            return;         // 递归里面必须加退出条件
        }

        num++;
        fn();
    }
    fn();
```
开启函数 然后打印console 然后判断等于6么 num++ 成为了2
再次调用fn 它会再回到函数内部的开头 再执行 再打印 再判断
当到6的时候 退出 因为console在上面所以会打印完6句



### **<font color="#C2185">求1 ~ n的阶乘 用户输入几 求1-n之间的阶乘: </font>**
```js
    function fn(n) {
        // 后一个数比前一个数大一 
        if(n == 1) {
            return 1;
        }
        return n * fn(n-1);
    }
    fn(3);
```

解析:
假如用户输入的是3

return 3 * fn(3-1)   =>   3 * fn(2)

到这里并不能返回一个值, 因为它必须得把fn(2)的结果拿到后才能返回
也就是说必须要把fn(2)的结果算出来才能返回

那fn(2)相当于再次调用fn这个函数此时里面传递的就是2了
    return 3 * fn(2)    =>   3 * (2 * fn(2-1))

然后还是因为fn(2-1)并不是个结果 它会继续求值

    fn(1)是多少? 1把 ok, 现在都有结果了
    3 * (2 * 1)


### **<font color="#C2185">利用递归函数求斐波那契数列(兔子序列): </font>**
1, 1, 2, 3, 5, 8, 13, 21...
用户输入一个数字n, 就可以求出, 这个数字对应的兔子序列值, 就是我输入的是位数, 返回的是这个位数所对应的数字
前两项相加正好等于第三项的和, 所以我们只需要知道用户输入的n的前面两项就可以计算出n对应的序列值
前两项 n-1 前面的第一项, n-2前面的第二项


### **<font color="#C2185">利用递归求: : </font>**
根据id返回对应的数据对象
```js
let data = [
    {
        id:1,
        name:'家电',
        goods: [
            {
                id:11, 
                gname:'冰箱'
            },
            {
                id:12, 
                gname:'洗衣机'
            }
        ]
    }, 
    {
        id:2,
        name:'服饰'
    }
]
```

需求:
我们想要输入id号, 就可以返回数据的对象

```js
// 查询数组的每一个对象 我们用forEach来做, 既然我们想输入id号, 那么我们可以封装成一个函数 

    // 里面有两个元素, 第一个是id为1的对象, 第二个是id为2的对象 
    function getId(obj, id) {
        obj.forEach(function(value, index){
        /*
            那现在我们就相当于拿到了两个最大的数组元素 分别是id1 id2的两个对象  
            接下来我们根据id去找元素 进行判断 每个元素都有一个id, 那么我们可以拿着用户输入的id和元素的id进行对比, 一样的话我们就返回
            如果元素的id 等于 用户输入的id
        */
        if(value.id == id) {
/* 
    这里我们就可以拿到数据了 但是我想要的是 用户输入id 我这边返回任意对象 
    现在是最外成的得到了 里层的呢?
*/
            console.log(value);

/*
    那怎么得到里层的数据呢? 继续forEach, 比如我们拿到了goods的数组 这个数组里面也有数组元素 我再次forEach然后根据id判断一下就可以拿到里面的相应数据了  
    那是不是相当于把现在这个函数再整体的执行一次呢? 这里我们就可以使用递归
    那怎么写呢?
    我么是先在外层来判断, 当外层没有的情况下我们再去里层判断 
    所以if是判断外层的, 那么我们可以写else if就是判断里层的
*/
 

/* 
    在这里面怎么判断, 首先得有goods这个数组吧 而且这个里面不能为空把 如果是一个空数组就不用遍历的 所以这里应该有两个条件 
    里面应该有个goods数组并且数组的长度不为0
*/
        } else if (value.goods && value.goods.length > 0) {
            // 在这个情况下我们去遍历数组, 在这里就没必要再去写forEach了
            getId(value.goods, id);
        }
    })
}
/* 
    可是递归不是要加退出条件的么? 递归是在forEach里面它里面有一个if和else 通过if else来判断到底要不要递归 
    我们再遍历的时候数组肯定是有一条两条之类的情况 果然条数遍历完了我就不在进行递归了 相当于给我加了退出条件
*/
    getId(data,11);
```

### **<font color="#C2185">总结: </font>**
```js
    function getId(json, id) {
        json.forEach(function(value, index){
            if(value.id == id) {
                console.log(value);                  
            } else if (value.goods && value.goods.length > 0) {
                getId(value.goods, id);
            }
        })
    }
    getId(data,11);
```
执行过程
首先传入id11, 然后走到elseif因为外层没有 进入内层 elseif里面再次调用函数, 
又回到最上方 这时传入的就是内部的value.goods 走到if部分 输出语句


### **<font color="#C2185">上面只是把数据打印出来了, 那怎么得到数据呢?: </font>**
```js
    function getId(json, id) {

        // 用来接收返回的数据
        let obj = {};

        json.forEach(function(value, index){
            if(value.id == id) {

                // 把获取到的外层数据保存到obj中
                obj = value;
                /*
                    这里把结果返回 为什么把返回结果写在if里面呢? 因为结果都是在if里面得到的
                    elseif只是负责递归函数而已
                */
                return obj;

            } else if (value.goods && value.goods.length > 0) {
                /*
                    这里会收到上面return value返回的结果, 也就是会获取到外层得到的结果
                    然后我们拿着这个结果去找value.goods
                    因为函数调用必要要有返回值
                */
                obj = getId(value.goods, id);
            }
        })

        // 我们在forEach的外面把obj返回来
        return obj
    }
    // 有返回值了 那就必须要接受结果
    let result = getId(data,11);
    console.log(result);    { 空对象 } 
    /*
        因为getId(value.goods, id); 这句 
        调用完函数必须要有个返回的结果 得重新更新一下我们的obj, 因为上面的obj只是外成的结果 所以我们必须要把用里层的结果把外层的obj结果覆盖掉
        返回值可以在外层的if里面得到
    */
```

<br>

# 浅拷贝 和 深拷贝
浅拷贝只是拷贝一层, 更深层次对象级别的只拷贝引用
深拷贝拷贝多一层, 每一级别的数据都会拷贝

在以前如果想拷贝数据到另外一个对象里面 需要用到for in遍历对象
```js 
    // 需求 把这个对象拷贝给另外一个对象

    let obj = {
        id:1,
        name:'andy'
    };

    let obj2 = {};
        
    // 我们可以使用for...in 遍历obj
    for(key in obj) {
        console.log(key);       //属性名
        console.log(obj[key]);  // 属性值

        // 给一个对象添加属性的时候 obj.name = value, 给obj2添加属性
        obj2[key] = obj[key];
    }
    console.log(obj2);

    结果:
        id: 1
        name: "andy"
        msg: {age: 1}
```

### **<font color="#C2185">↑ 总结: </font>**
 - 结果看似没有问题, 其实拷贝的是msg的地址, 这个地址存的还是obj里面的地址值
也就是说明一个问题 既然是地址值拷贝给了o, 那么我通过o修改msg里面的值 会影响到原来obj里面的值
```js
    // 我们修改o中的数据 会影响到obj里面的数据
    o.msg.age = 2;
    console.log(o.msg.age);     //2
    console.log(obj.msg.age);   //2

    // 这就是浅拷贝, 把更深层次的对象的地址值拷贝给了o o和obj指向了同样的数据 修改其中的任何数据, 都会影响另外的数据
```


### **<font color="#C2185">Object.assign(拷贝给谁, 拷贝哪个对象);: </font>**
ES6中的浅拷贝的新方法
<!-- 
    Object.assign(o, obj);
    console.log(o);
 -->

<br>

# 深拷贝
深拷贝就是拷贝多层, 每一层的数据都会拷贝
深拷贝会把更深层次的对象, 重新开启一个新的空间, 把数据复制到新空间里, 再把新空间返回给对象, 这两新对象和被拷贝的对象互补干扰

```js
    let obj = {
        id: 1,
        name: 'andy',

        msg: {
            age:1
        },
        color: ['pink', 'red', 'blue']
    };

    let o = {}

    // 核心思路:
    // obj中id 和 name都是简单数据类型 msg是一个对象, 如果是一个对象那就利用for in来遍历里面的属性名

    // 封装一个拷贝函数 参数: 拷贝给谁, 拷贝谁 
    function deepCopy(newobj, oldobj) {

        for(let k in oldobj) {

            // 判断是简单类型的数据 还是 复杂类型的数据 如果是简单的就是浅拷贝的方法, 如果是复杂的类型那就再次进入
            // 获取属性值 oldobj[k]
            let item = oldobj[k];

            // 判断这个值是否是数组
            if(item instanceof Array) {

                // 如果是一个数组 就把这个数组给新对象的属性
                newobj[k] = [];
/*
deepCopy(newobj, oldobj);
相当于 o.color = []
重新再次递归一下 拷贝是color: ['pink', 'red', 'blue']
['pink', 'red', 'blue'] 这是部分是属性值 也就是 let item = oldobj[k];
也就是item
给谁呢? 也就是newobj是谁呢? 给新对象的属性名
*/
                deepCopy(newobj[k], item);

            // 判断这个值是否是对象
            } else if (item instanceof Object) {  
                newobj[k] = {};
                deepCopy(newobj[k], item);

            } else {
                // 属于简单数据类型
                newobj[k] = item;
            }
        }
    }
    deepCopy(o, obj)
    console.log(o);
    // 最终格式
    // {id: 1, name: "andy", msg: {…}, color: Array(3)} 
```

### **<font color="#C2185">完整代码: </font>**
```js
    function deepCopy(newObj, oldObj) {

        for(let k in oldObj) {

            let item = oldObj[k]

            if(item instanceof Array) {
                newObj[k] = []
                deepCopy(newObj[k], item)

            } else if(item instanceof Object) {
                newObj[k] = {}
                deepCopy(newObj[k], item)

            } else {
                newObj[k] = item
            }
        }
    }
```

<br>

### 深拷贝方式2:
```s
https://developer.mozilla.org/zh-CN/docs/web/api/structuredClone
```
**let newObj = structuredClone(obj)**

<br>

# H5 Web Workers(多线程)
H5规范提供了js分线程的实现取名为 Web Workers
它是H5提供的一个js多线程解决方案, 我们可以将一些大计算量的代码 交给web worker运行而不冻结用户界面

但是子线程完全受主线程控制且不得操作DOM(只能是主线程操作页面) 所以这个新标准并没有改变js单线程的本质

### **<font color="#C2185">相关Api: </font>**
worker: 构造函数加载分线程执行的js文件
worker.prototype.onmessage: 用于接收另一个线程的回调函数
worker.prototype.postMessage: 向另一个线程发送消息

### **<font color="#C2185">不足: : </font>**
worker内代码不能操作DOM(更新UI)
不能跨越加载JS, 不是每个浏览器都支持这个新特性
<!-- 
    编程实现 斐波那锲数列 (Fibonacci sequence)的计算
    F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)

    <input type="text" placeholder="数值" id="number">      
    <button id="btn">计算</button>

    怎么设计一个函数 给它一个值 能对应的返回 斐波那契呢？
 -->

```js
function fibonacci(n){
    // 递归调用 函数内部调用自己  递归的效率是比较低的
    return n<=2 ?1 :fibonacci(n-1) + fibonacci(n-2);
};

var input = document.getELementById("number")
var btn = document.getELementById("btn");
btn.onclick = function(){
var number = input.value;               
var result = fibonacci(number);    // 我们要把这条语句交给分线程
alert(result);
```

 上面的计算量太大导致在计算的时间中 用户不能操作浏览器等待时间过长 怎么把长时间的操作 放在 分线程里操作
我要把number 传递给 分线程 分线程去计算 计算完以后把结果(result在分线程产生)返回主线程主线程拿到结果更新页面提示 


### **<font color="#C2185">web worker: </font>**
### **<font color="#C2185">创建在分线程执行的JS文件: </font>**
```js
    // 不能用函数声明
    var onmessage = function(event){    
        console.log('onMessage()22');

        // 通过event.data获得发送来的数据
        var upper = event.data.toUpperCase();

        // 将获取到的数据发送回主线程
        postMessage(Upper);
    }
```

### **<font color="#C2185">在主线程中的我们向分线程发消息并设置回调: </font>**
```js
    // 创建一个worker对象 并向它传递将在新线程中执行的脚本的url
    var worker = new Worker('worker.js');

    // 接受worker传过来的数据函数
    worker.onmessage = function(event){
        console.log(event.data);
    };
    // 向worker发送数据      向分线程发送消息
    worker.postMessage('hello, world');
```

### **<font color="#C2185">在主线程里的代码: </font>**
```js
var input = document.getELementById("number")
var btn = document.getELementById("btn");
btn.onclick = function(){
    var number = input.value;    

    // 将number想办法传递给分线程 创建一个worker对象
    var worker = new Worker(这里写 在分线程里执行的 js文件地址比如'worker.js');

    // 绑定接收消息的监听
    worker.onmessage = function(event){
        console.log('主线程接收分线程返回的数据'+event.data);
        console.log(event.data);
    };

    // 向分线程发送消息
    worker.postMessage(number);
    console.log('主线程向分线程发送数据'+number);
};

// 下面写分线程的代码 要在一个js文件中写 要写一些固定的东西
function fibonacci(n){
    return n<=2 ?1 :fibonacci(n-1) + fibonacci(n-2);
};

var onmessage = function(event){  
    var number = event.data;
    console.log('分线程接收到主线程发送的数据'+number);

    // 计算
    var result = fibonacci(number); 
    // 将获取到的数据发送回主线程
    postMessage(result);
    console.log('分线程向主线程返回数据'+result);  
}
```

我们思考下 在分线程 打印this this是谁 全局上面的属性和方法我们直接可以使用
分线程中的this指向了 DedicatedWorkerGlobalScope这个全局对象

我们平时在全局里面可以直接使用document 因为document是window的属性嘛

问题是 我在分线程里能不能调用主线程的方法
因为主线程的全局对象是window
分线程的全局对象是DedicatedWorkerGlobalScope

比如 alert是window的方法 能在 分线程里使用么？ 不能

前面说过在分线程里不能操作界面 因为在分线程里看不到window
分线程中的全局对象不再是window所以在分线程中不可能更新界面 因为更新界面要用window和document里的方法

<br>--

# 本地存储 (localStorage, sessionStorage)
随着互联网的快速发展, 基于网页的应用越来越普通, 同时也变的越来越复杂, 为了满足各种各样的需求, 会经常性在本地存储大量的数据, HTML5规范提出了相关解决方案
<!-- 
    以前我们会把数据放在数据库里, 还要去服务器里面取过来再拿来使用 
    也有些东西根本就没有必要放在数据库里面
 -->


### **<font color="#C2185">位置查看: </font>**
F12 --- Application --- 左侧 Storage Session Storage


### **<font color="#C2185">本地存储的特性: </font>**
1. 数据存储在用户浏览器中
2. 设置, 读取方便, 甚至页面刷新都不会丢失数据
3. 容量较大
    - sessionStorage    约5M
    - localStorage      约20M

4. 只能*存储字符串*, 可以*将对象JSON.stringify()*编码后存储


### **<font color="#C2185">5M的单位: </font>**
10M字节空间.
而根据 UTF-16编码规则要么2个字节要么四个字节所以不如说是 10M 的字节数更为合理.

```js
"a".length      // 1
"人".length     // 1
"𠮷".length     // 2
```

key的长度也会占用空间


### **<font color="#C2185">window.sessionStorage: </font>**
生命周期为关闭浏览器窗口
在同一个窗口(页面)下数据可以共享
以键值对的形式存储使用的

>sessionStorage.setItem(key, value);
存储数据
把数据存储在浏览器里 不关闭页面数据会一直存在

修改数据
在原来的数据上再次存储就是修改呗


### **<font color="#C2185">sessionStorage.getItem(key);: </font>**
获取数据

### **<font color="#C2185">sessionStorage.removeItem(key);: </font>**
删除数据

### **<font color="#C2185">sessionStorage.clear();: </font>**
清空数据
```js 
    let set = document.querySelector('.set');
    let get = document.querySelector('.get');
    let remove = document.querySelector('.remove');
    let del = document.querySelector('.del');
    let text = document.querySelector('input');

    set.addEventListener('click', function(){
        // 当我们点击了之后, 就可以把表单里面的值存储起来
        let val = text.value;

        sessionStorage.setItem('uname', val);

        // 点击一次存到uname中 再点击一次存到pwd中
        sessionStorage.setItem('pwd', val);
        console.log(val);
    })

    get.addEventListener('click', function(){
        sessionStorage.getItem('uname')
        // let result= sessionStorage.getItem('uname');
        console.log(result);
    })

    remove.addEventListener('click', function(){
        sessionStorage.removeItem('uname')
    })

    del.addEventListener('click', function(){
        sessionStorage.clear()
    })
```

<br>

### **<font color="#C2185">window.localStorage: </font>**
声明周期永久生效, 除非手动删除 否则关闭页面也会存在
可以*多窗口(页面)共享*, 同一浏览器都可以使用这个数据
以键值对的形式存储使用

>> localStorage.setItem(key, value);
存储数据

修改数据
在原来的数据上再次存储就是修改呗

### **<font color="#C2185">localStorage.getItem(key);: </font>**
获取数据

### **<font color="#C2185">localStorage.removeItem(key);: </font>**
删除数据

### **<font color="#C2185">localStorage.clear();: </font>**
清空数据

<br>--

# 案例 记住用户名
如果勾选记住用户名, 下次用户打开浏览器 就在文本框里面自动显示上次登录的用户名

案例分析:
把数据存起来, 用到本地存储
关闭页面, 也可以显示用户名, 所以用到localStorage
打开页面, 首先先判断是否有用户名这个数据, 如果有, 就在表单里面显示用户名, 并且勾选复选框

当复选框发生改变的时候 change事件
    - 如果勾选, 就存储 否则就移除

<br>--

# 一、基础总结深入 - 数据类型

### **<font color="#C2185">基本类型(值类型): </font>**
    string      值为    任意字符串
    number      值为    任意的数字
    boolean     值为    true false
    undefined   值为    undefined
    null        值为    null


### **<font color="#C2185">对象类型(引用类型): </font>**
    Object      值为    任意对象
    Function    值为    一种特别的对象(可以执行 内部包含着可运行的代码)
    Array       值为    一种特别的对象(数值下标(操作数据要用数值下标、内部数据是有序的))

<br>

# 判断数据类型
如何判断因为不同数据类型 行为不一样  不知道类型的话就不知道怎么操作

<br>

# 对数据类型进行判断的方式:
### **<font color="#C2185">typeof: </font>**
返回值: 数据类型的字符串表达
说白了返回的是字符串既然是字符串 那就是要加上引号

可以判断一个值是否是
    undefined / number / string / boolean / function

不能判断的是
    null / Object / Array


### **<font color="#C2185">===  : </font>**
可以判断一个值是否是undefined / null  ---> 因为这两个类型就一个值
```js
    var a = null;
    console.log(a === null);
    var a = undefined;
    console.log(a === undefined);
```               
    
### **<font color="#C2185">instanceof: </font>**
返回值:   布尔值
语法:     A instanceof B    A是不是B的实例
它可以间接的判断A的类型 是不是一个对象？ 或者 是不是一个数组？
    A instanceof B

A是不是B的实例 那也就是说B应该是一个 构造函数(因为在JS里类型是通过构造函数去表达的),判断对象的具体类型(它会判断这是一个函数 还是一个数组) 

<br>

# 具体使用的方式:
### **<font color="#C2185">使用typeof 和  === 判断基本类型: </font>**
返回的是: 数据类型的字符串表达(说白了返回的是字符串)
可以判断一个值是否是undefined / number / string / boolean

```js
    var a;
    console.log(a, typeof a)                    //undefined 'undefined'
    console.log(undefined === 'undefined')      //false
    // 我们判断typeof a 等不等于 一个类型要这么写  typeof a === "undefined" 
    // 引号不要忘记 因为typeof返回值为一个字符串

    var a = undefined;
    console.log(a === undefined);           //true
    var a = 3;
    console.log(typeof a === "number");     //判断a的类型
    var a = "aiguigu";
    console.log(typeof a === "string");     //判断a 等不等于 字符串类型
```

### **<font color="#C2185">使用 instanceof 判断对象      是 数组 / 对象 / 函数?: </font>**
语法: 
    A instanceof B    A是不是B的实例
<!-- 它可以间接的判断A的 具体类型 是 数组 / 对象 / 函数 -->

```js
    console.log(b1 instanceof Object);
    console.log(b1 instanceof Array);
    console.log(b1 instanceof Function);

    // 其中 函数 还可以用typeof来判断
    console.log(typeof b1.b3 === 'function')       //别忘了typeof的值是一个字符串 'function'

```

### **<font color="#C2185">案例1: </font>**
```js
// 创建一个对象
var b1 = {
    // b2是一个数组里面有numberstring函数
    b2:[1, 'abc', console.log],


    // 怎么知道console.log是什么数据类型
    console.log(typeof b1.b2[2] === 'function')  true

    // 那b1.b2[2]既然是个function, 那就可以b1.b2[2]()
    b1.b2[2](4); === console.log(4);

    b3:function(){
        console.log(b3);
    }
};
```

需求:
区别上面这b1,2,3的类型

### **<font color="#C2185">判断 b1 的类型:  : </font>**

    console.log(b1 instanceof Object);      //true
 
    A instanceof B --- > A是不是B的实例

那也就是说B应该是一个 构造函数(因为在JS里类型是通过构造函数去表达的)
Object是一个 构造函数(平时的时候对象是 new Object()创建的吧所以Object是一个构造函数)
b1 是一个实例对象

 
### **<font color="#C2185">判断 b2 的类型: : </font>**
    console.log(b1.b2 instanceof Array, b1.b2 instanceof Object,);  //true true

判断b2是数组还是对象 -> 既是数组 也是对象
        

### **<font color="#C2185">判断 b3 的类型: : </font>**
    console.log(b1.b3 instanceof Function, b1.b3 instanceof Object);

判断b3是函数还是对象 -> 既是函数 也是对象

<br>

### **<font color="#C2185">案例2: </font>**
我在函数内部 return一个函数, 那么这个函数怎么调用?

```js
    var b1 = {
        b2:[1, 'abc', console.log], 
        b3:function(){
            console.log(b3);

            return function(){
                return 'xfzhang'
            };    
        }
    };

    b1.b3();  // 现在我得到的是 第一个return

    return function(){
        return 'xfzhang'
    }; 

    b1.b3()();  // 得到的是 第二个return  return 'xfzhang'

    // 怎么打印？
    console.log(b1.b3()());  //不要纠结于表面我们要看 我们得到的是什么类型的数据 才能知道下一步怎么操作
```

<br>

# 关于数据类型的三个问题

### **<font color="#C2185">undefined与null的区别？: </font>**
都代表什么东西都没有

    undefined   代表 定义了    没赋值
    null        代表 定义了    并赋值   值为null

```js
    var a;
    console.log(a);     //undefined

    var a = null;
    console.log(a);     //null
```

### **<font color="#C2185">什么时候给变量赋值为null呢？: </font>**
初始赋值表明将要赋值为对象
结束赋值让对象成为垃圾对象
    var b = null;
<!-- 
    初始赋值为null表明将要的赋值为对象这样可以让下一个人知道 这个b即将要被赋值一个对象 
    确定对象(或者数据来了) 就赋值
-->

    b = [12, 'atguigu'];
    b = null;
<!-- 最后释放数组所占用的内存让b指向的对象成为垃圾对象(被 垃圾回收器 回收) -->


### **<font color="#C2185">严格区别变量类型与数据类型？: </font>**
数据的类型
    基本类型 和 对象类型

变量的类型(变量内存值的类型变量本身是没有类型的)        
    基本类型 和 引用类型 

### **<font color="#C2185">变量什么时候是基本类型: : </font>**
保存的是基本数据类型的数据 

### **<font color="#C2185">变量什么时候是引用类型: : </font>**
保存的是地址值 
    
    var c = {};
<!-- 
    这是我的对象数据这是数据是个对象 有人会说这是引用类型 何为引用类型？ 
    c里面存的是什么？ 存的是内存地址这个类型的引用 对象在堆内存里 c在栈内存里c保存的不是对象 保存的是地址值 c本身不是对象只是说c能找到对象它保存的是内存地址
 -->

很多时候我们判断变量的类型 其实是在判断 值的类型

    var c = function(){ ... }; 
<!-- 
    这个c是不是引用变量？是吧 函数是一个对象 我们将函数对象的地址值保存在c中
    那我们用typeof c

    console.log(typeof c);      //返回的是 "function"  
    它是怎么知道的？只看c 只看值？是function的  它只能根据存储的内容找到这个内存才能发现它是个函数对象 
-->

<br>

# 什么数据？
存储在内存中代表特定信息的'东西'本质是010101...
数据的特点: 
    1. 可传递
    2. 可运算

一切皆数据
内存中所有操作的目标是: 数据
    1. 算术运算
    2. 逻辑运算
    3. 赋值运算
        var a = 3;
        var b = a;      //拷贝a的内容赋值给b
    4. 运行函数

<br>

# 什么是内存？
内存条通电以后产生的可存储数据的空间(临时的因为要通电嘛)
内存产生和死亡: 
内存条(电路板)---> 产生内容空间 ---> 存储数据 ---> 处理数据 ---> 断电 ---> 内存空间和数据都消失

一块小内存的两个数据
1. 内部存储的数据
2. 地址值数据 标识一块内存的

    var obj = {name:"tom"};
    console.log(obj.name);

### **<font color="#C2185">↑ 思考: : </font>**
<!-- 
    输出obj.name先找obj吧 读的obj内部存储的内容还是内部存储的地址？
    读的是内容 只是这个内容是个地址值   .的作用是什么？

    .的作用相当于 拿着ox123沿着箭头找到对应的内存
    是不是所有的变量都能 . 呢？ 什么样的变量才能 . 呢？

    是不是这个变量存的是内存地址才能 . 啊
    name:'tom'      内存中的小标识 : 内存中存储的数据
 -->
        

内存中 每一个小内存都有对应的地址值 这个内存是个对象 它的地址值我们就用 其他的都不用 其他的用内存中存储的数据

    栈内存              堆内存
    a = 0x123           ox123
    obj: 0x123          name:'tom'

    var a = obj;

<!-- 
    我们是在用obj的地址值么？不是
    是将obj的地址值赋值给a么？不是

    而是将里面的数据拷贝一份保存到a中只有一种情况才会读地址值 将一个对象赋值给谁的时候读的才是
    地址值 其他的时候都是在读内存内容只是内存里有两种数据 一种是基本数据 一种是地址值数据
 -->

栈空间的小内存它可以存基本类型的数据 也可以存地址类型的数据 如果它存的是地址数据 我们称之为引用变量

### **<font color="#C2185">内存的分类: </font>**
    栈  ---> 全局变量 和 局部变量
    堆  ---> 对象

<!-- 函数名在 栈 里面因为它本身是变量名 对象本身在堆空间里 -->

<br>

# 什么是变量？
可变化的量它由变量名 和 变量值 组成 每个变量都对应一块小内存

    变量名: 用来查找对应的内存
    变量值: 内存中保存的数据

    var age = 18;
    console.log(age);

<!-- console.log的执行过程就是拿着age的名字去找到名为age存18的空间找到以后读取内部保存的数据 -->

    内存数据变量三者之间的关系
    内存: 用来存储数据的空间(临时空间)硬盘是永久空间(慢)
    变量: 内存的标识

<br>

# 变量中保存的是什么?

 a内存中到底保存的是什么？
    var a = xxx;    

xxx是基本数据保存的就是这个数据
    var a = 3;

xxx是对象保存的是对象的地址值
    var a = {};
<!-- xxx是变量保存的是xxx的内存内容(可能是基本数据也可能是地址值) -->

<br>

# 引用变量赋值的问题
将变量的内容赋值给另一个变量如果是对象的话 就是将内容内的内存地址赋值给另一个

N个引用变量指向同一个对象通过一个变量修改对象内部数据其他所有变量看到的是修改之后的数据
两个引用变量指向一个对象让其中一个引用变量指向另一个对象另一个引用变量依然指向前一个对象

### **<font color="#C2185">情况1: </font>**
```js
    var obj1 = {name:"tom"};

    // 将obj1的内存内容保存到obj2 只是obj1的内存内容是地址值 让两个obj指向同一个对象
    var obj2 = obj1;    

    obj1.name = "jack";
    console.log(obj2.name);     //jack 


    // 定义一个函数 接收obj
    function fn(obj){     
        obj.name = "bob";
    };

    fn(obj1);  
    /*
        执行的时候是 实参 赋值给 形参就是将obj1的内容(内存地址) 赋值给了形参也就是说 现在有3个变量指向了同一个对象
        然后都指向了 name:tom 然后在函数内部被修改为bob
    */
                        

console.log(obj2.name);     // 是tom 是bob？  bob
```

### **<font color="#C2185">情况2: </font>**
```js
    var a = {age:12};

    // 两个引用变量指向一个对象
    var b = a; 

    a = {name:"bob"};
    console.log(b);         // b里有name的属性么？ 没有

    a = {name:"bob", age:13};

    // 这里不是自己想的 对var a = {age:12};这个进行了修改而是直接指向了别的对象
    console.log(b.age, a.name, a.age);      //12 bob 13

    // b还是a = {age:12}; 这个对象 a已经指向了别的对象分离了 各是各的
```


>> 让其中一个引用变量指向另一个对象 另一个引用变量依然指向前一个对象

### **<font color="#C2185">接着来: </font>**
```js
    function fn2(obj){
        obj = {age:15}
    };
    fn2(a);

    console.log(a.age);     //a是多少？     13还是15？      13
```

    将a = {name:"bob", age:13};作为实参 传递给了 形参obj 
    这时候他俩同时指向一个 都是13

    但是函数内部把obj指向了另一个对象所以 这时候 他们分别指向了各自的对象
    上面有两个要点一是a没有变二是仍然指向的是a之前的内容 所以是13

    obj = {age:15}这个是函数内部的 它将成为垃圾对象因为函数执行完函数就会关闭局部变量就会释放



### **<font color="#C2185">再来一题: </font>**
```js
    function fn(obj) {
        obj.name = "bob";
    }

    and

    function fn(obj) {
        obj = {age:15};
    }

obj.name = "bob";  和  obj = {age:15}  是不一样的

    obj.name = "bob"  // 是原有的对象上增添属性
    obj = {age:15}    // 是修改引用变量的值(内存地址)

// a.age 中的 . 是找对象的意思 先可以这么理解
```

<br>

# 调用函数时 传递变量参数是值传递 还是 引用传递
### **<font color="#C2185">理解1: : </font>**
都是值传递无论是基本数据还是引用变量 传递的都是变量的内容 或者说是值只是这个值 有两种情况 基本值还是地址值 都是变量内部存储的数据

### **<font color="#C2185">理解2: : </font>**
可能是值传递 也可能是引用传递(地址值)
首先要知道 这里的a 和 函数中的形参a 不是一个东西 虽然长的一样
```js
    var a = 3;

    function fn(a){
        a = a+1;
    };

    fn(a);               
    console.log(a);     //为啥不是4？
```

### **<font color="#C2185">↑ 解析: : </font>**
<!-- 这里的a是一个变量 -->
    var a = 3;

<!-- 这里的形参a是一个新的变量 -->
    function fn(a){ ... }

<!-- 
    这里我传递的不是a 一定要记住 传递的是3
    也就是说传递完后 跟var a = 3;中的a 就没有关系了 使用的只是数据而已
 -->
    fn(a);


我们说对一块内存有哪些操作? 
两种 要么就读 要么就写
一般 = 号左边的就是写(被赋值)= 号右边就是读
<!-- 
    这里相当于var a = 3里的a的值赋值给 function fn(a)中的a(形参变量a) = a(全局变量) 
-->
    function fn(a) { ... }


### **<font color="#C2185">对于值传递的时候, 对引用类型的值传递的解释: </font>**
1.  function fn2(obj){
2.      console.log(obj.name);
3.  };
4.  var obj = {name:"Tom"};
5.  fn2(obj);
<!-- 
    5中fn2(obj); 调用fn2函数 传了一个obj, 那就要先读到obj的值(4. obj是对象只能读地址值吧) 

    读到这个对象{name:"Tom"}的地址值

    5中的obj读到地址值后 把地址值 赋值 给 1中的 形参obj

    最怕这么理解
    var obj = {name:"Tom"}; 把5中的{name:"Tom"}对象 直接传递形参obj
 -->

<br>

# JS引擎如何管理内存
var a = 3;
<!-- 执行这条语句的时候 需要被分配一个小空间 -->

var obj = {};
<!-- 首先上面的两条语句 占用了3个空间 a obj {} -->

obj = null;
<!-- 对象的空间释放了但是obj自己没有释放 -->

function fn(){
<!-- 
    这行的时候还没有产生变量局部变量要在被调用时产生函数完毕后死亡 自动释放 
-->
    var b = 4;      
};
fn();


### **<font color="#C2185">内存生命周期: </font>**
1. 分配小内存空间 得到使用权 
2. 存储数据可以反复进行操作
3. 释放当前的小内存空间不释放的话 内存一直被占用着


### **<font color="#C2185">释放内存: </font>**
1. 局部变量 函数执行完自动释放
2. 对象     首先要成为垃圾对象在后面由垃圾回收器回收

<br>

# 对象相关问题

### **<font color="#C2185">什么是对象: </font>**
对象可以存储多个数据 变量只能存一个或者是用来保存多个数据的容器
一个对象代表现实世界中的一个事物一个事物身上有多个数据用编程语言来描述显示世界的事物 就用对象来描述
    var p = {
        name:"Tom",
        age:18,
        setName:function(name){
            this.name = name;
        }
        setAge:function(age){
            this.age = age;
        }
    }


### **<font color="#C2185">为什么要用对象: </font>**
统一管理多个数据


### **<font color="#C2185">对象的组成: </font>**
属性    属性名(字符串) 和 属性值(任意类型) 组成 
方法    一种特别的属性 setName setAge 属性值是函数的就是方法


### **<font color="#C2185">如何访问对象内部数据: </font>**
console.log(p.name);
访问对象内部方式之一

### **<font color="#C2185">.属性名: </font>**
才能得到属性值
<!-- 之后得判断数据类型是什么 如果是一般的属性可以读 -->
     
<!-- 
    假如我想调用setName 这么写行不行p.setName 这么写会输出p.setName的值 它的值是整个函数 首先你得先知道前面得到的是一个函数  后面才知道怎么调用
    平常函数是用来执行的

    p.setName();
 -->

    
访问对象内部方式之二
### **<font color="#C2185">["属性名"]: </font>**

现在我还是要调用setAge
    p['setAge'](123);
    p['age']

<!-- 方式一比方式二简单一些 方式一有的时候不能用 方式二可以通用 -->

### **<font color="#C2185">什么时候必须使用['属性名']的方式？: </font>**
1. 属性名包含特殊字符:  - 空格
<!-- 
    不确定的东西用什么存储变量名也是个数据吧(字符串) 用一个变量来存储这个变量名 
-->

    var p = { ... };

<!-- 给p对象添加一个属性: content-type:text/json -->
    p.content-type = "text/json"    //报错了
    p['content-type'] = "text/json" // p['content-type']


2. 变量名不确定
    var propName = 'myAge';
    var value = 18;

    怎么把这个属性添加到p上面去
    p.propName = value;

    p[propName]= value;     // propName 是变量名 所以不用加''

<br>

# 函数相关问题

### **<font color="#C2185">什么是函数？: </font>**
具有实现特定功能的n条语句的封装体, 只有函数是可以执行的 其他类型的数据不能执行

### **<font color="#C2185">为什么要用函数？: </font>**
提高代码复用, 便于阅读交流
代码写出来之后 是程序员之间互相查看的 函数体现的是一种封装的思想 看一遍函数的封装体之后就懂了

### **<font color="#C2185">如何定义函数？: </font>**

>函数声明
    function fun(){
        console.log();
    };
<!-- 变量提升 -->

### **<font color="#C2185">函数表达式: </font>**
    var fun = function(){ ... };


### **<font color="#C2185">如何调用函数？: </font>**
执行调用:  
test();

通过对象调用:  
obj.test();

通过new调用: 
new test();

### **<font color="#C2185">test.call(obj) / apply(obj);: </font>**
临时让test成为obj的方法进行调用
这种方法相当于 obj.test(); 但是obj上面没有test方法
    
        var obj = {};

        function test2(){
            this.xxx = "aiguigu";
        };
<!-- 
    假如我想用obj调用test2 能直接这么写么？
    obj.test2(); 不行吧 它没有这么方法怎么调呢？
    JS中强大的地方就在这里我可以让一个函数 成为任意一个对象的方法 来进行调用
    test2.call(obj);    
    可以让一个函数成为 指定任意对象的方法来进行调用
 -->

<br>

# 回调函数

### **<font color="#C2185">什么是回调函数？: </font>**
1. 你定义的
2. 你没有调
3. 最终它执行了 在某个时候或者某个条件下(比如 定时器 或者 点击按钮)具备这三点就是回调函数


### **<font color="#C2185">常见的回调函数？: </font>**
1. dom事件回调函数      与用户交互最关键的点
2. 定时器回调函数

3. ajax请求             与后台交互最关键的点
4. 生命周期回调函数


### **<font color="#C2185">前端主要是: </font>**
1. 制作页面
2. 交互, 这里的交互指的是两个方面
    1. 点它 它有反应 怎么才能有反应 得绑定事件监听吧
    2. 前后台交互因为数据是从后端动态获取的 页面不是静态不变的吧 我需要发请求去获取数据显示 一个界面与人的交互 操作 一个是与后台的交互

<br>

# IIFE
立即执行 调用函数表达式
作用: 
    隐藏实现我的实现不是完全暴露在外面的
    不会污染外部(全局)命名空间
    用它来编写 JS 模块

    function(){
        console.log();
    };

<!-- 
    这么写完会报错的要么存起来 要么用起来 名字也不取 也不执行 就没意义
-->
    (function(){
        console.log();
    })();
<!-- 
    匿名函数自调用向上面这么写真是一点意义也没有, 但是有的时候是: 
 -->
    (function(){
        var a = 3;
        console.log(a+3);
    })();
    var a = 3;
    console.log(a+3);
<!-- 
    上面两行写在函数外面和函数里面有什么区别？
    写在外面里面都执行 写在外面会产生全局变量a 写在里面就没有产生全局变量
 -->

```js
(function(){
    var a = 1;                  //定义一个变量

@1      function test(){
        console.log(++a);       //定义一个函数 超过变量
    };
    window.$ = function(){      //定义了一个$ 一个函数
        return {                //返回了一个对象
            test:test
        }
    }
})();

<!-- 我想取a 想执行 console.log(++a) 能不能看见 看不见 -->
test();         可以么？不行
$().test();     可以    
```

<!-- 解析 ↑ :  -->
window.$ = function(){          //向外暴露一个全局函数
@2            return {  
            test:test
        }
<!-- 
    这个部分相当于 向外暴露了一个函数 我最终执行 是把 @1 暴露出去了吧 
    @1 暴露出去后 得到了一个@2对象
-->

$().test();
<!-- $是个函数名, $执行后 返回的是一个对象 -->


<br>

# 变量的小总结

形参的本质是 变量
实参的本质是 数据
也就是变量的值也就是 传进去的是内存中存储的数据 不管是基本类型的变量 还是 引用类型的变量 传递的都是值 不是他们本身 是值内保存的内容

引用变量赋值的问题
改变某一个变量本身就是重新赋值 就相当于改变它 比如 两个变量都指向同一个对象这时候给其中一个对象赋值那就相当于让它指向了另一个对象

<br>

# 原型链

# 函数的prototype属性
每个函数(和对象)都有一个prototype属性它默认指向一个Object空对象(即称为: 原型对象fun.prototype这就是)
原型对象中有一个属性 constructor它指向函数对象
<!-- 什么叫做空对象:  没有我们的属性 -->

### **<font color="#C2185">给原型对象添加属性(一般都是方法): </font>**
作用: 
    函数的所有实例对象自动拥有原型中的属性(方法)

每一个函数都有一个prototype属性 那Date()是函数吧
    那它就有prototype
    console.log(Date.prototype);    object的实例对象 里面封装了很多的方法供实例去使用

    原型上的方法是给实例对象使用的
    function fun(){};
    console.log(fun.prototype);     //Object 它默认指向一个Object空对象(没有我们的属性)

    Date.prototype 和 fun.prototype 它们都指向了一个Object对象它俩相比Date.prototype里面封装了很多的方法
    而fun.prototype里 有个属性叫constructor 还有个属性叫__proto__


那假如我想在fun.prototype中加一个方法怎么加？
    fun.prototype.test = function(){};     // 这个时候我们里面就有个属性了 test:function(){};


### **<font color="#C2185">原型对象中有一个属性 constructor它指向函数对象: </font>**
我们来验证下这个事, 首先我们获取原型对象, Date.prototype

    console.log(Date.prototype.constructor === Date);       //true

<!-- 上面说到constructor指向说明它是一个引用变量属性 它指向函数对象 -->
console.log(fun.prototype.constructor === fun);         //true

### **<font color="#C2185">图解: </font>**

    Type(函数名)    → Type.prototype 指向 →    Type原型对象
                   
                   ← Type.prototypeconstructor

假设我的函数名是Type 它有一个属性prototype 它指向Type.prototype(它指向Type的原型对象)
而原型对象中有个constructor 它指向原型Type
也就是说我的构造函数跟它的原型对象之间是相互引用
    A B
我是A 你是B A的里面有个属性能找到B  B里有个属性能找到A


### **<font color="#C2185">那原型有什么用？: </font>**
那我给原型对象添加属性(一般是方法) 是给实例对象来访问用的
    Fun.prototype.test = function(){
        console.log('test()');          //这里为什么要加引号 等测试的时候试试
    };

我们来创建个实例对象验证下
    var fun = new Fun();        创建一个实例
    fun.test();                 调用test

<br>

# 显式原型 与 隐式原型

1. 每个函数function都有一个prototype即是显式原型(属性)
2. 每个实例对象都有一个__proto__可称为隐式原型(属性)
3. 实例对象的隐式原型的值 为其对应 构造函数的显式原型的值
4. 内存结构
5. 总结
函数的prototype属性:    在定义函数时自动添加的默认值是一个空对象
实例对象的__proto__属性: 创建对象时自动添加的默认值为构造函数的prototype属性值
<!-- 程序员能直接操作显式原型但不能直接操作隐式原型(ES6之前) -->

1. 每个函数function都有一个prototype即是显式原型(属性)
    function Fn(){

    };
    console.log(Fn.prototype);      //object

2. 每个实例对象都有一个__proto__可称为隐式原型(属性)
<!-- 创建一个实例 -->
    var fn = new Fn();
    console.log(fn.__proto__);      //object

3. 对象的隐式原型的值为其对应构造函数的显式原型的值
    console.log(Fn.prototype === fn.__proto__);     //应该返回true

<!-- 
    开始的时候我们都说过每个函数function都有一个prototype即是显式原型(属性)那显示原型属性是一个引用变量吧 它指向的是一个空的object对象
    那隐式原型指向谁 一样吧现在相当于我有两个变量一个是 prototype 一个 __proto__ 它们两个都保存的是地址值 而且它们两个的值是一样的
    相等的所以它们才共同指向原型对象
 -->

function Fn(){ ... };
Fn.prototype    解释 → 读函数对象的这个属性
<!-- 
    这里 Fn. .是什么意思？ Fn相当于一个变量 函数变量么？函数名称不就是它的变量么？
    找它的对象 一个函数是不是就是一个对象 那个对象的内部又一个什么属性？ prototype属性
    函数对象一创建就加进去了那函数对象什么时候创建定义的时候就创建了
-->

fn.__proto__那这个属性是什么时候添加的呢？
<!-- 这个属性在实例对象new Fn()身上吧创建对象的时候引擎加的也就是在这个函数创建的时候 它的内部做了一件事情 -->
    fn(this).__proto__ = Fn.prototype
<!-- 就是说隐式原型的值 等于 对应 显式原型的值 -->

那在它function Fn(){};的内部做了什么事情
<!-- 在创建函数对象的时候 内部做了什么事情, this.prototype = {}; -->

### **<font color="#C2185">结构图: </font>**
```js
    function Fn(){ };
    var fn = new Fn();

    console.log(Fn.prototype, fn.__proto__);
    console.log(Fn.prototype === fn.__proto__);

    Fn.prototype.test = function(){
        console.log("test()");
    };
    fn.test();
```

1. 创建了一个对象
function Fn(){};

2. 接下来干了下面的事情
var fn = new Fn();

3. 我打印fn.__proto__ 最终找到的是 0x234的空对象

4. Fn.ptototype.test = function(){console.log("test()");};
给原型添加方法

5. 通过实例对象调用原型的方法 fn.test();
<!-- 
    fn. .找谁？ 找2中的0x345吧 可是没有test 但最后找到了 说明它的内部去找谁去了？ 找隐式原型属性 __proto__ 最终找到了原型对象里的test方法
    也就是说 通过对象调用了某个方法或者是属性 先在本身上的属性找  没有的话 去原型上找 那是看显示原型属性么？ 不看 看的是隐式原型属性
    那跟显式原型有关系么？ 找的时候是没关系的 但是 隐式原型的值 最先开始赋值的时候 赋值的是显式原型的值
 -->

### **<font color="#C2185">图解: </font>**
    栈内存                                  堆内存

2. 创建实例对象                  2. Fn的实例对象(地址值是:0x345)
    fn:0x345            →       实例对象上都有 __proto__属性 它的值是？
                                因为内部都执行 fn(this).__proto__ = Fn.prototype
                                __proto__: 0x234    
                                                        ↘
                                                            空Object对象
                                                            (地址值是:0x234)
                                                            4. 在这里添加了一个方法
                                                            test=function
                                                        ↗
    1. 对象对应的函数名          1. 创建了一个Fn对象
    Fn:0x123                    (地址值:0x123 )                              
    (这里面存的是地址值 )   → 
                                Function里面有个prototype属性
                                (Fn.prototype:0x234(地址值))

<br>

# 原型链

1. 原型链(图解)
访问一个对象的属性时先在自身属性中查找找到返回
    - 如果没有再沿着__proto__这条链向上查找找到返回
    - 如果最终没找到返回undefined
<!-- 原型链的尽头是 Object的原型对象我们的原型链是沿着 隐式原型去找的 -->

别名: 
    隐式原型链  --- 本质
作用: 
    查找对象的属性(方法)
<!-- 原型链是用来查找对象属性的 不是用来查找变量的 找变量 去 找作用域链 -->
                                            
2. 构造函数 / 原型 / 实体对象的关系1(图解)
3. 构造函数 / 原型 / 实体对象的关系2(图解)

最后看
    函数对象是Function的实例 Function是个什么类型的数据函数呗 
    所有函数都有两个属性 一个显式原型 一个隐式原型属性 隐式原型属性 指向Function的显式原型

function Foo(){};
    一般这么写 其实都是  var Foo = function(){};

Fucntion = new Function;
    只有这么写 才能保证 它的显式原型 和它自身的隐式原型是相等的 别的函数就没有这个特点
    别的函数 函数的显式原型是一个什么值？ 是一个new的Object 
    所有函数的隐式原型( __proto__) 都是一样的 为什么？ 因为都是new Function 产生的 都是通过这种方式产生的 所以 隐式原型应该都一样

### **<font color="#C2185">Object 是 Function的实例 这是咋回事？: </font>**
因为任何函数都是 new Function产生的 无论是内置函数 还是我们定义的函数 都是new Function产生的 当然对了
```js
    function Fn(){
        this.test1 = function(){
            console.log('test1()');
        };
    };

    Fn.prototype.test2 = function(){
        console.log('test2()');
    };
```

创建实例对象
```js
    var fn = new Fn();

    fn.test1();         //能不能调用 可以吧
    fn.test2();         //能不能调用 可以吧

    console.log(fn.toString());         //能不能调用 可以吧
    fn.test3();         //能不能调用？ 不能 fn.test3 is not a function undefined
```
<!-- 
    当我们去访问一个对象的属性时, 就这上面的这句话 我们看这个Fn.test1(); 这是访问属性么？ 是 可这不是在调用方法么？ 调用方法 方法是不是属性
    首先我是不是根据test1的属性名找到的对应属性值 而且这个属性值 还必须是一个函数 我才能加上() test1(), 那怎么查找的 它应该有一个查找的流程 
-->


# 原型链的属性
1. 读取对象的属性时会自动到原型链中查找
2. 设置对象的属性值时不会查找原型链如果当前对象中没有此属性直接在当前对象里添加此属性并设置其值
<!-- 一般情况下 我们不会在原型中添加属性属性一般添加在对象自身身上 方法放在原型上 -->
    Person.prototype.setName = function(name){
        this.name = name;
    };
<!-- 因为每个对象的属性不一样而方法一样 所以属性添加在自身的身上而方法添加在原型上 -->
3. 方法一般定义在原型中属性一般通过构造函数定义在对象本身上


### **<font color="#C2185">小例子: </font>**
```js
    function Fn(){

    };
    Fn.prototype.a = "xxx";

    var fn1 = new Fn();

    console.log(fn1.a);     //现在能不能看到这个a呢？ 原型上面的属性 实例对象都可见

    var fn2 = new Fn();

    fn2.a = 'yyy';          //改变a的值
    console.log(fn1.a);     //是xxx 还是yyy  结果是xxx 为什么？ fn2.a 是yyy
```

### **<font color="#C2185">fn1.a 为什么不是 yyy 解析 ↓: </font>**
我们在查找fn1中的a时是利用原型链去查找这个a是在fn自身对象里面有的么？不是 明显放在原型里面了嘛

### **<font color="#C2185">那为什么fn2.a = 'yyy' 没有把xxx覆盖掉呢？: </font>**
我们看下fn2本身 console一下看看 结果是fn2上面多了一个a属性: yyy而原型上面也有个a属性 值是xxx

    原型链是用来查找对象属性只有读取对象属性值的时候才会看原型链
    而
    当我设置属性值的时候 不看原型链

<br>

# 探索 instanceof 
A instanceof B   判断A 是不是B的实例

1. instanceof 是如何判断的？
    表达式 A instanceof B

<!-- 如果B函数的显式原型对象在A对象的原型链上返回true 否则返回false -->
2. Function是通过new自己产生的实例

### **<font color="#C2185">案例1: : </font>**
    function Foo(){};
    var f1 = new Foo();
    console.log(f1 instanceof Foo);         //很明显 是
    console.log(f1 instanceof Object)       //也对

A instanceof B  判断的标准 也就是什么时候返回true呢？
函数有什么属性？B有什么属性 显示原型属性(prototype)
A有隐式原型属性对象有一个原型链的问题
B是个函数对吧它的显式原型所指向的那个对象在A对象的原型链上就就返回true

    Object instanceof Function      //true
    Object instanceof Object        //true
    Function instanceof Function    //true
    Function instanceof Object      //true
    Object instanceof Foo           //false

<br>

# 测试题
### **<font color="#C2185">第一题: </font>**
```js
var A = function(){};
A.prototype.n = 1;

var b = new A();

A.prototype = {     //更新了prototype本身 指向了一个对象
n:2
m:3             //b 能看到 n么
}

var c = new A();
console.log(b.n, b.m, c.n, c.m)  1   undefined  2   3
```

### **<font color="#C2185">第二题: </font>**
```js
var F =function(){};
Object.prototype.a = function(){
console.log('a()');
};

Function.prototype.b = function(){
console.log('b()');
};

var f = new F();
f.a()       本身没有a方法去找原型 a和toString 是在一个容器里
f.b()       找不到
F.a()       相当于 把F看成实例对象 F 能调用
F.b()
```

<br>

# 变量提升 与 函数提升(其实就是预处理)

### **<font color="#C2185">变量声明提升: </font>**
通过var 定义(声明)的变量在定义语句之前就可以访问到
值: undefined

### **<font color="#C2185">函数声明提升: </font>**
通过function声明的函数在之前可以直接调用
值: 函数定义(对象)
```js
    fun();      //我是一段测试文字    
    function fun(){
        console.log("我是一段测试文字")
    };
```

\\ 问题: 变量提升和函数提升是如何产生的

```js
var a = 3;
function fn(
    console.log(a);
    var a = 4;
)
fn();       //undefined 
```

运行流程在函数体执行前var a; 


### **<font color="#C2185">函数声明提升: </font>**
```js
fun();      //能不能调用？ 能 因为是函数提升 结果: 我是一段测试文字    

function fun(){
    console.log("我是一段测试文字")
};

fn3();                  //能不能调用 不能 因为它遵循的是变量提升
var fn3 = function(){
    console.log('fn3()')
};
```

<br>

# 执行上下文
1. 代码分类(位置)
    全局代码
    局部代码

2. 全局执行上下文
在执行全局代码前 将window确定为全局执行上下文
对全局数据进行预处理就是要收集数据了 在这步的时候 全局代码还没有执行
    var定义的全局变量 ---> undefined添加为window属性
    function声明的全局函数 ---> 赋值(fun)添加为window方法
    this ---> 赋值(window)
开始执行全局代码 


<!-- 我在下面定义的a2 我在上面能直接访问到a2 -->
a2();            

<!-- 
    我在下面定义的a1 我在上面能直接访问到a1
    我找a1的时候 是去全局上下文里找因为 已经被作为属性添加在window里了window.a1
 -->
console.log(a1);    

console.log(this);  
<!-- 
    我一上来就能访问这个 我能访问说明它已经在了 说明在执行全局代码之前 它要做一些准备工作
 -->

<!-- 
    那a1 a2去哪找的？ 要知道a1相当于 window.a1; a2相当于 window.a2 这些东西都在window里面
    也就是说无论是要查找函数还是变量都要去window里面找
 -->


var a1 =3;
function a2(){ };


### **<font color="#C2185">函数执行上下文: </font>**
函数执行上下文
在调用函数准备执行函数体之前创建对应的函数执行上下文对象
对局部数据进行预处理
    形参变量 ---> 要赋值(赋值的是实参数据) ---> 添加为执行上下文的属性
    arguments ---> 赋值(所有的实参列表) ---> 添加为执行上下文的属性
<!-- 在我执行函数体之前 arguments已经在了 而且还有值 -->

    var定义的局部变量 ---> undefined添加为执行上下文的属性
    function声明的函数---> 赋值(fun)添加为执行上下文的方法
    this ---> 赋值(调用函数的对象)
开始执行函数体代码

<!-- 我们的内存空间是隔离的 你在你的区域 我在我的区域 不影响 -->

```js
function fn(a1){
    console.log(a1)             //2
    console.log(a2)             //undefined
    a3();                       //a3()
    console.log(this)           //window
    console.log(ararguments)    //[2,3]
<!-- 
         类数组或者叫伪数组, 这里能访问到下面的哪些东西   
 -->

    var a2 = 3;
    function a3(){
        console.log('a3()');
    }
};
fn(2, 3);
```

### **<font color="#C2185">测试题: : </font>**

console.log('gb: ' + i);                //undefined
00      var i = 1;
11      foo(1);
22      function foo(i){
33          if(i == 4){return}          // 如果i=4 停止
44          console.log('fb:' + i);     //1
55          foo(i+1);
<!-- 
    这里调了一个当前函数foo 这种调用成为 递归调用: 在函数内部调用自己
    递归函数一般都会有退出终止的条件if(i == 4){return} 要不就是一个死循环
    i在不断的增加吧
 -->
66          console.log('fe:' + i);     //1

};

console.log('ge' + i);                  //1


讲一下函数的执行流程
00  var i = 1;
11  foo(1);
22  function foo(i){
33      if(i == 4){return} 
44      console.log('fb:' + i);
55      foo(i+1);
66      console.log('fe:' + i); 
};
console.log('ge' + i);


var i
function foo(i) {
    if(i==4) return
    console.log('fb'+i);
    foo(i+1);
    console.log('fe'+i)
}
console.log('gb: ' + i);
i=1;
foo(1);
console.log('ge'+i)
<!-- 
    首先开始输出44行fb因为11行开始调用直接到44行开始输出第一条语句 fb: 1
    我们想开始传了1进来输出fb: 1 

    接下来 又开始执行55行 foo(i+1);这时候传进去的是1+1=2
    然后又会输出第44行 输出fb: 2

    然后又开始调用foo(i+1);这时候传进去的是2+1=3
    然后又会输出第44行 输出fb: 3

    接着又开始调用foo(i+1);这时候传进去的是3+1=4
    然后遇到了33行就结束了

    i=4结束了开始执行i=3 所以输出fe: 3
    i=3 输出 fe: 3后 当前调用就结束了 结束就要移除
    开始执行i=2 输出fe: 2结束就要移除
    开始执行i=1 输出fe: 1

    也就是最后调用的函数结束了 前面的函数没有结束
    66行其实每调用一次foo(i+1); 66行都会执行 只是执行的时机不一样
 -->


### **<font color="#C2185">测试题1     答案function: </font>**
无非就是两种可能性 一个undefined 一个是函数 这里面涉及到了变量提升 和 函数提升 谁先谁后的问题 
*先执行变量提升再执行函数提升* 最终 typeof a是function

```js
    function a(){};     // 来个a 定义了一个函数
    var a;              // var了个a
    console.log(typeof a)
```
    
最终的顺序应该这样的 所以是function:
```js
var a;
function a(){}; 
console.log(typeof a)
```


### **<font color="#C2185">测试题2     答案undefined: </font>**
```js
    if(!(b in window)){
        var b = 1;
    }
    console.log(b);    
// 先看 b in window 是true还是false 如果是true就不能进到var b = 1 所以最后的值就是undefined
```


### **<font color="#C2185">测试题3     答案 c is not a function: </font>**
```js
    var c = 1;
    function c(c){
        console.log(c);   
    }
    c(2);

<br>

    var c
    function c(c) {
        console.log(c)
    }

    c = 1

    c(2)
```

```js
// 首先存在变量提升 和 函数提升
    function c(c){
        console.log(c);   
    }       

// 实际上代码应该是这样的结构
    var c;
    function c(c){
        console.log(c);   
    } 
    c=1;
    c(2); 

// c=1 是个数字类型了 就不能调用函数了 c不是函数了
```

<br>

# 复习:

### **<font color="#C2185">栈结构用一句话概括后进先出: </font>**

### **<font color="#C2185">函数对象才有这个属性prototype: </font>**
### **<font color="#C2185">平时使用这个属性时是 函数. 一旦用.了 是把函数做为函数看还是对象看？ 作为对象看: </font>**
但是这个对象不是函数对象 就没有这个属性比如new Object产生的对象就没有 因为它不是一个函数对象
那Object有没有这个属性它本身就有 因为它就是函数对象 所有的函数对象都有 显式原型属性(prototype)
prototype是个引用变量的属性 说明它指向的是一个对象指向的对象被称为原型对象

prototype是函数被创建的时候添加进去的什么创建的函数对象呢？定义函数的时候被创建

### **<font color="#C2185">执行函数定义: : </font>**
    就是编写函数体定义函数的时候其实就是执行函数定义函数体并没有执行只是创建了一个函数对象
    定义函数 它创建函数对象时内部要执行一条语句
    this.prototype = {}     //创建了一个空的函数对象 这个对象也就是原型对象
    this是 创建的函数对象 

### **<font color="#C2185">执行函数: </font>**
    就是fn()这才是执行了函数对象


实例对象就有隐式原型属性 那实例对象又分为两类
一类是函数(函数是实例对象 这个实例对象有些特别 它同时又有显式原型对象)一般情况下 我们说的实例对象不是指的函数
但函数它是实例对象 平时我们说创建实例对象 那肯定不是说定义一个函数 有时候我们把函数对象称之为类型对象 比如我们定义一个Person 这个Person是一个类型吧


### **<font color="#C2185">函数对象是Function的实例: </font>**
我们一般说的实例对象是 new Person产生的 也就说 new 构造函数产生的对象
实例对象的隐式原型和函数的显式原型有什么样的关系 是相等 或者说指向同一个对象 属性说白了就是变量
prototype和__proto__ 这两个数形变量都是引用变量 引用变量用来指向对象他们都指向同一个对象

### **<font color="#C2185">__proto__属性是new实例时产生的: </font>**
也就是说我们创建实例对象时 它的内部会产生一条语句 this.__proto__ = fun.prototype(假设叫fun) 结果就是它们指向了同一个对象

this.__proto__ = fun.prototype
我们现在赋值 相当于把prototype里面的值 这个内存的值 这个内里里面存了个地址值 赋值给__proto__
怎么样才能让两个引用变量都指向同一个对象将一个引用变量 赋值给 另一个引用变量就可以了 因为 赋值的是地址值

### **<font color="#C2185">构造函数 和 它的实例对象都指向了一个空对象这个空对象真的是空的么？: </font>**
它的里面还有 所有的实例对象 都有一个 隐式原型属性__proto__还有一个constructor(它叫构造器想想我一个实例对象我得知道我的构造器是谁吧)

<br>

# 原型链: 
用来查找对象的属性准确的说是查找实例对象的属性隐式原型组成的链 
找不到返回undefined

    如果输出一个变量没有 它会报错           找变量是沿着作用域链找
    如果输出一个属性没有它会undefined     找属性是沿着原型链找


JS的继承是基于原型的继承 原型是个对象吧有的时候也会说js是基于对象的继承
一个实例的原型对象可能有多个 顶部默认是object的原型 这也就是说 所有new出来的实例对象 都有toString方法 一个函数本身也是一个实例对象平常我们只观察函数身上的显示原型属性

这么理解
    obj.test()
<!-- 根据test这个属性名去找这个属性 这个属性里面对应的值是一个函数 -->

### **<font color="#C2185">有个地方要注意一下, 所有构造函数的实例对象的隐式原型 指向 构造函数的显式原型: </font>**
所有我们定义函数它的原型对象的是object的实例, 有一个例外 是object自己 它指向它自己

### **<font color="#C2185">实例对象的隐式原型 等于 它所对应的显式原型: </font>**
那我们想 一般情况下 object是不是实例对象 , 一个函数既有显式原型又有隐式原型 它自身的隐式原型和显式原型相等么？ 不相等但有一个例外

    A.prototype = {};           //这种的意思是 把原型对象指向了另一个对象不会影响之前创建好的实例但会影响之后创建的实例
    A.prototype.xx = value;     //这种是在原型上添加属性或者方法 会影响到之前和之后创造的实例

<br>

# 执行上下文 与 执行上下文栈 是根据变量提升和函数提升引申出来的
变量提升()和函数提升() 是执行上下文 与 执行上下文栈的结果 

### **<font color="#C2185">要点: </font>**
### **<font color="#C2185">变量先提升 接下来是函数再提升 *函数的优先级更高 是指提升的晚 后执行*: </font>**

变量提升后 var a 的a去哪去了 放在执行上下文里去了 执行上下文有两个 一个是全局上下文一个是函数上下文 得看这条语句是写在函数外面 还是写在函数里面 如果是全局的语句 那就是提高到window里面去了 如果你是一个函数内部的语句, 只有在执行调用函数的时候 才能产生提升


### **<font color="#C2185">在执行上下文中 代码分为全局代码和函数内部代码 两种类型: </font>**
一个对应的是全局上下文 一个是函数上下文
什么时候确定全局执行上下文 在全局代码执行前 将window确定为执行上下文 确定好了以后 做预处理操作 也就是收集数据
也就是用var定义的全局变量还有函数声明的函数 还有this 收集的时候给它们赋值 变量是undefined 函数是函数对象this是window

而且把函数和变量放到哪去？ 放到window里面去 也就是保存到全局执行上下文里去了


### **<font color="#C2185">整个过程分3步: </font>**
1. 确定执行全局上下文 window
2. 预处理
3. 执行全局代码


### **<font color="#C2185">函数执行上下文调用函数的时候产生跟调用了几次函数: </font>**
1. 创建一个函数执行上下文
2. 预处理 收集数据
3. 函数内部的局部变量 一个是形参var定义的局部变量 functon声明的函数 this  arguments 都会放在执行上下文中, 放之前要先赋值形参也要赋值 赋实参的值arguments是实参列表 局部变量undefined 函数为函数对象

<!-- 
    做好这件事情后 就存在函数执行上下文里去, 下一步 执行函数体 就涉及到找某一个变量去执行上下文里去查
    执行上下文没在对空间里面
    执行上下文栈用来管理和保存执行上下文对象栈底是window 上面是函数的执行上下文  
    比如下面结构栈底是window 上面是两个函数 f1和f2是什么关系f1内部调用f2才会产生这种现象
 -->

<br>

# 作用域
就是一块 地盘 一个代码段所在的区域, 它是静态的(相对于上下文对象)在编写代码时就确定了

### **<font color="#C2185">分类: </font>**
全局作用域
函数作用域
没有块作用域, 什么是块作用域相当于大括号作用域
    if(true){
        var c = 3;
    }
    console.log(c);
<!-- 我在外面能不能见到c 能看到就不是块作用域 -->

### **<font color="#C2185">作用: </font>**
隔离变量 不同作用域下同名变量不会有冲突
```js
var a = 10, b = 20;
function fn(x){
    var a = 100, c = 300;
    console.log('fn()',a,b,c,x);
                // a:100, b:20, c:300, x:10

    function bar(x){
        var a = 1000, d = 400;
        console.log('bar()', a, b,c,d,x)
                // a:1000, b:20, c:300, d:400, x:100/200
    };
    bar(100);
    bar(200);
};
fn(10);
```

上面产生了几个作用域？
执行上下文对象是什么原则是n+1原则是调用了几次函数+1


# 产生作用域的原则
是N+1原则 N是定义了几个函数 就是几个函数作用域1是全局作用域

### **<font color="#C2185">作用域和执行上下文的区别: </font>**
区别1
全局作用域之外每个函数都会创建自己的作用域作用域在函数定义时(编码时)就已经确定了而不是在函数调用时

全局执行上下文环境是在全局作用域确定之后js代码马上执行之前创建动态创建的
函数执行上下文环境是在调用函数时函数体代码执行之前创建

区别2
作用域是静态的只要函数定义好了就一直存在且不会再变化
执行上下文环境是动态的调用函数时创建函数调用结束时上下文环境就会自动释放

联系
执行上下文环境(对象) 是从属于所在的作用域
    全局上下文环境 --- 全局作用域
    函数上下文环境 --- 对应的函数使用域

<br>-

# 作用域链
嵌套的作用域 产生的 由内向外 由下向上的一个过程
多个上下级干洗的作用域形成的链它的方向是从下向上或者从内到外, 查找变量时就是沿着作用域链来查找的

### **<font color="#C2185">查找一个变量的查找规则: </font>**
在当前作用域的执行上下文中查找对应的属性如果有直接返回否则进入2
在上一级作用域的执行上下文中查找对应的属性如果有直接返回否则进入3
再次执行2的相同操作直到全局作用域如果还找不到就抛出找不到的异常

<br>

# 复习: 

作用域的作用是用来隔离变量 在不同的作用域里定义相同的变量 不冲突
作用域链用来查找变量 沿着作用域链找变量, 找到就返回 找不到就要报错

比如a.b 找a是沿着作用域链找找b是沿着原型链找 找不到就返回undefined

如果我找window.a 会是undefined, 如果直接找a 会报错
那平时 我们说 直接写a 相当于 window.a, 还是有点区别 区别就是找不到以后 它怎么处理

作用域是代码一书写时就确定了
作用域是N+1个 N是定义了多少个函数1是全局

执行上下文也是N+1 N是执行函数的次数 1是全局
执行上下文是动态产生的 尤其是函数执行上下文 不会一直存在调用的时候产生 函数执行完就死亡

查找一个变量 找的是作用域链 而作用域链是根据我代码定义(书写)的位置确定的, 跟调用位置没关系


### **<font color="#C2185">什么是执行上下文栈(执行栈)执行上下文(可执行代码): </font>**
首先说一下 可执行代码的类型有什么
1. 全局代码
例如加载外部的js文件或者本地标签内的代码.全局代码不包括 function 体内的代码

2. 函数代码
function体内的代码

3. eval代码

当js引擎遇到这三种类型的代码的时候都会进行一些准备工作这些准备工作专业的说法就叫执行上下文. 或者说js引擎遇到这三种类型的代码的时候就会进入到一个执行上下文.

每当js代码在运行的时候它都是在执行上下文中运行. 执行上下文可以理解为当前代码的执行环境它会形成一个作用域

1.2 那么js引擎在遇到可执行代码的时候它究竟会做哪些准备工作呢？
    全局执行上下文: 
    * 浏览器引擎在执行全局代码前将window确定为全局执行上下文
    * 对全局数据进行预处理
        var定义的全局变量==>undefined,添加为window的属性
        function声明的全局函数==>赋值为fun添加为window的方法
        this==>赋值为window,表示全局执行上下文
    * 开始执行全局代码
        一个程序中只会有一个全局执行上下文.

```js
var num = 2;
function pow(num) {
    return num * num;
}
```

引擎如何读取上面的代码？
引擎: 第一行它是变量！将它存储在全局存储器中.
引擎: 第二行我看到了一个函数声明.让我们也把它存储在全局存储器中.

### **<font color="#C2185">全局存储器: : </font>**
    全局内存包含全局变量和函数声明供以后使用.

    当Javascript引擎运行你的代码时它会创建: 
        全局执行上下文
        全局存储器(也称为全局作用域或全局变量环境)


### **<font color="#C2185">函数执行上下文: : </font>**
每当一个函数被调用时都会为该函数创建一个新的上下文.每个函数都有自己的执行上下文不过是在函数被调用时创建的.函数上下文可以有任意多个.每当一个新的执行上下文被创建它会按定义的顺序执行一系列步骤.
    * 在调用函数准备执行函数体之前 创建对应的函数执行上下文对象
    * 对局部数据进行预处理
        形参变量==>赋值(实参)==>添加为执行上下文的属性
        arguments==>赋值(实参列表)添加为执行上下文的属性

    * var定义的局部变量==>undefined,添加为执行上下文的属性
        function声明的函数==> 赋值(fun),添加为执行上下文的方法
        this==>赋值( 调用函数的对象)
    * 开始执行函数体代码


### **<font color="#C2185">执行上下文的生命周期: : </font>**

创建过程:  
    1. 创建变量: 即初始化函数的参数arguments提升函数及变量的声明
    2. 建立作用域和作用域链
    3. 确定this的指向.

执行过程: 
    1. 变量赋值 
    2. 函数引用 
    3. 执行其他代码

销毁阶段: 
    执行完毕后出栈等待被回收.

创建阶段: 
    在全局执行上下文中this的值指向全局对象在浏览器中this的值➡window对象;在nodejs中指向的是➡module对象
    在函数执行上下文中this的值取决于函数的调用方式(即如何被调用的).当它被一个引用对象调用则将的值this设置为该对象否则this的值设置为全局对象或undefined(在严格模式下)


执行上下文栈
    在一个javascript程序中必定会产生多个执行上下文javascript引擎会以栈的方式来处理它们也就是执行上下文栈

执行上下文栈
    每个函数都有自己的执行环境当执行流进入一个函数时函数的环境就会被推入一个环境栈中.函数执行完后栈将其环境弹出把控制权返回给之前的执行环境.
    一个程序代码中包含多个函数也就是包含多个函数执行上下文为了管理好多个执行上下文之间的关系JavaScript中创建了执行上下文栈来管理执行上下文.执行上下文栈是具有后进先出结构的栈结构用于存储在代码执行期间创建的所有执行上下文.
    当JavaScript引擎运行JavaScript代码时它会创建一个全局执行上下文并将其push到当前调用栈.(函数还没解析或者是执行、调用)仅存在全局执行上下文每当引擎发现函数调用时引擎都会为该函数创建一个新的函数执行上下文并将其推入到堆栈的顶部(当前执行栈的栈顶).当引擎执行其执行上下文位于堆栈顶部的函数之后将其对应的函数执行上下文将会从堆栈中弹出并且控件到达当前堆栈中位于其下方的上下文(如果有下一个函数的话)

<br>

# 进程与线程
有的程序是多进程的 有的是单进程的
如果一个程序的进程中 有多个线程 那它就是多线程的程序 只有一个线程就是单线程程序

### **<font color="#C2185">进程: : </font>**
程序启动了一个对应的进程就启动了程序的一次执行它占有一片独有的内存空间
可以通过window任务管理器查看进程

### **<font color="#C2185">线程: : </font>**
是进程内的一个独立的执行单元是程序执行的一个完整流程 是cpu的最小单元

### **<font color="#C2185">相关知识: : </font>**
我们应用程序的代码必须运行在某个进程的某个线程上也就是说一个程序启动后一个线程都没有能运行代码么？ 不能
一个进程中至少有一个运行的线程:  主线程进程启动后自动创建因为要运行代码 在运行之前必要要创建一个主线程
一个进程中也可以同时运行多个线程我们会说程序是多线程运行的
一个进程内的数据可以供其中的多个线程直接共享
多个进程之间的数据是不能直接共享的(因为进程之间的内存是独立的)
线程池: 保存多个线程对象的容器实现线程对象的反复利用

### **<font color="#C2185">何为多进程与多线程: </font>**
多进程运行: 一个应用程序可以同时启动多个实例运行
多线程: 在一个进程内同时有多个线程运行

>比较单线程与多线程
多线程
    优点: 
        能有效提升CPU的利用率
    缺点: 
        1. 创建多线程需要开销的(需要费工夫的 不是随便就有的)
        2. 线程间切换开销
        3. 死锁与状态同步问题
单线程
    优点: 
        顺序编程简单易懂  单线程说白了就是从上往下执行 这时候编码比较简单多线程的话 编码要复杂一些
    缺点: 
        效率低

### **<font color="#C2185">JS是单线程还是多线程: </font>**
JS是单线程运行的, 但使用H5中的web Workers可以多线程运行   
启动分线程的语法

### **<font color="#C2185">浏览器运行是单线程还是多线程: </font>**
都是多线程运行的

### **<font color="#C2185">浏览器运行是单进程还是多进程: </font>**
有的是单进程的
    firefox
    老板ie
有的是多进程
    chrome
    新版ie

### **<font color="#C2185">双核cpu : </font>**
在同一个时间点 同时做两件事 这样两个线程在同一个时刻可以同时运行

### **<font color="#C2185">单核cpu: </font>**
也能创建多线程 创建2个线程 但它只能处理一个线程另外一个线程暂停 
-它不会等一个线程执行完再执行另一个 它会在两个线程间跳转运行 这个叫线程间的切换 不是

<br>

# 浏览器内核
支撑浏览器运行的最核心的程序
<!-- 
    浏览器也是软件也是应用 也是很多代码组成 在这些代码中 有支撑它运行最核心的代码 这就是内核
 -->

不同的浏览器内核可能不一样
    chrome safari :         使用的是 webkit 内核
    firefox:                Gecko
    ie:                    Trident
    360 搜狗等国内浏览器:   Trient+webkit   设计到钱的时候 会切换到Trident 安全性比较高

### **<font color="#C2185">内核由多个模块组成 有哪些呢？: </font>**
主线程运行的模块
    JS引擎模块: 负责JS程序的编译与运行
<!-- (也是程序 同时也是代码 浏览器内部就有的 内核中) -->
    htmlcss文档解析模块: 负责页面文本的解析

    DOM/CSS模块: 负责dom/css在内存中的相关处理

    布局和渲染模块: 负责页面的布局和效果的绘制(内存中的对象)

分线程运行的模块
    定时器模块: 负责定时器的管理
    DOM事件响应模块: 负责事件的管理
    网络请求模块: 负责ajax请求


### **<font color="#C2185">定时器引发的思考: </font>**
1. 定时器真的是定时执行的么？
定时器并不能保证真正的定时执行
一般会延迟一丁点(可以接受)也可能延迟很长时间(不能接受) 设定200 实际580

2. 定时器回调函数是在分线程执行的么？
在主线程执行的js是单线程的

3. 定时器是如何实现的？
事件循环模型(后面讲)
```js
    var start = Date.now();
    console.log('启动定时器前')

    setTImeout(function(){
        console.log('定时器执行了'Date.now()-start)
    },200)

    console.log('启动定时器后')
```

### **<font color="#C2185">js是单线程执行的: </font>**
1. 如何证明js执行是单线程的
    setTimeout()的回调函数是在主线程执行的
    定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行

2. 为什么js要用单线程模式而不用多线程模式
    js的单线程与它的用途有关
    作为浏览器脚本语言js的主要用途是与用户互动 以及操作DOM
    这决定了它只能是单线程否则会带来很复杂的同步问题

3. 代码的分类
    初始化代码
    回调代码    回调函数中的代码

4. js引擎执行代码的基本流程
    先执行初始化代码: 包含一些特别的代码    回调函数(异步执行)
        设置定时器
        绑定监听
        发送ajax请求
    后面在某个时刻才会执行回调代码

```js
    setTimeout(function(){
        console.log('timeout 2222')
    },2000);

    setTimeout(function(){
        console.log('timeout 1111')
    },1000);

    function fn(){
        console.log('fn');
    };
    fn();
```

打印顺序应该是: 
    fn ---- timeout1 ---- timeout2

```js
console.log('alert之前');
alert('-----') 

// 它有个特点 暂停当前主线程的执行 同时暂停计时点击确定后恢复程序执行的执行 

console.log('alert之后');
// alert除了暂停当前主线程的执行 还暂停了计时 要是没停的话 点确定立马会出来 
```

<br>

# 浏览器的事件循环(轮询)模型

### **<font color="#C2185">所有代码分类: </font>**
初始化执行代码(同步代码): 
<!-- 包含绑定dom事件监听设置定时器发送ajax请求的代码 -->
回调执行代码(异步代码): 处理回调逻辑

### **<font color="#C2185">JS引擎执行代码的基本流程: : </font>**
初始化代码 ---> 回调代码

### **<font color="#C2185">模型的2个重要组成部分: </font>**
事件(定时器/DOM事件/ajax)管理模块
回调队列

### **<font color="#C2185">模型的运转流程: </font>**
执行初始化代码将事件回调函数交给对应模块管理
当事件发生时管理模块会将回调函数及其数据添加到回调列队中
只有当初始化代码执行完后(可能要一定时间)才会遍历读取回调队列中的回调函数执行
<!-- 启动定时器 绑定事件监听 是初始化代码中特别的部分 -->

                                                <br>----
setTImeout里 将function和1000 交给定时器管理模块
绑定事件监听 将回调函数 交给dom事件的管理模块       这两部分是浏览器负责的
                                                <br>-----

初始化代码 执行完毕只有 才能处理 回调代码 回调代码会在一个队列里 待执行

  

# 执行栈
execution stack, 所有的代码都是在此空间中执行的

# 浏览器内核
browser core
js引擎模块(在主线程处理)
其他模块(在主/分线程处理)
运行原理图

<br>--