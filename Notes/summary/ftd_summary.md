### 技术点：

------------------

### 链判断运算符
> ?.
- 以往我们要读取对象内容的属性的时候 往往需要判断一下 属性的上层是否存在
- 比如：message.body.user.firstName

- 错误的写法：
- let name = message.body.user.firstName || "default"
- 有哪个用哪个

- 正确的写法：
- let name = (
    message && message.body && message.body.user && message.body.user.firstName
  ) || "default"
- 我们要层层的判断一下属性的上层有没有值 但是我们需要的属性在第4层 所以要判断4次 每一层是否有值

> ?.
- es6中引入了 ?. 运算符 在链式调用的时候判断 左侧的对象是否为null或者undefined
- 如果是 null 或者 undefined 那么就返回undefined
- 如果不是 就执行

<！--
  a?.b
  // 等同于
  a == null ? undefined : a.b
  
  a?.[x]
  // 等同于
  a == null ? undefined : a[x]
  
  a?.b()
  // 等同于
  a == null ? undefined : a.b()
  
  a?.()
  // 等同于
  a == null ? undefined : a()
-->

> ??
- 当运算符的左侧为null或者是undefined的时候 给予默认值
- const animationDuration = response.settings?.animationDuration ?? 300;
- 
------------------

### element ui Select组件传递参数
- 这里稍微的做一下总结
- 
- react中 事件的回调传递参数的时候可以
- 情况1:
<!--
  // 我们将return的函数返回 所以react在帮我们调用的时候 调用的是return的函数 所以return的函数中有e
  而我们传递的参数可以在回调中的外层接收到

  onClick={this.changeEvent(val1, val2)}
  changeEvent = (val1, val2) => {
    return (e) => { ... }
  }


  // 不用函数的柯里化的方式
  onClick={(e) => { this.changeEvent(val1, val2)} }
-->

- 而select的change回调中就可以使用这种方式


- 在computed计算属性中 也可以传递参数
<!--
  computed: {
    total() {
      return (我们可以在这里接收到参数) => {

      }
    }
  }
-->




### 如何在Vue中使用mock
- npm i mockjs
- import
- 定义规则 
- 如果不使用拦截的话可以不传递第一个url参数 然后使用变量接收
-

<!--
  import Mock from "mockjs";
  Mock.mock("http://localhost:3200/data", {
    "list|5-10": [
      {
        flag: "@id",
        "title|+1": ["基本情報", "登録情報", "事務所等情報", "連絡先", "資格情報", "政治連盟", "その他", "口座情報", "交通費", "自宅"],
        "options|3-5": [
          {
            "subTitle|+1": ["登録番号", "氏名", "フリガナ", "生年月日", "性別", "支部", "種別", "変更年月日", "入会年月日", "登録年月日"],
            type: "input",
            prop: /[\u0041-\u005a]{5}/,
          }
        ],
      }
    ]
  })
-->

------------------

### input + select + button 点击按钮添加页面结构
- 场景：
- [ 日本语 ]  [ 下拉框 ]  删除按钮
- [ 添加语言 ]

- 页面上有如上的结构 点击添加语言按钮会 会生成如上的结构
- 中川的项目中：
- 用户列表页面 点击 确认 会进入到用户详情
- 用户详情页面
  - 展示页面
  - 修改页面

- 展示页面中 信息为只读 为普通文本
  - 要点
  - 比如将服务器返回的数据类型修改为 字符串 否则会展示 Object object || ["信息"] 等源码
  
- 修改页面中 信息为修改 为input等
  - 要点
  - 比如将数组和对象类型 整理成字符串 因为 input 需要使用 v-model 来绑定


- 思路
- 先创建数据结构，根据数据结构 使用v-for来动态生成 html 结构，所以这时我们在添加的逻辑中往数据结构中push一个对象就 页面就会自动渲染一个对应的结构
- 同时我们在这个环节里 将请求回来的数据对应的项目值如果是数组 或 对象 要整理成字符串 用于 展示页面里 数据的展示


> 展示页面的逻辑
<!--
    // ret为展示页面外壳组件请求回来的数据
    let ret = res.data.data.attributes;
    for (let key in ret) {
        
      // 判断 ret对象中的指定属性类型 是否为数组 如果是 转换为 字符串 用于页面展示
      if (key == "license" && Array.isArray(ret[key])) {
        ret[key] = ret[key].join(",");
      }

      if (key == "skill" && Array.isArray(ret[key])) {
        ret[key] = ret[key].join(",");
      }

      if (
        key == "language" &&
        Object.prototype.toString.call(ret[key]) == "[object Object]"
      ) {
        if (
          Array.isArray(ret[key].language) &&
          Array.isArray(ret[key].level)
        ) {
          ret[key].language = ret[key].language.join(",");
          ret[key].level = ret[key].level.join(",");
        }
      }
    }
-->

- 到这展示工作整理完毕 我们1中对数据的处理
- 1 为了整理出 info 对象 我们要通过他来生成 语言 - 水平 - 删除 这样的结构
- 2 为了页面能够正常的展示 我们将数组转为字符串 将对象里面的数据 也转为字符串



> 修改页面的逻辑
- 1 在修改页面的外壳组件中 我们对请求回来的数据 进行处理
  - 组织 info数据结构 用于使用info数组 动态创建 html 结构
