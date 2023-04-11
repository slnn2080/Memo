# 变量
python中的变量的定义 可以直接写变量名 不像
- js中需要let
- java中需要类型

```py
name = "张三"
```

<br><br>

# 数据类型
入门阶段接触的数据类型为

|类型名称|描述|说明|
|:--|:--|:--|
|stirng|字符串类型|使用""引起来|
|int|整型(有符号)|数字类型 存放整数 如-1 10 0|
|float|浮点型(有符号)|数字类型 存放小数 如3.14|

<br>

## type(被查看类型的数据)
相当于js中的 typeof

```py

str = "字符串"
res = type(str)

print(res)
# <class 'str'> string类型的缩写 str
```

<br><br>

# 数据类型的转换
字符串 整数 浮点数 之间进行相互转换

<br>

## 类型转换的原因
从文件中读取的数字 默认就是字符串, 我们需要转换成数字类型, 后续学习的input()语句, 默认结果是字符串, 若需要数字也需要进行转换

<br>

### int(x)
将x转换为一个整数

<br>

### float(x)
将x转换为一个浮点数

<br>

### str(x)
将对象x转换为字符串, **任何类型都可以通过该函数转换为字符串**

<br>

```py
str = "1"
num = int(str)
print(type(num))
# <class 'int'>
```

<br>

### 注意:
1. 转换失败会报如下的异常
```py
ValueError: invalid literal for int() with base 10: 'a'
```

<br>

2. 字符串类型的"11.11", 并不能通过 int()来进行转换  
它只能用float()函数进行转换, 看来除了str()函数, 其它的函数都必须符合转换后的格式

<br>

3. 整数 和 浮点数之间可以转换, 整数使用float()会带小数点, 小数使用int会截断

<br><br>

# 标识符
py中不太实用驼峰呀

<br><br>

# 运算符

|运算符|描述|实例|
|:--|:--|:--|
|``//``|取整除|返回商的整数部分 9 // 2 输出结果为4, 9.0 // 2.0 输出结果 4.0|
|``**``|指数|``a**b``, ``2**2``|
|``**=``|幂赋值运算符|``c**=a``, ``c=c**a``|
|``//=``|取整除赋值运算符|``c//=a``, ``c=c//a``|

<br>

```
4 / 2 = 2.0
```

<br><br>

# 字符串

## 字符串在py中的多种定义方式

### 方式1: 单引号定义法
```py
name = 'hello'
```

<br>

### 方式2: 双引号定义法
```py
name = "hello"
```

<br>

### 方式3: 三引号定义法
```py
name = """hello"""
```

<br>

三引号定义法 和多行注释的写法一样 同样支持换行操作, 使用变量接收它就是字符串, 不使用变量接收就是多行注释

<br><br>

## 字符串的拼接

### 字面量 和 变量 的拼接

**方式1:**
```py
str = "world"
print("hello " + str)
```

<br>

**方式2: 字符串中使用特殊符号**  

- %: 表是我要占位
- s: 表示后续的变量变成字符串 放入占位的地方
- d: 表示后续的变量变成整数 放入占位的地方
- f: 表示后续的变量变成浮点型 放入占位的地方

<br>

**格式:**  
字符串中使用 %s 来进行占位, %表示分割后面是变量, 多个变量使用括号括起来 以逗号分隔
```py
"字符串 %s" % (变量1 ... )
```

<br>

总结: %表示我先占一个位置 等一会有个变量过来 我把它变成字符串放到占位的位置

```py
num = 100
res = "我的数学成绩是: %s" % num
print(res)
# 我的数学成绩是: 100
```

<br><br>

## 格式化的精度控制
格式化字符串的过程中 做数字的精度控制

```py
name = "传智播客"
set_up_year = 2006
stock_price = 19.99
message = "我是: %s, 我成立于: %d, 我今天的股价是: %f" % (name, set_up_year, stock_price)

print(message)
# 是: 传智播客, 我成立于: 2006, 我今天的股价是: 19.990000
```

我们能够发现, 浮点数19.99 -> 19.990000

<br>

**原因:**  
我们没有对数字进行精度控制

<br>

