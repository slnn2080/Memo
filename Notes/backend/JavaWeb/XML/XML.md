### XML
- xml是可扩展的标记性语言 可扩展是指xml中的标签都不是html中定义好的标签
<!-- 
  标签是自定义的
 -->

- 作用：
- 1. xml的主要作用是 用来保存数据 而且这些数据*具有自我描述性*
- 2. 它还可以作为项目或者模块的配置文件
<!-- 很多框架的配置文件都是xml -->

- 3. 还可以作为网络传输数据的格式(现在JSON为主)

- 数据：
- 我们有这样的数据要存储起来 
  - Student[id=1, name="华仔"]
  - Student[id=2, name="张三"]

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


> XML文件的声明
- <?xml version="1.0" encoding="UTF-8" ?>
- version xml的版本 一直没有变过
- encoding 文件的编码


> 标签属性 是自定义的
- xml文件
```xml
<books>
  <!-- 自定义的标签属性 sn图书的序列号 -->
  <book sn="SN12234234">
    <name>时间简史</name>
    <author>霍金</author>
    <price>100</price>
  </book>

  <!-- 单标签 -->
  <book sn="SN12234234" name="辟邪剑法" author="林平之"/>
</books>
```


> xml文件的创建
- 1. 我们在idea中创建一个java工程(module) -- xml
- 2. 在xml module下 创建 xml文件夹
<!-- 
  -- src
  -- xml
    -- books.xml (相当于创建了一个html文件)
 -->


> xml文件的声明
- 快捷键 < 先输入这个
```xml
<?xml version="1.0" encoding="utf-8" ?>
<!-- 这就是 xml 的声明 -->
```

- version: xml的版本 一直是 1.0
- encoding: 编码格式


> xml语法
> 注释 和 html一样

> 标签(元素)
- 元素就是标签
- 标签都是自定义的
```xml
<?xml version="1.0" encoding="utf-8" ?>

<books>
    <book sn="SN123456">
        <name>时间简史</name>
        <author>霍金</author>
        <price>75</price>
    </book>
</books>
```


> 标签属性
- xml的标签属性和html的标签属性时非常类似的 属性可以提供元素的额外信息

- 在标签上可以书写属性
- 一个标签上可以书写多个属性 *每个属性的值必须使用 引号 引起来*
```xml
<books>
  <!-- 单标签 -->
  <book 
    sn="SN12234234" 
    name="辟邪剑法" 
    author="林平之"/>
</books>
```


> 标签的命名规范
- 1. 名称可以包含字母 数字 以及其它字符(中文都可以)
- 2. 名称不能以字符"xml"开始(它是可以的)
- 3. 名称不能包含空格
- 4. *标签必须都要关闭*
- 5. xml对大小写敏感
- 6. 标签必须正确的嵌套
- 7. *文档必须有根元素* 根元素是没有父标签的顶级元素 而且是唯一的一个才行
<!-- 
  vue template div
 -->
- 8. 标签体中的符号要转义
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

- 我们我们xml文件中有大量的需要转义的字符怎么办？
- 这时候我们就需要 下面的语法

  <![CDATA[ 文本内容 ... ]]>

> CDATA语法
- 该语法可以告诉xml解析器 CDATA里面的文本内容不需要xml解析

- 格式：
> <![CDATA[ 文本内容 ... ]]>

- 快捷键
- C + Tab

```xml
<!-- <<<<这个部分 xml是不会解析的 -->
<author>
  <![CDATA[
    <<<<<<<<沙老师>
  ]]>
</author>
```


> xml解析技术介绍
- 我们把数据保存在xml文件当中 当打开xml文件的时候程序需要解析里面的数据

- 不管是html文件还是xml文件都是标记型语言都可以使用w3c组织制定的dom技术来解析

- 也就是说 我们在xml中写的标签 最终都会被解析成dom dom都会有document对象 该对象就表示了整个文档(可以是html文档 也可以是xml文档)

- xml文件也会有 *document对象*


- 早期JDK为我们提供了两种xml解析技术 DOM 和 SAX (这两种已经过时了)
- dom解析技术是w3c组织制定的 而所有的编程语言都对这个解析技术使用了自己语言的特点进行了实现 java对dom技术也做了实现

- sum公司在jdk5版本的时候 对dom解析技术进行了升级: sax(simple api for xml)
- sax解析 它跟w3c制定的解析不太一样 它是以类似事件机制通过回调告诉用户当前正在解析的内容 它是一行行的读取xml文件进行解析 不会创建大量的dom对象
- 所以它在解析xml的时候 在内容的使用 和 性能上 都由于DOM解析


