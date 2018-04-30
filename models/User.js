const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  isSuperUser: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model('users', UserSchema)
