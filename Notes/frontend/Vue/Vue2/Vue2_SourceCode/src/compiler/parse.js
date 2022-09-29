const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`

/*
  /^<((?:[a-zA-Z_][\-\.0-9_a-zA-Z]*\:)?[a-zA-Z_][\-\.0-9_a-zA-Z]*)/
  匹配开始标签名 情况有两种
  1. <xxx
  2. <div:xxx   标签带命名空间的情况
*/
const startTagOpen = new RegExp(`^<${qnameCapture}`)


/*
  /^<\/((?:[a-zA-Z_][\-\.0-9_a-zA-Z]*\:)?[a-zA-Z_][\-\.0-9_a-zA-Z]*)[^>]*>/
  匹配结束标签名
  1. </xxx>
*/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)


/*
  匹配属性 的正则
  正则中
    分组1: 属性的key
    分组3 或者 分组4 或者 分组5: 属性的value
     ""        ''     没有引号
*/
// 
// 
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/

 // 匹配标签结束的  > or />
const startTagClose = /^\s*(\/?)>/

// 解析 html 的模块: htmlparser2

// 胡子语法的正则 {{分组1}} 分组1就是表达式的变量
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

// -----------------------

export function parseHTML(html) {

  // 元素类型
  const ELEMENT_TYPE = 1

  // 文本类型
  const TEXT_TYPE = 3

  // 用于存放元素的
  const stack = []

  // 指向栈顶的元素的指针 栈顶元素都是当前匹配到元素的父亲 所以我们的变量名也这么起
  let cuurentParent = null

  // 根节点 它也是最后的 ast 语法树
  let root = null

  // 整理 AST树中的节点对象
  function createASTElement(tag, attrs) {
    return {
      tag,
      attrs,
      type: ELEMENT_TYPE,
      parent: null,
      // 在解析开始标签的时候并不知道孩子是谁 先给个空
      children: []
    }
  }

  // 利用 栈结构的特性 构建了一棵树(弹幕说遇到单标签就有问题了)
  // 进栈构建父子关系 出栈就把当前作为栈顶的儿子

  // 处理开始标签
  function handleStart(tag, attrs) {
    // 将零散的开始标签 组织成树节点
    let node = createASTElement(tag, attrs)

    // 如果没有根节点该节点本身就是根节点
    if(!root) {
      root = node
    }

    // 如果栈顶有值 则让 当前节点的爸爸为 栈顶元素
    if(cuurentParent) {
      node.parent = cuurentParent

      // 给栈顶元素添加儿子(当前元素)
      cuurentParent.children.push(node)
    }

    stack.push(node)

    // 让当前这个节点指向栈顶元素
    cuurentParent = node
  }


  // 处理文本
  function handleText(txt) {

    txt = txt.replace(/\s/g, "")

    // 如果文本有值的 我们再插入 文本是当前栈顶元素的孩子
    txt && cuurentParent.children.push({
      // 文本节点的类型是文本
      type: TEXT_TYPE,
      // 文本内容
      text: txt,
      // 文本节点的父节点也是栈顶元素
      parent: cuurentParent
    })
  }

  // 处理结束标签
  function handleEnd(tag) {
    // 遇到结束标签的时候 将栈顶元素弹出栈 并更新 cuurentParent
    stack.pop()
    // 更新cuurentParent
    cuurentParent = stack[stack.length - 1]
  }


  // 将匹配的内容删除(也可以理解为截取目标字符串的指定长度)
  function advance(len) {
    html = html.substring(len)
  }

  // 解析开始标签的方法
  function parseStartTag() {

    // 使用 正则startTagOpen 看看是不是开始标签
    const start = html.match(startTagOpen)

    // console.log("start标签: ", start)
    /*
      start为数组[0, 1, {}]

      0: "<div"
      1: "div"
      groups: undefined
      index: 0
      input: "<div id=\"app\">\n    <div style=\"color: red;\">{{name}} -- hello</div>\n    <span>{{age}}</span>\n  </div>"
      length: 2

      0: 匹配的内容
      1: 分组内容: 标签名
    */

    if(start) {
      // 如果是开始标签的话 则将结果组织成一个对象
      const match = {
        // 标签名
        tagName: start[1],
        // 标签属性
        attrs: []
      }

      // console.log(match)
      /*
        {
          attrs: []
          tagName: "div"
        }
      */

      
      // 当匹配到内容(如开始标签) 要将该部分内容删除 advance前进的意思 那前进多少呢 就是匹配内容的总长度
      advance(start[0].length)
      // console.log(html)
      /*
        html现在的内容为: 
          id="app">
          <div style="color: red;">{{name}} -- hello</div>
          <span>{{age}}</span>
        </div>
      */


      /*
        接下来开始匹配属性 我们需要不停的用正则匹配属性 
        我们要循环匹配 只要不是开始标签的结束(正则: startTagClose) 就一直来匹配
      */
      // 如果不是开始标签的结束则一直匹配 同时每次匹配的时候我们还需要将属性保留起来
      let attr;

      // 开始标签的结束 >
      let end;

      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // 每次匹配到结果 我们继续删掉匹配到的内容 也就是调用 advance() 方法
        advance(attr[0].length)

        // 将 标签属性 整理到 match.attrs 中
        match.attrs.push({
          name: attr[1],
          // 如果是 disable 的情况 可以直接给个true
          value: attr[3] || attr[4] || attr[5] || true
        })
      }

      // console.log("标签属性: ", attr)
      /*
        0: " id=\"app\""
        // key
        1: "id"
        2: "="

        // 3 | 4 | 5 为value
        3: "app"
        4: undefined
        5: undefined
      */

      // console.log(html)
      /*
        >
          <div style="color: red;">{{name}} -- hello</div>
          <span>{{age}}</span>
        </div>
      */

      // 上面我们发现还有一个 开始标签的 > 结束 我们也应该把它也删掉 它被我们保存到 end 变量中了
      if(end) advance(end[0].length)
      // ↑
      // 到上面这里 开始标签整体的处理完毕
      
      // match是开始标签对象
      // console.log("开始标签对象:", match)
      /*
        match: {
          tagName: "div",
          attr: [
            {
              name: id,
              value: app
            }
          ]
        }
      */
      return match
    }


    // 不是开始标签则return false
    return false
  }


  /*
    // 我们的html字符串是这样的
    <div id="app">
      <div style="color: red;">{{name}} -- hello</div>
      <span>{{age}}</span>
    </div>
    
    逻辑: 每解析一个部分我们就从html字符串中把这个部分删除掉 当字符串都被截取完毕 就停止解析
    示例: 
      解析开始标签 <div 
          就从上面的html字符串中删掉该部分
      解析属性 id="app"
          就从上面的html字符串中删掉该部分

      最后都没有了就结束了

    特点: 
      html最开始肯定是一个 <

    示例:
      0
      ↓
      <div>html</div>

      html.indexOf("<") 索引为0 肯定是标签 
      当我们解析完开始标签的时候 删除开始标签 变成

          ↓
      html</div>

      那我们再去取 < 在html字符串中的位置时 那 < 的位置是不是就是文本结束的位置
  */

  // 使用循环解析html字符串 当字符串为空退出循环
  while(html) {

    // 如果 < 的查询结果为0 说明是标签
    // textEnd如果=0 则说明是开始标签 >0 则说明是文本结束的位置
    let textEnd = html.indexOf("<")

    // 这种情况下为开始标签
    if(textEnd == 0) {

      // parseStartTag()解析开始标签的方法, 返回值为开始标签的解析结果
      const startTagMatch = parseStartTag()

      // console.log(html)
      /*
        <这部分的处理完了>
          <div style="color: red;">{{name}} -- hello</div>
          <span>{{age}}</span>
        </div>

        处理完这个部分后 下面这行可能还是开始标签 还是属性
        <div style="color: red;">

        但是总有一天都会被截掉 该遇到文本了 这时候 textEnd > 0
      */

      // 如果 startTagMatch 有值 就直接跳过本轮的操作
      if(startTagMatch) {

        // 拿到开始标签的内容后 我们交给 handleStart() 来进行处理
        handleStart(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }

      // 到这 就是如果不是开始标签 就是结束标签 返回当前结束标签的名字 endTagMatch为匹配到的结束标签
      let endTagMatch = html.match(endTag)
      // console.log("endTagMatch", endTagMatch)

      // 直接是 结束标签 的原因 <div></div> 的情况
      // 结束标签不用处理直接删除就可以
      if(endTagMatch) {
        // console.log("endTagMatch", endTagMatch)
        advance(endTagMatch[0].length)

        // 拿到 结束标签后 我们交给 handleEnd() 来处理
        handleEnd(endTagMatch[1])
        continue
      }
    }

    // 到标签文本的位置了 我们就需要将文本获取到 找到文本将文本提取出来
    if(textEnd > 0) {

      // 文本内容
      let text = html.substring(0, textEnd)
      // console.log("标签文本的内容", text)

      // 同时 我们匹配了文本的内容后也要删掉这个部分
      if(text) {
        // 拿到标签文本后 交给 handleText来处理
        handleText(text)
        advance(text.length)
      }
      // console.log(html)
    }
  }

  // 看看html是否为空
  // console.log("html", html)

  /*
    上面的部分的整体流程文字叙述:
    <div id="app">
      <div style="color: red;">{{name}} -- hello</div>
      <span>{{age}}</span>
    </div>

    while(html) 中的 html 是 整个模板内容
    第一次:
      textEnd == 0
      parseStartTag()方法中是根据开始标签的正则来进行匹配
      所以能匹配到开始标签
      startTagMatch有值 然后 continue
      直接开始下一轮循环

    第二次:
      textEnd > 0 
      提取文本内容 本次提取的文本内容是空格加换行
      然后删掉该部分 进入下一轮循环

    第三次:
      <div style="color: red;">{{name}} -- hello</div>
        <span>{{age}}</span>
      </div>
      第三次进来的时候html这样
      textEnd == 0
      parseStartTag()方法中是根据开始标签的正则来进行匹配
      匹配到 <div style="color: red;">
      startTagMatch有值 然后 continue
      直接开始下一轮循环

    第四次:
      textEnd > 0 
      提取文本内容 本次提取的文本内容是空格加换行
      然后删掉该部分 进入下一轮循环

    第五次:
      </div>
        <span>{{age}}</span>
      </div>
      遇到了结束标签
      textEnd == 0
      parseStartTag()方法中是根据开始标签的正则来进行匹配
      没有匹配到 所以走了 
      if(endTagMatch) {
        advance(endTagMatch[0].length)
        continue
      }
      删除结束标签 然后继续开始下一轮循环


    也就是说整体的逻辑是删除一个部分重新一轮
  */


  /*
    最终我们要根据 开始 文本 结束 这三个部分转化为一个抽象语法树
    树结果的话 肯定会有层级关系 比如谁是父亲 谁是孩子

    大体我们应该组织的结构是这样的
    {
      tag: "div",
      // 元素的类型 取元素的 nodeType 我们这里主要有两种类型 一类是文本 一类是元素
      type: 1,
      attrs: [{}],
      // 父元素,
      parent: null(根元素是null),
      // 儿子的数组里面还可能会再套一层
      chlidren: [{}]
    }

    我们需要根据 上面整理好的另算数据解析成一棵树 那零散数据怎么构建父子关系呢
    <div id="app">
      <div style="color: red;">{{name}} -- hello</div>
      <span>{{age}}</span>
    </div>

    我们可以整一个栈型结构
      当我们匹配到 开始标签的时候 我们将 div 推进栈 之后当我们匹配到下一个 div 的时候
      我们就知道 第二个div 是栈顶div的儿子(数组中的最后一个)

    当遇到结束标签的时候 我们把栈顶的元素 弹出栈
    [第一个div, 第二个div]
    第二个div(栈顶)是第一个div的孩子 当遇到结束标签</div> 的时候 我们将栈顶的元素弹出栈

    当再遇到开始标签(span)的时候 我们就知道 span 的爸爸是 栈顶的元素
    [第一个div, span]

    依次类推 栈顶元素是当前匹配到元素的父亲

    也就是说我们可以根据栈来模拟出来树形关系
  */

  // 将最终生成的 ast语法树 返回
  return root
  // console.dir(root, {depth: null})

} 