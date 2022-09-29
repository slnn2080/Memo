const getRandom = require("./getRandom")

let mockRandom = null
beforeEach(() => {
  mockRandom = jest.spyOn(Math, "random")
})
afterEach(() => {
  mockRandom.mockRestore()
})

// 如果我们不对Math.random做控制的话 我们可以测试什么？ 只能测试取数的范围
test("getRandom < 10", () => {
  // toBeLessThan()比什么小
  expect(getRandom()).toBeLessThan(10)
})

test("getRandom >= 0", () => {
  expect(getRandom()).toBeGreaterThanOrEqual(0)
})


test("Math.random 返回0.11的时候 结果应该是1", () => {
  mockRandom = jest.spyOn(Math, "random")

  // 指定Math.random的返回值为1
  mockRandom.mockReturnValue(1)
  expect(getRandom()).toBe(10)
})