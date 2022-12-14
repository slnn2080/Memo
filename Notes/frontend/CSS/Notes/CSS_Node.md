### 知识收集:
> ./ ../ / 路径的书写方式
- ./  代表 当前目录
- ../ 代表 父级目录
- /   代表 根目录

- 在前端页面上 ./ 和 不写 是一样的 可以省略 都是当前目录
- 在node端上 不能省略 因为不写./ 就表示引用node-modules里面的模块

### 使用 content 属性修改该元素身上的标签属性的值
- content属性代表标签体内容
```html
<img src="../img/img1.png" class="logo" alt="logo">
```
```css
/* content属性就代表上面 img标签的标签体内容 */
.logo {
    /* 比如我们修改 src  */
    content: url(../img/img2.png)
}
```

----------------

### 语义化标签：
在网页中HTML用来负责网页的结构 所以在使用html标签时 应该关注的是标签的语义而不是它的样式
```html
    <hgroup>
        标题组 可以将一组 相关 的标题同时放入hgroup标签中
    </hgroup>

    <em>            语音语调加重
    <strong>        表示强调 内容重要！

    <blockquote>    块元素      长引用 引用的内容比较多的时候
    <q>             行内元素    短引用
```

----------------

### 网页的头部：
- 一个网页中可以有很多头部 定义文档或节的页眉
    <header></header>


### 网页的主体：
- 一个页面中只有一个
    <main></main>


### 网页的底部：
- 
    <footer></footer>


### 网页的导航
- 
    <nav></nav>


### 网页中独立的区块
- 
    <section></section>


### 网页中的独立的文章
- 
    <article></article>

- 用于定义一个独立的内容区块 比如一篇文章 一篇博客 一个帖子 论坛的一段用户评论 一篇新闻消息等
- article元素内可以嵌套其他元素 它可以有自己的头、尾、主体等内容。
- 使用时要特别注意内容的独立性 一般对于独立完整的内容才使用article元素 如果只是一段内容的话应该使用section元素。


### 网页的边栏：
- 用作文章的侧栏, 跟主体相关又不属于主体的内容 侧边栏
    <aside></aside>

- aside 的内容应该与 article 的内容相关。通常用来表现侧边栏或者标注框。以是与当前文章有关的相关资料、名词解释 等等


### 点击查看详情：
- 用来对显示在页面的内容做进一步骤解释
- 首先是`<details>`标签 里面接着是标题`<summary>` 这里面的内容一般简短 具有总结性 会展示在页面。
```html
<details>
    <summary>详细内容(点击后才能看到下面的结构)</summary>
    <h3>我是内容部分</h3>
    <p>我是内容部分的段落</p>
</details>
```
    
- 接着可以跟任意类型的HTML元素作为详情内容 这些内容需要在点击`<summary>`才会呈现。

> <details open> 属性   
当然 你也可以通过给`<details open>`标签设置open属性让它默认为展开状态。


**扩展注意: p元素中不能放任何块元素**

----------------

### 表格

> 合并列
- 下一个删掉 前一个标签内部写`colspan='2'`


> 合并行
- 下一个删掉 前一个标签内部写`rowspan='2'`


> 扩展:
- 如果表格中没有使用tbody而是直接使用tr 那么浏览器会自动创建一个tbody 并且将所有tr装进tbody中, 所以记住 *tr不是table的子元素 是tbody的子元素*

- 默认情况下 元素在td中是垂直居中的 可以通过vertical-align来设置垂直的对齐方式

---

> 表格样式
- 默认情况下 表格的外框 和 单元格的外框 都有各自的 border 属性 而且是不显示的

- 当我们给 表格 和 单元格 都设置成 border 属性后 会出现双重线的样式


> border-spacing: 10px;
- 指定表格的外框线 和 单元格的外框线 之间的距离

> border-collapse: collapse;
- 折叠 表格的外框线 和 单元格的外框线(只有一条线了) 


> 技巧:
- 表格隔行变色
```css
tr:nth-child(odd) {
    background-color:red;
}
```
----------------

### 内联框架 <iframe>
- 用于向当前页面中引入其它页面, *相当于插了一张图片一样*
- *注意*: 内联框架不会被搜索引擎去检查

> <iframe  frameborder="0">
- frameborder 值为 0 / 1  没有边框 / 有边框
```html
    <iframe 
        src="" 
        frameborder="0"
        width="number"
        height="number"
    ></iframe>  
```

- 应用场景:
- 创建导航菜单 点击按钮让内联框架里面展示不同的页面 相当于创建了一个内容区

---

> iframe标签 和 a标签组合使用步骤
- 效果描述:
- 当我们点击 <a> 链接的时候 链接的页面会在 iframe区域展示

- 1. 在<iframe name="view">标签中*使用name属性*
- 2. 在<a target="view" href>标签中利用 target属性指向iframe

```html
<section class="app">
<section class="nav-area">
    <ul>
    <li>
        <!-- 在a标签上定义 target 属性 -->
        <a target="view" href="./Hover.html">Hover页面</a>
    </li>
    <li>
        <a target="view" href="./model.html">Model页面</a>
    </li>
    </ul>
</section>

<!-- a点击的链接 会在 iframe 里面呈现 -->
<section class="content-area">
    <!-- 指定 name 属性 -->
    <iframe frameborder="0" name="view"></iframe>
</section>
</section>
```

----------------

### 音频 & 视频
- 音频兼容格式比较好的就是mp3
- 音视频文件引入时 默认情况下不允许用户自己控制播放停止的

> 音频
- *替换元素* 用来引入音频

> <audio src="" controls>
- 属性：
- controls    
    是否允许用户播放

- autoplay    
    音频文件是否自动播放 但是目前大部分浏览器都不会自动播放

- loop        
    音乐是否循环播放

- <source src> 是位于 <audio> 内部的一个标签
- 除了通过src来引入文件外 还可以通过source标签来指定文件的路径
- 通过这种方式引入的文件 可以加提示语句 也就是说支持这个标签的会显示播放器 不支持的会显示提示文字

- 可以支持多个文件 可以传入多种格式的文件 最终只会显示一个播放器 看哪个格式能用

```html
    <audio controls>
        对不起您的浏览器不支持播放音频 请升级浏览器
        <source src='.mp3'>
        <source src='.ogg'>
        <source src='.wav'>
    </audio>
```

- ie8中可以使用下面的标签引入音视频文件 会自动播放 (这个标签非常不好用)
    <embed src="" type="">

- 要点:
- 1. 这个标签必须指定 width height
- 2. type 用来指定文件格式的   *type="audio/video/mp3"*
- 3. 该标签写在 <audio> 标签的内部

- 解决兼容性问题 ie8中用embed 其他浏览器使用 audio
```html
    <audio controls>
        <!-- 可以支持多个文件 可以传入多种格式的文件 最终只会显示一个播放器 看哪个格式能用 -->
        <source src='.mp3'>      
        <source src='.ogg'>

        <!-- 前面有支持了到不到这里 -->
        <embed src="" type="">      
    </audio>
```

> 视频
<video src=""></video>


> object-fit
- 该属性指定元素的内容应该如何去适应指定容器的高度与宽度。
- 一般用于 img 和 video 标签，一般可以对这些元素进行保留原始比例的剪切、缩放或者直接进行拉伸等。

- 使用方式:
- 在 img 上使用 同时 img 要有 宽高 相当于设置了img的边界 然后使用 object-fit 控制图像
```html
<style>
  div {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    position: relative;
  }

  div img {
    width: 100%;
    height: 100%;

    object-fit: contain;
  }
</style>

<div>
  <img src="./src/assets/images/case.jpg" alt="" class="fit">
</div>
```

- fill
- 默认，不保证保持原有的比例，内容拉伸填充整个内容容器。

- contain
- 保持原有尺寸比例。内容被缩放。

- cover
- 保持原有尺寸比例。但部分内容可能被剪切。

- none
- 保留原有元素内容的长度和宽度，也就是说内容不会被重置。

- scale-down
- 保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。


> object-position
- object-position 属性一般与 object-fit一起使用，用来设置元素的位置。
```css
object-position: 50% 50%;
object-position: right top;
object-position: left bottom;
object-position: 250px 125px;
```


----------------

### 常用的选择器：

> 元素选择器：
- 可以根据标签名选择指定元素：
- 语法：
    标签 { }
    p{ } h1{ } div{ }


> id选择器：
- 根据我们元素的id属性值选择一个元素 因为id不能重复 只能选择一个元素
- 语法：
    #选择器的名字 { }
    #red{ }
    #name{ }


> 类选择器：
- class是所有标签中的一个属性 作用和id一样 不同的是同一页面 它可以用很多次可以重复使用 通过它来选择一组标签
- 语法：
    .选择器的名字 { }
    .red { }
    .name { }


- class还可以为同一元素使用多个class也可以 用空格来隔开
<p class=“red color></p>



> 通配选择器
- 选中页面中所有元素
- 语法：
    * { }

----------------

### 复合选择器

> 交集选择器 (当元素身上同时有它们的时候 样式才会生效)
- 选中同时符合多个条件的元素 希望元素满足多个条件的时候用它
- 语法： 
    selector1selector2selector3

```html
<style>
.content.bg {
    font-size: 20px;
}
</>

<!-- 只有当元素身上同时有交集选择器的时候 交集选择器的样式才会生效 -->
<div class="content bg">
    hello
</div>
```

**注意：**
- 复合选择器中 如果有元素选择器 必须元素选择器开头
```css
    /* div必须先开头 */
    div.red{
        font-size:30px;
    }
```


> 选择器分组（并集选择器）
- 同时选择多个选择器对应的元素
- 语法：
    selector1, selector2{};

----------------

### 关系选择器

> 子元素选择器：
- 选择指定父元素的指定子元素
- 语法：
    父元素>子元素
```css
    div > span {}
    div > p >span {}
```


> 后代元素选择器：   
- 选中指定元素内的指定后代元素
- 语法：祖先 后代
```css
    div span {}
```


> 兄弟元素选择器：
- 选择下一个兄弟 无论是 + 还是 ~ 选择的都是后面的

- 语法：
```css
    /* 
        前一个 + 下一个 
        选择p后面的span 是紧挨着的一个
    */
    p + span {}    //

    /* 
        前一个 ~ 后边的 
        选择p后面的span 所有的
    */
    p ~ span {}     
```

```html
<!-- 注意: 它们的关系是兄弟元素 -->
<p>p元素</p>
<span>1</span>
<span>2</span>
<span>3</span>
```

----------------

### 属性选择器：
- 是根据*标签内部的属性*来筛选内容 比如id class name title等等 任何属性都可以

> [属性名] { }                 
- 选择标签内部含有指定    属性名  的所有元素
```css
    /* 单独使用可以 一般情况下 还可以复合使用 */
    p[title] {
        color: red;
    }
```


> [属性名="属性值"]{ }
- 选择 指定属性名 和 属性值的所有元素
```css
[title="hello"] {
    color: red;
}
```


> [属性名^="属性值"]{ }
- ^是对 属性值 位置的筛选 前面的意思
- 指定属性名之后 选择 *以指定属性值开头的元素*
```css
[href^="http"] {
    color: red;
}
```

> [属性名*=属性值]{ }
- *是对属性值位置的筛选 任意的意思
- 指定属性名之后 选择 *指定属性值任意位置 的所有元素*


> [属性名$="属性值"]{ } 
- $是对 属性值 位置 的筛选 后面的意思
- 指定属性名之后 选择 *指定属性值结尾abc的元素* 


> [属性名~="属性值"]{ } 
- 指定属性名之后 选择 *指定属性值前是空格* 的所有元素


> [属性名|="属性值"]{ } 
- 指定属性名之后 选择 *指定属性值 或 指定属性值作为前缀* 的所有元素
<!-- 
    name='value'   或   name='value-a'
 -->

----------------

### 伪类选择器（前面带一个：） 和 伪元素选择器（前面带一个::）：

> 伪类选择器：
- 特点：
- 伪类用来描述一个元素的状态 比如第一个元素 被点击等等 它们的状态是什么
- 伪类一般情况下都是以冒号开头, 查找的是子元素

```html
    <ul>
        <li>第一行</li>
        <li>第二行</li>
        <li>第三行</li>
        <li>第四行</li>
        <li>第五行</li>
    </ul>
```

> :first-child { }
- 查找的是子元素 作为第一个的子元素
- 在当前的选择器中 查找第一个子元素为xx的元素  
```css
/* 第一个为li的子元素 */
ul li:first-child {
    background-color: red;
}
```

> :last-child { }
- 查找的是子元素 作为最后一个的子元素
- 在当前的选择器中 查找最后一个子元素为xx的元素  
```css
/* 最后一个为li元素 */
ul li:last-child {
    background-color: red;
}
```

**对 p:first-clild 的理解**
- 正确理解：  第一个为p的子元素
- 错误理解：  p下的第一个子元素


> :nth-child() { }
- 在子元素中查找 查找指定的子元素
```css
    /* n全选  偶数位  奇数位 */
    ul>li:nth-child(n, 2n/even, 2n+1/odd)
```

> :first-of-type {}
- 在同类型的元素中 查找第一个
- 在 同类型的子元素中 查找
```html
    <ul>
        <span>我是新加进来的</span>
        <li>第一行</li>
        <li>第二行</li>
        <li>第三行</li>
        <li>第四行</li>
        <li>第五行</li>
    </ul>
```


> :last-of-type {}
- 在同类型的元素中 查找最后一个


> :nth-of-type() {}
- 在同类型的元素中 查找任意位置的元素


> :not()
- 否定伪类
- 不包括指定的元素 将剩下的元素选中
```css
    ul>li:not(:nth-child(3)) {
        color:red;
    }
```

