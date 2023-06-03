
# 备注:

### 兼容性:
ES6的兼容性不是很好, 有一些特性并不支持, 比如一些解构赋值 IE10+

<br>

### 编译 转换:
让es6在低版本中也能跑的了

<br>

### html中使用babel的方式
**在线转换:**
```  
browser.js  babel == browser.js
```

<br>

**缺点:**   
用户每次打开页面都要花费时间来转换, 是一个js文件 在使用babel的时候要给一个type
```js
<script src="browser.js" charset="UTF-8"></script>

// 在引入进来后需要在type里面声明这是一个babel
<script type="text/babel">
  在这里敲代码
</script>
```

<br><br>

# let
let用来声明变量, 作用和var一样
```js
let a, b, c;
let e = 100, h = [], g = 'abc';
```

<br>

### 特性:
1. 变量不能重复声明, 防止变量污染
```js
let a = 1;
let a = 2;
```

2. 块级作用域(全局, 函数, eval, 块级作用域) 在这里let声明的变量也是块级作用域 代码块还包括:
  - if
  - else
  - while
  - for  
```js 
{
  // 变量只在代码块内部有效, 出去无效
  let a = 10;
}
console.log(a);     //a未定义   报错
```

3. 不存在变量提升
4. 使用let声明时不影响作用域链

<br>

### 对let的解析示例:
之前我们使用var进行for循环绑定监听, 更改样式内部使用的都是this, 因为使用items[i]会报错, 因为for循环跑完后i的值为3

因为使用的是var, 存在这变量提升, var是在全局里保存的, 每次var的值会被上一次的结果覆盖掉

```js 
for(var i=0; i<items.length; i++){
  items[i].onclick = function(){
    // this.sytle.background = 'pink';

    // 使用 var 的时候 i 会是 2
    items[i].style.background = 'pink';
  };
}

{
var i = 0;
}

// 被修改为
{
var i = 1;
}

// 被修改为
{
var i = 2;
}

// 最终全局只有一个i的值
``` 


使用let的时候, 因为是块级作用域, 点击items时回调函数中没有i 会向上一级找i, 找到了i=0, 相当于在let的各自的作用域下运行, 所以它们会使用当前的作用域内的let值

```js
for(let i=0; i<items.length; i++){
  items[i].onclick = function(){
    // this.sytle.background = 'pink';
    items[i].style.background = 'pink';
  };
}

{
  let i = 0;
  items[i].onclick = function(){
    // this.sytle.background = 'pink';
    items[i].style.background = 'pink';
  };
}

{
  let i = 1;
  items[i].onclick = function(){
    // this.sytle.background = 'pink';
    items[i].style.background = 'pink';
  };
}

{
  let i = 2;
  items[i].onclick = function(){
    // this.sytle.background = 'pink';
    items[i].style.background = 'pink';
  };
}
```

<br>

# const 常量
值不能修改的量称之为常量 *优先使用const*  
在定义 数组 以及 对象 的时候 我们使用const比较好 用const定义好的对象 不用担心该对象被重新赋值

```js
const SCHOOL = '八中';
```

### 要点:
1. 一定要赋初始值
```js
const a;    // 报错
```

2. 一般常量使用大写

3. 常量的值不能修改

4. 它也是块级作用域
```js 
{
  const PLAYER = 'uzi';
}
console.log(PLAYER);    // 外部输出会报错
```

对于 *数组和对象的元素修改*, 不算做对常量的修改, 不会报错

```js
const TEAM = ['uzi', 'ming'];

// 不会报错, 因为常量所指向的地址没有发生改变
TEAM.push('Meiko');
```

**注意:**  
以后声明数组 和 对象的时候用const声明比较好, 避免误操作修改了数组 和 对象的地址值, 造成一些问题

<br>

# 解构赋值
ES6中允许按照一定的模式从数组和对象中提取值, 对变量进行赋值, 这被称为解构赋值  
等号左右两边 结构 必须一样  
右边必须是个东西 左边是数组 右边也要是数组, 左边是对象 右边也要是对象  
声明和赋值不能分开(必须在一句话里面)

**左边:** {变量名} 只能是目标的属性名  
**左边:** {变量名} 的顺序没有要求

所谓的解构赋值 是 解构 + 赋默认值

<br>

## 数组的解构:
之前我们要把数组里面的元素,放到变量里可能会这么做
```js
let arr = [1,2,3]

let a = arr[0]
let b = arr[1]
let c = arr[2]
```

现在利用解构赋值
```js
let [a,b,c] = [1,2,3]
```

很简单 就是一一对应 右边的给左边  
按照对应位置 对变量赋值 这种写法属于"模式匹配", 只要等号两边的模式相同, 左边的变量就会被赋予对应的值。

```js
const F4 = ['小沈阳', '刘能', '赵四', '宋小宝'];
let [xiao, liu, zhao, song] = F4;
console.log(xiao, liu, zhao, song);
```

<br>

### 嵌套数组的解构: 
注意格式 右边是什么样的格式(形式), 左边也要对应是什么样的形式
```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
```

<br>

### 解构数组中指定的元素:
使用,号占位

```js
let [ , , third] = ["foo", "bar", "baz"];
```

<br>

### 解构一个元素, 剩余的还是数组: 
**注意:** ...必须放在最后
```js
let [head, ...tail] = [1, 2, 3, 4];
```

<br>

### 解构set结构的数据:
```js
let [x, y, z] = new Set(['a', 'b', 'c']);
```

<br>

### 成分复杂的数组解构:
要点是一一对应的关系
```js 
[{a:12, b:5}, [12,5,8], 'cs', 8]

// 我们可以这样
let [{a, b}, [n1, n2, n3], str, num] = [{a:12, b:5}, [12,5,8], 'cs', 8]
console.log(a,b,n1,n2,n3,str,num)

// 还可以这样 只要是结构一样就可以
let right = [{a:12, b:5}, [12,5,8], 'cs', 8]
console.log(a,b,n1,n2,n3,str,num);

let [json, arr, num, str] = right;
```

<br>

### 解构的时候允许指定默认值
**注意:**  
该方式, 能设置 <font color="#C2185B">默认值的元素必须是undefined 默认值才会生效</font>  
如果数组的成员是null 那默认值就不会生效, 因为null不严格等于undefined

```js
let [foo = true] = [];
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

<br>

### 利用数组的解构 交换两个变量的位置:
```js
let a = 10
let b = 20

[a, b] = [b, a]
```

<br>

### 利用数组的解构 交换数组中指定的两个元素的位置:
括号开头的情况下 前面的语句最好加上分号
```js
let arr = [1, 3, 2];

// 先写右边 确定好交换哪两个元素 3 2 
// 再写左边 将右侧的3给数组[2] 将右侧的2给数组[1]
[arr[2], arr[1]] = [arr[1], arr[2]];

console.log(arr)  // 1 2 3
```

<br>

## 对象的解构, JSON的解构:
对象的解构与数组有一个重要的不同。  
数组的元素是按次序排列的, 变量的取值由它的位置决定  

而对象的属性没有次序, 变量必须与属性同名, 才能取到正确的值。  
<font color="#C2185B">如果解构失败, 变量的值等于undefined。</font>  

```js
let {a,c,d} = {a:12, c:5, d:6};

const ZHAO = {
  name: '赵本山',
  age: '不详',
  xiaopin: function(){
    console.log('我可以演小品')
  }
}
↓
let {name, age, xiaopin} = ZHAO;

<br>

let a, b, c
let {name: a, age: b, xiaopin: c} = ZHAO

let {name: name, age: age, xiaopin: xiaopin} = ZHAO

// 如果变量名和属性名一致 则可以只写一个
let {name, age, xiaopin} = ZHAO
```

<br>

### 解构对象时的重命名:
```js
let {data: res} = await ...
```

<br>

### 对象单独解构:
声明的变量名 和 目标对象中变量名一致, 就能提取出对应的元素  
如果只想获取部分属性, 只写这个属性名就可以
```js 
const OBJ = {
  name:'sam',
  age:35,
  sayName:function(){
    console.log('this.name');
  }
}

// 这里让sayName的变量名 和 目标对象中变量名一致, 就能提取出对应的元素
let {sayName} = OBJ;
console.log(sayName);
sayName();
```

<br>

### 对象解构时的默认值:
与数组一样 <font color="#C2185B">对象中的属性名是undefined的时候 我们才可以给这个属性赋默认值</font>
```js
var {x = 3} = {};
var {x: y = 3} = {};
```

<br>

## 字符串的解构:
**字符串跟数组解构的方式一样** 在单独解构的时候也有 ,, 的用法
```js
let str = 'hello';
let [a,b,c] = str;      // h e l
```

<br>

### 示例:
提取第一个数字
```js
let num = 12.55
let [a] = num.toString() 
console.log(+a)     // 1
```

<br>

## 函数参数的解构:
当实参的类型是一个对象的时候, 我们可以使用解构的方式定义形参  
函数中的形参也可以用解构的方式的书写, 当想使用对象中的数据的时候, 可以使用对象解构的方式传入形参的位置
```js 
let obj = {
  name: 'nodejs',
  age: 11,
  email: '@163.com'
};

function fn({name, age}) {
  // 通过形参的结构 我们可以直接拿到变量名 不用再 obj.name, obj.age 了

  // 我们可以直接使用 name age 了
  console.log(name, age);
}

fn(obj);
```

调用这个函数的时候, 传进来的对象必须有name age属性, 如果没有值为undefined

传入空对象不会报错
当调用fn() 函数时, 如果**不传递参数 相当于传递了null**进去 结果会**报错**  
我们可以 **传入fn({})空对象** 相当于传递了undefined **不会报错**


### 函数参数中解构的初始值:
```js
function fn({name, age}) {
  console.log(name, age);
}

// 如果调用参数时没有传递实参 这种情况下会报错
fn();



// 我们可以通过给解构形参赋初始值的方式 传入默认值{}
function fn({name, age}={}) {
  console.log(name, age);
}

