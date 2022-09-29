# Antd相关

# Antd的基本使用
react周边有很多成型的组件库(样式)开箱即用
react流行的开源的UI组件库

1. material-ui  国外
  - 官网:     http://www.material-ui.com/#/
  - github:  https://github.com/callemall/material-ui

2. ant-design   蚂蚁金服
  - 官网:     https://ant.design/index-cn
  - github:   https://github.com/ant-desing/ant-design

**安装 antd UI组件库**
npm i antd

**import { 要使用的组件 } from 'antd';**
**import 'antd/dist/antd.css'**
把要使用的组件从 antd 中导入
再把antd的样式也要导入进来


antd也有很多的子库, antd把一些其它的设计没有都放在 antd 库中 我们要是想使用子库需要自己重新引入
<!-- 
  比如图标的字库: 
    @ant-design/icons
 -->

我们要用的东西可以说是都是组件 所以我们要是想要使用的话 都要从库里面导出来使用


**按钮组件**
**import { 要使用的组件 } from 'antd';**
**import 'antd/dist/antd.css'**
把要使用的组件从 antd 中导入
再把antd的样式也要导入进来

在结构中使用 组件标签 <Button>

<!-- 
  import { Button } from 'antd';
  import 'antd/dist/antd.css'

  <Button type="primary">Primary Button</Button>
 -->

网页中每一个组件的右侧的侧边栏里面都有一个叫做 API 的选项卡 里面是介绍都有哪些属性可以设置
<!-- 
  https://ant.design/components/button-cn/#API
 -->


**字体图标库 @ant-design/icons**
我们要是想要使用 字体图标库的话 也要先引入字体图标库 然后从里面拿出对应的想要使用的组件
<!-- 
  import {WechatFilled, SearchOutlined} from '@ant-design/icons'

  // 这个是复制网站上的
  <WechatFilled />

  // icon={<SearchOutlined /> 按钮里面的图标
  <Button type="primary" icon={<SearchOutlined />}>
    Search
  </Button>
 -->


**日期选择器 DatePicker**
这个日期选择器有一个onchange时间 有两个参数 选择日期的回调函数
参数1:  时间对象
参数2:  时间字符串

其他的看API
<!-- 
  import { Button, DatePicker, Space } from 'antd';

  dateChange = (data, dataString) => {
    console.log('1', data)
    console.log('2', dataString)
  }

  <Space direction="vertical">
    <DatePicker onChange={this.dateChange}/>
  </Space>
 -->

那什么项目都能用antd么？ 不能
适用于成型的后台的管理系统 不关心界面 只关心功能 前端页面不太适合 但是后台页面在乎的是系统的本身所以选择antd比较合适

react也可以使用 elementUI
移动端的话 vantUI 是给Vue用的组件库

<br>--

# Antd 栅格系统
antd的栅格化系统使用的是flex布局

使用方式: 
1. 引入<Row> 和 <Col>栅格组件
所有的Col必须放在Row里面, Col使用 span={number} 的形式表达占的份数

2. 引入 antd 的css样式
<!-- 
  import { Row, Col } from 'antd';
  import 'antd/dist/antd.css';
 -->


**区块间隔**
使用方式: 
1. 间隔的设置
<Row gutter={number}> 推荐使用 (16+8n)px 作为栅格间隔。(n 是自然数)
8 16 24 32 40 48 56 以8px增加
<!-- 
  <Row gutter={24}>
 -->

2. 间隔是对Col中的div起作用的, Col相当于容器, 间隔主要是div和div之间的间隔
<!--  
  <Row gutter={24}>
    <Col span={12} className='bg'>
      <div className="gutter-box">hello</div>     1
    </Col>
    <Col span={12} className='bg'>
      <div className="gutter-box">hello</div>     2
    </Col>
  </Row>

  间隔主要体现在div1 和 div2 上
 -->

间隔支持响应式: 
<Row gutter={ xs: 8, sm: 16, md: 24, lg: 32 }>

垂直之间的间隔: 
<Row gutter=[水平间距, 垂直间距]>
也可以写成响应式


**列偏移**
使用方式: 
<Col offset={number}> 往右侧偏移几列


**列排序**
使用方式: 
<Col push={number}>   往右 会压住其他的列
<Col pull={number}>   往左 会压住其他的列


**order排序**
使用方式: 
一行当中指定的列 通过order可以任意排序
<Col order={number}>


**开启flex**
使用方式: 

水平方向: 
<Row type='flex' justify='对齐方式'>
对Row组件使用 type=‘flex’ 
justify: start  center  end  space-between  space-around

