const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// passport本身並沒有回傳值，他只是裝填一些Strategy，所以不需要指定成一個常數
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);
// 指定環境埠號。部署時會某些server provider會動態指定埠號，因此必須要由process.env.PORT
// 來讀取。預設埠號5000，給開發環境使用。
const PORT = process.env.PORT || 5000;

app.listen(PORT);
