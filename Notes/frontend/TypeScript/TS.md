# Ts的扩展知识体系

### **Ts中一些关键字 和 工具**  
```
https://juejin.cn/post/7003148571717402632

https://www.jianshu.com/p/92f7a1cad1d7
```

<br>

**<font color="#C2185B">in:</font>**  
生成映射类型

<br>

**<font color="#C2185B">is:</font>**  
用作类型保护

<br>

**<font color="#C2185B">infer:</font>**  
帮助我们推断出函数的返回值

<br>

**<font color="#C2185B">Partial:</font>**  
可把定义好的对象（包含 必选+可选项）类型全部转化为可选项
```js
// 已有定义类型Person
interface Person {
    name: string;
    age: number;
    id: number;
    sex: 0 | 1;
    address: string;
    weight: number;
}

// 使用方法
const newObj: Partial<Person> = {
    name: '张三' // 假如只需要一项 Partial的便捷性 可以不需要从新定义类型
};

// Partial<Person>等同于 NewPerson
interface NewPerson {
    name?: string;
    age?: number;
    id?: number;
    sex?: 0 | 1;
    address?: string;
    weight?: number;
}
```

<br>

**<font color="#C2185B">Required:</font>**  
Required 和 Partial刚好相反,可把定义好的对象（包含 必选+可选项）类型全部转化为 必选项

```js
// 已有定义类型Person
interface Person {
    name: string;
    age: number;
    id?: number;
    sex?: 0 | 1;
}

// 使用方法
const newObj: Required<Person> = {
    name: '张三',
    age: 1,
    id: 1,
    sex: 1
};

// Required<Person>等同于 NewPerson
interface NewPerson {
    name: string;
    age: number;
    id: number;
    sex: 0 | 1;
}

```

<br>

**<font color="#C2185B">Pick:</font>**  
顾名思义，可以采集 已定义对象中 自己需要的一部分形成新的定义类型。

```js
interface UserObj {
    readonly name: string;
    age: number;
    id: number;
    sex: 0 | 1;
    address: string;
    weight: number;
 }
 
 // 采集需要的
 type Person = Pick<UserObj, "name" | "id">;
 
 // 此时Person 等同于 Person1
 interface Person1 {
     readonly name: string;
     id: number;
}
```

<br>

**<font color="#C2185B">Record:</font>**  
在 TS 中，类似数组、字符串、数组、接口这些常见的类型都非常常见，但是如果要定义一个对象的 key 和 value 类型该怎么做呢？这时候就需要用到 TS 的 Record 了。
```js
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
```

<br>

**<font color="#C2185B">Omit:</font>**  
顾名思义 可以剔除 已定义对象中 自己不需要的一部分形成新的定义类型。

```js
interface UserObj {
    readonly name: string; // readonly 只读属性 只能初始化定义 不能二次赋值
    age: number;
    id: number;
    sex: 0 | 1;
    address: string;
    weight: number;
}

// 剔除省略自己不需要的
type Person = Omit<UserObj , "number" | "sex"  | "address" | "weight">;

// 此时Person 等同于 Person1

interface Person1 {
    readonly name: string;
    id: number;
}
```

<br>

**<font color="#C2185B">NonNullable:</font>**  
约束类型不能为 null 和 undefined

```js
type NonNullable<T> = T extends null | undefined ? never : T;
```

<br>

**<font color="#C2185B">Parameters:</font>**  
获取一个函数的参数类型，返回的是一组包含类型的数组
```js
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

<br>

**<font color="#C2185B">ConstructorParameters:</font>**  
获取构造函数中的参数类型
```js
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
```

<br>

**<font color="#C2185B">InstanceType:</font>**  
获取类的实例类型 和用类直接去约束类型一样

```js
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
```

<br><br>

# **报错信息: 对象可能未定义**  
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

<br><br>

# **declare:** 
假如我们封装了一个好用的工具 那么Ts的声明文件是必不可少的 它不仅仅让我们的工具支持Ts 更是负责充当一个说明书的作用 让人对其的使用一目了然

<br>

### **什么是声明语句？什么时候需要它？**  
假如我们想使用第三方库 jQ 一种常见的方式是在 html 中通过script标签引入 然后我们就可以使用全局变量 $

但是 ts 并不了解这两个变量从哪来的 到哪去 所以我们可以告诉 Ts的编译器 这个$大概是个什么东西

<br>

### **告诉 Ts $ 是什么**  

**<font color="#C2185B">声明变量: declare var $: (selector: string) => any</font>**  

```js
declare var $: (selector: string) => any
```

让 Ts编译器 可以正常检测 它会在编译结果中被删除

<br>

比如 如下代码在 Ts 中会报错
```js
foo = 123
console.log(foo)  // connot find name 'foo'


// 但是假如我们使用 declare 声明 那么即使在 Ts环境下也不会报错

declare var foo: number
foo = 123
console.log(foo)
```

也就是说我们可以通过 declare 关键字 声明一个js变量类型 这就是**声明语句** 

<br>

### **声明文件 sample.d.ts**  
一般这种声明方式都会写在 一个别的文件中  
这个文件中存放的都是 类型的定义 并且在打包的过程中 不会被编译到js文件里面

<br>

**<font color="#C2185B">.d.ts 文件的生成方式</font>**  
```
tsc -d sample.ts
```

<br>

**<font color="#C2185B">声明函数: declare function fnName() { ... }</font>**  

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

<br>

**<font color="#C2185B">declare module '模块名' { ... }</font>**  
使用上面的语法 我们声明一个模块 比如 vue在ts环境中使用的时候 需要做下面的声明
```js 
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

<br>

### **什么是声明文件？**  
我们可以把声明语句 看做是声明文件的组件 声明语句组成声明文件 通常我们会把声明语句放到一个单独的文件中 比如 jQuery.d.ts  

声明文件必须以 .d.ts 为后缀 一般来说 ts会解析项目中所有的 *.ts 文件 .d.ts 也属于 .ts 文件类型

所以我们将 jQuery.d.ts 文件放入到项目的根目录中后 其他所有 .ts 文件都可以获取 jQuery 的类型定义了 假如仍然无法解析 那么可以检查下 tsconfig.json 文件

<br>

### **书写声明文件**  
一般来说第三方库都会提供声明文件, 我们只需要安装它就好了。但有一些库不会提供声明文件, 我们就需要自己书写声明文件了。

前面只介绍了最简单的声明文件内容, 而真正书写一个声明文件并不是一件简单的事

书写声明文件有多种场景需要契合, 
例如 npm导入 和 script导入 的声明文件的写法与使用方法都不一样, 
我们这也知会讨论比较常用的这两种方式, 如果看官有兴趣, 可以自行移步教程学习。

<br>

### **全局变量: 通过 script 标签引入第三方库, 注入全局变量**  
全局变量是最简单的一种场景, 之前举的例子就是通过 script 标签引入 jQuery, 注入全局变量 $ 和 jQuery。

使用全局变量的声明文件时, 如果是以 ``npm install @types/xxx --save-dev`` 安装的, 则不需要任何配置。

如果是将声明文件直接存放于当前项目中, 则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）: 
```
| - src
  - index.ts
  - jQuery.d.ts
```

如果没有生效, 可以检查下 tsconfig.json 中的 files、include 和 exclude 配置, 确保其包含了 jQuery.d.ts 文件。

<br>

### **全局变量的声明文件主要有以下几种语法:**  

**1. declare var / let / const声明全局变量**  
没什么区别 const定义的无法修改。

使用const的时候是最多的, 一般不允许他人修改你的函数
```js 
declare const jQuery: (selector: string) => any;
```

<br>

**2. declare function 声明全局方法**  
```js
declare function jQuery(selector: string): any;
```

<br>

**3. declare class 声明全局类**  
```js
declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): string;
}

//其他文件中
let cat = new Animal('Tom');
```

<br>

**4. declare namespace 声明（含有子属性的）全局对象**  
declare namespace 还是比较常用的, 它用来表示全局变量是一个对象, 包含很多子属性。 举个例子: 
```js 
// jQuery 是一个全局变量, 它是一个对象 jQuery.ajax 方法可以调用
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

<br><br>

### **npm包的声明文件可能存在的位置**  
首先, 通过 import foo from 'foo' 导入, 符合 ES6 模块规范

在我们给一个 npm 包创建声明文件之前, 需要先看看它的声明文件是否已经存在。一般来说, npm 包的声明文件可能存在于两个地方: 

<br>

**位置1:**  
与该 npm 包在一起。package.json中有types字段, 或有一个index.d.ts声明文件。这种模式不需要额外安装其他包, 是最为推荐的, 所以以后我们自己创建 npm 包的时候, 最好也将声明文件与 npm 包绑定在一起。

<br>

**位置2:**  
发布到 @types 里。我们只需要尝试安装一下对应的 @types 包就知道是否存在该声明文件, 安装命令是 npm install @types/foo --save-dev。这种模式一般是由于 npm 包的维护者没有提供声明文件, 所以只能由其他人将声明文件发布到 @types 里了。

假如以上两种方式都没有找到对应的声明文件, 那么我们就需要自己为它写声明文件了。

<br>

### **import 语句导入的模块, 声明文件存放的位置有约束**  
由于是通过 import 语句导入的模块, 所以声明文件存放的位置也有所约束, 一般有两种方案: 

1. 创建一个 node_modules/@types/foo/index.d.ts 文件, 存放 foo 模块的声明文件。这种方式不需要额外的配置, 但是 node_modules 目录不稳定, 代码也没有被保存到仓库中, 无法回溯版本, 有不小心被删除的风险, 故不太建议用这种方案, 一般只用作临时测试。

2. 创建一个 types 目录, 专门用来管理自己写的声明文件, 将 foo 的声明文件放到 types/foo/index.d.ts 中。这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段。

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


<br><br>

# **const**  
```js
let a:string = "xxx";

