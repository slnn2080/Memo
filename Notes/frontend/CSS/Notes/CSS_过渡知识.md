### 三角函数 勾股定理 角度转弧度 弧度转角度
长度等于半径长的弧  所对的圆心角  称为1弧度的角  
它的单位是rad 读作弧度，这种用“弧度”做单位来度量角的制度叫做弧度制．

> 弧长公式:   l = r * |a|     |     l = n * PI / 180
- 即弧长等于弧所对的圆心角（的弧度数）的绝对值与半径的积


<!--邻边b, 对边a, 斜边c -->
> 正弦函数:
sin = 对边 / 斜边  a / c

> 余弦函数:
cos = 邻边 / 斜边  b / c

> 正切函数:
tan = 对边 / 邻边  a / b

> 余切函数:
cot = 邻边 / 对边  b / a

> 正割函数
sec = 斜边 / 邻边  c / b

> 余割函数
csc = 斜边 / 对边  c / a


> 角度 ---> 弧度
deg(角度) * 2PI / 360   =   deg * PI / 180



### 过渡

> transition:

> 没有过渡效果的属性:
- display (所以d开头的属性都不能被动画)


### 过渡中的问题
> 1 在元素首次渲染还没有完成的情况下, 是不会触发过渡的
> 2 在绝大部分变换样式切换时, 如果变换函数的位置, 个数不相同 也不会触发过渡

> 注意: 在变换组合中 要使过渡效果不出现错误, 那它们的顺序和个数要保持一致 上次的transform的状态要带着

> 之后会定义组件 专门用来对付transform



### 属性
- 过渡属性如果有多个 用逗号隔开 如果全部要发生改变 那就填写all

> transition-property: ;          
- 要执行过渡的属性
eg：
transition-property: width;

> transition-duration: ;          
- 指定过渡效果持续的时间
eg：
transition-duration: 2s / .2s = 20ms;
<!-- 
当持续时间 和 过渡属性不一致时:
    属性名称: width, height, background, color;
    持续时间: 2s, 5s
    这时, 时间列表会复制, 用来一一对应属性:
    持续时间: 2s, 5s, 2s, 5s, 2s, 5s
 -->

> transition-delay: ; 
- 过渡效果的延迟, 等待一段时间后再执行过渡效果
eg:
transition-delay: 2s;

> transition-timing-function: ;  
- 过渡的时序函数 (指定过渡的执行方式)
- 可选值：
ease            默认值      慢速开始 先加速 再减速 停的时候感觉很好
ease-in         加速运动
ease-out        减速运动
ease-in-out     先加速 再减速
linear          匀速

\\ steps()          分步执行过渡效果

参数：分几步    steps(3) 
参数：
end默认值 假如我们的总时长是2s 分2步 每步就是1s
    end    看不见最后一帧
    start  看不见第一帧
<!-- 当num为12时, 整个动画最好有13帧 -->

steps(2, end / start) 
eg：
transition-timing-function: steps(2, end / start) ;

\\ cubic-bezier()   通过贝塞尔曲线指定时序函数
https://cubic-bezier.com/#.17,.67,.83,.67
网站中可以查询数值#.17,.67,.83,.67      手柄的两个坐标
eg：
transition-timing-function: cubic-bezier(0,0,1,1); 
<!-- X轴代表时间, Y轴代表width 或者 位置 -->



### transitionend 过渡完成事件
检查过渡是否完成:
当过渡完成后会触发该事件, 每一个拥有过渡的属性完成时 都会触发一次transitionend事件
比如 width height的过程完成 会触发两次alert事件

在transition完成前 设置display:none 是不会触发该事件了
inner.addEvenetListener('transitionend', function(){},false);



### 视距
> perspective
- 开启视距后 页面就会有透视效果, 想做3D效果一定要写上 perspective
html {
    perspective:800px;      
}
<!-- 
    设置当前网页的视距为800px，人眼距离网页的距离 也就是说我眼睛和屏幕之间的距离是800px
    设置的不宜过小 600 - 1200 / 800 - 1000 这个区间范围
 -->


### 2D - 3D
transform 变形的默认效果 是2D效果 假如需要显示3D效果 则需要开启
{
    transform-style: preserve-3d;
}


### 是否显示元素的背面
{
    backface-visibility:hidden / visible
}






### 2D变形
transform:   用来设置元素变形的效果 里面怎么变还是要通过函数来指定
> transform属性 只对block级元素生效

