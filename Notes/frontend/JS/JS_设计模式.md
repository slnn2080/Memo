# 设计模式: 
一种书写代码的方法 为了解决特定的问题给出的简洁而优化的解决方案

设计模式主要是针对面向对象编程模式  
面向对象可以理解为 划分了一个单独的命名空间 并将属性和方法组织在一起的一种方式

<br>

# 工厂模式:
我们在学js基础的时候 接触过 工厂函数 比如
```js
function CreatePerson(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}

let person = new CreatePerson("sam", 18, "男")
```

当我们new的时候 通过传入参数 可以得到 不同的对象 这就是最简单的工厂模式

<br>

### **复杂的工厂模式:**
我们看看下面的 复杂的工厂模式  
当一个对象身上的 属性 和 方法 足够多的情况下, 我们可以考虑将公共的属性和方法 抽成父类 让子类继承父类上面公共的方法

每一个子类能够实现自己关于实例的创建过程 也就是说父类解决的是一般性的问题 子类解决的是独立的自己的问题

<br>

### **<font color="#C2185B">优点:</font>**
弱化代码之间的耦合 如果以前的工厂函数中的逻辑太多的话 我们可以通过该方法来减少代码之间的耦合 防止代码的重复  
复杂的代码放在父类中, 子类去做自己的业务逻辑

<br>

### **<font color="#C2185B">要点:</font>**
- 父类是一个抽象类(Ts中父类不能直接实例化)
- 子类实现自身的实例方法

<br>

### **<font color="#C2185B">概述:</font>**
比如我们想创建一个 商品对象 该对象有
- 获取 售卖的商品名(getter属性)
- 售卖 商品 方法
- 制造 商品 方法(得到商品对象(实例))

那我们应该怎么做？

```js
class Adi {

  constructor(name) {
    this.name = name
  }

  // 获取 售卖商品 名称
  get goodName() {
    return this.name ? this.name : "未设置商品名称"
  }

  // 售卖的方法
  sellAdi() {
    console.log("售卖阿迪")
  }

  // 促销的方法
  salesPromotion() {
    console.log("现在开始促销活动开始了")
  }

  // 告罄的方法
  ranOut() {
    console.log("现在已经告罄了")
  }
}

let adi = new Adi("阿迪")
console.log(`售卖的商品是: ${adi.goodName}`)

adi.sellAdi()
adi.salesPromotion()
adi.ranOut()
```

上面我们创建了一个 Adi 的对象 里面有获取售卖的商品名称 和 不同的方法  
但是我们思考下 如果我们还想创建 耐克对象 乔丹对象 等不同对象 应该怎么做? 再创建不同的类么?

这时 我们就可以使用 工厂模式
我们可以创建 父类 和 子类

<br>

**父类负责:**   
**父类作为 抽象类 不可以通过父类实例化**  
- 售卖商品对象
- 创建商品对象(让子类去重写该方法 父类不负责实例化对象)

父类中定义好这些方法后 是不是子类就可以继承到 也就是说 将公共的方法 和 属性定义在父类中 子类就可以只专注自己的逻辑就可以了

<br>

### 实现:
创建 Shop 父类  
**注意:** 当子类继承父类中 父类中的this还是指向子类的实例对象

<br>

**要点:**  
在继承的关系下 当子类继承了父类后 使用了 父类中的方法 这时当我们通过 子类实例对象调用父类中的方法时  
父类方法中的this 其实就是子类对象 (是不是谁调用方法 this就是谁)  
那也就是说 在父类的方法中 我们可以通过 this 间接的调用子类中的方法 因为最后是 子类的实例对象调用父类中的方法

我们在 父类中的 售卖 sell() 方法中 通过this可以调用子类的属性和逻辑
子类可以通过继承调用父类中的sell()方法
而 sell() 方法中的this还是子类的实例对象 **所以通过this可以完成子类写的特有的逻辑**

<br>

**逻辑:**  
我们把共同的方法放在父类中  
子类定义自己的独特的专属的方法 这样 父类的方法中可以通过this来调用这些独特的方法

```js
class Shop {
  constructor(name) {
    this.name = name
  }

  // sell是定义在父类中的通用方法 我们在这个方法中 会通过this调用各个子类的特有逻辑
  sell() {
    // 这样 子类通过继承可以调用sell() 同时sell()方法中的this 还是子类的实例对象 这样就可以
    console.log(this)
    console.log("售卖的商品是: " + this.goodName)

    // 执行 子类特有的逻辑
    this.salesPromotion()
    this.ranOut()
  }

  get goodName() {
    return this.name
  }
}
```

创建子类  
```js
// 创建 Adi 子类
class Adi extends Shop {

  constructor(name) {
    super(name)
  }

  // 封装 Adi 特有的逻辑
  // 促销的方法
  salesPromotion() {
    console.log("adi现在开始促销活动开始了")
  }

  // 告罄的方法
  ranOut() {
    console.log("adi现在已经告罄了")
  }
}


// 创建 Nick 子类
class Nick extends Shop {

  constructor(name) {
    super(name)
  }

  salesPromotion() {
    console.log("nick现在开始促销活动开始了")
  }

  // 告罄的方法
  ranOut() {
    console.log("nick现在已经告罄了")
  }
}


let adi = new Adi("阿迪")
// 调用继承来的 sell()
adi.sell()

let nick = new Nick("Nick")
nick.sell()
```

这样 我们将通用的方法 定义在父类中 当有不同的商品的时候 我们创建不同的子类来继承父类就可以了

我们还可以对上面的方式 完善一下  
我们可以将子类中特有的方法 封装成一个对象 方便调用 这里我们可以利用 子类重写父类中的方法 的逻辑来完成

要点:  
我们在父类中 定义一个方法 但是该方法 父类不能调用 必须通过子类来调用

```js
class Shop {
  constructor(name) {
    this.name = name
  }


  sell() {
    console.log("售卖的商品是: " + this.goodName)

    // 子类中 将 特有逻辑 封装在一个对象中 我们通过this找到子类 然后获取子类中封装好的特有逻辑对象
    let logic = this.getInstanceMethod()
    logic.salesPromotion()
    logic.ranOut()
    
  }

  get goodName() {
    return this.name
  }


  // 子类需要重写该方法
  getInstanceMethod() {
    // 如果通过父类的实例对象调用则抛出错误
    throw new Error("该方法不能通过父类实例调用")
  }
}
```

子类
```js
class Adi extends Shop {

  constructor(name) {
    super(name)
  }

  // 重写父类中的 getInstanceMethod 方法
  getInstanceMethod() {

    return {
      // 促销的方法
      salesPromotion() {
        console.log("adi现在开始促销活动开始了")
      },
      // 告罄的方法
      ranOut() {
        console.log("adi现在已经告罄了")
      }
    }
  }
}

let adi = new Adi("阿迪")
adi.sell()
```

