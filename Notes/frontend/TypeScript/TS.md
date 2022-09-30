# Ts的扩展知识体系

### 对象可能未定义报错
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

<br>


> declare
- 加入我们封装了一个好用的工具 那么Ts的声明文件是必不可少的 它不仅仅让我们的工具支持Ts 更是负责充当一个说明书的作用 让人对其的使用一目了然

> 什么是声明语句？什么时候需要它？
- 假如我们想使用第三方库 jQ 一种常见的方式是在 html 中通过script标签引入 然后我们就可以使用全局变量 $

- 但是 ts 并不了解这两个变量从哪来的 到哪去 所以我们可以告诉 Ts的编译器 这个$大概是个什么东西

> 告诉 Ts $ 是什么
```js
declare var $: (selector: string) => any
```

- 让 Ts编译器 可以正常检测 它会在编译结果中被删除

- 比如 如下代码在 Ts 中会报错
```js
foo = 123
console.log(foo)  // connot find name 'foo'


// 但是假如我们使用 declare 声明 那么即使在 Ts环境下也不会报错

declare var foo: number
foo = 123
console.log(foo)
```

- 也就是说我们可以通过 declare 关键字 声明一个js变量类型 这就是**声明语句** 


> 声明文件 xxx.d.ts
- 一般这种声明方式都会写在 一个别的文件中 
- 这个文件中存放的都是 类型的定义 并且在打包的过程中 不会被编译到js文件里面

- .d.ts 文件的生成方式
```js 
// sample.ts
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person): string {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}


// 输入 命令
tsc -d sample.ts


// 这样就会生成 sample.d.ts 文件
interface Person {
    firstName: string;
    lastName: string;
}
declare function greeter(person: Person): string;
```


> 声明 模块 declare module '模块名'
- 使用上面的语法 我们声明一个模块 比如 vue在ts环境中使用的时候 需要做下面的声明
```js 
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```


> 什么是声明文件？
- 我们可以把声明语句 看做是声明文件的组件 声明语句组成声明文件
- 通常我们会把声明语句放到一个单独的文件中 比如 jQuery.d.ts
- 声明文件必须以 .d.ts 为后缀 一般来说 ts会解析项目中所有的 *.ts 文件 .d.ts 也属于 .ts 文件类型

- 所以我们将 jQuery.d.ts 文件放入到项目的根目录中后 其他所有 .ts 文件都可以获取 jQuery 的类型定义了
- 假如仍然无法解析 那么可以检查下 tsconfig.json 文件


> 书写声明文件
- 一般来说第三方库都会提供声明文件，我们只需要安装它就好了。
- 但有一些库不会提供声明文件，我们就需要自己书写声明文件了。

- 前面只介绍了最简单的声明文件内容，而真正书写一个声明文件并不是一件简单的事

- 书写声明文件有多种场景需要契合，
- 例如 npm导入 和 script导入 的声明文件的写法与使用方法都不一样，
- 我们这也知会讨论比较常用的这两种方式，如果看官有兴趣，可以自行移步教程学习。


> 1. 全局变量：通过 script 标签引入第三方库，注入全局变量
- 全局变量是最简单的一种场景，之前举的例子就是通过 script 标签引入 jQuery，注入全局变量 $ 和 jQuery。
- 使用全局变量的声明文件时，如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置。

- 如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）：
<!-- 
  | - src
    - index.ts
    - jQuery.d.ts
 -->

- 如果没有生效，可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。

> 全局变量的声明文件主要有以下几种语法：
> 1. declare var / let / const声明全局变量
- 没什么区别 const定义的无法修改。

- 使用const的时候是最多的，一般不允许他人修改你的函数
```js 
declare const jQuery: (selector: string) => any;
```


> 2. declare function 声明全局方法
```js
declare function jQuery(selector: string): any;
```


> 3. declare class 声明全局类
```js
declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): string;
}

//其他文件中
let cat = new Animal('Tom');
```


> 4. declare namespace 声明（含有子属性的）全局对象
- declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。 举个例子：
```js 
// jQuery 是一个全局变量，它是一个对象 jQuery.ajax 方法可以调用
// 那么我们就应该使用 declare namespace jQuery 来声明这个属性的全局变量。
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
}
```

---

> npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
- 在我们给一个 npm 包创建声明文件之前，需要先看看它的声明文件是否已经存在。一般来说，npm 包的声明文件可能存在于两个地方：
- 1. 与该 npm 包在一起。package.json中有types字段，或有一个index.d.ts声明文件。这种模式不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 npm 包的时候，最好也将声明文件与 npm 包绑定在一起。

- 2. 发布到 @types 里。我们只需要尝试安装一下对应的 @types 包就知道是否存在该声明文件，安装命令是 npm install @types/foo --save-dev。这种模式一般是由于 npm 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 @types 里了。

- 假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。

---

- 由于是通过 import 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：
- 1. 创建一个 node_modules/@types/foo/index.d.ts 文件，存放 foo 模块的声明文件。这种方式不需要额外的配置，但是 node_modules 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。

- 2. 创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段。
```js
  | - src
    - index.ts
  
  | - types
    | - foo
      - index.d.ts
    - tsconfig.ts


// tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
```


------

> const & as const
```js
let a:string = "aaa";
const b = "aaa";
```
- 上面的代码 不光光是 let const 的区别 其通过他们定义的类型也不一样

- a变量: 
- 实际为一种宽泛的字符串类型，只要是字符串，即可赋值给变量a

- b变量:
- 实际为一种具体的值类型，*类型为“aaa”*，不可被修改

> 总结:
- const关键字实际是将宽泛的类型，例如字符串，数字等转化为具体的*值类型*。

- 值类型也是单独的一种类型

------

> as const 断言
- 我们先看看下面的代码
```js
let m = 100
let n = "aaa"

// let arr: (string | number)[]
let arr = [m, n]

// let f: string | number
let f = arr[0]

f = 2000
f = "bbb"
```
- 我们能观察到 当我们把 m n 放入数组中后 arr的元素允许的类型就被推断为 (string | number)

- 所以我们取出数组中的任意一个元素 它的类型都是 联合类型

- 但是上面的情况我们要尽量的避免 这时候我们就可以使用 as const 断言 将 宽泛的联合类型 限定为具体的数值类型

```js
let m = 100
let n = "aaa"

// let arr: readonly [number, string]
let arr = [m, n] as const
```

- 这样 首先我们能看到 arr 被当做了只读 而且它相当于被限定成了一个元祖 第一个数组只能是number 第一个数据只能是string

------

> as const 在解构中的应用
- 当涉及到数组中 x y 的类型组合的时候 每个元素都会有两个类型 或者是 每个元素都是联合类型

- 当编辑器无法准确的识别 元素的类型的时候 我们就可以使用 as const

```js
function test() {
  let a = "abc"
  let b = (fname:string, lname: string): string => fname + lname

  return [a, b]
}

let [x, y] = test()
console.log(y("sam", "erin"))

// 编译器认为 y 的类型是:
let y: 
  string | 
  ((fname: string, lname: string) => string)

- string | (xxx) 这是什么类型?
```

- 上面的内容编译失败 y 的类型 编译器并不能认定 y 是一个函数
- 这时候我们可以 as const 将宽泛的 string | (xxx) 转为 只读的 值类型

```js
function test() {
  let a = "abc"
  let b = (fname:string, lname: string): string => fname + lname

  return [a, b] as const
}

let [x, y] = test()
console.log(y("sam", "erin"))


// 这时编译器会认出 y 为 函数
let y: (fname: string, lname: string) => string
```

- as const断言，可以将代码中宽泛的数据类型定义具体话，从而避免我们在开发过程中，因为定义过于宽泛，造成的各种数据处理的错误，通过精准的数据类型定义，更好的管理我们前端代码。

------

> type 自定义名 = 类型
- 用于给目标定义类型
```js
// 定义名字的类型
type nameType = string 


// 定义函数返回值的类型 注意无参
type fnReturnType = () => number
function getRes():number {
  return 5
}


// 定义数组中元素的联合类型
type arrJoinType = (number|string)[]
let arr = [1, "a"]
let arr1 = ["a", "b"]


// 示例:
// 定义函数返回值类型
type Name = string;
// 定义形参为函数类型
type NameResolver = () => string;
// 定义形参为联合类型
type NameOrResolver = Name | NameResolver;

// 因为形参是联合类型 所以内部需要判断使用
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
```

- interface 和 type 几乎一样 唯一的区别在于
- type一旦定义 不能添加新的属性 *定义好后无法修改*

- 而interface是可以进行继承的
```js
// type示例:
// 一旦定义好 就不能给 objType 添加属性了
type objType = {
  name: string,
  age: number
}

let obj: objType = {
  name: "sam",
  age: 18
}



// 接口可以继承
interface objType {
  name: string,
  age: number
}


interface addObjType extends objType {
  address: string
}

let obj: addObjType = {
  name: "sam",
  age: 18,
  address: "白山"
}


// 同名接口 里面的规则可能会合并
interface Person {
  name: string,
  age: number
}

interface Person {
  address: string
}

let obj:Person = {
  name: "sam",
  age: 18,
  address: "白山"
}
```

------

> type的添加新的属性类型(类似继承) &
```js
// 定义一个类型
type Person = {
  name: string,
  age: number
}


// 将 Person类型 和 其它给定类型你合并 返回一个新的类型
type China = Person & {
  address: string
}

let obj: China = {
  name: "sam",
  age: 18,
  address: "白山"
}

```

------

> type 数据结构类型 = typeof 数据结构
- 对一个数据结构使用 typeof 进行检查 可以返回给定数据结构的类型
- 返回值为: 类型

- 示例:
```js
let person = {
  name: "sam",
  age: 19,
  children: [
    {
      name: "nn",
      age: 5
    }
  ]
}

// typeof 返回的是类型 所以我们创建一个 type 来接收
type personType = typeof person


// personType的类型为
type personType = {
  name: string;
  age: number;
  children: {
    name: string;
    age: number;
  }[];
}
```

- 不仅如此我们还可以获取对象中指定数据的类型 如
```js
let person = {
  name: "sam",
  age: 19,
  children: [
    {
      name: "nn",
      age: 5
    }
  ]
}

type personChildType = typeof person.children


// personChildType的类型为
type personChildType = {
  name: string;
  age: number;
}[]
```

------

> 技巧: typeof 与 类 结合使用
```js
class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}


// 我们要通过函数 返回一个对象 我们需要传入Class 和 Class所需要的参数 返回值也要为Class 所以定义了返回值类型为Point
function getInstance(Clazz: Point, x: number, y: number):Point {
  return new Clazz(5, 5)  
    // 报错: 此表达式不可构造。 类型 "Point" 没有构造签名
}


// 使用 typeof Point 给 类确定类型
function getInstance(Clazz:typeof Point, x:number, y:number) {
  return new Clazz(5, 5)
}
// (parameter) Clazz: new (x: number, y: number) => Point

```

------

> 技巧: typeof 与 函数 结合使用
- 1. 使用 
  type 变量 = typeof 函数

- 返回函数的类型
```js
function add(a: number, b: number): number {
  return a + b;
};

type AddType = typeof add;
// (a: number, b: number) => number
```

- 使用 *ReturnType关键字* 获取函数返回值的类型
- 使用 *Parameters关键字* 获取形参的类型
```js
//  typeof与函数结合使用
function add(a: number, b: number): number {
  return a + b;
};

// type AddType = (a: number, b: number) => number
type AddType = typeof add;


type AddReturnType = ReturnType<AddType>;   // number
type AddParamsType = Parameters<AddType>;   // [a: number, b: number]
```

------

> keyof 类型(type)
- 可以用于获取*某种类型*的所有键, 也就是说 keyof 后面接 type类型的
- 返回该type类型中的key 作为联合类型 key1 | key2 | key3
- 与 typeof 联合使用：

```js
let person = {
  name: "sam",
  age: 18,
  job: {
    frontend: "Vue"
  }
}

type PersonType = typeof person
/*
type PersonType = {
  name: string;
  age: number;
  job: {
    frontend: string;
  };
}
*/


let Sam: keyof PersonType = "name"
// sam的值只能为: "name" | "age" | "job"
```

------

> 数组的数据类型 定义的两种方式
- 1. Array<Item>
- 2. Item[]

```ts
export enum Actor {
  /** 受験者 */
  TESTER = 1,
  /** 監視者 */
  CHECKER,
  /** 試験管理者 */
  TEST_MANAGER,
  /** システム管理者 */
  SYSTEM_MANAGER,
  /** 監督官 */
  SUPERVISOR,
}


// 下面返回的数据 就是一个 枚举类型的数组
public static getList(): Actor[] {
  return [
    Actor.TESTER,
    Actor.CHECKER,
    Actor.TEST_MANAGER,
    Actor.SYSTEM_MANAGER,
    Actor.SUPERVISOR,
  ];
}
```

