const Books = require('../models/book')
const messageHandler = require('../handler/messageHandler')
const cloudinary = require('../configs/cloudinary')

//find all books
const  getAll = async (filter, details = false) => {
    try{
        var books = undefined
        if(details){
            books = await Books.find(filter).populate('category').populate('author').populate('language')
        }else{
            books = await Books.find(filter)
        }
        return messageHandler.ok(books)
    }catch(e){
        return e.message
    }
}

//find by book by id
const getById = async (id, details = false) => {
    try{
        var book = undefined
        if(details){
            book = await Books.findById(id).populate('category').populate('author').populate('language')
        }else{
            book = await Books.findById(id)
        }
        if(!book){
            return messageHandler.notFound("Book Not Found")
        }
        return messageHandler.ok(book)
    }catch(e){
        return e.message
    }
}

//create books
const createBook = async (_book, _thumbnail, _file) => {
    try{
        if(_thumbnail || _file){
            _book = await upload(_book, _thumbnail, _file)
        }
        const book = await Books.create(_book)
        return messageHandler.ok(book)
    }catch(e){
        return e.message
    }
}

//update book info
const updateBook = async (id, _book, _thumbnail, _file) => {
    try{
        var book = await Books.findById(id)
        if(!book){
            return messageHandler.notFound("Book Not Found")
        }
        book.title = _book.title ? _book.title:book.title
        book.description = _book.description ? _book.description:book.description   
        book.category = _book.category ? _book.category:book.category
        book.author = _book.author ? _book.author:book.author
        book.language = _book.language ? _book.language:book.language
        book.publisher = _book.publisher ? _book.publisher:book.publisher
        book.publishedDate = _book.publishedDate ? _book.publishedDate:book.publishedDate
        book = await upload(book, _thumbnail, _file, true)
        await book.save()
        return messageHandler.ok(book)
    }catch(e){
        return e.message
    }
}

//delete book
const deleteBook = async (id) => {
    try{
        if(await Books.doesntExist({_id:id})){
            return messageHandler.notFound("Book Not Found")
        }
        const book = await Books.findById(id)
        if(book.bookThumbmnailPID){
            await cloudinary.uploader.destroy(book.bookThumbmnailPID)
        }
        if(book.bookFilePID){
            await cloudinary.uploader.destroy(book.bookFilePID)
        }
        await book.remove()
        if(!await Books.doesntExist({_id:id})){
            return messageHandler.conflict("Delete Fail")
        }
        return messageHandler.ok("Delete Successfull")
    }catch(e){
        return e.messag
    }
}

const upload = async (book, _thumbnail, _file, update) => {  // id update = true => it is updating and also in constrast
    try{
        if(_thumbnail){
            if(update && book.bookThumbmnailPID){
                await cloudinary.uploader.destroy(book.bookThumbmnailPID)
            }
            const thumbnail = await cloudinary.uploader.upload(_thumbnail[0].path, {upload_preset: 'book_thumbnail'})
            book.bookThumbmnail = thumbnail.secure_url
            book.bookThumbmnailPID = thumbnail.public_id
        } 
        if(_file){
            if(update && book.bookFilePID){
                await cloudinary.uploader.destroy(book.bookFilePID)
            }
            const file = await cloudinary.uploader.upload(_file[0].path, {upload_preset: 'book_pdf'})
            book.bookFile = file.secure_url
            book.bookFilePID = file.public_id
        }
        return book
    }catch(e){
        return e.messag
    }
}

module.exports = {
    getAll,
    getById,
    createBook,
    updateBook,
    deleteBook
}