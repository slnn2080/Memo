### Drag
- html5提供专门的拖拽与拖放的API

> 兼容性：
- IE9以下不支持 Opera不支持 大部分浏览器都支持


> draggable属性
- 用于开启对应元素的拖拽功能
- <div title="拖拽" draggable="true">
<!-- 
  图片和链接默认是可拖动的 不需要 draggable属性
 -->


> 源元素的事件 (在拖动目标上触发的事件作用在被拖拽元素上)
> ondragstart
    用户开始拖动元素时触发

> ondrag
    元素正在拖动时触发

> ondragend
    用户完成元素拖动后触发
<!-- 
    该事件是在目标元素外部触发的
    也就是说 我拖动到一半了 不想拖进去 直接松手的时候触发的事件
 -->

**注意：**
- 上面的事件发生下被拖拽的元素身上


> 目标元素的事件(释放目标时触发的事件 作用在目标元素上)
- 把被拖拽的元素放到哪个目标容器里面去 这个容器就是目标元素

> ondragenter
    进入其容器范围内触发
    当鼠标拖动的对象进入其容器范围内时触发此事件

> ondragover
    被拖动的对象在另一个对象容器范围内拖动
    当某被拖动的对象在另一对象容器范围内拖动时触发此事件
<!-- 
    > evenet.preventDefault()
    - 阻止默认事件方法等执行
    - 在ondragover中一定要执行preventDefault 否则 ondrop事件 不会被触发  ！！！
 -->

> ondragleave
    拖动的对象离开其容器范围内时触发此事件
    当鼠标拖动的对象离开其容器范围内时触发此事件

> ondrop
    释放鼠标键时触发
    在一个拖动过程中 释放鼠标键时触发此事件

<!-- 

      被拖拽              目标对象

    ---------           ---------   
    |       |           |       |
    |       |           |       |
    |       |           |       |
    |       |           |       |
    ---------           ---------

 -->



> 案例 从一个div将目标传入另一个div
<!-- 
    <div class="wrap">
        // 被拖动元素的区域
        <div class="target">
            <ul>
                <li><div draggable="true">1. HTML</div></li>
                <li><div draggable="true">2. JS</div></li>
                <li><div draggable="true">3. Vue</div></li>
                <li><div draggable="true">4. React</div></li></li>
            </ul>
        </div>

        // 目标容器
        <div class="target-wrap">
        </div>
    </div>

---------------------

    // 被拖拽的对象有很多个 获取全部的拖被动元素
        let targets = $(".target ul li div")

    // 目标容器
    let wrap = $(".target-wrap")[0]

    // 在全局定义一个被拖动的元素对象 因为要把当前拖动的元素插入到目标容器 目标容器要使用这个元素
    let targetDom = null;

    // 给所有被拖拽元素绑定 ondragstart 事件
    targets.forEach((item, index) => {
        item.ondragstart = function() {
            // 将被选中的 被拖动元素 赋值给全局变量
            targetDom = this
        }
    })

    // 给目标容器绑定 ondragover事件 在这里首先阻止默认行为 让drop能够起到作用
    wrap.ondragover = function(e) {
        e.preventDefault()
    }

    // 在这里当 被拖拽元素在目标容器内松手的时候 我们就能在下面的事件中监听到
    wrap.ondrop = function() {
        console.log(targetDom)

        // 将当前被拖动的元素 插入到目标对象
        this.appendChild(targetDom)
    }


    function $(el) {
        return document.querySelectorAll(el)
    }
 -->


---------------------


> DataTransfer对象 -- event.dataTransfer
- 拖拽对象用来传递的媒介 使用一般为 event.dataTransfer
- 该对象用于保存拖动并放下过程中的数据 它可以保存一项或多项数据 这些数据可以是一种或者多种数据类型

- dataTransfer对象提供了一些方法用于在源元素 与 目标元素中共享数据
- 简单的说就是 想将 <被拖拽元素的数据> 传递给 <目标对象> 的时候,可以使用这个对象


