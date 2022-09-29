package com.sam.reflect;

import org.junit.Test;

import java.lang.reflect.InvocationTargetException;

public class ReflectionTest {
  @Test
  public void test() throws InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {

    Class clazz = Person.class;
    Object o = clazz.getDeclaredConstructor().newInstance();
    Person p = (Person) o;
    System.out.println(p);
  }
}
