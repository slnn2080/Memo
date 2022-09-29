### Vue中使用 ElementUI Upload 组件 完成Excel的解析与导出
- 这里我们总结下使用 upload 组件上传下载excel
- 我们点击excel文档后上传解析 将解析后的数据展示 并上传到服务器

- 下面先来介绍下 整个 demo 中用到的知识点


> upload组件的属性
```html
<el-upload
  action
  :accept=".xlsx, .xls"
  :auto-upload="false"
  :show-file-list="false"
  :on-change="handle"
>
```

- action: 
- 是为了上传到哪里的后台接口


- show-file-list:
- 显示上传文件的列表 默认值 true


- auto-upload: 
- 是否在选取文件后立即上传 默认: true


- http-request: 
- 覆盖默认的上传行为 可以自定义上传的实现
- 一般我们会使用该方式 因为如果我们上传的是大文件的话 我们需要自定义逻辑
- 我们会将文件进行切片化管理 切片完成后我们会将文件断点续传到服务器 在服务器端进行合并


- accept: 
- 指定上传文件的类型 如: accept: ".xlsx, .xls"


- on-change: 
- 类型: function(ev)
- 文件状态改变时的钩子 添加文件 上传成功和上传失败时都会被调用
- 这里我们用来拿到 我们点击按钮选择的 excel 文件

- ev事件对象的输出结果:
```js
  name: "test.xls"    // 文件名
  percentage: 100     // 上传的记录
  raw: File           // 上传的文件
  response: "html页面的结构 为啥?"
  size: 671852
  status: "success"   // 状态
  uid: 1633051195904
```


> 思路: 
- 1. 既然我们能够在 on-change 的回调中拿到 文件对象file 那么 我们就可以利用 filereader 来读取 file 中的内容 
- 因为读取文件是异步的操作 我们想等读完文件后 再返回结果 我们就可以借助 promise 将读取文件的逻辑封装陈给一个方法

- 2. 我们可以通过 new FileReader() 这个类读取文件 它支持各种读取文件的方式
- 下面是当前文件以2进制的方式读取 还可以按照bas64的方式读取 

- 一般我们想把文件通过断点续传的方式处理的话 会选择base64 
- 如果想在本地进行解析处理我们会选择二进制的方式

- 其中reader对象有onload事件 回调中的参数e里有读取后的结果 e.target.result 当读取成功后我们将成功的结果通过 resolve 返回
```js
readFile(file) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    // 读成2进制
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
},
```


- 3. 上面我们将获取到的 file 对象通过 filereader 读成了二进制数据 接下来我们就要解析二进制数据 解析成我们想要的json格式的数据 这里我们需要下载 xlsx

- 下载:
- npm i xlsx

```js
// onchange的回调
async handleChange(e) {

  // 获取文件
  let file = e.raw;
  if (!file) return;

  // 如果能走到这里 说明文件已上传 那么我们就读取文件的数据 new readerfile
  let data = await this.readFile(file);

  // 我们拿到二进制数据之后要进行解析 解析成我们想要的json格式的数据 这里需要用到 xlsx模块 我们使用这个模块来处理我们读取的二进制数据
  // 通过读取二进制数据 根据二进制数据创建excel表格
  let workBook = xlsx.read(data, { type: "binary" });
  console.log(workBook);

  ...
}
```

> 知识点:
- xlsx.read(data, { type: "binary" })
- xlxs身上的read方法可以读取文件 
  第一个参数: 我们通过reader读取的数据
  第二个参数: 配置对象 我们设置类型为二进制数据