<br>

# 状态模式：
状态模式 和 状态机 都是用于解决状态的流转 它可以清晰的描绘出 当前状态要触发什么事件 转换到下一个状态 然后处理什么样的逻辑

在开发过程中可能会经常遇到这样的情况 比如我们做一个商城的页面我们可能会完成从下单到发货 从发货到派件 这些都是不同状态的流转 我们可以通过状态机来描述整个的链路流程

<br>

### **<font color="#C2185B">场景1：</font>**
我们模拟一个开关灯的场景  

**需求1:**  
点击电灯的按钮 控制电灯展示 第一次点击按钮展示 开灯 再次点击展示关灯

**需求2:**  
点击电灯的按钮 控制电灯展示 第一次点击按钮展示 弱光 - 强光 - 关灯

```html
<button>开关</button>
```

我们先看看很惨的实现方式:
```js
const btn = document.querySelector("button")
let flag = true
btn.addEventListener("click", function() {
  if(flag) {
    console.log("开灯")
    flag = false
  } else {
    console.log("关灯")
    flag = true
  }
})
```

<br>
  
完成的比较好的逻辑的话 可以这样：  

类中维护的实例属性:
- state:  
表示 灯 的状态

- button:  
通过 实参传递进来

<br>

类中维护的方法:
- init():  
给 button 绑定点击事件 点击的时候触发 处理函数

- buttonWasPressed()  
根据 对应的状态 做对应的逻辑

```js
class Light {
  // 电灯的状态 初始值为 off 表示电灯是关闭的
  state = "off"
  
  // 将页面中的 button 元素 放到实例上
  constructor(button) {
    this.button = button
    this.init()
  }


  init() {
    // 这里使用箭头函数 如果使用 function 的形式 内部的this会指向 button
    this.button.addEventListener("click", () => {
      // 如果写function的话 this是button 箭头函数的话是实例

      // 当按钮被点击的时候触发该事件
      this.buttonWasPressed()
    })
  }


  // 该方法会判断 state 状态 不同的状态做不同的事情
  buttonWasPressed() {

    if(this.state == "off") {
      console.log("开灯")
      this.state = "on"

    } else if(this.state == "on") {
      console.log("关灯")
      this.state = "off"
    }

  }
}

// 实例化 传入 button
new Light(document.querySelector("button"))
```


我们发现上面的操作后我们就完成了 需求1 逻辑为判断 初始状态 是否为 off 如果是 进行想要处理的逻辑 然后更新为下一个状态 然后再次判断是否是 下一个状态 进行想要处理的逻辑 然后更新为再一下状态 **最后成为一个闭环**

但是 当我们完成需求2的时候 又会扩展 buttonWasPressed() 方法中的 if else 逻辑
```js
buttonWasPressed() {
  /*
    if(this.state == "off") {
      console.log("开灯")
      this.state = "on"

    } else if(this.state == "on") {
      console.log("关灯")
      this.state = "off"
    }
  */

  // 先判断是否为初始状态
  if(this.state == "off") {

    // 进行逻辑
    console.log("弱光")

    // 更新为下一个状态
    this.state = "weakLight"

  // 先判断是否为 对应的状态
  } else if(this.state == "weakLight") {

    // 处理逻辑
    console.log("强光")

    // 更新为再下一个状态
    this.state = "strongLigt"

  // 闭环
  } else if(this.state == "strongLigt") {
    console.log("关灯")
    this.state = "off"
  }
} 
```

也就是说每次我们想 增加状态的时候 都会添加大量的 if else 
这样的写法 代码的局限性就非常的大 会有如下的不足

- 违背了 开闭原则   
没有办法拓展 和 修改 

- 它是一个胖函数  
这个类封装了所有的状态在里面 每一次新增状态的话 就意味着这个函数会越变越大

- 状态切换不明显  
如果我们在if体里面写多的逻辑代码 可能会在最后忘记更新状态

4. 切换关系不明显   
都是 弱光 - 强光 - 关灯 都是这一个顺序 我们没有办法从代码上直接能看到状态的变化(切换)

<br>

### **<font color="#C2185B">解决方式: 状态模式</font>**
状态模式是将当前的**每一个状态封装为一个单独的类** 比如上面的代码是关灯 开灯两个个状态 所以我们就需要封装2个类
对于上面的需求2的话 我们就可以再扩展一个类 封装3个类 分别是 
- 关灯状态的类
- 弱光状态的类
- 强光状态的类

上面我们之所以说它是一个胖函数 就是因为状态都放在了一个函数中 更改状态的逻辑也在一个函数中  
所以我们能想到的就是更改状态的逻辑能不能不放在一个函数中 而是放在对应的状态类中  

下面我们对不同的状态封装了不同的类 那么是不是说 修改状态的方法也应该在该类中

也就是说 
- **状态要单独封装成一个类**
- **状态类中也要有操作状态的方法**


<br>

### **<font color="#C2185B">思路:</font>**  
- Light类中定义 3种状态的属性 值为 状态类的实例对象 同时定义 currentState 为当前是何种状态  
状态的流转也是在状态类中完成
```js 
offLightState = new OffLightState(this)
weakLightState = new WeakLightState(this)
strongLigtState = new StrongLigtState(this)

currentState = this.offLightState
```

- 我们会调用 状态类中修改状态的方法 在内部做逻辑处理 和 修改 Light 的状态 
- 我们会将 Light 实例传入到状态类中 方法状态类操作 Light 类

<br>

将所有的状态分别封装成各自的类
```js
// 关灯状态的类
class OffLightState {

  // 将 Light 类的实例对象传递进来 通过它修改 Light 类中的状态
  constructor(light) {
    this.light = light
  }


  // 修改状态的方法
  buttonWasPressed() {
    // 做逻辑处理
    console.log("弱光")

    // 修改 Light 类中的状态 做状态的更新
    this.light.currentState = this.light.weakLightState
  }
}

// 弱光状态的类
class WeakLightState {
  constructor(light) {
    this.light = light
  }

  buttonWasPressed() {
    console.log("强光")
    this.light.currentState = this.light.strongLigtState
  }
}

// 强光状态的类
class StrongLigtState {
  constructor(light) { 
    this.light = light
  }

  buttonWasPressed() {
    console.log("关闭")
    this.light.currentState = this.light.offLightState
  }
}
```

- 在 Light 类中初始化 状态信息  
  创建 currentState 初始状态变量指向 3种状态中的一种 我们会通过该变量控制当前类的状态


- 灯 和 3个状态之间是从属关系

**总结:**  
- 将状态和Light类关联起来
- 每个状态对应的逻辑分别放在了3个状态类中的  
将胖函数中的每个状态单独的提取出来封装成了状态类

3. 在状态类中调用父类的setState()方法 设置状态

