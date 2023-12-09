# 案例收集:

<br>

### 使用 泛型 和 keyof 约束参数
```js
function handler<T extends object, K extends keyof T>(obj: T, prop: K) {

}
```

<br>

### 定义方式:
```js
const workPlaceInitialStructure = stUtil.getWorkPlaceProperties('')
type workPlaceInitialStructureType = typeof workPlaceInitialStructure
type SearchFormType = {
  centerCode?: string,
  dateFrom: string,
  dateTo: string,
  timeFrom: string
} & {
  [P in keyof workPlaceInitialStructureType]: workPlaceInitialStructureType[P]
}


type workPlaceInitialStructureType = typeof workPlaceInitialStructure
type SearchFormType = {
  centerCode: string,
  dateFrom: string,
  dateTo: string,
  timeFrom?: string,
  timeTo?: string
} & {
  [P in keyof workPlaceInitialStructureType]: P extends 'workClass1' ? workPlaceInitialStructureType[P] : workPlaceInitialStructureType[P] | undefined
}
```

<br>

### 数组对象的类型的应用
```ts
let data = {
  code: 1,
  msg: "读取成功",
  items: [
    {
      id: 1,
      content: "我是内容",
    }
  ]
}

// 定义数组对象中 对象的类型
interface item {
  id: number | string,
  content: string,
}

// 定义 配置的类型
interface config {
  code: number,
  msg: string,
  items: Array<item>
}

let list: config = data
```

<br>

### 使用泛型 通过泛型定义 value 的类型是指定的
```js
// 值的类型是 T
interface obj<T> {
  [propName: string]: T
}

let endObj = {
  a: 1
}

let startObj:obj<number> = endObj
```

<br><br>

## 报错信息: 对象可能未定义
```js
type ListType = {
  id: number | string,
  name: string,
  age: number
}

let res = list.find(item => item.id == id)
```

上面的res的结果可能是 undefined 所以 Ts 报错了 解决方式如下

<br>

**1. 修改Ts配置 关闭严格检查模式**  
```js
"strict": false
```

<br>

**2. 代码做判断检查**  
```js
if(res) res.name = "测试文本"
```

<br>

**3. 告诉ts这是什么**  
```js
let res = list.find(item => item.id == id) as ListType
res.name = "测试文本"
```