// 我们还可以给形参中的name和age赋初始值
function fn({name='sam', age=1}={}) {
  console.log(name, age);
}
```

<br>

### rest参数 ...args (放在形参的最后):
用于获取函数的实参, 用来代替arguments

**语法:**  
...变量名

...args是一个数组, 是数组的话就可以使用一切API的方法 比如: filter, some, every, map

> ES5:
```js 
function date(){

  // arguments是一个对象
  console.log(arguments);     
};
date(1,2,3);        
```

> ES6:
使用rest参数时, 必须在形参中传递 ...args 变量
```js
function date(...args){

  // args是一个数组, 是数组的话就可以使用一切API的方法
  // filter, some, every, map
  console.log(args);          
};
date(1,2,3);       
```

rest参数必须放在参数的最后  
比如 有些时候函数里的形参定义了a b两个 但是我不知道会传递几个实参进来, 就可以这么写
收集剩余的参数, 前有有几个你就用几个 剩下的都装我这里
```js
function fn(a,b, ...args){
  console.log(a);
  console.log(b);
  console.log(...args);
}
fn(1,2,3,4,5,6);
```

<br>

### 函数的尾调用:
某个函数的最后一步是调用另一个函数 就叫做函数的尾调用
```js
function f(x) { return g(x) }
```

**尾调用:**  
之所以与其他调用不同 就在于它的特殊的调用位置  
函数调用会在内存形成一个 调用记录 又叫做调用帧 保存调用位置和内部变量等信息

如果在函数A的内部调用函数B 那么A的调用帧上方(栈) 还会形成一个B的调用帧 **等到B运行结束 将结果返回到A**

B的调用帧才会消失, 如果函数B的内部还调用函数C 那么就还又一个C的调用帧, 以此类推 所有的调用帧 就形成一个 调用栈

尾调用由于是函数的最后一步操作, 所以不需要保留外层函数的调用帧 取代外层函数的调用帧就可以了

```js
function f() {
  let m = 1;
  let n = 2;

  // 将结果给了 g函数
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

<br>

# ES6中对字符串的扩展
字符串也可以使用 for...of 来进行遍历

<br>

## 新增的方法: 

### <font color="#C2185B">字符串.includes("字符串", [从哪个位置开始查找]): </font>
返回布尔值  
表示是否找到了参数字符串

<br>

### <font color="#C2185B">字符串.startsWith("字符串", [从哪个位置开始查找]): </font>
返回布尔值  
看看参数字符串是否在原字符串的头部

<br>

### <font color="#C2185B">字符串.endsWith("字符串", [从哪个位置开始查找]): </font>
返回布尔值  
看看参数字符串是否在原字符串的尾部

<br>

### <font color="#C2185B">字符串.repeat(num): </font>
该方法会返回一个新的字符串 num表示重复几次 如果是小数会向下取整

<br>

### <font color="#C2185B">字符串.padStart(num:指定长度, "用什么字符来补位"): </font>
### <font color="#C2185B">字符串.padEnd(num:指定长度, "用什么字符来补位"): </font>
如果原字符串的长度 等于或大于最大长度 则字符串补全不生效, 返回原字符串
```js
'x'.padStart(5, 'ab')
```

返回值: 新的str
如果省略第二个参数 默认使用空格补全长度

#### 应用场景: 
为数值补全指定位数
```js
'1'.padStart(10, '0') // "0000000001"
```

提示字符串格式。
```js
'12'.padStart(10, 'YYYY-MM-DD')
```

<br>

### <font color="#C2185B">字符串.trimStart(): </font>
### <font color="#C2185B">字符串.trimEnd(): </font>
他们的使用方式和.trim()一样  
trimStart() 用于消除字符串的头部空格  
trimEnd() 用于消除尾部的空格  

它们返回的都是新的字符串 不会修改原始的字符串

<br>

### <font color="#C2185B">字符串.matchAll(): </font>
返回一个正则表达式在当前字符串的所有匹配
相当于 /g
返回一个新的字符串

<br>

### <font color="#C2185B">字符串.replaceAll(正则, 替换文本[特殊符号可]): </font>
替换所有匹配  
相当于 /g  
返回一个新的字符串

**参数:**  
参数1: 正则  
参数2: 表示替换的文本 可以用特殊符号

- $&: 匹配的字符串。
- $`: 匹配结果前面的文本。
- $': 匹配结果后面的文本。
- $n:  
匹配成功的第n组内容, n是从1开始的自然数。这个参数生效的前提是, 第一个参数必须是正则表达式。
- $$: 指代美元符号$。

```js
/*
  $& 表示匹配的字符串, 即`b`本身
  所以返回结果与原字符串一致
*/
'abbc'.replaceAll('b', '$&')    // 'abbc'
  

/*
  $` 表示匹配结果之前的字符串
  对于第一个`b`, $` 指代`a`
  对于第二个`b`, $` 指代`ab`
*/
'abbc'.replaceAll('b', '$`')
// 'aaabc'


/*
  $' 表示匹配结果之后的字符串
  对于第一个`b`, $' 指代`bc`
  对于第二个`b`, $' 指代`c`
*/
'abbc'.replaceAll('b', `$'`)
// 'abccc'


/*
  $1 表示正则表达式的第一个组匹配, 指代`ab`
  $2 表示正则表达式的第二个组匹配, 指代`bc`
*/
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'


// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'
```

<br>

# Math 对象的扩展: 

### <font color="#C2185B">Math.trunc(4.1): </font>
去除一个数的小数部分, 返回整数部分。  
对于非数值, Math.trunc内部使用Number方法将其先转为数值。

<br>

# 模板字符串 ``
```js
let str = `我也是一个字符串`;
```

**特点1:**  
内容中可以直接出现换行符  
'' ""内部是不允许出现换行符的

```js 
let str = '<ul><li>沈腾</li><li>马冬梅</li></ul>' 

let str = `
<ul>
  <li>沈腾</li>
  <li>马冬梅</li>
</ul>
`
```

**特点2:**  
变量拼接使用 
```js
`${变量名} 文本中的其他内容`

let str = '小呀小苹果';
let prevstr = '你是我的'

// 之前的方式:
str = prevstr + '小呀小苹果';
console.log(str);   //你是我的小呀小苹果


// 使用模板字符串
str = `${prevstr}小呀小苹果`;
console.log(str);   //你是我的小呀小苹果
```

<br>

# 面向对象
一般面向对象的语言里面都有雷, 实例对象这些概念, 我们通过实例化类, 得到实例对象

<br>

## 老版面向对象的写法 和 继承:
```js 
// 创建构造函数
function Father(name, age) {
  this.name = name;
  this.age = age;
}


// 给父类的原型对象添加方法 -- 实例方法
Father.prototype.showName = function() {
  console.log(this.name);
}


// 给父类添加静态的方法
Father.showAge = function() {
  console.log('我是静态的方法')
}

// 类的静态方法只能通过 类名.静态方法名() 调用
Father.showAge()


// 创建 子类
function Son(name, age, level) {
  // 继承父类中的属性 使用call方法传递this进去
  Father.call(this, name, age);

  // Son自己的属性
  this.level = level
}


// 让子类型的原型对象指向父类型的实例
Son.prototype = new Father();

// 让子类的constructor指回自己
Son.prototype.constructor = Son
```

<br>

### Es6 class 的创建方式:

#### 1. 创建类 使用 class 关键字:
es6中定义一个类需要使用class关键字

```js
class Person {

}
```

<br>

#### 2. 创建 实例属性: 
在类内部直接写属性就可以了 所有实例对象身上都会有这两个属性 值一样
```js
class Person {
  name = "sam"
  age = 18
}

let person = new Person()
console.log(person.name)    // sam
```

通过参数的形式 指定实例属性的值 要利用 constructor
当我们通过new创建对象时 实际上就是在调用类中的构造函数

<br>

#### 3. 动态设置实例属性技巧: 
constructor中的逻辑在使用new的时候就会被调用 可以完成初始化的工作
```js
class Person {
  constructor(name, age) {
    // 在 构造函数中 可以通过 this 来引用当前的对象 this就是我们刚刚创建的对象 person
    this.name = name
    this.age = age

    // 初始化种种逻辑 ... 
  }
}

let person = new Person("sam", 18)
```

<br>

#### 4. 创建 实例方法
直接在class中写方法
```js
class Person {

  // 定义方法
  run() {
    console.log("我会跑")
  }

}
```

<br>

### 类中的 **this**
#### 1. 通过实例对象去调用方法 **mc.fn()**
类中 方法中的this 都是指向实例对象  
Fn.prototype 这种形式的方法中的this同样指向原型对象

这个部分this的理解和基础this的理解是一样的 谁调用的方法 this就是谁

```js
class MyClass {
  fn() {
    console.log(this)
  }
}

let mc = new MyClass()
mc.fn() // this -> mc
```

<br>

#### 2. 以函数的形式去调用方法 *test()*
this 为 undefined  
js基础的时候 以函数的形式调用 this是window 这里是undefined  

    1. 类中的所有代码 都会在严格模式下执行
    2. 类中的方法的this不是固定的
       以方法形式调用时 this是当前的实例
       以函数形式调用时 this是undefined

**严格模式的特点:**
函数的this不再是window 而是undefined

```js
class MyClass {
  fn() {
    console.log(this)
  }
}

let mc = new MyClass()

// 将方法保存到 变量test 身上
let test = mc.fn

test()  // undefined
```

<br>

在有些场景下 我们希望方法中的this是固定的 不会因调用方式的不同而改变
使用 <font color="#C2185B">bind()</font> 在constructor中绑定this
```js
class MyClass {
  // 将fn方法的this绑定为当前实例 构造器中的this就是当前实例
  constructor() {
    this.fn = this.fn.bind(this)
  }

  fn() {
    console.log(this)
  }
}


let mc = new MyClass()

// 将方法保存到 变量test 身上
let test = mc.fn

// 因为使用 bind 绑定了this
test()  // Fn
```

<br>

利用箭头函数(箭头函数没有自己的this 它的this都是外层的this) 定义方法
```js
class MyClass {

  // 如果类中的方法是以箭头函数定义的 则方法中的this恒为当前实例 不会改变(包括call apply bind)
  fn = () => {
    console.log(this)
  }

}

let mc = new MyClass()

// 将方法保存到 变量test 身上
let test = mc.fn

// 因为使用 箭头函数
test()  // Fn
```

<br>

### 继承 使用 extends 关键字
一般使用extends 关键字来进行继承
```js
class 子类名 extends 父类名 { ... }
```

**作用:**  
可以将多个类中的重复性代码提取出来 然后通过继承可以让继承类中拥有父类中定义的属性和方法

```js
// 将多个类中的重复性代码提取出来
class Animal {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  say = () => {
    console.log("动物在叫")
  }
}


// 继承
class Dog extends Animal {
  // 内部就有了 父类中的属性 和 方法
}
```

<br>

**特点:**
- 子类继承父类后 将获得父类中所有的属性和方法   
继承后就相当于将父类中的代码 复制到当前类里


- 子类中可以创建同名的属性和方法 对父类中的内容进行 *重写*  
调用结构的时候 优先找自身 没有再找父类的


- 子类扩展父类中的属性的时候 需要在构造器中开始的位置调用 super()  
当在子类中重写了父类构造函数时 必须在子类构造函数中第一时间调用父类构造函数 否则会报错

<br>

**参数问题:**  
在new子类对象的时候 会传递实参 传递的参数会被子类重写的构造器里的形参接收 我们将接收到的参数中 父类中定义的我们通过super传进去


super相当于在调用父类的构造器 -java  
当子类定义了自己的constructor相当于重写了父类的constructor   
那在new子类对象的时候 就不会在调用父类中的constructor了  
不调用就意味着 父类中的constructor就不会执行了 就意味着 有一些属性初始化不上了

所以当我们在子类中重写了constructor后 还要在子类的constructor里面第一时间调用 父类的构造函数

```js
class Dog extends Animal {
  // dog要扩展自己的属性 address
  constructor(name, age, address) {
    super(name, age)    // 调用父类的构造函数
    this.address = address
  }
}
```

<br>

### 静态方法 和 静态属性:
可以直接通过类调用的属性和方法被称为静态属性和静态方法

#### 静态方法:  
- 使用 <font color="#C2185B">static 关键字</font>

<br>

**注意:**  
静态方法中的this 不是实例对象 因为根本没有实例对象 而是 **类本身, 静态方法中的this不是实例对象**

也就是说静态方法中 不能通过this来访问实例身上的属性和方法

<br>

#### 静态属性:
- 在类的外面定义
- 使用 static 来修饰属性

```js
class Person {

  static name = 10;

  static say = () => {
    console.log("hello")
  }

}

// 通过 类去调用
console.log(Person.name)
Person.say()
```

<br>

#### super and 超类 = 父类: 
我们平时叫父类和子类 更专业点的叫法是超类 继承父类的方法, 相当于 call()


#### 示例: class关键字 定义一个类
```js
class Father {

  // 属性放在 constructor 构造器 中 实例属性
  constructor(name) {
    this.name = name;
  }

  // 定义一个实例方法(实例方法就是给实例化对象取用的)
  showName() {
    console.log(this.name)
  }

  // 定义一个静态方法
  static like() {
    console.log('i love erin');
  }
}

// 定义静态属性, 注意这里是外面
Father.sex = 'man';

let f1 = new Father('sam');     // sam会传进constructor中
f1.showName();
console.log(f1.name)  // sam

// 调用静态方法
Father.like();
```

**要点:**  
- constructor什么时候执行?  
实例化对象的时候自动执行, 只要有new了 就会执行constructor里面的代码 new多少次就会执行多少次(创建多少次实例对象就会执行多少次constructor)

- 实例属性和实例方法都是给实例对象取调用的
- 每一个实例对象在内存中是独立的, 各自拥有自己的属性和方法, 互不干扰互相独立  

    比如我创建了2个实例对象, A和B 
    1. A和B在内存都有各自自己的内存空间
    2. A和B都有各自的属性和方法, 我修改B的name属性 不会影响到A的name属性 即使他们是通过一个class类实例化出来的

- 静态方式是通过类名来调用的 Father.like()

<br>

#### 示例: 类的继承:
```js 
class Father {
  constructor(name) {
    this.name = name;
  }

  showName() {
    console.log(this.name)
  }

  static showAge() {
    console.log('我是Father中的静态方法')
  }
}

// 我们只需要写关键字 extends 就可以拿到父类中的属性和方法 自己里面不用定义任何东西
class Son extends Father {

  constructor(name, age) { 这里写父类的形参和子类的形参
    // 调用父类的constructor方法, 跟call一样但不那么麻烦, 父类里面的形参别忘记
    super(name)

    this.age = 10;
  }


  // 子类可以有自己独立的方法
  duli() {
    console.log('我是子类独立的方法')
  }

  // 重写父类中的同名方法
  showName() {
    console.log('我是子类中的showName')
  }
}


// 创建Son的实例对象
let s1 = new Son('nn');

// 通过子类名调用父类中的静态方法
Son.showAge();
```

**要点:**  
- 父类的静态方法也可通过 子类名.父类中的静态方法名() 调用  
就是说子类可以继承到父类中的静态方法, 而且是通过自己的类名进行调用的

- 当子类中的方法名和父类中的方法名一样的时候, 会发生重写现象  
这里相当于覆盖了(也叫重写)了父类中的方法, 调用的结果是重写后的方法内容

- 子类中的 constructor 里如果不写 super() 的话 也会发生重写的现象  
子类中只要写了construtor就要调用下super()

- 子类中的this, 在调用super()之后才起作用, 子类的对象是在super之后才起作用在super()方法之前使用this会报错

<br>

#### 示例:
```js 
class User {
  constructor(name, pass) {
    this.name = name;
    this.pass = pass;
  }

  showName() {
    alert(this.name);
  }
}

class VipUser extends User {
  constructor(name, pass, level) {

    // 这么写法相当于执行父类的构造函数, 跟call一样的不是那么麻烦
    super(name, pass);

    // 扩展自己的属性, 继承了父类的属性
    this.level = level;
  }

  // 方法的话, extends已经继承完了, 我们直接扩展新方法就可以了
showLevel() {
    alert(this.level);
  }

  // 这里定义了一个和父类方法名一样的方法
  // 这里相当于覆盖了(也叫重写)了父类中的方法, 调用的结果是重写后的方法内容
  showName() {
    alert(this.name);
  }
}
```

<br><br>

### Class中this的补充:
我们在创建单例模式的时候 使用了如下的代码结构
```js
static get Instance() {
  if (!this.instance) {
    this.instance = new SocketService()
  }

  return this.instance
}
```

我迷惑的地方在于静态方法中使用了this, 这在java中是不允许的

但是js中是可以使用的因为:

- 静态方法中的this是类本身
- 实例方法中的this是类的实例对象

<br>

我们也可以修改成如下的格式
```js
static get Instance() {
  if (!SocketService.instance) {
    SocketService.instance = new SocketService()
  }

  return SocketService.instance
}
```

在 JavaScript 中, 类的静态方法中的 this 关键字指向类本身, 而不是类的实例对象。静态方法是直接通过类名调用的, 而不需要创建类的实例

<br><br>

# JSON || 对象

### json的标准写法: 
只能用双引号  <font color="#C2185B">不能用单引号</font> 所有的名字都必须用引号包起来
```js
// 错误的json: 不能用单引号
{a:12, b:5}       {a:'abc', b:5}  

// 对的json:
{"a":12, "b":5}   {"a":"abc", "b":5}
```

<br>

### <font color="#C2185B">JSON.stringify(json): </font>
把json对象变成字符串 

<br>

### <font color="#C2185B">encodeURIComponent(uri): </font>
把字符串作为 URI 组件进行编码。

    http%3A%2F%2Fwww.w3school.com.cn
    http%3A%2F%2Fwww.w3school.com.cn%2Fp%201%2F
    %2C%2F%3F%3A%40%26%3D%2B%24%23

还可以对 **JSON.stringify后的对象** 进行编码
```js 
let json = {a:12, b:5}

// 我想把json拼到里面去
let str = 'http://it.kaikeba.com/path/user?data=' + json;
// 结果: 后面会拼接上两个 www.baidu.com/?data={"name":"sam"}

// 我们可以这样 把json转换为字符串
let str = 'http://it.kaikeba.com/path/user?data=' + JSON.stringify(json);
// 结果是 www.baidu.com/?data={"name":"sam"}

// 但是上面还是没办法用 所以我们需要这样
let str = 'http://it.kaikeba.com/path/user?data=' + encodeURIComponent(JSON.stringify(json));
// www.baidu.com/?data=%7B%22name%22%3A%22sam%22%7D
```

<br>

### <font color="#C2185B">JSON.parse(): </font>
将 字符串形式的对象 解析为真正的对象

```js 
let str = '{"a":12, "b":5, "c":"abc"}'
let json = JSON.parse(str);
```

<br>

### 对象的简写:
名字一样的话可以简写, 当名字和值一样的时候 我们可以只写一个
```js 
let a = 12;
let b = 5;

// json的原始写法
let json = {a:a, b:b}

// json的简写
let json = {a, b};
```

方法可以简写, 省略function
```js 
let json = {
  a:12,
  show: function() {
    alert(this.a);
  }
}

// 简写
let json = {
  a:12,
  show() {
    alert(this.a);
  }
}
```

<br>

# 箭头函数
ES6 允许使用箭头 => 定义函数

**特点:**  
- 如果只有一个参数, () 可以省
- 如果只有一个return, {} 可以省 返回值必须是一个表达式
- 如果方法体只有一句 {} 可以省

      a + b 是表达式
      console.log() 是表达式  undifined
      console.log() 是一个函数 函数的返回值默认是undifined
      有返回值的就是表达式

- 如果返回一个对象 必须要加一个括号({}) 因为要和代码块做一个区分
```js
let fn = () => ({name: "sam"})
```

<br>

### 箭头函数的写法:
使用 箭头 链接 形参 和 函数体  省略了function
```js
// 声明一个函数, 之前:
let fn = function(){  };

let fn = (a, b) => {  }  
```

<br>

### 箭头函数的简写:
- 省略小括号, 当形参有且只有一个的时候 可以省略
```js
let add = (n) => {      
  return n + n;
}

// 简写成:

let add = n => {} 
```

- 省略花括号, 当代码体只有一条语句的时候, 可以省略花括号, 
此时return也必须省略, 而且语句的执行结果就是函数的返回值
```js 
let pow = (n) => {
  return n * n;
}
console.log(pow(9));

// 简写成:
let pow = n => n * n



const arr = [1, 6, 9, 10, 100, 22];
const result = arr.filter(item => item % 2 === 0)
console.log(result);
 // 一个参数可以省略小括号, 里面只有一条语句, 省略花括号和return, 函数体直接就是返回值
```

<br>

### 箭头函数特点1:
- this
箭头函数中没有this(没有自己的this) 它的this总是外层作用域的this

  - 理解1:  
    箭头函数没有自己的作用域, 即箭头函数this 指向其外层作用域(或者理解成和外成的作用域是相同的)  

下面的例子中, 如果在setTimeout中输出 this.name 会出现 this丢失(输出空白或者undefined)的情况

原因就是 setTimeout中的function有自己的作用域, 它里面的this找不到 以前的解决方法就是把外层的this保存 然后里面使用_this
```js 
function People(name, age) {
  this.name = name;
  this.age = age;

  this.say = function() {
    // 这里的 this 指向实例
    console.log(this.name);

    setTimeout(function() {
      // setTimeout中的this指向的是 window 或者 undefined
      console.log(this.name)
    })
  } 
};

let p1 = new People('sam', 18);
p1.say();


// 以前的做法是
function People(name, age) {
  this.name = name;
  this.age = age;

  this.say = function() {
    // 这里的 this 指向实例
    console.log(this.name);

    // 保存this的指向
    let _this = this; 

    setTimeout(function() {
      // 使用 _this
      console.log(_this.name)
    })
  } 
};
```

**解析:**   
setTimeout回调中的this指向的是 window 或者是 undefined 

如果上面使用箭头函数也就可以办到的, 因为箭头函数没有自己的作用域, 和外层的一样
```js
this.say = function() {
  setTimeout(() => {
    console.log(this.name)  // 这里是能正常输出的
  })
}
```


- 理解2:  
this是静态的, this始终指向函数声明时所在作用域下的this的值, this是不会变的
和上面的一样
```js 
window.name = '我是全局中的name';

const SCHOOL = {
  name:'我是对象中的name'
};


// 普通函数
function getName(){
  console.log(this.name)
};

// 箭头函数
let getName2 = () => {
  console.log(this.name)
};


// 函数直接调用 this指向window
getName();      //我是全局中的name

// 箭头函数式在全局作用域下声明的 所以指向函数声明时所在的作用域的值
getName2();     //我是全局中的name


// 普通函数可以通过 call方法 改变this 
getName.call(SCHOOL);   // 我是对象中的name

// 箭头函数没有办法通过 call方法 改变this
getName2.call(SCHOOL);  // 我是全局中的name 
```

<br>

下面给元素绑定的 click 事件回调中的 setTimeout 中的this 也指向div, 因为它是在 'click' function(){} 里声明的
```js 
let box = document.getElementById('ad');
box.addEventListener('click', function(){

  console.log(this);          

  setTimeout(()=>{

    // 这里的this指向的也是div, 因为它是在 'click' function(){}里声明的 所以this指向这个所在的作用域
    console.log(this);  

    this.style.background = 'pink';   
  }, 2000);
});
```

<br>

### 箭头函数特点2: 不能作为构造实例化对象
```js 
let Person =  (name, age) => {
  this.name = name;
  this.age = age;
};

let me = new Person('xiao', 30);     // 报错
```

<br>

### 箭头函数特点3: 箭头函数里 没有arguments变量
arguments是类数组对象 函数的所有实参都会收集在arguments中
但是箭头函数中没有arguments

**使用 ...args 代替**   
arguments是类数组 没有数组身上的方法 当我们用...args后 <font color="#C2185B">args变量就是真正的数组了</font> 可以使用数组身上的api来操作参数
```js
const fn = (...args) => {
  console.log(args)
}
```

<br>

### 箭头函数特点4: 箭头函数不适合对象方法
```js
{
  name: 'sam',

  // 这时候this指向的是 sam
  getName:function(){
    this.name
  }                       
}


{
  name: 'sam',
  // 这时候this指向的是 外层 this, 与我们的意思就有偏差了
  getName:() => {
    this.name
  }                       
  
}
```

### 箭头函数特点5: 箭头函数中的this无法通过call() apply() bind()修改

<br>

### 箭头函数的使用场景:
当我们想把函数作为参数传递到另一个函数里面去的时候 用函数最多的
```js
setTimeout(function() {}, 100)
setTimeout(() => {}, 100)
```

**注意:**  
↑ 箭头函数适合与this无关的回调, 定时器, 数组的方法回调, 不适合与this有关的回调, 比如dom元素的事件回调, 对象的方法

<br>

# 数组

### **<font color="#C2185B">扩展运算符 ... : </font>**  
展开数组
相当于把数组里面的元素拿出来直接放那(去掉[])
```js 
let arr = [1,2,3];
...arr;

// 1,2,3 相当于把数组里的东西掏出来往这一放

function show(a,b,c) {
  alert(a)
  alert(b)
  alert(c)
}

// ... 扩展运算符能将 数组 转换为 逗号分隔的 参数序列 1,2,3
show(...arr)
```

```js 
const tfboys = ['易烊千玺', '王俊凯'];   
// 

function chunwan() {
  console.log(arguments);
}
chunwan(tfboys); 
// 结果: arguments[0] 是一个数组 ['易烊千玺', '王俊凯'] 使用起来比较麻烦


// ...tfboys 相当于 chunwan('易烊千玺', '王俊凯')
chunwan(...tfboys);
```


... 还能展开字符串

<br>

扩展运算符还可以配合表达式 使用圆括号将表达式包裹起来 ...()
```js
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
]
```

<br>

### 应用: 复制数组
在es5中 我们是通过这种方式 克隆数组
```js
// es5中
const a1 = [1, 2];
const a2 = a1.concat();