> :checked（选中状态伪类选择器）
- 匹配选中的复选按钮或者单选按钮表单元素

> :enabled（启用状态伪类选择器 ）
- 匹配所有启用的表单元素

> :disabled（不可用状态伪类选择器）
- 匹配所有禁用的表单元素

---

> 伪元素选择器：
- 伪元素表示页面中特殊的并不存在的元素（特殊的位置）

- 特点：
- 伪元素选择器用::开头

> ::first-letter  第一个字母
> ::first-line    第一行

> ::selection     选中状态
```css
    p::selection {
        background-color：red；
    }
```

> ::before        开始的位置 缝 那里
> ::after         最后的位置 缝 那里  
- 使用上面两个伪元素选择器要结合content使用

> :focus
- *在元素获得焦点时* 向元素添加特殊的样式。
```css
    <input type="text" id='inp' name='testFocus'>

    input[name^=test]:focus {
        background-color: #ff9292;
    }
```


> 超链接的伪类：
- 伪类是描述一些元素的状态 超链接的话都有什么样的状态?

- 1. 访问过
- 2. 未访问  访问过 和 没有访问过是由用户的历史记录来决定的

> 超链接的4种状态：
> :link     正常的链接  没访问过的链接
> :visited  用来表示访问过的链接
> :hover    鼠标移入特效   
> :active   鼠标点击的状态 点住别松手 看看 

> 思考：
- 假如我想给没访问过的链接加个红色怎么办？
- 可以用类选择器 但是这么加上了 链接的状态还跟颜色有关系么？ 一会访问过了后还是回是红色
```css
    a:link {
        color:red;
    }
```

----------------

### 继承
- 样式的继承 我们现实生活中 都有继承的情况 比如我们的富二代 富三代 在css中其实也有继承的现象

- 那什么叫做继承呢？ 我们给p元素 设置一个color 我们看看
```css
p {
    color: red
}
```

```html
    <P>
        我是一个p元素

        <!-- 这个span的颜色变成红色了 -->
        <span>我是p元素中的span元素</span>
    </P>

    <span>看看这个元素的颜色变化了么？</span>
```

- 这就是样式的继承 我们为一个元素设置样式 也会应用在它的后代元素中, *继承只会发生在后代元素中*

- 我们再举个例子
```css
p {
    color: red
}
```

```html
    <div>
        我是div
        <span>
            我是div中的span元素
                <em>我是div中的span的em元素</em>
        </span>
    </div>
```

- 我们给div设置颜色看看 发现div中的元素都发生了变化

- 继承的设置是为了方便我们的开发 假如没有继承会发生什么样的情况？
- 利用继承我们可以把共同的样式 设置到祖先元素中 这样我们设置一次就可以让所有的元素都具有该样式

**注意:**
- 背景相关的 布局相关的 都不会被继承

----------------
    
### 选择器的权重
- 我们先举个例子
```html
    <style>
        div {
            color:red;
        }

        .box1 {
            color:bule;
        }
    </style>

    <div  class="box1">我是一个div</div>
```

- 发生样式冲突时 应用哪个样式 是根据选择器的优先级决定的

> 优先级顺序
- 1. 内联                  1000
- 2. id                   100
- 3. class和伪类           10
- 4. 元素选择器             1
- 5. 通配选择器的样式是      0
- 6. 继承的样式没有优先级



> 比较优先级是 div.red & .red
- 需要将所有的选择器的优先级进行相加计算 最后看再看谁高
- 分组选择器是单独计算的 选择器的累加不会超过其最大的数量级

- 可以在某个样式后添加 *!important* 则该样式将获得最高的优先级 设置超过内联样式 最高优先级 但在开发中一定要慎用 尽量不用

----------------

### 单位
> 像素：
- 像素其实就是屏幕上的一个个小点
- 不同屏幕的像素大小是不同的 像素越小的屏幕 显示效果越清晰 所以同样的200px在不同的设备下显示的效果是不一样的

> 百分比：
- 也可以将属性值设置为*相对于其父元素属性的百分比* 设置百分比可以使子元素跟随父元素的改变而改变

> em
- 是相对于元素的字体大小来计算的
- 可以使用在任何地方 比如 div 的 width 和 height

    1em = 一个fontsize 一般默认是16px 那10em就是160像素

- em会根据字体大小的改变而改变
- 当元素身上有 font-size 属性的时候 会根据元素自身的font-size来决定em的大小
- 当元素身上没有 font-size 属性的时候 会默认使用 16px 做为em的大小

> rem
- rem是相对于根元素的字体大小计算的 em是相对于自身的字体大小 rem是相对于html的字体大小计算的
- 根元素也就是 html 的font-size属性

----------------
        
### 文档流

- 网页是一个多层的结构 一层落着一层 通过css可以为每一层设置样式 作为用户来讲 只能看到最上面的一层
- 最低层就叫做文档流 文档流就是网页的基础 我们所创建的元素 默认都是在文档流中排列的

    ------

    ------

    ------ 文档流


- 元素对于我们来讲主要有两个状态
- 1. 一个是在文档流中
- 2. 一个不在文档流中 叫做脱离文档流

---

> 元素在文档流中有什么特点：
> 块元素：
- 独占一行 如: div
- *默认宽度*是父元素的全部 会把父元素撑满
- *默认高度*是被内容撑开 或者说被子元素撑开   


> 行内元素：
- 行内元素不会独占一行 *只占自身大小*
- 行内元素在页面中左向右水平排列
- 它的高度和宽度是有多少字就是多高多宽

----------------

### 盒模型
- 非常重要的东西 跟布局相关 你要理解了盒模型后才能更好的布局
- 假如我的页面中有一个div 就意味着我要开始布局了 也就意味着 我要把我的div放到想放的位置
   
- 将元素设置为矩形的盒子后 布局就相当于摆盒子 我们的观念就是 每一个元素都是个盒子 每一个都有以下的几个部分组成

- 1. 内容区  content
- 元素中的所有子元素和文本内容都在内容区中 内容区大小由width和height两个属性决定

- 2. 内边距  padding

- 3. 边框  border
- 属于盒子边缘 设置边框至少要设置三个样式 

    border-width
    border-color
    border-style

- 边框的大小会影响到盒子的大小

- 4. 外边距  margin

----------------

### 边框 
- 我们先弄出个盒子 然后给它加上边框 上面说过吧 *边框是用来区分盒子里面和盒子外面的*
```css
    /* 四个方向边框的宽度 */
    border-width:10px;       
    border-width:10px 20px 30px 40px;
    border-width:10px 20px;
``` 

> border - 方向 - width
- border-top/bottom/left/right-width:10px;

- 注意：
- 其中 border-width可以不写 因为它有一个默认值 3个像素的样子

----------------

### 外边距
- 外边距不会影响盒子的可见框的大小 但是外边距会影响盒子的位置 
- 我们元素在页面中是按照自左向右排列 默认情况下

    如果设置 左和上的外边距 会移动自身
    如果设置 下和右的外边距 会移动其他元素

----------------

### 水平方向的布局       
- 元素水平方向的位置 元素在其父元素中水平方向的位置由以下几个属性共同决定

    margin-left
    border-left
    padding-left
    width
    padding-right
    border-right
    margin-right

- 一个元素在其父元素中 水平布局必须要满足以下的等式：

    margin-left + border-left + padding-left 
    + width + 
    padding-right + border-right + margin-right
    = 
    其父元素内容区的宽度 *必须满足*


- 我们看看inner现在的宽度是多少

    0 + 0 + 0 + 200 + 0 + 0 + 0 = 800

- 以上必须满足 如果相加结果使等式不成立 则成为过渡约束 则等式会自动调成

- 如果所有的值
    - 没有为auto的情况 则浏览器会*自动调整margin-right*的值使等式满足

- 这7个值中有三个值可以设置为auto
    width
    margin-left
    margin-right

    - 如果这几个值中有auto 则会*自动调整auto的那个值*以使等式成立
    - 如果一个宽度和一个外边距设置为auto *则宽度width会调整到最大 设置为auto的外边距会自动为0*

- *优先满足宽度* 调整外边距auto



> 技巧: 元素水平居中
- 如果将*两个外边距设置为auto* *宽度固定* 则会将外边距设置为相同的值
- 所以我们经常利用这个特点 来是一个元素在其父元素中水平居中

```css
div{
    width:100px;
    margin:0 auto;
}
```
   
----------------

### 垂直方向的布局     
- 默认情况下 *父元素的高度被内容撑开*
- 在父元素中设置overflow属性 来解决元素高度溢出的问题

> overflow:
- visible:      默认值 子元素会从父元素中溢出 在父元素外部显示
- hidden:       溢出的部分 将会被裁剪
- scroll:       生成两个滚动条 通过滚动条来查看完成的内容
- auto:         根据需要生成滚动条

- overflow-x;
- overflow-y;     这可以试验一下

----------------

### 外边距的折叠 
- 相邻的垂直方向的外边距会发生重叠现象

>规则
> 兄弟元素:
- 兄弟元素之间的相邻垂直外边距 会取两者之间的较大值
- 特殊情况
    相邻的外边距一正一负 取和
    相邻的外边距都是负值 取绝对值 大的

- 兄弟元素之间的外边距重叠 对于开发是有利的 不需要处理
                        

> 父子元素:
- 父子元素之间的相邻外边距 子元素的会传递给父元素（上外边距）
- 子元素设置了上外边距 其实也是给父元素设置了上外边距 所以会同时发生变化

- 父子外边距的折叠 我们必须要处理 会影响到布局

> 解决方式:
- 1. 可以不用margin改成padding 然后再减去父元素的高度
```css
/* 父盒子 */
.box1 {
    width: 400px;
    height: 200px;
    background-color: #bfa;
}

/* 子盒子 */
.box2 {
    /* 修改子盒子的高度 */
    width: 180px;
    height: 200px;
    background-color: red;

    /* 使用padding-top让子盒子上部 和 父盒子之间空出距离 这样子盒子的高度就会多出来20px 那么我们将子盒子的高度-20px*/
    padding-top: 20px;

    /* box-sizing: border-box; */
}

/* 
    或者可以在 子盒子中 使用 box-sizing: border-box; 这样就不用减少子盒子的height了
*/
```

- 2. 发生外边距折叠 是因为父盒子和子盒子重叠 
- 所以我们可以让它不重叠 可以在父盒子上添加 border-top: 1px solid transparent;
- 注意: 这个时候子盒子会溢出哦

----------------

### 行内元素的盒模型
- 行内元素的盒模型
- 我们的行内元素 不支持设置 width 和 height 它不能通过宽高设置大小 它就是由元素来决定的

    行内元素可以设置padding *垂直方向*padding不会影响页面的布局
    行内元素可以设置border  *垂直方向*的border不会影响到页面的布局
    行内元素可以设置margin  *垂直方向*的margin不会影响布局



> display: 用来设置元素的显示类型
- 可选值：
- inline:  
    将元素设置为行内元素

- block:   
    将元素设置为块元素

- inline-block: 
    将元素设置为行内块元素 *宽高生效还没有独占一行*

- table:   
    将元素设置为一个表格

- none:    
    元素不在页面中显示 用来隐藏一个东西
    

> visibility:  用来设置元素的显示状态
- 可选值：
- visible：
    元素在页面中正常显示

- hidden：
    元素在页面中隐藏 位置保留

----------------

### 盒子的大小
- 默认的情况下 盒子的可见框大小是由 内容区 内边距 和 边框共同决定的

> box-sizing
- 用来设置盒子尺寸的计算方式（width 和 height的作用）
- 可选值：
    content-box     
        默认值 宽度和高度用来设置内容区的大小

    border-box 
        宽度 和 高度 用来设置整个盒子可见框的大小
<!-- 
    width和height 指的是内容区 和 内边距 和 边框的总大小 自动调整内容区的空间 说白了就是往里挤 
-->

----------------

### css 兼容前缀

- -webkit-    兼容谷歌
- -moz-       兼容火狐
- -o-         兼容欧朋
- -ms-        兼容IE

----------------

### 轮廓 圆角 阴影
> outline 
- 轮廓 用来设置元素的轮廓线 用法和border一模一样
<!-- 轮廓和边框不同的点 就是轮廓不会影响到可见框的大小 -->

- 一般不会这么写 一般都是 鼠标移入时 加的效果


> box-shadow:
- 用来设置元素的阴影效果 *阴影不会影响页面布局*
- 默认情况下 在元素的正下方 跟元素一边大

    1. x偏移量：设置阴影的水平位置 正值 负值
    2. y偏移量：设置阴影的垂直位置 正值 负值
    3. 阴影的模糊半径：
    4. 阴影颜色 rgba(0,0,0,alpha)
    5. inset outset


> border-radius
- 用来设置圆角的  圆角设置的是圆的半径大小
- 圆角一般都有4个方向

    border-top-left-radius
    boeder-top-right-radius
    border-bottom-left-radius
    border-bottom-right-radius 

- 圆角 现实生活中 圆角 不单单是正圆还有椭圆
- 所以一个属性中可以设置两个属性值

    border-bottom-right-radius:10px 20px;   // 第一个是水平 第二个是垂直

- border-radius 可以分别指定四个角的圆角
    左上 右上 右下 左下
    左上 右上/左下 右下
    左下/右下 右上/左下

- 元素设置一个圆形：border-radius:50%;

----------------

### 浮动的简介
- 通过浮动 可以使一个元素向其父元素的左侧或者右侧移动

> float
- 当我们设置float后 可以把元素想象成气球 可以让气球往父元素的左侧或者右侧飘
- *它只会在它的父元素内飘 不会飘出父元素*

