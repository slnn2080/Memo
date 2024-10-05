## Accordion.js

### 效果:
我们点击标题 就能打开内容的区域 比如我们页面上有4个Q 那每一个Q就算是一个item

我们看看每一个Q的html结构:
```s
- div data-module="accordion"       -- *一个item的容器里面有 标题区域 和 收起来的文本区域*
    - div data-accordion="toggle"   -- *标题区域 该区域也相当于按钮 点击可展开下面的文本区域*
    - div data-accordion="content"  -- *被隐藏起来的文本区域*

- div data-module="accordion" 上在打开的时候会添加 is-open 样式该类为将原本的内容的透明度有0-1
- div data-accordion="content" 在div data-module="accordion"添加上is-open后 会有maxHeight的高度变化
```


```js
import ResizeManage from "../util/ResizeManage"

export default class Accordion {

  constructor(isDefaultOpen = false) {
    // 是否默认打开 默认值为false
    this.isDefaultOpen = isDefaultOpen
    this.getParam()
    this.init()
  }

  // 获取 所有的 折叠item项 相当于获取每一个Q
  getParam() {
    this.accordion = document.querySelectorAll("[data-module='accordion']")
    // 设置 折叠起来的内容区的高度 默认是0
    this.contentInit = 0
  }


  init() {
    this.resizeManage = new ResizeManage(835)
    this.bindEvent()
  }


  bindEvent() {
    // 将获取的所有Q伪数组进行遍历
    Array.prototype.forEach.call(this.accordion, (elem) => {

      // 得到 标题区域 和 内容区域
      const acToggle = elem.querySelector("[data-accordion=\"toggle\"]")
      const content = elem.querySelector("[data-accordion=\"content\"]")

      // 设置内容区域的高度 初始值为0
      let contentHeight = this.contentInit


      // 展开 合并 高度
      const toggleHeight = () => {
        // 内容区的高度没有写死 是最大高度 如果内容区和标题区域的容器wrap有is-open 那么就设置告诉为contentInit 没有的话contentHeight
        content.style.maxHeight = acToggle.parentNode.classList.contains("is-open") ? `${this.contentInit}px` : contentHeight

        // 给wrap添加is-open
        acToggle.parentNode.classList.toggle("is-open")
      }

      // 点击时候的时候
      const active = () => {
        const contentPosition = content.getBoundingClientRect()
        // 先看看内容区的告诉是不是 不等于0 如果不等于0的话 就设置内容区的高度为获取的高度
        contentHeight = contentPosition.height != 0 ? `${contentPosition.height}px` : "none"

        // 设置内容区的最大高度
        content.style.maxHeight = `${this.contentInit}px`

        // init
        acToggle.parentNode.classList.remove("is-open")

        // clickイベント
        acToggle.addEventListener("click", toggleHeight)

        // デフォルトOPEN
        if (this.isDefaultOpen) {
          toggleHeight()
        }
      }

      const inactive = () => {
        content.style.maxHeight = "none"
        acToggle.parentNode.classList.add("is-open")
        acToggle.removeEventListener("click", toggleHeight)
      }

      const onResize = (isMobile) => {
        // data-accordion-size 属性が指定されている場合、SPのみ/PCのみで実行する
        if (!isMobile && elem.dataset.accordionSize === "sp") {
          inactive()
        } else if (isMobile && elem.dataset.accordionSize === "pc") {
          inactive()
        } else {
          active()
        }
      }

      // 読み込み時
      onResize(this.resizeManage.isMobile)

      // リサイズ時 リセット
      this.resizeManage.on("resizeManage", () => {
        onResize(this.resizeManage.isMobile)
      })
    })
  }
}

```


### Carousel.js
- 里面包含了 swiper
- swiper要想滚动 比如有指定一个swiper的容器
- 该容器里面有滚动的图片区域 和 导航点等区域

