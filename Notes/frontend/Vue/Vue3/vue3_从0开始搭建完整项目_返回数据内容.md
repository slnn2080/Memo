# 项目返回数据:

### 请求用户信息接口
home组件, 挂载时发起的请求 ``/admin/acl/index/info``
```js
{
  "code": 200,
  "message": "成功",
  "data": {
    // 菜单的权限 和 route 中 name 的值 一致
    "routes": [
      "aaa",
      "User",
      "Category",
      "Discount",
      "ActivityEdit",
      "CouponRule",
      "Label",
      "Product",
      "Activity",
      "CouponAdd",
      "Trademark",
      "test1",
      "Attr",
      "ActivityAdd",
      "CouponEdit",
      "OrderShow",
      "111",
      "Permission",
      "Spu",
      "UserList",
      "ClientUser",
      "Order",
      "33",
      "t't",
      "Coupon",
      "permision",
      "Acl",
      "ActivityRule",
      "Role",
      "RoleAuth",
      "222",
      "Refund",
      "1223",
      "x",
      "Level",
      "OrderList",
      "Sku"
    ],
    // 按钮的权限
    "buttons": [
      "cuser.detail",
      "cuser.update",
      "cuser.delete",
      "btn.User.add",
      "btn.User.remove",
      "btn.User.update",
      "btn.User.assgin",
      "btn.Role.assgin",
      "btn.Role.add",
      "btn.Role.update",
      "btn.Role.remove",
      "btn.Permission.add",
      "btn.Permission.update",
      "btn.Permission.remove",
      "btn.Activity.add",
      "btn.Activity.update",
      "btn.Activity.rule",
      "btn.Coupon.add",
      "btn.Coupon.update",
      "btn.Coupon.rule",
      "btn.OrderList.detail",
      "btn.OrderList.Refund",
      "btn.UserList.lock",
      "btn.Category.add",
      "btn.Category.update",
      "btn.Category.remove",
      "btn.Trademark.add",
      "btn.Trademark.update",
      "btn.Trademark.remove",
      "btn.Attr.add",
      "btn.Attr.update",
      "btn.Attr.remove",
      "btn.Spu.add",
      "btn.Spu.addsku",
      "btn.Spu.update",
      "btn.Spu.skus",
      "btn.Spu.delete",
      "btn.Sku.updown",
      "btn.Sku.update",
      "btn.Sku.detail",
      "btn.Sku.remove",
      "btn.all",
      "tuiguang",
      "btn.test.2",
      "cars",
      "Cart-Add",
      "aaabbb",
      ""
    ],
    // 角色
    "roles": [
      "超级管理员",
      "运营",
      "UI",
      "架构师",
      "前端"
    ],
    "name": "admin",
    "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
  },
  "ok": true
}
```

<br>

### 登录接口
``/admin/acl/index/login``
```js
{
  "code": 200,
  "message": "成功",
  "data": "eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSCjAK0A0Ndg1S0lFKrShQsjI0s7Q0NTE3N7DUUSotTi3yTAGKQZh-ibmpQB2JKbmZeUq1AJaFnYBBAAAA.Qb_Yms7SMS0ggnuozaQuv4IKdjrfexQfF_qzCsR5Y1p6qsNJbqwTPJtBMGADm67AI5qNkrR8YgPLhfYpOF8-7A",
  "ok": true
}
```

<br>

### 类型参考:
**老师:**
```js
//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

//定义获取用户信息返回数据类型
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
```

<br>

**我:**  
```js
export type loginParamType = {
  username: string
  password: string
}

// 通用的返回字段类型: 定义全部接口返回数据都用户的ts类型, 字段data的内容不一样
export type commonResType<T> = {
  code: number
  message: string
  data: T
  ok: boolean
}

// 获取用户信息 返回值的类型
export type userInfoType = {
  // 菜单权限的数组和路由对象.name的值是一致的
  routes: string[]
  // 按钮权限
  buttons: string[]
  // 角色
  roles: string[]
  name: string
  avatar: string
}
```

<br><br>

## 品牌管理

### 请求列表数据的响应体
```js
{
  "code": 200,
  "message": "成功",
  "data": {
    "records": [
      {
        "id": 1,
        "createTime": "2021-12-10 01:31:41",
        "updateTime": "2023-04-15 15:48:02",
        "tmName": "小米",
        "logoUrl": "39.98.123.211/group1/M00/03/D9/rBHu8mHmKC6AQ-j2AAAb72A3EO0942.jpg"
      },
      {
        "id": 2,
        "createTime": "2021-12-10 01:31:41",
        "updateTime": "2023-04-15 15:48:21",
        "tmName": "苹果",
        "logoUrl": "http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKHOADErHAAAQBezsFBo612.jpg"
      },
      {
        "id": 3,
        "createTime": "2021-12-10 01:31:41",
        "updateTime": "2023-04-15 15:48:28",
        "tmName": "华为",
        "logoUrl": "http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKF2AWpcKAADv98DWYRo516.jpg"
      }
    ],
    "total": 49,
    "size": 3,
    "current": 1,
    "orders": [],
    "optimizeCountSql": true,
    "hitCount": false,
    "countId": null,
    "maxLimit": null,
    "searchCount": true,
    "pages": 17
  },
  "ok": true
}
```

<br>

### TS类型参考
**我:**
```js
// 品牌管理: 列表中每一条记录的数据类型
type trademarkItem = {
  // 新增数据的时候, 我们不需要id, 已有的数据才会返回id, 所以该字段可选
  id?: number
  tmName: string
  logoUrl: string
  createTime?: string
  upadteTime?: string
}

// 品牌管理: 请求table列表接口方法的返回值类型
type trademarkResType = {
  records: trademarkItem[]
  total: number
  size: number
  current: number
  orders?: [] | null
  optimizeCountSql?: boolean
  hitCount?: boolean
  countId?: number
  maxLimit?: null
  searchCount?: boolean
  // 一共多少页
  pages?: number
}

// 品牌管理: commonResult, data 不一样
type commonTrademarkResType<T> = {
  code: number
  message: string
  ok: boolean
  data: T
}

export type { commonTrademarkResType, trademarkItem, trademarkResType }
```

<br>

**老师:**
```js
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//已有的品牌的ts数据类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

//包含全部品牌数据的ts类型
export type Records = TradeMark[]

//获取的已有全部品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
```