
#  关系型数据库 和 非关系型数据的理解
关系型数据库的列是预先定义好的 一般来说是不会做任何修改的, 如果对于框架来修改的话 会修改整个的表格 比较麻烦

非关系型数据库 它对架构的定义是很松散的 我们可以随时进行修改 对于行里面的内容来说 不要求列里面要对应有数据

关系型数据库来说一定定义好了一列 那么这列里面就要有相应的数据 哪怕是一个空值也要必须有 关系型数据库是一种比较严格切规范的数据库模型 是一个完整的列表

关系型数据库非常适合什么场景?
关系型数据库是结构非常严格已经规定死了的数据存储模式 比如像银行 它对数据库要求的就非常的严格 非常的完备 一般情况下除非重大的事故 是不会做任何的更改

如今的互联网模式的话 我们可以输入任何的信息 这种情况就非常的适合用非关系型数据库 因为它很难去定义整个表格的数据 或者说没有办法定义 所以我们的内容肯定是经常要被修改的 所以适合菲关系数据库


对于关系型数据库 和 非关系型数据库 哪个处理数据 请求比较快? 
假设双方都只有一个表格 那查询起来的话一定是关系型数据库更快 但是关系型数据库往往不只有一个表格

我们可能通过一个查询去链接一个表格 再去链接另外一个表格 当它牵扯的表格越来越多的时候速度就会越来越慢

这就是很多新的互联网公司将它们的数据库 慢慢的从关系型 迁到非关系型

<br><br>

# 数据库 Database
这个软件就是用来存储程序运行过程当中所产生的数据，所有你想永久保存下来的东西都可以存到数据库里

数据库是按照数据结构来组织 存储和管理数据的仓库 比如我们的网站 用户的注册 一旦注册我们要保存用户的信息 用户名 密码 地址 手机号等等

我们的程序都是在内存中运行的 一旦程序运行结束或者计算机断电 程序运行中的数据都会丢失
所以我们就需要将程序运行的数据持久化到硬盘中 以确保数据的安全性 而数据库是就数据持久化的最佳选择 说白了数据库就是存储数据的仓库

<br><br>

# 数据库的分类
数据库主要分为两种

<br>

### 关系型数据库（RDBMS）
MySQL、Oracle、DB2、SQL Server ……  
关系数据库中全都是表


<br>

### 非关系型数据库（No SQL）
MongoDB、Redis ……  
键值对数据库


<br>

### 文档数据库MongoDB
SQL（跟JS Java一样 也是一门语言）  
结构化查询语言  

关系数据库全都同SQL来操作 学はお了SQL就能用 关系型数据库里面的软件

<br><br>

# 语言标准化的优缺点
优点：网页标准化后 不同浏览器都能用 学一个东西所有的数据库都能操作
缺点：标准化限制了我们创新的能力

<br><br>

# MongoDB简介
MongoDB是为快速开发互联网Web应用而设计的数据库系统。  
MongoDB的设计目标是极简、灵活、作为Web应用栈的一部分。想存什么就存什么

MongoDB的数据模型是面向文档的，所谓文档是一种类似于JSON的结构，简单理解MongoDB这个数据库中存的是各种各样的JSON。（BSON二进制json）

<br><br>

# Mac 基本配置:

**<font color="#C2185B">sudo</font>**  
权限命令

<br>

**<font color="#C2185B">进入系统文件</font>** 
``` 
cd /usr/local
```

<br>

**<font color="#C2185B">解压tar文件</font>**  
解压 tar文件命令 sudo tar -zxvf
```
sudo tar -zxvf mongodb-osx-ssl-x86_64-4.0.9.tgz
```
		
<br>

**<font color="#C2185B">复制当前路径</font>**  
cmd+option+c

<br>

**<font color="#C2185B">配置环境变量</font>**  
打开环境变量配置文件 输入命令： 
```
open -e .bash_profile
``` 

在弹出的文件里 加上下面的话
```
export PATH=${PATH}:/Users/liulin/MongoDB/mongodb-4.2.15/bin

// 我的路径
/Users/liulin/MongoDB/mongodb-4.2.15/bin
/usr/bin
```

<br>

**<font color="#C2185B">使上面的配置生效 </font>**  
输入命令： 
```
source .bash_profile
```

<br>

**<font color="#C2185B">看看环境变量有没有配置好</font>**  
输入命令： 
```
mongod -version
```

<br>

**<font color="#C2185B">配置数据库使用的文件夹</font>**  
在mongodb的文件夹的根目录下创建
```
| - data
	| - db
| - etc
	- mongod.conf
| - log
```

``` 
#mongodb config file

dbpath=/user/local/MongoDB/data/db/
logpath=/user/local/MongoDB/log/ 
logappend = true 
port = 27017 
fork = true 
auth = true
```

<br>

**<font color="#C2185B">启动数据库命令</font>**  
1. 指定数据库文件夹
		- mongod --dbpath 指向我们的db

2. 如果我们在根目录下创建data
		- mongod

<br>

**<font color="#C2185B">关闭数据库的命令：</font>**  
新开一个命令行窗口 输入mongo 进入mongo界面

输入以下命令
use admin;
db.shutdownServer();

<br><br>

# windows的基本配置
默认安装完后 数据库是没有启动的

**<font color="#C2185B">1. 安装MongoDB</font>**  
安装
配置环境变量
<!-- 
	node安装完后直接就把配置修改完了 DB得自己配置
	C:\Program Files\MongoDB\Server\3.2\bin    要把这个路径添加到环境变量中
 -->

在c盘根目录
创建一个文件夹 data
在data中创建一个文件夹db  （这个db就是数据库默认的目录 数据库的东西都会放到db里）


打开cmd命令行窗口
输入 mongod 启动mongodb服务器
最后一行会出现 waiting for connections on port 27017
<!-- 
	在27017端口等待连接，出现这行代码 代表服务器已经启动成功
 -->

MongoDB默认监听27017端口
<!-- 
	我们可以访问浏览器 本地端口
	localhost:27017	代表本机地址 会弹出你在尝试用http协议访问MongoDB端口 不支持 但是出现这个也代表你的服务器启动成功了

	这时候的小黑屏别动 最小化
	不要关	关了数据库就停了
	不要动	一旦选中里面的文字 数据库就进去暂停状态了
 -->


[	- 32位注意：
		启动服务器时，需要输入如下内容
			mongod --storageEngine=mmapv1
			mongod --dbpath 数据库路径 --port 端口号   ]

再打开一个cmd窗口
输入 mongo 连接mongodb ，
	出现 > connecting to: test
<!-- 
	出现这个代表我们已经成功连接上了数据库 最后一行出现 >
	表示已经进入了js shell了 这时就可以直接敲打js代码了 不支持dom bom之类的东西 只有es标准
 -->

<br><br>

# 指定数据库存放数据目录
指定端口和路径 在控制台启动MongoDB
– mongod --dbpath 路径 --port 端口号  
<!-- 
	端口号可以随意指定 尽量4位以上 最大不要超过65535 4位以下可能是系统在用
	端口号不要使用别人占用的端口号 尽量用默认的就可以

	mongod --dbpath C:\Users\lilichao\Desktop\mongo\data\db --port 123
	注意：打开的命令行窗口不能关闭 关闭的话数据库就停了
 -->

<br><br>

# 退出数据库
ctrl+c

<br><br>

# 启动mongodb服务器
mongod
用于启动mongodb服务器

mongod --dbpath 路径 --port 
指定db文件夹 还可以指定端口号 默认27017

