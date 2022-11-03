# 正则表达式
作用:
正则表达式就是利用预定义的符号 定义出字符串的某种结构的特征

我们要知道正则表达式的内容 都是匹配字符串

**<font color="#2185B">要点:</font>**  
**<font color="#2185B">1. java中我们要定义正则的时候 必须使用</font>**  
```java
  \d -> \\d
```
``\\d`` 第一个反斜杠是转义字符

<br>

**<font color="#2185B">2. []</font>**  
我们知道定义在这里的都是可以被匹配的字符
我们也写过 0-9 a-z 知道是连续的意思
0-z呢？ 其实也可以 是按照 unicode 编码来的
编码小-编码大 的范围

<br>

**<font color="#2185B">3. 当我们想在 [] 里面匹配 ] 的时候</font>**  
\[]x]\
我们要将 ] 写在 方括号的最前面
左方括号不允许出现在[]中

<br>

**<font color="#2185B">4. 字符串写法的正则中 \ -> \\</font>**  

<br>

**<font color="#2185B">5. 还原特殊符号(特殊符号失效区)</font>**  
我们使用 定义一个区域 该区域中的特殊符号不需要转义字符的形式
```
\\.\\.\\[a\\]

\\Q开头
\\E结尾
\\Q..[a]\\E
```
注意: 不能嵌套使用 特殊符号失效区

**<font color="#2185B">6. 0次会出现一些特殊的效果 跟我们的预期不一样</font>**  
**<font color="#2185B">0 ? *</font>**  

```java
String str = "123a23456bcd"
String r = s.replacrAll("\\d?", "*")
sout(r)
// ****a******b*c*d*
```

上面的预期跟我们想的不一样 我们会认为结果应该是
***a******bcd
因为 ? 是我的印象中 代表0次或1次 也就是有就替换 没有的话就忽略

但我们发现不是我们想象中的忽略 而是0次也会产生匹配上的效果

**<font color="#2185B">解析:</font>**  
123a23456bcd  -  ****a******b*c*d*
\d? ? 意味着0次或1次
1 能匹配上 那就替换成 * 23也符规律所以也能完成替换

a不是数字 不能完成匹配 但是在3和a之间 什么都没有 但是表达式引擎认为 什么都没有就等同出现了0个数字 所以也能完成一次匹配 按照这种理解数字3和字母a之间 就又出现了一个可以匹配的字符 虽然这个字符事实是不存在的 但仍然被替换成了一个 * 

b后面什么都没有就如同出现了0个数字 所以也会多出来一个*

**字符串中任意两个连续的字符 只要后面的字符不是数字 表达式引擎都会认为两个数字之间有0个数字**

js也是一样的
```js
let str = "123a23456bcd"
let reg = /\d*/g

str = str.replace(reg, "*")
console.log(str);
// **a**b*c*d*
```

<br><br>

**<font color="#2185B">符号</font>**  
**<font color="#2185B">\d</font>**  
代表一个 数字字符
不能代表一个真正意义上的数字

<br><br>

**<font color="#2185B">定义出现次数</font>**  
{2,3}
当我们这么定义正则的时候 那是匹配2个的还是匹配3个的?
匹配的原则是每次进行匹配的时候会尽量把更多的目标字符串包进来或者说尽量用更多的字符完成一次匹配

当一个字符串既满足2又满足3的时候 会按照3来完成匹配
这也是*拼车原则* 


**<font color="#2185B">贪婪模式 和 非贪婪模式</font>**  
str = "dxxxdxxxd"
d.+ -> *
结果: *

 按照拼车原则的理解 .+ *会尽量匹配更多的字符* 所以在实际的匹配过程当中 .+会匹配到首字母d以后的所有字符

拼车原则的官方称呼 叫做 贪婪模式 表达式引擎默认会以贪婪模式工作

<br><br> 

**<font color="#2185B">贪婪模式要让位于整体匹配成功</font>**  
str = "dxxxdxxxd"
d.+d
表达式发生了些变化 要求表达式以字母d开头还必须以字母d结尾

按照贪婪模式的理解 .+ 会匹配到首d后所有的字母 xxxdxxxd
那么就不会满足 我们定义的正则 但是我们发现也匹配成功了 这就是正则引擎的作用 它做了一些让步 不能因为贪婪而导致整个匹配的失败

