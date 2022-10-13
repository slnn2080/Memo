# PM2
它是用来帮助我们管理 Node 进程的 是一个 node进程管理工具 

可以利用它来简化很多 node 应用管理的繁琐任务 如
- 性能监控
- 自动重启
- 负载均衡 等

因为在工作中遇到服务器重启后 需要一个个去重新启动每个服务 这样不仅繁琐 效率低 而且容易遗忘开启一些服务

<br>

## PM2的特性
- 内建负载均衡（使用 Node cluster 集群模块）
- 后台运行
- 0 秒停机重载
- 具有 Ubuntu 和 CentOS 的启动脚本
- 停止不稳定的进程（避免无限循环）
- 控制台检测
- 提供 HTTP API
- 远程控制和实时的接口 API ( Nodejs 模块,允- 许和 PM2 进程管理器交互 )

<br>

## 演示:

### 创建目录:
```js
// 创建文件夹
mkdir pm2


// 进入
cd pm2
 

// 创建两个文件 该命令是创建index.js并往里写入内容 > 是覆盖 >> 是追加
echo >index.js
echo >index2.js


// 查看目录
ls


// 生成 package.json
npm init -y
```

<br>

### 通过 express 起服务器
目录整理好后 我们通过experss起个服务 两个js文件一个为8888 一个为9999 端口
```
node index.js
node index2.js
```

这时候我们发现 假如有10个这样的 服务器我们要启动10遍 同时还有可能漏起

<br>

## 安装 & 目录

```js
npm install -g pm2

// 查看版本号
pm2 -v
```

## 常用命令:

### **命令行参数:**  
我们可以在最基本的启动命令后面，添加一些参数选项，去满足我们的需求，常用的参数选项如下所示

**<font color="#C2185B">--watch:</font>**  
监听应用目录的变化，一旦发生变化，自动重启。
```
pm2 start index.js --watch
```

<br>

**<font color="#C2185B">-i or --instance</font>**  
启用多少个实例，可用于负载均衡，如果 -i 0 或者 -i max，则根据当前机器核数确定实例数目。

能分配多少取决于cpu的线程数

```js
// nodejs提供的模版查看电脑的线程
const os = require("os")
// 输出cpu的线程数
console.log(os.cpus())


// 我们可以给某个进程分配多少线程 比如我们给 index.js 进程分配5个线程
pm2 start index.js --watch -i 5
```

<br>

**<font color="#C2185B">--ignore-watch</font>**  
排除监听的目录或文件，可以是特定的文件名，也可以是正则。

<br>

**<font color="#C2185B">-n</font>**  
修改应用名称 比如原来就是 js文件名 我们可以改成最定义名
```
pm2 start index.js -n sam
```

<br>

### **启动命令:** 
启动成功后，我们对应可以看到启动的服务的一些信息, 这样属于后台启动 不会占用终端
```
pm2 start app.js
```

我们在启动命令后面加入以上的一些参数，完整的启动命令如下所示
```
pm2 start app.js --watch -i max -n xiaoman
```

<br>

### **停止命令:** 
停止特定的应用，可以通过 pm2 list 先获取应用的名字或者进程的 id，然后再调用以下命令停止相应的应用
```
pm2 stop app_name | app_id

pm2 stop 0
```

如果需要停止全部的应用，则使用以下命令：
```
pm2 stop all
```

<br>

### **重启命令:** 
```
pm2 restart id | 文件名

pm2 restart 0
```

<br>

### **删除命令:** 
删除特定的应用，可以通过 pm2 list 先获取应用的名字或者进程的 id，然后再调用以下命令删除相应的应用
```
pm2 delete app_name | app_id
```

如果需要删除全部的应用，则使用以下命令
```
pm2 delete all
```

<br>

### **查看有哪些进程**
看看开了哪些进程(上面的示例的话就是查看起了哪些服务器)
```
pm2 list
```

<br>

## 配置文件: pm2.json
如果我们使用命令行参数定义一些选项，那么每次启动进程时，都需要敲上一大堆的命令，非常繁琐；所以我们可以使用配置文件来将命令行参数进行配置，配置文件里的配置项跟命令行参数是基本一致的

如下所示  pm2 的配置文件 pm2.json ，然后在 package.json 文件中配置启动命令 "pm2": "pm2 start pm2.json" ，这样我们只需要运行 npm run pm2 就可以使用 pm2 启动我们的 express 项目，并且相关运行参数直接在 pm2.json 中配置好了。相关配置项表示的意义在下面文件中都已经注释说明

```js
{
"apps": {
  // 项目名          
  "name": "express_project",

  // 执行文件
  "script": "app.js",
  
  // 根目录
  "cwd": "./",

  // 传递给脚本的参数
  "args": "",

  // 指定的脚本解释器
  "interpreter": "",  
  
  // 传递给解释器的参数
  "interpreter_args": "",
  
  // 是否监听文件变动然后重启
  "watch": true,

  // 不用监听的文件
  "ignore_watch": [                
    "node_modules",
    "public"
  ],

  // 应用启动模式，支持 fork 和 cluster 模式
  "exec_mode": "cluster_mode",  

  // 应用启动实例个数，仅在 cluster 模式有效 默认为 fork
  "instances": "max",
  
  // 错误日志文件
  "error_file": "./logs/app-err.log",
  
  // 正常日志文件
  "out_file": "./logs/app-out.log",
  
  // 设置追加日志而不是新建日志
  "merge_logs": true,
  
  // 指定日志文件的时间格式
  "log_date_format": "YYYY-MM-DD HH:mm:ss",
  
  // 应用运行少于时间被认为是异常启动
  "min_uptime": "60s",

  // 最大异常重启次数
  "max_restarts": 30,

  // 默认为 true, 发生异常的情况下自动重启
  "autorestart": true,
  
  // 异常重启情况下，延时重启时间
  "restart_delay": "60"

  // 环境参数，当前指定为生产环境
  "env": {
    "NODE_ENV": "production",
    "REMOTE_ADDR": ""               
  },

  // 环境参数，当前指定为开发环境
  "env_dev": {
    "NODE_ENV": "development",
    "REMOTE_ADDR": ""
  },

  // 环境参数，当前指定为测试环境
  "env_test": {
    "NODE_ENV": "test",
    "REMOTE_ADDR": ""
  }
}
}
```

<br>

## 高阶应用: 

### **负载均衡:**
可以使用 -i 参数配置集群数，实现负载均衡，相关命令如下，可以查看
```
https://pm2.keymetrics.io/docs/usage/cluster-mode/#automatic-load-balancing
```

```js
// 开启三个进程
pm2 start app.js -i 3

// 根据机器CPU核数，开启对应数目的进程 
pm2 start app.js -i max 
```

<br>

### **日志查看:**
我们可以通过打开日志文件查看日志外，还可以通过 pm2 logs 来查看实时日志，这点有对于线上问题排查；日志查看命令如下

```
pm2 logs

pm2 log
```

<br>


### **监控:**
我们可以使用以下命令，查看当前通过 pm2 运行的进程的状态
```
pm2 monit
```