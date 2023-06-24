# 为什么要用 Rust
它可以用来替换 c/c++ rust和他们具有同样的性能 但是很多常见的bug在编译时就可以被消灭

rust是一种通用的编程语言 但是它更善于以下的场景
1. 需要运行时的速度
2. 需要内存安全
3. 更好的利用多处理器

<br>

### 与其它语言的比较
c/c++性能非常好 但类型系统和内存都不太安全

java/c# 拥有GC 能保证内存安全 也有很多优秀的特性 但是性能不行

<br>

### rust拥有上述的两种语言的优点
1. 安全
2. 无需GC 性能好
3. 易于维护 调试 代码安全高效

<br>

### Rust特别擅长的领域
1. 高性能的web service
2. webassembly
3. 命令行工具
4. 网络编程
5. 嵌入式设备
6. 系统编程

<br>

### rust的用户和案例
- Google: 新操作系统Fuschia 其中rust代码量大约占30%

- Amazon: 基于Linux开发的直接可以在裸机 虚拟机上运行容器的操作系统 rust编写的

- System76: 纯rust开发了下一代安全操作系统 Redox

- 蚂蚁金服: 库操作系统 Occlum rust编写

- 微软: 正在使用 Rust 重写 windows 系统中的一些低级组件


<br>

### Rust难学
如果会c++可能就很容易
rust有很多独有的概念 他们和现在大多主流语言都不同

<br>

### 参考教程
Rust权威指南 2018 我们看这个

<br>

### Rust体系课程的规划
1. 这门课是入门级教程 参考 Rust权威指南 1-12 章的内容讲的

2. 未来还有rust进阶教程 也会参考此书的13章以后的内容

3. rust算法教程
4. rust数据结构教程
5. rust web开发教程

<br><br>

## 安装Rust
```s
www.rust-lang.org
```

```s
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# mac使用这个就可以
curl https://sh.rustup.rs | sh
```

<br>

然后将其添加到环境变量
```s
export PATH="$PATH:~/.cargo/bin/"

source .bash_profile
```

<br>

检查是否安装成功
```s
rustc --version
cargo --version
```

<br>

### 更新rust
```s
rustup update
```

<br>

### 卸载rust
```s
rustup self uninstall
```

<br>

### 运行本地文档
```s
rustup doc
```

<br>

### 开发工具
Visual Studio Code
插件: rust

<br><br>

### 编写 Rust 程序
程序文件后缀名: rs
文件命名规范: hello_world.rs

```rs
fn main() {
  println!("Hello World")
}
```

fn: 定义函数
main: 方法名
println!: 输出语句

main函数: 入口函数
它是每个rust可执行程序最先运行的代码


**注意:**
rust的缩进是4个空格而不是tab
println! 是一个rust macro(宏) 如果是函数的话 就没有!
Hello World字符串 它是println! 的参数
语句要以分号结尾
``` 
  Macro 一种用代码生成代码的手段 中文是宏
  rust的宏是基于ast语法树 而不是c/c++那种#define简单的文本替换 其作用类似于 elixir里面的macro 
```


<br>

### 编译rs文件
rustc 文件名.rs
编译之后会生成一个二进制的文件 .exe结尾(window下)
mac的下面没有后缀

```shell
rustc hello_world.rs
```

<br>

### 运行rs文件
./文件名
```shell
./hello_world
```


<br>

### 编译和运行是单独的两步
运行rust程序之前必须先编译 命令: rustc 文件名.rs

编译成功后 会生成一个二进制文件
在windows上还会生成一个 .pdb 文件 里面包含调试信息

rust是 ahead-of-time 编译的语言
可以先编译程序 然后把可执行文件交给别人运行(无需安装Rust)

rustc 只适合简单的Rust程序
``` 
  如果程序比较复杂 我们再使用 rustc 编译就不合适了 我们要使用 Cargo
```

<br><br>

### Cargo
小项目的话我们可以使用 rustc
但是一些比较大的项目 我们必须使用其他的工具 这个工具就叫做 cargo

<br>

### cargo
它是rust的构建系统的包管理工具 它可以构建代码 下载依赖的库 构建这些库

安装rust的时候会安装cargo

<br>

### cargo --version
查看cargo是否被正确的安装

<br>

### 使用 cargo 创建项目
cargo new 项目名
``` 
  cargo new rust_test_cargo_pro

  可以使用其它的VCS或不使用VCS: 
    cargo new --vcs 项目名
```

<br>

- cargo build: 可以构建项目
- cargo run: 可以运行项目
- cargo test: 可以测试项目
- cargo doc: 可以为项目构架文档
- cargo publish: 可以将库发布到 crates.io

<br>

### 项目结构

  | - rust_test_cargo_pro 

    | - src
      - main.rs

    - .gitignore
    - Cargo.toml

<br>

### src目录
用来放源代码

<br>

### Cargo.toml
```js
[package]
name = "rust_test_cargo_pro"
version = "0.1.0"
edition = "2021"    // 使用的rust版本

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

.toml 是Cargo的配置格式
<br>

### [package]
区域的标题 表示下方内容是用来配置包(package)的

<br>

### [dependencies]
另一个区域的开始 它会列出项目的依赖项
在rust里面 代码的包或者代码的库叫做 crate
比如我们安装一个第三方的库 这个库在rust里面就叫做 crate


<br>

### src/main.rs
cargo生成的main.rs在src目录下 而Cargo.toml在项目顶层下 源代码都应该在src目录下

顶层目录(和配置文件同级的目录) 可以放置:
readme
许可信息
配置文件
其它与程序源码无关的文件


如果创建项目的时候没有使用 cargo 也可以把项目转化为使用 cargo 的形式
很简单:
1. 把源代码文件移动到src下
2. 创建 Cargo.toml 并填写响应的配置


<br>

### 使用 Cargo 构建项目
<br>

### cargo build
这个命令会创建可执行文件
target/debug/hello_cargo 或
target/debug/hello_cargo.exe(windows)

运行可执行文件 就是执行这个程序了
运行可执行文件的方式
./target/debug/hello_cargo

第一次运行 cargo build 会在顶层目录生成 cargo.lock 文件

.lock文件负责追踪项目依赖的精确版本 不需要手动修改该文件


<br>

### 运行 Cargo 项目
<br>

### cargo run
上面我们是先通过 cargo build 才构建项目 然后执行可执行文件 

cargo run命令 可以构建 + 运行 项目
该命令是两步操作 编译代码生成可执行文件 + 执行结果
如果之前编译成功过 并且源码没有改变 那么就会直接运行二进制文件


<br>

### cargo check
该命令用于检查代码 确保能通过编译 但是不产生任何可执行文件
该命令会比 cargo build 快的多
所以在编写代码的时候可以连续反复的使用 cargo check
 检查代码 提高效率


<br>

### 为发布构建
<br>

### cargo build --release
默认情况下 cargo build 命令是开发时用的 用于调试的 如果我们的程序已经写完了 已经准备发布了

那我们就要使用 cargo build --release 这时候编译会进行优化 代码会运行的更快 但是编译时间更长

该命令生成的可执行文件 会在 target/release目录
而不是 target/debug 目录下生成可执行文件

cargo build
  - 开发时用的命令

cargo build --release
  - 正式发布时用的命令

<br>

### 总结:
尽量使用 cargo

<br><br>

### 猜数字 游戏

```rs
// rust里面的导包要使用 use 关键字
// use 标准库中的io
use std::io;

