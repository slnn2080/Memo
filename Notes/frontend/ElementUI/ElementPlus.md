# elementPlus 弹窗的问题
一些有弹出框的组件, 会报下面的问题 我们可以给 支持 :popper-options 标签属性的元素 追加如下的设置
- el-dropdown
- el-select
```s
tooltip.vue:93 Popper: Detected CSS transitions on at least one of the following CSS properties: "transform", "top", "right", "bottom", "left". 

Disable the "computeStyles" modifier's `adaptive` option to allow for smooth transitions, or remove these properties from the CSS transition declaration on the popper element if only transitioning opacity or background-color for example. 

We recommend using the popper element as a wrapper around an inner element that can have any CSS property transitioned for animations.


# 参数网站
https://blog.51cto.com/echohye/6195171
```

```html
<el-select
  :popper-options="{
    modifiers: [
      { name: 'computeStyles', options: { adaptive: false } }
    ]
  }"
>
  <el-option label="选项1" value="1" />
</el-select>
```

<br><br>

# 暗黑模式
1. 入口文件引入
```js
import 'element-plus/theme-chalk/dark/css-vars.css'
```

2. 暗黑模式就是给html标签添加 ``class='dark'`` 我们有两种实现方式
  - vueuse - useDark
  - dom操作
```js
// 方式1: 我们给switch标签绑定 change事件
const changeDark = () => {
  const html = ducoment.documentElement
  // 收集到用户选择的boolean值
  dark.value
    ? html.className = 'dark'
    : html.className = ''
}


// 方式2: vueuse
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
// 返回的是一个函数
const toggleDark = useToggle(isDark)

<el-button @click="toggleDark()">change</el-button>
```


<br>

### 覆盖 elementPlus 默认的暗黑主题色


**官方网站:**  
如果您使用 scss，您也可以导入 scss 文件来实现一样的效果


1. 创建一个文件 styles/element/index.scss


```scss
/* 覆盖你需要的变量 */
@forward 'element-plus/theme-chalk/src/dark/var.scss' with (
  $bg-color: (
    'page': #0a0a0a,
    '': #626aef,
    'overlay': #1d1e1f
  )
);
```


然后在入口文件中 引入


```js
import './styles/element/index.scss'
```


<br>


**我的想法:**  
思路, 因为我们切换到暗黑模式下的时候, html身上会有dark的类名, 所以基于这点我定义了一个scss文件 分别指明 亮色 和 暗黑的时候的样式


但是elementPlus中变量的问题怎么解决 最好是覆盖


1. 使用 useDark 切换主题
2. 定义dark 和 light的scss文件 在入口文件中引入使用


```scss
html.dark {
  background-color: #8338ec;


  // 也可以在这里对elementPlus中的变量进行覆盖
  // --el-bg-color: #626aef;
  // .el-button--primary {
  //   --el-button-text-color: #ededed;
  // }
}
```


```js
import { createApp } from 'vue'


import App from './App.vue'
import router from '@/router'
import store from '@/store'


// 暗黑主题色
import 'element-plus/theme-chalk/dark/css-vars.css'
// 用于覆盖的颜色
import './styles/element/theme-dark.scss'


createApp(App).use(router).use(store).mount('#app')
```


<br>


**方式2:**
参考`https://blog.csdn.net/gsy445566778899/article/details/130843599`


1. 创建如下的scss文件


```scss
// /node_modules/element-plus/theme-chalk/src/common/var.scss
@forward 'element-plus/theme-chalk/src/dark/var.scss' with (
  // 覆盖 var.scss 中的变量 这里覆盖的应该是暗黑模式下的主色调
  $colors:
    (
      'primary': (
        'base': #8338ec
      ),
      'black': #575757
    )
);


@use 'element-plus/theme-chalk/src/dark/css-vars.scss' as *;
```


2. 在main.js中引入该文件


```js
import { createApp } from 'vue'


import App from './App.vue'
import router from '@/router'
import store from '@/store'


import './styles/element/dark/dark.scss'


createApp(App).use(router).use(store).mount('#app')
```

<br><br>

# 自定义主题

### 通过js控制css变量
1. 获取到 html 根节点
2. 设置css变量
```js
const el = document.ducumentElement
el.style.setProperty('--el-color-primary', 'red')
```

```js
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
const setTheme = () => {
  const html = document.documentElement
  // 控制台 去看html标签中有主题色的名
  html.style.setProperty('--el-color-danger', color.value)
}

<el-color-picker
  v-model="color"
  show-alpha
  :predefine="predefineColors"
  @change="setTheme"
/>
```

<br>

### useCssVar
通过 vueuse 中的钩子来完成
```js
import { useCssVar } from '@vueuse/core'

const el = ref(null)
const color1 = useCssVar('--color', el)

const elv = ref(null)
const key = ref('--color')
const colorVal = useCssVar(key, elv)

const someEl = ref(null)
const color2 = useCssVar('--color', someEl, { initialValue: '#eee' })
```

<br><br>

# el-container
它是布局容器组件的外层容器, 它的作用就是用来完成页面布局的

它的子元素必须是
- el-header: 顶栏容器。
- el-aside: 侧边栏容器
- el-main: 主要区域容器
- el-footer: 底栏容器

同时它内部的子元素默认是 从左到右排列的, 若想要从上往下排列,只需要写el-header或者el-footer就行了

<br>

也就是说它里面不能写 el-row 和 el-col

<br>

```html
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
```

<br><br>

# 标签名即为class名
我们需要elementplus组件的样式的时候 可以直接通过 ``.el-col`` 来设置
```scss
.el-row {
  margin-bottom: 20px;
}
```

<br><br>

# el-row 和 el-col 相关
一行分为24列

<br><br>

## el-row 和 el-col 的标签属性

### el-row:
- gutter: 设置 el-col 之间的间距
- type: 可选 flex 但默认就是flex
- justify: flex布局下水平排列方式
- align: flex布局下垂直排列方式
- tag: el-row 使用什么标签渲染

<br>

### el-col
- span: 用于指定列宽: auto / min-content / number
- offset:
- push:
- pull:
- tag

<br><br>

## el-col 指定列宽的方式
通过 el-col 的标签属性 span 来指定
```html
<el-row :gutter="20">
  <el-col :span="6" />
</el-row>
```

<br>

### el-col的内容自适应:
```html
<el-col span="auto">
<el-col span="min-content">
```

<br><br>

## 指定列之间的间距
通过 el-row 的标签属性 gutter 来指定
```html
<el-row :gutter="20">
   
</el-row>
```

<br>

## 行之间的间距
使用 css 来解决
```scss
.el-row {
  margin-bottom: 20px;
}
```

<br>

## 列的偏移
使用 el-col 的标签属性 offset 来指定, 从当前的位置移动多少
```html
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
  <el-col :span="6" :offset="6"
    ><div class="grid-content ep-bg-purple"
  /></el-col>
</el-row>
```

<br><br>

## 对齐方式
默认使用 flex 布局, el-col属于容器中的元素, 所以对齐方式是指对所有的el-col来说的

使用 el-row 的标签属性 ``justify / align`` 来指定 el-col 在 el-row 中的排列顺序

```s
justify: center / end / space-between / space-around / space-evenly
```

<br>

## 响应式布局(断点):
预设了五个响应尺寸：xs、sm、md、lg 和 xl, 用来控制在哪种断点下的时候的列宽

