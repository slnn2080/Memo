### jQ技巧总结:

### this的相关总结:

- 用到this就要知道 有两种情况
- 一种是jQ对象 它能调用的是jQ对象的方法
- 一种是DOM元素对象 它能调用的是DOM元素的方法

> 事件回调函数中this 回调函数中的this为DOM元素 
<!-- 
    $('xxx').on('keyup focus', function(){
        let txt = this.value.trim();        // dom对象
        if(txt){
            $('#search_helper').show();
        }
    })
 -->


### 绑定多个监听
- 方法一：
<!-- 
    $('#txtSearch').focus(function(){代码部分一样}).keyup(function(){代码部分一样});
 -->
    
- 方法二：
<!-- 
    $('#txtSearch')
    .on('keyup focus', function(){
        
    })
    .blur(function(){
        
    });
 -->
 

### 再找jQ对象时，根据父元素找 找的速度最快


### 对象状态变化只有两种情况的时候
- 在点击的时候 有两种情况，那我们就可以在外部创建一个变量来保存当前的状态
然后根据当前的状态去写if语句，最后更新变量
<!-- 
    isOpen = false

    //去关闭  虽然现在是false if里是true代表是的打开状态 所以去关闭
    if(isOpen){         
        // 写在里面的话  isOpen = false
        $shareMore.css('width', 155);
        $as.hide();
        $b.removeClass('backWord');

    //去打开
    }else{              
        // isOpen = true;
        $shareMore.css('width', 200);
        $as.show();
        $b.addClass('backWord');
    }
            
    // 最后改变isOpen的状态 写在外面就这么写 
    isOpen = !isOpen

 -->

----------------------------

### jQuery
- jQ一个优秀的JS函数库 write less do more
- 封装简化DOM操作（CRUD增删改查） / AJAX（用户名 失去焦点时）

- 特点：
- 强大的选择器
<!-- 方便快速查找DOM元素 -->

- 隐式遍历
<!-- 一次操作多个元素    省略的for循环 -->

- 读写合一
<!-- 
    读写数据用的是一个方法，同样一个方法比如html 通过jQ对象来调用
    那jQ对象里面包含了多个元素，读的话是读 第一个 写的话 是 所有
 -->

- 事件处理
- 链式调用
<!-- 
    通过 . 不断调用jQuery对象方法 为什么可以不断的调用是因为 
    除了获取数据的方法，剩下的方法内部返回的都是return this this是jQ对象
    因为调用方法的对象是jQ对象
-->
                       
- DOM操作（CUD增删改）
- 样式操作
- 动画
- 浏览器兼容 不用太管

> 使用步骤
- 引入jQ库，分为本地引入 和 CDN远程引入
- 版本： 测试版 和 生产版（压缩的版本）

- 使用jQ核心函数    $ / jQuery
- 使用jQ对象 假设jQ对象是： $xxx 那$xxx是通过$()得到的

> jQ主要包括：
- 1. 使用jQ核心函数： $ / jQuery
- 2. 使用jQ核心对象：执行$()函数后 返回的对象


### jQ入口函数
- jQ的入口函数有两种写法:
- 等着DOM结构渲染完毕即可执行内部代码, 不必等到所有外部资源加载完成, 
- 相当于原生js的 DOMContentLoaded
<!-- 
    不同于原生js中的load事件
    原生jsload事件是等页面文档, 外部的js文件, css文件, 图片加载完毕才执行内部的代码
 -->

> $(function() {...});

> $(document).ready(function() {...})
<!-- 
    记忆方式:
    等着文档(document)加载(ready)好了
 -->


### 原生JS的入口函数 和 jQ入口函数的区别
- 区别:
- 原生JS会等到DOM元素加载完毕，并且图片也加载完毕才会执行
- jQ会等到DOM元素加载完毕，但不会等到图片也家加载完毕就会执行
<!-- 
    尤其对于图片区别比较大 也就是在jQ回调函数里面 取图片的宽度不合适
    因为有可能取不到 
-->
                                
- 原生JS如果编写了多个入口函数，后面编写的会覆盖前面编写的
- jQ中编写多个入口函数，后面的不会覆盖前面的

----------------------------

### jQuery的顶级对象 $
- $ 是 jQuery的别称, 在代码中可以使用jQuery代替$, 但是为了方便一般我们都直接使用$
<!-- 
    $(function() {})

    jQuery(function() {})
 -->

- $是jQuery的顶级对象, 相当于原生js中的window, 把元素利用$包装成jQuery对象, 就可以调用jQuery的方法


> $(param), 参数可以是什么
- 把$当函数调用里面的参数: $(param)

    - param 是 function ：
                给相当于window.onload = function(){}

    - param 是 选择字符串：
                查找所有匹配的DOM元素，返回的是 包含所有DOM元素的jQ对象

    - param 是 标签字符串：
                创建标签DOM元素对象 并 包装成jQ对象返回

    - param 是 DOM元素：
        将DOM元素对象包装为jQ对象返回
        <!-- 
            我们会经常使用$(this)，尤其是在事件回调函数中 
            this的类型是DOM元素 因为事件发生事件的回调函数是DOM元素
        -->
            

- 把$当对象用： $.xxx()  
- 可以使用$中的一些方法
<!-- 
    $.each(obj/arr, function(attrname/index, value){});
    $.trim(str);
 -->


> jQ对象的特性：
- 包含所有匹配的n个DOM元素的伪数组对象
<!-- 怎么得到 上述的伪数组对象（jQ对象） 执行$()返回的就是jQ对象 -->

- 可以得到dom元素的个数
- length / size(): 

- [index]
<!-- 得到指定下标对应的DOM元素 -->

- each(function(index, domEle){ })：
<!-- 遍历所有DOM元素（内部包含的DOM元素） -->

- 得到当前DOM元素在所有兄弟中的下标
- index():        
<!-- 
    一般在求这个index的时候 我的jQ对象里只包含了一个DOM元素 因为它求的是当前DOM元素在兄弟元素中的下标

    或者说即使有多个它也只取第一个，因为最终我只能返回一个结果
-->
                    

> $的特性
- 直接可见，引用后就能使用
<!-- console.log($, typeof $);   //$是一个函数 -->
       
----------------------------

### jQuery对象 和 DOM对象
- DOM对象
- 用原生js获取过来的对象就是DOM对象

- jQuery对象
- 用jQuery方式获取过来的对象就是jQuery对象

- jQuery对象的本质是: 利用$对DOM对象包装后产生的对象
<!-- 伪数组形式存储 -->

- jQuery对象只能使用jQuery方法, DOM对象则使用原生js的属性和方法

----------------------------

### DOM对象 与 jQuery对象的转换
- 因为原生js比jQ更大, 原生的一些属性和方法jQuery没有给我们封装(jQ只封装了想用的功能), 要想使用这些属性和方法需要把jQ对象转换为DOM对象才能使用
<!-- 
    比如视频的播放功能, play()
    这个功能只有原生才有 jQ没有 但是jQ获取元素更加的方便, 所以我们可以用jQ获取元素, 然后转换为DOM元素, 再使用play()的功能
 -->
 
> DOM对象转换为jQ对象
- 先获取div元素
<!-- 
    let div = document.querySelector('div');
 -->

- 再用$()包装, 使用的是上面的div变量 不用加引号了
<!-- 
    $(div)
 -->


> jQ对象转换为DOM对象
- 两种方式
- $('div')[index]       -- index是索引号
- $('div').get(index)
<!-- 
    $('video')[0].play();
    $('video').get(0).play();
 -->

----------------------------

### jQuery隐式迭代
- 遍历内部DOM元素(伪数组形式存储)的过程就叫做隐式迭代
- 简单的理解, 给匹配到的所有元素进行循环遍历, 执行响应的方法, 而不用我们再循环, 简化我们的操作, 方便我们的调用

----------------------------

### jQ常用的API

### $ 工具的方法

> $.each()     遍历数组或对象中的数据
- 参数：
    1， 要遍历的对象
    2， 回调函数 函数中有两个参数 分别是 属性名 和 属性值

> $.trim()     去除字符串两端的空格

> $.type(obj)  得到数据的类型
<!-- 
    //我们看看 $ 的数据类型  function
    console.log($.type($));  
 -->
 
> $.isArray(obj)       判断是否是数组
<!--    
    // 我们看看$('body') 是不是一个数组 返回的是jQ对象 是一个伪数组
    console.log($.isArray($('body'))); 
-->

> $.isFunction(obj)    判断是否是函数


> $.parseJSON(json)    解析json字符串转换成js对象/数据
- json是有特定格式 特定语法规则的字符串 它是用来存储数据的 比如 我们存一个人
- 它就有两种结构 外层是 {对象} [数组] 
<!-- 
    // json对象, json对象不是js对象 只是可以将json对象 转换为 js对象
    let json = '{"name":"Tom", "age":12}'
    console.log($.parseJSON(json));
 -->
   
> 一般我们用
JSON.parse(jsonstring);         json字符串 -> js对象/数组
JSON.stringify(jsObj/jsArr);    js对象/数组 -> json字符串



### jQuery选择器
- 原生js获取元素方式很多, 很杂, 而且兼容性情况不一致, 因此jQ给我们做了封装, 使得获取元素的统一标准

> $('选择器字符串')
- 获取元素的方式 里面选择器直接写css选择器 记得加引号
- 常用的选择器补充
<!-- 
    并集选择器: $('div, p, li')
    交集选择器: $('li.current')
 -->

----------------------------

### jQuery选择器 筛选 过滤 查找的区别
> 筛选
- 在已经获取的元素中, 根据规则筛选出一批

> 过滤
- 在当前jQ对象中包含的所有元素中 找出部分元素出来
<!-- 
    返回的是 DOM元素 可以再次封装成jQ对象返回

    比如我有一堆li 现在要找其中的某一个 这就属于过滤的行为
    所谓的过滤也就是对jQ对象内部包含的DOM元素 再次进行 过滤
    过滤之后返回的还是一个jQ对象 一个新的对象 也就是说我对 对象1 进行过滤后 产生的 对象2
 -->

> 查找
- 在jQ对象内部元素的子孙 兄弟 父母元素，再讲他们封装成新的jQ对象返回
<!-- 在已经匹配出的元素集合中根据选择器查找孩子/父母/兄弟标签 -->

----------------------------

### jQuery 筛选选择器
- $(选择器字符串:关键字)


> :first
- 获取jQ对象中第一个DOM元素
<!-- 
    $('li:first')   获取第一个li元素
 -->


> :last
- 获取jQ对象中最后一个DOM元素
<!-- 
    $('li:last')   获取第一个li元素
 -->


> :eq(index)
- 索引号从0开始, 获取jQ对象中的指定index的DOM元素
<!-- 
    $('li:eq(2)')   获取第一个li元素
 -->


> :odd
- 选择索引号为奇数的元素
<!-- 
    $('li:odd')   获取第一个li元素
 -->


> :even
- 选择索引号为偶数的元素
<!-- 
    $('li:even')   获取第一个li元素
 -->