### 字符串格式化 -  数字的精度控制
我们可以使用辅助符号 "m.n" 来控制数据的宽度 和 精度, 
```
m.n
↓
3.3

m表示整数位的宽度
.n表示小数位的精度
```

<br>

**m: 控制宽度**  
要求是数字(很少使用) **设置的宽度小于数字自身 不生效**

<br>

**n: 控制小数点的精度**  
要求是数字 会进行小数的四舍五入

<br>

**示例:**  
%5d: 表示将整数的宽度控制在5位  
如数字11, 被设置为5d 就变成 _ _ _ 1 1, 用三个空格补足宽度

<br>

%5.2f: 表示将宽度控制为5, 将小数点精度设置为2  
**小数点和小数点部分也算入宽度计算**  

如对11.345设置了 %7.2f后, 结果为 _ _ _ 1 1 . 35, 2个空格补足宽度 小数部分限制2位精度后 四舍五入为.35

<br>

%.2f: 表示不限制宽度 只设置小数点精度为2  
如11.345设置 %.2f 后, 结果是11.35

<br>

```py
message = "测试:%5.2f" % 1.23
print(message)

# 测试:__1.23
```

<br><br>

## 字面量 和 变量 的拼接2
前面我们是通过 % 来进行占位 还能进行精度控制

<br>

### 格式:
"字符串"前面使用f标识, 字符串里面使用{变量} 拼接变量
```py
f"字符串{变量}"
```

<br>

### 示例:
```py
name = "sam"
print(f"我的名字叫{name}")
```

<br>

### 特点:
该方式拼接的变量 不关心类型 也不关心精度, 原本是什么样就输出什么

我们可以观察到 19.99 并没有变成 19.990000
```py
price = 19.99
print(f"图书价格: {price}")
# 图书价格: 19.99
```

<br><br>

## 对表达式进行格式化
就是在 {表达式} 括号中使用表达式

<br>

### 什么是表达式
一条**具有**明确执行**结果**的代码语句, 如 1 + 1

<br>

```py
print(f"1 + 1 的结果为{ 1 + 1}")

print(f"字符串在Python中的类型是: %s" % type("字符串"))

# 1 + 1 的结果为2
# 字符串在Python中的类型是: <class 'str'>
```

<br><br>

# 数据输入: input
程序需要我们输入信息, 读取键盘输入的场景

<br>

- 数据输出: print
- 数据输入: input

<br>

**print语句:**  
可以将内容输出到屏幕上

<br>

**input语句:**  
用来获取键盘的输入

<br>

## 格式:
我们使用 input() 语句获取键盘的输入 并保存到一个变量中

参数部分会在input语句之前 输出在控制台
```py
return_value = input("提示信息")
```

<br>

**返回值:**  
字符串

<br>

**示例:**
```py
# 它会等待用户在控制台上的输入
name = input("请告诉我你是谁")

print(f"谢谢 你的名字是{name}")
```

<br>

# 数据类型: 布尔类型
布尔类型属于数字类型下的小类型, 本质上true被记作1, false被记作0

<br>

|类型名称|描述|说明|
|:--|:--|:--|
|数字(number)|支持:<br>- 整数<br>- 浮点数<br>- 复数(complex)<br>- 布尔|复数(4+3j, 以j结尾表示复数)|
|字符串(stirng)|描述文本的一种数据类型|使用""引起来|
|列表(list)|有序的可变序列|py中使用最频繁的数据类型 可有序记录一堆数据|
|元组(tuple)|有序的不可变序列|可有序记录一堆不可变的py数据集合|
|集合(set)|无序不重复集合|可无序记录一堆不重复的py数据集合|
|字典(dictionary)|无序kv集合|可无序记录一堆kv型的py数据集合|

<br>

## 格式:
注意布尔类型的值为 **首字母大写**
```py
flag = True
flag = False
```

<br>

## 关系运算符:
- ``==``: 可以比较字符串的内容是否相等
- ``!=``
- ``>``
- ``<``
- ``>=``
- ``<=``

<br>

### 逻辑运算符
- and: 且
- or: 或
- not: 非

<br>

### 位运算符
- &
- |
- ^
- ~
- << 
- ``>>``

<br>

### 身份运算符
- is: 如果两个变量是同一个对象 返回 true: x is y
- is not: 如果两个变量不是一个对象 返回 true: x is not y

