<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LESS 笔记</title>

<script>
/* 
LESS介绍
less是一种动态样式语言，属于css预处理器的范畴，它扩展了 CSS 语言，
增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展
LESS 既可以在 客户端 上运行 ，也可以借助Node.js在服务端运行。

less的中文官网：http://lesscss.cn/
bootstrap中less教程：http://www.bootcss.com/p/lesscss/

----------------------------------------------------

less模块化处理：
使用
@import:'文件路径'  在less中引入外部别的文件 达到模块化的效果

@import:'css/.less'

优点是可以对less文件做一个模块化的处理
比如：
我可以创建4个less文件
第一个负责：定义变量
第二个负责：定义动画效果
第三个负责：定义布局相关的东西
第四个负责：对它们的整合

这样方便我们的维护哪个出问题了 去哪个里面找就可以了

----------------------------------------------------

CSS的预处理器：
比较大的就是Less（写音悦台项目时要用的预处理器） 和 Sass（写相册的时候要用的预处理器）， 还有一个stylus（写Vue的时候要使用的预处理器）
语法都差不多

// CSS垂直水平居中
.outer {
position:relative;
width:500px;
height: 500px;
border:1px solid black;
margin:0 auto;
}

.inner {
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height: 100px;
background-color: tomato;
}

----------------------------------------------------

//Less的使用方法
1. 通过node.js去安装

2. 通过vs code里的插件

3. 通过 浏览器端的使用方式      不推荐 因为不是预处理
3.1 引用js文件      这个js文件就是用来做编译的 放在body标签的下面
<script src="less.min.js" type="text/javascript"><script>  已经下好 在less文件夹中的css文件夹里
3.2 在style标签中，把type属性的值改为 type='text/less'
<style type='text/less'><style>

----------------------------------------------------

//less中的注释
以  //       开头的注释，不会被编译到css文件中
以  /##/     包裹的注释会被编译到css文件中  

----------------------------------------------------

//less中的变量
- 语法:
定义变量：
@变量名:值;

使用变量：
width:@变量名;

- 属性值            为 变量     使用时直接使用   @变量名
- 选择器 和 属性名  为 变量     使用时  @{变量名}

- less里的变量都是延时加载的
变量靠下的会生效
变量在块级作用域里生效 块级作用域里的定义的变量 在使用时 不会去别的作用域里查找

----------------------------------------------------

//less的嵌套规则
1. 祖先 后代选择器
- eg：
outer {
inner {

}
}

2. 子元素选择器
- eg：
outer {
>inner {

}
}

2. &
- 使用 & 时 &代表当前括号外的选择器
- eg:
outer {
inner {
    &:hover {

    }
}
}

代表：  outer inner:hover{}

----------------------------------------------------

混合就是将一系列属性从一个规则集引入到另一个规则集的方式
1.普通混合    
不加括号的 混合函数     不加括号会被输出到css文件中

2.不带输出的混合
加括号的混合函数        加上括号不会被输出到css文件中

3.带参数的混合
混合函数中可以传递形参，调用的时候传递实参

4.带参数并且有默认值的混合
混合函数中的形参 可以指定默认值，优点是没有传递对应的实参时一不会报错 二会使用默认值

5.带多个参数的混合

6.命名参数
- 在传递实参的时候 要按照形参的顺序指定对应的值
- 还可以在调用的时候，在实参里写上 形参:值 这样就可以不用在意顺序了
.混合函数名(@c:pink, @h:200px);  

----------------------------------------------------

//less的混合
需求：
1. 我要现在有两个div 都要垂直 水平居中
我们可以这么写:
.outer {
position:relative;
width:500px;
height: 500px;
border:1px solid black;
margin:0 auto;

.inner {
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height: 100px;
background-color: tomato;
}

.inner2 {
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height: 100px;
background-color: tomato;
}
}
但是上述的写法中 有很多的重复代码 
为了解决上述问题 我们就需要用到混合

- 解决方案：

1. 首先定义混合函数
.混合函数名(){              //括号可以不写这个混合函数的代码就会被编译到css中，写上就不会被编译到css中
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height:100px;
}

2. 调用定义好的混合函数
.inner {
.混合函数名();          //括号可以不写
}


上述的 混合函数中 还可以指定形参
.混合函数名(@w, @h){
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:@w;        //这里
height:@h;
}

.inner {
.混合函数名(200px, 200px);
}

上述的 混合函数中 还可以指定形参的默认值
.混合函数名(@w:100px, @h:200px)

----------------------------------------------------

7.匹配模式
需求：现在我要在页面上画三角形，方向自定

1. 定义混合函数
.triangle(@c, @w){
width:0px;
height:0px;
border:@w @c solid;

border-color:transparent transparent @c transparent
border-top:none;
}
2. 调用
box {
.triangle(blue, 10px);
}
可是还是有些不只能 怎么控制方向？


// less中 可以在 混合参数的 形参 中传递一个匹配符 这样在调用参数时 可以调用指定的混合函数
- 匹配符是第一个参数 

.triangle(L, @c, @w){
width:0px;
height:0px;
border:@w @c solid;

border-color:transparent transparent @c transparent
border-top:none;
}

box {
.triangle(L, blue, 10px);       这样调用了 与L匹配的混合函数
}

----------------------------------------------------

// less中 对于 同名的 混合函数 提供了 复用函数 减少对同一段代码的重复编写
- 复用函数中的 形参 传递 @_ 这样在编写同名混合函数时 会自动带上复用函数中的代码
- eg：
//定义 L 为左的混合函数 效果为三角形
.triangle(L, @c, @w){
width:0px;
height:0px;
border:@w @c solid;

border-color:transparent transparent @c transparent
border-top:none;
}
//定义 R 为右的混合函数 效果为三角形
.triangle(R, @c, @w){
width:0px;
height:0px;
border:@w @c solid;

border-color:transparent transparent @c transparent
border-top:none;
}

// 上面的代码中 还是有 重复的代码吧 也可以把重复的代码提取出来

1. 定义复用函数
.triangle(@_){      //这里必须是同名函数 形参必须是 @_
width:0;
height:0;
}
2. 下面写同名混合函数时，会自动带上复用函数中的代码

----------------------------------------------------

8.arguments变量
- 使用arguments变量时，前面要加上 @ 

.triangle(@l, @c, @s){

border:@l, @c, @s;      //正常我要这么写是吧

border:@arguments;      //全是形参的时候可以传递 实参列表
}

.triangle(1px, black, solid);   //传递实参

----------------------------------------------------

@less运算
- 在less中可以进行加减乘除的运算
- 计算的双方只需要一方带单位就可以了 这个单位会保留下来
- 两个数都有单位且不一样的时候, 最后的结果以第一个单位为准

- 除法的元素要括号括起来
- 运算符前后必须用空格隔开

- eg：
@border:5px + 5;
box {
    width:100px + 100;
    border:@border red solid;
}

background:#444 - #222 颜色只要用数字就可以进行运算

----------------------------------------------------

@继承

混合的概念是 复制粘贴 把同类代码定义成要复制文本 然后再复制到各个应用的地方
不好的地方就是CSS中会出现很多重复代码
- eg：
box1 {
width：100px;
height：100px;
}
box2 {
width：100px;
height：100px;
}
box3 {
width：100px;
height：100px;
}

继承的概念是，把相同的代码通过分组选择器 写一遍
- eg:
box1, box2, box3 {
width:100px;
height:100px;
}


// 继承
- 性能上比混合要高， 灵活性没有混合强
- 写all 代表把跟匹配选择器的所有相关样式都继承过来 包括hover
- 语法：
当前选择器:extend(选择器字符串 [all]) {

}
- eg
- 不写all：
.box1 {
width:100px;
height:100px;
background-color:red;
}

.box1:hover {

background-color:yellow;
}

.box2:extend(.box1){
background-color:blue;
}

- 结果：
.box1,
.box2 {
width: 100px;
height: 100px;
background-color: red;
}
.box2 {
background-color: blue;
}


- 写all 代表把跟匹配选择器的所有相关样式都继承过来 包括hover
- eg:
.box1 {
width:100px;
height:100px;
background-color:red;
}

.box1:hover {
background-color: yellowgreen;
}

.box2:extend(.box1 all){
background-color:yellow;
}

- 结果：
.box1,
.box2 {
width: 100px;
height: 100px;
background-color: red;
}
.box1:hover,
.box2:hover {
background-color: yellowgreen;
}
.box2 {
background-color: yellow;
}

----------------------------------------------------

@避免编译：
- 语法：    ~'内容' 
- 里面的内容不会被编译到css文件里












/

.outer {
position:relative;
width:500px;
height: 500px;
border:1px solid black;
margin:0 auto;
}

.inner {
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height: 100px;
background-color: tomato;
}
</script>
</head>
<body>

</body>
</html>


--------------------------------------

@less 简介

    - less是一门css的预处理语言，是css的增强版，通过less可以编写更少的代码实现更强大的语言
    - 在less中添加了许多的新特性，比如对变量的支持，对mixin的支持
    - less的语法大体上和css的语法一直，但是less中增添了许多对css的扩展
            所以浏览器无法直接运行less代码，要执行必须先将less转换为css，然后再由浏览器去执行

    - less的转换插件：
        easy less 安装完插件后 自动把less转换为css语言

    - less的使用 新建一个文件.less  比如test.less 在这个新文件中书写less的代码
        然后在保存时同文件下会生成 同文件名的css文件
        test.less
        test.css




    - css的不足点：
        1. 同一个颜色可能因为设计风格统一 会应用到许多的地方 这个颜色在我们的网页中是需要反复去使用的
                比如有100个地方使用了 未来在修改换风格的时候 修改起来会非常麻烦

        - 解决方案：
            把这个颜色存起来 把它变成一个变量 这样去要使用颜色的地方应用变量 未来修改的时候会很轻松

            我们在根标签中设置变量
            html {
                --变量名：样式值
                --color:#bfa        //现在我设置了一个变量名为color 值为#bfa的变量
                --length:100px;
            }

            box {
                // 用var 代表要使用变量
                background-color:var(--color)
                width:var(--length);
                height:var(--length);
            }

        
        2. 在布局 或者 使用图片的时候 我们经常需要去算一些数据 在css中有自动算的函数
        
        - 解决方案：
            calc();     //计算函数
            {
                width:calc(1000px/2);
            }
        
        css中是支持变量已经计算函数的但是浏览器的兼容性不好

--------------------------------------

@less的语法

一， 选择器的一些写法

// 后代元素选择器：
CSS中想些box1的后代元素box2的样式，需要这么写：
box1 box2 {
    background-color:red;
}

less中 可以这么写：
box1 {
    background-color:#bfa;

    box2 {
        background-color:yellow;
    }
}


// 子元素选择器的写法
.box1 {
    color:red;

    // box1的后代元素box2
    .box2 {
        color:yellow;
    }

    // box1的子元素box3
    >.box3 {
        color:blue;
    }
}


// 加hover
    - & 就代表 {} 外的选择器， &写在哪里 就代表当前{}括号外的元素
CSS中：
.box1 {
    color:red
}
.box1:hover {
    color:blue;
}

less中:
.box1 {
    color:red;

    &:hover {
        color:blue;
    }
}


// 选择器 样式扩展 

方式一：
:extend()
    - 对当前选择器扩展指定样式
    - 通过选择器来选择 指定选择器内部的样式
    - 语法：
        当前选择器:extend(继承选择器字符串不单可以是一个选择器 还可以是子元素选择器等等) {}

        CSS中：
        .p1 {
            width:100px;
            height:100px;
        }
        .p2 {
            width:100px;
            height:100px;
        }
        这时候我们可以用分组选择器吧
        p1, p2 {
            width:100px;
            height:100px;
        }
        当p2 还需要写不同的样式时怎么办？
        p1, p2 {
            width:100px;
            height:100px;
        }
        p2 {
            color:red;
        }

        less中 可以这么解决：
        p1 {
            width:100px;
            height:100px;
        }

        p2:extend(.p1) {        //扩展p2选择器的样式，并继承p1的样式
            color:red;  
        }

方式二：
    - 混合函数
    - 通过复制来选择指定选择器的样式

p1 {
    width:100px;
    height:100px;
}

// p3要扩展样式
.p3 {
    // 直接对指定的样式进行引用 就相当于把p1的样式在这里进行复制
    .p1();
}


// 还有一种更常见的用法 创建混合函数给别人用 这也是less里特别重要的特性
// 创建一个mixin 也就是混合函数
.p4(){
    width:100px;
    height:100px;
    background-color:red;
}

// 在p5里调用
.p5 {
    .p4();
}




二， 变量的创建和使用 变量生效值的原则

    - 在变量中可以存储任意的一个值 并且我们可以在需要的时候，任意的修改变量中的值
    - 变量的原则：
        就近原则，谁越靠下 谁就生效

    - 语法：
        创建变量
        @变量名: 值 值可以是任意类型

    - 使用变量：
        如果是直接使用 以@开头 @a
        如果是作为类名，或者一部分值使用时 必须以 @{变量名}的形式使用

    - eg：
        @a:100px;
        @b:red;
            - eg：
                .box1 {
                    width:@a;
                    background-color:@b;
                }

        @c:box5;
            // 变量值可以是任意内容，可以是一个类名
            - 作为 类名 使用时 要把变量用{}括起来
            - eg：
                .@{c} {
                    width:@a;
                }


三，引用变量
    - 有些时候我们需要一个值 引用上面的值 这样两个值可以一起更改
    - 语法
        引用哪个值的前面加上$，然后作为值来使用
        $width
    - eg：
        .box {
            width:100px;
            height: $width;
        }


四， 混合函数
    - 在混合函数中可以设置形参
            这样可以根据我们的实际需求去设置盒子的大小
    - eg：
        之前的用法：
        // 创建混合函数
        .p1(){
            width:100px;
            height:100px;
        }
        // p2中引用p1
        .p2 {
            // 这是p1中的样式
            .p1();

            // 下面的是新样式
            color:red;
        }

        还可以在混合函数中传递形参  形参中还可以传递默认值 这样的好处就是 在写实参的时候 有些值可以不写 就代表使用默认值
        .p1(@w, @h){            .p1(@w:100px, @h:200px){
            width:@w;
            height:@h;
        }

        // div引用创建好的混合函数p1
        div {
            // 调用混合函数p1 按顺序传递值
            .p1(200px, 100px);     这时候来赋值给形参

            // 不按顺序时 可以指定变量名 和 变量值
            .p1(@w:100px, @h:100px);
        }


五， 取两个颜色中的平均值
average();

span {
    color:average(red, yellow);         //文字颜色或者红色和黄色的中间值
}


六， 颜色加深
- darken();

需求：当鼠标移动到div上时 比之前的颜色加深指定数值
html {
    width:100%;
    height:100%;
}

body {
    width：100%；
    height:100%;
    background-color:#bfa;
}

body:hover {
    // 想比bfa加深10%
    background-color:darken(#bfa, 10%)           //如果不起作用的话 给html指定个高度和宽度就好了
}


七， less中最强大的功能
- 在less中所有的数值都可以直接运算

.box1 {
    width:100px + 100px;
    height:100px;
}


less模块化处理：
八， 引入 在less中引入外部别的文件
@import:'css/.less'

优点是可以对less文件做一个模块化的处理
比如：
    我可以创建4个less文件
    第一个负责：定义变量
    第二个负责：定义动画效果
    第三个负责：定义布局相关的东西
    第四个负责：对它们的整合

这样方便我们的维护哪个出问题了 去哪个里面找就可以了


九，配置css 和 less 之间的映射
- 正常我们代码出错后 在网页中能看到第几行出现的问题 但是这个行数指的是css文件中的行数
        由于我们的代码是在less编写的 这样我们就需要知道css中的44行 是 less中的多少行
    所以我们需要一个映射关系

- 配置vs code里的插件
{
  "less.compile": {
    "compress": true, // true => remove surplus whitespace
    "sourceMap": true, // true => generate source maps (.css.map files)
    "out": false // false => DON'T output .css files (overridable per-file, see below)
  }
}
设置 -- 扩展 -- less --  

--------------------------------------