> :not(selector)
- 匹配除了指定元素外 其他元素
<!-- 
    $('li:not(selector))   获取第一个li元素
 -->

> :lt 和 :gt
- :lt 匹配小于 给定索引 的元素
- :gt 匹配大于 给定索引 的元素
<!-- 
    $('tr:gt(2)') 
    
    小于3 大于0
    $('li:lt(3):gt(0)').css('backgroundColor', 'red');
-->


> :hidden
> :visible
- 匹配隐藏 与 显示的元素

> :contains(text)
- text：一个用以查找的字符串
<!-- 
    查找所有包含 "John" 的 div 元素
    $("div:contains('John')")
 -->


> [attrName]
[attrName = value]
- 根据属性名 和 属性值 匹配元素

----------------------------

### 表单选择器
- 直接只用即可
> :input
- 查找所有的input元素 包括 input, textarea, select 和 button

> :text
- 匹配所有的单行文本框

> :password
- 匹配所有密码框

> :radio
- 匹配所有单选按钮

> :checkbox
- 匹配所有复选框

> :submit
- 匹配所有提交按钮
<!-- button平时也要使用type属性 要不也会被匹配到 -->

> :reset
- 匹配所有重置按钮

> :button
- 匹配所有按钮

> :enabled
- 匹配所有可用元素
<!-- $("input:enabled") -->

> :disabled
- 匹配所有不可用元素
<!-- $("input:disabled") -->

> :checked
- 匹配所有 被选中元素(复选框、单选框等，select中的option)
<!-- $("input:checked") -->

> :selected
- 对于select元素来说，获取选中推荐使用 :selected
<!-- $("select option:selected")   匹配所有选中的option元素 -->

----------------------------

### jQuery 过滤的方法
> jQ对象.first()
- 筛选jQ对象从而获取第一个元素


> jQ对象.last()
- 筛选jQ对象从而获取最后一个元素


> jQ对象.eq(index|-index)
- 筛选jQ对象从而获取jQ对象中第N个jQ对象
- index为正值 从0起代表第一个，index为负值，从后往前 -1代表第一个
- 返回的是jQ对象
- 类似的有get(index),不过get(index)返回的是DOM对象。


> jQ对象.filter();
- 筛选出与指定表达式匹配的元素集合
- 参数的类型为字符串，传 选择器的表达式
<!-- 
    $("p").filter(".selected, :first") 

    filter('类似过滤选择器')        跟选择器    匹配的
    选择器是对当前包含的元素提要求
-->


> jQ对象.not('选择器字符串' | dom元素);
- 筛选出除了指定元素外的 其余元素
<!-- 
    not('选择器')                  跟选择器 不 匹配的       
    选择器是对当前包含的元素提要求
 -->


> jQ对象.has('选择器字符串' | dom元素);
- 筛选jQ对象，选择符合has()括号中的元素
<!-- 
    has('选择器')                  过滤有某一个子元素的     
    选择器是对当前元素子孙元素提要求 
 -->

----------------------------

### jQuery 查找的方法
- 在已经匹配出的元素集合中根据选择器查找孩子/父母/兄弟标签

> jQ对象.children(selector);
- 查找jQ对象的所有子元素
<!-- 
    jQ对象.children()
 -->
- 可查找指定的子元素
<!-- 
    jQ对象.children(selector)

    $(this).children('ul').show();
    显示当前元素的指定子元素ul
 -->


> jQ对象.find(selector)
- 查找jQ对象的后代元素, 查找后代的用它
- 可以选里面所有的孩子, 包括儿子 孙子
- 不写参数的话  就是找全部
<!-- 
    $('ul').find(li);
    找ul的后代元素li
 -->


> jQ对象.parent(selector);
- 查找jQ对象的父元素, 最近一级的父级元素 亲爸爸
<!-- 
    $('li').parent();
 -->


> jQ对象.parents(selector);
- 找到该元素的所有父级元素
- jQ对象.parents()

- 找到指定父级元素
- jQ对象.parents('one')

<!-- 
    | - one
        | - two
            | - three
                | - four
 -->


> jQ对象.closest()
- 从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素, closest会首先检查当前元素是否匹配，如果匹配则直接返回元素本身,如果不匹配则向上查找父元素，一层一层往上，直到找到匹配选择器的元素

> closest 和 parents 的主要区别是：
- 1. 前者从当前元素开始匹配寻找，后者从父元素开始匹配寻找；
- 2. 前者逐级向上查找，直到发现匹配的元素后就停止了，后者一直向上查找直到根元素，然后把这些元素放进一个临时集合中，再用给定的选择器表达式去过滤；
- 3. 前者返回0或1个元素，后者可能包含0个，1个，或者多个元素
<!-- 
    closest对于处理事件委托非常有用。
 -->


> jQ对象.prevAll([expr]);
- 查找当前jQ对象 之前 的 同辈元素
<!-- 
    $('.last').prevAll()

    $('div:last').prevAll().addClass('xxx');
 -->


> jQ对象.nextAll([expr]);
- 查找当前jQ对象 之后 的 同辈元素
<!-- 
    $('.first').nextAll()
 -->


> jQ对象.siblings(selector)
c-查找jQ对象的 同辈元素(兄弟元素) 不包括本身
<!-- 
    $('.first').siblings('li');
 -->


> jQ对象.hasClass(class);
- 检查当前的元素是否含有某个特定的类, 如果有 则返回true


> jQ对象.eq(index)
- 相当于$('li:eq(2)'), index从0开始

----------------------------

### jQuery的排他思想
- 想要多选一的小姑, 排他思想, 当前元素设置样式 其余的兄弟元素清除样式

    $(function() {
        $('button').click(function() {
            $(this).css('background', 'pink');

            // siblings是除了本身其它的兄弟
            $(this).siblings('button').css('background', '');
        })
    })

----------------------------

### 案例 经过一个button 右侧显示对象图片
> 结构:
- ul li 里面装button

> 图片部分
    | - div外层容器
        | - div包括链接的容器
            | - a链接
        | - div包括链接的容器
            | - a链接

> 核心原理
- 鼠标经过左侧盒子某个li 就让内部区盒子对应的图片显示 其余的隐藏
- 需要得到当前li的索引号, 就可以显示对应索引号的图片
- jQuery得到前档元素索引号

- $(this).index()

- 中间对应的图片, 可以通过eq(index)方法去选择

<!--    
    $('#left li').mouseover(function() {
        let index = $(this).index();
        $('#content div').eq(index).show();
        $('#content div').eq(index).siblingsi().hide();
    })
 -->

----------------------------

### jQuery 样式操作
- jQuery可以使用css方法来修改简单的元素样式, 当样式比较多的时候可以操作类, 修改多个样式

> jQ对象.css()

> $(this).css('color')
- 读取
- 返回的是带有单位的字符串


> $(this).css('color', 'red')
- 设置
- 参数是属性名, 属性值, 逗号分隔
- 设置一组样式的时候, 属性必须加引号, 值如果是数字可以不用跟单位和引号
<!-- 
    $(this).css('width', '300px')
 -->

- 参数可以是对象形式, 方便设置多组样式, 属性名和属性值用冒号隔开, 属性可以不用加引号
<!-- 
    $(this).css({
        width:'200px',
        height:200,
        backgroundColor:'red'
    })
 -->


> 通过设置类的方式 操作样式
- 作用等同于以前的classList 可以操作类的样式, 注意操作类里面的参数不要加点

> jQ对象.addClass('selected1' 'selected2');
- 要添加多个类名时 请用空格 隔开

> jQ对象.removeClass('类名');
- 删除匹配元素的所有类
<!-- $("p").removeClass(); -->

- 从匹配的元素中删除 'selected' 类
<!-- $("p").removeClass("selected"); -->

> jQ对象.toggleClass('类名');

----------------------------

### jQuery 效果

### 显示与隐藏
> show([speed, [easing], [fn]]):   
> hide([speed, [easing], [fn]]): 
> toggle():
- 显示隐藏，默认没有动画
- 带动画的话 是通过改变 宽 高 透明度 从左上角开始变化
- 参数可以省略, 代表没有动画直接显示

- 一般情况下我们不加参数直接显示隐藏就可以了 有点丑 
<!-- 
    $('div').hide(1000)
 -->

------

### 淡入淡出
> jQ对象.fadeIn()
> jQ对象.fadeOut()
- 通过不透明度的变化来实现所有匹配元素的淡入效果，并在动画完成后可选地触发一个回调函数。
- 这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。
- 参数：
- 1. [speed]
- "slow", "normal",  or  "fast" 或者 600 400 200 1000

- 2. [easing]
- swing(默认) | linear  变化的速率是匀速的还是变速的

- 3. [fn]  
- 回调函数是在动画完成时执行的函数，每个元素执行一次、有的时候动画完成后会做一些事情 可以在回调函数中完成 

- 4. 不传参数
<!-- 
    用600毫秒缓慢的将段落淡入
    $("p").fadeIn("slow");

    用200毫秒快速将段落淡入，之后弹出一个对话框
    ("p").fadeIn("fast",function(){
        alert("Animation Done.");
    });
 -->


> fadeToggle()
- 开关 淡出 淡入效果  如果是隐藏就慢慢显示出来 如果是现实的状态就慢慢消失
- 通过不透明度的变化来开关所有匹配元素的淡入和淡出效果， 并在动画完成后可选地触发一个回调函数。
- 参数：
- 1. speed        "slow", "normal",  or  "fast" 或者 600 400 200 1000
- 2. [easing]     swing(默认) | linear
- 3. [fn]         在动画完成时执行的函数，每个元素执行一次。


> jQ对象.fadeTo()
- 淡入到指定透明度
- 把所有匹配元素的不透明度以渐进方式调整到指定的不透明度 并在动画完成后可选地触发一个回调函数。
- 参数：
- 1. [speed]      "slow", "normal",  or  "fast" 或者 600 400 200 1000
- 2. [easing]     swing(默认) | linear
- 3. [fn]         在动画完成时执行的函数，每个元素执行一次。
- 4. opacity      一个0至1之间表示透明度的数字。
<!-- 
    用600毫秒缓慢的将段落的透明度调整到0.66，大约2/3的可见度 
    $("p").fadeTo("slow", 0.66);
-->
        
------

### 滑动
> jQ对象.slideDown()
> jQ对象.slideUp()
- 展开, 合上
- 通过高度变化（向下增大）来动态地显示所有匹配的元素， 在显示完成后可选地触发一个回调函数
- 这个动画效果只调整元素的高度，可以使匹配的元素以“滑动”的方式显示出来。

- 参数：
- speed
- fn
- easing  swing(默认)   linear
<!-- 
    以滑动方式显示隐藏的 <p> 元素：
    $(".btn2").click(function(){
        $("p").slideDown();
    });
 -->
  
> jQ对象.slideToggle()
- 切换 展开 收缩
- 通过高度变化来切换所有匹配元素的可见性，并在切换完成后可选地触发一个回调函数。

------

### 自定义动画的函数
> animate(params,[speed],[easing],[fn])
- 属性名必须用骆驼形式，比如用marginLeft代替margin-left.
- 每个属性的值表示这个样式属性到多少时动画结束。
<!-- 
    如果是一个数值，样式属性就会从当前的值渐变到指定的值。 

    如果使用的是“hide”、“show”或“toggle”这样的字符串值，则会为该属性调用默认的动画形式。
-->
        
- 参数：
- params:
- 想要更改的样式属性, 以对象形式传递, 必须写, 属性名可以不带引号, 如果是复合属性则需要采用驼峰命名法 borderLeft 其余参数可以省略

- 一组参数要用{}括起来，用来装动画结束时的样式
    {
        属性名:'值'；   //数字不用括号
    }

- 传递时长，使用slow时 要用''括起来
<!-- 
    <button id="go"> Run</button>
    <div id="block">Hello!</div>

    在一个动画中同时应用三种类型的效果
    $("#go").click(function(){
        $("#block").animate({ 
            width: "90%",
            height: "100%", 
            fontSize: "10em", 
            borderWidth: 10
        }, 1000 );
    });
 -->  

> 注意：
- 所有用于动画的属性必须是数字的，除非另有说明；这些属性如果不是数字的将不能使用基本的jQuery功能。
<!-- 
    比如常见的，border、margin、padding、width、height、font、left、top、right、bottom、wordSpacing 等等这些都是能产生动画效果的。

    background-color很明显不可以，因为参数是red或者GBG这样的值，非常用插件，否则正常情况下是不能只用动画效果的。
 -->


> delay(duration,[queueName])
- 延时来推迟执行队列中之后的项目
<!-- 
    $('#foo').slideUp(300).delay(800).fadeIn(400);
    推迟800毫秒后 进行淡入效果
 -->
        

>jQuery动画本质 : 
- 在指定时间内不断改变元素样式值来实现的

----------------------------

### 动画队列 及其停止排队的方法
> 动画或效果队列
- 动画或效果一旦触发就会执行, 如果多次触发, 就造成多个动画或者效果排队执行

> stop([clearQueue],[jumpToEnd])
- 停止动画或效果
- 不传参数立即停止动画
- 停止所有在指定元素上正在运行的动画。

- 注意
- stop() 写到动画或者效果的前面, 相当于停止结束上一次的动画
<!-- 
    如果队列中有等待执行的动画(并且clearQueue没有设为true)，他们将被马上执行
 -->
            
- 参数：
- clearQueue: 
<!-- 
    true /false 如果设置成true，则清空队列。可以立即结束动画。
-->

- gotoEnd: 
<!-- 
    true /false 让当前正在执行的动画立即完成，并且重设show和hide的原始样式，调用回调函数等。 
-->

- queue:          用来停止动画的队列名称
- clearQueue:     true /false 如果设置成true，则清空队列。可以立即结束动画。
- jumpToEnd:      true /false 如果设置成true，则完成队列。可以立即完成动画。

<!-- 
    停止当前正在运行的动画：
    $("#stop").click(function(){
        $("#box").stop();
    });

    // 开始动画
    $("#go").click(function(){
        $(".block").animate({left: '+200px'}, 5000);
    });

    // 当点击按钮后停止动画
    $("#stop").click(function(){
        $(".block").stop();
    });
 -->
----------------------------

### 案例 手风琴效果
> 页面结构
 | - 外成最大容器包裹
    | - ul
        | - li
            | - 因为有点击效果 用a包裹
                | - 有一张小的图片 small
                | - 有一张大的图片 big

- small图片是定位在大图片的上面
- 正常效果小只能看到小图片, 大图片display:none

- css部分
<!-- 
    .king li.current {
        width:224px;
    }
    .king li.current .big {
        display:block
    }
    .king li.current .small {
        display:none
    }
 -->

- 正常li的宽度只有69px, 保证正常状态小只能看到小图片那么宽
- 第一个li的宽度是224 显示大图片

- 分析:
- 鼠标经过某个小li有两部操作
- 当前小li宽度为224px, 同时里面的小图片淡出, 大图片淡入
- 其余兄弟小li宽度变为69px, 小图片淡入, 大图片淡出

<!-- 
    // 动画前面加stop()
    $('.king li').mouseenter(function() {
        $(this).stop().animate({
            width:224
        }, 200).find('.small').stop().fadeOut().siblings('.big').stop().fadeIn();

        $(this).siblings('li').stop().animate({
            width:69
        }).find('.small').stop().fadeIn().siblings('.big').stop().fadeOut();
    })
 -->

----------------------------

### jQuery 属性操作 

> jQ对象.prop()
- 设置或获取元素固有属性值
- 所谓元素固有属性就是元素本身自带的属性, 比如<a>元素里面的href <input>的type

- 获取属性语法:
- jQ对象.prop('属性名')

- 设置属性语法:
- jQ对象.prop('属性名', '属性值')

<!-- 
    选中复选框为true，没选中为false
    $("input[type='checkbox']").prop("checked");

    禁用和选中所有页面上的复选框。
    $("input[type='checkbox']").prop("disabled", true);
    $("input[type='checkbox']").prop("checked", true);
 -->
        

> jQ对象.attr()
- 设置或获取元素自定义属性值
- 读取或者修改被选中元素的属性值
- 返回的是字符串

- 获取属性语法:
- jQ对象.attr('src');

- 设置jQ对象的属性值：
- jQ对象.attr('src', 'test.jpg');

- 设置jQ对象的多个属性值：
- jQ对象.attr({src:'test.jgp', alt:'test image'});


> jQ对象.removeAttr()
- 删除对应元素的属性
<!-- 
    将文档中图像的src属性删除
    jQ对象.removeAttr('src');
 -->


> 总结:
attr(): 专门操作属性值为非布尔值的属性
prop(): 专门操作属性值为布尔值


> jQ对象.data()   -- 数据缓存 
- data()方法可以在指定的元素上存取数据, 并不会修改DOM元素的结构, 一旦刷新页面, 之前存放的数据将被移除

- 设置属性语法:
- $('span').data('uname', 'andy');    

- 读取属性语法:
- $('span').data('uname');    
<!-- 
    把我们的元素当做一个变量来看, 把数据存到元素的内存里面去

    在span身上添加了uname=andy, 使用data()我们在DOM结构上是看不见的
    $('span').data('uname', 'andy');    
-->

- 同时, 还可以读取HTML5自定义属性, data-index, 返回的属性值是数字型
- 获取data-index属性时, 不用加 data-
<!-- 
    <span data-index='2'></span>
    $('span').data('index')
 -->

----------------------------

### 获取文本的API
> jQ对象.html();
- 读取对象内部内容：
- 取得第一个匹配元素的html内容 .html() 方法来获取任意一个元素的内容。
<!-- 
    如果选择器匹配多于一个的元素，那么只有第一个匹配元素的 HTML 内容会被获取。
 -->
- 读取:
- $('p').html();

- 设置:
- $("p").html("Hello <b>world</b>!");
<!-- 设置的话会设置所有p的内容 -->


> jQ对象.text();
- 取得所有匹配元素的内容
<!-- 
    结果是由所有匹配元素包含的文本内容组合起来的文本。这个方法对HTML和XML文档都有效
 -->
- 读取:
- $('p').text();

- 设置:
- $("p").text("Hello world!");


> jQ对象.val();
- 获得匹配元素的当前值。如果多选，将返回一个数组，其包含所选的值。

- 读取:
- $("input").val()

- 设置:
- $("input").val("hello world!");

----------------------------

### jQuery 元素操作
- 主要是遍历, 创建, 添加, 删除元素操作

### 遍历元素
- jQ隐式迭代是对同一类元素做了同样的操作, 如果想要给同一类元素做不同的操作, 就要用到遍历

> jQ对象.each(function(index, item) { ... })
- $('div').each(function(index, item) {

})
- 这个方法遍历匹配的每一个元素, 主要用DOM处理
- 里面的回调函数有2个参数, index是每个元素的索引号, item是每个DOM元素对象(不是jQ对象)
<!-- 
    要是想使用jQ方法, 需要给这个dom元素转换为jQ对象$(item)
 -->

> $.each(object, function(index, item) { ... });
- 这个方法用于遍历任何对象, 主要用于数据处理, 比如数组, 对象
- 里面的函数有2个参数, index是每个元素的索引号, item遍历的内容

----------------------------

### 创建元素

> 创建元素
- 语法:
- $('<li></li>')


### 添加元素

> 内部添加(标签内部)

> jQ对象.append(content);
- 向jQ对象元素内部的最后插入指定内容
- 把内容放入匹配元素内部最后面, 类似原生appendChild
<!-- 
    向所有段落中追加一些HTML标记。
    <p>I would like to say: </p>

    $("p").append("<b>Hello</b>");

    结果：
    <p>I would like to say: <b>Hello</b></p>
 -->


> jQ对象.prepend(content);
- 向jQ对象元素内部的最前面插入指定内容
<!-- 
    向所有段落中前置一些HTML标记代码。
    <p>I would like to say: </p>
    $("p").prepend("<b>Hello</b>");

    结果：
    <p><b>Hello</b>I would like to say: </p> 
 -->


> 先创建内容的话 就用下面的两个方法:

> jQ对象(创建的内容).appendTo(jQ对象);
- 把内容添加到 jQ对象 的最后
<!-- 
    把所有段落追加到div的元素中。
    <p>I would like to say: </p>
    <div></div><div></div>

    $("p").appendTo("div");

    <div><p>I would like to say: </p></div>
    <div><p>I would like to say: </p></div>
 -->


> jQ对象(创建的内容).prependTo(jQ对象);
- 把内容添加到 jQ对象 的最前
<!-- 
    把所有段落追加到ID值为foo的元素中。
    <p>I would like to say: </p>
    <div id="foo"></div>

    $("p").prependTo("#foo");
    <div id="foo"><p>I would like to say: </p></div>
 -->


> 外部添加(标签外面)

> jQ对象.before(content);
- 在jQ对象的标签外部的前面添加内容
<!-- 
    在所有段落之前插入一些HTML标记代码。
    <p>I would like to say: </p>

    $("p").before("<b>Hello</b>");
    <b>Hello</b><p>I would like to say: </p>
 -->
 

> jQ对象.after(content);
- 在jQ对象的标签外部的后面添加内容
<!-- 
    在所有段落之后插入一些HTML标记代码。
    <p>I would like to say: </p>

    $("p").after("<b>Hello</b>");
    <p>I would like to say: </p><b>Hello</b>
 -->
  
> 注意:
- 内部添加元素, 生成之后, 他们是父子关系
- 外部添加元素, 生成之后, 他们是兄弟关系



### 删除元素

> jQ对象.empty()
- 删除匹配的元素集合中的所有子节点(里面孩子)
<!-- 
    把所有段落的子元素（包括文本节点）删除
    <p>Hello, <span>Person</span> <a href="#">and person</a></p>

    $("p").empty();

    <p></p>
 -->
 

> jQ对象.html('');
- 可以删除匹配的元素里面的子节点 孩子
- 和上面一样


> jQ对象.remove();
- 删除匹配的元素(本身) 自杀
- 这个方法不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。
<!-- 
    但除了这个元素本身得以保留之外，其他的比如绑定的事件，附加的数据等都会被移除。
-->
<!-- 
     <p>Hello</p> how are <p>you?</p>
    $("p").remove();

    how are
 -->

- remove(指定删除具体内容 再次筛选);
<!-- 
    从DOM中把带有hello类的段落删除
    <p class="hello">Hello</p> how are <p>you?</p>

    $("p").remove(".hello");
    how are <p>you?</p>
 -->


### 替换

> jQ对象.replaceWith(content);
- 将jQ对象里的元素替换成content(指定的HTML或DOM元素)。
<!-- 
    把所有的段落标记替换成加粗的标记。
    <p>Hello</p>
    <p>cruel</p>
    <p>World</p>

    $("p").replaceWith("<b>Paragraph. </b>");

    <b>Paragraph. </b>
    <b>Paragraph. </b>
    <b>Paragraph. </b>

 -->
        
- 用第一段替换第三段，你可以发现他是移动到目标位置来替换，而不是复制一份来替换。
<!-- 
    <div class="container">
        <div class="inner first">Hello</div>
        <div class="inner second">And</div>
        <div class="inner third">Goodbye</div>
    </div>

    $('.third').replaceWith($('.first'));

    <div class="container">
        <div class="inner second">And</div>
        <div class="inner first">Hello</div>
    </div>
 -->


> $(content).replaceAll(selector);
- 用jQ对象 替换掉 selector选择器字符串匹配的元素
<!-- 
    把所有的段落标记替换成加粗标记
    <p>Hello</p><p>cruel</p><p>World</p>

    $("<b>Paragraph. </b>").replaceAll("p");
    <b>Paragraph. </b><b>Paragraph. </b><b>Paragraph. </b>
 -->

----------------------------

### 事件相关的API

### jQuery 事件注册

> 单个注册事件
> element.事件名(function() { ... })
<!-- 
    $('div').click(function() { })
 -->


> 事件处理 on() 绑定事件
> element.on(事件名, [子元素选择器], fn)
- on()方法在匹配元素上绑定一个或多个事件的事件处理函数
- 参数
- 事件名:  
- 多个事件处理函数相同时, 事件名用 空格 隔开 'click mouseover'
<!-- toggle能起到一个事件不同结果的作用 -->

- 多个事件处理函数不同时, 在on() 中使用{ } 对象的形式 传入事件及对应的函数
<!-- 
    // 绑定多个事件 多个事件处理函数
    $('div').on({
        mouseenter: function() {
            $(this).css('background', 'pink');
        },
        click: function() {
            $(this).css('background', 'purple');
        },
    })

    // 如果多个事件的处理函数一样
    $('div').on('mouseover mouseout', function() {
        $(this).css('background', 'purple');
    })
 -->

- 子元素选择器: element的子元素选择器
<!-- 
    比如 
    给li绑定事件
    $('ul').on('click', 'li', function() {})
-->


> on() 方法的优势 --- 参数 子选择器的应用
- 可以实现事件委派的操作
<!-- 
    事件委派的定义就是, 把原来加给子元素身上的事件, 绑定在父元素身上, 就是把事件委派给父元素
-->
<!-- 
    <ul>
        <li></li>
        <li></li>
    </ul>

    以前我们是这样 通过隐式迭代的方式绑定相同的事件
    $('ul li').click(function() {   })

    给父元素ul绑定事件, 但是触发对象的是子元素li, 点击小li的动作会冒泡到父元素上, 父元素上有点击事件 所以可以执行
    $('ul').on('click', 'li', function() {   })
 -->
- 在此之间有bind(), live(), delegate() 等方法处理事件绑定或者事件委派, 最新版本的请用on代替他们


> on() 方法的优势 --- 可以给动态创建的元素绑定事件
- on可以给未来创建的元素绑定事件
<!-- 
    <ul>
        我是空的
    </ul>

    // 但是ul里没有li
    $('ul li').click(function() {
        alert(1)
    })

    let li = $('<li>我是后来创建的</li>')
    $('ul').append(li);

    // 上面的写法是.click的方式, 该方式不能动态的给li绑定事件, 因为在绑定事件的时候还没li

    用on就没问题
    $('ul').on('click', 'li', function() {  
        alert(1)
    })
 -->


> bind() 
- 可以给一个元素绑定多个事件
- 我们可以利用 e.type 区分发生了什么事件
```js 
$("div").bind("mouseover mouseout", (e) => {
    switch(e.type) {
        case "mouseover" :
            console.log("mouseover")
            break
        case "mouseout" :
            console.log("mouseout")
            break
    }
})
```

- 图片跟随鼠标移动的案例:
```js
$("#small").bind("mouseover mouseout mousemove", function (e) {
    switch (e.type) {
        case "mouseover":
            $("#showBig").show()
            break
        case "mouseout":
            $("#showBig").hide()
            break
        case "mousemove":
            $("#showBig").offset({
                // 这里加10的原因
                left: e.clientX + 10,
                top: e.clientY + 10
            })
            break
    }
})
```

- 如果不+10 当我们往右下移动的时候 鼠标会进入大的div的区域
- 一旦离开小div大图片就会隐藏 所以就造成了一闪一闪的状态(显示/隐藏 切换太快造成的)

- +10 是为了让鼠标移动的时候 始终和大图片保持一定的距离 防止进入大盒子里面造成一闪一闪的状态



> 表单(form对象).submit(function() { ... })
- 表单提交事件
- 这个submit()函数是在form表单点击submit按钮的时候默认可以触发的。

----------------------------

### 事件的解绑
> jQ对象.off(事件名);
- 这个方法可以移除通过on()方法添加的事件处理程序

<!-- 
    从所有段落中删除所有事件处理程序
    $("p").off()

    解除指定事件名的监听
    $("p").off('xxx')
 -->

> 解除事件委托
<!-- 
    $('ul').on('click', 'li', function() {})

    S('ul').off('click', 'li')
 -->

> one()方法绑定事件
- 只能触发一次
<!-- 
    $('p').one('click', function() {})
 -->

----------------------------

### 自动触发事件 trigger()
- 有些事件希望自动触发, 比如轮播图自动播放功能跟用手点击右侧按钮一致, 可以利用定时器自动触发右侧按钮点击事件, 不必鼠标点击触发

> 方式一: element.click()
<!-- 
    $('div').on('click', function() {
      alert(1);
    })

    // 自动调用上面div的点击事件 刷新页面后自动调用click事件
    $('div').click()
 -->

> 方式二: element.trigger('事件名')
<!-- 
    $('div').trigger('click')
 -->

> 方式三: element.triggerHandler('事件名')
- 该方法不会触发元素的默认行为
<!-- 比如文本框获得焦点后就有光标在闪烁 -->

----------------------------

### 事件
> hover(function() {}, function() {})
- 第一个回调是经过的函数
- 第二个回调是离开的函数
- 如果只写一个函数 鼠标经过和离开都会触发这个函数
<!-- 
    $('nav>li').hover(function() {
        $(this).children('ul').slideDown(200);
    }, function() {
        $(this).children('ul').slideUp(200);
    })

    // 还可以这样
    $('nav>li').hover(function() {
        $(this).children('ul').slideToggle(200);
    })
 -->

> jQ对象.mouseenter(fn);
- 鼠标进入（穿过）元素时，触发事件
- 当鼠标指针穿过元素时，会发生 mouseenter 事件。该事件大多数时候会与mouseleave 事件一起使用。
<!-- 
    与 mouseover 事件不同，mouseover 事件: 鼠标指针穿过任何子元素，同样会触发
 -->


> jQ对象.mouseleave(fn);
- 当鼠标指针离开元素时，会发生 mouseleave 事件。

----------------------------

### 事件的委托
- 对于新添加的内容没有点击响应函数，可以用事件委派来解决, 也就是说 将子元素的事件 交给 父元素代为处理

- 当父元素处理的时候知道不知道是哪个元素发生的 必须得知道 有event.target(事件发生的目标元素)

> 事件委托
- 将多个子元素(li)的事件监听委托给父辈元素(ul)处理
- 监听回调是加在了父辈元素上
- 当操作任何一个子元素(li)时, 事件会冒泡到父辈元素(ul)
- 父辈元素不会直接处理事件, 而是根据event.target得到 发生事件的子元素(li), 通过这个子元素调用事件回调函数
- 那回调函数中的this是发生事件的那个元素!

<!-- 
    事件委托的2方:
    * 委托方: 业主  li        业主有房子 委托给中介去处理
    * 被委托方: 中介  ul
 -->

> 使用方式
- jQuery 3.0中已弃用此方法，请用 on()代替。

> jQ对象（父元素）.delegate('选择器字符串' , '事件名', function(){ })
- 将 匹配 子元素的 什么事件 委托给 父元素
<!-- 
    当点击鼠标时，隐藏或显示 p 元素：
    <div style="background-color:red">
        <p>这是一个段落。</p>
        <button>请点击这里</button>
    </div>

    $("div").delegate("button","click",function(){
        $("p").slideToggle();
    });
 -->

> 移除事件委派
> $('ul').undelegate()
- 括号里 可以指定 移除什么事件 undelegate('click')
- 不传的话 就是移除全部

----------------------------

### 事件对象
> event.clientX, event.clientY
- 相对于视口的左上角（视口是固定的）

> event.pageX, event.pageY
- 相对于页面的左上角（页面会有滚动条 原点可能滚进去）

> event.offsetX, event.offsetY
- 相对于事件元素左上角

> event.stopPropagation()
- 停止事件冒泡

> event.preventDefault()
- 阻止事件默认行为
- return false

----------------------------

### jQuery位置
- 位置主要有三个: offset(), position(), scrollTop() / scrollLeft()

> offset()
- 设置或获取元素的偏移
- offset()方法设置或返回被选元素相对于文档的偏移坐标, 跟父级没有关系
<!-- 
    比如页面上一个盒子 我想知道它上边距离文档有多少 下面距离文档有多少
    原点是页面左上角
 -->

> jQ对象.offset([coordinates])
- 获取/设置元素的位置数据
- 返回的是一个对象 它包含两个整型属性：top 和 left，以像素计。
<!-- 此方法只对可见元素有效。 -->

- 设置的时候要传递一个对象进去
<!-- 
    获取第二段的偏移
    <p>Hello</p>
    <p>2nd Paragraph</p>

    var offset = $("p:last").offset();
    console.log(offset.left, offset.top);

    设置参数 传第一个对象进去
    $("p:last").offset({
        top: 10,
        left: 30
    });
 -->

 
> jQ对象.position()
- 这个方法用于返回被选元素相对于带有定位的父级偏移坐标, 如果父级没有定位, 则以文档为准

- 只能读取，原点为父元素的左上角
<!-- 
    获取第一段的偏移
    <p>Hello</p>
    <p>2nd Paragraph</p>

    var p = $("p:first");
    var position = p.position();

    $("p:last").html( "left: " + position.left + ", top: " + position.top )
    <p>Hello</p><p>left: 15, top: 15</p>
 -->


> 总结:
- position()    不能加参数 也就是说只能读取     相对于父元素左上角的坐标
- offset()      能加参数，也就是说可以设置参数  相对页面左上角的坐标

----------------------------------------

### jQuery滚动条的偏移

> jQ对象.scrollTop() / scrollLeft()
- 设置或获取元素被卷去的头部和左侧
- 获取匹配元素相对滚动条顶部的偏移。

- 读取
- jQ对象.scrollTop();
    
- 设置
- jQ对象.scrollTop(300);
<!-- 
    读取页面滚动条的Y坐标(兼容chrome和IE)
    $(document.body).scrollTop()+$(document.documentElement).scrollTop()

    设置滚动到指定位置(兼容chrome和IE)
    $('body,html').scrollTop(60);
 -->

> 小案例返回顶部
<!-- 
    // 给窗口绑定滚动事件
    $(window).scroll(function() {
        // 我们看看文档被卷去了多少
        console.log($(document).scrollTop())
    })
 -->

<!-- 
    let boxTop = $('.container').offset().top;
    $(window).scroll(function() {
        if($(document).scrollTop() >= boxTop) {
            $('.back').fadeIn();
        } else {
            $('.back').fadeOut();
        }
    }) 

     $('.back').click(function() {
         // animate动画函数里面有个scrollTop属性, 可以设置位置
         // 但是animate只是让元素做动画, 所以不能使用$(document), 因此我们用$('body,html').animate({
             scrollTop:0
         })
         
         
         $('body,html').stop().animate({
             scrollTop:0
         })
     })
 -->