<br>

### 示例:
```py
flag = 1 > 3
print(flag)
# False
```

<br><br>

# if语句
py中是利用空格缩进来判断归属的

<br>

## 格式:
1. 缩进为4个空格
2. 条件后有 ``:``
3. 语句的部分可以写任意行 但每行前要有4个空格作为缩进
```py
if 条件:
    语句...
```

<br>

**示例:**  
```py
age = 30
if age > 18:
    print("我成年了")
    print("我要去规划人生啦")
```

<br><br>

# if else 语句

## 格式:
1. else后面有 ``:``
```py
if 条件:
    满足条件时要做的事1
    满足条件时要做的事2
else:
    不满足条件时要做的事情1
```

<br>

**示例:**  
```py
age = 10
if age > 18:
    print("我成年了")
    print("我要去规划人生啦")
else:
    print("我还没成年!")
```

<br><br>

# if elif else 语句

## 格式:
注意 else 的后面有 :
```py
if 条件1:
    程序体
elif 条件2:
    程序体
else:
    程序体
```

<br>

**示例:**  
```py
age = 10
if age > 50:
    print("我老了")
    print("我要去规划人生啦")
elif age > 18:
    print("我还年轻!")
else:
    print("我太小了")
```

<br>

**示例2:**  
```py
print("欢迎来到黑马动物园")
height = int(input("请输入你的身高: "))
level = int(input("请输入你的VIP等级: "))

if height < 120:
    print("您的身高小于120CM, 可以免费游玩")
elif level > 3:
    print("您的vip等级大于3, 可以免费游玩)
else:
    print("不好意思")
```

<br><br>

# while语句
每次循环都会判断条件是否满足 如果不满足则循环结束, 只要条件满足就会无限循环

<br>

## 格式:
```py
while 条件:
    条件满足时 做的事情
```

<br>

**示例:**  
python 中 没有 i++ 哦
```py
index = 0
while index < 10:
    print(index)
    index += 1
```

<br>

### 嵌套循环
```py
while 条件:
    条件满足时 做的事情

    while 条件2:
        条件2满足时 做的事情
```

<br>

**代码示例:**  
```py
index = 1
while index < 100:
    print(f"今天是第{i}天, 准备表白")
    i = 1
    while i < 10
        print(f"送给小美第{j}只玫瑰花")
        j += 1
    print("小美 我喜欢你")
    index += 1

print(f"坚持到第{i - 1}天, 表白成功")
```

<br><br>

# for循环
while循环的循环条件是自定义的 自行控制循环条件  
for循环是一种 轮询 机制 对一批内容进行 逐个处理

<br>

通俗的理解for, 就是将待办事项逐个完成的机制

<br>

## 格式:
对待处理中的数据集中的数据 挨个取出 **每一次循环就将数据集中的每一个数据赋值给临时变量**

注意 结果集的最后有一个 :
```py
for 临时变量 in 待处理数据集:
    循环满足条件时执行的代码
```

<br>

**代码:**  
```py
name = "itheima"
for str in name:
    print(str)


str = "itheima is a brand of itcast a a"
count = 0
for s in str:
    if s == "a":
        count += 1

print(count)
```

<br>

### 要点:
python中的for循环是无法定义循环条件的, 只能从被处理的数据集中 依次取出内容进行处理

从理论上讲 py的for循环无法构建无限循环 (被处理的数据集不可能无限大)

<br>

### 概念:
上述中 待处理数据集 的部分, 称之为: **序列类型**  

**序列类型:**  
它指, 其内容可以一个个依次取出的一个类型 包括
1. 字符串
2. 列表
3. 元组 等

<br>

## Range语句
for循环语句 本质上遍历的是 序列类型, 而我们可以通过range语句获取到一个序列

我们可以通过range语句来构建序列, 构建出来的序列就可以被for循环使用

<br>

### 语法1:
获取一个从0开始, 到num结束的数字序列(不包含num本身)
```py
range(num)

range(5) # 取得的是 [0, 1, 2, 3, 4]
```

<br>

### 语法2:
获取一个从num1开始 到 num2结束的数字序列(不包含num2本身)
```py
range(num1, num2)

range(5, 10) # 取得的是 [5, 6, 7, 8, 9]
```