- xs: <768px 响应式栅格数或者栅格属性对象
- sm: ≥768px 响应式栅格数或者栅格属性对象
- md: ≥992px 响应式栅格数或者栅格属性对象
- lg: ≥1200px 响应式栅格数或者栅格属性对象
- xl: ≥1920px 响应式栅格数或者栅格属性对象

### 示例:
比如: 正常两列一列占一半, 当 <768 的时候 左侧为0, 右侧自己占一行
```html
<el-row>
  <el-col :span="12" :xs="0">左侧</el-col>
  <el-col :span="12" :xs="24">右侧</el-col>
</el-row>
```

<br><br> 

# el-table 表格
``el-table`` 组件需要和 ``el-table-column`` 一起嵌套使用, 相当于 ul 和 li 之间的关系

- el-table: 表格的容器
- el-table-column: 表格的一列

```html
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="date" label="Date" width="180" />
  <el-table-column prop="name" label="Name" width="180" />
  <el-table-column prop="address" label="Address" />
</el-table>
```

<br>

### el-table 属性
- border 标签属性: 让表格展示分割线
- height: 表格的高度 默认为自动高度
- stripe: 斑马纹
- fit: 列的宽度是否自撑开
- highlight-current-row: 是否要高亮当前行

- **data** 标签属性: 表格的数据源

<br>

### el-table 类型
1. 获取 ElTable 组件
2. 使用 InstanceType 方法获取该组件的类型
```js
import { ElTable } from 'element-plus'
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
```

<br>

### el-table 事件
- row-click: 当某一行被点击时会触发该事件 row, column, event
  - row: 行数据
  - column: 列信息
  - event: 事件对象

- selection-change: 当第一列的类型为 type="selection" 的时候, 当我们选择checkbox时 触发的回调

```html
<el-table @selection-change="selectChange">
<script>
  const selectChange = (rows) => {
    row不是一行数据对象, rows中存放的是选择中row对象, 它是一个row[]

    const ids = rows.map((item) => item.id as number)
    selectedUserIds.length = 0
    selectedUserIds.push(...ids)
    console.log(selectedUserIds)
  }
</script>
```

<br>

### el-table 实例身上的方法
需要通过ref获取 el-table 组件实例

- toggleRowSelection(row, selected): 用于多选表格, 让该行是都选中, 如果使用了第二个参数 则可直接设置这一行是否选中

- clearSelection: 用于多选表格，清空用户的选择, 取消用户勾选

```js
//获取table组件实例
let tableRef = ref<InstanceType<typeof ElTable>>()

//设置默认图片的方法回调
const handler = (row: spuImageItem) => {
  // 排他思想 方式1: 点击的时候,全部图片的的复选框不勾选
  // imgArr.forEach((item: spuImageItem) => {
  //   tableRef.value?.toggleRowSelection(item, false)
  // })
  // 排他思想 方式2:
  tableRef.value?.clearSelection()
  //选中的图片才勾选
  tableRef.value?.toggleRowSelection(row, true)
  //收集图片地址
  skuForm.skuDefaultImg = row.imgUrl as string
}
```

<br>

### el-table-column 属性
- prop: 指明数据源中的字段名

- label 标签属性: 用于显示列的 标题 相当于 ``thead``
- width 标签属性: 设置 列的宽度
- align 标签属性: 设置 列中文字的对齐方式 ``left/center/right``

- type: 
  - index: 显示该行的索引
  - selection: 显示多选框
  - expand: 显示为一个可展开的按钮

- fixed: 将某一列固定在表格中 可选为 left right

- show-overflow-tooltip: 当内容过长被隐藏时显示tooltip, 内容展示一行
```html
<el-table-column
  label="名称"
  show-overflow-tooltip
  width="150px"
  prop="skuName"
></el-table-column>
```

<br>

### el-table-column 插槽
el-table-column 展示数据 默认使用的是div, 如果我们使用其它结构展示数据, 可以使用插槽
- default: 自定义 该列中的内容
```html
<el-table-column label="Thumbnail" width="180">
  <!-- <template #default="{ row, column, $index }"> -->
  <template #default="scope">
    <div style="display: flex; align-items: center">
      <el-image :preview-src-list="srcList"/>
    </div>
  </template>
</el-table-column>
```

<br>

### el-table 插槽
- empty: 当数据为空时自定义的内容

<br>

### 技巧: 通过数据绘制表格

**column的绘制:**  
1. 我们定义 headers 的数据数组, 其中必须要定义的字段有
  - prop: 指向数据源中的字段
  - label: 列名
  - type: 可选, 指定序号列 多选列等
  - width: 可选, 列宽
  - align: 可选, 列内容的对齐方式
  - desc: 当有 定制化 的内容时, 我们可以通过该字段来进行判断
```js
const tableHeaders = reactive([
  {
    prop: 'tmName',
    label: '品牌名称',
    align: 'center'  // left 会报错
  },
  {
    prop: 'logoUrl',
    label: '品牌Logo',
    align: 'center',
    desc: 'img'
  }
])
```

<br>

**渲染表格:**  
1. 序号列 我定死了 其实也可以定义在上面的数据数组中
2. 操作列 我定死了 其实也可以定义在上面的数据数组中
3. 当我们要展示不同的内容的时候, 我们必须在 template 上使用 v-if 确定 哪种情况下 我们怎么展示对应的内容

<br>

**要点:**  
1. 遍历 el-table-column
2. 使用 v-bind 动态往 el-table-column 上绑定 标签属性
3. 在 template 上使用 v-if 来区别 展示什么样的结构

```html
<el-table :data="tableData" border>
  <el-table-column type="index" width="80" align="center" label="序号" />
  <el-table-column
    v-for="(item, index) in tableHeaders"
    :key="index"
    :label="item.label"
    :align="item.align"
    :prop="item.prop"
  >
    <template v-if="item.desc === 'img'" #default="{ row }">
      <div class="img-wrapper">
        <img :src="row.logoUrl" alt="" />
      </div>
    </template>
    <template v-else #default="{ row }">
      <div>{{ row.tmName }}</div>
    </template>
  </el-table-column>
  <el-table-column label="品牌操作">
    <template #default>
      <el-button size="small" type="primary" icon="Edit" circle />
      <el-button size="small" type="primary" icon="Delete" circle />
    </template>
  </el-table-column>
</el-table>
```

<br>

**默认插槽作用域中 row 的类型:**  
应该是这行数据的类型
```js
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
```


<br>

### 树形数据
**当 row 中包含 children 字段时**，被视为树形数据。 渲染嵌套数据需要 prop 的 **row-key**, 也就是指明对象数组中每个对象的id值

- default-expand-all: 默认全部展开

```html
<el-table
  :data="permissionList"
  row-key="id"
  border
>
  <el-table-column label="名称" prop="name"></el-table-column>
  <el-table-column label="权限值" prop="code"></el-table-column>
  <el-table-column label="修改时间" prop="updateTime"></el-table-column>
  <el-table-column label="操作">
    ...
  </el-table-column>
</el-table>
```


<br><br>

# el-pagination 分页器
elementPlus的分页器, 并没有和el-table绑定在一起, 我们使用分页器的理念是

1. 通过分页收集到用户选择的数据, 比如用户选择了第几页
2. 拿着数据 直接请求 api接口 获取用户选择页的数据
3. 将请求回来的数据 交给 tableData 变量, 重新渲染表格


```html
<el-pagination
  v-model:current-page="paginationForm.pageNo"
  v-model:page-size="paginationForm.pageSize"
  :page-sizes="[3, 5, 7, 9]"
  :background="true"
  :small="true"
  layout="prev, pager, next, jumper, -> , sizes, total"
  :total="400"
  @size-change="sizeChange"
  @current-change="currentPageChange"
/>
```

