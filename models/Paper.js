const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {
  CET_4,
  CET_6,
  NEWS_REPORT,
  CONVERSATION,
  PASSANGE,
  RECORD
} = require('../client/src/constant/paperConst')

// Create Schema
const PaperSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: [CET_4, CET_6]
  },
  writing: {
    directions: {
      type: String,
      required: true
    }
  },
  listening: {
    sections: [
      {
        sectionTitle: {
          type: String,
          required: true,
          enum: [NEWS_REPORT, CONVERSATION, PASSANGE, RECORD]
        },
        modules: [
          {
            moduleSound: {
              url: {
                type: String,
                required: true
              }
            },
            questions: [
              {
                questionSound: {
                  url: {
                    type: String,
                    required: true
                  }
                },
                options: [
                  {
                    type: String,
                    required: true
                  }
                ],
                rightAnswer: {
                  type: Number,
                  required: true
                }
              }
            ]
          }
        ]
      }
    ]
  },
  translation: {
    question: {
      type: String,
      required: true
    }
  },
  isCheckedBySuperUser: {
    type: Boolean,
    default: false
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Paper = mongoose.model('Papers', PaperSchema)