<br>

### 语法3:
获得一个从num1开始, 到num2结束的数字序列(不包含num2本身), 数字之间的步长 以step为准(step默认为1)
```py
range(num1, num2, step)

range(5, 10, 2) # 取得的是 [5, 7, 9]
```

<br>

### 示例:
```py
for item in range(10):
    print(item) # 0 - 9
```

<br>

### 技巧
通过range()达到我们js中原生for的写法
```py
# 比如我们利用for进行10次的for循环
for item in range(0, 10):
    print(f"我执行了第{item}次")
```

<br>

**错误演示:**  
直接赋值给变量不行
```py
arr = range(10)
```

<br>

### 需求: 有几个偶数
```py
count = 0
for item in range(1, 100):
    if item % 2 == 0:
        count += 1

print(count)
```

<br><br>

## 变量的作用域
for中的临时变量i, 它的作用域范围只在for循环内部生效, 但是实际上它在外面也可以被访问到, 但是我们不建议这么做

<br>

### 问题:
```py
for i in range(5):
    print(i)

# 我们能访问到 for循环中的变量 i 么?
print(i)
```

<br>

### 解答:
- 规范上: 不允许
- 实际上: 可以, 不建议这么做, 如果我们想访问临时变量的话 我们可以预先在循环外定义该变量

<br>

### for嵌套应用
```py
for 临时变量 in 序列类型:
    循环体

    for 临时变量 in 序列类型:
        循环体
```

<br>

```py
i = 1
for i in range(1, 101):
    print(f"今天是向小美表白的第{i}天")

    for j in range(1, 11):
        print(f"送给小美的第{j}朵玫瑰花")

    print(f"小美 我喜欢你(第{i}天的表白结束)")
```

<br>

# 循环中断 continue 和 break
无论是while循环还是for循环 都是重复性的执行特定的操作 在这个重复的过程中 会出现一些其他的情况让我们不得不

- 暂时跳过某次循环, 直接进行下一次
- 提前退出循环 不再继续

<br>

### continue
中断本次循环, 直接进入下一次循环, 它可以用于 for 和 while

```py
for i range(1, 100):
    语句1

    continue

    语句2
```

在循环内 遇到continue就结束当次循环 进行下一次 所以语句2是不会执行的

<br>

```py
for i in range(0, 6):
    if i == 2:
        continue
    print(f"语句1 - {i}")
```

<br>

**注意:**  
continue中断的只能是它所在的循环, 比如嵌套for中 continue在内层循环中 那么它只能临时中断内层循环

<br>

### break
break关键字用于**直接结束循环**, 它可以用在for和while中

```py
for i in range(1, 100):
    语句1
    break
    语句2

语句3
```

<br>

**注意:**  
break所终结的也是它所在的循环

<br><br>

# 函数
组织好的可重复使用的, 用来实现特定功能的代码段

<br>

### 扩展: len()
用来获取字符串的长度 或 列表的长度

**返回值:**  
int

<br>

```py
name = "sam"
length = len(name)
print(type(length), length)   # <class 'int'> 3



arr = [1,2,3,4,5]

print(len(arr)) # 5
```

<br>

### 函数的格式
注意 冒号的位置
```py
def 函数名(参数):
    函数体
    return 返回值
```

<br>

**示例:**  
```py
str = "spring boot"

def get_length(str):
    count = 0
    for s in str:
        count = count + 1
    return count

length = get_length(str)
print(length)
```

<br>

### 函数的要点:
1. 函数需要先定义后使用

2. 多个参数之间使用 , 分隔

3. 定义几个参数 就要传入几个参数

4. 参数的默认值: ``def test_param(a, b = 6):``

5. 函数返回 None 的情况 (None == null, 类型 ``<class "NoneType">``)
  - 直接写return
  - 不写return
  - 显示定义 return None

6. None == False, 在if判断中 None等同于False

7. None用于定义无初始值的变量
```py
res = None
```

<br>

### 示例: 利用None进行条件判断
```py
def check_age(age):
    if age > 18:
        return True
    else:
        return None
    
res = check_age(15)

#  相当于 if(!res) { ... }
if not res:
    print("未成年")
```

<br>