垂直方向: 
<Row type="flex" align="对齐方式">
align: top  middle  bottom


**响应式布局**
预设六个响应尺寸: xs sm md lg xl  xxl。
<!-- 
  <Col xs={2} sm={4} md={6} lg={8} xl={10}>
 -->

<br>--

# Table组件
表格的使用, 好麻烦啊

antd库中 导出 Table 组件
import {Table} from 'antd'
const { Column } = Table;

表格的简单使用
准备好 dataSource columns 数据源 在标签属性中使用该属性 指向 数据源
<Table dataSource={dataSource} columns={columns}/>
    dataSource: 这个步骤就是准备表格中要用的数据 没必要和每一列对上 它多出的就不显示因为没有对应的列
    columns:  主要用于创建几列 是一个对象数组 每一个对象代表一列
    dataIndex:  是表格每一列的内容 这列展示什么内部 要和columns里面的dataIndex对上

<!-- 
  <Table 
    dataSource={dataSource} 
    columns={columns}
    bordered
    pagination={false}
  />
 -->

关于列的配置 也可以在 columns数据源中定义
<!-- 
  const columns = [
    { title: 'To', key: 'to', render:() => <Checkbox />, 
      onHeaderCell: () => ({style:{textAlign: 'center', background:'#1890ff', color:'#fff'}}),
      align:'center'
    },
    { title: 'CC', key: 'age', render:() => <Checkbox />, 
      onHeaderCell: () => ({style:{textAlign: 'center', background:'#1890ff', color:'#fff'}}),
      align:'center'
    },
 -->



下列所有的属性都可以在下面的配置对象中配置好
<!-- 
  const dataSource = [
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号'},
];

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name'},
  { title: '年龄', dataIndex: 'age', key: 'age', },
  { title: '住址', dataIndex: 'address', key: 'address'},
];
 -->


表的详细配置
上述的是根据数据源自动生成的表格 没办法对每行 每列进行单独的设置
使用的表格组件也是<Table /> 标签


如果要对表格每行每列进行详细的设置 需要引入 Column 组件
写成 <Table> <Column> <Column> </Table>的形式


在指定 <Column> 内容的时候 需要使用下面格式
<Column title='姓名' dataIndex='name' key='name'></Column>
dataIndex是为了告诉该列 去哪找对应的数据 'name'指向dataSource的name值
title就是显示在页面的表头 同时也要指定key


** 组件中的属性**
dataSource: 
    指定表格体的内容 格式在上面

bordered:
    指定表格是否带边框

loading:  true / false
    表格整体会有加载动画

pagination:  true / false
    表格下方会出现分页

showHeader:  true / false
    是否显示表头

rowClassName: 
    表格每一行是这么加类名

scroll: 
    表格是否可滚动, 也可以指定滚动区域的宽、高

onHeaderRow: 表头的属性 值为一个回调
    columns: 表头行的每个单元格
    index: 是第几行
<!-- 
  onHeaderRow={(columns, index) => {
    return {
      onClick: () => {
        console.log(columns,index);
      }
    };
  }}
 -->

rowKey='' 
    用来指定每行的key值 直接写dataSource中的属性名即可
    rowKey='_id'


** 组件中的属性**
align:  left | right | center
    每列内容的对齐方式

className: 
    列样式类名

colSpan: number
    合并单元格 colSpan='2'

 width:
    指定列的宽度 width={200}  width='200px'

render:
    用来生成一片html区域 也可以理解成一个复杂的结构 比如这个结构中可以有 button span等
    
    生成复杂数据的渲染函数, 参数分别为当前行的值, 当前行数据, 行索引, @return 里面可以设置表格行/列合并

    render: (这个参数是当前行的数据 也就是是 dataSource 里面的数据 或者是从后台请求回来的数据) => {}
<!-- 
  function(text, record, index) {}
  当前行的值
  当前行数据  是一个对象
      {key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park", tags: Array(2)}
  行索引

  // columns
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',

    // text就是data中的数据, 该列将数据放在a标签中
    render: text => <a>{text}</a>,
  }

  // data data里都是填在页面上的数据
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }


  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },


Invite John Brown   Delete
 -->