> 第三方解析
- jdom 在 dom 基础上进行了封装
- *dom4j* 又对 jdom 进行了封装
- pull 主要用在 android手机 开发 是在跟sax非常类似都是事件机制解析xml文件

- 这个*dom4j*它是第三方的解析技术 我们需要使用第三方给我们提供好的类库才可以解析xml文件


> dom4j 解析技术
- 由于dom4j它不是 sun公司的技术 而属于第三方公司的技术 我们需要使用 dom4j 就需要到 dom4j官网下载dom4j的jar包

- https://dom4j.github.io/
- java1.4 -- 1.6.1
- java5+ -- 2.0.3
- java8+ -- 2.1.3

- 文件夹里面有下好的

- 目录结构
<!-- 
  | - docs   
    文档 我们可以进去找 index.html 
    然后在左侧侧边连里面点击 quick start 这就是怎么使用dom4j的参考手册

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
 -->


> 解析步骤
- 准备工作
- 我们在 xml(module) - src - 创建 books.xml 文件
- 我们使用 dom4j 对它进行解析
- 我们要将 每一个 <book> 标签 解析成一个book类
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


> 步骤
- 1. 我们要创建一个 book类 跟 <book>标签形成对应的关系
- 我们在src下创建一个package包
<!-- 
  | - src
    - books.xml
    - sam.com.xmltest
      - Book类
 -->



- 我们将每一个book标签都解析成对应的一个book类
- 在类中 我们对照着 xml 文件的 <book> 标签写属性
```xml
<book sn="SN12341232">
  <name>辟邪剑谱</name>
  <price>9.9</price>
  <author>班主任</author>
</book>
```

```java
package com.sam.testxml;

import java.math.BigDecimal;

public class Book {
  private String sn;
  private String name;
  private String author;
  private BigDecimal price;

  // 所有属性的get set
  // 空参 有参构造器
  // toString()
}
```

- 2. 跟src文件夹同级 创建lib 将dom4j-1.6.1.jar 复制进来
<!-- 
  | - src
  | - lib
    - dom4j-1.6.1.jar
 -->

- 3. 我们要把 dom4j-1.6.1.jar 加到类路径下 选择我们要添加的jar包 右键 选择 add as Library...
<!-- 
  将jar包添加到类路径

  level: 
    global library: 以后的项目也能使用
    project library: 这个工程下的每个模块都能使用
    module library: 给当前的module使用
 -->

- 4. 跟book.java同级 创建Dom4jTest.java
- 因为 我们要使用 @Test

- 所以将老师准备的 Junit4的jar包 里面的 两个jar包 也放入到 lib文件目录下 同时也添加到类路径中 这样 我们 Dom4jTest.java 类里就会自动的导包

- hamcrest-core-1.3.jar
- junit-4.12.jar

```java
package com.sam.testxml;
// 这个是我们将jar包添加到类路径下 自动导包的
import org.junit.Test;

public class Dom4jTest {
  @Test
  public void test1() {

  }
}

```

- 5. 接下来怎么操作？ 我们可以看文档
- 文档中写到 只用dom4j解析xml是一件非常简单的事情 我们直接复制文档中的代码就能实现了

**注意:**
- 下方代码如果出错 将jdk版本换成9以下
- 或者 换成 新版本的 dom4j 也可以

- 我们先看看怎么读取 xml 文件 生成 document对象
```java
package com.sam.testxml;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;
import org.junit.Test;

public class Dom4jTest {
  @Test
  public void test1() throws DocumentException {
    // 1. 创建一个 saxReader输入流 去读取xml配置文件 生成document对象
    SAXReader saxReader = new SAXReader();

    // 2. 使用 saxReader.read(xml文件路径) 读取xml文件生成document对象(在junit测试中 相对路径时从模块名开始算 src前面不要加/)
    Document document = saxReader.read("src/books.xml");
    System.out.println(document);
  }
}

```

- 2. 接下来完成全部的逻辑 读取books.xml 文件生成book类

  - 1. 读取books.xml文件
  - 2. 通过document对象获取根元素 <books> 通过这个books得到里面的每一个book

  - 3. 通过根元素获取book标签对象
  - 4. 遍历 处理每个book标签转换为Book类

> 1. 创建 saxReader 实例对象
> SAXReader saxReader = new SAXReader();

> 2. 通过实例对象.read(xml文件指定路径)
- 将xml文件读成 document对象