// es6中
const a1 = [1, 2];
const a2 = [...a1];
```

<br>

### 应用: 合并数组
```js
[...arr1, ...arr2, ...arr3]

const arr = [...arr1, ...arr2]
```

<br>

### 应用: 将字符串转为数组
```js
[...'hello']
```

<br>

### 应用: 将伪数组转为真正的数组
```js
let nodeList = document.querySelectorAll('div');
let array = [...nodeList]
```

<br>

### 应用: 在一个对象中展开另一个对象
```js
let obj = {
  name: "sam"
}

let obj2 = {
  ...obj
}

console.log(obj2)
obj2.name = "erin"

console.log("obj1", obj)
console.log("obj2", obj2)

// obj1 { name: 'sam' }
// obj2 { name: 'erin' }
```

<br>

### **<font color="#C2185B">map((item, index, arr) => {}): </font>**
映射

可以根据一个已有的数组 加工其内部元素 返回内部元素的新形式 map整体会返回一个新的数组
map中有几个元素 回调就会执行几次 **回调函数的返回值会成为新数组中的元素**

<br>

### 需求1: 让上面的数组里面元素 变成2倍
```js
let arr = [12,5,8];

// 上面每一个数组里面的东西都会在function里面走一遭 
let result = arr.map(function(value, index){

  // map里的return是返回处理后的值 将处理后的值给新数组中的每一个元素位
  return value * 2
})

console.log(result)
```

<br>

### 需求2:
```js
let arr = [12, 90, 8];

let result = arr.map(value => value > 60 ? '及格' : '不及格')
console.log(result)

// 结果:
result = ["不及格", "及格", "不及格"]
```

<br>

### 需求3:
将数组中的元素 和 html结果 混搭 将一个元素取出填入到html结构中并返回
```js
let arr = ["孙悟空", "猪八戒", "沙和尚"]
let res = arr.map(item => {
  return (
    `<li><${item}/li>`
  )
})

// [ '<li><孙悟空/li>', '<li><猪八戒/li>', '<li><沙和尚/li>' ]
```

<br>

### **<font color="#C2185B">reduce((pre, item, index, arr) => {}, 初始值): </font>**
汇总, 一堆出来一个  
reduce又叫做归纳函数, 累加器函数

比如:  
算个总数 比如两张银行卡 一张10 一张20 一共多少  
对数组中所有的内容进行汇总的 要么全部相乘 要么全部相加

对于数组里面是对象的结构来说, 它遍历出来就是对象, reduce遍历的跟for of一样都是属性值

<br>

**参数:**
- 累加器
- 当前项
- index
- 元素组
- 初始值

<br>

####  **情况1:没有初始值的情况:**
reduce会拿数组中的第一个元素作为初始值, 从第二个元素开始循环
```js 
// pre是0 从1开始循环
[0,1,2,3,4,5].reduce(
    (pre, item, index, arr) => {}, 没有初始值的情况)


let arr = [0,1,2,3,4]
let res = arr.reduce((pre, item) => {
    return pre + item
})

console.log(res)

