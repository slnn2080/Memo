jest.mock("./getData")

const normalizeData = require("./normalizeData")
const getData = require("./getData")

// 私人定制
getData.mockReturnValue({
  name: "zzc"
})

test("normalizeData测试", () => {
  const status = normalizeData().status
  expect(status).toBe(0)
})

test("normalizeData data测试", () => {
  const data = normalizeData().data
  expect(data).toEqual({
    name: "zzc"
  })
})