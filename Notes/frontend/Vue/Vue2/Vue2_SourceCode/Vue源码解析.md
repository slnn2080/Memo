### Vue构造函数的创建 & 初始化数据
- 写Vue的时候的示例:
```js
// 该配置对象会是 options
const vm = new Vue({
  data: {
    name: "sam",
    age: 18
  }
})
```


- Vue源码中在设计的时候 并没有采用 class 的写法
- 因为 class 的写法会将 属性 和 方法 耦合在一起 都是一个类中
```js
class Vue {

  xxx
  xxx

  xxx() { ... }
  xxx() { ... }
  xxx() { ... }
  xxx() { ... }
}
```

- 所以 Vue 源码中采用的是构造函数的方式 通过构造函数的原型对象 Vue.prototype 来扩展方法 
- 这样我们可以将给Vue扩展的功能放到不同的文件里 更好管理
```js
function Vue() {

}

Vue.prototype.xxx = function() {}
```

- 所以 以下我们会采用es5中原生的构造函数的方式 来实现Vue的源码
```js
// options new Vue时传递进来的配置对象
function Vue(options) {

}

export default Vue
```

- 参数options: 就是 new Vue({配置对象}) 的过程传入的对象


> Vue.prototype_init()
- 用于初始化操作, 初始化我们传入的各种配置项 如：data props methods 等
- 等我们new Vue的时候 会自动调用构造函数中的逻辑 这样直接执行初始化方法
```js 
// 比如下面的代码 当我们new Test的时候 Test构造函数中的逻辑也会被执行
function Test(name) {
  this.name = name
  console.log(this.name)
}

new Test("sam")
```

- 调用_init()的时候将 options 传入
```js
function Vue(options) {
  // new Vue的时候调用
  this._init(options)
}

// 添加初始化方法
Vue.prototype._init = function(options) {

}

export default Vue
```


> 初始化_init()方法的抽取
- 这里有问题 如果功能越多 我们还是会在一个文件中写出如下格式的代码 而我们希望我们的功能都是独立的 
```js
Vue.prototype.xxx = function(options) {

}
Vue.prototype.xxx = function(options) {

}
Vue.prototype.xxx = function(options) {

}
```

- 所以我们将 init方法抽离在一个js文件中 目录结构整理如下

  | - src
    - index.js
    - init.js   // 初始化相关操作


```js
function Vue(options) {
  this._init(options)
}

export default Vue

---

// init.js
Vue.prototype._init = function(options) {

}
```
- 但还有一个问题 init.js 文件中的Vue 拿不到 因为现在相当于
- A文件: Vue在这里
- B文件: 这里拿不到Vue


> 解决方式:
- 可以利用函数 + 函数的参数 在index.js文件中 调用 init.js 中的方法
- 将 Vue 作为参数传递到(实参) init.js 文件中

- 为了可以传递参数 我们修改 init.js 中的逻辑 
- 将给 Vue 原型上添加 _init 方法的逻辑 封装在一个 initMixin 函数中 这样 Vue就可以通过参数传递到 init.js 文件里面了
```js
// 定义给 Vue 添加 init 功能的方法
export function initMixin(Vue) {
  // 我们给 Vue 的原型对象添加 _init() 方法 这样 index.js 文件中就可以通过 this 来进行调用
  Vue.prototype._init = function(options) {

  }
}
```

- 然后在 index.js 中调用 initMixin(Vue) 方法 并传入 Vue
```js
import {initMixin} from "./init"

function Vue(options) {
  // 通过 this 我们可以调用 添加到原型对象身上的方法
  this._init(options)
}

// 扩展init方法: 调用 initMixin 传入 Vue 
initMixin(Vue)


// 后续再有相同的要扩展的方法都可以通过这样的方式
...


export default Vue
```

- 上面我们将 要添加在Vue原型上的方法 封装成了一个个函数 通过函数的调用 给Vue扩展一系列的功能

---

> _init()中 在 Vue 实例上扩展 $options 属性
- 用过Vue的都知道 Vue的实例身上有一个 $options 属性 应该是在new Vue的时候传入的配置对象
- 在使用该属性的时候 我们可以通过 this 直接获取$options属性

- 如：
  this.$options
  vm.$options


> 那为什么要有 $options 这个属性?
- 举例:
- 我们传入的 options配置对象 会传递到 _init(options) 方法中 所以该方法内部可以使用这个变量拿到 用户传递的配置对象

- 如果我们继续给Vue扩展别的功能(方法) 这个方法中也需要使用 options 对象 怎么办？
- 由于作用域的问题 我们无法获取到 _init(options) 中的options

- 所以我们在 _init(options) 中将 options 挂载到 vm 实例身上 这样是不是不管在哪里 只要我们通过Vue实例都可以拿到 options


- 目的:
- 提升到实例身上 通用

```js
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    // 对 options 做了修改
  }


  Vue.prototype._xxx = function() {
    // 也想拿到上面的 options 拿不到
  }
}
```

- 相当于两个作用域
- 那我们就可以考虑 将options放到实例上 相当于提升到了全局中
```js
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    // 将this保存起来 以后就使用vm了 构造函数中的this就是实例
    const vm = this

    // 初始化的时候 将用户的选项options放到Vue实例身上
    vm.$options = options
  }
}
```

> 扩展:
- **原型中的this都是实例**
- 群里有人说 为什么能通过this获取各种属性和方法
- 构造函数中的this就是实例对象, 我们将所有的属性方法都放在实例对象身上了 所以我们可以通过this获取到
- 就像我们在init()中将options挂载到实例身上了 所以就能通过this能获取到

---

> 初始化 {配置对象} 中的各个配置
- 当我们将用户的options配置项挂载到实例上后 接下来我们首先配置对象中的选项 进行处理
<!-- 
  Vue中的配置项有很多 比如
  props
  computed
  watch
 -->

- 所以初始化就包括了 data methods 计算属性等等的各个配置项

------

### 初始化 data 配置项

> initState(vm) 方法
- 位置:
-  _init()方法中 定义 

- 作用:
- 初始化状态(data props watch computed 等数据都是状态) 比如 react里面的state
- 比如我们需要在这个函数中对data配置项中的数据做劫持

- 参数:
- vm
- 我们可能不光光需要 data配置项中用户传递过来的数据 还需要将数据劫持后放到实例上
- 所以我们传vm过去
```js 
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this
    vm.$options = options


    // 初始化状态
    initState(vm)
  }
}
```

> initState(vm)部分思路:
- 在这个方法中 我们先从 vm.$options 上获取到 配置对象 赋值给opts做缓存
- 然后分别判断 有没有 props data 等 如果有 我们就调用 data props 各自的初始化方法

```js
// 用于处理 options 中的配置项(状态)
function initState(vm) {

  // 从实例身上取出 $options 获取所有的选项
  let opts = vm.$options

  // 如果用户有添加 props 配置项
  if(opts.props) {
    // 如果有就对 props 进行初始化操作
    initProps(vm)
  }

  // 如果用户有添加 data 配置项
  if(opts.data) {
    // 如果有就对 data 进行初始化操作
    initData(vm)
  }

}

// 将 vm 继续向下传递
function initData(vm) {
  
}
```

- props写在上方因为props的优先级高 我们这里只先考虑 data 配置项的问题

---

> initData(vm)
- 用户初始化用户的data配置项 参数vm

- vue中的数据是响应式的, 也就是说数据变化了我可以监控到数据的变化 数据的变化 我们需要更新视图
  数据的取值
  数据的更改

> 部分思路:
- 我们先从 vm.$options.data 获取到 data配置项

```js
function initData(vm) {
  // 拿到 data配置项后 要对里面的数据进行代理
  let data = vm.$options.data

}
```

- 我们获取到的 data 有两种情况
- 1. 对象
- 2. 函数

- 所以我们要想取得data对象 就要判断该data是函数式的还是对象的 
  - 函数的情况下
    调用 函数 拿到返回值
    

  - 对象的情况下
    直接赋值

- 这里有一个问题 如果data是函数 而我们直接调用data()的话 data中的this就是window 
- 所以我们使用 **data.call(vm)** 将vm传递进去 这样 data在是函数的情况下 其内部的this就指向了 vm


**call()作用: 改变函数内部的this指向**
- 这样 data 在是函数的情况下 它内部的this就是我们传入的vue实例

---

> 在 vm 身上定义 _data 的作用
- 上面的逻辑中 我们得到了 用户传入的配置项对象中的data配置里的 数据对象
- options.data

- 然后我们需要将 拿到的数据对象 data 挂载到实例身上 vm._data
```js
function initData(vm) {
  // 拿到 data配置项后 要对里面的数据进行代理
  let data = vm.$options.data

  // 判断 data 是函数 还是对象 如果是函数的话我们进行调用获取其返回值
  data = typeof data == "function" ? data.call(vm) : data
  
  // 在 vm 身上增加 _data 我们将 $options的data对象放到了 vm身上 这样vm身上就有了_data属性 里面直接就是数据
  vm._data = data
}
```

- 这样我们打印 vm 的验证的时候 实例身上就有了 _data 属性

- 同时将 _data 挂载在vm上还有一层作用
- 上面我们只是将 data 中的数据从 {配置对象} 中取出来

- 然后我们将 提取出来的data 放到一个地方 这个地方就是 _data
- 放在这里还有一层作用 在vue中我们都是通过 this 或者 vm 来获取数据的 
- 比如 vm.name 

- 可现在我们是将提取出来的data放在了_data里面 当我们想读取的时候 就必须 vm._data.name 的读取方式 如果我们想将上面读取数据的方式 修改为 vm.name 或者 this.name 的方式的话

- 就要做 数据代理 或者说 当我们从 this 上取出某个属性的时候 会去从 this._data 中去找
- 那我们想想 这是不是需要两个地方
- 从 **A地方** 读取数据 要从 **B地方** 拿

- 所以我们从配置对象中提取出来的数据对象 data 就要放到一个地方 这个地方就是 vm._data
- 然后 我们从 this 身上读属性的时候 可以通过 getter 去 vm._data 身上去找
```js
let source = {name: "sam"}
let target = {}
```

- 所以我们提取出来的data就必须存在一个地方 这里 _data 就充当了 source
- 而vm充当了target

---

> 小优化下:
- 我们在 _init() 方法中要对用户传入进来的配置项做初始化的操作 所以我们创建了 initState 

- initState()方法中会判断用户有没有传入某配置 然后进而调用 initData() initProps()
- 所以initState()方法会越来越大 这里我们可以给它提出去

  | - src
    - index.js
    - state.js
    - init.js

- 然后我们在 init.js 中导入 state.js 

----------------

### 实现对象的响应式原理
- 上面我们 通过 下面的方法 拿到了用户传入的data 接下来我们要对数据进行劫持

  initState()
    initData()
  
- Vue2里面采用了 Object.defineProperty API 做数据的劫持

- 下面我们会对 data 中的数据做 数据的劫持(配置 getter setter) 我们将整体重新定义data对象的过程 封装到 observe 模块中


- observe()就是专门观测data的方法 也是专门做响应式的模块 所以这里我们也给该方法抽离出去

  | - src
    - index.js
      - 入口文件

    - init.js
      - 初始化方法

    - state.js
      - 初始化状态

    | - observe: 响应式数据的模块
      - index


```js
function initData(vm) {

  let data = vm.$options.data

  data = typeof data == "function" ? data.call(vm) : data
  vm._data = data

  // vue2中使用 Object.defineProperty() 来做数据的劫持 我们在这里提供一个方法 观察data
  observe(data)

  // 为什么不传递 _data 传递哪个都是一样的 都是引用 也就是说下面做完重写data身上的属性(get set)的之后 vm.$options.data 和 vm._data 都会有getter setter

}
```

---

> observe模块

> observe(data)
- 作用:
- 用来劫持用户传入的配置对象

- 参数
- 上面我们获取了用户的data后 我们将data传入了该函数

```js
// state.js
import { observe } from "./observe/index.js"
function initData(vm) {

  let data = vm.$options.data

  data = typeof data == "function" ? data.call(vm) : data
  vm._data = data

  // 这里
  observe(data)
}


// observe/index.js
export function observe(data) {
  
  // 当我们拿到 data 后 需要对该对象进行劫持

}
```

> 逻辑:
- 我们要在 observe() 方法中 将data传入 在其内部完成 对data对象的劫持操作

- 1. 首先 我们会判断传入的data是否是对象 如果不是则return 因为我们只对对象做劫持
- 这里的劫持也就是 重新 data 中的属性 将所有属性重新写成带有getter setter的
```js
  let obj = {       let obj = {
    name: "sam"       name: (...)
  }                 }
```

- 当然我们还要考虑一件事情 如果该对象已经被劫持过了(被getter setter过了) 那是不是就不需要劫持了? 怎么判断 该对象是否被劫持过?

- 既然我们要对数据做劫持:
- 对 对象 的处理
- 对 数组 的处理
- 对 判断是否是已经被劫持过数据 做标记

- 2. 所以我们会对数据劫持的操作 封装为一个 class 整体

```js
export function observe(data) {
  
  // 监测data是否是对象 如果不是直接return 只对对象进行劫持
  if(typeof data !== "object" || data == null) return

  // 我们在同文件内 创建了一个 Observer 这个类的作用是专门观测劫持数据的
  return new Observer(data)
}
```

> new Observer(data)
- 该类中的 walk() 方法用于给 给定对象的属性重写上 getter setter
- 也就是我们要重新定义对象中的属性

```js
// 创建一个观测类 用于判断 data 是否被观测过
class Observer {
  // data 就是 options 中的 data
  constructor(data) {

    // 我们要劫持data对象中的每一个属性 也就是重新data中的属性 为每一个属性配置getter setter
    this.walk(data)
  }


  // 循环对象对属性依次劫持
  walk(data) {
    // 自定义defineReactive() 内部使用了Object.defineProperty 重写属性
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }

  /*
    既然我们要重新定义属性 那是不是要拿到 对象中的key 然后对data对象遍历设置 key 
    相当于将有getter setter的key 替换到 data对象中原来的key

    所以我们会使用 keys() 方法

    defineReactive
    define: 定义
    reactive: 响应
  */
}
```

---

> 扩展: Object.defineProperty API 有一个问题:
- 它只能劫持已经存在的属性 后增的 或者删除的它是不知道的
- 所以vue2中会为此单独的写一些api 比如 $set $delete 我们先这么用

> 性能问题:
- walk() 拿到data对象的每一个key后 重新定义对象中的属性(对传入的data中的属性重新定义, 相当于将属性重新重写了 所以性能会差 这也是vue2的问题 所以vue3中换了proxy)

---

> defineReactive(target, key, value)
- 我们想让 defineReactive()方法 变的更加的通过 所以没有定义在 Observer类中
- 该方法在 walk() 方法中调用 主要作用重新定义 给定对象中的属性 设置getter setter
<!-- 
  将data对象中的属性重新定义了下 每个属性都有get set

  验证方式:
    我们可以在html里面打印下 vm 可以看到 vm身上的_data对象的属性里面每个属性都有了 getter setter了
 -->

- 参数:
- target:   目标对象
- key:      取的目标对象的key
- value:    取的目标对象的value


> 要点:
- 我们get方法中取的是 这个形参value 而不是直接从原对象(target)中取值
- 我们set的时候设置的也是 这个形参value 也就是将设置的值暂存到这个value形参里 取的时候也是取形参value暂存的值

- 这样不会造成 内存溢出 死循环

```js
export function defineReactive(target, key, value) {

  // 上来调用次observe() 如果value是对象的话再次观测
  observe(value)
  
  // 参数value 相当于闭包 相当于在defineProperty函数外层定义了一个变量 该变量不会被销毁 
  // let value = 形参
  
  
  // 我们使用这个api 取值的时候会执行get 修改的时候会执行set 这样就拦截了用户的操作
  Object.defineProperty(target, key, {
    // 取值: 
    get() {
      // 取值的时候 取参数value
      return value
    },

    set(val) {
      // 设置值的时候 设置参数value
      if(val == value) return // 值一样的话就不用修改了

      // 如果设置的值是一个对象的话我们要对设置的值再次代理
      /*
        比如用户这样修改值: 
        vm.address = {
          num: 1
        }
        这样做的话 我们set的val就是一个对象了 我们应该对对象的值再次代理
      */
      observe(val)
      value = val
    }
  })
}
```

- console.log(vm)
```js
Vue: {
  // 传入的配置项
  $options: {data: ƒ}
  _data: {
    name: (...),
    age: (...)
  }
}
```

- 但是上面设置完后还有一个问题:
- 我们将 配置好setter getter 的data挂载到了实例身上
- vm._data

- 那我们要获取 name 的话 要需要 vm._data.name 这就很恶心了
- 我们使用 Vue 的时候 读取data配置项中的变量 都是直接通过 this vm 来读取的 比如 this.name
- 那也就是说 我们要讲 _data 中的数据 还要代理到 vm 实例身上

  vm.name -> vm._data.name

- 当我们读取 name 属性的时候 是从 _data 身上读取得的


> 怎么做?
- 我们先看一个小例子
- vm本身没有name属性 但现在我希望 
- 当我 vm.name 的时候是从 vm._data.name 身上获取的

- 那我就需要通过 defineProperty方法在 vm 添加一个 name 属性 并配置 getter 当取值的时候 取 vm._data.name

```js
let vm = {
  "_data": {
    name: "sam"
  }
}
console.log(vm.name)  // undefined
console.log(vm._data.name)  // sam

/*
  使用 defineProperty 给 vm 身上添加 name 属性 并配置 getter
*/
Object.defineProperty(vm, "name", {
  get() {
    return vm._data.name
  }
})
```

- 同理:
- 我们已经重新定义了$options.data 并将配置好get set的data挂载到了 vm._data 上了
- 那现在我们再次的将 _data 对象中的所有 key 循环使用 Object.defineProperty 方法添加到 vm 身上

- 当我们直接从 vm[key] 的时候 实际上是从 vm._data[key] 获取的值


> 回顾下:
- initState 在 _init 中调用 
- initState里面因为要初始化 data 所以调用了 initData() 

- initData()方法中做了 重新定义data对象 
- 后续逻辑中 又做了 将_data身上的key 使用get set挂载到vm身上的逻辑

- 为了完成上面的逻辑我们定义了 proxy() 方法

> proxy(vm, target, key)
- 定义将_data中的所有key 使用Object.defineProperty() 在vm身上重新定义一份的代理方法

- 参数:
- vm: 
  我们要给vm身上绑定_data对象中的属性名

- target: 
  当 vm.name 的时候从哪个原对象上读取 vm._data
    
- key:
  循环从_data身上取出的key

```js
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    // 当从 vm 身上读取属性的时候
    get() {
      // 从 vm._data[key] 取值
      return vm[target][key]
    },
    set(val) {
      vm[target][key] = val 
    }
  })

}
```

```js
// state.js
import { observe } from "./observe/index.js"

// 用于处理 options 中的配置项(状态)
export function initState(vm) {

  // 从实例身上取出 $options 获取所有的选项
  let opts = vm.$options

  // 如果用户有添加 data 配置项
  if(opts.data) {
    // 如果有就对 data 进行初始化操作
    initData(vm)
  }

}

function initData(vm) {

  // 拿到 data配置项后 要对里面的数据进行代理
  let data = vm.$options.data

  data = typeof data == "function" ? data.call(vm) : data

  vm._data = data
  observe(data)

  // 到这里就说明给 data对象重新定义完了属性


  // 遍历data
  for(let key in data) {
    // 将 vm._data 用 vm 来代理
    proxy(vm, "_data", key)
  }
}


// 给 vm 定义 _data对象中的key 的代理方法
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    // 当从 vm 身上读取属性的时候
    get() {
      // 从 vm._data[key] 取值
      return vm[target][key]
    },
    set(val) {
      vm[target][key] = val 
    }
  })

}
```

- 上面我们也看见了 给好多对象都加上了get set性能所以会差 但不说别的 我们完成了 vm.name 的取值操作

---

- 上面的的代码完成了 当 data 里面的数据格式如下的时候 我们完成了 代理操作 每一个属性都有对应的 getter setter
```js
data: {
  name: "sam",
  age: 18
}
```

- 但是当 data 里面的数据格式如下的时候 我们只是对
  name
  age
  address

- 进行了劫持, 但是当address是一个对象的时候 它里面的属性并没有被劫持
```js
data: {
  name: "sam",
  age: 18,
  address: {
    local: "白山",
    num: "133000"
  }
}
```

- 我们是通过 Observer 类中的 walk() 方法做的 数据劫持逻辑
- walk() 方法中调用了 defineReactive() 方法完成的具体逻辑
```js
// 对data对象进行遍历 获取到 key value
walk(data) {
  Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
}


// 然后将 data key value传入
export function defineReactive(target, key, value) {
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(val) {
      // 设置值的时候 设置参数value
      if(val == value) return

      // 当我们修改的时候形式为: address = {} 的形式的话 要再次调用observe()方法对里面的数据进行代理
      observe(val)
      value = val
    }
  })
}
```

- defineReactive() 方法的value 有可能是一个对象(比如当value就是address的时候就是一个对象)


- 我们在defineReactive()前面 先调用observe(value)
- observe(value)中会先判断 传入的数据是不是一个对象 如果是的话会再次的 new Observer(data) 再次的执行 this.walk() 方法 再次将里面的数据做数据劫持

```js
export function defineReactive(target, key, value) {

  // 这里调用 observe() 传入 value 对所有的对象都进行了属性劫持
  observe(value)


  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(val) {
      if(val == value) return

      // 这里
      observe(val)
      value = val
    }
  })
}


export function observe(data) {
  
  if(typeof data !== "object" || data == null) return
  return new Observer(data)
}
```

------

> data配置项中属性是数组的情况
- 上面的逻辑中完成了 data配置项中的属性是普通数据类型 和 对象的数据劫持逻辑

- 接下来就是 当data配置项中是数组的情况
```js
data: {
  name: "sam",
  hobby: ["eat", "drink"]
}

arr: Array(2)
0: (...)
1: (...)

get 0: ƒ ()
set 0: ƒ (val)
get 1: ƒ ()
set 1: ƒ (val)
```

- 我们发现上面的代码将数组中的每一个属性 也配置上了 getter setter 这样会有什么样的问题 看似不也挺好的么

- 这样我们改数组的[0] 或者 [1] 不也能触发视图的更新么
- 是可以 因为我们数组中的每个元素都有 getter setter 通过 vm.hobby[0] = "1" 这种方式修改数据 也会走getter 中的逻辑 也能触发视图的更新 不挺好的

- 但是思考下如果数组中有10000个成员 这样我们的代码在内部循环的时候 就会走多次proxy()的逻辑(将属性一一挂载到vm身上) 这样就太多了 浪费性能 因为要代理10000次

- 而且用户很少以这样方式 vm.hobby[888] 使用数组 也就是说修改数组的时候 很少通过索引的方式来操作 用户一般操作数组的都是通过方法来修改

  push
  shift
  pop
  unshift

- 所以我们考虑 要是数组中的元素是基本数据类型的话 就不要做循环观测监测了 
<!-- 
  因为 数组本身已经是有get set的了 
  我们希望是当我们使用的是 push等可以修改原数组的方法的时候 我们也能监测到数组的改变 
-->

- 而

  observe(data) 是用来对数据进行劫持 添加get set操作的
    new Observer(data)
      this.walk(data)   -- 这里完成的**对对象**加工get set 的主要逻辑

- 所以 我们可以在 new Observer(data) 的 constructor中对data进行判断 
  如果是数组 
  如果不是数组 
  
- 应该各自怎么样

```js
// 判断 data 是否是数组
if(Array.isArray(data)) {

  // 如果是数组 那就是监控用户有没有调用 操作数组的方法
  // 我们可以重写数组中的方法 7个变异方法(这几个方法是可以修改原数组的)

} else {

  // 不是数组 调用 walk() 方法对数据进行劫持
  this.walk(data)

}


// 循环对象对属性依次劫持
walk(data) {
  Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
}
```


> 当 data 是数组的时候 我们要重写 数组的方法
- 目的:
- 当用户调用了 push 等方法的时候 我们希望能够知道
```js
vm.hobby.push("sleep")
```

- 那如何监测用户使用了 push 等方法呢？
- 比如 我们自定义一个push, 这个push中主要完成2个逻辑
- 1. 调用 Array 原型的push方法 主要完成原有的push逻辑操作
- 2. 在重写的push方法我们 我们添加其他的逻辑

- 监视当用户调用了push那么就意味着用户修改了数组 所以我们可以在重写的数组方法中做更新的操作

- 另外: 
- 除了 arr: [1,3] 这种元素为基本数据类型的情况 
- 还有 arr: [1,3,{name:"sam"}] 元素为一个对象的情况 数组里面套对象

- 我们要完成
  当数组中的元素为基本数据类型的时候 我们不对元素做监测
  当数组中的元素为引用数据类型的时候 我们要对对象中的属性 做监测

- arr[2].name = "erin" 这样改的不是数组的元素 而是数组中的对象中的属性 这种情况也应该劫持到


> 总结逻辑:
- 当 data 中的属性是数组的情况下

- 1. 我们希望要对数组中的每一个值都进行观测 所以要遍历数组 拿到每一项 传入到 observe(item) 方法中
<!-- 
  该方法首先会判断是否为对象 只有对象才会被监测
 -->

- 2. 当我们通过数组的方法操作数组的时候 我们要重写数组的方法


```js
class Observer {
  // data 就是 options 中的 data
  constructor(data) {

    // 判断 data 是否是数组
    if(Array.isArray(data)) {

      /*
        1. 如果是数组 那就是监控用户有没有调用 操作数组的方法 我们可以重写数组中的方法 7个变异方法(这几个方法是可以修改原数组的)

        2. 对数组中的每一个成员都要进行观测 对数组中的每一项进行劫持
      */
      this.observeArray(data)


    } else {
      // 不是数组
      this.walk(data)
    }
  }
 
  walk(data) {
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }


  // 监测数组中的成员
  observeArray(data) {
    // 将数组中的每一项都进行观测
    data.forEach(item => observe(item))
  }
}
```

- 监测数组中的成员是调用 observeArray(data) 内部搭配 observe() 方法完成的

- observe(item)里面会对 item 进行判断
- if(typeof data !== "object" || data == null) return

- 如果是对象 才会将里面的属性设置get set
- 也就是说当数组中的成员是对象的时候 我们就给对象中的属性重新定义成get set的形式

> 小回顾:
```js
data: {
  name: "sam",
  address: {
    local: "白山"
  },
  hobby: [1, 2, {name: "erin"}]
}
```

> 1. 第一次data是一个对象 
  首先通过 observe(data) 方法 
    内部 new Oberser(data) 类
      内部 通过 walk(data)
        内部 遍历data 拿到data中的key value 在forEach中执行了 defineReactive()
        defineReactive()方法用于重新定义对象 将每个属性配置get set
        也就是说这时候基本类型的值这时候就有get set了
  然后通过 proxy() 方法 将这些属性代理到了vm身上


> 2. 当data对象中还有对象的时候 
- 这时候是什么时机发现的 walk(data) 会遍历data拿到 key value 然后执行defineReactive() 该方法中上面是调用了 observe(value) 相当于判断data是不是对象 如果是对象则走上面的逻辑 重新为对象中的每一个值配置get set

------

> 函数的监测
- 上面的逻辑完成后 说明了 数组中的对象是可以被监控到的
```js
// 当我们输出数组中的对象中的属性的时候
vm.hobby[2].name

// 第一次getter中打印 hobby 因为 data中的hobby属性被监测到了
hobby

// 第二次getter中打印 name 因为hobby中的对象中的属性被监测到了
name


hobby: (...)  //Array(3)
0: "eat"
1: "drink"
2: name: (...)
```

- 上面是 当数组中有对象 
- vm.hobby[2].name 我们通过这种方法读取 和 修改数组的时候能通过get set来执行逻辑 也就是说数组中的对象中的属性别监控到了 

- 但是我们通过 
- vm.hobby.push("1")
- 这种使用数组方法的情况 怎么才能被监测到呢?

- **这就需要重写当前数组身上的方法了**

- 我们先回顾下之前的知识:
```js
let arr = [1,2,3]
// 也就是说 arr 是 Array 的实例
console.log(arr instanceof Array)

// 构造函数才有prototype
console.log(Array.prototype)
// 实例对象身上有__proto__
console.log(arr.__proto__)

// 它们指向同一个对象 true
console.log(Array.prototype == arr.__proto__)
```

- Array的实例 是可以调用 Array原型对象上的方法的
- 我们能通过 arr.push 是通过 __proto__ 找到了Array.prototype原型对象上的方法

- 那么当我们这么操作是什么意思:
```js
arr.__proto__ = {
  push() { ... }
}

arr.push(1) // arr.push is not a function
```

- 将 arr 指向了一个新的原型对象吧 而且里面只有 push 方法了 其它方法都没了

- 但是这样做肯定不合理 相当于将原始的push覆盖掉了
- 这里我们还是希望 arr 可以调用Array原型上的其它的方法的

- 也就是说我们需要保留数组的原有方法

- 这样我们就创建一个 array.js 来完成相关的逻辑

  | - src
    - index.js
    | - observe
      - array.js
      - index.js

- 该文件用于重写数组中的部分方法 


> 函数的劫持(切片编程)
- 我们先回顾下 Object.create() API 的使用方式

```js
// 取得 Array 的原型对象
let oldArrayProto = Array.prototype

/*
  Object.create(oldArrayProto) 生成一个新的对象
  如果我们将这个新的对象 作为Vue中数组的原型对象的话

  那是不是说 vue中的数组.push 访问的就是 新原型对象

  扩展小测试:
  let oldProto = Array.prototype
  let newProto = Object.create(oldProto)

  console.log(oldProto == newProto)

  // 给新的原型对象扩展xxx方法
  newProto.xxx = function() {
    console.log("xxx")
  }

  let arr = [1,2,3]
  arr.__proto__ = newProto

  arr.xxx() // xxx
*/
let newArrayProto = Object.create(oldArrayProto)
console.log(newArrayProto)  // 都是数组的方法
```

- Object.create(oldArrayProto) 方法的作用：
- 1. 创建了一个新对象 
- 2. 并且设置了新对象的原型对象(给定参数)

- arr的原型对象是
  - newArrayProto
    - newArrayProto的原型对象是
      - oldArrayProto

```js 
console.log("验证:", arr.__proto__ == newProto && newProto.__proto__ == oldProto)  // true
```

- 上面的代码中 也相当于我们将 我们创建了两个原型对象
- 这样我们在修改 newArrayProto 原型对象上的push等方法 也不会覆盖掉 原来 Array.prototype 中的方法了

> 这么做有什么用?
- 我们可以在调用重写的push方法里面 调用原来的push方法 相当于给原来的push方法扩展了功能 
- 这种重写了数组的方法里面调用原来的方法 也叫做**函数的劫持 或者叫做 切片编程**

```js
// 1. 拿到 Array构造函数的原型对象中的内容
let oldArrayProto = Array.prototype

/*
  我们不能直接修改 Array.prototype 原型对象身上的方法
  如果我们这样操作
  Array.prototype.push = function() { }

  相当于将原来的push功能干掉了 不合理 原来的方法应该还在不要影响以前的应该在原来的基础上进行扩展
*/

// 2. 通过 Object.create() 创建一个新对象
let newArrayProto = Object.create(oldArrayProto)

/*
  这时候我们在这样操作就不会影响到 Array.prototype 身上的push方法了
  newArrayProto.push = function() {  }
  这样加是改变 newArrayProto 自己的原型对象 并没有改变 Array.prototype 身上的方法 所以不用担心被覆盖掉
*/

// 将能修改原数组的方法先找到
let methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "reverse",
  "sort",
  "splice"
]

methods.forEach(method => {
  // 重写这些方法 我们在 newArrayProto 身上增加这些方法
  newArrayProto[method] = function(...args) {
    // args参数: 比如 push(1)




    // 这里可以做自己的功能 扩展功能



    /*
      我们调用新的重写的方法的时候 里面调用原本的Array构造函数中的方法
      我们要将参数 传递到原生的方法中
      同时我们还要注意 this 的问题
      oldArrayProto[method]() 相当于直接 push()

      arr.push() 谁调用的push this就是谁 所以这里我们还要将this传递过去
    */
    const result = oldArrayProto[method].call(this, ...args)

    return result
  }
})
```

- 当调用重写的数组方法后 不仅仅通过原本的push方法来添加元素 还可以在重写的方法中添加新的逻辑


> 为什么要 oldArrayProto[method].call(this, ...args)
- 上面我们要注意的是 调用原来的的方法的时候 this 的问题 和 参数的问题

- 我们模拟下代码 下面还是跟上面的逻辑一样 我们创建了一个新对象 准备作为 vue中数组的原型对象使用(newArrayProto)
- 然后我们准备重写push方法
- 重写 newArrayProto 中的push方法 其内部调用了 旧的 Array.prototype 中的push方法

- 也就是说 arr.push() 会走我们重写过的逻辑 
- 而arr.push() 方法中又会执行 Array构造函数里面的push()

- 这里注意下this的问题:
- arr.push() 方法是谁调用的 this就是谁
- 所以我们在 newArrayProto[method] = function() {} 中打印this 指向的是 arr

- 只有有arr  arr.push(1) 我们才知道往arr数组中添加元素1 

- 但是如果我们直接调用 oldArrayProto[method]()
- 相当于 push(1) 直接调用 元素1并不知道要添加到哪里

- 所以我们要传递this给 Array.prototype 中的push方法
- 相当于这么调用的

  push.call(arr, 1)


```js
let oldArrayProto = Array.prototype
let newArrayProto = Object.create(oldArrayProto)

let methods = [
  "push"
]

// 重写 newArrayProto 中的push方法 在重写的方法里面 
methods.forEach(method => {
  newArrayProto[method] = function(...args) {
    console.log(args)

    // this就是arr, 因为谁调用的push方法 this就是谁 有了this的指向我们才知道往哪个对象中push数据
    console.log("this: ", this)

    // 调用旧的push方法
    // oldArrayProto[method](args) 相当于 push(5) 往哪个对象中添加? 不知道 因为这里是直接调用的 没this

    // 添加 this 往this中添加 相当于我们知道了往arr中添加
    oldArrayProto[method].call(this, ...args)
  }
})

  let arr = [1,2,3]
  arr.__proto__ = newArrayProto

  arr.push(5)
  console.log(arr)
```

---

- 上面我们就通过Object.create()创建了一个新的原型 我们可以将这个加工后的新的原型 newArrayProto 导出去
- 这个 newArrayProto 就是重写了 7种方法的原型对象 而且这个原型对象中还有数组以前的方法

- 然后我们在 observe/index.js 文件的 Observer 类中 
```js
class Observer {
  constructor(data) {

    // 判断 data 是否是数组
    if(Array.isArray(data)) {


      // 如果是数组 那就是监控用户有没有调用 操作数组的方法

      // 目的1: 重写数组中的方法
      // 我们可以重写数组中的方法 7个变异方法(这几个方法是可以修改原数组的)
      // 这样 当data(它是一个数组)调用push等方法的时候就会执行我们重写过的方法
      data.__proto__ = newArrayProto

      // 目的2: 对数组中的对象中的属性做劫持
      this.observeArray(data)


    } else {
      this.walk(data)
    }
  }
```

- 但是还有一个问题
- 当我们通过 重写的方法 push unshift 等添加一个新的对象的时候 新对象中的属性 并没有做get set处理
```js
hobby: Array(5)
0: "eat"
1: "drink"
2: {}       // 做get set处理的长这样
4: {a: 1}   // 没有做的长这样
```

- 原因: 我们只是拦截了push等函数 并没有对新增的参数 做处理
```js
methods.forEach(method => {

  newArrayProto[method] = function(...args) {


    // 我们并没有对 args 做处理 所以 args 没有get set


    const result = oldArrayProto[method].call(this, ...args)

    console.log("method: ", method)
    return result
  }
})
```

- 所以我们要对新增的数据再次的进行劫持 我们在重写的方法中 填入下面的逻辑
- 当插入元素后 我们使用 switch 做对应方法的处理 将添加的元素 保存到 inserted 变量中

- 这样 inserted 里面就是我们要进行观测(设置 get set 的元素)了