- 上面我们将二进制数据转化为 excel表格的样子 也就是 workbook的输出结果
```js
// 输入workBook后的样子
Custprops: {
  WorkbookGuid: '3f1215b6-4822-4689-8302-1ac6c5396d8c'}
  Deps: {}
  Directory: {
    workbooks: Array(1), 
    sheets: Array(2), 
    charts: Array(0), 
    dialogs: Array(0), 
    macros: Array(0), …
  }
  Props: {
    LastAuthor: 'bs_taku', 
    LastPrinted: '2014-09-08T07:57:11Z', 
    Author: '栗田', 
    Title: '請求書（原稿）', 
    CreatedDate: Tue Aug 04 1998 15:04:33 GMT+0900 (日本標準時), …
  }
  SSF: {
    0: 'General', 
    1: '0', 
    2: '0.00', 
    3: '#,##0', 
    4: '#,##0.00', 
    6: '"¥"#,##0;[Red]"¥"\-#,##0', 
    8: '"¥"#,##0.00;[Red]"¥"\-#,##0.00', 
    9: '0%', 
    10: '0.00%', 
    11: '0.00E+00', 
    12: '# ?/?', 
    13: '# ??/??', 
    14: 'm/d/yy', 
    15: 'd-mmm-yy', 
    16: 'd-mmm', 
    17: 'mmm-yy', 
    18: 'h:mm AM/PM', 
    19: 'h:mm:ss AM/PM', 
    20: 'h:mm', 
    21: 'h:mm:ss', 
  }
  SheetNames: (2) ['作業実績報告書', '【説明】作業実績報告書(ｻﾝﾌﾟﾙ)']
  Sheets: {
    作業実績報告書: {…}, 【説明】作業実績報告書(ｻﾝﾌﾟﾙ): {…}}
  Strings: (29) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, Count: '60', Unique: '28']
  Styles: {
    NumberFmt: Array(191), 
    Fonts: Array(75), 
    Fills: Array(28), 
    Borders: Array(48), 
    CellXf: Array(72)}
  Themes: {}
  Workbook: {AppVersion: {…}, WBProps: {…}, WBView: Array(1), Sheets: Array(2), CalcPr: {…}, …}
},
```

- 上面我们通过 xlsx.read方法读取了我们上传的excel二进制文件 里面有很多的信息 我们主要使用哪些 或者关注哪些信息呢？

> SheetNames: 
- 它的类型是一个数组 里面每一个对象代表 一个 sheet 的名字

> Sheets: 
- 它的类型是一个对象 里面的k是sheet的名字 v是该sheet里面的数据 v也是一个对象
- 展开v对象后: 

- !ref: 
- 表示我们的数据从哪个单元格开始到哪个单元格结束 A1:B61

- !margins:
- 这个sheet的位置的信息

- !merges
- 它的类型是一个数组 标签当前表格里面有哪些列是进行合并的 如果涉及到合并列的话处理起来就更加的复杂了

- A1: 每一个单元格都是一个对象 其中里面有
- v:  就是单元格中的内容
- t:  内容的类型 s 就是字符串 n 就是数字


- 我们拿到了这样的对象 我们想把这样的数据形式变成我们熟悉的json的格式 需要怎么做？
- 我们可以通过在sheetname中拿到一个sheet的名字 通过这个名字去sheets中找到它对应的数据 这是自己处理的思路 我们也可以通过xlsx中提供的方法来处理
```js
    // workBook是整个的excel文件 里面有很多的属性 比如 sheetnames 就是每一个sheet的名字 sheets就是所有sheet的数据

    // 拿到第一个sheet的名字去sheets数据里面找对应的数据
    let workSheet = workBook.Sheets[workBook.SheetNames[0]];

    // xlsx中提供了很多转换数据的方法 我们可以直接调用拿到我们想要的数据格式
    data = xlsx.utils.sheet_to_json(workSheet);
    
    // 比如我们表格是
    姓名    电话
    劉春杉  18698712060

    // 那我们拿到的数据格式就是 数组对象 其中每一个对象就是每一行的信息
    {
      姓名: "劉春杉", 
      电话: 18698712060
    }
    console.log(data);
```

- 但是有一个问题 我们不能将【姓名】这个字段 就这么以汉字的形式传到服务器 我们要将姓名变成name 把电话变成phone
- 把读取出来的数据变为最后可以传递给服务器的数据（汉字 姓名 - name）

> 解决方式1:
- 老师为了解决这个问题 首先设置了一个变量 name phone 就是字段名 表明了文本和该字段的类型 类型的作用是当前字段最终以什么样的类型做展示
```js
    let char = {
        name: {
            text: "姓名",
            type: "string"
        },
        phone: {
            text: "电话",
            type: "string"  //传递给服务器的时候应该是已字符串的形式 所以我们指定了该字段的类型
        }
    }
```

