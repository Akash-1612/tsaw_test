const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found. Please register.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials. Please try again.' });
    }


    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists. Please log in.' });
    }

    const user = new User({
      name,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    res.json({ message: 'Registration successful. Please log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
