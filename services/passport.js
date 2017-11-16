// Passport和PassportStrategy
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// 這裡的id不是googleID, 而是mongo產生的_id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 自己產生的id(MONGODB _id)
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// passport要"裝填"Strtegy，這裡以GoogleStrategy為例。
// 目前的options，前兩個為公鑰及私鑰，第三個是當google驗證成功後要回傳的URL
// 第四個proxy，設置google不阻擋來自proxy的請求(信任proxy)
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // 這裡必須看使用者是否已註冊過，如果已註冊就不要重複註冊
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // 已註冊過
        return done(null, existingUser);
      }
      // 未註冊過
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
