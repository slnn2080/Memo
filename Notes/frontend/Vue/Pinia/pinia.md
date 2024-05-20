# Pinia的使用要点:

## Pinia 理解
1. 多用户 多设备的情况下, Pinia中的状态是存在于客户端内存的, 因此, **如果两台电脑访问同一个应用实例, 它们的状态是独立的, 不会互相影响**

2. 如果**一个人使用同一台电脑打开两个不同的浏览器窗口**, Pinia的状态也是独立的, 这是因为每个浏览器窗口有自己的独立JavaScript运行环境和内存空间

<br><br>

## 技巧: 像 抽象类 一样创建 store 实例
有这样的一个场景, 如果我们通过 pinia 创建了一个 store实例, 那么页面中引入这个store的时候, 我们是多个组件操作同一个状态

如果我们希望每个页面都有自己的store实例的话, 我们可以这么做
```js
// stores/searchForm.js
import { defineStore } from 'pinia';

export const useSearchFormStore = (pageId) => defineStore(`searchForm${pageId}`, {
  state: () => ({
    ...
  }),
  actions: {
    ...
  }
});


// A页面组件
import { useSearchFormStore } from '@/stores/searchForm';

export default {
  setup() {

    // 实例化组件时 创建 key
    const searchFormStoreA = useSearchFormStore('A')();

    return { searchFormStoreA };
  }
};

// B页面组件
import { useSearchFormStore } from '@/stores/searchForm';

export default {
  setup() {
    // 实例化组件时 创建 key
    const searchFormStoreB = useSearchFormStore('B')();

    return { searchFormStoreB };
  }
};
```

<br><br>

## 技巧: 多个标签页之间数据共享
实践: 多个标签页之间数据本身就是共享的, 下面的代码参考下吧

<br>

### 方式1: LocalStorage 或 SessionStorage
在Pinia的状态变化时，将状态存储到LocalStorage或SessionStorage中，并在页面加载时从这些存储中读取状态。你可以使用Vue的生命周期钩子来实现这一点。
```js
// 在store中监听状态变化并同步到localStorage
import { defineStore } from 'pinia';
import { watch } from 'vue';

export const useSearchFormStore = defineStore('searchForm', {
  state: () => ({
    searchForm: {
      keyword: '',
      category: ''
    }
  }),
  actions: {
    updateSearchForm(newData) {
      this.searchForm = { ...newData };
      localStorage.setItem('searchForm', JSON.stringify(this.searchForm));
    }
  }
});

// 初始化时从localStorage读取状态
const store = useSearchFormStore();
const savedState = localStorage.getItem('searchForm');
if (savedState) {
  store.$state.searchForm = JSON.parse(savedState);
}
```

<br>

### 方式2: BroadcastChannel API
在现代浏览器中，BroadcastChannel API允许不同浏览器窗口或标签页之间进行通信。
```js
const channel = new BroadcastChannel('searchFormChannel');

// 在store中监听状态变化并广播消息
watch(
  () => store.searchForm,
  (newValue) => {
    channel.postMessage(newValue);
  },
  { deep: true }
);

// 在其他窗口中接收消息并更新store
channel.onmessage = (event) => {
  store.updateSearchForm(event.data);
};
```

<br><br>

## 技巧: 多个标签页中 不共享数据

### 方式1: 使用 SessionStorage
SessionStorage为每个标签页提供了独立的存储空间，可以利用这一点来实现每个标签页独立的Pinia状态。

1. 在store中初始化时从SessionStorage读取状态
```js
import { defineStore } from 'pinia';

export const useSearchFormStore = defineStore('searchForm', {
  state: () => {
    const savedState = sessionStorage.getItem('searchForm');
    return savedState ? JSON.parse(savedState) : {
      keyword: '',
      category: ''
    };
  },
  actions: {
    updateSearchForm(newData) {
      this.searchForm = { ...newData };
      sessionStorage.setItem('searchForm', JSON.stringify(this.searchForm));
    }
  }
});
```

2. 在页面加载时设置SessionStorage  
```js
import { useSearchFormStore } from '@/stores/searchForm';

export default {
  setup() {
    const searchFormStore = useSearchFormStore();
    
    // 在组件挂载时将store的状态同步到SessionStorage
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('searchForm', JSON.stringify(searchFormStore.$state.searchForm));
    });

    return { searchFormStore };
  }
};
```

<br>

### 方式2: 标签页的动态命名空间
可以为每个标签页生成一个唯一的ID，然后使用这个ID来动态生成Pinia store的命名空间，以确保每个标签页的store实例是独立的。

