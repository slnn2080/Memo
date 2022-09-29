### 案例分析:

### 网页都是一个个div组成的 所以先创建分区的div 最后再细致到了面 不要让内容直接暴露在全局 看起来很乱

> 创建外层容器
- 目的 产生视觉差效果 给外层容器设置背景图片 fixed
- 可能发生的问题: 
- 设置完后看不到图片 是因为wrap里面还没有内容
- 其它块在图片上面移动 是因为结构放在里wrap容器里面
<!-- 
    创建最外层容器
    <section id='wrap'></section>
 -->

### grid布局
- 优势: 解决了内容居中的问题 代码简介高效 弹性布局更灵活
- 解析:
- 浏览简历内容时都是在中间区域显示的(在版心显示的)
<!-- 
    // 设置两行一列的布局 效果就是内容随着高度的变化始终保持垂直居中
    display:grid;
    grid-template-rows: 1fr 50px;
    // 让banner的子元素垂直居中对齐
    align-items: center;
 -->


### 打字效果 typed库
- 如果在网页中有比较长的内容 没有办法展现出来 这个时候我们就可以通过打字的效果逐一展现

- 打字效果是通过typed.js库来实现的
> 参数
- id: 在什么位置显示
- option: 是一个对象

new Typed(打字内容所在的id, {

        <!-- 需要打的内容放到这里 -->
        strings: ['内容1', '内容1', '内容1'],
        typeSpeed: 打字速度,
        startDelay: 每次打字开始前的时间间隔的,
        loop: 是否循环,
        loopCount: 循环次数 整数值
    });
<!-- 
    // 引入这个库
    <script src="js/typed.js"></script>

    new Typed(tag, {
        strings: ['资深非著名营销/运营总监&nbsp;', '从基础岗位做起&nbsp;', '这十年练就了十八般武艺&nbsp; '],
        typeSpeed: 100,
        startDelay: 300,
        loop: true,
        loopCount: Infinity
    });
 -->

### 箭头的意义
- 通常让观众在第一时间能得到关键的信息 我们在策划网站的时候会将核心的内容占满首屏 也会有弊端 就是让访客误认为信息就是这么多 不继续浏览 为了避免这种情况的发生 我们要设计一个 跳动的箭头

> 引入的图标字体后 还可以对图标字体设置样式
<!-- 
    <span class='iconfont icon-xiangxia green'>

    .iconfont {

    }
 -->

### 动画效果的目的
- 标题的部分 用来产生吸睛的效果

### 筛选功能 isotope库
- 能筛选能排序的神奇布局
- 先把基本的结构搭建出来 然后再引入isotope库

- https://isotope.metafizzy.co/

-首先找到Getting started的部分
- 在head部分引入 js文件 需要注意的是这个引入必须要放在jQ文件的下面
<!-- 
    <script src='./js/jquery.js'></script>
    <script src='./js/isotope.js'></script>
 -->
> 分为商品区域 和 按钮区域

> html结构的准备工作 先创建商品区域
- 商品必须有自己的格式
- 1 先创建一个grid div容器
- 2 容器内容的图片img 也要用grid-item div包裹起来
<!-- 
    <div class="grid">
        <div class="grid-item"><img src="" alt=""></div>
    </div>
 -->
<!-- 
    <div class="grid">
        <div class="grid-item">...</div>
        <div class="grid-item grid-item--width2">...</div>
        <div class="grid-item">...</div>
        ...
    </div> 


    <div class="grid">
        <div class="grid-item pinpai"><img src="images/item-1.jpg" alt=""></div>
        <div class="grid-item qudao"><img src="images/item-2.jpg" alt=""></div>
        <div class="grid-item shuju"><img src="images/item-3.jpg" alt=""></div>
        <div class="grid-item qudao"><img src="images/item-4.jpg" alt=""></div>
        <div class="grid-item shuju"><img src="images/item-5.jpg" alt=""></div>
        <div class="grid-item pinpai"><img src="images/item-6.jpg" alt=""></div>
    </div>
-->

