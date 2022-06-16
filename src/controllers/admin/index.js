const express = require('express');

const router = express.Router();

router.use('/user', require('./user.controller'))
router.use('/user-identity', require('./userIdentity.controller'))
router.use('/event', require('./event.controller'))
router.use('/book', require('./book.controller'))
router.use('/book-unit', require('./bookUnit.controller'))
router.use('/category', require('./category.controller'))
router.use('/author', require('./author.controller'))
router.use('/language', require('./language.controller'))
router.use('/location', require('./location.controller'))
router.use('/borrow', require('./borrow.controller'))

module.exports = router
