# Fullstack-boilerplate

* This is an excellent online tutorial example from Stephen Grider.

## Deploy with Heroku

### First Time Deploy
**需要事先安裝heroku cli**
- 登入Heroku
```
heroku login
```
- 創新專案
```
heroku create
```
- 增加heroku git remote
```
heroku git:remote -a <專案名稱>
```
- 用git部署專案(事先需要commit)
```
git push heroku master
```
- 開啟專案
```
heroku open
```

### Subsequent Deploys
-