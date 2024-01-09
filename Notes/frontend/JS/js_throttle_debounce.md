
### 节流 与 防抖
他们两个都是优化高频执行js代码的一种手段

### 比如:  
旧款电视机的工作原理, 就是一行行得扫描出色彩到屏幕上, 然后组成一张张图片。由于肉眼只能分辨出一定频率的变化, 当高频率的扫描, 人类是感觉不出来的。反而形成一种视觉效果, 就是一张图。就像高速旋转的风扇, 你看不到扇叶, 只看到了一个圆一样。

类推到js上的话, 在一定时间内, 代码执行的次数不一定要非常多。达到一定频率就足够了。因为跑得越多, 带来的效果也是一样。倒不如, 把js代码的执行次数控制在合理的范围。既能节省浏览器CPU资源, 又能让页面浏览更加顺畅, 不会因为js的执行而发生卡顿。这就是函数节流和函数防抖要做的事。

<br>
  
### 节流的概念: 
指一定时间内js方法只跑一次。  

比如人的眨眼睛, 就是一定时间内眨一次。这是函数节流最形象的解释。

<br>

### 防抖的概念
指频繁触发的情况下, 只有足够的空闲时间, 才执行代码一次。

比如生活中的坐公交, 就是一定时间内, 如果有人陆续刷卡上车, 司机就不会开车。只有别人没刷卡了, 司机才开车。

<br>

**防抖的原理是, 在一定的时间间隔内, <font color=""#C2185B>只执行最后一次触发的事件。</font>**

例如, 当一个事件频繁触发时, 防抖技术会等待一段时间, 如果在这段时间内没有再次触发事件, 就执行一次事件处理函数。

如果在等待时间内再次触发了事件, 则重新开始计时, 直到等待时间结束。

<br>
  
### 节流的应用场景
函数节流应用的实际场景, 多数在监听页面元素滚动事件的时候会用到。因为滚动事件, 是一个高频触发的事件。

防抖的典型应用场景是输入框搜索功能。当用户连续输入时, 防抖可以确保在用户输入完成后一段时间内才执行搜索操作, 避免频繁的请求, 减轻服务器负载。

<br>

**节流的原理是, 在一定的时间间隔内, <font color=""#C2185B>按固定频率执行事件。</font>**

无论事件触发频率多高, 都会按照固定的时间间隔来执行事件处理函数。例如, 如果将事件的处理函数设定为每隔100毫秒执行一次, 那么无论事件触发多频繁, 事件处理函数都会每隔100毫秒执行一次。

<br>

### 防抖的场景
函数防抖的应用场景, 最常见的就是用户注册时候的手机号码验证和邮箱验证了。  

只有等用户输入完毕后, 前端才需要检查格式是否正确, 如果不正确, 再弹出提示语。

比如改变页面大小的统计, 滚动页面位置的统计, 输入框连续输入的请求次数控制 

节流的典型应用场景是滚动加载或页面滚动监听。通过节流技术, 可以限制事件处理函数的执行频率, 避免过于频繁的触发导致性能问题。

<br>

### 总结:
虽然节流和防抖都可以控制事件的触发频率, 但它们的处理方式不同, 适用于不同的场景。

防抖适合处理频繁触发 但只需要关注最后一次触发的事件

而节流适合需要按照一定频率处理事件的情况。

根据具体的需求和场景选择适合的优化策略是很重要的。

<br><br>

## 防抖
简单的来说 就是应用了延时定时器的功能 在点击前清除定时器 让它重新计时防止误操作

<br>

### 要点:
1. 闭包的应用, timer放在了 return 返回函数的外面
2. this的指向问题
3. 在内部返回函数内部执行核心函数的方式

<br>

### 防抖的基本概念: 
**setTimeout & cleartTimeout:**  
那防抖的主要效果就是延迟一秒后执行 但是在**这段期间 点击多少次都会等1秒后执行一次**

就像情侣去酒店的自动关闭的大门, 第一批情侣靠近门边, 门感应到有人, 打开门, 并且开始5秒的倒计时, 再5秒内有第二批情侣靠近门边, 门感应到人, 打开门, 重新5秒倒计时 5秒过去了 没人来开房了 门就闭合了

<br>

### 案例: 防止表单多次提交
假设我们现在要防止用户因为手抖多次进行付款的操作, 因此我们需要进行防抖操作

<br>

