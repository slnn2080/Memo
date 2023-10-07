# 事务:
事务一般都是嫁到 Service层上 

<br>

# /的解析
/是绝对路径的标志, 我们的路径如果以 / 开头 它就是一个绝对的路径, /分为由 浏览器解析 和 服务器解析

``@RequestMapping("/")``比如这里的/因为是写在服务器的代码, 所以它就是由服务器解析的路径

- 服务器解析的 ``/``: 它在服务器端会被解析为 ``localhost:8080/工程名``

- 浏览器解析的 ``/``: 它在浏览器会被解析为 ``localhost:8080 `` **注意没有工程名**

<br><br>

# JavaWeb

### **<font color='#C2185B'>@WebServlet</font>**
配置访问servlet程序的接口地址
```java
@WebServlet("/loginServlet")

@WebServlet(
  // 配置多个接口地址
  urlPatterns = {"/demo01", "demo02"},
  initParams = {
    @WebInitParam(name="hello", value="world"),
    @WebInitParam(name="key", value="val")
  }
)
```

<br>

### **<font color='#C2185B'>@WebFilter</font>**
配置Filter拦截器 拦截的路径
```java
@WebFilter("/demo01")
public class Demo implements Filter {
  
}
```

<br>

### **<font color='#C2185B'>@Order(1)</font>**
指定过滤器的排序

<br><br>

# Spring

<br>

### 类路径:
我们放在 java目录 和 resources目录 下的文件, 在编译后都会在 /target/classes/ 目录下

- java文件在: /target/classes/com...包名下
- 配置文件在: /target/classes/配置文件

```
| - target
  | - classes
    | - com...
      - Student
    - spring.xml
```

<br>

而上面的 /classes 就是类路径, 我们在很多地方都会使用 **classpath:** 关键字来指定类路径之下的文件

java目录 和 resources目录 最终都会放在``WEB-INF目录/classes``下面

<br>

### **<font color='#C2185B'>@Autowired</font>**
自动装配

```java
// 能装配就装配 装配不了则使用默认值
@Autowired(required=false)
```

<br>

### **<font color='#C2185B'>@Qualifier("指明IOC容器中某个bean的id")</font>**  
使用指明的id为 Autowired注解 所表示的属性进行赋值

```java
@Autowired
@Qualifier("指明IOC容器中某个bean的id")
private UserService userService;
```

<br><br>

## AOP相关注解:

### **<font color='#C2185B'>@Aspect</font>**
通过@Aspect注解将当前组件标识为切面组件

```java
// 切面类
@Component
@Aspect
public class LoggerAspect {
}
```

<br>

### **<font color='#C2185B'>@Before(切入点表达式)</font>**
该注解是将当前的方法标识为前置通知的方法

需要在方法上使用注解来标识 该方法是哪种通知方法, 前置 返回 异常 后置

<br>

**参数:**
```java
execution("切入点表达式")

execution("execution(方法的权限修饰符 + 方法的返回值 + 方法所在的包.方法所在的类.方法名(参数类型, 参数类型))")
```


```java
@Component
@Aspect
public class LoggerAspect {

  // 前置通知的方法
  @Before("execution(public int com.sam.spring.aop.annotation.CalculatorImpl.add(int, int))")
  public void beforeAdviceMethod() {
    System.out.println("LoggerAspect: 前置通知");
  }
}
```

<br>

### **<font color='#C2185B'>@AfterReturning(切入点表达式, [returning = "变量名"])</font>** 
返回通知注解

```java
// 返回通知: 目标方法执行之后 执行的逻辑
@AfterReturning(
  value = "pointCut()", 
  returning = "result"
)
public void afterReturnAdviceMethod(JoinPoint joinPoint, Object result) {

  Signature signature = joinPoint.getSignature();

  String methodName = signature.getName();

  System.out.println("LoggerAspect: 返回通知方法: " + methodName + ", 其返回值为: " + result);
}
```

<br>

### **<font color='#C2185B'>@AfterThrowing(切入点表达式, [throwing = "变量名"])</font>** 
异常通知注解

<br>

### **<font color='#C2185B'>@After(切入点表达式)</font>** 
后置通知注解

<br>

### **<font color='#C2185B'>@Around(切入点表达式)</font>** 
环绕通知注解

<br>

### **<font color='#C2185B'>@Pointcut(切入点表达式)</font>**
复用切入点表达式, 将切入点表达式封装到该注解标识的方法中

```java
@Pointcut("execution(* com.sam.spring.aop.annotation.CalculatorImpl.*(..))")
public void pointCut() {}

@Before("pointCut()")
```

<br>

### **<font color='#C2185B'>@Order(int num)</font>**
设置当前切面的优先级, 设置的数字越小 优先级越高

```java
@Component
@Aspect
@Order(1)  // ← 通过@Order注解设置优先级
public class ValidateAspect {

  // 使用 A切面 的公共切入点
  @Before("com.sam.spring.aop.annotation.LoggerAspect.pointCut()")
  public void beforeMethod() {
    System.out.println("ValidateAspect: 前置通知");
  }
}
```

<br><br>

## 测试相关

