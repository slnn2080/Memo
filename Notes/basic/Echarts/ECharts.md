# 项目特点:
一端操作多端连用

<br><br>

# 后台代码相关:

## 目录结构:
```s
| - data
  - 里面存放着各种数据

| - middleware
  - header相关: 跨域相关的设置
  - duration相关: 计算了下程序的执行时间 将它设置到响应头中 ctx.set('X-Response-Time', duration + 'ms')
  - data相关: 读取json数据文件 做响应

| - utils
  - 定义了读取json文件的方法

| - service
  - web_socket_service.js
  - 如果客户端给服务器发送的消息是获取数据 则将对应的数据读取后交给客户端处理 如果不是获取数据 则将发送的数据 交给所有的链接服务器的客户端
```

<br><br>

# Echarts:
ECharts是百度公司开源的一个使用 Javascript 实现的开源可视化库, 兼容性强, 底层依赖矢量图形库(ZRender), 提供直观, 交互丰富, 可高度个性化定制的数据可视化图表。

echarts是在ZRender的基础上再次的进行封装 让它在功能 交互等方面有很大的提高

<br>

**官网:**
```s
https://echarts.apache.org/zh/index.html
```

<br><br>

## Echarts特点:
```s
https://echarts.apache.org/zh/index.html
```

<br>

### 流数据的支持
对于超大的数据量而言的话 数据本身就会非常的耗费资源 echarts支持对流数据的动态渲染

**动态渲染:**  
加载多少数据 就渲染多少数据 可以省去漫长数据加载的等待时间

<br>

**增量渲染技术:**  
它还提供了增量渲染技术 可以让我们只渲染变化的数据 可以提供系统的资源利用

<br><br>

# Echarts基本使用

<br>

### 下载echarts
```
npm view echarts versions
```

<br>

### 原生Echarts的使用:
1. 引入 echarts.js 文件
2. 准备一个呈现图表的盒子 (div该盒子决定图表呈现的位置)
3. 初始化echarts实例对象 (通过实例对象进行图表设置)
```js
const chart = echarts.init(document.querySelector("#wrap"))
```

4. 准备配置项

5. 将配置项设置给echarts实例对象
```js
chart.setOption(ops)
```

<br>

### 示例:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>

  <!-- 1. 引入echarts.js文件 -->
  <script src="../node_modules/echarts/dist/echarts.js"></script>
  <style>
    #wrap {
      width: 600px;
      height: 400px;
    }
  </style>
</head>

<body>

<!-- 2. 准备一个有高度的div -->
<div id="wrap"></div>

<script>
  // 3. 初始化 echarts 实例对象 传入图表的容器
  const chart = echarts.init(document.querySelector("#wrap"))

  // 4. 准备配置项
  const ops = {
    xAxis: {
      type: "category",
      data: ["temp1", "temp2", "temp3"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "语文",
        type: "bar",
        data: [70, 71, 72]
      }
    ]
  }

  // 5. 将配置项设置给echarts实例对象
  chart.setOption(ops)
