const Book = require('../models/book')
const axios = require('axios')

module.exports = {
  index,
}

function index(req, res){
  res.render('books/index', {title: "Browse All Books", user: req.user})
}