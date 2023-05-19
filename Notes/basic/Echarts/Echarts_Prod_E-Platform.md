# 后台项目

## 后台项目的目标

### 1. 计算服务器处理请求的总耗时  
当一个请求到达服务器的时候 我们服务器会经过一系列的中间件进行处理 最终再把数据返回给前端 服务器对请求的总耗时是多少呢 我们在这个部分计算一下

<br>

### 2. 在响应头上加上响应内容的mime类型
指明返回前端内容的数据类型是什么 让前端更好的处理由服务器所返回的数据 如果我们响应回的是json 这时我们就在响应头中添加响应体的数据类型

<br>

### 3. 根据url读取指定目录下的文件内容
我们的数据没有存储在数据库中 数据在json文件中

<br>

所以我们会将上面的3件事情交给3个中间件来完成

<br><br>

## 后台项目的实现步骤
1. 项目准备
```s
| - data # 存放json数据
| - middleware # 存放1-3的中间件
  - koa_reponse_data.js # 业务逻辑中间件
  - koa_reponse_data.js # 总耗时中间件
  - koa_reponse_data.js # 响应头中间件
| - utils
 - file_utils.js # 读取目录中的文件
```

2. 编写 总耗时中间件
3. 编写 响应头中间件
4. 编写 业务逻辑中间件 (读取某个目录下的内容)
5. 允许跨域

<br><br>

## 总耗时中间件
该中间件必须位于第一层, 这个中间件是用来计算服务器的总耗时 那就是刚刚经过服务器处理的时候记录开始的时间 

在所有中间件结束之后 记录下结束的时间 然后将前后两个时间一对减 就可以得到服务器总消耗时长

<br>

**所以第一层中间件是最先经过请求的中间件 也是最后结束请求的中间件**

<br>

我们最后拿到的耗时时长 需要通过响应头的方式给前端浏览器 该响应头为: ``X-Response-Time: 5ms``

<br>

### 代码:
```js
// 中间件就是一个函数 我们暴露一个函数就可以
module.exports = async (ctx, next) => {

  // 记录开始时间
  const start = Date.now()

  // 让内层中间件得到执行
  await next()

  // 记录结束的时间
  const end = Date.now()

  // 设置响应头 X-Response-Time
  const duration = end - start
  
  // ctx.set 设置响应头
  ctx.set('X-Response-Time', duration + 'ms')
}
```

<br><br>

## 响应头中间件
1. 它位于第二层中间件
2. 获取响应数据的mime类型, 我们指明json格式
3. 设置响应头 Content-Type: application/json; charset=UTF-8
4. 设置跨域相关

```js
// 设置响应头的中间件
module.exports = async (ctx, next) => {
  const contentType = 'application/json; charset=utf-8'
  ctx.set('Content-Type', contentType)

  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
  await next()
}
```

<br><br>

## 业务逻辑中间件
它为于第三层中间件 它专门读取文件中的内容 读取什么文件中的内容取决于浏览器中url的路径

```s
http://127.0.0.1:8081/api/seller
```

1. 获取请求的路径 根据请求路径拼接文件路径
2. 读取该路径对应的文件的内容
3. 将文件内容设置到响应体中

<br>

### 业务逻辑中间件代码部分
**要点:**  
1. 我们就三层中间件 最后一层中间件最好写上next() 因为中间件代码都是独立的 我们没有办法保证后续不扩展中间件 也不知道该中间件最后会使用到哪一层 所以我们最好加上 next

2. 一般中间件都会使用 async await 的格式

```js
// 处理业务逻辑的中间件,读取某个json文件的数据
const path = require('path')

// 读取json文件的方法
const fileUtils = require('../utils/file_utils')

module.exports = async (ctx, next) => {
  // 根据url 整理出 json数据文件的位置
  const url = ctx.request.url 
  // /api/seller

  // 去掉 /api 不分
  let filePath = url.replace('/api', '')
  // /seller
  
  // 拼接路径
  filePath = '../data' + filePath + '.json'
  // ../data/seller.json
  
  // 当前文件所在的目录 + ../ 会减少一层目录 最终实现拼接的操作
  filePath = path.join(__dirname, filePath)
  // /Users/sam/Desktop/Sam/Demo/Front/Echarts_Product/server/data/seller.json


  try {
    const ret = await fileUtils.getFileJsonData(filePath)
    ctx.response.body = ret


  // 如果请求的 uri 不对 是会报错的 比如我们请求 /haha
  } catch (error) {
    const errorMsg = {
      message: '读取文件内容失败, 文件资源不存在',
      status: 404
    }
    // 将读取的数据响应回前台
    ctx.response.body = JSON.stringify(errorMsg)
  }
 

  // 确保下一层中间件能后执行
  await next()
}
```

<br>

### 读取文件内容的工具
```js
// 读取文件的工具方法
const fs = require('fs')

module.exports.getFileJsonData = (filePath) => {
  // 根据文件的路径, 读取文件的内容
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if(error) {
        // 读取文件失败
        reject(error)
      } else {
        // 读取文件成功
        resolve(data)
      }
    })
  })
}
```

<br><br>

## 后台接口总览
1. 商家销量 /api/seller
2. 预算开销 /api/budget
3. 库存信息 /api/stock
4. 销量趋势 /api/trend
5. 销量排行 /api/rank
6. 商家分布 /api/map
7. 热销商品 /api/hotproduct

<br><br>

# 前端项目

## 准备工作
**1. 全局引入echarts**  
我们在 /public/index.html 文件中使用 script 的方式引入 我们放在 /static/lib/echarts.min.js 文件

一旦我们通过该方式引入echarts.js文件后 我们就使用通过 ``window.echarts`` 获取echarts对象

<br>

**2. 将全局的echarts对象挂载到vue的原型对象上**  
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"

// 导入全局样式文件
import "@/assets/css/global.scss"

Vue.config.productionTip = false

// axios全局配置
axios.defaults.baseURL = "http://127.0.0.1:8081/api/"

// 将 echarts 挂载到 vue 原型对象上
Vue.prototype.$echarts = window.echarts
Vue.prototype.http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

<br>

**3. xxxPage.vue 和 xxx.vue的关系**  
xxxPage.vue 它里面会使用 xxx.vue 进行展示内容,我们会配置路由方便我们全屏查看该组件的效果

而最终我们会使用 xxx.vue 文件

<br><br>

## 全局样式
1. 全局样式 要是想生效需要在 main.js 文件中引入
2. chart和chart的父元素 都是100% 这样适应性比较高 我们在哪里引入chart组件 它就是根据父组件的宽度自适应的

```scss
html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

// xxxPage的样式
.common-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

// chart的亲父亲
.common-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

// chart容器
.common-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

<br><br>

# 商家销售统计(横向柱状图)

## 组件基本结构

**SellerPage.vue**
```vue
<script>
import {defineComponent} from 'vue'
import Seller from "@/components/Seller.vue";

export default defineComponent({
  name: "SellerPage",
  components: {
    Seller
  }
})
</script>

<!-- 展示路径 /sellerPage -->
<template>
  <div class="common-page">
    <Seller />
  </div>

</template>

<style scoped lang="scss">

</style>
```

<br>

**Seller.vue**
```vue
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Seller.vue"
})
</script>

<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="common-container">
    <div class="common-chart"></div>
  </div>
</template>

<style scoped lang="scss">

</style>
```

<br><br>

## 商家销售统计: 图表功能基本实现
1. 初始化图表 创建echarts对象
2. 获取服务器提供的数据
3. setOption() 更新图表

<br>

### 初始化图表 创建echarts对象
**1. echarts.init(DOM节点)相关**  
我们可以使用 ref 并不是只可以使用document选择器

<br>

**2. 逻辑:**  
- initChart方法
  - 负责初始化echarts实例对象
  - 组织基本的数据结构 并没有数据(类目轴数据和series中数据)
  - 数据会在请求api成功后调用updateChart方法追加相关数据
  - 因为initChart方法中并不提供数据 所以页面效果就是只有直角坐标系
```js
// 1. 获取实例
this.chart = this.$echarts.init(this.$refs.chart)
// 2. 配置没有数据的option
const ops = {}
// 3. 将option给chart
this.chart.setOption(ops)
```

<br>

**3. bar型图表的数据格式**  
数据格式如下:

```js
[{ "name": "商家1",  "value": 99}]
```

其中name是类目轴需要使用的数据 value是series.data中需要使用的数据**


<br><br>

## 商家销售统计: 动态刷新
该柱形图一共有15条数据, 但是我们并没有一次性的将15条数据 一次性的全部展示 而是类似分页的效果 每一页展示5条 

**然后通过定时刷新的方式** 使页码改变 展示对应页码的数据 从而实现在不同的页码之间进行数据的切换

<br>

### data配置项:
```js
data() {
return {
    // chart数据
    detailData: [],
    // 图表实例
    chart: null,
    // 分页处理逻辑
    limit: {
        // 当前显示的页数 (会通过定时器不断地改变它的值)
        currentPage: 1,
        // 每页显示几条
        pageSize: 5,
        // 总页数(通过计算)
        totalPage: 0
    },
    timer: null
}
```

<br>

### 逻辑:
**1. 处理请求回来的数据**  
我们会请求回来15条数据 因为分页 我们需要做数据的处理

- 排序: 从小到大
- 处理总页码: 两种方式
- 调用 updateChart 往chart中追加所需的数据
- 在请求api方法的最后 我们调用自动刷新的定时器逻辑
```js
async getData() {

    const { data: res } = await this.$http({
        url: "/api/seller"
    })

    // 处理请求回来的数据 整理为 从小到大 的顺序
    res.sort((a, b) => a.value - b.value)

    this.detailData = res
    // 每5个元素为一页 我们计算总页数
    // 方式1:
    this.limit.totalPage = Math.ceil(this.detailData.length / this.limit.pageSize)
    
    // 方式2:
    // this.totalPage = this.detailData.length % this.limit.pageSize === 0 ? this.detailData.length / this.limit.pageSize : this.detailData.length / 5 + 1
    this.updateChart()

    // 开启定时器 刷新数据
    this.startInterval()
},
```

<br>

**2. updateChart方法:**  
该方法中主要完成分页的逻辑

- 使用 slice() 方法来截取数据 获取的是新数组
- 获取 start end 的索引位置
```js
/*
如果当前页面为1 我们需要从detailData中获取 0 - 5 的数据 来进行展示
slice() 会返回新的数组

start = (pageNo - 1) * pageSize
end = pageNo * pageSize
*/
const start = (this.limit.currentPage - 1) * this.limit.pageSize

const end = this.limit.currentPage * this.limit.pageSize
```

它方法会根据当前页码 来从数据源中获取符合当前页的数据 然后追加到chart中

<br>

**3. 自动刷新:**  
startInterval方法用于 将当前页码更新 然后调用updateChart方法来刷新页面

- 定时器方法的最开始 加上
```js
if(this.timer) {
    clearInterval(this.timer)
}
```

- 方法内部逻辑为 先让页码++ 然后做边界判断 最后调用 updateChart方法

<br>

**4. 事件的绑定**  
我们会在 chart初始化的方法的最后 完成事件绑定的逻辑
```js
initChart() {
    ...

    // 监听图表的事件 需要在初始化图表的时候完成
    // 鼠标移入 关闭定时器
    this.chart.on("mouseover", () => {
        clearInterval(this.timer)
    })
    // 鼠标移出 重新启动定时器
    this.chart.on("mouseout", () => {
        this.startInterval()
    })
}
```

<br>

**5. 定时器的关闭**
在组件销毁前

<br><br>

## 商家销售统计: UI调整
- 主题的使用
- 图表的圆角
- 图表的标题
- 坐标轴的位置
- 柱状图的条目

<br>

### 主题的使用
我们将主题的js文件 在/public/index.html 中使用script标签引入, 这样我们就可以使用主题名来进行注册

<br>

### 图表的圆角
图表是使用canvas来绘制的 我们要是想将整个的图表修改为圆角 我们可以使用css来修改 canvas标签

```scss
// global.scss
canvas {
  border-radius: 20px;
}
```

<br>

### 图表的标题
我们在使用 title.textStyle.fontSize 控制标题的大小的时候 发现如果我们的标题太小 它会盖主图表

这时我们只能移动图表的位置 **我们需要调整整个图标的坐标轴** 从而调整图表的部分

```js
title: {
    text: "▎商家销售统计",
    left: "5%",
    top: "3%",
    textStyle: {
        fontSize: 30
    }
},
grid: {
    top: "13%",
    left: "5%",
    right: "5%",
    bottom: "13%",
    // left等位置的基准是包含y轴文字的 可以有效防止内容溢出!!!!!
    containLabel: true
},
```

<br>

### 柱状图条目的控制
- 宽度
- 柱状图对应的提示文字(数据)
- 右边圆角
- 颜色渐变
- 背景 (引入到一个柱条后 有背景)

<br>

### 颜色渐变
图表中的每一个项的颜色渐变的设置方式有两种
1. optiosn.color配置项 调色盘
2. 渐变颜色生成器

我们下面使用的是 渐变颜色生成器
```js
new this.$echarts.graphic.LinearGradient()
```

<br>

**注意:**  
最后一个参数false一定要传递

```js
series: [
  {
    type: "bar",
    name: "商家销量统计",
    // 调整柱的宽度
    barWidth: 66,
    // 提示文件的展示
    label: {
      show: true,
      // 提示文件的位置
      position: "right",
      // 提示文字颜色
      textStyle: {
        color: "#fff"
      }
    },
    // 每一个bar属于 每一个条目使用如下配置
    itemStyle: {
      // 控制柱状条中一个柱条的四个圆角 左上 右上 右下 左下
      // 圆角是柱宽度的一半 柱宽度上面设置了 66 这里所以是33
      barBorderRadius: [0, 33, 33, 0],
      /*
       颜色渐变:
       new this.$echarts.graphic.linearGradient()
       内置的渐变颜色生成器, 它可以生成一个渐变色, 来控制每一个bar的颜色渐变

       1. 指明颜色渐变的方向
         参数1
         x1, y1, x2, y2 这是两个点 两个点可以组织成一条线 也就是方向
         这两个点是相对值 正方向的4个点
         0,0    1,0

         0,1    1,1

       2. 指明不同百分比之下颜色的值
         参数2: 数组对象
         配置不同百分比之下颜色的具体值
      */
      color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
        // 0%的状态
        { offset: 0, color: "#5052EE" },
        // 100%的状态
        { offset: 1, color: "#AB6EE5" }
      ], false)
    }
  }
]
```

<br>

### 背景
当我们移入到一个项目的时候 如下展示两个部分
1. 该条项目有浅色的带有透明度的背景 做为hover效果
2. 有提示框

```js
// 提示框
tooltip: {
    // 移入到坐标轴的时候显示提示框
    trigger: "axis",
    // 鼠标移入到坐标轴时展示的样式
    axisPointer: {
        // hover上去的时候是线条
        type: "line",
        // 线条的样式
        lineStyle: {
            width: 66,
            color: "#2D3443"
        },
        // 调整提示框的层级 将它调整为0
        z: 0
    }
},
```

<br><br>

## 商家销售统计: 拆分图表的options
我们options的中包含很多的属性
- 标题
- 坐标轴
- 坐标系的位置
- 提示框
- 系列

里面还包含了数据 比如类目轴 和 series中需要的数据, 我们的options中包含了很多部分的内容

而对于我们的updateChart而言的话 它是在得到数据之后 对图表的数据进行更新

<br>

### 拆分部分:

所以我们可以将options拆分成不同的部分 来进行维护 我们会将它拆解成
1. 初始化配置 initOption
  - 标题
  - 坐标轴类型 大小

2. 获取数据之后的配置 dataOption
  - 类目轴的数据
  - 数值轴的数据

3. 分辨率适配的配置 adapterOption
  - 标题文字的大小
  - 柱的大小
  - 背景大小

<br>

**initOption:**  
- 它里面不包含数据
- 它里面不包含需要适配的选项 比如
  - 文字大小
  - 提示框的背景大小


<br>

**dataOption:**  
在updateChart方法中

<br>

**adapterOption:**  
该配置在下一个部分

<br>

## 商家销售统计: 分辨率的适配
我们想让图表能够随着浏览器的大小可以发生自适应的变化

<br>

### 方式:
监听窗口大小变化事件 

<br>

### 逻辑:
当浏览器窗口的大小发现变化的时候 我们需要完成如下的逻辑
1. 获取图表容器的宽度
2. 设置新的option
  - 标题文字的大小
  - 柱的宽度
  - 柱的圆角
  - 阴影背景的宽度

3. 图表 实例对象.resize

当我们监听到浏览器窗口大小发现变化的时候 我们重新获取图表容器(ref="chart")的宽度 然后我们改变图表中不同区域的大小

<br>

**注意:**  
修改echarts的效果都是通过 创建option - setOption 实现的 想想react

<br>

### 代码部分:
```js
// window窗口尺寸发生变化时的回调 完成屏幕的适配
screenAdapter() {
  // 修改图标都是通过 设置option - setOption

  // 1. 获取图表容器的宽度
  if(this.$refs.chart) {
    const chartWidth = this.$refs.chart.offsetWidth

    // 定义标题的大小 分成100份 每份为3.6
    const baseSize = chartWidth / 100 * 3.6

    // 修改图标都是通过 设置option - setOption
    // 创建跟适配相关的option
    const adapterOption = {
      title: {
        textStyle: {
          fontSize: baseSize
        },
      },
      tooltip: {
        axisPointer: {
          lineStyle: {
            width: baseSize,
          },
        }
      },
      series: [
        {
          barWidth: baseSize,
          itemStyle: {
            barBorderRadius: [0, baseSize / 2, baseSize / 2, 0]
          }
        }
      ]
    }
    this.chart.setOption(adapterOption)
    // 当窗口发生变化的时候 我们需要调用resize 图表才会改变
    this.chart.resize()
  }
},
```

<br>

### 商家销售统计组件代码部分:
```vue
<script>
import {defineComponent} from 'vue'
// 引入主题
import chalk from "../assets/theme/chalk"

