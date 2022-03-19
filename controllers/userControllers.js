const asyncHandler = require('express-async-handler')

const Word = require('../models/wordModel')

//@desc Get users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
    const words = await Word.find()
    res.status(200).json(words)
})

//@desc Set users
//@route SET /api/users
//@access Private
const setUser = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field to the body')
    }

    const word = await Word.create({
        text: req.body.text
    }) 

    res.status(200).json(word)
})

//@desc Update users
//@route PUT /api/users/id
//@access Private
const updateUser = asyncHandler(async (req, res) => {

    const word = await Word.findById(req.params.id)

    if(!word){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedWord = await Word.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedWord)
})

//@desc Delete users
//@route DELETE /api/users:id
//@access Private 
const deleteUser = asyncHandler(async (req, res) => {

    const word = await Word.findById(req.params.id)

    if(!word){
        res.status(400)
        throw new Error('Goal not found')
    }

    await word.remove()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getUsers,
    setUser,
    updateUser,
    deleteUser,
}