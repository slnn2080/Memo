# 资料补充:

### 待整理事项:

**1. 视频看到这里**
```
https://www.bilibili.com/video/BV12J41147fC?p=33&spm_id_from=pageDriver
```

**2. 正则的内容 js 和 java在一些地方是共通的 也可以参考下java**

<br><br>

### 匹配模式 和 字符属性 参考资料

**参考资料:**
```
https://blog.csdn.net/rambler_designer/article/details/120280676
```

**<font color="#C2185B">匹配模式: u</font>**  
匹配国家文字
```
http://www.unicode.org/standard/supported.html
```

**<font color="#C2185B">匹配模式: \p{}</font>**  
```
https://www.regular-expressions.info/unicode.html#prop
```

<br><br>

# 创建正则的方式

### **方式1：**
```js
let reg = /正则/匹配模式
```

**<font color="#C2185B">/.../igs</font>**   
这种方式创建的正则没办法识别变量
```js 
let str = "houdunren.com"
let a = "u"

/a/.test(hd)      // 这样找的是a 不是预期中的u
```

<br>

**扩展:**  
**<font color="#C2185B">eval(...)</font>**   
将参数部分解析为表达式
```js 
let str = "houdunren.com"
let a = "u"
eval( `/${a}/`.test(hd) )
```

<br>

### **方式2：**
**<font color="#C2185B">new RegExp("正则", "igs")</font>**   
这种方式第一个参数内部是识别变量的
```js 
let str = "houdunren.com"
let a = "u"
let reg = new RegExp(a, "igs")
```

<br>

### 正则对象的方法: exec()
**<font color="#C2185B">reg.exec(str)</font>**   

**要点:**  
如果定义 reg 对象的时候 匹配模式没有 /g, 那么 exec() 方法只会检索一次 匹配到就结束

如果定义 reg 对象的时候 匹配模式有 /g, 那么需要依次调用 exec() 方法来实现继续向下查找的功能 同时在/g的情况下 lastIndex 才会发生变化

也就是说 开启了 g 利用了 lastIndex 记录查找到哪里(最新位置) 然后按照**最新的位置** 进行继续查找 直到找到最后

```js
let str = "java"
let reg = /\w/g

console.log(reg.exec(str))    // j
console.log(reg.lastIndex)    // 1

console.log(reg.exec(str))    // a
console.log(reg.lastIndex)    // 2

console.log(reg.exec(str))    // v
console.log(reg.lastIndex)    // 3

console.log(reg.exec(str))    // a
console.log(reg.lastIndex)    // 4

console.log(reg.exec(str))    // null
console.log(reg.lastIndex)    // 0
```

<br>

**<font color="#C2185B">reg.lastIndex</font>**   
依次查找字符串中每一个字符的位置 该属性代表当前字符所在的位置
每一次匹配能得到最新的位置直到查询结束

**注意：**  
当使用 匹配模式g 的时候 lastIndex 才会发生变化 不然后是0

```js  
let hd = "houdunren"
let reg = /\w/g

reg.lastIndex   // 0
reg.exec(hd)    
reg.lastIndex   // 1
reg.exec(hd)    

while((res = reg.exec(hd))) {
  log(res)
}
```

<br>

### **正则对象 reg:**
每个正则对象都包含5个属性
1. source
2. global
3. ignoreCase
4. multiline
5. lastIndex

<br>

**<font color="#C2185B">reg.source</font>**   
正则的内容 /之间的内容/
```js
let reg = /11/g
console.log(reg.source)   // 11
console.log(reg.global)
console.log(reg.ignoreCase)
console.log(reg.multiline)
```

<br>

**<font color="#C2185B">reg.global</font>**   
只读的布尔值 查看当前正则表达式是否带有 g

<br>

**<font color="#C2185B">reg.ignoreCase</font>**   
只读的布尔值 查看当前正则表达式是否带有 i

<br>

**<font color="#C2185B">reg.multiline</font>**   
只读的布尔值 查看当前正则表达式是否带有 m

<br>

**<font color="#C2185B">reg.lastIndex</font>**   
是一个可读/写的整数，如果匹配模式中带有g修饰符，这个属性存储在整个字符串中下一次检索的开始位置，这个属性会被exec( ) 和 test( ) 方法用到。
```js
let str = "1111"
let reg = /11/g

console.log(reg.test(str))
console.log(reg.lastIndex)    // 2
```

