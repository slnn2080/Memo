const express = require('express');
const handleDB = require('../db/handleDB');
require('../utils/filters');
const common = require('../utils/common');
const router = express.Router();

// 详情页
router.get('/news_detail/:news_id', (req, res) => {

  (async function() {

    // 登录状态 获取用户的登录信息
    // let user_id = req.session['user_id'];
    // let result = [];
    // if(user_id) {
    //   result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);
    // }
    // 上面的登录验证的函数抽取到common里面了 我们下面的代码就是验证用户登录的 userInfo 的结果可能是 [] 可能是 [{}, {}]
    let userInfo = await common.getUser(req, res);  

    
    // 有些情况是, 页面里有些功能仅开放给已登录的用户, 所以我们上面要获取用户是否登录 如果没有登录要return
    // if (!userInfo[0]) {
    //   res.send('未登录不能操作')
    //   return
    // }


    // 点击排行
    let result3 = await handleDB(res, 'info_news', 'find', '查询数据库出错', '1 order by clicks desc limit 6')

    // 左侧新闻内容的查询
    let {news_id} = req.params;
    let newsResult = await handleDB(res, 'info_news', 'find', '查询数据库出错', `id=${news_id}`);

    // 为了确保数据有id为news_id这篇新闻, 才可以继续往下操作
    if (!newsResult[0]) {

      let data = {
        user_info: userInfo[0] ? {
          nick_name: userInfo[0].nick_name,
          avatar_url: userInfo[0].avatar_url ? userInfo[0].avatar_url : '/news/images/worm.jpg'
        } : false
      }
      res.render('news/404', data);
      return
    }


    // 返回数据之前, 我们修改新闻的点击量 点击数+1 原来的那个点击数加1 上面的newsResult就是这篇新闻的对象里面有
    await handleDB(res, 'info_news', 'update', '更新数据库出错', `id=${news_id}`, { clicks: newsResult[0].clicks+1})

    // 但是会有一个问题, 虽然数据库里面的点击量被修改了 但是前端展示的还是没修改前的点击量, 原因是我们最后传递给前端的数据还是 newsResult[0] 也就是我们查询数据库的结果, 也就是我们虽然修改了数据库中的点击量, 但是渲染的还是 之前的值, 也就是我们没有重新读取数据库 重新渲染
    // 我们可以这样, 在后端手动修改下 不通过数据库 返回给前端一个正确的值 进行个页面上的统一
    newsResult[0].clicks += 1;


    // 已登录用户是不是已经收藏了这篇新闻
    // 定义一个布尔值用于告诉前端收藏状态
    let isCollected = false;
    // 什么情况下改成true? 已经登录的用户 并且收藏了这篇新闻(查询info_user_collection), 链接里面的参数就是新闻id就是news_id 上面已经获取到了
    if(userInfo[0]) {
      // 结果是一个数组 所以的是[0]
      let collectionResult = await handleDB(res, 'info_user_collection', 'find', '查询数据库出错', `user_id=${userInfo[0].id} and news_id=${news_id}`)
      if (collectionResult[0]) {
        isCollected = true;
      }
    }

    // 下面评论的接口了完成了 将数据整合传递到了前端, 但是页面整体刷新后评论消失, 原因就是我们没有在请求详情页的接口里 返回评论的数据, 所以刷新渲染页面的时候不能将评论渲染到页面上
    // 查询 和 这篇新闻相关的评论
    let commentResult = await handleDB(res, 'info_comment', 'find', '查询数据库出错', `news_id=${news_id} order by create_time desc`)
    
    // 给commentResult数组中的每一条记录 添加评论者的信息
    /* 
      因为我们在detail.html的模板中使用的是 登陆者的id 和 头像 展示在页面上
      {{ user_info.avatar_url }}
      {{ user_info.nick_name }}

      一旦退出登录后 就看不到登陆者的id 和 头像了
      所以这里我们不能使用登陆者的id 和 头像 我们要使用评论者的id和头像
      {{ $value.commenter.avatar_url }}
      {{ $value.commenter.nick_name }}

      但是 info_comment 的表中并没有 这些信息 所以我们要对上面 我们从评论表commentResult中查询到到的结果进行处理
      添加 评论者 的信息

      上面的 userInfo[0].nick_name avatar_url 是根据 session 中的保存user_id 去找的 也就说登陆者的id
      而我们下面查的是根据评论表里面的user_id去查的 也就是评论者的信息 虽然查的都是同一个表 但是 查到的数据是不一样的
    */

    
    for (let i = 0; i < commentResult.length; i++) {
      let comentResult = await handleDB(res, 'info_comment', 'find', '查询数据库出错', `id=${commentResult[0].user_id}`)

      commentResult[i].commenter = {
        nick_name: comentResult[0].nick_name,
        avatar_url: comentResult[0].avatar_url ? comentResult[0].avatar_url : '/news/images/worm.jpg'
      }

      // 如果有parent_id的话 就给评论信息的每一条记录添加 parent这个属性
      if (commentResult[i].parent_id) {

        let parentComment = await handleDB(res, 'info_comment', 'find', '数据库查询失败', `id=${commentResult[i].parent_id}`)
        let parentUserInfo = await handleDB(res, 'info_user', 'find', '数据库查询失败', `id=${parentComment[0].user_id}`)

        commentResult[i].parent = {
          user: {
            nick_name: parentUserInfo[0].nick_name
          },
          content: parentComment[0].content
        }
      }
    }

    // 把登录用户的点赞过的评论全部查出来, 传给前端模板, 将结果组织成 [id1, id2, id3] 传递到模板中
    // 首先用户得登录
    let user_like_comments_ids = [];
    if(userInfo[0]) {
      // 查询登录用户的点赞过的评论对象 info_comment_like 这个表可以告诉我们登录的用户点赞了哪些评论, 查询条件 user_id字段 = 登录用户的id
      let user_like_commentResult = await handleDB(res, 'info_comment_like', 'find', '数据库查询出错', `user_id=${userInfo[0].id}`)
      // 上面查询完后 登录用户的 所有点赞过的评论都出来了 user_like_commentResult 这个数组是用户点赞过的每一条评论对象的数组

      // 遍历user_like_commentResult每一个元素 取它的id, 插入到user_like_comments_ids 这个数组里是用户点赞过的每一条评论
      user_like_commentResult.forEach(item => {
        user_like_comments_ids.push(item.comment_id);
      })
      }



    // 查询新闻作者的信息, 传到模板中去 
    // 查询条件是 根据 新闻表的查询结果中的user_id 去找
    let authorInfo = await handleDB(res, 'info_user', 'find', '数据库查询出错', `id=${newsResult[0].user_id}`);

    // 作者发布了多少篇新闻(总片数) 粉丝
    // authorNewsCount 的结果是 ['{count(*):900}'] 所以我们传递到前端的时候可以这样
    let authorNewsCount = await handleDB(res, "info_news", "sql", "数据库查询出错",
      `select count(*) from info_news where user_id=${authorInfo[0].id}`);
    

    console.log(authorInfo[0].id, authorNewsCount);

    // 查询作者的粉丝数, info_user_fans
    let anthorFansCount = await handleDB(res, 'info_user_fans', 'sql', 'fans查询出错', `select count(*) from info_user_fans where followed_id=${authorInfo[0].id}`);


    // 关注的逻辑
    // 登录的用户是不是已经关注了这个作者, 传递一个布尔值给模板
    let isFollow = false;
    // 什么时候改成true, 已经登录的用户并且关注了这个作者(查询数据库info_user_fans) 条件是 登录用户id是粉丝, 被关注者就是新闻作者的id
    if(userInfo[0]) {
      let followResult = await handleDB(res, 'info_user_fans', 'find', '查询fans表出错', `follower_id=${userInfo[0].id} and followed_id=${authorInfo[0].id}`);
      if (followResult[0]) {
        isFollow = true
      }
    }

    // 传递数据
    let data = {
      user_info: userInfo[0] ? {
        nick_name: userInfo[0].nick_name,
        avatar_url: userInfo[0].avatar_url ? userInfo[0].avatar_url : '/news/images/worm.jpg'
      } : false,
      newsClick: result3,
      // 本身是数组
      newsData: newsResult[0],
      isCollected,

      // 将查询评论的结果传递到前端 变量名自己定义
      commentList: commentResult,

      // 将id数组传到前端模板
      user_like_comments_ids,

      // 将新闻作者的id传递过去, 如果直接写authorInfo传递过去的会是一个数组, 我们还可以这样authorInfo[0] 这样过去的就会是一个对象
      authorInfo: authorInfo[0],
      authorNewsCount: authorNewsCount[0]['count(*)'],
      anthorFansCount: anthorFansCount[0]['count(*)'],

      // 关注
      isFollow
    }


    // 渲染页面
    res.render('news/detail', data);
  })()

  
})


