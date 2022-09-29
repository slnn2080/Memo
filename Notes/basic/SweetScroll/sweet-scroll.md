### Sweet-scroll
- https://github.com/wadackel/sweet-scroll

- 安装:
- npm install sweet-scroll

- 使用:
- import SweetScroll from 'sweet-scroll';

- 当页面结构加载完后 创建 scroller 实例
```js
document.addEventListener(
  'DOMContentLoaded',
  () => {
    const scroller = new SweetScroll({
      /* some options */
    });
  },
  false,
);

```

- 配置：
- 默认情况下应用以下选项。它可以根据需要定制。
```js
{
  // 目标 让谁滚动 值为 css选择器
  trigger: '[data-scroll]', 
  
  // 固定标头的选择器或元素 值为 css选择器
  header: '[data-scroll-header]', 
  
  // 动画的持续时间
  duration: 1000,
  
  // 动画的缓动模式
  easing: 'easeOutQuint', 
  
  // 只要要偏移位置的值 px
  offset: 0,
  
  // 是否开启垂直滚动
  vertical: true,
  
  // 是否开启水平滚动
  horizontal: false,
  
  // 当滚动或触摸事件的时候停止滚动
  cancellable: true,
  
  // 在滚动后更新URL哈希
  updateURL: false,
  
  // 取消容器元素的单击事件
  preventDefault: true,
  
  // 防止在冒泡阶段进一步传播容器元素单击事件
  stopPropagation: true,
  

  // Callbacks
  before: null,
  after: null,
  cancel: null,
  complete: null,
  step: null,
}
```


> 项目中的用法
- 我们在项目中都会使用 a标签 锚点的方式 移动到对应的位置上
- 下面就是给a标签绑定的滚动事件

  trigger: "a[href^='#']",
  <a class="m-nav__anchor_link" href="#web"></a>


```js
// app.js
window.addEventListener("load", () => {
  new Scroll();
  new EnviromentLinkChange();
});


// util.js
import SweetScroll from "sweet-scroll";

// 创建类的目的就是 当new该类的时候 页面上的元素就是自动的添加一些功能
export default class Scroll {
  constructor() {
    this.eventBind();
  }

  eventBind() {
    new SweetScroll({
      trigger: "a[href^='#']",
      offset: -110,
    });
  }
}

```