```js
methods.forEach(method => {

  newArrayProto[method] = function(...args) {
    const result = oldArrayProto[method].call(this, ...args)

    // 插入后 做逻辑处理

    // 定义变量 保存数组新增元素
    let inserted

    switch(method) {
      // 如果是这两个方法的话 参数肯定是追加的内容
      case "push":
      case "unshift":
        // 这里我们就要看追加的内容是不是对象 如果是 则做get set
        // args是数组哦
        inserted = args
        break
      
      // arr.splice(0, 1, {a:1}, {b:2}) 前两个参数表示位置和删除的个数 后面是新增的内容
      case "splice": 
        // 提取第三个参数
        inserted = args.slice(2)
        break
    }

    if(inserted) {
      // 如果有 inserted 我们就对它进行观测
    }

    return result
  }
})
```

- inserted 是数组 args是数组 args.slice返回的也是数组
- 我们要对 inserted数组中的元素进行观测的话 应该调用 Observer 中的 observeArray() 方法 这个方法会遍历当前数组 拿到每一项然后对每一项进行观测(设置 set get)

- 调用observeArray()方法的话 就要通过 Observer 实例来调用 我们在这里怎么能获取到 Observer的实例呢?

- 我们思考一个问题 重写后的方法是谁要调用
```js
class Observer {
  // data 就是 options 中的 data
  constructor(data) {

    if(data是数组) {
      /*
        我们是不是要在这里判断 data 是对象 还是数组 如果是数组的话
        1. 观察数组中的每一项 如果是对象再次观测其中的属性
        2. 重写数组的方法

        data是数组吧 它要调用 push 等方法
      */
    } else {
      // data不是数组
    }
  }
}
```
        
- 也就是说 Observer类中的 data 会调用push()方法 data.push()
- 那就是说谁调用的push this就是谁

- 同理说明 newArrayProto[method] = function() {} 函数中的this 就是 Observer类中的data 因为我们将这个函数中的this通过.call的方式传递过去了

- this == Observer.data 是同一个

- 这样我们在 Observer类中这样写 将Observer中的this绑定到了 data 身上
```js
class Observer {
  constructor(data) {

    // 这里的this是Observer类实例
    data.__ob__ = this
  }
}
```

- 上面这样写完后本函数的 this 身上也有 __ob__ 代表 Observer类的实例
- 我们可以通过该实例调用 observeArray() 方法了是么

```js
methods.forEach(method => {
  // 重写这些方法 我们在 newArrayProto 身上增加这些方法
  newArrayProto[method] = function(...args) {
    // args参数: 比如 push(1)

    /*
      我们调用新的重写的方法的时候 默认会调用原来的方法
      我们要将参数 传递到原生的方法中
      同时我们还要注意 this 的问题
      oldArrayProto[method]() 相当于直接 push()

      arr.push() 谁调用的push this就是谁 所以这里我们还要将this传递过去
    */
    const result = oldArrayProto[method].call(this, ...args)


    // 插入后再做观测 没插就做观测 那叫啥逻辑

    
    // 定义变量 保存数组新增元素
    let inserted

    // Observer类中 我们将代表实例的this 绑定到了 data.__ob__ 身上 因为 本函数中的this就是 Observer类中的data 所以可以这么获取
    let ob = this.__ob__

    switch(method) {
      // 如果是这两个方法的话 参数肯定是追加的内容
      case "push":
      case "unshift":
        // 这里我们就要看追加的内容是不是对象 如果是 则做get set
        // args是数组哦
        inserted = args
        break
      
      // arr.splice(0, 1, {a:1}, {b:2}) 前两个参数表示位置和删除的个数 后面是新增的内容
      case "splice": 
        // 提取第三个参数
        inserted = args.slice(2)
        break
    }

    console.log("新增的内容: ", inserted)

    // 如果有新增的内容则需要对新增的内容再次的进行观测
    // inserted 是数组 args是数组 args.slice返回的也是数组
    if(inserted) {
      /*
        如果我们要对数组进行观测调用的是 Observer类中的 observeArray() 方法 这个方法会遍历当前数组 拿到每一项然后对每一项进行观测
        那怎么拿到 Observer类呢?

        我们思考一个问题 重写后的方法是谁要调用
        class Observer {
          // data 就是 options 中的 data
          constructor(data) {

            if(data是数组) {

              我们是不是要在这里判断 data 是对象 还是数组 如果是数组的话
              1. 观察数组中的每一项 如果是对象再次观测其中的属性
              2. 重写数组的方法

              data是数组吧 它要调用 push 等方法

            } else {
              data不是数组
            }
          }
        }
        
        也就是说 Observer类中的data 会调用push()方法 data.push()
        那就是说谁调用的push this就是谁

        同理说明 newArrayProto[method] = function() {} 函数中的this 就是 Observer类中的data
        this == Observer.data 是同一个

        这样我们在 Observer类中这样写 将Observer中的this绑定到了 data 身上
        class Observer {
          constructor(data) {

            // 这里的this是Observer类实例
            data.__ob__ = this
          }
        }

        上面这样写完后本函数的 this 身上也有 __ob__ 代表 Observer类的实例
        我们可以通过该实例调用 observeArray() 方法了是么
      */
      
      // 调用 Observer 类中的observeArray()方法 监测数组中的数据
      ob.observeArray(inserted)
    }

    return result
  }
})
```

- 同时 observe/index.js 也要做如下的修改
```js
class Observer {
  // data 就是 options 中的 data
  constructor(data) {

    // 这里的this是Observer类实例
    // 同时给数组加了一个标识 如果数据上有 __ob__ 则说明这个属性被观测过
    data.__ob__ = this

    // 判断 data 是否是数组
    if(Array.isArray(data)) {
      data.__proto__ = newArrayProto

      this.observeArray(data)

    } else {
      this.walk(data)
    }
    
  }

  walk(data) {
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }

  // 观测数组中的成员
  observeArray(data) {
    // 将数组中的每一项都进行观测
    data.forEach(item => observe(item))
  }
}
```

- 上面 我们设置了 data.__ob__ = this 我们在data身上定义了自定义属性 用来传递this 和 做标记
```js
constructor(data) {
  data.__ob__ = this

  if(Array.isArray(data)) {
    // 数组的逻辑
  } else {
    // 对象的逻辑
  }
}
```

- 这里这么做有bug
- 如果 data 是对象的话 我们也会往 对象身上 添加 __ob__

- 但是 走到 else 里面的话 this.walk(data) 会对 data 做循环 
- 循环的时候也会遍历 data 上的 __ob__ 属性

- __ob__  == this == Observer实例对象 实例对象中又会有 Observer 类中的属性
- 这样会走 walk() walk中开发遍历 走defineReactive() 又走observe() 又 new Observer 又循环一遍 死循环了

- 所以我们要在walk中添加 在循环的时候 不要遍历到 __ob__ 这个属性 我们可以让 __ob__ 设置成不可枚举的

```js
constructor(data) {

  // 将 __ob__ 设置为不可枚举 循环的时候无法获取 从而避免死循环
  Object.defineProperty(data, "__ob__", {
    value: this,
    enumerable: false
  })

  // 这里的this是Observer类实例
  // 同时给数组加了一个标识 如果数据上有 __ob__ 则说明这个属性被观测过
  // data.__ob__ = this

  if(Array.isArray(data)) {
    data.__proto__ = newArrayProto
    this.observeArray(data)

  } else {
    this.walk(data)
  }
}
```

- 同时 我们修改下 observe() 方法
- 根据 __ob__ 标识我们也能够知道 该对象是否被观测过 如果观测过则直接返回
```js
export function observe(data) {
  
  // 监测data是否是对象 如果不是直接return 只对对象进行劫持
  if(typeof data !== "object" || data == null) return

  // 说明这个对象被代理过了 不用再被代理了
  if(data.__ob__ instanceof Observer) return data.__ob__

  return new Observer(data)
}
```

- 以上数组的劫持就完毕了 数组劫持的原因就是重写数组的方法 观测数组中的每一项 如果是数组的话 当我们调用方法往数组中添加元素的时候 我们要对添加的元素 再次进行观测


> 这个部分的完整代码:
```js
// src/index.js
import {initMixin} from "./init"

function Vue(options) {
  this._init(options)
}

initMixin(Vue)

export default Vue
```


```js
// src/init.js
import { initState } from "./state"


// 定义给 Vue 添加功能的方法
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {

    // 将this保存起来 以后就使用vm了 构造函数中的this就是实例
    const vm = this

    // 初始化的时候 将options放到Vue实例身上
    vm.$options = options

    // 初始化状态
    initState(vm)
  }
}
```

```js
// src/state.js
import { observe } from "./observe/index.js"

// 用于处理 options 中的配置项(状态)
export function initState(vm) {

  // 从实例身上取出 $options 获取所有的选项
  let opts = vm.$options

  // 如果用户有添加 data 配置项
  if(opts.data) {
    // 如果有就对 data 进行初始化操作
    initData(vm)
  }

}

function initData(vm) {

  // 拿到 data配置项后 要对里面的数据进行代理
  let data = vm.$options.data

  // 判断 data 是函数 还是对象 如果是函数的话我们进行调用获取其返回值
  data = typeof data == "function" ? data.call(vm) : data

  // 在 vm 身上增加 _data 我们将 $options的data对象放到了 vm身上
  vm._data = data

  // vue2中使用 Object.defineProperty() 来做数据的劫持
  // 我们在这里提供一个方法 观察data
  observe(data)

  // 到这里就说明给 data对象重新定义完了属性
  // 遍历data
  for(let key in data) {
    // 将 vm._data 用 vm 来代理
    proxy(vm, "_data", key)
  }
  

}

/*
  定义将_data中的所有key 使用Object.defineProperty() 在vm身上重新定义一份的代理方法
  参数:
    vm: 
      我们要给vm身上绑定_data对象中的属性名

    target: 
      当 vm.name 的时候从哪个原对象上读取 vm._data
    
    key:
      循环从_data身上取出的key

*/
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    // 当从 vm 身上读取属性的时候
    get() {
      // 从 vm._data[key] 取值
      return vm[target][key]
    },
    set(val) {
      vm[target][key] = val 
    }
  })

}
```

```js
// src/observe/index.js
import {newArrayProto} from "./array"

// 创建一个观测类 用于判断 data 是否被观测过
class Observer {
  // data 就是 options 中的 data
  constructor(data) {

    // 将 __ob__ 设置为不可枚举 循环的时候无法获取 从而避免死循环
    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false
    })

    // 这里的this是Observer类实例
    // 同时给数组加了一个标识 如果数据上有 __ob__ 则说明这个属性被观测过
    // data.__ob__ = this

    // 判断 data 是否是数组
    if(Array.isArray(data)) {
      // 如果是数组 那就是监控用户有没有调用 操作数组的方法

      // 目的1: 重写数组中的方法
      // 我们可以重写数组中的方法 7个变异方法(这几个方法是可以修改原数组的)

      // data是数组哦
      // 保留Array构造函数身上的原始方法 并且可以重写部分方法 newArrayProto里面就有我们重写的方法
      // data是一个数组, 当这个数组调用方法的时候 就会走 newArrayProto 里面的方法
      // 这样无论我们调用这7个方法中的任意一个 都可以被监控到 这就实现了数组方法的执行
      data.__proto__ = newArrayProto

      // 目的2: 对数组中的对象中的属性做劫持
      // 对数组中的每一个成员都要进行观测 对数组中的每一项进行劫持(里面调用了observ还是只对数组中的对象中的属性做了劫持)
      // 如果数组中放的是对象 可以监控到对象的变化
      this.observeArray(data)


    } else {
      // 不是数组

      // 我们要劫持data对象中的每一个属性
      // Object.defineProperty只能劫持已经存在的属性 后增的 或者删除的它是不知道的
      // 所以vue2中会为此单独的写一些api 比如 $set $delete 我们先这么用
      this.walk(data)

    }
    
  }

  /*
    constructor(data) {
      data.__ob__ = this

      if(Array.isArray(data)) {
        // 数组的逻辑
      } else {
        // 对象的逻辑
      }
    }

    这里这么做有bug
    如果 data 是对象的话 我们也会往 对象身上 添加 __ob__

    但是 走到 else 里面的话 this.walk(data) 会对 data 做循环 
    循环的时候也会遍历 data 上的 __ob__ 属性

    __ob__  == this == Observer实例对象 对象中又有 Observer 类中的属性
    这样会走 walk() walk中开发遍历 走defineReactive() 又走observe() 又 new Observer
    又循环一遍 死循环了

    所以我们要在walk中添加 在循环的时候 不要遍历到 __ob__ 这个属性 我们可以让 __ob__ 设置成不可枚举的
  */
 

  // 循环对象对属性依次劫持
  walk(data) {
    // 拿到data对象的每一个key后 可以重新定义对象中的属性(对传入的data中的属性重新定义相当于将属性重新重写了 所以性能会差 这也是vue2的问题 所以vue3中换了proxy)
    // 自定义defineReactive() 将data中的 某属性 定义成 响应式的
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }


  // 观测数组中的成员
  observeArray(data) {
    // 将数组中的每一项都进行观测
    data.forEach(item => observe(item))
  }
}

// 将目标对象的属性重新定义
// defineReactive()方法可以单独使用 理解为公共的api
// target: 重新定义哪个对象的属性(我们要重新定义data)
// key: 
// value:
export function defineReactive(target, key, value) { // 参数value 相当于闭包 相当于在defineProperty函数外层定义了一个变量 该变量不会被销毁

  // 这里调用 observe() 传入 value
  observe(value)

  // 我们使用这个api 取值的时候会执行get 修改的时候会执行set 这样就拦截了用户的操作
  Object.defineProperty(target, key, {
    // 取值: 
    get() {
      // 取值的时候 取参数value
      return value
    },
    // 
    set(val) {
      // 设置值的时候 设置参数value
      if(val == value) return // 值一样的话就不用修改了

      // 如果设置的值是一个对象的话我们要对设置的值再次代理
      /*
        比如用户这样修改值: 
        vm.address = {
          num: 1
        }
        这样做的话 我们set的val就是一个对象了 我们应该对对象的值再次代理
      */
      observe(val)
      value = val
    }
  })
}


export function observe(data) {
  
  // 监测data是否是对象 如果不是直接return 只对对象进行劫持
  if(typeof data !== "object" || data == null) return

  // 说明这个对象被代理过了 不用再被代理了
  if(data.__ob__ instanceof Observer) return data.__ob__


  // 如果一个对象被劫持过了 那就不需要再被劫持了
  // (要判断一个对象是否被劫持过 这里增添了一个实例 用实例来判断是否被劫持过)
  // vue在内部又创建了一个类 这个类的作用是专门观测数据的 如果该数据被观测过 那它的实例就是这个类
  return new Observer(data)
}
```

```js
// src/observe/array.js
// 1. 拿到 Array构造函数的原型对象中的内容
let oldArrayProto = Array.prototype

/*
  我们不能直接修改 Array.prototype 原型对象身上的方法
  如果我们这样操作
  Array.prototype.push = function() { }

  相当于将原来的push功能干掉了 不合理 原来的方法应该还在不要影响以前的应该在原来的基础上进行扩展
*/

// 2. 通过 Object.create() 创建一个新对象
// newArrayProto.__proto__ == oldArrayProto
// 这样我们还能通过 newArrayProto读到push等方法
export let newArrayProto = Object.create(oldArrayProto)

/*
  newArrayProto是作为原型对象使用的哦

  这时候我们在这样操作就不会影响到 Array.prototype 身上的push方法了
  newArrayProto.push = function() {  }
  这样加是改变 newArrayProto 自己的原型对象 并没有改变 Array.prototype 身上的方法 所以不用担心被覆盖掉
*/

// 将能修改原数组的方法先找到
let methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "reverse",
  "sort",
  "splice"
]

methods.forEach(method => {
  // 重写这些方法 我们在 newArrayProto 身上增加这些方法
  newArrayProto[method] = function(...args) {
    // args参数: 比如 push(1)

    /*
      我们调用新的重写的方法的时候 默认会调用原来的方法
      我们要将参数 传递到原生的方法中
      同时我们还要注意 this 的问题
      oldArrayProto[method]() 相当于直接 push()

      arr.push() 谁调用的push this就是谁 所以这里我们还要将this传递过去
    */
    const result = oldArrayProto[method].call(this, ...args)


    // 插入后再做观测 没插就做观测 那叫啥逻辑

    
    // 定义变量 保存数组新增元素
    let inserted

    // Observer类中 我们将代表实例的this 绑定到了 data.__ob__ 身上 因为 本函数中的this就是 Observer类中的data 所以可以这么获取
    let ob = this.__ob__

    switch(method) {
      // 如果是这两个方法的话 参数肯定是追加的内容
      case "push":
      case "unshift":
        // 这里我们就要看追加的内容是不是对象 如果是 则做get set
        // args是数组哦
        inserted = args
        break
      
      // arr.splice(0, 1, {a:1}, {b:2}) 前两个参数表示位置和删除的个数 后面是新增的内容
      case "splice": 
        // 提取第三个参数
        inserted = args.slice(2)
        break
    }

    console.log("新增的内容: ", inserted)

    // 如果有新增的内容则需要对新增的内容再次的进行观测
    // inserted 是数组 args是数组 args.slice返回的也是数组
    if(inserted) {
      /*
        如果我们要对数组进行观测调用的是 Observer类中的 observeArray() 方法 这个方法会遍历当前数组 拿到每一项然后对每一项进行观测
        那怎么拿到 Observer类呢?

        我们思考一个问题 重写后的方法是谁要调用
        class Observer {
          // data 就是 options 中的 data
          constructor(data) {

            if(data是数组) {

              我们是不是要在这里判断 data 是对象 还是数组 如果是数组的话
              1. 观察数组中的每一项 如果是对象再次观测其中的属性
              2. 重写数组的方法

              data是数组吧 它要调用 push 等方法

            } else {
              data不是数组
            }
          }
        }
        
        也就是说 Observer类中的data 会调用push()方法 data.push()
        那就是说谁调用的push this就是谁

        同理说明 newArrayProto[method] = function() {} 函数中的this 就是 Observer类中的data
        this == Observer.data 是同一个

        这样我们在 Observer类中这样写 将Observer中的this绑定到了 data 身上
        class Observer {
          constructor(data) {

            // 这里的this是Observer类实例
            data.__ob__ = this
          }
        }

        上面这样写完后本函数的 this 身上也有 __ob__ 代表 Observer类的实例
        我们可以通过该实例调用 observeArray() 方法了是么
      */
      
      // 调用 Observer 类中的observeArray()方法 监测数组中的数据
      ob.observeArray(inserted)
    }

    return result
  }
})
```

```js
```

----------------

### 解析模板参数
- 接下来我们就要将数据 解析到 html 上
```html
<div id="app">
  <!-- 胡须语法 -->
  <div>{{name}}</div>
  <span>{{age}}</span>
</div>

<script src="./vue.js"></script>
<script>
  const vm = new Vue({
    // 新配置项
    el: "#app",

    data: {
      name: "sam",
      age: 18,
      address: {
        local: "白山"
      },
      hobby: ["eat", "drink", {name: "erin"}]
    },
  })

  console.log(vm)
</script>
```

- 我们需要将模板中的 name age 进行数据的替换 我们可以考虑的方式有

> 1. 模板引擎: 
- 每次将模板拿到 用数据替换 性能很差 需要正则匹配替换
- vue1.0的时候没有引入虚拟DOM的概念 每次数据一遍就拿到html部分将里面的东西重新的换一下

> 2. 采用虚拟DOM
- 我们可以在数据变化后比较虚拟DOM的差异 最后更新需要封信的地方
- 那我们就要将 html模板部分变成js语法 可以通过js语法生成虚拟DOM

> 核心: 
- 我们需要**将模板变成我们的js语法** 通过js语法生成虚拟DOM

- 这个过程相当于
  从一个东西 变成 另一个东西
  或者
  语法之间的转换 es6 -> es5

- 我们都需要先变成语法树再重新组装代码成为新的语法
- 这里必不可少的要将html模板进行编译 编译成ast语法树 再进行转化

> 过程:
- 1. 我们要先通过 el 配置项拿到模板 然后再去解析模板
- 2. 将html字符串 通过解析 提取到每个标签中的数据 比如
  div 
  id=app
  文本

- 3. 将这些零散的数据 组织成一个 树结构 这样我们就能够得到一个树形结构 这棵树就是AST语法树

- 我们先来完成 AST语法的过程


> 获取 html模板
- Vue里模板相关的有很多
  - 1. el配置项: 通过选择器字符串找到模板
  - 2. template配置项: 在这里可以写模板
  - 3. render()函数配置项: 我们可以在返回值里使用代码生成模板
  ```js
  render(h) {
    return h("div", {}, "content")
  }
  ```

- 不管怎么样 最终我们都是将template语法转换成render函数
  

- 2. 我们在 _init() 函数中进行操作
- init() 方法中现在的逻辑为:
```js
// 定义给 Vue 添加功能的方法
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this
    vm.$options = options

    // 初始化状态
    initState(vm)


    // 该取模板的逻辑了
  }
}
```

- 我们已将完成了部分状态(数据data)的初始化操作 接下来我们就要看用户 提供下面的哪个配置项
  - el?
  - template?
  - render?

- 我们要进行判断
- 如果有render 那么以render为主
- 如果没render 有template配置项 那么先获取template配置对应的template模板
- 如果没render 没template配置项 那么使用el.outerHTML 来获取template模板

- 但在最终都是将获取的 template模板 编译成render
- 也就是说最终都是通过render来实现 模板中数据的替换的吧

---

> 补充知识点:
> el.outerHTML: 
- 获取的是包含给定元素对象el在内的 html 标签

---

- 知道了上面的逻辑后 我们需要在 _init() 方法中 根据 el | template | render 完成挂载应用的逻辑

```js
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {

    // 将this保存起来 以后就使用vm了 构造函数中的this就是实例
    const vm = this

    // 初始化的时候 将options放到Vue实例身上
    vm.$options = options

    // 初始化状态
    initState(vm)

---

    // 如果 options.el 说明用户传入了el
    if(options.el) {
      // 传入el配置的话 我们就要挂载应用 我们调用$mount(el)传入el 实现数据的挂载
      vm.$mount(options.el)
    }
  }
```

> 思路
- 判断用户是否传入了 el 如果传入了 调用 $mount() 方法


> $mount()
- 位置:
- Vue原型对象上的方法

> 内部逻辑:
- 1. 保存 this 到 vm 上
- 2. 根据传入的 选择器字符串 获取对应的DOM元素
- 3. 缓存下 vm.$options 到变量 opts 中
<!-- 
  用户传入的 配置对象会被继续传到 _init(options) 中 我们在 _init(options) 中将options挂载到了 vm 身上 $options
  而我们 $mount(el) 是Vue原型对象上的另一个方法 因为作用域的原因 我们不能直接获取到 _init(options) 方法中的 options

  这就体现了 我们将options放到vm实例上的好处 不管我们创建多少个不同的方法 都可以通过 vm 获取用户传入的 配置对象
-->

- 4. 判断 没有render 函数的情况下 我们才考虑 template 和 el

- 5. 
  - 如果没有template但是有el 那么我们通过 el.outerHTML 来获取模板内容
  - 如果有template则使用用户传入的template配置项中的内容

- 6. 将5中获取到的template内容编译成render函数

```js
// 给Vue扩展 $mount() 方法
Vue.prototype.$mount = function(el) {

  // 这里我们也要保存this为vm 往实例上添加东西
  const vm = this

  // 根据 字符串选择器 获取 dom元素
  el = document.querySelector(el)
  let opts = vm.$options

  /*
    首先看看有没有render 如果有render 我们直接使用render
    如果没有render 我们就要通过 el 或者 template配置项 获取html模板内容
  */
  // 如果没有render函数
  if(!opts.render) {

    // 定义template用于接收模板内容
    let template

    // 没有 template配置项 但是有 el配置项 那就直接通过el获取DOM元素作为模板内容
    if(!opts.template && el) {
        template = el.outerHTML

    /*
      因为上面 &&短路运算 如果表达式1为false 则整体为false 走else的逻辑
      就是说else的逻辑: 如果有 template 配置项
    */
    } else {
      // 到这里就是用户写了template配置项 那么就用用户传递的template中的内容s
      // 这里老师写的是 if(el) 但我没用哈哈
      if(opts.template) {
        template = opts.template
      }
    }


    // 上面完成了获取 模板内容的逻辑 我们看看是啥
    console.log("template内容为: ", template)
    /*
      <div id="app">
        <div style="color: red;">{{name}} -- hello</div>
        <span>{{age}}</span>
      </div>
    */


    // 如果有模板内容 我们再做模板编译的逻辑
    if(template) {

      // 调用 compileToFunction() 方法将 模板内容编译成 render函数
      let render = compileToFunction(template)
      
      // 将编译好的render函数放到 opts 上
      opts.render = render
    }
  }

  // 有render函数的情况 最后就统一成了render方法
  opts.render
}
```

---

> 扩展:
- 如果我们是通过 script标签引用 vue.global.js 的话 这个编译过程是在浏览器运行的
- Vue中还包含运行时runtime runtime中是不包含模板编译的 整个编译打包时靠loader来转义.vue 文件的
- 用runtime时不能使用 template配置项

---

> 解析 html 需要的正则:
- 匹配开始标签 结束标签 和 表达式的

```js
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`

/*
  正则: 
    /^<((?:[a-zA-Z_][\-\.0-9_a-zA-Z]*\:)?[a-zA-Z_][\-\.0-9_a-zA-Z]*)/
  
  作用:
    匹配开始标签名 情况有两种
    1. <xxx
    2. <div:xxx   标签带命名空间的情况
*/
const startTagOpen = new RegExp(`^<${qnameCapture}`)


/*
  正则: 
    /^<\/((?:[a-zA-Z_][\-\.0-9_a-zA-Z]*\:)?[a-zA-Z_][\-\.0-9_a-zA-Z]*)[^>]*>/

  作用:
    匹配结束标签名
    1. </xxx>
*/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)


/*
  作用:
    匹配属性

  正则中
    属性的key:   分组1
    属性的value: 分组3 |
                分组4 |
                分组5
*/
// 
// 
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/


// 匹配标签结束的  > or />
const startTagClose = /^\s*(\/?)>/


// 胡子语法的正则 {{分组1}} 分组1就是表达式的变量
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
```

---

> 解析 html 字符串
- 上面完成了对模板内容的获取 接下来我们就要对模板进行遍历 将传入(获取)的模板内容 编译成 render函数

- 我们将 compileToFunction() 方法 也提取出来 作为了一个核心的模块

  | - src
    | - compiler
      - index.js  // 关注这个

    | - observe
      - index.js

- 我们先将 html 字符串解析成 数据结构

---

> compileToFunction(template)
- 将 template 内容编译成 render 函数

- 该方法中内部我们要完成2部分的逻辑
- 1. 将 template 转化成 ast 语法树
- 2. 生成render方法(render方法执行后返回的结果就是虚拟DOM)

- 参数:
- html模板字符串

- 返回值:
- render函数


> 分析: 
- 目的: 
- 我们要解析下面的html模板 提取有用的部分 如:
- 开始标签的 标签名 标签属性 标签体内容 等
- 然后将所有标签的信息构建成一棵树 ast语法树
```html
<div id="app">
  <div style="color: red;">{{name}} -- hello</div>
  <span>{{age}}</span>
</div>
```

- 那解析的时候就要有能匹配标签 属性 字符串 表达式的能力 这里面我们使用的是正则的方式
<!-- 
  (Vue3中采用的不是正则 一个个字符判断)
 -->


> 1. 将 template 转化成 ast 语法树
**可以通过 htmlparser2 包来完成相关的逻辑**

- 安装:
- npm install htmlparser2

- 使用方式:
- 它可以解析 html / xml 可以将文档转换为DOM树
```js
// 引入
const htmlparser2 = require("htmlparser2");

// 使用:
const parser = new htmlparser2.Parser({

  // 开始标签的回调
  onopentag(name, attributes) {

  }

  // 文本的回调
  ontext(text) {

  }

  // 结束标签的回调
  onclosetag(tagname) {

  }
})


// 我觉得 html xml 文档应该写在这里
parser.write(
  "Xyz <script type='text/javascript'>const foo = '<<bar>>';</ script>"
);


// 结束
parser.end();
```

- 官网:
- https://www.npmjs.com/package/htmlparser2


------

> 我们自己实现下 解析 html 的操作
- 在 **compileToFunction()** 方法中 我们要先将 html 字符串 转化成 ast 语法树 
- 为了达成这个小目标 我们创建了 parseHTML(template) 专门 解析html字符串成为一个对象
```js
export function compileToFunction(template) {

  // 1. 将 template 转化成 ast 语法树
  let ast = parseHTML(template)

  // 2. 生成 render 方法 (render方法执行的返回的结果就是 虚拟DOM)

}
```

> parseHTML(template)
- 解析 传入的 template(html字符串)

- 大体逻辑:
- 1. 首先, 我们要使用循环 来处理html模板字符串 匹配
  开始标签 <div
  标签属性 id=app
  标签内容 文本

- 每匹配到一个部分 就从 html 字符串中删掉该部分 当 html 字符串为空时 停止循环


- 2. 在循环中 我们从开始标签开始解析 依次处理
```js
while(html) {

  if(开始标签) {
    1. 调用 处理开始标签的方法
    2. 将 处理结果 抛到封装树的函数
    3. 处理 结束标签
    4. 将处理结果 抛到封装树的函数
  }

  if(标签文本) {
    1. 获取到标签文本
    2. 将文本 抛到封装树的函数
  }
}
```


- 根据上面的逻辑 那我们就要判断, 什么时候是开始标签 我们检查 < 符号的位置
- let textEnd = html.indexOf("<")
- 当 textEnd 等于 0 则说明是开始标签
- 当 textEnd 大于 0 则说明是文本结束的位置

- 所以我们可以根据这个作为判断开始标签的逻辑

- 返回值:
- ast语法树


> 内部工具函数:
> advance(len)
- 作用: 
- 将匹配的内容删除(也可以理解为截取目标字符串的指定长度)
- 比如 "abc123cdf" 当我们匹配 abc后我们下次使用的内容应该是 123cdf 所以我们调用advance()方法

```js
function advance(len) {
  // 要 从len的位置开始提取到最后 的字符
  html = html.substring(len)
}
```

> 详细逻辑:
- 我们的模板中一个标签能够提取到的内容分为 下面的几个部分 
- 然后我们会将可提取的部分 封装为一个数据结构
  <xxx
  id="app"
  >
  文本
  </div>

- 每解析一个部分 我们就从 html字符串中把这个部分删掉 当字符串都被截取完毕 就停止解析

- 比如:
- 解析完开始标签 <div 
    就将 <div 从html字符串中删掉该部分

- 解析属性 id="app"
    就将 id="app" 从html字符串中删掉该部分

- 最后html字符串被删完了 就结束了


- 接下来我们开始解析开始标签:
- 那什么是开始标签呢? 
- html最开始肯定是一个 <
- 
  0
  ↓
  <div>html</div>

  当我们使用 html.indexOf("<") 检查<的位置的时候 如果索引为0 肯定是标签
  当我们解析完开始标签的时候 删除开始标签 变成

      ↓
  html</div>

- 那这个时候我们再使用 html.indexOf("<") 取 < 的位置的时候
- 如果索引 大于 0 那索引的位置就是**文本结束的位置**

---

- 因为每解析一个部分 就删除这个部分 所以我们 循环提取数据 当字符串为空退出循环
```js
while(html) {

  let textEnd = html.indexOf("<")

  // 这种情况下为开始标签
  if(textEnd == 0) {
    // 调用 解析开始标签 的方法
  }

  // 标签文本位置
  if(textEnd > 0) {
    let text = html.substring(0, textEnd)
  }
}
```


> 接下来我们看看 解析 开始标签 方法
> parseStartTag()
- 该方法用于解析开始标签

- 返回值:
- 开始标签(每一个标签)的数据对象
```js
// 类似这样
match: {
  tagName: "div",
  attr: [
    {name: id, value: app}
  ]
}
```

> 内部逻辑:
> 1. 根据匹配开始标签的正则 拿到开始标签的内容
- 也就是说 parseStartTag() 方法是根据正则来匹配开始标签 如果没有匹配到结果 则返回null

<!-- 
  0: "<div"
  1: "div"

  groups: undefined
  index: 0
  input: "<div id=\"app\">\n    <div style=\"color: red;\">{{name}} -- hello</div>\n    <span>{{age}}</span>\n  </div>"
  length: 2

  ---

  0: 匹配的内容
  1: 分组内容: 标签名
 -->


> 2. 如果匹配到了内容 则进行数据的初始化 映射开始标签的数据对象
```js
const match = {
  // 标签名
  tagName: start[1],
  // 标签属性 我们整理成 name: id, value: app 的形式
  attrs: []
}
```

> 3. 当匹配到了内容后 将原字符串重新赋值为 advance(len) 后的内容
<!-- 
  html现在的内容为: 
    id="app">
    <div style="color: red;">{{name}} -- hello</div>
    <span>{{age}}</span>
  </div>

  去掉了 <div 的部分
 -->

> 4. 接下来开始提取标签属性 
- 因为标签属性可能有多组 所以这个部分我们要使用循环

- 循环的退出条件是:
- 只要我们遇到 *开始标签的结束* > 我们就退出循环

- 什么时候是开始标签的结束 我们可以使用正则来完成 startTagClose正则

```js
// 如果不是开始标签的结束则一直匹配 同时每次匹配的时候我们还需要将属性保留起来
let attr;

// 开始标签的结束 >
let end;

// 遇到 > 则退出循环
while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {

  // 每次匹配到结果 我们继续删掉匹配到的内容 也就是调用 advance() 方法
  advance(attr[0].length)

  // 将 标签属性 push到数组中 match.attrs 中 
  match.attrs.push({
    name: attr[1],
    // 如果是 disable 的情况 可以直接给个true
    value: attr[3] || attr[4] || attr[5] || true
  })
}

// end为 > 我们也要删掉这个部分
if(end) advance(end[0].length)


console.log("开始标签对象:", match)
/*
  match: {
    tagName: "div",
    attr: [
      {
        name: id,
        value: app
      }
    ]
  }
*/
return match
```

> parseStartTag() 整体逻辑
```js
function parseStartTag() {

  // 使用 正则startTagOpen 看看是不是开始标签
  const start = html.match(startTagOpen)

  if(start) {
    // 如果是开始标签的话 则将结果组织成一个对象
    const match = {
      // 标签名
      tagName: start[1],
      // 标签属性
      attrs: []
    }

    // 当匹配到内容(如开始标签) 要将该部分内容删除 advance前进的意思 那前进多少呢 就是匹配内容的总长度
    advance(start[0].length)
   
    // 如果不是开始标签的结束则一直匹配 同时每次匹配的时候我们还需要将属性保留起来
    let attr;

    // 开始标签的结束 >
    let end;

    while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      // 每次匹配到结果 我们继续删掉匹配到的内容 也就是调用 advance() 方法
      advance(attr[0].length)

      // 将 标签属性 整理到 match.attrs 中
      match.attrs.push({
        name: attr[1],
        // 如果是 disable 的情况 可以直接给个true
        value: attr[3] || attr[4] || attr[5] || true
      })
    }

    // 上面我们发现还有一个 开始标签的 > 结束 我们也应该把它也删掉 它被我们保存到 end 变量中了
    if(end) advance(end[0].length)
    return match
  }


  // 不是开始标签则return false
  return false
}
```

- 解析完开始标签后 我们可以拿到一个 包含开始标签信息的对象
```js
match: {
  tagName: "div",
  attr: [
    {
      name: id,
      value: app
    }
  ]
}
```


- 我们先回顾下 这个部分的逻辑
- 类似每一次循环负责一件事情
```js
// 伪代码:
while(html) {
  if(textEnd == 0) {
    1. 调用 解析开始标签的方法 将结果合成树函数 删掉开始标签 continue(重新下一轮循环)

    2. 如果遇到 结束标签 将结果合成树函数 删掉结束标签 continue(重新下一轮循环)
  }

  if(textEnd > 0) {
    3. 遇到文本 提取文本 将文本抛到合成树函数 然后删掉文本
  }
}
```


- 接下来我们继续 循环解析 html模板字符串的逻辑
```js
while(html) {

  let textEnd = html.indexOf("<")

  // 这种情况下为开始标签
  if(textEnd == 0) {

    // parseStartTag()解析开始标签的方法, 返回值为开始标签的解析结果
    const startTagMatch = parseStartTag()

    // 如果 startTagMatch 有值 就直接跳过本轮的操作
    if(startTagMatch) {

      // 拿到开始标签的内容后 我们交给 handleStart() 来进行处理
      handleStart(startTagMatch.tagName, startTagMatch.attrs)

      // 重新开始循环
      continue
    }

    // 到这 就是如果不是开始标签 就是结束标签 返回当前结束标签的名字 endTagMatch为匹配到的结束标签
    let endTagMatch = html.match(endTag)
    // console.log("endTagMatch", endTagMatch)

    // 直接是 结束标签 的原因 <div></div> 的情况
    // 结束标签不用处理直接删除就可以
    if(endTagMatch) {
      // console.log("endTagMatch", endTagMatch)
      advance(endTagMatch[0].length)

      // 拿到 结束标签后 我们交给 handleEnd() 来处理
      handleEnd(endTagMatch[1])
      continue
    }
  }
}
```

- 我们通过 调用 parseStartTag() 拿到了开始标签的解析结果(对象)
- 我们会将
  开始标签的解析结果
  标签内容的解析结果
  结束标签的解析结果

- 都抛到 合成树的工具函数中


- 所以当我们拿到开始标签的解析结果后 会调用 handleStart(tagName, attrs) 方法将结果抛到 合成树的函数中
- 然后 continue

```html
<这部分的处理完了> 被删掉了
  ↓
  <div style="color: red;">{{name}} -- hello</div>
  <span>{{age}}</span>
