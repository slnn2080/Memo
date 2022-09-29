### 节流 与 防抖
- 他们两个都是优化高频执行js代码的一种手段
<!-- 
    比如:
    旧款电视机的工作原理，就是一行行得扫描出色彩到屏幕上，然后组成一张张图片。由于肉眼只能分辨出一定频率的变化，当高频率的扫描，人类是感觉不出来的。反而形成一种视觉效果，就是一张图。就像高速旋转的风扇，你看不到扇叶，只看到了一个圆一样。
 -->

- 类推到js上的话, 在一定时间内，代码执行的次数不一定要非常多。达到一定频率就足够了。因为跑得越多，带来的效果也是一样。倒不如，把js代码的执行次数控制在合理的范围。既能节省浏览器CPU资源，又能让页面浏览更加顺畅，不会因为js的执行而发生卡顿。这就是函数节流和函数防抖要做的事。

> 函数节流是指一定时间内js方法只跑一次。
- 比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释。

> 函数防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。
- 比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。



### 函数节流的应用场景
- 函数节流应用的实际场景，多数在监听页面元素滚动事件的时候会用到。
- 因为滚动事件，是一个高频触发的事件。


### 函数防抖的场景
- 函数防抖的应用场景，最常见的就是用户注册时候的手机号码验证和邮箱验证了。
- 只有等用户输入完毕后，前端才需要检查格式是否正确，如果不正确，再弹出提示语。


### 防抖
- 简单的来说 就是应用了延时定时器的功能 在点击前清除定时器 让它重新计时防止误操作
- 里面的要点:
1. 闭包的应用, timer放在了 return 返回函数的外面
2. this的指向问题
3. 在内部返回函数内部执行核心函数的方式

> 防抖的基本概念
- setTimeout
- 那防抖的主要效果就是延迟一秒后执行 但是在**这段期间 点击多少次都会等1秒后执行一次**
<!-- 
    就像情侣去酒店的自动关闭的大门, 第一批情侣靠近门边, 门感应到有人, 打开门, 并且开始5秒的倒计时, 再5秒内有第二批情侣靠近门边, 门感应到人, 打开门, 重新5秒倒计时 
-->

- cleartTimeout
<!-- 5秒过去了 没人来开房了 门就闭合了 -->


> 应用防抖的地方:
- 比如改变页面大小的统计, 滚动页面位置的统计, 输入框连续输入的请求次数控制 


> 下面用防止表单多次提交的简单案例来说明防抖
- 需求:
- 假设我们现在要防止用户因为手抖多次进行付款的操作, 因此我们需要进行防抖操作


- 思路:
- 1. 点击事件, addEventListener 当按钮被点击的时候 就会触发里面的函数

- 2. 现在我们需要延迟执行 addEventListener 里面的函数, 就需要加入setTimeout 但是仅仅进行延迟执行是不够的, 因为在这个延时里如果用户继续点击的话, 并不会重新计时

- 3. 因此我们还需要加入clearTimeout来清除延迟, 我们来看看程序的大致流程

    首先点击 --- 清除延迟 --- 清除以后要重新设置定时

- 如果在规定时间内又有点击事件  那么就重新返回到清除延迟的操作  然后再次设置定时
- 如果在规定时间内没有点击事件  那么就可以执行表单的提交了, 我们只需要理清楚这个流程就可以写代码了
<!--
    5秒内不管多少次操作只会成为一次, 因为5秒内只要有事件的触发 就会重新计时, 5秒后才会提交 
-->

```js 
// 获取按钮
const btn = document.querySelector('input');

// 点击事件 真正的执行逻辑
function payMoney() {
  console.log('已剁');
}
```

> 开始进行防抖设置
- 1. 首先创建防抖函数 并且把点击事件的回调函数设置为 防抖函数 **debounce**, 那么很显然我们需要在防抖函数里面执行原来的payMoney函数, 这样我们就需要为防抖函数设置一个参数func, 并且在内部执行这个参数函数

