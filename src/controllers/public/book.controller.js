const express = require('express')
const router = express.Router()

const bookService = require('../../services/book.service') 

//get all books
router.get('/', async (req, res, next) => {
    const filter = req.body
    const result = await bookService.findAll(filter)
    next(result)
})

//get book by id
router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await bookService.findById(id)
    next(result)
})



module.exports = router