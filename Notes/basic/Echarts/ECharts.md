### 数据可视化介绍
- 数据可视化主要目的: 借助于图形化手段, 清晰有效的传达与沟通信息
- 数据可视化可以把数据从冰冷的数字转换为图形, 揭示蕴含在数据中的规律和道理

### vue中的使用方式:

- 服务端代码
```js
app.get("/", (req, res) => {
  let data = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }

  res.send(data)
})
```

- 前台页面代码
```html
<template>
  <div id="app">
    <h3>app页面</h3>
  </div>
</template>

<script>
import axios from "axios"
import * as echarts from 'echarts';

export default {
  name: 'App',
  methods: {
    delay(interval=0) {
      return new Promise(resolve => {
        let timer = setTimeout(_ => {
          clearTimeout(timer)
          resolve()
        }, interval)
      })
    },

    initEcharts(data) {
      let echart = echarts.init(document.getElementById('app'))
      echart.setOption(data);
    },

    async init() {
      let {data: res} = await axios.get("http://localhost:3333/")

      await this.delay(100)

      // 初始化echarts
      this.initEcharts(res)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
#app {
  width: 500px;
  height: 500px;
}
</style>

```


### Echarts可视化的适配方案
- 我们选择的是flexible.js 配合 rem来做
- 我们在页面中引入 flexible.js 
<!-- 
  验证flexible.js有没有引入成功 我们F12检查一下, html后面有没有 style="font-size:165px"

  它会根据浏览器的尺寸自动改变字体的大小
 -->


> 设计稿
- 我们从设计稿开始入手, flexible默认把屏幕划分为10等分, 一个大屏的pc端的可视化面板的设计稿是1920px, 如果是10等分的话, 那1rem就是192px, 还是太大了 

- 我们改下源码将 10 -- 24 改为24
- 那么 1rem = 80px
<!-- 
  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 24      // 改这里
    docEl.style.fontSize = rem + 'px'
  }
 -->


> cssrem 插件
- 为了方便计算 我们要需要安装 cssrem 插件
- 因为 我们上面计算出了 1rem = 80px

- 所以我们还需要修改 cssrem 的 root font size为80px
<!-- 
  搜索 root font size --- > 修改为 80px
 -->


> 总结
- 完成下面的步骤 就可以完成 rem的适配布局
- 1. 引入 flexible.js
- 2. 修改 flexible.js 屏幕划分的分数, 计算出1rem = ?
- 3. 安装cssrem插件 修改 root font size 为2中算出来的 字号


### css布局相关问题
> 主体部分
- 主体部分总共分为3个部分, 占比为3 5 3
<!-- 
  <section class="mainbox">
    <div class="column">1</div>
    <div class="column">2</div>
    <div class="column">3</div>
  </section>

  .column {
    flex:3;

    &:nth-child(2) {
      flex:5;
    }
  }
 -->


> 每一个小盒子的公共样式 .panel
- 每一个盒子的样式都差不多 我们把每一个盒子的样式提取出来 .panel
- .panel 有4个角, 做法是左上和右上角是通过.panel的before 和 after实现的
- 左下 右下是在.panel 里面放了一个.panel-footer的div 通过它的before after实现的
```css 
  <div class="panel">
    <div class="panel-footer"></div>
  </div>


  .panel {
    height: 3.875rem;
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: url(../images/line.png) rgba(255, 255, 255, 0.04);
    padding: 0 .1875rem .5rem;
    margin-bottom: .1875rem;
    position: relative;

    &::before,
    &::after {
      content:'';
      position: absolute;
      top:0;
      width: 10px;
      height:10px;
    }

    &::before {
      left:0;
      border-left:2px solid #02a6b5;
      border-top:2px solid #02a6b5;
    }
    &::after {
      right:0;
      border-right:2px solid #02a6b5;
      border-top:2px solid #02a6b5;
    }

    .panel-footer {
      position: absolute;
      bottom: 0;
      left:0;
      width: 100%;

      &::before,
      &::after {
        content:'';
        position: absolute;
        bottom:0;
        width: 10px;
        height:10px;
      }

      &::before {
        left:0;
        border-left:2px solid #02a6b5;
        border-bottom:2px solid #02a6b5;
      }
      &::after {
        right:0;
        border-right:2px solid #02a6b5;
        border-bottom:2px solid #02a6b5;
      }
    }
  }
```

- 上面公共样式建立好了之后, 假如还需要有自己的样式 panel的后面添加自己的类名
<!-- 
  <div class="panel bar">
 -->


> 中间地图的部分
- 地图模块高度为810px 里面包含了4个盒子, chart放图标模块 球体盒子 旋转1 旋转2