- 返回值:
- Document

- 异常:
- DocumentException

- 注意:
- test测试中路径是从 module开始算的 src前面不用加 /
```java
Document document = saxReader.read("src/books.xml");
```

> 3. 通过 document对象.getgetRootElement()方法
- 该方法返回 xml 文件中的根元素

- 返回值
- Element

```java
Element rootElement = document.getRootElement();
System.out.println(rootElement); 
// [Element: <books attributes: []/>]
```

> 4. 通过这个根元素books得到里面的每一个book标签对象
> 标签对象.element(String s 标签名)
- 通过标签名 查找子元素
- 当子元素有一个的时候用这个

- 返回值:
- Element

> 标签对象.elements(String s 标签名)
- 通过标签名 查找子元素
- 当子元素有多个的时候用这个

- 返回值:
- List

```java
List<Element> books = rootElement.elements("book");
for (Element book: books) {
  // 每一个book 对应着 xml文件中的一个<book>
}
```


> 拿到每一个 book Element后 测试用的
> 标签对象.asXML()
- 可以通过该方法 将标签对象 转换为标签字符串
- 该方法 相当于 console.log() 看看标签对象是啥

```java
List<Element> books = rootElement.elements("book");
for (Element book: books) {
  System.out.println(book.asXML());
}
/*
  输出结果
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
*/
```


> 获取标签对象的文本内容
> 标签对象.getText()
- 获取标签中的文本内容

- 返回值:
- String

```java
List<Element> books = rootElement.elements("book");
for (Element book: books) {
  // 每一个book 对应着 xml文件中的一个<book>
  
  // 得到 name 标签对象 <name>辟邪剑谱</name>
  Element nameEl = book.element("name");
   
  // 获取name标签对象中的文本
  String nameElText = nameEl.getText();
}
```


> 获取标签对象的文本内容
> 标签对象.elementText(String s 标签名)
- 上面是先获取子元素标签对象 然后通过子元素的标签对象调用 getText()方法 分了两步拿到的 内容

- 该方法能够 通过传入 指定标签 拿到该标签的文本内容

- 返回值:
- String

```java
List<Element> books = rootElement.elements("book");
for (Element book: books) {
  // 得到 name 标签对象
  Element nameEl = book.element("name");
  String nameElText = nameEl.getText();

  // 该方法可以直接拿到指定标签的文本内容
  String priceText = book.elementText("price");
}
```


> 获取标签对象中的属性
> 标签对象.attributeValue(String s 标签属性名)
```java
// <book sn="SN12341232">
List<Element> books = rootElement.elements("book");
for (Element book: books) {
  String sn = book.attributeValue("sn");
}
```

- 我们拿到 xml 中的信息后 就可以通过 Book 类的构造器 创建Book类的实例对象了
- 相当于我们将xml文件 转成了 java中的类的对象


> 完整代码
```java
package com.sam.testxml;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.junit.Test;

import java.math.BigDecimal;
import java.util.List;

public class Dom4jTest {
  @Test
  public void test() throws DocumentException {

    // 1. 读取books.xml文件
    SAXReader saxReader = new SAXReader();

    // 2. 通过document对象获取根元素 <books>
    Document document = saxReader.read("src/books.xml");

    Element rootElement = document.getRootElement();
    System.out.println(rootElement);    // [Element: <books attributes: []/>]

    // 3. 通过这个根元素books得到里面的每一个book标签对象
    // rootElement.element() 和 rootElement.elements() 都是通过标签名查找子元素
    List<Element> books = rootElement.elements("book");

    // 4. 遍历 处理每个book标签转换为Book类
    for (Element book: books) {
      // 每一个book 对应着 xml文件中的一个<book>
      // System.out.println(book.asXML());

      // 得到 name 标签对象
      Element nameEl = book.element("name");
      String nameElText = nameEl.getText();

      String priceText = book.elementText("price");
      String authorText = book.elementText("author");

      String sn = book.attributeValue("sn");

      // 我们拿到了xml文件中的所有内容后 就可以转换为book对象了 通过构造器创建book对象

      // priceText是字符串 我们Book类声明的是的BigDecimal
      Book book1 = new Book(sn, nameElText, authorText, BigDecimal.valueOf(Double.parseDouble(priceText)));

      System.out.println(book1);
      // Book{sn='SN12341232', name='辟邪剑谱', author='班主任', price=9.9}
      //Book{sn='SN12341231', name='葵花宝典', author='班长', price=99.99}
    }
  }
}

```