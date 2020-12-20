const Book = require('../models/book')
const User = require('../models/user')
const axios = require('axios')
const { Collection } = require('mongoose')

module.exports = {
  index,
  new: newBook,
  search, 
  show,
  
}

function index(req, res){
  Book.find({})
  .then((books) => {
    res.render('books/index', {title: "Browse All Books", user: req.user, books})
  })
}

function newBook(req, res){
  let randomBooks = Book.aggregate(
    [{$sample: {size: 2}}]
  )
  .then((randomBooks) => {
    res.render('books/new', {title: 'Search for a Book', user: req.user, results: null, randomBooks})

  })
}

function search(req, res){
  axios
  .get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.query}&key=${process.env.BOOKS_API_KEY}`)
  .then((response) => {
    //THIS IS A NOTE TO UP THE LIMIT TO TEN OR SO ONCE SHOW IS WORKING AGAIN
      res.render('books/new', {
        title: 'Search for a Book',
        user: req.user,
        results: response.data.items,
        
      
    })
  })
}

function show(req, res){
  axios
    .get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
    .then((response) => {
      User.findById(req.user._id)
      .populate('collections')
      .then((user) => {
        Book.findOne({googleBooksId: response.data.id})
        .then((bookInDb) => {
          if (bookInDb){
            res.render('books/show', {title: 'Book Details', book: response.data, user,bookInDb})
          }
          else {
            res.render('books/show', {title: 'Book Details', book: response.data, user,bookInDb: ""})
          }
        })

      })
    })
}


