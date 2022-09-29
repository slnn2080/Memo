package com.sam.reflect;

@MyAnnotation(value="Person")
public class Person extends Creature<String> implements Comparable<String>, MyInterface{
  private String name;
  int age;
  public int id;

  // 接口中抽象方法的实现
  @Override
  public void info() {
    System.out.println("我是一个人");
  }

  @Override
  public int compareTo(String o) {
    return 0;
  }

  public Person() {
  }

  private static void showDesc() {
    System.out.println("我是一个可爱的人");
  }

  @MyAnnotation(value="Person_Constructor")
  private Person(String name) {
    this.name = name;
  }

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  @MyAnnotation(value="Person_Method")
  private String show(String nation) {
    System.out.println("我的国籍是: " + nation);
    return nation;
  }

  public String display (String interest) throws RuntimeException {
    return interest;
  }


  @Override
  public String toString() {
    return "Person{" +
        "name='" + name + '\'' +
        ", age=" + age +
        '}';
  }
}