fn main() {
    println!("猜数");
    println!("猜测一个数");

    let mut guess = String::new();

    io::stdin().read_line(&mut guess).expect("无法读取行");

    // 使用{}作为占位符 我们把变量传递进去
    println!("你猜测的数是: {}", guess);
}
```

<br>

### 代码解析:
我们要获取用户的输入 然后再把用户的输入 打印出来作为输出 我们就需要使用到 io 这个库

io这个库是在标准库里面的
std就是标准库
``` 
  默认情况下 rust会把prelude模块的内容导入到每个程序的作用域中

  如果我们使用的类型不在 prelude 里面 就需要显式的将导入该类型
```

<br>

### use 关键字
用于将 一个模块或者类型 显式的导入到程序中 
相当于 import require

```rs
use std::io
```
导入进来后 我们就可以做输入或输出的操作了


<br>

### println!("内容")
是宏 它的作用就是将 内容 输出到屏幕上

<br>

### let 关键字 
用来声明变量
```rs
let foo = 1; 
let bar = foo;
```

**注意:**
rust中所有的变量默认情况下是不可变的
```rs
let foo = 1;
foo = 2;    // 报错
```


<br>

### mut 关键字
指明该变量是可变的 (相当于加上了就是let 不加mut就是const)


<br>

### String::new()
返回字符串的新的实例 rust中 字符串类型就是String 它是由标准库所提供的 它内部使用了utf-8格式的编码 并且可以按照需求扩展自己的大小

:: 表示 new() 是String类型的关联函数
关联函数是针对类型本身来实现的 而不是针对字符串某个特定的实例来实现的

new()
会创建一个空白的字符串 在rust中很多类型都有new()
因为它是创建类型实例的惯用函数

<br>

### io::stdin()
io库下的stdin()

stdin()会返回 Stdin的实例 它会作为句柄(handle)处理终端中的标准输入

<br>

### read_line(&mut 变量)
这个方法用于获取用户的输入 该方法就是将用户的输入放到一个字符串中

所以我们要传递一个字符串类型作为参数
这个字符串类型的参数需要是可变的 因为这个方法会随着用户的输入来修改字符串的内容 所以我们在 guess 前面加上了 *mut* 关键字

<br>

### & 取地址符号
表示这个参数是一个引用 通过引用就可以在代码的不同地方来访问同一块数据 

read_line(&mut guess)
就代表方法的参数是用引用来传递的

```rs
let mut guess = String::new();
io::stdin().read_line($mut guess)
```

上面两个guess因为使用了 & 指向同一块内存
而引用在rust里面是比较复杂的特性 而rust的核心竞争力之一 它可以保证我们可以简单并且安全的使用 引用功能

&引用在rust里面表示也是不可变的 
当我们加上mut关键字后 这个引用也变成了可变的
```rs
// 不加 mut 就会报错
io::stdin().read_line($ guess)
io::stdin().read_line($mut guess)
```


read_line()方法 无论用户输入什么 都会读取
read_line() 返回值:
io::Result<usize> 类型

在rust的标准库中有很多的类型都叫做 Result 既有通用的result 也有特定版本的子模块的result比如io::Result

Result类型实际上就是枚举类型 一个枚举类型会有几个固定的值 这些值就是枚举类型的变体

io::Result类型就有两个变体(另个值)
Ok
Err

如果我们read_line()方法返回的是 Ok 变体的话 就表示这个操作成功了 而且Ok 里面还有结果值

如果我们read_line()方法返回的是 Err 变体的话 就表示这个操作失败了 在Err中 还会附带失败的原因

而io::Result枚举类型 它上面还定义了一系列的方法

<br>

### expect("中断时的提示信息")
io::Result枚举类型定义的方法之一
假如io::Result返回的是Err expect()方法就会终端当前的程序 并将传入的字符串信息显示出来

假如io::Result返回的是Ok expect()方法就会提取出ok中附加的值 并将这个值作为结果返回给用户


<br>

### {} 表示占位符
它的值在输出的时候就会替换成 后面变量的值
```rs
println("你猜测的数是: {}", guess);
```

如果一个{} 就对应后面第一个变量的值
如果二个{} 后面就应该传入两个变量的值

<br><br>

### 猜数字 生成神秘的数字
我们要生成1-100之间的随机数 rust标准库里面 没有包含生成随机数的功能 但是 rust团队提供了 生成随机数公功能的库 

<br>

### rand
生层 随机数的 crate 的包
rand(crate包 可以理解为npm里面的包或者理解为一个模块)
https://crates.io/crates/rand

``` 
  在rust中一个库(crate)就是一堆的rust源代码文件
  rust中的crate一共分为两种

  - 我们自己创建的程序 就是一个 二进制的crate
  - 而rand这个crate是不可以独立运行的 它属于lib crate 叫做 库包 像这种crate就是为其它程序所用的
```

<br>

### 项目中添加依赖
相当于怎么 npm i 一个包
rust中 我们可以直接在 Cargo.toml 中 [dependencies] 的位置写 写完后重新构建下 可能就下完了

也可以:
cargo install rand

格式:
rand = "版本"

完整写fa:
rand = "^版本"
表示和指定版本兼容的版本都可以
比如我们指定了 0.3.14 那么就是和这个版本兼容的版本都可以

```toml
[package]
name = "rust_test_cargo_pro"
version = "0.1.0"
edition = "2021"


[dependencies]
rand = "0.3.14"
```

<br>

### 重新构建
安装完包后 可能要 cargo build 下 重新构建
重新构建的时候 会检查 dependencies 有没有下载的依赖项 如果没有就会自动下载

<br>

### ctrl + shift + p
输入 rust 能看到
runst start the rust server
手动开启服务器 开启之后可能下载依赖的时候就不用 手动构建了 没有尝试


<br>

### 代码部分
```rs
use std::io;
 // trait 它相当于其它语言的接口 
 // Rng trait就是定义了随机数生成器需要实现的方法
