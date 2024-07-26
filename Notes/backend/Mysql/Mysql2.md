# Mysql高级特性
1. 架构篇
2. 索引 和 调优
3. 事务篇
4. 日志 和 备份

<br><br>

# CentOS6 和 CentOS7 在mysql的使用中的区别

### 防火墙方面的区别
- CentOS6: 使用 iptables
- CentOS7: 使用 firewalld

<br>

### 启动服务命令的区别
- CentOS6: 使用 service
- CentOS7: 使用 systemctl

<br><br>

# Linux 相关

## 根目录

`/` 它是Linux的根目录

```s
# 存放基本的用户命令，如常用的二进制可执行文件（如ls、cp等），这些命令在单用户模式下也能使用
| - bin

# 包含启动加载器的文件（如grub），以及Linux内核文件，系统引导时使用
| - boot

# 包含设备文件，这些文件提供设备的接口，例如硬盘、终端、打印机等
| - dev

# 存放系统配置文件和脚本。例如网络配置文件，用户账户信息等
| - etc

# 用户的主目录，每个用户在这个目录下有一个子目录，用于存放用户的个人文件和配置文件
| - home

# 存放基本系统库文件，这些库文件支持/bin和/sbin目录下的可执行文件
| - lib

# 64位系统的库文件，类似于/lib，但专为64位系统设计
| - lib64

# 用于存放文件系统故障修复时找回的文件，只有在ext4文件系统中存在
| - lost+found

# 挂载可移动媒体设备（如光盘、U盘）时的挂载点
| - meida

# 临时挂载文件系统时的挂载点，例如挂载网络文件系统（NFS）或其他临时设备
| - mnt

# 用于安装附加的应用程序包，通常是第三方软件或大型的自定义软件包, 例如上传要安装到 Linux 的软件 习惯放在opt目录下
| - opt

# 虚拟文件系统，提供系统内核和进程信息。通常存放内存映射、CPU、设备状态等信息
| - proc

# 超级用户（root用户）的主目录，类似于普通用户的/home目录
| - root

# 运行时数据的临时文件系统，存放系统启动以来的各种运行信息，如进程ID文件（PID）。
| - run

# 存放系统管理员使用的系统二进制文件（如系统恢复、启动过程中的命令）
| - sbin

# 存放服务相关的数据，例如Web服务器、FTP服务器等提供服务时使用的数据
| - srv

# 虚拟文件系统，存放与系统设备相关的信息和配置，类似于/proc
| - sys

# 临时文件目录，系统和应用程序运行时产生的临时文件通常存放在此
| - tmp

# 存放用户程序和数据，是一个大型目录，包含了很多子目录，例如/usr/bin（用户命令），/usr/lib（用户库文件），/usr/local（本地用户安装的软件）
| - usr

# 存放系统运行时需要改变的数据文件，例如日志文件、缓存、锁文件、临时电子邮件等
| - var
```

<br><br>

## Linux下删除mysql

### 验证虚拟机中安装的mysql版本
在终端输入如下命令
```s
mysqladmin --version
```

<br>

### 查看是否安装过mysql
1. 如果是使用rpm(linux中的一个指令)安装, 检查一下 RPM PACKAGE
```s
rpm -qa | grep -i mysql
```

2. 再检查mysql服务是否是启动状态
```s
systemctl status mysqld.service
```

如果存在mysql-libs的旧版本包 会有如下的显示, 如果没有的话 则没有下面的显示
![mysql-libs旧版本包信息.png](./imgs/mysql-libs旧版本包信息.png)

<br>

### 卸载mysql安装程序

**1. 关闭mysql服务**
```s
systemctl stop mysqld.service
```

<br>

**2. 查看当前mysql的安装状况**
```s
rpm -qa | grep -i mysql

# 或

yum list installed | grep -i mysql
```

<br>

**3. 卸载上述命令查询出的已安装程序**
```s
# mysql-xxx 是 rpm -qa | grep -i mysql 查询出的安装包名, 比如 mysql-community-common-8.0.25-1.el7.x86_64
yum remove mysql-xxx mysql-xxx mysql-xxx mysqk-xxx
```

务必卸载干净, 反复执行 ``rpm -qa | grep -i mysql`` 确认是否有卸载残留

<br>

### 删除 mysql 相关文件
**1. 查找相关文件**
```s
# 在 根目录下 查找, 查找的名字通过 -name 来指定
find / -name mysql
```

<br>

**2. 删除上述命令查找出的相关文件**
```s
rm -rf xxx

# 如
rm -rf /var/lib/mysql
```

<br>

**3. 删除 my.cnf**
```s
# linux下的mysql配置文件 my.cnf
rm -rf /etc/my.cnf
```

<br><br>

