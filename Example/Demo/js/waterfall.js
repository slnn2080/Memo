;(function() {
  var waterfall = function(options) {
    
    // 缓存3个参数
    this.el = document.querySelector(options.el)
    this.column = options.column
    this.gap = options.gap

    // 计算当前每张图片的宽度 (1200 - gap的数量) / column
    this.itemWidth = (this.el.offsetWidth - ((this.column - 1) * this.gap)) / this.column
    
    // div > img 我们要获取 大容器下有多少个盒子
    this.oItems = this.el.children
    console.log(this.oItems)

    // 定义一个高度的初始数组 
    this.heightArr = []

    
    // this指向实例对象 它自身上没有init方法 方法在原型上
    this.init()
  }

  // 我们在waterfall的原型上挂载一个方法
  waterfall.prototype.init = function() {
    // 在内部让它执行render()
    this.render()
  }

  // 绘制
  waterfall.prototype.render = function() {
    // div > img 我们要知道大容器里面一共有多少个盒子
    console.log(this.oItems)

    // 我们现在知道每一个盒子的宽度
    var item = null, minIdx = -1
    for(var i=0; i<this.oItems.length; i++) {
      // 每一个div
      item = this.oItems[i]

      // 我们让每一个盒子的宽度等于我们刚才计算出来的值
      item.style.width = this.itemWidth + "px"

      // 接下来我们要设置每一个盒子的top left值 那也就是说我们要让每一个装图片的盒子 绝对定位
      // 设置第一行的图片盒子的位置
      if(i < this.column) {
        // 第一行的图片的top都是0px
        item.style.top = "0px"
        // 第一张的图片的left就是0 
        item.style.left = i * (this.itemWidth + this.gap) + 'px'
        // 将每一个图片盒子的高度 push到数组中
        this.heightArr.push(item.offsetHeight) // [156, 202, 160, 261, 195]
      } else {
        // 我们要找的是 高度数组中 最低高度那张图片的索引
        var minIdx = getMinIdx(this.heightArr)
        
        // 找到了 我们要将第6张图片放在哪后 我们就要设置第6张图片的位置
        // 比如我们要放到第一张图片的下方 那也就是说 是第一列 那么第一列的left值 都是一样的
        // this.oItems[minIdx]是要放在哪张图片的下方 
        // this.oItems[minIdx].offsetLeft 就是当前列的所有left值
        item.style.left = this.oItems[minIdx].offsetLeft + "px"

        // top值 怎么设置 ？
        // 当前的 最小高度的那张图片 加上 间隙
        item.style.top = this.heightArr[minIdx] + this.gap + "px"

        // 然后我们就要更新 heightArr 更新 minIdx 项的高度 还可以使用 +=
        this.heightArr[minIdx] += item.offsetHeight + this.gap

      }
    }

    // 获取高度数组中 最小高度对应的index
    function getMinIdx(arr) {
      return arr.indexOf(Math.min.apply(null, arr))
    }
  }


  // 把函数通过window暴露出去 暴露出去后 才可以new
  window.waterfall = waterfall
})()