```js
function debounce(fn) {

  fn()
  
}
```

- 2. 我们会将 payMoney函数 通过实参的方式 传递到 debounce函数 里面 在 debounce函数内部 通过形参来调用 payMoney函数 也就是说 当执行点击操作的时候 执行的是 debounce(fn) 函数里面的 fn

```js
btn.addEventListener('click', debounce(payMoney));
```

- 但是这么做 会自动调用的

- 解决方法:
- 利用 高阶函数的功能, 因为防抖函数返回了一个函数 这个函数在点击事件触发的时候才执行
```js
function debounce(fn) {

  return function() {

    fn()
    
  }

}
```

- 3. 接下来我们就可以设置延迟了, 我们可以在return的函数里面加上setTimeout, 然后在setTimeout里面, 执行payMoney(func)这个函数, 因为是延时函数 我们再定义一个参数作为延迟时间, 我们这个设置1秒
```js
function debounce(fn, delay) {

  return function() {

    setTimeout(function() {
      fn()
    }, delay)

  }

}
```

- 既然我们用了延时就要相应的清除延迟 具体清除哪个延时就需要设置变量名字, 清除延时要在建立延时的前面
- 也就是说 当我们点击 按钮之后 会先清除定时器 然后重新设置定时器

```js
function debounce(fn, delay) {

  // timer的定义提升到这里 因为闭包的原因
  let timer = null

  return function() {
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn()
    }, delay)

  }

}
```

- 我们再每次点击的时候就会执行返回函数里面的内容也就是创建变量, 清除延时, 建立延时三个步骤, 而且每次点击的执行函数都是独立的, 他们互不干涉

- 正因为他们之间没有联系, 因此清除延时在这里完全没有起作用 要让这些独立的执行函数之间有联系 就需要应用到作用域链了 就是闭包

- 我们要做的只需要把timer这个变量的定义放在返回函数的外围, 这样我们在定义监听事件的时候就同时定义了这个timer变量, 因为作用域链的关系, 所有独立执行的函数都能访问到这个timer变量 而且这个timer变量只创建了一次, 是唯一的 , 我们只不过不断给timer赋值进行延时而已 每一个清除延时就是清除上一个定义的延时 相当于多个函数公用同一个外部变量 

- 这样我们连续点击按钮5下, 但是控制台也只是显示一条信息而已 证明我们已经实现了防抖功能, 但是到这 我们防抖的第4个难点来了 这也是很多人遗漏的一点 this的问题


- **this的问题**
```js
    btn.addEventListener('click', payMoney);

    // payMoney函数里面输出this 并且不使用防抖函数看看this的指向 
    function payMoney() {
        console.log('已剁');
        console.log(this);          btn
    }


    // 我们再看看防抖函数的操作下this的指向 this的指向是window 因为回调的原因, 运行时已经在window下了, 因此我们可以在setTimeout前面就把this保存下来
    btn.addEventListener('click', debounce(payMoeny, 1000));
    

    
    function debounce(func, delay) {

        // timer在这 
        let timer;

        return function () {

            let that = this;        // 这会指向这个按钮

            clearTimeout(timer);
            let timer = setTimeout(function () {

                // 让函数成为that的方法 就会指向这个that
                // 我们再setTimeout里面用call来绑定这个this给payMoney;

                func.call(that);
                console.log(that);
            }, delay)
        }
    }
```

- **参数的问题:**
- 那么既然我们考虑到了this的情况, 那么我们也得考虑参数的问题  
- 毕竟在js里函数没有设置参数, 也是可以传入参数的 也就是每个执行函数是有可能被传入参数的, 而传入的参数是需要给payMoney函数使用的

- 因此我们这里增加参数, 并且使用apply
```js
    function debounce(func, delay) {

        let timer;

        return function () {

            let that = this;
            let args = arguments;

            clearTimeout(timer);
            
            let timer = setTimeout(function () {
                func.apply(that, args);
                console.log(that);
            }, delay)
        }
    }
```

