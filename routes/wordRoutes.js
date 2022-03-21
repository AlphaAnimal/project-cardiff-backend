const express = require('express')

const router = express.Router()

const { getWords, setWord, updateWord, deleteWord  } = require('../controllers/wordControllers')

router.route('/').get(getWords).post(setWord)
router.route('/:id').put(updateWord).delete(deleteWord)


module.exports = router
