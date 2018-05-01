const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { CET_4, CET_6 } = require('../constant/paperConst')

// Create Schema
const PaperSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['CET_4', 'CET_6'],
  },
  writing: {
    dirctions: {
      type: String,
      required: true,
    },
  },
  translation: {
    question: {
      type: String,
      required: true,
    },
  },
  isCheckedBySuperUser: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Paper = mongoose.model('Papers', PaperSchema)
