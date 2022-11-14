
### canvas 基本用法：
- <canvas> 是 HTML5 新增的元素，可用于通过使用 JavaScript 中的脚本来绘制图形 canvas 就相当于一个画布，要是画图的话 还是需要 js 可以用于绘制图形，创建动画。
- <canvas> 看起来和 <img> 元素很相像 唯一的不同就是它并没有 src 和 alt 属性。

- <canvas> 标签只有两个标签属性 width 和 height。这些都是可选的。
- 当没有设置宽度和高度的时候，canvas 会初始化宽度为 300 像素和高度为 150 像素。

**注意:**
- 1. 不要用 css 给 canvas 指定高宽 它会缩放里面的内容的 **使用内联样式定义 canvas 画布的大小**
- 2. ie8 以及以下不支持 canvas 但在这些浏览器上你应该要给用户展示些替代内容。支持 <canvas>的浏览器将会忽略在容器中包含的内容，并且只是正常渲染 canvas。不支持 <canvas>的浏览器会显示代替内容

```html
<canvas id='test' width='300px' height='300px'>
  <span>您的浏览器不支持画布元素</span>
</canvas>
```

> canvas的作用
- 绘制图形和图像处理

----------------

### 获取画布 和 画笔

> 画布对象.getContext("2d")
- 获取画笔的方法

- 参数:
- 2d -- canvas
  - 表示该<canvas>节点生成 2D 的平面图像

- 3d -- webgl
  - 生成 3D 的立体图案，这部分属于 WebGL API。

- <canvas> 元素只是创造了一个固定大小的画布，要想在它上面去绘制内容，我们需要找到它的渲染上下文 这个方法是用来获得渲染上下文和它的绘画功能。

- 支持检查性 因为我们写的是 js 代码，ie8 以及以下不支持 canvas 要是不写检查性就会报错的

```js
let canvas = $("#canvas")[0]
let ctx;

// 看看有没有getContext方法 如果有的话再创建画笔
if(canvas.getContext) {
  ctx = canvas.getContext("2d")
}
```

----------------

### Canvas API：绘制图形
- Canvas 画布提供了一个作图的平面空间，该空间的每个点都有自己的坐标。
- 原点(0, 0)位于图像左上角，x轴的正向是原点向右，y轴的正向是原点向下。

----------------

### 绘制矩形：
- 在 canvas 中通过调用一个方法能画出来的图形只有矩形，
- 所有其他的图形的绘制都至少需要生成一条路径

- canvas 提供了三种方法绘制矩形(调用画笔的方法)：

> ctx.fillRect(x, y, width, height)
- 绘制一个填充的矩形（填充色默认为黑色)

> ctx.strokeRect(x, y, width, height)
- 绘制一个矩形的边框（默认边框为:1px 实心黑色）

- 参数:
- 指定矩形的位置 和 大小(大小不用指定单位)

```js
let canvas = $("#canvas")[0]
let ctx;
if(canvas.getContext) {
  ctx = canvas.getContext("2d")
}

// 填充色的正方形
ctx.fillRect(0, 0, 100, 100)

// 实现边框的正方形
ctx.strokeRect(0, 0, 100, 100)
```

**注意：**
> 通过ctx.strokeRect()方法绘制的正方形 边框会是2px
- css 中不能出现 0.5px（会进位），所以自动渲染为 1px，
- stroke 中默认边框为 1px，但是是 x 上边 0.5，x 下边 0.5

- 这样 css 在渲染时会自动调整为 2px
- 如果想画一个 1px 边框 可以调整偏移量，*在 x y 上写小数*

```js
ctx.strokeRect(0.5, 0.5, 100, 100)
```


> ctx.clearRect(x, y, width, height)
- 清除指定矩形区域，让清除部分完全透明。*填充的永远是底色*
- 效果其实是拿一个指定大小的矩形盖在上面

- 用于擦除指定矩形区域的像素颜色，等同于把早先的绘制效果都去除。

- 参数:
- x, y ： 指定了在 canvas 画布上所绘制的矩形的左上角（画布的左上角为原点）的坐标。
- w, h ： width 和 height 设置矩形的尺寸（存在边框的话，边框会在 width 上占据一个边框的宽度，height 同理） 不用加单位

```js
let canvas = $("#canvas")[0]
let btn = $("button")[0]

let ctx;
if(canvas.getContext) {
  ctx = canvas.getContext("2d")
}

// x y不带.5 所以绘制的正方形的边框是2px
ctx.strokeRect(0, 0, 100, 100)

// 在同位置使用该方法 可以创建一个底色同宽高的正方形盖在目标上 实现1px的边框
ctx.clearRect(0, 0, 100, 100)
```

----------------

### 在 canvas 上添加样式
- canvas 上的任何元素，不能通过 css 来渲染，只能通过 canvas 自身的方法来处理 **不能加单位哦**
- canvas 里必须要有同步思维，自上而下的显示效果 比如 样式的设定 **要先设定完 再绘制**

> 画笔身上的属性：
- 下面的这些属性都可以通过 k = "v" 的形式来进行赋值 **不用加单位**

> ctx.fillStyle
- 设置图形的填充颜色。**相当于给画笔塞染料**

> ctx.strokeStyle
- 设置图形轮廓的颜色。
- 默认情况下，线条和填充颜色都是黑色（CSS 颜色值 #000000）

> ctx.lineWidth
- 这个属性设置当前绘线的粗细。属性值必须为正数。
- 描述线段宽度的数字。 0、 负数、 Infinity 和 NaN 会被忽略。默认值是 1.0。

> ctx.lineJoin
- 线条与线条间接合处的样式（默认是 miter）
- round : 圆角
- bevel : 斜角
- miter : 直角


> ctx.lineCap
- lineCap 是 Canvas 2D API 指定如何绘制每一条线段末端的属性。
- 这个要在绘制之前 设置好 还是一样 同步思想

- butt: 
    线段末端以方形结束。  - 默认值

- round: 
    线段末端以圆形结束

- square: 
    线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域

```js
if(canvas.getContext){
let ctx = canvas.getContext('2d');

  // 设置填充颜色：
  ctx.fillStyle = '#FFEB3B';

  // 设置描边颜色：
  ctx.strokeStyle = '#212121';

  // 设置描边粗细（不要加单位）：10px是中线上5px，中线下5px
  ctx.lineWidth = 5;
    // 上面的设置相关必须要写在绘制图形功能的上面 放在下面会不起作用
    // canvas里的东西都是同步的 自上而下的顺序

  // 设置边框的角的样式
  ctx.lineJoin = 'bevel'

  ctx.lineCap = 'round';

  ctx.fillRect(0, 5, 100, 100);
  ctx.strokeRect(105, 5, 100, 100);
  ctx.clearRect(105, 5, 100, 100);
}
```

----------------

### 绘制路径(钢笔工具么？)
- 图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。

> ctx.save()
- 用于将画布的*当前样式*保存到堆栈，相当于在内存之中产生一个样式快照。
```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.save();
// 上面代码中，save()会为画布的默认样式产生一个快照。
```

-  ctx.save() 方法 是将该语句 上面的 关于设置画笔样式 保存起来
<!-- 
 
      ↑
      ↑ 这个部分如果 配置画布的样式了 会将其保存起来 形成快照
      ↑
  ----------- ctx.save()
 -->


> ctx.restore()
- 将画布的样式恢复到上一个保存的快照
- 如果没有已保存的快照，则不产生任何效果。
- 上下文环境，restore方法用于恢复到上一次保存的上下文环境。

------

> save() 和  restore() 方法的例子

> 情况1:
- save()方法上面 没有任何样式时 保存的是 默认样式 默认样式都是黑色
- 也就是情况1中我们保存的样式 是默认样式 黑色
```js
if(canvas.getContext) {
  ctx = canvas.getContext("2d")
  
  // 上面没有任何记录 所以保存的是默认样式
  ctx.save()

  // 然后我们配置了填充色 和 绘制了正方形
  ctx.fillStyle = "#E91E63"
  ctx.fillRect(0, 0, 100, 100)
}
```

