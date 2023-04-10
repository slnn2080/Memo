# 项目教学网址:
```
https://www.bilibili.com/video/BV1dS4y1y7vd?p=64&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
```

<br><br>

# 收集知识点:
这个部分有ts在实战中的用法 和 express 中如何使用 ts

<br>

## 安装 echarts
版本4 和 版本5 有很多兼容性的问题 
```
npm i echarts -S

版本: 5.3.1
```

<br>

### 地图的网址:
```
https://www.isqqw.com/homepage

https://www.isqqw.com/viewer?id=15158
```

<br>

## node环境下是没有办法运行 Ts 的
我们在node环境下 要想运行ts文件 以前的做法是
1. tsc xxx.ts 将其编译为 js 文件
2. node xxx.js 运行 js 文件

这样太麻烦了 所以我们安装下 ts-node 来直接运行 ts 文件

<br>

### **安装:**  
```js
// ts的编译器 可以直接运行 ts 文件
npm i ts-node -g

// 生成 package.json
npm init -y

// 安装 node.js 的声明文件
npm i @types/node -D

// 安装express
npm i express -S

// 安装 express 的声明文件
npm i @types/express -D

// 安装 axios
npm i axios -S
```

<br>

## 后端逻辑:
```
- index.ts
```

**注意 express 的类型**
```ts
// 导入 express 的类型
import express, {
  Express, 
  Router,
  Request,
  Response
} from "express"

// app的类型
const app:Express = express()

// 处理跨域
app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Orgin", "*")
  next()
})

// 创建 router
const router:Router = express.Router()

// 注册
app.use("/api", router)


// 接口
router.get("/list", async (req: Request, res: Response) => {

  const result = await axios.post("https://api...")

  res.json({
    ...result.data.data
  })
})

app.listen(3000, () => {
  console.log("success server 3000")
})
```

```js
// package.json
"script": {
  "dev": "ts-node index.ts"
}
``` 

<br>

## 前端逻辑:

### **安装项目:**
```
npm init vue@latest
```

<br>

### **根据系统主题色 切换页面的配色:**
这是根据 下面的文件的 css 文件中进行设置的
```
| - src
  | - style.css
```

```css
/* 定义变量来切换颜色 */
@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

<br>

### **初始化项目时候的样式:**
```css
* {
  padding: 0;
  margin: 0;
}

html, body, #app {
  height: 100%;
}
```

<br>

### **css背景图片的问题:**
我们没有办法使用 background-image 指定背景图片 因为项目编译后是没有 assets 文件夹的

所以背景图片的问题 我们可以使用 js 来引入

```js
import bg from "./assets/1.jpg"
<div :style="{background: 'url(${bg})'}">
```

<br>

### **封装 axios**
```js
import axios from "axios"

const server = axios.create({
  baseURL: "http://localhost:3000"
})

export const getDataList = () => server.get("/api/list").then( res => res.data)
```

<br>

### **我们在 pinia 中请求数据**

**json2ts插件:**  
vscode 插件 json2ts 用于生成ts类型

先把json数据放到 test.json 文件中  
然后选中数据

然后在文件的最下方使用 ctrl + alt + v 生成数据对应的类型

或者

ctrl + shift + alt + s


```js
import {defineStore} from "pinia"
import {getDataList} from "../server"

import type {RootObject} from "./type"

export default useCounterStore = defineStore("counter", {
  state: () => ({

    // 使用 json2ts 定义后台的数据类型给list使用
    list: <RootObject>{}
  }),
  actions: {
    async getList() {
      const res = await getDataList()

      // 将请求回来的数据 赋值给 state 中的list
      this.list = res 
    }
  }
})
```

<br>

### **组件中引入 store**
```js
import {useCounterStore} from "./store"
const store = useCounterStore()

// 调用store中获取数据的方法 注意 该方法是异步的 所以我们要等它走完 才能拿到数据
onMounted(async () => {

  // 这个方法并没有返回 promsie 也可以用 await 这么操作么
  await store.getList()

  // 后面就可以使用 store 中 state 里面的数据了 


  // 当我们输出数据的时候会报错 说可能是{} 因为我们state中定义的默认值就是 {} 这说明我们 state 中的list没有类型
  connsole.log(store.list.diseaseh55helf)
})

```

<br>

### **项目中引入 echarts**
```js
import {useCounterStore} from "./store"
import {onMounted} from "vue"

// 引入 地图
import "./assets/china"


// echarts 4 的引入方式
import echarts from "echarts"

// echarts 5 的引入方式, 将它所有的API导出一个对象
import * as echarts from "echarts"


const store = useCounterStore()


onMounted(async () => {

  // 获取数据 该方法是异步的 所以我们要等它执行完
  await store.getList()

  // 下面我们就可以使用store里面的数据了

  // 拿到所有的省份
  const city = store.list.diseaseh55helf.areaTree[0].children




  // 初始化 echarts
  // 选择器获取的元素可能为空 所以要断言下
  let charts = echarts.init(document.querySelector("#china") as HTMLElement) 


  // echarts 的配置
  charts.setOption({

    // 地图的背景
    backgroundColor: "black",

    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        normal: {
          areaColor: {
            type: "linear-gradient",
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#152E6E", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0673AD", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          shadowColor: "#0f5d9d",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
        },
        emphasis: {
          areaColor: "#0f5d9d",
        },
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            normal: {
              opacity: 0,
              label: {
                show: false,
                color: "#009cc9",
              },
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        selectedMode: "multiple",
        mapType: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },

        label: {
          // 地图上显示每个省市的名称
          show: true,
          color: "#FFFFFF",
          // 字体大小
          fontSize: 16,
        },
        itemStyle: {
          normal: {
            areaColor: "#0c3653",
            borderColor: "#1cccff",
            borderWidth: 1.8,
          },
          emphasis: {
            areaColor: "#56b1da",
            label: {
              show: false,
              color: "#fff",
            },
          },
        },
        data: data,
      },
      {
          name: 'Top 5',
          type: 'scatter',
          coordinateSystem: 'geo',
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
          // symbolSize: [30,120],
          // symbolOffset:[0, '-40%'] ,
          label: {
              normal: {
                  show: false,
              }
          },
          itemStyle: {
              normal: {
                  color: '#D8BC37', //标志颜色
              }
          },
          data: data,
          showEffectOn: 'render',
          rippleEffect: {
              brushType: 'stroke'
          },
          hoverAnimation: true,
          zlevel: 1
      },
    ],
  })
})
```