当调用exec( )的正则表达式对象具有修饰符g时，它将把当前正则表达式对象的lastIndex属性设置为紧挨着匹配子串的字符位置，当同一个正则表达式第二次调用exec( )，它会将从lastIndex属性所指示的字符串处开始检索，如果exec( )没有发现任何匹配结果，它会将lastIndex重置为0。

test( )方法，它的参数是一个字符串，用test( )对某个字符串进行检测，如果包含正则表达式的一个匹配结果，则返回true，否则返回false。

当调用*test( )*的正则表达式对象具有修饰符g时，*它的行为和exec( )相同*，因为它从*lastIndex*指定的位置处开始检索某个字符串，如果它找到了一个匹配结果，那么它就立即设置lastIndex为紧挨着匹配子串的字符位置
看看下面这段有趣的代码

为什么同样的字符串，同样的正则表达式，却打印的不一样，如果你已经理解了 lastIndex属性，那你一定明白为什么。

在强调一次，上面说的关于lastIndex的问题，都是因为正则表达式对象中带有修饰符g，如果不带有修饰符g，就不用担心这些问题了。

<br>

### 匹配模式
**<font color="#C2185B">i:</font>**   
匹配时不区分大小写

<br>

**<font color="#C2185B">g:</font>**   
匹配到结尾 不加仅匹配一个

<br>

**<font color="#C2185B">s:</font>**   
将换行符视为空白(.能匹配到换行了) 设置s就是能匹配到换行符
或者说忽略换行符

<br>

**<font color="#C2185B">m</font>**   
每一行单独处理 用以在多行模式中执行匹配 需要配合 ^ 和 $

<br>

**示例:**
```js
// 下面的str是多行文本 就是有换行
let str = "java\njavascript"

// 现在我想检索 在段首的 javascript 但是 如果我这么写
let reg = /^javascript/

// 会是null
console.log(res)  // null

// 但是如果我们加上 /m 就开启了多行模式 就可以找到段首的位置
let reg = /^javascript/m
console.log(res)

```

<br>

**<font color="#C2185B">u:</font>**   
使用字符属性的时候使用 开启这个模式也能匹配宽字节字符 奇奇怪怪的字符

<br>

**<font color="#C2185B">y</font>**   
必须连续的满足条件
```js 
let hd = "后盾人qq群: 1111,9999后端人"
let reg = /(\d+),?/y
reg.lastIndex = 7
let qq = []
while((res = reg.exec(hd))) {
  qq.push(res[1])
}
```

<br><br>

# 转义
### **字面量定义正则对象的情况**  
```js
// 将 . 作为普通的 .
let reg = /\./
```

<br>

### **new RegExp定义正则对象的情况**  
```js
new RegExp("\\d")
new RegExp("\\.")
```

上述的的情况下我们要使用 \\\   
用一个\跟不加\是一样的

如果写在这里的形式是这样的 new RegExp("\d") 其实和 RegExp("d") 是没有任何区别的 

也就是说在字符串中 "\d == d" 它俩是一样的 但是我们想在字符引号中只用正则 所以要再次的进行转义
```js
new RegExp("\\d")
new RegExp("\\.")
```

<br><br>

# 字符属性 和汉字的匹配
我们的任意字符都有相对应的属性 来进行区分 比如 a [L] 
a有L属性就代表是一个字母

```
doc.houdunren.com
```

<br>

**注意**  
字符属性的使用必须配合 **匹配模式 u 来进行操作**

<br>

**<font color="#C2185B">\p{字符属性}</font>**   
p是一个普通的字符 \p 将它转义为功能性的字符 \p{字符属性}
```js 

let hd = "houdunren2010"

// 我们要提取字母
hd.match(/\p{L}/gu)
```

<br>

**<font color="#C2185B">字符属性 \p{L}</font>**   
匹配所有字母

<br>

**<font color="#C2185B">字符属性 \p{P}</font>**   
匹配所有标点符号

<br>

**<font color="#C2185B">字符属性 \p{N}</font>**   
所有数字

<br>

**<font color="#C2185B">字符属性 \P{N}</font>**   
大写P的是时候是除了 这就是除了数字

<br>

**<font color="#C2185B">字符属性 \p{sc=Han}</font>**   
匹配汉字(日韩都可以)
```js 
let res = hd.match(/\p{sc=Han}/gu)
console.log(res);
```

```
Han
汉字

Hiragana
平假名

Katakana
片假名

Unified_Ideograph
```

<br><br>

# 正则符号

