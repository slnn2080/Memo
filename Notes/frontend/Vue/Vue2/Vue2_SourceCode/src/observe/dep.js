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