<br><br>

# 连接mongodb数据库
mongo
用户连接mongodb服务器
 
<br><br>

# 数据库（database）
主要分为两个部分
1. 数据库的服务器
		服务器用来保存数据，数据都是保存在数据库的服务器上的
		mmongod 就是用来启动数据库服务器

2. 数据库的客户端
		客户端用来操作数据库服务器，对数据进行增删改查的操作
  	mongo 就是用来启动客户端

总结：
也就是说 我必须启动服务器后 才能用客户端去链接服务器


**<font color="#C2185B">windows中将mongodb设置为系统服务，开机自动启动数据库</font>**  
上述的开启服务器 和 客户端的方法有点麻烦 得开两个窗口 而且每次想用还得每次都开
我希望第一点 服务器的窗口没有 直接在后台启动 第二个希望开机自动启动 不用每次都手动启动

将MongoDB设置为系统服务，可以自动在后台启动，不需要每次都手动启动

1. 在c盘根目录创建data
<!-- 
	在data下创建db和log（日志）文件夹 启动服务器时界面的所有英文都是日志 创建log文件后 日志会后台显示 会自动把日志写在log里面
 -->

2. 创建配置文件
<!-- 
	在目录 C:\Program Files\MongoDB\Server\3.2 下添加一个配置文件		找到看到bin文件夹为止

	mongod.cfg
				桌面上创建一个文本文档 名字改成 mongod.cfg 这个文件里面要写东西
 -->

3. 以管理员的身份打开命令行窗口	

4. 执行如下的命令
<!-- 
	sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\3.2\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"

	sc.exe create MongoDB binPath= "\"mongod的bin目录\mongod.exe\" --service --config=\"mongo的安装目录\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
 -->

5. 启动mongodb服务
		右键 任务管理器 点击服务 找到MongoDB 启动服务

6. 如果启动失败，证明上边的操作有误，
		在控制台输入
		sc delete MongoDB 删除之前配置的服务
		然后从第一步再来一次


<br><br>

# vscode中的插件
用小黑屏操作数据库体验并不是很好 可以安装编辑软件 这边直接在 vscode里找的插件

指定连接的哪个数据库：
		mongodb://localhost:27017/

		host 	
				主机地址

		localhost
				本机 或者可以写127.0.0.1也是代表本机  或者写 本机的ip地址

<br><br>

# MongoDB的三个概念
**<font color="#C2185B">数据库（database）	 </font>**  
数据库就是一个仓库，在仓库中可以存放集合。 一个数据库服务器里面可以放N个数据库

**<font color="#C2185B">集合（collection）	 </font>**  
数据库里面放的内容 叫做集合	集合类似于数组，在集合中可以存放文档。	一个数据库里有多个集合

**<font color="#C2185B">文档（document）</font>**  
文档数据库中的最小单位，我们存储和操作的内容都是文档 在做增删改查的操作的时候都是对 文档 进行操作 

**<font color="#C2185B">关系</font>**  
数据库里面放集合 集合里面放文档
存放的都是json对象

<br><br>

# 基本指令

**<font color="#C2185B">显示当前的所有数据库</font>**  
show dbs
show databases
<!-- 
	local  0.000GB		本地库 一般不用
 -->


**<font color="#C2185B">进入指定数据库</font>**  
use 数据库名
<!-- 
	在MongoDB中，数据库和集合都不需要手动创建，当我们创建文档时，
	如果文档所在的集合或数据库不存在，会自动创建数据库和集合

	可以use 任意数据库名 没有都没关系 不妨碍我们进去 这时候这个数据库并没有创建 而是当我们在进去的数据库中写入文档时自动创建
 -->


**<font color="#C2185B">显示当前数据库</font>**  
db
看看我们在哪个数据库当中
<!-- 
	db表示的是当前所处的数据库 db是一个变量 在哪个数据库里 db 就是谁 有点像this
 -->


**<font color="#C2185B">显示数据库中所有的集合</font>**  
show collections


**<font color="#C2185B">查询当前集合中的所有文档</font>**  
db.集合名.find()

<br><br>

# Vs Code中的mongodb插件
我们可以使用插件中的playground界面 相当于一个shell
use命令后面要加括号
<!-- 
	use('test')
	db.nn.insert({name:'nn', age:4})
	db.nn.find()
 -->


<br><br>


# 数据库的CRUD（增删改查）的操作
db是一个变量代码当前的数据库


# 增加 插入
插入文档

**<font color="#C2185B">db.集合名.insert(doc)</font>**  
向集合中插入一个文档(向数据库中插入文档)

参数：
doc
	- 1. 插入一个文档，需要传递一个对象
	- 2. 插入多个文档，需要传递一个数组，数组里面放对象

<!-- 
	db.stus.insert({name:"孙悟空",age:18,gender:"男"})
	WriteResult({ "nInserted" : 1 })			// 成功的提示

	db 就代表当前数据库 我只要进入test db就代表test
	插入文档后 自动创建了 test服务器 和 stus集合
 -->


**注意：**
1. 当我们向集合中插入文档时，如果没有给文档指定 _id 属性 则数据库会自动为文档添加 该属性用来做文档的唯一标识 文档的身份证号
2. 如果不想用系统自动指定的id我们可以手动指定 但是我们要确保唯一性
<!-- 
	{_id:'hello', name:'xx'}
 -->

建议不要自己定义id


**<font color="#C2185B">db.集合名.insertOne()</font>**  
插入一个文档对象
3.2 版本后新加入的 3.2以前的版本不支持


**<font color="#C2185B">db.集合名.insertMany()</font>**  
插入多个文档对象
必要要传递数组 即使是一个对象


**<font color="#C2185B">ObjectId()</font>**  
利用时间戳生成id 基本上是不会重复的 确保唯一性
<!-- 
	ObjectId()

	// 结果
	{
		"$oid": "61166324bf7cdc8744e4ab9e"
	}

	// 为什么要确保唯一性：
	我们在工作的时候会有两个环境，开发环境和生产环境 开发环境用来测试的 生产环境是给用户去用的 我们的产品上线后在生产环境里

	我们再开发的时候不会直接在生产环境里面测试 在开发环境测试好了再配置到生产环境里 所以我们会有2套 甚至多套数据库

	一套是开发的 一套是生产的 那我们把项目部署到生产环境里就面临一个问题 我在开发环境里有套数据需要导入到生产环境里

	有可能两个数据库的数据有重复的 有重复的可能会导致数据导不进去 或者导进去会发生覆盖的现象 会报错 所以我们给每一个文档都添加一个id属性 只要id属性不同我们就认为它是不同的数据
 -->

<br><br>

# 查询

**<font color="#C2185B">db.集合名.find(参数)</font>**  
查询集合中符合条件的文档
返回的是数组 可以加索引 
eg：db.stus.find({_id:'hello'})[0];

参数：
1. 不传参数就是所有的文档

2. find中可以接收一个对象 作为条件参数
	{属性名/字段名：值}	 查询字段是指定值的文档
<!-- 
	//查询所有的文档
	db.stus.find()		

	// 结果
	{ "_id" : ObjectId("602e54e0c7f48baab85dd70d"), "name" : "sunwukong", "age" : 18, "gender" : "nan" }

	id是MongoDB自动生成的

	//查询指定文档
	db.stus.find({_id:'hello'});		//找到id为hello的文档
	db.nn.find({name:'nn'})
 -->


**<font color="#C2185B">db.集合名.findOne()</font>**  
用来查询集合中符合条件的第一个文档
返回的是文档对象 可以 . 
eg: db.stus.findOne({_id:'hello'}).name