- 可选值        
-  none
-  left
-  right

- *注意*：元素设置浮动以后 水平布局的等式 就失效了


> 浮动的特点：
- 1. 浮动元素会完全脱离文档流 不再占据文档流中的位置
- 2. 设置浮动以后 元素会向父元素的左侧或者右侧移动 
- 3. 浮动元素默认不会从父元素中移出 父元素就相当于浮动元素的*一堵墙*没办法逾越的
- 4. 浮动元素向左向右移动时 不会超过它前边的其它浮动元素
- 如果浮动元素的上边是一个没有浮动的块元素

- 5. 浮动元素不会超过它上边的浮动的兄弟元素 最多最多就是和它一样高


> 浮动其他的特点
- 1. 我们的浮动元素不会盖住我们的文字 文字会自动环绕在盒子的周围
- 所以我们可以利用浮动来设置文字的环绕图片效果

- 2. 没设置宽度所有默认全屏
- 3. 没设置高度所以默认被里面的元素撑开

- 元素设置浮动以后 将会从文档流中脱离 从文档流中脱离后 元素的一些特点也会发生变化

> 脱离文档流后有什么样的特点呢？
- 1. 块元素不在独占一行 
- 2. 脱离文档流以后 块元素的高度和宽度都被内容撑开 脱离之后就没有全屏一说的

- 行内元素
- 脱离文档流以后 会变成块块元素 和块元素一样
- 脱离文档以后 就不需要区分块和行内了

----------------

### 高度塌陷
- 浮动的一些问题
- 一般我们在写pc端的代码时 一般宽度都是写死的 或者宽度会指定一个范围
- 但是高度呢？假如一个页面没太多的变化 都是固定的 那无所谓, 很多时候父元素的是不会写死的  它根据内容会变的

```html
    <div class="outer">
        <div class="inner"></div>
    </div>
```

- 一个inner还好 可以撑开父元素 但有些情况 一个outer里有很多的inner 而且还需要这些inner 浮动
- inner浮动后 outer高度没了 这就是高度塌陷的问题
    
<!-- 
    在浮动的布局中 父元素的高度是被子元素撑开的 当子元素浮动以后其会完全脱离文档流 子元素从文档流中脱离

    将会无法撑起父元素的高度 导致父元素的高度丢失 父元素高度丢失以后  其下的元素会自动上移 导致页面的布局混乱

    高度塌陷是浮动布局中比较常见的一个问题 这个问题我们必须要处理
 -->


> BFC
- 是css中一个隐藏的属性 可以为一个元素开启bfc 开启bfc该元素会变成一个独立布局的区域 和 其他的块 不同

- 元素开启bfc后的特点：
- 1. 开启bfc的元素 不会被浮动元素覆盖
- 2. 开启bfc的元素的子元素 和 父元素的外边距不会重叠 
- 3. 开启bfc的元素可以包含浮动的子元素


> 怎么开启bfc
- 1. 设置父元素浮动 float 开启bfc 
- 高度不塌了 但是它会从文档流中脱离 宽度丢失

- 2. 将元素设置为行内块元素 
- display:inline-block;

- 3. 将父元素的overflow设置为一个非默认值 
- overflow:scroll / auto / hidden(常用)


> clear 清除浮动元素对其的影响
- 不是给浮动元素加的 而是给*被影响的元素*加的 clear 属性

    <div class="box1"></div>
    <div class="box3"></div>

<!-- 
    假如box1浮动 box3会上移 也就是说box3受到了box1浮动的影响 位置发生了改变
    如果我们不希望某个元素因为其它元素浮动的影响而改变位置 则可以
    通过clear属性来清除浮动元素对当前元素所产生的影响
 -->

> clear
- 作用：  
- 清除浮动元素对当前元素所产生的影响

- left / right： 清除左侧浮动元素对当前元素的影响
- both：清除两侧中 影响最大的那个 

- 原理 设置清除浮动以后 浏览器会自动为元素添加一个上外边距 使其位置不受其他元素的影响


> 高度塌陷的最终解决方案
> 方式一
- 解决思路:
- 在元素的最后面加一个空的标签 然后让这个标签 clear both 然后就能撑起父元素的高度了
```html
    <div class="outer">
        <div class="inner">内容</div>
        <!-- tools 没有用 只是解决高度塌陷的一个问题 -->
        <div class="tools"></div>
    </div>
```

```css
    tools {
        clear：both；
    }
```


> 方式二  clearfix - 推荐
- css解决css的问题
- ::after 如果我写 选择的就是outer的最后
```css
    .clearfix::before,
    .clearfix::after {
        content:'';

        /* 
            inline-block 也可以但是inline-block即使是空串 也会占一行 把inline-block当做一个字就好了 
            所以最好的办法是table 没有内容也能分开 
        */
        display:table;
        clear:both;
    }
```
- clearfix 这个样式可以同时解决高度塌陷 和 外边距重叠的问题 当你再遇到这些问题时 直接使用clearfix 这个类即可

- *给父元素添加 clearfix 哦~*

-----------------------

### 定位
> position 
- 是一种更加高级的布局手段 通过定位可以把元素摆在页面中的任意位置

- 可选值：
    - static：      默认值   没有开启定位
    - relative：    相对定位
    - absolute：    绝对定位
    - fixed：       固定定位
    - sticky：      粘滞定位


> 相对定位 relative
- 特点：
- 1. 定位位置
- 左上角的坐标原点为： 元素在文档流中原先的位置

- 2. 相对定位会提升元素的层级
- 3. 相对定位不会脱离文档流 不会改变元素的性质 块还是块 行内还是行内

- 4. 不设置偏移量不会发生任何变化 通过偏移量可以移动元素的位置 上下左右只会影响自己
```css
    div {
        position: relative;
        /* 定位元素 和 定位位置 上边的距离 */
        top:

        /* 
            定位元素 和 定位位置 下边的距离
            定位元素 垂直方向的距离 由 top 和 bottom 来控制 通常情况下 只会用一个
        */
        bottom:

        /* 定位元素 和 定位位置 左边的距离 */
        left:

        /*
            定位元素 和 定位位置 右边的距离
            定位元素 水平方向的距离 由 left 和 right 来控制
        */
        rigth:
    }
    
```


> 绝对定位 absolute
- 特点：
- 1. 定位位置 左上角的坐标原点为：
    - 父元素没有开启定位时 在窗口的左上角
    - 父元素开启定位后 绝对定位元素是相对于包含块进行定位的
    
- 2. 绝对定位后 元素的位置不会发生变化
- 3. 绝对定位后 元素会脱离文档流 绝对定位会改变元素的性质 行内变成块 块的宽高被内容撑开
- 4. 绝对定位后 元素会提升层级


> 包含块：
- 正常情况下也就是在文档流中的情况时 包含块就是 当前元素 最近的 祖先 块元素

- 开启绝对定位元素的包含块是当前元素 最近的 *开启定位的* 祖先元素


> 固定定位 fixed
- 固定定位也是一种绝对定位 大部分特质跟绝对定位一样
- 不同点：
    固定定位的位置 永远 参照于 *浏览器的视口* 进行定位


> 粘滞定位 sticky
- 粘滞定位 和 相对定位 的特点基本一致 不同的是 当元素到达某个位置时将其固定
- 它是相对于视口来进行定位的

- 当元素到达我们指定的位置后 会被粘住
- 比如我们元素在 Y500px 的位置 现在我们设置top值为0 那么我们滚动滚动条 当元素到达0的位置后 会被粘住

- 也就是 top 设置的是 当元素到达什么位置的时候开始粘住

```css
.box1 {
    height: 100px; 
    background-color: #bfa;

    /* 元素和视口有100px的距离 */
    margin-top: 100px;
    
    position: sticky;
    /* 当元素到达0px的时候 会被粘住 */
    top: 0px;
}
```

- 兼容性不太好 尤其是IE 所以一样的效果还是要搭配JS去做

> 要点: 
- 一般我们会给开启 absolute的元素的父元素 开启relative

-----------------------

### 绝对定位 元素的布局
- 正常情况下的水平布局 要满足

        7个属性相加 = 父元素的宽度

- 当开启绝对定位以后 就变了
- 当到了绝对定位后 我们水平方向的布局等式 *要添加left和right* 此时的规则和之前的一样

    left + 以前的7个属性 + right = 包含块的内容区的宽度

- 当发生过度约束时
    如果9个值中没有auto 则自动调整right值 以使等式满足
    如果有auto 则自动调整auto的值 以使等式满足


- margin width left right 可以设置auto

> 技巧: 
- 将 top bottom left right 设置为0
- 当 width 有固定宽度的时候 会居中
- 当 width 没有固定宽度的时候 会铺满

- 水平方向居中
<!-- 
    margin-left:0;
    margin-right:0;
    left:0;
    right:0;
 -->
    

- 垂直方向的等式 也要满足9个值的高度 等于 包含块的高度
- 垂直方向居中：
<!-- 
    margin-top:auto;
    margin-borrom:auto;
    top:0;
    bottom:0;
 -->

-----------------------

### 元素的层级
- 对于开启了定位的元素 可以通过z-index来调整元素的层级

> z-index
    z-index:1-9999;

- 元素的层级一样时 优先显示靠下的 指的是结构上的 祖先元素的层级再高也不会盖住后代元素

-----------------------

### 行高

> line-height
- 行高是指*文字占有的实际高度*
- 我们可以通过使用line-height来设置div的高度

- 行高的单位 px em 也可以设置一个整数 整数是字体大小的倍数
- 默认行高为1.33


### 字体框：
- 字体存在的格子 设置font-size就是在设置文字框的大小

> 行高的分配：
- 行高会在字体框的上下平均分配 (100-50)/2


> 行间距：
- 行间距 = 行高 - 字体大小


> 技巧
> 单行文字垂直方向居中
```css
{
    font-size:50px;
    line-height:50px;
}
```

> 多行文字 或 元素 在父元素内居中
- 将父元素的显示模式设置为 table-cell
```css
    .outer {
        width:300px;
        height:300px;
        background-color:red;

        /* 将元素设置为成 单元格 td */
        display:table-cell;
        vertical-align:middle;
    }

    .inner {
        width:100px;
        height:100px;
        background-color:blue;

        /* td有的属性 对td好用的效果都好用  如果是文字的话好用 框体的话还是要用 margin:0 auto */
        text-align:center;
    }
```

-----------------------

### 表单
- 表单用来提交数据 将本地数据提交给服务器

> <form action=""></form>
- 属性： action
- form表单中必须要有的一个属性 表单要提交服务器的地址
- <form action="target.html"></form>


> 文本框
- 数据要提交给服务器 必须要为元素指定一个name值 name的值根据你文本框填写的内容来定
    <input type="text" name='username'>

- 属性：
- autocomplete="on/off"       根据我们历史输入 *自动补全* 开启 关闭
- readonly                    将表单项设置为只读 跟value配合使用 数据会提交
- disabled                    将表单项设置为禁用
- autofocus                   自动获取焦点


> 密码框
- 密码框要想提交也必须要指定一个name值
    <input type="password" name='password'>


> 提交按钮
- 
    <input type="submit" value='btnname'>


> 单选按钮
- 单选按钮也必须要指定name属性 用来进行分组 所以一组的东西必须有相同的name属性
- 单选按钮还必须要指定value属性 value值最终会作为用户填写的值传递给服务器

- 属性 checked 默认选中
    <input type="radio" name="sex" value='men' id="" checked>
    <input type="radio" name="sex" value='women' id="">


> 多选按钮
- 多选按钮也必须要name属性 一组的元素name属性应该一样
- 多选按钮也必须要value属性

    <input type="checkbox" name="aihao" value='xx' id="">
    <input type="checkbox" name="aihao" value='yy' id="">
    <input type="checkbox" name="aihao" value='zz' id="">

- 原生js获取表单内部数据的方式
```js
btn.addEventListener("click", () => {
    // 这要是不使用 formData 是不是很痛苦
    let xxVal = xx.checked ? xx.value : ""
    let yyVal = yy.checked ? yy.value : ""
    let zzVal = zz.checked ? zz.value : ""

    let arr = []
    if(xxVal) arr.push(xxVal)
    if(yyVal) arr.push(yyVal)
    if(zzVal) arr.push(zzVal)

    console.log(arr)

    --

    let data = new FormData(form)
    console.log(data.getAll("aihao"))
})
```

> 下拉列表
- 也需要指定name属性
- option标签内部 可以写 selected 代表默认选中

```html
    <select name="" id="">
        <option value="" selected></option>
    </select>
```

> 重置按钮
- 
    <input type="reset" value="">


> 按钮
- 
    <button type='button'></button>
    <button type='reset'></button>


> 移动端：
- 移动端使用这两个标签会多一些 *因为会弹出对应的键盘*
    <input type="tel" name="" id="">
    <input type="email" name="" id="">

-----------------------

### 字体的简写属性
- 最好写在最前面

- 顺序： 
```css
{
    font: [字体粗细(bold) 字体样式(italic)] 字体大小(倒数2)/行高 字体族(倒数1)
}
```

**注意：**
- 字体大小 和 字体族 是必写属性 而且*必须在最后面*

- 行高 不写不是没有 而是使用了行高的默认值 所以可能会用默认值 覆盖掉 上面的line-height

- 字体粗细 字体样式 不写不是没有 而是相当于设置了默认值 normal 写在下面有可能会覆盖掉上面的样式

```css
{
    font: bold italic 50px/2 中华正楷

    font-style: 
    font-weight: 
}    
```

-----------------------

