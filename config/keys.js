// 避免找不到屬性的key，把key和values分成兩個檔案。
// .gitignore只忽略value的部份。
// 確保github仍可以找到key的部份。
// 新電腦 1. 同目錄新增 keys_values.js
// 2. 複製 module.exports 整段
// 3. 加入屬性
const VALUE = require('./keys_values');

const { googleClientID, googleClientSecret, mongoURI } = VALUE;

module.exports = {
  googleClientID,
  googleClientSecret,
  mongoURI
};