```js
// 灯里会有3个状态
class Light {

  // 每个状态作为 Light 身上的属性

  // 获取3种状态 初始化3种状态 传递this
  offLightState = new OffLightState(this)
  weakLightState = new WeakLightState(this)
  strongLigtState = new StrongLigtState(this)

  // 初始状态
  currentState = this.offLightState
  

  // 将页面中的 button 元素 放到实例上
  constructor(button) {
    this.button = button
    this.init()
  }

  init() {
    this.button.addEventListener("click", () => {
      // currentState指向了 OffLightState类 所以有 buttonWasPressed() 方法
      // 调用对应类中的改变状态的方法
      this.currentState.buttonWasPressed()
    })
  }
}

new Light(document.querySelector("button"))
```

上面我们是相当于在子类中更改了父类中的状态(我们在new子类的对象的时候传入了代表父类实例的this 然后在子类中拿到父类的实例对象 修改父类中的状态)

但是这种方法并不推荐(vue react<font color="#C2185B">都不会在子类中修改父类的状态</font>)

<br>

### **<font color="#C2185B">最终方案:</font>**
我们在 Light类中 定义 setState() 方法  

状态类中在修改状态的逻辑中 会调用 Light 的修改状态的方法 我们将新状态传入 相当于修改状态的方法定义在父类中 子类只是传递新的状态而已

Light类中 定义修改 本类状态的方法  
该方法让子类通过 父类的实例(this.light = light)的light 调用setState()方法 将最新的状态传递过去即可

```js
// Light类
setState(newState) {
  this.currentState = newState
}
```

```js
// 关灯状态的类
class OffLightState {

  // 将 Light 类传递进来 因为要更改light中的状态
  constructor(light) {
    this.light = light
  }

  // 每个类中会有改变 本状态 的方法
  buttonWasPressed() {
    console.log("弱光")

    // 更新状态 调用"父类"中的更新状态的方法 将我们要更新为的state传递进去
    this.light.setState(this.light.weakLightState)
  }
}
```

这样就是我们修改父类中的状态 调用的是父类中的方法 传递的是父类中的属性

<br>

### **<font color="#C2185B">完成代码:</font>**
当我们想添加状态的时候 我们只需要添加一个新的类就可以了

```js
// 关灯状态的类
class OffLightState {

  // 将 Light 类传递进来 因为要更改light中的状态
  constructor(light) {
    this.light = light
  }

  // 每个类中会有改变 本状态 的方法
  buttonWasPressed() {
    console.log("弱光")

    // 更新状态 调用"父类"中的更新状态的方法 将我们要更新为的state传递进去
    this.light.setState(this.light.weakLightState)
  }
}

// 弱光状态的类
class WeakLightState {
  constructor(light) {
    this.light = light
  }

  buttonWasPressed() {
    console.log("强光")
    this.light.setState(this.light.strongLigtState)
  }
}

// 强光状态的类
class StrongLigtState {
  constructor(light) { 
    this.light = light
  }

  buttonWasPressed() {
    console.log("关闭")
    this.light.setState(this.light.offLightState)
  }
}



class Light {
  
  // 获取3种状态
  offLightState = new OffLightState(this)
  weakLightState = new WeakLightState(this)
  strongLigtState = new StrongLigtState(this)

  // 初始状态
  currentState = this.offLightState
  

  // 将页面中的 button 元素 放到实例上
  constructor(button) {
    this.button = button
    this.init()
  }

  init() {
    this.button.addEventListener("click", () => {
      this.currentState.buttonWasPressed()
    })
  }

  // 
  setState(newState) {
    this.currentState = newState
  }
}

new Light(document.querySelector("button"))
```

<br>

### **<font color="#C2185B">使用 状态机 的方式对上进行再次修改:</font>**
第二版的代码有点零散   
<font color="#C2185B">状态机就是将所有的状态整合到一个对象中 状态机也叫做 FSM</font>

```js
// 将 3 种状态 整合到一个对象里面
let FSM = {
  // 下面对象中的this 应该指向 Light 类 因为调用的是 Light 类中的 setState 方法 所以这个this要通过 在Light类中 通过 call(this) 传递过来
  off: {
    buttonClick() {
      console.log("弱光")
      this.setState(this.weakLightState)
    }
  },
  weakLightState: {
    buttonClick() {
      console.log("强光")
      this.setState(this.strongLigtState)
    }
  },
  strongLigtState: {
    buttonClick() {
      console.log("关灯")
      this.setState(this.offLightState)
    }
  },
}


class Light {
  
  // 获取3种状态
  offLightState = FSM.off
  weakLightState = FSM.weakLightState
  strongLigtState = FSM.strongLigtState

  // 初始状态
  currentState = this.offLightState
  
  constructor(button) {
    this.button = button
    this.init()
  }

  init() {
    this.button.addEventListener("click", () => {
      // 调用方法 这里要注意将 this 传递过去 因为状态对象中要使用this
      this.currentState.buttonClick.call(this)
    })
  }

  setState(newState) {
    this.currentState = newState
  }
}

new Light(document.querySelector("button"))
```

<br>

# 单例模式:
一个构造函数一生只能有一个实例 不管new多少次都是这一个实例


### **<font color="#C2185B">单例模式逻辑</font>**
核心代码如下：
```js 
  function Person() {
    this.name = "sam"
  }

  // 定义全局的变量 用于创建共通实例对象
  let instance = null
  
  function singleTon() {

    if(!instance) {
      instance = new Person()
    }

    return instance
  }


  // 创建实例对象
  let p1 = singleTon()
  let p2 = singleTon()

  console.log(p1 == p2);      // true
```

<br>

### **<font color="#C2185B">代码解析：</font>**
当我们第一次调用 singleTon() 时候 instance = null 这时候我们走的是 如下的逻辑
```
if(!instance) {
  instance = new Person()
}
```

我们在堆空间中创建了一个对象 将地址值给了 instance 这时候instance中保存的就是堆空间中 new Person() 这个对象的地址值 然后 return instance 这个地址值 赋值给了 p1

当我们第二次调用 singleTon() 时候 因为 instance 不是空了 所以直接走了 return instance 这个逻辑 *再一次* 同一个地址值给了p2 所以我们以后不管调用几次 都是同一个地址值 也就是指向了同一个对象

<br>

上面在介绍逻辑的时候 代码太多零散 现在我们整合好一个函数中

- 我需要把 instance 变量保存下来
- 我需要通过一个函数来实现创建单例对象的逻辑
- 单例模式一般是不传递参数的 因为只有第一次传递的参数才有效

所以我们以后不管调用几次 都是同一个地址值 也就是指向了同一个对象

<br>

### **<font color="#C2185B">单例模式代码</font>**
上面在介绍逻辑的时候 代码太多零散 同时定义了全局变量 这样并不友好 现在我们整合好一个函数中

