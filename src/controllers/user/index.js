const express = require('express');

const router = express.Router();

router.use('/user', require('./user.controller'))

module.exports = router