// 没有初始值 那pre就会拿数组的第一个元素作为pre 从第二个元素开始循环, 也就是pre为0, 第一轮从1开始循环
0 + 1
1 + 2
3 + 3
6 + 4
10

// 数组里面的元素依次相加 求和
```

**注意:**  
**reduce需要累加一个值出来 也就是说每次回调中return一个值出来**    
返回的这个值作为下一个循环的累加器的结果,  累加器的结果会覆盖上一次累加器的结果

<br>

#### **情况2:指定初始值(比如指定10):**
这个初始值, 会作为pre的值
如果指定了初始值, 那么第一轮循环会从数组中第一个元素开始(index: 0)

```js 
let arr = [0,1,2,3,4]
let res = arr.reduce((pre, item) => {
  return pre + item
}, 10)
console.log(res)


// 因为有初始值 pre为10, 第一轮的循环从数组的第一个元素0开始
10 + 0
10 + 1
11 + 2
13 + 3
16 + 4
20

// 初始值 + 数组中的每一个元素相加的结果
```

<br>

### **reduce的核心功能:**
它是要返回一个值的 我们可以指定一个初始值 初始值可以指定任意类型  
我们希望reduce返回的是一个什么样的数据类型, 可以直接放入到初始值中

<br>

### **需求: x的值进行累加**
[{x:1}, {x:2}, {x:3}]
```js 
// 如果是以前的我们需要进行for循环 拿到每一项x的值
let x = 0
sum.forEach((item) => {
  x += item.x
})
// 这样不好的地方在于 x是一个临时变量 参与完成后我们根本不需要它


// reduce
let init = 0
let sum = [{x:1}, {x:2}, {x:3}].reduce((pre, item) => {
    return pre + item.x
}, init)

console.log(sum)

// 初始值 + 对象中每一个x的值
```

<br>

### **需求: 将data中每一个对象的值, 放入到一个新数组中**
初始值可以设置[], {}, 代表把pre设置成一个数组或者对象类型 
```js 
let data = [
  { course: 'cc' },
  { course: 'dc' }
]

let newArr = data.reduce((pre, item) => {
  // 把对象中的每一个属性放到了pre中
  pre.push(item.course)

  // 返回pre
  return pre
}, [])

console.log(newArr)
```

<br>

### **需求: 将二维数组转换为一维数组 [[0, 1],[2, 3],[4, 5]]**
先复习一波 数组 concat() 可以拼接数组

可以追加元素到数组中
```js
let arr= [1,2]
arr = arr.concat(3, 4)        // [1, 2, 3, 4]
```

可以连接两个数组
```js
let arr = [1,2]
let brr = [3,4]
let res = arr.concat(brr)   // [1, 2, 3, 4]
```

使用reduce
```js
// pre是一个数组, 里面使用的concat的方法 第一次pre里面是1 2 第二次往pre里面拼接了3 4
let arr = [[0, 1],[2, 3],[4, 5]]

arr = arr.reduce((pre, item) => {
  return pre.concat(item)

  // 也可以用这种方式
  return [...pre, ...item]
}, [])

console.log(arr)



// 使用...
let arr = [[0, 1],[2, 3],[4, 5]]

let newArr = []
arr.forEach((item) => {
    newArr.push(...item)
})
console.log(newArr)
```

<br>

### **需求: 计算数组总每个元素出现的次数**

```js 
let names = ['sam', 'erin', 'nn', 'sam']
let res = names.reduce((pre, item) => {

  // 如果名字在pre中(pre已经是一个对象了 可以用in) 那就给这个名字加1 第一次肯定不在, 所以都会走else 给每一个人的名字添加一个属性1
  if(item in pre) {
      pre[item]++
  }else {
      pre[item] = 1
  }

  return pre
}, {})
```

<br>

### **需求: 数组去重**
```js
let arr = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']

let res = arr.reduce((pre, item) => {
  if(pre.indexOf(item) === -1) {
    pre.push(item)
  }

  return pre
}, [])

console.log(res)
```

<br>

### **需求: [{value: '1.2'}, {value: '3'}, {value: '4'}] 将里面的value对应的值提取成一个数组**  
初始值我们还是给pre一个[], 这样能确定它的类型

先复习一波 split()  
```js
let str = '3'

// 即使不符合split()中的拆分条件, 也可以拆 拆成前面的
let test = str.split(',')
console.log(test)               // ['3']
```

```js 
let data = [{value: '1,2'}, {value: '3'}, {value: '4'}]

// 这里使用了 ...进行展开 但是我们注意 value的值为 1,2 所以字符串也能被展开 1 , 2
let res = data.reduce((pre, item) => {
  return [...pre, ...item.value]
}, [])
// 结果: ["1", ",", "2", "3", "4"]



// 这里使用了 (运算, 返回值) 逗号操作符 
let data = [{value: '1,2'}, {value: '3'}, {value: '4'}]
let arr = data.reduce((pre, item) => (pre.push(item.value), pre), [])
console.log(arr)
// ['1,2', '3', '4']


let arr = data.reduce((pre, item) => (pre.push(...item.value.split(",")), pre), [])
console.log(arr)
// ['1', '2', '3', '4']


// 这里使用了concat 给数组追加元素, pre是数组, item的value可以通过split转为数组,同时对, 进行拆分
let res = data.reduce((pre, item) => {
  return pre.concat(item.value.split(','))
  
  // 也可以
  return [...pre, ...item.value.split(',')]
}, [])

console.log(res)
// ['1', '2', '3', '4']
```

<br>

### **<font color="#C2185B">filter(callback): </font>**
过滤
根据回调中返回的布尔值, 筛选元素 true决定保留与否  
需要定义一个新数组来接受

**返回值:**  
必须是 布尔值

- 如果为true:  
函数内部会自动将这次回调的value 加入到数组中

- 如果为false:  
函数内部会过滤掉这次的value

数组中有几个元素就会经历几次回调
```js 
let arr = [12,5,8,99,27,36,75];
let result = arr.filter(function(value){
  if(value % 3 == 0) {
    return true;
  }
})
console.log(result);

// 注意 value % 3 == 0 这个部分本身就是一个布尔值所以可以这样写
let arr = [12,5,8,99,27,36,75];
let result = arr.filter(function(value){
  return value % 3 == 0;
})
console.log(result);


let arr = [
  {title:'男士衬衫', price:75},
  {title:'女式包', price:576664},
  {title:'男士包', price:33},
  {title:'女士鞋', price:12130},
];
    
let result = arr.filter(json => json.price >= 10000);
console.log(result);
```

<br>

### **<font color="#C2185B">find(callback): </font>**
从一个数组中获得*符合条件的第一个元素*

<br>

### **<font color="#C2185B">forEach(callback): </font>**
循环

<br>

### **<font color="#C2185B">Array.from(): </font>**
- 将类数组对象
- 将可遍历的对象 包括set map
- 将字符串 

转换为真正的数组

把以上的形式转为真正的数组  
**如果参数是一个真正的数组 则会返回一个一模一样的新数组**


    类数组对象的定义: 
      1 对象内部的属性名为 索引值
      2 对象内部有length属性

    let arrayLike = {
      '0': 'a',
      '1': 'b',
      '2': 'c',
      length: 3
    };
    
es5中将伪数组转换为真的数组
```js
let arr = [].slice.call(arrayLike)

// 现在也可以使用 Array.from(arr)
let newArr = Array.from(arr)
```

<br>

### **<font color="#C2185B">Array.from(伪数组, callback): </font>**
**参数:**  
callback的用法和其他数组的回调一样 用来对每个元素进行处理, 将处理后的值放入返回的数组里面 这里的 callback 相当于 map

```js
Array.from(arrayLike, x => x * x);

// 等同于
Array.from(arrayLike).map(x => x * x);
```

<br>

### 应用场景:
以使用这个语法将元素节点 变成数组
```js 
let divs = document.querySelectorAll('div')

Array.from(div).map(item => {
  console.log(item)
})
```

<br>

### **<font color="#C2185B">Array.of(): </font>**
将一组值 转换为数组
```js
Array.of(3, 11, 8)
```

<br>

### **<font color="#C2185B">数组.copyWithin(target, [start], [end]): </font>**
它会改变当前数组  
它会将指定位置的元素复制到其他位置(会覆盖原有成员) 然后返回当前数组

**要点:**  
- **数组的长度不会变** 
- start是开始的位置索引 包括开始
- end是结束的位置索引 不包括结束
- target 它会提取 start-end 的数据放到0的位置 会覆盖

```js
let arr = [0, 1, 2, 3, 4, 5]
arr.copyWithin(0, 1, 3)
console.log(arr)  // [1, 2, 2, 3, 4, 5]
```

<br>

### **<font color="#C2185B">find(callback, [this]): </font>**
### **<font color="#C2185B">findIndex(callback, [this]): </font>**
用于找出第一个符合条件的 *数组成员*

所有数组成员依次执行该回调函数, *直到找出第一个返回值为true的成员*   
然后返回该成员。如果没有符合条件的成员, 则返回undefined。

根据回调中的 return true 来找到该成员 *找不到就是undefind* 它找到的是 真的元素

参数2: this 

```js
let arr = [1,2,3,4,5]
let res = arr.find(item => {
  return true                 // 1 禁止贪婪原则 找到一个就ok
  return item === 2           // 查找2
})
```

find()方法适合查找引用类型
```js 
let lesson = [{name: 'js'}, {name: 'css'}]

// 不能这样 即使长的一样也不行, 因为在查找引用类型的值的时候 我们查找的是内存地址
lesson.includes({name: 'css'})    

// 这种情况下 我们可以使用find()
let res = lessons.find(function(item) {
  return item.name === 'css'        // 将{name: 'css'}这个对象找出来了
})
```

<br>

### **<font color="#C2185B">fill(给定值, [start], [end]): </font>**
使用给定值, 填充一个数组。
*fill方法用于空数组的初始化非常方便*。数组中已有的元素, 会被全部抹去。

<br>

### **<font color="#C2185B">数组.entries(): </font>**
遍历出来元素的是 [索引, 元素]  
返回的是一个 迭代器对象 迭代器对象可以使用 for...of 循环得到元素

```js
let arr = ["a", "b", "c"]

// 手动调用 迭代器对象的 next()
let iterator = arr.entries()

let one = iterator.next()
console.log(one.value)    // [0, 'a']

let two = iterator.next()
console.log(two.value)    // [1, 'b']

let three = iterator.next()
console.log(three.value)  // [2, 'c']

let four = iterator.next()
console.log(four.value)   // undefined


// 使用 for...of 迭代 迭代器
for(let item of iterator) {
  console.log(item)
}


// while循环 迭代 迭代器
do {
  res = iterator.next()
  console.log(res.value)
} while(!res.done)
```

<br>

### **<font color="#C2185B">数组.keys(): </font>**
### **<font color="#C2185B">数组.values(): </font>**
返回一个遍历器对象 可以用 for...of循环来进行遍历  
keys()是对键名的遍历
values()是对键值的遍历

<br>

### **<font color="#C2185B">数组.includes(): </font>**
方法返回一个布尔值  
表示某个数组是否包含给定的值, 与字符串的includes方法类似。

    没有该方法之前, 我们通常使用数组的indexOf方法, 检查是否包含某个值。  
    indexOf方法有两个缺点, 
    一是不够语义化, 它的含义是找到参数值的第一个出现位置, 所以要去比较是否不等于-1, 表达起来不够直观。
    二是, 它内部使用严格相等运算符（===）进行判断, 这会导致对NaN的误判。


**注意:**  
Map 和 Set 数据结构有一个has(), 需要注意与includes区分。  
Map 结构的 **has(), 是用来查找键名的**  比如  
- Map.prototype.has(key)
- WeakMap.prototype.has(key)

Set 结构的 **has方法, 是用来查找值的**  比如  
- Set.prototype.has(value)
- WeakSet.prototype.has(value)。

<br>

### includes查找的原理: 
```js
let arr = [1,2,3,4,5]
  
function includes(arr, find) {
  for(let value of arr) {
    if(value === find) {
      return true
    } else {
      return false
    }
  }
}
```

<br>

### **<font color="#C2185B">数组.indexOf(): </font>**
我们写的参数是严格匹配, 查找到返回的是元素第一个出现的索引 否则为-1
```js 
let arr = [1,2,3,4,5]
if(arr.indexOf(1) != -1) {
  console.log('找到了');
}
```

<br>

### **<font color="#C2185B">数组.flat(num): </font>**
### **<font color="#C2185B">数组.flatMap(callback): </font>**
转化为1维数组  
它返回的是一个新数组 对原数组没有影响

flat()方法默认拉平一层数组, 如果想拉平两层传入参数2

不管多少层都转换为一维数组 可以传入 Infinity 如果原数组有空位, flat()方法会跳过空位。

```js
let arr = [1,2,3,4,[6,7,8]]
let res = arr.flat()
console.log(res)
```

flatMap()只能展开一层数组。它需要传入一个回调函数 相当于内部执行了 map() 方法

<br>

### **<font color="#C2185B">注意: 数组的空位</font>**
ES5中对于数组的空位  
空位数组:  [, , ,]  
空位不是undefined, 一个空位的值是undefined  
ES5中对空位的处理已经很不一致了 大多数情况下会忽略空位 或者跳过空位

- forEach()
- filter()
- reduce()
- every()
- some()

都会跳过空位  

```js
let arr = ["a", , "b"]