正则引擎默认是以贪婪模式工作了 我们也可以人为的设置为非贪婪模式 也叫做勉强模式

非贪婪模式的原则:
尽可能的在匹配的时候少包含字符

非贪婪模式的设置方式:
? * + 的后面加上? ?? *? +?

str = "dxxxdxxxd"
d.+?
*xx*xxd

如果是贪婪模式的话 .+ 会尽可能的多匹配字符 后面所有
非贪婪模式就恰恰相反 .+? 会尽可能少的匹配字符
+最少要匹配一个字符 也就是底线 那么.+? 就勉勉强强的去匹配这一个字符 所以 d.+? 就匹配了 dx
这么勉强不情愿的匹配 也叫勉强模式

我们修改下正则 看看运行结果
无论是贪婪模式 还是 非贪婪模式都要以匹配成功为准
那么.+? 就不能仅匹配一个x 因为还要满足后面的d
所以正则表达式的含义就变成了匹配以字母d开头以字符d结尾的子串 并且两个 d之间要尽可能少的包含字符d

所以表达式会以中间的d作为结束的d 而不是以最后的d作为结束的d 因为要尽可能的少包含字符

str = "dxxxdxxxd"
d.+?d
*xxxd


\\(注: .+?\)\

<br><br>

**<font color="#2185B">边界符的使用 \b</font>**  
xxx\b
目标字符串的右边必须是空白字符 才能完成匹配

\bxxx
目标字符串的左边必须是空白字符

空白字符包括 空格 制表符 换页符
另外字符串的开头和结尾也算空白字符
``` 
  aaa aaa
  a\b

  表达式引擎因为 末尾的aaa的右边也是空白字符
   aa* aa*
```

"win a window"
win\\b

观察规律发现 win 的右侧有一个空格(空白字符)
如果想表示某个字符串的右边是一个空格 就可以使用边界符

**<font color="#2185B">\B 非空白字符</font>**  

**<font color="#2185B">\s 是实实在在的空白字符 是存在的</font>**  
**<font color="#2185B">\b 指的是目标字符串所处的位置</font>**  

<br><br>

**<font color="#2185B">反向引用</font>**  
指的是想表达式引擎向左去寻找前面出现过的内容

123abba456cdcd789effe00qweee
需求:
要求字符串必须包含4个字符并且这4个字符是对称结构的 把这些子字符串替换成 * 
abba effe eeee

思路
我们需要告诉正则引擎 目标字符串有4位 并且是对称的 但是正则引擎并不知道对称含义
我们可以告诉它要寻找的目标字符串 
第一个字符 和 第二个字符可以是任意字符
第三个字符 和 第二个字符是相同的
第四个字符 和 第一个字符是相同的

所以我们要对 第一个 和 第二个 进行编号 使用() 这时候编组的内容就自动会有一个编号了
(.)(.)\2\1

\1\2 也是一个字符 和编组内容相同的字符


**<font color="#2185B">当括号发生嵌套的时候 表达式引擎优先对外层的内容进行编号</font>**  
aba#ababcc
((a)b)\1
ab为因为是一组 并编号为1 检索部分就是 abab

((a)b)(c) 编号
ab是1
a是2
c是3

**规律: 按左括号出现的顺序进行编号**

(?:aaa) 该括号中的内容就不编号了
(?<name>c) 该括号中的内容叫name
引用个时候 \k<name>


<br><br>

**<font color="#2185B">字符串形式的正则的匹配模式</font>**  
**<font color="#2185B">表达式的前面加 (?标识符)正则</font>**  
String r = str.replaceAll("\\d[abc]", "*")
加上匹配模式
String r = str.replaceAll("(?i)\\d[abc]", "*")
``` 
  i 忽略大小写
  iu 忽略大小写的范围扩展到unicode字符集
  m 多行
  s .忽略换行符
  x 忽略正则表达式中的空白字符
```

**<font color="#2185B">匹配模式的作用范围</font>**  
**<font color="#2185B">(?x) 正则 (?-x)</font>**  
这就是匹配模式的作用范围 在开始符号和结束符号之间才有作用

"(?x)a " 
标识符(?x)后面的部分才开始享受匹配模式的作用