## Linux下安装mysql
```s
https://www.bilibili.com/video/BV1iq4y1u7vj?p=99&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

<br>

### 安装msyql服务后, 需要进行 服务的初始化
为了保证数据库目录与文件的所有者为 mysql 登录用户, 如果我们是以 root身份运行mysql服务, 需要执行下面的命令初始化

```s
mysqld --initialize --user=mysql
```

- initialize: 该选项默认以 安装 模式来初始化, 则会为 root 用户生成一个密码并将 该密码标记为过期, 登录后你需要设置一个新的密码, 生成的临时密码会忘日志中记录一份

- 查看密码: ``cat /var/log/mysqld.log``  
```s
# 我们观察 root@localhost: xxxxx , x的位置就是密码
```

<br>

### 初始化后, 查看mysql的是否启动
```s
systemctl status mysqld
```

<br>

### 启动mysql服务
```s
systemctl start mysqld
```

<br>

### 开机自动开启mysql服务
我们在虚拟机中安装的mysql 每次开机的时候 需要自己启动mysql服务, 我们可以将其设置为开机自动启动
```s
# 查看 mysql 服务的状态, disable 为开机不是自动启动mysql服务
systemctl list-unit-files|grep mysqld.service 

# 设置 disable 为 enable 则为开机自动启动mysql服务
systemctl enable mysqld.service
```

<br>

### 使用 临时密码 登录客户端后, 需要重新msyql密码
```s
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';

# 新密码需要复杂一点 太简单会报错
```

更改密码后 需要退出后 利用新密码重新进入
```s
quit

mysql -uroot -p
```

<br><br>

## 使用 navicat 连接 虚拟机中的数据库 使用 ssh 面板 (密码是虚拟机的密码哦)
我们使用图形化界面工具链接虚拟机中的数据库 默认是不行的 会报如下的错误
```s
host 'xxx' is not allowed to connect to this mysql server
```

<br>

### 排查 网络
我们在windows的终端下输入如下的命令

1. ``ping 虚拟机ip地址`` 保证网络畅通
2. 检查 虚拟机的端口号是否是开放的 ``telnet ip地址 端口号, 如: telnet 192.168.1.150 3306``

```s
telnet命令需要确认下如下面板中是否处于开启状态
| - 控制面板
  | - 程序和功能
    | - 启用 或 关闭 windows 功能
      | - 查看 Telnet Clinet 选项, 确保它有对号
```

<br>

我们在windows的环境下 需要连接 虚拟机下的3306进程, 需要保证它的防火墙要么是关闭, 要么开启但它的端口号需要是开放的, 老师的做法
1. windows电脑的防火墙关闭掉
2. centos中的防火墙关闭掉
```s
# 关闭 centos中的防火墙, 我们在虚拟机的终端上输入如下的命令

# 查看防护墙的状态
systemctl status firewalld

# 关闭centos中的防火墙
systemctl stop firewalld


# 设置每次启动虚拟机的时候自动关闭防火墙
systemctl disable firewalld


# 或者


# 获取防火墙开启的状态下 开放3306端口

# 查看开放的端口号
firewall-cmd --list-all

# 设置开放的端口号
firewall-cmd --add-service=3306/http --permanent
firewall-cmd --add-port=3306/tcp --permanent

# --add-port=3306/tcp：添加一条规则，允许通过防火墙的3306端口上的TCP流量。3306端口通常用于MySQL数据库服务
# --permanent：表示将这条规则永久添加到防火墙配置中。如果不加这个选项，规则只会临时生效，系统重启后会失效。

# 执行完该命令后，还需要重新加载防火墙规则以使更改生效：
firewall-cmd --reload
```

<br>

### mysql不允许root用户做远程连接, 需要修改
我们是使用 root 用户进行的远程登录 默认情况下centos中mysql不允许root用户进行远程连接, 因为mysql只允许root用户登录本机(localhost), 它是不允许root用户进行远程连接的

如果我们要想进行远程连接需要做修改, 设置root用户可以远程连接 ``'192.168.1.%'`` ip

```s
update user
set host='192.168.1.%'
where user = 'root'


# 任何客户端都可以
update user
set host='%'
where user = 'root'
```

修改后我们要执行如下的操作, **刷新权限**
```s
flush privileges;
```

<br>

**如上操作后会报错:**    
该错误只有在8.0中会出现, 因为8.0中对用户登录做了加密 因为加载了算法所以不允许我们登录
```s
Plugin caching_sha2_password could not be loaded
``` 

<br>

**解决方式:**  
在虚拟机终端
```s
alter user 'root'@'%' identified with mysql_native_password by 'abc123';
``` 

<br><br>

# mysql8.0中密码强度插件相关
```s
https://www.bilibili.com/video/BV1iq4y1u7vj?p=100&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

<br><br>

# 正文

<br><br>

# 字符集的相关操作

## mysql5.7版本需要修改字符集
在 mysql8.0 默认字符集为 latin1, utf8字符集指向的是 utf8mb3

由于latin1, 不支持添加中文, 所以我们需要修改字符集

