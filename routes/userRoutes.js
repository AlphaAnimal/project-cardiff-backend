const express = require('express')

const router = express.Router()

const {getUsers} = require('../controllers/userControllers')

router.get('/', getUsers)

router.post('/', (req, res) => {
    res.status(200).json({message: 'Post users'})
})

router.put('/:id', (req, res) => {
    res.status(200).json({message: `Update user ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
    res.status(200).json({message: `Delete user ${req.params.id}`})
})

module.exports = router
