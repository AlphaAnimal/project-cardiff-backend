const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
        type: String,
        required: [true, 'Please add a type value'],
      },
    score: {
      type: Number,
      required: [true, 'Please add a score value'],
    },
    theme: {
      type: Boolean,
      required: [true, 'Please add a theme value'],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Score', scoreSchema)