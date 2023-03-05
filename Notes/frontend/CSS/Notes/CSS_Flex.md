家产100%继承
  - flex-basis  就是分配固定的家产数量。
  ```css 
    flex-basis则是指定了固定的分配数量，默认值是auto。如会忽略设置的同时设置width或者height属性
  ```

  - flex-grow   就是家产剩余家产仍有富余的时候该如何分配。
  ```css 
    flex-grow指定了容器剩余空间多余时候的分配规则，默认值是0，多余空间不分配。
  ```
  - flex-shrink 就是家产剩余家产不足的时候该如何分配。
  ```css 
    flex-shrink指定了容器剩余空间不足时候的分配规则，默认值是1，空间不足要分配。
  ```


### display: flex
当一个容器开启flex后 该容器就称之为flex容器 它的所有子元素自动成为容器成员 子元素也叫做"项目"

### 容器的属性
容器的属性一共有6个

### flex-direction
  决定主轴的方向（即项目的排列方向）。
```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。



### flex-wrap
默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

nowrap（默认）：不换行。
  - 所有的项目自动减少宽度 以至于容纳在一行

wrap：
  - 换行，第一行在上方。

wrap-reverse：
  - 换行，第一行在下方。



### flex-flow
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
```css
.box {
  flex-flow: row nowrap;
}
```


### justify-content
项目在主轴上的对齐方式。
```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

flex-start（默认值）：
  左对齐

flex-end：
  右对齐

center： 
  居中

space-between：
  两端对齐，项目之间的间隔都相等。

space-around：
  每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边- 框的间隔大一倍。


### align-items
定义项目在交叉轴上如何对齐。
```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

stretch（默认值）
  - 如果项目未设置高度或设为auto，将占满整个容器的高度。


### align-content
定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```


### 项目的属性

### order
定义项目的排列顺序。数值越小，排列越靠前，默认为0。
```css
.item {
  order: <integer>;
}
```


### flex-grow 1为开启伸展
定义项目的放大比例
伸展系数: 默认为0

默认效果: 
存在剩余空间，也不放大。

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间
如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。


### flex-shrink 0位关闭收缩
收缩系数: 默认值为1

默认效果:
如果空间不足，该项目将缩小。

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小


### flex-basis
定义了在分配多余空间之前，项目占据的主轴空间（main size）
浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。



### flex
flex属性是flex-grow, flex-shrink 和 flex-basis的简写
默认值为0 1 auto。后两个属性可选。
(不伸展 收缩)

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。


### align-self
align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。

默认值为auto
表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。


### flex 属性的解析

### 如果flex的属性值只有一个值，则：
  - 如果是数值，例如flex: 1，则这个1表示flex-grow
  ```css 
    此时flex-shrink和flex-basis的值分别是1和0%
 ```

  - 如果是长度值，例如flex: 100px，则这个100px显然指flex-basis，因为3个缩写CSS属性中只有flex-basis的属性值是长度值。
  ```css 
    此时flex-grow和flex-shrink都是1
 ```


### 如果flex的属性值有2个值，则：
则第1个值一定指flex-grow，第2个值根据值的类型不同表示不同的CSS属性

  - 如果第2个值是数值，例如flex: 1 2，则这个2表示flex-shrink
  ```css 
    此时flex-basis计算值是0%
 ```

  - 如果第2个值是长度值，例如flex: 1 100px，则这个100px指flex-basis
  ```css 
    此时flex-shrink使用默认值0。
 ```


### 如果flex的属性值有3个值，则：
如果flex的属性值有3个值，则这长度值表示flex-basis，其余2个数值分别表示flex-grow和flex-shrink。下面两行CSS语句的语法都是合法的，且含义也是一样的

----------

### 关键字属性值
### initial
初始值。flex:initial 等同于设置"flex: 0 1 auto"。
```css 
  flex-grow:0
  flex-shrink:1
  flex-basic:auto


  flex-grow: 0
      不会增长变大占据flex容器中额外的剩余空间

  flex-shrink:1
      会收缩变小以适合容器

  flex-basic:auto
      尺寸根据自身宽高属性进行调整
```


### auto
flex:auto 等同于设置"flex: 1 1 auto"。
```css 
  flex-grow:1
  flex-shrink:1
  flex-basic:auto


  flex-grow:
      子项会增长变大占据flex容器中额外的剩余空间

  flex-shrink:1
      会收缩变小以适合容器

  flex-basic:auto
      尺寸根据自身宽高属性进行调整
```


### none
flex:none 等同于设置"flex: 0 0 auto"。
```css 
  flex-grow:0
  flex-shrink:0
  flex-basic:auto


  flex-grow:
      子项会不会增长变大占据flex容器中额外的剩余空间

  flex-shrink:1
      不会收缩变小以适合容器

  flex-basic:auto
      尺寸根据自身宽高属性进行调整
```