**表头的设置**
在columns中配置 或者列的属性标签里面
onHeaderCell: {值是一个回调 回调中药return { }}
onHeaderCell: () => ({style:{textAlign: 'center'}})
<!--  
  onHeaderCell={() => {
  return {
    style: {
      textAlign: 'center',
      background: '#69c0ff'
    }
  }

  {
    title: '取引先名',
    dataIndex: 'company',
    key: 'company',
    onHeaderCell: () => ({style:{textAlign: 'center'}})
  },

  这特么要加在属性标签里面 疯了吧
 -->


**单元格的设置**
onCell: {值是一个回调 回调中药return { }}
回调中的参数 record(行内容), rowIndex(行index)
<!-- 
  const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    onCell: ((record, rowIndex)=>{
      if(rowIndex % 2 === 0){
        return {
            style:{
                backgroundColor: 'red', //此处需注意
            },
        };
      }
    },
    render: text => <a>{text}</a>,
  }
 -->

<br>--

# Space组件 间距
设置组件之间的间距。避免组件紧贴在一起, 拉开统一的空间。
适合行内元素的水平间距。可以设置各种水平对齐方式。
使用方式: 
<Space>其他组件</Space>
属性: 
direction:  vertical | horizontal
    间距方向
<!-- 
   <Space direction="vertical">
 -->


size:   'small' | 'middle' | 'large' | number
    间距大小
    size={[8, 16]} wrap(换行)
<!-- 
  <Space size={size}>
 -->


align:   start | end |center |baseline
    对齐方式

<br>--

# Form组件
表单组件也好难啊
首先要从antd中引入
import { Form, Input, Button, Checkbox } from 'antd';

**组件**
我们看下Form组件都有什么样的属性, 这里先说下我们html中的form的name通常都是保存用户输入的数据, 也是服务器中的字段名

下面的属性在 标签属性中使用 用来配置整个表单的样式

className:
    用于给form表达添加样式

name: 
    From组件的id

autoComplete="off"
    取消自动显示输入历史
<!-- 
  <Form autoComplete = "off">
 -->


colon: true / false
    用于配置 Form.Item组件 的 colon 的默认值。表示是否显示 label 后面的冒号
    colon={true}


component:  true / false
    为 false 则不创建 DOM 节点 页面会报错


initialValues:  值是一个对象{{ }}
    表单内部元素的初始值 
    语法: 
      initialValues={{ remember: true, }}
    作用: 
    表单内部元素的默认值, 只有初始化以及重置时生效, 通过表单内部元素的nama来找对对应的元素 并配置默认值
<!-- 
  // 表单内部的一个子元素 name是remember
  <Form.Item name="remember">
    <Checkbox>Remember me</Checkbox>
  </Form.Item>

  // Form组件通过name找到  指定的 Form.Item 组件 并设置它的默认值
  <Form initialValues={{ remember: true, }}>
 -->


labelAlign:   left | right
    label 标签的文本对齐方式


labelCol:  值是一个对象 {span: 3, offset: 12}
    同 <Col> 组件 设置 span offset 值 或 sm: {span: 3, offset: 12}
<!-- 
  labelCol={{ span: 8 }}
 -->


wrapperCol
    用法同 labelCol
    需要为输入控件设置布局样式时, 使用该属性


layout: horizontal | vertical | inline
    表单布局
<!-- 
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

  <Form {...layout}>
 -->


scrollToFirstError: 
    提交失败自动滚动到第一个错误字段


validateMessages
    验证提示模板


validateTrigger
    统一设置字段触发验证的时机


表单事件: 
  - onFieldsChange:  字段更新时触发回调事件
      function(changedFields, allFields)

  - onFinish:  提交表单且数据验证成功后回调事件
      function(values)

  - onFinishFailed:  提交表单且数据验证失败后回调事件
      function({ values, errorFields, outOfDate })

  - onValuesChange:  字段值更新时触发回调事件
      function(changedValues, allValues)


**注意:**
Form组件中的按钮必须要指定 htmlType="submit"  要不Form组件身上的onSubmit事件不会触发
<!-- 
  onSubmit={this.handleSubmit}

  <Button 
    type="primary" 
    htmlType="submit" 
    className="login-form-button">
    登录
  </Button>
 -->


**<Form.Item>**
Form表单内部的每一个子项 用于包裹真正的DOM元素比如text checkbox等
<!-- 
  <Form.Item>
    <Input>
  </Form.Item>
 -->

如果一个 <Form.Item> 内部控件前后还有一些文案或样式装点 或者一个表单项内有多个控件, 你可以使用内嵌的 Form.Item 完成
noStyle 内部嵌套的 <Form.Item> 里面要添加 noStyle 要不然垂直部分有间距
<!-- 
<Form.Item label="Field">

  // 直接包裹才会绑定表单
  <Form.Item name="field" noStyle>
    <Input />
  </Form.Item> 

  <span>description</span>
</Form.Item>
 -->



name:
    字段名, 支持数组


valuePropName:
    子节点的值的属性, 如 Switch 的是 'checked'。该属性为 getValueProps 的封装, 自定义 getValueProps 后会失效
    不知道啥意思


colon:  
    配合 label 属性使用, 表示是否显示 label 后面的冒号
    label属性也是写在<Form.Item label>里面的


label:  label 标签的文本
<!-- 
  <Form.Item
    label="Username"
    name="username"
  >
    <Input />
  </Form.Item>
 -->


labelAlign:   left | right
    标签文本对齐方式


labelCol:   {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
    label 标签布局, 同 <Col> 组件, 设置 span offset 值


wrapperCol: 
    需要为输入控件设置布局样式时, 使用该属性, 用法同 labelCol。
    你可以通过 Form 的 wrapperCol 进行统一设置, 不会作用于嵌套 Item。当和 Form 同时设置时, 以 Item 为准


rules:  数组
    里面应该是对Form.Item每一个子元素的规则 所以是一组组的对象
    校验规则, 设置字段的校验逻辑。

    len: 
      string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度

    min:
    max: 
      必须设置 type: string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度

    message:
        错误信息, 不设置时会通过模板自动生成

    pattern
        正则表达式匹配

    transform
        将字段值转换成目标值后进行校验

    whitespace
        如果字段仅包含空格则校验不通过, 只在 type: 'string' 时生效

    validator
        自定义校验, 接收 Promise 作为返回值
        写在rules里面 (rule, value) => Promise
    <!-- 
      rules={[
        {
          validator: this.validateUser
        }
      ]}

      validateUser = (rule, value) => {

        if(value.length >= 6 && value.length<=10) {

            // 返回的必须是promise对象 不传东西代表验证通过
            return Promise.resolve()
        }else{
            return Promise.reject('密码长度必须是6~10位')
        }

      }
     -->


required: 
    必填样式设置。如不设置, 则会根据校验规则自动生成
<!-- 
  rules={[
    {
      required: true,
      message: 'Please input your username!',
    },
  ]}
 -->


validateFirst:    boolean | parallel
    当某一规则校验不通过时, 是否停止剩下的规则的校验。   
    设置 parallel 时会并行校验


validateStatus:  string
    校验状态, 如不设置, 则会根据校验规则自动生成, 可选: 'success' 'warning' 'error' 'validating'


validateTrigger
    设置字段校验的时机
    validateTrigger='onBlur / onFocus / onChange'
    还可以写 'onBlur | onFocus'


dependencies: 
    设置依赖字段




**注意:**
**Form.Item组件 设置 name 后 需要注意的地方**
被设置了 name 属性的 Form.Item 包装的控件, 表单控件会自动添加 value onChange(或 trigger 指定的其他属性), 数据同步将被 Form 接管, 这会导致以下结果: 

  - 1. 你不再需要也不应该用 onChange 来做数据收集同步 但还是可以继续监听 onChange 事件。
  <!-- 
    收集数据应该使用 Form 的 onValuesChange 事件
   -->

  - 2. 你不能用控件的 value 或 defaultValue 等属性来设置表单域的值, 默认值可以用 Form 里的 initialValues 来设置。
  <!-- 
    注意 initialValues 不能被 setState 动态更新 
    需要用 setFieldsValue 来更新
  -->

  - 3. 你不应该用 setState, 可以使用 form.setFieldsValue 来动态改变表单值。


**dependencies **
当字段间存在依赖关系时使用
如果一个字段设置了 dependencies 属性。那么它所依赖的字段更新时, 该字段将自动触发更新与校验。

应用场景
注册用户表单的"密码"与"确认密码"字段。"确认密码"校验依赖于"密码"字段, 设置 dependencies 后, "密码"字段更新会重新触发"校验密码"的校验逻辑。

注意事项
dependencies 不应和 shouldUpdate 一起使用, 因为这可能带来更新逻辑的混乱。


**shouldUpdate**
当 shouldUpdate 为 true 时, Form 的任意变化都会使该 Form.Item 重新渲染。
<!-- 
  <Form.Item shouldUpdate>
 -->

当 shouldUpdate 为方法时, 表单的每次数值更新都会调用该方法, 提供原先的值与当前的值以供你比较是否需要更新。
<!-- 
  <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
    {() => {
      return (
        <Form.Item name="other">
          <Input />
        </Form.Item>
      );
    }}
  </Form.Item>
 -->


**组件**
input输入框类
import { Input } from 'antd';
我发现所有标签上都可以有style={{属性}}

下面是两种写法
<Input.TextArea></Input.TextArea>

const { TextArea } = Input;
<TextArea></TextArea>

属性: 
addonAfter:  带标签的 input, 设置后置标签
addonBefore:  带标签的 input, 设置前置标签
defaultValue: 输入框默认内容
<!-- 
  <Input 
    addonBefore="http://" 
    addonAfter=".com" 
    defaultValue="mysite" 
  />
 -->
    

allowClear: boolean
    可以点击清除图标删除内容

bordered: boolean
    是否有边框


disabled:
    是否禁用状态, 默认为 false


maxLength:  number
    最大长度


prefix:   
    带有前缀图标的 input

suffix: 
    带有后缀图标的 input


size:  large | middle | small
    控件大小。注: 标准表单内的输入框大小限制为 large


onChange: 
    输入框内容变化时的回调


onPressEnter
    按下回车的回调


**Input.TextArea**
属性: 
allowClear:   boolean
    可以点击清除图标删除内容


autoSize:   boolean | object
    自适应内容高度, 可设置为 true | false 或对象: { minRows: 2, maxRows: 6 }


bordered:   boolean
    是否有边框


defaultValue: 
    输入框默认内容


showCount
    是否展示字数


onPressEnter
    按下回车的回调


onResize
    resize 回调


**<Input.Search>**
**<Input.Group>**
**<Input.Password>**
**Input Methods blur focus**

<br>--

# Button组件
type: primary / dashed / danger / link / ghost / default / text
不写type就是默认框

<br>--

# Message组件
也是引入后使用
<!-- 
  message.success(content, [duration], onClose)
  message.error(content, [duration], onClose)
  message.info(content, [duration], onClose)
  message.warning(content, [duration], onClose)
  message.warn(content, [duration], onClose) // alias of warning
  message.loading(content, [duration], onClose)
 -->

<br>--

# Card组件
通用卡片容器。最基础的卡片容器, 可承载文字、列表、图片、段落, 常用于后台概览页面。
<Card title="卡片标题">卡片内容</Card>

属性: 
  - bodyStyle:    CSSProperties
    内容区域自定义样式

  - bordered:     	boolean
    是否有边框

  - defaultActiveTabKey   string	第一个页签
    初始化选中页签的 key, 如果没有设置 activeTabKey

  - headStyle:    CSSProperties
    自定义标题区域样式
<!-- 
  <Card 
    title={title} 
    extra={extraNode}
    headStyle={{fontSize: '14px', fontWeight: 400}}
  >
 -->

  - hoverable   	boolean	false	
    鼠标移过时可浮起

  - size    default | small	default	
    card 的尺寸

  - title  	ReactNode
    卡片标题 card组件上部分文本

  - extra   ReactNode
    卡片右上角的操作区域 More部分的 或者可以定义成按钮

  - onTabChange   	(key) => void
    页签切换的回调

<br>--

# Modal对话框
https://ant.design/components/modal-cn/
有点像 confirm 的效果

属性: 
  - afterClose:  function
    Modal 完全关闭后的回调

  - bodyStyle:  CSSProperties
    Modal body 样式

  - cancelText:   	ReactNode  默认值 取消
    取消按钮文字

  - okText
    确认按钮文字

  - okType    string	primary
    确认按钮类型

  - centered	    boolean	  false	
    垂直居中展示 Modal	

  - closable      boolean
    是否显示右上角的关闭按钮

  - mask:     	boolean
    是否展示遮罩

  - maskClosable  boolean
    点击蒙层是否允许关闭

  - visible:    	boolean
    对话框是否可见

  - title
    标题 提示内容

  - width
    宽度

  - wrapClassName
    对话框外层容器的类名

  - zIndex
    设置 Modal 的 z-index

  - onCancel
    点击遮罩层或右上角叉或取消按钮的回调

  - onOk
    点击确定回调

  - destroyOnClose
    关闭时销毁 Modal 里的子元素
    用于重新渲染里面最新的元素 很有用

**使用方式1 调用函数confirm**
这个Modal是一个函数 函数的话 就需要给按钮绑定点击事件 这个就相当于事件的回调吧
点击的时候出现对话框
<!-- 
  function showConfirm() {

    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
 -->


** 写成标签的格式 **
试用于对话框内有复杂的结构

<br>--

# Select组件
属性: 
  defaultValue:   
      string | string[] number | number[] LabeledValue |  LabeledValue[]
      指定默认选中的条目

Option
属性: 
  className	
      Option 器类名	

  disabled
      是否禁用

  title
      选中该 Option 后, Select 的 title

  value
      默认根据此属性值进行筛选

<br>--

#  Icon组件
4.x以后没有<Icon>这样的写法了 我们要使用的话 要从下面引入
<!-- 
  import { 引入组件 } from '@ant-design/icons';
 -->

属性: 
  - rotate:   number
    图标旋转角度(IE9 无效)

  - spin    	boolean
    是否有旋转动画

  - style     	CSSProperties
    设置图标的样式, 例如 fontSize 和 color

  - className   设置图标的样式名

  - twoToneColor	string (十六进制颜色)
    仅适用双色图标。设置双色图标的主要颜色
<!-- 
  import { PlusOutlined } from '@ant-design/icons'
  <PlusOutlined />
 -->

<br>--

# Antd布局
**设计规则**
顶部导航(大部分系统): 一级导航高度 64px, 二级导航 48px。
顶部导航(展示类页面): 一级导航高度 80px, 二级导航 56px。
顶部导航高度的范围计算公式为: 48+8n。
侧边导航宽度的范围计算公式: 200+8n。

12px、14px 是导航的标准字号, 14 号字体用在一、二级导航中。字号可以考虑导航项的等级做相应选择。

<br>--

# 布局组件的使用
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

**Layout**
整体的一大片布局 比如我们页面中就有两个layout 外面一个 里面一个 里面的包裹了 上中下三个部分 Header Content Footer
属性: 
  className 
      容器 className

  style
      指定样式


**Sider**
侧边栏
属性: 
  className:  string
      容器 className

  style
      指定样式

  width
      宽度

  theme:  light | dark
      主题颜色	

  reverseArrow:  boolean
      翻转折叠提示箭头的方向, 当 Sider 在右边时可以使用

  collapsed:  	boolean
      当前收起状态

  breakpoint:  触发响应式布局的断点

<br>--

# Menu菜单 组件
我们先来了解一下 菜单组件的概念
菜单可能是多级的结构
那它会分成菜单 菜单项 和 子菜单(如果一个菜单项是一个子菜单的话)
<!-- 
  Menu        是菜单组件
  Menu.Item   是菜单项
  SubMenu     子菜单  

  SubMenu 子菜单通过title属性来指定 显示的文字
 -->

菜单组件的每一项都要按类别指定 key 的值

**Menu**
属性: 
  - 初次 和 动态选中功能
  defaultSelectedKeys: string[]
    - 写的是对应的key的值
    初始选中的菜单项 key 数组
    defaultSelectedKeys={['1']}

  selectedKeys:  string[]
    当前选中的菜单项 key 数组
    这个跟上面的相比 它是动态的 指定什么值就会根据这个值动态的去匹配 而defaultSelectedKeys值会在初始的时候匹配一次

  - 初次 和 动态 展开谁
    defaultOpenKeys:  string[]
    初始展开的 SubMenu 菜单项 key 数组 最开始的时候展开哪个菜单项
    defaultOpenKeys={['sub1']}


<br>

# antd的按需引入css样式
上面我们只引入了几个按钮和几个图标, 但却把所有的样式都引入进来了 这个文件是很大的
<!-- 
  import 'antd/dist/antd.css'
 -->

其实我们应该是用到哪个组件的样式 我们就引入哪个组件的样式 叫做按需引入
我们在查看antd的文档的时候 推荐查看3.x的版本, 4.x的版本的介绍不是那么的详细
我们只要看 create-react-app中使用的 选项卡
<!-- 
  https://3x.ant.design/docs/react/use-with-create-react-app-cn
 -->

那怎么按需引入样式呢？
我们先看看怎么暴露默认文件
<!-- 
  我们需要对 create-react-app 的默认配置进行自定义 可配置在哪呢？
  react将webpack的配置隐藏了, 那怎么开启将隐藏的配置暴露出来了呢？

  > 命令: 
  - 用于暴露隐藏的配置, 但是一旦暴露出来之后就没办法回去了 会将react的核心配置都暴露出来 包括webpack的核心配置
  npm eject

  上面的命令完事后 项目文件夹中会多两个文件夹
  1. config
      这里所有的东西都是支撑脚手架运行的

  2. script
 -->

但是更改上面的配置文件很可能会引发其他的问题, 我们并不推荐在webpack里面更改配置
我们使用文档推荐的方式 修改配置文件, 达到按需引入的效果


**1. 下载所需要的依赖库**
npm i react-app-rewired customize-cra
<!-- 
  react-app-rewired   这个库的用作是, 在默认配置被修改后启动脚手架的库
  customize-cra       这个库的作用是执行修改配置的
  
  如果使用了customize-cra这个库按照config-overrides.js的规则修改了脚手架
  我们就不能用脚手架中原来启动脚手架的命令了

  我们启动脚手架 上面一直使用的是
  npm start 
      这个短命令对应着 "start": "react-scripts start",
      使用这个短命令的前提是 我们的脚手架不能被修改 如果我们把脚手架的规则改了 我们就不能用原来的方式启动脚手架了 我们就必须要使用 react-app-rewired 这个库启动脚手架
 -->


**2. 修改package.json文件**
我们修改react的默认配置后 我们就要修改启动命令
<!-- 
  -   "start": "react-scripts start",
  +   "start": "react-app-rewired start",
  -   "build": "react-scripts build",
  +   "build": "react-app-rewired build",
  -   "test": "react-scripts test",
  +   "test": "react-app-rewired test",

  - 是原先的
  + 是我们要修改成的样子
 -->


**3. 创建 config-overrides.js 文件 里面告诉react我们要修改什么配置**
用于说明我们要改谁, 改成什么样子 这个文件只是用来写规则
写完的规则我们就要执行规则, 那么就需要这个库 customize-cra
这个库就是专门找到这个文件来进行修改的

1. 我们要在项目的根目录创建config-overrides.js 文件
<!-- 
  跟package.json同级的目录 
-->

2. 在这个文件中我们要需要下载 引入 babel-plugin-import
<!-- 
  babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件(原理)
 -->

下载:
  - npm i babel-plugin-import

下载后复制下面的东西到js文件内
<!-- 
  // 配置具体的修改规则
  const { override, fixBabelImports } = require('customize-cra');

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
  );

  // import 指定使用bael-plugin-imoprt工具包
  // antd   我们要做antd的按需引入
  // es     antd里面用了es的模块化规范
  // css    我们要按需引入的是css 自动打包css样式

  fixBabelImports 功能是根据 import 来按需加载css样式
 -->

3. 我们在App.jsx里面不要自己引入antd的样式了
<!-- 
  - import 'antd/dist/antd.css'     - 是删掉的意思
 -->

<br>

# antd自定义主题
antd的主题颜色 我们会发现整个网站的配色都是蓝色为主, 我们可以修改antd主题颜色的变量, antd所有的样式都是使用less写的

我们的目的是去找到官方在less里面写的主题的颜色 我们将管颜色的变量改掉就可以了


**修改主题**
使用老师的方式最后会报错, 我们需要删掉之前看视频的时候安装的less版本 换了less版本后就好了 如果是less的版本高了

**1. 安装less 和 less-loader**
npm i less@3.12.2 less-loader@7.1.0


**2. config-overrides.js文件中加入规则**
<!-- 
  结合上面的按需引入 我们往里面加了修改主题的配置

  // 配置具体的修改规则
  const { override, fixBabelImports, addLessLoader } = require('customize-cra');

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,       // 更改主题 修改antd的源码文件
      // style: 'css',   // 按需引入 
    }),

    // 更改主题
    addLessLoader({
      javascriptEnabled: true,

      // 修改存储主题颜色的变量值
      modifyVars: { '@primary-color': 'red' },
    })
  );
 -->

