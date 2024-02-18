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

<br>

## height属性是不会继承的
在 CSS 中，height 属性默认是不会继承的。CSS 中有一些属性是可以继承的，比如 font-size、color 等

但是对于盒模型的尺寸属性，如 width 和 height，它们默认是不会从父元素继承值的。

height 的默认值是 auto，这意味着元素的高度会根据其内容的高度来自动调整。

如果你想让位于 #app 内的 ``<div>`` 也具有 100% 的高度，你需要显式地为该 ``<div>`` 设置 height: 100%。

但是，为了使这个设置生效，#app 的父元素（在这个情况下是 body 和 html）以及 #app 本身都必须有一个定义的高度。你已经提到设置了 html、body 和 #app 的高度为 100%，这是正确的做法。