const asyncHandler = require('express-async-handler')

const Word = require('../models/wordModel')

//@desc Get words
//@route GET /api/words
//@access Private
const getWords = asyncHandler(async (req, res) => {
    const words = await Word.find()
    res.status(200).json(words)
})

//@desc Set words
//@route SET /api/words
//@access Private
const setWord = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field to the body')
    }

    const word = await Word.create({
        text: req.body.text
    }) 

    res.status(200).json(word)
})

//@desc Update words
//@route PUT /api/words/id
//@access Private
const updateWord = asyncHandler(async (req, res) => {

    const word = await Word.findById(req.params.id)

    if(!word){
        res.status(400)
        throw new Error('Word not found')
    }

    const updatedWord = await Word.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedWord)
})

//@desc Delete words
//@route DELETE /api/words:id
//@access Private 
const deleteWord = asyncHandler(async (req, res) => {

    const word = await Word.findById(req.params.id)

    if(!word){
        res.status(400)
        throw new Error('Word not found')
    }

    await word.remove()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getWords,
    setWord,
    updateWord,
    deleteWord,
}