### jQ函数分两个方面
1、当函数用： $(参数)
参数  function      相当于window.onload = function(){}
参数  选择器字符串   查找所匹配的DOM元素，返回的是jQ对象 内部包含着DOM元素
参数  标签名        创建标签DOM元素对象 并 包装成jQ对象返回
参数  DOM元素       将DOM元素对象包装成jQ对象返回，我们会经常使用$(this)  尤其是在事件的回调函数中

2、当对象用： $.xx()
$.each(obj / arr, function(attrname, index, value){});
隐式遍历数组

$.trim(str);
去除两端的空格

------

### jQ核心对象
包含着所匹配的n个DOM元素的伪数组对象，通过执行$()返回的就是jQ对象
@jQ对象的特性：
1、length / size()
得到DOM元素的个数
let $buttons = $('button');
$buttons.length
$buttons.size()

2、[index] / get(index)：
得到指定下标对应的DOM元素
let $buttons = $('button');
$buttons[1].innerHTML;
$buttons.get(1).innerHTML

3、each(function(index, domEle){})
遍历所有DOM元素（内部包含的DOM元素）

4、index()
得到当前DOM元素在所有兄弟中的下标，只会取得一个数字
$('#btn3').index();

------

###  $ 工具的方法
$.each(obj, function(attrname, attribute){})
遍历数组或对象中的数据
对象：  属性名 -- 属性值
数组：  索引   -- 属性值

$.trim()
去除字符串两端的空格

$.type(obj)
获取对象的数据类型

$.isArray(obj)
判断是否是数组

$.isFunction(obj)
判断是否是函数

$.parseJSON(json);
将JSON字符串 转换为 js对象

------

###  读取、设置对象内部内容
jQ对象.html()
读取时 只会 获取第一个匹配元素的内容
$('p').html();
设置时 会   设置所有匹配元素的内容
$('p').html('hello');

jQ对象.text()
获取所有匹配到的内容 组在一起的文本
$('p').text();
设置时 会   设置所有匹配元素的内容
$('p').text('hello');

jQ对象.val();
获取匹配元素的当前值，如果有多个会返回一个数组
$('input').val();
设置时 会   设置所有匹配元素的内容
$('input').val('hello');

------

###  元素的遍历
jQ对象.each(function(){})
$btns.each(function () {
  console.log(this.innerHTML)
})

------

###  选择器

@层次选择器 找 子孙后代 兄弟元素的
selector1 > selector2   指定父元素下 所有子元素
selector1 selector2     指定祖先元素下 所有的后代元素
selector1 + selector2   找的是后面紧挨着的一个兄弟元素
selector1 ~ selector2   找的是后面的所有兄弟元素



@过滤选择器 在匹配的元素中 筛选出一些
:first
匹配元素中的 第一个 元素

:last
匹配元素中的 最后一个 元素

:eq(index)
根据下标匹配一个指定元素

:not(selector)
匹配除了指定元素外 其他元素

:lt 和 :gt
:lt 匹配小于 给定索引 的元素
:gt 匹配大于 给定索引 的元素
$('tr:gt(2)')
小于3 大于0
$('li:lt(3):gt(0)').css('backgroundColor', 'red');

:even
匹配所有索引值为偶数的元素 从0开始
:odd
匹配所有索引值为奇数的元素 从0开始

:hidden
:visible
匹配隐藏 与 显示的元素

:contains(text)
text：一个用以查找的字符串
$("div:contains('John')")
查找所有包含 "John" 的 div 元素

[attrName]
[attrName = value]
根据属性名 和 属性值 匹配元素



@表单选择器
:input
查找所有的input元素 包括 input, textarea, select 和 button

:text
匹配所有的单行文本框

:password
匹配所有密码框

:radio
匹配所有单选按钮

:checkbox
匹配所有复选框

:submit
匹配所有提交按钮
button平时也要使用type属性 要不也会被匹配到

:reset
匹配所有重置按钮

:button
匹配所有按钮

$("input:enabled")
匹配所有可用元素

$("input:disabled")
匹配所有不可用元素

$("input:checked")
匹配所有 被选中元素(复选框、单选框等，select中的option)
- 对于select元素来说，获取选中推荐使用 :selected
$("select option:selected")   匹配所有选中的option元素

------

###  对匹配到的元素 进一步的筛选
分为 过滤 和 查找
过滤：
在当前jQ对象中包含的所有元素中 找出部分元素出来
返回的是 DOM元素 可以再次封装成jQ对象返回
比如我有一堆li 现在要找其中的某一个 这就属于过滤的行为

