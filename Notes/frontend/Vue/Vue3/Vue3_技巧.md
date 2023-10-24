# 使用 vueuse 中的 useFetch 来封装 请求
- https://blog.csdn.net/a1598452168YY/article/details/127986868

- https://blog.csdn.net/weixin_42386379/article/details/130216301

- https://www.icodebang.com/article/301428.html


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