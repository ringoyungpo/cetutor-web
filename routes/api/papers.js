const express = require('express')
const router = express.Router()

// @route   GET api/papers/test
// @desc    Tests papers route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

// // @route   POST api/papers/
// // @desc    Create papers route
// // @access  Public
// router.post('/test', (req, res) => res.json({ msg: 'Users Works' }))

module.exports = router