<br>

### el-pagination 属性
- v-model:current-page: 双向绑定 分页器 **当前页码**, 默认是第一页 (**pageNo**)

- v-model:page-size: 双向绑定 **每页显示多少条数据** 下拉菜单中的值 (**pageSize**)

- page-sizes: array, 通过数组设置下拉菜单中下拉项

- small: boolean, 是否使用小型分页器

- background: boolean, 是否为分页器按钮添加 背景颜色

- pager-count: 设置分页器部分 页码按钮 的数量

- default-current-page: 当前页数的初始值

- layout: string, 指明分页器中有哪些组件
  - prev
  - next
  - pager: 连续的页码按钮
  - jumper: 前往 _ 页
  - total: 共 500 条
  - sizes: 下拉菜单
  - ->: 将某组件顶到右侧
```js
layout="prev, pager, next, jumper, -> , sizes, total"
```

<br>

### 分页器事件
- prev-click: 上一页的点击事件
- next-click: 下一页的点击事件

- current-change: 更改 当前页码 的时候 触发, **回调参数 当前页码 和 旧页码**
- size-change: 选择每页显示的条目数的时候 触发

<br>

### 示例:
```html
<el-pagination
  v-model:current-page="paginationForm.pageNo"
  v-model:page-size="paginationForm.pageSize"
  :page-sizes="[3, 5, 7, 9]"
  :background="true"
  :small="true"
  layout="prev, pager, next, jumper, -> , sizes, total"
  :total="paginationForm.total"
  @current-change="currentPageChange"
/>

<script>
  const paginationForm = reactive({
    pageNo: 1,
    pageSize: 5,
    total: 0
  })

  const currentPageChange = () => {
    // 当前页码发生变化的时候, 触发的回调
    getList()
  }



  // 请求表格数据的方法
  const getList = async () => {
    const res = await getTrademarkList(
      paginationForm.pageNo,
      paginationForm.pageSize
    )

    if (res.code === 200) {
      paginationForm.total = res.data.total
      tableData.length = 0
      tableData.push(...res.data.records)
    }
  }
</script>
```

<br><br>

# el-form相关
表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件。 使用表单，您可以收集、验证和提交数据

每一个表单项都应该包含在一个 ``el-form-item`` 容器中 如

```html
<el-form :model="form" label-width="120px">
  <el-form-item label="Activity name">
    <el-input v-model="form.name" />
  </el-form-item>
</el-form>   
```

<br>

## 横向表单项
当垂直方向空间受限且表单较简单时，可以在一行内放置表单

通过 ``el-form`` 的 标签属性 ``inline`` 控制

```html
<el-form :inline="true">
```

<br>

## 表单项label的对齐方式
通过 ``el-form`` 的 标签属性 ``label-position`` 控制
- right
- left
- top

<br>

### 表单校验
Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误

Form 组件提供了表单验证的功能
1. 通过 ``el-form`` 的 标签属性 ``rules`` 传入校验规则
2. 通过 ``el-form-item`` 的 ``prop`` 指明校验规则中的哪个key

<br>

### 步骤:
1. 需要在 el-form 组件中 添加 model 属性, 告诉form组件, 表单项收集的数据收集到了哪个对象身上

2. 需要在 el-form 组件上 添加 rules 属性, 用于制定验证规则, rules是一个对象 每个属性和我们表单项收集的数据是对应的

3. rules中每一个key, 比如 username 对应是一个数组, 数组的每一项相当于一条校验规则

4. 需要给 el-form-item 添加 prop 属性, 用于指明该表单项, 应用rules中哪个字段对应的校验规则

5. 在登录按钮回调中 验证所有表单验证成功后 再发请求

```html
<el-form :model="loginForm" :rules="loginFormRules">
<!-- 每个表单项应该放在一个 表单容器中 -->
<el-form-item prop="username">
  <el-input
    v-model="loginForm.username"
  ></el-input>
</el-form-item>
<el-form-item prop="password">
  <el-input
    v-model="loginForm.password"
  ></el-input>
</el-form-item>
</el-form>

<script>
// 表单项收集的数据
const loginForm = reactive<loginFormType>({
  username: 'admin',
  password: '111111'
})

// 创建验证规则的rules 对象
</script>
```

<br>

**校验规则**  
每条规则 应该单独在一个对象中, 不然会发生覆盖现象

- message: string, 发生错误的时候 提示信息
- trigger: string, 触发的时机 blur / change / submit
```s
如果使用 change 则需要注意下面的流程
1. 用户输入错误信息 表单验证失败 展示错误提示信息
2. 关闭对话框 (重置表单项为 '')
3. 打开对话框 错误信息还在, 因为 用户输入 -> '' 所以change再次触发 再次校验 提示失败

有人说可以使用 resetFields() 方法
```

- required: boolean, 该字段必须 **验证规则**
- max/min: number, 验证字段长度 **验证规则**

```js
const loginFormRules = {
  // 数组中每一个对象 即为一条验证规则
  username: [
    { required: true, message: '用户名不能为空', tigger: 'blur' },
    { min: 6, message: '用户名长度不能小于6位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', tigger: 'blur' },
    { min: 6, max: 15, message: '密码长度不能小于6位', trigger: 'blur' }
  ]
}
```

<br>

**验证控制: validate()**  
表单中提供了 ``validate`` 方法 对整个表单的内容进行验证, 接收一个回调函数 或 返回promise

它是通过 form组件实例调用的, 也就是说我们要使用 ref 获取到form节点

<br>

``validate`` 方法会返回一个 promise
  - 验证不通过 会返回 reject 控制台报错
  - 验证通过 则 resolve 执行后面的代码 
```html
<el-form
  ref="loginFormRef"
  :model="loginForm"
  :rules="loginFormRules"
>

<script>
import type { FormInstance } from 'element-plus' 

// ref获取节点: 注意 form 的ts类型 标注类型后 loginFormRef 身上才有validate提示
const loginFormRef = ref<FormInstance>()

// 使用方式
const login = async () => {
  // 在发起请求之前 要对表单进行验证
  try {
    // validate() 会返回一个 promise, 校验失败返回的失败的promise 校验成功返回的是 fulfilled true
    // await 等待的是成功的结果 所以如果返回的是失败的饿promise 后续的代码会不执行
    await formRef.value?.validate()
  } catch (err) {
    // Unhandled error during execution of component event handler
    // 使用 try catch 解决 报错 当有错误的时候需要return
    return
  }
}
</script>
```

<br>

**类型:**  
1. rules对象的类型为 ``FormRules``
2. form实例的类型为 ``FormInstance``

<br>

**warning:**  
组件事件处理程序执行期间未处理的错误 **使用 catch 捕获错误即可**, catch中要 **return**
```s
Unhandled error during execution of component event handler 
```

```js
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
```

<br>

### 自定义校验规则:
1. el-form 添加 model 属性
2. el-form 添加 rules 属性
3. rules 校验对象中, 使用 ``validator`` 属性 指定校验逻辑 **回调**
4. el-form-item 添加 prop 属性 指明 rules 中对应的字段

```js
const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
})

const validatePass = (rule: any, value: any, callback: any) => {}
```

<br>

**validator回调参数:**  
- rule: 一般没用 校验规则对象
- value: 表单元素的值
- callback: 
  - 当 **校验通过** 的时候 需要 **调用该函数 不用传递参数**
  - 当 **检验失败** 的时候 需要 **调用该函数 传递错误信息**

