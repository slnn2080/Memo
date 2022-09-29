### 瀑布流的两种方式
> 技巧:
> $代表数字从1开始
- 我们写标签的时候 可以这样
- div.wrapper>div*40.wf-item>img[src="img/img-$.jpg"].wf-img


> Css方式
- 这个属性的兼容性不太好

```css
.wrapper {
  width: 1200px;
  margin: 0 auto;

  /* 真正起作用的就是这两个属性 */
  columns: 5;
  column-gap: 10px;
}

/* 让图片继承父级100% */
.wf-item .wf-img {
  width: 100%;
  height: auto;
}
```

```html
<div class="wrapper">
  <div class="wf-item"><img src="img/img-1.png" alt="" class="wf-img"></div>
  <div class="wf-item"><img src="img/img-2.png" alt="" class="wf-img"></div>
  <div class="wf-item"><img src="img/img-3.png" alt="" class="wf-img"></div>
</div>
```


> Js方式
- 我们要动态的设置每一张图片的宽高

- 我们先说下 html 的结构
- wrapper div
  - div  -- 图片容器
    - img


- 我们要设置图片 就是要设置 图片容器
- 既然要设置图片容器 那么就要设置 left top 那么就要 子绝父相
```css
.wrapper {
  /* 我们要设置每个图片盒子的top left 所以子绝父相 */
  position: relative;
  width: 1200px;
  margin: 0 auto;
  /* columns: 5;
  column-gap: 10px; */
}

.wf-item {
  position: absolute;
}

/* 让图片继承父级100% */
.wf-item .wf-img {
  width: 100%;
  height: 100%;
}
```

- 我们希望是以 new 的形式来使用我们定义的插件 所以要采用以下的模式来进行操作
```js
new waterfall({})
```

> 思路:
- 我们要预定定义的参数
- 1. el
- 外层容器 wrapper
- 目的:
- 1. 我们要获取里面的图片容器(图片) 通过图片容器的节点设置每张图片的位置 left top
- 2. 我们还可以获取整个wrapper的宽度 用于计算出每张图片的width

- 2. column
- 列数
- 目的:
- 用户传递进来的 用于计算每张图片的width

- 3. gap
- 间距
- 目的:
- 用户传递进来的 用于计算每张图片的width

- 4. itemWidth
- 图片的宽度
- (wrapper宽度 - 间距的数量 * 间距) / 列数

- 5. oItems:
- 图片节点的伪数组

- 6. heightArr
- 用于存放一行图片的高度 用于求出最小高度的图片对应的index 
- 找到下一行的图片要放在哪张图片的下方
- 第一行之外每次添加一张图片后 还要更新指定位置的图片高度



```html
<div class="wrapper S_waterfall">

<script src="./js/waterfall.js"></script>
<script>
  new waterfall({
    el: ".S_waterfall",
    column: 5,
    gap: 10
  })
</script>
```

> js文件部分的整理
- 首先js文件上来要用 立即执行函数包裹 因为它能够帮我们封装一个作用域 
- 好处就是让我们的变量不会造成全局的污染
```js
;(function() {

})()
```

- 这里我们不考虑用 es6的写法 因为我们要考虑到dom的兼容 之所以我们使用js的原因就是因为当前的浏览器的版本过低


> 第一行的图片的位置
- 特点:
- 全部是顶头的 top为0

- left:
- 第一个盒子为0 
- 第二个盒子是一个盒子的宽度 + 1个gap
- 第三个盒子是两个盒子的宽度 + 2个gap
- 第四个盒子是三个盒子的宽度 + 3个gap
- 第五个盒子是四个盒子的宽度 + 4个gap

> 怎么判断当前第一行的图片呢？
- 列数是5 那么第一行的图片就是 下标 0 - 4 的图片
```js
// 这就是第一行
if(i < this.column) {
  // 第一行的图片的top都是0px
  item.style.top = "0px"
  // 第一张的图片的left就是0 
  item.style.left = i * (this.itemWidth + this.gap) + 'px'

  // 将每一个图片盒子的高度 push到数组中
  this.heightArr.push(item.offsetHeight) // [156, 202, 160, 261, 195]
} else {
  // 第二行之后的逻辑
}
```

