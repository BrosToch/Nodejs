const express = require('express')
const router = express.Router()

const userIdentityService = require('../../services/userIdentity.service')

router.get('/', async (req, res, next) => {
    const filter = req.body //option is for filter data and option must be key-value json
    const result = await userIdentityService.getAll(filter)
    next(result)
})

router.get('/details', async (req, res, next) => {
    const filter = req.body
    const result = await userIdentityService.getAll(filter, true)
    next(result)
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    const result = await userIdentityService.getById(id)
    next(result)
})

router.get('/:id/details', async (req, res, next) => {
    const {id} = req.params
    const result = await userIdentityService.getById(id, true)
    next(result)
})

router.post('/', async (req, res, next) => {
    const userIdentity = req.body
    const userAccID = userIdentity.userAccID //process of find user id. need to update when for user**
    const result = await userIdentityService.create(userAccID, userIdentity)
    next(result)
})

router.patch('/:id', async (req, res, next) => {
    const id = req.params.id
    const userIdentity = req.body
    const result = await userIdentityService.update(id, userIdentity)
    next(result)
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const result = await userIdentityService.remove(id)
    next(result)
})

module.exports = router