```js
const validatePass = (rule: any, value: any, callback: any) => {
  if (true) {
    callback()
  } else {
    callback(new Error('检验失败 ...'))
  }
}
```

<br>

### 尺寸控制
通过 ``el-form`` 或者 ``el-form-item`` 的标签属性 ``size`` 来控制

- large
- default
- small

<br>

### el-form 属性
- inline: boolean, 表单项会按照行来排列, 一行内可以放多个表单元素

- label-width: label的长度, 每一个el-form-item其实都有一个label的位置, 我们可以通过该属性控制label位置的宽度

<br>

### el-form-item 属性
- label-width: 控制 label 的宽度

<br>

### el-form 身上的方法
通过 ref 来进行调用, 它身上的很多方法要求
1. form上使用 ``:model`` 绑定 form对象
2. 每个form-item 必须要有 ``prop`` 属性

<br>

- validateField: 验证具体的某个字段 

- **resetFields**: 重置该表单项，将其值重置为初始值，并移除校验结果, **注意: 确实能移除验证结果, 但是它重置为的不是初始值, 而是上一次的输入** 所以我们使用的时候要注意下面的顺序
```js
// 先清除表单验证
userFormRef.value?.resetFields()
// 再重置表单数据
resetUserForm()
```

- clearValidate('字段'): 清理某个字段的表单验证信息
```js
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // 将file对象转换为url
  // addForm.logoUrl = URL.createObjectURL(uploadFile.raw!)
  addForm.logoUrl = response.data

  // 图片上传成功 清除掉图片表单项对应的error信息
  formRef.value?.clearValidate('logoUrl')
}
```

<br><br>

# el-select 下拉菜单
v-model的值为当前被选中的 el-option 的 **value** 的值

<br>

### el-option 选项
每个 el-option 身上都有两个标签属性
- label: 显示给用户看的 下拉项 所呈现的名字
- value: 下拉项 对应的值


<br>

### el-select 属性
- disabled: 禁用 整个下拉框组件
- clearable: 清空, (只适用于单选)
- multiple: 启用多选, v-model的值为数组, 选中项在el-select中以tag的形式呈现
  - collapse-tags: 将多选的值合并为一段文字
  - collapse-tags-tooltip: 启用鼠标悬停折叠文字以显示具体所选值的行为

- - value-key: 如果我们的下拉项为一个对象的时候, 需要使用该选项指明对象中的id 作为它的唯一性标识
```html
<el-select v-model="value" value-key="id" placeholder="Select">
  <el-option
    v-for="item in options"
    :key="item.id"
    :label="item.label"
    :value="item"
  />
</el-select>

<script setup lang="ts">
import { ref } from 'vue'

type Option = {
  id: number
  label: string
  desc: string
}
const value = ref<Option>()
const options = ref([
  { id: 1, label: 'Option A', desc: 'Option A - 230506' },
  { id: 2, label: 'Option B', desc: 'Option B - 230506' },
  { id: 3, label: 'Option C', desc: 'Option C - 230506' },
  { id: 4, label: 'Option A', desc: 'Option A - 230507' },
])
</script>
```

<br>

### el-option 属性
- disabled: 禁用该项

<br>

### el-option 的插槽
用于自定义渲染内容

<br>

### el-select 事件
- change: 选中值发生变化时触发
- clear: 可清空的单选模式下用户点击清空按钮时触发

<br><br>

# 图标组件 el-icon
还可以追加 style, **click** 等标签属性
```html
<el-icon color="#409EFC" class="no-inherit">
  <Share />
</el-icon>
```

<br><br>

# el-checkbox  & el-checkbox-group

### el-checkbox 属性
- size: 大小 large
- label: checkbox前面的标题部分
- v-model: 收集value
- disabled: 禁用
- indeterminate: 示 checkbox 的不确定状态，一般用于实现全选的效果, **用在全选按钮上**
  - true: 不确定的状态 - 
  - false: 确定的状态 ✅

- border: 是否显示边框

<br><br>

### el-checkbox-group
适用于放一堆的复选框的场景

checkbox-group元素能把多个 checkbox 管理为一组，只需要在 Group 中使用 v-model 绑定 Array 类型的变量即可。 

只有一个选项时的默认值类型为 Boolean，当选中时值为true。 el-checkbox 标签中的内容将成为复选框按钮之后的描述。

```html
<el-checkbox
  v-model="checkAll"
  :indeterminate="isIndeterminate"
  @change="handleCheckAllChange"
  >全选</el-checkbox
>
<!-- 显示职位的的复选框 -->
<el-checkbox-group
  v-model="userRole"
  @change="handleCheckedCitiesChange"
>
  <!-- 这里收集的是 label 的值 而不是value的值哈 -->
  <el-checkbox
    v-for="(role, index) in allRole"
    :key="index"
    :label="role"
    >{{ role.roleName }}</el-checkbox
  >
</el-checkbox-group>

<script>
  const checkAll = ref<boolean>(false)
  const isIndeterminate = ref<boolean>(true)
</script>
```

<br>

**注意:**  
当 el-checkbox-group 和 el-checkbox 组合使用的时候, el-checkbox的label会被收集到 el-checkbox-group 的 v-model 指定的变量(userRole数组)中

也就是说 **el-checkbox 的 label 是被收集的值**

<br>

### 上面代码分析:
1. 全选按钮: v-model 绑定的 checkAll 是一个boolean类型的值
2. indeterminate标签属性: 当checkbox全部选中的时候 全选按钮才是✅, 不然就是 - 
3. handleCheckAllChange: 当checkbox change事件触发时的回调
  - 当 val 为 true 的时候 证明应该是全选, 所以我们将 allRole 请求回来的所有权限数组, 交给userRole我们收集的数组
  - 当 val 为 false 的时候, 证明应该是全部选, 所有我们将收集的数组userRole设置为[]
```js
const handleCheckAllChange = (val: boolean) => {
  //val:true(全选)|false(没有全选)
  userRole.value = val ? allRole.value : []
  //不确定的样式(确定样式)
  isIndeterminate.value = false
}
```

4. handleCheckedCitiesChange checkbox组的change事件, 当我们点击按钮组中里面checkbox的时候 我们要调整全选按钮的状态, 我们可以判断 value 的长度 和 allRole的长度是否相等 相等则为全部选中, 不相等则全选按钮的状态为 不确定的状态
```js
const handleCheckedCitiesChange = (value: string[]) => {
  //顶部复选框的勾选数据
  //代表:勾选上的项目个数与全部的职位个数相等，顶部的复选框勾选上
  checkAll.value = value.length === allRole.value.length
  //不确定的样式
  isIndeterminate.value = value.length !== allRole.value.length
}
```

<br>

### 注意:
el-checkbox-group 使用它的时候 数组的定义方式最好是 ref, 而不是reactive, reactive会导致页面不更新等异常问题

<br><br>

# el-button 按钮

### 标签属性
- type: 用于控制按钮的颜色
- loading: boolean, 用于展示 转圈圈
- icon: 按钮中展示图标组件, string 和 component
- circle: 圆角按钮设置

```html
<el-button
  :loading="loadingFlag"
>登录</el-button>

<script>
  let loadingFlag = ref(false)
  const login = async () => {
  // 点击 登录 回调 展示 el-button 的loading效果
  loadingFlag.value = true

  try {
    ...
  } catch (err) {
    ...
  } finally {
    // 不管登录成功 还是失败
    loadingFlag.value = false
  }
}
</script>
```

