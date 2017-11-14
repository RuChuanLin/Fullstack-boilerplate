const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// 指定環境埠號。部署時會某些server provider會動態指定埠號，因此必須要由process.env.PORT
// 來讀取。預設埠號5000，給開發環境使用。
const PORT = process.env.PORT || 5000;

app.listen(PORT);
