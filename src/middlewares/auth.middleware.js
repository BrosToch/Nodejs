const { tokenTranslate } = require('../utils/jwt.util')
const messageHandler = require('../handler/messageHandler')
/**middleware to check if the user have token
 * it mean they already login, so they have authorize
 * to access another thing
 */
const ensureLogin = (req, res, next) => {
    if(!req.session.authToken){
        next(messageHandler.badRequest("Already Sign Out"))
        return
    }
    next()
}

/**middleware to check if the user have token
 * it mean they already login, so they have authorize
 * to access another thing but the role of user must be admin
 */
 const ensureAdminLogin = (req, res, next) => {
    if(!req.session.authToken){
        next(messageHandler.badRequest("Already Sign Out"))
        return
    }
    const data = tokenTranslate(req.session.authToken)
    if(data.role !== "admin"){
        next(messageHandler.unauthorized("Access Denied"))
        return
    }
    next()
}

/**to check if the user already sign out, so they dont have 
 * authorize token to access anything else
 * until they sign in first
*/
const ensureLogout = (req, res, next) => {
    if(req.session.authToken){
        next(messageHandler.badRequest("Already Sign In"))
        return
    }
    next()
}

/**this middleware use in forget password only to keep 
 * the forgeting method access orderly
 */
const forgetPasswordEmail = (req, res, next) => {
    if(!req.session.forgetPasswordEmailToken){
        next(messageHandler.unauthorized("Access Denied"))
        return
    }
    next()
}

const forgetPasswordCode = (req, res, next) => {
    req.session.forgetPasswordEmailToken = null
    if(!req.session.forgetPasswordCodeToken){
        next(messageHandler.unauthorized("Access Denied"))
        return
    }
    next()
}

module.exports = {
    forgetPasswordEmail,
    forgetPasswordCode,
    ensureLogin,
    ensureAdminLogin,
    ensureLogout
}