# Pinia
Vue3中使用pinia来作为状态管理 相当于 vuex 的新版本

<br>

```sql
-- 文档
https://pinia.vuejs.org/

-- 官网
https://github.com/vuejs/pinia
```


<br>

## Pinia的优点:
- vue 2 3都支持
- pinia中只有state getter action **抛弃了vuex中的mutation**
- 良好的ts支持
- 不用创建各个模块嵌套了 **而pinia中每个store都是独立的** 不互不影响
- 体积非常小
- pinia支持插件来扩展自己的功能, 如: 持久化存储插件
- 支持服务端渲染

<br>

## 安装Pinia:
```js
npm i pinia

// Up的版本: 
Vue: 3.2.25
Pinia: 2.0.23
```

<br>

## Pinia的使用方式:

### **应用挂载Pinia:**
main.ts中进入如下的操作
```js
import { createApp } from 'vue'
import App from './App.vue'

// vue3引入的方法
import {createPinia} from "pinia"

// vue2引入的方法
import {PiniaVuePlugin} from "pinia"


// 创建一个 存储桶
const pinia = createPinia()
let app = createApp(App)

// 注册 存储桶
app.use(pinia)
app.mount("#app")
```

<br>

### **创建 store**
```js
// 组织目录
| - src
  | - store

    // 创建 user 相关的store
    - user.ts
```

然后从 pinia 中引入 defineStore() 方法, 通过该方法我们创建一个store(每个store都是独立的)

<br>

**<font color="#C2185B">defineStore(storeName, {配置项})</font>**  
用于创建store  

**pinia中每一个store都是独立的** 这里就是指定独立的一个store 和这个store独有的配置项

<br>

**参数1:**  
也是这个store的唯一ID, 必传  

**参数2:**  
配置项

<br>

**返回值:**  
hook函数, 调用该函数会返回 store 对象(user的)

所以返回的函数名应该是 **useXxxStore**
```js
Reactive {
  $dispose: f,
  $id,
  $onAction: f,
  $patch: f,
  $reset: f,
  $subscribe: f,
  _hotUpdate: f,
  $state: {},

  _customProperties:,
  _getters: ,
  _hmrPayload: {actions, getters, state, hotState}
  _p: {}
}
```

<br>

**示例:**

```js
// user.ts
import {defineStore} from "pinia"

// 第一个参数是应用程序中 store 的唯一id
export const useUsersStore = defineStore("users", {

  // 配置项...

})
```

<br>

**<font color="#C2185B">配置项: state: cb</font>**  
state的值是一个函数, 我们需要在函数内部 返回一个数据对象

这里的数据 直接会在 store 对象中 同时再从store中获取数据的时候 不用 .value 
```js
export const useUserStore = defineStore("users", {
  state: () => ({
    name: "sam",
    age: 18,
    sex: "男",
    job: {
      front: "vue"
    },
    list: ["erin", "nn"]
  })
})
```

<br>

### **Ts: 定义store的方式**
defineStore()方法的第一个参数也可以理解为命名空间 我们可以将这个参数提取到一个文件中 专门放各个store的名字

```js
| - store
  - store_names.ts

// store_names.ts
export cosnt enum Names {
  USER = "user"
}


// user.ts
import {defineStore} from "pinia"
// 导入枚举
import {Names} from "./store_name"

export const useUserStore = defineStore(Names.USER, {

  state: () => ({}),
  getters: {},
  actions: {}
})
```

<br>

**store的类型:**  
就是给 state 返回设置返回值的类型
```js
import { defineStore } from 'pinia'

type stateType = {
  count: number
}
const useLoginStore = defineStore('login', {
  state: (): stateType => {
    return {
      count: 0
    }
  }
})

export default useLoginStore

```

<br>

### **使用userStore:**

### **获取 userStore 中的数据:**
调用 userStore 方法 返回的就是 store 对象 我们写在 state 中的数据 就在这个对象中

```html
<!-- App组件 -->
<script setup lang='ts'>
import {ref, reactive} from 'vue'
import {useUserStore} from "./store/user"

// 调用 然后返回一个 user 的 store
const userStore = useUserStore()

// store中的数据 就是响应式的
console.log(userStore.name)
console.log(userStore.list)
console.log(userStore.job.front)

</script>
```

<br>

### **修改 userStore 中的数据:**  
修改 store 中 state 的数据有如下的6种方式
1. 直接修改
2. $patch 批量修改
3. $patch 带逻辑修改
4. $state 替换 state
5. 借助 action 方法
6. 使用 $reset 重置 state



