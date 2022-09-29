# Animate.js
### URL:

https://www.animejs.cn/documentation/#endDelay

<br>

### 下载:
    npm install animejs 

### 引入:
```js
<script type="text/javascript" src="js/anime.min.js"></script>

import anime from "animejs"
```

引入动画库全局就会多出 `anime函数` 我们通过 `anime函数` 来创建动画

可以使用 变量接收返回的对象(实例) 因为我们通过实例可以调用实例身上的方法 当然也可以不用接收

<br>

# 配置对象

### anime({配置对象})
通过 `anime({})` 创建实例对象 并传入配置
```js
var myAnimation = anime({
  targets: ['.blue', '.green'],
  translateX: '13rem',
  rotate: 180,
  borderRadius: 8,
  duration: 2000,
  loop: true
});
```


### 配置对象:
#### **targets**: 字符串型选择器字符串 || DOM语法获取节点
指定要做动画效果的目标

```js
targets: '.item'
```

```js
targets: el.querySelectorAll('.item')
targets: el.querySelector('.item')
```

<br>

### 配置对象中可以直接写要做动画的css样式
大多数CSS属性都会导致布局更改或重新绘制，并会导致动画不稳定。 因此尽可能优先考虑opacity和CSS transforms。

```js
anime({
  targets: '.css-prop-demo .el',

  // ----样式
  left: '240px',
  backgroundColor: '#FFF',
  borderRadius: ['0%', '50%'],
  // ----样式

  easing: 'easeInOutQuad'
});
```


### 配置对象中动画的基础参数
### duration:
定义动画的持续时间（以毫秒为单位）。

值类型:
Number
anime.stagger()
<!-
  交错动画 每个依次延迟多少秒执行
  duration: anime.stagger(150)
 -->

Function
duration: (el, i) =### i * 150

```js
duration: 1000
```


### delay
定义动画的延迟（以毫秒为单位）。

值类型
Number
anime.stagger()
Function
duration: (el, i) =### i * 150

```js
delay: 1000
```

### endDelay
在动画结束时以毫秒为单位添加一些额外时间。

值类型: 
同上


### easing
定义动画的时间曲线。
值类型: String


easing: 'linear'
匀速
不对动画应用任何缓动时间曲线。
对于opacity和colors过渡很有用。

出入场:
    IN	             OUT	           IN-OUT	
'easeInQuad'    'easeOutQuad'   'easeInOutQuad'   由快至慢

'easeInCubic'   'easeOutCubic'	'easeInOutCubic'	由快至慢，效果更强

'easeInQuart'   'easeOutQuart'	'easeInOutQuart'	由快至慢，效果更强

'easeInQuint'   'easeOutQuint'	'easeInOutQuint'	由快至慢，效果更强

'easeInSine'    'easeOutSine'   'easeInOutSine'	  由快至慢，比Quad弱

'easeInExpo'    'easeOutExpo'   'easeInOutExpo'	  突然减速，效果较强

'easeInCirc'    'easeOutCirc'   'easeInOutCirc'	  突然减速，效果较弱

'easeInBack'    'easeOutBack'   'easeInOutBack'	  冲出终点后返回


三次贝塞尔
easing: 'cubicBezier(.5, .05, .1, .3)'
https://matthewlein.com/tools/ceaser


弹簧
easing: 'spring(mass, stiffness, damping, velocity)'
弹簧动画的持续时间由弹簧参数定义。不会考虑动画持续时间参数。

PARAMETER	    DEFAULT   	MIN   	MAX
Mass	        1         	0	      100
Stiffness	    100	        0	      100
Damping	      10	        0     	100
Velocity	    0	          0	      100
```js
anime({
  targets: '.spring-physics-demo .el',
  translateX: 250,
  direction: 'alternate',
  loop: true,
  easing: 'spring(1, 80, 10, 0)'
})
```


弹跳
easing: 'easeOutElastic(amplitude, period)'


台阶式
定义动画到达其结束值所需的跳转次数。
easing: 'steps(numberOfSteps)'

