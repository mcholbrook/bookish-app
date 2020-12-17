const Collection = require('../models/collection')
const Book = require('../models/book')
const User = require('../models/user')
const { defaultMaxListeners } = require('bl')

module.exports = {
  index,
  new: newCollection,
  create,
  show,
  addBook,
  deleteBook,
}

function index(req, res){
  User.findById(req.user._id)
  .populate('collections')
  .then((user) => {
    console.log(`This is ${req.user.name}'s Collections`)
    res.render('collections/index', {title: 'My Collections', user})
  })
}

function newCollection(req, res){
  res.render('collections/new', {title: 'Add a Collection', user: req.user })
}

function create(req, res){
 req.body.owner = req.user._id
 for (let key in req.body){
   if (req.body[key] === '') delete req.body[key]
 }
  Collection.create(req.body)
  .then((collection) => {
    User.findById(req.user._id)
    .then((user) => {
      user.collections.push(collection._id)
      user.save()
      res.redirect('/collections')
    })
    
  })
}

function show(req, res){
  Collection.findById(req.params.id)
  .populate('books')
  .then((collection) => {
    res.render('collections/show', {title: 'Collection Details', collection, user: req.user._id })
  })
}

function addBook(req, res){
  Collection.findById(req.params.id)
  .then((collection) => {
    Book.findOne({googleBooksId: req.body.GoogleBooksId})
    .then((book) => {
      if (book){
        collection.books.push(book._id)
        collection.save()
        .then(() => {
          res.redirect(`/books/${book.googleBooksId}`)
        })
      }
      else {
        Book.create(req.body)
        .then((book) => {
          //console.log(`This is the new book: ${book}`)
          collection.books.push(book._id)
          collection.save()
          .then(() => {
            res.redirect(`/books/${book.googleBooksId}`)

          })
        })
      }
    })
  })
}

function deleteBook(req, res){
  Collection.findById(req.params.id)
  .then((collection) => {
    Book.findOne({googleBooksId: req.body.GoogleBooksId})
    .then((book) => {
      let idx = collection.books.indexOf(book._id)
      collection.books.splice(idx, 1)
      collection.save()
      .then(() => {
        res.redirect(`/books/${book.googleBooksId}`)
      })
    })
  })
}