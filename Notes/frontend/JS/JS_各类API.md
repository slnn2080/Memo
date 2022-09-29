
### 数组的方法

> push()        向数组的最后添加多个元素
- 返回值为新的长度
<!-- arr.push("唐僧"); -->

> pop()         删除最后一个元素
- 返回值是删掉的元素
arr.pop(); 
var result = arr.pop();

> unshift()     向数组的最前面添加多个元素
- 返回值为新的长度

> shift()       删除第一个元素
- 返回值是删掉的元素

> slice(index, index)       提取指定元素(不会改变原数组)
- 参数为开始索引（包括），结束索引（不含）, 参数1不写是从参数1以后所有, 参数负值，是从后往前

- 提取一个元素：
<!-- 两个参数为相邻： 0 1 和 1 2 和 2 3 -->
- 正值 和 负值：
<!-- 0,-1    提取 从0开始到倒数第二个 留下最后一个  -->

> splice(1, 2, 3)      删除（插入 替换）数组中的指定元素
- 1. 开始位置（包含）
- 2. 删除几个
- 3. 传递新的元素，会插在开始索引的前面

> concat()      链接数组, 添加元素
<!-- 
    arr.concat(arr2, arr3, "牛魔王", "铁扇公主");
 -->

> join()        数组 转 字符串
- 参数为数组的连接符, 默认 , 
<!-- 
    arr.join();   或者 arr.join("+");
 -->

> reverse()         反转数组(会对原数组有影响)
<!-- arr.reverse(); -->

> sort(callback)    排序
- 默认按照unicode编码进行排序
<!-- 
    arr.sort(function(a, b){
        return a-b;     升序排列
        return b-a;     降序排列
    })
 -->

> indexOf()     检查数组中某个指定的元素的位置。
- 如果字符串中含有该内容，则会返回第一次出现的索引, 如果没有找到指定的内容则返回 -1


> arr.some(function(value, index, arr) {})
- 这个方法用于检测数组中的元素是否满足指定条件, 通俗点查找数组中是否有满足条件的元素
<!-- 有没有大于20的元素, 有没有pink的元素 -->

- 注意它返回值是布尔值 如果查找到这个元素, 返回true, 如果查不到就返回false

\\\\ → 如果找到第一个满足条件的元素, 则终止循环, 不再继续
\\\\ → 如果查询数组中唯一的元素, 用some()方法更合适

- 参数
    - value:    数组当前的值
    - index:    数组当前的索引
    - arr:      数组对象本身

>>> some()的高级用法
<!-- 
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
 -->


### 字符串的方法
> str.trim()    去除两端空格
- 去除字符串两端的空白字符
- 这个方法并不影响字符串本身, 它返回的是一个新的字符串

> concat()      连接两个或者多个字符串  相当于 +

> slice(index, index)     提取字符串中指定内容(不影响原字符串)  
- 参数为开始索引（包括），结束索引（不含）, 参数1不写是从参数1以后所有, 参数负值，是从后往前

> substr(index, length)      提取字符串中指定内容  重点可以记这个
- 1，截取开始位置的索引
- 2，截取的长度

> split()       将一个字符串拆分为一个数组
- 需要一个字符串作为参数，将会根据该字符串去拆分数组
- 需要一个正则表达式
<!-- 
    var str = "abc,bcd,efg,hij";
    result = str.split(",");
 -->


> charAt(index)         获取指定位置的字符
- 根据索引获取指定字符
- 可以根据这个方法来遍历字符串


> charCodeAt(index)     获取指定位置的字符Unicode编码

> String.fromCharCode(unicode);
- 根据字符编码去获取字符

> indexOf()     检索一个字符串中是否含有指定内容
- 如果字符串中含有该内容，则会返回第一次出现的索引, 如果没有找到指定的内容则返回 -1
<!-- 
    str = "hello atguigu";
    result = str.indexOf("h");
 -->
> lastIndexOf() 检索一个字符串中是否含有指定内容(从后往前)
- 传递第二个参数，来决定开始查找的位置

> toLowerCase()
> toUpperCase()
<!-- result = str.toLowerCase(); -->



