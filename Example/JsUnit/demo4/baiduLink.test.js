// 引入组件
import BaiduLink from "./baiduLink";
import renderer from "react-test-renderer"
import React from "react"

test("测试baidulink被正常的渲染", () => {
  // 将ui组件序列化成可以比较的对象
  const tree = renderer.create(<BaiduLink />).toJSON()
  expect(tree).toMatchSnapshot()
})