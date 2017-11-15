// prods.js - production keys here
const PE = process.env;
module.exports = {
  googleClientID: PE.GOOGLE_CLIENT_ID,
  googleClientSecret: PE.GOOGLE_CLIENT_SECRET,
  mongoURI: PE.MONGO_URI,
  cookieKey: PE.COOKIE_KEY
};
