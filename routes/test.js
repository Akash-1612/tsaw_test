
const express = require('express');
const router = express.Router();
const Test = require('../models/Test');

// Store test results
router.post('/submit', async (req, res) => {
  try {
    const { questionsAttempted, rightAnswers, wrongAnswers, totalMarks } = req.body;


    if ( !questionsAttempted || !rightAnswers || !wrongAnswers || !totalMarks) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    // Save the test results to the database
    const test = new Test({
      questionsAttempted,
      rightAnswers,
      wrongAnswers,
      totalMarks,
    });

    await test.save();

    res.json({ message: "Test results stored successfully" });
  } catch (error) {
    console.error("Error storing test results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
