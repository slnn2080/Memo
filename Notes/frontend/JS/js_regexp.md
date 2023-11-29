# 资料补充:

### vscode插件
```s
https://www.bilibili.com/list/666759136?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=999474132&bvid=BV1A44y1A7ue

# 正则工具 & 测试正则是否好用
any-rule & Regex Previewer
```

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

# 正则表达式
用于定义一些字符串的规则我们的计算机可以根据正则表达式来检查一个字符串是否符合规则, 或者将字符串符合规则的内容提取出来

<br>

### 使用场景:
1. 验证表单:  
用户名表单只能输入英文字母, 数字 或者下划线 昵称输入框中可以输入中文 密码框的位数限制 6-16位

2. 过滤掉页面内容中的一些敏感词(替换)

3. 从字符串中获取我们想要的特定部分(提取)等 比如搜索框 输入两个字 提取相关信息

<br>

### 特点:
灵活性, 逻辑性 功能性非常的强 可以迅速的用极简单的方式达到字符串的复杂控制

<br>

### 示例: 
- 验证邮箱的正则表达式
```js
^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
```

- 验证用户名
```js
/^[a-z0-9_-]{3,16}$/
```

<br><br>

# 创建正则的方式

### 方式1:
正则表达式里面不需要加引号, 不管是数字型还是字符串型
```js
let reg = /正则/匹配模式
```

<br>

**注意:**  
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

### 方式2:
**<font color="#C2185B">new RegExp("正则", "igs")</font>**   
这种方式第一个参数内部是识别变量的
```js 
let str = "houdunren.com"
let a = "u"
let reg = new RegExp(a, "igs")
```

<br>

### 匹配模式
- i: 匹配时不区分大小写

- g: 全局匹配 匹配到结尾 不加仅匹配一个

- s: 将换行符视为空白 设置s就是能匹配到换行符 或者说忽略换行符, 换句话说.能匹配到换行了

- m: 每一行单独处理 用以在多行模式中执行匹配 需要配合 ^ 和 $
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

- u: 使用字符属性的时候使用 开启这个模式也能匹配宽字节字符 奇奇怪怪的字符

- y: 必须连续的满足条件
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

## 转义

### 字面量定义正则对象的情况:
```js
// 将 . 作为普通的 .
let reg = /\./
```

<br>

### new RegExp定义正则对象的情况:
```js
new RegExp("\\d")
new RegExp("\\.")
```

上述的的情况下我们要使用 ``\\\``, 用一个\跟不加\是一样的

如果写在这里的形式是这样的 ``new RegExp("\d")`` 其实和 ``RegExp("d")`` 是没有任何区别的 

也就是说在字符串中 ``"\d == d"`` 它俩是一样的 但是我们想在字符引号中只用正则 所以要再次的进行转义

```js
new RegExp("\\d")
new RegExp("\\.")
```

<br><br>

## 字符属性 和 汉字的匹配
当我们将匹配模式设置为 u 的时候 就可以使用字符属性了

<br>

**注意**  
字符属性的使用必须配合 **匹配模式 u 来进行操作**

<br>

**<font color="#C2185B">字符属性: \p{L}</font>**   
匹配所有字母

<br>

**<font color="#C2185B">字符属性: \p{P}</font>**   
匹配所有标点符号

<br>

**<font color="#C2185B">字符属性: \p{N}</font>**   
所有数字

<br>

**<font color="#C2185B">字符属性: \P{N}</font>**   
大写P的是时候是除了 这就是除了数字

<br>

**<font color="#C2185B">字符属性: \p{sc=Han}</font>**   
匹配汉字(日韩都可以)
```js 
let res = hd.match(/\p{sc=Han}/gu)
console.log(res);
```

- Han: 汉字
- Hiragana: 平假名
- Katakana: 片假名

<br><br>

# 正则符号

### **<font color="#C2185B">正则表达式1 | 正则表达式2</font>**   
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

### **<font color="#C2185B">[]</font>**   
匹配[]里面的任意一元素 有或的意思
```js 
[123456]
// 匹配的是当中的一个元素 有哪个都会匹配成功 并不是匹配123456
```

<br>

**注意:**  
()在正则中是组的意思 但是放在[()]里面的时候 就表示普通的()了 . 和 + 也是放到[]里面就变成普通的字符了 转义也不行

```js 
["(", ")"]
```

<br>

**技巧:**  
- [A-z]: 当中的任意字符
- [0-9]: 任意数字
- [A-Za-z0-9]: 字符组合

<br>

