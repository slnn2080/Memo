const delayPromise = require("./index")

test("delayPromise 测试", () => {
  expect.assertions(1)

  // 之前我们定义这个callback是没有任何意义的我们 它的唯一作用就是保证delayPromise被正确的执行 因为delayPromise需要一个callback 所以这个callback的逻辑我们完全的不关系 我们就关心它的返回值
  // const callback = () => 1

  // 针对这种场景 jest提供了一个 jest.fn() 方法 该放飞就是模拟一个回调 我们也可以在jest.fn()里面写逻辑 当然如果我们只关心返回值结果的话 也可以如下的写法 这个方法十分的强大 不仅仅可以模拟返回值 还有看这个方法是否被调用 里面一些具体的执行结果
  const callback = jest.fn().mockReturnValue(1)

  //  我们要在要测试的函数前面 加上return 必须
  return expect(delayPromise(callback)).resolves.toBe(1)
})