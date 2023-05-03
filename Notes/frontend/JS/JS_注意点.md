## forEach中的return没有返回值

## document.getElementBy... 获取的是动态集合 & document.querySelector 获取的是静态集合
当使用 
- document.getElementById
- document.getElementsByClassName 

等类似方法获取元素时，**返回的是一个动态的** HTMLCollection 或 NodeList 对象。
**这意味着当文档中的元素发生变化时，这个集合也会相应地更新。**

<br>

而当使用 
- document.querySelector
- document.querySelectorAll 

等方法获取元素时，**返回的是一个静态的** NodeList 对象。  
**这意味着它们只会在查询时一次性地获取匹配的元素，之后即使文档中的元素发生变化，这个 NodeList 对象也不会更新。**

<br>

因此
- 在需要动态获取集合的场景下，应该使用 document.getElementBy... 等方法；
- 在需要静态获取集合的场景下，应该使用 document.querySelector 等方法。

<br>

### 参考文档:
```s
https://www.jiangweishan.com/article/js20220125a1.html
```