### **<font color="#C2185B">[^]</font>**   
匹配 除了[]里面的内容, 除了括号里的东西都可以
```js 
let hd = "张三:010-9999"
hd.match(\[^-\d:,\s]\)    // ["张三"]
```

<br>

### **<font color="#C2185B">()</font>**   
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

### **<font color="#C2185B">.</font>**   
除换行外的任何字符 因为是匹配除了换行的字符 **所以再次遇到换行符就停止了**

<br>

### **<font color="#C2185B">^</font>**   
限定起始边界

<br>

### **<font color="#C2185B">$</font>**   
限定结束边界

<br><br>

## 元字符:  
表示一类字符当中的一个

- \d: 表示 0-9 当中的一个数值

- \D: 表示 除了数字

- \s: 表示空白 空格 换行 制表符 都属于空白

- \S: 表示除了空白

- \w: 表示字母 数字 下划线 (囊括了\d)

- \W: 除了字母 数字 下划线

```js 
// 用户注册 用户名要求 字母数字下划线
^[a-z]\w{4,9}$
```

<br><br>

## 边界符
- ^: 表示匹配行首的文本
- $: 表示匹配行尾的文本

<br><br>

## 量词符
量词符用来设定某个模式出现的次数, **使用量词的时候中间不要有空格**

- *: 重复零次或更多次
```js
// 相当于 >= 0, 可以出现0次或很多次
// reg= /^a*$/     允许a出现0次或很多次
reg.test('');         // true
reg.test('a');        // true
reg.test('aaaa');     // true
```

- ?: 重复零次或一次
```js
// 相当于 1 || 0
reg.test('');         // true
reg.test('a');        // true
reg.test('aaaa');     // false
```

- {n}: 重复n次
- {n,}: 重复n次或更多次 >=n
- {n,m}: 重复n到m次


- +: 1个或多个

- +?: {2, 100}? -- 或倾向1个 or 倾向2个  **往最少的一面**

<br>

### 技巧:  

**能匹配所有字符:**
```js
[\s\S]
```

```js 
let span = "div<span>hello</span>div"
let reg = /<span>[\s\S]+<\/span>/
let ret = span.match(reg)[0]
console.log(ret);
```

<br><br>

## 单词边界
创建一个正则表达式检查一个字符串中是否含有单词child

- \b

```js
reg = /child/
console.log(reg.test("child"));     //true
  
reg = /\bchild\b/
console.log(reg.test("hello children"));
```

<br><br>

# 原子组

### () -- $1 -- \1:
使用原子组包裹起来的部分是一个整体 就像图层里面的元素 移动的时候都是按照图层整体来操作 ctrl + g
```html
<h1>
  houdunren
</h1>

<script>
// h[1-6] 的部分重复了 (h[1-6])  --  对应着  --  \1
let reg = /<h[1-6]>[/s/S]*</h[1-6]>/ig
</script>
```

<br>

### 原子组的使用:
当我们使用 match 方法去提取 有原子组的数据的时候

<br>

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

# 原子组别名 (``?<con>``)
之前我们使用原子组的时候 对应的都是 $1 现在我们可以给原子组起别名 对应的就是  
``$<con>``
```js 
// 1就是名字 现在换成了<con>
$1
$<con>


const str = "this is"
const reg = /(?<name>this)/

const res = str.replace(reg, "$<name>xx")
console.log(res);
```

<br><br>

# 不记入组 (?:)
我们可以对正则来进行分组 那分组之后每一个组就会产生对应的编号 比如
```js
(\w+)\.(\w+)
```

<br>

这样就会产生两个小组 $1 和 $2 它们就会产生对应的$1 和 $2编号
但有的时候 我不希望其中的一个小组产生编号 那么就可以使用 不计入组
```js
(\w+)\.(?:\w+)
```

这样第二个分组就不会有编号 \2 $2 之类的效果

<br>

**应用场景:**  
我们有一个域名 ``https://www.houdunren.com``

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

**需求: 将span标签全部替换为h4 然后描红 内容前加上sam-**  


```html
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
const res = str.match(reg)
console.log(res)
/*
[
  '<span>后盾人</span>\n  <span>后盾人</span>\n  <span>后盾人</span>\n  <span>后盾人</span>'
]
*/
```

我们会发现是一次性的提取的是所有span
```html
<!-- 类似 -->
<span>后盾人 
      后盾人
      后盾人
      后盾人</span>
```

<br>

如果我们写的是进制贪婪 **+?** 那么每次会匹配一个span标签 依次匹配到最后
```js
const reg = /<span>[\s\S]+?<\/span>/ig
/*
[
  '<span>后盾人</span>',
  '<span>后盾人</span>',
  '<span>后盾人</span>',
  '<span>后盾人</span>'
]
*/
```

