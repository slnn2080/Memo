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

<br>

## 指定列宽的方式
通过 el-col 的标签属性 span 来指定
```html
<el-row :gutter="20">
  <el-col :span="6" />
</el-row>
```

<br>

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

<br>

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

## 表单校验
Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误

Form 组件提供了表单验证的功能
1. 通过 ``el-form`` 的 标签属性 ``rules`` 传入校验规则
2. 通过 ``el-form-item`` 的 ``prop`` 指明校验规则中的哪个key


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
- message: string, 发生错误的时候 提示信息
- trigger: string, 触发的时机 blur / change

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

**验证控制:**  
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
  await loginFormRef.value?.validate()
}
</script>
```

<br>

**类型:**  
1. rules对象的类型为 ``FormRules``
2. form实例的类型为 ``FormInstance``

<br>

**warning:**  
组件事件处理程序执行期间未处理的错误 **使用 catch 捕获错误即可**
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

## 尺寸控制
通过 ``el-form`` 或者 ``el-form-item`` 的标签属性 ``size`` 来控制

- large
- default
- small

<br><br>

# 按钮相关

### 标签属性
- type: 用于控制按钮的颜色
- loading: boolean, 用于展示 转圈圈
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