// 创建元素 就是 _c() 或者 h() 都是一个方法
// data = {} 没有附上默认值 那么当没有标签属性的时候 data就是null
export function createElementVnode(vm, tag, data = {}, ...children) {
  // 这里这么处理 如果没有data 那么key就是undefined
  let key = data?.key
  if(key) delete data.key

  return vnode(vm, tag, key, data, children)
  
}

// _v()
export function createTextVnode(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text)
}


// 创建 Vnode 的方法
// ast做的是 语法层面的转化 它描述的是语法本身 (html长什么样是能解析出来什么样)
// vnode 描述的是dom元素 可以增加一些自定义的属性 (虚拟节点可以增加很多属性 比如 vm)
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


// 看看两个虚拟节点是否是同一个
export function isSameVnode(vnode1, vnode2) {
  // 我们看看 vnode 的标签名 和 key 是否都一致
  return vnode1.tag == vnode2.tag && vnode1.key == vnode2.key
}