X轴：水平方向叫X轴
Y轴：垂直方向叫Y轴
Z轴：想象成屏幕有一根箭 扎向眼睛 元素里我们人的距离叫做Z轴 Z轴越大离我们就越近


### 平移
> translate();      
平移

> translateX()      
沿着X轴方向平移, 可以指定具体数值，也可以指定百分比, 在指定百分比时 偏移量是相对于自己进行计算的
- eg：
transform:translateX(50%);          //向右移动自身宽度的50%
- eg：
transform:translateX(100px);        //元素向右移动100px的距离 有点像margin但是不会影响别的元素

>translateY()      
沿着Y轴方向平移

> translateZ()
沿着Z轴方向平移
- Z轴平移 调整元素在Z轴的位置，正常情况下就是调整元素和人眼之间的距离 直接开启的话没有效果
- Z轴平移属于立体效果（近大远小） 默认情况下网页是不支持透视的 如果需要看见效果, 必须要设置网页的视距


### 旋转
开启视距后 更加的明显

> transform:rotate()
通过旋转可以让元素沿着 XYZ轴 旋转到指定的角度
- 单位: turn deg

> rotateX()           往后仰
> rotateY()
> rotateZ(45deg)      Z轴在中心 围着中心旋转45度 平面旋转

- 中心点的设置


### 倾斜
> transform:skew();
- 单位: 角度 deg

> transform:skewX(45deg);   X轴方向倾斜 --- 代表与Y轴的角度


### 缩放
> transform:scale()
- 对元素进行缩放 缩放的原理是把对应的轴给延长 所以Z轴是没有用的
- 要想看到Z轴的效果 必须要开启3D效果
- eg： transform-style:preserve-3d;
- 参数：
整数：放大倍数     小数：缩小
transform:scaleX(2);    // 沿着X轴放大两倍
- scaleY()
- scale()               // X Y轴 双方向缩放


### 变形的圆点
> transform-origin:
- 可选值：
center：    默认值
0 0：       元素的左上角



### 应用矩阵变换
> transform:matrix(a, b, c, d, e, f);

1   0   x
0   1   y
0   0   1

> 平移
transform:matrix(1, 0, 0, 1, x, y);
- 前面4个数字固定住的

> 旋转
transform:matrix(cos, sin, -sin, cos, 0, 0);
cos     -sin     0
sin     cos      0
0       0        1

<!-- 旋转360的话: sin360 = 0, cos360 = 1 -->
transform:matrix(1, 0, 0, 1, 0, 0);

> 倾斜

> 缩放
transform:matrix(scaleX, 0, 0, scaleY, 0, 0);



### 组合变换
> 组合变换在计算时 是从右往左的 先计算scale() 然后再计算translateX()
transform:translateX(100px), scale(.5);




### 3D变换
> perspective 景深(作用给它的子元素):
简单的理解就是我们肉眼距离显示器的距离, 景深越大元素离我们越远 效果就越不好 在css中 perspective用于激活一个3D空间 属性值就是景深大小
应用景深的元素成为 舞台元素 它的所有后代元素都会受影响(如果后代元素中也开启了perspective属性,效果是叠加 不是覆盖) 

- 作用:让场景有近大远小的效果(我们肉眼距离屏幕的距离), 它是不可继承属性, 但它可以作用域后代元素
- 用法:
> 父元素中使用属性  perspective:300px;              作用于后代元素
> 元素本身中使用    transform:perspective(300px)    作用于元素本身  注意 这个必须放在首位

> 灭点:
景深控制的是灭点 交叉点是灭点

> 景深基点 用来控制视角的位置
x y轴的位置通过 perspective-origin:x y;     控制    默认值为盒模型的50% 50%
Z轴的位置用过   perspective:num;            控制

> 平移
> 旋转 rotate3d()
rotate3d(1, 1, 1, 360deg)

> 缩放 transform:scale3d(x, y, z)
如果只设置 transform:scaleZ(num) 会发现元素并没有扩大 或 缩小 scaleZ(num) 需要translateZ(length)配合使用, num乘以length得到的值 是元素沿着Z轴移动的距离 从而使感觉扩大或压缩

> transform:scaleZ(2) translateZ(100px);



### transform-style:perserve-3d;
- transform-style 营造有层级的3D舞台

> 不可继承属性, 作用于子元素 



### 隐藏背面
backface-visibility: hidden / visible




