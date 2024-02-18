# 包的概念
包(package)是多个go源码的几何, 是一种高级的代码复用方案, go语言为我们提供了很多的内置包, 比如
- fmt
- strconv
- strings
- sort
- errors
- time
- encoding/json
- os
- io

<br>

### golang中的三种包
1. 系统内置包: 如上
2. 自定义包: 开发者自己写的包
3. 第三方包: 属于自定义包的一种, 需要下载安装到本地后才能使用, 比如前面说的 ``github.com/shopspring/decimal``解决float精度丢失的问题

<br>

### 包的理解
包(package)是多个go源码的几何, 一个包可以简单理解为一个存放多个.go文件的文件夹, 该文件夹下面的所有go文件都要在代码的第一行添加如下的声明 声明该文件归属哪个包
```s
package 包名
```

<br>

### 注意:
1. 一个文件夹下面直接包含的文件只能归属一个package, 同样一个package的文件不能在多个包中

2. 包名可以不和文件夹的名字一样, 包名不能包含 ``-`` 符号

3. 包名为 main 的包, 为应用程序的入口包, **这种包编译后会得到一个可执行文件, 而编译不包含main包的源代码则不会得到可执行文件**

<br><br>

# go mod
它是go语言从 1.11 版本推出的依赖管理工具

- 1.11版本之前 **如果我们要自定义包的话必须把项目放在gopath目录**
- 1.11版本之后 无需手动配置环境变量 **使用 go mod 管理项目**

也不需要非得把项目放到gopath指定目录下, 你可以在你磁盘的任何位置新建一个项目, **1.13以后可以彻底不要gopath了**

<br>

大多数语言都会有包管理工具
- node: nvm
- java: maven

go使用的就是 go module 管理模块功能, 用来管理依赖包

<br>

之前我们在开发go项目, 都需要将代码放在GOPATH下(也就是工作空间) 来存放go的开发代码和第三方包的代码, 代码还需要按照一定的目录进行安排

这样不够灵活 

但是有了 go module 后, 我们随便一个目录 都可以放go的项目

<br>

### 开启 go module
我们要使用 go module 就要先设置 GO111MODULE 环境变量, 将它设置为on, **新版本的go中默认就是开启的**

```s
go env -w GO111MODULE=on
```

<br><br>

# go mod的使用

### 创建(初始化)项目
```s
go mod init gomod(模块名)
```

相当于使用 ``npm init -y`` 初始化一个package.json文件

我们通过该命令在当前目录下创建一个项目, 每**一个项目就是一个模块**, 模块名和项目名称统一起来

该命令会生成一个``go.mod``文件 管理我们的项目依赖

<br>

### go.mod配置文件
默认配置文件内容
```s
module itying

go 1.19
```

<br>

**详解:**  
```s
# go.mod
module 模块名

# go sdk版本
go 1.19

# 依赖管理: 当前module(项目)依赖的包
require (
  依赖包名 版本
)

# 排除第三方模块 项目中不要哪些依赖
exclude (
  依赖包名 版本
)

# 替换
replace (
  源路径 版本 => 目录路径 版本
)

# 撤回: 当前项目作为其他项目的依赖, 如果某个版本出现了问题则撤回该版本
retract (

)
```

<br>

**替换的作用:**  
用于替换模块的导入路径或指定模块的新版本。这在几种场景下特别有用：

1. 开发中的本地替换  
如果你正在开发一个模块，同时需要对另一个模块（可能是你也在开发的）进行修改和测试，你可以使用replace指令将依赖指向本地的文件路径，而不是远程仓库中的版本。这允许你在不发布到远程仓库的情况下测试改动。

2. 覆盖依赖  
如果一个依赖的模块存在问题，或者你需要使用该模块的一个未正式发布的版本，你可以使用replace来指定一个修正版本的路径或git仓库。

3. 模块路径更改  
如果一个模块的路径发生了更改（例如，作者更改了GitHub用户名，导致仓库路径变化），你可以使用replace来临时修正依赖路径，直到依赖的其他模块也更新了它们的import路径。

假设你正在开发一个模块，依赖于GitHub上的example.com/old/module，但是这个模块现在已经迁移到了example.com/new/module，并且你正在等待上游的依赖也更新他们的导入路径。你的go.mod文件中的replace指令可能看起来像这样：
```s
replace example.com/old/module => example.com/new/module v1.2.3
```

<br>

**module 模块名:**  
module 模块名有一个作用, 我们代码中引入某个包中的文件, 基础路径都是基于这个模块名开始的

