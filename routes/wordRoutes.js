const express = require('express')

const router = express.Router()

const { getWords, setWord, updateWord, deleteAllWords  } = require('../controllers/wordControllers')

router.route('/').get(getWords).post(setWord).delete(deleteAllWords)
router.route('/:id').put(updateWord)


module.exports = router