" (?x)a "
标识符(?x)前面的空格不会忽略

" (?x)a (?-x)"

<br><br>

# Java中表示正则表达式的类
jdk1.4开始 util 包下 添加了一个子包 regex
这个子包下有一个 Pattern 类 该类就是专门表达正则表达式的 

一个 pattern类的实例对象中 就封装了一个经过编译的正则表达式

**<font color="#2185B">创建 正则表达式的对象</font>**  
通过 Pattern的静态方法 compile()

**<font color="#2185B">Pattern.compile("字符串型的正则语句", [匹配模式1|匹配模式2])</font>**  
返回正则表达式对象
正则表达式都是用来寻找目标字符串的 我们使用该对象也可以去某个字符串中寻找符合特定格式的目标字符串

参数:
1. 正则
2. 可选 匹配模式 多个匹配模式用 | 分隔


  - Pattern.CASE_INSENSITIVE
  - 只对英文进行忽略大小写 i


  - Pattern.CASE_INSENSITIVE|Pattern.UNICODE_CASE
  - 对所有语言都进行忽略大小写
  (将忽略大小写从英文字母扩大到所有的unicode字符集)
  - 先设置CASE_INSENSITIVE 两个标识符都要加上


  - Pattern.MULTILINE
  - 多行 m
  - $符号只能匹配整个字符串的结尾
  - 设置了该模式后 会将整个字符串看做为多行 每一个换行符都会表示结尾
  ``` 
    String str = "xyzla\nuvw2Brst3cpiq";
    String r = 
      str.replaceAll("(?m)\\w$", "*");

    // xyzla\nuvw2Brst3cpi*  a没有被替换成*
  ```


  - Pattern.DOTALL 
  - 标识符 s
  - . 在正则中可以匹配换行外的所有字符
  - 如果我们希望 . 也能够匹配换行符 就是设置
  ``` 
    String str = "xyzla\nuvw2Brst3cpiq";
    String r = 
      str.replaceAll("(?s)a.", "*");

    // xyzl*uvw2Brst3cpiq
  ```


   - Pattern.COMMENTS
   - 标识符: x
   - 忽略*正则表达式中*的空白字符(不是忽略字符串中的空白字符)
   - 设置了该模式并不会忽略 \s 表达式哦

   ``` 
    String str = "xyzlauvw2Brst3cpiq";
    String r = 
      str.replaceAll("(?x)a ", "*");

    // xyzl*uvw2Brst3cpiq
  ```


```java
Pattern pattern = Pattern.compile("\\d[abc]"); 
```

**<font color="#2185B">正则表达式对象.pattern()</font>**  
获取 正则表达式中 包含的正则

返回 正则表达式
返回值:
String

```java
String reg = pattern.pattern();
System.out.println(reg);
// \d[abc]
```

**<font color="#2185B">使用 pattern对象分割一个字符串</font>**  
**<font color="#2185B">pattern对象.split(被分隔字符串, [limt])</font>**  
pattern对象中封装了一个正则表达式
通过该对象.split() 方法 可以按照正则将字符串进行分隔

该方法不仅仅可以分隔String 也可以分隔StringBuffer 和 StringBuild 但是分隔的结果会统一保存在String[]

参数:
1. 正则
2. 把一个字符串最多可以分隔为几个部分

返回值:
字符数组

```java
Pattern pattern = Pattern.compile("\\d[abc]");

String str = "xyzlauvw2brst3cpiq";
String[] strings = pattern.split(str);

for (String string : strings) {
  System.out.println(string);
}

// xyzlauvw
// rst
// piq
```


**<font color="#2185B">Pattern静态方法</font>**  
**<font color="#2185B">Pattern.matches(reg, str)</font>**  
作用:
某个字符串是否能和正则表达式相匹配

参数1: 正则字符串
参数2: 字符串

返回值:
boolean

```java
boolean matches = Pattern.matches("\\d[abc]", "3a");
System.out.println(matches);
```


**<font color="#2185B">Pattern.quote(reg)</font>**  
将传入的正则放在 \Q...\E 中
将正则放在了特殊字符失效区中 然后以字符串的形式返回

参数
字符串型的正则

返回值:
String

```java
String quote = Pattern.quote("\\d[abc]");
System.out.println(quote);
// \Q\d[abc]\E
```

