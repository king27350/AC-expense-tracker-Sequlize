const express = require('express')
const router = express.Router()

const db = require('../models')
const Record = db.Record
const User = db.User

const { authenticated } = require('../config/auth')

// 列出全部 Record
router.get('/', authenticated, (req, res) => {
  res.send('列出全部 Record')
})

// 新增一筆 Record 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 新增一筆  Record 動作
router.post('/', authenticated, (req, res) => {
  Record.create({
    name: req.body.name,
    category: req.body.category,
    amount: req.body.amount,
    store: req.body.store,
    date: req.body.date,
    UserId: req.user.id
  })
    .then((Record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

// 修改 Record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  res.send('修改 Record 頁面')
})

// 修改 Record
router.put('/:id', authenticated, (req, res) => {
  res.send('修改 Record')
})

// 刪除 Record
router.delete('/:id/delete', authenticated, (req, res) => {
  res.send('刪除 Record')
})

module.exports = router