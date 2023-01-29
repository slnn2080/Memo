# XML
xml是可扩展的标记性语言 可扩展是指xml中的标签都不是html中定义好的标签, **标签是自定义的**

<br>

### 作用: 
我们不仅仅可以将数据保存到数据库, 还可以将数据保存到 XML 文件中

XML文件具有以下的作用:

1. xml的主要作用是 用来保存数据 而且这些数据**具有自我描述性**

2. 它还可以作为项目或者模块的配置文件, 很多框架的配置文件都是xml

3. 还可以作为网络传输数据的格式(现在JSON为主)

<br>

**XML文件保存数据格式:**   
比如 我们有这样的数据要存储起来 

- Student[id=1, name="华仔"]
- Student[id=2, name="张三"]

类似我们创建了一个js对象, 只不过是用 标签的形式来体现key-value

标签名: 相当于 key  
标签体: 相当于 value

```xml
<students>
  <student>
    <id>1</id>
    <name>华仔</name>
  </student>

  <student>
    <id>2</id>
    <name>张三</name>
  </student>
</students>
```

<br><br>

## XML语法

### XML文件的声明
```xml
<?xml version="1.0" encoding="UTF-8" ?>
```

- version xml的版本 一直没有变过
- encoding 文件的编码

<br>

### 标签属性:  
我们可以自定义标签属性

我们可以利用下面的两种方式体现一个对象中的key value
- 标签嵌套的形式
- 单标签的自定义标签属性的形式

```xml
<!-- 文件声明 -->
<?xml version="1.0" encoding="utf-8" ?>

<books>
  <!--自定义的标签属性 sn图书的序列号-->
  <book sn="SN12234234">
    <name>时间简史</name>
    <author>霍金</author>
    <price>100</price>
  </book>

  <!--单标签-->
  <book 
    sn="SN12234234" 
    name="辟邪剑法" 
    author="林平之"
  />
</books>
```

<br>

**标签属性作用:**  
xml的标签属性和html的标签属性时非常类似的 属性可以提供元素的额外信息

<br>

**要点:**  
一个标签上可以书写多个属性 每个**属性的值**必须使用 引号 引起来

<br>

### XML标签的命名规范
1. 名称可以包含字母 数字 以及其它字符(中文都可以)
2. 名称不能以字符"xml"开始(它是可以的)
3. 名称不能包含空格
4. **标签必须都要关闭**
5. xml对大小写敏感
6. 标签必须正确的嵌套
7. **文档必须有根元素** 根元素是没有父标签的顶级元素 而且是唯一的一个才行, 比如vue template标签里面的 ``<div>``

8. 标签体中的符号要转义
```xml
<books>
  <book sn="SN123456">
    <!-- 这里报错了 <> 是语法 -->
    <author><霍金></author>

    <!-- 我们要转义 -->
    <author>&lt;霍金&gt;</author>
  </book>
</books>
```

<br>

### CDATA语法:
该语法可以告诉xml解析器 CDATA里面的文本内容不需要xml解析, 里面只是普通文本而已

<br>

**格式:**  
```xml
<![CDATA[ 文本内容 ... ]]>
```

<br>

**场景:**  
写在内部的文本是不会被xml解析, 是啥样就是啥样, 比如当我们有大量的需要转义的字符的时候可以使用

```xml
<!-- 里面的<内容> 不会被解析为标签 -->
<author>
  <![CDATA[
    <<<<<<<<沙老师>
  ]]>
</author>
```

<br><br>

# Java 读取 XML 中的内容

## xml解析技术介绍
我们说可以把数据保存在xml文件当中 比如配置文件, 那么当我们的程序在启动的时候 需要读取配置文件(xml)中保存的数据是吧

而读取XML中的数据, 转换为我们需要使用的数据(如参数) 这个过程就是解析

<br>

不管是html文件还是xml文件都是标记型语言都可以使用w3c组织制定的**dom技术来解析**, 也就是说所有的标签都会被解析成对象

也就是说 我们在xml中写的标签 最终都会被解析成dom dom都会有document对象 该对象就表示了整个文档

xml文件也会有 **document对象**

<br>

早期JDK为我们提供了两种xml解析技术:
- DOM (废弃)
- SAX (废弃)

**dom解析技术是w3c组织制定的** 而所有的编程语言都对这个解析技术使用了自己语言的特点进行了实现 java对dom技术也做了实现

sun公司在jdk5版本的时候 对dom解析技术进行了升级: 
- SAX (simple api for xml)

SAX解析 它跟w3c制定的解析不太一样 它是以类似事件机制通过回调告诉用户当前正在解析的内容 