**步骤1:**  
定义 逻辑函数 比如我们最终要做什么的函数
```js
function payMoney() {
  console.log("核心逻辑...")
}
```

<br>

**步骤2:**  
定义 防抖函数 参数为 核心逻辑函数fn
```js
function debounce(fn, ms) {

  return function() {

  }
}
```

<br>

**步骤3:**  
外层函数里面定义 timer  

内层函数里面使用 setTimeout 并在里面执行逻辑函数  
当再次点击按钮的时候 要清除上一次的 setTimeout
```js
function debounce(fn, ms) {

  let timer = null

  return function() {

    clearTimeout(timer)

    timer = setTimeout(function() {
      
      fn()

    }, ms)
  }
}
```

<br>

**步骤4:**  
解决this的问题  
使用 fn.call(this) 的方式 解决this问题

```js
// 普通函数解决 this
function debounce(fn, ms) {

  let timer = null

  return function() {

    let self = this

    clearTimeout(timer)
    
    timer = setTimeout(function() {
      fn.call(self)
    }, ms)
  }
}


// 箭头函数解决 this
function debounce(fn, ms) {

  let timer = null

  // 事件对象
  return function(e) {

    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(self)
    }, ms)

  }
}
```

<br>

**步骤5: 事件对象在内层函数中接收:**

<br>

**步骤6: 完成版**  
解决参数的问题 我们会通过 防抖函数 传递参数
```
debounce(fn, ms, ...args)  -->  fn.apply(this, args)  -->  payMoney(...args)
```
```js
// 逻辑函数
function payMoney(...args) {
  let [money] = args
  console.log("我付了"+ money +"元")
}

// 防抖函数
function debounce(fn, ms, ...args) {
  let timer = null

  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), ms)
  }

}

btn.addEventListener("click", debounce(payMoney, 1000, 500))
```

<br>

### 文本框 防抖设置
```js
let oInput = document.querySelector("#inp")
let area = document.querySelector(".area > span")


// 使用
oInput.addEventListener("input", debounce(action, 1000, "参数"))

function action(...args) {
  // 解构出来事件对象
  let [e] = args
  area.innerHTML = e.target.value
}

function debounce(fn, ms, ...args) {
  let timer = null

  // 事件对象
  return function(e) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      // 将事件对象传递过去
      fn.apply(this, [e, ...args])
    }, ms)
  }
}
```

<br>

### 文字理念整理
现在我们需要延迟执行 addEventListener 里面的函数, 就需要加入setTimeout 但是仅仅进行延迟执行是不够的, 因为在这个延时里如果用户继续点击的话, 并不会重新计时

因此我们还需要加入clearTimeout来清除延迟, 我们来看看程序的大致流程

```
首先点击 --- 清除延迟 --- 清除以后要重新设置定时
```

如果在规定时间内又有点击事件  那么就重新返回到清除延迟的操作  然后再次设置定时  

如果在规定时间内没有点击事件  那么就可以执行表单的提交了, 我们只需要理清楚这个流程就可以写代码了

5秒内不管多少次操作只会成为一次, 因为5秒内只要有事件的触发 就会重新计时, 5秒后才会提交 

<br>

我们再每次点击的时候就会执行返回函数里面的内容也就是创建变量, 清除延时, 建立延时三个步骤, 而且每次点击的执行函数都是独立的, 他们互不干涉

正因为他们之间没有联系, 因此清除延时在这里完全没有起作用 要让这些独立的执行函数之间有联系 就需要应用到作用域链了 就是闭包

我们要做的只需要把timer这个变量的定义放在返回函数的外围, 这样我们在定义监听事件的时候就同时定义了这个timer变量, 因为作用域链的关系, 所有独立执行的函数都能访问到这个timer变量 而且这个timer变量只创建了一次, 是唯一的 , 我们只不过不断给timer赋值进行延时而已 每一个清除延时就是清除上一个定义的延时 相当于多个函数公用同一个外部变量 

这样我们连续点击按钮5下, 但是控制台也只是显示一条信息而已 证明我们已经实现了防抖功能, 但是到这 我们防抖的第4个难点来了 这也是很多人遗漏的一点 this的问题

<br>