1. 生成唯一的标签页ID
```js
function generateTabId() {
  return 'tab_' + Math.random().toString(36).substr(2, 9);
}

const tabId = sessionStorage.getItem('tabId') || generateTabId();
sessionStorage.setItem('tabId', tabId);
```

2. 根据标签页ID创建动态的store
```js
import { defineStore } from 'pinia';

export const useSearchFormStore = (tabId) => defineStore(`searchForm_${tabId}`, {
  state: () => ({
    searchForm: {
      keyword: '',
      category: ''
    }
  }),
  actions: {
    updateSearchForm(newData) {
      this.searchForm = { ...newData };
    }
  }
});
```

3. 在组件中使用动态store
```js
import { useSearchFormStore } from '@/stores/searchForm';

const tabId = sessionStorage.getItem('tabId');

export default {
  setup() {
    const searchFormStore = useSearchFormStore(tabId)();
    return { searchFormStore };
  }
};
```

<br>

### 方式3: 结合LocalStorage和随机ID
如果需要在多个标签页之间保持状态独立，同时又希望在刷新页面后保持状态，可以结合LocalStorage和随机ID来实现

1. 生成唯一的标签页ID并存储在LocalStorage中
```js
function generateTabId() {
  return 'tab_' + Math.random().toString(36).substr(2, 9);
}

const tabId = sessionStorage.getItem('tabId') || generateTabId();
sessionStorage.setItem('tabId', tabId);
```

2. 在store中使用标签页ID存储和读取状态
```js
import { defineStore } from 'pinia';

export const useSearchFormStore = (tabId) => defineStore(`searchForm_${tabId}`, {
  state: () => {
    const savedState = localStorage.getItem(`searchForm_${tabId}`);
    return savedState ? JSON.parse(savedState) : {
      keyword: '',
      category: ''
    };
  },
  actions: {
    updateSearchForm(newData) {
      this.searchForm = { ...newData };
      localStorage.setItem(`searchForm_${tabId}`, JSON.stringify(this.searchForm));
    }
  }
});
```

3. 在组件中使用动态store并在页面卸载时保存状态
```js
import { useSearchFormStore } from '@/stores/searchForm';

const tabId = sessionStorage.getItem('tabId');

export default {
  setup() {
    const searchFormStore = useSearchFormStore(tabId)();
    
    // 在组件卸载时保存状态到localStorage
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(`searchForm_${tabId}`, JSON.stringify(searchFormStore.$state.searchForm));
    });

    return { searchFormStore };
  }
};
```

<br>

### 方式4: 使用LocalStorage存储状态 + 监听Storage事件
1. 定义Pinia Store并使用LocalStorage存储状态
```js
// stores/searchForm.js
import { defineStore } from 'pinia';

export const useSearchFormStore = defineStore('searchForm', {
  state: () => {
    const savedState = localStorage.getItem('searchForm');
    return savedState ? JSON.parse(savedState) : {
      keyword: '',
      category: ''
    };
  },
  actions: {
    updateSearchForm(newData) {
      this.searchForm = { ...newData };
      localStorage.setItem('searchForm', JSON.stringify(this.searchForm));
    }
  }
});
```

2. 在组件中使用Store并监听LocalStorage变化
```js
import { useSearchFormStore } from '@/stores/searchForm';

export default {
  setup() {
    const searchFormStore = useSearchFormStore();

    // 同步localStorage变化到store
    window.addEventListener('storage', (event) => {
      if (event.key === 'searchForm') {
        searchFormStore.$patch(JSON.parse(event.newValue));
      }
    });

    // 在组件卸载时保存状态到localStorage
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('searchForm', JSON.stringify(searchFormStore.$state.searchForm));
    });

    return { searchFormStore };
  }
};
```

3. 更新状态并同步到其他标签页, 在更新Pinia状态时，自动将变化同步到LocalStorage。这样，当其他标签页监听到LocalStorage的变化时，会自动更新其自身的Pinia状态

<br>

