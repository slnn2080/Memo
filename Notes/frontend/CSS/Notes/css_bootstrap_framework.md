# BootStrap相关

1. 将页面均分为 12份
2. bootstrap基于jQ
3. 响应式布局

<br><br>

### bootstrap引入
```s
https://v3.bootcss.com/getting-started/
```

1. 下载BootStrap后, 把css js fonts文件夹放入项目中
2. 引入BootStrap的css样式
3. 依次引入jQ文件和BootStrapjs文件 (需要jq)
```html
<link rel="stylesheet" href="css/bootstrap.min.css">
<script src='js/jquery.min.js'></script>
<script src='js/bootstrap.min.js'></script>
```

<br><br>

## 布局容器 和 栅格网格系统
我们在开发的时候 最先开始的就是要做布局 有两种方案
1. 固定宽度 两侧有留白 
2. 完整宽度(流体容器 浏览器有多宽容器就有多宽)

<br>

### 固定容器
支持响应式布局的容器

```html
<div class='container'>   
```

**利用了媒体查询:**  
- 当 >= 1200px =  width:1170px (1140+槽宽)
- 当 >= 992px(小于1200) = width:970px (940+槽宽)
- 当 >= 768px(小于992) = width:750px (720+槽宽)
- 当 < 768px = width:auto

```css
@media (min-width: 1200px)
.container {
  width: 1170px;
}

@media (min-width: 992px)
.container {
  width: 970px;
}

@media (min-width: 768px)
.container {
  width: 750px;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
```

<br>

### 流体容器
用于100%宽度, 占据全部视口

```html
<div class='container-fluid'>     
```

```css
{
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
```

<br>

### 总结:
我们所有的布局都写在这个div容器里面

<br><br>

## 栅格系统
默认会把栅格分成12份, 超过12自动换行 移动端用的比较多一些, pc端可以用

```html
<div class="container">
  <div class="row">
    <div class="col-lg-10"></div>
    <div class="col-lg-2"></div>
  </div>
</div>
```

<br>

### 结构
container中有行, 有列, 列是根据当前设备的大小
```css
.container > .row > .col
```

在.row中可以添加.column, 只有列才可以作为行容器的直接子元素, 但列数之和不能超过平分的总列数, 比如12, 大于12则自动换到下一行

<br>

- xs 超小屏 (自动)
- sm 小屏   (<750px)
- md 中屏   (<970px) 我们使用这个比较多 我们屏幕会按md去显示效果
- lg 大屏   (>1170px)

<br>

### 列的语法:  class='col-md-数字'
数字, 12是全屏 1是 1/12

<br><br>

## bootstrap中的媒体查询

### 小屏幕（平板，大于等于 768px
```css
@media (min-width: @screen-sm-min) { ... }
```

<br>

### 中等屏幕（桌面显示器，大于等于 992px） 
```css
@media (min-width: @screen-md-min) { ... }
```

<br>

### 大屏幕（大桌面显示器，大于等于 1200px） 
```css
@media (min-width: @screen-lg-min) { ... }
```

<br><br>

## 列偏移 offset
如果我们不希望相邻的两个列紧靠在一起, 但又不想使用margin或者其它技术手段, 这个时候就可以使用列偏移

当偏移的列后面还有其他的列 其他的列也会跟着一起动

<br>

### 使用方式 class='col-md-offset-数字'
具有这个类名的列就会向右偏移, 例如你在列元素上添加 'col-md-offset-8' 表示该列向右移动8个列的宽度

要保证列与偏移列的总数不超过12, 不然会导致列断行
```html
<div class="col-md-8 col-md-offset-2 test8">8</div>
```

<br><br>

## 列排序  pull(往左) / push(往右)
将该列设置为浮动 并控制浮动位置(1/12为单位) 列排序其实就是改变列的方向, 就是改变左右浮动, 并且设置浮动的距离, 在bootstrap框架的网格系统中是通过

它是浮动并不会影响该列后面的列 设置会覆盖后面的列

