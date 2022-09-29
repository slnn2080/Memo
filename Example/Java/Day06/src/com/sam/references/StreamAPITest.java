package com.sam.references;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class StreamAPITest {
  // 切片 筛选
  @Test
  public void test() {
    // 先准备一个集合
    List<Employee> list = EmployeeData.getEmployees();

    // 我们找一下工资大于7000的
    Stream<Employee> stream = list.stream();
    // 里面要传递一个Predicate实现类对象 我们可以传递Lambda表达式
    // 我们传递一个Employee作为参数
    // forEach是一个遍历 里面要传递一个消费者 典型的就是输出语句
    stream.filter(e -> e.getSalary() > 7000).forEach(System.out :: println);
    System.out.println();
    list.stream().limit(3).forEach(System.out :: println);
    Stream<Employee> employeeStream = list.stream().limit(3);
    employeeStream.forEach(System.out :: println);
    System.out.println();
    list.stream().skip(3).forEach(System.out :: println);
    System.out.println();
    list.stream().distinct().forEach(System.out :: println);
  }


  // 映射
  @Test
  public void test2() {
    List<String> list = Arrays.asList("aa", "bb", "cc");
    list.stream().map(str -> str.toUpperCase()).forEach(System.out :: println);

    List<Employee> list1 = EmployeeData.getEmployees();
    // list1.stream().map(e -> e.getName()).filter()

    // 我们map里面传入的e是一个个的员工 然后我们映射成了一个个员工姓名 所以返回得就是一个string类型的构成的一个stream
    Stream<String> nameStream = list1.stream().map(Employee::getName);
    nameStream.filter(name -> name.length() > 3).forEach(System.out :: println);

    // 练习2
    // list里面是aa bb cc
    // map里面要传入一个函数 该函数会对集合中的每一个元素进行操作 而每一个元素是字符串 下面的fromStringToStream(String str)方法的形参也需要是一个字符串 返回值是Stream<Character>类型的 我们用下方法引用

    // 我们调用fromStringToStream返回得是一个stream对象Stream<Character> 而list里面每一个元素是一个字符串 一个元素就返回一个stream 我们有aa bb cc好几个字符串 相当于是多个stream对象构成的一个大的stream (二维数组)么
    Stream<Stream<Character>> streamStream = list.stream().map(StreamAPITest::fromStringToStream);

//     streamStream.forEach(System.out :: println);
//     java.util.stream.ReferencePipeline$Head@7403c468
//     java.util.stream.ReferencePipeline$Head@43738a82
//     java.util.stream.ReferencePipeline$Head@c81cdd1

    // 上面的遍历方式不行因为集合中每一个元素又是一个stream对象
    // 既然它需要一个 Consumer消费者接口 传参没有返回值 这就是彻彻底底的回调了的一种情况了
    // Function接口传参有返回值 Consumer是参数无返回值 这不就是彻彻底底的回调么
    streamStream.forEach(s -> {
      s.forEach(System.out :: println);
    });

    // 一层就够 也就是说 对于集合里面套集合的情况 优先考虑用flatMap
    Stream<Character> characterStream = list.stream().flatMap(StreamAPITest::fromStringToStream);
    characterStream.forEach(System.out :: println);
  }

  // aa - list [a, a] 将字符串中的多个字符构造的集合转换为Stream的实例
  public static Stream<Character> fromStringToStream(String str) {
    // 我们把字符串中的每一个字符看做是一个元素 Character - char的包装类
    ArrayList<Character> list = new ArrayList<>();

    // 取出str的每一个元素 每一个元素就是Character 我们把str的每一个元素加入list中
    for(Character c: str.toCharArray()) {
      list.add(c);
    }

    // Stream<Character> stream = list.stream();
    return list.stream();
  }

  @Test
  public void test3() {
    ArrayList list1 = new ArrayList();
    list1.add(1);
    list1.add(2);
    list1.add(3);

    ArrayList list2 = new ArrayList();
    list2.add(4);
    list2.add(5);
    list2.add(6);

    // list1.add(Object e)
    list1.add(list2);
    System.out.println(list1);
        // [1, 2, 3, [4, 5, 6]]

    // list1.addAll(Collection c)
    list1.addAll(list2);
    System.out.println(list1);
        // [1, 2, 3, 4, 5, 6]
  }

  @Test
  public void test6() {
    // 关于java层面的排序 自始至终就是涉及到两个接口的问题

    // 自然排序
    // 先生成list
    List<Integer> list = Arrays.asList(12, 33, 65, 88, 98);
    // 内部会调用Integer自然排序的方式
    Stream<Integer> integerStream = list.stream().sorted();

    integerStream.forEach(System.out :: println);

    //
    List<Employee> employees = EmployeeData.getEmployees();
//    employees.stream().sorted().forEach(System.out :: println);

    employees.stream().sorted((e1, e2) -> Integer.compare(e1.getAge(), e2.getAge())
    ).forEach(System.out :: println);
  }
}