```js
anime({
  targets: '.step-easing-demo .el',
  translateX: 250,
  direction: 'alternate',
  loop: true,
  easing: 'steps(5)'
})
```




```js
easing: 'easeInOutExpo'
```


### round
将动画值四舍五入到一个小数

值类型:
Number

```js
// 将动画值四舍五入到一个小数
round: 10
```


### function
它是作为配置项中key 所对应的value出现的
为动画的每个目标和属性设置不同的值。

function 接受三个参数:
(target, index, targetsLength) =### { ... }
target
当前动画目标元素

index
动画目标的索引

targetsLength	
总动画目标数


需要 return 

```js
anime({
  targets: '.function-based-params-demo .el',
  translateX: 270,
  direction: 'alternate',
  loop: true,

  delay: function(el, i, l) {
    return i * 100;
  },

  endDelay: function(el, i, l) {
    return (l i) * 100;
  }
});
```


### direction
定义动画的方向。

值为:
"normal"    正方向动画
"reverse"   反方向动画
"alternate" 往返

```js
anime({
  targets: '.dir-reverse',
  translateX: 250,
  direction: 'reverse',
  easing: 'easeInOutSine'
});
```


### loop
定义动画的往复次数。
值类型:
Number:   循环次数
true:     无限循环


### autoplay
定义动画是否应自动启动。
值类型:
true    开启自动播放
false   关闭自动播放


### keyframes

1. 动画关键帧
动画关键帧是使用keyframes属性中的数组定义的。
如果关键帧内没有指定duration（持续时间），则每个关键帧的持续时间将等于动画总持续时间除以关键帧数。

值类型:
Array

```js
anime({
  targets: '.animation-keyframes-demo .el',

  keyframes: [
    {translateY: -40},
    {translateX: 250},
    {translateY: 40},
    {translateX: 0},
    {translateY: 0}
  ],

  duration: 4000,
  easing: 'easeOutElastic(1, .8)',
  loop: true
});
```

2. 属性关键帧
与动画关键帧类似，属性关键帧是使用属性对象的Array定义的。 属性关键帧允许重叠动画，因为每个属性都有自己的关键帧数组。

```js
anime({
  targets: '.property-keyframes-demo .el',
  translateX: [
    { value: 250, duration: 1000, delay: 500 },
    { value: 0, duration: 1000, delay: 500 }
  ],
  translateY: [
    { value: -40, duration: 500 },
    { value: 40, duration: 500, delay: 1000 },
    { value: 0, duration: 500, delay: 1000 }
  ],
  scaleX: [
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900 },
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900 }
  ],
  scaleY: [
    { value: [1.75, 1], duration: 500 },
    { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 },
    { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 }
  ],
  easing: 'easeOutElastic(1, .8)',
  loop: true
});
```

----------------

### 配置对象中的赋值方式

### 1. 目标元素属性值 原本就单位的情况:
如果原始值具有单位，则它将自动添加到动画值中。

```js
anime({
  targets: '.unitless-values-demo .el',
  translateX: 250,  // -### '250px'
  rotate: 540       // -### '540deg'
});
```

### 2. 目标元素属性值 原本就有单位的情况:
强制动画使用某个单位并自动转换初始目标值。

```js
// 原本是px 强制转换为 100%
anime({
  targets: '.specific-unit-values-demo .el',
  width: '100%',      // -### from '28px' to '100%',
  easing: 'easeInOutQuad',
  direction: 'alternate',
  loop: true
});
```


### 3. 相对数值
在原始的数值上 做添加，减去或乘以原始值。

'+='	Add	      '+=100'
'-='	Substract	'-=2turn'
'*='	Multiply	'*=10'

```js
anime({
  targets: '.el.relative-values',
  translateX: {
    value: '*=2.5',   // 100px * 2.5 = '250px'
    duration: 1000
  },
  width: {
    value: '-=20px',  // 28 20 = '8px'
    duration: 1800,
    easing: 'easeInOutSine'
  },
  rotate: {
    value: '+=2turn', // 0 * 2 = '2turn'
    duration: 1800,
    easing: 'easeInOutSine'
  },
```


