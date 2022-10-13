# canvas指纹追踪技术
以前我们了解到的前端网络安全相关的问题有
- xml注入
- sql注入 之类
- csrf跨站脚本攻击

这些都比较老了 我们今天聊聊 canvas指纹追踪技术

<br>

### 场景:
我们访问一个商城类的网站 我们并没有登录它 我们去浏览它的某个商品 在那里看过几次 我们就将它关掉了 过两天我们又去打开这个网站 发现它居然神奇的给我们推荐了这个东西 

这就是通过 canvas指纹追踪技术分析我们的用户行为

在之前我们可能通过cookie追踪用户信息 但是cookie可以被用户禁掉 或者是无法跨域访问 所以cookie被淘汰了

或者就是浏览器指纹(navigator) 这个对象中包含的东西也是很多的 比如

- language 
- userAgent


但是却满足不了我们的需求 无法对客户端进行唯一的判定 这些指纹不能对某个人进行唯一性的标识 也无法对客户端进行唯一性判定 基于HTML5的诸多高级指纹 对此提供了新的思路


<br>

## Canvas指纹
canvas相信我们大家都用过，例如绘制一些图形，游戏等等，都会用到。

它也可以用来跟踪用户  

当我们调用toDataURL转换base64，他底层会获取设备，操作系统，浏览器，三合一的唯一标识，如果其他用户使用的这三个信息和你一样的话也是重复这个概率是很低的也不排除有可能。

也就是说以前我们通过 cookie 来标识一位用户 后来使用navigator 再后来是用 canvas

我们生成的base64就作为了这个用户的唯一标识该标识是通过设备，操作系统，浏览器，三合一的唯一标识

都会放在这个base64信息里面

<br>

### **生成canvas指纹**
```js
const uuid = () => {
  const canvas = document.createElement('canvas');

  const ctx = canvas.getContext('2d');

  const txt = 'test';

  ctx.fillText(txt, 10, 10)

  // 这个base64码就作为用户的唯一标识
  console.log(canvas.toDataURL())
  return md5(canvas.toDataURL())
}
```


生成的Base64（google） 
```
data:image/png;base64,iVBORw0K...
```

360 
```
data:image/png;base64,iVBORw0K...
```

每个浏览器的信息不用生成的base64串也不同但是图片是一样的

如果太长可以进行MD5 压缩 或者 crypto

<br>

### **如何防止跟踪?**
安装浏览器插件，谷歌应用商店有随机修改canvas指纹的插件

（CanvasFingerprintBlock），其原理是，每次随机往 canvas 画布里面注入一个随机的噪音（人肉眼是看不到的），从而影响base64加密结果

<br>

# React项目的安全问题
这种行为只存在于使用 React / 类React 框架的页面中 

通过css获取我们的密码
```
https://www.bilibili.com/read/cv16346229?spm_id_from=333.999.0.0
```