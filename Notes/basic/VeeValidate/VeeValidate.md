### VeeValidate
- 它是一款实时验证用的组件库
- 可以根据用户输入的值 实时的检测并抛出error

- 推荐的验证模式 一共有27种，而且也可以自定义验证规则


- 在 vue 中使用验证库的话 veevalidate 有相当大的人气 紧随其后的 vuelidate


> 环境:
- 下面的介绍中 使用的是 
- vue: 2.6.10
- vee-validate: 3.2.3
- rules.umd.min.js: 3.2.3

- VeeValidate的两个版本中 差别很大 我们可以看下官方的文档下面使用 3 版本


> 安装:
- 1. npm i vee-validate --save
<!-- 
  npm install vee-validate@3 --save
 -->
- 2. cdn: 
```js
<script src="https://cdn.jsdelivr.net/npm/vee-validate@3.2.3/dist/vee-validate.js"></script> 
<script src="https://cdn.jsdelivr.net/npm/vee-validate@3.2.3/dist/rules.umd.min.js"></script>
```


> 导入:
- 背景：
- 下面的例子中添加了 对 必须的项目 和 邮箱 进行了 的验证


> 页面局部导入
```html
<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
  },
}
</script>

<script>
import { ValidationProvider, extend } from "vee-validate";
import { required } from 'vee-validate/dist/rules';

// mountedでも可
extend('required', required)

export default {
  components: {
    ValidationProvider,
  },
}
</script>
```

> 全局导入
```js 
// 从 验证库中 导出了这3个是啥
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';

// 从 验证库中 到处 必须属性 和 邮箱 属性
import { required, email } from 'vee-validate/dist/rules';

// 使用 extend() 扩展了 两个验证项
extend('required', required);
extend('email', email);
```

- 使用 Vue.component() 加载 ValidationProvider ValidationObserver

> ValidationProvider组件
- 监视字段 属性的时候用的

> ValidationObserver
- 监视表单全体的时候使用
- 当一个输入字段发生错误时，它可以用来给一个按钮设置禁用

```js 
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
 
new Vue({
  el: '#app',
  data: {
    name: '',
    email: ''
  },
  methods: {
    submit: function(){
      alert('送信しました！');
    }
  }
});
```


> 使用方式:
- 我们先准备一个表单 和 输入字段的组件

- 1. 我们使用 <ValidationObserver> 组件包裹 表单的全体
- 我们可以从 <ValidationObserver v-slot='ObserverProps '> v-slot 中获取 ObserverProps 
- 也就是说 它是通过 v-slot 将信息传递出来
- 在 ObserverProps 中 存放着 表单的状态(比如 输入发生错误的情况)
- 在下面的例子中 根据状态的判定给 button按钮 设置 disabled 属性的时候用的

- 2. 我们使用 <ValidationProvider> 组件包裹 表单中的表单项(各个输入字段)
- 当我们要给 输入字段 添加验证的时候 <ValidationProvider rules='验证规则名'> 在rules属性中添加验证规则名
- *在使用 rules 属性指定验证规则名的时候 我们可以指定多个 多个验证规则之间使用 | 来链接*

- <ValidationProvider slot-scope='ProviderProps'> slot-scope属性中的 ProviderProps 中 存放着输入表单项的状态

- 提示错误信息:
- 比如我们可以通过 ProviderProps.errors[0] 这样的形式 进行输出 可以展示 输入字段的error错误


> 示例:
```html
<div id="app">
  <!-- 
    使用 <ValidationObserver> 组件包裹 整个表单 
    ObserverProps是表单的状态
  -->
  <validation-observer ref="obs" v-slot="ObserverProps">

    <!-- 表单项 -->
    <label>名前</label>

    <!-- 
      使用 <ValidationProvider> 包裹表单项 
      rules来指定验证规则
    -->
    <validation-provider name="名前" rules="required">
      <!-- 在<ValidationProvider> 组件的 里面 可以使用 slot-scope 获取 ProviderProps 它是表单项的登录状态 -->
      <div slot-scope="ProviderProps">

        <!-- v-model 表单项输入的值会到name中 validation-provider 就是检测收集到name中的值 -->
        <input v-model="name">
        <p class="error">{{ ProviderProps.errors[0] }}</p>
      </div>
    </validation-provider>
    <label>メールアドレス</label>
    <validation-provider name="メールアドレス" rules="required|email">
      <div slot-scope="ProviderProps">
        <input v-model="email">
        <p class="error">{{ ProviderProps.errors[0] }}</p>
      </div>
    </validation-provider>

    <!-- 按钮的状态 跟 -->
    <button type="button" @click="submit" :disabled="ObserverProps.invalid || !ObserverProps.validated">送信</button>
  </validation-observer>
</div>
```