---

> 情况2:
- 我们调用 restore() 方法 调用该方法后 相当于读档 读上面save()的快照
```js
if(canvas.getContext) {
  ctx = canvas.getContext("2d")
  
  // 这里我们保存了样式 保存了默认样式 - 黑色
  ctx.save()

  // 然后设置了颜色 和 绘制了正方形 -- 粉色
  ctx.fillStyle = "#E91E63"
  ctx.fillRect(0, 0, 100, 100)
  
  // 这里调用 restore() 将画布样式恢复到了 save()起来的时候 也就是现在是黑色了
  ctx.restore()

  // 然后又在粉色的正方形的旁边 画了一个黑色的正方形
  ctx.fillRect(100, 0, 100, 100)
}
```


> **每次绘制新图形前**尽量养成习惯：
- 因为我们可以先save()起来默认样式 也就是我们把最干净的状态保存起来
- 这样我们在绘制新的图形的时候 可以调用 restore() 方法 回到样式的初始状态 重新再次绘制图形
- ctx.save();
- ctx.restore()


**注意:**
- 关于样式的修改和设定等操作 全都写在 beginPath()的上面
- ctx.fillStyle = 'pink';
- ctx.beginPath()


> 多次save()的时候 restore()怎么对应
- 我们调用save() 其实也相当于把save()上面的画布样式 压入栈里面
- 因为栈结构里面的样式 只能从栈顶弹出 也就是 先进后出 或者理解为 后进先出


- 代码部分
<!-- 
    默认样式
    ctx.save(); 1 把现在的状态押入栈里 默认色是黑色，就是把黑色押入栈里

    -- 

    粉色
    ctx.save(); 2 把现在的状态押入栈里 也就是把粉色押入栈里

    -- 

    深粉
    蓝色
    ctx.save(); 3 把蓝色押入栈里

    -- 

    红色
    ctx.save(); 4 把红色押入栈里

    --

    绿色
    ctx.save(); 5 把绿色押入栈里
 -->

- 这时候栈结构为：
  5：绿色
  4：红色
  3：蓝色
  2：粉色
  1：黑色

- 所以当我们调用 ctx.restore() 方法 弹出栈的时候
- 第一次调用的是栈顶的样式(也就是最新压入栈的结构)
<!-- 
  ctx.restore(); 弹出栈顶的颜色 绿色 也就是当前会是绿色
  ctx.restore(); 弹出栈顶的颜色 红色 也就是当前会是红色
  ctx.restore(); 栈顶为蓝色
  ctx.restore(); 栈顶为粉色
  ctx.restore(); 栈顶为黑色
 -->


> 图形的绘制
- 步骤:
- 1. 需要创建路径起始点。 
- 2. 然后使用画图命令去画出路径 
- 3. 之后你把路径封闭。 
- 4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。


> 画笔的方法:
> ctx.beginPath(); 
- 这里只清除路径容器 跟样式没有关系
- 新建一条路径，生成之后，图形绘制命令被指向到路径上准备生成路径。
- 生成路径的第一步叫做 beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。

- 而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。
- 也就是每次我们要绘制路径前 都要调用这个方法

> ctx.moveTo(x, y)
- 将笔触移动到指定的坐标 x y 上
- 当 canvas 初始化或者 beginPath()调用后，你通常会使用 moveTo()函数*设置起点*

> ctx.lineTo(x, y)
将笔触移动到指定的坐标 x 以及 y 上
绘制一条从当前位置到指定 x 以及 y 位置的直线。

> ctx.stroke()
- 通过线条来绘制图形轮廓。*不会自动调用 closePath()*
- 秒完点后调用该方法绘制线

> ctx.fill()
- 通过填充路径的内容区域生成实心的图形。*自动调用 closePath()*
- 秒完点后调用该方法填充背景色

> ctx.closePath()
- 闭合路径 闭合路径之后图形绘制命令又重新指向到上下文中。*（抬笔了？）*
- 闭合路径 closePath(), 不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。

- 如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做
- 当你调用 fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用 closePath()函数。 *但是调用 stroke()时不会自动闭合*

```js
if(canvas.getContext){
  ctx = canvas.getContext("2d")
      
  // 保存下最干净的画布样式
  ctx.save()

  // 设置样式
  ctx.strokeStyle = "#E91E63"
  ctx.fillStyle = "#FBC02D"
  ctx.lineWidth = 2

  // 画个空心的正方形
  // 绘制图形 先创建路径容器
  ctx.beginPath()

  // 抬笔到指定的位置
  ctx.moveTo(20, 20)

  // 移动到指定位置
  ctx.lineTo(120, 20)
  ctx.lineTo(120, 120)
  ctx.lineTo(20, 120)

  // 闭合路径
  ctx.closePath()
  // 描完点后绘制路径
  ctx.stroke()

  -- 

  // 调用beginPath() 会清空路径容器 画多个图形时 必须清空 不然图形会连上
  ctx.beginPath()

  // 画个实心的正方形
  ctx.moveTo(40, 40)
  ctx.lineTo(140, 40)
  ctx.lineTo(140, 140)
  ctx.lineTo(40, 140)

  // fill()方法会自动调用 closePath()
  ctx.fill()
}
```

> 要点:
- 1. moveTo lineTo 都是路径 每写一次的时候 路径（点）都会在一个容器中保存，直到调用 stroke(), fill()函数来绘制
- 2. 但是每调用一次绘制函数，*都会把保存在容器中的路径 重新的绘制一遍* 会和上一个图形关联

- 假如我想画两个不相干的图形 在绘制新图形之前调用 beginPath()，清空容器列表，这样再绘制才是一个新图形


> 虚线的绘制
> ctx.getLineDash()
- 返回一个数组，表示虚线里面线段和间距的长度。

> ctx.setLineDash()
- 数组，用于指定虚线里面线段和间距的长度。

```js
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 200);
ctx.lineTo(100, 200);

ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.setLineDash([15, 5]);
ctx.stroke();
// 上面代码中，线条的宽度为3，线条的末端和交点都改成圆角，并且设置为虚线。
```

---

> 矩形的绘制
> ctx.rect(x, y, w, h)
- 绘制*矩形路径*(仅是路径 我们还要调用 ctx.stroke(); 方法来进行绘制图形)

- 当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）。
- 也就是说，当前笔触自动重置会默认坐标 从默认坐标 我们开始指定位置

- 通过该方法绘制的路径 也会保存在 路径容器中
```js
ctx.beginPath()

ctx.rect(200, 200, 100, 100)
// 画边框
ctx.stroke()

// 填充色
ctx.fill()
```

> ctx.fillRect(x, y, w, h)
- 绘制一个有填充色的矩形

> ctx.strokeRect(x, y, w, h)
- 绘制一个边框矩形

```js
ctx.save()
ctx.fillStyle = "#3F51B5"
ctx.strokeStyle = "#303F9F"

ctx.beginPath()
ctx.fillRect(10, 10, 100, 100)
ctx.strokeRect(110, 10, 100, 100)
```


----------------

### canvas 书写模板:
- ctx.save(); 画图形时读的不是样式栈，读的是样式容器，只不过在弹栈的时候会将栈顶容器里的样式，弹到样式容器最下面，把样式容器里的状态覆盖掉

    ctx.save()
    ctx.beginPath()
    ctx.restore()

> 也就是说我们有三个容器:
- 路径容器:
- 每次调用路径 api(moveTo,lineTo,rect)时都会往路径容器里面做登记，
- 调用 beginPath() 时清空整个路径容器

- 样式容器:
- 每次调用样式api时, 都会往样式容器里做登记，
- 调用 save()时, 将样式容器里的状态押入样式栈里，
- 调用 restore()时, 将样式栈顶状态弹出到样式容器里 进行覆盖样式栈