------

> Vue中 给 props 定义类型
- 1. 引出 PropType
- import Vue, { PropType } from 'vue';

- 2. 应用
```js
props: {
  testerConditions: {
    type: Object as PropType<TesterConditions>,
    required: true,
  },
},
```


> Vuex 和 Ts 搭配写 配置项的时候
- 1. 引入
- import { GetterTree, ActionTree, MutationTree } from 'vuex';

- 2. 定义 state 的类型
```js
const state = () => {
  return new TesterAdapter();
};

// 获取 state 的类型
type TesterState = ReturnType<typeof state>;
```

- 3. getters 的写法
```js
const getters: GetterTree<TesterState, TesterState> = {
  // 下面是函数(想想computed)
  [types.GETTER_TESTER](state: TesterState): TesterAdapter {
    return { ...state };
  }
};
```

- 4. actions 的写法
```js
const actions: ActionTree<TesterState, TesterState> = { }
```

- 5. mutation 的写法
- const mutations: MutationTree<TesterState> = { }

---

> Vue中this Ts可能会利用类型断言 实现this指向不同的对象
- 场景:
- 一个组件中通过 Vue.extend({}) 创建了很多的组件实例 DataPollingMixin 就是一个

```js
// 首先先断言这个this是实例类型 然后泛型中指明是哪个实例类型
(this as InstanceType<typeof DataPollingMixin>).startDataPolling();
```

---------------

### Ts给变量指定类型
> 类型声明
- 类型声明是TS非常重要的一个特点
- 通过类型声明可以指定TS中变量（参数、形参）的类型
- 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错
- 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

- ts文件可以被编译为任意版本的js文件


> 类型声明 方式一 :
- let 变量: 类型;
- let a: string;
- 一旦给变量指定了类型, 那么在以后的使用过程中这个变量只能是这个类型
<!-- 
  js中的变量可以是任何的类型, 但在一个项目中, 一不小心给这个变量重新赋值了其它的类型, 那么就相当于埋下了一个隐患, 为了排查错误的时候会非常的困难
 -->

> 示例
```js 
  // 声明一个变量b 同时指定它的类型是number
  let b: number;

  // b的类型设置为了number 在以后的使用过程中b的值只能是数字
  b = 'aaa';    // 此行代码会报错 b的类型是number 不能赋值字符串
```


> 类型声明 方式二 :
- let 变量: 类型 = 值
- let a: boolean = true;


> 类型声明 方式三 :   常用
- 如果变量的声明和赋值是同时进行的(变量的初始化), TS可以自动对变量指定该类型
- let a = 123;
<!-- 
  a以后的类型就是123 number类型
 -->

------------------

> 函数 -- > 添加类型
- js在函数中是不考虑参数的类型和个数的, 有可能就会造成在传递参数的时候a:string b:number 结果就会是拼串, 会导致以后一系列的问题

- 1. ts可以给形参定义类型
- 2. ts会限制实参的个数, 如果形参是2个, 实参也必须是两个
- 3. (形参):类型
- 4. (形参):给函数的返回值定义类型

```js 
  function sum(a:number, b:number): number {
    return a + b;
  }

  // 箭头函数的写法
  const fn = (a: number):number => "a"  // 报错
```

- 上面我们了解了 给变量定义 number string boolean类型 还可以定义很多其他的类型

---

> ts中可以定义的类型

  类型          例子                描述
  number        1, 33             任意数字
  string        'hi', "hi",       任意字符串
  boolean       true、false       布尔值true或false
  字面量         其本身             限制变量的值就是该字面量的值

  object        {name:'孙悟空'}   任意的JS对象
  array         [1,2,3]           任意JS数组

  any           *                 任意类型
  unknown       *                 类型安全的any

  void          空值（undefined）  没有值（或undefined）
  never         没有值            不能是任何值

  tuple         [4,5]             元素，TS新增类型，固定长度数组
  enum          enum{A, B}        枚举，TS中新增类型

------------------

> 字面量 定义变量 类型
- let 变量:10
- 这相当于 变量的类型就是 10 也就是值类型 相当于常量的感觉
<!-- 
  变量的初始值是10 类型是number 固定了 已经指定了下面就不能修改了
  整的有点想常量似的赋值一次不能修改了 一般不用这中方式
 -->

```js
// 定义 num 变量的值 为常量10
let num:10

// 尝试再次修改的时候 会报错
num = 20
```

---

> 联合类型 (可选值(值类型) 相当于在两个常量之间选择)
- 可以定义我们的变量的类型, 值可以是在某几个值之间

```js 
  let b: 'male' | 'female';
```

**注意:**
- 1. 定义多可选值的时候 变量后面接的是: 号
- 2. 定义完变量的可选值后 该变量的赋值 只能从可选值中选择

- 当我们给 b 变量进行赋值的时候 只能赋值为 这两个值 其中的一个
```js  
  // 一般可以这么用, 这样b的值只能是male 或者 female其中的一个
  b = 'male';     // ok
  b = 'female';   // ok
  b = 'hello'     // err
```


> 联合类型 (可选类型)
- 我们还可以通过这样的方式定义变量的可选类型
```js 
  let c: boolean | string;
```

- 上面 c 变量的可选类型为 boolean 和 string

------------------

> 变量类型: any

- 格式:
- 变量: any

- 这个变量的值可以是任意类型, 可以任意赋值, 一个变量设置类型为any后相当于对该变量关闭了TS的类型检测

- 使用ts的时候, 不建议使用any类型, 那不跟js一样了
```js 
  let d:any;    // 变量d可以是任意类型
  d=10;
  d='hello'
  d=true
```

> 隐式any
- 声明变量如果不指定类型, 则TS解析器会自动判断变量的类型为any (隐式的any)
```js 
  let d;    // 隐式any
  d = 10;
  d = 'hello'
```

**注意:**
- any类型的值 可以赋值给任意变量, 不仅霍霍自己还霍霍别人
```js 
  let s: string;    // s 是字符串类型
  let d;            // d 是any类型 没指定就是any

  s = d;            // 这时 我们将any类型的值 赋值给 s(string) 不会报错
```
- 我们使用TS的时候就是为了检测变量的类型, 当使用了any类型后 会导致和使用js一样的隐患


> any的应用场景
- 比如我们要获取html结构中的div节点
```js 
  // 在页面有效果 但是ts会报错 这时候我们就可以给div指定一个any类型
  let div = document.querySelector("div")
  div.style.color = "red"

  let div: any = document.querySelector("div")
```

------------------

> 变量类型: unknown

- 格式:
- 变量: unknown

- 作用:
- 表示未知类型的值

- 在ts中就是有些情况我们不知道该变量具体应该是什么类型的时候 我们可以使用unknown
- 当遇到类型不确定的时候 能用unknown就用unknown

```js 
  // 它跟any有些像 也是可以给变量赋值任意类型的值
  let e: unknown;
  e = 10;
  e = 'hello';
  e = true;

  let s: string;
  s = e;            // 报错
```

> 它可以接受任意类型的值 但是不能将 e 赋值给别的变量

- unknown类型的值不能赋值给别的类型, 说白unknown只霍霍自己 自己愿意是啥类型就是啥类型, 但是不能赋值给别人
- unknown实际上就是一个类型安全的any unknown类型的变量, 不能直接赋值给其他的变量


> 那要是就是想把unknown的值赋值给其他的变量呢?
- 赋值之前需要做类型检测
- 检测unknown自身的数据类型, 如果和目标变量类型一致的时候 才可以赋值
```js 
  let e: unknown;
  let s: string;

  e = '我是文本'


  // 在赋值前 要对 unknown 做类型的校验 看看是不是 目标的类型
  if(typeof e === 'string') {
    s = e;
  }

  // 麻烦是麻烦 但是可以避免以后出各种的问题

```

------

> 类型断言

- 语法:
- <类型>变量 或者 变量 as 类型

- 告诉编辑器 变量的实际类型, e的类型就是字符串别给我报错了
```js 
  let e: unknown;
  let s: string;

  // 两种写法
  s = e as string;    告诉编辑器e就是string
  s = <string>e;      告诉编辑器e就是string
```

------------------

> 变量类型: undefined
- 很多情况下 我们定义变量 没有赋值的时候 它就是undefined 但是这样在ts中会报错 这时我们可以这么写
- 赋值了就是number 没有赋值就是undefined

- undefined 本身就是一种类型

```js
  let num: number | undefined;
```


> 变量类型: null
```js
  let num: null;
  // 该变量不能赋其它的值了

  // 一个元素可能是number类型 可能是undefined 可能是null
  let num: number | null | undefined;
```


> 变量类型: void
- 用来表示空值, 以函数为例 就表示没有返回值 
- 一般用于定义方式的时候 该方法没有返回值的时候应用
```js 
  // 某种程度来说undefined也是返回值 
  function run():void {
    console.log("test")
  }
```

- 当一个方法没有返回值的时候 我们可以给这个方法定义为 void 型

---

> 变量类型: never
- 和void有点像, 表示没有值 以函数为例 表示永远不会返回结果 连空(undefined null)也没有

- 它包含(undefined null)

```js 
  // 前面我们可以直接给函数的返回值设置类型
  function fn(): number {
    return 123;
  }

  // void
  // 但函数没有返回值的时候 比如函数内部的结果是 console alter等 这时候我们可以给函数的返回值设置类型
  function fn(): void {
    // 报错 只要有返回值就会报错, 因为我们设置了void表示我们的函数根本就不能有返回值
    return 123;   

    // 可以返回 undefined null等 不会报错
  }

  // never
  function fn(): never {
    // 在js中有一种函数 不会返回结果 连undefined也不会返回 用来报错的当程序出错的时候 我们利用这种函数来报错

    throw new Error('报错了')

    // 就类型这种函数只要一调用就会报错 一旦报错了, 程序就不往下执行了, 就不会有返回值了这种函数就没有返回值, 这种函数就可以设置为never
  }
```

------------------

> 变量类型: object
- obj表示一个js对象

- 格式:
- let a: object

- 以这种形式给上面给变量指定类型不太实用 因为js里面一切皆对象, 定义一个变量的类型为object则相当于对这个对象没有任何的限制 在开发的时候不太用 

- 在给 对象 指定类型的时候 *最好具体指定对象中的属性的类型*

- 一般我们使用 { } 给一个对象指定类型, 里面指定*必须包含有哪些的属性*

- 语法:
```js
  let b: {
    name : string  // 里面可以指定多个属性名和属性值
  }
```

- 指定变量b的类型是对象, 同时里面必须有name属性, 且类型为string
```js
  let b: {
    name : string
  };

  b = {}              // 报错 因为里面没有name属性
  b = { name: 'sam'}  // OK

  // 要求 我们指定的对象 和 结构 必须一某一样, 比如 我们上面定义了name
  b = {
    name: 'sam', 
    age:19
  }   // 报错
```

> 总结: 多了不行 少了不行

---

> 可选属性 属性名?
- 有一些时候, 我们定义多个属性名, 可能用不到 我们我们可以通过 ? 让这个属性名可选
- 在给变量定义类型的时候 放在 *变量?: 类型*
```js
let b: {
  name:string, 
  age?: number
}

b = {name: 'sam'}    // 也不会报错
```


> 自由属性 [属性名(自定义): string] : any
- 有的时候 我们除了必须要填写的属性名外, 后面的属性值可以任意的时候 我们就可以采用这种方式

- 属性名自定 属性值的类型任意

```js
let c: {
  name: string, 
  // 任意属性名 任意类型的属性值
  [propName: string]: any

  // or

  [_: string]: any
}
```

- 解析:
- [propName: string]  表示任意属性名 还可以用 _ 表示
- : any               表示任意类型

```js
  // 要求 我的对象里必须有一个name属性, 其它的属性我不管
  let c: {
    name: string, 
    [propName: string]: any
  }
```

---

> 定义函数的类型, 具体有什么参数, 返回值的类型是什么样的
- 注意： 这是在使用 ： 定义函数类型的时候 => 的后面是返回值的类型
- 如果是在 定义函数阶段 返回值的类型要在 形参的小括号的后面
```js
  let d: (a: number, b: number) => number;
```

- 定义d的类型是一个函数, 形参有两个a b且类型都是number 返回值也是number
- 使用箭头函数的形式 定义函数的结构
```js
  // 定义
  let d: (a: number, b: number) => number;
  d = function(n1: number, n2:number): number {
    return n1 + n2
  }
```


