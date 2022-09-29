const handleDB = require('../db/handleDB');

function csrfProtect(req, res, next) {
  // 这里的代码将在执行router下的接口之前的时候执行

  if (req.method === 'GET') {
    let csrf_token = getRandomString(48);
    res.cookie('csrf_token', csrf_token);

  } else if (req.method === 'POST') {
    console.log(req.headers["x-csrftoken"]);
    console.log(req.cookies["csrf_token"]);

    if ((req.headers["x-csrftoken"] === req.cookies["csrf_token"])) {
      console.log("csrf验证通过！");

    } else {
      // 跟项目配合下 前端需要 errmsg
      res.send({ errmsg: 'csrf验证不通过'});
      return
    }
  }


  next()
}

// 生成随机数 函数
function getRandomString(n) {
  let str = '';
  while (str.length < n) {
    str += Math.random().toString(36).substr(2);
  }

  return str.substr(str.length - n);
}

// 获取登录用户的信息, 但是可能获取不到, 因为用户可能没有登录
async function getUser(req, res) {
  // 登录状态
    let user_id = req.session['user_id'];
    let result = [];
    if(user_id) {
      result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);
    }

    return result;
}

// 获取登录用户的信息, 一定可以获取到
async function getUserInfo(req, res) {
  let userInfo = await getUser(req, res);
  if (!userInfo[0]) {
    res.render('/');
  }

  return userInfo
}


// 抛出404页面的操作
async function abort404(req,res){
    let userInfo =  await getUser(req,res);
    let data ={
        user_info:userInfo[0]?{
            nick_name: userInfo[0].nick_name,
            avatar_url: userInfo[0].avatar_url
        }:false
    }
    res.render("news/404", data);
}

module.exports = {
  csrfProtect,
  getUser,
  abort404,
  getUserInfo
}