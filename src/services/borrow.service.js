const Borrows = require('../models/borrow')
const messageHandler = require('../handler/messageHandler')
const bookService = require('../services/book.service')
const bookUnitService = require('../services/bookUnit.service')
const userService = require('../services/user.service')
// const Books = require('../models/book')
// const BookUnits = require('../models/bookUnit')

const getAll = async (filter, details = false) => {
    try{
        var borrows = undefined
        if(details){
            borrows = await Borrows.find(filter).populate('userId').populate('bookUnit')
        }else{
            borrows = await Borrows.find(filter)
        }
        return messageHandler.ok(borrows)
    }catch(e){
        return e.message
    }
}

const getById = async (id, details = false) => {
    try{
        var borrow = undefined
        if(details){
            borrow = await Borrows.findById(id).populate('userId').populate('bookUnit')
        }else{
            borrow = await Borrows.findById(id)
        }
        if(!borrow){
            return messageHandler.notFound("Borrow Not Found")
        }
        return messageHandler.ok(borrow)
    }catch(e){
        return e.message
    }
}

const create = async (_borrow) => {
    try{
        //check user is true
        var user = await userService.getAll({username:_borrow.username})
        if(user.code != 200){
            return user
        }
        if(_borrow.book){
            //check book is true book id
            const book = await bookService.getById(_borrow.book)
            if(book.code != 200){
                return book
            }
            //if true randomly choose the above book unit for borrow
            book = await bookUnitService.getAll({bookRef: book.message._id, isPrimary:false, isBusy:false})
            book = book?.message[0]
            //if no book unit. it can not borrow
            if(!book){
                return messageHandler.conflict("Can not Borrow. This Book is not Available now")
            }
            _borrow.bookUnit = book._id
        }
        const borrow = await Borrows.create(_borrow)
        return messageHandler.created(borrow)
    }catch(e){
        return e.message
    }
}

const update = async (id, _borrow) => {
    try{
        const borrow = await Borrows.findById(id)
        if(!borrow){
            return messageHandler.notFound('Borrow Not Found')
        }
        if(_borrow.userId){
            const user = userService.getById(_borrow.userId)
            if(user.code != 200){
                return user
            }
            borrow.userId = _borrow.userId
        }
        if(_borrow.bookUnit){
            const bookUnit = bookService.getById(_borrow.bookUnit)
            if(bookUnit.code != 200){
                return bookUnit
            }
            borrow.bookUnit = _borrow.bookUnit
        }
        borrow.reason = _borrow.reason ? _borrow.reason:borrow.reason
        borrow.pickUpDate = _borrow.pickUpDate ? _borrow.pickUpDate:borrow.pickUpDate
        borrow.duration = _borrow.duration ? _borrow.duration:borrow.duration
        borrow.status = _borrow.status ? _borrow.status:borrow.status
        borrow.returnDate = _borrow.returnDate ? _borrow.returnDate:borrow.returnDate
        await borrow.save()
        return messageHandler.ok(borrow)
    }catch(e){
        return e.message
    }
}

const remove = async (id) => {
    try{
        if(await Borrows.doesntExist({_id:id})){
            return messageHandler.notFound("Borrow Not Found")
        }
        await Borrows.deleteOne({_id:id})
        if(await Borrows.doesntExist({_id:id})){
            return messageHandler.conflict("Delete Fail")
        }
        return messageHandler.ok("Delete Successful")
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