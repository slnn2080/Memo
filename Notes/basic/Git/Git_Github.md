# 问题集锦:

我使用git push到远程仓库 但是总是提示 认证失败
查找了一下原因说之前电脑配置了边用户名 然后又修改过 导致两次的用户名不一样

我们需要删除credential 下面的命令是看有没有 credential
git config credential.helper

然后下面的命令是看在哪里 找到 删除掉
```
git config --show-origin --get credential.helper
```

<br><br>

# 创建 ssh 公钥:
由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的, 所以, 需要一点设置

```
cd ~
ssh-keygen -t rsa -C "你的邮箱地址"
```

然后在ssh文件夹里面复制公钥到github 复制 .pub 文件 将它粘贴到 github 仓库中
```
登陆GitHub, 打开"Account settings", "SSH Keys"页面：
点"Add SSH Key", 填上任意Title, 在Key文本框里粘贴id_rsa.pub文件的内容：
```

可以在用户主目录里找到.ssh目录, 里面有id_rsa和id_rsa.pub两个文件, 这两个就是SSH Key的秘钥对, id_rsa是私钥, 不能泄露出去, id_rsa.pub是公钥, 可以放心地告诉任何人。

<br>

## 添加ssh到管理器
```
ssh-add -l
ssh-add /Users/liulin/.ssh/erin
```

<br>

## 看看有没有配置成功
看看下面的命令是否要返回true
```
git rev-parse --is-inside-work-tree
```

<br>

## 查看该文件夹是否是 git 仓库
```js
## 看看有没有配置成功
```

<br><br>

# Git:
每一个人的电脑上都有一个仓库, 我们的仓库可以和别的仓库进行沟通 分布式版本控制系统根本没有"中央服务器", 每个人的电脑上都是一个完整的版本库, 这样, 你工作的时候, 就不需要联网了, 因为版本库就在你自己的电脑上。

既然每个人电脑上都有一个完整的版本库, 那多个人如何协作呢？比方说你在自己电脑上改了文件A, 你的同事也在他的电脑上改了文件A, 这时, 你们俩之间只需把各自的修改推送给对方, 就可以互相看到对方的修改了。

<br>

## 集中式的版本控制 SVN:
是一种集中式的状态管理 要想用SVN要求所有人有一台电脑作为中央服务器 当这台电脑处于开机的状态的时候 我们才能在上面拿到代码

版本库是集中存放在中央服务器的 而干活的时候, 用的都是自己的电脑, 所以要先从中央服务器取得最新的版本, 然后开始干活, 干完活了, 再把自己的活推送给中央服务器。

中央服务器就好比是一个图书馆, 你要改一本书, 必须先从图书馆借出来, 然后回到家自己改, 改完了, 再放回图书馆。

<br>

### **问题:**  
如果 中央服务器 一旦断网(2天), 这两天的代码我们就不能提交了

<br>

## 分布式的版本控制 Git:
我们开发一个项目 不可能一路绿灯到底 如果我们可以将整个项目 进入存档操作 那么是不是可以利用存档 读档来回退到项目的一个合适的阶段 俗话说的可以吃 <font color="#C2185B">后悔药</font>

<br>

### **分布式的特点:**  
我们会在远程服务器有一个版本库, 开发人员手里每个人本地也会有一套版本库

<br>

### **比如:**  
张三 开发了3个版本 v1 v2 v3 他就可以提交到他本地的电脑里的版本库里 等网络恢复后 推送到远程的版本库中和远程保持一致

即使我们连不上网但是可以提交到本地版本库里来进行管理代码, 即使我们连不上网 连不上远程服务器但是也可以吃 **后悔药**

<br>

## git的特点:

### **协同修改:**    
多人并行的修改服务器端的同一个文件

<br>

### **数据备份:**   
不仅保存目录和文件的当前状态 还能够保存每一个提交过的历史状态

<br>

### **权限控制:**  
对团队中参与开发的人员进行权限控制  
对团队开发者贡献的代码进行审核 --- git独有

<br>

### **历史记录:**  
查看修改人 修改时间 修改内容 日志信息 将本地文件恢复到某一个历史状态

<br>

### **分支管理:**  
允许开发团队在工作过程中多条生产线同时推进任务 进一步提高效率

<br><br>

# Git的安装:

## 官方网站:

### **Windows:**
```js
gitforwindows.org
```

<br>

### **Linux:**
```js
git-scm.com
```

<br><br>

# 配置作者信息(签名):
Git是一个版本库 很多人都会往里面提交代码 所以我们每个用户都需要先配置 自己是谁

<br>

## 配置个人信息:
我们需要配置 用户名称 和 电子邮箱  
这两条配置很重要 每次git提交的时候都会引用这两条信息 说明是谁提交了更新 所以会随更新内容一起被永久的纳入历史记录

<br>

## 配置全局用户签名:
### **设置用户名:**  
```js
git config --global user.name slnn2080
```

<br>

### **设置邮箱名:**  
```js
git config --global user.email love.nn.linlin...
```

当执行完上述的命令后 系统会自动创建 .gitconfig 文件  

<br>

### **.gitconfig 文件位置:**  
```js
~ 家目录下

cd ~
vim .gitconfig
```

<br>

### **参数 --global:**  
全局配置

<br>

## 初始化仓库
将一个文件夹变成 git 仓库, 该命令执行后文件夹中会多出一个 .git 文件
```js
git init
```

<br>

## 配置项目级别签名:
上面我们将一个文件夹 变成了仓库 接下来我们就可以使用 项目级别签名的配置方式 配置签名

<br>

### **手动修改:**
```js
cd .git
vim config
```

<br>

### **命令修改:**
```js
git config user.name slnn2080
git config user.email love.nn.linlin...
```

<br><br>

# 创建新仓库 和 克隆仓库

### **创建新仓库:**  
使用 ``git init`` 命令来初始化一个文件夹 

<br>

### **维护旧仓库:**  
从github上clone下来一个现有的仓库

<br>

### **<font color="#C2185B">克隆项目:</font>**  
克隆项目的时候要注意 不能在git仓库中clone
```js
git clone url

// 克隆到指定文件夹
git clone url 文件夹名
```

<br><br>

# 推送到远程仓库的流程操作
我们开发的时候 会修改很多的文件 我们首先会将修改好的文件 放到本地的仓库中 然后将本地的仓库(版本库)推送到远程的服务器 这里就需要一系列的流程

我们可以把上面的 修改好的文件 - 本地仓库 部分的流程想象成  

将 商品 送往 仓库 的流程 我们要将商品送往仓库 我们会先将商品放入到推车中 当推车装满后 再从送往仓库

<br>

### **这里就有3个部分:**  

```
工作区:           暂存区:   版本库:
-------------    ------   --------

货物开始的存放地    推车      本地仓库    ->  远程

-------------    ------   --------
```

<br>

## 工作区:
本地代码 项目下的文件

我们在工作区中生成文件 修改文件都是在这里做的 这也就沙箱环境 这个环境下删改都可以

<br>

## 暂存区:
暂时放在这里 新增一个文件 删除一个文件 统一一次修改提交

<br>

## 版本库:
版本库又名仓库, 英文名repository, 你可以简单理解成一个目录, 这个目录里面的所有文件都可以被Git管理起来, 每个文件的修改、删除, Git都能跟踪, 以便任何时刻都可以追踪历史, 或者在将来某个时刻可以"还原"。到这里才算是一个版本

<br>

### **<font color="#C2185B">查看本地仓库中文件的状态:</font>**  
```js
git status
```

<br>

- 红色:   
没有被版本库管理 一次都没有提交过的  

- 绿色:   
文件已经在暂存区中 尚未添加到版本库  

<br>


```
nothing to commit: 
工作区 和 版本库的文件一样 不需要任何操作

modified: filename
当我们修改了一个文件后 使用该命令查看状态 会有 modified的关键字 
```

<br>

### **<font color="#C2185B">将工作区的文件添加到暂存区:</font>**  
相当于将商品添加到推车的过程
```js
git add 文件名
git add .
```

<br>

### **<font color="#C2185B">将暂存区的文件推送到本地仓库(版本库):</font>**  
相当于推车将商品送往仓库的过程
```js
git commit -m "message"
```

<br>

### **<font color="#C2185B">将暂存区的文件提交到指定分支:</font>**  
```js
git commit -m '描述' 分支名
```