> 指定语言
- 这个库的提示信息 默认只支持英文 如果我们想让提示信息为日语的话 要进行如下的设置
```js 
import { localize } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja.json';
localize({ja});   // 可能是 zh_CN
```

- 这里有中文的设置
- https://blog.csdn.net/A_9888/article/details/124579237


> 自定义规则
- 1. 自定义规则对象
- 2. 在规则对象中 要设置如下的属性
  - validate(val, {str})函数 设置规则表达式
  - 参数1：表单项中的输入值
  - 参数2：引用 params 中的变量
  - 我们会在函数体中做 用户输入的值 和 设定的值得判断

  - meassage
  - 用于展示错误的信息

  - params：定义个变量 用于接受 在 rules 中指定规则传入的值
  - params: ['str'],
  - rules="required|my_rule:kabanoki"
  - 验证规则中传入的 kabanoni 就是 str


```js
// 自定义规则 设定
const myRule = {
  params: ['str'],
  message: '{_field_}が{str}と一致しません。',
  validate(value, {str}) {
    return value == str;
  }
};


VeeValidate.extend('my_rule', myRule);
 
let app = new Vue({
  el: '#app',
  data: {
    value: '',
  },
  methods: {
    submit: function(){
      alert('送信しました！');
    }
  }
});


<div id="app">
  <validation-observer ref="obs" v-slot="{invalid, validated, valid}">
    <div class="filed">

      // 注意这里： 用例
      <validation-provider name="my_rule" rules="required|my_rule:kabanoki">
        <div slot-scope="{ errors }">
          <input type="text" name="my_rule" v-model="value" value="">
          <p class="error">{{ errors[0] }}</p>
        </div>
      </validation-provider>
    </div>
    <button type="button" @click="submit" :disabled="!valid">送信</button>
  </validation-observer>
</div>
```




> 验证规则:
> alpha:
- 输入框中只允许使用 字母

```js
<ValidationProvider rules="alpha" v-slot="ProviderProps">
  <input v-model="value" type="text">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> alpha_dash
- 输入框里面 可以输入 字母 数字 破折号 下划线

```js
<ValidationProvider rules="alpha_dash" v-slot="ProviderProps">
  <input v-model="value" type="text">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> alpha_num
- 输入框里面 可以输入 字母 数字

```js
<ValidationProvider rules="alpha_num" v-slot="ProviderProps">
  <input v-model="value" type="text">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> alpha_spaces
- 输入框里面 可以输入 字母 半角空格

```js
<ValidationProvider rules="alpha_spaces" v-slot="ProviderProps">
  <input v-model="value" type="text">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> between
- 输入框里面 可以输入 1-11 之间的数字 包括两头

```js
<ValidationProvider rules="between:1,11" v-slot="ProviderProps">
  <input v-model="value" type="text">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> confirmed
- 上下两个文本框的内容输入必须一致
- 在 rules 中指定规则的时候 rules="confirmed:confirmation" 指定 下一个文本框中的 vid

```js
<ValidationObserver>

  <ValidationProvider rules="confirmed:confirmation" v-slot="ProviderProps">
    <input v-model="value" type="text">
    <span>{{ ProviderProps.errors[0] }}</span>
  </ValidationProvider>

  <ValidationProvider v-slot="ProviderProps" vid="confirmation">
    <input v-model="confirmation" type="text">
    <span>{{ ProviderProps.errors[0] }}</span>
  </ValidationProvider>

</ValidationObserver>
```


> digits
- 指定数字的位数 比如输入4个数字的话就会报错

```js
<ValidationProvider rules="digits:3" v-slot="ProviderProps">
  <input v-model="value" type="text">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> dimensions
- 这个演示是在 上传文件的 type=file 的 表单项里面添加的验证
- 指定添加文件的尺寸(jpg、svg、jpeg、png、bmp、gif) 150px 150px 超过了验证就会不通过

```js
<ValidationProvider rules="dimensions:150,150" v-slot="ProviderProps">
  <input type="file" @change="ProviderProps.validate">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> email
- 验证输入的邮箱是否符合标准

```js
<ValidationProvider rules="email" v-slot="ProviderProps">
  <input type="text" v-model="value">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> ext