</div>
```

- continue后会重新开始循环 进入循环后 首先会判断 textEnd == 0 ?
- 这次不等于0了 所以走的 textEnd > 0 的逻辑 提取字符串(提取的是很多换行空格)
- 然后将提取的部分删掉 并将匹配的到文本交由 handleText(text) 逻辑处理

- 这一次循环走完 
- 然后开始下一轮循环
```html
<!-- 因为删掉了很多空格换行 < 顶头了 -->
<div style="color: red;">{{name}} -- hello</div>
  <span>{{age}}</span>
</div>
```

- 进入到循环后 又开始判断 textEnd == 0 ?
- 这次判断结果为 开始标签 调用了 parseStartTag() 的方法 解析 删掉 抛出 continue
```html
{{name}} -- hello</div>
  <span>{{age}}</span>
</div>
```

- 新的一轮循环后 会走 textEnd > 0 的逻辑 提取文本 抛出 删掉 重新下一轮循环
```html
</div>
  <span>{{age}}</span>
</div>
```

- 这时候 会进入 let endTagMatch = html.match(endTag) 逻辑 因为startTagMatch的结果为空(这个部分是根据开始标签的正则匹配的) 所以会直接走删除结束标签的逻辑
```js
let endTagMatch = html.match(endTag)

// 直接是 结束标签 的原因 <div></div> 的情况
// 结束标签不用处理直接删除就可以
if(endTagMatch) {
  advance(endTagMatch[0].length)

  // 拿到 结束标签后 我们交给 handleEnd() 来处理
  handleEnd(endTagMatch[1])
  continue
}
```


> 这个部分完成代码
```js
// 对获取的template内容进行编译
export function compileToFunction(template) {
  let ast = parseHTML(template)
}



function parseHTML(html) {
  // 将匹配的内容删除(也可以理解为截取目标字符串的指定长度)
  function advance(len) {
    html = html.substring(len)
  }


  // 解析开始标签的方法
  function parseStartTag() {

    // 使用 正则startTagOpen 看看是不是开始标签
    const start = html.match(startTagOpen)
    if(start) {
      // 如果是开始标签的话 则将结果组织成一个对象
      const match = {
        // 标签名
        tagName: start[1],
        // 标签属性
        attrs: []
      }
  
      advance(start[0].length)

      // 如果不是开始标签的结束则一直匹配 同时每次匹配的时候我们还需要将属性保留起来
      let attr;

      // 开始标签的结束 >
      let end;

      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // 每次匹配到结果 我们继续删掉匹配到的内容 也就是调用 advance() 方法
        advance(attr[0].length)

        // 将 标签属性 整理到 match.attrs 中
        match.attrs.push({
          name: attr[1],
          // 如果是 disable 的情况 可以直接给个true
          value: attr[3] || attr[4] || attr[5] || true
        })
      }

      // 上面我们发现还有一个 开始标签的 > 结束 我们也应该把它也删掉 它被我们保存到 end 变量中了
      if(end) advance(end[0].length)
      return match
    }
    // 不是开始标签则return false
    return false
  }

  while(html) {
    let textEnd = html.indexOf("<")

    // 这种情况下为开始标签
    if(textEnd == 0) {
      const startTagMatch = parseStartTag()
      if(startTagMatch) {
        handleStart(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }


      let endTagMatch = html.match(endTag)
      if(endTagMatch) {
        advance(endTagMatch[0].length)
        handleEnd(endTagMatch[1])
        continue
      }
    }

    // 到标签文本的位置了 我们就需要将文本获取到 找到文本将文本提取出来
    if(textEnd > 0) {

      // 文本内容
      let text = html.substring(0, textEnd)

      if(text) {
        handleText(text)
        advance(text.length)
      }
    }
  }
}

```

- 后面依次类推 当我们循环结束后 html字符串为空 同时也说明

---

> ast的目的:
- 实现语法层面上的转义 比如 把es6转成es5 把html css转成js


> 解析成 ast树的逻辑
- 各个标签都有了对应的数据对象 同时我们也将提取出来的结果 抛到了合成ast树的逻辑中

- 接下来我们看看是怎么合成一棵 ast语法树的
- 既然是一棵树 那肯定有父子关系 我们上面只是拿到了 各个标签对应的数据对象 这个零散的数据对象 怎么确定其父子关系构建成一棵树
<!-- 
         div
        ↙   ↘
      div   span
    ↙           ↘
{{name}}      {{age}}
-->


> 栈结构方案:
```html
<div id="app">
  <div style="color: red;">{{name}} -- hello</div>
  <span>{{age}}</span>
</div>
```

- 我们可以利用栈结构来构建树关系

- 当我们拿到开始标签的node时 将其压入栈 第一次进栈的肯定是root
- [div#app-node]

- 当我们再次拿到开始标签的node时 <div-style> 这个当前的node 的爸爸 就是栈中栈顶(尾部)元素 这时候我们设置 <div-style>这个node.parent 属性为栈顶元素 同时压入栈中
- [div-node,div-style-node]

- 当我们遇到 结束标签的时候 就将栈顶元素弹出
- [div-node]

- 当我们再次遇到开始标签的node时 <span> 这个当前的node 的爸爸 就是栈中栈顶(尾部)元素 这时候我们设置 <span>这个node.parent 属性为栈顶元素 同时压入栈中
- [div-node,span]

- 当我们遇到 结束标签的时候 就将栈顶元素弹出
- [div-node]


- 理念知道了后 我们看看怎么完成这个部分的逻辑

> 节点对象的属性
- 开始标签节点:
```js
{
  tag,
  attrs,
  type: ELEMENT_TYPE,
  parent: null,
  // 在解析开始标签的时候并不知道孩子是谁 先给个空
  children: []
}
```

- 标签文本节点:
```js
{
  // 文本节点的类型是文本
  type: TEXT_TYPE,
  // 文本内容
  text: txt,
  // 文本节点的父节点也是栈顶元素
  parent: currentParent
}
```


> 树结构的初始化属性
```js
// 元素类型
const ELEMENT_TYPE = 1

// 文本类型
const TEXT_TYPE = 3

// 用于存放元素的
const stack = []

// 指向栈顶的元素的指针 栈顶元素都是当前匹配到元素的父亲 所以我们的变量名也这么起
let currentParent = null

// 根节点 它也是最后的 ast 语法树
let root = null
```


> 创建 树节点的方法
```js
function createASTElement(tag, attrs) {
  return {
    tag,
    attrs,
    type: ELEMENT_TYPE,
    parent: null,
    // 在解析开始标签的时候并不知道孩子是谁 先给个空
    children: []
  }
}
```


> 处理开始标签
- 1. 根据 while(html) 循环出来的标签属性 生成节点
- 2. 判断 root 是否为空
- 为空说明没有根节点 那么当前这个开始标签节点就是根节点

- 3. 判断是否存在 currentParent 节点 如果存在则说明栈顶有值
- 那么当前这个开始标签节点的爸爸就是 currentParent
- 同时将其push到 currentParent.clildren 属性中

- 4. 将当前节点添加到stack中
- 5. 更新 currentParent 为栈顶元素

```js
function handleStart(tag, attrs) {
  // 将零散的开始标签 组织成树节点
  let node = createASTElement(tag, attrs)

  // 如果没有根节点该节点本身就是根节点
  if(!root) {
    root = node
  }

  // 如果栈顶有值 则让 当前节点的爸爸为 栈顶元素
  if(currentParent) {
    node.parent = currentParent

    // 给栈顶元素添加儿子(当前元素)
    currentParent.children.push(node)
  }

  stack.push(node)

  // 让当前这个节点指向栈顶元素
  currentParent = node
}
```


> 处理结束标签
- 1. 弹出栈顶元素
- 2. 更新 currentParent 为栈顶元素

```js
// 处理结束标签
function handleEnd(tag) {
  // 遇到结束标签的时候 将栈顶元素弹出栈 并更新 currentParent
  stack.pop()
  // 更新currentParent
  currentParent = stack[stack.length - 1]
}
```


> 处理标签文本
- 1. 因为我们提取到的文本有的有空格换行 利用正则删掉
- 2. 如果有文本内容的话 组织好文本节点 设置文本节点的parent为栈顶元素 并将文本节点push到stack中
```js
 // 处理文本
function handleText(txt) {

  txt = txt.replace(/\s/g, "")

  // 如果文本有值的 我们再插入 文本是当前栈顶元素的孩子
  txt && currentParent.children.push({
    // 文本节点的类型是文本
    type: TEXT_TYPE,
    // 文本内容
    text: txt,
    // 文本节点的父节点也是栈顶元素
    parent: currentParent
  })
}
```


> 完成 解析html模板字符串 得到ast树的完整部分
```js
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`

/*
  /^<((?:[a-zA-Z_][\-\.0-9_a-zA-Z]*\:)?[a-zA-Z_][\-\.0-9_a-zA-Z]*)/
  匹配开始标签名 情况有两种
  1. <xxx
  2. <div:xxx   标签带命名空间的情况
*/
const startTagOpen = new RegExp(`^<${qnameCapture}`)


/*
  /^<\/((?:[a-zA-Z_][\-\.0-9_a-zA-Z]*\:)?[a-zA-Z_][\-\.0-9_a-zA-Z]*)[^>]*>/
  匹配结束标签名
  1. </xxx>
*/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)


/*
  匹配属性 的正则
  正则中
    分组1: 属性的key
    分组3 或者 分组4 或者 分组5: 属性的value
     ""        ''     没有引号
*/
// 
// 
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/

 // 匹配标签结束的  > or />
const startTagClose = /^\s*(\/?)>/

// 解析 html 的模块: htmlparser2

// 胡子语法的正则 {{分组1}} 分组1就是表达式的变量
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

// -----------------------

function parseHTML(html) {

  // 元素类型
  const ELEMENT_TYPE = 1

  // 文本类型
  const TEXT_TYPE = 3

  // 用于存放元素的
  const stack = []

  // 指向栈顶的元素的指针 栈顶元素都是当前匹配到元素的父亲 所以我们的变量名也这么起
  let currentParent = null

  // 根节点 它也是最后的 ast 语法树
  let root = null

  // 整理 AST树中的节点对象
  function createASTElement(tag, attrs) {
    return {
      tag,
      attrs,
      type: ELEMENT_TYPE,
      parent: null,
      // 在解析开始标签的时候并不知道孩子是谁 先给个空
      children: []
    }
  }

  // 利用 栈结构的特性 构建了一棵树(弹幕说遇到单标签就有问题了)
  // 进栈构建父子关系 出栈就把当前作为栈顶的儿子

  // 处理开始标签
  function handleStart(tag, attrs) {
    // 将零散的开始标签 组织成树节点
    let node = createASTElement(tag, attrs)

    // 如果没有根节点该节点本身就是根节点
    if(!root) {
      root = node
    }

    // 如果栈顶有值 则让 当前节点的爸爸为 栈顶元素
    if(currentParent) {
      node.parent = currentParent

      // 给栈顶元素添加儿子(当前元素)
      currentParent.children.push(node)
    }

    stack.push(node)

    // 让当前这个节点指向栈顶元素
    currentParent = node
  }


  // 处理文本
  function handleText(txt) {

    txt = txt.replace(/\s/g, "")

    // 如果文本有值的 我们再插入 文本是当前栈顶元素的孩子
    txt && currentParent.children.push({
      // 文本节点的类型是文本
      type: TEXT_TYPE,
      // 文本内容
      text: txt,
      // 文本节点的父节点也是栈顶元素
      parent: currentParent
    })
  }

  // 处理结束标签
  function handleEnd(tag) {
    // 遇到结束标签的时候 将栈顶元素弹出栈 并更新 currentParent
    stack.pop()
    // 更新currentParent
    currentParent = stack[stack.length - 1]
  }


  // 将匹配的内容删除(也可以理解为截取目标字符串的指定长度)
  function advance(len) {
    html = html.substring(len)
  }

  // 解析开始标签的方法
  function parseStartTag() {

    // 使用 正则startTagOpen 看看是不是开始标签
    const start = html.match(startTagOpen)

    // console.log("start标签: ", start)
    /*
      start为数组[0, 1, {}]

      0: "<div"
      1: "div"
      groups: undefined
      index: 0
      input: "<div id=\"app\">\n    <div style=\"color: red;\">{{name}} -- hello</div>\n    <span>{{age}}</span>\n  </div>"
      length: 2

      0: 匹配的内容
      1: 分组内容: 标签名
    */

    if(start) {
      // 如果是开始标签的话 则将结果组织成一个对象
      const match = {
        // 标签名
        tagName: start[1],
        // 标签属性
        attrs: []
      }

      // console.log(match)
      /*
        {
          attrs: []
          tagName: "div"
        }
      */

      
      // 当匹配到内容(如开始标签) 要将该部分内容删除 advance前进的意思 那前进多少呢 就是匹配内容的总长度
      advance(start[0].length)
      // console.log(html)
      /*
        html现在的内容为: 
          id="app">
          <div style="color: red;">{{name}} -- hello</div>
          <span>{{age}}</span>
        </div>
      */


      /*
        接下来开始匹配属性 我们需要不停的用正则匹配属性 
        我们要循环匹配 只要不是开始标签的结束(正则: startTagClose) 就一直来匹配
      */
      // 如果不是开始标签的结束则一直匹配 同时每次匹配的时候我们还需要将属性保留起来
      let attr;

      // 开始标签的结束 >
      let end;

      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // 每次匹配到结果 我们继续删掉匹配到的内容 也就是调用 advance() 方法
        advance(attr[0].length)

        // 将 标签属性 整理到 match.attrs 中
        match.attrs.push({
          name: attr[1],
          // 如果是 disable 的情况 可以直接给个true
          value: attr[3] || attr[4] || attr[5] || true
        })
      }

      // console.log("标签属性: ", attr)
      /*
        0: " id=\"app\""
        // key
        1: "id"
        2: "="

        // 3 | 4 | 5 为value
        3: "app"
        4: undefined
        5: undefined
      */

      // console.log(html)
      /*
        >
          <div style="color: red;">{{name}} -- hello</div>
          <span>{{age}}</span>
        </div>
      */

      // 上面我们发现还有一个 开始标签的 > 结束 我们也应该把它也删掉 它被我们保存到 end 变量中了
      if(end) advance(end[0].length)
      // ↑
      // 到上面这里 开始标签整体的处理完毕
      
      // match是开始标签对象
      // console.log("开始标签对象:", match)
      /*
        match: {
          tagName: "div",
          attr: [
            {
              name: id,
              value: app
            }
          ]
        }
      */
      return match
    }


    // 不是开始标签则return false
    return false
  }


  /*
    // 我们的html字符串是这样的
    <div id="app">
      <div style="color: red;">{{name}} -- hello</div>
      <span>{{age}}</span>
    </div>
    
    逻辑: 每解析一个部分我们就从html字符串中把这个部分删除掉 当字符串都被截取完毕 就停止解析
    示例: 
      解析开始标签 <div 
          就从上面的html字符串中删掉该部分
      解析属性 id="app"
          就从上面的html字符串中删掉该部分

      最后都没有了就结束了

    特点: 
      html最开始肯定是一个 <

    示例:
      0
      ↓
      <div>html</div>

      html.indexOf("<") 索引为0 肯定是标签 
      当我们解析完开始标签的时候 删除开始标签 变成

          ↓
      html</div>

      那我们再去取 < 在html字符串中的位置时 那 < 的位置是不是就是文本结束的位置
  */

  // 使用循环解析html字符串 当字符串为空退出循环
  while(html) {

    // 如果 < 的查询结果为0 说明是标签
    // textEnd如果=0 则说明是开始标签 >0 则说明是文本结束的位置
    let textEnd = html.indexOf("<")

    // 这种情况下为开始标签
    if(textEnd == 0) {

      // parseStartTag()解析开始标签的方法, 返回值为开始标签的解析结果
      const startTagMatch = parseStartTag()

      // console.log(html)
      /*
        <这部分的处理完了>
          <div style="color: red;">{{name}} -- hello</div>
          <span>{{age}}</span>
        </div>

        处理完这个部分后 下面这行可能还是开始标签 还是属性
        <div style="color: red;">

        但是总有一天都会被截掉 该遇到文本了 这时候 textEnd > 0
      */

      // 如果 startTagMatch 有值 就直接跳过本轮的操作
      if(startTagMatch) {

        // 拿到开始标签的内容后 我们交给 handleStart() 来进行处理
        handleStart(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }

      // 到这 就是如果不是开始标签 就是结束标签 返回当前结束标签的名字 endTagMatch为匹配到的结束标签
      let endTagMatch = html.match(endTag)
      // console.log("endTagMatch", endTagMatch)

      // 直接是 结束标签 的原因 <div></div> 的情况
      // 结束标签不用处理直接删除就可以
      if(endTagMatch) {
        // console.log("endTagMatch", endTagMatch)
        advance(endTagMatch[0].length)

        // 拿到 结束标签后 我们交给 handleEnd() 来处理
        handleEnd(endTagMatch[1])
        continue
      }
    }

    // 到标签文本的位置了 我们就需要将文本获取到 找到文本将文本提取出来
    if(textEnd > 0) {

      // 文本内容
      let text = html.substring(0, textEnd)
      // console.log("标签文本的内容", text)

      // 同时 我们匹配了文本的内容后也要删掉这个部分
      if(text) {
        // 拿到标签文本后 交给 handleText来处理
        handleText(text)
        advance(text.length)
      }
      // console.log(html)
    }
  }

  // 看看html是否为空
  // console.log("html", html)

  /*
    上面的部分的整体流程文字叙述:
    <div id="app">
      <div style="color: red;">{{name}} -- hello</div>
      <span>{{age}}</span>
    </div>

    while(html) 中的 html 是 整个模板内容
    第一次:
      textEnd == 0
      parseStartTag()方法中是根据开始标签的正则来进行匹配
      所以能匹配到开始标签
      startTagMatch有值 然后 continue
      直接开始下一轮循环

    第二次:
      textEnd > 0 
      提取文本内容 本次提取的文本内容是空格加换行
      然后删掉该部分 进入下一轮循环

    第三次:
      <div style="color: red;">{{name}} -- hello</div>
        <span>{{age}}</span>
      </div>
      第三次进来的时候html这样
      textEnd == 0
      parseStartTag()方法中是根据开始标签的正则来进行匹配
      匹配到 <div style="color: red;">
      startTagMatch有值 然后 continue
      直接开始下一轮循环

    第四次:
      textEnd > 0 
      提取文本内容 本次提取的文本内容是空格加换行
      然后删掉该部分 进入下一轮循环

    第五次:
      </div>
        <span>{{age}}</span>
      </div>
      遇到了结束标签
      textEnd == 0
      parseStartTag()方法中是根据开始标签的正则来进行匹配
      没有匹配到 所以走了 
      if(endTagMatch) {
        advance(endTagMatch[0].length)
        continue
      }
      删除结束标签 然后继续开始下一轮循环


    也就是说整体的逻辑是删除一个部分重新一轮
  */


  /*
    最终我们要根据 开始 文本 结束 这三个部分转化为一个抽象语法树
    树结果的话 肯定会有层级关系 比如谁是父亲 谁是孩子

    大体我们应该组织的结构是这样的
    {
      tag: "div",
      // 元素的类型 取元素的 nodeType 我们这里主要有两种类型 一类是文本 一类是元素
      type: 1,
      attrs: [{}],
      // 父元素,
      parent: null(根元素是null),
      // 儿子的数组里面还可能会再套一层
      chlidren: [{}]
    }

    我们需要根据 上面整理好的另算数据解析成一棵树 那零散数据怎么构建父子关系呢
    <div id="app">
      <div style="color: red;">{{name}} -- hello</div>
      <span>{{age}}</span>
    </div>

    我们可以整一个栈型结构
      当我们匹配到 开始标签的时候 我们将 div 推进栈 之后当我们匹配到下一个 div 的时候
      我们就知道 第二个div 是栈顶div的儿子(数组中的最后一个)

    当遇到结束标签的时候 我们把栈顶的元素 弹出栈
    [第一个div, 第二个div]
    第二个div(栈顶)是第一个div的孩子 当遇到结束标签</div> 的时候 我们将栈顶的元素弹出栈

    当再遇到开始标签(span)的时候 我们就知道 span 的爸爸是 栈顶的元素
    [第一个div, span]

    依次类推 栈顶元素是当前匹配到元素的父亲

    也就是说我们可以根据栈来模拟出来树形关系
  */

  // 将最终生成的 ast语法树 返回
  return root
  console.dir(root, {depth: null})

}

// 对获取的template内容进行编译
export function compileToFunction(template) {
  // debugger
  // 1. 将 template 转化成 ast 语法树
  let ast = parseHTML(template)

  // 2. 生成 render 方法 (render方法执行的返回的结果就是 虚拟DOM)

}
```

- parseHTML中的逻辑很多 所以我们整理成一个单独的文件

  | - compiler
    - index.js
    - parse.js  // 抽离成这个文件


- parseHTML() 的作用是 从html字符串中提取出来有用的部分各自封装成一个对象, 然后将对象通过 createASTElment(tag, attrs) 方法将零散的对象封装成一个树的节点 然后再通过 start text end 等处理方法得到一棵节点树 最后 parseHTML会返回一棵节点树

------

> 生成 render 函数
- 上面我们通过 parseHTML() 方面将html字符串解析成了 node节点相连的一棵树 
- 也就是一个数据结构 

- 接下来我们要将这棵树 组装成 下面的render函数
- 我们先简单看下 render函数的样子
```js
React.createElement("标签名", {标签属性kv or null}, "标签内容")

// 如果发生节点嵌套的话 会在标签内容的位置继续调用API
React.createElement("标签名", {标签属性kv}, React.createElement("标签名", {标签属性kv}, "标签内容"))
```

- 现在我们就要将 树中的node节点 拼接成字符串形式的 render函数
- 同时我们也要对一些特殊的部分做一些特殊的标记 比如 {{name}} 当中的变量 name 和 普通文本 hello 都应该怎么处理

- 当是 {{name}} 表达式的时候 我们将变量提取出来 使用 _s(name) 来标记
- 然后 普通文本 和 _s(name) 整体使用 _v() 来进行包裹起来

- 比如:
```js
// h() 参数1 标签名 参数2 属性 参数3都是儿子
render(h) {
  return 
    h(
      "div1", 
      {id:"app"}, 
      h(
        "div1的儿子", 
        {style: {color:red}}, 
        
        // 比如这里
        _v(_s(name) + "hello)
      ),

      h("div1的儿子span", null, _v(_s(age)))
    )
}
```

- 我们在回顾下 上面的代码:
```js
export function compileToFunction(template) {
  // 1. 将 template 转化成 ast 语法树
  let ast = parseHTML(template)

  // 2. 将 ast树 拼接成 render函数
  let code = codegen(ast)
}
```


> codegen(ast)
- 我们将树 传给这个生成代码的方法 内部的核心就是匹配字符串

- 返回值:
- render函数形式的字符串 最终返回 **code**

- 内部逻辑:
- 1. 从 ast 上对节点进行处理(提取节点中的属性拼接成 render函数的样子)
```js
_c("标签名", {标签属性}, "标签文本")

// 如果该节点有 children 的情况下
_c("标签名", {标签属性}, _c("标签名", {标签属性}, "标签文本"))
```

- 2. 当遇到该节点有 children 属性的时候 我们调用 **genChildren(children)** 方法 来处理 children 的情况

```js
function codegen(ast) {

  // code就是最终要生成的东西
  let code

  // 生成 render 函数 孩子参数的部分
  let children = genChildren(ast.children)

  /*
    1. 处理标签属性
    2. 处理标签文本 和 考虑有 children 的情况
  */
  // 开始拼接成 render函数的返回值 _c("div" ... )
  code = `_c('${ast.tag}', ${ast.attrs.length > 0 ? genProps(ast.attrs): null}${ast.children ? `,${children}` : ""})`

  console.log(code)
  /*
    _c(
      'div', 
      {
        id: "app",
        style: {"background":"pink"}
      },
      _c(
        'div', 
        {style: {"color":"red"}},
        _v{_s(name)+"hello"+_s(age)+"world"}
      ),
      _c(
        'span', 
        null,
        _v("world")
      )
    )
  */
  return code
}
```

--- 

> genProps(attrs)
- 用于处理 node 节点中的 attrs属性
```js
attrs: [
  {
    name: "id",
    value: "app"
  },
  {
    name: "style",
    value: {
      background: "pink"
    }
  }
]
```

- 也就是说 我们要将 上面的对象 整理成render函数中 {标签属性} 的字符串形式

- 内容逻辑:
- 1. 既然 attrs 是一个数组 我们要遍历处理 该数组
- attrs中每一个属性为一个对象 的形式
```js
{
  name: "id",
  value: "app"
}
```

- 我们要将其整理为 name: value 的形式
```js
{
  id: app
}
```

- 2. 当 name 为 style 的时候 它的值应该是一个对象 但现在 如果有多个style的时候 格式如下
```js
background: pink; width: 100px

// 
style: {
  background: pink,
  width: 100px
}
```

```js
function genProps(attrs) {

  // 属性的格式: {name: value}
  let str = ""
  for(let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]

    /*
      我们也可以使用 qs 库

      标签属性是 style 的情况下 我们要进行特殊处理
      语法树中关于 style 的数据结构
      {name: 'style', value: 'color: red; background: pink'}

      转为
      style: {color: "red", background: "pink"}
    */
    if(attr.name == "style") {
      // 最终我们要整理成 style: {} 的像是 这个{}就是obj
      let obj = {}

      // 根据 ; 拆分
      attr.value.split(";").forEach(item => {
        // 根据 : 拆分
        let [key, value] = item.split(":")
       
          /*
            style="background: pink;
            当是上面的形式的时候 我们在 ; 分割的时候 后面会是 "": undefined
            所以我们做下判断

            {background: 'pink'}
          */
          if(key) {
            key = key.trim()
            value = value.trim()
            obj[key] = value
          }
      })

      attr.value = obj
    }

    // 上面是 属性进来后 如果有 style 的情况 先对其加工 然后下面统一进行拼接

    // id: app, app的部分也要是字符串 我们使用 stringify()
    str += `${attr.name}: ${JSON.stringify(attr.value)},`
  }
```

---

> genChildren(children)
- 用于处理 node节点中 有children 属性的情况
- children是一个数组 里面可能有多个node节点

```js
function genChildren(children) {
  if(children) {
    return children.map(child => gen(child)).join(",")
  }
}
```


> gen(node)
- 用于处理 children 中的子节点

- 我们遍历 children 拿到每一个node 然后调用了 gen(node) 方法 来处理一个个子节点
- 关于子节点 我们就要考虑 如下情况
- 1. 该子节点是 文本
- 2. 该子节点是 元素

- 如果是元素的情况 说明也是一个node节点 一棵子树 那么我们直接调用 codegen(node) 
- 如果是文本的情况下 我们又要额外的考虑
```html
<span>world</span>
<div>{{name}} hello {{age}} hello
```
- 1. 普通文本
- 2. 表达式 和 普通文本组合的情况

```js
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function gen(node) {

  // 判断元素是什么类型的
  if(node.type == 1) {

    // 节点: 返回 _c("标签名", {标签属性}, "标签文本")
    return codegen(node)

  // 文本的情况
  } else {

    let text = node.text
    // 根据正则判断 文本中是否含有 {{表达式}} 部分
    if(!defaultTagRE.test(text)) {
     
      // 普通文本

    } else {

      //  {{表达式}} 和 普通文本组合的情况
    }
  }
}
```

> 普通文本的情况
- 我们直接拿到 text 加工成 _v("text") 的 模式
```js
if(!defaultTagRE.test(text)) {
  return `_v(${JSON.stringify(text)})`
}
```


> {{表达式}} 和 普通文本组合的情况
- 如果: {{name}}hello{{name}}hello

- 我们最终要将上面的文本 将 变量 和 普通文本 分别提取出来 先放入到数组中 然后调用[].join() 方法统一变成字符串

- 提取变量的时候 我们使用 _s(name) 包裹
- 提取普通文本的时候 我们使用 _v("text") 包裹

> 扩展: exec()
- 该方法是正则身上的方法 当正则中使用g的时候 我们就要考虑 lastIndex 的问题
- lastIndex 就像是该方法在全局中定义了一个 lastIndex 每次调用都会 lastIndex 递增
- 所以我们每次调用 gen() 的时候 都要内部重置下 lastIndex 的值

```js
if(!defaultTagRE.test(text)) {
  
} else {
  // tokens 用于保存提取出来的 结果
  let tokens = []

  // 根据 defaultTagRE正则 匹配到的结果
  let match = null
  /*
    match: [
      0: "{{age}}"
      1: "age"
    ]
  */

  // 保证每次调用 gen() 方法的时候 exec() 的 lastIndex 都为0
  defaultTagRE.lastIndex = 0

  /*
    该 lastIndex 与 exec() 的 lastIndex 无关
    目的:
      保存 每次exec()方法后 查找到哪里 
      lastIndex = exec().index + match[0].length

       exec().index
      0            13
      ↓            ↓
      {{name}}hello{{age}}
             ↑
          lastIndex

     如果 第二次 匹配到 13 的时候 我们就可以根据 
     index 和 lastIndex 之间的关系 判断是否有 hello 普通文本的情况了
     if(index > lastIndex) 就代表有
  */
  let lastIndex = 0

}
```

- 上面我们定义好了 所需要的属性 接下来我们就要 循环的使用 正则匹配字符串 获取对应的文本数据
**这个就是数据分割 循环 if 匹配不同的情况 放到数组中**
```js
/*
  查找到最后就是 null 所以会退出循环
  这里也相当于 循环调用 
  exec()
  exec()
*/
while(match = defaultTagRE.exec(text)) {
  // 保存 每次匹配 {{}} 的位置(起始位置)
  let index = match.index

  // 第二次匹配的时候 说明 越过了 {{}} 中间的文本 {{}} 我们将 中间文本组织好 push到 tokens 数组中
  if(index > lastIndex) {
    /*
                   13
                   ↓
      {{name}}hello{{age}}
             ↑
          lastIndex

      从lastIndex开始提取 到 index 结尾
    */
    tokens.push(JSON.stringify(text.slice(lastIndex, index)))
  }

  // 这里就是 匹配到了 {{表达式}} 部分 我们做响应的处理 push 到 tokens 数组中
  // _s(name)
  tokens.push(`_s(${match[1]})`)

  // 保存下 lastIndex 的值
  lastIndex = index + match[0].length
}


// 到这里就是 出了while循环 也说明 {{name}} hello {{age}} 匹配到最后了 
// 但是要是还有这种情况 我们也需要考虑 {{name}} hello {{age}} hello



/*
  {{name}} hello {{age}} hello
                       ↑
                   lastIndex

  因为lastIndex 记录的是 这个位置 
  如果 lastIndex < text.length 说明后面还有文本
*/
if(lastIndex < text.length) {
  // 从 lastIndex 开始提取文本
  tokens.push(JSON.stringify(text.slice(lastIndex)))
}

// _s(name)+hello+_s(age)+world
return `_v{${tokens.join('+')}}`
```

> 整理下这个部分的逻辑代码:
```js
// src/init.js
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {

  }

  // 在这里
  Vue.prototype.$mount = function(el) {
    // 获取 options
    const vm = this
    el = document.querySelector(el)
    let opts = vm.$options

    let template

    // 获取模板中的内容
    if(!opts.render) {

    } else {

    }

    if(template) {
      let render = compileToFunction(template)
    }
  }
}

// 上面我们要拿到 template 解析成render函数 _c(xxxx) 的形式
```


```js
// src/compiler/index.js
export function compileToFunction(template) {
  // 1. 将 template 转化成 ast 语法树
  let ast = parseHTML(template)

  // 2. 将ast语法树 转换为 render函数的code
  let code = codegen(ast)
}
```

> 这个部分的代码
```js
// src/compiler/index.js

// codegen 将树拼装成 render代码
function codegen(ast) {

  // code就是最终要生成的东西
  let code

  // 生成 render 函数 孩子参数的部分
  let children = genChildren(ast.children)

  // 开始拼接成 render函数的返回值 _c("div" ... )
  code = `_c('${ast.tag}', ${ast.attrs.length > 0 ? genProps(ast.attrs): null}${ast.children ? `,${children}` : ""})`

  console.log(code)
  return code
}

// 处理 child 的函数
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function gen(node) {
  /*
    child 就是一个个的node节点 
    然后我们需要判断下 看看该节点是文本还是元素

    如果是文本的话 我们需要创建文本
    如果是元素的话 就生成元素
  */
  // 元素
  if(node.type == 1) {
    return codegen(node)

  // 文本 文本有几种情况 标签里面是纯文本 或者是{{age}} 或者是{{name}}hello
  } else {
    let text = node.text
    
    if(!defaultTagRE.test(text)) {
      /*
        text:  world
        普通字符串的情况下 我们使用 _v() 包裹

        _v("text")
      */
      return `_v(${JSON.stringify(text)})`

    } else {
      /*
        text: {{name}}hello{{name}}
        当遇到这种特殊字符串的时候 我们要将 变量使用 _s() 包裹起来
        然后整体使用 _v() 包裹

        _v( _s(name) + 'hello' + _s(name))

        在转的时候我们需要将这3部分组织好 然后使用 + 来进行拼接
        // c: 创建元素 v: 创建文本 s:json.stringify()
      */

      /*
        用于存放 文本内容 如
        {{name}}hello{{name}}

        _s(name) hello _s(age)
      */
      let tokens = []

      // 根据 defaultTagRE 正则 匹配到的结果
      let match = null

      /*
        defaultTagRE 正则使用的是 exec() 同时 正则里面加上了g
        这是我们就要考虑 lastIndex 的问题
        这里设置为0 这样每次调用 gen() 方法的时候 会从0重新开始
      */
      defaultTagRE.lastIndex = 0

      /*
        最后匹配到的位置
        下面的循环是根据 {{}} 正则来找对应的胡子里面的内容

        但是 胡子之外的内容我们也要拿到 比如 hello 所以我们要记录下 最后匹配的位置 
        方便我们截取 hello 的部分

        每次循环的时候 我们要记录 lastIndex 
        比如:

        index         index
          0            13
          ↓            ↓
          {{name}}hello{{name}}
                 ↑
                 8
             lastIndex

        这样我们就能根据索引 找到hello文本
      */
      let lastIndex = 0

      // 这个就是数据分割 循环 if 匹配不同的情况 放到数组中
      // 我们使用 defaultTagRE 来捕获目标文本 将每次捕获的结果放入到 tokens 数组中
      while(match = defaultTagRE.exec(text)) {
        // console.log(match)
        /*
          match: [
            0: "{{age}}"
            1: "age"
          ]
        */
        
        // 拿到当前匹配的位置 拿到后往 tokens 数组中放
        /*
          0            13
          ↓            ↓
          {{name}}hello{{age}}
        */
        let index = match.index
        // console.log(index) // 0 13

        if(index > lastIndex) {
          // lastIndex是上一次的位置 8 如果index > lastIndex 说明两个{{}} 之间有文本
          // 那么 我们就 截取text字符串 从 lastIndex 位置 截取到 第二次index 13 之间的文本
          tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }


        
        // 放入匹配的内容 _s(name) 我们这么放到数组中
        tokens.push(`_s(${match[1]})`)
        
        /*
          第一次的时候 0 + 8 ({{name}}.length length是数个数 不是索引 所以从1开始数)
          每次循环的时候保存下 lastIndex
        */
        lastIndex = index + match[0].length
        // console.log(lastIndex) // 8 20
      }

      /*
        {{name}} hello {{age}} 这还有文本的情况 我们将这个部分也放入 tokens 数组中
                             ↑
        因为lastIndex 记录的是 这个位置 如果 lastIndex < text.length 说明后面还有文本
      */
      if(lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
      }
      
      // console.log(tokens.join("+"))
      // _s(name)+hello+_s(age)+world

      return `_v{${tokens.join('+')}}`
    }
    
  }

}

// 整理children的函数
function genChildren(children) {
  if(children) {
    return children.map(child => gen(child)).join(",")
  }
}

// 整理属性的函数
function genProps(attrs) {
  console.log("attrs: ", attrs)
  // 属性的格式: {name: value}
  let str = ""
  for(let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]

    /*
      我们也可以使用 qs 库

      标签属性是 style 的情况下 我们要进行特殊处理
      语法树中关于 style 的数据结构
      {name: 'style', value: 'color: red; background: pink'}

      转为
      {color: "red", background: "pink"}
    */
    if(attr.name == "style") {
      // 最终我们要整理成 style: {} 的像是 这个{}就是obj
      console.log("value:", attr.value)
      let obj = {}

      // 根据 ; 拆分
      attr.value.split(";").forEach(item => {
        // 根据 : 拆分
        let [key, value] = item.split(":")
       
          /*
            style="background: pink;
            当是上面的形式的时候 我们在 ; 分割的时候 后面会是 "": undefined
            所以我们做下判断

            {background: 'pink'}
          */
          if(key) {
            key = key.trim()
            value = value.trim()
            obj[key] = value
          }
      })

      attr.value = obj
    }

    // id: app, app的部分也要是字符串 我们使用 stringify()
    str += `${attr.name}: ${JSON.stringify(attr.value)},`
  }

  // 不要 str 最后的 , 然后在 str 的外侧加上 {}
  return `{${str.slice(0, -1)}}`

  /*
    _c(
      'div', 
      {
        id: "app",
        style: {"background":"pink"}
      }
    )
  */
}
 

```