1. 我需要把 instance 变量保存下来
2. 单例模式一般是不传递参数的 因为只有第一次传递的参数才有效

```js 
  // singleTon 让它得到的是 return的function 让它的值等于一个自执行函数 这样相当于直接赋值
  const singleTon = (function() {

    // 我们将构造函数 和 原型型添加的方法逻辑 都利用闭包保存在函数内部
    function Person(name, age) {
      this.name = name
      this.age = age
    }

    Person.prototype.sayHi = function() {
      console.log(this.name)
    }

    // 利用闭包
    let instance = null

    return function(...args) {

      if(!instance) instance = new Person(...args)
      return instance

    }
  })()

  // 单例模式一般不传递参数
  const p1 = singleTon("sam", 18)
```

<br>

### **<font color="#C2185B">改造成es6的语法结构</font>**
通过调用静态方法来完成 单例模式
```js 
class Person {

  static instance = null

  constructor(name, age) {
    this.name = name
    this.age = age
  }

  static createInstance(name, age) {
    if(!Person.instance) Person.instance = new Person(name, age)
    return Person.instance
  }
}

const p1 = Person.createInstance("sam", 18)
console.log(p1)    // Person {name: 'sam', age: 18}

const p2 = Person.createInstance("erin", 16)
console.log(p2)     // Person {name: 'sam', age: 18}

console.log(p1 == p2)  // true
```

<br>

赋值方式: 后期赋值
```js
class SingleTon {

  static instance = null

  // 定义 constructor 赋值用
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  static createInstance(name, age) {
    if(!SingleTon.instance) {
      SingleTon.instance = new SingleTon(name, age)
    }

    return SingleTon.instance
  }
}


// 调用静态方法的时候传递参数
let s1 = SingleTon.createInstance("sam", 18)
```


赋值方式: 类中就已经赋值完毕
```js
class SingleTon {

  static instance = null
  static name = "sam"
  static age = 18

  constructor(name, age) {
    this.name = name
    this.age = age
  }

  static createInstance() {
    if(!SingleTon.instance) {

      // 通过 类中定义的静态属性来赋值
      SingleTon.instance = new SingleTon(SingleTon.name, SingleTon.age)
    }

    return SingleTon.instance
  }
}

// 调用静态方法的时候传递参数
let s1 = SingleTon.createInstance("sam", 18)
```


根据java延伸的思路 饿汉式单例
```js 
  class Person {
    static instance = new Person()

    static createInstance() {
      return Person.instance
    }

  }

  const p1 = Person.createInstance()
  const p2 = Person.createInstance()

  console.log(p1 == p2)
```

<br>

### **<font color="#C2185B">应用场景: 自定义弹出层</font>**
我们alert的弹出层很丑 不适合我们高大上的页面 这时候我们就自己写一个弹出层  
那这个弹出层每次显示都是一个新的div 还是一个div来回来去的显示

应该是一个div来回显示 只是里面的内容不一样 这时候我们就可以使用单例模式 不管是new多少次 我们只是改里面的文本内容

<br>

# 观察者模式:
监控一个对象的状态 一旦状态发生变化 马上触发技能

观察者 和 发布订阅 是两个设计模式 (vue作者认为它俩是一个东西)

**思路:**  
我们想想 监控 我们在教室里就是 *被观察者* 在监控后面的老师就是 *观察者*
当被观察者触发了一些条件的时候 观察者就会触发一些技能

观察者的技能是看 被观察者什么时候触发条件

<br>

**实现:**  
我们需要两个构造函数来实现
- 创建被观察者
- 创建观察者

当被观察者的状态发生变化的时候 会触发被观察者的事件

<br>

### **<font color="#C2185B">创建观察者类:</font>**
构造器中要写上当被观察者的状态发生变化的时候 触发的事件
```js 
class Observer {

  /*
    name: 观察者的身份
    fn: 当被观察者的状态发生变化的时候 要执行的fn
  */
  constructor(name, fn = () => {}) {
    this.name = name
    this.fn = fn
  }
}
```

<br>

### **<font color="#C2185B">创建被观察者类:</font>**
这个类中应该有  
- 状态
- 观察者列表  
用于保存观察的人
- 改变状态的方法
- 添加观察者的方法
- 删除观察者的方法

**核心:**  
当我们调用 **改变被观察者的状态方法** 的时候 同时触发保存在队列中对象中的方法
```js 
  class Subject {
    constructor(state) {
      // 记录自己的状态
      this.state = state

      // 这个数组用来保存观察着我们的人
      this.observers = []
    }

    // 设置自己的状态
    setState(state) {
      this.state = state

      // 一旦状态改变 那么我们就触发所有观察者的技能 遍历 this.oobservers 依次触发技能
      this.observers.forEach(item => {

        // 并且把我改变的状态传回去 告诉他我改变了什么状态
        item.fn(this.state)
      })
    }

    // 添加观察者
    addObserver(obs) {
      // some只要有一个是true就返回true
      const res = this.observers.some(item => item == obs)
      if(!res) {
        this.observers.push(obs)
      }
    }

    delObservere(obs) {
      // 把obs观察者删除就可以了
      this.observers = this.observers.filter(item => item !== obs)
    }
  }
```

<br>

# 发布订阅模式
发布订阅模式: 一对多的关系 那什么是一对多的关系呢？
比如 我们要是给DOM元素绑定事件会怎么操作?
```js
test.addEventListener("click", function() {})
test.addEventListener("mousemove", function() {})
test.addEventListener("click", function() {})
```

第一个参数是事件的类型 第二个参数是回调函数 当触发事件类型的时候 执行回调函数中的方法

每一个 addEventListener 都是一个监听者  
如果我们在一个 事件类型上面click 绑定了多个回调的话 当事件被触发的时候 这3个函数都会被执行

这就是一对多的关系 上面的形式是怎么实现的？ 下面我们通过代码的方式来实现一下

<br>

### **<font color="#C2185B">场景:</font>**
买房: 房源不足 客户登记 等有房子的时候 卖房子的地方再去通知他们

<br>

### **<font color="#C2185B">发布订阅的步骤:</font>**
1. 主题是谁? (谁是发布者 谁要发布消息)
售楼处

2. 缓存列表
用来绑定监听器对应的回调函数

3. 当事件要触发的时候(状态发生变化) 要依次执行缓存列表中的函数

<br>