**<font color="#C2185B">正则表达式1 | 正则表达式2</font>**   
或 的意思 | 左右两侧是表达式
```js 
let hd = "houdunren"
/aaau|@/.test(hd)     // false
```

<br>

**要点:**
1. | 两侧为表达式
2. - 在正则中有特殊的含义 需要转义
3. () 编组 在一个组内的两种情况
```js 
let tel = "010-999999"
/010\-\d{7,8}|020\-\d{7,8}/
(010|020)-\d{7,8}
```

<br>

**<font color="#C2185B">[]</font>**   
匹配里面的元素 有或的意思
```js 
[123456]
// 匹配的是当中的一个元素 有哪个都会匹配成功 并不是匹配123456
```

**注意点:**  
()在正则中是组的意思 但是放在[()]里面的时候 就表示普通的()了
. 和 + 也是放到[]里面就变成普通的字符了 转义也不行

```js 
["(", ")"]
```

<br>

**<font color="#C2185B">[^]</font>**   
匹配除了里面的内容
```js 
let hd = "张三:010-9999"
hd.match(\[^-\d:,\s]\)    // ["张三"]
```

<br>

**<font color="#C2185B">()</font>**   
整体的意思 被包裹起来的部分是一个整体
```js 
(12|34)
```

或者匹配(12) 或者匹配(34) 比如有 888222 它不会单独匹配一个2 它必须匹配 12 这个整体

当前面进行编组后 想使用组里面的内容可以用 <font color="#C2185B">\1</font> 来代替

```js 
// ([-\/]) 对它进行了编组 后面 就可以用 \1
2022-02-23
/^\d{4}([-\/])\d{2}\1\d{2}$/
```

<br>

**<font color="#C2185B">.</font>**   
除换行外的任何字符 因为是匹配除了换行的字符 所以再次遇到换行符就停止了

<br>

**<font color="#C2185B">^</font>**   
限定起始便捷

<br>

**<font color="#C2185B">$</font>**   
限定结束边界

<br>

**<font color="#C2185B">元字符</font>**   
表示一类字符当中的一个

\d: 表示 0-9 当中的一个数值

\D: 表示 除了数字

\s: 表示空白 空格 换行 制表符 都属于空白

\S: 表示除了空白

\w: 表示字母 数字 下划线 (囊括了\d)

\W: 除了字母 数字 下划线

```js 
// 用户注册 用户名要求 字母数字下划线
^[a-z]\w{4,9}$
```

+: 1个或多个

+?  {2, 100}? -- 或倾向1个 or 倾向2个  往最少的一面

<br>

**技巧:**  
```js
// 能匹配所有字符
[\s\S]
```

```js 
let span = "div<span>hello</span>div"
let reg = /<span>[\s\S]+<\/span>/
let ret = span.match(reg)[0]
console.log(ret);
```

<br><br>

# 原子组
### **() -- $1 -- \1</font>**   
使用原子组包裹起来的部分是一个整体 就想图层里面的元素 移动的时候都是按照整体来操作 ctrl+g
```js 
<h1>
  houdunren
</h1>

// h[1-6] 的部分重复了 (h[1-6])  --  对应着  --  \1
let reg = /<h[1-6]>[/s/S]*</h[1-6]>/ig
```

<br>

### **原子组的使用:**
当我们使用 match 方法去提取 有原子组的数据的时候

**有 匹配模式 g 的情况下:**  
匹配到的结果会收集到一个数组中
```js 
let reg = /<(h[1-6])>.+<\/\1>/gi

let ret = body.innerHTML.match(reg)
console.log(ret);
    // ['<h1>houduren</h1>', '<h3>hdcms</h3>']
```

<br>

**没有 匹配模式 g 的情况下:**  
返回的是第一次 匹配到的结果的 详情对象

```js 
[
  '<h1>houduren</h1>', 
  'h1',     // 原子组包起来的数据
  index: 16, 
  input: '\n  <p>后盾人</p>\n  <h1>houduren</h1>\n  <h3>hdcms</h3>…}\n    // })\n    // console.log(ret);\n\n  <\/script>', 
  groups: undefined
]
```

上面数组的形式 有点奇怪是么 上面的数组的成元中包含了两种情况
- 有key
- 无key

有key的情况 成员可以通过 下标 取出使用
无key的情况 成员是通过 arr.target = "test" 方式添加进去的 所以取也是通过 .的方式来读取

<br>

**[0]:**   
我们通过正则匹配到的完整数据

<br>