### 正则表达
> 正则表达式的语法:
{n}         正好出现的次数
{m，n}      正好出现m-n次   {1,3}1到3次     {3，}3次以上
()          编组

+           至少一个    相当于 {1， }       【ab+c 和 "abbbc"   结果是true】
*           0个或多个   相当于 {0， }       【ab*c 和 "ac" "abbbc"   结果是true】
?           0个或1个    相当于 {0，1}       【ab?c 和 "ac" "abc"   结果是true】

^           表示开头    ^a
$           表示结尾    a$
    如果在正则表达式中同时使用 ^ $则要求字符串必须完全符合正则表达式

.           任意字符除了换行 和 结束符
\           转义字符
    使用构造函数时，由于它的参数是一个字符串，而\是字符串中的转义字符
        如果要使用\ 则需要使用\\来代替
\w          任意字母和数字和_       [A-z0-9_]
\W          除了字母 和 数字 和 _   [^A-z0-9_]
\d          任意数字                [0-9]
\D          除了数字                [^0-9]
\s          空格
\S          除了空格
\b          单词边界
\B          除了单词边界

### 创建正则表达式的两种方式
let reg = \\ig
let reg = new RegExp('z正则表达式', '匹配模式');
<!-- 需要变量的话使用它 ↑-->
- i   忽略大小写
- g   全局匹配模式  不写的话 只检查一次, 写上匹配所有

### 正则对象的方法
> reg.test(被检查的字符串);
- 使用这个方法可以用来检查 当前正则表达式的规则 是否 符合str字符串,如果符合则返回true，不符合则返回false

### 跟正则表达相关的字符串的方法
> split(正则)       拆成数组
<!-- 
    var result = str.split(/[A-z]/);
 -->

> match(正则)       提取
- 可以根据正则表达式，从一个字符串中将符合条件的内容提取出来, 提取的内容会放到数组中保存

- 不仅仅可以检查str字符串, 还可以检查路径名 img.src.match('指定内容')
<!-- 
    result = str.match(/[A-z]/g);  

    if(obj.src.match('1')){
        obj.src = '../JS/JS_Study/links/2.jpg';
    }else{
        obj.src = '../JS/JS_Study/links/1.jpg';
    }
 -->

> replace(正则, '新的内容')         替换(和删除)    
- 可以将字符串中指定的内容替换为新的内容  
<!-- 
    result = str.replace("/a/gi", "@_@");
 -->

> search(正则)      搜索字符串中是否含有指定内容
- 如果搜到指定内容，则会返回第一次出现的索引，如果没有搜索到返回-1
<!-- 
    str = str.search(/^\s*|\s*$/g, "");
 -->




### 函数对象的方法

> call()
> apply()   --- 传递实参时 必须以数组的方式
- 调用方式:
- fun();
- fun.call();
- fun.apply();
<!-- 
    fun.call(obj, 参数1, 参数2);
    让这个方法临时成为obj的方法, this指向这个obj 
-->



### Date()对象
> let date = new Date();    创建当前标准时间
- 会封装为当前代码执行的时间，什么时候执行的 封装的时间就是谁
<!-- 
    let date = new Date("12/03/2016 11:10:30")
    创建一个指定的时间对象，需要在构造函数中，传递一个表示时间的字符串作为参数
 -->

> date对象的方法, 获取 秒 分 时
> .getSeconds()     秒
> .getMinutes()     分
> .getHours()       时
<!-- 
    let date = new Date();
    // 获取 秒
    let s = date.getSeconds();
    // 获取 分
    let m = date.getMinutes();
    // 获取 时
    let h = date.getHours();
 -->

> date对象的方法, 获取 日(1-31), 周(0-6), 月(0-11), 年, 时间戳
> .getDate()        号
> .getDay()         周
> .getMonth()       月
> .getFullYear()    年

> getTime()         时间戳
- 获取当前日期的时间戳



### DOM

> document.body
- 获取body

> document.documentElement
- 获取html

> document.getElementById();
- 根据id属性值获取一个元素节点对象

> document.getElementsByTagName('标签名');
- 通过标签名 获取一组 元素节点对象

> document.getElementsByName('name名');
- 通过name属性值 获取一组 元素节点对象

