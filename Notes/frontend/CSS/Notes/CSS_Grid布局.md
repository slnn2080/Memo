### 总结
### 外部容器不用给规定的宽度和高度就是自适应布局

> 划分好布局后, 每个格子内的width到底是多少
<!-- 
    .container {
        width:600px;
        height:600px;
        margin:50px auto;
        border:1px solid;
        box-sizing: border-box;

        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
    }
    .item {
        width:100%;
        height:100%;
        background:cornflowerblue;
    }
 -->
<div class="container">
    <div class="item">1</div>
</div>

- item的宽度应该是100%才能占满一个格子的大小, 一个格子就是一个区域 占满这个区域得是100%


> 元素在容器内部怎么排列?
- grid-auto-flow:column;
- 默认是row 元素沿着行排列

> 元素在每个单元格内的对齐方式
- justify-items: center;
- align-items: center;

> grid区域在容器内的对齐方式
- justify-content:
- align-content

> 项目的属性
> 元素可以沿着切线对齐, 变相的随意调节元素的宽高
- 不能给元素设置固定的高宽 前提是auto
- 分竖线(起线 和 终线): 
- 分横线(起线 和 终线):
<!-- 
grid-column-start     左边框所在的垂直网格线
grid-column-end       右边框所在的垂直网格线
grid-row-start        上边框所在的水平网格线
grid-row-end          下边框所在的水平网格线 
-->

> 元素不按统一的样式排列 自己单独的排列方式:
- align-self
- justify-self

--------------------------------

### Grid布局 和 flex布局的区别
- Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。
- Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。

### Grid的基本概念
- 采用网格布局的区域，称为"容器"（container）
- 容器内部的子元素, 称为"项目"（item）。
<!-- 项目只能是容器的顶层子元素 -->


### Grid的行和列
- 容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）。
- 行和列的交叉区域，称为"单元格"（cell）。
<!-- 我的理解是这个就是用 线 来切割区域 形成单元格 -->

> n行有n + 1根水平网格线

> m列有m + 1根垂直网格线


### Grid的容器属性

> display: grid
- 指定一个容器采用网格布局。
> display: inline-grid;
- div是一个行内元素，该元素内部采用网格布局。
<!-- 
    注意:
    设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。
 -->

### 容器指定了网格布局以后，接着就要划分行和列
> grid-template-columns
- grid-template-columns属性定义每一列的列宽

> grid-template-rows 
- grid-template-rows属性定义每一行的行高

<!-- 
    .container {
        display: grid;
        grid-template-columns: 33.33% 33.33% 33.33%;
        grid-template-rows: 33.33% 33.33% 33.33%;
    }
 -->
> grid-template-rows: 后面的值有哪些属性
> repeat()
- 有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用repeat()函数，简化重复的值。
- 参数:
- 重复的次数
- 重复的值

- 按照排列顺序依次重复
<!-- 
    .container {
        display: grid;
        grid-template-columns: repeat(3, 33.33%);
        grid-template-rows: repeat(3, 33.33%);
    }
 -->

> 关键字 auto-fill
- 有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充。
<!-- 
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, 100px);
    }

    每列宽度100px，然后自动填充，直到容器不能放置更多的列。
 -->

> fr 关键字
- 为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。
<!-- 
    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    表示两个相同宽度的列。
 -->

- fr可以与绝对长度的单位结合使用，这时会非常方便。
<!-- 
    .container {
        display: grid;
        grid-template-columns: 150px 1fr 2fr;
    }

    第一列的宽度为150像素，第二列的宽度是第三列的一半。
 -->

> 关键字 minmax()
- 函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。
<!-- 
    grid-template-columns: 1fr 1fr minmax(100px, 1fr);

    minmax(100px, 1fr)表示列宽不小于100px，不大于1fr。
 -->

> 关键字 auto 
- 关键字表示由浏览器自己决定长度。
<!-- 
    grid-template-columns: 100px auto 100px;

    上面代码中，第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了min-width，且这个值大于最大宽度。
 -->

### 布局实例
<!-- 
    .wrapper {
        display: grid;
        grid-template-columns: 70% 30%;
    }
    上面代码将左边栏设为70%，右边栏设为30%。
 -->

- 传统的十二网格布局，写起来也很容易。
<!-- 
    grid-template-columns: repeat(12, 1fr);
 -->


### 间距
> grid-row-gap
- 设置行与行的间隔（行间距）

> grid-column-gap
- 设置列与列的间隔（列间距）

> grid-gap
- grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式，语法如下。
- 如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值。
<!-- 
    .container {
        grid-gap: 20px 20px;
    }

    grid-gap: <grid-row-gap> <grid-column-gap>;
 -->


### 区域内元素的排列方式
> grid-auto-flow
- 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行

- 这个顺序由grid-auto-flow属性决定，默认值是row，即"先行后列"。也可以将它设成column，变成"先列后行"。

<!-- 
    grid-auto-flow: row / column;
 -->

- 参数:
- row:  即"先行后列"
- column: "先列后行"
- row dense: 表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。
- column dense: 表示"先列后行"，并且尽量填满空格。


### 这个看资料把 坑
> grid-auto-columns
> grid-auto-rows


### 被切出来的区域里面 的 元素 的对齐方式
> justify-items
- 设置单元格内容的水平位置（左中右）
<!-- 
    start：对齐单元格的起始边缘。
    end：对齐单元格的结束边缘。
    center：单元格内部居中。
    stretch：拉伸，占满单元格的整个宽度（默认值）。
 -->

> align-items
- 设置单元格内容的垂直位置（上中下）
<!-- 
    start：对齐单元格的起始边缘。
    end：对齐单元格的结束边缘。
    center：单元格内部居中。
    stretch：拉伸，占满单元格的整个宽度（默认值）。
 -->

> place-items
- align-items属性和justify-items属性的合并简写形式。
<!-- 
    place-items: <align-items> <justify-items>;
 -->

### 被切出来的区域在 容器内部 的位置
> justify-content
- 是整个内容区域在容器里面的水平位置（左中右）
> align-content
- 整个内容区域的垂直位置（上中下）
> place-content
- place-content: <align-content> <justify-content>

- start     - 对齐容器的起始边框。
- end       - 对齐容器的结束边框。
- center    - 容器内部居中。
- stretch   - 项目大小没有指定时，拉伸占据整个网格容器。
- space-around  - 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
- space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
- space-evenly - 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

<!-- 
    .container {
        justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
        align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
    }
 -->




### 项目的属性
> grid-column-start     左边框所在的垂直网格线
> grid-column-end       右边框所在的垂直网格线
> grid-row-start        上边框所在的水平网格线
> grid-row-end          下边框所在的水平网格线
- 项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。
<!-- 
    .item-1 {
        grid-column-start: 2;
        grid-column-end: 4;
    }

    1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线
 -->

> span关键字
- 这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。
<!-- 
    .item-1 {
        grid-column-start: span 2;
    }

    有点像合并单元格
 -->

> 简写属性
> grid-column   grid-column-start和grid-column-end
> grid-row      grid-row-start属性和grid-row-end

<!-- 
    .item {
        grid-column: <start-line> / <end-line>;
        grid-row: <start-line> / <end-line>;
    }
 -->

> justify-self  设置单元格内容的水平位置（左中右）
> align-self    设置单元格内容的垂直位置（上中下）
> place-self    place-self: <align-self> <justify-self>;

<!-- 
    start：     对齐单元格的起始边缘。
    end：       对齐单元格的结束边缘。
    center：    单元格内部居中。
    stretch：   拉伸，占满单元格的整个宽度（默认值）
 -->