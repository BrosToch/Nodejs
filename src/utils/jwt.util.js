const jwt = require('jsonwebtoken')

// const secretWord = 'jwt-secret-private-key-word'

const secretWord = process.env.JWT_SECRET

/**create a token for validation,
 * if the user have token 
 * they have the right to access
 */
const authToken = (userId, role) => {
    return jwt.sign({
        id: userId,
        role: role
    }, secretWord)
}

/**In forget password there are three state to access in orderly.
 * and this forget password token is to keep user access orderly  
 */
//check when input code
const forgetPasswordEmailToken = (email, code) => {
    return jwt.sign({
        email: email,
        code: code
    }, secretWord)
}

//check when input new password
const forgetPasswordCodeToken = (email) => {
    return jwt.sign({
      email: email
    }, secretWord)
}

/**for encode any token and return back the data that 
 * use to create that token
 */
const tokenTranslate = (token) => {
    return jwt.verify(token, secretWord)
}

module.exports = {
    authToken,
    forgetPasswordEmailToken,
    forgetPasswordCodeToken,
    tokenTranslate
}