> 设置商品区域每一个图片包裹器div 和 img的css样式, 属于css的准备工作
- 设置商品区域的布局 每个item占多少
- 设置完后 一个一行纵向排列 就到此结束
<!-- 
    .grid-item { width: 25%; }
    .grid-item--width2 { width: 50%; }


    /* 筛选 -- 商品区域的样式 */
    /* 商品区域的包裹器 */
    .grid {
        width:100%;
        background:rgba(0,0,0,.2);
        margin-top:40px;
    }

    /* 设置每一个img的包裹器 div */
    .grid .grid-item {
        width:33.333%;
        padding:0 20px 20px 0;
    }

    /* 设置图片的宽度 */
    .grid .grid-item img{
        width:100%;
    }
 -->

> 商品信息的css部分 和 html部分 结束后 设置js部分 将这段代码复制到html中
<!-- 
    // 将我们的grid div 也就是将图片组容器按照isotype的布局 来显示
    let $grid = $('.grid').isotope({
        // 筛选什么内容 将它设置为grid-item里面的内容
        itemSelector: '.grid-item',

        // 图片的排序方式 里面的内容按照行来排列 一行内容铺满之后换行 fitcolumns 是瀑布流的效果
        layoutMode: 'fitRows'
    });
 -->

> 商品区域结束后 我们开始按钮区域 也就是点击实现筛选功能
- 筛选功能需要根据 商品区域 img 的 div包裹器 中的 名字还进行筛选 所以我们在
- div class="grid-item" 的后面 添加名字 这里我们随机填写

- 网页中可以点击Filtering 看看看不懂的东西
<!-- 
    // 给图片添加 筛选的关键词 也就是grid-item pinpai 这个部分 名字随机设置
    <div class="grid">
        <div class="element-item transition metal">...</div>
        <div class="element-item post-transition metal">...</div>
        <div class="element-item alkali metal">...</div>
        <div class="element-item transition metal">...</div>
        <div class="element-item lanthanoid metal inner-transition">...</div>
        <div class="element-item halogen nonmetal">...</div>
        <div class="element-item alkaline-earth metal">...</div>
        ...
    </div>


    <div class="grid">
        <div class="grid-item pinpai"><img src="images/item-1.jpg" alt=""></div>
        <div class="grid-item qudao"><img src="images/item-2.jpg" alt=""></div>
        <div class="grid-item shuju"><img src="images/item-3.jpg" alt=""></div>
        <div class="grid-item qudao"><img src="images/item-4.jpg" alt=""></div>
        <div class="grid-item shuju"><img src="images/item-5.jpg" alt=""></div>
        <div class="grid-item pinpai"><img src="images/item-6.jpg" alt=""></div>
    </div>
 -->


> 按钮组部分
- 按钮部分也有规定的模板
- 选创建 装所有按钮的 容器
<!-- 
    <div class="button-group">
        里面装每一个button
    </div>
 -->
- group里面 每一个button 要起button-item的类名
- 每一个button标签内部要写上data-filter自定义属性 自定义的属性名前要有.
- 全部的标签按钮上 自定义属性是 data-filter="*"
- 其它的标签的自定义属性跟按钮明一样就可以吧
<!-- 
    <div class="button-group">
        <button class="button-item button-active" data-filter="*">全部</button>
        <button class="button-item" data-filter=".pinpai">品牌</button>
        <button class="button-item" data-filter=".qudao">渠道</button>
        <button class="button-item" data-filter=".shuju">数据</button>
    </div>
 -->
<!-- 

    网站上关于按钮区域的模板

    <div class="button-group filter-button-group">
        <button data-filter="*">show all</button>
        <button data-filter=".metal">metal</button>
        <button data-filter=".transition">transition</button>
        <button data-filter=".alkali, .alkaline-earth">alkali & alkaline-earth</button>
        <button data-filter=":not(.transition)">not transition</button>
        <button data-filter=".metal:not(.transition)">metal but not transition</button>
    </div>

 -->

- 将第二段js文件 复制到js部分里
- 不能直接复制 注意按钮包裹器 div的类名
<!-- 
    // init Isotope
    var $grid = $('.grid').isotope({
        // options
    });

    // 将这段代码复制到html中
    // filter items on button click
    $('.filter-button-group').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
 -->

> 设计按钮点击效果
<!-- 
    $('.button-group').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });

    在这里设置的
        $('.button-item').removeClass('button-active');
        $(this).addClass('button-active');
    });
 -->

