### Mock.js入门和安装
- 官方网站:
- mockjs.com

- 前置: 需要Vue2.x基础完结后才可以学习

> 技术说明
- mock.js是一款模拟JSON数据的前端技术, 为什么要产生这种技术, 对于前后端分离的项目, 后端工程师的API数据迟迟没有上线, 而前端工程师却没有JSON数据进行数据填充 自己写后端模拟又太繁重, 这个时候, Mock.js就能解决这个问题, 让前端工程师更加独立做自己 


> 安装方式
- npm install mockjs


> 基本使用
- 1. 引入mock
- 2. 创建模拟数据
  - 2.1 'list|1-10' : [{ 'id|+1':1}]
  <!-- 
    属性 list 的值是一个数组，其中含有 1 到 10 个元素
    属性 id   是一个自增数，起始值为 1，每次增 1
   -->
<!-- 
  // 1
  var Mock = require('mockjs')

  // 2
  var data = Mock.mock({ })

  let data = Mock.mock({
    'list|1-10': [{
      'id|+1': 1
    }]
  })

  console.log(data)   // 数据量是不一样的 1-10条内随机生成

  // 我们把data转换为json
  console.log(JSON.stringify(data, null, 4))

  参数null的位置  替换
  参数4的位置     几个空格?
 -->


> 前端的使用
- 我们看看前端的使用方式
- 1. 引入mock.js文件
- 2. 
<!-- 
  <script src="./js/mock.js"></script>
  <script>
    let data = Mock.mock({
      'list|1-10': [{
        'id|+1': 1
      }]
    })
  console.log(JSON.stringify(data))
  </script>
 -->



### Mock.js 语法规范
- Mock.js的语法规范包括两个部分: 数据模板定义规范 和 数据占位定义规范

- 规则的地方不要随意加空格

> 数据模板定义规范
- 1. 属性名
- 2. 生成规则
- 3. 属性值
<!-- 
  '属性名|生成规则' : 属性值

  'name|rule' : value
 -->

- 其中字符串, 数值有7种生成规则, 具体如表说明
<!-- 
  生成规则                    说明                          示例
  min-max             生成min~max之间的字符串      'list|1-10'

  count               生成count个字符串             'list|5'

  min-max.dmin-dmax   生成min-max之间的浮点数       'id|1-10.1-3':1
                      小数点位数在dmin~dmax之间

  count.dcount        生成count个字符串             'id|8.2':1
                      小数点位数为dcount

  min-max.dcount      同上    

  +step               每次进行累加一个值              'id|+1': 1 
 -->


- 布尔值 对象 数组等规则
<!-- 
  生成规则                    说明                          示例
  布尔值             生成布尔值, 1/2概率true        'flag|1': true

  布尔值min-max     生成布尔值,概率为min/(min+max)  'flag|1-10': true

  对象count         从对象中随机抽取count个属性     'obj|2': obj
  
  对象min-max       从对象中随机抽取min-max属性     'obj|1-3': obj

  数组1             获取1次数组                     'arr|1' : arr
    - 每次从数组中选择一个元素作为对象

  数组count         重复count次组成新数组           'arr|2' : arr
    - 把当前数组 两次合并起来组成一个新数组

  数组+1            累加                            'arr|+1' : arr

  数组min-max       重复min-max次组成新数组         'arr|1-2' : arr
 -->

<!-- 
  const data = Mock.mock({
  'list|1-10' : [
    { 
      // 布尔值
      // 属性名中的1表示占位, 这条规则是1/2是false true
      // 'flag|1' : true

      // 对象
      // 随机从对象中抽出N条属性名
      'obj|2' : obj

    }
  ]
})

console.log(JSON.stringify(data, null, 2));
 -->


- 也支持函数和正则表达式
<!-- 
  生成规则                    说明                          示例
  函数                  支持函数                'fn|1': function
  正则                  支持正则                'reg|1' : /[a-z]/
    - 从正则a-z中 随机数据
    'reg|1' : /[a-z]/     试试直接写reg
 -->



> @占位符
- 使用mock里面内置的数据代替@name的位置
- cname是中文人称
- name是英文名称

- 网站上很多占位符 自己查看下
- http://mockjs.com/examples.html#DPD