// 引入渐变颜色生成器
import { LinearGradient } from "echarts/lib/util/graphic"
import {windowOpen} from "echarts/lib/util/format";
// console.log(LinearGradient)

export default defineComponent({
  name: "Seller",
  data() {
    return {
      // chart数据
      detailData: [],
      // 图表实例
      chart: null,
      theme: chalk,  // vintage | chalk
      // 分页处理逻辑
      limit: {
        // 当前显示的页数 (会通过定时器不断地改变它的值)
        currentPage: 1,
        // 每页显示几条
        pageSize: 5,
        // 总页数(通过计算)
        totalPage: 0
      },
      timer: null
    }
  },
  mounted() {
    this.getData()
    this.initChart()

    // 监视窗口改变的事件
    window.addEventListener("resize", this.screenAdapter)
    // 页面加载的时候主动调用下适配的方法
    this.screenAdapter()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    window.removeEventListener("resize", this.screenAdapter)
  },
  methods: {
    // window窗口尺寸发生变化时的回调 完成屏幕的适配
    screenAdapter() {
      // 修改图标都是通过 设置option - setOption

      // 1. 获取图表容器的宽度
      if(this.$refs.chart) {
        const chartWidth = this.$refs.chart.offsetWidth

        // 定义标题的大小 分成100份 每份为3.6
        const baseSize = chartWidth / 100 * 3.6

        // 修改图标都是通过 设置option - setOption
        // 创建跟适配相关的option
        const adapterOption = {
          title: {
            textStyle: {
              fontSize: baseSize
            },
          },
          tooltip: {
            axisPointer: {
              lineStyle: {
                width: baseSize,
              },
            }
          },
          series: [
            {
              barWidth: baseSize,
              itemStyle: {
                barBorderRadius: [0, baseSize / 2, baseSize / 2, 0]
              }
            }
          ]
        }
        this.chart.setOption(adapterOption)
        // 当窗口发生变化的时候 我们需要调用resize 图表才会改变
        this.chart.resize()
      }
    },
    // 初始化 echarts 实例对象
    initChart() {
      // 获取 echarts 实例对象
      this.chart = this.$echarts.init(this.$refs.chart, chalk)

      // 我们将options配置拆分成如下的几个部分来管理
      // 1. 对图表的初始化配置
      const initOption = {
        // 标题相关配置
        title: {
          text: "▎商家销售统计",
          left: "5%",
          top: "3%",
          textStyle: {
            fontSize: 30
          }
        },
        grid: {
          // 位置相关配置
          top: "13%",
          left: "5%",
          right: "5%",
          bottom: "13%",
          // left等位置的基准是包含y轴文字的 可以有效防止内容溢出
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
        },
        // 提示框
        tooltip: {
          // 移入到坐标轴的时候显示提示框
          trigger: "axis",
          // 鼠标移入到坐标轴时展示的样式
          axisPointer: {
            // hover上去的时候是线条
            type: "line",
            // 线条的样式
            lineStyle: {
              width: 66,
              color: "#2D3443"
            },
            // 调整提示框的层级 将它调整为0
            z: 0
          }
        },
        series: [
          {
            type: "bar",
            name: "商家销量统计",
            // 调整柱的宽度
            barWidth: 66,
            // 设置柱之间的间距
            // barCategoryGap: "30px",
            // 提示文件的展示
            label: {
              show: true,
              // 提示文件的位置
              position: "right",
              // 提示文字颜色
              textStyle: {
                color: "#fff"
              }
            },
            // 每一个bar属于 每一个条目使用如下配置
            itemStyle: {
              // 控制柱状条中一个柱条的四个圆角 左上 右上 右下 左下
              // 圆角是柱宽度的一半 柱宽度上面设置了 66 这里所以是33
              barBorderRadius: [0, 33, 33, 0],
              /*
               颜色渐变:
               new this.$echarts.graphic.linearGradient()
               内置的渐变颜色生成器, 它可以生成一个渐变色, 来控制每一个bar的颜色渐变

               1. 指明颜色渐变的方向
                 参数1
                 x1, y1, x2, y2 这是两个点 两个点可以组织成一条线 也就是方向
                 这两个点是相对值 正方向的4个点
                 0,0    1,0

                 0,1    1,1

               2. 指明不同百分比之下颜色的值
                 参数2: 数组对象
                 配置不同百分比之下颜色的具体值
              */
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                // 0%的状态
                { offset: 0, color: "#5052EE" },
                // 100%的状态
                { offset: 1, color: "#AB6EE5" }
              ], false)
            }
          }
        ]
      }
      // 设置基本数据
      this.chart.setOption(initOption)

      // 监听图表的事件 需要在初始化图表的时候完成
      // 鼠标移入 关闭定时器
      this.chart.on("mouseover", () => {
        clearInterval(this.timer)
      })
      // 鼠标移出 重新启动定时器
      this.chart.on("mouseout", () => {
        this.startInterval()
      })
    },

    // 获取服务器数据
    async getData() {
      const { data: res } = await this.$http({
        url: "/api/seller"
      })

      // 处理请求回来的数据 整理为 从小到大 的顺序
      res.sort((a, b) => a.value - b.value)

      this.detailData = res
      // 每5个元素为一页 我们计算总页数
      // 方式1:
      this.limit.totalPage = Math.ceil(this.detailData.length / this.limit.pageSize)

      // 方式2:
      // this.totalPage = this.detailData.length % this.limit.pageSize === 0 ? this.detailData.length / this.limit.pageSize : this.detailData.length / 5 + 1
      this.updateChart()

      // 开启定时器 刷新数据
      this.startInterval()
    },
    // 更新图表
    updateChart() {

      /*
      如果当前页面为1 我们需要从detailData中获取 0 - 5 的数据 来进行展示
      slice() 会返回新的数组

      start = (pageNo - 1) * pageSize
      end = pageNo * pageSize
      */
      const start = (this.limit.currentPage - 1) * this.limit.pageSize
      const end = this.limit.currentPage * this.limit.pageSize
      const source = this.detailData.slice(start, end)
      /*
      数据格式:
      [{ "name": "商家1",  "value": 99}]

      处理数据组织成bar需要的数据格式
      1. 类目轴需要的数据 name数据
      2. series.data 中需要的数据 value数组
      */

      const categoryData = source.map(item => item.name)
      const seriesData = source.map(item => item.value)

      // 更新echarts表中的数据 该方法起到了更新图标的作用
      this.chart.setOption({
        yAxis: { data: categoryData },
        series: [
          { data: seriesData }
        ]
      })
    },
    // 在getData方法的最后调用
    startInterval() {
      if(this.timer) {
        clearInterval(this.timer)
      }

      this.timer = setInterval(() => {
        this.limit.currentPage++

        // 边界判断
        if(this.limit.currentPage > this.limit.totalPage) {
          this.limit.currentPage = 1
        }

        // 当页码发生变化后 我们调用updateChart方法来更新图表
        this.updateChart()
      }, 5000)
    }
  }
})
</script>

<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="common-container">
    <!-- chart容器 -->
    <div class="common-chart" ref="chart"></div>
  </div>
</template>

<style scoped lang="scss">

</style>
```

<br><br>

# 销量趋势图表 (折线图)
我们需要在这个部分完成下面的逻辑

<br><br>

## 销量趋势图表: 通用的代码结构和流程

### 接口的数据结构

**要点1:**  
销量趋势图表的标题是可以点击的 点击它有类似下拉框的效果 可以切换如下的图表 从而展示对应的图表
- 地区销量趋势 map
- 商家销量趋势 seller
- 商品销量趋势 seller

上面三个数据项表示, 销量趋势图表 中的三份图表数据 后面我们会动态的切换它们


```js
{
  // 地区销量趋势 折线图
  "map": {
    "title": "地区销量趋势",
    "base": 310,
    "unit": "万",
    "data": [ 
      // 该折线图上有很多组 线条
      {
        "name": "上海",
        "data": [ "154.65", ... ]
      },
      {
        "name": "北京",
        "data": [ "154.65", ... ]
      },
    ]
  },

  // 商家销量趋势
  "seller": {
    "title": "商家销量趋势",
    "base": 120,
    "unit": "万",
    "data": [
      {
        "name": "商家1",
        "data": [ "33.00", ... ]
      },
      {
        "name": "商家2",
        "data": [ "33.00", ... ]
      },
    ]
  },

  // 商品销量趋势
  "commodity": {
    "title": "商品销量趋势",
    "base": 50,
    "unit": "万",
    "data": [
      {
        "name": "女装",
        "data": [ "33.00", ... ]
      },
      {
        "name": "手机数码",
        "data": [ "33.00", ... ]
      },
    ]
  },

  // x类目轴的数据
  "common": {
    "month": [ "一月", ... ]
  },

  // 图表标题部分的下拉框 type数组就是内部的可选项
  "type": [
    {
      "key": "map",
      "text": "地区销量趋势"
    },
    {
      "key": "seller",
      "text": "商家销量趋势"
    },
    {
      "key": "commodity",
      "text": "商品销量趋势"
    }
  ]
}
```

<br><br>

## 销量趋势图表: 图表基本功能
1. 数据的获取
2. 数据的处理
3. 图表的设置

<br>

### 数据获取:

**initChart方法:**  
它会在mounted中 进行chart的初始化 并配置基本的配置项

<br>

**getData:**  
它会在mounted中进行调用 并将请求回来的数据 挂载到实例上 detailData 

然后会调用updateChart方法来处理数据 将图标所需要的数据加载到图标中
```js
 async getData() {
    const { data: res } = await this.$http({
        url: "/api/trend"
    })
    this.detailData = res
    this.updateChart()
},
```

<br>

**updateChart方法:**  
- 拿到 折线图 类目轴需要的数据
- 拿到 折线图 中 3个图表数据其中之一进行处理
```js
updateChart() {
  // 类目轴数据: x轴上需要
  const xAxisData = this.detailData.common.month
  
  /*
  处理数据 整理出series中需要的格式
    该折线图可以切换3组数组(对应3个图表) 我们先展示 地区销量趋势 - map
    
    地区销量趋势 折线图上有很 多组 线条 它们就对应着 series数组中有很多个{}
    我们要组织出 series下的数据结构
  */
  const regionSalesData = this.detailData.map.data
  const regionSeriesData = regionSalesData.map(item => {
    // 它是series数组中的一个对象元素
    return {
      type: "line",
      name: item.name,
      data: item.data,
      // 设置堆叠图: 设置相同的 stack 值
      stack: "map",
      // 设置颜色区域: 
      areaStyle: {
        // 图形区域的起始位置
        origin: 'start'
      },
    }
  })

  // 设置图例数据: 它需要和 上面regionSeriesData中name属性的值保持一致 用于筛选
  const legendData = regionSalesData.map(item => item.name)
  
  // 设置option
  const dataOps = {
    xAxis: {
      // 类目轴中的数据
      data: xAxisData
    },
    legend: {
      data: legendData,
      top: "10%"
    },
    // 地区销量趋势[可切换] 对应图标的数据
    series: regionSeriesData
  }
  this.chart.setOption(dataOps)
},
```

<br><br>

## 销量趋势图表: UI调整
1. 主题的使用
2. 坐标轴大小设置
```js
// 坐标轴位置相关配置
grid: {
  top: "20%",
  left: "5%",
  right: "5%",
  bottom: "10%",
  // 将坐标轴上的文字 包含在grid配置内, 可以有效防止内容溢出
  containLabel: true
},
```

3. 紧挨边缘
```js
xAxis: {
  type: "category",
  boundaryGap: false
},
```

4. 工具提示
```js
tooltip: {
  trigger: "axis"
},
```

5. 图例位置和形状
```js
legend: {
  // 左边20像素
  // left: 20,
  top: "10%",
  // 设置图例的图标
  icon: "circle"
},
```

6. 区域面积
7. 颜色渐变
```js
series: [
  {
    ...
    areaStyle: {
      // 图形区域的起始位置
      // origin: 'start',
      // 区域颜色的渐变设置
      color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
        // 0%的位置
        { offset: 0, color: opacityColors[index] },
        // 100%的位置
        { offset: 1, color: noOpacityColors[index] },
      ], false)
    },
  }
]
```

<br><br>

## 销量趋势图表: 切换图表
我们可以点击 title 右侧的下拉箭头 来切换条目 从而展示不同的折线图

因为该部分的标题有下拉箭头, 所以我们自己使用原生的方法创建标题部分 而不是使用echarts中的组件来完成的

<br>

### html结构部分:
该部分的图表 标题的部分是可以点击的 当我们点击标题右侧的下拉箭头后 可以展示 待切换的选项 如
```
标题1 ↓
标题2
标题3
```

该部分的时候并没有使用 echarts 中的功能 而是我们自己定义的 html 结构

<br>

**下拉项的区域逻辑:**  
下拉项的区域是一个div 我们定义变量 使用 v-show 来通过变量 控制该区域的显示 和 隐藏

<br>

**图表标题的逻辑:**  
当我们点击一个下拉项 会将该下拉项的 key 保存在 data配置项的 choiceType 变量中

我们会定义一个计算属性selectTile 在内部根据 choiceType变量中的值 去数据源中取title的部分

<br>

**点击下拉项的逻辑:**  
当我们点击一个下拉项的时候 会做以下的逻辑
1. 将该下拉项的key 保存在 data配置项中
2. 调用updateChart完成更新图标的逻辑
3. 关闭下拉框区域
```js
// computed
selectTypes() {
  if (this.detailData.type) {
    /*
    标题下拉中有3个值 如果当前选择的是1 则下拉框里面应该只有2 3
    */
    return this.detailData.type.filter(item => item.key !== this.choiceType)
  } else {
    return []
  }
},
selectTile() {
  if (!this.detailData) {
    return ""
  } else {
    return this.detailData[this.choiceType].title
  }
}