----------------

### 练习 --- 签名
- 要点:
> 1. 拖拽页面元素 浏览器会默认搜索我们拖拽的元素 这是浏览器的默认行为 解决方式有两种
- 1. 我们在函数的最后使用 return false
- 2. 我们对要拖动的元素使用 setCapture  -- 针对ie
<!-- 
元素对象.setCapture 
    使用该方法 要先判断 元素对象.setCapture && 元素对象.setCapture()

该方法是针对鼠标按下事件的一种解决方案
    不管点击谁 都会触发元素对象身上的事件(点击事件)

解绑setCapture
-->

- 思路:
- 当我们鼠标按下的时候 让笔的坐标和鼠标的坐标一致
- 这里有一个问题:
- 1. 鼠标的鼠标是相当于窗口的
- 2. canvas的坐标是相当于画布的
- 这里我们需要通过计算来获取 正确的位置
<!-- 
    e.clientX - canvas.offsetLeft
 -->

```js
// 拿到画布
let canvas = document.getElementById('test');
let ctx;
// 拿到画笔
if(canvas.getContext){
ctx = canvas.getContext('2d');
}

// 给画布绑定 onmousedown 事件
canvas.onmousedown = function(event){
event = event || window.event;

    // 针对ie的鼠标按下的默认事件的取消方式
    canvas.setCapture && canvas.setCapture();

    // 插入： 每次画的时候都要清空前一次的路径
    ctx.beginPath();
    ctx.moveTo((event.clientX - canvas.offsetLeft), (event.clientY - canvas.offsetTop));

    // 要写字嘛，给文档绑定onmousemove
    document.onmousemove = function(event){
        event = event = window.event;

        // 加颜色的话
        ctx.save()
        ctx.strokeStyle = '#C2185B';

        // 开始写笔画的时候怎么办，在move里面lineTo嘛
        ctx.lineTo((event.clientX - canvas.offsetLeft), (event.clientY - canvas.offsetTop));
        // 然后连线
        ctx.stroke();

        // 和save()成对出现的 restore()
        ctx.restore();
    };
    document.onmouseup = function(){
        document.onmousemove = null;
        // 迷惑 我上面是给画布设置的捕获 这里不应该取消对画布的捕获么 为什么视频里是document.releaseCapture && document.releaseCapture()
        canvas.releaseCapture && canvas.releaseCapture();
    };
    return false;

};
```

- 自己又写了一边
```js
let canvas = $("#canvas")[0]
let btn = $("button")[0]
let ctx;
if(canvas.getContext) {
    ctx = canvas.getContext("2d")

    canvas.addEventListener("mousedown", function(e) {

    // 每次鼠标按下的时候 都要情况路径容器 重新开始画
    ctx.beginPath()
    ctx.moveTo((e.clientX - canvas.offsetLeft), (e.clientY - canvas.offsetTop))

    document.addEventListener("mousemove", sign)
    document.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", sign)
    })

    return false
    })
}

function sign(e) {
    ctx.save()
    ctx.strokeStyle = "#3F51B5"
    ctx.lineTo((event.clientX - canvas.offsetLeft), (event.clientY - canvas.offsetTop));

    // 绘制路径
    ctx.stroke();
    ctx.restore()
}
```

----------------

### 绘制曲线(弧线)
- 角度与弧度的js表达式:
- radians（弧度）=(Math.PI/180)*degrees。

> 绘制圆形
> ctx.arc(x, y, r, startAngle, endAngle, anticlockwise) 
- 绘制的还是圆形的路径 我们需要调用对应的绘制方法

- 参数:
- x, y: 圆心坐标
- r: 半径
- startAngle, endAngle: 则是扇形的起始角度和终止角度（以弧度表示）
<!-- 
    startAngle 和 endAngle 参数用弧度定义了开始以及结束的弧度。这些都是以 x 轴为基准 0 - 360 度
 -->

- anticlockwise: 逆时针(true), 顺时针(false)
<!-- 
    画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，
    
    按照 anticlockwise 给定的方向（默认为顺时针）来生成。
 -->

<!-- 
    ctx.arc(150,150,100,0,360*Math.PI/180,false);

    以 150 150 为圆心，100 为半径，从 0 开始 按照 360*Math.PI/180 这个弧度 去画圆，顺时针, 调节 360 可以调节画到哪
    到 360 就是正圆，90 就是 1/4 元 180 就是半圆 270 就是 3/4 圆
 -->

```js
ctx.beginPath()
ctx.arc(100, 100, 100, 0, 360*Math.PI/180, true)
ctx.stroke()
```


> 绘制圆弧
> arcTo(x1, y1, x2, y2, radius)
- 需要给出两个点的坐标，当前点与第一个点形成一条直线，第一个点与第二个点形成另一条直线，然后画出与这两根直线相切的弧线。

- 根据 3 个点形成的夹角，按照半径 绘制圆弧
- 1. 第一个点 moveTo()
- 2. 第二个点 x1 y1
- 3. 第三个点 x2 y2

- 也是绘制路径 需要调用方法来绘制

```js
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.arcTo(50, 50, 100, 0, 25);
ctx.lineTo(100, 0);
ctx.stroke();
```


> 绘制曲线 - 二次贝塞尔
> ctx.quadraticCurveTo(cp1x, cp1y, x, y)
- 绘制二次贝塞尔曲线，cp1x,cp1y 为一个控制点，x,y 为结束点。
- 起始点为 moveto 时指定的点

- 起点为 moveTo
- 终点为 x y
- cp1 cp2 用来控制弧度

```js
// 画东西之前都清空一次
ctx.beginPath();
ctx.moveTo(100,100);
ctx.quadraticCurveTo(500,200,100,300);
ctx.stroke();

ctx.save();
ctx.strokeStyle = '#C2185B';
ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(500,200);
ctx.lineTo(100,300);
ctx.stroke();
ctx.restore();
```


> 三次贝塞尔
> ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
- 绘制三次贝塞尔曲线，cp1x,cp1y 为控制点一，cp2x,cp2y 为控制点二，x,y 为结束点。 起始点为 moveto 时指定的点 cp 为控制圆弧的点

```js
ctx.beginPath();
ctx.moveTo(50,50);
ctx.bezierCurveTo(300,0,200,200,300,100)
ctx.stroke();

ctx.save();
ctx.strokeStyle = '#C2185B';
ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(300,0);
ctx.lineTo(200,200)
ctx.lineTo(300,100)
ctx.stroke();
ctx.restore();
```

----------------

### 文本
- 以下的方法和属性用于绘制文本

> 属性:
> ctx.font
- 指定"[字型] + 大小 + 字体，默认值为10px sans-serif
<!-- 
    必须同时有字号字体，且 字体只支持 sans-serif 系列
 -->

- 字形可以不写 但是 大小和字体一定要写

```js
ctx.font = 'Bold 20px Arial';
```

> ctx.textAlign
- 文本的对齐方式，默认值为start。
- left: 
    文本的左边靠到 x 的位置

- right: 
    文本的右边靠到 x 的位置

- center: 
    文本的中间位置 在 x 的位置上 也就是说文本一半在 x 的左边，一半在 x 的右边

- start
- end

> ctx.direction
- 文本的方向，默认值为inherit。
- ltr
- rtl

> ctx.textBaseline
- 文本的垂直位置，默认值为alphabetic。
- top
    文本基线在文本块的顶部。

- middle
    文本基线在文本块的中间

- bottom
    文本基线在文本块的底部。按基线对齐


> 方法:
> ctx.fillText("文本", x, y, [maxWidth])
- 在指定位置绘制实心字符。

- 参数:
- 文本
- 文本位置
- 文本的最大像素宽度。该参数可选，如果省略，则表示宽度没有限制。如果文本实际长度超过这个参数指定的值，那么浏览器将尝试用较小的字体填充。