</script>
</body>
</html>
```

<br>

### 总结:
一个图表最终呈现什么样子, **完全取决于这个配置项** 所以对于不同的图表, 除了配置项会发生改变之外 **其它的代码都是固定不变的**

<br>

**配置项的网址:**  
```s
https://echarts.apache.org/zh/option.html#title
```

<br><br>

# 通用配置
所有图表都可以使用的配置, 我们下面写的都是options配置项中的直接子元素

- title: 标题
- tooltip: 提示
- toolbox: 工具按钮
- legend: 图例

<br>

## title: 图表的大标题

### 类型:
```js
{
  id ... ,
  show: true ,
  text: '' ,
  link: '' ,
  target: 'blank' ,
  textStyle: {...} ,
  subtext: '' ,
  sublink: '' ,
  subtarget: 'blank' ,
  subtextStyle: {...} ,
  textAlign: 'auto' ,
  textVerticalAlign: 'auto' ,
  triggerEvent: false ,
  padding: 5 ,
  itemGap: 10 ,
  zlevel: 0 ,
  z: 2 ,
  left: 'auto' ,
  top: 'auto' ,
  right: 'auto' ,
  bottom: 'auto' ,
  backgroundColor: 'transparent' ,
  borderColor: '#ccc' ,
  borderWidth: 0 ,
  borderRadius: 0 ,
  shadowBlur ... ,
  shadowColor ... ,
  shadowOffsetX: 0 ,
  shadowOffsetY: 0 ,
}
```

<br>

### 属性概述:

**title.text:**  
主标题的文本, 支持使用 ``\n`` 进行换行

<br>

**title.link:**  
主标题的文本超链接

<br>

**title.textStyle:**  
对象类型, 文本样式

```js
options: {
  title: {
    textStyle: {

      // 主标题颜色
      color: "",

      // 主标题字体风格
      fontStyle: "normal | italic | oblique",

      // 主标题字体的粗细
      fontWeight: "数值 | normal | bold | bolder | lighter"

    }
  }
}
```

<br>

**title.borderWidth:**  
标题的边框


<br>

**title.borderColor:**  
标题的边框颜色

<br>

**title.borderRadius:**  
标题的边框的圆角


<br>

**title.left | right | top | bottom:**  
标题离容器的距离

<br><br>

## tooltip: 提示框组件
用于配置鼠标滑过或点击图表时的显示框, 内部会展示 series中的name值 类别名 和 数据

- trigger: 触发类型
- triggerOn: 触发时机
- formatter: 格式化

<br>

### 类型:
```js
{
  show: true ,
  trigger: 'item' ,
  axisPointer: {...} ,
  showContent: true ,
  alwaysShowContent: false ,
  triggerOn: 'mousemove|click' ,
  showDelay: 0 ,
  hideDelay: 100 ,
  enterable: false ,
  renderMode: 'html' ,
  confine: false ,
  appendToBody: false ,
  className ... ,
  transitionDuration: 0.4 ,
  position ... ,
  formatter ... ,
  valueFormatter ... ,
  backgroundColor: 'rgba(50,50,50,0.7)' ,
  borderColor: '#333' ,
  borderWidth: 0 ,
  padding: 5 ,
  textStyle: {...} ,
  extraCssText ... ,
  order: 'seriesAsc' ,
}
```

<br>

### 属性概述:

**tooltip.trigger:**  
怎么才能呈现提示框

```js
tooltip: {
  // item: 鼠标移入到图形内部触发
  // axis: 坐标轴触发
  trigger: "item | axis | none"
}
```

<br>

**tooltip.triggerOn:**  
什么时机展示提示框

```js
tooltip: {
  // mouseover: 鼠标移入时展示提示框
  // click: 点击时
  triggerOn: "mouseover | click"
}
```

<br>

**tooltip.formatter:**  
类型: string function

作用:  
根据它可以决定我们的提示框中的内容 使用方式:
```s
https://echarts.apache.org/zh/option.html#tooltip.formatter
```

```js
tooltip: {
  // 字符串模板: 字符串决定提示框中内容
  /*
    模板变量在不同的图表中含义是不同的 {a} - {e}

    柱状图:
    {a}: 表示系列名称 series数组对象中的name属性
    {b}: 类目值 xAxis中的category对应的值
    {c}: 该类别对应的数据
  */
  formatter: "{b}的成绩是{c}"


  // 回调函数:
  /*
    回调参数 params: 数组对象
    {
      name: 类目名,
      data: 该分类对应的数据
    }
  */
  formatter: () => 返回值决定展示内容,
  formatter: params => `${params[0].name}的分数是: ${params[0].data}`

}
```

<br><br>

## toolbox: 工具栏
它内置了很多的功能 如 导出图片 数据视图 动态类型切换 数据区域缩放 重置等5个工具

<br>

### 类型:
```js
{
  id ... ,
  show: true ,
  orient: 'horizontal' ,
  itemSize: 15 ,
  itemGap: 8 ,
  showTitle: true ,
  feature: {...} ,
  iconStyle: {...} ,
  emphasis: {...} ,
  zlevel: 0 ,
  z: 2 ,
  left: 'auto' ,
  top: 'auto' ,
  right: 'auto' ,
  bottom: 'auto' ,
  width: 'auto' ,
  height: 'auto' ,
  tooltip ... ,
}
```

<br>

### 属性概述:

**toolbox.feature:**  
类型对象, 各工具配置项

```js
{
  toolbox: {
    feature: {

      // 开启导出图片(只要写了即使是{}也会开启功能)
      saveAsImage: {},

      // 开启数据视图 (类似数据组成的表格 可以修改数据)
      dataView: {},

      // 开启重置
      restore: {},

      // 区域缩放 
      dataZoom: {},

      // 在不同的两种图表之间进行切换
      magicType: {
        // 在指定的图表之间进行切换
        type: ["bar", "line"]
      }
    }
  }
}
```

<br><br>

## legend: 图例
legend是用来筛选series系列中的对象的(series系列是数组对象)

**legend需要配合series来使用**, 比如我们的series格式为
```js
series: [
  {语文成绩相关},
  {数学成绩相关}
]
```

而我们的legend就是用来筛选语文成绩 或者 数据成绩的, 我们设置完图例后 会产生两个按钮 用于筛选数据的

![图例](./imgs/图例.png)

<br>

### 类型:
```js
{
  type ... ,
  id ... ,
  show: true ,
  zlevel: 0 ,
  z: 2 ,
  left: 'auto' ,
  top: 'auto' ,
  right: 'auto' ,
  bottom: 'auto' ,
  width: 'auto' ,
  height: 'auto' ,
  orient: 'horizontal' ,
  align: 'auto' ,
  padding: 5 ,
  itemGap: 10 ,
  itemWidth: 25 ,
  itemHeight: 14 ,
  itemStyle: {...} ,
  lineStyle: {...} ,
  symbolRotate: 'inherit' ,
  formatter ... ,
  selectedMode: true ,
  inactiveColor: '#ccc' ,
  inactiveBorderColor: '#ccc' ,
  inactiveBorderWidth: 'auto' ,
  selected ... ,
  textStyle: {...} ,
  tooltip ... ,
  icon ... ,
  data: [{...}] ,
  backgroundColor: 'transparent' ,
  borderColor: '#ccc' ,
  borderWidth: 1 ,
  borderRadius: 0 ,
  shadowBlur ... ,
  shadowColor ... ,
  shadowOffsetX: 0 ,
  shadowOffsetY: 0 ,
  scrollDataIndex: 0 ,
  pageButtonItemGap: 5 ,
  pageButtonGap ... ,
  pageButtonPosition: 'end' ,
  pageFormatter: '{current}/{total}' ,
  pageIcons: {...} ,
  pageIconColor: '#2f4554' ,
  pageIconInactiveColor: '#aaa' ,
  pageIconSize: 15 ,
  pageTextStyle: {...} ,
  animation ... ,
  animationDurationUpdate: 800 ,
  emphasis: {...} ,
  selector: false ,
  selectorLabel: {...} ,
  selectorPosition: 'auto' ,
  selectorItemGap: 7 ,
  selectorButtonGap: 10 ,
}
```

<br>

### 属性概述:

**legend.data:**  
类型 数组对象 | 字符串, 图例的数据数组

数组项通常为一个字符串, 每一项代表一个系列的 name, legend中的data的值需要和series数组中某组数据的name值一致

<br>

```js
{
  legend: {
    // 数组中的元素为 series数组中每一个对象的name值
    data: ["语文", "数学"]
  }
}
```

<br><br>

# 配置项详解:
我们下面写的都是options配置项中的直接子元素

<br><br>

## grid: 直角坐标系的专用配置
我们学到的 散点图 折线图 和 柱形图 都是有一个特征 它们都是存在于x轴 和 y轴 我们都需要配置 xy轴

这种带有xy轴的图表我们称之为**直角坐标系**

<br>

### 作用:
grid是用来控制直角坐标系的 **布局** 和 **大小**

x轴 和 y轴 就是在grid的基础上进行绘制的

<br>

### 类型:
```js
{
  id ... ,
  show: false ,
  zlevel: 0 ,
  z: 2 ,
  left: '10%' ,
  top: 60 ,
  right: '10%' ,
  bottom: 60 ,
  width: 'auto' ,
  height: 'auto' ,
  containLabel: false ,
  backgroundColor: 'transparent' ,
  borderColor: '#ccc' ,
  borderWidth: 1 ,
  shadowBlur ... ,
  shadowColor ... ,
  shadowOffsetX: 0 ,
  shadowOffsetY: 0 ,
}
```

<br>

### 属性概述:

**grid.show:**  
是否显示直角坐标系网格 (图表的四周出现正方形将整个图标围起来)

类型: boolean

<br>

**grid.borderWidth:**  
网格边框的宽度

类型: number

<br>

**grid.borderColor:**  
边框的颜色

<br>

**grid.top left right bottom:**  
grid 组件离容器上侧的距离

类型: number | string

- string: left: "left | center | right"
- string: top: "top | middle | bottom"

- number: 20 | "20%"

<br>

**grid.width height:**  
组件的宽度和高度 (也就是控制图表的大小 内部内容默认自适应)  

<br><br>

## xAxis: 直角坐标系中的x轴

### 类型:
```js
{
  id ... ,
  show: true ,
  gridIndex: 0 ,
  alignTicks: false ,
  position ... ,
  offset: 0 ,
  type: 'category' ,
  name ... ,
  nameLocation: 'end' ,
  nameTextStyle: {...} ,
  nameGap: 15 ,
  nameRotate ... ,
  inverse: false ,
  boundaryGap ... ,
  min ... ,
  max ... ,
  scale: false ,
  splitNumber: 5 ,
  minInterval: 0 ,
  maxInterval ... ,
  interval ... ,
  logBase: 10 ,
  silent: false ,
  triggerEvent: false ,
  axisLine: {...} ,
  axisTick: {...} ,
  minorTick: {...} ,
  axisLabel: {...} ,
  splitLine: {...} ,
  minorSplitLine: {...} ,
  splitArea: {...} ,
  data: [{...}] ,
  axisPointer: {...} ,
  animation: true ,
  animationThreshold: 2000 ,
  animationDuration: 1000 ,
  animationEasing: 'cubicOut' ,
  animationDelay: 0 ,
  animationDurationUpdate: 300 ,
  animationEasingUpdate: 'cubicInOut' ,
  animationDelayUpdate: 0 ,
  zlevel: 0 ,
  z: 0 ,
}
```

<br>

### 属性概述:

**xAxis.type:**  
可选值: category | value | time | log

- category: 类目轴, 就如下图 当我们选择category的时候 可以指定 ``xAxis.data`` 为类目轴提供数据 A B C D E
```
x轴: 