// methods
handleSelect(key) {
  this.choiceType = key
  // 修改完后 我们要手动调用 更新图片的updateChart方法
  this.updateChart()
  // 点击后隐藏div
  this.showChoice = false
}
```

```html
<template>
  <div class="common-container">
    <!-- 标题部分结构 -->
    <div class="title">
      <span>{{ selectTile }}</span>
      <span
        class="iconfont title-icon"
        @click="showChoice = !showChoice"
      >&#xe6eb;</span>
      <div v-if="showChoice" class="select-container">
        <div
          class="select-item"
          v-for="item in selectTypes"
          :key="item.key"
          @click="handleSelect(item.key)"
        >{{item.text}}</div>
      </div>
    </div>
    <!-- chart容器 -->
    <div class="common-chart" ref="chart"></div>
  </div>
</template>
```

<br>

**切换图标的逻辑:**  
我们点击一个下拉项后 会将该下拉项对应的key保存在 choiceType 变量中

然后 updateChart方法中 会根据choiceType变量的值 从请求回来的数据源中 取三个折线图对应的数据
```js
const regionSalesData = this.detailData[this.choiceType].data
```

<br><br>

## 销量趋势图表: 分辨率适配
我们需要适配
1. 标题文字的大小
2. 图例大小

<br>

### 标题文字的大小
首先我们计算出 适配比例
```js
this.baseSize = this.$refs.chart.offsetWidth / 100 * 3.6
```

然后定义计算属性
```js
// 设置给标题的样式
titleStyle() {
  return {
    fontSize: this.baseSize + "px"
  }
}
```

最后绑定给标题的html结构中
```html
<span :style="titleStyle">{{ selectTile }}</span>
```

<br>

### 图例大小
```js
legend: {
  // 图例的宽度
  itemWidth: this.baseSize,
  // 图例的高度
  itemHeight: this.baseSize,
  // 图例的间距
  itemGap: this.baseSize,
  // 图例的文字样式
  textStyle: {
    fontSize: this.baseSize / 2
  }
}
```

<br><br>

## 销量趋势图表 代码:
```vue
<script>
import {defineComponent} from 'vue'
// 引入主题
import chalk from "../assets/theme/chalk"

export default defineComponent({
  name: "Trend",
  data() {
    return {
      chart: null,
      detailData: null,
      timer: null,
      showChoice: false,
      choiceType: "map",
      // 标题的字体大小
      baseSize: 0
    }
  },
  computed: {
    selectTypes() {
      if (this.detailData.type) {
        /*
        标题下拉中有3个值 如果当前选择的是1 则下拉框里面应该只有2 3
        */
        return this.detailData.type.filter(item => item.key !== this.choiceType)
      } else {
        return []
      }
    },
    selectTile() {
      if (!this.detailData) {
        return ""
      } else {
        return this.detailData[this.choiceType].title
      }
    },
    // 设置给标题的样式
    titleStyle() {
      return {
        fontSize: this.baseSize + "px"
      }
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener("resize", this.screenAdapter)
    // 页面加载的时候 主动适配当前的屏幕尺寸
    this.screenAdapter()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.screenAdapter)
    clearInterval(this.timer)
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http({
        url: "/api/trend"
      })
      this.detailData = res
      this.updateChart()
    },
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chart, chalk)
      const initOps = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          // 左边20像素
          // left: 20,
          top: "10%",
          // 设置图例的图标
          icon: "circle"
        },
        // 坐标轴位置相关配置
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "10%",
          // 将坐标轴上的文字 包含在grid配置内, 可以有效防止内容溢出
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        }
      }
      this.chart.setOption(initOps)
    },
    updateChart() {
      // 准备 区域颜色部分的 颜色数组 渐变从半透明 - 全透明
      const opacityColors = [
        "rgba(11,168,44,0.5)",
        "rgba(44,110,225,0.5)",
        "rgba(22,242,217,0.5)",
        "rgba(250,105,0,0.5)",
        "rgba(121,0,250,0.5)",
      ]
      const noOpacityColors = [
        "rgba(11,168,44,0)",
        "rgba(44,110,225,0)",
        "rgba(22,242,217,0)",
        "rgba(250,105,0,0)",
        "rgba(121,0,250,0)",
      ]
      // 类目轴数据: x轴上需要
      const xAxisData = this.detailData.common.month

      /*
      处理数据 整理出series中需要的格式
        该折线图可以切换3组数组(对应3个图表) 我们先展示 地区销量趋势 - map

        地区销量趋势 折线图上有很 多组 线条 它们就对应着 series数组中有很多个{}
        我们要组织出 series下的数据结构
      */
      const regionSalesData = this.detailData[this.choiceType].data
      const regionSeriesData = regionSalesData.map((item, index) => {
        // 它是series数组中的一个对象元素
        return {
          type: "line",
          name: item.name,
          data: item.data,
          // 设置堆叠图: 设置相同的 stack 值
          stack: this.choiceType,
          // 设置颜色区域:
          areaStyle: {
            // 图形区域的起始位置
            // origin: 'start',
            // 区域颜色的渐变设置
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              // 0%的位置
              { offset: 0, color: opacityColors[index] },
              // 100%的位置
              { offset: 1, color: noOpacityColors[index] },
            ], false)
          },
        }
      })

      // 设置图例数据: 它需要和 上面regionSeriesData中name属性的值保持一致 用于筛选
      const legendData = regionSalesData.map(item => item.name)

      // 设置option
      const dataOps = {
        xAxis: {
          // 类目轴中的数据
          data: xAxisData
        },
        legend: {
          data: legendData,
        },
        // 地区销量趋势[可切换] 对应图标的数据
        series: regionSeriesData
      }
      this.chart.setOption(dataOps)
    },
    screenAdapter() {
      this.baseSize = this.$refs.chart.offsetWidth / 100 * 3.6
      const adapterOps = {
        // 控制图例的 宽度 和 高度
        legend: {
          itemWidth: this.baseSize,
          itemHeight: this.baseSize,
          itemGap: this.baseSize,
          textStyle: {
            fontSize: this.baseSize / 2
          }
        }
      }
      this.chart.setOption(adapterOps)
      // 自适应后需要手动调用 resize
      this.chart.resize()
    },
    handleSelect(key) {
      this.choiceType = key
      // 修改完后 我们要手动调用 更新图片的updateChart方法
      this.updateChart()
      // 点击后隐藏div
      this.showChoice = false
    }
  }
})
</script>

<template>
  <div class="common-container">
    <!-- 标题部分结构 -->
    <div class="title">
      <span :style="titleStyle">▎{{ selectTile }}</span>
      <span
        class="iconfont title-icon"
        :style="titleStyle"
        @click="showChoice = !showChoice"
      >&#xe6eb;</span>
      <div v-if="showChoice" class="select-container">
        <div
          class="select-item"
          :style="titleStyle"
          v-for="item in selectTypes"
          :key="item.key"
          @click="handleSelect(item.key)"
        >{{item.text}}</div>
      </div>
    </div>
    <!-- chart容器 -->
    <div class="common-chart" ref="chart"></div>
  </div>
</template>

<style scoped lang="scss">
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 2;
  color: white;

  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }

  .select-item {
    margin-top: 5px;
  }

  .select-container {
    position: absolute;
    left: 12.5%;
    background: #2B3340;
  }
}
</style>
```

<br><br>

# 商家分布模块 (地图 + 散点图)

<br>

## 通用代码结构 和 流程
我们首先会将地图呈现出来 然后再呈现地图上的散点图

<br><br>

## 显示地图
1. 获取中国地图的矢量数据
2. 注册地图数据
3. 配置geo

<br>

### 获取地图矢量数据
我们的 china.json 放在 /public/static 目录下 所以
1. 使用ajax获取json数据
2. 将获取到的json数据 注册到echarts中
```js
async initChart() {
  this.chart = this.$echarts.init(this.$refs.chart, chalk)

  // 获取中国地图的矢量数据
  const { data: res } = await this.$http({
    url: "/static/map/china.json"
  })
  // 将获取的地图数据进行注册
  this.$echarts.registerMap("china", res)

  const initOps = {
    geo: {
      map: "china"
    }
  }
  this.chart.setOption(initOps)
}
```

<br><br>

## 显示散点图
我们要在中国地图之上展示散点图

1. 从后台获取散点图数据
2. 处理成符合散点图的数据结构
3. 图表的设置

<br>

### 散点图数据结构
```js
[
  {
    // 商户的类别
    name: "黄金用户",
    // 黄金商户所在的位置
    children: [
      {
        name: "武汉",
        value: [114.31, 30.52]
      }
    ]
  },
  {
    name: "白金用户",
    children: [
      {
        name: "金华",
        value: [114.31, 30.52]
      }
    ]
  }
]
```

<br>

**散点图的数据结构应该为:**
- 2维数组
- 对象数组: (我们上面的数据中就可以使用对象数组 里面有 name 和 value)

<br>

**注意:**  
此例子中的散点数据 结合的是 地图 我们使用的是地图的坐标 所以不用设置 xy轴

<br>

### 处理散点图数据
从散点图的数据结构上看 应该是有三组数据 分别是
1. 黄金用户
2. 白金用户
3. 钻石用户

也就是说 每个级别的用户 对应series数组下的一个对象

<br>

**让散点使用地图坐标:**  
只有让散点使用地图坐标后 才能在地图成呈现散点

<br>

**图例相关:**  
要点 图例中的数据要和 series数组下的name值保持一致

```js
updateChart() {
  // 处理散点图数据
  const scatterData = this.detailData.map(item => {
    // series数组下的每一个元素对象 一个类别的多个散点
    return {
      type: "effectScatter",
      // 商户的类别 黄金 等
      name: item.name,
      // 散点图数据结构要求是二维数据或者对象数据{name: "", value: []}
      data: item.children,
      // 让散点使用地图坐标 在地图上呈现散点
      coordinateSystem: "geo",
      // 设置涟漪效果
      rippleEffect: {
        number: 3,
        brushType: "stroke"
      },
    }
  })

  // 获取图例的数据
  const legendData = this.detailData.map(item => item.name)

  const dataOps = {
    legend: {
      data: legendData
    },
    series: scatterData
  }
  this.chart.setOption(dataOps)
}
```

<br><br>

## UI调整
1. 主题的使用
2. 标题的显示
3. 地图位置和颜色
4. 图例的位置和方向
5. 涟漪效果

<br>

### 标题的显示
我们在 initOps 中设置 title

```js
title: {
    text: "▎商家分布",
    left: "5%",
    top: "3%",
    textStyle: {
        fontSize: 30
    }
},
```

<br>

### 地图位置和颜色
```js
geo: {
  map: "china",

  // 配置地图的位置
  top: "5%",
  bottom: "5%",

  // 控制地图中的颜色
  itemStyle: {
    // 区域的颜色
    areaColor: "#2172BF",
    // 区域的边框
    borderColor: "#333"
  }
}
```

<br>

### 图例的位置和方向
```js
// 配置图例
legend: {
    left: "5%",
    bottom: "5%",
    // 改变图例的方向
    orient: "vertical",
    // 图例间隔
    itemGap: 20
}
```

<br><br>

## 分辨率适配
1. 标题文字的大小
2. 图例的大小

```js
screenAdapter() {
  const baseSize = this.$refs.chart.offsetWidth / 100 * 3.6
  const adapterOps = {
    title: {
      fontSize: baseSize
    },
    legend: {
      // 图例文字的大小
      textStyle: {
        fontSize: baseSize / 2
      },
      // 图例的宽度
      itemWidth: baseSize / 2,
      itemHeight: baseSize / 2,
      // 图例间隔
      itemGap: baseSize / 3,
    }
  }
  this.chart.setOption(adapterOps)
  this.chart.resize()
}
```

<br><br>

## 地图点击事件
1. 我们点击地图中的某一个省份的时候 可以将该省份展示出来
2. 双击图表 可以将中国地图再次的展现出来

<br>

### 逻辑:
1. 点击事件的监听
2. 获取所点击省份的矢量地图数据
3. 显示省份
4. 回到中国地图 (将geo配置项的map指明为china)

<br>

### 点击事件的监听
我们在initChart方法中 也就是初始化的方法中做监听
```js
async initChart() {
  this.chart = this.$echarts.init(this.$refs.chart, chalk)

  ...

  const initOps = {
    ...
  }
  this.chart.setOption(initOps)


  // 监听点击事件
  this.chart.on("click", param => {
    console.log("param", param)
  })
},


