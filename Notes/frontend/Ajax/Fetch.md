# Fetch

### 第三方库: umi-request
```s
https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
```

<br>

### 语法:
### **<font color='#C2185B'>fetch(url, options)</font>**
```js
const response = await fetch("http://example.com/movies.json");
const movies = await response.json();
console.log(movies);
```

该 **Response对象** 并不直接包含实际的 JSON 响应正文，而是**整个 HTTP 响应的表示**。

为了从对象中提取 JSON 正文内容Response，我们使用该json()方法，该方法返回第二个 Promise

<br>

### 参数
```js
{
  method: 'POST | GET, | PUT | DELETE |',
  headers: {
    "Content-Type": "application/json | application/x-www-form-urlencoded | multipart/form-data | text/plain"
  },
  body: JSON.stringify(data),

  mode: "cors | no-cors",
  // 要使浏览器发送包含同源和跨源调用中包含的凭据的请求
  credentials: "same-origin | include | omit",
  redirect: "follow",
  referrerPolicy: "no-referrer"
}
```

<br>

**content-type:**  
1. application/x-www-form-urlencoded: 要求body格式为 (username=yiyi&password=123)

2. application/json: 要求body格式为 JSON.stringify

3. multipart/form-data: 上传文件发现, **并不用携带此头部**

<br>

### 返回值:
fetch方法的返回值为 response, 它是整个的响应信息对象, 如果需要获取里面的信息, 需要通过该对象继续调用 json() 等方法

```js
{
  body: (...)
  bodyUsed: false
  headers: Headers {}
  ok: false
  redirected: false
  status: 404
  statusText: "Not Found"
  type: "cors"
  url: "http://localhost:3333/get1"
}
```

<br>

**response 身上的方法**
- response.blob(): 返回 promise, 拿到blob
- response.json(): 返回 promise, 拿到json
- response.text(): 返回 promise, 拿到文本

<br><br>

## fetch方法不能用catch捕获错误

### 演示:
```js
try {
  const res = await fetch('http://localhost:3333/get1')
  console.log(res)
} catch (err) {
  console.log('catch')
  console.log(err)
}

fetch('http://localhost:3333/get1')
  .then(
    (res) => console.log('then', res),
    (err) => console.log('then', err)
  )
  .catch((err) => console.log('catch', err))
```

<br>

我们使用了上面两种方式 测试请求地址错误时候的情况, 发现 catch 的部分并不会执行, 而是在控制台抛出了错误, 也就是说 **fetch并不能使用catch来捕获错误**

fetch不能用catch主动捕获错误，就是出错了，它不会就去走catch了，它还会继续往下执行，所以出错了需要自己去处理

<br>

请求数据会出现问题：要么是地址填错了，填的地址没有数据；要么是地址是正确的，因为别的原因数据请求不回来，网络的问题也有可能。

<br>

### 解放方式: response.ok
响应结果中结果中有一个ok这个值 和 status状态这个值
- ok这个值是当请求成功就是ture，请求失败就是false
- status是请求成功为200，请求失败为404

所以我们要在第一个then后面输出一下res的值，而且要进行if条件判断，然后自己进行处理：
```js
fetch(`http://localhost:3000/users?username=${username}`)
  .then(
    res => {
    if(res.ok){
      return res.json()
    } else{
      //拒绝
      //reject后面{}放着拒绝以后要返回的值，可以自己定义，一般是返回status和
      return Promise.reject({
        status:res.status,
        statusText:res.statusText
      })
    }
  })