<br><br>

# input相关

### input 里面插入 icon
我们使用 ``input`` 组件的 标签属性 ``prefix-icon`` 自定义前缀图标
```html
<script setup lang="ts">
// 引入
import { User } from '@element-plus/icons-vue'

defineOptions({
  name: 'Login'
})
</script>

<!-- 使用 -->
<el-input :prefix-icon="User"></el-input>
```

### input.password
我们使用 ``input`` 组件的 标签属性 ``show-password`` 控制 是否展示输入的密码
```html
<el-input
  v-model="loginForm.password"
  type="password"
  :prefix-icon="Lock"
  show-password
></el-input>
```

<br><br>

## 校验规则相关:

### Ts类型相关
```js
import type { FormInstance, FormRules } from 'element-plus'
```

- Form表单实例的类型: `FormInstance`
- Form验证规则数组的类型: `FormRules<收集表单数据对象的类型>`

<br>

### el-form 标签属性
- hide-required-asterisk: 去掉小星星
- inline: boolean, 默认我们一个表单项是占一行的 如果我们设置为行内的话, 它们会占用内容的宽度

<br>

### 步骤
**1. 使用 ref 定义接收 form dom结构的 变量**
```js
const formRef = ref<FormInstance>()
```

<br>

**2. 给 el-form 添加如下的标签属性**
- model
- rules

```html
<el-form
  ref="formRef"
  class="login-main__form"
  label-position="top"
  :model="loginForm"
  :rules="loginFormRules"
  :hide-required-asterisk="true"
></el-form>
```

<br>

**3. 定义 校验规则对象 loginFormRules, 每个表单项的规则对应一个数组, 每个表单项可以指定多条规则**
- 自定义规则 使用 validator
- 正则校验 使用 pattern
- trigger: blur | change | submit

```js
const checkUsername = (_, val: string, callback: any): void => {
  const reg = /^[a-zA-Z0-9]*$/


  // 校验不通过: 调用 callback(new Error())
  if (!reg.test(val)) return callback(new Error(t('INPUT_ERR_MESSAGE.LOGIN.LOGIN_USERNAME_MORE_DIGIT_ERR')))


  // 校验通过: 调用 callback()
  callback()
}




const loginFormRules: FormRules<typeof loginForm> = {
  // 数组中每一个对象 即为一条验证规则
  username: [
    {
      required: true,
      message: t('INPUT_ERR_MESSAGE.LOGIN.LOGIN_USERNAME_NULL_ERR'),
      trigger: 'submit'
    },
    {
      max: 10,
      message: t('INPUT_ERR_MESSAGE.LOGIN.LOGIN_USERNAME_MORE_DIGIT_ERR'),
      trigger: 'submit'
    },
    {
      // 自定义规则
      validator: checkUsername,


      // 正则校验
      pattern: /^[a-zA-Z0-9]*$/,
      message: t('INPUT_ERR_MESSAGE.LOGIN.LOGIN_USERNAME_MORE_DIGIT_ERR'),
      trigger: 'submit'
    }
  ],
  password: [
    {
      required: true,
      message: t('INPUT_ERR_MESSAGE.LOGIN.LOGIN_PASSWORD_NULL_ERR'),
      trigger: 'submit'
    },
    {
      max: 20,
      message: t('INPUT_ERR_MESSAGE.LOGIN.LOGIN_PASSWORD_MOER_DIGIT_ERR'),
      trigger: 'submit'
    }
  ]
}
```

<br>

**4. 提交表单前, 调用 form 身上的 validate() 对表单项再次校验**
```js
const loginHandler = async (): void => {
  await formRef.value.validate()
  ... 校验通过的逻辑
}
```

<br><br>

# el-input

### el-input 组件实例类型
```js
import type { InputInstance } from 'element-plus'
```

<br>

### el-input组件实例的方法
- focus: 使 组件 聚焦

```js
const changeEditMode = (row: attrValueItemType, index: number): void => {
  console.log(index)
  row.isEdited = true

  // 响应式数据发生变化 获取更新后的dom
  nextTick(() => {
    elInputInstances[index]?.focus()
  })
}
```

<br><br>

# 通知组件 

## ElNotification({配置对象})
它会在屏幕的四周 像抽屉一样 弹出来 给用户提示

```js
ElNotification({
  type: 'success',
  message: '提示信息',
  title: '标题'
})
```

<br><br>

# 滚动条组件

### el-scrollbar
用于替换浏览器原生滚动条

通过 height 属性设置滚动条高度，若不设置**则根据父容器高度自适应**

<br>

**属性:**  
- always: 滚动条总是显示 boolean
- wrap-class: 自定义类名

<br>

**注意:**  
1. el-scrollbar 的高度可能需要动态的计算 (如下)
```html
<template>
  <el-scrollbar >
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </el-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}


/* 约束滚动条的高度, 比如 视口的高度 - logo 的高度 */
.el-scrollbar {
  width: 100%;
  height: calc(100vh - 50px)
}
</style>
```

<br><br>

### el-menu 菜单
导航菜单默认为垂直模式, 通过将 ``mode`` 属性设置为 ``horizontal`` 来使导航菜单变更为水平模式。

<br>

**el-menu-item: 没有子菜单的菜单项**  
表示菜单中的一项

如果我们想展示 一级菜单 则使用 ``<el-menu-item>``

注意: 每一个 item 需要有一个 index 属性, 作为唯一标识

<br>

**el-sub-menu: 拥有子菜单的菜单项**  
如果菜单中的一项 是折叠的(有子菜单) 则使用 ``el-sub-menu``

它的子元素为: ``<el-menu-item>``
```html
<!-- 没有子菜单的菜单项 -->
<el-menu-item index="1">一级菜单</el-menu-item>

<!-- 有子菜单的菜单项 -->
<el-sub-menu index="2">
    <!-- 有子菜单的一级菜单的标题 -->
    <template #title>
      <!-- 一级标题左侧的图标 -->
      <el-icon><location /></el-icon>
      <!-- 一级标题的文本 -->
      <span>Navigator One</span>
    </template>
    <el-menu-item index="2-1">子菜单项1</el-menu-item>
</el-sub-menu>
```

<br>

**注意: 菜单项 需要有 index属性**
每一个 ``el-menu-item`` 和 ``el-sub-menu`` 都需要有一个 ``index`` 属性

``el-menu-item`` 和 ``el-sub-menu`` 的index属性是连续的

比如上面的演示代码中, ``el-menu-item`` 是第一个菜单项 它的index: 1, 紧接着他的下一个菜单项 ``el-sub-menu`` 的index: 2, 同时 它的子菜单的index为 ``2-1``

<br>

**菜单项的标题部分: 使用插槽**
比如上面的 ``el-sub-menu`` 的标题要使用 ``<template #title></template>`` 插槽来指明

<br>

### el-meun 标签属性
- mode: 菜单是水平 还是 垂直 horizontal / vertical

- collapse: 是否水平折叠收起菜单 boolean

- background-color: 菜单的背景颜色 默认白色
- text-color: 文字的颜色
- active-text-color: 激活菜单项的文本颜色

- default-active: 页面加载的时候默认激活菜单的 index

- unique-opened: 只允许展示一个菜单项

<br>

### 注意:
Menu组件整体的右侧有一个 border-right 需要移除
- ``.el-menu { border: none; }``

