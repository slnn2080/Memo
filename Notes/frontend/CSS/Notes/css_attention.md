## p元素中不能放任何块元素

<br><br>

## 表格中 tbody 的问题
如果表格中没有使用tbody而是直接使用tr 那么浏览器会自动创建一个tbody 并且将所有tr装进tbody中, 所以记住 **tr不是table的子元素 是tbody的子元素**

默认情况下 元素在td中是垂直居中的 可以通过vertical-align来设置垂直的对齐方式


<br>

## fixed一定是相对于视口么 
一旦一个元素使用了 transform css属性, 则该元素的子元素中 如果子元素有固定定位则固定定位元素就不再相对于视口了 而是相对于开启了transform元素
```html
<div style="transform: scale(1.1)">
  <div>如果该div为fixed, 则该div不再相对于视口, 而是相对于它的父元素</div>
</div>
```