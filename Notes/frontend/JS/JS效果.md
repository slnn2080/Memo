# JS 效果

## 移动端的轮播图

### 要点:
我们声明一个全局变量 定为false, 在move逻辑里修改为true

```js
let flag = false;

let focus = document.querySelector('.focus');
let ul = focus.children[0];
let w = focus.offsetWidth;

let index = 0;
let timer = setInterval(function(){
  index++;
  let translatex = -index * w;
  ul.style.transition = 'all .3s';
  ul.style.transform = `translateX(${translatex})`;
},1000)


ul.addEventListener('transitionend', function(){

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

## 服务器的返回的json里面, 根据id号 返回对象
```js
let data = [
  {
    id:1,
    name:'家电',
    goods: [{id:11, gname:'冰箱'}, {id:12, gname:'洗衣机'}]
  }, 
  {
    id:2,
    name:'服饰'
  }
]

function getId(json, id) {
  let obj = {};
  json.forEach(function(value, index){
    if(value.id == id) {
      obj = value;
      return value;

    } else if (value.goods && value.goods.length > 0) {
      obj = getId(value.goods, id);
    }
  })
  return obj;
}
let result = getId(data,11);
console.log(result);
```

<br><br>

## 京东放大镜效果

### html部分: 不要用百分比, 要不后面的比例关系不好求
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

<br>

### js部分解析:
整个案例可以分为3个功能模块

<br>

**1.**
1. 鼠标经过小图片盒子, 黄色的遮挡层 和 大图片盒子显示, 离开隐藏2个盒子功能
2. 黄色的遮挡层移动 在它的父盒子范围内移动
3. 大图片跟随移动功能
```js
// 拿到外部的js文件, 应该加载这句话
window.addEventListener('load', function(){ }})
```

<br>

**2.**  
把鼠标的坐标给遮挡层是不合适的, 因为遮挡层坐标以父盒子为准  
首先是获得鼠标在盒子内的坐标, 之后把数值给遮挡层作为left 和 top值  
遮挡层是不能超出imgbox的范围的 增加判断条件 如果<0 就设置为0  

注意:  
前几个功能部分 我做成了拖拽功能, 这不是拖拽功能 在imgBox中移动, 把坐标给mask就可以

<br>

**3.**  
我用的是100%设置的盒子大小, 后面的比例关系不好算 我就没做

移动黄色遮罩层, 大图片跟随移动的功能  
遮罩盒子移动, 大图片跟着一起动, 那遮罩盒子移动的距离 和 大图片移动的距离一样么 ?

不一样 比如遮罩盒子是300 x 300像素的, 大盒子是800 800像素的 移动的距离也不一样
所以这里采取的是比例的关系

```
1 / 2 = x / 4 x是几 1 X 4 / 2
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

<br>

## 不让别人复制文字, 或者阻止弹出右键菜单

### contextmenu 禁止鼠标右键菜单
主要控制应该何时显示上下文菜单, 主要用于程序员取消默认的上下文菜单
比如鼠标的右键菜单
```js
document.addEventListener('contextmenu', function(e){
  e.preventDefault();
})
```

<br>

### selecstart 禁止鼠标选中
这个事件会在选中文字后触发
```js
document.addEventListener('selecstart', function(e){
  e.preventDefault();
})
```

<br>

## 判断闰年
我们的年份要么是闰年 要么是平年  
闰年: 能够被 4 整除 且 不能整除 100 的为闰年 2004 就是闰年, 1901 不是闰年, 或者能够被 400 整除的就是闰年

```js
let year = prompt('请输入年份');
if(year % 4 === 0 && year % 100 != 0 || year % 400 === 0){
  alert(`${year}年是闰年`);
}else{
  alert(`${year}年是平年`);
}
```

<br>

## 补 0
```js
let num = prompt('请输入数字');
let result = num < 10 ? '0' + num : num;
console.log(result);
```

<br>

## 按下键盘 s 键 跳入到 input 标签中
**核心思路:**  
检测用户是否按下了 s 键, 如果按下了 s 键, 就把光标定位到搜索框里  
使用键盘事件对象里面 keyCode 判断用户按下的是否是 s 键位  
搜索框获得焦点: 使用 js 里面的 focus()方法  

<br>

### input 对象.focus() 让搜索框获得焦点;

```js
let search = document.querySelector('.inp');
document.addEventListener('keydown', function(event){
  event = event || window.event;
  if(event.keyCode === 83){
      search.focus();
  }
});
// 如果用down事件的话, 按下s会同时把s写进搜索框里, 因为它是按下就会被触发
// 这里我们使用up比较合适
```