```html
<template>
  <el-menu background-color="#001529" text-color="#fff">
    <!-- 没有子菜单的菜单项 -->
    <el-menu-item index="1">
      <!-- title -->
      <template #title>
        <el-icon><location /></el-icon>
        <span>首页</span>
      </template>
    </el-menu-item>

    <el-menu-item index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>数据大屏</span>
      </template>
    </el-menu-item>

    <!-- 有子菜单的菜单项 -->
    <el-sub-menu index="3">
      <template #title>
        <el-icon><location /></el-icon>
        <span>权限管理</span>
      </template>
      <el-menu-item index="3-1">用户管理</el-menu-item>
      <el-menu-item index="3-2">角色管理</el-menu-item>
      <el-menu-item index="3-3">菜单管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
```

<br>

### el-menu 的 default-active 使用示例:
```html
<el-menu
  background-color="#001529"
  text-color="#fff"
  :unique-opened="true"
  :default-active="route.path"
>

<script>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>
```

<br>

### el-sub-menu 的标签属性 (**疑问??**)
- popper-class??

<br><br>

## ElMenu: 折叠
我们要完成菜单折叠的话, 需要使用 el-menu 的 ``collapse`` 标签属性

```html
<el-menu
  :collapse="true"
>
```

### 注意:  
el-menu折叠的时候, 会将 ``<template #title>`` 插槽隐藏掉, 而我们的 图标 放到了 title插槽中 就会导致当我们折叠起来的时候 图标会消失 所以
```html
<el-menu-item>
  <template #title>
    <el-icon>
      <component :is="item.meta?.icon" />
    </el-icon>
    <span>{{ item.meta?.title }}</span>
  </template>
</el-menu-item>
```

- el-menu-item 的 图标 要放到 #title 插槽的外面
- el-sub-menu 的 图标 可以放到 #title 插槽的里面

```html
<el-menu-item
  v-if="!item.meta?.hidden"
  :index="item.path"
  @click="goToRoute"
> 
  <!-- 图标拿到#title插槽外面 -->
  <el-icon>
    <component :is="item.meta?.icon" />
  </el-icon>
  <template #title>
    <span>{{ item.meta?.title }}</span>
  </template>
</el-menu-item>

<el-sub-menu
  v-if="item.children && item.children.length > 1"
  :index="item.path"
>
  <template #title>
    <!-- 图标仍然在#title插槽里面 -->
    <el-icon>
      <component :is="item.meta?.icon" />
    </el-icon>
    <span>{{ item.meta?.title }}</span>
  </template>
  <!-- 递归调用 -->
  <AppMenu :menuList="item.children" />
</el-sub-menu>
```

<br><br>

## 解决 el-menu 折叠面板时 1s卡顿的问题
1. 把你的 el-menu 组件加上属性 ``:collapse-transition="false"``
2. 在 el-aside 组件中 追加css属性
```scss
.el-aside {
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;

  width: $base-menu-width;
  background: $base-menu-bg;
  // transition: all 0.5s;

  &.is-collapsed {
    width: $base-menu-width-collapsed;
  }
}
```

<br><br>

# ElementPlus css变量的覆盖
elment-plus中的各个组件的字号 高度等都使用了 它们定义好css变量, 有的时候我们需要修改element-plus中组件的默认值

我们就可以通过修改 css变量 的方式进行调整

<br>

### 组件内覆盖
使用 el系列组件名 在style标签中 修改指定css变量的值
```html
<style scoped lang="scss">
.el-menu-item,
.el-sub-menu {
  --el-menu-item-font-size: 16px;
  --el-menu-item-height: 60px;
  --el-menu-sub-item-height: 60px;
}
</style>
```

<br>

### 定义全局scss样式文件 统一修改
比如我们定义 global.scss 它是作为全局的样式文件, 我们在root为整个项目统一设置样式
```scss
:root {
  --el-color-primary: green;
}
```

<br>

### useCssVar: 可以看看
```s
https://blog.csdn.net/weixin_42386379/article/details/130193843?spm=1001.2014.3001.5502
```

<br><br>

# el-dropdown 组件
下拉菜单, 下拉面板中可以添加 
- 标题
- 文本
- 下拉面板

基本结构如下

```html
<el-dropdown>
  <!-- 下拉菜单的内容展示区 -->
  <span class="el-dropdown-link">
    <!-- title部分 -->
    Admin
    <!-- title部分后面的图标 ↓ 箭头 -->
    <el-icon class="el-icon--right">
      <arrow-down />
    </el-icon>
  </span>
  <!-- 插槽是内容区: 里面放个card组件都是没问题的 -->
  <template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </template>
</el-dropdown>
```

<br>

### 要点:
1. el-dropdown-item 组件是可以绑定点击事件的

<br>

### 问题:
当我们点击 下拉菜单 报警告的时候 可以采取下面的处理方式
```s
index.ts:74 Popper: Detected CSS transitions on at least one of the following CSS properties: "transform", "top", "right", "bottom", "left". 

Disable the "computeStyles" modifier's `adaptive` option to allow for smooth transitions, or remove these properties from the CSS transition declaration on the popper element if only transitioning opacity or background-color for example. 

We recommend using the popper element as a wrapper around an inner element that can have any CSS property transitioned for animations.
```
```html
<!-- adaptive: false -->
<el-dropdown
  trigger="click"
  :popper-options="{
    modifiers: [{ name: 'computeStyles', options: { adaptive: false } }]
  }"
>
```

<br><br>

# el-breadcrumb 面包屑导航组件
```html
<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
</script>
```

### 带导航的面包屑
我们需要使用 ``el-breadcrumb-item`` 身上的 ``to / replace`` 属性
- to: 路由跳转目标，同 vue-router 的 to 属性, string / object
- replace: 如果设置该属性为 true, 导航将不会留下历史记录, boolean

<br><br>

# el-collapse 折叠面板

### 基本使用结构:
它分为 内容区 和 标题区域, 使用方式如下
```html
<el-collapse v-model="activeNames" @change="handleChange">
  <!-- 标题使用 title标签属性 指明 -->
  <el-collapse-item title="Consistency" name="1">
    <div>内容区</div>
  </el-collapse-item>

  
  <el-collapse-item name="2">
    <!-- 折叠面板: title部分 使用 插槽 -->
    <template #title>
      标题<el-icon class="header-icon"><info-filled /></el-icon>
    </template>

    <!-- 内容区: -->
    <div>内容区</div>
  </el-collapse-item>
</el-collapse>
```

<br>

### 属性:
- el-collapse.accordion: 手风琴模式
- v-model: string / array, 默认展开的 选项卡

<br>

### 事件:
- change

<br>

### 要点: 去掉 折叠面板 中的 箭头
```html
<el-collapse class="worker-search__collapse" accordion>
</el-collapse>

<style>
  &__collapse {
    .el-collapse-item__arrow {
      display: none;
    }
  }
</style>
```

<br>

### 要点: 去掉 折叠面板 中的边框
```scss
&__collapse {
  // 去除折叠面板上下的边框
  border: none;

  // 去除折叠面板上下的边框
  :deep(.el-collapse-item__header) {
    border: none;

    // 去除折叠面板右侧的箭头
    .el-collapse-item__arrow {
      display: none;
    }
  }
  // 去除折叠面板上下的边框
  :deep(.el-collapse-item__wrap) {
    border: none;
  }
}
```

<br>

### 要点: 转换 标题区域 和 内容区域的位置
```scss
:deep(.el-collapse-item) {
  display: flex;
  flex-direction: column-reverse;
}
```

