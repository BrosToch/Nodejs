const express = require('express')
const router = express.Router()

const borrowService = require('../../services/borrow.service')

router.get('/', async (req, res, next) => {
    const filter = req.body
    const result = await borrowService.getAll(filter)
    next(result)
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const result = await borrowService.getById(id)
    next(result)
})



module.exports = router