- 对 type=file 的表单项进行的验证
- 验证上传文件的扩展名是否符合规则

```js
<ValidationProvider rules="ext:jpg,png" v-slot="ProviderProps">
  <input type="file" @change="ProviderProps.validate">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> image
- 对 type=file 的表单项进行的验证
- 上传文件的MIME类型是 image/*

```js
<ValidationProvider rules="image" v-slot="ProviderProps">
  <input type="file" @change="ProviderProps.validate">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> oneOf
- 下拉框表单项的验证 验证选择的值是否是我们指定值其中的一个
- 这个验证的源码里面使用的是 ==

```js
<ValidationProvider rules="oneOf:1,2,3" v-slot="ProviderProps">
  <select v-model="value">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Invalid</option>
  </select>
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> is
- 验证输入框的表单项 输入的值 是否跟我们验证规则中的值一致

```js
<ValidationProvider rules="is:hello" v-slot="ProviderProps">
  <input type="text" v-model="value">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> length
- 指定输入框中必须是 4 位 多了少了都不行

```js
<validation-provider name="length" rules="length:4">
  <div slot-scope="ProviderProps">
    <input name="length" v-model="length">
    <p class="error">{{ ProviderProps.errors[0] }}</p>
  </div>
</validation-provider>
```


> max
- 输入框中的长度 最大值不能超过指定的规则

```js
<ValidationProvider rules="max:4" v-slot="ProviderProps">
  <input type="text" v-model="value">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> max_value
- 输入框中的值 不能超过指定的规则 比如我们设置的4 我们输入5就会报错

```js
<ValidationProvider rules="max_value:4" v-slot="ProviderProps">
  <input type="text" v-model="value">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> mimes
- 上传文件的表单项
- 指定 MIME的类型 如果不是指定的规则 则验证不通过

```js
<ValidationProvider rules="mimes:image/*" v-slot="ProviderProps">
  <input type="file" @change="ProviderProps.validate">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> min
- 设置输入框的字符的最短长度 少于指定的规则 则报错

```js
<ValidationProvider rules="min:4" v-slot="ProviderProps">
  <input type="text" v-model="value">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> min_value
- 输入框里面 输入的值不能比4小 比如我们设置的4 假如我们输入1就会验证不通过

```js
<ValidationProvider rules="min_value:4" v-slot="ProviderProps">
  <input type="text" v-model="value">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> excluded
- 除了指定规则中的数字 输入其他的可以 输入指定规则中的则验证不通过
- excluded：被排除在外的

```js
<ValidationProvider name="excluded" rules="excluded:1,2,3,4">
  <div slot-scope="ProviderProps">
     <input name="excluded" v-model="excluded">
     <p class="error">{{ ProviderProps.errors[0] }}</p>
  </div>
</ValidationProvider>
```


> numeric
- 只能输入数字 输入其他则验证不通过

```js
<ValidationProvider rules="numeric" v-slot="ProviderProps">
  <input type="text" v-model="value">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> regex
- 输入必须和指定的正则一致

```js
<ValidationProvider :rules="{ regex: /^[0-9]+$/ }" v-slot="ProviderProps">
  <input type="text" v-model="value">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> required
- 必须的表单项

```js
<ValidationProvider rules="required" v-slot="ProviderProps">
  <input type="text" v-model="value">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> required_if
- 只有当目标字段（第一个参数）被设置为指定值（其他参数）之一时，被验证的字段才必须有一个非空的值。

```html
<!-- 目标字段 -->
<ValidationProvider rules="" vid="country" v-slot="x">
  <select v-model="country">
    <option value="US">United States</option>
    <option value="OTHER">Other country</option>
  </select>
</ValidationProvider>


<!-- 被验证的字段 -->
<!-- 通过  required_if:country,US  指定目标字段的指定值-->
<ValidationProvider rules="required_if:country,US" v-slot="ProviderProps">
  <input type="text" placeholder="state" v-model="state" />
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```


> size
- 上传文件的表单项
- 指定上传文件的size 单位是kb

```js
<ValidationProvider rules="size:100" v-slot="ProviderProps">
  <input type="file" @change="ProviderProps.validate">
  <span>{{ ProviderProps.errors[0] }}</span>
</ValidationProvider>
```
