const express = require('express')
const router = express.Router()

const categoryService = require('../../services/category.service')

router.get('/', async (req, res, next) => {
    const filter = req.body
    const result = await categoryService.getAll(filter)
    next(result)
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await categoryService.getById(id)
    next(result)
})

router.post('/', async (req, res, next) => {
    const category = req.body
    const result = await categoryService.create(category)
    next(result) 
})

router.patch('/:id', async (req, res, next) => {
    const {id} = req.params
    const category = req.body
    const result = await categoryService.update(id, category)
    next(result)
})

router.delete('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await categoryService.remove(id)
    next(result)
})

module.exports = router