### **<font color="#C2185B">简单实现:</font>**
用户注册了回调 售楼处发布消息
```js
let salesOffices = {
  eventList: [],

  // 绑定事件的方法 调用该方法的时候 将回调推到 事件列表中
  subscribe(callback) {
    this.eventList.push(callback)
  },

  // 当状态发生变化的时候触发 
  publish(...args) {
    for(let i=0; i<this.eventList.length; i++) {
      let fn = this.eventList[i]
      fn.apply(this, args)
    }
  }

}

// 张三订阅了售楼处的通知回调
salesOffices.subscribe((price, area) => {
  console.log("房子单价为: " + price)
  console.log("房子面积为: " + area)
})

// 李四订阅了售楼处的通知回调
salesOffices.subscribe((price, area) => {
  console.log("房子单价为: " + price)
  console.log("房子面积为: " + area)
})

// 王五订阅了售楼处的通知回调
salesOffices.subscribe((price, area) => {
  console.log("房子单价为: " + price)
  console.log("房子面积为: " + area)
})


// 售楼处开始群发消息
salesOffices.publish(10000, 53)
```

我们上面的代码还是有些问题 现在是售楼处一经发布 所有的人都得到了消息

那假如说 张三只对 88平的房子感兴趣 李四对60平的房子感兴趣 那怎么做

```
相当于 原生js中 绑定什么事件 "click"
test.addEventListener("mousemove", function() {

})
```

我们怎么修改
```js
let salesOffices = {
  eventList: {
    area88: []
  },

  // 绑定事件的方法 调用该方法的时候 将回调推到 事件列表中
  subscribe(eventName, callback) {
    if(!this.eventList[eventName]) {
      this.eventList[eventName] = []
    } 

    this.eventList[eventName].push(callback)
  },

  // 当状态发生变化的时候触发 
  publish(eventName, ...args) {
    for(let i=0; i<this.eventList[eventName].length; i++) {
      let fn = this.eventList[eventName][i]
      fn.apply(this, args)
    }
  }

}

// 张三对88感兴趣 订阅了售楼处的通知回调
salesOffices.subscribe("area88", (price) => {
  console.log("area88 - 房子单价为: " + price)
})

// 李四对60感兴趣 订阅了售楼处的通知回调
salesOffices.subscribe("area60", (price) => {
  console.log("area60 - 房子单价为: " + price)
})

// 王五对88感兴趣 订阅了售楼处的通知回调
salesOffices.subscribe("area88", (price) => {
  console.log("area88 - 房子单价为: " + price)
})


// 售楼处开始通知 88 平房子的信息
salesOffices.publish("area88", 10000)
salesOffices.publish("area60", 12000)
```

--- 另一种相似的写法 ---

```js 
let eventObj = {
  // 事件对象
  event: {
    // 我们绑定什么事件 比如我们可以绑定 fileSuccess 事件
    fileSuccess: [],
  }
      

  // 绑定事件的on方法
  on: function(eventName, eventFn) {
    // 我们绑定的事件名称在事件对象里面的话 比如我们绑定的是 fileSuccess事件 那就把回调push到 fileSuccess对应的事件数组中
    if(this.event[eventName]) {
      this.event[eventName].push(eventfn)
    } else {
      // 如果不在的话 就创建一个该事件kv 整理成 新事件: [] 然后将回调push到新事件对应的事件数组中 做初始化的路基
      this.event[eventName] = []
      this.event[eventName].push(eventfn)
    }
  },
      
  // 定义触发事件的逻辑函数
  emit: function(eventName, data) {
    if(this.event[eventName]) {
      this.event[eventName].forEach(itemFn => {
        itemFn(data)
      });
    }
  }
}

// 当读取数据后触发 自定义事件的回调
let fs = require("fs")
fs.readFile("./output.txt", "utf-8", (err, data) => {
  if(!err) lcEvent.emit("fileSuccess", data)
})


// 自定义事件的逻辑部分
lcEvent.on("fileSuccess", (data) => {
  console.log("查看数据库")
})

lcEvent.on("fileSuccess", (data) => {
  console.log("统计年龄比例")
})

lcEvent.on("fileSuccess", (data) => {
  console.log("查看所有用户的信息")
})
```

<br>

### **场景2:**
这个模式和观察者模式很像

<br>

### **思路:**
有一个对象 有人一直看着他 当这个对象发生变化的时候 第三方通知这个看着的人 触发技能

<br>

### **例子:**
普通程序员买书 -- 去书店 -- 问 -- 没有 -- 回家 这个过程反复一直到买到书了为止  
发布订阅程序员 -- 去书店 -- 没有 -- 留联系方式 -- 一旦有了书就会接到电话 -- 触发技能去买书

上面的逻辑还是跟观察者模式很像 但是实现的逻辑 一个函数就够

只需要一个构造函数 创建一个第三方店员的身份  
其实我们在开发中用的特别多 addEventListener   
由浏览器在给你看着div 一旦触发了click行为 马上执行回调  

<br>

### **<font color="#C2185B">视频中的逻辑整理</font>**
我们想想 
  on函数 
  off函数 
  
调用的时候 是不是也要传入事件名 和 回调  
我们创建一个事件队列 类型是一个对象 因为对象可以承载 事件名 和 事件数组的形式

我们创建on方法 调用on函数的时候 将事件名 和 事件回调传入事件队列中  
我们创建emit方法 当发射事件名的时候 遍历调用事件队列中的函数

<br>

### **<font color="#C2185B">逻辑整理</font>**
消息的订阅与发布 还是理解为 

一方发布消息 比如发布 callbackSuccess 事件 并发送数据 一方订阅此消息 当发布的时候 就会调用回调 并拿到数据  
所以我们先完成发布消息方的逻辑

<br>

### **<font color="#C2185B">分析构造函数</font>**
属性：
任务队列 也叫做消息队列
```
  {
    click: [fn1, fn2, fn3],
    change: [fn1, fn2, fn3]
  }
```

一旦用户触发了click行为 就执行click对应的 函数

方法：  
向消息队列中添加内容

方法：  
删除消息队列里面的内容

方法：  
能触发消息队列里面的内容


### **<font color="#C2185B">理解上的要点:</font>**
if else逻辑 和 if(!xx) code... 逻辑的区别

A
```js 
  if(this.message[type]) {
    this.message[type].push(fn)
  } else {
    this.message[type] = []

    // 我们可以在这里添加这样的逻辑就可以了
    this.message[type].push(fn)
  }
```

B
 ```js 
  if(!this.message[type]) {
    this.message[type] = []
  } 
  this.message[type].push(fn)
 ```

上面两块代码的区别是什么?

A的逻辑咋一看没有问题 第一次走else进行初始化 第二次往数组里push元素

但实际操作的时候 发现 调用两次 o.on("click", fn1) o.on("click", fn2) 只push进去一个fn2  
原因第一次走的确实是初始化的逻辑 但是 if else 整体就会执行一次 既然走了else的逻辑 就没有push的操作 所以第二次调用的时候 才会push元素进去

而B是 可以看做两条语句 先执行if判断确实没有click 设置[] 然后下一行就是push 所以好好考虑下

有时候我们要进行严谨的判断 所以经常要使用 这种方式 

    if(!this.message[type]) return 


