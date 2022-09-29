const express = require('express');
const Appconfig = require('./config');
const app = express();

new Appconfig(app, express);




app.listen(3000, () => {
  console.log('3000端口, 已开启');
})