**<font color="#C2185B">db.集合名.find().count();</font>**  
**<font color="#C2185B">db.集合名.find().length();</font>**  
查询所有当前集合中的文档的数量

<br><br>

# 修改(update) 替换(replaceOne)

**<font color="#C2185B">db.集合名.update(查询条件, 新对象, [配置对象])</font>**  
update方法默认用新对象替换旧对象，比如旧对象中有3个属性， 新对象中有一个属性，结果就是 新对象的1个属性，并不是修改 而是 替换

这个方法当有多个条件符合的时候 默认只修改第一个

参数：
1. 查询条件（修改谁）
2. 新对象（修改为 是一个新对象）
3. 配置对象 可选
		 { multi:true }  可以修改默认操作 变成 修改多个

**<font color="#C2185B">操作符：</font>**  
如果需要修改制定的属性，而不是替换需要使用修改操作符 来完成修改

**<font color="#C2185B"> $set</font>**  
可以用来 设置 修改文档中的指定属性
放在update()方法中的新对象参数里
语法：
	{查询条件}, { 操作符: {数据} }
<!-- 
	db.nn.update({name:'sam'}, { $set: {name:'erin'} })
 -->

因为该方法不仅仅可以修改指定对象的指定属性，也可以用来给指定对象添加指定属性
<!-- 
	// 原先对象
	{ "_id" : ObjectId("611666dc2c546b710ebba898"), "name" : "erin", "age" : 30 }

	// 通过命令
	db.update({name:'erin'}, {
		$set: {address:'japan', sex:'woman'}
	})

	// 结果：
	{
    "_id": {
      "$oid": "611666dc2c546b710ebba898"
    },
    "name": "erin",
    "age": 30,
    "address": "japan",
    "sex": "woman"
  }
 -->

**<font color="#C2185B">$unset</font>**  
可以用来删除文档中的指定属性	不管指定的值是多少它目的就是删除属性值



**<font color="#C2185B">db.集合名.updateOne({查询条件},{新对象})</font>**  
修改一个符合条件的文档

**<font color="#C2185B">db.集合名.updateMany({查询条件},{新对象})</font>**  
同时修改多个符合条件的文档

**<font color="#C2185B">db.集合名.replaceOne({查询条件},{新对象});</font>**  
替换一个文档 用法和update() 一样

<br><br>

# 删除
**<font color="#C2185B">db.集合名.remove({查询条件});</font>**  
**<font color="#C2185B">db.集合名.deleteOne();		</font>**  
**<font color="#C2185B">db.集合名.deleteMany();</font>**  
remove()	可以根据条件删除文档，传递条件的方式和find()一样
remove()	默认情况下 可以删除符合条件的所有文档

如果remove() 第二个参数传递一个 true 则只会删除一个
<!-- 
	db.stud.remove({name:'liu'});

	db.stud.remove({name:'liu'}, true);
 -->

注意：
find()可以不传递参数， 但是remove()必须要传递{}
db.集合名.remove({})
		删除集合中的所有文档

db.集合名.remove({}) 清空集合的方式性能不行 因为它是匹配再删除


**<font color="#C2185B">db.集合名.drop();</font>**  
删除集合
如果数据库中的集合没了 数据库也没有了


**<font color="#C2185B">db.dropDatabase();</font>**  
删除数据库


**注意：**
一般数据库中的数据都不会删除，所以删除的方法很少调用 对公司来讲数据是非常值钱的 往往不会删除 一删除就没了
一般会在数据中添加一个字段，来表示数据是否被删除 

**<font color="#C2185B">一般表示 删除 的操作方法</font>**  
<!-- 
	// 向集合中添加文档
	db.docTest.insertMany([
		{ name:'swk', age:18, gender:'n',
			isDel:0 },

		{ name:'zbj', age:28, gender:'n',
			isDel:0 },

		{ name:'shs', age:28, gender:'n',
			isDel:0 }
	]);


	// 修改 isDel:0 → 1
	db.docTest.updateOne({name:'zbj'}, {$set:{isDel:1}});

	// 结果：
	{
		"_id": {
			"$oid": "602f682dbbc403303cb1b18f" },

		"name": "zbj", "age": 28, "gender": "n",
		"isDel": 1
	}

	// 显示isDel: 为0的数据
	db.docTest.find({isDel:0}); 
 -->
也就是说 我们不会真正意义上的删除 而是通过不显示的方法的 来达到删除的目的 虽然前台看不见了 万一真删了的话 还可以找回来

<br><br>

# 内嵌文档
MongoDB的文档的属性值也可以是一个文档，当一个文档的属性值是一个文档时，我们称这个文档叫做内嵌文档
<!-- 
	db.user.update({username:'孙悟空'}, {
		$set: {
			hobby: {
				cities: ['北京', '上海', '深圳'],
				movies: ['三国', '英雄']
			}
		}
	})

	我们在 孙悟空的文档中 添加了一个属性hobby它的值是一个文档（这不就是一个对象么）这种情况就叫做内嵌文档
 -->


**<font color="#C2185B">内嵌文档的查询方式 需要注意的地方</font>**  
如果要通过内嵌文档来对文档进行查询，此时属性名必须使用引号
总结：
属性名中存在 xxx.xxx 的形式的时候 就要加上 ‘’

**<font color="#C2185B">案例：</font>**  
查询 喜欢电影 英雄 的文档
<!-- 
	{
		"_id" : ObjectId("611671dd04c8f2edd55c28e8"), 
		"username" : "孙悟空",
		"hobby" : {
			"cities" : [ "北京", "上海", "深圳" ],
			"movies" : [ "三国", "英雄" ]
		}
	}

	db.user.find({hobby.movies:'英雄'})		这是错的
	MongoDB支持直接通过内嵌文档的属性进行查询，如果要查询内嵌文档则可以通过.的形式来匹配

	如果要通过内嵌文档来对文档进行查询，此时属性名必须使用引号

	db.user.find({'hobby.movies':'英雄'})	这是对的


	这里要理解成 hobby.movies 里面有 英雄 而不是hobby.movies的值就是英雄 因为它是一个数组
 -->


**<font color="#C2185B">案例：</font>**  
向 唐僧 中的hobby里面添加一个电影的属性
<!-- 
	{ "_id" : ObjectId("6116722504c8f2edd55c28e9"), "username" : "唐僧", 
		"hobby" : { 
				"cities" : [ "北京", "上海", "深圳" ] 
		} 
	}

	db.user.update({username:'唐僧'}, {
		$set: {
			hobby: {
				movies: ['中国男孩', '一个王']
			}
		}
	})
 -->


**<font color="#C2185B">案例：</font>**  
向 唐僧 中的hobby的movies里面添加一个新的电影
给内嵌文档添加属性
<!-- 
	{ "_id" : ObjectId("6116722504c8f2edd55c28e9"), 
	"username" : "唐僧", 
	"hobby" : { 
		"movies" : [ "中国男孩", "一个王" ] } }

	这是对数组的操作 我们要往这个数组中添加一个属性
	所以我们要换一个操作符

	db.user.update({username:'唐僧'}， {
		$push: {
			'hobby.movies': '星际穿越'
		}
	})
 -->


**<font color="#C2185B">案例：</font>**  
删除用户是北京的数据
因为出现了xxx.xxx的形式 所以要加上引号
<!-- 	
	db.user.remove({'hobby.cities': '北京'})
 -->


