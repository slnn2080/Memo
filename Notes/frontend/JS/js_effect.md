# JS 效果
  
## 流星雨
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="./assets/js/jquery.js"></script>
  <title>Document</title>
  <style>
    html, body {
      height: 100%;
      background-color: #212121;
    }
    .meteor {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      transform: rotateZ(45deg);
    }
    .star {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 2px;
      background: linear-gradient(45deg,rgba(255,255,255,0),#729ff1);
      animation: tail 3s ease-in-out infinite,shooting 3s ease-in-out infinite;
    }
    .star::before,
    .star::after{
      content: "";
      position: absolute;
      top: calc(100% - 1px);
      left: 100%;
      height: 2px;
      background: linear-gradient(45deg,rgba(255,255,255,0),#729ff1,rgba(255,255,255,0));
      animation: shining 3s ease-in-out infinite;
    }
    .star:before {
      transform: translateX(-50%) rotateZ(-45deg);
    }
    .star:after {
      transform: translateX(-50%) rotateZ(45deg);
    }

    @keyframes shining {
      0% {width: 0;}
      50% {width: 30px;}
      100% {width: 0;}
    }
    @keyframes tail {
      0% {width: 0;}
      30% {width: 100px;}
      100% {width: 0;}
    }
    @keyframes shooting {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(300px);
      }
    }

  </style>
</head>
<body>

<div class="meteor">
  
</div>

<script>
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    function createStar() {
      const star = document.createElement("div")
      star.classList.add("star")
      star.style.top = Math.random() * windowHeight + "px";
      star.style.left = Math.random() * windowWidth + "px";
      star.style.animationDuration = (Math.random() * 2 + 3) + "s";
      star.style.transform = "rotate(" + (Math.random() * 360) + "deg)";

      // 给元素绑定动画结束事件 当动画结束后移除
      star.addEventListener("animationend", function() {
        this.remove();
      });

      document.querySelector(".meteor").appendChild(star);
    }

    function createStars(num) {
      for (let i = 0; i < num; i++) {
        createStar();
      }
    }

    // 每隔2秒创建一批星星
    setInterval(function() {
      createStars(Math.floor(Math.random() * 5) + 1);
    }, 2000);
</script>
</body>
</html>
```

<br>

## 移动端的轮播图

### 要点:
1. 声明一个全局变量 定为false, 在move逻辑里修改为true

2. 定时器移动图片的逻辑 是定义一个index 然后利用定时器每隔1000ms改变 index的值, 因为图片移动的距离为 index * w 所以我们是通过修改 index 的值 间接的移动图片

3. 

```js
// 全局声明标识 多个函数作用域中可用
let flag = false;

let focus = document.querySelector('.focus');
let ul = focus.children[0];
let w = focus.offsetWidth;

let index = 0;
let timer = setInterval(function(){
  // 每秒回修改 index 的值
  index++;
  // 移动距离 和 index 有关
  let translatex = -index * w;
  ul.style.transition = 'all .3s';
  ul.style.transform = `translateX(${translatex})`;
},1000)


// 绑定的过渡结束事件 
ul.addEventListener('transitionend', function(){

  // 边界判断
  if(index >= 3) {
    index = 0;
    ul.style.transition = 'none';
    let translatex = -index * w;
    ul.style.transform = `translateX(${translatex})`;
  } else if(index < 0) {
    index = 2;
    ul.style.transition = 'none';
    let translatex = -index * w;
    ul.style.transform = `translateX(${translatex})`;

    ol.querySelector('.current').classList.remove('current');
    ol.children[index].classList.add('current');
  }
});

let startX = 0;
let moveX = 0;

ul.addEventListener('touchstart', function(e){
  startX = e.targetTouches[0].pageX;
  clearInterval(timer)
})


ul.addEventListener('touchmove', function(e){
  moveX = e.targetTouches[0].pageX - startX;
  let translatex = -index*w + moveX;
  ul.style.transition = 'none';
  ul.style.transform = `translateX(${translatex})`;

  // 在这里修改为true 如果用户手指移动过我们再去判断否则不做判断效果
  flag = true;

  // 取消拖动手指会滚动屏幕的默认行为
  e.preventDefault(); 
})


ul.addEventListener('touchend', function(e){

// 在这里根据flag来 进行 相应内容的进行, 如果flag是true 那就是代码移动过了 再进行下面的逻辑判断
if(flag) {
  if(Math.abs(moveX) > 50) {
    if(moveX > 0) {
      index--;
    } else {
      index++;
    }
    
    let translatex = -index * w;
    ul.style.transition = 'all .3s';
    ul.style.transform = `translateX(${translatex})`;
  } else {
    let translatex = -index * w;
    ul.style.transition = 'all .3s';
    ul.style.transform = `translateX(${translatex})`;
  }
}


clearInterval(timer);

  timer = setInterval(function(){
    index++;
    let translatex = -index * w;
    ul.style.transition = 'all .3s';
    ul.style.transform = `translateX(${translatex})`;
  },1000)
})
```

<br><br>

## 递归: 根据id获取复杂数据结构中的指定属性
```js
let data = [
  {
    id:1,
    name:'家电',
    goods: [
      { id:11, gname:'冰箱' }, 
      { id:12, gname:'洗衣机' }
    ]
  }, 
  {
    id:2,
    name:'服饰'
  }
]

function getDatabyId(id, data) {
  let obj = {}
  data.forEach(item => {
    if(id == item.id) {
      obj = item
    } else if(item.goods && item.goods.length > 0) {
      // 所以这里要将返回的结果 赋值给obj
      obj = getDatabyId(id, item.goods)
    }
  })

  // 调用本函数会返回一个结果
  return obj
}

const res = getDatabyId(11, data)
console.log(res)
```

<br><br>

## 京东放大镜效果

### html部分: 
不要用百分比, 要不后面的比例关系不好求
```html
<div class="img-box">
  <img src="./images/4.jpg" alt="">
  <!-- 图片里的遮罩层 -->
  <div class="mask"></div>

  <!-- 
    这个显示的盒子也是img-box里面的, 让它绝对定位定到一个位置, 这样鼠标移入的时候显示 
  -->
  <div class='show-box'>
  
      <!-- 这里面放一张比左图还要大的图片 这里我缩放了120%; -->
      <img src="./images/4.jpg" alt="">
  </div>
</div>
```

<br>

### js部分解析:
整个案例可以分为3个功能模块

**部分1:**  
1. 鼠标经过小图片盒子, 黄色的遮挡层 和 大图片盒子显示, 离开隐藏2个盒子功能
2. 黄色的遮挡层移动 在它的父盒子范围内移动
3. 大图片跟随移动功能
```js
// 拿到外部的js文件, 应该加载这句话
window.addEventListener('load', function(){ }})
```

<br>

**部分2.**  
把鼠标的坐标给遮挡层是不合适的, 因为遮挡层坐标以父盒子为准  
首先是获得鼠标在盒子内的坐标, 之后把数值给遮挡层作为left 和 top值  

遮挡层是不能超出imgbox的范围的 增加判断条件 如果<0 就设置为0  

**注意:**    
前几个功能部分 我做成了拖拽功能, 这不是拖拽功能 在imgBox中移动, 把坐标给mask就可以

<br>

**部分3.**   
我用的是100%设置的盒子大小, 后面的比例关系不好算 我就没做

移动黄色遮罩层, 大图片跟随移动的功能  
遮罩盒子移动, 大图片跟着一起动, 那遮罩盒子移动的距离 和 大图片移动的距离一样么 ?

不一样 比如遮罩盒子是300 x 300像素的, 大盒子是800 800像素的 移动的距离也不一样
所以这里采取的是比例的关系

```
1 / 2 = x / 4 

x是几 1 X 4 / 2
```

那遮挡层移动距离 / 遮挡层最大移动距离 = 大图片移动距离 / 大图片的最大移动距离

图片的最大移动距离 = (大盒子的宽度 - 大图片的宽度)

大图片的移动距离 = 遮挡层移动距离 X 大图片最大移动距离 / 遮挡层最大移动距离

结合下面的代码, 遮挡层的移动距离 = newX 和 newY 遮挡层最大移动距离 = imgBox.offsetWidth - mask.offsetWidth 大图片最大移动距离 = 800px - 500px = 300px

我例子中用的都是百分比 计算比较麻烦 所以 我就没做这个关键的步骤 pink老师的例子中 大盒子是800px 图片是500px 以下是pink老师操作步骤
```js
let bigImg = document.querySelector('.bigImg');
let bigMax = bigImg.offsetWidth - big.offsetWidth

// 大图片的移动距离 XY
let bigX = maskX * bigMax / maskMax
let bigY = maskY * bigMax / maskMax
// 上面就是按照 1 / 2 = x / 4 x是几?  用 1 X 4 / 2吧
// 照着这个公式算出来的 大图片的移动距离的

bigImg.style.left = bigX + 'px';
bigImg.style.top = bigY + 'px';

// 需要注意的是 遮罩层 往左移动, 大图应该是相反方向 所以

bigImg.style.left = -bigX + 'px';
bigImg.style.top = -bigY + 'px';

// 我就做了1 2 没做3
let imgBox = document.querySelector('.img-box');
let mask = document.querySelector('.mask');
let showBox = document.querySelector('.show-box');

imgBox.addEventListener('mouseover', function(){
  mask.style.display = 'block';
  showBox.style.display = 'block';
})
imgBox.addEventListener('mouseout', function(){
  mask.style.display = '';
  showBox.style.display = '';
})

imgBox.addEventListener('mousemove', function(event) {

  // 获取鼠标在盒子内的坐标, 鼠标的位置 - 盒子左边和body的位置
  let x = event.clientX - imgBox.offsetLeft;
  let y = event.clientY - imgBox.offsetTop;

  // 修改鼠标的位置
  let newX = x - (mask.offsetWidth / 2);
  let newY = y - (mask.offsetHeight / 2);

  // 让遮罩层在imgbox内活动
  // 这个左边的条件
  if(newX <= 0) {
      newX = 0;

  // 右边的距离不用真正的参照有边框 也是参照于左边框计算的
  // 右边的极限距离怎么求, imgBox.offsetWidth - mask.offsetWidth
  } else if(newX >= imgBox.offsetWidth - mask.offsetWidth) {
    newX = imgBox.offsetWidth - mask.offsetWidth;
  }
  if (newY <= 0) {
    newY = 0;
  } else if (newY >= imgBox.offsetHeight - mask.offsetHeight) {
    newY = imgBox.offsetHeight - mask.offsetHeight;
  }

  mask.style.left = newX + 'px';
  mask.style.top = newY + 'px';
})
```

<br><br>

## 不让别人复制文字, 或者阻止弹出右键菜单

### contextmenu 事件
当我们点击右键的时候 就会触发该时间

<br>

**阻止默认行为:**  
我们通过代码取消默认行为 用户就会点不了右键

主要控制应该何时显示上下文菜单, 主要用于程序员取消默认的上下文菜单 比如鼠标的右键菜单
```js
document.addEventListener('contextmenu', function(e){
  e.preventDefault();
})
```

<br>

### selecstart 事件
当我们选中文字后 或 点击后 触发该事件

我们也可以通过取消默认行为来禁止用户选中文字
```js
document.addEventListener('selecstart', function(e){
  e.preventDefault();
})
```

<br><br>

## 判断闰年
我们的年份要么是闰年 要么是平年  

### 闰年: 
能够被 4 整除 且 不能整除 100 的为闰年 2004 就是闰年, 1901 不是闰年, 或者能够被 400 整除的就是闰年

```js
let year = prompt('请输入年份');
if(year % 4 === 0 && year % 100 != 0 || year % 400 === 0){
  alert(`${year}年是闰年`);
}else{
  alert(`${year}年是平年`);
}
```

<br><br>

## 补 0
```js
let num = prompt('请输入数字');
let result = num < 10 ? '0' + num : num;
console.log(result);

let num = prompt('请输入数字');
let result = num.padStart(2, "0")
console.log(result);
```

<br><br>

## 按下键盘 s 键 跳入到 input 标签中

### 核心思路:
检测用户是否按下了 s 键, 如果按下了 s 键, 就把光标定位到搜索框里  

使用键盘事件对象里面 keyCode 判断用户按下的是否是 s 键位  

<br>

### 使搜索框获得焦点:
使用 js 里面的 focus()方法  

<br>

### **<font color="#C2185B">input元素.focus()</font>**
让搜索框获得焦点

```js
let search = document.querySelector('.inp');

document.addEventListener('keydown', function(event){
  event = event || window.event;

  if(event.keyCode === 83){
    search.focus();
  }
});
```

<br>

**注意:**  
如果用down事件的话, 按下s会同时把s写进搜索框里, 因为它是按下就会被触发 **这里我们使用keyup比较合适**

<br><br>

## 输入文字后, 会弹出较大的框在里面实时显示输入内容

比如有的时候 屏幕上的搜索框有点小, 里面输入文字也会比较小 这时候我们就可以用这种方法

<br>

### 核心思路:
快递单号输入内容时, 上面的大号字体盒子显示(这个盒子里的字号更大)  

**表单检测用户输入: 给表单添加键盘事件**  

同时把快递单号里面的值(value)获取过来赋值给盒子作为内容  
如果快递单号里的文字为空, 我们就隐藏盒子  
```js
// 检测用户在表单中有没有输入内容
search.addEventListener('keyup', function(){
  if(this.value === ''){
    box.style.display = 'none';
  }else{
    box.style.display = 'block';
    // 把inp里面的内容给盒子
    box.innerHTML = this.value;
  }
});
```

<br>

### 为什么不用 keydown 和 keypress 事件?
keydown keypress 在文本框里面的特点: 他们两个事件触发的时候, **文字还没有落入文本框中**

<br><br>

## 打字机效果
```js
let str = '希望我能给她俩一点点的幸福';

let wordSite = document.querySelector('.word');

for(let i = 1; i <= str.length; i++){
  setTimeout(function () {
    wordSite.innerHTML = str.substr(0, i);
  },(i-1)*300);
}
```

<br><br>

## 动态生成表格
以前接触的表格都是在页面中写死的, 其实这些数据应该是用后台获取的

比如一个班的成绩 每个人的成绩不一样同学人数也会增加减少 所以不能写死 我们要根据数据响应的发生变化
```js
// 创建学生的数据
let datas = [
  {
    name:'sam',
    subject:'javascript',
    score:100
  },
  {
    name:'NN',
    subject:'javascript',
    score:98
  },
  {
    name:'LL',
    subject:'javascript',
    score:30
  },
  {
    name:'NB',
    subject:'javascript',
    score:100
  }
]

// 往tbody里创建行, 有多少人就有多少行, 也就是数组的length
let tbody = document.querySelector('tbody');

