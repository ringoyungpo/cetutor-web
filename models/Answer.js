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
const AnswerSchema = new Schema({
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
    },
    level: {
      type: Number
    },
    essay: {
      type: String
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
                },
                optionSelected: {
                  type: Number
                }
              }
            ]
          }
        ]
      }
    ]
  },
  reading: {
    sections: {
      bankedCloze: {
        passage: {
          type: String,
          required: true
        },
        options: [
          {
            type: String,
            required: true
          }
        ],
        rightOrder: [
          {
            type: Number,
            required: true
          }
        ],
        orderSelected: [
          {
            type: Number
          }
        ]
      },
      locating: {
        title: {
          type: String,
          required: true
        },
        paragraphs: [
          {
            type: String,
            required: true
          }
        ],
        questions: [
          {
            questionContent: {
              type: String,
              required: true
            },
            rightAnswer: {
              type: Number,
              required: true
            },
            optionSelected: {
              type: String
            }
          }
        ]
      },
      selection: {
        passages: [
          {
            passageContent: {
              type: String,
              required: true
            },
            questions: [
              {
                questionContent: {
                  type: String,
                  required: true
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
                },
                optionSelected: {
                  type: String
                }
              }
            ]
          }
        ]
      }
    }
  },
  translation: {
    question: {
      type: String,
      required: true
    },
    level: {
      type: String
    },
    answer: {
      type: String
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

module.exports = Answer = mongoose.model('Answers', AnswerSchema)
