未整理
# 待整理知识点

### 待看前端的设计模式:
- FileReader 
- Blob 
- ArrayBuffer 
- FormData 
- URL.createObjectURL 
- 上传文件 
- 后台接收

<br>

### 前端5种监视器
```s
https://mp.weixin.qq.com/s/doBnp_fN8RpH_1rBfUfwhg
```

<br>

### 百度统计代码

<br>

### 格式化
```s
https://blog.csdn.net/weixin_44875693/article/details/124196163
```

<br>

### 浮点数的处理方式
```s
https://www.cnblogs.com/CandyDChen/p/16300638.html
```

<br><br>

# 新增知识点:

### **<font color="#C2185B">new Date().toUTCString()</font>**
我们在设置 **响应头里的时间** 的时候 会使用该API将date处理下, 将时间格式转成符合响应头的格式  
- UTC(GMT): 世界统一时间

<br>

**作用:**  
toUTCString() 方法可根据世界时 (UTC) 把 Date 对象转换为字符串, 并返回结果。  
协调世界时, 又称世界统一时间, 世界标准时间, 国际协调时间, 简称UTC。
```js
let date = new Date()
console.log(date)   // 2022-11-14T07:18:29.060Z

console.log(date.toUTCString())   // Mon, 14 Nov 2022 07:18:48 GMT
```

<br><br> 

## video标签相关的知识点:

```html
<video></video>
```

<br> 

### video标签的基本用法:

**方式1. 使用src属性链接视频地址**
```html
<video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg" controls>
    你的浏览器不支持 <code>video</code> 标签。
</video>
```

<br> 

还可以根据 **source子标签** 指定视频格式
```html
<video controls>
  <source src="foo.ogg" type="video/ogg">
  <source src="foo.mp4" type="video/mp4">
  Your browser does not support the <code>video</code> element.
</video>
```

但是使用src的时候毕竟我们链接的是地址 是地址就有可能出现播放失败的情况 我们将 src属性的值 设置为 Blob对象的DOMString
```html
<video 
    src="blob:http://abc.com/d0823f0f-2b2a-4fd6-a93a-e4c82173c107">
</video>
```

上面可以这么设置是因为 src 只是 Blob的, 但是新标准建议 使用 **srcObject** 替代 src 属性
```js
const mediaSource = new MediaSource();
const video = document.createElement('video');
try {
  video.srcObject = mediaSource;
} catch (error) {
  video.src = URL.createObjectURL(mediaSource);
}
```

<br>

### srcObject标签属性:
该属性的值为: MediaStream || MediaSource || Blob || File

<br>

### video标签身上的部分事件:
**<font color="#C2185B">loadeddata</font>**  
在媒体当前播放位置的视频帧（通常是第一帧）加载完成后触发。

<br>

**<font color="#C2185B">loadedmetadata</font>**  
在元数据（metadata）被加载完成后触发

<br><br>

## 链判断运算符

### **<font color="#C2185">?.</font>**
以往我们要读取对象内容的属性的时候 往往需要判断一下 属性的上层是否存在  
比如: message.body.user.firstName

我们要层层的判断一下属性的上层有没有值 但是我们需要的属性在第4层 所以要判断4次 每一层是否有值
```js
// 错误的写法:
let name = message.body.user.firstName || "default"


// 正确的写法: 
let name = (
  message && message.body && message.body.user && message.body.user.firstName
) || "default"
```

<br>

**解决方式:**  
es6中引入了 ?. 运算符 在链式调用的时候判断  

<br>

**作用:**
左侧的对象是否为null或者undefined 如果是 null 或者 undefined 那么就返回undefined 如果不是 就执行

```js
let obj = {
  job: {
    front: "vue"
  }
}

// 没有hi则返回undefind
console.log(obj?.hi?.front)
// undefined

console.log(obj.hi.front)
// Cannot read properties of undefined (reading 'front')
```

<br>

**使用场景:**
```js
a?.b
// 等同于
a == null ? undefined : a.b


a?.[x]
// 等同于
a == null ? undefined : a[x]


a?.b()
// 等同于
a == null ? undefined : a.b()


a?.()
// 等同于
a == null ? undefined : a()
```

<br>

### **<font color="#C2185">??:</font>**
当运算符的左侧为null或者是undefined的时候 给予默认值
```js
const animationDuration = response.settings?.animationDuration ?? 300;
```

<br><br>

## 重绘后执行的回调(就当计时器用0

### **<font color="#C2185">window.requestAnimationFrame(callback):</font>**
回调函数会在浏览器下一次重绘之前执行, 有点类似 setTimeout()

代替 计时器 使用 requestAnimationFrame() 方法来修改bar的长度  

如果使用计时器每进行回调一次都会对页面造成回流重绘 而requestAnimationFrame它会将回流和重绘收集起来只走一次 性能要比计时器要好 而且它是以60的帧率进行绘制 视觉效果上也好  

回调函数执行次数通常是每秒 60 次, 但在大多数遵循 W3C 建议的浏览器中, 回调函数执行次数通常与浏览器屏幕刷新次数相匹配

<br>

**callback参数:**  
DOMHighResTimeStamp: 它表示requestAnimationFrame() 开始去执行回调函数的时刻。

```
指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间。在同一个帧中的多个回调函数, 它们每一个都会接受到一个相同的时间戳, 即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。
```

<br>

**返回值:**  
id: window.cancelAnimationFrame(): 以取消回调函数。兼容性不错

<br>

**注意:**  
该函数要配合递归使用 因为该回调只走一次

<br>

### 示例:
使用requestAnimationFrame代替setTimeout, 减少了重排的次数, 极大提高了性能, 建议大家在渲染方面多使用requestAnimationFrame

```js
const renderList = async () => {

  console.time('列表时间')

  // 获取数据
  const list = await getList()

  // 总数据条数
  const total = list.length

  // 当前页码
  const page = 0

  // pageSize: 一页显示多少条
  const limit = 200

  // 一共有多少页
  const totalPage = Math.ceil(total / limit)


  // 创建渲染函数
  const render = (page) => {
    // 递归的停止条件: 如果 页码 比 总页数 大 则停止 
    if (page >= totalPage) return

      // 使用requestAnimationFrame代替setTimeout 传入回调 该回调会在重绘前执行
      requestAnimationFrame(() => {

      // 循环 分页
      for (let i = page * limit; i < page * limit + limit; i++) {

          // 每一个
          const item = list[i]
          const div = document.createElement('div')
          div.className = 'sunshine'
          div.innerHTML = `
          <img src="${item.src}" />
          <span>${item.text}</span>
          `
          container.appendChild(div)
      }

      // 递归调用
      render(page + 1)
    })
  }

  render(page)
  console.timeEnd('列表时间')
}
```

<br><br>

## 文档碎片

### **<font color="#C2185">document.createDocumentFragment()</font>**
创建文档碎片

会返回一个文档碎片的容器, 我们可以将每次加工后的dom节点放入到容器内  
然后一次性的将 文档碎片 插入到页面中 *页面只会渲染文档碎片包裹着的元素, 而不会渲染文档碎片*

```js
const fragment = document.createDocumentFragment()
for() {
  fragment.appendChild(div)
}

// 一次性appendChild
container.appendChild(fragment)
```

<br><br>

## 滚动到指定的位置
### **<font color="#C2185">Element.scrollTo()</font>**
可以使界面滚动到给定元素的指定坐标位置。

<br>

**参数形式1: (x-coord, y-coord)**  
- x-coord: 是期望滚动到位置水平轴上距元素左上角的像素。
- y-coord: 是期望滚动到位置竖直轴上距元素左上角的像素。

<br>

**参数形式1: {options}**
```js
{
  top: 100,
  left: 100,
  behavior: 'smooth'
}
```

<br>

**兼容性:**  
ie全系列不支持

<br>

### 场景: 滚动到底部
当一个盒子内部的内容增加的时候 并且超过该盒子的高度的时候 我们希望它自动滚动到底部
```js
element.scrollTo({
  top: 100,
  left: 100,
  behavior: 'smooth'
});

element.scrollTo(0, 1000);


let box = ...
box.scrollTo({
  top: box.scrollHeight,
  behavior: "smooth"
})

```

<br>

## 奇葩的初始化逻辑:
我们可以先从一个地方取出一个变量先用 然后会其进行空判断 如果为空就赋初始值 然后在放回那个地方
```js
let obj = {}

if(!obj.name) {
  obj.name = "sam"
}

console.log(obj.name)
```

<br>

## defaultValue
**场景:**  
我想让文本框中的值 进行 修改前 和 修改后的对比
关于修改前的值 可以用 this.defaultValue 来获取

defautValue是页面加载出来后input中的初始值, value是当前input中的值

当input中的值未修改时 value == defaultValue
当修改input值时
- value为修改后的值
- defaultValue仍为之前的

<br>

# if else 减少嵌套
https://www.jianshu.com/p/ea22123d4f62

### **场景1:**
```js
if(a为真) {
  a = a
} else {
  a = b
}   

// 修改为:
a = a || b
```

<br>

### **场景2:**
```js
if(a == b){
  a = c
}else{
  a = d
}

// 修改
a = (a == b) ? c : d
```

<br>

### **场景3:**
后台接口通常会返回这种数据: 
```js
task: 0 // 0=紧急 1=日常 2=临时

// 这种时候不能用判断 我们可以这样
let mapData = ["紧急", "日常", "临时"]
let res = mapData[task]
```

<br>

### **优化 if 逻辑:**
把最可能出现的情况放在最前面, 最不可能出现的情况放在最后面

<br>

#### **使用Array的方法或者Map等数据结构: **
如果是苹果 或者 草莓的话 输出 red
```js
function test(){
  if(fruit == 'apple' || fruit == 'strawberry'){
    console.log('red');
  }
}
```

那如果我们要添加更多的条件的时候 怎么办？ 不能一直 || || || || || || 吧  
所以我们可以修改成如下的逻辑
```js
function test(fruit) {
  const redFruit = ['apple','strawberry','cherry','cranberry'];
  if(redFruit.includes(fruit)) {
    console.log("red")
  }
}
```

那如果我们有更多的颜色呢 不光光只输出红色的水果 我们可以将  
颜色 : 水果 
组织成键值对的形式 根据key 去找对应的value

```js
const fruitColor = new Map()
fruitColor.set("red", ['apple','strawberry'])
fruitColor.set('yellow',['banana','pineapple']);
fruitColor.set('purple',['grape','plum']);

function test(color) {
  return fruitColor.get(color) || []
}
```

<br>

### **策略模式:**
定义一系列的算法, 把它们一个个封装起来, 并且使它们可以相互替换  
我们将 type 作为 key, 以要执行的逻辑 作为 value, 封装到 对象中  
能够有效避免多重条件选择语句, 显得简洁易于理解。在后期扩展也只需要再对象中新增一项, 方便维护。

```js
function fn(type) {
  if(type == "a") {
    console.log("我们执行 type a 对应的逻辑")
  } else if(type == "b") {
    console.log("我们执行 type b 对应的逻辑")
  } else if(type == "c") {
    console.log("我们执行 type c 对应的逻辑")
  }
}


// 修改为 使用策略模式优化
function fn(type) {
  let handlerA = () => console.log("我们执行 type a 对应的逻辑")
  let handlerB = () => console.log("我们执行 type b 对应的逻辑")
  let handlerC = () => console.log("我们执行 type c 对应的逻辑")

  let handlerMap = {
    a: handlerA,
    b: handlerB,
    c: handlerC,
  }

  handlerMap[type] && handlerMap[type]()
}
```

<br><br>

## 优化如下情况:
咋一看没感觉有什么异常, 但如果有1000个判断条件, 按照这种写法难不成要写1000个 if 分支？
```js
if (name === "小刘") {
    console.log("刘哥哥");
} else if (name === "小红") {
    console.log("小红妹妹");
} else if (name === "陈龙") {
    console.log("大师");
} else {
    console.log("此人比较神秘！");
}
```

如果写了大量的 if 分支, 并且可能还具有分支套分支, 可以想象到整个代码的可读性和可维护都会大大降低, 这在实际开发中, 确实是一个比较头疼的问题, 那有没有什么办法能够即实现需求又能避免这些问题呢？

<br>

### 简单分支优化
```js
function getUserDescribe(name) {
    const describeForNameMap = {
        小刘: () => console.log("刘哥哥"),
        小红: () => console.log("小红妹妹"),
        陈龙: () => console.log("大师"),
        李龙: () => console.log("师傅"),
        大鹏: () => console.log("恶人"),
    };
    describeForNameMap[name] ? describeForNameMap[name]() : console.log("此人比较神秘！");
}
```

题代码中的判断都是简单的相等判断, 那么我们就可以将这些判断条件作为一个属性写到对象describeForNameMap 中去, 这些属性对应的值就是条件成立后的处理函数。

之后我们就只需通过getUserDescribe函数接收到的参数去获取describeForNameMap对象中对应的值, 如果该值存在就运行该值（因为值是一个函数）。

这样一来原本的 if 分支判断就转换成了简单的key value对应值, 条件与处理函数一一对应, 一目了然。

<br>

### 复杂分支优化
那如果我们的 if 分支中的判断条件不只是简单的相等判断, 还具有一些需要计算的表达式时, 我们该怎么办呢？（如下所示）

**我们可以引入二维数组来进行分支优化：**

```js
// 测试复杂的判断条件
function test1(str) {

    // 原生结构
    if(str.length > 5) {
    console.log(`${str}至少有5个字符`)
    } else if(str.length < 2) {
    console.log(`${str}不到2个字符`)
    } else if (str == "sam") {
    console.log(`${str}的值是sam`)
    } else {
    console.log("str的其他情况")
    }

    /*
    优化开始: 使用二维数组
    每一个分支 我们作为数组中的一个成员, 我们只写 if 和 else if 部分的逻辑
        分支中的条件: 作为二维数组中的一个成员 函数 -> 返回boolean
        分支中的逻辑: 作为二维数组中的一个成员 函数 -> 具体要执行的逻辑
    */
    const conditions = [
        [
            str => str.length > 3,
            () => console.log(`${str}至少有5个字符`)
        ],
        [
            str => str.length < 2,
            () => console.log(`${str}不到2个字符`)
        ],
        [
            str => str == "sam",
            () => console.log(`${str}的值是sam`)
        ],
    ]

    /*
    根据 方法的形参 到 conditions数组中 找到对应的成员项
        二维数组中的每个成员中的第一个元素(item[0]) 它是一个返回boolean值的函数, 我们将形参传入 会找到返回true的那个item
    */
    const condition = conditions.find(item => item[0](str))
    
    // 判断是否找到了对应的条件和执行逻辑, 如果没有则使用3元表达式 写else部分的逻辑
    condition ? condition[1]() : console.log("str的其他情况")
}

test1("sam")
```

上面我们定义了一个conditions数组, 数组内的每一个元素代表一个判断条件与其执行函数的集合（也是一个数组）, 之后我们通过数组的find方法查找conditions数组中符合判断条件的子数组即可。

<br>

**工作中的例子:**
```js
const data = require("./data.json")

const workPlaceList = () => {
  const initVal = "all"

  const list = {
    workClass1: [],
    workClass2: [initVal],
    workClass3: [initVal],
    workClass4: [initVal],
    workClass5: [initVal],
    workClass6: [initVal],
    workPlaceClass2: [initVal],
    workPlaceClass3: [initVal],
    workPlaceClass4: [initVal],
    workPlaceClass5: [initVal],
    workPlaceClass6: [initVal]
  }

  // 之前
  /*
  data.forEach(item => {
    if (item.workClass1 !== '' && !list.workClass1.includes(item.workClass1)) {
      list.workClass1.push(item.workClass1)
    }
    if (item.workClass2 !== '' && !list.workClass2.includes(item.workClass2)) {
      list.workClass2.push(item.workClass2)
    }
    if (item.workClass3 !== '' && !list.workClass3.includes(item.workClass3)) {
      list.workClass3.push(item.workClass3)
    }
    if (item.workClass4 !== '' && !list.workClass4.includes(item.workClass4)) {
      list.workClass4.push(item.workClass4)
    }
    if (item.workClass5 !== '' && !list.workClass5.includes(item.workClass5)) {
      list.workClass5.push(item.workClass5)
    }
    if (item.workClass6 !== '' && !list.workClass6.includes(item.workClass6)) {
      list.workClass6.push(item.workClass6)
    }
    if (item.workPlaceClass2 !== '' && !list.workPlaceClass2.includes(item.workPlaceClass2)) {
      list.workPlaceClass2.push(item.workPlaceClass2)
    }
    if (item.workPlaceClass3 !== '' && !list.workPlaceClass3.includes(item.workPlaceClass3)) {
      list.workPlaceClass3.push(item.workPlaceClass3)
    }
    if (item.workPlaceClass4 !== '' && !list.workPlaceClass4.includes(item.workPlaceClass4)) {
      list.workPlaceClass4.push(item.workPlaceClass4)
    }
    if (item.workPlaceClass5 !== '' && !list.workPlaceClass5.includes(item.workPlaceClass5)) {
      list.workPlaceClass5.push(item.workPlaceClass5)
    }
    if (item.workPlaceClass6 !== '' && !list.workPlaceClass6.includes(item.workPlaceClass6)) {
      list.workPlaceClass6.push(item.workPlaceClass6)
    }
  })
  */

  // 优化后
  const conditions = [
    [
      (key, value) => value && Array.isArray(list[key]) && !list[key].includes(value),
      (key, value) => list[key].push(value)
    ]
  ]

  data.forEach(o => {
    Object.entries(o).forEach(item => {
      let [key, value] = item
      let condition = conditions.find(i => i[0](key, value))
      condition && condition[1](key, value)
    })
  })

  return list
}

const res = workPlaceList()
console.log("res: ", res)



```

<br>

### 抽离分支
面例子中我们定义的这个describeForNameMap对象是一个独立的结构, 我们完全可以将它抽离出去：

