const express = require('express')
const router = express.Router()
const moment = require('moment')
const db = require('../models')
const Record = db.Record
const User = db.User

const { authenticated } = require('../config/auth')

//filter
router.get('/filter', authenticated, (req, res) => {
  const month = req.query.month
  const category = req.query.category
  let totalAmount = 0

  Record.findAll({ where: { UserId: req.user.id } }).then((record) => {
    let records = ''
    if (!category) {
      records = record.filter(item => item.date.getMonth() === (Number(month) - 1))
    } else if (!month) {
      records = record.filter(item => item.category === category)
    } else {
      records = record.filter(item => item.date.getMonth() === (Number(month) - 1)).filter(item2 => item2.category === category)
    }

    for (let i = 0; i < records.length; i++) {
      totalAmount += Number(records[i].amount)
    }
    req.flash('success_msg', '發大財，沒有支出')
    res.render('index', { records, totalAmount, month, category })
  })
})


// 列出全部 Record
router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
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
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Record.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id,
        }
      })
    })
    .then((record) => { return res.render('edit', { record: record }) })
})

// 修改 Record 動作
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((record) => {
      record.name = req.body.name
      record.category = req.body.category
      record.date = req.body.date
      record.amount = req.body.amount
      record.store = req.body.store
      return record.save()
    })
    .then((record) => { return res.redirect(`/`) })
    .catch((error) => { return res.status(422).json(error) })
})

// 刪除 Record 
// 尚未做出嘗試假刪除
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router