import { compileToFunction } from "./compiler"
import { initGlobal } from "./global"
import {initMixin} from "./init"
import {initLifeCycle} from "./lifecycle"
import { initStateMixin } from "./state"
import { createElm, patch } from "./vdom/patch"


function Vue(options) {
  this._init(options)
}


// init
initMixin(Vue)

// 给 vm 扩展生命周期的方法 update render
initLifeCycle(Vue)

// 给 vm 扩展mixin的方法
initGlobal(Vue)

// 给原型扩展 $nextTick $watch
initStateMixin(Vue)


// ----- 为了方便观察前后的虚拟节点(测试用) -----
/*
  为了生成虚拟节点 需要提供 template 将其变为render 产生虚拟节点
  我们先用一个模板 然后编译成render
*/

// 返回的是render函数
let render1 = compileToFunction(`<ul a="1" style="color: red;">
  <li key="a">A</li>
  <li key="b">B</li>
  <li key="c">C</li>
</ul>`)

// 我们要传入vm 所以创建一个vm vm上才有_c()等方法
let vm1 = new Vue({data: {name: "sam"}})
let prevVnode = render1.call(vm1)
// console.log("prevVnode: ", prevVnode)


// 再整一个模版
let render2 = compileToFunction(`<ul a="1" style="color: blue;">
  <li key="a">A</li>
  <li key="b">B</li>
  <li key="c">C</li>
  <li key="d">d</li>
</ul>`)
let vm2 = new Vue({data: {name: "sam"}})
let nextVnode = render2.call(vm2)
// console.log("nextVnode: ", nextVnode)

/* 
  为了能看到页面的变化 我们将 prevVnode 生成真实的DOM 插入到页面上
  之后用 prevVnode 和 nextVnode 比较结果更新页面
*/

// 将虚拟节点创建成真实节点
let el = createElm(prevVnode)
document.body.appendChild(el)


// 我们之前的做法是 当数据发生变化的时候 拿到新的模版再次生成新的虚拟DOM 再次生成真实DOM 替换掉之前的el
/*
  这是没有diff算法的操作 直接将心的节点替换掉了老的节点
  let newEl = createElm(nextVnode)
  el.parentNode.replaceChild(newEl, el)
*/


/*
  这样不好 用户自己操作DOM 可能会有性能的浪费 比如获取元素后再操作DOM就会不停的重绘
  如果之前就是 <li>{{name}}</li> 之后还是 <li>{{name}}</li> 没有变化 用替换么 因为前后元素一致
  我们希望尽可能的复用 老的节点 所以Vue中 不是直接替换 而是比较两个人的区别之后再替换

  因为 真实节点 上的属性非常的多 而我们的虚拟DOM则没有那么多 能尽量不创建DOM就不创建DOM 这就是diff算法
*/


setTimeout(() => {
  patch(prevVnode, nextVnode)
}, 1000)


export default Vue