```js
const describeForNameMap = {
    小刘: () => console.log("刘哥哥"),
    小红: () => console.log("小红妹妹"),
    陈龙: () => console.log("大师"),
    李龙: () => console.log("师傅"),
    大鹏: () => console.log("恶人"),
};

function getUserDescribe(name) {
    describeForNameMap[name] ? describeForNameMap[name]() : console.log("此人比较神秘！");
}
```

```js
const describeForNameMap = [
    [
        (name) => name.length > 3, // 判断条件
        () => console.log("名字太长") // 执行函数
    ],
    [
        (name) => name.length < 2, 
        () => console.log("名字太短")
    ],
    [
        (name) => name[0] === "陈", 
        () => console.log("小陈")
    ],
    [
        (name) => name === "大鹏", 
        () => console.log("管理员")
    ],
    [
        (name) => name[0] === "李" && name !== "李鹏",
        () => console.log("小李"),
    ],
];
    
function getUserDescribe(name) {
    // 获取符合条件的子数组
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

<br>

### 嵌套的if else 优化
```js
let toView = (platform = '移动端', flag = 1) => {
    if (platform === '移动端') {
        if (flag === 1) {
            view('移动页面一')
        } else if (flag === 2) {
            view('移动页面二')
        } else if (flag === 3) {
            view('移动页面二')
        } else if (flag === 4) {
            view('移动页面四')
        }
    } else if (platform === 'PC端') {
        if (flag === 1) {
            view('PC页面一')
        } else if (flag === 2) {
            view('PC页面二')
        } else if (flag === 3) {
            view('PC页面二')
        } else if (flag === 4) {
            view('PC页面四')
        }
    } 
}
```

Map对象的 key 可以是任何类型, 那么我们可以这样改写上面的代码

```js
const flagMirror = new Map([
    [{ platform: '移动端', flag: 1 }, '移动页面一'],
    [{ platform: '移动端', flag: 2 }, '移动页面二'],
    [{ platform: '移动端', flag: 3 }, '移动页面二'],
    [{ platform: '移动端', flag: 4 }, '移动页面四'],
    [{ platform: 'PC端', flag: 1 }, 'PC页面一'],
    [{ platform: 'PC端', flag: 2 }, 'PC页面二'],
    [{ platform: 'PC端', flag: 3 }, 'PC页面二'],
    [{ platform: 'PC端', flag: 4 }, 'PC页面四']
])

let toView = (platform = '移动端', flag = 1) => {
    let result = Array.from(flagMirror).find(([key, value]) => key.platform === platform && key.flag === flag)
    view(result[1])
}
```

**练习:**  
```js
// 嵌套 if else 的优化: 
// 嵌套的话 肯定有多个条件 我们将所有条件都在形参的位置上定义
function test2(name, sex) {

    // 原始结构
    if(name == "sam") {
    if(sex == "男") {
        console.log(`${name}是男人`)
    } else if(sex == "女") {
        console.log(`${name}是女人`)
    }
    } else if(name == "erin") {
    if(sex == "男") {
        console.log(`${name}是男人`)
    } else if(sex == "女") {
        console.log(`${name}是女人`)
    }
    }

    /*
    优化开始:
        我们也可以使用Map来进行优化
        我们将 一个外层的 if else if条件 多对应的子条件都罗列出来
        - 外层条件1 - 内层条件1
        - 外层条件1 - 内层条件2

        - 外层条件2 - 内层条件1
        - 外层条件2 - 内层条件2

        条件部分 我们使用对象
        执行逻辑部分 我们使用函数
    */
    const conditions = [
    [{name: "sam", sex: "男"}, () => console.log(`${name}是男人`)],
    [{name: "sam", sex: "女"}, () => console.log(`${name}是女人`)],
    [{name: "erin", sex: "男"}, () => console.log(`${name}是男人`)],
    [{name: "erin", sex: "女"}, () => console.log(`${name}是女人`)],
    ]

    // 遍历conditions 拿到对应的 条件 + 执行逻辑函数的组合
    const condition = conditions.find(([key, value]) => key.name == name && key.sex == sex)

    condition ? condition[1]() : console.log("参数错误")
}

test2("sam", "男")
```

<br>

**练习2:**  
```js
let arr = [1,2,3,4,5,6,7,8]

const getElByRange = (param, source) => {

  if(typeof param == "number") {
    let index = param - 1
    return [source[index]]
  }

  const condition = [
    [
      {type: "string", val: "~"},
      () => {
        let [begin, end] = param.split("~")
        begin--
        return source.slice(begin, end)
      }
    ],
    [
      {type: "string", val: ">"},
      () => {
        let reg = /(?<=\>)\d+/g
        let index = param.match(reg)[0]
        return source.slice(index)
      }
    ],
    [
      {type: "string", val: "<"},
      () => {
        let reg = /(?<=\<)\d+/g
        let index = param.match(reg)[0]
        index--
        return source.slice(0, index)
      }
    ],
  ]
  
  const result = condition.find(([condition, handler]) => (condition.type == typeof param) && (param.indexOf(condition.val) != -1))
  if(result) return result[1]()
}

let ret = getElByRange("<7", arr)
console.log(ret)
```

<br>

那么我们再假设一种情况, 就是 flag 值为 1 2 3 时, 处理逻辑是一样的, 比如都跳转到 【页面二】, 那么我们上面的代码可以再次升级

```js
const flagMirror = new Map([
    [/^移动端[1-3]$/, '移动页面二'],
    [/^移动端4$/, '移动页面四'],
    [/^PC端[1-3]$/, 'PC页面二'],
    [/^PC端4$/, 'PC页面四']
])

let toView = (platform = '移动端', flag = 1) => {
    let result = Array.from(flagMirror).find(([key, value]) => key.test(`${platform}${flag}`))
    view(result[1])
}
```

<br>

# insertAdjacentHTML() 
将指定的文本解析为HTML或XML并将结果节点插入到DOM树中的指定位置
它不会重新解析它正在使用的元素因此它不会破坏元素内的现有元素
这避免了额外的序列化步骤使其比直接innerHTML操作更快.

### **<font color="#C2185">element.insertAdjacentHTML(position, text);</font>**
position是相对于元素的位置并且必须是以下字符串之一: 

beforebegin:  元素自身的前面.
  afterend:     元素自身的后面.
  
  afterbegin:   插入元素内部的第一个子节点之前.
  beforeend:    插入元素内部的最后一个子节点之后.
  
<br>

# Window.matchMedia(mediaQueryString) 
eg:
"(max-width: 874px)"

可以直接使用 matchMedia() 方法

### **使用方式: **
let mqList = matchMedia(mediaQueryString)

### **<font color="#C2185">mqList.matches</font>**
如果当前document匹配该媒体查询列表则其值为true;反之其值为false.*只读*


作用:
可以返回一个表示指定媒体查询字符串的已解析结果的新MediaQueryList对象
可被用于判定Document是否匹配媒体查询, 或者监控一个document 来判定它匹配了或者停止匹配了此媒体查询.

说白了就是:
视口满足 我们传入的 "(max-width: 874px)" 规则 那就返回true 否则就返回false

举例:
运行媒体查询(max-width: 600px)并在<span>;中显示MediaQueryList的matches属性值.
如果视口的宽度小于或等于600像素则输出将为true而如果窗口的宽度大于此宽度则将输出false.
```js
let mql = window.matchMedia('(max-width: 600px)');
document.querySelector(".mq-value").innerText = mql.matches;
```

<br>

# 焦点元素
### **<font color="#C2185">activeElement </font>**
属性返回文档中当前获得焦点的元素

### **<font color="#C2185">document.activeElement.tagName;</font>**
返回元素的标签名

### **<font color="#C2185">element.focus() </font>**
为元素设置焦点

### **<font color="#C2185">document.hasFocus() </font>**
查看当前元素是否获取焦点.

<br>

# 面向对象编程 - 后盾人
我们先看下函数式编程 求平均成绩
```js
let name = "Sam"
let grade = [
    {
        name: "js",
        score: 99
    },
    {
        name: "docker",
        score: 76
    }
]

function average(grade, name) {
    let total = grade.reduce((pre, item) => pre + item.score, 0)
    return `${name}: ${total / grade.length}`
}

console.log(average(grade, name))
```

上面我们将逻辑都暴露在全局 就会有函数名重复 覆盖等问题 也会让程序变得错综复杂

上面这些都是对用户的操作 我们可以把它们变成对象

我们可以将上面的逻辑放在对象中 对象中的属性可以存储不同的值
```js
let user = {
    name: "Sam",
    grade: [
        {
            name: "js",
            score: 99
        },
        {
            name: "docker",
            score: 76
        }
    ],

    // 这个函数就是方法 函数中需要的数据都在这个对象中 所以我们可以通过this来调用我们需要的属性 不用传递了
    average: function() {
        let total = this.grade.reduce((pre, item) => pre + item.score, 0)

        return `${this.name}: ${total / this.grade.length}`
    }
}

console.log(user.average())

-- 

let user = {
  name: "sam",
  grade: [
    {
      name: "js",
      score: 99
    },
    {
      name: "docker",
      score: 76
    }
  ],

  // get标识符
  get ave() {
    return this.grade.reduce((pre, item) => pre + item.score, 0)
  }
}

```


### **技巧1: **
有一个场景 下面的upload函数 里面有一个config属性 我们调用函数的时候要求传递进去一个配置对象

但要求是 如果我们只传递了type 那么只修改type 如果我们只传递了size 那么只修改size

```js
function upload(params) {
    let config = {
        type: ".jpeg",
        size: 10000
    }

    // 我们利用对象的展开语法 同名属性会被覆盖
    config = {...config, ...params}

    console.log(config)
    // {type: '.jpeg', size: 20000}
}

upload({size: 20000})

```


### **技巧2: **
情景: 
当用户没有传递必要的参数的时候 报错

```js
function oss(config) {
    if(!config.hasOwnProperty("host")) {
        throw new Error("必须设置主机地址")
    }
}

oss({user: "sam"})
```


### **技巧3: **
修改数组对象的结构

要点:
JSON.stringify(目标, 保留所有属性, 缩进2)

```js
const lessons = [
    {
        title: "媒体查询",
        category: "css"
    },
    {
        title: "Flex",
        category: "css"
    },
    {
        title: "Mysql",
        category: "mysel"
    },
]

// 我们要将上面的数组对象变为对象的形式 数组对象中的每一个对象元素作为value key为category的值就编号

let res = lessons.reduce((obj, item, index) => {
    obj[`${item["category"]} - ${index + 1}`] = item
    console.log(obj)
    return obj
}, {})

// JSON.stringify(目标, 保留所有属性, 缩进2)
console.log(JSON.stringify(res, null, 2))
```


### **对象浅拷贝的多种赋值方式: **
我们先回忆一下对象的深浅拷贝
浅拷贝指的是: 目标对象中有1层数据格式
深拷贝指的是: 目标对象中有2层数据格式


### **浅拷贝方式1: 循环赋值: **
该方式适合将数据进行修改
```js
let hd = {name: "sam", url: "www.baidu.com"}

let obj = {}
// 当对象中的属性 没有深层次的结构的时候 这样也属于深拷贝
for (const key in hd) {
    obj[key] = hd[key]
}
```

### **浅拷贝方式2: 对象的结构赋值: **
```js
// 方式2 把hd中的值压入到了新对象中
let obj = Object.assign({}, hd)
```

### **浅拷贝方式3: 扩展运算符: **
```js
// {} 相当于新开辟了一块空间
let obj = {...hd}
```

<br>

### **对象的深拷贝: **
### **情景1 对象中只有对象的情况: **
```js
let obj = {
  name: "sam",
  user: {
    name: "erin"
  }
}


// 深拷贝的实现思路就是一层一层的处理
// 递归
function deepCopy(obj) {

  let temp = {}

  for(let key in obj) {
    temp[key] = typeof obj[key] == "object" ? deepCopy(obj[key]) : obj[key]
  }

  return temp
}

let ret = deepCopy(obj)
console.log(ret)
```


### **情景2: 对象中还有数组的情况: **
数据情况:
```js
let obj = {
    name: "sam",
    user: {
        name: "erin"
    },
    arr: []
}
```

要点:
1. 判断是对象还是数组 我们可以使用 instanceof 来进行判断
```js
{} instanceof Object  // true
[] instanceof Array   // true
```

2. 我们将对象内部的元素 是数组也好 还是对象也好 都转成对数组的操作方式

我们先看看下面的预习部分
```js
// 我们看看原始数据 使用Object.entries()方法后的样式
let obj = {
    name: "sam",
    user: {
        name: "erin"
    },
    arr: []
}

-- 

console.log(JSON.stringify(Object.entries(obj), null, 2))
[
  [
    "name",
    "sam"
  ],
  [
    "user",
    {
      "name": "erin"
    }
  ],
  [
    "arr",
    []
  ]
]
```
我们发现 原本的对象数组变成了二维数组 Object.entries() 将一个对象的
key: value
["key", value]

比如 原始数据中的 user
["user", {name: "erin"}]

上面我们实现了不管原始数据中是对象也好 还是数组也好都转成 对数组的处理方式

```js
function deepCopy(obj) {

  // 判断参数的类型 是对象还是数组 因为是递归调用 所以后序还会传递参数进行再次判断
  // 进行 对象 或 数组 的初始化
  let temp = obj instanceof Array ? [] : {}
  console.log("temp", temp)
  /*
    let [key, value] of Object.entries(obj)
    我们获取的 key value 
      1. 当普通值的时候
        [name, sam]

      2. 当为对象的时候
        [user, {name: "erin"}]

      3. 当为数组的时候 是 [索引 + 值] 我们遍历获取的就是 [0, 1]
        [[0, 1], [1, 2], [2, 3]]
  */

  for(let [key, value] of Object.entries(obj)) {
    console.log("key", key)
    console.log("value", value)

    // 每次都会监测 value 的类型 如果是 对象 则递归调用 数组和对象使用 typeof 检查都是对象
    // 当 value 为引用类型的值时递归调用 再次进入逻辑 temp 就是一个 []

    // value: [1, 2, 3] 会被 Object.entries 进行处理 得到 [[0, 1], [1, 2], [2, 3]]
    // 然后 从而获取 [key, value] = [index, value]
    // 然后我们往 temp[key] == temp[index] 相当于往 temp数组中的0位置添加1
    temp[key] = typeof value == "object" ? deepCopy(value) : value
  }

  return temp
}

let ret = deepCopy(obj)
console.log("ret", ret)
```


### **技巧3: 闭包的特性也可以用来体现函数的封装性: **
比如我们创建了下面的构造函数 但是发现 构造函数的外部是可以通过 user对象修改里面的属性的

有的时候我们希望的是我们只向外暴露功能 并不希望它能够修改我们对象中的属性

```js
function User(name, age) {
    this.name = name
    this.age = age

    this.show = function() {
        console.log(this.name)
    }

    this.info = function() {
        return this.age > 50 ? this.name + "老年人" : this.name + "年轻人"
    }
}

let user = new User("Sam", 33)
// 这时候在函数外部是可以
user.name = "erin"
user.show()
```

我们可以利用闭包的方式来解决问题
```js
function User(name, age) {

    let data = {name, age}

    let info = function() {
        return age > 50 ? name + "老年人" : name + "年轻人"
    }

    this.show = function() {
        console.log(data.name + info())
    }
}
```


### **对象的访问器: **
使用场景: 
现在我们有一个对象
```js
const user = {
    name: "sam"
    age: 18
}
```

上面这个对象中的年龄我在外面可以随便的改 我们可以在对象的外部 user.age = 进行随意的复制操作

那这个数据很容易变的不稳定

那怎么做呢
方式1:
```js
const user = {
    data: {name: "sam", age: 18},
    setAge(value) {
        if(typeof value != "number" || value < 10 || value > 100) {
            throw new Error("年龄格式不匹配")
        }
    },
    getAge() {

    }
}
```

上面方式有一个不好的地方 就是我们在给属性赋值的时候 需要调用的是 user.setAge(999) 方法

那我们能不能直接通过 user.age = 999 的方式给对象设置属性呢？

这时候我们就可以使用访问器 将属性写成计算属性函数的样式 前面用关键字set来修饰

### **set 属性() { ... }: **
### **get 属性() { ... }: **
对象中的属性 通过这种方式设置的时候 当我们通过
obj.属性 = 赋值的时候 就会触发回调中的逻辑

```js
const user = {
    data: {name: "sam", age: 18},
    set age(value) {
        if(typeof value != "number" || value < 10 || value > 100) {
            throw new Error("年龄格式不匹配")
        }

        this.data.age = value
    },
    get age() {
        return "abc"
        return this.data.age
    }
}
```

这时候我们可以还通过 user.age = 999 的方式赋值


### **访问器的应用 -- 计算属性: **
我们希望 我们调用对象中的属性就能获取到总价格

```js
let lesson = {
    lists: [
        {name: "js", price: 100},
        {name: "mysql", price: 212},
        {name: "vue", price: 99},
    ],
    get total() {
        return this.lists.reduce((pre, item) => {
            return pre + item.price
        }, 0)
    }
}

console.log(lesson.total)
```


### **访问器的应用 - 批量设置属性 -- 骚操作: **
下面有这样的一个对象
```js
const web = {
  protocol: "https",
  host: "www.baidu.com",
}
```

如果我们要设置里面的属性的话 都是
web.name = ""
web.url = ""

那有没有一种方法 web.site = "erin, www.taobao.com"
当我们这么设置的时候 可以一次搞定 name url 的赋值操作呢?

可以 我们可以通过访问器
```js
const web = {
  protocol: "https",
  host: "www.baidu.com",

  get site() {
    return this.protocol + "://" + this.host
  },

  set site(val) {
    [this.protocol, this.host] = val.split("://")
  }
}

web.site = "http://taobao.com"
console.log(web.protocol)
console.log(web.host)
```


### **访问器的应用 -- token的读写处理: **
我们从后台获取的token需要存在本地 我们会使用到本地存储
```js
let Request = {
    set token(content) {
        localStorage.setItem("token", content)
    },
    get token() {
        let token = localStorage.getItem("token", content)

        if(!token) {
            // 跳转到登录页面的操作
        }

        return token
    }
}

