const Collection = require('../models/collection')
const Book = require('../models/book')
const User = require('../models/user')

module.exports = {
  index,
  new: newCollection,

}

function index(req, res){
  // res.render('collections/index', {title: 'My Collections', user: req.user} )
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