<br>

### 类名
- .el-collapse-item__wrap: 内容区的类名
- .el-collapse-item__header: 标题区的类名

<br><br>

# el-card 卡片
卡片包含 标题 内容 以及 操作区域, 简单的说 **就是一个好看的div**

<br>

### 结构:
card组件是有 header 和 body 组成, 其中header部分是可选的, 其内容取决于一个具名的slot

```html
<el-card class="box-card">
  <template #header>
    标题区域
  </template>
  内容区域
</el-card>
```

<br>

### 属性
- shadow: 设置是否有阴影
  - always
  - hover
  - never

- body-style: body的css样式
- body-class: body的类名

<br><br>

# el-date-picker 时间 日期选择器
不管是 时间, 日期, 时间日期, 还是范围, 我们都使用这个组件, 我们会通过 ``type`` 标签属性 来决定我们选择的到底是哪个哪种类型的组件

- type: year / month /date / datetime / week /datetimerange / daterange

<br>

### 标签属性:
- v-model: 双向绑定的值, 绑定的值可以是日期对象 或者是 字符串 字符串要注意格式问题
- type: 
- format: YYYY/MM/DD HH:mm:ss, 选择后 呈现在 下拉框中的 格式
- value-format: 可选，绑定值的格式。 **不指定则绑定值为 Date 对象**
- date-format: 可选，打开 时间选择器 后 呈现在 日期部分 的 显示格式
- time-format: 可选，打开 时间选择器 后 呈现在 时间部分 的 时间格式

<br>

**注意:**  
我们可以通过 v-model 来给 datepick 组件提供初始的默认值, 但是如果我们设置了 value-format

则 v-model 双向绑定的值的格式 一定要和 value-format 指定的格式一致 不然无法展示

<br>

### 示例:
```html
<el-date-picker
  v-model="value2"
  type="datetime"
  format="YYYY/MM/DD HH:mm:ss"
  value-format="YYYY-MM-DD HH:mm:ss"
  placeholder="Select date and time"
/>
```

<br>

### 禁用日期
```s
https://blog.csdn.net/a772116804/article/details/121232667
```

<br><br>

# el-dialog 对话框组件
v-model 绑定一个boolean值, true的时候展示对话框, false的时候隐藏对话跨

对话款过的内容区可以是任何东西, 表格 表单 等

我们使用使用 ``title标签属性`` 指定对话框的标题部分
```html
<el-dialog
  v-model="dialogVisible"
  title="Tips"
  width="30%"
  :before-close="handleClose"
>
  <template #header>
    ...
  </template>

  <span>内容区</span>

  <template #footer>
    ...
  </template>
</el-dialog>
```

<br>

### el-dialog 样式问题
我们给 el-dialog 追加了class, 通过class修改样式, 没有效果

应该使用 deep

```scss
:deep(.dialog-container) {
  background-color: red;
}


// 如果我们要是在deep中 使用&的话会报错, 所以我们采用如下的写法
:deep(.dialog-container) {
  padding: 15px 20px;

  #{&}__title {
    font-weight: bold;
  }
}


// 去除 padding 太大的问题
:deep(.el-dialog__body) {
  padding-top: 0px;
}
```

<br><br>

# el-upload 上传组件
1. 通过 点击 或 拖拽 上传文件
2. ``<template #tip>`` 小型提示文字的插槽

3. 可通过设置 limit 和 on-exceed 来限制上传文件的个数和定义超出限制时的行为


<br>

### el-upload 标签属性:
1. limit: number, 限制上传文件个数
2. on-exceed: 回调, 用于定义超出限制时的行为
3. before-remove: 回调, 可以阻止文件移除操作

4. action: string, 请求的url, 项目中需要携带 ``/api``

5. show-file-list: 是否展示已上传的文件列表

6. before-upload: 组件上传文件**成功之前**的钩子, 参数为上传的文件, 回调返回值false或Promise则被reject停止上传, 可限制用户上传文件的格式和大小

7. on-success: 处理上传成功后的回调, 回调参数
  - 服务器返回的 response
  - 上传的文件 uploadFile
  ```js
  uploadFile: {
    name: 图片名称.jpg,
    percentage: 100,
    raw: File对象,
    response: 服务器返回的数据,
    status: 'success'
  }
  ```
  - 上传的文件列表

<br>

### el-upload 类型相关:
```js
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
```

<br>

**el-upload实例类型:**
```js
const upload = ref<UploadInstance>()
```  

<br>

**上传文件的类型:**  
```js
import type { UploadProps, UploadUserFile } from 'element-plus'

// 单文件类型吧
const file = files[0] as UploadRawFile

// 文件列表列表吧
const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])
```

<br>

**回调事件的类型:**  
```js
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => { }

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => { }

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => { }
```

<br>

### 示例:
```html
<el-upload
  class="avatar-uploader"
  action="/api/admin/product/fileUpload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
>
  <!-- 上传成功展示上传图片 -->
  <img v-if="addForm.logoUrl" :src="addForm.logoUrl" class="avatar" />
  <!-- 没有上传展示 + -->
  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
</el-upload>

<script>
  // el-upload: 上传图片成功之前的回调
  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // 上传文件之间我们可以约束文件的类型和大小
    // rawFile: File对象 { size: 字节, type: , name: }

    // 要求: 上传文件的格式为 png|jpg|gif 4M
    const imgTypes = ['image/png', 'image/jpg', 'image/gif']
    // return false 中止上传
    if (!imgTypes.includes(rawFile.type)) {
      ElMessage({
        type: 'error',
        message: '上传的文件必须为 png jpg gif'
      })
      return false
    }

    // 限制文件大小
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage({
        type: 'error',
        message: '上传的文件必须在4mb以内'
      })
      return false
    }
  }
  // 图片上传成功后的回调
  /*
    回调参数说明:
      response: 服务器返回的数据
      uploadFile: {
        name: 图片名称.jpg,
        percentage: 100,
        raw: File对象,
        response: 服务器返回的数据,
        status: 'success'
      }
  */
  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    // 将file对象转换为url
    // addForm.logoUrl = URL.createObjectURL(uploadFile.raw!)
    addForm.logoUrl = response.data
  }
</script>
```

<br>

### upload: 照片墙
**结构:**  
```html
<el-upload
  v-model:file-list="fileList"
  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
>
  <el-icon><Plus /></el-icon>
</el-upload>

<!-- 点击图片放大的功能: 使用 dialog 完成的 -->
<el-dialog v-model="dialogVisible">
  <img w-full :src="dialogImageUrl" alt="Preview Image" />
</el-dialog>
```

<br>

**upload组件的插槽:**  
```html
<el-upload>
  <!-- 插槽部分: +号 -->
  <el-icon><Plus /></el-icon>
</el-upload>
```  

<br>

**v-model:file-list: 默认上传的文件**  
- 类型: UploadUserFile[]
- 作用: 用于展示默认图片的, **要求字段为name和url**, 同时 v-model 也可以收集到我们上传服务器的数据

将 ``{name: '', url: ''}[]`` 类型的数据结构传递给了upload组件
```js
const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://xxx',
  },
]
```

<br>

**list-type:**  
文件列表类型
- picture-card: 照片墙
- text: 文本列表
- picture: 缩略图

<br>

**on-preview:**   
点击文件列表中已上传的文件的回调, 比如点击照片墙后的回调
```js
// 类型
import type { UploadProps, UploadUserFile } from 'element-plus'

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
```

