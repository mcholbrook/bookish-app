const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collectionSchema = new Schema({
  title: {type: String, required: true},
  cardImage: {type: String, default: "https://source.unsplash.com/random/200x200"},
  owner: String,
  books: [{type: Schema.Types.ObjectId, ref: "Book"}]

}, {timestamps:true})

module.exports = mongoose.model('Collection', collectionSchema)