### 基本命令
- https://blog.csdn.net/qq_23329167/article/details/83856430

> 关机和重启
  shutdown -h now   立刻关机
  shutdown -h 5     5分钟后关机
  poweroff          立刻关机


  shutdown -r now   立刻重启
  shutdown -r 5     5分钟后重启
  reboot            立刻重启


> 帮助命令
  ifconfig  --help    查看网卡信息



### 目录操作命令
  cd /        切换到根目录
  cd /usr     切换到根目录下的usr目录
  cd ../      切换到上一级目录 或者  cd ..
  cd ~        切换到home目录
  cd -        切换到上次访问的目录


### 目录查看
  ls            查看当前目录下的所有目录和文件
  ls -a         查看当前目录下的所有目录和文件（包括隐藏的文件）

  ls -l 或 ll     
        列表查看当前目录下的所有目录和文件（列表查看，显示更多信息）

  ls /dir
        查看指定目录下的所有目录和文件   如：ls /usr


### 创建目录
  mkdir aaa         在当前目录下创建一个名为aaa的目录
  mkdir /usr/aaa    在指定目录下创建一个名为aaa的目录


### 删除

> 删除目录或文件
  rm 文件       删除当前目录下的文件
  rm -f 文件    删除当前目录的的文件（不询问）


> 删除目录
  rm -r aaa     递归删除当前目录下的aaa目录
  rm -rf aaa    递归删除当前目录下的aaa目录（不询问）


> 全部删除
  rm -rf *    
      将当前目录下的所有目录和文件全部删除

  rm -rf /*    
      【自杀命令！慎用！慎用！慎用！】将根目录下的所有文件全部删除

- 注意：
- rm不仅可以删除目录，也可以删除其他文件或压缩包，为了方便大家的记忆，无论删除任何目录或文件，都直接使用 rm -rf 目录/文件/压缩包



### 目录操作
> 重命名目录
  mv 当前目录 新目录    eg: mv aaa bbb  将目录aaa改为bbb

- 注意：
- mv的语法不仅可以对目录进行重命名而且也可以对各种文件，压缩包等进行重命名的操作


> 剪切目录
  mv 目录名称 目录的新位置
  eg: 将/usr/tmp目录下的aaa目录剪切到 /usr目录下面
  mv /usr/tmp/aaa /usr

- 注意：
- mv语法不仅可以对目录进行剪切操作，对文件和压缩包等都可执行剪切操作


> 拷贝目录
  cp -r 目录名称 目录拷贝的目标位置    // -r代表递归
  eg: 将/usr/tmp目录下的aaa目录复制到 /usr目录下面
  cp /usr/tmp/aaa  /usr

- 注意：
- cp命令不仅可以拷贝目录还可以拷贝文件，压缩包等，拷贝文件和压缩包时不用写-r递归



### 文件操作
> 新建文件
  touch 文件名
  eg: 在当前目录创建一个名为aa.txt的文件
  touch aa.txt


> 删除文件
  rm -rf 文件名


> 修改文件
  vi 或 vim

> vi编辑器的3种模式
- 基本上vi可以分为三种状态 分别是
- 命令模式（command mode）、
- 插入模式（Insert mode）
- 底行模式（last line mode）

> 命令模式（command mode）
- ESC 退出编辑模式到命令行模式；
- 控制屏幕光标的移动，字符、字或行的删除，查找，移动复制某区段及进入Insert mode下，或者到 last line mode。

  【1】控制光标移动：   ↑，↓，j
  【2】删除当前行：     dd 
  【3】查找：         /字符
  【4】进入编辑模式：   i o a
  【5】进入底行模式：   :


> 编辑模式（Insert mode）
- 只有在Insert mode下，才可以做文字输入，按「ESC」键可回到命令行模式。
- ESC 退出编辑模式到命令行模式；


> 底行模式（last line mode）
- 将文件保存或退出vi，也可以设置编辑环境，如寻找字符串、列出行号……等。
- 底行模式下常用命令：
  【1】退出编辑：   :q
  【2】强制退出：   :q!
  【3】保存并退出：  :wq


> 打开文件
- vi 文件名


> 编辑文件
- 使用vi编辑器打开文件后点击按键：i ，a或者o即可进入编辑模式。
  i:在光标所在字符前开始插入
  a:在光标所在字符后开始插入
  o:在光标所在行的下面另起一新行插入


> 保存文件
第一步：  ESC   进入命令行模式
第二步：  :     进入底行模式
第三步：  wq    保存并退出编辑


> 文件的查看
  cat/more/less/tail  这四个命令都可以进行查看文件

> cat：看最后一屏
  cat filename

> more：百分比显示
- 使用more查看/etc/sudo.conf文件，可以显示百分比，回车可以向下一行，空格可以向下一页，q可以退出查看

  more sudo.conf


> less：翻页查看
- 使用less查看/etc/sudo.conf文件，可以使用键盘上的PgUp和PgDn向上和向下翻页，q结束查看

  less sudo.conf


> tail：指定行数或者动态查看
- 使用tail -10 查看/etc/sudo.conf文件的后10行，Ctrl+C结束  

  tail -10 sudo.conf




### 权限修改
- r w x  它们几个是有顺序的
- r代表可读
- w代表可写
- x代表该文件是一个可执行文件

- 如果rwx任意位置变为-则代表不可读或不可写或不可执行文件。

- 给aaa.txt文件权限改为可执行文件权限，
- aaa.txt文件的权限是 -rw-------

- 解析：
  -就代表是文件
  d代表是文件夹

  第一段（3位）：代表拥有者的权限
  第二段（3位）：代表拥有者所在的组，组员的权限
  第三段（最后3位）：代表的是其他用户的权限



### 压缩文件操作
> 打包和压缩
- Windows的压缩文件的扩展名  .zip/.rar
- linux中的打包文件：       aa.tar      
- linux中的压缩文件：       bb.gz    
- linux中打包并压缩的文件：  .tar.gz

- Linux中的打包文件一般是以.tar结尾的，
- 压缩的命令一般是以.gz结尾的。
- 而一般情况下打包和压缩是一起进行的，打包并压缩后的文件的后缀名一般.tar.gz。

    
  tar -zcvf 打包压缩后的文件名 要打包的文件

  z：调用gzip压缩命令进行压缩
  c：打包文件
  v：显示运行过程
  f：指定文件名
  
示例：
  打包并压缩/usr/tmp 下的所有文件 
  压缩后的压缩包指定名称为xxx.tar
  tar -zcvf ab.tar aa.txt bb.txt 


> 解压
  tar [-zxvf] 压缩文件
  x：代表解压
  将/usr/tmp 下的ab.tar解压到当前目录下
  tar -zxvf ab.tar



### 其他命令
> 查看当前目录
- 查看当前目录路径
  pwd 


> 查看进程
- 查看所有正在运行的进程
  ps -ef


> 结束进程
- kill pid 或者 kill -9 pid(强制杀死进程) 
  pid:进程号


> 查看网卡信息
  ifconfig


> 查看与某台机器的连接情况
  ping ip


> 查看当前系统端口
  netstat -an


> 切换用户
  su - 用户名