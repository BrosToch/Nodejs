const express = require('express');
const router = express.Router();

const userService = require('../../services/user.service')

//get all users
router.get('/', async (req, res, next) => {
    const filter = req.body
    const result = await userService.getAll(filter) 
    next(result)
})

//get user by id
router.get('/:id', async (req, res, next) => {
    const id = req.params
    const result = await userService.getById(id)
    next(result)
})

//create user
router.post('/', async (req, res, next) => { //-------------------------------------------only admin can create
    const {email, username, password, role} = req?.body
    const param = req.body.email
    console.log(param);
    const result = await userService.createUser({email, username, password, role})
    next(result)
})

//update user
router.patch('/:id', async (req, res, next) => {
    const {id} = req.params
    const {username} = req.body
    const result = await userService.updateUser(id, {username})
    next(result)
})

//update role
router.patch('/:id/role', async (req, res, next) => {
    const {id} = req.params
    const {role} = req.body
    const result = await userService.updateRole(id, {role})
    next(result)
})

//update password
router.patch('/:id/password', async (req, res, next) => {
    const {id} = req.params
    const {currentPassword, newPassword} = req.body
    const result = await userService.updatePassword(id, {currentPassword, newPassword})
    next(result)
})

//delete user
router.delete('/:id', async(req, res, next) => {
    const {id} = req.params
    const result = await userService.removeUser(id)
    next(result)
})

module.exports = router