// param数据结构
{
  componentIndex: 0,
  componentType: "geo",
  geoIndex: 0,
  name: "内蒙古",
  type: "click",
  region: {
    name: "内蒙古",
  },
  event: 事件对象
}
```

<br>

**回调中的内部逻辑:**  
1. 通过 param.name 获取所点击的省份 **中文**, 而我们 /map/privince/ 目录下的json文件的文件名都是 **拼音**

2. 将 中文 -> 拼音  
老师将数据整理到一个json文件中 我们可以根据 param.name 获取数据中 省份对应的拼音 没有技术含量 就是kv映射

3. 根据 param.name 请求json文件中的数据 

4. 将请求回来的数据注册到echarts中

5. setOption更新地图数据

<br>

### 代码部分
```js
async initChart() {

  ... 

  // 监听点击事件
  this.chart.on("click", async param => {
    // 根据 param.name 获取中文对应的拼音和json文件的path
    const { key, path } = getProvinceMapInfo(param.name)
    /*
      {
        key: xinjiang,
        path: /static/map/province/xinjiang.json
      }
    */
    // 点击省市地图无效果
    if (!key) {
      return
    }

    // 缓存逻辑: 发送请求前先判断 当前点击的这个省份的数据是否在selectedMapData中
    // 只有当地图的矢量数据不存在selectedMapData中我们才发送ajax请求 注册地图数据
    if (!this.selectedMapData[key]) {
      // 根据 param.name 获取对应省份的数据 res为geo数据
      const { data: res } = await this.$http({
        url: path
      })

      // 缓存用: 将获取到的地图数据保存到data的属性上
      this.selectedMapData[key] = res

      // 将请求回来的数据注册到echarts中
      this.$echarts.registerMap(key, res)
    }

    // 更新地图数据
    const mapOps = {
      geo: {
        map: key
      }
    }
    this.chart.setOption(mapOps)
    this.chart.resize()
  })
},
```

<br>

### 双击回调中国地图:
给chart容器绑定双击事件 回到中国地图
```js
backChinaMap() {
   const ops = {
     geo: {
       map: "china"
     }
   }
   this.chart.setOption(ops)
}
```

<br><br>

## 完整代码部分:
```vue
<script>
import {defineComponent} from 'vue'
import chalk from "../assets/theme/chalk"
// 引入拼音映射文件
import { getProvinceMapInfo } from "@/utils/map_utils"

export default defineComponent({
  name: "Map",
  data() {
    return {
      chart: null,
      detailData: null,
      mapData: null,
      // 缓存用: 所获取的缓存数据
      selectedMapData: {},
      // 判断请求重复标识
      isRequesting: false
    }
  },
  mounted() {
    this.initChart()
    this.getData()

    window.addEventListener("resize", this.screenAdapter)
    this.screenAdapter()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.screenAdapter)
  },
  methods: {
    async initChart() {
      this.chart = this.$echarts.init(this.$refs.chart, chalk)

      // 获取中国地图的矢量数据
      const { data: res } = await this.$http({
        url: "/static/map/china.json"
      })
      // 将获取的地图数据进行注册
      this.$echarts.registerMap("china", res)

      const initOps = {
        // 设置标题
        title: {
          text: "▎商家分布",
          left: "5%",
          top: "3%",
          textStyle: {
            fontSize: 30
          }
        },
        geo: {
          map: "china",

          // 配置地图的位置
          top: "5%",
          bottom: "5%",

          // 控制地图中的颜色
          itemStyle: {
            // 区域的颜色
            areaColor: "#2172BF",
            // 区域的边框
            borderColor: "#333"
          }
        },
        // 配置图例
        legend: {
          left: "5%",
          bottom: "5%",
          // 改变图例的方向
          orient: "vertical",
        }
      }
      this.chart.setOption(initOps)


      // 监听点击事件
      this.chart.on("click", async param => {
        // 根据 param.name 获取中文对应的拼音和json文件的path
        const { key, path } = getProvinceMapInfo(param.name)
        /*
          {
            key: xinjiang,
            path: /static/map/province/xinjiang.json
          }
        */
        // 点击省市地图无效果
        if (!key) {
          return
        }

        // 缓存逻辑: 发送请求前先判断 当前点击的这个省份的数据是否在selectedMapData中
        // 只有当地图的矢量数据不存在selectedMapData中我们才发送ajax请求 注册地图数据
        if (!this.selectedMapData[key]) {
          // 根据 param.name 获取对应省份的数据 res为geo数据
          const { data: res } = await this.$http({
            url: path
          })

          // 缓存用: 将获取到的地图数据保存到data的属性上
          this.selectedMapData[key] = res

          // 将请求回来的数据注册到echarts中
          this.$echarts.registerMap(key, res)
        }

        // 更新地图数据
        const mapOps = {
          geo: {
            map: key
          }
        }
        this.chart.setOption(mapOps)
        this.chart.resize()
      })
    },
    async getData() {
      if (this.isRequesting) {
        return
      }
      const { data: res } = await this.$http({
        url: "/api/map"
      })

      this.isRequesting = false

      this.detailData = res
      this.updateChart()
    },
    updateChart() {
      // 处理散点图数据
      const scatterData = this.detailData.map(item => {
        // series数组下的每一个元素对象 一个类别的多个散点
        return {
          type: "effectScatter",
          // 商户的类别 黄金 等
          name: item.name,
          // 散点图数据结构要求是二维数据或者对象数据{name: "", value: []}
          data: item.children,
          // 让散点使用地图坐标 在地图上呈现散点
          coordinateSystem: "geo",
          // 设置涟漪效果
          rippleEffect: {
            scale: 3,
            number: 3,
            brushType: "stroke"
          },
        }
      })

      // 获取图例的数据
      const legendData = this.detailData.map(item => item.name)

      const dataOps = {
        legend: {
          data: legendData
        },
        series: scatterData
      }
      this.chart.setOption(dataOps)
    },
    screenAdapter() {
      const baseSize = this.$refs.chart.offsetWidth / 100 * 3.6
      const adapterOps = {
        title: {
          fontSize: baseSize
        },
        legend: {
          // 图例文字的大小
          textStyle: {
            fontSize: baseSize / 2
          },
          // 图例的宽度
          itemWidth: baseSize / 2,
          itemHeight: baseSize / 2,
          // 图例间隔
          itemGap: baseSize / 3,
        }
      }
      this.chart.setOption(adapterOps)
      this.chart.resize()
    },
    backChinaMap() {
       const ops = {
         geo: {
           map: "china"
         }
       }
       this.chart.setOption(ops)
    }
  }
})
</script>

<template>
  <div class="common-container" @dblclick="backChinaMap">
    <!-- chart容器 -->
    <div class="common-chart" ref="chart"></div>
  </div>
</template>

<style scoped lang="scss">

</style>
```

<br><br>

# 销售排行 (正常柱形图)
该柱状图带有平移切换数据的动态效果 该效果和上面分页展示数据的逻辑是不一样的

1. 通用的代码结果 和 流程
2. 图表基本功能实现
3. UI调整
4. 平移动画的实现
5. 分辨率适配

<br><br>

## 图表基本功能实现:
1. 数据的获取
2. 数据的处理
3. 图表的设置

<br>

### 数据的获取
我们看看返回的数据结构是什么
```js
[
  { name: "广东", value: 230 },
  { name: "福建", value: 213 },
]
```

<br>

### 数据的处理:
```js
updateChart() {
  // name组成的数组 做为 类目轴 的数据
  const xAxisData = this.detailData.map(item => item.name)
  // value组成的数组 做为 series.data(省份对应的销售金额) 的数据
  const seriesData = this.detailData.map(item => item.value)

  // 追加数据到chart
  const dataOps = {
    xAxis: {
      data: xAxisData
    },
    series: [
      {
        data: seriesData
      }
    ]
  }
  this.chart.setOption(dataOps)
}
```

<br><br>

## UI调整
1. 主题的使用
2. 标题的设置
3. 坐标轴大小和位置
4. 工具提示
5. 颜色设置
  - 不同数值显示不同的颜色(每一个柱的颜色)
  - 颜色渐变

<br>

### 颜色渐变 (js技巧)
每个阶段的数据的颜色不一样 则该阶段的颜色是渐变色
```js
const dataOps = {
  xAxis: {
    data: xAxisData
  },
  series: [
    {
      data: seriesData,
      // 控制每个bar的颜色
      itemStyle: {
        color: param => {
          /*
          param: {
            borderColor:
            color:
            data:
            value:
            dataIndex:
            name:
          }
          */
          // 不同阶段的数值呈现不同的颜色
          const colors = [
            ["#a8930b", "#4fdef7"],
            ["#2E72BF", "#23E5E5"],
            ["#5052EE", "#23E5E5"],
          ]

          let targetColors = null
          if (param.value > 300) {
            targetColors = colors[0]

          // 相当于 value > 200 && value <= 300
          } else if (param.value > 200) {
            targetColors = colors[1]
          } else {
            targetColors = colors[2]
          }


          // 最后只return一次 上面做核心值的判断 和 赋值
          return new this.$echarts.graphic.LinearGradient(0,0,0,1, [
            { offset: 0, color: targetColors[0] },
            { offset: 1, color: targetColors[1] }
          ],false)
        }
      }
    }
  ]
}
```

<br><br>

## 平移动画的实现
每个2s会将柱状图向左进行平移 每次平移就将一个新的柱状图进行展示

之前我们的商家销售量统计的横向柱状图是分页 **根据当前页码显示对应的一屏的数据**

而地区销售排行**则是一个元素一个元素的向左进行移动**

<br>

### 核心逻辑: dataZoom
我们要利用 区域缩放 dataZoom 的功能

**dataZoom效果:**  
区域缩放的效果就是 在x轴下面出现一个进度条 我们拖动进度条的时候 会对数据进行筛选

**<font color="#C2185B">也就是说我们可以每隔一段时间 移动dataZoom上的滑块</font>**

**我们可以通过 startValue 和 endValue 来控制区域缩放的起点值 和 终止值**

然后再通过定时器不断地改变起点值 和 终点值 就可以实现平移的动画效果了

```js
// 属性示例
{
  dataZoom: {
    // 展示缩放器
    show: true,
    // 在20条数据中展示 0 - 9, 10条数据
    startValue: 0,
    endValue: 9
  },
}

/*
比如柱形图中一共有20条数据 如果我们指定
- startValue: 0
- endValue: 9

则我们在柱形图表中只能看到 0 - 9, 10条数据
*/
```

也我们的平移效果也很简单, 我们可以将 startValue 和 endValue 设置为
- startValue: 1
- endValue: 10

这样整体还是展示10条数据 但是向后移动了一条

<br>

### 逻辑梳理
1. 在data配置项中定义好 startValue 和 endValue 的初始值
```js
dataZoom: {
  // 区域缩放的起点值
  startValue: 0,
  // 区域缩放的终点值
  endValue: 9
},
```

2. 在updateChart方法中配置 dataZoom配置项
```js
dataZoom: {
  // 展示缩放器
  show: false,
  // 在20条数据中展示 0 - 9, 10条数据
  startValue: this.dataZoom.startValue,
  endValue: this.dataZoom.endValue
},
```

3. 创建定义器方法 动态修改 startValue 和 endValue
```js
// 处理bar的平移效果的回调
startInterval() {
  if(this.timer) clearInterval(this.timer)
  this.timer = setInterval(() => {
    this.dataZoom.startValue++
    this.dataZoom.endValue++

    // 边界判断
    if (this.dataZoom.endValue > this.detailData.length - 1) {
      // 设置为初始值
      this.dataZoom.startValue = 0
      this.dataZoom.endValue = 9
    }

    // 修改数据后 我们要修改图表让它发生变化
    this.updateChart()
  }, 5000)
},
```

4. 我们在获取完数据getData 后调用该定时器方法
```js
// 获取数据
async getData() {
  
  ...

  // 在获取数据之后我们再开始bar的平移效果
  this.startInterval()
},
```

<br><br>

## 分辨率适配
1. 标题文字的大小
2. 柱的宽度
3. 柱的圆角

<br>

### 整体代码:
```vue
<script>
import {defineComponent} from 'vue'
// 引入主题
import chalk from "../assets/theme/chalk"
export default defineComponent({
  name: "Rank",
  data() {
    return {
      chart: null,
      detailData: null,
      dataZoom: {
        // 区域缩放的起点值
        startValue: 0,
        // 区域缩放的终点值
        endValue: 9
      },
      timer: null
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener("resize", this.screenAdapter)
    this.screenAdapter()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    window.removeEventListener("resize", this.screenAdapter)
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chart, chalk)
      const initOps = {
        // 标题相关
        title: {
          text: "▎地区销售排行",
          left: "5%",
          top: "3%",
          textStyle: {
            fontSize: 30
          }
        },
        // 坐标轴相关
        grid: {
          // 位置相关配置
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "13%",
          // left等位置的基准是包含y轴文字的 可以有效防止内容溢出
          containLabel: true
        },
        // 提示框
        tooltip: {
          show: true,
          // 移入到坐标轴的时候显示提示框
          trigger: "axis",
          // 鼠标移入到坐标轴时展示的样式
          axisPointer: {
            // hover上去的时候是线条
            type: "line",
            // 线条的样式
            lineStyle: {
              width: 66,
              color: "#2D3443"
            },
            // 调整提示框的层级 将它调整为0
            z: 0
          }
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
          }
        ]
      }
      this.chart.setOption(initOps)

      // 给图表绑定移入 移出事件 停止定时器 和 开启定时器
      this.chart.on("mouseover", () => {
        clearInterval(this.timer)
      })
      this.chart.on("mouseout", () => {
        this.startInterval()
      })
    },
    // 获取数据
    async getData() {
      const { data: res } = await this.$http({
        url: "/api/rank"
      })
      // 对返回的数据进行排序
      res.sort((a, b) => b.value - a.value)
      this.detailData = res
      /*
        [
          { name: "广东", value: 230 },
          { name: "福建", value: 213 },
        ]
      */
      this.updateChart()

      // 在获取数据之后我们再开始bar的平移效果
      this.startInterval()
    },
    // 处理bar的平移效果的回调
    startInterval() {
      if(this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.dataZoom.startValue++
        this.dataZoom.endValue++

        // 边界判断
        if (this.dataZoom.endValue > this.detailData.length - 1) {
          // 设置为初始值
          this.dataZoom.startValue = 0
          this.dataZoom.endValue = 9
        }

        // 修改数据后 我们要修改图表让它发生变化
        this.updateChart()
      }, 5000)
    },
    updateChart() {
      // name组成的数组 做为 类目轴 的数据
      const xAxisData = this.detailData.map(item => item.name)
      // value组成的数组 做为 series.data 的数据
      const seriesData = this.detailData.map(item => item.value)

      // 追加数据到chart
      const dataOps = {
        xAxis: {
          data: xAxisData
        },
        // 配置数据缩放 dataZoom
        dataZoom: {
          // 展示缩放器
          show: false,
          // 在20条数据中展示 0 - 9, 10条数据
          startValue: this.dataZoom.startValue,
          endValue: this.dataZoom.endValue
        },
        series: [
          {
            data: seriesData,
            // 控制每个bar的颜色
            itemStyle: {
              color: param => {
                /*
                param: {
                  borderColor:
                  color:
                  data:
                  value:
                  dataIndex:
                  name:
                }
                */
                // 不同阶段的数值呈现不同的颜色
                const colors = [
                  ["#a8930b", "#4fdef7"],
                  ["#2E72BF", "#23E5E5"],
                  ["#5052EE", "#23E5E5"],
                ]

                let targetColors = null
                if (param.value > 300) {
                  targetColors = colors[0]

                // 相当于 value > 200 && value <= 300
                } else if (param.value > 200) {
                  targetColors = colors[1]
                } else {
                  targetColors = colors[2]
                }

                return new this.$echarts.graphic.LinearGradient(0,0,0,1, [
                  { offset: 0, color: targetColors[0] },
                  { offset: 1, color: targetColors[1] }
                ],false)
              }
            }
          }
        ]
      }
      this.chart.setOption(dataOps)
    },
    screenAdapter() {
      const baseSize = this.$refs.chart.offsetWidth / 100 * 3.6
      const adapterOps = {
        title: {
          textStyle: {
            fontSize: baseSize
          },
        },
        series: [
          {
            barWidth: baseSize,
            itemStyle: {
              barBorderRadius: [baseSize / 2, baseSize / 2, 0, 0],
            }
          }
        ]
      }
      this.chart.setOption(adapterOps)
      this.chart.resize()
    }
  }
})
</script>