网站开发人员在数据库设计的时候往往会将编码修改为utf8字符集, 如果以往修改默认的编码, 就会出现乱码的问题, 从mysql8.0开始, 数据库的默认编码将改为 utf8mb4, 从而避免上述乱码的问题

<br>

### 查看默认使用的字符集
```s
show variables like 'character%';
```

|variable_name|value|
|:--:|:--:|
|character_set_client|utf8mb4|
|character_set_connection|utf8mb4|
|character_set_database|utf8mb3|
|character_set_filesystem|binary|
|character_set_results|utf8mb4|
|character_set_server|utf8mb4|
|character_set_system|utf8mb3|
|character_sets_dir|/usr/local/mysql-8.0.33-macos13-arm64/share/charsets/|

<br>

在上面的查询结果中 我们比较关注的两条记录
1. character_set_database
2. character_set_server

<br>

### Linux下修改 mysql5.7版本 的字符集
我们需要修改 ``/etc/my.cnf`` 配置文件, 该方式修改的是 服务器 级别的字符集

Linux系统下, 终端中做如下的操作
```s
vim /etc/my.cnf

# 在 [mysqld] 下方添加下行代码
...
character_set_server=utf8

esc 
:wq

# 重启mysql服务
systemctl restart mysqld
```

但要注意, 如上的操作 只是影响修改字符集后新创建的表, 不会影响之前的表

<br>

### Linux下修改 mysql5.7版本 已有数据库 或 表的字符集
当我们通过上面的方法修改了mysql的字符集后, 它只是对新创建的数据库 和 表生效, 之前创建的库, 创建的表的字符集还是 latin1

这里我们将之前创建的库 和 表的字符集通过下面的方式进行修改

<br>

**1. 修改已创建 数据库 的字符集**
```sql
alter database datest1 character set 'utf8';
```

<br>

**2. 修改已创建 数据表 的字符集**
```sql
alter table t_emp convert to character set 'utf8';
```

<br>

### 字符集的4个级别
mysql有4个级别的字符集和比较规则, 分别是
1. 服务器(server) 级别
2. 数据库(database) 级别
3. 表(tables) 级别
4. 列(columns) 级别

<br>

```s
show variables like 'character%';
```

|variable_name|value|
|:--:|:--:|
|character_set_client|utf8mb4|
|character_set_connection|utf8mb4|
|character_set_database|utf8mb3|
|character_set_filesystem|binary|
|character_set_results|utf8mb4|
|character_set_server|utf8mb4|
|character_set_system|utf8mb3|
|character_sets_dir|/usr/local/mysql-8.0.33-macos13-arm64/share/charsets/|

<br>

在上面的查询结果中 我们比较关注的是 1 和 2记录
1. character_set_server: 服务器级别的字符集
2. character_set_database: 当前数据库的字符集

3. character_set_client: 服务器解码请求时使用的字符集
4. character_set_connection: 服务器处理请求时会把请求字符串从 character_set_client 转换为 character_set_connection
5. character_set_results: 服务器向客户端返回数据时, 使用的字符集


当我们设置了 character_set_server 的时候, 它直接会决定 character_set_database 的字符集

后续当我们创建 数据库 的时候, 如果我们没有显示的指明数据库的字符集, 则会沿用 服务器 的字符集 

当我们创建表时, 如果没有指明表的字符集, 则会沿用数据库的字符集, 同理 字段没有显示指明字符集的时候会沿用表的字符集

<br><br>

## 字符集 与 比较规则

### 1. utf8 和 utf8mb4
utf8字符集表示一个字符需要使用 1 - 4 个字节, 但是我们常用的一些字符使用 1 - 3 个字节就可以表示了, 而字符集表时一个字符所用的最大字节长度, 在某些方面会影响系统的存储和性能, 所以设计mysql的设计者偷偷的定义了两个概念

**utf8mb3:**   
阉割过的 utf8 字符集, 只使用 1 - 3 个字节表示字符

<br>

**utf8mb4:**   
正宗的 utf8 字符集, 使用 1 - 4 个字节表示字符

<br>

**在mysql5.7中utf8是utf8mb3的别名**, 所以之后再mysql中提供utf8就意味着使用 1 - 3 个字节表示一个字符, 如果大家有使用4个字节编码一个字符的情况, **比如 emoji表情, 那就使用 utf8mb4**

<br>

### 查看mysql支持的字符集
```s
show charset;
```

<br>

### 比较规则
比如我们往表中添加了2条数据, Tom 和 Tim, 有的时候我们会针对字符串进行比较大小 或 排序操作, 在比较的时候我们遵循什么规则, 就是根据 ``Default_collation`` 比较规则 来处理的

比较规则 和 字符集 是有关联度的

当我们使用 ``show charset;`` 查看支持的字符集时 一共有41条记录, 其中的 ``Default_collation`` 列表示这种字符集中一种默认的比较规则, 里面包含着该比较规则主要作用于哪种语言