> 思路: 
- 我们需要处理下 xlsx转换过来的数据 因为里面的字段是汉字 
- 所以我们要遍历这个数据 将汉字的字段 修改为 英文的字段 方便我们在服务器中存储
- 1. 首先定义一个空数组 用来装 修改后的数据
- 2. 遍历通过xlsx方式转换过来的json格式的数据data
- 3. 定义一个空对象 该对象用来装修改后的格式 最后会将该对象装进数组中
- 4. 遍历我们定义的字段变量 内部做这样的处理
  - 1. 我们取出字段变量的值 因为字段变量的值是一个对象 里面有text 和 type
  - 2. 我们拿着 text 其实也就是 姓名 拿着这个值去数据源里找对应的值
  - 3. 根据类型对数据进行处理 是转为字符串格式还是数字格式
  - 4. 往空对象中添加属性名 和 属性值 key就是我们定义的英文字段 v就是我们处理后的内容
```js
  let arr = [];
  data.forEach((item) => {
    // 我们每循环一次要往arr中添加一个新对象 我们这里应该有每一行的字段和对应的数据 那么这个对象中要有多少个字段 我们取决于我们自己定义的字段变量 sheetField
    let o = {};
    for (let key in this.sheetField) {
      if (!this.sheetField.hasOwnProperty(key)) break;
      // 因为我们定义的字段变量key的值是一个对象, 然后我们分别取出文本 和 类型
      let v = this.sheetField[key],
        text = v.text,
        type = v.type;

      // 我们拿着text(姓名)去data中找对应的值 item就是每一个对象
      v = item[text] || "";
      // 然后我们要将v根据type来进行处理 也就是假如我们拿到的是string就转换string 如果是number类型就转换为number类型
      type == "string" ? (v = String(v)) : null;
      type == "number" ? (v = Number(v)) : null;

      o[key] = v;
    }
    arr.push(o);
  });
```

- 这种方式的优点是 我知道excel中有哪些字段 这样我可以自己设置字段的名字
- 但是字段太多的时候会非常的复杂 或者 不固定多少字段的时候也会非常的复杂
- 还有 我们从excel表格中解析出来的电话都是number类型 日期都是date类型 最后我们要变成我们要往服务器传递的数据 那还需要各种判断


> 那解析excel到底是前端来做还是后端来做？
- 我们可以把选择的excel直接传给服务器 前端连解析都不用 但是后台解析肯定会占后台的资源的

- 怎么展示数据到表格中
- 刚开始的时候 我们页面当中 不展示表格 当我们把数据解析后 这个表格才展示 将解析后的数据呈现出来

- 我们表格的数据是根据 :data = "tableData" 来展示的 我们将我们处理好的数据给 tableData 就可以了


- table中的loading
- import {Loading} from "element-ui"

- 我们可以在 解析数据前 使用该 Loading
```js
    async handleChange(e) {
      let file = e.raw;
      if (!file) return;
      
      // 这种方式的loading是异步的 所以现在的效果就是数据展示之后才显示loading
      // 比如异步延迟 宏任务 微任务等
      let loadingInstance = Loading.service({
          text: "小主请您稍等片刻 奴家正在玩命处理当中",
          background: "rgba(0,0,0,.5)"
      })

        。。。

      // 最后让这个提交loading消失
      loadingIntance.close()
```

- 那loading本身是异步的 但是就是想让这个异步的操作在前面来展示怎么办？
- 提示完loading之后我们在解析数据
- 老师这里用的是异步延迟 在a b之间使用这个方法做这个事 只有到达时间我们才返回一个成功的状态

> delay函数
```js
    function delay(interval = 0) {
        return new Promise(resolve => {

            let timer = setTimeout(_ => {
                clearTimeout(timer);
                resolve()
            }, interval)
        })
    }
```
```js
     async handleChange(e) {
      let file = e.raw;
      if (!file) return;

      this.show = false
      let loadingIntance = Loading.service({
          text: "小主请您稍等片刻 奴家正在玩命处理当中",
          background: "rgba(0,0,0,.5)"
      })
      
      // 因为await本身也是异步的 如果他不返回成功状态下面的走不了 所以这里多等待了100ms 也就是说我们先让loading出来 100ms后解析数据 然后将数据展示在页面当中 然后关闭loading
      await delay(100)
     
      let data = await readFile(file)

      .......


      // 为了防止页面解析太快 我们再等待100ms
      await delay(100)
      this.show = true
      this.tableData = arr
      loadingIntance.close()
```