<!--
    // 项目里我根据请求回来的数据 整理成了一个我需要的数组对象
        
        项目中的结构是：
        language: { language: ["中国语", "日本语"], level: ["一般", "一般"]}

        通过加工 我整理成了：
        info: [{language: "中国语", level: "一般"}, {language: "日本语", level: "一般"}]
    

    // 我们要将info组织成这样的数组对象
    info = [
        {},
        {},
    ]


    // 修改页面外壳组件请求回来的数据
    let ret = res.data.data.attributes;

    // 我们组织它是
    let info = [];

    // 判断 指定属性 是否为数组 因为展示页面的input v-model 要绑定的类型是字符串
    for (let key in ret) {
      if (key == "license" && Array.isArray(ret[key])) {
        ret[key] = ret[key].join(",");
      }

      if (key == "skill" && Array.isArray(ret[key])) {
        ret[key] = ret[key].join(",");
      }
        
      // 判断 指定属性 是否为对象 同时如果内部属性为数组的时候 我们组织成一个info对象
      if (
        key == "language" &&
        Object.prototype.toString.call(ret[key]) == "[object Object]"
      ) {
        if (
          Array.isArray(ret[key].language) &&
          Array.isArray(ret[key].level)
        ) {
          ret[key].language.forEach((item, index) => {
            let obj = {
              language: item,
              level: ret[key].level[index],
            };
            info.push(obj);
          });

        // 如果内部属性不为数组 我们要将它们转为数组 然后在组织 info对象
        } else {
          ret[key].language = ret[key].language.split(",");
          ret[key].level = ret[key].level.split(",");
          ret[key].language.forEach((item, index) => {
            let obj = {
              language: item,
              level: ret[key].level[index],
            };
            info.push(obj);
          });
        }
      }
-->


- 2 组织完info对象了 同时也将修改页面 input v-model 的数据修改为了字符串 接下来我们就要通过 info 来遍历生成 input + select + button 的页面结构了
<!--
    // 这里的options是用来 遍历生成 option 的
    {
      name: "語学",
      options: [
        {
          label: "ネイティブ",
          value: "ネイティブ",
        },
        {
          label: "日常会話",
          value: "日常会話",
        },
        {
          label: "読み",
          value: "読み",
        },
      ],
      props: "language",
      type: "language-group",
      is_readonly: false,
    },


    <template v-else-if="n.type == 'language-group'">
    <div v-if="!n.is_readonly">

    // 整个 [ 日本语 ]  [ 下拉框 ]  删除按钮 结构 我们使用v-for在这个结构的包裹容器里使用 
    <div
      class="row align-items-center language-group-row"
      v-for="(item, index) in info"
      :key="index"
    >
      
      // input 里面使用了 v-model 绑定了info中一个对象中的一个language属性
      <div class="col-lg-3">
        <el-input
          :readonly="n.is_readonly"
          :type="n.type"
          v-model="item.language"
          @change="inputChange"
        />
      </div>

      // select 里面使用了 v-model 绑定了info中一个对象中的一个level属性
      <div class="col-lg-2">
        <el-select
          @change="selectChange"
          :readonly="n.is_readonly"
          :type="n.type"
          v-model="item.level"
        >
            
          // 这里根据另一个对象中的options属性生成的option选项
          <el-option
            v-for="i in n.options"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          ></el-option>
        </el-select>


      </div>
      <div class="col-1">
        <el-button
          type="danger"
          @click="deleteItem(index)"
          >削除</el-button
        >
      </div>
    </div>
    <div
      class="row align-items-center language-group-row"
    >
      <el-button
        type="warning"
        class="add-btn"
        @click="addItem"
        >言語追加</el-button
      >
    </div>
    </div>
-->


- 3 添加语言 按钮的逻辑
- 添加按钮点击后创建一个 info数组里的一个对象 push到info数组里面
<!--
    addItem() {
      let obj = {
        id: Date.now(),
        language: "",
        level: "",
      };
      this.info.push(obj);
    },
-->

- 4 删除按钮 的逻辑
- 点击删除按钮的时候传入index值 根据index值来删除 info数组中的 index项
<!--
    deleteItem(index) {
      this.info.splice(index, 1);
      this.formDataUpdate();
    },
-->

- 5 修改 form 数据
- 因为整个修改页面的数据都绑定在form对象里面 但是我们添加的input 和 select并没有绑定name属性
<!--
    因为后端就一个language语言的字段 而我们将它拆解成了两个item项
    language对应的input
    level对应的select
    
    所以后端只需要一个字段的情况下 怎么在两个结构中使用同一个name
    是不是也可以 都绑定 language 而input v-model language.language 
    select v-model language.level??

    可以试试
-->
- 也就是说 我们的这两个结构并没有在form表单里面 既然没有在form表单里面 那么我们就要在发起请求之前
- 修改下发起请求是 所需的form数据 将 我们的input的值 和 select的值 整理好格式 放入form数据中
<!--
    form所需格式
    language: {
        language: ["日本语", "中国语"],
        level: ["母语", "一般"]
    }


    info: [
        {
            language: "德语",
            level: "一般"
        }
    ]

    也就是说 我们要拿出info里面每一个对象 将language push到 form的里面 将level push到form里面
-->

- 所以我创建了一个函数 专门用来修改form
- 我们遍历info数组 拿到每一个对象 将其中的所有language取出 和 level取出 添加到对应的数组中 通过修改form数据language对象里面的两个属性值
<!--
    formDataUpdate() {
      let languageArr = [];
      let levelArr = [];
      this.info.forEach((item) => {
        languageArr.push(item.language);
        levelArr.push(item.level);
      });
      this.form.language.language = languageArr;
      this.form.language.level = levelArr;
    },
-->

- 这里 input 输入完后 我们需要修改form数据
- select 选择后 也要修改form数据
- delete 删除后 也要修改form数据
- 因为我们input select都是v-model绑定的info数组对象中的数据 也就是说 info对象中的数据本身就是最新的
- 所以我们的核心就是将info遍历取出数据 填入form里面
<!--
    inputChange() {
      this.formDataUpdate();
    },
    selectChange() {
      this.formDataUpdate();
    },
    deleteItem(index) {
      this.info.splice(index, 1);
      this.formDataUpdate();
    },
-->

- 最后 使用 form 数据 发起请求就可以了





### element ui中单元格的合并
> 原生方式合并 表头区域 和 表体区域 单元格的方式
- 该方式我觉得原生的table也可以适用
- 思路
- 每一个td身上都会有rowSpan 和 colSpan 我们通过js控制它们的数值就可以达到合并行 或者 合并列的需求

- 注意：
- 如果是合并列 必须将当前列的下一列的对应td 设置为 display: none
- 如果是行合并 必须将当前行的下一行的对应td 设置为 display: none

- vue中 我们可能会遇到获取不到节点的情况 比如获取到的是一个htmlconlection 从中取不到值
- 这时候我们就需要适用 this.$nextTick 周期函数 在下一轮渲染后执行逻辑

- element table组件的html结构解析
- element table组件里面 表头分为一个表格 表体分为一个表格


> 首先 我们要给 <el-table class="table-wrap"> 上上类名 通过类名选择具体的表格
> 表头区域
- 通过类名为 .el-table__header-wrapper 的 div 包裹了整个表头区域的表格
- 大致的结构
  - div.el-table__header-wrapper
    - table.el-table__header
      - thead
        - tr
          - th

- document.querySelectorAll(".table-wrap .el-table__header")[0]
- 我们可以通过这个类名获取到 头部区域 的表格 因为使用的是All方法所以要[0]

- (".table-wrap .el-table__header")[0].rows
- 我们可以通过这样写 选择到表头区域的所有行
<!--
比如 表头行的格式为
  1:   木 更 津
  2:   名  金额
  那么
  rows[0] 就是 1 那行
  rows[1] 就是 2 那行
-->

- 同时 每一个th 和 td身上都有rowSpan 和 colSpan属性
<!--
  年度    这行的 colspan=1 rowspan=2   代表 列不合并保持1列的状态 但是行合并2行
  木更津  这行的 colspan=2 rowspan=1    代表 列合并2行 行保持1行的状态

  名和金额  都是 colspan=1 rowspan=1
  **注意：**
  我们看到的是 rowspan 和 colspan 但是在js中书写的时候 要写 colSpan 和 rowSpan
-->

- (".table-wrap .el-table__header")[0].rows[0].cells
- 我们这样写能获取到 rows[0] 这行里的所有 th 节点

> 合并思路
- 横向合并列 的思路是 让其中的一个单元格的colSpan属性为2，它的下一格(横向第二列)的display为none
- target[i].colSpan = 2
- target[i + 1].style.cssText = "display: none;"


> 表体区域
- 表体区域也是一个表格
- 大致的结构如下：
  - div.el-table__body-wrapper
    - table.el-table__body
      - tbody
        - tr.el-table__row
          - td.el-tabel__cell
            - div.cell
        
- document.querySelectorAll(".table-wrap .el-table__body")[0].rows
- 可以获取到表体区域所有行的信息
<!--
总结：
   我们能看到的是 每一个td身上都有rowspan 和 colspan 属性 都为1
   单元格1  单元格2
   我尝试了一下 列合并 让单元格1的colspan为2 那么单元格2的display必须为none 才能生效

   单元格1
   单元格2
   我尝试了一下 行合并 让单元格1的rowspan为2 那么下一行对应位置的单元格2的display必须为none 才能生效
-->

> 代码部分：
<!--
    // methods
    merageCell() {
      // 获取表体部分的所有行信息
      let allRows = document.querySelectorAll(".table-wrap .el-table__body")[0].rows

      // 拿到最后两行的信息
      let reciprocalTwo = allRows[allRows.length - 2]
      let reciprocalOne = allRows[allRows.length - 1]
      
      // 在结构重新渲染后执行内部逻辑
      this.$nextTick(() => {
        
        // 将节点转换为数组
        let oneCells = Array.from(reciprocalOne.cells)
        let twoCells = Array.from(reciprocalTwo.cells)

        // twoCells里面的每一项就是item(td) 只要我们有index 那么另一个数据中的index项我们也可以拿到 相当于oneCells[index] == item
        twoCells.forEach((td, index) => {
        
          // 因为td里面还有一个div.cell里面才是具体内容 这里我们判断下
          if(td.children[0].innerHTML == oneCells[index].children[0].innerHTML) {
            td.rowSpan = 2
            oneCells[index].style.display = "none"
          }
        })
      })
    }

  
    // mounted
    mounted() {
      this.merageCell()
    },
-->


> element ui中提供的方法 :span-method
- 1 span-method 的回调是自己调用 实际大概在 mounted生命周期之后
- 2 这个回调中的数据范围是除了表头行之外的范围

> 参数：
- 回调中接收到的参数
- row
- 每一个row是一个对象, 是tabledata中每一行的记录
- 在回调中直接打印row的时候 每一个单元格的row都会打印一遍
- { kita: {no:, amount: }, moku: {}, nedo: {}, year: 27 }

- column
- 每一个column是一个对象, 是每一列的信息
- 在回调中直接打印column的时候 每一个单元格的column都会打印一遍 它有很多的属性

- align
- colSpan
- rowSpan
- label: 是这一列的表头栏显示的名称: 年度
- property: 是 prop 也就是根据这个属性 可以去tabledata中找对应的数据用来显示

> 返回值
- 这个方法的返回值
- [2, 1]   代表合并2行 列不合并
- [0, 0]   代表该行不显示



- 首先 我们要在el-table标签中添加 :span-method="handleMergedCell" 方法
- 然后 在对应的处理函数中做逻辑 该回调的参数是一个对象 里面有4个参数
- function ( { row, column, rowIndex, columnIndex } )
- row:
- 当前行的对象

- column:
- 当前列的对象

- rowIndex
- 当前行号 从0开始

- columnIndex
- 当前列好 从0开始 但是表头行好像不算

- 该函数需要返回一个数组 其中 第一个元素代表 rowspan(合并几行), colspan(合并几列)
- 比如:
- if(rowIndex % 2 == 0)  偶数行
- if(columnIndex == 0)  第一列

- return [1, 2]   合并一行 占两列  reutrn [0, 0] 合并0行 占0列


### 合并表头行
- 貌似官方提到的合并行的列子不包含表头行
- 在element中如果想合并表头行可以需要用到 el-table 身上的 :header-cell-style 回调
- 该回调中也会接收到一个参数对象 {row, column, rowIndex, columnIndex} 
- 该回调需要返回一个样式
- return {dispaly: "none"}

- table自带合并属性 rowSpan 和 colSpan 这个是原生就带的

- 思路：
- 获取所有的表头单元格 针对性的对需要合并的单元格进行操作
- 比如：
- 我们想要合并的是 第2列 和 第3列 那么我们就先要获取到所有的表头 然后将第二列的colSpan设置为2 第三列表头的display设置为display: none
<!--
    methods: {
        setColSpan() {
            获取表头的所有单元格
            let x = document.getElementByClassName("el-table__header")[0].rows[0].cells

            将第二列表头单元格的colSpan设为2
            x[1].colSpan = 2
            x[2].style.display = "none"
        }
    }

    mounted() {
        注意一定要保证dom渲染完成后在进行合并操作 否则会找不到元素
        this.$nextTick(function () { this.setColSpan() }) 
    }



    我在项目中的做法: 对偶数列进行 colSpan 操作 然后对它的下一列进行 display none 操作
    setHeaderCellMerged() {
      let target = document.querySelectorAll(".total-table .el-table__header")[0].rows[0].cells
      for(let i=0; i<target.length; i++) {
        if(i % 2 == 0) {
          target[i].colSpan = 2
          target[i].children[0].style.cssText = "justify-content: center;"
          target[i + 1].style.cssText = "display: none;"
        }
      }
    }

    mounted() {
        this.$nextTick(function () { this.setHeaderCellMerged() }) 
    }
-->

- 实操中的总结点
- 1 我是封装了一个 table 组件 这个组件在很多地方都会被调用 如果我在这个封装的组件里面进行操作 那么其他组件都会在挂载的时候执行这个函数 不好
- 2 所以 我在 table 组件里面在挂载的时候 emit 事件 在销毁的时候解绑事件
- 3 在父组件中 使用@来绑定自定义事件
<!--
  table组件什么逻辑都没有做 就是在页面挂载的时候 发射了一个 事件名
  mounted() {
    this.$emit("setHeaderCellMerged")
  },
  beforeDestroy() {
    this.$off("setHeaderCellMerged")
  },


  父组件在调用table组件的时候 先在table组件上绑定自定义事件 然后在回调中写逻辑 然后在组件挂载的时候处理逻辑
  methods: {
    setHeaderCellMerged() {
      let target = document.querySelectorAll(".total-table .el-table__header")[0].rows[0].cells
      for(let i=0; i<target.length; i++) {
        if(i % 2 == 0) {
          target[i].colSpan = 2
          target[i].children[0].style.cssText = "justify-content: center;"
          target[i + 1].style.cssText = "display: none;"
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setHeaderCellMerged()
    })
  }
-->



### 给table组件中的单元格 统一上样式
- el-table 中 使用 :cell-style="{textAlign: 'center'}"


### Vue中 deep 的使用方式
- 一般在使用scoped后 父组件的样式将不会渗透到子组件中 而我们调用的element组件就相当于在父组件中使用子组件
- 这时候我们想改变element组件的部分样式时 就要在class类名前加上 /deep/ 或者 >>> 或者 ::v-deep
- .(外层class) >>> .(内层class)

- vue在解析样式的时候会在类名的后面加上[vasdf2323]之类的属性 当我们使用 deep 后该属性就会加在外层class上 获取我们修改的样式就会生效
- .(外层class) .(内层class)[data-v-asfda123]
- .(外层class) >>> .(内层class)   ---   .(外层class)[data-v-asfda123]  .(内层class)

<!--
    .table-wrap /deep/ .el-table__header-wrapper .cell {
      padding-left: 0;
    }
-->



### element ui 多列表头设计
1. html结构部分：
    实现多级表头的设计主要方式是在el-table-column中再次嵌套el-table-column来实现的
2. 数据结构

- 表格的源数据
- 案例中是将最下级表头对应的数据都使用prop绑定了tableData中的一个对象
- 因为tableData中每一个对象代表一行数据

- 而我做的案例中 因为每列的数据是重名的 所以才用了下面的数据结构 是想让对应的部分只读chiba 或者 funahashi 里面的数据
<!--
tableData: [
    {
      year: "2000",
      chiba: { no: "1", amound: "98,000" },
      funahashi: { no: "2", amound: "84,000" }
    }
]
-->


- 列的数据源
- 单级别表头的数据源里面使用prop来定义
- 多级别表头的数据源 prop 使用 chiba.no 的方式来定义 chiba是表格data中目标对象，no是表格data中目标对象中的指定属性
<!--
    tableColumns: [
        { prop: "year", label: "年度", minWidth: 100 },
        {
          label: "千葉",
          children: [
            { prop: "chiba.no", label: "名", minWidth: 60 },
            { prop: "chiba.amound", label: "金額", minWidth: 100 },
          ]
        },
    ]
-->


- html 结构部分 和 方法区
<!--
    <el-table
      :data="tableData"
      border
      style="width: 100%">
        
      // 单层表头
      <el-table-column v-for="(item, index) of tableColumns" :key="index" v-bind="item">
        
        // 多级表头
        <el-table-column v-if="item.children" v-for="(i, k) of item.children" :key="k" v-bind="i">
          <template scope="scope">
            {{showInfo(scope.row, i)}}
          </template>

        </el-table-column>
        
        // 这里是正常单层表头的内容区 
        <template v-else-if="item.type == 'link'" scope="scope">
          <nuxt-link :to="linkTo">{{ scope.row[item.prop] }}</nuxt-link>
        </template>

        <template v-else scope="scope">
          {{ scope.row[item.prop]}}
        </template>

      </el-table-column>

    </el-table>


    showInfo(row, i) {
      let address = i.prop.split(".")[0]
      let attr = i.prop.split(".")[1]
      return row[address][attr]
    }
-->






### 上拉加载更多
- 一次性请求所有数据，先加载8个，触底的时候再加载8个

- 1 首先再 created() 里面请求数据 调用函数 请求商品列表
- created() {
  - 这部可能是需要这个keyword请求数据
  - this.keyword = this.$route.query.keyword || ""
  - this.getGoodListFn()
- }


- 2 this.getGoodListFn 是一次性请求商品列表数据的请求
- getGoodsListFn() {
    - GoodsSearchApi({
       - did: this.did
       - type: this.type
       - min: this.min
       - max: this.max
       - keyword: this.keyword
    - }).then(res => {
        - if(res.code == 0) {
            - 将data保存在了goosList中
            - this.goosList = res.data
        - }
    - })
- }


- 3 在html结构的最后 我们可以做提示部分 提示 已经到底了
<div class="loading">
    <span>{{ 某条件成立的时候 ? "正在加载中" : "已经到底了"}}</span>
</div>

样式：
.loading {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    justify-content: center

    .iconfont { margin-right: 100px; animation: loading 1s infi}
}

@keyframes loading {
    from {transform: rotate(0)
    to {transform: rotate(360deg)
}


- 4 某条件 也就是加载状态
- data() {return { loading: true }}
- 这样我们就可以分局 loading 是true 还是false 来决定 3 中显示什么


- 5 我们在 mounted() 中 监听页面的滚动 beforeDestroyed() 取消监听
- 
- 思路：
- document 和 window窗口的关系 文档要比窗口(视口)要长 也就是当文档滚动出去高度 + 窗口的高度 等于 文档的高度的时候 说明已经到底了
    st: 滚动出去的高度
    wh: 窗口的高度
    doch: 文档的高度

- mounted() {
    - window.addEventListener("scroll", this.scrollFn)
- }

- methods: {
    - scrollFn() {
        - 获取窗口高度 winHeight 滚动出去的长度st 文档的长度docHeight 窗口的高度是不变的 st docHeight 是实时变化的 因为一遍加载文档的长度就会加长 所以窗口的高度是写死的 其它两个是会变化的
      
        let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        
        let st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        
        let docHeight = document.documentElement.scrollHeight || document.body.scrollHeight

        触底判断
        if(winHeight + st >= docHeight) {
           触底了 加载后续的内容
        - }
    - }
- }

- beforeDestoryed() {
    - window.removeEventListener("scroll", this.scrollFn)
- }


- 6 我们在步骤2中请求了数据 我们还需要判断请求回来的数据 里有多少项
- getGoodsListFn() {
    
    // 当我们点击别的按钮可能会设计到请求数据这时候要把它们重置为最原始的状态 也就是当我们需要再次的调用getGoodsListFn的时候
    this.loading = true
    obj = {}
    objKey = 0

    - GoodsSearchApi({
        - did: this.did
        - type: this.type
        - min: this.min
        - max: this.max
        - keyword: this.keyword
    - }).then(res => {
        - if(res.code == 0) {
            - 当获取数据成功的时候
            - 判断数组有多少项 // 假设每8项为一次加载的内容（8项一份）
            - if(res.data.length > 8) {
                - 切割数组
                - 切割数组的逻辑在注释里
            - } else {
                - 小于8项 数组不需要拆分 直接赋值 直接显示
                - this.goodsList = res.data
                - loading显示已经到底了
                - this.loading = false
            - }
      - }
    - })
- }

<!--
    切割数组的逻辑
    我们最终想要这样的结构的对象 0为key也就是索引 每8项为一组
    let obj = {
        0: arr[0-7]
        1: arr[8-15]
    }

    基于这种思想：
    我们在export default 上方定义
    
    // 用来存放数组的
    let obj = {}

    // 用来存放数组的对象的key
    let objKey = 0

    接 步骤6 分割数组的部分
    
    遍历请求回来的数组数组，每8项为一份 30 / 8 = 3.75 我们要向上取整
    for(let i=0; i<Math.ceil(res.data.length / 8); i++) {
        /*
            我们要往对象里面 把数组切割的0-7项放入一个对象中 下方是目标
            obj[i] = res.dada.slice(0, 7)
            obj[i] = res.dada.slice(8, 15)
            obj[i] = res.dada.slice(16, 23)

            ---- 规律 8*(i+1) - 1 但是slice方法 不包括最后的索引 所以不用-1

            obj[i] = res.dada.slice(8*0, 8*(i+1))
            obj[i] = res.dada.slice(8*1, 8*(i+1))
            obj[i] = res.dada.slice(8*2, 8*(i+1))
        */

        obj[i] = res.data.slice(8*i, 8*(i+1))
    }
    我们先给 goodsList 8项
    this.goodsList = obj[objKey]
    console.log(obj)
    这样的话 我们就将数据数组 分割成了一个对象， 也就是obj的样式 我们的数据都存在这个对象里面
-->


- 7 在滚动函数 scrollFn 中
- mounted() {
     window.addEventListener("scroll", this.scrollFn)
- }

- methods: {
    scrollFn() {
      let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

      let st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      let docHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        

      我们也要对objKey来进行判断 不能一直加 它会随着每次触底去累加 如果objKey大于等于obj这个对象中的属性的个数 现在obj的属性就是0123 如果到4了就没东西对应了 这时候就应该停止滚动了
      if(objKey >= Object.keys(obj).length - 1) {
         this.loading = false   // 显示已经到底了
         return
      }

      触底判断
      if(winHeight + st >= docHeight) {
      触底了 加载后续的内容 也就是原本数组有8项 现在我们要往里面再继续追加8项 我们往当前这个数组(goodsList)里面 那追加哪8项呢？ 我们在外面定义了objKey = 0 让它为1不就可以了么
     
     objKey++
    
     这里注意我们 obj[objKey]也是一个数组 我们不能直接push进去所以要这样
     // this.goodsList.push(obj[objKey])
     this.goodsList = this.goodsList.concat(obj[objKey])
     // 或者这样行么 this.goodsList.push(...obj[objKey]) 我们这样的追加其实是合并一个新的数组
      
          - }
      - }
  
- }

- beforeDestoryed() {
    - window.removeEventListener("scroll", this.scrollFn)
- }


> 项目中的代码
<!--
    data() {
    return {
      // 这个模拟请求回来的数据
      requestData: [
        {
          27个data
        }
      ],

      // 这个是要传递给组件的表格数据
      tableData2: [],
      
      // 这个是控制 是否加载中 的变量 和 切换请求数组的对象
      loadingInfo: {
        loading: true,
        
        这里需要key索引和对象搭配使用通过索引取对象中的数据数组
        obj: {},
        objKey: 0
      }
    }
  },
    
  在结构挂载的时候 绑定滚动事件
  mounted() {
    window.addEventListener("scroll", this.scrollFn)
  },

  在这个周期中发送请求 将请求回来的数据进行切割 分批次放到obj中 初始化的时候放5个
  created() {
    this.handleTableData()
  },

  在这个周期中销毁滚动的监视
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollFn)
  },


  methods: {
    
    滚动函数
    scrollFn() {
      let windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      let st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let docH = document.documentElement.scrollHeight || document.body.scrollHeight
        
      判断key值如果key值大于obj内部属性的个数 那么就return
      if(this.loadingInfo.objKey >= Object.keys(this.loadingInfo.obj).length - 1) {
        this.loadingInfo.loading = false
        return
      }
        
      触底的判断 在其中让key值自增 然后往里面push接下来的5条
      if(windowH + st >= docH) {
        this.loadingInfo.objKey++
        this.tableData2 = this.tableData2.concat(this.loadingInfo.obj[this.loadingInfo.objKey])
      }
    },

    handleTableData() {
      this.loadingInfo.loading = true
      this.loadingInfo.obj = {}
      this.loadingInfo.objKey = 0
        
      切割数组的逻辑
      if(this.requestData.length > 5) {
        for(let i=0; i<Math.ceil(this.requestData.length / 5); i++) {
          this.loadingInfo.obj[i] = this.requestData.slice(5*i, 5*(i+1))
        }
      } else {
        this.tableData2 = this.requestData
        this.loadingInfo.loading = false
      }
    
      初始化让数据里面先有5条
      this.tableData2 = this.loadingInfo.obj[this.loadingInfo.objKey]
      console.log("tableData2", this.tableData2)
    },
-->

------------------

### 打印功能
打印页面可以调用 window.print() 方法 但是该方法会打印页面上的全部内容

方式1: 利用 标记 打印 标记开始 ～ 标记结束 的内容
1. 在html结构中使用 注释标签 将需要打印的内容 包裹起来
  <!--printstart-->
  <!--printend-->

2. 获取页面的全部内容 let allContent = document.body.innerHTML

3. 提取我们想打印的指定内容 分别对 allContent 使用字符串 substr 和 substring 方法
   要点：
   substr：是从标记位开始截取页面整体内容
   substring：是对截取内容的进一步截取，截取到标记位结束 因为是substring所以并不包含该标记

4. 将截取的内容赋值给body
5. window.print()

6. 打印完之后要将原来页面内容还原 并重新加载页面
<h1>我是打印的测试页面</h1>
<h3>副标题内容</h3> <br>

<button>print</button>

<!--printstart-->
<div class="content-wrap">
    <h3>员工的详细信息</h3>
    <div>
        <p>
            床前明月光，
            疑似地上霜。
            举头望明月，
            低头思故乡。
        </p>
    </div>
</div>
<!--printend-->

<h3>我是结尾内容</h3>

let btn = document.querySelector('button')
btn.addEventListener("click", startPrint)
function startPrint() {
  let allContent = document.body.innerHTML
  let printStart = "<!--printstart-->"
  let printEnd = "<!--printend-->"
  let printContent = ""
  printContent = allContent.substr(allContent.indexOf(printStart)+printStart.length)
  printContent = printContent.substring(0, printContent.indexOf(printEnd))
  document.body.innerHTML = printContent
  window.print()

  window.document.body.innerHTML=allContent;
  window.location.reload();
}


方式2: 利用 媒体查询
1. 在不想打印的内容上 添加 .noprint 的类
.noprint {display: none;}

2. 新建媒体查询功能
@media print {
  .noprint{
     display: none;
   }
}

分页打印
使用 window.print() 打印时，如果内容超出会自动分页。
但是我们如果需要自定义分页范围，如碰到表格分页打印，可以通过进行如下设置：
<table width="100%" border="0" cellpadding="0" cellspacing="0" style="page-break-after:always" >
</table>


Vue里打印使用插件的方式
npm install vue-print-nb --save

import Vue from "vue"
import Print from "vue-print-nb"

然后给要打印的区域 设置id包裹div
<div id="print-area">

然后在打印标签上填写 v-print="'#print-area'"
<el-button v-print="'#print-area'">ラベル印刷</el-button>




### 下载功能
- 下载功能：
- 如果我们直接通过a标签来指定链接的方式 那么它会直接跳转到该链接

- 当然我们也可以在 a标签中 设置 download属性（dawnload属性值用来指定文件名）来进行下载 但是有要求

  当处于跨域的情况下是不能下载的 只会进行跳转
  当处于同源的情况下是可以下载的

- 那跨域的情况下怎么处理？
- 思路：
- 我们可以通过js将图片的数据获取下来 然后通过a标签的方式下载下来
- 这里我们通过ajax去请求图片的地址 并将设置解析响应体的方式为blob 然后将响应结果通过 URL.craeteObjURL 转成url对象

- Blob的应用场景：
- Bolb对象 一般用来做分片上传 下载数据 转URL 转base64 图片压缩 PDF
<!--
  function download(url) {
        const xhr = new XMLHttpRequest()
        xhr.open("get", url)
        xhr.responseType = "blob"
        xhr.send()
        xhr.onload = function() {
            const fileBlob = xhr.response
            let imgUrl = URL.createObjectURL(fileBlob)

            let a = document.createElement("a")
            a.href = imgUrl
            a.download = "testImg"
            a.innerHTML = "hello"
            document.querySelector("body").appendChild(a)
        }
    }
    let url = "https://img1.baidu.com/it/u=2648389307,756086504&fm=26&fmt=auto"
    download(url)





    let url = "https://scontent.cdninstagram.com/v/t50.2886-16/272191393_2442582522551257_2916888858297340776_n.mp4?_nc_ht=instagram.fkix2-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=4HZwga3zYfgAX91Z2qM&edm=AABBvjUBAAAA&ccb=7-4&oe=6261DA3E&oh=00_AT9f7zzwZIsD_VoDmSYvcZVHTNuFVYP60-CciyIxG7O_gA&_nc_sid=83d603"
    let btn = document.querySelector("button")

    btn.addEventListener("click", download)

    function download() {

      const xhr = new XMLHttpRequest()
      xhr.open("get", url)
      xhr.responseType = "blob"

      xhr.onload = function() {
        console.log("xhr.response", xhr.response)

        let source = URL.createObjectURL(xhr.response)
        console.log("source", source)
        let a = document.createElement("a")
        a.href = source
        a.download = "testName"
        a.innerHTML = "测试"
        a.click()
      }

      xhr.send()
    }
-->


### element ui中表格的使用
> 1, 定义表格数据
- 要点:
- 在 table组件标签中使用 :data="" 给表格组件绑定数据源
- 表格数据源的类型是一个对象数组 其中每一个对象就是一行数据 属性名相当于 字段名
<!--
    tableData: [
        {
          username: "aaaaaa",
          entrust: "未読",
          date: "2021年7月8日",
          point: "●●●が●●●を●●に変更",
        },
        {
          username: "bbbbbb",
          entrust: "未読",
          date: "2021年7月8日",
          point: "●●●が●●●を●●に変更",
        },
    ]
-->

- 排序示例：
- 在表格组件标签里
<!--
   :default-sort="
        default_sort
        ? default_sort
        : { prop: 'id', order: 'descending' }
    "
-->


> 2, 定义表列数据
- 要点：
- 表列数据源的类型是一个对象数组 其中每一个对象就是该列的展示配置
- prop: 用来展示数据指向表格数据中的一个字段
- label: 用来显示列名
- minWidth
- sortTable
- 要点：在对象定义的所有属性 要通过 在 tabal-column 组件标签里面 使用 v-bind 绑定 这个列的配置对象 这样在这里的所有属性都会贴在 table-column 组件标签里
<!--
    tableColumns: [
        {
          prop: "id",
          label: "ID",
          minWidth: 50,
          sortable: true,
        },
    ]
-->


> 如果一套数据想在表格中以不同的形态展示出来
- 在 table-column 组件中 插入 template 标签感觉这是作用域插槽 而scope 可能是表格的数据
<!--
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

    info() {
      return (row, prop) => {
        return row[prop];
      };
    },
-->

------------------

### Vue中使用element ui的upload组件 
- 这里我们总结下使用 upload 组件上传下载excel
- 我们点击excel文档后上传解析 将解析后的数据展示 并上传到服务器

> table组件的属性
- action：
- show-file-list：  显示上传文件的列表
- auto-upload：设置为false
- http-request：覆盖默认的上传行为 定义我们自己的上传行为 因为如果是大文件的话 我们要对它进行切片管理和断点续传 在服务器进行合并 如果跨域的话 需要客服端和服务器一起解决这个事情
- accept: 指定上传文件的类型 如：accept: ".xlsx, .xls"
- on-change: 文件状态改变的时候的回调 添加文件 上传成功和上传失败的时候都会被调用 function(file, fileList)  这里是为了拿到文件
             在这里怎么拿到上传的文件？在选择完文件后会触发这个回调的执行，回调中有参数是事件对象 它打印出来如下
  
  // 这是on-change回调中 element自带的参数对象
  name: "test.xls"    // 文件名
  percentage: 100     // 上传的记录
  raw: File           // 上传的文件
  response: "<!doctype html>\n<html>\n  <head>\n    <!-- Anti-flicker snippet (recommended)  -->\n    <style>.async-hide{opacity:0!important}</style>\n    <script>!function(e,n,t,a,c,s,d,i,m){n.className+=\" \"+t,s.start=1*new Date,s.end=d=function(){n.className=n.className.replace(RegExp(\" ?\"+t),\"\")},(e[a]=e[a]||[]).hide=s,setTimeout((function(){d(),s.end=null}),4e3),s.timeout=4e3}(window,document.documentElement,\"async-hide\",\"dataLayer\",0,{\"GTM-K9BGS8K\":!0})</script>\n    <!-- Analytics-Optimize Snippet -->\n    <script>!function(e,a,t,n,g,o,c){e.GoogleAnalyticsObject=g,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,o=a.createElement(t),c=a.getElementsByTagName(t)[0],o.async=1,o.src=\"https://www.google-analytics.com/analytics.js\",c.parentNode.insertBefore(o,c)}(window,document,\"script\",0,\"ga\"),ga(\"create\",\"UA-46172202-22\",\"auto\",{allowLinker:!0}),ga(\"set\",\"anonymizeIp\",!0),ga(\"require\",\"GTM-K9BGS8K\"),ga(\"require\",\"displayfeatures\"),ga(\"require\",\"linker\"),ga(\"linker:autoLink\",[\"2checkout.com\",\"avangate.com\"])</script>\n    <!-- end Analytics-Optimize Snippet -->\n    <!-- Google Tag Manager -->\n    <script>!function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({\"gtm.start\":(new Date).getTime(),event:\"gtm.js\"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src=\"https://www.googletagmanager.com/gtm.js?id=GTM-NKDMSK6\",m.parentNode.insertBefore(r,m)}(window,document,\"script\",\"dataLayer\")</script>\n    <!-- End Google Tag Manager -->\n    <title>Casting Voice Online Dashboard</title><meta data-n-head=\"1\" charset=\"utf-8\"><meta data-n-head=\"1\" name=\"keywords\" content=\"Dashboard\"><meta data-n-head=\"1\" name=\"description\" content=\"Dashboard\"><meta data-n-head=\"1\" itemprop=\"name\" content=\"\"><meta data-n-head=\"1\" itemprop=\"description\" content=\"\"><meta data-n-head=\"1\" itemprop=\"image\" content=\"\"><meta data-n-head=\"1\" name=\"twitter:card\" content=\"\"><meta data-n-head=\"1\" name=\"twitter:site\" content=\"\"><meta data-n-head=\"1\" name=\"twitter:title\" content=\"\"><meta data-n-head=\"1\" name=\"twitter:description\" content=\"\"><meta data-n-head=\"1\" name=\"twitter:creator\" content=\"\"><meta data-n-head=\"1\" name=\"twitter:image\" content=\"\"><meta data-n-head=\"1\" property=\"fb:app_id\" content=\"\"><meta data-n-head=\"1\" property=\"og:title\" content=\"\"><meta data-n-head=\"1\" property=\"og:type\" content=\"\"><meta data-n-head=\"1\" property=\"og:url\" content=\"\"><meta data-n-head=\"1\" property=\"og:image\" content=\"\"><meta data-n-head=\"1\" property=\"og:description\" content=\"\"><meta data-n-head=\"1\" property=\"og:site_name\" content=\"\"><meta data-n-head=\"1\" data-hid=\"mobile-web-app-capable\" name=\"mobile-web-app-capable\" content=\"yes\"><meta data-n-head=\"1\" data-hid=\"apple-mobile-web-app-title\" name=\"apple-mobile-web-app-title\" content=\"Casting Voice Online Admin Dashboard\"><meta data-n-head=\"1\" data-hid=\"og:site_name\" name=\"og:site_name\" property=\"og:site_name\" content=\"Casting Voice Online Admin Dashboard\"><link data-n-head=\"1\" rel=\"icon\" type=\"image/x-icon\" href=\"/img/favicon.ico\"><link data-n-head=\"1\" rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700\"><link data-n-head=\"1\" rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.6.3/css/all.css\" integrity=\"sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/\" crossorigin=\"anonymous\"><link data-n-head=\"1\" rel=\"manifest\" href=\"/_nuxt/manifest.01830dea.json\" data-hid=\"manifest\"><base href=\"/\"><link rel=\"preload\" href=\"/_nuxt/runtime.js\" as=\"script\"><link rel=\"preload\" href=\"/_nuxt/commons/app.js\" as=\"script\"><link rel=\"preload\" href=\"/_nuxt/vendors/app.css\" as=\"style\"><link rel=\"preload\" href=\"/_nuxt/vendors/app.js\" as=\"script\"><link rel=\"preload\" href=\"/_nuxt/app.css\" as=\"style\"><link rel=\"preload\" href=\"/_nuxt/app.js\" as=\"script\">\n  <link href=\"/_nuxt/vendors/app.css\" rel=\"stylesheet\"><link href=\"/_nuxt/app.css\" rel=\"stylesheet\"></head>\n  <body class=\"g-sidenav-show g-sidenav-pinned\">\n    <!-- Google Tag Manager (noscript) -->\n    <noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=GTM-NKDMSK6\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>\n    <!-- End Google Tag Manager (noscript) -->\n    <div id=\"__nuxt\"><style>#nuxt-loading {  background: white;  visibility: hidden;  opacity: 0;  position: absolute;  left: 0;  right: 0;  top: 0;  bottom: 0;  display: flex;  justify-content: center;  align-items: center;  flex-direction: column;  animation: nuxtLoadingIn 10s ease;  -webkit-animation: nuxtLoadingIn 10s ease;  animation-fill-mode: forwards;  overflow: hidden;}@keyframes nuxtLoadingIn {  0% {visibility: hidden;opacity: 0;  }  20% {visibility: visible;opacity: 0;  }  100% {visibility: visible;opacity: 1;  }}@-webkit-keyframes nuxtLoadingIn {  0% {visibility: hidden;opacity: 0;  }  20% {visibility: visible;opacity: 0;  }  100% {visibility: visible;opacity: 1;  }}#nuxt-loading>div,#nuxt-loading>div:after {  border-radius: 50%;  width: 5rem;  height: 5rem;}#nuxt-loading>div {  font-size: 10px;  position: relative;  text-indent: -9999em;  border: .5rem solid #F5F5F5;  border-left: .5rem solid blue;  -webkit-transform: translateZ(0);  -ms-transform: translateZ(0);  transform: translateZ(0);  -webkit-animation: nuxtLoading 1.1s infinite linear;  animation: nuxtLoading 1.1s infinite linear;}#nuxt-loading.error>div {  border-left: .5rem solid #ff4500;  animation-duration: 5s;}@-webkit-keyframes nuxtLoading {  0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);  }  100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);  }}@keyframes nuxtLoading {  0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);  }  100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);  }}</style><script>window.addEventListener('error', function () {  var e = document.getElementById('nuxt-loading');  if (e) {e.className += ' error';  }});</script><div id=\"nuxt-loading\" aria-live=\"polite\" role=\"status\"><div>Loading...</div></div><!-- https://projects.lukehaas.me/css-loaders --></div><script>window.__NUXT__={config:{_app:{basePath:\"\\u002F\",assetsPath:\"\\u002F_nuxt\\u002F\",cdnURL:null}}}</script>\n  <script src=\"/_nuxt/runtime.js\"></script><script src=\"/_nuxt/commons/app.js\"></script><script src=\"/_nuxt/vendors/app.js\"></script><script src=\"/_nuxt/app.js\"></script></body>\n</html>\n"
  size: 671852
  status: "success"   // 状态
  uid: 1633051195904

- 思路：
- 1，既然我们能够在 on-change 的回调中拿到 文件对象 那么 我们就可以读取 文件对象中的内容
- 因为读取文件是异步的操作 我们想等读完文件后 再返回结果 我们就可以借助 promise 将读取文件的逻辑放入到promise对象中

- 2，我们可以通过 new FileReader() 这个类读取文件 它支持各种读取文件的方式
- 下面是当前文件以2进制的方式读取 还可以按照bas64的方式读取 
- 一般我们想把文件通过断点续传的方式处理的话 会选择base64 
- 如果想在本地进行解析处理我们会选择二进制的方式
- 其中reader对象有onload事件 回调中的参数e里有读取后的结果 e.target.result 当读取成功后我们将成功的结果通过resolve返回

- 3，我们拿到二进制数据之后要进行解析 解析成我们想要的json格式的数据 我们需要下载 xlsx
- npm i xlsx
- let workBook = xlsx.read(data, { type: "binary" });
- xlxs身上的read方法可以读取文件 第一个参数为 我们通过reader读取的数据，第二个参数为配置对象 我们设置类型为二进制数据
<!--
    readFile(file) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        // 我们可以通过这个类 将文件已各种形式读取出来 
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
      console.log(workBook);

      // 输入workBook后的样子
Custprops: {WorkbookGuid: '3f1215b6-4822-4689-8302-1ac6c5396d8c'}
Deps: {}
Directory: {workbooks: Array(1), sheets: Array(2), charts: Array(0), dialogs: Array(0), macros: Array(0), …}
Props: {LastAuthor: 'bs_taku', LastPrinted: '2014-09-08T07:57:11Z', Author: '栗田', Title: '請求書（原稿）', CreatedDate: Tue Aug 04 1998 15:04:33 GMT+0900 (日本標準時), …}
SSF: {0: 'General', 1: '0', 2: '0.00', 3: '#,##0', 4: '#,##0.00', 6: '"¥"#,##0;[Red]"¥"\-#,##0', 8: '"¥"#,##0.00;[Red]"¥"\-#,##0.00', 9: '0%', 10: '0.00%', 11: '0.00E+00', 12: '# ?/?', 13: '# ??/??', 14: 'm/d/yy', 15: 'd-mmm-yy', 16: 'd-mmm', 17: 'mmm-yy', 18: 'h:mm AM/PM', 19: 'h:mm:ss AM/PM', 20: 'h:mm', 21: 'h:mm:ss', 22: 'm/d/yy h:mm', 37: '#,##0 ;(#,##0)', 38: '#,##0 ;[Red](#,##0)', 39: '#,##0.00;(#,##0.00)', 40: '#,##0.00;[Red](#,##0.00)', 43: '_ * #,##0.00_ ;_ * \-#,##0.00_ ;_ * "-"??_ ;_ @_ ', 45: 'mm:ss', 46: '[h]:mm:ss', 47: 'mmss.0', 48: '##0.0E+0', 49: '@', 56: '"上午/下午 "hh"時"mm"分"ss"秒 "', 176: '#,##0;\-#,##0;"-"', 177: '#,##0\-;"▲"#,##0\-', 178: '"$"0,000', 179: '"¥"#,##0;\-"¥"#,##0', 180: '"¥"#,##0;[Red]\-"¥"#,##0', 181: '0.0%', 182: '#,##0.0_);\(#,##0.0\)', 183: 'yy/mm', 184: '"$"#,##0_);\("$"#,##0\)', 185: '"$"#,##0.00_);\("$"#,##0.00\)', 186: '0%;\(0%\)', 187: 'aaa', 188: 'm/d', 189: 'h:mm;@', 190: '[h]:mm'}
SheetNames: (2) ['作業実績報告書', '【説明】作業実績報告書(ｻﾝﾌﾟﾙ)']
Sheets: {作業実績報告書: {…}, 【説明】作業実績報告書(ｻﾝﾌﾟﾙ): {…}}
Strings: (29) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, Count: '60', Unique: '28']
Styles: {NumberFmt: Array(191), Fonts: Array(75), Fills: Array(28), Borders: Array(48), CellXf: Array(72)}
Themes: {}
Workbook: {AppVersion: {…}, WBProps: {…}, WBView: Array(1), Sheets: Array(2), CalcPr: {…}, …}
[[Prototype]]: Object
    },
-->

- 上面我们通过 xlsx.read方法读取了我们上传的excel二进制文件 里面有很多的信息 我们主要使用哪些 或者关注哪些信息呢？
- SheetNames：
- 它的类型是一个数组 里面每一个对象代表 一个 sheet 的名字

- Sheets：
- 它的类型是一个对象 里面的k是sheet的名字 v是该sheet里面的数据 v也是一个对象
- 展开v对象后：
- !ref：
- 表示我们的数据从哪个单元格开始到哪个单元格结束 A1:B61

- !margins:
- 这个sheet的位置的信息

- !merges
- 它的类型是一个数组 标签当前表格里面有哪些列是进行合并的 如果涉及到合并列的话处理起来就更加的复杂了

- A1 每一个单元格都是一个对象 其中里面有
- v： 就是单元格中的内容
- t： 内容的类型 s 就是字符串 n 就是数字


- 我们拿到了这样的对象 我们想把这样的数据形式变成我们熟悉的json的格式 需要怎么做？
- 我们可以通过在sheetname中拿到一个sheet的名字 通过这个名字去sheets中找到它对应的数据 这是自己处理的思路
- 我们也可以通过xlsx中提供的方法来处理
<!--
    // workBook是整个的excel文件 里面有很多的属性 比如 sheetnames 就是每一个sheet的名字 sheets就是所有sheet的数据
    // 拿到第一个sheet的名字去sheets数据里面找对应的数据
    let workSheet = workBook.Sheets[workBook.SheetNames[0]];

    // xlsx中提供了很多转换数据的方法 我们可以直接调用拿到我们想要的数据格式
    data = xlsx.utils.sheet_to_json(workSheet);
    
    // 比如我们表格是
    姓名      电话
    劉春杉     18698712060

    // 那我们拿到的数据格式就是 数组对象 其中每一个对象就是每一行的信息
    {姓名："劉春杉"，电话：18698712060}
    console.log(data);
-->

- 但是有一个问题 我们不能将【姓名】这个字段 就这么以汉字的形式传到服务器 我们要将姓名变成name 把电话变成phone
- 把读取出来的数据变为最后可以传递给服务器的数据（汉字 姓名 - name）

- 解决方式1:
- 老师为了解决这个问题 首先设置了一个变量 name phone就是字段名 表明了文本和该字段的类型 类型的作用是当前字段最终以什么样的类型做展示
<!--
    let char = {
        name: {
            text: "姓名",
            type: "string"
        },
        phone: {
            text: "电话",
            type: "string"  传递给服务器的时候应该是已字符串的形式 所以我们指定了该字段的类型
        }
    }
-->

- 思路：
- 我们需要处理下 xlsx转换过来的数据 因为里面的字段是汉字 
- 所以我们要遍历这个数据 将汉字的字段 修改为 英文的字段 方便我们在服务器中存储
- 1 首先定义一个空数组 用来装 修改后的数据
- 2 遍历通过xlsx方式转换过来的json格式的数据data
- 3 定义一个空对象 该对象用来装修改后的格式 最后会将该对象装进数组中
- 4 遍历我们定义的字段变量 内部做这样的处理
  - 1 我们取出字段变量的值 因为字段变量的值是一个对象 里面有text 和 type
  - 2 我们拿着 text 其实也就是 姓名 拿着这个值去数据源里找对应的值
  - 3 根据类型对数据进行处理 是转为字符串格式还是数字格式
  - 4 往空对象中添加属性名 和 属性值 key就是我们定义的英文字段 v就是我们处理后的内容
```js
  let arr = [];
  data.forEach((item) => {
    // 我们每循环一次要往arr中添加一个新对象 我们这里应该有每一行的字段和对应的数据 那么这个对象中要有多少个字段 我们取决于我们自己定义的字段变量 sheetField
    let o = {};
    for (let key in this.sheetField) {
      if (!this.sheetField.hasOwnProperty(key)) break;
      // 因为我们定义的字段变量key的值是一个对象，然后我们分别取出文本 和 类型
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


- 那解析excel到底是前端来做还是后端来做？
- 我们可以把选择的excel直接传给服务器 前端连解析都不用 但是后台解析肯定会占后台的资源的

- 怎么展示数据到表格中
- 刚开始的时候 我们页面当中 不展示表格 当我们把数据解析后 这个表格才展示 将解析后的数据呈现出来
- 我们表格的数据是根据 :data = "tableData" 来展示的 我们将我们处理好的数据给 tableData 就可以了



- table中的loading
- import {Loading} from "element-ui"

- 我们可以在 解析数据前 使用该 Loading
<!--
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
-->

- 那loading本身是异步的 但是就是想让这个异步的操作在前面来展示怎么办？
- 提示完loading之后我们在解析数据
- 老师这里用的是异步延迟 在a b之间使用这个方法做这个事 只有到达时间我们才返回一个成功的状态

> delay函数
<!--
    function delay(interval = 0) {
        return new Promise(resolve => {

            let timer = setTimeout(_ => {
                clearTimeout(timer);
                resolve()
            }, interval)
        })
    }
-->
<!--
     async handleChange(e) {
      let file = e.raw;
      if (!file) return;

      this.show = false
      let loadingIntance = Loading.service({
          text: "小主请您稍等片刻 奴家正在玩命处理当中",
          background: "rgba(0,0,0,.5)"
      })
      
      因为await本身也是异步的 如果他不返回成功状态下面的走不了 所以这里多等待了100ms 也就是说我们先让loading出来 100ms后解析数据 然后将数据展示在页面当中 然后关闭loading
      await delay(100)
     
      let data = await readFile(file)

      .......


      为了防止页面解析太快 我们再等待100ms
      await delay(100)
      this.show = true
      this.tableData = arr
      loadingIntance.close()
-->

------------------

> 将json数据上传至服务器的逻辑
- 要看看我们的后台是怎么支持的 如果是我们将60条数据 全部上传 后台将60条数据 全部放到数据库
- 这种情况不需要我们做什么 我们直接将数据上传就可以
- 如果后台不支持批量存储 比如 你就要一条条的告诉给我 告诉我一条 我存一条 那么也需要前端一条条的传给后台 

- 一条条传的时候 前端的做法：
- 我们在提交逻辑的回调中 做以下的处理 我们每调用一次send就是将tableData中的一条数据传递给服务器
<!--
    记录已经给服务器多少条数据了     
    let n = 0
    let send = async () => {
        let body = this.tableData[n]
        let res = await this.$axios({url data: body})

        // 比如code为0成功 1为失败
        if(res.data.code === 0) { }

        // 不管成功还是失败都开始下一条请求 递归
        send()
    }
    send()
-->

- 假如有上传成功的数据 也有上传失败的数据那怎么处理？
- 我们可以定义两个数据 成功的存在一个里面 失败的不存 这样我们可以拿着成功的数组和原始数组进行对比
- 看看哪些失败了
<!--
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
-->

------------------

> 将数据导出为excel文件
> 获取数据的逻辑
- 点击搜索按钮后 就是从服务器获取数据 比如我们根据什么发送get请求 然后获取数据
<!--
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
-->

------------------

> 分页处理
<!--
sizeChange(val) {
this.pageSize = val
this.page = 1
this.queryData()
}
-->

------------------

> 上一页 下一页的罗
<!--
prevNext(val) {
  this.page = val
  this.queryData()
}
-->

------------------

> 将选中的数据进行导出
- 利用到了 table组件中的 selection-change 标签属性 该回调在复选框发生变化的时候会触发
- 在这个回调中我们能拿到所有选中的数据 我们可以将选中的数据给data配置项里面的变量
- selectionChange(val) {this.sList = val}

- 我们有了选中的数据后 当点击导出按钮的时候 进行 事件回调 提交
<!--
submit() {
看看有没有选中数据 如果没有 我们就return
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
这里是最终要导出的excel格式
编号：item.id
姓名：item.name
电话：item.phone
}
})

把json数据变成sheet数据
let sheet = xslx.utiles.json_to_sheet(arr)

新建表格
let book = xslx.utils.book_new()

将sheet插入表格中
xslx.utils.book_append_sheet(book, sheet, "sheet1")

将整个文件写入真实文件中
xslx.writeFile(book, `user${new Date().getTime()}.xls`)

loadingIntance.close()
this.disabled = false
}
-->

https://www.bilibili.com/video/BV1HD4y1R7jY?p=3&spm_id_from=pageDriver

------------------

> 完整代码
<!--
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
          // 因为我们定义的字段变量key的值是一个对象，然后我们分别取出文本 和 类型
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
-->

------------------

> 导入导出excel文件的代码部分
<!--
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

-->

> 总结：
- 首先 定义了一个 readFile的方法 里面封装了 promise 因为读取文件是一个异步的
- 其次 在select-change回调中 先利用 readFile读取二进制数据 然后利用xlsx模块根据二进制数据生成excel文件
- 其次 通过xlsx中的方法 找到sheet1 然后将其转换为json 
- 然后 需要修改json数据中的字段 由汉字改为英文 在这个逻辑的最后 将最新数据交给table数据源

------------------

### Vue中的事件委托
- 还是通过 event 事件对象来处理
<!--
    handleClick(e) {
      if (e.target.nodeName.toLowerCase() === 'li') {
        const index = parseInt(e.target.dataset.index)
        this.doSomething(index)
      }
    },
-->

------------------

### Raw 参数类型
- 场景：
- 在使用postman去测试post类型接口的时候发现 携带数据方式params 和 body
- 但是需要传递的参数类型除了见过的 还有一个 raw：
- form-data
- x-www-form-urlencoded
- raw
- binary
- graphql

- 这里主要总结一下，raw类型

> raw：
- 这种方式也可以成为json提交, 可能每种参数类型对应的 contentType类型是不一样的
- 使用的是纯字符串上传的方式 所以在post之前可能需要将json格式的数据转换为字符串
<!-- 
    contentType: "application/json"
    data: JSON.stringify({
        org,
        msg
    })


    而 form-data 的方式就是 key-value 的提交，数据其实是分割的
-->

- 比如 我选择了 raw 
- 后面的类型选择text 那么请求头中的 Content-Type: text/plain
- 后面的类型选择json 那么请求头中的 Content-Type: application/json

------------------

### Content-Type 类型
- 在服务器默认发送的数据 其实都是utf-8的编码内容
- 浏览器在补知道服务器内容的情况下 会按照当前操作系统的默认编码去解析

- 比如中文操作系统默认的旧是gbk
- 解决办法
- 正确的告诉浏览器 服务器相应的内容是什么编码的

- 在http协议中 content-type就是用来告知浏览器 相应的数据类型是什么


- 它的类型主要有4种 也是常见的4种post请求方式


> 设置 contentType 的方式
- "Content-Type" : "application/json"
- 用于定义用户的浏览器或相关设备如何显示将要加载的数据，或者如何处理将要加载的数据，此属性的值可以查看 MIME 类型。

- MIME:
- 是描述消息内容类型的因特网标准。MIME 消息能包含文本、图像、音频、视频以及其他应用程序专用的数据。

- content-type 一般以下面的形式出现：
- Content-Type: [type]/[subtype];parameter

> type 有下面的形式：
- Text：
- 用于标准化地表示的文本信息，文本消息可以是多种字符集和或者多种格式的；
- 
- Multipart:
- 用于连接消息体的多个部分构成一个消息，这些部分可以是不同类型的数据；

- Application
- 用于传输应用程序数据或者二进制数据；

- Message:
- 用于包装一个E-mail消息；

- Image:
- 用于传输静态图片数据；

- Audio
- 用于传输音频或者音声数据；

- Video
- 用于传输动态影像数据，可以是与音频编辑在一起的视频数据格式。


> subtype
- 用于指定 type的详细形式。“type/subtype”配对的集合和与此相关的参数。下面是最经常用到的一些 MIME 类型：
- text/html（HTML 文档）；
  text/plain（纯文本）；
  text/css（CSS 样式表）；
  image/gif（GIF 图像）；
  image/jpeg（JPG 图像）；
  application/x-javascript（JavaScript 脚本）；
  application/x-shockwave-flash（Flash）；
  application/x- www-form-urlencoded（使用 HTTP 的 POST方法提交的表单）；
  multipart/form-data（同上，但主要用于表单提交时伴随文件上传的场合）。


> 各个文件类型 所对应的 contentType 应该是什么
- .doc    application/msword
  .docx   application/vnd.openxmlformats-officedocument.wordprocessingml.document
  .rtf    application/rtf
  .xls    application/vnd.ms-excel application/x-excel
  .xlsx   application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  .ppt    application/vnd.ms-powerpoint
  .pptx   application/vnd.openxmlformats-officedocument.presentationml.presentation
  .pps    application/vnd.ms-powerpoint
  .ppsx   application/vnd.openxmlformats-officedocument.presentationml.slideshow
  .pdf    application/pdf
  .swf    application/x-shockwave-flash
  .dll    application/x-msdownload
  .exe    application/octet-stream
  .msi    application/octet-stream
  .chm    application/octet-stream
  .cab    application/octet-stream
  .ocx    application/octet-stream
  .rar    application/octet-stream
  .tar    application/x-tar
  .tgz    application/x-compressed
  .zip    application/x-zip-compressed
  .z      application/x-compress
  .wav    audio/wav
  .wma    audio/x-ms-wma
  .wmv    video/x-ms-wmv
  .mp3 .mp2 .mpe .mpeg .mpg     audio/mpeg
  .rm     application/vnd.rn-realmedia
  .mid .midi .rmi               audio/mid
  .bmp    image/bmp
  .gif    image/gif
  .png    image/png
  .tif .tiff                    image/tiff
  .jpe .jpeg .jpg               image/jpeg
  .txt    text/plain
  .xml    text/xml
  .html   text/html
  .css    text/css
  .js     text/javascript
  .mht .mhtml   message/rfc822


> 解析：
- http协议是以 ascii码 传输 建立在tcp/ip协议之上的应用层规范 这个规范把http请求分为3个部分
- 状态行
- 请求头
- 消息主体

- 协议规定post提交的数据必须放在消息主体（entity-body）中 但是协议并没有规定数据必须使用什么形式进行编码 所以 开发者完全可以自己决定消息主体的格式
- 最后发送的http请求满足上面的格式就可以

- 数据发送出去 还要服务端进行解析并成功后才有意义，服务端通常是根据请求头（headers）中的Content-Type字段来获知请求中的消息主体是用何种方式进行的编码 再对主体进行解析
<!-- 
    一般服务端语言如 php、python 等 都内置了自动解析常见数据格式的功能
-->

> 为什么一般是给post请求设置content-type,get请求不需要设置吗？
- content-type 是用来指定消息体的格式的
- get请求一般没有消息体 故，get 请求一般不用设置 content-type。

- 一个 HTTP 报文通常报告两个部分：头部(head)和主体(body)，其中 body 可以为空，常见的 GET 请求就是这种情况。但当 body 不为空时，接收的一端需要知道它是什么类型的数据，采用什么编码，这时候就需要在 Content-Type 来指明 body 的人MIME 类型。是否需要指定 Content-Type 和 HTTP 方法没有多大关系，而和报文主体是否存在有关。GET 请求一般（标准）不包含主体，加 Content-Type 是没有意义的。




> enctype属性
- 规定在发送到服务器之前应该如何对表单数据进行编码，默认的表单数据会编码为 "application/x-www-form-urlencoded"
- enctype的属性值有

1. application/x-www-form-urlencoded
   在发送前编码所有的字符
   这应该是最常见的 POST 提交数据的方式了。浏览器的原生
   表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。
<!--
    Content-Type: application/x-www-form-urlencoded;charset=utf-8
    title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3

    提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。
   大部分服务端语言都对这种方式很好的支持，常用的如jQuery中的ajax请求，Content-Type 默认值都是「application/x-www-form-urlencoded;charset=utf-8
-->

2. multipart/form-data
   不对字符编码 在使用包含文件上传控件的表单时 必须使用该值
   这也是常见的post请求方式，一般用来上传文件，各大服务器的支持也比较好。所以我们使用表单 上传文件 时，必须让
<!--
    表单的enctype属性值为 multipart/form-data.
    注意：以上两种方式：application/x-www-form-urlencoded和multipart/form-data都是浏览器原生支持的。
-->


3. application/json    ---   它可能对应的就是 raw
   application/json作为响应头并不陌生，实际上，现在很多时候也把它作为请求头，
   用来告诉服务端消息主体是序列化的JSON字符串，
   除了低版本的IE，基本都支持。除了低版本的IE都支持JSON.stringify()的方法，服务端也有处理JSON的函数，使用json不会有任何麻烦。

   
4. text/plain
   空格转换为"+"加号，但不对特殊字符编码


> postman中 post请求 的form-data、x-www-form-urlencoded、raw、binary的区别
> form-data:
- 等价于http请求中的multipart/form-data,它会将表单的数据处理为一条消息，以标签为单元，用分隔符分开。
- 既可以上传键值对，也可以上传文件。
- 当上传的字段是文件时，会有Content-Type来表名文件类型；content-disposition，用来说明字段的一些信息
- 由于有boundary隔离，所以multipart/form-data既可以上传文件，也可以上传键值对，它采用了键值对的方式，所以可以上传多个文件。


> x-www-form-urlencoded:
- 等价于application/x-www-from-urlencoded,会将表单内的数据转换为键值对，比如,name=java&age = 23


> raw
- 可以上传任意格式的文本，可以上传text、json、xml、html等


> binary
- 相当于Content-Type:application/octet-stream,
- 从字面意思得知，只可以上传二进制数据，通常用来上传文件，由于没有键值，所以，一次只能上传一个文件。

------------------

### 项目中总结的相关知识点

------------------

### 网道中总结的相关知识点

### 浏览器模型概述
> <script type>
- type属性：
- 它用来指定脚本的类型 默认值为 text/javascript
- 比较新的浏览器建议设置为 application/javascript

- 如果 type 属性值浏览器不认识的话 它就不会执行里面的代码 但是这个节点还在dom中所以可以读出里面的内容

- charset="utf-8"


> url协议：
- URL支持 javascript: 协议 即在 url 的位置写入代码 使用这个url的时候就会执行 js 代码
<!--
   <a href="javascript: console.log('test')"> 点击 </a>
-->

- 浏览器的地址栏也可以执行 javascript: 协议
- 如果 javascript: 返回的是一个字符串 浏览器就会新建一个文档 用来展示这个字符串的内容 原有文档的内容就会消失
- 如果返回的不是字符串，那么浏览器不会新建文档，也不会跳转。


> 浏览器加载 js脚本 的流程
- 浏览器加载js脚本 主要是用 script 标签来完成

- 正常网页的加载流程：
- 1. 浏览器一边下载html页面 一边解析html页面 并不是等网页全部下载完毕后再开始解析
- 2. 解析的过程中发现 <script> 元素 就暂停解析 把网页的渲染的控制权交给js引擎
- 3. 如果 <script> 元素引用了外部的脚本 就去下载这个脚本在执行否则就直接直接代码
- 4. js引擎执行完毕 控制权交给渲染引擎 恢复往下解析 html 网页


> 阻塞效应
- 加载外部脚本的时候 浏览器会暂停页面的渲染 等待脚本下载并且执行完成后 再继续渲染 如果外部的脚本加载时间过长
- 浏览器就会一直处于等待脚本下载完成的状态 造成网页长时间失去响应


> DOMContentLoaded事件
- 该事件使用addEvent给doument绑定
- dom结构生成之后才会触发里面的回调


> <script defer>
- 作用：
- 它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。为了解决脚本文件下载阻塞网页渲染的问题
- 比如： <script src="a.js" defer></script> 只有等到 dom 加载完成后 才会执行 a.js 文件
<!--
   浏览器开始解析 HTML 网页。
   解析过程中，发现带有defer属性的<script>元素。
   浏览器继续往下解析 HTML 网页，同时并行下载<script>元素加载的外部脚本。
   浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。
-->

- 注意：
- 内置而不是加载外部脚本的script标签，以及动态生成的script标签，defer属性不起作用


> <script async>
- 作用：
- 使用另一个进程下载脚本，下载时不会阻塞渲染。
<!--
   浏览器开始解析 HTML 网页。
   解析过程中，发现带有async属性的script标签。
   浏览器继续往下解析 HTML 网页，同时并行下载<script>标签中的外部脚本。
   脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
   脚本执行完毕，浏览器恢复解析 HTML 网页。
-->

- 注意：
- 一旦采用这个属性，就无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。


> 脚本的动态加载
- 动态生成的script标签不会阻塞页面渲染，也就不会造成浏览器假死。但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。
- 如果想避免这个问题，可以设置async属性为false。
<!--
   ['a.js', 'b.js'].forEach(function(src) {
     var script = document.createElement('script');
     script.src = src;
     document.head.appendChild(script);
   });

   function loadScript(src, done) {
     var js = document.createElement('script');
     js.src = src;
     js.onload = function() {
       done();
     };
     js.onerror = function() {
       done(new Error('Failed to load script ' + src));
     };
     document.head.appendChild(js);
   }
-->


### 浏览器的组成
- 浏览器的核心是两部分：渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）。


> 渲染引擎
- 渲染引擎的主要作用是，将网页代码渲染为用户视觉可以感知的平面文档。
<!--
   Firefox：Gecko 引擎
   Safari：WebKit 引擎
   Chrome：Blink 引擎
   IE: Trident 引擎
   Edge: EdgeHTML 引擎
-->

- 渲染引擎处理网页，通常分成四个阶段:
- 解析代码：
    HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。

- 对象合成：
    将 DOM 和 CSSOM 合成一棵渲染树（render tree）。

- 布局： 
    计算出渲染树的布局（layout）。

- 绘制：
    将渲染树绘制到屏幕。


> 重流和重绘
- 渲染树转换为网页布局，称为“布局流”（flow）
- 布局显示到页面的这个过程，称为“绘制”（paint）
- 它们都具有阻塞效应，并且会耗费很多时间和计算资源。

- 比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。
<!--
   作为开发者，应该尽量设法降低重绘的次数和成本。 
   比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；
   再比如，重绘table布局和flex布局，开销都会比较大。
-->


> window.requestAnimationFrame(callback)
- 它可以把代码推迟到下一次重绘之前执行，而不是立即要求页面重绘。
<!--
   function doubleHeight(element) {
     var currentHeight = element.clientHeight;
   
     window.requestAnimationFrame(function () {
       element.style.height = (currentHeight * 2) + 'px';
     });

   }
-->


> JavaScript 引擎
- JavaScript 引擎的主要作用是，读取网页中的 JavaScript 代码，对其处理后运行。

------------------

### window对象
- 浏览器里面，window对象（注意，w为小写）指当前的浏览器窗口
- 它也是当前页面的顶层对象 所有其他对象都是它的下属。一个变量如果未声明，那么默认就是顶层对象的属性。


> window 对象的属性
> window.name
- 表示当前浏览器窗口的名字, 这个属性主要配合超链接和表单的target属性使用。

- 注意：
- 该属性只能保存字符串，如果写入的值不是字符串，会自动转成字符串。
- 只要浏览器窗口不关闭，这个属性是不会消失的。
- 例来说，访问a.com时，该页面的脚本设置了window.name，接下来在同一个窗口里面载入了b.com
- 新页面的脚本可以读到上一个网页设置的window.name
- 页面刷新也是这种情况。一旦浏览器窗口关闭后，该属性保存的值就会消失，因为这时窗口已经不存在了。


> window.open(url, windowName, [windowFeatures])
- 用于新建另一个浏览器窗口，类似于浏览器菜单的新建窗口选项。它会返回新窗口的引用，如果无法新建窗口，则返回null。
- var popup = window.open('somefile.html');

- 参数：
- url：字符串，表示新窗口的网址。如果省略，默认网址就是 about:blank。
- windowName：字符串，表示新窗口的名字。
- windowFeatures：字符串，内容为逗号分隔的键值对（详见下文），  https://wangdoc.com/javascript/bom/window.html
- 表示新窗口的参数，比如有没有提示栏、工具条等等。
- 如果省略，则默认打开一个完整 UI 的新窗口。如果新建的是一个已经存在的窗口，则该参数不起作用，浏览器沿用以前窗口的参数。
<!--
    var popup = window.open(
      'somepage.html',
      'DefinitionsWindows',
      'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
    );
-->


> window.close()
- 用于关闭当前窗口，一般只用来关闭window.open方法新建的窗口。
- 注意：
- 该方法只对顶层窗口有效，iframe框架之中的窗口使用该方法无效。
- popup.close()


> window.stop()
- window.stop()方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。


> window.closed， window.opener
- window.closed属性返回一个布尔值，表示窗口是否关闭。
- 这个属性一般用来检查，使用脚本打开的新窗口是否关闭。
<!--
    var popup = window.open();
    if ((popup !== null) && !popup.closed) {
      // 窗口仍然打开着
    }
-->


- window.opener属性表示打开当前窗口的父窗口
- 如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回null。
- 
- window.open().opener === window     // true
- 上面表达式会打开一个新窗口，然后返回true。

- 注意：
- 如果两个窗口之间不需要通信，建议将子窗口的opener属性显式设为null，这样可以减少一些安全隐患。
<!--
    var newWin = window.open('example.html', 'newWindow', 'height=400,width=400');
    newWin.opener = null;
    上面代码中，子窗口的opener属性设为null，两个窗口之间就没办法再联系了。
-->

- 通过opener属性，可以获得父窗口的全局属性和方法，但只限于两个窗口同源的情况，
- 且其中一个窗口由另一个打开。<a>元素添加rel="noopener"属性，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口 URL 的风险。
<!--
    <a href="https://an.evil.site" target="_blank" rel="noopener">恶意网站</a>
-->


> window.self，window.window
- window.self和window.window属性都指向窗口本身。这两个属性只读。
<!--
    window.self === window     // true
    window.window === window   // true
-->


> window.frames，window.length
- window.frames属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括frame元素和iframe元素。
- window.frames[0]表示页面中第一个框架窗口。

- frames属性实际上是window对象的别名。
- frames === window     // true


- 如果iframe元素设置了id或name属性，那么就可以用属性值，引用这个iframe窗口。
- 比如<iframe name="myIFrame">可以用frames['myIFrame']或者frames.myIFrame来引用。

- window.length属性返回当前网页包含的框架总数。如果当前网页不包含frame和iframe元素，那么window.length就返回0。
- 上面代码表示，window.frames.length与window.length应该是相等的。


> window.frameElement
- window.frameElement属性主要用于当前窗口嵌在另一个网页的情况（嵌入<object>、<iframe>或<embed>元素）
- 返回当前窗口所在的那个元素节点。如果当前窗口是顶层窗口，或者所嵌入的那个网页不是同源的，该属性返回null。


> window.top，window.parent
- window.top属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口。
- window.parent属性指向父窗口。如果当前窗口没有父窗口，window.parent指向自身。


> 位置大小属性
> window.screenX，window.screenY
- 返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读。


> window.innerHeight，window.innerWidth
- 返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读。
- 注意：
- 用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。
- 因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因此可见部分（视口）就变小了。
- 这两个属性值包括滚动条的高度和宽度


> window.outerHeight，window.outerWidth
- 返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读。


> window.scrollX，window.scrollY
- 返回页面的水平滚动距离 单位都为像素。这两个属性只读
- window.pageXOffset，window.pageYOffset是window.scrollX和window.scrollY别名


> window.moveTo()，window.moveBy()
- 用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。
- window.moveTo(100, 200)


> window.moveBy()
- 将窗口移动到一个相对位置。它接受两个参数，分别是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。
- window.moveBy(25, 50)
- 上面代码将窗口向右移动25像素、向下移动50像素。

- 注意：
- 为了防止有人滥用这两个方法，随意移动用户的窗口，目前只有一种情况，浏览器允许用脚本移动窗口：
- 该窗口是用window.open()方法新建的，并且窗口里只有它一个 Tab 页。除此以外的情况，使用上面两个方法都是无效的。


> window.resizeTo()，window.resizeBy()
- window.resizeTo()方法用于缩放窗口到指定大小。
- 参数：
- 它接受两个参数，
- 第一个是缩放后的窗口宽度（outerWidth属性，包含滚动条、标题栏等等），
- 第二个是缩放后的窗口高度（outerHeight属性）。
<!--
    window.resizeTo(
      window.screen.availWidth / 2,
      window.screen.availHeight / 2
    )
-->

- window.resizeBy()方法用于缩放窗口。
- 它与window.resizeTo()的区别是，它按照相对的量缩放，window.resizeTo()需要给出缩放后的绝对大小。
- 参数：
- 它接受两个参数，第一个是水平缩放的量，第二个是垂直缩放的量，单位都是像素。
- window.resizeBy(-200, -200)
- 上面的代码将当前窗口的宽度和高度，都缩小200像素。


> window.scrollTo()，window.scroll()，window.scrollBy()
- window.scrollTo方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。
- window.scroll()方法是window.scrollTo()方法的别名。

- window.scrollBy()方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。
- window.scrollBy(0, window.innerHeight)
- 上面代码用于将网页向下滚动一屏。

- 注意：
- 如果不是要滚动整个文档，而是要滚动某个元素，可以使用下面三个属性和方法。
- Element.scrollTop
- Element.scrollLeft
- Element.scrollIntoView()


> window.print()
- 该方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同。
- 常见的打印按钮代码如下。
<!--
    document.getElementById('printLink').onclick = function () {
      window.print();
    }
-->

- 注意：
- 非桌面设备（比如手机）可能没有打印功能，这时可以这样判断。
<!--
    if (typeof window.print === 'function') {
      // 支持打印功能
    }
-->


> window.focus()，window.blur()
- 当前窗口获得焦点时，会触发focus事件；当前窗口失去焦点时，会触发blur事件。


> window.getSelection()
- window.getSelection方法返回一个Selection对象，表示用户现在选中的文本。
- 使用Selection对象的toString方法可以得到选中的文本。
<!--
    document.querySelector("button").addEventListener('click', () => {
        let str = window.getSelection()
        console.log(str.toString())
    })
-->


> window.requestAnimationFrame(callback)
- 方法跟setTimeout类似，都是推迟某个函数的执行。不同之处在于，setTimeout必须指定推迟的时间，
- 则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，
- 不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，requestAnimationFrame()会暂停执行。

- window.requestAnimationFrame()的返回值是一个整数，
- 这个整数可以传入window.cancelAnimationFrame()，用来取消回调函数的执行。
<!--
    var element = document.getElementById('animate');
    element.style.position = 'absolute';
    
    var start = null;
    
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      // 元素不断向左移，最大不超过200像素
      element.style.left = Math.min(progress / 10, 200) + 'px';
      // 如果距离第一次执行不超过 2000 毫秒，
      // 就继续执行动画
      if (progress < 2000) {
        window.requestAnimationFrame(step);
      }
    }
    
    window.requestAnimationFrame(step);
-->


> 多窗口操作
- 由于网页可以使用iframe元素，嵌入其他网页，因此一个网页之中会形成多个窗口。如果子窗口之中又嵌入别的网页，就会形成多级窗口。
- 各个窗口之中的脚本，可以引用其他窗口。浏览器提供了一些特殊变量，用来返回其他窗口。

- top: 
- 顶层窗口，即最上层的那个窗口

- parent:
- 父窗口

- self
- 当前窗口，即自身

<!--
if (window.top === window.self) {
  // 当前窗口是顶层窗口
} else {
  // 当前窗口是子窗口
}

下面的代码让父窗口的访问历史后退一次。
window.parent.history.back();
-->


> iframe 元素
- 对于iframe嵌入的窗口
- document.getElementById方法可以拿到该窗口的 DOM 节点，
- contentWindow属性获得iframe节点包含的window对象。
- contentDocument属性，可以拿到子窗口的document对象。
<!--
    frame.contentWindow可以拿到子窗口的window对象。然后，在满足同源限制的情况下，可以读取子窗口内部的属性。
    var frame = document.getElementById('theFrame');
    var frameWindow = frame.contentWindow;

    获取子窗口的标题
    frameWindow.title
-->

- 注意：
- <iframe>元素遵守同源政策，只有当父窗口与子窗口在同一个域时，两者之间才可以用脚本通信，
- 否则只有使用window.postMessage方法。



> 组件属性
- 组件属性返回浏览器的组件对象。这样的属性有下面几个。
- window.locationbar：地址栏对象
- window.menubar：菜单栏对象
- window.scrollbars：窗口的滚动条对象
- window.toolbar：工具栏对象
- window.statusbar：状态栏对象
- window.personalbar：用户安装的个人工具栏对象

- 这些对象的visible属性是一个布尔值，表示这些组件是否可见。这些属性只读。

----------

### Navigator 对象的属性
> Navigator.userAgent
- navigator.userAgent属性返回浏览器的 User Agent 字符串，表示用户设备信息，包含了浏览器的厂商、版本、操作系统等信息。
- console.log(navigator.userAgent)
<!--
  let ua = navigator.userAgent.toLowerCase()
  if(/mobi/.test(us)) {
    // phone
  } else {
    // no phone
  }

  如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。
  /mobi|android|touch|mini/.test(ua)
-->


> Navigator.plugins
- Navigator.plugins属性返回一个类似数组的对象，成员是 Plugin 实例对象，表示浏览器安装的插件，比如 Flash、ActiveX 等。
- var pluginsLength = navigator.plugins.length


> Navigator.onLine
- navigator.onLine属性返回一个布尔值，表示用户当前在线还是离线（浏览器断线）。
- 如果是false，可以断定用户一定离线
- 用户变成在线会触发online事件，变成离线会触发offline事件，可以通过window.ononline和window.onoffline指定这两个事件的回调函数。

----------

### Cookie
- Cookie 是服务器保存在浏览器的一小段文本信息，一般大小不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。
- HTTP 协议不带有状态，有些请求需要区分状态，就通过 Cookie 附带字符串，让服务器返回不一样的回应。
- 举例来说，用户登录以后，服务器往往会在网站上留下一个 Cookie，记录用户编号（比如id=1234），以后每次浏览器向服务器请求数据，就会带上这个字符串，服务器从而知道是谁在请求，应该回应什么内容。

- Cookie 不是一种理想的客户端存储机制。它的容量很小（4KB），缺乏数据操作接口，而且会影响性能。客户端存储建议使用 Web storage API 和 IndexedDB。
- 只有那些每次请求都需要让服务器知道的信息，才应该放在 Cookie 里面。

- 每个 Cookie 都有以下几方面的元数据。
  Cookie 的名字
  Cookie 的值（真正的数据写在这里面）
  到期时间（超过这个时间会失效）
  所属域名（默认为当前域名）
  生效的路径（默认为当前网址）  


> document.cookie
- 返回当前网页的 Cookie。
- document.cookie     // "id=foo;key=bar"
<!--
  一般来说，单个域名设置的 Cookie 不应超过30个，
  每个 Cookie 的大小不能超过 4KB。
  超过限制以后，Cookie 将被忽略，不会被设置。
-->


### HTTP 回应：Cookie 的生成
- 服务器如果希望在浏览器保存 Cookie，就要在 HTTP 回应的头信息里面，放置一个Set-Cookie字段。

  Set-Cookie:foo=bar

- HTTP 回应可以包含多个Set-Cookie字段，即在浏览器生成多个 Cookie。下面是一个例子。

  HTTP/1.0 200 OK
  Content-type: text/html
  Set-Cookie: yummy_cookie=choco
  Set-Cookie: tasty_cookie=strawberry

> Cookie 的属性
- Expires:
- 指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。
- 它的值是 UTC 格式，可以使用Date.prototype.toUTCString()进行格式转换。

  Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;


- Max-Age:
- 指定从现在开始 Cookie 存在的秒数，比如60 * 60 * 24 * 365（即一年）

- 如果同时指定了Expires和Max-Age，那么Max-Age的值将优先生效
- 如果Set-Cookie字段没有指定Expires或Max-Age属性，那么这个 Cookie 就是 Session Cookie，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie。


> iframe 和多窗口通信
- 片段识别符:
- 指的是，URL 的#号后面的部分，比如http://example.com/x.html#fragment的#fragment。如果只是改变片段标识符，页面不会重新刷新。
- 父窗口可以把信息，写入子窗口的片段标识符。

  var src = originURL + '#' + data;
  document.getElementById('myIFrame').src = src;

  window.onhashchange = checkMessage;
  function checkMessage() {
      var message = window.location.hash;
      // ...
  }

- 同样的，子窗口也可以改变父窗口的片段标识符。
- parent.location.href = target + '#' + hash;


> window.postMessage()
- 跨文档通信 API（Cross-document messaging）。
- 允许跨窗口通信，不论这两个窗口是否同源。举例来说，父窗口aaa.com向子窗口bbb.com发消息，调用postMessage方法就可以了。

  // 父窗口打开一个子窗口
  var popup = window.open('http://bbb.com', 'title');

  // 父窗口向子窗口发消息
  popup.postMessage('Hello World!', 'http://bbb.com');

  // 子窗口向父窗口发消息
  window.opener.postMessage('Nice to see you', 'http://aaa.com');

- 理解要点：
- 向目标发送数据 目标对象.postMessage

- 参数：
- 参数1: 数据 传递的具体信息内容
- 参数2:  第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为*，表示不限制域名，向所有窗口发送。


- 父窗口和子窗口都可以通过message事件，监听对方的消息。

  window.addEventListener('message', function (e) {
      console.log(e.data);
  },false);

- message事件的参数是事件对象event，提供以下三个属性。message事件的参数是事件对象event，提供以下三个属性。
- 1 event.source：发送消息的窗口
- 2 event.origin: 消息发向的网址
- 3 event.data: 消息内容

----------

### 读取文件 FileReader
- 取得 Blob 对象以后，可以通过FileReader对象，读取 Blob 对象的内容，即文件内容。
- FileReader 对象提供四个方法，处理 Blob 对象。Blob 对象作为参数传入这些方法，然后以指定的格式返回。

- 都可以通过 FileReader 创建出来的实例来调用

> 实例对象.readAsText()：
- 返回文本，需要指定文本编码，默认为 UTF-8。


> 实例对象.readAsArrayBuffer()：
- 返回 ArrayBuffer 对象。


> 实例对象.readAsDataURL()：
- 返回 Data URL。


> 实例对象.readAsBinaryString()：
- 返回原始的二进制字符串。


- 将数据读取成指定的格式后 我们还可以给 实例对象 绑定 onload 事件监听 在实例的result属性上拿到文件内容。
- 在实例的result属性上拿到文件内容。
<!--
  没想好之后的测试步骤
  const inp = document.querySelector('#inp')
  inp.addEventListener("change", handleFile)
  function handleFile(e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      // reader.readAsBinaryString(file)
      reader.readAsArrayBuffer(file)
      reader.onload = function(e) {
          let imgBuffer = e.target.result
          let view = new DataView(imgBuffer)
          console.log(view)
      }
  }
-->

-------------------------

### file对象
- File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。
- 用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。
<!--
  // HTML 代码如下
  // <input id="fileItem" type="file">
  var file = document.getElementById('fileItem').files[0];
-->

- 也就是说我们上传文件后 就能从该input身上的到files

-------------------------

### 






### 前端页面性能优化
- 主要包括网络加载类、页面渲染类、CSS优化类、JavaScript执行类、缓存类、图片类、架构协议类等几类；

> 网络加载类：
- 1，减少HTTP资源请求次数：
- 在前端页面中，通常建议尽可能合并静态资源图片、JavaScript或CSS代码，减少页面请求数和资源请求消耗，
- 这样可以缩短首屏加载时间，通过构建工具合并雪碧图、CSS、JavaScript文件等都是为了减少HTTP资源请求次数，
- 另外也要尽量避免重复的资源，防止增加多余请求；


- 2，将CSS或JavaScript放到外部文件中：
- 在HTML文件上引用外部资源可以有效利用浏览器的静态资源缓存


- 3，避免页面中空的href和src
- 浏览器在渲染过程中仍会将href属性或者src属性中的空内容进行加载，直至加载失败，
- 这样就阻塞了页面中其他资源的下载进程，而且最终加载到的内容是无效的


- 4, 为HTML指定Cache-Control或Expires
- 为HTML内容设置Cache-Control 或 Expires可以将HTML内容缓存起来，避免频繁向服务器端发送请求，
- 在页面中的Cache-Control 或 Expires头部有效时，浏览器将直接从缓存中读取内容，不再向服务器端发送请求

<meta http-equiv="Cache-Control" content="max-age=7200">
<meta http-equiv="Expires" content="Mon,20Jul201623:00:00GMT">


- 5, 使用可缓存的AJAX
- 对于返回内容相同的请求，没必要每次都直接从服务端拉取，合理使用AJAX缓存能加快AJAX响应速度并减轻服务器压力；


> 页面渲染类
- 1, 把CSS资源引用放到HTML文件顶部：
- 2, JavaScript资源引用放到HTML文件底部：
- 3, 尽量减少使用JS动画 JS直接操作DOM极容易引起页面的重排；


> 缓存类
- 1, 合理利用浏览器缓存：
- 除了上面所说的Cache-Control、Expires、Etag 和 Last-Modified来设置HTTP缓存外，
- 在移动端还可以使用localStorage等来保存AJAX返回的数据，
- 或者使用localStorage保存CSS或JavaScript静态资源内容，实现移动端的离线应用，尽可能减少网络请求，保证静态资源内容的快速加载；


> 脚本类
- 1, 尽量使用id： 
- 选择器选择页面DOM元素时尽量使用id选择器，因为id选择器速度最快；

- 2, 合理缓存DOM对象：
- 对于需要重复使用的DOM对象，要优先设置缓存变量，避免每次使用时都要从整个DOM树中重新查找；

- 3, 页面元素尽量使用事件代理，避免直接事件绑定：
- 使用事件代理可以避免对每个元素都进行绑定，并且可以避免出现内存泄露及需要动态添加元素的事件绑定问题，所以尽量不要直接使用事件绑定；



### 网路安全方面
> SQL注入
- admin' --  密码随意输入

- 因为在 sql 中 ' -- 是注释的意思
- 对进入数据库的特殊字符（'，"，，<，>，&，*，; 等）进行转义处理，或编码转换。


> XSS
- 跨站脚本攻击是指通过存在安全漏洞的Web网站注册用户的浏览器内运行非法的HTML标签或JavaScript进行的一种攻击。
- 


### ES6 




