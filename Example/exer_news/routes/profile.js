const express = require('express');
const handleDB = require('../db/handleDB');
require('../utils/filters');
const common = require('../utils/common');
const keys = require('../keys');
const md5 = require('md5');
const multer = require('multer');
// const upload_file = require('../utils/qn');
// const constant = require('../utils/constant');

// 将来上传头像存放的地址
const upload = multer({ dest: 'public/news/upload/avatar' })
const router = express.Router();


router.get('/profile', (req,res) => {
  (async function() {
    let userInfo = await common.getUserInfo(req,res);
    
    let data = {
      user_info: {
        nick_name: userInfo[0].nick_name,
        avatar_url: userInfo[0].avatar_url ? userInfo[0].avatar_url : '/news/images/worm.jpg'
      }
    }

    res.render('news/user', data);
  })()
})

// 展示基本信息的页面, 以及处理基本信息的post提交
router.all('/user/base_info', (req, res) => {

  (async function() {
    // 同样来到这里要判断用户是否登录 只要是个人中心页面都要先来一遍
    let userInfo = await common.getUserInfo(req, res);
    

    if (req.method === 'GET') {

      let data = {
        nick_name: userInfo[0].nick_name,
        signature: userInfo[0].signature,
        gender: userInfo[0].gender ? userInfo[0].gender : 'MAN'
      }

      res.render('news/user_base_info', data);

    } else if (req.method === 'POST') {
      // - 1. 获取参数判空
      let {signature, nick_name, gender} = req.body;
      if (!signature || !nick_name || !gender) {
        res.send({errmsg:'参数错误'})
        return
      }

      // - 2. 根据前端传递过来的数据, 修改数据库中的数据
      await handleDB(res, 'info_user', 'update', '修改数据库出错', `id=${userInfo[0].id}`, {
        nick_name,
        signature,
        gender
      })

      // - 3. 返回操作成功
      res.send({
        errno:'0',
        errmsg: '操作成功'
      })
    }
  })()
})


// 密码修改按钮 对应的页面的逻辑
router.all('/user/pass_info', (req, res) => {

  (async function() {
    let userInfo = await common.getUserInfo(req, res);

    if(req.method === 'GET') {
      res.render('news/user_pass_info')
    } else if (req.method === 'POST') {
      // 1. 获取参数(旧密码 和 新密码)
      let {old_password, new_password, new_password2} = req.body;
      if (!old_password || !new_password || !new_password2) {
        res.send({errmsg:'参数错误'})
        return
      }
      console.log(old_password, new_password, new_password2);

      // 2. 校验两次新密码是否一致(如果前端做了校验也可以不用这步)
      if (new_password !== new_password2) {
        res.send({errmsg:'两次密码不一致'})
        return
      }

      // 3. 旧密码是否正确
      if(md5(md5(old_password)+keys.password_salt) !== userInfo[0].password_hash) {
        res.send({errmsg:'旧密码不正确, 修改失败'})
        return
      }

      // 4. 修改数据库 用户表里面的password_hash字段
      await handleDB(res, 'info_user', 'update', '数据库更新数据失败', `id=${userInfo[0].id}`, {
        password_hash: md5(md5(new_password) + keys.password_salt)
      })

      // 5. 返回修改成功
      res.send({
        errno: '0',
        errmsg: '操作成功'
      })
    }
  })()
   


})


// 展示 头像设置页面
router.get('/user/pic_info', (req, res) => {
  (async function() {
    let userInfo = await common.getUserInfo(req, res);
    res.render('news/user_pic_info');
  })()
})

// 头像设置  上传图像 处理post提交逻辑的接口
// router.post('/user/pic_info', upload.single('avatar'), (req, res) => {
//   (async function () {
    
//     let userInfo = await common.getUserInfo(req, res);

//     // 1. 接收上传图片的对象req.file(这是浏览器传到服务器的图片 通过multer)
//     let file = req.file;

//     // 2. 将服务器上的图片(浏览器上传上来的) 上传到 七牛云服务器
//     /* 
//       file.originalname   文件的原文件名(没有上传到服务器之前的名字 上传后会转为2进制的名字)
//       file.destination    文件在服务器上的路径
//       file.filename       文件在服务器上的名字(二进制的)
//     */

