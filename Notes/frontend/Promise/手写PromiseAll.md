# 手写Promise.all

### 参数:
set集合 | 数组 | 可迭代对象

我们需要将传入的数据, 将其变成promise, 比如我们传入的是 [1,2,3] 那我们就要将这个1,2,3变成promise

<br>

### 返回值: 
Promise

返回的promise是什么样的状态, 成功? 还是失败?
- 如果是成功的话 我们就调用它的resolve
- 如果是失败的话 我们就调用它的reject

而resolve 和 reject 是new Promise中的两个参数 如果我们希望在外部拿到这两个变量的话 我们就需要定义变量 保存到外边

<br>

### 函数中调用resolve reject的实际

**1. 我们传入的参数是空数组**  
那就意味着没有可迭代的东西, 那这种情况一定是resolve

<br>

```js
Promise.myAll = function(proms) {
  // 定义两个变量 接收 reject 和 resolve
  const res, rej

  // 完成的结果
  const result = []

  // 标识完成的promise的数量
  const fullfilledCount = 0

  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  // 因为proms可能不是数组, 所以不能使用 length === 0 的方式 我们可以使用for of
  let i = 0
  let count = 0
  for (const prom of proms) {

    // 相当于在for of中声明一个下标
    const index = i
    i++

    count++
    // 将 proms 的每一项 变成promise, 比如我们传入的是 [1,2,3], 下面这个promise的成功还是失败 会影响到我们myAll的成功还是失败
    // Promise.all 的特点就是有一个失败 整体都失败了
    Promise.resolve(prom).then(
      (data) => {
        // 如果是成功的场景的话, 我们要将成功的数据汇总到 result 里面
        // 这里我们不能使用 result.push 因为我们传入了多个promise 哪个promise先完成 我们并不知道 最终汇总的数据 它的数据顺序应该跟我们传递数组中的promise的顺序是一致的 而不是跟完成的顺序一致 而是要用它在proms数组中的下标
        result[index] = data

        // 完成最终的promise, 也就是所有的promise完成后 才能完成
        fullfilledCount++

        if (fullfilledCount === count) {
          // 当运行到 then 里面的逻辑的时候 整个for of早就结束了 因为是异步代码count中就记录着所有promise的数量
          res(result)
        }
      },
      rej
    )
  }
  // 情况: 参数proms为空的时候 调用resolve
  if (count == 0) {
    res(result)
  }
  return p
}

Promise.myAll([]).then((datas) => {
  console.log(datas)
})
```