const mongoose = require('mongoose')

var locationSchema = new mongoose.Schema({
    block: {
        type: String
    },
    shelf: {
        type: String
    }
})

locationSchema.statics.doesntExist = async function (option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    const key1 = Object.keys(option)[1]
    const value1 = Object.values(option)[1]
    if(key1){
        return (await this.where(key).equals(value).where(key1).equals(value1).countDocuments() === 0)
    }
    return (await this.where(key).equals(value).countDocuments() === 0)
}

const Locations = mongoose.model('Locations', locationSchema)

module.exports = Locations