视频中的代码部分
```js 
class Observer {

  constructor() {
    // 消息队列 或者称为 任务队列
    this.message = {}
  }

  // 向消息队列里面添加内容
  on(type, fn) {

    if(!this.message[type]) {
      this.message[type] = []
    } 

    this.message[type].push(fn)
  }

  // 删除消息队列里面的内容
  off(type, fn) {

    // 判断 如果fn不存在 只有一个参数的情况下
    if(!fn) {

      // fn不存在代表我们要 代表我要情况click对应的事件队列
      this.message[type] = []
      // delete this.message[type]
      return
      
    }
    
    // 代表能来到这里表示fn存在
    if(!this.message[type]) return 
    this.message[type] = this.message[type].filter(item => {
      return item !== fn
    })
  }

  // 触发消息队列
  emit(type) {
    if(!this.message[type]) return
    this.message[type].forEach(item => item())
  }

}

// 创建实例
const p = new Observer()

let handleClickA = () => {
  console.log("handleClickA")
}
let handleClickB = () => {
  console.log("handleClickB")
}

p.on("click", handleClickA)
// console.log(p);
p.on("click", handleClickB)
// console.log(p);


// p.off("click")

// 删除指定事件
// p.off("click", handleClickA)

// 这个人一旦触发a行为 就要吧后面的所有事件处理函数执行掉
p.emit("click")
```

<br>

# 策略模式:
策略模式的意思是 将策略单独的封装起来 策略指的是一个个算法  
我们可以先看看下面的代码 观察下策略模式是怎么将算法提取出来的

### **示例需求:**
我们设计一个函数 用来计算给员工的年终奖  
当员工的 level 为 S 则发 4倍奖金  
当员工的 level 为 A 则发 3倍奖金  
当员工的 level 为 B 则发 2倍奖金  

```js
let calcuateBouns = function(level, salary) {
  if(level == "S") {
    return salary * 5
  }

  if(level == "A") {
    return salary * 3
  }

  if(level == "B") {
    return salary * 2
  }
}
```

上面的代码我们能看出来它是一个胖函数 也就是说我们如果往函数的内部添加分支的话 函数的体积会越来越大

也会违反设计原则中的开放 封闭原则  
**对扩展开放 对修改封闭**  
也就是说上面的代码中 如果我们想新增分支都要修改原函数 所以上面的方式并不是太友好 我们要进行优化

<br>

### **思路:**
那么上面的函数逻辑中的策略是什么？  
当 level == S 的时候 对应的策略是 salary * 5  
当中的 salary * 5 就是算法 也可以说是策略


下面我们就要将这些策略提取出来 然后修改原函数
```js
// 提取策略(算法)部分的逻辑
let performanceS = function(salary) {
  return salary * 5
}

let performanceA = function(salary) {
  return salary * 3
}

let performanceB = function(salary) {
  return salary * 3
}


// 上面我们提取了策略 现在修改原函数 根据不同的判断方式 采取不同的策略
let calcuateBouns = function(level, salary) {
  if(level == "S") {
    return performanceS(salary)
  }

  if(level == "A") {
    return performanceA(salary)
  }

  if(level == "B") {
    return performanceB(salary)
  }
}
```

但是上面的方式 虽然将策略(算法)提取出来了 但是其实并没有本质上的解决我们上面的问题 这个函数还是一个胖函数 还是没有解决开放封闭原则

我们希望的是将策略提取出来后 希望能够根据流程的方式来改变原函数执行的方式

<br>

### **面向对象编程的修改方式:**
我们这里使用 面向对象编程 思维来进行修改

首先我们是要根据 不同的等级 算出不同的奖金 那么我们可以封装一个 奖金类 奖金类中有设置奖金 和 操作奖金的方法  
其次我们要抽取策略(算法) 抽取成一个一个的策略类
```js
// 抽取策略类 3个 每个策略类中都有一个计算方法 传入工资算出该策略对应的奖金
class PerformanceS {

  // 计算年终奖的方法
  calc(salary) {
    return salary * 5
  }
}

class PerformanceA {
  calc(salary) {
    return salary * 3
  }
}

class PerformanceB {
  calc(salary) {
    return salary * 2
  }
}


// 封装一个 Bouns 奖金类
class Bouns {

  // 奖金
  salary = null

  // 绩效 strategy应该存放 策略类 类似 strategy = new PerformanceB()
  strategy = null

  // 设置奖金
  setSalary(salary) {
    this.salary = salary
  }

  // 设置绩效等级
  setStrategy(strategy) {
    // 将策略类赋值给该属性
    this.strategy = strategy
  }

  // 根据不同的级别 获取奖金
  getBouns() {
    // this.strategy 是一个 策略类 我们通过传入奖金 得到对应策略的奖金
    return this.strategy.calc(this.salary)
  }
}


// 测试
let bouns = new Bouns()
bouns.setSalary(10000)
bouns.setStrategy(new PerformanceS())
console.log(bouns.getBouns())
```

上面 当我们在有策略需要添加的时候 可以添加策略类就可以了  
上面有两个类一个是策略类 和 一个控制流程的类(获取奖金的流程类 奖金类)  
我们发现我们并不需要更新流程类中的代码 要做的只不过是增加对应的策略

<br>

### **面向过程编程的修改方式:**
面向对象的编程方式代码量会比较多 但挺好玩 下面我们看看 面向过程的编程方式

```js
// 我们还是将 策略抽离出来 将条件 和 策略组织成map的形式
let strategies = {
  S: salary => salary * 5,
  A: salary => salary * 3,
  B: salary => salary * 2,
}

let calc = (level, salary) => {
  return strategies[level](salary)
}
```

<br>

### **另一个场景**
一个问题匹配多个解决方案 但是不一定要用到哪一个方案 而且有可能随时还会继续增加多个方案

比如:  
购物车结算 我们有好多种结算方式  
1. 满100减10元
2. 满200减25元
3. 纯8折

4. 有一天可能突然打7折
5. 突然有一天还取消7折

<br>

### **逻辑代码**
参数1: 商品原价格  
参数2: 折扣活动种类 因为什么活动打折
```js
function calcPrice(price, type) {

  if(type == "100_10") {
    price -= 10

  } else if(type == "200_25") {
    price -= 25

  } else if(typeof == "80%") {
    price *= 0.8

  } else {
    console.log("没有这种折扣")
  }

  return price
}
```

商品原价格为320元 折扣活动为 满100减10元
```js
const res = calcPrice(320, "100_10")
console.log(res)
```

上面的代码完成基本的逻辑是没有问题的 但是一旦加一种折扣或者删除一种折扣 就需要回程序中改写源代码

<br>

### **自执行函数 + return函数 和 普通函数的区 要点：**
下面两种方式的结果是一样 在调用的时候都是 calcPrice() 只不过第一种自执行函数可以利用闭包保存数据

