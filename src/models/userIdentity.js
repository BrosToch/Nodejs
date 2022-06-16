const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userIdentitySchema = new mongoose.Schema({
    userAccID: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    tel: {
        type: String,
        minlength: 9,
        maxlength: 13,
        required: true
    },
    gender: {
        type: String,
        uppercase: true,
        enum: ["MALE", "FEMALE"],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
    },
    nationality: {
        type: String,
    }
},{
    timestamps: true
})

userIdentitySchema.statics.doesntExist = async function (option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value).countDocuments() === 0)
}

var UserIdentities = mongoose.model('UserIdentities', userIdentitySchema)

module.exports = UserIdentities