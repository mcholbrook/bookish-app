const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  reviewer: String,
  reviewerPhoto: String,
  rating: {type: Number, min: 1, max: 5},
  content: String,
  owner: String
}, {timestamps:true})

const bookSchema = new Schema({
  title: String,
  author: String,
  bookImage: String,
  publishedDate: String,
  type: String,
  description: String,
  googleBooksId: String,
  reviews: [reviewSchema]
}, {timestamps:true})

module.exports = mongoose.model('Book', bookSchema)