use rand::Rng; 

fn main() {
  println!("猜数");

  // 定义一个不可变的变量
  let secret_number = rand::thread_rng().gen_range(1, 101);

  println!("神秘数字是: {}", secret_number);
}
```

<br>

### 代码解析:
<br>

### rand::thread_rng()
返回值
ThreadRng 类型 返回的是一个随机数生成器
``` 
  这个随机数生成器是位于本地线程空间 并通过操作系统获得随机数的种子
```

<br>

### rand::thread_rng().gen_range(1, 101);
gen_range(low, height)
该方法就是Ran接口中定义的方法 它需要两个参数 最小值 和 最大值
1 - 101 之间生成一个随机值 包括1 不包括101

<br><br>

### 猜数字 比较猜测的数字 与 神秘数字 
我们要做的是 比较 guess 和 secret_number 的大小

<br>

### 知识要点:
<br>

### 1. 类型推荐
let mut guess = String::new();
rust是静态强类型的语言 它还具有类型推断的能力 我们在声明 guess 变量的时候 并没有声明其类型 但是通过 后面的 String::new() 表达式就能推断出来 guess变量的类型就是string

<br>

### 2. 字符串.cmp(&字符串变量)
用来进行比较 就是compare的方法 它和另外的一个值进行比较

<br>

### 3. 字符串.parse()
将字符型的数字转换为 真正的数字
可以搭配 expect("请输入一个数字"); 使用
因为我们要写个 abc 还转换不了

<br>

### 4. use std::cmp::Ordering;
标准库中的枚举类
Ordering是枚举类型 它有3个值(变体) Less Greater Equal 分别表示小于大于或者是等于

<br>

### 5. 类型遮盖
rust中允许声明同名变量用来隐藏上面定义好的同名变量
```rs
let mut guess = String::new();

// 遮盖上面的变量
let guess:u32 = guess.trim().parse().expect("请输入一个数字");
```

也就是将 字符串类型的guess转换为 u32无符号整数类型的变量了

<br>

### 6. match 表达式 {}
相当于 switch case 
它会根据表达式的结果 返回的枚举类型的值 来决定下面我们执行哪个对应的语句

```rs
match guess.cmp(&secret_number) {
  Ordering::Less => println!("小了"),
  Ordering::Greater =>  println!("大了"),
  Ordering::Equal =>  println!("赢了")
}
```

<br>

### 完成代码部分
```rs
use rand::Rng;

use std::cmp::Ordering;
use std::io;
fn main() {
  println!("猜数");

  let secret_number = rand::thread_rng().gen_range(1, 101); // i32 u32 i64

  println!("神秘数字是: {}", secret_number);

  println!("猜测一个数");
  let mut guess = String::new();

  io::stdin().read_line(&mut guess).expect("无法读取行");
  
  // 这里我们是隐藏上面同名的就变量 也就是从这样开始 guess就是u32新的guess了
  let guess:u32 = guess.trim().parse().expect("请输入一个数字");
  println!("你猜测的数是: {}", guess);
  
  match guess.cmp(&secret_number) {
    // 小于
    Ordering::Less => println!("小了"),
    Ordering::Greater =>  println!("大了"),
    Ordering::Equal =>  println!("赢了")
  }
}
```

<br>

### 优化:
为了让用户进行多次猜测 我们需要做一个无限循环

<br>

### loop {} 关键字
loop表示无限循环 而不是while(true) rust里面有while关键字
```rs
loop {
  // break 用于跳出循环
  break;
}
```

<br>

### break;
用于跳出循环

<br>

### continue;
用于跳出本次循环

<br>

### match的应用技巧
我们不要程序需要报错就崩溃的时候 我们可以这么处理
guess.trim().parse() 会返回 Result类型 该类型有 Ok Err
这时候我们就可以使用 match 分支来解决 当遇到用户输入 abc parse()转换不了的时候 continue跳出本次循环进入下一次循环

```rs
let guess:u32 = match guess.trim().parse() {
  Ok(num) => num,
  Err(_) => continue
};
```



```rs
use rand::Rng;

use std::cmp::Ordering;
use std::io;
fn main() {
  println!("猜数");

  let secret_number = rand::thread_rng().gen_range(1, 101); // i32 u32 i64

  loop {
    println!("猜测一个数");
    let mut guess = String::new();

    io::stdin().read_line(&mut guess).expect("无法读取行");
    
    // 这里我们是隐藏上面同名的就变量 也就是从这样开始 guess就是u32新的guess了
    let guess:u32 = match guess.trim().parse() {
      Ok(num) => num,
      Err(_) => continue
    };

    println!("你猜测的数是: {}", guess);
    
    match guess.cmp(&secret_number) {
      // 小于
      Ordering::Less => println!("小了"),
      Ordering::Greater =>  println!("大了"),
      Ordering::Equal => {
        // 使用 break 跳出玄幻
        println!("赢了");
        break;
      }
    }
  }
}
```

<br><br>

### 变量 与 可变性

<br>

### let 关键字
声明变量 使用 let 关键字 默认情况下变量是不可变的(immutable) 一旦变量绑定了一个值后 这个变量就不可以被重新赋值了
``` 
  默认的情况下 类似 const
  但是也不要强行理解为const const和let
  let的初始化在程序中是不确定的
  const后面必须是常量

  如果重新赋值了 那么在编译的时候就会报错
