const express = require('express');

const router = express.Router();

router.use('/event', require('./event.controller'))
router.use('/book', require('./book.controller'))
router.use('/category', require('./category.controller'))
router.use('/language', require('./language.controller'))
router.use('/author', require('./author.controller'))
router.use('/borrow', require('./borrow.controller'))


module.exports = router