----------------------------------------

### jQuery尺寸
- 不包括单位
- 设置width等 也不用带上单位
- 当参数为空 则获取响应值, 返回的是数字型, 如果参数为数字 则是修改响应值, 参数可不不写单位


> jQ对象.width() / height()
- 获取jQ对象 内容区的 宽度 和 高度
- 取得匹配元素宽度和高度值, 只算width / height

- 参数为空读取, 设置参数为设置


> jQ对象.innerWidth() / jQ对象.innerHeight();
- 获取jQ对象 内容区 + 内边距的 宽度 和 高度


> jQ对象.outerWidth() / jQ对象.outerHeight();
- 获取jQ对象 内容区 + 内边距 + 边框的 宽度 和 高度
- 参数：
内部可以传递 true 和 false
传递true 则 加上 margin 的值

<!-- 
    div {
        width: 100px;
        height: 150px;
        background: red;
        padding: 10px;
        border: 10px #fbd850 solid;
        margin: 10px;
    }

    let $div = $('div');

    height() width() 是读取内容区的宽 和 高
    console.log($div.width(), $div.height());

    innerWidth(), innerHeight() 是读取内容区 + 内边距的 宽 和 高
    console.log($div.innerWidth(), $div.innerHeight());

    outerWidth(), outerHeight() 是读取内容区 + 内边距 + 边框的 宽和高 而且内部还可以传递布尔值 false true 传递true则 加上margin
    console.log($div.outerWidth(), $div.outerHeight());
    console.log($div.outerWidth(true), $div.outerHeight(true));
 -->