// 当我们调用token属性的时候 就会触发保存到本地存储的逻辑
Requset.token = "293423g5jghj342g5jhghj"
```

<br><br>

# 对象代理 proxy
访问器只是对单个属性的控制 对象代理是对整个对象进行控制
我们不是直接操作数据 而是通过代理来操作数据

相当于变相的对 源对象 的获取 和 修改操作进行了拦截

我们先定义一个数据
```js
const hd = {name: "sam"}
```

### **<font color="#C2185">let proxy = new Proxy(目标对象, [配置对象])</font>**
代理后 可以通过 proxy 操作原对象
相当于proxy就是原对象


### **参数1: 目标对象: **
对哪个对象进行代理

### **参数2: 配置对象: **
可以传空
或者传递具体的配置
```js
// config
{
  get(target, propName) { ... },
  set(target, propName, value) { ... },
  deleteProperty(target, propName) { ... }
}
```

### **<font color="#C2185">get(target, prop) { return obj[prop] }</font>**
该函数在有人 读取了代理对象中的属性的时候 会被调用
  target: 源对象
  propName: 被读取的属性值


### **<font color="#C2185">set(target, prop, value) { obj[prop] = value }</font>**
该函数在有人 修改 和 往target中追加属性的时候 会被调用
  target: 源对象
  propName: 被读取的属性值
  value: 被修改后的值


### **<font color="#C2185">deleteProperty(target, propName) { ... }</font>**
该函数在有人 删除了target中的属性的时候 会被调用


```js
const flag = " -- "

const obj = {
  name: "sam",
  age: 18,
  job: {
    front: "js",
    backend: "java"
  }
}


let proxy = new Proxy(obj, {
  get(target, propName) {
    return target[propName] + flag + "!"
  },

  set(target, propName, val) {
    target[propName] = val

    // 在严格模式中要返回true
    return true
  }
})

console.log(proxy.name)
proxy.name = "erin"
console.log(proxy.name)

```

**注意:**
1. 严格模式中 我们需要在set方法中return true 不然会报错
2. 配置对象是必须要传递的


### **对函数的代理: **
代理后proxy就是原函数 以前我们是通过 fn() 调用函数
代理后 proxy() 调用函数

### **<font color="#C2185">new Proxy(函数名, [配置对象])</font>**

### **参数2: **
配置对象里需要传递 apply(fn, obj, args)
```js
// 配置对象
{
    apply(fn, obj, args) {

    }
}


// 示例:
let proxy = new Proxy(info, {
  apply(fn, obj, args) {
    
    fn: 就是被代理的函数
    obj: 可以通过 proxy.apply(obj, params)
    args: 可以通过 proxy.apply(obj, params)
  }
})
```

fn: 
    就是代理的函数

obj 
    就是上下文对象相当于this 我们可以通过 proxy.apply() 的方法传入this指向的对象

args 就是传递进来的实参 
    - args是数组
    - proxy.apply({}, [参数])
    - 使用apply()方法传递参数的时候 *要把参数放在数组中*


示例:
```js
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1)
}


// 使用代理来调用对象
let proxy = new Proxy(factorial, {

  // 当调用proxy()的时候 会执行里面的逻辑
  apply(fn, obj, args) {
    console.log(fn)   // 被代理的函数
    console.log(obj)  // 我们传递的是this 那么obj就是window
    console.log(args) // 参数会在数组中
  }
})


// 如果我们传递一个 {} 的配置对象 可以普通调用
proxy(5)

// 如果我们传递了 配置对象 则需要这样调用
// 使用apply调用 并传递上下文对象 和 数组传参
proxy.apply(this, [5])
```


### **举例1: aop**
计算函数的运行时间
```js
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1)
}

console.log(factorial(5)) 

let proxy = new Proxy(factorial, {
  
  apply(fn, obj, args) {
    
    console.time("run")

    // 将收到的参数传递到原函数中
    fn.apply(this, args);

    console.timeEnd("run")
  }
})

proxy.apply({}, [5])
```


### **代理对数组的控制: **
需求:
通过代理对原数组进行加工 如果数组对象中的对象的title的长度大于5进行截断处理

也就是对数组的拦截处理

### **<font color="#C2185">new Proxy(数组, 配置对象)</font>**
代理数组后 proxy就是数组 可以通过 proxy[0] 的方式访问原数组中的元素

### **参数2: **
get(arr, index)
arr就是原数组 index就是proxy[0]对应的索引值

好像没有set


```js
let lessons = [
  {
    title: "媒体查询知多少",
    category: "css"
  },
  {
    title: "FLEX",
    category: "css"
  },
  {
    title: "MYSQL",
    category: "mysql"
  },
]

// 当获取元素的时候我们对title的长度进行截断处理
let proxy = new Proxy(lessons, {
  get(arr, key) {
    const title = arr[key].title
    const len = 5
    
    arr[key].title = title.length > len 
      ? title.substr(0, len) + ".".repeat(3) 
      : title

    return arr[key]
  }
})
console.log(proxy[0])
```


### **通过代理实现双向绑定: **
```html
<input type="text" v-model="title" />
<input type="text" v-model="title" />

<h4 v-bind="title">这里也会发生更新</h4>
```
```js
function View() {
    // 创建代理 {}里面用来存放 公共数据 相当于 data
    let proxy = new Proxy({}, {
        get(obj, prop) {

        },
        set(obj, prop, value) {
            document.querySelectAll(`[v-model="${prop}"]`).forEach(item => {
                item.value = value
            })
        }
    })

    // 绑定事件
    this.init = function() {
        const els = document.querySelectorAll("[v-model]")

        els.forEach(item => {
            item.addEventListener("keyup", function() {
                proxy[this.getAttribute("v-model")] = this.value
            })
        })
    }
}

new View().init()
```


### **代理处理表单验证: **
```js
// 工具类
class Validate {
  // 检查value是否超过最大长度
  max(value, len) {
    return value.length < len
  }

  // 检查value是否超过最小长度
  min(value, len) {
    return value.length > len
  }

  isNumber(value) {
    return /^\d+$/.test(value)
  }
}

// 创建代理工厂 将对象加工成代理对象
function ProxyFactory(target) {
  return new Proxy(target, {
    get(target, key) {
      return target[key]
    },

    // 键盘抬起的时候就会触发set方法
    set(target, key, value) {
       // value就是this 因为外面 proxy[i] = this 代表每一个表单
       // 获取表单元素上的规则
       const rule = el.getAttribute("rule")

       // 创建验证类
       const validate = new Validate()

       let state = rule.split(",").every(rule => {

          // 第一个参数是验证类中的函数 二个函数的参数
          // info ["max", "12"]
          const info = rule.split(":")

          // value是表单元素 就是this 就是input
          return validate[info[0]](value.value, info[1])
       })
       console.log(state)
    }
  })
}

// 对NodeList进行了代理
let proxy = ProxyFactory(document.querySelectorAll("[validate]"))

// 当表单触发键盘抬起事件的时候触发表单验证处理
proxy.forEach((item,i) => {
  console.log(item)
  item.addEventListener("keyup", function() {
    // 这相当于set的第三个参数就是this
    proxy[i] = this
  })
})
```

<br>

### **<font color="#C2185">Reflect.get(想从哪个对象上获取属性, '获取什么属性')</font>**
### **<font color="#C2185">Reflect.set(想从哪个对象上修改属性, '修改什么属性', '修改为什么值')</font>**
### **<font color="#C2185">Reflect.deleteProperty(想从哪个对象上删除属性, '删除什么属性')</font>**
也就是说 我们对 对象的增删改查还可以通过这个api

<br><br>

# JSON

## 格式:
1. JSON对象中 key 的部分要使用 "" 
2. JSON对象中 val 的部分没有要求 1, true 原本的写法就可以
3. undefind 和 function 会丢失

<br>

### **<font color="#C2185">JSON.stringify(目标对象, 参数2, 参数3)</font>**

**参数2:**  
- 格式1: 数组字符串 ["属性名"], 代表要保留的属性 可以传递多个, 传递null 代表全部保留

```js
let hd = {
    title: "sam"
    url: "www.baidu.com",
    teacher: {
        name: "erin"
    }
}

JSON.stringify(hd, ["title"])
// {"title": "sam"}
```

<br>

- 格式2: 函数
```js
let json = JSON.stringify(obj3, function(key, val) {
    key: json中的key
    val: json中的val
}, 2)
```

<br>

**参数3:**  
制表符缩进


### **自定义json返回: **
我们需要在目标对象里面设置 *toJSON: function() { return }* 方法
```js
let hd = {
    title: "sam"
    url: "www.baidu.com",
    teacher: {
        name: "erin"
    },

    // 设置toJSON方法
    toJSON: function() {
        return {
            title: this.title
        }
    }
}

let json = JSON.stringify(hd)
```


### **<font color="#C2185">JSON.parse(目标对象, callback)</font>**

**参数2:**  
当我们想对返回得JSON对象的格式进行处理的时候 可以传递一个回调
```js
let hd = {
    title: "sam"
    url: "www.baidu.com",
    teacher: {
        name: "erin"
    }
}


let obj = JSON.parse(hd, (key, value) => {
    if(key == "sam") {
        value = "[加油] - " + value
    }
})
```

<br>

### 注意点:
```s
https://blog.csdn.net/jason_renyu/article/details/123640102
```

1. 使用JSON.Stringify 转换的数据中, 如果包含 function, undefined, Symbol, 这几种类型, 不可枚举属性, JSON.Stringify序列化后, 这个键值对会消失。

2. 转换的数据中包含 NaN, Infinity 值（含-Infinity）, JSON序列化后的结果会是null。

<br>

**示例:**  
```js
let obj = {
    name: "sam", 
    age: 10, 
    sex: true, 
    say: function() {console.log(1)}
}
```

当我们使用 JSON.stringify(obj) 的时候发现 函数的key-value消失

<br>

**解决方案:**  
```js
let obj3 = {
  name: "sam", 
  age: 10, 
  sex: true, 
  say: function() {console.log(1)}
}

// 使用 stringify 的时候 对 val 的部分进行判断
let json = JSON.stringify(obj3, function(key, val) {
    
    // 处理函数丢失的问题
    if(typeof val == "function") {
        return val + ""
    }
    
    // 处理undefined丢失的问题
    if(typeof val == "undefined") {
        return "undefined"
    }

    return val

}, 2)
console.log(json)
/*
{
    "name": "sam",
    "age": 10,
    "sex": true,
    "say": "function() {console.log(1)}"
}
*/


// 验证: 解析
let res = JSON.parse(json)
console.log(res)
/*
    {name: 'sam', age: 10, sex: true, say: 'function() {console.log(1)}'}
*/


// 还原上面的json对象的话 也需要做类似的处理
let res = JSON.parse(json, function(key, val){
  if(
    typeof val == "string" &&
    val.indexOf &&
    val.indexOf('function') > -1
  ) {
    return eval(`(function(){return ${val}})()`)
  }
  return val
})
console.log(res)
```

<br>

# 执行上下文
```js
// 情况1:
console.log(a)  // a is not defined

// 情况2:
console.log(a)  // undefined
var a

// 情况3:
console.log(a)  // undefined
var a = 10
```

上面我们发现:
第一句:
    报错 a未定义

第二句:
第三局:
    输出都是undefined

说明浏览器在执行console.log(a)时已经知道了a是undefined但却不知道a是10

其实, 在一段js代码拿过来真正一句一句运行之前浏览器已经做了一些“准备工作”

其中就包括对变量的声明(而不是赋值)
变量赋值是在赋值语句执行的时候进行的

比如 我们在 console.log(this) 的时候 都会知道无论在哪个位置获取this都是有值的

上面说的是属性的问题
下面我们看看函数的两种情况
```js
// 情况1
console.log(fn1)    // 能输出整个函数
function fn1() {
    console.log("fn1")
}


// 情况2
console.log(fn1)    // undefined
var fn2 = function() {
    console.log("fn2")
}

// 情况2 相当于
var fn2;
console.log(fn2)
fn2 = function() {
    console.log("fn2")
}
```

在“准备工作”中对待函数表达式就像对待“ var a = 10 ”这样的变量一样只是声明.

对待函数声明时却把函数整个赋值了.

### **“准备工作”中完成了哪些工作: **
1. 变量、函数表达式——变量声明默认赋值为undefined
2. this——赋值
3. 函数声明——赋值

这三种数据的准备情况我们称之为“执行上下文”或者“执行上下文环境”.

javascript在执行一个代码段之前都会进行这些“准备工作”来生成执行上下文.

这个“代码段”其实分三种情况——全局代码函数体eval代码.


如果在函数中除了以上数据之外还会有其他数据.
```js
function fn(x) {
    console.log(arguments) // [10]
    console.log(x) // 10
}
fn(10)
```

以上代码展示了在函数体的语句执行之前arguments变量和函数的参数都已经被赋值.

从这里可以看出*函数每被调用一次都会产生一个新的执行上下文环境*.因为不同的调用可能就会有不同的参数.

外一点不同在于*函数在定义的时候(不是调用的时候)就已经确定了函数体内部自由变量的作用域.*
``` 至于“自由变量”和“作用域”是后面要专门拿出来讲述的重点这里就先点到为止.用一个例子说明一下: ```

```js
var a = 10
function fn() {
    console.log(a)
    // a是自由变量 函数创建的时候 就确定了a要取值的作用域
}


function bar(f) {
    var a = 20;
    f() // 打印的是10 而不是20
}
bar(fn)
```


### **结合作用域 上下文环境 我们看看下面的知识点: **
```js
var a = 10, b = 20              // 全局作用域

function fn(x) {
    var a = 100, c = 300;       // fn的作用域

    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }

    bar(100)
    bar(200)
}

fn(10)
```

我们在上文中已经介绍了除了全局作用域之外每个函数都会创建自己的作用域
*作用域在函数定义时就已经确定了.而不是在函数调用时确定.*

我们看看结合作用域 上下文环境是怎么样的
1. 在加载程序时已经确定了全局上下文环境并随着程序的执行而对变量就行赋值.
```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }



    bar(100)
    bar(200)
}

fn(10)
```

当我们程序执行到 fn(10) 调用的时候 此时生成fn函数的上下文环境压栈并将此上下文环境设置为活动状态.
```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域

            fn(10)上下文环境
            x       10
            a       100
            c       300



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }



    bar(100)
    bar(200)
}

fn(10)
```


当程序执行到bar(100)的时候 调用bar(100) 生成此次bar函数的上下文环境 压栈并设置为活动状态

```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域

            fn(10)上下文环境
            x       10
            a       100
            c       300



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域

            bar(100)上下文环境
            x       100
            a       1000
            d       3000
    }



    bar(100)
    bar(200)
}

fn(10)
```

当执行完bar(100)这行代码 bar(100)调用完成 *则bar(100)上下文环境被销毁* 

接着执行bar(200)调用bar(200)则又生成bar(200)的上下文环境压栈设置为活动状态.

当执行完bar(200)这行代码 则bar(200)调用结束 其上下文环境被销毁 此时就会回到fn(10)上下文环境中 变为活动状态
``` 
    bar(200)     ->  上下文环境
    bar(100)     ->  上下文环境
    fn(10)       ->  上下文环境

    当bar(200) bar(100)都调用完毕后 其上下文环境销毁
    只剩下fn(10)处于激活状态
```

当执行完fn(10)这行代码后 fn(10)执行完成之后 fn(10)上下文环境被销毁 全局上下文环境又回到了活动状态

连接起来看还是挺有意思的.作用域只是一个“地盘”一个抽象的概念其中没有变量.要通过作用域对应的执行上下文环境来获取变量的值.同一个作用域下不同的调用会产生不同的执行上下文环境继而产生不同的变量的值.所以作用域中变量的值是在执行过程中产生的确定的而作用域却是在函数创建时就确定了.

所以如果要查找一个作用域下某个变量的值就需要找到这个作用域对应的执行上下文环境再在其中寻找变量的值.

<br>

# ArrayBuffer对象
ArrayBuffer 对象表示一段二进制数据用来模拟内存里面的数据.
可以通过'视图'进行操作(TypedArray, DataView), 视图内部署了数组的接口 这意味着可以用数组的方法操作内存
也就是说它不能直接读写 只能通过视图才操作 视图的作用是以指定的格式解读二进制数据

它是以数组的语法处理二进制数据 所以统称为二进制数组
``` 
    ArrayBuffer对象
        TypedArray视图
        DataView视图

    它们是操作二进制数据的一个接口
```

上述接口出现原因:
为了满足js与显卡之间大量的数据实时交换 它们之间的数据必须是二进制的 而不能是传统的文本格式
文本格式传递一个32位整数 两端的js脚本和显卡都要进行格式化的转化 将非常的耗时
所以我们需要一个能够直接操作字节 将4个字节的32位整数 以二进制形式原封不动地送入显卡


### **TypedArray 和 DataView 视图支持的数据类型: **
一共9种(DataView视图支持除Uint8C以外的其他 8 种)
``` 
    数据类型	字节长度	含义	                对应的 C 语言类型
    Int8	    1	    8 位带符号整数	                signed char
    Uint8	    1	    8 位不带符号整数	            unsigned char
    Uint8C	    1	    8 位不带符号整数(自动过滤溢出)    unsigned char       -- DataView不支持
    Int16	    2	    16 位带符号整数	                short
    Uint16	    2	    16 位不带符号整数	            unsigned short
    Int32	    4	    32 位带符号整数	                int
    Uint32	    4	    32 位不带符号的整数	             unsigned int
    Float32	    4	    32 位浮点数	                   float
    Float64	    8	    64 位浮点数	                   double
```


### **<font color="#C2185">ArrayBuffer实例化</font>**
### **<font color="#C2185">let buf = new ArrayBuffer(整数)</font>**
作用
用来分配一段可以存放数据的连续内存区域(表示这段二进制数据占用多少字节)

默认值:
每一个字节的默认值是0

参数
整数 

```js
let buf = new ArrayBuffer(8)