> document.querySelector('选择器字符串');
> document.querySelectorAll('选择器字符串');
- 通过css选择器获取一组元素节点对象 封装在数组中
- ie8 以下不支持

> document.getElementsByClassName('classname');
- 通过class属性值获取一组元素节点对象 封装到数组中
- ie9 以下不支持




### 通过具体元素节点对象 调用的方法
> 元素节点.getElementsByTagName('标签名');
- 获取指定标签名后代节点

> 元素节点.childNodes
- 获取当前节点的所有子节点
- 会获取到空白文本, 和子元素

> 元素节点.children
- 获取当前节点的所有子元素

> 元素节点.firstChild
- 获取当前节点的第一个子节点（会获取到空白文本）

> 元素节点.firstElementChild
- 获取当前节点的第一个子元素（ie9以下不支持）

> 元素节点.lastChild
- 获取当前节点的最后一个子节点
- 父节点[父节点.children.length-1]

> 元素节点.parentNode
- 获取当前节点的父节点

> 元素节点.previousSibing
- 获取当前节点的前一个兄弟节点

> 元素节点.previousElementSibing
- 获取当前节点的前一个兄弟元素

> 元素节点.nextSibing
- 获取当前节点的后一个兄弟节点


### 获取元素属性值
> element.属性
- 只能获取到内定的属性, 比如程序员自己添加的自定义属性获取不到
<!-- 
    <div class='demo' index='1'></div>
 -->

> > element.属性 = '属性值';


### 获取属性节点, 设置属性节点
> 元素节点.getAttrbuteNode('属性名');
- 通过元素节点 获取指定的属性节点 需要得到值的话 要加value
- 可以获取到 自定义属性

> 元素节点.setAttributeNode('属性名');
<!-- 
    let classname = document.createAttribute('class');
    classname.value = '属性值'
    h1.setAttributeNode(classname); 
 -->

### 获取, 设置属性值
> 元素节点.getAttribute('属性名')
- 直接获取到属性值

> 元素节点.setAttribute('属性名', '属性值');
- 将指定属性设置或修改为指定的值, ie8以及一下不支持



### 追加 & 删除 & 替换 & 插入
> 父节点.appendChild(子节点);
- 调用父元素的方法，向父节点中追加一个新的子节点

> 父节点.removeChild(子节点);
- 调用父元素的方法，删除子节点;
> 子节点.parentNode.removeChild(子节点);


> 元素对象.remove()
- 可以直接删除指定的元素


> 父节点.replace(新节点，旧节点);
- 调用父元素的方法，替换已有的子节点

> 父节点.insertBefore(新节点，旧节点);
- 调用父元素的方法，在指定的子节点前面插入新的节点
- 让留言总是在最上面
<!-- 
    ul.insetBefore(li, ul.children[0]);
 -->


### 追加
> 元素对象.insertAdjacentHTML()
- 以直接把字符串格式元素添加到父元素中

- 参数:
- 插入的位置
    - beforebegin:  元素自身的前面  (插入到父元素的前面, 外部)

    - afterbegin:   插入元素内部的第一个子节点之前
    - beforeend:    插入元素内部的最后一个子节点之后 相当于appendChild

    - afterend:     元素自身的后面  (插入到父元素的后面, 外部)
- 插入的字符串
- 使用方法:
    let html = '<div id='two'>two</div>';
    div.insertAdjacentHTML('beforeend', html)

<!-- 
    appendChild不支持追加字符串的子元素(只能通过createELement创建的元素才能用appendchild) 
    
    insertAdjacentHTML支持追加字符串的元素
 -->



### 创建 & 设置
- document对象的方法

> document.createAttribute('')
- 创建属性节点

> document.createElement('标签名');
- 创建标签(元素)节点

> document.createTextNode('内容')
- 创建文本节点



### 修改元素的样式
元素对象.style.样式名 = '值';



### 读取元素的样式
> 元素对象.style
- 仅能读取到内联样式，样式表里的样式读取不到

> 元素对象.currentStyle.样式名;
- 只有ie支持，其它浏览器不支持，没有设置样式会读取默认值
<!-- let result = box.currentStyle.width -->

