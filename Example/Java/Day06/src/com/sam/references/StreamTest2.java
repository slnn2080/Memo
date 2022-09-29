package com.sam.references;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamTest2 {
  @Test
  public void test() {
    List<Employee> employees = EmployeeData.getEmployees();

    // 是否所有员工的年龄大于18岁 allMath(Predicate p)
    // 创建stream对象 它是一个容器 里面有一个个的Employee
    // 我们直接调用 终止操作
    boolean allMatch = employees.stream().allMatch(e -> e.getAge() > 18);
    System.out.println(allMatch);

    boolean anyMatch = employees.stream().anyMatch(e -> e.getSalary() > 10000);
    System.out.println(anyMatch);

    boolean noneMatch = employees.stream().noneMatch(e -> e.getName().startsWith("刘"));
    System.out.println(noneMatch);

    Optional<Employee> employee = employees.stream().findFirst();
    System.out.println(employee);

    Optional<Employee> any = employees.stream().findAny();
    System.out.println(any);

    long count = employees.stream().count();
    System.out.println(count);

    Stream<Double> doubleStream = employees.stream().map(e -> e.getSalary());
    // Comparator需要传递两个参数返回一个int型的值 类 :: 静态方法
    Optional<Double> maxSalary = doubleStream.max(Double::compare);
    System.out.println(maxSalary);

    Optional<Employee> min = employees.stream().min((e1, e2) -> Double.compare(e1.getSalary(), e2.getSalary()));
    System.out.println(min);

    employees.stream().forEach(System.out :: println);

    employees.forEach(System.out :: println);
  }

  @Test
  public void test2() {
    // 计算1-10的自然数的和
    List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    // 参数1: 初始值  Integer.sum(int a, int b)
    Integer reduce = list.stream().reduce(0, Integer::sum);
    System.out.println(reduce);

    // 计算公司所有员工工资的总和
    List<Employee> employees = EmployeeData.getEmployees();
    Optional<Double> sumMoney = employees.stream().map(e -> e.getSalary()).reduce(Double::sum);
  }

  @Test
  public void test6() {
    // 查找工资大于6000的员工 结果返回一个List或Set
    List<Employee> list = EmployeeData.getEmployees();
    List<Employee> employeeList = list.stream().filter(e -> e.getSalary() > 6000).collect(Collectors.toList());
    employeeList.forEach(System.out::println);
  }
}