它是一行行的读取xml文件进行解析 不会创建大量的dom对象
所以它在解析xml的时候 在内容的使用 和 性能上 都优于DOM解析

<br>

### 第三方解析xml技术:
- jdom: 在 dom 基础上进行了封装
- dom4j: 又在 jdom 进行了封装, **使用起来更加的简单**
- pull:  
主要用在 android手机 开发 是在跟sax非常类似都是事件机制解析xml文件

<br>

这个*dom4j*它是第三方的解析技术 我们需要使用第三方给我们提供好的类库才可以解析xml文件


### dom4j 解析技术:
很多框架的底层都是使用 dom4j 来解析XML的  

dom4j是第三方的解析技术, 所以要下载它的jar包, 使用其内部的类库

<br>

**官方:**  
```
https://dom4j.github.io/
```

- java1.4: 使用 dom4j 1.6.1 版本
- java5+: 使用 dom4j 2.0.3 版本 
- java8+: 使用 dom4j 2.1.3 版本

<br>

**jar内的目录结构:**
``` 
| - docs   
  - index.html 文档

| - lib  
  这里是dom4j所需要的jar包 

| - src
  这里是dom4j的源码 测试 样例的源码

| - xdocs
| - xml

- build.xml
- dom4j-1.6.1.jar
- maven.xml
- project.rpoperties
- project.xml
```

<br>

### 下载 jar 包
我们将下载好的jar包放入项目下, 并添加到lib中

| - src
  | - lib
    - dom4j-1.6.1.jar

选择我们要添加的jar包 右键 选择 add as Library...

<br>

**扩展:**  
测试需要用到的类库如下 也需要添加到lib文件目录下(但好像不用啊)

<br>

- hamcrest-core-1.3.jar
- junit-4.12.jar

<br>

### 解析步骤:

**要解析的目标文件:** 
```xml 
<?xml version="1.0" encoding="UTF-8"?>
<books>
  <book sn="SN12341232">
    <name>辟邪剑谱</name>
    <price>9.9</price>
    <author>班主任</author>
  </book>

  <book sn="SN12341231">
    <name>葵花宝典</name>
    <price>99.99</price>
    <author>班长</author>
  </book>
</books>
```

<br>

**创建跟xml文件中对应的JavaBean: 创建Book类**  
上面的xml文件中 books 下 有两个 book, 每一个book标签我们会解析成对应Java层面的对象

所以我们要准备好 Book的JavaBean 用来承装我们解析出来的数据

**要点:**  
<font color="#C2185B">不管是xml标签的标签属性 还是 标签嵌套格式的 都可以封装到Java类中的一个属性</font>

```xml
<!-- 不管是 sn 还是 name 都是java类中的属性 -->
<book sn="asdfasdf">
  <name>Java</name>
</book>
```

<br>

```java
package com.sam.testxml;

import java.math.BigDecimal;

public class Book {

  // 标签属性
  private String sn;

  // 嵌套标签
  private String name;
  private String author;

  // 小数使用 BigDecimal
  private BigDecimal price;

  // 上面的两种都作为Java类中的属性出现

  // 所有属性的get set
  // 空参 有参构造器
  // toString()
}
```

<br>

### 使用 dom4j 解析 xml 文件:
我们通过 dom4j 给我们提供的 SAXReader类 来实现读取xml文件

**步骤1: 创建 SAXReader 对象**  
```java
SAXReader saxReader = new SAXReader();
```  

<br>

**步骤2: 通过 saxReader.read(xml路径) 方法读取xml文件**  
该方法读取xml文件后会返回 document 对象

```java
SAXReader saxReader = new SAXReader();
Document document = saxReader.read("src/books.xml");
```

**返回值:**  
Document

<br>

**异常:**  
DocumentException

<br>

**步骤3: 通过 document对象的方法 获取根节点**  
也就是获取 books.xml 文件中的 根标签 
```xml
<books>   <!-- ← 获取它-->
  <book></book>
  <book></book>
</books>
```

<br>

**<font color="#C2185B">document.getRootElement()</font>**  
获取 根标签

**返回值:**  
Element

```java
Element rootElement = document.getRootElement();
System.out.println(rootElement); 
// [Element: <books attributes: []/>]
```

<br>

**步骤4: 通过 根标签 获取它内部节点对象**  
```xml
<books>
  <book></book> <!-- ← 获取它-->
  <book></book>
</books>
```

<br>

**<font color="#C2185B">rootElement.elements("标签名")</font>**  
通过 标签名 获取指定节点的对应**子元素**

根据指定的标签名, 返回对应元素节点的集合

**返回值:**  
``List<Element>``

```java
List<Element> book = rootElement.elements("book");
```
 
<br>