// 收藏 取消收藏
router.post('/news_detail/news_collect', (req, res) => {
  (async function() {
    // - 1. 获取用户信息
    let userInfo = await common.getUser(req, res);
    if (!userInfo[0]) {
      res.send({errno: '4101', errmsg: '用户未登录'})
      return;
    }

    // - 2. 获取参数, 判空
    let { news_id, action} = req.body;
    if(!news_id || !action) {
      res.send({ errmsg: '参数错误1' })
      return;
    }

    // - 3. 查询数据库 且 判断新闻是否存在, 不存在就return 确保 news_id 是有效的
    let newsResult = await handleDB(res, 'info_news', 'find', '数据库查询出错', `id=${news_id}`);
    if (!newsResult[0]) {
      res.send({ errmsg: '参数错误2' })
      return;
    }

    // - 4. 根据 action 的值, 收藏 或者 取消收藏
    if (action === 'collect') {
      // 收藏
      await handleDB(res, 'info_user_collection', 'insert', '数据库添加失败', { user_id: userInfo[0].id, news_id});
    } else {
      // 执行取消收藏
      await handleDB(res, 'info_user_collection', 'delete', '数据库添加失败', `user_id=${userInfo[0].id} and news_id=${news_id}`);
    }

    // - 5. 返回操作成功
    res.send({errno:'0', errmsg:'操作成功'});
  })()
})