- 回顾下 swiper 的基本结构
```html
<!-- 外层容器 类名: swiper-container -->
<div class="swiper-container">

  <!-- 滚动区域 类名: swiper-wrapper -->
  <div class="swiper-wrapper">

    <!-- item 类名: swiper-slide -->
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>

  <!-- 如果需要分页器 -->
  <div class="swiper-pagination"></div>
  
  <!-- 如果需要导航按钮 -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  
  <!-- 如果需要滚动条 -->
  <div class="swiper-scrollbar"></div>
</div>
```

- 要点:
- 1. https://kinto-jp.com/kinto_one/selection/ktsyaris/
- 在上面的网址中 公司将导航点做成了图片

- 2. 公司项目中并没有上来给容器绑定 swiper 需要的各种类名 而是通过 [data-*] 属性选择器 选择了目标都 通过js部分添加类名

```js
import Swiper from "swiper"
/**
 * カルーセル(Swiper)設定
 */
export default class Carousel {
  /**
   * @classdesc カルーセル設定
   */
  constructor() {
    this.init()
  }

  /**
   * Swiper対象要素を設定
   */
  init() {

    // 通过属性选择器 找的外层容器 swiper-container
    const $container = document.querySelector("[data-module='carousel']")

    // 根据外层容器 找到的 滚动区域的容器 swiper-wrapper
    const $list = $container.querySelector("[data-carousel='list']")

    // 找到items集合
    const $item = $list.querySelectorAll("li")

    // 外围容器身上有 data-alt-prefix 和 data-alt-prefix-base 该部分的作用是给导航点图片 动态绑定alt属性
    // 看看altPrefix的值是不是空 如果不是空就用传入的值 如果是空就用 ""
    const $prefix = $container.dataset.altPrefix !== "undefined" ? $container.dataset.altPrefix: ""
    const $prefixBase = $container.dataset.altPrefixBase !== "undefined" ? $container.dataset.altPrefixBase: ""


    // 给外围容器添加上 swiper-container
    $container.classList.add("swiper-container")

    // 给滚动区域添加上  swiper-wrapper
    $list.classList.add("swiper-wrapper")

    // 给里面的每一个item添加 swiper-slide
    Array.prototype.forEach.call($item, (el) => {
      el.classList.add("swiper-slide")
    })


    // 导航点(把导航点做成图片了)区域是ul -- ul(data-carousel="nav" data-thumb-path=`${img_path}pic_carousel_0`)
    // ul 中的 li 不是写入html结构中的 而是js动态创建的

    // 我们获取到这个ul 取到它身上的 thumbPath 也就是 导航点图片的路径
    const $thumbPath = document.querySelector("[data-carousel='nav']").dataset["thumbPath"]


    // 轮播图的每一个item项是li li当中包含了两个部分 图片区域 和 图片上的文字caption区域
    // $item 就是每一个轮播项
    const thumbTextArray = Array.prototype.map.call($item, (d) => {

      // 我们拿到 li -> 文字区域中的指定 DOM节点 querySelector(".text") 然后将它们身上的thumbtext 放到一个数组中
      const text = d.querySelector(".text")
      return text.dataset["thumbtext"]
    })


    new Swiper($container, {
      centeredSlides: true,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: false,
      },
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
      },

      breakpoints: {
        750: {
          pagination: {
            // 定义pagination 分页器内当前活动块的指示小点的类名。
            bulletActiveClass: "_active",

            // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
            clickable: true,

            // 分页器容器的css选择器或HTML标签。分页器等组件可以置于container之外，不同Swiper的组件应该有所区分，如#pagination1，#pagination2。
            // 指定分页器的容器
            el: "[data-carousel='nav']",

            // 渲染分页器小点。这个参数允许完全自定义分页器的指示点。
            // 接受指示点索引和指示点类名作为参数。 className是swiper自己对小圆点添加的特有样式 swiper-pagination-bullet _active
            renderBullet: (index, className) => {
              const imgPath = $thumbPath + (index + 1) + "_thumb"
              const altPrefix = thumbTextArray[index] !== "ベースモデル" ? $prefix: $prefixBase
              return `
                <li class="${className}"><div class="thumb-wrap">
                  <picture>
                    <source srcset="${imgPath}.jpg 1x, ${imgPath}@2x.jpg 2x" media="(min-width: 835px)">
                    <img src="${imgPath}.jpg" alt="${altPrefix} - ${thumbTextArray[index]} -">
                  </picture>
                  <div class="thumb-absolute-grad">
                    <p class="thumb-absolute-text">${thumbTextArray[index]}</p>
                  </div>
                  </div>
                </li>
              `
            },
          },
        }
      },
      navigation: {
        nextEl: "[data-carousel='next']",
        prevEl: "[data-carousel='prev']",
      },
      slidesPerView: 1,
      spaceBetween: 0,
      on: {
        // 事件函数， 初始化后执行。
        init: () => {
          const swipeContainer = document.querySelector(".p-selection__cardetail__carousel__inner")
          swipeContainer.classList.add("is-show")
        }
      }
    })
  }
}
```



