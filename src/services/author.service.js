const messageHandler = require('../handler/messageHandler')
const Authors = require('../models/author')
const cloudinary = require('../configs/cloudinary')

const getAll = async (filter) => {
    try{
        const authors = await Authors.find(filter)
        return messageHandler.ok(authors)
    }catch(e){
        return e.message
    }
}

const getById = async (id) => {
    try{
        const author = await Authors.findById(id)
        if(!author){
            return messageHandler.notFound("Author Not Found")
        }
        return messageHandler.ok(author)
    }catch(e){
        return e.message
    }
}

const create = async (_author, _image) => {
    try{
        if(!await Authors.doesntExist({name:_author.name})){
            return messageHandler.conflict("Author Already Exist")
        }
        if(_image){
            const image = await cloudinary.uploader.upload(_image[0].path, {upload_preset: 'author'})
            _author.image = image.secure_url
            _author.imagePID = image.public_id
        }
        const author = await Authors.create(_author)
        return messageHandler.ok(author)
    }catch(e){
        return e.message
    }
}

const update = async (id, _author, _image) => {
    try{
        var author = await Authors.findById(id)
        if(!author){
            return messageHandler.notFound("Author Not Found")
        }
        if(_image){
            if(author.imagePID){
                await cloudinary.uploader.destroy(author.imagePID)
            }
            const image = await cloudinary.uploader.upload(_image[0].path, {upload_preset: 'author'})
            author.image = image.secure_url
            author.imagePID = image.public_id
        }
        author.name = _author.name ? _author.name:author.name
        author.dob = _author.dob ? _author.dob:author.dob
        author.bio = _author.bio ? _author.bio:author.bio
        await author.save()
        return messageHandler.ok(author)
    }catch(e){
        return e.message
    }
}

const remove = async (id) => {
    try{
        const author = await Authors.findById({_id:id})
        if(!author){
            return messageHandler.notFound("Author Not Exist")
        }
        if(author.imagePID){
            await cloudinary.uploader.destroy(author.imagePID)
        }
        await author.remove()
        if(!await Authors.doesntExist({_id:id})){
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