const Categories = require('../models/category')
const messageHandler = require('../handler/messageHandler')

const getAll = async (filter) => {
    try{
        const categories = await Categories.find(filter)
        return messageHandler.ok(categories)
    }catch(e){
        return e.message
    }
}

const getById = async (id) => {
    try{
        const category = await Categories.findById(id)
        if(!category){
            return messageHandler.notFound("Category Not Found")
        }
        return messageHandler.ok(category)
    }catch(e){
        return e.message
    }
}

const create = async (_category) => {
    try{
        if(!await Categories.doesntExist({category: _category.category})){
            return messageHandler.conflict("Category Already Exist")
        }
        const category = await Categories.create(_category)
        return messageHandler.created(category)
    }catch(e){
        return e.message
    }
}

const update = async (id, _category) => {
    try{
        var category = await Categories.findById(id)
        if(!category){
            return messageHandler.notFound("Category Not Exist")
        }
        category.category = _category.category ? _category.category:category.category
        category.description = _category.description ? _category.description:category.description
        await category.save()
        return messageHandler.ok(category)
    }catch(e){
        return e.message
    }
}

const remove = async (id) => {
    try{
        if(await Categories.doesntExist({_id:id})){
            return messageHandler.notFound("Category Not Exist")
        }
        await Categories.deleteOne({_id:id})
        if(await Categories.doesntExist({_id:id})){
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