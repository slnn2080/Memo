### IE中一些兼容性的问题 记录
> 1. ie中不支持 方法的简写 SCRIPT1002: 構文エラーです。
```js
const question = {
  getAnswer() {
    console.log('回答だよ');
  }
} 

// 
const question = {
  getAnswer: function() {
    console.log('回答だよ');
  }
}
```

> 2. ie中不支持 模版字符串的写法 SCRIOPT1014: 文字が正しくありません。

> 3. ie中不支持 for...of SCRIPT1004: ‘:’ がありません。

改成for循环

> 4. ie中不支持 箭头函数

> 5. ie中不支持 forEach
```js
element = document.querySelectorAll('.test');
element.forEach(function (item) {
  console.log(item);
};

//
elementNodeList = document.querySelectorAll('.test');
// Arrayに変換している
element = Array.prototype.slice.call(elementNodeList, 0);
element.forEach(function (item) {
  console.log(item);
};
```
