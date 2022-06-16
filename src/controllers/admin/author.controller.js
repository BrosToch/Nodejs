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

router.post('/', async (req, res, next) => {
    var author = req.body
    const image = req.files['image']
    const result = await authorService.create(author, image)
    next(result)
})

router.patch('/:id', async (req, res, next) => {
    const {id} = req.params
    const author = req.body
    const image = req.files['image']
    const result = await authorService.update(id, author, image)
    next(result)
})

router.delete('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await authorService.remove(id)
    next(result)
})

module.exports = router