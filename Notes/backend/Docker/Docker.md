# 为什么会有Docker出现
我们写的代码会接触到好几个环境
- 开发环境: 程序员使用
- 测试环境: 测试人员使用 我们写好的代码将来会到测试环境中测试

- 生产环境: 测试环境通过后 我们要部署到生成环境中上线 运维 生产环境由运维人员来操作

<br>

### 正常流程
我们写好的程序比如vue要在开发环境中启动 进行自测 如果自测通过 我们就会将代码给到测试人员

我们会将程序打包丢给测试 一般情况下 我们会将 程序打成 war包 然后部署到测试的服务器上

测试人员进行测试 如果测试通过的话 再将war包给到对应的运维人员 运维人员将代码部署到正式的生产的服务器上 

部署再测试 如果生产环境中没有问题就ok了 这次发版就结束

```
开发环境 -> 测试环境 -> 生产环境
```

<br>

### 异常情况
比如我们的java代码使用的jdk8 但是测试环境下它们装的jdk7 这两个版本就不一样 我们的代码在jdk7的话 可能就会出现bug

我们本地jdk8的情况下没有问题 但是测试环境中出问题了 那么测试人员就会找你 由于环境造成的问题很常见

一般这样的问题我们会称之为 **代码水土不服**

那既然是水土不服 那么我们是不是可以将环境也一起发给测试
```
jdk8的环境 + war包 -> 测试
```

这样测试可以使用程序员提供的环境来进行测试 避免环境的问题 那怎么将环境 + 代码给到测试呢？ 我们需要将环境和代码装到一个容器里面去 这个容器里面相当于装了一些软件而已

我们将这个容器发给对应的测试人员

```
    容器
-----------
JDK8 + .war   ->  测试  -> 
-----------
```

这样测试人员就不需要用它自己的环境了 只需要在这里容器里面进行测试 这样就规避了环境不同导致的bug了

这样测试通过后再把容器给到运维人员 运维人员再在这个容器里面测试 这样同时也规避了 **软件跨环境迁移的问题**

上面说的容器 就是我们要学的 **docker** docker 就是一个容器的技术

<br>

### Docker包含两方面技术
1. 镜像技术
2. 镜像既是应用

<br><br>

## 容器与虚拟机比较

### 虚拟机:
带环境安装的一种解决方案

它可以在一种操作系统里面运行另一种操作系统, 比如windows下运行Linux

应用程序对此毫无感知 因为虚拟机看上去跟真实的操作系统是一模一样的 而对于底层系统来说 虚拟机就是一个普通的文件 不需要了就删掉

对其他的部分毫无影响 这类虚拟机完美的运行了另一套系统 能够使应用程序 操作系统和硬件三者之间的逻辑不变

<br>

**缺点:**  
1. 资源占用多
2. 冗余步骤多
3. 启动慢

<br>

### 容器
容器可以将软件运行所需要的所有资源打包到一个隔离的容器中, **容器与虚拟机不同 不需要捆绑一套操作系统**

只需要软件工作所需的库资源和设置, 系统因此变得高效轻量并保证部署在任何环境中的软件都能始终如一的运行

Docker容器是在操作系统层面上实现虚拟化, 直接复用本地主机的操作系统 而传统的虚拟机则是在硬件层面实现虚拟化, 与传统的虚拟机相比, Docker优势体现为

1. 启动速度快
2. 占用体积小

<br><br>

## Docker资源

### 官网:
```s
http://www.docker.com
```

<br>

### 仓库:
安装docker镜像的仓库
```s
http://hub.docker.com
```

<br><br>

## Docker的三要素

1. 镜像 (image): 相当于Java类
2. 容器 (container): 相当于Java类的实例对象
3. 仓库 (repository): 存放镜像的地方

<br>