> getComputedStyle(元素对象	& null) --- 是window方法 可直接使用
- 会读取到真实的值, 带单位, ie9以上才支持
<!-- let result = getComputedStyle(box, null).width; -->



### 读取, 设置元素对象的class
> 元素对象.className
- 读取className

> 元素对象.className = '属性值'
- 使用 += ,    属性值前要有空格
<!-- 
    box.className += ' b1'
 -->


### classList属性:
- 该属性用于在元素中添加，移除及切换 CSS 类。
> 只读：
元素对象.classList

> 添加：
元素对象.classList.add('类名')
在元素中添加一个或多个类名。如果指定的类名已存在，则不会添加

> 删除：
元素对象.classList.remove('类名')
移除元素中一个或多个类名。注意： 移除不存在的类名，不会报错。

> 切换：
元素对象.classList.toggle(class, true|false)
在元素中切换类名。
第一个参数为要在元素中移除的类名，并返回 false。如果该类名不存在则会在元素中添加类名，并返回 true。

> 替换类
元素对象.classList.replace("select","newSelect");
- 替换类：新类newSelect替换老类select;

> 判断：
元素对象.classList.contains()
判断是否有这个类


### 读取元素对象的具体样式
> 元素对象.offsetParent
- 获取当前元素最近开启了定位的祖先元素 如果所有的祖先元素都没有开启定位则返回body

> 元素对象.offsetLeft
- 获取元素对象 相对于定位父元素 的水平偏移量

> 元素对象.offsetTop
- 获取元素对象 相对于定位父元素 的垂直偏移量

> 元素对象.clientWidth
> 元素对象.clientHeight
- 获取 可见框 的宽度 和 高度	包括内容区 内边距  不包括border 和 滚动条的位置

> 元素对象.offsetWidth
> 元素对象.offsetHeight
- 获取 元素对象 整个的宽度 和 高度     包括内容区 内边距 border 滚动条

> 元素对象.scrollWidth
- 获取元素整个滚动区的宽度
> 元素对象.scrollHeight
- 获取元素整个滚动区的高度

> 元素对象.scrollLeft
- 获取水平滚动条 滚动的距离
> 元素对象.scrollTop
- 获取垂直滚动条 滚动的距离



### 事件

> transitionend
> animationend
- 过渡动画完成后, 触发的事件, 使用addEventListener绑定

> 检查过渡是否完成:
- 当过渡完成后会触发该事件, 每一个拥有过渡的属性完成时 都会触发一次transitionend事件
<!-- 
    比如 width height的过程完成 会触发两次alert事件 
-->

> onresize
- 事件会在窗口或框架被调整大小时发生。
- 所有带位置 视口尺寸的 在视口缩放时都需要在 window.onresize里重新重置下

> onload
- 事件会在整个页面加载完成之后才触发

> onscroll
- 该事件会在元素的滚动条滚动时触发

> onclick           单击响应事件
- 不只是与鼠标点击动作, 用Tab键移动到某个链接然后按下回车键的动作也会触发onclick事件

> ondblclick		双击响应事件
> onmousemove       移入响应事件
> onmousedown       鼠标被按下事件
> onmouseup		    鼠标按键被松开时

> onmouseover
> onmouseout
- 会冒泡

> onmouseenter
> onmouseleave
- 不会冒泡

> onkeydown         键盘按键被按下
> onkeyup           键盘按键被松开
<!-- 一般绑定给可以获取焦点的对象document， input -->

> onabort           事件会在图像加载被中断时发生
<!-- 与 img 标签配合使用 -->

> onblur            事件会在对象失去焦点时发生
<!-- 离开输入框时被触发 -->

> onfocus           事件在对象获得焦点时发生
<!-- 进入输入框时被触发 -->

> onchange          改变文本框的内容后 会被触发
> onchange          当状态被改变时会触发

> oninput           当input的value值发生变化时就会触发
- 与onchange的区别是不用等到失去焦点就可以触发了

> onselect          当input里的内容文本被选中后执行
- 只要选择了就会触发，不是全部选中