### 字体族
- 特殊字体 怎么才能让客户使用服务器上的字体 可以将服务器中的字体直接提供给用户去使用
```css
@font-face{        
    /* 指定字体的名字 我给这个字起的名字 myFont  */
    font-family:;     

    /* 服务器上字体的路径 */
    src:url();          
}
```

-----------------------

### 图标字体
- 在网页中经常要使用一些图标 可以通过引入图片 但是图片本身会大 也不灵活
- 所以在使用图标时 我们还可以将图标直接设置为字体 然后通过font-face的形式来对字体进行引入 我们就可以通过使用字体的形式来使用图标了 我们可以把图标做成字体文件 然后通过font-face的形式 发回来使用

- 网上有很多图标字体库 
- 1. 国内比较多的是 iconfont 阿里的图标库
- 2. 国外的是 font Awesome 英文的比较新

> font Awesome
- 1. 下载
- 2. 解压
- 3. css 和 webfonts 移动到项目中 它俩必须在一起
- 4. 将css文件引入到网页中 
    <link rel="stylesheet" href="">

5. 使用图标字体
- 直接通过类名来使用图标字体 fas或者fab是固定的
    <i class="fas 图标名字"></i>

```css 
    li::before {
        content:'\编码';
        font-family:      去css文件中看看这个图标使用的哪款字体;
        font-weight:900;  这个是css中字体下面带的 一起粘贴过来
    }
```

- 通过实体使用来使用图标字体
<i class="fas">&#x图标的编码;</i>


> 阿里图标的使用方式
1. 引入iconfont.css
2. 创建一个<i class="iconfont classname">去复制实体</i>标签

-----------------------

### 文本的对齐方式

> 水平方向的对齐方式 text-align:
    

> 垂直方向的对齐方式 vertical-align:
- 属性: 
    baseline:    
        基线对齐 默认值

    middele:     
        子元素的中线和X的中线对齐 并不是严格意义上的垂直居中

    数值:        
        可以通过数值来调整位置 正数往上 负数往下
```html
    p {font-size:50px}
    span {font-size:15px; vertical:top}

    <p>今天天气<span>真不错</span></p>
```
        

- 垂直对齐 文字默认都是在基线上排列的
- vertical-align：bottom 子元素底部和父元素底部对齐


> 引入图片后 图片会与边框有一个缝隙 图片缝隙 解决方案
- 原因 img是*替换元素 相当于一个文字* 文字是沿着基线去对齐的 图片也一样
- 解决方案：
- *在img中设置* vertical-align：bottom/top 只要不是默认值baseline就可以

-----------------------

### 文本的一些属性
> text-decoration: underline overline line-through
- 文本修饰

- 还是可以指定完线的样式后添加颜色属性 跟边框的写法差不多 但是ie不支持
- text-decoration:underline red soild;


> 省略文字... 效果
```css 
    .box2 {

        width:200px;

        /* 必要的3个条件 */
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;

        /* 设置网页如果处理空白 normal  nowrap 不换行  pre 保留*/
        white-space:nowrap;
    }
```
    

-----------------------

### 案例: 京东页面点击按钮 出现下拉框
- 先做个框 然后放在北京的祖先盒子里 这个下拉框 一上来应该是隐藏的display:none;
- 也就是鼠标移入到北京时 下拉框就显示出来了

- 是绑定给北京的超链接么？
    
> :hover
- 当鼠标移入一个div时 让它下面的兄弟元素显示出来
- 也就是说 要给current-city绑定hover
```css
    .current-city:hover + .city-list{
        display:block;
    }
```

- 但是绑定给current-city后 鼠标再移出后 下拉框又消失了 到底要绑定给谁？
- 应该绑定给他们的共同的父元素 这样的范围最大
```css
    .location:hover  .city-list{
        display:block;
    }
```

```html
    <div class="location">
        <div class="current-city">
            <i class="fas "></i>
            <a href="">北京</a>
        </div>
        <div class="city-list"></div>
    </div>
```

-----------------------

### 背景相关
> background-color: ;
- 背景颜色：

> background-image: url('links/1.jpg');
- 背景图片：
- 背景图片默认在元素的左上角

- 如果背景图片 小于 元素 背景图片会自动在元素中铺满
- 如果背景图片 大于 元素 背景图片将有一部分无法显示
- 可以同时给背景设置 背景颜色 和 背景图片 背景颜色将成为背景图片的背景色


> background-repeat: ;
- 背景图片重复方式：
- 可选值：
    repeat      默认值
    repeat-x    沿着x轴重复
    repeat-y    沿着y轴重复
    no-repeat   不重复


> background-position: ;
- 背景图片位置
- 可用通过left right top bottom center几个方位的词来设置背景图片的位置

    top left      top center      top right

    left center   center center   right center

    bottom left   bottom center   bottom right

- 使用方位名词的时候 至少需要两个词 如果只写一个词的话 第二个值默认就是center
- 还可以通过偏移量设置 图片 的位置 至少需要两个值

- eg:
    background-position:10px 10px;


> background-origin: ;
- 设置背景图片的原点 设置背景图图片偏移量计算的圆点
- 可选值：
    padding-box
        默认值：background-position从内边距处开始计算 就是说图片的原点在内边距的左上角

    centent-box
        背景图片的偏移量从内容区处开始计算 也就是图片的原点在内容区的左上角

    border-box
        背景图片的额偏移量从边框处开始计算 也就是图片的原点在边框处的左上角


> background-clip:;
- 设置背景图片的范围      ie8不支持
- 边框的下面有背景的 当我们想设置背景图片的范围时可用这个属性
- 可选值：
    border-box
        默认值： 背景会出现在边框的下面

    padding-box
        背景只会延伸到内边距 不会再出现在border的下方

    content-box
        背景只会延伸到内容区


> background-size: ;
- 设置背景图片的尺寸
    background-size: 100px 100px;  

- 第一个值是宽度 第二个值是高度 如果只写一个 第二个值为auto

- 可选值：
- cover:      图片比例不变 将元素铺满 以框体为主
- contain:    图片比例不变 将图片在元素中完整显示 以图片为主


> background-attachment: ;
- 设置背景图片是否跟元素移动
- 可选值：
- scroll      默认值  背景图片跟着元素一起移动
- fixed       背景图片会固定在页面中 不会随着元素一起移动

- 这个时候再进行定位 就是按照 视口 来定位了


- background-color:;
- background-image: url('links/1.jpg');
- background-repeat: repeat;
- background-position: ;
- background-size: ;
- 
- background-origin: ;        它在前
- background-clip:;           它在后
- 
- background-attachment: ;

> 简写属性：
- 可以把背景相关的属性都用background来书写 而且没有顺序要求
- background:red url('') center center ....

**注意：**
- 如果有background-size属性的话 要写在position的后面 用 / 隔开
- eg：
    background:red url('') center center/cover ....

- 如果有background-origin: ; 和 background-clip:; 的话, 
    background-origin必须在前面
-eg：
    background:red url('') center center/cover border-box content-box


background: [background-color] [background-image] [background-repeat]
            [background-attachment] [background-position] / [ background-size]
            [background-origin] [background-clip];

```css
.example {
  background: aquamarine url(img.png)
              no-repeat
              scroll
              center center / 50%
              content-box content-box;
}
```

-----------------------

### 渐变
- 渐变是图片 需要通过background-image来设置 它的很多特点是跟背景图片一样的 跟color属性相距甚远
- 它属于一种颜色 特质跟图片一样 对老版本的ie兼容性不是很好


> 线性渐变
> background-image: linear-gradient();
- 第一个参数可以传递方向
    to right / to top left / 45deg(度数) / 1turn(一圈 .5turn .25turn)

- 颜色可以传递多个 默认情况下平均分配
- 也可以手动分配颜色分布情况 颜色的起始位置 颜色和数值之间用空格链接

- 红色从50px开始发生过渡渐变
```css
{
    background-image: linear-gradient(red 50px, yellow 70px);
    background-image: linear-gradient(to left, red, yellow, blue);
}
```

> 重复线性渐变
> background-image: repeating-linear-gradient();
- 可以平铺的线性渐变 上面设置数值后 空白区域都是纯色平铺的
- 如果希望渐变平铺用这个属性

- 当传递两个值时 和linear-gradient没有区别
background-image: repeating-linear-gradient(red, yellow);

- 当在颜色后面设置数值 也就是起始位置时 会有区别
background-image: repeating-linear-gradient(red 50px, yellow 100px);

- 高度为200px 渐变范围是50px 200/50=4个部分开始重复渐变


> 径向渐变：
> background-image:radial-gradient()
- 第一个值在最中心 第二个值在外围
- 默认情况下 径向渐变的形状根据元素的形状计算的

- 指定径向渐变的范围 在第一个参数的位置
- 可以指定数值 还有预定义的语句：

    circle  正圆 
    ellipse 椭圆

- eg:
- background-image:radial-gradient(100px 100px, red, yellow)
<!-- 径向渐变的范围是100px x 100px -->

- 指定渐变范围延伸到哪里
    closest-side        延伸到离圆心最近的两条边
    farthest-side       延伸到离圆心最远的两条边

    closest-corner      延伸到离圆心最近的角
    farthest-corner     延伸到离圆心最远的角

- eg:
background-image:radial-gradient(closest-side at 100px 100px, red, yellow)
<!-- 渐变延伸到离圆心最近的两条边 -->

- 可以指定渐变圆心的位置
  在第一个参数的位置里传递 at 0 0
- eg:
background-image:radial-gradient(100px 100px at 0 0, red, yellow)


> 重复径向渐变：
> background-image: repeating-radial-gradient(red, yellow);

-----------------------

### 三角形的做法
- 利用 border 来完成 所以不用给目标设置 width 和 height
```css
.box {
    width:0px;
    height:0px;
    border:10px red solid;

    /* 
        下面是个尖朝上的三角 接下来这么操作   
        尖朝哪个方向 哪个方向的属性就设置为none
        剩下保留左右两边 和 下边
    */
    border-top:none;

    /*
        除了目标边 剩下的三边的颜色 换成透明色
        这里和上面的正好相反 尖朝上 颜色就设定在下
    */
    border-color:transparent transparent white transparent
}
```

- 不想加结构的话 可以通过伪元素来设置
```css
    .app::after {
        content:'';
        /* 变成块元素 才能设置 width 和 height */
        display:block;

        width:0;
        height:0;

        /* 写在下面的样式 都是相当于围绕content里面的内容添加样式 */
        border:10px solid transparent;
        border-bottom-color:white;

        /* 这个放到最后吧 */
        border-top:none;

        position:absolute;
        left:0;
        right:0;
        margin-left:auto;
        margin-right:auto;
        margin-top:-10px;
    }
```

- 总结下：
- ::after before 里面的样式都是对content的值的设定

> 另一种做法：
```css
    .test {
        width:0;
        height:0;
        border-width:40px;
        border-style:dashed soild dashed dashed;
        
        /* 虚线起始为空阶段 */
        border-color:transparent red transparent transparent;
        overflow:hidden;
    }
```

- 要点：
- 1. 没有宽度 高度 三角形的大小是border决定的
- 2. 尖朝哪个方向 哪个方向的属性就设置为none
- 3. 剩下的三边的颜色 换成透明色 尖朝上 颜色就设定在下

-----------------------

### 扇形:

```css
.sector-item {
    width: 0;
    height: 0;
    /* 都是100px? */
    border: 100px solid transparent;
    border-radius: 100px;
    border-top-color: #C2185B;
    position: absolute;
}

.sector-item::after {
    content:'';
    display: block;
    width: 0;
    height: 0;
    border:10px solid transparent;
    border-bottom-color:#eee;
    border-top:none;
    position: absolute;
    top:-85px;
    left: -9px;
}
```

-----------------------

### 显示 与 隐藏
- 加过渡效果 hover时 结构上要关系
- 通常我们都是通过display来把元素进行 显示 和 隐藏的设置
```css
{
    display:none;
}
```

- 这样再加动画效果的时候 并不好处理 一般可以通过*设置height来隐藏元素*
```css
{
    height:0;

    /* 高度没有了 文本会移除 隐藏移除部分 */
    overflow:hidden;
}
```
- 然后通过设置高度来显示元素
```css
{
    height:100px;
}
```

-----------------------

### 动画 - 过渡效果

> transition: 属性 时间
- 用于为样式设置过渡效果
- 样式改变时 必须是具体的数值

```css
    /* 
        0 - 55 
        不能是 auto - 55 
        所以在移动偏移量时 要手动设置left:0 
    */
    .xx {
        height:0;
        overflow:hidden;

        /* 当高度属性发生变化时 我要花3秒钟的时间去切换 */
        transition:height 3s;
    }

    .xx:hover {
        height:55px;
    }
```

-----------------------
    
### 图片横向切换效果
- 有点像轮播图 鼠标移入后 切换了左边的图片
- 1. 图片如果是链接的话 可以用a标签 a标签用css样式设置背景图片

<div class="wrapper">
    <div class="img1">图片1</div>
    <div class="img2">图片2</div>
</div>

- 设计好结构之后 剩下的就是整体的移动两个元素 像移动轮播图的ul似
```css
    .wrapper {
        width: 100px;
        height: 100px;
        position: relative;
        overflow: hidden;
    }


    .img1, .img2 {
        width: 100px;
        height: 100px;
        background-color: #f2a154;
        text-align:center;
        line-height:100px;
        color:#314e52;
        position: absolute;
        left:0;

    }

    .img1 {
        transition:left .5s;
    }

    .img2 {
        background-color: #f7f6e7;
        left:-100px;
        transition:left .5s;
    }

    /* hover效果要添加给他们的父元素 */
    .wrapper:hover .img1 {
        left:100px;
    }

    /* 这里left的值并不是移动多少距离 而是移动到哪里 原先它的 left值为-100px, 我要移动到0px的位置 */
    .wrapper:hover .img2 {
        left:0px;
    }
```

