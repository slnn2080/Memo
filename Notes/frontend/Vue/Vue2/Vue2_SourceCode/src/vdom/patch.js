import { isSameVnode } from "."

// 根据 vnode 创建真实的 元素
export function createElm(vnode) {
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
    // patchProps参数: 1. 节点, 2. 旧节点的标签属性, 3. 新节点的标签属性
    patchProps(vnode.el, {}, data)


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
export function patchProps(el, oldProps = {}, props = {}) {
  // console.log("el: ", el)
  // console.log("oldProps: ", oldProps)
  // console.log("newProps:", props)

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


// 比较两个虚拟节点: 初始化 和 更新 节点的功能
export function patch(oldVnode, vnode) {

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
    return patchVnode(oldVnode, vnode)
  }
}


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
  // console.log(oldVnode)
  // console.log(vnode)
  /*
    vm: Vue, tag: 'li', key: 'a', data: {…}, children: Array(1)
        data: style: {color: 'red'}

    vm: Vue, tag: 'li', key: 'a', data: {…}, children: Array(1)
        data: style: {color: 'red', background: 'blue'}
  */


  /*
    调用之前写的 patchProps() 方法来对比标签属性
    参数 
      el: 老节点 let el = vnode.el = oldVnode.el
      vnode.data: 新节点的标签属性
      oldVnode.data: 旧节点的标签属性
  */
  patchProps(el, oldVnode.data, vnode.data)


  /*
    比较两个节点的儿子节点的时候分两种情况
    1. 1方有儿子, 1方没儿子
      - 要么把儿子全部删掉 要么全部创建新儿子

    2. 2方都有儿子

    我们要针对不同的情况做处理
  */

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
}


function mountChildren(el, newChildren) {
  // 渲染新儿子 将虚拟节点变为真实节点 挂载到元素上
  for(let i=0; i<newChildren.length; i++) {
    let child = newChildren[i]

    // 将虚拟节点变为真实节点 然后插入el中
    el.appendChild(createElm(child))
  }
}


// 比较两个儿子
function updateChildren(el, oldChildren, newChildren) {
  /*
    为了比较两个儿子的时候 增高性能 会有一些优化手段
    比如之前 我们有 3个元素

    A  B  C
    □  □  □

    1  2  3
    □  □  □

    我们会
      用 1 依次和 ABC 比较 看看是否一样
      用 2 依次和 ABC 比较 看看是否一样
      用 3 依次和 ABC 比较 看看是否一样

    这样比较一圈比较消耗性能
    
    我们可以默认 
      A 和 1 是一样的
      B 和 2 是一样的
      c 和 3 是一样的

    vue2中采用双指针的方式 比较两个节点

    比如:

    head   tail
      ↓     ↓
      A  B  C
      □  □  □


     head     tail
      ↓        ↓
      A  B  C  D
      □  □  □  □

    以前有一个列表是 [A, B, C] 
    现在有一个列表式 [A, B, C, D]

    上面这种情况就是尾部追加
    双指针的意思是 给每一个列表加上前后指针

    我们从第一组AA开始比较

      A
      □

      A
      □

    情况1: AA相同的情况

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


    我们操作列表 经常会使用 push shift pop unshift 这些方法
    所以我们针对这些情况做一个优化
  */


  // 特殊情况 新旧节点标签属性都一致 只有数量上的差别 我们使用双指针的形式

  // 定义两个节点分别的头尾指针
  let oldStartIndex = 0
  let newStartIndex = 0

  let oldEndIndex = oldChildren.length - 1
  let newEndIndex = newChildren.length - 1

  // 拿到头尾指针对应的节点
  let oldStartVnode = oldChildren[0]
  let newStartVnode = newChildren[0]

  let oldEndVnode = oldChildren[oldEndIndex]
  let newEndVnode = newChildren[newEndIndex]

  /*
    console.log(oldStartVnode, newStartVnode)
    console.log(oldEndVnode, newEndVnode)
    {vm: Vue, tag: 'li', key: 'a', data: {…}, children: Array(1), …}
    {vm: Vue, tag: 'li', key: 'a', data: {…}, children: Array(1), …}
    {vm: Vue, tag: 'li', key: 'c', data: {…}, children: Array(1), …}
    {vm: Vue, tag: 'li', key: 'd', data: {…}, children: Array(1), …}
  */

  // 老新列表中 双方列表只要有一方 头 > 尾 的时候停止循环
  // && 有任何一个不满足就是false 则停止
  // || 有一个为 true 则继续走
  while(
    oldStartIndex <= oldEndIndex &&
    newStartIndex <= newEndIndex
  ) {
    
  }
}