// 循环创建行, 外层for循环遍历的是行, tr
for(let i=0; i<datas.length; i++){
  //1. 创建行 tr
  let tr = document.createElement('tr');

  tbody.appendChild(tr);
  // 行里面创建td, 单元格的数量取决于每个对象里面的属性的个数

  // 2. 创建的跟数据相关的单元格
  // 遍历对象用for in in哪? in数组里每一个对象吧datas[i], 这里的i就用的外层for循环的i
  for(let n in datas[i]){
    //里面的for循环管的是列 也就是每个对象里面内容
    // 这里每循环一次又要创建一个单元格
    let td = document.createElement('td');
    // 单元格里存放的是每一个对象里的属性值
    td.innerHTML = datas[i][n]
    tr.appendChild(td);
  }

  // 3. 创建有删除 的 单元格
  let td = document.createElement('td');
  td.innerHTML = `<a href='javascript:;'>删除</a>`;
  tr.appendChild(td)
}

let as = document.querySelectorAll('a');
for(let i=0; i<as.length; i++){
  as[i].onclick = function(){
    //点击a 删除当前a所在的行
    tbody.removeClild(this.parentNode.parentNode);
  }
}

// 整理:
for(let i=0; i<datas.length; i++){
  let tr = document.createElement('tr');
  tbody.appendChild(tr);
  // 创建td
  for(let n in datas[i]){
    let td = document.createElement('td');
    td.innerHTML = datas[i][n];
    tr.appendChild(td);
  }
  // 创建剩下的删除单元格
  let td = document.createElement('td');
  td.innerHTML = `<a href='javascript:;'>删除</a>`;
  tr.appendChild(td);
}

let as = document.getElementsByTagName('a');
for(let i=0; i<as.length; i++){
  as[i].onclick = function(){
    tbody.removeChild(this.parentNode.parentNode);
  };
}
```

<br>

### 还可以这样 根据.的方式获取对象内部的值 data[i].price
```js
for(let i=0; i<data.length; i++) {
  let tr = document.createElement('tr');
  console.log(data[i]);
  tr.innerHTML = `<td>${data[i].id}</td><td>${data[i].pname}</td><td>${data[i].price}</td>`;
  tbody.appendChild(tr);

  let td = document.createElement('td');
  td.innerHTML = `<a href='#'>删除</a>`;
  tr.appendChild(td);
}
```

<br><br>

## 查询商品的案例
有一个表, 表内有很多的信息

```
按照价格查询 () - ()   搜索
按照名称查询 ()        查询
```

```
id      产品名称       价格
1       小米          3999
2       oppo          999
3       荣耀          1299
4       华为          1999
```

<br>

### 需求1: 商品价格不是写死的而是根据数据显示出来的 
使用 forEach() 来遍历数组

<br>

### 需求2: 可以根据价格显示产品
使用filter方法

<br>

**筛选条件:**   
大于等于第一个表单里面的值, 小于等于第二个表单里面的值  
当我们点击了按钮, 就可以根据我们的商品价格去筛选数组里面的对象

<br>

### 需求3: 可以根据商品名称显示商品
如果查询数组中唯一的元素, 用some()方法更合适, 因为它找不到这个元素, 就不在进行循环 效率更高

<br>

### 要点1:
表中的数据结构 我们使用forEach的时候 value就代表了里面的每一个对象

我们可以通过 value.的方式来取得 比如 value.id value.pname

<br>

### 要点2:
some()方法中要使用return true来终止循环
```js
let data = [
  {
    id:1,
    pname: '小米',
    price: 3999
  },
  {
    id:2,
    pname: 'oppo',
    price: 999
  },
  {
    id:3,
    pname: '荣耀',
    price: 1299
  }
]
```

<br>

### 代码部分:
```js
// 利用新增数组方法操作数据
let data = [
  {
    id:1,
    pname: '小米',
    price: 3999
  },
  {
    id:2,
    pname: 'oppo',
    price: 999
  },
  {
    id:3,
    pname: '荣耀',
    price: 1299
  }
]

// 获取响应的元素
let tbody = document.querySelector('tbody');
let search_price = document.querySelector('.search-price');
let search_search_pro = document.querySelector('.search-pro');
let start = document.querySelector('.start');
let end = document.querySelector('.end');
let product = document.querySelector('.product');

// 把数组渲染到页面中 自动按照arr.length遍历的
setData(data);

function setData(mydata) {
  // 如果直接把获取到的数据渲染到页面会依次添加, 所以在这里要先清空tbody里面的数据
  tbody.innerHTML = '';

  mydata.forEach(function (value, index) {
      let tr = document.createElement('tr');
      // 单元格里面的1 是每一个对象里面的id 用value. 的形式来获取
      tr.innerHTML = `<td>${value.id}</td><td>${value.pname}</td><td>${value.price}</td>`;
      tbody.appendChild(tr);
  });
}


// 按照价格来筛选元素 使用filter方法
// 筛选条件: 大于等于第一个表单里面的值, 小于等于第二个表单里面的值
search_price.addEventListener('click', function() {
  // 根据条件筛选数据 它返回的是一个数组
  let newData = data.filter(function(value) {
    // 这里面的value是数据中的每一个对象
    return value.price >= start.value && value.price <= end.value;
  })

  // 把筛选完的对象渲染到页面中
  // 把newData数组中的数据进行遍历 渲染到页面上
  setData(newData);
});

// 根据商品名称来查找商品
search_search_pro.addEventListener('click', function() {
  let arr = [];
  data.some(function(value) {
    // some方法返回的是布尔值 所以在内部可以这么写
    // 如果用户输入的商品 和 当前产品的名称一样
    if(value.pname === product.value) {

      console.log(value);     // 找到的数据

      // 但是返回的是一个对象, 我们上面定义的函数必须传递进去一个数组
      arr.push(value);

      // 如果找到就会返回true 必须这么写 现在就属于拿到这个数据了
      return true;
    } 
  });

  // 把拿到的数据渲染到页面中
  setData(arr);
})
```

<br><br>

## 简单版发布留言

### 要点 1:  
判断文本域里有没有文本 没有的话 return false

<br>

### 要点 2: 
留言的话 都是最新的在最上面

<br>

### 思路:
点击按钮之后, 就动态创建一个 li, 添加到 ul 里面  

创建 li 的同时, 就把文本域里面的值通过 li.innerHTML 赋值给 li

```js

btn.onclick = function(){

  if(text.value === ''){
    alert('您并没有输入内容');
    return false;
  }else{
    let li = document.createElement('li');
    li.innerHTML = text.value;
    // ul.appendChild(li);

    ul.insetBefore(li, ul.children[0]);
  }

};

```

<br>

### 删除留言
当我们把文本域里面的值赋值给 li 的时候, 多添加一个删除的链接

需要把所有的链接获取过来, 当我们点击当前的链接的时候, 删除当前链接所在的 li
```js
btn.onclick = function() {
  if(text.value == '') {
    alert('您还没有输入内容');
    return false;
  } else {
    let li = document.createElement('li');

    // 添加一个 删除 标签
    li.innerHTML = text.value + '<a href="#"">删除</a>';
    ul.insertBefore(li, ul.children[0]);

    // 删除元素 删除的是当前连接的li 它的父亲
    let as = document.querySelectorAll('a');
    for(let i = 0; i< as.length; i++) {
      as[i].onclick = function() {
        // 删除的是li当前a所在的li this.parentNode
        ul.removeChild(this.parentNode);
      }
    }
  }
```

<br><br>

## 导航条处的下拉菜单

### html结构:
```html
<ul class='nav'>
  <!-- 经过它的时候 -->
  <li>
    <a></a>
    <!-- 第二个孩子ul显示 / 隐藏 -->
    <ul> 
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </li>
</ul>
```

<br>

### 思路:
当鼠标经过 li 让里面的第二个孩子 ul 显示, 离开隐藏
```js
let nav = document.querySelector('nav');
let lis = nav.children;

for(let i=0; i<lis.length; i++){
  lis[i].onmouseover = function(){
    this.children[1].style.display = 'block';
  }
  lis[i].onmouseout = function(){
    this.children[1].style.display = 'none';
  }
}
```

<br><br>

## Tab 栏切换

### 案例分析:

1. tab 栏有两个大的模块, 上面的模块选项卡, 当前这一个底色会是红色 其余不变(排他思想), 修改类名的方式

2. 下面的模块内容, 会跟随上面的选项卡变化, 所以下面的模块变化写到点击事件里面

3. 规律 下面的模块显示内容和上面的选项卡一样 一一对应 相匹配

<br>

### 思路: 
给上面的 tab-list 里面的所有 li 添加自定义属性 index 属性值从 0 开始  
然后当我们点击 tab-list 里面的某个 li 让 tab-con 里面对应的序号的内容显示, 其它的隐藏(排他思想)

<br>

### 技巧 1: 给 tab 动态添加了 自定义 index 属性
```js
// html结构:
<div class="tab">
  <div class="tab-list">
      <ul>
          <li class='current'>商品介绍</li>
          <li>规格与包装</li>
          <li>售后保障</li>
          <li>商品评价</li>
          <li>手机社区</li>
      </ul>
  </div>
  <div class="tab-con">
      <div class="item">
          商品介绍模块内容
      </div>
      <div class="item">
          规格与包装模块内容
      </div>
      <div class="item">
          售后保障模块内容
      </div>
      <div class="item">
          商品保障模块内容
      </div>
      <div class="item">
          手机社区模块的内容
      </div>
  </div>
</div>

let tab_list = document.querySelector('.tab-list');
let lis = tab_list.querySelectorAll('li');
let items = ...;

//给每一个选项卡绑定点击事件
for(let i=0; i<lis.length; i++){

  // 开始给5个li 设置索引号 -- 动态添加属性
  lis[i].setAttribute('index', i);

  lis[i].onclick = function(){
    // 干掉所有人
    for(let i=0; i<lis.length; i++){
      lis[i].className = '';
    }
    // 留下我自己
    this.className = 'current'

    // 获取当前的点击的li的索引号
    let index = this.getAttribute('index');

    //排他思想
    for(let i=0; i<items.length; i++){
      items[i].style.display = 'none';
    }
    items[index].style.display = 'block';
  };
}
```

### 方式 2:

```js
/*
  首先 我点击tab的时候 让当前显示的内容隐藏? 或者让所有内容隐藏
  然后 我点击的tab对应的内容区显示 那我就要知道我点击按钮的下标
*/
for(let i=0; i<tab_btn.length; i++){
  tab_btn[i]._index = i;
  tab_btn[i].onclick = function(){
    for(let i=0; i<tab_con.length; i++){
      tab_con[i].style.display = 'none';
    }
    tab_con[this._index].style.display = 'block';
  };
}

```

<br><br>

## 换肤效果

### 需求: 点击图片 背景的图片会更换
把 img 的 src 取出来 给 body 就可以了

<br><br>

## 鼠标移入表格行后 该行有高亮的效果

### 应用事件: onmouseover onmouseout

<br>

### 思路:
我们把表头行放到 thead 里 经过它的时候不变色, 我们把主体放到 tbody 里面 我们获取 tbody 里面的行 鼠标经过 tr 行, 当前的行变颜色, 鼠标离开去掉当前的背景颜色
```js
// 1 创建一个类 关于高亮颜色, 以后修改直接改css就可以
this.className = 'bg'  这里直接覆盖就可以 并不是所有的都要 +=
// 2 鼠标离开
this.className = ''
```

<br><br>

## 排他思想
如果有同一组元素, 我们想要一个元素实现某种样式, 需要用到循环的排他思想算法:

所有元素全部清除样式(干掉其他人) 给当前元素设置样式(留下自己)

```js
btns[i].onclick = function(){
  for(let i..){
    // 干掉所有人
    btns[i].style.background = ''
  }
  // 留下我自己
  this.style.background = '#212121'
}
```

<br>

### 另一种做法:
- 先设置外部变量 _index = 0;

- 将正在显示的元素利用index设置为隐藏 currenbox[_index].style.display = none;

- 得到点击元素的下标 index

- 把当前元素的状态设置为显示 box[index].style.display = block;

- 更新外部 _index 的下标

<br><br>

## 密码框输入密码后 判断位数不对
判断的事件 是 当文本框失去焦点开始判断  

- 如果输入正确 则提示正确的信息 颜色为绿色小图标变化  
- 如果输入不是 6-16 位, 则提示错误信息颜色为红色 小图标发生变化  
```html
<div class='register'>
  <input type="password" class='ipt'>
  <p class="message">请输入6~16位密码</p>
</div>

<script>
let ipt = document.querySelector('.ipt');
let message = document.querySelector('.message');

ipt.onblur = function(){
  // 根据表单里面 值的长度 ipt.value.length
  if(this.value.length < 6 || this.value.length > 16){
    message.className += ' wrong';
    message.innerHTML = '您输入的位数不对, 请输入6-16位'
  }
};
</script>
```

<br><br>

## 循环精灵图
首先这个精灵图图片的排列一定是有规律的 一般精灵图竖着排列就是为了让它有规则 能被循环出

利用 for 循环 修改精灵图片的 背景位置 background-position

```js
图片索引    图片坐标Y   规律就是索引 x 66
  0          0
  1          66
  2          132
```

让循环里面的 i 索引号 x 66 就是每个图片的 y 坐标
```js
let lis = document.querySelectorAll('li');
for(let i = 0; i<lis.length; i++){
  lis[i].style.backgroundPosition = `0 -${i}*66px`;
}
```

<br><br>

## 显示隐藏文本框里面的内容
当鼠标点击文本框时, 里面的默认文字隐藏, 当鼠标离开文本框时, 里面的文字显示  

如果获得焦点, 判断表单里面内容是否是默认文字, 如果是默认文字 就清空表单内容  

如果失去焦点, 判断表单内容是否为空, 如果为空, 则表单内容改为默认文字  

<br>

### 需要事件:   
获得焦点 onfocus, 失去焦点 onblur

```html
<input type="text" value='手机' id='test'>

<script>
let test = document.querySelector('#test');
test.onfocus = function(){
  if(this.value == '手机'){
    this.value = '';
  }
  // 获得焦点后需要把文本框里面的文字颜色变黑
  this.style.color = '#212121';
};
test.onblur = function(){
  if(this.value == ''){
    this.value = '手机';
  }
  // 当失去焦点后文本框里面的文字颜色变灰色
  this.style.color = 'rgb(190, 190, 190)'
}
<script>
```

<br><br>

## 点击显示密码

### 思路: 
点击眼睛按钮, 把密码框类型改为文本框就可以看见里面的密码  

一个按钮两个状态, 点击一次, 切换为文本框 点击一次 切换到密码框
```html
<div class="box">
  <label for="">
      <img src="" alt="" id='eye'>
  </label>
  <input type="text" id='pwd'>
</div>

<script>
let flag = 0;
eye.onclick = function(){
  if(flag == 0){
    pwd.type = 'text';
    eye.src = 'img/open.png';
    flag = 1;
  }else {
    pwd.type = 'password';
    eye.src = 'img/close.png';
    flag = 0;
  }
};
</script>
```

<br><br>

## 到时间发送短信
点击按钮后, 该按钮60秒之内不能再次点击, 防止重复发送短信

<br>

### 核心思路:
按钮点击后, 会禁用 disabled = true  

同时按钮里面的内容会发生变化, 比如还剩下多少秒 

里面秒数是有变化的, 因此需要用到定时器  

如果变量为0 说明到了时间, 我们需要停止定时器, 并且复原按钮初始状态  

input标签的类型: number, search  

如果想修改input的disabled的状态  
- ie9: input:disabled
- ie8: input[disabled]
- ie6: html input.disabled

```js
let btn = document.querySelector('button');
let num = 5;
let timer;

btn.addEventListener('click', function() {
  this.disabled = true;
  let _this = this;

  btn.timer = setInterval(function(){
    if(num == 0) {
      clearInterval(btn.timer);
      _this.disabled = false;
      btn.innerHTML = '发送';
      num = 5;
    } else {
      _this.innerHTML = `还剩下${num}秒`;
      num--;
    }
  }, 1000)
})
```

<br><br>

## 5秒自动跳转页面
利用定时器 页面显示还剩多少秒

```js
let num = 5;
let timer = setInterval(function() {
  if(num == 5) {
    clearsetInterval(timer);
    location.href = 'www.baidu.com';
  } else {
    div.innerHTML = '您将在5秒后跳转到主页';
    num--;
  }
  
}, 1000)
```

<br><br>

## 案例 怎么判断用户在哪个终端打开的页面 实现跳转
在head标签里面写个script标签, 把下面的代码复制到script标签里面

```js
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPad|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|WOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  window.location.href = '';      //手机
} else {
  window.location.href = '';      //电脑
}
```

<br><br>

## 数据在不同页面中传递
当前页面为login.html

```html
<form action='index.html'>
<!-- js表单有name属性才能提交 -->
用户名:<input type='text' name='uname'> <input type='submit' value='登录'>
</form>