<template>
  <div class="common-container">
    <!-- chart容器 -->
    <div class="common-chart" ref="chart"></div>
  </div>
</template>

<style scoped lang="scss">

</style>
```

<br><br>

# 热销商品占比 (饼图)
1. 我们可以点击饼图的 < > 箭头按钮 来达到类别的切换
2. 当我们移入到饼图上的一个部分的时候 提示框中呈现出 该分类的子类分的数据占比情况 比如
  - 裤装分类
    - 工装裤: 40%
    - 阔腿裤: 20%
    - 牛仔裤: 10%

3. 饼图的模块会呈现出3级分类的数据
  - 点击 < > 箭头按钮达到一级分类的切换
  - 二级分类在图例的位置做呈现
  - 三级分类在饼图的提示框中做呈现

![热销商品占比](./imgs/热销商品占比.png)

<br>

## 图表基本功能实现

### 饼图所需要的数据结构为
```js
const data = [
  { name: "淘宝", value: 11231 },
  { name: "京东", value: 22673 },
  { name: "唯品会", value: 6123 },
  { name: "聚美优品", value: 6700 },
  { name: "1号店", value: 8989 },
]
```

<br>

### 数据的获取
从下面的数据结构中能看到
1. 整个数据结构是一个数组
2. 数组中有3个对象 每一对象都是
```js
{
  name: "一级类别",
  children: []  // 子类别(二级类别)
}
```

3. 承装子类别的是一个 children数组 里面是一个个对象 每个对象就是一个子类别 它的数据结构为
```js
{
  children: [
    name: "二级类别",
    value: "二级类别的值",
    children: [  // 三级类别
      name: "三级类别",
      value: "三级类别的值",
    ] 
  ]
}
```

<br>

**数据结构:**
```js
[
  {
    "name": "女装",
    "children": [
      {
        "name": "裙装",
        "value": 56202,
        "children": [
          {
            "name": "套装裙",
            "value": 10281
          },
          ...
        ]
      },
    ]
  },
  {
    "name": "手机数码",
    "children": [
      {
        "name": "手机",
        "value": 201023,
        "children": [
          {
            "name": "拍照手机",
            "value": 1023
          },
          ...
        ]
      },
    ]
  },
  {
    "name": "美妆护肤",
    "children": [
      {
        "name": "面部护肤",
        "value": 430291,
        "children": [
          {
            "name": "乳液/面霜",
            "value": 30291
          },
          ...
        ]
      },
      ...
    ]
  }
]
```

<br>

**动作分析:**
1. 我们会使用 < > 按钮 对一级分类进行切换
2. 饼图的各个部分展示的是根据二级分类的数据进行展示的
2. 我们鼠标移入到饼图的一个部分的时候 会在提示框里展示三级分类数据

<br>

我们会将三个分类数据中的一个数据 以饼图的方式先进行呈现 然后我们在通过按钮来切换 一级分类数据

<br>

### 数据的处理 & 图表的设置
```js
updateChart() {
  // 获取一级分类数据
  const firstCategory = this.detailData[this.currentIndex]

  // 一级类别的标题
  this.firstCategoryTitle = firstCategory.name

  // 饼图需要的数据: 一级类别 下的 用户展现饼图的二级类别的数据
  let secondCategory = firstCategory.children

  // 提示框内需要的数据: 二级类别 对应的 三级类别的数据
  let tertiaryCategory = []

  // 组织图例需要的数据 (图例的中的数据 要和饼图的数据的name值保持一致)
  let legendData = []

  // 处理数据 我们将 元素对象中的 children 拿掉 整理成饼图需要的数据结构
  secondCategory = secondCategory.map((item, index) => {
    // 组织提示框内需要的数据
    tertiaryCategory.push({
      name: item.name,
      data: item.children
    })
    // 组织图例需要的数据
    legendData.push(item.name)

    // 组织饼图需要的数据 (即使多了别的数据 对于呈现饼图不会有影响 但是可以传入给类似formatter的param.data中)
    return {
      name: item.name,
      value: item.value,
      // 多点别的不会有影响
      haha: "hehe"
    }
  })

  // 饼图只需要配饰series就可以了好像
  const updateOps = {
    // 配置平涂需要的需要
    series: [
      {
        data: secondCategory
      }
    ],
    // 配置图例
    legend: {
      data: legendData
    },
    // 提示框:
    tooltip: {
      show: true,
      trigger: "item",
      formatter: param => {
        // param.name 就是二级类别中的名字 比如 裤装
        // param.percent 是百分比
        const { data } = tertiaryCategory.find(item => param.name === item.name)
        let template = ""
        data.forEach(item => {
          template += `
            ${item.name}: ${item.value * 0.01} %
          `
        })

        return template
      }
    }
  }

  this.chart.setOption(updateOps)
},
```

<br><br>

## 切换数据的实现
我们会在实例上定义 currentIndex: 0 我们通过点击按钮动态的切换这个值 就可以实现不同类别的数据展示

```js
// 因为我们在处理数据的时候 直接使用的 0
const firstCategory = this.detailData[0]
↓
const firstCategory = this.detailData[动态]
↓
const firstCategory = this.detailData[currentIndex]
```

<br>

**html结构:**
```html
<template>
  <div class="common-container">
    <!-- chart容器 -->
    <div class="common-chart" ref="chart"></div>
    <!-- 两个箭头 -->
    <span
      class="iconfont arrow arrow-left"
      @click="moveHandler(false)"
    >&#xe6ef;</span>
    <span
      class="iconfont arrow arrow-right"
      @click="moveHandler(true)"
    >&#xe6ed;</span>
    <h3 class="first-category-title">{{firstCategoryTitle}}</h3>
  </div>
</template>

<style scoped lang="scss">
.arrow {
  position: absolute;
  transform: translateY(-50%);
  font-size: 50px;
  color: #fff;
  cursor: pointer;
}

.arrow-left {
  left: 8%;
  top: 50%;
}
.arrow-right {
  right: 8%;
  top: 50%;
}

.first-category-title {
  position: absolute;
  bottom: 8%;
  right: 10%;
  color: #fff;
  font-size: 30px;
}
</style>
```

<br>

**箭头的点击事件:**  
```js
// 箭头的点击事件: 对currentIndex来进行操作
moveHandler(flag) {
  if (flag) {
    this.currentIndex++
    if(this.currentIndex > this.detailData.length - 1) {
      this.currentIndex = 0
    }
  } else {
    this.currentIndex--
    if(this.currentIndex < 0) {
      this.currentIndex = this.detailData.length - 1
    }
  }

  // 调用下 updateChart 因为图表需要使用最新的index 变更内容
  this.updateChart()

  // 技巧: (++this.currentIndex) % this.detailData.length
}
```



<br><br>

## UI调整
1. 箭头和分类名称的颜色
2. 高亮状态显示文字
```js
// 饼图的位置控制
series: [
  {
    type: "pie",
    top: "25%",
    // 默认不展示提示文字
    label: {
      show: false
    },
    // 类似设置hover: 当饼图在高亮情况下使用的样式
    emphasis: {
      label: {
        show: true
      },
      labelLine: {
        show: false
      }
    } 
  }
],
```

3. 图例的形状和位置
```js
legend: {
  top: "15%",
  icon: "circle"
}
```

4. 工具框的提示 (展示3级分类数据 各自占比) (提示框中的换行使用的是 br)
```js
updateChart() {
  // 获取一级分类数据
  const firstCategory = this.detailData[this.currentIndex]

  // 一级类别的标题
  this.firstCategoryTitle = firstCategory.name

  // 饼图需要的数据: 一级类别 下的 用户展现饼图的二级类别的数据
  let secondCategory = firstCategory.children

  /*
  提示框内需要的数据: 二级类别 对应的 三级类别的数据
  let tertiaryCategory = []

  本意是遍历secondCategory数组 来将三级数据拿出来给提示框组件使用
  而提示框组件中我们会使用 formatter函数 它内部的参数 param

  param.data 就能拿到我们交给 series.data 中的数据 而它里面的children就是三级分类需要的数据
  */


  // 组织图例需要的数据 (图例的中的数据 要和饼图的数据的name值保持一致)
  let legendData = secondCategory.map(item => item.name)

  /*
  原来以为饼图要是想显示 只能是如下格式
  {
    name: "",
    value: ""
  }

  但是现在才知道 饼图需要的数据只要有 name 和 value 就可以 但也不限制多了其它的数据
  {
    name: "",
    value: "",
    children: []
  }

  所以 就不用如下的组织数据的方法了 本意是将 元素对象中的 children 拿掉 整理成饼图需要的数据结构
  但是发现不需要

  secondCategory = secondCategory.map((item, index) => {
    console.log(item)
    // 组织提示框内需要的数据 (这里不用这么做)
    tertiaryCategory.push({
      name: item.name,
      data: item.children
    })
    // 组织图例需要的数据
    legendData.push(item.name)

    // 组织饼图需要的数据
    return {
      name: item.name,
      value: item.value,
    }
  })
  */


  // 饼图只需要配饰series就可以了好像
  const updateOps = {
    // 配置平涂需要的需要
    series: [
      {
        data: secondCategory
      }
    ],
    // 配置图例
    legend: {
      data: legendData
    },
    // 提示框:
    tooltip: {
      show: true,
      trigger: "item",
      formatter: param => {
        console.log(param)
        // param.name 就是二级类别中的名字 比如 裤装
        // param.percent 是百分比

        /*
        我们通过 param.data 获取3集分类的数据
        const { data } = tertiaryCategory.find(item => param.name === item.name)
        */

        // 获取三级分类的数据
        const tertiaryCategory = param.data.children

        // 计算出所有三级分类数值的总和才能计算出百分比
        const total = tertiaryCategory.reduce((pre, curr) => pre + curr.value, 0)
        let template = ""

        tertiaryCategory.forEach(item => {
          template += `
            ${item.name}: ${ parseInt(item.value / total * 100) } % <br>
          `
        })

        return template
      }
    }
  }

  this.chart.setOption(updateOps)
},
```

<br><br>

## 分辨率适配
1. 标题文字的大小
2. 饼图的大小 (饼图的大小是通过 半径 raduis 来控制的)
```js
// 适配回调
screenAdapter() {
  this.baseSize = this.$refs.chart.offsetWidth / 100 * 3.6
  const adapterOps = {
    title: {
      textStyle: {
        fontSize: this.baseSize
      }
    },
    series: [
      {
        // 控制饼图的大小
        radius: this.baseSize * 5,
        // 饼图的位置 是根据圆心点设置的
        center: ["50%", "53%"]
      }
    ],
    legend: {
      // 控制图例的宽度
      itemWidth: this.baseSize / 2,
      itemHeight: this.baseSize / 2,
      // 间隔
      itemGap: this.baseSize / 2,
      // 文字大小
      textStyle: {
        fontSize: this.baseSize / 2
      }
    }
  }
  this.chart.setOption(adapterOps)
  this.chart.resize()
}
```

3. 图例的大小
4. 箭头和分类名称的大小
```html
<template>
  <div class="common-container">
    <!-- chart容器 -->
    <div class="common-chart" ref="chart"></div>
    <!-- 两个箭头 -->
    <span
      class="iconfont arrow arrow-left"
      :style="{fontSize: baseSize * 1.5 + 'px'}"
      @click="moveHandler(false)"
    >&#xe6ef;</span>
    <span
      class="iconfont arrow arrow-right"
      :style="{fontSize: baseSize * 1.5 + 'px'}"
      @click="moveHandler(true)"
    >&#xe6ed;</span>
    <h3
      class="first-category-title"
      :style="{fontSize: baseSize + 'px'}"
    >{{firstCategoryTitle}}</h3>
  </div>