```

我们直接输出变量还报错了呢
```rs
fn main() {
    let x = 5;
    print!(x);   // 报错 提示只能用{}这种形式

    print!("x的值是: {}", x);

    // 报错 cannot assign twice to immutable variable 不可以对不可变的变量两次赋值
    x = 6;       
}
```

let x = 5;
对于整数来说 编译器会把x的类型推断为i32类型


<br>

### let mut 关键字
声明变量时 在变量前面加上 mut 就可以使变量可变

<br><br>

<br>

### 变量 与 常量

<br>

### const 关键字
常量(constant), 常量在绑定值以后也是不可变的 但是它与不可变的变量有很多区别:
  - 1. 不可以使用 mut, 常量永远都是不可变的

  - 2. 声明常量使用 const 关键字 它的类型必须被标注(没有类型推导)

  - 3. 常量可以在任何作用域内进行声明 包括全局作用域

  - 4. 常量只可以绑定到常量表达式 无法绑定到函数的调用结果或只能在运行时才能计算出的值
  ``` 
    常量的值在编译时就确定了 
    不可变变量的值可以在运行时确定
  ```

在程序运行期间 常量在其声明的作用域一直有效

<br>

### 常量的命名规范:
rust里常量使用全大写字母 每个单词之间用下划线分开
MAX_POINTS

常量声明的例子
const MAX_POINTS:u32 = 100_000

<br><br>

<br>

### 隐藏(shadowing)
在rust中 可以使用相同的名字声明新的变量 新的变量就会隐藏之前声明的同名变量

比如:
```rs
fn main() {

    let x = 5;      // 第 1 行

    // 报错
    x = x + 1;      // 第 2 行

    let x = x + 1;  // 第 3 行

    print!("x的值是: {}", x);
}
```

当我们直接写 第2行 的时候 就会报错 因为默认情况下x是不能被再次赋值的

但是 我们 第3行 又写了 let x = x + 1；
这就是隐藏 就是在 第3行 又声明了一个变量 也叫x
那么从 第3行 以后就都是新声明的变量 而不是之前的x

第1行 x出现的最后位置 就是 第3行 x + 1 这里

定义了同名变量后 后续的代码中 这个变量名 代表的就是新的变量

<br>

### shadow 和 把变量标记为 mut 是不一样的
使用let声明的变量 如果不使用let关键字 那么重新给非mut的变量赋值会导致编译时错误

使用 let 声明的同名新变量 也是不可变的
使用 let 声明的同名新变量 它的类型可以与之前不同

演示:
如下会报错 因为 上面 和 下面的类型不一样
```rs
// 报错
let mut spaces = "    ";
spaces = spaces.len();
```

let mut spaces = "    ";
spaces变量的类型是: &str(可以理解为字符串型)
spaces.len() 返回的是整数类型


演示2：
要点: 
let spaces = spaces.len();
这句的 spaces 的类型是 *usize*

usize:
这个类型是根据计算机的架构 如果是64位的话 那么它也是64位无符号整数类型

```rs
fn main() {
  // spaces: &str 是字符串类型 
  let spaces = "    ";
  
  // spaces: usize
  let spaces = spaces.len();    

  print!("{}", spaces);
}
```

<br>

### shadow的好处
在其他的语言中经常会遇到这样的场景
有一个字符串 我们想把它解析成一个数字 
let spaces_str = "   "

如果我们想把上面的变量解析成数字 那么我们还需要重新定义一个新的名字
let spaces_num = spaces.len()

也就是说我们可能要使用不同的后缀来区别变量 但是对于表达变量的意图来说 这个后缀又是多余的

<br><br>

### 数据类型
rust中每一个值都有特定的数据类型 rust会根据数据类型来决定怎么处理他们 这里我们主要看下 标量类型 和 复合类型
```  
  rust是静态编译语言 在编译时必须知道所有变量的类型
  大部分情况下 基于使用的值 编译器通常能够推断出它的具体类型

  但是如果可能的类型比较多(例如把string转为整数的parse()) 就必须添加类型的标注 否则编译会报错 因为编译器推断出来的类型会比较多
```

```rs
fn main() {
  // 解析成功就会输出42 解析失败就会输出提示字符串
  let guess:u32 = "42".parse().expect("not a number");
  print!("{}", guess);
}
```

针对 42 这个数字 rust里面 有很多的整数数据类型能够将42包含在内 比如 i32 u32 等等 所以这时候 我们要给 guess 变量指明是哪种类型 这样 parse() 方法就知道 要把这个字符串解析成什么类型了

如果不标注类型 那么程序在编译期间就会报错(type annotations needed)


### 标量类型
一个标量类型代表一个单个的值
rust有四个主要的标量类型
整数类型
浮点类型
布尔类型
字符类型

<br>

### 整数类型
整数类型就是没有小数部分
例如:
u32就是一个无符号的整数类型 占据32位的空间 
没有正负号 表数范围 2^31-1 

无符号整数类型以 u 开头  unsigned
有符号整数类型以 i 开头  integer


<br>

### rust的整数类型列表如图:
每种都分 i 和 u 以及固定的位数

有符号范围:
-(2^n - 1) ~ 2^n-1 - 1  包括两头

无符号范围: 
0 ~ 2^n - 1  包括两头



    length    signed    unsigned

    8-bit     i8        u8

    16-bit    i16       u16

    32-bit    i32       u32

    64-bit    i64       u64

    128-bit   i128      u128

    arch      isize     usize


arch:
表示系统的架构

<br>

### isize 和 usize 类型
isize 和 usize 类型的位数由程序运行的计算机的架构所决定
如果是64位计算机 那就是64位的

使用它们的场景并不多 比如 对某种集合进行索引操作


<br>

### 整数的字面值
0x开头 0o开头 0b开头 b开头

    number literals     example

    Decimal(10进制)     98_222

    Hex(16进制)         0xff

    Octal(8进制)        0o77

    Binary(2进制)       ob1111_0000

    Byte(u8 only)       b'A'

除了 byte 类型外 所有的数值字面值都允许使用类型后缀
比如:
57u8
``` 
  57就是整数 使用u8类型作为后缀
```

如果我们不太清楚应该使用哪种数据类型 可以使用 rust 响应的默认类型

<br>

### 默认类型
整数的默认类型就是: i32
``` 
  i32总体上来说速度很快 即使在64位系统中
```


<br>

### 整数溢出
例如:
u8的范围是 0-255
如果你把一个u8变量的值设为256 那么会分为两种情况
1. 调试模式下编译:
rust会检查整数溢出 如果发生溢出 程序在运行时就会panic(恐慌)

2. 发布模式下(--release)编译:
rust不会检查可能导致 panic 的整数溢出

如果溢出发生: rust会执行 "环绕" 操作
如果我们将 u8的值设置为256 那么它就会变成0
257变成1
258变成2 ...

但是在发布模式下的溢出 不会导致程序的panic

<br><br>

<br>

### 浮点类型
rust有两种基础的浮点类型 也就是含有小数部分的类型

1. f32 浮点类型
32位 单精度

2. f64 浮点类型 -- *默认类型*
64位 双精度

rust的浮点类型使用了 ieee-754 标准来表述
f64是默认类型 因为在现在cpu上f64和f32的速度差不多 而且精度更高

```rs
let x = 2.0;  // 默认类型: f64
let y: f32 = 3.0;  // 显式定义: f32
```

<br><br>

<br>

### 数值的操作
加减乘除余等
rust支持对浮点类型的取余(两边都是同类型浮点数才可以 比如 1.0 % 3.0)
```rs
// 推断为 i32
let sum = 5 + 10;

// 推断为 i32
let difference = 4 * 30;

// 推断为 f64
let guotient = 56.7 / 32.2;