<br>

### **<font color="#C2185B">将暂存区的文件提交并关联到 issue 上:</font>**  
```js
git commit -m "#issue码 内容..."
```

<br>

### **<font color="#C2185B">将版本库推送到远程仓库:</font>**  
将本地仓库推送到远程仓库的指定分支上 没有该分支的话会创建
```js
git push origin 分支
```

<br>

**注意:**
第一次的时候要加上 -u 参数
```js
git push -u origin 分支
```

<br>

Git会将本地的master分支内容推送的远程新的master分支, 还会把2个master分支关联起来, 在以后的推送或者拉取时就可以简化操作


<br>

### **<font color="#C2185B">建立本地分支和远程分支的关联:</font>**  
比如 本地有 ask master 但是远程只有master 这时候我们使用 git push 命令推送的时候 会报错 说本地分支没有和远程分支进行关联 我们可以使用下面的命令 将本地分支 和 远程分支进行关联


下面的命令就是将本地分支 推送到远程的分支
```js
git push --set-upstream origin ask


// 在本地创建和远程分支对应的分支
git branch --set-upstream branch-name origin/branch-name
```

<br>

### **<font color="#C2185B">拉取远程仓库的最新代码:</font>**  
```js
// 拉取当前分支的代码
git pull

// 拉取指定远程分支的代码到指定分支
git pull origin ask:ask

// 还有这种方式: 拉取远程dev分支的代码
git pull origin ask
```

git pull 相当于
```
git fetch origin dev
git merge origin/dev
```

<br><br>

# 配置 忽略 文件
在我们添加文件 推送本地版本到远程版本的过程中 肯定有一些文件是我们不想添加 或者 不想推送的 这时我们就要考虑配置忽略文件了

<br>

## 创建 .gitignore 文件
根目录下创建, 该文件下支持简单的正则 

我们能可以将不想add 不想push的文件名 文件夹名 写到这个配置文件中

```js
// 忽略所有文件内
*.txt

// 忽略指定文件
b.txt

// 忽略文件夹
/vendor

// 忽略指定文件夹下的所有php文件
/vendor/*.php

// 忽略指定文件夹下的所有文件夹和文件
/vendor/**/*.php
```

<br>

### **<font color="#C2185B">除了某文件: !a.txt:</font>**   
我们使用 ! 表示除了的意思 配合了 *.txt

比如:  
项目中有 a.txt b.txt c.txt 我们只想提交a.txt 不想提交 b c 这时我们可以这么写
```js
// 所有 txt 文件都不提交 除了a.txt 只提交a.txt
*.txt
!a.txt
```

<br>

**注意:**  
在 git 中 如果我们新添加了一个文件夹 但是文件夹中没有文件 git是不会跟踪该文件夹的

<br><br>

# 删除版本库中的资源
上面我们讲的是往仓库里面放东西 现在我们说说怎么将仓库里面的东西移除 比如我们送到仓库中的东西是错的

### **<font color="#C2185B">删除版本库中的资源:</font>**   
该命令执行后 版本库中指定的文件会被删除 同时工作区中的该文件也会被删除

```js
git rm 文件名
```

<br>

但是有些时候我们希望的是 只删除版本库中的文件 工作区中的文件不要删除 要使用如下的命令
```js
git rm --cached 文件名
```

<br>

使用该命令后 工作区的该文件会成为红色 未被追踪的状态
```js
on branch master
changes to be committed:
  deleted:  readme.txt  (绿色)

untracked files:
  readme.txt  (红色)
```

这时我们需要先使用 ``git commit -m "msg"`` 将删除版本库中农文件的操作先提交一次 相当于完成这个操作 然后就剩下了 readme.txt  (红色) 的问题待我们解决

<br><br>

# 版本库中修改资源名称
比如我们要修改 版本库 中的文件的文件名

### **<font color="#C2185B">修改版本库中文件名:</font>**   
```js
git mv 旧文件名 新文件名
```
上述命令后 还要执行 ``git commit -m ""`` 的操作

<br>

有些时候大小写的改变 会造成版本库中的文件名不发生变化  
修改版本库中的文件的文件名后 再次commit后 很有可能会出现版本库中还是未修改的状态 那我们就执行下面的逻辑(就是多了一步add)
```js
git mv oldname newname

git add . (多了一步它)
git commit -m "msg"
```

还可以在工作区中修改完后 再commit到版本库 然后将版本库中那个文件删除

<br><br>

# 查看版本库的操作记录(历史记录)
上面我们对版本库做了很多的操作 这时我们想看看我们对版本库都做了什么 我们就可以用这部分的内容

<br>

### **<font color="#C2185B">查看操作日志:</font>**   
可以看到我们提交到版本库中的操作日志 显示从最近到最远的提交日志
```js
git log
```

每一次的提交都会给我们一个 hash 字符串
```js
commit: 2234234asasdgfd(HEAD -> master)
Author: 
Date:
```

<br>

### **<font color="#C2185B">查看文件的变动信息:</font>**   
可以看到我们在文件中添加了哪些内容
```js
git log -p
```

<br>

### **<font color="#C2185B">查看最近的一次提交:</font>**   
```js
git log -p -1

git log -p -2
```

<br>

### **<font color="#C2185B">一个版本使用一行显示:</font>**   
```js
git log --pretty=oneline

// 结果:
1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master) append GPL
e475afc93c209a690c39c13a46716e8fa000c366 add distributed
eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0 wrote a readme file
```


<br>

### **<font color="#C2185B">简单的查看提交记录:</font>**   
哈希值只显示一部分的版本列表
```js
git log --oneline

// 在上面的基础上列出文件的变动信息
git log --oneline -p
```

```js
0779099 (HEAD -> master)  // 这是第二次提交
a2844d7  // 这是第一次提交
```

<br>

### **<font color="#C2185B">查看哪些文件发生了变化:</font>**   
```js
git log --name-only

// 查看变动的文件 是发生了什么样的变化
git log --name-status

// 图形参数
git log --graph 

// 简洁清晰的图形方式 显示hash和content
git log --graph --pretty=format:"%h %s"
```

上面我们接触的参数都可以混合进行使用
```js
git log -p -2 --oneline --name-only --name-stauts
```

<br>

### **<font color="#C2185B">观察我们移动到其它版本需要几步:</font>**   
HEAD指针需要移动的步数, 当前指针前后的版本都会被展示
```
git reflog
```

我们观察这个部分
```
HEAD@{0}  ---  HEAD@{1}

0779099 (HEAD -> master) HEAD@{0}: commit: 这是第二次提交
a2844d7 HEAD@{1}: commit (initial): 这是第一次提交
```


<br><br>

# 修改最近一次 commit的提交信息
这里不仅仅是修改最近的一次 commit -m 的 描述  
还可以真正的修改一次提交的内容

<br>

### **<font color="#C2185B">修改 commit 描述:</font>**   
使用下面的命令后 会打开 vim 编辑器
```js
git commit --amend
```

<br>

### **<font color="#C2185B">修改最近一次提交的内容</font>**   

还有一些情况, 比如我们提交了a
```js
git add a
git commit -m "提交了a"
```

然后我们还有一个文件b 这个b文件 也应该归纳到 a 的提交里面

这时我们先执行下面的操作
```js
// 将b提交到暂存区
git add b

// 使用 --amend 参数进行提交
git commit --amend
```

上面步骤执行完后 不打开vim编辑器 我们修改提交信息
```js
"提交了 a 和 b"
```

这样我们这次的b提交会和a提交合并成一次提交 我们可以使用下面的命令查看下最近的一次提交信息
```js
git log --name-only
```

<br><br>

# 管理暂存区中的文件
我们执行 ``git add .`` 的时候 就是将文件放入到了暂存区中

比如:  
我们将 a 添加到了 暂存区 但是我们想将a从暂存区当中撤销

<br>

### **<font color="#C2185B">撤销添加到暂存区中的文件</font>**   
```js
// 刚刚将a添加到了 暂存区
git add a.txt

// 现在想将a从暂存区中撤销
git rm --cached a.txt
```

使用上述命令后 a.txt 文件会回到未追踪状态

<br>

### **<font color="#C2185B">撤销已经添加到版本库, 再次修改后再次添加到暂存区中文件</font>**   
比如 第一次我们将 a 文件修改提交到版本库了
```js
git add .
git commit -m "第一次提交a"
```