___ ___ ___ ___ ___
 A   B   C   D   E
```

- value: 数值轴 (坐标轴上是数值)  
数值轴上的数据 会从 ``series[0].data`` 中获取, y轴的数值轴会针对x轴中的每一个类别 去 ``series[0].data`` 配置项中找对应的数据

- time: 时间轴

- log: 对数轴

<br>

**xAxis.boundaryGap: 折线图?**  
x轴对应的数据的点 和 y轴之间是有距离的, 如果我们想让数据点直接在y轴上 就使用这个配置

类型: boolean

- true: 有间隔
- false: 没有间隔

<br>

**xAxis.position:**   
我们xy轴默认 x轴在下方 y轴在左边, 我们可以对他们进行设置

- x轴的位置可以是 下方 或者 上方
- y轴的位置可以是 左边 或者 右边

<br>

作用:  
调整 x 轴的位置

类型: string  
可选值: "top | bottom"

注意:  
若未将 xAxis.axisLine.onZero 设为 false, 则该项无法生效

<br>

**xAxis.offset:**   
X 轴相对于默认位置的偏移, 在相同的 position 上有多个 X 轴的时候有用

注意:  
若未将 xAxis.axisLine.onZero 设为 false, 则该项无法生效

<br>

**xAxis.axisLine:**   
坐标轴轴线相关设置

```js
{
  // 是否显示坐标轴轴线。
  show: true ,

  // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上, 只有在另一个轴为数值轴且包含 0 刻度时有效。
  onZero: true ,

  // 当有双轴时, 可以用这个属性手动指定, 在哪个轴的 0 刻度上
  onZeroAxisIndex ... ,

  // 轴线两边的箭头。可以是字符串, 表示两端使用同样的箭头；或者长度为 2 的字符串数组, 分别表示两端的箭头。默认不显示箭头, 即 'none'。两端都显示箭头可以设置为 'arrow', 只在末端显示箭头可以设置为 ['none', 'arrow']。
  symbol: 'none' ,
  symbolSize: [10, 15] ,
  symbolOffset: [0, 0] ,
  lineStyle: {...} ,
}
```

<br><br>

## yAxis: 直角坐标系中的y轴

<br>

**yAxis.scale: 折线图?**  
脱离0值, 在数值轴上默认都是从0开始的 但有些情况下 我们希望以数据中的最小值开始

类型: boolean

- true: 支持缩放 数值轴的起点从数据中的最小值开始
- false: 默认值

![脱离0值](./imgs/脱离0值.png)

<br>

### 类型:
```js
{}
```

<br>

### 扩展:
xAxis 和 yAxis 可以进行互换 达到横向柱状图的效果

<br><br>

## dataZoom: 区域缩放
它是对数据范围进行过滤 x轴 和 y轴都可以拥有区域缩放器, 从而能自由关注细节的数据信息, 或者概览数据整体, 或者去除离群点的影响。

<br>

**效果:**  
x轴 和 y轴旁边会有滑动条 用于控制图表中的数据缩放 和 过滤数据

![dataZoom](./imgs/dataZoom.png)

<br>

### 类型:
数组 意味着可以配置多个区域缩放器 **每一个区域缩放器就是一个对象**
```js
{
  dataZoom: [
    {type: inside, ...} ,
    {type: slider, ...} 
  ]
}
```

<br>

### 属性概述:

**dataZoom[0].type:**  
可选值: 
- slider: 滑块
- inside: 滑块消失 依靠鼠标滚轮或者双指缩放

<br>

**dataZoom[0].xAxisIndex | yAxisIndex**  
指明缩放器在哪个轴上, 一般写0即可

```js
{
  dataZoom: [
    // 设置x轴的缩放器
    {
      type: "slider",
      // 第0个x轴
      xAxisIndex: 0
    } ,
    // 设置y轴的缩放器
    {
      type: "slider",
      yAxisIndex: 0
    } 
  ]
}
```

<br>

**dataZoom[0].start and end**  
指明初始状态的缩放情况

- start: 数据窗口范围的 起始百分比
- end: 数据窗口范围的 结束百分比

```js
{
  dataZoom: [
    // 设置x轴的缩放器的初始缩放情况
    {
      type: "slider",
      xAxisIndex: 0,

      start: 0,
      // 50%
      end: 50
    }
  ]
}
```

<br><br>

## series: 系列列表
每个列表通过 对象中的 ``type`` 属性来决定自己的图表类型

<br>

### 类型:
```js
[
  {type: line, ...} ,
  {type: bar, ...} ,
  {type: pie, ...} ,
  {type: scatter, ...} ,
  {type: effectScatter, ...} ,
  {type: radar, ...} ,
  {type: tree, ...} ,
  {type: treemap, ...} ,
  {type: sunburst, ...} ,
  {type: boxplot, ...} ,
  {type: candlestick, ...} ,
  {type: heatmap, ...} ,
  {type: map, ...} ,
  {type: parallel, ...} ,
  {type: lines, ...} ,
  {type: graph, ...} ,
  {type: sankey, ...} ,
  {type: funnel, ...} ,
  {type: gauge, ...} ,
  {type: pictorialBar, ...} ,
  {type: themeRiver, ...} ,
  {type: custom, ...} ,
]
```

<br>

### 属性概述:
series是一个数组 数组中的元素是一个对象, 每一个对象表示一个系列 一个系列是一个数据集合

包含了要展示的数据 以及 数据对应的图表类型 样式信息等

**在echarts中一个图表可以包含多个系列**, 每个系列可以使用不同的图表类型和样式 用来呈现不同的数据 或 不同的数据维度

<br>

比如当我们指定两个对象的时候 就相当于 一个分类下有两组数据, 比如张三的数学 和 语文成绩

![series多个对象](./imgs/series多个对象.png)

<br>

我们说下**对象(每一个系列)中的属性**

```js
{
  name: "语文",
  type: "bar",
  data: [70, 71, 72]
}
```

**name:**  
该系列的名称, 也表示 data 中都是语文成绩

<br>

**type:**  
表示图表的类型 对于不同的图表是通过 type 属性的值 设置图表的类型, 有很多

可选值:
- bar: 柱状图
- line: 折现图
- pie: 饼图
- tree: 树图  
- scatter: 散点图
- effectScatter: 涟漪图 气泡图

<br>

```js
series: [
  {
    name: "",
    type: ""
  }
]
```

<br>

**rippleEffect: 涟漪 气泡图**  
effectScatter
控制涟漪效果造成的范围是多少

类型: 对象

<br> 

```js
series: [
  {
    // rippleEffect是 effectScatter 下的配置
    type: "effectScatter",

    rippleEffect: {
      // 涟漪的颜色 默认为散点的颜色
      color ... ,

      // 波纹的数量
      number: 3 ,

      // 动画的周期 秒数
      period: 4 ,

      // 动画中波纹的最大缩放比例
      scale: 2.5 ,

      // 波纹的绘制方式 可选 'stroke' 和 'fill'。
      brushType: 'fill' ,
    }
  }
]
```

<br>

**showEffectOn: 涟漪 气泡图**  
控制涟漪效果何时显示特效

类型: string

- string: 
  - render: 绘制完成后显示特效
  - emphasis: 高亮(hover)的时候显示特效

<br> 

```js
series: [
  {
    // rippleEffect是 effectScatter 下的配置
    type: "effectScatter",

      showEffectOn: {
      // 涟漪的颜色 默认为散点的颜色
      color ... ,

      // 波纹的数量
      number: 3 ,

      // 动画的周期 秒数
      period: 4 ,

      // 动画中波纹的最大缩放比例
      scale: 2.5 ,

      // 波纹的绘制方式 可选 'stroke' 和 'fill'。
      brushType: 'fill' ,
    }
  }
]
```

<br>

**barWidth: 柱形图**  
柱条的宽度(不设置时自适应), 类型: number | string

在同一个坐标系上 此属性会被多个 bar 系列共享

注意:  
该属性应该设置在坐标系中最后一个 bar 系列上才会生效 并且是对此坐标系中的所有 bar 系列生效

<br>

**label:**  
类型对象, 图形上的文本标签, 图形上的文本标签, 可用于说明图形的一些数据信息, 比如值, 名称等。

场景:  
在每个柱子上展示对应人的分数

- label.show: 布尔值 是否显示标签文本
- label.rotate: 数值(度数) 标签文本旋转
- label.position: 标签文本的位置
```js
series: [
  {
    label: {

      // 语义声明位置
      position: "top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight"

      // 绝对像素值
      position: [10, 10],

      // 相对的百分比 (标签相对于图形包围盒左上角的位置)
      position: ['50%', '50%']
    }
  }
]
```

<br>

**markPoint:**  
作用:  
类型为对象, 对图表进行标注 

场景:  
我们常见的 标记最大值 最小值

- markPoint.data: 类型数组对象 每一个对象元素表示一个标记点的相关信息
```js
series: [
  {
    markPoint: {
      data: [
        {
          // 标记点的名字
          name: "",

          // 指明是什么的标记
          type: "max | min | average",

          // x y 指定相对容器的屏幕坐标 单位像素 支持百分比
          x: 10 | "90%",
          y: 10 | "90%",

          // 指定数据在响应坐标系上的坐标位置
          coord: [10, 20]
        }
      ]
    }
  }
]
```

<br>

**markLine:**   
类型对象, 图表标线

场景:  
我们将每一个人的分数进行累加算该班级的平均值


- markLine.data: 类型数组对象 **每一个对象元素表示一个标线的数据的相关信息**
```s
注意:
每个数组元素可以是一个 两个值的数组 分别表示线的起点 和 重点 其中每一个项是一个对象