// 推断为 i32
let reminder = 54 % 5;
```

<br><br>

<br>

### 布尔类型
rust的布尔类型也有两个值: true false
占用一个字节的大小
符号是 bool
```rs
let t = true;
let f:bool = false;
```

<br><br>

<br>

### 字符类型
rust语言中 char类型被用来描述语言中最基础的单个字符

字符类型的字面值使用单引号

占用4个字节的大小

是unicode标量值 可以表示比asc2多得多的字符内容 拼音 中日韩文 零长度空白字符 emoji表情等

Unicode的表数范围: 
  U+0000 ~ U+D7FF
  U+E000 ~ U+10FFFF

但unicode中并没有 "字符" 的概念 所以直接上认识的字符也许与rust中的概念并不相符

```rs
let x = 'z';

let y: char = 'z';

let z = '☺';
```

<br><br>

### 复合类型
复合类型就是将多个值放在一个类型里面
rust提供了两种基础的复合类型: 元组(Tuple) 和 数组

<br>

### Tuple
它可以将多个类型的多个值放在一个类型里面
它的长度是固定的 一旦声明就无法改变
``` 
  Ts中它就是一个固定长度的数组
```

<br>

### Tuple的创建
在小括号里面 将值用逗号分开
Tuple中的每个位置都对应一个类型 Tuple中各元素的类型不必相同
```rs
let tup: (i32, f64, u8) = (500, 6.6, 1);
print!("{}, {}, {}", tup.0, tup.1, tup.2);
```


<br>

### 获取 Tuple 的元素值
可以使用模式匹配来解构(destructure) 一个Tuple来获取元素值
```rs
let tup: (i32, f64, u8) = (500, 6.6, 1);
let (x,y,z) = tup;

print!("{}, {}, {}", x, y, z);
```


<br>

### 访问 tuple 的元素
在 tuple 变量使用 点标记法 后接元素的索引号
.索引
```rs
let tup: (i32, f64, u8) = (500, 6.6, 1);
print!("{}, {}, {}", tup.0, tup.1, tup.2);
```

<br><br>

<br>

### 数组
数组也可以将多个值放在一个类型里
数组中每个元素的类型必须相同
数组的长度也是固定的 一旦声明之后不能改变数组的长度

<br>

### 声明一个数组
在中括号, 各值用逗号分开
```rs
let a = [1,2,3,4,5];
```

<br>

### 数组的用处
如果我们想让数据存放在stack(栈)上 而不是heap(堆)上 或者想保证有固定数量的元素 这时候使用数组更有好处 
``` 
  数组没有vector灵活(以后再讲)
  vector和数组类似 它由标准库提供
  vector的长度可以改变

  如果我们不确定应该用数组还是vector 那么估计你应该用vector
```

```rs
let months = [
  "一月",
  "二月",
  "三月",
];
```


<br>

### 数组的类型
数组的类型以这种形式表示: [类型; 长度]
```rs
let arr: [i32; 5] = [1,2,3,4,5];
```

<br>

### 另一种声明数组的方法
如果数组的*每个元素值都相同* 那么可以在 中括号里面指定初始值 然后接一个; 最后是数组的长度

let arr = [数据; 数组长度]

```rs
let arr = [3; 5];

// 等于
let arr = [3,3,3,3,3];
```

<br>

### 访问数组的元素
数组是stack上分配的单个块的内存 我们可以使用索引来访问数组的元素
```rs
let first = months[0];
```

如果访问的索引超出了数组的范围 那么
编译的时候会通过 不会报错
运行会报错(runtime时会panic) 数组越界

rust不会允许其继续访问相应地址的内存

``` 
  数组的原理
  它在内存中是一块连续的内存

  | 0 | 1 | 2 | 3 | 4 |

  2的位置在数组中的第一个位置加上第一个元素的长度

  如果我们想访问 5 的元素 已经超出索引的范围了 
```

<br><br>

### 函数
声明函数使用 fn 关键字
依照惯例 针对函数和变量名 rust使用snake case命令规范:
所有的字母都是小写 单词之间使用下划线分开
```rs
fn main() {
  another_function();
}

fn another_function() {
  println!("Another function")
}
```

<br>

### 函数的参数
parameters(形参) arguments(实参)
在函数的签名里 必须声明每个参数的类型

```rs
fn main() {
  another_function(5);
}

fn another_function(x: i32) {
  println!("{}", x)
}
```


<br>

### 函数体中的语句与表达式
函数体由一系列的语句组成 可选的由一个表达式结束
rust是一个基于表达式的语言 
语句是执行动作的指令
``` 函数的定义也是语句```

表达式会计算产生一个值 
```rs
// 下面不管从整体看 还是 函数体中的一句let y = 6 它们都叫做语句
fn main() {
  let y = 6;    // 语句
}
```

语句没有返回值 所以不可以使用let将一个语句赋给一个变量
```rs
// 报错 
// 程序期待等号的右侧是表达式 但是程序发现等号的右侧是一个语句
let x = (let y = 6);
```

表达式都会对应一个值 比如 5 + 6
调用函数也是一个表达式

```rs
fn main() {
  let x = 5;
  let y = {
    let x = 1;
    x + 3
  };

  println("{}", y)

  /*
  {
    let x = 1;
    x + 3
  }   -- 这个部分就是表达式 
      -- 注意: x + 3 的后面没有 ;

  x + 3 就是块表达式的值 也就是4 
  它是块中的最后一个表达式 相当于块表达式的返回值

  x + 3; 如果x + 3的后面有; 那么它就相当于语句了
  语句就没有返回值了 (也相当于有返回值 只不过是() )

  */
}
```

<br>

### 函数的返回值
<br>

### fn 函数名() -> 返回值类型 { }
在 -> 符号后边声明函数返回值的类型 但是不可以为返回值命名
在rust里面 返回值就是函数体里面最后一个表达式的值
若想提前返回 需使用 return 关键字 并指定一个值

大多数函数都是默认使用最后一个表达式作为返回值
```rs
fn five() -> i32 {
  // 5就是表达式 后面没有; 5是函数中最后一个表达式 那么它就是函数的返回值
  5
}

fn main() {
  let x = five();
  println!("{}", x);    // 5
}

--- 

fn five(x: i32) {
  // 表达式没有; 有了就是语句了 
  x + 5
}