----------------

> 模板引擎的实现原理(执行render函数)
- 原理:
- with(this) + new Function()


> 扩展知识点: new Function
- 将传入的参数 返回一个函数

- 1. new Function(参数)
- 它会返回一个函数
- 参数会作为返回的匿名函数的函数体

```js
let fn = new Function("参数部分")
console.log(fn)
/*
  ƒ anonymous() {
    参数部分
  }
*/


// 例如:
let fn = new Function("console.log(11)")
console.log(fn)
fn()  // 11
```

- 那假如我们在参数部分这么写的话 该参数会被认为是一个变量
- 如果不想被认为是一个变量 我们需要 'name' 加上引号
```js
let fn = new Function("console.log(name)")
// name 会被当成变量 读不到就是空

// 不想让name作为变量的情况下
let fn = new Function("console.log('name')")
```

- 那 name 变量应该去哪读呢?

---

> 扩展知识点: with(this) {函数体中出现的变量会自动从this中找}
- 形参: 我们指定 从 哪 读变量
- 指定后 函数体中出现变量

- 我们可以把 with 函数 理解成 自执行函数
- 注意下面的代码 with 函数没有调用 console.log(name) 却执行了

- 或者
- 我们可以把 with 函数 理解成一个提供 源 的代码 起到通过**包裹**目标代码 给目标代码提供源的**结构** 本身不是一个函数

- 我们可以忽视 with() { ... } 这部分结构 但是它提供了源

```js
let source = {
  name: "sam",
  test(content) {
    console.log(content)
  }
}

// 当函数体中出现变量的情况下 我想指定从哪读变量 我就将目标传入到参数的位置
with(source) {

  // name 会自动从 source 中找
  console.log(name)   // sam
}
```


> new Function() + with() 结合的使用方式
- 假如:
- 我现在想根据一字符串生成一个函数 但是字符串中有变量 我想提供变量的来源

```js
// 来源
let source = {
  name: "sam"
}

// with结构: 可以不用看 只看with函数体就可以 函数体会作为 new Function 返回函数的函数体 with提供了源
let str = "with(source) { console.log(name) }"
let fn = new Function(str)
fn()


// 如果with我们传入的是this 我们也可以手动的指定this
let str = "with(this) { console.log(name) }"
let fn = new Function(str)
fn.call(source)
```

- 既然 with的函数体是 new Function的函数体 那么我们是不是也可以添加 return
```js
let source = {
  name: "sam",
  test(content) {
    console.log(content)

    // test()函数有返回值了
    return 1
  }
}

let str = "test(111)"

// 这里return了
str = `with(this) { return test(111)}`

let fn = new Function(str)

// 我们就可以接收返回值
let res = fn.call(source)
console.log(res)    // 1
```

- ok 知道了上面这些后 我们来看看源码的部分

---

- 上面 我们将 template加工出来的 ast树 再次加工成了 **字符串结构的render函数** (并不是函数 只是字符串)

```js 
// 对获取的template内容进行编译
export function compileToFunction(template) {
  // debugger
  // 1. 将 template 转化成 ast 语法树
  let ast = parseHTML(template)

  // 2. 将 ast树 转换成 字符串形式的 render 函数
  let code = codegen(ast)
  console.log(code)

/*
  _c('div', {id: "app",style: {"background":"pink","width":"100px"}},_c('div', {style: {"color":"red"}},_v{_s(name)+"hello"+_s(age)+"world"}),_c('span', null,_v("world")))
*/
}
```

- 我们也能看到上面的 code 是字符串 我们需要让字符串能运行 就需要让它变成一个函数

- 我们可以利用 new Function(code) 将字符串代码放进去 它会自动的返回一个函数 code参数的部分 会作为返回函数的函数体

```js
export function compileToFunction(template) {
  // debugger
  // 1. 将 template 转化成 ast 语法树
  let ast = parseHTML(template)

  // 2. 将 ast树 转换成 字符串形式的 render 函数
  let code = codegen(ast)
  console.log(code)

  // 根据 code 代码生成 render 函数
  let render = new Function(code)

  // code会作为render函数的函数体
}
```

- 但是有一个问题 我们 code 字符串函数中 有很多变量
  _s(name)

- 这样的形式, 那 name 这些应该去哪取变量呢
- 它应该去当前的 vm 上取name age等变量吧

- 我们可以这样
```js
let code = codegen(ast)

// 给code包上 with() {}
code = `with(this){return ${code}}`

let render = new Function(code)
/*
  render:  function anonymous() {
    with(this){
      return _c(
        'div', {id: "app",style: {"background":"pink","width":"100px"}},_c('div', {style: {"color":"red"}},_v(_s(name)+"hello"+_s(age)+"world")),_c('span', null,_v("world"))
      )
    }
  }
*/

// 最后我们将 render 暴露出去
return render
```

- 1. 将 code 作为 render函数的函数体
- 2. code中的变量会从 this 上找
- 3. return code, render函数有返回值
- 4. 因为我们在 with(this) 传递的是 this 所以当我们调用render的时候 要采用 render.call() 将vm传进入

```js
// 对获取的template内容进行编译
export function compileToFunction(template) {
  // 1. 将 template 转化成 ast 语法树
  let ast = parseHTML(template)

  // 2. 将 ast树 转换成 字符串形式的 render 函数
  let code = codegen(ast)

  code = `with(this){return ${code}}`
  let render = new Function(code)

  // 将render函数暴露出去
  return render
}
```

- compileToFunction(template) 的返回值就是render函数了
- 回过头 我们再看 init.js 文件的代码
```js
// src/init.js

// 给Vue扩展 $mount() 方法
Vue.prototype.$mount = function(el) {

  const vm = this
  el = document.querySelector(el)
  let opts = vm.$options

  if(!opts.render) {

    let template
    if(!opts.template && el) {
      template = el.outerHTML
    } else {
      if(opts.template) {
        template = opts.template
      }
    }

    if(template) {
      let render = compileToFunction(template)
      // 将 render 挂载到了 $options 上
      opts.render = render
    }
  }

  // 组件的挂载的方法 将 vm 挂载到 el 上
  mountComponent(vm, el)

}
```

- 我们将 render函数 挂载到了 $options 上
- 有了render后我们要做代码的初渲染 我们要调用 render 才能实现页面的渲染 所以下一步我们要调用 render方法

- 所以我们定义了一个方法 **mountComponent(vm, el)** 

------

> mountComponent(vm, el)
- 挂载组件的方法 
- 目的:
- 调用 vm 身上的render 调用render产生虚拟DOM 将虚拟DOM渲染到el中

- 参数:
- vm: 因为实例中有 render 选项
- el: 挂载到哪里

- 位置:

  | - src
    - lifecycle.js  // lifecycle: 生命周期


> 逻辑:
- 1. 调用 render 方法 产生虚拟节点(DOM)
- 2. 根据虚拟DOM产生真实DOM
- 3. 插入到el元素中

```js
// src/lifecycle.js

// 组件的挂载
export function mountComponent(vm, el) {
  /*
    将 el 也挂载到 vm 上

    options中的el是选择器字符串 
    这个el是我们通过 querySelector 之后选择的 节点

    我们将这里节点挂载到了 实例 上
  */
  vm.$el = el

  // 1. 调用 render 方法 产生虚拟节点(DOM)

  // 2. 根据虚拟DOM产生真实DOM

  // 3. 插入到el元素中
}
```

- 产生虚拟DOM 会执行 **vm._render()**
- 将虚拟DOM转换为真实DOM 会执行 **vm._update()**

- 它们都是 vm 身上的方法, 我们接下来给 vm 扩展这两个方法

```js
// src/index.js
import {initMixin} from "./init"
import {initLifeCycle} from "./lifecycle"

function Vue(options) {
  this._init(options)
}


initMixin(Vue)

// 给 vm 扩展生命周期的方法
initLifeCycle(Vue)


export default Vue



// src/lifecycle.js
// 组件的挂载
export function mountComponent(vm, el) {
  // 将 el 也挂载到 vm 上
  vm.$el = el

  // 1. 调用 render 方法 产生虚拟节点(DOM)
  // 2. 根据虚拟DOM产生真实DOM
  // 3. 插入到el元素中
  vm._update(vm._render())  
}


export function initLifeCycle(Vue) {
  Vue.prototype._update = function() {
    console.log("update")
  }
  Vue.prototype._render = function() {
    console.log("render")
  }
}
```

> 总结Vue的核心流程
- 1. 创造了响应式数据
- 2. 将模板转换成了ast语法树(只编译一次)
- 3. 将ast语法树转换成了render函数
<!-- 
  render函数的目的是产生虚拟节点
  为什么要虚拟节点?

  每次重新渲染都需要使用正则来替换 消耗的性能比较大
 -->

- 4. 所以我们把模板变成了render函数 后续每次数据更新可以只执行render函数, 无需再次执行ast转化的过程
<!-- 
  传入不同的数据 通过render函数 我们就可以返回不同的虚拟节点
 -->

- 5. render函数会产生虚拟节点(使用响应式数据) 
- 我们一调用render就会使用响应式数据 后续我们更新数据 可以重新执行render

- 6. 根据生成的虚拟节点创建真实的DOM

------

### 实现虚拟DOM 转换为 真实DOM
- 上面我们又在 vm 身上扩展了两个方法 或者说是两个生命周期

- 1. vm._render()
- 2. vm._update()

- 当我们调用 vm._render() 的时候 应该使用 vm.$options.render()
<!-- 
  vm.$options.render()
  这个是我们实现的render()
 -->

- 同时我们生成的render函数中还有 _v _s _c

```js
// 组件的挂载
export function mountComponent(vm, el) {
  // 将 el 也挂载到 vm 上
  vm.$el = el

  // 1. 调用 render 方法 产生虚拟节点(DOM)
  // 2. 根据虚拟DOM产生真实DOM
  // 3. 插入到el元素中
 vm._update(vm._render())
}


// 给 Vue 扩展生命周期相关的方法
export function initLifeCycle(Vue) {

  Vue.prototype._update = function() {
    console.log("update")
  }

  Vue.prototype._c = function() {}
  Vue.prototype._v = function() {}
  Vue.prototype._s = function() {}

  Vue.prototype._render = function() {
    
    let vm = this

    // vm.$options.render() 是通过 ast语法树转义后生成的render方法 因为使用 with(this) 包装的 让with的this指向vm
    let vnode = vm.$options.render.call(vm)

    return vnode
  } 
}
```

- 我们这几个方法都跟虚拟节点 和 后面说的diff算法有关系 我们将这些方法中的内容逻辑提取到 vdom/index.js 文件中

- 位置:
  | - src
    | - vdom
      - index.js

```js
// src/vdom/index.js
// 创建元素 就是 _c() 或者 h() 都是一个方法
// data = {} 没有附上默认值 那么当没有标签属性的时候 data就是null
export function createElementVnode(vm, tag, data = {}, ...children) {

  // 从标签属性中取出 key 如果没有data 那么key就是undefined
  let key = data.key
  // 再把标签属性中的key删掉后 传给 vnode方法
  if(key) delete data.key

  return vnode(vm, tag, key, data, children)
}

// _v()
export function createTextVnode(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text)
}

// 创建 vnode(虚拟节点) 的方法
/*
  参数:
    key: diff算法当中需要的key 在标签属性中
    data: 标签属性
    tag: 标签名
    vm: 实例
    children: 标签文本的部分 也可以是一个嵌套节点
*/
function vnode(vm, tag, key, data, children, text) {

  return {
    vm,
    tag,
    key,
    data,
    children,
    text,
    // 这里还可以增加 事件 插槽 指令等属性
  }
}
```

- 我们在 _c() _v() 中调用 下面的方法
  - createElementVnode()
  - createTextVnode()

```js
Vue.prototype._c = function() {
  return createElementVnode()
}

Vue.prototype._v = function() {
  return createTextVnode()
}

// 这个逻辑太简单了就在这个方法内部完成了
Vue.prototype._s = function() {

}
```


> _s(val)
- 将 _s(name) 包裹的变量(再读取with的源的数据后转成字符串)

```js
Vue.prototype._s = function(val) {
  // 判断下 val 的类型 只有val为对象的时候 我们再进行 JSON.stringify(val)
  if(typeof val != "object") return val

  return JSON.stringify(val)
} 
```


> _c()
- 内部调用 src/vdom/index.js 中的 createElementVnode() 方法

- 我们将 _c() 收到的参数 和 vm 都传递到 createElementVnode() 中

- 传递 vm 的原因是要描述下 虚拟节点对应的实例是谁 我们可以利用 vm属性来判断当前的dom它对应的实例是谁 比如我们有些指令都可以拿到这些属性

```js
Vue.prototype._c = function() {
  // this就是vm
  return createElementVnode(this, ...arguments)
}
```


> vnode(vm, tag, key, data, children, text)
- 该方法用于 根据参数生成虚拟DOM
- 参数:
- vm:
  - 实例

- tag:
  - 标签名

- key:
  - diff算法中需要用的key

- data:
  - 标签属性

- children:
  - 子节点

- text:
  - 标签文本


> ast 和 vnode 的区别
- ast做的是语法层面的转化 它描述的是语法本身(它可以描述js css html) 也就是我们的template什么样 它就能转成什么样

- vnode 描述的是dom元素 可以增加一些自定义的属性 (虚拟节点可以增加很多属性 比如 vm, 自定义属性等)

- ast就是解析模板的 一点vue的东西都不粘

```js
function vnode(vm, tag, key, data, children, text) {
  return {
    vm,
    tag,
    key,
    data,
    children,
    text,
    // 这里还可以增加 事件 插槽 指令等属性
  }
}
```


> createElementVnode(m, tag, data = {}, ...children)
- 创建节点的方法
- 参数:
- 从 arguments 身上取出来的 就是render函数中的 标签名 标签属性 标签文本

```js
// 创建元素 就是 _c() 或者 h() 都是一个方法
export function createElementVnode(vm, tag, data = {}, ...children) {

  let key = data.key
  if(key) delete data.key

  return vnode(vm, tag, key, data, children)
  
}
```

> _v()
- 内部调用 src/vdom/index.js 中的 createTextVnode() 方法

- 我们将 _v() 收到的参数 和 vm 都传递到 createTextVnode() 中

```js
Vue.prototype._v = function() {
  return createTextVnode(this, ...arguments)
}
```

> createTextVnode(vm, text)
- 生成文本节点的方法
```js
export function createTextVnode(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text)
}
```


> 到此 我们调用 vm._render() 后 就会返回一定 虚拟DOM节点

- 因为上面我们分别对 render字符串函数中的 _c _v _s 做了对应 它们最终会返回虚拟DOM

```js
Vue.prototype._render = function() {
    
  let vm = this
  let vnode = vm.$options.render.call(vm)

  return vnode
} 
```

- 我们看看 vnode 的样式
```js
  children: (2) [{…}, {…}]
  data: {id: 'app', style: {…}}
  key: undefined
  tag: "div"
  text: undefined
  vm: Vue {$options: {…}, _data: {…}, …}

  // 我们再看看 标签文本
  text: "samhello18world"
```

- 是不是 读出了数据
- 在我们执行 vm._render() 的执行就会执行 _c _v _s 而且还会从 vm 上取值

**当渲染的时候 会去实例中取值 我们就可以将属性和视图绑定在一起**
- 取值的过程利用了 with(this) { ... }
```js
// 执行这句话的时候
let vnode = vm.$options.render.call(vm)
```

- 当属性变了的时候 我们就可以重新调用 vm._render

- 小总结:
- 我们将 html模版解析成 ast语法树 在解析的过程中 我们将对应的字符串数据 放到了 预定的 _c _s _v 中
- 并且使用 with(this) 的方法 让字符串转成函数的时候(new Function)之后 其中的变量会去 vm 上找

- 最总我们通过new Function的方式将字符串函数转换成了真正的函数 并且 定义了 _c _s _v 方法的实际执行逻辑

- 最终当调用了render函数后 我们得到了 VDOM

---

> 简单的回顾下:
- 这样 上面有了 _c() _v() _s() render执行完 返回的就是虚拟节点了

- 1. 我们根据 模板 生成了 ast 将 ast进行转换 生成了字render函数
- 2. 我们将 render 函数 挂载到了 vm.$options.render 上
- 3. 然后我们要调用render函数 产生虚拟节点 根据虚拟节点产生真实dom 插入到页面元素中 这个过程也是 挂载的过程 所以我们将这个部分的逻辑封装在了 mountComponent() 中

- 4. mountComponent中会调用 vm._render vm._update 用于完成下面的两项逻辑
  调用 render 方法 产生虚拟节点(DOM)
  根据虚拟DOM产生真实DOM
```js
function mountComponent(vm, el) {
  // 将 el 也挂载到 vm 上
  vm.$el = el

  vm._update(vm._render())
}
```

- 5. 因为 vm._render vm._update 这两个方法是在Vue实例上的所以我们又给Vue扩展了这两个方法

- 6. 在 vm._render 方法中 我们会实际调用 vm.$options.render.call(vm) 然后返回一个 虚拟DOM
```js
Vue.prototype._render = function() {
  let vm = this
  let vnode = vm.$options.render.call(vm)
  return vnode
} 
```

- 7. 因为 我们将 template 转成 render函数的时候 字符串函数中 有
  _c()
  _v()
  _s()
- 等方法 所以我们在vm身上也扩展了 这三个方法 同时
  _c() 内部调用了 createElementVnode(vm, tag, data = {}, ...children)
  _v() 内部调用了 createTextVnode(vm, text)

- 8. 
  createElementVnode(vm, tag, data = {}, ...children)
  createTextVnode(vm, text)

- 都是用于创建 虚拟节点的 所以各自内部又调用了 
  vnode(vm, tag, key, data, children, text)

```js
function vnode(vm, tag, key, data, children, text) {

  return {
    vm,
    tag,
    key,
    data,
    children,
    text,
    // 这里还可以增加 事件 插槽 指令等属性
  }
}
```

- 这样下面的 c v s 他们返回的都是 虚拟节点 会拼接到我们的render函数中 **这样render函数返回的就是一个虚拟DOM了**
  _c()
  _v()
  _s()

---

- 也就是说 vm._render() 返回的是 **虚拟DOM** 
- 而我们上面回顾的 要完成组件挂载的逻辑 需要
- 1. 生成虚拟DOM
- 2. 转换成真实DOM
- 3. 插入到 el 元素中

```js
function mountComponent(vm, el) {
  // 将 el 也挂载到 vm 上
  vm.$el = el
  vm._update(vm._render())
}
```

- 现在我们有了 vm._render() 返回的虚拟DOM 下面我们还是完善 vm.update() 方法 用来将虚拟DOM转换成真实DOM

```js
// src/lifecycle.js
// 组件的挂载
export function mountComponent(vm, el) {
  // 将 el 也挂载到 vm 上
  vm.$el = el

  // 1. 调用 render 方法 产生虚拟节点(DOM)
  // 2. 根据虚拟DOM产生真实DOM
  // 3. 插入到el元素中
  vm._update(vm._render())
}


export function initLifeCycle(Vue) {

  Vue.prototype._update = function(vnode) {
    // console.log("update: ", vnode)
    /*
      children: (2) [{…}, {…}]
      data: {id: 'app', style: {…}}
      key: undefined
      tag: "div"
      text: undefined
      vm: Vue {$options: {…}, _data: {…}, …}
    */
  }

  ...
}
```


