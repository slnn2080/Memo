package com.sam.pojo;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class Person {
  private String name;
  private String[] phones;
  private List<String> cities;
  private Map<String, Object> map;

  public Person() {
  }

  public Person(String name, String[] phones, List<String> cities, Map<String, Object> map) {
    this.name = name;
    this.phones = phones;
    this.cities = cities;
    this.map = map;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String[] getPhones() {
    return phones;
  }

  public void setPhones(String[] phones) {
    this.phones = phones;
  }

  public List<String> getCities() {
    return cities;
  }

  public void setCities(List<String> cities) {
    this.cities = cities;
  }

  public Map<String, Object> getMap() {
    return map;
  }

  public void setMap(Map<String, Object> map) {
    this.map = map;
  }

  @Override
  public String toString() {
    return "Person{" +
        "name='" + name + '\'' +
        ", phones=" + Arrays.toString(phones) +
        ", cities=" + cities +
        ", map=" + map +
        '}';
  }

  public static void main(String[] args) throws IOException {
    String content = "这是需要Base64编码的内容";

    BASE64Encoder base64Encoder = new BASE64Encoder();
    String encodeStr = base64Encoder.encode(content.getBytes("UTF-8"));

    System.out.println(encodeStr);
    // 6L+Z5piv6ZyA6KaBQmFzZTY057yW56CB55qE5YaF5a65


    // 创建base64解码器
    BASE64Decoder base64Decoder = new BASE64Decoder();
    // 解码操作
    byte[] bytes = base64Decoder.decodeBuffer(encodeStr);

    // 将字节数组还原为字符串
    String str = new String(bytes, "UTF-8");
    System.out.println(str);
  }
}
