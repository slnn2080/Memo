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
