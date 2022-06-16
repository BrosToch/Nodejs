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

router.post('/', async (req, res, next) => {
    const language = req.body
    const result = await languageService.create(language)
    next(result)
})

router.patch('/:id', async (req, res, next) => {
    const language = req.body
    const {id} = req.params
    const result = await languageService.update(id, language)
    next(result)
})

router.delete('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await languageService.remove(id)
    next(result)
})

module.exports = router