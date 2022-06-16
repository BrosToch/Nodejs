const mongoose = require('mongoose')
const Schema = mongoose.Schema

var borrowSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    // book: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Books',
    //     required: true
    // },
    bookUnit: {
        type: Schema.Types.ObjectId,
        ref: 'BookUnits',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    pickUpDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        enum: [1,2,3,4],
        default: 2,
        required: true
    },
    status: {
        type: String,
        lowercase: true,
        enum: ["pending", "rejected", "approved", "cancel"],
        default: "pending"
    },
    returnDate: { //this when book are pysically return
        type: Date
    }
},{
    timestamps: true
})

borrowSchema.statics.doesntExist = async function(option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value).countDocuments() === 0)
}

const Borrows = mongoose.model('Borrows', borrowSchema)
module.exports = Borrows