> vm._update(vnode)
- 将传入的虚拟dom转换为真实的dom
- 目的:
- 根据 vnode 生成真实dom 替换掉 el(div#app)
```js
Vue.prototype._update = function(vnode) {

  // 获取 el 
  const vm = this
  const el = vm.$el

  console.log(el, vnode)
  
  // 该方法既有初始化的功能 也有更新的功能 我们将patch()返回的真实节点 更新 $el 上的节点
  vm.$el = patch(el, vnode)
}
```

- 我们在 update(vnode) 方法中主要要完成的逻辑 我们会封装在 patch() 方法中


> patch(oldVnode, vnode)
- 该方法既有初始化的功能 也有更新的逻辑(diff算法也会用)
- 根据 vnode 创建真实的 dom 之后 替换掉 el

- 返回值:
- 真实的DOM节点

> 初次渲染:
- 在初次渲染的时候 我们会将虚拟节点 转换成 真实节点 后 替换掉
- 也就是说 初次渲染的时候 oldVnode 是 el(document.querySelector(el)选择到的真实DOM)


> 更新操作:
- 在更新操作的时候 oldVnode 也是虚拟节点了

- 参数:
- oldVnode: 
- 之前的节点

- vnode: 
- 新的节点

- 既然改方法 既有初始化的功能 也有更新的功能 所以我们要判断 oldVnode 是真实元素 还是 虚拟节点

> 判断方法:
- 节点.nodeType:
- 真实dom节点的话 都有这个属性 我们的虚拟dom则没有这个属性 会是 undefined

- 1. 元素节点: 1
- 2. 属性节点: 2
- 3. 文本节点: 3

```js
function patch(oldVnode, vnode) {

  // 判断 oldVnode 是否是真实dom元素
  const isRealElement = oldVnode.nodeType

  // 如果是则为: 初渲染流程
  if(isRealElement) {
    // 初渲染
  } else {
    // diff算法
  }
}
```

> 初渲染流程:
- 我们需要将之前的dom删掉 创建一个新的节点添加进去


- patch(oldVnode, vnode) 中的逻辑
- 1. 判断 oldVnode 是否为真实元素
- 2. 获取 该元素的父元素
- 3. 根据 vnode 创建真实元素 调用**createElm(vnode)**

```js
function patch(oldVnode, vnode) {

  // 判断 oldVnode 是否是真实dom元素
  const isRealElement = oldVnode.nodeType

  // 如果是则为: 初渲染流程
  if(isRealElement) {

    // 给 oldVnode 换个名字 在初渲染的逻辑中 也好理解 初渲染的时候 el 是一个真实的元素
    const el = oldVnode

    // 获取它的父元素
    const parentEl = el.parentNode  // body
    
    // 创建真实元素
    let newELm = createElm(vnode)

    // 后续我们会将 newELm 替换掉 div#app

  } else {
    // diff算法
  }
}
```


> createElm(vnode)
- 根据虚拟dom**创建真实的元素**
- 创建真实元素的逻辑也很简单 我们能从虚拟vnode中拿到 tag data children text 等属性 根据这些值 我们可以通过原生的api生成对应的节点

- 比如: 
- tag: "div"
- 那我们是不是可以创建元素 let el = document.createElement(tag) 我们是不是就创建了一个div

- 返回值:
- 真实DOM

> 逻辑:
- 1. 先从 vnode 身上取出 tag, data, children, text
- 2. 根据 tag 判断是元素节点还是文本节点(文本节点时 tag为undefined)
```js
if(typeof tag == "string") {

  /*
    如果是 元素节点 则处理
    1. 生成 元素标签
    2. 给 元素标签 添加属性
    3. 给 元素标签 添加子节点 (因为是一棵树的关系 子树都会在 root节点下)
  */

} else {
  // 这时候就是 文本节点
}
```

- 3. 不管是 元素节点 还是 文本节点 最终我们都会挂载到 vnode 上
- 为了后面 实现diff算法 我们将创建好的元素 放在 vnode 上
- 这里将真实节点 和 虚拟节点对应起来 后续如果修改属性了 我们可以直接找到 虚拟节点对应的真实节点来修改属性 所以虚拟节点上会挂载着真实节点
<!-- 
  VDOM: vnode
  TDOM: vnode.el
 -->

```js
function createElm(vnode) {
  // 取出属性
  let {tag, data, children, text} = vnode

  // 说明 tag 是一个标签 (tag还可能是undefined 因为文本节点的时候只有text属性)
  if(typeof tag == "string") {
    /*
      vnode: {
        children: (2) [{…}, {…}]
        data: {id: 'app', style: {…}}

        el: div   // 多了 el 节点(真实的)

        key: undefined
        tag: "div"
        text: undefined
        vm: Vue
      }
      为了后面 实现diff算法 我们将创建好的元素 放在 vnode 上
      这里将真实节点 和 虚拟节点对应起来 后续如果修改属性了 我们可以直接找到 虚拟节点对应的真实节点(VDOM: vnode, TDOM: vnode.el), 来修改属性 所以虚拟节点上会挂载着真实节点
    */
    vnode.el = document.createElement(tag)


    // 处理属性: 更新 vode.el 元素的 data属性(data是标签属性)
    patchProps(vnode.el, data)


    // 处理子节点:
    children.forEach(child => {
      // 将 child(子标签 子节点) 也创建成真实节点 将子节点放入到它的父节点中 也相当于给 el添加内容
      vnode.el.appendChild(createElm(child))
    })

  } else {
    // 如果 tag 不是字符串 我们就要创建文本节点 同样也要挂载到虚拟节点上
    vnode.el = document.createTextNode(text)
  }

  console.log(vnode)
  // 返回真实元素
  return vnode.el
}
```


> patchProps(el, props)
- 上面在处理标签文本的时候 会给元素添加属性
- 方式也很简单 拿到属性 给el循环赋值

- 1. 要考虑 style 的情况
```js
function patchProps(el, props) {
  // 将属性循环一遍赋值到元素上
  for(let key in props) {

    // 如果 key 是 style
    if(key == "style") {
      /*
        标签上的 style 是这么写的  style = "color:red"

        我们的props里面的style属性是
        style: {background: 'pink', width: '100px'}
      */
      for(let styleName in props[key]) {
        el.style[styleName] = props[key][styleName]
      }
    } else {
      el.setAttribute(key, props[key])
    }
    
  }
}

```

- 这样 patch() 方法就会返回 一个 真实的DOM节点
```js
function patch(oldVnode, vnode) {

  const isRealElement = oldVnode.nodeType

  if(isRealElement) {
    const el = oldVnode
    const parentEl = el.parentNode  // body
    
    // 创建真实元素
    let newElm = createElm(vnode)


  } else {
    // diff算法
  }
}
```

- 真实的DOM节点:
- 注意: 我们替换了 {{name}} 变量的值
```html
<div 
  id="app" 
  style="background: pink; width: 100px">
  <div 
    key="key123" 
    style="color: red;"
  >samhello18world</div>

  <span>world</span>
</div>
```

- 然后 我们要删除 html中的 div#app 换成我们的 新的真实DOM

- 我们要
- 1. 调用 div#app 的父节点的 insertBefore(new, 指定节点) 在指定节点的前面插入新节点
- 2. 删掉div#app


- 所以回到 patch(oldVnode, vnode) 方法中
```js
function patch(oldVnode, vnode) {

  const isRealElement = oldVnode.nodeType

  if(isRealElement) {
    const el = oldVnode
    const parentEl = el.parentNode  // body

    // 创建真实元素
    let newELm = createElm(vnode)

    // 将 newELm 插入到 el.nextSibling 的前面(也就是老节点的下面)
    parentEl.insertBefore(newELm, el.nextSibling)

    // 删除老节点
    parentEl.removeChild(el)

    // 我们让 patch() 方法有返回值 将 newElm 返回出去
    return newELm


  } else {
    // diff算法
  }
}
```

- 我们将 patch(el, vnode) 返回来的 真实DOM 替换掉 vm.$el(这是根据选择器字符串得到的非解析数据的DOM结构还带{{name}})
```js
Vue.prototype._update = function(vnode) {

  // 获取 el 
  const vm = this
  const el = vm.$el
  
  // 该方法既有初始化的功能 也有更新的功能 我们将patch()返回的真实节点 更新 $el 上的节点
  vm.$el = patch(el, vnode)

}
```

- 我们整个的渲染逻辑无法就是两个方法
- vm._render()
- vm._update()
  - patch()

- 当我们的数据发生变化的时候 我们就是希望重新执行 patch() 拿到新的虚拟DOM 新的vm.$el 传入 这样不就完成了更新操作么

- 当数据变化下次更新的时候 会从vm.$el身上得到相对的旧模版 然后传入新的VDOM 从新走新的更新流程

- 比如:
- 我们手动的做下更新的操作
```js
const vm = new Vue({
  el: "#app",
  // template: "<div>template</div>",
  data: {
    name: "sam",
    age: 18,
    address: {
      local: "白山"
    },
    hobby: ["eat", "drink", {name: "erin"}]
  },
})


// 手动更新(暴力更新)
setTimeout(() => {
  vm.name = "erin"
  vm.age = 30

  // vm._render()重新根据数据渲染出一个虚拟DOM 如果不手动调用的话 只是改了数据
  vm._update(vm._render())
}, 1000)
```

- 但是我们不能每次改数据都调用这个吧
- vm._update(vm._render())

- 所以接下来我们会将 属性 和 视图关联起来 做到数据变化可以自动更新视图(观察者模式)

- 下面我们会做 依赖收集 和 页面渲染

> 回顾:
- 1. 在 new Vue 的时候会将 data配置项中的数据变为响应式数据
- 在这个过程中会调用 initState() 它会对所有的属性进行 defineProperty 来增加getter 和 setter 还会重写数组的方法

- 2. 对 template 模版进行编译
- 将模版先转换成ast语法树 将ast语法树生成成render方法 调用render方法会进行取值操作 产生虚拟dom

- 3. 将虚拟dom渲染成真实的dom
  - _render() 根据数据创建新的虚拟dom
  - _update() 让虚拟dom 变成真实dom 并重新渲染

----------------

### 依赖收集
- 上面我们完成了挂载 现在我们要收集 html模板中的依赖 然后修改属性 更新组件


> 回顾我们做了什么?
> 1. 初始化data配置项中的数据
- 在 new Vue({data: {}}) 的时候会将数据变成响应式数据 在做这件事的时候会调用 initState() 
- 它会对所有的属性进行 defineProperty 来增加get set 还会重写数组的方法

- 响应式数据:
- 1. 针对对象来说主要是增加 defineProper() 拦截属性
- 2. 针对数组就是重写方法


> 2. 模版编译
- 将模版先转换成ast语法树(通过正则匹配标签解析属性 标签名 文本) 解析后将ast语法树生成render方法(执行render方法会返回虚拟DOM)
<!-- 
  render() {
    _c("div", null, _v(name))
  }
 -->

- 将虚拟DOM渲染成真实的DOM

---

- 上面我们也实现了下 更新数据 手动更新页面的操作 但我们想做的是当数据变化后 可以自动的渲染页面(自己重新渲染)
- 这就涉及到了 **依赖收集**

```html
<div>
  {{name}} -- {age}
</div>
```


> 什么是依赖收集?
- 比如上面我们在模版中使用到了 name age 那等 name age 的值发生变化了 我们就要重新渲染模版了(自动完成)
 

> 目标:
- 1. 观察者模式实现依赖收集

- 2. 异步更新策略
- 如果name age的值频繁被修改 会导致频繁的渲染 这里会讲怎么进行批量更新的

- 3. mixin的实现原理


> 思路:
- 我们可以给组件中的每个属性都对应增加一个收集器(dep)
- (收集器是给每一个属性增加的, 比如name age属性会各自会有一个收集器 dep)

- 在页面渲染的时候 我们将渲染逻辑封装到 watcher 中 然后将watcher放到 dep 中

<!-- 
  (_vm.update(_vm.render()) 就是渲染逻辑) 
  通过 watcher 实例来进行后续的 初挂载 和 更新组件的操作
 -->

- 让 dep 记住 watcher 稍后属性变化了(被修改了)就可以利用到dep中存放的watcher进行重新渲染(更新组件)
<!-- 
  defineReactive() 中的dep
 -->

- 这里我们整理下上面提到的 dep watcher 之间的关系:


- **watcher:**
- 一个组件会有一个watcher, 比如:
  - A组件会有一个 watcher A
  - B组件会有一个 watcher B
  - C组件会有一个 watcher C

- 那 A组件中 使用了 num  变量
- 那 B组件中 使用了 name 变量
- 那 C组件中 使用了 age  变量

- 当 num 发生了变化 B C 组件是不需要更新的只有A组件对应的watcher才需要更新


- **dep:**
- 每个属性都会有自己的dep 用来收集 watcher 和 当属性修改(触发set) 的时候 经过一系列的方式来重新渲染组件
- 一个组件会有一个watcher 比如A组件中有 {{num}} 变量但是num 和 A组件的watcher并没有关联起来 怎么才能产生关联呢?

- 我们可以给每个属性都分配一个dep 让dep将watch收集起来
<!-- 
  让dep将watch收集起来:
    是说 比如 vuex中的一个变量可能会被N个组件使用 那是不是说 一个属性对应了多个组件的watcher 我们就可以让这个属性的dep将对应的多个watcher收集起来
 -->

- 我们需要给每个属性增加一个dep 目的就是收集watcher 让属性收集它所依赖的watcher
- 一个组件有n个属性(n个属性会对应一个组件)
- 一个组件有一个watcher 一个属性又有各自的dep 一个组件中有n个属性 同理 n个dep对应一个watcher
- 还有一种情况 一个属性会对应多个组件 也就是说 一个dep会对应多个watcher 它们之间是多对多的关系


- **组件的优点:**
- 复用
- 方便维护
- 局部更新
- 如果在一个页面里面就一个watcher 不管是哪个属性变了 整个页面都会重新执行 
- 如果每个组件只有一个watcher 那就是说每个组件有对应的一个watcher 这样重新渲染的时候只重新渲染组件内部的依赖就可以了 减小更新的范围


<!-- 
  A组件: watcher A        B组件: watcher B  

  num - dep              num - dep 
  age - dep


  那么 num的dep就多对应两个wacher
 -->


- 我们将 vm._update(vm._render()) 封装到一个 watcher中 Watcher是一个类

- 我们通过 new Watcher() 的方式执行 vm._update(vm._render())

```js
// src/lifecycle.js 组件的挂载
export function mountComponent(vm, el) {
  vm.$el = el
  vm._update(vm._render())
}
```

- 改成:

```js
// src/lifecycle.js 组件的挂载
export function mountComponent(vm, el) {
  vm.$el = el

  // 定义一个更新组件的回调 将这个回调传入到 Watcher 中 这样Watcher类中不仅有更新组件的逻辑 还有其它功能
  const updateComponent = () => {
    vm._update(vm._render())
  }

  // 利用 Watcher来进行的更新组件的操作 这样每个组件在渲染的时候 都有自己的watcher
  new Wacher(vm, updateComponent, true)
}
```


- watcher.js

  | - src
    | - observe
    | - watcher.js


- dep.js

  | - src
    | - observe
    | - dep.js


> dep
- src/observe/dep.js

```js
// 每一个属性都会有对应的一个 dep 用作依赖收集 所以dep也会有好多个
let id = 0

// 属性的dep要收集watcher 
class Dep {
  constructor() {
    this.id = id++

    // 这里存放着当前属性对应的watcher有哪些 一个属性可能有多个watcher
    this.subs = []
  }


  // 将 watcher 放到 dep - subs数组中
  depend() {
    this.subs.push(Dep.target)
  }
}

// 静态属性: 静态属性只有一份 我们 import 导入 dep 文件的时候 它身上就有这个属性 我们用来挂载watcher实例
Dep.target = null

export default Dep
```


> watcher
- src/observe/watcher.js
```js
import Dep from "./dep"

// 每次创建 watcher 都给它一个唯一值
let id = 0

// Watcher 里面有更新组件的方法 this.get()
class Wacher {
  /**
   * 
   * @param {*} vm 我们需要知道当前的watcher是哪个实例的
   * @param {*} fn 实例(组件)对应的渲染函数 vm._update(vm._render())
   * @param {*} options 布尔类型标识是一个渲染watcher
   */
  constructor(vm, fn, options) {
    // 每次创建 实例 的时候 让id++ 这样每个watcher都有自己的id
    this.id = id++

    // 布尔类型: 标识是何种watcher
    this.renderWatcher = options
    this.getter = fn

    // 初渲染 先调用一次
    this.get()

  }

  get() {
    /*  
      当我们创建渲染watcher的时候(组件渲染的时候) 我们会把当前的渲染watcher放到dep的target上

      下面调用this.getter() == vm._update(vm._render()) 就会取值 取值的时候就会走到 defineReactive - getter 上
    */
    Dep.target = this

    // vm._update(vm._render())还具有取值的功能 因为render的时候nameage这些变量都会从vm上取值 我们只要一调用该函数就会到 vm 上取值
    this.getter()

    // 渲染完后清空
    Dep.target = null
  }
}

export default Wacher
```


- 我们想: 我们需要给每一个属性增加 dep 属性 将watcher往dep中丢

- 上面 我们还创建了 dep 和 watcher 那我们怎么将 dep 和 watcher 关联到一起呢? 

- 我们看下 Dep 类
- 我们添加了静态属性 Dep.target 用于挂载watcher实例


- 我们再看下 Watcher 类
- 在 get() 方法中 我们将 watcher实例 挂载到了 
  Dep.target = this 
- 身上 并在渲染组件结束后 清空target属性

<!-- 
  清空target属性:
    还有一个用处 当我们通过下面的方法取值的时候

    let vm = new Vue({
      data: {
        name: "sam"
      }
    })

    // 当我们这么取值的时候
    vm.name

  这时候的name属性并没有在模版中使用 也会走get方法 但是
  if(Dep.target) {
    dep.depend()
  }

  会做判断 但是这时候是没有 Dep.target 的 所以也不会进行依赖收集

  Dep.target 也会在通过 new Watcher 的时候才会收集模版中的依赖(因为render会从vm身上取值 - get() - dep.depend)
 -->


- 介绍完后我们捋一下思路
- 我们在渲染组件的时候会通过 new Watcher() 来执行渲染组件的逻辑吧

- 当我们new Watcher的时候会执行 this.get()
```js
get() {
  this.getter()
}
```

- this.getter()就是 vm._update(vm._render()) render() 方法在执行的时候 会去vm上取值吧
<!-- 
  这里取的值 是html模版中用到的属性
  用不到的属性不会做收集处理

  因为 vm._update(vm._render()) 方法是首次渲染和更新的方法 所以首次渲染会收集watcher 更新的时候也会再次收集
 -->

- 取值的时候是不是就会调用 vm.name 的get() 方法
- 我们在 initData 的时候 会对每一个属性进行 defineProperty处理
```js
export function defineReactive(target, key, value) {

  observe(value)


  // 给一个属性都增加一个 dep 属性 这个是闭包区域这里的属性不会被销毁
  let dep = new Dep()

  Object.defineProperty(target, key, {

    // 取值: 
    get() {
      // 判断
      if(Dep.target) {
        // 让这个属性的收集器记住当前的watcher
        dep.depend()
      }

      // 取值的时候 取参数value
      return value
    },

    set(val) {
      if(val == value) return
      observe(val)
      value = val
    }
  })
}
```

- 我们在走 get() 方法的时候 将组件的watcher 添加到 Dep 的 subs 数组中


**注意:**
- 1. 我们将 vm._update(vm._render()) 方法封装到了 Watcher 类中 类中有this(代表watcher) 所以每次我们渲染组件的时候 就会取值触发get() 然后get() 中的 属性的dep就会将对应的watcher push到每一个属性的dep的subs数组中

- 2. dep并不是在 每一个属性本身身上体现出现 不是当我们 console.log 的属性的时候 能打印出来的东西
```js

console.log(name)
// name: {dep: xxx}
```

- dep就是 defineProperty 方法里闭包中缓存的一个数据 因为是闭包该数据不会消失 是不是 dep 在这个闭包中缓存着呢


- 比如我们做下面的例子来进行验证
```js
let id = 0

let obj = {
  name: "sam",
  age: 18
}

Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))

function defineReactive(target, key, value) {

  let keyId = id++

  Object.defineProperty(target, key, {
    get() {

      // 我们在这里打印 keyId 当我们读 name 的时候 会是0 当我们读 age 的时候 会是1
      console.log(keyId)
      return value
    },
    set(val) {
      if(value == val) return
      value = val
    }
  })
}

console.log(obj)
```

- 说明 虽然打印不出来 但是确实每一个属性 都被缓存了一份 dep

---

> 上述技巧:
- 上面我们可以将 Dep.target Dep的静态属性target当做是一辆公交车 这样到哪只要引入Dep文件 都会有 target 这个属性 我们可以通过这个公共属性 传递各种属性 数据


> 问题:
> 1. 如果模版中是这么写的
```html
<div> {{name}} -- {{age}} -- {{name}} </div>
```
- 我们看 有两个name属性 这种情况下 一个name属性的dep会保存两个相同的watcher
```js
class Dep {
  constructor() {
    this.subs = []
  }
}

// this.subs: [Watcher {id: 0, xxx}, Watcher {id: 0, xxx}]
```

- 所以我们这里要对watcher进行去重 已经放进来了 就不要重复放watcher了


> 2. 上面的操作只是一个单向的关系 dep -> 收集了 watcher
<!-- 
  new Watcher -> 将 watcher的this挂载到 Dep.target 身上

  new Watcher()的时候会执行render
  render -> 属性get() -> get()中new Dep -> 将 组件对应的watcher放到了 Dep的subs数组中
 -->

- 但是我们还希望让watcher去记录dep 应该是双向的 一个渲染逻辑中会对一个多个属性 一个属性也可能会对应多个watcher 

- 所以我们在 Watcher 类中也定义一个数组 让它存放多个dep
<!-- 
  watcher记录dep的作用
    比如组件卸载 我们会希望让watcher清理掉所有的响应式数据 这时候数据再更新跟我们也没什么关系了
 -->


> Dep 修改后的结果
```js
let id = 0

class Dep {
  constructor() {
    this.id = id++

    // 这里存放着当前属性对应的watcher有哪些 一个属性可能有多个watcher
    this.subs = []
  }


  // 在调用 depend() 的时候 会先让watcher记住dep 因为调用的watcher的addDep方法 该方法内部是通过dep的实力调用addSub() 将watcher添加到subs数组中
  depend() {
    // this.subs.push(Dep.target)

    // Dep.target是 watcher 我调用addDep()方法将这个Dep传过去 让Watcher也能记住dep(将dep添加到watcher的deps数组中)
    Dep.target.addDep(this)
  }

  addSub(watcher) {
    // 将传过来的watcher放到subs数组中
    this.subs.push(watcher)
  }
}

// 关键位置
Dep.target = null

export default Dep
```

- getter -> 会调用Dep中的depend() 其中继续调用watcher.addDep(this)方法 **先让watcher记住dep** -> 然后利用addDep(dep) dep回调Dep中的addSub(this) **在让dep记住watcher**

> Watcher的修改结果
```js
import Dep from "./dep"

// 每次创建 watcher 都给它一个唯一值
let id = 0

class Wacher {
  constructor(vm, fn, options) {
    this.id = id++
    this.renderWatcher = options
    this.getter = fn

    // deps: 用来保存一个watcher对应了哪些dep 后续我们实现计算属性 和 一些清理工作的时候需要用到
    this.deps = []
    this.depsId = new Set()

    this.get()
  }

  get() { 
    Dep.target = this
    this.getter()
    Dep.target = null
  }

  // 一个组件对应着多个属性 重复的属性也不用记录 我们期望让watcher和dep是相互记忆的
  addDep(dep) {
    // 利用id去重
    let id = dep.id
    
    // 看看 depsId 有没有 该id
    if(!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)

      // 让 dep 把 watcher 也记住 将watcher(this)传过去 
      dep.addSub(this)
    }
  }
}

export default Wacher
```

- 为了完成 去重的效果 和双向绑定(让dep记住watcher 和 让watcher记住dep) 我们在 Watcher 类中 定义了 deps数组 用于保存这个watcher对应的dep们

- 添加了 addDep() 方法
- 1. 将传过来的 dep push到deps数组中(让watcher记录dep)
- 2. 通过传递过来的dep实例 调用dep类中的 addSub 方法 将watch传递过去 保存到Dep的subs数组中
```js
// watcher.js
addDep(dep) {
  // 利用id去重
  let id = dep.id
  
  // 看看 depsId 有没有 该id
  if(!this.depsId.has(id)) {
    this.deps.push(dep)
    this.depsId.add(id)

    // 让 dep 把 watcher 也记住 将watcher(this)传过去 
    dep.addSub(this)
  }
}
```

```js
// dep.js
// 在调用 depend() 的时候 会先让watcher记住dep 因为调用的watcher的addDep方法 该方法内部是通过dep的实力调用addSub() 将watcher添加到subs数组中
depend() {

  // Dep.target是 watcher 我调用addDep()方法将这个Dep传过去 让Watcher也能记住dep
  Dep.target.addDep(this)
}

addSub(watcher) {
  // 将传过来的watcher放到subs数组中
  this.subs.push(watcher)
}
```

- 相当于:
- render后会走属性的get() 在get()方法中调用了 dep.depend() -> 
  dep.depend()中调用了 watcher.addDep() 将dep添加到了watcher的deps数组中 -> 
   然后watcher.addDep()中调用了 dep.addSub() 将watcher添加到了subs数组中

- 相当于形成了一个圈 这样完成的双向绑定 dep和watcher之间是多对多的关系
- 一个属性可以在多个组件中 所以一个dep对应多个watcher
- 一个组件中由多个属性组成 所以一个watcher对应多个dep


> 修改属性更新界面
- 接下来我们就要完成 当更新 name 的时候重新渲染
- 当我们更新 name 属性的时候 是不是就走到 defineProperty() 中的set方法了 当走到set()方法的时候 我们就需要让对应的 dep 更新视图(dep -- name是对应的关系)

- 当我们修改 name 调用 set() 
- set() 方法中 调用 dep.notify() 触发notify() 方法
- notify() 中遍历dep中保存的所有watcher 让它们执行watcher中的update()
```js
notify() {
  // 让自己身上存的所有watcher 让watcher做更新操作
  this.subs.forEach(watcher => watcher.update())
}
```

- watcher.update()方法中调用 this.get() 重新渲染组件


- watcher就是观察者 它会观察每一个属性
- 属性就是被观察者 当属性变化的时候会通知观察者重新渲染组件

- 这就是观察者模式

- 上面还有一个问题 当 页面中是这样的结构的时候
```html
<div> {{name}} {{name}} </div>
```


> 这个部分的代码
```js
// src/lifecycle.js

// 组件的挂载
export function mountComponent(vm, el) {
  vm.$el = el

  // 将上面的逻辑封装到了 watcher 中我们通过watcher来进行调用
  const updateComponent = () => {
    vm._update(vm._render())
  }
  // debugger
  // 利用 Watcher来进行的更新组件的操作 这样每个组件在渲染的时候 都有自己的watcher
  new Wacher(vm, updateComponent, true)
}


// src/observe/dep.js
// 每一个属性都会有对应的一个 dep 用作依赖收集 所以dep也会有好多个
let id = 0

// 属性的dep要收集watcher 
class Dep {
  constructor() {
    this.id = id++

    // 这里存放着当前属性对应的watcher有哪些 一个属性可能有多个watcher
    this.subs = []
  }


  // 在调用 depend() 的时候 会先让watcher记住dep 因为调用的watcher的addDep方法 该方法内部是通过dep的实力调用addSub() 将watcher添加到subs数组中
  depend() {
    // this.subs.push(Dep.target)

    // Dep.target是 watcher 我调用addDep()方法将这个Dep传过去 让Watcher也能记住dep
    Dep.target.addDep(this)
  }

  addSub(watcher) {
    // 将传过来的watcher放到subs数组中
    this.subs.push(watcher)
  }

  notify() {
    // 让自己身上存的所有watcher 让watcher做更新操作
    this.subs.forEach(watcher => watcher.update())
  }
}

// 静态属性: 静态属性只有一份 我们 import 导入 dep 文件的时候 它身上就有这个属性
Dep.target = null

export default Dep



// src/observe/watcher.js
import Dep from "./dep"

// 每次创建 watcher 都给它一个唯一值
let id = 0

// Watcher 里面有更新组件的方法 this.get()
class Wacher {
  /**
   * 
   * @param {*} vm 我们需要知道当前的watcher是哪个实例的
   * @param {*} fn 实例(组件)对应的渲染函数 vm._update(vm._render())
   * @param {*} options 布尔类型标识是一个渲染watcher
   */
  constructor(vm, fn, options) {
    // 每次创建 实例 的时候 让id++ 这样每个watcher都有自己的id
    this.id = id++

    // 布尔类型: 标识是何种watcher
    this.renderWatcher = options
    this.getter = fn

    // deps: 用来保存一个watcher对应了哪些dep 后续我们实现计算属性 和 一些清理工作的时候需要用到
    this.deps = []
    this.depsId = new Set()

    // 初渲染 先调用一次
    this.get()
  }

  get() {
    // 当我们创建渲染watcher的时候(页面渲染的时候) 我们会把当前的渲染watcher放到dep的target上
 
    // 下面调用this.getter() == vm._update(vm._render()) 就会取值 取值的时候就会走到 defineReactive - getter 上
    Dep.target = this

    // vm._update(vm._render())还具有取值的功能 因为render的时候nameage这些变量都会从vm上取值 我们只要一调用该函数就会到 vm 上取值
    this.getter()

    // 渲染完后清空
    Dep.target = null
  }

  // 一个组件对应着多个属性 重复的属性也不用记录 我们期望让watcher和dep是相互记忆的
  addDep(dep) {
    // 利用id去重
    let id = dep.id

    // 看看 depsId 有没有 该id
    if(!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)

      // 让 dep 把 watcher 也记住 将watcher(this)传过去 
      dep.addSub(this)
    }
  }

  update() {
    // 让组件重新渲染
    this.get()
  }
}

export default Wacher


// src/observe/index.js
export function defineReactive(target, key, value) { // 参数value 相当于闭包 相当于在defineProperty函数外层定义了一个变量 该变量不会被销毁

  // 这里调用 observe() 传入 value
  observe(value)

  // 给一个属性都增加一个 dep 属性 这个是闭包区域这里的属性不会被销毁
  let dep = new Dep()

  Object.defineProperty(target, key, {
    // 取值: 
    get() {

      // 判断
      if(Dep.target) {
        // 让这个属性的收集器记住当前的watcher
        dep.depend()
      }

      // 取值的时候 取参数value
      return value
    },
    // 
    set(val) {
      // 设置值的时候 设置参数value
      if(val == value) return // 值一样的话就不用修改了

      // 如果设置的值是一个对象的话我们要对设置的值再次代理
      /*
        比如用户这样修改值: 
        vm.address = {
          num: 1
        }
        这样做的话 我们set的val就是一个对象了 我们应该对对象的值再次代理
      */
      observe(val)
      value = val

      // 通知更新
      dep.notify()
    }
  })
}
```

----------------

### 异步更新
- 上面的部分逻辑中还有一个问题是 比如
```html
<div>
  {{name}} -- {{age}}
</div>

<script>
  setTimeout(() => {
    vm.name = "sam"
    vm.age = 18
  })
</script>
```

- 只要我们修改了一个属性的值 就会触发一次 notify() 修改了两个属性 那就会连续触发两次 notify 页面会render两次

- 这样会浪费性能 我们希望的是 不是每次更新都渲染 等 setTimeout 中的逻辑都执行完了 再去更新


- 要完成上面的逻辑 需要了解**事件环**

> 事件环
- 当javascript栈中的代码(逻辑)都执行完之后, 再去执行一些异步任务
<!-- 
  javascript栈

  |    |
  |    |
  |    |    -> 异步任务 
  |    |
  |    |
  ------   
 -->

- 也就是说我们希望 当同步的代码都执行完后 再去执行异步任务

- 比如:
```js
// 主线程:
console.log("修改name")
console.log("修改age")
console.log("修改address")

// 这时候我们期望主线程的代码跑完后再执行 异步任务 我们可以使用 setTimeout(() => {}, 0)
setTimeout(() => console.log("更新组件的操作"), 0)

```

- 这样我们就能确保 多次修改属性后(主线程操作) 最后统一到任务队列中执行更新组件的操作

- 同时为了确保 任务队列中的逻辑只执行一次 我们还可以使用节流阀的概念(once的概念)
```js
let pending = false

console.log("修改name")
console.log("修改age")
console.log("修改address")

// 使用节流阀 来保证 异步任务只执行一次
if(!pending) {
  setTimeout(() => console.log("更新组件的操作"), 0)
  pending = true
}
```


> 稍微回顾一下:
- 当我们修改了模版中依赖的属性后 会触发 set()
- set() 中会调用 dep.notify() 
- dep.notify() 中会调用 watcher.update() 
- update()中则是 vm._update(vm._render()) 的逻辑 重新渲染组件(更新页面)

---

- 也就是说 每次修改属性都会走到 update() 方法
- 那我们在 update() 中将watcher推到一个队列中(多次修改不同的属性都是主线程的逻辑) 而且我们还要对watcher进行去重
<!-- 
  我们做就是一个组件 所以就是一个watcher
  但是每个属性dep都记录一个watcher 这个组件中的属性都指向一个watcher 我们队列中会是多个相同的watcher 所以要进行去重
 -->

- 然后等主线程的任务执行完毕后 统一刷新队列(只刷新一次) 让watcher调用更新组件的方法
<!-- 
  队列中都是组件代表的watcher 通过watcher调用更新组件的方法 相当于更新该组件
 -->

--- 

> 实现逻辑
- /src/observe/watcher.js
- 1. 该文件中的 uddate() 不能直接调用 this.get() 直接更新组件了
```js
class Wacher {

  update() {
    // 让组件重新渲染
    // this.get()

    queueWatcher(this)
  }

  // 修改多个属性后 统一为一次更新组件的操作 再次封装到了run()里面
  run() {
    this.get()
  }
}
```

- 而是调用 queueWatcher(this) 将所有的watcher都放到队列中 (this就是Watcher的实例) 
- 而且我们还要对 watcher 进行去重
```js
// watcher队列
let queue = []

// 去重用
let has = {}

// 节流阀用
let pending = false


/*
  当 修改属性的时候 最终会走 update()方法 其中的逻辑为 每次修改之后我们都会将watcher暂存到一个队列中 
*/
function queueWatcher(watcher) {
  const id = watcher.id
  // has对象中没有id 则忘队列中放
  if(!has[id]) {
    queue.push(watcher)

    // !has[id] 这个是if的条件所以我们存值的时候 会考虑布尔
    has[id] = true

    // 不管 update() 执行多少次最终只执行一轮刷新操作 类似onece
    // 第一次肯定是 false
    if(!pending) {
      setTimeout(flushSchedulerQueue, 0)
      pending = true
    }
  }
}
```

- 然后我们在 异步里面使用 flushSchedulerQueue 刷新队列(执行队列中的逻辑)

```js
// 将队列中的任务一个个的拿出来进行执行
function flushSchedulerQueue() {
  // 将 queue 拷贝一份   flushQueue != queue
  let flushQueue = queue.slice(0)

  // 回初始化操作
  queue = []
  has = {}
  pending = false

  /*
    清空队列任务之前 我们先将watcher置为空

    然后清空 flushQueue 中的任务 
    上面开始回初始化的另一个好处 在刷新的过程中可能还有新的watcher
    因为页面修改了属性就会触发update() -> 就会收集watcher到queque中 我们将这时候的新的watcher 重新放到queue中 下一轮再执行 

    这也是批处理逻辑 先执行第一批(flushQueue) 第一批的执行过程中可能有第二批(放到queue中)
  */
  flushQueue.forEach(q => q.run()) 
}
```

- 上面我们将多次修改属性后的渲染逻辑合并成了一次


> 技巧: 批处理
- 1. 将任务推到 queue 中
- 2. 然后拷贝 queue 中的内容 为一个新的数组 flushQueue
- 3. 我们清空任务 flushQueue 同时将 queue置为空 这时候如果有新的任务 仍然可以推到queue中

- 也就是我们一批一批的处理

----------------

### nextTick()
- 上面还有一个问题 在我们修改属性的时候 上面的逻辑中都是使用的 setTimeout()
<!-- 
  跟setTimeout没有太大关系哈
  在主线程直接修改 name 也会触发更新操作 这里的setTimeout只是为了演示用的
 -->

```js
setTimeout(() => {

  vm.name = "sam",
  vm.age = 18

}, 0)
```

- 那我们现在不用定时器了 比如我们如下的需求 当我们直接通过 vm.name = "sam" 修改属性后 我们要获取页面中的dom渲染后的结果

```html
<!-- name: erin -->
<div>{{name}}</div> 

<script>
  // 我们现在这么修改name
  vm.name = "sam"

  // 改完后我们希望获取 修改后的的DOM结构
  console.log(#app.innerHTML)
    // 返回的却是 <div>erin</div> 
</script>
```

- 因为虽然我们改了name 但是它不会立即的渲染页面 
<!-- 
  watcher都被推到queue里面 主线程结束后才会执行flush操作 属于异步操作
-->

- 而我们console是主线程获取DOM 所以拿的就是旧的 那怎么办?  在Vue里面我们会使用 nextTick()


> nextTick()的由来:
- 既然上面 我们直接获取 console.log(#app.innerHTML) 拿不到最新的结果 原因是因为我们代码底层使用的是setTimeout() 将flush watcher队列的操作拿到了异步 而console是主线程的逻辑 也就是说他俩不在一个"地方"

- 那我们是不是可以这么干 将 获取 的逻辑使用 setTimeout 再包裹一下就可以了是么
```js
setTimeout(() => {
  console.log(#app.innerHTML)
})
```

- 是可以了 那就有人想 那setTimeout宏任务队列可以 那Promise微任务队列是不是也可以
```js
Promise.resolve().then(() => {
  console.log(#app.innerHTML)
})
```

- 不行 promise的微任务队列执行会比宏任务要高一些 微任务队列会优先执行 所以在 then 里面我们拿到的也是老的

- vue一想干脆你用户也别考虑在哪个队列获取了 底层我也不用setTimeout了 底层我用nextTick来完成逻辑 同时我给将nextTick暴露给用户

- 这样我们都规整成一个方法不就好了么


> 位置:
- src/observe/watcher.js

- 参数:
- 回调
```js
export function nextTick(cb) {

}
```

- 然后为了演示, 我们将 nextTick 也暴露出去 这样页面可以通过 vm 或者 this 调用 nextTick 这么做有些不合理 先这么做下

```js
// src/index.js
import { nextTick } from "./observe/watcher"

function Vue(options) {
  this._init(options)
}

Vue.prototype.$nextTick = nextTick
```


- 我们先看下下面的代码
```js
function queueWatcher(watcher) {
  const id = watcher.id
  if(!has[id]) {
    queue.push(watcher)
    has[id] = true

    if(!pending) {
      // flushSchedulerQueue 遍历拷贝的queue拿到watcher执行this.get()渲染组件
      setTimeout(flushSchedulerQueue, 0)
      pending = true
    }
  }
}
```

- 上面是 每次用户修改属性的时候 都会将属性对应的watch收集到 queue 中 然后统一使用setTimeout拿到异步进行批处理

- 上面使用了setTimeout() 我们上面说了 要将这部分的逻辑统一一下 

```js
function queueWatcher(watcher) {
  const id = watcher.id
  if(!has[id]) {
    queue.push(watcher)
    has[id] = true

    if(!pending) {
      // 这里我们使用 nextTick()
      nextTick(flushSchedulerQueue)
      pending = true
    }
  }
}
```

- 这样 用户想获取最新的DOM结果 我们可以让用户调用
- vm.$nextTick(() => {})

- 而我们底层实现用的是也是
- nextTick(flushSchedulerQueue)

- 这样不就统一了么
- 还有一个问题 那执行 nextTick 的顺序是什么? 用户的vm.nextTick()先执行 还是 底层的nextTick(flushSchedulerQueue) 先执行?

```js
// 如果是这样 那么用户是优先的 因为用户先调用的 然后才修改的属性 修改属性之后才会内部调用将清空队列的操作放到任务队列的逻辑

// 用户先
vm.$nextTick(() => {
  console.log(document.querySelector("#app").innerHTML)
})

// 内部后
vm.name = "laoye"

// ------

// 如果是这样 那么就是我们修改属性引起的内部nextTick先执行
// 内部先
vm.name = "laoye"

// 用户后
vm.$nextTick(() => {
  console.log(document.querySelector("#app").innerHTML)
})
```

- 其实我们就是希望 下面的两条逻辑**按顺序执行** 然后最终获取到最新的结果
```html
<!-- name: erin -->
<div>{{name}}</div> 

<script>
  vm.name = "sam"
  vm.nextTick(() => {
    console.log(#app.innerHTML)
  })
</script>
```

- 那不管我们 修改属性 内部调用的
- nextTick(flushSchedulerQueue)

- 还是我们用户手动调用的
- vm.nextTick(() => {})

- 是不是我们都 nextTick(cb) 传入了一个回调 而且底层也好用户也好我们调用的都是同一个nextTick的

- 既然想**按顺序执行** 那么我们将 cb 都push到一个队列中不就好了么(数组)

- 然后最后我们也对队列中的cb做一个批处理不就好了么(这里也是Vue里面的核心逻辑: **异步批处理: 弄个节流阀变量, 开个异步**)


> nextTick代码部分:
- 1. 将 cb 放到队列中
- 2. 使用节流阀的方式清空队列(里面用了setTimeout)


- 弹幕说 Vue中连setTimeout都重写了

```js
function queueWatcher(watcher) {
  const id = watcher.id
  // has对象中没有id 则忘队列中放
  if(!has[id]) {
    queue.push(watcher)
    has[id] = true

    if(!pending) {
      // 这里是内部使用 nextTick 将修改属性的watch推到队列中
      nextTick(flushSchedulerQueue)
      pending = true
    }

  }
}

// 将队列中的任务一个个的拿出来进行执行
function flushSchedulerQueue() {
  // 将 queue 拷贝一份
  let flushQueue = queue.slice(0)

  // 回初始化操作
  queue = []
  has = {}
  pending = false
  flushQueue.forEach(q => q.run()) 
}

---

// nextTick: 
// 回调的队列
let callbacks = []
let waiting = false

export function nextTick(cb) {
  callbacks.push(cb)

  if(!waiting) {
    // 利用 setTimeout 将逻辑拿到任务队列中执行
    setTimeout(flushCallbacks, 0)
    waiting = true
  }
}

function flushCallbacks() {
  let cbs = callbacks.splice(0)

  waiting = false  
  callbacks = []

  // 按照顺序依次执行
  cbs.forEach(cb => cb())
}
```

- 上面的操作我们 当我们在这样写的时候 nextTick() 就能获取到最新的DOM中的值了
```js
vm.name = "laoye"

vm.$nextTick(() => {
  console.log("用户的: ", document.querySelector("#app").innerHTML)
})  // laoye
```

- 而且当我们多次调用 nextTick 其实也不是相当于开了多个异步任务 而是将这些回调cb 放到了队列中维护起来了
```js
vm.name = "laoye"

vm.$nextTick(() => {
  console.log("用户的: ", document.querySelector("#app").innerHTML)
}) 

vm.$nextTick(() => {
  console.log("用户的: ", document.querySelector("#app").innerHTML)
}) 

vm.$nextTick(() => {
  console.log("用户的: ", document.querySelector("#app").innerHTML)
}) 
```

- 有人说 nextTick 一定是异步的
- 不对 nextTick不是创建了一个异步任务(开一个定时器或者promise), 是将异步任务维护到队列中 至于最后的flush队列只会开一个异步(setTimeout)来执行 

- 放到队列中是同步
- 开个定时器是异步

- nextTick有同步和异步两个部分


> Vue源码中的 nextTick (参考用 知道就行)
- Vue源码中 并没有使用 setTimeout (或者说没有直接使用哪个api) 而是采用优雅依次降级的方式
<!-- 
  定时器不是不行 而是执行速度比promise慢 我们期望的是能够尽快的看到页面刷新完成

  setTimeout开销大是单独的开了一个线程
  promise只是在代码执行完后插入了一个异步任务 性能好
-->

```js
export function nextTick(cb) {
  callbacks.push(cb)

  if(!waiting) {
    // 这里使用的并不是定时器
    setTimeout(flushCallbacks, 0)
    waiting = true
  }
}
```

- 它内部先采用的是 promise(ie不兼容) 既然promise不兼容 有个差不多的api mutationObserver  
- mutationObserver 和 promise 都是微任务
- mutationObserver 这个方法也是异步的
<!-- 
  mutationObserver是h5api只能在浏览器中跑
 -->

- 如果mutationObserver也不兼容可以考虑ie专享的 setImmediate (它的性能比setTimeout更好)

- 再继续降级的话 就使用了 setTimeout

- 也就是先看看支持不支持 promise 如果不支持就使用 mutationObserver 如果不行 ie专享setImmediate 如果还不行setTimeout

```js
// 这个要放在 主要逻辑 的下方 我们这里只是为了让你看的方便
export function nextTick(cb) {
  callbacks.push(cb)

  if(!waiting) {
    // 这里使用的并不是定时器 也不用传参
    timerFunc()
    waiting = true
  }
}

// 主要逻辑:
let timerFunc = null
if(Promise) {
  timerFunc = () => {
    // then的第一个回调
    Promise.resolve().then(flushCallbacks)
  }

} else if(MutationObserver) {
  // 这里传入的回调 是异步执行的 它可以监控某个dom元素
  let observer = new MutationObserver(flushCallbacks)

  // 创建一个文本 用于监视
  let textNode = document.createTextNode(1)

  // 等监控的数据发生变化的时候就会执行callback
  observer.observe(textNode, {
    // 监控的数据
    characterData: true
  })

  // 文本变了 就会执行 flushCallbacks 上面我们会调用timerFunc() 所以文本被修改了 然后触发了 mutationObserver回调
  timerFunc = () => {
    textNode.textContent = 2
  }

} else if(setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

- vue3中就没有用这些东西 上面只是为了兼容ie

----------------

### 数组更新实现原理
- 我们上面的逻辑中在组件初渲染的时候 会进行依赖收集 -- 模版中的变量会去 vm 身上取值 这时候 属性的dep 就会收集组件watcher 

- 之后如果模版中的 变量 有变动的时候 就会notify()更新组件
<!-- 
  初渲染的时候 就收集了变量对应的watcher
 -->

- 那模版中 {{arr}} 是一个数组 我们通过vm.arr[0]下标修改数组中的属性 可以监听的到么?

```js
new Vue({
  data: {
    arr: [1,2,3]
  }
})

arr[0] = 111     // 这样可以么？不可以
arr.length = 100 // 也不可以
```

- 不能, 因为只重写了数组的方法 数组中的基本类型的元素并没有劫持 同时也没有监听数组的长度变化 所以这两个操作是不会导致视图刷新的

- 我们能监控到的是方法
- arr.push(100)

- arr属性本身是有 get set 的, arr: (...)
- 如果我们 arr = [] 那是可以更新页面的 因为arr存的是地址值 当我们改变了地址值的时候 当然会触发更新

- 但arr.push(100)的操作改变的并不是arr属性(变量) 而改变的是真实的数组对象(实体) 实体本身是没有依赖收集的

- 所以我们就要对数组(堆空间中的实体)进行依赖的收集


- 我们看下 src/observe/index.js
```js
class Observer {
  // data 就是 options 中的 data
  constructor(data) {


    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false
    })

    ...
  }
}
```

- 循环对 data 配置项进行劫持操作的时候 如果值还是一个对象的话 那么我们会对对象再次进行劫持
```js
export function defineReactive(target, key, value) {
  // 继续劫持
  observe(value)

  ...
}
```

- 也就是说 constructor(data) 中的data 可能是个对象 也可能是个数组 所以我们想让 data 也能收集依赖
<!-- 
  这里面的data是 对象实体 或 数组实体
  堆空间里面的
 -->

- 所以我们想给实体data也加一个属性 dep 让其也能做依赖收集 我们给每个引用类型都增加收集

- 我们再看下这种情况
```html
<div>{{a}}</div>

<script>
  let vm = new Vue({
    data: {
      a: {a: 1}
    }
  })

  // 如果我们给a对象新增属性 页面会发生变化么
  vm.a.b = 1
</script>
```

- 不会发生变化 因为页面在渲染的时候只会对模版中存在的属性进行劫持 


> 给对象和数组设置dep的原因
- 所以我们给对象本身和数组本身都增加dep, 如果后续用户新增了属性可以触发dep更新 如果数组新增了某一项也可以触发dep更新


```js
class Observer {

  constructor(data) {

    // 给每个对象实体 或 数组实体 添加dep 也就是添加收集功能 
    this.dep = new Dep()
  
    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false
    })

    ...
  }
}

/*
  this 是实例对象吧
  new Observer() 会返回一个对象吧 这个对象 就是实体对象 还没有被变量接收 和 变量是分开的()

  变量     实体对象

  但是中间还没有用 = 相连 我们就是给 实体对象添加的 dep
*/
```

- this.dep = new Dep()
- initData(vm) 的时候 会判断data是函数还是对象 对其取到实体对象

- 然后会传入到 observe(data) 里面 对里面的属性进行劫持 

- 过程中 data中的属性还是对象的话 我们会做二次劫持

- 所以 this 就是这个 对象 和 数组 实体本身
- 我们给 this.dep = new Dep() 就相当于给对象 或 数组实体上添加了dep这个属性


- 之后当取值的时候 会走到这里 当第二次递归的时候 data 就是数组或对象 

- 这时候我们取得返回值 childOb 它身上就有dep属性 我们调用它的depend()方法 让其做依赖收集(记住渲染它的watcher)

```js
export function defineReactive(target, key, value) {

  // childOb身上就有一个dep属性在constructor里面添加的 childOb.dep 用来收集依赖
  let childOb = observe(value)

  let dep = new Dep()

  Object.defineProperty(target, key, { 
    get() {

      // 判断
      if(Dep.target) {
        // 让这个属性的收集器记住当前的watcher
        dep.depend()


        // 再取属性的时候 如果有childOb 说明是数组或对象
        if(childOb) {
          // 拿到它身上的dep 做依赖收集让其记住当前的watcher 让数组和对象本身也实现依赖收集
          childOb.dep.depend()
        }
      }

      return value
    },
    // 
    set(val) {
      if(val == value) return 
      observe(val)
      value = val

      dep.notify()
    }
  })
}
```

- 然后 src/observe/array.js
- 上面我们给数组和对象(实体本身)添加了dep 让其收集了watcher 然后当我们 arr.push(1) 的时候 就要通知watcher进行更新

- 比如以后我们给对象新增了属性的话 我也希望对象可以更新 为了后面的 $set

```js
methods.forEach(method => {
  newArrayProto[method] = function(...args) {
    const result = oldArrayProto[method].call(this, ...args)

    let inserted
    let ob = this.__ob__

    switch(method) {
      case "push":
      case "unshift":
        inserted = args
        break
      
      case "splice": 
        inserted = args.slice(2)
        break
    }

    if(inserted) {
      ob.observeArray(inserted)
    }

    // 走到这里需要更新页面 数组变化了通知对应的watcher实现更新逻辑
    ob.dep.notify()

    return result
  }
})
```


> 扩展: 对象添加属性后手动触发更新
```html
<div>{{a}}</div>