**比较棘手的报错问题**
文档是旧的写法 lessloader其实已经更新了
<!-- 
  在使用框架的时候 我们有的时候会碰到一些报错, 但是像下面的错误就比较棘手 因为都是框架的底层问题, 并不是我们编码的过程当中逻辑代码出问题了

  /Users/liulin/Desktop/Sam/node_modules/antd/es/space/style/index.less (./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-8-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--5-oneOf-8-3!./node_modules/less-loader/dist/cjs.js??ref--5-oneOf-8-4!/Users/liulin/Desktop/Sam/node_modules/antd/es/space/style/index.less)
  TypeError: this.getOptions is not a function
 -->


**总结:**
我们总结一下这节的内容, antd的按需引入和自定义主题

1. npm i react-app-rewired customize-cra babel-plugin-import less less-loader

2. 修改package.json
<!-- 
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
 -->

3. 根目录下创建config-overrides.js文件
<!-- 
  // 配置具体的修改规则
  const { override, fixBabelImports, addLessLoader } = require('customize-cra')

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,       // 更改主题
      // style: 'css',   // 按需引入
    }),

    // 更改主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,

        // 修改存储主题颜色的变量值
        modifyVars: { '@primary-color': 'red' }
      }
    })
  );
 -->

4. 不用再组件里亲子引入样式了
<!-- 
  比如 import 'antd/dist/antd.css' 删掉
 -->