```s
armscii8    ARMSCII-8 Armenian          armscii8_general_ci	1
ascii       US ASCII                    ascii_general_ci	1
big5        Big5 Traditional Chinese    big5_chinese_ci	2
binary      Binary pseudo               charset	binary	1
cp1250      Windows Central European    cp1250_general_ci	1
cp1251      Windows Cyrillic            cp1251_general_ci	1
cp1256      Windows Arabic              cp1256_general_ci	1
```

比如 utf8_polish_ci 表示以波兰语的规则进行比较, utf8_spanish_ci 是以西班牙语的规则进行比较, utf8_general_ci 则是一种通用的比较规则

后缀表示该比较规则是否区分语言中的重音, 大小写, 具体如下

|后缀|英文释义|描述|
|:--|:--|:--|
|_ai|accent insensitive|不区分重音|
|_as|accent sensitive|区分重音|
|_ci|case insensitive|不区分大小写|
|_cs|case sensitive|区分大小写|
|_bin|binary|以二进制方式比较|

<br>

最后一列 Maxlen 它达标该种字符集表时一个字符最多需要几个字节, 下面常见的字符集和对应的maxlen如下

|字符集名称||maxlen|
|:--|:--|
|ascii|1|
|latin1|1|
|gb2312|2|
|gbk|2|
|utf8|3|
|utf8mb4|4|

<br>

### 注意: utf8_unicode_ci 和 utf8_general_ci 的区别
英文的话 没有实质的差别
- utf8_general_ci: 校对速度快, 但准确稍差
- utf8_unicode_ci: 准确度高, 但校对速度稍慢

一般情况下, 使用 utf8_general_ci 就可以了, 但如果应用中有德语, 法语 或 俄语 的话, 一定要使用 utf8_unicode_ci

<br>

### 常用操作1:
**查看GBK字符集的比较规则**
```sql
show collation like 'gbk%'
```

**查看utf-8字符集的比较规则**
```sql
show collation like 'utf8%'
```

<br>

### 常用操作2:
**查看服务器的字符集和比较规则**
```sql
show variables like '%_server'
```

**查看数据库的字符集和比较规则**
```sql
show variables like '%_database'
```

**查看具体数据库的字符集**
```sql
show create database datatest1;
```

**修改具体数据库的字符集**
```sql
alter database dbtest1 default character set 'utf' collate 'utf8_general_ci'
```
<br>

### 常用操作3:
**查看表的字符集**
```sql
show create table emps
```

**查看表的比较规则**
```sql
show table status from atguigudb like 'emps'
```

**修改表的字符集和比较规则**
```sql
alter table emp1 default character set 'utf8' collate 'utf8_general_ci'
```

<br>

### 请求 到 响应过程中 字符集 的变化
我们知道**从客户端发往服务器的请求本质就是一个字符串**, **服务器向客户端返回的结果本质也是一个字符串**, 而**字符串其实是使用某种字符集编码的二进制数据**

这个字符串可不是使用一种字符集的编码方式一条道走到黑的

从发送请求到返回结果这个过程伴随着 多次字符集的转换, 在这个过程中会用到3个系统变量

|系统变量|描述|
|:--|:--|
|character_set_client|服务器解码请求时使用的字符集|
|character_set_connection|服务器处理请求时会把请求字符串从 character_set_client 转换为 character_set_connection|
|character_set_results|服务器向客户端返回数据时使用的字符集|

<br>

### 文字描述演示
**1. 先将 character_set_connection 设置为 gbk**
```s
set character_set_connection = 'gbk';
```

**2. 客户端向服务器发送请求**  
查询条件中有一个汉字
```sql
select *
from t
where 
  s = '我'
```

这个请求在传输的过程中都是以2进制的方式进行传输, 也就意味着 '我' 会按照指定的字符集转换成2进制数据, 使用什么字符集是根据操作系统决定的

一般情况下客户端使用的字符集和当前操作系统一致, 不同操作系统的字符集可能不一样
- 类 Unix 系统使用的 utf8
- windows 使用的 gbk

当客户端使用的是 utf8 字符集, 字符 我 在发送给服务器的请求的自己形式就是 ``0xE68891`` 
```s
提示:
如果使用的是可视化工具, 比如navicate之类的, 这些工具可能会使用自定义字符集来编码发送到服务器的字符串, 而不采用操作系统默认的字符集 (所以在学习的时候还是尽量使用命令行窗口)
```

**3. 服务器接收客户端发送的请求**  
服务器接收到客户端发送来的请求其实是一串2进制的字节, 它会认为这串字节采用的字符集是 ``character_set_client`` 然后把这串字节转换为 ``character_set_connection`` 字符集编码的字符

由于计算机上 ``character_set_client`` 的值为 ``utf8``, 首先会按照 ``utf8`` 字符集对字节串 ``0xE68891`` 进行解码, 得到的字符串就是 我