<br><br>

# Matcher
这个类就像一个智能机器人 手里拿着一个正则表达式 脚下是一个字符串 它拿着正则表达式在字符串上来回移动 寻找能够匹配的目标字符串 当机器人找到了目标字符串后 可以对目标字符串做很多的操作

机器人手里的正则:
Pattern对象
``` 
  机器人手里的正则对象可以随时替换成别的正则对象
```

机器人脚下的字符串
String StringBuffer StringBuild



**<font color="#2185B">pattern对象.matcher("字符串")</font>**  
创建 matcher 对象
也就是说 match对象里面 既有正则也有字符串喽？
``` 
  Matcher源码
  new Matcher(pattern, input)

  - 当我们通过 pattern.matcher(input) 方法创建matcher的时候 我们发现内部调用了Matcher的构造方法 并把正则 和 字符串传进去了

  - 所以我们将matcher形容为主要的部分 机器人 
  - 而机器人手里拿着正则和脚下的字符串
```

返回值:
Matcher

```java
String str = "1a";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);
```


**<font color="#2185B">matcher对象.pattern()</font>**  
返回机器人手里的正则对象

返回值:
Pattern

```java
Matcher matcher = pattern.matcher(str);

Pattern pattern1 = matcher.pattern();
System.out.println("pattern1: -- " +  pattern1);

// pattern1: -- \d\w
```

<br><br>

# Matcher的匹配方法
我们上面说了 机器人的功能很强大

**<font color="#2185B">字符串匹配方面的功能</font>**  
**<font color="#2185B">matcher.matches()</font>**  
类型 test()
查看正则是否和字符串是否*整体*匹配
``` 
  不是局部
```

返回值
boolean

```java
String str = "1a";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

boolean matches = matcher.matches();
System.out.println(matches);  // true
```


**<font color="#2185B">matcher.lookingAt()</font>**  
检查字符串是否以正则匹配的内容开头

返回值
boolean

```java
String str = "1aadsfasdf";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

// 这里
boolean matches = matcher.lookingAt();
System.out.println(matches);
```


**<font color="#2185B">matcher.find([int])</font>**  
在字符串中检索能够与正则表达式相匹配的目标字符串
如果找到了目标字符串就返回 true
如果没有找到目标字符串就返回 false
匹配方向 从左到右

参数
开始搜索的位置 index 

返回值:
boolean

这个方法只是标记是否找到


**<font color="#2185B">matcher.group([int 组编号])</font>**  
用于获取当前匹配项的内容
返回 match.find() 方法找到的当前匹配项

它必须是在执行了 find() matches() lookingAt() 用来完成匹配的方法后调用

直接调用group()的话 就会产生异常 no match found(当前匹配项不存在)
同时lastIndex已经为0了 再调用group()方法也是这个异常


**<font color="#2185B">参数</font>**  
可选: 如果当前匹配项里面进行了分组 那么我们可以指定组编号获取到指定组的内容
如果我们传递参数0 就相当于无参 拿到当前匹配项的整体内容

如果我们给组起名字了 那么我们也可以传入字符串 获取组名对应的内容

 
**<font color="#2185B">返回值</font>**  
String

```java
String str = "1aadsfasd2fsd";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

if(matcher.find()) {
  String group = matcher.group();
  sout
}

if(matcher.matches()) {
  System.out.println(matcher.group());
}

if(matcher.lookingAt()) {
  System.out.println(matcher.group());
}

// 1a


<br><br> 

// 获取当前匹配项中 分组的情况
String str = "1a";
// 对文本进行了分组
Pattern pattern = Pattern.compile("(\\d)(\\w)");

Matcher matcher = pattern.matcher(str);

// 提取指定组的内容
if(matcher.lookingAt()) {
  System.out.println(matcher.group(2));
}
```

上面我们只是找了一个 matcher.find() 方法的匹配项 那么多个匹配项怎么查找

用 while 我们只需要将 if -> while

```java
String str = "1aadsfasd2fsd";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

// 当没有匹配项的时候 终止循环
while (matcher.find()) {
  String group = matcher.group();
  System.out.println(group);
}

// 1a
// 2f
```


