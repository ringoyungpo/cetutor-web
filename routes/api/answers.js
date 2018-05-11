const express = require('express')
const router = express.Router()

const Answer = require('../../models/Answer')
const passport = require('passport')
const isEmpty = require('lodash').isEmpty

// @route   GET api/answers/test
// @desc    Tests answers route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Answers api Works' }))

// // @route   POST api/answers/
// // @desc    Create answers route
// // @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    new Answer({
      ...req.body,
      user: req.user.id,
      date: undefined,
      _id: undefined,
      _v: undefined
    })
      .save()
      .then(answer => res.json(answer))
      .catch(err => res.status(400).json(err.errors))
  }
)

// // @route   GET api/answers/token
// // @desc    Get answers route with token
// // @access  Private
router.get(
  '/token',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Answer.find({ user: req.user.id })
      // .populate('user', ['nickname', 'avatar', 'isSuperUser'])
      .then(answers => {
        answers = answers.map(answer => {
          const { _id, title, level, date, user } = answer
          return { _id, title, level, date, user }
        })
        res.json(answers)
      })
      .catch(err => res.status(404).json(err))
  }
)

module.exports = router