```js 
const main = document.querySelector("div")
const reg = /<span>([\s\S]+?)<\/span>/ig
main.innerHTML = main.innerHTML.replace(reg, (content, s1) => {
  return `<h1 style="color: red">sam - ${s1}</h1>`
})
```

<br><br>

# 断言匹配
也就是正则表达式的条件语句

<br>

### 检索内容 后面是什么的:
**<font color="#C2185B">/检索内容(?=检索条件)/</font>**   
检索的还是 "检索内容" (里面是条件) 该条件指定的是 **后面是什么** 
```js 
// 匹配 后端人后面有教程的 后端人
/后盾人(?=教程)/
```

<br>

### 检索内容 前面是什么的:
**<font color="#C2185B">/(?<=检索条件)检索内容/</font>**   

<br>

### 检索内容 后面不是什么的:
**<font color="#C2185B">/检索内容(?!检索条件)/</font>**   

<br>

### 检索内容 前面不是什么的:
**<font color="#C2185B">/(?<!检索条件)检索内容/</font>**   

<br>

### 需求: 将价格后面没有.00的补上.00

**思路:**  
我们使用的是 g 模式 则每次匹配时都会调用回调 回调中会匹配 金额部分

- 如果金额格式为 300.00 则 
- args[0] == 300
- args[1] == .00

如果金额格式为 300 则
- args[0] == 300
- args[1] == undefind

所以当args[1]为undefined的时候 我们给他一个默认值 .00
最后回调的返回值为 args[0] + args[1] 就可以了

```js  
let lesssons = `
  js, 200元, 300次
  php, 300.00元, 100次
  nodejs, 180元, 260次
`

let reg = /(\d+)(.00)?(?=元)/ig
lesssons = lesssons.replace(reg, (content, ...args) => {
  /*
  content: 为匹配的内容
  args: 则是正则中匹配的分组信息 和 其它信息
  */
  args[1] = args[1] || ".00"
  
  // 我们只需要用前两个参数
  return args.splice(0,2).join("")
})

console.log(lesssons)
```

<br><br>

# 正则相关的api:

## matchAll 全局匹配
需求我们要提取后盾人 也就是说我们要提取的是标签体的内容
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

<br>

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
返回值为是一个可迭代的对象 我们可以遍历这个迭代器对象

<br>

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

## reg.test(字符串)
用于检测字符串中是否存在与正则表达式匹配的内容

**返回值:**  
布尔值

<br>

## reg.exec(str)
用于在字符串中**执行正则表达式的匹配操作**, 并返回匹配结果的详细信息

<br>

**返回值:**  
数组, 包含匹配结果的详细信息, 如果没有找到匹配项, 则返回null

<br>

### 要点: 
- 如果定义 reg 对象的时候 匹配模式没有 /g, 那么 exec() 方法只会检索一次 匹配到就结束

- 如果定义 reg 对象的时候 匹配模式有 /g, 那么需要**依次调用 exec() 方法来实现继续向下查找的功能** 同时在 /g 的情况下 lastIndex 才会发生变化

<br>

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
依次查找字符串中每一个字符的位置 该属性代表当前字符所在的位置 每一次匹配能得到最新的位置直到查询结束

**注意:**  
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

<br><br>

## 正则对象 reg
每个正则对象都包含5个属性
1. source
2. global
3. ignoreCase
4. multiline
5. lastIndex

<br>

**<font color="#C2185B">reg.source</font>**   
正则的内容 ``/之间的内容/``
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
是一个可读/写的整数, 如果匹配模式中带有g修饰符, 这个属性存储在整个字符串中下一次检索的开始位置, **这个属性会被exec( ) 和 test( ) 方法用到。**

<br>

**注意:**  
但是使用 g 的时候 就会有区别 match方法会将匹配到的内容装到一个数组中 但是原子组的细节就没有了

exec方法 原子组的细节还是有 但是会有 **reg.lastIndex**  该方法每检索一次会暂停 reg.lastIndex++

该方法调用多次后 会延续上次一次的检索结果 继续检索 直到找不到为null停止 比较适合做循环

```js
let str = "1111"
let reg = /11/g

console.log(reg.test(str))
console.log(reg.lastIndex)    // 2
```

当调用exec( )的正则表达式对象具有修饰符g时, 它将把当前正则表达式对象的lastIndex属性设置为紧挨着匹配子串的字符位置

当同一个正则表达式第二次调用exec( ), 它会将从lastIndex属性所指示的字符串处开始检索

