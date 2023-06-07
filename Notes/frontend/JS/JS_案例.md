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

<br>

## 滚动条滚动到指定位置
- 不能用getboundingClientRect(), 因为它是获取到视口的 滚动条的话原点会滚进去 所以要获取到定位父元素的 所以使用offsetTop

- 滚动条滚动不要设置px 就是数字

- 停止定时器的时候 要写== 不要写>= 要不往上走的话 第一次执行完定时器就停了 会出问题

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

### A12排序
```js
let arr = ["B3","D2","F1","A9","D12","A2","C1","Z0","B1"]

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

--- 精进

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

--- 精进2: 两个sort合并为一个
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

### 日期格式化
- 2019年 5月 1日 星期三

> 方法一: 使用swithc case语句 判断传入的数字 改为汉字
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

> 方法二: 利用了数组, 注意周日一定要放在前面 它的数字为0, 把得到的week当做index
```js 
  let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let time = `${year}年${month}月${day}日 ${arr[week]}`;
  console.log(time);
```

----------------

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

----------------

### 获取距离1970-1-1起 至今的毫秒数 --- 时间戳
- 毫秒数永远不会重复的

> getTime()         
> valueOf()
```js 
  let date = new Date();
      
  console.log(date.getTime());
  console.log(date.valueOf());
```

> +new Date()   也可以获得总的毫秒数  最常用的写法
```js 
  let date = +new Date();
  console.log(date);
```

> Date.now()    也可以获得总的毫秒数 不考虑兼容性的话可以这么写
```js 
  console.log(Date.now())
```

----------------

### 倒计时案例
- 思路:
- 输入的时间 - 现在的时间 = 剩余的时间, 即倒计时
- 但是不能拿着时分秒相减, 会是负数 我们可以拿时间戳来计算

    用户输入的:
        总毫秒数 - 现在时间的总毫秒数 = 剩余时间的总毫秒数

- 然后把剩余的毫秒数转为天时分秒
- 输入时间: 因为活动从什么时间开始是用户决定的 活动开始的时间

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

----------------

### 案例: 电话号码的模糊处理
> 字符串.repeat(整数)
- 将一个字符串复制几次
```js 
  console.log('abc'.repeat(2));   abcabc
```

- 思路:
- 将电话号码使用slice提取 提取留下几个字符, 使用*来拼接
```js 
  let num = 18698712060

  function handleP(num, len=3) {

    // 提取到18698712  剩下的使用 *** 代替(拼接)
    return String(num).slice(0, len*-1)+'*'.repeat(len)
  }

  let res = handleP(num, 3)
  console.log(res);
```

----------------

### for循环打印星星

> 追加字符串的方式
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

> 5行5列的星星
- 利用双重for循环
- 思路: 里层循环负责一行打印5个星星, 外层循环负责打印 5 行
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

> 打印倒三角形
- 思路:
1, 一共有10行, 但是每行的星星个数不一样, 因此需要用到双重for循环
2, 外成的for循环 控制行数, 循环10次可以打印10行
3, 内层的for循环 控制每行的星星的个数 但是每行的星星的个数是不一样的

- 算法:
> 让里层循环的j 等于 行号   j=i
- 里面循环:  j=i; j<=10; j++;
- 内层循环是从i开始的(j=i)
- 1行: 首先外层循环的i等于1, 然后里层循环就要走全部的, 这是 j=i 也就是 j=1, j<=10那就是说能打印10个星星, 里层的10个星星打印结束后 开是走第二轮 i++
- 2行: 外层的i等于2, 然后里层的走全部, j=2, j<=10, 也就是能打印9个星星
- 3行: 外层的i等于3, 然后里层的走全部, j=3, j<=10, 也就是能打印8个星星
```js 
    let str = '';
    for(let i=1; i<=10; i++){    // 外层循环负责行数
      for(let j=i; j<=10; j++){  // 里层循环打印的个数不一样, j=i
        str = str + '☆'
      }
      str = str + '\n';
    }
    console.log(str);
```

> 打印9 9乘法表
- 思路:
1, 外层的for 控制行数 打印9行
2, 内层的for 控制每行的公式

- 算法
> 每一行的公式的个数 正好和行数一致, j<=i
- 1行 1个, 2行 2个, 3行 3个 ...
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


> 求1 - 100 之间所有整数的累加和

- 需要for循环
- 需要一个存储结果的变量 sum 但是初始值一定是0
- 核心算法: sum = sum + i;

```js 
    let sum = 0;
    for(let = i; i<=100; i++){
        sum = sum + i;
    }