> 技巧: interface接口和对象的搭配使用
- *在定义对象的类型时，我们通常会使用 interface*。用接口来规定对象中的属性

```js
// 定义接口 相当于 设定了 属性的类型
interface Person {
  name: string;
  age: number;
  isProgrammer: boolean;
}

// 让一个对象实现这个接口 相当于 让接口去检查对象中的属性的类型 是否是接口中定义好的
let person1: Person = {
  name: 'ConardLi',
  age: 17,
  isProgrammer: true,
};


let person2: Person = {
  name: 'Tom',
  age: 3,
  isProgrammer: false,
};
```

- 接口中还可以指定 方法的各个类型
- 我们还可以用函数的类型签名声明一个函数属性，通用函数(sayHi)和箭头函数(sayBye)都可以声明：
```js
// 定义接口 里面是定义了方法的类型
interface Animal {
  eat(name: string): string;
  speak: (name: string) => string;
}

// 让该对象实现该接口
let tom: Animal = {
  eat: function (name: string) {
    return `eat ${name}`;
  },
  speak: (name: string) => `speak ${name}`,
};

console.log(tom.eat('Jerry'));
console.log(tom.speak('哈哈哈'));
```

------------------

> DOM 和 类型转换 ! (非空断言运算符)
- *TypeScript 没办法像 JavaScript 那样访问 DOM*。这意味着每当我们尝试访问 DOM 元素时，TypeScript 都无法确定它们是否真的存在。
- 使用非空断言运算符 (!)，我们可以明确地告诉编译器一个表达式的值不是 null 或 undefined。当编译器无法准确地进行类型推断时，这可能很有用：

- *告诉编译器这不是空*

```js
// 我们明确告诉 TS a 标签肯定存在
const link = document.querySelector('a')!;
```

- 这里我们没必要声明 link 变量的类型。这是因为 TypeScript 可以通过类型推断确认它的类型为 HTMLAnchorElement。
- 但是如果我们需要通过 class 或 id 来选择一个 DOM 元素呢？这时 TypeScript 就没办法推断类型了：

```js
const form = document.getElementById('signup-form');

console.log(form.method);
// ERROR: Object is possibly 'null'.
// ERROR: Property 'method' does not exist on type 'HTMLElement'.
```


> as HTMLXxxElement
- 除了告诉 ts 这不是空之外 我们还可以 具体的指定一个类型

- 我们需要告诉 TypeScript form 确定是存在的，并且我们知道它的类型是  HTMLFormElement。我们可以通过类型转换来做到这一点：
```js
const form = document.getElementById('signup-form') as HTMLFormElement;
console.log(form.method); // post
```

------------------

> 变量类型: array
- 在js中数组里面的值是没有类型的概念的, 数组中想存什么样的值都可以, 但是在开发中我们的数组一般都存放相同的值
- 我们要声明数组的时候, 都是声明我们要什么样的数组

> 方式一:  类型[]
- let a: string[];
- 希望我们的a是一个数组, 数组里面存放的都是字符串

**注意:**
- 我们要指明是什么样类型的数组 stringn[] number[]


- 先定义再赋值 和 初始化
```js 
  let a: string[];
  a = ['a', 'b'];

  let a: string[] = ["sam", "erin", "nn"]
```

- b是一个装数字的数组
```js
  let b: number[];
  b = [1, 2, 3]

  let b:number[] = [1, 2, 3]
```

---

> 方式二: Aarray<类型>
```js
  let arr: Array<number>;
  arr = [1, 2, 3]
```

- let arr: Array<number> = [1, 2, 3]
- 跟上面的意思一样 这种写法是泛型的写法
<!-- 
  再举一个不推荐的用法
  let c: Array<any> = [3, 4, "sam"]
 -->


- 想随意些的时候可以这样
- let arr: any[] = [1, "a"]



> 数组对象的举例1
```js
[{name: "sam", age: 18}, {name: "sam", age: 18}]

// 声明为对象数组
let docs: {}[]

// 还可以在{}指定 成员对象中的属性的类型
let docs: {
  text: string,
  flag: boolean,
  id: number,
  children: Array<any>
}[]


// 还可以这样
type ArrItem = {
  name: string,
  age: number
}

let arr:Array<ArrItem> = [
  {
    name: "sam",
    age: 18
  }
]
```


> 数组对象的举例2
```js
let books: object[] = [
  { name: 'Tom', animal: 'cat' },
  { name: 'Jerry', animal: 'mouse' },
]; // 只能包含对象
```


> 啥都行的数组
```js
let arr: any[] = ['hello', 1, true]; // 啥都行，回到了 JS
```


> 联合类型的数组
- 定义该数组的类型 只能中可选类型中选择
- 每一个元素的类型 可以是联合类型中的一个
```js
let person: (string | number | boolean)[] = ['ConardLi', 1, true];
```

------------------

> 变量类型: tuple 元组
- 元组, *属于数组的一种 就是固定长度的数组*
- 元组类型可以指定数组当中 值的类型
<!-- 当我们数组里面的值是固定的时候, 使用元组比较好一些 -->

- 格式:
- [类型1,类型2,类型3]

- let arr: [string, number, boolean] = ["sam", 123, true]
- 后面传入的值必须和元组中指定的类型和数量一致 不能多也不能少 且 类型必须一样
```js 
  let h = [string, string]
  h = ['abc', 'cbv']          // ok
  h = ['abc', 'cbv', 123]     // err
  h = ['abc']                 // err
```

------------------

> 变量类型: enum
- 枚举 把所有可能的情况全部的列出来

- 场景：
- 比如我们有这样一个 pay_status 变量
<!-- 
  pay_status: 0未支付 1支付 2交易成功

  刚开始的时候我们知道 012代表什么 当以后我们再来看代码的时候我们会发现我们不知道012代表什么意思了
  这时候我们就可以使用枚举
 -->

- 枚举类的作用就是将我们变量对应的常量 加了一个标识符 或者说将我们变量对应的值加上了描述
- 当我们在使用该值的时候可以通过 枚举类.描述符 的形式 清晰的拿到对应的值
- 这样即使我们给谁都可以清晰的知道该变量的值对应着什么意思

```js
  enum Pay {
    non_payment = 0,
    pay = 1,
    pay_done = 2,
  }

  // 当我们在其它地方使用上面的 status 的时候可以
  Pay.non_payment
  Pay.pay
  Pay.pay_done
```

- 意义在于
- 以前的话 我们直接看到的是 pay_status： 0
- 这样不能清晰的知道 0 代表着什么意思

- 但是现在通过枚举类我们可以这样写 pay_status: Pay.non_payment

- 目标值 通过 枚举类(枚举对象去调用) 定义 通过调用枚举类中的属性名 得到 目标值
- 这样目标值就有了 key 作为描述 我们可以通过key来更加清晰的认识 目标值的用途


> 使用方式
- 1. 定义枚举类 属性之间使用, 来连接
```js
enum 枚举名 {
  标识符(可以) = 值
  ...
}
```

```js 
  // 定义一个Flag枚举
  enum Flag {
    success = 1,
    error = -1
  }
```

- 2. *将定义的变量的类型指定为枚举类* 变量 f 的类型就是枚举类型
- 这样该变量才可以使用枚举类中的属性

```js 
  let f: Flag = Flag.success
  console.log(f)  // 1
```


> 场景2
```js 
  // 人有性别比如男 女 
  let i: {name: string, gender: string}
  i = {
    name: 'sam',
    gender: '男'
  }
```

- 我们在开发的时候一般不会这么这样存 存gender的目的就是为了判断 gender是男 还是女 所以 我们判断gender是男是女可以这样 i.gender === '男' 
- 但是 我们对象里的gender 不管是存 '男'也好 还是存 'male'也好 都是字符串 字符串存储在数据库中占地儿比较大, 所以我们期望我们存的数据尽可能的小
- 类似 gender 这种东西, 要么是 男 要么是女 最多来个保密, 3个值也就够了 所以像这种值在一定的范围之内的

- 比如 我们把gender的类型改成number
```js
  let i: {
    name:string, 
    gender:number
  }

  i = {
    name: 'sam',
    gender: 1
  }
```

- 这样接下来我再判断的时候就可以这样 i.gender === 1
- 比如我们还可以给gender设置范围
```js
  let i: {name:string, gender: 0|1}
```

- 但是上面写还是有问题, 我们是想以后拿去给别人做判断的, 我们设置的女生是0男生是1但是这个值, 不是我们自己用吧有可能别人用 但是别人不知道0 1代表男还是女
- 所以这时候我们就可以用到枚举了


>枚举类的使用的使用
> 1. 我们可以在定义枚举类的时候 只声明 枚举类中的key
```js
enum Gender {
  Male,
  Female
}
```
- 我们只声明了一个key 相当于我们目标对象 仅使用key就可以了 枚举类中第一个元素的默认值为0
- 如
```js
let person: Gender = {
  name: "sam",
  age: 18,
  gender: Gender.Male
}
```

- 这时候我们不关心 Gender.Male 到底有没有值 我们只是用来标记 和 通过 Gender.Male 来判断而已

**注意:**
- 1. 当没给枚举类中的属性赋值的情况下 该值默认从 0 开始
- 虽然我们没有给 Male Female 来赋值 默认值为从0开始 也就是说
- Male = 0
- Female = 1

- 2. 当枚举类中的属性为非数字的时候 枚举类中的属性 必须要有初始值
```js
enum Gender {
  Male = "男",
  Female    // 它会报错
}
```

- 3. 当枚举类的属性为数字或都没有赋值的情况下 其中一个属性没有赋值 则它的默认值为前一个属性的后续
```js
enum Gender {
  Male = 1,
  Female = 2,
  lala    // 它的默认值为 3
}


enum Gender {
  Male = 1,
  Female = 7,
  lala    // 它的默认值为 8 
}
```

---

> 2. 我们可以在定义枚举类的时候 声明key的同时 指定其值
```js
enum Gender {
  Male = 1,
  Female = 2
}
```

- 这样当我们通过 Gender.Male 调用的时候 就有其对应的value


> 示例:
- 定义一个枚举类
```js
  enum Gender {
    Male = 0,
    Female = 1
  }
```

- 在定义变量类型的时候 将性别的变量类型指定为枚举类
```js
  let i: { name: string, gender: Gender}
```

- 设置性别
```js
  i = {
    name: 'sam',
    gender: Gender.Male
  }
```

- 判断的时候
- i.gender === Gender.Male
```js 
  enum Gender {
    Male,
    Female
  }
```
```js
  // 指定 gender 属性 为枚举类型
  let a: {name: string, gender: Gender}
  a = {
    name: 'sam',
    gender: Gender.Male
  }

  console.log(a.gender === Gender.Male);
```


> |  &
- 上面简单的说了下 | 的用法
- let c: boolean | string; 变量c的类型可以是布尔 或者是字符串

- 还有 & 的用法
- let a: { name: string } & { age: number }
- 表示变量a 两者之间进行 & 也就是说 *变量a既要满足 { name: string } 也要满足 { age: number } 再直接点说 变量a中要有两个值*
```js
  a = {
    name: 'sam',
    age: 18
  }
```

**注意**
- 当我们定义 枚举类 的时候 *没有给枚举类赋值 那么对应的就是索引值*
```js
  enum Color {
    red,      // 0
    blue,     // 1
    orange    // 2
  }

  let c: Color = Color.blue
  console.log(c)   // 1


  // 情况2
  enum Color {
    red,
    blue=5,
    orange
  }

  let c: Color = Color.orange
  console.log(c)   // 6

  Color.red     为0
  Color.blue    为5
  Color.orange  为6     // 它会延续上一个的数字
```


> 类型的别名 type关键字
- 有一种情况 我们定义了一个类型, 这个类型比较繁琐, 然后还需要在别的地方用
- 我们就可以给这个类型起个别名( 有点像 less中的变量 啊)

- 语法:
- type 自定义名 = 类型

- 如果我们给对象定义类型
  type 自定义名 = { }

```js
  type myType = 1|2|3|4|5;
  let k: myType;


  type customerType = {
    name: string
  }

  let obj: customerType = {
    name: "1"
  }
```

------------------

### Ts中定义函数的方式

- 1. 函数要给返回值定类型
```js 
  function fn():string {}
  let fn = function():string {}
```

- 2. 函数要给参数定义类型
```js
  function fn(a:number, b:string):string { }
  let fn = function(a:number, b:string):string { }
```

- 3. 如果方法没有返回值 只用 void
```js 
  function fn():void { }
```