<script>
  let vm = new Vue({
    data: {
      a: {a: 1}
    }
  })


  // 我们都知道 这么改肯定是不会更新的
  vm.a.b = 100


  // 上面添加属性后 我们可以手动触发更新
  /*
    但是我们暴力点
    vm.a 找到 {} 对象实体
    我们增添一个属性 我就可以找到依赖(watcher)去更新组件
  */
  vm.a.__ob__.dep.notify()
</script>
```

- 上面就是$set的原理 找到对象实体身上的dep让它去通知更新


> 问题:
- 如果是二维数组
```html
<div>{{a}}</div>

<script>
  let vm = new Vue({
    data: {
      arr: [1, 2, 3, ["a", "b"]]
    }
  })

  // 二维数组的话 就不行了 页面没有变化
  vm.arr[3].push("c")
</script>
```

- 为什么页面没有变化?
- 因为我们只对最外层的实体数组添加了dep收集了watcher做了劫持 里层还没有管 所以我们要让里层的数组也做同样的依赖收集

```js
export function defineReactive(target, key, value) {

  // 这里调用 observe() 传入 value
  // observe(value) 上一个版本

  // childOb身上就有一个dep属性在constructor里面添加的 childOb.dep 用来收集依赖
  let childOb = observe(value)

  let dep = new Dep()

  Object.defineProperty(target, key, {
    // 取值: 
    get() {

      // 判断
      if(Dep.target) {
        // 让这个属性的收集器记住当前的watcher
        dep.depend()


        // 再取属性的时候 如果有childOb
        if(childOb) {
          // 拿到它身上的dep 做依赖收集让其记住当前的watcher 让数组和对象本身也实现依赖收集
          childOb.dep.depend()

          // 如果当前的值是数组
          if(Array.isArray(value)) {
            // 那我们就让数组再次的依赖收集 调用个递归方法
            dependArray(value)
          }
        }
      }
      return value
    },
    set(val) {
      if(val == value) return
      observe(val)
      value = val

      // 通知更新
      dep.notify()
    }
  })
}


// 递归给数组做劫持的方法
function dependArray(arr) {
  // 拿到里面的每一项 每一项都做依赖收集
  for(let i=0; i<arr.length; i++) {
    // arr[i]元素项 元素项身上都有__ob__ __ob__上有dep(ob就是this this身上有dep)
    arr[i].__ob__.dep.depend()

    // 如果里面还是数组
    if(Array.isArray(arr[i])) {
      dependArray(arr[i])
    }
  }
}
```

- 上述的代码告诉我们不要深层次的递归 递归多了性能就差 不存在的属性监控不到 存在的属性要重写方法 所以vue3采用了proxy

----------------

### mixin功能实现
- mixin:
- 混合, 可以混合一些公共方法和数据
- Vuex 和 路由都是基于 mixin 来实现的

- 当我们调用 
  Vue.mixin({配置对象}) 

- 的时候会将用户传入的配置对象 先合并到 Vue.options 上备用

- 比如:
```js
Vue.mixin({
  data() {
    return {
      xxx: 10000
    }
  }
})

const vm = new Vue({
  data: {
    name: "sam"
  }
})
```

- 这样每个组件在初始化的时候 都能混入 xxx 这个数据

> mixin的问题: 数据来源不明确
- 但是我们很少用它合并数据 如果我们光看 组件里面的data 的话不知道 xxx 是哪来的

- 我们一般会用它来扩展一些功能

- 比如:
```js
Vue.mixin({
  created() {
    console.log("mixin1-created")
  }
})

Vue.mixin({
  created() {
    console.log("mixin2-created")
  }
})

const vm = new Vue({
  data: {
    name: "sam"
  },
  created() {
    console.log("created")
  }
})


// 输出结果
mixin1-created
mixin2-created
created
```

- 我们看输出结果 会发现mixin是按照顺序依次执行 **它的内部会将多个created同名生命周期放到一个数组队列中 依次执行**

> created生命周期函数的位置
- Vue.options
- 是 Vue身上的静态属性 options

```js
// 我们可以打印
console.log(Vue.options)

// options 是一个对象
{
  components: {},
  created: [f,f],   // 生命周期被维护成数组
  directives: {},
  filters: {},
  _base: f
}
```

- 也就是 Vue会将生命周期的函 数维护成一个数组  


> 总结下:
- 当 mixin 中有多个生命周期的时候 会将生命周期维护成一个数组有几个生命周期就往数组里面放几个

- 这个模式就是 发布 与 订阅 模式
- 发布:
- 用户写在了mixin或者new Vue的配置项里面的时候 就是生命周期往 数组里推 就是发布的过程

- 订阅 当逻辑走到合适的位置的时候我们取出数组中的函数执行就是订阅的过程

- 我们现在 src/index.js 里面写 等后续还进行整理


> 回顾知识点:
- 1. 原型上的this指向的是实例对象
```js
Vue.prototype.xxx = function() {
  console.log(this)  // 实例对象
}
```

- 2. 静态方法中的this指向的是构造函数本身
```js
// xxx 是静态方法
Vue.xxx = function() {
  console.log(this)  // Vue
}
```

- 3. 静态方法 和 静态属性 只能通过 构造函数本身调用
```js
function Test() {
  this.name = "sam"
}

Test.age = 18
const t = new Test()


console.log(t.name)   // sam
console.log(t.age)    // undefined

console.log(Test.age) // 18
```

- 4. 通过实例拿到其构造函数 通过 vm 拿到 Vue
- **this.constructor**
- 我们就可以拿到 Vue 从而使用 Vue 身上的属性


> 扩展技巧:
- 合并对象 指定属性可以合并成数组

\\ 需求:
- 1. 先将options与test1进行合并
- 2. 然后将合并后的options和test2再次进行合并

- 如果test1 test2中都有 fn 则将options的fn其组织成一个数组 依次push进去

```js
let options = {}

let test1 = {
  name: "sam",
  age: 18,
  fn: function() {
    console.log("fn-sam")
  },
  say: function() {
    console.log("我是sam")
  }
}

let test2 = {
  name: "erin",
  job: "design",
  fn: function() {
    console.log("fn-erin")
  },
  say: function() {
    console.log("我是erin")
  }
}
```

> 阶段1:
```js
// 创建 合并对象 的方法
options = mergeOptions(options, test1)

function mergeOptions(prev, next) {
  let options = {}

  // 遍历 两个对象 这样相当于拿到了 两个对象中的 key value
  for(let key in prev) {

    想将 prev 中的属性合并到options中

  }

  for(let key in next) {

    再将 prev 中没有的属性合并到options中

  }


  // 我们将 合并到options中的逻辑 封装到一个方法中
  function mergeField(key) {
    options[key] = next[key] || prev[key]
  }
}


--- 完善上面的逻辑 ---


function mergeOptions(prev, next) {
  let options = {}

  for(let key in prev) {
    mergeField(key)
  }

  for(let key in next) {
    if(!prev.hasOwnProperty(key)) {
      mergeField(key)
    }
  }


  function mergeField(key) {
    // 以 新对象中的属性为准 有的话就放新对象的属性 没有再放旧的
    options[key] = next[key] || prev[key]
  }
  
  return options
}
```
- 但是 上面这样会有一个问题 就是 fn 的问题 如果新旧对象中都有fn 那么只放新对象中的fn 也就是 options中只有 新对象的fn 并不是[fn,fn]的形式

- 所以 mergeField() 方法中不能仅仅只是赋值的逻辑

```js
function mergeField(key) {
  if() {
    如果是指定的属性 则使用数组进行合并
  } else {
    如果不是指定的属性则默认
    options[key] = next[key] || prev[key]
  }
}
```

- 但如果我们这么判断 if(key == "fn") { ... } 那假如未来我们还要合并其他的属性 那这个函数中的if else就太多了 所以我们利用 策略模式来优化

---

- 我们的目的是: 当两个对象中 我们指定的函数名相同的时候 将 key 的值的类型组成一个数组
```js
let test1 = {
  fn: fucntion() {},
  say: function() {}
}

let test2 = {
  fn: fucntion() {},
  say: function() {}
}


// 目标
options: {
  fn: [f, f],
  say: [f, f]
}
```


> 实现逻辑:
- 1. 下面这个部分逻辑:
```js
let strats = {}
let targets = [
  "fn",
  "say"
]

targets.forEach(name => {
  strats[name] = function(p, n) {

  }
})
```

- 我们先组织一个策略对象 strats
- 然后定义我们想让什么属性对应的值的类型是数组 targets
- 然后我们变量 targets 数组将 strats 组织成如下的格式
```js
strats: {
  fn: () => {}
  say: () => {}
}
```

- 回调的作用用于完成真正的 策略逻辑

- 我们看看完整的代码部分:
```js
let strats = {}
let targets = [
  "fn",
  "say"
]


targets.forEach(name => {

  /*
    函数中接收到两个参数 p n 为
    fn的回调 和 say的回调
  */
  strats[name] = function(p, n) {

    // 第一次合并的时候 Vue.options 是空的 p没有值(空对象中哪有东西) 我们考虑n的情况
    if(n) {

      // 如果有 n 这里还有两种情况

      if(p) {
        
        // 到这里是就有 n p, 那就是说之前的options里面有该函数名 那该函数名对应的肯定是一个数组所以我们将n push到数组中
        return p.concat(n)

      } else {

        // 到这里就是 有 n 没 p, 那就是说之前的options里面没有 该函数名 那我们就将 n回调 包成一个数组 return出去 相当于 fn: [fn]
        return [n]
      }
    
    // 没 n 的情况 没有n的话 我们直接将 p return出去 将p回调 放到 options 对象中
    } else {
      return p
    }

  }
})

let options = {}

let test = {}

let test1 = {
  name: "sam",
  age: 18,
  fn: function() {
    console.log("fn-sam")
  },
  say: function() {
    console.log("我是sam")
  }
}

let test2 = {
  name: "erin",
  job: "design",
  fn: function() {
    console.log("fn-erin")
  },
  say: function() {
    console.log("我是erin")
  }
}

options = mergeOptions(test, test2)

// 创建合并选项的函数
function mergeOptions(prev, next) {
  let options = {}

  // 遍历 两个对象 这样相当于拿到了 两个对象中的 key value
  for(let key in prev) {
    mergeField(key)
  }

  for(let key in next) {
    // 这里我们要将 prev 没有合并的部分 合并
    if(!prev.hasOwnProperty(key)) {
      mergeField(key)
    }
  }

  // 我们就可以将 key value 放到 options 中 以next为准 (next中要是有就放next的) 我们将这部分操作也封装成一个方法
  function mergeField(key) {
    
    if(strats[key]) {
      // 函数调用会拿到返回值 返回值会放到options对象中 类似:[fn]
      options[key] = strats[key](prev[key], next[key])

    } else {
      options[key] = next[key] || prev[key]
    }
  }
  
  return options
}

console.log(options)

// 再次合并看看结果
options = mergeOptions(options, test1)
console.log(options)
```

--- 

- ok 上面铺垫完毕 其实下面的内容和上面铺垫是一个东西


> 正题:
- 我们的目的是 当我们使用 mixin 的时候 将 mixin({配置项}) 中的配置项 合并到 Vue.options 对象中
- 如果是生命周期的话 则将生命周期依次放入到数组中


**注意:**
- 1. Vue静态方法中的this指向Vue本身
```js
// 在 Vue 身上添加一个静态属性 options 和 静态方法 mixin
Vue.options = {}

// 参数: 用户在使用 mixin({}) 时候传进来的对象 
Vue.mixin = function(mixin) {

  // !!这里的this是 Vue 本身

  // 拿到 mixin 对象后 我们需要将 mixin对象 和 Vue.options 进行合并 产生一个新的对象
  this.options = mergeOptions(this.options, mixin)

  // 为了链式调用
  return this
}
```


- 位置:
- src/index.js

```js
// 策略: 策略中的才会合并成一个数组
const strats = {}
const lifecycle = [
  "beforeCreate",
  "created"
]

lifecycle.forEach(lifecycleName => {
  strats[lifecycleName] = function(p, n) {
    if(n) {
      
      if(p) {
        return p.concat(n)
      } else {
        return [n]
      }

    } else {
      return p
    }
  }
})


// 在 Vue 身上添加一个静态属性 options 和 静态方法 mixin
Vue.options = {}

// 参数: 用户在使用 mixin({}) 时候传进来的对象 
Vue.mixin = function(mixin) {

  // !!这里的this是 Vue 本身

  // 拿到 mixin 对象后 我们需要将 mixin对象 和 Vue.options 进行合并 产生一个新的对象
  this.options = mergeOptions(this.options, mixin)

  // 为了链式调用
  return this
}


function mergeOptions(preOptions, newOptions) {

  const options = {}

  // 我们观察下 之前 和 新的 如果有相同属性的话合并在一起 不同属性的话以新的为准
  for(let key in preOptions) {
    mergeField(key)
  }

  for(let key in newOptions) {
    // 所以这里我们合并 preOptions 没有的key 因为 preOptions 合并过了 这里就不用合并了
    if(!preOptions.hasOwnProperty(key)) {
      mergeField(key)
    }
  }


  function mergeField(key) {
    // 策略模式
    // 如果 key 是策略中有的走策略 没有走默认
    if(strats[key]) {
      // 调用 策略方法 目的是拿到返回值 [fn]
      options[key] = strats[key](preOptions[key], newOptions[key])
    } else {
      // newOptions中的优先因为要以新的为准
      options[key] = newOptions[key] || preOptions[key]
    }
  }

  return options
}
```

- 上面我们将使用 Vue.mixin({}) 的时候将传入的配置对象 和 Vue.options 合并在一起了

- 我们先将上面的 mixin 内容提取出来

    | - src
      - global.js

```js
// 策略
// 策略: 策略中的才会合并成一个数组
const strats = {}
const lifecycle = [
  "beforeCreate",
  "created"
]

lifecycle.forEach(lifecycleName => {
  strats[lifecycleName] = function(p, n) {
    // 第一次 Vue.options 是 {} 的
    if(n) {
      // 到这里还能进入if里面 说明 p有值 n有值 那么p肯定是一个数组
      if(p) {
        // p n都有的情况下 就将它们放在一个数组中
        return p.concat(n)

      // n有 但是p没有
      } else {
        // 将n包装成数组
        return [n]
      }

    // 没有 n 的话 就没有意义的 p爱是啥是啥
    } else {
      // 如果儿子没有则用父亲即可
      return p
    }
  }
})


// 工具函数 也可以提取到 utils 里面
export function mergeOptions(preOptions, newOptions) {
  const options = {}

  // 我们观察下 之前 和 新的 如果有相同属性的话合并在一起 不同属性的话以新的为准
  for(let key in preOptions) {
    mergeField(key)
  }

  for(let key in newOptions) {
    // 所以这里我们合并 preOptions 没有的key 因为 preOptions 合并过了 这里就不用合并了
    if(!preOptions.hasOwnProperty(key)) {
      mergeField(key)
    }
  }


  function mergeField(key) {
    // 策略模式
    // 如果 key 是策略中有的走策略 没有走默认
    if(strats[key]) {
      options[key] = strats[key](preOptions[key], newOptions[key])
    } else {
      // newOptions中的优先因为要以新的为准
      options[key] = newOptions[key] || preOptions[key]
    }
  }

  return options
}



export function initGlobal(Vue) {

  // 在 Vue 身上添加一个静态属性 options 和 静态方法 mixin
  Vue.options = {}

  // 参数: 用户在使用 mixin({}) 时候传进来的对象 
  Vue.mixin = function(mixin) {

    // !!这里的this是 Vue 本身

    // 拿到 mixin 对象后 我们需要将 mixin对象 和 Vue.options 进行合并 产生一个新的对象
    this.options = mergeOptions(this.options, mixin)
    
    // 为了链式调用
    return this
  }
}
```


```js
Vue.options = {}

Vue.mixin({
  created() {
    console.log("mixin-created")
  }
})

new Vue({
  created() {
    console.log("mixin-Vue")
  }
})
```

- 我们在new Vue的时候是不是也有一个 created 我们也应该将其合并吧
- 也就是 当我们调用 Vue.mixin() 的时候会将配置对象 合并到 Vue.options 中
- 然后当我们 组件初始化的时候 又会将new Vue({}) 传入的配置项 和 Vue.options中的合并 再次挂载到 vm 实例上

- src/init.js
```js
Vue.prototype._init = function(options) {

  const vm = this

  // 初始化的时候 将options放到Vue实例身上
  // vm.$options = options

  /*
    vm.constructor.options 拿到 Vue
  */
  vm.$options = mergeOptions(vm.constructor.options, options)

  /*
    我们定义的全局指令 和 过滤器都会挂载到实例上 每个实例都能访问到
    console.log(this.constructor.options)
    console.log(this.$options)
  */

  initState(vm)

  if(options.el) {
    vm.$mount(options.el)
  }
}
```

- 比如 我们想完成 created 生命周期的逻辑 那就直接这样
```js
Vue.prototype._init = function(options) {

  const vm = this
  vm.$options = mergeOptions(vm.constructor.options, options)


  // 拿到 created 然后执行就好了 下面才是初始化状态的逻辑
  vm.$options.created.forEach(fn => fn())


  initState(vm)
  if(options.el) {
    vm.$mount(options.el)
  }
}
```

- 那是不是说 我们写的生命周期 就是 $options 中的一个配置 它的类型是数组 我们只是在源码的某部分逻辑中 顺势执行它就好了


> 生命周期逻辑:
- src/lifecycle.js
```js
// 参数: 调用哪个实例上的哪个钩子 
export function callHook(vm, hook) {
  let handles = vm.$options[hook]

  if(handles) {
    // 注意: 生命周期中的钩子都是当前实例
    handles.forEach(handler => handler.call(vm))
  }
}
```

- src/init.js
```js
Vue.prototype._init = function(options) {
    const vm = this
    vm.$options = mergeOptions(vm.constructor.options, options)


    // 调用生命周期 src/lifecycle.js
    callHook(vm, "beforeCreate")

    // 初始化状态
    initState(vm)

    // 调用生命周期 src/lifecycle.js
    callHook(vm, "created")


    if(options.el) {
      vm.$mount(options.el)
    }
  }
```


> 主要文件:
- /src/index.js
```js
import { initGlobal } from "./global"
import {initMixin} from "./init"
import {initLifeCycle} from "./lifecycle"
import { nextTick } from "./observe/watcher"

function Vue(options) {
  this._init(options)
}

Vue.prototype.$nextTick = nextTick

initMixin(Vue)

// 给 vm 扩展生命周期的方法
initLifeCycle(Vue)

// 给 vm 扩展mixin的方法
initGlobal(Vue)


export default Vue
```


- /src/global.js
```js
// 策略
// 策略: 策略中的才会合并成一个数组
const strats = {}
const lifecycle = [
  "beforeCreate",
  "created"
]

lifecycle.forEach(lifecycleName => {
  strats[lifecycleName] = function(p, n) {
    // 第一次 Vue.options 是 {} 的
    if(n) {
      // 到这里还能进入if里面 说明 p有值 n有值 那么p肯定是一个数组
      if(p) {
        // p n都有的情况下 就将它们放在一个数组中
        return p.concat(n)

      // n有 但是p没有
      } else {
        // 将n包装成数组
        return [n]
      }

    // 没有 n 的话 就没有意义的 p爱是啥是啥
    } else {
      // 如果儿子没有则用父亲即可
      return p
    }
  }
})


// 工具函数 也可以提取到 utils 里面
export function mergeOptions(preOptions, newOptions) {
  const options = {}

  // 我们观察下 之前 和 新的 如果有相同属性的话合并在一起 不同属性的话以新的为准
  for(let key in preOptions) {
    mergeField(key)
  }

  for(let key in newOptions) {
    // 所以这里我们合并 preOptions 没有的key 因为 preOptions 合并过了 这里就不用合并了
    if(!preOptions.hasOwnProperty(key)) {
      mergeField(key)
    }
  }


  function mergeField(key) {
    // 策略模式
    // 如果 key 是策略中有的走策略 没有走默认
    if(strats[key]) {
      options[key] = strats[key](preOptions[key], newOptions[key])
    } else {
      // newOptions中的优先因为要以新的为准
      options[key] = newOptions[key] || preOptions[key]
    }
  }

  return options
}



export function initGlobal(Vue) {

  // 在 Vue 身上添加一个静态属性 options 和 静态方法 mixin
  Vue.options = {}

  // 参数: 用户在使用 mixin({}) 时候传进来的对象 
  Vue.mixin = function(mixin) {

    // !!这里的this是 Vue 本身

    // 拿到 mixin 对象后 我们需要将 mixin对象 和 Vue.options 进行合并 产生一个新的对象
    this.options = mergeOptions(this.options, mixin)
    
    // 为了链式调用
    return this
  }
}

```

- /src/init.js
```js
import { compileToFunction } from "./compiler"
import { mergeOptions } from "./global"
import { callHook, mountComponent } from "./lifecycle"
import { initState } from "./state"


// 定义给 Vue 添加功能的方法
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {

    // 将this保存起来 以后就使用vm了 构造函数中的this就是实例
    const vm = this

    // 初始化的时候 将options放到Vue实例身上
    // vm.$options = options


    /*
      为了完成 mixin 和 用户传入的配置项进行合并 我们这么做
        mixin会将mixin({options}) options和Vue.options 进行合并
        用户传入的options也要合并到Vue.options

        所以我们要拿到 Vue.options 和 用户传入的 options进行合并
        通过 this
    */
    vm.$options = mergeOptions(vm.constructor.options, options)

    /*
      一会组件初始化的时候 会将用户传入的配置项和Vue.options进行合并
      我们定义的全局指令 和 过滤器都会挂载到实例上 每个实例都能访问到

      Vue.mixin() 的时候 会将 mixin配置对象放到 Vue.options 中
      当创建组件 组件渲染的时候又会将 Vue.options 对象中的属性 再次合并到vm上
    */
    // console.log(this.constructor.options)
    // console.log(this.$options)


    // 调用生命周期 src/lifecycle.js
    callHook(vm, "beforeCreate")

    // 初始化状态
    initState(vm)

    callHook(vm, "created")


    // 如果 options.el 说明用户传入了el
    if(options.el) {
      // 传入el配置的话 我们就要挂载应用 我们调用$mount(el)传入el
      // 实现数据的挂载
      vm.$mount(options.el)
    }
  }

  // 给Vue扩展 $mount() 方法
  Vue.prototype.$mount = function(el) {
    // 这里我们也要保存this为vm 往实例上添加东西
    const vm = this
    el = document.querySelector(el)
    let opts = vm.$options

    /*
      首先看看有没有render 如果有render 那我们就不用管了 所以这部分的逻辑是在 if(!render) { } 的情况下完成的
    */
    // 如果没有render函数也没有写 template 配置项
    if(!opts.render) {

      // 进来就是没有render的情况 我们定义template接收模板内容
      let template

      // 没有 template配置项 但是有el配置项 那我们就直接获取DOM元素作为模板内容
      if(!opts.template && el) {
        template = el.outerHTML

      /*
        因为上面 &&短路运算 如果表达式1为false 则整体为false 走else的逻辑
        就是说else的逻辑: 如果有 template 配置项
      */
      } else {
        // 到这里就是用户写了template配置项 那么就用用户传递的template中的内容s
        // 这里老师写的是 if(el) 但我没用哈哈
        if(opts.template) {
          template = opts.template
        }
      }

      // console.log(template)

      // 如果有模板内容 我们再做模板编译的逻辑 将template编译成render
      if(template) {

        // 调用 compileToFunction() 方法将 模板内容编译成 render函数
        let render = compileToFunction(template)
        opts.render = render
      }
    }

    // 组件的挂载的方法 将 vm 挂载到 el 上
    mountComponent(vm, el)
  }
}
```

- /src/lifecycle.js
```js
import Wacher from "./observe/watcher"
import { createElementVnode, createTextVnode } from "./vdom"

// 组件的挂载
export function mountComponent(vm, el) {

  /*
    将 el 也挂载到 vm 上

    options中的el是选择器字符串 
    这个el是我们通过 querySelector 之后选择的 节点

    我们将这里节点挂载到了 实例 上
  */
  vm.$el = el

  // 1. 调用 render 方法 产生虚拟节点(DOM)
  // 2. 根据虚拟DOM产生真实DOM
  // 3. 插入到el元素中
  // vm._update(vm._render())

  // 将上面的逻辑封装到了 watcher 中我们通过watcher来进行调用
  const updateComponent = () => {
    vm._update(vm._render())
  }

  // debugger
  // 利用 Watcher来进行的更新组件的操作
  new Wacher(vm, updateComponent, true)
}


// 根据 vnode 创建真实的 元素
function createElm(vnode) {
  // 取出属性
  let {tag, data, children, text} = vnode

  // 说明 tag 是一个标签 (tag还可能是undefined 因为文本节点的时候只有text属性)
  if(typeof tag == "string") {
    /*
      vnode: {
        children: (2) [{…}, {…}]
        data: {id: 'app', style: {…}}

        el: div   // 多了 el 节点(真实的)

        key: undefined
        tag: "div"
        text: undefined
        vm: Vue
      }
      为了后面 实现diff算法 我们将创建好的元素 放在 vnode 上
      这里将真实节点 和 虚拟节点对应起来 后续如果修改属性了 我们可以直接找到 虚拟节点对应的真实节点(VDOM: vnode, TDOM: vnode.el), 来修改属性 所以虚拟节点上会挂载着真实节点
    */
    vnode.el = document.createElement(tag)


    // 处理属性: 更新 vode.el 元素的 data属性(data是标签属性)
    patchProps(vnode.el, data)


    // 处理子节点:
    children.forEach(child => {
      // 将 child(子标签 子节点) 也创建成真实节点 将子节点放入到它的父节点中 也相当于给 el添加内容
      vnode.el.appendChild(createElm(child))
    })

  } else {
    // 如果 tag 不是字符串 我们就要创建文本节点 同样也要挂载到虚拟节点上
    vnode.el = document.createTextNode(text)
  }

  // console.log(vnode)
  // 返回真实元素
  return vnode.el
}


// 处理标签属性的方法
function patchProps(el, props) {
  // 将属性循环一遍赋值到元素上
  for(let key in props) {

    // 如果 key 是 style
    if(key == "style") {
      /*
        标签上的 style 是这么写的  style = "color:red"

        我们的props里面的style属性是
        style: {background: 'pink', width: '100px'}
      */
      for(let styleName in props[key]) {
        el.style[styleName] = props[key][styleName]
      }
    } else {
      el.setAttribute(key, props[key])
    }
    
  }
}


// 初始化 和 更新 节点的功能
function patch(oldVnode, vnode) {

  // 判断 oldVnode 是否是真实dom元素
  const isRealElement = oldVnode.nodeType

  // 如果是则为: 初渲染流程
  if(isRealElement) {

    // 给 oldVnode 换个名字 在初渲染的逻辑中 也好理解 初渲染的时候 el 是一个真实的元素
    const el = oldVnode

    // 获取它的父元素
    const parentEl = el.parentNode  // body
    
    // 创建真实元素
    let newELm = createElm(vnode)

    // 将 newELm 插入到老节点的下面
    parentEl.insertBefore(newELm, el.nextSibling)

    // 删除老节点
    parentEl.removeChild(el)

    // 我们让 patch() 方法有返回值 将 newElm 返回出去
    return newELm

    
  } else {
    // diff算法
  }
}

export function initLifeCycle(Vue) {
  // 将 vnode 转换成 真实dom
  Vue.prototype._update = function(vnode) {

    // 获取 el 
    const vm = this
    const el = vm.$el
    // 该方法既有初始化的功能 也有更新的功能 我们将patch()返回的真实节点 更新 $el 上的节点
    vm.$el = patch(el, vnode)

  }


  // _c("div", {}, 很多children) 
  Vue.prototype._c = function() {
    // this就是vm
    return createElementVnode(this, ...arguments)
  }


  // _v(text)
  Vue.prototype._v = function() {
    return createTextVnode(this, ...arguments)
  }


  // 将 _s() 包裹的值转成字符串(变量 -> 数据之后转成字符串吧)
  Vue.prototype._s = function(val) {

    // 判断下 val 的类型 只有val为对象的时候 我们再进行 JSON.stringify(val)
    if(typeof val != "object") return val
    
    return JSON.stringify(val)
  } 

  Vue.prototype._render = function() {
    
    let vm = this

    // vm.$options.render() 是通过 ast语法树转义后生成的render方法
    // 因为使用 with() 包装的 让with的this指向vm
    let vnode = vm.$options.render.call(vm)

    return vnode
  } 
}

// 参数: 调用哪个实例上的哪个钩子 
export function callHook(vm, hook) {
  let handles = vm.$options[hook]
  if(handles) {
    // 注意: 生命周期中的钩子都是当前实例
    handles.forEach(handler => handler.call(vm))
  }
}
```

----------------

### 计算属性
- 根据其它响应式的值计算出来的结果
- 只有当依赖的值发生变化才会重新执行用户的方法 比如下面的案例中 fullname() 就是用户传递进来的方法

- 函数式的情况下 直接就是get
- 对象式的情况下 我们需要从fullname对象中取get()

```html
<div id="app">
  {{fullname}} {{fullname}} {{fullname}}
</div>

<script>
  const vm = new Vue({
    el: "#app",
    data: {
      firstname: "sam",
      lastname: "liu"
    },

    computed: {
      // 函数式写法: defineProperty中的get方法
      fullname() {
        return this.firstname + this.lastname
      },

      // 对象式写法:
      fullname: {
        get() {
          console.log("run")
        },
        set(val) {}
      }
    }
  })
</script>
```


> 计算属性特点1: **具备缓存**
- 我们页面上多次调用 fullname run也只跑了一次
- 也就是说 get() 方法中的所依赖的数据不发生变化 get()方法并不会重新执行

- 在计算属性中有一个脏值检测的功能 它会去监测依赖值有没有被修改 如果被修改了会标记为脏(默认为脏 因为要执行一次)
  this.firstname
  this.lastname

- 这两个值有没有变脏(有没有被修改) 
- 如果被修改过 fullname 就会重新计算 

- 验证:
- 如果html模版中不使用 fullname 变量则run一次也不会执行 因为依赖的值发生变化才会重新执行用户的方法


> 那怎么知道依赖的值有没有变呢?
- 计算属性整体的逻辑中要维护一个 dirty 属性 (是否是脏的, 在计算属性watcher里)
- 通过在对应的逻辑中修改该属性 来决定是走缓存还是重新走getter

---

> 计算属性特点2: **计算属性就是一个 defineProperty**
- 我们会将 计算属性 通过defineProperty定义到 vm 身上
- 相当于 vm.计算属性 该属性有 getter 和 setter

---

> 计算属性特点3: **计算属性也是一个watcher**
- 我们之前说过默认渲染的时候会创建一个 渲染watcher
- 现在我们现在接触到了第二种watcher 计算属性watcher

- 在组件渲染的时候我们会创建一个 渲染watcher
- 在页面渲染的过程中还有一个 当读到 fullname 的时候也会创建 计算属性watcher
<!-- 
    渲染watcher
    --------------------

      ----------------
       计算属性watcher

       firstname  dep - 收集 计算属性watcher
       lastname   dep - 收集 计算属性watcher
      ----------------

    --------------------
 -->

- 那在 计算属性watcher中 使用的值 是不是就会被依赖收集起来 计算属性watcher中会取值
- 页面中使用fullname fullname会取 firstname 和 lastname 你说这里是不是相当于

  {{fullname}} -> {{firstname + lastname}} 这时候就会进行这两个属性的依赖收集

- firstname lastname 在计算属性 watcher 里
- 它们也会有dep属性 dep会收集自己的watcher 它们收集的计算属性的watcher
- 因为我们将 watcher 都推到了 stack 栈中 [渲染watcher,计算属性watcher]

- *当我们修改 firstname lastname 只会更新计算属性的dirty属性 并不会重新渲染* 渲染watcher

- 那怎么在修改 firstname lastname 的时候重新渲染页面呢?
- 我们当前的 计算属性 是在渲染watcher里面使用
- 那我们就可以考虑让 firstname lastname 的dep除了记住自己的计算属性watcher之外 还要记住上一层的渲染watcher

- 这样等属性更新了 会通知计算属性更新 并且重新渲染页面 有嵌套关系了 
- watcher最开是渲染的时候肯定是先渲染 渲染watcher 然后又会产生计算属性watcher


> 改造 src/observe/dep.js
- 我们先给 dep 增加两个方法

> pushTarget(watcher)
- 在渲染的时候 我们会将 watcher 入栈(第一次的时候是渲染watcher 当页面有计算属性的时候 会推入计算属性watcher)

> popTarget()
- 在渲染完后 会将 watcher出栈 并且清空


- 每当我们 new Watcher(vm, fn options) 的之后会执行 fn
- 在执行 fn 的前后 我们会做 将 watcher 压入栈 fn执行完后 将 watcher 弹出栈 的操作

- 这个watcher栈 就是在dep中维护的

> 1. 这里面看 每次入栈后 都会改变 Dep.target 的值
- 也就是说 每次我们new Watcher之后 Dep.target 上的值就是最新类型的watcher
```js
// dep.js
...

// 静态属性
Dep.target = null


// watcher栈
let stack = []
 
// 参数: 要传递进来 watcher 
// 渲染的时候入栈
export function pushTarget(watcher) {
  // 将传递进来的watcher 放到stack中
  stack.push(watcher)

  // 调用该方法会给 Dep.target 赋值
  Dep.target = watcher
}


// 渲染结束会出栈
export function popTarget() {
  // 删掉栈顶的watcher
  stack.pop()

  // Dep.target 指向最后一个为空(undefind)
  Dep.target = stack[stack.length - 1]
}
```

- 上面这两个方法会被封装到一个方法中
- 也就是 入栈 - 执行结束 - 出栈
```js
get() {
  入栈: pushTarget()
  执行: fn回调
  出栈: popTarget()
}
```


> 改造 src/observe/watcher.js
```js
class Watcher {
  get() {
    /*
      Dep.target = this
      this.getter()
      Dep.target = null
    */

    // 将上面的形式改造成
    pushTarget(this)
    this.getter()
    popTarget()
  }
}
```

- 本质上和之前的一样 只不过我们上面的改造是 将 watcher 维护成的一个栈

- 渲染组件的时候 watcher 会添加到 dep 中的 watcher栈(stack)
- 渲染组件结束的时候 会将wacher弹出栈(相当于Dep.target = null)

---

> 计算属性的逻辑
- 我们在new Vue({}) 会传入配置项
- 然后我们会在 init() 方法中调用 initState(vm) 来初始化状态

- 之前我们就初始化了 data 配置项 那要初始化的状态都有什么? 
- 还有 计算属性 和 watch


- 我们看看 initState() 
```js
import { observe } from "./observe/index.js"
export function initState(vm) {

  let opts = vm.$options
  if(opts.data) {
    initData(vm)
  }


  // 如果有计算属性 我们就初始化计算属性
  if(opts.computed) {
    initComputed(vm)
  }

}