// 处理  评论  和  回复  的接口
router.post('/news_detail/news_comment', (req, res) => {
  (async function() {
    /* 
      这个接口里的代码 点击评论 和 回复 的时候会执行这个接口中的代码
      处理逻辑:
      
      需要传递哪些参数, 两种情况
      1. 评论新闻
        - 评论内容
        - 评论的新闻的id

      2. 回复别人的评论
        - 回复的内容
        - 回复哪一条评论的id(parent_id)


      业务流程
      1. 获取登录用户的信息(评论之前是需要先登录的) 获取不到就return
      2. 获取参数 判断
      3. 查询数据库看看新闻是否存在
      4. 往数据库中插入数据 info_comment (如果有传parent_id, 这个属性也要记得插入)
      5. 返回成功的响应, 传数据给前端到回调中, 去拼接评论的信息
    */

    // 1. 获取登录用户的信息(评论之前是需要先登录的) 获取不到就return
    let userInfo = await common.getUser(req, res);
    if (!userInfo[0]) {
      res.send({ errno: '4101', errmsg: '用户未登录' })
      return;
    }

    // 获取参数 判断
    let { news_id, comment, parent_id = null} = req.body;
    if (!news_id || !comment) {
      res.send({ errmsg: '参数错误1' })
      return;
    }

    // 3. 查询数据库 且 判断新闻是否存在, 不存在就return 确保 news_id 是有效的
    let newsResult = await handleDB(res, 'info_news', 'find', '数据库查询出错', `id=${news_id}`);
    if (!newsResult[0]) {
      res.send({ errmsg: '参数错误2' })
      return;
    }



    // 注意:
    // 我们需要判断有没有parent_id 有parent_id应该是回复吧 因为没办法判断parent_id有没有传递 所以我们在接收post请求参数的时候可以传递一个默认值 let { news_id, comment, parent_id = null} = req.body;
    // 我们可以把插入数据库的数据信息 提取出来
    let commentObj = {
      user_id: userInfo[0].id,
      news_id,
      content: comment,
      // 我们手段创建一个create_time字段
      create_time:new Date().toLocaleDateString()
    }

    // 这里判断如果传了parent_id就往 commentObj 里面添加parent_id属性 这样有这个idcomment就是4个属性 没有就是3个 我们只需要操作一次数据库
    let parentComment;
    let parentUserInfo;
    if(parent_id) {
      commentObj.parent_id = parent_id

      // 如果有父评论的话, 查询父评论的信息(info_comment) 和 父评论者的信息(info_user)
      parentComment = await handleDB(res, 'info_comment', 'find', '数据库查询失败', `id=${parent_id}`)
      parentUserInfo = await handleDB(res, 'info_user', 'find', '数据库查询失败', `id=${parentComment[0].user_id}`)
    }

    // 4. 往数据库中插入数据 info_comment(如果有传parent_id, 这个属性也要记得插入)
    let insertResult = await handleDB(res, 'info_comment', 'insert', '数据库插入失败', commentObj)

    // 5. 返回成功的响应, 传数据给前端到回调中, 去拼接评论的信息, 还需要返回前端拼接内容所需要的数据, 前端需要什么 我们就看着给什么
    let data = {
      user: {
        // 这里的头像可能是空的情况, 因为刚注册的用户还没用设置头像 所以我们要给它个默认路径显示默认图片
        avatar_url: userInfo[0].avatar_url ? userInfo[0].avatar_url : '/news/images/worm.jpg',
        nick_name: userInfo[0].nick_name
      },
      content: comment,

      // 这也有个问题, create_time是我们将评论数据插入到系统的时候自动生成的 上面刚插入数据库, 方法1 我们可以再查询一次数据库 方法2 我们在往数据库插入评论信息的时候 手动创建一个 create_time字段 这样我们可以直接使用这个 插入数据库时 定义的这个 create_time 变量
      create_time: commentObj.create_time,
      news_id,

      // 这个id是评论的id 上面将评论插入数据库的时候会有一个插入id (insertId) 我们使用这个
      // 评论id
      id: insertResult.insertId,

      // 回复需要的数据, 也是一样回复的数据并不一定会传递过来 我们根据 parent_id还进行下判断
      parent: parent_id? {
        user: {
          nick_name: parentUserInfo[0].nick_name
        },
        content: parentComment[0].content
      }:null
    }

    res.send({
      errno:'0',
      errmsg: '操作成功',
      data
    })
  })()
})