- 4. 可选参数
- es5里面方法的实参和形参可以不一样 但是ts中必须一样 如果不一样就需要配置可选参数
- 比如我们函数定义了两个形参 当调用函数的时候 我们传递一个实参也可以
- 但是ts中就不行 我们定义了几个形参那我们必须要传递几个实参
```js 
  function fn(name:string, age:number):string {
    if(age) { return `${name} -- ${age}` }
    else { return name }
  }

  fn("sam")   // es5没有问题 但是 ts会报错
```  


> 可选参数 可选形参后面?: (age?:类型)
- 那TS中怎么处理？ 函数中哪些参数是可选得
- 就是不传递对应的实参也不会报错？

- 可选参数配置后 该参数可传可不传
```js 
  function fn(name:string, age?:number):string { }
```

**注意：**
- 可选参数必须配置到参数的*最后面*
```js 
  function fn(name?:string, age?:number):void { } 
  // name的部分是错的
```


> 默认参数
- es5中没有办法设置默认参数的 但是es6和ts中是可以配置默认参数的
```js
  function fn(name:string = "sam", age:number = 20) { }
```


> 剩余参数 ...args
- 接收实参传递过来的值
- ...args的类型是一个数组 args既然是数组 那就可以使用数组的所有方法

- 同时 我们需要注意的是
- args的类型是数组 但是不代表我们在传递实参的时候 需要传递一个数组进去
- 我们传递 1，2，3 ...args 会将我们传递的实参 收集到一个数组里面
```js 
  function fn(num1:number, num1:number, num1:number):number {
    return a + b + c
  }
  fn(1,3,4)

  // 给 ...args 指定类型
  function fn(...args:number[]):number {

    console.log(typeof args)  // Array

    let res = args.reduce((pre, item) => {
      return pre + item
    }, 0)

    return res
  }

  console.log(fn(1,2,3))
```


> 函数的重载
- js是没有重载的

- java中方法的重载 
  重载指的是两个或者两个以上*同名函数* 但它们的*参数不一样 这时会出现函数重载的情况*
```js 
  // java中类似重载的写法
  function fn(config:any):any { ... }
  function fn(config:any, value:any):any { ... }
```

- ts中也出现了函数的重载 通过为同一个函数提供多个函数类型定义来实现多种功能的目的
<!-- 
  ts为了兼容es5以及es6 所以重载的写法和java中有区别
  es5中如果定义了重名的函数 下面的函数会将上面的函数替换掉
 -->

> Ts的重载
- 1. 前面的同名函数(要被重载的函数) 定义形参的类型 但不要写方法体 统一让最后一个函数来实现

- 2. 在最后一个函数中
  - 形参的类型为 any
  - 注意函数的返回值 有第三个函数的返回值类型决定
  - 在最后的函数体内 判断参数的类型 执行对应的逻辑

```js 
  function fn(name:string):string;    1
  function fn(age:number):number;     2
  function fn(str:any):any {          3   形参和返回值都是any

    // 我们可以在第三个函数中 对 形参进行类型的判断 从而判断走个哪个函数中的形参
    // 注意 该函数的返回值都是第三个函数中的 形参str
    if(typeof str == "string") {
      return "我叫" + str
    } else {
      return str + 10
    }
  }
```

------------------

### 面向对象
- 任何操作都是通过对象去操作, 在写程序的过程当中所有的操作都是通过对象进行的

- 面向对象是程序中一个非常重要的思想，它被很多同学理解成了一个比较难，比较深奥的问题，其实不然。面向对象很简单，简而言之就是程序之中所有的操作都需要通过对象来完成。

- 举例来说：
  - 操作浏览器要使用window对象
  - 操作网页要使用document对象
  - 操作控制台要使用console对象

- 一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机程序的本质就是对现实事物的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。

- 在程序中所有的对象都被分成了两个部分数据和功能，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为属性，而功能就被称为方法。所以简而言之，在程序中一切皆是对象。

- 一个具体的事物到程序里 就会以对象的形式存在


> 类 (class)
- 要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对象。要创建对象，必须要先定义类，所谓的类可以理解为对象的模型，程序中可以根据类创建指定类型的对象，举例来说：可以通过Person类来创建人的对象，通过Dog类创建狗的对象，通过Car类来创建汽车的对象，不同的类可以用来创建不同的对象。
```js
  class 类名 {

    // 对象(类)中主要包含两个部分:

    实例属性: 直接在类里面定义的属性就是实例属性

    static 静态属性： 在属性前使用static关键字可以定义类属性(静态属性)

    ---
    
    实例方法: 直接在类里面定义的方法就是实例方法

    static 静态方法:  如果方法以static开头则方法就是类方法 可以直接通过类去调用
  }
```

> 关键字
- static
- 静态属性 需要通过 类本身 来进行访问

- readonly  
- 加上readonly关键字, 实例对象只能访问 

- static readonly
- 关键字还可以连用 只读的静态属性 static 放在前面



> ts中定义类的方式(es6) 类的定义 示例:
```js 
  class Person {

    // 定义 死数据 实例属性
    (相当于省略了 public) name:string = "张三"

    /*
    - 前面省略了 public 关键字
      - 死数据我们可以通过实例对象访问到 p.name 打印结果会是 “张三”
      - 死数据的定义 也相当于我们在实例对象身上定义了一个name属性
    */
        

    // 定义: 动态实例属性 但注意 ts 中 属性一定要先声明其类型才能在下面constructor中赋值
    name:string;

    // constructor 会在实例化的时候自动调用
    constructor(n) {
      this.name = n
    }


    // 定义实例方法
    run():void {
      console.log(this.name)
    }

    getName():string {
      return this.name
    }

    // 这里的形参name是在调用setName的时候传递进去的参数 该函数用来修改name 所以没有返回值 使用的是void型
    setName(name:string):void {
      this.name = name
    }
  }


  // 实例化
  let p = new Person("张三")
  p.run()
```


> ts中如何实现继承
- extends super

```js 
  class Person {
    name:string
    constructor(name:string) {
      this.name = name
    }

    run():void {
      console.log(this.name + "在运动")
      console.log("-----")
    }
  }



  class P extends Person {

    // 子类 在扩展自己的属性的时候 要先定义 定义后才能在constructor中进行赋值
    age:number;

    // 当子类想要有自己的属性的时候要使用 constructor
    constructor(name:string, age:number) {
      // 先调用super 将父类需要的参数传递过去
      super(name)

      // this.name = name 这句写与不写 都行

      this.age = age
    }

    // 子类自己的额方法
    say():void {
      console.log(this.name + " " + this.age)
    }
  }

  let p = new P("erin", 18)
  p.say()
```



> 总结：
- 1. 实例属性 和 方法 在class中 直接定义 就可以在该实例中访问到
```js 
  // 定义实例属性 和 方法有两种情况

  - 1. 情况1 定义为死数据
  class Fn {
    name = "张三"
  }

  - 2. 情况2 通过实例对象的实参传递 那类中就需要定义constructor来接收
  class Fn {
    constructor(name, age) {
      this.name = name
    }
  }
```

- 2. 定义静态属性 和 方法 需要在属性和方法的前面使用static关键字

- 3. ts中要想在constructor中赋值 实例属性 必须要先定义
```js 
  name: string;   // 要先定义
  
  // 定义后 this.name = name  后面的name是传递进来的参数 前面的this.name是上面定义的实例属性
  constructor(name, age) {
    this.name = name
  }
```

- 4. 当子类中的方法和父类中的方法同名的时候 会覆盖掉父类中的方法

------

```js 
  class Person {
    /*
      对象(类)中主要包含两个部分
      属性:
        实例属性
          - 直接在类里面定义的属性就是实例属性

        类属性  
          - 在属性前使用static关键字可以定义类属性(静态属性)
    */

    // 定义实例属性, 必须创建实例对象 通过实例对象来访问
    // 这么写 实例对象可以对这个属性 可读可写
    name:string = '孙悟空';

    // 加上readonly关键字, 实例对象只能访问 
    readonly age:number = 18;

    // 关键字还可以连用 只读的静态属性 static 放在前面
    // static readonly aaa: string = '试试';

    // 定义类属性(静态属性)
    static gender: string = 'male';

    // 定义实例方法
    sayHello() {
      console.log('hello, 大家好')
    }

    // 定义类方法 如果方法以static开头则方法就是类方法 可以直接通过类去调用
    static sayHi() {
      console.log('hello, Hi')
    }
  }

  console.log(Person.gender);   // male


  // 实例属性前面如果没有加关键字 readonly 那么就是可读可写, 如果加了readonly就是可读不能写
  const per = new Person();
  console.log(per.name)         // 孙悟空
  per.name = '猪八戒'
  console.log(per.name)         // 猪八戒
```


> constructor构造函数 和 this
- 我们的类一般不会只创建一个对象, 所以通常情况下我们的类都是会创建多个对象 *类就是用来创建对象的*
- 但是有个问题 上面我们简单的了解类的时候 我们是这么定义类的
```js
  class Person {
    name: string = 'sam';
    age: number = 30;
  }
```

- 这样会有一个问题, 当我们创建实例的时候 实例里面的属性都是 sam 30
```js 
  const per1 = new Person();    // 内部的属性都是一样的
  const per2 = new Person();    // 内部的属性都是一样的
```

- 我们并不希望这样, 我们希望在创建实例的时候, 我们可以自己传入想要的实例
- 这时候我们就需要将实例属性写在 constructor里面, 构造函数会在对象创建的时候调用
```js 
  class Person {
    constructor(name:string, age:number) {
      /*
        写在这里面的属性, 会在new的时候被自动调用

        这里的this
        在实例方法中, this就表示当前的实例 在构造函数中当前对象就是当前新建的那个对象

        下面sam就是new出来的 this就是sam这个实例
        如果我在创建erin实例对象, 那么this就是erin这个实例

        我们可以通过this向新建的对象中添加属性
      */
      this.name = name;
      this.age = age
    }
  }

  // 当我们new的时候 实际上就相当于调用了 constructor
  const sam = new Person()
```

> 演练代码
```js
  class Dog {

    // 这里要定义下name age 相当于let const下
    name: string;
    age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }

    bark() {
      // 在方法中可以通过this表示当前调用方法的对象
      console.log(this)
    }
  }

  const dog = new Dog('小黑', 4);
  const dog2 = new Dog('小白', 4);

  console.log(dog, dog2);
```



> 继承 extends
- 当我们定义多个类的时候, 会有一些方法或者属性是相同的, 那每定义一个类都要写遍这些方法和属性, 会比较繁琐, 所以我们可以把相同的代码抽取到一个类中, 称之为父类(超类)

- 让其它新的类继承于父类就可以了 通过继承可以将多个类中共有的代码写在一个父类中, 这样只需要写一次即可让所有的子类都同时拥有父类中的属性和方法
<!-- 
  相当于将Animal中的代码 ctrl+A C 粘贴到Cat里
 -->

>>> 这节我们先谈谈子类的方法:
- 扩展子类独有的方法
- 扩展独有的方法, 如果希望在子类中添加父类中没有的属性或方法直接添加即可

- 覆盖掉父类中的同名方法, 如果在子类中添加了和父类相同的方法, 则子类方法会覆盖掉父类的方法
- 我们称之为方法的重写

**注意当我们在子类中写了跟父类一样的属性名 和 方法名 都会发生重写现象 包括 constructor**

```js 
  // 父类
  class Animal {
    name: string;
    age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }

    sayHello() {
      console.log('动物在叫');
    }
  }


  // 子类
  class Cat extends Animal {
    /* 
      Cat extends Animal
      此时Animal被称为父类, Cat被称为子类 使用继承后 子类会拥有父类的所有方法和属性
    */

      // 扩展独有的方法, 如果希望在子类中添加父类中没有的属性或方法直接添加即可
      run() {
        console.log(`${this.name}在跑~`);
      }

      // 覆盖掉父类中的同名方法, 如果在子类中添加了和父类相同的方法, 则子类方法会覆盖掉父类的方法
      // 这中形式 我们称之为方法的重写
      sayHello() {
        console.log('喵喵喵')
      }
  }
```


>>> 这节我们谈谈子类的属性
- 上面讲了 子类如何拥有自己的方法(重写 和 直接新增)
- 这节 我们说说 子类如何拥有自己的属性

> super 关键字
- 我们可以通过super关键字 来调用父类中的方法

```js 
  super.sayHello();

  sayHello() {
    super.sayHello();
  }
```
- 在类的方法中 super 就表示当前类的父类 这样写相当于 我们在通过Dog的实例对象调用sayHello的时候相当于内部在调用父类(super)中的sayHello