**<font color="#C2185B">rootElement.element("标签名")</font>**  
通过 标签名 获取指定节点的对应**子元素**

根据指定的标签名, 返回对应元素节点

**返回值:**  
Element


```java
List<Element> books = rootElement.elements("book");
for (Element book: books) {
  // 每一个book 对应着 xml文件中的一个<book>
}
```

<br>

**步骤5: 遍历节点结合 拿到每一个标签对象 将其转换为Java类**  
上面我们遍历 List 获取到 每一个 ``<book>`` 也就是 ``Element book`` 节点对象后 

```xml
<book sn="SN12341231">
  <name>葵花宝典</name>
  <price>99.99</price>
  <author>班长</author>
</book>
```

<br>

获取到 book 对象后, 我们分别要读取下面对应的值
- sn
- name
- price
- author 

我们通过两种方式

<br>

**方式1:**  
**<font color="#C2185B">节点.element("标签名")</font>**  
通过 element() 方法获取它的指定子元素
```java
// 获取到 <name> 子元素
Element nameEl = book.element("name");
```

<br>

**<font color="#C2185B">节点.getText()</font>**  
获取 该节点的内容
```java
// 获取name标签对象中的文本
String nameElText = nameEl.getText();
```

<br>

**方式2:**  
**<font color="#C2185B">节点.elementText("标签名")</font>**   
获取 节点指定子元素的文本内容

**返回值:**  
String

```java
String priceText = book.elementText("price");
```

<br>

**获取节点的标签属性值:**  
**<font color="#C2185B">节点.attributeValue(标签属性名)</font>**   
获取标签中自定义属性对应的 value
```java
String sn = book.attributeValue("sn");
```

<br>

**扩展: 将节点变成字符串:**  
**<font color="#C2185B">节点.asXML()</font>**   
将标签对象转换为字符串, 类似js里面的toString()

比如我们想输出这个节点的内容 就可以调用该方法

```java
System.out.println(book.asXML());

/*
  // 输出结果
  <book sn="SN12341232">
    <name>辟邪剑谱</name>
    <price>9.9</price>
    <author>班主任</author>
  </book>
*/
```

<br>

### 完整代码
```java
@Test
public void test() throws Exception {

  // 创建 SAXReader 输入流 读取 xml 配置文件 生成 document对象
  SAXReader saxReader = new SAXReader();
  Document document = saxReader.read("src/books.xml");
  
  // 获取根节点
  Element rootElement = document.getRootElement();

  // 通过标签名获取对应标签节点的集合
  List<Element> books = rootElement.elements("book");

  // 遍历 List 拿到每个book节点对象 转换为 Book类
  for (Element book : books) {
    // 获取 book标签的自定义属性 sn 对应的值
    String sn = book.attributeValue("sn");

    // 获取 book标签下 name标签的内容
    String name = book.elementText("name");
    String priceText = book.elementText("price");
    String author = book.elementText("author");

    // 将 字符串型的 price -> double类型 然后丢进入
    double price = Double.parseDouble(priceText);

    // 利用构造器将获取到的数据 封装成一个对象
    Book bookInstance = new Book(sn, name, price, author);
    System.out.println(bookInstance);
  }
}

// Book{sn='SN12341232', name='辟邪剑谱', author='班主任', price=9.9}

//Book{sn='SN12341231', name='葵花宝典', author='班长', price=99.99}
```

<br>

### 另一种解析xml的方式:
导包的都是 import org.w3c.dom 中的
```java
try {
  // 1. 读取配置文件 获取输入流
  InputStream is = getClass().getClassLoader().getResourceAsStream("application.xml");


  // 2. 创建 document 对象
  DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();

  DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();

  // 上面的两个api就是为了得到它
  Document document = documentBuilder.parse(is);

  // 拿到文档对象后 通过api获取所有的bean标签
  NodeList elements = document.getElementsByTagName("bean");

  // 循环遍历标签集合数组
  for(int i = 0; i < elements.getLength(); i++) {

    // 拿到数组中的一项, 注意api是 item(index)
    Node node = elements.item(i);

    // 判断节点的类型 然后强转为 Element 类型 因为它里面有特有的方法
    if(node.getNodeType() == Node.ELEMENT_NODE) {
      Element element = (Element) node;

      // 获取xml中标签身上的属性
      String id = element.getAttribute("id");
      String classPath = element.getAttribute("class");

      // 根据classPath创建对象 通过反射创建类的对象
      Object instance = Class.forName(classPath).getDeclaredConstructor().newInstance();

      // 组织成 key value 的形式装入 map 中
      beanMap.put(id, instance);

    }
  }

} catch (Exception e) {
  e.printStackTrace();
}
```