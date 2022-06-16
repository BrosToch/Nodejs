const express = require('express');
const router = express.Router();

const messageHandler = require('../../handler/messageHandler')
const authService = require('../../services/auth.service')
const authMiddleware = require('../../middlewares/auth.middleware')

//register
router.post('/register', authMiddleware.ensureLogout, async (req, res, next) => {
    const { email, username, password } = req.body
    const result = await authService.register({email, username, password})
    next(result)
})

//login
router.post('/login', authMiddleware.ensureLogout, async (req, res, next) => {
    const {email, password} = req.body
    const result = await authService.login({email, password})
    req.session.authToken = result.message?.Token
    next(result)
})

//logout
router.post('/logout', authMiddleware.ensureLogin, async (req, res, next) => {
    const session = req.session
    const result = await authService.logout(session)
    next(result)
})

//forget password (1). get email 
router.post('/forget-password', async (req, res, next) => {
    const email = req.body
    const result = await authService.forgetPassword(email)
    //create a session token for check validation in next state
    req.session.forgetPasswordEmailToken = result?.message
    next(result)
})

//forget password (2). confirm code
router.post('/forget-password/code-verify', authMiddleware.forgetPasswordEmail, async (req, res, next) => {
    const code = req.body
    const token = req.session.forgetPasswordEmailToken
    const result = await authService.forgetPasswordCode(token, code.code)
    //create new token for next state and remove last token so this state can not be access again
    req.session.forgetPasswordEmailToken = null
    req.session.forgetPasswordCodeToken = result?.message
    next(result)
})

//forget password (3). reset password
router.patch('/forget-password/reset-password', authMiddleware.forgetPasswordCode, async (req, res, next)=> {
    const {newPassword} = req.body
    const token = req.session.forgetPasswordCodeToken
    const result = await authService.resetPassword({token, newPassword})
    //destroy token, so the user can not change password again in this state
    req.session.destroy()
    next(result)
})

module.exports = router