<br>

**on-remove:**   
点击删除文件列表中已上传的文件的回调


<br><br>

# el-popconfirm 气泡确认框
当点击按钮的时候 该按钮会弹出气泡确认框

<br>

1. 提示文字通过 标签属性 title 来指定
2. 确认框中的内容通过插槽来指定
```html
<template>
  <el-popconfirm
    width="220"
    confirm-button-text="OK"
    cancel-button-text="No, Thanks"
    :icon="InfoFilled"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
  >
    <template #reference>
      <el-button>Delete</el-button>
    </template>
  </el-popconfirm>
</template>
```

<br>

### 属性:
- title: 用于指明标题部分
- confirm-button-text: 确认按钮文字
- cancel-button-text: 取消按钮文字

- confirm-button-type: 确认按钮类型
- cancel-button-type: 取消按钮类型

- hide-icon: 是否隐藏 Icon

<br>

### 事件:
- confirm: 点击确认按钮时触发
- cancel: 点击取消按钮时触发	

<br>

# el-message 消息提示框
类似 alter 的效果

### 要点:
当我们使用 rem  适配的时候, 会将html的字体设置为100px, 但是这会影响到这些全局组件的默认效果, 字体图标会变得特别的大

<br>

**解决方式:**  
我们在 global.scss 文件中添加如下的代码, 将el-message的字体图标重置回16px
```scss
html, body, #app {
  height: 100%;
  font-size: 100px;
}

.el-message__icon {
  font-size: 16px;
}
```

<br><br> 

# el-tag: 标签组件
```html
<el-tag>Tag 1</el-tag>
<el-tag class="ml-2" type="success">Tag 2</el-tag>
```

<br>

### el-tag: 属性
- closable: boolean, 可移除功能
- disable-transitions: boolean, 默认的标签移除时会附带渐变动画。 如果不想使用

<br>

### el-tag: 事件
- close: x掉tag时出发的回调

<br><br>

# el-drawer: 抽屉组件
该组件默认会从屏幕的右侧, 弹出来一个类似card的界面, 相当于抽屉可以抽拉, 它可以呼出一个临时的侧边栏, 可以从多个方向呼出

Drawer 拥有和 Dialog 几乎相同的 API, 在 UI 上带来不一样的体验

<br>

### 显示 和 隐藏
该组件的 显示 和 隐藏, 需要通过 v-model 绑定一个 boolean 类型的值

<br>

### 内容区:
就是 子标签 的部分, 也可以使用 default 插槽

<br>

### 插槽
- title: 
- footer: 

```html
<el-drawer v-model="drawerVisible">
  <!-- 标题部分 -->
  <template #header>
    ...
  </template>
  <template #default>
    ...
  </template>
  <template #footer>
    ...
  </template>
</el-drawer>
```

<br>

### el-drawer 属性
- title: 抽屉的标题
- with-header: boolean, 控制header栏是否显示
- size: Drawer 窗体的大小
- direction: Drawer 打开的方向 默认是从右到左, 'rtl' | 'ltr' | 'ttb' | 'btt' | 'rtl'
- modal: 是否需要遮罩层
- before-close: 关闭前的回调，会暂停 Drawer 的关闭

<br><br>

# el-carousel: 轮播图

### 基本结构
```html
<el-carousel trigger="click" height="150px">
  <el-carousel-item v-for="item in 4" :key="item">
    <h3 class="small justify-center" text="2xl">{{ item }}</h3>
  </el-carousel-item>
</el-carousel>
```

<br>

### el-carousel 属性
- height: carousel 的高度
- indicator-position: 控制导航点在轮播图内还是外部 outside/none
- direction: 展示的方向 horizontal/vertical	
- pause-on-hover: boolean, 鼠标悬浮时暂停自动切换 
- loop: boolean, 是否循环显示
- arrow: 切换箭头的显示时机 always/hover/never
- interval: number, 自动切换的时间间隔，单位为毫秒
- autoplay: boolean, 是否自动切换
- trigger: 指示器的触发方式 hover/click

<br>

### el-carousel 事件
- change: 幻灯片切换时触发

<br>

### el-carousel 方法
- setActiveItem	手动切换幻灯片, 参数: 需要切换的幻灯片的索引，从 0 开始；或相应 el-carousel-item 的 name 属性值
- prev: 切换至上一张幻灯片
- next: 切换至下一张幻灯片

<br><br>

# el-tree 树形控件
用清晰的层级结构展示信息，可展开或折叠。

<br>

### el-tree 属性
1. data: 数组, 展示的数据
2. show-checkbox: 展示复选框
3. node-key: 数据中每个对象都应该有一个id 且不能重复作为唯一的标识
4. default-expanded-keys: 默认展开的节点 传入的是节点对象对应的id值
5. default-checked-keys: 默认勾选的节点, ``https://blog.csdn.net/monparadis/article/details/114087838``
```js
// 注意: 我们会传递给该属性一个数组, 用于展示应该默认勾选的项 但是如果是下面的使用方式则默认不会勾选
const setPermisstion = async (row: roleItemType) => {
  //抽屉显示出来
  roleDrawerVisible.value = true
  //收集当前要分类权限的职位的数据
  Object.assign(roleForm, row)
  //根据职位获取权限的数据
  let res = await getPermissionByRoleIdApi(roleForm.id as number)
  if (res.code == 200) {
    console.log('res.data', res.data)
    userRoleMenuList.length = 0
    userRoleMenuList.push(...res.data)

    // selectedRoleMenuList 就是我们要默认勾选的id数组
    selectedRoleMenuList.value = filterSelectArr(userRoleMenuList, [])


    // 需要在nextTick中调用setCheckedKeys 手动设置默认勾选的项
    nextTick(() => {
      tree.value.setCheckedKeys(selectedRoleMenuList.value)
    })
  }
}
```
6. props: 配置选项
```js
{
  label: 要展示的字段, 对应data数据中的一个字段, 相当于title
  children: 子节点对应的字段
}
```

7. default-expand-all: boolean, 是否默认展开所有节点


<br>

### el-tree 方法
我们要通过 el-tree 的实例, 也就是需要使用ref获取实例后 调用如下的方法

- getCheckedKeys(): 获取选中的id
```js
const saveHandler = async () => {
  //职位的ID
  const roleId = roleForm.id as number

  //选中节点的ID
  let selectedIds = tree.value.getCheckedKeys()
  //半选的ID
  let selectedIdsAmbiguity = tree.value.getHalfCheckedKeys()


  let permissionId = selectedIds.concat(selectedIdsAmbiguity)
  //下发权限
  let result = await assignPermissionByRoleIdApi(roleId, permissionId)
  if (result.code == 200) {
    //抽屉关闭
    roleDrawerVisible.value = false
    //提示信息
    ElMessage({ type: 'success', message: '分配权限成功' })
    //页面刷新
    window.location.reload()
  }
}
```

<br>

### 示例:
```html
<el-tree
  :data="data"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"
  :props="defaultProps"
/>

<script lang="ts" setup>
const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>
```

<br><br>

# el-time-picker
它需要绑定的是 Date类型的数组, 同时, 数组的定义方式只能是ref
```html
<script>
  const barTime = ref<[Date, Date]>([
    new Date(2023, 1, 1, 8, 0),
    new Date(2023, 1, 1, 12, 0)
  ])
</script>
<el-time-picker
  v-model="barTime"
  is-range
  range-separator="〜"
  start-placeholder="Start time"
  end-placeholder="End time"
/>
```

