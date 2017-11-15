const passport = require('passport');

// 最一開始使用者在瀏覽器按下"Google註冊"時，會發出這個請求
// 'google'是指定哪個OAuth，因為原本passport中並沒有
// 定義哪一個是GoogleOAUTH，必須手動指定
// scope是指名要向google要哪些使用者個資

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // 當google認證並授權App後，回傳的URL
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    // passport提供的logout方法
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
    // res.send(req.session);
  });
};