const b = "xxx";
```
上面的代码 不光光是 let const 的区别 其通过他们定义的类型也不一样

**a变量:**    
实际为一种宽泛的字符串类型, 只要是字符串, 即可赋值给变量a

**b变量:**  
实际为一种具体的值类型, *类型为“xxx”*, 不可被修改 也就是说 const 定义的变量其类型就是 它值本身 因为const定义的变量是常量 不允许被修改
```js
const a = 10

// a:10 -- a的类型就是10
```

<br>

### **总结:**  
const关键字实际是将宽泛的类型, 例如字符串, 数字等转化为具体的*值类型*。  
**值类型也是单独的一种类型**  

<br><br>

### **断言: as const**  
**作用:** 
将 宽泛的联合类型 限定为具体的数值类型

<br> 

我们先看看下面的代码
```js
let m = 100

let n = "aaa"

// Ts自动推断 arr 的类型是 联合类型数组 arr: (string | number)[]
let arr = [m, n]

// Ts自动推断 c 的类型是 string | number 的联合类型
let c = arr[0]

c = 2000
c = "bbb"
```

我们能观察到 当我们把 m n 放入数组中后 arr的元素允许的类型就被推断为 (string | number) 所以我们取出数组中的任意一个元素 它的类型都是 联合类型

<br>

但是上面的情况我们要尽量的 **避免** 这时候我们就可以使用 as const 断言 将 宽泛的联合类型 限定为具体的数值类型

```js
let m = 100
let n = "aaa"

// 使用 as const 后 arr的类型变成了只读 且 每个成员的类型就是值本身 也叫做值类型 let arr: readonly [number, string]
let arr = [m, n] as const


// 注意: arr的成员没有办法被赋值
```

这样 首先我们能看到 arr 被当做了只读 而且它相当于被限定成了一个元祖 第一个数据只能是number 第一个数据只能是string

<br>

### **as const的使用场景:**  
当涉及到数组中 x y 的类型组合的时候 每个元素都会有两个类型 或者是 每个元素都是联合类型 当编辑器无法准确的识别 元素的类型的时候 我们就可以使用 as const

```js
function test() {

  let a = "abc"
  let b = (fname:string, lname: string): string => fname + lname

  // a: string | fn
  return [a, b]
}

// 解构返回值 拿到 y 函数
let [x, y] = test()

// 调用 y 函数并传递参数
console.log(y("sam", "erin"))


// 编辑器报错: 编译器认为 y 的类型是:
let y: 
  string | 
  ((fname: string, lname: string) => string)
```

上面的内容编译失败 y 的类型 编译器并不能认定 y 是一个函数  
这时候我们可以 as const 将宽泛的 string | (xxx) 转为 只读的 值类型

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

as const断言, 可以将代码中宽泛的数据类型定义具体话, 从而避免我们在开发过程中, 因为定义过于宽泛, 造成的各种数据处理的错误, 通过精准的数据类型定义, 更好的管理我们前端代码。

<br><br>

### **type关键字 定义数据类型:**  

**语法:**  
```js
type XxxType = 类型
```

<br>

**作用:**  
用于给目标定义类型

<br>

**<font coolor="#C2185B">定义 基本类型:</font>**  
```js
type strType = string
```

<br>

**<font coolor="#C2185B">定义 联合类型:</font>**  
```js
type strType = string | number
```

<br>

**<font coolor="#C2185B">定义 对象类型:</font>**  
```js
type strType = {
  name: string,
  age: number
}
```

<br>

**<font coolor="#C2185B">定义 数组类型:</font>**  
```js
type strType = number[]

// 联合类型的数组
type strType = (number | string)[]

// 定义对象数组
type listType = {
  name: string,
  age: number
}
let arr:listType[] = [
  {
    name: "sam",
    age: 18
  }
]
```

<br>

**<font coolor="#C2185B">定义 函数类型:</font>**  
```js
// 定义函数返回值
type rvType = () => string

// 定义函数的完整类型
type fnType = (param1:number, param2:boolean) => boolean

// 函数使用类型的位置
let fn:fnType = (param1, param2) => { ... }


// 普通函数的写法:
function fn(num:number, name:string, ...args:number[]):void { }


// 箭头函数的写法:
const fn2 = (num:number, ...args: string[]):void => { }


// 箭头函数的定义方式2: key:type = value
const fn5: (num: number) => number = (num) => 5
```

<br>

**分开定义的示例:**  
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

<br>

**interface:**  
interface 和 type 几乎一样 唯一的区别在于 <font color="#C2185B">type一旦定义 不能添加新的属性 定义好后无法修改</font>

而interface是可以进行继承的
```js
// type示例:
// 一旦定义好 就不能给 objType 添加属性了
type objType = {
  name: string,
  age: number
}

let obj: objType = {
  name: "sam",
  age: 18,


  address: "白山"  // 后期想要添加属性会报错
}



// 但是接口可以 因为接口可以继承
interface objType {
  name: string,
  age: number
}

// 利用继承给对象添加一个属性
interface addObjType extends objType {
  address: string
}

let obj: addObjType = {
  name: "sam",
  age: 18,
  address: "白山"
}
```

<br>

**同名接口 会进行合并, 所以如果是同名则不需要再用 extends 来继承**  
```js
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

<br>

### **type的添加新的属性类型(类似继承) &**  
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

<br><br>

### **typeof 关键字**  

**语法:**  
```js
type xxxType = typeof 数据结构
```

对一个数据结构使用 typeof 进行检查 可以返回给定数据结构的类型

<br>

**返回值: 类型**  

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

不仅如此我们还可以获取对象中指定数据的类型 如
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

<br>

### **技巧: typeof 与 类 结合使用**  
比如, 我们要定义一个函数 函数要求 传入 Point 类, 返回 Point 类
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

<br>

### **技巧: typeof 与 函数 结合使用**  
```js
type 变量 = typeof 函数
```

我们使用 typeof 关键字来检查一个函数, 会返回函数的类型
```js
function add(a: number, b: number): number {
  return a + b;
};

type AddType = typeof add;
// (a: number, b: number) => number
```

上面我们通过 ``typeof add`` 得到了 函数整体各个部分的类型 我们还可以根据下面的关键字 获取函数中部分结构的类型

<br>

**<font color="#C2185B">ReturnType&lt;上面获取到的类型&gt;</font>**  
获取 函数类型结构中 返回值部分的类型

<br>

**<font color="#C2185B">Parameters&lt;上面获取到的类型&gt;</font>**  
获取 函数类型结构中 形参部分的类型
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

<br><br>

### **keyof 类型(type)**  
可以用于获取 *某种类型* 的所有键, 也就是说 获取的是类型当中的key的部分 作为联合类型

**语法:**  
```js
type xxxType = keyof 某个type(比如可以是 typeof 数据结构 的返回值)
```

```js
type objType = typeof obj
/*
  type objType = {
    name: string;
    age: number;
  }
*/

type valueType = keyof objType
// type res = "name" | "age"
```

然后我们就可以将 res type 用在哪个数据结构上 该数据结构的值 只能是 "name" 或者是 "age"

```js
let str:valueType = "name"  // ok
let str:valueType = "age"   // ok
let str:valueType = "address"   // ng
```

<br>

**与 typeof 联合使用:**  

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

<br>

**使用场景:**  
我做过一个小案例, 按钮的回调形参里会传入 用户是什么样的操作 比如加减 函数内部根据具体的操作 来执行对应的逻辑

为了优化我将回调对应的函数逻辑封装到一个对象里面 想通过 形参type 进行调用
```js
methods = {
  inc() {
    console.log("inc")
  },
  dec() {
    console.log("dec")
  }
}

// js中肯定是好用的, 但ts中报错了
methods[type]()
```

报错信息如下:
```
元素隐式具有 "any" 类型, 因为类型为 "string" 的表达式不能用于索引类型 "{ dec(): void; inc(): void; del(): void; }"。
```

可能在说 对象中是函数 你的type是string 所以不能引用对象中的函数吧  
开始我想到的解决办法是 遍历数组 拿到一个个fn 通过判断 <font color="#C2185B">fn.name == type</font> 再进行调用 但性能不好 所以最终决定从 ts 的方向着手看看有没有什么方向
```js
methods = {
  inc() {
    console.log("inc")
  },
  dec() {
    console.log("dec")
  }
}

// js中肯定是好用的, 但ts中报错了
methods[type]()
```

<br>

**<font color="#C2185B">methods[type as keyof typeof methods]</font>**  
告诉 type 的值是 methods对象中的key 

```js
type methodType = typeof methods
/*
  type methodType = {
    inc(): void;
    dec(): void;
  }
*/

type keyType = keyof methodType
/*
  type keyType = "inc" | "dec"
*/
```

也就是说通过上述的方式 将我们的 type 的类型定义为 联合类型 "inc" | "dec"