**[1]:**   
原子组匹配到的信息, 原子组的信息是从1开始

<br>

**index属性:**   
表示从哪开始匹配的

<br>

**input属性:**   
原始的字符串 我们就是基于原始的字符串进行匹配的

<br>

**groups属性:**   
组的别名

<br>

我们在reg正则里面定义了 () () 两个原子组 如果是在正则是复用原子组的话 那么 \1 \2 的形式 如果是要替换的话 $1 $2 的形式

也就是说我们在正则的方法中 也可以使用原子组 比如 replace - $2
```js 
let hd = `
  <h1>houduren</h1>
  <span>后盾人</span>
  <h3>hdcms</h3>
`

let reg = /<(h[1-6])>([\s\S]+)<\/\1>/ig

let res = hd.replace(reg, "<p>$2</p>")
console.log(res);
```

<br><br>

# 匹配 替换符号
下面的情况 也可以说是在 replace API 中的情况

<br>

### **<font color="#C2185B">``$& \0``</font>**    
``$&``表示匹配的内容 使用的时候 可以用 ``\0`` 来代替

```js 
// 我们给教育加上链接
<main>
  在线教育是一种高效的学习方法
</main>

main.innerHTML = 
main.innerHTML.replace(/教育/, `<a href="www.baidu.com">$&</a>`)
```

<br>

### **<font color="#C2185B">$`</font>**   
匹配内容的 左边 的所有内容

<br>

**<font color="#C2185B">$'</font>**   
匹配内容的 右边 的所有内容

<br><br>

# 原子组别名 (``?<con>``)
之前我们使用原子组的时候 对应的都是 $1

现在我们可以给原子组起别名 对应的就是 ``$<con>``
```js 
// 1就是名字 现在换成了<con>
$1
$<con>
```

<br><br>

# 不记入组
### **<font color="#C2185B">(?:)</font>**   
我们可以对正则来进行分组 那分组之后每一个组就会产生对应的编号 比如
(\w+)\.(\w+)

这样就会产生两个小组 $1 和 $2 它们就会产生对应的$1 和 $2编号
但有的时候 我不希望其中的一个小组产生编号 那么就可以使用 不计入组
(\w+)\.(?:\w+)

这样第二个分组就不会有编号 \2 $2 之类的效果

<br>

**应用场景:**
我们有一个域名 https://www.houdunren.com

我们指向提取 www.houdunren.com 前面不要 怎么操作?

首先写出匹配 https://www.houdunren.com 的正则 然后对想要提取的内容进行分组 不加g的时候 1就是分组1的信息  
```js 
let hd = "https://www.houdunren.com"
let reg = /https:\/\/(\w+\.\w+\.(?:com|cn|org))/i
console.log(hd.match(reg)[1]);
```

<br><br>

# 禁止贪婪
我们看下下面的案例

**需求：**  
将span标签全部替换为h4 然后描红 内容前加上sam-

```js 
<div>
  <h3>houduren</h3>
  <span>后盾人</span>
  <span>后盾人</span>
  <span>后盾人</span>
  <span>后盾人</span>
  <h3>hdcms</h3>
</div>
```

如果我们这么定义正则
```js
const reg = /<span>[\s\S]+<\/span>/ig
```

我们会发现是一次性的提取的是所有span
```html
<span>后盾人</span>
<span>后盾人</span>
<span>后盾人</span>
<span>后盾人</span>
```

如果我们写的是进制贪婪 *+?* 那么每次会匹配一个span标签 依次匹配到最后
```js
const reg = /<span>[\s\S]+?<\/span>/ig
```

```js 
const main = document.querySelector("div")
const reg = /<span>([\s\S]+?)<\/span>/ig
main.innerHTML = main.innerHTML.replace(reg, (content, s1) => {
  return `<h1 style="color: red">sam - ${s1}</h1>`
})
```

<br><br>

# matchAll 全局匹配
我们来看下下面的情况 需求我们要提取后盾人 也就是说我们要提取的是标签体的内容
```html
<div>
  <span>后盾人</span>
  <span>后盾人</span>
  <span>后盾人</span>
  <span>后盾人</span>
</div>
```

根据上面html的结构 我们可能会这么写逻辑
```js 
const div = document.querySelector("div")

let reg = /<h1>(.+?)<\/h1>/ig
console.log(div.innerHTML.match(reg))
```

