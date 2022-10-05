### Gsap
它是第一个js动画库

<br>

### 网址:
```
https://greensock.com/docs/v3/GSAP/Tween
```

<br>

### 特效
我们点击logo会跳到主页 右侧有导航点 每一个导航点都是一个效果

<br>

### 安装:
```
npm i  gsap -S
```

<br>

### 引入:
我们在组件中引入 或者 main.ts 中引入都可以
```
import gsap from "gsap"
```

<br>

### 使用:

**<font color="#C2185B">gsap.set(el, {配置对象})</font>**  
过渡开始点的设置  
配置对象中可以写css的属性

<br>

**<font color="#C2185B">gsap.to(el, {配置对象})</font>**  
过渡结束点的设置  
```js
// transition组件中的回调 
const beforeEnter = (el) => {

  // 过渡开始时候的设置
  gsap.set(el, {
    // 开始的时候默认为0
    width: 0,
    height: 0
  })

}



// 写在了过渡过程的函数中 因为有done函数
const enter = (el:Element, done:gsap.Callback) => {

  // 过渡结束时候的设置
  gsap.to(el, {
    width: 200,
    height: 200,

    // 过渡完成后的回调函数 当过渡完成后才会进入下一个环节
    onComplete: done
  })

}

const afterEnter = (el:Element) => {

  // 离开的时候再让它变为0
  gsap.to(el, {
    width: 0,
    height: 0,
  })

}
```