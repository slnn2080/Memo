# index计数器的使用技巧 / 规律

## index为负数, 从后往前访问数组中的元素

### 需求:
我们希望定义一个方法, 传入下标值 可以传入负数, 当下标值为负数的时候 可以从数组的末尾来进行访问

例如: 
```js
let arr = [1,2,3,4,5]
```

期望:
```js
console.log(arr[-1])  // 5
```

<br>

### 实现方式: index(负数) += arr.length
1. arr.length 为数组的长度 - 5
2. 当下标值为负数的时候 我们让它 + arr.length时, 有如下的规律

<br>

### 代码实现:
利用了反射部分的相关知识

1. createArray 接收一个 arr数组对象
2. createArray 函数返回一个Proxy代理对象
3. 在代理对象中使用get + 反射的方式 读取源数组中的元素
```js
let arr = [1,2,3,4,5]
    
function createArray(arr) {
  return new Proxy(arr, {
    // 参数2: propName 对于数组来讲就是下标
    get(target, index) {

            // 对于属性名来说 index 的类型为 string
      index = Number(index)

      // 判断传入的 index 是否为负数
      if(index < 0) {
        index += target.length
        return Reflect.get(target, index)
      } else {
        return Reflect.get(target, index)
      }

    }
  })
}

arr = createArray(arr)
console.log(arr[-1])    // 5
```

<br><br>

## 技巧: n * i + m
- n 表示隔几个数字
- m 表示起始值为几

<br>

比如从索引3的位置开始, 每隔4个数字 进行输出
```js
for(let i = 0; i < 30; i++) {
  console.log(4 * i + 3)
} 

3
7
11
15
19
```

<br>

### 示例:
```js
let arr = [0,1,2,3,4,5,6,7,8,9,10]
for (let i = 0; i < arr.length; i++) {
  // 如果该值为最后一个元素了 则退出
  if((2 * i + 2) > arr.length - 1) break

  // 输出该值
  console.log(arr[2 * i + 2])
}
```

<br><br>

## 技巧: n % 5
用在了轮播上
```js
index = index % imgArr.length;
img1.src = imgArr[index];

// 0 1 2 3 4 0 1 2 3 4
```

<br><br>

## 技巧: 每次比前一次自增1
用在双重for循环中的时候吧
```js
j < i + 1
```

<br><br>

## 技巧: 每次比前一次自减1
用在双重for循环中的时候吧
```js
j < 5 - i

res  i
 5   0
 4   1
 3   2
 2   3
 1   4
 0   5
```

<br><br>

## 技巧: 当我们对一个数字进行取模操作的时候 结果不会超过被模数
比如 ``i % 2`` 其结果就会在 0 和 1 之间进行交替
```js
for(let i = 0; i < 10; i++) {
  console.log(i % 2)
}

// 0 1 0 1 0 1
```

当出现 0 n 0 n 这样的规律时 我们就可以考虑使用该方式

<br><br>

## 技巧: Math.floor(i / 2)
当我们出现 0 0 1 1 2 2 3 3 这样规律的时候 可以考虑 ``i / 2 向下取整`` 的操作

<br>

### 观察
我们输出 i / 2 看看结果是多少

```js
for(let i = 0; i < 10; i++) {
  console.log(i / 2)
}

0
0.5
1
1.5
2
2.5
3
3.5
4
4.5
```

这时我们再对上述结果进行向下取整 看看
```js
for(let i = 0; i < 10; i++) {
  console.log(Math.floor(i / 2))
}

0
0
1
1
2
2
3
3
4
4
```

<br>

### 应用:

|left|top|数值|数值|
|:--|:--|--:|--:|
|left: 0|top: 0|0|0|
|left: -w|top: 0|-1|0|
|left: 0|top: -h|0| -1|
|left: -w|top: -h|-1|-1|

上面的表格中出现了两种规律的值
- 0 -1 0 -1 -> 第一种情况我们可以选择 i % 2
- 0 0 -1 -1 -> 第二种情况我们就可以选择 i / 2 并向下取整

```
0%2 0  -  0/2 0
1%2 1  -  1/2 0
2%2 0  -  2/2 1
3%2 1  -  3/2 1
```

<br>

### 需求: 同时分别改4张图片的位置:
```js
img.style.left =-(i % 2) * w + 'px'
img.style.top = Math.floor(i / 2) * h + 'px'
```

<br><br>

# 循环: 1 2 3 4 5 4 3 2 1
当出现如下的这种 先是依次递增 然后再依次递减的情况下 我们可以定义一个系数
- 递增期 让该系数为 1
- 递减期 让该系数为 -1

我们够将该系数 和 目标值做 += 的操作

```js
let num = 0;
let ratio = 0;

setInterval(function(){

  // 指定该系数是 1 还是 -1
  if(num == 0) {
    ratio = 1
  }else if(num == 10) {
    ratio = -1
  }

  // 让它做 += 的操作
  num += ratio;
  console.log(num);
}, 500);
```

<br><br>

# 循环: 0 1 2 3 4 0 1 2 3 4
num % 5   

```js
num++;
num = num % 10;
console.log(num);
```