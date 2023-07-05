# Emmet
于2006年创建的一种语法,  它的作用就是简化 html 和 css 的编写 提供开发效率

- Haml 创建于2006年
- Sass 创建于2006年
- Emmet 语法创建于2008年

现在这种语法已经内置到我们的编辑器当中 所以我们在写html css的时候 我们会发现 咱写个div tab下 自动生成一对标签了是么

<br><br>

## HTML: 常用语法 + tab

### 标签名
- 标签名 + tab
- 标签名 + 类型
```html
input:button
```

<br>

### 创建父子关系的标签
```html
div>p
```

<br>

### 创建兄弟关系的标签
```html
div+div
```

<br>

### 在指定标签前插入同级标签
```html
div^div

div>p^div
```

<br>

### 创建带id的标签
```html
div#container
```


<br>

### 创建带class的标签
```html
div.container
```

<br>

### 创建标签属性带值的标签
```html
div[data-index="1"]
```

<br>

### 创建标签时指定标签体
```html
div{文本内容}
```

<br>

### 创建复数标签
```html
div*数字
```

<br>

### 标签体自动计数功能
- $: 自动计数不仅仅能使用在标签体中 还可以使用在标签属性中
- $: 还可以用来补位
```html
div*3{文本内容$}

div.item$*3

<!-- 使用 0 补位 -->
div.item$$$*11
```

<br>

## CSS: 常用语法 + tab
我们写css的时候 可以简写也是因为emmet语法的原因哦
```css
.item {
  pos:r
}
```

<br>

```s
https://docs.emmet.io/cheat-sheet/
```