> 第二行
- 第一行的位置确定了之后 我们要看第二行 第二行第一张图片 我们要放在 第一行中 高度最小的那张的下面

- 那怎么解决这个问题呢
- 我们可以设置一个 高度的初始数组 当设置完第一行后 我们就要高度push到这个数组中 这样当我们设置完第一行之后 每张图片的高度也就确认下来了
```js
this.heightArr = []

if(i < this.column) {
  item.style.top = "0px"
  item.style.left = i * (this.itemWidth + this.gap) + 'px'


  // 将每一个图片盒子的高度 push到数组中
  this.heightArr.push(item.offsetHeight)
}
```

- 我们有了 每张图片的高度数组
- 那么我们就可以获取高度数组中 最小高度的那张图片(也就是index)
```js
function getMinIdx(arr) {
  return arr.indexOf(Math.min.apply(null, arr))
}
```

- 也就是我们能获取到 目标图片(最小高度的那张图片)
```js
let minIdx = -1

minIdx = getMinIdx(this.heightArr)

this.oItems[minIdx]
```

- 找到了第6张图片放在哪后 我们就要设置第6张图片的位置
- 比如我们要放到第一张图片的下方 那也就是说 是第一列 那么第一列的left值 都是一样的
- this.oItems[minIdx]是要放在哪张图片的下方 
- this.oItems[minIdx].offsetLeft 就是当前列的所有left值
```js
item.style.left = this.oItems[minIdx].offsetLeft + "px"
```

- top值 怎么设置 ？ 当前的 最小高度的那张图片 加上 间隙
```js
item.style.top = this.heightArr[minIdx] + this.gap + "px"
```

- 然后我们就要更新 heightArr 更新 minIdx 项的高度 还可以使用 +=
```js
this.heightArr[minIdx] += item.offsetHeight + this.gap
```

- 第7张图片以后 就是else里面的逻辑 每次循环都是走else里面的逻辑 也就是 计算最小高度 找到目标图片 设置left top 更新高度数组


> 完整代码

```js
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
```


> Vue

```js
export default class Waterfall {
  constructor(options) {
    this.el = document.querySelector(options.el)
    this.column = options.column
    this.gap = options.gap

    this.heightArr = []
    this.minIdx = -1;

    this.imgWidth = (this.el.offsetWidth - (this.column - 1) * this.gap) / this.column
    this.imgs = this.el.children

    this.init()
  }

  init() {
    // 遍历所有图片
    [...this.imgs].forEach((item, index) => {

      // 先设置每一张图片的宽度
      item.style.width = this.imgWidth + "px"

      // 第一行图片
      if(index < this.column) {
        // top
        item.style.top = "0px"
        // left
        item.style.left = index * (this.imgWidth + this.gap) + "px"

        this.heightArr.push(img.offsetHeight)

      } else {
        this.minIdx = this.getMinIdx(this.heightArr)
        
        // 找到目标图片
        item.style.left = this.imgs[this.minIdx].offsetLeft + "px"
        // 高度的话 从高度数组里面取 + gap
        item.style.top = this.heightArr[this.minIdx] + this.gap + "px"

        this.heightArr[this.minIdx] += item.offsetHeight + this.gap
      }
    })
  }

  getMinIdx(arr) {
    return arr.indexOf(Math.min(...arr))
  }
}
```

> 存在的问题
- 因为图片加载是异步的 当我们获取图片div的高度的时候 可能图片还没有回来
- 这样heightArr数组中的高度就不是正确的

> 解决方式:
- 1. 我们在 main.js 文件中 监听window的load事件 能解决 但是存在的问题是有些框架没有入口文件 比如nuxt 这种情况下怎么移植？

- 2. 使用setTimeout
- 但是这样会有上来布局是乱的 等100ms后才正常的现象

```js
mounted() {
  this.timer = setTimeout(() => {
    console.log("1")
    new W({
      el: ".S_waterfall",
      column: 5,
      gap: 10
    })
  }, 100)
}
```

- 3. getComputedStyle 网上说这个可以 事实证明也不行
```js
let itemHeight = parseInt(getComputedStyle(item, null).height)
console.log(itemHeight)
```


------