<!-- 
    // 最终
    $('.button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
        $('.button-item').removeClass('button-active');
        $(this).addClass('button-active');
    });
 -->


### 岗位能力
将这个部分设为2行3列的布局
> 这里的要点就是grid布局
> 如果是屏幕有抖动就是 hover的时候改变了高度
<!-- 
    .skill-item {
        /* 将每一个快的背景设为白色透明 */
        background: rgba(255, 255, 255, 0.8);
        /* 设置白色的透明的线, 为了时前后变化时的高度一样 不会产生屏幕抖动 */
        border-bottom: 4px solid rgba(255, 255, 255, 0);
        transition: 1.2s;
    }
    /* 设置滑过效果 */
        .skill-item:hover {
        /* 让线变成绿色 */
        border-bottom: 4px solid #8ab92d;
        transform: translateY(-4px);
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.12);
    }
 -->

### 滚动的技能条的实现
- 要有running.js
- 要有jquery.running.css 在css文件里 修改进度条的样式
- 修改css样式时, 在prograss的位置开始修改
<!-- 
    <div class="bar-wrap prograss">
        <div class="bar-item bar animateBar" data-animatetarget="80" style="width:80%;"></div>
    </div>
 -->

> running.js的用法
- 加载jQuery.Running.css 样式文件
<!-- 
    <link rel="stylesheet" href="css/jquery.running.css">
 -->

- 调用jQuery类库和jQuery.Running.min.js文件
<!-- 
    <script type="text/javascript" src="js/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="js/jquery.running.js"></script>
 -->

- 启用插件
<!-- 
    $(function(){
        $('body').running();

    })
 -->

- 数字部分 必须严格按照下面的格式写
<!-- 
    
    <span class="animateNum" data-animatetarget="999.9">999.9</span>万

    // 也就是这里的p的部分
    <div class="percent1">
        <p class="animateNum" data-animatetarget="80%">0%</p>
    </div>
 -->

- 柱形图跑动场景
- 柱形图跑动效果需要有固定的写法来布局一个柱形图。所以当你使用柱形跑动的时候，需要严格按下面的结构来书写。
<!-- 
    <div class="prograss">
        <div class="bar animateBar" data-animatetarget="100" style="width:80%;"></div>
    </div>

    // 我们做的文件
    <div class="bar-wrap prograss">
        <div class="bar-item bar animateBar" data-animatetarget="80" style="width:80%;"></div>
    </div>
 -->


### scrollReveal.js 的应用

https://www.dowebok.com/134.html

> 引入文件
<!-- 
    <script src="js/scrollReveal.js"></script>
 -->

> HTML结构部分
<!-- 
    <div data-scroll-reveal>dowebok.com</div>
 -->
- 必须给元素加上 data-scroll-reveal 属性，加上之后会执行默认的动画效果，你也可以自定义改属性以显示不同的动画效果，如：
<!-- 
    <div data-scroll-reveal="enter left and move 50px over 1.33s">dowebok.com</div>
    <div data-scroll-reveal="enter from the bottom after 1s">Hello world!</div>
    <div data-scroll-reveal="wait 2.5s and then ease-in-out 100px">iPhone 6</div>
 -->
<!-- 
    enter:  动画起始方向    值: top | right | bottom | left
    move:   动画执行距离    值: 数字，以 px 为单位
    over:   动画持续时间    值: 数字，以秒为单位

    after/wait:     动画延迟时间    值: 数字，以秒为单位

    填充（可选）
    可以在 data-scroll-reveal 属性里填充（添加）一些类似编程的“语句”，使其更有可读性，scrollReveal.js 支持以下“语句”：

    from
    the
    and
    then
    but
    with
-->
<!-- 
    <div data-scroll-reveal="wait 0.3s, then enter left and move 40px over 2s">dowebok.com</div>
    <div data-scroll-reveal="enter from the left after 0.3s, move 40px, over 2s">Hello world!</div>
    <div data-scroll-reveal="enter left move 40px over 2s after 0.3s">iPhone 6</div>
    <div data-scroll-reveal="enter left, move 40px, over 2s, wait 0.3s">I love you</div>
 -->

