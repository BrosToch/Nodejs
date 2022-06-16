const joi = require('joi')

const createUpdate = joi.object({
    category: joi.string().required(),
    decription: joi.string()
})

module.exports = {
    createUpdate
}