> onmousewheel	    鼠标滚轮滚动事件(火狐不支持该事件)
- event.wheelDelta, 向上：120, 向下：-120
> DOMMouseScroll	火狐鼠标滚轮滚动事件(addEventListener()绑定)
- event.detail	    向上：-3, 向下：为3

> contextmenu   禁止鼠标右键菜单
- 主要控制应该何时显示上下文菜单, 主要用于程序员取消默认的上下文菜单
- 比如鼠标的右键菜单
<!-- 
    document.addEventListener('contextmenu', function(e){
        e.preventDefault();
    })
 -->

> selecstart    禁止鼠标选中
- 这个事件会在选中文字后触发
<!-- 
    document.addEventListener('selecstart', function(e){
        e.preventDefault();
    })
-->







### 事件对象

> event.clientX
> event.clientY
- 当事件被触发时，可以获取鼠标指针在 当前的 可见窗口的 水平 和 垂直 坐标

> event.pageX
> event.pageY
- 可以获取鼠标相对于当前页面的坐标, ie8中不支持

> event.keyCode
- 获取按键的编码，通过它可以知道哪个按键被按下
> event.altKey
> event.ctrlKey
> event.shiftKey

> event.cancelBubble = true;
- 取消冒泡

> event.target
- 事件冒泡会绑定给共同的祖先元素 那究竟点击时触发的是哪个元素
- 利用classname 和 event.target可以让 目标元素对象触发事件
<!-- 
    if(event.target.className == 'link'){
        alert('我在目标元素对象里出现了')
    }
 -->

> event.preventDefault()
- 使用addEventListener()方法绑定响应函数，取消默认行为时event.preventDefault()
- IE8不支持
<!-- event.preventDefault && event.preventDefault(); -->



### 事件的捕获
> 元素对象.setCapture()
> 元素对象.releaseCapture()
- chrome使用会报错
<!-- setCapture && setCapture(); -->



### 让页面滚动到指定位置
> window.scroll(x, y);
- 可以让窗口的滚动到指定位置
- 不用加单位 直接写数字即可
    window.scroll(0, 100)



### window.pageYOffset 页面被卷进去的距离
> window.pageYOffset / pageYOffset
> window.pageXOffset / pageXOffset
- 这两个属性 可以获取 页面被卷去了多少
- 设置或返回当前页面相对于窗口显示区左上角的 X 位置。
- 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。

- 页面被卷去的头部(scrollTop) 可以通过window.pageYOffset获得, 如果是被卷去的左侧 window.pageXOffset 

> 注意: 
- 元素的内容被卷进去多少是 ele.scrollTop获取的, 比如是某个盒子被卷进去多少
- 如果是页面被卷进去多少则是window.pageYOffset

> 兼容性注意:
- 页面被卷去的头部, 有兼容性问题, 因此被卷去的头部通常有如下的几种写法

> 声明了DTD 使用document.documentElement.scrollTop;

> 未声明DTD 使用document.body.scrollTop;

> 新方法    window.pageYOffset / pageYOffset  ie9以上支持

> 自定义函数写法(pink)
<!-- 
    function getScroll() {
        return {
            left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,

            top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        }
    }

    // 使用的时候
    getScroll().left / top
 -->


### ES6中 浅拷贝的方法
> Object.assign(拷贝给谁, 拷贝哪个对象);
- 浅拷贝只会拷贝更深层次的对象数据时, 只会拷贝地址值
<!-- 
    let obj = {
        id: 1,
        name: 'andy',

        msg: {
            age:1
        }
    };

    let o = {}

    Object.assign(o, obj);
    console.log(o);
 -->

> 深拷贝
<!-- 
    let obj = {
        id: 1,
        name: 'andy',

        msg: {
            age:1
        },
        color: ['pink', 'red', 'blue']
    };

    let o = {}

    function deepCopy(newobj, oldobj) {
        for(let k in oldobj) {
            let item = oldobj[k];
            if(item instanceof Array) {
                newobj[k] = [];
                deepCopy(newobj[k], item);

            } else if (item instanceof Object) {  
                newobj[k] = {};
                deepCopy(newobj[k], item);
            } else {
                newobj[k] = item;
            }
        }
    }
    deepCopy(o, obj)
    console.log(o);
 -->
