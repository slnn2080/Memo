## 导出类型
我们会在vue3中定义类型, 同时会将定义好的类型 导出供别的地方使用 我们在ts配置文件中 如果设置了 ``isolatedModules`` 的话 那么我们导出类型的使用要使用如下的方式

```js
type commonTrademarkResType<T> = {
  code: number
  message: string
  ok: boolean
  data: T
}

export type { commonTrademarkResType }
```

<br><br>

## 组件的类型
```js
import type { App, Component } from 'vue'
```

1. App组件的类型为 App
2. 页面组件的类型: Component

<br><br>

## axios 类型相关

### axios中常用的类型

**1. AxiosRequestConfig: 请求配置对象的类型**  
AxiosRequestConfig是我们使用axios发送**请求传递参数的类型**。当然它也是我们请求拦截器里面的参数类型。

config里常用的有 url、method、params、data、headers、baseURL、timeout
```js
axios(config: AxiosRequestConfig) 
```

<br>

**2. AxiosResponse: axios请求返回值类型都是AxiosResponse类型**   
AxiosResponse是一个接口泛型，这个``泛型T``会应用到后端返回的``data``

```js
// 后端接口数据data: T;
// http状态码status: number;
// 来自服务器响应的 HTTP 状态信息statusText: string;
// 响应头headers: any;
// 请求配置信息config: AxiosRequestConfig;
// 请求request?: any;
export interface AxiosResponse<T = any>{
} 
```

<br>

**3. AxiosInstance: axios实例对象类型**  
axios.create(config?: AxiosRequestConfig)创建出来的对象都是AxiosInstance类型

<br>

**4. AxiosError: 响应拦截器里面的错误就是AxiosError类型**  
```js
export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;toJSON: () => object;
} 
```

<br>

**5. 请求拦截器中的use(config)的类型: ``InternalAxiosRequestConfig<any>``**  
```js
service.interceptors.request.use((config) => {

  // 返回配置对象
  return config
})
```

<br>

### axios方法的返回值类型设置方式

**1. get方法:**    
axios中get方法的定义为, get方法的泛型指明了get方法参数的类型
```js
Axios.get<any, AxiosResponse<any, any>, any>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
```

```js
// 方式1: 通过get方法的泛型指明, 返回值的类型
export const getUserInfo = () => {
  // 第一个泛型为url, 第二个泛型为返回值类型
  return service.get<string, userInfoType>(API.USER_INFO_URL)
}

// 方式2: 给 getUserInfo 函数设置其返回值类型, Promise<数据类型>
type getUserInfoFnType = () => Promise<userInfoType>
export const getUserInfo: getUserInfoFnType = () => {
  return service.get(API.USER_INFO_URL)
}
```

<br>

**2. post方法:**  
axios中post方法的定义为, post方法的泛型指明了post方法参数的类型
```js
Axios.post<any, AxiosResponse<any, any>, any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
```

```js
// 方式1: 通过post方法的泛型指明, 返回值的类型
export const login = (data: loginParamType) => {
  return service.post<string, loginResType>(API.LOGIN_URL, data)
}

// 方式2: 给 getUserInfo 函数设置其返回值类型, Promise<数据类型>
type loginFnType = (data: loginParamType) => Promise<loginResType>
export const login: loginFnType = (data) => service.post(API.LOGIN_URL, data)
```

<br>

### 定义axios方法的返回值类型: AxiosPromise
axios返回的是一个promise, 该promise的类型为 axios中提供的

```js
import axios, { AxiosPromise } from "axios"; // AxiosPromise类型

// 定义 响应回来的数据的类型
interface ResData<T> {
  result: T
}

interface Person {
  name: string;
  age: number;
  gender: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export function addPersonApi(params: Person): AxiosPromise<ResData<Person>> {
  return axios.post("/addPerson", params)
}
```

<br><br>

## string | null
当我们将一个数据的类型设置为 ``string | null`` 这种联合类型的时候, 在赋值操作的时候可能就会报错, 比如不能将undefind赋值给 string | null

这时我们就要使用 **断言**  
```js
// this.token的类型为 string | null
// res.data.token 可能是undefind
// res.data.token as string 保证 res.data.token 必须是字符串的时候赋值给this.token
this.token = res.data.token as string
```

<br><br>

## catch 中 err 的类型
我们可以将 err 形参, 断言为 Error 类型
```js
(err as Error).message
```

<br><br>

# VueRouter 类型相关
```s
https://blog.csdn.net/BLUESKYHOST/article/details/117323338

https://router.vuejs.org/zh/api/
```

<br>

## RouteRecordRaw
```js
// Omit 删除指定类型的key返回删除后的接口类型
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;//一个页面或者视图多个路由会使用
  children?: AppRouteRecordRaw[];
  props?: any;
  fullPath?: string;
}
```

## RouteMeta
```js
// meta的类型
export interface RouteMeta {
  title: string;
}

// RouteRecordRaw 的类型
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;//一个页面或者视图多个路由会使用
  children?: AppRouteRecordRaw[];
  props?: any;
  fullPath?: string;
}
export type AppRouteModule = AppRouteRecordRaw;
```