### 4. 颜色值:
Haxadecimal	
    '#FFF' or '#FFFFFF'
    
RGB	
    'rgb(255, 255, 255)'

RGBA	
    'rgba(255, 255, 255, .2)'

HSL	
    'hsl(0, 100%, 100%)'

HSLA	
    'hsla(0, 100%, 100%, .2)'


### 5. 设定动画初始值
强制动画以指定值开始。
就是将一个属性值 以数组的方式去写

值类型:
Array

```js
anime({
  targets: '.el.from-to-values',

  translateX: [100, 250], // from 100 to 250

  delay: 500,
  direction: 'alternate',
  loop: true
});
```


### 6. 函数的返回值
就是将一个属性值 以函数的方式去写

值类型
Function

参数:
target index targetsLength

```js
anime({
  targets: '.function-based-values-demo .el',
  translateX: function(el) {
    return el.getAttribute('data-x');
  },
  translateY: function(el, i) {
    return 50 + (-50 * i);
  },
  scale: function(el, i, l) {
    return (l i) + .25;
  },
  rotate: function() { return anime.random(-360, 360); },
  borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
  duration: function() { return anime.random(1200, 1800); },
  delay: function() { return anime.random(0, 400); },
  direction: 'alternate',
  loop: true
});
```

----------------

### 交错动画

### anime.stagger(value, [options])
每个元素的动画之间 延迟依次相隔多少毫秒

参数:
Value: Number, String, Array	
options: Object 交错参数

```js
anime({
  targets: '.basic-staggering-demo .el',
  translateX: 270,
  delay: anime.stagger(100) // 每个元素的延迟增加100毫秒。
});
```


### anime.stagger([Array])
参数:
[startValue, endValue]

```js
anime({
  targets: '.range-value-staggering-demo .el',
  translateX: 270,
  rotate: anime.stagger([-360, 360]), // 旋转将在-360deg到360deg之间均匀分布在所有元素之间
  easing: 'easeInOutQuad'
});
```


### options的配置项:
start:
从特定值开始产生交错效果。

```js
delay: anime.stagger(100, {start: 500}) // 延迟从500ms开始，然后每个元素增加100ms。
```


from:
从特定位置开始交错效果。

值类型:
"first(default)"
从第一个元素开始效果

"last"
从最后一个元素开始效果

"center"
从中心开始效果

index
从指定的索引启动效果

```js
anime({
  targets: '.staggering-from-demo .el',
  translateX: 270,
  delay: anime.stagger(100, {from: 'center'})
});
```


direction:
更改交错动画的顺序。

值类型
"normal"
正常交错方向，从第一个元素到最后一个元素。

"reverse"
倒退交错方向，从最后一个元素到第一个元素

```js
anime({
  targets: '.staggering-direction-demo .el',
  translateX: 270,
  delay: anime.stagger(100, {direction: 'reverse'})
});
```


easing:
使用easing函数设置交错值。

"string"
function
<!-
  'string'	All valid easing names are accepted
  function(i)	Use your own custom easings function
 -->

```js
anime({
  targets: '.staggering-easing-demo .el',
  translateX: 270,
  delay: anime.stagger(300, {easing: 'easeOutQuad'})
});
```


grid
基于数组的交错值，*以产生“波纹”效应。*
值类型: Array
grid: [rows, columns]

```js
anime({
  targets: '.staggering-grid-demo .el',
  scale: [
    {value: .1, easing: 'easeOutSine', duration: 500},
    {value: 1, easing: 'easeInOutQuad', duration: 1200}
  ],

  delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
});
```


axis
定义网格交错 效果的方向。

值类型:
"x"
"y"