<br>----

**官方网站的解决方式 注意这不是老师教的 上面的也好用 减低less版本后**
**修改主题**
1. 安装 craco 并修改 package.json 里的 scripts 属性
npm i @craco/craco
npm i craco-less

2. 修改package.json文件
<!-- 
  "scripts": {
  -   "start": "react-scripts start",
  -   "build": "react-scripts build",
  -   "test": "react-scripts test",
  +   "start": "craco start",
  +   "build": "craco build",
  +   "test": "craco test",
  }
 -->

3. 首先把 src/App.css 文件修改为 src/App.less, 然后修改样式引用为 less 文件。
<!-- 
  /* src/App.js */
  - import './App.css';
  + import './App.less';


  /* src/App.less */
  - @import '~antd/dist/antd.css';
  + @import '~antd/dist/antd.less';
 -->

4. 项目根目录创建一个 craco.config.js 用于修改默认配置。
跟package.json文件一个层级
<!-- 
  // 修改 craco.config.js 文件
  const CracoLessPlugin = require('craco-less');

  module.exports = {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { '@primary-color': '#1DA57A' },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };
 -->

<br>

# Antd-moblile的基本使用
移动端的UI两家 一家公司出的

官方网站: 
https://mobile.ant.design/docs/react/use-with-create-react-app-cn

