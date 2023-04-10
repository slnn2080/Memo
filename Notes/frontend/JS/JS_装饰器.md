# 装饰器
装饰器(Decorator)是一种与类(class)相关的语法, 它可以放在类和类方法的定义上方
**使用方式相当于注解: @函数名**

<br>

### 示例:
下面代码一共使用了四个装饰器一个用在类本身另外三个用在类的方法

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

### 装饰器 & webpack 的配置:
装饰器还不是 es 的标准 我们在js环境中要想使用装饰器 还需要webpack的配合编译

在完成webpack的基本安装后 想要安装 装饰器 对应的包 需要安装如下:

```s
npm i @babel/plugin-proposal-decorators -D
npm i @babel/plugin-proposal-class-properties -D
npm i babel-loader @babel/core @babel/preset-env -D
```

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
```

```js
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

<br><br>

## 类: 装饰器
装饰器就是一个函数 所以定义装饰器的方式 **就是定义一个函数**  
装饰器它是一个对类进行处理的函数, 通过装饰器 可以给 目标类 添加属性

<br>

### 装饰器的参数:
装饰器既然是一个函数 那么必然就有形参

**形参1:**  
被装饰的类 (所要装饰的目标类)

<br>

```js
function annotation(clazz) {

}
```

<br>

### 示例: 为类添加 静态属性:
我们准备一个 class 类, 接下来我们要为 TestClass 类来添加一个静态的属性
```js
class TestClass {

}
```

<br>

**1. 定义装饰器 并 通过形参1 为类添加静态属性:**  
```js
// 装饰器 本身就是一个函数 参数为 标记时的类
function addStaticField(clazz) {
  clazz.isFlag = true
}
```

<br>

**2. 将装饰器放在目标类上:**  
```js
// 将装饰器 装饰 整个类 装饰哪个类 clazz 就是哪个类
@addStaticField
class TestClass {

}

// 装饰器给类添加了静态属性 isTestable 
console.log(TestClass.isFlag) // true
```

<br>

### 装饰器的参数: @装饰器(参数)
默认装饰器只有一个参数就是被装饰类 如果想给装饰器添加参数 可以 **使用高阶函数的形式**
外层函数用于接收参数, 内层函数则是 被装饰的类
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

<br>

### 示例2: 为类添加静态属性 (通过参数赋值)
```js
const addProp = param => {
  return clazz => {
    clazz.staticProp = param
  }
}


// 通过参数赋值
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

### 为类添加 实例属性
添加实例属性 可以 **通过 prototype 来操作**
```js
function addStaticField(clazz) {
  // 给类的原型对象上添加属性 这样它的实例对象就能拿到
  clazz.prototype.instanceField = true
}


@addStaticField
class TestClass {

}


let tc = new TestClass()
console.log("实例身上的属性:", tc.instanceField)
```

<br>

### 示例: 将数据对象 添加到 类的实例上
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

<br>


### 示例2: 
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

### 扩展:
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

<br><br>

## 属性: 装饰器
装饰器不仅可以装饰类还可以装饰 **类的属性 (属性 和 方法)**

```s
https://www.jianshu.com/p/c00750ecaa45
```

<br>

### 装饰器的参数:
无论我们修饰的是 属性 方法 getter setter 它都有3个参数

- target: 被修饰属性所在类的原型对象
- name: 被修饰的属性名
- descriptor: 如果我们绑定的是一个属性的话, 它的描述对象如下, 技巧: 我们可以通过 **desciptor.value** 获取到被装饰的属性的值
```js
{
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: [Function: initializer]
}
```

<br>

**返回值:**  
当我们修改了 descriptor 的时候 要 return descriptor

<br>

### 示例: 将类中的某个属性修改为只读
```js
function readonly(target, name, descriptor) {
  // 通过参数3 将其改成只读
  descriptor.writable = false
  return descriptor
}

class Animal {
  @readonly age = 2
}

const cat  = new Animal()
// {age: 2}
```

<br><br>

## 方法: 装饰器
当装饰器来装饰方法的时候 有如下的3个参数
- target: 被装饰的对象
```js
// 如果被装饰的 方法a 中调用了 方法b, 则target中就包含
{
  a: f,
  b: f
}
```
- name: 被装饰的方法名

- desciptor: 如果我们绑定的是一个方法的情况下 它的描述符对象为, 技巧: 我们可以通过 **desciptor.value** 获取到被装饰的方法
```js
{
  configurable: true
  enumerable: true
  value: ƒ clickHandler()
  writable: true
}
```

<br>

**示例:**  
```js
// 方法的装饰器
const methodDecorator = (target, name, descriptor) => {

}
```

<br>

### 技巧: 方法装饰器
我们在被装饰方法前后添加逻辑, 类似切片

```js
function log(target, name, desciptor) {
  // 获取被装饰的函数
  const fn = desciptor.value

  // 通过描述符 重写被装饰的方法
  desciptor.value = function() {

    // 添加之前的逻辑
    console.log("before ... ")

    // 执行原有的逻辑 并传递this 和 argument
    fn.apply(this, arguments)

    // 添加之后的逻辑
    console.log("after ... ")
  }

  // 最后需要return desciptor
  return desciptor
}


// Vue
methods: {
  @log
  clickHandler() {
    console.log(this)
    const res = this.a + this.b
    console.log(res)
  }
},
```

<br>

### 示例: 给类中的属性 绑定了 setter getter:
**要点:**   
我给类中的属性 绑定了 装饰器 内部使用了 set get
```js
// global属性
let content = "我是全局属性"


// 类的装饰器
const clazzDecorator = param => {

  return clazz => {
    clazz.staticProp = param
    clazz.prototype.dynamicProp = "我是动态属性"
  }
}


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


// 类中方法的装饰器
const clazzMethodDecorator = (clazzPrototype, prop, propDescriptor) => {
  console.log("我是类中方法" + prop + "的装饰器")
}


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


<br>

### 只读属性:
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

<br>

### 示例2: 修改属性描述对象的enumerable属性使得该属性不可遍历.
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

<br>

**总结:**  
getter setter

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

<br>

### 资料
- https://www.jianshu.com/p/c00750ecaa45

<br>

### 待整理: 返回值
返回值好像必须是一个对象

装饰成员的时候 函数内部需要返回
或者返回 clazzPrototype
或者返回 propDescriptor
或者返回 propDescriptor中的一个修改后的值


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