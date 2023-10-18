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