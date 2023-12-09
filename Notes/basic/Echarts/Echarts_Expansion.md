# Vue3 + echarts
echarts.init返回的实例最好使用 markRaw 包裹下, 不然在resize的时候会报错
```js
const chartRef = markRaw(echarts.init())
```

<br>

# xAxis 和 yAxis 中的 time坐标轴类型的使用
正常来说坐标轴的类型 有如下的选项
- value
- category
- time
- log

我们上面使用的都是 category 下面我们说说当我们使用 time类型的要点

<br><br>

# series[0].encode属性
在 ECharts 中，encode 是用于配置数据和坐标轴的映射关系的选项之一。它允许你明确指定数据中哪些字段将映射到坐标轴的哪个维度上。

```js
series: [
{
  type: 'bar',
  name: 'showMainBar',
  xAxisIndex: 0,
  label: {
    show: true,
    position: 'right',
    fontSize: 15
  },
  encode: {
    x: 'thoughputActual',
    y: 'workerLabel'
  },
}
]
```

这段代码表示将图表的 x 轴映射到数据中的 thoughputActual 字段，而将 y 轴映射到数据中的 workerLabel 字段。

<br><br>

# dataset 中 的id
id的主要作用就是为了标识 起到唯一性的作用

dataset 中的 id 属性用于标识特定的数据集。一个图表可以包含多个数据集，每个数据集可以在图表中使用不同的方式。

通过使用 id，你可以告诉 ECharts 使用特定的数据集进行渲染。这对于在一个图表中同时展示多个不同来源或类型的数据非常有用。

dataset 是 ECharts 中用于管理数据的配置项之一，它的主要作用是将数据与图表的其他配置项解耦，提高图表的配置灵活性和复用性。