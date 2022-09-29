package com.sam.references;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Stream;

public class Java9Test {
  @Test
  public void test() {

    ArrayList<String> list = new ArrayList<>();
    list.add("AA");
    list.add("BB");
    list.add("CC");

    // Optional容器里面是个List List里面是一个String
    Optional<ArrayList<String>> optional = Optional.ofNullable(list);

    // 生成stream对象 变成Stream里面是个List List里面是一个String
    Stream<ArrayList<String>> stream = optional.stream();
    // x就是一个List 相当于List.stream()
    stream.flatMap(x -> x.stream()).forEach(System.out :: println);


  }
}