-----------------------

### 固定定位  调整浏览器窗口 水平位置也不会变的技巧
- 在此之前先复习下 定位之后 我们水平方向的布局 要满足的等式

    left + margin-left + border-left + padding-left 
    + width + 
    padding-right + border-right + margin-right 
    
    = 包含块的宽度


- 这里我们先直说 固定定位（它是相对于视口来计算偏移量的）

    left + margin-left + width + margin-right + right = 视口

- 需求：
- 空白 + 页面宽度 + 空白
- 空白 + 页面宽度 紧挨 目标div + 空白

- 不管怎么拖动浏览器水平的大小 我们的div都紧紧的挨着页面宽度

```css
div {
    position:fixed;
    right:50%;
    margin-right: 父容器的一半 + div的宽度
}
```

- 原理：
- right:50% 让它到页面的中间 div右侧就是中线
- left就是auto 那现在的等式就是

    left + margin-left + width + margin-right + right = 视口
    auto + 0 + div宽度 + 0 + 50% = 视口

- 我们不能给left指定固定值 还是因为浏览器窗口可能会改变
- 但我们可以减小margin-right的值 left的值为了使等式满足就会自动增大
- 然后通过left的值将我们的目标顶到目标位置 这样都是自动计算的 不管再怎么改变浏览器的水平窗口 目标位置也不会发生改变

```css
.targetBox {
    width:50px;
    height: 100px;
    background-color: aquamarine;

    /* 经常会用到 这么写是利用了等式的原理 */
    position:fixed;
    right:50%;
    margin-right:-550px;
    bottom:270px;
}
```
-----------------------

### 设置网站的图标 会在标题栏和收藏栏里显示
- head标签里
<link rel="icon" href="图片地址">

- 网站图片一般都在网站的根目录下 名字一般都叫做 favicon.ico
- 可以去百度下 制作 ico图片

-----------------------

### 网站上线时 压缩代码
- VSCode里的插件：JS & CSS Minifier (Minify)
- 用法：
- F1 --- minify:document

- 删除一些： 空格 换行 注释等
- 目的： 加载速度快 用户体验好 

-----------------------

### 项目练习：
- body的真实大小 要通过border来查看 直接给body设置背景颜色 其实是给html设置的

- index.html  作为首页
- index.css   开发时 样式写在外部样式表中链接进来 名字和html文件起成一样的
- 创建base.css文件用来放一些公共样式 内部比如整个网站要用的字体是什么 clearfix等等
- 引入图标字体库

- 主要区域的宽度是多少 一般是1200 1000

- min-width:1200px;
- 最小宽度1200px 这样防止拖动浏览器 视口变小时影响布局

- 有的时候发现 上面元素虽然设置了 margin-bottom：17px 明明有地方 但是下面的文字上不去 看看是不是父元素里共同设置了line-height 下面的那行文字可能继承了line height属性 所以上不去 重置下就好了

- 以前会认为img之类的标签也属于行内元素 但设置text-align center 却没有生效 因为img属于行内块元素

- 想让一个对象不在父元素中占据位置 可以设置position:absolute


1. LOGO属于网页中最重要的部分 所以 logo 应该放在h1标签中   

2. 相对路径指的是 你写在哪里就相对于当前文件 去找图片

3. 背景图片居中 用background-position

4. logo h1等 上面要加上title

5. 在h1中 最好写上文字 方便搜索引擎能爬到 但写上文字后 会出现在屏幕上 所以 这时候我们 text-indent:-9999px;

6. 使用display:none 隐藏元素 隐藏的元素不会占页面的位置 会影响布局 这时候我们可以用 visibility:hidden

7. 弹出层的问题 ul li a 结构是这样的 现在我给li绑定的hover 这样我离开li后 弹出层会消失 所以 还要给弹出层绑定hover
<!-- 
    .nav li:hover ~ .goods-info,
    .goods-info:hover {}
 -->


8. 接上 在所有li中 刨除第一个和最后两个
.nav li:not(:first-of-type):not(:nth-child(10):not(:nth-child(9))):hover ~ .goods-info
- 也可以要把 显示的东西 加上共同的类

9. 下拉层 应该有很好的层级 不要让别的元素盖住

10. button里的提示文字也可以是一图标字体 来完成 放大镜按钮
<button class="search-btn">
    <i class="fas fa-search"></i>
</button>

11. input设置高度 不会太准 因为 内部有些默认的padding导致的 所以在设置input样式时 里面的padding去掉
可能要有边框的问题 border:none

12. button 里 有个默认属性 是box-sizing:border-box
这里的设置button的大小 会设置整个可见框的大小

13. 搜索框中的 div 文字 加 背景 点击的时候 消失 移出的时候显示 有字的时候也没有
只有没字的时候才会出现 这就是两个div 通过绝对定位 定到这里就可以

14. 输入框 点进去后发生 样式的改变 :Focus 

15. 结构要分析好 比如 一个div放哪

16. 垂直方向的问题 我们第一个想想行高的问题

17. 固定定位 垂直方向好调 bottom就可以 但是水平方向不行 窗口一拖动 水平方向就变了
- 布局等式 只针对这里：
- left+margin-left+width+margin-right+right = 视口的宽度
- 刚才的做法是
    auto + 0 + 26 + 0 + 60 = 视口的宽度
解决方案：
{
    position:fixed;
    right:50%;

    //将right值设置为视口宽度的50% 效果就是不管浏览器怎么放大或者缩小
    它的位置都在视口的一半 图形右边是中线
}
<!-- 
    auto + 0 + 26 + 0 + 50% = 视口的宽度

    这时候 我们想让图形左边的距离增大 那么只能减小marginleft或者marginright的值
    因为减小marginleft的值 auto为了使等式满足就会增大
    但是我们要减小marginright的距离
 -->


18. 用正方形等做线 
- 横线用width:70px height:1px 
- 竖线用width:1px height:70px;

19. 媒体查询

-----------------------

### animation -- 过渡
- 过渡效果 是一种交互效果 是鼠标移入的时候 开始进行过渡效果
- 通过过渡可以指定当一个属性发生变化时的切换方式 可以提升用户体验
- 大部分属性都可以进行过渡 只要它的值是可以计算的 所以必须是 一个有效数值 向 另一个有效数值进行过渡
<!-- 
    margin:auto     就不能过渡 因为auto没办法实现
 -->


- 执行过渡效果 有两个属性是必须的
- 1. 过渡的属性
- 2. 过渡花费的时间

> 用法：
1. 在目标元素中 设置属性
    transition: [name] [ms / .2s];   /  transition: all [ms / .2s];

2. 给 目标元素 添加 :hover 来改变目标元素的 目标尺寸


> 属性：
- 过渡属性如果有多个 用逗号隔开 如果全部要发生改变 那就填写all

> transition-property: ;          
- 要执行过渡的属性
<!-- 
    eg：
    transition-property: width;
 -->


> transition-duration: ;          
- 指定过渡效果持续的时间
<!-- 
    eg：
    transition-duration: 2s / .2s = 20ms;
 -->


> transition-timing-function: ;  
- 过渡的时序函数 (指定过渡的执行方式)

- 可选值：
    ease            默认值      慢速开始 先加速 再减速 停的时候感觉很好
    ease-in         加速运动
    ease-out        减速运动
    ease-in-out     先加速 再减速
    linear          匀速

    cubic-bezier()  通过贝塞尔曲线指定时序函数
    https://cubic-bezier.com/#.17,.67,.83,.67
<!-- 
    网站中可以查询数值#.17,.67,.83,.67      手柄的两个坐标
    eg：
    transition-timing-function: cubic-bezier(0,0,1,1); 
 -->


    steps()         分步执行过渡效果
    - 参数：分几步    steps(3) 

    - 参数：end默认值 假如我们的总时长是2s 分2补 每步就是1s
        end    在时间结束时开始过渡
        start  在时间开始时开始过渡
<!-- 
    steps(2, end / start) 
    eg：
    transition-timing-function: steps(2, end / start) ;
 -->


> transition-delay: ; 
- 过渡效果的延迟  
- 等待一段时间后再执行过渡效果
<!-- 
    eg:
    transition-delay: 2s;
 -->


> 简写属性：
- 可以同时设置过渡相关的所有属性 只有一个要求 要是写延迟 第一个时间是持续时间 第二个时间是延迟时间
    eg：
    transition: left 2s 2s ease;

<!-- 
    margin-right等 也是可以过渡的 效果就是移动

    属性也可以分别设置过渡时间：
    transition-property: width, height;
    transition-duration: 1s, 2s
 -->

> 过渡 - 相关技巧
- 传统使用hover去移动 只能移动一次
- 这里我们可以用 时序函数来分几步进行操作

-eg：
transition-timing-function: steps(3)

-----------------------

### animation  动画
- 动画 和 过渡类似都是可以实现一些动态效果
- 不同的是过渡是在某个属性发生变化的时候才会触发 而动画 自动触发动态效果

- 设置动画效果 必须要设置一个关键帧 一副图片就是一帧（题外fps就是帧数）
- 关键帧：
- 设置了动画执行的每一个步骤
```css
    @keyframes identifier {
        /* 动画开始的位置 from也可以使用       0%表示 */
        from{
            margin-left:0;
        }

        /* 动画结束的位置 to也可以使用        100%表示 */
        to{
            margin-left:700px;
        }
    }
```

- 不光只能指定开始 和 结束位置 还可以指定中间位置
```css
    @keyframes identifier {
        from{
            margin-left:0;
        }

        33% {

        }

        66% {


        }

        to{
            margin-left:700px;
        }
    }
```

> animation 属性：
- animation-name:             要对当前元素生效的名字
- animation-duration:         动画执行的时间
- animation-delay：           动画的延时
- animation-timing-function:  动画的方式

- animation-iteration-count:  动画执行的重复次数
- eg：animation-iteration-count: 3 / infinite 无限

- animation-direction:        动画执行的方向
- 可选值：
- normal      
    从from - to 运行

- reverse     
    从to - from 运行

- alternate   
    来回运行    去：from - to 回来：to - from

- alternate-reverse
    回来运行    去：to - from 回来：from - to


animation-play-state:       动画执行的状态
- 可选值：
    running 默认值 动画执行
    paused 动画暂停  比如 当鼠标移入时暂停


animation-fill-mode:        动画的填充模式
- 可选值：
    none
        默认值 动画执行完毕元素回到初始位置 原来位置
    forwards
        动画执行完毕 停止在to的位置 终点位置
    backwards
        动画延时等待时 就会展示from里的状态
    both
        结合了forwards 和 backwards两个属性的特点 动画开始时就在开始位置 结束时在结束位置

> 简写属性：
- 没有特别的顺序要求 只需要注意时间 第一个是duration 第二个是delay
- animation: test 2s 2 1s alternate;


> 操作步骤：
1. 设置关键帧
2. 把关键帧的名字添加给目标元素
3. 在元素中写 关于动画的各种属性

-----------------------

### 变形
- 开启视距后 页面就会有透视效果

**注意:**
- 想做3D效果一定要html写上 perspective
```css
    html {
        /* 
            设置当前网页的视距为800px 人眼距离网页的距离 也就是说我眼睛和屏幕之间的距离是800px 

            设置的不宜过小 600 - 1200 / 800 - 1000 这个区间范围
        */
        perspective:800px;      
    }
```

> 是否显示元素的背面
```css
{
    backface-visibility:hidden / visible
}
```

> 2D - 3D
- transform 变形的默认效果 是2D效果 假如需要显示3D效果 则元素上需要开启
```css
{
    transform-style: preserve-3d;
}
```


- X轴：水平方向叫X轴
- Y轴：垂直方向叫Y轴
- Z轴：想象成屏幕有一根箭 扎向眼睛 元素里我们人的距离叫做Z轴 Z轴越大离我们就越近

- 变形
- 变形就是指通过CSS来改变元素的形状或位置
- 变形不会影响页面的布局 只会影响自己 不会影响别的元素

- 可以写多个变形 多个变形中间 用空格隔开
- eg：
transform:translateX() translateY()


> 平移： transform
- 用来设置元素变形的效果 里面怎么变还是要通过函数来指定

- 可选值：
- translate();      平移
- translateX()      沿着X轴方向平移     可以指定具体数值 也可以指定百分比
- translateY()      沿着Y轴方向平移
- *在指定百分比时 偏移量是相对于自己进行计算的*

<!-- 
    transform:translateX(50%);
    // 向右移动自身宽度的50%

    transform:translateX(100px);        //元素向右移动100px的距离 有点像margin但是不会影响别的元素
 -->

- translateZ()      沿着Z轴方向平移
- Z轴平移 调整元素在Z轴的位置 正常情况下就是调整元素和人眼之间的距离 直接开启的话没有效果
- Z轴平移属于立体效果（近大远小） 默认情况下网页是不支持透视的 如果需要看见效果

**注意: 要想z轴生效**
- 必须要设置网页的视距
```css
html {
    perspective:800px;
}

/* 然后再开启 */
box {
    transform:translateZ(100px);
}
/* 这个不是改变元素的大小 大小没有变 而是离我们近了或者远了 */
```

> 技巧：
- 块元素 垂直 水平 双方向居中
- 利用 变形效果中的平移属性
- transform:translateX()

- 之前我们可以 要设置水平 垂直方向居中的话 都是通过定位后 那个布局等式来操作的


> 方式一	元素高度 宽度确定
- 有局限性 这个方向 元素的大小是确定的 width height都有固定的值时可以 但是假如我希望元素的高度和宽度是不确定的 也就是被内容撑开的 也就是大小不确定 我还希望这个元素在屏幕中居中
```css
    {
        position:absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
    }
```