```js
anime({
  targets: '.staggering-axis-grid-demo .el',
  translateX: anime.stagger(10, {grid: [14, 5], from: 'center', axis: 'x'}),
  translateY: anime.stagger(10, {grid: [14, 5], from: 'center', axis: 'y'}),
  rotateZ: anime.stagger([0, 90], {grid: [14, 5], from: 'center', axis: 'x'}),
  delay: anime.stagger(200, {grid: [14, 5], from: 'center'}),
  easing: 'easeInOutQuad'
});
```

----------------

### 时间轴(TIMELINE)
时间轴的创建方式是 在创建实例对象的时候 没有使用 anime()
而是使用的 anime.timeline({})

作用:
时间轴可让你将多个动画同步在一起。
默认情况下，添加到时间轴的每个动画都会在上一个动画结束时开始。


### let tl = anime.timeline({配置对象})
用于创建一个时间轴 配置对象里面是 默认的配置
当有子项的时候 会继承这些默认的配置

### tl.add({子项的配置对象})
用来往时间轴上添加做动画的元素

```js
// 使用默认参数创建时间轴
var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

// 增加子项
tl
.add({
  targets: '.basic-timeline-demo .el.square',
  translateX: 250,
})
.add({
  targets: '.basic-timeline-demo .el.circle',
  translateX: 250,
})
.add({
  targets: '.basic-timeline-demo .el.triangle',
  translateX: 250,
});

```


### 时间轴的偏移量 tl.add(配置对象, 偏移量)
也就是每个子项的偏移量 用于设置子项的动画开始的时间

可以使用时间轴的 .add()函数的第二个可选参数指定时间偏移。
它定义动画在时间轴中的开始时间，如果未指定偏移，则动画将在上一个动画结束后开始。
偏移可以相对于最后一个动画，也可以相对于整个时间轴。

String	'+='	
    '+=200'	相对位置：在上一个动画结束后200ms开始

String	'-='	
    '-=200'	相对位置：在上一个动画结束前200ms开始

Number	Number	
    100	绝对位置：无论时间轴的上一个动画何时结束，这个动画都在100毫秒处开始

```js
// 使用默认参数创建时间轴
var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl
.add({
  targets: '.offsets-demo .el.square',
  translateX: 250,
})

.add({
  targets: '.offsets-demo .el.circle',
  translateX: 250,
}, '-=600') // 相对偏移量

.add({
  targets: '.offsets-demo .el.triangle',
  translateX: 250,
}, 0); // 绝对偏移量
```

----------------

### 动画控制
通过animte的实例对象来调用
播放暂停的动画，如果 autoplay 参数设置为false，则启动动画

### anime对象.play();
### anime对象.pause();

```js
var animation = anime({
  targets: '.play-pause-demo .el',
  translateX: 270,
  delay: function(el, i) { return i * 100; },
  direction: 'alternate',
  loop: true,

  // 开启 autoplay
  autoplay: false,
  easing: 'easeInOutSine'
});

document.querySelector('.play-pause-demo .play').onclick = animation.play;
document.querySelector('.play-pause-demo .pause').onclick = animation.pause;
```

### anime对象.restart();
从动画的初始值重新开始动画。

### anime对象.reverse();
反转动画的方向。

### anime对象.seek();
跳转到特定时间（以毫秒为单位）。
也可用于在滚动时控制动画。
animation.seek((scrollPercent / 100) * animation.duration);

```js
var animation = anime({
  targets: '.seek-anim-demo .el',
  translateX: 270,
  delay: function(el, i) { return i * 100; },
  elasticity: 200,
  easing: 'easeInOutSine',
  autoplay: false
});

var seekProgressEl = document.querySelector('.seek-anim-demo .progress');
seekProgressEl.oninput = function() {
  animation.seek(animation.duration * (seekProgressEl.value / 100));
};
```


### 时间轴控制
timeline.play();
timeline.pause();
timeline.restart();
timeline.seek(timeStamp);