- 旋转动画的要点
- 因为只能有一个transform 我们已经把图片使用transform定位到中间了
<!-- 
  transform: translate(-50%, -50%);

  所以下面在做旋转动画的时候 为了保持图片原来的位置 一定要再把 translate(-50%, -50%); 带着

  @keyframes ratote1 {
    from {
      transform: translate(-50%, -50%) rotate(0deg)
    }

    to {
      transform: translate(-50%, -50%) rotate(360deg)
    }
  }
 -->

- 正时针是0-360 负时针是0 - -360


> 给盒子添加背景图片后尽量不要忘记
- background-size: 100% 100%;



### Echarts 简介
- 常见的数据可视化库

- D3.js   目前 Web 端评价最高的 Javascript 可视化工具库(入手难)  
- ECharts.js   百度出品的一个开源 Javascript 数据可视化库   
- Highcharts.js  国外的前端数据可视化库，非商用免费，被许多国外大公司所使用  
- AntV  蚂蚁金服全新一代数据可视化解决方案  等等

- Highcharts 和 Echarts 就像是 Office 和 WPS 的关系

<!-- 
  ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖矢量图形库 [ZRender](https://github.com/ecomfe/zrender)，提供直观，交互丰富，可高度个性化定制的数据可视化图表。
 -->


- 大白话：
- 是一个JS插件
- 性能好可流畅运行PC与移动设备
- 兼容主流浏览器
- 提供很多常用图表，且可**定制**。
  - [折线图](https://www.echartsjs.com/zh/option.html#series-line)、
  - [柱状图](https://www.echartsjs.com/zh/option.html#series-bar)、
  - [散点图](https://www.echartsjs.com/zh/option.html#series-scatter)、
  - [饼图](https://www.echartsjs.com/zh/option.html#series-pie)、
  - [K线图](https://www.echartsjs.com/zh/option.html#series-candlestick)

- 官网地址：<https://echarts.apache.org/zh/index.html>

- 我们需要做的就是拿着官方的图形模板 修改下成为我们想要的图标
- 也就是从网站中拿到基础的图标 然后订制我们的图表


> Echarts使用方式
- 1. 下载并引入echarts.js文件
- 2. 准备一个具备大小的DOM容器    --- 重要
- 3. 初始化echarts实例对象
- 4. 指定配置项和相关数据
- 5. 将配置项设置给echarts实例对象


> echarts.init(dom容器)
- 通过echarts全局变量的init()方法进行初始化
<!-- 
  let myCharts = echarts.init(box)
 -->

> myCharts.setOption(option)
- 将配置给实例化出来的对象

<!-- 
  // 1 准备一个有大小的盒子
  <div class="box">

  </div>

  // 2 引入 echarts
  <script src="./js/echarts.min.js"></script>
  <script>

    // 通过echarts全局变量的init()方法进行初始化
    // echarts.init(dom容器)
    let box = document.querySelector('.box')


    // 实例化对象
    let myCharts = echarts.init(box)


    // 指定配置项和数据
    var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      };
    

    // 将option选项给我们创建的myEcharts实例
    myCharts.setOption(option)
  </script>
 -->



### echarts中基础的配置
- 我们主要了解一下 option 对象中的对象属性
- 我们也可以在文档中查看配置项手册
- https://echarts.apache.org/zh/option.html#title

> 需要了解的主要配置：`series` `xAxis` `yAxis` `grid` `tooltip` `title` `legend` `color` 


> title对象 内部属性 text
- 图形的标题组件
<!-- 
  title: {
    text: '折线图堆叠'
  }
 -->


> tooltip对象 内部属性 trigger
- 图标的提示框组件
- 移动到图标上的具体的点 在弹出框中出现的提示信息

- trigger 是触发方式
  - axis 坐标轴: 放在x y坐标交叉的位置就会触发提示
  - item 移动到目标上触发 饼形图没有直角坐标系 就用item
<!-- 
  tooltip: {
    trigger: 'axis'
  },
 -->

  - formatter: 
  <!-- 
    {a} {b} {c} {d}
    a 是series中的name
    b 是series中的data里面的name
    c 是series中的data里面的value
    d 是通过计算得出来的
   -->

- axisPointer: 移动到柱子上的效果 是阴影还是线
  - type: line / shadow
<!-- 
  axisPointer: {
    // 坐标轴指示器，坐标轴触发有效
    type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
  }
 -->


> legend对象 内部属性 data
- 图例组件 每根线代表谁
- data 图例数据
- textStyle: 图例文字的颜色
  - color
  - fontSize

- right: 距离右边10%
- bottom: 距离底部多少 可以控制位置
- itemWidth:  修改图标的宽度
- itemHeight: 修改图标的高度
<!-- 
  legend: {
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  },
 -->


> toolbox对象 内部属性 feature
- 工具箱组件 提供下载按钮 点击把图片保存成图片等
<!-- 
  toolbox: {
    feature: {
        saveAsImage: {}
    }
  },
 -->


> grid对象
- 网格配置 图表的大小(直角坐标系有x y轴的)是通过grid进行控制的
- 从图形的左上角 到 右下角 就是网格的区域

- 内部属性
- left:   控制网格区域 距离 DOM容器左侧有多少距离
- right:  控制网格区域 距离 DOM容器右侧有多少距离
- bottom: 控制网格区域 距离 DOM容器下侧有多少距离
- containLabel: 图形区域是否包裹y轴的文字标签 true / false

- show: ture / false 显示图形四周的边框
- borderColor: 边框颜色

<!-- 
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
 -->


> xAxis
- 设置x轴的相关配置

- 内部属性
- type: 坐标轴的类型
  - category:   显示文字的分类比如 xx行业 xx行业
  - value:      显示数值
  - time:       时间轴，适用于连续的时序数据
  - log         对数轴。适用于对数数据

- boundaryGap: 线条和坐标轴之间有没有缝隙
  - true    有缝隙
  - false   没有缝隙

- data: x y 轴显示的相关信息

- axisLabel: 修改跟文字 字号 颜色等配置的
  - fontStyle   要不要倾斜
  - fontWeight
  - fontSize    没加单位
  - color

- axisLine:   x轴的线的样式 比如
  - show: true / false    x轴的线显示与否

  - lineStyle: 设置线的样式 多个样式的话 可以传递{ }
    - color
    - width
    - type: 'solid'
<!-- 
  xAxis: [
  {
    type: "category",
    axisTick: {
      alignWithLabel: true
    },

    // 修改刻度标签的相关样式
    axisLabel: {
      textStyle: {
        color: "rgba(255,255,255,.6)",
        fontSize: "12"
      }
    },

    // 修改x轴的线 显示与否
    axisLine: {
      show: false
    },

    axisLine: {
      lineStyle: {
        color: "rgba(255,255,255,.1)"
        // width: 1,
        // type: "solid"
      }
    },
  }
 -->

- splitLine: 分割线的样式
  - lineStyle: 多个样式传递对象
<!-- 
  splitLine: {
    lineStyle: {
      color: "rgba(255,255,255,.1)"
    }
  }
 -->  

- show: 控制是否显示x轴
  - true / false
<!-- 
  xAxis: {
    show: false
  },
-->

- axisTick: 不显示刻度
<!-- 
  axisTick: {
    show: false
  },
 -->


> yAxis
- 设置y轴的相关配置
<!-- 
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },

  yAxis: {
    type: 'value'
  },
 -->

- inverse: true / false
- 有点像翻转数组的reverse 用来翻转y轴数据的顺序


>>> 总结
- 我们想让柱子横向显示的话, 可以通过设置 type控制谁是 category 谁是value来控制柱子是横向的还是纵向的


> series 它的值是一个数组 里面是一个个对象
- 图表配置 它决定着显示哪种类型的图表
- 每一个对象 决定了一条线

- 内部属性:
- type:
  - line:  线形图

- center: 设置饼形图在容器中的位置
<!-- 
  center:['50%', '50%']
 -->

>>> 饼形图通过radius来修改饼形图的大小(直角坐标系的通过grid)
- radius: 修改内圆半径和外圆半径为 百分比是相对于容器宽度来说的 100%就是整个容器的大小
- 如果内圆设置为0 就是一个饼
<!-- 
  radius: ['40%', '50%']  内圆 和 外圆的半径
 -->

- label: 
  - show: true / false  显示标签文字与否
  - position: 'center'  显示文字的位置 不写center的话 文字都会在外面

- labelLine: 是一个对象
  - show: true false  显示文字和图形的连接线与否
  - length    连接线第一段的长度(链接图形的)
  - length2   连接线第二段的长度(链接文字的)

- smooth: true / false 
- 折线链接是圆滑的 是否平滑的显示

- data:   决定了该条线是怎么走的根据数据怎么展示
<!-- 
  真实开发中这个data都是通过ajax动态请求回来的
 -->

- stack:  堆叠

- name: 
<!-- 
  - 数据堆叠，同个类目轴上系列配置相同的`stack`值后 后一个系列的值会在前一个系列的值上相加。

  - 比如第一线的起点是200, 第二条线是220 设置stack后 第2条线的位置就是200+220是420的位置

  - 一般情况下是不需要堆叠的
 -->

<!-- 
  series: [
    {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {

    }
 -->

- barWidth: 修改柱子的宽度 柱子横过来就是高度了

- itemStyle: 修改柱子的样式 多个样式传递对象 还可以设置拐点的样式
  - barBorderRadius:  圆角
  - color: 给柱子修改颜色(面的颜色)   这个属性也适用于拐点
  - borderColor: 线的颜色            这个属性也适用于拐点
  - borderWidth: 边框的宽度          这个属性也适用于拐点
<!-- 
  itemStyle: {
    barBorderRadius: 5,
    color: 不仅仅可以给值, 还可以给一个function
  }


  // 怎么给每一个柱子分别设置颜色
  1. 我们声明一个数组 里面装上颜色
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"]

  2. 我们给color 设置一个函数 设置颜色
    - params 是每一个柱子的对象 里面每一个柱子都有dataIndex 从0开始

  color: function(params) {
    let num = myColor.length

    // 这么写的话 会将颜色数组中的第一个颜色 给每一个柱子
    return myColor[0]

    // 每一个柱子都有 params.dataIndex 索引号 这个索引号跟柱子是一一对应的, 也是跟颜色数组一一对应的
    return myColor[params.dataIndex % num]
  }
 -->

- lineStyle: 是一个对象, 单独修改线的样式
  - color: 
  - width: 数字
  - type
  - opacity

- areaStyle: 是一个对象 图形的填充区域
  - color: new echarts.graphic.LinearGradient()
  - shadowColor 阴影颜色
<!-- 
  areaStyle: {
    // 渐变色，只需要复制即可
    color: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
        },
        {
          offset: 0.8,
          color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
        }
      ],
      false
    ),
    shadowColor: "rgba(0, 0, 0, 0.1)"
  },
 -->

- barCategoryGap: 柱子之间的距离
<!-- 
  barCategoryGap: 50,
 -->

- symbol: "circle" 设置拐点为圆点
<!-- 
  circle rect roundRect triangle diamond pin arrow none
 -->

- symbolSize: 设置拐点的大小

- showSymbol: false 开始不显示拐点, 鼠标经过显示

- yAxisIndex: 0
- 使用y轴的index 在单个图标实例中存在多个y轴的时候有用
<!-- 
  有点像z-index 有了它可以让定位的盒子 调整层级
 -->


- label: 在图形上显示的文本标签 是一个对象
  - show: 是否显示文本标签
  - position: 文本在哪显示
  - formatter 文本显示的格式
    - {c}   数据值, 解析 data中的数据
    - {a}   系列名, 使用name中的数据
    - {b}   数据名, y轴上的标签文本(和刻度在一起的文字)
<!--  
  label: {
    normal: {
      show: true,
      position: "inside",

      // {c}会自动的解析为数据 是series中的data中的数据
      formatter: "{c}%"
    }
  }
 -->

- emphasis  在饼形图中间显示提示文字
  - label   显示文字的样式
    - show
    - fontSize
    - fontWeight

>>> 南丁格尔玫瑰图
- roseType: 'radius' 'area' 修改饼形图的显示方式, 半径模式 和 面积模式



>>> 如果 series 里面有了name值, 则legend里面的data可以删掉
>>> xAxis 中的data 是显示在x轴上的信息 每一个图形的数据 是在 series 的data里面


> color对象
- 它的值是一个数组 可以设置线条的颜色 也可以设置每一个饼形图的颜色
<!-- 
  color: ['pink', 'red']
 -->



### 结合我们自己的案例来画图
- 在我们的案例中会有很多的图表 为了防止变量污染 减少命名冲突 我们可以采取立即执行函数的写法, 里面的变量都是局部变量

>>> 多个立即执行函数之间必须以分号结尾

> 柱状图 图标
- 1. 官网找到类似实例, 适当分析, 并且引入到html页面中
- 2. 根据需求定制图表



### 图标根据屏幕自适应
<!-- 
  window.addEventListener('resize', function() {
    myChart.resize()
  })
 -->


> normal是可以省略的



### 中国地图
- 在echarts官方网站的 [社区] 里找一个中国地图
<!-- 
  https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all
 -->
- 社区里面有非常漂亮的视觉图 也可以拿来直接使用
- 在这里可以找到一些基于echart的高度定制好的图表，相当于基于jquery开发的插件，这里是基于echarts开发的第三方的图表。

- 视频里面使用了 https://gallery.echartsjs.com/editor.html?c=x0-ExSkZDM  (模拟飞机航线)


> 实现步骤：

- 第一需要下载china.js提供中国地图的js文件

- 第二个因为里面代码比较多，我们新建一个新的js文件 myMap.js 引入

- 使用社区提供的配置即可。

> 需要修改：

- 去掉标题组件
- 去掉背景颜色
- 修改地图省份背景  #142957  areaColor 里面做修改
- 地图放大通过  zoom   设置为1.2即可


>>> css
- 约束屏幕尺寸

@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 80px !important;
  }
}