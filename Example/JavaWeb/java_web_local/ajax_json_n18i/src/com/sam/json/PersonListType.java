package com.sam.json;

import com.google.gson.reflect.TypeToken;
import com.sam.pojo.Person;

import java.util.List;

// 泛型: 就是将json字符串转回去的类型 在这里的泛型中指定
public class PersonListType extends TypeToken<List<Person>> {
}