### Modal
- 这个是添加遮罩层 并有关闭的功能

- 核心思想:
- 就是将定义在html页面结构中的内容(iframe)复制一份 插入到遮罩层的div中控制播放关闭

- 样式问题:
- 这个部分关于遮罩层的样式 和 关闭按钮的样式 要放在app.vue里面 也就是最上层的组件中


- modal区域的整体结构:

- li(data-module="animation", data-anime="movie")
  - div(data-module="modal")
    - div(data-modal="toggle")
      - h3
      - div

        - picture
        - div(data-modal="content")
          - div
            - iframe
        - div

```js
export default class Modal {

  constructor() {
    this.getParam();
    this.init();
  }


  getParam() {
    // 获取 body
    this.body = document.getElementsByTagName("body")[0];
    console.log("body", body)

    // 获取有标记为 [data-module="modal"] 的元素
    this.modal = document.querySelectorAll('[data-module="modal"]');

    // 将所有的 [data-module="modal"] 的元素 变成一个数组
    this.modalArray = [].slice.call(this.modal);

    // 创建遮罩层
    this.overlay = `<div class="m-modal__bg" data-modal="overlay"></div>`;

    // 创建关闭按钮
    this.closeBtn = `<p class="m-modal__btn--close" data-modal="close">CLOSE</p>`;
  }


  init() {
    this.bindEvent();
    this.closeEvent();
  }

  /**
   * @description 按下变成toggle的部分，显示模态内容。 0.1秒后overlay被insert
   */
  bindEvent() {
    // 遍历 modal 数组
    this.modalArray.forEach((elem) => {
      // 获取每一个 modal 元素对象下的 [data-modal="toggle"] 元素
      const toggleArray = [].slice.call(elem.querySelectorAll('[data-modal="toggle"]'));

      // 获取 每一个modal元素对象下的 [data-modal="content"] 这个content中就是一个 iframe 
      const content = elem.querySelector('[data-modal="content"]');

      // 遍历每一个 [data-modal="toggle"] 元素 给它添加点击事件
      toggleArray.forEach((toggle) => {
        toggle.addEventListener("click", (event) => {


          this.body.style.overflow = "hidden";
          // 将遮罩层添加到 body元素内部的最后一个子节点之后。
          this.body.insertAdjacentHTML("beforeend", this.overlay);

          // 動的に追加した要素にクラスを付与するためここで定数を定義
          // 选中插入的遮罩层
          const appendModalBg = document.querySelector('[data-modal="overlay"]');

          // モーダルの中身を複製
          // 将 [data-modal="content"] 的内容复制一份
          const contentClone = content.cloneNode(true);

          // optionを受け渡し 传递选项
          const opt = event.target.getAttribute("data-modal-target");
          // 如果有 data-modal-target 对应的值 就将该值 给 复制的内容
          if (opt !== undefined) {
            contentClone.setAttribute("data-modal-target", opt);
          }

          // 将复制的内容插入到 遮罩层里面
          appendModalBg.insertAdjacentElement("beforeend", contentClone);

          // 0.1秒后给遮罩层添加 is-show 样式
          setTimeout(() => {
            appendModalBg.classList.add("is-show");
          }, 100);

          // 在body内部的最后一个子节点之后。插入closeBtn
          this.body.insertAdjacentHTML("beforeend", this.closeBtn);
        });
      })
    });
  }

  /**
   * @description クローズボタンを押下し、コンテンツの非表示、overlayの削除
   * 点击关闭按钮后 关闭正在显示的内容 删除遮罩层
   */
  closeEvent() {
    document.addEventListener("click", (event) => {
      // 获取遮罩层和关闭按钮
      const appendModalBg = document.querySelector('[data-modal="overlay"]');
      const appendModalBtn = document.querySelector('[data-modal="close"]');

      // 如果我们点击的目标 身上能取到 close 或者 身上能取到 遮罩层
      if ((event.target && event.target.dataset.modal === "close") || (event.target && event.target.dataset.modal === "overlay")) {
        this.body.style.overflow = "";
        appendModalBg.classList.remove("is-show");
        setTimeout(() => {
          appendModalBg.parentNode.removeChild(appendModalBg);
        }, 400);
        appendModalBtn.parentNode.removeChild(appendModalBtn);
      }
    });
  }
}

```


