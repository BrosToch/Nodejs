const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

//schema
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
},
{
    timestamps: true,
    toJSON: {
        transform(doc, ret){
            delete ret.password
        }
    }
});

// middleware
userSchema.pre('save', function (next) {
    if(this.isModified('password')) {
        var salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
})

//static method
userSchema.statics.doesntExist = async function (option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value).countDocuments() === 0)
}
userSchema.statics.filterUser = async function (option) {
    const key = Object.keys(option)[0]
    const value = Object.values(option)[0]
    return (await this.where(key).equals(value))
}

//method
userSchema.methods.matchesPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

//create model
var Users = mongoose.model('Users', userSchema);

//exports
module.exports = Users