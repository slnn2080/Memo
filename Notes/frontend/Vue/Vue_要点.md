### 修改对象数据 响应式问题
**1. Object.assign()方法追加上的数据 不是响应式的:**  
```js
mounted() {
  const temp = {
    age: 18
  }
  this.obj = Object.assign(this.obj, temp)
  console.log(this.obj)   // 追加进去的age  不是响应式的
}
```

<br>

**2. es6解构的方式, 追加的数据是响应式的:**  
```js
mounted() {
  const temp = {
    age: 18
  }
  this.obj = {...this.obj, ...temp}
  console.log(this.obj)   // 追加进去的age 是响应式的 ！
}
```