fn main() {
  let x = five(6);
  println!("{}", x);
}
```

<br><br>

### 控制流 if else if else

<br>

### if表达式
if表达式允许您根据条件来执行不同的代码分支
这个条件必须是 bool 类型
if表达式中 与条件相关联的代码块就叫做分支 (arm)
可选的 在后面可以加上一个 else 表达式

<br>

### if 表达式 {}
这里的表达式 没有()
表达式必须是布尔类型 比如js可以把非布尔类型的值转换为布尔类型 rust绝不会这么做

```rs
fn main() {
  let number = 3;
  if number < 5 {
    println!("condition was true");
  } else {
    println!("condition was false");
  }
}
```


```rs
fn main() {
  let number = 6;

  if number % 4 == 0 {
    println!("number is divisible by 4");
  } else if number % 3 == 0 {
    println!("number is divisible by 3");
  } else if number % 2 == 0 {
    println!("number is divisible by 2");
  } else {
    println!("number is not divisible by 4, 3, or 2");
  }
}
```

如果我们代码里面使用了多余一个else if 那么最好使用 match 来重构代码


<br>

### 在 let 语句中使用 if 可以说是另类的三元表达式
因为 if 是一个表达式 所以可以将它放在let语句中 等号 的右边

```rs
fn main() {
  let condition = true;
  // 块里最后一个表达式 不能有 ; 它就是表达式
  let number = if condition { 5 } else { 6 };
  
  println!("{}", number);
}
```

**注意:**
"三元表达式" 的前后值的类型 必须统一
```rs
// 报错
let number = if condition { 5 } else { "6" };
```

<br><br>

### 控制流 循环
rust提供了 3种 循环:
1. loop
2. while
3. for

这里我们没有do while

<br>

### loop { }
loop 关键字告诉 rust 反复的执行一块代码 直到你喊停

```rs
fn main() {
  loop {
    println!("again")
  }
}
```

可以在 loop循环中使用break 关键字来告诉程序何时停止循环
```rs
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;
        if counter == 10 {

            // 这里为什么加上;也可以？？？？
            break counter * 2
        }
    };

    println!("{}", result);
}
```

<br>

### while 条件循环
另外一种常见的循环模式是每次执行循环体之前都判断一次条件
while 后面的条件 也不用使用()包裹

```rs
fn main() {
  let mut number = 3;

  while number != 0 {
    println!("{}", number);
    number = number - 1;
  }

  println!("lift off");
}
```

<br>

### for循环 遍历集合
可以使用 while 或 loop 来遍历集合 但是易错且低效
低效的原因是 每次程序执行之前都需要判断条件
```rs
fn main() {
  let a = [10, 20, 30, 40, 50];

  let mut index = 0;

  // 这就是容易出错的地方
  while index < 5 {
    println!("{}", a[index]);

    index = index + 1;
  }

}
```

使用for循环更简洁紧凑 它可以针对集合中的每个元素来执行一些代码
```rs
fn main() {
  let a = [10,20,30,40,50];

  // 在编辑器中我们能看到 item 上有一个 &取地址符号 也就是说 item并不是复制的结果 而是直接引用数组中的元素
  for item in a.iter() {
    println!("{}", item)
  }
}
```

<br>

### 解析:
1. 类似 for ... in 的写法
2. in 的后面使用的是 数组.iter() 
数组.iter() 会返回迭代器

<br>

### 好处
利用迭代器不会出现索引越界的问题 
在每次遍历的时候也不用检查条件

由于for循环的安全 简洁性 所以它在rust里面用的最多 


<br>

### Range
标准库提供 
指定一个开始数字 和 一个结束数字
Range可以生成他们之间的数字(不包括结束)

<br>

### 格式: (start..end)
(1..3)  从1到2 不包括3
相当于 定义循环中的 i=0 i<arr.length 了吧

<br>

### rev()
rev()方法可以反转Range

```rs
fn main() {
  for number in (1..4).rev() {
    println!("{}", number);
  }

  println!("LIFTOFF!")
}
```

<br><br>

### 所有权
所有权是rust最独特的特性 它让rust无序GC就可以保证内存安全

<br>

### 什么是所有权
rust的核心特性就是所有权
所有程序在运行时都必须管理它们使用计算机内存的方式
```
  c# java都有垃圾回收极致 在程序运行时 它们会不断地寻找不再使用的内存 将它们进行收集和释放

  在其他语言中 程序员必须显式的分配和释放内存 比如 c c++
-->

rust采用了第三种方式
rust使用了所有权系统来管理内存 其中包含一组编译器在编译时检查的规则 这种做法不会产生运行时开销
当程序运行时 所有权特性不会减慢程序的运行速度 因为rust把内存管理相关的工作 都提前到了编译时


<br>

### 栈内存 和 堆内存
在编程的时候程序员不需要考虑栈内存和堆内存之间的区别 对于rust系统级的编程语言来看 

一个值在stack上还是在heap上对语言的行为和你为什么要做某些决定是由更大的影响的

rust所有权的内容会涉及到 栈和堆 的内容

在代码运行或程序运行的时候 stack和heap都是你可用的内存 但它们的结构很不相同


<br>

### 存入数据

<br>

### stack
Stack按值的接收顺序来存储 按相反的顺序将它们移除(后进先出 LIFO)
往 stack 添加数据 叫做 压入栈
从 stack 移除数据 叫做 弹出栈

所有存储在 stack 上的数据必须拥有已知的固定大小
编译时大小未知的数据或运行时大小可能发生变化的数据必须存放在heap上 


<br>

### heap
heap对内存组织性差一些
当我们把数据放入heap时候 你会请求一定数量的空间
操作系统再heap里找到一块足够大的空间 把它标记为在用 并返回一个指针 也就是这个空间的地址

这个过程叫做在heap上进行分配 有时仅仅成为"分配"

把值压入到stack上就不叫分配 因为这个值在stack中就是挨着放的 但因为指针是已知固定大小的 可以把指针放在stack上

但如果想要访问指针所指向的数据 我们就需要使用指针来定位 也就是指针指向的地址来访问数据
``` 
  想象成到饭店吃饭
  到饭店后我们会表明有多少个人 要多少位置 这时候饭店的服务员会找到一张足够大的桌子 然后将我们入座就餐 

  即使有朋友来晚了 他们可以通过问你就坐的位置找到我们
```

把数据压到stack上要比在heap上分配快得多
因为操作系统不需要寻找用来存储新数据的空间 那个位置永远都在stack的顶端

在heap上分配空间需要做更多的工作
``` 
  首先操作系统需要找到一个足够大的空间来存放数据
  然后要做好记录方便下次分配
```


<br>

### 访问heap中的数据
访问heap中的数据 要比 访问stack中的数据慢 因为需要通过指针才能找到heap中的数据 多了指针跳转的环节 需要间接访问

对于现代的处理器来说 由于缓存的缘故 如果指令在内存中跳转的次数越少 那么速度就越快