> 方式二：
```css
{
    position:absolute;
    left:50%;
    /* 这时候元素会在屏幕中间 但是中线是div的左边缘 也就是说元素在整个屏幕的中间偏右 */

    transform:translateX(-50%);

    /* 上面是在中间偏右 偏了一个div的宽度 这时候这么设置 再往左拉会div宽度一半的距离就是水平方向居中 */
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
}
```

> 效果
- 元素浮出效果 利用transform:translateY() 来实现的
```css
.testBox {
    width:200px;
    height: 200px;
    background-color: #FFA000;

    margin:100px auto;

    /* 给平移添加过渡效果 */
    transition:transform .3s;
}

.testBox:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 5px rgba(0,0,0,.5);
}
```
-----------------------

### 旋转
- 开启视距后 更加的明显
- 通过旋转可以让元素沿着 XYZ轴 旋转到指定的角度

> transform:rotate()
- turn deg

- rotateX()           往后仰
- rotateY()
- rotateZ(45deg)      Z轴在中心 围着中心旋转45度 平面旋转
- 中心点的设置

-----------------------

### 练习 钟表

- 秒针的思路：
    正常我们给元素设置 rotateZ(360deg)的话 中心在下面 但是秒针的话 应该是沿着根部旋转
    ----- 中心 ----

    解决方案:
    我们把做好的秒针 放在外面容器的div中 秒针的高度是div高度的一半 然后把div设置旋转
    然后去掉div的背景色
```css
    .testBox {
        width: 400px;
        height: 400px;
        /* background-color: #FFA000; */

        margin:50px auto;
        position:relative;

        /* 开启动画 */
        animation: run 60s;
    }

    .targetBox {
        height:200px;
        width:3px;
        background-color: #212121;
        margin:0 auto;
    }

    .en {
        width:10px;
        height: 10px;
        background-color: tomato;

        /* 设置水平垂直双方向居中 */
        position:absolute;
        left:50%;
        top:50%;
        transform:translateX(-50%) translateY(-50%);

        /* 圆角 */
        border-radius:50%;
        
    }

    /* 设置关键帧 */
    @keyframes run {
        from{
            transform:rotateZ(0);
        }
        to {
            transform: rotateZ(360deg);
        }
    }
```

-----------------------

### 练习 立方体 复仇者联盟

- 1. 给图片设置透明效果
- 可以给装图片的容器设置透明效果：

    div {
        opacity:0.5;
    }
    
- 2. transform 变形的默认效果 是2D效果 假如需要显示3D效果 则需要开启
    transform-style: preserve-3d;

-----------------------

### 缩放

> transform:scale()
- 对元素进行缩放 缩放的原理是把对应的轴给延长 所以Z轴是没有用的
- 要想看到Z轴的效果 必须要开启3D效果
- eg： transform-style:preserve-3d;
- scaleX()

- 参数：
    整数：放大倍数
    小数：缩小

transform:scaleX(2);    //沿着X轴放大两倍
- scaleY()
- scale()

X Y轴 双方向缩放


> 变形的圆点

transform-origin:
- 可选值：
    center：    默认值
    0 0：       元素的左上角

-----------------------

### flex 弹性盒子
- flex（弹性盒 伸缩盒）
- 是CSS中又一种布局手段 它主要是用来代替浮动来完成页面的布局  它是为了解决浮动的问题的又一种布局方式
- 比如子元素浮动 父元素高度塌陷的问题

- 如果是不用兼容老的浏览器 做的移动端的项目就可以用flex

- flex可以使元素具有弹性 让元素可以跟随页面的大小的改变而改变
- 弹性容器的设置：

- 弹性容器：
- 要使用弹性盒 必须要将一个元素设置为弹性容器 我们通过display来设置弹性容器

    display:flex;           块级弹性容器
    display:inline-flex;    行内的弹性容器


- 弹性元素：
- 弹性容器的直接子元素是弹性元素（弹性项）
- 一个元素可以同时是弹性容器 和 弹性元素

<ul>                弹性容器
    <li></li>       弹性元素
    <li></li>
    <li></li>
</ul>

```css
    ul {
        width:800px;
        border:10px solid black;

        display:flex;
    }

    li {
        /* 这时候li既是弹性容器 又是弹性元素 */
        display:flex;   
    }
```


> flex的属性
- 弹性容器 和 弹性元素 各有自己的样式

> 弹性容器的属性：
- flex-direction:  指定容器中弹性元素的排列方式  也可以说是指定主轴
- 可选值：
    row
        默认值 弹性元素在容器中水平排列 左向右  跟国家的书写习惯有关 中国就是 左 → 右  日本可能就是 上 ↓ 下
        主轴： 自左向右

    row-reverse
        弹性元素在容器中反向水平排列 右向左  
        主轴： 自右向左

    column
        弹性元素纵向排列 自上向下
        主轴： 自上向下

    column-reverse
        弹性元素反向纵向排列 自下向上
        主轴： 自下向上


> 主轴 和 侧轴
- 主轴： 弹性元素的排列方向 称为 主轴
- 侧轴： 与主轴 垂直方向的 称为 侧轴

> flex-wrap:
- 设置弹性元素是否在弹性容器中自动换行 当盒子本身的宽度不足以容纳盒子内部的元素时是否换行
- 可选值：
    nowrap
        默认值 不换行

    wrap
        元素沿着侧轴方向自动换行 往下走

    wrap-reverse
        元素沿着侧轴反方向换行 往上走


> flex-flow:
- wrap 和 direction的简写属性
- flex-flow: row wrap;    横向排列 换行


> justify-content：
- 如何分配主轴上的空白空间  也可以理解为主轴上的元素如何排列

- 可选值：
    flex-start
        元素沿着主轴起边排列 意味着如果有空白 空白应该在最后

    flex-end
        元素沿着主轴终边排列 意味着如果有空白 空白应该在开始

    center
        元素居中排列 空白就会分部在两边

    space-around    空白分布到元素两侧
    space-evenly    空白分布到元素的单侧    浏览器的兼容性不太好
    space-between   空白均匀分布到元素间

- 应用：
- 元素这时候想水平居中的话 直接
<!-- justify-content:center; -->


- 技巧：
- 看到justify都是主轴的属性
- 看到align-items都是侧轴上的属性


> align-items:
- 元素在侧轴上如何对齐 它设置的是元素间的关系
- 可选值：
    stretch     默认值 将元素的长度设置为相同的值
    flex-start  元素不会拉伸 沿着侧轴起边对齐
    flex-end    元素不会拉伸 沿着侧轴终边对齐
    center      居中对齐
    baesline    基线对齐


> align-content：   侧轴上的空白空间的分布
- 跟justify-content的可选值 的 效果是一样的
- 弹性容器上的属性 主要是用来控制元素的对齐方式的

- 穿插一个 弹性元素的样式
- align-self:   用来覆盖当前弹性元素上的align-items


> 弹性元素的样式：
> flex-grow:
- 指定弹性元素伸展的系数 默认值为0 不伸展 当父元素有多余的空间时 子元素如何伸展  父元素的剩余空间 会按照比例进行分配
<!-- 
    - eg：
    flex-grow:1         //平均分配剩余空间
 -->

- 假如父元素剩余空间为600
    li:nth-child(1){ flex-grow:1 }  100
    li:nth-child(2){ flex-grow:2 }  200
    li:nth-child(3){ flex-grow:3 }  300


> flex-shrink:
- 指定弹性元素收缩的系数
- 当父元素中的空间不足以容纳所有的子元素时 如何对子元素进行收缩 默认值是1 等比例进行收缩 0就是不收缩 也就是元素会溢出

- 缩减系数的计算方式比较复杂 缩减多少主要是根据缩减系数 和 元素大小来计算的
- 基本的理论就是元素越大缩减越多

- 假如父元素为500 每个li为200 父元素差了100
    li:nth-child(1){ flex-shrink:1 }  
    li:nth-child(2){ flex-shrink:2 }  
    li:nth-child(3){ flex-shrink:3 }  值越大收缩的越多


> flex-basis:
- 元素的基础长度 跟width一样 用它来指定元素的基础长度 width就没有用了
- 元素在主轴上的基础长度
    如果主轴是横向的 该值指定的就是元素的 宽度
    如果主轴是纵向的 该值指定的就是元素的 高度

- 默认值是auto 表示参考元素自身的高度 或 宽度 如果传递了具体的数值 就以该值为准

- flex-grow         弹簧能伸多长
- flex-shrink       弹簧能缩多短
- flex-basis        弹簧静止时的状态

- 这三个就像弹簧的三个状态


> 简写属性
- flex：
- 简写属性 可以设置弹性元素的所有三个样式
- 顺序： 增长 缩减 基础
- 预定义值：
initial 相当于      flex: 0 1 auto; 
auto    相当于      flex: 1 1 auto;
none    相当于      flex: 0 0 auto;     弹性元素没有弹性
<!-- 
    等分布局
    flex: 1 1 auto;
    flex:1  (flex-basis:0% flex-grow:1 flex-shrink:1);
 -->


> order:
- 决定弹性元素的排列顺序
- 有了它以后 就不用再通过结构去改变元素的顺序了 直接可以指定
<!-- 
    - eg：
    box1 box2 box3
    box1 {order:3}
    box2 {order:1}
    box3 {order:2}

    box2 box3 box1
 -->

-----------------------
### 标签
### 像素
- 屏幕是由一个个发光的小点构成的 一个点就是我们的像素
- 分辨率 就是屏幕中小点的数量

- 在前端开发中 像素要分两种情况谈论 CSS像素 和 物理像素
- 物理像素： 上述的分辨率就是物理
- CSS像素：  编写网页时 我们所用的像素都是CSS像素

    width:100px;


- 浏览器在显示网页时 需要将CSS像素转换为物理像素然后再呈现
- 一个CSS像素 最终 有几个物理像素显示 有浏览器决定
默认情况下 PC端：一个CSS像素 = 一个物理像素



### 视口(viewport)
- 视口就是屏幕中用来显示网页的区域
- 我们可以通过查看视口的大小 来观察CSS像素 和 物理像素的比值
- 一般看视口的时候 我们只看 宽度 不看 高度

- 原理：
- 网页中一个块元素的宽度 是 父元素的100% 所以只需要找到视口的子元素就可以了
- 视口的子元素就是html
- 先把浏览器的缩放功能重置到100% 直接点html标签 看右侧的盒模型
- 默认情况下 视口宽度 1920px 像素 这时候 视口宽度 和 物理像素 是一样的
- 此时 CSS像素 和 物理像素 是1:1

- 我们的浏览器 按钮ctrl + 滚轮 可以缩放大小 放大网页 视口的可视区域就变小了

- 放大两倍的情况下
- 视口宽度是 960px （CSS像素）
- 物理像素是1920px 物理像素是不会变的
- 此时CSS像素 和 物理像素 是1:2

    width:100px;
    height:100px;
    background-color:#bfa;
    - 此时CSS像素是100px 物理像素是200px 怎么确认 用截图工具去量 截图工具量到的都是物理像素

- 我们可以通过改变视口大小 来改变CSS像素和物理像素的比值

> 总结
- 我们可以先观察下 物理像素 然后再检查下开发者管理工具html的宽度 是否和物理像素一样
- 然后我们可以在显示设置中查看 显示比例是不是100%
- 这时候就能知道 物理像素 和 CSS像素的比值关系了

-----------------------

### 移动端
- 在不同的屏幕 单位像素的大小是不同的 像素越小屏幕会越清晰

https://material.io/resources/devices/
- 上述网站可以查询一部分手机的分辨率

- 智能手机像素点 远远小于 计算机的像素点 视网膜屏像素点不能被肉眼察觉 特别的小

    举个例子：
    24寸的显示屏    1920X1080
    i6 4.7寸屏      750X1334

- 问题：
- 一个宽度为900像素的网页 在i6中要如何显示呢？

// PC端的尺寸
.box1 {
    width:900px;
    height:100px;
    background-color: tomato;
}

- 然后在页面中打开 查看i6屏幕的情况 发现900px竟然还没有把i6的750 撑满

- 因为：i6的750像素 是物理像素 而900px是CSS像素 所以不能直接看900 和 750这两个数值 比值不一样
- 我们应该看的是 视口大小 我们看下 控制台里 Computed里现实的宽度 是980px

- 默认情况下 移动端的网页都会将视口设置为980像素（CSS像素）
- 以确保PC端的网站可以在移动端正常访问 如果网页大小超过980 移动端的浏览器会自动对网页进行缩放以完整的显示网页
其实就是当网页过宽的时候 视口会自动调整

- 以前比较早的时候 网页的宽度都不会超过1000px 一般都是980 960的宽度
- 所以移动端把视口设置为980 这样就可以达到一个效果 我随便打开一个网页 就能看到网页的全貌

- 所以大部分的PC端网站都可以在移动端正常浏览 但是往往都不会有一个好的体验

- 比如:
- 我们将网页的宽度设置为了980像素（CSS像素） 但是物理像素是750 （131%）
- 网页过小 没办法看

- 为了解决这个问题大部分网站都会为移动端设计一个网站 PC端访问是一个 移动端是一个
- 如果你的网站也要给移动端浏览 必须为移动端再设计一个网页

-----------------------

### 开发移动端页面
- 将网页的视口设置为完美视口 开发移动端 先写这句话
<meta name="viewport" content="width=device-width, initial-scale=1.0">

- 先说一个问题 比如 我写一个100px x 100px的盒子 在PC端看 和 在移动端看 大小不一样 移动端的小了 为什么？
- 移动端默认视口是980px（CSS像素）默认情况下 