下载: 
npm i antd-mobile

基本使用: 
1. 和上面的一样 导出要使用的组件 然后在页面中使用
2. 引入css样式
<!-- 
  import { Button } from 'antd-mobile';
  import 'antd-mobile/dist/antd-mobile.css'
 -->


**按需引入**
可以参考上面的antd的代码
需要修改 libraryName 为 antd-mobile

按需引入后删除 antd-mobile的整体css样式

**修改主题颜色**
需要修改 modifyVars 为
{ '@brand-primary': 'red', '@brand-primary-tap': 'red'}

分别是展示色 和 点击色

<!-- 
  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,       // 更改主题
      // style: 'css',   // 按需引入
    }),

    // 更改主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,

        // 修改存储主题颜色的变量值
        modifyVars: { '@primary-color': 'red' }
      }
    })
  );
 -->

<br>

**总结**

1. 生命周期中的回调要用箭头函数, 不然this会有undefined的问题, 那就不能通过this取到实例中的数据 比如 this.state
<!-- 
  componentDidMount() {
    setTimeou(function() {})    如果这里使用function 那么this就是undefined
  }
 -->


2. 不能往页面中放对象
<!-- 
  <span>现在是: {typeof this.state.date}</span>

  会报错 因为 date: new Date() 是一个对象

  // 报错信息
  Objects are not valid as a React child
 -->


