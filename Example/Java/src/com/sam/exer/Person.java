package com.sam.exer;

public class Person implements Comparable {
  private String name;
  private int age;

  public Person() {
  }

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  @Override
  public String toString() {
    return "Person{" +
        "name='" + name + '\'' +
        ", age=" + age +
        '}';
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Person person = (Person) o;

    if (age != person.age) return false;
    return name != null ? name.equals(person.name) : person.name == null;
  }

  @Override
  public int hashCode() {
    int result = name != null ? name.hashCode() : 0;
    result = 31 * result + age;
    return result;
  }

  @Override
  // 按照姓名从大到小 年龄从小到大
  public int compareTo(Object o) {
    if(o instanceof Person) {
      Person p = (Person) o;
      int compare = -this.name.compareTo(p.name);
      if(compare != 0) {
        return compare;
      } else {
        return Integer.compare(this.age, p.age);
      }
    } else {
      throw new RuntimeException("输入的类型不匹配");
    }
  }
}