**<font color="#C2185B">案例：</font>**  
向 numbers 集合中插入20000条数据
<!-- 
	for(var i=1; i<=20000; i++) {
		db.numbers.insert({num:i})
	}

	操作数据库的时候 尽量少使用数据库的方法 尽量总结完毕一起执行这样效率很高
	var arr=[]
	for(var i=1; i<=20000; i++) {
		arr.push({num:i})
	}
	db.numbers.insert(arr)
 -->

<br><br>

# 数组中的操作符：
https://www.cnblogs.com/fengting0913/p/14616629.html
**<font color="#C2185B">$push</font>**  
用于向数组中添加一个新的元素	不会考虑重复不重复
往数组中追加指定的元素，若文档中数组不存在，则创建并添加指定元素，自v2.4起，添加了对$.each的支持


**<font color="#C2185B">$addToSet	</font>**  
向一个数组中添加一个元素，一般用于update

用于向数组中添加一个新的元素 set除了有设置的意思 还表示一个集合 如果数组中已经存在了该元素则添加失败 不会添加  会考虑是否重复


**<font color="#C2185B">$pop</font>**  
删除
删除数组中的第一个或最后一个元素，-1表示第一个，没错，第一个；1表示最后一个！
<!-- 
	db.test.update({_id:1},{$pop:{letters:-1}});
 -->


**<font color="#C2185B">$pull</font>**  
删除满足条件的元素
<!-- 
	{ _id: 1, votes: [ 3, 5, 6, 7, 7, 8 ] }
	db.test.update(
		{ _id: 1 }, 
		{ $pull: { votes: { $gte: 6 } } } )

	// 结果：
	{ _id: 1, votes: [ 3, 5 ] }
 -->


**<font color="#C2185B">$pullAll</font>**  
删除数组或内嵌文档字段中所有指定的元素
<!-- 
	{ _id: 1, scores: [ 0, 2, 5, 5, 1, 0 ] }

	db.test.update(
		{ _id: 1 }, 
		{ $pullAll: { scores: [ 0, 5 ] } } )

	// 结果：
	{ "_id" : 1, "scores" : [ 2, 1 ] }
 -->

<br><br>

# 查询操作符：
使用方式：
属性值的位置 因为要写复杂一些的逻辑 要使用{}包裹起来
语法：
{属性名: { $查询操作符: 属性值 }}


**<font color="#C2185B">$gt:</font>**  
>

**<font color="#C2185B">$gte:		</font>**  
>=

**<font color="#C2185B">$lt		</font>**  
<

**<font color="#C2185B">$lte		</font>**  
<=

**<font color="#C2185B">$eq		</font>**  
=

**<font color="#C2185B">$ne</font>**  
!=


# 逻辑操作符：
**<font color="#C2185B">$or</font>**  
或	后面跟的是数组 数组里放多个条件  $or[{条件1},{条件2}]
找或者条件1 或者条件2的
<!-- 
	$or:[{a:1}, {b:2}]		找a的值为1的  或  b的值为2的

	- 比如：
	- x - y 之间的	, 表示同时满足
	db.emp.find({num:{$or:[100, $gt:500]}});

	- <x    >y		$or[{},{}]
	db.emp.find({$or:[{sal:{$lt:1000}}, {sal:{$gt:2500}}]})
 -->


**<font color="#C2185B">$and</font>**  
与 条件查询
{ $and: [ { }, { } , ... , { } ] }


**<font color="#C2185B">$not</font>**  
查询与表达式不匹配的文档
<!-- 
	查询age不大于20的文档
	db.person.find( { age: { $not: { $gt: 20 } } } )
 -->

**<font color="#C2185B">$nor</font>**  
{ $nor: [ { }, { }, ... { } ] }
查询与任一表达式都不匹配的文档
<!-- 
	查询age既不等于20，sex也不是男的文档
	db.person.find( { $nor: [ { age: 20 },{ sex: "男"} ] } )
 -->


**<font color="#C2185B">$regex</font>**  
正则表达式查询
{ : { 𝑟𝑒𝑔𝑒𝑥:/𝑝𝑎𝑡𝑡𝑒𝑟𝑛/,options: '' } }
{: {regex: / /, options: ''}}
<!-- 
	db.products.find( { sku: { $regex: /^ABC/i } } )
 -->


**<font color="#C2185B">$where</font>**  
把一个含有JavaScript表达式的字符串或者是整个JavaScript函数转换到查询系统中，对内嵌文档不起作用
<!-- 
	db.myCollection.find( { $where: "this.credits == this.debits" } );
	db.myCollection.find( { $where: function() { return obj.credits == obj.debits; } } );
 -->


**<font color="#C2185B">$all</font>**  
匹配文档的数组字段中包含所有指定元素的文档
{ < field >： { $ all ： [ < value1 > ， < value2 > ... ] } }
<!-- 
	查询articles集合中tags字段（是个数组）包含“ssl”和“security”的文档（包含，但并不是全部等于）
	db.articles.find( { tags: { $all: [ [ "ssl", "security" ] ] } } )
 -->


**<font color="#C2185B">$elemMatch</font>**  
匹配内嵌文档或数组中的部分field
{ : { $elemMatch: { , , ... } } }
<!-- 
	假设现有集合：
	{ _id: 1, results: [ 82, 85, 88 ] }
	{ _id: 2, results: [ 75, 88, 89 ] }

	查询results数组中含有区间[80,85)元素的文档（结果为第一条）：
	db.scores.find( { results: { $elemMatch: { $gte: 80, $lt: 85 } } })
 -->


**<font color="#C2185B">$currentDate</font>**  
设置指定字段为当前时间
{ $currentDate: { : , ... } }
<!-- 
	db.person.update( { _id: 1 }, { $currentDate: { "lastLogin": { $type: "timestamp" } } })

 -->


**<font color="#C2185B">$inc</font>**  
自增   += 在原来的值上增加多少
将文档中的某个field对应的value自增/减某个数字amount
<!-- 
	$inc:{sal:400}]
	db.numbers.find({num:{$gt:500}});

	将_id为1的文档的age字段在原来的基础上+1：
	db.person.update( { _id: 1 }, { $inc: { age: 1} })
 -->

**<font color="#C2185B">$mul</font>**  
将文档中的某个field对于的value做乘法操作
<!-- 
	将_id为1的文档的price值乘以1.25并更新：
	db.products.update( { _id: 1 }, { $mul: { price: 1.25 } })
 -->

**<font color="#C2185B">$rename</font>**  
重命名文档中的指定字段的名
<!-- 
	将_id为1的文档的nickname字段重命名为alias，cell字段重命名为mobile
	db.person.update(
		{ _id: 1 }, 
		{ $rename: { 'nickname': 'alias', 'cell': 'mobile' } } )
 -->

<br><br>

# 查询函数
**<font color="#C2185B">其它方法.limit()</font>**  
**<font color="#C2185B">db.集合名.find().limit(10);</font>**  
设置显示数据的上限 每页显示的条数 limit10就是每页显示10条
<!-- 
	// 查询前10条数据
	db.numbers.find().limit(10);
		最多显示10条，可以用来分页
 -->


**<font color="#C2185B">db.集合名.find().skip()</font>**  
用于跳过指定数量的数据
查询翻页功能
skip((页码-1) * 每页显示的条数).limit(每页显示的条数);

MongoDB会自动调整skip和limit的位置
<!-- 
	// 跳过前10条数据，查看10条数据
	db.numbers.find().skip(10).limit(10);
 -->