### 实现方式2
- 上面是利用if判断来先确定 第一行的图片位置
- 这个我们来处理一下思路

- 参数
- 1. 定义列数
- 2. 定义列高度数组
- 3. 单张图片的宽度
- 4. 计算出列数(给1赋值)

- 5. 计算出几列后 就在高度数组中 初始化几个 0
<!-- 
  [0,0,0]
 -->

- 6. 然后开始加载图片 在图片 load函数里面 处理接下来的逻辑
- 7. 在高度数组中设置 最小的高度 
```js
var minValue = colHeightArry[0]  //定义最小的高度
var minIndex = 0  //定义最小高度的下标
```

- 8. for循环所有列
- 如果高度数组中的每一项 < 最小高度 那么就把它设置为最小高度
```js
for(var i = 0 ; i < colCount; i ++){
  if(colHeightArry[i] < minValue){   //如果最小高度组数中的值小于最小值
    minValue = colHeightArry[i]   //那么认为最小高度数组中的值是真正的最小值
    minIndex = i  //最小下标为当前下标
  }
}
```

- 9. 设置图片的left top
- left : 最小高度的那张图片 * 图片宽度
- top: 最小高度

- 10. 设置完第一张的图片的位置后 我们更新高度数组中最小高度的那位置的高度为 += 图片的高度

- 11. 在窗口大小重置之后 重新执行 窗口加载完毕 也执行
```js
$(window).on('resize',function(){
  reset()
})

$(window).on('load',function(){
  reset()
})
```

- 定义 rest() 函数
```js
//定义reset函数
function reset(){
  var colHeightArry= []
  colCount = parseInt($('.waterfall').width()/imgWidth)
  for(var i = 0 ; i < colCount; i ++){
    colHeightArry[i] = 0
  }
  $('.waterfall img').each(function(){
    var minValue = colHeightArry[0]
    var minIndex = 0
    for(var i = 0 ; i < colCount; i ++){
      if(colHeightArry[i] < minValue){
        minValue = colHeightArry[i]
        minIndex = i
      }
    }

    $(this).css({
      left: minIndex * imgWidth,
      top: minValue
    })
    colHeightArry[minIndex] += $(this).outerHeight(true)
  })
}
```


> 网上的代码部分
```html
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.js"></script>
<script>

  var colCount   //定义列数
  var colHeightArry= []   //定义列高度数组
  var imgWidth = $('.waterfall img').outerWidth(true)   //单张图片的宽度

  colCount = parseInt($('.waterfall').width()/imgWidth)   //计算出列数
  for(var i = 0 ; i < colCount; i ++){
    colHeightArry[i] = 0
  }
  //[0,0,0]

  $('.waterfall img').on('load',function(){
  
    var minValue = colHeightArry[0]  //定义最小的高度
    var minIndex = 0  //定义最小高度的下标
    for(var i = 0 ; i < colCount; i ++){
      if(colHeightArry[i] < minValue){   //如果最小高度组数中的值小于最小值
        minValue = colHeightArry[i]   //那么认为最小高度数组中的值是真正的最小值
        minIndex = i  //最小下标为当前下标
      }
    }

    $(this).css({
      left: minIndex * imgWidth,
      top: minValue
    })
    colHeightArry[minIndex] += $(this).outerHeight(true)
  })


  //当窗口大小重置之后，重新执行
  $(window).on('resize',function(){
    reset()
  })


  //当窗口加载完毕，执行瀑布流
  $(window).on('load',function(){
    reset()
  })

  //定义reset函数
  function reset(){
    var colHeightArry= []
    colCount = parseInt($('.waterfall').width()/imgWidth)
    for(var i = 0 ; i < colCount; i ++){
      colHeightArry[i] = 0
    }
    $('.waterfall img').each(function(){
      var minValue = colHeightArry[0]
      var minIndex = 0
      for(var i = 0 ; i < colCount; i ++){
        if(colHeightArry[i] < minValue){
          minValue = colHeightArry[i]
          minIndex = i
        }
      }

      $(this).css({
        left: minIndex * imgWidth,
        top: minValue
      })
      colHeightArry[minIndex] += $(this).outerHeight(true)
    })
  }

</script>
```