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
  res.render('books/index', {title: "Browse All Books", user: req.user})
}

function newBook(req, res){
  res.render('books/new', {title: 'Search for a Book', user: req.user, results: null})
}

function search(req, res){
  axios
  .get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.query}`)
  .then((response) => {
    //console.log(response.data.items)
    res.render('books/new', {
      title: 'Search for a Book',
      user: req.user,
      results: response.data.items
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
    .get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
    .then((response) => {
      //console.log(response.data)
      //Book.findOne({googleID: })
      User.findById(req.user._id)
      .populate('collections')
      .then((user) => {
        Book.findOne({googleBooksId: response.data.id})
        .then((bookInDb) => {
          console.log(`This is the book in the DB ${bookInDb}`)
          if (bookInDb){
            res.render('books/show', {title: 'Book Details', book: response.data, 
            user,
            //user: req.user, 
            bookInDb})
          }
          else {
            res.render('books/show', {title: 'Book Details', book: response.data, 
            user,
            //user: req.user, 
            bookInDb: ""})
          }
        })

      })
    })
}

// function update(req, res){
//   Book.findOne({googleBooksId: req.params.id})
//   .then((book) => {
//     if (!book){
      
//     }
//     User.findById(req.user._id)
//     .then((user) => {
//       console.log(`These collections belong to me`)
//       user.collections.forEach((collection) => {
//         console.log(`User collections: ${collection}`)
//         // if (collection.title === 'My Books'){
//         //   collection.books.push(book._id)
//         //   collection.save()
//         //   console.log(`This is the collection: ${collection}`)
//         // }
//       })
//       res.redirect(`/books/${req.params.id}`)
//     })
//     //THIS IS A BIG NOTE IN THE MORNING THAT THE REASON THIS IS NOT WORKING IS BECAUSE YOU HAVE TO CREATE THE BOOK MODEL OBJECT FIRST
//   }
//   )
// }