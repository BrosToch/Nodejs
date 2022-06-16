const mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }

},{
    timestamps: true
})

categorySchema.statics.doesntExist = async function (option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value).countDocuments() === 0)
}

var Categories = mongoose.model('Categories', categorySchema)
module.exports = Categories