**注意：**
在开发时绝对不会执行不带条件的查询 性能差 查询20000条简单的数据都要3s 我们要求3s中页面都要出来了
db.numbers.find() 这种方法几乎不用

我们一般查询的都是带条件的 比如
db.numbers.find().limit(10);	

<br><br>

# 案例：
**<font color="#C2185B">查询numbers中num为500的文档</font>**  
<!-- 
	db.numbers.find({num:500});
 -->


**<font color="#C2185B">查询numbers中num大于5000的文档</font>**  
使用 $gt > 操作符
<!-- 
	db.numbers.find({num:{$gt:500}});
 -->


**<font color="#C2185B">查询numbers中num小于30的文档</font>**  
<!-- 
	db.numbers.find({num:{$lt:30}});
 -->


**<font color="#C2185B">查询numbers中num大于40小于50的文档</font>**  
<!-- 
	db.numbers.find({num:{$gt:40, $lt:50}});
 -->


**<font color="#C2185B">查询numbers中num大于19996的文档</font>**  
<!-- 
	db.numbers.find({num:{$gt:19996}};)
 -->


**<font color="#C2185B">查看numbers集合中的前10条数据</font>**  
使用.find().limit(10)
<!-- 
	db.numbers.find({num:{$lte:10}});

	上面的方式不好
	因为我们的数据是有规则的20000条数据 依次递增 如果它不是这么就有规则的怎么办？

	db.numbers.find().limit(10);
 -->


**<font color="#C2185B">查看numbers集合中的第11条到20条数据</font>**  
<!-- 
	db.numbers.find().skip(10).limit(10);
 -->


**<font color="#C2185B">查看numbers集合中的第21条到30条数据</font>**  
<!-- 
	db.numbers.find().skip(20).limit(10);
 -->


**<font color="#C2185B">查询工资小于2000的员工</font>**  
<!-- 
	db.emp.find({sal:{$lt:2000}});
 -->


**<font color="#C2185B">查询工资在1000-2000之间的员工</font>**  
这种书写方式相当于 &&
| --     -- |
<!-- 
	db.emp.find({sal:{$lt:1000, $gt:2000}});
 -->


**<font color="#C2185B">查询工资小于1000或大于2500的员工</font>**  
这种书写方式相当于 ||
<br><br> |     | --
$or: [ ]
<!-- 
	db.emp.find({$or:[{sal:{$lt:1000}}, {sal:{$gt:2500}}]});
 -->


**<font color="#C2185B">查询财务部的所有员工</font>**  
那根据 depno 来查询
那我首先要找到财务部然后拿到财务部的编号
<!-- 
	db.dept.find({dname:'财务部'})[0].depno
	db.dept.findOne({dname:'财务部'}).depno

	let depno = db.dept.findOne({dname:'财务部'}).depno;
	db.emp.find({depno:depno});
 -->


**<font color="#C2185B">查询销售部的所有员工</font>**  
<!-- 
	let depno = db.dept.findOne({dname:'销售部'}).depno;
	db.emp.find({depno:depno});
 -->


**<font color="#C2185B">查询所有mgr为7698的所有员工</font>**  
<!-- 
	db.emp.find({mgr:7698});
 -->


**<font color="#C2185B">为所有薪资低于1000的员工增加工资400元</font>**  
使用的$inc 自增
<!-- 
	// 查找到了低于1000的人 但是怎么增加400 在原来的基础上进行增加
	db.emp.updateMany({sal:{$lte:1000}});

	// 加400
	db.emp.updateMany({sal:{$lte:1000}}, {$inc:{sal:400}});

	// 减400
	db.emp.updateMany({sal:{$lte:1000}}, {$inc:{sal:-400}})
 -->

<br><br>

# 查询文档时的排列
使用find()查询文档时，默认情况下是按照_id的值来进行排列的 值小的在上边 值大的在下边 升序排列 这个id是根据时间戳来确定 说白了 id就是根据创建时候来排列的

那假如我想按工资排序怎么办? 



# 查询时指定排序规则
**<font color="#C2185B">db.集合名.find().sort(按照哪个属性名或者字段名排序: 1 or -1)</font>**  
用来指定文档的排序规则
传递一个 {} 里面指定排序规则 里面的 1代表升序 -1代表降序
<!-- 
	按照工资排序
	db.emp.find().sort({sal:1});

	先按照工资排序 当有工资一样的情况下按照员工编号降序排列
	db.emp.find().sort({sal:1, empno:-1});
 -->


# 查询时指定查询内容
find()是查询所有的内容，但是有的时候只想要员工的姓名 其他的不想要怎么办？

**<font color="#C2185B">db.集合名.find({查询条件}, {属性名:1 or 0});</font>**  
我们可以传递第二个参数 用来设置查询结果的 投影
1是显示 0是不显示
id 默认情况下都有
<!-- 
	db.emp.find({},{ename:1});

	// 不想有id
	db.emp.find({},{ename:1, _id:0, sal:1});
 -->

<br><br>

# 文档之间的关系：
文档之间的关系有3种：

**<font color="#C2185B">一对一（one to one）:</font>**  
在开发里其实整个关系并不多 
指这个文档只能对应其它的一个文档
<!-- 
	显示生活中哪些属于一对一的？  夫妻 (一个丈夫  对应  一个妻子) 
 -->

文档里也有这种关系 但相对的来讲不多 怎么在数据库里体现出这种1对1的关系
在MongoDB中可以通过内嵌文档的形式来体现出 一对一 的关系
<!-- 
	db.夫妻集合.insert([
	{
		name:'黄蓉',
		
		//到这能不能体现出1对1的关系 郭靖等于黄蓉的一个属性 这两个东西在一个对象里吧 
		husband:{
			name:'郭靖'
		}
	}				
	])

	郭靖是黄蓉的一个属性 这种方式就能体现出一对一的关系
 -->


**<font color="#C2185B">一对多（one to Many）  或者  多对一（Many to one）:</font>**  
这个在开发的时候的情况是最多的
<!-- 
	父母 和 孩子：
		一个父母可以有多个孩子 但是1个孩子只能属于一个父母

	用户 和 订单：
		京东买东西要提交订单 一个用户能有多个订单 一个订单只能属于一个用户 还有多个订单对应一个用户的情况

	文章 和 评论：
		一个文章 下面可以有 多个评论 一个评论 肯定 属于 某一个文章
		在文章里加一个属性，表示文章的所有评论 然后把属性变为数组里面放评论就可以了
 -->

1对多怎么映射？
也可以用内嵌文档来映射一对多的关系 跟上面的一对一一样 只是把里面的属性变成数组了

**注意：**
内嵌文档的方式有一些问题 当我的评论无限多的时候 会导致数据库会变大


上面说内嵌文档的方式 会导致数据库会变得十分的大 那有没有什么别的办法？
上面用的方式是 在一个集合中的一个文档中添加属性

我们看看下面的方式：
我们拿 用户 和 订单 来举例子， 创建两个集合
<!-- 
	// 创建 用户 集合
	db.users.insert([
		{name:'孙悟空'},
		{name:'猪八戒'}
	])


	// 创建 订单 集合
	db.orders.insert({

		// 这个订单里用户买了3个产品 现在怎么体现出 订单 和 用户 之间的关系
		list：['苹果', '香蕉', '大鸭梨'],		

		// 在订单的集合加一个字段 也就是属性 填入用户的id 这样能不能体现出订单是孙悟空的 通过user就能判断出这个订单是孙悟空的
		user_id:xxx
	})


	// 怎么使用呢？ 查找 孙悟空 的订单 

	查找订单在orders里面找 但是我要先知道孙悟空的id
	let user_id = db.users.findOne({name:'孙悟空'})._id;

	db.orders.find({user_id:user_id});
 -->

