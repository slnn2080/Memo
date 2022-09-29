### nuxt + ts
- 在 nuxt 的项目中 使用ts的话 要使用下面的3个模块
- @nuxt/types
- @nuxt/typescript-build
- nuxt-typed-vuex

- 下载完后 我们在 nuxt.config.js 中进入配置
```js
export default {
  ...
  buildModules: [
    '@nuxt/typescript-build'
  ],
  ...
}
```

- 接着完成一下 tsconfig.json 配置文件
```js
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": [
      "esnext",
      "esnext.asynciterable",
      "dom"
    ],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@types/node",
      "@nuxt/types"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

- 然后还要创建一个 types 目录
- 创建 vue-shim.d.ts 文件

  | - types
    - vue-shim.d.ts

```js
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}
```

- 上面配置后 我们在页面里面使用 ts 的时候要这么写
- 1. 编辑器给的类型提示，不够严谨正确
- 2. ts 编译期间的类型验证没有
```html
<script lang="ts">
import Logo from '~/components/Logo.vue'
import Vue from 'vue'

export default Vue.extend({
  components: {
    Logo
  }
})
</script>
```

- 我们能看到 需要先导入 Vue 然后使用 Vue.extend() 来创建组件
- 这样的话 script 标签内部的代码 会被认为是 ts


> 怎么进行类型推论？
- 1. 定义在 data 配置项中的属性 可以使用如下的方式
```js
data() {
  return {
    text: '' as string
  }
},
```


> middlware | Context 中的类型推论
- 我们能看到 我们从 @nuxt/types 导出了 Middleware | Context 类型
- import { Middleware, Context } from '@nuxt/types';

- 并将该类型用在了 写middleware的地方
- 并将该类型用在了 写context的地方

```js
import { Context } from '@nuxt/types'

export default ({ redirect, isDev }: Context) => {
  //
}

const guardActorPageMiddleware: Middleware = (context: Context) => { ... }
```


### Vuex中的ts化
- vuex和ts其实不太相匹配 有的说如果考虑ts的话 那就要考虑是否继续使用vuex

- 官方文档资料
- https://typed-vuex.roe.dev/

- 在 nuxt 中要想使用vuex的话 需要使用 nuxt-typed-vuex 这个模块

- 安装
- npm i nuxt-typed-vuex

- 配置
```js
export default {
  ...
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-typed-vuex'
  ],
  ...
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [
      /typed-vuex/,
    ],
    extend (config, ctx) {
    }
  },
  ...
}
```

- 我们创建一个 store,
- store/index.ts

```js
import { getAccessorType } from 'typed-vuex'

// 如果还有另外一个模块的话 我们先引入 它会配置到 modules 中
import * as age from '~/store/age'

// 关于, getters, mutations, actions 的写法 略
// 但是即使没有必要使用它们 但它们也要必须写上 即使是空的
export const state = () => {
  return {}
}

export const getters = {
  //
}

export const mutations = {
  //
}

export const actions = {
  // 
}


export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // import したサブモジュールはここに記述します。
    age,
  },
})

```

> 要点:
- 1. import { getAccessorType } from 'typed-vuex'
- 这就是关键 我们上面 定义了一个 accessorType 
- 这里相当于定义了一个 store 的类型

- 2. 我们在 types目录下 创建 index.d.ts 

    | - types
      - index.d.ts

```js
import { accessorType } from '~/store'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}
```


> 使用方式
- 我们创建一个 store 它比如是一个 module
```js
// 以往的写法
export const state = () => ({
  age: 0
})

export const getters = {
  age: state => state.age,
}

export const mutations = {
  setAge(state, age) {
    state.age = age
  }
}

export const actions = {
  getOlder({ getters, commit }) {
    const currentAge = getters.age
    commit('setAge', currentAge + 1);
  }
}


// ts化
import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const state = () => ({
  age: 0 as number
})

// 这个是定义 store 中的返回值的类型吧 根据state中是什么 就返回什么
export type RootState = ReturnType<typeof state>


export const getters = getterTree(state, {
  age: state => state.age,
})

export const mutations = mutationTree(state, {
  setAge(state, age: number): void {
    state.age = ageƒ
  }
})

export const actions = actionTree({ state, getters, mutations }, {
  getOlder({ getters, commit }) {
    const currentAge = getters.age
    commit('setAge', currentAge + 1)
  }
})
```

- getterTree, mutationTree, actionTree 我们从 typed-vuex 中导出的这3个可以解决 state getters commit 的类型

- 后面的等再掌握掌握ts之后 再考虑看看
- https://qiita.com/shindex/items/a90217b9e4c03c5b5215