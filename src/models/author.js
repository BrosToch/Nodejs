const mongoose = require('mongoose')

var authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    dob:{
        type: Date
    },
    bio:{
        type: String
    },
    image:{
        type: String
    },
    imagePID: {
        type: String
    }
},{
    timestamps: true
})

authorSchema.statics.doesntExist = async function (option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value).countDocuments() === 0)
}

var Authors = mongoose.model('Authors', authorSchema)

module.exports = Authors