<br>

## 输入文字后, 会弹出较大的框在里面实时显示输入内容

比如有的时候 屏幕上的搜索框有点小, 里面输入文字也会比较小 这时候我们就可以用这种方法

**核心思路:**  
快递单号输入内容时, 上面的大号字体盒子显示(这个盒子里的字号更大)  
表单检测用户输入: 给表单添加键盘事件  
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

**为什么不用 keydown 和 keypress 事件?**  
keydown keypress 在文本框里面的特点: 他们两个事件触发的时候, 文字还没有落入文本框中

<br>

## 打字机效果
```js
let str = '希望我能给她俩一点点的幸福';
let wordSite = document.querySelector('.word');
for(let i=1; i<=str.length; i++){
  setTimeout(function () {
    wordSite.innerHTML = str.substr(0, i);
  },(i-1)*300);
}
```

<br>

## 动态生成表格
以前接触的表格都是在页面中写死的, 其实这些数据应该是用后台获取的, 比如一个班的成绩 每个人的成绩不一样同学人数也会增加减少 所以不能写死 我们要根据数据响应的发生变化
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
// 循环创建行
for(let i=0; i<datas.length; i++){              //外层for循环遍历的是行, tr

  //1, 创建行 tr
  let tr = document.createElement('tr');
  tbody.appendChild(tr);
  // 行里面创建td, 单元格的数量取决于每个对象里面的属性的个数

  // 2, 创建的跟数据相关的单元格
  // 遍历对象用for in in哪? in数组里每一个对象吧datas[i], 这里的i就用的外层for循环的i
  for(let n in datas[i]){          //里面的for循环管的是列 也就是每个对象里面内容
      // 这里每循环一次又要创建一个单元格
      let td = document.createElement('td');
      // 单元格里存放的是每一个对象里的属性值
      td.innerHTML = datas[i][n]
      tr.appendChild(td);
  }

  // 3, 创建有删除 的 单元格
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

<br>

## 查询商品的案例
有一个表, 表内有很多的信息
按照价格查询() - ()   搜索
按照名称查询 ()       查询

```
id      产品名称       价格
1       小米          3999
2       oppo          999
3       荣耀          1299
4       华为          1999
```

<br>

### 需求1:商品价格不是写死的而是根据数据显示出来的 
使用 forEach() 来遍历数组

<br>

### 需求2:可以根据价格显示产品
使用filter方法

**筛选条件:**   
大于等于第一个表单里面的值, 小于等于第二个表单里面的值  
当我们点击了按钮, 就可以根据我们的商品价格去筛选数组里面的对象

<br>

### 需求3:可以根据商品名称显示商品
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

// 把数组渲染到页面中
// 自动按照arr.length遍历的
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

<br>

## 简单版发布留言

### 要点 1:  
在于 下面的很严谨 判断文本域里有没有文本 没有的话 return false


### 要点 2: 
留言的话 都是最新的在最上面

<br>

**思路:**  
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

## 删除留言

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

<br>

## 导航条处的下拉菜单

html结构:
```js
<ul class='nav'>
  <li>                // 经过它的时候
      <a></a>
      <ul>            // 第二个孩子ul显示 / 隐藏
          <li></li>
          <li></li>
          <li></li>
      </ul>
  </li>
</ul>

```

**思路:**  
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

<br>

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

  // 开始给5个li 设置索引号 -- ------------ 动态添加属性
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

<br>

## 换肤效果

### 需求: 点击图片 背景的图片会更换
把 img 的 src 取出来 给 body 就可以了

<br>

## 鼠标移入表格行后 该行有高亮的效果

### 应用事件: onmouseover onmouseout


**思路:**  
我们把表头行放到 thead 里 经过它的时候不变色, 我们把主体放到 tbody 里面 我们获取 tbody 里面的行 鼠标经过 tr 行, 当前的行变颜色, 鼠标离开去掉当前的背景颜色
```js
// 1 创建一个类 关于高亮颜色, 以后修改直接改css就可以
this.className = 'bg'  这里直接覆盖就可以 并不是所有的都要 +=
// 2 鼠标离开
this.className = ''
```

<br>

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

**另一种做法:**
- 先设置外部变量 _index = 0;
- 将正在显示的元素利用index设置为隐藏 currenbox[_index].style.display = none;
- 得到点击元素的下标 index
- 把当前元素的状态设置为显示 box[index].style.display = block;
- 更新外部 _index 的下标

<br>

## 密码框输入密码后 判断位数不对
判断的事件 是 当文本框失去焦点开始判断  
如果输入正确 则提示正确的信息 颜色为绿色小图标变化  
如果输入不是 6-16 位, 则提示错误信息颜色为红色 小图标发生变化  
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

<br>

## 循环精灵图
首先这个精灵图图片的排列一定是有规律的 一般精灵图竖着排列就是为了让它有规则 能被循环出
利用 for 循环 修改精灵图片的 背景位置 background-position

```js
图片索引    图片坐标Y       规律就是索引 x 44
  0          0
  1          44
  2          88
```

让循环里面的 i 索引号 x 44 就是每个图片的 y 坐标
```js
let lis = document.querySelectorAll('li');
for(let i = 0; i<lis.length; i++){
  lis[i].style.backgroundPosition = `0 -${i}*44px`;
}
```

<br>

## 显示隐藏文本框里面的内容
当鼠标点击文本框时, 里面的默认文字隐藏, 当鼠标离开文本框时, 里面的文字显示  
如果获得焦点, 判断表单里面内容是否是默认文字, 如果是默认文字 就清空表单内容  
如果失去焦点, 判断表单内容是否为空, 如果为空, 则表单内容改为默认文字  

<br>

### 需要事件:   
获得焦点 onfocus, 失去焦点 onblur

```js
<input type="text" value='手机' id='test'>

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

<input type="text" value='手机' id='test'>


```

<br>

## 点击显示密码
思路: 点击眼睛按钮, 把密码框类型改为文本框就可以看见里面的密码  
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

<br>

## 到时间发送短信
点击按钮后, 该按钮60秒之内不能再次点击, 防止重复发送短信

**核心思路:**  
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

<br>

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

<br>

## 案例 怎么判断用户在哪个终端打开的页面 实现跳转
在head标签里面写个script标签, 把下面的代码复制到script标签里面
```js
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPad|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|WOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  window.location.href = '';      //手机
} else {
  window.location.href = '';      //电脑
}
```

<br>

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

<br>

## 倒计时

### 思路:
输入的时间(将来的时间) - 现在的时间 = 剩余的时间, 即倒计时  
但是不能拿着时分秒相减, 会是负数 我们可以拿时间戳来计算  

用户输入的总毫秒数 - 现在时间的总毫秒数 = 剩余时间的总毫秒数  
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

<br>

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

## 依次延迟显示效果 跟 delay 属性相关 -- 出去有先后顺序, 收回时先出后回
```
(i\*0.15)
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

<br>

## 点击按钮 跳到下一张图片

```js
prev.onclick = function(){
  index--;
  img.src = imgArr[index];
};
```

<br>

## 波浪式的开机动画

```js
let color = ['red', 'yellow', 'blue', 'pink', 'deepblue', 'white', 'red', 'yellow', 'blue', 'pink', 'deepblue']

let span = document.querySelectorAll('.inner span');
for(let i=0; i<span.length; i++){
  span[i].style.animation = 'move .3s '+(i*50)+'ms infinite alternate linear'

  span[i].style.color = color[i];
}
```

<br>

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

<br>

## 视频 --- 进度条长度 和 按钮位置关联
需求: 主区域的拖动按钮得动，进度的 width 也得动

```js
//当前视频播放的时间
video.currentTime

// 视频的总播放时间
video.duration  

// 得到了一个 时间的比例
video.currentTime/video.duration 


// 拖动按钮能跑的最大长度  进度条的总长度 - 按钮的长度
progress.clientWidth - btn.offsetWidth

// 时间比例 x 这个总长度 就是 定时器100执行一次 走的距离
```

```js
btn.style.left = rateProgress.style.width = (video.currentTime/video.duration)*(progress.clientWidth - btn.offsetWidth) + 'px';
```

<br>

## 视频 --- 点到进度条上任意位置，视频会从这个位置开始播放

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
所以我要知道  @点击的位置是多少秒@  从这个秒数开始播放就可以了  

假如一共是400秒，一共是1000米  
首先我要知道 1秒能跑多少米，1000 / 400  
总长度 / 总时间 = 单位时间内跑多少米  

```js
(progress.clientWidth - btn.offsetWidth) / video.duration
```

然后我得知道 我跑了多少米了 也就是点到哪了  
我点的位置：
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

<br>

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

<br>

## 曲线运动

让对象去做曲线运动其实就是一个 sin 图像（从左到右 波峰上下的图像）
而且它的 left 和 top 要满足正弦图像

<br>

### 定义角度 和 波动系数
```js
let deg = 0;
let ratio = 100;
```

<br>

### X 轴上是弧度(弧度值 = 角度值\*PI/180)
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

<br>

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

<br>

## 当滚动条滚动到指定位置 添加动画效果

先创建动画  
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