``` 
  继续拿饭店的例子来说 假设现有很多座的顾客 都在等着点菜
  最高效的处理方式 服务员等这桌把菜点完了之后再去处理下一桌 如果这桌刚点完一个菜 这个服务员就去下一桌接着点另外一个菜 这样串着点 那么她就会浪费很多时间 往返与这些桌子间
```

同样如果数据存放的举例比较近 那么处理器的处理速度就会更快一些(例如把数据放在stack上)

如果数据之间距离比较远 那么处理速度就会慢一些(例如把数据放在heap上)
寻址时间

另外在heap上分配大量空间也是需要时间的


<br>

### 函数调用
当我们的代码调用函数时 值被传入到函数(也包括指向heap的指针)
函数的变量被压到stack上 当函数结束后 这些值会从stack上弹出


<br>

### 所有权存在的原因
所有权能解决的问题:
1. 跟踪代码的哪些部分正在使用 heap 的哪些数据
2. 最小化 heap 上的重复的数据量
3. 清理 heap 上未使用的数据以避免空间不足

一旦我们懂了所有权 那么就不需要经常去想stack或heap了
但是知道管理heap数据是所有权存在的原因 这有助于解释它为什么会这样工作


<br>

### 所有权的三条规则
1. 每个值都有一个变量 这个变量是该值的所有者
2. 每个值同时只能有一个所有者
3. 当所有者超出作用域时 该值将被删除


<br>

### 变量的作用域
scope就是程序中一个项目的有效范围
```rs
fn main() {
  // 该行 s 不可用 未声明
  let s = "hello";

}
// s 的作用域到此结束 s 不再可用
```

s会保持有效性直到离开作用域为止


<br>

### String类型
String比那些基础标量数据类型更复杂
之前讲的基础数据类型都是存放在栈上面 它们离开自己的作用域的时候 就会弹出栈

现在我们需要一个存储在heap上面的数据类型 来研究rust是如何自动回收这些数据的 string就符合我们的要求 这章我们讲它只是讲与所有权相关的部分

之前我们说过 字符串字面值:
程序里手写的那些字符串值 它们是不可变的
``` 
  程序中写死的那些字符串值它们虽然很方便但是不能满足所有的需求场景
  - 因为字符串的字面值是不可变的
  - 不是所有的字符串值都能在编写代码的时候确定 

  - 比如
  - 我们要获取用户的输入并保存 这时候我们应该怎么办呢？
  - 这时候rust就提供了第二种的字符串类型 String
```

String类型在heap上分配自己所需要的存储空间 能够存储在编译时未知数量的文本


<br>

### 创建 string 类型的值
可以使用 from 函数从字符字面值创建出string类型

```rs
let s = String::from("hello");
```

:: 表示 from 是 string 类型下面的函数
或者说 from 是 string 这个命名空间下的函数

像 s 这类字符串是可以被修改的 

<br>

### 字符串.push_str("字符串")
往一个字符串变量中追加字符

```rs
fn main() {
  // 使用from函数从字符串字面值生成了一个s的变量
  let mut = String::from("hello");

  // 追加 , world
  s.push_str(", world");

  println!("{}", s);
}
```

<br>

### 为什么string类型的值可以修改 而字符串字面值却不能修改？
因为它们处理内存的方式不同

<br>

### 内存和分配
字符串字面值:
对于字符串字面值来说 在编译时就知道它的内容了 其文本内容直接被硬编码到最终的可执行文件里

所以速度快 高效 是因为其不可变性

String类型:
为了支持可变性 需要在heap上分配内存来保存编译时未知大小文本内容 这也就意味着操作系统必须在运行时请求内存 这步是通过调用 String::from 来实现的

当String用完之后 需要使用某种方式将内存返回给操作系统 这步在拥有GC的语言中 GC会跟踪并清理不再使用的内存 没有GC的语言中 就需要我们去识别何时不再使用 并调用代码将它返回 如果忘了的话 那就会浪费内存 如果提前做了 变量就会非法 如果做了两次 也是bug 必须一次分配对应一次释放

rust采用了不同的方式:
对于某个值来说 当拥有它的变量走出作用范围时 内存会立即自动的交还给操作系统

```rs
fn main() {
  let mut s = String::from("hello");

  s.push_str(", world");

  println!("{}", )
}
```

变量s的作用域就是到 花括号结束 就超出作用域了 s就失效了 rust中当变量离开作用域后 *rust会自动调用drop()*


<br>

### 变量和数据交互的方式 -- 移动(move)
多个变量可以与同一个数据使用一种独特的方式来交互

简单的情况:
```rs
let x = 5;    // 5绑定到了x上面
let y = x;    // 相当于创建了x的副本 副本绑定到y上
```

然后我们就得到了 x y 都是5 并且都是整数类型
整数是已知且固定大小的简单的值 这两个5被压到了stack中


复杂的情况: String
```rs
// 通过from函数从字符串字面值得到一个string类型的s1
let s1 = String::from("hello");

// 把s1 绑定到 s2 上面
let s2 = s1;
```

虽然代码和上面的很相似 但是运行方式完全不同
一个String由3部分组成
prt: 
  存放的是指针 指向存放字符串内容的内存的指针

len:
  长度 就是存放字符串内容所需的字节数

capacity:
  容量 是指String从操作系统总共获得内存的总字节数
``` 
  s1

  name        value           index   value
  ptr         ->      ->      0       h
  len         5               1       e
  capacity    5               2       l
                              3       l
                              4       o
```

上面左边的内容放在了 stack 上
上面右边的内容放在了 heap 上

当把s1赋值给s2的时候 String的数据被复制了一份
``` 
  s1

  name        value           index   value
  ptr         ->      ->      0       h
  len         5               1       e
  capacity    5               2       l
                              3       l
                              4       o


  s2
                    ↗
  name        value   
  ptr         ->
  len         5 
  capacity    5
```

在stack上复制了一份指针 长度 容量 并没有复制指针所指向的heap上的数据

当变量离开作用域的时候 rust会自动调用 drop函数 并将变量使用的heap内存释放

当s1 s2离开作用域的时候 它们都会尝试释放相同的内存
这时候就会引起严重的bug 二次释放(double free)
这种二次释放可能会导致某些正在使用的数据发生损坏 进而产生潜在的安全隐患

为了保证内存的安全 rust没有尝试赋值被分配的内存 
当我们将s1赋值给s2后 rust让s1失效 当s1离开作用域的时候 rust不需要释放任何东西

我们可以是时候 当s2创建以后再使用s1是什么效果

```rs
let s1 = String::from("hello");

// s1赋给了s2 赋值之后s1就失效了
let s2 = s1;

// 在s2之后s1应该失效了 这里再次尝试使用s1
println!("{}", s1);

// 报错 brrow of moved value 借用了已经移动的值 移动之后又借用了这个值
```


