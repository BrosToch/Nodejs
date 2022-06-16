const UserIdentities = require('../models/userIdentity')
const messageHandler = require('../handler/messageHandler')

const getAll = async (filter, details = false) => {
    try{
        var userIdentities
        if(details){
            userIdentities = await UserIdentities.find(filter).populate('userAccID')
        }else{
            userIdentities = await UserIdentities.find(filter)
        }
        return messageHandler.ok(userIdentities)
    }catch(e){
        return e.message
    }
}

const getById = async (id, details = false) => {
    try{
        var userIdentity = undefined
        if(details){
            userIdentity = await UserIdentities.findById(id).populate('userAccID')
        }else{
            userIdentity = await UserIdentities.findById(id)
        }
        if(!userIdentity){
            return messageHandler.notFound("User Identity Not Found")
        }
        return messageHandler.ok(userIdentity)
    }catch(e){
        return e.message
    }
}

const create = async (userAccID, _userIdentity) => {
    try{
        if(!await UserIdentities.doesntExist({_id:userAccID})){
            return messageHandler.conflict("User Identity Already have")
        }
        _userIdentity.userAccID = userAccID //restrict from being input by user or form**
        const userIdentity = await UserIdentities.create(_userIdentity)
        return messageHandler.created(userIdentity)
    }catch(e){
        return e.message
    }
}

const update = async (id, _userIdentity) => {
    try{
        var userIdentity = await UserIdentities.findById({_id:id})
        if(!userIdentity){
            return messageHandler.notFound("User Identity Not Found")
        }
        //no change for userAccId
        userIdentity.firstName = _userIdentity.firstName ? _userIdentity.firstName:userIdentity.firstName
        userIdentity.lastName = _userIdentity.lastName ? _userIdentity.lastName:userIdentity.lastName
        userIdentity.dob = _userIdentity.dob ? _userIdentity.dob:userIdentity.dob
        userIdentity.tel = _userIdentity.tel ? _userIdentity.tel:userIdentity.tel
        userIdentity.gender = _userIdentity.gender ? _userIdentity.gender:userIdentity.gender
        userIdentity.address = _userIdentity.address ? _userIdentity.address:userIdentity.address
        userIdentity.occupation = _userIdentity.occupation ? _userIdentity.occupation:userIdentity.occupation
        userIdentity.nationality = _userIdentity.nationality ? _userIdentity.nationality:userIdentity.nationality
        await userIdentity.save()
        return messageHandler.ok(userIdentity)
    }catch(e){
        return e.message
    }
}

const remove = async (id) => {
    try{
        if(await UserIdentities.doesntExist({_id:id})){
            return messageHandler.notFound("User Identity Not Found")
        }
        await UserIdentities.deleteOne({_id:id})
        if(!await UserIdentities.doesntExist({_id:id})){
            return messageHandler.conflict("Delete Fail")
        }
        return messageHandler.ok("Delete Success")
    }catch(e){
        return e.message
    }
}

module.exports = {
    getAll,
    getById, 
    create,
    update, 
    remove
}