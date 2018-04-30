const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PaperSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required,
  },
  level: {
    type: String,
    required,
  },
  writing: {
    dirctions: String,
    required,
  },
  translation: {
    question: String,
    required,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Paper = mongoose.model('Papers', PaperSchema)
