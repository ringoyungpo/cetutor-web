const express = require('express')
const router = express.Router()

const Paper = require('../../models/Paper')
const passport = require('passport')

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
  },
)

// // @route   GET api/papers/
// // @desc    Get papers route
// // @access  Public
router.get('/', (req, res) => {
  Paper.find()
    .populate('user', ['nickname', 'avatar', 'isSuperUser'])
    .then(papers => res.json(papers))
    .catch(err => res.status(404).json(err))
})

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
// // @desc    Create papers route
// // @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Paper.findById(req.params.id)
      .then(paper => {
        if (req.user.id !== paper.user.toString() && !req.user.isSuperUser)
          res.status(401).json({ unauthority: true })

        Paper.findOneAndUpdate(
          { user: req.params.id },
          { $set: req.body },
          { new: true },
        )
          .then(paper => res.json({ success: true }))
          .catch(err => res.status(400).json(err))
      })
      .catch(err => res.status(404).json(err))
  },
)

// // @route   DELETE api/papers/:id
// // @desc    Delete papers route
// // @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Paper.findById(req.params.id)
      .then(paper => {
        if (req.user.id !== paper.user.toString() && !req.user.isSuperUser)
          res.status(401).json({ unauthority: true })

        Paper.findOneAndRemove({ user: req.params.id })
          .then(paper => res.json({ success: true }))
          .catch(err => res.status(400).json(err))
      })
      .catch(err => res.status(404).json(err))
  },
)

module.exports = router
