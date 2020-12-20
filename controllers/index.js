const Book = require('../models/book')
const User = require('../models/user')
const Collection = require('../models/collection')
const axios = require('axios')
const { populate } = require('../models/book')

module.exports = {
  index
}

function index(req, res){
  let randomCollections = Collection.aggregate(
    [{$sample: {size: 2}}]
  )
  .then((randomCollections) => {
    console.log(randomCollections)
    randomCollections.forEach((collection) => {
      Collection.findById(collection._id)
      .populate('owner')
      .then((collection2) => {
        randomCollections.shift()
        randomCollections.push(collection2)
      }) 
    })
    console.log(randomCollections)
      res.render('index', {title:'Bookish', user : req.user ? req.user : null, randomCollections})
  })
}