3. 注意 页面想要有变化要修改state里面的数据, 不要想着直接对什么操作, 先继承面向state开发

4. 父给子传递数据, 我们通过标签属性传递
<!-- 
  <Son name='sam'/>
 -->

5. 子传父 让父组件通过标签属性 传递一个处理函数, 子组件通过实参传递数据, 父组件中的函数通过形参, 转移数据或者更新状态

6. 更新state中的状态, 可以定义一个新的数组或者对象, 然后将新的数组对象组成自己想要的样子, 然后将整个对象, 覆盖掉state中的数据

7. 我们要使用confirm的时候 要在前面加上winodw.

8. disable对移动端的点击事件不起作用

9. 我们想改变什么做什么效果 都是根据state中的变量来做判断

10. 动态决定 提示信息 利用了三元表达式 和 字符串的拼接
<!-- 
  // 完善下: 统一提示 不然多次提示 用户体验不好
  // 这个this是实例对象 我们在实例对象身上维护两个变量 默认没有错误
  this.telErr = false
  this.codeErr = false

  // 当不对的时候 将我们维护的变量修改为 true
  if(!tel) this.telErr = true
  if(!code) this.codeErr = false

  // 利用三元 动态 拼接 错误提示信息
  let errMsg = '请输入合法的'
  errMsg += this.telErr ? '手机号' : '' 
  errMsg += this.codeErr ? '验证码' : '' 

  if(this.telErr || this.codeErr) Toast.fail(errMsg, 2)
 -->

**总结**