# 使用 vueuse 中的 useFetch 来封装 请求
- https://blog.csdn.net/a1598452168YY/article/details/127986868

- https://blog.csdn.net/weixin_42386379/article/details/130216301

- https://www.icodebang.com/article/301428.html

- https://juejin.cn/post/7261972803695624250

<br><br>

# Vue2 和 Vue3 的生命周期
|Vue2(选项式API)|Vue3(setup)|描述|
|:--|:--|:--|
|beforeCreate|-|实例创建前|
|created|-|实例创建后|
|beforeMount|onBeforeMount|DOM挂载前调用|
|mounted|onMounted|DOM挂载完成调用|
|beforeUpdate|onBeforeUpdate|数据更新之前被调用|
|updated|onUpdated|数据更新之后被调用|
|beforeDestroy|onBeforeUnmount|组件销毁前调用|
|destroyed|onUnmounted|组件销毁完成调用|

# Vue2 和 Vue3 的数据传递
|方式|Vue2|Vue3|
|:--|:--|:--|
|父传子|props|props|
|子传父|$emit|emits|
|父传子|$attrs|attrs|
|子传父|$listeners|无(合并到 attrs方式)|
|父传子|provide|provide|
|子传父|inject|inject|
|子组件访问父组件|$parent|无|
|父组件访问子组件|$children|无|
|父组件访问子组件|$ref|expose&ref|
|兄弟传值|EventBus|mitt|


# Vue2 和 Vue3 中路由守卫的使用区别

|路由名|Vue2|Vue3|
|:--|:--|:--|
|全局前置路由守卫|router.beforeEach|useRouter().beforeEach|
|全局后置路由守卫|router.afterEach|useRouter().afterEach|
|独享路由守卫|routes/beforeEnter|routes/beforeEnter|
|组件内的路由守卫(进入前)|beforeRouteEnter|options api(另一个script)/defineOptions|
|组件内的路由守卫(更新)|beforeRouteEnter|onBeforeRouteUpdate|
|组件内的路由守卫(离开前)|beforeRouteLeave|onBeforeRouteLeave|


### beforeRouteEnter 在vue3中写法要点:
**方式1: vue3.3 以上**
```js
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

// vue3 setup 语法糖下的路由守卫 beforeRouteEnter 用法示例 
defineOptions({
  name: 'peopleAdd',
  beforeRouteEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    console.log('salesOrder beforeRouteEnter', to, from)
    // 说明用户是通过刷新的方式进入的
    if (from.name === undefined) {
    }
    next()
  }
})
```

<br>

**方式2: 两个script**
```html
<script lang="ts">
import { defineComponent, ComponentPublicInstance } from 'vue';

interface IInstance extends ComponentPublicInstance {
  setPathFrom(from: string): void;
}

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const instance = vm as IInstance;
      console.log('instance = ', instance.wineDetailData);
        instance.wineDetailData.countInterval = 0;  //变量调用
        instance.getUserInfo();   // 函数调用
    });
  },
});
</script>


<script lang="ts" setup>
import { reactive } from 'vue';
interface typeData{
  countInterval:number;
}
const wineDetailData = reactive<typeData>({
  countInterval: 0
});
const getUserInfo=()=>{
    return ''
}

// 暴露变量和方法给beforeRouteEnter调用
defineExpose({ wineDetailData, getUserInfo });
</script>
```

<br>

# 组件的刷新功能
我们点击刷新按钮, 类似我们按了F5, 数据会重新渲染

当组件挂载成功的时候(onMounted)会向服务器发起请求 拿到服务器的数据进行展示, 我们刷新的时候 **只是将二级路由销毁然后重新创建**

这时该组件的onMounted就会再次执行 就会再向服务器发请求 拿数据 再展示

<br>

### 要点:
点击 刷新按钮 将对应的二级路由组件销毁 再重新创建

<br>

**1. 在 settingsStore 中定义 标识, 用于标识是否点击了刷新按钮**
```js
// 关于 Layout 组件 相关配置的仓库
import { defineStore } from 'pinia'

const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      // 控制菜单是折叠还是收起
      isCollapsed: false,
      // 用户控制刷新效果
      isRefreshed: false
    }
  }
})

export default useSettingStore
```

<br>

**2. main组件(有router-view)中的逻辑**
1. 拿到 settingStore 中用来表示是否刷新了的 isRefreshed
2. 使用 watch 监视它
3. watch中的逻辑
  - 利用 v-if, false 该组件会被卸载 true 该组件会被挂载
  - 利用 响应式数据 发生变化 dom结构会重新渲染的机制
  - 利用 nextTick 在不同的实际操作响应式数据