// 初始化 计算属性
function initComputed(vm) {

}
```


  nwe Vue() -- init() -- initState() -- initComputed()


> initComputed(vm)中
- 1. 我们要获取用户输入的computed配置项 可以从vm.$options获取
- 2. 计算属性有两种写法 函数 和 对象
```js
// computed是对象
computed: {
  // 1
  fullname() {},

  // 2
  fullename: {
    get() {},
    set() {}
  }
}
```

- computed 是个对象
  key: 计算属性名
  value: 函数 | 对象

- 函数相当于只有 get 
- 对象有set get


- 3. 然后我们将用户定义的计算属性(key) 使用Object.defineProperty定义到vm上

```js
function initComputed(vm) {
  const computed = vm.$options.computed
  
  // 遍历 computed 对象
  for(let key in computed) {
    // fullname: {} or function 拿到value的部分
    let userDef = computed[key]

    /*
      将计算属性 fullname 定义在 vm 上
      同时 配置 该计算属性的 get set 
    */
    defineComputed(vm, key, userDef)
  }
}


// 给target定义属性
function defineComputed(target, key, userDef) {

  // userDef就是函数或者是对象 我们要进行判断取出 get()
  const getter = typeof userDef == "function" ? userDef : userDef.get
  const setter = userDef.set || (() => {})


  // 这样可以通过 实例拿到对应的属性
  Object.defineProperty(target, key, {
    get: getter,
    set: setter
  })
}
```

- 总结下:
- 上面我们在模版中使用了 计算属性 fullname
- fullname会被 Object.defineProperty 定义在 vm 上
- 当 模版中使用了 {{fullname}} 的时候相当于走了 Object.defineProperty中的get()方法 也就是拿到了 

  return this.firstname + this.lastname

- 也相当于页面上是 {{firstname + lastname}} 
- 既然在 模版上 出现了这样 也就是说这两个属性(在没有计算属性watcher的前提下) 收集的是渲染watcher
<!-- 
  页面模版在读值的时候就会走 defineReactive() 的 get()
  然后会 dep.depend() 收集 watcher
 -->

- 所以我们更新 firstname 或 lastname 的时候 会更新组件

---

> 解决性能问题:
- 上面这么写 也会完成计算属性的功能 但是性能上会有问题 
```js
<div id="app">
  {{fullname}} {{fullname}} {{fullname}}
</div>

fullname: {
  get() {
    console.log("run")  // 这里会有3次
    return this.firstname + this.lastname
  }
}
```

- 所以我们需要加缓存
- 但是加缓存就需要有依赖关系 计算属性也要有一个watcher


> 定义计算属性 watcher

> 1. 初始化计算属性的时候 创建计算属性watcher
- 我们还是看 initComputed() 方法
```js
function initComputed(vm) {
  const computed = vm.$options.computed

  // 用于记录哪个属性的watcher 同时保存到实例是方便调用
  const watchers = vm._computedWatchers = {}
  
  for(let key in computed) {
    let userDef = computed[key]

    // 定义 计算属性 watcher 并传入 fn
    let fn = typeof userDef == "function" ? userDef : userDef.get
    watchers[key] = new Wacher(vm, fn, {lazy: true})


    // 将计算属性放到vm上
    defineComputed(vm, key, userDef)
  }
}
```

- 我们在 initComputed(vm) 方法中 我们创建 计算属性watcher
- 我们会将每一个计算属性 和 创建的计算属性watcher 一一对应放到 watchers 对象中(同时这一一对应的关系也会放在vm实例身上 vm._computedWatchers)
```js
const watchers = vm._computedWatchers = {}
↑
计算属性: watcher
```

- 我们会遍历 computed 对象, 将所有的计算属性 定义在vm实例上 和 创建了计算属性watcher

- 我们在 new Watcher() 的时候会传入
  - fn:
  - 用户在写计算属性的时候会传入指定的 getter 方法
  - return this.firstname + this.lastname

  - vm:
  - Watcher类中的this 指向的是 watcher实例
  - 我们传入的fn会被调用 比如 this.getter()
  <!-- 
    this.getter = function() {
      return this.firstname + this.lastname
    }
  -->

  - 那方法中的this是谁? 所以为了绑定我们还是从 vm 身上取值 我们要将vm也传入 通过
  - this.getter.call(this.vm)
  - 的方式 修改 getter() 方法中的this 让其**取值的时候仍然从vm身上取**


> 2. 修改下 Watcher 类中的相关逻辑
- src/observe/watcher.js

```js
class Wacher {
  constructor(vm, fn, options) {
    this.id = id++
    this.renderWatcher = options
    this.getter = fn

    this.deps = []
    this.depsId = new Set()


    // 获取 options 中的值保存在变量中
    this.lazy = options.lazy

    // 计算属性会使用 dirty 作为缓存值 默认lazy为true dirty就为true
    this.dirty = this.lazy

    // lazy: false 的时候 才会立即执行 fn, 为 true 的时候 我们不要执行默认的渲染fn
    this.lazy ? undefined : this.get()

    // 初渲染 先调用一次
    // this.get()
  }

  get() {
    pushTarget(this)
    this.getter()
    popTarget()
  }
}
```

- this.lazy:
- 用于判断
  1. 判断是否需要在 new Watcher 的同时执行 fn回调
  2. 判断watcher是否是计算属性watcher
- Watcher 类可以创建多种类型的wacher 如渲染watcher 和 计算属性watcher
- 计算属性watcher不需要在 new Watcher() 类的时候执行 而渲染watcher需要 所以根据该属性 我们来区分是哪种watcher 和 渲染watcher需要在构造器中直接执行

- this.dirty:
- 默认值为true
- 用于标识是否需要重新计算


- 我们先看下部分的逻辑
- 当模版中使用了 {{fullname}} 的时候 会从vm身上读值 读值就会调用 计算属性中的get方法 get()方法又会执行
```js
pushTarget(this)
let value = this.getter()
popTarget()
```

- pushTarget(this)
- 会将计算属性的watcher也放到栈中 因为先渲染会先放入渲染watcher 我们在页面上使用了计算属性 这时又创建了一个 计算属性watcher

[渲染watcher,计算属性watcher]

---

```html
<div>{{fullname}}</div>

<script>
  // 当模版中使用了 计算属性 fullname 就应该调用 get()
  computed: {
    fullname() {
      return this.firstname + this.lastname
    }
  }
</script>
```

- 我们怎么调用 fullname() 方法呢
- 我们上面的操作中 我们将 watcher 放到了 watchers 对象中
```js
function initComputed(vm) {
  const computed = vm.$options.computed

  // 用于记录哪个属性的watcher 同时放在 vm 上方便调用
  const watchers = vm._computedWatchers = {}
  
    ...

    // 将属性和 watcher 对应起来
    watchers[key] = new Wacher(vm, fn, {lazy: true})

    ...
  }
}
```

- 同时我们将 fullname 使用 defineProperty 绑定到了 vm 身上 当我们 也就是在取值的时候肯定会走 get()
```js
function defineComputed(target, key, userDef) {

  const getter = typeof userDef == "function" ? userDef : userDef.get
  const setter = userDef.set || (() => {})
  
  Object.defineProperty(target, key, {
    // 会走这里是么
    get: getter,
    set: setter
  })
}
```

- 现在页面上如果多次使用 fullname 就会走多次的get() 这样有性能问题 所以 我们不能直接走 get() -- getter

- 也是将 getter 先包装一下 是走getter执行 还是不走
```js
function defineComputed(target, key, userDef) {

  // 用不到
  // const getter = typeof userDef == "function" ? userDef : userDef.get
  const setter = userDef.set || (() => {})
  
  Object.defineProperty(target, key, {
    // 包装一下
    get: createComputedGetter(key),
    set: setter
  })
}
```

- 我们能看到 我们将 const getter 部分的逻辑注释掉了 因为用不到了
- 在创建 计算属性watcher 的时候我们将 用户指定的计算属性getter 已经传到 watcher 里面了 fn 就是 在调用的时候 我们也是通过 watcher 对象中的方法来调用


> createComputedGetter(key)
- 我们定义了该方法 用于返回一个getter函数 说白了就是将getter函数包裹了一层
```js
function createComputedGetter(key) {

  // 需要返回一个函数 作为get()的回调
  return function() { ... }
}
```

- 在这里 我们判断下 dirty 是否为脏 如果为脏的时候 我们通过watcher对象调用重新计算(fn)的逻辑

> 问题: 怎么拿到 dirty?
- dirty我们定义在了 watcher 对象中 我们要拿到watcher对象
- 每一个计算属性都有一个对应watcher对象 被维护在了 vm._computedWatchers 上

- 所以我们可以根据 key 拿到计算属性对应的 watcher
- 因为get的回调中的this就是target, 所以 this == vm

- 那我们就可以获取 watcher 
- watcher = this._computedWatchers[key] 

- 拿到 watcher 后我们就可以获取到 dirty
- 只有 dirty 为脏的的时候 我们再通过 watcher对象执行 用户传入的指定get回调

```js
// 将计算属性定义在 vm 上
function defineComputed(target, key, userDef) {

  const setter = userDef.set || (() => {})
  
  Object.defineProperty(target, key, {
    // 获取包裹后的getter方法
    get: createComputedGetter(key),
    set: setter
  })
}

function createComputedGetter(key) {

  return function() {
    let watcher = this._computedWatchers[key] 

    if(watcher.dirty) {
      // 如果为true(默认就是被修改的) 我们应该实行用户传入的getter
      watcher.evaluate()
    }

    // 在调用evaluate()后会将 getter的返回值放在 watcher.value 上
    return watcher.value
  }
}
```

> watcher.evaluate()
- 位置: /src/observe/watcher.js

- 该方法内部调用了 get()
- get() -- getter() 方法中会调用用户指定的getter函数 
<!-- 
  return this.firstname + this.lastname
 -->

- 所以getter()会有返回值 我们获取到返回值 将返回值挂载到watcher上
- 同时标记 dirty 为false

```js
get() {
  pushTarget(this)
  let value = this.getter.call(this.vm)
  popTarget()
  return value
}


evaluate() {
  this.value = this.get()
  // 标识为脏
  this.dirty = false
}
```

> 部分逻辑:
- 也就是说 页面初渲染的时候 会执行 new Watcher 会将渲染watcher推到 stack 栈中 一旦页面中有计算属性, 读计算属性 就会触发 计算属性的defineProperty中的get()
- get() 中会判断 计算属性中的watcher的 dirty 属性是否为 true 

  如果为true: 通过 watcher 调用 evaluate() 执行
    **将计算属性watcher压入栈 - 执行用户指定的fn回调 - 将计算属性watcher弹出栈 - 将fn回调的返回值(计算属性方法的返回值)挂载到watcher上缓存 - 将 dirty 标识为false**

  如果为false: **直接返回 watcher 上缓存起来的值**

---

- 上面我们解决了 性能方面的问题 也就是当多次使用 只会走一次 会走缓存
  {{fullname}} {{fullname}} {{fullname}}

- 也就是说 计算属性watcher 只干了 将 dirty 变为false的操作 并没有重新渲染的逻辑 那我们修改了计算属性的依赖项 怎么重新渲染页面呢

- 但是还有一个问题 我们先捋下逻辑:
- 组件渲染会走渲染watcher, 会将渲染watcher放到 stack 中 之后我们在渲染watcher中取值了 取了{{fullname}}
<!-- 
    渲染watcher
    --------------------
      {{fullname}}
    --------------------

 -->

- 只要一取 fullname 的值就会走 watcher 中的
```js
get() {
  // 将 计算属性watcher 放进stack
  pushTarget(this)

  // 去vm身上取值
  let value = this.getter.call(this)
  popTarget()

  return value
}
```

- 取值的时候会将 计算属性watcher 放进stack 然后去vm身上取值
- 取值会取 firstname 和 lastname 这两个属性都会有自己的dep

- 我们想想 这两个dep 收集的是谁?
- 第一次渲染组件的时候 会先走渲染watcher 渲染watcher在渲染的时候需要取值 取值的时候就会走 get() 方法 将渲染watcher放到的stack中 然后模版中用到了计算属性fullname 第二次再执行的时候又会将计算属性watcher放到stack中

- 而 firstname 和 lastname 收集的是 计算属性watcher
- 因为会将 [渲染watcher,计算属性watcher] 中的计算属性赋值到 Dep.target 上

- 因为 pushTarget(this) 方法中 除了将watcher放到stack中还会将 watcher放到 Dep.target 上

```js
export function pushTarget(watcher) {
  stack.push(watcher)
  Dep.target = watcher
}
```

- 因为计算属性watcher在渲染watcher后面执行 所以Dep.target上计算属性watcher
- 所以 firstname 和 lastname 收集的是计算属性watcher
<!-- 
  Dep.target.addDep(this) - dep.addSub(this) 这个动作收集的就是 计算属性watcher
 -->

<!-- 
    渲染watcher
    ---------------------------

      {{fullname}}
      ------------------
      computed watcher
      {{firstname}} - dep
      {{lastname}}  - dep 
      ------------------

    ---------------------------

  stack: 
    [渲染watcher,计算属性watcher]
 -->

- 那问题来了 我们更新 firstname lastname 值的时候 会走哪呢?
```js
setTimeout(() => {
  vm.firstname = "hello"
})
```

- 会执行计算属性watcher更新操作 因为 firstname lastname **收集了计算属性watcher**
- 走取值操作的时候会走 defineReactive() 中的get() 会将watcher收集到 dep中的 subs数组中

- 当我们修改了 firstname 的值 会进入到defineReactive()中的set() 也就是走了 dep.notify()
- 这时候就会 取出 subs[] 中所有的watcher来执行 watcher.update()

```js
export function defineReactive(target, key, value) {
  
  let childOb = observe(value)
  let dep = new Dep()

  Object.defineProperty(target, key, {

    ... 

    // 修改值会走这里
    set(val) {
      if(val == value) return
      observe(val)
      value = val

      // 通知更新
      dep.notify()
    }
  })
}
```

- dep.notify() 而这里**拿出的都是计算属性watcher**

- 但是 dep.notify() 会走到
```js
notify() {
  // 让自己身上存的所有watcher 让watcher做更新操作
  this.subs.forEach(watcher => watcher.update())
}
```

- 然后循环会走 watcher的 update()
```js
update() {
  queueWatcher(this)
}
```

- watcher的update()会将计算属性watcher放到队列中 计算属性watcher是不会导致页面更新的 

- 所以我们要修改 watcher.js 中的update()
```js
// 修改模版中依赖的属性 会触发更新操作
update() {

  // 更新前判断 如果是lazy说明是计算属性
  if(this.lazy) {
    // 依赖值发现变化了 标识计算属性是脏值
    this.dirty = true
  } else {
    // 为了完成修改多个属性后统一渲染一次 我们将 watcher 放入到队列中 将当前的watcher暂存起来
    queueWatcher(this)
  }
}
```

- 我们说了当我们更新了计算属性的依赖的时候 我们需要将 dirty 再次改为 true 这样就可以了
- 然后这时候 计算属性watcher就出栈了 栈中就只有渲染watcher了 当我们再次执行 update() 方法的时候 就会走 else 逻辑了

---

- 然后我们需要再看一眼 如果计算属性在页面中使用了 我们需要将计算属性依赖的变量 也记住外层的watcher(渲染watcher)
- 也就是说 firstname lastname 不仅仅要记住计算属性watcher 还需要记住渲染watcher

- 我们看看 state.js 
```js
function createComputedGetter(key) {
  return function() {
    let watcher = this._computedWatchers[key] 

    if(watcher.dirty) {
      // 执行 计算属性的 fn 回调
      watcher.evaluate()
    }

    return watcher.value
  }
}


// watcher.js
evaluate() {
  this.value = this.get()
  this.dirty = false
}

get() {
  pushTarget(this)
  let value = this.getter.call(this.vm)
  popTarget()
  return value
}
```

- 我们发现当执行完 evaluate() 后 计算属性watcher就出栈了
```js
[渲染watcher,计算属性watcher]
 ↓
[渲染watcher]
```

- 计算属性出栈后 我们要让 firstname lastname 记住渲染watcher

- state.js
```js
// 我们需要检查是否需要执行这个getter
function createComputedGetter(key) {
  return function() {
    let watcher = this._computedWatchers[key] 

    if(watcher.dirty) {
      watcher.evaluate()
    }

    // watcher.evaluate() 执行后计算属性会出栈 如果Dep.target还有值 说明还有渲染watcher
    if(Dep.target) {
      // 让计算属性watcher里面的属性 也去收集渲染watcher(上层watcher)
      watcher.depend()
    }

    return watcher.value
  }
}
```

- watcher.js
```js
depend() {
  // 我们拿到存放的所有dep 这里我们要使用dep
  let i = this.deps.length
  while(i--) {
    // dep收集watcher会有对应的depend方法 让计算属性watcher也收集渲染watcher
    this.deps[i].depend()
  }
}
```

- watcher.depend()
  - 它会拿到 deps 中的所有dep 执行 dep.depend()

- dep.depend()
  - 它会调用 watcher.addDep(this)

- watcher.addDep(this)
  - 它会拿到 dep(this) 让dep保存到watcher的deps数组中 然后回调用 dep.addSub(this)

- dep.addSub(this)
  - 将传过来的watcher放到dep中的subs数组中

- 这是让 计算属性的依赖数据 收集渲染watcher的过程

- 这样的话 我们修改了 计算属性依赖的数据就会走 dedefineReactive() 的 set() 执行 dep.notify()

- 当计算属性逻辑执行完毕后会出栈 这时候的watcher就是渲染watcher
- 也就是说 计算属性.watcher 将 dirty 标识为 true
- 之后开始走 渲染watcher.update()

- 两个watcher都会执行

- dep.notify() 就会拿到watcher 开始循环watcher.update() 更新组件

------

> 再捋一遍
- 第一次渲染的时候 有一个stack 先放渲染watcher 渲染watcher在渲染的时候会取计算属性 所以栈中还会有计算属性watcher
[渲染watcher,计算属性watcher]

- 只要一取计算属性就会走到 get() -- 
```js
if(watcher.dirty) {
  watcher.evaluate()
}
```

- 执行watcher.evaluate()的时候会将当前的计算属性 挂载到 Dep.target 上 然后执行用户传入的指定getter回调 
<!-- 
  return this.firstname + this.lastname
 -->

- 然后就会取到这两个值 这两个值都有dep dep会去收集计算属性watcher

- 这时候这个阶段 如果我们改了 firstname 会通知计算属性watcher 并不会重新渲染组件 只是更新了计算属性的dirty 让值变成了true 就没了

- 所以我们要 watcher.evaluate() 执行完后 需要让firstname lastname记住渲染watcher 我们还需要重新渲染

- 所以我们添加了下面的逻辑
```js
if(watcher.dirty) {
  watcher.evaluate()
}

if(Dep.target) {
  watcher.depend()
}
```

- 因为求值完后(watcher.evaluate()执行完后) 计算属性watcher会弹出栈 弹出栈后 Dep.target = 渲染watcher

- 然后我们让 firstname lastname 记住渲染watcher调用了 watcher的depend()

- 也就是这两个属性的dep里面存了两种watcher 等firstname的值变化了 它会先将 dirty 标识为脏 再重新渲染的话 就会发生取值 一取值就会又走到 get() 方法 执行用户传入的指定回调 重新取值

------


> 发现:
- 计算属性根本不会收集依赖 只会让自己的依赖属性去收集依赖 这里和vue3不太一样


> 这个部分的代码
- src/obsreve/dep.js
```js
let id = 0

class Dep {
  constructor() {
    this.id = id++
    this.subs = []
  }
  depend() {
    Dep.target.addDep(this)
  }

  addSub(watcher) {
    this.subs.push(watcher)
  }

  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
Dep.target = null


// watcher栈
let stack = []
 
// 参数: 要传递进来 watcher 
export function pushTarget(watcher) {
  // 将传递进来的watcher 放到stack中
  stack.push(watcher)

  // 调用该方法会给 Dep.target 赋值
  Dep.target = watcher
}

// 渲染结束后清空 Dep.target
export function popTarget() {
  // 删掉栈顶的watcher
  stack.pop()

  // Dep.target = null 在没有其他类型的watcher时 stack[stack.length - 1]为undefined
  Dep.target = stack[stack.length - 1]
}

export default Dep
```

- src/observe/watcher.js
```js
import Dep, { popTarget, pushTarget } from "./dep"

let id = 0
class Wacher {
  constructor(vm, fn, options) {
    this.id = id++
    this.renderWatcher = options
    this.getter = fn
    this.deps = []
    this.depsId = new Set()


    // 拿到传入的lazy
    this.lazy = options.lazy
    // 计算属性会使用 dirty 作为缓存值 默认lazy为true dirty就为true
    this.dirty = this.lazy

    // this.lazy为true我们啥都不管 只有不为true的时候我们new Watcher的时候才调用更新组件的方法
    this.lazy ? undefined : this.get()

    // 初渲染 先调用一次
    // this.get()

    this.vm = vm
  }

  // 计算属性 watcher 在如果是脏的情况下 需要调用的方法
  evaluate() {
    // 当计算属性watcher的时候 我们传入的fn会是 计算属性的get() get()会有返回值 我们将这个返回值绑定到实例身上
    // 也就是绑定到了 watcher身上 计算属性的值如果不是脏的 就会使用watcher身上的 相当于缓存到 watcher身上了
    this.value = this.get()

    // 标识为脏
    this.dirty = false
  }

  get() {
    // 当我们创建渲染watcher的时候(页面渲染的时候) 我们会把当前的渲染watcher放到dep的target上
 
    // 下面调用this.getter() == vm._update(vm._render()) 就会取值 取值的时候就会走到 defineReactive - getter 上
    // Dep.target = this
    // 我们通过下面的方法将 渲染watcher 放到 Dep.target 上 该方法内部维护了一个stack
    pushTarget(this)

    // vm._update(vm._render())还具有取值的功能 因为render的时候nameage这些变量都会从vm上取值 我们只要一调用该函数就会到 vm 上取值
    // this.getter() 就是 return this.firstname + this.lastname 但是 watcher 类的this是watcher吧 我们要从vm身上取值吧
    let value = this.getter.call(this.vm)

    // 渲染完后清空
    // Dep.target = null
    // 用下面的方法进行 清空操作 把 stack中的watcher删掉
    popTarget()


    // 计算属性中需要拿到返回值 所以我们这样操作下
    return value
  }

  addDep(dep) {
    let id = dep.id

    if(!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)

      dep.addSub(this)
    }
  }

  // 修改模版中依赖的属性 会触发更新操作
  update() {

    // 更新前判断 如果是lazy说明是计算属性
    if(this.lazy) {
      // 依赖值发现变化了 标识计算属性是脏值
      this.dirty = true
    } else {
      // 让组件重新渲染
      // this.get()

      // 为了完成修改多个属性后统一渲染一次 我们将 watcher 放入到队列中 将当前的watcher暂存起来
      queueWatcher(this)
    }
  }

  run() {
    this.get()
  }

  // 让计算属性中的依赖也记住渲染watcher
  depend() {
    // 我们拿到存放的所有dep 这里我们要使用dep
    let i = this.deps.length
    while(i--) {
      // dep收集watcher会有对应的depend方法 让计算属性watcher也收集渲染watcher
      this.deps[i].depend()
    }
  }
}


let queue = []
let has = {}
let pending = false

function queueWatcher(watcher) {
  const id = watcher.id
  if(!has[id]) {
    queue.push(watcher)
    has[id] = true

    if(!pending) {
      nextTick(flushSchedulerQueue)
      pending = true
    }

  }
}

function flushSchedulerQueue() {
  let flushQueue = queue.slice(0)

  queue = []
  has = {}
  pending = false

  flushQueue.forEach(q => q.run()) 
}


// 回调的队列
let callbacks = []
let waiting = false
export function nextTick(cb) {
  callbacks.push(cb)

  if(!waiting) {
    setTimeout(flushCallbacks, 0)
  }

  waiting = true
}

function flushCallbacks() {
  let cbs = callbacks.splice(0)

  waiting = false  
  callbacks = []
  cbs.forEach(cb => cb())
}

export default Wacher
```

- src/state.js
```js
import Dep from "./observe/dep.js"
import { observe } from "./observe/index.js"
import Wacher from "./observe/watcher.js"

export function initState(vm) {

  let opts = vm.$options

  if(opts.data) {
    initData(vm)
  }

  if(opts.computed) {
    initComputed(vm)
  }
}


// 初始化 计算属性
function initComputed(vm) {
  const computed = vm.$options.computed

  // 用于记录哪个属性的watcher 同时保存到实例是方便调用
  const watchers = vm._computedWatchers = {}
  
  // 写法有两种 函数 和 对象 我们要看看 value 是不是 对象
  for(let key in computed) {
    // fullname: {} or function 拿到value的部分
    let userDef = computed[key]


    // 我们需要监控 计算属性中get的变化
    // lazy: true: 如果我们执行new Watcher会直接执行fn 但是我们不希望它立刻执行 而是取值的时候才执行 lazy: true 相当于标识 标识fn不要立即执行
    // fn: 每次重新执行的方法 我们每次重新执行的就是计算属性的get()方法(或者是计算属性函数式的方法)
    // 参数:  vm fn bool
    let fn = typeof userDef == "function" ? userDef : userDef.get

    // 将属性和watcher 对应起来
    // 如果直接 new Watcher 默认就会执行 fn
    watchers[key] = new Wacher(vm, fn, {lazy: true})



    // 如果是一个函数 那么userDef就是getter 如果是对象那我们就取出来getter
    // const getter = typeof userDef == "function" ? userDef : userDef.get
    // const setter = userDef.set || (() => {})

    // 将计算属性 fullname 定义在 vm 上 
    // 我们没有从userDef取出getter 和 setter 而是传入userDef(相当于value的部分) 让它在方法内再取getter setter
    defineComputed(vm, key, userDef)
  }
}


// 给target定义属性
function defineComputed(target, key, userDef) {

  // 用不到了 我们上面将 getter 放到了 new Watcher 的里面 fn就是 我们也会通过 watcher来调用 所以这里用不到了
  // const getter = typeof userDef == "function" ? userDef : userDef.get
  const setter = userDef.set || (() => {})
  
  // 这样可以通过 实例拿到对应的属性
  Object.defineProperty(target, key, {
    // 取值的时候 可以根据key 找到对应的watcher 看其是否是脏的
    // 第一次的时候 dirty是脏的 所以会执行用户传入的get() 之后 dirty为false 就不会再执行该方法了
    get: createComputedGetter(key),
    set: setter
  })
}

// 我们需要检查是否需要执行这个getter
function createComputedGetter(key) {
  // 我们要拿到 watcher 看看 dirty 是不是脏的 怎么拿 watcher?

  // 这里的function就是get的回调 回调中的this指向
  return function() {

    // 这里是 this 是 vm 因为 getter中的this就是 obj 我们就可以通过this 拿到在vm上保存的 计算属性的所有watcher
    // 我们可以通过 key 获取到对应属性的 watcher 这个watcher中是有getter的
    let watcher = this._computedWatchers[key] 

    if(watcher.dirty) {
      // 如果为true(默认就是被修改的) 我们应该实行用户传入的getter
      watcher.evaluate()
    }

    // watcher.evaluate() 执行后计算属性会出栈 如果Dep.target还有值 说明还有渲染watcher
    if(Dep.target) {
      // 让计算属性watcher里面的属性 也去收集渲染watcher(上层watcher)
      watcher.depend()
    }

    // 在调用evaluate()后会将 getter的返回值放在 watcher.value 上 相当于将值缓存在watcher上了
    return watcher.value
  }
}