**<font color="#C2185B">总结：</font>**  
一对多的情况 我们可以创建多个集合，集合中互相有对方的字段 比如上面订单集合中有用户的字段，拿着一个属性当做条件去另一个集合中查找


**<font color="#C2185B">多对多（Many to Many）:</font>**  
分类 和 商品能体现多对多的关系
<!-- 
	一个分类里面能不能包含多个商品 比如厨具里面是不是有一堆 电饭锅 勺子 铲子 
	那一个商品能不能属于多个分类，比如电饭锅既属于厨具 也 属于电器吧
	比如刀 可能既属于厨具 可能 也属于武器
<br><br>>

老师 和 学生
<!-- 
	一个老师对应多个学生 一个学生也能对应多个老师
 -->

多对多怎么映射？
多对多 和 一对多是类似的， 一对多中 user_id 是一个值， 多对多的话 我把 user_id 变成一个数组是不是就好了

我们上面是 订单的集合中 体现的是这个商品 谁买了
<!-- 
	db.order.insert({
		list: [商品1, 商品2, 商品3]

		// 谁买了
		user_id: 孙悟空
	})

	这个这个订单是孙悟空买了是么？ 那我是不是将user_id转为数组就可以 这个订单很多人都买了 这不就是多对多么

	db.order.insert({
		list: [商品1, 商品2, 商品3]

		// 谁买了
		user_id: [孙悟空, 猪八戒]
	})
 -->


我们写一个能体现多堆垛的案例 老师 和 学生
<!-- 
	// 创建老师集合 插入几个老师
	db.teachers.insert([
		{name:'洪七公'},
		{name:'黄药师'},
		{name:'龟仙人'}
	])

	// 创建学生集合 插入几个学生
	db.stus.insert([
	{
		name:'郭靖',
		tech_ids:[
			ObjectId('xxx'),
			ObjectId('yyy')
		]
	}])

	怎么体现郭靖既是洪七公的徒弟 又是黄药师的徒弟？ ids改成数组就可以了吧
 -->

<br><br>

# 总结：
创建集合时 一般 集合的名字是复数

使用find()查询文档时，默认情况下是按照_id的值来进行排列的 值小的在上边 值大的在下边 升序排列这个id是根据时间戳来确定 说白了 id就是根据创建时候来排列的

sort() limit() skip()	可以以任意顺序进行调用

参数全是各种各样的对象

<br><br>

# Mongoose
之前我们是怎么操作数据库的 要么cmd --- mongo 要么用其它的工具连接数据 现实的开发不会这样 假如现在用户注册了 难道还要自己手动输入信息输入到数据库么

真正对数据库操作是用程序来处理 而不是手动输入指令来操作 怎么用程序去操作数据库呢？ 就用到了mongoose

Mongoose就是一个让我们可以通过node来操作MongoDB的模块
node里面也有一个原生的MongoDB模块用来操作数据库的 为什么不用 node原生的模块而要用mongoose呢？因为原生的操作起来非常的麻烦 mongoose是在mongodb模块上做了进一步的封装


Mongoose是一个对象文档模型库（ODM）
它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能 它把数据库中的一个个文档 映射成了nodejs中的一个个对象 通过对象的操作 说白了 就是让我们以面向对象的形式操作数据库

<br><br>

# Mongoose优点
可以为文档创建一个模式结构（Schema）    约束
<!-- 
	MongoDB操作起来非常的灵活 关系型数据库如果创建一个表 一辈子只能存这一个数据
	MongoDB的集合没有任何的约束 想放什么数据就放什么数据 其实这是一把双刃剑 没有约束也有不好的地方

	比如：
	名字    性别    工资
	x       m      1000


	假如没有约束 工资的字段会不会被改成一个 字符串 hello 可以吧
 -->

<br><br> 可能会发生这种情况，向集合中填入了一个错误的信息

**<font color="#C2185B">Mongoose的优点</font>**  
虽然mongodb没有约束 但mongoose却给你进行了约束 
<!-- 
	比如约束字段： 我4个字段 你给我来3个字段就不行   这个字段是number类型 你却给我一个string 我先尝试类型转换 能转我给你存
	转不了 对不起 进不来
	相当于数据在进入数据库之前，多了一步验证 确保数据是对的
 -->

可以对模型中的对象/文档进行验证
数据可以通过类型转换转换为对象模型
可以使用中间件来应用业务逻辑挂钩
比Node原生的MongoDB驱动更容易

<br><br>

# Mongoose中的提供了几个新对象
Schema(模式对象)
Schema对象定义约束了数据库中的文档结构

Model(就是集合)
Model对象作为集合中的所有文档的表示，相当于MongoDB数据库中的集合collectio 一个Model就对应着一个集合

Document
Document表示集合中的具体文档，相当于集合中的一个具体的文档

这三个对象是有顺序的 按上面的顺序创建
**<font color="#C2185B">Schema > Model > Document</font>**  
我需要用schema约束model 然后通过model创建document

<br><br>

# Mongoose的安装

**<font color="#C2185B">1. 下载安装Mongoose</font>**  
npm i mongoose --save

**<font color="#C2185B">2. 在项目中引入 mongoose</font>**  
const mongoose = require('mongoose')


**<font color="#C2185B">3. 链接MongoDB数据库</font>**  
版本更新的很快 每次可以来看看
https://mongoosejs.com/
<!-- 
	2021
	const mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

	const Cat = mongoose.model('Cat', { name: String });

	const kitty = new Cat({ name: 'Zildjian' });
	kitty.save().then(() => console.log('meow'));
 -->

**<font color="#C2185B">mongoose.connect(参数1， 参数2)</font>**  
使用connect() 连接到mongoDB数据库

参数1
'mongodb://数据库ip地址:端口号/数据库名',
参数2
{useNewUrlParser: true, useUnifiedTopology: true}


**<font color="#C2185B">4. 监听MongoDB数据库的链接状态</font>**  
一旦我链接到数据库里面以后它里面会有一个对象叫 connection
该对象表示的就是数据库链接 通过监听该对象的状态，可以来监听数据库的链接与断开
<!-- 
	数据库链接的事件
	mongoose.connection.once('open', function(){});

	数据库断开的事件
	mongoose.connection.once('close', function(){});
 -->


**<font color="#C2185B">5. 断开数据库链接</font>**  
**<font color="#C2185B">mongoose.disconnect();</font>**  
 一般不需要调用
MongoDB数据库，一般情况下 只需要连接一次 连接一次以后 除非项目停止 服务器关闭 否则链接不会断开
<!-- 
	// 连接数据库 只需要前两行代码
	const mongoose = require('mongoose')
	mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


	// 如果报错的情况下 在mongoose.connect()方法中的参数2 配置对象中添加  useMongoClient:true
	mongoose.connection.once('open', () => {
		console.log('数据库已连接')
	})
	mongoose.connection.once('close', () => {
		console.log('数据库已关闭')
	})

	// 断开数据库连接
	mongoose.disconnect()
 -->

<br><br>

# mongoose操作数据库
我们要使用mongodb数据库 首先就要创建 schema对象
这三个对象的顺序一定不能乱 schema model document

约束的类型有
String
Date
Boolean
Number

type
default

