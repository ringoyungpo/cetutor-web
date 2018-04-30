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
    validate: {
      validator: function(level) {
        return [CET_4, CET_6].includes(level)
      },
    },
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
  formated: {
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
