const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const moment = require('moment')
const flash = require('connect-flash')

const db = require('./models')
const Record = db.Record
const User = db.User

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// handlebars-helper 
const handlebars = require("handlebars")
handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
})

handlebars.registerHelper('formatDate', function (date) {
  const formatDate = moment(date).format("YYYY-MM-DD")
  return formatDate
})

app.use(flash())
app.use(session({
  secret: 'hello world',
  resave: 'false',
  saveUninitialized: 'false'
}))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.User = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// routes setting
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/records', require('./routes/record'))
app.use('/auth', require('./routes/auth'))

app.listen(3000, () => {
  console.log(`App is running on port 3000 !`)
})