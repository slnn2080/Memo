const express = require('express');
const Caotcha = require('../utils/captcha/index');
const handleDB = require('../db/handleDB');
const router = express.Router();
const md5 = require('md5');
const keys = require('../keys');
const jwt = require('jsonwebtoken');

router.get('/passport/image_code/:flag', (req, res) => {
  let captchaObj = new Caotcha();
  let captcha = captchaObj.getCode();

  // 将验证码文本保存在用户的session中
  req.session['imageCode'] = captcha.text;
  console.log(req.session['imageCode']);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(captcha.data);
})

router.post('/passport/register', (req, res) => {

  (async function () {
    // - 1. 获取post请求的参数 判空
    let { username, image_code, password, agree } = req.body;
    console.log(username, image_code, password, agree)
    /* 
      虽然前端那里已经进行了判空的验证处理 后端这边依然要进行判断, 要严谨
      如果前端后端都没写, 出了责任是后端的
    */
    if (!username || !image_code || !password || !agree) {
      res.send({ errmsg: '缺少必传参数' })
      return;
    }


    // - 2. 验证用户输入的图片验证码是否正确, 不正确就return
    /* 
      if (req.session[imageCode] === image_code) {
      } else {
        res.send({ errmsg: '用户验证码输入错误' })
        return;
      }
      这里没有采取if else 的写法 是因为 我们都是在做排除错误的工作, 最后一步才是注册成功
      我们把错误都排除掉 剩下的只有成功
    */
    // 这里要注意的是 验证码是分大小写的 如果希望用户输入的结果不按大小写来验证 我们将用户输入的和自动生成的都转成小写
    if (image_code.toLowerCase() !== req.session['imageCode'].toLowerCase()) {
      res.send({ errmsg: '用户验证码输入错误' })
      return;
    }


    // - 3. 查询数据库(我们看看用户名有没有被注册过)
    /* 
      - 1. 查询数据库 我们需要用到orm, 我们自己封装了一个handleDB, 所以要先引入
      - 2. handleDB的结果是一个promise对象 我们要用await 和 async async把这个接口内的所有代码都包起来这样不至于因为作用域的问题接收不到变量
      - 3. 看用户名是否注册了 我们要查询的是用户表
      - 4. 我们先使用了 find方法 查询用户名知否在我们的用户表中 `username='${username}'`  注意 where后面是字符串 需要加引号
      - 5. 查询结果
          - 如果用户表里已经有用户名  那 result = [{name: 老张}]
          - 如果用户表里没有用户名    那 result = []  空数组
    */
    let result = await handleDB(res, 'info_user', 'find', '数据库查询出错', `username='${username}'`)
    console.log('result: ' + result);


    // - 4. 判断
    //     - 如果数据库里面有, 返回用户名已存在 return
    /* 
      如果用户已经存在相当于不是一个空数组, 条件有两种写法
      result.length > 0
      result[0]   这种的好处是 存在就是result[0] 不存在就是!result[0]

    */
    if (result[0]) {
      res.json({errmsg: '用户名已经被注册'});
      return;
    }

    //     - 如果数据库里面没有, 就往数据库中新增加一条记录
    // 插入的话 可以传递一个对象, 把一些必写的字段填写进去 
    // 怎么知道哪些字段不能为空 我们可以去看看 .sql 文件 not null 不能为空
    // info_user: id nick_name password_hash username
    // 看来只有where后面的条件里 需要引号
    // 表中的字段名是什么 我们这里就必须是什么 以 .sql 文件为主
    // nick_name 没有用username代替 后期自己修改

    // 查询的话 有一个result 那么插入有结果是什么? 是一个对象里面有一个属性比较重要 insertId 这个是result2的一个属性
    // result2.insertId 插入数据的时候, 自动生成的这个id值
      let result2 = await handleDB(res, 'info_user', 'insert', '数据库插入出错', {
        username,
        password_hash: md5(md5(password) + keys.password_salt),
        nick_name: username,
        last_login: new Date().toLocaleDateString()
      })

      
    // 5. 状态保持 保持用户的登录状态
    // 我们往session里面添加一个信息, 保持用户的id 这个id是插入成功的id 也可以起到标识是这个用户的作用
    req.session['user_id'] = result2.insertId;

    // 6. 返回注册成功
    /*  
      if(resp.errno == '0'){
          alert(resp.errmsg);
          window.location.reload()
      }

      前端注册成功是 errno为0 所以我们返回 errno:0 告诉前端注册成功
    */
    res.send({errno:'0', errmsg: '注册成功'});
  })()
})


// 登录接口
router.post('/passport/login', (req, res) => {
  /* 
    查询数据库, 至少要查询有这个人才给你登录 所以在这个接口中首先加个 async function
    1. 获取post请求参数 判空
    2. 查询数据库, 验证用户名是不是已经注册了
    3. 如果没有注册 返回用户名未注册, return
    4. 如果有注册了 那就校验密码是否正确 如果不正确还要return
    5. 到这里(上面的情况都return了) 如果用户名 和 密码都没问题 就保存用户的登录状态
    6. 返回登录成功给前端
  
  */
  (async function() {

    // 1. 获取post请求参数 判空
    let {username, password} = req.body;
    if (!username || !password) {
      res.send({ errmsg: '缺少必传参数' })
      return;
    }

    // 2. 查询数据库, 验证用户名是不是已经注册了
    let result = await handleDB(res, 'info_user', 'find', '数据库查询出错', `username='${username}'`)
    console.log('result: ' + result);

    // 3. 如果没有注册 返回用户名未注册, return
    if(!result[0]) {
      res.send({ errmsg: '用户名未注册, 登录失败' })
      return;
    }

    // 4. 如果有注册了 那就校验密码是否正确 如果不正确还要return
    // 2中查询到的结果是一个数组, 我们要取出里面的密码 密码字段的名字就是 password_hash
    if (md5(md5(password) + keys.password_salt) !== result[0].password_hash) {
      res.send({ errmsg: '密码错误, 用户登录失败' })
      return;
    }
    
    // 5. 到这里(上面的情况都return了) 如果用户名 和 密码都没问题 就保存用户的登录状态
    // 状态保持建议使用id作为值, 插入的时候因为还用户还没有用户id可以用 insertId
    // 登录查询的是在用户表里的用户, 所以使用id
    req.session['user_id'] = result[0].id;

    // 设置最后一次的登录时间 last_login字段, 本质上就是修改数据库
    await handleDB(res, 'info_user', 'update', '数据库修改出错', `id=${result[0].id}`, {last_login:new Date().toLocaleDateString()})
    res.send({ errno: '0', errmsg: '登录成功' });
  })()
})

// 退出登陆接口
router.post('/passport/logout', (req, res) => {
  /* 
    怎么样才算退出登录了? 核心就是清空 session 里面的 user_id
    退
  */
  delete req.session['user_id'];
  res.send({errmsg: '退出登录成功'});
})

// 跟项目没关系 我们只是验证下 jwt token的使用
/* 
  这个接口我们使用restful风格, 什么restful风格
  1. 接口名就是资源名
  2. 后端只返回数据
  3. 数据的格式是json
  有用户名和密码的肯定是个post请求, 但这里我们用get返回一个数据看看token
*/
router.get('/passport/token', (req,res) => {
  const token = jwt.sign({ id: 1, name: 'zhangsan' }, keys.jwt_salt, { expiresIn: 60 * 60 * 2})
  // res.json()
  res.send({
    errmsg: 'success!',
    errno: '0',

    // 客户端请求的原因
    reason: '登录请求',
    result: {
      token
    }
  })
})

module.exports = router;