**<font color="#C2185B">1. 创建 Scheme对象 用来对所有的字段进行约束</font>**  
通过new mongoose.Schema({配置对象}) 得到实例
当需要对某一个字段进行默认值的设定的时候 属性值传递一个对象 {type: , defaule: }
**<font color="#C2185B">let 约束对象实例 = new Schema({规则对象})</font>**  
<!-- 
	// 创建的过程
	let Schema = mongoose.Schema
	let stuSchema = new Schema({ })


	// 简单的约束
	let Schema = mongoose.Schema
	let stuSchema = new Schema({
		name: String,
		age: Number,
		gender: Number ,
		address: String
	})


	// 带默认值的约束
	let Schema = mongoose.Schema
	let stuSchema = new Schema({
		name: String,
		age: Number,
		gender: {
			type: String,
			default: 'female'
		} ,
		address: String
	})
 -->


**<font color="#C2185B">2. 创建 Model集合对象</font>**  
通过1中创建的schema对象创建Model对象
**<font color="#C2185B">let StuModel = mongoose.model(集合名字, 约束对象)</font>**  
参数：
    - 参数1： 要映射的集合名
		我们创建的StuModel需要跟数据库中的集合映射，需要跟哪个集合形成映射关系

		- 参数2： 约束对象
		我们要跟数据库的集合形成映射关系，使用哪种约束规则映射呢？就是这个约束对象
<!-- 
	let StuModel = mongoose.model('student', stuSchema)
	我们创建了一个Model对象，该对象是跟数据库中的student集合形成了映射，并对该集合进行的stuSchema中定义的规则进行了约束
 -->


**<font color="#C2185B">3. 创建 document 文档</font>**  
通过2中创建的Model对象来创建文档
**<font color="#C2185B">StuModel.create(doc, (err) => {})</font>**  
参数：
		- 参数1： 文档
		- 参数2： 回调 err
<!-- 
	let doc = {
		name: 'sam', age: 18, gender: 'male', address: '花果山'
	}

	StuModel.create(doc, (err) => {
		if(!err) {
			console.log('插入文档成功');
		}
	})
 -->

**注意：**
mongoose会自动将集合名变为复数形式
<!-- 
	我们创建文档的时候 使用的是 student
	let StuModel = mongoose.model('student', stuSchema)

	但是我们shell去查询数据库的时候
	db.student.find()    找不到任何结果

	因为mongoose将集合的名字自动修正为复数形式
	db.students.find()
 -->


**<font color="#C2185B">完整代码</font>**  
<!-- 
	const mongoose = require('mongoose')
	mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


	// 如果报错的情况下 在mongoose.connect()方法中的参数2 配置对象中添加  useMongoClient:true
	mongoose.connection.once('open', () => {
		console.log('数据库已连接')
	})
	mongoose.connection.once('close', () => {
		console.log('数据库已关闭')
	})


	// 创建schema对象
	let Schema = mongoose.Schema
	let stuSchema = new Schema({
		name: String,
		age: Number,
		gender: {
			type: String,
			default: 'female'
		} ,
		address: String
	})


	// 通过约束Schema创建集合对象Model
	let StuModel = mongoose.model('student', stuSchema)


	// 通过 StuModel对象 向数据库插入一个文档
	let doc = {
		name: 'sam', age: 18, gender: 'male', address: '花果山'
	}

	StuModel.create(doc, (err) => {
		if(!err) {
			console.log('插入文档成功');
		}
	})
 -->

<br><br>

# mongoose 监测连接数据库的情况
.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));


# 有个问题
我用node 使用mongoose连接数据库后，假如在同一个文档上操作，会往数据库里面插入多条数据，比如在同一个文件里 先是添加了数据库，然后在这个js文件继续写删除修改的逻辑 那么前面的插入数据库的逻辑会重复执行，也就是说会添加重复的文档

怎么解决?

<br><br>

# Mongoose 里的 Model方法
有了Model 我们就可以来对数据库进行增删改查的操作了
我来看看看 Model 中的方法
https://mongoosejs.com/docs/api/model.html

Model是一个构造函数 构造函数就能创建对象 帮助文档里把构造函数的方法和对象的方法都列在一起了 有.的形式就是构造函数：
<!-- 
	官方文档中有#的形式就是实例 是通过Model创建的对象调的方法, Model创建的对象就是文档 也就是文档的方法
 
 	Model#remove([fn])
 -->

**<font color="#C2185B">创建</font>**  
**<font color="#C2185B">Model实例.create(doc(s),[回调])</font>**  
用来创建一个或多个文档并添加到数据库中
参数
		- docs： 可以是一个对象 也可以是一个对象的数组
		- 回调：	当操作完成后调用的回调函数 回调中err doc
<!-- 
	let xy = [
		{ name: '猪八戒', age: 20, gender: 'male', address: '高老庄'},
		{ name: '唐僧', age: 16, gender: 'male', address: '女儿国'},
	]

	StuModel.create(xy, (err) => {
		if(!err) {
			console.log(`插入猪八戒文档成功`);
		}
	})

	注意：
	创建完毕后 该数据库中已经有对应的文件了 这样我们就要将 插入文档的逻辑注释掉 以免重复添加
 -->


**<font color="#C2185B">查询</font>**  
**<font color="#C2185B">Model实例.find({查询条件}, [投影], [查询选项], [回调]);</font>**  
查询所有符合条件的文档

参数：
	- 查询条件： 
			是一个对象 传一个 {} 空对象 是表示查询所有

	- 投影： 
			是否显示所有字段
			该参数的使用方式1，字符串类型 直接写要显示的字段名  不要的可以写 -
			StuModel.find(参数1, 'name, -_id', 参数3, 参数4)

			该参数的使用方式2，对象类型 字段名：1 or 0
			StuModel.find(参数1, {name:1, _id:0}, 参数3, 参数4)

	- 查询选项 
			比如 skip limit
			StuModel.find(参数1, null, {skip:10}, 参数4)

	- 回调 err docs(数组)
			查询结果会通过回调函数返回 回调函数必须传

<!-- 
	StuModel.find({name:'唐僧'}, 'name, -_id', {skip: 10}, (err, docs) => {
		if(!err) {
			console.log(docs);
		}
	})
 -->

**查询结果 不管查询到与否 总是返回一个数组**
<!-- 
	// 即使查询结果仅是一个
	docs.name   // undefined
	docs[0].name
 -->


**<font color="#C2185B">Model实例.findById({查询条件}, [投影], [查询选项], [回调])</font>**  
根据文档的ID属性查询文档
返回的就是一个具体的文档对象 可以.


**<font color="#C2185B">Model实例.findOne({查询条件}, [投影], [查询选项], [回调])</font>**  
查询符合条件的第一个文档
返回的就是一个具体的文档对象 可以.


**<font color="#C2185B">通过find() 查询结果 返回的对象就是Document 文档对象 它是Model的实例 集合是谁就是谁的实例 </font>**  
我们的查询结果是 StuModel 的实例
所以文档中所有#的方法 都是document的方法
<!-- 
	console.log(doc instanceof StuModel)
 -->

**<font color="#C2185B">修改</font>**  
**<font color="#C2185B">Model实例.update({查询条件}, 修改后的对象, [配置参数], [回调])	-- 这个废弃了？</font>**  
**<font color="#C2185B">Model实例.updateMany({查询条件}, 修改后的对象, [配置参数], [回调])</font>**  
**<font color="#C2185B">Model实例.updateOne({查询条件}, 修改后的对象, [配置参数], [回调])</font>**  
用来修改一个 或 多个文档
参数：
		- 配置参数： 是一个对象 { multi: true }
		safe (boolean) 
				安全模式（默认为模式中设置的值 (true)）

		upsert (boolean) 
				不匹配时是否创建文档 (false)

		multi (boolean) 
				是否应该更新多个文档 (false)

		...

