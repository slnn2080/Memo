import Dep, { popTarget, pushTarget } from "./dep"

// 每次创建 watcher 都给它一个唯一值
let id = 0

// Watcher 里面有更新组件的方法 this.get()
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
    // 每次创建 实例 的时候 让id++ 这样每个watcher都有自己的id
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

    

    // deps: 用来保存一个watcher对应了哪些dep 后续我们实现计算属性 和 一些清理工作的时候需要用到
    this.deps = []
    this.depsId = new Set()


    // 拿到传入的lazy
    this.lazy = options.lazy
    // 计算属性会使用 dirty 作为缓存值 默认lazy为true dirty就为true
    this.dirty = this.lazy

    // this.lazy为true我们啥都不管 只有不为true的时候我们new Watcher的时候才调用更新组件的方法
    // this.lazy ? undefined : this.get()

    // 当 watch 的时候 我们 老值保存在 this.value 上
    this.value = this.lazy ? undefined : this.get()

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

  // 修改多个属性后 统一为一次更新的操作 再次封装到了run()里面
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

// 源码中是利用对象来进行watcher的去重的
let has = {}

let pending = false


/*
  当 修改属性的时候 最终会走 update()方法 其中的逻辑为 每次修改之后我们都会将watcher暂存到一个队列中 
*/
function queueWatcher(watcher) {
  const id = watcher.id
  // has对象中没有id 则忘队列中放
  if(!has[id]) {
    queue.push(watcher)
    has[id] = true

    // 不管 update() 执行多少次最终只执行一轮刷新操作 类似onece 同时是也不管我们怎么修改属性 新刷新一次队列
    // 第一次肯定是 false
    if(!pending) {
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

  /*
    清空队列任务之前 我们先将watcher置为空

    然后清空 flushQueue 中的任务 
    上面开始回初始化的另一个好处 在刷新的过程中可能还有新的watcher
    因为页面修改了属性就会触发update() -> 就会收集watcher到queque中 我们将这时候的新的watcher 重新放到queue中 下一轮再执行 

    这也是批处理逻辑 先执行第一批(flushQueue) 第一批的执行过程中可能有第二批(放到queue中)
  */
  flushQueue.forEach(q => q.run()) 
}


// 回调的队列
let callbacks = []
let waiting = false
export function nextTick(cb) {
  callbacks.push(cb)

  if(!waiting) {
    // 利用 setTimeout 将逻辑拿到任务队列中执行
    setTimeout(flushCallbacks, 0)

    /*
      还可以这样哦 放到微任务中
      Promise.resolve().then(flushCallbacks)
    */
  }

  waiting = true

  /*
    老师这么写的
    if(!waiting) {
      setTimeout(() => {
        flushCallbacks()
      }, 0)
    }
  */
}

function flushCallbacks() {
  let cbs = callbacks.splice(0)

  waiting = false  
  callbacks = []

  // 按照顺序依次执行
  cbs.forEach(cb => cb())
}

export default Wacher