// 处理 点赞 取消点赞的接口
router.post('/news_detail/comment_like', (req, res) => {

  (async function() {
    /* 
      我们要将前端传过来的数据保存在 info_comment_like 表里面
      - 参数:
      - 1. 哪一个用户, 登录用户, 可以直接获取登录用户的id
      - 2. 点赞了哪一条评论 comment_id
      - 3. 点赞和取消点赞都在这一个接口 还有一个参数是 action

      业务流程:
      - 1. 获取用户登录信息(一会要拿id)
      - 2. 获取参数 判空
      - 3. 查询数据库 看看 comment_id 这条评论是否存在 不存在return
      - 4. 如果存在 根据action的值 是add还是remove 来确定要执行点赞还是取消点赞
          - 执行点赞: 把点赞的关系保存在数据库里面 (把哪个用户点赞了哪条评论的信息, 作为一条记录保存到数据库里面去 info_comment_like)
          - 取消点赞: 在这个表中删除这条记录
          (根据点赞 和 取消点赞 我们要修改 info-comment表中like_count字段 +1 或者 -1)

      - 5. 返回操作成功
    */


    // - 1. 获取用户登录信息(一会要拿id)
    let userInfo = await common.getUser(req, res);
    if(!userInfo[0]) {
      res.send({errno:'4101', errmsg:'用户未登录'})
      return
    }


    // - 2. 获取参数 判空
    let {comment_id, action} = req.body;
    if(!comment_id || !action) {
      res.send({errmsg:'参数错误1'})
      return
    }


    // - 3. 查询数据库 看看 comment_id 这条评论是否存在 不存在return
    let commentResult = await handleDB(res, 'info_comment', 'find', '数据库查询出错', `id=${comment_id}`);
    if (!commentResult[0]) {
      res.send({ errmsg: '参数错误2'})
      return
    }

    console.log(comment_id, action);


    /* - 4. 如果存在 根据action的值 是add还是remove 来确定要执行点赞还是取消点赞
        - 执行点赞: 把点赞的关系保存在数据库里面 (把哪个用户点赞了哪条评论的信息, 作为一条记录保存到数据库里面去 info_comment_like)
        - 取消点赞: 在这个表中删除这条记录
        (根据点赞 和 取消点赞 我们要修改 info-comment表中like_count字段 +1 或者 -1) 
    */
    let like_count; 
    if(action === 'add') {
      // 执行点赞
      await handleDB(res, 'info_comment_like', 'insert', '数据库添加出错', {
        comment_id,

        // 点赞的用户就是登录的用户
        user_id: userInfo[0].id
      })

      // 修改 info_comment 表中的 like_count 字段 +1, 因为我们创建表的时候 like_count 字段默认为null 
      like_count = commentResult[0].like_count ?commentResult[0].like_count + 1 :1

    } else {
      // 取消点赞
      await handleDB(res, 'info_comment_like', 'delete', '删除数据库出错', `comment_id=${comment_id} and user_id=${userInfo[0].id}`);

      // 修改 info_comment 表中的 like_count 字段 -1
      like_count = commentResult[0].like_count ?commentResult[0].like_count - 1 :0
    }

    // 最后将 info_comment 表中的 like_count 字段的修改后的结果保存在 表内, 其实就是更新 info_comment 数据库
    await handleDB(res, 'info_comment', 'update', '数据库更新失败', `id=${comment_id}`, {like_count})

    // - 5. 返回操作成功
    res.send({
      errno:'0',
      errmsg:'操作成功'
    })
  })()
})