// 结果:  buf占用了8个字节
byteLength: 8
[[Prototype]]: ArrayBuffer
[[Int8Array]]: Int8Array(8)
[[Uint8Array]]: Uint8Array(8)
[[Int16Array]]: Int16Array(4)
[[Int32Array]]: Int32Array(2)
[[ArrayBufferByteLength]]: 8
[[ArrayBufferData]]: 2
```

### **<font color="#C2185">buf.byteLenth</font>**
表示当前实例占用的内存长度(字节)


### **<font color="#C2185">buf.slice(startIndex, endIndex)</font>**
用来*复制*一部分内存
拷贝生成一个新的ArrayBuffer对象.

包括开始不包括结束
如果省略第二个参数 则表示一直复制到结束
```js
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);
```

### **<font color="#C2185">buf.isView()</font>**
ArrayBuffer有一个静态方法isView返回一个布尔值表示参数是否为ArrayBuffer的视图实例.这个方法大致相当于判断参数是否为TypedArray实例或DataView实例.
```js
const buffer = new ArrayBuffer(8);
ArrayBuffer.isView(buffer) // false

const v = new Int32Array(buffer);
ArrayBuffer.isView(v) // true
```

<br>

### **<font color="#C2185">视图</font>**
我们创建buf对象后 通过视图构造器将buf转换为我们可以操作的数组 
接下来就是以数组的形式操作二进制buf

ArrayBuffer对象作为内存区域可以存放多种类型的数据.
同一段内存不同数据有不同的解读方式这就叫做“视图”(view).

ArrayBuffer有两种视图
1. TypedArray视图 - 同类型数据
2. DataView视图   - 可以是不同类型数据

前者的数组成员都是同一个数据类型后者的数组成员可以是不同的数据类型.

目前TypedArray视图一共包括 9 种类型每一种视图都是一种构造函数.

```js
Int8Array:          08 位有符号整数      长度 1 个字节.
Uint8Array:         08 位无符号整数      长度 1 个字节.
Uint8ClampedArray:  08 位无符号整数      长度 1 个字节溢出处理不同.
Int16Array:         16 位有符号整数      长度 2 个字节.
Uint16Array:        16 位无符号整数      长度 2 个字节.
Int32Array:         32 位有符号整数      长度 4 个字节.
Uint32Array:        32 位无符号整数      长度 4 个字节.
Float32Array:       32 位浮点数         长度 4 个字节.
Float64Array:       64 位浮点数         长度 8 个字节.
```

特点:
这 9 个构造函数生成的数组统称为TypedArray视图.
它们很像普通数组都有length属性都能用方括号运算符([])获取单个元素所有数组的方法在它们上面都能使用.

与普通数组的区别:
1. TypedArray 数组的所有成员都是同一种类型.
2. TypedArray 数组的成员是连续的不会有空位.
3. TypedArray 数组成员的默认值为 0.比如new Array(10)返回一个普通数组里面没有任何成员只是 10 个空位;new Uint8Array(10)返回一个 TypedArray 数组里面 10 个成员都是 0.

4. TypedArray *数组只是一层视图本身不储存数据*它的数据都储存在底层的ArrayBuffer对象之中要获取底层对象必须使用buffer属性.


### **DataView视图: **
### **<font color="#C2185">new DataView(buf)</font>**
DataView视图用来操作ArrayBuffer对象
当创建好ArrayBuffer独享之后 需要为该buf对选哪个指定视图
```js
const buf = new ArrayBuffer(32)
const dataView = new DataView(buf)

// 以不带符号的8位整数格式 从头读取8位二进制数据 得到0
dataView.getUint8(0)    // 0
```


### **TypedArray视图: **
该视图与DataView视图的区别 TypedArray不是一个构造函数 而是一组构造函数 代表不同的数据格式
```js
const buf = new ArrayBuffer(32)

const x1 = new Int32Array(buffer);
x1[0] = 1;


const x2 = new Uint8Array(buffer);
x2[0]  = 2;

x1[0] // 2
```
上面代码对同一段内存分别建立两种视图: 32 位带符号整数(Int32Array构造函数)和 8 位不带符号整数(Uint8Array构造函数).由于两个视图对应的是同一段内存一个视图修改底层内存会影响到另一个视图.

TypedArray视图的构造函数除了接受ArrayBuffer实例作为参数还可以接受普通数组作为参数直接分配内存生成底层的ArrayBuffer实例并同时完成对这段内存的赋值.

```js
const typedArray = new Uint8Array([0,1,2]);
typedArray.length // 3

typedArray[0] = 5;
typedArray // [5, 1, 2]
```

上面代码使用TypedArray视图的Uint8Array构造函数新建一个不带符号的 8 位整数视图.可以看到Uint8Array直接使用普通数组作为参数对底层内存的赋值同时完成.


### **二进制数组的应用: **
大量的 Web API 用到了ArrayBuffer对象和它的视图对象.

### **1. AJAX: **
传统上服务器通过 AJAX 操作只能返回文本数据即responseType属性默认为text.
XMLHttpRequest第二版XHR2允许服务器返回二进制数据这时分成两种情况.

    - 1. 如果明确知道返回的二进制数据类型可以把返回类型(responseType)设为arraybuffer;

    - 2. 如果不知道就设为blob.

```js
let xhr = new XMLHttpRequest();
xhr.open('GET', someUrl);
xhr.responseType = 'arraybuffer';

xhr.onload = function () {
  let arrayBuffer = xhr.response;
  // ···
};

xhr.send();
```

如果知道传回来的是 32 位整数可以像下面这样处理.
```js
xhr.onreadystatechange = function () {
  if (req.readyState === 4 ) {
    const arrayResponse = xhr.response;
    const dataView = new DataView(arrayResponse);
    const ints = new Uint32Array(dataView.byteLength / 4);

    xhrDiv.style.backgroundColor = "#00FF00";
    xhrDiv.innerText = "Array is " + ints.length + "uints long";
  }
}
```


### **2. File API: **
如果知道一个文件的二进制数据类型也可以将这个文件读取为ArrayBuffer对象.
```js
// 获取节点 并获取文件 
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

// 使用reader读成2进制数据
const reader = new FileReader();
reader.readAsArrayBuffer(file);

// 不光能从e.target上获取 也可以直接从this.result reader.result上获取
reader.onload = function () {
  const arrayBuffer = reader.result;
  // ···
};
```

下面以处理 bmp 文件为例.假定file变量是一个指向 bmp 文件的文件对象首先读取文件.
```js
const reader = new FileReader();
reader.addEventListener("load", processimage, false);
reader.readAsArrayBuffer(file);
```

然后定义处理图像的回调函数: 
1. 先在二进制数据之上建立一个DataView视图
2. 再建立一个bitmap对象用于存放处理后的数据最后将图像展示在Canvas元素之中.
```js
function processimage(e) {
  const buffer = e.target.result;
  const datav = new DataView(buffer);
  const bitmap = {};
  // 具体的处理步骤
}
```
https://www.wangdoc.com/es6/arraybuffer.html
太多了 没看完 我觉得自己用不到呢

<br>

# Blob对象
Blob 对象表示一个二进制文件的数据内容比如一个图片文件的内容就可以通过 Blob 对象读写.
它通常用来读写文件它的名字是 Binary Large Object (二进制大型对象)的缩写.

Blob对象 与 ArrayBuffer 的区别在于:
Blob对象 用于操作二进制文件
ArrayBuffer 用于操作内存.

### **Blob对象的实例化: **
### **<font color="#C2185">new Blob(array [, options])</font>**
参数
1. *数组*
成员是*字符串*或*二进制对象*表示新生成的Blob实例对象的内容

2. 配置对象
参数类型是对象 
    type: 类型字符串 表示数据的 MIME 类型默认是空字符串
    endings: 
        - transparent: 代表会保持 blob 中保存的结束符不变 
        - native: 结束符会被更改为适合宿主操作系统文件系统的换行符
```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});
        // Blob {size: 43, type: 'text/html'}
```

```js
// 对象的话 我们要先序列化 然后装到数组里面作为参数
var obj = { hello: 'world' };
var blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
```

### **<font color="#C2185">实例对象.size</font>**
### **<font color="#C2185">实例对象.type</font>**
分别返回数据的大小和类型.
```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});

myBlob.size // 32
myBlob.type // "text/html"
```

### **<font color="#C2185">实例对象.slice(start, end, contentType)</font>**
用来拷贝原来的数据返回的也是一个Blob实例.

参数: 三个参数都是可选的.
contentType : 新实例的数据类型(默认为空字符串).


### **获取文件信息: **
文件选择器<input type="file">用来让用户选取文件
出于安全考虑浏览器不允许脚本自行设置这个控件的value属性即文件必须是用户手动选取的不能是脚本指定的 一旦用户选好了文件脚本就可以读取这个文件.

文件选择器返回一个 FileList 对象该对象是一个类似数组的成员每个成员都是一个 File 实例对象 (inp.files)

File 实例对象是一个特殊的 Blob 实例增加了name和lastModifiedDate属性.
```js
// HTML 代码如下
<input 
    type="file" 
    accept="image/*" 
    multiple 
    onchange="fileinfo(this.files)"
/>

function fileinfo(files) {
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    console.log(
      f.name, // 文件名不含路径
      f.size, // 文件大小Blob 实例属性
      f.type, // 文件类型Blob 实例属性
      f.lastModifiedDate // 文件的最后修改时间
    );
  }
}
```


### **下载文件: **
AJAX 请求时如果指定 responseType属性为blob下载下来的就是一个 Blob 对象
比如:
然后我们可以通过URL.createObjectURL 方法将blob对象转成一个url对象 给有src href属性的 

```js
    function download(url) {
        const xhr = new XMLHttpRequest()
        xhr.open("get", url)
        xhr.responseType = "blob"
        xhr.send()
        xhr.onload = function() {
            const fileBlob = xhr.response
            let imgUrl = URL.createObjectURL(fileBlob)

            let a = document.createElement("a")
            a.href = imgUrl
            a.download = "testImg"
            a.innerHTML = "hello"
            document.querySelector("body").appendChild(a)
        }
    }
    let url = "https://img1.baidu.com/it/u=2648389307,756086504&fm=26&fmt=auto"
    download(url)
```


```js
function getBlob(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    callback(xhr.response);
  }
  xhr.send(null);
}

// 上面代码中xhr.response拿到的就是一个 Blob 对象.
```


### **生成 URL -- URL.createObjectURL(): **
浏览器允许使用 URL.createObjectURL() 方法针对 *Blob* 对象生成一个临时 URL以便于某些 API 使用

这个 URL 以blob://开头表明对应一个 Blob 对象协议头后面是一个识别符用来唯一对应内存里面的 Blob 对象.

<br>

**参数:**  
Blob || MediaSource || File

```js
var droptarget = document.getElementById('droptarget');

droptarget.ondrop = function (e) {
  var files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    var type = files[i].type;
    if (type.substring(0,6) !== 'image/')
      continue;

    var img = document.createElement('img');

    // 将文件对象转成url 方便其他地方使用
    img.src = URL.createObjectURL(files[i]);

    img.onload = function () {
      this.width = 100;
      document.body.appendChild(this);
      URL.revokeObjectURL(this.src);
    }
  }
}
```

上面代码通过为拖放的图片文件生成一个 URL产生它们的缩略图从而使得用户可以预览选择的文件.

浏览器处理 Blob URL 就跟普通的 URL 一样如果 Blob 对象不存在返回404状态码;如果跨域请求返回403状态码.Blob URL 只对 GET 请求有效如果请求成功返回200状态码.由于 Blob URL 就是普通 URL因此可以下载.


### **读取文件: **
取得 Blob 对象以后可以通过FileReader对象读取 Blob 对象的内容即文件内容.

<br><br>---

# FileReader

### **FileReader实例化: **
```js
let reader = new FileReader()
```

FileReader 对象提供四个方法*处理 Blob 对象*
Blob 对象作为参数传入这些方法然后以指定的格式返回.

### **<font color="#C2185">FileReader.readAsText(目标)</font>**
返回文本需要指定文本编码默认为 UTF-8.

### **<font color="#C2185">FileReader.readAsArrayBuffer(目标)</font>**
返回 ArrayBuffer 对象.

### **<font color="#C2185">FileReader.readAsDataURL(目标)</font>**
返回 Data URL.

### **<font color="#C2185">FileReader.readAsBinaryString(目标)</font>**
返回原始的二进制字符串.


### **例子: **
FileReader.readAsText()方法的例子用来读取文本文件.

```js
// HTML 代码如下
<input type="file" onchange="readfile(this.files[0])"></input>
<pre id="output"></pre>

function readfile(f) {
  var reader = new FileReader();
  reader.readAsText(f);

  reader.onload = function () {
    var text = reader.result;

    var out = document.getElementById('output');
    out.innerHTML = '';
    out.appendChild(document.createTextNode(text));

  }
  reader.onerror = function(e) {
    console.log('Error', e);
  };
}
```

上面代码中通过指定 FileReader 实例对象的onload监听函数在实例的result属性上拿到文件内容.


### **例子: **
FileReader.readAsArrayBuffer()方法的例子用于读取二进制文件.

```js
// HTML 代码如下
<input type="file" onchange="typefile(this.files[0])"></input>


function typefile(file) {
  // 文件开头的四个字节生成一个 Blob 对象
  var slice = file.slice(0, 4);
  var reader = new FileReader();

  // 读取这四个字节
  reader.readAsArrayBuffer(slice);

  reader.onload = function (e) {
    var buffer = reader.result;

    // 将这四个字节的内容视作一个32位整数
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);

    // 根据文件的前四个字节判断它的类型
    switch(magic) {
      case 0x89504E47: file.verified_type = 'image/png'; break;
      case 0x47494638: file.verified_type = 'image/gif'; break;
      case 0x25504446: file.verified_type = 'application/pdf'; break;
      case 0x504b0304: file.verified_type = 'application/zip'; break;
    }

    console.log(file.name, file.verified_type);
  };
}
```

读取的结构要在 onload的回调里面 通过this / reader / e.target 上的result属性身上获取

<br>

# URL
网页的 URL 只能包含合法的字符.合法字符分成两类.
URL 元字符: 
分号(;)逗号(,)斜杠(/)问号(?)冒号(:)at(@)&等号(=)加号(+)美元符号($)井号(#)


语义字符: 
a-zA-Z0-9连词号(-)下划线(_)点(.)感叹号(!)波浪线(~)星号(*)单引号(')圆括号(())

除了以上字符其他字符出现在 URL 之中都必须转义规则是根据操作系统的默认编码将每个字节转为百分号(%)加上两个大写的十六进制字母.

JavaScript 提供四个 URL 的编码/解码方法.

``` 
  比如UTF-8 的操作系统上http://www.example.com/q=春节这个 URL 之中汉字“春节”不是 URL 的合法字符所以被浏览器自动转成

  http://www.example.com/q=%E6%98%A5%E8%8A%82.其中“春”转成了%E6%98%A5“节”转成了%E8%8A%82.这是因为“春”和“节”的 UTF-8 编码分别是E6 98 A5和E8 8A 82将每个字节前面加上百分号就构成了 URL 编码.
```

### **编码: **
### **<font color="#C2185">encodeURI("url字符串")</font>**
用于转码整个 URL.
它的参数是一个字符串代表整个 URL.它会将元字符和语义字符之外的字符都进行转义.

返回值
编码后的字符串

```js
  encodeURI('http://www.example.com/q=春节')
  // "http://www.example.com/q=%E6%98%A5%E8%8A%82"

  let url = "www.baidu.com?name=杉"
  let res = encodeURI(url)
  console.log(res);
```


### **<font color="#C2185">encodeURIComponent("春节")</font>**
该方法适用于转码url上的某一个部分


### **解码: **
### **<font color="#C2185">decodeURI()</font>**
用于整个 URL 的解码.它是encodeURI()方法的逆运算.它接受一个参数就是转码后的 URL.

```js
  decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
  // "http://www.example.com/q=春节"


  let url2 =`www.baidu.com?name=${encodeURIComponent("杉")}`
  console.log(url2);
  // www.baidu.com?name=%E6%9D%89
```

### **<font color="#C2185">decodeURIComponent('%E6%98%A5%E8%8A%82')</font>**
解码一个片段

<br>

# url构造函数
用来构造、解析和编码 URL.一般情况下通过window.URL可以拿到这个构造函数.

用于解析url相关的信息

### **<font color="#C2185">new URL()</font>**
new URL()作为构造函数可以生成 URL 实例.

参数:
它接受一个表示 URL 的字符串作为参数.如果参数不是合法的 URL会报错.

```js
  var url = new URL('http://www.example.com/index.html');
  url.href
  // "http://www.example.com/index.html"
```

如果 URL 字符串是一个相对路径那么需要表示绝对路径的第二个参数作为计算基准.
```js
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"
```


### **实例属性: **
url.href: 返回整个 URL
```js
let str = "http://www.baidu.com:80/?name=杉&age=16"

let url = new URL(str)
console.log(url.href);
// http://www.baidu.com/?name=%E6%9D%89&age=16
```

url.protocol: 返回协议以冒号:结尾
``` 
    http:
```

url.hostname: 返回域名
``` 
    www.baidu.com
```

url.host: 返回域名与端口包含:号默认的80和443端口会省略
``` 
    www.baidu.com
```
url.port: 返回端口

url.origin: 返回协议、域名和端口(没返回端口啊)
``` 
    http://www.baidu.com
```

### **<font color="#C2185">url.pathname: 返回路径以斜杠/开头</font>**
``` 
    /login
```

### **<font color="#C2185">url.search: 返回查询字符串以问号?开头</font>**
``` 
    ?name=%E6%9D%89&age=16
