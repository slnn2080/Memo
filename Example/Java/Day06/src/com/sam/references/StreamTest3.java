package com.sam.references;

import org.junit.Test;

import java.util.Optional;

public class StreamTest3 {
  @Test
  public void test() {
    // 我们定义了两个类 Boy(里面有girl对象作为属性) Girl(里面有name作为属性)

//    Girl girl = new Girl();
//    girl = null;
//    Optional<Girl> optionalGirl = Optional.ofNullable(girl);
//    System.out.println(optionalGirl);


    Boy boy = new Boy();
    Girl girl = boy.getGirl();
    System.out.println(girl);
  }
  // 获取女孩名字的方法
  public String getGirlName(Boy boy) {
    // 这样的写法会出现空指针
    return boy.getGirl().getName();
  }

  @Test
  public void test2() {
    // 这里我们没有赋值 相当于拿着null去调用getName()所以会有空指针的问题
    Boy boy = new Boy();
    String girlName = getGirlName(boy);
    // java.lang.NullPointerException
    System.out.println(girlName);
  }

  // 优化以后的方法 -- 没有Optional
  public String getGirlName2(Boy boy) {
    if(boy != null) {
      Girl girl = boy.getGirl();
      if(girl != null) {
        return girl.getName();
      }
    }

    return null;
  }

  // 优化以后的方法 -- 有Optional
  public String getGirlName3(Boy boy) {
    // 因为boy本身就有可能是null 所以我们在给它包装成Optional的时候 要使用ofNullable()方法 我们不能使用of()
    Optional<Boy> boyOptional = Optional.ofNullable(boy);

    // 这时候Optional这个容器中的boy有可能是null 怎么处理？
    Boy boy1 = boyOptional.orElse(new Boy(new Girl("erin")));

    // boy一定可以getGirl() 它不会出现空指针
    Girl girl = boy1.getGirl();

    Optional<Girl> girlOptional = Optional.ofNullable(new Girl("nn"));

    // gril1一定非空
    Girl girl1 = girlOptional.orElse(new Girl("刘波"));

    return girl1.getName();
  }
}
