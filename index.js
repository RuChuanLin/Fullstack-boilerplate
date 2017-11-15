const express = require('express');
const mongoose = require('mongoose');
const cookiesSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// passport本身並沒有回傳值，他只是裝填一些Strategy，所以不需要指定成一個常數
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// cookiesSession兩個options
// 1. 存活時間maxAge, 1個月
// 2. cookie的key, 這裡的key是使用亂數字串加以加密，因此引用keys，不commit
app.use(
  cookiesSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
// 指定環境埠號。部署時會某些server provider會動態指定埠號，因此必須要由process.env.PORT
// 來讀取。預設埠號5000，給開發環境使用。
const PORT = process.env.PORT || 5000;

app.listen(PORT);