```

### **<font color="#C2185">url.searchParams: 返回一个URLSearchParams实例该属性是Location对象没有的</font>**
该对象的相关方法在下面详细的给出
```js
let queryObj = url.searchParams
```

URL.hash: 返回片段识别符以井号#开头
URL.password: 返回域名前面的密码
URL.username: 返回域名前面的用户名



### **静态方法: **
### **<font color="#C2185">URL.createObjectURL()</font>**
用来为上传/下载的文件、流媒体文件生成一个 URL 字符串
这个字符串代表了 File对象 或 Blob对象 的 URL.

该方法会创建一个 DOMString 它是一个Blob类型的URL对象, 相当于把传入的文件放入内存URL中

<br>

**URL对象的生命周期:**  
它会在 document 触发了 unload 事件 或者 
执行 revokeObjectURL() 方法后 被释放

```js
  // HTML 代码如下
  <div id="display"/>
  <input
    type="file"
    id="fileElem"
    multiple
    accept="image/*"
    onchange="handleFiles(this.files)"
   >
```
```js
  var div = document.getElementById('display');
  let inp = document.querySelector("#inp")
  inp.addEventListener("change", handleFile)

  function handleFile(e) {
    let file = e.target.files[0]

    let img = document.createElement("img")

    let imgSrc = window.URL.createObjectURL(file)

    img.src = imgSrc
    document.querySelector("#wrap").appendChild(img)
  }
```

URL.createObjectURL()方法用来为上传的文件生成一个 URL 字符串作为<img>元素的图片来源.

**注意:**  
每次使用URL.createObjectURL()方法都会在内存里面生成一个 URL 实例
如果不再需要该方法生成的 URL 字符串为了节省内存可以使用 URL.revokeObjectURL()方法释放这个实例.


### **<font color="#C2185">URL.revokeObjectURL()</font>**
用来释放URL.createObjectURL()方法生成的 URL 实例.它的参数就是URL.createObjectURL()方法返回的 URL 字符串
一旦图片加载成功以后为本地文件生成的 URL 字符串就没用了于是可以在img.onload回调函数里面通过URL.revokeObjectURL()方法卸载这个 URL 实例.

```js
  // 当图片加载完成后 我们释放这个url对象
  var div = document.getElementById('display');

  function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var img = document.createElement('img');

      img.src = window.URL.createObjectURL(files[i]);

      div.appendChild(img);
      img.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }
    }
  }
```


### **<font color="#C2185">new URLSearchParams(search参数)</font>**
为了要处理参数部分 我们即可以通过 URL的实例对象
url.searchParams 属性获取

还可以直接new URLSearchParams 实例化解析search参数

是浏览器的原生对象用来构造、解析和处理 URL 的查询字符串(即 URL 问号后面的部分).

它本身也是一个构造函数可以生成实例.参数可以为查询字符串起首的问号?有没有都行也可以是对应查询字符串的数组或对象.

### **方法一: 传入字符串: **
```js
  var params = new URLSearchParams('?foo=1&bar=2');
  // 等同于
  var params = new URLSearchParams(document.location.search);
```

### **方法二: 传入数组: **
```js
  var params = new URLSearchParams([['foo', 1], ['bar', 2]]);
```
  
### **方法三: 传入对象: **
```js
  var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
```

URLSearchParams会对查询字符串自动编码.
```js
var params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```


### **<font color="#C2185">实例对象.toString()</font>**
toString方法返回实例的字符串形式.
返回得是去掉? 的字符串形式
该方法通过实例对象来调用

```js
var url = new URL('https://example.com?foo=1&bar=2');
var params = new URLSearchParams(url.search);
params.toString() // "foo=1&bar=2'
```
  


### **<font color="#C2185">实例对象.append()</font>**
用来追加一个查询参数.它接受两个参数第一个为键名第二个为键值没有返回值.
```js
  var params = new URLSearchParams({'foo': 1 , 'bar': 2});
  params.append('baz', 3);
  params.toString() // "foo=1&bar=2&baz=3"
```

### **<font color="#C2185">实例对象.delete()</font>**
用来删除指定的查询参数.它接受键名作为参数
```js
  var params = new URLSearchParams({'foo': 1 , 'bar': 2});
  params.delete('bar');
  params.toString() // "foo=1"
```

### **<font color="#C2185">实例对象.has()</font>**
返回一个布尔值表示查询字符串是否包含指定的键名.
```js
  var params = new URLSearchParams({'foo': 1 , 'bar': 2});
  params.has('bar') // true
  params.has('baz') // false
```

### **<font color="#C2185">实例对象.set()</font>**
set()方法用来设置查询字符串的键值
```js
  var params = new URLSearchParams('?foo=1');
  params.set('foo', 2);
  params.toString() // "foo=2"
```

### **<font color="#C2185">实例对象.get()</font>**
用来读取查询字符串里面的指定键.它接受键名作为参数.
```js
  var params = new URLSearchParams('?foo=1');
  params.get('foo') // "1"
```

### **<font color="#C2185">实例对象.getAll(指定属性名)</font>**
会将获取的内容放到一个数组中返回


### **<font color="#C2185">URLSearchParams.sort()</font>**
对查询字符串里面的键进行排序规则是按照 Unicode 码点从小到大排列.

<br>

# File 对象
File 对象代表一个文件用来读写文件信息.它继承了 Blob 对象或者说是一种特殊的 Blob 对象所有可以使用 Blob 对象的场合都可以使用它.

最常见的使用场合是表单的文件上传控件(<input type="file">)用户选中文件以后浏览器就会生成一个数组里面是每一个用户选中的文件它们都是 File 实例对象.

https://www.wangdoc.com/javascript/bom/file.html


### **<input type="file"> 所支持的属性: **
### **<font color="#C2185">required</font>**

### **<font color="#C2185">accept</font>**
accept 属性的值是一个包含一个或多个（用逗号分隔）这种唯一文件类型说明符的字符串。 
```js
<input type="file" accept="image/*,.pdf">


accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
```
一个不带扩展名的 MIME 类型字符串。
字符串 audio/*,  表示 “任何音频文件”。
字符串 video/*, 表示 “任何视频文件”。
字符串 image/*, 表示 “任何图片文件”。


### **<font color="#C2185">capture</font>**
捕获图像或视频数据的源
如果 accept (en-US) 属性指出了 input 是图片或者视频类型, 则它指定了使用哪个摄像头去获取这些数据

### **<font color="#C2185">files</font>**
FileList 对象每个已选择的文件。如果 multiple 属性没有指定, 则这个列表只有一个成员。


### **<font color="#C2185">multiple</font>**
布尔值, 如果出现, 则表示用户可以选择多个文件


### **``<input type="file">`` 所支持的事件: **
change
input


### **获取已选择文件的信息: **
被选择的文件以 HTMLInputElement.files 属性返回, 它是一个包含一列 File 对象的 FileList 对象。FileList 的行为像一个数组, 所以你可以检查 length 属性来获得已选择文件的数量。

每个 File 包含下列信息：
name:
文件名。

lastModified:
一个数字, 指定文件最后一次修改的日期和时间, 以 UNIX 新纪元（1970 年 1 月 1 日午夜）以来的毫秒数表示。

size:
以字节数为单位的文件大小。

type:
文件的 MIME 类型。





# FileReader
FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容
浏览器原生提供一个FileReader构造函数用来生成 FileReader 实例.
```js
var reader = new FileReader();
```

### **<font color="#C2185">reader.error</font>**
读取文件时产生的错误对象


### **<font color="#C2185">reader.readyState</font>**
整数表示读取文件时的当前状态.一共有三种可能的状态
0表示尚未加载任何数据
1表示数据正在加载
2表示加载完成.
``` 
    终止读取操作readyState属性将变成2.
```


### **<font color="#C2185">reader.result</font>**
**读取完成后的文件内容**有可能是字符串也可能是一个 ArrayBuffer 实例.


### **事件: **
### **<font color="#C2185">reader.onabort</font>**
abort事件(用户终止读取操作)的监听函数.


### **<font color="#C2185">reader.onerror</font>**
error事件(读取错误)的监听函数.


### **<font color="#C2185">reader.onload</font>**
load事件(读取操作完成)的监听函数通常在这个函数里面**使用result属性拿到文件内容**.


### **<font color="#C2185">reader.onloadstart</font>**
loadstart事件(读取操作开始)的监听函数.


### **<font color="#C2185">reader.onloadend</font>**
loadend事件(读取操作结束)的监听函数.


### **<font color="#C2185">reader.onprogress</font>**
progress事件(读取操作进行中)的监听函数.


### **读取方式: **
### **<font color="#C2185">reader.readAsText(目标)</font>**
读取完成后result属性将返回文件内容的文本字符串.该方法的第一个参数是代表文件的 Blob 实例第二个参数是可选的表示文本编码默认为 UTF-8.


### **<font color="#C2185">reader.readAsArrayBuffer(目标)</font>**
以 ArrayBuffer 的格式读取文件读取完成后result属性将返回一个 ArrayBuffer 实例.


### **<font color="#C2185">reader.readAsDataURL(目标)</font>**
result属性将返回一个 Data URL 格式(Base64 编码)的字符串代表文件内容.对于图片文件这个字符串可以用于<img>元素的src属性.注意这个字符串不能直接进行 Base64 解码必须把前缀data:*/*;base64,从字符串里删除以后再进行解码.


### **<font color="#C2185">reader.readAsBinaryString(目标)</font>**
result属性将返回原始的二进制字符串.

<br>

# js获取输入光标的位置
https://cloud.tencent.com/developer/article/1753347?from=15425

### **<font color="#C2185"><p contenteditable="true"></font>**
我们给一个标签添加上 contenteditable 属性则该标签的内部元素则变为可编辑状态


### **如何获取光标的位置: **
### **<font color="#C2185">window.getSelection();</font>**
selection对象是用户再页面上选择的范围的对象
```js
let selection = window.getSelection();
```

### **<font color="#C2185">selection.getRangeAt(0)</font>**
selection对象里面包含0个或多个range对象 通过range对象的属性和方法就可以获取到鼠标光标所在的位置 和 鼠标光标处插入dom节点
```js
let selection = window.getSelection();
let range = selection.getRangeAt(0);
```

### **<font color="#C2185">range.endContainer 光标所在的节点</font>**
### **<font color="#C2185">range.endOffset 光标所在节点的偏移量</font>**
使用range对象的endContainer属性获取光标所在的dom对象
使用range对象的endOffset获取光标所在dom对象的偏移量



### **创建要插入的dom节点: **
```js
let node = document.createElement("span")
node.setAttribute("class", "at")
node.innerHTML = "测试"
```

### **在光标处插入dom元素: **
### **<font color="#C2185">range.insertNode(node)</font>**
```js
let selection = window.getSelection();
let range = selection.getRangeAt(0)

let endDom = range.endContainer
let offset = range.endOffset

let node = document.createElement("span")
node.setAttribute("class", "at")
node.innerHTML = "测试"

range.insertNode(node)
```

<br>

# onsubmit事件
我们一般会阻止表单的自动提交
阻止表单提交事件的步骤
1. 给表单绑定submit事件
2. 在事件内部调用 e.preventDefault();
3. 按钮使用 <input type="submit">
``` 
  button类型必须指定为 submit 要不不会触发表单的提交
```

```js
let submit = document.querySelector("#sub")
form.onsubmit = function(e) {
  e.preventDefault();
}
```

<br>

# 自定义实现 监听事件 和 触发事件 逻辑

### **1. 定义 事件对象 内包含 : **
事件对象
    - 事件名: [事件回调]
    - 存放 要绑定的事件

绑定事件的方法
触发事件的方法

```js
let eventObject = {
  event: {
    // 假设事件名
    hypothesisEventName: []
  },

  // 绑定事件的方法
  on(eventName, eventFn) {
    // 如果要 绑定的事件 在event对象中 则将回调 push 到 事件回调数组中
    if(this.event[eventName]) {
      this.event[eventName].push(eventFn)
    } else {
      // 如果要绑定的事件 不在事件对象中 则进行初始化
      this.event[eventName] = []
      this.event[eventName].push(eventFn)
    }
  },

  // 触发事件
  emit(eventName, data) {
    if(this.event[eventName]) {
      this.event[eventName].forEach(fn => fn(data))
    }
  }
}


// 示例:
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

上面我们就完成了 "自定义事件的逻辑"
通过去订阅我们自己设定的事件 监听触发完成回调
```

<br>

# 视频全屏相关
全屏api可以控制浏览器的全屏显示 让一个element节点以及它的子节点占满用户的整个屏幕

现在各大浏览器都支持这个api 但是使用的时候需要加上浏览器前缀

### **<font color="#C2185">全屏的方法 requestFullscreen()</font>**
这个方法可以使整个节点全屏状态 但是该方法必须用户手动触发才能生效
```js 
    btn.onclick = function() {
      el.requestFullscreen()
    }

    // 要加上浏览器前缀 判断有这个方法你再进行调用
    if(el.requestFullscreen) {
        el.requestFullscreen()
    }

    el.requestFullscreen
    el.mozRequestFullScreen
    el.msRequestFullscreen
    el.webkitRequestFullscreen
```

放大一个节点时 firefox和chrome在行为上略有不同
firebox自动为该节点增加一条css规则 将该元素放大至全屏状态 width 100% height 100%

而chrome则是将该节点 放在屏幕的中央 保持原来的大小 其它的部分变黑 
为了让chrome的行为与firebox保持一致 可以自定义一条css规则
``` 
    :-webkit-full-screen #myvideo {
        width: 100%;
        height: 100%;
    }
```


### **<font color="#C2185">document.exitFullscreen()</font>**
用于取消全屏 该方法也带有浏览器前缀
```js 
    document.exitFullscreen()
    document.msExitFullscreen()
    document.mozCancelFullScreen()
    document.webkitExitFullscreen()
```

### **如何判断节点是否为全屏: **
### **<font color="#C2185">方式1: document.fullscreenElement</font>**
该属性返回正处于全屏状态的el节点 如果当前没有节点处于全屏状态 则返回null
```js 
    document.fullscreenElement
    document.mozFullScreenElement
    document.webkitFullscreenElement
```

### **<font color="#C2185">方式2: document.fullScreen</font>**
```js
    const isFullScreen = 
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenElement

    这个变量会返回 true / false
```


### **<font color="#C2185">document.fullscreenEnabled</font>**
该属性返回一个布尔值 表示当前文档是否可以切换到全屏状态
判断当前浏览器是否可以全屏可以用它


### **全屏事件: **
### **<font color="#C2185">fullscreenchange事件</font>**
浏览器进入或离开全屏的时候触发


### **<font color="#C2185">fullscreenerror事件</font>**
浏览器无法进入全屏时触发 可能是技术或者是用户拒绝

```js  
    document.addEventListener("fullscreenchange", () => {
        if(document.fullscreenElement) {
            console.log("进入全屏")
        } else {
            console.log("退出全屏")
        }
    })
```

上面的代码发生fullscreenchange时 通过fullscreenElement属性判断到底是进入全屏还是退出全屏


### **全屏状态的css: **
全屏状态下 大多数的浏览器css支持 
    :full-screen伪类 

只有ie11支持 :fullscreen伪类 使用这个伪类 可以对全屏状态设置单独的css属性
```css
    :-webkit-full-screen
    :-moz-full-screen
    :-ms-fullscreen
    :full-screen
    :fullscreen
    
    :-webkit-full-screen video {
        width: 100%;
        height: 100%;
    }
```

<br><br>

# bitbug
制作favicon图标
https://www.bitbug.net/
正方形图片 图片尺寸不要过大

<br>

# postMessage
postMessage是html5引入的API,
postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,

可以实现跨文本文档
多窗口
跨域消息传递
多用于窗口间数据通信

这也使它成为跨域通信的一种有效的解决方案.

### **发送数据: **
### **<font color="#C2185">otherWindow.postMessage(message, targetOrigin, [transfer]);</font>**
解析: 
otherWindow
向该窗口发送数据
otherWindow是窗口的一个引用,
``` 
    - 比如iframe的contentWindow属性,
    - 执行window.open返回的窗口对象,
    - 或者是命名过的或数值索引的window.frames.
```

message
数据

targetOrigin
通过窗口的origin属性来指定哪些窗口能接收到消息事件
指定后只有对应origin下的窗口才可以接收到消息,设置为通配符"*"表示可以发送到任何窗口,
``` 
    如果想要发送到与当前窗口同源的窗口,可设置为"/"
```

transfer
是一串和message同时传递的**Transferable**对象,这些对象的所有权将被转移给消息的接收方,而发送一方将不再保有所有权.


### **接收数据: **
接收方 给 window 绑定 "message" 事件 事件的回调中的 event 身上有我们想要得数据
```js
    window.addEventListener("message", fn, false) ;

    function fn(event) {
        var origin= event.origin;
        console.log(event);
    }
```

### **<font color="#C2185">event.data</font>**
指的是从其他窗口发送过来的消息对象

### **<font color="#C2185">event.type</font>**
指的是发送消息的类型;

### **<font color="#C2185">event.source</font>**
指的是发送消息的窗口对象;

### **<font color="#C2185">origin</font>**
指的是发送消息的窗口的源


### **应用场景: **
我们都知道JSONP可以实现解决GET请求的跨域问题,但是不能解决POST请求的跨域问题.而postMessage都可以

要点: 
1. document.getElementById("otherPage").contentWindow
获取iframe的窗口对象

1. 父窗体创建跨域iframe并发送信息
```html 
<script type="text/JavaScript">    
    function sendPost() { 
                     
        // 获取id为otherPage的iframe窗口对象       
        var iframeWin = document.getElementById("otherPage").contentWindow;       

        // 向该窗口发送消息       
        iframeWin.postMessage(document.getElementById("message").value, 'http://moweide.gitcafe.io');
    }   

    // 监听跨域请求的返回   
    window.addEventListener("message", function(event) {
        console.log(event, event.data);
    }, false);
</script>
```

<br>

# formData对象
用户点击“提交”按钮每一个控件都会生成一个键值对键名是控件的name属性键值是控件的value属性

所有的键值对都会提交到服务器.
但是提交的数据格式跟``<form>``元素的method属性有关.该属性指定了提交数据的 HTTP 方法.如果是 GET 方法所有键值对会以 URL 的查询字符串形式提交到服务器
比如: /handling-page?user_name=张三

如果是 POST 方法所有键值对会连接成一行作为 HTTP 请求的数据体发送到服务器
比如: user_name=张三&user_passwd=123&submit_button=提交
下面就是 POST 请求的头信息.

注意:
实际提交的时候只要键值不是 URL 的合法字符(比如汉字“张三”和“提交”)浏览器会自动对其进行编码.


### **<font color="#C2185">new FormData(form)</font>**
原生当中根据form自动收集表单数据到 formData 对象中
```js 
    let formData = new FormData(document.querySelector("form"))
