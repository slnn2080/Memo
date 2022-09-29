package com.sam.review;

import org.junit.Test;

public class ReviewTest {

  @Test
  public void test1() {
    ClassTest sam = new ClassTest();

  }

}

class ClassTest {
  private String name = "sam";

  public ClassTest() {
    System.out.println(this);
    System.out.println(this.getClass());
  }

  public ClassTest(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  @Override
  public String toString() {
    return "ClassTest{" +
        "name='" + name + '\'' +
        '}';
  }
}