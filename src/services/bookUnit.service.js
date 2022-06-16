const BookUnits = require('../models/bookUnit')
const messageHandler = require('../handler/messageHandler')
const { generate, validate } = require('isbn-util')
const bookService = require('./book.service')

const getAll = async (filter, details = false) => {
    try{
        var bookUnits = undefined
        if(details){
            bookUnits = await BookUnits.find(filter).populate('bookRef').populate('location')
        }else {
            bookUnits = await BookUnits.find(filter)
        }
        return messageHandler.ok(bookUnits)
    }catch(e){
        return e.message
    }
}

const getById = async (id, details) => {
    try{
        var bookUnit = undefined
        if(details){
            bookUnit = await BookUnits.findById(id).populate('bookRef').populate('location')
        }else{
            bookUnit = await BookUnits.findById(id)
        }
        if(!bookUnit){
            return messageHandler.notFound("Book Not Found")
        }
        return messageHandler.ok(bookUnit)
    }catch(e){
        return e.message
    }
}

const create = async (_bookUnit) => {
    try{
        const isbn = generate('13') //generate the isbn for use but in real case maybe isbn is already come with the book
        _bookUnit.isbn = isbn
        const bookUnit = await BookUnits.create(_bookUnit)
        return messageHandler.ok(bookUnit)
    }catch(e){
        return e.message
    }
}

const update = async (id, _bookUnit) => {
    try{
        var bookUnit = BookUnits.findById(id)
        if(!bookUnit){
            return messageHandler.notFound("Book Unit Not Found")
        }
        bookUnit.isPrimary = _bookUnit.isPrimary ? _bookUnit.isPrimary:bookUnit.isPrimary
        bookUnit.condition = _bookUnit.condition ? _bookUnit.condition:bookUnit.condition
        bookUnit.bookRef = _bookUnit.bookRef ? _bookUnit.bookRef:bookUnit.bookRef
        bookUnit.location = _bookUnit.location ? _bookUnit.location:bookUnit.location
        bookUnit.isBusy = _bookUnit.isBusy ? _bookUnit.isBusy:bookUnit.isBusy
        await bookUnit.save()
        return messageHandler.ok(bookUnit)
    }catch(e){
        return e.message
    }
}

const remove = async (id) => {
    try{    
        if(await BookUnits.doesntExist({_id:id})){
            return messageHandler.notFound("Book Unit Not Found")
        }
        await BookUnits.deleteOne({_id:id})
        if(await BookUnits.doesntExist({_id:id})){
            return messageHandler.notFound("Delete Fail")
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