```

参数: 
    - DOM表单元素
    - 构造函数会自动处理表单的键值对

    - 空
    - 那就创建一个空的表单对象 需要我们自己往里面添加值


### **实例方法: **
### **<font color="#C2185">formData.get(key)</font>**
获取指定键名对应的键值参数为键名.如果有多个同名的键值对则返回第一个键值对的键值.

### **<font color="#C2185">formData.getAll(key)</font>**
返回一个数组表示指定键名对应的所有键值.
如果有多个同名的键值对数组会包含所有的键值.

### **<font color="#C2185">formData.set(key, value)</font>**
设置指定键名的键值, 没有就添加 已有就更新
如果第二个参数是文件还可以使用第三个参数表示文件名.

### **<font color="#C2185">formData.delete(key)</font>**
删除一个键值对参数为键名.

### **<font color="#C2185">formData.append(key, value)</font>**
添加一个键值对.如果键名重复则会生成两个相同键名的键值对.
如果第二个参数是文件还可以使用第三个参数表示文件名.
``` 
    formData.append('userpic[]', myFileInput.files[0], 'user1.jpg');
```

### **<font color="#C2185">formData.has(key)</font>**
返回一个布尔值表示是否具有该键名的键值对.

### **<font color="#C2185">formData.keys()</font>**
返回一个遍历器对象
用于for...of循环遍历所有的键名.

### **<font color="#C2185">formData.values()</font>**
返回一个遍历器对象
用于for...of循环遍历所有的键值.

### **<font color="#C2185">formData.entries()</font>**
返回一个遍历器对象
用于for...of循环遍历所有的键值对.
结果是
    ["key", "value"]

``` 
    如果直接用for...of循环遍历 FormData 实例默认就会调用这个方法.
```


### **属性: **
### **<font color="#C2185">enctype</font>**
表单能够用四种编码向服务器发送数据.编码格式由表单的enctype属性决定.
对 请求体 进行编码的格式

### **<font color="#C2185">GET</font>**
如果表单使用GET方法发送数据enctype属性无效.
因为:
?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
```js
    <form
        action="register.php"
        method="get"
        onsubmit="AJAXSubmit(this); return false;"
    >
    </form>
```


### **<font color="#C2185">POST</font>**
application/x-www-form-urlencoded
如果表单用POST方法发送数据并省略enctype属性那么数据以application/x-www-form-urlencoded格式发送(因为这是默认值).

```js
    Content-Type: application/x-www-form-urlencoded
    foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A
```

text/plain
如果表单使用POST方法发送数据enctype属性为text/plain那么数据将以纯文本格式发送.
```js
    Content-Type: text/plain

    foo=bar
    baz=The first line.
    The second line.
```

multipart/form-data
如果表单使用POST方法enctype属性为multipart/form-data那么数据将以混合的格式发送.
```js 
    Content-Type: multipart/form-data; boundary=<br><br><br>314911788813839

    <br><br>----314911788813839
    Content-Disposition: form-data; name="foo"

    bar
    <br><br>----314911788813839
    Content-Disposition: form-data; name="baz"

    The first line.
    The second line.

    <br><br>----314911788813839--
```

### **node后台接收到的数据类型就是 利用了multipart中间件: **
```js
{ username: [ 'sam', 'erin' ], password: [ '123' ] }
```

<br>

### **文件上传: **
用户上传文件也是通过表单.具体来说就是通过文件输入框选择本地文件提交表单的时候浏览器就会把这个文件发送到服务器.
```js 
    <input type="file" id="file" name="myFile">
```

### **要点: **
1. 将 form 的 method 设置为 post
2. enctype 设置为 multipart/form-data
``` 
    enctype属性决定了 HTTP 头信息的Content-Type字段的值
    默认情况下这个字段的值是application/x-www-form-urlencoded
    但是文件上传的时候要改成multipart/form-data.
```

3. 新建一个 FormData 实例对象 把选中的文件添加到这个对象上面.
```js 
    var formData = new FormData();

    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // 只上传图片文件
        if (!file.type.match('image.*')) {
            continue;
        }

        formData.append('photos[]', file, file.name);
    }
```

4. 最后使用 Ajax 向服务器上传文件.
```js 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'handler.php', true);

    xhr.onload = function () {
        if (xhr.status !== 200) {
            console.log('An error occurred!');
        }
    };

    xhr.send(formData)


    // 除了发送 FormData 实例也可以直接 AJAX 发送文件.
    var file = document.getElementById('test-input').files[0];
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'myserver/uploads');
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
```


<br>

# image对象
当我们创建一个 Image 对象时, 就相当于给浏览器缓存了一张图片

### **通过构造函数的方式: **
创建 image 对象:
```js
let img = new Image([宽度],[高度])
```

img 也相当于一个节点对象 节点身上有的属性 它都有 如
```js
// 给浏览器缓存了一张图片
img.src = ""
```


**注意:**
src 属性一定要写到 onload 的后面否则程序在 IE 中会出错.


### **图片对象身上的属性: **
img.complete:
    - 返回一个布尔值
    - 可以通过Image对象的complete 属性来检测图像是否加载完成

每个Image对象都有一个complete属性当图像处于装载过程中时该属性值false
当发生了onload、onerror、onabort中*任何一个事件后则表示图像装载过程结束(不管成没成功)此时complete属性为true*

img.border  
img.height  
img.width
img.src  
img.name  
img.vspace  
img.hspace  
img.lowsrc  


### **图片对象身上的事件: **
onabort
当用户放弃图像的装载时调用

onload
当图像装载完毕时调用

onerror
在装载图像的过程中发生错误时调用

```js
    var img = new Image();    
    img.src = oImg[0].src = this.src.replace(/small/, "big");    
    oDiv.style.display = "block";    
    img.complete ? oDiv.style.display = "none" : (oImg[0].onload = function() {oDiv.style.display = "none"})  
```

onkeydown 
onkeypress 
onkeyup


### **应用场景: **
Image 对象也常用来做预加载图片（也就是将图片预先加载到浏览器中, 当浏览图片的时候就能享受到极快的加载速度）。

在HTML页面中, <img> 标签每出现一次, 也就创建了一个 Image 对象。

HTML代码的加载 和 图片的加载是同时的, 虽然 图片已经进行过预加载, 但是尽管这样 加载的速度 相比较 HTML 代码的加载速度 还是要慢一些的。就需要用 Image对象中的 onload事件来解决这个问题了。。


### **image对象的src: **
当我的src指向一个地址时 我会发送请求去拿它, 这是浏览器自己会做的
img.src = arr[i];

<br>

# IntersectionObserver
该API在兼容性上有很大的问题 所以w3c提供了一个 npm包 专门用来解决兼容性的问题 也就是我们 要我们要先使用这个包 然后才能接着用 IntersectionObserver API

### **安装: **
npm install intersection-observer

### **引入: **
import "intersection-observer"
确保它在最前面
在html页面里面的话 相当于如下:
```html
<script src="./js/intersection-observer.js" />
```

### **作用: **
当我们想监听一个元素从不可见到可见从可见到不可见 就可以使用这个api 
自动"观察"元素是否进入视口  
网页开发时常常需要了解某个元素是否进入了“视口”(viewport)即用户能不能看到它.

传统的实现方法是监听到scroll事件后调用目标元素(绿色方块)的getBoundingClientRect()方法得到它对应于视口左上角的坐标再判断是否在视口之内.这种方法的缺点是由于scroll事件密集发生计算量很大容易造成性能问题.

IntersectionObserver API 的用法简单来说就是两行.
```js 
    var observer = new IntersectionObserver(callback, options);
    observer.observe(target);
```


### **<font color="#C2185">new IntersectionObserver(callback, [option])</font>**
IntersectionObserver是浏览器原生提供的构造函数
根据元素的可见性的变化, 就会调用观察器的回调函数, 回调函数会触发两次, 一次是目标刚刚进入视口, 另一次是完全离开视口

要点:
1. 通过它创建的构造函数 需要创建变量来接收实例
2. 调用实例对象.observe() 方法 指定要观察的DOM节点
```js  
    let observer = new IntersectionObserver(callback, options);
    
    // 开始观察
    observer.observe(document.getElementById('example'));

    // 停止观察
    observer.unobserve(element);

    // 关闭观察器
    observer.disconnect();
```


### **实例对象身上的方法: **
### **<font color="#C2185">observer.observe(document.getElementById('example'))</font>**
开始观察
observe()的参数是一个 DOM 节点对象.如果要观察多个节点就要多次调用这个方法.
```js 
    observer.observe(elementA);
    observer.observe(elementB);
```

### **<font color="#C2185">observer.unobserve(element);</font>**
停止观察
取消对某个目标元素的观察延迟加载通常都是一次性的observe 的回调里应该直接调用 unobserve() 那个元素
```js  
    let observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                 entry.target.classList.add('active');

                 // 延迟加载通常都是一次性的
                 observer.unobserve(entry.target);
            }
        })
    })
```

### **<font color="#C2185">observer.disconnect();</font>**
关闭观察器

**注意:**
IntersectionObserver API 是异步的不随着目标元素的滚动同步触发.规格写明IntersectionObserver的实现应该采用requestIdleCallback()即只有线程空闲下来才会执行观察器.这意味着这个观察器的优先级非常低只在其他任务执行完浏览器有了空闲才会执行.



### **<font color="#C2185">new IntersectionObserver(callback, [option])</font>**
该方法接受两个参数: 回调函数callback和配置对象options.
当 目标元素的可见性变化时就会调用观察器的回调函数callback.
``` 
    callback会触发两次.一次是目标元素刚刚进入视口(开始可见)另一次是完全离开视口(开始不可见)
```

### **<font color="#C2185">callback中的参数1. entries:  </font>**
        是一个数组, 里面的元素为被观察的对象
``` 
    如果同时有两个被观察的对象的可见性发生变化entries数组就会有两个成员.
```

### **<font color="#C2185">entry对象</font>**
该对象是 需要通过 遍历 entries 数组 然后在回调中指定entry 才能使用
```js
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        console.log(entry)
    })
}, {})
```

每一个对象身上还有 entry对象 用于提供目标元素的信息(在回调中使用可以得到被观察元素的信息) 
一共有6个属性

```js 
    {
        time: 3893.92,
        rootBounds: ClientRect {
            bottom: 920,
            height: 1024,
            left: 0,
            right: 1024,
            top: 0,
            width: 920
        },
        boundingClientRect: ClientRect {
            // ...
        },
        intersectionRect: ClientRect {
            // ...
        },
        intersectionRatio: 0.54,
        target: element
    }
```

### **属性解析: **
entry.target:   
被观察的目标元素是一个 DOM 节点对象


entry.rootBounds:
容器元素的矩形区域的信息
getBoundingClientRect()方法的返回值
如果没有根元素(即直接相对于视口滚动)则返回null


entry.boundingClientRect:
目标元素的矩形区域的信息


entry.intersectionRect:
目标元素与视口(或容器元素)的交叉区域的信息


entry.isIntersecting:
如果是true 则表示元素从视区外进入视区内.


entry.intersectionRatio: 0 到 1 的数值
目标元素的可见比例
即intersectionRect占boundingClientRect的比例 完全可见时为1 完全不可见时小于等于0


entry.time:     
可见性发生变化的时间是一个高精度时间戳单位为毫秒



### **callback中的参数2 创建的实例对象 observer: **
```js  
    var observer = new IntersectionObserver(
        (entries, observer) => {
            console.log(entries);
        }
    );
```

**要点:**
1. 在合适的位置上操作元素的话 需要用到 entry.target 属性 它是一个DOM节点

2. 这个回调内部逻辑一上来就会执行一次然后目标元素再次进入视口和离开视口的时候都会再触发一次

所以 内部使用 entry.isIntersecting 来进行判断下比较好 当元素进入视口后 执行什么逻辑
```js  
    let observer = new IntersectionObserver((entries, observer) => {
        console.log("我进来了")
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                entry.target.style.background = "pink"
            } else {
                entry.target.style.background = ""
            }
        })
    }, {threshold: [0.25]})

    observer.observe($(".box")[0])
```


因为它会触发两次回调函数 为了解决这个问题 我们可以 当元素进入的时候就添加样式 随后下一行就移除监视
```js
eventBind() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("is-show")

          // 为了解决两次回调的问题 刚添加样式后就移除样式
          observer.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: "0px 0px",
      threshold: 0,
      root: null,
    })

    Array.prototype.forEach.call(this.title, (element) => {
      observer.observe(element)
    })
  }
```


### **option参数 intersection(function(){}, {option}): **
### **option配置对象中的属性: **

### **<font color="#C2185">threshold</font>**
决定了什么时候触发回调函数, 即元素进入视口(或者容器元素)多少比例时执行回调函数.
它是一个数组, 默认值为0 (目标元素与视口交叉面积大于多少时, 触发回调)

要点: 元素的比例
目标元素在容器中显示了多少? 在指定值的时候分别触发
``` 
    它是一个数组每个成员都是一个门槛值默认为[0]即交叉比例(intersectionRatio)达到0时触发回调函数.
```
``` 
    {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    }

    默认值为0, 当为1时, 元素完全显示后触发回调函数

    如果threshold属性是0.5 当元素进入视口50%时触发回调函数.
    如果值为[0.3, 0.6] 则当元素进入30％和60％是触发回调函数.

    用户可以自定义这个数组.
    比如上例的[0, 0.25, 0.5, 0.75, 1]就表示当目标元素 0%、25%、50%、75%、100% 
    可见时会触发回调函数.
```


### **<font color="#C2185">root</font>**
IntersectionObserver不仅可以观察元素相对于视口的可见性还可以观察元素相对于其所在容器的可见性.容器内滚动也会影响目标元素的可见性

root属性指定目标元素所在的容器节点.
``` 
    它有很多后代元素想要做的就是判断它的某个后代元素是否滚动进了自己的可视区域范围.这个 root 参数就是用来指定根元素的默认值是 null.

    如果它的值是 null根元素就不是个真正意义上的元素了而是这个浏览器窗口了可以理解成 window但 window 也不是元素(甚至不是节点).这时当前窗口里的所有元素都可以理解成是 null 根元素的后代元素都是可以被观察的.
```

``` 
    var opts = {
        root: document.querySelector('.container'),
        rootMargin: '0px 0px -200px 0px'
    };

    var observer = new IntersectionObserver(
        callback,
        opts
    );

    表示容器的下边缘向上收缩200像素导致页面向下滚动时目标元素的顶部进入可视区域200像素以后才会触发回调函数.

    这样设置以后不管是窗口滚动或者容器内滚动只要目标元素可见性变化都会触发观察器
```

### **<font color="#C2185">rootMagin</font>**
root如果代表视口 那么进去视口则进入的观察范围, rootMagin用来扩展, 或缩小观察范围, 正值为扩大, 负值为缩小

它的写法类似于 CSS 的margin属性比如0px 0px 0px 0px依次表示 top、right、bottom 和 left 四个方向的值.

减小根元素下方的观察范围, rootMagin:'0 0 -10% 0' 能变相的提高显示基线
``` 
    这个 API 的主要用途之一就是用来实现延迟加载那么真正的延迟加载会等 img 标签或者其它类型的目标区块进入视口才执行加载动作吗？显然那就太迟了.我们通常都会提前几百像素预先加载rootMargin 就是用来干这个的.
```

### **基本用法解析: **
```js  
    let observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){
            if(entry.isIntersecting){
                entry.target.classList.add('active');
            }
        })
    }, {
        threshold:[1]
    });


    document.querySelectorAll('.box').forEach(function(value){
        observer.observe(value);
    })
```

1. 首先创建实例对象, observer
2. 在回调函数中传递目标元素数组形参 entries
3. 在回调内部 遍历数组 并传入 entry形参
4. 判断 目标元素是否进入可视区域 如果进入 则添加什么效果
5. option传入对象 threshold 1



### **图片的懒加载: **
我们希望某些静态资源(比如图片)只有用户向下滚动它们进入视口时才加载这样可以节省带宽提高网页性能.这就叫做“惰性加载”.

1. 图像的 HTML 代码可以写成下面这样.
```js 
    // 图像默认显示一个占位符 data-src属性是惰性加载的真正图像.
    <img src="placeholder.png" data-src="img-1.jpg">
    <img src="placeholder.png" data-src="img-2.jpg">
    <img src="placeholder.png" data-src="img-3.jpg">
```

 - 2. 只有图像开始可见时才会加载真正的图像文件.
```js  
    function query(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    var observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            });
        }
    );

    query('.lazy-loaded').forEach(function (item) {
        observer.observe(item);
    });
```


### **下拉加载更多: **
随着网页滚动到底部不断加载新的内容到页面它的实现也很简单.
```js  
    var intersectionObserver = new IntersectionObserver(
        function (entries) {
            // 如果不可见就返回
            if (entries[0].intersectionRatio <= 0) return;
            loadItems(10);
            console.log('Loaded new items');
        }
    );

    // 开始观察
    intersectionObserver.observe(
        document.querySelector('.scrollerFooter')
    );
```
无限滚动时最好像上例那样页面底部有一个页尾栏(又称sentinels上例是.scrollerFooter).一旦页尾栏可见就表示用户到达了页面底部从而加载新的条目放在页尾栏前面.否则就需要每一次页面加入新内容时都调用observe()方法对新增内容的底部建立观察.


### **视频自动播放: **
下面是一个视频元素希望它完全进入视口的时候自动播放离开视口的时候自动暂停.
``` 
    <video src="foo.mp4" controls=""></video>