// 会跳过 空位 输出 a b 空位的位置被跳过去了
arr.forEach(item => console.log(item))    // a b

// 没有输出 1
let res = arr.filter((item, index) => console.log(index))  // 0 2
// 特意让它返回空位 结果是 []
let res = arr.filter((item, index) => index == 1)
```

<br>

- map()会跳过空位, 但会保留这个值  
- join()
- toString()会将空位视为undefined, 而undefined和null会被处理成空字符串。

```js
let res = arr.map(item => {
  console.log(item)
  return item + "?"
})
console.log(res)

//  ['a?', empty, 'b?'] 保留了 空位这个值
```

<br>

ES6中明确将空位转为undefined 也就是说 es6的语法不会忽略空位
```js
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]
```

<br>

# 对象


### **<font color="#C2185B">Object.keys():</font>**
将目标对象中的key遍历取出放到一个 *数组* 中 需要用变量接收  
返回数组

<br>

### **<font color="#C2185B">Object.values():</font>**
将目标对象中的value遍历取出放到一个 *数组* 中 需要用变量接收  
返回数组

```js 
let obj = {
  name:'sam',
  age:19
}

let res = Object.values(obj)
console.log(res)        //  ["sam", 19]
```

<br>

### **<font color="#C2185B">Object.entries():</font>**
将目标对象中的 kv组合 放到一个数组中 最终是一个二维数组
```js
[["name", "sam"], ["age", "18"]]
```

<br>

### **<font color="#C2185B">Object.fromEntries():</font>**
该方法是 Object.entries() 逆操作  
*用于将一个键值对数组(二维数组)转为对象*

```js
[["name", "sam"], ["age", "18"]]

Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```
  
该方法的主要目的, 是将键值对的数据结构还原为对象, 因此特别适合将 Map 结构转为对象。

<br>

### **<font color="#C2185B">Object.getOwnPropertyDescriptor(目标对象, "属性名"):</font>**
给定对象 给定属性 展示其属性的状态
```js
{
  value: 123,
  writable: true,
  enumerable: true,        // 可枚举性
  configurable: true
}


// getter setter
let vari = "sam"

let obj = {
  age: 18,
  get name() {
    return vari
  },

  set name(val) {
    vari = val
  }
}

Object.getOwnPropertyDescriptor(obj, "name")

// 结果
{
  enumerable: true, 
  configurable: true, 
  get: ƒ, 
  set: ƒ
}
```

<br>

### **<font color="#C2185B">Object.is():</font>**
用来判断 a b 两个值是否一致
```js
// 不会隐式转换
Object.is(+0, -0)   // false
```

<br>

### **<font color="#C2185B">Object.assign(target, 要复制的对象):</font>**
该方法用于*对象的合并* 将源对象的所有可枚举属性 复制到目标对象中

**参数1:**  
要复制到哪里, 目标对象 

**参数2:**  
2及其以后都是要复制的对象 (源对象)

**特点:** 
- 如果目标对象与源对象有同名属性 或多个源对象有同名属性   
则后面的属性会覆盖前面的属性

- 如果只有一个参数(对象) 会直接返回该参数(对象)
- 如果该参数不是对象 则会先转成对象 然后返回 (undefined 和 null无法转成对象)

- assign()方法 他是浅拷贝 而不是深拷贝  
也就是说 如果源对象的某个属性值是对象 那么目标对象拷贝得到的是这个对象的引用

- assign()方法 他可以用来处理数组, 

<br>

### 应用 为对象添加属性: 
```js
Object.assign(this, {x, y});

// or

let obj = {
  name: "sam"
}

obj = Object.assign(obj, {age: 18})
console.log(obj)  // {name: 'sam', age: 18}
```

<br>

### 应用 为对象添加方法: 
- 给 class 使用 Object.assign() 给其原型上添加方法
```js
class Father {

  name = "father"

  say() {
    console.log("Father: ", this.name)
  }
}

let father = new Father()
father.say()

// 给 类的原型上 添加方法
Object.assign(Father.prototype, {
  speak() {
    console.log("speak: ", this.name)
  }
})

// 通过实例来进行调用
father.speak()
```

<br>

### 应用 克隆对象: 
如果对象是一层 那就是 全新的对象 通过新对象修改属性也不会影响到原对象的值  
如果对象是深层 那引用的就是地址值 修改新对象的同时 原对象的属性也会跟着变化
```js
function clone(origin) {
  return Object.assign({}, origin);
}
```

<br>

### **<font color="#C2185B">Object.freeze(变量):</font>**
锁住变量不让其修改  
在const定义的对象中, 对象的属性是可以被修改的  
如果 我们连对象的属性也不想让其被修改 那我们就可以使用这个方法
```js
const HOST = {
  port: 80
}

Object.freeze(HOST)
```

<br>

### **<font color="#C2185B">Object.setPrototypeOf(给谁添加原型, 添加的是谁):</font>** 

```js
let a = {
  name: "Sam"
}

let b = {
  url: "www.bai.com"
}

Object.setPrototypeOf(a, b)

console.log(a)
// {name: 'Sam'}


console.log(a.__proto__)
// {url: 'www.bai.com'}
```

<br>

### **<font color="#C2185B">Object.getOwnPropertyDescriptor(对象, "属性名"):</font>** 
### **<font color="#C2185B">Object.getOwnPropertyDescriptors(对象):</font>** 
查看一个对象中指定属性的状态
查看一个对象中所有属性的状态

```js
let obj3 = {
  name: "sam"
}

console.log(JSON.stringify(Object.getOwnPropertyDescriptor(obj3, "name"), null, 2))

{
  "value": "sam",
  // 修改
  "writable": true,
  // 遍历
  "enumerable": true,
  // 删除 配置
  "configurable": true
} 
```

<br>

### **<font color="#C2185B">Object.preventExtensions(对象):</font>** 
禁止向对象中添加属性

<br>

### **<font color="#C2185B">Object.isExtensible(对象):</font>** 
判断该对象是否可以往里添加属性

返回值 boolean

<br>

### **<font color="#C2185B">Object.seal(对象):</font>** 
封闭一个对象 设置后, 对象不能删除 修改 添加

<br>

### **<font color="#C2185B">Object.isSealed(对象):</font>** 
判断一个对象是否被封闭

返回值 boolean

<br>

### **<font color="#C2185B">Object.freeze(对象):</font>** 
冻结一个对象 干什么都不好使了

<br>

### **<font color="#C2185B">Object.isFrozen(对象):</font>** 
判断一个对象是否是冻结状态

返回值 boolean

<br>

# Set
es6提供了新的数据结构 **set(集合)**, 它的类型是object但 *类似于数组*  
但成员的值都是唯一的(**有去重的效果**)

集合实现了iterator接口, 所以可以使用 [扩展运算符...] 和 for...of进行遍历  
它跟map很像 但是没有键值对的概念只有一个value

集合和数组很像 看输出结果也是 index: value 这种一一对应的形式

<br>

### 集合的属性和方法:
- size   返回集合的个数
- add    增加一个新元素 返回当前集合
- delete 删除元素, 返回boolean值
- has    检查集合中是否包含某个元素, 返回boolean值

<br>

### 创建一个空集合:
和数学中的集合很像 通过new Set()来创建一个集合, 它的类型是 object
```js
let s = new Set()
```
    
<br>

### 根据数据初始化集合:
- 传递一个数组(可迭代数据)
```js
let s2 = new Set([1,2,3,4,5])
console.log(s2)         // Set(5) {1, 2, 3, 4, 5}
```

集合中的元素都是唯一的, 所以有 <font color="#C2185B">去重的效果</font>
```js
let s2 = new Set([1,1,2,2,3,3,4,5])
console.log(s2)         // Set(5) {1, 2, 3, 4, 5}
```

<br>

### **<font color="#C2185B">集合.size:</font>** 
我们使用size属性, 来获得元素的个数, 数组叫length
```js
console.log(s2.size)    //5
```

<br>

### **<font color="#C2185B">集合.add():</font>** 
向集合中添加元素 也可以创建变量接收 add() 的返回值 就是set集合本身
```js
s2.add(10)
```

<br>

### **<font color="#C2185B">集合.delete():</font>** 
删除元素  
在删除的同时 返回是否删除成功 boolean true / false
```js
s2.delete(10)
```

<br>

### **<font color="#C2185B">集合.has():</font>** 
检查是否有元素
返回值 boolean
```js
s2.has(10)
```
    
<br>

### **<font color="#C2185B">集合.clear():</font>** 
清空集合
```js
s2.clear()
```

<br>

### **<font color="#C2185B">for ... of:</font>** 
### **<font color="#C2185B">set.keys()  || set.values()  ||  set.entries():</font>** 
遍历集合  
我们发现 set 中的 key 和 value 是一样的 这点我们参考下数据结构中 set是怎么实现的
```js
let set = new Set()
set.add(1)
set.add(2)
set.add(3)

for(let item of set) {
  console.log(key)    // 1 2 3
}

for(let key of set.keys()) {
  console.log(key)      // 1 2 3
}

for(let value of set.values()) {
  console.log(value)     // 1 2 3
}

for(let entry of set.entries()) {
  console.log(entry)     // [1,1] [2,2] [3,3]
}
```

<br>

### set的特性:
- set中只会存储一个值 去重效果 
- 上述规则对引用数据类型不适用 也就是我们传入引用数据类型 因为引用类型存的是指针 指针不一样
- set转换成数组 [...set] 或者 Array.from() 方法
- NaN 它本身不等于本身 正常是两个nan是两个nan <font color="#C2185B">但是set还是可以将nan去重</font>

```js
const set2 = new Set()

let o1 = { name:"sam" }
let o2 = { name:"erin" }
let o3 = { name:"nn" }

set2.add(o1)
set2.add(o2)
set2.add(o3)

o3 = { name: "laoye" }

console.log(set2) 
// {name: "sam"} {name: "erin"} {name: "nn"}
  
set2.add(o3)

// 对象没有办法去重
console.log(set2)
// {name: "sam"} {name: "erin"} {name: "nn"} {name: "laoye"}
```

<br>

### 场景:
我们可以不收入重复的值 就用set  
不用存值之前都查一下 这个值有没有被插入数据啊 有的话就不要插入 没有再插入

<br>

### 需求: 数组的去重
我们利用集合的元素的唯一性, 根据arr创建一个集合
集合可以使用... 我们把集合展开放到数组里面
```js   
let arr = [1, 1, 2, 2, 3, 3, 4, 5]
let s = new Set(arr)
arr = [...s]
console.log(arr);
```

<br>

### 需求: 交集 实现数组的去重 
这里我们找去重后的相同元素 
- 我们利用 集合 把arr的元素进行去重, 然后利用filter方法 保留相同元素
- 在filter方法中我们判断 arr中的元素在不在arr2中, 我们利用了集合的方式同时去重
- 使用.has()方法

```js 
let arr = [1, 1, 2, 2, 3, 3, 4, 5]
let arr2 = [1, 2, 2, 4, 4, 5, 4, 7]

let newArr = [...new Set(arr)].filter(item => {

  // 将 arr2 变成集合(去重效果)
  let s2 = new Set(arr2);

  // 过滤 arr 中 也在 arr2 中的元素
  if(s2.has(item)) {

    return true

  } else {

    return false

  }
})

console.log(newArr)         // (4) [1, 2, 4, 5]


// 整理下
let arr1 = [1, 1, 2, 2, 3, 3, 4, 5]
let arr2 = [1, 2, 2, 4, 4, 5, 4, 7]

let ret = [...new Set(arr1)].filter(item => {
  let set = new Set(arr2)
  return set.has(item) ? true : false
})

console.log(ret)
```

<br>

### 需求: 并集
- 我们利用... 将两个数组合并在一起, 但是有重复的元素
- 我们利用set的特性进行数组去重
- 将去重后的set利用...展开 放到数组里

```js 
let arr1 = [1, 1, 2, 2, 3, 3, 4, 5]
let arr2 = [1, 2, 2, 4, 4, 5, 4, 7]

