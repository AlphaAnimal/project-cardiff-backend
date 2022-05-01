const asyncHandler = require('express-async-handler')

const Score = require('../models/scoreModel')
const User = require('../models/userModel')

// @desc    Get scores
// @route   GET /api/scores
// @access  Public
const getScores = asyncHandler(async (req, res) => {
  const scores = await Score.find({ })

  res.status(200).json(scores)
})

// @desc    Set score
// @route   POST /api/scores
// @access  Public
const setScore = asyncHandler(async (req, res) => {
  if (!req.body.score || !req.body.type) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const score = await Score.create({
    user: req.body.user,
    type: req.body.type,
    score: req.body.score,
    theme: req.body.theme,
  })

  res.status(200).json(score)
})

// @desc    Update score
// @route   PUT /api/scores/:id
// @access  Private
const updateScore = asyncHandler(async (req, res) => {
  const score = await Score.findById(req.params.id)

  if (!score) {
    res.status(400)
    throw new Error('score not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the score user
  if (score.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')      
  }

  const updatedScore = await Score.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedScore)
})

// @desc    Delete score
// @route   DELETE /api/scores/:id
// @access  Private
const deleteScore = asyncHandler(async (req, res) => {
  const score = await Score.findById(req.params.id)

  if (!score) {
    res.status(400)
    throw new Error('score not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the score user
  if (score.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await score.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getScores,
  setScore,
  updateScore,
  deleteScore,
}