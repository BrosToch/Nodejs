const express = require('express');
const router = express.Router();

const userService = require('../../services/user.service')

//get user by id
router.get('/:id', async (req, res) => {
    const id = req.params
    const result = await userService.findById(id)
    res.json(result)
})

//update user
router.post('/:id', async (req, res) => {
    const {id} = req.params
    const {username} = req.body
    const result = await userService.updateUser(id, {username})
    res.json(result)
})

//update password
router.post('/:id/password', async (req, res) => {
    const {id} = req.params
    const {currentPassword, newPassword} = req.body
    const result = await userService.updatePassword(id, {currentPassword, newPassword})
    res.json(result)
})




module.exports = router