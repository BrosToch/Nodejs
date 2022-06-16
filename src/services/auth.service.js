const Users = require("../models/user")
const tokenUtils = require('../utils/jwt.util')
const telegramBot = require('../utils/telegramBot.util')
const messageHandler = require('../handler/messageHandler')

//register
const register = async (newUser) => {
    try{
        //--------------------------------------------> need verify code
        if(!await Users.doesntExist({email:newUser.email})){
            return messageHandler.badRequest("Email already used")
        }
        if(!await Users.doesntExist({username:newUser.username})){
            return messageHandler.badRequest("Username already used")
        }
        const user = await Users.create(newUser)
        return messageHandler.created(user)
    }catch(e){
        return e.message
    }
}

//login
const login = async (_user) => {
    try{
        const user = await Users.findOne({email: _user.email})
        if(!user){
            return messageHandler.forbidden("User Not Found")
        }
        if(!user.matchesPassword(_user.password)){
            return messageHandler.forbidden("Password incorrect")
        }
        const token = tokenUtils.authToken(user._id, user.role)
        return messageHandler.ok({
            Data: user,
            Token: token
        })
    }catch(e){
        return e.message
    }
}

const logout = async (session) => {
    try{
        session.destroy()
        return messageHandler.ok("Log out Successed")
    }catch(e){
        return e.message
    }
}

const forgetPassword = async (email) => {
    try{
        const code = telegramBot.getAuthCodeVerify(email)
        const token = tokenUtils.forgetPasswordEmailToken(email, code.Code)
        return messageHandler.ok(token)
    }catch(e){
        return e.message
    }
}

const forgetPasswordCode = (emailToken, code) => {
    try{
        const data = tokenUtils.tokenTranslate(emailToken)
        //--------------------------------------------check code in valid time
        if(data.code != code){
            return messageHandler.forbidden("Incorrect Code Input")
        }
        const token = tokenUtils.forgetPasswordCodeToken(data.email)
        return messageHandler.ok(token)
    }catch(e){
        return e.message
    }
}

//forget password - reset password   
const resetPassword = async (_user) => {
    try{
        const email = tokenUtils.tokenTranslate(_user.token)
        const user = await Users.findOne({email: email.email.email})
        if(!user){
            return messageHandler.forbidden("Email not found")
        }
        user.password = _user.newPassword
        await user.save()
        return messageHandler.ok("Successed")
    }catch(e){
        return e.message
    }
}

module.exports = {
    register,
    login,
    logout,
    forgetPassword,
    forgetPasswordCode,
    resetPassword
}