------

> 将json数据上传至服务器的逻辑
- 要看看我们的后台是怎么支持的 如果是我们将60条数据 全部上传 后台将60条数据 全部放到数据库
- 这种情况不需要我们做什么 我们直接将数据上传就可以
- 如果后台不支持批量存储 比如 你就要一条条的告诉给我 告诉我一条 我存一条 那么也需要前端一条条的传给后台 

> 一条条传的时候 前端的做法: 
- 我们在提交逻辑的回调中 做以下的处理 我们每调用一次send就是将tableData中的一条数据传递给服务器
```js
async submit() {
  // 如果没选择 excel的时候 给出提示
  if(this.tempDate.length <= 0) return alert("小朱 请选择excel文件)

  // 把数据一条条传递给服务器
  // 记录已经给服务器多少条数据了     
  let n = 0
  // 利用 send 方法传递数据
  let send = async () => {

      // 递归出口 说明都上传完了
      if(n > this.tempData.length - 1) return


      // n的初始值为0 将tableData[n]中的数据 传递给服务器
      let body = this.tableData[n]
      let res = await this.$axios({url, data: body})

      // 比如code为0成功 1为失败
      if(res.data.code === 0) {
        n++
      }

      // 不管成功还是失败都开始下一条请求 递归
      send()
  }
  send()
}
```

> e-coms标记
- 假如有上传成功的数据 也有上传失败的数据那怎么处理？
- 我们可以定义两个数据 成功的存在一个里面 失败的不存 这样我们可以拿着成功的数组和原始数组进行对比
- 看看哪些失败了
```js
  async uploadFile() {
      // 我必须有数据才能上传到服务器吧 如果tableData里面没有数据数名没有采集完毕
      if (this.tableData.length <= 0) return alert("请您选选择文件哦");

      // 完成后处理的事情
      let complate = () => {
        // 成功之后 提示下上传功能 message type showClose
        alert("数据上传完毕");l
        // 上传完数据后表格隐藏 跳转等逻辑也可以在这里面处理
      };

      let n = 0;
      let send = async () => {
        // 当n的值超过tableData的最大长度后 停止发送 这种情况代表都传递完了
        if (n > this.tabelData.length - 1) {
          // 都传完了后 调用完成后处理的事情
          return;
        }
        
        let body = this.tabaleData[n];
        let res = await this.$axios({
          url,
          method: "post",
          data: body,
        });

        if (res.code === 0) {
          console.log(res);
          n++;
        }
        // 递归方式一条条的传递数据
        send();
      };
      send();
    },
```

------

> 将数据导出为excel文件
> 获取数据的逻辑
- 点击搜索按钮后 就是从服务器获取数据 比如我们根据什么发送get请求 然后获取数据
```js
// 拿到数据的逻辑回调 我们可以在 created 生命周期里面调用
async queryData() {
  this.loading = true 
  let options = {
    limit: this.pageSize
    page: this.page
    search: this.search
  }
  let result = await queryList(options)
  if(result.code === 0) {
    this.tableData = result.data
    this.page = parseFloat(result.limit)
    this.total = parseFloat(result.count)
  }
  this.loading = false
}
```

------

> 分页处理
```js
  sizeChange(val) {
  this.pageSize = val
  this.page = 1
  this.queryData()
}
```

------

> 上一页 下一页的罗
```js
prevNext(val) {
  this.page = val
  this.queryData()
}
```

------

> 将选中的数据进行导出
- 利用到了 table组件中的 selection-change 标签属性 该回调在复选框发生变化的时候会触发
- 在这个回调中我们能拿到所有选中的数据 我们可以将选中的数据给data配置项里面的变量
- selectionChange(val) {this.sList = val}

- 我们有了选中的数据后 当点击导出按钮的时候 进行 事件回调 提交
```js
submit() {
  // 看看有没有选中数据 如果没有 我们就return
  if(this.selectionList <= 0) {
    alert("小主请您先选择要导出的数据")
    return
  }

  this.disabled = true
  let loadingIntance = Loading.service({
    text: ""
    background: ""
  })

  let arr = this.selectionList.map(item => {
  return {
    // 这里是最终要导出的excel格式
    编号: item.id
    姓名: item.name
    电话: item.phone
    }
  })

  // 把json数据变成sheet数据
  let sheet = xslx.utiles.json_to_sheet(arr)

  // 新建表格
  let book = xslx.utils.book_new()

  // 将sheet插入表格中
  xslx.utils.book_append_sheet(book, sheet, "sheet1")

  // 将整个文件写入真实文件中
  xslx.writeFile(book, `user${new Date().getTime()}.xls`)

  loadingIntance.close()
  this.disabled = false
}
```


