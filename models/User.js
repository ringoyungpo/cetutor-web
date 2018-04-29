import mongoose, { Schema } from 'mongoose'

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
  data: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('users', UserSchema)