**<font color="#2185B">matcher.start([int])</font>**  
**<font color="#2185B">matcher.end([int])</font>**  
当前匹配项的起始 和 结束位置

参数:
传递 int 型的值
获得某一个组的起始位置
该参数跟组有关系 比如我们传递2
那就是找组2对应的字符的起始位置

返回值:
int
1a2 找a 起始位置1 结束位置2


```java
String str = "1aadsfasd2fsd";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

while (matcher.find()) {
  System.out.println("当前匹配项: " + matcher.group());
  System.out.println("当前匹配项起始位置: " + matcher.start());
  System.out.println("当前匹配项结束位置: " + matcher.end());
}

/*
当前匹配项: 1a
当前匹配项起始位置: 0
当前匹配项结束位置: 2

当前匹配项: 2f
当前匹配项起始位置: 9
当前匹配项结束位置: 11
*/

while(matcher.find()) {
  System.out.println("当前匹配项:" + matcher.group());

  // 这里指定了 2
  System.out.println("当前匹配项中组2的起始位置:" + matcher.start(2));
}

/*
当前匹配项:1a
当前匹配项中组2的起始位置:1
*/
```


**注意:**
像 matches() lookingAt() 都会引起 matcher 的位置的变化 这个部分有些想 lastIndex
当我们调用这些方法的时候 指针也是往后走的


**<font color="#2185B">matcher.reset()</font>**  
将检索指针 回到最开始的位置 相当设置了 lastIndex = 0

```java
String str = "1aadsfasd2fsd";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

// 注意这里:
System.out.println(matcher.lookingAt())

// 回复指针的位置
matcher.reset()

while (matcher.find()) {
  System.out.println("当前匹配项: " + matcher.group());
  System.out.println("当前匹配项起始位置: " + matcher.start());
  System.out.println("当前匹配项结束位置: " + matcher.end());
}
```


**<font color="#2185B">matcher.groupCount()</font>**  
返回正则中编组的数量

返回值:
int

```java
sout(matcher.groupCount());  // 2
```


**<font color="#2185B">matcher.toMatchResult();</font>**  
将找到的目标字符串的所有信息 封装到一个对象中

返回值:
MatchResult

该对象中的方法
result.group();
result.end();
result.start();

```java
while(matcher.find()) {
  MatchResult result = matcher.toMatchResult();
  System.out.println(result.group());
  System.out.println(result.end());
  System.out.println(result.start());
}
```


**<font color="#2185B">matcher.hitEnd()</font>**  
测试在字符串的末尾 增加新的字符的情况下 会不会改变原来的匹配结果

注意:
我们不仅要看 hitEnd() 的属性值 还要看有没有找到匹配项

情况:
1. hitEnd 返回的true 并成功找到了 匹配项
推定: 在字符串的末尾添加新的字符可能会改变原来的匹配结果
``` 
  在找到了 匹配项的情况下 并且hitEnd的返回值为true
  这种情况下 在末尾添加新的字符可能产生新的匹配项

  String str = "abc1234";
  Pattern pattern = Pattern.compile("\\d+");

  Matcher matcher = pattern.matcher(str);

  if(matcher.find()) {
    System.out.println(matcher.hitEnd()); 
    // true
  }

  什么叫可能产生新的匹配项
  我们上面发现 hitEnd()的返回值为 true 并且能找到匹配项 
  那么
  原先匹配结果为 1234
  新的匹配结果为 12345

  那如果 字符串是 abc1234a
  这种情况下就不会产生新的匹配项
```

2. 没有找到匹配项 同时 hitEnd 返回的是true 在字符串的末尾新增新的字符 会产生一个匹配项
``` 
  上面这句话翻译下就是
  原来在找不到匹配项的情况下 如果在字符串的末尾输入了字符 是能够产生一个匹配项的 但并不表示说一定会产生一个匹配项

  String str = "abc";
  // 正则是数字
  Pattern pattern = Pattern.compile("\\d+");

  Matcher matcher = pattern.matcher(str);

  // 那么肯定找不到匹配项
  if(matcher.find() == false) {
    System.out.println(matcher.hitEnd()); 
    // true
  }

  
  // 如果我们在字符串的末尾增加1234
  那么就会得到一个匹配项
```