<!-- 
  const data = Mock.mock({
  'list|1-10': [
      {
        name: '@cname'
      }
    ]
  })
  console.log(JSON.stringify(data, null, 2));


  'list|5' : [{
    cname: '@cname'
    city: '@city'
    full: '@cname - @city'
  }]
 -->


### Mock.js 随机占位符
- 上一节的最后 我们了解了Mock.js提供的随机占位符功能, 通过'@占位符' 这种方式来随机产生各种不同的数据, 有两种可以输出这种随机占位符, 具体如下

> Mock.Random.cname()
<!-- 
  log(Mock.Random.cname())
 -->

> Mock.mock('@cname')
<!-- 
  log(Mock.mock('@cname'))
 -->

- 如果在输出列表中, 直接写'@cname'更加的方便快捷

<!-- 
    Type          Method
    Basic         boolean, naturalm integer, float, character, string, 
                  range, data, time, datetime, now

    Image         image, dataImage

    Color         color

    Text          paragraph, sentence, word, title, cparagraph, 
                  csentence, cword, ctitle

    Name          first, last, name, cfirst, clast, cname

    Web           url, domain, email, ip, tld

    Address       area, region

    Heler         capitalize, upper, lower, pick, shuffle

    Miscellaneous guid, id
 -->

- 根据上面表中的内容 可以使用两种方式来使用占位符
- 使用方式 和 结果
<!-- 
  console.log(Mock.Random.cname())
  console.log(Mock.mock('@image'))
  console.log(Mock.mock('@id'))
  console.log(Mock.mock('@ctitle'))
  console.log(Mock.mock('@ip'))
  console.log(Mock.mock('@url'))


  // 结果
  陆平
  http://dummyimage.com/250x250
  81000019750119285X
  总青亲写
  77.207.19.120
  tn3270://jplvllshn.tel/olvitd
 -->

> 创建一个随机对象
<!-- 
  const Mock = require('mockjs')

  let obj = Mock.mock({
    id: '@id',
    username: '@cname',
    date: '@date',

    // 生成图片, 参数 size  background foreground, text
    avatar: '@image("200x200", "red", "#fff", "avatar")',
    description: '@paragraph',
    ip: '@ip',
    email: '@email'
  })

  console.log(obj);
 -->


- 如果没有我们想要的数据格式进行填充, 可以使用扩展功能自己扩展
> 自行扩展, 各种商店的名称
<!-- 
  Mock.Random.extend({
    // cstore自定义的名称
    cstore() {
      return this.pick([
        '宠物店',
        '美容店',
        '小吃店',
        '数码店',
        '快餐店'
      ])
    }
  })

  console.log(Mock.mock('@cstore'))
 -->


### Axios入门和安装
- axios.js是一个基于promise的HTTP库, 支持浏览器和node环境, 说明白点, 就是使用这个库来执行ajax请求, 获取json数据, 我们可以利用axios可以发送get post等一系列请求, 然后得到数据

> 安装
- npm i axios

- 如果要在浏览器使用, 我们可以直接使用cdn地址加载即可
<!-- 
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 -->

> 基本使用方式
- 浏览器执行远程Ajax请求会有跨域的问题, 我们可以保存到本地执行即可
- 老师提供了两个可以接收请求的url 
- https://cdn.liyanhui.com/data.json  (可跨域, 设置过)
- https://cdn.ycku.com/data.json      (不可跨域, 默认)

> axios基于promise所以在then中取得结果
<!-- 
  axios.get('https://cdn.liyanhui.com/data.json').then(res => {
    // console.log(res)

    // data属性中才是数据
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })


  // 浏览器端可以这样
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    // 可以获取到数据 https://cdn.liyanhui.com/data.json 已设置过跨域
    axios.get('https://cdn.liyanhui.com/data.json').then(res => {
      // data属性中才是数据
      console.log(res.data)
    })
  </script>
 -->



### axios配置和并发
- 上面我们通过axios进行异步通信, 使用了服务器端设置解决跨域
- 有时, 我们需要在url地址配置参数进行数据筛选(这里单纯json)

- 官方网址
- http://www.axios-js.com/zh-cn/docs/#axios-config

> 配置 options
- 在axios.get(url, {options}) 第二个参数里面配置信息