```html
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, watch, ref, nextTick } from 'vue'
import useSettingStore from '@/store/settingStore'

defineOptions({
  name: 'AppMain'
})

...

// 控制当前组件是否销毁重建, 没点击刷新之前不销毁(v-if=true)
let flag = ref(true)

// 刷新按钮的相关逻辑
const settingStore = useSettingStore()
// 监听 settingStore.isRefreshed 的变化, 如果发生变化说明用户点击过刷新按钮
watch(
  () => settingStore.isRefreshed,
  () => {
    // v-if 可以销毁 和 重新创建组件

    // 将 flag 置为 false 销毁组件
    flag.value = false

    // 使用 nextTick, 当响应式数据发生变化后, 可以获取更新后的dom
    nextTick(() => {
      // 当模版渲染完毕后, 重新设置为true, 响应式数据发生变化后, 会再次渲染dom
      flag.value = true
    })
  }
)
</script>

<template>
  <div class="main__container">
    <router-view #default="{ Component }">
      <transition name="fade">
        <!-- 使用 v-if 控制 router-view 出口的组件的 挂载 和 卸载 -->
        <component v-if="flag" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
```

<br><br>

# Vue3 setup 中 给window绑定事件不用放在onMounted中
```html
<script setup lang="ts">
...

// 监听窗口的尺寸变化
window.addEventListener('resize', adjustDataTargetPosition)
</script>
```

<br><br>

# Vue3动态引入图片的方式
还得通过 new URL 去引入

```js
// assest/ の中の画像をとるメソッド
type getAssetsResourceType = (imgName: string) => string
export const getAssetsResource: getAssetsResourceType = imgName => {
  return new URL(`/src/assets/image/${imgName}`, import.meta.url).href
}
```

<br><br>

# Vue3 ref获取组件实例 v-if & v-show
我们需要通过 spuFormRef 来获取 SpuForm 实例
```html
<SpuForm
  ref="spuFormRef"
  v-show="switchStructure === SCENE.SPU"
  @update:switchStructure="updateStructure"
/>

<script>
  const spuFormRef = ref<InstanceType<typeof SpuForm>>()

  const updateSpuHandler = (row: spuItemType): void => {
    switchStructure.value = SCENE.SPU

    // 点击回调 输出 子组件 实例
    console.log(spuFormRef.value)
  }
</script>
```

<br>

### 问题: 响应式数据刚发生变化, 还需要渲染 所以 v-if 拿不到
1. 使用 v-show 的话, 我们可以在回调中输出 子组件实例 (v-show 子组件mounted只会执行一次 不会重新销毁和挂载)

2. 使用 v-if 的话 我们不能再回调中输出 子组件实例 (v-if 子组件会重新销毁和挂载 所以 v-if 的子组件的创建和销毁的声明周期都会执行)

<br>

### 解决方式:
可以使用Vue的$nextTick方法来确保在组件被创建后再获取组件的实例。$nextTick会在下次DOM更新循环结束之后执行指定的回调函数。

<br><br>

## v-model: 如果我们要收集两个字段可以这样
我们知道v-model只能收集value属性, 所以我们可以这么做
```html
<el-select
  v-model="echoSpuForm.unAttrIdAndName"
  :placeholder="
    unSelectSaleAttrList.length
      ? `还未选择的有 ${unSelectSaleAttrList.length} 个`
      : `无`
  "
>
  <!-- 因为我们要收集的是 id 和 name 两个字段, :value="`${item.id}:${item.name}`" 冒号的作用是作为分隔符的 -->
  <el-option
    v-for="item in unSelectSaleAttrList"
    :key="item.id"
    :label="item.name"

    
    :value="`${item.id}:${item.name}`"
  ></el-option>
```

<br><br>

## v-model: 单向数据流, 绑定props 报错的问题
1. 使用计算属性
2. 使用data

我们可以使用计算属性中转下
```js
// ----- props ------
type paginationFormType = {
  pageSize?: number
  pageNo?: number
  total?: number
}
type propsType = {
  hasPagination?: boolean
  captionText: string
  paginationForm: paginationFormType
}

const props = withDefaults(defineProps<propsType>(), {
  captionText: '',
  hasPagination: true,
  paginationForm: () => ({
    pageSize: 5,
    pageNo: 1,
    total: 0
  })
})

// ----- computed -----
const pageForm = computed(() => {
  return {
    pageSize: props.paginationForm.pageSize,
    pageNo: props.paginationForm.pageNo,
    total: props.paginationForm.total
  }
})
```

<br>

```js
const props = withDefaults(defineProps<propsType>(), {
  captionText: '',
  hasPagination: true,
  paginationForm: () => ({
    pageNo: 1,
    pageSize: 5,
    total: 0
  })
})

// ----- variable -----
const pageForm = reactive<paginationFormType>({
  pageNo: 1,
  pageSize: 5,
  total: 0
})
// 合并下props
Object.assign(pageForm, props.paginationForm)
```

<br><br>

# 组件封装需要考虑的问题:
1. 类似 el-input 组件原生会有很多的属性和事件 怎么办?