<br><br>

### **数组的数据类型 定义的两种方式**  
1. Array<Item>
2. Item[]

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

<br><br>

### **Vue中 给 props 定义类型:**  
**引出 PropType**
```
import Vue, { PropType } from 'vue';
```

**应用:**
```js
props: {
  testerConditions: {
    type: Object as PropType<TesterConditions>,
    required: true,
  },
},
```

<br>

### **Vuex 和 Ts 搭配写 配置项的时候**  
**1. 引入**  
```
import { GetterTree, ActionTree, MutationTree } from 'vuex';
```

<br>

**2. 定义 state 的类型**  
```js
const state = () => {
  return new TesterAdapter();
};

// 获取 state 的类型 拿到上面函数中返回值的类型
type TesterState = ReturnType<typeof state>;
```

<br>

**3. getters 的写法**  
```js
const getters: GetterTree<TesterState, TesterState> = {
  // 下面是函数(想想computed)
  [types.GETTER_TESTER](state: TesterState): TesterAdapter {
    return { ...state };
  }
};
```

<br>

**4. actions 的写法**  
```js
const actions: ActionTree<TesterState, TesterState> = { }
```

<br>

**5. mutation 的写法**  
const mutations: MutationTree<TesterState> = { }

<br><br>

# Ts如果对待Vue中this

**场景:**  
在 Vue2 的场景中 我们可以会通过 Vue.extend({}) API 来创建一个个的组件 这样 this 可能会指向其中的任意一个组件 ts会推断不了this指向谁 

所以Ts可能会利用类型断言 实现this指向不同的对象 DataPollingMixin 就是一个组件

```js
// 首先先断言这个this是实例类型 然后泛型中指明是哪个实例类型
(this as InstanceType<typeof DataPollingMixin>).startDataPolling();
```

<br><br>

# Ts定义数据类型

### **类型声明:**  
类型声明是TS非常重要的一个特点 通过类型声明可以指定TS中变量（参数、形参）的类型

指定类型后, 当为变量赋值时, TS编译器会自动检查值是否符合类型声明, 符合则赋值, 否则报错

简而言之, 类型声明给变量设置了类型, 使得变量只能存储某种类型的值 ts文件可以被编译为任意版本的js文件

<br>

### **基本数据类型声明 方式一:**  
```js
let 变量名: 类型部分 = 值

let 变量: 类型;

let a: string;
```

一旦给变量指定了类型, 那么在以后的使用过程中这个变量只能是这个类型  
js中的变量可以是任何的类型, 但在一个项目中, 一不小心给这个变量重新赋值了其它的类型, 那么就相当于埋下了一个隐患, 为了排查错误的时候会非常的困难

<br>

### **示例**  
```js 
// 声明一个变量b 同时指定它的类型是number
let b: number;

b = 'aaa';    // 此行代码会报错 b的类型是number 不能赋值字符串
```

<br>

### **基本数据类型声明 方式二:**  
```js
let 变量: 类型 = 值
let a: boolean = true;
```

<br>

### **基本数据类型声明 方式三: -- (自动类型推断)**  
如果变量的声明和赋值是同时进行的(变量的初始化), TS可以自动对变量指定该类型 
a以后的类型就是123 number类型
```js
let a = 123;
```

<br>

### **函数类型声明:**  
js在函数中是不考虑参数的类型和个数的, 有可能就会造成在传递参数的时候 我传递一个数字 一个 字符串 结果是拼串, 会导致以后一系列的问题

<br>

**函数类型的声明位置:**  
```js
let 函数名: 类型;

let d: (a: number, b: number) => number;

// 函数的赋值, 上面定义函数的类型下面赋值
d = function(n1: number, n2:number): number {
  return n1 + n2
}
```

<br>

我们下面观察下 如何给函数的各个部分声明类型

<br>

**形参, 返回值, 可选参数, 剩余参数, 默认餐能数的类型声明:**  
```js 
function sum(a:number, b:number, c?:string, d:string = "hello", ...args:number[]): number {
  return a + b;
}

// 箭头函数的写法
const fn = (a: number):number => "a"  // 返回"a"的话会报错
```

<br>

### **ts中可以定义的类型**  
```
类型           例子                描述
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

tuple         [4,5]             元素, TS新增类型, 固定长度数组
enum          enum{A, B}        枚举, TS中新增类型
```
<br><br>

# 类型种类:

### **字面量 & 值类型**  
这相当于 变量的类型就是 10 也就是值类型 相当于常量
```js
let 变量:10
```

变量的初始值是10 类型是number 固定了 已经指定了下面就不能修改了整的有点想常量似的赋值一次不能修改了 一般不用这中方式
 
```js
// 定义 num 变量的值 为常量10
let num:10

// 尝试再次修改的时候 会报错
num = 20
```

<br><br>

### **联合类型 (值类型)**  
该变量的值 必须在值类型中选择 相当于定义了该变量的可选值, 定义完变量的可选值后 该变量的赋值 只能从可选值中选择

当我们给 b 变量进行赋值的时候 只能赋值为 这两个值 其中的一个
```js 
let b: 'male' | 'female';

// 一般可以这么用, 这样b的值只能是male 或者 female其中的一个
b = 'male';     // ok
b = 'female';   // ok
b = 'hello'     // err
```

**注意:**  
值类型的声明位置在  
```js
let 变量名: 可选值类型位置 = 值
```

<br><br>

### **any类型:**  
```js
let 变量名: any = 值
```

这个变量的值可以是任意类型, 可以任意赋值, 一个变量设置类型为any后相当于对该变量关闭了TS的类型检测 使用ts的时候, 不建议使用any类型, 那不跟js一样了
```js 
let d:any;    // 变量d可以是任意类型
d=10;
d='hello'
d=true
```

<br>

**<font color="#C2185B">隐式any:</font>**  
声明变量如果不指定类型, 则TS解析器会自动判断变量的类型为any (隐式的any) 
也就是 声明了变量但没有赋初始值
```js 
let d;    // 隐式any

d = 10;
d = 'hello'
```

<br>

**注意:**  
any类型的变量 它的值可以赋值给任意的其他变量(不仅霍霍自己还霍霍别人)  

我们使用TS的时候就是为了检测变量的类型, 当使用了any类型后 会导致和使用js一样的隐患

```js 
let s: string;    // s 是字符串类型
let d;            // d 是any类型 没指定就是any

s = d;            // 这时 我们将any类型的值 赋值给 s(string) 不会报错
```

<br>

**any的应用场景: 获取模版中的DOM节点**  
比如我们要获取html结构中的div节点
```js 
// 在页面有效果 但是ts会报错 这时候我们就可以给div指定一个any类型
let div = document.querySelector("div")
div.style.color = "red"

let div: any = document.querySelector("div")
```

<br><br>

### **unknown类型** 
表示未知类型的值
```js
let 变量: unknown = 值
```

在ts中就是有些情况我们不知道该变量具体应该是什么类型的时候 我们可以使用unknown
当遇到类型不确定的时候 能用unknown就用unknown

**它可以接受任意类型的值 但是不能将 e 赋值给别的变量**  

也就是 unknown 类型的值可以接收 但不能赋给别人

```js 
// 它跟any有些像 也是可以给变量赋值任意类型的值
let e: unknown;
e = 10;
e = 'hello';
e = true;

let s: string;
s = e;            // 报错
```

unknown实际上就是一个类型安全的any unknown类型的变量, 不能直接赋值给其他的变量

<br>

**将 unknown类型的变量 赋值给其它类型的变量时 要做判断**  
也就是 类型一致的时候 两个变量才可以互相赋值

```js
typeof varite == "number" && (varite2 = varite)
```

赋值之前需要做类型检测  
检测unknown自身的数据类型, 如果和目标变量类型一致的时候 才可以赋值  

<br><br>

### **类型断言: as**  
```js
let 变量: 类型 = 值 as 类型
```

```js
let 变量: 类型 = <类型>值
```

**作用:**  
主动告诉编辑器 变量的实际类型

<br>

**示例:**  
当我们想将 unknown 类型的变量赋值给其它变量的时候 正常在赋值前我们需要判断  
这里我们也可以直接断言 告诉编辑器 e变量的类型就是 string 与 s变量的类型一致 可以互相赋值
```js 
let e: unknown;
let s: string;

// 
s = e as string;    告诉编辑器e就是string
s = <string>e;      告诉编辑器e就是string
```

<br><br>

### **非空断言运算符 !:**  
**作用:**  
告诉 Ts编译器 该对象肯定存在(该对象不是null和undefined)


<br>

**使用方式:**  
值末尾处加 !
```js
let 变量 = 值!
```

TypeScript 没办法像 JavaScript 那样访问 DOM。

这意味着每当我们尝试访问 DOM 元素时, TypeScript 都无法确定它们是否真的存在。

这是我们就使用使用 非空断言运算符 (!)  **告诉编译器这不是空**  

通过它我们可以明确地告诉编译器一个表达式的值不是 null 或 undefined。当编译器无法准确地进行类型推断时, 这可能很有用: 

```js
// 我们明确告诉 TS a 标签肯定存在
const link = document.querySelector('a')!;
```

<br><br>

### **DOM元素的断言: as HTMLXxxElement:**  
```js
const link = document.getElementById('area') as HTMLAnchorElement
```

