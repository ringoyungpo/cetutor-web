const express = require('express')
const router = express.Router()

const Paper = require('../../models/Paper')
const passport = require('passport')
const isEmpty = require('lodash').isEmpty

// @route   GET api/papers/test
// @desc    Tests papers route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Paper api Works' }))

// // @route   POST api/papers/
// // @desc    Create papers route
// // @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    new Paper({ ...req.body, user: req.user.id })
      .save()
      .then(paper => res.json(paper))
      .catch(err => res.status(400).json(err.errors))
  }
)

// // @route   GET api/papers/
// // @desc    Get all papers route
// // @access  Public
router.get('/', (req, res) => {
  Paper.find()
    .populate('user', ['nickname', 'avatar', 'isSuperUser'])
    .sort('-date')
    .then(papers => {
      papers = papers.map(paper => {
        const { _id, title, level, date, user } = paper
        return { _id, title, level, date, user }
      })
      res.json(papers)
    })
    .catch(err => res.status(404).json(err))
})

// // @route   GET api/papers/token
// // @desc    Get papers route with token
// // @access  Private
router.get(
  '/token',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Paper.find({ user: req.user.id })
      // .populate('user', ['nickname', 'avatar', 'isSuperUser'])
      .then(papers => {
        papers = papers.map(paper => {
          const { _id, title, level, date, user } = paper
          return { _id, title, level, date, user }
        })
        res.json(papers)
      })
      .catch(err => res.status(404).json(err))
  }
)

// // @route   GET api/papers/:id
// // @desc    Get papers by id route
// // @access  Public
router.get('/:id', (req, res) => {
  Paper.findById(req.params.id)
    .populate('user', ['nickname', 'avatar', 'isSuperUser'])
    .then(papers => res.json(papers))
    .catch(err => res.status(404).json(err))
})

// // @route   PUT api/papers/:id
// // @desc    Update paper by id route
// // @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Paper.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .then(paper => {
        if (isEmpty(paper)) res.status(404).json({ NoFound: 'paper no found' })
        res.json(paper)
      })
      .catch(err => res.status(400).json(err.errors))
  }
)

// // @route   DELETE api/papers/:id
// // @desc    Delete papers route
// // @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Paper.findOneAndRemove({ _id: req.params.id, user: req.user._id })
      .then(paper => res.json({ success: true }))
      .catch(err => res.status(404).json(err))
  }
)

module.exports = router
