const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bookUnitSchema = new mongoose.Schema({
    isbn: {
        type: String,
        require: true,
        unique: true,
        maxlength: 13
    },
    isPrimary: {
        type: Boolean,  //true is primary, so can not borrow
        default: false
    },
    isBusy: {
        type: Boolean,
        default: false
    },
    condition: {
        type: String,
        uppercase: true,
        enum: ["NEW", "GOOD", "NORMAL", "BAD", "WORST"],
        default: "NEW"
    },
    bookRef:{
        type: Schema.Types.ObjectId,
        ref: 'Books',
        require: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
        required: true,
    }
},{
    timestamps: true
})

bookUnitSchema.statics.doesntExist = async function (option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value).countDocuments() === 0)
}

const BookUnits = mongoose.model('BookUnits', bookUnitSchema)

module.exports = BookUnits