<br>

然后我们又对a做了修改 添加到了 暂存区
```js
1. 修改a文件
2. git add a.txt
```

<br>

在这种情况下我们想做从暂存区撤销的操作要使用如下的命令
```js
git reset HEAD a.txt
```

执行上面的命令后 该文件会回到未追踪的状态 但是<font color="#C2185B">修改后</font>的内容还是有的

<br>

如果我们想将 a 文件中的内容也回退到<font color="#C2185B">修改前</font>
```js
git checkout -- a.txt
```

<br><br>

# 撤销修改:

## 未提交到暂存区的时候 (没有add的时候)

### **<font color="#C2185B">git checkout -- file</font>**  
可以丢弃工作区的修改

<br>

### **<font color="#C2185B">git checkout .</font>**  
撤销所有未add的更改
```js
  git checkout -- readme.txt
  // 命令git checkout -- readme.txt意思就是, 把readme.txt文件在工作区的修改全部撤销, 这里有两种情况：
```

一种是readme.txt自修改后还没有被放到暂存区, 现在, 撤销修改就回到和版本库一模一样的状态；

一种是readme.txt已经添加到暂存区后, 又作了修改, 现在, 撤销修改就回到添加到暂存区后的状态。

总之, 就是让这个文件回到最近一次git commit或git add时的状态。

git checkout -- file命令中的--很重要, 没有--, 就变成了"切换到另一个分支"的命令, 我们在后面的分支管理中会再次遇到git checkout命令。

<br>

## 已经提交到暂存区 但是还没有进行提交(已经add 但没commit) 

### **<font color="#C2185B">git reset HEAD readme.txt</font>**  
可以把暂存区的修改撤销掉（unstage）, 重新放回工作区

```
git reset
```

命令既可以回退版本, 也可以把暂存区的修改回退到工作区。当我们用HEAD时, 表示最新的版本。

<br>

## 已经提交了不合适的修改到版本库时 (已经add 已经commit)
想要撤销本次提交, 参考版本回退一节, 不过前提是没有推送到远程库。

<br><br>

# git restore
git restore命令是撤销的意思, 也就是把文件从缓存区撤销, 回到未被追踪的状态。

该命令有两种常用的用法。

<br>

### **<font color="#C2185B">撤销文件的修改, 撤销到最近一次执行git add的内容。</font>**  
```
git restore <file>
```

<br>

### **<font color="#C2185B">把文件从暂存区移除, 文件的修改不会受影响<file></font>**  
```
git restore --staged <file>
```

<br>

### **注意：**
在git中有工作区、暂存区、仓库区（本地代码区）三部分, 要注意git restore命令在工作区是不会其作用的, 也就是一个文件在工作区, 使用git restore是不起作用的。
也就是说 如果文件没有add 这个命令会报错

<br><br>

# 使用 alias 配置git别名
我们之前都是执行 git add git commit 现在我想给这个命令起个别名如: git a git c

<br>

### **<font color="#C2185B">设置命令的别名:</font>**   
```js
// 将 git add 修改为 git a
git config --global alias.a add
```

<br>

### **<font color="#C2185B">通过配置文件的方式设置别名</font>**   
```js
cd ~
vim .gitconfig


// 添加如下配置
[alias]
  a = add
  c = commit
  s = status
```

<br><br>

# 配置系统级别名
首先我们进入家目录
```
cd ~
```

然后打开 .bash_profile
```
vim .bash_profile
```

对文件进行修改 保存
```
alias gs="git status"
alias gc="git commit -m "
alias gb="git branch"
```

重新打开一个终端

<br><br>

# 分支
分支可能用在新功能 可能修复项目中的bug

我们上面使用的 commit 提交的话 就相当于我们过的每一天 一天一天不断的前进 这就相当于我们一次次的提交
```
□ - □ - □ - □ - □ - master 默认
```

<br>

比如我们上面在开发一个网站 到最后我们发布了 之后我们讨论需要格外的添加一个 问答 功能
``` 
                  问答 ask
                  ↗ □ - □ - □
□ - □ - □ - □ - □
```

等问答开发好了我们就需要合并了 我们将master的指针往后移动 将指针指向 ask分支最后一次提交点 就完成了一次合并
``` 
                  问答 ask
                  ↗ □ - □ - □
□ - □ - □ - □ - □             ↖ HEAD
```

比如我们希望再有一个 论坛 功能 该功能希望和问答同一个时间点开发 最后合并到一起
``` 
                  问答 ask
                  ↗ □ - □ - □ ↘
□ - □ - □ - □ - □ - - - - - - - - - - - □
                  ↘ □ - □ - □     ↗ 
                  论坛 bbs
```

在分支中还有一个关键词 ``HEAD`` 表示当前在版本库中哪个分支

<br>

我们会将功能开发 和 bug修复等都放在分支中完成 分支完成之后我们将其合并到主分支 最后我们会将主分支中的代码放到线上

<br>

## 分支的基本管理:

### **<font color="#C2185B">查看所有分支:</font>**   
前面有 * 该符号就相当于指针
```js
git branch

// 查看所有分支包括远程分支
git branch -a

// 查看远程分支
git branch -r
```

<br>

### **<font color="#C2185B">切换分支方式1:</font>**   
```js
git checkout 分支名
```

<br>

### **<font color="#C2185B">切换分支方式2:</font>**   
```js
git switch 分支名
```

<br>

### **<font color="#C2185B">创建分支方式1:</font>**   
创建一个新的分支 但是不会切换分支
```js
git branch 分支名
```

<br>

### **<font color="#C2185B">创建分支方式2:</font>**  
创建一个新分支 并切换到该分支上 
```js
git checkout -b 分支名
```

这里相当于两个命令 先创建再切换
```
git branch bbs
git checkout bbs
```

<br>

### **<font color="#C2185B">创建并切换到新的dev分支</font>**  
```
git switch -c dev
```

<br>

### **<font color="#C2185B">合并分支:</font>**  
切换到主分支上后 将指定分支合并到 master 分支上
```js
// 切换到主分支
git checkout master

// 将ask合并到master
git merge ask
```

ask是从master身上派生出来的 Fast-forward 指的就是将master分之的指针指向ask的最后一次提交 这个过程就是 fast 也就是快速的指针位移
```js
// 合并信息
Fast-forward
                  问答 ask
                  ↗ □ - □ - □ 
□ - □ - □ - □ - □             ↖
```

<br>

### **<font color="#C2185B">删除分支:</font>**  
合并后的分支就没有用了 所以可以删除
```
git branch -d ask
```

<br>

### **<font color="#C2185B">强制删除分支:</font>**  
当我们删除没有进行合并的分支的时候 会报错 这时候我们可以强制删除
```
git branch -D ask
```

<br>

### **<font color="#C2185B">删除远程分支:</font>**  
当我们删除没有进行合并的分支的时候 会报错 这时候我们可以强制删除
```
git push origin --delete 远程分支名
```

<br>

### **<font color="#C2185B">查看已经合并的分支:</font>**  
查看有哪些分支合并到了当前分支上
```
git branch --merged
```

<br>

### **<font color="#C2185B">查看没有合并的分支:</font>**  
查看哪些分支没有合并到了当前分支上
```
git branch --no-merged
```

我们可以查看下哪些分支没有合并 不要删分支的时候删错了

<br><br>

# 处理分支冲突:
冲突简单的说就是一个资源很多人都想用的时候 就会造成冲突  
git中也是一样一个文件被几个分支都修改过这就是冲突

<br>

## 冲突的产生和解决:
```js
// 创建 a.txt 文件 并提交
touch a.txt   (内容: hello)
git add a.txt
git commit -m "a文件的第一次提交"


// 在 a文件的提交点 创建了2个新分支 这两个分支都包含了 a.txt
git branch ask
git branch bbs


// ask分支上 修改 a.txt 文件 并提交
git checkout ask
vim a.txt   (内容: ask)
git add .
git commit -m "ask 修改了 a文件"


// 切换到bbs分支 也修改 a.txt 文件
git checkout bbs
vim a.txt   (内容: bbs)
git add .
git commit -m "bbs 修改了 a文件"


// 上面的两个分支都修改了 a.txt 文件 当合并的时候才会产生问题

// 切换到 master 分支 并合并 bbs
git checkout master
git merge bbs  (合并成功)


// 再次合并 ask
git merge ask

// 这时候就合并失败了 提示要先解决冲突后再提交
Automatic merge failed, fix conficts and then commit the result
```

