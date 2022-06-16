const express = require('express')
const languageService = require('../../services/language.service')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const filter = req.body
    const result = await languageService.getAll(filter)
    next(result)
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await languageService.getById(id)
    next(result)
})



module.exports = router