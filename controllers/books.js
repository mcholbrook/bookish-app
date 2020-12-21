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
    [{$sample: {size: 6}}]
  )
  .then((randomBooks) => {
    res.render('books/new', {title: 'Search for a Book', user: req.user, results: null, randomBooks})
  })
}

function search(req, res){
  axios
  .get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.query}&key=${process.env.BOOKS_API_KEY}`)
  .then((response) => {
    response.data.items.forEach((book) => {
      Book.findOne({googleBooksId: book.id})
      .then((foundBook) => {
        if (!foundBook){
          Book.create({title: `${book.volumeInfo.title}`, author: `${book.volumeInfo.authors}`, publishedDate: `${book.volumeInfo.publishedDate}`, googleBooksId: `${book.id}`})
          .then((bookInDb) => {
            if (book.volumeInfo.description){
              Book.findById(bookInDb._id)
              .then((newestBook) => {
                newestBook.description = `${book.volumeInfo.description.replace(/<[^>]*>?/gm, '')}`
                newestBook.save()
              })
            }
            if (book.volumeInfo.imageLinks){
              Book.findById(bookInDb._id)
              .then((newestBook) => {
                newestBook.bookImage = `${book.volumeInfo.imageLinks.thumbnail}`
                newestBook.save()
              })
            } 
            else {
              Book.findById(bookInDb._id)
              .then((newestBook) => {
                newestBook.bookImage = "https://source.unsplash.com/random/128x197/?books,library"
                newestBook.save()
              })
            }
          })
        }
      })
    })
    res.render('books/new', {
      title: 'Search for a Book',
      user: req.user,
      results: response.data.items,
    })
  })
}

function show(req, res){
  // axios
  //   .get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
  //   .then((response) => {
      User.findById(req.user._id)
      .populate('collections')
      .then((user) => {
        Book.findOne({googleBooksId: req.params.id})
        .then((bookInDb) => {
          if (bookInDb){
            // console.log(user)
            res.render('books/show', {title: 'Book Details', user, bookInDb})
          }
          // else {
          //   res.render('books/show', {title: 'Book Details', book: response.data, user,bookInDb: ""})
          // }
        })

      })
    // })
}