let result = [...new Set([...arr1, ...arr2])]
console.log(result)
```

<br>

### 需求: 差集
找两个集合做对比, 找其中一个集合中没有的部分 比如  
集合1 (1 2 3)  
集合2 (3 4 5) 

集合1为主做差集 结果就是1 2 就是上面交集的取反
```js
let newArr = [...new Set(arr)].filter(item => {

  let s2 = new Set(arr2);
  
  // 在这里取反
  if(!s2.has(item)) {
      return true
  } else {
      return false
  }
})
```

<br>

# Map
es6中提供了map数据结构, 类似于对象, 也是键值对的集合
但是 '键' 的范围不限于字符串, 各种类型的值(包括对象) 都可以当做 键 那是不是说 key 的位置也可以存数据

存在map中的元素都是以 **key : value** 形式存在的  
*Map就是一个升级版的对象*


Map也实现了iterator接口, 所以可以使用 [扩展运算符] 和 [for...of] 进行遍历
我们在往map里面添加数据的时候 
- 如果map里面 没有key 则添加 
- 如果map里面 已有key 则更新对应的值

<br>

### map的创建:
map对象中可以保存键值对
```js
let m = new Map()
```

<br>

### 根据数据初始化map:map.
**参数:**  
是一个二维数组的格式
```js
let m = new Map([['name', 'sam'], ['age', '18']]);
```

<br>

### Map的属性和方法: 
- size:  返回Map的元素个数
- set:   增加一个新元素, 返回当前Map
- get:   返回键名对象的键值
- has:   检查Map中是否包含某个元素, 返回boolean值
- clear: 清空集合, 返回undefined

<br>

### **<font color="#C2185B">map.set():</font>** 
添加元素 通过该方法保存一个键值对

```js
let map = new Map()

map.set('键', '键值')
map.set('name', 'sam');

console.log(map)

// 结果
Map(1) {"name" => "sam"}
key:    "name"
value:  "sam"


// 添加函数: 函数名 和 函数表达式
map.set('change', function() {
  console.log('我们可以改变你')
})


// 添加 key 为对象, 值为数组
let map = new Map()
let key = {name: "sam"}
let value = [1,2,3]

map.set(key, value)

console.log(map)  // {Object => Array(3)}
```

<br>

### **<font color="#C2185B">map.delete():</font>** 
删除元素
```js
m.delete('key')
m.delete('name')
```

<br>

### **<font color="#C2185B">map.get():</font>** 
获取元素
```js
m.get('key')
m.get('name')
```

<br>

### **<font color="#C2185B">map.clear():</font>** 
清空元素

<br>

### **<font color="#C2185B">map.keys():</font>** 
返回 键名 的迭代器对象 遍历键名
```js
let map = new Map()
let key = {name: "sam"}
let value = [1,2,3]

map.set(key, value)

for(let key of map.keys()) {
  console.log(key)    // {name: 'sam'}
}
```

<br>

### **<font color="#C2185B">map.values():</font>** 
返回 键值 的迭代器对象 遍历键值

<br>

### **<font color="#C2185B">map.entries():</font>** 
返回键值对的遍历器  
每一个 entry 是一个 [key,value]
```js
let map = new Map()
let key = {name: "sam"}
let value = [1,2,3]

let key2 = {name: "erin"}
let value2 = ["a", "b", "c"]

map.set(key, value)
map.set(key2, value2)

for(let entry of map.entries()) {
  console.log(entry)  //  [{…}, Array(3)]
}
```

<br>

### **<font color="#C2185B">forEach():</font>** 
使用回调函数遍历每个成员  
每一个 成员 是一个 [key,value]

<br>

### **<font color="#C2185B">for...of 遍历:</font>** 
直接遍历map 获取到的是每一组成员 [key,value]

<br>


<br>

# Symbol数据类型
这是一个动态值, 并不是一个固定的属性  
ES6中引入了一种新的原始数据类型 Symbol, 表示独一无二的值
它是js语言的第七种数据类型, 一种类似于字符串的数据类型

<br>

## 那symbol到底是什么东西: 
比如我们把皇帝比喻成一个对象 对象中有很多的属性 相当于 皇帝有很多的皇子和公主
其中皇帝有一个私生子就是symbol, 而这个私生子不能让任何人知道, 它就用symbol来表示

这个私生子只有皇帝知道外人用一般方法是查询不到的 **(for...in)**

但是这个私生子很悲惨不能像其他的皇子和公主一样继承皇帝的财产 因为 **没有继承能力** 因此我们不能new Symbol

有了symbol以后皇帝想要多少个私生子就要多少个私生子 每一个私生子之间都有唯一的symbol来进行标识

但是随着皇帝的私生子越来越多 有些私生子是同一个母亲生的 为了弄清这些私生子是同一个母亲生的 于是就在symbol的基础上使用了 **symbol.for()** 来进行表示

symbol类型需要注意的核心点就在这个例子里面了

```js 
// 比如 一个皇帝有 公主们和皇子们 我们可以这么表达
let emperor = {
  prince: ["prince1", "prince2", "prince3"],
  princess: ["princess1", "princess2", "princess3"]

  //当我想用 prince 来表达私生子的时候 就会出现 私生子会覆盖掉 同名数组
  prince: "bastard"
}

/*
  这个时候就需要用symbol了 我们在外面定义 symbol 然后将这个属性添加给皇帝
  symbol接收一个字符串做为参数 
  这个参数是一段描述是为了方便代码的阅读和后期的调试用的

  如果不加描述的话 symbol() symbol() symbol() 就会出现这种情况
*/
const prince = Symbol("bastard")
emperor[prince] = "bastard"
```

### 给 对象 中的属性 设置 symbol
```js
// 给对象中的属性 设置symbol
let age = Symbol("nn's_age")

// 定义对象
let obj = {
  name: "nn"
}

// 给对象添加 age 属性(该属性是 symbol)
obj[age] = 5


// 打印obj
console.log(obj)
// { name: 'nn', [Symbol(nn\'s_age)]: 5 }


// 读取 symbol
console.log(obj.age)
// undefined

console.log(obj[age])
// 5
```

在读取 symbol 对应的值的时候  
- 不能使用 . obj.age 这样不行
- 要使用 [] 来读取我们设置的 symbol() obj[age]


从上面的例子 我们能看到 我们给age设置了symbol 

    let age = Symbol("nn's_age")

然后利用age 将age属性添加到obj中  

    obj[age] = 5

但是打印 obj 能看到 并没有age属性名 属性名是我们设置的age的symbol

    打印结果: { name: 'nn', [Symbol(nn\'s_age)]: 5 }

同时我们尝试打印 obj.age 结果为 undefined

    console.log(obj.age)  // undefined

读取symbol 要采用 obj[age] 的方式

    console.log(obj[age])  // 5

<br>

### **<font color="#C2185B">Object.getOwnPropertySymbols(对象):</font>** 
这个方法返回目标对象中的所有 symbol 属性 
利用遍历的方式 读取 symbol 对应的值

**返回值:**  symbol数组  
```js
// 给对象中的属性 设置symbol
let age = Symbol("nn's_age")
let address = Symbol("nn's_adress")

// 定义对象
let obj = {
  name: "nn"
}

// 给对象添加 age 属性(该属性是 symbol)
obj[age] = 5
obj[address] = "日本"


// 获取 symbol 属性
let symbols = Object.getOwnPropertySymbols(obj)
console.log(symbols)
// [ Symbol(nn's_age), Symbol(nn's_adress) ]
```

遍历上方的 symbols 数组 获取symbol对应的属性值
```js
for(let symbol of symbols) {
  console.log("symbol: ", symbol)
  // symbol:  Symbol(nn's_age)


  console.log("symbol_value: ", obj[symbol])
  // symbol_value:  5
}
```

<br>

### Symbol的特点:
- Symbol的值是唯一的, 用来解决命名冲突的问题
- Symbol的值不能与其他数据进行运算
- Symbol定义的对象属性不能使用for...in 循环遍历, 但是可以使用Reflect.ownKeys来获取对象的所有键名

<br>

### **<font color="#C2185B">Symbol的创建: Symbol():</font>**
通过Symbol()函数来创建Symbol 返回一个Symbol的值  
创建的值的唯一性是不可见的, 内部实现了唯一性 相当于我们创建了一个永远不会重复的字符串
```js
let s = Symbol();
```

<br>

### **<font color="#C2185B">Symbol的创建: Symbol('描述字符串'):</font>** 
这个字符串为描述字符串, 通过这个描述字符串更好的理解这个Symbol是干什么的, 作用跟注释差不多  
用来区分我们创建的symbol字符串的, 要不然全是Symbol() Symbol()
```js
let s2 = Symbol('尚硅谷'); 
console.log(s2, typeof s2);     // Symbol(尚硅谷) symbol

let s3 = Symbol('尚硅谷'); 

// 这个描述字符串只是一个标识, 两个尚硅谷的编号是不一样的
console.log(s2 === s3);         //false
```

<br>

### **<font color="#C2185B">Symbol的创建: Symbol.for():</font>** 
创建 **唯一的symbol** 相当于单例  
当我们再使用该方式定义symbol的时候 其实其他的symbol都是在引用第一个创建的symbol
```js
let s4 = Symbol.for('尚硅谷'); 
let s5 = Symbol.for('尚硅谷'); 

console.log(s4 === s5);     //true
```

<br>

### **<font color="#C2185B">Symbol.keyFor(symbol对象):</font>** 
获取 使用 **Symbol.for()** 创建的 symbol 对象的描述
```js
let s = Symbol.for('尚硅谷'); 

let ret = Symbol.keyFor(s)
console.log(ret)    // 尚硅谷
```

<br>

### **<font color="#C2185B">symbol对象.description:</font>** 
通过属性的方式 输出 symbol对象 的描述
```js
let s2 = Symbol('尚硅谷'); 
console.log(s2.description);    // 尚硅谷
```

<br>

### **<font color="#C2185B">Reflect.ownKeys(obj) :</font>** 
可以遍历出 symbol属性的keys  值为 数组  
正常我们在遍历对象的时候 是获取不到 symbol 属性的 但是通过该方法可以
```js
let obj = {
  name: "sam"
}

let age = Symbol("age")
let sex = Symbol("sex")

obj[age] = 18
obj[sex] = "男"

let ret = Reflect.ownKeys(obj)
console.log(ret)
// [ 'name', Symbol(age), Symbol(sex) ]

// 只能输出 name 属性名
let res = Object.keys(obj)
console.log(res)
```

<br>

### **<font color="#C2185B">注意:</font>**
- Symbol不能与其他的数据进行运算

<br>

对以往的数据类型总结 USONB **you are so niubility**
- u = undefined
- s = string symbol
- o = object
- n = null number
- b = boolean

<br>

### symbol的应用1:
当对象中使用 同属性名时 后面的会覆盖前面的
```js
// 定义两个同名属性名
let name1 = "sam"
let name2 = "sam"

let obj = {
  [name1]: {age:18, sex:"男"},
  [name2]: {age:18, sex:"男"}
}

// 后面的将前面的覆盖掉了
console.log(obj)
// { sam: { age: 18, sex: '男' } }
```

解决方式: 利用 symbol
```js
// 创建两个 user 键名symbol对象
let user1 = {
  name: "sam",
  key: Symbol("user1")
}

let user2 = {
  name: "sam",
  key: Symbol("user2")
}


let obj = {
  [user1.key]: {age:18, sex:"男"},
  [user2.key]: {age:18, sex:"男"}
}

console.log(obj)
```

<br>

### symbol的应用2:
Symbol的使用场景就是给对象添加属性 和 方法, 表示独一无二的

现在有一个的对象 game, 我们要往这个对象中去扩展方法up down  
如果直接添加 会很危险, 因为你并不知道会不会覆盖掉game中原有方法  
这时就可以利用 symbol

#### 方式1: 
```js
let game = {...}


// 让方法名为 symbol
let methods = {
  up:Symbol("up"),
  down:Symbol("down")
}


// 向对象中添加方法
game[methods.up] = function(){};
game[methods.down] = function(){};


// 调用方法
game[methods.up]()
```

<br>

#### 方式2: 
```js
let youxi = {
  name:'狼人杀',

  // 在这个对象中添加一个独一无二的方法
  [Symbol('say')]: function(){
    console.log('我可以发言');
  },
  [Symbol('zibao')]: function(){
    console.log('我可以自爆');
  }
}

// 这种方式添加的方法, 先使用 Reflect.ownKeys(youxi) 遍历对象的属性名
const symbols = Reflect.ownKeys(youxi);

youxi[symbols[0]]();
youxi[symbols[1]]();
```

<br>

## Symbol的属性: 
除了定义自己使用的 Symbol 值以外, ES6 还提供了 11 个内置的 Symbol 值, 指向语言内部使用的方法。可以称这些方法为魔术方法, 因为它们会在特定的场景下 **<font color="#C2185B">自动执行 类似生命周期</font>**

    Symbol.xxx

eg: 对象[Symbol.hasInstance]  又会作为对象的属性 对对象进行设置  
通过对它们的设置, 我们可以改变对象在特定场景下表现的结果, 扩展对象功能

### **<font color="#C2185B">Symbol.hasInstance: -- instanceof</font>** 
#### **``[Symbol.hasInstance]() { ... }``:** 
作为 class 类中的 静态方法存在

我们创建一个 class 当使用 instanceof 检查实例对象是否是class的实例的时候 会自动执行 ``[Symbol.hasInstance]() { ... }`` 回调

```js
class Person {

  // 静态方法 类似 instanceof 的生命周期
  static [Symbol.hasInstance]() {
    console.log("使用instanceof的时候会自动执行")
  }
}

let o = {}

console.log(o instanceof Person)
// 使用instanceof的时候会自动执行
// false
```

``[Symbol.hasInstance]()`` 方法中的特点:  
- 可以传参 (怎么传)
- 可以return boolean 作为 instanceof 的结果
```js
class Person {
  static [Symbol.hasInstance](params) {

    // 可以传参
    console.log(params)   // {}

    // 决定instanceof的结果
    return true
  }
}

