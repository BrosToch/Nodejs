const Users = require("../models/user")
const messageHandler = require('../handler/messageHandler')

//find all users
const getAll = async (filter) => {
    try{
        const users = await Users.find(filter)
        return messageHandler.ok(users)
    }catch(e){
        return e.message
    }
}

//find user by id
const getById = async (id) => {
    try{
        const user = await Users.findById(id)
        return messageHandler.ok(user)
    }catch(e){
        return e.message
    }
}

// create user
const createUser = async (_user) => {
    try{
        const user = await Users.create(_user)
        return messageHandler.created(user)
    }catch(e){
        return e.message
    }
}

//update user
const updateUser = async (id, _user) => {
    try{
        const user = await Users.findById(id)
        user.username = _user.username
        await user.save()
        return messageHandler.ok(user)
    }catch(e){
        return e.message
    }
}

//update user
const updateRole = async (id, _user) => {
    try{
        const user = await Users.findById(id)
        user.role = _user.role
        await user.save()
        return messageHandler.ok(user)
    }catch(e){
        return e.message
    }
}

//update password
const updatePassword = async (id, _user) => {
    try{
        const user = await Users.findById(id)
        if(!user.matchesPassword(_user.currentPassword)){
            return messageHandler.forbidden("Incorrect Password")
        }
        user.password = _user.newPassword
        await user.save()
        return messageHandler.ok(user)
    }catch(e){
        return e.message
    }
}

//delete user
const removeUser = async (id) => {
    try{
        if(await Users.doesntExist({_id:id})){
           return messageHandler.notFound("User Not Found")
        }
        await Users.deleteOne({_id:id})
        return messageHandler.ok("Delete Successful")
    }catch(e){
        return e.message
    }
}

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    updateRole,
    updatePassword,
    removeUser
}