2. 插槽的问题, 我们传入 AppText 的插槽, 我们要传递给 el-input, 也就是说 我们想使用原生组件的插槽 怎么办?

3. ref的问题, 我们给 AppText 绑定ref的时候, 我们希望获取的是 el-input 怎么办

<br>

### 问题1: 组件原生会有很多的属性和事件 怎么办?
**$attrs**: 它是 对象, 可以获取到 除了props中声明的属性之外的所有通过标签属性传递到子组件的字段
```html
<AppText a=1 b=2 c=3 />


<div>
  <el-input />
</div>


props: ['a']
$attrs: { b: 2, c: 3 }
```

这种机制非常好, 我们可以通过props拿到a, 然后单独的处理a属性, 处理完之后 再将a交给 el-input

我们可以将 给AppText绑定的属性(事件也是通过它) 通过 $attrs 交给 el-input

```html
<el-input v-bind="$attrs" />
```

<br>

### 问题2: 插槽怎么办?
el-input 在官网上有4个插槽
- prefix
- suffix
- prepend
- append


我们可以通过 $slots 知道我们在AppText中传入了多少的插槽内容
```html
<AppText>
  <template #append></template>
</AppText>
```

输出 $slots 我们能观察到
```js
{
  append: (...args) => { ... }
}
```

有了 $slots 之后, 我们可以动态的遍历这个对象 (循环对象的时候获取的是 kv)

```html
<el-input v-bind="$attrs">
  <template
    v-for="(value, name) in $slots"
    #[name]="scopeData"
  >
    <slot :name="name" v-bind="scopeData || {}" />
  </template>
</el-input>
```

<br>

### 问题3: ref怎么办?
我们给 AppText 绑定 ref 希望拿到的 el-input 实例
1. 我们给 el-input 添加ref
```html
<el-input ref='inpRef' v-bind="$attrs">
  <template
    v-for="(value, name) in $slots"
    #[name]="scopeData"
  >
    <slot :name="name" v-bind="scopeData || {}" />
  </template>
</el-input>
```

<br>

2. 我们在 AppText 组件的mounted中可以拿到 el-input的ref, 它里面有elmentPlus中提供的各种属性和方法 我们可以将这些属性和方法 添加到当前的组件和实例中
```js
onMounted(() => {
  const inp = this.$refs.inpRef
  for (const key in inp) {
    this[key] = inp[key]
  }
})

```

<br>

在 AppText 定义getRef函数, 然后父组件需要的时候可以用this.$refs[子组件].getRef() 来获取

<br>

**问题:**   
我给 AppText 绑定ref想通过 ref 获取到 el-input 但是没有办到呀

<br>

### 示例: 封装AppText
```html
<script setup lang="ts">
import { computed, useAttrs, useSlots, ref } from 'vue'
defineOptions({
  name: 'AppText'
})


// reactive 对象
const attrs = useAttrs()
// reactive 对象
const slots = useSlots()


type propType = {
  modelValue: string,
  errorMsgList?: any[],
  label: string,
  required?: boolean
}
const props = withDefaults(defineProps<propType>(), {
  modelValue: '',
  errorMsgList: () => [],
  label: '',
  required: false
})


const emit = defineEmits(['update:modelValue'])


const inpRef = ref()


const bindValue = computed({
  get() {
    return props.modelValue
  },
  set(n) {
    emit('update:modelValue', n)
  }
})


/*
onMounted(() => {
  // 想获取el-input实例 并将该实例身上的方法交给当前组件的proxy身上 但是父组件通过ref获取不到AppText实例
  const inp = inpRef.value
  for (const key in inp) {
    proxy[key] = inp[key]
  }
})
*/


// 因为上面AppText的父组件通过ref获取不到AppText, 所以改用下面的方式, 让父组件拿到el-input 父组件可以通过 xxxRef.value.inpRef.value.xxx方法
defineExpose({
  inpRef
})
</script>


<template>
  <div class="app-text">
    <!-- Title -->
    <el-row class="app-text__label">
      <el-col>
        <div>
          <span>{{ label }}</span><span v-if="required">*</span>
        </div>
      </el-col>
    </el-row>
    <!-- Body -->
    <el-row class="app-text__body">
      <el-col>
        <el-input
          ref="inpRef"
          v-model="bindValue"
          v-bind="attrs"
        >
          <template
            v-for="(value, name) in slots"
            :key="name"
            #[name]="scopeData"
          >
            <slot
              :name="name"
              v-bind="scopeData || {}"
            />
          </template>
        </el-input>
      </el-col>
    </el-row>
    <!-- ErrorMsg -->
    <el-row
      v-if="errorMsgList.length > 0"
      class="app-text__error"
    >
      <el-col
        v-for="(errMsg, index) in errorMsgList"
        :key="index"
      >
        <div>
          {{ errMsg }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
``` 