- 正常data数组对象为:
data: [{}, {}]

- 每一个数组元素可以是一个 两个值 的数组
data: [[{}, {}]]
```

```js
series: [
  {
    markLine: {
      data: [
        {
          // 标注的名字
          name: "",
           
          // 标注的类型
          type: "min | max | average | median",
        },

        {
          // 标注的名字
          name: "",
           
          // 标注的类型
          type: "average",

          // 通过x y指定起点和终点的位置 (相对容器的屏幕坐标)
          x: 100,
          y: 100,
        }


        // 一个数组元素中 包含两个值 起点 和 终点 示例:
        [
          // 通过 coord 设置起点的位置 (数据在相应坐标系上的坐标位置)
          {
            coord: [10, 20]
          },
          {
            coord: [20, 50]
          }
        ]
      ]
    }
  }
]
```

<br>

**markArea:**   
类型对象, 用于标记图表中某个范围的数据, **效果将某个区域以阴影的方式标注出来**

- markLine.data: 区域数据数组, 类型二维数组对象 每一个元素是一个数组 该数组中有两个对象 分别代表 区域的左上角 和 右下角的位置, **一个内层数组就是一个标记区间**
```s
markLine: {
  data: [
    [
      {}, {}
    ]
  ]
}


1. 可以不设置位置 就是对全数据进行标记区间
[
  {
    name: '平均值到最大值',
    type: 'average'
  },
  {
    type: 'max'
  }
],