</template>
```

<br><br>

# 库存与销量 (环形饼图)

![环形饼图](./imgs/环形饼图.png)

<br>

1. 环形饼图上的颜色分为两个部分 有颜色的是商品的销量信息 灰色部分表示商品的库存信息

2. 圆环的正中心会呈现出商品名称 和 它对应的销量值

3. 该模块一共有10个商品 还是采用分页形式 一次性的展示出5个商品的信息 然后过指定时间后 展示下一组的信息

<br><br>

## 需要做的为
1. 通用的代码结构 和 流程
2. 图表基本功能的实现
3. UI调整
4. 切换动画
5. 分辨率适配

<br><br>

## 数据结构
一共10条数据
```js
[
  // stock: 库存, sales: 销量
  { name: "iphone11", stock: 2310, sales: 2103 },
  { name: "iphone12", stock: 1100, sales: 2200 },
]
```

<br><br>

## 图表基本功能的实现
1. 数据的获取 
2. 数据的处理
3. 图表的设置

<br>

### 数据的处理

**1. 数据结构相关**  
我们页面上有5个圆环图, 这5个圆环图是通过饼图实现的 既然有5个饼图 那么在series.data数组中就需要有5个对象 

每一个对象都是一个饼图

饼图的所需要的数据结构可以是如下 并不需要name属性
```js
[
  {
    // name: 也可以不需要 但name是提示文字的值 所以有时候是需要加上的
    value: 
  }
]
```

<br>

**2. 分屏展示相关**  
既然我们一屏要展示5个数据 那么我们先展示前5个数据

<br>

**3. 圆环图的设置**  
我们在series的每个对象下 配置 radius 属性 如果我们给该属性两个值 则可以指明 外圆 和 内圆的半径


<br>

**4. 饼图的位置**  
我们屏幕上看到的是5环的形状 说明每个饼图的中心点的坐标都不一样

```js
series: [
  {
    type: "pie",
    // 原型图配置
    radius: [内圆半径, 外圆半径],
    // 控制中心点坐标
    center: [x轴坐标, y轴坐标]
  }
]
```

<br>

**代码部分:**
```js
updateChart() {
  // 获取前5条数据
  const partialData = this.detailData.slice(0, 5)

  // 5个环形图的中心点坐标
  const centers = [
    ["18%", "40%"],
    ["50%", "40%"],
    ["82%", "40%"],
    ["34%", "75%"],
    ["66%", "75%"],
  ]

  // 5个饼图 每个饼图都是一个对象 组织每个饼图的series.data
  const pieData = partialData.map((item, index) => {
    return {
      type: "pie",
        // 环形配置 配置内外圆半径
      radius: [110, 100],
      // 控制中心点坐标
      center: centers[index],

      label: {
        show: false
      },

      /*
        饼图数据包含两部分 一部分是库存 一部分是销量
        data中有两个对象 一个代表销量 一个代表库存
      */
      data: [
        // 饼图所需要的数据结构中可以没有name
        {
          value: item.sales
        },
        {
          value: item.stock
        },
      ]
    }
  })
  const dataOps = {
    series: pieData
  }
  this.chart.setOption(dataOps)
  this.chart.resize()
},
```

<br><br>

## UI调整
### 1. 主题的使用

<br>

### 2. 标题的位置
```js
// 标题相关配置
title: {
  text: "▎库存和销量分析",
  left: "5%",
  top: "3%",
  textStyle: {
    fontSize: 30
  }
},
```

<br>

### 3. 鼠标动画的移除 : hoverAnimation
当我们鼠标移入到环上的时候 圆环有一个过渡效果 这个过渡效果是我们不想要的

<br>

### 4. 指示线移除
```js
const pieData = partialData.map((item, index) => {
  return {
    type: "pie",

    ...

    // 取消鼠标移入到饼图时的动画效果
    hoverAnimation: false,

    // 指示线的移除
    labelLine: {
      show: false
    },

    ... 
  }
})
```

<br>

### 5. 圆环内文字的提示
圆环内部会显示商品的名称 和 对应的销量数据

<br>

**圆环内的文字:**  
它其实就是饼图的提示文字 也就是label 只不过我们需要改变label的位置而已

**注意:**  
饼图中的数据格式为 其中name部分就是 提示文字的值
```js
{
  name: 
  value:
}
```

1. series.data配置项中指明name的值
2. 配置label配置项 让提示文字在圆中展示

```js
const pieData = partialData.map((item, index) => {
  return {
    type: "pie",

    ... 

    // 提示文字相关: 改变其位置到圆环中心
    label: {
      // center 饼图专属值
      position: "center"
    },

    data: [
      {
        // 销量的部分是需要提示文字的(也就是name的值)
        name: item.name + "\n" + item.sales,
        value: item.sales
      },
      {
        value: item.stock
      },
    ]
  }
})
```

<br>

### 6. 颜色设置
这个部分设置两个区域的颜色
- 库存环形部分的颜色 - 灰颜色
- 销量环形部分的颜色 - 渐变性的颜色 (五个圆 五种渐变)

我们在 series.data 数组的对象中 配置 itemStyle 

```js
series: [
  data: [
    // 饼图所需要的数据结构中可以没有name
    {
      // 销量的部分是需要提示文字的(也就是name的值)
      name: item.name + "\n" + item.sales,

      value: item.sales,

      itemStyle: {
        color: new this.$echarts.graphic.LinearGradient(0,1,0,0, [
          {offset: 0, color: pieLinearColors[index][0]}, {offset: 1, color: pieLinearColors[index][1]}
        ], false)
      }
    },
    {
      value: item.stock,

      itemStyle: {
        color: "#333843"
      }
    },
  ]
]
```

<br><br>

## 切换动画
我们的数据一共有10个 也就是10个圆环 我们现在只展示了其中的5个圆环, 我们要分成两屏来展示

1. data配置项中声明 currentIndex: 0
2. updateChart中定义 start 和 end 索引, 用于截取数据源中的数据
```js
 updateChart() {

  const start = this.currentIndex * 5
  const end = (this.currentIndex + 1) * 5

  // 获取前5条数据
  const partialData = this.detailData.slice(start, end)

  ...

 }
```

3. 然后我们循环控制 currentIndex
4. startInterval要调用updateChart
```js
startInterval() {
  if(this.timer) clearInterval(this.timer)
  this.timer = setInterval(() => {
    this.currentIndex++
    if (this.currentIndex > 1) {
      this.currentIndex = 0
    }

    // 更改完currentIndex之后 我们需要调用updateChart()
    this.updateChart()
    }, 5000)
},
```

5. 请求回来数据后 getData 的最后调用 startInterval
6. 组件销毁前 关闭定时器

7. 给图表绑定鼠标移入移出事件

<br><br>

## 分辨率适配
1. 标题文字的大小
2. 圆环半径
3. 圆环文字

```html
<script>
import {defineComponent} from 'vue'
// 引入主题
import chalk from "../assets/theme/chalk"

export default defineComponent({
  name: "Stock",
  data() {
    return {
      chart: null,
      detailData: null,
      timer: null,
      // 分屏显示: 当前显示数据的页数
      currentIndex: 0
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener("resize", this.screenAdapter)
    this.screenAdapter()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.screenAdapter)
    clearInterval(this.timer)
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chart, chalk)
      const initOps = {
        // 标题相关配置
        title: {
          text: "▎库存和销量分析",
          left: "5%",
          top: "3%",
        },
      }
      this.chart.setOption(initOps)

      // 给图表绑定 鼠标移入移出的事件
      this.chart.on("mouseover", () => {
        clearInterval(this.timer)
      })

      this.chart.on("mouseout", () => {
        this.startInterval()
      })
    },
    async getData() {
      const { data: res } = await this.$http({
        url: "/api/stock"
      })
      this.detailData = res
      this.updateChart()

      // 有数据之后 就要调用定时器方法
      this.startInterval()
    },
    updateChart() {

      const start = this.currentIndex * 5
      const end = (this.currentIndex + 1) * 5

      // 获取前5条数据
      const partialData = this.detailData.slice(start, end)

      // 5个环形图的中心点坐标
      const centers = [
        ["18%", "40%"],
        ["50%", "40%"],
        ["82%", "40%"],
        ["34%", "75%"],
        ["66%", "75%"],
      ]

      const pieLinearColors = [
        ["#4FF778", "#0BA82C"],
        ["#E5DD45", "#E8811C"],
        ["#E8821C", "#E55455"],
        ["#5052EE", "#AB6EE5"],
        ["#23E5E5", "#2E728F"],
      ]

      // 5个饼图 每个饼图都是一个对象 组织每个饼图的series.data
      const pieData = partialData.map((item, index) => {
        return {
          type: "pie",
          // 环形配置 配置内外圆半径 !!!!!!!!!! 注释调这行比较好 让屏幕尺寸适配的时候 跟着adapterData中的设置来
          // radius: [100, 110],
          
          // 控制中心点坐标
          center: centers[index],

          // 取消鼠标移入到饼图时的动画效果
          hoverAnimation: false,

          // 提示线相关
          labelLine: {
            show: false
          },

          // 提示文字相关: 改变其位置到圆环中心
          label: {
            // center 饼图专属值
            position: "center",
            // 调节标签文本的颜色,
            color: pieLinearColors[index][0]
          },

          /*
            饼图数据包含两部分 一部分是库存 一部分是销量
            data中有两个对象 一个代表销量 一个代表库存
          */
          data: [
            // 饼图所需要的数据结构中可以没有name
            {
              // 销量的部分是需要提示文字的(也就是name的值)
              name: item.name + "\n\n" + item.sales,
              value: item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0,1,0,0, [
                  {offset: 0, color: pieLinearColors[index][0]}, {offset: 1, color: pieLinearColors[index][1]}
                ])
              }
            },
            {
              // 第二个数组对象不要设置name 如果设置了name该值也会被当做这标签本文展示在圆环中
              // name: "haha",
              value: item.stock,
              itemStyle: {
                color: "#333843"
              }
            },
          ]
        }
      })
      const dataOps = {
        series: pieData
      }
      this.chart.setOption(dataOps)
    },
    startInterval() {
      if(this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.currentIndex++
        if (this.currentIndex > 1) {
          this.currentIndex = 0
        }

        // 更改完currentIndex之后 我们需要调用updateChart()
        this.updateChart()
       }, 5000)
    },
    screenAdapter() {
      const baseSize = this.$refs.chart.offsetWidth / 100 * 3.6

      // 内外圆半径
      const innerRadius = baseSize * 3
      const outerRadius = baseSize * 2.75

      const adapterOps = {
        title: {
          textStyle: {
            fontSize: baseSize
          }
        },
        series: [
          // 5个对象就表示5个圆环
          { type: "pie", radius: [outerRadius, innerRadius], label: { fontSize: baseSize / 2 } },
          { type: "pie", radius: [outerRadius, innerRadius], label: { fontSize: baseSize / 2 } },
          { type: "pie", radius: [outerRadius, innerRadius], label: { fontSize: baseSize / 2 } },
          { type: "pie", radius: [outerRadius, innerRadius], label: { fontSize: baseSize / 2 } },
          { type: "pie", radius: [outerRadius, innerRadius], label: { fontSize: baseSize / 2 } },
        ],
      }

      this.chart.setOption(adapterOps)
      this.chart.resize()
    }
  }
})
</script>

<template>
  <div class="common-container">
    <!-- chart容器 -->
    <div class="common-chart" ref="chart"></div>
  </div>
</template>

<style scoped lang="scss">

</style>
```

<br><br>

# Websocket (基于 ws)
比如我们一般的项目都是 前台向后台请求数据 展示图表

这种操作有一定的问题 就是一旦数据在后台发生变化, 这种变化不能够及时通知给前端 让前端进行图表的更新

**所以使用http的方式并不能保证数据更新的实时性**

<br><br>

## Websocket的基本使用
依赖包
```s
npm i ws
```

<br><br>

## 后台相关
1. 创建 websoket 服务端 对象
2. 监听事件
3. 发送数据

<br>

### 实现步骤
我们首先会创建 websocket服务端的对象, 在创建对象的时候 我们需要为其绑定端口号


当我们创建完服务端的socket对象后 就需要完成如下的两件事
1. 等待客户端的连接 
2. 等待和客户端进行数据的交互

<br>

```js
const WebSocket = require("ws")

// 创建 websocket 服务器对象
const wss = new WebSocket.Server({
  port: 3333
})

// 监听 来自客户端的连接
wss.on("connection", client => {

  // client: 客户端连接的socket对象
  console.log("有客户端进行连接", client)


  // 接收数据: 监听 客户端 是否向 服务端 发送数据 当有数据到服务端的时候 触发回调
  client.on("message", msg => {
    // 过来的msg可能是buf
    console.log("客户端发送数据过来了", msg.toString())
  })


  // 发送数据: 通过 client socket对象 将服务器的数据推送给客户端
  client.send("服务器的数据")

})
```

<br>

### wss身上的属性

**wss.clients:**  
获取所有处于连接状态的客户端, 类型为client数组

<br><br>

## 前台相关
1. 创建 websocket 对象 (创建时需要指明连接哪一个服务器的哪一个端口)  
在前端使用websocket是不需要安装包的 该对象由window提供

2. 监听事件
  - 连接成功的事件 ws.onopen
  - 接收数据事件 ws.onmessage
  - 关闭连接事件 ws.onclose (比如服务端关闭了连接)

3. 前端 -> 后台发送数据 ws.send

<br>

### 前端代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
</head>
<body>

  <button id="conn">连接服务端</button>
  <br>
  <button id="send">发送数据给服务端</button>
  <br>
  <div>
    从服务端接收的数据如下: <span id="text-area"></span>
  </div>
<script>
  const connBtn = document.querySelector("#conn")
  const sendBtn = document.querySelector("#send")
  const textArea = document.querySelector("#text-area")

  let ws = null
  connBtn.addEventListener("click", () => {
    // 创建 websocket 连接 指明连接到哪里
    ws = new WebSocket("ws://localhost:8082")

    // 连接成功时的回调函数
    ws.addEventListener("open", () => {
      console.log("连接服务器 成功了")
    })

    // 连接 失败 或 关闭 的回调函数
    ws.addEventListener("close", () => {
      console.log("连接服务器 失败了")
    })

    // 接收数据: e.data
    ws.addEventListener("message", e => {
      console.log("来自服务器的数据", e.data)
      textArea.innerHTML = e.data
    })
  })

  // 向服务器发送数据
  sendBtn.addEventListener("click", () => {
    ws.send("客户端的数据")
  })
</script>
</body>
</html>
```

<br><br>

# 使用 Websocket 改造项目

## 修改后端功能
1. 创建 websocket_service.js 文件, 处理所有关于websocket的代码
  - 创建 websocket.server 服务端对象 并绑定端口
  - 监听事件
    - connection
    - message

  - 将监听事件的代码放到一个函数中 并将这个函数导出

2. 服务器端 接收 数据字段 约定 (约定前后端交互格式)

3. 服务器端 发送 数据字段 约定 (约定前后端交互格式)

<br>

### websocket_service.js 相关
该js文件的作用就是
1. 创建websocket.server对象
2. 调用listen方法 开始监听连接的客户端的message事件

<br>

**app.js**
```js
// 因为 webscoket 的监听方法
const { listen } = require("./service/websocket_service")

// 开启 webscoket 监听 监听客户端的连接, 当某一个客户端连接成功之后 就会对这个客户端进行message事件的监听
listen()
```

<br>

**websocket_service.js**  
前端传送的数据类型为buf 我们需要通过 msg.toString(["UTF-8"]) 来进行转换 utf-8可选
```js
/*
  创建 WebSocket 对象 用于主动向客户端推送数据

  疑问:
    后台有两个端口?
    1. 正常后台程序的端口 8081
    2. WebSocket监听的端口 8082

  回答:
    我们使用 websocket 当后台了 所以之前的 koa 相关就没有用了
*/

const WebSocket = require("ws")
// 创建websocket服务端对象
const wss = new WebSocket.Server({
  port: 8082
})


// 服务端开启Websocket监听: 将监听事件的相关逻辑封装到 listen 方法中, 只有执行了listen函数 才能执行websocket的连接 和 数据的接收
function listen() {
  // 监听客户端的连接
  wss.on("connection", client => {
    // client: 客户端连接的socket对象
    console.log("有客户端进行连接", client)


    // 接收数据: 监听 客户端 是否向 服务端 发送数据 当有数据到服务端的时候 触发回调
    client.on("message", msg => {
      // 前端过来的数据是 buf
      console.log("客户端发送数据过来了", msg.toString())

      // 发送数据: 通过 client socket对象 将服务器的数据推送给客户端
      client.send("服务器的数据")
    })

  })
}

module.exports = { listen }
```

<br>

### 前后端数据字段的约定
下面的图体现了 多个客户端 和 一个服务端 进行websocket的连接 每个客户端都保持着 与 服务端的长连接

<br>

![前后台结构](./imgs/前后台结构.png)

<br>

对于张三 李四 王五的浏览器 都有可能想要获取图表的数据 他们都会发送请求 告诉服务器 说 "我要图表的数据"

<br>