过滤中的方法也是jQ对象的方法，一个jQ对象内部包含着多个DOM元素
所谓的过滤也就是对jQ对象内部包含的DOM元素 再次进行 过滤 和 查找
过滤之后返回的还是一个jQ对象 一个新的对象 也就是说我对 对象1 进行过滤后 产生的 对象2

查找：
在jQ对象内部元素的子孙 兄弟 父母元素，再讲他们封装成新的jQ对象返回

过滤的方法：
jQ对象.first()
筛选jQ对象从而获取第一个元素

jQ对象.last()
筛选jQ对象从而获取最后一个元素

jQ对象.eq(index|-index)
筛选jQ对象从而获取jQ对象中第N个jQ对象
index为正值 从0起代表第一个，index为负值，从后往前 -1代表第一个
返回的是jQ对象
类似的有get(index),不过get(index)返回的是DOM对象。

---

jQ对象.filter();
筛选出与指定表达式匹配的元素集合
参数的类型为字符串，传 选择器的表达式
$("p").filter(".selected, :first")

jQ对象.not('选择器字符串' | dom元素);
筛选出除了指定元素外的 其余元素

jQ对象.has('选择器字符串' | dom元素);
筛选jQ对象，选择符合has()括号中的元素

---

filter('类似过滤选择器')        跟选择器    匹配的
选择器是对当前包含的元素提要求

not('选择器')                  跟选择器 不 匹配的       
选择器是对当前包含的元素提要求

has('选择器')                  过滤有某一个子元素的     
选择器是对当前元素子孙元素提要求 

-------------------------

###  查找
在已经匹配出的元素集合中根据选择器查找孩子/父母/兄弟标签

1. children(): 子标签中找
2. find() : 后代标签中找
3. parent() : 父标签
4. prevAll() : 前面所有的兄弟标签
5. nextAll() : 后面所有的兄弟标签
6. siblings() : 前后所有的兄弟标签

jQ对象.children();
查找jQ对象的所有子元素
传递 选择器字符串 作为参数时
查找指定的子元素

jQ对象.find()
查找jQ对象的后代元素
参数：选择器的字符串

jQ对象.parent();
查找jQ对象的父元素
参数: 选择器字符串 来获取符合参数的元素 

jQ对象.prevAll();
查找当前jQ对象 之前 的 同辈元素
参数: 选择器字符串 来获取符合参数的元素 
$('div:last').prevAll().addClass('xxx');

jQ对象.nextAll();
查找当前jQ对象 之后 的 同辈元素

jQ对象.siblings()
查找jQ对象的 同辈元素(兄弟元素)
参数: 选择器字符串 来获取符合参数的元素 

-------------------------

###  读取、修改 对象的样式 和 属性
jQ对象.css();
修改一个样式时，属性名 和 属性值都要加上''
修改多个样式时，要传递一个对象，单位可以省略 属性名不用加引号 用驼峰式写法

读取  只传递一个属性名作为参数  读取到的带单位 是一个字符串

jQ对象.addClass()
添加多个类时，用空格隔开
jQ对象.addClass('类名' '类名2')
$('p').addClass('test'+' '+'test1');

jQ对象.removeClass()
从匹配的元素中删除  指定的类（传递类名） 或 全部的类（不传参数）

-------------------------

###  读取、设置 跟属性相关
jQ对象.attr()
读取  jQ对象.attr('属性名');
设置  jQ对象.attr('属性名', '属性值');
设置  jQ对象.attr( { 属性名:'属性值', 多个 } )

jQ对象.prop()
$("input[type='checkbox']").prop("checked");

attr(): 专门操作属性值为非布尔值的属性
prop(): 专门操作属性值为布尔值

jQ对象.removeAttr('属性名')
删除对应元素的属性

-------------------------

###  读取、设置元素坐标
获取 left 或者 top的值 可以
jQ对象.position().left

offset()
读 和 写  当前元素的坐标，原点是页面的左上角
返回来的是一个对象，里面有top 和 left属性
$('.test').offset({left:0, top:0});

position()
读        当前元素的坐标，原点是父元素左上角
父元素开启定位后 原点为父元素的左上角
父元素没有开启定位时，原点是body
返回来的是一个对象，里面有top 和 left属性


