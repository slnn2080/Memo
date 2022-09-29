const {delay, delayPromise} = require("./index")

test("callback 被执行", (done) => {
  // 当遇到异步方法的时候 为了保证异步方法一定被执行 需要在首行加上
  // 传入我们期望几个断言被执行 断言就类似toBe
  expect.assertions(1)


  // 因为没有返回值 我们执行在测试方法调用 要测试的方法 delay
  const callback = () => {
    console.log("callback exec")

    // 在这里面我们加上预期 true true表示一定会被执行 我们期望的执行结果就是输出上面的console
    expect(true).toBe(true)
    // 这样jest就知道 测试用例应该到哪才算结束
    done()

    // jest在执行测试用例的时候 如果你没有明确的告诉它 它会在你执行了这个方法执行完成之后 立马结束程序 而不会等到我们异步方法被执行的时候才结束
    // 为了防止过早的结束 我们需要在test方法里面传递 done 然后在期望被结果的地方调用它
  }
  delay(callback)
})

test("delayPromise 测试", () => {
  // 异步方法要在最开始的位置加上期望的断言数
  expect.assertions(1)

  // 让callback直接返回1
  const callback = () => 1

  // 方式1:
  // 在要测试promise的时候 我们要在要测试的函数前面 加上return 必须
  return delayPromise(callback).then(res => {
    expect(res).toBe(1)
  })

  // 方式2:
  // 上面我们是到then方法里面 拿到res后 进行的测试 现在我们可以使用 jest提供的格式来直接拿到resolve的结果
  return expect(delayPromise(callback)).resolves.toBe(1)
})


test("delayPromise async测试 被执行", async () => {
  expect.assertions(1)
  const callback = () => 1

  const res = await delayPromise(callback)
  expect(res).toBe(1)
})