3. 能够找到匹配项的前提下 hitEnd() 的返回值为false 那么在原有字符串的末尾新增字符 不会改变原有的匹配结果
``` 
  String str = "1234a";
  Pattern pattern = Pattern.compile("\\d+");

  Matcher matcher = pattern.matcher(str);

  if(matcher.find() == true) {
    System.out.println(matcher.hitEnd()); 
    // false
  }


  这种情况下 无论我们在字符串的末尾添加什么字符 都不会改变原有的匹配结果
```

4. 在找不到匹配项的情况下 hitEnd 的返回值为false 那么在原有字符串的末尾新增加字符 不会产生匹配项


返回值
boolean

那是不是说 
匹配项在字符串末尾 hitEnd 会返回true
匹配项在字符串前部分 hitEnd 会返回false


**<font color="#2185B">matcher.requireEnd()</font>**  
表明在字符串末尾增加字符 是否会让正向的匹配 变成 负向的匹配

正向匹配 代表 匹配成功
负向匹配 代表 匹配失败

如果没有找到匹配项 返回值是什么意义的
就是在讨论requireEnd的值的时候 必须在先要找到匹配项的情况下 再去讨论requireEnd的返回值

情况:
1. 如果能够找到匹配项 并且 requireEnd返回true
这时候在字符串的末尾再增加新的字符 有可能会导致原来的匹配项丢失
``` 
  String str = "1234";

  // 找到一个或对个位于末尾的数字字符
  Pattern pattern = Pattern.compile("\\d+$");

  Matcher matcher = pattern.matcher(str);

  if(matcher.find() == true) {
    System.out.println(matcher.requireEnd());
    // true
  }

  我们能够找到这个匹配项 1234 这个就是位于字符串末尾的连续数字

  能找到匹配项 并且 requireEnd 的返回值为 true
```

2. 如果能够找到匹配项 并且 requireEnd返回false
这时候在字符串的末尾再增加新的字符 可能会导致匹配项的变化(有可能产生一个新的匹配项) 但原来的匹配项不会丢失
``` 
  String str = "1234";

  Pattern pattern = Pattern.compile("\\d+");

  Matcher matcher = pattern.matcher(str);

  if(matcher.find() == true) {
    System.out.println(matcher.requireEnd());
    // false
  }
```


返回值
boolean

<br><br>

# Matcher的替换方法
matcher对象不仅仅能在字符串中找到匹配项 还能将这些匹配项替换成某个字符串


**<font color="#2185B">游标位置</font>**  
matcher前面我们说了 它就是一个小机器人 它脚下有一个字符串 小机器人去搜索目标字符串 在搜索的过程中 机器人就会变换位置 不管机器人在哪里 它所在的位置就是游标位置 机器人在执行替换方法的时候 也会引起游标的变化(前面的匹配方法也会引起游标的变化)

一旦游标位置发生变化就会影响到下一次执行搜索或者替换操作的执行结果

很多人在执行替换方法后又执行搜索方法 那么结果可能会得不到预期

所以我们记得在合适的位置 调用 调整游标的位置
matcher.reset()


**<font color="#2185B">matcher.replaceFirst("替换成啥")</font>**  
作用:
把字符串中第一个匹配项替换为参数指定的字符串

要点:
该方法的执行会影响到Matcher对象的游标位置

返回值:
String 替换后的新的字符串

```java
String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

String s = matcher.replaceFirst("*");
System.out.println(s);    // a*b2c3
```


**<font color="#2185B">matcher.replaceAll("替换成啥")</font>**  
作用:
把字符串中所有匹配项替换为参数指定的字符串

要点:
该方法的执行会影响到Matcher对象的游标位置

返回值:
String 替换后的新的字符串
```java
String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

String s = matcher.replaceAll("*");
System.out.println(s);    // a*b*c*
```


**<font color="#2185B">matcher.appendReplacement(StringBuffer sb, String replacement);</font>**  
我们从单词名上理解下
append: 追加
Replacement: 替换

作用:
在字符串中找到匹配项(匹配项为1) 然后将匹配项替换为指定的字符串* 最后将游标前面的所有内容(a*) 添加到 StringBuffer 中
``` 
  严谨的说法:
  - 把当前匹配项前面的 还没有添加过的那部分内容 以及当前匹配项被替换后的哪个字符串 统统添加到 sb 对象的末尾
```

