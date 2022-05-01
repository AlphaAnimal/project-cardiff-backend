const express = require('express')
const router = express.Router()
const {
  getScores,
  setScore,
  updateScore,
  deleteScore,
} = require('../controllers/scoreControllers')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getScores).post(setScore)
router.route('/:id').delete(protect, deleteScore).put(protect, updateScore)

module.exports = router