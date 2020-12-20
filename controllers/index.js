const Book = require('../models/book')
const User = require('../models/user')
const Collection = require('../models/collection')
const axios = require('axios')

module.exports = {
  index
}

function index(req, res){
  res.render('index', {title:'Bookish', user : req.user ? req.user : null})
}