- 移动端的像素比： 980 / 移动端宽度   （eg： i6   980 / 750 = 1.31）
- 如果在网页中直接编写移动端代码 这样在980的视口下 像素比是非常不好的 导致网页中的内容非常非常的小

- 所以在编写移动页面时 必须要确保有一个比较合理的像素比：
- 1个CSS像素 对应 2个物理像素   相当于 比PC端放大两倍    有的时候还可以 
- 1个CSS像素 对应 3个物理像素 

- 我们要写移动端页面时 第一件事就是调整网页的像素比 把像素比调整到一个比较合理的范围
- 调整像素比
- 我们可以通过改变视口大小 来改变CSS像素和物理像素的比值
- 比如i6 物理像素是750 那我把视口调成375 那是不是就是1 ： 2了

- 我们可以通过meta标签来设置视口的大小
- 设置视口大小 将网页的视口设置为完美视口
<meta name="viewport" content="width=device-width, initial-scale=1.0">
- name： 设置数据的名字 viewport视口
- content: 是设置多少 我们只考虑宽度 视口的宽度是width 高度不用考虑
<!-- 
    <meta name='viewport' content='width=100px' >
    // 把视口的大小设置为100px

    那现在的像素比是多少 
    100 / 750 等于 1 / 7.5 一个像素 等于 7.5个像素

    假如调整成200px 那像素比为
    200 / 750 等于 1 / 3.25 一个像素 等于 3.25个像素
 -->

- 每一款移动设备在设计时 都会有一个最佳的像素比 一般我们只需要将像素比设置为该值即可得到一个最佳的效果
- 比如： 我们看那个网站 https://material.io/resources/devices/ 的最后一列
- i6 最后一列是 2.0 也就是 1个css像素 对应 2个物理像素 xx / 750 = 1 / 2
<meta name='viewport' content='width=375px' >  这时候就能达到i6的最佳像素比

- 将像素比设置为最佳像素比的视口大小我们称其为完美视口 但是不同设备中完美视口的大小并不一样
- 上面那个网站 dpi那列就是完美视口的尺寸

- 所以 content中不能写固定的数值 要写上width=device-width
- device-width是一个网页中提供的一个变量 表示设备的宽度 也就是设备的完美视口

<meta name="viewport" content="width=device-width>
initial-scale=1.0 是初始化缩放是1倍

-----------------------

### 移动端的单位
- 不同设备的完美视口是不一样的 比如
    iphone6     完美视口是375
    iphoneX     完美视口是414

box1 {
    width:375px;
    height:100px;
}

- 在i6中中能完美全屏 但是在ix中就缺了一块
- 由于不同设备视口和像素比不同 所以同样的375个像素在不同设备下意义是不一样的
- 所以在移动端开发时 就不能再使用 px 来进行布局了

> vw
- 表示视口的宽度（viewport width）
- 100vw = 一个视口宽度   /   1vw = 1%视口宽度
- vw这个单位永远相当于视口宽度进行计算的

-----------------------

### vw的换算
- 设计图的宽度 750px 1125px 一般常见的移动端设计图宽度是这两个 最早都是参考苹果的屏幕去计算的 i6 的完美视口就是375 也就是说i6中一个css像素 对应 两个物理像素

    750  称之为 2倍图
    1125 称之为 3倍图
<!-- 
    为什么是倍数呢 正好是375不好么？ 如果我的图就是375的话 在移动端显示时放大2倍就是750 就会失真 
    所以我们的设计图干脆就是750 这样拿到的所有图都是2倍效果 这再拿到移动端里看时 就不会失真
    为什么现在都是3倍图呢？ 因为现在的屏幕越来越清晰了 现在可能3倍图才能满足一个大部分的情况
-->

- 设计图是750px 使用vw作为单位 那100vw是750px

    100vw = 750px


- 那假如我的需求是创建一个 48px x 35px 大小的元素 
- 注意 这只是图片的单位 这种设计图 放在移动端的网页里不能要求像素了 只能要求比例

    100vw = 750px 
    ↓
    1vw = 7.5px 
    ↓
    问: 50px 等于 ? vw 
    ↓
    50px / 7.5px = ? vw


> 还有一种简单的算法:
- 元素大小 / 设计稿宽度 * 100vw

-----------------------

### vw的适配
- 网页中字体大小最小是12px 不能设置一个比12px还要小的字体 0可以 其它的都不行
- 如果我们设置了一个小于12px的字体 则浏览器自动修正为12px


- 上面讲到 如果设计图是750px 100vw是视口的宽度 也就是750px
- 我们首先得知道1px = 0.1333333333333333vw    算法 100vw / 750px = 0.1333333333333333vw
- 假如我想创建 50px x 50px的框体 那么就需要用 0.1333333333333333px x 50 比较麻烦


- 所谓的vw的适配 就是指 让整个计算的过程并不那么麻烦
- 首先我们要回忆下 rem 这个单位

rem：
- 1rem = 1html的字体大小
- eg：

html {
    font-size:50px;
}

box1 {
    width:1rem;         这里就是50 x 50的大小的盒子
    height:1rem;
}

- 那假如：
html {
    font-size: 0.1333333333333333vw
    // 相当于font-size:1px;
}

- 那么我接下来 创建 50 x 50的盒子 是不是可以?
box {
    width:50rem;
    height:50rem;
    // 不行 因为网页中最小的字体就是12px 不够12px 会重置为12px
}


- 那我在这里再扩大40倍      那1rem = 40px
html {
    font-size: 5.3333vw
    // 相当于font-size:40px; 
}

- 接下来 创建一个 48 X 35 的盒子

box {
    width:48 / 40 = 1.2rem
    height:35 / 40 = 0.845rem
}

换句话说 就是代替0.133333 用了整数 去进行计算


- 总结：
    首先    要知道1px 等于 多少vw
    100 / 设计图宽度（750） = 单位结果
    然后    设置html标签内部的 font-size:
    font-size: 单位结果 X 40
    最后    计算实际尺寸时 用 xx px / 40 得出rem 


- 那40也不好计算啊 好算 我们可以用less来写

-----------------------

### 移动端页面的练习
- 重置样式表在移动端的意义不是那么大

1. 搭建项目
    1.1 创建style.less 在页面中link上 style.css
    1.2 在style.less中编写代码

2. vw的适配
html {
    // less中可以写公式  100 / 750 X 40
    font-size:100vw / 750 * 40;
}

// 也可以把设计图的宽度定义成变量
@total-width:750;
html {
    font-size:100vw / @total-width * 40;
}

3. 移动端没有hover

-----------------------

### 响应式布局
- 我们的网页根据不同的设备 或者 窗口大小呈现不同效果
- 使用响应式布局 可以使一个网页适用于所有设备

- 大公司很少用 但是响应式设计并没有我们想象的那么完美 我们再移动端看一个网页 和 在pc端的习惯是不一样的
沿用一个设计 没有两个设计体验好

- 现在网页像活了一样 好像知道浏览器窗口有多大
- 响应式布局的关键就是 媒体查询

> @媒体查询
- 通过媒体查询 可以为不同的设备 或 设备不同状态来分别设置样式

    不同设备：比如手机 计算机 打印机 在媒体查询这有屏幕的算一同一种设备
    不同状态：同一种设备有不同的状态 比如一个屏幕大 一个屏幕小 有的屏幕横着的 有的屏幕是竖着的

- 媒体查询 是CSS3里的一个特性

> 用法：
@media 查询规则{}

- 关键字
    only        让老的浏览器失效 处理兼容的问题
    and         同时满足多条规则
    ,           满足a生效 或者 满足b也生效
    not         取反

> 媒体属性：
- width (max min)
- 浏览器的窗口尺寸

- device-width (max min)
- 设备独立尺寸

- device-pixel-ratio(必须加-webkit-前缀) (max min)
- 像素比

- orientation     portrait竖屏
- landscape横屏
- 横竖屏切换

> 媒体类型：    指的就是设备类型
    all         所有设备
    print       打印设备
    screen      带屏幕的设备
    speech      屏幕阅读器

    projection     手持设备
    tv             电视
    braille        盲文触觉设备
    embossed       盲文打印机
    speech         “听觉”类似的媒体设备
    tty            不适用像素的设备

<!-- 
    @media all{        无论在什么设备 背景颜色都是bfa 我的样式会对所有设备都生效
        //print 在打印的时候才会打印出绿色 还可以写多个设备 print, screen
        body {
            backgroud-color:#bfa
        }
    }
 -->

- 可以在媒体类型前添加一个only 表示只有。 only的使用主要是为了兼容一些老版本的浏览器
@media only screen {            
    body {
        background-color:#bfa;
    }
}


> @媒体的特性：
- width：   视口的宽度      一般情况下不管宽度只管高度
- height：  视口的高度

- min-width     视口的最小宽度  >500 样式生效
- max-width     视口的最大宽度  <500 样式生效

- eg：
media (width:500px){        //当视口是500px时 样式生效
    background-color:#bfa;
}

media (min-width:500px){    //当视口 > 500px时 样式生效
    background-color:#bfa;
}

- 样式切换的分界点 我们称之为断点 也就是网页的样式会在这个点时发生变化
- 布局上大的变化 需要满足某一个点的（横向排列 纵向排列）

- 一般比较常用的断点
    小于768     (max-width:768)     超小屏幕    一般都是手机
    大于768     (min-width:768)     小屏幕      
    大于992     (min-width:992)     中型屏幕    ipad       
    大于1200    (min-width:1200)    大型屏幕    电脑 

- 用 , 号连接   表示或
- 用 and 连接   表示与  要求同时满足 在 a and b之间的范围
- 用 not 连接   表示非  除了后面匹配的

-eg：
// 大于500px 或者 小于700px 样式就会生效
media (min-width:500px),(max-width:700px) {
    background-color:#bfa;
}      

// > 500px  和  <700px  同时要求满足 
media (min-width:500px) and (max-width:700px) {
    background-color:#bfa;
}

// 必须是屏幕 在500-700之间 
media only screen and (min-width:500px) and (max-width:700px) {
    background-color:#bfa;
}

-----------------------

### 响应式网站的练习   --- 美图网站

- 用响应式设计网站的时候 有两个原则：
1. 移动端优先
- 因为是响应式设计 就要有屏幕比较宽的情况 和 屏幕比较窄的情况 在写代码的时候 可以先把移动端的情况写出来 然后再写pc端的

- 2. 渐进增强
先写移动端的东西 然后确保在移动端内可以正常显示 然后一点点的增强pc端的功能
- 所以在写这种布局的代码时 先以最小的情况作为参照去写代码

> 技巧：
- 定位元素布局 背景撑满视口
    left:0
    right:0
    top:0
    bottom:0
- 假如width 或者 height为auto就是优先调整它们 背景就是撑满全屏

- 做完移动端的东西时 找断点 看看什么时候布局发生改变的 768px
- 然后 直接在上面的代码 下面写 媒体查询
@media only srceen {
    // 当大于768时发生变化
    @media (min-width:768px){

    }
}

-----------------------

### 技巧

> 隐藏一个元素
开启绝对定位 使用偏移量 使其移出父元素 父元素overflow:hidden 移出可视区域

> 禁止屏幕滚动条
html, body{
    height:100%; 
    overflow:hidden
}

> body也是个容器 需要被内容撑开
当这么写时,是先将body的高度设定为100% 然后靠body撑开html元素一层一层向上撑开
html, body {
    height:100%; 
}

> 图片垂直水平居中
水平方向:
eg:
.test {
    text-align:center;
}
img {
    display:inline-block;
}

> 垂直水平方向:
eg(或者position 0000 margin auto):

.test {
    text-align:center;
    height:100%;
}

.test:after {
    content:'';
    display:inline-block;
    height:100%;
    vertical-align: middle;
}

img {
    vertical-align: middle;
}

- 原理:
- 我们在div里添加了一个添加了一个伪元素 其实这个伪元素没有宽度
- 高度是100%的 这个伪元素相当于是img的兄弟元素 然后把它们两个的verticalalign全都设置为middle
- 伪元素为inline-black img也是个替换元素相当于inline-black 相当于两个文字;额
img就会垂直居中

---------

### IE6下 fixed失效 绝对定位模拟固定定位
### 初始包含块
### 绝对定位为什么会跟着滚动条跑

> fixed在移动端的问题很大 因为移动端的浏览器都比较老 所以经常会用到 使用绝对定位来模拟固定定位

- html身上永远不会出现滚动条,如果html body当中只有一个元素身上有overflow属性 滚动条出现在html的上一层 可以理解为document
- html 和 body 身上同时有overflow auto属性滚动条才会在body身上

- 那我们延伸下 怎么禁掉html上一层的滚动条, 很简单 html 和 body两个元素的身上 任意一个元素身上有overflow:hidden就可以

html, body {
    height:100%;        先让html的高度为100% body继承html的高度
    overflow:hidden
}

- 既然现在document(html上一层,也可以理解为视口), html, body身上都没有滚动条了 我们拿div进行下模拟

<div class='wrap'>      //全局包裹器
    //当子元素高出父元素的高度 父元素身上就会有滚动条
    <div class="test" style='height:3000'></div>
</div>


> 初始包含块: 是一个视窗大小的矩形
box {
    开启绝对定位
}

<body style='height:3000'>
    <div class='box'></div>
</body>

- 思考一下 为什么绝对定位的元素 在拖动滚动条的时候 它的位置会跑
- 绝对定位的元素需要找包含块 需要找离它最近开启定位的祖先元素,没有的话找到初始包含块,初始包含块是一个视窗大小的矩形 位置和视窗位置一样

