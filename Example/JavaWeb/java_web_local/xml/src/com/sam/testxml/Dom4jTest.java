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
  public void test1() throws DocumentException {
    // 1. 创建一个 saxReader输入流 去读取xml配置文件 生成document对象
    SAXReader saxReader = new SAXReader();

    // 2.
    Document document = saxReader.read("src/books.xml");
  }

  // 这个测试主要的逻辑是 读取books.xml 文件生成book类
  @Test
  public void test2() throws DocumentException {
    // 1. 读取books.xml文件
    SAXReader saxReader = new SAXReader();

    // 2. 通过document对象获取根元素 <books>
    Document document = saxReader.read("src/books.xml");
    Element rootElement = document.getRootElement();
    System.out.println(rootElement);    // [Element: <books attributes: []/>]

    // 3. 通过这个根元素books得到里面的每一个book标签对象
    // rootElement.element() 和 rootElement.elements() 都是通过标签名查找子元素
    List<Element> books = rootElement.elements("book");
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
      //
    }


    // 4. 遍历 处理每个book标签转换为Book类
  }
}
