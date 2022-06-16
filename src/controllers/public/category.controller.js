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



module.exports = router