- 我们也可以通过 super() 调用父类的constructor
- 我们在子类中要定义自己的独有属性还是要通过constructor构造函数, 但是如果我们直接在之类中写了constructor, 因为父类中也有constructor 就会发生重写的现象
```js 
  constructor() {

    // 如果直接写 constructor 构造函数 会报错, 相当于重写了父类中的constructor(名字相同的函数会发生重写), 也就是说父类中的constructor就不会执行了 父类中的constructor中的属性就没有了 会报错
  }
```

- 所以在子类中调用 constructor 的时候 必须在子类的constructor内部调用 super() 

- 注意: 
- 父类中的参数 也要写进子类的constructor的形参中, 同时super(实参)也要传入实参
```js
  class Dog extends Animal {

    // 添加子类独有的属性
    age: number;

    constructor(name:string, age:number) {
      // 如果在子类中写了构造函数, 在子类构造函数中必须对父类的构造函数进行调用
      
      // super()调用父类的构造函数 父类中的形参也要在子类的constructor里写上, super(实参)也要写上父类实参

      super(name);      // 调用父类的构造函数 不写不行 语法错误
      this.age = age;
    }
  }
```


> 类中的修饰符
- ts中在定义属性的时候给我们提供了三种修饰符
- public
- protected
- private

> public 公有
- 在类里面 子类 类外面都可以访问
```js 
  // 我们上面在Person类中定义了name属性
  name:string

  // 该name属性可以在 类中访问 this.name 该name属性可以在 子类中访问 子类extends父类后就可以利用name属性
    constructor(name) {
      super(name)
    }

  // 该name属性可以在 在类外部可以访问该属性
  class Person { ... }
  let p = new Person("sam")
  p.name    // 类外部访问属性
```

> protected 保护
- 在类里面 和 子类里面可以访问 在类外面不可以访问

> private 私有
- 在类里面可以访问 在子类和类外面都不可以访问

> 注意：
- *属性如果不加修饰符默认就是公有 public*


> 静态方法 静态属性
- 静态方法和属性需要通过类名来读取和调用

- 静态方法的模拟场景 我们都用过jq 比如$.get这样方法就是静态方法
- 通过$类来直接调用的
```js 
  // 下面模拟下 jq封装方法的 情景

  // 创建一个获取元素节点 和 修改元素样式的类 该类实例化后 实例对象都能访问css方法
  function Base(el) {
      this.el = document.querySelector(el)
      this.css = function(attr, value) {
          this.el.style[attr] = value
      }
  }


  // 我们对 实例对象 进行一层封装 $就是实例化后的对象 它可以.
  相当于 new Person("sam").say()

  function $(el) {
      return new Base(el)
  }
  $(".test").css("backgroundColor", "red")
```

- ts中定义静态方法

**注意**
- 静态方法中没办法访问类中的属性(实例对象身上的属性 因为实例属性会在实例对象身上)
- 静态方法可以访问静态属性
- 静态方法中可以通过this和类名访问到静态属性
```js 
  class $ {

    static age:number = 12

    name:string
    constructor(name:string) {
      this.name = name
    }

    // 实例方法
    run():void {
      console.log(`${this.name}在跑`)
    }

    // 定义静态方法
    static print():void {
      console.log("我是静态方法")

      // 静态方法中不能访问实例对象或者说类中的属性
      console.log(this.name)    // x
      console.log(name)         // x

      // 静态方法中可以访问静态属性
      console.log(this.age)
      console.log($.age)
    }
  }

  new $("sam").run()

  // 静态方法 通过类名来调用
  $.print()
```


> 多态
- 父类定义一个方法不去实现 让继承它的子类去实现 每一个子类有不同的表现
- 多态属于继承 也是一种继承的表现形式

- 其实**多态就是子类重写父类中的方法**
```js 
  class Animal {
    name:string
    constructor(name) {
      this.name = name
    }

    // 父类中定义这个方法不去实现让子类去实现 每一个子类有不同的表现
    eat() {
      console.log("吃的方法")
    }
  }

  class Dog extends Animal {
    constructor(name:string) {
      super(name)
    }

    eat() {
      return this.name + "吃狗粮"
    }
  }



  class Cat extends Animal {
    constructor(name:string) {
      super(name)
    }

    eat() {
      return this.name + "吃喵粮"
    }
  }
```

> 总结下
- 父类animal定义了eat方法但是没有实现 dog和cat继承了父类 实现了不同的eat形式


> 抽象类 abstract
- 我们会把相同部分的属性和方法 抽取出来做成一个基类 父类 超类
- 这个类是专门用来继承的, 我们不希望通过这个基类去创建对象 这时候我们可以使用 abstract 关键字
<!-- 禁止该类创建实例化对象 -->

- 注意：
- 抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例
```js 
  // 定义抽象类
  abstract class Animal { }
```

- 抽象方法只是定义这个方法的结构 不定义这个方法的具体实现, 具体的实现由子类来决定

**注意：**
- 抽象类中可以添加抽象方法
- 抽象方法使用 abstract 开头 没有方法体
- 抽象方法只能定义在抽象类中, 子类必须对抽象方法进行重写
<!-- 
  正常父类定义的方法 子类在继承的时候 可以不重写父类的该方法
  但是抽象方法 要求子类必须重写
 -->


> 具体实现
- 抽象类 与 抽象方法前面都需要添加 abstract 关键字
- 抽象方法不必有方法体
- 抽象方法必须在抽象类中
```js 
  // 使用abstract定义抽象类
  abstract class Animal {

    name: string;
    constructor(name:string) {
      this.name = name;
    }

    // 定义个抽象方法, 子类必须对这个抽象方法重写, 并且抽象方法只能在抽象类中
    abstract sayHello():void;   没有返回值的类型
  }


  // 子类必须重写抽象方法
  class Cat extends Animal {
    sayHello() {
      console.log(this.name)
    }
  }
```

------------------

### 接口
> 作用：
- 用来定义 类 的结构 该类中应该包含哪些属性和方法

- 接口的作用 在面向对象的变成中 接口是一种规范的定义
- 它定义了行为和动作的规范 在程序设计里面 接口起来一种限制和规范的作用

- 接口定义了某一批 类 所需要遵守的规范 接口不关心这些 类 的内部数据 也不关心这些类里面方法的实现细节 它值规定了这批类里必须提供某些方法

- 提供这些方法的类就可以满足实际需要
- ts中的接口类似于java 同时还增加了更灵活的接口类型 包括属性 函数 可索引和类等


- 我们在上面学习了抽象类 抽象类中定义了一个标准 继承抽象类的子类必须要实现它或者重写抽象类中的方法
- 但是抽象类只针对 类 
- 接口相比抽象类更加的强大一些 它可以对属性 函数 以及类等 对它们的行为进行一些规范的限制

- 接口就是定义标准
<!-- 
  在现实生活中 我们链接机箱 和 显示器的线的一端就是接口 接口头的地方里面有各种类型的针 我们要想要使用这根线和机箱相连接 就必须是机箱 和 接口头的针对的上 才能插入进去

  比如宽度是多少 里面的针是对少
 -->

<!-- 
  接口的作用类似于抽象类，不同点在于接口中的所有方法和属性都是没有实值的，
  换句话说接口中的所有方法都是抽象方法。
  
  接口主要负责定义一个类的结构，
  接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。
  
  同时，可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。
-->


> 属性接口
- 下面是对 普通对象 和 函数形参对象中的属性做详解的
- 回顾一下 我们给函数参数定义规范的时候怎么操作的
```js  
  // 定义方法
    - 我们要求参数必须是一个对象 然后里面必须有 label 属性
  function print(labelInfo: {label: string}):void {
    console.log("print", labelInfo)
  }

  let lableInfo = {
    // 只有name的时候会报错
    name: "sam",  
    // 添加上label就通过    
    label: "info"
  }
  print(lableInfo)
```

- 接下来我们再看看接口是怎么定义的 看看对批量方法传入参数进行约束

> interface 关键字
- 通过这个关键字来定义接口
- 定义方式：
```js 
  // 注意内部语句结尾要以分号结束 然后实测 逗号 也行
  interface 接口名 {
    属性名: 类型(string);
  }
```

- 实现方式:
<!-- 
  利用接口对 对象进行约束
  const obj: 接口名 = {
    name: "sam"
  }
 -->

<!--  
  // 注意内部语句结尾要以分好结束
  interface FullName {
    // 对属性的约束
    firstName: string;
    secondName: string;
  }

  // 参数必须传入对象 对象中必须有firstName 和 secondName
  function printName(name:FullName):void {
    console.log(name.firstName + name.secondName)
  }


  // 要点看这里
  printName({firstName: "张", secondName: "三"})
 -->

\\ 要点： 
- 1. 如果我们直接在实参中传入对象 { } 那么该对象中的属性个数 类型必须和我们接口中定义的一致
<!-- 
  // 下面的就是接口里面的属性的个数 和 类型 与我们传入的对象中的属性个数和类型一致
  interface FullName {
    firstName: string;
    secondName: string;
  }
  printName({firstName: "张", secondName: "三"})

  比如 当我们多传递一个参数的时候就会报错
  printName({firstName: "张", secondName: "三", age: 18})  报错
 -->

- 2. 但是我们在调用函数的上一行 先定义一个对象 然后把这个对象变量传递到实参中的时候 该对象中只要有接口中约定的属性就可以 以及多了其它的属性也不会报错
<!-- 
  let obj = {
    firstName: "张", 
    secondName: "三", 
    age: 18
  }
  printName(obj)  这样就不会报错
 -->

**type 和 interface 的区别**
- 上面说了接口也可以当做类型声明去使用, 但是两者还是有区别的
- type 只能声明一次, 再次声明会报错
- interface 同名的接口可以声明多次, 接口中的规则按同名内容相加处理

<!-- 
  interface myInterface {
    name: string
  }

  interface myInterface {
    age: number
  }

  myInterface的接口最终会有两条规则 name 和 age
 -->


> interface 定义一个接口
- 定义类是以class开头, 定义一个接口是以interface开头
- 语法:
- interface 接口名 { ... }
<!-- 
  interface myInterface {
    name: string,
    age: number
  }

  这个接口的意思是 定义一个类, 规定了这个类的结构, 这个结构里面有两个属性

  const obj: myInterface = {
    name: 'sam',
    age: 18
  }
  创建obj并使用myInterface的接口类型, obj中属性名必须和接口中定义的一样不能多也不能少

  这里不要和上面给函数形参 匹配接口 弄混了 还是不一样的
 -->  


> 接口可选属性
- 在定义属性的时候后面加上? 就是可选属性 该属性在使用的时候可传可不传
<!-- 
  interface FullName {
    firstName?: string,
    secondName: string
  }

  printName({secondName: "三"})  不传递 firstName 也不会报错
 -->


> 使用接口 封装ajax案例
<!-- 
  interface config {
    type: string,
    url: string,
    data?: string,
    dataType: string
  }

  function ajax(config:config) {
    let xhr = new XMLHttpRequest()
    xhr.open(config.type, config.url, true)
    xhr.send(config.data)
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log("成功")
      }
    }
  }
 -->


> 数组的接口(可索引接口) [index: number]:string
- 索引值为number类型 索引对应的元素类型为string
- 不太常用

- emmm 索引值本来不就是number类型么

<!-- 
  正常我们定义数组的时候 它的元素是任意的类型
  let arr = [1, 2, "sam"]

  前面我们讲了给数组进行类型的约束 定义一个纯数字的数组
  let arr:number[] = [1, 2, 3]
  let arr:Array<string> = ["sam", "erin", "nn"]
 -->

- 接下来我们定义一个对数组进行约束的接口
<!-- 
  interface userArr {
    // 索引的类型必须是number 对应的value必须是string类型
    [index: number]:string    // 还可以写any
  }

  let arr:userArr = ["sam"]
  let arr:userArr = [123]     // 报错
 -->


> 对对象的约束(可索引接口)
- 用的特别少
<!-- 
  interface userObj {
    // 对象也是有索引值的 像map么
    [index: string]:string
  }

  let obj:userObj = {
    name: "sam"
  }
 -->


> 函数类型接口
- 对方法传入的参数 和 返回值进行约束 函数类型接口中 直接写
- (参数:类型):返回值类型
- 就可以
<!-- 
  // 加密的函数类型接口
  interface encrypt {

    // 这里面约束函数 不需要写function 直接写参数体() 下面就是对参数的类型 和返回值的类型做了约束
    (key: string, value: string):string
  }


  // 如果我们给key指定number类型就会报错 因为形参的数据类型 和 返回值 被 encrypt接口约束了
  let md5:encrypt = function(key:string, value:string):string {
    return key + value
  }

  let res = md5("name", "张三")
  console.log(res)
 -->