<br>

### **冲突后的文件展示:**  
注意: 我们现在在 master 分支上
``` js
//这里是当前分支 也就是master分支
<<<<< HEAD
bbs
=====
ask
>>>>> ask
// 下面这个内容是 要合并的分支 比如 git merge ask 这个ask
```

然后我们选择最终的内容 保存解决冲突结束 解决冲突后我们再次
```js
git add .
git commit -m "解决冲突了"
```

<br><br>

# git reset 的概念
在这个章节中我们会说些 关于撤销 变更的方法   
这个命令更像是 前往 或者 变成 有种go to

reset这个命令并不是删除或者重新设置commit 只是前往到某一次提交上

<br>

### **回到指定分支的前一次提交:**
```
git reset 分支名^
```

**场景:**  
当前在master分支上
```js
// 创建一个文件
touch master2.md

// 提交
git add .
git commit -m "add master2.md"

// 查看日志
* 472a41a add master2.md    // 最新
* 8b24cf1 master init content


// 这时我们想回退到 master分支的上一个版本
git reset master^
```

观察 我们会回退到 "master2.md" 尚未add的状态

<br>

### **回到前一次提交:**
```
git reset--hard HEAD^
```

<br>

### **相对撤销的方式:**

**<font color="#C2185B">^</font>**  
表示上一个版本

<br>

**<font color="#C2185B">~num</font>**  
表示回退到指定的版本 
```
git reset master~5
```

<br>

### **绝对撤销的方式:**
```
git reset commitID
```
也是回退到 需要重新 add 的样子

<br>

### **参数:**

**<font color="#C2185B">--soft</font>**  
这个模式 工作区和暂存区的文件都不会被丢弃 commit会被回退

也就是说我们需要重新commit 但是不用add

<br>

**<font color="#C2185B">--mixed</font>**  
默认值

使用该参数的时候 git 会将暂存区的文件全部丢掉 但是在当前的目录中还是能看到的

这个模式会把暂存区的文件丢弃, 但是不会动到工作目录的文件

<br>

**<font color="#C2185B">--hard</font>**  
这个模式 不管是工作区还是暂存区的文件都会被丢弃

```js
git reset --hard commitID
```

<br>

如果想简单粗暴彻底取消最近的一次提交, 使用 --hard

如果只是想取消提交 想将commit回到暂存区, 使用 --soft

<br>

### **配和 git relog 可以前往各个版本 即使是我们通过 --hard 删除掉的文件**
```
git reflog
git reset --hard commitID
```

<br><br>

# git revert 的概念
该命令也可以撤销某一次的操作, 它和reset不一样的地方 它可以保留这次操作之前 和 之后的commit 和 history 并且把这次撤销作为一次最新的提交

<br>

```
git revert commitID
```

<br>

所以我们应该在公共的分支上 如 master 上 要使用 revert 将记录保留下来 方便以后使用 reset 来修改 回溯

特性分支上可以使用 reset 直接回退到某一个版本

<br>

**常用方式:**  
如下的方式都可以
```
git revert HEAD^
git revert HEAD~5
git revert commitID
```

<br>

在 revert 的时候会造成代码冲突

<br><br>

# git rebase 的概念
关键的作用: 使提交记录变的更加的简洁

<br>

### **使用场景1: 合并多次commit**
我们在完成一次功能开发的时候 会有很多次commit记录 如
```
c1 - c2 - c3 - c4 -c5 
```

但是这些过程中的提交记录对于代码审核的人来说是没有意义的 同时每次提交记录中只能看到当次的修改 假如我们要看完整的修改信息 还要依次点击多个记录 来进行查看 也就是一说 对于代码审核来说 也是非常麻烦的

所以我们通常会选择将多次commit 合并成一次

<br>

**<font color="#C2185B">使用方式:</font>**  
比如当前分支有很多次commit 我们可以执行下面的操作
```
git rebase -i HEAD~6

git log --oneline
git rebase -i commitID
```

**指定版本号的方式:**  
我们最新的提交在最上方 当我们指定版本号的时候 就意味着 最上方 ~ 指定版本号 这几条记录要进行整合 合并记录

<br>

**HEAD~3:**  
从最上方开始 找最近的3条记录开始进行整合 合并记录

<br>

之后git会唤起编辑器 并预加载一个文档 整个文档分为两个部分

```
pick 提交记录
pick 提交记录
pick 提交记录


# 注释帮助文档
# 注释帮助文档
# 注释帮助文档
```

上半部分是本次待操作的提交列表   
下半部分就是交互式rebase支持的指令说明

<br>

通过编辑上半部分 我们可以订制和编排git搬移提交的方式

上半部分的每个提交默认被赋予了 pick 指令 还有几个比较常见的指令

```js
// 默认 保留该commit
p, pick <commit>


// 选用该提交 但在搬移的时候暂停下来 让用户修改提交信息
r, reword <commit>


// 选用该提交 但将该提交的变更压缩到上一个选中的提交中 不单独生成提交
s, squash <commit>


// 舍弃该提交及其相关的变更
d, drop <commit>



// 将该commit合并到前一个commit，但不要保留该提交的注释信息
f, fixup [-C | -c]

// 保留该commit, 但我要停下来修改该提交(不仅仅修改注释)
e, edit <commit>

// 执行shell命令
x, exec <command>


b, break
l, label <label>
t, reset <label>
m, merge [-C <commit> | -c <commit>]
```

<br>

当要完成 合并记录的操作的时候 我们选择 **<font color="#C2185B">s</font>**

```js
pick 9f32ab1 C2
pick 4eb5f32 C3   
pick 352ef80 C4

// 修改为:
pick 9f32ab1 C2
s 4eb5f32 C3       ↑
s 352ef80 C4       ↑
```

rebase后feature分支上的提交记录会从3个减少到1个 实现提交的压缩

标记为s的版本 会合并到它的上一个版本 会依次合并到上一个版本 然后我们要写整合过的提交信息

<br>

**注意:**  
我们在做代码记录合并的时候 不要对已经提交(push)到远程的记录做合并

我们要对没有提交到远程的记录进行合并, 远程和本地的记录不一致会非常麻烦

<br>

### **调整commit提交的顺序:**  
下图中 master 推进了两个节点
```
pick 9f32ab1 C2
pick 4eb5f32 C3
pick 352ef80 C4


             feature
                ↓
        2   3   4
        □ - □ - □ 
      ↗
 □ - □ - - - □ - □
 0   1       5   6
                 ↑
               master
```

我们可以通过调整指令的排序 来指定提交的搬移顺序 

<br>

**<font color="#C2185B">使用方式:</font>**  
直接改变 提交记录的顺序

比如: 我们想将 节点3 排到最前面的话
```js
// 将节点3置顶
pick 4eb5f32 C3   // 从下面挪到上面的

pick 9f32ab1 C2
pick 352ef80 C4
```

<br>

上面修改完后 git 就会按照我们指定的顺序 进行提交搬移和重建
```
 □ - □ - - - □ - □ - □ - □ - □
 0   1       5   6   3   2   4
```

<br>

在rebase完成后feature分支不仅切换到了新基线 其对应的提交历史 也变成了我们期望的顺序

<br>

### **删除某条commit记录:**   
如果我们想在 rebase 的过程中 完全丢弃节点3的变更 key修改 节点3对应的指令为drop

```js
// 原始:
pick 9f32ab1 C2
pick 4eb5f32 C3
pick 352ef80 C4



// 修改为 squash 
pick 9f32ab1 C2
drop 4eb5f32 C3
pick 352ef80 C4
```
这样git在搬移提交的过程中 就会按照我们的意愿跳过节点3 这样节点3对应的提交就会被舍弃

<br>

### **注意:**  
千万不要使用 rebase 处理已经被其他协作者引用的提交

git reabse master 解决冲突后 接下来 git add . 然后不要使用 commit 而是 git rebase --continue

<br>

### **使用场景2: 两条分支进行合并时, 整合提交线**
git reabse 可以让我们的提交记录更加的简洁

<br>

## **复现问题:**
```js
        ask □ - □ 
          ↗
master - □ - □
```

<br>

我们模拟出上述的情景, 我们从master上切出一条新的分支 在ask上开发自己的功能 