```js
var controlsProgressEl = document.querySelector('.timeline-controls-demo .progress');

var tl = anime.timeline({
  direction: 'alternate',
  loop: true,
  duration: 500,
  easing: 'easeInOutSine',
  update: function(anim) {
    controlsProgressEl.value = tl.progress;
  }
});

tl
.add({
  targets: '.timeline-controls-demo .square.el',
  translateX: 270,
})
.add({
  targets: '.timeline-controls-demo .circle.el',
  translateX: 270,
}, '-=100')
.add({
  targets: '.timeline-controls-demo .triangle.el',
  translateX: 270,
}, '-=100');

document.querySelector('.timeline-controls-demo .play').onclick = tl.play;
document.querySelector('.timeline-controls-demo .pause').onclick = tl.pause;
document.querySelector('.timeline-controls-demo .restart').onclick = tl.restart;

controlsProgressEl.addEventListener('input', function() {
  tl.seek(tl.duration * (controlsProgressEl.value / 100));
});
```

----------------

### 回调函数/事件函数
它也是一个配置项 写在配置对象里面 它的值为一个函数

### update
动画开始播放后，每帧都会触发此回调。

回调的参数
返回当前动画对象

```js
var updates = 0;

anime({
  targets: '.update-demo .el',
  translateX: 270,
  delay: 1000,
  direction: 'alternate',
  loop: 3,
  easing: 'easeInOutCirc',

  update: function(anim) {
    updates++;
    progressLogEl.value = 'progress : '+Math.round(anim.progress)+'%';
    updateLogEl.value = 'updates : '+updates;
  }
});
```


### begin
当动画开始播放时，begin()回调被触发一次。

### complete
动画完成后，会触发一次complete()回调。

如果动画的持续时间为0，则begin()和complete()都会被调用。

```js
anime({
  targets: '.begin-complete-demo .el',
  translateX: 240,
  delay: 1000,
  easing: 'easeInOutCirc',
  update: function(anim) {
    progressLogEl.value = 'progress : ' + Math.round(anim.progress) + '%';
    beginLogEl.value = 'began : ' + anim.began;
    completeLogEl.value = 'completed : ' + anim.completed;
  },
  begin: function(anim) {
    beginLogEl.value = 'began : ' + anim.began;
  },
  complete: function(anim) {
    completeLogEl.value = 'completed : ' + anim.completed;
  }
});
```


### loopBegin
每次循环开始时都会触发一次loopBegin() 回调。

### loopComplete
每次循环结束时，就会触发一次loopComplete()回调函数。

```js
var loopBegan = 0;
var loopCompleted = 0;

anime({
  targets: '.loopBegin-loopComplete-demo .el',
  translateX: 240,
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutCirc',
  loopBegin: function(anim) {
    loopBegan++;
    beginLogEl.value = 'loop began : ' + loopBegan;
  },
  loopComplete: function(anim) {
    loopCompleted++;
    completeLogEl.value = 'loop completed : ' + loopCompleted;
  }
});
```


### change
在动画的delay和endDelay之间的每个帧上触发此回调。

```js
var changes = 0;

anime({
  targets: '.change-demo .el',
  translateX: 270,
  delay: 1000,
  endDelay: 1000,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutCirc',
  update: function(anim) {
    progressLogEl.value = 'progress : '+Math.round(anim.progress)+'%';
  },
  change: function() {
    changes++;
    changeLogEl.value = 'changes : ' + changes;
  }
});
```

### changeBegin
每次动画改变开始时都会触发changeBegin()回调

### changeComplete
每次动画改变结束时都会触发changeComplete()回调

动画方向将影响触发changeBegin()和changeComplete()的顺序

```js
var changeBegan = 0;
var changeCompleted = 0;

anime({
  targets: '.changeBegin-chnageComplete-demo .el',
  translateX: 240,
  delay: 1000,
  endDelay: 1000,
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutCirc',
  update: function(anim) {
    progressLogEl.value = 'progress : '+Math.round(anim.progress)+'%';
  },
  changeBegin: function(anim) {
    changeBegan++;
    beginLogEl.value = 'change began : ' + changeBegan;
  },
  changeComplete: function(anim) {
    changeCompleted++;
    completeLogEl.value = 'change completed : ' + changeCompleted;
  }
});
```