> 类中的接口 -- 对类的约束 和 抽象类有些相似
- interface可以在定义类的时候限制我们类的结构(这一点接口有点像抽象类)
- 接口就是规定类的结构
- 接口中的所有属性不能有实际的值
- 接口只定义对象的结构, 而不考虑实际值
  - 在接口中所有的方法都是抽象方法

> 定义类的接口
<!-- 
  interface Animal {
    // 该类中必须有name 且name为string类型
    name: string;

    // 该类中必须有eat方法  不用有方法体
    eat(str:string):void;
  }
 -->

> 实现类接口 implements
- 继承一个类 我们使用 extends
- 实现一个接口 我们使用 implements

- 实现接口就是使类满足接口的要求
<!-- 
  interface myInterface {
    name: string;
    eat(str:string):void;
  }

  // 用 Cat 这个类 去实现 myInterface 这个接口
  class Cat implements myInterface {
    为了满足 myInterface 接口的要求 我们的类中也必须有 name 和 eat

    // 1. 定义name属性
    name: string;

    // 2. 将name初始化
    constructor(name:string) {
      this.name = name;
    }

    // 3. 实现接口的方法
    eat() {
      console.log('大家好')
    }
  }
 -->


> 接口的作用
- 两个水管拧到一起, 中间就得有个接口, 我们的usb电脑上得有个typec的接口我们才能使用usb存读电脑中的数据吧, 接口其实就是定义了一个规范, 只要实现了接口就意味着满足了这个规范, 满足了规范就可以在我们指定的场景中使用

- 其实接口就是对我们类的一个限制
<!-- 
  比如:
  我们做了一个游戏 射击游戏, 里面有各种的枪械 对我们游戏玩家来说只要是枪我们就能开

  那怎么才算是枪? 要满足特定的需求吧 有枪口 扳机 能装子弹 它满足这个需求我们就能使用吧

  接口也是一样的 实现了接口就相当于满足了要求 满足了要求就能在特定的场景中使用
 -->


> 接口 和 抽象类
- 两者非常的相似, 也有一些区别
- 抽象类既可以有抽象方法, 也可有普通方法, 但是接口中都是抽象方法, 也就是说接口中定义方法属性就是让你实现的 并不会指定实际的值

- 再就是抽象类我们使用的关键字是 extends 实现接口的时候我们使用的 implements

- 接口最主要的特点还是定义了一个标准 限制了我们的类型去符合标准

------------------

### 属性的封装
- 之前我们创建的类的方式实际上是存在了一些的问题, 一些安全性的问题
<!-- 

  我们class类中的属性, 可以随时任意的在实例对象中被修改
  
  class Person {
    name: string;
    age: number;
    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }
  }

  const per = new Person('sam', 19);

  // 实例对象可以任意的修改类中的属性
  per.name = 'erin'
  per.age = -30
 -->

- 上面所说的不安全的地方在哪? 人的年龄是不可能出现负数的吧, 一旦我们的程序中以后需要用到年龄去计算, 那么一定会出错, 之所以属性被修改了就是因为 属性能在外面被访问到, 那怎么去避免这个现象


> TS中 类中属性的修饰符
> 1. public
- public 修饰的属性可以在任意位置修改(访问) 只要是public就可以随便改
- 任意位置 父类 子类 外部
<!-- 
  属性不设置修饰符的情况下 默认就是public
  class Person {

    // 给属性设置 public 修饰符
    public name: string;
    public age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }
  }
 -->


> 2. private
- private 私有属性, 私有属性只能在类的内部进行修改(访问)
<!-- 
  比如我们可以在constructor中访问和修改, 但是出了这个类就不行了 比如per.name就会报错 
-->
- 通过在类中添加方法使得私有属性可以被外部访问 我们可以通过暴露方法 让外部间接的访问这个属性

<!-- 
  给属性添加了 private 修饰符后 属性变得只能在类内部使用 类的外部访问不到, 但是还是有需要让外部可以访问到情况 我们可以通过方法让 private 属性暴露出去
  class Person {
    private name: string;
    private age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }

    // 定义方法 用来让外部获取name属性
    getName() {
      return this.name
    }

    // 定义方法 用来让外部设置name属性
    setName(value:string) {

      // 我们可以通过在方法中定义判断 来判断外部修改的值是否合法
      if(value < 0) {
        alert(输入参数格式错误)
      }
      return this.name = value
    }
  }


  // 创建实例
  const per = new Person('sam', 19);
    
  类外部通过调用方法 间接的访问类内部的属性 这种拿到不是通过 name属性, 而是通过方法得到的

  // 读取
  console.log(per.getName())

  // 设置
  per.setName('猪八戒');
  console.log(per.getName())

  上述还是可以修改到类中的属性, 不也不安全么?
  当我们把一个属性私有化后 private 就不能在外部访问了 如果想在外部访问 我们就得提供方法

  现在外部的修改都是通过内部提供的方法去修改对象中的属性, 这样的好处就是控制权在写类的人, 不想让对方设置类中的私有属性就不提供对应的修改方法

  数据安全性的问题也好解决, 既然是我自己提供的方法, 那么我就可以在set方法写上判断, 判断输入的值是否合法
 -->


> 3. protected
- protected 受保护的属性, 只能在当前类和当前类的子类中访问(修改)


> TS中的getter setter方法
- 在 private 修饰符后 类中的变量外部无法访问, 我们是通过自己定义的方法将属性暴露出去了, 其实TS中也给我们提供getter 和 setter方法

- ()前的name相当于属性名 类外部可以直接点属性名 per.name 能获取到类中name的值
- per.name 当我们的属性被设置为私有的情况下, .name并不是去找属性名, 而是去调用get方法

<!-- 
  class Person {
    private name: string;
    private age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }

    get name() {
      return this.name
    }

    set name(value:string) {
      this.name = value;
    }
  }

  // 创建实例
  const per = new Person('sam', 19);

  // 读取内部属性
  per.name
    - 当类中属性私有化都 我们.name 跟属性使用的方式一样 但是内部还是在调用get方法

  // 设置内部属性
  per.name = '猪八戒'
    - 使用方式还是跟以前一样 但是内容调用的是set方法
 -->


> class 类中 定义属性 和 属性初始化的语法糖
- 直接我们创建类定义属性的时候都是这么干的
<!-- 
  class C {
    name: string;
    age: number;

    constructor(name:string, age:number) {

    } 
  }
 -->

- 上面的有点麻烦 我们可以这样 定义属性, 初始化的语法糖
- 直接将属性定义在构造函数中 要使用修饰符 而且还不用写this了 下面的写法等价于上面的
<!-- 
  class C {
    constructor(public name:string, public age: number) {
      // 这里不用写this.name=name this.age=age了
    }
  }
 -->


> 接口扩展
- 接口可以接口接口
- 下面我们使用Person接口继承了Animal接口
- 然后我们创建了Web类 这个类实现了Person接口
- 那Web类就要满足 重写 eat 和 work 方法
<!-- 
  interface Animal {
    eat():void;
  }

  // 人也属于动物 这时候我们就可以让Person的接口继承Animal 也叫扩展接口
  interface Person extends Animal {
    work():void
  }

  class Web implements Person {
    eat() {
      console.log("eat")
    }

    work() {
      console.log("work")
    }
  }
 -->

> 一个类既可以继承父类同时还可以继承接口
> class Web extends Progammer implements Person {}
<!-- 
  Progammer 是一个class 类
  Person    是一个接口
 -->

------------------

### 泛型
- 软件工程中 我们不仅要创建一致的定义良好的api 同时也要考虑可重用性

- 组件不仅能够支持当前的数据类型 同时也能支持未来的数据类型 这在创建大型系统时为你提供了十分灵活的功能

- 在像c和java这样的语言中 可以使用泛型来创建可重用的组件 一个组件可以支持多种类型的数据 这样用户就可以 以做自己的数据类型来使用组件

- 通俗的理解
- 泛型就是解决类 接口 方法的复用性 以及对不特定数据类型的支持
<!-- 
  比如我们创建一个函数 我们不知道参数的类型是什么 可能是任意类型, 那返回值也就不确定了
  function fn(a:any): any {
    return a
  }

  可是使用any的时候会关闭掉ts的类型检查 那ts就没有意义了
  另外 从这个函数的定义上来看 并不能直观的看出返回值的类型和a是一样的

  所以凡是跟上面类型不明确的时候, 我们就可以使用泛型
 -->

- 在定义函数或者类时, 如果遇到类型不明确的就可以使用泛型

- 泛型就是一个不确定的类型 不知道具体的类型是什么
<!-- 
  因为我们要根据实际的调用情况来看 比如我调用的时候传递的是string 那么a的类型就是string 我传的是number  a就是number
 -->


> 解析
- ts中我们定义一个方法 形参string 返回值string
<!-- 
  function getData(value:string):string {
    return value
  }
 -->

- 这样我们就发现一个问题 这个方法不灵活 它只能够返回string类型的值 没办法复用到别的地方
- 那有什么办法让这个函数能够返回多种类型呢？ 
<!-- 
  使用 any 类型可以么？
  function getData(value:any):any {
    return value
  }
  
  这样虽然可以传入和返回任意类型 但是跟原生js有区别么？ 但使用any相当于放弃了类型检查
 -->

- 上面的any相当于放弃了类型检查 可能我们传入的数据 和 返回的数据不一样
- 有些时候我们希望我们传入什么类型的数据 就返回什么类型的数据
- 比如传入 number 必须返回 number 类型 为了解决这个问题 我们就出来了 泛型 的概念

> 泛型
- 可以支持不特定的数据类型 同时传入的参数和返回的参数一致
- 也属于任意类型 但是会要求传入和返回的结果一致

- 简单的说
- 我们可以自定自定义一个类型 将参数指定为该自定义类型 返回值也指定为该自定义类型 那么就实现了参数和返回值的类型是一致的

- 好像就是参数和返回值的类型用了同一个变量的感觉啊


> 定义泛型 <T(名字任意)>
- 指定一个泛型T(名字任意) 相当于我们自定义了一个类型(有点像变量)
- 自定义类型的操作 在函数名的后面使用 <任意名>

    function fn<T>(a:T):T {
      return a
    }

- 上面就是我们自定义了一个类型T 让形参的类型指定为T 让函数返回值的类型指定为T

> T是什么类型不知道, 只有在调用的时候才可以确定 
<!-- 
  好处是我们不用any 不用any就代表我们不用跳过类型检查了 
-->

- 这样我们从函数定义上看就能知道第一个参数和函数的返回值是相同的
<!-- 不用指出具体类型, 也能看出返回值和参数的类型相同 -->

<!-- 
  function getData<T>(value:T):T {
    return value
  }

  T是什么类型会在调用方法的时候确定
 -->


> 泛型的调用
> 1. 直接调用具有泛型的函数
- 不指定泛型 TS可以自动对类型进行推断
<!-- 
  // 这样就知道T的类型是number 相当于在传参的时候把number赋值给了T
  fn(10)
    - 也就是说明我们这次调用的时候, 参数 和 返回值都是number
 -->

> 2. 指定泛型T的类型   在函数名的后面指定
- 手动的指定T的类型是string
<!--  
  fn<string>('sam')
 -->
- 上面的好处就是我们拿到的变量的类型是明确的 结构会变得更加清晰


> 泛型可以指定多个
  function fn<T, K>(a:T, b:K):T {
    return a;
  }

  fn<number, string>(123, 'sam')    // 手动指定两个形参的类型
  fn(123, 'sam')                    // 自动推断两个形参的类型


> 泛型类 在类名后面指定泛型  class Min<T> { }
- 比如有个最小堆算法 需要同时支持返回数字和字符串两种类型 通过类的泛型来实现
<!-- 
  // 一个求最小数的类
  传入几个数 在其中找到最小的数
  class MinClass {

    // 如果只写 list:number[] 会报错 还得付个默认值咋的
    list:number[] = []

    add(num:number) {
      this.list.push(num)
    }

    min():number {
      // 这里去找list中最小的数
      let target = this.list[0]
      this.list.forEach(item => {
        if(target > item) {
          // 如果我们的目标值大于元素 我们要找最小值 所以就把 这两个值中的最小值给target
          target = item
        }
      })
      return target
    }
  }

  let m = new MinClass()
  m.add(2)
  m.add(22)
  m.add(12)
  m.add(88)

  let res = m.min()
  console.log(res)
 -->

