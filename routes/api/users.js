import express from 'express'
const router = express.Router()
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { secretOrKey } from '../../config/keys'
import passport from 'passport'
import { validatoRegisterInput } from '../../validation/register'
import { validatoLoginInput } from '../../validation/login'

//Load User model
import User from '../../models/User'

//Load ResponseError
import ResponseError from '../../config/responseError'

// @route   GET api/users/register
// @desc    Register route
// @access  Public

router.post('/', async (req, res) => {
  try {
    const { errors, isValid } = validatoRegisterInput(req.body)
    if (!isValid) throw new ResponseError(400, errors)

    const user = await User.findOne({ email: req.body.email })

    if (user) {
      errors.email = 'Email already exits'
      throw new ResponseError(400, errors)
    }

    const newUser = new User({
      nickname: req.body.nickname,
      email: req.body.email,
      avatar: gravatar.url({
        s: '200', //Size
        r: 'pg', //Rating
        d: 'mm', //Default
      }),
      password: req.body.password,
    })

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err
        newUser.password = hash
        const user = await newUser.save()
        res.json(user)
      })
    })
  } catch (error) {
    console.log(error)
    switch (error.name) {
      case 'ResponseError':
        return res.status(error.status).json(error.detail)
      default:
        return res.status(400).json({ error: 'unknown error' })
    }
  }
})

// @route   POST api/users/token
// @desc    Create token by login route to
// @access  Public

// find user by email
router.post('/token', async (req, res) => {
  const { email, password } = req.body
  try {
    const { errors, isValid } = validatoLoginInput(req.body)
    if (!isValid) throw new ResponseError(400, errors)

    const user = await User.findOne({ email })

    //check for user
    if (!user) {
      errors.email = 'User not found'
      throw new ResponseError(404, errors)
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      errors.password = 'Password incorrect'
      throw new ResponseError(400, errors)
    }

    // return res.json({ msg: 'Success' })
    // User Matched
    const payload = {
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
    } //create user payload
    jwt.sign(
      payload,
      secretOrKey,
      { expiresIn: 3 * 60 * 60 },
      async (err, token) => {
        if (err) throw err
        res.json({
          success: true,
          token: `Bearer ${token}`,
        })
      },
    )

    // Sign Token
  } catch (error) {
    console.log(error)
    switch (error.name) {
      case 'ResponseError':
        return res.status(error.status).json(error.detail)
      default:
        return res.status(400).json({ error: 'unknown error' })
    }
  }
})

// @route   GET api/users/token
// @desc    Get current user by token
// @access  Private

router.get(
  '/token',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, nickname, email } = req.user
    res.json({ id, nickname, email })
  },
)

export default router
