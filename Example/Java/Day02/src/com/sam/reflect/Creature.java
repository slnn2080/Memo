package com.sam.reflect;

import java.io.Serializable;

// Person类的父类 生物
public class Creature<T> implements Serializable {
  private char gender;
  public double weight;

  private void breath() {
    System.out.println("生物呼吸");
  }

  public void eat() {
    System.out.println("生物吃东西");
  }
}