这时 master 分支上也有推进, 在这种场景下 我们看看 

**get merge 和 git rebase 的区别**

```js
// 新建仓库
cd test
git init

// 创建文件
touch master.php

// 提交
git add .
git commit -m "master"


// 创建并切换到 ask分支
git checkout -b ask

// 在ask分支上创建文件 并提交
touch ask.php
git add .
git commit -m "ask"
```

```js
// 我们在 master分支上切出一个ask分支包含(master.php)
        ask □ - □ 
          ↗
master - □
```

<br>

**<font color="#C2185B">merge的使用结果:</font>**  

```js
// 切回master 将ask合并进来
git checkout master 

// 将 ask 合并到master上
git meger ask
```

上面的这种合并方式就是将 master 的指针移动到 ask 的最新提交
```js
// fast-forward
        ask □ - □ 
          ↗       ↖ HEAD
master - □
```

<br>

如果我们回到 master 在创建一个新文件并提交
```js
        ask □ - □ 
          ↗     
master - □ - □
             ↑
        master推进了一步
```

这时我们再跟ask合并 注意该情况下就不是移动指针而是真正的合并 

首先会将ask代码拿过来 和 本地代码进行合并 合并路线会如同下图
```js
        ask □ - □ 
          ↗       ↘   
master - □ - □ - - □
                   ↑
          merge会向前推进一个新节点
```

但有的时候我们希望不要这样的 而是希望合并路线是一条直线 

同时在合并ask的时候有可能会产生冲突 这个冲突希望由ask分支的人员进行解决 

比如后盾老师写的开源库 有人提交了代码 老师在合并的时候会产生冲突 老师就需要修复冲突 但是老师对这个人写的代码不了解 还要阅读 就会给老师造成负担 这是不太方便的

这时候就希望这个人可以自己将问题解决好合并给老师就可以了 这就是rebase的使用场景

<br>

**<font color="#C2185B">rebase的使用方式:</font>**  
上面的情况下 我们也可以使用 git rebase rebase可以理解为 replace base 替换基础

```js
// 我们先在 子分支上操作
git rebase master
```

当我们在 ask 分支上执行上述命令后哦

rebase会将子分支的提交记录先一一隐藏 然后将 master上的新提交拿到 ask 分支上 然后将隐藏起来的提交一一粘贴到master最新提交的后面 同时改变子分支的基础点到master的最新提交 这样就不会产生合并记录了
```js         
            2   3
        ask □ - □ 
          ↗
master - □ - □
         1   4




           4   2   3
           □ - □ - □  将master分支的4拿到子分支
          ↗
master - □
         1
```

说白了 rebase就是改变子分支的基础点, 上述的步骤只是将master上的新提交合并到ask分支上 然后如果有需要我们还可以 切换到 master 分支上 再将 ask 分支上的内容合并到 master 上
```
git checkout master
git merge ask
```

<br>

这样的操作之后 时间线就会变成一条的直线 如果这样有冲突的话 因为是将 master 的内容拿到了子分支上 所以冲突也是在子分支解决的

然后由于我们在子分支上解决了冲突 master再合并的时候1是不同解决冲突 2是提交时间线非常的干净

比如我们给开源项目做提交就要先走一遍rebase相当于拿到master的最新提交 然后我们的操作会在master最新提交之后

<br>

### **解析:**  
我们在节点1的位置上 创建了 feature 分支
```
  feature
     ↓
 □ - □
 0   1
     ↑
   master
```

并在特性分支上创建 2 3 4 提交, 与此同时master上又合并了其它的提交(5 6)
```
               feature
                 ↓
         2   3   4
       ↗ □ - □ - □ 
 □ - □ - □ - □
 0   1   5   6
     ↑
   master
```

如果这时我们要将master上新引入的变更 也整合进feature中 我们会使用 merge 是么

<br>

merge和rebase都有整合分支间变更的能力(也就是都有合并的能力呗 也就是说 merge 和 rebase 的功能差不多 只是手段不一样) 

<br>

**git merge master的情况下:**  
如果我们在 feature 上执行 git merge master 的话 git会将 feature分支的节点4 和 master分支的节点6 以及两个分支最近的公共祖先节点1 将 节点1 + 节点4 + 节点6 执行三路合并生成新快照

并基于此快照创建一个连接feature 和 master的合并节点 最后调整 feature的指针
```
                   feature
                     ↓
         2   3   4   7
       ↗ □ - □ - □ - □ (3路合并的合并节点)
 □ - □ - □ - □     ↗
 0   1   5   6
     ↑
   master
```

可见git merge 总是在向前推进提交历史 并不会影响提交的原始状态

<br>

**git rebase 的情况下:**  
它是对提交历史进行重写 

当我们在 feature分支上执行 git rebase master 的时候

git会从feature和master双方最近的公共祖先开始 将feature分支上 每个提交对应的变更暂存起来 然后以master的最新提交为起点 将暂存的变更按照顺序一一还原成新的提交

rebase完成后 feature分支的起始点(基点)会从节点1迁移到节点6
```
        2   3   4
        □ - □ - □     feature(HEAD)
      ↗                  ↓
 □ - □ - □ - □ - □ - □ - □
 0   1   5   6   2   3   4
     ↑       ↑
   master feature(基点)
```

通常情况下无乱是meger 还是rebase feature分支最终所指向的快照会完全相同

也就是说 git merge 通过三路合并生成的 节点7 和 git rebase 重建出的 节点4 所对应的代码内容完全相同 

但是两个方式却呈现了不同的提交历史

<br>

### **场景示例:**
还有当多人在同一个分支上协作时, 很容易出现冲突。即使没有冲突, 后push的童鞋不得不先pull, 在本地合并, 然后才能push成功。

每次合并再push后, 分支变成了这样：
``` 
$ git log --graph --pretty=oneline --abbrev-commit


* d1be385 (HEAD -> master, origin/master) init hello
*   e5e69f1 Merge branch 'dev'
|\  
| *   57c53ab (origin/dev, dev) fix env conflict
| |\  
| | * 7a5e5dd add env
| * | 7bd91f1 add new env
| |/  
* |   12a631b merged bug fix 101
|\ \  
| * | 4c805e2 fix bug 101
|/ /  
* |   e1e9c68 merge with no-ff
|\ \  
| |/  
| * f52c633 add merge
|/  
*   cf810e4 conflict fixed
```
<br>

### **注意:**  
rebase 不要在公共分支上合并别的分支

<br>

### **使用场景3: 下拉代码时的rebase**
场景:  
A同学在公司对代码进行了提交 但是只commit 没有push到远程仓库

A同学回到家后想继续工作 但是因为远程仓库没有在公司新做的代码 只能重新切一条分支出来 写逻辑完成功能 提交到了远程

第二天A同学要到公司将昨天改的代码拉下来, 如果我们使用的是 git pull 那么 

远程的代码 和 公司本地的代码 会进行一次合并, 而且提交记录中会产生分叉

<br>

如果我们不想产生分叉 我们可以进行如下的操作
```
git fetch origin dev

git rebase <本地分支> <远程/分支>
git rebase dev origin/dev
```

<br>

也就是说先将远程的代码拉下来 然后再用本地的 和 远程的代码进行rebase合并
```js
// 或者这样也可以吧
git pull --reabse
```

<br>

### **rebase的冲突问题:**
如果我们在使用 rebase 的时候产生了冲突 那么我们先解决冲突 解决之后
```js
git add .

// 解决完冲突后继续rebase
git rebase --continue
```

<br><br>

# 复制某分支的某一次提交到当前分支上 

### **场景:**  
在master分支上修复了bug后, 我们要想一想, dev分支是早期从master分支分出来的, 所以, 这个bug其实在当前dev分支上也存在。

那怎么在dev分支上修复同样的bug？重复操作一次, 提交不就行了？有木有更简单的方法？有！

同样的bug, 要在dev上修复, 我们只需要把4c805e2 fix bug 101这个提交所做的修改"复制"到dev分支。

<br>

### **注意:**  
我们只想复制4c805e2 fix bug 101这个提交所做的修改, 并不是把整个master分支merge过来。

为了方便操作, Git专门提供了一个cherry-pick命令, 让我们能复制一个特定的提交到当前分支

<br>

## 操作:
### **<font color="#C2185B">复制某分支的某一次提交到当前分支上:</font>**  
```
git cherry-pick 4c805e2
``` 

