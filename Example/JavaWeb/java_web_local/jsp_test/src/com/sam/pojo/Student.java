package com.sam.pojo;

public class Student {
  private Integer id;
  private String username;
  private String password;
  private Integer age;
  private String phone;

  public Student() {
  }

  public Student(Integer id, String username, String password, Integer age, String phone) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.age = age;
    this.phone = phone;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Integer getAge() {
    return age;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  @Override
  public String toString() {
    return "Student{" +
        "id=" + id +
        ", username='" + username + '\'' +
        ", password='" + password + '\'' +
        ", age=" + age +
        ", phone='" + phone + '\'' +
        '}';
  }
}