- 那为什么现在拖动滚动条的时候 box会跟着一起走?说明初始包含块的位置变了
- 因为初始包含块跑了 它才跟着跑 初始包含块已经跑到上面去了

- 所以初始包含块 和 视口 不是同一个东西 只是开始默认情况下 它们的大小位置相同
- 一旦滑动系统滚动条 动的是初始包含块,视口始终在一个位置 所有的元素都要跟着初始包含一块跑

- 返回来说说这个

html, body {
    height:100%;        
    overflow:hidden
}

.wrap {
    height:100%;
    /* 让滚动条出现在wrap身上 */
    overflow:auto;
}
<body>
    <div class='box'></div>
</body>

- 禁用了系统的滚动条, 滚动条出现在wrap身上, 现在我拖动滚动条的时候, 初始包含块动不动? 不动因为现在视口和初始包含块在一起啊 影响不到初始包含块

.test {
    开始绝对定位
}

<body style='height:3000'>
    // 我添加一个元素
    <div class='test'></div>
    <div class='box'></div>
</body>

- 这时候test div就是一个模拟的固定定位, 因为这时候它参考的是初始包含块 而我们让初始包含块不再移动了

- 总结:
html, body {                1, 禁用系统滚动条
    height:100%;
    overflow:hidden;
}

.wrap {
    overflow: auto;         2, 让滚动条出现在全局包裹器上
    border:1px solid;
    height:100%;            3, 给全局包裹器一个高度
}

.test1 {                    4, 给要固定元素的身上 开启 绝对定位
    position: absolute;
    left:100px;
    top:100px;
    width:200px;
    height:200px;
    background-color:cadetblue;
}

<div class='wrap'>
    <div class="test1"></div>
    <div class="test" style='height:3000px'></div>  5, 子元素撑开wrap高度(溢出才有滚动条不是)
</div>

---------

> 控制隐藏 和 显示
visibility:visible / hidden;
display:none; (占位置,下面的元素会上来 注意  重绘重排)
opacity:1 / 0; (性能更好, 但是还是有些问题)


> 文本等行内元素要设置居中的话 在他们的父元素上设置关于居中的属性 而不是这个行内元素本身


> h1标签
- 在网页中的重要性 仅次于title 一般情况下一个页面只有一个h1 跟seo有关系
- 一般情况下 标题标签只会使用h1 - h3, h4-6搜索引擎不太会关注它

- 把一些重要的东西放在 h1 标签中是一个很好的选择


> 多重边框 → 单线边框
给table加的属性：border-spacing:;
- 指定边框之间的距离

border-collapse: ;
- 设置边框的合并


> 解决高度塌陷 和 外边距重叠
.clearfix::before,
.clearfix::after {
    content:'';
    display:table;      
    clear:both;
}
- inline-block 也可以, 但是inline-block即使是空串 也会占一行 把inline-block当做一个字就好了 所以最好的办法是table 没有内容也能分开


> 元素垂直水平方向居中
- 利用定位元素后 布局等式的原理
{
    position:absulute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
}



- 浏览器在渲染html元素的时候 会把html节点自上而下解析成一个DOM树 而伪类 伪元素不存在于DOM树里面 DOM树里是一个个的节点 而伪类是一种状态
- CSS设计伪类和伪元素 就是为了让CSS能够选择上DOM树以外的元素

@
:visited 是访问过的链接 它判断链接是否访问过很简单 就是看 href='地址' 和 浏览器地址栏上的地址一样不一样 一样就代码访问过

\\注意：
<a href="javascript:;"></a> 和 :visited 会有冲突

@
\\显式关联
<label for=""></label>
放入label标签中的 会被关联到一起  label标签本身是一个行内元素

\\隐式关联
<label>
    <input type="radio" name='sex'>
    测试文字
</label>

> ↑ 解析：这是个单选表单正常效果只能点击按钮时才会被选中 现在文本和表单被放入到label标签中 点击文本按钮也会被选中


### 关于float脱离文档流 提升层级的问题
> 浮动float分为背景与内容, 属于“半层”飘出。
给一个元素浮动就相当于将它的背景浮动起来了
我们想象一下 左边是蛋糕坯  右边是有厚厚奶油的蛋糕坯 浮动就是指左边的蛋糕坯浮动到了奶油层的位置 它跟奶油是一层 也就是说的半层飘出

float       提升半层,一半在文档流中 一半提升
relative    提一层, 只不过在文档流中有一模一样的副本在文档流中占据位置 这个位置我要占住
其它元素不能把我挤掉,但是我不在文档流中渲染 我在上一层中渲染
z-index     为1的时候比上面的层级都多



### 浏览器 读取 选择器的顺序：从右往左
如果从左往右 浏览器不能只匹配一次就把元素成功匹配到
如果从右往左 就可能一次成功匹配到元素
eg：
div ul li .test {}
如果从左往右    就要把页面中的li全部拿到
如果从右往左    只要找.test上层的li



### 声明的优先级
优先级不是选择器的 css里的优先级都是声明的优先级 只不过选择器会对声明的优先级产生影响
选择器的特殊性最终都会授予给其对应的声明 如果多个规则与同一个元素匹配 而且有些声明互相冲突时 特殊性越大的越占优势

@ 选择器的特殊性：
选择器的特殊性由选择器本身的组件确定 特殊性值表述为4个部分 如    0,0,0,0

一个选择器的具体特殊性如下特性：
    1.对于选择器中给定的ID属性值 加 0,1,0,0
    2.对于选择器中给定的各个类属性 属性选择 或伪类 加 0,0,1,0
    3.对于选择器中的给定的各个元素和伪元素 加0,0,0,1
    4.通配符选择器的特殊性为0,0,0,0
    5.结合符对选择器特殊性没有一点贡献
    6.内联声明的特殊性都是1,0,0,0
    7.继承没有特殊性
<!-- 特殊性 1,0,0,0 大于所有以0开头的特殊性(不进位) -->
    
<!-- 注意：id选择器和属性选择器
div[id="test"]（0,0,1,1） 和 #test（0,1,0,0） -->

<!-- 可以在某个样式后添加 !important 则该样式将获得最高的优先级 设置超过内联样式 最高优先级 但在开发中一定要慎用 尽量不用 -->


@ 继承
继承没有特殊性 甚至连0特殊性都没有, 0特殊性要比无特殊性来的强

@ 来源
css样式的来源大致有三种
    创作人员
    读者
    用户代理   
    
@ 权重：
    读者的重要声明
    创作人员的重要声明
    创作人员的正常声明
    读者的正常声明
    用户代理的声明

@ 层叠
1.找出所有相关的规则 这些规则都包含一个选择器
2.计算声明的优先级
    先按来源排序
    在按选择器的特殊性排序
    最终按顺序

### 文本新增样式
> opacity         非继承属性 - 改变透明度
> rgba

> text-shadow     非继承属性 - 文字阴影   - 默认值:none
可以添加多层阴影 一层阴影 和 一层阴影之间用逗号隔开, 第一层阴影在最上面
    text-shadow:color x y blur, color x y blur(另一层阴影)

> -webkit-text-stroke     文本描边
使用的时候要加前缀, 这只是webkit内核里才有的东西
    -webkit-text-stroke:4px pink;

> direction       文本方向    默认值 ltr (需要配合unicode-bidi:bidi-override使用)
direction:rtl;
unicode-bidi:bidi-overrdie;

> text-overflow:ellipsis;     文本溢出怎么处理属性



### filter 过滤器  整个元素模糊>
#wrap{
    filter:blur(10px);      模糊函数
}


### 盒模型新增属性
> box-shadow:x y b(模糊程度) f(阴影面积) c inset outset
阴影也也可以有多个


> -webkit-box-reflect: (倒影的方向)(倒影和图片之间的距离)(渐变)
倒影的方向: above below left right
倒影的距离:长度单位
渐变:第三个值
只能在谷歌里面用...


> resize:   配合overflow:auto配合使用;
both:       允许用户在水平和垂直方向上调整元素的大小
vertical:   允许用户在垂直方向上调整元素的大小
horizontal: 允许用户在水平方向上调整元素的大小


> box-sizing:border-box
- 用来设置盒子尺寸的计算方式（width 和 height的作用）
跟ui的设计稿有关 一样的话就改成box-sizing:border-box;



### 新增的UI样式
> border-radius     圆角 不可继承
一个椭圆要定义两个半径,长半轴 短半轴
椭圆:
border-radius:40px/60px     椭圆的x 和 y的值 定义了一个椭圆
> 移动端的开发圆角用px, 百分比的话 旧版本可能不支持(ios5 webkit532)



### 边框图片
配合 border:10px solid 要先指定线粗 和 样式
> border-image-source:url()
- 定义使用一张图片来代替边框样式,如果为none 仍然使用border-style
- 默认图片在四个角

> border-image-slice
- 将 border-image-source链接的图片明确的分割为9个区域
- 4个角, 4边, 中心区域并可指定偏移量 值的百分比参照于图片本身 默认值为100%
- 使用fill关键词时将会被作为background-image
- eg:
<!-- 统一一个数值 -->
border-image-slice:33.33%
<!-- 使用四个数值, 按照上右下左的顺序 分别切图片的4个边的指定百分比 -->
border-image-slice:10% 20% 30% 40%;

> border-image-repeat
- 可选值:
repeat 平铺
round  完整平铺

> border-image-width
边框整体的大小是border-width来决定, border-image-width是控制图片边框的大小

> border-image-outset
边框在原位置, 可以通过这个属性来往外扩展边框的位置



### 响应式图像
- <img>标签是用来插入图像的 
```html
<img src="foo.jpg">
```

- 这种情况下默认pc sp端插入的都是同一张图片 这样做有3大弊端:

- 1. 体积:
- pc端显示的是大尺寸的图片 文件体积就会大
- sp端显示的是小尺寸的图片 文件体系就会小

- 如果能分开处理的话可以节约带宽 加速网页渲染


- 2. 像素密度:
- 1x: pc端一般都是*单倍的像素密度*
- 2x: sp端一般都是*多倍的像素密度*, 即多个像素合成为一个像素 称为 Retina 屏幕。
- 同一张图片的话 图像文件很可能在桌面端很清晰 放到手机上会有点模糊 因为1个像素被扩大为多个像素了。


- 3. 视觉风格:
- 桌面显示器的面积较大 图像可以容纳更多细节。手机的屏幕较小 许多细节是看不清的 需要突出重点。
- 手机图片经过裁剪以后 更突出图像重点 明显效果更好。


> <img srcset> srcset属性
- 作用:
- 用来指定多张图像 适应不同像素密度的屏幕。浏览器根据当前设备的像素密度 选择需要加载的图像。
- srcset = "图片路径 + 像素密度描述符" 多个值的情况下 中间使用 , 进行分隔

```html
<img 
    srcset="foo-320w.jpg,
            foo-480w.jpg 1.5x,
            foo-640w.jpg 2x"
    src="foo-640w.jpg">
```

- srcset属性给出了三个图像 URL 适应三种不同的像素密度。
- 当都没有匹配的情况下 使用 src 指向的url 默认的图片

**要点:**
- 1x 表示单倍像素密度 可以省略。


- 上面分别解决了 像素密度 和 屏幕大小的适配 但是如果要同时适配不同像素密度、不同大小的屏幕 应该怎么办呢？


> <picture>
- 它是一个容器标签 内部使用<source>和<img> 指定不同情况下加载的图像。

```html
<picture>
  <source media="(max-width: 500px)" srcset="cat-vertical.jpg">
  <source media="(min-width: 501px)" srcset="cat-horizontal.jpg">
  <img src="cat.jpg" alt="cat">
</picture>
```

- 上面代码中 <picture>标签内部有两个<source>标签和一个<img>标签。
- <source>标签
    media属性: 给出媒体查询表达式
    srcset属性: 就是<img>标签的srcset属性 给出加载的图像文件。sizes属性其实这里也可以用 但由于有了media属性 就没有必要了。

- 浏览器按照<source>标签出现的顺序 依次判断当前设备是否满足media属性的媒体查询表达式 
- 如果满足就加载srcset属性指定的图片文件 并且不再执行后面的<source>标签和<img>标签。

- <img>标签是默认情况下加载的图像 用来满足上面所有<source>都不匹配的情况。
- 上面例子中 设备宽度如果不超过500px 就加载竖屏的图像 否则加载横屏的图像。



>  <figure>
- 使用 <figure> 元素标记文档中的一个图像：
- 标签规定独立的流内容（图像、图表、照片、代码等等）
- 元素的内容应该与主内容相关 同时元素的位置相对于主内容是独立的。如果被删除 则不应对文档流产生影响。
- <figcaption> 元素被用来为 <figure> 元素定义标题。

> 格式
- <figure>
    <figcaption>figure元素标题</figcaption>
    内容
  </figure>

- <figure>
    内容
    <figcaption>figure元素标题</figcaption>
  </figure>


<!-- 
    <figure class="calc-pic">
        <figcaption>＜ ご利用期間 ＞</figcaption>
        <img
            src="/assets/img/area/event/common/ico_01_03.svg"
            alt="新車：ご利用期間"
            width="100"
            height="102"
            loading="lazy">
        <p class="calc-caption">
            <strong>3年/5年/7年</strong><br class="u-show--pc">から選択
        </p>
    </figure>
-->


### CSS属性
> -webkit-font-smoothing: antialiased;  /*chrome、safari*/
> -moz-osx-font-smoothing: grayscale;   /*firefox*/
- 这个属性可以使页面上的字体抗锯齿,使用后字体看起来会更清晰舒服。
<!-- 
    它有三个属性： 
    none                    对低像素的文本比较好 
    subpixel-antialiased    默认值 
    antialiased             抗锯齿很好 
 -->