<br>

当我们使用 路由的时候 可能会使用到 route 中的 meta 属性, ts可能会要求我们给 meta属性 定义类型 可以采用下面的方式定义

```js
// 如果不使用扩展 将会是unknow 类型, 声明自己的meta类型
declare module 'vue-router' {
  interface RouteMeta {
    title?: string,
    transition?: string
  }
}

// 组件中 直接使用 RouteRecordRaw
const routes: Array<RouteRecordRaw>  = [{ path: '/', component: A, meta: { title: '首页', transition: 'animate__bounce'} }]
```

<br>

### 路由守卫中 to from next 的类型
我发现不设置类型也可以
- to: **RouteLocationNormalized** 即将要进入的目标, 我们要访问的路由对象
- from: **RouteLocationNormalized** 当前导航正要离开的路由, 从哪个路由来的
- next: **NavigationGuardNext** 放行函数

<br><br>

# pinia
### pinia实例对象的类型为
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

# setTimeout 和 setInterval 的 Ts类型
setTimeout 和 setInterval 在node环境 和 浏览器环境下的类型不一样

### 如果我们是通过 window 调用的 则定时器返回的类型的number
```js
// 可直接使用window.setTimeout()的方法，返回的就直接是Nummber类型
let timer: number;
timer = window.setTimeout(() => {}, 1000);
clearTimeout(timer);
```

<br>

### 如果我们是直接调用的 则定时器返回的类型是 NodeJS.Timeout
```js
// 定义的NodeJs.Timeout的类型
let timer: null| NodeJS.Timeout = null;
timer = setTimeout(() => {}, 1000);
// 清除的时候，转换为Number类型
clearTimeout(Number(timer));
```

<br><br>

## 当我们定义的类型中有可选属性的时候, 我们会该对象进行变量会报错 [_: string]: string
当我们定义了一个含有可选属性的对象的时候, 可选属性对应的值就是undefind
```js
type addFormType = {
  id?: number | undefined;
  tmName: string;
  logoUrl: string;
  createTime?: string | undefined;
  upadteTime?: string | undefined;
}
```

这时我们对它进行循环操作的时候就会报错, 或者说有这种写法的时候 obj[key]
```js
const resetAddForm = () => {
  for (const key in addForm) {
    addForm[key] = ''
  }
}
```

```s
元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "{ id?: number | undefined; tmName: string; logoUrl: string; createTime?: string | undefined; upadteTime?: string | undefined; }"。

在类型 "{ id?: number | undefined; tmName: string; logoUrl: string; createTime?: string | undefined; upadteTime?: string | undefined; }" 上找不到具有类型为 "string" 的参数的索引签名。
```

<br>

### 解决方式:
1. 忽略: 在 tsconfig.json 中 compilerOptions 里面新增忽略的代码，如下所示，添加后则不会报错
```s
"suppressImplicitAnyIndexErrors": true
```

2. 在定义的 Interface 里对其进行声明，如下所示，声明过后，也不会再报错
```js
interface DAMNU_ENABLE {
    ....
    [key: string]: boolean, // 字段扩展声明
};

[key: string]: boolean, // 字段扩展声明 声明之后可以用方括号的方式去对象里边的值
```

3. 对其使用 keyof 进行判断
```js
export function isValidKey(
    key: string | number | symbol,
    object: object
): key is keyof typeof object {
    return key in object;
}
```

4. [自己] 尽可能在组件中的form中不要定义可选类型

5. **追加索引签名** 在其中追加 [_: string]: any 
```js
type addFormType = trademarkItem & {
  [_: string]: any
}
const addForm = reactive<addFormType>({
  tmName: '',
  logoUrl: ''
})


const resetAddForm = () => {
  for (const key in addForm) {
    // 不报错了
    addForm[key] = ''
  }
}
```

<br><br>

## 定义一个空对象类型
如果我们像如下的方式定义 supParams 的类型, 则因为我们supParams的初始值是空对象 里面没有包含必传的属性值 所以会报错
```s
类型“{}”缺少类型“spuItemType”的以下属性: spuName, description, tmId, category3Id 及其他 2 项。ts(2740)
```
```js
type spuItemType = {
  id?: number
  spuName: string
  description: string
  tmId: number | string
  category3Id: number | string
  spuSaleAttrList: null | spuSaleAttrItem[]
  spuImageList: null | spuImageItem[]
  spuPosterList?: null
}

type echoSpuFormType = {
  supParams: spuItemType
}

const echoSpuForm = reactive<echoSpuFormType>({
  ...
  supParams: {}
})
```

<br>

### 解决方式:
使用联合类型, 传递一个空对象的类型 
```js
type echoSpuFormType = {
  supParams: spuItemType | Record<string, never>
}
```

<br><br>

## async 函数的返回值
```js
const saveHandler = async (): Promise<void> => { ... }
```
