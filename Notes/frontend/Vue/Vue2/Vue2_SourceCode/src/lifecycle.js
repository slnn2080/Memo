import Wacher from "./observe/watcher"
import { createElementVnode, createTextVnode } from "./vdom"
import { patch } from "./vdom/patch"

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