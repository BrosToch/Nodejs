const Languages = require('../models/language')
const messageHandler = require('../handler/messageHandler')

const getAll = async (filter) => {
    try{
        const language = await Languages.find(filter)
        return messageHandler.ok(language)
    }catch(e){
        return e.message
    }
}

const getById = async (id) => {
    try{
        const language = await Languages.findById(id)
        if(!language){
            return messageHandler.notFound("Language Not Found")
        }
        return messageHandler.ok(language)
    }catch(e){
        return e.message
    }
}

const create = async (_language) => {
    try{
        if(!await Languages.doesntExist({language:_language.language})){
            return messageHandler.conflict("Language Already Exist")
        }
        const language = await Languages.create(_language)
        return messageHandler.created(language)
    }catch(e){
        return e.message
    }
}

const update = async (id, _language) => {
    try{
        var language = await Languages.findById(id)
        if(!language){
            return messageHandler.notFound("Language Not Found")
        }
        language.language = _language.language ? _language.language:language.language
        await language.save()
        return messageHandler.ok(language)
    }catch(e){
        return e.message
    }
}

const remove = async (id) => {
    try{
        if(await Languages.doesntExist({_id:id})){
            return messageHandler.notFound("Language Not Found")
        }
        await Languages.deleteOne({_id:id})
        if(!await Languages.doesntExist({_id:id})){
            return messageHandler.conflict("Delete Fail")
        }
        return messageHandler.ok("Delete successed")
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