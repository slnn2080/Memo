const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const {session_key} = require('./keys')

class AppConfig {

  constructor(express, app) {
    this.app = app
    this.express = express
  }

  run() {
    this.app.engine('html', require('express-art-template'));
    this.app.set('view options', {
        debug: process.env.NODE_ENV !== 'production'
    });
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'html');

    this.app.use(express.static('public'));

    this.app.use(express.urlencoded({extended: false}));
    this.app.use(express.json());

    this.app.use(cookieParser());
    this.app.use(cookieSession({
      name: 'admin_session',
      keys: [session_key],
      maxAge: 1000 * 60 * 60 * 24 * 2
    }))
  }
}

module.exports = AppConfig