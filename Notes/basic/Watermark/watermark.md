# 网址:
```s
// watermark
https://github.com/brianium/watermarkjs

// watermark-dom
https://github.com/saucxs/watermark-dom
https://www.npmjs.com/package/watermark-dom

// 示例
http://brianium.github.io/watermarkjs/text.html
```

<br><br>

## watermark 示例:
```js
watermark(['./src/assets/images/case.jpg'])
  .image(watermark.text.center('加油', '180px Josefin Slab', '#fff', 0.6))
  .then(function (img) {
    document.getElementById('target').appendChild(img);
  });
```

<br><br>

### watermark-dom 示例:
```html
<template>
  <div id="app">
    <div id="target">
      <img src="./assets/imgs/case.jpg" alt="">
    </div>
  </div>
</template>

<script>

import {watermark} from 'watermark-dom'

export default {
  name: "App",
  mounted() {
    watermark.init({
      watermark_parent_node:document.querySelector("#target"),
      watermark_txt: "笨的啊",
      watermark_color:'#fff',
      watermark_fontsize:'30px',
      watermark_alpha:0.5
    })
  },
}
</script>
```