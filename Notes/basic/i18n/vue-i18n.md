## 往翻译文件中传递变量
1. 翻译文件中挖坑
```js
export default {
  message: "我是翻译文字{msg}"
}
```

2. 在调用的时候传入变量
```js
this.$t("message", {msg: "我是传入的消息"})
```