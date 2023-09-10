# 数据的整理 (Class)
我们的数据逻辑 和 界面逻辑是分开的 即使没有界面我们的数据逻辑中也能体现中界面的逻辑

<br><br>

## 概述
我们有一个非常经典的移动端界面, 可以想想李老师的汉堡到家的案例
1. 商品展示
2. 修改商品数量
3. 购物车部分的功能

现在我们要用原生js实现这样的一个功能

<br><br>

## 如何整理数据

### 原始数据
我们从后台拿到的数据是原始的数据, 如果原始数据不够的话, 我们不要直接在原始数据上追加我们需要的属性 比如

**原始数据:**  
```js
goodsList: [
  {
    name: "电话",
    price: 999
  }
]
```

<br>

但是我们想要 count, total 等属性 用于表示用户选择了几个电话, 几个电话的总价是多少, 这时我们不要循环原始数据的goods数组 往里面追加 count, total 等属性, 而是应该如下的操作方式

<br>

### 基于原始数据, 扩展我们需要的数据格式
我们使用构造函数的方式基于原始数据, 给每一个商品扩展我们需要的数据和方法
```js
class Goods {

  // 用于存放原始数据
  data = null

  // 扩展需要的数据: 选择了几个
  choose = 0

  constructor(data) {
    this.data = data
  }

  // 计算总价
  getTotalPrice() {
    return this.choose * this.data.price
  }

  // 增加商品数量
  increment() {
    this.choose++
  }
  decrement() {
    if (this.choose == 0) return
    this.choose--
  }
}
```

<br>

上面我们加工了每一个goodsList中的一个对象, 为这个对象扩展了我们需要的属性的方法 下面我们再创建一个控制页面所有数据的类

<br>

### 基于Goods类, 创建页面需要的所有数据
```js
class ViewData {
  // Goods[]
  viewDataList = null

  constructor() {
    // 遍历原始的数据结构, 拿到每一个对象加工成Goods实例 放入到viewDataList中
    goodsList.forEach(goods => {
      const g = new Goods(goods)
      this.viewDataList.push(g)
    })
  }

  getTotalPrice() {
    return this.viewDataList.reduce((pre, item) => pre + item.getTotalPrice(), 0) 
  }


  // 增加某一个商品的选中数量, 利用已经封装好的一个商品的中的方法 好处就是封装性
  increment(index) {
    this.viewDataList[index].increment()
  }

  decrement(index) {
    this.viewDataList[index].decrement()
  }

}
```

这个ViewData就是页面中所有需要用到的数据 都封装在该类中 包括操作数据的方法

<br><br>