//     // 拼接的时候注意有  / 因为 destination: 'public/news/upload/avatar' 的最后没有 / 
//     // 上传有可能失败, 如果失败的话 retObj是一个错误对象 所以 我们使用try catch
//     let retObj;
//     try {
//       retObj = await upload_file(file.originalname, `${file.destination}/${file.filename}`)
      
//     } catch(err) {
//       console.log(err)
//       res.send({errmsg:'上传七牛云失败'});
//     }

//     // 图片的前缀:
//     // http://qb30ruxlm.bkt.clouddn.com/image/avatar/

//     // 3. 把七牛云返回的对象key属性保存到数据库中 retObj会返回一个对象里面有hash 和 key key是 配置的时候的前缀 和 文件名的结合体
//     await handleDB(res, 'info_user', 'update', '数据修改失败', `id=${userInfo[0].id}`, {
//       // 我们是将图片的链接保存到数据库里面  但是图片的前缀是一样的 所以我们只需要存储文件名就可以
//       avatar_url: file.originalname
//     })

//     // 4. 给前端返回数据
//     let data = {
//       // 这里可以这么写, 也可以把前缀部分抽取出来成为一个常量, 在项目中的utils文件夹内创建一个 constant.js
//       // avatar_url: 'http://qb30ruxlm.bkt.clouddn.com/image/avatar/' + file.originalname,
//       avatar_url: constant.QINIU_AVATAR_URL_PRE + file.originalname,
//     }

//     res.send({
//       errno:'0',
//       errmsg:'上传成功',
//       data
//     })
//   })()
// })



// 展示 我的收藏页面
router.get('/user/collections', (req, res) => {
  (async function () {
    let userInfo = await common.getUserInfo(req, res);

    // location.href = 'http://localhost:3000/user/collections?p'+ currentPage;
    // 获取 url上的请求参数
    let {p=1} = req.query;
    let currentPage = p;
    // 总页数 = 总条数 / 每页多少条   向上取整
    // 查询收藏表 总条数 counts 登录用户收藏了多少条新闻 info_user_collection
    // counts 结果会是 [{'count(*)':50}]
    let counts = await handleDB(res, 'info_user_collection', 'sql', '数据库查询出错', `select count(*) from info_user_collection where user_id=${userInfo[0].id}`)
    
    // 正常每页显示多少条也是前端传递过来的数据, 我们这里定死吧
    let totalPage = Math.ceil(counts[0]['count(*)'] / 10);

    // collectionNewList 也要查询数据库(info_news) 标题和时间字段 条件是登录的用户收藏过的新闻
    // 我们要先查用户收藏过哪些新闻 再通过新闻找到对应的标题和创建时间字段 这是两张不同的表
    /* 
      先在 收藏表中 查询登录用户收藏过的新闻id
      然后 再通过news_id 查询info_news中对应的标题字段和时间字段
      同样因为前端只展示10条, 我们使用分页查询
    */
    // 1. 先查询登录用户收藏过的新闻id(分页查询) 结果是一个id列表
    let collectionNewsIdList = await handleDB(res, 'info_user_collection', 'find', '数据库查询出错2', `user_id=${userInfo[0].id} limit 1, 10`)
    // console.log(collectionNewsIdList);

    /* 
      collectionNewsIdList的结果 id数组
      [
        RowDataPacket {
          user_id: 2,
          news_id: 149,
          create_time: 2021-06-07T13:30:20.000Z
        }
      ]   

      接下来我们可以遍历这个数组, 拿着 news_id去 info_news里面去找对应的标题字段和创建时间字段
    */

    // 遍历这个id数组, 拿着里面每一个元素的news_id属性去查询info_news表 并把查询的结果push到 collectionNewsList中
    let collectionNewsList = [];
    for (let i = 0; i < collectionNewsIdList.length; i++) {
      let ret = await handleDB(res, 'info_news', 'sql', '数据库查询出错3', `select title, create_time from info_news where id=${collectionNewsIdList[i].news_id}`)
      collectionNewsList.push(ret[0]);
      // ret[0]   [{title:'新闻标题', create_time:'xxxx'}];
    }

    console.log(collectionNewsList);
    


    let data = {
      currentPage,
      totalPage,
      collectionNewsList
    }
    res.render('news/user_collection',data);
  })()
})

module.exports = router;