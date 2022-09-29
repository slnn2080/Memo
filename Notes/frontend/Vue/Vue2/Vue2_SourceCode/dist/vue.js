(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  /*
    /^<((?:[a-zA-Z_][\-\.0-9_a-zA-Z]*\:)?[a-zA-Z_][\-\.0-9_a-zA-Z]*)/
    匹配开始标签名 情况有两种
    1. <xxx
    2. <div:xxx   标签带命名空间的情况
  */

  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  /*
    /^<\/((?:[a-zA-Z_][\-\.0-9_a-zA-Z]*\:)?[a-zA-Z_][\-\.0-9_a-zA-Z]*)[^>]*>/
    匹配结束标签名
    1. </xxx>
  */

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
  /*
    匹配属性 的正则
    正则中
      分组1: 属性的key
      分组3 或者 分组4 或者 分组5: 属性的value
       ""        ''     没有引号
  */
  // 
  // 

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配标签结束的  > or />

  var startTagClose = /^\s*(\/?)>/; // 解析 html 的模块: htmlparser2

  function parseHTML(html) {
    // 元素类型
    var ELEMENT_TYPE = 1; // 文本类型

    var TEXT_TYPE = 3; // 用于存放元素的

    var stack = []; // 指向栈顶的元素的指针 栈顶元素都是当前匹配到元素的父亲 所以我们的变量名也这么起

    var cuurentParent = null; // 根节点 它也是最后的 ast 语法树

    var root = null; // 整理 AST树中的节点对象

    function createASTElement(tag, attrs) {
      return {
        tag: tag,
        attrs: attrs,
        type: ELEMENT_TYPE,
        parent: null,
        // 在解析开始标签的时候并不知道孩子是谁 先给个空
        children: []
      };
    } // 利用 栈结构的特性 构建了一棵树(弹幕说遇到单标签就有问题了)
    // 进栈构建父子关系 出栈就把当前作为栈顶的儿子
    // 处理开始标签


    function handleStart(tag, attrs) {
      // 将零散的开始标签 组织成树节点
      var node = createASTElement(tag, attrs); // 如果没有根节点该节点本身就是根节点

      if (!root) {
        root = node;
      } // 如果栈顶有值 则让 当前节点的爸爸为 栈顶元素


      if (cuurentParent) {
        node.parent = cuurentParent; // 给栈顶元素添加儿子(当前元素)

        cuurentParent.children.push(node);
      }

      stack.push(node); // 让当前这个节点指向栈顶元素

      cuurentParent = node;
    } // 处理文本


    function handleText(txt) {
      txt = txt.replace(/\s/g, ""); // 如果文本有值的 我们再插入 文本是当前栈顶元素的孩子

      txt && cuurentParent.children.push({
        // 文本节点的类型是文本
        type: TEXT_TYPE,
        // 文本内容
        text: txt,
        // 文本节点的父节点也是栈顶元素
        parent: cuurentParent
      });
    } // 处理结束标签


    function handleEnd(tag) {
      // 遇到结束标签的时候 将栈顶元素弹出栈 并更新 cuurentParent
      stack.pop(); // 更新cuurentParent

      cuurentParent = stack[stack.length - 1];
    } // 将匹配的内容删除(也可以理解为截取目标字符串的指定长度)


    function advance(len) {
      html = html.substring(len);
    } // 解析开始标签的方法


    function parseStartTag() {
      // 使用 正则startTagOpen 看看是不是开始标签
      var start = html.match(startTagOpen); // console.log("start标签: ", start)

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

      if (start) {
        // 如果是开始标签的话 则将结果组织成一个对象
        var match = {
          // 标签名
          tagName: start[1],
          // 标签属性
          attrs: []
        }; // console.log(match)

        /*
          {
            attrs: []
            tagName: "div"
          }
        */
        // 当匹配到内容(如开始标签) 要将该部分内容删除 advance前进的意思 那前进多少呢 就是匹配内容的总长度

        advance(start[0].length); // console.log(html)

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

        var attr; // 开始标签的结束 >

        var end;

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // 每次匹配到结果 我们继续删掉匹配到的内容 也就是调用 advance() 方法
          advance(attr[0].length); // 将 标签属性 整理到 match.attrs 中

          match.attrs.push({
            name: attr[1],
            // 如果是 disable 的情况 可以直接给个true
            value: attr[3] || attr[4] || attr[5] || true
          });
        } // console.log("标签属性: ", attr)

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


        if (end) advance(end[0].length); // ↑
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

        return match;
      } // 不是开始标签则return false


      return false;
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


    while (html) {
      // 如果 < 的查询结果为0 说明是标签
      // textEnd如果=0 则说明是开始标签 >0 则说明是文本结束的位置
      var textEnd = html.indexOf("<"); // 这种情况下为开始标签

      if (textEnd == 0) {
        // parseStartTag()解析开始标签的方法, 返回值为开始标签的解析结果
        var startTagMatch = parseStartTag(); // console.log(html)

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

        if (startTagMatch) {
          // 拿到开始标签的内容后 我们交给 handleStart() 来进行处理
          handleStart(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        } // 到这 就是如果不是开始标签 就是结束标签 返回当前结束标签的名字 endTagMatch为匹配到的结束标签


        var endTagMatch = html.match(endTag); // console.log("endTagMatch", endTagMatch)
        // 直接是 结束标签 的原因 <div></div> 的情况
        // 结束标签不用处理直接删除就可以

        if (endTagMatch) {
          // console.log("endTagMatch", endTagMatch)
          advance(endTagMatch[0].length); // 拿到 结束标签后 我们交给 handleEnd() 来处理

          handleEnd(endTagMatch[1]);
          continue;
        }
      } // 到标签文本的位置了 我们就需要将文本获取到 找到文本将文本提取出来


      if (textEnd > 0) {
        // 文本内容
        var text = html.substring(0, textEnd); // console.log("标签文本的内容", text)
        // 同时 我们匹配了文本的内容后也要删掉这个部分

        if (text) {
          // 拿到标签文本后 交给 handleText来处理
          handleText(text);
          advance(text.length);
        } // console.log(html)

      }
    } // 看看html是否为空
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


    return root; // console.dir(root, {depth: null})
  }

  function compileToFunction(template) {
    // debugger
    // 1. 将 template 转化成 ast 语法树
    var ast = parseHTML(template); // console.log(ast)
    // 2. 生成 render 方法 (render方法执行的返回的结果就是 虚拟DOM)

    var code = codegen(ast); // console.log(code)

    code = "with(this){return ".concat(code, "}");
    var render = new Function(code); // console.log("render: ", render.toString())
    // 将render函数暴露出去

    return render;
  } // codegen 将树拼装成 render代码

  function codegen(ast) {
    // code就是最终要生成的东西
    var code; // 生成 render 函数 孩子参数的部分

    var children = genChildren(ast.children); // 开始拼接成 render函数的返回值 _c("div" ... )

    code = "_c('".concat(ast.tag, "', ").concat(ast.attrs.length > 0 ? genProps(ast.attrs) : null).concat(ast.children ? ",".concat(children) : "", ")"); // console.log(code)

    return code;
  } // 处理 child 的函数


  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  function gen(node) {
    /*
      child 就是一个个的node节点 
      然后我们需要判断下 看看该节点是文本还是元素
       如果是文本的话 我们需要创建文本
      如果是元素的话 就生成元素
    */
    // 元素
    if (node.type == 1) {
      return codegen(node); // 文本 文本有几种情况 标签里面是纯文本 或者是{{age}} 或者是{{name}}hello
    } else {
      var text = node.text;

      if (!defaultTagRE.test(text)) {
        /*
          text:  world
          普通字符串的情况下 我们使用 _v() 包裹
           _v("text")
        */
        return "_v(".concat(JSON.stringify(text), ")");
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
        var tokens = []; // 根据 defaultTagRE 正则 匹配到的结果

        var match = null;
        /*
          defaultTagRE 正则使用的是 exec() 同时 正则里面加上了g
          这是我们就要考虑 lastIndex 的问题
          这里设置为0 这样每次调用 gen() 方法的时候 会从0重新开始
        */

        defaultTagRE.lastIndex = 0;
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

        var lastIndex = 0; // 这个就是数据分割 循环 if 匹配不同的情况 放到数组中
        // 我们使用 defaultTagRE 来捕获目标文本 将每次捕获的结果放入到 tokens 数组中

        while (match = defaultTagRE.exec(text)) {
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
          var index = match.index; // console.log(index) // 0 13

          if (index > lastIndex) {
            // lastIndex是上一次的位置 8 如果index > lastIndex 说明两个{{}} 之间有文本
            // 那么 我们就 截取text字符串 从 lastIndex 位置 截取到 第二次index 13 之间的文本
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          } // 放入匹配的内容 _s(name) 我们这么放到数组中


          tokens.push("_s(".concat(match[1], ")"));
          /*
            第一次的时候 0 + 8 ({{name}}.length length是数个数 不是索引 所以从1开始数)
            每次循环的时候保存下 lastIndex
          */

          lastIndex = index + match[0].length; // console.log(lastIndex) // 8 20
        }
        /*
          {{name}} hello {{age}} 这还有文本的情况 我们将这个部分也放入 tokens 数组中
                               ↑
          因为lastIndex 记录的是 这个位置 如果 lastIndex < text.length 说明后面还有文本
        */


        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        } // console.log(tokens.join("+"))
        // _s(name)+hello+_s(age)+world
        // 标记


        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  } // 整理children的函数


  function genChildren(children) {
    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(",");
    }
  } // 整理属性的函数


  function genProps(attrs) {
    // console.log("attrs: ", attrs)
    // 属性的格式: {name: value}
    var str = "";

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      /*
        我们也可以使用 qs 库
         标签属性是 style 的情况下 我们要进行特殊处理
        语法树中关于 style 的数据结构
        {name: 'style', value: 'color: red; background: pink'}
         转为
        {color: "red", background: "pink"}
      */

      if (attr.name == "style") {
        (function () {
          // 最终我们要整理成 style: {} 的像是 这个{}就是obj
          // console.log("value:", attr.value)
          var obj = {}; // 根据 ; 拆分

          attr.value.split(";").forEach(function (item) {
            // 根据 : 拆分
            var _item$split = item.split(":"),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];
            /*
              style="background: pink;
              当是上面的形式的时候 我们在 ; 分割的时候 后面会是 "": undefined
              所以我们做下判断
               {background: 'pink'}
            */


            if (key) {
              key = key.trim();
              value = value.trim();
              obj[key] = value;
            }
          });
          attr.value = obj;
        })();
      } // id: app, app的部分也要是字符串 我们使用 stringify()


      str += "".concat(attr.name, ": ").concat(JSON.stringify(attr.value), ",");
    } // 不要 str 最后的 , 然后在 str 的外侧加上 {}


    return "{".concat(str.slice(0, -1), "}");
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

  // 策略
  // 策略: 策略中的才会合并成一个数组
  var strats = {};
  var lifecycle = ["beforeCreate", "created"];
  lifecycle.forEach(function (lifecycleName) {
    strats[lifecycleName] = function (p, n) {
      // 第一次 Vue.options 是 {} 的
      if (n) {
        // 到这里还能进入if里面 说明 p有值 n有值 那么p肯定是一个数组
        if (p) {
          // p n都有的情况下 就将它们放在一个数组中
          return p.concat(n); // n有 但是p没有
        } else {
          // 将n包装成数组
          return [n];
        } // 没有 n 的话 就没有意义的 p爱是啥是啥

      } else {
        // 如果儿子没有则用父亲即可
        return p;
      }
    };
  }); // 工具函数 也可以提取到 utils 里面

  function mergeOptions(preOptions, newOptions) {
    var options = {}; // 我们观察下 之前 和 新的 如果有相同属性的话合并在一起 不同属性的话以新的为准

    for (var key in preOptions) {
      mergeField(key);
    }

    for (var _key in newOptions) {
      // 所以这里我们合并 preOptions 没有的key 因为 preOptions 合并过了 这里就不用合并了
      if (!preOptions.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      // 策略模式
      // 如果 key 是策略中有的走策略 没有走默认
      if (strats[key]) {
        options[key] = strats[key](preOptions[key], newOptions[key]);
      } else {
        // newOptions中的优先因为要以新的为准
        options[key] = newOptions[key] || preOptions[key];
      }
    }

    return options;
  }
  function initGlobal(Vue) {
    // 在 Vue 身上添加一个静态属性 options 和 静态方法 mixin
    Vue.options = {}; // 参数: 用户在使用 mixin({}) 时候传进来的对象 

    Vue.mixin = function (mixin) {
      // !!这里的this是 Vue 本身
      // 拿到 mixin 对象后 我们需要将 mixin对象 和 Vue.options 进行合并 产生一个新的对象
      this.options = mergeOptions(this.options, mixin); // 为了链式调用

      return this;
    };
  }

  // 每一个属性都会有对应的一个 dep 用作依赖收集 所以dep也会有好多个
  var id$1 = 0; // 属性的dep要收集watcher 

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id$1++; // 这里存放着当前属性对应的watcher有哪些 一个属性可能有多个watcher

      this.subs = [];
    } // 在调用 depend() 的时候 会先让watcher记住dep 因为调用的watcher的addDep方法 该方法内部是通过dep的实力调用addSub() 将watcher添加到subs数组中


    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // this.subs.push(Dep.target)
        // Dep.target是 watcher 我调用addDep()方法将这个Dep传过去 让Watcher也能记住dep
        Dep.target.addDep(this);
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        // 将传过来的watcher放到subs数组中
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        // 让自己身上存的所有watcher 让watcher做更新操作
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }(); // 静态属性: 静态属性只有一份 我们 import 导入 dep 文件的时候 它身上就有这个属性


  Dep.target = null; // watcher栈

  var stack = []; // 参数: 要传递进来 watcher 

  function pushTarget(watcher) {
    // 将传递进来的watcher 放到stack中
    stack.push(watcher); // 调用该方法会给 Dep.target 赋值

    Dep.target = watcher;
  } // 渲染结束后清空 Dep.target

  function popTarget() {
    // 删掉栈顶的watcher
    stack.pop(); // Dep.target = null 在没有其他类型的watcher时 stack[stack.length - 1]为undefined

    Dep.target = stack[stack.length - 1];
  }

  var id = 0; // Watcher 里面有更新组件的方法 this.get()

  var Wacher = /*#__PURE__*/function () {
    /**
     * 
     * @param {*} vm 我们需要知道当前的watcher是哪个实例的
     * @param {*} exprOrFn 实例(组件)对应的渲染函数 vm._update(vm._render()) 我觉得叫render更好
     *      exprOrFn在计算属性中 是用户指定的get()回调
     *      exprOrFn在watch中 是回调指定的要监视的值
     * @param {*} options 布尔类型标识是一个渲染watcher
     * @param {*} cb watch的回调 当属性变化时 执行的回调
     */
    function Wacher(vm, exprOrFn, options, cb) {
      _classCallCheck(this, Wacher);

      // 每次创建 实例 的时候 让id++ 这样每个watcher都有自己的id
      this.id = id++; // 布尔类型: 标识是何种watcher

      this.renderWatcher = options; // 如果我们传入的exprOrFn是字符串 那么我们要将字符串改成一个函数

      if (typeof exprOrFn == "string") {
        this.getter = function () {
          // 从 vm 上获取要监视的属性 vm.firstname
          return vm[exprOrFn];
        };
      } else {
        // 函数
        this.getter = exprOrFn;
      } // 标识是否是 用户要写的 watch 


      this.user = options.user; // 保存用户传入的 watch 回调

      this.cb = cb; // deps: 用来保存一个watcher对应了哪些dep 后续我们实现计算属性 和 一些清理工作的时候需要用到

      this.deps = [];
      this.depsId = new Set(); // 拿到传入的lazy

      this.lazy = options.lazy; // 计算属性会使用 dirty 作为缓存值 默认lazy为true dirty就为true

      this.dirty = this.lazy; // this.lazy为true我们啥都不管 只有不为true的时候我们new Watcher的时候才调用更新组件的方法
      // this.lazy ? undefined : this.get()
      // 当 watch 的时候 我们 老值保存在 this.value 上

      this.value = this.lazy ? undefined : this.get(); // 初渲染 先调用一次
      // this.get()

      this.vm = vm;
    } // 计算属性 watcher 在如果是脏的情况下 需要调用的方法


    _createClass(Wacher, [{
      key: "evaluate",
      value: function evaluate() {
        // 当计算属性watcher的时候 我们传入的fn会是 计算属性的get() get()会有返回值 我们将这个返回值绑定到实例身上
        // 也就是绑定到了 watcher身上 计算属性的值如果不是脏的 就会使用watcher身上的 相当于缓存到 watcher身上了
        this.value = this.get(); // 标识为脏

        this.dirty = false;
      }
    }, {
      key: "get",
      value: function get() {
        // 当我们创建渲染watcher的时候(页面渲染的时候) 我们会把当前的渲染watcher放到dep的target上
        // 下面调用this.getter() == vm._update(vm._render()) 就会取值 取值的时候就会走到 defineReactive - getter 上
        // Dep.target = this
        // 我们通过下面的方法将 渲染watcher 放到 Dep.target 上 该方法内部维护了一个stack
        pushTarget(this); // vm._update(vm._render())还具有取值的功能 因为render的时候nameage这些变量都会从vm上取值 我们只要一调用该函数就会到 vm 上取值
        // this.getter() 就是 return this.firstname + this.lastname 但是 watcher 类的this是watcher吧 我们要从vm身上取值吧

        var value = this.getter.call(this.vm); // 渲染完后清空
        // Dep.target = null
        // 用下面的方法进行 清空操作 把 stack中的watcher删掉

        popTarget(); // 计算属性中需要拿到返回值 所以我们这样操作下

        return value;
      } // 一个组件对应着多个属性 重复的属性也不用记录 我们期望让watcher和dep是相互记忆的

    }, {
      key: "addDep",
      value: function addDep(dep) {
        // 利用id去重
        var id = dep.id; // 看看 depsId 有没有 该id

        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id); // 让 dep 把 watcher 也记住 将watcher(this)传过去 

          dep.addSub(this);
        }
      } // 修改模版中依赖的属性 会触发更新操作

    }, {
      key: "update",
      value: function update() {
        // 更新前判断 如果是lazy说明是计算属性
        if (this.lazy) {
          // 依赖值发现变化了 标识计算属性是脏值
          this.dirty = true;
        } else {
          // 让组件重新渲染
          // this.get()
          // 为了完成修改多个属性后统一渲染一次 我们将 watcher 放入到队列中 将当前的watcher暂存起来
          queueWatcher(this);
        }
      } // 修改多个属性后 统一为一次更新的操作 再次封装到了run()里面

    }, {
      key: "run",
      value: function run() {
        // new Watcher 构造器在执行 this.get() 的时候 将老值保存在this.value身上
        var oldValue = this.value; // 当我们在执行这里的时候 就能获取到新的值

        var newValue = this.get(); // 如果是 watch

        if (this.user) {
          // 执行 用户传入的 watch 回调
          this.cb.call(this.vm, newValue, oldValue);
        }
      } // 让计算属性中的依赖也记住渲染watcher

    }, {
      key: "depend",
      value: function depend() {
        // 我们拿到存放的所有dep 这里我们要使用dep
        var i = this.deps.length;

        while (i--) {
          // dep收集watcher会有对应的depend方法 让计算属性watcher也收集渲染watcher
          this.deps[i].depend();
        }
      }
    }]);

    return Wacher;
  }();

  var queue = []; // 源码中是利用对象来进行watcher的去重的

  var has = {};
  var pending = false;
  /*
    当 修改属性的时候 最终会走 update()方法 其中的逻辑为 每次修改之后我们都会将watcher暂存到一个队列中 
  */

  function queueWatcher(watcher) {
    var id = watcher.id; // has对象中没有id 则忘队列中放

    if (!has[id]) {
      queue.push(watcher);
      has[id] = true; // 不管 update() 执行多少次最终只执行一轮刷新操作 类似onece 同时是也不管我们怎么修改属性 新刷新一次队列
      // 第一次肯定是 false

      if (!pending) {
        nextTick(flushSchedulerQueue);
        pending = true;
      }
    }
  } // 将队列中的任务一个个的拿出来进行执行


  function flushSchedulerQueue() {
    // 将 queue 拷贝一份
    var flushQueue = queue.slice(0); // 回初始化操作

    queue = [];
    has = {};
    pending = false;
    /*
      清空队列任务之前 我们先将watcher置为空
       然后清空 flushQueue 中的任务 
      上面开始回初始化的另一个好处 在刷新的过程中可能还有新的watcher
      因为页面修改了属性就会触发update() -> 就会收集watcher到queque中 我们将这时候的新的watcher 重新放到queue中 下一轮再执行 
       这也是批处理逻辑 先执行第一批(flushQueue) 第一批的执行过程中可能有第二批(放到queue中)
    */

    flushQueue.forEach(function (q) {
      return q.run();
    });
  } // 回调的队列


  var callbacks = [];
  var waiting = false;
  function nextTick(cb) {
    callbacks.push(cb);

    if (!waiting) {
      // 利用 setTimeout 将逻辑拿到任务队列中执行
      setTimeout(flushCallbacks, 0);
      /*
        还可以这样哦 放到微任务中
        Promise.resolve().then(flushCallbacks)
      */
    }

    waiting = true;
    /*
      老师这么写的
      if(!waiting) {
        setTimeout(() => {
          flushCallbacks()
        }, 0)
      }
    */
  }

  function flushCallbacks() {
    var cbs = callbacks.splice(0);
    waiting = false;
    callbacks = []; // 按照顺序依次执行

    cbs.forEach(function (cb) {
      return cb();
    });
  }

  // 创建元素 就是 _c() 或者 h() 都是一个方法
  // data = {} 没有附上默认值 那么当没有标签属性的时候 data就是null
  function createElementVnode(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // 这里这么处理 如果没有data 那么key就是undefined
    var key = data === null || data === void 0 ? void 0 : data.key;
    if (key) delete data.key;

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    return vnode(vm, tag, key, data, children);
  } // _v()

  function createTextVnode(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  } // 创建 Vnode 的方法
  // ast做的是 语法层面的转化 它描述的是语法本身 (html长什么样是能解析出来什么样)
  // vnode 描述的是dom元素 可以增加一些自定义的属性 (虚拟节点可以增加很多属性 比如 vm)

  function vnode(vm, tag, key, data, children, text) {
    return {
      vm: vm,
      tag: tag,
      key: key,
      data: data,
      children: children,
      text: text // 这里还可以增加 事件 插槽 指令等属性

    };
  } // 看看两个虚拟节点是否是同一个


  function isSameVnode(vnode1, vnode2) {
    // 我们看看 vnode 的标签名 和 key 是否都一致
    return vnode1.tag == vnode2.tag && vnode1.key == vnode2.key;
  }

  function createElm(vnode) {
    // 取出属性
    var tag = vnode.tag,
        data = vnode.data,
        children = vnode.children,
        text = vnode.text; // 说明 tag 是一个标签 (tag还可能是undefined 因为文本节点的时候只有text属性)

    if (typeof tag == "string") {
      /*
        vnode: {
          children: (2) [{…}, {…}]
          data: {id: 'app', style: {…}}
           el: div   // 多了 el 节点(真实的)
           key: undefined
          tag: "div"
          text: undefined
          vm: Vue
        }
        为了后面 实现diff算法 我们将创建好的元素 放在 vnode 上
        这里将真实节点 和 虚拟节点对应起来 后续如果修改属性了 我们可以直接找到 虚拟节点对应的真实节点(VDOM: vnode, TDOM: vnode.el), 来修改属性 所以虚拟节点上会挂载着真实节点
      */
      vnode.el = document.createElement(tag); // 处理属性: 更新 vode.el 元素的 data属性(data是标签属性)
      // patchProps参数: 1. 节点, 2. 旧节点的标签属性, 3. 新节点的标签属性

      patchProps(vnode.el, {}, data); // 处理子节点:

      children.forEach(function (child) {
        // 将 child(子标签 子节点) 也创建成真实节点 将子节点放入到它的父节点中 也相当于给 el添加内容
        vnode.el.appendChild(createElm(child));
      });
    } else {
      // 如果 tag 不是字符串 我们就要创建文本节点 同样也要挂载到虚拟节点上
      vnode.el = document.createTextNode(text);
    } // console.log(vnode)
    // 返回真实元素


    return vnode.el;
  } // 处理标签属性的方法

  function patchProps(el) {
    var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // console.log("el: ", el)
    // console.log("oldProps: ", oldProps)
    // console.log("newProps:", props)

    /*
      追加逻辑:
        老的属性中有 新的属性中没有 要删除老的属性 因为我们要以新节点的标签属性为准
    */
    var oldStyle = oldProps.style || {};
    var newStyle = props.style || {}; // 做style属性的处理 循环老的style对象看看新的中有没有 (老的样式中新的样式中没有则删除)

    for (var key in oldStyle) {
      if (!newStyle[key]) {
        // 如果新的属性中没有 就将节点中对应的key置为空
        el.style[key] = "";
      }
    } // 做标签属性的处理(除了style属性) 老的属性中有 新的属性中没有 删除属性


    for (var _key in oldProps) {
      if (!props[_key]) {
        el.removeAttribute(_key);
      }
    } // 将属性循环一遍赋值到元素上 用新的覆盖掉老的


    for (var _key2 in props) {
      // 如果 key 是 style
      if (_key2 == "style") {
        /*
          标签上的 style 是这么写的  style = "color:red"
           我们的props里面的style属性是
          style: {background: 'pink', width: '100px'}
        */
        for (var styleName in props[_key2]) {
          el.style[styleName] = props[_key2][styleName];
        }
      } else {
        el.setAttribute(_key2, props[_key2]);
      }
    }
  } // 比较两个虚拟节点: 初始化 和 更新 节点的功能

  function patch(oldVnode, vnode) {
    // 判断 oldVnode 是否是真实dom元素
    var isRealElement = oldVnode.nodeType; // 如果是则为: 初渲染流程

    if (isRealElement) {
      // 给 oldVnode 换个名字 在初渲染的逻辑中 也好理解 初渲染的时候 el 是一个真实的元素
      var el = oldVnode; // 获取它的父元素

      var parentEl = el.parentNode; // body
      // 创建真实元素

      var newELm = createElm(vnode); // 将 newELm 插入到老节点的下面

      parentEl.insertBefore(newELm, el.nextSibling); // 删除老节点

      parentEl.removeChild(el); // 我们让 patch() 方法有返回值 将 newElm 返回出去

      return newELm;
    } else {
      // diff算法
      return patchVnode(oldVnode, vnode);
    }
  } // 我们将比较两个节点的逻辑抽离到一个函数中

  function patchVnode(oldVnode, vnode) {
    // 1. 判断两个节点是否是同一个节点 tag == tag && key == key
    if (!isSameVnode(oldVnode, vnode)) {
      // 不是同一个节点的情况

      /*
        老的虚拟节点在第一渲染的时候 我们会将虚拟节点和真实节点对应在一起 虚拟节点的.el属性上 就有真实节点
         export function createElm(vnode) {
          ...
          // 将真实的节点放在了虚拟节点.el上
          vnode.el = document.createElement(tag)
          ...
        }
      */
      // 通过 oldVnode.el 找到页面上渲染的节点 通过它的爸爸替换成新的节点
      // 参数: 用新的vnode创建的新的真实节点 替换掉老的真实的节点 
      var _el = createElm(vnode);

      oldVnode.el.parentNode.replaceChild(_el, oldVnode.el); // 返回新的el 保持返回的都是一个新的节点

      return _el;
    }
    /*
      上面return了 能走到这里说明两个节点是一样的 
      我们先复用旧节点
       然后考虑 相同节点是文本节点的情况
      前一个节点是文本的话 那么后一个节点也会是文本节点
        文本情况: 我们期望比较一下文本的内容
      相同节点可能是元素 也可能是文本 文本的tag都是undefined
       如果当前节点的tag是undefined 那它就是文本
    */
    // 将老的DOM赋值给新的节点的el 复用老节点的元素 如果两个都是标签 那么标签只是更改了属性 标签可复用 那就将老的.el 赋给 新的.el


    var el = vnode.el = oldVnode.el; // 因为上面做了两个标签的判断 到这里说明两个标签是一样的 那么前一个节点是文本 那么后一个节点也是文本

    if (!oldVnode.tag) {
      // 既然前后都是文本 那么就可以判断文本内容
      if (oldVnode.text != vnode.text) {
        // el也就是老节点上的el 用新的文本覆盖掉老的节点的文本内容
        el.textContent = vnode.text;
      }
    } // 走到这里 就是相同节点是标签 如果是标签的话 我们需要比对标签的属性
    // console.log(oldVnode)
    // console.log(vnode)

    /*
      vm: Vue, tag: 'li', key: 'a', data: {…}, children: Array(1)
          data: style: {color: 'red'}
       vm: Vue, tag: 'li', key: 'a', data: {…}, children: Array(1)
          data: style: {color: 'red', background: 'blue'}
    */

    /*
      调用之前写的 patchProps() 方法来对比标签属性
      参数 
        el: 老节点 let el = vnode.el = oldVnode.el
        vnode.data: 新节点的标签属性
        oldVnode.data: 旧节点的标签属性
    */


    patchProps(el, oldVnode.data, vnode.data);
    /*
      比较两个节点的儿子节点的时候分两种情况
      1. 1方有儿子, 1方没儿子
        - 要么把儿子全部删掉 要么全部创建新儿子
       2. 2方都有儿子
       我们要针对不同的情况做处理
    */
    // 获取两个节点的儿子

    var oldChildren = oldVnode.children || [];
    var newChildren = vnode.children || []; // 两方都有儿子: 如下情况需要比较两个人的儿子

    if (oldChildren.length > 0 && newChildren.length > 0) {
      // 比较两个人的儿子 用新的更新旧的
      updateChildren(el, oldChildren, newChildren); // 一方有儿子 老节点的儿子为0 新节点有儿子: 我们直接将新节点的儿子放入
    } else if (newChildren.length > 0) {
      // 将新的儿子全部挂上去的方法 
      mountChildren(el, newChildren); // 新的没有 老的有 要将老节点的儿子删除
    } else if (oldChildren.length > 0) {
      // 删除节点中 老节点的儿子节点 (可以循环删除)
      el.innerHTML = "";
    }

    return el;
  }

  function mountChildren(el, newChildren) {
    // 渲染新儿子 将虚拟节点变为真实节点 挂载到元素上
    for (var i = 0; i < newChildren.length; i++) {
      var child = newChildren[i]; // 将虚拟节点变为真实节点 然后插入el中

      el.appendChild(createElm(child));
    }
  } // 比较两个儿子


  function updateChildren(el, oldChildren, newChildren) {
    var oldEndIndex = oldChildren.length - 1;
    var newEndIndex = newChildren.length - 1; // 拿到头尾指针对应的节点

    oldChildren[0];
    newChildren[0];
    oldChildren[oldEndIndex];
    newChildren[newEndIndex];
  }

  function mountComponent(vm, el) {
    /*
      将 el 也挂载到 vm 上
       options中的el是选择器字符串 
      这个el是我们通过 querySelector 之后选择的 节点
       我们将这里节点挂载到了 实例 上
    */
    vm.$el = el; // 1. 调用 render 方法 产生虚拟节点(DOM)
    // 2. 根据虚拟DOM产生真实DOM
    // 3. 插入到el元素中
    // vm._update(vm._render())
    // 将上面的逻辑封装到了 watcher 中我们通过watcher来进行调用

    var updateComponent = function updateComponent() {
      vm._update(vm._render());
    }; // debugger
    // 利用 Watcher来进行的更新组件的操作


    new Wacher(vm, updateComponent, true);
  }
  function initLifeCycle(Vue) {
    // 将 vnode 转换成 真实dom
    Vue.prototype._update = function (vnode) {
      // 获取 el 
      var vm = this;
      var el = vm.$el; // 该方法既有初始化的功能 也有更新的功能 我们将patch()返回的真实节点 更新 $el 上的节点

      vm.$el = patch(el, vnode);
    }; // _c("div", {}, 很多children) 


    Vue.prototype._c = function () {
      // this就是vm
      return createElementVnode.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    }; // _v(text)


    Vue.prototype._v = function () {
      return createTextVnode.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    }; // 将 _s() 包裹的值转成字符串(变量 -> 数据之后转成字符串吧)


    Vue.prototype._s = function (val) {
      // 判断下 val 的类型 只有val为对象的时候 我们再进行 JSON.stringify(val)
      if (_typeof(val) != "object") return val;
      return JSON.stringify(val);
    };

    Vue.prototype._render = function () {
      var vm = this; // vm.$options.render() 是通过 ast语法树转义后生成的render方法
      // 因为使用 with() 包装的 让with的this指向vm

      var vnode = vm.$options.render.call(vm);
      return vnode;
    };
  } // 参数: 调用哪个实例上的哪个钩子 

  function callHook(vm, hook) {
    var handles = vm.$options[hook];

    if (handles) {
      // 注意: 生命周期中的钩子都是当前实例
      handles.forEach(function (handler) {
        return handler.call(vm);
      });
    }
  }

  // 1. 拿到 Array构造函数的原型对象中的内容
  var oldArrayProto = Array.prototype;
  /*
    我们不能直接修改 Array.prototype 原型对象身上的方法
    如果我们这样操作
    Array.prototype.push = function() { }

    相当于将原来的push功能干掉了 不合理 原来的方法应该还在不要影响以前的应该在原来的基础上进行扩展
  */
  // 2. 通过 Object.create() 创建一个新对象
  // newArrayProto.__proto__ == oldArrayProto
  // 这样我们还能通过 newArrayProto读到push等方法

  var newArrayProto = Object.create(oldArrayProto);
  /*
    newArrayProto是作为原型对象使用的哦

    这时候我们在这样操作就不会影响到 Array.prototype 身上的push方法了
    newArrayProto.push = function() {  }
    这样加是改变 newArrayProto 自己的原型对象 并没有改变 Array.prototype 身上的方法 所以不用担心被覆盖掉
  */
  // 将能修改原数组的方法先找到

  var methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];
  methods.forEach(function (method) {
    // 重写这些方法 我们在 newArrayProto 身上增加这些方法
    newArrayProto[method] = function () {
      var _oldArrayProto$method;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // args参数: 比如 push(1)

      /*
        我们调用新的重写的方法的时候 默认会调用原来的方法
        我们要将参数 传递到原生的方法中
        同时我们还要注意 this 的问题
        oldArrayProto[method]() 相当于直接 push()
         arr.push() 谁调用的push this就是谁 所以这里我们还要将this传递过去
      */
      var result = (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args)); // 插入后再做观测 没插就做观测 那叫啥逻辑
      // 定义变量 保存数组新增元素


      var inserted; // Observer类中 我们将代表实例的this 绑定到了 data.__ob__ 身上 因为 本函数中的this就是 Observer类中的data 所以可以这么获取

      var ob = this.__ob__;

      switch (method) {
        // 如果是这两个方法的话 参数肯定是追加的内容
        case "push":
        case "unshift":
          // 这里我们就要看追加的内容是不是对象 如果是 则做get set
          // args是数组哦
          inserted = args;
          break;
        // arr.splice(0, 1, {a:1}, {b:2}) 前两个参数表示位置和删除的个数 后面是新增的内容

        case "splice":
          // 提取第三个参数
          inserted = args.slice(2);
          break;
      } // console.log("新增的内容: ", inserted)
      // 如果有新增的内容则需要对新增的内容再次的进行观测
      // inserted 是数组 args是数组 args.slice返回的也是数组


      if (inserted) {
        /*
          如果我们要对数组进行观测调用的是 Observer类中的 observeArray() 方法 这个方法会遍历当前数组 拿到每一项然后对每一项进行观测
          那怎么拿到 Observer类呢?
           我们思考一个问题 重写后的方法是谁要调用
          class Observer {
            // data 就是 options 中的 data
            constructor(data) {
               if(data是数组) {
                 我们是不是要在这里判断 data 是对象 还是数组 如果是数组的话
                1. 观察数组中的每一项 如果是对象再次观测其中的属性
                2. 重写数组的方法
                 data是数组吧 它要调用 push 等方法
               } else {
                data不是数组
              }
            }
          }
          
          也就是说 Observer类中的data 会调用push()方法 data.push()
          那就是说谁调用的push this就是谁
           同理说明 newArrayProto[method] = function() {} 函数中的this 就是 Observer类中的data
          this == Observer.data 是同一个
           这样我们在 Observer类中这样写 将Observer中的this绑定到了 data 身上
          class Observer {
            constructor(data) {
               // 这里的this是Observer类实例
              data.__ob__ = this
            }
          }
           上面这样写完后本函数的 this 身上也有 __ob__ 代表 Observer类的实例
          我们可以通过该实例调用 observeArray() 方法了是么
        */
        // 调用 Observer 类中的observeArray()方法 监测数组中的数据
        ob.observeArray(inserted);
      } // 走到这里需要更新页面 数组变化了通知对应的watcher实现更新逻辑


      ob.dep.notify();
      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    // data 就是 options 中的 data
    function Observer(data) {
      _classCallCheck(this, Observer);

      /*
        data可能是对象 也可能是数组 我们要给data设置dep 让它也能够做依赖收集
        这样就可以给对象本身 和 数组本身添加dep 监控变化更新组件
      */
      this.dep = new Dep(); // 将 __ob__ 设置为不可枚举 循环的时候无法获取 从而避免死循环

      Object.defineProperty(data, "__ob__", {
        value: this,
        enumerable: false
      }); // 这里的this是Observer类实例
      // 同时给数组加了一个标识 如果数据上有 __ob__ 则说明这个属性被观测过
      // data.__ob__ = this
      // 判断 data 是否是数组

      if (Array.isArray(data)) {
        // 如果是数组 那就是监控用户有没有调用 操作数组的方法
        // 目的1: 重写数组中的方法
        // 我们可以重写数组中的方法 7个变异方法(这几个方法是可以修改原数组的)
        // data是数组哦
        // 保留Array构造函数身上的原始方法 并且可以重写部分方法 newArrayProto里面就有我们重写的方法
        // data是一个数组, 当这个数组调用方法的时候 就会走 newArrayProto 里面的方法
        // 这样无论我们调用这7个方法中的任意一个 都可以被监控到 这就实现了数组方法的执行
        data.__proto__ = newArrayProto; // 目的2: 对数组中的对象中的属性做劫持
        // 对数组中的每一个成员都要进行观测 对数组中的每一项进行劫持(里面调用了observ还是只对数组中的对象中的属性做了劫持)
        // 如果数组中放的是对象 可以监控到对象的变化

        this.observeArray(data);
      } else {
        // 不是数组
        // 我们要劫持data对象中的每一个属性
        // Object.defineProperty只能劫持已经存在的属性 后增的 或者删除的它是不知道的
        // 所以vue2中会为此单独的写一些api 比如 $set $delete 我们先这么用
        this.walk(data);
      }
    }
    /*
      constructor(data) {
        data.__ob__ = this
         if(Array.isArray(data)) {
          // 数组的逻辑
        } else {
          // 对象的逻辑
        }
      }
       这里这么做有bug
      如果 data 是对象的话 我们也会往 对象身上 添加 __ob__
       但是 走到 else 里面的话 this.walk(data) 会对 data 做循环 
      循环的时候也会遍历 data 上的 __ob__ 属性
       __ob__  == this == Observer实例对象 对象中又有 Observer 类中的属性
      这样会走 walk() walk中开发遍历 走defineReactive() 又走observe() 又 new Observer
      又循环一遍 死循环了
       所以我们要在walk中添加 在循环的时候 不要遍历到 __ob__ 这个属性 我们可以让 __ob__ 设置成不可枚举的
    */
    // 循环对象对属性依次劫持


    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 拿到data对象的每一个key后 可以重新定义对象中的属性(对传入的data中的属性重新定义相当于将属性重新重写了 所以性能会差 这也是vue2的问题 所以vue3中换了proxy)
        // 自定义defineReactive() 将data中的 某属性 定义成 响应式的
        Object.keys(data).forEach(function (key) {
          return defineReactive(data, key, data[key]);
        });
      } // 观测数组中的成员

    }, {
      key: "observeArray",
      value: function observeArray(data) {
        // 将数组中的每一项都进行观测
        data.forEach(function (item) {
          return observe(item);
        });
      }
    }]);

    return Observer;
  }(); // 将目标对象的属性重新定义
  // defineReactive()方法可以单独使用 理解为公共的api
  // target: 重新定义哪个对象的属性(我们要重新定义data)
  // key: 
  // value:


  function defineReactive(target, key, value) {
    // 参数value 相当于闭包 相当于在defineProperty函数外层定义了一个变量 该变量不会被销毁
    // 这里调用 observe() 传入 value
    // observe(value) 上一个版本
    // childOb身上就有一个dep属性在constructor里面添加的 childOb.dep 用来收集依赖
    var childOb = observe(value); // 给一个属性都增加一个 dep 属性 这个是闭包区域这里的属性不会被销毁

    var dep = new Dep(); // 我们使用这个api 取值的时候会执行get 修改的时候会执行set 这样就拦截了用户的操作

    Object.defineProperty(target, key, {
      // 取值: 
      get: function get() {
        // 判断
        if (Dep.target) {
          // 让这个属性的收集器记住当前的watcher
          dep.depend(); // 再取属性的时候 如果有childOb 也就是对象 和 数组实体身上的 __ob__

          if (childOb) {
            // 拿到它身上的dep 做依赖收集让其记住当前的watcher 让数组和对象本身也实现依赖收集
            childOb.dep.depend(); // 如果当前的值是数组

            if (Array.isArray(value)) {
              // 那我们就让数组再次的依赖收集 调用个递归方法
              dependArray(value);
            }
          }
        } // 取值的时候 取参数value


        return value;
      },
      // 
      set: function set(val) {
        // 设置值的时候 设置参数value
        if (val == value) return; // 值一样的话就不用修改了
        // 如果设置的值是一个对象的话我们要对设置的值再次代理

        /*
          比如用户这样修改值: 
          vm.address = {
            num: 1
          }
          这样做的话 我们set的val就是一个对象了 我们应该对对象的值再次代理
        */

        observe(val);
        value = val; // 通知更新

        dep.notify();
      }
    });
  } // 递归给数组做劫持的方法

  function dependArray(arr) {
    // 拿到里面的每一项 每一项都做依赖收集
    for (var i = 0; i < arr.length; i++) {
      // arr[i]元素项 元素项身上都有__ob__ __ob__上有dep(ob就是this this身上有dep)
      arr[i].__ob__ && arr[i].__ob__.dep.depend(); // 如果里面还是数组

      if (Array.isArray(arr[i])) {
        dependArray(arr[i]);
      }
    }
  }

  function observe(data) {
    // 监测data是否是对象 如果不是直接return 只对对象进行劫持
    if (_typeof(data) !== "object" || data == null) return; // 说明这个对象被代理过了 不用再被代理了

    if (data.__ob__ instanceof Observer) return data.__ob__; // 如果一个对象被劫持过了 那就不需要再被劫持了
    // (要判断一个对象是否被劫持过 这里增添了一个实例 用实例来判断是否被劫持过)
    // vue在内部又创建了一个类 这个类的作用是专门观测数据的 如果该数据被观测过 那它的实例就是这个类

    return new Observer(data);
  }

  function initState(vm) {
    // 从实例身上取出 $options 获取所有的选项
    var opts = vm.$options; // 如果用户有添加 data 配置项

    if (opts.data) {
      // 如果有就对 data 进行初始化操作
      initData(vm);
    } // 如果有计算属性 我们就初始化计算属性


    if (opts.computed) {
      initComputed(vm);
    } // 如果有watch 我们就初始化watch


    if (opts.watch) {
      initWatch(vm);
    }
  } // 初始化 watch 

  function initWatch(vm) {
    // 获取用户传入的 watch 配置项 它是一个对象
    var watch = vm.$options.watch; // console.log("watch: ", watch)
    // 循环对象中的每一个 key value 做处理

    for (var key in watch) {
      // 我们考虑 字符串 数组 和 函数 这三种情况
      var handler = watch[key]; // 如果是数组的话

      if (Array.isArray(handler)) {
        // 循环创建 watcher
        for (var i = 0; i < handler.length; i++) {
          // 我们要创建watcher 将watcher放到实例上 key是监控的属性
          createWatcher(vm, key, handler[i]);
        }
      } else {
        // 不是数组就执行创建watcher
        createWatcher(vm, key, handler);
      }
    }
  }

  function createWatcher(vm, key, handler) {
    // handle 我们传递过来 它有可能是 字符串 函数
    if (typeof handler == "string") {
      // firstname: "fn" -> fn是methods定义的 但是该方法也会绑定在实例上 所以我们直接从vm上获取该方法
      handler = vm[handler];
    }

    return vm.$watch(key, handler);
  } // 初始化 计算属性


  function initComputed(vm) {
    var computed = vm.$options.computed; // 用于记录哪个属性的watcher 同时保存到实例是方便调用

    var watchers = vm._computedWatchers = {}; // 写法有两种 函数 和 对象 我们要看看 value 是不是 对象

    for (var key in computed) {
      // fullname: {} or function 拿到value的部分
      var userDef = computed[key]; // 我们需要监控 计算属性中get的变化
      // lazy: true: 如果我们执行new Watcher会直接执行fn 但是我们不希望它立刻执行 而是取值的时候才执行 lazy: true 相当于标识 标识fn不要立即执行
      // fn: 每次重新执行的方法 我们每次重新执行的就是计算属性的get()方法(或者是计算属性函数式的方法)
      // 参数:  vm fn bool

      var fn = typeof userDef == "function" ? userDef : userDef.get; // 将属性和watcher 对应起来
      // 如果直接 new Watcher 默认就会执行 fn

      watchers[key] = new Wacher(vm, fn, {
        lazy: true
      }); // 如果是一个函数 那么userDef就是getter 如果是对象那我们就取出来getter
      // const getter = typeof userDef == "function" ? userDef : userDef.get
      // const setter = userDef.set || (() => {})
      // 将计算属性 fullname 定义在 vm 上 
      // 我们没有从userDef取出getter 和 setter 而是传入userDef(相当于value的部分) 让它在方法内再取getter setter

      defineComputed(vm, key, userDef);
    }
  } // 给target定义属性


  function defineComputed(target, key, userDef) {
    // 用不到了 我们上面将 getter 放到了 new Watcher 的里面 fn就是 我们也会通过 watcher来调用 所以这里用不到了
    // const getter = typeof userDef == "function" ? userDef : userDef.get
    var setter = userDef.set || function () {}; // 这样可以通过 实例拿到对应的属性


    Object.defineProperty(target, key, {
      // 取值的时候 可以根据key 找到对应的watcher 看其是否是脏的
      // 第一次的时候 dirty是脏的 所以会执行用户传入的get() 之后 dirty为false 就不会再执行该方法了
      get: createComputedGetter(key),
      set: setter
    });
  } // 我们需要检查是否需要执行这个getter


  function createComputedGetter(key) {
    // 我们要拿到 watcher 看看 dirty 是不是脏的 怎么拿 watcher?
    // 这里的function就是get的回调 回调中的this指向
    return function () {
      // 这里是 this 是 vm 因为 getter中的this就是 obj 我们就可以通过this 拿到在vm上保存的 计算属性的所有watcher
      // 我们可以通过 key 获取到对应属性的 watcher 这个watcher中是有getter的
      var watcher = this._computedWatchers[key];

      if (watcher.dirty) {
        // 如果为true(默认就是被修改的) 我们应该实行用户传入的getter
        watcher.evaluate();
      } // watcher.evaluate() 执行后计算属性会出栈 如果Dep.target还有值 说明还有渲染watcher


      if (Dep.target) {
        // 让计算属性watcher里面的属性 也去收集渲染watcher(上层watcher)
        watcher.depend();
      } // 在调用evaluate()后会将 getter的返回值放在 watcher.value 上 相当于将值缓存在watcher上了


      return watcher.value;
    };
  }

  function initData(vm) {
    // 拿到 data配置项后 要对里面的数据进行代理
    var data = vm.$options.data; // 判断 data 是函数 还是对象 如果是函数的话我们进行调用获取其返回值

    data = typeof data == "function" ? data.call(vm) : data; // 在 vm 身上增加 _data 我们将 $options的data对象放到了 vm身上

    vm._data = data; // vue2中使用 Object.defineProperty() 来做数据的劫持
    // 我们在这里提供一个方法 观察data

    observe(data); // 到这里就说明给 data对象重新定义完了属性
    // 遍历data

    for (var key in data) {
      // 将 vm._data 用 vm 来代理
      proxy(vm, "_data", key);
    }
  }
  /*
    定义将_data中的所有key 使用Object.defineProperty() 在vm身上重新定义一份的代理方法
    参数:
      vm: 
        我们要给vm身上绑定_data对象中的属性名

      target: 
        当 vm.name 的时候从哪个原对象上读取 vm._data
      
      key:
        循环从_data身上取出的key

  */


  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      // 当从 vm 身上读取属性的时候
      get: function get() {
        // 从 vm._data[key] 取值
        return vm[target][key];
      },
      set: function set(val) {
        vm[target][key] = val;
      }
    });
  }

  function initStateMixin(Vue) {
    Vue.prototype.$nextTick = nextTick; // 添加 $watch 最终调用的都是这个方法

    Vue.prototype.$watch = function (exprOrFn, cb) {
      // console.log(exprOrFn)
      // console.log(cb)

      /*
        firstname
        firstname(n, o) {
          console.log(n, o)
        }
         or
         () => vm.firstname
        (n, o) => console.log("n, o")
      */

      /*
        $watch是一个观察者 它底层也会基于 Watcher
         参数: vm, fn, watcher类型标识
         我们传入
          this: prototype 中的this都是 vm,
           exprOrFn: 它可能是
            "firstname"
            () => vm.firsrname
           {user: true}: wacher类型的标识 用户自己写的watcher
           cb: 用户指定的watch 回调
      */
      new Wacher(this, exprOrFn, {
        user: true
      }, cb);
    };
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // 将this保存起来 以后就使用vm了 构造函数中的this就是实例
      var vm = this; // 初始化的时候 将options放到Vue实例身上
      // vm.$options = options

      /*
        为了完成 mixin 和 用户传入的配置项进行合并 我们这么做
          mixin会将mixin({options}) options和Vue.options 进行合并
          用户传入的options也要合并到Vue.options
           所以我们要拿到 Vue.options 和 用户传入的 options进行合并
          通过 this
      */

      vm.$options = mergeOptions(vm.constructor.options, options);
      /*
        一会组件初始化的时候 会将用户传入的配置项和Vue.options进行合并
        我们定义的全局指令 和 过滤器都会挂载到实例上 每个实例都能访问到
         Vue.mixin() 的时候 会将 mixin配置对象放到 Vue.options 中
        当创建组件 组件渲染的时候又会将 Vue.options 对象中的属性 再次合并到vm上
      */
      // console.log(this.constructor.options)
      // console.log(this.$options)
      // 调用生命周期 src/lifecycle.js

      callHook(vm, "beforeCreate"); // 初始化状态

      initState(vm);
      callHook(vm, "created"); // 如果 options.el 说明用户传入了el

      if (options.el) {
        // 传入el配置的话 我们就要挂载应用 我们调用$mount(el)传入el
        // 实现数据的挂载
        vm.$mount(options.el);
      }
    }; // 给Vue扩展 $mount() 方法


    Vue.prototype.$mount = function (el) {
      // 这里我们也要保存this为vm 往实例上添加东西
      var vm = this;
      el = document.querySelector(el);
      var opts = vm.$options;
      /*
        首先看看有没有render 如果有render 那我们就不用管了 所以这部分的逻辑是在 if(!render) { } 的情况下完成的
      */
      // 如果没有render函数也没有写 template 配置项

      if (!opts.render) {
        // 进来就是没有render的情况 我们定义template接收模板内容
        var template; // 没有 template配置项 但是有el配置项 那我们就直接获取DOM元素作为模板内容

        if (!opts.template && el) {
          template = el.outerHTML;
          /*
            因为上面 &&短路运算 如果表达式1为false 则整体为false 走else的逻辑
            就是说else的逻辑: 如果有 template 配置项
          */
        } else {
          // 到这里就是用户写了template配置项 那么就用用户传递的template中的内容s
          // 这里老师写的是 if(el) 但我没用哈哈
          if (opts.template) {
            template = opts.template;
          }
        } // console.log(template)
        // 如果有模板内容 我们再做模板编译的逻辑 将template编译成render


        if (template) {
          // 调用 compileToFunction() 方法将 模板内容编译成 render函数
          var render = compileToFunction(template);
          opts.render = render;
        }
      } // 组件的挂载的方法 将 vm 挂载到 页面 el 上 (#app)


      mountComponent(vm, el);
    };
  }

  function Vue(options) {
    this._init(options);
  } // init


  initMixin(Vue); // 给 vm 扩展生命周期的方法 update render

  initLifeCycle(Vue); // 给 vm 扩展mixin的方法

  initGlobal(Vue); // 给原型扩展 $nextTick $watch

  initStateMixin(Vue); // ----- 为了方便观察前后的虚拟节点(测试用) -----

  /*
    为了生成虚拟节点 需要提供 template 将其变为render 产生虚拟节点
    我们先用一个模板 然后编译成render
  */
  // 返回的是render函数

  var render1 = compileToFunction("<ul a=\"1\" style=\"color: red;\">\n  <li key=\"a\">A</li>\n  <li key=\"b\">B</li>\n  <li key=\"c\">C</li>\n</ul>"); // 我们要传入vm 所以创建一个vm vm上才有_c()等方法

  var vm1 = new Vue({
    data: {
      name: "sam"
    }
  });
  var prevVnode = render1.call(vm1); // console.log("prevVnode: ", prevVnode)
  // 再整一个模版

  var render2 = compileToFunction("<ul a=\"1\" style=\"color: blue;\">\n  <li key=\"a\">A</li>\n  <li key=\"b\">B</li>\n  <li key=\"c\">C</li>\n  <li key=\"d\">d</li>\n</ul>");
  var vm2 = new Vue({
    data: {
      name: "sam"
    }
  });
  var nextVnode = render2.call(vm2); // console.log("nextVnode: ", nextVnode)

  /* 
    为了能看到页面的变化 我们将 prevVnode 生成真实的DOM 插入到页面上
    之后用 prevVnode 和 nextVnode 比较结果更新页面
  */
  // 将虚拟节点创建成真实节点

  var el = createElm(prevVnode);
  document.body.appendChild(el); // 我们之前的做法是 当数据发生变化的时候 拿到新的模版再次生成新的虚拟DOM 再次生成真实DOM 替换掉之前的el

  /*
    这是没有diff算法的操作 直接将心的节点替换掉了老的节点
    let newEl = createElm(nextVnode)
    el.parentNode.replaceChild(newEl, el)
  */

  /*
    这样不好 用户自己操作DOM 可能会有性能的浪费 比如获取元素后再操作DOM就会不停的重绘
    如果之前就是 <li>{{name}}</li> 之后还是 <li>{{name}}</li> 没有变化 用替换么 因为前后元素一致
    我们希望尽可能的复用 老的节点 所以Vue中 不是直接替换 而是比较两个人的区别之后再替换

    因为 真实节点 上的属性非常的多 而我们的虚拟DOM则没有那么多 能尽量不创建DOM就不创建DOM 这就是diff算法
  */

  setTimeout(function () {
    patch(prevVnode, nextVnode);
  }, 1000);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