```

> 用户输入人数 求成绩的平均值
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

> 质数练习
- 在页面中接受一个用户输入的数字, 并判断该数是否是质数

- 解析：
- 质数, 只能被1和它自身整除的数, 1不是质数也不是合数 质数是必须大于1的自然数
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


> 质数的优化练习
- 优化1
```js 
    // 开启计时器
    console.time("test")        

    for(i=0; i<=100; i++){
        var flag = true         
        for(j<2; j<i; j++){
            if(i%j==0){
                flag=false;

           ---- 优化在这里 ----
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

- 优化解析:
- 如果不写break则会挨个进行i%j==0, 比如i=18 假如不写break则会18除以2-17之间所有的数
- 但是假如除到9发现已经等于0 则10-17之间的数字就不用继续计算了 所以写上break能大大减少计算步骤  


- 优化二：
```js 
    console.time("test")

    for(i=0; i<=100; i++){
        var flag = true

        ---- 优化在这里 ----
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

- 优化解析:
    如果j是97, 那么我们要提取的是2-96之间的数字, 
    如果j是96, 那么我们要提取的是2-95之间的数字, 与第一次的提取结果重复了吧
    
    再举例:
    36的因数, 1和36, 2和18, 3和12, 4和9, 6和6, 因数都是成对出现的, 在6和6两个因数相等的时候, 
    再往下就没有新的因数了, 再找又是重复的了

    那么6和6 和 36之间的关系是？ 根号下36
    
    所以, 对于97来说, 用不用找到96了？不用, 找到谁合适？ 找到根号下97就可以
    所以, 这里面i的值定为97有点大, 应该是根号下97就可以

----------------

### for循环打印星星练习(嵌套的for循环)
- 我们可以把里面的循环看做是外层循环的语句
- 外层循环循环一次, 里面的循环执行全部
```js 
    for(let i = 0; i<5; i++){
        for(let j = 0; j<i+1; j++){
            document.write('*');
        }
        document.write('</br>')
    }
```

执行顺序:
    1 先执行外成for循环一次
    2 再执行内部for循环
    3 内部for循环依次执行循环, 到全部
    4 外层循环执行第2次
    5 内部for循环依次执行循环, 到全部


- 需求：
- 通过程序, 在页面中输出如下的图形：

    *               1  <1  i=0
    **              2  <2  i=1
    ***             3  <3  i=2
    ****            4  <4  i=3
    *****           5  <5  i=4


> 正方形星星：
- 思路:
- 外成循环负责打印5行
- 内层循环负责打印每行的5个星星

    *****
    *****
    *****
    *****
    *****

- 执行几次高度就是多少, 外层是控制高度
```js
    for(i = 0; i <5; i++){
        document.write("*****<br />");
    }
```

- 我们在循环的内部, 再创建一个循环, 用来控制宽度
```js
    for(i = 0; i <5; i++){

        for(j=0; j<5; j++){
            document.write("*<br />");
        }
        document.write("<br />");
    }
```
```js 我们外部的循环执行一次, 内部的循环执行5次```


> 正三角形:

    *               1行  j<1  i=0
    **              2行  j<2  i=1
    ***             3行  j<3  i=2
    ****            4行  j<4  i=3
    *****           5行  j<5  i=4

- 思路:
- 这个图形和矩形相比, 高度是不用动的, 不同的地方在于宽度
- 观察下i和行号的关系, i+1 正好是行号, j<i+1

- 每加一行 宽度加1

---

> 正三角形的另一种思路
- 思路:
- 每一行的个数正好和行数一致, j<=i

---

> 倒三角形：

*****           1行  j<5(5-0)  i=0
****            2行  j<4(5-1)  i=1
***             3行  j<3(5-2)  i=2
**              4行  j<2(5-3)  i=3
*               5行  j<1(5-4)  i=4

```js
for(i = 0; i<5; i++){

    for(j=0; j<5-i; j++){
        document.write("*<br />");
    }

    //内层循环完成一次, 外层输出一个换行
    document.write("<br />");       
}
```

--- 

> 倒三角的另一种思路
```js
for(let i = 0; i<5; i++){
    for(let j = i; j<5; j++){
        document.write('*');
    }
    document.write('</br>')
}
```

> 追加字符串的方式
```js 
    let str = '';
    for(let i = 0; i<5; i++){
        for(let j = i; j<5; j++){
            str = str + '*';
        }
        console.log('</br>')
    }
```

----------------

### for循环的练习

> 打印99乘法表

    1*1=1
    1*2=2 2*2=4
    1*3=3 2*3=6 3*3=9
    1*4=4 2*4=8 3*4=12 4*4=16
                                9*9=81

- 解析:
- 这题跟星号题差不多, 当做图形题来看, 图形的话就会有高和宽
- 高是多少？99乘法表, 从1到9, 应该是9行, 外成应该循环9次

- 创建一个外部循环, 用来控制乘法表的高度
```js
    for(i=1; i<10; i++){
        console.log(i);
    }
```

- 高度有了, 我们再来看宽度
    第一行一个式子, 宽度就是1
    第二行二个式子, 宽度就是2
    第三行三个式子, 宽度就是3
    第九行九个式子, 宽度就是9

- 所以创建一个内部循环来控制宽度
```js
    for(i=1; i<10; i++){
        for(j=1; j<=i; j++){
            document.write("*");
        }
    }
```

- 现在图形出来了, 但是不能输出星, 我们得输出式子
- j在前, i在后

    for(i=1; i<10; i++){
        for(j=1; j<=i; j++){
            document.write(j+"*"+i+"="+i*j+"&nbsp;&nbsp;");
        }
        document.write("<br />")
    }



> 打印出1-100之间所有的质数

1. 接下来分析下什么是质数, 只有能被它本身整除的数

2. 先打出1-100之间所有的数
```js
var flag=true;
for(i=2; i<=100; i++) {
    console.log(i)
}
```

3. 判断i是不是质数  
判断i是否是质数, 先要获取2-i之间所有的数,j < i
```js
for(j=2; j<i; j++) {
    console.log(j)
}
```

4. 数有了接下来就是判断, i是否能被j整除, 证明i是质数很难, 因为2-i之间的数字很多
所以证明它不是质数, 一旦进入下面的判断, 肯定不是质数
```js
if(i%j == 0){
    这里需要创建一个变量用来保存结果, 传出去传到下一步
    flag=false;
}

if(flag){
    console.log(i)
}
```

----------------

### 循环语句练习

- 需求：
- 假如投资的年利率为5%, 试求从1000块增长到5000块, 需要花费多少年？

- 思考：
- 我需要先想停止条件, 这里到5000停止, 所以可以给它设置为停止条件
```js 
    // 定义一个变量, 表示当前的钱数
    var m = 1000;

    m *= 1.05;      //第一年的钱数
    m *= 1.05;      //第二年的钱数
    m *= 1.05;      //第三年的钱数
    m *= 1.05;      //第四年的钱数

    循环一次是一年, 但是到5000是多少年？

    所以我们需要定义一个计数器, 所谓的计数器就是一个变量, 用来保存变量执行的次数

    var count = 0;
    count++;

    上面的太麻烦, 所以定义个while循环

    //如果是钱小于5000或者大于5000就会停止
    while(m < 5000){
        m *= 1.05;
        count++;
    }

    总结下从新写遍：
    eg：
    var m = 1000;
    var count = 0;

    while(m < 5000){
        m *= 1.05;
        count++;            //计数器
    }

    console.log("一共需要"+ count + "年"); 
```
----------------

### 数组的练习
> 求数组 [2,6,1,7,4] 里面所有元素的和 以及 平均值
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

> 求数组[2,6,1,77,52,25,7]中的最大值

- 思路:
- 声明一个最大值的变量max, 默认最大值可以取数组中的第一个元素
- 遍历这个数组, 把里面每一个数组元素 和 max 相比较
- 如果这个数组元素大于max 就把这个数组元素存到max里面, 否则继续比较下一轮
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

> 将数组['red', 'green', 'blue', 'pink']转换为字符串, 并且用 | 或其它符号分割, 输出: 'red|green|blue|pink'
```js 
    let arr = ['red', 'green', 'blue', 'pink'];
    let str = '';
    let sep = '|';
    arr.forEach(function(value, index){
        str += arr[index]+sep;
    });
    console.log(str);
```

> 新建一个数组, 里面存放10个整数(1-10)
```js 
    let arr = [];
    for(let i = 0; i <= 10; i++) {
        arr[arr.length] = i+1;
    };
    console.log(arr);
```

> 筛选数组 --- 将[2, 0, 6, 1, 77, 0, 52, 0, 25, 7]中大于10的元素选出来, 放进新数组中

- 思路1: 
- 因为newArr.length可以动态监测数组里的元素, 让筛选出来的数组添加到新数组中的最后一位



```js 
    
    let arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7];
    let newArr = [];
    for(let i = 1; i <= arr.length; i++) {
        if(arr[i] >= 10) {

            ---- 对这里解析 ----
            newArr[newArr.length] = arr[i];
            newArr.push(arr[i]);
        }
    };
    console.log(newArr);

    // 不能写成 newArr[i]  因为 当值为77的时候满足条件 此时的i为4 也就是 newArr[4] = arr[4]; 造成了 0 1 2 3 为empty 我们的newArr[0] 应该从0开始 依次递增
```

- 思路2: 
- 既然应该从0开始 我们在外面定义一个变量j=0
    newArr[j] = arr[i]
    j++

```js
    let arr = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7];
    let newArr = [];
    let j = 0;
    for(let i = 1; i <= arr.length; i++) {
        if(arr[i] >= 10) {

            ---- 对这里解析 ----
            newArr[j] = arr[i];
            j++;
        }
    };
    console.log(newArr);
```


> 删除指定数组元素
- 要求: 
- 将数组 [2, 0, 6, 1, 77, 0, 52, 0, 25, 7] 中的0去掉后, 形成一个不包含0的新数组

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


> 翻转数组
- 要求: 
- 将数组['red', 'green', 'blue', 'pink', 'purple']的内容反过来存放

- 思路: 把旧数组中的最后一个元素 取出来 给新数组 作为第一个

    把索引号4 取出来 给新数组0
    把索引号3 取出来 给新数组1
    把索引号2 取出来 给新数组2
    把索引号1 取出来 给新数组3
    把索引号0 取出来 给新数组4

    新数组索引号依次递增 用到newArr.length
    旧数组索引号依次递减 i--, 最大索引为length-1
    什么时候终止 i >= 0; 

```js 
    let arr = ['red', 'green', 'blue', 'pink', 'purple'];
    let newArr = [];

    for (let i = arr.length-1; i >= 0; i--) {
        newArr[newArr.length] = arr[i];
    };
    console.log(newArr);
```


> 数组排序 (冒泡排序)
- 冒泡排序: 
- 是一种算法, 把一系列的数据按照一定的顺序进行排列显示(从小到大 或 从大到小)

``` 
    它会重复的走访要排序的数列, 依次比较两个元素, 如果他们的顺序错误就把它们交换位置, 走访数列的工作是重复进行 直到没有再需要交换, 也就是说数列已经排序完成, 这个算法的名字由来是因为越小的元素会经由交换慢慢浮到序列顶端 
```

- 思路:
- 一共要走几趟, 我们用外层for循环
    5个数组我们一共需要走4趟
    长度就是 数组长度减去1 arr.length-1

- 每一趟交换的次数, 我们用内层for循环
    第一趟 交换 4次
    第一趟 交换 3次
    第一趟 交换 2次
    第一趟 交换 1次

    长度就是 数组长度 减去 次数

- 交换2个变量

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


> 创建函数 从实例中提取符合条件的元素 装到新数组中
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
- 需求:
    对象里有一堆人, 有的满18岁 有的不满, 创建一个函数, 可以将perArr中的满18岁的person提取出, 然后封装到一个新的数组中, 并返回


- 形参arr:
    把一个数组中的成年人信息提取出来, 但提取哪个数组不知道, 
    所以在最后var result = getAdult(perArr) 这里传进来一个实参, 想提取哪个就传哪个就好了
        
- 步骤1：
```js
    function getAdult(arr){

        var newArr = [];            // 创建一个新的数组
        return newArr;              // 将新的数组返回
    }

    //想提取哪个就传进来哪个就好了, 所以这里传的是perArr,  就是想将perArr中的成年人给提取出来
    var result = getAdult(perArr);  

    console.log(result);            //result里面就一个空的数组
```

- 步骤2：
    接下来要把形参arr中成年人的信息提取出来吧, arr里有几个对象？5个吧
    我需要把这5个对象取出来吧
```js
    function getAdult(arr){

        var newArr = [];            
        // 一、遍历arr, 获取arr中的Person对象  

        // 二、获取到了后判断person对象的age是否大于等于18岁. 如果大于等于18, 则将对象添加到newArr中

        return newArr;             
    }

    按照上述思考流程 如下：
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


> 去重练习
>   > 方式一
- 要点, 遍历所有元素后, 内部还要遍历 前面元素的下一个元素就是从j=i+1开始

- 去除数组中重复的数字, 可以使用嵌套的for循环
1. 获取数组中的每一个元素, 取出一个数字挨个去比, 相同不相同
2. 接下来往下比, 从哪开始比？自己和自己比删完都没了, 从它下一个开始比, 所以我们要把从当前元素开始的下一个元素都取出来

    var arr = [1, 2 ,3 ,2 ,1 ,3 ,4 ,2 ,5]
```js 

    for(i=0; i<arr.length; i++){

        // 获取当前元素后的所有元素, 为什么是i+1 因为我们要取出i后面的元素
        for(var j=i+1; j<arr.length; j++){  }   

        // 接下来要判断arr[i]和arr[j]是否相等
        if(arr[i] == arr[j]){

        // 如果相等则证明出现了重复的元素, 删后面的 则删除j对应的元素
        arr.splice(j,1);        //从j开始, 删除1个 就是删除本身

        // 当删除了当前j所在的元素以后, 后边的元素会自动补位, 此时我们将不会再比较这个元素, 所以我需要再比较一次j所在位置的元素, 这时我们j--；
        j--;    // j++一次, 下一个, j--一次原位置

        }       
    }
    console.log(arr);
```

- 整理:
```js
    var arr = [1,2,3,2,2,1,3,4,2,5];
    for(var i=0; i<arr.length; i++){
        for(j=i+1; j<arr.length; j++){
            if(arr[i] == arr[j]){
                arr.splice(j,1);
                j--;
            }
        }
    }
```

> 方式二
- 思路: 
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


> 筛选数组
- 有一个包含工资的数组[1500, 1200, 2000, 2100, 1800]要求把数组中工资超过2000的删除, 剩余的放到新数组里

----------------

### 查询商品的案例
- 有一个表, 表内有很多的信息

- 按照价格查询 () - ()   搜索
- 按照名称查询 ()        查询

  id        产品名称         价格
  1           小米          3999
  2           oppo          999
  3           荣耀          1299
  4           华为          1999

- 需求1:    
- 商品价格不是写死的而是根据数据显示出来的 
- 使用 forEach() 来遍历数组

- 需求2:    
- 可以根据价格显示产品

    - 使用filter方法
    - 筛选条件: 
    - 大于等于第一个表单里面的值, 小于等于第二个表单里面的值
    - 当我们点击了按钮, 就可以根据我们的商品价格去筛选数组里面的对象

- 需求3:    
- 可以根据商品名称显示商品
- 如果查询数组中唯一的元素, 用some()方法更合适, 因为它找不到这个元素, 就不在进行循环 效率更高


> 要点1:
- 表中的数据结构 我们使用forEach的时候 value就代表了里面的每一个对象 我们可以通过 value.的方式来取得 比如 value.id value.pname

> 要点2:
- *some()方法中要使用return true来终止循环*
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

> 代码部分:
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


> 案例随机点名
```js
    let arr = ['张三', '李四', '刘二', '大一'];
    alert(arr[getRandom(0, arr.length-1)]);
```

> 猜数字游戏
- 随机生成一个1-10的整数, 我们需要用到Math.random()方法
- 需要一直猜到正确位置, 所以一直循环
- 用while循环更合适
- 核心算法, 使用if else if 多分支语句来判断大于 小于 等于
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

----------------

### 案例 日期的格式化 倒计时
> 日期的格式化
- 月份要加1
- 星期可以用数组
```js 
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dates = date.getDate();
    let day = date.getDay();

    // 第一个必须是星期日 因为获得的是0
    let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    console.log(`今天是${year}年${month}月${dates}日 ${arr[day]}`);
```

> 封装一个返回当前的时分秒
```js 
    function getTimer() {
        let time = new Date();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();

        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        
        return `${h}:${m}:${s}`;
    };

    let result = getTimer();
    console.log(result);
```


> 倒计时
- 思路:
输入的时间(将来的时间) - 现在的时间 = 剩余的时间, 即倒计时
但是不能拿着时分秒相减, 会是负数 我们可以拿时间戳来计算

用户输入的总毫秒数 - 现在时间的总毫秒数 = 剩余时间的总毫秒数
然后把剩余的毫秒数转为天时分秒

输入时间: 因为活动从什么时间开始是用户决定的 活动开始的时间

> 毫秒转换为 天, 时, 分, 秒

d = parseInt(总秒数 / 60 / 60 / 24);
h = parseInt(总秒数 / 60 / 60 % 24);
m = parseInt(总秒数 / 60 % 60);
s = parseInt(总秒数 % 60);

```js 
    // 形参time 是用户输入的时间, 也是预计活动开始的时间 将来的时间
    function countTime(time){

        // 返回的是到当前时间总的毫秒数
        let nowTime = +new Date(); 

        // 用户输入时间总的毫秒数
        let inputTime = +new Date(time);

        // 剩余时间总得毫秒数
        // let times = inputTime - nowTime;
        // 剩余时间总得毫秒数 转为 秒数 拿着秒数计算更精确些
        let times = (inputTime - nowTime) / 1000;

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

----------------

### 函数的相关练习

> 利用函数求任意两个数的和
```js 
    function sum(a, b){
        return a+b;
    }
    let result = sum(1,2);
    console.log(result);
```

> 利用函数求任意两个数之间的和
```js 
    function sum(a, b){
        let result = 0;
        for(let i=a+1; i<b; i++){
            result = result + i;
        }
        console.log(result);
    }
    sum(1,9);
```


> 定义一个函数, 判断一个数字是否是偶数, 如果是返回true, 否则返回false
```js 
    function panduan(a){
        return a%2 == 0; 
    }
    var result = panduan(10);
    document.write(result); 
```


> 定义一个函数, 可以根据半径计算一个圆的面积, 并返回计算结果

```js 
    function area(r){
        return 3.14*r*r;
    }

    var result = area(5);
    document.write(result); 
```

> 利用函数 求两个数的最大值
```js 
    function getMax(num1, num2) {
        if(num1 > num2) {
            return num1
        } else {
            return num2
        }

        return num1 > num2 ? num1 : num2;
    }
```

> 利用函数求数组 [5,2,99,101,67,77]中的最大值
```js 
    function getMax(arr) {
        let max = arr[0];
        for(let i=0; i<arr.length; i++) {
            if(arr[i] > max) {
                max = arr[i]
            }
        }
        return max;
    };
    console.log(getMax([5,2,99,101,67,77]));
```

> 利用函数求任意个数的最大值
```js 
    function getMax() {
        let max = arguments[0];
        for(let i=0; i<arguments.length; i++){
            if(arguments[i] > max) {
                max = arguments[i];
            }
        }
        return max
    };
    let result = getMax(1,3,4,7,99);
    console.log(result);
```

> 利用函数封装的方式, 翻转任意数组
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

> 利用函数冒泡排序
```js 
    function sort(arr) {
        for(let i=0; i<arr.length-1; i++) {
            for(let j=0; j<arr.length - i - 1; j++) {
                if(arr[j] > arr[j+1]) {
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        return arr;
    }
```

> 函数可以调用另外一个函数
- 因为每个函数都是独立的代码块, 用于完成特殊的任务, 因此经常会用到函数相互调用的情况
```js 
    // 我在fn1里面调用了fn2
    function fn1() {
        console.log('1');
        fn2();
    }
    fn1();

    function fn2() {
        console.log('2');
    }
```
- 执行顺序:
- 1 先有的fn1函数声明 没有调用不执行 到fn1()
- 2 到了fn1()后 回头再执行fn1函数声明里面的代码 打印了1 又发现调用了fn2
- 3 然后再跳到fn2这个函数上, 然后打印了一个2


> 用户输入年份, 输出当前年份2月份的天数
- 如果是闰年, 则2月份是29天, 如果是平年则2月份是28天
- if(条件里需要布尔值)
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

----------------

### 函数作用域的相关练习：
```js
    var a =123;                     
    function fun(){
        alert(a);
    }
    fun();
```

- 函数内定义一个a但是没有值, 找的话现在函数内部找没有的话会去外面找, 找到全局变量 

------

```js
    var a = 123;                    
    function fun(){
        alert(a);      // undefined  
        var a = 456;
    }
    fun();
    alert(a);          // 123
```

------

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

------ 

    var a =123;
    function fun(a){
        alert(a); 
                //这里应该是undefined, 形参是a 相当于var a

        a = 456;
    }      
    fun();
    alert(a);   
                //这里应该是123不是456, 因为函数内有形参a也就是定义了一个a变量, 那么a=456就是修改的函数内部的值, 跟函数外面的没有关系

------

    var a =123;
    function fun(a){
        alert(a);                   //123
        a = 456;
    }
    fun(123);
    alert(a);                       //123

```

----------------

### 字符串的相关练习
> 查找字符串'abcoefoxyozzopp'中所有o出现的位置 和 次数
- 思路:
- 先查找第一个o出现的位置
- 然后只要indexOf()返回的结果不是-1 就继续往后查找
- 因为indexOf只能查找到第一个, 所以后面的查找利用第二个参数, 当前索引加1, 从而继续查找

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

> 判断一个字符串 'abcoefoxyozzopp' 中出现次数最多的字符, 并统计其次数
- 思路:
- 利用charAt() 遍历这个字符串
- 把每个字符都存储给对象, 如果对象没有该属性, 就为1, 如果存在了就+1
- 遍历对象 得到最大值和该字符

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

> 把字符串中的一个字符, 替换为*  替换敏感词汇
> while (str.indexOf('o') !== -1) 终止条件是当找不到的时候
- 思路用循环来做

```js 
    let str = 'abcoefoxyozzopp';
    while (str.indexOf('o') !== -1) {   // 说明我能找到 也就是停止的条件就是找不到
      str = str.replace('o', '#');
    }
    console.log(str);
```

----------------

### 案例 用户名验证
- 功能需求:
- 如果用户名输入合法, 则后面提示信息为 用户名合法 并且颜色为绿色
- 如果用户名输入不合法, 则后面提示信息为 用户名不符合规范, 并且颜色为绿色

- 分析:
- 用户名只能为英文字母 数字 下划线或者短横线组成, 并且用户名长度为6-16
- 首先准备好这种正则表达模式 /^[a-zA-Z0-9-_]{6,16}$/
- 当表单失去焦点就开始验证
- 如果符合正则规范, 则让后面的span标签添加right类
- 如果不符合正则规范, 则让后面的span标签添加wrong类

```js 
    let inp = document.querySelector('.name');
    let span = document.querySelector('span');

    inp.onblur = function() {
        let reg = /^[a-zA-Z0-9-_]{6,16}$/;
        let flag = reg.test(inp.value);
        if(flag) {
            span.className = '';
            span.classList.add('right');
            span.innerHTML = 'ok';
        } else {
            span.className = '';
            span.classList.add('wrong');
            span.innerHTML = '您输入的用户名不符合规范';
        }
    }
```

----------------

### 全选练习

```js 相关练习在day14里```

> checkbox对象的属性  checked：
- 设置或返回 checkbox是否应被选中
xx.checked = true | false

```js 
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

> 全选按钮
- 点击按钮以后4个多选框全部被选中
- 想要把四个多选框都选中, 那就得一个一个选吧, 所以要先遍历数组
```js
    for(i=0; i<items.length; i++;){
        items[i].checked=true;      //全选
        items[i].checked=false;     //全不选
    }
```

> 反选按钮checkedRevBtn
- 点击按钮以后4个多选框选中的变成没选中, 没选中变成选中
```js
    checkedRevBtn.onclick = function(){

        for(var i=0;i<items.length;i++){

        // 判断多选框的状态
        if(items[i].checked){
            // (items[i].checked)本身就是布尔值, 如果是true 证明多选框为选中状态 则设置没选中状态
            items[i].checked =false；
        } else {
            // 进入else则证明多选框没有选中, 则设置为选中状态
            items[i].checked =true；
        }

        // 上面的已经ok了, 但是可以优化下, 有没有发现如果是true就设置成false, 如果是false就设置成true, 是不是相当于在原先的值上取反啊, 最省事的写法是
        items[i].checked = !items[i].checked;
        
    }
};
```


> 提交按钮
- 点击按钮以后, 将所有选中的多选框弹出, 弹出的是value属性值
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

> 全选/全不选 按钮
- 当该按钮为选中状态时, 4个多选框处于被选中状态, 当该按钮为没选中时, 4个多选框处于没选中状态

```js
    // 设置多选框的选中状态
    for(i=0; i<items.length; i++){
        items[i].checked = true;

        // 如果等于true 怎么点都是选中状态, 所以不能是true, 我们想想, 我们是想点击这个按钮后 它是选中状态, 其它4个就是选中状态, 它不是选中状态, 其它4个就不是选中状态, 所以让items[i].checked的状态和checkedAllBox.checked状态一样
        items[i].checked = checkedAllBox.checked;

        // 在事件的响应函数中, 响应函数是给谁绑定的this就是谁 给谁绑了, this就是谁

    如果是函数调用就是window吧
    如果是以方法来调用 就是调用方法的对象吧
        items[i].checked = this.checked;
```

- 如果4个多选框全都选中, 则checkedAllBox也应该选中
- 如果4个多选框没都选中, 则checkedAllBox也不应该被选中

- 我应该设置checkedAllBox吧, 如果这4个全选中 那么checkedAllBox应该选中  如果4个没选中, 那么checkedAllBox就应该不选中, 那么什么时候判断这4个选没选中 当我点击4个多选框的时候, 就应该判断一下吧, 那是不是应该给4个多选框 每一个都绑定一个单击响应函数吧 

```js
    for(i=0; i<items.length; i++){
        items[i].onclick = function(){

        // 函数触发后应该干什么啊？判断4个多选框是否被选, 还得是一个一个判断吧
        for(j=0; j<items.length; j++){

        // 将checkedAllBox设置为选中状态
        checkedAllBox.checked = true;


    // 先不看下面的for循环 这个是什么效果？只要我一点items 上来我就把上面的 全选/全不选按钮选中了
    if(items[j].checked){
    // 如果items[j].checked为ture能不能说明4个被全选？不能吧如果为true只能说明有一个被全选 得4个全为true才能证明被全选吧那就麻烦了, 你得4个都看一遍才能知道是不是全选吧, 那应该怎么改那换个想法, 只要有一个没选中则就不是全选吧
    }; 
    
    改成：

    if(!items[j].checked){

    // 一旦进入这个判断则证明 不是全选状态, 那我能干什么？那我应该把checkedAllBox设置成false吧 将checkedAllBox设置为选中状态
    checkedAllBox.checked = false;
    // 这里只设置了false 没有true也就是说 只有一种状态取消再点上 这个按钮就没变化了
```

> 我们整体看看这个代码的流程
1. 我上来一点按钮, 全选/全不选按钮就会被选中, 默认是4个多选框都是选中状态
2. 进入for循环, 在for循环里对它进行判断, 如果一直没有满足条件 一直没有进入判断 则证明就是全选 进入全选是不是就是true啊
3. 如果进入判断 则证明不是全选 不是就改成false了


> 看看有没有修改的地方, 看看j的循环
- 假如我开始的时候取消足球, 就意味着变成false了, 也就是当执行循环, 也就是j=0的时候, 我们就知道结果了 j=1 2 3 4 就没必要看了吧, 所以一旦进入判断 就有结果了, 循环就没必要执行了

    加上 break；


> 问题1:
- 我点击全选按钮后, 全选/全不选按钮没变化
- 点全不选按钮, 全选/全不选按钮 还是没对应的变化

```js
// 我们要操作的是checkedAllBox, 获取全选/全不选的多选框
checkedAllBox.onclick = function(){
    for(i=0; i<items.length; i++){
        items[i].checked = true;
    }
    // 将全选/全不选按钮设置为选中
    checkedAllBox.checked = true;
```

----------------

### 添加删除记录 - 删除 练习

- 自定义删除tr的响应函数
```js
function delA(){
    var tr = this.parentNode.parentNode;
    var name = tr.getElementsByTagName("td")[0].innerHTMl; 
    var flag = confirm("确认删除"+name+"么？");
    if(flag){
        tr.parentNode.removeChild(tr);
}}
```

```js
// 为每一个超链接都绑定单击响应函数, 既然是每一个 就需要遍历
for(i=0; i<allA.length; i++){
    allA[i].onclick = function(){ 

    // 如果调用全局作用域中的避免重复代码的响应函数
    allA[i].onclick = delA;
```
- 知识点：响应函数中的this, 这里点击哪个超链接 this就是谁
- 思考：
- 我的知道点的是哪个吧？我的响应函数是给allA绑定的吧, 我要是点击第一个delete是应该触发第一个响应函数吧 既然是响应函数 就应该有 this 吧 用this的话 3个delete点哪个就是哪个吧

- 响应函数里的this就是你绑定那个事件的函数 给谁绑定就是谁, 点谁this就是谁 有this之后了 我们就要考虑 我点delete删除的是所在行的tr, 那现在我们只有a 我能不能通过a 获取到 tr tr和a是什么关系, 爷爷 孙子的关系 所以我们可以先获取a的父元素 td 然后再获取td的父元素 tr

```js
    // 获取当前的tr
    var tr = this.parentNode.parentNode;    // a的父元素的父元素

    // 删除该行
    tr.parentNode.removeChild(tr);

    // 知识点：取消超链接的默认行为：也可以在a标签的href的值里写上 href="javascript:;
    return false;
```   

> 点击按钮以后, 添加一个员工的信息
- 做一个新功能之前, 不要着急我们要先想一下功能的业务流程, 写代码也就是把你的思路用程序展现出来就行了

- 添加之前, 要获取到员工填写的信息, 信息是内容吧, 要想获取到该内容, 要先获取到该内容的对象, 获取员工的name email 和 salary

- 这个获取的是对象, 加上value就是内容
```js
    var name = document.getELementById("empName").value;
    var email = document.getELementById("email").value;
    var salary = document.getELementById("salary").value;
```

- 接下来干什么？添加么？ 有了信息后 添加之间要先添加tr吧 或者说保存到tr里吧, 格式应该是这样的：
- 需要将获取到的信息保存到tr中, 需要一个一个的去创建吧
```js 
    
    <tr>
        <td>Jerry</td>
        <td>jerry@sohu.com</td>
        <td>8000</td>
        <td><a href="deleteEmp?id=002">Delete</a></td>
    </tr>
```

- 创建tr
    var tr = document.createElement("tr");

- 创建4个td
    var nameTd = document.createElement("td");
    var emailTd = document.createElement("td");
    var salaryTd = document.createElement("td");
    var aTd = document.createElement("td");

- 创建一个a元素
    var a = document.createElement("a");

- 创建文本节点：
    var nameText = document.createTextNode(name);
    var emailText = document.createTextNode(email);
    var salatText = document.createTextNode(salary);
    var delText = document.createTextNode("Delete");

- 将文本添加到td中
    nameTd.appendChild(nameText);
    emailTd.appendChild(emailText);
    salaryTd.appendChild(salaryText);

- 向a中添加文本
    a.appendChild(delText);

- 向a中添加href属性
    a.href="javascript:;";

- 将a添加到td中
    aTd.appendChild(a);

- 将td添加到tr中
    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(salaryTd);
    tr.appendChild(aTd);

- 为新添加的a再绑定一个单击响应函数, 可以把上面创建好的函数复制进来
因为重复性代码, 所以可以放进全局作用域中, 调用

    a.onclick = delA;       

- 获取employeeTable中的tbody
    var tbody = employeeTable.getElementsByTagName("tbody")[0];

- 将tr添加到tbody中
    tbody.appendChild(tr);

- 上面这么写完, delete会出现问题 是<a>Delete</a> 但是没有href属性 没办法点击, 返回去在a标签中添加属性, 原先的tr在tbody中, 但是我们添加的tr在tbody外 所以最好要把我们的tr放在tbody中

- 添加完新员工信息后, 点击Delete不好用了 为什么？因为单击响应函数是在页面的最上面绑定的 一加载就绑定好了 但是新添加的信息是后来的 它来的时候 上面的早绑定好了, 所以它并没有响应函数, 所以要重新给它们绑定下

                        
                        
> 换一种方式：
- 其实我们应该能发现 上面的一堆代码就是在 拼下面的额一个结构, 然后将这个结构添加到tbody中
<tr>
    <td>Jerry</td>
    <td>jerry@sohu.com</td>
    <td>8000</td>
    <td><a href="deleteEmp?id=002">Delete</a></td>
</tr> 
```

<script>
// 但是我们看一下 是不是 就是向tbody中添加一个tr呢？, 是不是可以 tbody.innerHTML 往里写一个tr呢, 我们先创建tr

    var tr = document.createElement("tr");
    // 设置tr中的内容
    tr.innerHTML = "<td>"+name+"</td>" +
                "<td>"+email+"</td>" +
                "<td>"+salary+"</td>" +
                "<td><a href='javascript:;'>Delete</a></td>" ;

    // 获取刚刚添加的a元素 并为其绑定点击响应函数
    var a = tr.getElementsByTagName("a")[0]        //获取到a的对象了吧
    a.onclick = delA;

    // 这时 我们添加进去的新信息 其实是在tbody
    var employeeTable = document.getElementById("employeeTable");
    var tbody = employeeTable.getElementsByTagName("tbody")[0];
    tbody.appendChild(tr);
</script>

----------------

### 案例 div根据方向键移动
- 需求：
- 使div可以根据不同的方向键向不同的方向移动(按左键：向左移动)

- 左37 上38 右39 下40
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

> 需求：当用户按了ctrl以后 速度加快

    if(event.ctrlKey){
        speed = 50;
    }

- 还是有些问题, 第一次按住的时候 会卡一下 浏览器的默认行为 以后再讲, 无论是方向也好 还是速度也好 都是在 onkeydown的事件里设置的 控制的, 这里方向是没问题的 出问题的是速度

- 我们想想 骑自行车 我们手控制的是方向 脚控制的是速度, 假如我们的手既要控制方向又要控制速度 是不是就要出问题了

- 现在onkeydown控制方向是没问题的, 那能不能再找一个控制速度呢？ 

> 要点:
- 1. 速度使用的是 循环定时器自动控制
- 2. event.keyCode -> dir -> switch方向

```js
    // 创建控制方向的变量
    var dir = 0；

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

    /*
        现在的函数会每隔30秒执行一次, 每执行一次会根据dir的值来判断执行哪个代码（哪个case）dir为37往左 38往上 39往右 40往下 现在div动了么？
        
        没动吧 因为dir是0 但函数执行了只是没有找到符合的值 我们可以通过修改dir来改变前进的方向

        现在我们的定时器就相当于脚一直在蹬脚蹬子 需要一个方向 现在dir是0 所以不动, 通过修改dir可以控制方向, 那dir什么时候改？ 按的时候改吧 所以我们再返回onkeydown里
    */
};

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

----------------

### 案例 鼠标移动坐标 在 div中显示
- 需求：
- 鼠标在大div中移动时, 在小div中来显示鼠标的坐标
<body>
    <div id="areaDiv"></div>
    <div id="showMsg"></div>
</body>

```js
window.onload = function(){


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
```

----------------

### 案例 仿淘宝固定右侧侧边栏
- 效果:
- 有一个溜导航条, 当鼠标往下滚动的时候 导航条顶端到屏幕上方时, 就固定在那里
- 原先侧边栏是绝对定位
- 当页面滚动到一定位置, 侧边栏改为固定定位
- 页面继续滚动, 会让返回顶部显示出来

- 解析:
1. 需要用到页面滚动事件scroll 因为是页面滚动 所以绑定给document
2. 接着滚动滚动条 往下滚啊滚 当banner区域上边框到顶部时, 侧边栏就会变成固定定位

- 只要是页面网上滚动 就会有 scrollTop 值 根据这个值就知道什么时候到banner了 比如scrollTop:100, 当等于100的时候 就知道banner到顶了


- 核心:
> window.pageYOffset / pageYOffset
> window.pageXOffset / pageXOffset


> 案例部分
```js 
    // HTML 部分

    <div class="slider-bar">
        <span class="goBack">返回顶部</span>
    </div>
    <div class="header w">头部区域</div>
    <div class="banner w">banner区域</div>
    <div class="main w">主体部分</div>

    // JS部分
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
```


----------------

### 案例 滚动条到底触发事件
- 如果在里面添加上属性disabled="disabled"则表单项将变成不可用的状态, 当滚动条到底后才能点击

- 思考：
- 我们要先检查滚动条是否到底了, 什么时候检查？上来查么？不查吧 滚动条没动吧, 查了也没有意义, 也就是说当滚动条开始动的时候我们再检查, 怎么知道滚动条开始滚动了呢？滚动条滚动是一个事件

- 所以我们只需要监听滚动条是否滚动, 那现在事件有了, 我们把它绑定给谁？滚动条是谁的 我就绑定给谁 滚动条是p元素的吧

```js
    if(info.scrollHeight - info.scrollTop == info.clientHeight){
        
        inputs[0].disabled=false;
        inputs[1].disabled=false

    }
```

----------------

### 案例 获取鼠标在盒子内的坐标
- 需求: 我们在盒子内点击, 想要得到鼠标距离盒子左右的距离
- 首先得到鼠标在页面中的坐标 e.pageX, e.pageY
- 其次得到盒子在页面中的距离 box.offsetLeft box.offsetTop
- 用鼠标距离页面的坐标减去盒子在页面中的距离 = 鼠标在盒子内的坐标

- 移动获取的话 就用mousemove事件
```js 
    box.addEventListener('click', function(event){
        event = event || window.event;
        let x = event.pageX - this.offsetLeft
        let y = event.pageY - this.offsetTop

        console.log(x, y)
    })
```


----------------

### 案例 跟随鼠标移动
> 要点:
- 1. 鼠标不断移动, 使用鼠标移动事件 mousemove
- 2. 在页面中移动给document注册事件
- 3. 图片移动需要开启绝对定位

- 核心原理:
- 每次鼠标移动 我们都会获得最新的鼠标坐标, 把这个x和y坐标作为图片的top, left值就可以移动图片


- 需求：使div可以跟随鼠标移动

```js
    window.onload = function(){
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
```
- 上面的方式是不行的 

```js
    // 给整个文档绑定 mousemove 事件
    document.onmousemove = function(){};
```

- 实现了 但是有没有什么问题 当页面过高之后, 会出现滚动条, 
- 这时如果拖动滚动条 会出现 鼠标和 div 分离的情况 能分离的范围就是 就是滚动的垂直偏移量

- 为什么呢？我们用了 下面两个属性是针对于 视口的 也就是说 滚动区域是获取不到坐标的
    clientX 
    clientY

- 用于获取鼠标在 当前的 可见窗口 的坐标

- 我们要改成使用下面的属性 可以获取鼠标相对于当前页面的坐标
    pageX
    pageY


- 由于鼠标的移动是相当于当前浏览器的可见框 原点在可见区域的左上角, 而div是相对于整个页面, 原点在整个页面的左上角, 拖动滚动条后, 鼠标的原点和div的原点不在一起, 所以才会发生分离, 那

    clientX
    clientY

- 是相对于窗口的 那我找一个相对于整个页面的不就行了么？

    pageX
    pageY

- 但是这两个属性在ie8中不支持, 那怎么办

- scrollTop 是滚动条 滚动的垂直距离, 使鼠标和div分开的距离 其实就是滚动条向下拖动产生的垂直距离, 那我是不是让鼠标在可见框的原点和页面的原点重合就好了？

- 我把div整个往下挪就行了吧, 挪多少？
- 挪scrollTop的距离就可以把我把这段距离加在垂直偏移量上, div是不是就往下走了

> 获取滚动条滚动的距离
- chrome认为浏览器的滚动条是body的, 可以通过body.scrollTop来获取, 
- 火狐等浏览器认为滚动条是html的因为我是给body设置了一个高度1000px 然后html没装下才出现的滚动条, html是父元素 子元素body溢出

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

----------------

### 案例 模态框 *拖拽*
> pink老师的思路:
- 1. 点击的时候获取到鼠标在模态框的位置 (盒子内鼠标点击点 与 左边框的距离)
- 这个距离是固定的
<!-- 
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
-->

- 2. 我们能实时获取到鼠标在页面的位置, 和实时获取到盒子left的位置, 那么
- 鼠标实时位置 - 鼠标在模态框里的固定位置, 那么模态框的位置也能实时求到

- 3. mouseup事件 在整个过程结束后也没有用了 应该清掉 要不然点击下元素对象, 再在元素对象外抬起鼠标还会触发抬起事件

- 还有取消默认行为的操作应该也加入
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

----------------

### 案例 拖拽
- 拖拽box1
- 拖拽流程：
- 1. 当鼠标被拖拽元素上按下时（别撒手）, 开始拖拽 onmousedown
- 2. 当鼠标移动时被拖拽元素跟鼠标移动, onmousemove
- 3. 当鼠标松开时 被拖拽元素固定在当前位置, onmouseup


    三步对应着三个事件
    元素对象 -- onmousedown
    document -- onmouseup onmousemove

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

> 修改鼠标点击位置 和 元素的位置
- 现在的拖拽效果都是在box1的左上角, 那怎么才能点哪拖哪呢？那点到一个地方之后, 想改成点哪拖哪的状态 所以要移动box的位置到点击点, 那移动多少？

    向上挪动        修改top值 减去
    向左挪动        修改left值 减去

- 那这段距离是多少？鼠标的话 有个clientX 鼠标的偏移量 元素的偏移量是 offsetLeft

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

> 取消默认行为
- 假如按ctrl+A 再拖动的话 所有元素都会跟着一起动

- 我们去拖拽一个网页中的内容时, 浏览器会默认去搜索引擎中去搜索内容, 此时会导致拖拽功能异常, 这个是浏览器提供的默认行为 ,如果不希望发生这个行为, 则可以通过return false 来取消默认行为, 最简单的方式在onmousedown的最后来个return false;, 但是ie8 不起作用 现在在ie8中进行测试

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


> 元素对象.setCapture()
- 设置btn01对鼠标按下的相关的事件进行捕获 不管点击谁都显示元素对象身上的事件
- 只有ie支持, 但是在火狐中调用时不会报错, 而如果在chrome调用 会报错

- 使用的时候要先进行判断
```js 
    if(box1.setCapture){
        box1.setCapture();
    }
```

> 元素对象.releaseCapture();
- 取消对事件的捕获

- 当调用一个元素的setCapture()方法以后, 这个元素将会把下一次所有的鼠标按下相关的事件捕获到自身上 或者按下按钮2 也会提示alert1 

- 换个说法 我给btn01设置完setCapture以后 btn01就像一个强盗一样 它把所有鼠标点击的事件都抢过来, 虽然页面上我点的02

- 但btn01设置了setCapture就说 点02就相当于点我 所以弹出了1
因为btn02的事件被btn01捕获了, 更横的是 不光点按钮, 鼠标进行的点击相关所有事件都被btn01抢过来显示1了

---

> 针对ie
btn01.setCapture();  用来处理mousedown事件 针对ie

- 那再回过头想想 当我拖拽的时候 别的东西会一起动的原因是 onmousedown的事件传递给了别的东西 那我这么想 当我拖拽box1的时候 我让box1变成强盗 不管拖谁 都是拖我 这样所有的事件都会揽到自己身上 就可以了 在我们的最上面写上 也就是

```js
box1.onmousedown = function(){
    // 这里写上：设置box1 捕获所有鼠标按下的事件；
    box1.setCapture();


// 但是还是有bug, 我希望鼠标一松开就不要捕获了 当鼠标松开时 取消对事件的捕获
document.onmouseup = function(){

// 这样的话 我们还要进行下判断, 因为setCapture只需要在ie里面用
if(box1.setCapture){
    box1
    .setCapture();
}
// 还是要写的 其他浏览器 认
return false

// 或者还可以这么写
box1.setCapture && box1.setCapture();
```


> 创建自定义拖动函数
- 那比如多个目标都想拖动 怎么办 复制么？尝试 提取一个专门用来设置拖拽的函数

- 参数 开启拖拽的元素

```js
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

---

> 整理:
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


----------------

### 案例 滚轮事件的小案例

- 需求：
- 当鼠标滚轮向下滚动时, box1变长
- 当鼠标滚轮向上滚动时, box1变短

- 绑定事件的函数
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

// 接下来我们思考下, 我们在ie中触发的alert函数 和 在火狐中触发的alert函数 是一个么？不是吧, 在ie中是触发的上面的函数吧, 火狐里触发的是下面的函数吧 这两个函数用不用做两个业务？业务需求都是一样的吧, 我们可以这么改：

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

    // 火狐的话不好用, 火狐是通过bind函数绑定的
使用addEventListener()方法绑定响应函数, 取消默认行为时不能使用return false
    event.preventDefault();

    // 但是ie8 又出现了问题,ie8不支持, event.preventDefault(); 如果直接调用会报错 所以要判断
    event.preventDefault && event.preventDefault;
};
```


> 另一个老师控制方向的思路
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

----------------

### 案例 5秒钟之后关闭广告
- 核心思路: 5秒之后, 就把这个广告隐藏起来 display:none
```js
    setTimeout(function(){
        img.style.display = 'none'
    }, 5000)
```

----------------

### 案例 定时器简单的应用
- 需求：让一个数字, 在页面上 自动变化

<h1 id="count">1</h1>

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

----------------

### 到时间发送短信
- 点击按钮后, 该按钮60秒之内不能再次点击, 防止重复发送短信
- 核心思路:
- 按钮点击后, 会禁用 disabled = true
- 同时按钮里面的内容会发生变化, 比如还剩下多少秒
- 里面秒数是有变化的, 因此需要用到定时器
- 如果变量为0 说明到了时间, 我们需要停止定时器, 并且复原按钮初始状态

- input标签的类型: number, search
- 如果想修改input的disabled的状态

    ie9: input:disabled
    ie8: input[disabled]
    ie6: html input.disabled

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

----------------

### 案例 京东页面的倒计时
- 这个倒计时是不断变化的, 因此需要定时器来自动变化
- 三个黑色盒子里分别存放的是时分秒
- 三个黑色盒子利用innerHTML放入计算的小时分钟秒数

- 第一个执行也是间隔毫秒数, 因此刷新页面会有空白
- 比如我页面上写这 00 00 00, 每次刷新会先显示我预留的数字, 为了解决这个问题
- 我们在定时器之前 先调用一次这个函数

> 有一点小问题 let inputTime = +new Date(time); 前也要用 +new
```js 
    let boxs = document.querySelectorAll('.time-box span');
    let hBox = boxs[0];
    let mBox = boxs[1];
    let sBox = boxs[2];

    countDown('2021-4-15 00:00:00');    // 为了解决刷新页面有预留文字的问题

    setInterval(function() {
        countDown('2021-4-15 00:00:00');
    }, 1000)
    
    function countDown(time) {

        let nowTime = +new Date();
        let inputTime = +new Date(time);
        let times = (inputTime - nowTime) / 1000;

        let h = parseInt(times / 60 / 60 % 24);
        let m = parseInt(times / 60 % 60);
        let s = parseInt(times % 60);

        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        hBox.innerHTML = h;
        mBox.innerHTML = m;
        sBox.innerHTML = s;
    };
```

----------------

### 案例 每个2秒自动切换图片

<body>
    <img id="img1" src="links/1.jpg">    
</body>

- 需求:我希望图片能每隔2秒切换一张, 自动切换

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
    var timer：

// 开启一个定时器来自动切换图片
setInterval(function(){
   // 使索引自增
    index++;

    // 判读索引是否超过最大索引
    if(index >= imgArr.length){
        // 则将index设置为0
        index = 0;
    }

    根据上面的判断 换一种写法
    index = index % imgArr.length;

    这么写什么意思？
    当index为0的时候, imgArr.length是5 0%5=0
    当index为1的时候, imgArrlength是5  1%5=1
    当index为2的时候, imgArrlength是5  2%5=2
    当index为3的时候, imgArrlength是5  3%5=3
    当index为4的时候, imgArrlength是5  4%5=4
    当index为5的时候, imgArrlength是5  5%5=0
    当被除数小于除数时 余数就是被除数

        
    // 修改img1的src属性
    img1.src = imgArr[index];

},1000)
```

---

> 追加需求
- 现在是一上来就开始切换 我希望 让你切换 你再切换 加个按钮现在希望你点开始的时候再动 不点开始别动

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

---

> 残留的一些问题:
- 功能是实现了 但是有一些的问题
1. 我在上面声明了一个定时器的变量,  var = timer 没有赋值 我在点击开始按钮的时候才开始赋值, 所以在点btn02时没有赋值, 所以应该是个undefined吧, 可是测试结果是 点btn02时 并没有报错

> clearInterval() 可以接收任何参数 null undefined都可以
- 如果参数是有效的定时器标识 则停止定时器, 如果参数是无效的 则什么也不做

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


----------------

### 案例 box移动效果
> 阶段一：完成向右移动动画 并可以停止在指定位置

<button id="btno1">点击按钮以后box1向右移动</button>
<div id="box1"></div>

```js
function getStyle(obj, name){
    if(window.getComputedStyle){
        return getComputedStyle(obj, null)[name];
    }else{
        return obj.currentStyle[name];
    }
};
```

> 点击按钮以后, 使box1向右移动（left值增大）
```js
btn01.onclick = function(){
    // 注意我们这么设置是不是点一下就动了 不是我们想要的效果 我们想让它持续的动 
    box1.style.left = 500px;


    // 开启一个定时器, 用来执行动画效果
    setInterval(function(){
        // 修改left的值, 一点点的移动 left值得增大 怎么才能增大 得在原来的值的基础上增大吧, 先获取原来的left值 
        var oldValue = box1.offsetLeft;

// 这样写行, 但是我更想把这个函数写成通用的方法 这样让它适应各种动画的操作 既然是想适用任何动画的操作 那是不是只修改left的值？不是吧 有可能我要修改top width height 有没有一个方法是根据样式名来获取样式值的？插入这个函数  这个函数可以获取当前任意的样式, 也是当前所显示的样式 之后这么改 
btn01.onclick = function(){
    // ie返回的是auto, 其它浏览器正常 因为在css样式里 假如没有设置position的left值 就是auto但是获取到的都是 10px 这样没办法计算 只能转换number 
    var oldValue = getStyle(box1, "left");

    setInterval(function(){
        // 获取box1的原来的值： 这个值在函数内部获取 会没调用一次获取一次新的值 所以会累加 如果放在外面只会获取到一次 
        var oldValue = parseInt(getStyle(box1, "left"));

        // 修改, 在旧值的基础上 增加
        var newValue = oldValue + 10;

        // 将新值设置给box1
        box1.style.left = newValue + "px";
        
    },30);
    
    // ok 可以了 但是停不下来了 一直在移动 我希望你移动到某一个位置 停住了 就不要再动了 要是想让它停下来是不是关了就可以啊 所以 我们要给上面的定时器起一个名字 
    var timer = setInterval(function(){
        var oldValue = parseInt(getStyle(box1, "left"));
        var newValue = oldValue + 10;
        box1.style.left = newValue + "px";
    },30);


    // 当我们的元素 移动到800px值 使其停止执行动画怎么知道移动到了800px 看 newValue吧
    if(newValue == 800){
        // 到达目标 关闭定时器
        clearInterval(timer);
    }

    // 但是值正好到800能停, 假如值不是正好800就停不下来了, newValue >= 800, 这能停 但是 不准 要稳稳的停在800 那还得等于

    
        // 获取box1的原来的值
        var oldValue = parseInt(getStyle(box1, "left"));

        // 修改, 在旧值的基础上 增加
        var newValue = oldValue + 10;

    // 在这, 在修改样式值之前, 判断newValue是否大于800
    if(newValue > 800){
        newValue = 800;
    }

    // 将新值设置给box1
    box1.style.left = newValue + "px";
    // 为了防止开启多个定时器 所以还是在再开启定时器之前还要把上一次定时器关掉份

```

-------- 对上 总结 --------

> 获取当前元素显示样式 只能读不能修改
DOM对象.currentStyle.样式名
    - 它可以获取当前元素正在显示的样式, 如果没有则读取默认值 比如auto

other:
getComputedStyle(DOM对象, null);
    - 如果获取的样式没有设置, 则会获取到真实的值, 而不是默认值
    - window的方法可以直接调用 获取到的样式 会在返回的对象中

    - 这里的DOM对象不用加引号

    - getComputedStyle(DOM对象, null).样式名
    - 或者：
    - let obj = getComputedStyle(DOM对象, null);
        obj.width;

--

> 阶段二：新创建一个按钮, 点击新按钮后 box向左移动（之前的是点击按钮向右移动）
    
```js
    var btn02 = document.getElementById("btn02");

    // 点击按钮以后, box1向左移动 left值减小
    btn02.onclick = function(){
    clearInterval(timer);
    timer = setInterval(function(){
        var oldValue = parseInt(getStyle(box1,"left"));
        var newValue = oldValue - 10;

        // 从800向0移动
        if(newValue < 0){
            newValue = 0;
        }

        box1.style.left = newValue + "px";

        // 元素移动到0时 停止
        if(newValue == 0){
            clearInterval(timer);
        }
    },30);
    };
// 
```

- 尝试创建一个可以执行简单动画的函数 直接把代码粘贴过来肯定不行, 我们看看哪需要改动一下
- 1. timer提取出来变成全局的变量 
- 2. 我现在的动画是给box1加的 以后可能还要给box2加等等 这东西不是定的 
    所以
    定义一个参数 obj： 执行动画的对象
    定义一个参数 target：执行动画的位置
    定义一个参数 speed：移动的速度 速度这有没有什么问题, 有正负吧 正向右移动 负向左移动

    
```js
    function move(obj , target ,speed){
    clearInterval(timer);
    timer = setInterval(function(){
        var oldValue = parseInt(getStyle(obj,"left"));
        var newValue = oldValue + speed;

        // 从800向0移动, 什么时候小于target？,如果是800的时候 是往左移动 也就是往0移动 数值是不是越来越小啊 最小只能是target < target, 如果是0的时候, 是往右移动 也就是往800移动 值愈来愈大了吧 我们要判断是否大于target, 当向左移动时, 需要判断newValue是否小于target ,什么时候向左移动, speed的值是负值的时候 向左移动吧 ,当向右移动时, 需要判断newValue是否大于target ,什么时候向右移动, speed的值是正值的时候 向右移动吧 
        if((speed<0 && newValue < target) || (speed>0 && newValue > target)){
            newValue = target;
        }else

        obj.style.left = newValue + "px";

        // 元素移动到0时 停止
        if(newValue == target){
            clearInterval(timer);
        }
    },30);
    };
```

> 阶段三: 上面的函数做好后我们改下
```js
    btn01.onclick = function(){
        move(box1, 800, 10);
    };
    btn02.onclick = function(){
        move(box1, 0, -10);
    };
```

- 上面还有一个地方设计的不太好 10的问题, btn01的 10 是向右移动, btn02的10 是向左移动
- 所以 函数是正 是负 不应该由调用者考虑应该交给函数自己考虑, 也就是说 执行动画的时候 我们调用方法的人 需要自己去判断 向左移动还是向右移动吧, 那问题来了, 我得判断元素现在的位置吧 可 我在执行动画的时候 我知道不知道它在哪啊, 不知道吧 不知道在哪的话 我就不知道这个值 应该传正还是负吧, 所以传正负值不好 容易出问题 


- 我们不管正负 speed就是传正, 都传正值的话 在这永远都是加了
    var newValue = oldValue + speed;

- 往0移动的时候就移动不过去了, 所以在函数里 还要判断speed的正负

```js
    function move(obj, speed){
        clearInterval(timer);


        // 判断速度的正负值
        如果从0向800移动 则speed为正
        如果从800向0移动 则speed为负

        如果从0向800移动 0是现在的位置吧 800是目标

        获取元素目前的位置, 这个位置是move函数一上来就获取的 没有在定时器里获取 因为这个只需要获取一次
        元素目前的位置叫 current 


        var current = parseInt(getStyle(obj,"left"));
        if(current < target){

        } 

        // 上面这个判断应该是往右移动 应该是正值 speed本来就是正值我们可以不用管
        var current = parseInt(getStyle(obj,"left"));
        if(current > target){
            // 此时的速度应为负值
            speed=-speed;
        } 


    // 上面的好处就是 我在函数一上来的时候就获取位置, 判断符号 以后就不用考虑正负了 
    timer = setInterval(function(){
        var oldValue = parseInt(getStyle(obj,"left"));
        var newValue = oldValue + speed;
        if((speed<0 && newValue < target) || (speed>0 && newValue > target)){
            newValue = target;
        }else
        obj.style.left = newValue + "px";

        // 元素移动到0时 停止
        if(newValue == target){
            clearInterval(timer);
        }
    },30);
```

    这个动画给谁加？            参数obj
    移动的初始速度？            参数speed
    speed有正负, 正值向右移动 负值向左移动

    - 移动的目标位置？
    或者叫执行动画的目标位置    参数target

    0属于目标位置 我们定义的是target 但是我们写
    if(newLeft < target) 行么？
    如果是 右向左移动 target是1000 就不行 是0就行 也就是说 什么时候 < target
    如果是 0  ← 1000 移动 那我们的值是越来越小 最小只能是target 所以是 < target

    如果是 0  → 1000 移动 我们的值越来越大 我们要判断 值 是否 > target
    当我们向左移动时, 需要判断 newLeft 是否 < target 什么时候向左移动, 也就是speed的值是负数的时候
        if(speed < 0 && newLeft < target){
            newLeft = 0
        }

    时候时候向右移动, 也就是speed的值是正数的时候
    向右移动是 0 → 1000 移动吧 值越来越大 最大不能大于1000
        if(speed > 0 && newLeft > target){
            newLeft = 0
        }

--

> 阶段三: 调用同一函数 避免定时器重复
- obj.timer = setInterval()
- 我们可以给对象身上添加定时器的属性

--

> 阶段四: 增添动画效果 (可以添加回调函数)
- 现在的话 move 只能往左右移动 我希望加上上下移动, 变宽和变高 执行更多种的动画效果
```js 
    // 加一个btn04 测试按钮
    var btn04 = document.getElementById("btn04");
    btn04.onclick = function(){
        move(box2, 800, 10);
    };


btn04.onclick = function(){
    move(box2, "width", 800, 10, function(){
        // 既然是个函数就会有无限的可能
        alert("动画执行完毕了");            
        
        // 我在回调函数中再来一个函数
        move(box2, "height", 400,10,function(){})

// 这么写什么意思, 先执行动画来修改width, width执行完了 调用回调函数, 回调函数会调用里面的move 再次修改height效果就是先变宽 再变高 回调函数中还可以继续写 回调函数可以让动画效果无限扩展
```


> 形参中的回调函数 报错的原因
- 上面的执行完 我在点下btn01 这时候看控制台会报错, 因为move里添加了callback\

```js
function move(obj, attr, target, speed, callback){
 
// 报错是callback is not function 因为btn01 我没有传递回调函数, 所以值是一个undefined 把undefined当做回调函数一调就报错了

// 所以btn01里还必须要传一个回调函数
btn01.onclick = function(){
        move(box1, "left", 800, 10, function(){});
    };
// 有的时候我需要传 有的时候我不想传, 可这样还必须要传 里面什么也不能写 很麻烦所以我希望 如果我传回调函数了 你才执行, 不传的话就不执行
```


> 整理后的结果如下:

* 参数：
* 	obj:要执行动画的对象
* 	attr:要执行动画的样式, 比如：left top width height
* 	target:执行动画的目标位置
* 	speed:移动的速度(正数向右移动, 负数向左移动)
*   callback:回调函数, 这个函数将会在动画执行完毕以后执行

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


> 回调函数在前一个动画执行完毕后执行, 最好放在一个代表前一个动画执行完毕的条件里,比如
```js 
    if(newValue == target) { 
        clearInterval(obj.timer);
        callback && callback();
    }

```

```js
* 定义一个函数, 用来获取指定元素的当前的样式
* 参数：
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

> 用addEventListener做的 可以看看
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

----------------

### 轮播(李老师的做法)

- 创建一个外部的div, 来作为大的容器

<div id="outer">
    ```js 创建一个ul, 用于放置图片```
    <ul id="imgList">
        <li><img src="img/1.jpg"/></li>
        <li><img src="img/2.jpg"/></li>
        <li><img src="img/3.jpg"/></li>
        <li><img src="img/4.jpg"/></li>
        <li><img src="img/5.jpg"/></li>
    </ul>
    ```js创建导航按钮```
    <div id="navDiv">
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
        <a href="javascript:;"></a>
    </div>
</div>

-------------- 重新记笔记 --------------

- 需求1：
- 点击超链接 显示对应的图片

> 阶段一：
    没有动画, 已完成 点击导航点 会到 对应的图片上的功能

提交：
```js
    // 动态修改imgBox的宽度
    let imgBox = document.getElementById('imgBox');
    let imgs = document.getElementsByTagName('img');
    imgBox.style.width = 500*imgs.length + 'px';

    // // 动态设置导航点的位置
    let container = document.getElementById('container');
    let navBox = document.getElementById('navBox');
    navBox.style.left = (container.offsetWidth - navBox.offsetWidth)/2 + 'px';

    // 设置 第一个导航点默认被选中状态
    let index = 0;
    let navA = navBox.getElementsByTagName('a');
    navA[index].style.backgroundColor = '#BDBDBD';

    // 需求：点击导航点 链接到 对应的图片上, 先为所有的超链接绑定单击响应函数
    for(let i=0; i<navA.length; i++){

        // 我点的哪个导航点我知道, 但不知道我点的第几个导航点 我为每一个导航点 添加了下标为了获取点击超链接的索引
        navA[i].index_J = i;
        navA[i].onclick = function(){
        //alert(i);       
        // i是5  因为外面是for循环 这里是单击响应函数, 他们的执行顺序是 先执行for循环完了 再执行单击响应函数 也就是说 这里i的值一直是5 然后把 点击的导航点的下标 传递给 外面的index 这样点击第三个导航点 就能跟图片相关联起来

        index = this.index_J;

        // 点击导航点显示对应的照片 就是修改left的值 点第三个 就是往左移动500*3
        imgBox.style.left = -500*index +'px';


            // 点击导航点 导航点应该变成选中状态 下面这么写 点一个黑一个
            // 转到：1 	再外面定义函数 处理这个问题
            // navA[index].style.backgroundColor = '#BDBDBD'
            // 上接：1 
            setNavA();
        };
    }

    // 上接：1 定义解决 导航点 选中状态的问题
    function setNavA(){

        // 遍历所有的导航点, 先将所有的导航点设置为未选中状态
        for(let i=0; i<navA.length; i++){
            // 为了避免内联样式的优先级高于样式表里的样式, 所以这里改为空串 取消内联 这样样式表里的样式就生效了
            navA[i].style.backgroundColor = '';
        }

        // 将选中的导航点 改为选中状态
        navA[index].style.backgroundColor = '#BDBDBD';
    };
```


> 第一个问题：
- ul的长度定2600不好, 因为现在是刚好5张图片的宽度, 假如增加新的照片 包含块的宽度不够

```js
window.onload = function(){
    var imgList = document.getElementById("imgList");
    var imgArr = docuement.getElementsByTagName("img");

    // 设置imgList的宽度, 如果有1张是520x1 5张就是520x5 10张就是520x10, 获取页面中所有的图片
    imgList.style.width = 520*imgArr.length+"px";

    // 开启绝对定位后 ul才能动起来, ul要往左移动 修改的是absolute的left的值,每向左移动520px, 就会显示到下一张照片
```


> 第二个问题:
- 图片上的提示红点, 假如写死了5个 以后图片增加和减少都是问题

```js
    var navDiv = document.getElementById("navDiv");
    var outer = document.getElementById("outer");
    // 设置navDiv的left值
    navDiv.style.left = (outer.offsetWidth - navDiv.offsetWidth)/2 + "px";
```

> 第三个问题
- 上来默认第一个导航点的颜色应该是黑色 默认被选中的状态
    
```js
    var allA = document.getElementsByTagName("a");
    // 创建默认显示第一张图片的索引
    var index = 0;
    // 设置默认选中的效果
    allA[index].style.backgroundColor = "black";


    // 接下来完善一下功能, 第一个 点击导航点切换指定图片, 点击第一个 显示第一张。。。。。。为所有的超链接都绑定点击响应函数
    for(var i=0; i<allA.length; i++){
        // 那能不能给超链接贴标签呢？每一个超链接都能保存自己的索引, 为每一个超链接都添加一个num属性
        allA[i].onclick = function(){
            // 需要获取点击超链接的索引, 可是有问题 很难知道点的是哪一张, 所以我要给所有的超链接贴标签, 获取点击超链接的索引
            alert(this.num);        // this就是点击的那个对象

            // 现在我知道我点的是哪个超链接了吧, 那现在我要是点的索引为0的超链接 就应该显示索引为0的图片了吧, 获取点击超链接的索引 并将其设置为index
            index = this.num;
            // 这里把this.num的值赋值给了全局变量index了, 也就是修正当时正在显示的图片吧

            // 切换图片
            imgList.style.left = ""

            // 如果想显示第一张就是
            imgList.style.left = 0 + "px";

            // 如果想显示第二张就是
            imgList.style.left = -520 + "px";

            第一张索引为0 left=0
            第二张索引为1 left= -520
            第三张索引为2 left= -1040

            // 规律是 索引 x -520px
            imgList.style.left = -520 * index + "px";

            // 使用move函数来切换图片
            move(imgList, "left", -520*index, 20, function(){});
```

> 这部分的第一个问题
- 导航点选中状态 一直没有变 都是第一个, 正常应该是点完了之后点也要跟着变
```js
    allA[index].style.backgroundColor = "black";
    // 这么写的话不行, 点一个黑一个 所以应该是 不仅把它变黑还要把别的变红
        // 我们想想变黑变红是不是每次都要干啊所以我们要定义一个方法, 这个方法就在内部用 所以可以直接写在window.onload里, 设置完变黑变红的函数后 这里调用下看看效果
        autoChange();
        setA();
        };
    }
```

> 自定义 设置导航点的函数
- 创建一个方法用来设置选中的a, 定义变黑变红的函数
```js
    function setA(){
        // 对所有的a进行遍历, 并把它们的背景颜色 设置成红色
        for(var i=0; i<allA.length; i++){
            allA[i].style.backgroundColor="red";
            // 上面这么写 是为了把变黑的颜色 改回去 改成红色 但是发现 鼠标一上去的hover没了, 因为这里改的都是内联样式 所以hover的样式被内联样式覆盖了
            allA[i].style.backgroundColor="";
            // 改成空串 这里改成空串相当于把内联样式中的背景颜色去掉了 样式表里的相关样式就生效了
        };

        // 将选中的a设置为黑色
        allA[index].style.backgroundColor="black";
    };
```

> 自定义移动的函数
* 参数：
* 	obj:要执行动画的对象
* 	attr:要执行动画的样式, 比如：left top width height
* 	target:执行动画的目标位置
* 	speed:移动的速度(正数向右移动, 负数向左移动)
*  callback:回调函数, 这个函数将会在动画执行完毕以后执行
```js
function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer);
    var current = parseInt(getStyle(obj, attr));
    if(current > target) {
        speed = -speed;
    }
    obj.timer = setInterval(function() {
        var oldValue = parseInt(getStyle(obj, attr));
        var newValue = oldValue + speed;
        if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }
        obj.style[attr] = newValue + "px";
        if(newValue == target) {
            clearInterval(obj.timer);
            callback && callback();
        }

    }, 30);
}

> 自定义获取对象样式的函数
* 参数：
* 		obj 要获取样式的元素
* 		name 要获取的样式名

function getStyle(obj, name) {

    if(window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }

}
```

-------------- 重新记笔记 --------------

```js 
    // 动态设置 导航点 居中```
    let container = document.getElementById('container');
    let navBox = document.getElementById('navBox')
    navBox.style.left = (container.offsetWidth - navBox.offsetWidth)/2 + 'px';

    // 动态设置 图片容器 宽度```
    let imgBox = document.getElementById('imgBox');
    let imgs = imgBox.getElementsByTagName('img');
    imgBox.style.width = 500*imgs.length + 'px';

    // 设置 导航点 默认选中状态```
    let index = 0;
    let navA = navBox.getElementsByTagName('a');
    navA[index].style.backgroundColor = '#BDBDBD';

    // 定时器 标识```
    let timer;

    // 设置点击导航点 链接到对应图片```
    /*  	
    for(let i=0; i<navA.length; i++){

        navA[i].num = i;
        navA[i].onclick = function(){

            index = this.num;
            imgBox.style.left = -500*index + 'px';

            setNavA();
        };
    }
    */

    // 上面的可以 我们再使用move函数来切换图片```
    for(let i=0; i<navA.length; i++){

        navA[i].num = i;
        navA[i].onclick = function(){


    // 接: 2
    // 关闭自动切换的定时器
    // 当 点击 动画执行完毕后 自动播放还应该继续开启 
    // 怎么开启？ 调用我们的autoChange()吧 什么时候调呢？ 点击切换的动画执行完毕后调用
    // 转接：3 

        clearInterval(timer);
        index = this.num;
        move(imgBox, 'left', 30, index*-500, function(){


    // 上接：3 		回调函数一执行代表动画执行完了
    // 点击动画执行完毕后 开启 自动播放功能
    autoChange(); 

        });
        setNavA();
    };
    }

        // 开启自动切换```
        autoChange();

        // 解决点击 导航点 未选中状态 的问题```
        function setNavA(){

// 接：1
// 判断当前索引是否是最后一张图片 这样即使到最后一张也让第一个导航点变成黑色 

        if(index >= imgs.length - 1){
            index = 0;

// 一旦进入这个判断 显示的是我们最后一张图片 而最后一张图片和第一张一模一样的
// 我们通过CSS 使最后一张图片一瞬间 跳到第一张```
            imgBox.style.left = 0;
        }
        
        for(let i=0; i<navA.length; i++){
            navA[i].style.backgroundColor = '';
        }
        navA[index].style.backgroundColor = '#BDBDBD';
    };

// 创建一个函数 用来开启自动切换图片 因为有的时候需要切换 有的时候需要停一会```
        function autoChange(){

// 现在的状态是 点击导航点 切换图片 也就是点击导航点 调用move()函数```
// 那自动切换是不是 每隔一定的时间 调用一次move()函数```

// 开启是定时器 去切换图片```
        timer = setInterval(function(){

// 那怎么切换 假设我是索引为0的 切换到索引为1的 以此类推```
        index++;

// 索引一直在自增, 一共就5张图片 最大索引为4 后面就没了 index不能一直++```
// 判断index的值```
        index %= imgs.length;

    // if(index >= imgs.length){
    // 	index = 0;
    // } 



    // 我现在不希望imgBox往左走这样体验不好 希望它继续往下转 然后显示第一张 第二张
    // 首先 我希望最后一张后 继续往下转 显示第一张 这样 我在5.jpg 后 再添加一个 img 是1.jpg
    // 这样最后一张图片和第一张图片是一样的 这样转到最后一张的之后 感觉上又像转到第一张
    // 转到第6张图片后 此时是第6张我们把它当成第1张的 导航点一个都没有变 因为第6张索引为5 没有index为5的超链接
    // 当第6张的时候 第1个导航点应该变
    // 转接：1 


// 执行动画来切换图片```
        move(imgBox, 'left', 30, -500*index, function(){

// 动画切换完成后修改 导航点```
        setNavA();
    });
    }, 1000)


// 还是有点问题：
// 自动播放下一张的过程中点上一张 没过去 自动回来了 因为有两个动画在同时执行
// 现在点导航点会切换   -----   是一个单击响应函数
// 自动切换 ---- 是定时器那个函数
// 所以在选择上一张图片的时候 相当于 两个函数在同时执行
// 定时器那个函数 就把 点击函数 给停了

// 那先想想是自动播放优先 还是点击优先啊 点击优先吧 因为点击是用户的行为
// 那我们可以在点击的时候 把自动播放停止
// 转接: 2 
};
```
------------


```js 
// 创建一个函数, 用来开启自动切换图片```
function autoChange(){

    // 开启一个定时器, 用来定时去切换图片```
    setInterval(function(){

// 怎么切换图片, 索引为0的图片切换到索引为1的 1的切换到2的 以此类推, 切换到下一张```

// 是索引自增```
        index++;

// 判断index的值```
        index %= imgArr.length;

// 执行动画, 切换图片, 调用move()```
        move(imgList, "left", -520*index, 20, function(){
// 动画切换完了修改导航点```
            setA();

// 出现了到最后一张后 没有图片了 为什么？因为索引一直在自增 一共就5张 超过最大索引了 所以 要判断index的值```
    });
    }, 3000);

// 又出现了点问题, 到最后一张后 要返回第一张 这样得从最后一张一直到第一张这个过程让人体验不好, 我希望的效果是 最后一张图片显示为完后继续往左转直接是第一张```
    
// 一点点来试试, 我希望的效果是 最后一张图片显示为完后继续往左转直接是第一张 那我这样试试 现在是, 我在最后又放了一张图片 最后一张图片和第一张是一样的```
    <li><img src="img/1.jpg"/></li>
    <li><img src="img/2.jpg"/></li>
    <li><img src="img/3.jpg"/></li>
    <li><img src="img/4.jpg"/></li>
    <li><img src="img/5.jpg"/></li>
// 这是第6张图片 由于 这张和第一张是一样的吧 看的像第一张```
    <li><img src="img/1.jpg"/></li>
    
// 此时是第6张 我们当成第一张看的 但是导航点一个都没有变黑？为什么？因为第6张索引为5 但是我们没有索引为5的超链接 所以一个没变当第6张的时候 应该第一个变黑吧```
    
// 所以我们要在setA()函数开始加个判断, 判断当前索引是否是最后一张图片```
//imgArr.length - 1 是最后一张图片索引吧```
    if(index > imgArr.length -1 ){      
// 将index设置为0```
        index=0;
    };

// 那现在的点的问题解决了, 还有另一个问题, 就是到最后之后 图片还会连续返回到第一张, 所以我们想一下, 能不能到最后一张图片后 让它一瞬间返回到第一张呢？```

    if(index > imgArr.length -1 ){     
// 将index设置为0```
        index=0;
// 一进入到这个判断 此时显示的是最后一张索引吧, 而最后一张图片和第一张是一模一样的, 我们通过css 将 最后一张 一下切换 到 第一张```

        imgList.style.left = 0;
// 在这里把左侧的偏移量变成0了, 偏移量变成0 就是第一张的位置了吧```
    };


// 还是有点问题：,自动播放下一张的过程中点上一张 没过去, 现在点导航点会切换, 是一个单击响应函数 自动切换 ---- 是定时器那个函数, 所以在选择上一张图片的时候 相当于 两个函数在同时执行, 定时器那个函数 就把 点击函数 给停了```

// 那我们想想应该哪个函数优先啊？, 点击函数优先吧, 那我们应该在 用户点击导航点的时候 停止自动播放的函数吧, 就是把定时器给它关了吧 在点的时候需要关闭定时器```
    allA[i].onclick = function(){
// 在这关闭自动切换的定时器```
        clearInterval(timer);
    };

// 当点击函数执行完后 自动播放的动画还应该开启```
        move(imgList, "left", -520*index, 20, function(){
// 动画执行完毕, 开启自动切换功能```
            autoChange();
};
```

----------------

### pink老师的轮播图
- 轮播图也成为焦点图, 是网页中比较常见的网页特效
- 功能需求:

1. 鼠标经过轮播图模块, 左右按钮显示, 离开隐藏左右按钮
2. 点击右侧按钮一次, 图片往左播放一张, 以此类推, 左侧按钮同理
3. 图片在播放的同时, 下面小圆圈模块跟随一起变化
4. 点击小圆圈, 可以播放响应图片
5. 鼠标不经过轮播图, 轮播图会自动播放图片

> 第一步创建单独的js文件 -- index.js
- 我们要等页面全部加载完毕再执行js所以第一步添加onload事件
```js 
    window.addEventListener('load', function(){ });
```

> 第二步 实现鼠标经过父盒子 显示 隐藏按钮
```js 
    focus.addEventListener('mouseenter', function(){
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
    });
    focus.addEventListener('mouseleave', function(){
        arrowL.style.display = '';
        arrowR.style.display = '';
    });
```

> 第三步 动态生成导航点
- 核心思路: 小圆圈的个数是跟图片张数一致
- 所以首先先得到ul里面图片的张数(图片放入li里面, 所以就是li的个数)
- 利用for循环动态生成导航点放入到 ol中
    - createElement('li') appendChild 到 ol中

- 要点:
1. querySelector 不仅仅有 document. 的写法, 还可以 元素节点.
```js 
    let ul = document.querySelector('.focus > ul');
    // let ul = focus.querySelector('ul');  还可以这么写
    let ol = focus.querySelector('ol');

    // 动态创建导航点
    for(let i=0; i<ul.children.length; i++) {
        let li = document.createElement('li');
        ol.appendChild(li);
    }

    // 第一个导航点设置为选中状态 ol里的第一个小li设置类名为 current
    ol.children[0].className = 'current';
```

> 第四步 点击导航点改变颜色
- 利用排他思想
- 点击当前小圆圈 添加current类, 其余的小圆圈就移除这个current类

- 这个逻辑可以写在 第三步动态生成导航点的for循环里面
```js 
    // 动态创建导航点 --- 在这部分里 给所有的导航点绑定事件的同时 设置点击效果
    
    for(let i=0; i<ul.children.length; i++) {
        let li = document.createElement('li');
        ol.appendChild(li);

        // 在生成导航点的同时, 直接绑定点击事件
        li.addEventListener('click', function(){
            for(let j=0; j<ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
        })
        // console.log(li[i]);      undefined
    }
```

>> 遇到的问题:
- 在for循环中给li绑定事件, 开始的时候 我是用 li[i].add, 但是log下发现li[i]的值是undefined, 原因不明
```js 
    这里要记住 在创建节点的for循环 给它们绑定什么事件 不用加[i] 直接写就好 
```

> 第五步 点击小圆点实现图片滑动的效果
- 点击导航点滚动图片
- 用到animate函数, 引入js文件时, 注意顺序

- 移动的是ul
- 核心算法:
    - 点击某个导航点, 就让图片滚动 导航点的索引号 X 图片的宽度 作为ul的移动距离
```js 
    // 自定义移动动画
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }
```
> 这个部分的代码
- ul的移动距离: 导航点的索引号 x 图片的宽度 注意是负值, 因为往左走
- 图片的宽度 图片的宽度就是父盒子的宽度
    let focusWidth = focus.offsetWidth;

- 怎么获取导航点的索引号呢?
- 我们可以在生成导航点的时候, 给它设置一个自定义属性, 点击的时候获取这个自定义属性即可
```js 
    // 记录当前导航点的索引号, 通过自定义属性
    li.setAttribute('index', i);

    let index = this.getAttribute('index');
```

```js 
    for(let i=0; i<ul.children.length; i++) {
        let li = document.createElement('li');

        // 记录当前导航点的索引号, 通过自定义属性
        li.setAttribute('index', i);

        ol.appendChild(li);
        
        // 在生成导航点的同时, 直接绑定点击事件
        li.addEventListener('click', function(){
            for(let j=0; j<ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';

            // 在点击导航点的事件里完成 点击导航点移动ul的逻辑
            // ul的移动距离: 导航点的索引号 x 图片的宽度 注意是负值, 因为往左走
            // 先获取图片的宽度 图片的宽度就是父盒子的宽度
            let focusWidth = focus.offsetWidth;
            // 怎么获取导航点的索引号呢?
            // 我们可以在生成导航点的时候, 给它设置一个自定义属性, 点击的时候获取这个自定义属性即可

            // 当点击了某个小li的时候 就拿到当前小li的索引号
            let index = this.getAttribute('index');
            animate(ul, -index* focusWidth);
        })
    }
```

> 第六步 点击右侧按钮移动图片
- 点击右侧按钮一次, 就让图片滚动一次
- 声明一个变量 num 点击一次 自增1 让这个变量 X 图片的宽度, 就是ul的滚动距离

```js 定义一个变量```
let num = 0;

```js 克隆第一张图片放到ul的最后面```
let first = ul.children[0].cloneNode(true);
ul.appendChild(first);

```js 完成点击按钮滚动图片的功能```
arrowR.addEventListener('click', function () {
    if(num >= ul.children.length-1){
        ul.style.left = 0;
        num = 0;
    }
    num++;
    animate(ul, -num*focusWidth);
});
```js 
    点击到下一张肯定需要一个变量和图片的宽度(移动距离)联系起来, 下一张就是一个变量自增1 
```

```js 无缝滚动 点击最后一张会回到第一张```
```js 
    实现方式: 
    1 2 3 1
    在3的后面再放一张跟1一样的图片 当到最后一张1的时候 让ul的left直接为0
```

```js 
    对上面初步完善的功能进行改善
    1. 我们是在html结构里克隆的li, 这样导致了导航点多了一个
    2. 能不能让js克隆一份放在最后面呢?

    克隆第一张图片:
    1. 克隆ul第一个li cloneNode(true) true复制里面的子节点
    2. 添加到ul最后面 appendChild

    为什么使用克隆的功能小圆点并没有增加?
    因为我们克隆的方法 写在了 动态生成导航点的下面

    这种方法实现了两个功能一个是导航点不会多, 又是动态生成
```

----------------

### 无缝滚动的原理
- 把ul第一个li复制一份, 放到ul的最后面
- 当图片滚动到克隆的最后一张的时候(length-1), 让ul快速的 不做动画的跳到最最侧 left:0
- 同时把num赋值为0 重新滚动图片

-----

> 第七步 点击按钮滚动图片, 让导航点跟着一起变化
- 点击右侧按钮, 小圆点跟随变化
- 最简单的做法是再声明一个变量, circle 每次点击自增1, 注意 左侧按钮也需要这个变量 所以在全局里声明

- 这部分逻辑放在了 点击右侧按钮功能里
```js 
    // 点击按钮 让小圆点跟随一起变化 可以再声明一个变量用来控制小圆点的播放
    circle++;
    // 同样要对circle进行判断 如果circle = 4 就让他复原为0
    circle %= ol.children.length;

    // 排他思想, 先清除其余小圆点的current类名 然后留下当前小圆点的current
    for(let i=0; i<ol.children.length; i++) {
        ol.children[i].className = '';
    }
    // 留下当前的小圆点的类名
    ol.children[circle].className = 'current';
```

> 第八步 产生了一个bug 解决bug
\\ bug1
- 我点击导航点到了第3张图片, 再点击右侧按钮 案例来说 应该会跳到第4张, 结果却是第2张图片
    - 原因:
    - 点击右侧按钮 是通过 num++ 来实现的 而 num变量 跟前面的 点击导航点没有任何的关系 所以它们就存在这差异

    - 解决方案, 当我点击导航点的时候 让num跟着一起变化 拿到点击的导航点的第几个值就好了
    ```js 
        比如我点击导航点 当前图片的索引号为2, 那么把我num修改为2, 再点击右侧按钮 是不是就是 从2++
    ```
- 核心思路:
- 当我点击小圆点的时候 拿到index 然后把num的值 修改为这个索引号

- 这部分逻辑 放在了 点击导航点的部分 
```js 
    // 当点击了某个小li的时候 就拿到当前小li的索引号
    let index = this.getAttribute('index');

    // 当我们点击了某个小li 就要把这个li的索引号 给 num
    num =index;
```

\\ bug2
- 当我点击第三个导航点, 再点击右侧按钮, 这时导航点应该变成第4个, 可是它跑第二个去了
    - 原因:
    - 导航点样式的变化 是通过circle变量来控制的 所以我也要拿到点击小圆点时的索引号 给 circle

- 这部分逻辑 放在了 点击导航点的部分

\\ bug3
- 图片和父盒子之间有空隙
- 父盒子的宽度是720px 图片的宽度是721 我们再css里 把720 - 721

> 第九步 实现左侧按钮的功能
- 不管是右侧点击按钮 还是 左侧点击按钮 都有一段 重置导航点样式的代码 可以提取出来 变成一个函数
```js 
    // 左侧按钮的功能
    arrowL.addEventListener('click', function () {
        if (num == 0) {
            // 这里是 当在第一张图片处点左按钮, 迅速跳到最后一张一模一样的
            ul.style.left = -(ul.children.length - 1) * focusWidth  + 'px';
            // 让num去最后一张 这时ul的整体是往左移动的 所以是-值
            num = ul.children.length - 1;
        }

        // 往左移动 此处应该是num--
        num--;
        animate(ul, -num * focusWidth);

        // 小圆点这也要--
        circle--;
        if(circle < 0) {
            circle = ol.children.length - 1;
        }

        // 此处可以封装成一个函数
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    });
```

> 第十步 自动播放
- 通过定时器实现
- 我们发现 自动播放 相当于我们点击了右侧按钮
- 我们右侧按钮都是手动点击触发, 现在我想让定时器自动调用这个事件
> 此时我们使用 手动调用 右侧按钮 点击事件, arrow_r.click()
```js 
    let timer = setInterval(function(){

        // 手动调用点击事件
        arrowR.click();
    }, 2000)
```

- 鼠标经过focus父盒子的时候 就停止定时器 鼠标离开开启定时器

-------

> 区别:
```js 
    1. 导航点是根据图片的张数动态生成的
    2. 点击小圆点后的选中效果的实现方式不同
        - 李老师:   在外部创建了一个index=0的变量, 把这个变量给了导航点
        - pink:     是选择了添加的 类的操作模式

    3. 导航点的下标的获取方式不同
        - 李老师:   在for循环中给每一个导航点添加了一个num属性
        - pink:     选择了在for循环动态创建li的时候, 同时给它绑定了自定义属性

    4. 点击按钮翻页功能:
        - jQ老师:   定义了一个翻页函数nextPage() 会传进来true或者false, 因为就两个分支 一个左一个右, 所以是正值还是负值(ul的移动距离) 跟传进来的boolean值有关系
            next? -PAGE_WIDTH:PAGE_WIDTH;

        - pink:     分开做的 先做的右侧 然后把代码复制了下 给了左侧 进行了细微的修改

    5. 关于图片滚动同步小圆点的区别:
        - 李老师:
        - pink:     同步小圆点的功能 和 滚动图片的功能都放在了点击右侧按钮事件中, 相当于点击一次按钮处理两个效果

    6. 关于轮播中用的下标
        - 李老师:   所有功能用的都是一个index
        - pink:     导航点用了circle 按钮用了num 用了不同的变量 但是最后把两个变量都跟自定义属性index关联了在一起
```


----------------

### 节流阀
- 防止轮播图按钮连续点击造成播放过快
- 节流阀目的: 当上一个函数动画内容执行完毕, 再去执行下一个函数动画, 让事件无法连续触发

- 核心思路: 利用回调函数, 添加一个变量来控制, 锁住函数 和 解锁函数
- 在某些条件下 关上水龙头 在某些条件下打开水龙头

```js 
    // 开始

    let flag = true;
    if(flag) {
        flag = false;

        do somethind;   
    }

    // 如果flag为true 进来我就给你变成false 锁住函数 然后可以做一些事情 现在就相当于水龙头已经关闭了 当再次点击的时候 你就没办法再放水了 因为是false了,if(flag) 为false了 就没办法执行里面的代码了 就没办法播放图片了

    // 但不能一直不播放啊 什么情况下可以播放呢?
    利用回调函数 动画执行完毕, flag = true > 打开水龙头

    这时候我们又进入的新的开始
```

```js 
    以右侧按钮为例


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


----------------

### 案例 返回顶部
- 滚动窗口至文档中的特定位置

> window.scroll(x, y);
- 可以让窗口的滚动到指定位置
- 不用加单位 直接写数字即可
    window.scroll(0, 100)

- 带有动画的返回顶部 我们可以继续使用我们封装的动画函数
- 我们把动画函数中跟left的值改为跟页面垂直滚动距离相关的就可以了(window.pageYOffset)

> window.pageYOffset
- 页面滚动了多少我们可以根据window.pageYOffset来得到

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


----------------

### 案例 筋斗云
- 鼠标经过某个小li, 筋斗云跟到这当前小li位置
- 鼠标离开这个小li, 筋斗云复原为原来的位置
- 鼠标点击了某个小li, 筋斗云就会留在点击这个小li的位置

- 思路:
- 利用动画函数做动画效果
- 原先筋斗云的起始位置是0
- 鼠标经过某个小li, 把当前小li的offsetLeft位置, 作为目标即可
- 鼠标离开某个小li, 就把目标值设为0

- 点击某个小li之后 就把筋斗云的起始位置定位点击的位置, 下次就从点击的位置开始进行下一次的运动

- 如果点击了某个小li 就把li当前的位置存储起来, 作为筋斗云的起始位置

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


----------------

### 面向对象的Tab栏切换
- 需求:
- 1. 点击tab栏可以切换效果
- 2. 点击 + 号 可以添加tab项和内容项
- 3. 点击 x 号 可以删除当前的tab项和内容项
- 4. 双击tab项文字或者内容项文字, 可以修改里面的文字内容

> 面向对象开发思路:
- 先把公共的属性和方法抽取出来 放到一个类里面, 再根据我们类实例化对象创建各种各种的对象

- 实现步骤:
- 抽象对象: Tab栏  接下来根据有什么样的功能划分若干模块

- 该对象具有切换功能

- 该对象具有添加功能
    - 点击 + 可以实现添加新的选项卡 和 内容
    - 第一步 创建新的选项卡卡 和 新的内容section
    - 第二步 把新创建的两个元素追加到对应的父元素中
```js 
    以前的做法, 动态创建 createElement 但是元素里面内容较多, 需要innerHTML赋值 再appendChild追加到父元素里面

    现在的做法:
    利用insertAdjacentHTML() 可以直接把字符串格式元素添加到父元素中
```

- 该对象具有删除功能
    - 点击 x 可以删除当前的li选项卡 和 当前的section
    - 但是 x 是没有索引号的, 但是它的父亲li有索引号, 这个索引号正式我们想要的索引号 

    - 核心思路:
    - 点击 x 可以删除这个索引号对应的li 和 section
> 利用remove()方法可以直接删除指定的元素


- 该对象具有修改功能
    - 双击选项卡li或者section里面的文字, 可以实现修改功能
    - 双击事件 ondblclick
        - 如果双击文字, 会默认选定文字, 此时需要双击进制选中文字

    - 核心思路:
    - 当双击文字的时候, 在里面生成一个文本框, 当失去焦点或者按下回车然后把文本框输入的值给原先的元素即可

--------

> 元素对象.insertAdjacentHTML()
- 以直接把字符串格式元素添加到父元素中

- 参数:
- 插入的位置
    - beforebegin:  元素自身的前面  (插入到父元素的前面, 外部)

    - afterbegin:   插入元素内部的第一个子节点之前
    - beforeend:    插入元素内部的最后一个子节点之后 相当于appendChild

    - afterend:     元素自身的后面  (插入到父元素的后面, 外部)
- 插入的字符串
- 使用方法:
    let html = '<div id='two'>two</div>';
    div.insertAdjacentHTML('beforeend', html)

```js 
    appendChild不支持追加字符串的子元素(只能通过createELement创建的元素才能用appendchild) 
    
    insertAdjacentHTML支持追加字符串的元素
```
----------------

### 双击禁止选中文字
> window.getSelection ?window.getSelection().removeAllRanges() :document.selection.empty();

----------------

### 将文本框的文字处于选中状态
> input.select();

----------------

### 自动调用事件    没有on 事件名后加();
> this.blur();
> this.click()


----------------

### 移动端案例
- touchstart touchmove touchend可以实现拖动元素
- 但是拖动元素需要当前手指的坐标值, 我们可以使用 targetTouches[0]里面的pageX, pageY
- 移动端拖动的原理: 手指移动中, 计算出手指移动的距离, 然后用盒子原来的位置 + 手指移动的距离

- 没办法拿到手指的移动距离, 但是我们得到手机的当前坐标
- 手指移动的距离: 手指滑动中的位置 减去 手指刚开始触摸的位置
```js 
    比如第一次触摸div的时候位置是10px 然后手指移动到了30px的位置上 30-10移动了20px的距离
```

> 拖动元素三部曲:
1. 触摸元素 touchstart: 获取手指初始坐标, 同时获得盒子原来的位置
2. 移动手指 touchmove:  计算手指的移动距离, 并且移动盒子
3. 离开手指 touchend
```js 
    注意: 手指移动也会触发滚动屏幕所以这里我阻止默认的屏幕滚动
    event.preventDefault();
```

let div = document.querySelector('div');
// 计算手指的初始坐标 盒子的初始位置 应该在全局范围来定义, 因为另一个move的函数也要使用它
let startX = 0;
let startY = 0;

// 盒子原来的位置
let x = 0;
let y = 0;

div.addEventListener('touchstart', function(e){
    
```js 当手指点击屏幕上的初始位置, 用第一根就可以```
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;

```js 盒子原来的位置```
    x = this.offsetLeft;
    y = this.offsetTop;
})

div.addEventListener('touchmove', function (e) {
```js 计算手指的移动距离 手指移动之后的坐标 - 手指初始的坐标```
```js 手指不断的移动就能得到最新的坐标e.targetTouches[0].pageX```
    let moveX = e.targetTouches[0].pageX - startX;
    let moveY = e.targetTouches[0].pageY - startY;

```js 移动盒子 盒子原来的位置 + 手指移动的距离```
    this.style.left = x + moveX + 'px';
    this.style.top = y + moveY + 'px';

```js 取消滚动屏幕的默认行为```
    e.preventDefault();
})

```js 松开手move就停止了不像pc端还要用到onmouseup```



