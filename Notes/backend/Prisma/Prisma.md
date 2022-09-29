### Prisma
- 基于Nodejs的ORM 以前我们操作数据库的话 需要学sql 如果有了ORM的话 我们就可以不学sql
- ORM可以帮我们将我们的写的操作对象的写法 给它转义成对应的sql语句来操作数据库

- 官网:
- prisma.io

> prisma的使用
- 1. npm init -y
- 2. 下载: npm i prisma -D

- 3. 初始化: prisma
- npx prisma init -h -- 查看可以用什么命令

- 4. 
- 选择使用什么数据库:  -- *我们选的这个 然后下面再 .env 文件里面配置的用户名和密码*
- npx prisma init --datasource-provider mysql

- 连接具体的数据库:  -- 效果和上面一样
- npx prisma init --url mysql://root:123456@localhost:3306/newDB
<!-- 
  npx prisma init --url mysql://root:密码@localhost:3306/数据库名
 -->

> 项目结构

  | - node_modules
  | - prisma
    - schema.prisma   // 数据库模型 配置文件
  - .env
  

> schema.prisma
- 我们创建数据库模型都是在这个文件下创建的
- 大概的意思就是创建 对象 和 表 的映射 
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

> 创建用户模型 (创建表)
- 这是不是相当于我们创建了一张user表 添加字段名 和 约束 别名
```prisma
model user {
  id String @id @unique @default(uuid())
  // @map("user_name") 创建字段别名
  userName String @unique @map("user_name")
  password String @default("")
  nickName String @default("") @map("nick_name")
  address String @default("")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // 给表起一个别名
  @@map("users")

  // 关联两个表
  post post[]
}

model post {
  id String @id @unique @default(uuid())
  title String @default("")
  desc String @default("")
  content String @default("")

  // 建立关联关系 fields: 当前表(模型)中的字段 references: 关联表中的数据 user? 代表可选 没有也不报错
  author user? @relation(fields: [authorId], references: [id])

  authorId String @default("") @map("author_id")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("posts")
}
```

- 上面我们写了一个 model 现在我们要将写好的东西生成成数据库中的表
- 需要使用如下的命令


> 配置 .env 文件
- 也就是配置 mysql 的数据库连接信息
```js
DATABASE_URL="mysql://root:123456@localhost:3306/prismaTest"
```

---

> npx prisma db push
- 将创建好的 model 生成对应的表
- 输入完这个命令后 mysql数据库中就多了一个 prismaTest 数据库
- 同时 里面 多了一张 users 表

- 当我们修改了表中的信息的时候 重新执行这条命令就是 *更新表结构*

---

> npx prisma studio
- prisma内置的 管理表的 工具 也就是说我们查看表的信息 并不局限于navicate
- 效果就是开启了一个浏览器版的 表的ui界面

---

### 连接数据库

  | - node_modules
  | - utils
    - db.js

- db.js 是用来连接数据库的
```js
const {prismaClient, PrismaClient} = require("@prisma/client")

// 创建prisma实例 它会自动读取我们的配置文件 帮我们连接数据库
const db = new PrismaClient()

// promise形式的方法 代表连接的意思
// 这里我们直接抛出一个异常就可以 剩下的什么也不用做
db.$connect().catch( err => console.log(err) )

module.exports = db
```

> 演示操作表
- 向 users 表中 添加一条记录
- 获取 users 表中的 一条记录

- 创建一个 users.js 文件 写下面的内容 然后 执行 node users.js
```js
const db = require("./utils/db")

// 创建一个用户
const createUser = async () => {
  try {
    // 向 users 表中添加数据吧 user 是因为 model 指定的就是 user
    await db.user.create({
      // data代表数据 也意味着向表中添加数据需要借助这个配置项
      data: {
        userName: "sam",
        password: "111111",
        nickName: "小白"
      }
    })

    console.log("向users表中添加了一条数据")
  } catch (err) {
    console.log(err)
  }
}

// createUser()


// 获取一条记录
const getUser = async () => {

  // findMany()查找所有记录吧
  const user = await db.user.findMany({
    // 没指定条件 获取的是所有的记录
    where: {

    }
  })
  console.log(user)
}

console.log(getUser())
```

---

### 表关联
- 也就表之间的关系 比如一对多 多对一等等
- 建立表之间的关联关系