上面我们在获取 DOM元素的时候使用的是, 这时候TS会自动推断出 我们获取的DOM元素的类型为 

**HTMLAnchorElement**  
```js
let div = document.querySelector('a')

// 自动推断: 
let div: HTMLDivElement | null
```

这里我们没必要声明 link 变量的类型。这是因为 TypeScript 可以通过类型推断确认它的类型为 HTMLAnchorElement。

但是如果我们需要通过 class 或 id 来选择一个 DOM 元素呢 TypeScript 可能就没办法推断类型了
```js
const form = document.getElementById('signup-form');

console.log(form.method);
// ERROR: Object is possibly 'null'.
// ERROR: Property 'method' does not exist on type 'HTMLElement'.
```

所以我们要告诉Ts该DOM元素的类型是什么 除了告诉 ts 这不是空之外 我们还可以 具体的指定一个类型 我们需要告诉 TypeScript form 确定是存在的, 并且我们知道它的类型是  HTMLFormElement。我们可以通过类型转换来做到这一点: 
```js
const form = document.getElementById('signup-form') as HTMLFormElement;
console.log(form.method); // post
```

<br>

### HTML元素的类型:
- 一般均为HTMLElement  
- 特殊的为HTML+标签名+Element

当然也有些标签名为单字母的例如h1-h6，他们的类型为HTMLHeadingElement。
```
https://blog.csdn.net/weixin_44600183/article/details/125096976
```

<br><br>

### **undefined类型:**  
```js
let num: number | undefined;
```

很多情况下 我们定义变量 没有赋值的时候 它就是undefined 但是这样在ts中会报错 这时我们可以这么写 赋值了就是number 没有赋值就是undefined

undefined 本身就是一种类型, 也就是说 当变量未赋值 或有初始值 但可能包含空值的时候我们能可以使用 联合类型来解决这个问题

<br><br>

### **null类型:**  
一旦变量赋值为 null 它就不能接收其它的类型的值了
```js
// 该变量不能赋其它的值了
let num: null;
```

<br>

也可以使用联合类型来解决
```js
 // 一个元素可能是number类型 可能是undefined 可能是null
let num: number | null | undefined;
```

<br><br>

### **void类型:**  
一般用于定义函数的返回值的类型 void 为空值 不返回任何结果
```js 
// 某种程度来说undefined也是返回值 
function run():void {
  console.log("test")
}
```

当一个方法没有返回值的时候 我们可以给这个方法定义为 void 型

<br><br>

### **never类型:**  
和void有点像, 表示没有值 

以函数为例 表示永远不会返回结果 连空(undefined null)也没有 它包含(undefined null)

```js 
// 前面我们可以直接给函数的返回值设置类型
function fn(): number {
  return 123;
}

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

<br><br>

### **object类型:**  
```js
let a: object = { }
```

以这种形式给上面给变量指定类型不太实用 因为js里面一切皆对象, 定义一个变量的类型为object则相当于对这个对象没有任何的限制 在开发的时候不太用 

在给 对象 指定类型的时候 **最好具体指定对象中的属性的类型**  

<br>

**<font color="#c2185B">对象类型的定义, 在于定义对象内部属性值的类型:</font>**    
一般我们使用 { } 给一个对象指定类型, 里面指定*必须包含有哪些的属性*
```js
let obj:{属性名: 类型} = { k: v}
```

<br>

**示例:**  
指定变量b的类型是对象, 同时里面必须有name属性, 且类型为string
```js
let b: {
  name : string  // 里面可以指定多个属性名和属性值
}
```

<br>

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

<br>

### **对象中的可选属性:**  
```ts
let obj: { name?: string } = value
```

有一些时候, 我们定义多个属性名, 可能用不到 我们我们可以通过 ? 让这个属性名可选

在给变量定义类型的时候 放在 **属性名?: 类型**  

```js
let b: {
  name:string, 
  age?: number
}

b = {name: 'sam'}    // 也不会报错
```

<br>

### **对象中的自由属性:**  
有的时候 我们除了必须要填写的属性名外, 后面的属性值可以任意的时候 我们就可以采用这种方式, 属性名自定 属性值的类型任意
```js
let obj: {[_:string]: any}
```

<br>

**示例:**  
```js
let c: {
  name: string, 
  // 任意属性名 任意类型的属性值
  [propName: string]: any

  // or

  [_: string]: any
}


// 要求 我的对象里必须有一个name属性, 其它的属性我不管
let c: {
  name: string, 
  [propName: string]: any
}
```

<br>

### **对象类型的定义: interface**  
在给对象中的属性定义其类型的时候 一般我们会选择  interface 或者 type 下面我们看看 interface 的方式

**1. 定义接口:**  
```js
// 定义接口 相当于 设定了 属性的类型
interface Person {
  name: string;
  age: number;
  isProgrammer: boolean;
}
```

<br>

**2. 让对象实现接口:**   
让一个对象实现这个接口 相当于 让接口去检查对象中的属性的类型 是否是接口中定义好的
```js
// 让 person实现接口
let person: Person = {
  name: 'ConardLi',
  age: 17,
  isProgrammer: true,
};
```

<br>

**接口中方法的类型:**   
我们还可以用函数的类型签名声明一个函数属性
```js
// 定义接口 里面是定义了方法的类型
interface Animal {
  // 函数方式
  eat(name: string): string;

