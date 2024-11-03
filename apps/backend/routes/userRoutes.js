const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST route to add a new user
router.post('/add-user', async (req, res) => {
  try {
    console.log('Received request body:', req.body); // Add this line for debugging

    const { name, email, password } = req.body;
    
    // Validate that all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'email', 'password'],
        received: req.body 
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ 
      message: 'User created successfully', 
      user: newUser 
    });
  } catch (error) {
    console.error('Error creating user:', error); // Add this line for debugging
    res.status(500).json({ 
      message: 'Error creating user', 
      error: error.message 
    });
  }
});

module.exports = router;