如果我们要修改 store 中的数据 可以**直接重新赋值**

```html
<template>

<div>
  <div>
    {{userStore.name}} -- {{userStore.age}} -- {{userStore.sex}}
  </div>
  <div>
    <button @click="change">click</button>
  </div>

  <hr>

  <div>
    <Child />
  </div>
</div>

</template>

<script setup lang='ts'>
import {ref, reactive} from 'vue'
import {useUserStore} from "./store/user"
import Child from "./components/Child.vue"

const userStore = useUserStore()

const change = () => {
  userStore.name = "erin"
}
</script>
```

<br>

上面我们是直接使用 ``userStore.`` 的方式来读取store中的数据 我们还可能写出如下的代码

```js
// 从 store 中将数据结构出来
const {name, age, sex} = useUserStore()
```

但是上面的方式有一个问题 我们从store对象中解构出来的数据是没有响应式的 pinia也考虑到了这点 所以提供了如下方法

<br>

### 响应式的解构出 state 中的数据
### **<font color="#C2185B">storeToRefs(store对象)</font>**  
使用该函数我们需要从 pinia 中引入使用
```js
import {storeToRefs} from "pinia"
```

<br>

使用方式: 我们将 store 对象传入, 然后再解构 这样我们得到的基本数据类型结构就是 ref形式的响应式数据 同样如果要在script中使用的话 要使用 .value 的形式读取
```js
import {storeToRefs} from "pinia"

const {name, age, sex} = storeToRefs(userStore)
console.log(name, age, sex)
```

<br>

**注意:**  
上面说了 我们可以使用 storeToRefs() 方法 包裹store对象 这样解构出来的基本数据类型的数据 就是ref形式的响应式类型

但是 如果state中的引用类型的数据 使用 storeToRefs() 包裹后进行解构 

会将原来是 reactive类型 变为 ref 类型(原本引用类型的数据解构出来也是响应式的)


所以原本不用 .value 解构出来后也要使用 .value 来处理了

```js
// 没有使用 storeToRefs 包裹 job的类型是reactive
let userStore = useUserStore()
console.log(userStore.job)

// 使用后 job的类型变为 ref
const {name, age, sex, job} = storeToRefs(userStore)


// reactive - ref 所以使用方式上也发生了变化
console.log(userStore.job.front)
console.log(job.value.front)
```

<br>

### **批量修改 userStore 中的数据:**  

**<font color="#C2185B">store对象.$patch()</font>**  

**参数: 对象**  
类似setState() 传递的对象 我们将想要修改的数据传递进去

<br>

**参数: 函数**  
函数的参数就是state 用于修改一个数据当中的某个值 因为是函数所以我们可以做逻辑后再修改

比如:  
假如state中有一个list [1,2,3], 假如我们使用第一种方式我们将数组中的每个成员都写上 其中改写第二个成员
```js
store.$patch(list: [1,6,3])
```

这样当成员数据多了很多合理 state中的对象也一样 这时我们就可以使用函数的方式

```js
store.$patch(state => state.list[1] = 6)
```

<br>

### **替换 userStore 中的数据:**  

**<font color="#C2185B">store对象.$state</font>**  
``$state`` = {}  
将 state 中的所有数据 替换成一个新的state

```js
store.$state = { 新数据 }
```

<br>

### **重置 userStore 中的数据:**  
还原store中的数据到最初的状态

**<font color="#C2185B">store对象.$reset()</font>**  
```js
const reset = () => {
  store.$reset()
}
```

<br>

### **使用 getters:**
它是 store 中的一个配置项, 值的类型是一个对象 相当于 计算属性

pinia中的getters没有缓存的功能

<br>

**<font color="#C2185B">配置项: getters</font>**  
```js
import {defineStore} from "pinia"

export const useUserStore = defineStore("users", {

  // state
  state: () => ({ }),

  // getters
  getters: { }
})
```

**定义方式: 普通函数**   
相当于我们写计算属性 在getters对象中定义一个函数 函数名作为属性名

函数中可以接收到 state 参数

```js
import {defineStore} from "pinia"

export const useUserStore = defineStore("users", {
  state: () => ({
    age: 18,
  }),

  getters: {
    // 默认接受 state 参数
    enlargeAge(state):number {
      return state.age * 10
    },

    // 还可以写成箭头函数
    enlargeAge: state => state.age * 10
    
  }
})
```

<br>

### **getters中调用其它的getters:**
我们在getter的方法中使用 this, this指向store实例 所以可以找到其他的getter

