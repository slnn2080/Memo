# JS
一种运行在客户端的脚本语言(script脚本意思) 脚本语言不需要编译, 运行过程中由js解释器来逐行来进行解释并执行

<br><br>

## JS能做的事情:
- 表单的动态校验(密码强度检测)
- 网页特效
- 服务器开发(Node.js)
- 桌面程序(Electron)
- APP(Cordova)
- 控件硬件-物联网(Ruff)
- 游戏开发(cocosd.js)

<br>

## 浏览器执行JS简介
浏览器分为两个部分, 渲染引擎 和 JS引擎

<br>

### 渲染引擎:
用来解析 HTML CSS 俗称 **内核**, 比如chrome浏览器的 blink 老版本的 webkit

<br>

### JS引擎:
也称为JS解释器, 用来读取网页中的js代码, 对其处理后运行, 比如chrome浏览器的v8  
浏览器本身并不会执行js代码, 而是通过内置js引擎(解析器)来执行js代码,

js引擎执行代码时逐行解释每一句源码转换为机器语言, 然后由计算机去执行 所以js语言归为脚本语言, 会逐行解释执行

<br><br>

## 解释型语言 & 编译型语言
计算机是不能直接理解任何 除 机器语言以外的语言, 所以必须要把程序员所写的程序语言翻译成机器语言才能执行程序, 程序语言翻译成机器语言的工具, 被称为 **翻译器**

```
编程语言 -> 翻译器 -> 机器语言(二进制)
```

<br>

### 翻译器翻译的方式有两种:
- 一种是编译(java)
- 一种是解释(js)

两种方式之间的区别在于翻译的 **时间点** 不同

编译器 在代码执行之前进行编译, 生成中间代码文件 比如 .class字节码文件  
解释器 是在运行时进行即时解释, 并立即执行 (当编译器以解释方式运行的时候, 也称之为解释器)

- 编译语言: 先把所有的菜做好, 才能上桌吃饭
- 解释语言: 好比吃火锅, 边吃边涮, 同时进行

<br><br>

# 标识符 关键字 保留字

### 标识符 (不能是关键字 或 保留字):
就是指开发人员为 变量 属性 函数 参数 **取的名字**

<br>

### 关键字:
是指js本身已经使用了的单词 不能再用他们充当 变量名 方法名 比如
``` 
break case catch continue default delete do else ...
```

<br>

### 保留字:
预留的关键字, 意思是现在虽然还不是关键字, 但是未来可能会成为关键字, 所以同样不能使用他们当 变量名 或 方法名

``` 
boolean byte char class const debugger double enum export
fimal float goto ...
```

<br><br>

# 表达式 和 返回值

### 表达式: 
是由数字 运算符 变量等组成的式子 以能求得数值的有意义排列方法所得的组合

<br>

### 返回值:
表达式 最终都会有一个结果, 返回给我们, 我们称为返回值  
等式的右边表达式计算完毕把返回值给左边

<br><br>

# JS的组成
- ES5
- DOM
- BOM

<br><br>

# 变量
变量就是一个装东西的盒子

变量是用于存放数据的容器, 我们通过变量名来获取数据, 修改数据

变量可以保存字面量而且变量的值是可以任意改变的 变量可以让我们的数据变得更加方便 所以在开发中我们都是通过变量去保存一个字面量

<br>

### 变量本质:
变量是程序在内存中申请的一块用来存放数据的空间, 每次创建变量都会创建一个空间 比如去酒店住, 空间就相当于房间, 房间号相当于变量名

<br>

### 变量的使用:
声明变量 和 为变量赋值

<br>

### 声明变量 & 赋值:
在js中使用 var关键字 来声明一个变量 variable 使用关键字声明变量后, 计算机会自动为变量分配一个内存空间
```js
// 声明一个变量但是没有值
var a;

// 给a赋值
a = 123;
```

<br>

### 变量的初始化:
声明一个变量的同时赋值 叫做变量的初始化

```js
// 或者在声明变量的同时赋值  
var b = 789;
```
很多情况下对于单纯的数字来讲 没办法知道它所表达的含义是什么 所以可以通过变量对字面量进行描述

<br>

### 变量的修改(更新):
一个变量被重新赋值后, 它原有的值就会被覆盖, **以最后一次的为准**   
本质是在原有的空间里修改, 不会新创建变量(房间)

<br>

### 声明多个变量:
我们在声明多个变量的时候 会使用let等关键字 同时 **多个变量之间使用逗号连接**
```js
let age = 18
   , address = '火影村'
   , gz = 2000;
```

<br>

### 声明变量的特殊情况:
1. 只声明没有赋值, 结果是: ``undefined``
2. 不声明不赋值, 结果是: ``报错``
3. 不声明直接赋值, 结果是: 会成为全局变量可以使用, **不推荐**

<br>

### 变量的命名规范:
在js中所有的可以由我们自主命名的都可以 成为标识符
1. 标识符可以含有 字母 数字 _ $
2. 标识符不能以数字开头
3. 标识符不能是JS中的关键字或者是保留字
4. 标识符一般都采用驼峰命名法
5. 严格区分大小写

<br><br>

# 数据类型:
在计算机中, 不同的数据所需占用的存储空间是不同的, js里根据该数据类型需要使用的内存大小不同 分为了不同的数据类型 , 充分利用储存空间, 于是定义了不同的数据类型

就比如, 一个瘦的人睡单人床, 一个胖的人睡双人床, 占用的空间大小是不一样的

也就是说 数据都是要占用内存的 我们设置数据类型是为了给对应类型的分配所需内存

<br>

### 变量的数据类型:
变量是用来存储 值 的所在处, 它们有
- 名字
- 数据类型

变量的数据类型 决定了如何将 代表这些值 的位存储到计算机的内存中

js是一种弱类型或者说动态语言, **这意味着不用提前声明变量的类型**, 在程序运行过程中, 类型会自动确定

也就是说js的变量的数据类型是只有 **程序在运行过程中根据等号右边的值来确定的**

```js
// 当js看到 = 后是10为 number 类型的时候 才能确定变量num的数据类型是什么
let num = 10;
```

<br>

### js的数据类型分类:
在js中一共有7种数据类型, 前5个是属于基本数据类型 Object属于引用数据类型

- String      字符串   
- Number      数值
- Boolean     布尔值
- Null        空值
- Undefined   未定义
- Object      对象

<br>

对以往的数据类型总结  USONB  you are so niubility
- u = undefined
- s = string symbol
- o = object
- n = null number
- b = boolean 

<br>

## 数字型: Number
在js中所有的数值都是Number类型包括 整数 和 浮点数(小数)

<br>

### 数字型进制:
二进制, 八进制, 十六进制

<br>

### 八进制:
我们程序里面 **数字前面加0**, 表示8进制
每位的取值范围: 0 ~ 7

```js
let num = 010;
console.log(num);
/*
  010 八进制转换为10进制 就是 8
  0 1 2 3 4 5 6 7 当数字为8的时候 该进位了 -> 10

  7 再加1 需要进位 个位变为0 十位为1 所以是10 八进制前面要加0 最后为010
*/

```

<br>

### 十六进制:
数字的 **前面加0x**, 表示16进制, 
每位的取值范围: 0 ~ 9 - a ~ f

```js
let num = 0x9;
console.log(num);    // 9

num = oxd
console.log(num)    // 13
```

<br>

### js中最小值 和 最大值对应的常量:
- Number.MAX_VALUE: 1.7976931348623157e+308
- Number.MIN_VALUE: 5e-324

<br>

### 数字型中的三个特殊常量:
- Infinity: 代表无穷大
- -Infinity: 代表无穷小
- NaN: Not a number 不是一个数字

```js
console.log(Infinity) // Infinity
```

<br>

### Infinity:
比如Number类型中的最大值 超过了 最大值 则结果就是 Infinity
```js
Number.MAX_VALUE * Number.MAX_VALUE  //最大值x最大值
```

<br>

### 注意:
Infinity 是一个字面量


<br>

### NaN:
是一个特殊的数字 表示 Not A Number 表示非数字NaN也是字面量, **也属性数值类型**

```js
let num = NaN
console.log(typeof num) // "number"
```

<br>

### 浮点数运算运算的问题:
在js中正数的运算基本可以保证精确 但如果使用js进行浮点数运算可能会得到一个不精确的结果 **千万不要用js进行精确度比较高的运算**, 比如: 钱
```js
var c = 0.1 + 0.2;
console.log(c); // 结果是: 0.30000000000000004
```

<br><br>

## 整型: BigInt
BigInt是一种特殊的 数字类型, **它支持任意长度的整数**  
在对大整数执行数学运算时 以任意精度表示整数的能力尤为重要 使用 BigInt 整数溢出将不再是问题

对于学过其他语言的程序员来说JS中缺少显式整数类型常常令人困惑

许多编程语言支持多种数字类型如浮点型、双精度型、整数型和双精度型 

但JS却不是这样 **在JS中按照 IEEE 754-2008 标准的定义所有数字都以双精度64位浮点格式表示**

在此标准下无法精确表示的非常大的整数将自动四舍五入. 确切地说 JS 中的 Number类型只能安全地表示 
  
```s
# 16位
-9007199254740991(-(2^53-1)) ~ 9007199254740991(2^53-1)
```

超出此范围的整数值都可能失去精度

该整数大于 JS中的Number类型所能表示的最大整数 因此它被四舍五入的 一旦四舍五入后会损害程序的可靠性和安全性

- Number.MAX_SAFE_INTEGER  常量表示 最大安全整数
- Number.MIN_SAFE_INTEGER  常量表示 最小安全整数

<br>

### 创建BigInt: 字面量类型
在数值的后面追加字母n 来标识该数据为 bigInt 类型 类似 long类型数字后面要追加l是一样的

<br>

```js
let bigNum1 = 12n
let bigNum2 = 33n

console.log(bigNum1 + bigNum2)  // 45n
```


<br>

### ### 创建BigInt: BigInt() 构造函数
参数: 数字 | 数字型字符串, 参数不用手动加n, 直接调用而**不是通过 new 来进行调用**

```js
let bigNum3 = BigInt("33")
console.log(bigNum3)  // 33n
```

<br>

### 注意下面的情况:
```js
BigInt("10");  // → 10n	
BigInt(10);    // → 10n	
BigInt(true);  // → 1n


// 无法转换的数据类型和值会引发异常:
BigInt(10.2);   // → RangeError	
BigInt(null);   // → TypeError	
BigInt("abc");  // → SyntaxError


// 可以直接对使用构造函数创建的 BigInt执行算术操作
BigInt(10) * 10n;    // → 100n


// 使用严格相等运算符的操作数时使用构造函数创建的 Bigint与常规 Bigint的处理方式类似
BigInt(true) === 1n;    // → true
```

<br>

### BigInt运算
BigInt类型的数据 只能和 BigInt类型的数据 进行运算
```js
let bigNum = BigInt(1)
let num = 2

console.log(bigNum + num)
// Cannot mix BigInt and other types, use explicit conversions
// 不能混合使用BigInt和其他类型，使用显式转换
```

<br>

### BigInt进制
BigInt文字也可以用二进制 八进制 十六进制表示
```js
console.log(0b888776666n)
console.log(0x888776666n)
console.log(0o888776666n)
console.log(04888776666n)
```

<br>

### BigInt 与 Number类型之间的比较
不能使用严格相等运算符将 BigInt与常规数字进行比较因为它们的类型不同:
```js
console.log(10n === 10)     // false
console.log(10n == 10)      // true

console.log(typeof 10n)     // bigint
console.log(typeof 10)      // number
```

<br>

### BigInt类型之间的原酸
**除一元加号(+)运算符外** 所有算术运算符都可用于 BigInt
```js
10n + 20n;    // → 30n	
10n - 20n;    // → -10n	
```

```js
+10n;         
// → TypeError: Cannot convert a BigInt value to a number	
```

```js
-10n;         // → -10n	
10n * 20n;    // → 200n	
20n / 10n;    // → 2n	
23n % 10n;    // → 3n	
10n ** 3n;    // → 1000n	

const x = 10n;	
++x;          // → 11n	
--x;          // → 9n
```

不支持一元加号(+)运算符的原因是某些程序可能依赖于 +始终生成 Number的不变量或者抛出异常. 更改+的行为也会破坏 asm.js代码

<br>

### BigInt除法的问题:
与 BigInt操作数一起使用时算术运算符应该返回 BigInt值 因此除法(/)运算符的结果**会自动向下舍入到最接近的整数**  
例如:
```js
25 / 10;      // → 2.5	
25n / 10n;    // → 2n
```

<br>

### BigInt 和 Number之间的转换
如果希望使用 BigInt和 Number 执行算术计算 首先需要确定应该在哪个类型中执行该操作, **为此只需通过调用 Number()或 BigInt()来转换操作数:**
```js
BigInt(10) + 10n;    // → 20n	
// or	
10 + Number(10n);    // → 20
```

<br>

### 要点:
1. 因为隐式类型转换可能丢失信息 **所以不允许在 bigint和 Number 之间进行混合操作**
```js
let bigNum1 = 12n
console.log(bigNum1 + 1)    
// 报错: Cannot mix BigInt and other types, use explicit conversions
```

2. BigInt不能传递给 Web api 和 内置的 JS 函数 这些函数需要的是一个 Number 类型的数字, 我们传递 BigInt类型的情况下会报错TypeError错误
```js
Math.max(2n, 4n, 6n);    // → TypeError
```

3. 请注意关系运算符不遵循此规则 如下例所示:
```js
10n > 5;    // → true
```

4. 当 Boolean 类型与 BigInt 类型相遇时 BigInt的处理方式与 Number类似  
换句话说只要不是 0n BigInt就被视为 truthy 的值:  (0: false, 1: true)
```js
if (5n) {	
  // 这里代码块将被执行	
}	
if (0n) {	
  // 这里代码块不会执行	
}
```

5. 排序 BigInts 和 Numbers 数组时不会发生隐式类型转换:
```js
const arr = [3n, 4, 2, 1n, 0, -1n];	
arr.sort();    // → [-1n, 0, 1n, 2, 3n, 4]
```

6. 位操作符如 | & << >> 和 ^ 对 Bigint的操作方式与 Number类似.
```js
90 | 115;      // → 123	
90n | 115n;    // → 123n	
90n | 115;     // → TypeError
```

<br>

### 扩展: BigDecimal
js中没有这个类 如果需要使用的话 还需要安装对应的js库

**相关的js库有:**  

- Math.js
```
用于 JavaScript 和 Node.js 的扩展数学库。
它具有支持符号计算的灵活表达式解析器, 大量内置函数和常量, 并提供了集成的解决方案来处理不同的数据类型, 例如数字, 大数, 复数, 分数, 单位和矩阵。强大且易于使用。
```

- decimal.js
```
JavaScript 的任意精度的十进制类型。
```

- big.js
```
一个小型, 快速, 易于使用的库, 用于任意精度的十进制算术运算。
```

- bignumber.js
```
一个用于任意精度算术的 JavaScript 库。
```

<br>

# 字符串型 String
在js中的字符串需要使用引号引起来 推荐使用单引号

```js
var str = "hello";
str = "还可以修改已赋值的字面量";
```

<br>

## 字符串转义符 \:
类似HTML中的特殊符号, 字符串中也有特殊字符, 我们称之为转义符

在字符串中我们可以使用\作为转义字符 当我们想让 一些符号 或者 字母 具有特殊意义的时候 可以用 \ 进行转义

- \":
- \':
- \n:  表示换行
- \t:  表示制表符
- \\:  自己转义自己 是\
- \b:  表示退格符
- \r:  表示回车

```js 
// 字符串转移字符, 都是用 \ 开头 但是这些转义字符写到引号里面
console.log("今天天气\n真不错！！！")
```

<br>

### 获取字符串的长度:
字符串是由若干字符组成的, 这些字符的数量就是字符串的长度, 通过字符串的属性length可以获取整个字符串的长度
```js
str.length
```

<br>

### 字符串的拼接:
**数值相加, 字符相连**  

多个字符串之间可以用 + 进行拼接, 拼接前会把与字符串相加的任何类型转为字符换, 再拼接成一个新的字符串

<br>

### 技巧:
字符串中拼接变量 **引引加加**
```js
let age = 33
let msg = 'pink老师今年' + age + '岁'
```

<br><br>

# 布尔型: Boolean
布尔值只有两个用来进行逻辑判断

- 真: true
- 假: false

<br>

布尔值在进行加法运算时 
- true  当 1
- false 当 0  

<br>

# Null 空值:
这个类型的值 只有一个 就是null, null这个值专门用来表示一个为空的对象

<br>

**注意:**  
1. 使用typeof检查null值时会返回object

```js
// 一个声明变量给null值, 里面存的值为空
var x = null;
console.log(x);         //null的值为 null
console.log(typeof x);  //null的对象类型是 Object

let x = null;
console.log(x + 1);     // 1 因为null为空
```

<br>

2. 数字 是可以和 null 进行运算的, null相当于空 or 0
- 1 + null = 1
- 1 - null = 1
- 1 * null = 0
- 1 / null = Infinity

<br>

# Undefined 未定义:
这个类型的值 只有一个 就是undefined

当我们 **声明一个变量** 但 **不给这个变量**赋值*时它的值就是undefined

```js
let a = undefined;
console.log(a + '123')      //undefined123  拼串
```

<br>

**注意:**  
数字和undefined进行运算的时候 结果会是 NaN

<br>

# 运算符: typeof
可以使用运算符typeof来检查 一个变量 的类型

<br>

## 格式:
```js
typeof 变量名

console.log(typeof a);
```

<br>

### 返回值: 小写类型字符串

- 检查字符串时: 返回 string
- 检查数字时: 返回 number
- 检查布尔时: 返回 boolean
- 检查null时: 返回 object
- 检查undefined: 返回 undefined

<br><br>

# 字面量
字面量是在源代码中一个固定值的表示法, 通俗来说, 就是字面量表示如何表达这个值

- 数字字面量: 8 9 10
- 字符串字面量: '黑马程序员'
- 布尔值字面量: true false

<br><br>

# 强制的类型转换:
指将一个数据类型强制转换为其他的数据类型  
类型转换主要指将其他的数据类型转换为 String Number Boolean (5种基本数据类型中的前三种 最后两种是null undefined)

<br>

### 场景:
使用表单, prompt获取过来的数据默认是字符串类型的, 此时就不能直接简单的进行加法运算, 需要转换变量的数据类型

**经常转换的3种类型:**  
- 转换为 字符串型
- 转换为 数字型
- 转换为 布尔型

<br><br>

## 转换为 String:

### 方式一: toString():
调用 ``目标.toString()`` 方法

<br>

**返回值: 字符串**  
该方法不会改变原变量的类型, **它会将转换的结果返回**
```js
let num = 1
let res = num.toString()

console.log(typeof num)   // number
console.log(typeof res)   // string

// 可以赋值回去
num = num.toString()
```

<br>

**注意:**
null和undefined这两个值没有toString()方法如果调用他们的方法会报错

<br>

### 扩展: Number类型数据.toString(进制数)
当我们调用 ``数字.toString(进制数)``, 可以在()中传递一个整数作为参数
它将会把数字转换为指定的进制, 如果不指定则 **默认转换为10进制**
```js
var a = 255;

// 将数字转换为二进制 11111111
a = a.toString(2);

console.log(a);
console.log(typeof a);
```

<br>

### 扩展: Buffer类型数据.toString("编码规则")
我们也可以调用 ``buf.toString("utf-8")`` 将buf转为utf-8格式的字符串

<br><br>

### 方式二: String(变量)
调用 String() 函数并将被转换的数据作为参数传递给函数  
使用String()函数做强制转换时对于Number和Boolean实际上就是调用的toString()方法 

<br>

**注意:**
1. 这种方式可以改变 null 和 undefined 这个类型
```js
let data1 = undefined
let data2 = null

data1 = String(data1)
console.log(data1, typeof data1)  // undefined string

data2 = String(data2)
console.log(data2, typeof data2)  // null string
```

2. String() 转换数组时 会去掉[] 数组中原有的元素以逗号的方式进行拼接
```js
// 1维数组 -> 字符串
let arr = [1,2,3]
arr = arr.toString()
console.log(arr)

arr = String(arr)
console.log(arr)    // 1,2,3


// 2维数组 -> 被展开了 成 字符串
let arr2 = [[1,2,3], [4,5,6]]
arr2 = String(arr2)
console.log(arr2)   // 1,2,3,4,5,6


// 利用 split() 再转为 1维数组
let ret = arr2.split(",")
console.log(ret)    // ['1', '2', '3', '4', '5', '6']
```

3. String()不能转换对象 它转换的对象为 [object Object]
```js
let obj = {name: "sam"}
obj = String(obj)
console.log(obj)    // [object Object]
```

<br>

### 方法三: 隐式转换 b = b + ""
利用任何值 和 字符串做加法运算时 都会先把该值转换为字符串然后再进行运算的原理
```js
b = b + "";
```

```js
let arr = [1, 2, 3]
let res = arr + ""
console.log(res)    // 1, 2, 3
```

<br>

# 转换为 Number


<br>

### <font color="#C2185">方式一</font>

<br>

### <font color="#C2185">parseInt(stringnumber, [进制])</font>
从一个字符串中 提取整数部分 并转换为Number类型
如果传递进制 stringnumber 被看成2进制进行解析到10进制 取值范围为2-36

```js
let str = "10"
let ret = parseInt(str, 2)
console.log(ret)   // 2

// 因为 10 会看成2进制 解析后展示10进制 2
```


<br>

### <font color="#C2185">parseFloat()</font>
从一个字符串中 包含小数部分 并转换为Number类型
使用上述两个方法可以将 一个字符串类型的数字 转换为 对应的 number类型结果


参数1:
要被转换的数字

参数2:
进制

```js
let str = "123"
let num = parseInt(str)
console.log(num)        // number 123

let str2 = "123.23"
let num2 = parseInt(str2)
console.log(num2)       // number 123 只会提取整数部分

num2 = parseFloat(str2)
console.log(num2)       // 123.23 包含小数部分的字符串被转为number

<br> 进制示例:
// 这是一个字符串接下来把它转成Number数据类型
var a = "070"
a = parseInt(a);

console.log(typeof a);
console.log(a);          // 70

// 所以为了统一我们可以在parseInt()中传递第二个参数 来指定数字的进制
a = parseInt(a, 8)       // 56
```


**注意:**
如果是对 非字符串类型 使用上述方法转换 它会先将其转换为String然后在操作
123:
number类型的123 - > 字符串类型的"123" - > 再通过pareseInt()



<br>

### <font color="#C2185">技巧</font>
可以使用 isNaN() 来对 parseInt() 和 parseFloat() 的结果做判断看看得到的结果合不合法
```js
let num = parseInt(prompt("请输入一个数字"))

if(isNaN(num)) {
  alert("您输入的数字不合法")
} else {
  console.log(num)
}
```

<br>


### <font color="#C2185">num.toPrecision(精度)</font>
参数:
精度, 也可以理解为 整数和小数一共保留多少位

返回值:
字符串

```js
let num = 12.3323232
num.toPrecision(2)
'12'
num.toPrecision(4)
'12.33'
num.toPrecision(6)
'12.3323'
```

数据处理时, 这两个函数很容易混淆。它们的共同点是把数字转成字符串供展示使用。注意在计算的中间过程不要使用, 只用于最终结果。

不同点就需要注意一下: 
toPrecision 
是处理精度, 精度是从左至右***个不为0的数开始数起。

toFixed 
是小数点后指定位数取整, 从小数点开始数起。

当你拿到 1.4000000000000001 这样的数据要展示时, 建议使用 toPrecision 凑整并 parseFloat 转成数字后再显示, 如下: 
```js
parseFloat(1.4000000000000001.toPrecision(12)) === 1.4 // True 


let num = 1.4000000000000001
let temp = num.toPrecision(12)

temp
'1.40000000000'

// 后面的0没有了
parseFloat(temp)
1.4
```

num.toPrecision(12)
这是一个经验的选择, 一般选12就能解决掉大部分0001和0009问题, 而且大部分情况下也够用了, 如果你需要更精确可以调高。


<br>

### <font color="#C2185">总结</font>
当我们遇到 浮点数的精度的问题的时候
1.4000000000000001
我们可以先通过 num.toPrecision(12) 指定 12
这样可以解决大多数的 0000001 的问题

得到的结果是
'1.40000000000'

然后我们再通过 parseFloat() 提取 这样提取的字符是没有0000的

1.4




补充:
parseFloat(字符串数字)
提取小数部分, 会省略掉00000
```js
let num2 = "12.22000"
parseFloat(num2)
12.22
```


<br>

### <font color="#C2185">方式二:   +(正)</font>
利用一元运算符 + -正号负号的运算方式可以把非Number类型的数据强制转换为Number
```js
var a = "123";
a = +a;
```

<br>


<br>

### <font color="#C2185">方式三:   - * /</font>
任何值- * / 运算时都会自动转换为Number, 所以我们可以用 -0*1/1的方式把它们转换为Number.
```js
var a = "123";
  a = true;
  a = false;
  a = " ";

a = a - 0;
```

<br>


<br>

### <font color="#C2185">方式四</font>
使用Number()函数它可以转换任意类型的数据

[]        转为 数字 是 0
''        转为 数字 是 0
null      转为 数字 是 0

*undefined {} 空函数 无法转为数字*

长度为1的数字数组 会被转化为该数字 十六进制   也能转化为数字

<br>


<br>

### <font color="#C2185">规则</font>

<br>

### <font color="#C2185">字符串``` 数字</font>
1. 如果是纯数字字符串则直接将其转换为数字           //var a = "123";
2. 如果字符串有非数字内容则转换为NaN               //var a = "12fff3";
3. 如果字符串中是空串或者全是空格的字符串值会是0     //var a = "" 或者 " ";



<br>

### <font color="#C2185">布尔``` 数字</font>
true    转成 1
false   转成 0



<br>

### <font color="#C2185">Null``` 数字</font>
结果是0



<br>

### <font color="#C2185">undefined``` 数字</font>
结果是NaN


**注意:**
1. null、空字符串""、空数组[]
  - 都可被Number() 合法的转为0

2. undefined、空对象{}、空函数等   
  - Number() 的结果是NaN

<br>

# 转换为 Boolean


<br>

### <font color="#C2185">方法一:  !运算</font>
利用逻辑运算中的 !运算 来对非布尔值进行运算会将会将其转化为布尔值让后进行取反 我们可以利用该特点来将一个其他的数据类型转换为布尔值

!!b

```js
let flag = 1
console.log(!flag)      // false
console.log(!!flag)     // true
```



<br>

### <font color="#C2185">方法二: Boolean()函数</font>
代表 空 否定的值会转换为false, 其它的都是true
``` 
// 代表 空 否定的值
0 null NaN undefined
```

```js
var a = 123;
a = Boolean(a);         //调用Boolean()函数来将a转换为布尔值

console.log(type a);    // "boolean"
console.log(a);         // true
```



<br>

### <font color="#C2185">规则</font>

<br>

### <font color="#C2185">数字``` 布尔</font>
除了0 和 Nan是false其余的都是true;


<br>

### <font color="#C2185">字符串``` 布尔</font>
除了空串是false其余的都是true


<br>

### <font color="#C2185">Null / undefined``` 布尔  都是false</font>


**注意:**
对象也会转换为true
```js
let obj = {name: "sam"}
if(obj) {
console.log(obj)
}
```

<br>-

# 运算符
运算符也叫作操作符通过运算符可以对一个或者多个值进行运算并获取运算结果
typeof就是一个运算符可以来获得一个值的类型它会将该值的类型以字符串的形式返回

<br>-

# 算数运算符: + - * / %


<br>

### <font color="#C2185">js中常用的运算符</font>
-   可以对两个值进行减法运算并 返回一个值
*   可以对两个值进行乘法并 返回一个值
/   可以对两个值进行除法并 返回一个值
%   取模运算(取余数) 9 % 3 = (9除以3取余数余数为0 结果: *0*)

<br>

**要点:**
1. a % b 的时候 如果 a < b 余数就是本身
```js
console.log(3 % 5)  // 3
```

2. 对 浮点数 进行运算 会有问题
```js
console.log(0.1 + 0.2)  // 0.30000000000000004
console.log(0.1 * 0.2)  // 0.020000000000000004
```

原因:
我们不管是做什么最终都会转为2进制的语言
小数已经很小了, 还要转换为2进制 让2进制再进行运算 这时候就会有误差 不仅仅是js java也一样


3. 不能拿着浮点数来进行比较
```js
let num = 0.1 + 0.2
console.log(num == 0.3)     //false
```


**注意:**
1. 算数运算符也有优先级 先乘除后加减, 有小括号先算小括号
2. 当对非Number类型的值进行运算时会将这些值转换为Number然后再运算(除了字符串的加法)
3. 任何值和NaN做运算都得NaN


4. 注意拼串
```js
// 如果对两个字符串进行加法运算 则会进行拼串
"123"+"456"      //  "123456"
```

<br>

# 递增 递减 运算符
如果需要反复给数字变量添加 或 减去1, 可以使用++ -- 运算符来完成
js中 递增 和 递减 既可以放在变量的前面, 也可以放在变量的后面

放在前面时, 我们称为前置递增(递减)运算符
放在后面时, 我们称为后置递增(递减)运算符

**注意:** 
递增和递减运算符必须和变量配合使用 num++



<br>

### <font color="#C2185">前置递增运算符 ++num (等于原变量自增后的值也就是*新值*)</font>
就是自加1, 类似num = num + 1
``` 
口诀:
先自加, 后返回值
```


<br>

### <font color="#C2185">后置递增运算符 num++ (等于原变量的值自增前的值也就是*原值*)</font>
前置自增 和 后置自增如果单独使用效果是一样的
先表达式返回原值, 后面变量再自加1, 也就是说变量永远比表达式大1
``` 
口诀:
先返回原值, 后自加
```

```js 
let num = 10;
num++;                      // 11
let result = num++ + 2;     // num++ 是11(原值), 11+2
console.log(result);        // 13

// num++ 单独使用都是自加1, 但是连在一起使用时, num++ + 2  -- >  num++代表的就是原值, 

---

let a = 10;
let b = a++ + ++a;
console.log(b);             //22    不是21

// a++为原值10 --- 这时变量a为11 --- ++a在新值12 --- 最后10+12
```

开发时, 大多使用后置递增, 并且代码独占一行

**注意:**
当 n 的值为 0 的时候 进行++ 是没有意义的 结果还是0
```js
let num = 0
console.log(num++)  // 0
```

<br>

# 比较运算符
两个数据进行比较时所使用的运算符
比较运算后, 会*返回一个布尔值作为比较运算的结果*

<
>
>=
<=
==      判等号(有隐式转换)  只要求值相等
      console.log(18 == '18');    //true

!=      不等号
===     全等 要求值和数据类型都一致
!==


**注意:**
非数值比较时会将其转换为Number类型然后再比较
NaN不和任和值相等包括它本身



<br>

### <font color="#C2185">总结</font>
1. 非数值比较时会将其转换为Number类型然后再比较
2. 任何值和NaN比较都是false
3. 如果符号两侧的值都是字符串时将比较 unicode 编码
``` 
字符串进行比较的时候
不会将其转换为Number进行比较
而会分别比较字符串中字符的Unicode编码可以用这种方式排序英文名
```
```js
console.log("a" < "b");
  //比较的是字符编码16进制小a是0061小b是0062

console.log("abc" < "b"); 
  //比较字符编码时是一位一位进行比较abc
  // 先同时比较左侧位 然后比较中间位(右侧没有中间位所以是false) 最后比较最后位 (如果第一位小 那么后面的也不用看了吧)
```

4. 比较中文时没有意义
*比较两个字符串的数字*可能会得到不可预期的结果*一定要把一个数字字符串转为Number类型*就可以正常比较了
```js
console.log("1123457654" < "5");    //正常结果是false

console.log("1123457654" < +"5");   //进行Number转换之后才是true
```

5. 注意 ==
比较两个值是否相等如果相等会返回true否则会返回false
当使用==来比较两个值时如果值的类型不同则会自动进行类型转换将其转换为相同的类型然后再比较

转换成什么不一定但大部分情况都会转换为数字
undefined 衍生自 null 所以这两个值做相等判断时会返回true



<br>

### <font color="#C2185">场景</font>
比如: 网购时的购物车可以填写购买的数量但这时候填写的都是字符串而非数字
这时候可能限制用户的购物量不能超过20, 不能超过最大库存这时候比较可能就会出现问题



<br>

### <font color="#C2185">扩展知识</font>
1. 任何对象转换为boolean值都为true
2. undefined null对应的boolean值为false
3. == 操作符不会尝试将左右操作数转换为boolean值后再进行比较

4. 如果 一个值为对象 另一个为数字或字符串 那么会
- 1. 将对象转换为原始值先使用 *valueOf()* 转化为原始值
- 2. 不能转换为原始值的再尝试使用 *toString()* 方法转换为原始字符串


>> 目标.valueOf()
该方法会将目标转换为基本类型, 如果无法转换为基本类型则返回原对象.
```js
let num = 123
console.log(num.valueOf())  // 123 因为可以转换为基本数据类型

let val1 = {name: "sam"}
console.log(val1.valueOf()) 
// 没有办法转换为基本数据类型 所以返回的是 { name: 'sam' }


// 对象 和 数字 进行比较
let val1 = {name: "sam"}
let val2 = 123
console.log(val1 > val2)    // false

// 1. 先将 val1 进行 valueOf() 转换 得到的是 {name: "sam"} 本身
// 2. valueOf()转换不了的会进行 toString() 得到的是 [object Object]
// 3. [object Object]转换为数字 会是 NaN 所以结果就是 NaN
```

<br>

# 逻辑运算符
作用:
用来进行布尔值运算的运算符

返回值:
布尔值

场景:
用于多个条件的判断


与  &&    and     true && false
或  ||    or      true || false
非  !     not     !true           
``` !非运算可以将其他数据类型转换为布尔 !!b```

<br>


<br>

### <font color="#C2185">与 &&</font>
两侧都为true 结果才是true 只要有一侧是false 结果就是false
``` 
3 > 5 && 3 > 2      //false
3 < 5 && 3 > 2      //true
```


<br>

### <font color="#C2185">或 ||</font>
两侧都为false 结果才是false 只要有一侧为true 结果就是true
``` 
3 > 5 || 3 > 2      // true
3 > 5 || 3 < 2      // false
```



<br>

### <font color="#C2185">非 !</font>
也叫作取反符, 用来取一个布尔值相反的值, 如: true的相反值就是false
如果对非布尔值进行运算则会将其转化为布尔值让后进行取反
我们可以利用该特点来将一个其他的数据类型转换为布尔值!!b
``` 
var b = 10;
b = !b;

console.log(typeof b);      //b = false
console.log(b);             //Boolean
```

<br>

# 短路运算(逻辑中断)
短路运算的原理: 当有多个表达式(值)时 也就是说:

表达式1 逻辑运算符 表达式2



<br>

### <font color="#C2185">逻辑与 的短路运算: 表达式1 && 表达式2</font>
如果第一个表达式的值为真, 则返回表达式2
如果第一个表达式的值为假, 则返回表达式1

技巧:
1. 有了你再用

```js
123 && 456                  // 456
0 && 456                    // 0
0 && 1 + 2 && 456*789       // 0 因为0是false后面的就不看了

// 如果有空 或者 否定的为假, 其余的都是真 0 null undefined NaN ''
```



<br>

### <font color="#C2185">逻辑或 的短路运算: 表达式1 || 表达式2</font>
如果第一个表达式的值为真, 则返回表达式1
如果第一个表达式的值为假, 则返回表达式2

技巧:
1. 有哪个用哪个

```js
123 || 456      // 123 第一个表达式为true返回表达式1
```



<br>

### <font color="#C2185">练习</font>
```js
let num = 0;
console.log(123 || num++);
console.log(num);           // 0 num++没有执行 逻辑中断了
```

<br>

# 赋值运算符
用来把数据赋值给变量的运算符


<br>

### <font color="#C2185">=         直接赋值</font>
- 可以将符号右侧的值赋值给符号左侧的变量eg: var a = 10


<br>

### <font color="#C2185">+= -=     加 减一个数后 再赋值</font>
a += 5 等价于 a = a + 5a变量增加5
a -= 5 等价于 a = a - 5a变量减5



<br>

### <font color="#C2185">*= /= %=  乘, 除, 取模后 再赋值</font>
a *= 5 等价于 a = a * 5a变量乘以5
a /= 5 等价于 a = a / 5a变量除以5
a %= 5 等价于 a = a % 5a变量除以5取余数  

a++ 等价于 a = a + 1

<br>

# 一元运算符
可以对一个其他的数据类型(任意值 string boolean 都可以)使用 + 
来将其转换为Number它的原理和Number函数一样


<br>

### <font color="#C2185">要点</font>
只需要一个操作数, 比如 ++num !num (2个操作数 2+3)


<br>

### <font color="#C2185">规则</font>
对于非Number类型的值先转成Number然后再运算


+ 正号 & - 正号不会对数值产生任何影响
```js
//我想通过一元运算符对String类型进行强制Number类型转换
let a = "18";       
a = +a;
console.log(typeof a, a + 1);   // number 19
```

```js
var a = 1 + "2" + 3;
console.log("a=" + a);        //结果是123

var a = 1 + +"2" + 3;
console.log("a=" + a);        //结果是6, 在字符串前添加了 “ + ”
```

负号      
负号可以对数字进行负号的取反
```js
let a = -18
console.log(a + 1)      // -17
console.log(-a + 1)     // 19
```

<br>

# 运算符的优先级

在js中有一个运算符优先级的表在表中越高上则优先级越高就会越优先计算
如果优先级一样则从左往右计算

1       小括号          ()
2       一元运算符      ++ -- !
3       算数运算符      先 * / % 后 + -
4       关系运算符      > >= < <=
5       相等运算符      == != === !==
6       逻辑运算符      先&& 后||
7       赋值运算符      =
8       逗号运算符      , 

``` 
逗号运算符:
使用, 可以分割多个语句一般可以在声明多个变量时使用. 
```


一元运算符里面 逻辑非 优先级很高　根据逻辑运算符来区分

```js
let c = 2 === '2'       
// ===的优先级比较高, 先看 2 === '2'    c的值是false

let d = !c || b && a
// !的优先级高
```

<br>

# 位运算符
位运算符是在数字底层(即表示数字的 32 个数位)进行操作的.
ES当中整数有两种类型, 所有的整数字面量默认都是有符号的整数

1. 有符号的整数(正数, 负数)
2. 无符号的正数(只允许正数)



<br>

### <font color="#C2185">有符号的整数</font>
符号位为最高位

符号位
(第31位)      -     (第0位)

符号位 = 0    -> 正数
符号位 = 1    -> 负数


ES中有两种不同的方式存储二进制形式的有符号整数
1. 用于存储负数
2. 用于存储正数

正数是以真二进制形式存储的前 31 位中的每一位都表示 2 的幂

(二进制数字的位数)
4位     3位     2位     1位     0位

2^4     2^3     2^2    2^1     2^0

比如:
1 1 1 1
8 4 2 1 = 15

1 0 1 0
8 0 2 0 = 10

技巧:
先看二进制对应的位数是0还是1 相当于开关 1就是打开开关 0就是关闭开关
如果是1 那对应的数就是2的几次幂(看在几位) 如果是0 那该位对应的就是0

```js
let num = 0b1010
console.log(num)    // 10

// 10进制的4 对应 2进制的多少
let num = 4;
console.log(num.toString(2));   // 100
```



<br>

### <font color="#C2185">负数</font>
10进制的负数也会存储为二进制代码, 不过采用的形式是二进制补码.
在计算机底层我们采用 负数的补码的方式 存储负数
``` 
-18 会使用-18的补码 在底层存储-18
```


<br>

### <font color="#C2185">计算数字二进制补码的步骤有三步</font>
1. 负数-18 去掉负号 找到18对应的二进制表示 - 原码
``` 
例如要计算 -18的二进制补码, 首先要确定 18 的二进制表示
要展示全的32位
```

2. 将1中拿到的原码 每位依次取反, 即要把 0 替换为 1 , 把 1 替换为 0   -- 反码
3. 在2中取得反码二进制数上加1

``` 
要确定 -18 的二进制表示首先必须得到 18 的二进制表示如下所示:
0000 0000 0000 0000 0000 0000 0001 0010

计算二进制反码
1111 1111 1111 1111 1111 1111 1110 1101

在二进制反码上加 1
1111 1111 1111 1111 1111 1111 1110 1101
                                      各位+1
1111 1111 1111 1111 1111 1111 1110 1110
```

**注意:**
1. 记住在处理有符号整数时开发者不能访问 31 位.
2. 负数的二进制显示 只是在该数字正数的2进制前加上-号
因为ES在显示负数的二进制的时候 并不以二进制补码的形式显示
而是用数字绝对值的标准二进制代码前面加负号的形式输出.例如:

```js
num = 4   // 100    二进制的显示
num = -4  // -100   二进制的显示
```

这是为避免访问位 31.
为了简便ECMAScript 用一种简单的方式处理整数使得开发者不必关心它们的用法.

<br>


<br>

### <font color="#C2185">位运算 NOT ~</font>
位运算 NOT 由否定号(~)表示
位运算 NOT 实质上是: *对数字求负(求反码)然后减1*

位运算 NOT 是三步的处理过程:
1. 把运算数转换成 32 位二进制数字
2. 把二进制数转换成它的二进制反码
3. 把二进制数转换成浮点数

```js
let num = 25    
console.log(~num)   // -26

1. 00000000000000000000000000011001
2. 11111111111111111111111111100110
3. 结果是-26
```

用下面的方法也可以得到同样的方法:

```js
let num = 18
let num2 = ~18
console.log(num2);  // -19

console.log(~20)    // -21

let num = -18
console.log(~num)   // 17 |  -18 + - = 18, 18 - 1 = 17
```


<br>

### <font color="#C2185">总结: 20的 ~运算 该数字的前面+ -号 再-1</font>
20 -> -20 - 1 = -21

<br>


<br>

### <font color="#C2185">位运算 AND    &</font>
位运算 AND 由(&)表示 
该运算是直接*对数字的二进制形式进行运算*.

规则:
两个两进制数 进行 & 运算 将两个2进制数对其 依次按位来比较 

它把每个数字中的数位对齐然后用下面的规则对同一位置上的两个数位进行 AND 运算:
*找1* 11为1 其它的是0
``` 
数字1中的数位	数字2中的数位	结果
1	            1	            1
1	            0	            0
0	            1	            0
0	            0	            0
```

比如:
要对数字 25 和 3 进行 AND 运算代码如下所示:

```js
let num = 25
console.log(num.toString(2));   // 11001

let num2 = 3
console.log(num2.toString(2));  // 11

let result = 25 & 3
console.log(result);    // 1
console.log(25 & 3)     // 1

11001
00011
00001
```

<br>


<br>

### <font color="#C2185">位运算 OR     |</font>
位运算 OR 由符号(|)表示
该运算是直接*对数字的二进制形式进行运算*.

在计算每位时OR 运算符采用下列规则:
*找0* 00为0 其它的是1
``` 
数字1中的数位	数字2中的数位	结果
1	            1	            1
1	            0	            1
0	            1	            1
0	            0	            0
```

比如:
要对数字 25 和 3 进行 OR (|) 运算代码如下所示:

```js
let num = 25
console.log(num.toString(2));   // 11001

let num2 = 3
console.log(num2.toString(2));  // 11

let result = 25 | 3
console.log(result);    // 27

11001
00011
11011 = 16 + 8 + 0 + 2 + 1 = 27
```

<br>


<br>

### <font color="#C2185">位运算 XOR    ^</font>
位运算 XOR 由符号(^)表示
该运算是直接*对数字的二进制形式进行运算*.

规则:
*找异*, 每位相比较不一样的为1 一样的为0

比如
对 25 和 3 进行 XOR 运算代码如下
```js
let num = 25
console.log(num.toString(2));   // 11001

let num2 = 3
console.log(num2.toString(2));  // 11

let result = 25 ^ 3
console.log(result);    // 26

11001
00011
11010 = 16 + 8 + 0 + 2 + 0 = 26
```

思考:
为什么当布尔类型的值进行 ^ 运算的时候 得到的是数字呢？
```js
let a = true
let b = false

let flag = a ^ b;
console.log(flag)       // 1

a = true = 1
b = false = 0

console.log(1 ^ 0)

0001
0000
0001    // 1
```

那是不是说 数字1 ^ 0 = 数字1 ？？

<br>


<br>

### <font color="#C2185">左移运算 << (左移运算保留数字的符号位)</font>
它把数字中的所有数位向左移动指定的数量 相当于 *扩大n倍*

**注意: 左移使用0补位** 
1. 扩展n倍 不是说直接 x number
比如 25 << 2 
不是 25 x 2
而是 25 扩大一倍后为 50 再扩大一倍后 100
也就是说 当我们想 x 的时候 x 2^n
也就是说 25 << 2 == 25 x 2^2

2. 在左移数位时数字右边多出 5 个空位.左移运算用 0 填充这些空位使结果成为完整的 32 位数字.


例如:
10 << 5 = 10 x 2^5
```js
// 2^5 = 2 x 2 x 2 x 2 x 2 = 32
console.log(10 << 5)    // 320
console.log(-2 << 5)    // -64
```



<br>

### <font color="#C2185">注意</font>
左移运算保留数字的符号位.
例如 如果把 -2 左移 5 位得到的是 -64而不是 64. “符号仍然存储在第 32 位中吗？”

是的不过这在 ECMAScript 后台进行开发者不能直接访问第 32 个数位. 即使输出二进制字符串形式的负数显示的也是负号形式 (例如-2 将显示 -10.) 

<br>


<br>

### <font color="#C2185">有符号右移运算    >></font>
有符号右移运算符由两个大于号表示(>>) 相当于 *缩小n倍 做除法*
它把 32 位数字中的所有数位整体右移同时保留该数的符号(正号或负号).
有符号右移运算符恰好与左移运算相反.例如把 64 右移 5 位将变为 2:

同样移动数位后会造成空位.这次空位位于数字的左侧但位于符号位之后.ECMAScript 用符号位的值填充这些空位创建完整的数字如下图所示:
```js 
num = 64            // 1000000
result = num >> 5   // 0000010

result = 2
```

<br>

# 编码
在ES中想用Unicode编码就是 
*\u四位编码编码为16进制*

在网页中想用Unicode编码就是 
*&#编码;* (编码为10进制)



<br>

### <font color="#C2185">&编码;</font>
正常是&开头;结尾
比如 &nbsp; 但要输入Unicode编码则要如下

使用转义字符 &#编码; 但这里的编码是需要10进制的可以打开计算机选择程序员转换 

<br>

# 语句
我们的程序是由一条一条语句构成的语句是按照自上向下的顺序一条一条执行的, 在JS中我们可以使用{}来为语句进行分组

同一个{ }中的语句我们称为一组语句它们*要么都执行要么都不执行*, 一个{ }中的语句我们也称为一个代码块

代码块
```js
{
  alert("");
  console.log("");
  document.write("");
}
```

<br>

# 流程控制
在一个程序执行的过程中, 各条代码的执行顺序对程序的结果是有直接影响的, 很多时候我们要通过控制代码的执行顺序来实现我们要完成的功能

简单理解:
流程控制就是来控制我们的代码按照什么结构顺序来执行

流程控制的三种结构:

顺序结构
分支结构
循环结构


  顺序结构        分支结构            循环结构     

  顺序执行        条件执行            循环执行
      ↓               ↓ 
      A             判 断                A   ←
      ↓               ↓                  ↓      ↑
      B           A       B            判 断    yes
      ↓           ↓       ↓              ↓



<br>

### <font color="#C2185">分支结构</font>
由上到下执行代码的过程中, 根据不同的条件, 执行不同的路径代码
执行代码*多选一*的过程, 从而得到不同的结果

if语句
switch语句



<br>

### <font color="#C2185">条件判断语句</font>
使用条件判断语句可以在执行某个语句之前进行判断, 如果条件成立才会执行语句不成立不执行


<br>

### <font color="#C2185">if语句 -- 语法一</font>
```js
if(条件表达式){
  语句 .....   
}
```


<br>

### <font color="#C2185">执行思路</font>
if语句在执行时会先对条件表达式进行求值判断
如果条件表达式的值为true  则执行if后的语句, 
如果条件表达式的值为false 则不会执行if后的语句 

要点:
if语句只能控制紧随其后的语句如果希望if语句可以多条语句可以将这些语句统一放入代码块中, if语句后的代码块不是必须的但在开发过程中尽量写上代码块 


```js
if(true)
  alert("你猜我出来么？");

var a = 10;
if(a > 10) {
  alert("a比10大");
  alert("谁也管不了我");
}

var a = 5;

//当想加入多个条件时可以用与运算只有两端同时都是true都满足时才会执行下面的语句
if(a > 10 && a <= 20){
  alert("a大于10并且小于等于20");
}
```

<br>


<br>

### <font color="#C2185">if...else语句 -- 语法二</font>
```js
if(条件表达式){
  语句...
} else {
  语句...
} 
```


<br>

### <font color="#C2185">执行思路:   </font>
if...else...语句: 当该语句执行时会先对我们if后的表达式求值判断
如果该值为true则执行if后的语句
如果该值为false则执行else后的语句
不管是if 还是 else 执行哪个整个结构都执行完毕
```js
var age = 50;
if(age >= 60) {
  alert("你已经60退休了");
} else {
  alert("你还得继续工作")
}
```



<br>

### <font color="#C2185">if...else if...else语句 -- 语法三</font>
多分支语句 就是利用多个条件来选择不同的语句执行, 得到不同的结果 多选1的过程
```js
if(条件表达式){
  语句.....
} else if(条件表达式) {
  语句.....
} else if(条件表达式) {
  语句.....
} else {
  语句.....
}
```


<br>

### <font color="#C2185">执行思路</font>
if...else if...else语句: 当该语句执行时会从上到下一次对条件表达式进行求值判断
如果求值结果为true则执行当前的语句
如果求值结果为false则继续向下判断
如果所有的条件都不满足则执行最后的else语句, 该语句中只会有一个代码块被执行一旦代码块被执行则直接结束语句
```js
var age = 50;
if(age > 100){
  alert("活着挺没意思的");
}else if(age > 80){
  alert("你也老大不小的了");
}else if(age > 60){
  alert("你退休了");
}else if(age > 30){
  alert("你已经中年了");
}else if(age > 17){
  alert("你已经成年了");
}else{
  alert("你还是个孩子")
}
```

<br>

# 三元表达式(二选一的过程)
由三元运算符组成的式子我们称为三元表达式 ? :


<br>

### <font color="#C2185">语法: 条件表达式 ? 表达式1 : 表达式2</font>
执行流程:
条件运算符在执行时首先对条件表达式进行求值

如果该值为真则执行 表达式1并返回执行结果
如果该值为假则执行 表达式2并返回执行结果

```js
条件表达式 ? 表达式1 : 表达式2   
  // 这个部分是一个表达式, 既然是表达式就会有返回值

let num = 10;
let result = num > 5 ? '是的' : '不是的';
console.log(result);    // 是的
```



<br>

### <font color="#C2185">场景</font>
动态给变量赋值

变量 = 表达式 ? 值1 : 值2

<br>

# 分支流程控制 --- switch 语句
switch语句也是多分支语句, 它用于基于不同的条件来执行不同的代码, 当要针对 @变量@ 设置一系列的特定值的选项时, 就可以使用switch语句


<br>

### <font color="#C2185">switch语句 语法</font>
```js
switch(条件表达式){
  case 常量:
      语句...
      //使用break可以来退出switch语句不会向下执行所有的case代码
      break;

  case 常量:
      语句...
      break;

  //如果没有case和switch全等的条件则会执行default后的语句
  default:                
      语句...
      break;
}
```


<br>

### <font color="#C2185">执行思路</font>
switch...case...语句
在执行时会依次将 case后的表达式的值 和 switch后的条件表达式的值 进行*全等比较*
如果比较结果为true(全等)则从当前case处开始执行代码
如果比较结果为false则继续向下比较
如果所有的比较结果都为false则只执行default后的语句

```js
// 当前case后的代码都会执行, 为了只执行一个case 可以在case后面跟上break 这样可以确保只会执行当前case的语句而不会执行其他的case后的语句
var num = 1;
switch(num){

  //先会看此处case值和switch条件表达式进行全等比较如果全等则输出下面代码
  case 1:                     
      console.log("一");

      //使用break可以来退出switch语句
      break;       

  case 2:
      console.log("二");
}
```


<br>

### <font color="#C2185">技巧</font>
开发时会把 switch(变量) 这么写
```js
// 将 switch 后面的表达式定义为 变量
let num = 3;

switch(num){
  // case后面的值为常量进行匹配
  case 1:
}
```



<br>

### <font color="#C2185">练习1</font>
对于成绩大于60分的输出 合格低于60分的输出 不合格

要点:
假如写具体的分数的话情况得从60-100都写上太长所以用除以10 变成 10种情况但是这么写的话只对整数才有意义, 所以应该对条件表达式里的结果取整
```js
var score = 60;

// switch(score/10){ ... }  

//利用parseInt来对结果取整
switch(parseInt(score/10)){        

  case 10:                       
  case 9:
  case 8:
  case 7:
  case 6:
      console.log("合格");
      break;
}
```


<br>

### <font color="#C2185">练习2</font>
水果价格查询

思路:
创建变量保存用户输入的水果名
将这个变量作为条件表达式
case后面的值写几个不同的水果名称 
``` 注意: 一定要加上引号, 因为是全等匹配```

弹出不同价格即可, 同样注意每个case之后加上break 以使退出switch语句
都没有就设置default

```js
let fruit = prompt("请输入要查询的水果名")

switch(fruit) {
case "苹果":
  alert("10元一斤")
  break

case "香蕉":
  alert("5元一斤")
  break

default:
  alert("没有您查询的结果")
}
```

<br>

# switch语句 和 if else if 区别
一般情况下, 他们两个语句可以相互替换的

switch语句通常在处理case为比较确定值的情况
if else语句更加的灵活, 常用语范围判断(大于等于某个范围)

switch语句进行条件判断后会直接执行到程序的条件语句, 效率更高
if else语句有几种条件, 就得判断多少次

分支比较少的时候 if else语句的执行效率比switch语句高
分支比较多的时候 switch语句的执行效率比较高 而且结构清晰

<br>

# 循环
在程序中, 一组被重复执行的语句称之为循环体, 能否继续重复执行, 取决于循环的终止条件 由循环体 和 循环终止条件 组成的语句 称之为循环语句


<br>

### <font color="#C2185">for循环</font>
重复执行某些代码, 通常跟计数有关系
在for循环中为我们提供了专门的位置用来放三个表达式:

- 1. 初始化表达式     通常用于作为计数器使用
- 2. 条件表达式       *当不满足条件表达式的时候会终止循环*
- 3. 更新表达式       每次循环最后执行的代码, 用于对初始化表达式进行更新


<br>

### <font color="#C2185">语法</font>
```js
for(1初始化表达式; 2条件表达式; 4更新表达式){
  3语句...
}
```

执行顺序: 1   2 3 4   2 3 4   2 3 4

执行流程:
1. 执行初始化表达式初始化变量 此处只会执行一次
↓
2. 执行条件表达式判断是否执行循环
  如果是true则执行循环  →   3.语句
  如果是false终止循环
↓
4. 执行更新表达式更新表达式执行完毕后继续重复
↓
2



<br>

### <font color="#C2185">while 和 for 的语法结构对比</font>
```js 
// 创建一个10次的while循环
var a = 0;                  //1 初始化表达式初始化一个变量
while (a < 10){             //2 条件表达式
  document.write(a++);    //3 更新表达式
}


// 把上面的while循环转换成for循环:
for (var a = 0; i < 10; i++){
  alert(i);
}
```



<br>

### <font color="#C2185">利用for循环重复执行不同的代码</font>
for循环可以重复执行不同的代码, 这主要是因为使用了计数器i的存在, 计数器i在每次循环过程中都会有变化

```js
for(let i=1; i<100; i++){
  console.log('这个人今年'+ i +'岁')
}

for(let i=1; i<=100; i++){
  if(i == 1){
      console.log('1岁了')
  }else if(i == 100){
      console.log('这个人shi掉了')
  }
}
```


<br>

### <font color="#C2185">总结</font>
我们可以利用到for循环了i的值, 用if判断语句来写的话 并不是会把for {...} 执行多少次, 而是只输出了 if 里 符合判断的的语句 会一起出来

<br>

# while循环:
语法:
```js
while(条件表达式){
  语句...(循环体)// 这里面要做 初始值的更新操作
}
```

执行流程:
while语句在执行时先对条件表达式进行判断
如果值是true  则执行循环体循环体执行完毕以后继续对表达式进行判断
如果值为true  则继续执行循环体以此类推
如果值为false 则终止循环

```js 
var n = 1;

//像这种将条件表达式写死的true的循环叫做死循环
while(true){            
  alert("n++");       

  //n等于10的时候再执行break                            
  if(n == 10){
      break;          
  }
} 
```

创建一个循环往往需要三个步骤
1. 创建一个初始化的变量
  var a = 0;

2. 再在循环中设置一个条件表达式
  while(a < 10)

3. 在定义一个更新表达每次更新初始化变量
  a++;

4. 终止条件
```js
var i = 0;

// i 小于 10 的时候 会进入到循环
while(i < 10){
  document.write(i++ + "<br />")
}


let message = prompt('你爱我么?');
while(message !== '我爱你'){
  message = prompt('你爱我么?');
}
```



<br>

### <font color="#C2185">do...while循环</font>
它是while语句的一个变体, 该循环会先执行一次代码块, 然后对条件表达式进行判断, 如果条件为真, 就会重复执行循环体, 否则退出循环

语法:
```js
do {
  循环体语句...
} while(条件表达式)
```

示例:
```js 
var i = 0;
do{
  document.write(i++ + "<br />")
} while(i < 10) 
```

执行流程
do...while语句在执行时会先执行循环体
循环体在执行完毕后再对while后的表达式进行判断
如果结果为true    则继续执行循环体执行完毕继续判断
如果结果为false   则终止

实际上这两个语句类似功能类似while是先判断再执行do是先执行后判断
区别为:
do...while可以保证循环体至少执行一次而while不行 

<br>

# break 和 continue 和 return


<br>

### <font color="#C2185">continue</font>
continnue关键字用于*立即跳出本次循环*, 继续下一次循环(本次循环中continue之后的代码就会少执行一次), 并不会结束整个循环.

注意:
continue只能在循环中使用不能出现在其他的结构中.
``` 
例如:
吃5个包子 第3个有虫子, 就扔掉第3个 继续吃第4个第5个包子
```


```js
for(let i=1; =<=5; i++){
  if(i==3){
      continue;
  }
  console.log(`我正在吃第${i}个包子`)
}

// 当i为3时, 会跳出本次循环的所有内容 不会输出console语句, 会直接跳到i为4
```


需求: 求1 - 100之间, 除了能被7整除之外的整数和
```js
let sum = 0;
for(let i = 0; i<=100; i++){

  // 跳出这个部分
  if(i%7 == 0){
      continue;
  }
  sum += i;
}
console.log(sum);
```

<br>


<br>

### <font color="#C2185">break</font>
关键字可以立刻退出最近的循环语句强制执行循环后面的语句不能用于if
退出整个循环
``` 
例如:
吃5个包子 吃到第3个发现里面有 半个虫子, 剩下的都不吃了
```

```js
for(let i = 0; i<=5; i++){

  if(i == 3){
      break;
  }
  console.log(`我正在吃第${i}个包子`)
}
```

break和continue语句只在循环和switch语句中使用.

<br>


<br>

### <font color="#C2185">label</font>
不是必须使用 label 可以定义为其它的名字


<br>

### <font color="#C2185">作用</font>
给for循环起了一个名字


<br>

### <font color="#C2185">语法</font>
label: for...


<br>

### <font color="#C2185">break 和 continue 都可以使用 lable</font>


<br>

### <font color="#C2185">示例</font>
if(...) break label
if(...) continue label

```js 
// 为这下面的for循环起了一个hello的名字
hello: for(i=0; i<5; i++){
  console.log("@外层循环" + i)

  for(j=0; j<5; j++){

      //看这里在break后输入了 我们为这个循环创建的名字 hello
      break hello;                  
      console.log("内层循环" + j)
  }
} 
```


<br>

### <font color="#C2185">return</font>
不仅可以退出循环, 还能够返回return语句中的值, 同时还可以结束当前的函数体内部的代码

<br>

# 数组简介:
数组是指一组数据的集合, 其中的每个数据被称为元素, 在数组中可以存放任意类型的元素, 数组是一种将一组数据存储在单个变量名下的优雅方式

内建对象
宿主对象
自定义对象

目前我们应用最多的都是内建对象和宿主对象

内建对象: 数组



<br>

### <font color="#C2185">数组(Array)</font>
数组也是一个对象 它和普通的对象功能类似也是用来存储数据的
不同的是普通对象是使用*字符串作为属性名*
而数组是使用*数字来作为索引操作元素的*, 在对象中称之为属性在数组中叫元素



<br>

### <font color="#C2185">索引</font>
用来访问数组元素的序号(数组下标从0开始)
数组的存储性能比普通对象要好在开发中我们经常使用数组来存储一些数据 
  
  正常对象是                           数组是

属性名 和 属性值                    索引(index) 和 值
name     孙悟空                     0             10

一个索引一个值 叫做一个 元素 arr[0] = 10;

<br>

# 数组的创建
js中创建数组有两种方式

1. 利用 new 创建数组
2. 利用数组字面量创建数组



<br>

### <font color="#C2185">创建数组: new Array()</font>
var arr = new Array();

**注意:**
使用typeof检查下数组的类型, 会返回object
```js
console.log(typeof arr);    // object
```



<br>

### <font color="#C2185">构造函数 初始化的方式</font>

创建指定长度的空数组
```js
var arr = new Array(number);
```

创建指定元素的数组
```js
var arr = new Array(el1, el2, el3);
```

创建数组时直接向里面添加了3个元素
使用构造函数的方式也可以在创建的时候就指定数组中的元素
可以将要添加的元素作为构造函数的参数来传递用逗号隔开 

如果()中只有一个整数值时, 创建一个长度为该整数值的数组
```js
let arr = new Array(5)
console.log(arr)    // [ <5 empty items> ]

let arr2 = new Array(1, 2, 3)
console.log(arr2)   // [ 1, 2, 3 ]
```



<br>

### <font color="#C2185">添加元素</font>
语法:
数组[索引] = 值
```js 
arr[0] = 10;
```



<br>

### <font color="#C2185">读取元素</font>
语法:
数组[索引];

注意:
如果读取不存在的索引他不会报错而是返回undefined 




<br>

### <font color="#C2185">数组的 length 属性</font>
length属性来获取数组的长度也就是*元素的个数*

语法:
数组.length

最大索引(index)+1 就是元素的个数
arr.length + 1  = 元素的个数

对于连续的数组可以获取数组的长度也就是元素的个数
```js
arr[0] = 10;
arr[1] = 20;
arr[2] = 30;
arr[3] = 40;
console.log(arr.length);    //4
```

但是对于非连续的数组会获取到最大的索引+1
```js
arr[0] = 10;
arr[1] = 20;
arr[2] = 30;
arr[3] = 40;
arr[10] = 90;
arr[30] = 100;

//[10, 20, 30, 40, empty × 6, 90, empty × 19, 100]
console.log(arr.length);   
``` 

注意:
非连续的数组 会把中间的地方给你空出来会留地方所以尽量不要写非连续的数组 



<br>

### <font color="#C2185">修改length, 也可以理解为修改数组的长度</font>
如果修改的length 大于 原长度 则多出的部分会空出来
如果修改的length 小于 原长度 则多出的元素会被删除

arr.length = 10;
arr.length = 3;

所以我们可以通过修改length来删除一些元素



<br>

### <font color="#C2185">向数组的最后一个位置添加元素</font>
语法:  
数组[数组.length] = 值;

```js
arr[arr.length] = 70;
arr[arr.length] = 80;
arr[arr.length] = 90;
```  

因为打印数组的length的值时 比最后元素所处的索引大1 比如最后一个索引是[3] 那么arr.length的值是就是4, 把这个length的值作为索引数的话 就是数组的最后

<br>


<br>

### <font color="#C2185">创建数组: 数组的字面量</font>

语法:
var arr = [];



<br>

### <font color="#C2185">数组的初始化</font>
使用字面量创建数组时可以在创建时就指定数组中的元素
var arr = [1,2,3,4,5,10]

在创建数组时同时向数组内添加了6个元素索引为1的值为1索引为2的值为2,.... 



<br>

### <font color="#C2185">数组内元素的类型</font>
可以是任意类型
arr = ["hello", 1, true, null, undefined]

1. 可以是对象
```js
var obj ={
  name:"孙悟空"
};

//向它最后添加一个元素是对象
arr[arr.length] = obj;      

//数组里放了3个对象
arr = [
  {name:"孙悟空"}
  {name:"猪八戒"}
  {name:"沙和尚"}
]  
```
                        

2. 可以是个函数
```js 
arr = [
  function(){},
  function(){},
  function(){}
]  
```


3. 可以是个数组, (这种数组叫做二维数组)
```js
arr = [[1,2,3], [3,4,5], [4,5,6]];
console.log(arr[0]);    // [1,2,3]
```


<br>

### <font color="#C2185">向数组中新增元素</font>
可以通过修改length长度 以及 索引号增加数组元素

<br>

# 数组的遍历

数组:
var arr = ["孙悟空","猪八戒","沙和尚"];

所谓的遍历数组就是将数组中所有的元素都取出来



<br>

### <font color="#C2185">方式1: 利用for循环来遍历数组中的元素.</font>
要点:
arr.length 统计数组的长度 (数组的长度是元素个数, 不要跟索引号混淆)
arr.length 可以*动态监测数组元素的个数*

遍历的思路:
数组里面的元素怎么取出来呢？
```js
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
```

我们看下0123都是索引吧, 都是从0开始的整数吧, 都是有规律的吧
arr是定的 最关键的是获取到索引

```js
for (i=0; i<10; i++) {
  //这是10次的for循环0-9的整数是不是跟我们的索引的数字是一样的
  console.log(arr[i]);      
}
```

写死了也不好, 假如我在数组中添加或者增减元素时还得同时改变i的值要不有的输出不出来, 所以写死了不好我们可以发现 当数组里面有4个元素的时候i < 4, 5个元素的时候i < 5, 所以我们能看出 这小于的是数组的长度, 所以我们要这么写

```js
for(i=0; i < arr.length; i++){
  console.log(arr[i]);
}
```

<br> 


<br>

### <font color="#C2185">arr.forEach(callback)</font>
数组的方法一般我们都是使用for循环去遍历数组, js中还为我们提供了一个方法来遍历数组
这个方法只支持ie8以上的浏览器,8以及以下的浏览器不兼容 

forEach方法需要一个函数作为参数

forEach(回调);
forEach(function(value, index, arr){ ... });

参数:
1. value:
就是当前正在遍历的元素  ----  孙悟空

2. index:
就是当前正在遍历的元素的索引  ----  0 1 2 3 4

3. arr:
就是当前遍历的数组  -----  整个数组里的内容

像这种函数由我们创建但是不由我们调用的我们称为回调函数浏览器调的回调函数是异步执行



<br>

### <font color="#C2185">执行原理</font>
我们数组中有几个元素函数就会执行几次每次执行时, 浏览器会将遍历到的元素以实参的形式传递进来我们可以来定义形参来读取这些内容

<br>

# 数组的方法(详解):
数组中的方法都定义在 Array原型对象身上 所以我们可以直接调用


<br>

### <font color="#C2185">arr.forEach(callback[, this])</font>

<br>

### <font color="#C2185">作用</font>
遍历数组


<br>

### <font color="#C2185">参数</font>
callback:
- 对数组中的每个元素 都会执行一遍回调

this
- 改变回调函数中的this指向
- function - 当中的this为winodw
- 箭头函数 - 当中的this为window

参数1的演示:
```js
let arr = [1,2,3]

arr.forEach(value => {
// 每一个元素都会执行这个回调操作
console.log(value)
})
```

参数2的演示:
```js
let arr = [1,2,3]
let obj = {name: "sam"}

arr.forEach(value => {
console.log(this)       // window
})

arr.forEach(value => {
console.log(this)       // {name: "sam"}
}, obj)
```


<br>

### <font color="#C2185">返回值</font>
undefined

**要点:**
1. forEach() 不可以链式调用
2. forEach() 会改变原数组
3. 数组中的有效值会触发回调 已删除或未初始化的元素会被跳过
```js
// 不会遍历 空元素
let arr = [1,3,,7]
arr.forEach(function(value) {
console.log(value)
})


// 每次循环 index 的顺序不会变 比如循环到第2次 那对应的index2的元素 会触发回调 即使元素被删除导致数组元素的位置发生了变化 那也是删除后的数组的index为2的元素 触发回调, 比如
let arr = ["one", "two", "three", "four"]

// 当元素为two的时候 删除数组中的第一个元素
arr.forEach((value,index,arr) => {
console.log(value)

if(value == "two") {

// 当value=two的是时候 本轮的index为1 下一轮的index为2
console.log("当前index为", index)   // 1
arr.shift()
}
})


["one", "two", "three", "four"]
↓
["two", "three", "four"]

// 也就是说 index 为 2 的时候 元素会是four three则会被跳过
```

4. forEach() 的退出 只能使用 抛出异常

5. 下面的使用方式是因为 this.containers 是node节点 它身上并没有forEach() 方法 所以用的下面的方式
一般情况下 我们都是通过 数组.forEach() 来使用的 如果前面的不是数组的话 就可以使用

Array.prototype.forEach.call()
```js
Array.prototype.forEach.call(this.containers, ($container) => {
this.setSwiper($container)
})
```


<br>

### <font color="#C2185">必要的知识点: 方法名.call()</font>
它可以传递一个对象 让该对象临时拥有前面指定的方法

*https://www.cnblogs.com/echolun/p/11544045.html*

<br>


<br>

### <font color="#C2185">arr.at(index)</font>
返回数组中的指定元素

参数:
索引, 正数从左往右(从0开始) | 负数从右往左(从-1开始)

返回值:
对应元素 如果匹配不到则为 undefined

```js
let arr = [1,2,3]
let item = arr.at(0)
console.log(item)       // 1


let arr = [1,2,3]
let item = arr.at(-1)
console.log(item)       // 3
```


<br>

### <font color="#C2185">兼容性</font>
ie 和 opera 不行

<br>


<br>

### <font color="#C2185">arr.concat()</font>
用于合并 两个 或 多个数组
将指定的数组 添加到 arr 数组中

参数:
数组和值 可以传递多个,  多个item之间使用 , 分割

返回值:
新数组 []

注意:
该方法属于浅拷贝 如果是引用类型的对象 那么引用对象被修改 对于原始数组和新数组之间都是可见的



<br>

### <font color="#C2185">示例</font>
连接两个数组: 两个数组中的元素会结合在一起
```js
let arr = [1,2,3]
let arr2 = [4,5,6]
let res = arr.concat(arr2)
console.log(res)    
// [1, 2, 3, 4, 5, 6]
```

连接的是二维数组
```js
let arr = [1,2,3]
let arr2 = [[4,5,6], ["a", "b", "c"]]
let res = arr.concat(arr2)
console.log(JSON.stringify(res, null, 2))

// [1,2,3, [4,5,6], ["a", "b", "c"]]
```


<br>

### <font color="#C2185">兼容性</font>
全部

<br>


<br>

### <font color="#C2185">arr.copyWithin(target[,start[,end]])</font>
复制数组中的一部分到同数组中的另一个位置 *不会改变原数组的长度*

参数:
target:
将数组的一部分复制到哪里
如果是负数 target将从末尾开始计算
如果指定的 target > arr.length 那么不会发生拷贝
如果指定的 target 在 start 之后 那么复制的序列将被修改以符合 arr.length

start:
开始复制元素的*起始位置*
如果为负数则从末尾开始计算
如果start被忽略则从0开始进行复制

end:
开始复制元素的*结束位置(不包括这个位置)*
如果为负数则从末尾开始计算
如果end被忽略该方法将会一直复制到数组结尾


返回值:
无, 对原数组进行操作


<br>

### <font color="#C2185">示例</font>
```js
let arr = [1, 2, 3, "a", "b", "c"]
arr.copyWithin(0, 3, arr.length)
console.log(arr)
// ['a', 'b', 'c', 'a', 'b', 'c']
```

<br>

### <font color="#C2185">↑解析</font>
将 abc 复制到数组开始的位置 
注意: 因为数组的长度不会发生变化 那么abc将会覆盖掉原数组当中的元素

<br>

```js
let arr = [1, 2, 3, "a", "b", "c"]
arr.copyWithin(-2)
console.log(arr)
// [1, 2, 3, 'a', 1, 2]
```

<br>

### <font color="#C2185">↑解析</font>
target为-2 则目标位 "b" 所在的位置
start为空 则从0开始复制全部
数组的长度不会发生变化 则只有 "b" "c" 会被替换成 1 2

<br>

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```

<br>

### <font color="#C2185">↑解析</font>
target为0, 目标位置为1所在的位置
start为3, 则从4开始进行复制
将4 5放到1 2的位置 1 2 会被覆盖掉



<br>

### <font color="#C2185">兼容性</font>
ie不支持

<br>


<br>

### <font color="#C2185">arr.entries()</font>
返回一个迭代器对象, 该迭代器对象可以使用 for...of 来进行遍历

*迭代器对象中每个元素是[index:value]组成的数组* 可以利用 iterator.next().value来进行获取

```js
let arr = ["a", "b", "c"]
let iterator = arr.entries()
```

iterator迭代器对象中有 next() 方法 用于获取迭代器对象中封装的 元素(entries封装的就是 kv)

```js
console.log(iterator.next())
// {value: Array(2), done: false

console.log(iterator.next().value)
// [0, "a"]
```


<br>

### <font color="#C2185">iterator.next()</font>
返回的是一个对象
```js
{
value: [index, value]   // 类型数组
done: boolean
}
```

value: 就是封装在迭代器对象中的 [index,value]
done:
用于指示迭代器是否完成 只有获取不到数据了才是 true
true代表已经完成迭代

**注意:**
```js
let arr = ["a", "b", "c"]
let iterator = arr.entries()

console.table(iterator.next())
// {value: [0, "a"], done: false}

console.table(iterator.next())
// {value: [1, "b"], done: false}

console.table(iterator.next())
// {value: [2, "c"], done: false}

console.table(iterator.next())
// {done: true}
```

我们上面能看到 数组中只有3个元素 当执行3遍 都是false
当执行第四遍 也就是 arr.length + 1 的时候 done为true

**当我们使用for i循环迭代器的时候为了保证取出所有的数据 循环次数要定义为arr.length+1**


示例:
将 [index:value] 整理到新数组中
```js
let arr = ["a", "b", "c"]
let iterator = arr.entries()

let newArr = []

for(let i=0; i<arr.length + 1; i++) {
// 获取 next 对象
let _iterator = iterator.next()

// 可以用来表示 遍历是否完成
console.log(_iterator.done)

// _iterator.done == false 的时候才是有值的
if(_iterator.done != true) {
newArr[i] = _iterator.value
}
}

console.log(newArr)
[
[0, 'a'],
[1, 'b'],
[2, 'c']
]
```

示例:
二维数组中的数组按小到大的顺序进行排序
```js
function sortArr(arr) {
var goNext = true;
var entries = arr.entries();
while (goNext) {
  var result = entries.next();
  if (result.done !== true) {
      result.value[1].sort((a, b) => a - b);

      // 这里修改为 true 是为了能够再次的进入到循环
      goNext = true;
  } else {
      // 当获取不到值了 改为false 就进不去循环了
      goNext = false;
  }
}
return arr;
}

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
sortArr(arr);


0:(2) [1, 34]
1:(5) [2, 3, 44, 234, 456]
2:(5) [1, 4, 5, 6, 4567]
3:(4) [1, 23, 34, 78]
```


<br>

### <font color="#C2185">↑要点</font>
以往我们在使用 while() 循环的时候 都是定义循环条件
这里可以利用 flag 来标识再次进入的循环条件可以！！！

<br>


<br>

### <font color="#C2185">简洁操作: for...of</font>
上面讲解的是如何使用 iterator 迭代器对象
iterator 迭代器对象 本身就可以通过 for of 来进行遍历 获取到的就是 next对象中的 value 对应的值

```js
let arr = ["a", "b", "c"]
for(let item of arr.entries()) {
console.log(item) // [0, "a"]
}
```


<br>

### <font color="#C2185">兼容性</font>
ie不支持


<br>

### <font color="#C2185">arr.values()</font>
数组当中的元素


<br>

### <font color="#C2185">arr.keys()</font>
数组当中元素对应的index

<br>


<br>

### <font color="#C2185">arr.every()</font>
数组中所有的元素都符合条件才会返回 true

只有数组中每个元素 都符合回调的测试返回true 则整体结果返回 true 只要一个元素返回false 则整体结果就会 fasle

参数:
callback
用来测试每个元素的函数, callback必须返回一个 boolean
- value
- index
- arr

返回值:
boolean

**注意:**
若传入一个空数组, 无论如何都会返回 true


示例:
检测数组中的所有元素是否都大于 10。
```js
let arr = [12, 54, 9, 130, 44]
let flag = arr.every(item => item > 10)
console.log(flag)   // false
```


<br>

### <font color="#C2185">兼容性</font>
ok

<br>


<br>

### <font color="#C2185">arr.some()</font>
数组中的元素只要有一个符合条件 就会返回 true

参数:
callback
- value
- index
- arr

返回值:
boolean

```js
let arr = [12, 54, 9, 130, 44]
let flag = arr.some(item => item > 10)
console.log(flag)   // true
```

示例:
```js
let arr = [];
data.some(function(value) {
// some方法返回的是布尔值 所以在内部可以这么写
// 如果用户输入的商品 和 当前产品的名称一样
if(value.pname === product.value) {

  console.log(value);     // 找到的数据

  // 但是返回的是一个对象, 我们上面定义的函数必须传递进去一个数组
  arr.push(value);

  // 如果找到就会返回true 必须这么写 现在就属于拿到这个数据了
  return true;
} 
});

// 把拿到的数据渲染到页面中
setData(arr);
```


<br>

### <font color="#C2185">兼容性</font>
ok

<br>


<br>

### <font color="#C2185">arr.fill(value[, start[, end]])</font>
用指定值 设置数组中的元素 也可以设置指定位置

参数:
value:
start:
起始索引, 默认值为0
如果start是个负数, 则start = length + start

end:
终止索引, 默认值为 this.length
如果end是个负数, 则end = length + end


返回值:
修改后的数组

**注意:**
arr不能是空数组

```js
let arr = [1, 2, 3]
let res = arr.fill("a")
console.log(res)    // [ 'a', 'a', 'a' ]


let arr = [1, 2, 3]
let res = arr.fill("a", 1)
console.log(res)    // [ 1, 'a', 'a' ]
```

<br>


<br>

### <font color="#C2185">arr.filter()</font>
根据回调函数中的 boolean 决定是否保留当前进行遍历的元素 将保留的元素作为新数组返回

常用于过滤(删除符合条件元素, 查找符合条件的元素)

参数:
callback
回调函数中需要返回布尔值

- value
- index
- arr

this

返回值:
新数组

示例:
返回大于10的元素
```js
let arr = [12, 5, 8, 130, 33]

let res = arr.filter(item => item > 10)
console.log(res)    // [ 12, 130, 33 ]
```


根据输入的信息 返回数组中对应的元素
```js
let fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']

const filterItems = query => {
// 字符串.indexOf() 方法 看看元素中的字符是否包含传入项
return fruits.filter(item => item.indexOf(query) > -1)
}

let res = filterItems("ap")
console.log(res)    // [ 'apple', 'grapes' ]
```


<br>

### <font color="#C2185">兼容性</font>
ok

<br>


<br>

### <font color="#C2185">arr.find()</font>
根据回调中返回的boolean 返回数组中满足条件的*第一个元素*

参数:
callback
回调函数中要返回 boolean

返回值:
符合条件则 返回 符合条件的第一个元素
否则为 undefined

示例:
```js
const inventory = [
{name: 'apples', quantity: 2},
{name: 'bananas', quantity: 0},
{name: 'cherries', quantity: 5}
];

let res = inventory.find(item => item.quantity == 2)
console.log(res)    // { name: 'apples', quantity: 2 }
```


<br>

### <font color="#C2185">兼容性</font>
ie不行

<br>


<br>

### <font color="#C2185">arr.findIndex()</font>
根据回调中返回的boolean 返回数组中满足条件的*第一个元素所在的index*

没有找到则为 -1

<br>


<br>

### <font color="#C2185">arr.includes()</font>
用来判断一个数组是否包含一个指定的值 
如果包含则返回 true, 否则返回 false

参数:
1. 指定值
2. fromIndex
如果为负值则安升序从 arr.length + fromIndex 开始搜索

返回值:
boolean

**注意:**
1. 0的值将全部视为相等
2. 使用 includes()比较字符串和字符时是区分大小写的。
3. 如果 fromIndex >= arr.length 则直接返回false 且不搜索该数组

<br>


<br>

### <font color="#C2185">arr.map()</font>
通过回调加工数组中的元素

参数:
callback

返回值:
新数组(一个由原数组每个元素执行回调函数的结果组成的新数组)

示例:
使用 map 重新格式化数组中的对象
```js
let arr = [
{key: 1, value: 10},
{key: 2, value: 20},
{key: 3, value: 30}
]

let res = arr.map(item => {
let obj = {}
obj[item.key] = item.value
return obj
})

console.log(res)
```

示例:
获取html结构中 被选中的表单项
```js
let nodes = document.querySelectorAll([type=checkbox]);

let res = [...nodes].map(item => item.value)
```

<br>


<br>

### <font color="#C2185">arr.reduce(callback, 初始值)</font>
对数组中的每个元素按序执行一个由您提供的 reducer 函数
每一次运行 reducer 会将先前元素的计算结果作为参数传入, 最后将其结果汇总为单个返回值。


<br>

### <font color="#C2185">参数</font>
callback
- preVal
- currentVal
- currentIndex
- arr


<br>

### <font color="#C2185">异常</font>
数组为空且初始值 initialValue 未提供。


<br>

### <font color="#C2185">返回值</font>
reduce() 方法会归纳一个结果 这个结果就是返回值
所以 reduce() 中的回调要 return 一个结果


<br>

### <font color="#C2185">场景</font>
汇总, 多个出来一个

**注意:**
第一次执行回调函数时, 不存在“上一次的计算结果”
如果需要回调函数从数组索引为 0 的元素开始执行, 则需要传递初始值()

否则, 数组索引为 0 的元素将被作为初始值, 这时候迭代器将从第二个元素开始执行(索引为 1 而不是 0)。



<br>

### <font color="#C2185">示例</font>
1. 求数组所有值的和
```js
let arr = [1,2,3,4,5]
let res = arr.reduce((pre, item) => pre + item, 0)
console.log(res)
```

2. 累加对象数组里的值
```js
let arr = [
{name: "sam", price: 400000},
{name: "erin", price: 250000},
]

let res = arr.reduce((pre, item) => pre + item.price, 0)
console.log(res)
```

3. 将二维数组转化为一维
```js
let arr = [[0, 1], [2, 3], [4, 5]]

let res = arr.reduce((pre, item) => {
// 方式1
return [...pre, ...item]

// 方式2
return pre.concat(item)

}, [])

console.log(res)
// [ 0, 1, 2, 3, 4, 5 ]
```

4. 计算数组中每个元素出现的次数
```js
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']

let res = names.reduce((pre, item) => {
if(pre[item]) {
pre[item]++
} else {
pre[item] = 1
}

return pre
}, {})

console.log(res)
```

5. 按属性对 object 分类
比如:
我们按照年龄来分类 将20岁的对象 放在一个数组中

```js
let people = [
{ name: 'Alice', age: 21 },
{ name: 'Max', age: 20 },
{ name: 'Jane', age: 20 }
];

{
20: [xx, xx],
21: [xx, xx]
}
```

整理:
```js
let people = [
{ name: 'Alice', age: 21 },
{ name: 'Max', age: 20 },
{ name: 'Jane', age: 20 }
];

/**
 * 
 * @param {*} arr 目标对象数组
 * @param {*} prop 指定按照什么属性来进行分组
 * @returns 
 */
const groupBy = (arr, prop) => {
return arr.reduce((pre, item) => {

// 将 age 的值取出来作为 对象中的 key
let key = item[prop]

// 如果pre对象中没有该属性名的话 进行初始化
if(!pre[key]) {
pre[key] = []
}

pre[key].push(item)

return pre
}, {})
}

let res = groupBy(people, "age")
console.log(res)

```



<br>

### <font color="#C2185">高级应用: 按顺序运行 promise</font>
利用了 then() 方法中 return 的传递 形成了 promise链


<br>

### <font color="#C2185">要点</font>
1. p1 p2 f3 p4 相当于 在定义 then() 中的回调 也就是怎么处理 then() 中的 resolve出来的结果
```js
function test(x) {
console.log(x)
}

// 下面就是在定义 then() 的回调
runPromise(10).then(test)
runPromise(10).then(x => console.log(x))
```

2. p1 p2 f3 p4作为then()的回调 相当于在then中renturn, 那么return的结果会被包装为一个promise在下一个then()中接收到 相当于形成了一个 promise链

```js
function p1(a) {
return new Promise((resolve, reject) => {
resolve(a * 5)
})
}

function p2(a) {
return new Promise((resolve, reject) => {
resolve(a * 2)
})
}

function f3(a) {
return a * 3
}

function p4(a) {
return new Promise((resolve, reject) => {
resolve(a * 4)
})
}


// 定义 汇总 promise链
function runPromiseSequence(promiseArr, input) {
return promiseArr.reduce((promise, fn) => {

// 参数 promise 是初始值 Promise.resolve的结果 也就是说在它的then中可以拿到 resolve出来的结果

// 方式1:
return promise.then(fn)

// 方式2:
return promise.then(res => {
return fn(res)
})

// 该值作为 promise初始值 会被下一个promise then中接收
}, Promise.resolve(input))
}

// 将上面的 promise 整理成一个数组
let promiseArr = [p1, p2, f3, p4]

runPromiseSequence(promiseArr, 10).then(res => {
console.log(res)  // 1200
})
```

<br>


<br>

### <font color="#C2185">arr.flat(num)</font>
当数组中有*嵌套数组*的时候 用于扁平化数组的操作

参数:
1: 拉平2层嵌套  (默认值)
2: 拉平2层嵌套
3: 拉平3层嵌套

```js
let arr = [1,2,3,[4,5,6]]
let res = arr.flat()
console.log(res)    // [ 1, 2, 3, 4, 5, 6 ]


// 当有2层嵌套的时候 不传递参数 则[7,8,9]打不开
let arr = [1,2,3,[4,5,6, [7,8,9]]]
let res = arr.flat()
console.log(res)
// [ 1, 2, 3, 4, 5, 6, [ 7, 8, 9 ] ]
```

**注意:**
如果数组中有空项 则会移除掉该空项(不包括空字符串)
```js
let arr = [1,2,,5]
let res = arr.flat()
console.log(res)  // [1,2,5]
```


<br>

### <font color="#C2185">兼容性</font>
ie不行

<br>


<br>

### <font color="#C2185">arr.flatMap()</font>
该方法只能用于 1维数组 使用方式类似 map()
也可以通过回调来加工每一个元素
但是如果加工结果是2维数组的话 会自动拉成一维数组

也就是说 在map()的同时直接拉平

参数
callback

返回值:
新数组

示例:
使用map()的效果 
将每一个元素加工成一个数组
```js
let arr = [1,2,3]

let res = arr.map(item => {
return [item * 2]
})
console.log(res)
// [ [ 2 ], [ 4 ], [ 6 ] ]
```

使用 flatMap() 的效果
结果自动被拉平了
```js
let arr = [1,2,3]

let res = arr.flatMap(item => {
return [item * 2]
})
console.log(res)
// [ 2, 4, 6 ]
```

场景1:
我们在使用 str.split() 的时候 会将字符串按照规则切割成数组 那么就会产生下面的效果 结果是一个二维的

需求:
将每一个单词收集到数组中

使用 map() 的效果: 结果是一个二维数组
```js
let arr = ["This is a new technology stack", "", "vue"]

// 将每一个单词收集到数组中
let res = arr.map(item => {
return item.split(" ")
})

console.log(res)

[
[ 'This', 'is', 'a', 'new', 'technology', 'stack' ],
[ '' ],
[ 'vue' ]
]
```

使用 flatMap() 的效果 跟上面的map()一样 但是结果会拉平二维数组
```js
let arr = ["This is a new technology stack", "", "vue"]

let res = arr.flatMap(item => {
return item.split(" ")
})

console.log(res)
// [ 'This', 'is', 'a', 'new', 'technology', 'stack', '', 'vue' ]
```

<br>


<br>

### <font color="#C2185">arr.push()</font>
将一个或多个元素添加到数组的末尾, 并返回

参数:
直接写数组元素

返回值:
该数组的新长度。

示例:
合并两个数组
```js
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables);
// ['parsnip', 'potato', 'celery', 'beetroot']
```

<br>


<br>

### <font color="#C2185">arr.pop()</font>
从数组中删除最后一个元素, 并返回该元素的值 一次删除一个
*对数组的末尾进行操作*

参数:
没有参数

返回值:
删掉的元素
当数组为空时返回undefined


示例:
删除掉数组的最后一个元素
```js
const arr = ['Fire', 'Air', 'Water'];

let res = arr.pop()
console.log(res)  // Water
console.log(arr)  // [ 'Fire', 'Air' ]
```


<br>


<br>

### <font color="#C2185">arr.unshift()</font>
在数组前面添加多个元素    
参数:
- 直接写数组元素

返回值:
- 新的长度(可以创建变量 接收这个方法的返回值)

是否影响原数组:
- yes

<br>


<br>

### <font color="#C2185">arr.shift()</font>
删除数组中的第一个元素, 一次删除一个
对数组的前面进行操作

参数:
没有参数

返回值:
删掉的元素
如果数组为空则返回undefined

是否影响原数组:
yes

示例:
shift() 方法经常用于 while loop 的环境中.。下例中每个循环将要从一个数组中移除下一项元素, 直至它成为空数组
```js
var names = ["Andrew", "Edward", "Paul", "Chris" ,"John"];

while( (i = names.shift()) !== undefined ) {
console.log(i);
}
// Andrew, Edward, Paul, Chris, John
```

<br>


<br>

### <font color="#C2185">arr.slice()  </font>
提取指定元素 返回新数组

参数:
开始索引(包括): 默认值为0
``` 
可以为负值, 则表示从原数组中的倒数第几个元素开始提取, slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素(包含最后一个元素)。 
```

结束索引(不含)


是否影响元素组:
no

返回值
新数组

示例:
```js 
let arr = [1, 3, 5]
let res = arr.slice(0, 2)
console.log(res)    // [ 1, 3 ]
```

利用 slice() 方法 提取数组中的 3 4
```js
let arr = [1,2,3,4,5]

// slice() 方法要求传递的是 开始索引 和 结束索引 元素3 4所处的索引是 -3 和 -2
let res = arr.slice(-3, -1)

console.log(res)    // [3, 4]
```



<br>

### <font color="#C2185">技巧</font>
提取一个元素:
两个参数为相邻:  0 1 和 1 2 和 2 3

负数为数组的末尾开始数 倒数第一个元素为 -1

<br>


<br>

### <font color="#C2185">arr.splice()</font>
可以删除(插入 替换)数组中的指定元素并将被删除元素作返为回值返回

参数:
1. 开始位置(包含)
2. 删除几个
3. 传递新的元素会插在开始索引的前面

返回值:
删掉的元素(删除的元素也是在一个数组当中)

是否影响原数组:
yes


<br>

### <font color="#C2185">技巧</font>
1. 我们经常会从数组中删除一个指定的元素 那就需要知道该元素在数组中的索引值

所以我们会使用 indexOf() 方法 它会返回该元素的索引值
```js 
let arr = [1, 3, 5]
let index = arr.indexOf(3)

arr.splice(index, 1)
```

2. 删除指定元素:
第一个参数决定位置 第二个参数为1就是删一个

3. 插入元素
第二个元素为0(代表不删)第一个元素决定插入位置(前面)
``` 
从头插入新的元素 arr.splice(0,0,"新的元素")  
```    

4. 替换元素:
可以删除的同时添加新元素就起到了替换的效果 
原位置替换
```js
var result = arr.splice(0,1,"新插入的元素");
console.log(result);
console.log(arr);
```

<br>


<br>

### <font color="#C2185">arr.join()</font>
将一个数组(或一个类数组对象)的所有元素连接成一个字符串
如果数组只有一个项目, 那么将返回该项目而不使用分隔符。

参数:
指定连接数组元素的符号

默认情况下使用 , 进行分割
```js
const arr = ['Fire', 'Air', 'Water'];

let str = arr.join()
console.log(str)    // Fire,Air,Water
```

如果传递空字符串则 元素会连接在一起
```js
const arr = ['Fire', 'Air', 'Water'];

let str = arr.join("")
console.log(str)    // FireAirWater
```

返回值:
字符串
如果 arr.length == 0, 则返回空字符串。


**注意:**
如果一个元素为 *undefined 或 null*, 它会被转换为*空字符串。*



<br>

### <font color="#C2185">技巧</font>
这个方法可以将2维数组 直接转换成字符串
```js
let arr = [[1,2], [3,4]]
let res = arr.join()        // 1,2,3,4
```

<br>


<br>

### <font color="#C2185">arr.toString()</font>
把数组转换为字符串, 逗号分隔每一项

参数:
貌似没有

返回值:
转换后的字符串

是否影响原数组:
no

```js
let arr = [1, 3, 5]
console.log(arr.toString())
// 1,3,5
```

<br>


<br>

### <font color="#C2185">arr.reverse()</font>
翻转数组
该方法用来反转数组前边的去后边后边的去前面

参数:
没有

返回值:
没有

是否影响原数组:
yes

示例:
```js
let arr = ["a", "b", "c"]
arr.reverse()
console.log(arr)    // [ 'c', 'b', 'a' ]
```

颠倒类数组中的元素
类数组的要点:
1. 属性名为 index
2. 对象中要有 length 属性

```js
const a = {
0: 1, 
1: 2, 
2: 3, 
length: 3
};

Array.prototype.reverse.call(a)
console.log(a)
// { '0': 3, '1': 2, '2': 1, length: 3 }
```

<br>


<br>

### <font color="#C2185">arr.sort()</font>
排序
可以用来对数组中的元素进行排序

默认顺序
将元素转换为字符串, 然后比较它们的 unicode

参数:
回调

返回值:
没有

是否影响原数组:
yes
  
**注意:**
如果是单位还可以, 双位会出现问题
默认按照unicode编码进行排序
```js
let arr = [3,4,2,11,5]      
console.log(arr.sort())
// [ 11, 2, 3, 4, 5 ]

// 11在最前面了 即使对于纯数字的数组排序使用sort排序也会按照unicode排所以对数字, 进行排序时可能会得到错误的结果 
```



<br>

### <font color="#C2185">sort(function(a, b){ return a-b or b-a})</font>
我们可以在sort()中添加一个回调函数来指定排序规则
回调函数需要定义两个形参

- 浏览器会根据回调函数的返回值来决定元素的顺序

如果返回一个大于0的值则会交换位置
如果返回一个小于0的值则元素位置不变
如果返回一个等于0的值则认为两个元素相等位置也不变

return a-b;     升序排列          
return b-a;     降序排列



<br>

### <font color="#C2185">定义排序规则</font>
我们可以自己指定排序的规则
```js
var arr = [5,4,2,1,3,6,8,7];
arr.sort(function(a,b){
if(a>b{
  return 1;

}else if(a<b){
  return -1;
  
}else{
  return 0;
})
});

console.log(arr);
```

**注意:**
1. 元素数组为字符串的时候
方式1:
我们可以直接使用 sort()

方式2:
我们可以按照 字符串的length进行排序 但是 字符一样的时候 没办法
(a, b) => a.length - b.length

方式3:

<br>

### <font color="#C2185">str1.localeCompare(str2)</font>
如果 str1 < str2 则返回-1
如果 str1 > str2 则返回 1
如果相当 则返回0 

```js
arr.sort((a, b) => {
return b.localeCompare(a)
})
```

vue里
```js
<li><button @click="changeSort(true)">升序</button></li>
<li><button @click="changeSort(false)">降序</button></li>

data() {
return {
  list: ["abc", "zan", "bde", "cdf"],
}
},

changeSort(flag) {
flag
  ? this.list.sort((a, b) => a.localeCompare(b))
  : this.list.sort((a, b) => b.localeCompare(a))
} 
```

<br>


<br>

### <font color="#C2185">arr.indexOf()     根据元素 返回索引</font>
通过给定元素数组中查找给定元素的第一个索引

参数:
1. 元素(数组中元素的整体)

2. fromIndex
开始查找的位置
如果 fromIndex >= arr.length 则直接返回 -1
如果 fromIndex 为负数 则从最后一个元素开始也就是 -1的位置

**注意:**
如果 fromIndex 为负值 并不改变其查找顺序, 查找顺序仍然是从前向后查询数组

返回值:
给定元素所在的索引, 如果不存在则返回 -1

示例:
```js
var arr = [2, 5, 9];

let index = arr.indexOf(2)
console.log(index)  // 0

index = arr.indexOf(7)
console.log(index)  // -1

// 因为从-1的位置开始查找的话 找不到2
index = arr.indexOf(2, -1)
console.log(index)  // -1
```

示例:
查找指定元素出现的所有位置
```js
let arr = ['a', 'b', 'a', 'c', 'a', 'd'];
let subscripts = []

// 先确定 指定元素的起始位置
let index = arr.indexOf("a")

while(index != -1) {
// 每次先推到下标数组中
subscripts.push(index)

// 更新index的位置
index = arr.indexOf("a", index + 1)
}

console.log(subscripts)
```

判断一个元素是否在数组里 不在则更新
```js
let veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];

function updateView(arr, item) {

// 证明元素不在数组中
if(arr.indexOf(item) == -1) {
// 元素不在数组中则推进去
arr.push(item)

// 证明元素在数组中
} else if(arr.indexOf(item) > -1) {
// 元素在数组中则做对应的操作
console.log("一些操作")
}
}
```

<br>


<br>

### <font color="#C2185">arr.lastIndexOf()     根据元素 返回索引</font>
通过给定元素数组中查找给定元素的第一个索引
*从后往前查找*(从 fromIndex 开始) 

返回值:
如果存在返回索引号, 如果不存在则返回-1
找到的结果索引 还是从左往右数的结果

参数:
1. 被查找的元素
2. fromIndex
从此为止开始逆向查找 默认值: arr.length - 1

示例:
```js
var arr = [2, 5, 9, 2]

let index = arr.lastIndexOf(2)
// 因为是从后往前查找 所以首先返回的是最后的2
console.log(index)  // 3
```

<br>


<br>

### <font color="#C2185">Array.from()</font>
将一个类数组或可迭代对象创建新的数组
比如:
我们可以传递 节点 或者 字符串 或 可迭代对象(Map Set)

参数:
1. arrLike
2. mapFn
3. this

示例:
将 String 生成数组
```js
Array.from('foo');
// [ "f", "o", "o" ]
```

将 Set 转成数组
```js
let set = new Set(["a", "b", "c"])
console.log(set)
//  Set(3) { 'a', 'b', 'c' }

set = Array.from(set)
console.log(set)
// [ 'a', 'b', 'c' ]
```

将 Map 转成数组
```js
const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([['1', 'a'], ['2', 'b']]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];

```

数组去重合并
```js
function combine() {
// [ [ 1, 2, 3 ], [ 2, 3, 5 ] ] 整合到一起
// 方式1:
let arr = [...arguments].flat()

// 方式2:
let arr2 = [...arguments].reduce((pre, item) => {
return [...pre, ...item]
}, [])

// 方式3:
let arr3 = [].concat.apply([], arguments)

// 进行去重
return Array.from(new Set(arr))
}

let arr = [1,2,3]
let arr2 = [2,3,5]

combine(arr, arr2)
```


<br>

### <font color="#C2185">兼容性</font>
ie不行

<br>


<br>

### <font color="#C2185">Array.of()</font>
根据传入的参数 创建数组

```js
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]


// 这里和 构造函数 创建数组的方式不同
new Array(7);          // [ , , , , , , ]
```

<br>


<br>

### <font color="#C2185">Array.isArray()</font>
判断传递的值是否是一个数组

返回值:
boolean

```js
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array('a', 'b', 'c', 'd'))

// 鲜为人知的事实: 其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype);

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray(new Uint8Array(32))
Array.isArray({ __proto__: Array.prototype });

```

**注意:**
当检测 Array 实例时, Array.isArray 优于 instanceof, 因为 Array.isArray 能检测 iframes。
```js
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
const arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true

// 被认为是有害的, 因为不能通过iframes来工作
arr instanceof Array; // false
```

<br>

# forEach() 和 some()的区别


<br>

### <font color="#C2185">要点</font>
1. 在forEach中return不会终止迭代
2. 在some中return true 会终止迭代
some()一定要写return true 意思是找到元素就不要继续遍历了, 如果写false说明没有找到这个元素 会一直往下去找
```js
let arr = ['red', 'green', 'blue', 'pink'];
arr.forEach(function(value) {
  if(value == 'green') {
      console.log('找到了该元素');

      // 想到找元素后就退出
      return true;        // 在forEach中return不会终止迭代
  }

  console.log(11);        // 依然输出了3次
})


arr.some(function(value) {
  if(value == 'green') {
      console.log('找到了该元素');

      // 想到找元素后就退出
      // 在some里面遇到return true就会终止遍历 迭代效率更高
      return true;        
  }

  console.log(11);        // 没有输出
})
```


<br>

### <font color="#C2185">filter是满足条件的所有元素放入到一个新数组里面</font>
那filter能不能 return true来终止循环呢?
filter和forEach一样的 遇到return true不会终止循环

<br>

# 对象(具体的事物)
现实生活中, 万物皆对象, *对象是一个具体的事物*, 看得见摸得着的实物, 例如. 一本书, 一辆汽车, 一个人, 都可以是对象, 一个数据库, 一张网页, 一个与远程服务器的链接也可以是对象

``` 
非对象      对象
明星        周星驰

女朋友      迪丽热巴
班主任      咱班班主任

苹果        这个苹果
手机        小米手机
游戏        刺激战场

左列都是泛指的 右列才是具体的事物
```

js中的对象, 是一组无序的相关属性 和 方法的集合, 所有的事物都是对象, 例如:字符串, 数值, 数组, 函数等



<br>

### <font color="#C2185">对象是由 属性 和 方法 组成的</font>
属性: 事物的特征, 在对象中用属性来表示(常用名词)
方法: 事物的行为, 在对象中用方法来表示(常用动词)

``` 
大小, 颜色, 重量                打电话, 发短信, 玩游戏

              手机
属性                            方法
```



<br>

### <font color="#C2185">为什么需要对象</font>
保存一个值的时候, 可以使用变量, 保存多个值(一组值)时, 可以使用数组, 如果要保存一个人的完整信息(体重 身高 年龄)
```
数组也可以但是结构不清晰, 比如let arr = [128, 134] 这是什么? 
``` 

js中的对象表达结构更清晰, 更强大
```js
let sam = {
  age:128,
  height:154,
  sex:
  address
}
```



<br>

### <font color="#C2185">js中的数值类型</font>
String
Number
Boolean
Null
Undefined
``` 
以上的五种为基本数据类型以后我们看到的值只要不是上面的5种都是对象 
```

Object



<br>

### <font color="#C2185">基本数据类型的不足</font>
基本数据的类型都是单一的值, 值和值之间没有任何的联系但如果在js中表示人的信息
比如:姓名 性别 年龄(如果用基本数据类型怎么表示)

  var name = "孙悟空"
  var gender = "男"
  var age = 18
  
基本数据类型也能表示人的信息但是他们之间没有关系互相都是独立的并不是一个整体, 
但将这三个数据放到一个塑料袋里就成为一个整体了塑料袋就是对象

装在一起好处: 关系明确方便操作


**对象属于一种复合的数据类型在对象中可以保存多个不同数据类型的属性**



<br>

### <font color="#C2185">对象的分类</font>
1. 内建对象
由ES标准中定义的对象在任何的ES的实现中都可以使用
比如:
Math String Number Boolean Function Object

2. 宿主对象
由JS的运行环境提供的对象目前来讲主要指由浏览器提供的对象
比如: BOM(浏览器对象模型) DOM(文档对象模型)

3. 自定义对象
由开发人员自己创建的对象这个最难从这个开始学习

<br>

# 变量, 属性, 函数, 方法的区别

<br>

### <font color="#C2185">变量和属性的相同点</font>
都是存储数据的


<br>

### <font color="#C2185">变量和属性的不同点</font>
变量:
单独声明并赋值 使用的时候直接写变量名 (单独存在)

属性:
在对象里面 不需要声明, 使用的时候必须是 *对象.属性*



<br>

### <font color="#C2185">函数和方法的相同点</font>
都是实现某种功能, 某件事



<br>

### <font color="#C2185">函数和方法的不同点</font>
函数:
单独声明, 并且调用的时候 函数名() (单独存在)

方法:
在对象里面 调用的时候 对象.方法()



<br>

### <font color="#C2185">创建对象的方式: 对象字面量 创建对象</font>
里面的属性或方法我们采取键值对的形式, 

键: 属性名(String),  值: 属性值

多个属性或者方法中间用逗号隔开的 方法冒号后面跟的是一个匿名函数

```js
let obj = {
  uname: '张三疯',
  age: 18,
  sex: '男',

  sayHi: function() {
      console.log('hi~');
  }
};
```

**注意:**
使用对象字面量可以在创建对象时直接指定我们对象中的属性
属性名可以加引号也可以不加但属性名太怪的话要加上 引号
```js
let obj = {
  'default-name': "sam"
}
```



<br>

### <font color="#C2185">使用对象</font>
调用对象的属性, 采取 . 我们理解为 xx的xx属性

对象名.属性名
对象名[属性名]


调用对象的方法, 别忘记添加小括号

对象名.方法名();

<br>


<br>

### <font color="#C2185">创建对象的方式: new Object()</font>
构造函数是专门用来创建对象的函数, 使用typeof检查一个对象时会返回object

```js
// 使用new关键字调用的函数是构造函数constructor
var obj = new Object();     // 创建了一个空对象
```



<br>

### <font color="#C2185">添加属性</font>

<br>

### <font color="#C2185">语法: 对象.属性名 = 属性值;</font>

```js
var obj = new Object();

obj.name = "孙悟空"; 
obj.gender = "男";
obj.age = 18;
```

我们是利用 等号 = 赋值的方法 添加对象的属性和方法
每个属性和方法之间用分号结束



<br>

### <font color="#C2185">读取对象属性</font>

<br>

### <font color="#C2185">语法: 对象.属性名</font>

```js
obj.name;
obj.gender;
obj.age;

obj.sayHi();

// 如果读取对象中没有的属性不会报错而是返回undefined
console.log(obj.name);
```



<br>

### <font color="#C2185">修改属性</font>

<br>

### <font color="#C2185">语法: 对象.属性名 = 新值</font>
```js
obj.name = "tom";
```


<br>

### <font color="#C2185">删除对象属性</font>

<br>

### <font color="#C2185">语法: delete obj.name</font>


```js
// 如果输出:
console.log(say)    //会是一个对象
console.log(say())  //会是内部语句产生的结果
  
// 如果函数内部没有return输出时, 会是内部语句产生的结果+undefined 
console.log(say())
```

<br>


<br>

### <font color="#C2185">创建对象的方式: 使用工厂方法创建对象</font>
工厂方法可以大批量创建对象

```js
function creatPerson(name, age, gender){

  // 在函数内部创建一个新的对象
  var obj = new Object();

  // 创建完新的对象后向我们的新对象添加属性 
  obj.name=name;
  obj.age=age;
  obj.gender=gender;

  obj.sayName=function(){
      alert(this.name);
  }

  // 将新的对象返回
  return obj;
}

var obj2 = creatPerson("孙悟空",18,"男");      
var obj3 = creatPerson("白骨精",16,"女");      
var obj4 = creatPerson("蜘蛛精",18,"女"); 
```


<br>

### <font color="#C2185">利用工厂函数创建的对象的区别</font>
使用工厂方法创建的对象使用的构造函数都是Object, 所以创建的对象都是Object这个类型就导致我们无法区分出不同类型的对象

<br>

# 构造函数 与 原型
class的概念是es6的时候提出的, 在以前的时候我们是通过构造函数 和 原型来做的

在典型的OOP的语言中(java), 都存在类的概念, 类就是对象的模板, 对象就是类的实例, 但是在es6之前 js中并没有引入类的概念

es6是2015年的时候发布, 但是目前浏览器的js是es5版本, 大多数高版本的浏览器也支持es6, 但是只不过实现了es6的部分功能

在es6之前, 对象不是基于类创建的, 而是用一种称为构造函数的特殊函数来定义对象和他们的特征
``` 
面向对象的主要思路
就是把公共的部分抽取出来 抽成一个类 通过这个类来创建对象
```


<br>

### <font color="#C2185">创建对象可以通过以下的3种方式</font>
1. 对象字面量
2. new Object()
3. 自定义构造函数

<br>


<br>

### <font color="#C2185">创建对象的方式: 构造函数(通过类的实例化创建对象)</font>
前面的两种方式创建对象时, 一次只能创建一个对象, 里面很多的属性和方法是大量相同的, 我们只能复制, 因此可以利用函数的方法, 重复这些相同的代码, 我们就把这个函数称为 构造函数

为什么是构造函数? 里面封装的不是普通的代码, 而是对象
构造函数封装的是一个对象 所以才叫构造函数？？？？？？？ 卧槽



<br>

### <font color="#C2185">构造函数</font>
是一种特殊的函数, *主要用来初始化对象*, 即为对象成员变量赋初始值 它总与*new运算符一起使用*, 把我们对象里面一些相同的属性 和 方法抽象出来封装到函数里面


<br>

### <font color="#C2185">要点</font>
调用构造函数必须使用 new 类名()
我们只要new Star() 调用函数就创建一个对象



<br>

### <font color="#C2185">书写格式</font>
构造函数的首字母要大写
构造函数不需要 return 就可以返回结果

```js
function 构造函数名() {
  // this可以理解当前的意思 表示是哪个对象
  this.属性 = 值;
  this.方法 = function() {};
}

// 使用的使用要用new
let intance = new 构造函数名();
```

示例:
这里就相当于把公共部分抽取了出来, 然后通过实例来创建对象
```js 
function Star(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.sing = function(sang) {
      console.log(sang)
  }
};

let ldh = new Star('刘德华', 18, '男');
ldh.sing('冰雨');
```


对象的属性值可也是任何的数据类型, 能是对象也能是函数
``` 
函数也可以成为对象的属性
如果一个函数作为对象的属性来保存 那我们称这个函数是这个对象的方法

调用函数就是说调用对象的方法(method), 但是它只是名称上的区别没有其它的区别 
```


<br>

### <font color="#C2185">new 关键字执行过程</font>
1. 当我们构造函数遇见new时候 会在内存中创建一个空的对象
2. this都会指向这个空的对象
3. 执行构造函数里面的代码, 给这个空对象添加属性 和 方法
4. 返回这个对象, new的最后会返回这个对象, 所以就不需要return了

<br> 


<br>

### <font color="#C2185">类中的: 静态成员 实例成员</font>
js的构造函数中可以添加一些成员

成员:
构造函数中的属性和方法我们叫成员, 成员可以添加, 因为构造函数的本质就是一个对象 所以叫做添加成员

可以在构造函数本身上添加, 也可以在构造函数内部的this上添加, 通过这两种方式添加的成员, 就分别称为*静态成员和实例成员*



<br>

### <font color="#C2185">静态成员</font>
在构造函数本身添加的成为成为静态成员, 只能由构造函数本身来访问
也就是通过 
类名.属性 = xx
类名.方法 = xx

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  
  // 内部添加静态成员
  Person.address = '中国';
}

let per1 = new Person('sam', 18)
console.log(Person.sex)

// 外部添加静态成员
Person.sex = '男';
```


<br>

### <font color="#C2185">要点</font>
1. 在构造函数内部 也可以添加 静态属性和方法 但是这种添加方式必须要 new Person() 之后才能调用 不然就是undefined
在外部添加的成员 不用 new Person() 就可以直接调用

2. 静态成员只能通过构造函数来访问
```js
console.log(Person.sex)
```

3. 不能通过实例对象来访问
```js
console.log(ldh.sex)   // undefined
```

<br>


<br>

### <font color="#C2185">实例成员</font>
在构造函数内部创建的对象成员称为实例成员, 只能由实例化的对象来访问

就是构造函数内部通过this添加的成员
this.属性 = xx
this.方法 = xx
``` 
构造函数中的name age sing就是实例成员 他们都是通过this来添加的 
添加到new时创建的实例对象身上
```


<br>

### <font color="#C2185">要点</font>
1. 实例成员只能通过实例化对象后 通过实例化的对象来访问
```js
let ldh = new Star("刘德华", 18, "冰雨")
console.log(ldh.name)
```

2. 实例成员不能通过构造函数来访问
```js
console.log(Star.name)     // undefined
```

<br>


<br>

### <font color="#C2185">在构造函数(类)中 给实例对象添加 固定死的数据</font>
es5
```js
function Father() {
this.name = "张三"
}
```

es6
```js
class Father {
name = "张三"
}
```



<br>

### <font color="#C2185">在构造函数(类)中 给实例对象添加 动态数据</font>
如果需要通过 实例对象的实参传递数据的话
es5
```js 
function Father(name, age) {
  this.name = name
  this.age = age
}
```

es6
```js 
class Father {
  constructor(name) {
      this.name = name
      this.age = age
  }
}
```

<br>


<br>

### <font color="#C2185">构造函数的问题</font>
构造函数方法很好用, 但是存在浪费内存的问题
```js
function Star(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.sing = function(sang) {
      console.log(sang)
  }
};

let ldh = new Star('刘德华', 18);
let zxy = new Star('张学友', 19);
```


<br>

### <font color="#C2185">解析</font>
当创建第一个实例对象的时候 new就开辟了一个空间name age sex还好简单的数据类型 

但是 sing是个函数 函数也是对象 也就是说 它还要单独开辟一个空间用来存放这个函数对象

zxy的实例对象也是一样需要单独开辟一个存放函数对象的空间, 而且, 这两个空间还是同一个功能的函数对象, 这就是浪费内存的问题

ldh.sing === zxy.sing   // false   

因为比较的是内存地址, 说明每一个空间都是独立的 这样不好吧 因为功能是一样的, 你还单独开辟空间

<br>


<br>

### <font color="#C2185">构造函数原型 prototype</font>
构造函数通过原型, *原型上的属性和方法都是所有实例对象所共享的*

js规定, 每一个构造函数都有一个prototype属性, 指向另一个对象, 注意这个prototype就是一个对象, 这个对象的所有属性和方法 都会被构造函数所拥有

我们可以把那些不变的方法, 直接定义在prototype对象上, 这样所有的对象的实例都可以共享这些方法

```js
function Star(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
};

// 向构造函数的原型对象上添加方法
Star.prototype.sing = function(sang) {
  console.log(sang);
}

ldh.sing('冰雨');
```

**原型对象的主要作用就是共享方法 不需要开辟新的内存空间 节约资源**


一般情况下, 
公共属性定义到构造函数里面
公共的方法我们放到原型对象上



<br>

### <font color="#C2185">示例</font>
要点:
即使是原型对象上的公共方法我们也可以向其传递参数
原型对象中的方法中的this 仍然指向实例对象
```js
function Person(name, age) {
this.name = name
this.age = age
}

Person.prototype.say = function(content) {
console.log(this.name + ": " + content)
}

let p = new Person("sam", 18)
p.say("加油！")
```

<br>


<br>

### <font color="#C2185">实例对象身上的 __proto__</font>
实例对象都会有一个属性 __proto__指向构造函数的prototype原型对象,之所以我们对象可以使用构造函数prototype原型对象的属性和方法, 就是因为实例对象有__proto__原型的存在

```js
p.__proto__ == Person.prototyp  // true
```

当我们实例化对象的时候 系统会自动在实例对象身上添加 __proto__ 属性 指向 构造函数(类).prototype 原型对象


**__proto__对象原型和原型对象prototype是等价的**



<br>

### <font color="#C2185">方法的查找规则</font>
首先先看实例对象身上有没有sing方法, 如果有就执行这个对象上的sing方法
如果没有sing这个方法, 因为有__proto__的存在, 就去构造函数原型对象身上去查找sing这个方法

**__proto__ 不能赋值, 它只是指明了一条可以查找的线路**

<br>


<br>

### <font color="#C2185">constructor 构造函数</font>
对象原型(__proto__)和构造函数(prototype)原型对象里面都有一个属性 constructor属性, constructor我们称为构造函数, 因为它指回构造函数本身
``` 
实例对象__proto__
构造函数prototype
      它们都指向了 构造函数本身
```


<br>

### <font color="#C2185">原型对象中constructor属性(es5)的作用</font>
constructor主要用于记录该对象引用于哪个构造函数, 它可以让原型对象重新指向原来的构造函数

```js 
// 这样能看的更明确一切
console.log(Person.prototype.constructor)
// [Function: Person]
console.log(p.__proto__.constructor)
// [Function: Person]
```


**注意:**
如果我们是以对象的形式修改了prototype的话(进行了对象的赋值操作), 我们必须手动的把constructor修改回去

示例:
我们可以把一些公共的方法放到原型对象里面, 所以里面的方法可能不只有一个

```js
Star.prototype.sing = function() {
console.log('我会唱歌')
}

Star.prototype.movie = function() {
console.log('我会演电影')
}

// 这时候 constructor指向的还是原来的构造函数 Star
console.log(Star.prototype.constructor);
console.log(ldh.__proto__.constructor);
```

这么添加的方法的话 还是有些麻烦, 为什么不用对象的方式创建它们呢? 对象的结构比较清晰
```js
Star.prototype = {
  sing: function() {
      console.log('我会唱歌')
  }, 
  movie: function() {
      console.log('我会演电影')
  }
}

// 此时指向的就不是原来的构造函数了, Object
console.log(Star.prototype.constructor);    
console.log(ldh.__proto__.constructor);
```

原因:
Star.prototype是一个对象, 如果是通过 . 的形式 就是在这个对象里面添加新的方法 

但是如果是Star.prototype = { }
相当于把原先的给覆盖掉了, 覆盖后里面就没有constructor这个属性了 要是没有constructor的话就没办法指回Star了 这时候我们就要手动的指回去, 这样

我们要再在原型对象中 添加 constructor 属性 值为 构造函数
```js
Star.prototype = {


constructor: Star //手动添加


sing: function() {
  console.log('我会唱歌')
}, 
movie: function() {
  console.log('我会演电影')
}
}
```

<br>


<br>

### <font color="#C2185">构造函数(类) 实例对象 原型对象 三者之间的关系</font>

          Star.prototype
Star构造函数        ---- >          Star原型对象
↓                              prototype
              < ----           
      Star.prototype.constructor
↓                                 ↑

      通过new创建了               ↗
      ldh实例对象         ldh.__proto__

<br>

# ES6中的类和对象
面向对象更贴近我们的实际生活 可以使用面向对象描述现实世界事物, 但事物分为具有的事物和抽象的事物
``` 
比如 抽象的(泛指的):    手机        它是一个类别
    具体的(特指的):    我的手机    就是有具体的
```


<br>

### <font color="#C2185">面向对象的思维特点</font>
抽取(抽象)对象共用的属性和行为组织(封装)成一个类(模板)
对类进行实例化, 获取类的对象
面向对象编程 我们考虑是有哪些对象, 按照面向对象的思维特点 不断的创建对象, 使用对象, 指挥对象做事情
``` 
比如:
首先我们把手机的公共的行为和属性抽取出来, 封装为一个模板 这个模板里面有我们共用的属性和方法 手机都可以打电话发短信 手机有屏幕尺寸和重量之类的

根据这个类(模板) 生产出很多对象  
```


<br>

### <font color="#C2185">类 class</font>
在es6中新增加了类的概念, 可以使用class关键字声明一个类, 之后以这个类实例化对象
类抽象了对象的公共部分, 它泛指某一大类(class)
对象特质某一个 通过类实例化一个具体的对象



<br>

### <font color="#C2185">创建 类</font>
语法:
```js
class name {
  // classbody
}
```

示例:
创建一个明星类
```js
class Star {

}
```



<br>

### <font color="#C2185">实例化对象</font>
```js
new Star()
```


<br>

### <font color="#C2185">es6 实例化对象传参</font>


<br>

### <font color="#C2185">constructor 构造函数 </font>
有了它就可以传递参数了
constructor()方法是类的构造函数(默认方法), 用于传递参数 返回实例对象, 有了它就不用return了 

通过 new 命令生成对象实例时, 自动调用该方法, 如果没有显示定义, 类内部会自动给我们创建一个constructor()


<br>

### <font color="#C2185">使用方法</font>
```js
class Star {
constructor(形参uname) {
  this.uname = uname;
}
}

let ldh = new Star('刘德华');
```

只要用new创建的实例 就会自动调用constructor函数
实参(刘德华) 传递给 形参uname, 形参uname会把刘德华传递给this.uname
this指向的是ldh这个创建的实例


**注意:**
1. 通过class关键字 创建类 类名我们还是习惯定义首字母大写
2. 类里面有个constructor函数, 可以接受传递过来的参数, 同时返回实例对象

3. constructor函数只要new生成实例时, 就会自动调用这个函数, 如果我们不写这个函数, 类也会自动生成这个函数

4. 生成实例 new 不能省略
5. 最后注意语法规范, 创建类 类名后面不要加小括号, 生成实例, 类名后面加小括号, 构造函数不需要加function



<br>

### <font color="#C2185">总结</font>
```js
class Star {

// 我们使用constructor构造函数来传递参数, 它会返回实例对象
constructor(name, age) {
  // 这里注意 因为constructor中的属性会返回给实例对象, 所以必须要用this动态的指回实例对象
  this.name = name;
  this.age = age;
}
};

// 通过new来生成实例对象时, 会自动调用constructor方法
let ldh = new Star('刘德华', 18);
console.log(ldh);
```



<br>

### <font color="#C2185">class - 方法</font>
直接将函数写在Star类中就可以了
不需要写function关键字
在类里 多个函数 方法之间不需要添加逗号分隔 不需要写 ,
```js
class Star {
// 传递参数用的
constructor(name) {
  this.name = name;
}

// 方法直接写在class部分里,写在这里, 在这里所有的函数不需要加 function 关键字
say() {
  console.log(this.name+'你好')
}
}

ldh.sing();     // 也可以传递参数
```



<br>

### <font color="#C2185">class - 继承 extends</font>
在程序里 子类可以继承父类的一些属性 和 方法
使用 extends 关键字

```js
// 创建 父类
class Father {
  constructor() {

  }

  // 创建一个方法 等着别的类过来继承
  money() {
      console.log(100)
  }
}

// 创建一个子类
class Son extends Father { 

}

let son = new Son();

// 使用extends后就可以继承到父类中的方法
son.money();
```



<br>

### <font color="#C2185">用父类型中的方法, 使用子类型中的参数怎么办?</font>
```js
class Father {
  constructor(x,y) {
      this.x = x;
      this.y = y;
  }

  sum() {
      console.log(this.x + this.y);
  }
}

class Son extends Father { 
  // 孩子需要传递参数 所以
  constructor(x,y) {
      this.x = x;
      this.y = y;
  }

}

let son = new Son(1,2);
son.sum();      // 报错了

/*
原因很简单, 我们本意是想把1 2传递给父类中调用父类的方法输出3

但是 我们传递进去的参数只能传递到自己类的constructor里
那么怎么才能做到呢?
*/
```


<br>

### <font color="#C2185">Super 关键字</font>
super关键字用于访问和调用对象父类上的函数 可以调用父类的构造函数, 也可以调用父类的普通函数
```js
class Father {
  constructor(x,y) {
      this.x = x;
      this.y = y;
  }

  sum() {
      console.log(this.x + this.y);
  }
}

class Son extends Father { 
  
  constructor(x,y) {
      // 这里就不要写this.x = x了, 直接调用super关键字
      super(x, y);  // 调用了父类中的构造函数
      
      /*
          相当于把父类中的构造函数内容粘贴到了这里 this指向还是父类的
          使用super()方法 调用了父类型中的constructor中的属性, 数据以 
              实参 --- 
                  子类型constructor中的形参x,y --- 
                      传递给super(x,y) --- 
                          传递给父类型中干的constructor中的 x,y
      */

  }

}

let son = new Son(1,2);
son.sum(); 
```
执行流程:
let son = new Son(1,2); 

我们传递了实参 实参会传递到子类中的constructor(x,y) 形参里 然后子类的构造函数里调用了super(x,y) 然后又把得到的实参传递给了super里的形参 super里的形参又链接着父类的构造函数, 所以就能变相的访问到了 父类构造函数中的数据



<br>

### <font color="#C2185">继承中的属性或者方法查找原则: 就近原则</font>
继承中 如果实例化子类输出一个方法, 先看之类有没有这个方法 如果有就先执行子类的
继承中 如果子类里面有, 就去找父类有没有这个方法 如果有 就执行父类的这个方法



<br>

### <font color="#C2185">通过super关键字 在子类中可以调用父类中的方法</font>
```js
class Father {
  say() {
      return '我是爸爸'
  }
}

// 这样子类就继承了父类的属性和方法
class Son {  

  say() {
      return '我是儿子';
  }
}

let son1 = new Son();
son1.say();     //我是儿子


// 调用父类中的方法
class Son extends Father {
  say() {

      // 通过super关键字调用了父类中的say
      console.log(super.say())
  }
}
let son1 = new Son();
son1.say();     // 我是爸爸
```



<br>

### <font color="#C2185">还有一种情况 儿子继承了爸爸的方法, 但是儿子自己还有新方法</font>
需求: 子类继承父类加法的方法, 同时 扩展减法的方法
```js
// 父类
class Father {
  constructor(x,y) {
      this.x = x;
      this.y = y;
  }

  sum() {
      console.log(this.x + this.y);
  }
}

// 子类
class Son {
  constructor(x,y) {
      this.x = x;
      this.y = y;
  }
  // 定义个减法的方法 这个减法是儿子独有的
  subtract() {
      console.log(this.x - this.y);
  }
}
let son = new Son(5, 3);

// 不继承的时候 正常使用到了子类中的减法
son.subtract();     // 2

// 子类继承父类加法的方法
class Son extends Father {
  constructor(x,y) {
      // 因为this的指向是不同的, 各自指向各自的类 这里利用super关键字调用父类的构造函数

      // 一定要在this的上方 
      super(x,y)

      this.x = x;
      this.y = y;
  }
}
let son = new Son(5, 3);
son.subtract();     // 2
son.sum();          // 8 
```


<br>

### <font color="#C2185">总结</font>
当使用extends后 既可以使用父类中的方法, 又可以使用子类中的方法
但是 super(x, y), 一定要在子类constructor中的参数的最前面

**注意:** 
super必须在子类的构造函数中的this之前, 也就是说必须要先调用父类的构造方法 再使用子类的构造方法

``` 
执行流程:
首先 先把5 和 3 传递给 子类中的构造函数 开始的this指向子类内部, 这样我们子类的减法可以拥有形参 

然后通过super调用了父类中的构造函数 相当于通过这个中介 把实参5 3传递了给父类构造函数中 再调用父类中的sum
```

<br>

# 类和对象 在使用时的三个注意点

1. 在es6中类没有变量提升, 所以必须先定义类, 才能通过类实例化对象
2. 类里面的共有的属性和方法一定要加this使用, 说白了就是构造函数里都要加this

3. 类里面this指向的问题
``` 
constructor里面会有this
  -- 主要的作用是创建实例, this指向的就是这个创建出来的实例

类的方法里会有this
  -- 方法里面的this 是看谁调用了这个方法, this就是谁 这里ldh调用了这个方法
```


<br>

### <font color="#C2185">总结</font>
constructor里面的this指向实例对象, 方法里面的this指向这个方法的调用者
``` 
我们想用别的部分的this 可以把this存到全局变量that
我们输出that
```

```js
class Star {
  constructor(name, age) {
      this.name = name;
      this.age =age;

      this.sing(); // 写在这里的一定要加this
      --2--
      // 如果我把sing()方法写在constructor里面, 那么用new来创建实例的时候会自动调用该方法

  }

  // --1-- 如果方法写在类了 需要通过实例来手动调用比如ldh.sing()
  sing() {
      console.log(this.name)
  }
}

let ldh = new Star();

--1--
ldh.sing();
// 如果是 --2-- 是不需要这么调用了 因为new的原因会自动调用方法
```


<br>

### <font color="#C2185">我们做个按钮点击后 再调用sing()的案例</font>
```js
class Star {
  constructor(name, age) {
      this.name = name;
      this.age =age;
      this.btn = ducument.querySelector('button');
      this.btn.onclick = this.sing;
      // 这里不要加() 要不new下就自己调用了 我们要点击后再调用
  }

  sing() {
      console.log(this.name)
  }
}
```

首先我们要获取button, 因为用new调用时, 会自动执行constructor里面代码 所以我们把获取btn的动作写在构造函数里面 同时btn属于哪个对象的 ldh吧 所以前面要加上this 绑定点击事件的时候 不能直接写btn.onclick 也是 我们要知道哪个按钮被点击了this.btn.onclick

<br>

# 超哥版: 原型对象 - prototype
我们所创建的每一个函数我们的解析器都会向函数中添加一个属性prototype 每一个函数都有自己的prototype



<br>

### <font color="#C2185">prototype作用</font>
这个属性对应的对象就是原型对象
在函数对象中有一个属性属性指向着原型对象每个函数都用而且都是不一样的 



<br>

### <font color="#C2185">图解</font>
Myclass函数.         原型对象(ox123)
prototype: (ox123)   ↗              
``` 
文字描述:
我们可以理解为Myclass函数对象下面有个属性是prototype, 
这个prototype的值为内存空间地址链接这另一个对象的内存空间

这个另一个对象就是原型对象
```



<br>

### <font color="#C2185">构造函数 prototype属性</font>
当我们的函数作为普通函数调用 这个prototype没有任何作用
当函数以构造函数调用时(也就是通过 new 来调用的时候)

function Myclass(){ ... }
var mc = new Myclass();

以构造函数调用就有了原型对象的概念 也就有了prototype属性



<br>

### <font color="#C2185">实例对象 __proto__属性</font>
用Myclass创建了一个对象叫做mc
Myclass有个属性叫做protptype由于mc是由Myclass创建的, 所以mc里面也会有一个属性指向prototype

换句话说mc里面有个隐含属性也指向ox123, 这个隐含属性我们可以通过*__Proto__*来访问该属性

也就是说 实例对象可以通过 __proto__ 来访问 构造函数的原型对象

我们用图和文字分别描述下上行的状态:
图1:
Myclass                         原型对象(ox123)
prototype      ox123       指向↗
                  
图2:
实例对象 mc                  指向↗
__proto__      ox123

mc.__proto__ == Myclass.prototype   // true
意味着它们指向了同一个对象



<br>

### <font color="#C2185">原型对象的作用</font>
这个原型对象有什么用的别忘了 这个原型对象包括我们的构造函数 包括我们的实例都能看见, 所以原型对象就相当于一个*公共的区域*
*所有同一个类的实例 都可以访问到这个原型对象*

mc1 mc2 mc3 都可以访问到__proto__这个属性, 所以我们可以将对象中共有的内容统一设置到原型对象中



<br>

### <font color="#C2185">原型链</font>
查找属性和方法时, 会沿着原型链来查找
所以当我们访问对象的一个属性或方法时它会先在对象自身中寻找如果有则直接使用没有就去原型对象中寻找



<br>

### <font color="#C2185">总结</font>
以后再出现每一个类都需要用的属性或者方法我们就添加到原型对象中
以后我们创建构造函数时可以将这些对象共有的属性和方法统一添加到构造函数的原型对象中

这样不用分别为每一个对象添加也不会影响到全局作用域就可以使每个对象都具有这些属性和方法了

<br>

# 检查某属性是否在对象中

<br>

### <font color="#C2185">'属性名' in 对象</font>
返回的是布尔值, 如果对象中没有但是原型中有 也会返回ture 
``` console.log('name' in obj);```


<br>

### <font color="#C2185">对象.hasOwnProperty("属性名")</font>
检查该对象自身是否有这个属性 *不会检查原型对象上的属性*

<br>

# 原型链
Star.prototype 是 Star构造函数的原型对象, 既然是对象那么就会有__proto__

Star.prototype.__proto__它指向了另一个原型对象


ldh实例对象
  通过ldh.__proto__指向了Star.prototype

Star.prototype原型对象
  通过Star.prototype.__proto__指向了Object.prototype

Object.prototype原型对象
  通过Object.prototype.__proto__指向了null

*这就是原型链*


Star.prototype.__proto__ == Object.prototype
Object.prototype.__proto__ == null



<br>

### <font color="#C2185">js中的成员查找机制(规则);</font>
当访问一个对象的属性(包括方法)时, 首先查找这个对象自身有没有该属性
如果没有就查找它的原型(也就是__proto__指向的prototype原型对象)
如果还没有就查找原型对象的原型(Object的原型对象)
依次类推一直找到Object为止(null)
``` 
object对象的原型没有原型如果在object原型中依然没有找到则返回undefined, 一般2层就完事了  
```

<br>

# 垃圾回收(GC):
一个程序运行时间长了也会产生垃圾这些垃圾积攒过多程序的运行速度就会过慢
所以我们需要一个垃圾回收的机制来处理程序运行过程中产生的垃圾

比如:
var obj = new Object();
obj = null

这样就不会指向堆内存的对象断开连接了这样堆内存中就没有任何变量可以进行引用了 这个对象就不能进行任何操作了  
                  
当一个对象没有任何的变量或属性对它进行引用
此时我们将永远无法操作该对象, 此时这种对象就是一个垃圾
这种对象过多会占用大量的内存空间导致程序运行变慢, 所以这种垃圾必须进行清理

在js中拥有自动的垃圾回收机制会自动将垃圾对象从内存中销毁, 我们不需要也不能进行垃圾回收操作

**需要回收就要写上obj = null这样浏览器才会识别出 该对象需要被回收**

<br> 

# 函数的调用方式


<br>

### <font color="#C2185">普通函数</font>
```js
function fn() {
console.log("普通函数", this)
}

fn()    // this: window
```



<br>

### <font color="#C2185">对象的方法</font>
```js
let obj = {
name: "sam",
say() {
console.log("方法: ", this)
}
}

obj.say()
// this: {name: 'sam', say: ƒ}
```



<br>

### <font color="#C2185">构造函数</font>
```js
function Person (name, age) {
this.name = name
this.age = age

this.sing = function() {
console.log(this.name)
}
}

let p = new Person("sam", 18)
p.sing()
// this: 实例对象
```



<br>

### <font color="#C2185">绑定事件函数</font>
```js
btn.onclick = function() {}
// 点击按钮调用
```




<br>

### <font color="#C2185">定时器函数</font>
```js
setTimeout(function() {
console.log(this)
}, 1000)
// this: window
```



<br>

### <font color="#C2185">立即执行函数</font>
```js
(function() {
console.log(this)
})()
```

<br>

# this
*解析器*在调用函数时每次都*会向函数内部传递进一个隐含的参数*
这个隐含的参数就是this
this是一个参数跟ab没区别只是浏览器传进来的



<br>

### <font color="#C2185">this的指向</font>
this的指向在函数定义的时候是确定不了的, 只有*函数执行的时候才能确定this到底指向谁*, 一般情况的最终指向的是那个调用它的对象(定时器的this是window, 因为window.setInterval())



<br>

### <font color="#C2185">根据的是调用的方式不同this会指向不同的对象</font>
1. 以函数形式调用this永远是window
2. 以方法形式调用this就是调用方法的那个对象
3. 当函数以构造函数调用的时候this就是那个新创建的对象(实例对象)
``` 
在构造函数中的this指向对象实例 new的时候会创建空对象, 让this指向这个空的对象
```

**注意:**
构造函数的原型对象中的this指向的是谁? 原型对象函数里面的this 指向的是 实例对象
this可以根据调用者的不同变成不同的值



<br>

### <font color="#C2185">总结:调用方式       this指向</font>
普通函数调用        window
构造函数调用        实例对象(原型对象里面的方法也指向实例对象)
对象方法调用        该方法所属对象
事件绑定方法        绑定事件对象
定时器函数          window
立即执行函数        window

<br>

# 利用方法 改变函数内部 this 指向
js中为我们提供了一些函数方法来帮我们更优雅的处理函数内部this的指向问题, 常用的bind(), call(), apply()


<br>

### <font color="#C2185">函数名.call() | apply() | bind()</font>



<br>

### <font color="#C2185">函数名.call(目标)</font>
它可以改变函数的this指向 让目标临时有这个方法 该函数中的this就指向这个目标
它可以调用函数

参数:  
参数1:  this 或者是 目标对象  
参数2:  实参, 我们传递的数据可以在函数的形参中被接收到

```js
let obj = {name: 'sam'}

// 全局 name
name = 'erin'


function fn() {
console.log(this);
console.log(this.name);
}

fn()                // erin window
fn.call(obj);       // sam  obj

<br>

function fn(a, b, c) {
console.log(this.name)
console.log(a,b,c)
}
fn.call(obj, "a", "b", [1,2,3])


// 假如我们使用...args形参接收实参的话 我们传递的数据都会在数组中体现
function fn(...args) { }   // ["a", "b", [1,2,3]]
```


<br>

### <font color="#C2185">场景</font>
call()的主要作用可以实现继承 
```js
function Father(name, age) {
this.name = name
this.age = age
}

function Son(name, age) {

// 将Son的this传递进去 相当于执行Father里面的逻辑时 是往Son的实例对象上添加属性
Father.call(this, name, age)
}

let s = new Son("sam", 18)
console.log("s", s)
// Son { name: 'sam', age: 18 }
```

<br>



<br>

### <font color="#C2185">fn.apply() 方法</font>
用法跟call()一样 但是*传递实参的时候必须要以数组的形式传递*

在传递实参的时候 是字符串的形式拿到的就是字符串的形式 是数组的形式拿到的就是数组的形式

返回值就是函数的返回值, 因为它就是调用函数

fn.apply(o, ['pink']);


<br>

### <font color="#C2185">技巧</font>
我们可以利用apply 借助于数学内置对象求最大值
```js
let arr = [1, 66, 3, 99, 4];

// Math.max是求数字中的最大值, 但是它求的是数字的 不是数组的 
Math.max()

// 现在我们可以利用这种方式 来求数组中元素的最大值
Math.max.apply()

// 我们可以写个空不需要改变this指向 
Math.max.apply(null, arr)  

// 写null也不太好, 就好让它指向函数的调用者, Math调用的吧 让它重新指回Math
Math.max.apply(Math, arr)
```


**注意:**
1. apply传递参数的时候 必须是数组
2. 函数接收参数的时候 可以使用 
...args 接收 那么 args就是参数数组
定义单独变量接收, 定义几个变量 可以接收几个参数
```js
// 下面我们传递的是数组 但是这里可以定义变量分别接收
let fn = (a, b) => {
console.log(a)
}

fn.apply(this, ["sam", 18])
```


<br>


<br>

### <font color="#C2185">fn.bind() 方法</font>
bind()方法不会调用函数, 但是能改变函数内部的this指向
把原函数改造完产生一个新的函数返回给我们 需要一个变量来接收

语法:
fun.bind(thisAsg, arg1, arg2);

参数:
thisAsg:    在fun函数运行时指定的this值
arg1:       传递的其它参数


返回由指定的this值和初始化参数改造的原函数拷贝(返回的是原函数改变this之后产生的新函数)

```js
let o = {
  name:'andy'
}

function fn() {
  console.log(this);
}

// 普通函数指向的是window, 我想让它指向o 给fn绑定bind这个方法,  它不会调用这个函数 只会改变this的指向 
fn.bind(o);  

// 它会返回一个bind完新的函数
let f = fn.bind(o);
f();
```


<br>

### <font color="#C2185">场景</font>
如果有的函数我们不需要立即调用, 但是又想改变这个函数内部的this指向此时用bind是最合适的

需求:
当我们有一个按钮, 当我们点击了之后, 就禁用这个按钮, 3秒钟之后开启这个按钮

```js 
let button = document.querySelector('button');
button.onclick = function(){

  // 事件函数的this指向的是btn
  this.disabled = true;

  setTimeout(function(){
      // 我能这么写么? 不能因为定时器函数this指向的是window
      this.disabled = false;  
  }, 3000)
}

// 以前的做法
button.onclick = function(){
  // 以前我们的做法是
  let that = this;
  this.disabled = true;

  setTimeout(function(){
      that.disabled = false;  
  }, 3000)
}

// 高级做法
button.onclick = function(){
  this.disabled = true;

  setTimeout(function(){
  
      // 现在我就想让定时器函数里面的this指向btn 同时定时器里面的函数并不是马上执行 所以我们选择bind(), bind()写在定时器的外面
      this.disabled = false;  
  }.bind(this), 3000)
}
```

上面这个bind()是在定时器函数的外面, 这个this又是在button函数的里面, 这个this指向的就是btn

setTimeout(funcion(){}.bind(button), 3000)
给定时器函数绑定了一个bind方法, 它不会立即调用函数, 同时我让这个定时器函数里面的this 指向了btn 因为点了谁, 谁就是this, 说以bind(button) 里面不要写button 改成this

<br>


<br>

### <font color="#C2185">call apply bind总结</font>


<br>

### 相同点:
都可以改变函数内部的this指向

<br>


<br>

### 区别点:
call apply会调用函数, 并且改变函数内部的this指向  
call和apply传递的参数不一样, call传递参数arg1 arg2形式, apply必须是数组的形式[args]

bind 不会调用函数, 可以改变函数内部this指向

<br>


<br>

### 性能:
传参超过3个以上的时候 call 的性能要好

<br>



<br>

### 应用场景:
**<font color="#C2185">call</font>**  
call经常做继承

<br>

**<font color="#C2185">apply</font>**  
apply经常跟数组有关系的, 比如借助于数学对象实现数组最大值最小值  
跟数组传参相关的时候 使用 apply 比较好  
```js
let arr = [10, 20, 30]
let obj = {}

function fn(x, y, z) {}
fn.apply(obj, arr)
```

<br>

**<font color="#C2185">bind</font>**  
bind 不调用函数, 但是还想改变this指向, 比如改变定时器内部的this指向 定时器不需要我们调用 是每隔一段时间自动 改变this时
  
<br>

# 原型对象的应用 -- 扩展内置对象
可以通过原型对象, 对原来的内置对象进行扩展自定义的方法, 比如给数组增加自定义求偶数和的功能

数组里已经有了很多方法 比如翻转数组, 数组排序等 我们再添加一个求偶数和

```js
// 看看数组的原型对象中有什么样的方法
console.log(Array.prototype);

// 添加求和方法
Array.prototype.sum = function() {
let sum = 0;

// 谁调用这个方法就是谁的length
for(let i=0; i<this.length; i++) {
  if(this[i] % 2 == 0) {
      sum += this[i];
  }
  return sum;
}
}

// 这个arr其实是new Array出来的 所以它可以使用原型对象中的方法
let arr = [1,2,3];
arr.sum();
```

**注意:**
数组和字符串内置对象不要覆盖原型对
Array.prototype = {}        -- 这样不行

只能以 Array.prototype.xxx = function(){} 的形式添加

<br>

# 扩展: 当我们打印一个对象的时候 输出的是 对象.toString()方法的返回值
```js
function Person(name, age, gender){
this.name = name;
this.age = age;
this.gender = gender;
}

// 创建一个Person的实例
var per = new Person("孙悟空" 18, "男");

// 这里有个问题为什么打印per是[object Object] 而不是别
console.log(per);    //[object Object]
console.log(per.toString());   //[object Object]
```

当我们直接在页面中打印一个对象时实际上是输出的对象的toString()方法的返回值 [object Object]

观察:
```js
// Person里面也没有toString()哪来的？
console.log(per.hasOwnProperty("toString"));    // false

// 结果是 false没有看看原型里面有没有 
console.log(per.__proto__.hasOwnProperty("toString"));

// 也没有看看原型的原型里有没有
console.log(per.__proto__.__proto__.hasOwnProperty("toString"));    //true
```


如果我们希望在输出对象时不输出[Object Object]
可以直接为对象添加一个toString()方法 也不去使用原型对象的原型对象里面定义的toString()方法

```js
// 给对象本身添加 toString() 方法
per.toString = function(){
// 定义其返回值
return "我是一个快乐的小person"
};

var result = per.toString();
console.log(per);  // 结果是我是一个快乐的小person
```

但是打印上面的也没有用啊我希望在打印的时候能打印出来详细信息
比如:
Person[name=孙悟空age=18gender=男]

```js
Person.prototype.toString = function(){
return "Person["name="+this.name+",age="+this.age+",gender="+this.gender]"
}
```

<br>

# 继承
比如我们在父类中已经写好了很多的方法, 在子类直接拿来使用继承父类的方法, 代码就会更简单

在es6之前并没有给我们提供extends继承, 我们可以通过 构造函数+原型对象 模拟实现继承, 被称为组合继承

要点:

<br>

### <font color="#C2185">call()</font>
调用这个函数, 并且修改函数运行时的this指向
fun.call(thisArg, arg1, arg2...)

参数
1. thisArg: 当前调用函数this的指向对象
2. 后面的两个就是传递的普通参数



<br>

### <font color="#C2185">调用父构造函数 继承父类中的属性</font>
核心原理:
通过 父类.call(this) 把父类型的this改成子类型中的this, 这样父类中的this.name = name 中的this就是子类的this 也就相当于在子类中书写了this.name = name 是一样的


\\ 定义父构造函数
```js
function Father(uname, age) {
this.name = name;
this.age = age;
}
```

\\ 定义子构造函数
```js
function Son(uname, age, score) {

}
```

现在我想让子构造函数使用父构造函数中的属性, 但是现在父 子构造函数并没有相连的关系

*而且父 子构造函数中的this指向也不一样*
父构造函数 指向 父构造函数的对象实例
子构造函数 指向 子构造函数的对象实例

那子构造函数怎么才能拿父构造函数中的属性呢? 
我们可以在子构造函数中调用父构造函数

我们把父构造函数当做一个普通的函数来调用 但是注意在父构造函数里面的this是父构造函数的实例对象, 子构造函数是指向子构造函数中的实例对象

父构造函数里面的uname是在父构造函数身上的, 那么子构造函数想要使用父构造函数中的属性, 一定要把父构造函数的this改成子构造函数, 然后我就可以使用这个属性了

现在就指向了自构造函数的实例对象 还可以创建自己的属性
```js
function Son(uname, age, score) {
Father.call(this, uname, age);
this.score = score;
}

let son = new Son('刘德华', 18, 100);
console.log(son);
```

上面的方式只能继承定义在父类中的属性和方法 要想继承原型链上的属性和方法需要下面的知识

<br>

# 借用原型对象 继承 父类型的方法
一些共有的属性 我们写在构造函数里面, 但是共有的方法 我们要写在原型对象上比较合适

\\ 定义父构造函数
```js
function Father(uname, age) {
this.name = name;
this.age = age;
}
```

\\ 往父构造函数中添加方法
```js
Father.prototype.money = function() {
console.log(10000);
};
```


怎么样继承父类中原型对象里的方法呢?

<br>

### <font color="#C2185">方式1:  这样可以么？</font>
```js
Son.prototype = Father.prototype
```

这么做是不行的, 这样直接赋值会有问题, 如果修改了子原型对象, 父原型对象也会同样被修改



<br>

### <font color="#C2185">方式2:  这样做呢？    可以</font>

<br>

### <font color="#C2185">Son.prototype = new Father();</font>

```js
Son.prototype = new Father();
```
new Father() 相当于实例化了父构造函数
new Father相当于创建了一个Father的实例对象 这是Father实例对象 和 Father的原型对象不在一个内存机制里

然后我又把 创建的Father实例对象 赋值给了 Son.prototype
相当于

Son构造函数 的 Son原型对象 指向了刚才创建的Father实例对象
Father的实例对象 能访问 Father原型对象里面的方法 而son原型对象 也可以通过Father实例对象访问到 Father原型对象里面的方法


          Father.prototype
Father构造函数      ----- >        Father原型对象

  ↘                               ↑

new Father()后创建了一个
Father实例对象                  Father.__proto__

              ↘           ↗

              Father实例对象

                          ↖
          Son.prototype
Son构造函数      ----- >        Son原型对象


new Father()会创建一个Father的实例对象, 将这个实例对象的地址 给 Son构造函数的原型对象

因为Father的实例对象可以访问到在Father原型对象身上的方法,而Son构造函数的原型对象和Father的实例对象又是一个 所以同样可以访问到Father原型对象身上的方法

*Son.prototype = Father的实例对象  指向  Father的原型对象*


<br>

### <font color="#C2185">总结下</font>
```js
function Father() {

};

Father.prototype.sing = function() {
console.log(1);
}


Son.prototype = new Father();

function Son() {

};

let son = new Son();
son.sing();
```

**注意:**
Son.prototype = new Father();

上面这样做相当于: Son.prototype = {};
这样就会把Son.prototype里面的东西覆盖掉, 所以Son.prototype里面就没有constructor了
```js
console.log(Son.prototype.constructor)  //Father
```

这就是问题 按道理Son.prototype.constructor应该指向Son才对 因为是一个覆盖操作

如果利用对象的形式修改了原型对象, 别忘了利用constructor指回原来的构造函数



<br>

### <font color="#C2185">解决方案 手动给原型对象中添加 constructor 属性</font>
Son.prototype.constructor = Son



<br>

### <font color="#C2185">整理</font>
```js
function Father(name, age) {
  this.name = name 
  this.age = age
}

Father.prototype.sing = function() {
  console.log("hi")
}

function Son(name, age, gender) {
  Father.call(this, name, age)
}


// 关键的两步
Son.prototype = new Father()
Son.prototype.constructor = Son


let s = new Son("nn", 5)
s.sing()
```

**注意:**
Father的constructor要指向Father, Son的constructor要指向 Son

<br>

# new 关键字执行过程
1. 当我们构造函数遇见new时候 会在内存中创建一个空的对象
2. this都会指向这个空的对象
3. 执行构造函数里面的代码, 给这个空对象添加属性 和 方法
4. 返回这个对象
``` new的最后会返回这个对象, 所以就不需要return了```

<br>

# 原型链的总结
首先我们要明确
函数(Function)才有prototype属性对象(除Object)拥有__proto__.
https://www.cnblogs.com/libin-1/p/5820550.html?ivk_sa=1024320u

<br>

# for...in 对象遍历
for...in用于对数组或者对象的属性 进行循环操作, 建议对对象使用

我们使用for in 里面的变量 我们喜欢用key 或者 k
```js
let obj = {
  name: '',
  age: 18,
  sex: '男'
};

for (let 变量 in 对象) {
  
}
```

变量:       属性名(键名)
对象[变量]:  属性值(通过对象[键名]的形式获取元素)



<br>

### <font color="#C2185">for...in 的特点</font>
遍历数组
1. index索引为字符串型数字不能直接进行几何运算
2. 遍历顺序有可能不是按照实际数组的内部顺序
3. 使用for in会遍历数组所有的可枚举属性包括原型
例如上例的原型方法method和name属性 所以for in更适合遍历对象不要使用for in遍历数组

**for...in 变遍历整个原型链**

<br>

# for...of 遍历数组 字符串 
如果说for...in遍历的是数组的索引(键名)
那么for...of遍历的是数组的元素的值(直接就是属性值)

它适合遍历数组 字符串等 *不能遍历对象*

```js
for (let 变量 in 数组) {

}

console.log(变量);       // 属性值
```

<br>

# 内置对象
js中对象分为3中:
自定义对象
内置对象
浏览器对象

前两种对象是js基础内容, 属于ES, 第三个浏览器对象属于我们js独有的

内置对象
内置对象就是指JS语言自带的一些对象, 这些对象供开发者使用, 并提供了一些常用的或者最基本而必要的功能(属性方法等)


# 查阅文档
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

MDN 学习一个内置对象的使用, 只要学会其常用成员的使用即可, 我们可以通过查文档学习, w3c和mdn 推荐使用MDN

查阅该方法的功能
查看里面参数的意义和类型
查看返回值的意义和类型
通过demo进行测试

<br>

# Object对象


<br>

### <font color="#C2185">Object.assign(目标对象, 源对象)</font>
该方法将所有可枚举 和 自有属性(Object.hasOwnProperty() 返回 true) *从一个或多个源对象复制到目标对象*

将 源对象 的符合条件的属性复制到 目标对象

参数:
target
目标对象, 接收源对象属性的对象, 也是修改后的返回值。

sources
源对象, 包含将被合并的属性

返回值:
合并后的对象

**注意:**
1. 如果目标对象 和 源对象 具有相同的key 则目标对象中的属性会被源对象中的属性覆盖 (后面的覆盖前面的)

2. Object.assign 方法只会拷贝源对象 可枚举的 和 自身的 属性到目标对象。

3. 深浅拷贝的问题
因为 Object.assign() 只复制属性值。假如源对象是一个对象的引用, 它仅仅会*复制其引用值*。




<br>

### <font color="#C2185">示例</font>
复制对象
```js
let obj = {name: "sam"}
let res = Object.assign({}, obj)
console.log(obj)
```

合并对象
target目标对象就是返回值
```js
let o1 = {a: 1}
let o2 = {b: 2}
let o3 = {c: 3}

let res = Object.assign(o1, o2, o3)
console.log(res)
// { a: 1, b: 2, c: 3 }

console.log(o1)
// { a: 1, b: 2, c: 3 }
```

<br>


<br>

### <font color="#C2185">Object.create(proto, [propertiesObject])</font>
Object.create()方法可以创建一个新对象
并且通过给定的对象(作为新对象的原型对象)

返回的是新对象, 我们传入的参数1 是新对象的原型对象


参数:
1. proto:
新创建对象的原型对象

2. propertiesObject:
需要传入一个对象, 该对象的属性类型参照Object.defineProperties()的第二个参数。

返回值:
一个新对象, 带着指定的原型对象和属性。

示例:
```js
let person = {
name: "sam",
say() {
console.log(this.name)
}
}

let newPerson = Object.create(person)
console.log(newPerson)

console.log(newPerson.name) // sam
newPerson.say() // sam
```

示例:
```js
// 取得 Array 的原型对象
let oldArrayProto = Array.prototype

// 生成了一个新的对象
// 新对象的原型对象就是oldArrayProto 我们可以通过 newArrayProto.__proto__ 访问到oldArrayProto
let newArrayProto = Object.create(oldArrayProto)
console.log(newArrayProto)
```

示例:
实现类式继承
```js
Son.prototype = new Person()
↓ 改成  创建一个新对象 该新对象的原型对象为 Person.prototype
Son.prototype = Object.create(Person.prototype)
```

```js
function Person(name, age) {
this.name = name
this.age = age
}

Person.prototype.say = function(content) {
console.log(this.name + ": " + content)
}

function Son(name, age, price) {
Person.call(this, name, age)
this.price = price
}

// let son = new Son("sam", 18, 400000)
// console.log(son)

// 上面是简单的继承 但是不能继承到原型中的方法
// son.say()  // son.say is not a function

// 继承原型对象上的方法
Son.prototype = Object.create(Person.prototype)
Son.prototype.constructor = Son

let son = new Son("sam", 18, 400000)
son.say("加油!")
```

示例:
使用使用 Object.create() 的 propertyObject 参数(第二个参数)

```js
let o = Object.create(Object.prototype, {
// foo 会成为所创建对象的数据属性
foo: {
writable:true,
configurable:true,
value: "hello"
},

// bar 会成为所创建对象的访问器属性
bar: {
configurable: false,
get: function() { return 10 },
set: function(value) {
console.log("Setting `o.bar` to", value);
}
}
});
```

<br>


<br>

### <font color="#C2185">Object.defineProperty(obj, 'prop', descriptor)</font>
我们可以通过该方法, 在对象中添加 属性 和 属性值, 同时可以对属性值进行限制以及控制

直接在一个对象上定义一个新属性, 或者修改一个对象的现有属性


参数:
1. obj:   目标对象(必传项)
2. prop:  需要定义或修改的属性的名字(原先没有的会添加)

3. descriptor:
3.1 数据描述符:
  configurable
  enumerabl
  value
  writable 等配置项.

3.2 访问器描述符:  
  get 
  set 
  configurable 
  enumerable 等配置项.

**数据描述符和访问器描述符不能混合使用**


<br>

### <font color="#C2185">配置项: value</font>
设置属性的值, 默认为undefined


<br>

### <font color="#C2185">配置项: writable</font>
设置值是否可以重写, true | false, 默认为false
``` 
我们的对象中有很多属性是很重要的, 不可以修改的, 这时候可以通过这个属性限定不允许被修改
```


<br>

### <font color="#C2185">配置项: enumerable</font>
设置目标属性是否可以被枚举, true | false, 默认为false
``` 
比如买了个东西 我往对象里添加了用户的地址, 这个地址比较隐私, 不想让被枚举出来, 这时候就可以用这个属性
```


<br>

### <font color="#C2185">配置项: configurable</font>
设置目标属性是否可以被删除或是否可以再次修改特性, 默认为false
``` 
添加的属性不允许被删除, 并且不能给这个属性的第三个参数再次修改特性
```


当我们需要设置或获取对象的某个属性的值的时候我们可以使用 setter/getter方法.


<br>

### <font color="#C2185">配置项: get</font>
当我们读取给定属性的时候会调用get函数, get函数的返回值就是给定属性的属性值


<br>

### <font color="#C2185">配置项: set</font>
当我们修改给定属性的时候会调用set函数, set函数的形参value就是新修改之后的值

```js
const address = "白山"

const obj = {
name: "sam",
age: 18
}

Object.defineProperty(obj, "address", {
get() {
return address
}
})

console.log(obj.address)  // 白山
```

**注意:**
如果我们使用 Object.defineProperty 往对象中添加 对象已有属性 那么该对象该属性会被删掉
比如 我们往 obj 中添加 name 属性 那么obj本身就变成 obj:{age: 18} name就没有了

利用上面的特性 我们可以进行通过指定的属性名 过滤对象剩余属性
```js
const obj = {
name: "sam",
age: 18
}

Object.defineProperty(obj, "name", {
get() {
return obj
}
})

function filter(obj, key) {
return Object.defineProperty(obj, key, {
get() {
return obj
}
})
}

console.log(filter(obj, "age"))
```



<br>

### <font color="#C2185">案例一</font>
使用 Object.defineProperty 给对象添加属性
数据描述符
```js
let obj = {
  id:1,
  pname:'小米',
  price:1999,
  num:2000
}

Object.defineProperty(obj, 'sex', {
  value:1000,
  writable:
})
```



<br>

### <font color="#C2185">案例二</font>
使用 Object.defineProperty 实现双向绑定
访问器描述符
```js
<input type="text" id="demo" />
<div id="xxx">{{name}}</div>

const obj = {};

Object.defineProperty(obj, 'name', {
  set: function (value) {
      document.getElementById('xxx').innerHTML = value;
      document.getElementById('demo').value = value;
  }
});

document.querySelector('#demo').oninput = function (e) {
  obj.name = e.target.value;
}
obj.name = '';
```



<br>

### <font color="#C2185">Object.defineProperties(obj, props)</font>
设置多个属性
```js
var obj = {};
Object.defineProperties(obj, {
'property1': {
value: true,
writable: true
},
'property2': {
value: 'Hello',
writable: false
}
});
```

<br>


<br>

### <font color="#C2185">Object.entries(目标对象)</font>
将目标对象中 可枚举的属性 组织成 [key,value] 放到一个数组中

返回值:
二维数组 [[key,value], [key,value], [key,value]]

示例:
```js
let obj = {
name: "sam",
age: 18,
sex: "男"
}

let res = Object.entries(obj)
console.log(res)
// [['name','sam'], ['age',18], ['sex','男']]
```


<br>

### <font color="#C2185">要点</font>
1. 因为得到的是 二维数组 所以可以利用解构
2. 可以使用 for...of 遍历 (数组嘛)
```js
let obj = {
name: "sam",
age: 18,
sex: "男"
}

// 解构
for(let [key, value] of Object.entries(obj)) {
console.log(key, value)
}
```



<br>

### <font color="#C2185">将Object转换为Map</font>
new Map() 构造函数接受一个可迭代的entries。
借助Object.entries方法你可以很容易的将Object转换为Map
```js
let obj = {
name: "sam",
age: 18,
sex: "男"
}

let map = new Map(Object.entries(obj))
console.log(map)
```

<br>


<br>

### <font color="#C2185">Object.fromEntries(目标对象)</font>
把键值对列表转换为一个对象
也就 Object.entries() 逆效果

参数:
类似 Array Map 或 其他的可迭代对象
(键值对形式的二维数组)

```js
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```


<br>

### <font color="#C2185">示例: 利用 map() 修改对象中属性的值</font>
```js
let obj = {a: 1, b: 2, c:3}

// 将其转换成2维数组 利用map() 得到的是修改后的二维数组
let res = Object.entries(obj).map(([key, value]) => [key, value * 2])

let _obj = Object.fromEntries(res)
console.log(_obj)  // { a: 2, b: 4, c: 6 }
```

<br>


<br>

### <font color="#C2185">Object.keys(目标对象)</font>
将给定对象中的*属性名* 组成一个数组

返回值
属性名数组

<br>


<br>

### <font color="#C2185">Object.values(目标对象)</font>
将给定对象中的*属性值* 组成一个数组

返回值
属性值数组

<br>


<br>

### <font color="#C2185">Object.freeze(目标对象)</font>
可以冻结一个对象。一个被冻结的对象再也不能被修改
如:
- 冻结了一个对象则不能向这个对象添加新的属性
- 不能删除已有属性
- 能修改该对象已有属性的可枚举性、可配置性、可写性
- 不能修改已有属性的值
- 冻结一个对象后该对象的原型也不能被修改

返回值:
被冻结的对象

```js
let obj = {
name: "sam",
age: 18,
}

Object.freeze(obj)

// 当我们试图修改对象中的属性值时 会静默不做任何处理
obj.name = "erin"
console.log(obj)
```

<br>


<br>

### <font color="#C2185">Object.isFrozen(目标对象)</font>
给定对象是否被冻结

返回值:
boolean

<br>


<br>

### <font color="#C2185">Object.getOwnPropertyDescriptor()</font>
返回指定对象上一个自有属性对应的属性描述符。
```js
const object1 = {
property1: 42
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1.configurable);
// expected output: true

console.log(descriptor1.value);
// expected output: 42
```

<br>


<br>

### <font color="#C2185">Object.getOwnPropertyNames()</font>
返回一个由指定对象的所有自身属性的属性名

<br> 


<br>

### <font color="#C2185">Object.getPrototypeOf()</font>
返回指定对象的原型(内部[[Prototype]]属性的值)。

参数:
目标对象

返回值
给定对象的原型。如果没有继承属性, 则返回 null 。

```js
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

<br>


<br>

### <font color="#C2185">Object.is(value1, value2)</font>
判断两个值是否为同一个值。

返回值:
boolean

规则:
都是 undefined
都是 null
都是 true 或都是 false
*都是相同长度、相同字符、按相同顺序排列的字符串*
*都是相同对象(意味着都是同一个对象的值引用)*
都是数字且
  都是 +0
  都是 -0
  都是 NaN
  都是同一个值, 非零且都不是 NaN


<br>

### <font color="#C2185">扩展</font>
Object.is() 与 == 不同:
Object.is 不会强制转换两边的值

Object.is() 与 === 也不相同
差别是它们对待有符号的零和 NaN 不同
=== 运算符(也包括 == 运算符)将数字 -0 和 +0 视为相等, 而将 Number.NaN 与 NaN 视为不相等。

```js
// Case 1: Evaluation result is the same as using ===
Object.is(25, 25);                // true
Object.is('foo', 'foo');          // true
Object.is('foo', 'bar');          // false
Object.is(null, null);            // true
Object.is(undefined, undefined);  // true
Object.is(window, window);        // true
Object.is([], []);                // false
var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);              // true
Object.is(foo, bar);              // false

// Case 2: Signed zero
Object.is(0, -0);                 // false
Object.is(+0, -0);                // false
Object.is(-0, -0);                // true
Object.is(0n, -0n);               // true

// Case 3: NaN
Object.is(NaN, 0/0);              // true
Object.is(NaN, Number.NaN)        // true

```

<br>

# Math对象
Math数学对象 不是一个构造函数, 所以我们不需要new 来调用 直接使用即可


<br>

### <font color="#C2185">Math.PI</font>
圆周率



<br>

### <font color="#C2185">Math.floor()</font>
向下取整
往小了取值



<br>

### <font color="#C2185">Math.ceil()</font>
向上取整
有小数就进1



<br>

### <font color="#C2185">Math.abs() </font>
可以用来计算一个数的绝对值
隐式转换 会把字符串型的-1 转换为数字型
如果不是数字型的 会是NaN
``` Math.abs('-1');```



<br>

### <font color="#C2185">Math.round()</font>
可以对一个数进行四舍五入 取整
.5会往大了取 所以当为-1.5的时候 会取-1 而不是 -2 因为-1 比 -2大



<br>

### <font color="#C2185">Math.random()</font>
可以用来生成一个0-1之间的随机数 0-1之间 不会出现0 和 1


<br>

### <font color="#C2185">Math.random()*10</font>
生成一个0-10的随机数:



<br>

### <font color="#C2185">Math.round(Math.random()*x)</font>
生成一个0-x之间的随机数, 可以对结果四舍五入下能取得包括0和10的0-10之间的随机数



<br>

### <font color="#C2185">Math.round(Math.random()*(y-x))+x</font>
生成一个x-y之间的随机数



<br>

### <font color="#C2185">Math.floor(Math.random() * (max - min)) + min </font>
得到一个两数之间的随机整数



<br>

### <font color="#C2185">Math.floor(Math.random() * (max - min + 1)) + min</font>
得到一个两数之间的随机整数包括两个数在内


示例:
```js
// 生成一个1-10之间的随机数可以先生成0-9之间的数+1 这样最小数+1 等于1 最大数+1 等于10
Math.round(Math.random()*9)+1;

// 生成一个2-10之间的随机数
Math.round(Math.random()*8)+2;
```

封装函数:
```js
function getRandom(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min
}
```


<br>

### <font color="#C2185">Math.max()</font>
可以获取多个数中的最大值



<br>

### <font color="#C2185">Math.min()</font>
可以获取多个数中的最小值



<br>

### <font color="#C2185">Math.pow()</font>
Math.pow(x,y) 返回x的y次幂



<br>

### <font color="#C2185">Math.sqrt()</font>
开方


<br>

### <font color="#C2185">Math.log()</font>
返回给定数的自然对数(以e为底)

- 如果传递负数则返回NaN
- 如果传递0则返回 -Infinity

对数是求幂的逆运算 比如除法是乘法的倒数 反之亦然

如果 a的x次方等于n 那么x叫做以a为底n的对数

a^x = n 比如 2^3 = 8

假如我们要想求x 则使用可以  
Math.log(8) / Math.log(2) = 次幂

<br>

# Date对象 (日期对象)
Date对象是一个构造函数, 必须使用new来调用创建我们的日期对象
在js中使用Date对象来表示一个时间



<br>

### <font color="#C2185">构造函数 创建Date对象</font>
```js
let date = new Date()

console.log(date)
// 2022-06-12T14:08:45.524Z

<br>

// 我们写的是5月 实际输出才是6月
let date = new Date(2022,5,12)
console.log(date)
// 2022-06-12T14:08:45.524Z
```


<br>

### <font color="#C2185">参数</font>
空参:
如果没有输入任何参数, 返回系统的当前时间

指定时间
指定时间的常用写法:
- 数字型: 2019,10,01
- 字符型:
  '2019-10-1 08:08:08'
  "12/03/2016 11:10:30"

**注意:**
如果输入的是数字型的时候要 实际月份-1
字符串型没有问题

<br>


<br>

### <font color="#C2185">date.toLocaleString([locales [, options]])</font>
当前系统时间:
默认返回的格式: 2022/6/12 下午11:13:00


<br>

### <font color="#C2185">返回值</font>
根据当地语言规定 返回时间字符串


<br>

### <font color="#C2185">参数</font>
有些浏览器因为兼容性 不支持locales和options参数
为了检测是否支持参数 我们可以做下检测
```js
function toLocaleStringSupportsLocales() {
try {
  new Date().toLocaleString("i");
} catch (e) {
  return e​.name === "RangeError";
}
return false;
}
```

locales:
国家地区字符串
- 美国: "en-US"
- 英语: "en-GB"
- 韩国: "ko-KR"
- 日本: "ja-JP-u-ca-japanese" | "ja-JP"

options:
自定义 toLocaleString 方法返回的字符串
- weekday:
- year:
- month:
- day:

options对象 key用于配置要显示的数据 value决定如何显示数据, value的可选值为:
- long: 中文
- short:
- narrow
- numberic: 数字
- 2-digit

```js
let date = new Date(2022,5,12,23,13)

console.log(date.toLocaleString("ja-JP", {
year: "numeric",
month: "long"
}))

// 2022年6月
```

```js
<div className="month">
{props.date.toLocaleString("zh-CN", {month: "long"})}
</div>
```

网址:
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

<br>


<br>

### <font color="#C2185">date.toLocaleDateString()</font>
返回的时间格式为: 2022/6/12

<br>


<br>

### <font color="#C2185">date.toLocaleTimeString()</font>
返回的时间格式为: 下午11:13:00

<br>


<br>

### <font color="#C2185">getFullYear()</font>
该方法可以获取当前对象所封装的日期中的  年份


<br>

### <font color="#C2185">getMonth()  得到的月份要+1    getMonth()+1</font>
该方法可以获取当前对象所封装的日期中的  月份(0-11).
它会返回0-11的值0是1月11是12月


<br>

### <font color="#C2185">getDate()</font>
该方法可以获取当前对象所封装的日期中的 几号(1-31)
```js
var d2 = new Date("12/03/2016 11:10:30");
var date = d2.getDate();
console.log("date = " + date);
```


<br>

### <font color="#C2185">getDay()  周日是0</font>
该方法可以获取当前对象所封装的日期中的 周几(0-6)
它会返回0-6的值0是周日1是周1
```js
var d2 = new Date("12/03/2016 11:10:30");
var date = d2.getDate();
var day = d2.getDay();
console.log("day = " + day);
```


<br>

### <font color="#C2185">.getHours()       时</font>

<br>

### <font color="#C2185">.getMinutes()     分</font>

<br>

### <font color="#C2185">.getSeconds()     秒</font>



<br>

### <font color="#C2185">获取 至今毫秒数(时间戳)</font>

<br>

### <font color="#C2185">1. valueOf();</font>

<br>

### <font color="#C2185">2. getTime();</font>

<br>

### <font color="#C2185">3. +new Date();  常用</font>

<br>

### <font color="#C2185">4. Date.now();   H5新增 低版本的浏览器不支持</font>
获取距离1970年1月1日开始到现在总的毫秒数(当前日期的时间戳)
指的是从格林威治标准时间的1970年1月1日0时0分0秒, 到当前日期所花费的毫秒数

返回值:
毫秒数

```
从  1970年1月1日0时0分0秒
到  12/03/2016 11:10:30
经过的毫秒数    1秒 = 1000毫秒

时间的单位极乱因为年可以理解为12进制月是12进制日是30进制时是60进制分秒毫秒, 所以就导致想在计算机里储存时间 特别麻烦单位不统一

所以统一转换为毫秒为了好保存, 计算机底层在保存时间时使用的都是时间戳
```
```js
let time = +new Date();
var time = d2.getTime();
console.log(time);
//time/1000/60/60/24/365
```

```js
var d3 = new Date("1/1/1970 0:0:0");
time = d3.getTime();
console.log(time);
//正常来讲的话应该是0 可是结果是 -28800000
```
1/1/1970 0:0:0 这个时间是中国时间(中文系统)
-28800000除完后正好是8小时也就是时差 

<br>


<br>

### <font color="#C2185">Date.now()</font>
获取时间戳
time = Date.now();
console.log(time);
``` 
我们获取到了一个时间戳这个时间戳是在3377代码执行时的时间戳相当于在执行的时候 盖了一个章
```
                                  


<br>

### <font color="#C2185">场景</font>
我们可以利用时间戳来干很多事情 - 测试代码的执行性能
```js
var start = Date.now();

for(var i=0; i<100; i++){
  console.log(i);
}

var end = Date.now();
console.log(end - start);
```

``` 
我们来看看100次for循环用多长时间我们可以在执行前获取一个时间戳在执行后获取一个时间戳我们再来做减法
```

<br>

# 函数
在js里面, 可能会定义非常多的相同代码或者功能相似的代码, 这些代码可能需要大量重复使用, 虽然for循环语句也能实现一些简单的重复操作, 但是比较具有局限性, 此时我们就可以使用js中的函数

就是封装了一段可被重复调用执行的代码块, 通过它可以实现大量代码的重复使用
``` 
普通对象像一个塑料袋只是一个容器

而函数对象可以封装一些功能(代码)在需要时可以执行这些功能(代码) 
```

使用typeof来检查一个对象时会返回 "function"


<br>

### <font color="#C2185">函数的使用分为两大步</font>
声明函数
调用函数



<br>

### <font color="#C2185">创建函数对象 - 构造函数</font>
语法:
```js
var fun = new Function();
```

可以将要封装的代码以字符串的形式传递给构造函数
```js
// 这个相当于把我们的代码装到了字符串里
var fun = new Function("console.log('hello,这是我的第一个函数')");
```

封装到我们函数中的代码不会立即执行仅仅是存起来了, 函数中的代码会在函数被调用的时候执行


<br>

### <font color="#C2185">调用函数: 函数名()</font>
当调用函数时函数中封装的代码会按照顺序执行
函数对象具有所有普通对象的功能

<br> 


<br>

### <font color="#C2185">创建函数对象 - 函数声明</font>
function 声明函数的关键字, 全部小写

函数是做某件事情, 函数名一般是动词 sayHi

语法:
```js
function 函数名([形参1形参2.....形参N]){
  语句...
}
```

调用:
fun2()

<br>


<br>

### <font color="#C2185">创建函数对象 - 函数表达式</font>
语法:
```js
let 变量名 = function() { ... };
let fn = function() {};
```

函数表达式声明方式 跟 声明变量差不多, 只不过变量里面存的是值, 而 函数表达式里存的是函数

调用:
函数名();



<br>

### <font color="#C2185">函数的封装的概念</font>
就是把一个或者多个功能通过函数的方式封装起来, 对外只提供一个简单的函数借口

简单理解: 封装类似于将电脑配件整合组装到机箱中

<br>

# 函数的参数
在声明函数的小括号里面是形参
在函数调用的小括号里面是实参

```js
function 函数名([形参1形参2.....形参N]){
  语句...
}

fun2(实参1, 实参2.....);
```

我们可以在函数的()中来指定一个或者多个形参(形式上的参数没有任和值占地用), 多个形参之间用逗号隔开声明形参就相当于在函数的内部声明了对应的变量, 但是并不赋值

在调用函数时可以在()中指定实参(实际参数)实参将会赋值给函数中对应的形参



<br>

### <font color="#C2185">形参 和 实参的执行过程</font>
```js
1 function sum(a, b) {
2     console.log(a+b);
3 }
4 sum(1,2);
```

代码读到 第1行 不会执行, 会跳过到 sum()函数调用这
sum(1,2) 调用再回头找function函数声明, 然后把实参传递给形参 然后再执行

示例:
定义一个用来求 两个数和 的函数
```js
function sum(){
  console.log(1+1);
}
sum();

function sum(a, b){
  console.log(a+b);
}

// 会拼串
sum(123, hello); 
```

**注意:** 
调用函数时解析器不会检查实参的类型所以要注意是否有可能会接受到非法的参数如果有可能则需要对我们的参数的类型进行一个检查



<br>

### <font color="#C2185">规则</font>
1. 如果实参的数量多于形参的数量多余的实参不会被赋值
2. 如果实参的数量少于形参的数量则没有对应的实参的形参将是undefined

3. 解析器不会检查实参的数量

<br>

# 函数的返回值
```js
function cook(aru) {
  console.log(aru);
}
cook('大肘子')
```

其实把输出语句写在函数内部是不合理的, 写在函数内部就好比是厨师把大肘子自己吃了, 不合理把 按道理来说函数只是为了实现某种功能, 菜抄完了应该端给使用者

所以函数应该返回一个结果给调用者, 这么做才是合理的
在实际开发里面, 我们经常用一个变量来接受函数的返回结果


<br>

### <font color="#C2185">return</font>
有的时候, 我们希望函数将值返回给调用者, 此时通过使用return 语句就可以实现

只要函数遇到return 就把后面的结果 返回给函数的调用者

语法:
```js
function 函数名() {
  return 需要返回的结果;
}
let 结果 = 函数名();
// 把返回的结果给调用者(函数名())
```

return后面的值将会作为函数的执行结果返回
函数一般是用来返回结果的并不需要函数做一些特殊处理, 在函数中return后的语句都不会执行因为结果已经被装进 return 值中了


<br>

### <font color="#C2185">return 终止函数</font>
return之后的代码不被执行


<br>

### <font color="#C2185">return 只能返回一个值</font>
返回的结果是最后一个值
```js
function fn(num1, num2) {
  return num1, num2;

  // 如果想返回多个结果 可以利用数组
  return [num1+num2, num1*num2];
}
console.log(fn(1,2));       // 2

```

**函数没有return 返回undefined**

<br>

# arguments --- 装实参的类数组
当我们不确定有多少个参数传递的时候, 可以用arguments来获取, 在js中, arguments实际上它是当前函数的一个内置对象, 所有函数都内置了一个arguments对象, arguments对象中存储了传递的所有实参


<br>

### <font color="#C2185">arguments的使用</font>
```js
function fn() {
  console.log(arguments)
  console.log(arguments[0] + arguments[1] + arguments[2])
}
fn(1,2,3);
```

在调用函数时浏览器每次都会传递进两个隐含参数
1. 函数的上下文对象this
2. 封装实参的对象arguments 



<br>

### <font color="#C2185">类数组</font>
arguments是一个 伪 数组对象不是数组 类似数组

它也可以通过索引来操作数组也可以获取长度
1. 具有数组的length属性
2. 按照索引的方式存储的
3. 它没有真正数组的方法
4. 在调用函数时我们所传递的实参都会在arguments中保存
5. 我们即使不定义形参也可以通过arguments来使用实参
```js
arguments[0]        第一个实参
arguments[1]        第二个实参
```


<br>

### <font color="#C2185">arguments.callee</font>
这个属性对应一个函数对象就是当前正在执行的函数对象调用谁, callee就是谁
```js
// 打印出了函数对象的整个内容 
console.log(arguments.callee); 
```

<br>

# 函数的实参可以是任意值

创建一个函数可以在控制台中输出一个人的信息
可以输出人的name age gender address
```js
function sayHello(name,age,gender,address){
  console.log(name,age,gender,address)
}
sayHello("猪八戒", 28, 男, "高老庄");
```

现在需要4个参数参数太多了当参数太多的时候容易乱 
```js
var obj = {
  name = "猪八戒",
  age = 18,
  gender = "男",
  address = "花果山"
}
```

**实参可以是任意数据类型也可以是一个对象**

当我们的参数过多时可以将参数封装到一个对象然后通过对象传递
```js
function sayhello(o){
  console.log(o.name,o.age,o.gender,o.address);
}
sayhello(obj);
```

形参那里是相当于定义了一个变量o

o.name
o.age
o.gender

实参那里传进去一个对象的内容就相当于obj.name



<br>

### <font color="#C2185">实参既然可以是对象那么实参还可以是个函数</font>
```js
function fun(a){
  console.log("a = " + a );
}
fun(123);
```

接下来实参里面传递一个函数
```js
//我把实参传进去了现在a相当于sayhello
fun(sayhello)   
```
在开发的时候经常会用到将一个匿名函数作为实参传递给函数 

<br>

# 立即执行函数
函数定义完立即被调用这种函数叫做立即执行函数立即执行函数往往只会执行一次
```js
function(){
  alert("我是一个匿名函数");          //匿名函数会报错
}
```

用一个括号用来圈起来一个函数代表一个整体直接写那会报错
```js
(function () {
  alert("我是一个匿名函数");  
})
```

调用:
```js
(function(){
  alert("我是一个匿名函数");     
})();
```

``` 
上面的就是立即执行函数往往只会执行一次, 假如上面的函数我只想调用一次调用一次之后就丢了这种函数假如我要是创建一个对象的话有点亏了 
```

上面的函数是立即执行函数, 


<br>

### <font color="#C2185">主要作用</font>
创建一个独立的作用域


<br>

### <font color="#C2185">立即执行函数的两种写法</font>
(function(a){ ... })(1)
(function(a,b){ ... }(1,2))

立即执行函数 也可以写函数名

**立即执行函数的最大作用就是 独立创建了一个作用域**
所有的变量都是局部变量, 函数执行完毕变量自动释放

<br>

# 作用域
通常的来说, 一段程序代码中所用到的名字并不总是有效和可用的, 而限定这个名字的可用性的代码范围就是这个名字的作用域
作用域的使用提高了程序逻辑的局部性, 增强了程序的可靠性, 减少了名字的冲突

简单的来说, 就是代码名字在某个范围内起作用和效果, 作用域指一个变量的作用的范围



<br>

### <font color="#C2185">作用域就分为两种</font>

<br>

### <font color="#C2185">1. 全局作用域</font>
整个script标签, 或者 是一个单独的js文件
全局作用域中的变量都是全局变量, 在页面的任意部分都可以访问的到

全局作用域在
页面打开时创建
页面关闭时销毁

在全局作用域中有一个全局对象window它代表的是一个浏览器窗口, 它由浏览器创建我们可直接使用 

在全局作用域中:
创建的变量都会作为window对象的属性保存
创建的函数都会作为window的方法来保存

```js 
var a = 10;
console.log(a);         //这个a是保存在window的属性里
console.log(window.a)   //我们来试一下看看能不能打出 10

function fun(){
  console.log("我是fun函数");
}
window.fun();
window.alert(); 
```

**注意:**
使用 var 和 函数声明 方式 定义的 属性 和 方法 会 挂载在window上
是用 let 和 const 声明的变量 不会挂载在window上

全局环境是一个复合环境 由下面的两个环境组成
- global(顶层对象)
- declsEnv(一般声明环境)

ES6之后 let const class 命令声明的全局变量 不属于顶层对象的属性 而是在一般声明环境 declsEnv 中

var声明的变量在 Global 中

<br>


<br>

### <font color="#C2185">2. 局部作用域(函数作用域)</font>
在函数内部就是局部作用域 这个代码的名字值在函数内起效果和作用
如果全局作用域像一个学校的话那么函数作用域就相当于一个个的班级
```js 
function fn() {
  // 局部作用域
}
```

调用函数时
创建函数作用域函数

执行完毕后
函数作用域销毁

每调用一次函数就会创建一个新的函数作用域它们之间相互是独立的
班级中可以访问到全局作用域里的变量, 在全局作用域中无法访问到函数作用域的变量 


<br>


<br>

### <font color="#C2185">变量的作用域</font>
在js中 根据作用域的不同, 变量可以分为两种

1. 全局变量:  
在全局作用域下的变量, 在全局在都可以使用
``` 在函数内部没有声明 直接赋值的变量也是全局变量```

2. 局部变量:  
在局部作用域下的变量, 或者在函数内部的变量就是 局部变量, 局部变量只能在函数内部使用
``` 函数的形参也是局部变量```

从执行效率来看全局变量和局部变量:
1. 全局变量 只有浏览器关闭的时候才会销毁, 比较占内存资源
2. 局部变量 当我们程序执行完毕后就会销毁, 比较节约资源

<br>

# 作用域链 (查找变量的规则)
只要是代码就有作用域 写在函数内部的就是局部作用域
如果函数中还有函数, 那么在这个作用域中就又可以诞生一个作用域

根据在内部函数可以访问外部函数变量的这种机制, 用链式查找决定哪些数据能被内部函数访问, 就称作作用域链
```js
let num = 10;
function fn() {              // 外部函数
  let num1 = 20;

function fn2() {            // 内部函数
      console.log(num1);  // 内部函数可以访问外部函数的变量
  }
}
```



<br>

### <font color="#C2185">总结</font>
内部函数访问外部函数的变量, 采取的是链式查找的方式来决定取哪个值, 这种结构我们称为作用域链 --- *就近原则*

一层一层依次向外层查找

多个上下级关系的作用域形成的链它的方向是从下向上或者从内到外, 查找变量时就是沿着作用域链来查找的 最外层的可以叫做0级链



<br>

### <font color="#C2185">变量的查找规则</font>
当在函数作用域中操作一个变量时会先在自身的作用域中寻找如果有就直接使用
如果没有就向上一级进行寻找注意是上一级直到找到全局作用域
如果全局作用域也没有会报错

在函数中要访问全局变量可以使用window对象

在函数作用域中也有声明提前的特性
使用var关键字声明的变量会在函数中所有的代码执行之前被声明
函数声明也会在函数中所有的代码执行之前执行

<br>

# 预解析
js代码是由浏览器中的js解析器(引擎)来执行的, js解析器在运行js代码的时候分为两步:
预解析
代码执行


<br>

### <font color="#C2185">预解析</font>
js引擎会把js里面所有的 var 还有 function 提升到 当前作用域 的最前面
预解析分为 变量预解析(变量提升) 和 函数预解析(函数提升)

**注意:**
函数提升优先级比变量提升要高, 且不会被变量声明覆盖, 但是会被变量赋值覆盖。
同一个标识符的情况下, 变量声明与函数声明都会提升；函数声明会覆盖变量声明, 但不会覆盖变量赋值, 即: 如果声明变量的同时初始化或赋值那么变量优先级高于函数。
``` 
提升按照书写顺序提升 不分变量 和 函数提升的优先级的问题 
```

```js
var a = 4
function a() {
console.log("a")
}

// 函数先提升 被 a = 赋值 覆盖
console.log(a)
```



<br>

### <font color="#C2185">变量提升</font>
就是把所有的变量声明提升到当前的作用域的最前面 只提升声明 不提升赋值
*变量提升不能跨 script*
```js
console.log(num)    //undefined
var num = 10;

  ↓

var num;
console.log(num);
num = 10;
```

```js 
fun();                  // 报错 fun不是一个函数
var fun = function() {
  console.log(22);
}

  ↓

var fun;
fun();
fun = function() {
  console.log(22);
}
```

<br>


<br>

### <font color="#C2185">函数提升</font>
就是把所有的函数声明提升到当前作用域的最前面, 不调用函数
```js
fn();
function fn() {
  console.log(2);
}

  ↓

function fn() {         // 把整个函数声明提升到作用域的最前面
  console.log(2);
}
fn();
```



<br>

### <font color="#C2185">代码执行</font>
按照代码书写的顺序从上往下执行



<br>

### <font color="#C2185">案例</font>
```js 
f1();
console.log(c);
console.log(b);
console.log(a);

function f1() {
  var a=b=c=9;
  console.log(a);
  console.log(b);
  console.log(c);
}

  ↓
// 函数先提升到最前面
function f1() {             
  var a=b=c=9;
  // 相当于: var a = 9;  b = 9;  c = 9;
  // 如果想多个赋值的话: var a = 9, b = 9, c = 9
  console.log(a);
  console.log(b);
  console.log(c);
}
f1();
console.log(c);
console.log(b);
console.log(a);         // 报错  函数内部的变量访问不到会报未定义的错
```

<br>

# 基本包装类型
```js
let str = 'andy';
console.log(str.length);
```


<br>

### <font color="#C2185">思考</font>
为什么会有str.length的属性, 前面说过, 只有复杂的数据类型才有 属性和方法
简单数据类型为什么length属性呢?



<br>

### <font color="#C2185">基本包装类型: 就是把简单数据类型 包装成 复杂数据类型</font>
简单的两行代码 其实内部进行了如下的操作
```js
// 包装的类型
let str = 'andy';
console.log(str.length);

// 1. 把简单数据类型包装为复杂数据类型
let temp = new String('andy');

// 把临时变量的值 给str 这样str就变成复杂数据类型就有属性和方法了
str = temp;

// 销毁临时变量
temp = null;
```

在js中为我们提供了三个包装类通过这三个包装类可以将基本数据类型的数据转换为对象, 三个包装类都是什么呢？


<br>

### <font color="#C2185">String()</font>
可以将基本数据类型的字符串转换为String对象
var str = new String();



<br>

### <font color="#C2185">Number()</font>
可以将基本数据类型的数值转换为Number对象
var num = new Number();


<br>

### <font color="#C2185">Boolean()</font>
可以将基本数据类型的布尔值转换为Boolean对象
var bool = new Boolean();

```js
var num = new Number(3);
var num2 = new Number(3);
var str = new String("hello");
var str2 = new String("hello");
var bool = new Boolean(true);
```

**注意:** 
我们在实际应用中不会使用基本数据的对象, 因为在用基本数据类型的对象做比较时会带来一些不可预料的结果 

既然不让我们用它们有什么用呢？ 浏览器底层自己会用 方法和属性只能添加给对象不能添加给数据类型

<br>

# 字符串不可变
指的是里面的值不可变, 虽然看上去可以改变内容, 但是其实是地址变了, 内存中新开辟了一个内存空间 *因为我们的字符串的不可变所以不要大量的拼接字符串*
```js
let str = 'andy';
console.log(str);   // andy

str = 'red'
console.log(str)    // red
```

``` 
上面看上去虽然字符串值发生了变化 实际上在重新赋值为red时, 是新开辟了一个块空间, str指向了这个空间, 而andy还是在的

所以不要大量的对字符串进行重新赋值, 也不要大量拼接字符串, 因为都会开辟新的空间
```

<br>

# 字符串
字符串的所有方法, 都不会修改字符串本身(字符串是不可变的), 操作完成后会返回一个新的字符串


<br>

### <font color="#C2185">str.length属性</font>
可以获取字符串的长度



<br>

### <font color="#C2185">str[index]</font>
H5 IE8+支持, 和charAt()等效



<br>

### <font color="#C2185">str.charAt(index)</font>
根据索引返回指定位置的字符

参数:
默认值: 0

```js
str = "hello,Atguigu";
var result = str.charAt(0);

//索引为0的元素上面的式子还可以这么写
var result = str[6];
console.log(result);         //h
```

<br>


<br>

### <font color="#C2185">str.charCodeAt(index)</font>
根据索引返回指定位置的字符的ASCII编码
我们键盘上的每一个键位都会对应一个ASCII码 我们可以判断用户按了哪个键

```js
let str = "sam"
let code = str.charCodeAt()
console.log(code)   // 115
```

<br>


<br>

### <font color="#C2185">String.fromCharCode()</font>
可以根据字符编码去获取字符, 这个方法是构造函数对象的 得通过构造函数对象取调用
表示16进制的时候要以0x开头, 另外它可以获取Unicode编码中的字符跟我们之前的var 没关系

result = String.fromCharcode(72);
console.log(result);            //H

<br>


<br>

### <font color="#C2185">str.concat(str2, [, ...strN]))</font>
将一个或多个字符串与原字符串连接合并, 形成一个新的字符串并返回。

参数:
需要连接的字符串

**注意:**
强烈建议使用赋值操作符（+, +=）代替 concat 方法。

<br>


<br>

### <font color="#C2185">str.endsWith()</font>
用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的

参数:
子串

返回值:
boolean

```js
let str = "demo.jpg"
console.log(str.endsWith(".jpg"))
```

<br>


<br>

### <font color="#C2185">str.startsWith()</font>
用来判断当前字符串是否以另外一个给定的子字符串开头

返回值:
boolean

<br>


<br>

### <font color="#C2185">str.includes()</font>
用于判断给定字符串是否包含在str中

参数:
1. searchString: 要搜索的字符串
2. position: 开始搜索的位置


返回值
boolean

```js
let str = "demo.jpg"
console.log(str.includes("."))  // true
```

<br>


<br>

### <font color="#C2185">str.indexOf()</font>
检索给定字符串是否在str中

返回值:
给定字符串 第一次出现的索引
如果没有找到 返回 -1

参数:
1. 给定字符串(默认值: undefined)
2. fromIndex
默认值: 0


**注意:**
1. 当我们查找的是空值的时候 会返回0
2. 当我们传入fromIndex 并查找空值的时候 会返回 fromIndex
```js
let str = "demo.jpg"
console.log(str.indexOf(""))    //0

<br>

'hello world'.indexOf('', 11) // 11
```

3. indexOf()区分大小写

示例:
统计一个字符串中某个字母出现的次数
```js
var str = 'To be, or not to be, that is the question.';

var count = 0;
var pos = str.indexOf('e');

while (pos !== -1) {
count++;
pos = str.indexOf('e', pos + 1);
}

console.log(count); // displays 4
```

<br>


<br>

### <font color="#C2185">str.lastIndexOf()</font>
该方法的用法跟indexOf一样不同的是indexOf是从前往后找, 而lastIndexOf是从后往前找

可以传递第二个参数来决定开始查找的位置

<br>


<br>

### <font color="#C2185">str.localeCompare(str2, [locales], [options])</font>
比较两个字符串的位置 根据返回的数字 可以看出谁在前 谁在后
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

参数:
str2: 比较的字符串

*locales 和 options 不是所有的浏览器都支持*

locales:
指定用来排序的语言: 可选的

options:
- localeMatcher:
  - 可选值: lookup | best fit
  - 默认值: best fit

- usage:
  - 指定比较的目标是排序或者是搜索
  - 可选值: sort | search
  - 默认值: sort

- sensitivity:
  - 指定排序程序的敏感度
  - 可选值: sort | search
  - 默认值: sort

返回值:
如果 str1 在 str2 之前 则为 负数
如果 str1 在 str2 之后 则为 正数
相等的时候返回 0

```js
let str1 = "a"
let str2 = "b"

let res = str1.localeCompare(str2)
console.log(res)    // -1


let str1 = "c"
let str2 = "b"

let res = str1.localeCompare(str2)
console.log(res)    // 1
```

<br>


<br>

### <font color="#C2185">str.match()</font>
返回匹配的结果(字符串数组), 根据正则 | 给定字符


<br>

### <font color="#C2185">参数</font>
正则表达式 | 字符串
(如果我们传入的是字符串 会隐式的使用 new RegExp() 对其进行转换)


<br>

### <font color="#C2185">返回值</font>
匹配的结果 数组
如果*没有传递任何参数* 则返回的就是 [""]
如果*没有匹配成功* 则返回 null


<br>

### <font color="#C2185">返回值分为两种情况</font>
1. 使用 g 模式:
将返回与完整正则表达式匹配的所有结果 但*不会返回 捕获组()*
```js
let str = 'The quick brown fox jumps over the lazy dog. It barked.';

let res = str.match(/The/g)
console.log(res)  // ['The']
```

2. 不用 g 模式:
仅返回 *第一个完整匹配及其相关的 捕获组()*
这种情况下 返回的项目将具有附加属性
```js
let str = 'The quick brown fox jumps over the lazy dog. It barked.';

let res = str.match(/The/)
console.log(res)

// 结果
[
'',
index: 0,
input: 'The quick brown fox jumps over the lazy dog. It barked.',
groups: undefined
]
```

- 附加属性:
  - groups:
      - 一个命名捕获组对象, 其键是捕获组名称, 值是捕获组, 如果未定义命名捕获组, 则为 undefined
  - index: 匹配的结果的开始位置
  - input: 搜索的字符串。

示例:
使用 match 查找 "Chapter" 紧跟着 1 个或多个数值字符, 再紧跟着一个小数点和数值字符 0 次或多次。正则表达式包含 i 标志, 因此大小写会被忽略。

```js
let str = 'For more information, see Chapter 3.4.5.1';

let reg = /see (chapter \d+(\.\d)*)/i;
let res = str.match(reg)

console.log(res)


[
// 'see Chapter 3.4.5.1' 是整个匹配。
'see Chapter 3.4.5.1',

// 'Chapter 3.4.5.1' 被'(chapter \d+(\.\d)*)'捕获。
'Chapter 3.4.5.1',

// '.1' 是被'(\.\d)'捕获的最后一个值。
'.1',

// 'index' 属性 (22) 是整个匹配从零开始的索引。
index: 22,
input: 'For more information, see Chapter 3.4.5.1',
groups: undefined
]
```

<br>


<br>

### <font color="#C2185">str.matchAll()</font>
返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

**注意:**
必须配合 g 模式使用呢

参数:
正则表达式

返回值:
一个迭代器
(跟 match()方法不加g的返回结果是一样的 也有附加信息)
(不可重用, 结果耗尽需要再次调用方法, 获取一个新的迭代器)

迭代器 配合 for...of 和 ... 和 Array.from 使用 可以单独拿到每一个

示例:
```js
let str = "test1test2"

// 必须使用 g
let reg = /t(e)(st(\d?))/g

// res 是 迭代器 里面有单个详情的 匹配结果
let res = str.matchAll(reg)

/*  
res:
[
  [
      'test1',
      'e',
      'st1',
      '1',
      index: 0,
      input: 'test1test2',
      groups: undefined
  ],
  [
      'test2',
      'e',
      'st2',
      '2',
      index: 5,
      input: 'test1test2',
      groups: undefined
  ]
]
*/

// 可以将迭代器 转换为数组 或者使用数组的方法操作
Array.from(res).map(item => {
console.log(item)
})

for (let matched of res) {
console.log("matched", matched)
}

const array = [...str.matchAll(regexp)];
console.log(array[0])
```

<br>


<br>

### <font color="#C2185">str.padEnd(num:指定长度, "用什么字符来补位")</font>

<br>

### <font color="#C2185">str.padStart(num:指定长度, "用什么字符来补位")</font>
```js
'x'.padStart(5, 'ab')
```

返回值:
新的str

如果省略第二个参数 默认使用空格补全长度

应用场景:
为数值补全指定位数
```js
'1'.padStart(10, '0') // "0000000001"
```

提示字符串格式。
```js
'12'.padStart(10, 'YYYY-MM-DD')
```

<br>


<br>

### <font color="#C2185">str.replace(给定部分, 指定部分)</font>
将 str 中 给定部分 替换成 指定部分 并将结果返回


<br>

### <font color="#C2185">参数</font>

<br>

### <font color="#C2185">给定部分: 字符串 | 正则表达式</font>
- 如果 给定部分 仅是一个字符串 那么仅第一个匹配项会被替换
```js
let str = "this is a good job"

let res = str.replace("this", "hello")
console.log(res)
// hello is a good job
```


<br>

### <font color="#C2185">指定部分可以是 新内容(字符串) | Fn</font>

<br>

### <font color="#C2185">指定部分: 新内容</font>
- 指定部分(*指定部分为字符串的时候可以使用下面的特殊参数*)中可以内插一些特殊的变量名作为参数
- $$: 插入一个 "$"。
- $&: 插入匹配的子串。
- $`: 插入当前匹配的子串左边的内容。
- $': 插入当前匹配的子串右边的内容。
- $n: 第几组
- $<Name>: 分组名
```js
let str = "this is a good job"

let res = str.replace("this", "$$$&")
// 或者 上下两个是一个结果
let res = str.replace("this", "$$this")

console.log(res)
```


<br>

### <font color="#C2185">指定部分: Fn</font>
当我们指定部分为Fn的时候 当匹配指定后 该回调就会执行 回调中的返回值作为 替换字符串

如果第一个参数是正则表达式 并且为全局模式 那么这个回调将被多次调用 每次匹配都会被调用

Fn的形参
- match:
  匹配的内容

- s1, s2...:
  代表第n个括号匹配的字符串

- offset:
  匹配到的子字符串在原字符串中的偏移量
  比如: 如果原字符串是 'abcd', 匹配到的子字符串是 'bc', 那么这个参数将会是 1

- string:
  被匹配的原字符串。



<br>

### <font color="#C2185">返回值</font>
新的字符串



<br>

### <font color="#C2185">示例: 指定部分为 回调</font>
需求:
abc12345#$*%
abc - 12345 - #$*%

```js
let str = "abc12345#$*%"
let reg = /([a-z]+)(\d+)([^\w+])/

str = str.replace(reg, (_, s1, s2, s3) => {
return `${s1} - ${s2} - ${s3}`
})

console.log(str)
```



<br>

### <font color="#C2185">示例: 指定部分为 字符串</font>
需求: 交换字符串中的两个单词
这个脚本使用$1 和 $2 代替替换文本。
```js
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
// Smith, John
console.log(newstr);
```


<br>

### <font color="#C2185">示例: 大写字母前 + "-"</font>
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
```js
var newString = propertyName.replace(/[A-Z]/g, '-' + '$&'.toLowerCase());  // won't work
```

<br>


<br>

### <font color="#C2185">str.replaceAll(给定部分, 指定部分)</font>
将 str 中 给定部分 替换成 指定部分 并将结果返回

**注意:**
模式必须为 g

剩下的和上面的 replace() 一样

<br>


<br>

### <font color="#C2185">str.search()</font>
根据 正则 返回匹配部分 在str的首次出现的 索引

参数:
字符串 | 正则
如果传递字符串吗默认会被 new RegExp(regexp) 隐式地将其转换为正则表达式对象。

```js
let str = "abc12345#$*%abc"

let reg = /[a-z]/g

let res = str.search(reg)
console.log(res)    // 0
```


<br>

### <font color="#C2185">兼容性</font>
全红

<br>


<br>

### <font color="#C2185">str.slice()</font>
可以从字符串中截取指定的内容 不影响原字符串而是将截取到的内容返回

参数:
start:
开始索引(包括)

end:
结束索引(不包括)

如果省略 end 则从开始截取到最后
如果是负数 则从后面开始计算

start end 都可以传递负数 最后一位为-1

```js
let str = "abcderrtg";
let res = str.slice(0,2);

console.log(res);   //ab


let str = "abcderrtg";
let res = str.slice(-3);

console.log(res);   // rtg
```

<br>


<br>

### <font color="#C2185">str.substring()</font>
可以用来截取一个字符串和slice类似

参数:
start:
开始索引(包括)

end:
结束索引(不包括)

省略 end 就是从开始的全部

**注意:**
这个方法不能接受负值如果传递了一个负值则默认使用0
他会自动调整参数的位置如果第二个参数小于第一个则自动交换
(1 0) 自动交换 (01) 

<br>


<br>

### <font color="#C2185">str.substr()  --- 废弃了</font>
用来截取字符串对原数组没有影响

参数
1. 截取开始位置的索引
2. 截取的长度

<br>


<br>

### <font color="#C2185">arr.join()    将数组转为字符串</font>

<br>

### <font color="#C2185">str.split()   将字符串转为数组</font>
传入一个指定的分隔符 | 正则 根据指定部分将str拆分成数组

参数:
separator:
它可以是字符串 或者 正则表达式

如果传入空串 "" 则每个字符会被单独作为数组中的元素
如果不传参数 则整个字符串作为数组中的元素

limit:
一个整数
限定返回的分割片段数量, 如设置为3 则数组中有3个片段

```js
let str = "The quick brown fox jumps over the lazy dog";

let res = str.split(" ", 3)
console.log(res)

// [ 'The', 'quick', 'brown' ]

```
<br>


<br>

### <font color="#C2185">str.toLowerCase()</font>
把字符串转换为小写, 并返回 不会影响到原字符串

  str = "abcffsdf"
  result = str.toLowerCase();
  console.log(result);


<br>

### <font color="#C2185">str.toUpperCase()</font>
把字符串转换为大写, 并返回 不会影响到原字符串

<br>


<br>

### <font color="#C2185">str.trim() </font>
去除字符串两端空格


<br>

### <font color="#C2185">str.trimEnd()</font>
去除字符串末尾空格


<br>

### <font color="#C2185">str.trimStart()</font>
去除字符串开始空格


<br>

# 正则表达式
用于定义一些字符串的规则我们的计算机可以根据正则表达式来检查一个字符串是否符合规则, 或者将字符串符合规则的内容提取出来

正则表达式是一个对象所以第一步我们要创建正则表达式的对象


<br>

### <font color="#C2185">场景</font>
1. 验证表单
用户名表单只能输入英文字母, 数字 或者下划线 昵称输入框中可以输入中文

密码框的位数限制 6-16位

2. 过滤掉页面内容中的一些敏感词(替换)
3. 从字符串中获取我们想要的特定部分(提取)等
比如搜索框 输入两个字 提取相关信息



<br>

### <font color="#C2185">特点</font>
灵活性, 逻辑性 功能性非常的强
可以迅速的用极简单的方式达到字符串的复杂控制
```js
// 验证邮箱的正则表达式
^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$

// 验证用户名
/^[a-z0-9_-]{3,16}$/
```



<br>

### <font color="#C2185">创建正则表达式的二种方式</font>
正则表达式里面不需要加引号, 不管是数字型还是字符串型

let reg = /123/;
let reg = /今天天气真不错/



<br>

### <font color="#C2185">var reg = new RegExp(/正则/);</font>
通过构造函数的方式来创建正则表达式

var reg = new RegExp("a");
var str = "a";

语法:
var 变量 = new RegExp("正则表达式", "匹配模式");

严格区分大小写内容要被""包起来


在构造函数中可以传递一个匹配模式作用第二个参数
可以是:
i   忽略大小写
g   全局匹配模式
``` 
找这个字符串中有没有a并且忽略大小写
var reg = new RegExp("a");
var reg = new RegExp("a", "i");
```



<br>

### <font color="#C2185">var reg = /正则/</font>
通过字面量来创建正则表达式
语法:
var 变量 = /正则表达式/匹配模式(ig)
var reg = /a/i;    ==   var reg = new RegExp("a", "i");

使用字面量创建更加简单但是使用构造函数创建更加的灵活
使用构造函数创建因为它里面传递的是字符串所以可以传递变量查找变量更加灵活 而 使用字面量字面量没办法变化相当于写死了 



<br>

### <font color="#C2185">正则表达式参数</font>
有三种值

g :   全局匹配
i :   忽略大小写
gi:   全局匹配 + 忽略大小写




<br>

### <font color="#C2185">正则对象.test('字符串')</font>
创建一个正则表达式检查一个字符串中的情况

var reg = / /
reg.test()  



<br>

### <font color="#C2185">正则对象.exec("字符串")</font>
返回匹配的字符串
返回一个数组 找不到的话返回null

数组中第一个元素是 与正则表达式相匹配的文本
数组中第二个元素是 正则表达式的第 1 个子表达式相匹配的文本(如果有的话)

当我们使用()进行分组的时候 我们匹配的结果会体现在数组的的一个个元素上
``` 
let reg = /<a href="(.*)">(.*)<\/a>/igs
这就是两个组 () ()

我们在获取结果的时候就是 res[1] res[2]
```



<br>

### <font color="#C2185">正则表达式的组成</font>
一个正则表达式可以由简单的字符构成, 比如/abc/ 也可以是简单的特殊字符的组合, 比如/ab*c/, 其中特殊字符也被称为元字符 



<br>

### <font color="#C2185">边界符</font>
^           表示匹配行首的文本(以xx开始)
$           表示匹配行尾的文本(以xx结束)


<br>

### <font color="#C2185">字符类</font>
[]          有一系列字符可供选择, 只要匹配其中一个就可以了
let reg = /[abc]/; 
``` 只要是包含有a或者包含有b或者包含有c```

reg.test('andy')        // true
reg.test('baby')        // true
reg.test('color')       // true

reg = /^[abc]$/
``` 比如是以a开头以a结尾, 或者以b开头以b结尾, 或者以c开头以c结尾```



<br>

### <font color="#C2185">范围</font>
[A-z]       当中的任意字符
[0-9]       任意数字



<br>

### <font color="#C2185">字符组合</font>
[A-Za-z0-9]



<br>

### <font color="#C2185">内部取反</font>
[^ ]        除了    [^ab] 除了ab 检索其它 或者理解为 除了括号里的东西都可以



<br>

### <font color="#C2185">量词符</font>
量词符用来设定某个模式出现的次数
使用量词的时候中间不要有空格

*           重复零次或更多次
``` 
- 相当于 >= 0, 可以出现0次或很多次
- eg:   reg= /^a*$/     允许a出现0次或很多次
- reg.test('');         // true
- reg.test('a');        // true
- reg.test('aaaa');     // true
```

+           重复一次或更多次
``` 
- 相当于 >= 1, 可以出现1次或很多次
- eg:   reg= /^a*$/     允许a出现0次或很多次
- reg.test('');         // false
- reg.test('a');        // true
- reg.test('aaaa');     // true
```

?           重复零次或一次
``` 
- 相当于 1 || 0
- reg.test('');         // true
- reg.test('a');        // true
- reg.test('aaaa');     // false
```

{n}         重复n次
``` 
{3}     就是重复3次
- reg.test('');         // false
- reg.test('a');        // false
- reg.test('aaa');      // true
```

{n,}        重复n次或更多次
``` 
{3,}    大于等于3
```

{n,m}       重复n到m次
``` 
{3,16}  大于等于3 并且 小于等于16
```



<br>

### <font color="#C2185">括号总结</font>
[ ]       字符集合 匹配方括号中的任意字符     a || b || c   [abc]
{ }       量词符 里面表示重复次数

( )       表示优先级
``` 
let reg = /^abc{3}$/
str = abccc

let reg = /^(abc){3}$/
str = abcabcabc
```



<br>

### <font color="#C2185">预定义类</font>
预定义类指的是某些常见模式的简写方式

\w          任意字母和数字和_       [A-z0-9_]
\W          除了字母 和 数字 和 _   [^A-z0-9_]

\d          任意数字                [0-9]
\D          除了数字                [^0-9]

\s          空格(包括换行符 制表符 空格符) 相当于 [\t\r\n\v\f]
\S          除了空格                [^\t\r\n\v\f]

\b          单词边界
\B          除了单词边界




<br>

### <font color="#C2185">转义字符</font>
创建一个正则表达式检查一个字符串中是否含有 . 

var reg = /./;                  
``` 
//var reg = /\./;   要加上转义字符
```
console.log(reg.test("."));

``` 
需要注意的是, 假如用构造函数创建的话
reg = new RegExp("\.");
console.log(reg);       //结果就是一个. 没有\

总结字面量里有转义字符一个\就可以但是构造函数中得是\\ 
```


<br>

### <font color="#C2185">单词边界</font>
创建一个正则表达式检查一个字符串中是否含有单词child

reg = /child/
console.log(reg.test("child"));     //true
  
reg = /\bchild\b/
console.log(reg.test("hello children"));
``` 只能找child这个单词```



<br>

### <font color="#C2185">/指定字符(?=空格n)/</font>
匹配紧跟n的指定字符
``` 
<p>this is all ok this</p>

let reg = /is(?= all)/;
let res = pStr.match(reg)       // is
```


<br>

### <font color="#C2185">/指定字符(?!空格n)/</font>
匹配没有紧跟n的指定字符
``` 
<p>this this all ok this</p>

let reg = /this(?! all)/g;
let res = pStr.match(reg)    // ['this', 'this']
```



<br>

### <font color="#C2185">对目标文本后面的情况作为条件</font>
// 查找abc 条件是abc的后面是d
let reg1 = /abc(?=d)/g

// 查找abc 条件是abc的后面不是d
let reg2 = /abc(?!d)/g



<br>

### <font color="#C2185">对目标文本前面的情况作为条件</font>
// 查找d 条件是d的前面是abc
let reg3 = /(?<=abc)d/g

// 查找d 条件是d的前面不是abc
let reg4 = /(?<!abc)d/g


https://c.runoob.com/front-end/854

<br>


<br>

### <font color="#C2185">正则的小练习</font>

<br>

### <font color="#C2185">案例 用户名的验证 </font>

let reg = /^[a-zA-Z0-9_-]$/;
``` 
这个模式勇士孰能输入英文字母 数字 下划线 短横线但是有边界符 和 []
这就限定了只能 出现1次

reg.test('a')       // true
reg.test('1')       // true
reg.test('18')      // false
```

所以我们可以使用量词 让这个模式出现的次数是6-16之间 这样就能匹配多个字符
let reg = /^[a-zA-Z0-9_-]{6,16}$/;
``` 
reg.test('aaasdf'); // true
```



<br>

### <font color="#C2185">案例 验证座机号码</font>
座机号验证: 全国座机号 两种格式
010-12345678
0530-1234567

let reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;



<br>

### <font color="#C2185">案例 验证手机号</font>
创建一个正则表达式用来检查一个字符串是否是一个合法手机号
手机号规则:
1. 1 3 5670123
2. 以1开头
3. 第二位为3-9的任意数字
4. 3位以后任意数字

var phoneStr = "135670123"
var phoneReg = /^1[3-9][0-9]{9}$/;
console.log(phoneReg.test(phoneStr));



<br>

### <font color="#C2185">案例 验证邮箱</font>
电子邮件:

hello@abc.com.cn

任意字母数字下划线   .任意字母下划线   @   任意字母数字   .任意字母(2-5位)   .任意字母(2-5位)

``` 
/\w+\.\w*@\[A-z0-9]+\.\w{2,5}(\.\w{2,5})?/g

^\w{3, }(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$      //^$不要省略

var emailReg = /\w{3, }(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}/
var email = "hello@abc.com.cn";
console.log(emailReg.test(email));
```



<br>

### <font color="#C2185">案例 去除空格</font>
接收一个用户输入
var str = prompt("请输入你的用户名");

去除字符串中的多余空格: 使用空串来替换掉空格 替换的str.replace();

str = "     hello     ";
str.replace(/\s/, "");
``` 这样不行 输出str不会有变化因为不会影响到原字符串```

str = str.replace(/\s/, ""); 
``` 要把值再重新的赋回去```

console.log(str);
``` 就替换掉了一个空格 要加上g 才是全局匹配模式(/\s/g, "")```

假设有些空格我们不想删掉
str = "     he llo     ";
str = str.replace(/^\s*|\s*$/g, "");




<br>

### <font color="#C2185">案例: 将is前面的this选中 修改字体颜色为pink</font>
思路:
我们先利用正则把符合条件的文本选中 并且替换成带标签的样式 replace()
然后利用正则把目标文字选中 配合replace()替换到指定位置
最后把修改好的内容重新插入到标签中
``` 
<p>this is all ok this</p>

let p = document.querySelector('p');

// 1. 定义正则 检索什么字符
let reg = /^this/g

// 2. 获取标签内部的文本
let pContent = p.innerHTML

// 3. 将目标字符串提取出来, match的结果是数组 转成字符串
let targetTxt = pContent.match(reg) + '';

// 4. 将标签内部的文本 根据正则 替换成 指定样式
let newContent = pContent.replace(reg, `<span style='color:red'>${targetTxt}</span>`)

// 5. 将标签内部文本替换成修改好的样式
p.innerHTML = newContent
```
  

<br>

# 和正则相关的字符串方法


<br>

### <font color="#C2185">split()</font>
拆成数组
可以将一个字符串拆分为一个数组
方法可以传递一个正则表达式作为参数这样方法将会根据正则表达式去拆分字符串

如果不传递参数 代表将整个字符串转为数组

var str = "1a3f4g5h6h7j7"
var result = str.split(g);
``` 以g开始拆分字符串成数组 g没了```

var result = str.split(/[A-z]/);
``` 根据任意字母将字符串拆分```



<br>

### <font color="#C2185">search()</font>
检索
可以搜索字符串中是否含有指定内容
如果搜到指定内容则会返回第一次出现的索引如果没有搜索到返回-1

它可以接收一个正则表达式作为参数然后会根据正则表达式去检索字符串

str = "hello abc hello abc aec afc"
result = str.search("abc");

``` 搜索字符串中是否含有abc 或aec 或afc```
str = "hello abc hello abc aec afc"
result = str.search(/a[A-z]c/);



<br>

### <font color="#C2185">match(正则)</font>
提取
可以根据正则表达式从一个字符串中将符合条件的内容提取出来 封装到一个数组中返回
()里传递一个正则表达式


<br>

### <font color="#C2185">match返回的是数组</font>
返回的为数组 Array.isArrray()
match()会将匹配到的内容封装到一个数组中返回即使只查询到一个结果
``` 
默认情况下 我们的match 只会找到第一个符合要求的内容找到以后就停止检索
我们可以设置正则表达式为全局匹配模式这样就会匹配到所有内容
可以为一个正则表达式设置多个匹配模式且顺序无所谓 
```

var str = "1a3f4g5h6h7j7"
``` 把上面的变量中的所有字母提取出来```

result = str.match(/[A-z]/);    //提取出任意字母 提了个['a']
result = str.match(/[A-z]/g);   // ['a', 'f', 'g', 'h', 'h', 'j']



<br>

### <font color="#C2185">replace(被替换的内容, 新的内容)</font>
替换(和删除)
可以将字符串中指定的内容替换为新的内容
参数
第一个参数: 被替换的内容(正则选中的部分)
第二个参数: 新的内容

默认只会替换第一个设置为正则表达式后 修改为全局匹配模式g
空串是删除

str = "hello abc hello abc aec afc"
result = str.replace("/a/gi", "@_@");


<br>

### <font color="#C2185">过滤敏感词汇</font>
``` 
let text = document.querySelector('textarea')
let btn = document.querySelector('button');
btn.onclick = function() {
  div.innerHTML = text.value.replace(/激情/, '**');
}
```

<br>

# 引用数据类型:

js中的数值类型:
String
Number
Boolean
Null
Undefined
      
引用数据类型:
Object


<br>

### <font color="#C2185">例1:  </font>
```js
var a = 123;
var b = a;

a++;            // a自增后b的值是多少？
```

答案是b并没用发生改变a和b的值完全是独立的一个值发生了变化并不影响另外一个值 



<br>

### <font color="#C2185">例2</font>
```js
var obj = new Object();
obj.name = "孙悟空";

var obj2 = obj

console.log(obj.name);      //孙悟空
console.log(obj2.name);     //孙悟空

// obj.name 和 obj2.name都是孙悟空 接下来我们修改obj的name属性:

obj.name = "猪八戒";
console.log(obj.name);      // 猪八戒
console.log(obj2.name);     // ?  猪八戒
```

也就是说修改一个变量也影响到另一个了！ 这就是引用数据类型和基本数据类型的区别 




<br>

### <font color="#C2185">基本数据类型 和 引用数据类型的区别</font>
js中的变量都是保存在栈内存按照 变量和值的模式 保存


<br>

### <font color="#C2185">基本数据类型</font>
基本数据类型的值直接在栈内存中存储值与值之间是独立存在的, 修改一个变量并不会影响其他的变量解释如下
``` 
想象成两列的表左边的是变量右边的是值
var a = 123;
就是我在栈内存的左列存了个a右列存了值123

var b = a;
就是我在栈内存的左列存了个b右列的值是从a的值复制过来的
a和b都是123但是a的123和b的123没关系是互相独立的

a++;
a现在自增了此时对变量b产生影响了么？没有a爱咋变咋变和b没关系
```


<br>

### <font color="#C2185">结构图</font>
变量和值在内存中的结构

var a = 123;
var b = a;

  栈内存                              堆内存

属性名      属性值
a          123
b          123(从a的123复制来的)



<br>

### <font color="#C2185">引用数据类型</font>
引用数据类型的值(对象)是保存在堆内存中的每创建一个新的对象就会在堆内存中开辟出一个新的空间

而变量保存的是对象的内存地址(对象的引用)如果两个变量保存的是同一个对象引用时当一个通过一个变量修改属性时另一个也会受到影响, 解释如下:
``` 
想象成左边是栈内存为2列的表右边是堆内存为一个整体
var obj = new object();

首先是创建了一个变量所以把变量保存在左侧栈内存左列中的格子里值保存在哪？

一旦看见new就意味着 我要在堆内存里开辟出一个新的空间这个空间专门用来保存这个对象的
因为变量在栈内存中而对象在堆内存中所以它们之间没有关系要用变量就操作不了对象

既然对象保存在堆内存的一个空间里那么这块空间就会有一个对应的内存地址(比如是ox123)

这个内存空间的地址就是专门来保存 obj这个对象的

那堆内存中的对象和栈内存中的变量是怎么建立联系的？
所以在我们变量里保存的其实是内存地址

想象成 栈内存左列中为obj右列中为 对象的内存地址ox123
通过这个内存地址0x123把变量和对象联系起来了

也就是说对象本身是没有名字的有的只是一串内存地址
```


现在我往obj里添加了一个name属性叫孙悟空那么我是我往变量里面添加的么？
不是吧我们是往变量里对应的地址对应的对象里添加的 所以我们是通过地址在右侧堆内存中 刚才创建的对象空间中 添加的孙悟空 
```js
var obj = new object();
obj.name = "孙悟空";

// 如果:
var obj2 = obj;         //相当于把内存地址给了obj2
```


<br>

### <font color="#C2185">结构图</font>

      栈内存                                  堆内存
变量名              值                       
a                   123                    内存地址: 0x123
obj             内存地址: 0x123      ↗       name:孙悟空
obj2            内存地址: 0x123


接上假如:
obj2 = null;

相当于我修改了obj2的值之前存的是 内存地址现在为null但只是少了链接地址并没有对堆内存的空间产生影响只是断了联系 


**注意:**
两个一模一样的对象 做全等比较 也是false

<br>

# 简单类型 和 复杂类型
简单类型又叫做基本数据类型或者值类型, 复杂类型又叫做引用类型


<br>

### <font color="#C2185">值类型</font>
简单数据类型(基本数据类型), 在存储时变量中存储的是值本身, 因此叫做值类型

string number boolean undefined null

null 返回的是 空的对象
``` 
如果有个变量我们以后打算存储为对象, 暂时没想好放啥, 这个时候就给null
```



<br>

### <font color="#C2185">复杂数据类型 引用类型</font>
在存储时变量中存储的仅仅是地址(引用) 因此叫做引用数据类型, 通过new关键字创建的对象(系统对象, 自定义对象), 如Object Array Date等

<br>

# 堆和栈

<br>

### <font color="#C2185">栈(操作系统)</font>
简单数据类型 是存放在栈里面, 里面直接开辟一个空间 存放的是 值



<br>

### <font color="#C2185">堆(操作系统)</font>
复杂数据类型 首先在栈里面存放地址, 16进制表示 然后这个地址指向堆里面的 数据



<br>

### <font color="#C2185">简单类型传参</font>
函数的形参也可以看做是一个变量, 当我们把一个值类型变量作为参数传给函数的形参时, 其实是把变量在栈空间里的值复制了一份给形参, 那么在*方法内部对形参做任何修改, 都不会影响到外部变量*

```js
function fn(a) {
  a++;
  console.log(a);     11
}

let x = 10;

fn(x);

console.log(x);         10
```

**总结: 简单类型的传参是 值传递**

<br>


<br>

### <font color="#C2185">复杂数据类型的传参</font>
x 赋值给 p 是地址 两个变量指向同一个对象 其中一个修改后 另一个也有影响
```js
function Person(name) {
  this.name = name;
}

function f1(x) {
  console.log(x.name);        // 刘德华
  x.name = '张学友'
  console.log(x.name);        // 张学友
}

let p = new Person('刘德华')
console.log(p.name);            刘德华
f1(p);
console.log(p.name)             张学友
```

<br>

# 名词解释:


<br>

### <font color="#C2185">API</font>
预定义的函数, 给程序员提供的一种工具, 以便能更轻松的实现想要完成的功能


<br>

### <font color="#C2185">Web API</font>
是浏览器提供的一套操作浏览器功能 和 页面元素的API(BOM DOM)


<br>


# JS的执行机制


<br>

### <font color="#C2185">js是单线程</font>
js语言的一大特点就是单线程, 也就是说, 同一个事件只能做一件事, 这是因为js这门脚本语言诞生的使命所致, js是为了处理页面中的用户的交互, 以及操作DOM而诞生的

比如我们对某个DOM进行添加和删除操作, 不能同时进行, 应该先进行添加, 之后再删除 要不这个代码还没有呢 怎么删



<br>

### <font color="#C2185">单线程就意味着</font>
所有任务需要排队 前一个任务结束, 才会执行后一个任务, 这样所导致的问题是:
如果某一个js代码执行的时间过长, 后面的代码就需要排队, 等好长时间 这样就会造成页面的渲染不连贯, 导致页面渲染加载阻塞的感觉



<br>

### <font color="#C2185">同步 异步</font>
为了解决前一个代码执行完 才能 执行后一段代码的问题, 我们利用了多核cpu的计算能力, HTML5提出了web worker标准, 允许js脚本创建多个线程, 于是js中出现了同步和异步


<br>

### <font color="#C2185">同步</font>
前一个任务结束后再执行后一个任务, 程序的执行顺序与任务的排列顺序是一致的, 同步的
比如: 做饭的同步做法, 我要烧水煮饭, 等水开了(10分钟) 再去切菜 炒菜


<br>

### <font color="#C2185">异步</font>
在做一件事情的时候, 因为这件事情会花费很长时间, 在做这件事的同时, 你还可以去处理其他的事情, 比如做饭的异步做法, 我们在烧水的同时, 利用这10分钟去切菜 炒菜


<br>

### <font color="#C2185">总结</font>
本质区别就是 这条流水线上各个流程的执行顺序不同 


js为了解决排队或者等待时间较长的问题 把我们的任务分为了两大类


<br>

### <font color="#C2185">同步任务</font>
同步任务都在*主线程上执行*, 形成一个执行栈


<br>

### <font color="#C2185">异步任务</font>
js的异步是通过回调函数实现的
异步任务相关的回调函数 添加到 *任务队列*中(任务队列也成为消息队列)

常见的异步任务
普通事件,     onclick
资源加载,     load error
定时器,       setInterval


```js 
console.log(1);

setTimeout(function(){
  console.log(2);
}, 0);

console.log(3);
```

执行栈                      任务队列        
console.log(1)             function(){ console.log(3) }

setTimeout(fn, 0)     ↗

console.log(3)



<br>

### <font color="#C2185">js的执行顺序</font>
先执行 执行栈中的同步任务
异步任务(回调函数)先放到 任务队列中 先不执行

一旦执行栈中的所有同步任务执行完毕, 系统就会按次序读取任务队列中的异步任务, 于是被读取的异步任务结束等待状态, 进行执行栈(放入执行栈的下方代码的后面), 开始执行
``` 
任务队列有点像应急车道
执行栈有点像主车道
```

<br>



# JSON
创建一个对象
```js
// 以前说过 写属性名的时候 可以加引号或者不加 加了也不算错 name == "name"
var obj = {
name: "孙悟空"
};

var obj = {
"name": "孙悟空",
"age": 18,
"gender": "男"
};

console.log(obj.age);
```



<br>

### <font color="#C2185">obj 和 json之间的关系</font>
以后我们开发的时候 不是只有一个页面 往往有前端和后台服务器, 网页和服务器之间要交互数据

现在我要把上面的对象传递给服务器 服务器是java写的能传过去么？
不能传 js 和 java互相不认识, 也就是js中的对象只有js自己认识其他的语言都不认识
现在的问题就是 需要把对象传递给java, 能不能将这个对象 转换成 所有语言都认识的东西, 
既然对象不认识 能不能将这些东西转换成 大家都认识的东西呢 
比如 number string boolean, 那给对象 转换为 字符串

```js
var obj = {
"name":"孙悟空",
"age":18,
"gender":"男"
};

``` 转换```

var obj = "{
"name":"孙悟空",
"age":18,
"gender":"男"
}"
```


<br>

### <font color="#C2185">JSON就是一个特殊格式的字符串这个字符串可以被任意的语言所识别</font>
并且可以转换为任意语言中的对象 JSON在开发中主要用来*数据的交互*


<br>

### <font color="#C2185">JSON</font>
JavaScript Object Notation JS对象表示法
JSON和JS对象的格式一样只不过JSON字符串中的属性名必须加双引号, 其他的和JS语法一致


<br>

### <font color="#C2185">JSON的写法</font>
1. 对象 {}
```json
var obj = '{"name":"孙悟空", "age":18, "gender":"男"}';
```

2. 数组 []
```js
var arr = '{1,2,3}'; 
```


<br>

### <font color="#C2185">JSON中允许的值</font>
1. 字符串
2. 数值
3. 布尔值
4. null
5. 对象(普通对象)
6. 数组

**函数和undefined不行 函数只有js自己认识**

json对象写好了数据到后台了 那怎么才能用？
要是想取的话 得把
var obj = '{"name":"孙悟空", "age":18, "gender":"男"}'

转换为对象, 我需要一个方法 将一个字符串 转换为 对象
将JSON字符串转换为JS中的对象, 在JS中为我们提供了一个工具类就叫JSON 这个对象可以帮助我们将一个JSON转换为JS对象也可以将一个JS对象转换为JSON



<br>

### <font color="#C2185">json``` js对象</font>

<br>

### <font color="#C2185">JSON.parse()</font>
可以将以JSON字符串转换为js对象
它需要一个JSON字符串作为参数 会将该字符串转换为JS对象并返回
```js
var o = JSON.parse(json);   //它的返回值应该是对象
console.log(o.age);

// var obj3 = {name:"猪八戒" , age:28 , gender:"男"};
```

<br>


<br>

### <font color="#C2185">JS对象 -``` JSON</font>

<br>

### <font color="#C2185">JSON.stringify()</font>
可以将一个JS对象转换为JSON字符串
需要一个js对象作为参数会返回一个JSON字符串
```js 
var str3 = {"name":"孙悟空","age":18,"gender":"男"};

// JSON这个对象在IE7和以下浏览器不支持所以在这些浏览器中会报错
let json = JSON.stringify(str3);
```



<br>

### <font color="#C2185">IE7和以下浏览器</font>

<br>

### <font color="#C2185">eval()</font>
这个函数 会将传入的字符串当做js代码来解析执行 并返回结果

**注意:**
如果使用eval()执行的字符串中含有{},它会将{}当成是代码块
如果不希望将其当成代码块解析则需要在字符串前后各加一个()
```js
var str = '({"name":"孙悟空","age":18,"gender":"男"})';
```

eval()这个函数的功能很强大可以直接执行一个字符串中的js代码
但是在开发中尽量不要使用首先它的执行性能比较差然后它还具有安全隐患

示例:
```js
// 这是个字符串吧 字符串中是alert代码吧
var str2 = "alert('hello');";

// 但是我就想让上面的代码执行, 这时候我们就可以用eval()
eval(str2);


// 那现在我想把var str = '{"name":"孙悟空","age":18,"gender":"男"}'
eval(str);      //报错了 缺少分号 问题在{}这
  
var str = '({"name":"孙悟空","age":18,"gender":"男"})';
var obj = eval("("+str+")");
```

如果需要兼容ie7以及以下的json操作则可以通过引入一个外部的js文件来处理, 外部文件 叫 *json2.js*




<br>

### <font color="#C2185">JSON特殊的使用技巧</font>


<br>

### <font color="#C2185">技巧1: 对象的深拷贝</font>

<br>

### <font color="#C2185">JSON.parse(JSON.stringify(obj)</font>
利用 JSON API 实现对象的深拷贝
```js
let obj = {
name: "sam",
job: {
  frontend: "vue"
}
}

let _obj = JSON.parse(JSON.stringify(obj))
```

<br>

**注意1!!!!!!:**  
JSON.parse(JSON.stringify(obj))这种方式 当数据的值为 undefined 的时候 该字段将会被舍弃


**注意2!!!!!!:**  
JSON.parse(JSON.stringify(obj))这种方式 在循环引用: JSON.stringify() 会在传入递归数据结构时抛出异常。

<br>


<br>

### <font color="#C2185">技巧2: 数据的格式化</font>

<br>

### <font color="#C2185">JSON.stringify(obj, null, 2)</font>

<br>


# 严格模式

js除了提供正常的模式外还有严格模式(strict mode)
es5的严格模式是采用具有限制性js变体的一种方式, 即在严格条件下运行js代码

ie10以上才支持


<br>

### <font color="#C2185">严格模式对正常的js语义做了一些更改</font>
效果js语法的一些不合理 不严谨的地方 减少了一些怪异行为
消除代码原型的一些不安全的地方, 保证代码运行的安全
提高编译器效率 增加运行速度
禁用了es的未来版本中可能会定义的一些语法, 为未来新版本的js做好铺垫, 比如一些保留字 class enum export extends import super不能做变量名


<br>

### <font color="#C2185">开启严格模式</font>
可以在js中开启
可以在个别函数内部开启

因此在使用时, 我们可以将严格模式分 为脚本开启严格模式 和 为函数开启严格模式两种情况


<br>

### <font color="#C2185">为脚本开启严格模式</font>
为整个脚本文件开启严格模式, 需要在所有语句之前放一个特定语句

```js
"user strict";

<script>
  "user strict";
</>

// 或者

<script>
  (function(){
      "user strict";
      // 把所有的代码都写在这个立即执行函数里面
  })()
</>
```


<br>

### <font color="#C2185">为函数开启严格模式</font>
给某个函数开启严格模式, 需要把 "user strict"; 声明放在函数体所有语句之前
```js
function fn() {
  "user strict";

  函数体;
}
```

<br>

# 严格模式中的变化


<br>

### <font color="#C2185">1. 变量规定</font>
在正常模式中 如果一个变量没有声明就被赋值, 默认是全局变量, 严格模式禁止这种用法, 变量都必须先用var命令声明, 然后再使用
``` 变量名先声明 再使用```


<br>

### <font color="#C2185">2. 严禁删除已经声明的变量</font>
例如 delete x; 语法是错误的
``` 不能随意删除已经声明好的变量```


<br>

### <font color="#C2185">3. 全局作用域中函数中的this是undefined</font>
以前在全局作用域函数中的this指向window对象
严格模式下全局作用域中函数中的this是undefined


<br>

### <font color="#C2185">4. 严格模式下, 构造函数不加new调用 this指向undefined 会报错</font>
以前构造函数时, 不加new也可以调用当做普通函数 里面this指向全局对象
加了this去调用还是指向创建的对象实例
```js
// 不加new调用作为普通函数调用 这时的this指向window
function Star() {
  this.sex = 'nan'
}

Star();
console.log(window.sex)     // 因为this指向window所以可以输出 男
```


<br>

### <font color="#C2185">5. 定时器里面的this还是指向window</font>



<br>

### <font color="#C2185">函数的变化</font>
函数不能有重名的参数
```js
// 以前是可以这样的
function fn(a, a) {
  console.log(a + a);
}
fn(1, 2)    // 4
```
首先不在严格模式下是可以声明重名参数的

其次上面打印出4到的原因是
实参1 传递给a
a = 1
实参2 传递给a
a = 2

现在都被改成 a=2 a=2 所以结果是4

函数必须声明在顶层, 新版本的js会引入'块级作用域' 为了与新版本接轨, 不允许在非函数的代码块内声明函数
非函数代码块
```js 
if(true) {
  function fn() {}
  fn();               !!!语法错误
}

for(let i=0; i<5; i++) {
  function fn() {}
  fn();               !!!语法错误
}
```


<br>

### <font color="#C2185">严格模式中也不允许使用8进制</font>

<br>

# 高级函数
高阶函数是对其它函数进行操作的函数, 它接收函数作为参数, 或将函数作为返回值输出
```js    
// 参数是个函数
function fn(callback) {
  callback&&callback();
}
fn(function() {alert(1)});

// 函数作为返回值
function fn() {
  return function() {}
}
fn()
```

函数也是一种数据类型, 同样可以作为参数, 传递给另一个参数使用, 最典型的就是作为回调函数
```js 
function fn(a, b, callback) {
  console.log(a+b);

  // 这条语句写在最下面
  callback && callback();
}

fn(1,2,function() {

  // 当fn中的代码执行完毕才会执行回调函数
  console.log('我是最后调用的');
})
```

<br>

# 什么是闭包
闭包(closure)指:
有权访问另一个函数作用域中变量的函数 被访问的变量所在的函数就是闭包函数


<br>

### <font color="#C2185">闭包的作用</font>
延伸了变量的作用范围

闭包是一个函数
简单的理解就是 一个作用域可以访问另外一个函数内部的局部变量

```js
// 我们fun这个函数作用域 访问了另外一个函数 fn 里面的局部变量 num 此时就满足了闭包的条件

function fn() {
  let num = 10;               // 访问了这个作用域中的变量
                                      ↑
  function fun() {                    ↑
      console.log(num)        // 这个作用域
  }
  fun()
}
fn()
```

<br>


<br>

### <font color="#C2185">fn外面的作用域可以访问fn内部的局部变量</font>
```js
function fn() {
  let num = 10;
  function fun() {
      console.log(num)
  }
  
  return fun;
}
let f = fn();

类似于:

f = function fun() {
  console.log(num)
}

// 这里f里存的就是一个函数, 既然是函数就可以调用 这里是就全局作用域 访问到了局部作用域里的值
f();
```


我们通过几个例子观察下闭包


<br>

### <font color="#C2185">例子0</font>
一个函数, 可以访问它相同的作用域的外部变量
```js
var a = 0;

function m1(){
  console.log(a++);
};
```

\\\\    ↓    \\\\

接下来有这么两个函数, m2函数显然是不能访问到变量a的 因为不在一个作用域里, *那怎么才让m2访问到m1中的私有变量呢?*
```js
function m1(){
  var a = 100;
  console.log(a++);
};

function m2(){
  console.log(a++);
}
```
\\\\    ↓    \\\\

为了是m2能够访问到m1中的私有变量, 我们可以这样
1. 在 m1 的内部创建 m3 函数, 这是m3函数访问变量a肯定是没有问题的
```js
function m1(){
  var a = 100;

  // 或者在这写也可以
  return function m3(){
      console.log(a++);
  }

  // 一般这么写 然后我们把 m3 当做对象 return 出去, 在编程中函数可以被当做对象使用
  return m3;
};
```

2. 我们在全局范围内调用 m1
```js
function m1(){
  var a = 100;

  function m3(){ 
      console.log(a++);
  }
  return m3;                         
};

var _m3 = m1();
// 我们再全局范围内又做了一个变量_m3 而_m3是和m3是等价的, 可以理解为在全局范围内给m3创建了一个快捷方式
// 由于作用域的关系, m2 是可以条用 _m3 的

function m1(){
  var a = 100;

  function m3(){ 
      console.log(a++);
  }
  return m3;                         
};

var _m3 = m1();

function m2(){
  _m3();
}
// 由于作用域的关系, m2可以调用m3等价于m2间接访问了变量a 在这个过程当中函数m3 起到了最关键的作用, 函数m3就是一个闭包
```

垃圾回收:
正常来讲 当m1执行结束的时候, 内部变量a就应该被回收, 之所以没有被回收 因为m3还在引用a




<br>

### <font color="#C2185">例子1</font>
```js
function fn(){
  var a = 2;

  function fn2(){
      console.log(a);
  };

  return fn2;
};

// 我们将fn()的返回值(也就是fn2函数赋予一个变量func)  然后我们实际调用func(), 理所当然的调用fn2(), 只不过通过不同的标识符

var func = fn();
func();
/*  
  fn()在执行后按理来说它内部的作用域应该被垃圾回收机制回收, 但因为fn2的声明位置在fn的内部, fn2()拥有一个词法作用域闭包, 覆盖着fn()的内部作用域(fn2的作用域气泡 覆盖着fn的作用域气泡)

  fn2()的作用域闭包为了使fn2()以后在任意时刻都能引用这个作用域而保持它的存在, 这就叫做闭包

  当func()在调用时(调用的其实是fn2的内部函数), fn2理所应当的拥有对编写fn2时的词法作用域的 访问权, 所以fn2()可以访问到 a
*/
```


<br>

### <font color="#C2185">例子2</font>
```js
for(var i=0; i<5; i++){

  setTimeout(function timer(){
      cosole.log(i)
  },i*1000)

}
```

我们的需求是 每隔一秒分别打印数字, 1 2 3 4 5 一秒一个
但是 实际得到的结果却是打印了5个6, 一秒一个

上面for循环的终止条件是, i不<=5, 也就是当i满足终止循环的条件时,i的值为6
所以输出的结果反映的是 i在循环结束后的最终值 那上面的代码缺少了什么? 让我们不能打印出需求

for循环在每次进行时, 都会 捕捉 一次 i, 循环体每执行一次, 就会创建一个函数, 执行5次就会创建5个函数, 虽然这5个函数在循环中分离定义, 由于作用域的工作方式, 他们都闭包在同一个共享的全局作用域中, 而事实上只有一个i, 这样所有的函数共享一个i的引用


<br>

### <font color="#C2185">↑ 修改下上面的代码, 这样会好用么?</font>
```js
for(var i=0; i<5; i++){

  (function(){
      setTimeout(function timer(){
          cosole.log(i)
      },i*1000)
  })()

}
// 依然不好用, 这样做确实把 超时函数 放在了一个封闭的函数作用域中, 但有用一个被闭包的 空的作用域 是不够的, IIFE只是一个空的什么都不做的作用域, 它内部还需要一些东西 才能变得对我们有用 IIFE需要一个自己的变量 每次循环时都能持有一份对 i 的值的拷贝

for(var i=0; i<5; i++){
  (function(){

      var j = i;          -```  这里

      setTimeout(function timer(){
          cosole.log(j)
      },j*1000)
  })()
}
```


<br>

### <font color="#C2185">还可以改成这样 ↓ </font>
```js
for(var i=0; i<5; i++){
  (function(j){
      setTimeout(function timer(){
          cosole.log(j)
      },j*1000)
  })(i)
}
```


<br>

### <font color="#C2185">实例1</font>

<br>

### <font color="#C2185">需求: 点击li 输出当前li的index</font>
```js
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i=0; i<lis.length; i++){
// 给li绑定点击事件
lis[i].onclick = function(){

  // 在这个事件回调用不能直接打印 i
  // 因为事件回调是异步任务, 循环是同步任务循环会立马执行, 停止循环的条件是5, 所以点击任何的 li 输出的结果都会是5
  console.log(i);
};
}
```


<br>

### <font color="#C2185">那为了达到我们的需求, 我们会给lis[i] 添加一个index属性</font>
```js
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i=0; i<lis.length; i++){

lis[i].index = i;               // 给lis[i] 添加了 index 属性

lis[i].onclick = function(){
  console.log(this.index);
};
}
```


<br>

### <font color="#C2185">闭包的方式 得到 li 的当前index</font>
```js
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i=0; i<lis.length; i++){

// 立即实行函数 立马会执行 这里利用for循环创建了4个的立即执行函数 立即执行函数就相当于独立的作用域 块级
(function(){    
          
})()      

}
```

\\\\    ↓   \\\\ 
```js
for(var i=0; i<lis.length; i++){

(function(i){       // 2, 定义形参i 用来接收实参 IFEE的i的值是实参传递进来的

  console.log(i); // 4, 这时打印i 就会是0 1 2 3 4

})(i)               // 1, 这个小括号可以接收一个参数, 我们把 i 传递进去
}
```

3, 当第一次循环时 i=0, 我们就会把0 传递到IFEE的实参中, 这时实参i就为0
5, 因为每次循环都会创建一个立即执行函数 第一轮循环时 把i=0传递进了IFEE中
打印出了0
第二轮循环时, 再次创建一个IFEE, 并把i=1传递进了IFEE中, 打印出了1 ...

这个IFEE每次都会创建IFEE, 而IFEE存的是当次循环里面的i值

\\\\    ↓   \\\\ 
```js
for(var i=0; i<lis.length; i++){

(function(i){
  lis[i].onclick = function(){
      console.log(i);
  };
})(i)
}
```

那有闭包的产生么?
有, 事件回调是一个函数, IFEE也是一个函数, 现在事件回调里的 i 是IFEE中的变量 也就是里面的函数, 使用了外部函数的变量 这就是一个闭包

<br>


<br>

### <font color="#C2185">实例2:循环中的setTimeout()</font>
需求: 3秒钟后, 打印所有li中的内容
```js
var lis = document.querySelector('.nav').querySelectorAll('li');

for(var i=0; i<lis.length; i++){

setTimeout(function(){

  console.log(lis[i].innerHTML);
  // cannot read property 'inndeHTML' of undefind

},3000)
}
```

定时器的回调函数也是异步任务, 所以还是会出现和实例1中一样的情况 解决办法还是一样的, 我们每次循环的时候传递进去独一无二的i就可以了

\\\\    ↓    \\\\
```js
for(var i=0; i<lis.length; i++){

(function(i){
  setTimeout(function(){
      console.log(lis[i].innerHTML);
  },3000)
})(i)

}
```
只要在IFEE中的任何函数都可以使用IFEE中的变量, 这就是闭包的应用

<br>


<br>

### <font color="#C2185">实例3:打车价格</font>
需求: 打车起步价格为13(3公里内), 之后每多一公里增加5块钱, 用户输入公里数就可以计算打车价格, 如果有拥堵的情况, 总价格要多收10块钱的拥堵费

之前我们都会先声明一个函数, 那这个函数最终一定会执行, 又要声明又要调用很麻烦, 所以我们就直接写在匿名函数里面, 就不需要调用了
function fn(){};
fn();

\\\\    ↓     \\\\

```js
var car = (function(){

let start = 13;     //起步价
let total = 0;      //总价

// 这里有两个功能: 1 正常价格, 2 拥堵时的价格, 既然是两个函数我们可以这样
return {
  // 1
  price:function(n){      //n为用户传递进来的参数, 代表公里数

      if(n<=3>){
          total = start;
      }else{
          total = start+(n-3)*5
      }

      return total;       // 最终把总价返回
  },

  // 2
  yd:function(flag){
      // 这里我们要判断是否是拥堵, 如果拥堵在原价上加10, 如果没有是原价
      return flag ?total+10 :total;
  }
}
})()

car.price(5);
car.yd(true);

```

这是一个立即执行函数, 一执行后返回了两个函数, 既然有返回值, 我们就可以创建变量把返回值接回来, 我们定义了一个car 来接收返回的对象
car里有两个方法, 我们可以通过点的方式使用这两个方法

<br>


<br>

### <font color="#C2185">名词解释</font>

<br>

### <font color="#C2185">词法作用域</font>
也就是在词法阶段定义的作用域.
词法作用域意味着作用域是由书写代码时函数声明的位置来决定的.

js中其实只有词法作用域并没有动态作用域
this的执行机制让作用域表现的像动态作用域 this的绑定是在代码执行的时候确定的.


<br>

### <font color="#C2185">迭代</font>
迭代计算是指迭代计算是重复计算工作表直到满足特定数值条件为止


<br>

### <font color="#C2185">异步任务主要的三种情况</font>
1. 回调函数
2. 定时器中的回调函数
3. 事件中的回调函数
4. ajax中的回调函数

异步任务多是, 只有你触发了才会执行 比如定时器(setTimeout(function(){}.3000)) 3秒后 才执行,没有到时间是不会执行的,即使我们把3000改为0, 它也不立马执行
而是把函数放到任务队列里

<br>


<br>

### <font color="#C2185">思考题 下面的题中有没有闭包的产生</font>
```js
let name = 'the Window';
let obj = {
  name:'my object',
  getNameFunc: function() {
      return function() {         // 匿名函数中的this指向window
          return this.name;
      }
  }
}

console.log(obj.getNameFunc()())      // the Window
let f = obj.getNameFunc();

// 相当于
f = function () {
  return this.name;
}

// 普通函数调用this指向window
f();    
``` 


<br>

### <font color="#C2185">↑ 对上解答 没有闭包的产生 因为内部函数没有用到外部函数的变量</font>

<br>

# 闭包 (另一个老师的理解)

<br>

### <font color="#C2185">如何产生闭包？</font>
当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时就产生了闭包
```js
function fn1(){
  var a = 2;
  function fn2(){
      // 这里我引用了外部函数的变量a fn2中的闭包里才有a属性
      console.log(a);     
  };
};

fn1(); 
```
假如我只执行fn1 不执行fn2 fn2中的console能输出么？ 
那fn2这个函数对象有没有产生 产生了

<br>


<br>

### <font color="#C2185">闭包到底是什么？</font>
我们可以通过chrome工具 通过debug调试来查看 
理解一: 闭包是嵌套的内部函数(绝大部分人)
理解二: 包含被引用变量(函数)的对象(极少数人)

注意: 闭包存在于嵌套的内部函数中



<br>

### <font color="#C2185">产生闭包的条件？ </font>
执行函数定义就会产生闭包(不用调用内部函数)
函数嵌套, 内部函数引用了外部函数的数据(变量/函数) 还要执行外部函数

<button>测试1</button>
<button>测试2</button>
<button>测试3</button>

需求: 点击某个按钮提示 点击的是第N个按钮

```js
var bts = documen.getElementsByTagName("button");

/*
  这里的bts是个数组么？不是 它是一个伪数组 而且.length不是一个固定的值而是在for循环内每次需要通过计算才能得到结果
  如果写bts.length要计算多遍
  那怎么做呢？ 要不然拿出去在外边定义
*/
for(var i=0; i<bts.length; i++){        
  var obj = bts[i];
}


for(var i=0, length=bts.length; i<length; i++){

  // 减少多次计算, 提供性能 把bts[i] 存放到一个变量里面
  var btn = bts[i];
  btn.onclick = function(){
      
      // 这么写不对因为i是从0开始的
      alert("第"+  i +"个")
      alert("第"+  (i+1) +"个")   
  }
}

/*
  向上面这么写完点击按钮后全是第4个 那就说明i是3, 因为
  我们的函数在后面的某一个时刻才执行 当我这个函数执行的时候 循环已经结束了
  整个过程中产生了几个i 就一个i i是一个全局变量 在外面也能看到i 而我的函数还是在for循环执行完毕之后才执行, for循环执行完毕后 i是3, 也就是说这种写法不行
*/

/*
  循环遍历加监听 肯定是要加的 就是最后我怎么才能得到一个正确的i呢？
  我们要把每一个i 要跟 btn 对应起来吧 也就是说 每一个btn都要知道自己的下标才行, 那我就把下标 等于 i
  btn.index = i;
*/

for(var i=0, length=bts.length; i<length; i++){
  var btn = bts[i];
  // 将btn所对应的下标 保存在btn上
  btn.index = 1;
  btn.onclick = function(){
      alert("第"+  (this.index+1) +"个")   
}   
```


<br>

### <font color="#C2185">换个写法:  下面的写法就是闭包</font>
```js
for(var i=0, length=bts.length; i<length; i++){
  (function(i){
      // 我把这段代码放在了 匿名函数自调用 里面
      var btn = btns[i];                  
      btn.onclick = function(){
          alert("第"+  (i+1) +"个")  
      };
  })(i);
}
```

<br>


<br>

### <font color="#C2185">闭包的常用写法</font>
```js
function aaa() {
var a = 1;

return function(){
  a++;
  alert(a)
}
}

var bbb = aaa();
bbb();          // 2
bbb();          // 3
bbb();          // 4
```


<br>

### <font color="#C2185">函数表达式的写法</font>
```js
var aaa = (function () {
  var a = 1;
  return function () {
      a++;
      alert(a)
  }
})()

aaa()       // 2
aaa()       // 3
aaa()       // 4
```


<br>

### <font color="#C2185">常见的闭包</font>

<br>

### <font color="#C2185">将函数作为另一个函数的返回值</font>
```js
function fn1(){
  function fn2(){

  };
  // 将内部函数作为外部函数的返回值
  return fn2;     
};
fn1();
```

上面的还没有产生闭包 正常要在fn1里定义一个变量然后fn2里引用这个变量才会产生闭包 
这次我换个引用方式
```js
function fn1(){
  var a = 2;

  function fn2(){
      a++;
      // 引用就是使用
      console.log(a);     
  };
  return fn2;     
};
fn1();
/*
  我外部执行得到了什么？ 得到了整个fn2
  那我可以用一个变量来存 没有输出a 没执行呢 但闭包产生了
  如果没有闭包 这行一执行var a = 2 就消失了
*/

// 外部函数调用了一次
var f = fn1();

// 实际上是执行fn2 相当于 fn1()() 也就是调用的内部函数
f();        // 3       
f();        // 4       

// 这里a在不断的累加 那就说明了一个问题 a没有消失 a是一个局部变量吧 是fn1里的局部变量
// a什么时候产生 执行fn1的时候产生 局部变量在函数调用的时候产生调用结束后就会死亡 但是如果是3和4 那它就没有死亡
```


<br>

### <font color="#C2185">上述的代码块中一共产生了几个闭包</font>
一个
如果我想产生两个闭包 该怎么办？ 就看你产生了几个内部函数对象 就看你调用了几次外部函数
``` 
fn1() 这么一执行 我又把内部函数执行一次吧 说白了 怎么看闭包产生了几个 就看外部函数执行了几次
因为你在执行外部函数的时候 才会执行内部函数对象 跟内部函数执行几次没有关系,     那也就是说 我在反复执行内部函数过程中 我闭包里的数据并没有消失 为什么没有消失呢？
```



<br>

### <font color="#C2185">将函数作为实参传递给另一个函数调用</font>
```js
function showDelay(msg, time){
  setTimeout(function(){
      alert("msg");
  }, time)
}
showDelay('atguigu', 2000);
```

有没有闭包？ 有 首先有外部函数 有内部函数 内部函数引用了外部函数变量 是因为msg 不是因为time

<br>

# 闭包的作用
1. 使用函数的变量在函数执行后仍然存活在内存中(延长了局部变量的生命周期)
2. 让函数外部可以操作(读写)到函数内部的数据(变量/函数)
```js
function fn1(){
  var a = 2;
  function fn2(){
      a++;
      console.log(a); 
  };

  // 把fn2暴露出去 让外部能看见
  return fn2;                      
};
fn1(); 
var f = fn1();  
f();        // 3       
f();        // 4  

/*
  如果没有闭包 函数一执行完 局部变量就会立即释放 后面再想访问就不行了
  作为局部变量在外面看不见但事实上 我们却能在外部操作局部变量

  我们又看不见���部变量 但我们能用闭包的技术能够在外部操作局部变量 相当于间接可以访问, 譬如 我现在在函数内部有一个变量希望外部能读到这个a 但不希望被改变
*/
```

> 问题:
1. 函数执行完后函数内部声明的局部变量是否还存在？
一般情况下是不存在的 但是存在于闭包中的变量才可能存在

2. 在函数外部能直接访问函数内部的局部变量么？
不能但是通过闭包这个技术 让外部操作
```js
function fn1(){
  // 这里的a 在函数执行后还存在么？ 存在 因为在闭包里
  var a = 2;

  function fn2(){
      a++;                        
      console.log(a); 
  };
  /*
      那这个fn2整个函数对象还在不在？ 不在了 没有人引用它 成为了垃圾对象
      括号前的fn2相当于一个局部变量 闭包里没有fn2 所以自动释放
  */


  // fn3呢？有自动释放么？fn3也不在闭包里 闭包里只有a 所以fn3这个变量在函数执行完后会被自动释放
  /*
      那你说连fn3都自动释放了函数对象不成为垃圾对象了么？可函数对象没有成为垃圾对象 为什么？
      是哪行导致fn3没有被释放的？ 是第11708行 我用变量f 指向了 11706行console.log(a);  函数对象
      也就是说闭包还存在没消失的原因是谁导致的？var f = fn1(); 中的f导致的
  */
  function fn3(){
      a--;                    
      console.log(a);             
  };
  
  return fn3;
  /*
      把fn3暴露出去(把内部函数 return)     return fn3 实际上 return的fn3的地址吧 里面保存的内容一旦返回后 fn3本身这个变量还在不在
      fn3本身不在了fn3虽然不在了但并不代表我函数对象成为垃圾对象了 为什么？因为 f 引用着
      只要有一个引用对象 指向着 这个对象这个对象是不会成为垃圾对象的 
  */
                    
};

fn1(); 

var f = fn1();          
f();        // 1       
f();        // 0  

/*
  这个函数对象关联这个闭包闭包里有a 关键点在于var f = fn1() f把返回值存起来了 
  假如这里改成fn1(); 后 执行完 fn3就不会存在了 
*/
```

<br>

# 闭包的生命周期


<br>

### <font color="#C2185">产生:  </font>
在嵌套内部函数定义执行完时就产生了(不是在调用)定义执行不是函数执行 只是创建了函数对象


<br>

### <font color="#C2185">死亡:  </font>
在嵌套的内部函数成为垃圾对象时
```js
function fn1(){
  // 在这行闭包就存在了 因为函数提升 内部函数对象已经创建了
  var a = 2;

  function fn2(){ 
      a++;             
      console.log(a); 
  };

  return fn2;                             
};

// 这时候产生了闭包
var f = fn1();
f();        // 1       
f();        // 0

// 这时候闭包死亡 因为包含闭包的函数对象成为了垃圾对象也就是引用它的变量不再引用它了 
f = null

// 闭包是一个对象一个对象就有产生和死亡 执行完函数定义创建完内部函数就产生 
function fn1(){
  var a = 2;    
  var fn2 = function(){       
      a++;             
      console.log(a); 
  };
  return fn2;           
};
```

<br>

# 闭包的应用 ---- js自定义模块
什么是js模块, 具有特定功能的js文件, 将所有的数据和功能都封装在一个函数内部(私有的) 只向外暴露一个包含n个方法的对象或函数
模块的使用者 只需要通过模块暴露的对象调用方法来实现对应的功能

把下面的文件写在js文件中在外面还能看到下面的内容么？ 看不见 它是私有的数据 
```js
function myModule(){
  ar msg = 'My aiguigu'
  function doSometing(){
      console.log('doSomething()' + msg.toUpperCase())
  }

  function doOtherthing(){
      console.log('doOtherthing()' + msg.toLowerCase())
  }
}

// 将上面的js文件引入
script type="text/javascript"sc="myModule.js"

myModule(); 

// 执行它没意义啊 我执行它以后 js文件中的数据又释放掉了 还是不能去操作里面的msg 我得向外面暴露一些东西
function myModule(){
  var msg = 'My aiguigu'

  // 操作数据的函数
  function doSometing(){
      console.log('doSomething()' + msg.toUpperCase())
  }

  function doOtherthing(){
      console.log('doOtherthing()' + msg.toLowerCase())
  }

  // 向外暴露
  return doSometing;
}

// 暴露doSometing出去后怎么用？
var fn = myModule();  
// 执行后 得到的是函数 把它放进fn中 这样再执行 相当于myModule()()
fn();  
```

假如现在我想向外暴露doSometing doOtherthing怎么做？
现在我要暴露两个数据怎么办呢？
是不是用一个容器把这两个数据封装起来啊, 用什么容器？ 对象呗
```js
// 向外暴露 给外部使用的方法
return {
  doSometing:doSometing,
  doOtherthing:doOtherthing      
}

// 这么调用
var module = mymodule();
module.doSometing()
module.doOtherthing()
```



<br>

### <font color="#C2185">换一个写法</font>
```js
(function(){

var msg = 'My aiguigu' 
function doSometing(){
  console.log('doSomething()' + msg.toUpperCase())
} 
// 这部分还是私有的 不向外部暴露的话 外部是看不见的
function doOtherthing(){    
  console.log('doOtherthing()' + msg.toLowerCase())
}
})()
```


<br>

### <font color="#C2185">之前是用return向外暴露如果是匿名函数自调用怎么向外暴露呢？,把这个要暴露的东西 添加到 window的属性</font>
```js
window.myModule2 = {
  doSometing:doSometing,
  doOtherthing:doOtherthing   
}
```



<br>

### <font color="#C2185">外部是用匿名函数自调用写的</font>
上面的js文件写好后怎么用呢？
```js
script type="text/javascript"src="myModule2.js">

// 我直接就能看见我的模块对象 直接
myModule2.doSometing();
myModule2.doOtherthing();
```


<br>

### <font color="#C2185">这两种方式哪个好一些？ 第二种</font>
第一种 要想获取 js模块 必须要先执行函数才行 var module = mymodule();
return后, 执行函数后 才能得到想要的闭包吧
第二种 一引用就能用了


<br>

### <font color="#C2185">有的时候我们会这么写</font>
```js
(function(window){
  var msg = 'My aiguigu'       
  function doSometing(){
      console.log('doSomething()' + msg.toUpperCase())
  }                                                     
  function doOtherthing(){    
      console.log('doOtherthing()' + msg.toLowerCase())
  }  

  window.myModule2 =  {
      doSometing:doSometing,
      doOtherthing:doOtherthing   
  }

})(window);
// 这种写法有一个好处在代码压缩的时候 会把局部变量一些函数 变成abcd 也就是说 window可能会被压缩成w. 如果没有定义就不能压缩成w
```

<br>

# 闭包有什么样的缺点
1. 缺点
函数执行完后函数内的局部变量没有释放占用内存时间会变长, 容易造成内存泄漏

2. 解决
能不用闭包就不用, 及时释放
```js
function fn1(){
var arr = new Array[100000];
function fn2(){
  console.log(arr.length);
};
return fn2;
}

// 产生闭包了么？ 产生了 闭包死了么？ 没有 因为 f 在, 但是也有问题f在就会导致我的数组一直没有被释放
var f = fn1();   
// 解决办法 让内部函数 成为垃圾对象 回收闭包
f = null 
```

<br>

# 内存溢出 以及 内存泄漏

1. 内存溢出
一种程序运行出现的错误, 当程序运行需要的内存超过了剩余内存时就抛出内存溢出的错误
一个程序能拥有的内存空间是有限的 超出了这个空间程序就没办法运行 就崩溃了

```js
var obj = {};
for(var i=0; i<10000; i++){
  obj[i] = new Array(100000000)
}

// 这个循环遍历会产生很多个Array对象我要把所有的对象都放在obj里面去 怎么放进去 也就是obj占用的内存会特别大
obj[i] = new Array(100000000)
```

2. 内存泄漏  意思是本来我有很大的内存可以用但是你泄漏了一部分的内存 我可用的内存变小了, 占用的内存没有及时释放, 内存泄漏积累多了就容易导致内存溢出


<br>

### <font color="#C2185">常见的内存泄漏</font>
意外的全局变量
```js
function fn(){
  // 这里程序员以为是局部变量
  a = 3; 
  console.log(a);
}
// 如果a =3 是局部变量的话 fn()调用完 a就会被释放 这就是意外的全局变量
fn()
```

没有及时清理的计时器或回调函数
```js
// 启动定时器后不清理
var a = setInterval(function(){
  console.log('---');
},1000)

clearInterval(a);
```

<br>

# 递归函数
如果一个函数在内部可以调用其本身, 那么这个函数就是递归函数
简单的说就是自己调用自己的函数就是递归函数

递归函数的作用 和 循环效果一样 反复执行
由于递归很容易发生 '栈溢出' 的错误 所以必须要加条件 return
(因为每次调用函数都会开辟内存空间, 越开越多就死了)



<br>

### <font color="#C2185">简单的写法</font>
```js
// 在内部又调用了次自己
function fn() {
  fn();
}
fn();
```
先执行全局中fn() 然后进入到fn函数内部 又再次调用fn, 又进入到这个函数内部 有点像for循环



<br>

### <font color="#C2185">练习: 利用递归打印6句话</font>
```js
let num = 1;

function fn() {
  console.log(num);

  if(num == 6) {
      return;         // 递归里面必须加退出条件
  }

  num++;
  fn();
}
fn();
```
开启函数 然后打印console 然后判断等于6么 num++ 成为了2
再次调用fn 它会再回到函数内部的开头 再执行 再打印 再判断
当到6的时候 退出 因为console在上面所以会打印完6句




<br>

### <font color="#C2185">求1 ~ n的阶乘 用户输入几 求1-n之间的阶乘</font>
```js
function fn(n) {
  // 后一个数比前一个数大一 
  if(n == 1) {
      return 1;
  }
  return n * fn(n-1);
}
fn(3);
```

解析:
假如用户输入的是3

return 3 * fn(3-1)   =>   3 * fn(2)

到这里并不能返回一个值, 因为它必须得把fn(2)的结果拿到后才能返回
也就是说必须要把fn(2)的结果算出来才能返回

那fn(2)相当于再次调用fn这个函数此时里面传递的就是2了
return 3 * fn(2)    =>   3 * (2 * fn(2-1))

然后还是因为fn(2-1)并不是个结果 它会继续求值

fn(1)是多少? 1把 ok, 现在都有结果了
3 * (2 * 1)



<br>

### <font color="#C2185">利用递归函数求斐波那契数列(兔子序列)</font>
1, 1, 2, 3, 5, 8, 13, 21...
用户输入一个数字n, 就可以求出, 这个数字对应的兔子序列值, 就是我输入的是位数, 返回的是这个位数所对应的数字
前两项相加正好等于第三项的和, 所以我们只需要知道用户输入的n的前面两项就可以计算出n对应的序列值
前两项 n-1 前面的第一项, n-2前面的第二项



<br>

### <font color="#C2185">利用递归求</font>
根据id返回对应的数据对象
```js
let data = [
{
  id:1,
  name:'家电',
  goods: [
      {
          id:11, 
          gname:'冰箱'
      },
      {
          id:12, 
          gname:'洗衣机'
      }
  ]
}, 
{
  id:2,
  name:'服饰'
}
]
```

需求:
我们想要输入id号, 就可以返回数据的对象

```js
// 查询数组的每一个对象 我们用forEach来做, 既然我们想输入id号, 那么我们可以封装成一个函数 

// 里面有两个元素, 第一个是id为1的对象, 第二个是id为2的对象 
function getId(obj, id) {
  obj.forEach(function(value, index){
  /*
      那现在我们就相当于拿到了两个最大的数组元素 分别是id1 id2的两个对象  
      接下来我们根据id去找元素 进行判断 每个元素都有一个id, 那么我们可以拿着用户输入的id和元素的id进行对比, 一样的话我们就返回
      如果元素的id 等于 用户输入的id
  */
  if(value.id == id) {
/* 
这里我们就可以拿到数据了 但是我想要的是 用户输入id 我这边返回任意对象 
现在是最外成的得到了 里层的呢?
*/
      console.log(value);

/*
那怎么得到里层的数据呢? 继续forEach, 比如我们拿到了goods的数组 这个数组里面也有数组元素 我再次forEach然后根据id判断一下就可以拿到里面的相应数据了  
那是不是相当于把现在这个函数再整体的执行一次呢? 这里我们就可以使用递归
那怎么写呢?
我么是先在外层来判断, 当外层没有的情况下我们再去里层判断 
所以if是判断外层的, 那么我们可以写else if就是判断里层的
*/


/* 
在这里面怎么判断, 首先得有goods这个数组吧 而且这个里面不能为空把 如果是一个空数组就不用遍历的 所以这里应该有两个条件 
里面应该有个goods数组并且数组的长度不为0
*/
  } else if (value.goods && value.goods.length > 0) {
      // 在这个情况下我们去遍历数组, 在这里就没必要再去写forEach了
      getId(value.goods, id);
  }
})
}
/* 
可是递归不是要加退出条件的么? 递归是在forEach里面它里面有一个if和else 通过if else来判断到底要不要递归 
我们再遍历的时候数组肯定是有一条两条之类的情况 果然条数遍历完了我就不在进行递归了 相当于给我加了退出条件
*/
getId(data,11);
```


<br>

### <font color="#C2185">总结</font>
```js
function getId(json, id) {
  json.forEach(function(value, index){
      if(value.id == id) {
          console.log(value);                  
      } else if (value.goods && value.goods.length > 0) {
          getId(value.goods, id);
      }
  })
}
getId(data,11);
```
执行过程
首先传入id11, 然后走到elseif因为外层没有 进入内层 elseif里面再次调用函数, 
又回到最上方 这时传入的就是内部的value.goods 走到if部分 输出语句



<br>

### <font color="#C2185">上面只是把数据打印出来了, 那怎么得到数据呢?</font>
```js
function getId(json, id) {

  // 用来接收返回的数据
  let obj = {};

  json.forEach(function(value, index){
      if(value.id == id) {

          // 把获取到的外层数据保存到obj中
          obj = value;
          /*
              这里把结果返回 为什么把返回结果写在if里面呢? 因为结果都是在if里面得到的
              elseif只是负责递归函数而已
          */
          return obj;

      } else if (value.goods && value.goods.length > 0) {
          /*
              这里会收到上面return value返回的结果, 也就是会获取到外层得到的结果
              然后我们拿着这个结果去找value.goods
              因为函数调用必要要有返回值
          */
          obj = getId(value.goods, id);
      }
  })

  // 我们在forEach的外面把obj返回来
  return obj
}
// 有返回值了 那就必须要接受结果
let result = getId(data,11);
console.log(result);    { 空对象 } 
/*
  因为getId(value.goods, id); 这句 
  调用完函数必须要有个返回的结果 得重新更新一下我们的obj, 因为上面的obj只是外成的结果 所以我们必须要把用里层的结果把外层的obj结果覆盖掉
  返回值可以在外层的if里面得到
*/
```

<br>


<br>

### 递归调用的示例:
```js
function pulldownProcess(options) {
_data = {}
targetIndex = 1
let {actionQueue, target, source, raw} = options


// 遍历队列 过滤掉 值为null 对象
actionQueue = actionQueue.filter(item => Object.values(item).some(v => v != null))

processQueue(actionQueue, target, source, raw)
}

function processQueue(queue, target, source, prevResult) {
if (queue.length === 0) {
return;
}

// 取出队列中的第一个元素
const item = queue[0];

// 执行元素的逻辑，并传递前面元素执行后的结果
const result = execute(item, target, source, prevResult);
targetIndex++

// 处理剩余元素, 刨除队列中的第一个元素的剩余队列
const temp = queue.slice(1)
processQueue(temp, target, source, result);
}

function execute(item, target, source, prevResult) {
const result = Object.entries(item).reduce((acc, [key, value]) => {

_data[targetIndex] = {}

// 将过滤的数据进行备份
backup(value, prevResult, targetIndex);

const temp = findKeyword(value, prevResult);
for (const key in temp) {
if (temp[key] !== null) {
  temp[key] = temp[key].filter((item) => item !== '');
}
}
target = Object.assign(target, temp);
const condition = ["workClass1"]
target[condition] = source[condition]

acc[targetIndex] = _data[targetIndex]

return acc[targetIndex];
}, {});

return result;
}
```

<br>

# 浅拷贝 和 深拷贝
浅拷贝只是拷贝一层, 更深层次对象级别的只拷贝引用
深拷贝拷贝多一层, 每一级别的数据都会拷贝

在以前如果想拷贝数据到另外一个对象里面 需要用到for in遍历对象
```js 
// 需求 把这个对象拷贝给另外一个对象

let obj = {
  id:1,
  name:'andy'
};

let obj2 = {};
  
// 我们可以使用for...in 遍历obj
for(key in obj) {
  console.log(key);       //属性名
  console.log(obj[key]);  // 属性值

  // 给一个对象添加属性的时候 obj.name = value, 给obj2添加属性
  obj2[key] = obj[key];
}
console.log(obj2);

结果:
  id: 1
  name: "andy"
  msg: {age: 1}
```


<br>

### <font color="#C2185">↑ 总结</font>
- 结果看似没有问题, 其实拷贝的是msg的地址, 这个地址存的还是obj里面的地址值
也就是说明一个问题 既然是地址值拷贝给了o, 那么我通过o修改msg里面的值 会影响到原来obj里面的值
```js
// 我们修改o中的数据 会影响到obj里面的数据
o.msg.age = 2;
console.log(o.msg.age);     //2
console.log(obj.msg.age);   //2

// 这就是浅拷贝, 把更深层次的对象的地址值拷贝给了o o和obj指向了同样的数据 修改其中的任何数据, 都会影响另外的数据
```



<br>

### <font color="#C2185">Object.assign(拷贝给谁, 拷贝哪个对象);</font>
ES6中的浅拷贝的新方法
``` 
Object.assign(o, obj);
console.log(o);
```

<br>

# 深拷贝
深拷贝就是拷贝多层, 每一层的数据都会拷贝
深拷贝会把更深层次的对象, 重新开启一个新的空间, 把数据复制到新空间里, 再把新空间返回给对象, 这两新对象和被拷贝的对象互补干扰

```js
let obj = {
  id: 1,
  name: 'andy',

  msg: {
      age:1
  },
  color: ['pink', 'red', 'blue']
};

let o = {}

// 核心思路:
// obj中id 和 name都是简单数据类型 msg是一个对象, 如果是一个对象那就利用for in来遍历里面的属性名

// 封装一个拷贝函数 参数: 拷贝给谁, 拷贝谁 
function deepCopy(newobj, oldobj) {

  for(let k in oldobj) {

      // 判断是简单类型的数据 还是 复杂类型的数据 如果是简单的就是浅拷贝的方法, 如果是复杂的类型那就再次进入
      // 获取属性值 oldobj[k]
      let item = oldobj[k];

      // 判断这个值是否是数组
      if(item instanceof Array) {

          // 如果是一个数组 就把这个数组给新对象的属性
          newobj[k] = [];
/*
deepCopy(newobj, oldobj);
相当于 o.color = []
重新再次递归一下 拷贝是color: ['pink', 'red', 'blue']
['pink', 'red', 'blue'] 这是部分是属性值 也就是 let item = oldobj[k];
也就是item
给谁呢? 也就是newobj是谁呢? 给新对象的属性名
*/
          deepCopy(newobj[k], item);

      // 判断这个值是否是对象
      } else if (item instanceof Object) {  
          newobj[k] = {};
          deepCopy(newobj[k], item);

      } else {
          // 属于简单数据类型
          newobj[k] = item;
      }
  }
}
deepCopy(o, obj)
console.log(o);
// 最终格式
// {id: 1, name: "andy", msg: {…}, color: Array(3)} 
```


<br>

### <font color="#C2185">完整代码</font>
```js
function deepCopy(newObj, oldObj) {

  for(let k in oldObj) {

      let item = oldObj[k]

      if(item instanceof Array) {
          newObj[k] = []
          deepCopy(newObj[k], item)

      } else if(item instanceof Object) {
          newObj[k] = {}
          deepCopy(newObj[k], item)

      } else {
          newObj[k] = item
      }
  }
}
```

<br>


<br>

### 深拷贝方式2:
```s
https://developer.mozilla.org/zh-CN/docs/web/api/structuredClone
```
**let newObj = structuredClone(obj)**

<br>

# H5 Web Workers(多线程)
H5规范提供了js分线程的实现取名为 Web Workers
它是H5提供的一个js多线程解决方案, 我们可以将一些大计算量的代码 交给web worker运行而不冻结用户界面

但是子线程完全受主线程控制且不得操作DOM(只能是主线程操作页面) 所以这个新标准并没有改变js单线程的本质


<br>

### <font color="#C2185">相关Api</font>
worker: 构造函数加载分线程执行的js文件
worker.prototype.onmessage: 用于接收另一个线程的回调函数
worker.prototype.postMessage: 向另一个线程发送消息


<br>

### <font color="#C2185">不足</font>
worker内代码不能操作DOM(更新UI)
不能跨越加载JS, 不是每个浏览器都支持这个新特性
``` 
编程实现 斐波那锲数列 (Fibonacci sequence)的计算
F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)

<input type="text" placeholder="数值" id="number">      
<button id="btn">计算</button>

怎么设计一个函数 给它一个值 能对应的返回 斐波那契呢？
```

```js
function fibonacci(n){
// 递归调用 函数内部调用自己  递归的效率是比较低的
return n<=2 ?1 :fibonacci(n-1) + fibonacci(n-2);
};

var input = document.getELementById("number")
var btn = document.getELementById("btn");
btn.onclick = function(){
var number = input.value;               
var result = fibonacci(number);    // 我们要把这条语句交给分线程
alert(result);
```

上面的计算量太大导致在计算的时间中 用户不能操作浏览器等待时间过长 怎么把长时间的操作 放在 分线程里操作
我要把number 传递给 分线程 分线程去计算 计算完以后把结果(result在分线程产生)返回主线程主线程拿到结果更新页面提示 



<br>

### <font color="#C2185">web worker</font>

<br>

### <font color="#C2185">创建在分线程执行的JS文件</font>
```js
// 不能用函数声明
var onmessage = function(event){    
  console.log('onMessage()22');

  // 通过event.data获得发送来的数据
  var upper = event.data.toUpperCase();

  // 将获取到的数据发送回主线程
  postMessage(Upper);
}
```


<br>

### <font color="#C2185">在主线程中的我们向分线程发消息并设置回调</font>
```js
// 创建一个worker对象 并向它传递将在新线程中执行的脚本的url
var worker = new Worker('worker.js');

// 接受worker传过来的数据函数
worker.onmessage = function(event){
  console.log(event.data);
};
// 向worker发送数据      向分线程发送消息
worker.postMessage('hello, world');
```


<br>

### <font color="#C2185">在主线程里的代码</font>
```js
var input = document.getELementById("number")
var btn = document.getELementById("btn");
btn.onclick = function(){
var number = input.value;    

// 将number想办法传递给分线程 创建一个worker对象
var worker = new Worker(这里写 在分线程里执行的 js文件地址比如'worker.js');

// 绑定接收消息的监听
worker.onmessage = function(event){
  console.log('主线程接收分线程返回的数据'+event.data);
  console.log(event.data);
};

// 向分线程发送消息
worker.postMessage(number);
console.log('主线程向分线程发送数据'+number);
};

// 下面写分线程的代码 要在一个js文件中写 要写一些固定的东西
function fibonacci(n){
return n<=2 ?1 :fibonacci(n-1) + fibonacci(n-2);
};

var onmessage = function(event){  
var number = event.data;
console.log('分线程接收到主线程发送的数据'+number);

// 计算
var result = fibonacci(number); 
// 将获取到的数据发送回主线程
postMessage(result);
console.log('分线程向主线程返回数据'+result);  
}
```

我们思考下 在分线程 打印this this是谁 全局上面的属性和方法我们直接可以使用
分线程中的this指向了 DedicatedWorkerGlobalScope这个全局对象

我们平时在全局里面可以直接使用document 因为document是window的属性嘛

问题是 我在分线程里能不能调用主线程的方法
因为主线程的全局对象是window
分线程的全局对象是DedicatedWorkerGlobalScope

比如 alert是window的方法 能在 分线程里使用么？ 不能

前面说过在分线程里不能操作界面 因为在分线程里看不到window
分线程中的全局对象不再是window所以在分线程中不可能更新界面 因为更新界面要用window和document里的方法

<br>--

# 本地存储 (localStorage, sessionStorage)
随着互联网的快速发展, 基于网页的应用越来越普通, 同时也变的越来越复杂, 为了满足各种各样的需求, 会经常性在本地存储大量的数据, HTML5规范提出了相关解决方案
``` 
以前我们会把数据放在数据库里, 还要去服务器里面取过来再拿来使用 
也有些东西根本就没有必要放在数据库里面
```



<br>

### <font color="#C2185">位置查看</font>
F12 --- Application --- 左侧 Storage Session Storage



<br>

### <font color="#C2185">本地存储的特性</font>
1. 数据存储在用户浏览器中
2. 设置, 读取方便, 甚至页面刷新都不会丢失数据
3. 容量较大
- sessionStorage    约5M
- localStorage      约20M

4. 只能*存储字符串*, 可以*将对象JSON.stringify()*编码后存储



<br>

### <font color="#C2185">5M的单位</font>
10M字节空间.
而根据 UTF-16编码规则要么2个字节要么四个字节所以不如说是 10M 的字节数更为合理.

```js
"a".length      // 1
"人".length     // 1
"𠮷".length     // 2
```

key的长度也会占用空间



<br>

### <font color="#C2185">window.sessionStorage</font>
生命周期为关闭浏览器窗口
在同一个窗口(页面)下数据可以共享
以键值对的形式存储使用的

>sessionStorage.setItem(key, value);
存储数据
把数据存储在浏览器里 不关闭页面数据会一直存在

修改数据
在原来的数据上再次存储就是修改呗



<br>

### <font color="#C2185">sessionStorage.getItem(key);</font>
获取数据


<br>

### <font color="#C2185">sessionStorage.removeItem(key);</font>
删除数据


<br>

### <font color="#C2185">sessionStorage.clear();</font>
清空数据
```js 
let set = document.querySelector('.set');
let get = document.querySelector('.get');
let remove = document.querySelector('.remove');
let del = document.querySelector('.del');
let text = document.querySelector('input');

set.addEventListener('click', function(){
  // 当我们点击了之后, 就可以把表单里面的值存储起来
  let val = text.value;

  sessionStorage.setItem('uname', val);

  // 点击一次存到uname中 再点击一次存到pwd中
  sessionStorage.setItem('pwd', val);
  console.log(val);
})

get.addEventListener('click', function(){
  sessionStorage.getItem('uname')
  // let result= sessionStorage.getItem('uname');
  console.log(result);
})

remove.addEventListener('click', function(){
  sessionStorage.removeItem('uname')
})

del.addEventListener('click', function(){
  sessionStorage.clear()
})
```

<br>


<br>

### <font color="#C2185">window.localStorage</font>
声明周期永久生效, 除非手动删除 否则关闭页面也会存在
可以*多窗口(页面)共享*, 同一浏览器都可以使用这个数据
以键值对的形式存储使用

>> localStorage.setItem(key, value);
存储数据

修改数据
在原来的数据上再次存储就是修改呗


<br>

### <font color="#C2185">localStorage.getItem(key);</font>
获取数据


<br>

### <font color="#C2185">localStorage.removeItem(key);</font>
删除数据


<br>

### <font color="#C2185">localStorage.clear();</font>
清空数据

<br>--

# 案例 记住用户名
如果勾选记住用户名, 下次用户打开浏览器 就在文本框里面自动显示上次登录的用户名

案例分析:
把数据存起来, 用到本地存储
关闭页面, 也可以显示用户名, 所以用到localStorage
打开页面, 首先先判断是否有用户名这个数据, 如果有, 就在表单里面显示用户名, 并且勾选复选框

当复选框发生改变的时候 change事件
- 如果勾选, 就存储 否则就移除

<br>--

# 一、基础总结深入 - 数据类型


<br>

### <font color="#C2185">基本类型(值类型)</font>
string      值为    任意字符串
number      值为    任意的数字
boolean     值为    true false
undefined   值为    undefined
null        值为    null



<br>

### <font color="#C2185">对象类型(引用类型)</font>
Object      值为    任意对象
Function    值为    一种特别的对象(可以执行 内部包含着可运行的代码)
Array       值为    一种特别的对象(数值下标(操作数据要用数值下标、内部数据是有序的))

<br>

# 判断数据类型
如何判断因为不同数据类型 行为不一样  不知道类型的话就不知道怎么操作

<br>

# 对数据类型进行判断的方式:

<br>

### <font color="#C2185">typeof</font>
返回值: 数据类型的字符串表达
说白了返回的是字符串既然是字符串 那就是要加上引号

可以判断一个值是否是
undefined / number / string / boolean / function

不能判断的是
null / Object / Array



<br>

### <font color="#C2185">===  </font>
可以判断一个值是否是undefined / null  -``` 因为这两个类型就一个值
```js
var a = null;
console.log(a === null);
var a = undefined;
console.log(a === undefined);
```               


<br>

### <font color="#C2185">instanceof</font>
返回值:   布尔值
语法:     A instanceof B    A是不是B的实例
它可以间接的判断A的类型 是不是一个对象？ 或者 是不是一个数组？
A instanceof B

A是不是B的实例 那也就是说B应该是一个 构造函数(因为在JS里类型是通过构造函数去表达的),判断对象的具体类型(它会判断这是一个函数 还是一个数组) 

<br>

# 具体使用的方式:

<br>

### <font color="#C2185">使用typeof 和  === 判断基本类型</font>
返回的是: 数据类型的字符串表达(说白了返回的是字符串)
可以判断一个值是否是undefined / number / string / boolean

```js
var a;
console.log(a, typeof a)                    //undefined 'undefined'
console.log(undefined === 'undefined')      //false
// 我们判断typeof a 等不等于 一个类型要这么写  typeof a === "undefined" 
// 引号不要忘记 因为typeof返回值为一个字符串

var a = undefined;
console.log(a === undefined);           //true
var a = 3;
console.log(typeof a === "number");     //判断a的类型
var a = "aiguigu";
console.log(typeof a === "string");     //判断a 等不等于 字符串类型
```


<br>

### <font color="#C2185">使用 instanceof 判断对象      是 数组 / 对象 / 函数?</font>
语法:
A instanceof B    A是不是B的实例
``` 它可以间接的判断A的 具体类型 是 数组 / 对象 / 函数```

```js
console.log(b1 instanceof Object);
console.log(b1 instanceof Array);
console.log(b1 instanceof Function);

// 其中 函数 还可以用typeof来判断
console.log(typeof b1.b3 === 'function')       //别忘了typeof的值是一个字符串 'function'

```


<br>

### <font color="#C2185">案例1</font>
```js
// 创建一个对象
var b1 = {
// b2是一个数组里面有numberstring函数
b2:[1, 'abc', console.log],


// 怎么知道console.log是什么数据类型
console.log(typeof b1.b2[2] === 'function')  true

// 那b1.b2[2]既然是个function, 那就可以b1.b2[2]()
b1.b2[2](4); === console.log(4);

b3:function(){
  console.log(b3);
}
};
```

需求:
区别上面这b1,2,3的类型


<br>

### <font color="#C2185">判断 b1 的类型:  </font>

console.log(b1 instanceof Object);      //true

A instanceof B --- > A是不是B的实例

那也就是说B应该是一个 构造函数(因为在JS里类型是通过构造函数去表达的)
Object是一个 构造函数(平时的时候对象是 new Object()创建的吧所以Object是一个构造函数)
b1 是一个实例对象



<br>

### <font color="#C2185">判断 b2 的类型</font>
console.log(b1.b2 instanceof Array, b1.b2 instanceof Object,);  //true true

判断b2是数组还是对象 -> 既是数组 也是对象
  


<br>

### <font color="#C2185">判断 b3 的类型</font>
console.log(b1.b3 instanceof Function, b1.b3 instanceof Object);

判断b3是函数还是对象 -> 既是函数 也是对象

<br>


<br>

### <font color="#C2185">案例2</font>
我在函数内部 return一个函数, 那么这个函数怎么调用?

```js
var b1 = {
  b2:[1, 'abc', console.log], 
  b3:function(){
      console.log(b3);

      return function(){
          return 'xfzhang'
      };    
  }
};

b1.b3();  // 现在我得到的是 第一个return

return function(){
  return 'xfzhang'
}; 

b1.b3()();  // 得到的是 第二个return  return 'xfzhang'

// 怎么打印？
console.log(b1.b3()());  //不要纠结于表面我们要看 我们得到的是什么类型的数据 才能知道下一步怎么操作
```

<br>

# 关于数据类型的三个问题


<br>

### <font color="#C2185">undefined与null的区别？</font>
都代表什么东西都没有

undefined   代表 定义了    没赋值
null        代表 定义了    并赋值   值为null

```js
var a;
console.log(a);     //undefined

var a = null;
console.log(a);     //null
```


<br>

### <font color="#C2185">什么时候给变量赋值为null呢？</font>
初始赋值表明将要赋值为对象
结束赋值让对象成为垃圾对象
var b = null;
``` 
初始赋值为null表明将要的赋值为对象这样可以让下一个人知道 这个b即将要被赋值一个对象 
确定对象(或者数据来了) 就赋值
```

b = [12, 'atguigu'];
b = null;
``` 最后释放数组所占用的内存让b指向的对象成为垃圾对象(被 垃圾回收器 回收)```



<br>

### <font color="#C2185">严格区别变量类型与数据类型？</font>
数据的类型
基本类型 和 对象类型

变量的类型(变量内存值的类型变量本身是没有类型的)        
基本类型 和 引用类型 


<br>

### <font color="#C2185">变量什么时候是基本类型</font>
保存的是基本数据类型的数据 


<br>

### <font color="#C2185">变量什么时候是引用类型</font>
保存的是地址值 

var c = {};
``` 
这是我的对象数据这是数据是个对象 有人会说这是引用类型 何为引用类型？ 
c里面存的是什么？ 存的是内存地址这个类型的引用 对象在堆内存里 c在栈内存里c保存的不是对象 保存的是地址值 c本身不是对象只是说c能找到对象它保存的是内存地址
```

很多时候我们判断变量的类型 其实是在判断 值的类型

var c = function(){ ... }; 
``` 
这个c是不是引用变量？是吧 函数是一个对象 我们将函数对象的地址值保存在c中
那我们用typeof c

console.log(typeof c);      //返回的是 "function"  
它是怎么知道的？只看c 只看值？是function的  它只能根据存储的内容找到这个内存才能发现它是个函数对象 
```

<br>

# 什么数据？
存储在内存中代表特定信息的'东西'本质是010101...
数据的特点:
1. 可传递
2. 可运算

一切皆数据
内存中所有操作的目标是: 数据
1. 算术运算
2. 逻辑运算
3. 赋值运算
  var a = 3;
  var b = a;      //拷贝a的内容赋值给b
4. 运行函数

<br>

# 什么是内存？
内存条通电以后产生的可存储数据的空间(临时的因为要通电嘛)
内存产生和死亡:
内存条(电路板)-``` 产生内容空间 -``` 存储数据 -``` 处理数据 -``` 断电 -``` 内存空间和数据都消失

一块小内存的两个数据
1. 内部存储的数据
2. 地址值数据 标识一块内存的

var obj = {name:"tom"};
console.log(obj.name);


<br>

### <font color="#C2185">↑ 思考</font>
``` 
输出obj.name先找obj吧 读的obj内部存储的内容还是内部存储的地址？
读的是内容 只是这个内容是个地址值   .的作用是什么？

.的作用相当于 拿着ox123沿着箭头找到对应的内存
是不是所有的变量都能 . 呢？ 什么样的变量才能 . 呢？

是不是这个变量存的是内存地址才能 . 啊
name:'tom'      内存中的小标识 : 内存中存储的数据
```
  

内存中 每一个小内存都有对应的地址值 这个内存是个对象 它的地址值我们就用 其他的都不用 其他的用内存中存储的数据

栈内存              堆内存
a = 0x123           ox123
obj: 0x123          name:'tom'

var a = obj;

``` 
我们是在用obj的地址值么？不是
是将obj的地址值赋值给a么？不是

而是将里面的数据拷贝一份保存到a中只有一种情况才会读地址值 将一个对象赋值给谁的时候读的才是
地址值 其他的时候都是在读内存内容只是内存里有两种数据 一种是基本数据 一种是地址值数据
```

栈空间的小内存它可以存基本类型的数据 也可以存地址类型的数据 如果它存的是地址数据 我们称之为引用变量


<br>

### <font color="#C2185">内存的分类</font>
栈  -``` 全局变量 和 局部变量
堆  -``` 对象

``` 函数名在 栈 里面因为它本身是变量名 对象本身在堆空间里```

<br>

# 什么是变量？
可变化的量它由变量名 和 变量值 组成 每个变量都对应一块小内存

变量名: 用来查找对应的内存
变量值: 内存中保存的数据

var age = 18;
console.log(age);

``` console.log的执行过程就是拿着age的名字去找到名为age存18的空间找到以后读取内部保存的数据```

内存数据变量三者之间的关系
内存: 用来存储数据的空间(临时空间)硬盘是永久空间(慢)
变量: 内存的标识

<br>

# 变量中保存的是什么?

a内存中到底保存的是什么？
var a = xxx;    

xxx是基本数据保存的就是这个数据
var a = 3;

xxx是对象保存的是对象的地址值
var a = {};
``` xxx是变量保存的是xxx的内存内容(可能是基本数据也可能是地址值)```

<br>

# 引用变量赋值的问题
将变量的内容赋值给另一个变量如果是对象的话 就是将内容内的内存地址赋值给另一个

N个引用变量指向同一个对象通过一个变量修改对象内部数据其他所有变量看到的是修改之后的数据
两个引用变量指向一个对象让其中一个引用变量指向另一个对象另一个引用变量依然指向前一个对象


<br>

### <font color="#C2185">情况1</font>
```js
var obj1 = {name:"tom"};

// 将obj1的内存内容保存到obj2 只是obj1的内存内容是地址值 让两个obj指向同一个对象
var obj2 = obj1;    

obj1.name = "jack";
console.log(obj2.name);     //jack 


// 定义一个函数 接收obj
function fn(obj){     
  obj.name = "bob";
};

fn(obj1);  
/*
  执行的时候是 实参 赋值给 形参就是将obj1的内容(内存地址) 赋值给了形参也就是说 现在有3个变量指向了同一个对象
  然后都指向了 name:tom 然后在函数内部被修改为bob
*/
                  

console.log(obj2.name);     // 是tom 是bob？  bob
```


<br>

### <font color="#C2185">情况2</font>
```js
var a = {age:12};

// 两个引用变量指向一个对象
var b = a; 

a = {name:"bob"};
console.log(b);         // b里有name的属性么？ 没有

a = {name:"bob", age:13};

// 这里不是自己想的 对var a = {age:12};这个进行了修改而是直接指向了别的对象
console.log(b.age, a.name, a.age);      //12 bob 13

// b还是a = {age:12}; 这个对象 a已经指向了别的对象分离了 各是各的
```


>> 让其中一个引用变量指向另一个对象 另一个引用变量依然指向前一个对象


<br>

### <font color="#C2185">接着来</font>
```js
function fn2(obj){
  obj = {age:15}
};
fn2(a);

console.log(a.age);     //a是多少？     13还是15？      13
```

将a = {name:"bob", age:13};作为实参 传递给了 形参obj 
这时候他俩同时指向一个 都是13

但是函数内部把obj指向了另一个对象所以 这时候 他们分别指向了各自的对象
上面有两个要点一是a没有变二是仍然指向的是a之前的内容 所以是13

obj = {age:15}这个是函数内部的 它将成为垃圾对象因为函数执行完函数就会关闭局部变量就会释放




<br>

### <font color="#C2185">再来一题</font>
```js
function fn(obj) {
  obj.name = "bob";
}

and

function fn(obj) {
  obj = {age:15};
}

obj.name = "bob";  和  obj = {age:15}  是不一样的

obj.name = "bob"  // 是原有的对象上增添属性
obj = {age:15}    // 是修改引用变量的值(内存地址)

// a.age 中的 . 是找对象的意思 先可以这么理解
```

<br>

# 调用函数时 传递变量参数是值传递 还是 引用传递

<br>

### <font color="#C2185">理解1</font>
都是值传递无论是基本数据还是引用变量 传递的都是变量的内容 或者说是值只是这个值 有两种情况 基本值还是地址值 都是变量内部存储的数据


<br>

### <font color="#C2185">理解2</font>
可能是值传递 也可能是引用传递(地址值)
首先要知道 这里的a 和 函数中的形参a 不是一个东西 虽然长的一样
```js
var a = 3;

function fn(a){
  a = a+1;
};

fn(a);               
console.log(a);     //为啥不是4？
```


<br>

### <font color="#C2185">↑ 解析</font>
``` 这里的a是一个变量```
var a = 3;

``` 这里的形参a是一个新的变量```
function fn(a){ ... }

``` 
这里我传递的不是a 一定要记住 传递的是3
也就是说传递完后 跟var a = 3;中的a 就没有关系了 使用的只是数据而已
```
fn(a);


我们说对一块内存有哪些操作? 
两种 要么就读 要么就写
一般 = 号左边的就是写(被赋值)= 号右边就是读
``` 
这里相当于var a = 3里的a的值赋值给 function fn(a)中的a(形参变量a) = a(全局变量) 
```
function fn(a) { ... }



<br>

### <font color="#C2185">对于值传递的时候, 对引用类型的值传递的解释</font>
1.  function fn2(obj){
2.      console.log(obj.name);
3.  };
4.  var obj = {name:"Tom"};
5.  fn2(obj);
``` 
5中fn2(obj); 调用fn2函数 传了一个obj, 那就要先读到obj的值(4. obj是对象只能读地址值吧) 

读到这个对象{name:"Tom"}的地址值

5中的obj读到地址值后 把地址值 赋值 给 1中的 形参obj

最怕这么理解
var obj = {name:"Tom"}; 把5中的{name:"Tom"}对象 直接传递形参obj
```

<br>

# JS引擎如何管理内存
var a = 3;
``` 执行这条语句的时候 需要被分配一个小空间```

var obj = {};
``` 首先上面的两条语句 占用了3个空间 a obj {}```

obj = null;
``` 对象的空间释放了但是obj自己没有释放```

function fn(){
``` 
这行的时候还没有产生变量局部变量要在被调用时产生函数完毕后死亡 自动释放 
```
var b = 4;      
};
fn();



<br>

### <font color="#C2185">内存生命周期</font>
1. 分配小内存空间 得到使用权 
2. 存储数据可以反复进行操作
3. 释放当前的小内存空间不释放的话 内存一直被占用着



<br>

### <font color="#C2185">释放内存</font>
1. 局部变量 函数执行完自动释放
2. 对象     首先要成为垃圾对象在后面由垃圾回收器回收

<br>

# 对象相关问题


<br>

### <font color="#C2185">什么是对象</font>
对象可以存储多个数据 变量只能存一个或者是用来保存多个数据的容器
一个对象代表现实世界中的一个事物一个事物身上有多个数据用编程语言来描述显示世界的事物 就用对象来描述
var p = {
  name:"Tom",
  age:18,
  setName:function(name){
      this.name = name;
  }
  setAge:function(age){
      this.age = age;
  }
}



<br>

### <font color="#C2185">为什么要用对象</font>
统一管理多个数据



<br>

### <font color="#C2185">对象的组成</font>
属性    属性名(字符串) 和 属性值(任意类型) 组成 
方法    一种特别的属性 setName setAge 属性值是函数的就是方法



<br>

### <font color="#C2185">如何访问对象内部数据</font>
console.log(p.name);
访问对象内部方式之一


<br>

### <font color="#C2185">.属性名</font>
才能得到属性值
``` 之后得判断数据类型是什么 如果是一般的属性可以读```

``` 
假如我想调用setName 这么写行不行p.setName 这么写会输出p.setName的值 它的值是整个函数 首先你得先知道前面得到的是一个函数  后面才知道怎么调用
平常函数是用来执行的

p.setName();
```


访问对象内部方式之二

<br>

### <font color="#C2185">["属性名"]</font>

现在我还是要调用setAge
p['setAge'](123);
p['age']

``` 方式一比方式二简单一些 方式一有的时候不能用 方式二可以通用```


<br>

### <font color="#C2185">什么时候必须使用['属性名']的方式？</font>
1. 属性名包含特殊字符:  - 空格
``` 
不确定的东西用什么存储变量名也是个数据吧(字符串) 用一个变量来存储这个变量名 
```

var p = { ... };

``` 给p对象添加一个属性: content-type:text/json```
p.content-type = "text/json"    //报错了
p['content-type'] = "text/json" // p['content-type']


2. 变量名不确定
var propName = 'myAge';
var value = 18;

怎么把这个属性添加到p上面去
p.propName = value;

p[propName]= value;     // propName 是变量名 所以不用加''

<br>

# 函数相关问题


<br>

### <font color="#C2185">什么是函数？</font>
具有实现特定功能的n条语句的封装体, 只有函数是可以执行的 其他类型的数据不能执行


<br>

### <font color="#C2185">为什么要用函数？</font>
提高代码复用, 便于阅读交流
代码写出来之后 是程序员之间互相查看的 函数体现的是一种封装的思想 看一遍函数的封装体之后就懂了


<br>

### <font color="#C2185">如何定义函数？</font>

>函数声明
function fun(){
  console.log();
};
``` 变量提升```


<br>

### <font color="#C2185">函数表达式</font>
var fun = function(){ ... };



<br>

### <font color="#C2185">如何调用函数？</font>
执行调用:  
test();

通过对象调用:  
obj.test();

通过new调用:
new test();


<br>

### <font color="#C2185">test.call(obj) / apply(obj);</font>
临时让test成为obj的方法进行调用
这种方法相当于 obj.test(); 但是obj上面没有test方法

  var obj = {};

  function test2(){
      this.xxx = "aiguigu";
  };
``` 
假如我想用obj调用test2 能直接这么写么？
obj.test2(); 不行吧 它没有这么方法怎么调呢？
JS中强大的地方就在这里我可以让一个函数 成为任意一个对象的方法 来进行调用
test2.call(obj);    
可以让一个函数成为 指定任意对象的方法来进行调用
```

<br>

# 回调函数


<br>

### <font color="#C2185">什么是回调函数？</font>
1. 你定义的
2. 你没有调
3. 最终它执行了 在某个时候或者某个条件下(比如 定时器 或者 点击按钮)具备这三点就是回调函数



<br>

### <font color="#C2185">常见的回调函数？</font>
1. dom事件回调函数      与用户交互最关键的点
2. 定时器回调函数

3. ajax请求             与后台交互最关键的点
4. 生命周期回调函数



<br>

### <font color="#C2185">前端主要是</font>
1. 制作页面
2. 交互, 这里的交互指的是两个方面
1. 点它 它有反应 怎么才能有反应 得绑定事件监听吧
2. 前后台交互因为数据是从后端动态获取的 页面不是静态不变的吧 我需要发请求去获取数据显示 一个界面与人的交互 操作 一个是与后台的交互

<br>

# IIFE
立即执行 调用函数表达式
作用:
隐藏实现我的实现不是完全暴露在外面的
不会污染外部(全局)命名空间
用它来编写 JS 模块

function(){
  console.log();
};

``` 
这么写完会报错的要么存起来 要么用起来 名字也不取 也不执行 就没意义
```
(function(){
  console.log();
})();
``` 
匿名函数自调用向上面这么写真是一点意义也没有, 但是有的时候是:
```
(function(){
  var a = 3;
  console.log(a+3);
})();
var a = 3;
console.log(a+3);
``` 
上面两行写在函数外面和函数里面有什么区别？
写在外面里面都执行 写在外面会产生全局变量a 写在里面就没有产生全局变量
```

```js
(function(){
var a = 1;                  //定义一个变量

@1      function test(){
  console.log(++a);       //定义一个函数 超过变量
};
window.$ = function(){      //定义了一个$ 一个函数
  return {                //返回了一个对象
      test:test
  }
}
})();

``` 我想取a 想执行 console.log(++a) 能不能看见 看不见```
test();         可以么？不行
$().test();     可以    
```

``` 解析 ↑ : ```
window.$ = function(){          //向外暴露一个全局函数
@2            return {  
      test:test
  }
``` 
这个部分相当于 向外暴露了一个函数 我最终执行 是把 @1 暴露出去了吧 
@1 暴露出去后 得到了一个@2对象
```

$().test();
``` $是个函数名, $执行后 返回的是一个对象```


<br>

# 变量的小总结

形参的本质是 变量
实参的本质是 数据
也就是变量的值也就是 传进去的是内存中存储的数据 不管是基本类型的变量 还是 引用类型的变量 传递的都是值 不是他们本身 是值内保存的内容

引用变量赋值的问题
改变某一个变量本身就是重新赋值 就相当于改变它 比如 两个变量都指向同一个对象这时候给其中一个对象赋值那就相当于让它指向了另一个对象

<br>

# 原型链

# 函数的prototype属性
每个函数(和对象)都有一个prototype属性它默认指向一个Object空对象(即称为: 原型对象fun.prototype这就是)
原型对象中有一个属性 constructor它指向函数对象
``` 什么叫做空对象:  没有我们的属性```


<br>

### <font color="#C2185">给原型对象添加属性(一般都是方法)</font>
作用:
函数的所有实例对象自动拥有原型中的属性(方法)

每一个函数都有一个prototype属性 那Date()是函数吧
那它就有prototype
console.log(Date.prototype);    object的实例对象 里面封装了很多的方法供实例去使用

原型上的方法是给实例对象使用的
function fun(){};
console.log(fun.prototype);     //Object 它默认指向一个Object空对象(没有我们的属性)

Date.prototype 和 fun.prototype 它们都指向了一个Object对象它俩相比Date.prototype里面封装了很多的方法
而fun.prototype里 有个属性叫constructor 还有个属性叫__proto__


那假如我想在fun.prototype中加一个方法怎么加？
fun.prototype.test = function(){};     // 这个时候我们里面就有个属性了 test:function(){};



<br>

### <font color="#C2185">原型对象中有一个属性 constructor它指向函数对象</font>
我们来验证下这个事, 首先我们获取原型对象, Date.prototype

console.log(Date.prototype.constructor === Date);       //true

``` 上面说到constructor指向说明它是一个引用变量属性 它指向函数对象```
console.log(fun.prototype.constructor === fun);         //true


<br>

### <font color="#C2185">图解</font>

Type(函数名)    → Type.prototype 指向 →    Type原型对象
              
              ← Type.prototypeconstructor

假设我的函数名是Type 它有一个属性prototype 它指向Type.prototype(它指向Type的原型对象)
而原型对象中有个constructor 它指向原型Type
也就是说我的构造函数跟它的原型对象之间是相互引用
A B
我是A 你是B A的里面有个属性能找到B  B里有个属性能找到A



<br>

### <font color="#C2185">那原型有什么用？</font>
那我给原型对象添加属性(一般是方法) 是给实例对象来访问用的
Fun.prototype.test = function(){
  console.log('test()');          //这里为什么要加引号 等测试的时候试试
};

我们来创建个实例对象验证下
var fun = new Fun();        创建一个实例
fun.test();                 调用test

<br>

# 显式原型 与 隐式原型

1. 每个函数function都有一个prototype即是显式原型(属性)
2. 每个实例对象都有一个__proto__可称为隐式原型(属性)
3. 实例对象的隐式原型的值 为其对应 构造函数的显式原型的值
4. 内存结构
5. 总结
函数的prototype属性:    在定义函数时自动添加的默认值是一个空对象
实例对象的__proto__属性: 创建对象时自动添加的默认值为构造函数的prototype属性值
``` 程序员能直接操作显式原型但不能直接操作隐式原型(ES6之前)```

1. 每个函数function都有一个prototype即是显式原型(属性)
function Fn(){

};
console.log(Fn.prototype);      //object

2. 每个实例对象都有一个__proto__可称为隐式原型(属性)
``` 创建一个实例```
var fn = new Fn();
console.log(fn.__proto__);      //object

3. 对象的隐式原型的值为其对应构造函数的显式原型的值
console.log(Fn.prototype === fn.__proto__);     //应该返回true

``` 
开始的时候我们都说过每个函数function都有一个prototype即是显式原型(属性)那显示原型属性是一个引用变量吧 它指向的是一个空的object对象
那隐式原型指向谁 一样吧现在相当于我有两个变量一个是 prototype 一个 __proto__ 它们两个都保存的是地址值 而且它们两个的值是一样的
相等的所以它们才共同指向原型对象
```

function Fn(){ ... };
Fn.prototype    解释 → 读函数对象的这个属性
``` 
这里 Fn. .是什么意思？ Fn相当于一个变量 函数变量么？函数名称不就是它的变量么？
找它的对象 一个函数是不是就是一个对象 那个对象的内部又一个什么属性？ prototype属性
函数对象一创建就加进去了那函数对象什么时候创建定义的时候就创建了
```

fn.__proto__那这个属性是什么时候添加的呢？
``` 这个属性在实例对象new Fn()身上吧创建对象的时候引擎加的也就是在这个函数创建的时候 它的内部做了一件事情```
fn(this).__proto__ = Fn.prototype
``` 就是说隐式原型的值 等于 对应 显式原型的值```

那在它function Fn(){};的内部做了什么事情
``` 在创建函数对象的时候 内部做了什么事情, this.prototype = {};```


<br>

### <font color="#C2185">结构图</font>
```js
function Fn(){ };
var fn = new Fn();

console.log(Fn.prototype, fn.__proto__);
console.log(Fn.prototype === fn.__proto__);

Fn.prototype.test = function(){
  console.log("test()");
};
fn.test();
```

1. 创建了一个对象
function Fn(){};

2. 接下来干了下面的事情
var fn = new Fn();

3. 我打印fn.__proto__ 最终找到的是 0x234的空对象

4. Fn.ptototype.test = function(){console.log("test()");};
给原型添加方法

5. 通过实例对象调用原型的方法 fn.test();
``` 
fn. .找谁？ 找2中的0x345吧 可是没有test 但最后找到了 说明它的内部去找谁去了？ 找隐式原型属性 __proto__ 最终找到了原型对象里的test方法
也就是说 通过对象调用了某个方法或者是属性 先在本身上的属性找  没有的话 去原型上找 那是看显示原型属性么？ 不看 看的是隐式原型属性
那跟显式原型有关系么？ 找的时候是没关系的 但是 隐式原型的值 最先开始赋值的时候 赋值的是显式原型的值
```


<br>

### <font color="#C2185">图解</font>
栈内存                                  堆内存

2. 创建实例对象                  2. Fn的实例对象(地址值是:0x345)
fn:0x345            →       实例对象上都有 __proto__属性 它的值是？
                          因为内部都执行 fn(this).__proto__ = Fn.prototype
                          __proto__: 0x234    
                                                  ↘
                                                      空Object对象
                                                      (地址值是:0x234)
                                                      4. 在这里添加了一个方法
                                                      test=function
                                                  ↗
1. 对象对应的函数名          1. 创建了一个Fn对象
Fn:0x123                    (地址值:0x123 )                              
(这里面存的是地址值 )   → 
                          Function里面有个prototype属性
                          (Fn.prototype:0x234(地址值))

<br>

# 原型链

1. 原型链(图解)
访问一个对象的属性时先在自身属性中查找找到返回
- 如果没有再沿着__proto__这条链向上查找找到返回
- 如果最终没找到返回undefined
``` 原型链的尽头是 Object的原型对象我们的原型链是沿着 隐式原型去找的```

别名:
隐式原型链  --- 本质
作用:
查找对象的属性(方法)
``` 原型链是用来查找对象属性的 不是用来查找变量的 找变量 去 找作用域链```
                                      
2. 构造函数 / 原型 / 实体对象的关系1(图解)
3. 构造函数 / 原型 / 实体对象的关系2(图解)

最后看
函数对象是Function的实例 Function是个什么类型的数据函数呗 
所有函数都有两个属性 一个显式原型 一个隐式原型属性 隐式原型属性 指向Function的显式原型

function Foo(){};
一般这么写 其实都是  var Foo = function(){};

Fucntion = new Function;
只有这么写 才能保证 它的显式原型 和它自身的隐式原型是相等的 别的函数就没有这个特点
别的函数 函数的显式原型是一个什么值？ 是一个new的Object 
所有函数的隐式原型( __proto__) 都是一样的 为什么？ 因为都是new Function 产生的 都是通过这种方式产生的 所以 隐式原型应该都一样


<br>

### <font color="#C2185">Object 是 Function的实例 这是咋回事？</font>
因为任何函数都是 new Function产生的 无论是内置函数 还是我们定义的函数 都是new Function产生的 当然对了
```js
function Fn(){
  this.test1 = function(){
      console.log('test1()');
  };
};

Fn.prototype.test2 = function(){
  console.log('test2()');
};
```

创建实例对象
```js
var fn = new Fn();

fn.test1();         //能不能调用 可以吧
fn.test2();         //能不能调用 可以吧

console.log(fn.toString());         //能不能调用 可以吧
fn.test3();         //能不能调用？ 不能 fn.test3 is not a function undefined
```
``` 
当我们去访问一个对象的属性时, 就这上面的这句话 我们看这个Fn.test1(); 这是访问属性么？ 是 可这不是在调用方法么？ 调用方法 方法是不是属性
首先我是不是根据test1的属性名找到的对应属性值 而且这个属性值 还必须是一个函数 我才能加上() test1(), 那怎么查找的 它应该有一个查找的流程 
```


# 原型链的属性
1. 读取对象的属性时会自动到原型链中查找
2. 设置对象的属性值时不会查找原型链如果当前对象中没有此属性直接在当前对象里添加此属性并设置其值
``` 一般情况下 我们不会在原型中添加属性属性一般添加在对象自身身上 方法放在原型上```
Person.prototype.setName = function(name){
  this.name = name;
};
``` 因为每个对象的属性不一样而方法一样 所以属性添加在自身的身上而方法添加在原型上```
3. 方法一般定义在原型中属性一般通过构造函数定义在对象本身上



<br>

### <font color="#C2185">小例子</font>
```js
function Fn(){

};
Fn.prototype.a = "xxx";

var fn1 = new Fn();

console.log(fn1.a);     //现在能不能看到这个a呢？ 原型上面的属性 实例对象都可见

var fn2 = new Fn();

fn2.a = 'yyy';          //改变a的值
console.log(fn1.a);     //是xxx 还是yyy  结果是xxx 为什么？ fn2.a 是yyy
```


<br>

### <font color="#C2185">fn1.a 为什么不是 yyy 解析 ↓</font>
我们在查找fn1中的a时是利用原型链去查找这个a是在fn自身对象里面有的么？不是 明显放在原型里面了嘛


<br>

### <font color="#C2185">那为什么fn2.a = 'yyy' 没有把xxx覆盖掉呢？</font>
我们看下fn2本身 console一下看看 结果是fn2上面多了一个a属性: yyy而原型上面也有个a属性 值是xxx

原型链是用来查找对象属性只有读取对象属性值的时候才会看原型链
而
当我设置属性值的时候 不看原型链

<br>

# 探索 instanceof 
A instanceof B   判断A 是不是B的实例

1. instanceof 是如何判断的？
表达式 A instanceof B

``` 如果B函数的显式原型对象在A对象的原型链上返回true 否则返回false```
2. Function是通过new自己产生的实例


<br>

### <font color="#C2185">案例1</font>
function Foo(){};
var f1 = new Foo();
console.log(f1 instanceof Foo);         //很明显 是
console.log(f1 instanceof Object)       //也对

A instanceof B  判断的标准 也就是什么时候返回true呢？
函数有什么属性？B有什么属性 显示原型属性(prototype)
A有隐式原型属性对象有一个原型链的问题
B是个函数对吧它的显式原型所指向的那个对象在A对象的原型链上就就返回true

Object instanceof Function      //true
Object instanceof Object        //true
Function instanceof Function    //true
Function instanceof Object      //true
Object instanceof Foo           //false

<br>

# 测试题

<br>

### <font color="#C2185">第一题</font>
```js
var A = function(){};
A.prototype.n = 1;

var b = new A();

A.prototype = {     //更新了prototype本身 指向了一个对象
n:2
m:3             //b 能看到 n么
}

var c = new A();
console.log(b.n, b.m, c.n, c.m)  1   undefined  2   3
```


<br>

### <font color="#C2185">第二题</font>
```js
var F =function(){};
Object.prototype.a = function(){
console.log('a()');
};

Function.prototype.b = function(){
console.log('b()');
};

var f = new F();
f.a()       本身没有a方法去找原型 a和toString 是在一个容器里
f.b()       找不到
F.a()       相当于 把F看成实例对象 F 能调用
F.b()
```

<br>

# 变量提升 与 函数提升(其实就是预处理)


<br>

### <font color="#C2185">变量声明提升</font>
通过var 定义(声明)的变量在定义语句之前就可以访问到
值: undefined


<br>

### <font color="#C2185">函数声明提升</font>
通过function声明的函数在之前可以直接调用
值: 函数定义(对象)
```js
fun();      //我是一段测试文字    
function fun(){
  console.log("我是一段测试文字")
};
```

\\ 问题: 变量提升和函数提升是如何产生的

```js
var a = 3;
function fn(
console.log(a);
var a = 4;
)
fn();       //undefined 
```

运行流程在函数体执行前var a; 



<br>

### <font color="#C2185">函数声明提升</font>
```js
fun();      //能不能调用？ 能 因为是函数提升 结果: 我是一段测试文字    

function fun(){
console.log("我是一段测试文字")
};

fn3();                  //能不能调用 不能 因为它遵循的是变量提升
var fn3 = function(){
console.log('fn3()')
};
```

<br>

# 执行上下文
1. 代码分类(位置)
全局代码
局部代码

2. 全局执行上下文
在执行全局代码前 将window确定为全局执行上下文
对全局数据进行预处理就是要收集数据了 在这步的时候 全局代码还没有执行
var定义的全局变量 -``` undefined添加为window属性
function声明的全局函数 -``` 赋值(fun)添加为window方法
this -``` 赋值(window)
开始执行全局代码 


``` 我在下面定义的a2 我在上面能直接访问到a2```
a2();            

``` 
我在下面定义的a1 我在上面能直接访问到a1
我找a1的时候 是去全局上下文里找因为 已经被作为属性添加在window里了window.a1
```
console.log(a1);    

console.log(this);  
``` 
我一上来就能访问这个 我能访问说明它已经在了 说明在执行全局代码之前 它要做一些准备工作
```

``` 
那a1 a2去哪找的？ 要知道a1相当于 window.a1; a2相当于 window.a2 这些东西都在window里面
也就是说无论是要查找函数还是变量都要去window里面找
```


var a1 =3;
function a2(){ };



<br>

### <font color="#C2185">函数执行上下文</font>
函数执行上下文
在调用函数准备执行函数体之前创建对应的函数执行上下文对象
对局部数据进行预处理
形参变量 -``` 要赋值(赋值的是实参数据) -``` 添加为执行上下文的属性
arguments -``` 赋值(所有的实参列表) -``` 添加为执行上下文的属性
``` 在我执行函数体之前 arguments已经在了 而且还有值```

var定义的局部变量 -``` undefined添加为执行上下文的属性
function声明的函数-``` 赋值(fun)添加为执行上下文的方法
this -``` 赋值(调用函数的对象)
开始执行函数体代码

``` 我们的内存空间是隔离的 你在你的区域 我在我的区域 不影响```

```js
function fn(a1){
console.log(a1)             //2
console.log(a2)             //undefined
a3();                       //a3()
console.log(this)           //window
console.log(ararguments)    //[2,3]
``` 
    类数组或者叫伪数组, 这里能访问到下面的哪些东西   
```

var a2 = 3;
function a3(){
  console.log('a3()');
}
};
fn(2, 3);
```


<br>

### <font color="#C2185">测试题</font>

console.log('gb: ' + i);                //undefined
00      var i = 1;
11      foo(1);
22      function foo(i){
33          if(i == 4){return}          // 如果i=4 停止
44          console.log('fb:' + i);     //1
55          foo(i+1);
``` 
这里调了一个当前函数foo 这种调用成为 递归调用: 在函数内部调用自己
递归函数一般都会有退出终止的条件if(i == 4){return} 要不就是一个死循环
i在不断的增加吧
```
66          console.log('fe:' + i);     //1

};

console.log('ge' + i);                  //1


讲一下函数的执行流程
00  var i = 1;
11  foo(1);
22  function foo(i){
33      if(i == 4){return} 
44      console.log('fb:' + i);
55      foo(i+1);
66      console.log('fe:' + i); 
};
console.log('ge' + i);


var i
function foo(i) {
if(i==4) return
console.log('fb'+i);
foo(i+1);
console.log('fe'+i)
}
console.log('gb: ' + i);
i=1;
foo(1);
console.log('ge'+i)
``` 
首先开始输出44行fb因为11行开始调用直接到44行开始输出第一条语句 fb: 1
我们想开始传了1进来输出fb: 1 

接下来 又开始执行55行 foo(i+1);这时候传进去的是1+1=2
然后又会输出第44行 输出fb: 2

然后又开始调用foo(i+1);这时候传进去的是2+1=3
然后又会输出第44行 输出fb: 3

接着又开始调用foo(i+1);这时候传进去的是3+1=4
然后遇到了33行就结束了

i=4结束了开始执行i=3 所以输出fe: 3
i=3 输出 fe: 3后 当前调用就结束了 结束就要移除
开始执行i=2 输出fe: 2结束就要移除
开始执行i=1 输出fe: 1

也就是最后调用的函数结束了 前面的函数没有结束
66行其实每调用一次foo(i+1); 66行都会执行 只是执行的时机不一样
```



<br>

### <font color="#C2185">测试题1     答案function</font>
无非就是两种可能性 一个undefined 一个是函数 这里面涉及到了变量提升 和 函数提升 谁先谁后的问题 
*先执行变量提升再执行函数提升* 最终 typeof a是function

```js
function a(){};     // 来个a 定义了一个函数
var a;              // var了个a
console.log(typeof a)
```

最终的顺序应该这样的 所以是function:
```js
var a;
function a(){}; 
console.log(typeof a)
```



<br>

### <font color="#C2185">测试题2     答案undefined</font>
```js
if(!(b in window)){
  var b = 1;
}
console.log(b);    
// 先看 b in window 是true还是false 如果是true就不能进到var b = 1 所以最后的值就是undefined
```



<br>

### <font color="#C2185">测试题3     答案 c is not a function</font>
```js
var c = 1;
function c(c){
  console.log(c);   
}
c(2);

<br>

var c
function c(c) {
  console.log(c)
}

c = 1

c(2)
```

```js
// 首先存在变量提升 和 函数提升
function c(c){
  console.log(c);   
}       

// 实际上代码应该是这样的结构
var c;
function c(c){
  console.log(c);   
} 
c=1;
c(2); 

// c=1 是个数字类型了 就不能调用函数了 c不是函数了
```

<br><br>

# 复习:


<br>

### 知识点:
1. 栈结构用一句话概括后进先出
2. 函数对象才有这个属性prototype
3. 函数也可以当做对象来使用 如 ``函数.``
```s
但是这个对象不是函数对象 就没有这个属性, 比如new Object产生的对象就没有 因为它不是一个函数对象

那Object有没有这个属性它本身就有 因为它就是函数对象 所有的函数对象都有 显式原型属性(prototype)

prototype是个引用变量的属性 说明它指向的是一个对象指向的对象被称为原型对象  
prototype是函数被创建的时候添加进去的什么创建的函数对象呢？定义函数的时候被创建
```

<br>

## 概念


<br>

### 执行函数定义:
就是编写函数体  
定义函数的时候其实就是执行函数定义函数体并没有执行只是创建了一个函数对象

定义函数 它创建函数对象时内部要执行一条语句
```js
this.prototype = {}     //创建了一个空的函数对象 这个对象也就是原型对象
// this是 创建的函数对象 
```

<br>


<br>

### 执行函数:
就是fn()这才是执行了函数对象

实例对象就有隐式原型属性 那实例对象又分为两类

**函数:**    
函数是实例对象 这个实例对象有些特别 它同时又有显式原型对象 一般情况下 我们说的实例对象不是指的函数但函数它是实例对象 平时我们说创建实例对象 那肯定不是说定义一个函数 有时候我们把函数对象称之为类型对象 比如我们定义一个Person 这个Person是一个类型吧

<br>


<br>

### 函数对象是Function的实例:
我们一般说的实例对象是 new Person 产生的 也就说 new 构造函数产生的对象

**实例对象的隐式原型和函数的显式原型有什么样的关系?**  
是相等 或者说指向同一个对象 属性说白了就是变量

prototype 和 __proto__ 这两个数形变量都是引用变量 引用变量用来指向对象他们都指向同一个对象

<br>


<br>

### __proto__属性是new实例时产生的:
也就是说我们创建实例对象时 它的内部会产生一条语句 ``this.__proto__ = fun.prototype``(假设叫fun) 结果就是它们指向了同一个对象

```js
this.__proto__ = fun.prototype
```

我们现在赋值 相当于把prototype里面的值 这个内存的值 这个内里里面存了个地址值 赋值给__proto__

怎么样才能让两个引用变量都指向同一个对象将一个引用变量 赋值给 另一个引用变量就可以了 因为 赋值的是地址值

<br>


<br>

### 构造函数 和 它的实例对象都指向了一个空对象这个空对象真的是空的么？
它的里面还有 所有的实例对象 都有一个 隐式原型属性__proto__还有一个constructor(它叫构造器想想我一个实例对象我得知道我的构造器是谁吧)

<br><br>

# 原型链:
用来查找对象的属性准确的说是查找实例对象的属性隐式原型组成的链 找不到返回undefined

- 如果输出一个变量没有 它会报错 **找变量是沿着作用域链找**
- 如果输出一个属性没有它会undefined **找属性是沿着原型链找**

<br>

JS的继承是基于原型的继承 原型是个对象吧有的时候也会说js是基于对象的继承

一个实例的原型对象可能有多个 顶部默认是object的原型 这也就是说 所有new出来的实例对象 都有toString方法 一个函数本身也是一个实例对象平常我们只观察函数身上的显示原型属性

<br>

**这么理解**  
根据test这个属性名去找这个属性 这个属性里面对应的值是一个函数
```js
obj.test()
```

<br>


<br>

### 注意:
所有构造函数的实例对象的隐式原型 指向 构造函数的显式原型  
所有我们定义函数它的原型对象的是object的实例, 有一个例外 是object自己 它指向它自己

<br>


<br>

### 实例对象的隐式原型 等于 它所对应的显式原型:
那我们想 一般情况下 object是不是实例对象 , 一个函数既有显式原型又有隐式原型 它自身的隐式原型和显式原型相等么？ 不相等 但有一个例外

```js
A.prototype = {};
//这种的意思是 把原型对象指向了另一个对象不会影响之前创建好的实例但会影响之后创建的实例

A.prototype.xx = value;
//这种是在原型上添加属性或者方法 会影响到之前和之后创造的实例
```

<br><br>

# 执行上下文 与 执行上下文栈 
执行上下文 与 执行上下文栈 是根据变量提升和函数提升引申出来的

变量提升 和函数提升 是执行上下文 与 执行上下文栈的结果 

<br>


<br>

### 要点:
变量先提升 接下来是函数再提升 **函数的优先级更高 是指提升的晚 后执行**

变量提升后 var a 的a去哪去了?  
放在执行上下文里去了 执行上下文有两个 
- 一个是全局上下文
- 一个是函数上下文 

得看这条语句是写在函数外面 还是写在函数里面 如果是全局的语句 那就是提高到window里面去了 如果你是一个函数内部的语句, 只有在执行调用函数的时候 才能产生提升

<br>

**在执行上下文中 代码分为全局代码和函数内部代码 两种类型**  
一个对应的是全局上下文 一个是函数上下文

<br>

**什么时候确定全局执行上下文?**   
在全局代码执行前  
将window确定为执行上下文 确定好了以后 做预处理操作 也就是收集数据

也就是用var定义的全局变量还有函数声明的函数 还有this 收集的时候给它们赋值 变量是undefined 函数是函数对象this是window

而且把函数和变量放到哪去？ 放到window里面去 也就是保存到全局执行上下文里去了

<br>


<br>

### 整个过程分3步
1. 确定执行全局上下文 window
2. 预处理
3. 执行全局代码

<br>


<br>

### 函数执行上下文调用函数的时候产生跟调用了几次函数:
1. 创建一个函数执行上下文
2. 预处理 收集数据
3. 函数内部的局部变量 一个是形参var定义的局部变量 functon声明的函数 this  arguments 都会放在执行上下文中, 放之前要先赋值形参也要赋值 赋实参的值arguments是实参列表 局部变量undefined 函数为函数对象

<br>

做好这件事情后 就存在函数执行上下文里去, 下一步 执行函数体 就涉及到找某一个变量去执行上下文里去查 执行上下文没在对空间里面

执行上下文栈用来管理和保存执行上下文对象栈底是window 上面是函数的执行上下文   
比如下面结构栈底是window 上面是两个函数 f1和f2是什么关系f1内部调用f2才会产生这种现象

<br><br>

# 作用域
就是一块 地盘 一个代码段所在的区域, **它是静态的**(相对于上下文对象)在编写代码时就确定了

<br>


<br>

### 分类:
- 全局作用域
- 函数作用域
- 没有块作用域, 什么是块作用域相当于大括号作用域
```js
if(true){
var c = 3;
}
// 我在外面能不能见到c 能看到就不是块作用域
console.log(c);
```

<br>


<br>

### 作用:
隔离变量 不同作用域下同名变量不会有冲突
```js
var a = 10, b = 20;

function fn(x){
var a = 100, c = 300;
console.log('fn()',a,b,c,x);
          // a:100, b:20, c:300, x:10

function bar(x){
  var a = 1000, d = 400;
  console.log('bar()', a, b,c,d,x)
          // a:1000, b:20, c:300, d:400, x:100/200
};
bar(100);
bar(200);
};
fn(10);
```

<br>

**上面产生了几个作用域？**  
执行上下文对象是什么原则是n+1原则是调用了几次函数+1

<br>

## 产生作用域的原则
是N+1原则 N是定义了几个函数 就是几个函数作用域1是全局作用域

<br>


<br>

### 作用域和执行上下文的区别
**区别1:**  
全局作用域之外每个函数都会创建自己的作用域 作用域在函数定义时(编码时)就已经确定了而不是在函数调用时

- 全局执行上下文环境是在全局作用域确定之后js代码马上执行之前创建动态创建的
- 函数执行上下文环境是在调用函数时函数体代码执行之前创建

<br>

**区别2:**  
作用域是静态的只要函数定义好了就一直存在且不会再变化 执行上下文环境是动态的调用函数时创建函数调用结束时上下文环境就会自动释放

执行上下文环境(对象) 是从属于所在的作用域
- 全局上下文环境 --- 全局作用域
- 函数上下文环境 --- 对应的函数使用域

<br><br>

## 作用域链
嵌套的作用域 产生的 由内向外 由下向上的一个过程

多个上下级关系的作用域形成的链它的方向是从下向上或者从内到外, 查找变量时就是沿着作用域链来查找的

<br>


<br>

### 查找一个变量的查找规则:
- 在当前作用域的执行上下文中查找对应的属性如果有直接返回否则进入2
- 在上一级作用域的执行上下文中查找对应的属性如果有直接返回否则进入3
- 再次执行2的相同操作直到全局作用域如果还找不到就抛出找不到的异常

<br><br>

## 复习:
- 作用域的作用是用来隔离变量 在不同的作用域里定义相同的变量 不冲突
- 作用域链用来查找变量 沿着作用域链找变量, 找到就返回 找不到就要报错

<br>

比如a.b 找a是沿着作用域链找找b是沿着原型链找 找不到就返回undefined

<br>

如果我找window.a 会是undefined, 如果直接找a 会报错  
那平时 我们说 直接写a 相当于 window.a, 还是有点区别 区别就是找不到以后 它怎么处理

<br>

- 作用域是代码一书写时就确定了
- 作用域是N+1个 N是定义了多少个函数1是全局

- 执行上下文也是N+1 N是执行函数的次数 1是全局
- 执行上下文是动态产生的 尤其是函数执行上下文 不会一直存在调用的时候产生 函数执行完就死亡

- 查找一个变量 找的是作用域链 而作用域链是根据我代码定义(书写)的位置确定的, 跟调用位置没关系

<br>


<br>

### 什么是执行上下文栈(执行栈)执行上下文(可执行代码)
首先说一下 可执行代码的类型有什么

1. 全局代码  
例如加载外部的js文件或者本地标签内的代码.全局代码不包括 function 体内的代码

2. 函数代码  
function体内的代码

3. eval代码  

<br>

当js引擎遇到这三种类型的代码的时候都会进行一些准备工作

这些准备工作专业的说法就叫执行上下文, 或者说js引擎遇到这三种类型的代码的时候就会进入到一个执行上下文

每当js代码在运行的时候它都是在执行上下文中运行 执行上下文可以理解为当前代码的执行环境它会形成一个作用域

<br>


<br>

### 那么js引擎在遇到可执行代码的时候它究竟会做哪些准备工作呢？
**全局执行上下文:**   
- 浏览器引擎在执行全局代码前将window确定为全局执行上下文
- 对全局数据进行预处理
- var定义的全局变量 ==> undefined,添 加为window的属性
- function声明的全局函数 ==> 赋值为fun添加为window的方法
- this==>赋值为window,表示全局执行上下文
- 开始执行全局代码 一个程序中只会有一个全局执行上下文

```js
var num = 2;
function pow(num) {
return num * num;
}
```

<br>

**引擎如何读取上面的代码？**
- 引擎: 第一行它是变量！将它存储在全局存储器中
- 引擎: 第二行我看到了一个函数声明 让我们也把它存储在全局存储器中

<br>


<br>

### 全局存储器:
全局内存包含全局变量和函数声明供以后使用

当Javascript引擎运行你的代码时它会创建:
- 全局执行上下文
- 全局存储器(也称为全局作用域或全局变量环境)

<br>


<br>

### 函数执行上下文:
每当一个函数被调用时都会为该函数创建一个新的上下文 每个函数都有自己的执行上下文不过是在函数被调用时创建的

函数上下文可以有任意多个 每当一个新的执行上下文被创建它会按定义的顺序执行一系列步骤

- 在调用函数准备执行函数体之前 创建对应的函数执行上下文对象
- 对局部数据进行预处理
- 形参变量 ==> 赋值(实参) ==> 添加为执行上下文的属性
- argument s==> 赋值(实参列表)添加为执行上下文的属性

- var定义的局部变量 ==> undefined,添加为执行上下文的属性
- function声明的函数 ==> 赋值(fun),添加为执行上下文的方法
- this ==> 赋值( 调用函数的对象)
- 开始执行函数体代码

<br>


<br>

### 执行上下文的生命周期
**创建过程:**  
1. 创建变量: 即初始化函数的参数arguments提升函数及变量的声明
2. 建立作用域和作用域链
3. 确定this的指向.

<br>

**执行过程:** 
1. 变量赋值 
2. 函数引用 
3. 执行其他代码

<br>

**销毁阶段:**   
执行完毕后出栈等待被回收.

<br>

**创建阶段:**   
在全局执行上下文中this的值指向全局对象在浏览器中this的值➡window对象;在nodejs中指向的是➡module对象

在函数执行上下文中this的值取决于函数的调用方式(即如何被调用的).当它被一个引用对象调用则将的值this设置为该对象否则this的值设置为全局对象或undefined(在严格模式下)

<br>

**执行上下文栈:**  
在一个javascript程序中必定会产生多个执行上下文javascript引擎会以栈的方式来处理它们也就是执行上下文栈

<br>

**执行上下文栈:**  
每个函数都有自己的执行环境当执行流进入一个函数时函数的环境就会被推入一个环境栈中函数执行完后栈将其环境弹出把控制权返回给之前的执行环境

一个程序代码中包含多个函数也就是包含多个函数执行上下文为了管理好多个执行上下文之间的关系JavaScript中创建了执行上下文栈来管理执行上下文执行上下文栈是具有后进先出结构的栈结构用于存储在代码执行期间创建的所有执行上下文

当JavaScript引擎运行JavaScript代码时它会创建一个全局执行上下文并将其push到当前调用栈(函数还没解析或者是执行、调用)仅存在全局执行上下文每当引擎发现函数调用时引擎都会为该函数创建一个新的函数执行上下文并将其推入到堆栈的顶部(当前执行栈的栈顶)当引擎执行其执行上下文位于堆栈顶部的函数之后将其对应的函数执行上下文将会从堆栈中弹出并且控件到达当前堆栈中位于其下方的上下文(如果有下一个函数的话)

<br><br>

# 进程与线程
有的程序是多进程的 有的是单进程的

如果一个程序的进程中 有多个线程 那它就是多线程的程序 只有一个线程就是单线程程序

<br>


<br>

### 进程:
程序启动了一个对应的进程就启动了程序的一次执行它占有一片独有的内存空间 可以通过window任务管理器查看进程

<br>


<br>

### 线程:
是进程内的一个独立的执行单元是程序执行的一个完整流程 是cpu的最小单元

<br>


<br>

### 相关知识:
我们应用程序的代码必须运行在某个进程的某个线程上也就是说一个程序启动后一个线程都没有能运行代码么？ 不能

一个进程中至少有一个运行的线程 主线程进程启动后自动创建因为要运行代码 在运行之前必要要创建一个主线程

- 一个进程中也可以同时运行多个线程我们会说程序是多线程运行的
- 一个进程内的数据可以供其中的多个线程直接共享

- 多个进程之间的数据是不能直接共享的(因为进程之间的内存是独立的)
- 线程池: 保存多个线程对象的容器实现线程对象的反复利用

<br>


<br>

### 何为多进程与多线程:
- 多进程运行: 一个应用程序可以同时启动多个实例运行
- 多线程: 在一个进程内同时有多个线程运行

<br>


<br>

### 比较单线程与多线程
**多线程:**
- 优点: 能有效提升CPU的利用率
- 缺点:
1. 创建多线程需要开销的(需要费工夫的 不是随便就有的)
2. 线程间切换开销
3. 死锁与状态同步问题

<br>

**单线程:**
- 优点: 顺序编程简单易懂  单线程说白了就是从上往下执行 这时候编码比较简单多线程的话 编码要复杂一些

- 缺点: 效率低

<br>


<br>

### JS是单线程还是多线程
JS是单线程运行的, 但使用H5中的web Workers可以多线程运行   
启动分线程的语法

<br>


<br>

### 浏览器运行是单线程还是多线程
都是多线程运行的

<br>


<br>

### 浏览器运行是单进程还是多进程

有的是单进程的
- firefox
- 老板ie

有的是多进程
- chrome
- 新版ie

<br>


<br>

### 双核cpu:
在同一个时间点 同时做两件事 这样两个线程在同一个时刻可以同时运行

<br>


<br>

### 单核cpu:
也能创建多线程 创建2个线程 但它只能处理一个线程另外一个线程暂停 
-它不会等一个线程执行完再执行另一个 它会在两个线程间跳转运行 这个叫线程间的切换 不是

<br><br>

## 浏览器内核
支撑浏览器运行的最核心的程序

浏览器也是软件也是应用 也是很多代码组成 在这些代码中 有支撑它运行最核心的代码 这就是内核

<br>

**不同的浏览器内核可能不一样**
- chrome safari: 使用的是 webkit 内核
- firefox: Gecko
- ie: Trident
- 360 搜狗等国内浏览器: Trient+webkit 设计到钱的时候 会切换到Trident 安全性比较高

<br>


<br>

### 内核由多个模块组成 有哪些呢?
主线程运行的模块

JS引擎模块: 负责JS程序的编译与运行  
也是程序 同时也是代码 浏览器内部就有的 内核中
- htmlcss文档解析模块: 负责页面文本的解析
-  DOM/CSS模块: 负责dom/css在内存中的相关处理
- 布局和渲染模块: 负责页面的布局和效果的绘制(内存中的对象)

<br>

分线程运行的模块
- 定时器模块: 负责定时器的管理
- DOM事件响应模块: 负责事件的管理
- 网络请求模块: 负责ajax请求


<br>


<br>

### 定时器引发的思考

1. 定时器真的是定时执行的么？定时器并不能保证真正的定时执行  
一般会延迟一丁点(可以接受)也可能延迟很长时间(不能接受) 设定200 实际580

<br>

2. 定时器回调函数是在分线程执行的么？  
在主线程执行的js是单线程的

3. 定时器是如何实现的？  
事件循环模型(后面讲)
```js
var start = Date.now();
console.log('启动定时器前')

setTImeout(function(){
console.log('定时器执行了'Date.now()-start)
},200)

console.log('启动定时器后')
```

<br>


<br>

### js是单线程执行的
1. 如何证明js执行是单线程的  
setTimeout()的回调函数是在主线程执行的 定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行

2. 为什么js要用单线程模式而不用多线程模式
js的单线程与它的用途有关 作为浏览器脚本语言js的主要用途是与用户互动 以及操作DOM 这决定了它只能是单线程否则会带来很复杂的同步问题

3. 代码的分类
初始化代码 回调代码    回调函数中的代码

4. js引擎执行代码的基本流程 

先执行初始化代码:
- 包含一些特别的代码    回调函数(异步执行)
- 设置定时器
- 绑定监听
- 发送ajax请求
- 后面在某个时刻才会执行回调代码
