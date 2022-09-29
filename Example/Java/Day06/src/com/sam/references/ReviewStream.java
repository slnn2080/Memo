package com.sam.references;

import org.junit.Test;

import java.util.List;
import java.util.stream.Stream;

public class ReviewStream {
  @Test
  public void test() {
    List<Employee> list = EmployeeData.getEmployees();
    Stream<Employee> stream = list.stream();
    stream.limit(3).forEach(System.out :: println);
  }
}