scrollTop()
读 和 写  元素/页面的滚动条坐标
scrollLeft()
读 和 写  元素/页面的滚动条坐标
读的时候
$('html').scrollTop() + $('body').scrollTop();
读的时候不能 $('html, body') 这样写，要不只会读取一个
设置的时候
$('html, body').scrollTop(300);

// 瞬间回到顶部 让我们页面的滚动条的值为0 我们可以找html,body
$('#to_top').click(function(){
$('html, body').scrollTop(0);
}

-------------------------

###  尺寸
width()  /  height()
内容区的宽 高

innerWidth()  /  innerHeight()
内容区 + 内边距的宽 高

outerWidth()  /  outerHeight()
内容区 + 内边距 + 边框 （外边距）

-------------------------

###  文档的增删改

@增加：
// 内部插入（在标签内部插入）
jQ对象.append(content);
向jQ对象元素内部的最后插入指定内容

jQ对象(创建的内容).appendTo(jQ对象);
把内容添加到 jQ对象 的最后

jQ对象.prepend(content);
向jQ对象元素内部的最前面插入指定内容

jQ对象(创建的内容).prependTo(jQ对象);
把内容添加到 jQ对象 的最前


// 外部插入（在标签外部插入）
jQ对象.before(content);
将指定内容插入到当前所有匹配元素的 前面（任意元素的前面 不是最前和最后）
$("p").before("<b>Hello</b>");
<b>Hello</b><p>I would like to say: </p>

jQ对象.after(content);
将指定内容插入到当前所有匹配元素的 后面（任意元素的前面 不是最前和最后）


@替换
jQ对象.replaceWith(content);
将jQ对象里的元素替换成content(指定的HTML或DOM元素)。


@删除
jQ对象.empty()  掏空会留下标签
删除所有匹配元素的子元素

jQ对象.remove() 删除标签页没有了
删除所有匹配的元素
参数：选择器的字符串 用来再次精确删除对象

-------------------------

###  事件模块 相关

@ 绑定事件
jQ对象.eventName(function(){})
通用的绑定事件监听，有些不支持

jQ对象.on('eventName', function(){})
可以绑定多个事件，通用

@ 解绑事件
jQ对象.off(eventName)


// 常用的事件
jQ对象.hover(fn1, fn2);
当鼠标移动到一个匹配的元素上面时，会触发指定的第一个函数。
当鼠标移出这个元素时，会触发指定的第二个函数。

jQ对象.on('mouseenter',function(){});
鼠标移入当前元素才会触发事件
jQ对象.on('mouseleave', function(){});
鼠标移出当前元素才会触发事件
jQ对象.on('mouseenter', function(){}).on('mouseleave',function(){})

jQ对象.on('mouseover', function(){})
jQ对象.on('mouseout', function(){})
移入子元素时也会触发事件




@ 事件委托
jQ对象(parentSelector).delegate('childrenSelector', 'eventName', function(){})
将子元素的事件 委托给父元素处理
1、事件监听绑定在父元素，事件发生在子元素上
2、当操作任何一个子元素(li)时，事件会冒泡到父元素上
3、最终调用事件回调函数的是 子元素,event.target发生事件的子元素


@ 解除事件委托
jQ对象(parentSelector).undelegate([eventName]);
不传参数就是解除所有的事件


@ 事件对象
先传event参数
event.clientX, event.clientY    
相对于视口的左上角（视口是固定的）

event.pageX, event.pageY
相对于页面的左上角（页面会有滚动条 原点可能滚进去）

event.offsetX, event.offsetY
相对于事件元素左上角
比如点按钮 就是按钮的左上角


@ 事件相关
停止事件冒泡
event.stopPropagation();

阻止事件的默认行为
event.preventDefault()

-------------------------

###  效果模块

// 淡入、淡出、切换

jQ对象.fadeIn([speed], [easing], [callback])
改变透明度实现慢慢淡入效果 
jQ对象.fadeOut([speed], [easing], [callback])
改变透明度实现慢慢淡出效果
"slow", "normal",  or  "fast" 或者 600 400 200 1000

jQ对象.fadeTo([speed], [easing], [callback], opacity)
将对象的透明度调整到指定值
$("p").fadeTo("slow", 0.66);

jQ对象.fadeToggle(speed, [easing], [callback])
如果是隐藏就慢慢显示出来 如果是现实的状态就慢慢消失



// 展开、收缩、切换

jQ对象.slideDown([speed], [easing], [callback])
通过高度变化（向下增大）来动态地显示所有匹配的元素
jQ对象.slideUp([speed], [easing], [callback])
通过高度变化（向上减小）来动态地隐藏所有匹配的元素
jQ对象.slideToggle()
切换 展开 收缩



// 显示、隐藏、切换（没有动画）

jQ对象.show([speed], [easing], [callback])
jQ对象.hidden([speed], [easing], [callback])
jQ对象.toggle([speed], [easing], [callback])
默认瞬间显示 传递speed可有动画效果
带动画的话 是通过改变 宽 高 透明度 从左上角开始变化



// 自定义动画的函数

jQ对象.animate(params,[speed],[easing],[fn])
属性名必须用骆驼形式
属性值表示这个样式的属性到多少时动画结束。
left: '+=100'
{
  属性名:'值'；   //数字不用括号
}

// 写在一起宽度 和 高度同时变化
$('.div1').animate({
  width:200,
  height:200
},1000)

// 分开写的话 宽 和 高先后变化
$('.div1').animate({width:200}).animate({height:200});

// 跟上面没有什么区别只是写在了回调函数里
$('.div1').animate({width:200}, function(){
  $('.div1').animate({height:200})
})
- 注意：
所有用于动画的属性必须是数字的，除非另有说明；这些属性如果不是数字的将不能使用基本的jQuery功能。
比如常见的，border、margin、padding、width、height、font、left、top、right、bottom、wordSpacing
等等这些都是能产生动画效果的。
background-color很明显不可以，因为参数是red或者GBG这样的值，非常用插件，否则正常情况下是不能只用动画效果的。


jQ对象.stop([clearQueue],[jumpToEnd])
停止动画
不传参数立即停止动画
$('#navigation>ul>li:has("ul")').hover(
function(){
  $(this).children("ul").slideDown(1000)
}, 
function(){
  $(this).children("ul").stop().slideUp(1000)
})
移入多次拿开鼠标 效果还会依次出现，所以加上stop()停止上次的效果

jQ对象.delay(duration,[queueName])
延时来推迟执行队列中之后的项目
$('#foo').slideUp(300).delay(800).fadeIn(400);
推迟800毫秒后 进行淡入效果


-------------------------


###  多库共存
jQuery.onConflict()
把下面库的 $使用权 让渡给 上面的库 下面的库 只能用jQuery

一， 我创建一个js文件 内容写上
(function(){
  window.$ = function(){
      console.log('my lib $()...');
  }
})()
二， 我们在文件中引入这个库
<script src="js/myLib.js"><script>
<script src="js/jquery-1.10.1.js"><script>
这时候我们有两个库了

$();         
我们自己写的js文件里的函数 没有执行，因为被第二个引入的js库覆盖了
多库共存的想法是 js/jquery-1.10.1.js 不用 $ 了  让 js/myLib.js 使用 $
那只能释放 $ 的使用权
jQuery.onConflict()   这时候就释放了 $ 的使用权
这时候还想用 js/jquery-1.10.1.js 这个库 我们只能 使用 jQuery 了






问题集：
let $btn = $('button');     --->  这样返回的是dom元素 所以只能用dom的方法 混着用会报错
对上解析：
let $result = $('div.test').css('width');
console.log(parseInt($result))
返回的是一个DOM元素 因为可以用parseInt方法取整

还有种理解不知道对不对，jQ对象是DOM元素的结合 如果取的是一个集合
那就是jQ对象
取的是当中的某一个元素 那一定是DOM对象
target[index].style.display = 'block';

-----

过滤 和 查找 的区别
过滤 是在原有匹配的基础上 进一步的过滤 筛选出来一些
$('选择器') 是把一组DOM元素包装成了一个jQ对象
jQ对象.过滤方法()，是在内部的DOM元素中 再次过滤吧

查找 找的是 jQ对象内部元素的 子孙 兄弟 父母元素

基本理念是
先用选择器 选出一组jQ对象，然后可以对这个jQ对象 进一步的过滤
查找的话是找jQ对象的子孙 兄弟 父母元素

-----

$('<tr></tr>')
  .append('<td>'+empName+'</td>')
  .append('<td>'+email+'</td>')
  .append('<td>'+salary+'</td>')
  .appendTo('#employeeTable>tbody')
  .find('a')
  .click(clickA);

这种方式我觉得特别有逻辑性 阅读性也非常的好

-----

checkAllBox
$checkedAllBox.prop('checked', $items.filter(':not(:checked)').length === 0);
利用 === 的结果 动态的改变 true false的值

-----

一个函数 两种情况都可以用的情况下 我们可以将 boolean值传递进去
当 true 是一种效果
当 false 是一种效果
1、nextPage(false);
2、function nextPage(next){
  let offset = next? -PAGE_WIDTH:PAGE_WIDTH;
}

-----

@ jQ插件 相关

我们学习到现在              网页上的叫法
$       叫做jQ核心函数      jQ对象
$()     叫做jQ对象          jQ元素集


说白了 它有两种扩展
一个是扩展 $    的方法      把 $ 当成对象使用   使用方法：  $.xxx()
一个是扩展 $()  的方法      使用方法  先找到jQ对象         $('tt').xxx() 

插件机制：
扩展 jQuery函数对象的方法
$.extend(function(){
xxx: function(){
    这里的this是谁，很简单 看谁调的 这个xxx函数是谁调用的？ $吧 this就是$
}
})
- 调用：$.xxx()
扩展jQuery对象的方法
$.fn.extend(function(){
xxx: function(){
    这里的this是谁，jQ对象的方法 得先得到jQ对象吧 那this就是那个jQ对象
}
});
- 调用：$('tt').xxx() 

扩展jQuery的工具方法        
$.extend(object)
- 扩展jQuery对象本身。
- 用来在jQuery命名空间上增加新函数。 查看 'jQuery.fn.extend' 获取更多添加插件的信息。
- eg：
在jQuery命名空间上增加两个函数。
jQuery.extend({
min: function(a, b) { return a < b ? a : b; },
max: function(a, b) { return a > b ? a : b; }
});
- 结果：
jQuery.min(2,3);        // => 2
jQuery.max(4,5);        // => 5



扩展jQuery对象的方法        
$.fn.extend(object)
- 给我们的jQ对象 增添方法 在调用的时候
- $.check()  这样不行，因为我们给jQ对象添加的方法 我们在调用时 要 $().check()

- 扩展 jQuery 元素集来提供新的方法（通常用来制作插件）。
- eg:
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



需求：1. 给 $ 添加4个工具方法:
* min(a, b) : 返回较小的值
* max(c, d) : 返回较大的值
* leftTrim() : 去掉字符串左边的空格
* rightTrim() : 去掉字符串右边的空格
需求：2. 给jQuery对象 添加3个功能方法:
* checkAll() : 全选
* unCheckAll() : 全不选
* reverseCheck() : 全反选
* 

首先要先引入 jQ库 因为我们的插件是基于 jQ语法写的

<script src="js/jquery.js"><script>
<script src="js/my_jQuery-plugin.js"><script>
<script>

console.log($.min(3, 5), $.max(3, 5));
let str = '     my     ';
console.log($.leftTrim(str), $.rightTrim(str));

/* 
需求：2. 给jQuery对象 添加3个功能方法:
* checkAll() : 全选
* unCheckAll() : 全不选
* reverseCheck() : 全反选 
* 
reverseCheck    以前要完成这个效果 必要要遍历 现在让它直接能调用
/

$('#checkedAllBtn').click(function(){
$(':checkbox[name=items]').checkAll();
});
$('#checkedNoBtn').click(function(){
$(':checkbox[name=items]').unCheckAll();
});
$('#reverseCheckedBtn').click(function(){
$(':checkbox[name=items]').reverseCheck();
});
<script>

我们的js文件里 是这么写的 主要看下 反选 这个理念 应该很多情况都用的到

(function(){
// 给jQ核心函数扩展方法     用这个语法 $.extend(object)    参数为对象
// 扩展 $ 的方法
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
/* 
* checkAll() : 全选
* unCheckAll() : 全不选
* reverseCheck() : 全反选
/

checkAll: function(){

// 我们先想想 这个方法checkAll() 到时候谁来调 jQ对象来调用吧 现在我要选中
// this 现在是谁 是DOM元素对象 还是jQ对象？ 一个函数中的this是谁看谁来调用 这个方法是jQ对象调用的
// 所以this就是jQ对象

this.prop('checked', true)
},
unCheckAll:function(){
this.prop('checked', false)
},
reverseCheck:function(){

// 因为不知道当前包含的DOM元素都是什么状态 我们需要去遍历
// 现在的this是谁？ this 是jQ对象 既然是jQ对象 用什么方法能遍历元素？ 
this.each(function(){
// 这个函数中又有一个this 现在this是谁？遍历里面的对象 this是DOM元素
this.checked = !this.checked;
})
}
})
})();