```js
const calcPrice = (function() {

    let 这里可以定义外层函数数据 供内层使用

    return 内部函数
  }
)()

const calcPrice = () => {}
```

### **策略模式的思路**
把我们的多种方案 以闭包的形式保存起来 按照传递进来的折扣和价格计算最终价格返回

对外留一个接口 可以添加和减少 折扣种类
```js 
  // 1. 自执行函数 得到的结果就是内部的return fn
  const calcPrice = (function() {

      // 折扣方案放在这里

      return function() {

      }
    }
  )()
```

阶段1  
下面的逻辑实现了一部分 但是并没有对外提供添加折扣种类 和 删除折扣种类的接口
```js 
const calcPrice = (function() {

  const sale = {
    // 满100减10
    "100_10": price => price -= 10,
    "200_25": price => price -= 25,
    "80%": price => price *= 0.8,
  }

  // 被return出去的函数 才是calcPrice本体 闭包只是为了存放数据
  return function(price, type) {

    // 判断对象中有没有这个折扣类型
    if(!sale[type]) return '没有这个折扣'

    // 如果有就执行对象中对应的逻辑 找到sale里面指定的哪个函数执行计算出结果 返回给外边
    const ret = sale[type](price)
    return ret
  }
})()

const res = calcPrice(320, "100_10")
```

阶段2  
留下添加 删除折扣种类的接口 我们要知道函数也是一个对象 向里面添加一些成员
```js  
  const calcPrice = (function() {

    const sale = {
      "100_10": price => price -= 10,
      "200_25": price => price -= 25,
      "80%": price => price *= 0.8,
    }

    function calcPrice(price, type) {
      if(!sale[type]) return '没有这个折扣'
      return sale[type](price)
    }

    // 把函数当做一个对象 向里面添加一些成员
    // 专门添加折扣的方法 使用的时候 calcPrice.add("70%", (price) => {return price *= 0.7})
    calcPrice.add = function(type, fn) {
      // 判断折扣是否存在
      if(sale[type]) return "该折扣已存在"

      // 代码来到这里 表示折扣不存在 因为是闭包 数据会存在这里面
      sale[type] = fn
      return "添加成功"
    }

    calcPrice.del = function(type) {
      // 把对应的折扣删除调
      delete sale[type]
    }

    return calcPrice
  })()

  const res = calcPrice(320, "100_10")
```

<br>

### **>用类改造一下上面的逻辑**
```js 
  class SaleCampaign {
    static sale = {
      "100_10": price => price -= 10,
      "200_25": price => price -= 25,
      "80%": price => price *= 0.8,
    }

    static add(type, fn) {
      if(SaleCampaign.sale[type]) return "该折扣已存在"
      SaleCampaign.sale[type] = fn
      console.log("折扣添加成功")
    }

    static del(type) {
      delete SaleCampaign[type]
    }

    static showCampaign() {
      console.log(SaleCampaign.sale)
    }

    calc(price, type) {
      if(!SaleCampaign.sale[type]) {
        console.log("没有这个折扣")
        return
      }

      return SaleCampaign.sale[type](price)
    }
  }

  // SaleCampaign.add("70%", price => price *= 0.7)
  // SaleCampaign.showCampaign()
  
  const instance = new SaleCampaign()
  let res = instance.calc(320, "100_10")
  console.log(res);
```


简写方式:
上面的方式很好 还提供了对外操作 映射对应的接口 
```js
let priceMap = {
  "100_10": price => price -= 10,
  "200_25": price => price -= 25,
  "80%": price => price *= 0.8
}

let calc = (type, price) => {
  return priceMap[type](price)
}

console.log(calc("100_10", 1000))
```

<br>

# 适配器模式
比如我们买了一个日本手机 韩国手机的充电器 是两头的 我们中国的插座是三头的 这样就出现了一个问题

韩国手机的充电器没有办法在中国使用 所以我们会买一个转换头 我们买的韩国手机的充电器 插入到 转换头 | 转换头 插入到家用的插座上 这就是适配器

    韩国手机充电器 -> 转换头 -> | 墙上的插座

比如还有笔记本的适配器 我们家用电是220v 而笔记本充电只需要20v 我们通过适配器将220v适配到笔记本对应的电压


### **代码中的适配器**
如果数据刚好够用的话 实际上是不需要适配的

<br>

### **模拟: 百度地图中的场景**
```js
// 谷歌地图
let googleMap = {
  // 谷歌地图提供的api
  show() {
    console.log(1)
  }
}

// 百度地图
let baiduMap = {
  // 百度地图提供的api
  show() {
    console.log(1)
  }
}


// 项目中的代码: 传入地图调用地图的api
let renderMap = map => {
  if(map.show instanceof Function) {
    map.show()
  }
}


renderMap(googleMap)  // 1
renderMap(baiduMap)   // 1
```

上面的代码只要我们传入 地图 就可以调用地图中的方法  
但是随着地图的升级 地图中的方法的名称可能就变了
```js
// 谷歌地图
let googleMap = {
  show() {
    console.log(1)
  }
}

// 百度地图
let baiduMap = {

  // 方法名变成了 display
  display() {
    console.log(1)
  }
}
```

但是我们不希望更改项目中的代码 还是希望调用这个 renderMap() 方法 能够实现传入不同的地图 仍然能通过下面的结构 绘制地图

但是现在不能了 因为百度地图中没有show() 改为display()了

```js 
let renderMap = map => {
  if(map.show instanceof Function) {
    map.show()
  }
}
```

所以我们要使用适配器模式 适配百度地图新增的这个接口(display())

**就是最新api baiduMap.display 的基础上 套了一个原先的api show()**

```js
// 适配器模式
// 创建百度地图的适配器(适配器是一个对象)
let baiduMapAdapter = {
  // 我们这里定义 项目代码中 要使用的show()方法
  show() {
    // 方法内部 调用 百度地图新的api
    baiduMap.display()
  }
}


let googleMap = {
  show() {
    console.log(1)
  }
}

let baiduMap = {
  display() {
    console.log(1)
  }
}

let rendMap = map => {
  if(map.show instanceof Function) {
    map.show()
  }
}

rendMap(googleMap)
rendMap(baiduMapAdapter)
```

<br>

### **核心:**
创建一个 适配器对象 适配器对象中定义项目中通用的show()方法
适配器对象中 定义show()方法 在show()方法中调用百度的新api display()

<br>

### **场景2:**
我们渲染页面结构的时候 都会根据接口数据 来进行渲染
那接口数据会有不同的数据结构 比如北京的数据结构
```js
// 数据结构1
let beijingData = [
  {
    id: 1,
    name: "朝阳"
  },
  {
    id: 2,
    name: "海淀"
  }
]


// 数据结构2
let beijingData = {
  "朝阳": 11,
  "海淀": 22
}
```

上面的 数据结构1 是根据函数的调用 返回数据

