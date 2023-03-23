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
