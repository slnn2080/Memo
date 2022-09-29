import { parseHTML } from "./parse";

// 对获取的template内容进行编译
export function compileToFunction(template) {
  // debugger
  // 1. 将 template 转化成 ast 语法树
  let ast = parseHTML(template)
  // console.log(ast)

  // 2. 生成 render 方法 (render方法执行的返回的结果就是 虚拟DOM)
  let code = codegen(ast)
  // console.log(code)

  code = `with(this){return ${code}}`
  let render = new Function(code)
  // console.log("render: ", render.toString())

  // 将render函数暴露出去
  return render
}


// codegen 将树拼装成 render代码
function codegen(ast) {

  // code就是最终要生成的东西
  let code

  // 生成 render 函数 孩子参数的部分
  let children = genChildren(ast.children)

  // 开始拼接成 render函数的返回值 _c("div" ... )
  code = `_c('${ast.tag}', ${ast.attrs.length > 0 ? genProps(ast.attrs): null}${ast.children ? `,${children}` : ""})`

  // console.log(code)
  return code
}

// 处理 child 的函数
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function gen(node) {
  /*
    child 就是一个个的node节点 
    然后我们需要判断下 看看该节点是文本还是元素

    如果是文本的话 我们需要创建文本
    如果是元素的话 就生成元素
  */
  // 元素
  if(node.type == 1) {
    return codegen(node)

  // 文本 文本有几种情况 标签里面是纯文本 或者是{{age}} 或者是{{name}}hello
  } else {
    let text = node.text
    
    if(!defaultTagRE.test(text)) {
      /*
        text:  world
        普通字符串的情况下 我们使用 _v() 包裹

        _v("text")
      */
      return `_v(${JSON.stringify(text)})`

    } else {
      /*
        text: {{name}}hello{{name}}
        当遇到这种特殊字符串的时候 我们要将 变量使用 _s() 包裹起来
        然后整体使用 _v() 包裹

        _v( _s(name) + 'hello' + _s(name))

        在转的时候我们需要将这3部分组织好 然后使用 + 来进行拼接
        // c: 创建元素 v: 创建文本 s:json.stringify()
      */

      /*
        用于存放 文本内容 如
        {{name}}hello{{name}}

        _s(name) hello _s(age)
      */
      let tokens = []

      // 根据 defaultTagRE 正则 匹配到的结果
      let match = null

      /*
        defaultTagRE 正则使用的是 exec() 同时 正则里面加上了g
        这是我们就要考虑 lastIndex 的问题
        这里设置为0 这样每次调用 gen() 方法的时候 会从0重新开始
      */
      defaultTagRE.lastIndex = 0

      /*
        最后匹配到的位置
        下面的循环是根据 {{}} 正则来找对应的胡子里面的内容

        但是 胡子之外的内容我们也要拿到 比如 hello 所以我们要记录下 最后匹配的位置 
        方便我们截取 hello 的部分

        每次循环的时候 我们要记录 lastIndex 
        比如:

        index         index
          0            13
          ↓            ↓
          {{name}}hello{{name}}
                 ↑
                 8
             lastIndex

        这样我们就能根据索引 找到hello文本
      */
      let lastIndex = 0

      // 这个就是数据分割 循环 if 匹配不同的情况 放到数组中
      // 我们使用 defaultTagRE 来捕获目标文本 将每次捕获的结果放入到 tokens 数组中
      while(match = defaultTagRE.exec(text)) {
        // console.log(match)
        /*
          match: [
            0: "{{age}}"
            1: "age"
          ]
        */
        
        // 拿到当前匹配的位置 拿到后往 tokens 数组中放
        /*
          0            13
          ↓            ↓
          {{name}}hello{{age}}
        */
        let index = match.index
        // console.log(index) // 0 13

        if(index > lastIndex) {
          // lastIndex是上一次的位置 8 如果index > lastIndex 说明两个{{}} 之间有文本
          // 那么 我们就 截取text字符串 从 lastIndex 位置 截取到 第二次index 13 之间的文本
          tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }


        
        // 放入匹配的内容 _s(name) 我们这么放到数组中
        tokens.push(`_s(${match[1]})`)
        
        /*
          第一次的时候 0 + 8 ({{name}}.length length是数个数 不是索引 所以从1开始数)
          每次循环的时候保存下 lastIndex
        */
        lastIndex = index + match[0].length
        // console.log(lastIndex) // 8 20
      }

      /*
        {{name}} hello {{age}} 这还有文本的情况 我们将这个部分也放入 tokens 数组中
                             ↑
        因为lastIndex 记录的是 这个位置 如果 lastIndex < text.length 说明后面还有文本
      */
      if(lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
      }
      
      // console.log(tokens.join("+"))
      // _s(name)+hello+_s(age)+world
      // 标记
      return `_v(${tokens.join('+')})`
    }
    
  }

}

// 整理children的函数
function genChildren(children) {
  if(children) {
    return children.map(child => gen(child)).join(",")
  }
}

// 整理属性的函数
function genProps(attrs) {
  // console.log("attrs: ", attrs)
  // 属性的格式: {name: value}
  let str = ""
  for(let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]

    /*
      我们也可以使用 qs 库

      标签属性是 style 的情况下 我们要进行特殊处理
      语法树中关于 style 的数据结构
      {name: 'style', value: 'color: red; background: pink'}

      转为
      {color: "red", background: "pink"}
    */
    if(attr.name == "style") {
      // 最终我们要整理成 style: {} 的像是 这个{}就是obj
      // console.log("value:", attr.value)
      let obj = {}

      // 根据 ; 拆分
      attr.value.split(";").forEach(item => {
        // 根据 : 拆分
        let [key, value] = item.split(":")
       
          /*
            style="background: pink;
            当是上面的形式的时候 我们在 ; 分割的时候 后面会是 "": undefined
            所以我们做下判断

            {background: 'pink'}
          */
          if(key) {
            key = key.trim()
            value = value.trim()
            obj[key] = value
          }
      })

      attr.value = obj
    }

    // id: app, app的部分也要是字符串 我们使用 stringify()
    str += `${attr.name}: ${JSON.stringify(attr.value)},`
  }

  // 不要 str 最后的 , 然后在 str 的外侧加上 {}
  return `{${str.slice(0, -1)}}`

  /*
    _c(
      'div', 
      {
        id: "app",
        style: {"background":"pink"}
      }
    )
  */
}
 