let o = {}

console.log("检测结果: ", o instanceof Person)  // 我们自己决定是true
```

<br>

### **<font color="#C2185B">Symbol.isConcatSpreadable: -- concat</font>** 
**Symbol.isConcatSpreadable** 作为对象的属性出现 比如

    arr[Symbol.isConcatSpreadable]

它的值是布尔值 用于控制 该对象 在使用 Array.prototype.concat() 的时候 该对象是否可以被展开

- arr[Symbol.isConcatSpreadable] = true  可以被展开
- arr[Symbol.isConcatSpreadable] = false 不可以被展开

数组展开的意思是, 是作为一个整体来进行数组的合并, 还是分元素合并

```js
let arr = [1,2,3];
let arr2 = [4,5,6];

// 我们现在做数组合并
console.log(arr.concat(arr2));  //(6) [1, 2, 3, 4, 5, 6]

// 接下来我们设置一下arr2
arr[Symbol.isConcatSpreadable] = false;
console.log(arr.concat(arr2));  // [Array(3), 4, 5, 6]
```

<br>

### **<font color="#C2185B">Symbol.species:</font>** 
创建衍生对象时, 会使用该属性

<br>

### **<font color="#C2185B">Symbol.match:</font>** 
当执行 str.match(myObject) 时, 如果该属性存在, 会调用它, 返回该方法的返回值

<br>

### **<font color="#C2185B">Symbol.replace:</font>** 
当该对象被 str.replace(myObject)方法调用时, 会返回该方法的返回值

<br>

### **<font color="#C2185B">Symbol.search:</font>** 
当该对象被 str.search (myObject)方法调用时, 会返回该方法的返回值

<br>

### **<font color="#C2185B">Symbol.split:</font>** 
当该对象被 str.split(myObject)方法调用时, 会返回该方法的返回值。

<br>

### **<font color="#C2185B">Symbol.iterator:</font>** 
对象进行 for...of 循环时, 会调用 Symbol.iterator 方法, 返回该对象的默认遍历器

<br>

### **<font color="#C2185B">Symbol.toPrimitive:</font>** 
该对象被转为原始类型的值时, 会调用这个方法, 返回该对象对应的原始类型值。

<br>

### **<font color="#C2185B">Symbol.toStringTag:</font>** 
在该对象上面调用 toString 方法时, 返回该方法的返回值

<br>

### **<font color="#C2185B">Symbol.unscopables:</font>** 
该对象指定了使用 with 关键字时, 哪些属性会被 with 环境排除。

<br>

# 迭代器  
遍历器（Iterator）就是一种机制。它是一种接口, 为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口, 就可以完成遍历操作。

ES6 创造了一种新的遍历命令 for...of 循环, Iterator 接口主要供 for...of 消费  
只要这个数据结构部署了 iterator接口, 就可以使用for...of来遍历这个数据

<u>iterator接口就是对象里的一个属性, 属性的名字叫Symbol.iterator</u>

调用 arr[Symbol.iterator]() 返回迭代器对象


原生具备 iterator 接口的数据(可用 for of 遍历)
- Array
- Arguments
- Set
- Map
- String
- TypedArray
- NodeList

<br>

### 遍历的原理: 
- 创建一个指针对象, 指向当前数据结构的起始位置
- 第一次调用对象的 next 方法, 指针自动指向数据结构的第一个成员
- 接下来不断调用 next 方法, 指针一直往后移动, 直到指向最后一个成员
- 每调用 next 方法返回一个包含 value 和 done 属性的对象

原理: 先创建了一个指针对象, 通过调用对象的next方法, 不断的指向下一个元素
```js 
// 定义数据
const xiyou = ['唐僧', '孙悟空', '猪八戒'];

// 创建一个指针对象, 指向当前数据结构的起始位置 获取指针对象:
let iterator = xiyou[Symbol.iterator]();

console.log(iterator);
// 结果: Array Iterator {},   __proto__: Array Iterator  next: ƒ next()



// 创建完的指针对象里有next(), 指针自动指向数据结构的第一个成员
console.log(iterator.next());   
  // 结果: {value: "唐僧", done: false} 


// 接下来不断调用 next 方法, 指针一直往后移动, 直到指向最后一个成员
console.log(iterator.next());   // {value: "唐僧", done: false} 
console.log(iterator.next());   // {value: "孙悟空", done: false} 
console.log(iterator.next());   // {value: "猪八戒", done: false} 
console.log(iterator.next());   // {value: undefined, done: true}

// done代表完成时  true代表循环完成 false代表循环未完成
```

<br>

### 迭代器的应用 -- 自定义对象中的迭代器:
迭代器用来自定义遍历数据, 按照我们自己的意愿遍历数据  
正常一个obj对象 是没有办法通过 for...of 来进行遍历的 会提示:

    TypeError: obj is not iterable

但是我们可以通过在 obj 内部添加 Symbol.iterator 接口 实现自定义遍历对象中指定的结
当我们在对象中自定义 Symbol.iterator 接口后 我们就可以通过 for...of 来遍历数据了

#### 需求: 遍历下面的对象, 每次返回的结果是数组里的成员
```js 
// 定义数据
const obj = {
  name:'终极一班',

  hobby:[
    'javascript',
    'java',
    'c++',
    'python'
  ],

  // 在obj中添加iterator接口, 并在其内部自定义遍历内容
  [Symbol.iterator](){

    // 声明一个索引变量, 让它不断指向下一个成员
    let index = 0;

    // 创建保存外层this的变量 this指向obj
    let _this = this;

    // 创建一个指针对象
    return {
      // 创建一个next();
      next:function(){

        // 根据下标返回结果, 在这里定下来 需要遍历哪个对象
        //如果小于hobby.length代表遍历没有结束
        if(index < _this.hobby.length){

          // 每次调用next方法返回的是一个包含value 和 done属性的对象
          const result = {value:_this.hobby[index], done:false}

          /* 
            this的问题, 我们的this是在next:function(){} 里的 
            所以我们要在外部创建一个变量用来保存外部的this
          */

          // 下标自增, 不自增永远为0
          index++;

          // 返回结果
          return result;

        }else{
          //遍历完成
          return {value:undefined, done:true};
        }
      }
    }
  }
}


for(let item of obj){
  console.log(item);     
}
```

<br>

# Generator 生成器
Generator　简单的说就是靠这个东西生成一堆, 它是一个相对特殊一些的函数

### 语法:
    function * fn() { ... }

<br>

### 作用:
用来解决异步操作的问题的

<br>

### 生成器函数的回顾:
生成器函数就是在普通的函数的基础上多了一个 *  
```js
function * foo() {
  console.log("start")
}
```

<br>

我们调用 生成器函数 并不会立即执行 而是返回一个生成器对象  
```js
function * foo() {
  console.log("start")
}

const generator = foo()
```

<br>

知道我们手动调用 生成器对象 的 next() 它才会开始执行内部逻辑
```js
function * foo() {
  console.log("start")
}

const generator = foo()
generator.next()
```

<br>

我们在函数体内部可以随时使用 yield 关键字 向函数外部返回一个值 我们可以在 next() 方法前面定义变量接收的返回值

res中还有 done 属性 标识生成器是否已全部执行完毕

yield不会像return一样立即结束函数的执行 它只是暂停函数的执行 直到外界下一次调用 next() 之后 它就会继续从 yield 的位置继续向下执行
```js
function * foo() {
  console.log("start")

  yield "foo"
}

const generator = foo()
let res = generator.next()
console.log(res)    // foo
```

<br>

如果我们调用 next("参数") 方法的时候进行了传参 所传的参数会作为 yeild 语句的返回值 我们在 yield 的左边是可以接受到 外部传递进内部的参数的

```js
function * foo() {
  console.log("start")

  let ret = yield "foo"
  console.log(ret)    // bar
}

const generator = foo()
let res = generator.next()
console.log(res)    // foo

generator.next("bar")
```

<br>

如果我们在外部调用的 生成器对象 的 throw() 方法 该方法可以对生成器函数内部抛出一个异常 内部在执行的时候就可以得到这个异常

```js
function * foo() {
  console.log("start")

  try { 
    let ret = yield "foo"
    console.log(ret)

  // 捕获外面抛进来的异常
  } catch(e) {
    console.log(e)    // generator error
  }
}

const generator = foo()
let res = generator.next()
console.log(res)    // foo

generator.throw(new Error("generator error"))
```

<br>

### 普通函数的特点:
一条路走到黑, 开始了就不会停 直到函数结束 才算完事 把普通函数理解成飞机, 中间不能停接朋友?

<br>

### Generator本质上: 
整个generator函数就是一个封装的异步任务 或者是异步任务的容器  
yield命令是异步阶段的分界线 所以说有时候也把yield当成是return 当然 yield跟return有本质的不同

<br>

### Generator函数的特点:
它中间能停, 把Generator函数理解成出租车, 想停哪停哪  
它最大的特点就是可以交出函数的执行权(即暂停执行) 其中的关键字yield可以定义不同的状态 方便根据不同的情况注入数据

状态其实就是数据 内部的状态就是函数内部的值 它在不同的时候 是不一样的

<br>

- 它可以分步执行, 需要和 yield 配合使用  

      yield翻译过来就是放弃的意思, 在执行的代码的时候碰到yield会暂停执行
      简单的理解为暂时放弃执行, 暂时把控制权交出去, 过一会需要重新执行的时候, 再把控制权还给我

- 生成器函数 需要接收调用函数后的返回值  

      let genObj = fn()

- 生成器函数需要和next方法搭配使用, next()方法简单理解为 踹一脚走一步

      genObj.next();
      碰到yield后会暂停执行, 再次调用next()方法, 如果后面没有yield才会执行全部代码

<br>

### **<font color="#C2185B">生成器实例.next(): </font>**
在 ``genObj.__proto__.__proto__`` 里面 -- next: ƒ next()

<br>

### 那为什么需要让函数停呢?
比如说请求数据, 请求数据并不是瞬间能回来的 不管是什么方式ajax也好vue也好 他们都是需要一个时间的过程 是一个异步操作 这个时候我们就可以用暂停等数据过来

正常函数是这样的:
```js
function 函数() {

  代码...

  // 中间要读数据了
  $.get("/", data => {
    代码... 因为请求的数据文件可能很多会出现回调地狱的问题
  })
}
```

如果是生成器函数的话: 
```js
function 函数() {

  代码...

  // 中间要读数据了, 我先yield让它暂停着, 并在这里配上获取数据的相关操作比如ajax
  yield $.get("/", data => { ... }); 
  
  代码...
}
```

像不像 async await:
```js
async function fn() {

  ...同步代码

  await 异步代码
  ↓
  下面的代码都会依次等待 await 的结果

}
```

生成器函数和普通的函数并没有太大的区别, 也是能取名字能传递参数, 它最大的特点就是能走走停停, 如果普通函数涉及到异步的操作我们只能用回调的方式

<br>

### 它是怎么做到走走停停的?
它其实是用一个生成器函数生成了一堆的小函数 它相当把一个大函数切分成两个小函数
```js
function * show() {

  alert("a");

  yield;

  alert("b");

}

// 可以理解为生成了两个函数
function show1() {
  alert("a");
}

function show2() {
  alert("b");
}

// 第一次next()的时候走的是show1
// 第二次next()的时候走的是show2
```

<br>

### 解析:
普通函数开始运行后一条路走到黑
```js
function show() {
  alert("a");
  alert("b");
  alert("c");
}
show();
```

现在我的需求是 a 运行完后不要走 等一下 停一会再出现b  
它需要和yield搭配使用, 我在哪停的告诉我吧(yield告诉我在哪停)

    yield英语意思可以叫放弃, 简单的理解为暂时放弃执行, 暂时把控制权交出去
    过一会需要重新执行的时候, 再把控制权还给我

```js
function * show() {
  alert("a");

  yield;

  alert("b");
  alert("c");
}
```

生成器函数还有一个不同的地方就是在函数调用, show()不会直接运行函数内部的代码
相反它会创建一个生成器的实例对象(创建了一个生成器对象)

    let genObj = show()

有了这个对象(genObj)才能接着执行
        
```js
let count = 0

function * fn() {
  count++
  console.log("逻辑1")

  yield

  console.log("逻辑2")
  console.log("逻辑3")

  yield

  console.log("剩余逻辑")
}

let gen = fn()
```

- 第一次执行 gen.next() 打印: 逻辑1  
  {value: undefined, done: false}

- 第二次执行 gen.next() 打印: 逻辑2 逻辑3  
  {value: undefined, done: false}

- 第二次执行 gen.next() 打印: 剩余逻辑  
  {value: undefined, done: true}

- 最后打印count = 1 说明只运行了一次

<br>
    
### **<font color="#C2185B">关键字: yield</font>**
yield既可以传递参数 又可以有返回值

<br>

#### **<font color="#C2185B">给函数中的 yield 传参: </font>**
给yield传参需要在 next()方法中传递, yiled需要创建变量来接受传递的参数
```js
function * fn() {

  console.log("开始逻辑")

  let res1 = yield
  console.log("输出上方res1: ", res1)
  console.log("剩余逻辑")
}