<br>

### 浅拷贝 -- shallow copy
<br>

### 深拷贝 -- deep copy
你也许会将复制指针 长度 容量视为浅拷贝 但由于rust同时让s1失效了 所有我们用一个新的术语 移动(Move) 

隐含的一个设计原则 rust不会自动创建数据的深拷贝
也就是说 就运行时的性能而言 任何自动赋值的操作都是廉价的


<br>

### 变量和数据交互的方式 -- 克隆(clone)
如果真想对heap上面的String 数据进行深度拷贝 而不仅仅是stack上的数据 可以使用 clone() 方法

<br>

### clone()


以后再细说 我们先看一个例子
```rs
let s1 = String::from("hello");

// 
let s2 = s1.clone();

println!("{}, {}", s1, s2);
```

使用clone()之后的结构图如下
``` 
    s1

    name        value           index   value
    ptr         ->      ->      0       h
    len         5               1       e
    capacity    5               2       l
                                3       l
                                4       o


    s2

    name        value           index   value
    ptr         ->      ->      0       h
    len         5               1       e
    capacity    5               2       l
                                3       l
                                4       o
```

相当于把s1无论是stack上面 还是heap上面都完整的复制了一份 但是clone()这种操作是比较消耗资源的 这种克隆主要是针对堆上面的数据

而针对stack上面的数据 我们不需要克隆 我们叫做复制
```rs
let x = 5;

// 这里我们将x赋值给了y
let y = x;


// 但是这里 x y 都是有效的 为什么？
println!("{}, {}", x, y);
```

因为x是整数类型 整数类型在编译的时候就确定了自己的大小 并且能将自己的数据完整的存储在stack中 对于这些值的复制操作 永远都是非常快速的 这也同样意味着在创建变量y之后 我们没有任何理由去阻止变量x继续保持有效 

换句话说对于这些类型而言深度拷贝和浅拷贝是没有任何区别的 这些类型调用clone()并不会与直接的浅拷贝有任何行为上面的区别 因此我们不需要在类似的场景中考虑上面的问题


rust提供了一个copy trait(接口) 可以用于像整数这样完全存放在stack上面的类型

如果一个类型实现了copy 这个trait 那么旧的变量在赋值后仍然可用
如果一个类型或者该类型的一部分实现了 Drop trait
那么rust不允许它再去实现 copy trait 了

``` 
  弹幕说 实现copy 先得实现clone
```

<br>

### 一些拥有copy trait 的类型:
任何简单标量的组合类型都可以是 copy 的
任何需要分配内存或某种资源的都不是 copy 的

一些拥有copy trait的类型
1. 所有的整数类型 例如 u32
2. bool char 所有浮点类型 例如f64
3. tuple 如果其所有的字段都是copy的 那么这个tuple也是拥有 copy trait 的类型

<br><br>

### 所有权 与 函数
在语义上 将值传递给函数 和 把值赋给变量是类似的
将值传递给函数 将发生移动或复制

看下例子
```rs
fn main() {

  // 将函数的返回值 移动给了 s1
  let s1 = gives_ownership();

  let s2 = String::from("hello");

  // 将s2 当做参数传入了 这个函数 然后把返回值绑定到了s3这个变量的上面
  // s2先去move到了函数里面 然后函数的返回值又move到了 s3
  let s3 = takes_and_gives_back(s2);
}


fn gives_ownership() -> String {
  // 先声明了一个 some_string
  let some_string = String::from("hello")

  // 返回这个 some_string 这个返回值就会移动(move)到调用这个函数的里面
  some_string 
}


// 这个函数的作用就是取得了 s2 的所有权 并将结果进行了返回
fn takes_and_gives_back(a_string: String) -> String {
  a_string
}

```

<br>

### 返回值 与 作用域
函数在返回值的过程中同样也会发生所有权的转义

```rs
fn main() {
  let s = String::from("hello world");

  // 这个时候 s 的值就相当于被移动到 函数里面了 从这以后s就不再有效了
  take_ownership(s);


  // 声明了一个变量x
  let x = 5;

  // x被传入到函数的里面 但是由于x是i32类型的 i32类型实现了copy_trait 往函数里面传的实际上x的副本
  makes_copy(x);

  // x在这里仍然是有效的
  println!("x: {}", x);
}


fn take_ownership(some_string: String) {
  println!("{}", some_string);
}

fn makes_copy(some_number: i32) {
  println!("{}", some_number);
}
```

一个变量的所有权总是遵循同样的模式
把一个值赋给其它的变量时就会发生移动
当一个包含heap数据的变量离开作用域的时候 它的值就会被drop函数清理 除非数据的所有权移动到另一个变量上


<br>

### 如何让函数使用某个值 但不获得其所有权呢？
下面的这种做法是 将一个变量作为参数传入 然后通过结果返回
```rs
fn main() {
  let s1 = String::from("hello world");
  
  // 我们想把s1的值给这个函数使用 s1的所有权用完之后再还回来
  let (s2, len) = calculate_length(s1);
  // calculate_length函数返回的s的所有权就相当于交给了s2 而length有是usize类型的 返回的时候 返回一个副本就可以了

  println!("the length of {}", s2, len);
}


// s1传进来后 所有权就给了s s最后再函数内部 又原封不动的返回出去了 返回的是一个元组 元组中第二个值是usize
fn calculate_length(s:String) -> (String, usize) {
  let length = s.len();

  (s, length)
}

```

但是这种 如何让函数使用某个值 但不获得其所有权呢？ 操作又是一个常见的场景 所以也是 rust 里面的一个 特性 叫做 引用 (reference)

<br><br>

### 引用和借用
*没听完 先停停 有点难学*


<br>

### 形参: s: &String
&String代表 String的引用

```rs
fn main() {

  let s1 = String:from("hello");

  // 将&s1的引用作为参数 传入到了函数中 引用了s1但不拥有s1 所以当&s1走出作用域的时候 它指向的值s1并不会清理掉
  let len = calculate_length(&s1);

  println!("The length of '{}' is {}", s1, len)
}

fn calculate_length(s: &String) -> usize {
  s.len()
}
```

<br>

### $String
参数的类型是 &String 而不是 String
&符号就表示引用：
允许你引用某些值而不取得其所有权

图解:
``` 
  形参s          s1
  name value    name value    index value
  ptr     →     ptr      →     0       h
                len      5     1       e
                capacity 5     2       l
                               3       l
                               4       o
```

形参s 相当于一个指针指向了s1
s1也是一个指针 它指向了存在heap上 这些真实的内容