```js
// 现在在dev
$ git branch
* dev
master

将 4c805e2 这次提交复制到当前分支上
git cherry-pick 4c805e2
```

Git自动给dev分支做了一次提交, 注意这次提交的commit是1d4b803, 它并不同于master的4c805e2, 因为这两个commit只是改动相同, 但确实是两个不同的commit。用git cherry-pick, 我们就不需要在dev分支上手动再把修bug的过程重复一遍。

  有些聪明的童鞋会想了, 既然可以在master分支上修复bug后, 在dev分支上可以"重放"这个修复过程, 那么直接在dev分支上修复bug, 然后在master分支上"重放"行不行？当然可以, 不过你仍然需要git stash命令保存现场, 才能从dev分支切换到master分支。

修复bug时, 我们会通过创建新的bug分支进行修复, 然后合并, 最后删除；

当手头工作没有完成时, 先把工作现场git stash一下, 然后去修复bug, 修复后, 再git stash pop, 回到工作现场；

在master分支上修复的bug, 想要合并到当前dev分支, 可以用 ``git cherry-pick <commit>``命令, 把bug提交的修改"复制"到当前分支, 避免重复劳动。

<br><br>

# Git的工作流
master分支也叫做稳定分支
```
master分支:
□ - - - - - - - - - - - - - 
```

一般我们会从master上分出 dev 分支 它是和master并行的分支 我们会将稳定的代码 上线的代码放到 master 里面
```
dev分支:
□
↑
□ - - - - - - - - - - - - - 
```

然后我们开始进行项目开发 开发ask模块 我们会从dev分之上分出ask分支来进行开发
```
    □ ask
  ↗
□
↑
□ - - - - - - - - - - - - - 
```

ask模块中有人负责js 有人负责ui 所以我们会从ask分支上再次的切出新的分支来进行开发 开发成功后我们再依次进行合并
```   
          ↗  □  ui
        □ ask
          ↘  □  js
      ↗
    □ dev
  ↗
□ master
```

master分支中可能不是最新的功能 但他一定是最稳定的功能

<br><br>

# stash临时储存区
当我们的代码还没有提交的时候 是不允许我们切换分支的 这时候我们可以将当前的工作内容暂存起来

### **注意:**  
只有跟版本库关联的文件才能使用 stash  
要么是在 add 后
要么是在 commit 后

<br>

### **<font color="#C2185B">暂存当前的修改:</font>**  
```
git stash
``` 

<br>

### **<font color="#C2185B">查看已暂存的内容:</font>**  
```js
git stash list

// 结果
stash@{0} 这是暂存标识
``` 

<br>

### **<font color="#C2185B">添加暂存描述:</font>**  
```js
git stash save "信息"
``` 

<br>

### **<font color="#C2185B">恢复暂存起来的内容:</font>**  
```js
git stash apply

// 恢复指定的 stash
git stash apply stash@{0}
```

<br>

### **<font color="#C2185B">恢复暂存起来的内容并删除暂存:</font>**  
```
git stash pop
```

<br>

### **<font color="#C2185B">删除指定的暂存区:</font>**  
```
git stash drop stash@{0}
```

<br><br>

# Tag标签
主要用来声明项目阶段版本, 相当于我们人生的成长阶段 比如小学生打一个标签 中学生阶段打一个标签 类似这样的概念

我们的代码在开发的过程中 master 是最稳定的分支 在某一个阶段我们能开发好了 我们就可以打一个标签 比如 version1.0

我们在安装软件的时候也会经常看到这样的版本号 我们就可以理解为打标签

## Git中使用 tag 标签的方式:
只有稳定的版本才可以打标签

### **<font color="#C2185B">展示当前标签的列表:</font>**  
```
git tag
```

<br>

### **<font color="#C2185B">给当前的分支打标签:</font>**  
```
git tag v1.0
```

<br><br>

# 对当前分支进行打包
当我们的项目开发好后 如果我们想发布代码 要如下的操作

### **<font color="#C2185B">将当前分支进行打包:</font>**  
将当前的分支打包成 zip 文件
```js
// --prefix="压缩后的文件夹名"
// --forma=zip > hdcms.zip 压缩成zip zip的名字是hdcms
git archive master --prefix="hdcms/" --forma=zip > hdcms.zip
```

<br><br>

# 项目的托管平台 Github

### **1. 注册 github 账号**  

<br>

### **2. 创建仓库**  
- 选择 添加 readme.md 的话 直接就是一个仓库  
github会帮我们完成一个初始的提交

- 直接创建仓库的话 仓库是空的 会有命令步骤提示

<br>

### **3. 生成ssh秘钥**  
完成免密码登录, 下面的命令后一直敲回车
```
ssh-keygen -t rsa
```

进入到家目录
```js
cd ~/.ssh
ls

// 公钥
id.rsa.pub 

// 复制
vim id.rsa.pub
```

<br>

### **4. 将公钥粘贴到github上**  
```
头像 - settings - SSH and GPG keys
```

<br>

### **5. 使用ssh克隆仓库**  

<br>

### **6. 关联远程仓库**  
```
git remote add origin ssh链接
```

<br>

### **7. 修改远程仓库地址**  
```
git remote set-url origin ssh链接
```

<br>

### **8. 查看链接的远程仓库**  
```js
git remote -v
```  

<br>

### **9. 删除远程库**  
```js
git remote rm <name>
```  

<br><br>

# 自动部署
我们将代码会放到 github 服务器上 我们也会有一个自己的服务器
```
Github服务器  ← auto pull  自己的Web服务器

        ↖

            本地
```

我们在本地开发的时候 将代码推送到github中 我们希望我们的web服务器可以自动拉取Github服务器中最新的代码

<br>

## 流程:
能实现这样的操作主要是我们在向github推送代码的时候会触发github身上的一个钩子

然后 github 会请求我们web服务器的一个文件 web服务器会通过这个文件执行 git pull

<br>

## 实现:
### **1. 点击导航区的 Settings 按钮**  
系统设置点击头像  
项目设置点击导航区按钮 我们这里就是项目设置

<br>

### **2. 点击 WebHooks 按钮**  
```js
Payload URL: 请求的web服务器地址
```

用到的时候再看看吧 讲的不好
```
https://www.bilibili.com/video/BV1WW4y1b78T/?p=35&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

<br><br>

# 静态页面托管到github
1. 创建仓库
2. 创建 gh-pages 分支
3. 写index.html 推送到 github 该分支上
4. 然后去仓库的pages选项卡里面
5. https://github.com/slnn2080/TestRepositories/settings/pages
6. 在source的位置上选择 gh-pages 点击save

<br><br>

# 文件的 修改 && 对比
### **场景：**  
我们已经成功地添加并提交了一个 readme.txt 文件, 现在, 是时候继续工作了, 于是, 我们继续修改readme.txt文件, 改成如下内容：
```js
  Git is a distributed version control system.
  Git is free software.

  git status
  On branch master
  Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
      modified:   readme.txt
  no changes added to commit (use "git add" and/or "git commit -a")

  // 上面的命令输出告诉我们, readme.txt被修改过了, 但还没有准备提交的修改。