function initData(vm) {
  let data = vm.$options.data

  data = typeof data == "function" ? data.call(vm) : data
  vm._data = data
  observe(data)

  for(let key in data) {
    proxy(vm, "_data", key)
  }
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      // 从 vm._data[key] 取值
      return vm[target][key]
    },
    set(val) {
      vm[target][key] = val 
    }
  })

}
```

- 再参考下 defineReactive()
```js
export function defineReactive(target, key, value) {

  let childOb = observe(value)
  let dep = new Dep()

  Object.defineProperty(target, key, {
    get() {
      if(Dep.target) {
        dep.depend()
        if(childOb) {
          childOb.dep.depend()
          if(Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    // 
    set(val) {
      if(val == value) return
      observe(val)
      value = val

      // 通知更新
      dep.notify()
    }
  })
}

```

----------------

### watch
- watch也有 对象式 和 函数式 和 数组式 和 字符串的写法
- 数组式: 让多种逻辑依次执行

> vm.$watch(() => vm.firstname, (n,o) => {})
> vm.$watch("firstname", (n,o) => {})
- 还可以通过 $watch 的api 来写
- 监控的值
  - 可以是回调返回值
  - 可以是字符串


```js
methods: {
  fn(n,o) {
    console.log(n,o)
  }
},
watch: {
  // 函数式
  firstname(n, o) {

  },

  // 数组式:
  firstname: [
    (n, o) => console.log(n, o),
    (n, o) => console.log(n, o),
  ],
  // 数组式2: 取methods中的方法来执行
  fistname: [
    "fn",
    (n, o) => console.log(n, o),
  ],

  // 字符串:
  fistname: "fn",

  // 对象式:

}
```

- 只要 firstname 发生变化了 就会拿到新值和老值
- 这里就是一个纯粹的观察者模式 它只需要观察 firstname 变量 如果该变化发生变化了 就会执行回调

- 上面 watch 的写法很多 但是**最终都会转成 vm.$watch 的形式**

> vm.$watch(exprOrFn, cb, options = {})
- 我们先写在 src/index.js 下面 以后再提取
```js
// 添加 $watch 最终调用的都是这个方法
Vue.prototype.$watch = function(exprOrFn, cb, options = {}) {

}
```

> 参数
- 参数1: 字符串型的要监控的值 或者 函数返回要监控的值
- 参数2: 回调
- 参数3: options

---

- 我们回到 src/state.js 中 我们就要判断用户是否传入了 watch 配置项
```js
export function initState(vm) {
  let opts = vm.$options
  if(opts.data) {
    initData(vm)
  }
  if(opts.computed) {
    initComputed(vm)
  }


  // 如果有watch 我们就初始化watch
  if(opts.watch) {
    initWatch(vm)
  }
}
```


> initWatch(vm)
```js
// 初始化 watch 
function initWatch(vm) {
  // 获取用户传入的 watch 配置项 它是一个对象
  let watch = vm.$options.watch

  console.log(watch)
  /*
    // 这个就是watch对象
    {
      firstname: f
    }

    {
      firstname: "fn"
    }
  */

  // 因为 value 的部分可能是很多情况 所以我们要循环对象然后拿到 value 的部分做判断处理
}
```


```js
function initWatch(vm) {
  // 获取用户传入的 watch 配置项 它是一个对象
  let watch = vm.$options.watch
  console.log("watch: ", watch)

  // 循环对象中的每一个 key value 做处理
  for(let key in watch) {

    // 我们考虑 字符串 数组 和 函数 这三种情况
    const handler = watch[key]

    // 如果是数组的话
    if(Array.isArray(handler)) {
      // 循环创建 watcher
      for(let i=0; i<handler.length; i++) {

        // 我们要创建watcher 将watcher放到实例上 key是监控的属性
        createWatcher(vm, key, handler[i])
      }
    } else {

      // 不是数组就执行创建watcher
      createWatcher(vm, key, handler)
    }
  }
}
```


> createWatcher(vm, key, handler)
- 最终返回的是 vm.$watch(key, handler)
```js
function createWatcher(vm, key, handler) {

  // handle 我们传递过来 它有可能是 字符串 函数
  if(typeof handler == "string") {
    // firstname: "fn" -> fn是methods定义的 但是该方法也会绑定在实例上 所以我们直接从vm上获取该方法
    handler = vm[handler]
  }

  // 如果是字符串则从vm上获取handler传入 如果是函数直接传入

  return vm.$watch(key, handler)
}
```


- 接下来我们看看 主要的 vm.$watch(exprOrFn, cb) 方法

> vm.$watch(exprOrFn, cb, options = {})
- 它的核心就是 创建一个 watcher
```js
Vue.prototype.$watch = function(exprOrFn, cb, options = {}) {
  // console.log(exprOrFn)
  // console.log(cb)
  /*
    firstname
    firstname(n, o) {
      console.log(n, o)
    }

    or

    () => vm.firstname
    (n, o) => console.log("n, o")
  */

  /*
    $watch是一个观察者 它底层也会基于 Watcher

    参数: vm, fn, watcher类型标识

    我们传入
      this: prototype 中的this都是 vm,

      exprOrFn: 它可能是
        "firstname"
        () => vm.firsrname

      {user: true}: wacher类型的标识 用户自己写的watcher

      cb: 用户指定的watch 回调
  */

  // 目的 当 firstname 的值发生变化了 直接执行 cb 
  new Watcher(this, exprOrFn, {user: true}, cb)
}

```


- 我们再看看 watcher 的主要逻辑
- 之前 我们 watcher 的构造器是
```js
constructor(vm, fn, options) { ... }
```

- 但是现在 我们传参的形式是 也就是fn 和 cb发生了变化
- fn的值可能是一个字符串
- 多了cb
```js
new Watcher(this, exprOrFn, {user: true}, cb)
```


> 逻辑: 
- 所以我们要进行 watcher 的修改

- 1. 我们会先判断 exprOrFn 如果它是一个字符串 我们要给它保证成函数 
- 该函数会挂载到 this.getter 中 供 this.get() 来进行调用执行
- 执行结果为 从 vm 上读取要监视的值 并将结果(旧值) 保存到 this.value 上
<!-- 
  读取值 就会做依赖收集
 -->

- 2. 我们保存了 user cb 同时构造器会默认执行 this.get()

- 3. 当我们修改 监视的属性的时候 会走 defineReactive 的set()
- 会执行 dep.notify() - watcher.update() - queueWatcher(this) - flushQueue.forEach(q => q.run()) 
- 最后会执行 run() 当修改值的时候 会拿到 n o 并在这个时机 cb 回调


```js
import Dep, { popTarget, pushTarget } from "./dep"
let id = 0

class Wacher {
  /**
   * 
   * @param {*} vm 我们需要知道当前的watcher是哪个实例的
   * @param {*} exprOrFn 实例(组件)对应的渲染函数 vm._update(vm._render()) 我觉得叫render更好
   *      exprOrFn在计算属性中 是用户指定的get()回调
   *      exprOrFn在watch中 是回调指定的要监视的值
   * @param {*} options 布尔类型标识是一个渲染watcher
   * @param {*} cb watch的回调 当属性变化时 执行的回调
   */
  constructor(vm, exprOrFn, options, cb) {
    this.id = id++

    // 布尔类型: 标识是何种watcher
    this.renderWatcher = options


    // 如果我们传入的exprOrFn是字符串 那么我们要将字符串改成一个函数
    if(typeof exprOrFn == "string") {
      this.getter = function() {
        // 从 vm 上获取要监视的属性 vm.firstname
        return vm[exprOrFn]
      }
    } else {
      // 函数
      this.getter = exprOrFn
    }
    // 标识是否是 用户要写的 watch 
    this.user = options.user
    
    // 保存用户传入的 watch 回调
    this.cb = cb

        this.deps = []
    this.depsId = new Set()
    this.lazy = options.lazy
    this.dirty = this.lazy

    // 当 watch 的时候 我们 老值保存在 this.value 上 因为是 watch watcher所以默认会执行 this.get()
    this.value = this.lazy ? undefined : this.get()
    this.vm = vm
  }

  evaluate() {
    this.value = this.get()
    this.dirty = false
  }

  get() {
    pushTarget(this)
    let value = this.getter.call(this.vm)

    popTarget()
    return value
  }

  addDep(dep) {
    let id = dep.id

    if(!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)

      dep.addSub(this)
    }
  }

  update() {
    if(this.lazy) {
      this.dirty = true
    } else {
      queueWatcher(this)
    }
  }

  run() {
    // new Watcher 构造器在执行 this.get() 的时候 将老值保存在this.value身上
    let oldValue = this.value

    // 当我们在执行这里的时候 就能获取到新的值
    let newValue = this.get()


    // 如果是 watch
    if(this.user) {
      // 执行 用户传入的 watch 回调
      this.cb.call(this.vm, newValue, oldValue)
    }
  }

  depend() {
    let i = this.deps.length
    while(i--) {
      this.deps[i].depend()
    }
  }
}


let queue = []
let has = {}
let pending = false


function queueWatcher(watcher) {
  const id = watcher.id
  if(!has[id]) {
    queue.push(watcher)
    has[id] = true

    if(!pending) {
      nextTick(flushSchedulerQueue)
      pending = true
    }

  }
}

function flushSchedulerQueue() {
  let flushQueue = queue.slice(0)

  queue = []
  has = {}
  pending = false

  flushQueue.forEach(q => q.run()) 
}


let callbacks = []
let waiting = false
export function nextTick(cb) {
  callbacks.push(cb)

  if(!waiting) {
    setTimeout(flushCallbacks, 0)
  }

  waiting = true
}

function flushCallbacks() {
  let cbs = callbacks.splice(0)

  waiting = false  
  callbacks = []

  // 按照顺序依次执行
  cbs.forEach(cb => cb())
}

export default Wacher


```



> 流程:
- 我们会执行 vm.$watch(exprOrFn, cb)
- 里面我们会创建 watcher

  new Watcher(this, exprOrFn, {user: true}, cb)

- 然后会执行 Watcher 构造器
- 首先会判断 exprOrFn 是否是字符串 
  如果是我们要对exprOrFn进行将加工 让其在 vm 上取值
  然后我们将 这个返回监视属性的函数 赋值到 **this.getter** 上了

- 然后我们保存了 cb
- 然后将 user: true 保存在 this.user 上

- 构造器中默认会调用 this.get() 方法

  this.value = this.lazy ? undefined : this.get()

- 调用this.get()的时候会做依赖收集 并且会拿到当前的最新值
```js
get() {
  pushTarget(this)
  // 获取到 vm 上要监视的属性 vm[firstname] 拿到 sam
  let value = this.getter.call(this.vm)
  popTarget()

  // 返回 监视属性的值
  return value
}
```

- 同时我们将 要监视属性的值 缓存到了 this.value 上
- 构造器中执行的 this.get() 会拿到 oldValue

- 当页面中我们更新了要监视的值 在渲染组件的时候 firstnma会收集依赖(收集watcher)

- 当修改值的时候就会触发set() 会走到 dep.notify()
- 然后会循环变量 subs[] 调用 watcher.update()

- update() 中会执行 queueWatcher(this) 将watcher暂存起来 因为我们是需要异步更新的 

- queueWatcher(this) 会将watcher去重并将watcher推到队列中 然后异步一次清空队列 执行 watcher.run()

- run()中我们会重新调用 this.get() 因为要更新组件么
- 我们获取了老值 和 新值 同时如果是 watch 的话 我们会执行用户传入的回调
```js
run() {

  let oldValue = this.value
  let newValue = this.get()


  // 如果是 watch
  if(this.user) {
    // 执行 用户传入的 watch 回调
    this.cb.call(this.vm, newValue, oldValue)
  }
}
```

- 监控某个值变了 监控的值会收集watcher 如果这个值发生了变化 就会让watcher 的 cb执行一次

- watch和computed底层都是基于watcher的

> 所以 watch 也不是数据变了立刻执行 异步更新


> 整理:
- 我们把 src/index.js 中的 $nextTick $watch 整理到 src/state.js 文件中

- src/state.js
```js
export function initStateMixin(Vue) {
  Vue.prototype.$nextTick = nextTick

  // 添加 $watch 最终调用的都是这个方法
  Vue.prototype.$watch = function(exprOrFn, cb, options = {}) {
    new Watcher(this, exprOrFn, {user: true}, cb)
  }
}
```

- src/index.js
```js
// 给原型扩展 $nextTick $watch
initStateMixin(Vue)
```


- 将 
  patch
  patchProps
  createElm

- 从 src/lifecycle.js 提取到 src/vdom/patch.js 中
- patch.js:
- createElm: 创建真实节点
- patchProps: 比较属性
- patch: 比较两个虚拟节点

----------------

### Diff算法
- diff算法就是两个虚拟DOM之间的对比

- 我们在 this._init() 方法中会调用 
  initState() 做 data computed watch 等数据的初始化操作
  然后会判断 用户是否传入了 el 配置项 如果传入 则调用 vm.$mount() 方法 实现数据的挂载

  vm.$mount() 方法的最后会调用 mountComponent() 将应用替换掉el
- lifecycle.js
```js
export function mountComponent(vm, el) {
  vm.$el = el

  const updateComponent = () => {
    vm._update(vm._render())
  }

  const wather = new Watcher(vm, updateComponent, true)
}
```

- updateComponent()我们是使用这个方法来渲染组件的 这样的做法是暴力的 我们是每次更新前 
- vm._render() 会产生新的虚拟节点

- 之后调用 vm._update() 根据虚拟节点产生真实节点
```js
Vue.prototype._update = function() {
  const vm = this
  const el = vm.$el

  vm.$el = patch(el, vnode)
}
```

- 在之前的更新中每次更新 都会产生新的虚拟节点 vnode 通过新的虚拟节点生成真实节点 然后替换掉老的el 这样的性能消耗是比较大的 
- 我们期望的是 不是直接替换掉老的节点 而是应该有一个比对的过程 

- 第一次渲染的时候我们会产生虚拟节点 第二次更新的时候还会产生虚拟节点 我们可以比对这两个虚拟节点的差异 比对出需要更新的内容 更新部分内容


> 举例:
- 比如 我们有两个模版
```html
<!-- 模版1 -->
<li>{{name}}<li>


<!-- 模版2 -->
<li>{{name}}<li>
```

- 当数据更新或者初渲染的时候 我们之前都是 根据template生成虚拟节点 然后将其变为render 产生虚拟节点

```js
// 返回的是render函数
let render1 = compileToFunction(`<li>{{name}}</li>`)

// 我们要传入vm 所以创建一个vm vm上才有_c()等方法
let vm1 = new Vue({data: {name: "sam"}})
let prevVnode = render1.call(vm1)
console.log("prevVnode: ", prevVnode)


// 再整一个模版
let render2 = compileToFunction(`<li>{{name}}</li>`)
let vm2 = new Vue({data: {name: "sam"}})
let nextVnode = render2.call(vm2)
console.log("nextVnode: ", nextVnode)
```

- 为了能看到页面的变化 我们将 prevVnode 生成真实的DOM 插入到页面上 
- 之后用 **prevVnode 和 nextVnode 比较结果**更新页面

```js
// 将虚拟节点创建成真实节点
let el = createElm(prevVnode)
document.body.appendChild(el)
```

- 我们之前的做法是 当数据发生变化的时候 拿到新的模版再次生成新的虚拟DOM 再次生成真实DOM 替换掉之前的el
- 是两个真实节点之间的替换
- 这是没有diff算法的操作 直接将心的节点替换掉了老的节点
```js
let newEl = createElm(nextVnode)
el.parentNode.replaceChild(newEl, el)
```

- 这样不好 用户自己操作DOM 可能会有性能的浪费 比如获取元素后再操作DOM就会不停的重绘
- 如果
- 之前就是 <li>{{name}}</li> 
- 之后还是 <li>{{name}}</li> 

- 没有变化 用替换么 因为前后元素一致

- 我们希望尽可能的复用 老的节点 所以Vue中 不是直接替换 而是比较两个人的区别之后再替换 因为 真实节点 上的属性非常的多 而我们的虚拟DOM则没有那么多 能尽量不创建DOM就不创建DOM **这就是diff算法**

------

- diff算法是**同级比较** 是一个平级比较的过程 父亲和父亲比对 儿子和儿子比对
- 比如我们有两个DOM结构 放的文本都是一眼过的

   旧       新
  div     span    ← 父节点
   ↓        ↓
  sam      sam

- diff算法的比较方式是一层一层的比较 比如
  父节点不一样:
    我们就不需要比较子节点的内容了 我们直接用新节点span 替换掉 旧节点div

- 我们希望拿到前后的虚拟节点比对 找到差异然后去更新


```js
let render1 = compileToFunction(`<li key="a">{{name}}</li>`)
let vm1 = new Vue({data: {name: "sam"}})
let prevVnode = render1.call(vm1)


let render2 = compileToFunction(`<li key="b">{{name}}</li>`)
let vm2 = new Vue({data: {name: "sam"}})
let nextVnode = render2.call(vm2)
```

- 我们还是拿上面的案例继续, 我们可以拿到旧节点(prevVnode) 和 新节点(nextVnode) 现在我们通过 patch() 方法来进行diff比较

- 我们先回顾下 **patch(oldVnode, vnode)**

> patch(oldVnode, vnode)
```js
export function patch(oldVnode, vnode) {

  // 判断 oldVnode 是否是真实DOM 如果是则为 初渲染流程 我们就要创建真实DOM 替换掉 div#app
  const isRealElement = oldVnode.nodeType
  if(isRealElement) {

    const el = oldVnode
    const parentEl = el.parentNode  // body
    let newELm = createElm(vnode)

    parentEl.insertBefore(newELm, el.nextSibling)
    parentEl.removeChild(el)
    return newELm

    
  } else {
    // diff算法
  }
}
```

- 我们完成下 diff 算法部分的逻辑

> 我们要在 diff 算法的部分完成以下的逻辑
- 1. 判断新旧两个节点不是同一个节点 
- 比如之前是div 现在是span 这种情况下
- 我们应该直接用 span 干掉 div 也就是删除老的 换上新的 没有比对

---

- 2. 两个节点是同一个节点
- 我们可以判断节点的tag和节点的key
- key可以标识是否是同一个节点, 如果tag和key是一样的就是同一个节点
- 同一个节点的情况下 我们要比较两个节点的属性是否有差异(复用老的节点 将差异的属性更新) 比如
```html
<li 
  key="a" 
  style="color:red"
> {{name}} </li>


<li 
  key="a" 
  style="color:red; background:yellow"
> {{name}} </li>
```
- 这两个节点都是 <li> 同时 <key="a"> key属性一致, 只有其他属性(style)不一样 
- 所以我们应该复用原来的节点 添加上新的background属性

---

- 3. 节点比较完毕后就需要比较两个人的儿子

--- 


> 1. 判断两个节点是否是同一节点
- 我们在 src/vdom/index.js 追加一个判断的方法

- 传入两个虚拟节点 判断标签名和key (虚拟节点是对象里面都有tag key属性)

```js
// 看看两个虚拟节点是否是同一个
export function isSameVnode(vnode1, vnode2) {
  // 我们看看 vnode 的标签名 和 key 是否都一致
  return vnode1.tag == vnode2.tag && vnode1.key == vnode2.key
}
```

```js
else {
  // diff算法 如果不是同一个节点
  if(!isSameVnode(oldVnode, vnode)) {

  }
}
```

- 如果不是一个节点 我们就要用新虚拟节点创建后的新真实节点 替换掉 旧虚拟节点对应的真实节点

> 旧虚拟节点对应的真实节点怎么找?
- 我们在通过虚拟节点创建真实节点的时候 会调用 createElm(vnode) 
- 方法里面会将 通过 vnode 创建的真实节点 放到 vnode.el 上 

- 这样虚拟节点和它对应的真实节点就一一对应起来了
```js
export function createElm(vnode) {
  let {tag, data, children, text} = vnode
  if(typeof tag == "string") {


    // 这里！！！
    vnode.el = document.createElement(tag)


    patchProps(vnode.el, data)
    // 处理子节点:
    children.forEach(child => {
      // 将 child(子标签 子节点) 也创建成真实节点 将子节点放入到它的父节点中 也相当于给 el添加内容
      vnode.el.appendChild(createElm(child))
    })

  } else {
    // 如果 tag 不是字符串 我们就要创建文本节点 同样也要挂载到虚拟节点上
    vnode.el = document.createTextNode(text)
  }

  // 返回真实元素
  return vnode.el
}
```

- 找到了 旧节点对应的真实节点后
- 我们用 新节点 替换掉 旧节点
```js
else {
    // diff算法

    // 1. 判断两个节点是否是同一个节点

    // 不是同一个节点的情况
    if(!isSameVnode(oldVnode, vnode)) {
      /*
        通过 oldVnode.el 找到页面上渲染的节点 通过它的爸爸替换成新的节点
        参数: 用新的vnode创建的新的真实节点 替换掉老的真实的节点 
      */

      let el = createElm(vnode)
      oldVnode.el.parentNode.replaceChild(el, oldVnode.el)

      // 返回新的el 保持返回的都是一个新的节点
      return el
    }


    // 到这里说明 两个节点是相同的 
    ...
  }
```

- 走到下面就是两个节点为相同的情况 我们首先复用旧节点
```js
// 复用老的节点
// 将老的DOM赋值给新的节点的el 复用老节点的元素 如果两个都是标签 那么标签只是更改了属性 标签可复用 那就将老的.el 赋给 新的.el
let el = vnode.el = oldVnode.el
```

- 两个节点为相同的情况 -- 考虑文本的情况
- 我们希望 当两个节点相同 说明也可能是文本节点 我们看看文本内容是否相同
```js
if(!isSameVnode(oldVnode, vnode)) {
  /*
    通过 oldVnode.el 找到页面上渲染的节点 通过它的爸爸替换成新的节点
    参数: 用新的vnode创建的新的真实节点 替换掉老的真实的节点 
  */
  return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
}



// 复用老的节点
// 将老的DOM赋值给新的节点的el 复用老节点的元素 如果两个都是标签 那么标签只是更改了属性 标签可复用 那就将老的.el 赋给 新的.el
let el = vnode.el = oldVnode.el


// 因为上面做了两个标签的判断 到这里说明两个标签是一样的 那么前一个节点是文本 那么后一个节点也是文本
if(!oldVnode.tag) {
  // 既然前后都是文本 那么就可以判断文本内容
  if(oldVnode.text != vnode.text) {
    // el也就是老节点上的el 这样就是复用了老节点的el内容 用新的文本覆盖掉老的节点的文本内容
    el.textContent = vnode.text
  }
}

// 再接着往下走的话 相同节点是标签(上面相同节点是文本)
```

- 上面的所有逻辑我们都写在了 else 中 逻辑太多了 所以我们将逻辑抽离到一个函数中

```js
export function patch(oldVnode, vnode) {

    ... 
    
  } else {
    // diff算法
    return patchVnode(oldVnode, vnode)
  }
}
```


> patchVnode(oldVnode, vnode)
- diff比较两个节点
- 上面部分的代码
```js
// 我们将比较两个节点的逻辑抽离到一个函数中
function patchVnode(oldVnode, vnode) {
  // 1. 判断两个节点是否是同一个节点 tag == tag && key == key
  if(!isSameVnode(oldVnode, vnode)) {
    // 不是同一个节点的情况
    /*
      老的虚拟节点在第一渲染的时候 我们会将虚拟节点和真实节点对应在一起 虚拟节点的.el属性上 就有真实节点

      export function createElm(vnode) {
        ...
        // 将真实的节点放在了虚拟节点.el上
        vnode.el = document.createElement(tag)
        ...
      }
    */

    // 通过 oldVnode.el 找到页面上渲染的节点 通过它的爸爸替换成新的节点

    // 参数: 用新的vnode创建的新的真实节点 替换掉老的真实的节点 
    let el = createElm(vnode)
    oldVnode.el.parentNode.replaceChild(el, oldVnode.el)

    // 返回新的el 保持返回的都是一个新的节点
    return el
  }

  /*
    上面return了 能走到这里说明两个节点是一样的 
    我们先复用旧节点

    然后考虑 相同节点是文本节点的情况
    前一个节点是文本的话 那么后一个节点也会是文本节点


    文本情况: 我们期望比较一下文本的内容
    相同节点可能是元素 也可能是文本 文本的tag都是undefined

    如果当前节点的tag是undefined 那它就是文本
  */

  // 将老的DOM赋值给新的节点的el 复用老节点的元素 如果两个都是标签 那么标签只是更改了属性 标签可复用 那就将老的.el 赋给 新的.el
  let el = vnode.el = oldVnode.el

  // 因为上面做了两个标签的判断 到这里说明两个标签是一样的 那么前一个节点是文本 那么后一个节点也是文本
  if(!oldVnode.tag) {
    // 既然前后都是文本 那么就可以判断文本内容
    if(oldVnode.text != vnode.text) {
      // el也就是老节点上的el 用新的文本覆盖掉老的节点的文本内容
      el.textContent = vnode.text
    }
  }


  // 走到这里 就是相同节点是标签 如果是标签的话 我们需要比对标签的属性 
  // 能到这里说明 tag key 都相同 而且是标签
  console.log(oldVnode)
  console.log(vnode)
  /*
    vm: Vue, tag: 'li', key: 'a', data: {…}, children: Array(1)
        data: style: {color: 'red'}

    vm: Vue, tag: 'li', key: 'a', data: {…}, children: Array(1)
        data: style: {color: 'red', background: 'blue'}
  */
}
```

- 上面完成了 
  如果节点不一样 tag != tag && key != key
  比较了文本节点
  再往下就到了 tag  == tag && key = key 的情况 也就是说两个节点一样 这时候我们就要 对比标签属性了


- 对比属性的话 我们会调用比属性的方法 我们之前写过 patchProps(el, props)
- 当时是用新的属性 覆盖掉 旧的属性 做的是初始化时候的处理
- 现在我们要做更新时候的属性的处理

```js
// el: 节点
// oldProps: 旧节点的标签属性
// props: 新节点的标签属性
export function patchProps(el, oldProps, props) {
  // 初始化标签属性的属性逻辑
  for(let key in props) {
    if(key == "style") {
      for(let styleName in props[key]) {
        el.style[styleName] = props[key][styleName]
      }
    } else {
      el.setAttribute(key, props[key])
    }
  }
}
```

- 我们再完成下 patchProps() 中的逻辑
```js
// 处理标签属性的方法
export function patchProps(el, oldProps, props) {

  /*
    追加逻辑:
      老的属性中有 新的属性中没有 要删除老的属性 因为我们要以新节点的标签属性为准
  */
  let oldStyle = oldProps.style || {}
  let newStyle = props.style || {}

  // 做style属性的处理 循环老的style对象看看新的中有没有 (老的样式中新的样式中没有则删除)
  for(let key in oldStyle) {
    if(!newStyle[key]) {
      // 如果新的属性中没有 就将节点中对应的key置为空
      el.style[key] = ""
    }
  }


  // 做标签属性的处理(除了style属性) 老的属性中有 新的属性中没有 删除属性
  for(let key in oldProps) {
    if(!props[key]) {
      el.removeAttribute(key)
    }
  }


  // 将属性循环一遍赋值到元素上 用新的覆盖掉老的
  for(let key in props) {
    // 如果 key 是 style
    if(key == "style") {
      /*
        标签上的 style 是这么写的  style = "color:red"

        我们的props里面的style属性是
        style: {background: 'pink', width: '100px'}
      */
      for(let styleName in props[key]) {
        el.style[styleName] = props[key][styleName]
      }
    } else {
      el.setAttribute(key, props[key])
    }
  }

  
}
```

- 上面我们处理了两个节点之间的同级比较 
  比较了标签
  比较了标签属性

```js
export function patch(oldVnode, vnode) {

  const isRealElement = oldVnode.nodeType
  if(isRealElement) {
    const el = oldVnode
    const parentEl = el.parentNode  // body
    let newELm = createElm(vnode)
    parentEl.insertBefore(newELm, el.nextSibling)
    parentEl.removeChild(el)
    return newELm
  } else {
    // diff算法
    return patchVnode(oldVnode, vnode)
  }
}
```

- patchVnode(oldVnode, vnode)
```js
function patchVnode(oldVnode, vnode) {
  // 两个节点不同的情况
  if(!isSameVnode(oldVnode, vnode)) {
    let el = createElm(vnode)
    oldVnode.el.parentNode.replaceChild(el, oldVnode.el)
    return el
  }

  // 复用老节点
  let el = vnode.el = oldVnode.el

  // 两个节点相同 -- 对比文本
  if(!oldVnode.tag) {
    if(oldVnode.text != vnode.text) {
      el.textContent = vnode.text
    }
  }

  // 两个节点相同 相同的是标签 - 对比属性
  patchProps(el, oldVnode.data, vnode.data)

  // 再往下走 我们就要对比两个节点的儿子节点
```

- 接下来我们要比较两个节点的children属性(子节点)

> 这里我们也分两种情况 我们要针对不同的情况做处理
> 1. 1方有儿子, 1方没儿子
- 要么把儿子全部删掉 要么全部创建新儿子

> 2. 2方都有儿子


```js
// 获取两个节点的儿子
let oldChildren = oldVnode.children || []
let newChildren = vnode.children || []

// 两方都有儿子: 如下情况需要比较两个人的儿子
if(oldChildren.length > 0 && newChildren.length > 0) {

  // 比较两个人的儿子 用新的更新旧的
  updateChildren(el, oldChildren, newChildren)

// 一方有儿子 老节点的儿子为0 新节点有儿子: 我们直接将新节点的儿子放入
} else if(newChildren.length > 0) {
  // 将新的儿子全部挂上去的方法 
  mountChildren(el, newChildren)

// 新的没有 老的有 要将老节点的儿子删除
} else if(oldChildren.length > 0) {
  // 删除节点中 老节点的儿子节点 (可以循环删除)
  el.innerHTML = ""
}

return el
```

> mountChildren(el, newChildren)
- 用于处理老节点没有儿子 新节点有儿子
- 我们直接将新节点的儿子放入
```js
function mountChildren(el, newChildren) {
  // 渲染新儿子 将虚拟节点变为真实节点 挂载到元素上
  for(let i=0; i<newChildren.length; i++) {
    let child = newChildren[i]

    // 将虚拟节点变为真实节点 然后插入el中
    el.appendChild(createElm(child))
  }
}
```


> updateChildren(el, oldChildren, newChildren)
- 用于处理 老节点 和 新节点 都有儿子

- 逻辑:
- 为了比较两个儿子的时候 提高性能 会有一些优化手段

- 比如之前 我们有 3个元素

    A  B  C
    □  □  □

    1  2  3
    □  □  □

    我们会
      用 1 依次和 ABC 比较 看看是否一样
      用 2 依次和 ABC 比较 看看是否一样
      用 3 依次和 ABC 比较 看看是否一样

- 这样比较一圈比较消耗性能

- 我们为了提高性能会针对不同的特殊情况做处理

> 特殊情况1:
- 新节点 和 旧节点 标签 & 属性 都一致 只有数量上的差别 我们会采用 双指针的方式

      head   tail
      ↓     ↓
      A  B  C
      □  □  □


     head     tail
      ↓        ↓
      A  B  C  D
      □  □  □  □

- 这种特殊情况下 我们默认 A A B B C C 标签 和 属性都相同

  如果 A 和 A 的标签 属性 都一致 那么我们就向后移动指针

         h  t
         ↓  ↓
      A  B  C
      □  □  □


         h     t
         ↓     ↓
      A  B  C  D
      □  □  □  □

    如果 B 和 B 标签一样 属性一样 那么我们就向后移动指针
            h
            ↓
            t
            ↓
      A  B  C
      □  □  □


            h  t
            ↓  ↓
      A  B  C  D
      □  □  □  □

    
    当两个列表任一一个 头指针 大于 尾指针 的时候 就停止


            t  h
            ↓  ↓
      A  B  C
      □  □  □


               h
               ↓
               t
               ↓
      A  B  C  D
      □  □  □  □

    那我们就将 h t 指向同一个的节点 D 做插入就可以了

    如果 老节点中有D 新节点中没有D
               h
               ↓
               t
               ↓
      A  B  C  D
      □  □  □  □


            t  h
            ↓  ↓
      A  B  C
      □  □  □

    那么我们就将 h t 指向的节点删掉就可以了

    也就是不管上下那个列表中 头指针 和 尾指针 只要头超过了尾 我们就停止循环
    把 ht指向的节点 删掉 或者 追加进去

```js
```

# 虚拟节点没有整体笔记 建议重新看下
https://www.bilibili.com/video/BV1mR4y1w7cU?p=17&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b

<br>

# 挑了些重点的记录:

### entry-runtime.js 和 entry-runtime-with-compilier.js 之间的区别
带有compilier的会重写 $mount 将 template变成render函数

<br>

### runtime/index.js
所谓的运行时 会提供一些 dom 操作的 api 属性操作 元素操作 提供一些组件和指令

比如: v-model v-show等

<br>

### 函数劫持的概念
```js
function fn() {
  console.log("fn")
}

// 将 fn 复制 备份 为以后调用
let fnBackUp = fn

// 修改 fn
fn = function() {
  console.log("修改逻辑")

  // 调用原函数
  fnBackUp()
}
```

<br>

### 生命周期钩子是如何实现
内部利用了一个发布订阅模式 将用户写的钩子维护成了一个数组 后续一次调用 callhook

然后再 init 的时候 在不同的逻辑下面 会调用 callHook()

```js
function callHook(vm, hook) {
  pushTarget()

  // 在 options 中找到 钩子
  const handlers = vm.$options[hook]
  const info = `${hook} hook`

  if(handlers) {
    for(let i=0, j=handlers.length; i < j; i++) {
      // 将钩子一个个拿出来执行
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }

  if(vm._hasHookEvent) {
    vm.$emit("hook" + hook)
  }

  popTarget()
}
```

```
callHook(vm, "beforeCreate")
initState()
callHook(vm, "created")
```

<br>

### 为什么有的钩子执行的时候 先子后父 有些是先父后子

组件渲染的时候的过程是:
```html
<div id="app">
  <my-button />
</div>
```

遇到父组件 就会先渲染父组件 在渲染父组件的过程中又渲染了 ``<my-button />``

遇到子组件就渲染子组件 但是我们父组件要想渲染完 必须要等内部的子组件渲染完成后 父组件才会渲染完成

这是一个栈结构
```
父 -> 子 -> 子完 -> 父完
```

在上面的渲染过程就 就涉及到了两个组件的一系列的生命周期执行 
```
父 beforeCreate
子 beforeCreate
子 mounted
父 mounted
```

所以 先子后父 先父后子 的原因就是只看到了 整个父子组件的生命周期中的一个部分

<br>

# 生命周期的理解:

beforeCreate:
```
这里没有实现响应式数据
```

在这个钩子之前也做了一些事情 但是没有什么太大的作用所以在 Vue3 中就被取代了
```js 
// 形成组件的父子关系
initLifecycle(vm)
// 初始化事件 $on $off $emit 等
initEvents(vm)
// 声明了一些变量
initRender(vm)
callHook(vm, "beforeCreate")
```

created         ✅
```
可以拿到的是响应式数据 但不涉及到dom渲染 所以这个api可以在服务器端渲染中使用
```
```js
// 初始化 inject 方法
initInjections(vm)
initState(vm)
// 初始化 provide 方法
initProvide(vm)
callHook(vm, "created")
```

beforeMount

mounted         ✅
```
可以获取真实dom
```

beforeUpdate
updated 
activated
deactivated
beforeDestroy   ✅
```
手动调用移除 会触发 这时候watch还在 没有被销毁 这时候的属性都是响应式的
```

destroyed       ✅
```
销毁后会触发 在这个钩子中的时候 方法 和 组件都已经都移除
```

errorCaptured

<br>

# v-if 和 v-for 哪个优先级更高

```html
<div>
  <span v-if="flag" v-for="1 in 3"></span>
</div>
```

会编译成

```js
function render() {
  with(this) {
    return _c("div", _l(3), function(i) {
      return flag ? _c("span"): _e()
    })
  }
}
```

我们能看到 _c("div", _l(3), function(i){...})

使用 _c() 渲染一个div  
_l(): list渲染3次 执行3次参数3位置的回调 每次回调中都会判断 flag 如果满足 则渲染span 否则渲染空节点

很明显 v-for 的优先级更高 在编译的时候 会将 v-for 渲染成 _l函数 v-if 会变成3元表达式

_l就是循环每一项调用对应的回调

<br>

### v-model 的实现原理
**作用:**  
它有两个作用:  
1. 可以放在组件上 
2. 可以放在元素上

放在表达元素上可以实现双向绑定

```html
<input type="text" v-model="msg">

<script>
const vm = new Vue({
  el: "#app",
  data() {
    return {
      msg: "hello"
    }
  }
})
</script>
```

以前我们学到的是 :value 和 @input 的综合使用 但有种情况 假如我们的表单元素是 checkbox radio 则情况就不一样了
```js
<input type="checkbox" v-model="msg">
```

v-model 和 :value + @input 还是有些区别的
当我们使用 v-model 在输入中文的过程中 并不会实时 而是等输入后才会同步到 msg 上

而

:value + @input 的情况在我们键入键盘的时候就开始实时同步到 msg 上

所以 v-model 还有中文处理的功能

<br>

v-model 放在不同的元素上会编译出不同的结果

<br>

```html
<input type="text" v-model="msg">
```
我们看看上面的编译结果 会被编译成 value + input + 指令处理

```js
// text 类型的情况下
function render() {
  with(this) {
    return _c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (msg),
        expression: "msg"
      }],
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (msg)
      },
      on: {
        "input": function($event) {

          // 阻止中文输入 如果在中文输入的过程中就 return 啥都没做
          if($event.target.composing) return 

          msg = $event.target.value
        }
      }
    })
  }
}


// checkbox 类型的情况下
function render() {
  with(this) {
    return _c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (msg),
        expression: "msg"
      }],
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(msg) ? _i(msg, null) > -1 : ()
      },
      // checkbox的时候绑定的是 change 事件
      on: {
        "change": function($event) {

          var $$a = msg, $$el = $event.target, $$c = $$el.checked ? (true) : (false)

          if(Array.isArray($$a)) {
            var $$v = null, $$i = _i($$a, $$v)
            if($$el.checked) {
              $$i < 0 && (msg = $$a.concat([$$v]))
            } else {
              $$i > -1 && (msg = $$a.slice(0, $$i)).concat($$a.)
            } else {
              msg = $$c
            }
          }
        }
      }
    })
  }
}
```

<br>

v-model绑定到组件上的时候 就是 value + input 的语法糖

```html
<my type="text" v-model="msg">
```

```js
function render() {
  with(this) {
    return _c("my", {
      attrs: {
        "type": "input"
      },
      model: {
        value: (msg),
        callback:function($$v) {
          msg = $$v
        }
      },
      expression: "msg"
    }
  }
}
```

v-model绑定到组件上的时候会编译成一个 model对象 组件在创建虚拟节点的时候会利用这个对象
```js
model: {
  value: (msg),
  callback:function($$v) {
    msg = $$v
  },
  expression: "msg"
},
```

<br>

# <keep-alive>
它是 vue 中提供的一个组件 当我们不使用 keep-alive的时候 默认切换两个组件的时候 两个组件会执行创建和效果的过程

如果我们希望在切换组件的时候可以复用之前的组件 而不是全部重新创建

```html
<div id="app">
  <button @click="aa">切换组件</button>
  <button @click="bb">切换组件</button>

  <keep-alive>
    <component :is="component"></component>
  </keep-alive>
</div>

<script>
  new Vue({
    el: "app",
    data: {
      component: "aa"
    }
  })
</script>
```

那怎么实现复用操作的呢? keep-alive 组件的源码
```js
export default {
  // 组件名
  name: 'keep-alive',

  // 抽象组件 就是不会记录到 $children 和 $parent 上
  abstract: true,

  // keep-alive 的标签属性
  props: {
    // 可以缓存那些组件
    include: patternTypes,
    // 可以排除哪些组件
    exclude: patternTypes,
    // 最大缓存的个数
    max: [String, Number]
  },

  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = {
          name: getComponentName(componentOptions),
          tag,
          componentInstance,
        }
        keys.push(keyToCache)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    }
  },

  created () {
    // 创建了一个缓存区
    this.cache = Object.create(null)

    // 缓存组件的名字
    this.keys = []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.cacheVNode()
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  updated () {
    this.cacheVNode()
  },

  render () {
    // 取的是默认插槽
    const slot = this.$slots.default

    // 获取插槽中的第一个
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      // 获取组件名
      const name: ?string = getComponentName(componentOptions)

      // 校验是否需要缓存
      const { include, exclude } = this
      if ( // 这些情况是不复用的情况
        // not included 不包含的
        (include && (!name || !matches(include, name))) ||
        // excluded 排除的
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }


      const { cache, keys } = this

      // 生成唯一的key
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        // delay setting the cache until update
        this.vnodeToCache = vnode
        this.keyToCache = key
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```












----------------

### 扩展: Vue是不是 MVVM 框架
- Vue是一个什么样的框架 MVVM? 文档里面都说了Vue不是一个MVVM框架 它也有VM但是不完全是

- 数据变化视图会更新 视图变化数据会被影响
<!-- 
  比如表单中输入内容会自动跑到数据里
 -->

- MVVM正常是不能跳过数据去更新视图 就是我只能去改数据取更新视图 但是Vue里面就不遵循这个方法 比如说Vue里面有ref 它就可以直接去操作DOM 想改啥改啥 所以这是不符合MVVM的设计思想 所以官方文档中说 我内部只是参考mvvm 但并不是完全一样 所以它并不是一个MVVM框架

----------------

### 扩展: rollup
- 我们使用rollup来搭建环境 它是一个打包工具 是一个js模块打包器 它只负责打包js
- 它比webpack的好处是更加的专注一些 它只打包一些js库 比如react vue都采用的rollup 而且打包出来的代码会非常的简洁 
<!-- 
  webpack打包后文件里面有一堆代码
 -->

- 如果我们开发的是一个完整的项目的话 我们可以会采用webpack
- 如果开发的是一个js库那么首选的还是rollup 因为体积会小很多

> 安装
- npm i rollup rollup-plugin-babel @babel/core @babel/preset-env rollup-plugin-serve @rollup/resolve-node-plugin -D

> rollup-plugin-babel
- rollup中使用babel
- 将babel和rollup连接成一个桥梁 在rollup打包的过程中直接用babel编译es6

> @babel/core
- 使用babel要安装babel核心

> @babel/preset-env 
- 将高级语法转换为低级语法

> rollup-plugin-serve -D
- 开启服务器的模块

> @rollup/plugin-node-resolve
- 如果文件夹中的文件是index的话 我们只写到文件夹名就可以了
- 如果不用这个插件的话 要需要 文件夹/index.js 这么引入文件


> package中指定 运行命令
- rollup
- -c: 指定启动时参照配置文件启动
- -w: 实时监控

```js
// 配置启动脚本
"scripts": {
  "dev": "rollup -cw"
},

"dependencies": {
  "@babel/core": "^7.17.5",
  "@babel/preset-env": "^7.16.11",
  "rollup": "^2.70.0",
  "rollup-plugin-babel": "^4.4.0",
  "rollup-plugin-serve": "^1.1.0"
}
```

------

> 建立rollup配置文件
- 相当于 webpack.config.js
- rollup中使用 export default 语法导出对象作为配置文件
```js
// rollup.config.js
export default {

}
```

> input: 
- 指明入口文件
- 类型: 字符串

> output:
- 指明出口
- 类型: 对象
```js
output: {
  file: "打包后的文件路径包含文件名",
  name: "打包后在全局中添加给定属性, 相当于$",
  // esm: es6模块, cjs: commonjs, iife自执行, umd: 统一模块规范可以兼容amd和cjs
  format: "打包的格式",
  sourcemap: true,
}
```

> plugins:
- 配置插件
- 类型: 数组
- 所有的插件导入到配置文件中后 都是以函数的方式执行
- 下面都是函数调用 传入配置对象
- 在使用babel的时候 默认会采用配置文件

> 配置babel:
- 一般使用babel都会建立babel的配置文件 
- 创建 .babelrc 文件
```js
// .babelrc
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

```js
plugins: [

  babel({
    // 排除下面的文件夹 
    exclude: "node_modules/**"
  }),

  serve({
    // 自动打开浏览器
    open: true,
    port: 3333,
    // 以给定文件夹作为服务器的根目录, ""代表当前目录
    contentBase: "",

    // 默认打开哪个文件？
    openPage: "/index.html"
  })
]
```


> 完整
```js
import babel from "rollup-plugin-babel"
import serve from "rollup-plugin-serve"

export default {
  // 入口文件
  input: "./src/index.js",

  // 文件出口
  output: {
    file: "./dist/vue.js",
    // 要打包出来的window的全局变量叫Vue
    name: "Vue",
    format: "umd",
    sourcemap: true,
  },
  
  plugins: [
    babel({
      // 排除下面的文件夹 这个文件下的所有内容都不进行转义
      exclude: "node_modules/**"
    }),
    serve({
      // 自动打开浏览器
      open: true,
      port: 3333,
      // 服务器是相对于哪个目录 ""表示以当前目录为基准 相当于配置跟路径吧
      contentBase: "",
      // 默认打开哪个文件？
      openPage: "/index.html"
    })
  ]
}
```