然后按照 ``character_set_connection`` 代表的字符集, 也就是 ``gbk`` 进行编码 得到的结果就是字节串 ``0xCED2``

因为表t的列col采用的是gbk字符集, 与 ``character_set_connection`` 一致, 所以直接到列中找字节值为 ``0xCED2`` 的记录找到了

然后会将查询结果从具体的列使用的字符集转换为 ``character_set_result`` 进行进行编码传输, 最后使用操作系统的字符集解码响应字节串

也就是我们本意要找的是 '我' 结果因为 因为字符集的问题 返回了其它数据

<br>

### 经验:
开发中通常把 character_set_client character_set_connection character_set_result 这三个系统变量设置成 和 客户端使用的字符集一致的情况, 这样减少了很无谓的字符集转换, 为了非常便捷的修改 mysql提供了统一修改这3个系统变量的语句

```s
set names utf8;

### 分别修改的方式

set character_set_client = 'utf8'
...
```

我们还可以在启动客户端的时候指定一个叫 default-character-set 的启动项, 比如我们还可以在配置文件中这么写
```s
[client]
default-character-set=utf8
```

<br><br>

# sql大小写规范

## windows 和 linux 平台的区别
- windows系统默认 大小写不敏感
- linux系统 大小写敏感

在sql中, 关键字 和 函数名是不区分大小写的

<br>

### mysql在linux下数据库名, 表名, 列明, 别名大小写规则如下
1. 数据库名 表名 表的别名 变量名是严格区分大小写的
2. 关键字 函数名 不区分大小写
3. 列名 与 列的别名 在所有的情况下都是忽略大小写的

在windows的环境下全部不区分大小写

<br>

### 查看大小写是否敏感
- 0: 大小写敏感
- 1: 大小写不敏感, 创建的表 数据库 都是以小写形式存放在磁盘上, 对于sql语句都是转换为小写对表和数据库进行查找
- 2: 大小写不敏感, 创建的表和数据库依据语句上的格式存放 语句是大写存放的就是大写, 凡是查找都是转换为小写进行

```sql
show variables like '%lower_case_table_names%'


-- windows系统 结果集: 
lower_case_table_names	1


-- linux系统 结果集: 
lower_case_table_names	0
```

<br>

### linux下 设置大小写规则: 不要改
当想设置为大小写不敏感的时候, 要在 ``my.cnf`` 配置文件 ``[mysqld]`` 中加入 ``lower_case_table_names=1`` 然后重启服务器

该参数适用于5.7 在mysql8.0下禁止在重新启动mysql服务时, 将lower_case_table_names设置为不同于初始化mysql服务时设置的lower_case_table_names值, 如果非要将8版本设置为大小写不敏感的话 步骤为

1. 停止mysql服务
2. 删除数据目录, /var/lib/mysql 目录 (删除现有的数据库文件)
3. 在mysql配置文件 /etc/my.cnf 中添加 lower_case_table_names=1
4. 启动mysql服务

<br>

**注意:**  
但是要在重启数据库实例之前就需要将原来的数据库(EMP)和表转换为小写, 否则将找不到数据库名

<br><br>

## sql_mode 的合理设置
sql_mode 会影响 **mysql支持的sql语法** 以及 它执行的 **数据验证检查**, 通过设置 sql_mode 可以完成不同严格程度的数据校验, 有效的保障数据的准确性

mysql服务器可以在不同的sql模式下运行, 并且可以针对不同的客户端以不同的方式应用这些模式, 具体取决于sql_mode系统变量的值

mysql5.6 和 mysql5.7 默认的 sql_mode模式参数是不一样的

- mysql5.6: 默认值为空(NO_ENGINE_SUBSTITUTION), **表示一个空值** 相当于没有什么模式设置, 就是 **宽松模式**, 在这种设置下是可以允许一些非法操作的, 比如允许一些非法数据的插入

- mysql5.7: 默认值为 STRICT_TRANS_TABLES, 也就是 **严格模式** 用于进行数据的严格校验, 错误数据不能插入, 报error, 并进行事务回滚

<br>

### sql_mode 常用值
- ONLY_FULL_GROUP_BY: 对于group by聚合操作, 如果在select中的列, 没有在group by中出现, 那么这个sql是不合法的, 因为列不在group by从句中

- NO_AUTO_VALUE_NO_ZERO: 该值影响自增长列的插入, 默认设置下, 插入0或null代表生成下一个自增长值, 如果用户希望插入的值为0, 而该列又是自增长的, 那么这个选项就有用了

- **STRICT_TRANS_TABLES**: 该模式下, 如果一个值不能插入到一个事务表中, 则终端当前的操作, 对非事务标不做限制

- NO_ZERO_IN_DATE: 在严格模式下, 不允许日期和月份为零

- NO_ZERO_DATE: 设置该值, mysql数据库不允许插入零日期, 插入零日期会抛出错误而不是警告