> 提交数据给服务器
https://www.bilibili.com/video/BV1HD4y1R7jY?p=3&spm_id_from=pageDriver

------

> 完整代码
```js
readFile(file) {
    return new Promise((resolve) => {
      let reader = new FileReader();
      // 我们可以通过这个类 将文件已各种形式读取出来 下面是当前文件以2进制的方式读取 还可以按照bas64的方式读取 一般我们想把文件通过断点续传的方式处理的话 会选择base64 如果想在本地进行解析处理我们会选择二进制的方式
      reader.readAsBinaryString(file);
      // 读取文件需要时间 属于异步编程 所以我们在onload里面 e.target.result 就是读取的数据 只有我把数据的到了才会返回一个成功状态的promise
      reader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  },
  async handleChange(e) {
    let file = e.raw;
    if (!file) return;

    // 如果能走到这里 说明文件已上传 那么我们就读取文件的数据 new readerfile
    let data = await this.readFile(file);
    // 我们拿到二进制数据之后要进行解析 解析成我们想要的json格式的数据 这里需要用到 xlsx模块 我们使用这个模块来处理我们读取的二进制数据
    // 通过读取二进制数据 根据二进制数据创建excel表格
    let workBook = xlsx.read(data, { type: "binary" });

    // 读取file中的数据变成json格式
    // workBook是整个的excel文件 里面有很多的属性 比如 sheetnames 就是每一个sheet的名字 sheets就是所有sheet的数据
    // 拿到第一个sheet的名字去sheets数据里面找对应的数据
    let workSheet = workBook.Sheets[workBook.SheetNames[0]];
    // xlsx中提供了很多转换数据的方法 我们可以直接调用拿到我们想要的数据格式
    data = xlsx.utils.sheet_to_json(workSheet);

    // 把读取出来的数据变为最后可以传递给服务器的数据（汉字 姓名 - name）
    console.log(data);
    let arr = [];
    data.forEach((item) => {
      // 我们每循环一次要往arr中添加一个新对象 我们这里应该有每一行的字段和对应的数据 那么这个对象中要有多少个字段 我们取决于我们自己定义的字段变量 sheetField
      let o = {};
      for (let key in this.sheetField) {
        if (!this.sheetField.hasOwnProperty(key)) break;
        // 因为我们定义的字段变量key的值是一个对象, 然后我们分别取出文本 和 类型
        let v = this.sheetField[key],
          text = v.text,
          type = v.type;

        // 我们拿着text(name)去data中找对应的值 item就是每一个对象
        v = item[text] || "";
        // 然后我们要将v根据type来进行处理 也就是假如我们拿到的是string就转换string 如果是number类型就转换为number类型
        type == "string" ? (v = String(v)) : null;
        type == "number" ? (v = Number(v)) : null;

        o[key] = v;
      }
      arr.push(o);
    });

    // 这里可以将arr数据交给tableData
  },
  async uploadFile() {
    // 我必须有数据才能上传到服务器吧 如果tableData里面没有数据数名没有采集完毕
    if (this.tableData.length <= 0) return alert("请您选选择文件哦");

    // 完成后处理的事情
    let complate = () => {
      // 成功之后 提示下上传功能 message type showClose
      alert("数据上传完毕");
      // 上传完数据后表格隐藏 跳转等逻辑也可以在这里面处理
    };

    let n = 0;
    let send = async () => {
      // 当n的值超过tableData的最大长度后 停止发送 这种情况代表都传递完了
      if (n > this.tabelData.length - 1) {
        // 都传完了后 调用完成后处理的事情
        return;
      }
      let body = this.tabaleData[n];
      let res = await this.$axios({
        url,
        method: "post",
        data: body,
      });

      if (res.code === 0) {
        console.log(res);
        n++;
      }
      // 递归方式一条条的传递数据
      send();
    };
    send();
  },

  fileSelect(e) {
    let inp = this.$refs.upload.$el.querySelector("input[type=file]");
    inp.click();
  },
```

