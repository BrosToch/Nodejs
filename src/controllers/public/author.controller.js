const express = require('express')

const authorService = require('../../services/author.service')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const filer = req.body
    const result = await authorService.getAll(filer)
    next(result)
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await authorService.getById(id)
    next(result)
})



module.exports = router