const express = require('express')

const router = express.Router()

const eventService = require('../../services/event.service')


router.get('/',eventService.fetchAllEvent)
router.get('/:id',  eventService.fetchByID)
router.post('/' ,eventService.createEvent )
router.patch('/:id' ,eventService.updateEvent)
 router.delete('/:id', eventService.deleteEvent)

module.exports = router