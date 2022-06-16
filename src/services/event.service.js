const Event = require('../models/event')
const cloudinary = require('../configs/cloudinary')
const messageHandler = require('../handler/messageHandler')

module.exports = class Event_API {
  //Fetch all event
  static async fetchAllEvent(req, res, next) {
    try {
      const filter = req.body
      const events = await Event.find(filter)
      next(messageHandler.ok(events))
    } catch (error) {
      next(e.message)
    }
  }

  //fetch event by id 
  static async fetchByID(req, res, next) {
    try {
      const id = req.params.id;
      const event = await Event.findById(id)
      if(!event){
        next(messageHandler.notFound("Event Not Found"))
      }
      next(messageHandler.ok(event))
    } catch (error) {
      next(error.message)
    }

  }

  //create a event
  static async createEvent(req, res, next) {
    try {
      const _event = req.body
      const _image = req.files['image']
      if(_image){
        const image = await cloudinary.uploader.upload(_image[0].path, {upload_preset: 'event'})
        _event.image = image.secure_url
        _event.imagePID = image.public_id
      }
      var event = await Event.create(_event)
      next(messageHandler.ok(event))
    } catch (error) {
      next(error.message)
    }
  }
  
  //update event
  static async updateEvent(req, res, next) {
    try {
      const {id} = req.params
      const _event = req.body
      const _image = req.files['image']
      
      var event = await Event.findById(id)
      if(!event){
        next(messageHandler.notFound("Event Not Found"))
      }
      if(_image){
        if(event.imagePID){
          await cloudinary.uploader.destroy(event.imagePID)
        }
        const image = await cloudinary.uploader.upload(_image[0].path, {upload_preset: 'event'})
        event.image = image.secure_url
        event.imagePID = image.public_id
      }
      event.description = _event.description ? _event.description:event.description
      event.title = _event.title ? _event.title:event.title
      await event.save()
      next(messageHandler.ok(event))
    } catch (err) {
      next(err.message)
    }
  }

  //deleted post 
  static async deleteEvent(req, res, next) {
    try {
      // Find user by id
      let event = await Event.findById(req.params.id);
      if(!event){
        next(messageHandler.notFound("Event Not Found"))
      }
      // Delete image from cloudinary
      if(event.imagePID){
        await cloudinary.uploader.destroy(event.imagePID);
      }
      // Delete user from db
      await event.remove()
      if(!await Event.doesntExist({_id:req.params.id})){
        next(messageHandler.conflict("Delete Fail"))
      }
      next(messageHandler.ok("Delete Success"))
    } catch (err) {
      console.log(err);
    }
  }
}