------------------

> 导入导出excel文件的代码部分
```js
  <template>
  <div>
    <el-upload
      class="upload-demo"
      :limit="1"
      :show-file-list="false"
      :on-change="handleChange"
      :http-request="uploadFile"
      :accept="uploadAccept"
      :auto-upload="false"
    >
      <el-button size="small" type="primary">excelインポート</el-button>
      <el-button size="small" type="danger" @click="exportExcel"
        >excelエクスポート</el-button
      >
      <div slot="tip" class="el-upload__tip"></div>
    </el-upload>

    <el-table
      :data="tableData"
      row-key="username"
      header-row-class-name="thead-light"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="hasCheck" type="selection" min-width="50">
      </el-table-column>
      <el-table-column
        v-for="(item, index) of tableColumn"
        :key="index"
        v-bind="item"
      >
        <template v-if="item.type == 'link'" scope="scope">
          <nuxt-link :to="linkTo">{{ info(scope.row, item.prop) }}</nuxt-link>
        </template>
        <template v-else scope="scope">
          {{ info(scope.row, item.prop) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
import { Table, TableColumn, Upload, Button } from "element-ui";
import xlsx from "xlsx";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Upload);
Vue.use(Button);

export default {
  name: "InfoTable",
  data() {
    return {
      sheetField: {
        username: {
          text: "会員名",
          type: "string",
        },
        entrust: {
          text: "依頼情況",
          type: "string",
        },
        date: {
          text: "変更日",
          type: "string",
        },
        point: {
          text: "変更点",
          type: "string",
        },
      },
      hasCheck: true,
      linkTo: "",
      uploadAccept: ".xls,.xlsx",
      tableData: [],
      tableColumn: [
        {
          prop: "username",
          label: "会員名",
          minWidth: 100,
          sortable: true,
          type: "link",
        },
        {
          prop: "entrust",
          label: "依頼情況",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "date",
          label: "変更日",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "point",
          label: "変更点",
          minWidth: 100,
          sortable: true,
          type: "link",
        },
      ],
      tableSelectData: [],
    };
  },
  computed: {
    info() {
      return (row, prop) => {
        return row[prop];
      };
    },
  },
  methods: {
    readFile(file) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
          resolve(e.target.result);
        };
      });
    },
    async handleChange(e) {
      let file = e.raw;
      if (!file) return;

      let data = await this.readFile(file);
      let workBook = xlsx.read(data, { type: "binary" });

      let workSheet = workBook.Sheets[workBook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(workSheet);
      console.log(data);

      let arr = [];
      data.forEach((item) => {
        let o = {};
        for (let key in this.sheetField) {
          if (!this.sheetField.hasOwnProperty(key)) break;
          let v = this.sheetField[key],
            text = v.text,
            type = v.type;

          v = item[text] || "";
          type == "string" ? (v = String(v)) : null;
          o[key] = v;
        }
        arr.push(o);
      });
      this.tableData = arr;
    },

    handleSelectionChange(val) {
      this.tableSelectData = val;
    },
    exportExcel() {
      if (this.tableSelectData <= 0) return alert("データを選択してください");
      let arr = this.tableSelectData.map((item) => {
        return {
          会員名: item.username,
          依頼情況: item.entrust,
          変更日: item.date,
          変更点: item.point,
        };
      });
      let sheet = xlsx.utils.json_to_sheet(arr);
      let book = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(book, sheet, "sheet1");
      xlsx.writeFile(book, `user${+new Date()}.xls`);
    },
  },
};
</script>

<style scoped>
.info-table {
  margin: 24px;
}
.btnGroup {
  display: flex;
  margin-right: 8px;
}
</style>

```

> 总结: 
- 首先 定义了一个 readFile的方法 里面封装了 promise 因为读取文件是一个异步的
- 其次 在select-change回调中 先利用 readFile读取二进制数据 然后利用xlsx模块根据二进制数据生成excel文件
- 其次 通过xlsx中的方法 找到sheet1 然后将其转换为json 
- 然后 需要修改json数据中的字段 由汉字改为英文 在这个逻辑的最后 将最新数据交给table数据源