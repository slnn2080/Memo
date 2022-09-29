import React from "react"

const BaiduLink = () => {
  const url = "www.baidu.com"
  const text = "百度一下"

  return (
    <a href={url}>{text}</a>
  )
}

export default BaiduLink