<!-- 
	StuModel.updateOne({name:'唐僧'}, {$set:{age:4}}, (err) => {
		if(!err) console.log('修改成功');
	})
 -->


**<font color="#C2185B">替换</font>**  
**<font color="#C2185B">Model实例.relaceOne({查询条件}, 修改后的对象, [配置参数], [回调]);</font>**  
替换一个


**<font color="#C2185B">删除</font>**  
**<font color="#C2185B">Model实例.remove({查询条件}, [callback])</font>**  
**<font color="#C2185B">Model实例.deleteOne({查询条件}, [callback])</font>**  
**<font color="#C2185B">Model实例.deleteMany({查询条件}, [callback])</font>**  
参数：
		conditions  {查询条件}
		callback    返回结果 删除一般不需要返回结果
<!-- 
	StuModel.remove({name:'白骨精'},function(err){
		if(!err){
			console.log('删掉了');
		}
	})
 -->


**<font color="#C2185B">统计文档的数量</font>**  
find()返回的是数组 那直接.length不就完了么？ 这个方法性能比较差 因为这样是先查到一万个结果

**<font color="#C2185B">Model实例.count(conditions, [callback])</font>**  
不传查询条件就是所有的
<!-- 
	StuModel.count({}, function(err, count){
		if(!err){
			console.log(count);
		}
	})
 -->

<br><br>

# Document文档对象
Document 和 集合中的文档是一一对应的
Document是Model的实例，通过Model查询到的结果都是Document

Document的方法

**<font color="#C2185B">创建文档的新方式</font>**  
上面使用的是 StuModel.create() 现在使用新的方式

1. 通过new Model实例来创建 model实例的实例对象（文档对象）这步只是创建并没有添加到数据库

		let stu = new StuModel({ name:'奔波霸', age:48, gender:'male', address:'碧波潭' })

2. 将上面创建的 文档对象 插入数据中 需要调用 文档的save()方法

		stu.save()


**<font color="#C2185B">文档对象.save([options], [回调])</font>**  
如果需要看err 看结果可以写回调
<!-- 
	stu.save((err) => {if(!err) console.log('保存成功');})
 -->


**<font color="#C2185B">文档对象.update({新对象}, [options], [callback]);</font>**  
修改对象
之前我们的update都要先传递一个条件 这个update没有条件 直接传递结果
<!-- 
	所以没有条件相当于改自己 我们用model对象find到的doc结果就是一个具体的文档
	通过doc调用的update()方法就是在改自己
 -->

示例：
<!-- 
	doc.update({$set:{age:28}},function(err){
		if(!err){
			console.log('修改成功了');
		}
	})

	// 还有更直接的改法：
	doc.age = 18;
	doc.save();
 -->


**<font color="#C2185B">文档对象.remove([callback]);</font>**  
删除文档对象
用model对象find()方法找到的doc结果就是一个具体的文档 通过这个具体的文档doc.remove() 删除的就是自己
<!-- 
	doc.remove(function(err){
		if(!err){
			console.log('删除成功了');
		}
	})
 -->


**<font color="#C2185B">文档对象.get(name);</font>**  
获取文档中的指定属性值 
<!-- 
	console.log(doc.get('name'))

	其实都是一个对象了 可以直接 doc.name 这个方法比较麻烦
 -->


**<font color="#C2185B">文档对象.set(name, value);</font>**  
设置文档的指定属性值
<!-- 
	doc.set('name', '猪小戒')

	// doc.name = '猪小戒' 这样比较简单
	// doc.save()					之后还要调用save() 不然数据库没有发生变化
 -->


**<font color="#C2185B">文档对象.id</font>**  
获取文档的_id属性值
<!-- 
	doc.id

	// 直接使用doc._id也一样
 -->


**<font color="#C2185B">文档对象.equals(doc);</font>**  
比较两个文档是不是同一个

**<font color="#C2185B">文档对象.isNew;</font>**  
是不是一个新的文档 有没有和数据库进行关联
说白了就是这个文档有没有存到数据库  存进去了就是false 没存进去就是true

**<font color="#C2185B">文档对象.isInit(path);</font>**  
这个属性有没有初始化 就是和没和数据库关联到一起的意思吧

**<font color="#C2185B">文档对象.toJSON()</font>**  
转换为一个json对象
这个方法并不好用 我们还是使用 JSON.stringify(doc) 的形式


**<font color="#C2185B">文档对象.toObject()</font>**  
将Document对象转换为一个普通的js对象
<!-- 
	console.log(doc.toObject())
 -->
<!-- 
	转换为普通的js对象后 所有的Document对象的方法或属性都不能使用了
	它的作用只是用来保存数据的 就不能再去操作数据了为什么要转换为普通对象呢 有一些情况我需要转

	比如说
	我现在使用Model.findOne({},function(doc){}) 查找到了一个doc
	然后我打印console.log(doc); 打印的结构是doc里面包含的所有属性 
	
	比如说这些属性里面有一些是敏感数据 只有管理员才能看这些数据 而不想用户看到 我想给它删了

	比如说：
	name:'奔波霸',
	age:48,
	gender:'male',
	address:'碧波潭'

	其中的住址对用户奔波霸来说是隐私 我不想别的用户看见 我想把地址删了
	这时我就要把doc转换成一个普通的对象 这样就能用删除对象属性的方式

	delete doc.address
			删除对象里的address属性
			而不是unset unset（$unset:{address:1};）是数据库里面删

	我现在只是临时从对象里面删了
 -->

<br><br>

# mongoose 模块化

操作数据库我们用的都是Model对象的方法 而连接数据库我们只需要运行一次就可以了 那怎么让连接数据库这个部分能重复只用呢？

1. 新建一个文件夹   Tools
2. 新建一个文件     conn_mongo.js   用来连接数据库
在新建的conn_mongo.js中写：
<!-- 
	// 定义一个模块用来链接MongoDB数据库
	let mongoose = require('mongoose');
	mongoose.connect('mongodb://127.0.0.1:27017/连接哪个数据库', {useNewUrlParser: true, useUnifiedTopology: true})
 -->

这个模块一执行就链接数据库了
当有人想使用连接数据库的命令的时候引入上面模块
<!-- 
	require('./Tools/conn_mongo')

	因为没有导出 所以可以直接引入
 -->

创建 Schema 也要新创建一个js文件比较好
<!-- 
	| - models
		- student.js   

	
	// 定义Student模型
	let mongoose = require('mongoose');
	let Schema = mongoose.Schema;

	// 创建一个约束对象
	let stuSchema = new Schema({
		name:String,
		age:Number,
		address:String,
		gender:{                
			type:String,
			default:'female'    
		}
	});

	// 定义模型
	let StuModel = mongoose.model('student', stuSchema);

	// 把定义好的模型暴露出去
	exports.model = StuModel;

	// 这是以属性的形式暴露出去的 在别的文件接收的时候 要
	let Student = require('./models/student').model;


	// 这样再别的文件接收的时候 就不需要.model了
	module.exports = StuModel;
 -->

<br><br>

# 使用方式
1. mongod 开启数据库服务器
2. 使用shell 输入mongo命令 连接数据库服务器
2. 使用vscode插件 连接数据库服务器
2. 使用node里面的mongoose模块 连接服务器 使用的是OMD对象魔行
3. 退出服务器 use admin db.shutdownServer()





