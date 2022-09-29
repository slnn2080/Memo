const express = require('express');
const handleDB = require('../db/handleDB');
const common = require('../utils/common');
require('../utils/filters');

const router = express.Router();

// 访问首页的接口
router.get('/', (req, res) => {
  (async function() {
      /* 
      我们要在这里处理右上角是否登录的问题

      1. 判断用户是否登录
        - 我们可以从session中去获取 user_id 如果有说明 用户刚才登录了
    */
    // let user_id = req.session['user_id'];

    // 如果 已经获取到user_id 要确认这个user_id是有效的, 我们要查询数据库中有没有这个id 如果数据库中有 才能证明是有效id 才能证明你登录了
    // let result = [];   // 数组
    // if(user_id) {
    //   result = await handleDB(res, 'info_user', 'find', '查询数据库出错', `id=${user_id}`);
      // 如果user_id是空的 需要return么 不需要 因为首页嘛 即使没有也可以看啊
      // result的结果是一个数组, [{...}] 或者是 []
      // result[0] 就是登录的那个用户数据对象, 比如我们可以通过它看下用户的昵称, result[0].nick_name
    // }
    let userInfo = await common.getUser(req, res);

    /* 
    ----------------------------------------------------------------------------
    */

    // 展示首页头部的分类信息
    // 查询数据库, 查看分类信息 info_category
    // 查询这个表的所有信息, name字段的 最后的参数是一个数组 查出来的格式为 [{name:'最新'},{name:'股市'}]
    let result2 = await handleDB(res, 'info_category', 'find', '查询数据库出错', ['name']);

    // 这个result2 要在页面中展示, 所以要传递到页面中去, 模板 , 我们直接 在data里面 继续写对象


    // 展示 右侧 点击排行 里的 新闻标题的信息
    // let result3 = await handleDB(res, 'info_news', 'sql', '查询数据库出错', 'select * from info_news order by clicks desc limit 6')

    // 
    let result3 = await handleDB(res, 'info_news', 'find', '查询数据库出错', '1 order by clicks desc limit 6')
    /* 
      这里我就是用 find 方法行不行 n1的位置参数的类型是 字符串 字符串是 where 后面的部分 下面的这条语句好像并没有出现 where 的情况
      select * from info_news order by clicks desc limit 6

      既然我们选择了使用find方法, 那要是不填写where 会查询所有 其实上面的语句 相当于这样
      select * from info_news where 1 order by clicks desc limit 6

      where 1 相当于 where 1=1 条件为恒为真 相当于不设置查询条件 查所有 实际上跟 select * from info_news where 1 没写这个部分是一样的
      也就是说 当我们要是想使用find 方法 n1参数的位置 相当于where后面的位置 也就说 我们可以这么写

      let result3 = await handleDB(res, 'info_news', 'find', '查询数据库出错', '1 order by clicks desc limit 6')
    */



    /*
    ----------------------------------------------------------------------------
    */
    // 要传递到前端的数据

    // 那我现在得到了用户的数据对象, 接下来怎么办, 我们可以把用户的数据组织成一个对象, 传递到模板里面去
    let data = {

      // 如果我们获取不到 user_id 说明 result [] []就是undefined undefined.nick_name就会报错 所以我们严谨一些
      user_info: userInfo[0] ? {
        nick_name: userInfo[0].nick_name,
        avatar_url: userInfo[0].avatar_url
      } : false,

      // 首页分类区块的按钮信息
      category: result2,
      // 点击排行 展示的信息
      newsClick: result3

    }

    // 上面我们利用了 三元运算符, 如果能查到user_id 或者说 result有值数组不为空 那么我就给你整理成一个数据发送过去, 如果没有 就传递一个false过去
    // console.log(result);
    res.render('news/index', data);
  })()
  
})

router.get('/news_list', (req, res) =>{
  (async function() {

    // 获取参数 cid page per_page 确保页面上首页有数据显示, 我们给它设置默认值 这样参数接收失败页面上也会有数据显示
    let {cid=1, page=1, per_page=5} = req.query;

    // 根据上面的参数 查询数据库
    // let result = await handleDB(res, 'info_news', 'limit', '数据库查询出错', { where: `category_id=${cid} order by create_time desc`, number: page, count: per_page});
    // 但是有问题, 因为 最新 按钮中展示的是 新闻表的所有内容, 按照时间排序, 它的id是1, 而其它类别都是在1里面
    // 所以就有两种情况, 如果 cid = 1 那么查询的就应该是全部的表信息 相当于 where: 1 order by create_time desc (因为where后面不接条件的时候得写个1 才能加排序)
    // 如果不是1 才是我们上面的那样 查询 id 为 2 - 6 的信息

    // 所以我们要这么写
    let wh = cid == 1 ? '1' : `category_id=${cid}`;
    let result = await handleDB(res, 'info_news', 'limit', '数据库查询出错', { where: `${wh} order by create_time desc`, number: page, count: per_page });


    // 求页数和当前页数 totalPage 和 currentPage
    // currentPage = page 等于前端传过来的page 因为前端在把page传递过来的时候 已经是下一页的状态(请求的就是下一页的数据) 所以这个page就是当前页
    // 总页数没有方法直接获取, 只能自己计算, 总条数 / 一页有多少条
    // 一页有多少条 是前端给的数据 per_page
    // 总条数 是 select count(*) from info_news;
    // 但是还要考虑有除不尽的情况 所以结果我们要使用 Math.ceil 向上取整
    // 这里也是一样的 要考虑 cid1 和 cid不是1 的两种情况
    let result2 = await handleDB(res, 'info_news', 'sql', '数据库查询出错', 'select count(*) from info_news where ' + wh);
    // result2 的格式 是什么样的? 是一个数组 [{'count(*) : 1155'}]
    let totalPage = Math.ceil(result2[0]['count(*)'] / per_page);



    // 查出的结果会是一个数组[{}, {}]

    // 把查询的结果返回给前端, 返回什么? 看前端成功回调里面有个resp.newList 说明我们必须返回去一个newsList
    // 还要有数据的总页数 和 当前页
    res.send({
      newsList: result,
      totalPage,

      // page传到前端是需要进行 逻辑判断的 但是由于后端从req.query里面取到的是 字符串类型 我们可以直接返回去一个数字
      currentPage:Number(page)
    })
  })()
})

module.exports = router;