2. 可以使用 xAxis 来指定两个区域 x轴上类别 1-3月是一个区间, 7-9月是另外一个区间
// 区间1
[
  {
    xAxis: "1月"
  },
  {
    xAxis: "3月"
  },
],
// 区间2
[
  {
    xAxis: "7月"
  },
  {
    xAxis: "9月"
  },
],


3. 可以使用 coord: [x, y] 指定左上角 和 右下角的位置
[
  {
    name: '两个坐标之间的标域',
    coord: [10, 20]
  },
  {
    coord: [20, 30]
  }
]
 

4. 可以使用 x y 属性 指定左上角 和 右下角的位置
[
  {
    name: '两个屏幕坐标之间的标域',
    x: 100,
    y: 100
  }, 
  {
    x: '90%',
    y: '10%'
  }
]
```

<br>

```js
series: [
  {
    // 常见效果: 标记 - 标注区间
    markArea: {
      data: [
        [
          {
            name: "标注区间",
            type: "max"
          },
          {
            type: "min"
          },
        ]
      ]
    }
  }
]
    
```

<br>

**smooth: 折线图?**  
线条控制(平滑, 风格)

类型: boolean | number

- boolean: 表示是否开启平滑处理, 设置为true是相当于0.5
- number: 取值范围 0-1 表示平滑成都 越小表示越接近折线段

<br>

**lineStyle: 折线图?**  
修改线条的样式

类型: {}

```js
series: [
  {
    smooth: true,

    lineStyle: {

      // 颜色:
      color: "yellow",

      // 线条的样式: 
      type: "solid | dashed | dotted"
    }
  }
]
```

<br>

**areaStyle: 折线图?**  
将折线勾勒出来的区域 上色

类型: 对象

```js
series: [
  {
    areaStyle: {
      color: "",
      opacity: 0,

      // 图形区域的起始位置
      origin: 'auto | start | end',

      shadowBlur "rgba(0, 0, 0, 0.5)" ,
      shadowColor 10 ,
      shadowOffsetX: 0 ,
      shadowOffsetY: 0 ,
    }
  }
]
```

<br>

**stack: 折线图?**  
堆叠图

我们在series是一个数组 内部可以配置多个对象 每个对象表示一个图表数据(图形) 也就是说 我们可以在一个chart中配置不同维度的数据图形

类型: 字符串

在完成堆叠图的效果时 **我们需要在每个series元素对象中都设置 stack属性 只要他们的值都是一样的** 则就会发生堆叠 也就是第二个图形就会基于第一个图形的坐标的基础之上 往上进行数值的累加

<br>

![堆叠图](./imgs/堆叠图.png)

<br>

```js
series: [
  {
    // 图形1 设置的值要和图形2一样, 两个图形才会发生堆叠
    stack: "all"
  },
  {
    // 图形2 设置的值要和图形1一样, 两个图形才会发生堆叠
    stack: "all"
  },
]
```

<br>

**symbol: 散点图&折线图?**  
标记的图形

类型: stirng | function

<br>

- string: 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'

- string: 可以通过 'image://url' 设置为图片

<br>

**symbolSize: 散点图&折线图?**  
标记(散点)的大小, 一般我们不会将散点设置为统一大小 而是希望散点会随着数据不同 自身的大小也不一样

类型: number | array | function

<br>

- number: 直接设置数字
- array: 分开表示宽高, [20, 10],
- function: (value, params)
  - value: data中的数据值
  - params: 其它的数据项参数

<br>

```js
series: [
  {
    type: "scatter",
    data: originData,

    // 设置散点的大小
    symbolSize: (value, params) => {
      // 上述data项中的元素 [51.6, 161.2]
      // console.log(value)

      /*
      {
        dataIndex: 506, 数据在数组中的坐标,
        data: [51.6, 161.2], data项中的元素,
        value: 同data,
        color: ""
      }
      */
      // console.log(params)

      let [weight, height] = value
      // height为厘米我们要根据bmi公式将其转换为米
      height /= 100
      // 超过肥胖标准值的散点让其大一些 反之小一些, BMI = 体重kg / (身高m * 身高m) 结果如果大于28表示肥胖
      let bmi = parseInt(weight / Math.pow(height, 2))

      return bmi > 28 ? 20 : 10
    },
  }
]
```

<br>

**itemStyle:**  
图形样式

类型: 对象

<br>

```js
series: [
  {
    itemStyle: {

      // 颜色: string | function(params)
      color: 自适应 ,

      borderColor: '#000' ,
      borderWidth: 0 ,
      borderType: 'solid' ,
      borderDashOffset: 0 ,
      borderCap: 'butt' ,
      borderJoin: 'bevel' ,
      borderMiterLimit: 10 ,
      shadowBlur ... ,
      shadowColor ... ,
      shadowOffsetX: 0 ,
      shadowOffsetY: 0 ,
      opacity: 0.8 ,
    }
  }
]
```

<br>

```js
series: [
  {
    // 设置不同散点的颜色不同
    itemStyle: {
      // 散点颜色: 全部为一种颜色
      // color: "#C2185B"


      // 不同散点的颜色不一样
      color: (params) => {
        // 我们从 params.value 中获取数据
        let [weight, height] = params.value
        height /= 100
        let bmi = parseInt(weight / Math.pow(height, 2))

        return bmi > 28 ? "#C2185B" :  "#5418c2"
      }
    }
  }
]
```

<br>

**label: 饼图?**   
饼图图形上的文本标签, 可用于说明图形的一些数据信息, 比如值, 名称等

<br>

类型:  
```js
series: [
  {
    type: "pie",

    label: {
      // 显示文字 (默认值为true 展示data数据中name对应的值)
      show: false ,

      /*
        决定文字显示的内容是什么
        params.data: 数据 {name: "", value: ""}
        params.name: 数据中 name的部分
        params.value: 数据中 value的部分
        params.percent: 数据占整个饼图的百分比

        formatter: ({percent, name}) => `${name} (${percent}%)`

        \n 可以换行
      */
      formatter: string | function(params),

      position: 'outside' ,
      rotate ... ,
      color: '#fff' ,
      fontStyle: 'normal' ,
      fontWeight: 'normal' ,
      fontFamily: 'sans-serif' ,
      fontSize: 12 ,
      lineHeight ... ,
      backgroundColor: 'transparent' ,
      borderColor ... ,
      borderWidth: 0 ,
      borderType: 'solid' ,
      borderDashOffset: 0 ,
      borderRadius: 0 ,
      padding: 0 ,
      shadowColor: 'transparent' ,
      shadowBlur: 0 ,
      shadowOffsetX: 0 ,
      shadowOffsetY: 0 ,
      width ... ,
      height ... ,
      textBorderColor ... ,
      textBorderWidth ... ,
      textBorderType: 'solid' ,
      textBorderDashOffset: 0 ,
      textShadowColor: 'transparent' ,
      textShadowBlur: 0 ,
      textShadowOffsetX: 0 ,
      textShadowOffsetY: 0 ,
      overflow: 'none' ,
      ellipsis: '...' ,
      rich: {...} ,
      alignTo: 'none' ,
      edgeDistance: '25%' ,
      bleedMargin: 10 ,
      distanceToLabelLine: 5 
    }
  }
]
```

<br>

**radius: 饼图?**   
饼图可以设置为 圆环图◉, 我们需要设置两个半径实现圆环图的效果 

类型: number | string | array

- number: 直接指定 外半径值 (控制饼图整体的大小) px

- string: "20%" 表示外半径值 参考容器高宽中较小一项的20%的长度: 比如height为400, 半径值就是 ``(400 / 2) * 20%``

- ``array<number|string>``: 数组中的第一项是内半径 第二项是外半径 (相当于内圆大小 和 外圆大小)

```js
series: [
  {
    type: "pie",
    // [内圆半径, 外圆半径],
    radius: ["50%", "75%"],
  }
]
```

<br>

**roseType: 饼图?**   
是否展示成 南丁格尔图 通过半径区分数据大小 可选择的模式有两种

可选值:
1. "radius": 扇区圆心角展现数据的百分比, 半径展现数据的大小
2. "area": 所有扇区圆心角相同, **仅通过半径展现数据大小**

<br>

**selectedMode: 饼图?**   
当我们点击饼图中的一个部分的时候 选中的区域偏离圆点一小段距离, 默认关闭

<br>

可选值:
- string: 'single', 'multiple', 'series' 分别表示单选, 多选 以及 选择整个系列。

- boolean

<br>

**selectedOffset: 饼图?**   
设置选中效果 偏离出去的距离

类型: number

<br><br>

## geo: 地图
地理坐标系组件。地理坐标系组件用于地图的绘制, 支持在地理坐标系上绘制散点图, 线集。


<br>

### 类型:
```js
{
  id ... ,
  show: true ,
  map: '' ,
  roam: false ,
  projection: {...} ,
  center ... ,
  aspectScale: 0.75 ,
  boundingCoords ... ,
  zoom: 1 ,
  scaleLimit: {...} ,
  nameMap ... ,
  nameProperty: 'name' ,
  selectedMode: false ,
  label: {...} ,
  itemStyle: {...} ,
  emphasis: {...} ,
  select: {...} ,
  blur: {...} ,
  zlevel: 0 ,
  z: 2 ,
  left: 'auto' ,
  top: 'auto' ,
  right: 'auto' ,
  bottom: 'auto' ,
  layoutCenter ... ,
  layoutSize ... ,
  regions: [{...}] ,
  silent: false ,
  tooltip: {...} ,
}
```

<br>

### 属性概述:

**geo.map:**  
string, 使用 registerMap事件中的第一个参数 注册的地图名称 保持一致

<br>

**geo.roam:**  
是否开启鼠标对地图的缩放和拖拽 默认为不开启

类型: string | boolean

- boolean: 设置为 true 则都开启
- string: 
  - scale: 启用缩放
  - move: 启用平移

<br>

**geo.zoom:**  
设置初始化 地图缩放比例

类型: number

<br>

**geo.center:**  
设置地图的中心点 配置经度和纬度的坐标

类型: []

```js
// 将新疆作为整个地图的中心点
center: [87.617733, 43.792818]
```

<br>

**geo.label:**  
展示省份的名称

类型:
```js
{
  // 展示省份的名称
  show: false ,
  position ... ,
  distance: 5 ,
  rotate ... ,
  offset ... ,
  formatter ... ,
  color: '#fff' ,
  fontStyle: 'normal' ,
  fontWeight: 'normal' ,
  fontFamily: 'sans-serif' ,
  fontSize: 12 ,
  align ... ,
  verticalAlign ... ,
  lineHeight ... ,
  backgroundColor: 'transparent' ,
  borderColor ... ,
  borderWidth: 0 ,
  borderType: 'solid' ,
  borderDashOffset: 0 ,
  borderRadius: 0 ,
  padding: 0 ,
  shadowColor: 'transparent' ,
  shadowBlur: 0 ,
  shadowOffsetX: 0 ,
  shadowOffsetY: 0 ,
  width ... ,
  height ... ,
  textBorderColor ... ,
  textBorderWidth ... ,
  textBorderType: 'solid' ,
  textBorderDashOffset: 0 ,
  textShadowColor: 'transparent' ,
  textShadowBlur: 0 ,
  textShadowOffsetX: 0 ,
  textShadowOffsetY: 0 ,
  overflow: 'none' ,
  ellipsis: '...' ,
  rich: {...} ,
}
```

<br>

here

<br>



<br><br>

# Echarts: 事件

### <font color="#C2185B">echarts.registerMap("地图数据名称", json地图数据)</font>  
注册可用的地图, 只在 geo 组件或者 map 图表类型中使用


<br><br>

# Echarts: 常用图表
常用图表一共有7个

1. 柱状图: 描述的是分类数据 呈现的是每一个分类中有多少 通过柱状图 可以清晰的看出每个分类数据的排名情况

2. 折线图
3. 散点图
4. 饼图
5. 地图
6. 雷达图
7. 仪表盘图

<br><br>

## 柱状图练习: bar

### 要点:
1. xAxis.data 指明x轴分类的数据
2. yAxis.type 指明y轴的类型是什么 值为value的话, 则对应y轴的数据会去series.data中获取

<br>

![柱状图练习](./柱状图练习.png)

<br>

### 代码部分
```js
const ops = {
  xAxis: {
    type: "category",
    data: ["张三", "李四", "王五", "闰土", "小明", "小红", "二姐", "大强"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "语文",
      type: "bar",
      data: [88, 92, 63, 77, 94, 80, 72, 86]
    }
  ]
}
```

<br><br>

## 折线图练习: line
折线图常用来分析 **数据随时间的变化趋势**
```js
const months = []
for(let i = 1; i <= 12; i++) {
  let content = `${i}月`
  months.push(content)
}
const chart = echarts.init(document.querySelector("#wrap"))
const ops = {
    xAxis: {
      type: "category",
      data: months,
      boundaryGap: false
    },
  yAxis: {
    // 当为数值轴的时候 数据会自动去series[0].data中获取
    type: "value",

    // 脱离0值 从数值轴对应的数据的最小值开始
    scale: true
  },
  series: [
    {
      name: "康师傅销量",
      type: "line",
      data: [3000, 2800, 900, 1000, 800, 700, 1400, 1300, 900, 1000, 800, 600],

      // 常见效果: 标记 - 最大值
      markPoint: {
        data: [
          {
            name: "max",
            type: "max"
          },
          {
            name: "min",
            type: "min"
          }
        ]
      },

      // 常见效果: 标记 - 平均值
      markLine: {
        data: [
          {
            name: "平均值",
            type: "average"
          }
        ]
      },

      // 常见效果: 标记 - 标注区间
      markArea: {
        data: [
          // 区间1
          [
            {
              xAxis: "1月"
            },
            {
              xAxis: "3月"
            },
          ],
          // 区间2
          [
            {
              xAxis: "7月"
            },
            {
              xAxis: "9月"
            },
          ],
        ]
      },

      // 线段平滑
      smooth: true,
      areaStyle: {
        // 图形区域的起始位置
        origin: 'start'
      },

      // 图形1 设置的值要和图形2一样, 两个图形才会发生堆叠
      stack: "all"
    },
    {
      name: "统一销量",
      type: "line",
      data: [2000, 3800, 1900, 500, 900, 1700, 2400, 300, 1900, 1500, 1800, 200],
      smooth: true,
      areaStyle: {
        // 图形区域的起始位置
        origin: 'start'
      },

      // 图形1 设置的值要和图形2一样, 两个图形才会发生堆叠
      stack: "all"
    }
  ]
}
chart.setOption(ops)
```

<br><br>

## 散点图练习: scatter
散点图可以帮助我们推断出变量间的相关性  
比如身高 和 体重的关系(正相关) 一般身高越高体重越重

比如我们有500组数据 每一个对象就代表一个人的相关信息
```js
{
 gender: "female", height: 161.2, weight: 51
},
{
 gender: "female", height: 167.2, weight: 59
},
{
 gender: "female", height: 159.2, weight: 49
},
```

如果我们将这组数据通过散点图的方式表示出来就会如下, 能体现出身高和体重是正相关的关系 数据往右上角的方向延伸

![散点图](./imgs/散点图.png)

<br>

### 特点:
1. 散点图的 x y 轴 **都是数值轴 type: value**

2. x轴 和 y轴的数据为: 二维数组, 该数据会供x y轴一同使用
```js
[
  [身高1, 体重1],
  [身高2, 体重2],
]
```

3. 散点图 很有可能需要设置脱离0值的设定

<br>

### 场景:
1. 散点图可以帮助我们推断出不同维度数据之间的**相关性**(相关性的程度)
- 正相关
- 负相关
- 不相关

2. 散点图也会和地图结合在一起 **在地图上进行标注**

<br>

### 散点图: 气泡图效果
散点图要是想实现气泡图的效果就要满足两个条件

1. 散点的大小不同
2. 散点的颜色不同

<br>

**气泡图的效果:**  
就是控制散点的 大小 和 颜色

- 散点大小: series[0].symbolSize
- 散点颜色: series[0].itemStyle.color

<br>

### 散点图: 涟漪动画效果
该效果实现比较简单 ``series[0].type: "effectScatter"``

<br>

### 代码部分:
```js
// 整理散点图需要的数据(二维数组)
/*
[
  {
    "gender": "female",
    "height": 161.2,
    "weight": 51.6
    }
    ...
  ]
*/