1. a1b
2. \d -> *
3. a*
4. xxxa*

参数:
1. StringBuffer
2. 要替换成啥

```java
String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

// StringBuffer的初始值是 xxx
StringBuffer sb = new StringBuffer("xxx");

// 找到匹配项为前提
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
  System.out.println(sb);
  // xxxa*
}

<br><br> 

String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

// StringBuffer的初始值是 xxx
StringBuffer sb = new StringBuffer("xxx");

if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 接着游标的位置开始找
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
  // 这次会找到2 - b* - 将b* 添加到sb的末尾
}
System.out.println(sb); // xxxa*b*

<br><br> 

String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

// StringBuffer的初始值是 xxx
StringBuffer sb = new StringBuffer("xxx");

// 游标的位置动了 a1没有添加过
matcher.find();

// 再找就是b*
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 再找就是c*
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 将没有添加过的部分都添加到sb中
System.out.println(sb); // xxxa1b*c*
```


**<font color="#2185B">matcher.appendTail(StringBuffer sb);</font>**  
上面我们介绍了appendReplacement()方法 将处理过(替换后)的字符添加sb中 如果字符串中还有没处理过的部分 也想添加到sb中 我们就可以调用该方法

```java
String str = "a1b2c3yyy";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

// StringBuffer的初始值是 xxx
StringBuffer sb = new StringBuffer("xxx");

// 游标到a1 
matcher.find();

// 游标到b2 -> b*
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}
// 游标到c3 -> c*
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 字符串中还有 yyy 我们把yyy也追加到 sb 中
matcher.appendTail(sb);

System.out.println(sb); // xxxa1b*c*yyy

<br><br> 优化下代码

String str = "a1b2c3yyy";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);
StringBuffer sb = new StringBuffer("xxx");


// 游标到b2 -> b*
while(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 将剩余的部分 也追加到sb末尾
matcher.appendTail(sb);

System.out.println(sb); 
```

那是不是说我们可以利用
appendReplacement()
appendTail()

处理一个字符串中的局部 然后将整个字符串追加到一个sb中

优势:
我们可以选择性的替换局部(如果使用replaceAll那替换的就是所有)
```java
// 奇数出现的匹配项 用 * 替换后 追加到 sb中
String str = "a1b2c3yyy";
  Pattern pattern = Pattern.compile("\\d");
  Matcher matcher = pattern.matcher(str);
  StringBuffer sb = new StringBuffer("xxx");

  int i = 0;
  while(matcher.find()) {
    ++i;
    if (i % 2 != 0) {
      matcher.appendReplacement(sb, "*");
    }
  }

  -- while里还可以写成
  int i = 0;
  while(matcher.find()) {
    // 当找到匹配项后 执行++i
    if (++i % 2 == 1) {
      matcher.appendReplacement(sb, "*");
    }
  }

  matcher.appendTail(sb);
  System.out.println(sb);
```

<br><br>

# 设置 Matcher 搜索范围
之前我们一直把matcher比作是只能的机器人 机器人脚下有一个字符串 它在脚下的字符串中搜索能够与正则匹配的匹配项 

在默认情况下 机器人可以搜索整个的字符串 如果我们希望机器人只搜索字符串的一部分

这时候我们可以设置 region() 来显示机器人的搜索范围

**<font color="#2185B">matcher.region(int start, int end)</font>**  
设置 机器人的检索范围

参数:
1. 范围的开始
2. 范围的结束 不包括该位置
``` 
  matcher.region(4,9)
  0123456789
  0xxxa1b2c3yyy9
      ↑   ↑
          9的前面 范围其实是到这
```

```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");
// 默认会搜索整个的字符串
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

while(matcher.find()) {
  System.out.println(matcher.group());
  // 1 2
}
```

**注意:**
1. region()方法 对 replaceFirst() | replaceAll()不起作用

演示代码:
```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

System.out.println(matcher.replaceFirst("*"));
// *xxxa1b2c3yyy9

// 按理说我们设置了搜索范围 从a开始 那第一个数字字符应该是1啊 但我们发现我们替换的还是 0
```

之前不是说过 我们替换的时候 会找find()等方式的匹配项呢 那调用find() 肯定会改变游标的位置