### Include.js
- 场景:
- http://localhost:3000/terms/index/

- 这个页面是一个 index 页 页面上有很多的 <a> 连接 点击后跳转过去 到另一个页面
- <a>连接的模式是:
```pug
  a(href='/terms/toyota/') 2021年12月14日〜 初期費用フリープラン
  a(href='/terms/toyota/cancel_free/') 2021年12月14日〜 解約金フリープラン
  a(href='/terms/toyota/?archive=211021') 2021年10月21日～2021年12月13日
  a(href='/terms/toyota/?archive=210408') 2021年4月8日～2021年10月20日
```

- 我们观察上面的 <a>连接 上面都会跳转到 toyota/ index.pug

- 上面是根据 连接后面的参数 ? 来决定在页面上展示什么内容 也就是说
```pug
  模板内容

  block content-block
  section.l-cnt__full
    +m-hero-heading-caption('KINTO ONE（トヨタ）初期費用フリープラン利用規約', 'TERMS AND CONDITIONS')

  section.l-cnt__main
    p.m-txt__normal--right.u-show--pc
      button.p-terms__btn--print(onclick='window.print();')
        | 印刷する


    #js-incTarget(data-incpath='/inc/terms/toyota/')
```

- #js-incTarget:
- 就是一个 动态内容 
- 首先页面加载 js部分先会读取参数部分 解析参数 利用基础路径 和 解析的参数拼接成一个 新的url

- 然后利用 axios 对这个路径发起请求 
- 因为 /inc/terms/toyota/211021.html
- 所以会向 这个路径 请求资源 并把内容 塞进 #js-incTarget 部分
  


```js
import "core-js/modules/es.promise"
import axios from "axios"
import Scroll from "../modules/Scroll"

export default class Include {

  constructor() {
    this.getParam()
    this.eventBind()
  }


  getParam() {
    // 获取 我们要将axios读取的内容塞进哪里 也就是 目的地
    this.el = document.getElementById("js-incTarget")
  }


  eventBind() {
    // 将 目的地 赋值给 loadTarget
    const $loadTarget = this.el


    if ($loadTarget) {
      // 读取 目的地 身上的 data-incpath 的值
      let incPath = $loadTarget.dataset["incpath"]
      console.log("incPath: -- ", incPath)    // /inc/terms/toyota/

      console.log("search: -- ", location.search)  // ?archive=211021

      // 如果我们是点击目录页 进到的这个页面 url 后面会有参数 这里对参数进行处理
      const urlParam = location.search.substring(1).split("&")
      console.log("urlParam: -- ", urlParam)  // ['archive=211021']


      // 创建错误时候的提示内容
      const errorMsg = document.createElement("p")
      // const errorText = document.createTextNode("指定されたデータが存在しません")
      errorMsg.classList.add("m-txt__normal")
      errorMsg.innerText = "指定されたデータが存在しません"


      // 如果能读取到 目的地身上的 incpath 还有参数的情况下
      if (incPath) {
        if (urlParam) {
          
          // 这个数组会装["a": "b"] 这样结构的东西
          const paramDataArray = []

          // 对 ['archive', '211021'] 参数数组进行加工
          for (let i = 0; i < urlParam.length; i++) {
            const paramData = urlParam[i].split("=")
            console.log("paramData: -- ", paramData)  // ['archive', '211021']

            // [archive: '211021']
            paramDataArray[paramData[0]] = paramData[1]
            console.log("paramDataArray: -- ", paramDataArray)    // [archive: '211021']

            // 如果 参数数组的key为archive 拼接路径
            if (paramData[0] == "archive") {
              incPath += paramData[1] + ".html"   // /inc/terms/toyota/211021.html
              break
            }
          }
        }

        // 上面的操作就是为了得到 路径 这里发起请求将数据请求回来后 塞进目的地
        try {
          axios.get(incPath).then((response) => {
            console.log("response.data: -- ", response.data)
            $loadTarget.innerHTML = response.data
            new Scroll()
          })
        } catch (error) {
          $loadTarget.appendChild(errorMsg)
        }
      } else {
        // data-incpath属性または属性値がない場合はエラー
        $loadTarget.appendChild(errorMsg)
      }
    }
  }
}

```