写 g 的时候 会把连带标签元素 和 标签体内容 都装进去数组中去
```js 
// 这样我们还是取不到标签体内容
['<h1>后盾人</h1>', '<h1>后盾人</h1>', '<h1>后盾人</h1>', '<h1>后盾人</h1>']
```

写 i 的时候 能获取标签体内容 但是仅会匹配第一个
```js 
 [
  '<h1>后盾人</h1>', 
  '后盾人',           // 这个就是编组后的匹配内容
  index: 5, 
  input: '\n    <h1>后盾人</h1>\n    <h1>后盾人</h1>\n    <h1>后盾人</h1>\n    <h1>后盾人</h1>\n  ', 
  groups: undefined
]
```

<br>

**<font color="#C2185B">matchAll(正则)</font>**   
这个API得到的是一个可迭代的对象 我们可以遍历这个迭代器对象

**注意:**  
要开启 g 模式

```js 
const div = document.querySelector("div")
console.log(div.innerHTML);
let reg = /<h1>(.+?)<\/h1>/ig

// 得到可迭代对象
iterator = div.innerHTML.matchAll(reg)

let contents = []
// 遍历可迭代对象
for(let searchArr of iterator) {
  contents.push(searchArr[1])
}

console.log(contents);
```

<br><br>

# 正则的方法 
**<font color="#C2185B">reg.test(字符串)</font>**   
返回值为布尔值

<br>

**<font color="#C2185B">reg.exec(字符串)</font>**   
如果单次匹配的时候(就是没有 g 的时候) 与match方法相似
都会返回原子组的详细信息

<br>

**注意:**  
但是使用 g 的时候 就会有区别 match方法会将匹配到的内容装到一个数组中 但是原子组的细节就没有了

exec方法 原子组的细节还是有 但是会有 **reg.lastIndex**  该方法每检索一次会暂停 reg.lastIndex++

该方法调用多次后 会延续上次一次的检索结果 继续检索 直到找不到为null停止 比较适合做循环

<br><br>

# 断言匹配
也就是正则表达式的条件语句

### **后面是什么的**  
**<font color="#C2185B">/检索内容(?=检索条件)/</font>**   
检索的还是 "检索内容" (里面是条件) 该条件指定的是 *后面是什么* 
```js 
// 匹配 后端人后面有教程的 后端人
/后盾人(?=教程)/
```

<br>

### **前面是什么的**  
**<font color="#C2185B">/(?<=检索条件)检索内容/</font>**   

<br>

### **后面不是什么的**  
**<font color="#C2185B">/检索内容(?!检索条件)/</font>**   

<br>

### **前面不是什么的**  
**<font color="#C2185B">/(?<!检索条件)检索内容/</font>**   

<br>

### **练习:**  
需求 将价格后面没有.00的补上.00
```js  
let lesssons = `
  js, 200元, 300次
  php, 300.00元, 100次
  nodejs, 180元, 260次
`

let reg = /(\d+)(.00)?(?=元)/ig
lesssons = lesssons.replace(reg, (item, ...args) => {
  // console.log(s1)
  // s1: 200 也就是组1中的内容
  // console.table(args)
  // s2: 组2中的内容 检索不到就是undefined

  // 当s1 s2分组很多的时候 我们可以将它们放到...args中
  // args[0]就是 组1中的内容 200
  // args[1]就是 组2中的内容 .00 没有就是undefined

  // 如果是undefined的话 就改为.00
  args[1] = args[1] || ".00"
  
  // args中的参数有4个0 1 2 3 我们只需要用前两个参数
  return args.splice(0,2).join("")
})

console.log(lesssons)
```

<br><br>

# 案例: 验证规则
定义多条正则 全部符合后为true  有点秀 every方法

**要点:**  
使用了 every方法 该方法当全部满足时 结果才会是true

```js 
input.addEventListener("keyup", (e) => {
  // 获取输入的值
  console value = e.target.value

  // 定义多条规则 输入框的内容为字符数字5到9位 还要包含一个大写字母
  const regs = [
    /^[a-z0-9]{5,10}$/i,
    /[A-Z]/
  ]

  // 结果全部为真的时候 整个表达式为真
  let status = regs.every(e => {
    e.test(value)
  })

  log(status)
})

```

<br><br>

# 需求: 将h1 和 h2换成p标签  --  原子组 替换
```js 
let hd = `
    <h1>houduren</h1>
    <span>后盾人</span>
    <h3>hdcms</h3>
  `

let reg = /<(h[1-6])>([\s\S]+)<\/\1>/ig

let res = hd.replace(reg, "<p>$2</p>")


// 回调参数 1正则匹配的内容 2原子组1 3原子组2
let res = hd.replace(reg, (search, s1, s2) => {
  return `<p>${s2}</p>`
})

console.log(res);

```