<script>

  console.log(location.search);   // ?uname=ANDY
  let str = location.search.substr(1); // uname=ANDY
  let arr = str.split('=');           // ['uname', 'ANDY'];


  let div = document.querySelector('div');
  div.innerHTML = arr[1];
</script>
```

<br><br>

## 倒计时

### 思路:
输入的时间(将来的时间) - 现在的时间 = 剩余的时间, 即倒计时  
但是不能拿着时分秒相减, 会是负数 我们可以拿时间戳来计算  

```
用户输入的总毫秒数 - 现在时间的总毫秒数 = 剩余时间的总毫秒数  
```

然后把剩余的毫秒数转为天时分秒  

输入时间: 因为活动从什么时间开始是用户决定的 活动开始的时间  

```js
// 形参time 是用户输入的时间, 也是预计活动开始的时间
  function countTime(time){

  // 返回的是当前时间总的毫秒数
  let nowTime = +new Date();

  // 用户输入时间总的毫秒数
  let inputTime = +new Date(time);

  // 剩余时间总得毫秒数
  // let times = inputTime - nowTime;
  // 剩余时间总得毫秒数 转为 秒数 拿着秒数计算更精确些
  let times = (inputTime - nowTime) / 1000;

  /*
      d = parseInt(总毫秒数 / 60 / 60 / 24);
      h = parseInt(总毫秒数 / 60 / 60 % 24);
      m = parseInt(总毫秒数 / 60 % 60);
      s = parseInt(总毫秒数 % 60);
  */

  let d = parseInt(times / 60 / 60 / 24);
  d = d<10 ?'0'+d :d;
  let h = parseInt(times / 60 / 60 % 24);
  h = h<10 ?'0'+h :h;
  let m = parseInt(times / 60 % 60);
  m = m<10 ?'0'+m :m;
  let s = parseInt(times % 60);
  s = s<10 ?'0'+s :s;

  return `${d}天${h}时${m}分${s}秒`;
}
let result = countTime('2021-4-22 12:00:00');
console.log(result);
```

<br><br>

## 点击切换效果
第一次点击一个效果, 第二次点击一个效果
```js
let flag = true;
test.onclick = function(){
  if(flag){
    ...
  }else{
    ...
  }

  flag = !flag;
}
```

<br>

## 依次延迟显示效果 跟 delay 属性相关
出去有先后顺序, 收回时先出后回
```js
(i*0.15)
```

<br>

### 要点:  
我们要设置元素对象的 transition(中的 delay 属性,但它是个简写属性, 第一个值为过渡时间,第二个值为延迟时间)

<br>

### 总结:
出去: 第一张图片要最快出去 ``0 \ *`` 系数, 也就是按照一个比率出去呗

收回: 最后一张要先回来, 让最后一张的延迟为 0 吧

<br>

### 出去:
```js
for(let i=0; i<imgs.length; i++){
  imgs[i].style.transition = '1s '+(i*0.15)+'s';
}
```

<br>

### 收回
```js
for(let i=0; i<imgs.length; i++){
  imgs[i].style.transition = '1s '+((imgs.length-1-i)*0.15)+'s';
}
```

<br><br>

## 点击按钮 跳到下一张图片

```js
prev.onclick = function(){
  index--;
  img.src = imgArr[index];
};
```

<br><br>

## 波浪式的开机动画

```js
let color = ['red', 'yellow', 'blue', 'pink', 'deepblue', 'white', 'red', 'yellow', 'blue', 'pink', 'deepblue']

let span = document.querySelectorAll('.inner span');
for(let i=0; i<span.length; i++){
  span[i].style.animation = 'move .3s '+(i*50)+'ms infinite alternate linear'

  span[i].style.color = color[i];
}
```

<br><br>

## 开机动画的百分比

```js
let flag = 0;

for(let i=0; i<arr.length; i++){
  // 这也是创建图片的一种方法
  let img = new Image();

  // 当我的src指向一个地址时 我会发送请求去拿它, 这是浏览器自己会做的
  img.src = arr[i];

  // 既然现在是发请求拿数据, 那现在的 进度 怎么拿到
  // 只要请求成功 就会触发下面的事情 图片加载成功
  img.onload = function(){
    flag++;
    // 这段文字中的百分比是跟请求次数有关系的
    p.innerHTML = '已加载'+(Math.round(flag/arr.length)*100)+'%'
  };
  img.onerror = function(){
    console.log('地址有问题')
  };
}
```

<br><br>

## 视频: 进度条长度 和 按钮位置关联
需求: 主区域的拖动按钮得动，进度的 width 也得动

```js
//当前视频播放的时间
video.currentTime

// 视频的总播放时间
video.duration  

// 得到了一个 时间的比例
video.currentTime / video.duration 


// 拖动按钮能跑的最大长度  进度条的总长度 - 按钮的长度
progress.clientWidth - btn.offsetWidth

// 时间比例 x 这个总长度 就是 定时器100执行一次 走的距离
```

```js
btn.style.left = rateProgress.style.width = (video.currentTime/video.duration)*(progress.clientWidth - btn.offsetWidth) + 'px';
```

<br><br>

## 视频: 点到进度条上任意位置，视频会从这个位置开始播放

### 思路 1:
鼠标点到进度条上的位置 / 进度条的总距离 * 视频的总时间（video.duration）  

鼠标点到进度条上的位置 / 进度条的总距离 = 我走了的距离 / 总距离  = 我已走的距离占了总距离的百分之几  

那总时间 再乘以 这个百分之几 就是走了多少时间  

```js
video.currentTime = video.duration \* ((event.clientX - this.offsetLeft)/(progress.clientWidth - btn.offsetWidth));
```

<br>

### 思路 2:

我现在要点到进度条上任意位置，视频会从这个位置开始播放  
所以我要知道  **点击的位置是多少秒**  从这个秒数开始播放就可以了  

假如一共是400秒，一共是1000米  
首先我要知道 1秒能跑多少米，1000 / 400  

总长度 / 总时间 = 单位时间内跑多少米  

```js
(progress.clientWidth - btn.offsetWidth) / video.duration
```

然后我得知道 我跑了多少米了 也就是点到哪了  
我点的位置: 
```
event.clientX - this.offsetLeft
```

我知道了 我跑了多少米，也知道 我1秒跑多少，那就是能知道我花了多少时间
```
现在跑的距离 / 1秒跑多少米 = 跑了多少秒
现在位置 / (总长度/总时间)
```

```js
(event.clientX - this.offsetLeft) / ((progress.clientWidth - btn.offsetWidth) / video.duration)
```
```js
video.currentTime = (event.clientX - this.offsetLeft) / ((progress.clientWidth - btn.offsetWidth) / video.duration)
```

<br><br>

## 停靠栏效果

```js
let r = 128;
for(let i=0; i<imgs.length; i++){

let a = imgs[i].getBoundingClientRect().left + imgs[i].offsetWidth/2 - event.clientX;
let b = imgs[i].getBoundingClientRect().top + imgs[i].offsetHeight/2 - event.clientY;
let c = Math.sqrt(a*a+b*b);

// 当c为130时 width为64 当c慢慢变小的时候 width的值应该慢慢变大
if(c>=r){
  c=r;  //r 乘以多少为64 和图片的大小关联起来
}
/*
  c的值被修改成始终是128，c的一半是图片最小的尺寸64 C * 0.5
  当c最大的时候为 64
  当c最小的时候为128
  也就是 当c越来越小
  图片就会越来越大 这里面的所有值都是倍数关系 2倍
*/
  imgs[i].style.width = 128 - c*0.5 + 'px';
}
```

<br><br>

## 曲线运动

让对象去做曲线运动其实就是一个 sin 图像（从左到右 波峰上下的图像）而且它的 left 和 top 要满足正弦图像

<br>

### 定义角度 和 波动系数
```js
let deg = 0;
let ratio = 100;
```

<br>

### X 轴上是弧度(弧度值 = 角度值 * PI/180)
```js
startX + (deg*Math.PI/180)*step/2 + 'px';
```

<br>

### Y 轴上弧度的值所对应 Y 上面的值
```js
startY + Math.sin( deg*Math.PI/180 )*step + 'px'
```

<br>

### 总结:  
x 轴上是元素开始的位置+x 轴上的弧度值, y 轴上是对弧度制进行 sin 处理

<br>

## 屏幕上画线, 每动一次创建一个点

```js
let line = document.createElement('div');
line.classList.add('box');
line.style.left = box.offsetLeft+'px';
line.style.top = box.offsetTop+'px';
document.body.appendChild(line);
```

<br><br>

## 轮播图
```js
window.onload = function(){

  /* 声明区域 */
  let ul = document.querySelector('.wrapper ul');
  let lis = ul.children;
  let colorArr = ['#E91E63', '#2196F3', '#CDDC39', '#FFEB3B', '#FF5722'];
  let items = document.querySelectorAll('.wrapper ul li>.item');
  let navBox = document.querySelector('.navP');
  let navP = document.querySelectorAll('.navP a');
  let wrapper = document.querySelector('.wrapper');
  let imgBox = document.getElementById('imgBox');
  // console.log(img);
  let index = 0;
  let autoChange_timer;

  let lastItem = document.getElementById('last-item');
  let lastLi = document.getElementById('last-li');
  console.log(lastLi);

  /* 修改区域 */
  // 修改ul的宽度
  ul.style.width = lis.length * 520 +'px';
  // 修改item的颜色
  for(let i=0; i<items.length; i++){
    items[i].style.background = colorArr[i];
  }
  // 修改li的背景色
  let bgArr = colorArr.sort();
  for(let i=0; i<lis.length; i++){
    lis[i].style.background = bgArr[i];
  }
  // 修改第一个导航点的默认颜色
  // navP[index].style.background = '#8b5f4f';
  toggleClass(navP[index], 'active');
  // 修改导航点位置
  navBox.style.left = (wrapper.offsetWidth - navBox.offsetWidth) / 2 + 'px';
  lastItem.id = 'last-item';
  lastLi.id = 'lastLi';

  /* 效果区域 */
  // 点击导航点效果
  for(let i=0; i<navP.length; i++){
    navP[i]._index = i;
    navP[i].onclick = function(){
      clearInterval(autoChange_timer);
      index = this._index;
      setNavP();
      move(ul, index*-520, 30, function(){
        autoChange();
      });
    };
  }


  // 自动轮播
  autoChange();

  // 设置导航点
  function setNavP(){
    if(index >= items.length - 1){
      index = 0;
      ul.style.left = 0;
    }
    for(let i=0; i<navP.length; i++){
      navP[i].className = '';
    }
    navP[index].className += ' active';
  };

  function autoChange(){
    autoChange_timer = setInterval(function(){
      index++;
      index %= items.length;
      move(ul, index*-520, 20, function(){
          setNavP();
      });
    }, 3000)
  };

  // 移动图片效果
  function move(obj, target, speed, callback){
    clearInterval(obj.timer);
    // 一上来获取元素现在的位置来判断speed应该是正还是负
    let nowSite = obj.offsetLeft;
    // 现在的位置 <-> 520 speed应该为正, 现在位置 > 520 speed应该为负
    if(nowSite > target){
        speed = -speed;
    }

    obj.timer = setInterval(function(){
      let currentX = obj.offsetLeft;
      let newX = currentX + speed;
      if(speed < 0 && newX < target || speed > 0 && newX > target){
        newX = target;
      }
      obj.style.left = newX + 'px';
      if(newX === target){
        clearInterval(obj.timer);
        callback && callback();
      }
    },30)
  };

  // 工具
  function hasClass(ele, classname){
    let reg = new RegExp(`\\b${classname}\\b`);
    return reg.test(ele.className);
  };
  function addClass(ele, classname){
    ele.className += ' '+classname;
  }
  function removeClass(ele, classname){
    let reg = new RegExp(`\\b${classname}\\b`);
    ele.className = ele.className.replace(reg, '');
  }
  function toggleClass(ele, classname){
    if(!hasClass(ele, classname)){
      addClass(ele,classname);
    }else{
      removeClass(ele, classname);
    }
  }
};
```

<br><br>

## 当滚动条滚动到指定位置 添加动画效果

**先创建动画**    
创建 class 为 active, 内部添加 animation 属性

<br>

### 思路:  
当大于 视口高度 + 滚动距离 > 元素对象的 offsetTop + 自定义高度(自己调节自己设定), 时添加 active 类   

当小于 视口高度 + 滚动距离 > 元素对象的 offsetTop + 自定义高度(自己调节自己设定), 时移出 active 类

```js
let box = document.querySelector('.test');
let btn = document.querySelector('.btn');

document.onmousewheel = function(event){
  event = event || window.event;
  if(event.wheelDelta < 0) {
      move(box, 'active');
  }

};

function animate(obj, cssName, dp){
  let viewH = document.documentElement.clientHeight;
  let scrollH = document.documentElement.scrollTop;

  // 使用obj.getBoundingClientRect()取得元素距离视口的y
  let eleT = obj.getBoundingClientRect().top;
  if((viewH + scrollH) > (eleT + dp)){
      obj.classList.add('active');
  }
  // 监听动画结束
  obj.addEventListener('animationend', function(){
      obj.classList.remove(cssName);
  })
}

// 工具类
function hasClass(obj, cssName){
  let reg = new RegExp('\\b'+cssName+'\\b');
  return reg.test(obj.className);
};
function addClass(obj, cssName){
  obj.className += ' '+cssName;
}
function removeClass(obj, cssName){
  let reg = new RegExp('\\b'+cssName+'\\b');
  obj.className = obj.className.replace(reg, '');
};
function toggleClass(obj, cssName){
  if(!hasClass(obj, cssName)){
      addClass(obj, cssName);
  }else{
      removeClass(obj, cssName);
  }
};
```

<br><br>

## 数字自动跳动 进度条自动增长

```js 
// numShowSite
let numShowSite = document.querySelector('.test');