  // 箭头函数方式
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

<br><br>

### **Array类型:**  
在js中数组里面的值是没有类型的概念的, 数组中想存什么样的值都可以, 但是在开发中我们的数组一般都存放相同的值 我们要声明数组的时候, 都是声明我们要什么样的数组

**数组类型的定义方式1: 类型[]**  
```js
// 字符串数组
let arr: string[]

let arr: string[] = ["sam", "erin", "nn"]
```

<br>

**数组类型的定义方式2: ``Array<类型>``**  

```js
let arr: Array<number>;

let arr: Array<number> = [1, 2, 3]
```

<br>

**<font color="#C2185B">对象数组类型的定义方式:</font>**  
```js
let list:{k:type}[] = 数组
let list:{ name: string }[] = [{ name: "sam" }]
```

使用 type 关键字的方式
```js
type itemType = {
  name: "sam",
  age: number
}

let arr:itemType[] = [{}]
let arr:Array<itemType> = [{}]
```

<br>

**联合类型的数组:**  
定义该数组的类型 只能中可选类型中选择 每一个元素的类型 可以是联合类型中的一个
```js
let person: (string | number | boolean)[] = ['ConardLi', 1, true];
```

<br>

**示例:**  
```js
// 数组对象: 只能包含对象
let books: object[] = [
  { name: 'Tom', animal: 'cat' },
  { name: 'Jerry', animal: 'mouse' },
]; 


// 啥都行数组
let arr: any[] = ['hello', 1, true];
```

<br><br>

### **元组tuple类型:**  
**它属于数组的一种 就是固定长度的数组** 也就是数组的长度 成员类型都是固定的

```js
let arr:[string, number, boolean] = ["sam", 123, true]
```

后面传入的值必须和元组中指定的类型和数量一致 不能多也不能少 且 类型必须一样
```js
let h = [string, string]
h = ['abc', 'cbv']          // ok

h = ['abc', 'cbv', 123]     // err
h = ['abc']                 // err
```

<br><br>

### **枚举enum类型:**  
枚举的概念是将所有的情况全部的列举出来

我们想想当一个属性的值是有限的时候 我们可以考虑使用枚举

```
比如  
性别: 男 | 女  
班级: 1班 | 2班 | 3班
```

当情况有限的时候 我们并不一定要求值就是 男 或者 女 而是一种标识符 这时候枚举类中的key就相当于一个标识符

<br>

**创建方式:**  
类似于 class 的创建格式 只不过关键字替换成 enum, 因为类似class 内部使用的方式也和class中给属性赋值的方式一样

<br>

**使用方式1:**  
```js
// 定义
enum Item {
  key = value,
  key = value
}


// 使用
let 变量: 枚举类 = 枚举类.key
```

<br>

**使用方式2:**   
这种情况相当于使用 属性的默认值 
```js
enum Item {
  key,
  key
}
```

<br>

**注意:**  
**1. 属性之间使用 , 链接**  

<br>

**2. 当没给枚举类中的属性赋值的情况下 该值默认从 0 开始**   
虽然我们没有给 Male Female 来赋值 默认值为从0开始 也就是说  
Male = 0 | Female = 1

<br>

**3. 当枚举类中的属性为非数字的时候 枚举类中的属性 必须要有初始值**  
```js
enum Gender {
  Male = "男",
  Female    // 它会报错
}
```

<br>

**4. 当枚举类的属性为数字或都没有赋值的情况下 其中一个属性没有赋值 则它的默认值为前一个属性的后续**  
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

<br>

**示例:**  
```js
enum Action {
  STSTE_ONE = 1,
  STSTE_TWO = 1,
  STSTE_THREE = 1,
}

// 定义了一个对象 当中的state为 枚举类型
let info: {
  name: string,
  age: number,
  state: Action
} = {
  name: "sam",
  age: 18,
  // 使用枚举类型
  state: Action.STSTE_ONE
}

console.log(info.state) // 1
```

<br>

**使用场景1: 让状态对应的值具有描述**   
比如我们有这样一个 pay_status 变量

```
pay_status: 0未支付 1支付 2交易成功
```

刚开始的时候我们知道 012代表什么 当以后我们再来看代码的时候我们会发现我们不知道012代表什么意思了, 这时候我们就可以使用枚举

枚举类的作用就是将我们变量对应的常量 加了一个标识符 或者说将我们变量对应的值加上了描述

当我们在使用该值的时候可以通过 **枚举类.描述符** 的形式 清晰的拿到对应的值 这样即使我们给谁都可以清晰的知道该变量的值 **对应着什么意思**  

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

意义在于以前的话 我们直接看到的是 ``pay_status: 0`` 这样不能清晰的知道 0 代表着什么意思 但是现在通过枚举类我们可以这样写 ``pay_status: Pay.non_payment``

目标值 通过 枚举类(枚举对象去调用) 定义 通过调用枚举类中的属性名 得到 目标值 这样目标值就有了 key 作为描述 我们可以通过key来更加清晰的认识 目标值的用途

<br>

**使用场景2:**  
```js 
// 人有性别比如男 女 
let i: {name: string, gender: string}

i = {
  name: 'sam',
  gender: '男'
}
```

我们在开发的时候一般不会这么这样存 存gender的目的就是为了判断 gender是男 还是女 所以 我们判断gender是男是女可以这样 i.gender === '男' 

但是 我们对象里的gender 不管是存 '男'也好 还是存 'male'也好 都是字符串 字符串存储在数据库中占地儿比较大, 所以我们期望我们存的数据尽可能的小

类似 gender 这种东西, 要么是 男 要么是女 最多来个保密, 3个值也就够了 所以像这种值在一定的范围之内的

比如 我们把gender的类型改成number
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

这样接下来我再判断的时候就可以这样 i.gender === 1 比如我们还可以给gender设置范围
```js
let i: {name:string, gender: 0|1}
```

但是上面写还是有问题, 我们是想以后拿去给别人做判断的, 我们设置的女生是0男生是1但是这个值, 不是我们自己用吧有可能别人用 但是别人不知道0 1代表男还是女 所以这时候我们就可以用到枚举了

<br>

### 总结:
**1. 我们可以在定义枚举类的时候 只声明 枚举类中的key**  
如果我们只声明了一个key 相当于我们目标对象 仅使用key就可以了 枚举类中第一个元素的默认值为0
```js
enum Gender {
  Male,
  Female
}


let person: Gender = {
  name: "sam",
  age: 18,
  gender: Gender.Male
}
```

<br>

**2. 我们可以在定义枚举类的时候 声明key的同时 指定其值**  
这样当我们通过 Gender.Male 调用的时候 就有其对应的value
```js
enum Gender {
  Male = 1,
  Female = 2
}
```

<br>

### **|  &符号:**  
上面简单的说了下 | 的用法
```js
// 变量c的类型可以是布尔 或者是字符串
let c: boolean | string; 
```

<br>

**&的使用方式:**  
类似于继承, 或者说合并

表示变量a 两者之间进行 & 也就是说 **变量a既要满足 { name: string } 也要满足 { age: number } 再直接点说 变量a中要有两个值**  

```js
let a: { name: string } & { age: number }


a = {
  name: 'sam',
  age: 18
}
```

<br>

# 函数的重载
java中方法的重载, 指的是两个或者两个以上**同名函数** 但它们的**参数不一样 这时会出现函数重载的情况**  

当我们调用函数的时候 会根据形参来进行匹配 调用哪个同名函数
```js 
// java中类似重载的写法
function fn(config:any):any { ... }
function fn(config:any, value:any):any { ... }
```

<br>

js中虽然没有重载的概念 但是ts中提出了函数的重载 通过为同一个函数提供多个函数类型定义来实现多种功能的目的

但是ts为了兼容es5以及es6 所以重载的写法和java中有区别 es5中如果定义了重名的函数 下面的函数会将上面的函数替换掉

也就是说 **<font color="#C2185B">js中的重载更类似于重写的概念</font>**  

<br>

### **Ts的重载实现:**  
**首先**, 前面的同名函数(要被重载的函数) 定义形参的类型 但不要写方法体 统一让最后一个函数来实现

**然后**, 在最后一个函数中做如下的事情

- 形参 和 返回值的类型定义为any
- 最后的函数内判断 传入的参数的类型 根据类型决定使用上面哪个函数中的参数 最后由它决定返回值类型

```js 
function fn(name:string):string;
function fn(age:number):number;
function fn(target:any):any {
  if(typeof target == "string") {
    return "我叫" + target
  } else {
    return target + 10
  }
}

// 箭头函数的形式不知道怎么写
```

<br><br>

# 面向对象
任何操作都是通过对象去操作, 在写程序的过程当中所有的操作都是通过对象进行的

面向对象是程序中一个非常重要的思想, 它被很多同学理解成了一个比较难, 比较深奥的问题, 其实不然。面向对象很简单, 简而言之就是程序之中所有的操作都需要通过对象来完成。

**举例来说:** 
- 操作浏览器要使用window对象
- 操作网页要使用document对象
- 操作控制台要使用console对象

一切操作都要通过对象, 也就是所谓的面向对象, 那么对象到底是什么呢？这就要先说到程序是什么, 计算机程序的本质就是对现实事物的抽象, 抽象的反义词是具体, 比如: 照片是对一个具体的人的抽象, 汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象, 在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。

在程序中所有的对象都被分成了两个部分数据和功能, 以人为例, 人的姓名、性别、年龄、身高、体重等属于数据, 人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为属性, 而功能就被称为方法。所以简而言之, 在程序中一切皆是对象。

一个具体的事物到程序里 就会以对象的形式存在

<br>

### **类 (class)**  
要想面向对象, 操作对象, 首先便要拥有对象, 那么下一个问题就是如何创建对象。要创建对象, 必须要先定义类, 所谓的类可以理解为对象的模型, 程序中可以根据类创建指定类型的对象

举例来说, 可以通过Person类来创建人的对象, 通过Dog类创建狗的对象, 通过Car类来创建汽车的对象, 不同的类可以用来创建不同的对象。

<br>

**类内部部分的解析**  
```js
class 类名 {

  实例属性: 直接在类里面定义的属性就是实例属性

  static 静态属性:  在属性前使用static关键字可以定义类属性(静态属性)

  ---
  
  实例方法: 直接在类里面定义的方法就是实例方法

  static 静态方法:  如果方法以static开头则方法就是类方法 可以直接通过类去调用
}
```

<br>

### **关键字**  

**static:**  
静态属性 需要通过 类本身 来进行访问

**readonly**   
加上readonly关键字, 实例对象只能访问 

**static readonly**  
关键字还可以连用 只读的静态属性 static 放在前面

<br>

### **Ts中的类的书写方式:**  
**注意:**  
要实现通过 constructor 动态传参我们必须要先声明 constructor 中的形参的类型 然后才能再constructor种使用呢
```js 
class Person {

  // 定义 死数据 实例属性 (相当于省略了 public) 
  name:string = "张三"
      

  // 定义: 动态实例属性 但注意 ts 中 属性一定要先声明其类型才能在下面constructor中赋值
  name:string;

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

<br>

### **Ts中类的继承 extends**  
当我们定义多个类的时候, 会有一些方法或者属性是相同的, 那每定义一个类都要写遍这些方法和属性, 会比较繁琐, 所以我们可以把相同的代码抽取到一个类中, 称之为父类(超类)

让其它新的类继承于父类就可以了 通过继承可以将多个类中共有的代码写在一个父类中, 这样只需要写一次即可让所有的子类都同时拥有父类中的属性和方法 相当于将Animal中的代码 ctrl+A C 粘贴到Cat里

<br>

**子类的方法:**  
扩展独有的方法, 如果希望在子类中添加父类中没有的属性或方法直接添加即可

覆盖掉父类中的同名方法, 如果在子类中添加了和父类相同的方法, 则子类方法会覆盖掉父类的方法 我们称之为方法的重写

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

  // 覆盖掉父类中的同名方法, 如果在子类中添加了和父类相同的方法, 则子类方法会覆盖掉父类的方法 这中形式 我们称之为方法的重写
  sayHello() {
    console.log('喵喵喵')
  }
}
```

<br>

**子类的属性: super**  
上面讲了 子类如何拥有自己的方法(重写 和 直接新增) 

子类中我们可以通过super关键字 来调用父类中的方法

```js 
super.sayHello();

sayHello() {
  super.sayHello();
}
```

<br>

在类的方法中 super 就表示当前类的父类 这样写相当于 我们在通过Dog的实例对象调用sayHello的时候相当于内部在调用父类(super)中的sayHello

我们也可以通过 super() 调用父类的constructor  

我们在子类中要定义自己的独有属性还是要通过constructor构造函数, 但是如果我们直接在之类中写了constructor, 因为父类中也有constructor 就会发生重写的现象
```js 
// 子类中只要写了 constructor 就相当于覆盖掉了 父类中的constructor
constructor() {

  // 父类中的constructor就不会执行了 父类中的constructor中的属性就没有了 会报错
}
```

所以在子类中调用 constructor 的时候 必须在子类的constructor内部调用 super() 

<br>

**注意:**   
父类中的参数 也要写进子类的constructor的形参中, 同时super(实参)也要传入实参
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

<br>

### **类中的修饰符**  
ts中在定义属性的时候给我们提供了三种修饰符

**<font color="#C2185B">public:</font>**  
在类里面 子类 类外面都可以访问

<br>

**<font color="#C2185B">protected:</font>**  
在类里面 和 子类里面可以访问 在类外面不可以访问

<br>

**<font color="#C2185B">private:</font>**  
在类里面可以访问 在子类和类外面都不可以访问

<br>

**属性如果不加修饰符默认就是公有 public**  

<br>

### **静态方法 静态属性**  
静态方法和属性需要通过类名来读取和调用

静态方法的模拟场景 我们都用过jq 比如$.get这样方法就是静态方法 通过$类来直接调用的
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

<br>

### ts中定义静态方法

**注意:**  
- 静态方法中没办法访问类中的定义的实例属性
- 静态方法可以通过this或类名访问静态属性

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

<br>

### **TS中的getter setter方法**  
在 private 修饰符后 类中的变量外部无法访问, 我们是通过自己定义的方法将属性暴露出去了, 其实TS中也给我们提供 getter 和 setter方法

**使用方式:**  
相当于计算属性 想属性写成方法的形式 前面加上 get 关键字
```js
class Demo {
  get name() {

  }
  set name() {

  }
}
```

```js 
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
```

```js
// 读取内部属性
per.name
  - 当类中属性私有化都 我们.name 跟属性使用的方式一样 但是内部还是在调用get方法

// 设置内部属性
per.name = '猪八戒'
  - 使用方式还是跟以前一样 但是内容调用的是set方法
```

<br>

### **class 类中 定义属性 和 属性初始化的语法糖**  
直接我们创建类定义属性的时候都是这么干的
```js 
class C {
  
  name: string;
  age: number;

  constructor(name:string, age:number) {

  } 
}
```

上面的有点麻烦 我们可以这样 定义属性, 初始化的语法糖
直接将属性定义在构造函数中 要使用修饰符 而且还不用写this了 下面的写法等价于上面的
```js 
class C {
  constructor(public name:string, public age: number) {
    // 这里不用写this.name=name this.age=age了
  }
}
```

<br><br>

# **多态**  
父类定义一个方法不去实现 让继承它的子类去实现 每一个子类有不同的表现 多态属于继承 也是一种继承的表现形式

其实**多态就是子类重写父类中的方法**  
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

