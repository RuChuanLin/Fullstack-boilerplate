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
// 目前有3個options，前兩個為公鑰及私鑰，第三個是當google驗證成功後要回傳的URL
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // 這裡必須看使用者是否已註冊過，如果已註冊就不要重複註冊
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // 已註冊過
          done(null, existingUser);
        } else {
          // 未註冊過
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
