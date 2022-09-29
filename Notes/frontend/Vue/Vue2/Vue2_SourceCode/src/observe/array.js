// 1. 拿到 Array构造函数的原型对象中的内容
let oldArrayProto = Array.prototype

/*
  我们不能直接修改 Array.prototype 原型对象身上的方法
  如果我们这样操作
  Array.prototype.push = function() { }

  相当于将原来的push功能干掉了 不合理 原来的方法应该还在不要影响以前的应该在原来的基础上进行扩展
*/

// 2. 通过 Object.create() 创建一个新对象
// newArrayProto.__proto__ == oldArrayProto
// 这样我们还能通过 newArrayProto读到push等方法
export let newArrayProto = Object.create(oldArrayProto)

/*
  newArrayProto是作为原型对象使用的哦

  这时候我们在这样操作就不会影响到 Array.prototype 身上的push方法了
  newArrayProto.push = function() {  }
  这样加是改变 newArrayProto 自己的原型对象 并没有改变 Array.prototype 身上的方法 所以不用担心被覆盖掉
*/

// 将能修改原数组的方法先找到
let methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "reverse",
  "sort",
  "splice"
]

methods.forEach(method => {
  // 重写这些方法 我们在 newArrayProto 身上增加这些方法
  newArrayProto[method] = function(...args) {
    // args参数: 比如 push(1)

    /*
      我们调用新的重写的方法的时候 默认会调用原来的方法
      我们要将参数 传递到原生的方法中
      同时我们还要注意 this 的问题
      oldArrayProto[method]() 相当于直接 push()

      arr.push() 谁调用的push this就是谁 所以这里我们还要将this传递过去
    */
    const result = oldArrayProto[method].call(this, ...args)


    // 插入后再做观测 没插就做观测 那叫啥逻辑

    
    // 定义变量 保存数组新增元素
    let inserted

    // Observer类中 我们将代表实例的this 绑定到了 data.__ob__ 身上 因为 本函数中的this就是 Observer类中的data 所以可以这么获取
    let ob = this.__ob__

    switch(method) {
      // 如果是这两个方法的话 参数肯定是追加的内容
      case "push":
      case "unshift":
        // 这里我们就要看追加的内容是不是对象 如果是 则做get set
        // args是数组哦
        inserted = args
        break
      
      // arr.splice(0, 1, {a:1}, {b:2}) 前两个参数表示位置和删除的个数 后面是新增的内容
      case "splice": 
        // 提取第三个参数
        inserted = args.slice(2)
        break
    }

    // console.log("新增的内容: ", inserted)

    // 如果有新增的内容则需要对新增的内容再次的进行观测
    // inserted 是数组 args是数组 args.slice返回的也是数组
    if(inserted) {
      /*
        如果我们要对数组进行观测调用的是 Observer类中的 observeArray() 方法 这个方法会遍历当前数组 拿到每一项然后对每一项进行观测
        那怎么拿到 Observer类呢?

        我们思考一个问题 重写后的方法是谁要调用
        class Observer {
          // data 就是 options 中的 data
          constructor(data) {

            if(data是数组) {

              我们是不是要在这里判断 data 是对象 还是数组 如果是数组的话
              1. 观察数组中的每一项 如果是对象再次观测其中的属性
              2. 重写数组的方法

              data是数组吧 它要调用 push 等方法

            } else {
              data不是数组
            }
          }
        }
        
        也就是说 Observer类中的data 会调用push()方法 data.push()
        那就是说谁调用的push this就是谁

        同理说明 newArrayProto[method] = function() {} 函数中的this 就是 Observer类中的data
        this == Observer.data 是同一个

        这样我们在 Observer类中这样写 将Observer中的this绑定到了 data 身上
        class Observer {
          constructor(data) {

            // 这里的this是Observer类实例
            data.__ob__ = this
          }
        }

        上面这样写完后本函数的 this 身上也有 __ob__ 代表 Observer类的实例
        我们可以通过该实例调用 observeArray() 方法了是么
      */
      
      // 调用 Observer 类中的observeArray()方法 监测数组中的数据
      ob.observeArray(inserted)
    }

    // 走到这里需要更新页面 数组变化了通知对应的watcher实现更新逻辑
    ob.dep.notify()

    return result
  }
})