import Dep from "./observe/dep.js"
import { observe } from "./observe/index.js"
import Watcher, { nextTick } from "./observe/watcher.js"

// 用于处理 options 中的配置项(状态)
export function initState(vm) {

  // 从实例身上取出 $options 获取所有的选项
  let opts = vm.$options

  // 如果用户有添加 data 配置项
  if(opts.data) {
    // 如果有就对 data 进行初始化操作
    initData(vm)
  }


  // 如果有计算属性 我们就初始化计算属性
  if(opts.computed) {
    initComputed(vm)
  }


  // 如果有watch 我们就初始化watch
  if(opts.watch) {
    initWatch(vm)
  }

}

// 初始化 watch 
function initWatch(vm) {
  // 获取用户传入的 watch 配置项 它是一个对象
  let watch = vm.$options.watch
  // console.log("watch: ", watch)

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

function createWatcher(vm, key, handler) {
  // handle 我们传递过来 它有可能是 字符串 函数
  if(typeof handler == "string") {
    // firstname: "fn" -> fn是methods定义的 但是该方法也会绑定在实例上 所以我们直接从vm上获取该方法
    handler = vm[handler]
  } 

  return vm.$watch(key, handler)
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
    watchers[key] = new Watcher(vm, fn, {lazy: true})





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


export function initStateMixin(Vue) {
  Vue.prototype.$nextTick = nextTick

  // 添加 $watch 最终调用的都是这个方法
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
    new Watcher(this, exprOrFn, {user: true}, cb)
  }

}