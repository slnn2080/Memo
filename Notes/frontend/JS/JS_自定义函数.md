### 自定义函数

### 添加 删除 ClassName
> 检查当前对象的classname内 有没有指定值
```js 
    function hasClass(obj, cssName){
        let reg = new RegExp('\\b'+cssName+'\\b');
        return reg.test(obj.className)
    }   
    结果为一个布尔值
```


> 添加className
```js 
    function addClass(obj, cssName){
        obj.className += ' '+cssName;
    };
```


> 删除一个className
```js 
    function removeClass(obj, cssName){
    let reg = new RegExp('\\b'+cssName+'\\b');
    obj.className = obj.className.replace(reg, '');
};
```


> 切换一个className
```js 
    function toggleClass(obj, cssName){
        if(hasClass(obj, cssName)){
            removeClass(obj, cssName);
        }else{
            addClass(obj, cssName);
        }
    }; 
```



### 获取元素当前样式
```js 
    function getStyle(obj, attr){
        if(window.getComputedStyle){
            return getComputedStyle(obj, null)[attr];
        }else{
            return obj.currentStyle[attr];
        }
    };
```


### 获取兄弟节点的兼容性函数
```js 
    function getNextElementSibling(element) {

        // 把元素传进来 给变量 el
        let el = element;
        while (el = el.nextSibling) {
            if (el.nodeType == 1) {
                return el
            }
        }
        return null
    }
```



### 使用addEventListener绑定事件, ie不支持
```js
function bind(obj, eventName, callback){
    if(obj.addEventListener){
        obj.addEventListener(eventName,callback,false);
    }else{
        obj.attachEvent("on"+eventName,function(){
            callback.call(obj);
        });
    }
};
```


### 移动函数
```js 
function move(obj, target, speed, callback){

    clearInterval(obj.timer);

    // 为了让传递speed时都传正, 所以一上来获取元素现在的位置
    // 来判断speed应该是正还是负
    let nowSite = obj.offsetLeft;

    // 现在的位置 < 目标 speed应该为正, 现在位置 > 目标 speed应该为负
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

            // 这里为了不需要回调函数时 不会报错
            // 如果有你就调 没有的话就不调了
            callback && callback();		
        }
    },30)
    
}; 
```


### 数字自动跳动 进度条自动增长

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


### 滚动条滚动到指定位置
- 要点: 不能用getboundingClientRect(), 因为它是获取到视口的 滚动条的话原点会滚进去 所以要获取到定位父元素的 所以使用offsetTop
- 要点: 滚动条滚动不要设置px 就是数字
- 要点: 停止定时器的时候 要写== 不要写>= 要不往上走的话 第一次执行完定时器就停了 会出问题

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