- ERROR_FOR_DIVISION_BY_ZERO: 在insert或update过程中, 如果数据被零除, 则产生错误而非警告, 如果未给出该模式, 那么数据被零除的时候mysql返回null

- NO_AUTO_CREATE_USER: 禁止grant创建密码为空的用户

- NO_ENGINE_SUBSTITUTION: 如果需要的存储引擎被禁用或未编译, 那么抛出错误, 不设置此值时, 用默认的存储引擎代替, 而抛出一个错误

- PIPES_AS_CONCAT: 将``||``视为字符串的链接操作符而非 或运算符, 这个oracle数据库时一样的 也和字符串的拼接函数concat类似

<br>

### sql_mode分别 宽松模式 和 严格模式

**宽松模式:**  
如果设置的是宽松模式, 那么我们在插入数据的时候, 即便给了一个错误的数据, 也可能会被接受, 并且不报错

比如, 我在创建一个表的时候, 该表中有一个字段为name, 给name设置字段类型的时候 char(10), 如果我在插入数据的时候, 其中name这个字段对应的一条数据的长度超过了10, 比如 1234567890abc 

超过了设定的字段长度10, 那么不会报错, 并且取前10个字符存上, 也就是说你这个数据被存为了 1234567890 而 abc 就没有了, 但是我们给的这条数据是错误的, 因为超过了字段长度, 但是并没有报错, 并且mysql自行处理并接受了, 这就是宽松模式的效果

<br>

**应用场景:**  
通过设置sql_mode为宽松模式, 来保证大多数sql符合标准的sql语法, 这样应用在不同数据库之间进行迁移的时候, 则不需要对业务sql进行较大的修改

<br>

**严格模式:**  
出现上面宽松模式的错误, 应该报错才对, 所以mysql在5.7版本就将sql_mode默认值修改为了严格模式, 所以在生产等环境中, 我们必须采用的是严格模式 进而开发, 测试环境的数据库也必须要设置

这样在开发测试阶段就可以发现问题, 并且我们即便是用的5.6, 也应该自行将其修改为严格模式

<br>

**开发经验:**  
mysql等数据库总想把关于数据的所有操作都自己包揽下来, 包括数据的校验, 其实在开发中, 我们应该在自己的开发的项目程序级别将这些校验给做了, 虽然写项目的时候麻烦了一些, 但是这样做之后, 我们在进行数据库迁移或者在项目迁移的时候, 就会方便很多

<br>

**改为严格模式后可能出现的问题:**  
若设置模式中包含了 NO_ZERO_DATE 那么mysql数据库不允许插入零日期, 插入零日期会抛出错误而不是警告, 例如, 表中字段TIMESTAMP列 (如果未声明为null或显示default子句) 将自动分配default 将自动分配default '0000-00-00 00:00:00' 零时间戳, 这显然是不满足 sql_mode 中 NO_ZERO_DATE 而报错

<br>

### 查看当前的sql_mode
```sql
select @@session.sql_mode

select @@global.sql_mode

show variables like 'sql_mode'


-- 结果集: 这也是 sql_mode 的默认值
ONLY_FULL_GROUP_BY,
STRICT_TRANS_TABLES,
NO_ZERO_IN_DATE,
NO_ZERO_DATE,
ERROR_FOR_DIVISION_BY_ZERO,
NO_ENGINE_SUBSTITUTION
```

<br>

### 设置 sql_mode
```sql
-- 默认值设置 session级别 的 空字符串表示 设置了 宽松模式 的 sql_mode
set session sql_mode = ''

set global sql_mode = ''


-- 永久设置方式: 在 /etc/my.cnf 配置文件中配置 sql_mode
[mysqld]
sql_mode=ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

-- 然后重启mysql
```

当然生产环境上是禁止重启mysql服务的, 所以采用 临时设置方式 + 永久设置方式 来解决线上的问题, 那么即便是有一天真的重启了mysql服务, 就会永久生效了

<br><br>

# Linux下 Mysql8 目录结构

### Linux: 查看 mysql 相关的目录有哪些
```s
find / -name mysql
```

<br>

### Linux: mysql数据库文件存放的位置
```s
/var/lib/mysql

# 相当于 windows 中 c判断中的data目录
```

mysql服务器程序在启动的时候会到文件系统的某个目录下加载一些文件, 之后在运行过程中产生的数据也都会存储到这个目录下的某些文件中, 这个目录就叫做 **数据目录**

mysql把数据都存到了哪个路径下呢?

其实 **数据目录** 对应着一个系统变量 ``datadir`` 我们在使用客户端与服务器建立连接之后查看这个系统变量的值就可以了

<br>

### 查看 mysql 数据目录
```sql
show variables like 'datadir'


-- 结果集: mac系统下mysql数据目录的位置, Linux系统下应该是 /var/lib/mysql
Variable_name | Value
datadir       | /usr/local/mysql/data/
```

