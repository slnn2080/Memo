### 动画
keyframes identifier {
    from{ }     
    to{ }
}

from to:
from 开始时候是什么样子
to 最终时候变成什么样子

keyframes identifier {
    from{ transform:translateY(-100px); }     
    to{transform:translateY(100px); }
}
从元素一上来的位置，瞬间到-100px 从-100px 到 100px 移动 动画执行完回到元素一上来的位置

那我现在就想让它从-100px开始（不要从原位置跳到-100px，因为我不想考虑元素本身一开始的位置，我就想设定from就是开始的位置）
这时候就有一个属性：

> animation-fill-mode:        动画的填充模式
> 它是用来控制元素在动画外的状态
那什么时候是在动画外 from之前 to之后就是动画外
可选值：
none        默认值 动画执行完毕元素回到初始位置 原来位置
backwards   from之前的状态 和 from的状态保持一致， 动画开始时在from(也就是在from处延时) 最终回到元素本身的位置
forwards    to之后的状态 和 to的状态保持一致，动画会在to的位置上停
both        结合了forwards 和 backwards两个属性的特点 动画开始时就在from 结束时在to





### 动画的属性

> animation 属性：
> animation-name:             要对当前元素生效的名字
> animation-duration:         动画执行的时间

> animation-delay：           动画的延时
动画外的属性

> animation-timing-function:  动画的方式
它的速度作用于一个关键帧周期
0% - 50% 就算一个关键帧周期
50% - 100% 又是另一个关键帧周期


> animation-iteration-count:  动画执行的重复次数 (重复的是关键帧 from - to from - to)
- eg：
animation-iteration-count: 3 / infinite 无限


> animation-direction:        动画执行的方向 
- 可选值：
normal      从from - to 运行
reverse     从to - from 运行 (反转的也是关键帧 和 动画内的属性)
alternate   来回运行    去：from - to 回来：to - from
alternate-reverse
    回来运行    去：to - from 回来：from - to


> animation-play-state:       动画执行的状态
- 可选值：
running 默认值 动画执行
paused 动画暂停  比如 当鼠标移入时暂停


> animation-fill-mode:        动画的填充模式
- 可选值：
none        默认值 动画执行完毕元素回到初始位置 原来位置
forwards    动画执行完毕 停止在to的位置 终点位置
backwards   动画延时等待时 就会展示from里的状态
both        结合了forwards 和 backwards两个属性的特点 动画开始时就在开始位置 结束时在结束位置


> 简写属性：
没有特别的顺序要求，只需要注意时间 第一个是duration 第二个是delay
animation: test 2s 2 1s alternate;


### 动画的语法：

@keyframes animationName {
    keyframes-selector {
        cssStyle;
    }
}

keyframes-selector:
from 0%
to 100%
还能定义其他的百分值

keyframes identifier {
    0% { transform:translateY(-100px); }     
    50% {transform:translateY(-50px); }
    100% {transform:translateY(100px); }
}

0% - 50% 代表的是时间 也就是说 平分的是时间 前一半时间走的距离比较短 后一半时间走的距离比较长 那前一半的时间就慢一点，后一半时间就快一点 因为走的路是不一样的 但时间被平分的一样
