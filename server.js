import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import passportConfig from './config/passportConfig'
import path from 'path'

import users from './routes/api/users'
// import profile from './routes/api/profile'
// import posts from './routes/api/posts'

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB Config
import { mongoURI as db } from './config/keys'

mongoose
  .connect(db)
  .then(() => console.log('Mongo Connected'))
  .catch(err => console.log(err))

app.use(passport.initialize())
passportConfig(passport)

app.use('/api/users', users)

// app.use('/api/profile', profile)
// app.use('/api/posts', posts)

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
