### template

> 官网:
- https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E8%BF%87%E6%BB%A4%E5%99%A8

> 安装
- npm install art-template --save

> 参考网址:
- https://www.likecs.com/show-305760971.html
- https://blog.csdn.net/qq_61950936/article/details/125202205
- https://blog.csdn.net/weixin_52119040/article/details/120383637
- https://www.jianshu.com/p/a40a56377dac


> 示例:
```html
<body>
  <div id="app"></div>

  <script src="./node_modules/axios/dist/axios.min.js"></script>
  <script src="./src/assets/js/template-web.js"></script>
  <script id="template" type="text/html">
    <div>
      {{list.length}}
      <ul>
        {{each list}}
          <li>{{$value}}</li>
        {{/each}}
      </ul>
    </div>
  </script>

  <script>
    let app = document.querySelector("#app")
    template.defaults.imports.dateFormat = function(value){
      console.log(value)
    };

    // let data = {
    //   name: "sam",
    //   list: ["hello", "world", "!"],
    //   test: "<span>span</span>",
    //   time: new Date()
    // }

    axios({
      url: "http://localhost:3000/test",
    }).then(res => {
      let tnode = template("template", res.data)
      console.log(tnode)
      app.innerHTML = tnode
    })
  </script>
</body>
```