代码是从上往下解析的 所以 后面的会覆盖前面的
```html
<div class="row">
  <div class="col-md-1 col-md-push-1 test4">1</div>
  <div class="col-md-1 test8">1</div>
</div>
```

<br><br>

## 列嵌套
我们正常情况下 一行是被分为12列的 里面的每一列也可以再均分为12列 一个列中添加一个或者多个行(row容器), 然后在这个行容器中插入列
```html
<div class="container">
  <div class='row'>
    <div class="col-md-6 test4">6</div>
      <div class="col-md-6 test8">
        <div class="row">
          <div class="col-md-6">我是嵌套列中的6</div>
          <div class="col-md-6">我是嵌套列中的6</div>
        </div>
    </div>
  </div>
</div>
```

<br><br>

## 常用样式

### 标题
bootstrap对标题做了一定的处理, 为了让别的元素也能拥有``<h1-6>``的效果, 它创建了 **class='h1 - 6'**
```html
<h1><h1>   等同于   <p class='h1'></p>
```

<br>

### 副标题
``<small></small>``包裹起来的部分就是副标题 同时还创建了 **class='small'**
```html
<small></small>    等同于    <p class='small'></p>
```

<br>

### 段落
排版中另一个重要元素之一, 通过 .lead 来突出强调内容(其作用就是增大文本字号, 加粗文本) 而且对行高和margin也做了相应的处理, 可以使用以下标签突出样式处理
```html
<p class='lead'>我是测试文本</p>
<p>我是正常的p标签</p>
```

还有一些提供突出显示的标签
```html
<small>         小号字
<b> <strong>    加粗
<i><em>         斜体
```

<br>

### 强调
bootstrap中定义了一套类名, 这里称其为强调类名, 这些强调类都是通过颜色表示强调