### 整理1
```js
let btn = document.querySelector('button');
// btn.addEventListener('click', payMoney);
btn.addEventListener('click', debounce(payMoney, 2000));

// 事件绑定的位置可以传递参数
btn.addEventListener('click', debounce(payMoney, 2000, 参数));

// 原本要执行的逻辑函数
function payMoney(args) {
    console.log('我买完了');
    console.log(this);

    // 参数最终会以数组的形式被接收
    console.log(参数: args);
}

// 防抖函数
function debounce(func, delay, ...args) {
  let timer;

  return function() {
    let that = this;   // 下面改成箭头函数了 这里可以省略

    // 不确定需要不需要这个
    if(timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {      // 这里改成箭头函数了
      func.apply(that, args)
    },delay);
  }
}
```

<br>

### 整理2
```js 
let btn = $("button")[0]
btn.addEventListener("click", debounce(action, 1000, "sam"))

// ...args接收通过debounce传递过来的除了 fn ms 之外的剩余参数
function action(...args) {      // 这里必须要展开 不然只能接到一个参数
    console.log("this", this)
    console.log("args", args)
}


function debounce(fn, delay, ...args) {
  let timer = null
  

  // 这里不能是 箭头函数 必须是function的写法 不然this是window
  return function() {         
    clearTimeout(timer)

    // 这里的this是 btn

    // 因为这里是箭头函数 所以 this 不用保存成 _this
    timer = setTimeout(() => {
      // 将args传递到核心函数中
      fn.apply(this, args)
    }, delay)
  }
}
```

<br>

### 防抖: 袁老师
当我们满足如下的三个条件的时候, 就需要使用函数防抖, 因为函数防抖在很多时候会降低用户体验的

1. 频繁调用某个函数
2. 造成效率问题 (只有造成效率问题 比如页面卡顿的时候我们才需要解决)
3. **需要的结果以最后一次调用为准 (前面不关心 只关心最后一次)**

```js
function debounce(fn, ms = 500) {
  // 定义通用timeId
  const timeId = null

  // C: 我们在调用fn的时候传递参数的话, 就会到这里
  return function(...args) {
    // 每次调用函数的时候 取消前面的定时器
    if (timeId) clearTimeout(timeId)
    timeId = setTimeout(() => {
      // A
      fn.applay(this, args)
    }, ms)
  }
}

// B
const fn = debounce(layout, 1000)
```

我们要保证 调用A的时候的this, 和调用B的时候的this是一样的, B函数的this指向谁, A就应该指向谁

而B函数就是 debounce函数中return出来的函数C, **函数C要求是一个普通函数 不能是箭筒函数, setTimeout的函数需要为箭头函数**

这样 setTimeout回调中的this就是C的this

<br><br>

## 节流

### 节流的概念
比如海里的鲸鱼, 每隔一段时候就必须露出水面来换气, 但是鲸鱼不断的露出水面 其中的一个原因就是要保持水分滋润皮肤  鲸鱼露出水面换气的过程就是节流

首先 鲸鱼露出水面换气, 这时候体内的氧气足够支撑30分钟 于是就潜水了 在这30分钟里面鲸鱼只要还有充足的氧气都不会冒泡了 只会等到30分钟的时候再露出水面换气

下一次换气以后也同样会等足时间再露出水面

比如我们需要统计用户滚动屏幕的行为来做出相应的网页反应, 我们就需要进行节流

因为用户不断的进行滚动, 就会不断的产生请求 相应也会不断增加, 容易导致网络的阻塞 那么我们就可以在触发事件的时候就马上执行任务, 然后设定时间间隔限制, 在这段时间内不管用户如何进行滚动都忽视操作 在事件到了以后如果监测到用户有滚动行为, 再次执行任务, 并且设置间隔时间

<br>

### 执行流程
首先触发事件, 执行任务, 并且设置时间间隔   
如果时间间隔内有触发行为就取消任务  
如果时间间隔后有触发行为就再次执行任务和设置时间间隔

<br>

### 需求:
假设我们要监听用户改变页面尺寸的事件, 并且在改变尺寸的时候有响应的背景颜色的变化效果
```js
function coloring() {
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = Math.floor(Math.random()*255);
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

window.addEventListener('resize', coloring);
```

<br>

### 步骤:
节流的代码会和之间讲解的防抖代码有点类似