**注意:**
- 不支持文本断行，所有文本一定出现在一行内。如果要生成多行文本，只有调用多次fillText()方法。


> ctx.strokeText()
- 在指定位置绘制空心字符。
- 参数和fillText()一致


> ctx.measureText("字符串")
- 返回一个 TextMetrics 对象。
- 方法接受一个字符串作为参数，返回一个 TextMetrics 对象，可以从这个对象上面获取参数字符串的信息，*目前主要是文本渲染后的宽度（width）*
```js
ctx.fillText('今天天气真不错',0,0);

// ctx.strokeText('今天天气真不错',50,50);
let info = ctx.measureText('今天天气真不错');
// tinfo 能返回 这个字符串 在我画布上的一个宽度 210
info.width
```

- 示例:
- 文本的水平 垂直 居中 这点就用到了 上面的 ctx.measureText('字符串')功能
- 实现文字水平垂直方向居中

```js
ctx.font = '60px ss';
// 设置文本垂直方向居中对齐
ctx.textBaseline = 'middle';

// 获取文本的宽度
let textWidth = ctx.measureText('找工作').width;

ctx.fillText('加油',(canvas.width - textWidth)/2, (canvas.height - 60)/2);
```

> ctx.strokeText()
- 在指定位置绘制空心字符。

> ctx.strokeText()
- 在指定位置绘制空心字符。

> ctx.strokeText()
- 在指定位置绘制空心字符。

> ctx.strokeText()
- 在指定位置绘制空心字符。

----------------

### canvas 中的变换
- 变换是让画布里的图像进行变换，画布里的图像没办法通过 css 和 绑定事件来添加效果 canvas 里的变换要用 canvas 里自己的 api


> ctx.translate(x, y) 累加
- 图像平移
- 移动 canvas 的 原点 到一个不同的位置。

- 书写位置:
- 跟设置样式是一起的 是先设置 后绘制图形

- 参数:
- x 是左右偏移量，y 是上下偏移量

- 注意：
- 在 canvas 中 translate 是累加的
- 也就是多次调用translate(x, y)方法 位置是累加的

- 比如:
- 之前画的矩形 画线都是参考画布左上角的原点 translate()就是*动这个原点*

```js
ctx.save()
ctx.fillStyle = '#C2185B'; //深粉

// translate() 也属于样式，先写再说上面
ctx.translate(50,50);

// 还可以写多次，是累加的 原点再次移动 50 50 到 100 100 了
ctx.translate(50,50);

ctx.beginPath();

// 这时候绘制的正方形原点是参考 50 50 了
ctx.fillRect(0,0,100,100);
ctx.stroke();
```


> ctx.rotate(60*Math.PI/180) 累加
- 图像旋转。它接受一个弧度值作为参数，表示顺时针旋转的度数。

- 旋转多少度：radians（弧度）=(Math.PI/180)*degrees。

- 这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。

- 旋转的中心点始终是 canvas 的原点，如果要改变它，我们需要用到 translate 方法

- 书写位置:
- 跟设置样式是一起的 是先设置 后绘制图形

```js
ctx.fillStyle = '#C2185B'; //深粉

// 也属于样式，先写再说上面
ctx.translate(200,200);
ctx.rotate(45\*Math.PI/180);


// 假如写成这样 和 上面的效果是不一样的 canvas 是同步思想，从上向下 这样是先转，再移动，上面是先移动再转
ctx.rotate(45\*Math.PI/180);
ctx.translate(200,200);



// 样式设置完后我们再绘制图形
ctx.fillRect(0,0,100,100);
ctx.fill();
```


> ctx.scale(x, y) 累加
- 用于缩放图像。

- scale 方法接受两个参数。x,y 分别是横轴和纵轴的缩放因子，它们都必须是正值。
<!-- 
    比如缩放因子0.5表示将大小缩小为原来的50%，缩放因子10表示放大十倍
 -->

- 值比 1.0 小 表示缩小，
- 值比 1.0 大 则表示放大，
- 值为 1.0 时什么效果都没有。
<!-- 
    如果缩放因子为1，就表示图像没有任何缩放。如果为-1，则表示方向翻转。ctx.scale(-1, 1)为水平翻转，ctx.scale(1, -1)表示垂直翻转。
 -->

- 缩放一般我们用它来增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大。
在 canvas 中 scale 是累加的

- 注意:
- 放大：
- 放大的是整个画布区域，所以位置也会发生变化
- css 像素的面积，不是增加 css 像素的数量，而是把单个 css 像素增大了，区域内 css 像素的个数变少

- 缩小：
- 缩小 css 像素的面积，区域内 css 像素的个数变多，占据的实际尺寸变小了

@感觉就是画布大小没变，里面的东西本身高度宽度和位置整体扩大或缩小

```js
ctx.fillStyle = '#C2185B'; //深粉
ctx.scale(2,1);
ctx.fillRect(100,100,100,100);
ctx.fill();
```


> ctx.transform()
- 接受一个变换矩阵的六个元素作为参数，完成缩放、旋转、移动和倾斜等变形。
<!-- 
    ctx.transform(a, b, c, d, e, f);
    a:水平缩放(默认值1，单位倍数)
    b:水平倾斜(默认值0，单位弧度)
    c:垂直倾斜(默认值0，单位弧度)
    d:垂直缩放(默认值1，单位倍数)
    e:水平位移(默认值0，单位像素)
    f:垂直位移(默认值0，单位像素)
 -->    

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.transform(2, 0, 0, 1, 50, 50);
ctx.fillRect(0, 0, 100, 100);
```

> ctx.setTransform()
- 取消前面的图形变换，将画布恢复到该方法指定的状态。该方法的参数与transform()方法完全一致。
```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

ctx.translate(50, 50);
ctx.fillRect(0, 0, 100, 100);

ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.fillRect(0, 0, 100, 100);
```

----------------

### 变换的相关练习
- 要点：
- 怎么让一个系数 不断的增加到指定值 和 缩小到指定值?

```js
let ctx;
// 定义一个角度 并赋初始值；
let deg = 0;

// 定义缩放系数
let scale = 0;
let maxScale = 0; //最大系数