### PROMISE
动画完成后，每个动画实例都会返回一个完成的promise。
```js
animation.finished.then(function() {
  // Do things...
});
```

```js
var progressLogEl = document.querySelector('.promise-demo .progress-log');
var promiseEl = document.querySelector('.promise-demo .el');
var finishedLogEl = document.querySelector('.promise-demo .finished-log');
var demoPromiseResetTimeout;

function logFinished() {
  anime.set(finishedLogEl, {value: 'Promise resolved'});
  anime.set(promiseEl, {backgroundColor: '#18FF92'});
}

var animation = anime.timeline({
  targets: promiseEl,
  delay: 400,
  duration: 500,
  endDelay: 400,
  easing: 'easeInOutSine',
  update: function(anim) {
    progressLogEl.value = 'progress : '+Math.round(anim.progress)+'%';
  }
}).add({
  translateX: 250
}).add({
  scale: 2
}).add({
  translateX: 0
});

animation.finished.then(logFinished);
```

----------------

### ANIME.JS方法
anime身上的方法 不是实例对象身上的方法

### 删除目标
### anime.remove(targets)
从正在运行的动画或时间轴中删除目标。
targets参数接受与targets 属性相同的值。

```js
anime({
  targets: '.remove-demo .el',
  translateX: 270,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutQuad'
});

document.querySelector('.remove-el-button').addEventListener('click', function() {
  anime.remove('.remove-demo .line:nth-child(2) .el');
});
```


### 获取值
### anime.get(node, 属性名, "可以设置单位");
返回元素的原始值。

```js
var logEl = document.querySelector('.get-value-demo-log');
var el = document.querySelector('.get-value-demo .el');

logEl.innerHTML = '';
logEl.innerHTML += '".el" width is :<br>';
logEl.innerHTML += '"' + anime.get(el, 'width', 'px') + '"';
logEl.innerHTML += ' or "' + anime.get(el, 'width', 'rem') + 'rem"'
```


### 设定值
### anime.set(targets, {property: value});
立即将值设置为指定的目标。

```js
anime.set('.set-value-demo .el', {
  translateX: function() { 
    return anime.random(50, 250); 
  },
  rotate: function() { 
    return anime.random(0, 360); 
  },
});
```


### 随机数
### anime.random(minValue, maxValue);
返回特定范围内的随机整数。

```js
function randomValues() {
  anime({
    targets: '.random-demo .el',
    translateX: function() {
      return anime.random(0, 270);
    },
    easing: 'easeInOutQuad',
    duration: 750,
    complete: randomValues
  });
}

randomValues();
```


### 运行的对象
### anime.running
返回当前正在运行的所有活动anime.js实例的Array。
```js
var runninLogEl = document.querySelector('.running-log');

anime({
  targets: '.running-demo .square.el',
  translateX: 270,
  direction: 'alternate',
  loop: true,
  easing: 'linear'
});

anime({
  targets: '.running-demo .circle.el',
  translateX: 270,
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutCirc'
});

anime({
  targets: '.running-demo .triangle.el',
  translateX: 270,
  direction: 'alternate',
  easing: 'easeInOutQuad',
  loop: true,
  update: function() {
    runninLogEl.innerHTML = 'there are currently ' + anime.running.length + ' instances running';
  }
});
```


### 示例部分:
页面元素上用的position absolute

```js
let div2 = document.querySelector(".temp-right")
    
let tl = anime.timeline({
  easing: 'easeInOutQuad',
})

tl.add({
  targets: '.temp-left',
  keyframes: [
    {translateX: -300},
    {translateX: 0}
  ],
  opacity: ["0.5", "1"],
  duration: "2000"
}, 0)
.add({
  targets: '.temp-right',
  keyframes: [
    {translateX: 300 },
    {translateX: 0}
  ],
  opacity: ["0.5", "1"],
  duration: "2000"
}, 0)
```