- 1. 配置参数
<!--  
  axios.get('https://cdn.liyanhui.com/data.json', {
      params: {
        id:1,
        status: 5
      }
    })
      .then(res => {
        // data属性中才是数据
        console.log(res.data)
      })
 -->

- 2. 都以配置信息来操作
<!-- 
  axios({
    method: 'get',
    url: 'https://cdn.liyanhui.com/data.json',
    params: {
      id:1,
      status: 5
    }
  })
  .then(res => {
    console.log(res.data)
  })
 -->


> 并发操作 axios.all([请求1, 请求2]).then()
- 如果项目中可能会产生多个异步请求, 正常它们会根据耗时长短来执行
- 谁先执行完毕(哪个返回数据快) 谁先打印

- 我们如果想让所有的异步请求后, 按照指定的顺序进行执行, 使用all方法
- 并在最后.then中取值就是所有结果按顺序的打印
<!-- 
  axios.all([
    axios({
      url: 'https://cdn.liyanhui.com/data.json?id=1',
    }),

    axios({
      url: 'https://cdn.liyanhui.com/data.json?id=2',
    }),

    axios({
      url: 'https://cdn.liyanhui.com/data.json?id=3',
    })
  ]).then(res => {
    console.log(res);
  })
 -->

- 上述我们在then一共获取到了3个结果, 我们要是想要输出3个结果可以选择遍历
<!-- 
  .then(value => {
    for(let i=0; i<value.length; i++) {
      console.log(vaue[i].config.data)
    }
  })
 -->

> axios.spread()
- 我们在then中获取所有的返回结果的时候 遍历的方式有点复杂 我们还可以通过axios.spread(回调)
<!-- 
  .then(axios.spread(res1, res2, res3) => {
    console.log(res1.config.data)
    console.log(res2.config.data)
    console.log(res3.config.data)
  })
 -->


### axios实例化 和 拦截
- 我们可以把公共的url抽取出来

> axios.defaults.baseURL = 'url'
- 我们可以把重复的网址抽取出来 后面还可以利用url拼接不同的网址
- 也就是说 baseURL + url 是最终的整体
<!-- 
  axios.defaults.baseURL = 'https://cdn.liyanhui.com'

  axios.all([
    axios({
      url:'/data.json',
      data: '1.异步'
    }),
  ])

  最终是 'https://cdn.liyanhui.com/data.json'
 -->


> 实例化
> let name = axios.create() 创建一个实例
- 顾名思义就是new出来一个对象, 这样这个对象具有独立性不被干扰
- axios里面封装了实例化的方法, 并不需要我们自己去new
<!-- 
  // 实例化 myAxios对象
  const myAxios = axios.create()
  myAxios.defaults.baseURL = 'https://cdn.liyanhui.com'

  myAxios({
    method: 'get',
    url:'/data.json',
  }).then(res => {
    console.log(res.data)
  })

 -->



### 拦截操作
- 所谓的拦截操作, 就是在ajax获取数据之前 先拦截处理一些事物的操作
- 这些操作包括, 修改axios配置信息, loading 判断验证跳转等等
- 拦截处理完毕之后, 再通过return返回基础处理即可
<!-- 
  // 添加请求拦截
  myAxios.interceptors.request.use(config => {
    console.log('loading')
    return config
  })
 -->

> 全部代码
<!-- 
  // 实例化 myAxios对象
  const myAxios = axios.create()
  myAxios.defaults.baseURL = 'https://cdn.liyanhui.com'

  // 请求拦截
  myAxios.interceptors.request.use(config => {
    // loading加载动画
    console.log('loading...')

    // 还可以修改配置
    config.url = 'data2.json',
    // 还可以修改超时时间
    config.timeout = 500

    // axios会返回promise对象 后面会继续用 我们把它返回出去
    return config
  })


  // 响应拦截
  myAxios.interceptors.response.use(response => {

    // 我们再这里可以对响应结果 进行修改 处理 过滤 然后再返回给下面继续操作
    
    // 也是要将响应结果返回出去
    return response
  })

  myAxios({
    method: 'get',
    url:'/data.json',
  }).then(res => {
    console.log(res.data)
  })
 -->