- 上面的方法只满足了数字类型 因为我们上面这种方式定义 只能传入number类型
- 但是我们要求的是传入数字返回数字类型 传入字符串返回字符串类型
- 这就是我们要使用泛型来解决的问题

- 我们设计的这个class 不仅能支持当前的数据类型 但是还要支持其它的类型


> 类的泛型的指定 let p = new Demo<指定上面定义的泛型的类型>()
- 泛型的确定是调用函数的时候决定
- 类的泛型的确定 在new的时候指定
<!-- 

// 传入几个数 在其中找到最小的数
class MinClass<T> {

  // 如果只写 list:number[] 会报错 还得付个默认值咋的
  list:T[] = []

  add(value:T):void {
    this.list.push(value)
  }

  min():T {
    // 这里去找list中最小的数
    let target = this.list[0]
    this.list.forEach(item => {
      if(target > item) {
        // 如果我们的目标值大于元素 我们要找最小值 所以就把 这两个值中的最小值给target
        target = item
      }
    })
    return target
  }
}


// 实例化类 同时指定 上面定义的泛型的类型为string
let m = new MinClass<string>()
m.add("f")
m.add("b")
m.add("c")
m.add("d")

let res = m.min()
console.log(res)
-->

- 用泛型来写的好处就是 我们扩展性和复用性更强了 不单单的只能完成数字比较的逻辑 还扩展了字符串的比较逻辑

- 因为我们在调用的时候指定了泛型 还同时带有类型校验的功能 如果我们使用了any就代表我们关闭了类型的校验


> 泛型接口
- 我们先看看 函数接口是怎么定义的
<!-- 
  // 定义一个函数的接口 
  interface Config {
    (value1: string, value2: string): string
  }

  // 定义一个方法来实现接口
  let setData:Config = function (value1:string, value2:string):string {
    return value1 + value2
  }

  setData("name", "张三")
 -->

- 现在我想让上面的接口不仅能返回string类型 还可以返回 number类型 这种情况我们就可以结合泛型来实现

- 我们希望类型不是指定的 而是在调用方法的时候动态传入决定的


> 泛型函数型接口的定义
- 1. 在方法体的最前面自定义<T>
<!-- 
  interface Config {
    <T>(value1:T):T
  }
 -->

- 2. 在调用函数的时候 确定泛型的类型 这步相当于赋值
- 注意：
- 这种函数写法的泛型是在function的后面指定的
<!-- 
  let getData:Config = function<T> (value1):T {
    return value1
  }

  // 调用方法的时候决定泛型的类型 这步相当于给泛型来赋值
  getData<string>("张三")
 -->

- 之前的函数泛型是这样写的
<!-- 
  function add<T> (value:T):T
 -->


> 定义泛型接口的方式2
- <T> 放到了接口名的后面
- 在给函数应用接口的同时指定泛型的类型
<!-- 
  // 定义函数的泛型接口
  interface Config<T> {     // 改造的地方看这里
    (value:T):T
  }

  // 定义一个函数 该函数应用了泛型T
  function getData<T>(value:T):T {
    return value
  }

  // 定义一个函数指定了泛型接口 同时指定了泛型的类型 同时将上面定义好的函数给了myGetData

  let myGetData:Config<string> = getData
  myGetData("sam")


  上面相当于
  function demo() {
    console.log("demo")
  }
  let demo2 = demo
  demo2()
 -->


> 把类当做参数的(泛型类)
- 定义一个类
- 把类作为参数来约束数据传入的类型
<!-- 
  /**
 * 
 * 定义一个user类 
 *    - 这个类的作用就是映射数据库的字段
 * 
 * 然后定义一个 MysqlDb的类 
 *    - 这个类的作用就是操作数据库
 * 
 * 然后把user类作为参数传入MysqlDb这个类中
 * 
 * let user = new User({
 *    username: "张三"
 *    password: 123
 * })
 * 
 * let Db = new MysqlDb()
 * Db.add(user)
 */

// 这里给它们再指定一个undefined 因为ts校验害怕你不给username赋值
// 这里用于对字段进行约束
class User {
  username: string | undefined
  password: string | undefined
}

class MysqlDb {

  // 这个方法是用于往数据库添加数据的方法 它需要返回增加失败或者增加成功
  add(user:User):boolean {
    return true
  }

  // 我们调用add方法的时候往数据库中添加数据 所以add就要接收参数 这里我们传入了一个user类 因为user类中已经对内部的参数进行了校验

  // 所以我们可以把user类传入 add(user:User):boolean {...}
  add(user:User):boolean {
    return true
  }
}


// 因为每一个实例身上都会有username 和 password 这里来进行赋值
let user = new User()
user.username = "张三"
user.password = "123"

let Db = new MysqlDb()
Db.add(user)            // 这里传入了Uesr的实例
 -->

- 上面的案例属于一种综合应用
- 我们创建了一个类 用于做类型的检验 然后将这个类当做参数传入方法中
- 方法中形参的写法 形参:User类


- 上面还有一些问题 我们上面定义的 User类是用于对存入数据库的字段进行校验的
- 假如有用户表 那我们就要创建一个 User类
- 假如有作者表 那我们就要创建一个 Articlecate类 
- 同时我们还需要对操作数据的类也进行重复的封装 因为一个表要对应一个类
- 那我们是不是可以将 操作数据库的类 封装成一个泛型类 这样它能接受各种类型的值

- 这样就造成了不易复用 或者出现了重复的代码
- 这时候我们就可以利用 泛型 因为泛型可以帮助我们避免重复的代码

- 我们可以把上面操作数据库的类 定义成泛型类
<!-- 
  class MysqlDb<T> {
    add(user:T):boolean {
      return true
    }
  }

  // 定义一个User类和数据库进行映射
  class User {
    username: string | undefined
  }

  // 添加数据
  let u = new User()
  u.username = "sam"

  // 将数据添加到数据库中 并使用泛型类
  let Db = new MysqlDb<User>()
  db.add(u)
 -->


> <T extends Inter> 这种写法是 泛型T必须是 Inter 的实现类或者是子类
- 上面的写法 泛型的范围还是太大了 我们定义了T 和 K 相当于我们的泛型是任意类型 如果我想限制一下泛型的范围

  interface Inter {
    length:number;
  }

  // 这里我希望泛型的范围是Inter的子类(或者说是实现Inter接口这个类)
  function fn<T extends Inter>(a: T): number {
    return a.length
  }
  <!-- 
    T是一个泛型 并且必须实现 Inter 这个接口 这里所有的都用extends
   -->

  // 这时候我们调用fn并传递参数的时候 必须要实现Inter接口 也就是参数必须要有length这个属性
  fn('123')       // 可以 字符串有length属性
  fn(123)         // 不可以


> 除了在函数中使用泛型 在类中也可以有泛型

  class MyClass<T> {
    name: T;
    constructor(name:T) {
      this.name = name;
    }
  }

  const mc = new MyClass<string>('sam');

> 总结:
- 泛型就是在类型不明确的时候 整一个变量 用这个变量表示类型
- 泛型和接口属于锦上添花的东西


-----------------

###　使用TS封装一个 mysql mongodb 的操作数据库的库
- 要求：
- 1. mysql mongodb功能呢一样 都有add update delete get方法

- 注意：
- 约束统一的规范 以及代码中用

- 解决方案
- 需要约束规范所以要定义接口 需要代码复用所以用到泛型
  - 1. 接口
      - 在面向对象的变成中 接口是一种规范的定义 它定义了行为和动作的规范

  - 2. 泛型
      - 通俗理解 泛型就是解决类 接口 方法的复用

<!-- 
  // 定义一个操作数据库的接口 同时添加数据的时候 我们要在add方法中传入数据 但是什么类型不知道 所以我们要把这个接口定义为泛型接口
  interface DBI<T> {
    add(info:T):boolean;
    update(info:T, id:number):boolean;
    delete(id:number):boolean;
    get(id:number):any[];
  }

  // 分别定义mongodb mysql的类

  // 定义一个操作mysql的类
  // 注意当我们要实现一个泛型接口的时候 这个类也必须是一个泛型类
  class MysqlDb<T> implements DBI<T> {
    add(info:T):boolean {
      console.log(info)
      return true
    }
    update(info:T, id:number):boolean {
      return true
    }
    delete(id:number):boolean {
      return true
    }
    get(id:number):any[] {
      return []
    }
  }

  // 给mysql的表增加数据 操作用户表
  // 1 定义一个User类和数据表做映射
  class User {
    username: string | undefined;   // 防止编辑器报错再给一个undefined
  }

  // 给用户表增加数据
  let u = new User()
  u.username = "sam"

  // 调用MysqlDB给它的表里面增加数据 使用User类做为参数对我们传入的参数进行验证
  let oMysql = new MysqlDb<User>() 
  oMysql.add(u)

 -->


### 大地的视频 从17集开始没看 讲的是模块的概念
- https://www.bilibili.com/video/BV1yt411e7xV?p=17&spm_id_from=pageDriver
- 还有4集 模块 命令空间 装饰器 方法装饰器等

--------------------

### 收集:
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

interface item {
  id: number | string,
  content: string,
}

interface config {
  code: number,
  msg: string,
  items: Array<item>
}

let test: config = data

// ----

interface obj<T> {
  [propName: string]: T
}

let endObj = {
  a: 1
}

let startObj:obj<number> = endObj