```

```js 
let video = document.querySelector('video');
let isPaused = false;

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio != 1  && !video.paused) {
      video.pause();
      isPaused = true;
    } else if (isPaused) {
      video.play();
      isPaused=false;
    }
  });
}, {threshold: 1});

observer.observe(video);
```
上面代码中IntersectionObserver()的第二个参数是配置对象它的threshold属性等于1即目标元素完全可见时触发回调函数.

<br>

# MutationObserver
监听一个普通 JS 对象的变化我们会用 Object.defineProperty 或者 Proxy

```js
const person = new Proxy({}, {
    set(obj, prop, value) {
        console.log("set", prop,value)
        obj[prop] = value

        return true
    }
})

person.name = guang
```

### **作用: **
而*监听元素的属性和子节点*的变化我们可以用 MutationObserver: 

```html
``` 我们准备这样一个盒子: ```
<div id="box"><button>光</button></div>
```

```css
#box {
    width: 100px;
    height: 100px;
    background: blue;

    position: relative;
}
```

我们定时对它做下修改: 
```js
setTimeout(() => {
    box.style.background = 'red';
},2000);

setTimeout(() => {
    const dom = document.createElement('button');
    dom.textContent = '东东东';
    box.appendChild(dom);
},3000);

setTimeout(() => {
   document.querySelectorAll('button')[0].remove();
},5000);
```

2s 的时候修改背景颜色为红色
3s 的时候添加一个 button 的子元素
5s 的时候删除第一个 button.

然后监听它的变化: 
```js
const mutationObserver = new MutationObserver((mutationsList) => {
    // 当节点有变化的时候 会执行回调
    console.log(mutationsList)
});

// 监听 属性 和 子节点
mutationObserver.observe(box, {
    attributes: true,
    childList: true
});
```

创建一个 MutationObserver 对象监听这个盒子的属性和子节点的变化.

mutationsList是一个对象
type: 字符串 可以知道是属性发生了变化 还是 节点发生了变化

addedNodes: 默认值是 NodeList[]
当发生变化的时候 数组里面会有值

removedNodes: 默认值是 NodeList[]

<br>

# ResizeObserver
窗口我们可以用 addEventListener 监听 resize 事件那元素呢？
*元素可以用 ResizeObserver 监听大小的改变*当 width、height 被修改时会触发回调.

除了元素的大小、可见性、属性子节点等变化的监听外还支持对 performance 录制行为的监听

我们准备这样一个元素: 
```html
<div id="box"></div>
```

```css

#box {
    width: 100px;
    height: 100px;
    background: blue;
}
```

在 2s 的时候修改它的高度: 
```js
const box = document.querySelector('#box');

setTimeout(() => {
    box.style.width = '200px';
}, 3000);
```

然后我们用 ResizeObserver 监听它的变化: 
```js
const resizeObserver = new ResizeObserver(entries => {
    console.log('当前大小', entries)
});

resizeObserver.observe(box);
```

target属性:
监听的元素

contentRect属性
这个元素的详细信息

<br>

# 零散小方法

### **判断是否是数组还是对象: **
### **<font color="#C2185">Object.prototype.toString.call(目标对象)</font>**
```js
function checkType(target) {

  let info = {
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Boolean]": "boolean",
    "[object Function]": "function",
    "[object String]": "string",
    "[object Number]": "number",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
  }

  return info[Object.prototype.toString.call(target)]
}
```

<br>

### **全屏 和 退出全屏: **
### **<font color="#C2185">documentElement.requestFullscreen()</font>**
### **<font color="#C2185">document.exitFullscreen();</font>**
全屏和退出全屏的方法不在一个元素上哦

```js 
    fullScreen() {
        this.isFullscreen = true
        if(this.isFullscreen) {
            // 打开全屏
            let documentElement = document.documentElement
            if(documentElement.requestFullscreen) {
                documentElement.requestFullscreen()
            } else if (documentElement.mozRequestFullScreen) {
                documentElement.mozRequestFullScreen()
            } else if(documentElement.webkitRequestFullScreen) {
                documentElement.webkitRequestFullScreen()
            }
        }
    }

    exitFullScreen() {
        this.isFullscreen = false
        if(document.exitFullscreen) {
            document.exitFullscreen()
        }
    }
```

<br>

### **<font color="#C2185">delete 对象</font>**
删除对象中的属性
```js 
    delete req.session['id']
```

删除数组中的指定元素
```js 
    let arr = [1, 2, 3]
    delete arr[1]
    console.log(arr)        [1, empty, 3]
```

<br>

### **<font color="#C2185">数字对象.toFixed(2)</font>**
保留几位小数
会四舍五入

该方法会将结果转为字符串型 但是不会影响原数据
```js  
    let num = 1.123
    let res = num.toFixed(2)
    console.log(typeof num.toFixed(2))      // string
```

<br>

### **<font color="#C2185">元素对象.setCapture()</font>**
针对鼠标按下事件
设置btn01对鼠标按下的相关的事件进行捕获 不管点击谁都显示元素对象身上的事件
``` 
    该方法是针对鼠标按下事件的一种解决方案
    不管点击谁 都会触发元素对象身上的事件(点击事件)
```
只有ie支持但是在火狐中调用时不会报错, 而如果在chrome调用 会报错

使用的时候要先进行判断
```js  
    if(box1.setCapture){
        box1.setCapture();
    }

    box1.setCapture && box1.setCapture();
```
``` 
    我们去拖拽一个网页中的内容时浏览器会默认去搜索引擎中去搜索内容, 此时会导致拖拽功能异常这个是浏览器提供的默认行为 
    
    如果不希望发生这个行为则可以通过return false 来取消默认行为
    最简单的方式在onmousedown的最后来个return false;, 
    
    但是ie8 不起作用 这时候我们就需要使用, 元素对象.setCapture()
```


### **<font color="#C2185">元素对象.releaseCapture();</font>**
取消对事件的捕获

当调用一个元素的setCapture()方法以后这个元素将会把下一次所有的鼠标按下相关的事件捕获到自身上 触发自己身上的事件

``` 
    比如:即使按下按钮2 也会提示alert1 
    换个说法 我给btn01设置完setCapture以后 btn01就像一个强盗一样 它把所有鼠标点击的事件都抢过来, 虽然页面上我点的02

    但btn01设置了setCapture就说 点02就相当于点我 所以弹出了1

    因为btn02的事件被btn01捕获了, 更横的是 不光点按钮鼠标进行的点击相关所有事件都被btn01抢过来显示1了 
```

因为setCapture是针对鼠标点击 按下等事件 解决ie浏览器的默认行为的现象
那我们可以在鼠标抬起的时候解绑setCapture
```js 
    document.onmouseup = function(){
        document.onmousemove = null;

        // 当鼠标抬起的时候 两种方式都可以
        document.releaseCapture?
        canvas
        document.releaseCapture && document.releaseCapture();
    };
```

<br>

### **<font color="#C2185">confirm()</font>**
用于弹出一个带有确认和取消按钮的提示框需要一个字符串作为参数
该字符串作为提示文字显示出来
    确定返回true
    取消返回false
```js 
    let result = confirm('确定要点击么');
    console.log(result);
```

<br>

### **<font color="#C2185">prompt()可以弹出一个输入框</font>**
该提示框中会有一个文本框用户可以在文本框中输入一段内容
该函数需要一个字符串作为参数该字符串将会作为提示框的提示文字

这个函数的返回值是String类型的

```js 
    // 用户输入的内容将会作为函数的返回值返回可以定义一个变量来接受该内容
    var score = prompt("提示内容"); 
```

<br>

### **<font color="#C2185">isNaN()</font>**
这个方法用来 判断非数字, 并且返回一个值, 
如果是数字        false, 
如果不是数字      true

原理: 
它是判断一个值能否被 Number() 合法地转化成数字.
如果能转化那就算做是数字, 所以isNaN()的结果会是 false

### **1. 数字形式的字符串.: **
    例如 "123"、"-3.14" 虽然是字符串型
    但被 isNaN() 判为数字 返回 false.("12,345,678""1.2.3" 这些返回 true)

### **2. 空值.: **
    null、 空字符串""、 空数组[] 都可被Number()合法的转为0
    于是被isNaN认为是数返回false.
            
    但是 (undefined、空对象{}、空函数等无法转数字返回true) ！！！

### **3. 布尔值.: **
    Number(true)=1, 
    Number(false)=0 所以isNaN对布尔值也返回false.

### **4. 长度为 1 的数组.: **
    结果取决于其中元素即: isNaN([a])=isNaN(a)可递归.
    例如isNaN([["1.5"]])=false.

### **5. 数字特殊形式: **
    例如"0xabc"、"2.5e+7"这样的十六进制和科学计数法即使是字符串也能转数字所以也返回false.


### **<font color="#C2185">Math.sqrt()</font>**
可以通过Math.sqrt()对一个数进行开方
``` 
    var result = Math.sqrt(4);
    console.log(result);        //值为2 
```


### **<font color="#C2185">console.time("") 和 console.timeEnd("")</font>**
开发代码的过程中我们要考虑提升性能也就是提升处理速度
console.time / timeEnd 用来测试花费的毫秒数可以用来测试性能
它需要一个字符串作为参数这个字符串将会作为计时器的标识 或者理解为计时器的name
``` 
    console.time("test");开始
    +
    程序
    +
    console.timeEnd("test");停止
```
    

### **<font color="#C2185">for...in -- 枚举(遍历)对象中的属性</font>**
语句: 

    for(let 变量 in 对象) {
        
    }
```js  
    for(let key in obj) {
        console.log(key)
    }
```

for...in语句 对象中有几个属性循环体就会执行几次, 每次执行时会将对象中的一个属性的名字赋值给变量
```js  
    var obj = {
        name:"sunwukong",
        age:18,
        gender:"男",
        address:"花果山"
    }

    for(var n in obj){
        console.log(obj[n]);       
        // []的特点就是可以传变量假如直接写obj.n的话就是在obj中找叫n的属性 
    }
```

key         -- >     属性名
obj[key]    -- >     属性值



### **<font color="#C2185">in 运算符</font>**
通过该运算符可以检查一个对象中是否含有指定的属性
如果有返回true没有返回false
语法: 

    "属性名" in 对象
``` 
    检查obj中是否含有test2这个属性: 
    console.log("test2" in obj);
```
    

### **<font color="#C2185">instanceof 运算符</font>**
使用instanceof可以检查一个对象是否是一个类的实例
```js  
    class Demo {
        name = "sam"
    }
    let d = new Demo()
    console.log(d instanceof Demo)      // true
```


比如我们可以利用instanceof来判断一个对象是不是数组
```js  
    console.log(arr instansof Array) 

    function checkType(target) {
        return target instanceof Array
    }
    
    let arr = []
    let obj = {}
    let res = checkType(obj)
    console.log(res)            // false
```

### **<font color="#C2185">对象 instanceof 构造函数</font>**
检查这个对象是不是这个构造函数的实例, 是为true否为false 

**注意:**
所有的对象都是object的后代所以任何对象和object做instanceof检查时都会返回true 
``` 
    console.log(per instanceof Person);
```


### **<font color="#C2185">Array.isArray(arr)</font>**
是返回true 不是false 这个方法会优先于instanceof
H5新增 ie9以上才支持

<br>

# 小野集锦

<br><br>

# 树形数据结构化

## 扁平化数据示例:
我们将多维数组变成一维数组就是数据的扁平化  
```js
const data = [
  {
    id:2,
    pid: 0,
    path: "/course",
    name: "Course",
    title: "课程管理"
  },
  {
    id:3,
    name: "CourseOperate",
    path: "operate",
    link: "/course/operate",
    pid: 2,   // parentId
    title: "课程操作"
  },
  {
    id:4,
    name: "CourseInfoData",
    path: "info_data",
    link: "/course/operate/info_data",
    pid: 3,   // parentId
    title: "课程数据"
  },
  {
    id:5,
    name: "CourseAdd",
    path: "add",
    link: "/course/add",
    pid: 2,
    title: "增加课程"
  },
  {
    id:6,
    pid: 0,
    name: "Student",
    path: "/student",
    title: "学生管理"
  },
  {
    id:7,
    pid: 6,
    name: "StudentOperate",
    link: "/student/operate",
    path: "operate",
    title: "学生操作"
  },
  {
    id:8,
    pid: 6,
    name: "StudentAdd",
    link: "/student/add",
    path: "add",
    title: "增加学生"
  },
]
```

<br>

## 数据树形结构化:
就是将这个扁平的一维数组, 通过它里面的某一个字段(比如pid)去关联 形成一个嵌套型的树形结构

所以我们要找到扁平化数据中的数组成员中哪个一个字段能够说明这个树形结构 比如上面的数据结构中 我们就可以根据 pid 字段来说明树形结构

pid: 该数组成员的 爸爸 的id

比如:  
有 pid: 0 的数组成员 就表示该成员为第一级数据 它没有爸爸 

有 pid: 2 的数组成员 就表示该成员为 id:2 的子数据 它的爸爸是id:2

<br>

### 我们期望的数据结构的样子:
先放的是 pid: 0 的成员
```js
const data = [
  {
    id:2,
    pid: 0,
    path: "/course",
    name: "Course",
    title: "课程管理"
  },
  {
    id:6,
    pid: 0,
    name: "Student",
    path: "/student",
    title: "学生管理"
  },
]
```

<br>

然后我们找 id: 2 的子数据 和 id: 6 的子数据 放在children 中 也就是放2级数据到数据结构中

然后依次根据 pid: ? 将该数据放到对应的结构中(</font color="#C2185B">pid该数据的爸爸是哪个id</font>)
```js
const data = [
  {
    id:2,
    pid: 0,
    path: "/course",
    name: "Course",
    title: "课程管理",
    chlidren: [
      {
        id:3,
        name: "CourseOperate",
        path: "operate",
        link: "/course/operate",
        pid: 2,   // parentId
        title: "课程操作",
        children: [
          {
            id:4,
            name: "CourseInfoData",
            path: "info_data",
            link: "/course/operate/info_data",
            pid: 3,   // parentId
            title: "课程数据"
          },
        ]
      },
      {
        id:5,
        name: "CourseAdd",
        path: "add",
        link: "/course/add",
        pid: 2,
        title: "增加课程"
      },
    ]
  },
  {
    id:6,
    pid: 0,
    name: "Student",
    path: "/student",
    title: "学生管理",
    chlidren: [
      {
        id:7,
        pid: 6,
        name: "StudentOperate",
        link: "/student/operate",
        path: "operate",
        title: "学生操作"
      },
      {
        id:8,
        pid: 6,
        name: "StudentAdd",
        link: "/student/add",
        path: "add",
        title: "增加学生"
      },
    ]
  },
]
```

<br>

## 树形数据结构化的应用场景:

### 场景1: 权限路由
Vue React项目中有一些权限是动态的 也就是会从后台返回一个 扁平化的路由数据(路由权限列表)

路由权限列表是一个扁平化的数据 并不是树形结构 它会有一个类似pid的字段 用来来说明 扁平化数据的树形结构的组织方式

当我们从后台接到这样的数据后 首先要先将该扁平化数据 变成 树形结构 然后我们根据树形结构将其变成路由 然后将它们动态的加到路由列表中

<br>

### 场景2: 根据数据渲染DOM节点
数据渲染DOM节点也是一样 扁平化的数据是没有办法做DOM渲染的 我们只有将其转换成树形结构后 才能渲染DOM节点

<br><br>

## 树形结构化:
树形结构化逃不开递归操作的

首先一个扁平化的数据列表中 肯定会有一个描述树形结构的字段(至少一个)

上面的示例中的 pid 就是  
pid 对应 id, pid是几它就是哪个id下的children里面的数据

<br>

### 思路: 递归
首先, 我们要筛选出顶级数据, 比如pid为0的数据 也就是将顶级与子级数据分开

然后, 分开后我们要判断 pid 和 id 只要它俩一对上 我们就要将当前的的数据 放到对应id的数据的children中

```js
function formatDataTree(data) {
  // 找到顶级数据 使用filter进行筛选, pid为0的则是顶级数据
  let parents = data.filter(p => p.pid === 0)

  // 找到子级数据
  let children = data.filter(c => c.pid !== 0)


  // 调用下面的函数 处理 parents 和 children 之间的父子关系
  dataToTree(parents, children)


  // 该函数的声明位置在 formatDataTree 内部
  // 用于处理 顶级数据 和 子级数据 的嵌套关系
  function dataToTree(parents, children) {

    // 遍历 parents 找到每一个 parent 顶级数据
    parents.map(p => {

      // 遍历 children 找到每一个 子级数据
      children.map(c => {
        // 判断 pid 和 id 是否相等
        if(c.pid == p.id) {

          // 如果相等 说明 id: 3(pid: 2) 是 id: 2 的子数据

          // 先判断父级对象中有没有children属性 没有的话没有办法push
          if(p.children) {
            // 如果有children属性 则直接push
            p.children.push(c)
          } else {
            /*
              父级中没有children的话 先给父级增加一个children属性 值是一个[], 同时将当前的子级放入数组中

              我们的目的就是 c.pid == p.id 的时候将 c 放入 p 中 但是我们要考虑 p 中有没有 children 属性 else的逻辑中就是没有 children 属性的情况 再该情况下 我们要做两件事 

              1. 给 p 初始化一个 children
              2. 将 c 放到 children 中
            */
            p.children = [c]
          }
        }
      })
    })
  }


  // 最终我们将 parents 返回就可以了
  return parents
}
```

<br>

上面的逻辑之后 我们解决了 顶级 和 子级 的情况 但是还有 子级 的 子级是么 我们还有递归操作

```js
function formatDataTree(data) {
  let parents = data.filter(p => p.pid === 0)
  let children = data.filter(c => c.pid !== 0)

  dataToTree(parents, children)


  // 这里我们传入的是2个数组
  function dataToTree(parents, children) {

    parents.map(p => {
      children.map((c, i) => {
        if(c.pid == p.id) {

          /*  
            在这里我们再对 c 的 id 进行检测, 这里也就是将每一个c看成父级数据 看看所有的 children(这里是分里出来的所有子级数据) 中是否还有属于c的子级数据
            
            但是这里的 c 和 p 都是对象 而我们下面的函数要求传入数组 所以我们可以传入 [c]

            我们传入
            [c]
            children: 它是所有的子级数据 我们从它里面挑属于c的子级数据

            但是 children 不能直接放入 因为它是一个引用值 所以我们要深拷贝一下
          */
          // 深拷贝下
          let _children = JSON.parse(JSON.stringify(children))

          /*
            我们这个案例中是1对1的逻辑 一个子级数据不会存在于二个父级数据中

            我们这里有一个问题 每次我们调用 dataToTree() 的时候都会遍历所有的children

            parents.map()
              children.map()

            我们将 _children 传入 dataToTree 后 又会再次的遍历 children

            这样就不好了 我们可以这么改进 我们每次都可以删除一个c 也就是说当我们进入 

            if(c.pid == p.id) 判断后 我们就将当前的这个c从_children中删除 这样做的好处就当我们匹配过了就不用再次的匹配了

            _children里面的数据不断的减少 当我们通过dataToTree传入_children的时候 相当于变成

            parents.map()
              _children.map()

            性能会好一点
          */
          _children.splice(i, 1)
          dataToTree([c], _children)


          if(p.children) {
            p.children.push(c)
          } else {
            p.children = [c]
          }
        }
      })
    })
  }

  // 这里也可以放在上面
  return parents
}
```

<br>

**整理用:**
```js
function formatDataTree(data) {
  let parents = data.filter(p => p.pid == 0) 
  let children = data.filter(c => c.pid != 0)

  dataToTree(parents, children)

  return parents

  function dataToTree(parents, children) {

    // 我觉得不用map更符合语义
    parents.map(p => {
      children.map((c, i) => {

        if(c.pid == p.id) {

          let _children = JSON.parse(JSON.stringify(children))
          _children.splice(i, 1)
          dataToTree([c], _children)
          
          if(p.children) {
            p.children.push(c)
          } else {
            p.children = [c]
          }
        }
      })
    })
  }
}
let treeData = formatDataTree(data)
console.log(JSON.stringify(treeData, null, 2))
```

<br>

### 思路: 
这里我们说一下另一种做法, 上面示例数据是扁平化的数据 那我们能不能用 扁平化的思想去解决树形结构的问题的 

当我们在遍历扁平化数据的过程中 就给这个扁平化的数据 增加子数据 也就是我们遍历的时候 每遍历到一个数组成员 我都去找它的子级成员

```js
function formatDataTree(data) {
  /*
    因为我们要遍历扁平化数组 在遍历的过程中每找到一个成员
    然后我们再次的遍历整体的数据找该成员的子级

    所以我们将 data 复制一份 我们操作的是跟data一样的新的数组_data
  */
  let _data = let _children = JSON.parse(JSON.stringify(data))


  // p 每一个元素都可以看做是父级 因为只有父级才会找它的子元素
  return _data.filter(p => {

    // 我们再次遍历_data 返回的数组为当前p的children
    const _arr = _data.filter(c => c.pid == p.id)

    // 如果有自己 就将p的children赋值为 _arr
    _arr.length && (p.children = _arr) 

    // 我们要return出去顶级元素 顶级元素为pid==0的
    return p.pid == 0
  })
}
```

<br><br>

# 惰性函数:

## 示例:
**需求:**  
我们希望拿到的是第一次的结果 不用多次创建数据, 我们期望的就是拿到同样的值

```js
// 单例模式:
let timeStamp = null