-----------------------------

### jQuery 对象拷贝
- 如果想要把摸个对象拷贝(合并) 给另外一个对象使用, 此时可以使用

> $.extend([deep], target, object1, [object2]);
- 参数:
- deep:     如果设置为true为深拷贝, 默认为false为浅拷贝
- target:   要拷贝的目标对象
- object1:  待拷贝的对象  
<!-- 我们把object1的内容复制(拷贝给target) -->
<!-- 
    let targetObj = {id:1};
    let obj = {
      name:'sam',
      age:18
    }

    $.extend(targetObj, obj);
    console.log(targetObj)
 -->

- 当target中已有数据的时候, object1中的数据会覆盖掉target中的数据(重复冲突的部分)

- 浅拷贝:
- 把被拷贝对象复制数据类型中的地址拷贝给目标对象, 修改目标对象会影响到被拷贝对象

- 深拷贝:
- 在第一个参数的位置输入true, 完全克隆(拷贝的对象, 不是地址), 修改目标对象不会影响被拷贝的对象
<!-- 
    深拷贝会把目标对象中原来的复杂数据不会覆盖, 会合并重新开辟一个新的空间来存放

    $.extend(true, targetObj, obj);
 -->

-----------------------------

### jQ 多库共存
- jQuery使用$作为标识符, 随着jQ的流行, 其它的js库也会用这$作为标识符, 这样一起使用会引起冲突
<!-- 
    $()包装的原理
    function $(ele) {
        return document.querySelector(ele);
    }
    $('div')

    上面的$是我们自己定义的
    当我们再使用$.each的时候会报错了 因为冲突了我们定义的$里面没有each()这个方法
-->

- 上面的这种冲突的情况 我们就称之为多库共存

> jQ的解决方法
> 方式一    把里面的$符号 统一改为jQuery
- 别的js库没办法解决 但是jQ可以从自己的身上解决
<!-- 
    jQuery('div')
 -->

> 方式二    允许用户自己改变标识符的名字 不一定非要使用jQuery
- $.noConflict()
- 通过$.noConflict()方法自己定义标识符
<!-- 
    let 自定定义的变量 = $.noConflict();

    自定定义的变量('div')
 -->

---------------------------------

### jQ插件
- jQuery的功能比较有限, 想要更复杂的特效效果, 可以借助于jQuery的插件完成
- 注意这些插件也是依赖于jQuery来完成的, 所以必须要先引入jQuery文件, 因此也成为jQ插件

- 常用插件的网站
- www.jq22.com
- www.htmleaf.com   推荐 很帅啊

> 瀑布流 轮播图都有

> 使用方式
- 下载插件
- 打开下载包里面的index 观察下需要引入什么
- 复制css js文件夹到项目内
- 看着index.html复制对应的结构

---------------------------------

### 图片的懒加载
- 我们的页面可能图片特别的多, 图片多我们去服务器请求再显示到页面上 服务器的压力就会特别大, 还有用户打开页面后只停留在当前页面 它就把页面关掉了 下面都没有看到你把它加载出来干什么

- 我们可以只显示用户看到的图片, 其余的不加载 显示的图片少, 页面的加载就会很快
- 拖动页面看到哪个地方就把哪个地方的图片显示出来

- 所谓的懒加载(什么时候需要 什么时候给你)
- 图片使用延迟加载在可提高网页下载速度, 它也能帮助减轻服务器的负载
- 当我们页面滑动到可是区域, 再显示图片

- 我们在www.jq22.com 搜索懒加载
- 比较有名的就是 EasyLazyload.js

> 懒加载
> EasyLazyload.js
- 所有图片的src替换成 data-lazy-src
- 我们使用jQ的 easylazyload 此时的js引入文件和js调用必须写到DOM元素的最后面
- 复制script

- 我们可以把cover的代码删掉


> 全屏滚动
- https://github.com/alvarotrigo/fullPage.js
- 中文翻译网站:
- http://www.dowebok.com/demo/2014/77/


---------------------------------

### 扩展jQ的功能