### 函数的说明注释
1. 使用多行注释
2. 冒号给参数和返回值进行解释说明
3. 鼠标悬停时 会展示函数说明

```py
def check_age(age):
    """
    函数说明文档:
        :param age: 年龄
        :return: 返回值 boolean
    """
    if age > 18:
        return True
    else:
        return None
```

<br>

### 函数中变量的作用域

**局部变量:**  
定义在函数体内部的变量 只在函数体内部生效, 在函数体外部访问则报错

局部变量用于临时保存数据, 当函数调用结束后 则销毁

<br>

**全局变量:**  
指在函数体内, 外都能生效的变量

<br>

### 函数内部修改全局变量: global

**错误演示:**  
如下的操作方式是不能修改全局变量的
```py
num = 100
def test_a() {
    num = 200
}

test_a()

# 结果仍然是 100, 因为函数内部的修改操作 仍然会被认为是定义了局部变量
print(num)
```

<br>

**正确演示:**  
我们在函数内部 使用 global关键字 指明一个变量在函数内部是全局变量(并不是局部变量)

```py
num = 100

def modify_num():
    # 指明 num 变量为全局变量 
    global num
    num = 200

modify_num()

# 结果: 200
print(num)
```

<br><br>

# 数据容器
一种可以容纳多份数据的数据类型 容纳的每一份数据称之为一个元素, **每一个元素可以是任意类型的数据** 如字符串 数字 布尔等 (类似数组)

我们根据数据容器特点的不同 会划分为5类:
1. 列表 list
2. 元组 tuple
3. 字符串 str
4. 集合 set
5. 字典 dict

<br><br>

## 列表 (数组)

### 格式:
列表中每一个元素之间用 , 隔开, 其类型是 ``<class 'list'>``

<br>

**字面量列表:**  
```py
[el1, el2, ... ]
```

<br>

**定义变量接收:**  
```py
arr = [el1, el2, ... ]
```

<br>

**定义空列表:**
```py
arr = []
arr = list()
```

<br>

### 示例:
```py
arr = [1,2,3,4,5]

for item in arr:
    print(item)



# 列表从后往前取数字, 末尾下标为-1, 利用了abs
index = -1
while abs(index) <= len(arr):
    print(arr[index])
    index = index - 1
```

<br>

### 要点:
1. 列表中的元素的类型任意, 和js一样

2. 列表的起始下标为 0

3. 列表的下标可以是反向索引, 末位为-1, 从后往前依次递减
```
|元素|元素|元素|元素|元素|
  ↓   ↓    ↓   ↓   ↓
  0   1    2   3   4


|元素|元素|元素|元素|元素|
  ↓   ↓    ↓   ↓   ↓
 -5  -4   -3  -2  -1
```

4. 下标越界同样报错 list index out of range

<br><br>

## 列表的常用操作
list列表本身提供了一系列可供我们使用的函数, 如我们的arr.map arr.find 等等

<br>

### 根据元素找到元素在列表中的下标
查找的是正向索引, 如果找不到 报错: ValueError
```py
list.index(元素)


arr = [1,2,3,4,5]
index = arr.index(1)
print(index)
```

<br>

### 修改列表中指定下标位元素的值
```py
list[index] = "值"
```

<br>

### 在指定下标位置插入元素
原下标位置的元素后移
```py
list.insert(下标, 元素)

arr = [1,2,3,4,5]

arr.insert(0, "a")
print(arr) # ['a', 1, 2, 3, 4, 5]
```

<br>

### 在列表尾部追加 单个 新元素
```py
list.append(元素)
```

<br>

### 在列表尾部追加 一批 新元素
该方法会将其它数据容器的内容取出, 依次追加到列表尾部
```py
list.extend(其它数据容器)


arr = [1,2,3,4,5]
arr2 = ["a", "b"]

arr.extend(arr2)
print(arr) # [1, 2, 3, 4, 5, 'a', 'b']
```

<br>

### 删除指定下标的元素
```py
del list[下标]

list.pop(下标)
```

<br>

### 根据内容删除列表中的元素
从前到后的搜索该元素 删除匹配的第一个元素
```py
list.remove(元素)
```

<br>

### 清空列表
```py
arr.clear()  # []
```

<br>