为什么这两个替换的方法又重新回到开头去搜索了呢？
``` 
  我们看下两个替换方法的源码
  我们发现 源码中 第一行的位置 就调用了 reset()

  也就是说 上面就将搜索范围的设置 解除了
```

2. 同时上面说的 appendReplacement() appendReplacement() 也不会搜 region() 方法的限制


3. 当 region的开始的位置 和 find(指定位置) 冲突的时候
region(4,10)
find(0)
结果是以find(0)中指定的为准 同时会搜索到字符串的末尾 因为find(带参的时候) 也调用了reset() 所以会取消结束范围的设置

通常情况下我们都是使用region()设置搜索范围 然后使用没有参数的find()方法找到所有的匹配项 并处理

4. 0xxxa1b2c3yyy9 设置了 region(4, 10) 后 字符串的开头就是0 结尾就是3

5. 那当我们不想出现4中的效果怎么办 也就是还想让开头和结尾是正常的
**<font color="#2185B">matcher.useAnchoringBounds(false);</font>**  

**<font color="#2185B">matcher.hasAnchoringBounds();</font>**  
返回值
boolean

true:
将搜索范围的首尾字母当做字符串的开头和结尾了

false
没有将搜索范围的首尾字母当做字符串的开头和结尾

```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

// 不会将搜索范围的首尾字母当做字符串的开头和结尾了
matcher.useAnchoringBounds(false);

// 查看是否以搜索范围的首尾字母当做字符串的开头和结尾了
boolean flag = matcher.hasAnchoringBounds();
sout(flag) // false
```

6. 设置了搜索范围后 搜索位置的开头就是指定字符了 这时候该开头的位置是空白字符么？ 是！ 仍然是
```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\ba");
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

// a就是搜索范围的开头了 那么开头的左边 系统会默认为有空白字符么?
sout(m.find())    // true 有
```

7. 如果不希望在设置搜索范围后 开头和结尾处 有空白字符的设定 那我们就调用如下的方法
**<font color="#2185B">matcher.useTransparentBounds(true);</font>**  
搜索范围的首尾字母前不再是空白字符的设置
```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

// 搜索范围的首尾字母前不再是空白字符的设置
matcher.useTransparentBounds(true);
```

**<font color="#2185B">matcher.hasTransparentBounds();</font>**  
查看 搜索范围的首尾字母前后 系统是否认为有空白字符

返回值
boolean

false:
说明 当前系统会认为 搜索范围首位字母前后 有 空白字符

true
说明 当前系统会认为 搜索范围首位字母前后 没有 空白字符

<br><br>

**<font color="#2185B">matcher.regionStart()</font>**  
**<font color="#2185B">matcher.regionEnd()</font>**  
在设置了搜索范围的前提下 获取 开始范围是多少

返回值 
int

```java
// 设置它的搜索范围
matcher.region(4,9);
System.out.println(matcher.regionStart());
```


**<font color="#2185B">matcher.reset()</font>**  
当我们设置了搜索范围后 我们调用该方法 可以重置到机器人最初的状态(*解除搜索范围*)

<br><br>

# 重置 Matcher类对象
上面我们说了 matcher.reset()

该方法也可以有参数 有参数的reset()对象 不仅仅能将游标拉回起点 *还可以将机器人脚下的字符串彻底的换掉*

**<font color="#2185B">替换机器人手中的字符串</font>**  
**<font color="#2185B">matcher.reset("新字符串")</font>**  
3种 string类型
```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");

// 机器人脚下的字符串是str
Matcher matcher = pattern.matcher(str);

// 如果调用有参数的reset() 可以替换机器人脚下的字符串
matcher.reset("abcdef");

// 替换了字符串后 我们看看正则还能找到东西么
System.out.println(matcher.find());  // false
```


**<font color="#2185B">替换机器人手中的正则</font>**  
**<font color="#2185B">matcher.usePattern(pattern2);</font>**  
参数要传递一个正则对象

更换正则表达式后 并不影响游标的位置

```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");

// 机器人脚下的字符串是str
Matcher matcher = pattern.matcher(str);

// 定义一个新的正则对象
Pattern pattern2 = Pattern.compile("[abc]");
matcher.usePattern(pattern2);
```

<br><br>


