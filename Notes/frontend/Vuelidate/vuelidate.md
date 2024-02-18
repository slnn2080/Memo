# Vuelidate
它本身属于一个实时验证的验证库

当我们给 vuelidate 进行初始化后, 就会在每一个表单项中挂载一个 ``$dirty`` 该属性的默认值为false

当用户进行输入等交互的时候 它就会变成 true, 这时就开启了 自动验证

<br>

### 安装
```s
npm install @vuelidate/core @vuelidate/validators
```

<br>

### 官网:
```s
https://vuelidate-next.netlify.app/
```

<br>

### 可以导入的规则
- required
- minLength f
- minValue f
- helpers

<br>

### v$.username.$error: boolean
用于判断是否出现了错误
```html
<div v-if="v$.name.$error">Name field has an error.</div>
```

### v$.username.invalid: boolean
验证失败

<br>

### $autoDirty: true:
自动监听 ``$dirty`` 属性, 输入框发生概念的时候, 自动触发验证

<br>

### @blur="v.username.$touch":
自动触发验证, 类似 input 的效果

一个字段上来的状态是 v.username.$dirty 为false, 当我们经过一次验证后 该字段一直会保持 $dirty 为 true 的状态 它为true 则表单一直处于实时验证的状态

v.username.$invalid invalid表示无效, 当用户输入有错误的时候 invalid 为true, 默认为false
```js
if (v.$invalid) {
    // 表单项验证失败，处理错误逻辑
    console.log('表单验证失败')
  } else {
    // 表单项验证通过，处理提交逻辑
    console.log('表单验证通过')
  }
```

<br>

### 重置脏状态: v$.$reset()

**手动验证:**
```js
const formData = reactive({
  username: '',
  password: ''
})

const rules = {
  // $autoDirty: true $lazy: true
  username: { required },
  password: { required }
}

const v = useVuelidate(rules, formData)
console.log(v)

const loginHandler = () => {
  console.log('loginHandler')
  v.value.$touch()
}
```

<br>

### 取消验证状态: v$.$reset()

$validator： 这个属性表示哪个验证规则导致了错误。它通常是验证器函数的名称或者自定义验证函数的名称。例如，如果你使用了 required 验证器，$validator 将会是字符串 "required"。这个属性告诉你是哪个验证规则未通过。

$property： 这个属性表示验证失败的表单项属性。在你的代码中，formData 对象包含了 username 和 password 两个属性，所以 $property 将会是字符串 "username" 或者 "password"。它告诉你是哪个表单项验证失败。

$message： 这个属性包含了关于验证错误的具体消息，通常是一个描述性的字符串，解释了为什么该验证规则未通过。例如，如果是 required 验证器，$message 可能是 "This field is required"。它提供了详细的错误信息，帮助用户理解为什么表单项验证失败。

在你的模板中，你使用了这些属性来动态显示验证错误的信息。$validator 属性告诉你哪个验证规则失败，$property 属性告诉你哪个表单项失败，而 $message 属性提供了详细的错误消息，帮助你向用户解释验证失败的原因。

<br>

### 输出 v$ 对象
```js
{
  // 属性$dirty在收到用户的某种交互后才会被考虑，这意味着所有属性都以 状态$dirty开始false。
  "$dirty": false,
  "$path": "__root",
  "$model": null,
  "$error": false,
  "$errors": [],
  "$invalid": true,
  "$anyDirty": false,
  "$pending": false,
  "$silentErrors": [
    {
      "$propertyPath": "username",
      "$property": "username",
      "$validator": "required",
      "$uid": "username-required",
      "$message": "Value is required",
      "$params": {
        "type": "required"
      },
      "$response": false,
      "$pending": false
    },
    {
      "$propertyPath": "password",
      "$property": "password",
      "$validator": "required",
      "$uid": "password-required",
      "$message": "Value is required",
      "$params": {
        "type": "required"
      },
      "$response": false,
      "$pending": false
    }
  ],
  "$validationGroups": {},

  // 字段
  "username": {
    // 常用:
    "$dirty": false,
    "$path": "username",

    // 验证规则对象: 错误信息 在这里
    "required": {
      "$message": "Value is required",
      "$params": {
        "type": "required"
      },
      "$pending": false,
      "$invalid": true,
      "$response": false
    },
    "$externalResults": [],
    // 常用:
    "$invalid": true,
    "$pending": false,
    // // 常用: 错误标识 boolean, 它会等 $dirty $invalid 均为true的时候才会变成true
    "$error": false,
    // 常用:
    "$silentErrors": [
      {
        "$propertyPath": "username",
        "$property": "username",
        "$validator": "required",
        "$uid": "username-required",
        "$message": "Value is required",
        "$params": {
          "type": "required"
        },
        "$response": false,
        "$pending": false
      }
    ],
    // 常用:
    "$errors": [],
    /*
      字段有错误的时候 里面的东西
      { 
        "$propertyPath": "username", 
        "$property": "username", 
        "$validator": "required", 
        "$uid": "username-required", 
        "$message": "Value is required", 
        "$params": { "type": "required" }, 
        "$response": false, "$pending": false
      } 
    */
    "$model": "",
    "$anyDirty": false
  },

  // 字段
  "password": {
    "$dirty": false,
    "$path": "password",
    "required": {
      "$message": "Value is required",
      "$params": {
        "type": "required"
      },
      "$pending": false,
      "$invalid": true,
      "$response": false
    },
    "$externalResults": [],
    "$invalid": true,
    "$pending": false,
    "$error": false,
    "$silentErrors": [
      {
        "$propertyPath": "password",
        "$property": "password",
        "$validator": "required",
        "$uid": "password-required",
        "$message": "Value is required",
        "$params": {
            "type": "required"
        },
        "$response": false,
        "$pending": false
      }
    ],
    "$errors": [],
    "$model": "",
    "$anyDirty": false
  }
}
```