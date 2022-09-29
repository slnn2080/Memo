### 安装
- npm i animejs -S


### 动画的目标对象的讲解
- 1. targets 是用来找对应的dom元素的
- 可以写选择器
- 可以使用数组的方式 数组里面可以填写dom元素 和 css选择器

- 2. anime({ ... })
- 这个配置对象中 可以写 animejs 中的配置对象
- 也可以写 css属性 写在配置对象中的css属性都是可以变化的
<!-- 
  anime({
    targets:  [".demo"],
    easing: "easeInOutQuad",
    borderStyle: "dashed",
    borderColor: "#fff"
  })
 -->

**注意:**
- anime({})用于定义一套动画 如果还有别的动画可以再定义一套anime
<!-- 
  anime({})
  anime({})
 -->