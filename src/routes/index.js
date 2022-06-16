const express = require('express');
const router = express.Router();
const { ensureLogin, ensureAdminLogin } = require('../middlewares/auth.middleware')
const { formRequest } = require('../utils/upload.utils')

router.get('/', (req, res) => {
    res.send("Hello from api");
})

//==================> with middleware for product 
router.use('/auth', require('../controllers/auth'))
router.use('/admin', ensureAdminLogin, require('../controllers/admin'))
router.use('/user', ensureLogin, require('../controllers/user'))
router.use('/public', require('../controllers/public'))


//==================> without middleware for testing
// router.use('/admin', require('../controllers/admin'))


module.exports = router