> js部分
<!-- 
    window.scrollReveal = new scrollReveal();

    //或者，elem 为动画元素的任何级别的父元素
    window.scrollReveal2 = new scrollReveal({elem: document.getElementById('srcontainer')});

    我们在文档中这么写
    window.scrollReveal = new scrollReveal({
            //reset设置为true,上下滚动，无限次动态显示
            reset: true,
        });
 -->


> 高级用法
- 自定义默认值  可以更改 scrollReveal.js 的默认配置，如：
<!--    
    var config = {
        after: '0s',
        enter: 'bottom',
        move: '24px',
        over: '0.66s',
        easing: 'ease-in-out',
        viewportFactor: 0.33,
        reset: false,
        init: true
    };
    window.scrollReveal = new scrollReveal(config);
 -->

> 动态HTML
- scrollReveal.init() 方法可以检测所有含有 data-scroll-reveal 属性的元素，并进行初始化，所以对于动态加载的元素，可以这样操作：
<!-- 
    var config = {
        enter: 'bottom',
        move: '40px',
        over: '0.16s',
        reset: true,
        init: false
    };
    window.scrollReveal = new scrollReveal(config);
    var data = {newElementHtml: '<div data-scroll-reveal>dowebok.com</div>'};
    var container = document.getElementById('#container');
    container.innerHTML(data.newElementHTML);
    scrollReveal.init();
 -->


### 轮播图插件的用法
https://www.swiper.com.cn/usage/index.html

- 1.首先加载插件，需要用到的文件有swiper-bundle.min.js和swiper-bundle.min.css文件，不同Swiper版本用到的文件名略有不同。可下载Swiper文件或使用CDN
<!-- 
    <link rel="stylesheet" href="dist/css/swiper-bundle.min.css">

    <script src="dist/js/swiper-bundle.min.js"></script>
 -->

> HTML部分
<!-- 
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
        </div>
        <!-- 如果需要分页器 >
        <div class="swiper-pagination"></div>
        
        <!-- 如果需要导航按钮 >
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        
        <!-- 如果需要滚动条 >
        <div class="swiper-scrollbar"></div>
    </div>
    导航等组件可以放在container之外
 -->

> 你可能想要给Swiper定义一个大小，当然不要也行。
<!-- 
    .swiper-container {
        width: 600px;
        height: 300px;
    }  
 -->

> 初始化Swiper
- https://www.swiper.com.cn/demo/index.html
- 参考上面的网站选择一个类型
- 点击在新窗口打开
- 点击查看源代码
<!-- 
    <script>        
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            
            // 如果需要滚动条
            scrollbar: {
            el: '.swiper-scrollbar',
            },
        })        
    </script>
 -->

> 完成。恭喜你，现在你的Swiper应该已经能正常切换了。
- 如果作为CommonJs 或ES 模块引入
<!-- 
    //CommonJs
    var Swiper = require('swiper');    
    var mySwiper = new Swiper('.swiper-container', { /* ... */ });

    //ES
    import Swiper from 'swiper';    
    var mySwiper = new Swiper('.swiper-container', { /* ... */ });
 -->


### scrollreveal js 的使用
> 1 引入js文件

> 为菜单a标签 填入 href 到 id
- 为每个a标签指定内容id

> 之后为每个标题添加对应的id






### 总结
> 整体的容器
<!-- 
    .wrap {
        background:url(../images/bg.jpg) no-repeat;
        background-attachment: fixed;
        background-size:cover;

        width:100vw;
    }

    设置视觉差的关键属性 然后设置了宽度全屏, 高度的话不用管 这里的话让内容撑开高度
 -->

> 整体的容器 > 版心
<!-- 
    .wrap .container {
        width:80vw;
        margin:auto;
    }

    设置的了版心的宽度, 为屏幕的80% 居中
    
    问题: 这里用vw 和 80%有什么区别么?
 -->

> 整体的容器 > 版心 > 文字内容区的总体容器 > 里面包含了两个部分

> 视觉差的注意点 所有内容都写在了版心里 就不能给版心设定固定的高度 不然内容就会出版心

> 筛选功能区域, 按钮 和 商品 并没有放在一个盒子里 各自是各自的
- 按钮区域 和 商品区域 都必须有自己的格式


### 问题 placeholder 是什么 什么时候用