  // Dog重写eat
  eat() {
    return this.name + "吃狗粮"
  }
}



class Cat extends Animal {
  constructor(name:string) {
    super(name)
  }

  // Dog重写eat
  eat() {
    return this.name + "吃喵粮"
  }
}
```

<br>

# 抽象类 abstract
```js 
// 定义抽象类
abstract class Animal { }
```

抽象类中我们会把相同部分的属性和方法 抽取出来做成一个基类 父类 超类

这个类是专门用来继承的, 我们不希望通过这个基类去创建对象 这时候我们可以使用 abstract 关键字

<br>

**作用:**  
禁止该类创建实例化对象
抽象类中的抽象方法只是定义这个方法的结构 不定义这个方法的具体实现, 具体的实现由子类来决定

<br>

**注意:** 
- 抽象类是专门用来被其他类所继承的类, 它只能被其他类所继承不能用来创建实例
- 抽象类中可以添加抽象方法 抽象方法使用 abstract 开头 **没有方法体**  
- 抽象方法只能定义在抽象类中, 子类必须对抽象方法进行重写
- 抽象方法 要求子类必须重写

<br>

### **具体实现**  
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
  abstract sayHello():void;   // 没有返回值的类型
}


// 子类必须重写抽象方法
class Cat extends Animal {
  sayHello() {
    console.log(this.name)
  }
}
```

<br><br>

# 接口
### **作用:**  
用来定义 类 的结构 该类中应该包含哪些属性和方法

<br>

### **概念:**  
接口的作用 在面向对象的变成中 接口是一种规范的定义 它定义了行为和动作的规范 在程序设计里面 接口起来一种限制和规范的作用

接口定义了某一批 类 所需要遵守的规范 接口不关心这些 类 的内部数据 也不关心这些类里面方法的实现细节 它值规定了这批类里必须提供某些方法

提供这些方法的类就可以满足实际需要 ts中的接口类似于java 同时还增加了更灵活的接口类型 包括属性 函数 可索引和类等

我们在上面学习了抽象类 抽象类中定义了一个标准 继承抽象类的子类必须要实现它或者重写抽象类中的方法

但是抽象类只针对 类 接口相比抽象类更加的强大一些 它可以对属性 函数 以及类等 对它们的行为进行一些规范的限制

<br>

### **意义:**  
接口就是定义标准

在现实生活中 我们链接机箱 和 显示器的线的一端就是接口 接口头的地方里面有各种类型的针 我们要想要使用这根线和机箱相连接 就必须是机箱 和 接口头的针对的上 才能插入进去 比如宽度是多少 里面的针是对少

接口的作用类似于抽象类, 不同点在于接口中的所有方法和属性都是没有实值的, 换句话说接口中的所有方法都是抽象方法。
  
接口主要负责定义一个类的结构, 接口可以去限制一个对象的接口, 对象只有包含接口中定义的所有属性和方法时才能匹配接口。
  
同时, 可以让一个类去实现接口, 实现接口时类中要保护接口中的所有属性。

<br>

### **属性接口**  
下面是对 普通对象 和 函数形参对象中的属性做详解的 回顾一下 我们给函数参数定义规范的时候怎么操作的
```js
// 定义方法: 我们要求参数必须是一个对象 然后里面必须有 label 属性
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

接下来我们再看看接口是怎么定义的 看看对批量方法传入参数进行约束

<br>

### **interface 关键字**  
通过这个关键字来定义接口, 创建接口的方式和 class 的方式一样 只是换成 interface 关键字

```js 
// 注意内部语句结尾要以分号结束 然后实测 逗号 也行
interface 接口名 {
  属性名: 类型(string);


  // 可选属性
  属性名?: 类型(string);
}
```

**接口中只定义属性的类型 和 抽象方法**  

<br>

**使用方式: 实现接口**  
```js
// 利用接口对 对象进行约束
const obj: 接口名 = {
  name: "sam"
}
```

```js
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
```

<br>

**要点:**   
如果我们直接在实参中传入对象 { } 那么该对象中的属性个数 类型必须和我们接口中定义的一致
```js 
// 下面的就是接口里面的属性的个数 和 类型 与我们传入的对象中的属性个数和类型一致
interface FullName {
  firstName: string;
  secondName: string;
}
printName({firstName: "张", secondName: "三"})

// 比如 当我们多传递一个参数的时候就会报错
printName({firstName: "张", secondName: "三", age: 18})  报错
```

<br>

但是我们在调用函数的上一行 先定义一个对象 然后把这个对象变量传递到实参中的时候 该对象中只要有接口中约定的属性就可以 以及多了其它的属性也不会报错

```js 
let obj = {
  firstName: "张", 
  secondName: "三", 
  age: 18
}
printName(obj)  这样就不会报错
```

<br>

### **type 和 interface 的区别:**  
上面说了接口也可以当做类型声明去使用, 但是两者还是有区别的  
type 只能声明一次, 再次声明会报错  
interface 同名的接口可以声明多次, 接口中的规则按同名内容相加处理

```js
interface myInterface {
  name: string
}

interface myInterface {
  age: number
}

// myInterface的接口最终会有两条规则 name 和 age
```

<br>

### **使用接口 封装ajax案例**  
```js 
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
```

<br>

### **数组的接口(可索引接口) [index: number]:string**  
索引值为number类型 索引对应的元素类型为string
不太常用

emmm 索引值本来不就是number类型么

```js 
// 正常我们定义数组的时候 它的元素是任意的类型
let arr = [1, 2, "sam"]

// 前面我们讲了给数组进行类型的约束 定义一个纯数字的数组
let arr:number[] = [1, 2, 3]
let arr:Array<string> = ["sam", "erin", "nn"]
```

接下来我们定义一个对数组进行约束的接口
```js  
interface userArr {
  // 索引的类型必须是number 对应的value必须是string类型
  [index: number]:string    // 还可以写any
}

let arr:userArr = ["sam"]
let arr:userArr = [123]     // 报错
```

<br>

### **对对象的约束(可索引接口)**  
用的特别少
```js
interface userObj {
  // 对象也是有索引值的 像map么
  [index: string]:string
}

let obj:userObj = {
  name: "sam"
}
```

<br>

### **函数类型接口**  
对方法传入的参数 和 返回值进行约束 函数类型接口中 直接写 (参数:类型):返回值类型

**接口中抽象方法的类型定义:**  
```js
(形参: 类型):返回值类型
```

```js 
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
```

<br>

### **类中的接口 -- 对类的约束 和 抽象类有些相似**  
interface可以在定义类的时候限制我们类的结构(这一点接口有点像抽象类)
- 接口就是规定类的结构
- 接口中的所有属性不能有实际的值
- 接口只定义对象的结构, 而不考虑实际值
- 在接口中所有的方法都是抽象方法

<br>

**定义类的接口:**  
```js 
interface Animal {
  // 该类中必须有name 且name为string类型
  name: string;

  // 该类中必须有eat方法  不用有方法体
  eat(str:string):void;
}
```

<br>

### **实现类接口: implements**  
继承一个类 我们使用 extends  
实现一个接口 我们使用 implements  

实现接口就是使类满足接口的要求
```js
interface myInterface {
  name: string;
  eat(str:string):void;
}

