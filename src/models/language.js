const mongoose = require('mongoose')

var languageSchema = new mongoose.Schema({
    language: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    }

},{
    timestamps: true
})

languageSchema.statics.doesntExist = async function (option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value).countDocuments() === 0)
}

var Languages = mongoose.model('Languages', languageSchema)

module.exports = Languages