```

<br><br>

## 上传JSON数据: body: JSON.stringify(data)
```js
async function postJSON(data) {
  try {
    const response = await fetch("https://example.com/profile", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

const data = { username: "example" };
postJSON(data);
```

<br><br>

## 上传文件
可以使用 HTML``<input type="file" />``输入元素FormData()和fetch().

上传文件我们会使用 formData, 但是并没有配置头部信息
```js
async function upload(formData) {
  try {
    const response = await fetch("https://example.com/profile/avatar", {
      method: "PUT",
      body: formData,
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append("username", "abc123");
formData.append("avatar", fileField.files[0]);

upload(formData);
```

<br><br>

## 返回2进制数据
我们使用 res.blob() 方法拿到blob类型的数据 随后进行操作
```js
async function fetchImage(request) {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const myBlob = await response.blob();
    myImage.src = URL.createObjectURL(myBlob);
  } catch (error) {
    console.error("Error:", error);
  }
}

// 使用 Headers 对象 封装头部信息
const myHeaders = new Headers();

// 使用 Request 对象 请求体信息
const myRequest = new Request("flowers.jpg", {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
});

fetchImage(myRequest);
```

<br><br>

## 响应数据 转换为 csv 后进行下载
后面会响应给我们数据, 下面我们需要转换为指定的编码类型后 进行下载的操作

<br>

### utf-8编码格式的csv 下载处理
**建议尝试: 未尝试**

下面的做法是将 response.text() 转换为文本, fetch在处理text()方法的时候会默认使用utf-8来进行转换 如果服务器的文本格式是 ms932 的话, 这样的操作会将 ms932 -> utf8, 会破坏编码格式

所以我们可以尝试下下面的方式 直接response.arrayBuffer(), 获取二进制数据
```js
// MS932はバイナリデータとして扱うため、ArrayBufferとして取得
const arrayBuffer = await response.arrayBuffer()

// BLOBオブジェクト生成(バイナリデータ, ファイルタイプ)
const blob = new Blob([arrayBuffer], { type: mimeType })
```

**response.blob() vs response.arrayBuffer()**  

**response.blob()**  
用途：如果你的目标是直接处理文件（如下载、显示或保存文件），blob() 是更自然的选择，因为 Blob 是浏览器中用来表示文件的数据类型。

优点：简洁明了，直接生成可以用于下载的 Blob 对象。你可以直接传递给 downloadFile 方法。

缺点：无法直接操作 Blob 的内容，适用于你不需要进一步处理文件内容的场景（例如，不需要手动转换字符编码）。


**response.arrayBuffer()**  
用途：如果你想对文件数据进行更精细的操作（如解码字符、修改内容等），可以使用 arrayBuffer()，它提供更底层的二进制数据。

优点：适合需要操作数据或解码的场景，比如使用 TextDecoder 或 encoding.js 进行字符编码转换。

缺点：相对于 blob()，稍微繁琐一点，因为你需要手动创建 Blob。

response.blob() 更适合你的情况，因为你只需要处理文件下载，无需操作数据内容。

使用 Blob 类型文件更简洁，浏览器也能很好地处理 Blob 数据直接下载。
```js
const blob = await response.blob(); // 直接使用 response.blob()
```

<br>

**正文:**  
```js
/*
  execFetch
    它就是封装的请求方法, 我们关注的是 response
*/
execFetch(param)
  .then(async (response: Response) => {
    // 1. 获取 文件名
    const fileNameArr = response.headers.get('content-disposition')?.split('filename=')

    let fileName
    if (fileNameArr != null) {
      // 2. 解码 文件名
      fileName = decodeURI(fileNameArr[fileNameArr.length - 1])

      // 3. 获取 mimeType: text/csv;charset=MS932
      const mimeType = response.headers.get('content-type')?.split(';')[0].trim()

      // 4. 将响应转换为字符串, 然后创建 Blob 并指定type类型
      const blob = new Blob([await response.text()], { type: mimeType })

      // 5. 调用下载的方法
      downloadFile(fileName, blob)
    }
  })



/*
  1. 根据 blob 创建 url对象
  2. 创建 a 连接
  3. 将 a dom 加入到body中
  4. 点击
  5. 移除 a dom
  6. 移动 url 对象
*/
function downloadFile(fileName: string, blob: Blob): void {
  // ダウンロードリンクの生成
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = fileName
  link.href = url

  // ダウンロードリンクのクリック
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
```

<br>

**手动创建Blob:**  
**处理过程：**首先获取响应体的文本内容 (response.text())，然后使用 Blob 构造函数将其转换为一个 Blob 对象，显式地指定 Blob 的类型 ({ type: mimeType })

**优势：**可以根据需要手动指定或修改 Blob 的 MIME 类型。比如你可以直接从响应头获取 content-type，也可以使用自定义的 MIME 类型。
```js
const mimeType = response.headers.get('content-type')?.split(';')[0].trim();
const blob = new Blob([await response.text()], { type: mimeType });
```

<br>

**直接使用 response.blob():**  
**处理过程：**fetch API 直接调用 response.blob() 方法，将响应体转换为 Blob 对象，而不需要你手动处理或转换。

**优势：**更加简洁，适合不需要对数据进行任何额外处理的场景。

**MIME 类型：**response.blob() **会根据 content-type 自动设置 Blob 的类型，你无法在这一过程中直接指定 Blob 的类型**。如果你想改变类型，则需要在获取到 Blob 之后通过 Blob 构造函数重新封装，类似于：
```js
const myBlob = await response.blob();

// 类似
const originalBlob = await response.blob();
const mimeType = 'your/custom-mimetype';
const modifiedBlob = new Blob([originalBlob], { type: mimeType });
```

**注意:**  
Blob 对象本身不会处理字符编码，它只是保存数据。如果你需要读取 CSV 文件并以正确的编码解析内容，你需要手动指定字符集来读取 Blob 的内容。charset=MS932 表示使用了日本的 Shift_JIS 编码，但 Blob 对象只是存储数据，你在解析或显示时可能**需要处理编码**。

<br>

### 扩展: Shift-JIS 和 MS932
Shift-JIS 是一种字符编码，用于表示日语字符。

它是由日本标准协会 (JIS) 制定的编码方式之一，**用于在计算机系统中表示日语文本**，特别是**汉字**和**假名**。Shift-JIS 在日本的早期操作系统、软件、网页等方面非常流行。

Shift-JIS 是一种变长编码，**既支持单字节字符**（用于表示基本的 ASCII 字符），**也支持双字节字符**（用于表示日文的假名、汉字等）

Shift-JIS 编码的前 128 个字符与标准 ASCII 编码保持一致，所以**常见的英文字符在 Shift-JIS 下能够正常显示**

在日语操作系统（如 Windows 95 到 Windows XP）和软件中，Shift-JIS 是最常见的编码方式。虽然在现代开发中，UTF-8 编码更为常用，但 Shift-JIS 仍然在一些旧系统、应用程序和文件中被使用

<br>

**MS932 与 Shift-JIS 的关系:**  
MS932 是微软对日语字符编码 Shift-JIS 的一个扩展版本，**添加了额外的符号和字符**，因此它们非常相似，通常可以互换使用。

在大多数场景下，MS932 可以通过 Shift-JIS 编码来处理，因为它们之间的差异对许多普通日语文本并不显著。

<br>

### 如何编码 解码 MS932
JavaScript 默认不支持直接将文本转换为 MS932 编码

我们可以使用如下的两个库来解决
- iconv-lite
- encoding.js

其实我们也可以要求在后端将文本转换为 MS932 后, 前端直接使用也可以

<br>

### 其它(MS932)编码格式的csv 下载处理
使用 encoding.js 处理编码问题
```js
// 假设你已经引入了 encoding.js
async function fetchAndDecodeMS932() {
  // Step 1: 获取响应并转换为 Blob
  const response = await fetch('your-csv-file-url');
  const blob = await response.blob();

  // Step 2: 将 Blob 转换为 ArrayBuffer
  const arrayBuffer = await blob.arrayBuffer();

  // Step 3: 使用 encoding.js 将 ArrayBuffer 解码为 MS932
  // Uint8Array：encoding.js 需要输入 Uint8Array，所以我们将 ArrayBuffer 转换为 Uint8Array。
  const uint8Array = new Uint8Array(arrayBuffer); // 转换为 Uint8Array

  // Step 4: 使用 encoding.js 进行解码
  const decodedText = Encoding.convert(uint8Array, {
    to: 'UNICODE',  // 将其转换为 Unicode
    from: 'SJIS',   // 源编码为 Shift_JIS（MS932 相当于 Shift_JIS）
    type: 'string'  // 转换为字符串
  });

  // 打印解码后的文本
  console.log(decodedText);
}

fetchAndDecodeMS932();


// from: 'SJIS'：表示源数据是 Shift_JIS，MS932 可以视为 Shift_JIS 的扩展。
// to: 'UNICODE'：表示将数据转换为 Unicode，这样你可以正常处理和显示文本。
```

参考: 网址
```s
https://qiita.com/kenji123/items/cad6dad1476555ac0166
```

<br><br>

## 中止获取
1. 创建 controller 对象
2. 将 controller.signal 交给 fetch options 中
3. 通过 controller.abort() 取消请求
```js
const controller = new AbortController();
const signal = controller.signal;
const url = "video.mp4";

const downloadBtn = document.querySelector("#download");
const abortBtn = document.querySelector("#abort");

downloadBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(url, { signal });
    console.log("Download complete", response);
  } catch (error) {
    console.error(`Download error: ${error.message}`);
  }
});

abortBtn.addEventListener("click", () => {
  controller.abort();
  console.log("Download aborted");
});
```

<br><br>

## 给 fetch 超时功能
```s
https://www.bilibili.com/list/666759136?tid=0&sort_field=pubtime&spm_id_from=333.999.0.0&oid=829140008&bvid=BV1Eu4y1m7qi

https://www.cnblogs.com/wenruo/p/17028832.html
```

<br>

``abortcontroller-polyfill`` 是一个用于提供 AbortController API 支持的 JavaScript 包。

在一些旧版本的浏览器中，不支持 AbortController 这个现代浏览器 API。为了在这些浏览器中也能够使用 AbortController，你可以使用这个 polyfill（即填充物）库。
```s
npm install --save abortcontroller-polyfill

import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
```

```js
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => {
    // 处理响应数据
  })
  .catch(error => {
    if (controller.signal.aborted) {
      console.log('请求已中止');
    } else {
      console.error('请求错误：', error);
    }
  });

// 中止请求的例子
// controller.abort();
```

<br>

**abort-controller** 是一个 Node.js 和浏览器端都可以使用的库，它提供了对 AbortController 和 AbortSignal 的简单封装。

这个库使得在异步操作中更容易地实现请求中止（abort）的功能。
```s
npm install abort-controller
```

```js
const AbortController = require('abort-controller');
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => {
    // 处理响应数据
  })
  .catch(error => {
    if (controller.signal.aborted) {
      console.log('请求已中止');
    } else {
      console.error('请求错误：', error);
    }
  });

// 中止请求的例子
// controller.abort();
```

<br>

### 超时相关
```js
// 记录之前的fetch api
const oldFetch = window.fetch
function request(url, options) {
  const timeout = options.timeout || 5000
}

/*
如果一个请求要请求30秒才能成功 但是我们的超时时间只有10秒 最后该次请求应该失败 我们用return function 发起请求 得到状态和fetch可能不一样

所以我们自己new了一个新的promise 在里面发送fetch请求
*/
function createRequest({baseUrl, timeout}) {
  return function(url, options) {
    return new Promise((resolve, reject) => {
      // 10秒超时后 网络传输就没有意义了 所以后面的请求要终止
      // 创建新号控制器
      const signalController = new AbortController()

      fetch(url, {
        ...options
        signal: signalController.signal
      }).then(resolve, reject)

      // 处理超时功能, 到了超时的时候 直接reject 谁先调就听谁的
      setTimeout(() => {
        reject(new Error('fetch timeout'))
        // 取消请求
        signalController.abort()
      }, timeout)
    })
  }
}

const defaultRequest = createRequest({
  baseUrl: 'xxx',
  timeout: 50000
})



// 处理err的问题
fetch(url)
  .then(res => {
    if (res.ok) {
      return res.josn()
    } else {
      return Promise.reject('err')
    }
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
```

<br>

### 拦截器 + setTimeout
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div>
    <button class="btn">send</button>
  </div>
  <script>
    const btn = document.querySelector('.btn')

    function createRequest({baseUrl, timeout}) {
      return function(url, options) {

        // --- request interceptor - start ---
        url = baseUrl + url
        // --- request interceptor - end ---

        return new Promise(async (resolve, reject) => {
          const signalController = new AbortController()

          // timeout handler
          setTimeout(() => {
            console.log('signalController')
            signalController.abort()
            return reject(new Error('fetch timeout'))
          }, timeout)

          const response = await fetch(url, {
            ...options,
            signal: signalController.signal
          })

          console.log(response)

          // --- request interceptor - start ---
          if (!response.ok && response.status === 404) {
            console.log('404的处理逻辑')
            return reject(new Error('404的处理逻辑'))
          }
          // --- request interceptor - end ---

          return resolve(response.json())
        })
      }
    }

    const defaultRequest = createRequest({
      baseUrl: 'http://localhost:3333',
      timeout: 3000
    })

    btn.addEventListener('click', async () => {
      try {
        const res = await defaultRequest('/common')
        console.log('res', res)
      } catch (err) {
        console.log('catch', err)
      }
    })
  </script>
</body>
</html>
```