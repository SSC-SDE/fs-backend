const mongoose = require('mongoose');
const User = require('../models/User');

// MongoDB Connection String
const MONGO_URI = "mongodb://localhost:27017/FS"

const synchronizeExistingRecords = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB.');

    // Synchronize records
    const users = await User.find({}); // Fetch all users

    // Loop through each user and update fields if missing
    for (const user of users) {
      // Set default role if not defined
      if (!user.role) {
        user.role = 'guest';
      }

      // Set default tokens if not defined
      if (!user.tokens || typeof user.tokens !== 'object') {
        user.tokens = { normal: 3, premium: 1 };
      }

      // Set default email verification status
      if (user.isEmailVerified === undefined) {
        user.isEmailVerified = false;
      }

      // Save the updated user
      await user.save();
      console.log(`Synchronized user: ${user.email}`);
    }

    console.log('All records synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing records:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Run the script
synchronizeExistingRecords();