let originData = [];

(async () => {
  const { data: res } = await axios({
    url: "./data/scatter.json"
  })
  originData = res.map(item => ([ item.weight, item.height ]))

  const chart = echarts.init(document.querySelector("#wrap"))
  
  const ops = {
    xAxis: {
      // 散点图的x y轴都是value 数值轴
      type: "value",
      // 身高和体重是没有必要从0开始的, 所以脱离0值
      scale: true
    },
    yAxis: {
      // 散点图的x y轴都是value 数值轴
      type: "value",
      // 身高和体重是没有必要从0开始的, 所以脱离0值
      scale: true
    },
    series: [
      {
        // 普通散点图
        // type: "scatter",
        // 涟漪图
        type: "effectScatter",
        data: originData,
        // 设置涟漪的效果
        rippleEffect: {
          number: 3,
          brushType: "stroke"
        },

        // 设置散点的大小
        symbolSize: (value, params) => {
          // 上述data项中的元素 [51.6, 161.2]
          // console.log(value)

          /*
          {
            dataIndex: 506, 数据在数组中的坐标,
            data: [51.6, 161.2], data项中的元素,
            value: 同data,
            color: ""
          }
          */
          // console.log(params)

          let [weight, height] = value
          // height为厘米我们要根据bmi公式将其转换为米
          height /= 100
          // 超过肥胖标准值的散点让其大一些 反之小一些, BMI = 体重kg / (身高m * 身高m) 结果如果大于28表示肥胖
          let bmi = parseInt(weight / Math.pow(height, 2))

          return bmi > 28 ? 16 : 8
        },

        itemStyle: {
          // 散点颜色 不同散点的颜色不一样
          // color: "#C2185B"
          color: (params) => {
            let [weight, height] = params.value
            height /= 100
            let bmi = parseInt(weight / Math.pow(height, 2))

            return bmi > 28 ? "#C2185B" :  "#5418c2"
          }
        }
      }
    ]
  }
  chart.setOption(ops)
})()
```

<br><br>

## 饼图练习: pie
小明今年在各个网购平台的消费金额为

```js
[
  {name: "淘宝", value: 11231},
  {name: "京东", value: 22673},
  {name: "唯品会", value: 6123},
  {name: "聚美优品", value: 6700},
  {name: "1号店", value: 8989},
]
```

我们通过饼图可以一目了然的看出 在哪一个平台上花费花的最多 它可以非常直观的看出来每一个数值的占比情况

<br>

### 饼图所需要的数据类型: 

**数组对象:**
```js
[
  {
    // 数据项名称
    name ... ,

    // 数据项值
    value ... ,

    // 数据项id 会被用于分类数据 并在全局过渡动画中决定如何进行合并和分裂动画
    groupId ... ,

    // 该数据项是否被选中
    selected: false ,

    // 单个扇区的标签配置
    label: {...} ,
    labelLine: {...} ,
br
    // 图形样式
    itemStyle: {...} ,
    emphasis: {...} ,
    blur: {...} ,
    select: {...} ,

    // 本系列每个数据项中特定的 tooltip 设定
    tooltip: {...} ,
  }, 
  {}
]
```

<br>

**数值数组:**  
系列中的数据内容数组。数组项可以为单个数值, 如：
```js
[12, 34, 56, 10, 23]
```

如果需要在数据中加入其它维度给 visualMap 组件用来映射到颜色等其它图形属性。每个数据项也可以是数组, 如
```js
[[12, 14], [34, 50], [56, 30], [10, 15], [23, 10]]
```

这时候可以将每项数组中的第二个值指定给 visualMap 组件。

<br>

### 要点:
基本实现只需要一个配置, 数据格式如下 对象属性有 name 和 value

```js
// 需要设置给饼图的数据
const data = [
  { name: "淘宝", value: 11231 },
  { name: "京东", value: 22673 },
  { name: "唯品会", value: 6123 },
  { name: "聚美优品", value: 6700 },
  { name: "1号店", value: 8989 },
]