// container
let bar = document.querySelector('.bar');
    
// obj
let bCon = document.querySelector('.bar-con');
    
// destination
let destination = numShowSite.getAttribute('data-destination');

// 封装的函数
function running(numShowSite, obj, container, destination){
  let distance = container.offsetWidth;

  obj.timer = setInterval(() => {
    let originalW = obj.offsetWidth;
    let newestW = originalW + 6;
    if(newestW === Math.round(destination*distance/100)){
      clearInterval(obj.timer);
    }
    numShowSite.innerHTML = Math.floor(newestW/distance*100)+'%';
    obj.style.width = newestW + 'px';
  }, 20);
}
running(numShowSite, bCon, bar, destination);
```

```js 
// 原有的操作
timer = setInterval(() => {
    let originalW = bCon.offsetWidth;
    let newestW = originalW + 6;
    if(newestW === Math.round(destination*distance/100)){
        clearInterval(timer);
    }
    p.innerHTML = Math.floor(newestW/distance*100)+'%';
    bCon.style.width = newestW + 'px';
}, 20);
```

<br><br>

## 滚动条滚动到指定位置
不能用getboundingClientRect(), 因为它是获取到视口的 滚动条的话原点会滚进去 所以要获取到定位父元素的 所以使用offsetTop

滚动条滚动不要设置px 就是数字

停止定时器的时候 **要写==** 不要写>= 要不往上走的话 第一次执行完定时器就停了 会出问题

```js
let colorArr = ['#E91E63', '#CDDC39', '#3F51B5', '#FF5722'];
let boxs = document.querySelectorAll('.test');
for(let i=0; i<colorArr.length; i++){
  boxs[i].style.background = colorArr[i];
}

let btns = document.querySelectorAll('.btn');

for(let i=0; i<colorArr.length; i++){
  btns[i].style.background = colorArr[i];
  btns[i].index = i;
  btns[i].onclick = function(){
    scroll(boxs[this.index], 10);
  };
}


function scroll(obj, speed){
  clearInterval(obj.timer);

  let destination = Math.round(obj.offsetTop);	
  let originalY = Math.round(document.documentElement.scrollTop);
  if(originalY > destination){
    speed = -speed;
  }
  obj.timer = setInterval(function(){
    let newestY = (originalY += speed);
    if(speed < 0 && newestY < destination || speed > 0 && newestY > destination){
        newestY = destination;
    }
    document.documentElement.scrollTop = newestY;
    if(newestY == destination){
      clearInterval(obj.timer);
    }
  },10);
};
```

<br><br>

## 提取数字部分并排序排序
```js
let arr = ["B3","D2","F1","A9","D12","A2","C1","Z0","B1"]

// 方式1
let res = arr.map(item => {
  return {
    origin: item,
    flag: +item.match(/([A-Z])(\d+)/)[2]
  }
})
  .sort((a, b) => a.flag - b.flag)
  .map(item => {
    delete item.flag
    return item.origin
  })

console.log(res)


// 方式2
let res = arr.map(item => {
  return {
    origin: item,
    num: +item.match(/([A-Z])(\d+)/)[2],
    alphabet: item.match(/([A-Z])(\d+)/)[1]
  }
})
  .sort((a, b) => {
    if(b.alphabet < a.alphabet) { return 1 } else { return -1 }
  })
  .sort((a, b) => a.num - b.num)
  .map(item => {
    delete item.num
    delete item.alphabet
    return item.origin
  })


// 方式3
let res = arr.map(item => {
  return {
    origin: item,
    num: +item.match(/([A-Z])(\d+)/)[2],
    alphabet: item.match(/([A-Z])(\d+)/)[1]
  }
})
  .sort((a, b) => {
    // 这里
    if(a.num > b.num) {
      return 1
    } else if(a.num < b.num) {
      return -1
    } else {
      if(a.alphabet < b.alphabet) {
        return -1
      } else {
        return 1
      }
    }
  })
  .map(item => {
    delete item.num
    delete item.alphabet
    return item.origin
  })
```

<br><br>

## 日期格式化
2019年 5月 1日 星期三

<br>

### 方法一: 使用swithc case语句 判断传入的数字 改为汉字
```js 
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let week = date.getDay();

switch(week){
  case 0:
    week = '日';
    break;
  case 1:
    week = '一';
    break;
  case 2:
    week = '二';
    break;
  case 3:
    week = '三';
    break;
  case 4:
    week = '四';
    break;
  case 5:
    week = '五';
    break;
  case 6:
    week = '六';
    break;
}

let time = `${year}年${month}月${day}日 星期${week}`;
console.log(time);
```

<br>

### 方法二: 利用了数组, 注意周日一定要放在前面 它的数字为0, 把得到的week当做index
```js 
let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
let time = `${year}年${month}月${day}日 ${arr[week]}`;
console.log(time);
```

<br><br>

### 时分秒的格式化
```js 
function getTime(){
  let time = new Date();
  let h = time.getHours();
  h = h<10 ?'0'+h :h;
  let m = time.getMinutes();
  m = m<10 ?'0'+m :m;
  let s = time.getSeconds();
  s = s<10 ?'0'+s :s;

  return `${h}:${m}:${s}`;
};

let timer = getTime();
console.log(timer);
```

<br><br>

### 获取距离1970-1-1起 至今的毫秒数 时间戳
毫秒数永远不会重复的

<br>

**获取时间戳的方式:**  
- getTime()         
- valueOf()
```js 
let date = new Date();
    
console.log(date.getTime());
console.log(date.valueOf());
```

- +new Date()
```js 
let date = +new Date();
console.log(date);
```

- Date.now()
```js 
console.log(Date.now())
```

<br><br>

### 案例: 电话号码的模糊处理

### **<font color="#C2185B">字符串.repeat(整数)</font>**
将一个字符串复制几次
```js 
console.log('abc'.repeat(2));   // abcabc
```

<br>

**思路:**  
将电话号码使用slice提取 提取留下几个字符, 使用*来拼接
```js 
let num = 18698712060

function handleP(num, len=3) {

  // 提取到18698712  剩下的使用 *** 代替(拼接)
  return String(num).slice(0, len*-1)+'*'.repeat(len)
}

let res = handleP(num, 3)
console.log(res);
```

<br><br>

## for循环打印星星

### 追加字符串的方式
```js
let str = '';
for(var i=1; i<=5; i++){
  str = str + '☆'
  // console.log(str);
}
// console.log(str);
```

```js 
// 放到里面打印的结果
☆
☆☆
☆☆☆
☆☆☆☆
☆☆☆☆☆

// 放在外面打印的结果
☆☆☆☆☆
```

<br>

### 5行5列的星星
利用双重for循环

思路: 里层循环负责一行打印5个星星, 外层循环负责打印 5 行
```js 
let str = '';
for(let i=1; i<=5; i++){    // 外层循环负责打印5行
  for(let j=1; j<=5; j++){  // 内层循环负责一行打印5个星星
    str = str + '☆'
  }
  // 如果一行打印完毕5个星星 就要另起一行
  str = str + '\n';
}
console.log(str);
```

<br>

### 打印倒三角形
**思路:**
1. 一共有10行, 但是每行的星星个数不一样, 因此需要用到双重for循环
2. 外成的for循环 控制行数, 循环10次可以打印10行
3. 内层的for循环 控制每行的星星的个数 但是每行的星星的个数是不一样的

<br>

**算法: 让里层循环的j 等于 行号 j=i**  
里面循环:  ``j=i; j<=10; j++``, 内层循环: 是从i开始的(j=i)

1行: 首先外层循环的i等于1, 然后里层循环就要走全部的, 这是 j=i 也就是 j=1, j<=10那就是说能打印10个星星, 里层的10个星星打印结束后 开是走第二轮 i++

2行: 外层的i等于2, 然后里层的走全部, j=2, j<=10, 也就是能打印9个星星

3行: 外层的i等于3, 然后里层的走全部, j=3, j<=10, 也就是能打印8个星星
```js 
let str = '';

// 外层循环负责行数
for(let i=1; i<=10; i++){    

  // 里层循环打印的个数不一样, j=i
  for(let j=i; j<=10; j++){  
    str = str + '☆'
  }
  str = str + '\n';
}
console.log(str);
```

```
*****           1行  j<5(5-0)  i=0
****            2行  j<4(5-1)  i=1
***             3行  j<3(5-2)  i=2
**              4行  j<2(5-3)  i=3
*               5行  j<1(5-4)  i=4
```

```js
for(i = 0; i<5; i++){

  for(j=0; j<5-i; j++){
    document.write("*<br />");
  }

  //内层循环完成一次, 外层输出一个换行
  document.write("<br />");       
}
```

<br>

### 打印9 9乘法表
**思路:**
1. 外层的for 控制行数 打印9行
2. 内层的for 控制每行的公式

<br>

**算法: 每一行的公式的个数 正好和行数一致, j<=i**
1行 1个, 2行 2个, 3行 3个 ...
```js 
let str = '';
for(let i=1; i<=9; i++){    // 外层循环负责行数
  for(let j=1; j<=i; j++){  // 里层循环打印的个数 j<=i
    str = str + `${j} x ${i} = ${j*i}\t`
  }
  str = str + '\n';
}
console.log(str);
```

<br>

### 打印正三角
执行顺序:
1. 先执行外成for循环一次
2. 再执行内部for循环
3. 内部for循环依次执行循环, 到全部
4. 外层循环执行第2次
5. 内部for循环依次执行循环, 到全部

```
*               1  <1  i=0
**              2  <2  i=1
***             3  <3  i=2
****            4  <4  i=3
*****           5  <5  i=4
```

这个图形和矩形相比, 高度是不用动的, 不同的地方在于宽度
观察下i和行号的关系, i+1 正好是行号, ``j<i+1``

每加一行 宽度加1

<br>

```js 
for(let i = 0; i<5; i++){
  for(let j = 0; j<i+1; j++){
    document.write('*');
  }
  document.write('</br>')
}
```

<br><br>

### 求1 - 100 之间所有整数的累加和
```js 
let sum = 0;
for(let = i; i<=100; i++){
  sum = sum + i;
}
```

<br><br>

### 用户输入人数 求成绩的平均值
```js 
let num = prompt('请输入您班级的总人数');
let sum = 0;
for(let i = 1; i <= num; i++){
  let score = +prompt(`请输入第${i}个学生的成绩`);
  sum = sum + score;
}
console.log(sum)
console.log(sum / num);
```

<br><br>

### 质数练习
在页面中接受一个用户输入的数字, 并判断该数是否是质数

<br>

### 解析:
质数, 只能被1和它自身整除的数, 1不是质数也不是合数 质数是必须大于1的自然数
```js 
while(true){
  var num = prompt("请输入一个整数");
  if(num>=0){
    break;
  }
  alert("请输入一个正整数");
};

//默认结果是个质数, 作用不明,  目的是 把for循环里的结果传递出来 因为 for循环外 和 for循环内 是两个部分
var flag = true;

for(var i=2; i<num; i++){

  //证明进入这步的一定不是个质数, 因为取的是2-10之间的数, 假如num被之间的数整除 那么num就不是一个质数
  if(num%i == 0){
    flag = false;
  }
};

if(flag){
  alert(num+"是个质数");
}else{
  alert(num+"不是个质数")
}
```

<br>

### 质数的优化练习
```js 
// 开启计时器
console.time("test")        

for(i=0; i<=100; i++){
  var flag = true         
  for(j<2; j<i; j++){
    if(i%j==0){
      flag=false;
      break;       
    }
  }
  if(flag){
    console.log(i);
  }
}

//结束计时器
console.timeEnd("test")   
```

<br>

**优化解析:**  
如果不写break则会挨个进行i%j==0, 比如i=18 假如不写break则会18除以2-17之间所有的数

但是假如除到9发现已经等于0 则10-17之间的数字就不用继续计算了 所以写上break能大大减少计算步骤  

<br>

```js 
console.time("test")

for(i=0; i<=100; i++){
  var flag = true

  for(j<2; j<=Math.sqrt(i); j++){
    if(i%j==0){
      flag=false;
      break;
    }
  }

  if(flag){
    console.log(i);
  }
}
console.timeEnd("test") 
```

<br>

**优化解析:**
如果j是97, 那么我们要提取的是2-96之间的数字, 

如果j是96, 那么我们要提取的是2-95之间的数字, 与第一次的提取结果重复了吧
    
再举例:  
36的因数, 1和36, 2和18, 3和12, 4和9, 6和6, 因数都是成对出现的, 在6和6两个因数相等的时候, 再往下就没有新的因数了, 再找又是重复的了

那么6和6 和 36之间的关系是？ 根号下36

所以, 对于97来说, 用不用找到96了？不用, 找到谁合适？ 找到根号下97就可以

所以, 这里面i的值定为97有点大, 应该是根号下97就可以

<br><br>

## 打印出1-100之间所有的质数

1. 接下来分析下什么是质数, 只有能被它本身整除的数

2. 先打出1-100之间所有的数
```js
var flag=true;
for(i=2; i<=100; i++) {
  console.log(i)
}
```

3. 判断i是不是质数 判断i是否是质数, 先要获取2-i之间所有的数,j < i
```js
for(j=2; j<i; j++) {
  console.log(j)
}
```

4. 数有了接下来就是判断, i是否能被j整除, 证明i是质数很难, 因为2-i之间的数字很多 所以证明它不是质数, 一旦进入下面的判断, 肯定不是质数
```js
if(i%j == 0){
  // 这里需要创建一个变量用来保存结果, 传出去传到下一步
  flag=false;
}

if(flag){
  console.log(i)
}
```

<br><br>

## 循环语句练习

需求: 假如投资的年利率为5%, 试求从1000块增长到5000块, 需要花费多少年？

<br>

### 思考: 
我需要先想停止条件, 这里到5000停止, 所以可以给它设置为停止条件
```js 
// 定义一个变量, 表示当前的钱数
var m = 1000;

m *= 1.05;      //第一年的钱数
m *= 1.05;      //第二年的钱数
m *= 1.05;      //第三年的钱数
m *= 1.05;      //第四年的钱数

/*
循环一次是一年, 但是到5000是多少年？

所以我们需要定义一个计数器, 所谓的计数器就是一个变量, 用来保存变量执行的次数
*/
var m = 1000;
var count = 0;

while(m < 5000){
  m *= 1.05;
  count++;            //计数器
}

console.log("一共需要"+ count + "年"); 
```
<br><br>

## 数组的练习

<br>

### 求数组 [2,6,1,7,4] 里面所有元素的和 以及 平均值
```js 
let arr = [2,6,1,7,4];
let sum = 0;
let average = 0;
arr.forEach(function(value, index){
  sum += arr[index];
});
console.log(sum);
average = sum / arr.length;
console.log(average);
```


<br>

### 求数组[2,6,1,77,52,25,7]中的最大值
声明一个最大值的变量max, 默认最大值可以取数组中的第一个元素
遍历这个数组, 把里面每一个数组元素 和 max 相比较

如果这个数组元素大于max 就把这个数组元素存到max里面, 否则继续比较下一轮
```js 
let arr = [2,6,1,77,52,25,7];

