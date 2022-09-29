const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const indexRouter = require('./routes/index');
const passportRouter = require('./routes/passport');
const detailRouter = require('./routes/detail');
const profileRouter = require('./routes/profile');
const common = require('./utils/common');
const keys = require('./keys')


class Appconfig {

  // new的时候执行的代码 那就要写在constructor里 这样人口文件调用就会执行这里面的代码
  constructor(app, express) {

    this.app = app;
    this.express = express;

    // 请求post参数的配置
    this.app.use(this.express.urlencoded({ extended: false }));
    this.app.use(this.express.json());

    // 注册cookie session
    this.app.use(cookieParser());
    this.app.use(cookieSession({
      name: 'news_session',
      keys: [keys.session_key],
      maxAge: 1000 * 60 * 60 * 24 * 2
    }))

    // 配置模板的信息
    this.app.engine('html', require('express-art-template'));
    this.app.set('view options', {
      debug: process.env.NODE_ENV !== 'production'
    });
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'html');

    // 指定静态资源的文件夹
    this.app.use(this.express.static('public'));

    // 注册index中的路由
    this.app.use(common.csrfProtect, indexRouter);
    this.app.use(common.csrfProtect, passportRouter);
    this.app.use(common.csrfProtect, detailRouter);
    this.app.use(common.csrfProtect, profileRouter);

    // 针对于其他情况返回一个404页面
    this.app.use((req, res) => {
      (async function() {
        let userInfo = await common.getUser(req, res);
        let data = {
          user_info: userInfo[0] ? {
            nick_name: userInfo[0].nick_name,
            avatar_url: userInfo[0].avatar_url
          } : false
        }
        res.render('news/404', data);
      })()
    })
  }
}

module.exports = Appconfig;

