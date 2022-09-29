import {newArrayProto} from "./array"
import Dep from "./dep"

// 创建一个观测类 用于判断 data 是否被观测过
class Observer {
  // data 就是 options 中的 data
  constructor(data) {

    /*
      data可能是对象 也可能是数组 我们要给data设置dep 让它也能够做依赖收集
      这样就可以给对象本身 和 数组本身添加dep 监控变化更新组件
    */
    this.dep = new Dep()


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
  // observe(value) 上一个版本

  // childOb身上就有一个dep属性在constructor里面添加的 childOb.dep 用来收集依赖
  let childOb = observe(value)

  // 给一个属性都增加一个 dep 属性 这个是闭包区域这里的属性不会被销毁
  let dep = new Dep()

  // 我们使用这个api 取值的时候会执行get 修改的时候会执行set 这样就拦截了用户的操作
  Object.defineProperty(target, key, {
    // 取值: 
    get() {

      // 判断
      if(Dep.target) {
        // 让这个属性的收集器记住当前的watcher
        dep.depend()


        // 再取属性的时候 如果有childOb 也就是对象 和 数组实体身上的 __ob__
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

// 递归给数组做劫持的方法
function dependArray(arr) {
  // 拿到里面的每一项 每一项都做依赖收集
  for(let i=0; i<arr.length; i++) {
    // arr[i]元素项 元素项身上都有__ob__ __ob__上有dep(ob就是this this身上有dep)
    arr[i].__ob__ && arr[i].__ob__.dep.depend()

    // 如果里面还是数组
    if(Array.isArray(arr[i])) {
      dependArray(arr[i])
    }
  }
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