> 插件机制：
> 扩展 jQuery函数对象的方法
$.extend(function(){
    xxx: function(){
}

- 调用：$.xxx()

> 扩展jQuery对象的方法
$.fn.extend(function(){
    xxx: function(){
<!-- 这里的this是谁，jQ对象的方法 得先得到jQ对象吧 那this就是那个jQ对象 -->
}
});

- 调用：$('tt').xxx() 

> 扩展jQuery的工具方法        
$.extend(object)
- 扩展jQuery对象本身。
- 用来在jQuery命名空间上增加新函数。 查看 'jQuery.fn.extend' 获取更多添加插件的信息。
<!-- 
    在jQuery命名空间上增加两个函数。
    jQuery.extend({
        min: function(a, b) { return a < b ? a : b; },
        max: function(a, b) { return a > b ? a : b; }
    });

    - 结果：
    jQuery.min(2,3);        // => 2
    jQuery.max(4,5);        // => 5
 -->


> 扩展jQuery对象的方法        
$.fn.extend(object)
- 给我们的jQ对象 增添方法 在调用的时候
- $.check()  这样不行，因为我们给jQ对象添加的方法 我们在调用时 要 $().check()

- 扩展 jQuery 元素集来提供新的方法（通常用来制作插件）。
<!-- 
    增加两个插件方法。
    jQuery.fn.extend({
    check: function() {
        return this.each(function() { this.checked = true; });
    },
    uncheck: function() {
        return this.each(function() { this.checked = false; });
    }
    });
    - 结果：
    $("input[type=checkbox]").check();
    $("input[type=radio]").uncheck();
 -->


> 需求：1. 给 $ 添加4个工具方法:
* min(a, b) : 返回较小的值
* max(c, d) : 返回较大的值
* leftTrim() : 去掉字符串左边的空格
* rightTrim() : 去掉字符串右边的空格

> 需求：2. 给jQuery对象 添加3个功能方法:
* checkAll() : 全选
* unCheckAll() : 全不选
* reverseCheck() : 全反选
<!-- 
    首先要先引入 jQ库 因为我们的插件是基于 jQ语法写的

<s*t s*c="js/jquery.js">
<s*t s*c="js/my_jQuery-plugin.js">


console.log($.min(3, 5), $.max(3, 5));
let str = '     my     ';
console.log($.leftTrim(str), $.rightTrim(str));


需求：2. 给jQuery对象 添加3个功能方法:
* checkAll() : 全选
* unCheckAll() : 全不选
* reverseCheck() : 全反选 
* 
reverseCheck    以前要完成这个效果 必要要遍历 现在让它直接能调用


$('#checkedAllBtn').click(function(){
    $(':checkbox[name=items]').checkAll();
});

$('#checkedNoBtn').click(function(){
    $(':checkbox[name=items]').unCheckAll();
});

$('#reverseCheckedBtn').click(function(){
    $(':checkbox[name=items]').reverseCheck();
});

我们的js文件里 是这么写的 主要看下 反选 这个理念 应该很多情况都用的到

(function(){
给jQ核心函数扩展方法     用这个语法 $.extend(object)    参数为对象
扩展 $ 的方法
$.extend({
    min: function(a, b){
    return a < b ? a : b;
},

max: function(a, b){
    return a > b ? a : b;
},

leftTrim: function(str){
    return str.replace(/^\s+/, '');
},

rightTrim: function(){
    return str.replace(/\s+$/, '');
}
});

// 扩展jQuery对象的方法     用这个语法 $.fn.extend(object)  这里的fn是个对象 对象里有extend方法
$.fn.extend({
/ 
* checkAll() : 全选
* unCheckAll() : 全不选
* reverseCheck() : 全反选
/

checkAll: function(){

// 我们先想想 这个方法checkAll() 到时候谁来调 jQ对象来调用吧 现在我要选中
// this 现在是谁 是DOM元素对象 还是jQ对象？ 一个函数中的this是谁看谁来调用 这个方法是jQ对象调用的 所以this就是jQ对象

    this.prop('checked', true)
},

unCheckAll:function(){
    this.prop('checked', false)
},

reverseCheck:function(){

// 因为不知道当前包含的DOM元素都是什么状态 我们需要去遍历 现在的this是谁？ this 是jQ对象 既然是jQ对象 用什么方法能遍历元素？ 
this.each(function(){
// 这个函数中又有一个this 现在this是谁？遍历里面的对象 this是DOM元素
    this.checked = !this.checked;
})
}
})
})();
 -->

---------------------------------

### jQ常用的插件
> jquery-validation
- 表单验证
- 网站： 菜鸟教程

- D:\Memo\Sam\JQ\插件学习_表单验证_jQueryValidate\jQueryValidate\jQueryValidate_test


> jquery UI
    - 收集了一些jQ插件在一起的大插件

> laydate
    - 基于原生的js插件 选择日期的插件

<!-- 一旦我们的项目选择jQ作为核心，那我们就要找各种插件 -->

-------------------------------

### jQ UI插件:
- 导入ui库后

- 1. Accordion: 手风琴效果
- 调用:
    jQ对象.accordion()
<!-- 
    $('#accordion').accordion();
 -->
        
- 2. Autocomplete: 自动完成搜索输入框
- 调用：
    jQ对象.autocomplete({
        source: 待匹配字符串数组名
    })
<!-- 
    // 待匹配字符串
    var availableTags = [
        "Ruby",
        "Scala",
        "Scheme"
    ]

    $( "#autocomplete" ).autocomplete({

    // 指定刚才我们创建的 待匹配字符串的数据源
    source: availableTags
    })
 -->
        
- 3. Tabs: 选项卡
- 调用：
    jQ对象.tabs() 

-------------------------------

### jQ 网页日期控件：
- laydate() 很简单 看看视频 就明白了 就不整理了
    
    onclick="laydate() 是全局函数 一点击它就调用 用来显示日期控件
<!-- 
    <input placeholder="请输入日期" class="laydate-icon" onclick="laydate()">
    
    这里没有 onclick 点击响应函数 所以页面上点击不能出现日期控件 我们可以动态加载 >
    <input class="laydate-icon" id="demo" value="2014-6-25">

    // ! 是匿名函数自调用的另一种做法
    !function(){
        // laydate() 里的参数是个对象，这个对象叫做配置对象
        laydate({
        // 下面的意思是 给'#demo' 元素加监听 调用laydate()
        elem: '#demo'
        })
    }()

 -->
  
-------------------------------

### 全功能联系案例
- 点击按钮，显示按钮的文本，显示一个新的输入框
<!-- 
    $('#btn').click(function(){
        alert($(this).html());
        $("<input type='text' name='msg2' id='info2'>").appendTo('div');
    })
 -->


### 需求2： 遍历输出数组中的所有元素值
<!-- 
    let arr = [2,4,7];
    $.each(arr, function(index, item){
        console.log(index, item);
    })
 -->


### 需求3： 去掉'my atguigu'两端的空格
<!-- 
    let str = '    my atguigu    ';
    // 字符串本身就有trim()方法 这也是原生的方式
    console.log('---'+ str.trim() +'---');

    // jQ方法
    console.log($.trim(str));
 -->


### 需求1. 统计一共有多少个按钮
<!-- 
    let $buttons = $('button');
    console.log($buttons.length, $buttons.size());
 -->

### 需求2. 取出第2个button的文本
<!-- 
    // 我们用这个语法：[index] / get(index)  根据下标得到对应的DOM元素, 下面取得的是DOM元素数据 所以要输出文本内容要用DOM元素的方法或者属性.innerHTML
    console.log($buttons[1].innerHTML, $buttons.get(1).innerHTML);
 -->


### 需求3. 输出所有button标签的文本
<!-- 
    // 所有的btn都在$buttons的里面 所以要遍历 遍历要用 each();
    // 这里的this是dom对象 实际上等同于domEle
    $buttons.each(function(index, item){
        console.log(index, item.innerHTML, this);     
    });

    // 有的时候并不需要index 只需要dom对象就够了 那可以简写成
    $buttons.each(function(){
        console.log(this);
        console.log(this.innerHTML);
    });
 -->


### 需求4. 输出'测试三' 按钮是所有按钮中的第几个 
<!-- 
    // 我们用这个语法：index()  得到在所在兄弟元素中的下标
    console.log($('#btn3').index());    //2
 -->


### 需求一：选择第一个div
<!-- 
    // 首先 $('div') 这样找 找到了所有的div 然后找所有div中的第一个 过滤选择器 :first
    $('div:first').css('background', 'red');
 -->


### 需求二：选择最后一个class为box的元素
<!-- 
    // 首先找到$('.box') 这样找 找到了所有的.box元素，找最后一个 过滤选择器 :last
    $('.box:last').css('background', 'red');
 -->


### 需求三：选择所有class属性不为box的div
<!-- 
    // 首先我们要找div $('div') 要是为box的div $('div.box') 不为呢？:not(选择器字符串)
    $('div:not(.box)').css('background', 'yellow');
 -->


### 需求四：选择第二个和第三个li元素
<!-- 
    $('li:lt(3):gt(0)').css('background', 'red');
 -->


### 需求五：选择内容为BBBBB的li
<!-- 
    $('li:contains("BBBBB")').css('background', 'red');
 -->


### 需求六：选择隐藏的li
<!-- 
    $('li:hidden').css('background', 'blue');
 -->


### 需求七：选择有title属性的li元素
<!-- 
    $('li[title]').css('background', 'pink');
    $('li[title=hello]').css('background', 'red');
 -->


### 需求1，选择不可用的文本输入框
<!-- 
    $(':text:disabled').css('background', 'red');
 -->


### 需求2，显示选择爱好 的个数
<!-- 
    console.log($(':checkbox:checked').length);
 -->


### 需求3，点击提交按钮后 显示选择的城市名称
<!-- 
    // 获取标签的文本    .html()
    $(':submit').click(function(){
        //选择的option的标签体文本
        let city = $('select>option:selected').html();  

        // 我们通过select 得到的是 option的value 这个数据到时候是要提交给服务器的 提交给服务器的是value
        city = $('select').val();       
        alert(city);            
    });
 -->


### 多Tab点击切换
- 方式一:
<!-- 
    // 先找到所有的div
    let $contents = $('#container>div');
    $('#tab>li').click(function(){

        // 先是隐藏所有的div    加样式.css
        $contents.css('display', 'none');

        let index = $(this).index();

        // 既然是DOM元素 那就要用DOM的方法才能修改 display
        $contents[index].style.display = 'block';
        // $($contents[index]).css('display', 'block');
    })  
 -->

- 方式二
<!-- 
    let currIndex = 0;      //当前显示的内容div的下标
    $('#tab>li').click(function(){

        // 隐藏当前显示内容的div
        $contents[currIndex].style.display = 'none';

        // 显示对应的内容的div, 得到当前点击的li在兄弟中的下标
        let index = $(this).index();

        // 找到对应的内容div，并显示
        $contents[index].style.display = 'block';

        // 更新下标 因为新的div在显示 要不更新的话 currIndex 总会为0
        currIndex = index;     
    })
-->


### 需求1. 读取第一个div的title属性
<!-- 
    // 第一个div 
    let result = $('div:first').attr('title');
    console.log(result);
 -->


### 需求2. 给所有的div设置name属性(value为atguigu)
<!-- 
    $('div').attr('name', 'atguigu');
 -->


### 需求3. 移除所有div的title属性
<!-- 
    $('div').removeAttr('title');
 -->


### 需求4. 给所有的div设置class='guiguClass'
<!-- 
    // 以前要是有class属性 那就是覆盖
    $('div').attr('class','guiguClass');
 -->


### 需求5. 给所有的div添加class='abc'
<!-- 
    // 用上面的方法会进行覆盖 这个是要求添加
    $('div').addClass('abc');
 -->


### 需求6. 移除所有div的guiguClass的class
<!-- 
    $('div').removeClass('guiguClass');
 -->


### 需求7. 得到最后一个li的标签体文本
<!-- 
    // html() --- innerHTML     text() ---- innerText
    console.log($('ul>li:last').html());
 -->


### 需求8. 设置第一个li的标签体为"<h1>mmmmmmmmm</h1>"
<!-- 
    $('li:first').html('<h1>mmmmmm</h1>');
 -->


### 需求9. 得到输入框中的value值
<!-- 
    <input type="text" name="username" value="guiguClass"/>

    // 获取单行文本框
    console.log($(':text').val());
 -->


### 需求10. 将输入框的值设置为atguigu
<!-- $(':text').val('atguigu'); -->


### 需求 11. 点击'全选'按钮实现全选
<!-- 
    // 值如果是预定义内容 应该就不用加 引号 了 true false
    $('button:first').click(function(){
        $(':checkbox').attr('checked', true);
    });
 -->


### 需求 12. 点击'全不选'按钮实现全不选
<!-- 
    $('button:last').click(function(){
        $(':checkbox').attr('checked', false);
    });
 -->


### 需求11 12 会出现 第一次点击可以 再之后点击不行的问题
<!-- 
    // 我们要使用prop就是property也是属性的意思
    $('button:first').click(function(){
        $(':checkbox').prop('checked', true);
    });

    $('button:last').click(function(){
        $(':checkbox').prop('checked', false);
    });
 -->


### 需求1. 得到第一个p标签的颜色
<!-- console.log($('p:first').css('color')); -->


### 需求2. 设置所有p标签的文本颜色为red
<!-- $('p').css('color', 'red'); -->


### 需求3. 设置第2个p的字体颜色(#ff0011),背景(blue),宽(300px), 高(30px)
<!-- 
    $('p:eq(1)').css({
        color:'#ff0011',
        background:'blue',
        width:300,
        height:30
    });
 -->


### 需求1. 点击 btn1
<!-- 
    打印 div1 相对于页面左上角的位置
    打印 div2 相对于页面左上角的位置
    打印 div1 相对于父元素左上角的位置
    打印 div2 相对于父元素左上角的位置
 -->


### 需求2. 点击 btn2
<!-- 设置 div2 相对于页面的左上角的位置 -->

<!-- 
    $('#btn1').click(function(){
        // 打印 div1 相对于页面左上角的位置
        let offset = $('.div1').offset();
        console.log(offset.left, offset.top);

        // 打印 div2 相对于页面左上角的位置
        let offset2 = $('.div2').offset();
        console.log(offset2.left, offset2.top);

        // 打印 div1 相对于父元素左上角的位置
        let position = $('.div1').position();
        console.log(position.left, position.top);


        // 打印 div2 相对于父元素左上角的位置
        position = $('.div2').position();
        console.log(position.left, position.top);
    });


    // 点击 btn2
    $('#btn2').click(function(){
        // 设置 div2 相对于页面的左上角的位置
        $('.div2').offset({
            left:50,
            top:100
        })
    });
 -->


### 需求1. 得到div或页面滚动条的坐标
### 需求2. 让div或页面的滚动条滚动到指定位置
<!-- 
    $('#btn1').click(function(){
        console.log($('div').scrollTop());

        // 页面的滚动条 是 html 还是 body
        // console.log($('html').scrollTop());

        // 兼容两个浏览器
        console.log($('html').scrollTop() + $('body').scrollTop());
        // 跟上面的比起来 下面的效率能高些，也就是上面的得先通过选择器去找然后包装成jQ对象 下面的直接给你不用找
        
        console.log($(document.body).scrollTop()+$(document.documentElement).scrollTop());
    });

    $('#btn2').click(function(){
        $('div').scrollTop(200);
        // 兼容两个浏览器
        $('html, body').scrollTop(300);
    });
 -->


### 需求 返回顶部
<!-- 
    $('#to_top').click(function() {

    // 瞬间回到顶部 让我们页面的滚动条的值为0 我们可以找html,body
    $('html, body').scrollTop(0);

    // 平滑滚到顶部
    首先我们要得到 滚动的总距离 +  总时间 + 间隔时间  使用循环定时器不断滚动 到达顶部，停止定时器

    // 总距离
    // 取数据的时候不能这么写 $('html, body') 这里我写了两个元素 读的时候读第一个数据
    let $page = $('html, body');
    let distance = $('html').scrollTop() + $('body').scrollTop();
    // console.log(distance);      //1470.4000244140625

    // 总时间
    let time = 500;

    // 间隔时间，每隔50毫秒移动一次，那移动多少？ 总距离/间隔多少次吧
    let intervalTime = 50;

    // 算出每一个小单元移动的距离是多少
    let itemDistance = distance/(time/intervalTime);

    // 使用循环定时器 不断滚动
    let intervalId = setInterval(function(){

        // 需要滚动到哪去，现在每次是滚动itemDistance这些距离，
        // $page.scrollTop(distance - itemDistance);
        // distance - itemDistance 相当于告诉我们 是往上移动

        // 还可以这么写, 和上面一样的
        distance -= itemDistance;

        // 到达顶部，停止定时器
        if(distance<=0){        //有没有可能小于0 有可能是-1
            distance = 0;       //因为可能出现-1 所以修正让它等于0；
            clearInterval(intervalId);
        }

        $page.scrollTop(distance);
    },intervalTime);
    });
-->

### 需求1. ul标签的第2个span子标签
<!-- 
    $('ul').children('span').last().css('background', 'red');
    $('ul').children('span:eq(1)').css('background', 'red');
 -->


### 需求2. ul标签的第2个span后代标签
<!-- 
    $('ul').children('li').has('span').css('background','pink');
    上面找的是子元素标签 我们用的children 现在找的是后代find

    下面这么写不行，这么写 查找到的是 ul下的三个span
    $('ul').find('span').css('background','yellow');
    $('ul').children('li').find('span').css('background','yellow');

    这么写直观些
    $('ul').find('span:eq(1)').css('background', 'pink');
 -->


### 需求3. ul标签的父标签
<!-- $('ul').parent().css('background','red'); -->


### 需求4. id为cc的li标签的前面的所有li标签
<!-- $('#cc').prevAll('li').css('background', 'red'); -->


### 需求5. id为cc的li标签的所有兄弟li标签
<!-- 
    $('#cc').siblings('li').css({
        background:'black',
        color:'white'
    });
 -->


### 案例 爱好选择器
- 功能说明:
1. 点击'全选': 选中所有爱好
2. 点击'全不选': 所有爱好都不勾选
3. 点击'反选': 改变所有爱好的勾选状态
4. 点击'全选/全不选': 选中所有爱好, 或者全不选中
5. 点击某个爱好时, 必要时更新'全选/全不选'的选中状态
6. 点击'提交': 提示所有勾选的爱好
<!-- 
    // 我们把反复操作的元素定义成变量
    let $checkedAllBox = $('#checkedAllBox');

    // 把items复选框定义成变量
    let $items = $(':checkbox[name=items]');

    // 1 点击'全选': 选中所有爱好
    $('#checkedAllBtn').click(function(){
        $items.prop('checked', true);
        $checkedAllBox.prop('checked', true);
    });

    // 2. 点击'全不选': 所有爱好都不勾选
    $('#checkedNoBtn').click(function(){
        $items.prop('checked', false);
        $checkedAllBox.prop('checked', false);
    });

    // 3. 点击'反选': 改变所有爱好的勾选状态
    $('#checkedRevBtn').click(function(){

        // 要对true 和 false 取反，取反的话应该得到当前的属性值吧，当前的属性值我们在外面不知道, 这时候只能遍历 这时候隐式遍历不能得到内部的过程 我们要自己遍历
        $items.each(function(){     //里面不用定义形参了

            // 接下来我们操作每一个box 也就是this this是DOM元素对象
            this.checked = !this.checked;
        });

        // 全选/全不选按钮 的值是false 还是 true 呢 什么时候是true？全选的时候是true 任意一个没选的时候就是false 我们统计下 足球 篮球 羽毛球 兵乓球 有几个没选中的 如果是0个不选中的那就是false false这个布尔值要跟一个东西关联起来 我要统计一下$items这里面有几个不选中的 怎么统计？ 是过滤还是查找？ 过滤吧 根据它是否选中来过滤 这样过滤出来的是未选中的 它返回的是jQ对象 它里面有个属性length 如果length等于0代表全都选中的（一个没选的都没有不全选了么）
        // $items.filter('not(:checked)').length === 0;

        $checkedAllBox.prop('checked', $items.filter(':not(:checked)').length === 0);
    });

    // 6. 点击'提交': 提示所有勾选的爱好
    $('#sendBtn').click(function(){
        $items.each(function(){
            if(this.checked){
                alert(this.value);
            }
        });

        换个写法：
        $items.filter(':checked').each(function(){
            alert(this.value);
        })
    });

    // 4. 点击'全选/全不选': 选中所有爱好, 或者全不选中
    $checkedAllBox.click(function(){
    
    // 所有爱好的状态要跟checkedAllBox一致 也就是truefalse的部分 跟checkedAllBox的状态一样了
        $items.prop('checked', this.checked);
    });

    // 取消一个爱好 全选全不选也应该取消 也就是说我要给所有的爱好都加上点击监听
    $items.click(function(){
        $checkedAllBox.prop('checked', $items.filter(':not(:checked)').length === 0);
    });
 -->


### 案例 添加删除记录练习
<!-- 
    // 添加员工信息功能
    $('#addEmpButton').click(function(){

    // 收集输入的数据
    let $empName = $('#empName');
    let $email = $('#email');
    let $salary = $('#salary');

    let empName = $('#empName').val();
    let email = $('#email').val();
    let salary = $('#salary').val();

    let $employeeTable = $('#employeeTable');

    // 生成tr标签结构，并插入表格中的tbody中
    // $('<tr><td>'+$empName+'</td><td>'+$email+'</td><td>'+$salary+'</td><td><a href="javasc**pt:;">Delete</a></td></tr>').appendTo($employeeTable);

    // 还可以这么写，
    let $xxx = $('<tr></tr>')
    .append('<td>'+empName+'</td>')
    .append('<td>'+email+'</td>')
    .append('<td>'+salary+'</td>')

    // "deleteEmp?id=003"  新添加的按钮的id 每次都不应该重复 随机
    .append('<td><a href="deleteEmp?id="'+Date.now()+'>Delete</a></td>') 

    //从这开始 上面jQ对象是谁？tr吧
    .appendTo('#employeeTable>tbody')

    //从这开始 现在的jQ对象是tbody还是tr呢？我们可以打印看看 既然也是tr 我们就在这行开始找到a 我们再添加a标签的同时 也要给a标签加上点击监听 那怎么找到a加上呢？ children找到的子元素，find找的是后代元素
    .find('a').click(clickDel); 
    // console.log($xxx[0]);     //tr

    // 清楚输入  下面这么写会报错 因为 获取到的是DOM元素 不是jQ对象不能用jQ的方法
    $empName.val('');
    $email.val('');
    $salary.val('');
    });

    // 删除员工信息功能
    // 所有a标签都要加上点击响应函数
    $('#employeeTable a').click(clickDel);

    // 还是有问题 新添加的a标签没有点击响应函数
    function clickDel(){
        let $tr = $(this).parent().parent();
        let name = $tr.children(':first').html();

        if(confirm('确定删除'+name+'么？')){
        $tr.remove();

        // 取消默认行为
        return false;
    }
    };

// 请问给每个a元素的href属性加上唯一的数值是为什么？ 要知道所有的数据最先肯定不是在浏览器端的 网页中显示的数据最开始在服务器端 随机值 相当于这条数据的标识 我们现在只是做了一个前台展现的删除 正的删除是应该把后台对应的数据删掉，那应该把什么东西传过去呢 标识 不然后台怎么知道删除什么数据呢？ 对我们现在来说 那个id还没用
 -->


### 需求1. 给.out绑定点击监听(用两种方法绑定)
<!-- 
    第一种方式
    $('.out').click(function(){
        alert('test');
    });

    第二种方式，可以绑定多个事件
    $('.out').on('click', function(){
        alert('test2');
    })
 -->


### 需求2. 给.inner绑定鼠标移入和移出的事件监听(用3种方法绑定)
<!-- 
    $('.inner')
    .mouseenter(function(){})   //鼠标移入
    .mouseleave(function(){})   //鼠标移出

    $('.#inner')
    .on('mouseenter', function(){})
    .on('mouseleave', function(){})

    $('.inner').hover(
      function(){
        console.log('移入');
      },
      function(){
        console.log('移出');
      }
    );
 -->
    

### 需求3. 点击btn1解除.inner上的所有事件监听
<!--    
    $('#btn1').click(function(){
        $('.inner').off();
    });
 -->
    

### 需求4. 点击btn2解除.inner上的mouseenter事件
<!-- 
    $('#btn2').click(function(){
        $('.inner').off('mouseenter');
    });
 -->
    

### 需求5. 点击btn3得到事件坐标
<!-- 
$('#btn3').click(function(event){   //事件对象
    console.log(event.offsetX, event.offsetY);    //原点为事件元素的左上角
    console.log(event.clientX, event.clientY);    //原点为窗口的左上角
    console.log(event.pageX, event.pageY);        //原点为页面的左上角
})
 -->


### 需求6. 点击.inner区域, 外部点击监听不响应
<!-- 
    $('.inner').click(function(event){
        //设置完 点击内部div 同时也触发了外部div的click的点击事件
        alert('test');
        停止事件冒泡
        event.stopPropagation();
    });
 -->


### 需求7. 点击链接, 如果当前时间是偶数不跳转
<!-- 
    一个链接的默认行为是跳转 event.preventDefault()取消默认行为
    取得当前时间 Date.now()
    $('#test4').click(function(event){
        if(Date.now()%2 === 0){
        event.preventDefault();
        }
    });
 -->


### 案例 导航条动态显示效果
<!-- 
    // 给谁去加事件呢？加移入移出的事件 
    $('#navigation>ul>li:has(ul)').hover(function(){

    // 移入动画展开 给谁展开收缩呢？ 当前发生事件的li下的ul
    $(this).children('ul').slideDown();
    }, function(){

    // 移出动画收缩
    $(this).children('ul').slideUp();
    })

    有问题 我疯狂移入 积攒了很多事件 依次触发 所以先停止上一个动画 然后再调
    // $(this).children('ul').slideDown();
    // ↓
    // $(this).children('ul').stop().slideDown();
    // stop()就是将未完成的动画 全部终止
 -->










    










### 案例 tab栏切换
> 核心思路:
- 点击上部的li, 当前li添加current类, 其余兄弟移除类
- 点击的同时, 得到li的索引号
- 让下部里面响应索引号的item显示, 其余的item隐藏

<!-- 
    $('li').click(function() {

        // 链式编程
        $(this).addClass('current').siblings().removeClass('current');
        let index = $(this).index();
        $('.item').eq(index).show().siblings().hide();
    })
 -->


### 案例 购物车全选
- 思路分析:
- 全选思路: 里面3个小的复选框按钮选中状态跟着全选按钮走
- 因为checked是复选框的固有属性, 此时我们需要利用prop()方法获取和设置该属性
- 把全选按钮状态赋值给3小复选框就可以了

- 当全选按钮发生变化 我们这里使用了change
<!-- 
    $('.checkall').change(function() {
        let flag = $(this).prop('checked');
        $('.j-checkbox').prop('checked', flag);
    })
 -->

- 当我们每次点击小的复选框按钮, 就来判断
- 如果小复选框被选中的个数等于3 就应该把全选按钮选上, 否则全选按钮不选
- 我们可以用 :checked 这样就能选中被选中的复选框
<!-- 
    $('.j-checkbox').change(function() {

        // 如果被选中的小的复选框的个数 === 3 就选中全选按钮 否则不按
        if($('.j-checkbox:checked').size() === 3) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
    })

    if($('.j-checkbox:checked').size() === 3)
    if($('.j-checkbox:checked').size() === $('.j-checkbox').size()) 
    或者是length
 -->


### 案例 购物车商品的数量增减
- 分析:
- 首先声明一个变量, 当我点击+号, 就让这个值++ 然后赋值给文本框
- 注意:
- 只能增加本商品的数量, 就是当前+号的兄弟文本框的值
<!-- 
    我们可以使用siblings 这样是亲兄弟, 不会选到别的结构中的数据
 -->

- 修改表达的值是val()
- 注意:
- 这个变量初始值应该是这个文本框的值, 在这个值的基础上++ 要获取表单的值

<!-- 
    $('.increment').click(function() {
        // 每次点击按钮的时候声明一个变量 这个变量的初始值应该是文本框的值
        // 这里注意 一定要取点击这个按钮的兄弟的值
        let n = $(this).siblings('.itext').val();
        n++;
        $(this).siblings('.itext').val(n);
    })

    $('.decrement').click(function() {
        let n = $(this).siblings('.itext').val();
        if (n == 1) {
            return false        // 遇到return后面的代码就不再执行了
        }
        n--;
        $(this).siblings('.itext').val(n);
    })
 -->

### 案例 购物车商品的小计 就是根据商品数量计算总价
- 分析:
- 每次点击+号或者-号, 根据文本框的值乘以当前商品的价格就是商品的小计
- 注意:
- 只能增加本商品的小计, 就是当前商品的小计模块

- 修改普通元素的内容是text()
- 注意:
- 当前商品的价格要把 钱的符号去掉再相乘 截取字符串 substr(1)

> toFixed(2)
- 最后计算的结果如果想要保留2为小数通过toFixed(2)

- 总计和总额的模块
- 把所有文本框里面的值相加就是总计数量, 总额同理
- 文本框里面的值不相同, 如果想要相加需要用到each遍历, 声明一个变量, 相加即可

- 点击- +号, 会改变总计和总额, 如果用户修改了文本框里面的值同样会改变总计和总额

- 因此可以封装一个函数求总计和总额, 以上2个操作调用这个函数即可
- 注意:
- 总计是文本框里面的值相加用val()
- 总额是普通元素的内容用text()

<!-- 
    页面结构:
    <div class='p-price'>$12.60</div>       单价
    <div class='p-num'>
        <div class='quantity-form'>
            <a class='decrement'>-</a>
            <input type='text' class='itxt' value='1'>
            <a class='increment'>+</a>
        </div>
    </div>
    
    // 怎么点击按钮, 拿到对应结构里面的单价呢?
    // 我们要从this出发, 找爸爸的爸爸p-num 找p-num的兄弟

    $('.increment').click(function() {
        let n = $(this).siblings('.itext').val();
        n++;
        $(this).siblings('.itext').val(n);

        // 从这里看
        let p = $(this).parent()..parent().siblings('p-price').html();
        p = p.substr(1);

        // 小计模板 也是通过爸爸的爸爸的兄弟找到的
        $(this).parent()..parent().siblings('p-sum').html(p * n);

    })

    $('.decrement').click(function() {
        let n = $(this).siblings('.itext').val();
        if (n == 1) {
            return false
        }
        n--;
        $(this).siblings('.itext').val(n);
        let p = $(this).parent()..parent().siblings('p-price').html();
        p = p.substr(1);
        $(this).parent()..parent().siblings('p-sum').html(p * n);
    })


    // 用户也可以直接修改表单里面的值, 同样要计算小计, 用表单change事件
    // 用最新的表单内的值, 乘以单价即可, 但是还是当前商品小计
    $('.itxt').change(function() {
        let n = $(this).val();
        let p = $(this).parents('p-num').siblings('p-price').html();
        p = p.substr(1);
        $(this).parents('p-num').siblings('p-sum').html('$'+(p*n).toFixed(2));
    })

    // 总计总额模块
    function getSum() {
        let count = 0;  // 计算总件数
        let money = 0;  // 计算总价钱

        $('itxt').each(function(index, item){
            count += parseInt($(item).val());
        })
        $('.amount-sum em').text(count);

        // 总额
        $('p-sum').each(function(index, item){
            money += parseFloat($(item).text().substr(1))
        });
        $('.price-sum em').text(money.toFixed(2));
    }
 -->

> 删除商品模块
- 思路:
- 把商品remove()删除元素即可
- 有3个地方需要删除 1商品后面的删除按钮 2删除选中的商品 3清理购物车
- 商品后面的删除按钮 一定是删除当前的商品 所以从$(this)出发
- 删除选中的商品, 先判断小的复选框按钮是否选中状态, 如果选中, 则删除对应的商品
<!-- 
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        getSum()
    })

    $('.remove-batch').click(function() {
        // 删除的是小的复选框选中的商品
        $('.j-checkbox:checked').parents('.cart-tiem').remove();
        getSum()
    })

    // 清除购物车
    $('clear-all').click(function() {
        $('.cart-tiem').remove();
        getSum()
    })
 -->