```

<br>

### **<font color="#C2185B">查看文件做了哪些修改:</font>**  
比如你休假两周从国外回来, 第一天上班时, 已经记不清上次怎么修改的readme.txt, 所以, 需要用git diff这个命令看看：
```js
git diff fliename
```

说下场景 我们创建了两个文件 都将这两个文件提交至了本地库  
然后修改了其中的一个文件 并没有将这个操作提交到暂存区之前 我们可以使用 git diff 命令来看下这次的修改 和 指定版本有什么地方不一样

### **注意:**  
如果我们将此次修改提交到了暂存区(git add后) 再进行比较的话 使用git diff命令会发现没有任何区别

<br>

### **<font color="#C2185B">比较两次指定的提交的内容</font>**  
利用哈希值 比较两次 commit 之间的差异
```js
git diff d0702a1 3a03505
```

### **参数:**  
只显示哪些文本不一样 不显示内容
```
--stat
```

<br>

### **<font color="#C2185B">和某一个历史版本进行比较</font>**  
```
git diff HEAD^ 目标文件
```

<br><br>



# 版本回退
上面我们已经学会了如何修改文件 以及提交文件 当我们不断对文件进行修改, 然后不断提交修改到版本库里, 就好比玩RPG游戏时, 每通过一关就会自动把游戏状态存盘, 如果某一关没过去, 你还可以选择读取前一关的状态。

有些时候, 在打Boss之前, 你会手动存盘, 以便万一打Boss失败了, 可以从最近的地方重新开始。
Git也是一样, 每当你觉得文件修改到一定程度的时候, 就可以"保存一个快照", 这个快照在Git中被称为commit。

commit就相当于 存档 ？？？ 

一旦你把文件改乱了, 或者误删了文件, 还可以从最近的一个commit恢复, 然后继续工作, 而不是把几个月的工作成果全部丢失。

上面我们文件不断的进行了提交 但是多次提交后我们怎么知道 每次提交都修改了什么内容


## 概念:

### **<font color="#C2185B">(HEAD -> master)</font>**  
它是当前版本的指针 我们对版本进行读档操作的时候 就是移动这个 HEAD  
表示：当前在哪一个版本上


## 回退到 merge 前
git reset --merge  

<!-- 
    还是报错
    not uptodate. Cannot merge.
    Could not reset index file to revision 'HEAD'.
 -->

### **<font color="#C2185B">指针: HEAD</font>**  
它是当前版本的指针 我们对版本进行读档操作的时候 就是移动这个 HEAD  
表示：当前在哪一个版本上

<br>

## 回退步骤
好了, 现在我们启动时光穿梭机, 准备把readme.txt回退到上一个版本, 也就是add distributed的那个版本, 怎么做呢？

首先, Git必须知道当前版本是哪个版本, 在Git中, 用HEAD表示当前版本, 也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样）


### **<font color="#C2185B">HEAD^</font>**  
上一个版本

<br>

### **<font color="#C2185B">HEAD^^</font>**  
上上一个版本  
当然往上100个版本写100个^比较容易数不过来, 所以写成<font color="#C2185B">HEAD~100</font>。

<br>

### **<font color="#C2185B">回退到上一个版本</font>**  
```
git reset --hard HEAD^
```

<br>

### **<font color="#C2185B">回退到指定的版本(根据hash)</font>**  
前提 命令窗口没关 还能找到我们想去的版本hash
```
git reset --hard 1094a
```

那现在有一个问题 现在最新的版本是C 然后我们回退到了B 我们就看不见C了 就相当于我们从20世纪回退到19世纪后 回不去了怎么办？

办法其实还是有的, 只要上面的命令行窗口还没有被关掉, 你就可以顺着往上找啊找啊, 找到那个append GPL的commit id是1094adb..., 于是就可以指定回到未来的某个版本

<br>

### **<font color="#C2185B">查看记录</font>**  
记录你的每一次命令
```
git reflog
```

如: 回退后到B后 找不到A的 commit hash 了

现在, 你回退到了某个版本, 关掉了电脑, 第二天早上就后悔了, 想恢复到新版本怎么办？找不到新版本的commit id怎么办？

在Git中, 总是有后悔药可以吃的。当你用$ git reset --hard HEAD^ 回退到add distributed版本时, 再想恢复到append GPL, 就必须找到append GPL的commit id。
Git提供了一个命令git reflog用来记录你的每一次命令：

```js
git relog
  e475afc HEAD@{1}: reset: moving to HEAD^
  1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
  e475afc HEAD@{3}: commit: add distributed
  eaadf4e HEAD@{4}: commit (initial): wrote a readme file

// 终于舒了口气, 从输出可知, append GPL的commit id是1094adb, 现在, 你又可以乘坐时光机回到未来了。
```

<br><br>

# 回退的细节阐述:
git在帮我们管理历史版本的时候 它有一个指针 指针的名字就叫 HEAD
我们可以基于 HEAD 这个指针 在众多版本之间 移动 历史记录和回退和前进

控制 版本前进 后退 有3种方式:
1. 基于索引值操作  ->  推荐
2. 使用 ^ 符号  ->  只能回退
3. 使用 ~ 符号  ->  只能回退 但是能指定回退步数


比如 我们现在有下面的三个版本
```js 
  1ac3862 (HEAD -> master) HEAD@{0}: commit:  // 这是第三次提交
  0779099 HEAD@{1}: commit:  // 这是第二次提交
  a2844d7 HEAD@{2}: commit (initial):  // 这是第一次提交
```


## git reset 后面接的参数 --hard / --soft / mixed 对比
### **<font color="#C2185B">git reset --hard</font>**  
暂存区和工作区都会被重置掉 同时在本地库移动HEAD指针

<br>

### **<font color="#C2185B">git reset --soft</font>**  
只在本地库移动HEAD指针
``` 
原来的状态                现在的状态
本地库  暂存区  工作区     暂存区  工作区

                        本地库
                        使用sort本地库回退了一个版本
                        因为和暂存区的版本不一致了 所以内容也不一致
```

<br>

### **<font color="#C2185B">git reset --mixed</font>**  
在本地库移动HEAD指针 也会重置暂存区
``` 
原来的状态                现在的状态
本地库  暂存区  工作区                   工作区
                        本地库  暂存区
                        使用mixed本地库和暂存区回退了一个版本
                        工作区的内容没变 会显示工作区内容需要git add
```

<br><br>

# 删除文件内找回

## 永久删除文件后找回 (前提是我们每一次都commit了)
这里我们主要指将文件提交到本地库后 删除它怎么办？

### **思路:**  
通过git管理的项目 每一次提交的版本都会版本记录 只要我们提交 它会把每一次提交都保存下来 方便我们前进或者回退

这样的话 我们就可以通过这个特点来找回删除的文件


比如我们把一个文件从工作区提交到了本地库 然后我们在电脑了把文件删除了 也就是说 工作区没有文件了

在删除的状态下 我们使用 git status也能观察到 delete aaa.txt 也是需要你提交的 也就是说 即使你删除了文件 就这个动作而言 你也是需要add commit的
    
然后在git里面又会形成一个新的版本 然后我们再通过回退到删除文件前的版本就可以取回删除前的文件



基于上面这点 我们在已经提交完一次之后 删除了文件 接下来我们可以这样操作
```js
git add . 
git commit -m '刚才删除了文件提交这次删除文件的操作 想要回退到删除前版本'
git reflog
git reset --hard 删除文件前版本的哈希值
```


<br>

## 添加到暂存区的删除文件找回
刚才我们研究了一下 已经添加到本地库的文件 然后本地进行了删除后 怎么找回

也就是说 *新建了一个文件add后rm 没有commit的情况下 怎么操作*  
也是一样 我们需要将删除的步骤保存到

<br>

### **<font color="#C2185B">git reset --hard HEAD</font>**  
我们使用这条命令回退到*创建文件的时候的版本* 来找回删除的文件

<br>

### **<font color="#C2185B">总结：</font>**  
删除文件并找回的前提：

删除前 文件存在时的状态提交到了本地库  
操作方式 git reset --hard 指针位置  

删除操作已经提交到本地库： 指针位置指向历史记录  
删除操作尚未提交到本地库： 指针位置使用HEAD

<br><br>

# 合并多次提交
我们对代码的每一次的修改 都会进行一次 add 和 commit 这样我们的修改才会被提交到本地的版本库

但是每次我们不要对每次的修改都commit  
可以 add - add - add - commit  
这样可以提交一次

<br><br>

# Git基本原理:

## 哈希：
哈希是一个系列的加密算法, 各个不同的哈希算法虽然加密强度不同 但是有以下几个共同点 不仅仅可以对文本操作 音频 视频都可以

- 不管输入数据的数据量有多大 输入同一个哈希算法 得到的加密结果长度固定(md5就是一种哈希算法)
- 哈希算法确定, 输入数据确定 输出数据能够保证不变
- 哈希算法确定, 输入数据有变化, 输出数据能够保证不变
- 哈希算法不可逆

### **Git底层采用的是SHA-1算法：**  
哈希算法可以被用来验证文件 比如有没有丢失数据

    原始文件    通过哈希算法    得到一串数字    服务器
    目标文件    通过哈希算法    得到一种数字    客户端

    然后我们比较两个数字的结果 如果有一点变化 比如下载的过程中丢失了一部分 我们都能通过哈希结果看到 差异会很大

<br><br>

# .gitignore 忽略git文件
里面直接写 node_modules 就可以了

Kinoto的忽略文件
```
#custom
.DS_Store
Thumbs.db

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock
# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/
node_modules/
linter/