**服务器端 接收 数据字段 约定:**  
前端发送到服务器的数据格式为:
```js
{
  action: "getData",
  socketType: "trendData",
  chartName: "trend",
  value: ""
}
```

- action: 代表某项行为 可选值
  - getData: 代表获取图表数据 (场景: 客户端向服务器要图表数据)

  - fullScreen: 代表产生了全屏事件 (场景: 各个客户端联动的效果 需要通过websocket来实现, 比如A客户端点击了全屏按钮 BC客户端同样需要全屏事件, 所以websocket会将该事件发送给每一个保持长连接的客户端)

  - themeChange: 代表产生了主题切换的事件 (场景: 联动主题切换)

- socketType: 业务的模块类型 代表前端响应函数的标识(客户单请求A表的数据, 服务器将A表的数据响应给客户端, 客户端由哪个响应函数来处理这次响应回来的数据, 就是由socketType标识的处理函数 来进行处理) 可选值:
  - trendData
  - sellerData
  - mapData
  - rankData
  - hotData
  - stockData
  - fullScreen
  - themeChange

- chartName: 图表的名称 (告诉服务器我要获取哪一张图表的数据, 该字段的作用就是后台读取数据的标识) - **如果是主题切换的事件不用传递该值, 因为主题切换时所有的组件都要切换 而全屏的获取数据要标识出是哪个图表**

- value: 该字段主要是针对 fullScreen 和 themeChange 这两个事件, 比如发生了全屏事件 但是是非全屏还是全屏 就要通过value来指明
  - 全屏事件: boolean true全屏 false非全屏
  - 主题切换事件: chalk | vintage



<br>

**服务器端 发送 数据字段 约定:**  

**情况1: 接收到 action 为 getData 时**  
该情况是浏览器要获取某张图表的数据, 逻辑为:
1. 取出数据中 chartName 字段
2. 拼接json文件路径
3. 读取该文件的内容
4. 在接收到的数据基础上 增加 data 字段

```js
{
  action: "getData",
  socketType: "trendData",
  chartName: "trend",
  value: "",
  data: 从文件读取出来的json文件的内容
}
```

<br>

**情况2: 接收到 action 不为 getData 时**  
该情况我们只需要原封不动的将从客户端接收到的数据 转发给每一个处于长连接状态的客户端

```js
// 该数据结构是客户端发送过来的 然后转发给其它的客户端
{
  action: "getData",
  socketType: "trendData",
  chartName: "trend",
  value: true,
}
```

<br><br>

## 服务器 websocket 相关代码:
```js
const { join } = require("path")
const { getFileJsonData } = require("../utils/file_utils")
/*
  创建 WebSocket 对象 用于主动向客户端推送数据

  疑问:
    后台有两个端口?
    1. 正常后台程序的端口 8081
    2. WebSocket监听的端口 8082
*/

const WebSocket = require("ws")
// 创建websocket服务端对象
const wss = new WebSocket.Server({
  port: 8082
})


// 服务端开启Websocket监听: 将监听事件的相关逻辑封装到 listen 方法中, 只有执行了listen函数 才能执行websocket的连接 和 数据的接收
function listen() {
  // 监听客户端的连接
  wss.on("connection", client => {
    // client: 客户端连接的socket对象
    console.log("有客户端进行连接")


    // 接收数据: 监听 客户端 是否向 服务端 发送数据 当有数据到服务端的时候 触发回调
    client.on("message", async msg => {

      /*
        该回调说明 客户端发送数据过来了 我们要在这里完成如下的判断
        1. action: getData -> 读取图标数据 响应会客户端
        2. action: 非getData -> 将客户端发送的消息 直接转发给其它客户端
      */

      // 将客户端传递过来的数据 转换为对象 注意msg为buf 所以我们将它转为字符串
      const param = JSON.parse(msg.toString())
      if (param.action === "getData") {
        /*
        1. 取出数据中 chartName 字段
        2. 拼接json文件路径
        3. 读取该文件的内容
        4. 在接收到的数据基础上 增加 data 字段
        */

        let filePath = `../data/${param.chartName}.json`
        // 绝对路径
        filePath = join(__dirname, filePath)

        // 获取图表数据
        const ret = await getFileJsonData(filePath)

        // 响应回客户端, 增加data字段
        param.data = ret
        client.send(JSON.stringify(param))

      } else {
        // 原封不动的将所接收到的数据转发给每一个处于连接状态的客户端
        // wss.clients 为 处于连接的每一个客户端, msg.toString()我们发往客户端的最好也是字符串
        wss.clients.forEach(client => client.send(msg.toString()))
      }
    })

  })
}

module.exports = listen
```

<br><br>

## 修改前端功能
1. 创建 websocket_client.js 文件 
  - 创建 websocket 连接
  - 向服务器数据的发送
  - 接收服务器发送过来的数据

2. 组件的改造: http -> websocket

3. 优化: 对websocket的连接 数据的发送做优化

<br><br>

## websocket_client.js 相关
1. 定义类 SocketService 并定义成单例设计模式
2. 定义连接服务器的方法 connect
  - 负责对服务器的连接
  - 在main.js中调用此方法

3. 监听事件
4. 存储回调函数
5. 接收数据的处理
6. 定义发送数据的方法
7. 挂载socketservice对象到vue原型上

<br>

### 定义类 SocketService 并定义成单例设计模式
创建一个类的单例（Singleton）实例通常有以下几个原因: 

<br>

**节省资源:**  
使用单例模式可以确保一个类只有一个实例对象存在, 避免了重复创建对象的开销, 节省了系统资源。

<br>

**全局访问点:**  
单例模式可以提供一个全局访问点, 使得其他对象可以方便地访问该实例对象, 从而共享数据或调用其方法。

<br>

**保持一致状态:**   
在某些情况下, 需要确保一个类只有一个实例对象, 以保持对象的状态一致性。使用单例模式可以限制只能创建一个实例对象, 避免了状态的不一致性。

<br>

**控制实例化:**   
单例模式可以对实例化过程进行控制, 确保实例化的对象满足特定的条件或约束。

在上述代码中, SocketService 类被设计为单例模式, 通过静态方法 Instance 来获取该类的唯一实例。这样做可能是为了确保整个应用程序中只有一个 WebSocket 连接对象, 从而实现全局访问和共享状态。

<br>

**实现方式:**  
- 静态方法中的this是类本身
- 实例方法中的this是类的实例对象
```js
export  default class SocketService {
  // 单例设计模式
  static instance = null

  /*
  getter属性
    在 JavaScript 中，类的静态方法中的 this 关键字指向类本身 而不是类的实例对象
    静态方法是直接通过类名调用的，而不需要创建类的实例
  */
  static get Instance() {
    if(!this.instance) {
      this.instance = new SocketService()
    }

    return this.instance
  }
}
```

<br>

### 定义连接服务器的方法 connect
创建的connect方法 会在main.js文件中进行调用

```js
// 引入websocketjs文件
import WebSocketService from "@/utils/websocket_client"

// 对服务端进行 websocket 连接
WebSocketService.Instance.connect()
```

```js
export  default class SocketService {
  // 单例设计模式
  static instance = null

  static get Instance() {
    if(!this.instance) {
      this.instance = new SocketService()
    }

    return this.instance
  }

  // websocket对象
  ws = null

  // 定义连接服务器的方法:
  connect() {
    // 判断浏览器是否支持websocket
    if (!window.WebSocket) {
      console.log("您的浏览器不支持websocket")
      return
    }

    this.ws = new WebSocket("ws://localhost:8082")

    // 监听连接成功的事件
    this.ws.onopen = () => {
      console.log("连接服务端 成功 了")
    }

    this.ws.onclose = () => {
      console.log("连接服务端 失败 了")
    }

    this.ws.onmessage = e => {
      const param = e.data
      console.log("从服务器获取到的数据: ", param)
    }
  }
}
```

<br>

### 存储回调函数
上面的代码中 我们创建了 connect 方法 里面监听了很多事件
- open
- close
- message

当浏览器得到由服务器发送过来的数据的时候 会执行 message 事件的回调

```js
this.ws.onmessage = e => {
  const param = e.data
  console.log("从服务器获取到的数据: ", param)
}
```

我们可以在该回调中获取服务器过来的数据 但是websocket_client拿到数据后 并没有用

真正需要数据的是每一个图表的组件 它们才会使用到服务器发送过来的图表数据 对图表进行更新

如果我们在 message回调中 可以将数据传递给各个组件 这样每个图表组件就可以完成图表的更新

<br>

**怎么才能在 websocket_client 模块中 将获取到的数据 给各个组件呢?**  

事先先将每一个组件的某个处理数据的方法 存储到当前的 websocket_client 模块中 

一旦我们得到了由服务端给我们的数据之后 我们再调用我们已经存储起来的方法 就可以将数据传递给每一个组件了

<br>

```js
class SocketService {

  ...

  // 创建存储各个组件处理数据的方法
  callBackMapping = {}

  // 注册组件处理数据的方法
  registerCallBack(socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 移除注册的指定方法
  unRegisterCallBack(socketType) {
    this.callBackMapping[socketType] = null
  }

  ...
}

```

<br>

### 接收到数据之后的处理:
我们在 message 回调中会接受到服务器响应回的数据 我们需要在接收到后 要根据响应数据中的 socketType 来决定调用哪一个上面步骤中 存储在 callBackMapping 中的回调函数

```js
// 定义连接服务器的方法:
connect() {
  // 判断浏览器是否支持websocket
  if (!window.WebSocket) {
    console.log("您的浏览器不支持websocket")
    return
  }

  this.ws = new WebSocket("ws://localhost:8082")

  // 监听连接成功的事件
  this.ws.onopen = () => {
    console.log("连接服务端 成功 了")
  }

  this.ws.onclose = () => {
    console.log("连接服务端 失败 了")
  }

  this.ws.onmessage = e => {
    // 获取服务器发送过来的数据
    let param = JSON.parse(e.data)
    const { action, socketType} = param

    if (socketType && this.callBackMapping[socketType]) {
      
      // 如果action是getData说明某一个组件想要获取图表数据
      if (action === "getData") {
        let { data } = param
        data = JSON.parse(data)

        // 利用注册在类中的回调 将数据交给前端组件
        this.callBackMapping[socketType].call(this, data)

      } else if (action === "fullScreen") {

      } else if (action === "themeChange") {

      }
    }
  }
}

```

<br>

### 挂载socketservice对象到vue原型上
我们定义在 websocket_client 模块中的方法 是有如下的方法 **是要在组件内部来进行调用的**

- registerCallBack
- unRegisterCallBack
- send

我们将该模块挂载到vue原型上是为了方便在各个组件内部使用 websocket_client 模块

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import * as echarts from "echarts"

// 导入全局样式文件
import "@/assets/css/global.scss"

// 引入字体图标文件
import "@/assets/font/iconfont.css"

// 引入websocketjs文件
import WebSocketService from "@/utils/websocket_client"
// 对服务端进行 websocket 连接
WebSocketService.Instance.connect()

Vue.config.productionTip = false

// 将 echarts 挂载到 vue 原型对象上
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

// 将 websocket_client 对象 挂载到vue原型对象上
Vue.prototype.$socket = WebSocketService.Instance

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

<br>

### websocket_client 整体逻辑:
```js
/*
1. 定义类 SocketService 并定义成单例设计模式
2. 定义连接服务器的方法 connect
3. 监听事件
4. 存储回调函数
5. 接收数据的处理
6. 定义发送数据的方法
7. 挂载socketservice对象到vue原型上
*/

export  default class SocketService {
  // 单例设计模式
  static instance = null

  /*
  getter属性
    在 JavaScript 中，类的静态方法中的 this 关键字指向类本身 而不是类的实例对象
    静态方法是直接通过类名调用的，而不需要创建类的实例
  */
  static get Instance() {
    if(!this.instance) {
      this.instance = new SocketService()
    }

    return this.instance
  }

  // websocket对象
  ws = null

  // 创建存储各个组件处理数据的方法
  callBackMapping = {}

  // 注册组件处理数据的方法
  registerCallBack(socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 移除注册的指定方法
  unRegisterCallBack(socketType) {
    this.callBackMapping[socketType] = null
  }

  // 定义连接服务器的方法:
  connect() {
    // 判断浏览器是否支持websocket
    if (!window.WebSocket) {
      console.log("您的浏览器不支持websocket")
      return
    }

    this.ws = new WebSocket("ws://localhost:8082")

    // 监听连接成功的事件
    this.ws.onopen = () => {
      console.log("连接服务端 成功 了")
    }

    this.ws.onclose = () => {
      console.log("连接服务端 失败 了")
    }

    this.ws.onmessage = e => {

      let param = JSON.parse(e.data)

      const { action, socketType} = param

      if (socketType && this.callBackMapping[socketType]) {

        if (action === "getData") {
          // 说明每一个组件想要获取图表数据
          let { data } = param
          data = JSON.parse(data)

          // 当前对象调用的函数
          this.callBackMapping[socketType].call(this, data)

        } else if (action === "fullScreen") {

        } else if (action === "themeChange") {

        }
      }
    }
  }

  // 定义向服务器发送数据的方法
  send(data) {
    this.ws.send(JSON.stringify(data))
  }
}
```

<br><br>

## 前端组件的改造
1. **created** 中向 websocket_client模块处理处理逻辑的回调函数

2. destroyed 中 取消注册的回调函数

3. 在原来获取数据的地方 改为 由websocket推送消息到websocket.server 的方式 获取数据
```
- 组件推送消息到websocket.server
  - websocket.server读取数据响应回前端
    - 前端通过websocket_client处理后将数据发送给组件的created中的处理函数
      - 该created中的处理函数可以将获取到的数据 绑定到data配置项中
```

<br>

**1. created逻辑:**  
进入到 trend组件的时候 会先注册一个回调用于接收websocket返回的数据
```js
// 注册回调函数
created() {
  // getData方法做为注册的回调
  this.$socket.registerCallBack("trendData", this.getData)
},
```

<br>

**2. mounted向websocket服务端发送消息**  
目的是为了从websocket后台获取数据
```js
mounted() {
  this.initChart()

  // 向websocket发送消息
  this.$socket.send({
    action: "getData",
    socketType: "trendData",
    chartName: "trend",
  })

  ...
},
```

<br>

**3. 销毁组件的时候 取消注册的回调**
```js
beforeDestroy() {
  ...
  // 取消注册的回调函数
  this.$socket.unRegisterCallBack("trendData")
},
```

<br>

**4. 通过getData来获取websocket响应回的数据**
```js
async getData(data) {
  /*
    http版时的原逻辑
    const { data: res } = await this.$http({
      url: "/api/trend"
    })
    this.detailData = res
    this.updateChart()
  */
  this.detailData = data
  this.updateChart()
},
```

<br>

### 可能出现的问题
```s
error in mounted hook: invalidStateError: failed to execute send on websocket still in connectiong state
```

我们在main.js中就启动了服务端的连接
```js
// 引入websocketjs文件
import WebSocketService from "@/utils/websocket_client"

// 对服务端进行 websocket 连接
WebSocketService.Instance.connect()
```