let canvas = document.getElementById('test');
if(canvas.getContext){
ctx = canvas.getContext('2d');

```

- 下面的部分都不用要，老师的思路太不清晰了
```js
// 有样式就save 和 restore一下 形成个块级作用域
ctx.save();

// 设置原点为 元素的中心点，先设置元素左上角的原点为画布的中心点
ctx.translate(250,250);

ctx.beginPath();
// 上面原点移动到画布的中心点了，然后元素x y各减去一半的高度 和 宽度，让原点为元素的中心点
ctx.fillRect(-75,-75,150,150);

ctx.restore();


// 开启定时器 用来进行旋转
let timer = setInterval(function(){

    // 让旋转的角度自增
    deg++;

    // 清除前一个图形,不清理的话 在定时器里面绘制图形会叠到第一个图形上，清理画布
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // 这里重新绘制图形，因为上面用clearRect清掉了画布元素 不用担心会被叠加
    ctx.save();
    ctx.translate(250,250);

    // 让它以deg为单位旋转 每次进入定时器内 让deg++
    ctx.rotate(deg*Math.PI/180);

    // 下面开始控制放大 缩小 来控制scale中的系数，让它不断自动的从0-目标最大值去变化
    if(scale == 100){
        maxScale = -1;
    }else if(scale == 0){
        maxScale = 1;
    }

    // 每次使值自增 和 自减，如何自增 正数自增，如何自减 负数自减
    scale += maxScale;

    // 系数范围太大了 除以50 0.02-2之间不断变化
    ctx.scale(scale/50,scale/50);

    ctx.beginPath();
    ctx.fillRect(-75,-75,150,150);
    ctx.restore();

},1000/60)

```

> 自己做的作业：
```js
let ctx;
// 定义度数
let deg = 0;
// 定义缩放系数
let scale = 0;
// 定义缩放系数的最大值
let maxScale = 0;

let canvas = document.getElementById('canvas');
if(canvas.getContext){
ctx = canvas.getContext('2d');

    // 自动旋转 放大 缩小 那就开启定时器
    let timer = setInterval(function(){

        // 使单个图形发生变化 清楚掉前一个图形 清空画布
        ctx.clearRect(0,0,canvas.width, canvas.height);

        // 创建图形
        ctx.save();

        // 样式相关
        ctx.fillStyle = '#C2185B';
        // 使原点在元素的中心点
        ctx.translate(250,250);
        // 设置旋转
        deg++;
        ctx.rotate(deg*Math.PI/180);

        // 设置缩放 让它在0-2之间变化 使最小值和最大值各乘以50 0 - 100
        // 当系数为0时，自增到100，当到100时开始自减
        if(scale == 0){
            maxScale = 1;
        }else if(scale == 100){
            maxScale = -1;
        }
        // 自增 自减的单位为1
        scale += maxScale;
        // 条件完成后开始设置放大缩小
        ctx.scale(scale/50,scale/50);

        // 绘制一个正方形
        ctx.beginPath();
        ctx.fillRect(-75,-75,150,150);
        ctx.restore();
    },1000/60);
}
```

----------------

### 练习 --- 时钟

- 总结：
- 1. 区域 1 中放初始化设置 也就是共通设置
<!-- 
    ctx.save(); -- 区域 1
    ...
    ctx.restore(); -- 区域 1
 -->

- 2.在区域 1 里 每画一次图形可以创建一个 save 作用域
- *区域 2 中可以继承区域 1 中的样式，想要单独设定的话 在区域 2 中再次设定*
<!-- 
ctx.save(); -- 区域 1
    ctx.save();     -- 区域2

    ctx.restore();  -- 区域2

ctx.restore(); -- 区域 1
 -->

- 3. 画完一个路径后 可以用 for 循环来创建多个，如果需要 for 循环的部分不需要把 save restore 放进 for 循环里

- 4. 钟表练习中 关于画分针刻度的问题，假如我不喜欢 时针刻度的位置上 有分针刻度 我想想法是 switch 和 continue

- 老师的想法是
```js
for(let i=0; i<60; i++){
    if(i%5 != 0){
        ctx.beginPath();
        ctx.moveTo(0,-114);
        ctx.lineTo(0,-110);
        ctx.stroke();
    }
//放在上面会串一个 那就放在下面 等它们画完了再转
ctx.rotate(6*Math.PI/180); 
}
```

- 5. 当 0 5 10 15 20 25 30 35 40 45 50 55 的时候不要画

    i%5

    0%5 0
    1%5 1
    2%5 2
    3%5 3
    4%5 4
    5%5 0
    6%5 1
    7%5 2
    8%5 3
    9%5 4
    10%5 0

- 技巧: 每隔 5 怎么样 可以选择 i%5

```js
let date = new Date();
// 获取 秒
let s = date.getSeconds();
// 获取 分
let m = date.getMinutes()+s/60;
// 获取 时
let h = date.getHours()+m/60; //现在的 h 是 24 小时制
h = h>12?h-12:h;


@用canvas写动画就是覆盖每次画不一样的帧上去把上一次的清掉

let canvas = document.getElementById('clock');
let ctx;
if(canvas.getContext){
ctx = canvas.getContext('2d');
    
    setInterval(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    },1000);  

    //相当于这个move函数 1秒执行一次
    move();

function move(){
    ctx.save();     // 区域1

    // 调整 原点 到中心位置
    ctx.translate(200,200);
    // 设置表盘的样式
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#212121';

    // 绘制外层空心圆盘
    ctx.save();     // 区域2
    // 一样的样式可以继承区域1里的，想单独设定的话 在这里再次设定
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#C2185B';
    ctx.beginPath();
    ctx.arc(0,0,140,0,360*Math.PI/180);
    ctx.stroke();
    ctx.restore();  // 区域2

    // 绘制外层圆盘的修饰环
    ctx.save();
    ctx.strokeStyle = '#FF5252';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0,0,132,0,360*Math.PI/180);
    ctx.stroke();
    ctx.restore();

    // 时针刻度
    ctx.save();
    // 在Y轴上画 上是负 下是正 下面是画了一个刻度，画多个怎么办？for循环呗
    // 那for循环内部用不用把save 和 restore放到for循环里 不用！ 因为不涉及到样式
    for(let i=0; i<12; i++){
        // 每个路径移动30度 rotate是累加的
        ctx.rotate(30*Math.PI/180);

        ctx.beginPath();
        ctx.moveTo(0,-114);
        ctx.lineTo(0,-94);
        ctx.stroke();
    }
    ctx.restore();

    // 分针刻度
    ctx.save();
    // 设置分针刻度长度
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#D32F2F';
    for(let i=0; i<60; i++){
        // 让每个小刻度移动6度
        ctx.rotate(6*Math.PI/180);
        ctx.beginPath();
        ctx.moveTo(0,-114);
        ctx.lineTo(0,-110);
        ctx.stroke();
    }
    // 换了一个写法：
    // for(let i=0; i<60; i++){
    //     if(i%5 != 0){
    //         ctx.beginPath();
    //         ctx.moveTo(0,-114);
    //         ctx.lineTo(0,-110);
    //         ctx.stroke();
    //     }
    //     ctx.rotate(6*Math.PI/180);      //放在上面会串一个 那就放在下面 等它们画完了再转
    // }
    // ctx.restore();

    // 画个圆心
    ctx.save();
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0,0,7,0,360*Math.PI/180);
    ctx.stroke();
    ctx.restore();


    // 画 时针 分针 秒针
    // 先取得时间
    let date = new Date();
    // 获取 秒
    let s = date.getSeconds();
    // 获取 分
    let m = date.getMinutes()+s/60;
    // 获取 时
    let h = parseInt(date.getHours()+m/60);       //现在的h是24小时制
    h = h>12?h-12:h;

    // console.log(h);

    // 时针
    ctx.save();
    // 宽度为14默认宽度为8，
    ctx.lineWidth = 8;
    // 让时针转到对应的位置上, 1小时=30度
    ctx.rotate(h*30*Math.PI/180);
    ctx.beginPath();
    // 时针 圆心外溢出80 收20  那就是-20 画到+80呗
    ctx.moveTo(0,20);
    ctx.lineTo(0,-60);
    ctx.stroke();
    ctx.restore();

    // 分针
    ctx.save();
    // 宽度为14默认宽度为8，
    ctx.lineWidth = 5;
    // 让时针转到对应的位置上, 1分钟转6度
    ctx.rotate(m*6*Math.PI/180);
    ctx.beginPath();
    // 时针 圆心外溢出80 收20  那就是-20 画到+80呗
    ctx.moveTo(0,25);
    ctx.lineTo(0,-100);
    ctx.stroke();
    ctx.restore();

    // 秒针
    ctx.save();
    // 宽度为14默认宽度为8，
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF4081';
    // 让时针转到对应的位置上, 1分钟转6度
    ctx.rotate(s*6*Math.PI/180);
    ctx.beginPath();
    // 时针 圆心外溢出80 收20  那就是-20 画到+80呗
    ctx.moveTo(0,35);
    ctx.lineTo(0,-110);
    ctx.stroke();
    ctx.restore();

    // 以上都创建好后 让它自动动起来


    ctx.restore();  // 区域1
    };

}
```

----------------

### 图像处理
- Canvas API 允许将图像文件写入画布，

- 要点:
- 使用 new image()方法 当onload加载成功后 在内部调用drawImage()


> ctx.drawImage(img, 0, 0, img.width, img.height);
- 在 canvas 中插入图片需要 image 对象
- img.width 和 img.height是可选的
- 当我们不指定的时候 图像将是原始大小


```js
// 创建 image 对象
let img = new Image();

