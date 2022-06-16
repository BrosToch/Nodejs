const express = require('express')

const bookUnitService = require('../../services/bookUnit.service') 

const router = express.Router()

router.get('/', async (req, res, next) => {
    const filter = req.body
    const result = await bookUnitService.getAll(filter)
    next(result)
})

router.get('/details', async (req, res, next) => {
    const filter = req.body
    const result = await bookUnitService.getAll(filter, true)
    next(result)
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await bookUnitService.getById(id)
    next(result)
})

router.post('/', async (req, res, next) => {
    const bookUnit = req.body
    const result = await bookUnitService.create(bookUnit)
    next(result)
})

router.patch('/:id', async (req, res, next) => {
    const {id} = req.params
    const bookUnit = req.body
    const result = await bookUnitService.update(id, bookUnit)
    next(result)
})

router.delete('/:id', async (req, res, next) => {
    const {id} = req.id
    const result = await bookUnitService.remove(id)
    next(result)
})

module.exports = router