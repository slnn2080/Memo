package com.sam.bean;

public class Student {
  private int flowId;   // 流水号
  private int type;     // 考试类型
  private String IDCard;    // 身份证号
  private String examCard;  // 准考证
  private String name;      // 姓名
  private String location;  // 城市
  private int grade;        // 成绩

  public Student() {
  }

  public Student(int flowId, int type, String IDCard, String examCard, String name, String location, int grade) {
    this.flowId = flowId;
    this.type = type;
    this.IDCard = IDCard;
    this.examCard = examCard;
    this.name = name;
    this.location = location;
    this.grade = grade;
  }

  public int getFlowId() {
    return flowId;
  }

  public void setFlowId(int flowId) {
    this.flowId = flowId;
  }

  public int getType() {
    return type;
  }

  public void setType(int type) {
    this.type = type;
  }

  public String getIDCard() {
    return IDCard;
  }

  public void setIDCard(String IDCard) {
    this.IDCard = IDCard;
  }

  public String getExamCard() {
    return examCard;
  }

  public void setExamCard(String examCard) {
    this.examCard = examCard;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public int getGrade() {
    return grade;
  }

  public void setGrade(int grade) {
    this.grade = grade;
  }

  @Override
  public String toString() {
    return "Student{" +
        "flowId=" + flowId +
        ", type=" + type +
        ", IDCard='" + IDCard + '\'' +
        ", examCard='" + examCard + '\'' +
        ", name='" + name + '\'' +
        ", location='" + location + '\'' +
        ", grade=" + grade +
        '}';
  }
}
