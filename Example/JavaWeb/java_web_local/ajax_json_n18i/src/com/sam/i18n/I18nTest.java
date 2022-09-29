package com.sam.i18n;

import org.junit.Test;

import java.util.Locale;
import java.util.ResourceBundle;

public class I18nTest {
  @Test
  public void test1() {
    // Locale类
    Locale locale = Locale.getDefault();
    System.out.println(locale);

    Locale[] locales = Locale.getAvailableLocales();
    for (Locale locale1 : locales) {
      System.out.println(locale1);
    }

    Locale china = Locale.CHINA;
    Locale japan = Locale.JAPAN;
  }

  @Test
  public void testI18n() {
    // 先创建一个语言对象
    // Locale us = Locale.US;
    Locale zh = Locale.CHINA;
    // basename: 就是properties文件的文件名的前面的部分
    // 参数2: 语言对象
    // 通过指定的basename和locale对象读取相应的配置文件
    // ResourceBundle bundle = ResourceBundle.getBundle("i18n", us);
    ResourceBundle bundle = ResourceBundle.getBundle("i18n", zh);

    // 传入key 获取 配置文件中对应的value 因为它会自去找对应的语言配置文件 我们会得到不同国家的文本
    String username = bundle.getString("username");
    System.out.println(username);
  }
}