1. 我们首先创建一个节流函数
```js
function throttle(func, delay) {

  let timer;

  return function() {
    let that = this;
    let args = arguments;

/*
  设置时间间隔 常用的还是setTimeout
  由于这个时间间隔是要给后面的任务来判断是否执行的标识 因此需要创建变量, 这个变量需要在返回函数的外围定义
  这样多个任务才可以通过闭包的形式对这个变量进行操作 最后在setTimeout里面执行任务函数 

  判断触发事件是否在间隔时间内
    如果在间隔时间内, 我们就不触发事件 
    如果不在时间间隔内, 我们就触发事件

  换句话说
    如果timer被赋值了, 也就是任务还在等待执行, 暂时不改变timer的值 
    如果timer没有被赋值, 那就给它赋值执行任务就好了
            
    用if来表达 如果timer被赋值了 那就是true 那就直接返回 也就是不执行任务 ,其余的情况就是timer为false 也就是没有被赋值或者任务已经执行完了
*/
    timer = setTimeout(function(){

    }, delay)
  }
}
```

```js
function throttle(func, delay) {
  let timer;
  return function () {
    let that = this;
    let args = arguments;

    // 如果timer为true 也就是被赋值了 那就执行返回也就是不执行任务
    if(timer) return

    // 其余的情况就是timer为false了 也就是没有被赋值或者任务已经执行完了, 那么就给timer赋值进行延迟执行 

    
    timer = setTimeout(function () {
      func.apply(that, args);

      // 延迟执行后我们要清空timer的值, 不需要使用clearTimeout 直接清空timer的值就可以了, 因为这个清空行为 是在延迟执行任务以后发生的 符合我们的节流思路 
      timer = null;
    }, delay)
  }
}

window.addEventListener('resize', throttle(coloring, 2000));
```


### 整理:
1. return 内层函数判断 timer是否有值 有值的话就**return**
2. 在调用完逻辑函数的之后 要将 timer = null 重置为空
```js 
function coloring(...args) {

let r = Math.floor(Math.random() * 255)
let g = Math.floor(Math.random() * 255)
let b = Math.floor(Math.random() * 255)

document.body.style.background = `rgb(${r}, ${g}, ${b})`;
}

window.addEventListener("resize", throttle(coloring, 1000))

function throttle(fn, delay, ...args) {

let timer = null

return function() {

  if(timer) return
  timer = setTimeout(() => {

    fn.apply(this, args)
    timer = null

  }, delay)
}

}
```

<br>

### 方式2: 利用new Date()的方式 实现节流
因为核心就在于时间间隔, 另一种时间间隔就是使用Date对象

```js
function throttle(func, delay) {

// 但是我们要和前一个时间点进行比较才能确定是否已经过了时间间隔, 因此我们还要创建一个变量  注意这个pre也是要在返回函数外围的, 避免每次执行都被自动修改了 一开始的值要设置为0 这样才可以进行运算
let pre = 0;

return function() {
  // 我们创建一个变量now来保存执行函数时的时间
  let now = new Date();

  // 这里进行判断, 如果当前执行函数的时间点 减去 前一个时间点得到的毫秒数 大于我们设置的时间间隔, 就意味着已经过了时间间隔了 我们就可以执行函数了, 执行完以后我们需要把当前时间点的毫秒数赋值给表示前一个时间点的变量

  // 这样我们就修改了pre变量的值, 因为闭包的关系 后面的执行函数就能识别到pre这个变量里面的新值了 
    if(now - pre > delay) {
      func();
      pre = now;
    }
  }
}
```

<br>

### 再次解析:
我们假设设置的时间间隔为1小时, 最初的时候pre=0, now = 9:00(第一次执行的时候假设是9点钟)

也就是在10点前的操作是被忽略的 因为9点-0得到的毫秒数肯定比1小时的毫秒数要大的(就是为了保证第一次是执行的1970开始到现在的毫秒数肯定比1小时大啊)

所以执行函数 并且把pre的值修改为9点

现在时间到了9点半 我们想要操作一下 但是9点半 - 9点的得到的是半小时 半小时小于延时时间1小时

因此不执行函数 因为没有进入判断也不会修改pre的值

现在时间到了10点半, 我们操作一下, 得到的是10点半 - 9点为1.5小时

大于1小时 因此执行函数 并且把pre的值修改为当前的10点半, 这里相当于重新设置了时间点 重新进行计算

<br>

### 整理:
```js
function coloring() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function throttle(func, delay) {
  let pre = 0;

  return function() {
    let now = new Date();
    let that = this;
    let args = arguments;

    if(now - pre > delay) {
      func.apply(that, args);
      pre = now;
    }
  }
}
```