# TypeScript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# next.js build output
.next

# JetBrains IDE
.idea/
*.iml
# Visual Studio Code
.vscode/
dist/
_preview/assets/style/
_preview/assets/javascripts/
_preview/assets/json/
```

# Git其他命令:

### **<font color="#C2185B">查看 git 命令 & 参数</font>**  
```
git config
```

# Git的使用技巧:
### **<font color="#C2185B">别人发给我的pullrequest</font>**  
检查代码可以在页面上操作
如果有图片的话 需要将这个文件pull到本地查看 查看如果没问题的话 需要点 同意

<br>

### **<font color="#C2185B">sourceTree解决冲突</font>**  
可以在sourceTree里面选中有冲突的文件 然后右键 点击冲突解决 然后选择以谁的冲突为准

<br>

### **<font color="#C2185B">创建request的方式</font>**  
1. 前端页面 命令行到commit - 然后vscode里面只用git工具提交 - 去github主页 - pullrequest - 前面选择到哪个分支 后面选择自己的分支 然后写什么已经截图了 

<br>

### **<font color="#C2185B">当主分支有新的东西需要下载 或者说 我们的现有分支因为没有对应的东西报错的时候</font>**  
我们可以先在主分支上 pull 最新的数据 然后在我们自己的分支上合并主分支的数据就好了

<br>

### **<font color="#C2185B">在下拉操作的时候</font>**  
```
git pull --rebase origin master
```

<br>

### **<font color="#C2185B">在执行了  git fetch 之后</font>**  
我们还要执行 
```
git merge origin/分支名
```

<br>

### **<font color="#C2185B">you need to resolve your current index first 解决办法</font>**  
从一个分支A 切换到 另一个 分支B 后, 对切换后的B分支进行pull操作, 因为pull操作实际上包含了fetch+merge操作, 在执行 merge 操作时, 由于很长时间没有对B分支执行过pull/merge操作  

本地的B分支库与remote中的B分支库中的差异很大（且这些差异是其他同事开发的文件）, merge时产生冲突, 使得B分支的状态为merging, 其实是指merge失败, 还停留在merge状态, 也不能执行pull操作。

这时没有解决冲突, 而是从B分支上执行checkout/switchto操作, 试图再切换其他分支时 就会报上述的错误

<br>

### **解决方式:网上的答案：** 
1. 解决conflicts后再次执行merge
2. 回退到merge前

既然merge冲突是其他同事的文件, 我不需要去resolve conflicts, 那就退回merge前吧, 单纯的改我的文件再push吧, 执行以下代码：

<br><br>

# 疑难问题:
### **<font color="#C2185B">failed to push some refs to 'git@github.com:xxx/xxx.git'错误提示</font>**  

### **解决的办法：**  
```
git pull --rebase origin master
```

<br>

### **场景：**  
在pull的时候出现下面注释中的提示

解决办法：
git config pull.ff false
git config --global pull.rebase false
<!-- 
    hint: Pulling without specifying how to reconcile divergent branches is
    hint: discouraged. You can squelch this message by running one of the following
    hint: commands sometime before your next pull:
    hint: 
    hint:   git config pull.rebase false  # merge (the default strategy)
    hint:   git config pull.rebase true   # rebase
    hint:   git config pull.ff only       # fast-forward only
    hint: 
    hint: You can replace "git config" with "git config --global" to set a default
    hint: preference for all repositories. You can also pass --rebase, --no-rebase,
    hint: or --ff-only on the command line to override the configured default per
    hint: invocation.


    warning 不建议在没有为偏离分支指定合并策略时执行pull操作 您可以在执行以下次pull操作之前执行下面一条命令来抑制本消息
    git config pull.rebase false    合并 默认策略
    git config pull.rebase true     变基
    git config pull.ff only         仅快进
 -->

我们在上述的警告文案描述中可以发现两个重要的Git配置信息pull.rebase和pull.ff。


### **<font color="#C2185B">pull.ff </font>**  
当把pull.ff设置为false时, 这个变量告诉Git在这种情况下, 如果执行不带选项的git pull命令时先尝试快进合并, 如果不行再进行正常合并生成一个新的提交。
    pull.ff false

当把pull.ff设置为only时, 只允许快进合并(相当于执行命令git pull --ff-only), 如果执行不带选项的git pull命令时, 如果不能进行快进合并则终止当前操作。
    pull.ff only

如果将pull.ff设置为only, 而执行不带选项的git pull命令被终止, 其实可以使用带参数的git pull --no-ff或者git pull --rebase命令来执行pull操作。


### **<font color="#C2185B">pull.rebase</font>**  
当pull.rebase为true时, 运行不带选项的命令git pull相当于执行git pull --rebase。
当pull.rebase为false时, 运行不带选项的命令git pull不会被改变含义, 即不会变基。如果想变基, 需要在执行命令时显式地加上选项--rebase, 即git pull --rebase。

https://blog.csdn.net/wq6ylg08/article/details/114106272

<!-- 
    2.2 理解git pull命令的原理及其各选项的含义
    2.2.1 git pull命令的原理
    git fetch会查询git remote中所有的远程仓库所包含分支的最新提交, 并将其记录到.git/FETCH_HEAD文件中。

    .git/FETCH_HEAD是一个版本链接, 指向着目前已经从远程仓库取下来的所有分支的最新提交。

    git pull命令等价于：先执行git fetch, 再执行git merge FETCH_HEAD将远程仓库对应分支的最新提交合并到当前本地分支中。

    2.2.2 git pull命令中各选项的含义
    其中git pull有这几项常见的选项搭配：

    不带任何选项的git pull命令：先尝试快进合并, 如果不行再进行正常合并生成一个新的提交。
    git pull --ff-only命令：只尝试快进合并, 如果不行则终止当前合并操作。
    git pull --no-ff命令：禁止快进合并, 即不管能不能快进合并, 最后都会进行正常合并生成一个新的提交。
    git pull --rebase命令：先尝试快进合并, 如果不行再进行变基合并。
    2.3 理解git pull命令出现问题的原因
    现在, 看完上述的问题的文案描述、git pull命令的原理及其各选项的含义后, 现在我们清楚为什么git pull命令出现该警告文案的原因了：
    
    执行不带任何选项的git pull命令时, 会产生三种歧义： git pull --ff-only、git pull --no-ff、git pull --rebase, 而这三种pull方式的合并策略差异很大, 即对整个分布式项目的版本管理有很大的影响作用。

    而我们执行不带任何选项的git pull命令时, Git就不知道我们到底想用哪种合并策略来执行git pull, 因此Git会给出上述的警告文案, 建议我们通过git config命令指定不带选项的git pull命令应该按照这三种合并策略的哪种来执行。

    首先理解什么是偏离分支：
    当本地的分支落后于远程分支时, 本地分支又自行修改项目文件生成了新的提交, 这时本地分支再执行git pull命令就不能快进合并, 并且还容易发生冲突。这时的本地分支便称为偏离分支, 因为这时的本地分支的最新提交跟远程分支的最新提交不同, 产生了偏离。

    接着理解什么是合并策略：
    合并策略便是 
        git merge --ff-only、
        git merge --no-ff、
        git merge --rebase
    这三种常见的合并策略, 分别代表着快进合并、非快进普通合并、变基合并。


    而我们执行不带任何选项的git pull命令时, Git就不知道我们到底想用哪种合并策略来执行git pull, 因此Git会给出上述的警告文案, 建议我们通过git config命令应该按照这三种合并策略的哪种来执行。

    通过上述的文章讲解, 现在我们理解了为什么理解git pull命令出现问题的原因, 因此只要我们在Git中配置选项pull.rebase或pull.ff的参数即可。配置后, 即便我们再执行不带任何选项的git pull命令, 也不会再出现上述的警告文案啦。


    如何配置选项pull.rebase或pull.ff的参数
    博主已经在本文的《2.1 理解问题的文案描述》章节中将选项pull.rebase和pull.ff的参数的所有情况进行了一一介绍, 因此具体怎么配置按照你使用Git的个人喜好即可。

    例如博主喜欢在git pull时只接受快进合并和变基合并, 那么博主可以执行git config pull.ff only, 保证每次执行不带选项的git pull时要么快进合并成功, 要么快进合并失败。如果快进合并失败, 博主再显式执行git pull --rebase进行变基合并即可。
 -->