如果exec( )没有发现任何匹配结果, 它会将lastIndex重置为0。

<br>

test( )方法, 它的参数是一个字符串, 用test( )对某个字符串进行检测, 如果包含正则表达式的一个匹配结果, 则返回true, 否则返回false。

当调用**test( )**的正则表达式对象具有修饰符g时, **它的行为和exec( )相同**, 因为它从*lastIndex*指定的位置处开始检索某个字符串, 如果它找到了一个匹配结果, 那么它就立即设置lastIndex为紧挨着匹配子串的字符位置

<br>

在强调一次, 上面说的关于lastIndex的问题, 都是因为正则表达式对象中带有修饰符g, 如果不带有修饰符g, 就不用担心这些问题了。

<br><br>

# 案例: 

## 输入框的验证规则
定义多条正则 全部符合后为true

<br>

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

  console.log(status)
})
```

<br><br>

## 将h1 和 h2换成p标签
利用了 原子组 替换
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

## 删除h1标签
我们当然也能操作dom还进行 但这里介绍下正则的方式

1. 首先获取body内容 
```js 
let body = document.body
console.log(body.innerHTML)   // 字符串

let reg = /<(h[1-6])>.+<\/\1>/gi
body.innerHTML = body.innerHTML.replace(reg, "")
```

<br><br>

# 提取指定的数据
当我们整理出来 **["js", "200元"]** 的时候 我们可以通过结构变量的形式赋值

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

## 检测用户输入 3-6 位
我们需要检查用户输入字符的位数

**要点:**
1. 字符串.match()
- 找不到为 null  
- 找到了为 数组

2. /[a-z]{3,6}/
用户输入7位的时候也能匹配到 因为包含6位

<br>

3. 这种情况下 我们要使用 边界符号 ^ $ 表示我们只找3-6位
```js 
inp.addEventListener("keyup", function() {
  log(this.value.match(/[a-z]{3,6}/))
})
```

<br><br>

## 文字高亮显示
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

<br><br>

## 有条件的整理空格
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

## 在匹配到的部分前后追加标签
```js
// 我们给教育加上链接
<main>
  在线教育是一种高效的学习方法
</main>

<script>
  main.innerHTML = 
  main.innerHTML.replace(/教育/, `<a href="www.baidu.com">$&</a>`)
</script>
```

<br><br>

## 提取字符串中的数字
- parseInt(): 可以将一个字符串类型的数字转换为纯数字 如果转化不了 会是NaN

- Number.isNaN(): 判断一个数字是否是NaN值

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

<br><br>

## 验证座机号码
座机号验证: 全国座机号 两种格式
- 010-12345678
- 0530-1234567

```js
/^\d{3}-\d{8}|\d{4}-\d{7}$/
```

<br><br>

## 验证手机号
创建一个正则表达式用来检查一个字符串是否是一个合法手机号

**手机号规则:**  
1. 1 3 5670123
2. 以1开头
3. 第二位为3-9的任意数字
4. 3位以后任意数字

```js
var phoneStr = "135670123"
var phoneReg = /^1[3-9][0-9]{9}$/;
console.log(phoneReg.test(phoneStr));
```

<br><br>

## 验证邮箱
hello@abc.com.cn

任意字母数字下划线 - .任意字母下划线 - @ - 任意字母数字 - .任意字母(2-5位) - .任意字母(2-5位)

```js
/\w+\.\w*@\[A-z0-9]+\.\w{2,5}(\.\w{2,5})?/g

^\w{3, }(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$      //^$不要省略

var emailReg = /\w{3, }(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}/
var email = "hello@abc.com.cn";
console.log(emailReg.test(email));
```

<br><br>

## 去除空格
接收一个用户输入
```js
var str = prompt("请输入你的用户名");
```

去除字符串中的多余空格: 使用空串来替换掉空格 替换的str.replace();

```js
str = "     hello     ";

// 要把值再重新的赋回去
str = str.replace(/\s/g, ""); 

console.log(str);

// 假设有些空格我们不想删掉
str = "     he llo     ";
str = str.replace(/^\s*|\s*$/g, "");
```

<br><br>

## 将is前面的this选中 修改字体颜色为pink
我们先利用正则把符合条件的文本选中 并且替换成带标签的样式 replace()

然后利用正则把目标文字选中 配合replace()替换到指定位置 最后把修改好的内容重新插入到标签中

```js
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

<br><br>

## 过滤敏感词汇
```js
let text = document.querySelector('textarea')
let btn = document.querySelector('button');
btn.onclick = function() {
  div.innerHTML = text.value.replace(/激情/, '**');
}
```