<br>

### Linux: mysql数据库 命令 存放目录
```s
/usr/bin/mysql
/usr/sbin/mysql
```

<br>

### Linux: mysql数据库 配置文件 存放目录
```s
/usr/share/mysql-8.0

# my.cnf
/etc/mysql
```

<br><br>

## 数据库 和 文件系统 的关系
像 InnoDB, MyISAM 这样的存储引擎都是把表存储在磁盘上的, 操作系统用来管理磁盘的结构被称为 **文件系统** 所以用专业一点的话来表述就是, 像 InnoDB, MyISAM 这样的存储引擎是把 ``表存储在文件系统上`` 的

当我们想读取数据的时候, 这些存储引擎会从文件系统中把数据读出来返回给我们, 当我们想写入数据的时候, 这些存储引擎会把这些数据又写回文件系统

下面我们说说 InnoDB 和 MyISAM 这两个存储引擎的数据如何在文件系统中存储

<br>

### 查看 mysql 默认数据库
```sql
-- 查看计算机上有哪些数据库
show databases;

-- 结果集:
atguigudb
book
demo
mysql_review
view_demo

information_schema
mysql
performance_schema
sys
```

我们看到有4个数据库是属于mysql自带的系统数据库

<br>

**mysql:**  
mysql系统自带的核心数据库, 它存储了mysql的如下信息 比如
- 用户账户和权限信息
- 一些存储过程
- 事件的定义信息
- 一些运行过程中的日志信息
- 一些帮助信息
- 时区信息

比如 5.7版本中 我们定义的 存储过程 是保存在 mysql 数据库中的。在 mysql 数据库中，有一个名为 ``proc`` 的表，**这个表专门用于存储所有存储过程和函数的定义**

8.0则迁移到 ``information_schema`` 数据库的 ``ROUTINES`` 表中

<br>

**information_schema:**  
mysql系统自带的数据库, 这个数据库保存着mysql服务器 **维护的所有其他数据库的信息**, 比如有哪些表, 哪些视图, 哪些触发器, 哪些列, 哪些索引

这些信息并不是真实的用户数据, 而是一些描述性信息, 有时候也叫做元数据, 在系统数据库 information_schema 中提供了一些以 ``innodb_sys`` 开头的库, 用于表示内部系统表

<br>

**performance_schema:**  
mysql系统自带的数据库, 这个数据库里主要**保存mysql服务器运行过程中的一些状态信息**  

**可以用来监控mysql服务器的各类性能指标**, 包括

1. 统计最近执行了哪些语句
2. 在执行过程的每个阶段都花费了多长时间
3. 内存的使用情况等信息

<br>

**sys:**  
mysql系统自带的数据库, 这个数据库主要是通过 视图 的形式把 ``information_schema`` 和 ``performance_schema`` 结合起来, 帮助系统管理员和开发人员监控mysql的技术性能

<br><br>

## 数据库 在 文件系统 中的表示
使用 ``create database 数据库名`` 创建一个数据库的时候, 在文件系统上实际发生了什么?

其实很简单, 每个数据库都对应数据目录下的一个子目录, 或者说对应一个文件夹, 每当新建一个数据库的时候, mysql会帮助我们做下面的两个事

1. 在 **数据目录** 下, 创建一个和数据库名同名的目录
2. 在与该数据库名同名的子目录下创建一个名为 ``db.opt`` 文件 (5.7版本之前), 这个文件中包含了该数据库的各种属性, 比如该数据库的字符集和比较规则

<br>

### Innodb场景下: 5.7版本
比如我们创建一个名为 ``dbtest1`` 的数据库, 它就会在 ``/usr/local/mysql/data/`` data目录下创建一个 ``dbtest1文件夹``

```s
| - data
  | - dbtest1
  - ibdata1    # 系统表空间 默认大小 12mb
```

dbtest1文件夹下有如下的内容
```s
db.opt
emp1.frm  # 存储表结构的 字段名 类型 约束的信息
emp1.ibd  # ibd称之为 独立表空间, 5.7版本中默认 ibd 文件中存放着 表数据, 但也可以不放在这个里面中, 可以存放在 ibdata1 文件中
```

<br>

### InnoDB存储引擎模式
**表结构:**  
为了保存表结构, InnoDB在 数据目录 下对应的数据库子目录下创建了一个专门用于描述表结构的文件, 文件名为

```s
表明.frm
```

<br>

### 表中数据 和 索引
```s
储备知识:
- InnoDB其实是使用 页 为基本单位来管理存储空间的, 默认的 页 的大小为 16kb

- 对于InnoDB存储引擎来说, 每个索引都对应着一棵B+树, 该树的每个节点都是一个数据页, 数据页之间不必要时物理连续的, 因为数据页之间有 双向链表 来维护着这些也得顺序

- InnoDB的聚簇索引的叶子节点存储了完整的用户记录, 也就是所谓的索引即数据, 数据即索引
  - InnoDB: 索引存储在 ibd 文件中
  - MyISAM: 索引存储在 .MYI 文件中, 它是数据和索引分开进行存储
```

