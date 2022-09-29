package com.sam.exer2;

import java.util.*;

// 定义DAO泛型类 传入泛型参数
public class DAO<T> {

  // 成员变量中使用类的泛型key:String value:T
  private Map<String, T> map = new HashMap<>();

  // 保存T类型的对象到Map成员变量中
  public void save(String id, T entity) {
    map.put(id, entity);
  }

  // 从 map 中获取id对应的对象
  public T get(String id) {
    // 没找到的话本身会返回null
    return map.get(id);
  }

  // 替换map中key为id的内容 改为entity对象
  public void update(String id, T entity) {
    // 这么写稍微差点意思 逻辑不完整
    // map.put(id, entity);

    if(map.containsKey(id)) {
      map.put(id, entity);
    }
  }

  // 返回 map 中存放的所有T对象
  public List<T> list() {
    // 我们把所有的value取出来

    // 下面这种写法可以么? 不行！！
    // Collection<T> values = map.values();
    // return (List<T>) values;
    // 解释1. map中的values是无序的 可重复的 我们直接转成一个List List是有序的
    // 解释2. 我们的强转操作 本身是A类型 我们要先升成B类型(多态上去了) 然后我们才可以强转下来 -- 强转要先上后下 比如我们造的就是一个Object 然后我们需要一个Person 然后我们把Object强转成Person 这样是肯定错的 这里也是一样values返回得就是Collection 不是说返回得是List 我们把List又赋值给Collection了 然后Collection强转成List 如果真是这样那ok 但现在我们values()返回得就是一个Collection 我们非要把它强转成List 肯定不对

    // 正确的将values取到后遍历下 装到一个List中
    // ArrayList<T> list = new ArrayList<>(); 这样也行 没什么区别
    List<T> list = new ArrayList<>();
    Collection<T> values = map.values();

    for(T t: values) {
      list.add(t);
    }
    return list;
  }

  // 删除指定id对象
  public void delete(String id) {
    map.remove(id);
  }
}
