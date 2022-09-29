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

    // 组件的挂载的方法 将 vm 挂载到 页面 el 上 (#app)
    mountComponent(vm, el)
  }
}