> 选中商品添加背景
- 思路:
- 选中的商品添加背景, 不选中的移除背景即可
- 全选按钮点击, 如果全选是选中的, 则所有的商品添加背景 否则移除背景
- 小的复选框点击, 如果是选中状态 则当前商品添加背景, 否则移除背景
<!-- 
    在css部分 定义了一个 .check-cart-item 类 是#fff4e8 背景
    if($(this).prop('checked')) {   如果全选按钮是true
        $('.cart-item').addClass('check-cart-item');
    } else {
        $('.cart-item').removeClass('check-cart-item');
    }

 -->


### 尚硅谷老师的轮播图
<!-- 
    阶段一： 完成点击按钮 平滑切换到下一张 或者上一张

    鼠标移入到图片上的时候 定器停止工作 鼠标移出图片时开始工作
    也就是 在外层容器上 假如 mouseover mouseout事件

    // 外层容器
    let $container = $('#container');   //为了鼠标移入停止动画效果

    // 装图片的容器
    let $list = $('#list');

    // 导航点 先找父元素 然后找父元素下面的导航点
    let $points = $('#pointsDiv>span');

    // 获取翻页用的箭头
    let $prev = $('#prev'); 
    let $next = $('#next'); 

    // 定义一个常量 代表翻页移动的距离 也就是一张图片的宽度
    const PAGE_WIDTH = 600;

    // 移动一张图片要花费的时间 翻页的持续时间
    const TIME = 400;

    // 单元移动的时间
    const ITEM_TIME = 20;

    // 点击向右(左)的图标, 平滑切换到下(上)一页
    平滑翻到下一页 因为内部代码会很多 所以应该定义成方法 让他们使用同一方法
    先调用nextPage(), 因为有可能是next 有可能是prev 所以分两种情况 true false
    $next.click(function(){
        nextPage(true);
    });

    $prev.click(function(){
        nextPage(false);
    });


    定义翻页函数 nextPage()
    定义一个 形参 next是个布尔值 表示是否是下一页 如果是true代表下一页 如果是false代表上一页

    我们先不做平滑翻页 先一下子到下一页 我们要操作$list的left值，在当前值的基础上减去600那怎么得到当前的left值

    function nextPage(next){
        let currLeft = $list.position().left;

        设置偏移量 是+600 还是-600 也就是我当前要偏移多少呢？到底是+600 还是-600 我们看next如果next是true（就是下一张） 那就是-600 如果next是false（前一张） 那就是+600
        let offset = next? -PAGE_WIDTH:PAGE_WIDTH;

        做翻页效果，是操作$list的left值 下一张就是-600 上一张就是+600
        记得left左右加上引号 不然它去找left变量了
        $list.css('left', currLeft+offset);

        ------ 平滑翻页 -----

        平滑翻页的要点在于 把要移动的距离 也就是600 分成很多小块 每块移动多少

        总的偏移量：offset
        总的时间(翻页的移动时间)：TIME = 400
        单元移动的间隔时间：ITEM_TIME = 20

        单元移动的偏移量：itemOffset = offset/(TIME/ITEM_TIME)

        启动循环定时器不断更新$list的left值 到达目的地的时候停止定时器

        // 定义总的偏移量
        let offset = 0;

        // 计算offset 根据next知道是 600 还是 -600
        offset = next?-PAGE_WIDTH:PAGE_WIDTH;

        // 计算 单元移动的偏移量：itemOffset
        let itemOffset = offset/(TIME/ITEM_TIME);

        // 获取现在的left位置
        let currLeft = $list.position().left;

        // 计算出目标处的left值
        let targetLeft = currLeft + offset;

        // 启动循环定时器
        let intervalId = setInterval(function(){

        // 更新$list的left值 $list.css('left', currLeft+offset); currLeft+offset 这么写不行 它只能动一次 也就是就会变一次 一次翻到目标处了 我们要这么写 currLeft += itemOffset 那这么行行么 $list.css('left', currLeft+itemOffset);  也不行 因为currLeft在定时器不断循环的过程中不会变 itemOffset也不会变 动一下再也不动了 我们要不断的累加

        // 计算出最新的currLeft
        currLeft += itemOffset;
          
        // 怎么知道到达目标位置了
        if(currLeft === targetLeft){    //说明到达目标位置了 

        // 清楚定时器
        clearInterval(intervalId);
        } 

        // 设置left
        $list.css('left', currLeft);

        },ITEM_TIME)
    };

 -->