### 完整实现示例
```js
// stores/searchForm.js
import { defineStore } from 'pinia';

export const useSearchFormStore = defineStore('searchForm', {
  state: () => {
    const savedState = localStorage.getItem('searchForm');
    return savedState ? JSON.parse(savedState) : {
      keyword: '',
      category: ''
    };
  },
  actions: {
    updateSearchForm(newData) {
      this.searchForm = { ...newData };
      localStorage.setItem('searchForm', JSON.stringify(this.searchForm));
    }
  }
});

// 在组件中使用Store
import { useSearchFormStore } from '@/stores/searchForm';

export default {
  setup() {
    const searchFormStore = useSearchFormStore();

    // 同步localStorage变化到store
    window.addEventListener('storage', (event) => {
      if (event.key === 'searchForm') {
        searchFormStore.$patch(JSON.parse(event.newValue));
      }
    });

    // 在组件卸载时保存状态到localStorage
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('searchForm', JSON.stringify(searchFormStore.$state.searchForm));
    });

    return { searchFormStore };
  }
};
```

<br><br>

## Cannot access 'useUserStore' before initialization
我是想在 request.ts 文件中 获取 useUserStore 方法 获取store 但是报错了, 意思就是不能在 store 初始化前 调用 useUserStore 
```s
Cannot access 'useUserStore' before initialization

# 或者
Uncaught Error: [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
```

<br>

### 原因:
在组件外部 如果我们通过同步的语句 获取仓库 是拿不到 会报错的, 因为我们要获取小仓库(模块仓库)的数据 必须先有大仓库

<br>

### 解决方式1:
我们将获取 store 的操作 放在拦截器的里面
```js
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/userStore'

// 放在这里会报错: ↓
// const userStore = useUserStore()

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  // 放在这里获取store
  const userStore = useUserStore()

  if (userStore.token) {
    config.headers.token = userStore.token
  }

  return config
})
```

<br>

**扩展: 路由中的使用也是如此**
```js
// permission.ts
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import router from './router'
import { useUserStore } from './store/user'

// userStore的TS类型: let userStore: null | Store = null
let userStore: any = null
router.beforeEach(async(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 放在里面
  if (userStore === null) {
    userStore = useUserStore()
  } 
  // TODO 判断是否登录
  if (userStore.name) {
    ...
  }
})
```

<br>

### 解决方式2:
方式2中 pinia 的创建方式为

1. /store/index.ts 中 创建 pinia 大仓库
```js
//仓库大仓库
import { createPinia } from 'pinia'
//创建大仓库
const pinia = createPinia()
//对外暴露：入口文件需要安装仓库
export default pinia
```

2. 入口文件中安装大仓库
```js
import pinia from './store'
app.use(pinia)
```

3. 创建小仓库(模块仓库)
```js
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      ...
    }
  },
})

export default useLayOutSettingStore
```

<br>

**解决方式:**  
permission.ts文件中 
```js
// 因为 pinia 在步骤1中暴露了 那么我们就可以在 permission.ts 中获取到
import pinia from './store'
import useUserStore from './store/modules/user'

let useStore = useUserStore(pinia)
console.log(useStore)
```

<br><br>

## Pinia中store中的数据 都是响应式的
1. 虽然我们在定义state的时候 并没有使用 reactive 等api, 但是我们在state中写的数据都是响应式的

2. Vue3中使用reactive定义的数组和对象, 我们在修改他们的时候要使用不能改变地址值的方法 比如Object.assign或者push 但是pinia中定义的数据, 我们可以直接赋值, 获取 [...] 的形式都是可以的, 因为它们相当于定义在state对象内部的

<br><br>

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

### 定义方式2:
defineStore方法, 第二个参数的位置我们可以传入一个setup函数, 这样我们可以在setup函数中使用hooks

```js
const useLoginStore = defineStore('login', () => {
  const state = reactive({count: 0})
  const method = () => {}

  return {
    state,
    ...toRefs(state)
    method
  }
})
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

<br>

### pinia实例的类型
```js
// 从 pinia 中引入 Store 类型
import type { Store } from 'pinia'
// 我们自己在store中定义的state的类型
import type { stateType } from './store/userStore'

import useUserStore from './store/userStore'

// 使用泛型指明 Store 中 state 的属性
let userStore: null | Store<'login', stateType> = null
```

<br><br>

# Pinia扩展知识: Pinia中使用 hooks
hooks不能在非setup函数内使用, 而我们的pinia则是一个ts文件, 那如何在ts文件中使用 hooks 呢?

<br>

### vue-i18n 
我们拿 vue-i18n 来举例, 我们没有办法在 pinia的ts文件直接使用 useI18n 函数来解构出 t
```js 
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
```

但是我们可以在 ts文件中引入
- vue-i18n 配置文件暴露出来 的实例
- vue-router 配置文件 暴露出来 的实例

```js
import i18n from '@/lang' // 引入i8n实例
i18n.global.t('hello')
```

通过实例上的方法来进行使用