let gen = fn()
gen.next("第一次的传参是没用的")
gen.next("参数1")
```

对于传参来说, 通过yield来传参的时候, *第一个next里面的参数是废的*

<br>

### 解析:
<font color="#C2185B">第一个next</font>执行的部分是 console.log("开始逻辑") ~ <font color="#C2185B">等于右边yield</font>  

    所以第一个 yield 优先将函数内的数据传出

第二个next执行的部分是 let res1 ~ 最后

<br>

#### **<font color="#C2185B">yield的返回值: </font>**
yield对于整个函数来说, 可以理解为 yield属于中间结果, 返回一个中间结果

买回来的菜(函数参数)

      ↓

      洗菜             切菜            炒菜           (整个功能分3个环节)

      ↓           ↗       ↘       ↗   ↘

    干净的菜    →             切好的菜     炒好的菜    (中间结果)


比如我们把做菜 分为3个环节
- 洗菜 
- 切菜 
- 炒菜

那每一步会有一个中间结果, 最开始我输入的是菜市场买回来的菜, 相当于函数的参数 相当于

    function fn(num) {   }

每一步会有中间的结果, 比如洗菜后的中间结果就是 刚买回来的菜变成了干净的菜  
前一步的结果成为了下一步的输入, 切菜的话得拿干净的切不能拿脏的切  
切菜的环节也会产生中间结果 切好的菜 这个切好的菜又作为中间结果输入下一个环节  
而炒菜又会产生一个结果 这个就是最终的结果  

每一步都会有一个中间的结果 而每一步的中间结果就相当于 yield  
最初的参数就是正常函数传递的参数, 最后的结果会对应一个return

<br>

#### **<font color="#C2185B">使用 yield 将中间结果传出: </font>**

定义变量接收 next(参数) 传递进来的参数
```js
let 变量 = yield;
```

将中间结果传出 那么generator函数外部就要 创建变量接收
```js
yield 12
```

```js
let 接收函数内容传递出来的中间结果的变量 = gen.next()
```

```js
function * fn() {
  
  console.log("开始逻辑")

  // 使用 yield 将中间结果传递出去
  yield 66

  console.log("剩余逻辑")
}

let gen = fn()
let res = gen.next()

console.log(res)          // { value: 66, done: false }
console.log(res.value)    // 66
```

yield返回的中间结果 类型是一个对象

    {
      value: 中间结果(yield后面跟的表达式),
      done: false or true
    }

最后一个next()的方法的 value值 会是undefined, 所以最后一个yield的结果 需要通过return来返回

```js
function * fn() {
  
  console.log("开始逻辑")

  yield 66

  console.log("剩余逻辑")

  // 通过 return 返回值, 在最后一个next()中接收
  return "end"
}

let gen = fn()
let res = gen.next()
let end = gen.next()

console.log(end)  // { value: 'end', done: true }
```

<br>

### generator 入参 传出数据的演示
**要点:**  
- fn的形参是通过如下的形式传入到generator函数中的 属于函数的初始值

      let gen = fn("市场的菜")

- 最先是 第一个 yield 传出 数据

      let params1 = yield "洗干净的菜"

- 然后 才可以通过第二个 next(参数) 的形式 将数据传入函数中

      gen.next(temp)

- 函数中最后想要return结果的话 要使用 return

<br>

**演示:**  
```js
function * fn(vegetable) {

  console.log("刚从市场买回来的菜: ", vegetable)
  console.log("洗菜")

  // 将洗干净的菜通过 yield 传出去, 定义params1接收外部传递进来的加工后的菜
  let params1 = yield "洗干净的菜"

  console.log("params1: ", params1)

  // 拿到切好的丝后加工成 成品菜最后暴露出去
  return params1 + "完成"
  
}


let gen = fn("市场的菜")

// 定义 process1 用于接收 yield 传出来的结构
let process1 = gen.next()
console.log("yield传递出来的菜: ", process1)

// 拿到传递出来的数据进行加工后传入到函数中
let temp = process1.value
temp = temp + "切丝"

// 将切好的丝传入, 定义变量接收最后的结果
let end = gen.next(temp)

console.log(end.value)

```

<br>

### 示例:
```js
function * fn() {

  console.log("开始逻辑")

  yield 12

  console.log("后续逻辑")

  // 如果想让外侧的最后一个next()接收到返回值 使用return
  return "最后的返回值"
}

let gen = fn()
let res1 = gen.next()
console.log(res1)   // { value: 12, done: false }

let res2 = gen.next()
console.log(res2)   // { value: undefined, done: true }
```

<br>

### 示例2:
```js
function * 炒菜(菜市场买回来的新鲜的菜) {

  /*
    1. yield 将 菜市场买回来的新鲜的菜 -- 洗干净后传出

        yield 洗好的菜

    2. 外部拿到 洗好的菜 切丝后 传入到函数中

        let 丝
  */
  let 丝 = yield 洗好的菜;  


  /*
    拿到 丝 后进行加工 加配菜开炒
    将炒完的菜传出
  */
  return 做好的菜
}


// 通过 实参 传入
let gen = fn(菜市场买回来的新鲜的菜)

// 接收函数内容洗干净的菜 将洗干净的菜切丝 将丝传入
let 接收函数内容洗干净的菜 = gen.next(丝)
```    

<br>

### 生成器函数的应用案例:
我们看下生成器函数在数据读取操作中怎么应用

先准备两个文件  

    1.txt   [12,5,8]
    2.txt   ["a":12, "b":5]
    3.txt   [{"name":"sam", age:18}, {"name":"erin", age:20}]


```js 
runner(function * () {
  let data1 = yield $.ajax({url:'data/1.txt', dataType:'json'});
  let data2 = yield $.ajax({url:'data/2.txt', dataType:'json'});
  let data3 = yield $.ajax({url:'data/3.txt', dataType:'json'});

  console.log(data1, data2, data3);
  // 能打印出3个文件中的json对象
}
```

**解析下:**  
$.ajax({url:'data/1.txt', dataType:'json'}); 会返回一个promise对象  
然后把这个promise对象 yield出去 给runner(因为是runner在执行生成器函数)  
然后 这个函数暂停了 因为遇到yield的了嘛

然后
runner就会执行promise的结果(数据请求), 等到它执行完了 控制权再还给生成器函数 就回到了 data1 下面也一样, 读完了给data2, 读完了给data3

它的好处就在于可以像同步一样 写异步的操作

<br>

当我们面对异步的操作有几种写法
- 老老实实的用回调来写, 回调地狱
- promise  

      Promise.all([
        $.ajax({url:'xxx', dataType:'json'}),
        $.ajax({url:'xxx', dataType:'json'}),
        $.ajax({url:'xxx', dataType:'json'}),
      ]).then(results => {
        // 完事了
      }, err=>{
        alert('错了');
      })

- generator  
它适合掺杂一些逻辑
比如第一个读取的是用户数据, 然后我根据用户数据中用户是不是vip来读别的东西  
如果是vip我就读vip的商品 如果是普通用户就读普通用户的商品

      runner(function * () {
        let data1 = yield $.ajax({url:'data/1.txt', dataType:'json'});
        let data2 = yield $.ajax({url:'data/2.txt', dataType:'json'});
        let data3 = yield $.ajax({url:'data/3.txt', dataType:'json'});

        // 完事
      })

<br>

### 示例: 带逻辑的promise 和 带逻辑的generator
**promise:**  
这种情况下 使用promise跟普通回调嵌套的方式区别不大了

```js
Promise.all([
  $.ajax({url:'xxx', dataType:'json'})
]).then(results => {

  let userData = results[0];

  // 接下来对userData进行判断 如果是vip则进行什么样的操作
  if(userData.type === 'VIP') {

    // 如果是vip的话我们就读取另一个东西
    Promise.all([
      $.ajax({url:'xxx', dataType:'json'})
    ]).then(results => {

      let items = results[0]
      // 得到数据后, 可以做其他的事情, 比如生成列表啊 加时间等

    }, err => {
      alert('错了')
    })

  } else {

    // 这里是普通的用户
    Promise.all([
      $.ajax({url:'xxx', dataType:'json'})
    ]).then(results => {
      let items = results[0]
    }, err => {
      alert('错了')
    })
  }

}, err => {
  alert('失败了')
})
```

<br>

**generator:**  
这里就能看出来生成器函数在处理带逻辑的数据读取的优势
当有了逻辑后就非常的方便
```js 
runner(function * () {
  let userData = yield $.ajax({url:'generator', dataType:'json'});
  
  if(userData.type === 'VIP') {
    let item = yield $.ajax({url:'generator', dataType:'json'});
  } else {
    let item = yield $.ajax({url:'generator', dataType:'json'});
  }
})

    // 生成....
```

> 总结:
Promise适合一次读一堆
generator适合夹杂着逻辑性判断的东西, 我有可能读这个 有可能读那个

<br>

### 应用: 使用生成器函数避免回调地狱
```js
// 先声明三个函数, 这三个函数分别完成3个异步任务
function one(){
  setTimeout(()=>{
    console.log(111);
    // 2 所以我们在每个函数中都执行 iterator.next();
    iterator.next();
  }, 1000);
};


function two(){
  setTimeout(()=>{
    console.log(222);
    iterator.next();
  }, 2000);
};


function three(){
  setTimeout(()=>{
    console.log(333);
    iterator.next();
  }, 3000);
};

// 创建生成器函数, 把上面3个函数放到yield语句里面
function * gen() {

  yield one();
  yield two();
  yield three();

};

// 调用生成器函数
let iterator = gen();
iterator.next();        // 如果只写这里 只会出现第一个yield之上的部分
```

<br>

### 应用: 模拟获取用户数据, 订单数据, 商品数据, 生成器函数解决异步任务
```js
// 模拟获取 先来用户数据 然后订单数据 最后商品数据
// 我们用定时器模拟异步行为
function getUsers(){
  setTimeout(() => {
      let data = '用户数据'
      // 调用next()方法, 并且将数据传入
      //2 这是第二次调用, 所以它的实参将作为第一次yield的返回结果
      iterator.next(data);
  }, 1000);
};

function getOrders(){
  setTimeout(() => {
    let data = '订单数据'
    //4 这是第三次调用, 所以它的实参将作为第二次yield的结果返回
    iterator.next(data);
  }, 1000);
};

function getGoods(){
  setTimeout(() => {
    let data = '商品数据'
    //6 这是第四次调用, 所以它的实参将作为第三次yield的结果返回
    iterator.next(data);    
  }, 1000);
};

// 先来获取用户
function * gen(){
  //3 创建变量, 接收第一个yield的返回结果, 因为2中是第二次调用next()
  let Users = yield getUsers();
  console.log(Users);
  //5 创建变量, 接收第二个yield的返回结果, 因为4中是第三次调用next()
  let Orders = yield getOrders();
  console.log(Orders);
  //7 创建变量, 接收第三个yield的返回结果, 因为6中是第四次调用next()
  let Goods = yield getGoods();
  console.log(Goods);
};

let iterator = gen();

//1 会运行第一段 运行完后会把getUsers()运行的结果返回
iterator.next();
```

<br>

### Generator 管理异步流程

使用 yield 传出请求结果 通过 next() 再送回函数内部 这样在函数内部来看 就相当于同步代码了

```js
function * main() {

  // 使用 yield 返回一个ajax调用
  const users = yield ajax("/api/users.json")
  // 接收 yield 的返回值 并打印
  console.log(users)
}

const g = main()
// main函数会执行到 第一个 yield 的位置 右边
let result = g.next()

// result 就是 ajax返回的promise对象
result.value.then(data => {
  // 再次调用 next 将data送进函数中
  g.next(data)
})
```


```js
function * main() {

  const users = yield ajax("/api/users.json")
  console.log(users)

  // 请求另外一个地址
  const posts = yield ajax("/api/posts.json")
  console.log(posts)
}

const g = main()
let result = g.next()

result.value.then(data => {

  // 接收第二个请求回来的对象
  let result2 = g.next(data)
  result2.value.then(data => {
    g.next(data)
  })
})
```

<br>

### 递归的方式 执行生成器:
```js
function * main() {
  try {
    const users = yield ajax("/api/users.json")
    console.log(users)
  } catch(e) {
    // 解决异常
    console.log(e)
  }
}

const g = main()

// 定义处理 result 的函数 参数 result 就是next()方法返回的result
function handleResult(result) {
  // 先判断 result.done 是否为true 如果是则不用继续往下执行
  if(result.done) return

  result.value.then(data => {
    // g.next(data) 它返回的也是result 所以它应该交给 handleResult 继续执行
    handleResult(g.next(data))

  // 添加第二个回调 处理 ajax 的异常
  }, error => {
    // 让函数内部接到异常 
    g.throw(error)
  })
}

// 我们只需要在外面调用handleResult() 传入第一个 next的结果就可以了 只要生成器不直接 递归就会一直的执行下去
handleResult(g.next()) 
```