// 创建最大值变量, 它的值为arr中的第一个元素
let max = arr[0];

// 这里也可以从1开始, 因为第一个元素已经给max了 它俩就不用比较了
for(let i=0; i<arr.length; i++){

  // 用数组的每一个元素和max比较 如果大就赋值给max
  if(arr[i] > max){
    max = arr[i];
  }
}
console.log(max); 
```


<br>

### 将数组['red', 'green', 'blue', 'pink']转换为字符串, 并且用 | 或其它符号分割, 输出: 'red|green|blue|pink'
```js 
let arr = ['red', 'green', 'blue', 'pink'];
let str = '';
let sep = '|';
arr.forEach(function(value, index){
  str += arr[index]+sep;
});
console.log(str);
```

<br>

### 新建一个数组, 里面存放10个整数(1-10)
```js 
let arr = [];
for(let i = 0; i <= 10; i++) {
  arr[arr.length] = i+1;
};
console.log(arr);
```

<br>

### 筛选数组
将[2, 0, 6, 1, 77, 0, 52, 0, 25, 7]中大于10的元素选出来, 放进新数组中


**思路1:**   
因为newArr.length可以动态监测数组里的元素, 让筛选出来的数组添加到新数组中的最后一位
```js 
    
let arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7];
let newArr = [];
for(let i = 1; i <= arr.length; i++) {
  if(arr[i] >= 10) {
    newArr[newArr.length] = arr[i];
    newArr.push(arr[i]);
  }
};
console.log(newArr);
```

不能写成 newArr[i]  因为 当值为77的时候满足条件 此时的i为4 也就是 newArr[4] = arr[4]; 造成了 0 1 2 3 为empty 我们的newArr[0] 应该从0开始 依次递增

<br>

**思路2:**   
既然应该从0开始 我们在外面定义一个变量j=0
```
newArr[j] = arr[i]
j++
```
```js
let arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7];
let newArr = [];
let j = 0;
for(let i = 1; i <= arr.length; i++) {
  if(arr[i] >= 10) {
    newArr[j] = arr[i];
    j++;
  }
};
console.log(newArr);
```

<br>

### 删除指定数组元素
将数组 [2, 0, 6, 1, 77, 0, 52, 0, 25, 7] 中的0去掉后, 形成一个不包含0的新数组

```js 
let arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7];
let newArr = [];
for(let i = 0; i <= arr.length; i++) {
  if(arr[i] == 0) {
    continue;
  }
  newArr[newArr.length] = arr[i];
};

// 方法2
for (let i = 0; i < arr.length; i++) {
  if (arr[i] != 0) {
    newArr[newArr.length] = arr[i];
  }
};
console.log(arr);
console.log(newArr);
```

<br>

### 翻转数组
将数组['red', 'green', 'blue', 'pink', 'purple']的内容反过来存放

**思路:**   
把旧数组中的最后一个元素 取出来 给新数组 作为第一个

- 把索引号4 取出来 给新数组0
- 把索引号3 取出来 给新数组1
- 把索引号2 取出来 给新数组2
- 把索引号1 取出来 给新数组3
- 把索引号0 取出来 给新数组4

新数组索引号依次递增 用到newArr.length 旧数组索引号依次递减 i--, 最大索引为length-1 什么时候终止 i >= 0; 

```js 
let arr = ['red', 'green', 'blue', 'pink', 'purple'];
let newArr = [];

for (let i = arr.length-1; i >= 0; i--) {
  newArr[newArr.length] = arr[i];
};
console.log(newArr);
```

<br>

### 数组排序 (冒泡排序)
冒泡排序: 是一种算法, 把一系列的数据按照一定的顺序进行排列显示(从小到大 或 从大到小)

它会重复的走访要排序的数列, 依次比较两个元素, 如果他们的顺序错误就把它们交换位置, 走访数列的工作是重复进行 直到没有再需要交换, 也就是说数列已经排序完成, 这个算法的名字由来是因为越小的元素会经由交换慢慢浮到序列顶端 

<br>

**思路:**  
一共要走几趟, 我们用外层for循环 5个数组我们一共需要走4趟 长度就是 数组长度减去1 arr.length-1

每一趟交换的次数, 我们用内层for循环
- 第一趟 交换 4次
- 第一趟 交换 3次
- 第一趟 交换 2次
- 第一趟 交换 1次

长度就是 数组长度 减去 次数 交换2个变量

```js 
// 内层循环
0   第一趟 交换 4 次   4 
1   第二趟 交换 3 次   3 
2   第二趟 交换 2 次   2 
3   第二趟 交换 1 次   1 

0 - 4
1 - 3
2 - 2
3 - 1
```

```js
// 规律是 arr.length - i - 1
  
let arr = [5,4,3,2,1];

// 外层循环走4次, 因为最后一个元素是不需要交换的, 元素个数-1
for(let i = 0; i < arr.length - 1; i++) {

  // 里层循环管每趟的交换次数
  for(let j = 0; j < arr.length - i - 1; j++) {

    // 交换两个变量的值 前一个 和 后一个相比较
    if(arr[j] > arr[j+1]) {
      let temp = arr[j];
      arr[j] = arr[j+1];
      arr[j+1] = temp;
    }
  } 
}
console.log(arr);
```

<br><br>

## 创建函数 从实例中提取符合条件的元素 装到新数组中
```js 
function Person(name, age){
  this.name= name;
  this.age = age;
}

// 创建Person对象的实例
var per = new Person("孙悟空",18);
var per1 = new Person("猪八戒",28);
var per2 = new Person("红孩儿",8);
var per3 = new Person("蜘蛛精",16);
var per4 = new Person("二郎神",38);

//将这些person对象放入一个数组中
var perArr = [
  per,
  per1,
  per2,
  per3,
  per4,
  per5
]