### **<font color='#C2185B'>@RunWith(SpringJUnit4ClassRunner.class)</font>**
在测试类的类名上 使用该注解, 设置测试类的运行环境

<br>

### **<font color='#C2185B'>@ContextConfiguration("classpath:spring-jdbc.xml")</font>**
在测试类的类名上

通过注入的方式获取ioc容器中的bean 那ioc容器怎么获取 必须要有配置文件吧

<br>

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring-jdbc.xml")
public class JdbcTemplateTest {

  // 使用自动装配 接收IOC容器的依赖注入
  @Autowired
  private JdbcTemplate jdbcTemplate;

  ...
}
```

<br><br>

## 事务相关

### **<font color='#C2185B'>@Transactional</font>**
注解所标识的方法 或 类中所有的方法使用事务进行管理

```java
@Transactional(propagation = Propagation.REQUIRED, timeout = 3000)
```


<br><br>

# SpringMVC

### **<font color='#C2185B'>@RequestMapping("请求地址")</font>**
当浏览器发送的请求的请求url和我们mapping中设置的value属性值一样的时候 @RequestMapping注解标识的方法就是用来处理请求的方法

使用在控制器方法上

<br>

**派生注解:**
- @GetMapping: 匹配Get请求
- @PostMapping
- @DeleteMapping
- @PutMapping

<br>

### Restful接口: @RequestMapping的设置方式 (@PathVariable)
1. @RequestMapping的路径中使用 {变量} 的形式 声明动态参数的变量

2. 在形参的位置使用 @PathVariable("接口地址中定义的key") 的方式 接收

```java
@RequestMapping("/test/rest/{username}/{id}")
public String testRest(
  @PathVariable("username") String username, 
  @PathVariable("id") Integer id
) {
  System.out.println(username);
  System.out.println(id);
  return "success";
}
```

<br>

### **<font color='#C2185B'>@RequestParam()</font>**
使用位置 形参 前

用来设置请求参数 和 控制器方法形参 之间的映射关系, 当请求参数和控制器方法中的形参名不一致的时候使用

```java
@RequestMapping("/param")
public String getParamByServletApi(
  // 将userName请求参数和控制器方法中的username进行绑定
  @RequestParam("userName") String username, 

  @RequestParam("passWord") String password

) {

    System.out.println("username = " + username);
    System.out.println("password = " + password);

    return "success";
  }
```

<br>

### **<font color='#C2185B'>@RequestHeader()</font>**
使用位置 形参 前

将 请求头 和 形参 绑定起来

```java
@RequestMapping("/param")
public String getParamByServletApi(
  @RequestHeader("referer") String referer
) {

  // 通过形参获取请求头为referer 对应的数据
  System.out.println("referer = " + referer);

  return "success";
}
```

<br>

### **<font color='#C2185B'>@CookieValue()</font>**
使用位置 形参 前

将 Cookie 和 形参 绑定起来



```java
@RequestMapping("/param")
public String getParamByServletApi(

  @CookieValue("Idea-23f35ccc") String cookie

) {

  // 通过形参获取cookie中Idea-23f35ccc 对应的数据
  System.out.println("cookie = " + cookie);

  return "success";
}
```

<br>

### **<font color='#C2185B'>@RequestBody</font>**
用于获取请求体参数 获取axios中data配置项

```java
@RequestMapping(value = "/test/ajax", method = RequestMethod.POST)

public void testAjax( // 方法的返回值为 void
  Integer id, 
  @RequestBody String body,
  HttpServletResponse res

) throws IOException {
}
```

<br>

**注意:**  
@RequestBody 标识的变量的类型 
- String: 则我们接收到的就是JSON
- Map: 则我们接收到的就是Map
- Bean: 则我们接收到的就是实体类

<br>

### **<font color='#C2185B'>@ResponseBody</font>**
用于标识控制器方法, 该方法的返回值直接作为响应报文的响应体 响应到浏览器, 也就是说 **返回值就是响应的数据**

<br>

### **<font color='#C2185B'>@RestController</font>**
使用在类上

@ResponseBody注解 和 @Controller注解就有了复合注解: @RestController

@RestController相当于我们在类上添加了@Controller注解 和 为类中所有的控制器方法都加上了@ResponseBody注解

我们在类上使用了该注解后, 就不需要在每个控制器方法上加上@ResponseBody了


<br><br>

## 异常相关

### **<font color='#C2185B'>@ControllerAdvice</font>**
标识一个控制层的类型 作用就是将当前类标识为异常处理的组件

<br>

### **<font color='#C2185B'>@ExceptionHandler(ArithmeticException.class)</font>**
使用该注解标识类中的控制器方法

注解的值为某个异常class, 也就是指明对哪个异常进行处理

```java
// 它也是扩展注解, 作用就是将当前类标识为异常处理的组件
@ControllerAdvice
public class ExceptionController {

  // 使用ExceptionHandler注解指明对哪个异常进行处理
  @ExceptionHandler(ArithmeticException.class)
  public String handleException(Model model, Throwable ex) {

    model.addAttribute("ex", ex);
    return "error";

  }
}
```
