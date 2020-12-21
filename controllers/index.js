const Book = require('../models/book')
const User = require('../models/user')
const Collection = require('../models/collection')
const axios = require('axios')
const { populate } = require('../models/book')

module.exports = {
  index
}

function index(req, res){
  let randomBooks = Book.aggregate([{$sample: {size: 8}}])
  .then((randomBooks) => {
    let randomCollections = Collection.aggregate(
      [{$sample: {size: 4}}]
    )
    .then((randomCollections) => {
      randomCollections.forEach((collection) => {
        Collection.findById(collection._id)
        .populate('owner')
        .then((collection2) => {
          randomCollections.shift()
          randomCollections.push(collection2)
        }) 
      })
      res.render('index', {title:'Bookish', user : req.user ? req.user : null, randomCollections, randomBooks})
    })
  })
}