// 关注 取消关注 接口
router.post('/news_detail/followed_user', (req, res) => {
  (async function () {
    // - 1. 获取用户信息
    let userInfo = await common.getUser(req, res);
    if (!userInfo[0]) {
      res.send({ errno: '4101', errmsg: '用户未登录' })
      return;
    }

    // - 2. 获取参数, 判空
    let { user_id, action } = req.body;
    if (!user_id || !action) {
      res.send({ errmsg: '参数错误1' })
      return;
    }

    // - 3. 查询数据库 且 判断关注用户是否存在, 不存在就return 确保 user_id(新闻作者的id) 是有效的
    // 新闻作者 或者 理解成 被关注者
    let userResult = await handleDB(res, 'info_user', 'find', '用户数据库查询出错', `id=${user_id}`);
    if (!userResult[0]) {
      res.send({ errmsg: '参数错误2' })
      return;
    }

    // - 4. 根据 action 的值, 关注 或者 取消关注
    if (action === 'follow') {
      // 关注
      await handleDB(res, 'info_user_fans', 'insert', '粉丝数据库添加失败', { follower_id: userInfo[0].id, followed_id:user_id });
    } else {
      // 执行取消关注
      await handleDB(res, 'info_user_fans', 'delete', '粉丝数据库添加失败', `follower_id=${userInfo[0].id} and followed_id=${user_id}`);
    }

    // - 5. 返回操作成功
    res.send({ errno: '0', errmsg: '操作成功' });
  })()
})

module.exports = router;