> 总结 关于方向
LLC JS 中 然后speed是正 是负 是根据 在鼠标点击的时候就获取元素现在的位置 和 target位置比较
如果 当前位置 > 目标位置  那speed就为负   向左移动
如果 当前位置 < 目标位置  那speed就为正   向右移动
if(currentBoxLeft > target){
    speed = -speed;
}

jQ 中 判断移动方向 是根据 用户点击按钮时 传入的值
如果是true  下一张 就是 -  向左移动
如果是false 上一张 就是 +  向右移动

$next.click(function(){
    nextPage(true);
});
$prev.click(function(){
    nextPage(false);
});
let offset = next? -PAGE_WIDTH:PAGE_WIDTH;

 
> 关于 图片跳转 问题
JS： 1.jpg  2.jpg  3.jpg  4.jpg  5.jpg  1.jpg
当到5>1.jpg的时候 瞬间切换到1.jpg 修改 imgBox.style.left = 0

jQ: 5.jpg  1.jpg  2.jpg  3.jpg  4.jpg  5.jpg  1.jpg
当到5>1.jpg的时候 瞬间切换到1.jpg 也就是第2张图片，那就要知道最后1张图片左上角的坐标 和 正数第2张图片左上角的坐标

显示框
□
                                ←   当我看到这张的时候我应该跳转到
        ↓                                       ↓
0000    -600    0000    0000    0000    0000    -3600

5.jpg   1.jpg   2.jpg   3.jpg   4.jpg   5.jpg   1.jpg

0000    0000    0000    0000    0000    3600    0000
↑
当我看到这张的时候我应该跳转到    →                 ↑

1. 当我到最后一张图片的时候 应该跳转到正数第二张 此时最后一张图片的left值是负多少？因为正常来讲 不确定图片的张数 动态计算下

当前真实图片的张数为5张图片
imgcount = 5

倒数第一张图片1.jpg left = -(imgcount+1)*600
正数第二张图片1.jpg left = -600

如果停留在第一张 也就是5.jpg 我们要跳到倒数第二张 也就是说 我们要知道 5.jpg的left 和 5.jpg(倒数第二张)的left
正数第一张图片5.jpg left = 0
倒数第二张图片5.jpg left = -imgcount*600

现在知道这个值了 那我们在哪去写这些代码呢？ 移动到目标位置发现 已经到了最左右两边 也就是目标位置才会去判断我当前跳到哪里去
我们应该在这里写
转接：1
                                                            
---------------------------

>阶段三：
- 每隔3秒 自动翻页
- 我们定时调用 nextPage()  那我们传递什么值呢？ true呗 自动翻到下一页
- 鼠标移入关闭定时器 移出开启定时器
<!-- 
    // 每隔3秒自动翻到下一页
    let timer =setInterval(function(){
    nextPage(true);
    }, 1000)

    // 当鼠标进入图片区域时 停止定时器 离开后开启定时器
    $container.hover(function(){

    // 清楚定时器
    clearInterval(timer);
    },

    function(){
    // 启动定时器
    timer =setInterval(function(){
        nextPage(true);
    }, 1000)
    });
-->

------------------------------