// 用 Cat 这个类 去实现 myInterface 这个接口
class Cat implements myInterface {

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
```

<br>

### **接口扩展: extends**  
接口可以继承接口

下面我们使用Person接口继承了Animal接口 然后我们创建了Web类 这个类实现了Person接口
那Web类就要满足 重写 eat 和 work 方法

```js 
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
```

<br>

**注意:**  
**1. 一个类既可以继承父类同时还可以继承接口**  
**2. class Web extends Progammer implements Person {}**  

<br><br>

# 泛型
软件工程中 我们不仅要创建一致的定义良好的api 同时也要考虑可重用性

组件不仅能够支持当前的数据类型 同时也能支持未来的数据类型 这在创建大型系统时为你提供了十分灵活的功能

在像c和java这样的语言中 可以使用泛型来创建可重用的组件 一个组件可以支持多种类型的数据 这样用户就可以 以自己的数据类型来使用组件

<br>

### **通俗的理解:**  
泛型就是解决类 接口 方法的复用性 以及对不特定数据类型的支持

<br>

### **没有泛型的缺点**  
ts中我们定义一个方法 形参string 返回值string
```js 
function getData(value:string):string {
  return value
}
```
比如我们创建一个函数 我们不知道参数的类型是什么 可能是任意类型, 那返回值也就不确定了
```js 
function fn(a:any): any {
  return a
}
```

可是使用any的时候会关闭掉ts的类型检查 那ts就没有意义了 另外 从这个函数的定义上来看 并不能直观的看出返回值的类型和a是一样的 所以凡是跟上面类型不明确的时候, 我们就可以使用泛型 在定义函数或者类时, 如果遇到类型不明确的就可以使用泛型 泛型就是一个不确定的类型 不知道具体的类型是什么

因为我们要根据实际的调用情况来看 比如我调用的时候传递的是string 那么a的类型就是string 我传的是number  a就是number

<br>

### **泛型的概念:**  
可以支持不特定的数据类型 同时传入的参数和返回的参数一致 也属于任意类型 <font color="#C2185B">但是会要求传入参数的类型和返回的类型一致</font>

简单的说 我们可以自定自定义一个类型 将参数指定为该自定义类型 返回值也指定为该自定义类型 那么就实现了参数和返回值的类型是一致的

好像就是参数和返回值的类型用了同一个变量的感觉啊

<br>

### **泛型的定义**  
1. 声明泛型 在函数名的后面``<T>``
2. 函数结构中使用泛型
3. 传递实参的时候确认泛型的类型

**普通函数的声明方式:**  
```js
function fn<T>(a:T):T {
  return a
}
```

<br> 

**箭头函数的声明方式:**  
```js
// 这样定义会报错 <T> 会被认为是开始标签
let fn = <T>(params: T):T => params

// 修改方式1:
let fn = <T,>(params: T):T => params

// 修改方式2:
let fn = <T extends {}>(params: T):T => params

// 修改方式3: 跟2很接近就是利用 Record 告诉编辑器继承的是key为string value为安全any类型的对象
let fn = <T extends Record<string, unknown>>(params: T):T => params
```

先定义泛型函数的类型 
```js
type fnType = <T>(params: T) => T
let fn:fnType = (num) => {
  return num
}
```

<br>

**泛型函数的调用1: 直接调用**  
当我们调用了泛型函数并指定参数的时候 T就被确定的类型  
直接调用利用了Ts的自动推断功能
```js
fn(10)
```

<br>

**泛型函数的调用1: 指定泛型T的类型**  
我们还可以在 函数名的后面手动指定泛型的类型
```js  
fn<string>('sam')
```

<br>

### **泛型可以指定多个**  
```js
function fn<T, K>(a:T, b:K):T {
  return a;
}

fn<number, string>(123, 'sam')    // 手动指定两个形参的类型
fn(123, 'sam')                    // 自动推断两个形参的类型
```

<br>

### **泛型类**  

**类名后面声明 泛型**  
```js
class Min<T> { }
```

<br>

**场景:**  
比如有个最小堆算法 需要同时支持返回数字和字符串两种类型 通过类的泛型来实现
```js 
// 一个求最小数的类 传入几个数 在其中找到最小的数
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
```

上面的方法只满足了数字类型 因为我们上面这种方式定义 只能传入number类型 但是我们要求的是传入数字返回数字类型 传入字符串返回字符串类型 这就是我们要使用泛型来解决的问题

我们设计的这个class 不仅能支持当前的数据类型 但是还要支持其它的类型

<br>

### **泛型类的实例化:**  
```js
let p = new Demo<指定上面定义的泛型的类型>()
```

泛型的确定是调用函数的时候决定 类的泛型的确定 在new的时候指定
```js 

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
```

用泛型来写的好处就是 我们扩展性和复用性更强了 不单单的只能完成数字比较的逻辑 还扩展了字符串的比较逻辑

因为我们在调用的时候指定了泛型 还同时带有类型校验的功能 如果我们使用了any就代表我们关闭了类型的校验

<br>

### **泛型接口**  
我们先看看 函数接口是怎么定义的
```js 
// 定义一个函数的接口 
interface Config {
  (value1: string, value2: string): string
}

// 定义一个方法来实现接口
let setData:Config = function (value1:string, value2:string):string {
  return value1 + value2
}

setData("name", "张三")
```

现在我想让上面的接口不仅能返回string类型 还可以返回 number类型 这种情况我们就可以结合泛型来实现 我们希望类型不是指定的 而是在调用方法的时候动态传入决定的

<br>

### **泛型函数型接口的定义1**  
在方法体的最前面自定义``<T>``
```js 
interface Config {
  <T>(value1:T):T
}
```

在调用函数的时候 确定泛型的类型 这步相当于赋值  
注意: 这种函数写法的泛型是在function的后面指定的
```js 
let getData:Config = function<T> (value1):T {
  return value1
}

// 调用方法的时候决定泛型的类型 这步相当于给泛型来赋值
getData<string>("张三")
```

之前的函数泛型是这样写的
```js 
function add<T> (value:T):T
```

<br>

### **泛型函数型接口的定义2**  
``<T>`` 放到了接口名的后面 在给函数应用接口的同时指定泛型的类型
```js 
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
```

<br>

### **泛型类的应用:**  
有的时候我们会创建类 通过类来约束参数的类型 比如我们用 User 类, 来约束user对象中的属性是否符合要求

```js
const fn = (user:User) => { ... }
```

为了代码的复用性 我们不会直接的指定一个 User 类 而是 传入 T

我们先看下下面的案例

<br>

**示例:**  
定义一个类 把类作为参数的类型来约束数据

定义一个 User类, 这个类的作用就是用户表中的字段
定义一个 MysqlDb的类, 这个类的作用就是操作数据库 

操作数据库的方法中我们会将 user用户当做对象传入
```js
// 定义 User 类, 注意传递 undefined 处理可能出现的控制的情况
class User {
  username: string | undefined
  password: string | undefined
}


// 定义 操作数据的类
class MysqlDb {