const ops = {
  series: [
    {
      type: "pie",
      data
    }
  ]
}
```

<br>

### 常见效果:
**1. 显示数值: label.formatter**

<br>

**2. 圆环: radius: ["50%", "70%"]**

<br>

**3. 南丁格尔图: roseType: "radius"**  

实现原理:  
饼图中的每一个部分的半径都是不一样的

<br>

### 代码部分:
```js
const ops = {
  series: [
    {
      type: "pie",
      data,
      // radius: ["50%", "75%"],
      roseType: "area",
      label: {
        formatter: ({percent, data}) => `${data.name} (${percent}%)`
      },
      selectedMode: "single"
    }
  ]
}
```

<br><br>

## 地图练习: 
有些数据带有地区属性 如果我们想宏观的观察数据在不同地区的对比情况 我们就要使用地图

<br>

### 地图图表的使用方式:
1. 使用百度地图api 它可以在线联网进行展示 需要申请百度地图的ak 具备更加强大的功能

2. 矢量地图, 需要准备矢量地图的数据

<br>

### 实现步骤:
1. echarts最基本的代码结构
 - 引入js文件 
 - 准备DOM容器
 - 初始化chart对象
 - 设置option

2. 准备中国的矢量地图JSON文件 china.json

3. 使用 axios 获取json文件
```js
// 数据格式是{} 里面包含了如下内容 
{
  UTF8Encoding: true,
  features: [{}],
  type: "FeatureCollection"
}
```

4. 使用 echarts.registerMap("地图名任意", 地图数据)
```js
echarts.registerMap("chinaMap", chinaJson)
```

5. 地图不是配置 series 配置 **而是配置geo**, 在它的下面设置 ``type: "map", map: "chinaMap"``

<br>

### 基础使用:
```js
// 请求地图数据 保存在mapJson数组中
let mapJson = {};
(async () => {
  const { data: res } = await axios({
    url: "./data/map_data/china.json"
  })
  /*
  {
    UTF8Encoding: true,
    features: [{}],
    type: "FeatureCollection"
  }
  */
  mapJson = res

  // 将地图数据注册给echarts 设置地图数据的名称为 chinaMap
  echarts.registerMap("chinaMap", mapJson)

  // 创建实例
  const chart = echarts.init(document.querySelector("#wrap"))
  // 进行配置
  const ops = {
    // 地图配置 和 数据的指定在 geo配置项中
    geo: {
      // 该属性没有了 不写也没有问题
      // type: "map",

      // 值为上面注册的地图数据名
      map: "chinaMap"
    }
  }
  chart.setOption(ops)
})()
```

<br>

### 地图的常用配置
1. 拖拽和缩放
2. 