> 阶段四：
- 切换页面时 下面的圆点同步更新, 点击圆点切换到对应的页面
<!-- 
    更新圆点 不是一条语句能搞定的事件, 我需要更新两个圆点 一个要从红色变为灰色 一个要从灰色变为红色, 有没有条件呢？有条件 条件就是next next决定是向下翻还是向上翻，也就是显示的上一个原点还是下一个原点, 所以我要把next传进去

    updatePoints(next);

    // 更新圆点
    function updatePoints(next){

当前有一个index 最终我们要将当前index的span标签 当前的span是红色的圆点 将红色的圆点变成灰色的圆点 怎么变？移除里面的 on class  还要计算出目标圆点的下标 目标圆点应该变成红色 添加class=on 最终还要将index更新为targetIndex

计算出目标圆点的下标 targetIndex 当前targetIndex这个值 是根据 next来算 除了跟next有关系还跟当前的index有关系 next有两个值吧

    let targetIndex = 0;
    if(next){

 true代表翻到下一页 下一页跟index是什么关系 +1 下一个圆点就是下标+1呗

    index的范围是 [0 到 imgCount -1] 一直加下去可能超过这个范围
    targetIndex = index + 1; 

    // 再次判断
    这时候我们看到的是1.jpg最后一张 index的值超过了 范围
    if(targetIndex === imgCount){

        实际上圆点应该是第一个圆点 显示第一个圆点它的下标是0
        targetIndex = 0; 
    } else {
        targetIndex = index - 1; 
        -1的话是5.jpg 第一张图片 应该是第5个圆点
        if(targetIndex === -1){

        下标是4
        targetIndex = imgCount -1 
        }
    }

上面这么写会有一些特别的情况targetIndex = index + 1; 不断的加不断的增多 一共本身就5张图片
但是我放了7张图片 最后一张图片的下标是4 有没有可能会加到5 有吧
下标为5的时候看到的是图片1 圆点显示第一个圆点 下标应该是0吧
也就是说 下标的范围是多少 

xxxx      0000      0001      0002     0003     0004      xxxx                
第一张    第二张    第三张    第四张    第五张    第六张    第七张    
 
将当前index的span的class移除 给目标圆点添加class on
$points.eq(index) 找index对应span的标签对象 找到的是jQ对象

    $points.eq(index).removeClass('on');
    $points.eq(targetIndex).addClass('on');

将index更新为targetIndex
    index = targetIndex;
    };
 -->


> 关于导航点同步更新的理念
JS：  for循环为每一个导航点遍历加监听 把导航点的下标 传递给index 然后利用setNavA()还设置选中状态

jQ：  让它是红色只需要加class就可以on 最最关键的是知道当前这张图片的下标 我要时刻知道当前的下标 创建index = 0 保存当前下标 这个index是会变的 什么时候我需要更新index的值 切换的时候更新 也就是每次调用nextPage()都要更新index 最终去更新points

- 更改导航点的选中状态
JS：  遍历统一让导航点变成红色，然后外部把点击的导航点改为黑色
jQ：  更新两个点 一个红变灰 一个灰变红


### 案例 发布微博
- 结构 :
<!-- 
    <div class="box" id='weibo'>
        <span>发布微博</span>
        <textarea class='txt' name="" id="" cols="30" rows="10"></textarea>
        <button class="btn">发布</button>
    </div>

    <ul></ul>
 -->

- 点击发布按钮
- 动态创建一个小li, 放入文本框的内容和删除按钮, 并且添加到ul中
- 点击删除按钮
- 可以删除当前的微博留言
<!-- 
    $(function() {
      $('.btn').on('click', function() {
        // 动态创建小li
        let li = $('<li></li>');
        li.html($('.txt').val()+"<a href='javasrcipt:;'>删除</a>")

        $('ul').prepend(li);
        li.slideDown();
        $('.txt').val('');
      })

      $('ul').on('click', 'a', function() {
          
        // 下拉后再删除 slide()中有回调函数
        $(this).parent().slideUp(function() {

          // 到slideUp的时候已经是目标元素了
          $(this).remove()
        });
      })
    })
 -->


### 案例 todolist
- 案例分析:
- 1. 刷新页面不会丢失数据, 因此需要用到本地存储localStorage
- 2. 不管按下回车 还是点击复选框 都是把本地存储的数据加载到页面中 这样保证刷新关闭页面不会丢失数据

- 总体流程:
      
    在输入框里输入数据 --- 把数据存储在本地 --- 使用本地数据渲染到页面上
<!-- 都是在本地存储里 使用数据 再加载到页面上 -->

- 存储数据的格式:
    let todoList = [
        {
            title:'xxx',
            done: false
        }
    ]

- 注意点:
- 在本地存储localStorage里面只能存储字符串格式, 因此需要把对象转换为字符串
- JSON.stringify(data)

- 获取本地存储的数据, 我们需要把里面的字符串数据转换为对象格式
- JSON.parse(data)

> 按下回车把新数据添加到本地存储里面
- 切记 页面中的数据 都要从本地存储里面获取, 这样刷新页面不会丢失数据, 所以先要把数据保存到本地存储里面
- 利用事件对象 keyCode判断用户按下回车键(13)

- 按下回车就相当于添加条目, 我们需要声明一个数组用来保存数据

- 每次按下回车后我们要看看本地存储里面有没有数据, 如果有数据了 我就把新的数据追加到本地存储里面就可以了
<!-- 
    只要按下回车 说明我们要有数据加进来了, 这时候我们本地存储里面的数据也要进行更新操作
    但是在本地存储里面没有办法把数据直接追加到本地存储里面去

    所以我们可以这样

    当我按下回车之后 我们把数据追加给 local 这个数组 这样数组就更新的了数据 我们再把这个最新的数组添加给本地存储
    
    也就是说把本地存储里面的数据来一个替换 但是数组里面的数据是新的 就相当于完成了本地存储的更新操作
 -->

- 先要读取本地存储原来的数据, (声明函数getData()) 放到这个数组里面
<!-- 
    // 读取数据的操作很多地方都要用到 所以我们可以封装一个函数
    function getData() {
    let data = localStorage.getItem('todolist');

    // 如果data不是空, 说明有数据
    if(data !== null) {
        // 本地存储里面额数据是字符串格式的, 但是我们需要的是对象格式的
        return JSON.parse(data);

        // 如果为空说明没有数据, 我们返回一个 []
    } else {
        return [];
    }
    }
 -->
- 之后把最新从表单获取过来的数据, 追加到数组里面
- 最后把数组存储给本地存储(声明函数saveData())
<!-- 
    function saveData(data) {

    // 这里我们没有办法直接使用local这个数组 它是外部的变量 所以在调用的时候 我们要将最新数组传递过来
    localStorage.setItem('todolist', JSON.stringify(data));
    }
 -->


> 本地存储数据渲染加载到页面
- 因为后面也会经常渲染加载操作, 所以声明一个函数load 方便以后调用
<!-- 
    function load() {

    // 渲染到页面上的话 我们需要先获取数据
    let data = getData();
    
    // 清空ol先
    $('ol').empty();

    // 遍历这个数据
    $.each(data, function(index, item) {
        // 里面有几个数据 就往ol里面追加几个li
        $('ol').prepend(`<li><input type="checkbox"><p>${item.title}</p><a href="#"></a></li>`)
    })
    }
 -->
- 每次加载之前先要读取本地数据(数据不要忘记转换为对象格式)
- 之后遍历这个数据($.each()), 有几条数据 就生成几个小li添加到ol里面

- 每次页面渲染之前 先把原先里面的ol的内容清空, 然后渲染加载最新的数据


> todolist删除操作
- 点击里面的a链接, 不是删除li 而是删除本地存储对应的数据
- 只要把本地存储里面的数据删除了 再次渲染的时候就不会出现在页面上了
- 先获取本地存储里面的数据, 删除对应的数据, 保存给本地存储, 重新渲染列表li
- 那我点击删除按钮的时候 怎么找到对应的数据呢?
- 我们可以给链接自定义属性记录当前的索引号

- 有了索引号后 删除相关的数据 - 数组的splice(i,1)方法
- 存储修改后的数据, 然后存储给本地存储
- 重新渲染加载数据列表
- 因为a是动态创建的, 我们使用on方法绑定事件给它的父元素


> 正在进行和已完成选项操作
- 当我们点击了小的复选框, 修改本地存储数据, 再重新渲染数据列表
- 点击复选框后 先获取本地存储的数据
- 拿到数据后 修改对应数据的done属性, 为当前复选框的checked状态
- 之后保存数据到本地存储
- 重新渲染加载数据列表

- 渲染页面的时候, 新增一个条件, 如果当前数据的done为true就是已经完成的就把列表渲染加载到ul里面
- 如果当前数据的done为false 则是待办事项 就把列表渲染加载到ol里面

- 技巧 如果一个结构中已经绑定了一个index, 我们可以根据这个绑定index的对象 找它的兄弟姐妹爸爸 不用再新绑定一个自定义属性
<!-- 
    - input
    - p
    - <a id='1'>

    - 我们想找input 我们可以已经绑定了自定义属性的a的关系找到p 我们拿到它兄弟a的索引号
    - index = $(this).siblings('a').attr('id')
 -->


> 统计正在进行个数和已经完成个数
- 在我们load函数里面做, 声明2个变量 todoCount待办个数 doneCount已完成个数
- 当进行遍历本地存储数据的时候, 如果数据done为false, 则todoCount ++ 否则doneCount ++
- 最后修改响应的元素text() 


> 完成代码
<!-- 
    $(function() {

      // 每次打开页面 自动往页面上渲染本地中的数据
      load();

      // 给文本框绑定键盘按下事件 
      $('#title').on('keydown', function(e) {
        if(e.keyCode === 13) {
          // 先读取本地存储里原来的数据 读取的时候我们声明一个数组保存我们拿到的数据 如果获得最新的我们再追加进去
          let local = getData();

          // 把local数组进行更新数据 把最新的数据追加给local数组 更新思路如下
          // 我要以这种格式往数组里追加数据 local.push({title:'xxx', done:false});

          // 我们通过按下回车添加的条目肯定都是没有完成的正在进行的 我们改成false
          local.push({ title: $(this).val(), done: false});

          // 再降这个数组存储到本地存储里面, 要不一刷新就没了
          saveData(local);

          // 按完回车后我们把数据从本地存储里面获取过来后渲染到页面上
          load();
        }
      });
      /* 
        local数组进行更新数据的思路:

        只要按下回车 说明我们要有数据加进来了, 这时候我们本地存储里面的数据也要进行更新操作
        但是在本地存储里面没有办法把数据直接追加到本地存储里面去

        所以我们可以这样

        当我按下回车之后 我们把数据追加给 local 这个数组 这样数组就更新的了数据 我们再把这个最新的数组添加给本地存储
        也就是说把本地存储里面的数据来一个替换 但是数组里面的数据是新的 就相当于完成了本地存储的更新操作
      */

      // 读取数据的操作很多地方都要用到 所以我们可以封装一个函数
      function getData() {
        let data = localStorage.getItem('todolist');

        // 如果data不是空, 说明有数据
        if(data !== null) {
          // 本地存储里面额数据是字符串格式的, 但是我们需要的是对象格式的
          return JSON.parse(data);

          // 如果为空说明没有数据, 我们返回一个 []
        } else {
          return [];
        }
      }

      // 删除操作
      // 因为删除按钮是动态创建的, 我们没办法直接绑定, 所以我们要利用on的事件委托的方法
      $('ol, ul').on('click', 'a', function() {
        // 先获取本地存储 
        let data = getData();

        // 修改数据
        // 修改数据 找到当前删除按钮对应的数据 我们要给链接自定义属性记录当前的索引号
        let index = $(this).attr('id');

        // 我们没有办法直接删除本地存储里面的数据 我们可以把data中的数据删除 然后再把data存储到本地存储里面
        data.splice(index, 1);

        // 保存到本地存储
        saveData(data)

        // 重新渲染页面
        load();
      })


      // 正在进行和已完成选项的操作
      // 我们要给复选框绑定事件, 复选框也是动态创建的 所以我们也要利用事件委派
      $('ol, ul').on('click', 'input', function() {
        // 先获取本地存储的数据
        let data = getData();

        // 修改数据
        // 我怎么知道拿到了哪个复选框呢? 也要自定义索引号? 不需要
        let index = $(this).siblings('a').attr('id');

        // 我们让复选框的选中状态和done的值挂钩 这样点击对号 就代码这个条目也完成也符合逻辑
        data[index].done = $(this).prop('checked');

        // 保存到本地存储
        saveData(data)
        // 重新渲染页面
        load();
      })

      function saveData(data) {
        // 这里我们没有办法直接使用local这个数组 它是外部的变量 所以在调用的时候 我们要将最新数组传递过来
        localStorage.setItem('todolist', JSON.stringify(data));
      }

      // 渲染加载数据函数
      function load() {

        // 渲染到页面上的话 我们需要先获取数据
        let data = getData();
        // 遍历这个数据

        // 清空ol先
        $('ol, ul').empty();

        let todoCount = 0;
        let doneCount = 0;

        $.each(data, function(index, item) {
          // 里面有几个数据 就往ol里面追加几个li
          if(item.done) {
            $('ul').prepend(`<li><input type="checkbox" checked="checked"><p>${item.title}</p><a href="#" id='${index}'></a></li>`)
            doneCount++;
          } else {
            // 我们在创建内容的时候 动态的给删除按钮添加自定义属性 把index给她
            $('ol').prepend(`<li><input type="checkbox"><p>${item.title}</p><a href="#" id='${index}'></a></li>`)
            todoCount++;
          }
        });

        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
      }
    })
 -->


### jQ插件 表单验证：

> 声明式验证
- 我们并没有写什么代码 真正的验证是插件帮你做 只需要声明各种验证规则
- 可以自定义验证错误信息
<!-- 
    /验证信息的样式 /
    .error {
      color: red;
    }

// action 提交表单的目标地址
<form id="myForm" action="xxx"> 

    input 一般标签内部都有name属性
    验证规则： required  minlength

    <p>用户名(必须, 最小6位): 
    <input name="username" type="text" required minlength="6">
    </p>
    
    验证规则： required  minlength maxlength
    <p>密码(必须,6到8位): 
    <input id="password" name="pwd1" type="password" required minlength="6" maxlength="8">
    </p>
    
    验证规则： equalTo 后面的值是选择器 意思是 要和哪个输入框进行比较 equalTo="#password"

    <p>确认密码(与密码相同):
     <input name="pwd2" type="password" equalTo="#password"></p>
    <p><input type="submit" value="注册"></p>
</form>

首先引入jQ库
<sc**pt s*c="js/jquery.js">

引入表单验证插件
<sc**pt s*c="js/jquery.validate.js">

- 需求一点提交按钮 就要验证 如果通过了就提交 不通过不提交
<input name="username" type="text" required minlength="6">

上面的标签内部有 required 不写属性值 默认为true required = 'true'

required :          这个输入框必须输入 
minlength="6" :     最小长度为6


验证规则：      默认的错误提示
required:     "This field is required.",
remote:       "Please fix this field.",
email:        "Please enter a valid email address.",
url:          "Please enter a valid URL.",
date:         "Please enter a valid date.",
dateISO:      "Please enter a valid date ( ISO ).",
number:       "Please enter a valid number.",
digits:       "Please enter only digits.",
equalTo:      "Please enter the same value again.",

maxlength: $.validator.format( "Please enter no more than {0} characters." ),
minlength: $.validator.format( "Please enter at least {0} characters." ),
rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
range: $.validator.format( "Please enter a value between {0} and {1}." ),
max: $.validator.format( "Please enter a value less than or equal to {0}." ),
min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
step: $.validator.format( "Please enter a multiple of {0}." )

    
- 具体做法
1， 引入jQ库  完整jQ库 表单验证jQ库 我们自己的js标签
2， 在标签内部书写 验证规则
3， 执行一条语句  $('对哪个表单进行验证').validate() 不加这句话 验证没办法开始

// 对对应表单开启验证
// $('#myForm').validate();

// 验证信息的自定义
$('#myForm').validate({
    messages: {
    // 错误提示信息，input标签中 有name = 'username'
    // 这里写的是 name 的属性值 
    // 如果这个input有多个验证规则 要这么写 {}
    username: {
        // 如果违反了规则 则提示
        required: '用户名必须输入',
        minlength: '用户名至少为6位'
},

pwd1: {
    required: '密码是必须的',
    minlength: '密码至少为6位',
    maxlength: '密码最多8位'
},

pwd2: {
    equalTo: '必须与密码相同'
}
}
});

笔记：
我们把验证规则写在了标签内部 也可以写在方法内部
validate()里可以传递一个对象，对象里可以传递验证规则 和 验证信息

$('#signupForm').validate({
    rules: {}       验证规则
    messages: {}    错误提示信息
});
 -->


  