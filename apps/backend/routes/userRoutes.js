const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const authenticateUser = require('../authenticateUser.js/authenticateUser');
const Query = require('../models/queryModel');

// Middleware to authenticate the user
const authenticateToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; // Assuming `user` contains `userId`
    next();
  });
};

// Get user profile
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, email, password, oldPassword } = req.body;

  try {
    console.log('User ID from token:', req.user.userId, 'User ID from params:', req.params.id);
    
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own profile' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Old password is incorrect' });

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user-queries', authenticateUser, async (req, res) => {
  const userId = req.userId;

  try {
    const queries = await Query.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ queries });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch queries", error: error.message });
  }
});

module.exports = router;
