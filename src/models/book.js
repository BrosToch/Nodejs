const mongoose = require('mongoose')

const Schema = mongoose.Schema

var bookSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Authors',
        required: true
    }, 
    language: {
        type: Schema.Types.ObjectId,
        ref: 'Languages',
        required: true
    },
    publisher: {
        type: String
    },
    publishedDate: {
        type: Date,
    },
    bookThumbmnail: {
        type: String
    },
    bookThumbmnailPID: {
        type: String
    },
    bookFile: {
        type: String
    },
    bookFilePID: {
        type: String
    }
}, {
    timestamps: true
})

//statics method
bookSchema.statics.doesntExist = async function (option){
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value).countDocuments() === 0)
}


var Books = mongoose.model('Books', bookSchema)

module.exports = Books