### 统计列表中全部的元素的数据
```py
len(列表)
```

<br>

### 统计列表中某元素的数量
```py
list.count(元素)
```

<br><br>

## 列表的 循环遍历

### while 遍历
while玄幻可以自定义循环条件 并自行控制
```py
arr = ["a", "b", "c", "d"]

def list_while_fn(arr):
  index = 0
  while index < len(arr):
      print(arr[index])
      index += 1

list_while_fn(arr)
```

<br>

### for 遍历
for循环不可以自定义循环条件 只可以一个个从容器内取出数据

它只适用于 遍历数据容器的场景 或 简单的固定次数的循环场景
```py
arr = ["a", "b", "c", "d"]

def list_for_fn(arr):
   for item in arr:
      print(item)

list_for_fn(arr)
```

<br><br>

# 数据容器: 元组
列表是可以修改的 如果我们想要传递的信息不被篡改 那列表就不合适了

<br>

### 元组的特点: 只读的list
1. 元组和列表一样 都是可以封装多个不同类型的元素在内
2. **元组一旦定义完成 就不可以修改**

<br>

### 场景:
我们需要在程序中封装数据 但又不希望封装的数据被篡改的时候 就使用元组

<br>

### 格式: 元组使用()定义
```py
# 定义元组字面量
(元素1, 元素2, 元素3 ...)


# 定义元组变量
变量名称 = (元素1, 元素2, 元素3 ...)


# 定义空元组
变量名称 = ()
变量名称 = tuple()
```

<br>

### 示例:
```py
t = (1, 2, 3, 4, 5)

print(len(t)) # 5

print(type(t)) # <class 'tuple'>

print(t[0]) # 0

print(t[-1]) # 5

i = t.index(1)
print(i) # 0
```

<br>

### 注意:
1. 如果 元组 中只有一个数据 元素后面必须带 , 
```py
(1,)
```

2. 元组内定义的列表 列表中的元素是可以被修改的

3. 元组也是list 所以它可以使用list中的方法, 但是追加删除等方法是不可以使用的, 一般能用的就是如下的方法
  - index()
  - count()
  - len()

<br>

### 元组的遍历
```py
t = (1, 2, 2, 4, 5)
index = 0
while index < len(t):
    print(t[index])
    index += 1



for item in t:
    print(item)
```

<br><br>

# 数据容器: 字符串
我们这里会以数据容器的视角来看下字符串

尽管字符串看起来并不像 列表 元组 那样 一看就是存放了许多数据的容器 但不可否认的是 字符串同样也是数据容器的一员

字符串是字符的容器, 一个字符串可以存放任意数量的字符 如字符串: "itheima", 每一个字符都是一个元素

每一个字符都会对应有自己的索引 从0开始

<br>

### 特点:
1. 字符串支持下标
  - 从前向后: 0
  - 从后向前: -1

2. 字符串是不可修改的数据容器 和 元组一样

<br><br>

## 常用方法

### 通过下标取值
```py
str = "itheima"
print(str[0])
```

<br>

### 获取自定字符在字符串中的 下标
```py
str = "itheima"
index = str.index(h)
```

<br>

### 字符串的替换
将字符串内的**全部** 字符转1 替换为 字符串2

返回值: 新的字符串
```py
字符串.replace(字符串1, 字符串2)


str = "itheima"

nstr = str.replace("i", "x")
print(nstr)
```

<br>

### 字符串的分割
按照指定的分隔符字符串, 将字符串划分为多个字符串, **并存入列表对象中**
```py
字符串.split("分隔符")


str = "itheima-sam"

str_list = str.split("-")
print(str_list)
```

<br>

### 去除 字符串 指定子串
```py
字符串.strip(参数)
```

<br>

- 去除前后空格 (不传参)
```py
str = "  itheima-sam  "

str = str.strip()
print(f"---{str}---")
```

<br>

- 去除前后自定字符串: 传入12其实就是1和2, 它们都会被移除并且是按照单个字符
```py
str = "12itheima-sam21"

str = str.strip("12")
print(f"---{str}---")
```

<br>

### 统计字符串中某字符串出现的次数
```py
字符串.count("字符串")
```

<br>

### 统计字符串的长度
```py
len(字符串)
```


