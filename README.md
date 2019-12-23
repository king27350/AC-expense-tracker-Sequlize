# 我的記帳本

### 熟悉使用 MySQL
---

## 建構環境與使用套件
+ Node js
  - bcryptjs
  - body-parser
  - connect-flash
  - dotenv
  - express
  - express-handlebars
  - express-session
  - method-override
  - moment
  - mysql2
  - passport
  - passport-facebook
  - passport-local
  - sequelize
  - sequelize-cli
+ MySQL

## Installing 
下載專案
```
git clone https://github.com/king27350/AC-expense-tracker-Sequlize.git
```
使用終端機安裝套件
**Node Version v10.15.3**
```
$npm install
```

**在專案底下新增 .env 檔案**
為了隱藏敏感資訊，使用 dotenv 套件，新增```.env```檔案

開啟```.env```檔案，輸入以下程式碼
```
FACEBOOK_ID= //your Client ID
FACEBOOK_SECRET= //your Client secret
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback

```
### 修改 /config/config.json
請至 development 更改，加入資料庫的```名字```與```密碼```,刪除operatorsAliases
```
"development": {
    "username": "root",
    "password": "password",
    "database": "expense_tracker",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```
### 資料庫建置
MySQL Workbench 輸入
```
drop database if exists todo_sequelize;
create database todo_sequelize;
use todo_sequelize;
```
終端機輸入
```
npx sequelize db:migrate
```

**環境建置完畢**

---


開啟環境執行SERVER
```
$npm run dev
```
開啟瀏覽器網址輸入
```
http://localhost:3000
```


#### 功能描述
+ 實作註冊登入功能
+ 使用MySQL資料庫
+ 依照月份及分類排序
+ 總金額計算顯示
+ 新增、修改、刪除記錄



#### 專案貢獻者
[Chris Wei](https://github.com/king27350)