```

----------------


### Type Script是什么?
- 以JS为基础构建的语言, 是一个js的超集
- 可以在任何支持js的平台中执行
- 由动态的js语言变成了静态的js语言, 扩展了js并添加了类型
- TS不能被JS解析器直接执行, 要编译后才能通过js执行

> 资料:
- https://mp.weixin.qq.com/s/NpDAZb07x9nlThf_Ow3Ddw


> 安装Ts编译器
- 将我们的ts文件转换为js文件
- npm i typescript -g
<!-- 
  输入命令 tsc 看看安装成功没
 -->


> 通过 tsc .ts文件 编译
- 在.ts文件的目录下
- tsc 文件名.ts
<!-- 
  同目录下会出现js文件
 -->


> tsc -v
- 查看版本

------------------

### TS的编译选项

> 监听指定文件 进行编译
- 命令
- tsc app.ts -w
<!-- 
  监听app.ts文件的变化, 实时编译 跟nodemon 像不像

  ctrl+c 停止监听
 -->


> 编译 / 监听 所有文件
- 1. 先在项目中创建 tsconfig.json 文件
<!-- 
  ts编译的配置文件 里面留个 { ... } 啥也不写都行 但是编译文件必须要有这个 tsconfig.json
 -->

- 2. 执行命令
- tsc / tsc -w
- 编译该目录下的所有ts文件, 或者监听所有的ts文件
<!-- 
  该项目下的所有ts文件都会被监听或者编译
 -->


- 2. 自动编译的方式2
- 在vscode上点击 -- 终端 -- 点击运行任务 -- 选择typescript -- 监视

------------------

> tsconfig.json 配置
- 这是ts编译器的配置文件, ts编译器可以根据它的信息来对代码进行编译

> tsc --init
- 该配置文件还可以通过 tsc --init 来生成
- 该命令创建的配置文件 会有各种被注释掉的配置信息


- ** 表示任意目录
- *  表示任意文件

- "include": ["./src/**/*"] 
- src文件夹下的任意目录任意文件

```js
  {
    "include": ["./src/**/*"],
  /* 
    include 包含 指定要编译的文件:
    include 的值是一个数组, 数据里面放需要编译ts文件的路径

    我们直接执行tsc命令 编译的是所有ts文件 在开发中并不是所有的ts文件都需要编译
    include用来指定哪些ts文件需要被编译
  */


    "exclude": ["./src/hello/**/*"]
  /* 
    exclude 定义需要排除在外的目录:
    exclude 的值是一个数组, 数据里面放不需要编译ts文件的路径

    src下的hello文件夹里面的ts文件不需要被编译
    
    有一些文件我们是不希望被编译的 必须我们的项目里会有一些我们下载的模块node_module这些模块是不需要被编译的

    默认值:
    ["node_modules", "bower_components", "jspm_packages"]
    不写exclude也会排除上面的文件夹
  */


    "extends": "继承配置文件的目录"
  /* 
    当配置文件特别的复杂 并不想重复写的时候 比如我想把xxx.json放在tsconfig.json里面 还不想自己写 就可以写这个属性
  */


    "files": ["core.ts"]
  /*  
    include是可以文件夹设置的
    files是直接给指定文件设置

    也就是说 只编译 core.ts 文件
  */

    "compilerOptions": {
      
      // target 用来指定ts被编译为的ES版本
      "target": "ES3",

      // 指定要使用的模块化的规范
      "module": "CommonJS",

      // lib用来指定项目中要使用的库
      "lib": ['示例:dom'],

      // 指定编译后文件所在的目录
      "outDir": "./dist",

      // 将代码合并成一个文件, 将编译后的文件合并到app.js文件中
      "outFile": "./dist/app.js",

      // 指定代码的根目录
      "rootDir": "./src",

      // 是否对js文件编译 默认是false
      "allowJs": true / false,

      // 使用ts的规范检查js代码是否符合ts的语法规范 默认值是false;
      "checkJs":true,

      // 是否删除注释 js文件中不会有注释了 默认false
      "removeComments": true / false,

      // 不对代码进行编译
      "noEmit": true / false,

      // 当有错误的时候就不生成编译文件 默认值为false
      "noEmitError": true / false,

      // 用来设置编译后的文件是否使用严格模式 默认值为false
      "alwaysStrict": true / false,

      // 是否不允许隐式的any类型 默认值为false
      "noImplicitAny": true / false,

      // 不允许不明确类型的this
      "noImplicitThis": true / false,

      // 
      "strictNullChecks" : true / false,
    }
```

- 下面的可选值都是小写:

> compilerOptions:
- 编译器的选项, 它决定了编译器如何对ts文件进行编译, 它里面有很多的子选项

- target: 
  - 可选值:
  - ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext


- module:
  - js最开始没有模块化的概念, 但慢慢的有很多的模块化的概念
  - 可选值:
  - CommonJS、UMD、AMD、System、ES2020、ESNext、None


- lib:
  在前端运行的话 是没必要改lib的
  库 比如我们操作的DOM DOM就是一个库 这个lib里指定上我们使用的库 然后ts就会按照有的库对我们的文件进行提示和检查
  我们可以写个错了 看提示 会看到默认值


- outFile:
  将多个ts文件, 编译成一个js文件
  设置outFile以后, 所有的全局作用域中的代码会合并到同一个文件中
  用了模块化的文件 模块化规范必须是 amd或者system 否则合并不了


- rootDir:
  指定代码的根目录
  默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录


- allowJs:
  是否对js文件编译 默认是false
  有的时候我们需要使用模块 这个模块是js写的 但是js如果不编译过去的话 是不正常的 这个时候我们就把这个属性改为true


- checkJs:
  使用ts的规范检查js代码是否符合ts的语法规范 默认值是false;
  但是也不是绝对的 有的时候我们引入的模块就是不符合ts的语法, 这种情况下我们就需要把这个关上

- allowJs  checkJs 要么都用要么都不用


- removeComments:
  是否删除注释  默认值：false
  我们在编译ts文件的时候, ts里面的注释会原封不动的拿到js文件里面
  如果不希望编译过去 我们可以改为true


- noEmit:
  不对代码进行编译  默认值：false
  比如有的时候 我们使用ts的编译功能只想检查下语法 我们就可以使用这个功能


- noEmitOnError:
  当有错误的时候就不生成编译文件 默认值为false
  改成true的话, 有错误的话就不会对文件进行编译了


- alwaysStrict:
  总是以严格模式对代码进行编译, 严格模式的语法比普通语法要严格一些 性能也会好一些
  如果想在我们编译后的js中使用严格模式 就设置这个配置 默认值false
  当js文件中模块代码的时候 默认就在严格模式下了


- noImplicitAny
  禁止隐式的any类型, 默认值为false
  显示any类型是值 我们自己定义的
  function fn():any {}
  隐式any类型 是我们忘记给变量指定类型的时候就会是隐式的any
  如果我们期望ts能为我们检查 有隐式any 我们可以开启这个配置
  any是一个类型, 当我们整一个变量不指定类型的时候默认就是any, any一旦设置了后就会关闭ts对这个变量的类型的检查 不推荐使用any 但是并不是绝对不能用


- noImplicitThis
  禁止类型不明确的this
  function fn() {console.log(this)} 前面我们学过this是跟调用者有关系, 但是这种情况下 我们没办法知道将来谁调用这个函数 也就是说不明确this是谁
  如果我们希望ts能帮我们检查这个this 我们就可以开启这个配置
  我们可以指定this的类型 ts就不会报错了
  function fn(this:window) {}


- strictBindCallApply
  严格检查bind、call和apply的参数列表


- strictNullChecks
  严格的空值检查
```js
let btn = document.querySelector('.btn')
btn.addEventListener('click', function() {
  alert(1)
})

/*
  上面是很简单的一段代码, 但是有的时候 btn 可能获取不到 也就是会是空值 如果我们希望ts能帮我们检查 空值 那就开启这个配置 在ts中我们就要这么写了
*/
    if(btn !== 'null') {
      btn.addEventListener('click', function() {
        alert(1)
      })
    }

    // 还可以使用?运算符 有就执行 没有就不绑定
    btn?.addEventListener('click', function() {
      alert(1)
    })
```

- strict
所有严格检查的总开关 一般开发建议开启这个


- strictFunctionTypes
严格检查函数的类型


- strictPropertyInitialization
严格检查属性是否初始化


> 额外检查

noFallthroughCasesInSwitch
检查switch语句包含正确的break
noImplicitReturns
检查函数没有隐式的返回值
noUnusedLocals
检查未使用的局部变量
noUnusedParameters
检查未使用的参数


高级

allowUnreachableCode
检查不可达代码
可选值：
- true，忽略不可达代码
- false，不可达代码将引起错误


noEmitOnError
有错误的情况下不进行编译
默认值：false

------------------

### webpack 打包ts代码
- 一般情况下我们在开发一个项目都会结合打包工具去使用ts

> 1. 生成package.json
- npm init -y

> 2. npm i -D webpack webpack-cli typescript ts-loader
- ts-loader ts的加载器

> 3. 跟目录下创建 webpack.config.js 文件
```js 
const path = require('path')

// webpack中的所有配置信息都应该写在module.exports中
module.exports = {

  // 指定入口文件 一般会创建src文件夹, 里面定义index.js作为入口文件
  entry:"./src/index.ts",

  // 指定打包文件所在的目录
  output: {

    // 指定打包文件的目录 直接写 './dist' 也可以 下面用path拼接了完整的路径
    path: path.resolve(__dirname, 'dist'),

    // 打包后文件的名字
    filename: "bundle.js",

    // 高版本的webpack放弃了对ie的支持, 所以打包文件的时候创建了使用箭头函数创建了作用域 如果还要支持老版本的ie那么就要告诉webpack我们要支持老版本的 会使用到下面的属性
    // 配置打包的环境 不使用箭头函数
    environment: {
      arrowFunction: false
    }

  },

  // ts是要编译的 编译成js 如何编译呢?
  // 指定webpack打包时要使用的模块(loader)
  module: {
    // 我们的项目里可能有很多的文件需要处理js css less等等

    // 指定要加载的规则
    rules: [
      {
        // test指定规则生效的文件(比如我们要使用ts-loader 但是这个ts-loader对谁生效啊) test的值是正则表达式 通过正则表达式匹配文件的名字
        test: /\.ts$/,

        // 匹配的文件怎么处理啊 跟上面的连起来就是我用ts-loader去处理ts结尾的文件
        use: "ts-loader",

        // 要排除的文件(不编译它) 一般要排除node_module文件夹 也是个正则
        exclude: /node_module/
      }
    ]
  },

  // 用来设置引用模块
  resolve: {
    // 凡是以ts结尾 和 以js结尾的文件都可以当做模块来互相引入
    extensions: ['.ts', '.js']
  }
}
```

> 4. 配置ts的编译规范
- 根目录下创建 tsconfig.json 文件
```js
  // 一般这样就可以
  {
    "compilerOptions": {
      
      "target": "ES2015",
      "module": "ES2015",
      "strict": true
  }
```

> 5. 修改package.json文件中
- script属性里添加 'build': 'webpack'
- 通过 npm run build 指定webpack命令
```js
  "script" : {
    "build" : "webpack"
  }
```

----------------

### webpack 配置扩展

> 自动创建html文件
- 现在是ts已经成功的转换为js文件了但是文件要运行最终还是需要有html文件, 我们也可以手动创建html文件, 但是有点麻烦 一是我要自己创建html文件, 二是当文件改变了比如以后要在html文件引入多个js文件 多个css文件的情况下还需要手动的一个个去改

- 我们希望html文件是自动被创建的 网页里面引入哪些资源都是根据项目的实际情况自己去做的调整
<!-- 
  比如有两个js就引入两个js 有10个就引入10个
 -->

- 要实现上面的操作就要下载一个webpack插件

> 1. npm i -D html-webpack-plugin
- 帮我们自动的生成html文件, 并且引入相关的资源

> 2. 在webpack.config.js中引入下载好的html-webpack-plugin
```js 
  const HTMLWebpackPlugin = require('html-webpack-plugin')
```

> 3. 在webpack.config.js中配置
- 在外层结构的最后面添加
```js
  plugins: [

    // 对生成的html文件进行配置的情况下, 在括号中传入对象
    new HTMLWebpackPlugin({
      title: 'hello, Ts',

      // 根据模板创建html文件
      template: './src/index.html',

      // 不设置这个属性的话 默认值会是 defer script标签内会有defer
      scriptLoading: 'blocking',

      // true || ‘head’ || ‘body’ || false  引入资源的位置 在底部还是头部(true | body)
      inject: 'head'
    }),
  ]
```

- 配置完后 输入命令 npm run build 就会在dist文件夹下出现 index.html文件

-----

> 添加webpack服务器
- npm i -D webpack-dev-server
- 装上这个后 可以让项目直接在这个webpack的服务器上运行 这个服务器跟webpack之间是关联的它会根据整个项目的改变自动刷新

> 1. 在package.json中 script属性里 添加命令
```js 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",

    // 启动webpack服务器并用 谷歌浏览器打开
    "start": "webpack serve --open chrome.exe"
  },
```

> 2. 执行 npm start命令
- 启动服务器 我们再在ts文件里做任何的操作都会实时的反馈到页面上

-----

> 清空dist文件夹再编译
- 上面是每次在编译文件后 其实是新的文件 覆盖掉 旧的文件
- 这个插件的作用就是在每次编译前清空dist文件夹

> 1. 下载
- npm i -D clean-webpack-plugin

> 2. 在webpack.config.js中引入下载好的clean-webpack-plugin

> 3. 在webpack.config.js中配置
<!-- 
  plugins: [ 
    new CleanWebpackPlugin()
  ]
 -->

-----

> babel
- 将新语法转换为旧语法
- 将浏览器中不支持的让它们变的支持

> 1. 下载babel
- npm i -D @babel/core @babel/preset-env babel-loader core-js
<!-- 
  @babel/preset-env 是运行环境 我们写的代码需要兼容不同的浏览器, 在这里它给我们预置了不同的环境 你是什么环境就转换为什么样的代码

  babel-loader 带loader的都是将这个包 和webpack结合在一起的工具

  core-js 让老的浏览器运行新技术
 -->

> 在webpack.config.js中进行配置
- 编译过程ts文件会先去找ts loader转换为js js再去找babel转换为浏览器适合的代码
```js 
  // ts是要编译的 编译成js 如何编译呢?
  // 指定webpack打包时要使用的模块(loader)
  module: {
    // 我们的项目里可能有很多的文件需要处理js css less等等

    // 指定要加载的规则
    rules: [
      {
        // test指定规则生效的文件(比如我们要使用ts-loader 但是这个ts-loader对谁生效啊) test的值是正则表达式 通过正则表达式匹配文件的名字
        test: /\.ts$/,

        // 匹配的文件怎么处理啊 跟上面的连起来就是我用ts-loader去处理ts结尾的文件 对这个文件再添加别的加载器 注意是又向左执行
        use: [
          {
            // 指定加载器
            loader:"babel-loader",

            // 设置babel 设置兼容的浏览器
            options: {
              // 设置预定义的环境, 假设我们的代码在哪去运行
              presets:[
                [
                  // 指定环境的插件
                  "@babel/preset-env",

                  // 配置信息
                  {
                    // 我的代码要运行在哪个浏览器里啊 里面是浏览器的版本 要兼容的目标浏览器
                    targets: {
                      "chrome":"88",

                      // 如果写了ie肯定会是var 如果没有因为chrome版本高会是const
                      "ie":"11",

                    },
                    // 指定使用哪个版本的corejs
                    "corejs":"3",

                    // 使用corejs的方式 usage表示按需加载
                    "useBuiltIns":"usage"
                  }
                ]
              ]
            }
          }, 
          "ts-loader"
        ],

        // 要排除的文件(不编译它) 一般要排除node_module文件夹 也是个正则
        exclude: /node_module/
      }
    ]
  },
```