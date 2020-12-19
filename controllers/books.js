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
  res.render('books/new', {title: 'Search for a Book', user: req.user, results: null})
}

function search(req, res){
  axios
  .get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.query}&key=${process.env.BOOKS_API_KEY}`)
  .then((response) => {
    console.log(response.data.items)
    //let newDescription = response.data.items.volumeInfo.description.replace(/<[^>]*>?/gm, '')
    res.render('books/new', {
      title: 'Search for a Book',
      user: req.user,
      results: response.data.items,

    })
  })
    // .get(`http://openlibrary.org/search.json?q=${req. body.query}&limit=5`)
    // .then((response) => {
    //   console.log(response.data.docs)
    //   res.render('books/new', {
    //     title: 'Search for a Book',
    //     user: req.user,
    //     results: response
    //   })
    // })
  // console.log('This is a test')
  // res.render('books/new', {
  //   title: 'This was a successful Search!',
  //   user: req.user
  // })
}

function show(req, res){
  axios
    .get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}&key=${process.env.BOOKS_API_KEY}`)
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