  // 需要参数: user, 同时我们使用了 User 类来校验 user参数的类型 这个方法是用于往数据库添加数据的方法 它需要返回增加失败或者增加成功
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
```

上面的案例属于一种综合应用 我们创建了一个类 用于做类型的检验 然后将这个类当做参数传入方法中

上面还有一些问题 我们上面定义的 User类是用于对存入数据库的字段进行校验的

假如有用户表 那我们就要创建一个 User类  
假如有作者表 那我们就要创建一个 Articlecate类  

同时我们还需要对操作数据的类也进行重复的封装 因为一个表要对应一个类 那我们是不是可以将 操作数据库的类 封装成一个泛型类 这样它能接受各种类型的值

这样就造成了不易复用 或者出现了重复的代码 这时候我们就可以利用 泛型 因为泛型可以帮助我们避免重复的代码

我们可以把上面操作数据库的类 定义成泛型类
```js 
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
```


<br>

### **泛型类的约束:**  
上面的写法 泛型的范围还是太大了 我们定义了T 和 K 相当于我们的泛型是任意类型 如果我想限制一下泛型的范围


使用 extends 来约束泛型类的范围 必须是 Inter的子类或实现类
```js
class MysqlDb<T extends Inter> {}
```

<br>

**示例:**  
```js
interface Inter {
  length:number;
}

// 这里我希望泛型的范围是Inter的子类(或者说是实现Inter接口这个类)
function fn<T extends Inter>(a: T): number {
  return a.length
}

// 这时候我们调用fn并传递参数的时候 必须要实现Inter接口 也就是参数必须要有length这个属性
fn('123')       // 可以 字符串有length属性
fn(123)         // 不可以
```

<br>

###　使用TS封装一个 mysql mongodb 的操作数据库的库
**要求:**   
mysql mongodb功能呢一样 都有add update delete get方法

<br>

**注意:**  
约束统一的规范 以及代码中用

<br>

**解决方:**  
需要约束规范所以要定义接口 需要代码复用所以用到泛型
- 接口  
在面向对象的变成中 接口是一种规范的定义 它定义了行为和动作的规范

- 泛型  
通俗理解 泛型就是解决类 接口 方法的复用

```js 
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
```

<br><br>

### 大地的视频 从17集开始没看 讲的是模块的概念
https://www.bilibili.com/video/BV1yt411e7xV?p=17&spm_id_from=pageDriver
还有4集 模块 命令空间 装饰器 方法装饰器等

<br><br>

# 案例收集:

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

# Type Script是什么?
以JS为基础构建的语言, 是一个js的超集
可以在任何支持js的平台中执行
由动态的js语言变成了静态的js语言, 扩展了js并添加了类型
TS不能被JS解析器直接执行, 要编译后才能通过js执行

<br>

### **资料:**  
```
https://mp.weixin.qq.com/s/NpDAZb07x9nlThf_Ow3Ddw
```

<br>

### **安装Ts编译器**  
将我们的ts文件转换为js文件, 输入命令 tsc 看看安装成功没
```
npm i typescript -g
```

<br>

### **通过 tsc .ts文件 编译**  
在.ts文件的目录下, 同目录下会出现js文件
```
tsc 文件名.ts
```

<br>

### **tsc -v**  
查看版本

<br>

### **监听指定文件 进行编译**  
监听app.ts文件的变化, 实时编译 跟nodemon 像不像
```
tsc app.ts -w
```

<br>

### **编译 / 监听 所有文件**  
先在项目中创建 tsconfig.json 文件  
ts编译的配置文件 里面留个 { ... } 啥也不写都行 但是编译文件必须要有这个 tsconfig.json

<br>

执行命令, 编译该目录下的所有ts文件, 或者监听所有的ts文件
```
tsc / tsc -w
```

<br>

自动编译的方式2:  
```
在vscode上点击 -- 终端 -- 点击运行任务 -- 选择typescript -- 监视
```

<br>

### **tsconfig.json 配置**  
这是ts编译器的配置文件, ts编译器可以根据它的信息来对代码进行编译

```
tsc --init
```
该配置文件还可以通过 tsc --init 来生成 该命令创建的配置文件 会有各种被注释掉的配置信息

```
"include": ["./src/**/*"] 
```



```js
{
// src文件夹下的任意目录任意文件
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

下面的可选值都是小写:

### **compilerOptions:**  
编译器的选项, 它决定了编译器如何对ts文件进行编译, 它里面有很多的子选项
```
target: 
  - 可选值:
  - ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext


module:
  - js最开始没有模块化的概念, 但慢慢的有很多的模块化的概念
  - 可选值:
  - CommonJS、UMD、AMD、System、ES2020、ESNext、None


lib:
  在前端运行的话 是没必要改lib的
  库 比如我们操作的DOM DOM就是一个库 这个lib里指定上我们使用的库 然后ts就会按照有的库对我们的文件进行提示和检查
  我们可以写个错了 看提示 会看到默认值


outFile:
  将多个ts文件, 编译成一个js文件
  设置outFile以后, 所有的全局作用域中的代码会合并到同一个文件中
  用了模块化的文件 模块化规范必须是 amd或者system 否则合并不了


rootDir:
  指定代码的根目录
  默认情况下编译后文件的目录结构会以最长的公共目录为根目录, 通过rootDir可以手动指定根目录


allowJs:
  是否对js文件编译 默认是false
  有的时候我们需要使用模块 这个模块是js写的 但是js如果不编译过去的话 是不正常的 这个时候我们就把这个属性改为true


checkJs:
  使用ts的规范检查js代码是否符合ts的语法规范 默认值是false;
  但是也不是绝对的 有的时候我们引入的模块就是不符合ts的语法, 这种情况下我们就需要把这个关上

allowJs  checkJs 要么都用要么都不用


removeComments:
  是否删除注释  默认值: false
  我们在编译ts文件的时候, ts里面的注释会原封不动的拿到js文件里面
  如果不希望编译过去 我们可以改为true


noEmit:
  不对代码进行编译  默认值: false
  比如有的时候 我们使用ts的编译功能只想检查下语法 我们就可以使用这个功能


noEmitOnError:
  当有错误的时候就不生成编译文件 默认值为false
  改成true的话, 有错误的话就不会对文件进行编译了


alwaysStrict:
  总是以严格模式对代码进行编译, 严格模式的语法比普通语法要严格一些 性能也会好一些
  如果想在我们编译后的js中使用严格模式 就设置这个配置 默认值false
  当js文件中模块代码的时候 默认就在严格模式下了


noImplicitAny
  禁止隐式的any类型, 默认值为false
  显示any类型是值 我们自己定义的
  function fn():any {}
  隐式any类型 是我们忘记给变量指定类型的时候就会是隐式的any
  如果我们期望ts能为我们检查 有隐式any 我们可以开启这个配置
  any是一个类型, 当我们整一个变量不指定类型的时候默认就是any, any一旦设置了后就会关闭ts对这个变量的类型的检查 不推荐使用any 但是并不是绝对不能用


noImplicitThis
  禁止类型不明确的this
  function fn() {console.log(this)} 前面我们学过this是跟调用者有关系, 但是这种情况下 我们没办法知道将来谁调用这个函数 也就是说不明确this是谁
  如果我们希望ts能帮我们检查这个this 我们就可以开启这个配置
  我们可以指定this的类型 ts就不会报错了
  function fn(this:window) {}


strictBindCallApply
  严格检查bind、call和apply的参数列表


strictNullChecks
  严格的空值检查
```

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

```
strict
  所有严格检查的总开关 一般开发建议开启这个

strictFunctionTypes
  严格检查函数的类型

strictPropertyInitialization
  严格检查属性是否初始化
```

### **额外检查**  
```
noFallthroughCasesInSwitch
  检查switch语句包含正确的break

noImplicitReturns
  检查函数没有隐式的返回值

noUnusedLocals
  检查未使用的局部变量

noUnusedParameters
  检查未使用的参数

allowUnreachableCode
检查不可达代码

可选值: 
  true, 忽略不可达代码
  false, 不可达代码将引起错误

noEmitOnError
  有错误的情况下不进行编译 默认值: false
```

<br><br>

### webpack 打包ts代码
一般情况下我们在开发一个项目都会结合打包工具去使用ts

**1. 生成package.json**  
```
npm init -y
```

<br>

**2. 安装**  
```
npm i -D webpack webpack-cli typescript ts-loader
```

<br>

**3. 跟目录下创建 webpack.config.js 文件**  
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

<br>

**4. 配置ts的编译规范**  
根目录下创建 tsconfig.json 文件
```js
  // 一般这样就可以
  {
    "compilerOptions": {
      
      "target": "ES2015",
      "module": "ES2015",
      "strict": true
  }
```

<br>

**5. 修改package.json文件中**  
script属性里添加 'build': 'webpack'  
通过 npm run build 指定webpack命令  
```js
"script" : {
  "build" : "webpack"
}
```

<br><br>

# webpack 配置扩展

### **自动创建html文件**  
现在是ts已经成功的转换为js文件了但是文件要运行最终还是需要有html文件, 我们也可以手动创建html文件, 但是有点麻烦 一是我要自己创建html文件, 二是当文件改变了比如以后要在html文件引入多个js文件 多个css文件的情况下还需要手动的一个个去改

我们希望html文件是自动被创建的 网页里面引入哪些资源都是根据项目的实际情况自己去做的调整 比如有两个js就引入两个js 有10个就引入10个

要实现上面的操作就要下载一个webpack插件

<br>

**1. 安装**  
```
npm i -D html-webpack-plugin
```
帮我们自动的生成html文件, 并且引入相关的资源

<br>

**2. 在webpack.config.js中引入下载好的html-webpack-plugin**  
```js 
const HTMLWebpackPlugin = require('html-webpack-plugin')
```

<br>

**3. 在webpack.config.js中配置**  
在外层结构的最后面添加
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

配置完后 输入命令 npm run build 就会在dist文件夹下出现 index.html文件

<br>

### **添加webpack服务器**  
```
npm i -D webpack-dev-server
```

装上这个后 可以让项目直接在这个webpack的服务器上运行 这个服务器跟webpack之间是关联的它会根据整个项目的改变自动刷新

<br>

**1. 在package.json中 script属性里 添加命令**  
```js 
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "webpack",

  // 启动webpack服务器并用 谷歌浏览器打开
  "start": "webpack serve --open chrome.exe"
},
```

<br>

**2. 执行 npm start命令**  
启动服务器 我们再在ts文件里做任何的操作都会实时的反馈到页面上

<br><br>

### **清空dist文件夹再编译**  
上面是每次在编译文件后 其实是新的文件 覆盖掉 旧的文件
这个插件的作用就是在每次编译前清空dist文件夹

**1. 下载**  
```
npm i -D clean-webpack-plugin
```

<br>

**2. 在webpack.config.js中引入下载好的clean-webpack-plugin**  

<br>

**3. 在webpack.config.js中配置**  
```js 
plugins: [ 
  new CleanWebpackPlugin()
]
```

<br><br>

### **babel**  
将新语法转换为旧语法 将浏览器中不支持的让它们变的支持

<br>

**1. 下载babel**  
```
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

@babel/preset-env 是运行环境 我们写的代码需要兼容不同的浏览器, 在这里它给我们预置了不同的环境 你是什么环境就转换为什么样的代码

babel-loader 带loader的都是将这个包 和webpack结合在一起的工具  
core-js 让老的浏览器运行新技术

<br>

**2. 在webpack.config.js中进行配置**  
编译过程ts文件会先去找ts loader转换为js js再去找babel转换为浏览器适合的代码
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