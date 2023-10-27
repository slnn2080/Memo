# i18n的使用方式

### 下载
```s
npm i vue-i18n@9
```

<br>

### 创建 i18n 的配置文件夹
```s
| - src
  | - lang
    - en.ts
    - ja.ts
    - zh.ts


    - index.ts # i18n 的配置文件
```

<br>

### ja.ts 语言定义文件 里面的内容
js文件 默认暴露 一个对象, 里面放置 kv

```js
export default {
  // ボタン
  search: '検索'
}
```

<br>

### 配置 i18n 的配置文件
1. 从 vue-i18n 导出 createI18n
2. 引入 Cookies 包: (要从cookie中获取当前是什么语言)
3. 引入 语言定义文件
4. 创建 message 对象, 里面配置好语言

```js
import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'


import enLocale from './en'
import jaLocale from './ja'
import zhLocale from './zh'
import * as stringUtils from '@/utils/stringUtils'

const messages = {
  en: {
    ...enLocale
  },
  ja: {
    ...jaLocale
  },
  zh: {
    ...zhLocale
  }
}


/**
 * 言語取得
 * @return {string} 言語識別「ja、en」など
 */
function getLanguage(): string {
  const chooseLanguage: string = Cookies.get('language')
  if (!stringUtils.isEmpty(chooseLanguage)) return String(chooseLanguage)


  // if has not choose language
  const language = navigator.language.toLowerCase()
  console.log('navigator.language: ', language)
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.includes(locale)) {
      return locale
    }
  }
  return 'ja'
}


const i18n = createI18n({
  locale: getLanguage(),
  legacy: false,
  globalInjection: true,
  messages
})


export default i18n
```

<br>

### 入口文件中进行注册
```js
import i18n from './lang'


createApp(App).use(i18n).mount('#app')
```

<br>

### 文件中使用 i18n
```html
<!-- 方式1: -->
<script setup lang="ts">
  import { useI18n } from 'vue-i18n'


  defineOptions({
    name: 'Login'
  })


  const { t } = useI18n()
</script>


<script>
  import { getCurrentInstance } from 'vue'
  import { useI18n } from 'vue-i18n'


  import i18n from '@/lang' // 引入i8n实例


  export default {
    setup() {
      // 第一种方法：获取i18n实例对象 t 的方法1
      const { proxy } = getCurrentInstance()
      const t1 = proxy.$t('hello')
      console.log(t1)


      // 第二种方法：获取i18n实例对象 t 的方法1
      const t2 = i18n.global.t('hello')
      console.log(t2)
    },
    mounted() {
      // 第四种方法：获取i18n实例对象 t 的方法4
      const t4 = this.$t('hello')
      console.log(t4)
    }
  }
</script>
```


<br>


### i18n实例上的属性
useI18n() 方法返回的就是 i18n 实例

```js
{
  allowComposition: boolean,
  dispose: f
  mode: "composition",


  global: {
    availableLocales: ['ja', 'zh', 'en'],
    message: ComputedRefImpl, // 里面是翻译
    locale: ComputedRefImpl // 当前的 语法 ja
  }
}
```
