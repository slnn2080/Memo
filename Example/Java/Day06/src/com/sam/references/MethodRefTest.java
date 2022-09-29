package com.sam.references;


import org.junit.Test;

import java.io.PrintStream;
import java.util.Comparator;
import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * 方法引用的使用
 *
 * Created by shkstart.
 */
public class MethodRefTest {

	@Test
	public void test1() {
		// 情况1: 对象 :: 实例方法
		// Consumer中的 void accept(T t)
		// PrintStream中的 void println(T t)

		// Lambda表达式 创建Consumer接口的实例对象
		Consumer<String> con1 = str -> System.out.println(str);
		con1.accept("北京");

		System.out.println("**********");

		// 方法引用的写法
		// Consumer中的抽象方法void accept(T t) 是放一个变量但是不返回
		// System.out返回得就是 PrintStream打印流的对象 这个打印流对象中有一个方法叫做 println() 我们发现 println(T t) 也是 放一个变量但是不返回

		// 我们发现 void accept(T t)  和 void println(T t) 正好匹配上 如果出现了这种情况我们就可以把Lambda表达式升下级 我们还可以使用方法引用

		// 要传递给Lambda体的操作 已经有了实现的方法了 比如println()
		// 方法引用替换的是 Lambda体的位置
		// 也就是我们的 accept()方法 就用 println() 来替换
		// println()不也得有调用者么 它的调用者就是 System.out返回的打印流对象

		// 我们主要要重写accept方法 这个方法已经有另外一个方法(println())实现了 我们就用另外一个方法println()来替换 我们发现这个方法是非静态的 那么就用对象来调用

		// 既然需要对象 那我们就造出来呗
		PrintStream ps = System.out;
		// 不用传递参数 连参数都省略了 因为 accept(T t)方法 和 println(T t) 是一样的 都是丢进去一个 不返回
		Consumer<String> con2 = ps :: println;
		con2.accept("beijing");
	}
	
	//Supplier中的T get()
	//Employee中的String getName()
	@Test
	public void test2() {
		Employee emp = new Employee(1001, "sam", 23, 5600);
		// Lambda表达式来写 T get() 没有参数 所以我们如下写法
		Supplier<String> sup1 = () -> emp.getName();
		System.out.println(sup1.get());

		System.out.println("**********");

		// 方法引用的写法
		Supplier<String> sup2 = emp :: getName;
		String name = sup2.get();
		System.out.println(name);
	}

	// 情况二：类 :: 静态方法
	//Comparator中的int compare(T t1,T t2)
	//Integer中的int compare(T t1,T t2)
	@Test
	public void test3() {
		// 我们在写Lambda表达式的时候 只要记住接口中的抽象方法长什么样
		Comparator<Integer> com1 = (t1, t2) -> Integer.compare(t1, t2);
		System.out.println(com1.compare(12, 21));;

		// 方法引用
		Comparator<Integer> com2 = Integer :: compare;
	}
	
	//Function中的R apply(T t)
	//Math中的Long round(Double d)
	@Test
	public void test4() {
		// Function接口要求泛型为两个 一个作为内部抽象方法apply方法的参数 另一个作为apply方法返回值的类型
		Function<Double, Long> fn = new Function<Double, Long>() {
			@Override
			public Long apply(Double d) {
				return Math.round(d);
			}
		};

		// Lambda表达式的写法
		// 这里表达体的参数 我们要参照接口中的抽象方法的参数定义
		Function<Double, Long> fn1 = d -> Math.round(d);

		Function<Double, Long> fn2 = Math :: round;
	}

	// 情况三：类 :: 实例方法 
	// Comparator中的int comapre(T t1,T t2)
	// String中的int t1.compareTo(t2)
	@Test
	public void test5() {
		// Lambda表达式的写法
		Comparator<String> com1 = (s1, s2) -> s1.compareTo(s2);
		com1.compare("abc", "abd");

		// 方法引用
		// 当参数1是作为compareTo()方法的调用者出现的时候 参数2要传递到实参中的时候 我们可以进行方法引用
		Comparator<String> com2 = String :: compareTo;
	}

	//BiPredicate中的boolean test(T t1, T t2);
	//String中的boolean t1.equals(t2)
	@Test
	public void test6() {
		// Lambda表达式的写法
		BiPredicate<String, String> pre1 = (s1, s2) -> s1.equals(s2);
		System.out.println(pre1.test("abc", "abc"));

		// 方法引用
		BiPredicate<String, String> pre2 = String :: equals;
		System.out.println(pre1.test("abc", "abc"));
	}
	
	// Function中的R apply(T t)
	// Employee中的String getName();
	@Test
	public void test7() {
		// Lambda表达式的写法
		Employee employee = new Employee(1001, "sam", 23, 6666);
		Function<Employee, String> fn = e -> e.getName();
		// 方法直接完会得到name
		System.out.println(fn.apply(employee));

		// 方法引用
		Function<Employee, String> fn2 = Employee :: getName;
		fn2.apply(employee);
	}

}
