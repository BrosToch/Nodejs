const express = require('express')
const router = express.Router()

const borrowService = require('../../services/borrow.service')

router.get('/', async (req, res, next) => {
    const filter = req.body
    const result = await borrowService.getAll(filter)
    next(result)
})

router.get('/details', async (req, res, next) => {
    const filter = req.body
    const result = await borrowService.getAll(filter, true)
    next(result)
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const result = await borrowService.getById(id)
    next(result)
})

router.get('/:id/details', async (req, res, next) => {
    const id = req.params.id
    const result = await borrowService.getById(id, true)
    next(result)
})

router.post('/', async (req, res, next) => {
    const borrow = req.body
    const result = await borrowService.create(borrow)
    next(result)
})

router.patch('/:id', async (req, res, next) => {
    const id = req.params.id
    const borrow = req.body
    const result = await borrowService.update(id, borrow)
    next(result)
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const result = await borrowService.remove(id)
    next(result)
})

module.exports = router