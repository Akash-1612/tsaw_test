// models/Test.js
const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  questionsAttempted: {
    type: Number,
    required: true,
  },
  rightAnswers: {
    type: Number,
    required: true,
  },
  wrongAnswers: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Test', TestSchema);
