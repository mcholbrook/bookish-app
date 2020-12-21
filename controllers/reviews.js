const Book = require('../models/book')

module.exports = {
  create
}

function create(req, res){
  console.log(req.params)
  console.log(req.params.googleBooksId)
  Book.findOne({googleBooksId: req.params.googleBooksId})
  .then((book) => {
    req.body.reviewer = req.user.name
    req.body.reviewerPhoto = req.user.avatar
    req.body.owner = req.user._id
    req.body.ownerEmail = req.user.email
    book.reviews.push(req.body)
    book.save()
    .then(() => {
      res.redirect(`/books/${book.googleBooksId}`)
    })
  })
}