- dataTransfer对象中的一些属性
<!-- 
    e.dataTransfet.files
        通过该对象能够获取到拖拽文件的类型
        比如我们是上传图片我们就能从这个 files 属性中得到上传图片的信息 它是一个数组

        files[0]
            lastModified: 1636690826904
            lastModifiedDate: Fri Nov 12 2021 13:20:26 GMT+0900 (日本標準時) {}
            name: "51636690825_.pic_hd.jpg"
            size: 18267
            type: "image/jpeg"
            webkitRelativePath: ""

    e.dataTransfet.items

    e.dataTransfet.types
 -->



>  event.dataTransfer.setData(type, data)
- 用于声明所发送的数据与类型
- 该方法用于定义要传递数据的 变量名 和 具体数据 相当于定义了 key: value
- type就是key value就是数据
<!-- 
    比如我们传递个 name: "sam"
    event.dataTransfer.setData("name", "sam")
    e.dataTransfer.setData("txt", e.target.innerHTML)

    获取数据的时候 就要通过指定的type值
    event.dataTransfer.getData("name")
 -->

**注意：**
- 当我们设置了要传输的数据的时候 但是没有到达目标容器就松手了
- 这时我们要删除设置的key value数据
- 我们还要给 被拖拽对象绑定 未到位目标元素松手的事件 ondragend 在内部调用删除数据的逻辑


> event.dataTransfer.getData(type)
- 返回指定的type的数据

> event.dataTransfer.clearData(type)
- 删除指定类型的数据

> event.dataTransfet.setDragImage(图片对象, 坐标x, 坐标y)
- setDragImage方法用于在拖放操作过程中 修改鼠标指针所指向的图像
- eg
- 当我们拖拽某个元素的时候 这个元素肯定是跟着这个鼠标 
- 当我们想把这个元素修改为某个图片的时候 也就是最终效果是图片跟着鼠标移动 那么就使用这个api
<!-- 
    第一个参数不能直接写路径 要使用图片对象
    let img = new Image()
    img.src = "./xxx"
    event.dataTransfet.setDragImage(img, 坐标x, 坐标y)

    再进行拖拽的时候就会显示一张图片在跟随鼠标
 -->

---------------------

> 案例 拖拽删除列表项
> ondragstart 事件中的处理逻辑
- 1. 可以设置传递数据
- 通过 e.dataTransfer.setData("txt", e.target.innerHTML) 的方式
- 该数据可以在 传递到 目标容器的时候生效 没有到达目标容器的时候要删除

- 2. 还可以设置跟随鼠标移动的是图片还是元素本身
- 3. 将被拖动元素赋值给全局变量


> ondragend 事件中的处理逻辑
- 1. 删除 设置的数据
- 2. 将全局变量赋值为空

