const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    imagePID: {
        type: String
    }

},{
    timestamps: true
})

eventSchema.statics.doesntExist = async function(option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value).countDocuments() === 0)
}

var Events = mongoose.model('Events', eventSchema)
module.exports = Events