// 设置链接路径
img.src = '路径';

// 操作图片要等图片加载完成
img.onload = function(){
    // 在这里引入录图片
};

---

if(canvas.getContext){
ctx = canvas.getContext('2d');

let img = new Image(20, 20);
img.src = './links/1.jpg';
img.onload = function(){
    draw();
};

function draw(){
    // ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.drawImage(img, 0, 0, 100, 100);
};
```

----------------

### 像素读写
> ctx.getImageData(x,y,w,h)
- 用来读取<canvas>的内容，返回一个 ImageData 对象，包含了每个像素的信息。

- 参数:
- x y:
    读取区域的左上角坐标

- w h
    读取区域的宽度和高度

- 返回值:
- imageData对象 该对象有三个属性。
- 1. data:
    一个一维数组。里面放的是每一个像素点的 

    rgba 信息 所以是 10000 个 x 4
    包含着 RGBA 格式的整型数据，范围在 0 至 255 之间（包括 255）
    R:0 --> 255(黑色到白色)
    G:0 --> 255(黑色到白色)
    B:0 --> 255(黑色到白色)
    A:0 --> 255(透明到不透明)

- 2. width
    横向上像素点的个数 图片宽度，单位是像素

- 3. height
    纵向上像素点的个数 图片高度，单位是像素

```js
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
```

> ctx.putImageData(imgData, x, y)
- 将ImageData对象的像素绘制在<canvas>画布上

- 参数:
- 1. imagedata
    包含像素信息的 ImageData 对象。

- 2. x
    元素内部的横坐标，用于放置 ImageData 图像的左上角。

- 3. y
    元素内部的纵坐标，用于放置 ImageData 图像的左上角。


> ctx.createImageData()
- 用于生成一个空的ImageData对象，所有像素都是透明的黑色（即每个值都是0）。该方法有两种使用格式。
```js
ctx.createImageData(width, height)
ctx.createImageData(imagedata)
```

- 比如:
- 比如我现在画好了一个矩形，然后我想复制一份怎么办？
<!-- 
    目标矩形：ctx.fillRect(0,0,100,100);

    我可以把这个目标矩形的每一个点的像素信息拿到，怎么拿？
    
    canvas 给我们提供了一个方法 可以获取 指定 起点（x y）, 范围（100，100）内的所有信息
 -->

```js
ctx.fillRect(0,0,100,100);

// 获取从 0 0 位置开始 100 - 100 范围内的所有数据
let imgData = ctx.getImageData(0,0,100,100);
```

- 举例:
- 假如我想画一个带有透明度的矩形

- 思路:
- 因为 getImageData 获取的是 每一个像素点的 rgba 的信息
- [r, g, b, a,r, g, b, a,r, g, b, a]
- 也就是我要获取 3，7，11，5.....
修改数组中 a 的值
```js
for(let i=0; i<imgData.data.length; i++){
    imgData.data[4*i+3] = 100;
}
```

> 技巧:
- 获取
```js
function getPxInfo(imgData,x,y){
    let colorInfo = [];
    let data = imgData.data;
    let w = imgData.width;
    let h = imgData.height;

    // 目标(3,3)取得这个点的信息
    // 这个点 前面有多少个像素点 xw+y
    // r
    colorInfo[0] = data[(y*w+x)*4]
    // g
    colorInfo[1] = data[(y*w+x)*4+1]
    // b
    colorInfo[2] = data[(y*w+x)*4+2]
    // a
    colorInfo[3] = data[(y*w+x)*4+3]
    return colorInfo;
}
```

- 设置:
```js
function setPxInfo(imgData,x,y,color){
    let data = imgData.data;
    let w = imgData.width;
    let h = imgData.height;
    data[(y*w+x)*4] = color[0]
    data[(y*w+x)*4+1] = color[1]
    data[(y*w+x)*4+2] = color[2]
    data[(y*w+x)*4+3] = color[3]
}
```

> 解析定义方法中数据
> getPxInfo(imgData,x,y)
- 参数:
- imgData:
    获取的哪块区域的信息
- x: 
    不是偏移量中的 x 而是一行中从 0 开始到 x 个
- y: 
    不是偏移量中的 y 而是几行的意思


□□□□□□
□□□□□□
□□□■□□ 　 y*w + x 2 行 X 6 + 3（黑色方框前面的 3 个）

```js
for(let i=0; i<imgData.width; i++){
    // 我要修改某一行上的所有像素点，seiPxInfo 中的 x y 并不是偏移量要记住

    // 我们看看偏移量 x 和 y 代表着什么 x 肯定是我们要变的 i y 正常应该是代表着哪行
    setPxInfo(imgData,i,50,[0,0,0,255]);
}
```

----------------

### 练习 --- 马赛克
- 思路：
- 两幅图
- 正常 and 马赛克图

- 1. 我拿到正常图的所有像素点 就能对这些像素点进行操作 最终再把它放回去 变成一个马赛克图

- 2. 定义一个马赛克矩形 矩形的尺寸随意 5 x 5 | 4 x 4 都可以, 把这个矩形当中的所有像素点 随机挑一个出来 让其它的像素点都跟这个像素点一模一样 最后就是马赛克

<!-- 
    比如现在有 100 _ 100 的矩形图片，我们要把这张图片变成马赛克

    1、先定义一个 矩形 5 _ 5 然后 把 100*100 分成 横向 20 个 5*5 矩形 纵向 20 个 5*5 矩形

    2、在原图中横向 20 个 5*5 矩形中的第一个 5*5 矩形中 随机抽出来一个像素点的信息 rgba

    3、将这个 5*5 矩形中的所有颜色统一设置成随机抽出来的那个像素点的信息 rgba，并放入新照片的横向 20 个中的第一个上

    4、以此类推 横向操作 20 次，纵向操作 20 次
 -->

```js
// 画布的宽度 最好动态设置 因为是图片的 2 倍
let canvas = document.getElementById('canvas');

let ctx;

if(canvas.getContext){
    ctx = canvas.getContext('2d');

    // 引入图片
    let img = new Image();

    img.src = './links/5.jpg';

    // 等图片加载完成后 操作图片
    img.onload = function(){

        // 图片加载完成后 修改画布的高度和宽度
        canvas.width = img.width * 2;

        canvas.height = img.height;

        // 定义一个方法 操作图片
        draw();
    };


    // 定draw()
    function draw(){

        // 把图片导入到画布中
        ctx.drawImage(img,0,0);

        // 像素操作 肯定要获取imgData, 获取图片的信息，注意这个函数里获取不到上一个函数中的img信息 用过this来传递
        let oldImgData = ctx.getImageData(0,0,img.width,img.height);

        // 创建一个新的
        let newImgData = ctx.createImageData(img.width,img.height);


        // 马赛克
        // 思路：
        // 1、选区一个马赛克矩形

        // 2、从马赛克矩形中随机抽出一个像素点的信息rgba

        // 3、将整个马赛克矩形中的像素点信息统一调成随机抽出的那个

        // 1、选区一个马赛克矩形
        // 假如我创建一个5 x 5的矩形 那在图片上体现出来就是 (0,0) - (4,4) 一共是25个像素点
        let size = 5;
        // 上面这个size 减小 变清晰了 比如1 2 10 各有不同的效果

        // 这里为什么要除以5，因为我们是以5 x 5的正方形为一个单位 按照这个单位区遍历 一个坐标的结果里有5 x 5个像素
        for(let i=0; i<oldImgData.width/size; i++){
            for(let j=0; j<oldImgData.height/size; j++){
                // (i,j) 为每一个马赛克矩形的坐标
                // 如果是(0,0)的话 实际代表(0,0) - (4,4)
                // 如果是(0,1)的话 实际代表(0,5) - (4,9)

                // 如果是(1,0)的话 实际代表(5,0) - (9,4)
                // 如果是(1,1)的话 实际代表(5,5) - (9,5)

                // 2、从马赛克矩形中随机抽出一个像素点的信息rgba
                // 开区间：a - b 不包含ab，闭区间：a - b 包含ab
                // Math.random()  [0-1]
                // Math.random()*size  [0-4] 不包含0 和 5
                // Math.floor() 向下取整，小数位部分会被舍弃掉
                // Math.floor(Math.random()*size)

                // let color = getPxInfo(oldImgData,Math.floor(Math.random()*size),Math.floor(Math.random()*size));
                // 上面这行现在都是在为第一个马赛克矩形做设计 想为所有的马赛克矩形做设计的话 肯定是跟i j有关系的
                let color = getPxInfo(oldImgData,i*size+Math.floor(Math.random()*size),j*size+Math.floor(Math.random()*size));
                // 上面这行 i每次+1 x就会往右5个 加上5的话 就相当于 x轴上的第2个马赛克矩形
                // 上面这行 j每次+1 y就会往下5个 加上5的话 就相当于 y轴上的第2个马赛克矩形 以此类推 横向和纵向都会轮一遍
                // 到这才能得到所有的马赛克矩形



                // 3、将整个马赛克矩形中的像素点信息统一调成随机抽出的那个
                // 统一调怎么调？是不是for循环出 马赛克矩形中的所有像素点吧 那是不是横向 和 纵向都需要循环
                for(let a=0; a<size; a++){
                    for(let b=0; b<size; b++){
                        // 每一个位置都要轮一次 所有是马赛克矩形的a b
                        // 我们要修改newImageData吧，怎么改，从oldImageData里随机拿一个颜色出来 将newImageData里的数据全都改成新的
                        // 只不过我们改的是newImageData里的第一个马赛克矩形 因为ab的值是0 0 - 4 4
                        // 最后一个参数color是上面随机抽出来的数组

                        // setPxInfo(newImgData,a,b,color);
                        // 上面这行处理单纯的a b的还是处理一个马赛克矩形

                        setPxInfo(newImgData,i*size+a,j*size+b,color);
                        // 跟i j关联在一起才是处理所有的马赛克矩形
                    }
                }
            }
            // 内层循环走完处理的是一列
        }   // 外层循环全部走完才是全部

        // 最后 把新的对象放到画布上
        ctx.putImageData(newImgData,img.width,0)
    };
```

> 全局透明度的设置
> ctx.globalAlpha = 0.0 -1.0

- 这个属性影响到 canvas 里所有图形的透明度 从完全透明 - 完全不透明
```js
ctx = canvas.getContext('2d');
ctx.globalAlpha = 0.5;
ctx.fillStyle = '#7B1FA2';
ctx.fillRect(0,0,100,100);
// 想让上面的矩形透明 有很多方式 1、设置颜色 rgba；2、像素操作；
// 如果全局就一个对象要透明 还可以用 globalAlpha 0-1
```

----------------

### 合成
https://blog.csdn.net/YMX2020/article/details/118444946

- 是多张图片图片叠在一起的时候 怎么去展现
- 下面的功能有点像 ai 里的路径查找器 形状模式那

- source:   (源) 
    - 新的图像
    - 新的图像指的是在代码上最后画的 也就是屏幕上最上面的


- destination:  (目标)
    - 已经绘制过的图形
    - 已经绘制过的图像指的是在代码上之前画的 也就是屏幕上被压着的

> 属性:
> ctx.globalCompositeOperation
- 以源为中心 进行 图片之间的相切 交集 减去顶层等操作

- 属性值:
- 1. source-over(默认值)
    源在上面,新的图像层级比较高

- 2. source-in
    只留下源与目标的重叠部分(源的那一部分) 交集

- 3. source-out
    只留下源超过目标的部分

- 4. source-atop
    砍掉源溢出的部分


- 以绘制过的图形为中心 进行 图片之间的相切 交集 减去顶层等操作
- 属性值:
- 1. destination-over:
    目标在上面,旧的图像层级比较高

- 2. destination-in:
    只留下源与目标的重叠部分(目标的那一部分)

- 3. destination-out:
    只留下目标超过源的部分

- 4. destination-atop:
    砍掉目标溢出的部分

```js
// 下面的就是：destination
ctx.fillStyle = '#7B1FA2'; 这部分相当于 目标
ctx.fillRect(0,0,100,100);

--- 我们的代码写在这里
ctx.globalCompositeOperation = 'source-in'
---

// 下面的就是：source
ctx.fillStyle = '#9C27B0'; 这部分是 源
ctx.fillRect(50,50,100,100);
```
----------------

### 练习: 刮刮卡
- 要点:
- 1. 让图片和视口宽度 高度一样大
- background-size:100% 100%;

- 2. 动态更改画布尺寸 跟视口一样
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

- 3. 移动端没有 mouse 和 click 事件的 点击事件 使用 touchstart 事件 相当于 onmousedown 移动端手指点上去的事件

- 4. 当画布不是和视口一样时，在画布上点击的位置应该是：
手指距离视口的距离 - canvas 画布的偏移量

- 5. 移动端对额事件不要用 onlick 没用的

- 6. 当过渡执行完毕后触发事件 
```js
// transitionend 事件
canvas.addEventListener('transitionend', function(){
this.remove()
});
```

- 7. 移动端 必须要 先 touchstart 然后才能 touchmove 而 pc 端可以直接使用 onmousemove 事件

- 思路:
- 刮刮卡的效果 是 2 层 上面一层是 canvas 下面一层是图片 canvas 这层把图片盖住了 每次刮的时候 手指和图片是有重叠区域的 只留下目标溢出那一部分就可以来了

----------------

### 渐变和图像填充

> ctx.createPattern(image, repetition)
- 定义图像填充样式。在指定方向上不断重复该图像，填充指定的区域。

- 参数:
- image:
    <img>
    <canvas>
    Blob

- 字符串:
    "repeat"
    "repeat-x"
    "repeat-y"
    "no-repeat"


- 应用方式:
- 它具有返回值，一般情况下，我们都会将 createPattern 返回的对象作为 fillstyle 的值

- 背景和图片有关系 所以必须等图片加载成功

```js
if(canvas.getContext){
ctx = canvas.getContext('2d');

let img = new Image();
img.src = './links/1.jpg';
img.onload = function(){

    draw();
};

function draw(){

    // 1. 先画一个框体 背景得在这个框体里
    // 正常来讲 填充背景色就是背景了吧，那现在我是不是让颜色值等于背景图片就行了

    // 创建变量接收 设置背景方法的返回值 用来给 fillStyle
    let pattern = ctx.createPattern(img, 'repeat');

    ctx.fillStyle = pattern;
    
    ctx.fillRect(20,20,200,200);
}
```


> 渐变
> 线性渐变：
> ctx.createLinearGradient(x0, y0, x1, y1)
- 定义线性渐变样式。
- 参数:
- x0 y0: 是起点的横坐标和纵坐标
- x1 y1: 是终点的横坐标和纵坐标。

- 返回值:
- CanvasGradient对象

> 返回值对象.addColorStop(num, "color")
- 该对象只有一个addColorStop()方向，用来指定渐变点的颜色。
<!-- 
    addColorStop()方法接受两个参数，
    
    第一个参数是0到1之间的一个位置量，
    0表示起点，
    1表示终点，
    
    第二个参数是一个字符串，表示 CSS 颜色
 -->

- 使用方式:
- let 渐变对象 = ctx.createLinearGradient(x1, y1, x2, y2)

- 创建渐变对象，用来下一步操作 
- x y 表示渐变的起点 (x1,y1) 与终点 (x2,y2)

- 渐变对象.addColorStop(position, color)
- position：
    渐变条上的锚点，表示渐变中颜色所在的相对位置 取值 0.0 - 1.0
- color：
    颜色 如 #FFF, rgba(0,0,0,1)

```js
// 设置渐变方向
let gradient = ctx.createLinearGradient(0,0,200,200);

// 设置锚点 和 颜色
gradient.addColorStop(0, '#C2185B');
gradient.addColorStop(.5, '#FF4081');
gradient.addColorStop(1, '#BDBDBD');

ctx.fillStyle = gradient;
ctx.fillRect(20,20,200,200);
```

> ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
- 径向渐变 需要指定两个圆。

- 参数:
- 前三个参数则定义另一个以(x1,y1) 为原点，半径为 r1 的圆，
- 后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

- 渐变范围：
大圆 - 小圆 剩下的部分 是渐变范围

```js
let gradient = ctx.createRadialGradient(100,100,100, 150,150,200);

// 设置锚点 和 颜色
gradient.addColorStop(0, '#C2185B');
// gradient.addColorStop(1, '#FF4081');
gradient.addColorStop(1, '#BDBDBD');
ctx.fillStyle = gradient;
ctx.fillRect(20,20,350,350);
```

----------------

### 练习 --- 飞鸟
- 要点：
- 1. 两个作用域之间 对象看不见 可以用 this 来传递
    draw(this);
    function draw(img){}

- 2. 让画布大小等于视口的大小
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

- 3. 做 canvas 的动画就是清除 加载的反复
```js
let canvas = document.getElementById('canvas');

// 让画布的大小等于视口的大小
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let ctx;
if(canvas.getContext){
ctx = canvas.getContext('2d');

    // 制作飞鸟的话 肯定是要拿到图片的 怎么拿呢？一堆呢
    let flag = 0;

    // 为了改变引入图片的位置 创建一个变量让它不断改变 x 的值
    let site = 0;

    setInterval(function(){

        // 没进循环定时器后 清楚一次
        ctx.clearRect(0,0,canvas.width, canvas.height);

        // 为了拿到图片让flag自增
        flag++;
        // 判断图片
        if(flag == 9){
            flag = 1;
        }

        // 改变图片 x 的位置
        site += 15;

        // 每次进到这里 建立img对象 引入图片
        let img = new Image();
        img.src = './links/q_r'+(flag)+'.jpg';
        // 等图片加载完毕操作图片
        img.onload = function(){
            //这里的this是img 为了解决两个作用域img对象传递不过去的问题
            draw(this);     
        };

        // 怎么让鸟往前走，我们做canvas的动画主要就是覆盖 那就是不断的改变 图片的导入位置，

        // ctx.drawImage()中的x y就是图片的位置，改变它就可以了不是么
    },100);

    // 把图片的相关操作写在外面
    function draw(img){
        // 引入图片, 这有个问题，第一个参数要传递图片对象，但是图片对象是在定时器的函数中，我现在是在draw的函数中

        // 两个作用域了 传不过来
        // 上面用哪个this传递进来了
        ctx.drawImage(img,site,0)
    };

}
```

----------------

### 阴影
- 以下属性用于设置阴影。
> ctx.shadowBlur
- 阴影的模糊程度，默认为0。

> ctx.shadowColor(必需项)
- 阴影的颜色，默认为black。
- shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

> ctx.shadowOffsetX
- 阴影的水平位移，默认为0。

> ctx.shadowOffsetY
- 阴影的垂直位移，默认为0。

```js
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 5;
ctx.shadowColor = 'rgba(0,0,0,0.5)';

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);
```

----------------

### 将画布导出为图像
> canvas 元素上的方法
> canvas.toDataURL(type, quality)
- 可以将 Canvas 数据转为 Data URI 格式的图像。

- 参数:
- type:
    字符串，表示图像的格式。默认为image/png，另一个可用的值是image/jpeg，Chrome 浏览器还可以使用image/webp。

- quality:
    0到1之间，表示 JPEG 和 WebP 图像的质量系数，默认值为0.92。

- 返回值:
- Data URI 格式的字符串。

- 注意:
- canvas 是同步思想 保存导出图片链接 要在图片完成后

```js
function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL('image/png');
  return image;
}

var fullQuality = canvas.toDataURL('image/jpeg', 0.9);
var mediumQuality = canvas.toDataURL('image/jpeg', 0.6);
var lowQuality = canvas.toDataURL('image/jpeg', 0.3);

// 上面代码将<canvas>元素转成高画质、中画质、低画质三种 JPEG 图像。
```


> canvas.toBlob(callback, mimeType, quality)
- 用于将<canvas>图像转成一个 Blob 对象，默认类型是image/png

- callback:
- 回调函数。它接受生成的 Blob 对象作为参数。

- mimeType:
- 字符串，图像的 MIMEType 类型，默认是image/png。

- quality
- 浮点数，0到1之间，表示图像的质量，只对image/jpeg和image/webp类型的图像有效。
```js
var canvas = document.getElementById('myCanvas');

function blobToImg(blob) {
  var newImg = document.createElement('img');

  var url = URL.createObjectURL(blob);

  newImg.onload = function () {
    // 使用完毕，释放 URL 对象
    URL.revokeObjectURL(url);
  };

  newImg.src = url;
  document.body.appendChild(newImg);
}

canvas.toBlob(blobToImg);
```

----------------

### 事件操作
> ctx.isPointInPath(x, y)
- 判断在当前路径中是否包含检测点 也就是说 这个 x y 的点是不是在这条路径上

x:检测点的 X 坐标
y:检测点的 Y 坐标

- 注意
- 此方法只作用于最新画出的 canvas 图像

```js
if(canvas.getContext){
ctx = canvas.getContext('2d');
// 情况一：单独的一个图形 可以触发下面事件
ctx.fillStyle = 'pink';
ctx.rect(0,0,100,100);
ctx.fill();

// 情况二：虽然我画了两个图形 但是因为没有清空 path 所以相当于再画第二个图形时，连带第一个也重新画了一次
// 所以两个图形都会触发事件
ctx.fillStyle = 'pink';
ctx.rect(0,0,100,100);
ctx.fill();
ctx.rect(100,00,100,100);
ctx.fill();

// 情况三：我们用 save restore 加上 beginPath 的话 只有最新的才会有事件的触发
ctx.fillStyle = 'pink';
ctx.rect(0,0,100,100);
ctx.fill();
ctx.beginPath();
ctx.rect(100,00,100,100);
ctx.fill();

// 为图形绑定事件
canvas.onclick = function(event){
event = event || window.event;
let x = event.clientX - canvas.offsetLeft;
let y = event.clientY - canvas.offsetTop;

    // 如果点击的点 在最新画出的图形内则触发
    if(ctx.isPointInPath(x,y)){
        alert(123);
    }

    // 其实点canvas内也触发click了 只是没有进入判断去弹框而已
};
```

```js
window.onload = function(){

    // 荧幕
    let canvas = document.getElementById('test');
    let ctx;
    // 放映机
    let video = document.querySelector('video');

    // 需求 我们让视频在画布上播放，video其实就是一帧一帧全是静态画
    // 我们将video

    if(canvas.getContext){
        ctx = canvas.getContext('2d');

        // 跟导入图片的方式一样
        ctx.drawImage(video,0,0,canvas.width,canvas.height);
        // 如果没导入进来的话 可以加载事件 比如第一帧事件
    }
};
```

----------------

### 复习：

> 注意点：
- 1. canvas 图像的渲染 有别于 html 图像的渲染
- 2. canvas 的渲染极快 不会出现代码覆盖后延迟渲染的问题

- 3. 写 canvas 代码的时候要具有同步思想

- 4. 画布高宽的问题：一定要使用内联样式来设置画布的宽高通过 css 的形式 会缩放画布内的图像

- 5. 绘制矩形的问题：
- 边框的宽度是在偏移量处 上下 各渲染一半 会出现小数边框 会向上取整

- canvas 的 api 只支持一种图形的原生直接渲染：矩形