<!-- 
    // 1. 找到所有可拖拽的对象
    let targets = $(".target ul li div")

    // 2. 目标容器 (垃圾箱)
    let wrap = $(".target-wrap")[0]

    // 在全局定义一个被拖动的元素对象 其它的地方要使用
    let targetDom = null;

    // 给所有被拖拽元素绑定 ondragstart 事件
    targets.forEach((item, index) => {

        item.ondragstart = function(e) {
            // 当我们想在 被拖拽元素 和 目标元素之间传递数据的时候 我们可以使用 事件对象身上的 dataTransfer 对象身上的方法
            
            // 首先先定义 我们要传递数据的变量名 和 具体数据
            // e.dataTransfer.setData 方法用于定义 key value

            e.dataTransfer.setData("txt", e.target.innerHTML)
            let msg = e.dataTransfer.getData("txt")
            console.log(msg)

            // 我们还可以设置 图片代替元素本身跟随鼠标移动的效果
            let img = new Image()
            img.src = "./img/51636690825_.pic_hd.jpg"
            e.dataTransfer.setDragImage(img, 0, 0)

            // 当我们开始拖拽一个元素的时候 就把这个元素赋值给全局变量
            targetDom = this
        }

        // 当 被拖拽元素 未到达目标容器的情况下 我们要清楚我们定义的要传输的数据
        item.ondragend = function(e) {
            e.dataTransfer.clearData("txt")

            // 当我们未到达目标容器的时候 就想全局变量置为空
            targetDom = null
        }
    })

    


    // 目标容器对象 我们要监听什么事件呢？
    // 比如一进入目标容器事件 垃圾箱就换个背景 我们就可以监听 ondragenter 事件

    wrap.ondragenter = function(e) {
        this.style.backgroundColor = "pink"
    }


    // 给目标容器绑定 ondragover事件 在这里首先阻止默认行为 让drop能够起到作用
    wrap.ondragover = function(e) {
        e.preventDefault()
    }

    // 当目标元素进入到垃圾箱后我们要进行删除的操作
    wrap.ondrop = function(e) {

        // 这里我们判断一下是不是有目标元素的存在
        if(targetDom) {
            let msg = e.dataTransfer.getData("txt")
            $(".info")[0].innerHTML = msg + "被删除了"
            】
            // 或者先找到该节点的父亲再删除
            targetDom.remove()
            // targetDom.preventNode.removeChild(targetDom)
        }
        this.style.backgroundColor = ""
    } 

    
    function $(el) {
        return document.querySelectorAll(el)
    }
 -->

---------------------

> 案例 拖拽文件进行上传 并以base64文件格式上传后端服务器
- 1. 文件拖拽上传并以base64传给后台
- 2. 可以有缩略图显示
- 3. 可删除缩略图 同时更新传给后台的数据


> 要点1：
- 1. 要是想监听 ondrop 事件的时候 必须要在 ondragover 事件中阻止默认行为
- 2. 在图片拖拽上传的案例中 当把图片拖拽到目标区域后(也就是当把图片拖拽到浏览器上的时候) 浏览器会将图片打开 这时也需要在 ondrop 事件中阻止浏览器的默认打开图片的行为

- 3. 拖拽元素的信息都在 e.dataTransfer对象 中
- 该对象中的 files 属性就包含了 我们拖拽元素的信息
<!-- 
    e.dataTransfet.files
        通过该对象能够获取到拖拽文件的类型
        比如我们是上传图片我们就能从这个 files 属性中得到上传图片的信息 它是一个数组

        files[0]
            lastModified: 1636690826904
            lastModifiedDate: Fri Nov 12 2021 13:20:26 GMT+0900 (日本標準時) {}
            name: "51636690825_.pic_hd.jpg"
            size: 18267
            type: "image/jpeg"
            webkitRelativePath: ""
 -->

- 4. 这个案例中 我们关系的是 图片的大小 
- e.dataTransfer.files[0].size 当大于400k的时候 就不让上传了

- 5. 将图片转为base64的逻辑 需要用 FileReader API 它当中有很多的方法
> readAsDataURL 方法可以将目标转为base64格式
<!-- 
    readAsArrayBuffer
            可以做缓存 缓存数据

    readAsBinaryString

    readAsDataURL
            通过这个方法将图片转换为base64

    readAsText
    readAsState
 -->

> readAsDataURL方法转换的结果是异步的 所以要搭配 reader.onload 来使用
- 我们可以在回调中 通过e.target.result 拿到结果


- 6. base64的字符长度就是文件的大小 e.target.result.length 就是图片的大小

<!-- 
<div class="main">
    <div class="upload-area">
        或者将文件拖动到此处
    </div>
    <button id="btn">上传</button>
</div>
<ul class="preview"></ul>