比如我们的项目名为GOPRO
```s
module GOPRO
```

则我们引入其他包的文件的时候 引入都是基于GOPRO开始的
```s
import (
	"GOPRO/utils"
)
```

<br><br>

## 引入自定义模块(包):
```s
| - 项目名称
  | - main
    - main.go
  | - utils
    - util.go
```

<br>

### 引入方式
我们在 main.go 文件中 引入其他的包中的方法的时候 以 ``模块名/包名`` 的方式引入

引入到包后``import "GOPRO/utils"``, 包中所有的go文件中的方法都通过该包名来访问, ``包名.方法``
```go
// utils包
package utils

import "fmt"

func Add() {
	fmt.Println("util")
}
```

```go
// main包
package main

// 我们的项目名就是GOPRO(根目录)
import "GOPRO/utils"

func main() {
	utils.Add()
}
```

<br>

**包的别名引入:**  
在导入包名的时候, 我们还可以为导入的包设置别名, 通常用于导入的包名太长或者导入的包名有冲突的情况

```go
import 别名 "包的路径"

import u "GOPRO/utils"
```

<br>

**匿名导入包:**  
包引入不用的话, 但有不想删除 我们可以使用这样的方式, 匿名导入的包与其他方式导入的包一样都会编译到可执行文件中

```go
import _ "包的路径"

import _ "GOPRO/utils"
```

<br><br>

## 导入第三方包
我们可以在 ``https//pkg.go.dev`` 查找常用的golang第三方包

<br>

### 使用第三方包的流程
**1. 找到我们需要下载安装的第三方包的地址**  
比如前面给大家演示的解决float精度损失的包 decimal
```s
https://github.com/shopspring/decimal
```

再比如json序列化的包 gjson

<br>

**2. 安装这个包**  
**方式1: 全局下载** 相当于 ``npm i 依赖 -g ``
```s
go get 包名称

go get github.com/shopspring/decimal
```

<br>

**方式2: 全局下载** 该方式包会自动下载到 ``$GOPATH/pkg/mod`` 多个项目可以共享缓存的mod

方式2的使用分为两步  
1. 首先在go文件中引入要依赖的包
2. 然后运行下面的命令
```s
go mod download 
```

当我们下载完后 go会在go.mod文件中 require我们刚才下载的包
```s
module itying

go 1.11

require github.com/shopspring/decimal v1.2.0
```

同时我们的项目中还会生成一个 ``go.sum`` 文件, 类似 lock文件吧

<br>

**方式3: 项目目录下(常用)** 将网上的第三方依赖复制到当前项目的vendor下, 也就是**相当于将第三方依赖放在了node_modules目录(vendor)下**, 使用该方式必须有如下的两个步骤

1. 首先在go文件中引入要依赖的包
2. 然后运行下面的命令
```s
go mod vendor
```

<br>

**方式4:**  
**直接在go文件中引入要依赖的包**, 然后执行 ``go run main.go`` 这时go会自动下载 将依赖下载到``$GOPATH``下

<br>

**go mod vendor的作用:**  
根据你的 go.mod 文件中定义的依赖，将依赖的包复制到项目目录下的 vendor 文件夹中。

这样做可以确保你的项目能够使用特定版本的依赖，**同时也方便在没有网络连接的环境下进行构建。**

一般会在项目中下载和引入依赖后, 我们再使用该命令将依赖放在项目下

<br><br>

## go mod的常用命令
|命令|作用|
|:--|:--|
|go mod init|初始化当前文件夹, 创建go.mod文件|
|go mod edit|编辑 go.mod 文件|
|go mod tidy|增加缺少的包, 删除无用的包|
|go mod download|下载依赖包到本地(默认在 GOPATH/pkg/mod 目录)|
|go mod graph|打印模块依赖图|
|go mod vendor|将依赖复制到 vendor 目录下, 相当于将依赖下载到node_modules目录下|
|go mod verify|检验依赖|
|go mod tidy|增加丢失的module, 去掉未用的module|
|go list -m all|查看所有依赖|

<br>

### go mod download
下载依赖到本地 需要指定模块路径以及版本号
```s
go mod download github.com/gin-gonic/gin@1.9.0
```

<br>

### 待整理
```s
https://www.bilibili.com/video/BV1Us4y197Ge/?p=10&spm_id_from=333.880.my_history.page.click&vd_source=66d9d28ceb1490c7b37726323336322b
```