- .text-muted  提示  使用浅灰色(#999)
- .text-primary  主要  使用蓝色(#428bca)
- .text-success  成功  使用浅绿色(#3c763d)
- .text-info  通知信息  使用浅蓝色(#31708f)
- .text-warning  警告  使用黄色(#8a6d3b)
- .text-danger  危险  使用褐色色(#a94442)

<br>

### 对齐效果
为了简化操作, bootstrap通过定义四个类名来控制文本的对齐风格

- .text-left
- .text-right
- .text-center
- .text-justify

<br>

### 列表
- .list-unstyled  去点列表
- .list-inline  把垂直列表换成水平列表 而且去掉项目符号, 保持水平显示 为水平导航而生
```html
<ul class='list-inline'>
```

- .dl-horizontal   制作水平定义列表, 当文本过长显示...(最大是160px)
```html
<dl>            相当于ul
    <dt>        标题
        <dd>    内容
```

<br>

### 表格
B为表格提供了1种基础样式和4中附加样式以及1个支持响应式的表格, 在使用B的表格过程中, 只需要添加对应的类名就可以得到不同的表格风格

**基础样式:**  
- .table   基础表格

<br>

**附加样式:**
- .table-striped  斑马线表格(隔行灰色)
- .table-bordered  带边框的表格
- .table-hover  鼠标悬停高亮的表格
- .table-condensed  紧凑型表格, 单元格没内距或内距较其他表格的内距小

<br>

**tr th td样式:**   
提供了5中不同的类名, 每种类名控制了行的不同背景颜色
- .active  将悬停的颜色应用在行或者单元格上
- .success  表示成功的操作
- .info  表示信息变化的操作
- .warning  表示一个警告的操作
- .danger  表示一个危险的操作


<br>

**可以连续应用类名:**  
```html
<table class='table table-striped table-bordered'>
  <tr class='info'>
```

<br><br>

## 表单
表单主要功能是用来与用户做交流的一个网页控制, 良好的表单设计能够让网页与用户更好的沟通, 表单中常见的元素主要包括: 文本输入框, 下拉选择框, 单选按钮, 复选按钮, 文本域和按钮等

<br>

### 表单控件
默认占一整行, 想要调节要使用 栅格系统 表单的长度都是通过栅格系统来控制的

- .form-control        
```html
<input type="text" class='form-control'>
```

- .input-lg    (较大)
- .input-sm    (较小)
```html
<!-- 上面两个用来控制表单控件的大小 效果就是高度有变化 -->
<input type="text" class='form-control input-lg input-sm'>
```

<br>

### 下拉选择框 select
multiple='multiple' 多行选择设置
```html
<select name="" id="" class='form-control'>
  <option value="">请选择水果</option>        // 第一个写提示文字
  <option value="">香蕉</option>
  <option value="">橘子</option>
</select> <br><br>
```

<br>

### 复选框 checkbox  单选框 radio
样式上没有太多的区别, 有一些微调 支持垂直和水平方向的显示
- .checkbox            垂直显示
- .checkbox-inline     水平显示
- .radio               垂直显示
- .radio-inline        水平显示

和复选框一样, 只是类名改成radio 垂直用div 水平用label

<br>

- 垂直方向使用 ``<div class='checkbox'``> 包裹
- 水平方向使用 ``<label class='checkbox-inline'>`` 包裹
```html
<!-- 类名是加在div上面的 要用div来进行包裹 -->
<div class="checkbox">
  <label><input type="checkbox">学习</label>
</div>


<!-- 水平用label  垂直用div -->
<label for="" class='checkbox-inline'>
  <input type="checkbox" name="" id=""> 游戏
</label>
```

<br>

### 按钮
使用 button 实现 一般都是基础样式和附加样式同时使用, 附加样式是颜色上的变化

- .btn 基础样式
- .btn-danger primary info success default warning link   附加样式
```html
<button class='btn'>按钮</button>
<button class='btn btn-danger'>按钮</button>
<button class='btn btn-primary'>按钮</button>
<button class='btn btn-info'>按钮</button>
<button class='btn btn-success'>按钮</button>   
<button class='btn btn-default'>按钮</button>   透明感觉
<button class='btn btn-warning'>按钮</button>   黄色
<button class='btn btn-link'>按钮</button>      没样式 移入有下划线
```

<br>

**多标签支持:**  
也可以在``<div>`` 和 ``<a>``上添加类名 ``<input type='submit'>`` ``<span>``
```html
<a href="" class='btn btn-danger'>按钮</a>
```

<br>

**按钮大小:**
- .btn-lg
- .btn-sm
- .btn-xs

<br>

**按钮的禁用**  
只是在样式上禁用了, 不是真正的禁用了按钮
- .disabled

<br>

### 表单布局
基本的表单结构是B自带的, 个别的表单控件自动接收一些全局样式, 下面列出了创建基本表单的步骤

1. 向父``<form>``元素添加 role='form'
2. 把标签和控件放在一个带有class='form-group'的``<div>``中 这是获取最佳间距所必须的
3. 向所有文本元素``<input> <textarea> <seclect>`` 添加class='form-control'

<br>

- 水平表单  .form-horizontal 配合B框架的网格系统
```html
<form action="" class='form-horizontal' role='form'>

</form>


<!-- 水平表单 -->
<form action="" class='form-horizontal' role='form'>
    
  <!-- 表单中的表单元素组 -->
  <div class="form-group">

    <!-- control-label 加上它label中的文字会自动垂直居中 -->
    <label for="uname" class='control-label col-md-3'>姓名</label>
    <div class='col-md-4'>
      <input type="text" id='uname' class='form-control'>
    </div>

  </div>

</form>
```

<br>

### 总结
不用栅格系统成套的出现, 单独给目标元素包一层div div上col-md-* 就可以控制这个div的宽度

- 水平表单  .form-inline
一般都是网页的最上方有个用户名和登录
```html
<form class='form-inline'>
  <div class='form-group'>
    <label for='uname'> 姓名 </label>
    <input type='text' id='uname' class='form-control'>
  </div>

  <div class='form-group'>
    <label for='uname'> 姓名 </label>
    <input type='text' id='uname' class='form-control'>
  </div>
</form>
```

<br>

### 缩略图 和 面板
缩略图在电商类的网站很常见, 最常用的地方就是产品列表页面, 缩略图的实现就配合网格系统一起使用, 同时还可以让缩略图配合标题 描述内容 按钮等

字体图标可以上菜鸟教程里面找B 然后找字体图标

要配合网格系统 比如我们一行有4个缩略图 那么col-md-3
```html
<span class='glyphicon glyphicon-heart'>

<div class="row">

  <div class="col-md-3">

    <!-- 这个控制外层的边框 -->
    <div class="thumbnail">
      <img src="../JQ/images/images/search_01.jpg" alt="...">
      <h3>高圆圆</h3>
      <p>出生于北京市, 中国内地影视女演员, 模特</p>
      <button class='btn btn-default'>
        <span class='glyphicon glyphicon-heart'></span>喜欢
      </button>
      <button class='btn btn-info'>
        <span class='glyphicon glyphicon-pencil'></span>评论
      </button>
    </div>

  </div>

</div>
```

<br>

### 面板
默认 .panel 组件所做的只是设置基本的边框(border) 和 内补(padding) 来包含内容 效果就是一个包围框, 上面和下面分开

- .panel  基本的边框

- .panel-default  默认样式
  - warning success info danger 等等

- .panel-heading  面板头
- .panel-body  面板主体
```html
    <div class="container">
        <div class="panel panel-warning">
        <div class="panel-heading"> ...........  </div>
        <div class="panel-body">...........</div>
        </div>
    </div>
```

<br><br>

## Bootstrap 插件

### 导航
就是列表

1. 接本样式: .nav 与 .nav-tabs .nav-pills 组合制作导航
2. 分类
  - 2.1 标签型(nav-tabs) 导航
  - 2.2 胶囊型(nav-pills) 导航
  - 2.3 堆栈  (nav-stacked) 导航
  - 2.4 自适应(nav-justify) 导航
  - 2.5 面包屑(breadcrumb) 单独使用样式 不与nav一起使用, 直接加入到ul ol中即可, 一般用于导航, 主要起的作用是告诉客户现在处于页面的位置(当前位置)

3. 状态
  - 3.1 选中状态 active 样式
  - 3.2 禁用状态 disable

4. 二级菜单

<br>

### 步骤
1. 指定ul为nav 且选择nav的类型
```html
<ul class='nav nav-tabs'>
```


2. 指定选中状态
```html
<li class='active'>
```

3. 内部要用``<a>``
```html
<li><a></a></li> 
```

<br>

### 分页导航
分页随处可见, 分为页面导航 和 翻页导航

**页码导航**
```html
<ul class='pagination'>
```
```
pagination-lg
pagination-sm
```

<br>

**翻页导航**
```html
<ul class='pager'>

<ul class='pagination'>
  <li class='active'><a>首页</a></li>
  <li><a>我的</a></li>
  <li><a>关于</a></li>
</ul>
```

<br>

### 下拉菜单
1. 使用一个类名为 dropdown 或 btn-group 的div 包裹整个下拉框
```html
<div class='dropdown'></div>
```

2. 默认向下dropdown 向上弹起加入 .dropup即可
3. 使用button作为父菜单 使用类名 dropdwon-toggle 和 自定义 data-toggle属性(属性值就是包裹div的className)
```html
<button type='button' class='btn btn-default dropdwon-toggle' data-toggle='dropdown'> </button>
```
4. 在button中 使用font 制作下拉箭头
```html
<span class='caret'></span>
```

5. 下拉菜单项使用一个ul列表, 并且定义一个类名为'dropdown-menu'
6. 分组分割线: ``<li class='divider'>`` 来实现添加下拉分割线的功能
7. 分组标题: ``<li class='dropdwon-header'>`` 来实现分组的功能
8. 对齐方式
  - 8.1 dropdwon-menu-left
  - 8.1 dropdwon-menu-right

9. 激活状态 .active 禁用状态 .disabled