> 整理后
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

            不确定需要补需要这个
            if(timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {      // 这里改成箭头函数了
                func.apply(that, args)
            },delay);
        }
    }
```


> 再次整理
```js 
    let btn = $("button")[0]
    btn.addEventListener("click", debounce(action, 1000, "sam"))

    // ...args接收剩余参数
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
                fn.apply(this, args)
            }, delay)
        }
    }
```

----------------

### 节流
- 简单的理解下什么是节流
- 比如海里的鲸鱼, 每隔一段时候就必须露出水面来换气, 但是鲸鱼不断的露出水面 其中的一个原因就是要保持水分滋润皮肤 

- 鲸鱼露出水面换气的过程就是节流

- 首先 鲸鱼露出水面换气, 这时候体内的氧气足够支撑30分钟 于是就潜水了 在这30分钟里面鲸鱼只要还有充足的氧气都不会冒泡了 只会等到30分钟的时候再露出水面换气

- 下一次换气以后也同样会等足时间再露出水面


- 比如我们需要统计用户滚动屏幕的行为来做出相应的网页反应, 我们就需要进行节流
- 因为用户不断的进行滚动, 就会不断的产生请求 相应也会不断增加, 容易导致网络的阻塞 那么我们就可以在触发事件的时候就马上执行任务, 然后设定时间间隔限制, 在这段时间内不管用户如何进行滚动都忽视操作 在事件到了以后如果监测到用户有滚动行为, 再次执行任务, 并且设置间隔时间


> 执行流程
- 首先触发事件, 执行任务, 并且设置时间间隔 
    如果时间间隔内有触发行为就取消任务
    如果时间间隔后有触发行为就再次执行任务和设置时间间隔


> 需求:
- 假设我们要监听用户改变页面尺寸的事件, 并且在改变尺寸的时候有响应的背景颜色的变化效果
```js
    function coloring() {
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    window.addEventListener('resize', coloring);
```

> 步骤:
- 节流的代码会和之间讲解的防抖代码有点类似
- 1. 我们首先创建一个节流函数

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
*/
        timer = setTimeout(function(){

/*
    判断触发事件是否在间隔时间内
        如果在间隔时间内, 我们就不触发事件 
        如果不在时间间隔内, 我们就触发事件

    换句话说
        如果timer被赋值了, 也就是任务还在等待执行, 暂时不改变timer的值 
        如果timer没有被赋值, 那就给它赋值执行任务就好了
                
        用if来表达 如果timer被赋值了 那就是true 那就直接返回 也就是不执行任务 ,其余的情况就是timer为false 也就是没有被赋值或者任务已经执行完了
*/
            }, delay)
        }
    }
```

- 接下
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


> 整理:
- 要点:
- 1. return 内层函数判断 timer是否有值 有值的话就**return**
- 2. 在调用完逻辑函数的之后 要将 timer = null 重置为空
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


> 方式2: 利用new Date()的方式 实现节流
- 因为核心就在于时间间隔, 另一种时间间隔就是使用Date对象

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

- 对上再次解析:
<!--    
    再次解析:
    我们假设设置的时间间隔为1小时, 最初的时候pre=0, now = 9:00(第一次执行的时候假设是9点钟)
    也就是在10点前的操作是被忽略的 因为9点-0得到的毫秒数肯定比1小时的毫秒数要大的(就是为了保证第一次是执行的1970开始到现在的毫秒数肯定比1小时大啊)
    所以执行函数 并且把pre的值修改为9点

    现在时间到了9点半 我们想要操作一下 但是9点半 - 9点的得到的是半小时 半小时小于延时时间1小时
    因此不执行函数 因为没有进入判断也不会修改pre的值

    现在时间到了10点半, 我们操作一下, 得到的是10点半 - 9点为1.5小时
    大于1小时 因此执行函数 并且把pre的值修改为当前的10点半, 这里相当于重新设置了时间点 重新进行计算
 -->

> 整理:
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