连接是需要时间的 有一种可能就是在还没有连接成功之前 组件就进行了加载 一旦组件进行了加载就会调用 mounted中的 .this.$socket.send 方法

而此时此刻我们可能还没有连接成功 我们不能往一个正在连接中的websocket发送数据

<br><br>

## 优化:
1. 重发数据的机制
2. 断开重连的机制

<br>

### 重发数据的机制
```js
class SocketService {

  ...

  // 标识是否连接成功
  connected = false

  // 记录重试的次数
  sendRetryCount = 0


  connect() {
    // 判断浏览器是否支持websocket
    if (!window.WebSocket) {
      console.log("您的浏览器不支持websocket")
      return
    }

    this.ws = new WebSocket("ws://localhost:8082")


    // 监听连接成功的事件
    this.ws.onopen = () => {
      console.log("连接服务端 成功 了")
      // 在不同状态下 修改 connected 的值
      this.connected = true
    }

    this.ws.onclose = () => {
      console.log("连接服务端 失败 了")
      // 在不同状态下 修改 connected 的值
      this.connected = false
    }

    ... 
  }


  // sendRetryCount 作用当重试的次数越多 则延迟的时间越长
  send(data) {
    // 判断此时此刻有没有连接成功
    if (this.connected) {

      // 当发送成功的时候 sendRetryCount 重置为0
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendRetryCount++
      // 进行延迟的重试操作
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
```

<br>

### 断开重连的机制
如果我们将服务器断开了 客户端应该有重连的机制

我们就需要先知道服务器什么时候断开 onclose 事件会在连接服务器失败 或 链接成功后服务器关闭的情况下执行

所以我们在这个事件中做重连的机制

```js
class SocketService {

  ...

  // 记录重新连接服务器的尝试的次数
  connectRetryCount = 0

  ...

  // 定义链接服务器的方法:
  connect() {
    
    ...

    // 监听链接成功的事件
    this.ws.onopen = () => {
      console.log("连接服务端 成功 了")
      this.connected = true
      this.connectRetryCount = 0
    }

    // 连接服务器失败 或 链接成功后服务器关闭的情况 该回调也会得到执行
    this.ws.onclose = () => {
      console.log("连接服务端 失败 了")
      this.connected = false

      // 每次连接失败都要进行++
      this.connectRetryCount++

      // 再次重连
      setTimeout(() => {
        this.connect()
      }, this.connectRetryCount * 500)

    }

    ...
  }
}

```

<br><br>

### websocket_client.js完整逻辑:
```js
/*
1. 定义类 SocketService 并定义成单例设计模式
2. 定义链接服务器的方法 connect
3. 监听事件
4. 存储回调函数
5. 接收数据的处理
6. 定义发送数据的方法
7. 挂载socketservice对象到vue原型上
*/

export  default class SocketService {
  // 单例设计模式
  static instance = null

  /*
  getter属性
    在 JavaScript 中，类的静态方法中的 this 关键字指向类本身 而不是类的实例对象
    静态方法是直接通过类名调用的，而不需要创建类的实例
  */
  static get Instance() {
    if(!this.instance) {
      this.instance = new SocketService()
    }

    return this.instance
  }

  // websocket对象
  ws = null

  // 创建存储各个组件处理数据的方法
  callBackMapping = {}

  // 标识是否连接成功
  connected = false

  // 记录重试的次数
  sendRetryCount = 0
  // 记录重新连接服务器的尝试的次数
  connectRetryCount = 0

  // 注册组件处理数据的方法
  registerCallBack(socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 移除注册的指定方法
  unRegisterCallBack(socketType) {
    this.callBackMapping[socketType] = null
  }

  // 定义链接服务器的方法:
  connect() {
    // 判断浏览器是否支持websocket
    if (!window.WebSocket) {
      console.log("您的浏览器不支持websocket")
      return
    }

    this.ws = new WebSocket("ws://localhost:8082")

    // 监听链接成功的事件
    this.ws.onopen = () => {
      console.log("连接服务端 成功 了")
      this.connected = true
      this.connectRetryCount = 0
    }

    // 连接服务器失败 或 链接成功后服务器关闭的情况 该回调也会得到执行
    this.ws.onclose = () => {
      console.log("连接服务端 失败 了")
      this.connected = false

      // 每次连接失败都要进行++
      this.connectRetryCount++

      // 再次重连
      setTimeout(() => {
        this.connect()
      }, this.connectRetryCount * 500)

    }

    this.ws.onmessage = e => {

      let param = JSON.parse(e.data)

      const { action, socketType} = param

      if (socketType && this.callBackMapping[socketType]) {

        if (action === "getData") {
          // 说明每一个组件想要获取图表数据
          let { data } = param
          data = JSON.parse(data)

          // 当前对象调用的函数
          this.callBackMapping[socketType].call(this, data)

        } else if (action === "fullScreen") {

        } else if (action === "themeChange") {

        }
      }
    }
  }

  // 定义向服务器发送数据的方法
  send(data) {
    // 判断此时此刻有没有连接成功
    if (this.connected) {
      // 发送成功的时候 该值 重置为0
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendRetryCount++
      // 进行延迟的重试操作
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
```

<br><br>

# 组件合并
1. 创建 ScreenPage 并配置路由
2. ScreenPage里创建布局 和 样式
3. 注册组件 并将组件置于合适的位置
4. 调整原有的组件样式

<br><br>

# 全屏切换
我们在每一个图标的右上角放一个缩放的按钮 点击该按钮就可以完成全屏切换的操作

1. 调整布局 和 样式
2. 全屏状态数据的定义
3. 权柄状态样式的定义
4. 全屏图表的处理
5. 点击事件的处理
6. 联动效果

<br>

### 调整布局 和 样式
下面的结构是图表的容器 和 图表右上角的 全屏按钮 的图标

**要点:**  
我们给每一个组件都绑定了 ref ``<Trend ref="trend"></Trend>`` 处理 ref的值 要和 chartName 保持一致

这样方便我们通过chartName来获取子组件

```html
<!-- 动态追加全屏样式 -->
<div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen' : '']">
  <!-- 销量趋势图表 -->
  <Trend ref="trend"></Trend>
  <!-- 全屏的图表按钮  -->
  <div class="resize">
    <!-- 根据全屏状态的数status 来决定图标的样式 -->
    <span 
      @click="changeSize('trend')" 
      :class="['iconfont', fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
  </div>
</div>
```

<br>

**怎么来控制一个图表是全屏的状态?**  
我们通过css来做, 我们可以图表组件的父容器 动态的加上如下的全屏样式
```css
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}
```

<br>

### 全屏状态数据的定义
我们首页面中一共有6个图表 在同一时间只能有一个图表可以处于全屏状态 所以我们要通过数据的方式 来维护到底是哪一个图表进行全屏的展示

```js
// 定义每一个图表的全屏状态
data() {
  return {
    fullScreenStatus: {
      trend: false,
      seller: false,
      map: false,
      rank: false,
      hot: false,
      stock: false
    }
  } 
}
```

<br>

### 全屏按钮的点击事件的处理 + 联动处理
上面我们实现了全屏的功能 vue里就是根据一个变量 修改变量 就是修改全屏的状态

那么我们只要在全屏按钮的回调中 修改boolean值就可以了
```js

created () {
  // 注册接收到数据的回调函数
  this.$socket.registerCallBack('fullScreen', this.recvData)
  this.$socket.registerCallBack('themeChange', this.recvThemeChange)
},
destroyed () {
  this.$socket.unRegisterCallBack('fullScreen')
  this.$socket.unRegisterCallBack('themeChange')
},

methods: {
  changeSize (chartName) {
    // 1.改变fullScreenStatus的数据
    // this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
    // 2.需要调用每一个图表组件的screenAdapter的方法
    // this.$refs[chartName].screenAdapter()
    // this.$nextTick(() => {
    //   this.$refs[chartName].screenAdapter()
    // })
    
    // 改变fullScreenStatus的数据
    const targetValue = !this.fullScreenStatus[chartName]

    // 将数据发送给服务端
    this.$socket.send({
      action: 'fullScreen',
      socketType: 'fullScreen',
      chartName: chartName,
      value: targetValue
    })
  },


  // 接收到websocket回传给我们的消息后 通过该事件回调处理全屏的逻辑
  recvData (data) {
    // 取出是哪一个图表需要进行切换
    const chartName = data.chartName

    // 取出, 切换成什么状态
    const targetValue = data.value

    this.fullScreenStatus[chartName] = targetValue

    // 我们需要手动调用 子组件图表的screenAdapter() 事件
    this.$nextTick(() => {
      // 通过 chartName 来找到对应的子组件 重新进行适配
      this.$refs[chartName].screenAdapter()
    })
  },
}
```

<br>

**客户端的websocket文件:**  
```js
/*
1. 定义类 SocketService 并定义成单例设计模式
2. 定义链接服务器的方法 connect
3. 监听事件
4. 存储回调函数
5. 接收数据的处理
6. 定义发送数据的方法
7. 挂载socketservice对象到vue原型上
*/

export  default class SocketService {
  // 单例设计模式
  static instance = null

  /*
  getter属性
    在 JavaScript 中，类的静态方法中的 this 关键字指向类本身 而不是类的实例对象
    静态方法是直接通过类名调用的，而不需要创建类的实例
  */
  static get Instance() {
    if(!this.instance) {
      this.instance = new SocketService()
    }

    return this.instance
  }

  // websocket对象
  ws = null

  // 创建存储各个组件处理数据的方法
  callBackMapping = {}

  // 标识是否连接成功
  connected = false

  // 记录重试的次数
  sendRetryCount = 0
  // 记录重新连接服务器的尝试的次数
  connectRetryCount = 0

  // 注册组件处理数据的方法
  registerCallBack(socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 移除注册的指定方法
  unRegisterCallBack(socketType) {
    this.callBackMapping[socketType] = null
  }

  // 定义链接服务器的方法:
  connect() {
    // 判断浏览器是否支持websocket
    if (!window.WebSocket) {
      console.log("您的浏览器不支持websocket")
      return
    }

    this.ws = new WebSocket("ws://localhost:8082")

    // 监听链接成功的事件
    this.ws.onopen = () => {
      console.log("连接服务端 成功 了")
      this.connected = true
      this.connectRetryCount = 0
    }

    // 连接服务器失败 或 链接成功后服务器关闭的情况 该回调也会得到执行
    this.ws.onclose = () => {
      console.log("连接服务端 失败 了")
      this.connected = false

      // 每次连接失败都要进行++
      this.connectRetryCount++

      // 再次重连
      setTimeout(() => {
        this.connect()
      }, this.connectRetryCount * 500)

    }

    this.ws.onmessage = e => {
      let param = JSON.parse(e.data)

      const { action, socketType} = param

      if (socketType && this.callBackMapping[socketType]) {

        if (action === "getData") {
          // 说明每一个组件想要获取图表数据
          let { data } = param
          data = JSON.parse(data)

          // 当前对象调用的函数
          this.callBackMapping[socketType].call(this, data)

        // 全屏 和 主题切换
        } else if (action === "fullScreen") {
          this.callBackMapping[socketType].call(this, param)
        } else if (action === "themeChange") {
          this.callBackMapping[socketType].call(this, param)
        }
      }
    }
  }

  // 定义向服务器发送数据的方法
  send(data) {
    // 判断此时此刻有没有连接成功
    if (this.connected) {
      // 发送成功的时候 该值 重置为0
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendRetryCount++
      // 进行延迟的重试操作
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
```

<br><br>

# 主题切换
1. 我们将主题在 main.js 中导入 然后挂载到Vue的原型对象上
```js
// json对象
import chalk from "./assets/theme/chalk"
import vintage from "./assets/theme/vintage"

Vue.prototype.$echartsTheme = {}
Vue.prototype.$echartsTheme.chalk = chalk
Vue.prototype.$echartsTheme.vintage = vintage
```

2. 我们将当前使用的**主题名**称存储在 vuex 中, 我们切换主题只需要切换state中保存的theme就可以了
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    theme: 'chalk'
  },

  // 修改state中的数据
  mutations: {
    changeTheme (state) {

      // 切换逻辑
      if (state.theme === 'chalk') {
        state.theme = 'vintage'
      } else {
        state.theme = 'chalk'
      }
    }
  },
})
```

3. 我们在创建echarts实例的时候 传入主题配置
```js
computed: {
  ...mapState(["theme"])
},

methods: {
  async initChart() {

    // this.theme 是 state中的主题名
    // this.$echartsTheme 是 Vue原型上保存的主题 我们其实也可以放在vuex里面
    this.chart = this.$echarts.init(this.$refs.chart, this.$echartsTheme[this.theme])

    ... 
  }
}
```

5. 主页面绑定切换主题的事件
```js
handleChangeTheme () {
  // 修改VueX中数据
  // this.$store.commit('changeTheme')
  this.$socket.send({
    action: 'themeChange',
    socketType: 'themeChange',
    chartName: '',
    value: ''
  })
},

// 联动效果的话就要通过 websocket 了
recvThemeChange () {
  this.$store.commit('changeTheme')
}
```

6. 各个组件监听theme的变化 当发生变化后
  - 销毁当前的图表
  - 重新以最新的主题名称 **初始化图表对象**
  - 完成屏幕的适配
  - 更新图表的展示

```js
watch: {
  theme () {
    console.log('主题切换了')
    this.chart.dispose() // 销毁当前的图表
    this.initChart() // 重新以最新的主题名称初始化图表对象
    this.screenAdapter() // 完成屏幕的适配
    this.updateChart() // 更新图表的展示
  }
},
```

7. 特殊处理
  - 图表之外的样式更改
  - 定义 theme_utils.js 文件
    - 定义两个主题下 需要进行样式切换的样式数据
    - 使用属性绑定的方式控制样式
```js
// theme_utils.js
const theme = {
  chalk: {
    // 背景颜色
    backgroundColor: '#161522',
    // 标题的文字颜色
    titleColor: '#ffffff',
    // 左上角logo的图标路径
    logoSrc: 'logo_dark.png',
    // 切换主题按钮的图片路径
    themeSrc: 'qiehuan_dark.png',
    // 页面顶部的边框图片
    headerBorderSrc: 'header_border_dark.png'

  },
  vintage: {
    // 背景颜色
    backgroundColor: '#eeeeee',
    // 标题的文字颜色
    titleColor: '#000000',
    // 左上角logo的图标路径
    logoSrc: 'logo_light2.png',
    // 切换主题按钮的图片路径
    themeSrc: 'qiehuan_light.png',
    // 页面顶部的边框图片
    headerBorderSrc: 'header_border_light.png'
  }
}


// 返回主题对应的配置对象
export function getThemeValue (themeName) {
  return theme[themeName]
}


// computed: 使用在style上
commonContainer() {
  return {
    backgroundColor: getThemeValue(this.theme).itemColor
  }
},
```

8. 联动效果

<br><br>