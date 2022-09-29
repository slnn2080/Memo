### 测试的场景
- 好的程序员会一边做开发一边做测试 测试是发布之前非常重要的一环


### 公司有测试部门
- 测试部门是对我们的代码进行黑盒测试 也就是说测试不知道我们的源代码 针对界面的测试 bug测试 这些测试从某种角度来讲 比较片面 它只能测到它看到的界面 

- 但是在我们的源代码层面 比如一个方法中的很多if else判断 这时候就没有办法测的比较好了


### Vue中的测试
- 我们这里采用的是Vue官方工具 Vue-Cli 搭建出来的项目 在这个搭建工具中推荐的两种测试分别是 

- 1. 端到端测试 E2E -- 黑盒测试
<!-- 
  e2e或者端到端end-to-end或者ui测试是一种测试方法
  它用来测试一个应用从头到尾的流程是否和设计时候所想的一样
  简而言之 它从一个用户的角度出发 认为整个系统都是一个黑箱 只有ui会暴露给用户

  源代码测试人员是看不见的 只能通过页面来做测试
 -->

- 2. 单元测试 Unit Test
<!-- 
  测试驱动开发
  单元测试就不陌生 单元测试是用来对一个模块 一个函数 或者 一个类来进行正确性检验的测试工作

  比如写个加法函数add(a, b) {return a + b} 我们可以编写出一下几个测试用例如

  输入1和1 期待返回结果是2
  输入非数值类型 比如None [] {} 期待抛出异常

  把上面的测试用例放到一个测试模块里 就是一个完整的单元测试
  如果单元测试通过 说明我们测试的这个函数能够正常的工作 如果单元测试不通过 要么函数有bug 要么测试条件输入不正确 总之 需要修复单元测试能够通过

  那在vue中的单元测试中主要使用的工具分别为 
  Karma + Mocha
 -->


### Karma
- karma是一个基于nodejs的js测试执行过程管理工具 test runner
- 该工具在vue中的*主要作用是将项目运行在各种主流web浏览器进行测试*

- 换句话说 它是一个测试工具 能让你的代码在浏览器环境下测试 需要它的原因在于 你的代码可能是设计在浏览器端执行的 在node环境下测试可能有些bug暴露不出来

- 另外 浏览器有兼容问题 karma提供了手段让你的代码自动在多个浏览器 chrome firefox ie等 环境下运行 如果你的代码只会运行在node端 那么你不需要用karma

- vue中自带的karma


### Mocha
- 是一个测试框架 它是专门做单元测试的 在node环境下跑的测试框架 在vue-cli中配合 
- mocha本身不带断言库 所以必须先引入断言库 chai断言库实现单元测试

- mocha的常用命令和用法不算太多 而chai断言库可以看看 chai.js 断言库api中文文档 很简单 多查多用就能很快掌握


### 断言库
- 所谓断言 就是判断源码的实际执行结果与预期结果是否一致 如果不一致就抛出一个错误

- 下面这句断言的意思是 调用 add(1, 1) 结果应该等于2

```js
var expect = require("chai").expect
expect(1+1).to.be.equal(2)
```

- chai是一种断言库(http://chaijs.com/)
- 所有的测试用例(it块)都应该含有一句或多句的断言 它是编写测试用例的关键 断言功能由断言库来实现


### chai的基本使用
```js
// 判断是否相等
// 判断 4 + 5 = 9   true
expect(4 + 5).to.be.equal(9)

// 判断不等于
// 判断 4 + 5 != 10  true
expect(4 + 5).to.be.not.equal(10)

// 引用类型是否相等
// 深度判断是否相等
expect({bar: "baz"}).to.be.deep.equal({bar: "baz"})


// 判断是true
expect(true).to.be.ok

// 判断是false
expect(false).to.not.be.ok


// 判断类型
expect("test").to.be.a("string")
expect({foo: "bar"}).to.be.an("object")


// 判断是否包含
expect([1,2,3]).to.be.include(2)
```


### vue中使用测试步骤
- 1. 初始化项目
- vue create app

- 2. 选择mocha测试环境
- 3. 把项目跑起来


> 我们看看要测试什么
- 1. components文件夹中 有一个 HelloWorld.vue文件

- 2. tests/unit/example.spec.js文件
- 要点 我们的测试js文件一定要有spec后缀
```js
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'

// 引入待测试的组件
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })

    // 判断组件中的文本是否有 props传递过来的msg
    expect(wrapper.text()).to.include(msg)
  })
})

```

> npm run test:unit