<br><br>

# 需求: 删除h1标签
我们当然也能操作dom还进行 但这里介绍下正则的方式

1. 首先获取body内容 
```js 
let body = document.body
console.log(body.innerHTML)   // 字符串

let reg = /<(h[1-6])>.+<\/\1>/gi
body.innerHTML = body.innerHTML.replace(reg, "")
```

<br><br>

# 需求: 提取指定的数据 太秀了
当我们整理出来 **["js", "200元"]** 的时候 我们可以通过结构变量的形式赋值
```js 
let [name, price] = ["js", "200元"]
// 这样的结果就是 name = “js” 的形式

returen {name, price}
// 这样就是 {name: "js"}
```  

```js 
let hd = `
  #1 js,200元 #
  #2 php,300元 #
  #9 houdunren,400元 # 后端人
  #3 node,200元 #
`
// [{name: "js", price: "200元"}] 要整理成的样式

let ret = hd.match(/^\s*#\d+\s+.+\s+#$/gm).map(item => {
  // 将前面的 # 删除
  item = item.replace(/\s*#\d+\s*/, "").replace(/\s*#$/, "")
  console.log(item) // js,200元

  let [name, price] = item.split(",")
  return {name, price}
})
console.log(ret);
```

<br><br>

# 需求: 检测用户输入 3-6 位
我们需要检查用户输入字符的位数

**要点:**
**1. 字符串.match()**  
找不到为 null  
找到了为 数组

<br>

**2. /[a-z]{3,6}/**  
用户输入7位的时候也能匹配到 因为包含6位

<br>

**3. 这种情况下 我们要使用 边界符号 ^ $ 表示我们只找3-6位**
```js 
inp.addEventListener("keyup", function() {
  log(this.value.match(/[a-z]{3,6}/))
})
```

<br><br>

# 需求: 文字高亮显示
```js
// 这种方式创建的正则 支持变量
new RegExp(con, "g")
```

```js
.replace(con, (search) => {
  return `
    <span style="color: red">${search}</span>
  `
}
```

<br>

# Replace API
```js
str.replace(正则, (正则匹配的内容, 原子组1, 原子组2...) => {
return `
  <span style="color: red">${search}</span>
`
}
```

```js 
let con = prompt("请输入要检查的内容 支持正则")
let div = document.querySelector("div")

let reg = new RegExp(con, "g")
div.innerHTML = div.innerHTML.replace(con, search => {
  return `
    <span style="color: red">${search}</span>
  `
})
```

<br>

**扩展**  
**<font color="#C2185B">str.replace("正则", "@")</font>**   
正常的方式是将第一个参数a 替换为@
```js 
str.replace("a", "@")
```

第一个参数的位置还支持正则

<br>

**<font color="#C2185B">str.replace("正则", (匹配的元素, [原子组]) => { 每个匹配的元素都会过边回调} )</font>**   
第二个参数的位置还支持回调  
回调中的参数为 通过正则找到内容 *回调中需要有返回值 return*  

return search
返回出去的是匹配到的内容  

如果对匹配到的内容进行修改后 会在元字符串中 将匹配到的内容改为修改后的内容

```js 
"abc".replace(/\w/g, search => {
  return "@"
})
```

<br>

### **练习**  
```js
let str = "a           d  b  s   df   df   fhfg                    f                      d                  d";
  
console.log("之前: ", str)

function spaceChange(str) {
let reg = / +/g

return str.replace(reg, content => {
  if(content.length > 10) {
    content = " "
  }

  // 相当于在回调中对匹配的内容进行加工后 返回出去 同时以修改后的内容替换了原位置的内容
  return content
})
}

let res = spaceChange(str)
console.log("之后: ", res);
```

<br><br>

# 需求 提取字符串中的数字
### **要点:**  
parseInt(): 可以将一个字符串类型的数字转换为纯数字 如果转化不了 会是NaN
Number.isNaN(): 判断一个数字是否是NaN值

```js 
let str = "adasdf834saf"
let res = [...str].filter(item => !Number.isNaN(parseInt(item)))
console.log(res.join(""))

let res = str.match(/\d/g).join("")
console.log(res)

let reg = /\d+/g
let res = reg.exec(str)[0]
console.log(res)
```


