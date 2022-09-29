package com.sam.json;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sam.pojo.Person;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JsonTest {
  // 情况1 JavaBean 和 Json 之间的转换
  @Test
  public void test1() {
    // 创建一个 Person 对象
    Person person = new Person(1, "sam");

    // 我们要将 person对象转换为Json 需要用到gson.jar里面提供的一个类 和 其中的方法
    // 实例化Gson
    Gson gson = new Gson();

    // 将指定对象转换为 json字符串
    String personJsonString = gson.toJson(person);
    System.out.println(personJsonString); // {"id":1,"name":"sam"}

    // 将json字符串转为对应的JavaBean
    // 参数1: json字符串
    // 参数2: 将json字符串转换为哪个类类型 Xxx.class
    Person person1 = gson.fromJson(personJsonString, Person.class);
    System.out.println(person1.toString());
    // Person{id=1, name='sam'}
  }

  @Test
  public void test2() {
    // 先准备一个集合
    List<Person> personList = new ArrayList<>();
    personList.add(new Person(1, "sam"));
    personList.add(new Person(2, "erin"));
    personList.add(new Person(3, "nn"));

    // 将 List 集合转为 Json
    Gson gson = new Gson();
    // 将List集合转换为Json字符串
    String personListJsonString = gson.toJson(personList);
    System.out.println(personListJsonString);
    // [{"id":1,"name":"sam"},{"id":2,"name":"erin"},{"id":3,"name":"nn"}]

    List<Person> list = gson.fromJson(personListJsonString, new PersonListType().getType());
    Person person = list.get(0);
    System.out.println(person.toString());
    // Person{id=1, name='sam'}
  }

  @Test
  public void test3() {
    Map<Integer, Person> personMap = new HashMap<>();
    personMap.put(1, new Person(1, "sam"));
    personMap.put(2, new Person(2, "erin"));
    personMap.put(3, new Person(3, "nn"));

    Gson gson = new Gson();
    String personMapJsonString = gson.toJson(personMap);
    System.out.println(personMapJsonString);
    // {"1":{"id":1,"name":"sam"},"2":{"id":2,"name":"erin"},"3":{"id":3,"name":"nn"}}

    // 将mapJson字符串 转回 Map对象
    // Map<Integer, Person> personMap1 = gson.fromJson(personMapJsonString, new PersonMapType().getType());

    // 匿名内部类的写法
    Map<Integer, Person> personMap1 = gson.fromJson(personMapJsonString, new TypeToken<HashMap<Integer, Person>>(){}.getType());


    Person person = personMap1.get(1);
    System.out.println(person);
    // Person{id=1, name='sam'}
  }
}
