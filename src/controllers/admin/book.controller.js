const express = require('express')
const router = express.Router()

const bookService = require('../../services/book.service') 

//get all books
router.get('/', async (req, res, next) => {
    const filter = req.body
    const result = await bookService.getAll(filter)
    next(result)
})

router.get('/details', async (req, res, next) => {
    const filter = req.body
    const result = await bookService.getAll(filter, true)
    next(result)
})

//get book by id
router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await bookService.getById(id)
    next(result)
})

router.get('/:id/details', async (req, res, next) => {
    const {id} = req.params
    const result = await bookService.getById(id, true)
    next(result)
})

//create book
router.post('/', async (req, res, next) => {
    const book = req.body
    const thumbnail = req.files['bookThumbnail']
    const file = req.files['bookFile']
    const result = await bookService.createBook(book, thumbnail, file)
    next(result)
})
//update book
router.patch('/:id', async (req, res, next) => {
    const {id} = req.params
    const book = req.body
    const thumbnail = req.files['bookThumbnail']
    const file = req.files['bookFile']
    const result = await bookService.updateBook(id, book, thumbnail, file)
    next(result)
})

//delete book
router.delete('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await bookService.deleteBook(id)
    next(result)
})


module.exports = router