function getTimeStamp() {

  if(timeStamp) {
    return timeStamp
  }

  return new Date().getTime()
}

console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())

// 当我们执行多次的时候 次次都是一样的结果
```

<br>

**问题:**  
上面的代码中存在的问题

- 每次执行 getTimeStamp() 都会走 if逻辑 (</font color="#C2185B">这也是惰性函数要解决的问题</font>)

- 这个函数有副作用 依赖于外部的变量 timeStamp, timeStamp可能会被别的逻辑修改


每次都会走if 但是无乱我们执行多少次 getTimeStamp() 出来的都是同一个值 执行1000次都要走1000次的if逻辑

<br>

### 修改方式1:
下面的修改方式 也能解决上面的需求 我们实现了调用多次 拿到的都是同一个值

也解决了 timeStamp 变量污染全局的问题 也解决了多次调用的时候 要执行if判断的问题
```js
let getTimeStamp = (function() {
  // 这个部分被缓存起来了
  let timeStamp = new Date().getTime()
  console.log(1)  // 多次调用 这里只执行了一次


  return function() {
    return timeStamp
  }
})()

console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())
```

但是我们上面的代码 其实还有问题, 有什么问题?

<br>

**问题:(我觉得这里讲的有问题)**  
我们在立即执行函数中 let 了 timeStamp 每次调用 getTimeStamp 的时候都会将 timeStamp 带出去 

每次带去的 timeStamp 不是首次了 因为每次立即函数执行的时候 timeStamp 都会被重新赋值 也就是说 这个立即执行函数还可能存在着别的地方也使用的情况?

那也就是说 timeStamp 在上面的情况下可能会发生变化  
比如程序再次运行的时候 timeStamp 的值就不一样了


<br>

### 修改方式2: 惰性函数
函数内部改变自身的机制 这就是惰性函数

**概念:**  
惰性加载表示函数执行的分支只会在函数第一次调用的时候执行  
在第一次调用的过程中 该函数被覆盖为另一个按照合适的方式执行的函数 这样任何对原函数的调用就不用再经过执行的分支了

```js
let getTimeStamp = function() {
  // 利用闭包 缓存数据
  let timeStamp = new Date().getTime()
  console.log(1)  // 这里只执行一次 因为后面被改写了 再执行的时候 只会执行改写后 里面的逻辑

  // 将getTimeStamp重写为取值的逻辑
  getTimeStamp = function() {
    return timeStamp
  }

  // 返回getTimeStamp()的值 不然第一次调用则是undefined
  return getTimeStamp()

  // ！！！！！！！注意最后要执行重写后的函数 或者直接执行 或者 return 执行
}



console.log(getTimeStamp())

// 再次调用的时候执行的是重写后的getTimeStamp(), 第二次执行的时候getTimeStamp的逻辑就变了 变成重写后的了
console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())
console.log(getTimeStamp())

// 多次调用打印的数据都是一样的
```

<br>

### 惰性函数的使用场景:

```js
// 利用 立即执行函数 做逻辑判断 声明变量
let addEvent = (function() {
  if(window.addEventListener) {
    return function(el, type, fn, capture) {
      el.addEventListener(type, fn, capture)
    }
  } else if(window.attachEvent) {
    return function(el, type, fn) {
      el.attachEvent("on" + type, function() {
        fn.call(el)
      })
    }
  } else {
    return function(el, type, fn) {
      el["on" + type] = fn
    }
  }
})()

addEvent(oBtn, "click", btnClick, false) 
function btnClick() {
  console.log(1)
}
```

<br>

下面我们使用 惰性函数 处理绑定兼容性的事件处理函数

```js
let addEvent = function(el, type, fn, capture) {
  // 如果元素身上存在的话 我们就重写addEvent
  if(el.addEventListener) {
    addEvent = function(el, type, fn, capture) {
      el.addEventListener(type, fn, capture)
    }
  // 如果元素身上存在的话 我们就重写addEvent
  } else if(window.attachEvent) {
    addEvent = function(el, type, fn) {
      el.attachEvent("on" + type, function() {
        fn.call(el)
      })
    }
  // 该情况下再次重写
  } else {
    addEvent = function(el, type, fn) {
      el["on" + type] = fn
    }
  }

  // 执行addEvent 注意最后要执行
  addEvent(el, type, fn, capture)
}


// 之后我们不管什么地方使用addEvent 都会被固定成一个分支中的函数
```

当一个函数的功能是通过外界因素隐藏函数的内部功能时候 我们可以利用惰性函数的方式来写 

这样一旦函数第一次确定是哪种功能了 后面都会能再次的修改了
```js
// 我们通过num指定 test 函数具有什么样的功能
function test(num) {
  switch(num) {
    case 1:
      // 重写 test
      test = function() {
        console.log("我爱你")
      }
      break
    case 2:
      // 重写 test
      test = function() {
        console.log("我喜欢你")
      }
      break
    case 3:
      // 重写 test
      test = function() {
        console.log("我讨厌你")
      }
      break
  }


  // 最后记得要执行
  return test()
}

test(1)   // 我爱你  一旦我们首次决定了后 后面不管怎么修改 函数的功能都不会再被修改 一般我们认为函数应该是静态的 函数内部的功能不应该会变 惰性函数也是静态的 只不过在第一次执行后会确定下来 函数应该具有什么样的功能

// 比如函数的功能本身是不明确的 只有在执行的时候才知道 我到底要选择哪个功能

// 惰性函数 如上面的例子的好处就是一个功能体可以多样化 我们可以在不同的场景下 通过不同的方法完成不同的事情 它们完成的过程是一样的 但是完成的结果不同 我们这种情况下使用惰性函数就非常的好

test(2)   // 我爱你
test(3)   // 我爱你
```

<br><br>

# 类数组的概念:
一个类数组的结构如下 因为要满足一个数组的特性
1. 要求有索引式的属性名
2. 要求对象中有length

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length : 3,
}
```

如果length = 2, 则末位元素减掉  
如果length = 4, 则用undefined补位  
如果length = 0 或者 没有, 则数组为空  


```js
var obj = {
  0: 1,
  1: 2,
  2: 3
  push: [].push
}

obj.push(4)

// 结果 1被替换了
4   
2
3
length: 1
```

因为既然有push方法 那么一定会有length属性 如果没有会自动给你添加 然后我们push 4 它会从0的位置开始添加数据 所以将1覆盖为4

<br><br>

## **<font color="#C2185B">Array.from(参数1, 参数2, 参数3)</font>**  
作用: 将一个类数组对象转化为数组

<br>

参数1:类数组对象

参数2:map回调

参数3:我们传递进去的东西可以改变this的指向
```js
let data = Array.from(obj, function(item, index) {
  // 当我们不传递第三个参数的时候 this原先是什么现在就是什么
  console.log(this)
  return {
    ...
  }
})
```

当我们传递第三个参数进去的时候 this就代表我们传入的数据 

比如:
我们传递一个对象 那么this就是这个对象  
我们传递一个数组 那么this就是这个数组  
传递什么this就是什么

```js
let data = Array.from(obj, function(item, index) {
 
  console.log(this)
  return {
    ...
  }
}, {} or [] or number or string)
```

<br>

我们要将下面的结构 转换为 
```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length : 3,
}

var arr = [
  {
    order: 0
    studentId: 1,
  },
  {
    order: 1
    studentId: 2,
  },
  {
    order: 2
    studentId: 3,
  }
]
```

<br>

**方式1:**
```js
let data = Array.from(obj).map((item, index) => {
  return {
    studentId: item,
    order: index
  }
})

console.log(data)
```

<br>

**方式2: Array.from()**
```js
const data = Array.from(obj, function(item, index) {
  return {
    studentId: item,
    order: index
  }
})
```

<br>

**方式3: Array.from() 的第三个参数**
```js
const data = Array.from(obj, function(item, index) {
  return {
    studentId: this.prefix + item,
    order: index
  }
}, {
  prefix: "No. "
})
```

<br>

### **数组的方法:**
- forEach
- map
- filter
- reduce
- every
- some
上述的数组的方法中都有第3个参数 改变this指向的配置

<br><br>

# 将定义在对象中的get方法提取出来

如下我们定义的对象 我们给a属性定义了get方法 
要是想使用get方法我们都是通过 obj.a 的方式进行的调用 现在我们想将get方法提取出来
```js
let obj = {
  get a() {
    // 对random的结果进行四舍五入
    return Math.random() >= 0.5 ? 1 : 0
  }
}

console.log(obj.a)  // 0 or 1
```

<br>

### **方式1:**
```js
const fn = obj.a
```

<br>

### **方式2:**
**<font color="#C2185B">含有get的对象.__lookupGetter__("提取哪个get");</font>**  
```js
let round = obj.__lookupGetter__("a");
console.log(round)
console.log(round())
```

<br>

该方法已经被废弃了 但是它的兼容性超级好 在一些底层代码中使用的是
```
__defineSetter__()
__defineGetter__()
```

那既然上面的方法被废弃了 肯定就有一个新的方法出现替换它 我们的get set就是描述符

<br>

**<font color="#C2185B">Object.getOwnPropertyDescriptor("指定对象", "哪个属性的描述符")</font>**  
返回的是一个该对象的所有描述符对象

```js
let round = Object.getOwnPropertyDescriptor(obj, "a")
console.log(round);
console.log(round())

{
  set: undefined, 
  enumerable: true, 
  configurable: true, 
  get: ƒ
}
```

<br>

既然是对象 我们就能通过.的方法获取到get
```js
let round = Object.getOwnPropertyDescriptor(obj, "a").get
console.log(round);
```

该方法的兼容性不是很好 虽然上面的__lookupGetter__方法被废弃了 但是大部分浏览器是支持的

<br>

### **<font color="#C2185B">对象.__defineGetter__("设置的属性", () => {})</font>**  
### **<font color="#C2185B">对象.__defineSetter__("设置的属性", () => {})</font>**  
给对象设置什么属性 回调就是get方法的回调 内部需要返回return
也就是我们可以直接设置 getter 方法 偏底层的方法

```js 
let obj = {}
obj.__defineGetter__("a", () => {
  return "get a"
})
console.log(obj.a)
```

<br><br>

# 相等性判断:
es版本中 有4种相等判断的算法

1. === 全等
2. ==  等于
3. 零值相等 -0 === +0  
4. 同值相等 -0 !== +0   NaN === NaN

<br>

### **js中提供有关相等判断的操作方法:**
1. 严格相等 (strict equality)  
===

2. 非严格相等(抽象/非约束) (loose equality)  
==

3. Object.is(val1, val2)  
判断两个参数是否是同一个值 es6的新特性 

<br>

### **=== 严格相等**
不进行隐式类型转换

要求:类型相同 值也要相同

```js
1 === "1"   // false  类型不同
1 === 2     // false  值不同
```

引用类型使用 === 判断的时候 引用值必须是同一地址
```js
let obj = {}
let obj2 = obj
obj === obj2  // true


{} === {}    // false  引用值不同
// 我们这么写相当于字面量 字面量都是通过new Object产生一个新的对象 相当于 {} 就是 new Object 出来的新对象


NaN === NaN   // false NaN跟任何值都不相等


+0 === -0   // true
// 数学中-0 和 +0代表两个含义 js中不是所有场景都是相等的

+Infinity === -Infinity   // false
```

<br>

思考: 怎么让 a !== a 返回true 如何定义变量a让这个等式成立呢？
```js
a = NaN
a !== a
```

<br>

### **非严格相等 ==**
比较之间会进行隐式类型转换 - 等式两边都有可能被转换  
转换以后 还是用严格相等进行比较

隐式类型转换表:  
```
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness
```

```js
Undefined == Undefined  // true 没有进行类型转换
Null == Null      // true
Undefined == Null // true


String == Object
// 隐式转换
// ToPrimitive(B) == A
// ToPrimitive(B)通过尝试调用 B 的B.toString() 和 B.valueOf() 方法，将参数 B 转换为原始值（Primitive）。

// 调用.toString()方法将Object转换为原始值 进行比较
```

注意: 任何对象都与 undefined 和 null 不相等
```js
({}) === undefined  // false
({}) === null       // false

// 如果不给{} 包上大括号在控制台上输出会报错 因为它也代表着代码块
```

<br><br>

# Narrow Object 窄对象
document.all -- *不建议使用了* 它能选出DOM树上面的所有节点
```js
Array.from(document.all).forEach(item => {
  if(item.nodeName == "DIV") {
    console.log(item)   // div节点
  } 
})
```

<br>

### **那什么叫做窄对象呢?**
typeof document.all 我们会发现结果是undefined

ie4的时候出现的 document.all 最早的时候我们可以用它获取节点

在ie10以前 document.all 是object  
其它浏览器也要引进 document.all 这个属性 但是又不想和ie定义为一样的 object 所以定义为了 undefined 意思是待定  

<br>

### document.all == undefined  // true
该情况和上面说的 undefined和其他进行比较的时候都是false 与这个结论互斥的一种情况

<br>

### 开发者认为 === 比 == 要好
全等对结果的预测是更加清晰明确
全等在不隐式转换的前提下 更快

<br>

### 有些情况 === 不利于我们功能的扩展
比如一个函数我们传递参数的时候 我们有可能传递数字1 也可以传递字符串1
那我们在函数内部进行判断的话 哪种情况合适 是不是都合适

尤其是我们在用swiper的时候 我们传递数字 和 字符串型的数字是不是都可以
这时候我们使用 == 比较好

<br>

### falsy值
将一个数据通过转换为boolean类型的false的值 一共有8个
```
false
+/-0
8n
'' "" ``
null
undefined 
NaN
```

<br>

### 同值相等 same-value
主要是针对0的
```
0 !== +0   这种情况就是同值相等
0 不等于 +0 他们不是一个东西
```

<br>

**举例:**
```js
let obj = {}

// 给obj添加属性 值为-0
Object.defineProperty(obj, "myZero", {
  value: -0,
  writable: false,
  configurable: false,
  enumerable: false
})


// 重新定义 myZero 为+0
Object.defineProperty(obj, "myZero", {
  value: +0,
  writable: false,
  configurable: false,
  enumerable: false
})

// 报错 不能重新定义属性
// Cannot redefine property: myZero
```

但是我们重新定义 -0 的时候就可以  代表-0跟+0是不一样的

也就是说在Object.defineProperty定义value的时候-0 和 +0 是不一样的

还有NaN和任何值比较都是false 和自己也是 但是在同值相等的情况下 NaN 和 NaN 会被认为是一样的

我们还可以通过 Object.defineProperty 来测试 如果能重复定义 那就是被认为是一样的

<br><br>

## 零值相等 same-value-zero

<br>