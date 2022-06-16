const Locations = require('../models/location')
const messageHandler = require('../handler/messageHandler')

const getAll = async (filter) => {
    try{
        const locations = await Locations.find(filter)
        return messageHandler.ok(locations)
    }catch(e){
        return e.message
    }
}

const getById = async (id) => {
    try{
        const location = await Locations.findById(id)
        if(!location){
            return messageHandler.notFound("Loction Not Found")
        }
        return messageHandler.ok(location)
    }catch(e){
        return e.message
    }
}

const create = async (_location) => {
    try{
        if(!await Locations.doesntExist({block: _location.block, shelf: _location.shelf})){
            return messageHandler.conflict("Location have already used")
        }
        const location = await Locations.create(_location)
        return messageHandler.created(location)
    }catch(e){
        return e.message
    }
}

const update = async (id, _location) => {
    try{
        var location = await Locations.findById(id)
        if(!location){
            return messageHandler.notFound("Location Not Exist")
        }
        location.block = _location.block ? _location.block:location.block
        location.shelf = _location.shelf ? _location.shelf:location.shelf
        await location.save()
        return messageHandler.ok(location)
    }catch(e){
        return e.message
    }
}

const remove = async (id) => {
    try{
        if(await Locations.doesntExist({_id:id})){
            return messageHandler.notFound("Location Not Exist")
        }
        await Locations.deleteOne({_id:id})
        if(!await Locations.doesntExist({_id:id})){
            return messageHandler.conflict("Delete Fail")
        }
        return messageHandler.ok("Delete Successed")
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