为了更好的管理这些页, InnoDB提出了一个 **表空间** 或者 **文件空间** 的概念, 这个表空间是一个抽象的概念, 它可以对应文件系统上一个或多个真实文件 (不同表空间对应的文件数量可能不同)

每一个表空间可以被划分为很多个 页, 我们的表数据就存放在某个表空间下的某些页里, 这里表空间有几种不同的类型

<br>

**1. 系统表空间**  
默认情况下, InnoDB会在数据目录下创建一个名为 ibdata1 大小为12m的文件, 这个文件就对应的 系统表空间 在文件系统上的标识, 该文件是自扩展文件, 当不够用的时候它会自己增加文件大小

当然 如果你想让系统表空间对应文件系统上多个实际文件, 或者 仅仅觉得原来的 ibdata1 这个文件名难听, 那可以在mysql启动时配置对应的文件路径 以及 它们的大小, 比如我们可以这样修改一下 my.cnf 配置文件
```s
[server]
innodb_data_file_path=data1:512M;data2:512M:autoextend
```

这样在mysql启动之后就会创建这两个512m大小的文件作为 系统表空间, 其中的autoextend表明这两个文件如果不够用会自动扩展 data2 文件的大小

需要注意的一点是, **在一个mysql服务器中 系统表空间只有一份**  

从 5.5 和 5.6 之间的各个版本中 我们表中的数据都会被默认存储到这个系统表空间中

<br>

**2. 独立表空间**  
在 mysql 5.6 之后的版本中, InnoDB并不会默认的把各个表的数据存储到系统表空间中, 而是为每一个表建立一个独立表空间

也就是说我们创建了多少个表, 就有多少个独立表空间

使用 独立表空间 来存储表数据的话, 会在该表所属数据库对应的子目录下创建一个表示该独立表空间的文件, 文件名和表名相同, 只不过添加了一个 ``.ibd`` 的扩展名

<br>

### Innodb场景下: 8.0版本
比如我们创建一个名为 ``dbtest1`` 的数据库, 它就会在 ``/usr/local/mysql/data/`` data目录下创建一个 ``dbtest1文件夹``

```s
| - data
  | - dbtest1
  - ibdata1    # 系统表空间 默认大小 12mb
```

dbtest1文件夹下有如下的内容
```s
db.opt
emp1.ibd
```

我们发现 dbtest1文件夹 中没有了 ``db.opt`` 和 ``emp1.frm``

在 8.0 中我们将 表结构 和 表数据 合在一起了 放在 ``.ibd`` 文件中了, 怎么证明?

这就需要解析 ibd 文件了, oracle官方将frm文件的信息以及更多信息移动到叫做 序列化字典信息(sdi), sdi被写在ibd文件内部了

我们可以通过命令将 ``.ibd`` 解析成 ``.txt`` 进行查看

<br>

### MyISAM场景下: 了解就行没记
```s
https://www.bilibili.com/video/BV1iq4y1u7vj/?p=104&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

**5.7:**  
比如我们创建一个名为 ``dbtest1`` 的数据库, 它就会在 ``/usr/local/mysql/data/`` data目录下创建一个 ``dbtest1文件夹``

```s
| - data
  | - dbtest1
  - ibdata1    # 系统表空间 默认大小 12mb
```

dbtest1文件夹下有如下的内容
```s
db.opt
emp1.frm
emp1.MYD  # 存储着数据
emp1.MYI  # 存储着索引
```

**8.0:**  
比如我们创建一个名为 ``dbtest1`` 的数据库, 它就会在 ``/usr/local/mysql/data/`` data目录下创建一个 ``dbtest1文件夹``

```s
| - data
  | - dbtest1
  - ibdata1    # 系统表空间 默认大小 12mb
```

dbtest1文件夹下有如下的内容
```s
db.opt
emp1.sdi  # 相当于 5.7 中的 frm
emp1.MYD  # 存储着数据
emp1.MYI  # 存储着索引
```

<br>

### 表在文件系统中的表示
我们的数据其实都是以 **记录的形式** 插入到表中的, 每个表的信息其实可以分为两种
1. 表结构的定义
2. 表中的数据

表结构就是该表的名称, 表里面有多少列, 每个列的数据类型, 约束条件和索引, 使用的字符集和比较规则等各种信息, 这些信息都体现在我们的建表语句中了

<br>

### 视图在文件系统中的表示
视图是虚拟的表 它就是查询语句的别名, 视图并不存储数据 只需要把它的结构存储起来就可以了, 所以我们创建一个视图时候, 在数据目录中只会看到 .frm 文件 并没有 .ibd 文件

<br><br>

# 用户 与 权限 管理