### Mock 拦截 axios 请求
- 这个也是最终的需求功能, 我们假设axios异步请求的数据尚未上线或者不全
<!-- 
  我们请求的路径可能会报错 或者没有数据等 这种时候我们可以使用mock将请求拦截掉
 -->
- 然后再通过mock请求拦截, 随机生成填充的数据进行前端设计

> Mock.mock('拦截的url', {mock的配置参数})
- 注意url部分还可以写正则
<!-- 
  Mock.mock(RegExp("url"+".*), {mock的配置参数})
 -->

> 使用方式
<!-- 
   // 使用ajax获取数据
    axios({
      method: 'get',
      url: 'https://cdn.liyanhui.com/data.json',
    }).then(res => {
      console.log(res)
      // console.log(res.data.list[0].id)
    })

    // mock拦截
    // Mock.mock('拦截的请求地址', {配置对象})
    Mock.mock('https://cdn.liyanhui.com/data.json', {
      'list|5-10': [
        {
          'id|+1': 1,
          'username': '@cname',
          'email': '@email',
          'price': '@integer',
          'gender': '@boolean'
        }
      ]
    })
 -->


> 总结
- axios返回的res有data, status, statusText, headers, config等属性名, data是数据
- 所以一般我们要获取响应结果的数据的时候一般都是res.data

- 我们使用mock创建的数据 list是一个数组, 数组中有一个个的对象
<!-- 
  console.log(res.data.list[0].id)
 -->


> 扩展
- npm i json5
- 使用json5解决json文件, 无法添加注释的问题

### json5
- .json文件中 不能有// 注释的存在
- .json文件中 属性名也要用"" 包裹起来

- 我们使用npm安装后, 将.json后缀名 改成 .json5
- 语法高亮的提示 去插件里面搜 json5

- 我们要是想用json5 必须要先引入这个模块
<!-- 
  const json5 = require('json5')
  JSON5.parse(json)
 -->


### mock 和 vue结合使用
- 我们的vue项目是跑在webpack的服务器上的 是通过 webpack-dev-server 启动的服务
- 既然我们想用mock来拦截请求, 那么我们就要在 devServer.before 里面进行相关的配置

- 在devServer里面访问任何一个请求 都会被before这个中间件拦截 所以我们可以在before里面做一系列的操作 当我们操作完后才会执行其他的东西

> 找到 webpack.config.js 文件 或者 找到vue.config.js中(视频就是在这里) 
- 加入以下的配置
<!-- 
  module.exports = {
    devServer: {
      before: require('./mock/index.js')
    }
  }
 -->

<!-- 
  // index.js 文件

  const JSON5 = require('json5')

  function getJsonFile(filePath) {
    let json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
    return JSON5.parse(json)
  }

  // 返回一个函数
  module.exports = function(app) {
    app.get('/user/userinfo', function(req, res) {
      // 每次响应请求时读取mock data的json文件
      // getJsonFile方法定义了如何读取json文件并解析成数据对象 json5是通过mock创建的随机数据
      let json = getJsonFile('./userInfo.json5')

      // 将json传入Mock.mock方法中, 生成的数据返回给浏览器
      res.json(Mock.mock(json))
    })
  }
 -->

> 移除mock
- 当我们的后端已经开发完毕, 那么怎么移除mock呢?
- 我们可以在某一个条件下 再执行mock
<!-- 
   module.exports = function(app) {

     if(process.env.MOCK == 'true') {
       app.get('/user/userinfo', function(req, res) {
        // 每次响应请求时读取mock data的json文件
        // getJsonFile方法定义了如何读取json文件并解析成数据对象 json5是通过mock创建的随机数据
        let json = getJsonFile('./userInfo.json5')

        // 将json传入Mock.mock方法中, 生成的数据返回给浏览器
        res.json(Mock.mock(json))
      })
     }
  }
 -->

- 为了达成上面的效果 我们还需要去看 vue cli中的环境变量和模式的章节
- 你可以替换你的项目根目录中的下列文件来指定环境变量
<!-- 
  .env                 // 在所有的环境中被载入
  .env.local           // 在所有的环境中被载入, 但会被git忽略
  .env.[mode]          // 只在指定的模式中被载入
  .env.[mode].local    // 只在指定的模式中被载入, 但会被git忽略
 -->