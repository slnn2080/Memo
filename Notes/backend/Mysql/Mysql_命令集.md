# 规范要求:
1. 字段别名使用双引号
2. 字符串 和 日期 使用单引号
3. windows下是不区分大小写的, 但是表格数据作为条件的时候 要人为区分

<br><br> 

# 查看mysql版本
```s
mysql --version

# 登录后再输入的命令
select version();
```

<br><br>

# 登录mysql数据库管理软件
```s
# 使用root用户登录软件
mysql -uroot -p
# 接下来输入密码: admin666
```

<br>

**参数:**  
- u: 后接用户名 有没有空格都可以

- p: 紧接密码 **不要有空格**  
 
```sql
-- 明文: erin的吧
mysql -uroot -pqwer6666
```

- P: 指定端口号 可以访问另一个mysql版本(已设置对应的端口号的版本)
```sql
mysql -uroot -P 3306 -p
```

- h: 代表host主机 访问指定服务器下的数据库 可以写对方的ip地址
```sql
mysql -uroot -P 3306 -h localhost -p
```

<br>

**技巧:**  
如果我们访问的就是 本机 和 3306 -P -h可以省略

<br><br>

# 退出数据库软件软件
```s
quit
exit
```

<br><br>

# 检查默认安装的mysql的字符集
```s
show variables like '%char%';

+--------------------------+-------------------------------------------------------+
| Variable_name            | Value                                                 |
+--------------------------+-------------------------------------------------------+
| character_set_client     | utf8mb4                                               |
| character_set_connection | utf8mb4                                               |
| character_set_database   | utf8mb4                                               |
| character_set_filesystem | binary                                                |
| character_set_results    | utf8mb4                                               |
| character_set_server     | utf8mb4                                               |
| character_set_system     | utf8mb3                                               |
| character_sets_dir       | /usr/local/mysql-8.0.33-macos13-arm64/share/charsets/ |
+--------------------------+-------------------------------------------------------+
```

<br><br>

# 启动mysql服务
这里相当于我们我们用鼠标点击按钮 启动 mysql服务
```s
net start mysql的服务名
net start mysql

# MySQL 的服务名通常是 "mysql", 我们也可以通过下面的命令启动
sudo /usr/local/mysql/support-files/mysql.server start
```

<br>

### 查看mysql的服务名
```s
sudo /usr/local/mysql/support-files/mysql.server status
```

<br><br>

# 停止mysql服务
这里相当于我们我们用鼠标点击按钮 关闭 mysql服务
```s
net stop mysql的服务名
```

<br><br>

# 数据导入指令
```sql
-- 文件的全路径名
source d:\mysqldb.sql
```

<br><br>

# :