###  TabChange.js
- 下面是以 BACKLOG-1128 举例

> 要点:
- 下面的内容分别代表了什么样的含义:
- data-module="tabToggle"
    tab按钮 每一个tab按钮上都绑定了  data-module="tabToggle"

- data-tab="private"
    ?

- data-module="tabContent"
    内容区域



```js
export default class TabChange {
  constructor() {
    this.init()
  }

  
  init() {
    this.initTabActive()
    this.eventBind()
  }

  /**
   * @description
   * queryがあった場合かつ。data-tabという属性がある場合、ロード時にタブを切り替える
   */

  initTabActive() {
    // 比如 我们的url为 http://localhost:3000/kinto_one/payment/?corporation#
    const activateQuery = location.search.substr(1)

    console.log("location.search", location.search)   // ?corporation
    console.log("activateQuery", activateQuery)       // corporation

    // 获取 data-属性名部分为 data-tab的元素 data-tab="corporation | private"  backlog-1128中它也是内容区
    const tabQuery = [...document.querySelectorAll("[data-tab]")]

    // 如果能找到 data-tab的元素 的元素的时候 我们再进行接下来的操作 
    if (tabQuery) {
      // 获取页面上的 tab按钮
      const tabToggle = [...document.querySelectorAll("[data-module=\"tabToggle\"]")]

      // 给每一个tab按钮 添加 显示 和 隐藏的样式
      tabToggle.forEach(toggle => {
        toggle.classList.remove("is-active")
        if (toggle.dataset.id === activateQuery) {
          toggle.classList.add("is-active")
        }
      })

      // コンテンツをつけかえ
      /*
        [data-module=tabContent] {
          display: none;
          opacity: 0;
        }

        内容区默认是这样的 只有加上is-active 才会显示
      */
      tabQuery.forEach(element => {
        element.classList.remove("is-active")
        if (element.dataset.tab === activateQuery) {
          element.classList.add("is-active")
        }
      })
    }
  }

  /**
   * @description
   * イベントの実行
   */
  eventBind() {
    // 获取 tab按钮区
    const tabTriggers = document.querySelectorAll("[data-module=\"tabToggle\"]")
    // 获取内容区
    const tabTargets = document.querySelectorAll("[data-module=\"tabContent\"]")

    // 给每一个tab按钮绑定点击事件
    for (let i = 0; i < tabTriggers.length; i++) {
      tabTriggers[i].addEventListener("click", (e) => {
        const currentMenu = e.currentTarget

        // 获取 tab按钮身上的 data-id 它指向内容区
        const currentContent = document.getElementById(currentMenu.dataset.id)
        
        for (let i = 0; i < tabTriggers.length; i++) {
          tabTriggers[i].classList.remove("is-active")
        }
        currentMenu.classList.add("is-active")

        for (let i = 0; i < tabTargets.length; i++) {
          tabTargets[i].classList.remove("is-active")
        }
        if (currentContent !== null) {
          currentContent.classList.add("is-active")
        }
      })
    }
  }

}

```