**注意:**  
在使用this调用其它的getter的时候 要使用普通函数 不能使用箭头函数

```js
export const useUserStore = defineStore("users", {
  state: () => ({
    age: 18,
  }),

  getters: {
    enlargeAge: state => state.age * 10,

    // 调用了上面的 getter, 注意不能写成箭头函数
    enlargeAge2() {
      return this.enlargeAge * 10
    }
  }
})
```

<br>

### **getters中的传参:**
vue2中我们要给computed进行传参的时候 要使用高阶函数的方式

pinia中的getters也一样 我们要进行传参的话  
外层接收的是state  
内层接收的是我们传递的参数

```js
export const useUserStore = defineStore("users", {
  state: () => ({
    age: 18,
  }),


  getters: {
    enlargeAge: state => (num:number) => state.age + num
  }
})
```

<br>

### **使用 actions:**
上面我们说的 state 和 getters 都是处理数据的 并没有具体的业务逻辑 就跟data和computed是一样的

当我们有业务逻辑在里面的时候 就要使用 actions 里, **actions是一个对象**, 相当于 methods 配置项

比如每个页面都要发起请求拿到token, 那这个共通的逻辑就可以放在actions里面完成

<br>

**<font color="#C2185B">配置项: actions</font>**  
值为对象, 相当于 methods, 里面可以定义方法, 定义的方法没有默认的参数

同样方法内部可以使用this拿到store实例

```js
export const useUserStore = defineStore("users", {
  state: () => ({
    age: 18
  }),
  getters: {
    
  },

  actions: {
    // 定义方法
  }
})
```

```js
actions: {
  changeAge(age: number) {
    console.log("actions参数:", age)
    
    // 修改age
    this.age = age
  }
}


// 组件内
const change = () => {
  // 调用 store 中的方法
  userStore.changeAge(66)
}
```

<br>

**演示异步actions:**
```js
type userType = {
  name:string,
  age: number
}

 
const login = ():Promise<userType> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "sam",
        age: 999
      })
    }, 2000);
  })
}

export const useUserStore = defineStore(Names.USER, {
  state: () => ({
    user: <userType>{},
    name: ""
  }),
  actions: {
    async setUser() {
      let res = await login()
      this.user = res
    }
  }
})
```

<br>

### **store身上的API:**  

**<font color="#C2185B">store对象.$subscribe(cb, [options])</font>**  
当state中的数据发生变化 都会触发回调

```js
userStore.$subscribe((args, state) => {
  // args: 里面有新值旧值target
  // state: 就是数据
})
```

参数2:  是一个对象 可选
```js
{
  detached: true,
  deep: true,
  flush: "post"
}
```

<br>

**<font color="#C2185B">store对象.$onAction(cb, [boolean])</font>**  
当我们调用 actions 中的方法就会触发回调
```js
userStore.$onAction(args => {
  args: {
    // after中需要传递回调 该回调会在onAction中的逻辑最后会执行
    after: f,

    // actions中方法的参数
    args: [],
    // actions中调用的方法名
    name: "方法名",

    // 异步报错的时候用来捕获错误
    onError: f,
    store:
  }
})
```


参数2: 当我们传入true的时候 即使组件销毁我们也可以监听到actions的事件的触发

<br><br>

# 持久化插件

### 安装
```s
npm i pinia-plugin-persistedstate
```

### main.ts引入和使用插件
```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
 
 
// ① 引入createPinia方法从pinia
import { createPinia } from 'pinia'
// ② 拿到pinia实例
const pinia = createPinia()
 
// 1 引入数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 2 pinia使用数据持久化插件
pinia.use(piniaPluginPersistedstate)
 
const app = createApp(App)
 
//使用pinia
app.use(router).use(elementPlus).use(pinia).mount('#app')
```

### 在store中添加配置项:
```js
// 每个状态管理文件都要引入此方法
import { defineStore } from 'pinia'
//引入接口
import { httpPost } from '../request/api'
 
// 官方建议取名遵从 useXXXStore 形式
// 'home' 为当前store的唯一标识 类似ID 
// 取名建议与文件名称一致 便于记忆和管理
// pinia舍弃了冗长的mutations属性 
// 以下是pinia的一种写法 因与vuex相似 便于学习和记忆
export const useHomeStore = defineStore('home',{
  state:()=>{
    return{
        ...
    }
  },
  actions:{
    ...
  },
  getters:{
    ... 
  },
  //数据持久化配置 这里是当前所有变量都持久化
  persist:true
})
```