上面的 数据结构2 直接是个对象 地点: id 的格式


比如我们项目中的代码 固定的代码内容为 render函数需要传入一个 fn 执行fn后 渲染页面
```js
let render = fn => {
  console.log("渲染北京地图")
  console.log(JSON.stringify(fn(), null, 2))
}
```

那假如我们需要 我们将 数据结构1 转成 数据结构2 后传入 render 函数怎么操作
这时候我们就可以创建一个适配器 让 不合适的数据结构1 -> 经过适配器 -> 转化为合适的数据结构2

既然 render() 函数需要传入一个 fn 作为参数 那么我们的适配器也让它是一个函数

```js
let addressAdapter = (oldDataFn) => {
  // oldDataFn是生成数据结构1的函数 拿到旧的数据结构 在适配器的内部 转换为 合适的数据结构2
  let oldData = oldDataFn()
  let newObj = {}

  // 加工成数据结构2
  oldAddress.forEach(item => {
    newObj[item.name] = item.id
  })

  // 适配器的后面 render函数的参数最终需要一个函数 所以我们就return一个函数
  return () => {
    return newObj
  }
}

// 验证
let render = fn => {
  console.log("渲染北京地图")
  console.log(JSON.stringify(fn(), null, 2))
}


render(addressAdapter(getBeijingCity))
```

### **<font color="#C2185B">我们发现适配器模式 前后的结构都没有改变 我们只是在适配器中做适配的逻辑处理</font>**

<br>

# 责任链模式:
转接请求 比如处理对象的时候处理其中的一部分 剩下的部分如果处理不了的话  
以前我们会选择 if else 分支  
而责任链模式的话 对象中处理不了的部分会向下传递 链式的传递的过程


### **<font color="#C2185B">场景:</font>**
商城做活动  
充值 500(orderType = 1), 100% (isPay充值成功) 中 100 的优惠券

充值 200(orderType = 2), 100% (isPay充值成功) 中 20 的优惠券

不充值(orderType = 3), 可以抢到优惠券但是由根据优惠券的库存(count)来决定  会有10的优惠券


按照上面的需求 我们会写出下面的代码 下面的代码在工作中也是经常见到的
```js
let order = function(orderType, isPay, count) {
  if(orderType == 1) {
    // 充值500
    if(isPay == true) {
      // 充值成功 100%中奖
      console.log("恭喜中奖100优惠券")
    } else {
      if(count > 0) {
        console.log("恭喜中奖10优惠券")
      } else {
        console.log("很遗憾没有优惠券")
      }
    }

  } else if(orderType == 2) {
    // 充值200
    if(isPay == true) {
      // 充值成功 100%中奖
      console.log("恭喜中奖20优惠券")
    } else {
      if(count > 0) {
        console.log("恭喜中奖10优惠券")
      } else {
        console.log("很遗憾没有优惠券")
      }
    }

  } else if(orderType == 3) {
    if(count > 0) {
      console.log("恭喜中奖10优惠券")
    } else {
      console.log("很遗憾没有优惠券")
    }
  }
}
```

### **<font color="#C2185B">上面的问题:</font>**
不符合开放封闭原则

不符合单一值的原则 上面的代码分了3种情况  
  充值 500 
  充值 200
  不充值

在一个function中混了3个逻辑

<br>

### **<font color="#C2185B">修改:</font>**
根据 单一值 的原则 一个逻辑只负责一件事情  
既然上面的代码分3种情况 那我们就写3种情况

  充值 500 
  充值 200
  不充值


我们分析下上面的代码 发现else中的逻辑都是一样的 也就是最终的处理 都是一样的 这也就是不充值的情况
```js
if(count > 0) {
  console.log("恭喜中奖10优惠券")
} else {
  console.log("很遗憾没有优惠券")
}
```

同时 充值500 和 充值200 又是两种情况 我们就将这3种情况 分别封装成函数
要点:
责任链前面的链条函数里不关心 else 逻辑 因为else逻辑会交给链条末尾的函数来处理
```js
function order500(orderType, isPay, count) {
  if(orderType == 1 && isPay) {
    console.log("恭喜中奖100优惠券")
  } else {

    // 责任链模式不关心else 这里我们返回自定义字符串 只要返回这个字符串 我们就让函数继续向下传递
    return "next"
  }
}

function order200(orderType, isPay, count) {
  if(orderType == 2 && isPay) {
    console.log("恭喜中奖20优惠券")
  } else {
    return "next"
  }
}

// 末尾链条
function orderOther(orderType, isPay, count) {
  if(count > 0) {
    console.log("恭喜中奖10优惠券")
  } else {
    console.log("很遗憾没有优惠券")
  }
}
```

将 几种情况 封装成函数后 我们要将这几个函数封装成一个链条  
**老师讲的不够清晰**
```js
function order500(args) {
  let [orderType, isPay, count] = args
  if(orderType == 1 && isPay) {
    console.log("恭喜中奖100优惠券")
  } else {
    return "next"
  }
}


function order200(args) {
  let [orderType, isPay, count] = args
  if(orderType == 2 && isPay) {
    console.log("恭喜中奖20优惠券")
  } else {
    return "next"
  }
}


function orderOther(args) {
  let [orderType, isPay, count] = args
  if(count > 0) {
    console.log("恭喜中奖10优惠券")
  } else {
    console.log("很遗憾没有优惠券")
  }
}


class Chain {

  next = null

  // fn: 情况逻辑函数, next:下一个节点是谁(要执行的函数是谁)
  constructor(fn, next) {
    this.fn = fn
    this.next = next
  }


  // 设置下一个节点(链条函数) 的方法
  setNextFn(next) {
    // 将赋值后的 下一个节点返回
    return (this.next = next)
  }

  // 执行链条函数的方法
  passRequest(...args) {
    // 调用链条函数 flag: 函数的返回值
    let flag = this.fn(args)

    if(flag == "next") {
      // 如果有next 就执行next节点上的passRequest()方法 注意apply的部分
      return this.next && this.next.passRequest.apply(this.next, args)
    }
  }
}

// 创建3条链
let chainOrder500 = new Chain(order500)
let chainOrder200 = new Chain(order200)
let chainOrderNormal = new Chain(orderOther)

// 连接 链条
chainOrder500.setNextFn(chainOrder200)
chainOrder200.setNextFn(chainOrderNormal)

// 从第一根链条开始调用
chainOrder500.passRequest(1, true, 500)
// 第二根
chainOrder500.passRequest(3, true, 500)

```


### **<font color="#C2185B">优点:</font>**
符合单一值原则 和 开放封闭原则

### **<font color="#C2185B">缺点:</font>**
当前的处理场景是一个链式的 一旦链条过长 就会导致整个原型有点像原型链 链条就会很长 在实例的时候开销就比较大

有多条链的话 我们还需要绑定多次 比较麻烦