<script>
    // 目标对象 也就是上传区域
    let wrap = $(".upload-area")[0]

    // 以数组的形式 需要给到后台的图片数据 当点击上传按钮的时候 要使用的数据
    let allBaseImage = []

    // 定义允许上传最大图片的尺寸 超过400k上传失败 我们可以跟base64字符串的长度进行对比
    let allowImgFileSize = 1024 * 400

    let preview = $(".preview")[0]

    // 因为图片都在文件夹里面所以不用监听被拖拽元素的一系列方法 
    但是需要监听目标容器身上的事件 比如当图片在目标容器上放下的时候
    wrap.ondragover = function(e) {
        e.preventDefault()
    }

    // 主要的逻辑就在这个在目标容器内放下被拖拽元素的时候触发的事件里
    wrap.ondrop = function(e) {

        // 当我们把一个图片拖动到浏览器上的时候 
        效果会是图片在浏览器上打开 这也是默认行为要阻止
        e.preventDefault()

        // e.dataTransfer就是拖拽元素的信息对象
        // console.log(e.dataTransfer)

        // e.dataTransfer的files属性 是我们拖动元素的信息
        // console.log(e.dataTransfer.files)

        // 我们要将图片转为base64格式 首先要拿到所有的上传图片 多个文件
        let imgFiles = e.dataTransfer.files

        // 转换成base64
        transferDataToBase64(imgFiles)
    }


    // 转为base64的逻辑
    function transferDataToBase64(files) {
        // console.log(typeof files)  // 对象 所以不能使用forEach

        for(let i=0; i<files.length; i++) {
            let img = files[i]
            // 使用FileReader将文件转为base64格式
            let reader = new FileReader()
            reader.readAsDataURL(img)

            // reader对象的操作是异步的 不能马上得到结果 所以使用onload事件
            reader.onload = function(e) {

                // 通过e.target.result得到转换的结果
                let base64Img = e.target.result

                // 在往 allBaseImage数组里push之前 我们还要对其进行判断
                // 判断数组中是否已经包含了该图片

                // 还可以使用 includes 方法 我们先获取index 
                如果不等于-1说明数组中已存在该图片
                let index = allBaseImage.indexOf(base64Img)

                if(index != -1) {
                    return
                }

                // 我们还要判断该图片转换后结果的大小 超过400k就不让上传了
                // 这里注意当我们将图片转为base64格式后 会是一堆的字符 
                该字符的长度越长代表图片越大 同时该字符的长度也是图片的大小
                // e.target.result.length 就是图片的大小

                if(base64Img.length > allowImgFileSize) {
                    alert("图片上传失败 尺寸不符")
                    return
                }
                // 都没有问题推到数组里面去
                allBaseImage.push(base64Img)

                // 文件解析成base64后 在缩略图区域展示图片
                let str = `
                    <li><img src="${base64Img}"><i class="close">x</li>
                `
                // 因为有很多的图片都要放入ul中 所以我们要用 +=
                preview.innerHTML += str
            }
        }
    }

    // 监听缩略图的删除事件 因为 x 是后面动态添加的 所以这里要使用事件委托
    preview.onclick = function(e) {
        if(e.target.className == "close") {
            // 如果点击的是x的话 我们要进行删除逻辑 我们怎么能找到对应的图片呢？ 这里是用过 e.target 就是x 找到它前一个兄弟 就是对应的图片
            let thisImg = e.target.previousElementSibling
            // console.log(thisImg)
            
            // 更新数组中的数据
            // 在数组中还要删除图片 那我是不是要知道 我现在的这张图片在数组中的位置
            let imgIndex = allBaseImage.indexOf(thisImg)
            allBaseImage.splice(imgIndex, 1)

            // 删除li标签
            e.target.parentNode.remove()
        }
    }

    function $(el) {
        return document.querySelectorAll(el)
    }
</script>
 -->


---------------------

### Vue-Draggable 插件
- 安装 
- npm i -S vuedraggable

- 引入
- import draggable from "vuedraggable"

- 注册
- components 注册

- 网址
- github.com/SortableJS/Vue.Draggable


<draggable 
    v-model="myArray" 
    group="people"          // 组与组之间可以进行拖拽分组的 同一个组的话 才可以拖动
    @start="drag=true"      // dragstart
    @end="drag=false">      // dragend

   <div v-for="element in myArray" 
    :key="element.id">
    {{element.name}}
    </div>
</draggable>

data() {
    return {
        drag: false     // 默认不拖拽
    }
}