console.log(perArr);
```

<br>

### 需求:
对象里有一堆人, 有的满18岁 有的不满, 创建一个函数, 可以将perArr中的满18岁的person提取出, 然后封装到一个新的数组中, 并返回

<br>

**形参arr:**  
把一个数组中的成年人信息提取出来, 但提取哪个数组不知道, 所以在最后var result = getAdult(perArr) 这里传进来一个实参, 想提取哪个就传哪个就好了
        
```js
function getAdult(arr){

var newArr = [];            
// 一、遍历arr, 获取arr中的Person对象
for(var i=0; i<arr.length; i++) {
    //现在p就是数组中的每一个元素
    var p = arr[i]

    // 二、获取到了后判断person对象的age是否大于等于18岁, 如果大于等于18, 则将对象添加到newArr中
    if(p.age<18){
      newArr.push(p);
    }
  }

  return newArr;             
}
```

<br><br>

## 去重练习

### 方式一
遍历所有元素后, 内部还要遍历 前面元素的下一个元素就是从j=i+1开始

去除数组中重复的数字, 可以使用嵌套的for循环
1. 获取数组中的每一个元素, 取出一个数字挨个去比, 相同不相同
2. 接下来往下比, 从哪开始比？自己和自己比删完都没了, 从它下一个开始比, 所以我们要把从当前元素开始的下一个元素都取出来

```js 
var arr = [1, 2 ,3 ,2 ,1 ,3 ,4 ,2 ,5]
for(i=0; i<arr.length; i++){

  // 获取当前元素后的所有元素, 为什么是i+1 因为我们要取出i后面的元素
  for(var j=i+1; j<arr.length; j++){  }   

  // 接下来要判断arr[i]和arr[j]是否相等
  if(arr[i] == arr[j]){

  // 如果相等则证明出现了重复的元素, 删后面的 则删除j对应的元素 从j开始, 删除1个 就是删除本身
  arr.splice(j,1); 

  // 当删除了当前j所在的元素以后, 后边的元素会自动补位, 此时我们将不会再比较这个元素, 所以我需要再比较一次j所在位置的元素, 这时我们j--;  ++一次, 下一个, j--一次原位置
  }
}
console.log(arr);
```

<br>

### 方式二
遍历旧数组 然后拿着旧数组元素去查询新数组, 如果该元素在新数组里面没有出现过 我们就添加, 否则不添加

使用indexOf 来判断该元素在新数组中存在与否, 如果结果为-1 说明新数组里面没有该元素

```js 
function unique(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
```

<br><br>

## 随机点名
```js
let arr = ['张三', '李四', '刘二', '大一'];
alert(arr[getRandom(0, arr.length-1)]);
```

<br><br>

### 猜数字游戏
随机生成一个1-10的整数, 我们需要用到Math.random()方法
需要一直猜到正确位置, 所以一直循环 用while循环更合适

核心算法, 使用if else if 多分支语句来判断大于 小于 等于
```js 
// 两个数的随机整数 函数
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 获得一个随机数
let random = getRandom(1, 10);
while(true) {
  let num = prompt('你来猜1-10之间的数字');
  if(num > random) {
    alert('你猜大了');
  } else if ( num < random) {
    alert('你猜小了');
  } else {
    alert('猜对了');
    break;              // 退出循环
  }
}
```

<br><br>

## 利用函数封装的方式, 翻转任意数组
```js 
function reverse(arr) {

  // 判断一下是不是数组
  if(arr instanceof Array) {
    let newArr = [];
    for(let i=arr.length-1; i>=0; i--) {
      newArr[newArr.length] = arr[i]
    }
    return newArr;
  } else {
    return 'error 这个参数要求必须是数组格式'
  }
};
let arr = reverse([1,3,4,7]);
console.log(arr);
```

<br><br>here

### 用户输入年份, 输出当前年份2月份的天数
如果是闰年, 则2月份是29天, 如果是平年则2月份是28天
if(条件里需要布尔值)
```js 
function backDay() {
  if(isRunYear(year)) {
      alert('当前年份的2月份是29天');
  } else {
      alert('当前年份的2月份是28天');
  }
}
backDay(2019);

function isRunYear(year) {
  // 上面的函数里需要用到true false 所以返回boolean
  let flag = false;
  if(year % 4 === 0 && year % 100 != 0 || year % 400 === 0){
      flag = true;
  }
  return flag;
}
```

<br><br>

## 函数作用域的相关练习: 
```js
var a =123;
function fun(){
  alert(a);
}
fun();
```

函数内定义一个a但是没有值, 找的话现在函数内部找没有的话会去外面找, 找到全局变量 

```js
var a = 123;                    
function fun(){
  alert(a);      // undefined  
  var a = 456;
}
fun();
alert(a);          // 123
```

```js
var a =123;
function fun(){

  alert(a);
  //还是一样的 局部里没有var a, 所以去全局找,  结果是123

  a = 456;
}
fun();
alert(a); 
//这是全局中输出, 全局a的值是123但是被函数内部的a = 456,修改, 所以应该输出的是456                      

var a;
function fun() {
  alert(a)
  a = 456
}
a = 123
fun()
alert(a)


var a =123;
function fun(a){
  alert(a); 
  //这里应该是undefined, 形参是a 相当于var a

  a = 456;
}      
fun();
alert(a);
//这里应该是123不是456, 因为函数内有形参a也就是定义了一个a变量, 那么a=456就是修改的函数内部的值, 跟函数外面的没有关系


var a =123;
function fun(a){
  alert(a); //123
  a = 456;
}
fun(123);
alert(a); //123
```

<br><br>

## 字符串的相关练习

### 查找字符串'abcoefoxyozzopp'中所有o出现的位置 和 次数
先查找第一个o出现的位置 然后只要indexOf()返回的结果不是-1 就继续往后查找

因为indexOf只能查找到第一个, 所以后面的查找利用第二个参数, 当前索引加1, 从而继续查找

```js 
let str = 'abcoefoxyozzopp';

// 首先查找到第一个o的索引 为3
let index = str.indexOf('o');

let count = 0;

// 3不等于-1 会接着往下一个查找
while(index != -1) {
  console.log(index);

  // 每循环一次 让count++
  count++;

  // 用到了第二个参数, index+1 4 从第4个开始找 然后找到了第6个
  // 把6赋值给index
  index = str.indexOf('o', index + 1)

  // 然后进行下一轮循环 6 != -1 从index+1 7 开始查找

  // 最后找不到就会是-1 又到了循环条件判断 -1 != -1么? false

  // 就会终止循环
}
console.log('o出现的次数是'+count);
```

<br>

### 判断一个字符串 'abcoefoxyozzopp' 中出现次数最多的字符, 并统计其次数
利用charAt() 遍历这个字符串

把每个字符都存储给对象, 如果对象没有该属性, 就为1, 如果存在了就+1

遍历对象 得到最大值和该字符

```js 
let str = 'abcoefoxyozzopp';
// 最后把值要存到对象里 声明一个空的对象
let o = {};

let arr = [];

// 遍历这个字符串
for(let i=0; i<str.length; i++) {
  // 把每一个字符取出来 放到一个变量里 每次循环都会把一个字符存到chars里
  let chars = str.charAt(i);  // chars是字符串每一个字符

  // 判断对象里有没有该属性 有就+1 没有就为0
  if(o[chars]) {      // 刚上来对象是空的
      // 如有有的话 就让它加1
      o[chars]++;     // 最开始没有走的是else 赋值为1 所以这里是可以++的
  } else {            // 没有的话 
      o[chars] = 1    // o[chars]得到的是属性值 让属性值赋值为1 第一轮因为对象为空 所以里面存的都是1        
  }
}
console.log(o);

// 遍历对象
let max = 0;
let ch = ''
for(let k in o) {
  if(o[k] > max) {
    max = o[k]

    // 把属性名也取出来
    ch = k;
  }
}
console.log(max, ch);
```

<br><br>

### 把字符串中的一个字符, 替换为 * 替换敏感词汇
```js 
let str = 'abcoefoxyozzopp';
// 终止条件是当找不到的时候
while (str.indexOf('o') !== -1) {   // 说明我能找到 也就是停止的条件就是找不到
  str = str.replace('o', '#');
}
console.log(str);
```

<br><br>

### 全选练习

### checkbox对象的属性  checked: 
设置或返回 checkbox是否应被选中 xx.checked = true | false

```html
<form method="post" action="">
你爱好的运动是？<input type="checkbox" id="checkedAllBox">全选/全不选 

<br>
<input type="checkbox" name="items" value="足球">足球
<input type="checkbox" name="items" value="篮球">篮球
<input type="checkbox" name="items" value="羽毛球">羽毛球
<input type="checkbox" name="items" value="乒乓球">乒乓球
<br>
<input type="button" id="checkedAllBtn" value="全　选">
<input type="button" id="checkedNoBtn" value="全不选">
<input type="button" id="checkedRevBtn" value="反　选">
<input type="button" id="sendBtn" value="提　交">
</form>
```

<br>

### 全选按钮
点击按钮以后4个多选框全部被选中

想要把四个多选框都选中, 那就得一个一个选吧, 所以要先遍历数组
```js
for(i=0; i<items.length; i++;){
  items[i].checked=true;      //全选
  items[i].checked=false;     //全不选
}
```


<br>

让所有复选框的checked属性 跟随 全选按钮 即可

1. 给全选按钮绑定事件
2. 将所有的复选框的checked属性值 跟 全选按钮的checked属性值一致

```js
j_tbs[i].checked = this.checked
```

<br>

### 复选框全部选中 全选才能选中
给下面所有复选框绑定点击事件, 每次点击, 都要循环查看下面所有的复选框是否有没选中的, 如果有一个没选中的 上面全选就不选中

可以设置一个变量 来控制全选是否选中

<br>

**方式1:**
```js
for(let i=0; i<j_tbs.length; i++) {

  // 给所有复选框绑定事件
  j_tbs[i].onclick = function() {

    // 声明一个变量 默认是选中状态
    let flag = ture;

    for(let i=0; i<j_tbs.length; i++) {

      // 一上来都是没选中的 所以取反
      if(!j_tbs[i].checked) {         
        flag = flase;
        break;
      }
    }

    // 检查完毕后
    j_cbAll.checked = flag;
  }
}
```

<br>

**方式2:**  
1. 获取所有为点击状态的复选框
2. 判断是点击状态的复选框的长度 和 总复选框的长度 如果相等就为true

```html
<div>
  全选按钮: <input type="checkbox" id="all">
</div>
<div>
  <ul>
    <li>
      <input type="checkbox" value="xuegao">雪糕
    </li>
    <li>
      <input type="checkbox" value="binqilin">冰淇淋
    </li>
    <li>
      <input type="checkbox" value="binggao">冰糕
    </li>
  </ul>
</div>

<script>
let ul = document.querySelector("ul")

let checkbox = document.querySelectorAll("[type='checkbox']")

let all = document.querySelector("#all")

let total = ul.querySelectorAll("[type='checkbox']")

checkbox.forEach(el => {
  el.addEventListener("click", function() {

    // 要点: 在这里
    let checkeds = ul.querySelectorAll(":checked")
    all.checked = checkeds.length == total.length
  })
})
</script>
```

<br>

### 反选按钮checkedRevBtn
点击按钮以后4个多选框选中的变成没选中, 没选中变成选中
```js
  checkedRevBtn.onclick = function(){

    for(var i=0;i<items.length;i++){

    // 判断多选框的状态
    if(items[i].checked){
      // (items[i].checked)本身就是布尔值, 如果是true 证明多选框为选中状态 则设置没选中状态
      items[i].checked =false; 
    } else {
      // 进入else则证明多选框没有选中, 则设置为选中状态
      items[i].checked =true; 
    }

    // 上面的已经ok了, 但是可以优化下, 有没有发现如果是true就设置成false, 如果是false就设置成true, 是不是相当于在原先的值上取反啊, 最省事的写法是
    items[i].checked = !items[i].checked;
  }
};
```

<br>

### 提交按钮
点击按钮以后, 将所有选中的多选框弹出, 弹出的是value属性值
```js
for(i=0; i<items.length; i++){
    alert(items[i].value);
  /*
      有没有什么问题, 即使我选择一个, 剩下的value值也会被打印出来
      也就是不管有没有选中 直接就输出了

      所以我们要先进行判断, 判断多选框是否被选中
  */
  if(items[i].checked){
      alert(items[i].value);
  }
};
```

<br>

### 全选/全不选 按钮
当该按钮为选中状态时, 4个多选框处于被选中状态, 当该按钮为没选中时, 4个多选框处于没选中状态

```js
// 设置多选框的选中状态
for(i=0; i<items.length; i++){
  items[i].checked = true;

  // 如果等于true 怎么点都是选中状态, 所以不能是true, 我们想想, 我们是想点击这个按钮后 它是选中状态, 其它4个就是选中状态, 它不是选中状态, 其它4个就不是选中状态, 所以让items[i].checked的状态和checkedAllBox.checked状态一样
  items[i].checked = checkedAllBox.checked;

  // 在事件的响应函数中, 响应函数是给谁绑定的this就是谁 给谁绑了, this就是谁 如果是函数调用就是window吧 如果是以方法来调用 就是调用方法的对象吧
  items[i].checked = this.checked;
}
```

- 如果4个多选框全都选中, 则checkedAllBox也应该选中
- 如果4个多选框没都选中, 则checkedAllBox也不应该被选中

我应该设置checkedAllBox吧, 如果这4个全选中 那么checkedAllBox应该选中  

如果4个没选中, 那么checkedAllBox就应该不选中, 那么什么时候判断这4个选没选中 当我点击4个多选框的时候, 就应该判断一下吧, 那是不是应该给4个多选框 每一个都绑定一个单击响应函数吧 

<br>

### 我们整体看看这个代码的流程
1. 我上来一点按钮, 全选/全不选按钮就会被选中, 默认是4个多选框都是选中状态
2. 进入for循环, 在for循环里对它进行判断, 如果一直没有满足条件 一直没有进入判断 则证明就是全选 进入全选是不是就是true啊
3. 如果进入判断 则证明不是全选 不是就改成false了

```js
// 我们要操作的是checkedAllBox, 获取全选/全不选的多选框
checkedAllBox.onclick = function(){
  for(i=0; i<items.length; i++){
      items[i].checked = true;
  }
  // 将全选/全不选按钮设置为选中
  checkedAllBox.checked = true;
}
```

<br><br>

## div根据方向键移动
使div可以根据不同的方向键向不同的方向移动(按左键: 向左移动)

左37 上38 右39 下40

```js
window.onload = function(){

// 为document绑定一个按键按下事件
document.onkeydown = function(event){
  event = event || window.event;

  switch(event.keyCode){
    case 37:
        // 每次在元素原来位置的基础上 移动指定距离
        box1.style.left = box1.offsetLeft - 10+"px";
        break;
    case 38:
        box1.style.top = box1.offsetTop + 10+"px";
        break;
    case 39:
        box1.style.left = box1.offsetLeft + 10+"px";
        break;
    case 40:
        box1.style.top = box1.offsetTop - 10+"px";
        break;
  };

// 我们观察下, 10 是速度, 假如我想加快速度需要改10的值, 但是得一个一个改 怎么办？定义一个变量 表示移动的速度
var speed = 10;
box1.style.left = box1.offsetLeft + speed+"px";
```

<br>

### 需求: 当用户按了ctrl以后 速度加快
```js
if(event.ctrlKey){
  speed = 50;
}
```

还是有些问题, 第一次按住的时候 会卡一下 浏览器的默认行为 以后再讲, 无论是方向也好 还是速度也好 都是在 onkeydown的事件里设置的 控制的, 这里方向是没问题的 出问题的是速度

我们想想 骑自行车 我们手控制的是方向 脚控制的是速度, 假如我们的手既要控制方向又要控制速度 是不是就要出问题了

现在onkeydown控制方向是没问题的, 那能不能再找一个控制速度呢？ 

<br>

### 要点:
1. 速度使用的是 循环定时器自动控制
2. event.keyCode -> dir -> switch方向

```js
// 创建控制方向的变量
var dir = 0; 

// 开启一个定时器, 来控制div的移动（速度）, 不管方向
setInterval(function(){

  // 现在函数是每隔30毫秒去调用一次 函数每进行一次要对switch进行一次判断
  switch(dir){
  case 37:
    box1.style.left = box1.offsetLeft - 10+"px";
    break;
  case 38:
    box1.style.top = box1.offsetTop + 10+"px";
    break;
  case 39:
    box1.style.left = box1.offsetLeft + 10+"px";
    break;
  case 40:
    box1.style.top = box1.offsetTop - 10+"px";
    break;
  };
}, 30);
```

现在的函数会每隔30秒执行一次, 每执行一次会根据dir的值来判断执行哪个代码（哪个case）dir为37往左 38往上 39往右 40往下 现在div动了么？

没动吧 因为dir是0 但函数执行了只是没有找到符合的值 我们可以通过修改dir来改变前进的方向

现在我们的定时器就相当于脚一直在蹬脚蹬子 需要一个方向 现在dir是0 所以不动, 通过修改dir可以控制方向, 那dir什么时候改？ 按的时候改吧 所以我们再返回onkeydown里

```js
document.onkeydown = function(event){
  event = event || window.event;
  
  if(event.ctrlKey){
      speed = 50;
  }

  // 使dir等于按键的值
  dir = event.keyCode;

  // 连贯了但是怎么停啊？一松手就别动了 怎么设置 我按左时 值就赋值给dir了但是松手的时候就应该取消了吧 当按键松开时, div就不再移动
  document.onkeyup = function(){
      dir = 0;
  };

  if(event.ctrlKey){
      speed = 50;
  }else{
      speed = 10;
  }
};
```

<br><br>

## 鼠标移动坐标 在 div中显示
鼠标在大div中移动时, 在小div中来显示鼠标的坐标
```html
<body>
  <div id="areaDiv"></div>
  <div id="showMsg"></div>
</body>
```

```js
// 获取两个div
var areaDiv = document.getElementById("areaDiv");
var showMsg = document.getElementById("showMsg");

// 首先得知道鼠标移入到areaDiv中了吧, 所以就得知道鼠标移动的事件吧, 然后把这个事件绑定给areaDiv是不是可就可以了
areaDiv.onmousemove = function(event){
            
    // 在showMsg中显示鼠标的坐标, 我要想知道坐标直接去问事件对象就完了, 因为事件对象中封装了一切与事件相关的信息, 怎么获取呢？ 无非是方法或者是属性
    var x = event.clientX;
    var y = event.clientY;

    // 得到的信息 显示在showMsg里
    showMsg.innerHTML = "x="+x + ", y="+y;
}
```

<br><br>

## 仿淘宝固定右侧侧边栏
有一个溜导航条, 当鼠标往下滚动的时候 导航条顶端到屏幕上方时, 就固定在那里

原先侧边栏是绝对定位

当页面滚动到一定位置, 侧边栏改为固定定位 页面继续滚动, 会让返回顶部显示出来

<br>

1. 需要用到页面滚动事件scroll 因为是页面滚动 所以绑定给document

2. 接着滚动滚动条 往下滚啊滚 当banner区域上边框到顶部时, 侧边栏就会变成固定定位

只要是页面网上滚动 就会有 scrollTop 值 根据这个值就知道什么时候到banner了 比如scrollTop:100, 当等于100的时候 就知道banner到顶了

<br>

**核心:**  
- window.pageYOffset / pageYOffset
- window.pageXOffset / pageXOffset

```html
<div class="slider-bar">
  <span class="goBack">返回顶部</span>
</div>
<div class="header w">头部区域</div>
<div class="banner w">banner区域</div>
<div class="main w">主体部分</div>
```
```js
document.addEventListener('scroll', scroll);
function scroll() {

  // 当我们页面被卷去的头部大于等于172 此时 侧边栏就要改为固定定位 banner.offsetTop 不要写在里面 那样会实时获取不准, 我们写在外面, 页面一加载我就知道具体位置在哪
  if(parseInt(pageYOffset) >= parseInt(bannerTop)) {
    sliderBar.style.position = 'fixed'
    // 到位置后把top值修改为应该在的位置
    sliderBar.style.top = y + 'px';

  } else {
    sliderBar.style.position = 'absolute';
    // 这里也好把top值设置为原来的初始位置
    sliderBar.style.top = 300 + 'px';
  }

  // 滚动到主体内容的时候 让 回到顶部 显示
  if (parseInt(pageYOffset) >= parseInt(mainTop)) {
    goBack.style.display = 'block';

  } else {
    goBack.style.display = '';
  }

  // sliderBar.style.cssText = 'position:fixed; top:0;'
}
```

<br><br>

## 滚动条到底触发事件
如果在里面添加上属性disabled="disabled"则表单项将变成不可用的状态, 当滚动条到底后才能点击

<br>

### 思考: 
我们要先检查滚动条是否到底了, 什么时候检查？上来查么？不查吧 滚动条没动吧, 查了也没有意义, 也就是说当滚动条开始动的时候我们再检查, 怎么知道滚动条开始滚动了呢？滚动条滚动是一个事件

所以我们只需要监听滚动条是否滚动, 那现在事件有了, 我们把它绑定给谁？滚动条是谁的 我就绑定给谁 滚动条是p元素的吧

```js
if(info.scrollHeight - info.scrollTop == info.clientHeight){
  
  inputs[0].disabled=false;
  inputs[1].disabled=false

}
```

<br><br>

## 获取鼠标在盒子内的坐标
我们在盒子内点击, 想要得到鼠标距离盒子左右的距离
首先得到鼠标在页面中的坐标 e.pageX, e.pageY

其次得到盒子在页面中的距离 box.offsetLeft box.offsetTop
用鼠标距离页面的坐标减去盒子在页面中的距离 = 鼠标在盒子内的坐标

移动获取的话 就用mousemove事件
```js 
box.addEventListener('click', function(event){
  event = event || window.event;
  let x = event.pageX - this.offsetLeft
  let y = event.pageY - this.offsetTop

  console.log(x, y)
})
```

<br><br>

## 跟随鼠标移动
### 要点:
1. 鼠标不断移动, 使用鼠标移动事件 mousemove
2. 在页面中移动给document注册事件
3. 图片移动需要开启绝对定位

<br>

### 核心原理:
每次鼠标移动 我们都会获得最新的鼠标坐标, 把这个x和y坐标作为图片的top, left值就可以移动图片

<br>

需求: 使div可以跟随鼠标移动

```js
// 获取 box
var box1 = document.getElementById("box1");

// 给 box 绑定事件是不行的 因为鼠标移出box之后 事件就结束了
box1.onmousemove = function(event){

  // 事件对象的话 需要解决兼容性问题
  event = event || window.event;
      
  // 获取到鼠标的坐标 --- 事件对象 添加形参 event
  var left = event.clientX;
  var top = event.clientY;

  // 设置div的偏移量
  box1.style.left = left+"px";
  box1.style.top = top+"px";
}
```

实现了 但是有没有什么问题 当页面过高之后, 会出现滚动条, 
这时如果拖动滚动条 会出现 鼠标和 div 分离的情况 能分离的范围就是 就是滚动的垂直偏移量

为什么呢？我们用了 下面两个属性是针对于 视口的 也就是说 滚动区域是获取不到坐标的
- clientX 
- clientY

用于获取鼠标在 当前的 可见窗口 的坐标

我们要改成使用下面的属性 可以获取鼠标相对于当前页面的坐标
- pageX
- pageY


由于鼠标的移动是相当于当前浏览器的可见框 原点在可见区域的左上角, 而div是相对于整个页面, 原点在整个页面的左上角, 拖动滚动条后, 鼠标的原点和div的原点不在一起, 所以才会发生分离, 那

- clientX
- clientY

是相对于窗口的 那我找一个相对于整个页面的不就行了么？
- pageX
- pageY

但是这两个属性在ie8中不支持, 那怎么办

scrollTop 是滚动条 滚动的垂直距离, 使鼠标和div分开的距离 其实就是滚动条向下拖动产生的垂直距离, 那我是不是让鼠标在可见框的原点和页面的原点重合就好了？

我把div整个往下挪就行了吧, 挪多少？  
挪scrollTop的距离就可以把我把这段距离加在垂直偏移量上, div是不是就往下走了

<br>

### 获取滚动条滚动的距离
chrome认为浏览器的滚动条是body的, 可以通过body.scrollTop来获取

火狐等浏览器认为滚动条是html的因为我是给body设置了一个高度1000px 然后html没装下才出现的滚动条, html是父元素 子元素body溢出

```js
// body滚动条的距离
var st = document.body.scrollTop;   //chrome能获取到坐标

// html根标签滚动条的距离
var st = document.documentElement.scrollTop;   //火狐等浏览器能获取到

// 怎么办呢？ 处理兼容性问题 哪个有用哪个
var st = document.body.scrollTop || document.documentElement.scrollTop;

// 现在距离有了 剩下把这段距离 加给垂直偏移量 设置div的偏移量 上面是垂直的问题, 水平也有问题 自己照着改
box1.style.left = left + sl + "px";
box1.style.top = top + st + "px";
```

<br><br>

## 模态框 **拖拽**

### pink老师的思路:
1. 点击的时候获取到鼠标在模态框的位置 (盒子内鼠标点击点 与 左边框的距离)
这个距离是固定的
```
// 页面
-------------------------------------

// 盒子
--------------------
|   x   
|  <->  o  鼠标点在盒子里面的位置
|      
|
--------------------


|
|  <->  o      比如我点到这里了 那就是说 盒子应该和点击的位置 有x的距离 
|              也就是说 o - x 就是 盒子的left的位置 比如 100 - 23 

-------------------------------------
```

2. 我们能实时获取到鼠标在页面的位置, 和实时获取到盒子left的位置, 那么
鼠标实时位置 - 鼠标在模态框里的固定位置, 那么模态框的位置也能实时求到

3. mouseup事件 在整个过程结束后也没有用了 应该清掉 要不然点击下元素对象, 再在元素对象外抬起鼠标还会触发抬起事件 还有取消默认行为的操作应该也加入
```js 
let login = document.querySelector('.login');
let mask = document.querySelector('.login-bg');
let link = document.querySelector('#link');
let closeBtn = document.querySelector('#closeBtn');
let title = document.querySelector('#title');

// 点击弹出层这个链接(link), 让mask和login显示出来
link.addEventListener('click', function(){
  mask.style.display = 'block';
  login.style.display = 'block';
})

// 点击closeBtn让mask和login隐藏起来
closeBtn.addEventListener('click', function () {
  mask.style.display = 'none';
  login.style.display = 'none';
})

// 开始拖拽, 当我们鼠标按下, 就获得鼠标在盒子内的坐标
title.addEventListener('mousedown', function(event) {
  let x = event.pageX - login.offsetLeft;
  let y = event.pageY - login.offsetTop;

  // 鼠标在盒子内的位置是固定的上面已经求出来了, 当移动时, 鼠标的实时位置 - 鼠标在模态框内固定的位置 = 模态框的left的实时位置
  document.addEventListener('mousemove', move)
  function move(event) {
    login.style.left = event.pageX - x + 'px';
    login.style.top = event.pageY - y + 'px';
  }

  // 鼠标弹起 移动事件移除
  document.addEventListener('mouseup', remove);
  // 再删掉自己
  function remove(event) {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', remove)
  }

  // 或者  这里想表达的是add这种方式移出onmouseup事件怎么移除
  document.addEventListener('mouseup', remove);
  function remove() {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', remove);
    // 取消捕获
    box.releaseCapture && box.releaseCapture();
  }
})
```

<br><br>

## 拖拽
### 拖拽流程: 
1. 当鼠标被拖拽元素上按下时（别撒手）, 开始拖拽 onmousedown
2. 当鼠标移动时被拖拽元素跟鼠标移动, onmousemove
3. 当鼠标松开时 被拖拽元素固定在当前位置, onmouseup


三步对应着三个事件
- 元素对象 -- onmousedown
- document -- onmouseup onmousemove

```js
var box1 = document.getElementById("box1");
box1.onmousedown = function(){

  document.onmousemove = function(event){
    event = event || window.event;
    // 获取鼠标坐标
    var left = event.clientX;
    var top = event.clientY;

    // 修改box1位置
    box1.style.left = left + "px";
    box1.style.top = top + "px";
  }

  // 为元素绑定一个鼠标松开事件
  // 注意: 不能给元素对象绑定 鼠标抬起事件, 因为当鼠标移动到别的元素上时 会出现放置不了的情况因为 鼠标松开事件 是绑定给box1的 当移动到box2上时, 松手后还会动 因为在box2上松手是触发box2的松手事件 1的没有 所有会跟着动 所以不能给box1绑定得给document绑定 改后状态
  box1.onmouseup = function(){}

  // 要给 document 绑定
  document.onmouseup = function(){

    // 取消coument的onmousemove事件
    document.onmousemove = null;

    // 当鼠标松开的时候 要解绑事件
    document.onmouseup = function(){

      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
};
```

<br><br>

## 修改鼠标点击位置 和 元素的位置
现在的拖拽效果都是在box1的左上角, 那怎么才能点哪拖哪呢？那点到一个地方之后, 想改成点哪拖哪的状态 所以要移动box的位置到点击点, 那移动多少？

- 向上挪动        修改top值 减去
- 向左挪动        修改left值 减去

那这段距离是多少？鼠标的话 有个clientX 鼠标的偏移量 元素的偏移量是 offsetLeft

clientX - offsetLeft 就是点击点的值 

div的偏移量 鼠标.clientX - 元素.offsetLeft
div的偏移量 鼠标.clientY - 元素.offsetTop 

那在哪里求他们的值呢？ 现在有3个响应函数

onmousedown onmousemove onmouseup点的时候已经都定了, 
所以在onmousedown里 


```js
box1.onmousedown = function(event){

event = event || window.event;

// 这时候有两个event 一样么？ 范围不一样 这个event范围更大
var ol = event.clientX - box1.offsetLeft;
var ot = event.clientY - box1.offsetTop;


document.onmousemove = function(event){

  event = event || window.event;
    // 上面得出的数字减掉    
    var left = event.clientX - ol;
    var top = event.clientY - ot;
    box1.style.left =left+"px";
    box1.style.top =top+"px";
  };
};
```

<br>

### 取消默认行为
假如按ctrl+A 再拖动的话 所有元素都会跟着一起动

我们去拖拽一个网页中的内容时, 浏览器会默认去搜索引擎中去搜索内容, 此时会导致拖拽功能异常, 这个是浏览器提供的默认行为 ,如果不希望发生这个行为, 则可以通过return false 来取消默认行为, 最简单的方式在onmousedown的最后来个return false;, 但是ie8 不起作用 现在在ie8中进行测试

```js
// 分别为两个按钮绑定单击响应函数
var btn01 = document.getElementById("btn01");
var btn02 = document.getElementById("btn02");

btn01.onclick = function(){
  alert('1');
};
btn02.onclick = function(){
  alert('2');
};
```


### 元素对象.setCapture()
设置btn01对鼠标按下的相关的事件进行捕获 不管点击谁都显示元素对象身上的事件
只有ie支持, 但是在火狐中调用时不会报错, 而如果在chrome调用 会报错

使用的时候要先进行判断
```js 
    if(box1.setCapture){
        box1.setCapture();
    }
```

<br>

### 元素对象.releaseCapture();
取消对事件的捕获

当调用一个元素的setCapture()方法以后, 这个元素将会把下一次所有的鼠标按下相关的事件捕获到自身上 或者按下按钮2 也会提示alert1 

换个说法 我给btn01设置完setCapture以后 btn01就像一个强盗一样 它把所有鼠标点击的事件都抢过来, 虽然页面上我点的02

但btn01设置了setCapture就说 点02就相当于点我 所以弹出了1
因为btn02的事件被btn01捕获了, 更横的是 不光点按钮, 鼠标进行的点击相关所有事件都被btn01抢过来显示1了

<br>

### 针对ie
btn01.setCapture();  用来处理mousedown事件 针对ie

那再回过头想想 当我拖拽的时候 别的东西会一起动的原因是 onmousedown的事件传递给了别的东西 那我这么想 当我拖拽box1的时候 我让box1变成强盗 不管拖谁 都是拖我 这样所有的事件都会揽到自己身上 就可以了 在我们的最上面写上 也就是

```js
box1.onmousedown = function(){
    // 这里写上: 设置box1 捕获所有鼠标按下的事件; 
    box1.setCapture();


// 但是还是有bug, 我希望鼠标一松开就不要捕获了 当鼠标松开时 取消对事件的捕获
document.onmouseup = function(){

// 这样的话 我们还要进行下判断, 因为setCapture只需要在ie里面用
if(box1.setCapture){
    box1.setCapture();
}
// 还是要写的 其他浏览器 认
return false

// 或者还可以这么写
box1.setCapture && box1.setCapture();
```

<br>

### 创建自定义拖动函数
那比如多个目标都想拖动 怎么办 复制么？尝试 提取一个专门用来设置拖拽的函数

```js
// 参数 开启拖拽的元素
function drag(obj) {

  //当鼠标在被拖拽元素上按下时, 开始拖拽  onmousedown
  obj.onmousedown = function(event){

  // 设置box1捕获所有鼠标按下的事件
  obj.setCapture && obj.setCapture();


  event = event || window.event;

  var ol = event.clientX - obj.offsetLeft;
  var ot = event.clientY - obj.offsetTop;

  // 为document绑定一个onmousemove事件
  document.onmousemove = function(event){
      event = event || window.event;

      var left = event.clientX - ol;
      var top = event.clientY - ot;
      
      obj.style.left = left+"px";
      obj.style.top = top+"px";
      
  };

  // 为document绑定一个鼠标松开事件
  document.onmouseup = function(){
  //当鼠标松开时, 被拖拽元素固定在当前位置	onmouseup
  //取消document的onmousemove事件
      document.onmousemove = null;

  //取消document的onmouseup事件
      document.onmouseup = null;

  //当鼠标松开时, 取消对事件的捕获
      obj.releaseCapture && obj.releaseCapture();
  };

  /* 
      当我们拖拽一个网页中的内容时, 浏览器会默认去搜索引擎中搜索内容, 
      此时会导致拖拽功能的异常, 这个是浏览器提供的默认行为, 
      如果不希望发生这个行为, 则可以通过return false来取消默认行为
      但是这招对IE8不起作用 

      所以使用 setCapture()
  */
  return false;
  };
}
```

<br>

### 整理:
```js 
let box = document.querySelector('.box');
box.addEventListener('mousedown', function(event){
  event = event || window.event;
  let x = event.clientX - box.offsetLeft;
  let y = event.clientY - box.offsetTop;
  
  // 捕获
  box.setCapture && box.setCapture();

  document.addEventListener('mousemove', drag);
  function drag(event) {
      event = event || window.event;
      box.style.left = event.clientX - x + 'px';
      box.style.top = event.clientY - y + 'px';
  }

  document.addEventListener('mouseup', remove);
  function remove() {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', remove);
      // 取消捕获
      box.releaseCapture && box.releaseCapture();
  }
  return flase;
});
```

<br><br>

## 滚轮事件的小案例

### 需求: 
- 当鼠标滚轮向下滚动时, box1变长
- 当鼠标滚轮向上滚动时, box1变短

```js
function bind(obj, eventstr, callback){
  if(obj.addEventListener){
    obj.addEventListener(eventstr,callback,false);
  }else{
    obj.attachEvent("on"+eventstr, function(){
      callback.call(obj);
    });
  }
};
```

```js
window.onload = function(){

// 获取box1
var box1 = document.getElementById("box1");

// 接下来需要知道滚轮滚没滚吧, 那给谁绑定？是不是当在div上的时候 开始吧 所以给box1绑定鼠标滚轮滚动事件

// 大部分游览器支持, 火狐不行
box1.onmousewheel = function(){
  alert("滚了");
};

// 为火狐绑定鼠标滚轮滚动事件
bind(box1, "DOMMouseScroll", function(){
  alert("滚了");
});

// 接下来我们思考下, 我们在ie中触发的alert函数 和 在火狐中触发的alert函数 是一个么？不是吧, 在ie中是触发的上面的函数吧, 火狐里触发的是下面的函数吧 这两个函数用不用做两个业务？业务需求都是一样的吧, 我们可以这么改: 

function fun(){
  alert("滚了");
}

box1.onmousewheel = fun;
bind(box1, "DOMMouseScroll", fun);

// 还可以怎么改？
box1.onmousewheel = function(){
  alert("滚了");      //测试看看
};

bind(box1, "DOMMouseScroll", box1.onmousewheel);

// 上面的是什么意思？我将下面的这个函数
function(){
  alert("滚了");
};
// 赋值给了box1.onmousewheel 然后我将box1.onmous ewheel 作为回调函数传递给了 bind 所以是同一个函数

// 接下来看下面的
box1.onmousewheel = function(event){
    

    // 所以我们要判断 鼠标滚轮滚动的方向？谁知道？事件对象知道 event
    event = event || window.event;


    // event.wheelDelta    大部分浏览器
    // event.detail        火狐浏览器


    // 滚轮滚动方向
    if(event.wheelDelta > 0 || event.detail < 0){
        // 说明向上滚动
        box1.style.height = box1.clientHeight - 10+"px";
    }else{
        box1.style.height = box1.clientHeight + 10+"px";
    }
    // 有没有问题, 假如body有滚动条的时候 和 我们现在做的效果 有冲突, 当滚轮滚动时, 如果浏览器有滚动条, 滚动条会随之滚动, 这是浏览器的默认行为, 如果不希望发生, 则可以 取消默认行为 
    return false;
    event.preventDefault();

    // 火狐的话不好用, 火狐是通过bind函数绑定的 使用addEventListener()方法绑定响应函数, 取消默认行为时不能使用return false
    event.preventDefault();

    // 但是ie8 又出现了问题,ie8不支持, event.preventDefault(); 如果直接调用会报错 所以要判断
    event.preventDefault && event.preventDefault;
};
```

<br>

### 另一个老师控制方向的思路
```js
function fn(event){
  let dir = '';
  if(event.wheelDelta){
    dir = event.wheelDelta>0?'up':'down';
  }
  if(event.detail){
    dir = event.detail<0?'up':'down';
  }
}
```

<br><br>

##  5秒钟之后关闭广告

### 核心思路
5秒之后, 就把这个广告隐藏起来 display:none
```js
setTimeout(function(){
  img.style.display = 'none'
}, 5000)
```

<br><br>

## 定时器简单的应用
需求: 让一个数字, 在页面上 自动变化
```html
<h1 id="count">1</h1>
```
```js
window.onload = function(){
// 获取count
var count = document.getElementById("count");
// 使count中的内容, 自动切换
count.innerHTML = "2";
count.innerHTML = "3";
count.innerHTML = "4";

// 这么写
for(var i=0; i<10; i++){
    count.innerHTML = i;
}

// 直接输出9了, 但是看不到变化的过程, 怎么才能看到变化的过程, 希望一段程序, 可以间隔一段时间执行一次, 可以使用定时调用
var num = 1;
setInterval(function(){
    count.innerHTML = num++;
}, 1000);

// 上面的方法有个Number类型的返回值 我们看看返回值是多少
var timer = setInterval(function(){
    count.innerHTML = num++;
}, 1000);

console.log(timer);     //1
// 怎么停下来呢？关闭定时器
clearInterval(timer);       //假如写这的话 还没有执行就关了 不能写这

var timer = setInterval(function(){
    count.innerHTML = num++;

    // 写了个什么时候关闭定时器的条件
    if(num == 11){              
        clearInterval(timer);
    }
}, 1000);
};
```

<br><br>

### 案例 每个2秒自动切换图片
需求:我希望图片能每隔2秒切换一张, 自动切换
```html
<body>
  <img id="img1" src="links/1.jpg">    
</body>
```

```js
window.onload = function(){
  var img = document.getElementById("img1");

  // 创建一个数组来保存图片的路径
  var imgArr = [
      "links/1.jpg",
      "links/2.jpg",
      "links/3.jpg",
      "links/4.jpg",
      "links/5.jpg"
  ];

  // 创建一个变量, 用来保存当前图片的索引
  var index = 0;

  // 定义一个定时器标识
  var timer: 

// 开启一个定时器来自动切换图片
setInterval(function(){
   // 使索引自增
    index++;

    // 判读索引是否超过最大索引
    if(index >= imgArr.length){
        // 则将index设置为0
        index = 0;
    }

    // 根据上面的判断 换一种写法
    index = index % imgArr.length;
/*
  这么写什么意思？
  当index为0的时候, imgArr.length是5 0%5=0
  当index为1的时候, imgArrlength是5  1%5=1
  当index为2的时候, imgArrlength是5  2%5=2
  当index为3的时候, imgArrlength是5  3%5=3
  当index为4的时候, imgArrlength是5  4%5=4
  当index为5的时候, imgArrlength是5  5%5=0
  当被除数小于除数时 余数就是被除数
*/
        
    // 修改img1的src属性
    img1.src = imgArr[index];

},1000)
```

<br><br>

### 追加需求
现在是一上来就开始切换 我希望 让你切换 你再切换 加个按钮现在希望你点开始的时候再动 不点开始别动

```js
//  为btn01绑定点击响应函数
var btn01 = document.getElementById("btn01");
btn01.onclick =function(){
    timer = setInterval(function(){
    index++;
    if(index >= imgArr.length){
        index = 0;
    }
    img1.src = imgArr[index];
},1000)
};
```

```js
// 我想看某一张照片时 想停 再来一个让它停止的按钮
var btn02 = document.getElementById("btn01");
btn02.onclick =function(){ 
    // 点击按钮以后 停止图片的自动切换 只需要关闭定时器, 定义一个变量用来保存定时器的标识 这个要在btn01的函数外面定义, 如果定义在btn01函数里面, btn02的函数是看不见的
    clearInterval(timer);
};
```

<br><br>

### 残留的一些问题:
功能是实现了 但是有一些的问题
1. 我在上面声明了一个定时器的变量,  var = timer 没有赋值 我在点击开始按钮的时候才开始赋值, 所以在点btn02时没有赋值, 所以应该是个undefined吧, 可是测试结果是 点btn02时 并没有报错

### clearInterval() 可以接收任何参数 null undefined都可以
如果参数是有效的定时器标识 则停止定时器, 如果参数是无效的 则什么也不做

2. 现在是1秒切换一回, 但连续点开始后 发现速度越来越快 而且停止也不好用了 我是1秒切换一次 按理说速度应该是比较慢吧 现在我的定时器是写在单击响应函数里面了 目前来讲, 我们每点击一次按钮 就会开启一个定时器 虽然一个定时器很慢, 但我点了多次 相当于10个定时器切换这个页面 为什么停不了 每开一个定时器就出现一个, 相当于timer的重新赋值, 但是关闭的话 只能关闭最新的一个 所以再开启定时器之前, 需要将上一个定时器关闭吧

```js
    btn01.onclick =function(){

        // 开启定时器之前, 将当前元素中的其它定时器关闭
        clearInterval(timer);

        timer = setInterval(function(){
        index++;
        if(index >= imgArr.length){
            index = 0;
        }
        img1.src = imgArr[index];
    },1000)
};
```


<br><br>

## box移动效果
```
* 参数: 
* 	obj:要执行动画的对象
* 	attr:要执行动画的样式, 比如: left top width height
* 	target:执行动画的目标位置
* 	speed:移动的速度(正数向右移动, 负数向左移动)
*   callback:回调函数, 这个函数将会在动画执行完毕以后执行
```
```js
function move(obj, attr, target, speed, callback) {
    //关闭上一个定时器
    clearInterval(obj.timer);

    //获取元素目前的位置
    var current = parseInt(getStyle(obj, attr));

    //判断速度的正负值 如果从0 向 800移动, 则speed为正 如果从800向0移动, 则speed为负
    if(current > target) {
      //此时速度应为负值
      speed = -speed;
    }

    //开启一个定时器, 用来执行动画效果 向执行动画的对象中添加一个timer属性, 用来保存它自己的定时器的标识
    obj.timer = setInterval(function() {

        //获取box1的原来的left值
        var oldValue = parseInt(getStyle(obj, attr));

        //在旧值的基础上增加
        var newValue = oldValue + speed;

        //判断newValue是否大于800 从800 向 0移动
        //向左移动时, 需要判断newValue是否小于target
        //向右移动时, 需要判断newValue是否大于target
        if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }

        // //将新值设置给box1
        obj.style[attr] = newValue + "px";

        // //当元素移动到0px时, 使其停止执行动画
        if(newValue == target) {
            //达到目标, 关闭定时器
            clearInterval(obj.timer);

            //动画执行完毕, 调用回调函数 这里为了不需要回调函数时 不会报错 如果有你就调 没有的话就不调了
            callback && callback();
        }

    }, 30);
}
```

<br>

### 回调函数: 
在前一个动画执行完毕后执行, 最好放在一个代表前一个动画执行完毕的条件里
```js 
if(newValue == target) { 
  clearInterval(obj.timer);
  callback && callback();
}
```

```js
* 定义一个函数, 用来获取指定元素的当前的样式
* 参数: 
* 		obj 要获取样式的元素
* 		name 要获取的样式名

function getStyle(obj, name) {

  if(window.getComputedStyle) {
      //正常浏览器的方式, 具有getComputedStyle()方法
      return getComputedStyle(obj, null)[name];
  } else {
      //IE8的方式, 没有getComputedStyle()方法
      return obj.currentStyle[name];
  }

}
```

<br>

### 用addEventListener做的 可以看看
```js
btn1.addEventListener('click', function(){
    let _this = this;
    move(10, 1200, this);
});
btn2.addEventListener('click', function(){
    let _this = this;
    move(10, 0, this);
});

function move(speed, target, _this, callback) {
    clearInterval(_this.timer);
    let currentX = box.offsetLeft;
    if (currentX > target) {
        speed = -speed;
    };

    _this.timer = setInterval(function (event) {
        event = event || window.event;
        let originalX = box.offsetLeft;
        let finalX = originalX + speed;
        if ((speed > 0 && finalX >= target) || (speed < 0 && finalX <= target)) {
            finalX = target
        }
        box.style.left = finalX + 'px';
        if (finalX === target) {
            clearInterval(_this.timer);

            // // 在这里代表上面的函数执行完毕, 所以如果想效果连续就要把回调放在一个代表前一个函数执行完的条件内, 所以回调放在这里
            callback && callback();
        }
    }, 10)
}
```

<br><br>

## 节流阀
防止轮播图按钮连续点击造成播放过快

节流阀目的: 当上一个函数动画内容执行完毕, 再去执行下一个函数动画, 让事件无法连续触发

<br>

### 核心思路:
利用回调函数, 添加一个变量来控制, 锁住函数 和 解锁函数 在某些条件下 关上水龙头 在某些条件下打开水龙头

```js 
// 开始

let flag = true;
if(flag) {
  flag = false;

  do somethind;   
}
```

如果flag为true 进来我就给你变成false 锁住函数 然后可以做一些事情 现在就相当于水龙头已经关闭了 当再次点击的时候 你就没办法再放水了 因为是false了,if(flag) 为false了 就没办法执行里面的代码了 就没办法播放图片了

但不能一直不播放啊 什么情况下可以播放呢? 利用回调函数 动画执行完毕, flag = true > 打开水龙头 这时候我们又进入的新的开始

```js 
let flag = true;

arrowR.addEventListener('click', function () {
  if(flag) {

    // 先给它关了 进来后先给你取反 然后执行下面的代码 
    flag = false;

    if(num >= ul.children.length-1){
        ul.style.left = 0;
        num = 0;
    }
    num++;

    // 当动画执行完毕后 我们打开节流阀
    animate(ul, -num*focusWidth, function(){
        flag = true;
    });

    circle++;
    circle %= ol.children.length;
    circleChange();
  }
});
```

<br><br>

### 案例 返回顶部
滚动窗口至文档中的特定位置

<br>

### window.scroll(x, y);
可以让窗口的滚动到指定位置 不用加单位 直接写数字即可
```js
window.scroll(0, 100)
```

带有动画的返回顶部 我们可以继续使用我们封装的动画函数

我们把动画函数中跟left的值改为跟页面垂直滚动距离相关的就可以了(window.pageYOffset)

<br>

### window.pageYOffset
页面滚动了多少我们可以根据window.pageYOffset来得到

```js 
goBack.addEventListener('click', function () {
  // 里面的x和y 不跟单位的 直接写数字即可
  // window.scroll(0, 0);
  // 因为是窗口滚动 所以对象是window
  animate(window, 0);
});

function animate(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    let step = (target - window.pageYOffset) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (window.pageYOffset == target) {
      clearInterval(obj.timer);
      callback && callback();
    }
    // 页面滚动到哪里 用这个方法 不用加单位
    window.scroll(0, window.pageYOffset + step);
  }, 15);
}
```

<br><br>

## 筋斗云
- 鼠标经过某个小li, 筋斗云跟到这当前小li位置
- 鼠标离开这个小li, 筋斗云复原为原来的位置
- 鼠标点击了某个小li, 筋斗云就会留在点击这个小li的位置

<br>

### 思路:
利用动画函数做动画效果 原先筋斗云的起始位置是0

鼠标经过某个小li, 把当前小li的offsetLeft位置, 作为目标即可 鼠标离开某个小li, 就把目标值设为0

点击某个小li之后 就把筋斗云的起始位置定位点击的位置, 下次就从点击的位置开始进行下一次的运动

如果点击了某个小li 就把li当前的位置存储起来, 作为筋斗云的起始位置

```js 
let cloud = document.querySelector('.cloud');
let lis = document.querySelectorAll('.c-nav ul li');

// 定义一个筋斗云的起始位置变量
let current = 0;

// 给所有的小li绑定点击事件
for(let i=0; i<lis.length; i++) {
lis[i].addEventListener('mouseenter', function(){
  let target = this.offsetLeft;
  move(cloud, target);
})

// 鼠标离开回到起始位置
lis[i].addEventListener('mouseleave', function(){
  // move(cloud, 0);      这里就不是0了 应该是动态获取的起始位置
  move(cloud, current);
})

// 当鼠标点击就把当前位置作为目标值
lis[i].addEventListener('click', function () {
  // 点击小li后 把当前的li的offsetLeft的值作为li的新的起始位置
  current = this.offsetLeft;
  
})
}

// 自定义动画函数
function move(obj, target, callback) {
  clearInterval(obj.timer);
  obj.timer = setInterval(() => {

    let nowX = obj.offsetLeft;
    let step = (target - nowX) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);

    cloud.style.left = nowX + step + 'px'

    // 停止条件
    if(nowX == target) {
        clearInterval(obj.timer);
        callback && callback();
    }
  }, 15);

}

```

<br><br>

## 双击禁止选中文字
```js
window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
```

<br><br>

## 将文本框的文字处于选中状态
```js
input.select();
```

<br><br>

## 自动调用事件 没有on 事件名后加();
```js
this.blur();
this.click()
```

<br><br>

## 移动端案例
touchstart touchmove touchend可以实现拖动元素

但是拖动元素需要当前手指的坐标值, 我们可以使用 targetTouches[0]里面的pageX, pageY

### 移动端拖动的原理: 
手指移动中, 计算出手指移动的距离, 然后用盒子原来的位置 + 手指移动的距离

没办法拿到手指的移动距离, 但是我们得到手机的当前坐标

<br>

### 手指移动的距离: 
手指滑动中的位置 减去 手指刚开始触摸的位置

比如第一次触摸div的时候位置是10px 然后手指移动到了30px的位置上 30-10移动了20px的距离

<br>

### 拖动元素三部曲:
1. 触摸元素 touchstart: 获取手指初始坐标, 同时获得盒子原来的位置
2. 移动手指 touchmove:  计算手指的移动距离, 并且移动盒子
3. 离开手指 touchend

注意: 手指移动也会触发滚动屏幕所以这里我阻止默认的屏幕滚动
```js
event.preventDefault();
```

<br><br>

# 点击切换图片练习
```html
<body>
<p id="info">一共 5 张图片, 当前第 1 张</p>
<div id="outer">
  <img src="./links/1.jpg" alt="">
  <button id="prev">上一张</button>
  <button id="next">下一张</button>
</div>
</body> 

<script>
window.onload = function(){
// 获取 按钮
var prev = document.getElementById("prev");
var next = document.getElementById("next");

// 保存 图片路径
var imgArr = [
  "links/1.jpg",
  "links/2.jpg",
  "links/3.jpg",
  "links/4.jpg",
  "links/5.jpg"
];

// 保存当前正在显示的图片的索引, 因为默认显示的是第一个
var index = 0;

// 获取 img 标签
var img = document.getElementsByTagName("img");

// 使用上面的方式获取 img 的话 需要添加[0]
var img = document.getElementsByTagName("img")[0];
      
prev.onclick = function() {
  // 点击 上一张按钮的时候 index--
  index--;

  // 边界判断
  if(index < 0){
    index = 0;
  };

  // 根据index设置 img src 属性
  img.src = imgArr[index];
};

next.onclick = function() {
  // 切换到下一张 是index自增
  index++;

  // 边界判断
  if(index > imgArr.length-1){
    index = imgArr.length-1;
  };
  
  img.src = imgArr[index];
};
<script>
```

<br><br>

# 根据不同时间, 页面显示不同图片, 同时显示不同的问候语

### 需求:
- 如果上午打开页面, 显示上午好, 显示上午的图片
- 如果下午打开页面, 显示下午好, 显示下午的图片

根据系统不同时间判断, 所以需要用到日期内置对象 利用多分支语句设置不同的图片

需要一个图片, 并且根据时间修改图片 操作元素的src属性 需要一个div元素 显示不同的问候语, 修改元素内容即可

```js
let date = new Date();
let h = date.getHours();

if (h < 12) {
  img.src = 
  div.innerHTML = 

} else if (h < 18) {
  img.src = 
  div.innerHTML = 
}
```

<br><br>

## 百度换肤
给4个小图片利用循环注册点击事件, 当我们点击了这个图片, 让我们页面背景改为当前图片

核心算法 把当前图片的src路径取过来 给body做为背景

```js
document.body.style.backgroundImage = 'url('+this.src+')'
```


