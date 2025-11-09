const mongoose = require('mongoose');

// Define the schema for storing user queries and responses
const QuerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // References a user in your User collection
    required: true,
    ref: 'User', // Optional: reference the User model
  },
  userQuery: {
    type: String,
    required: true,
  },
  selectedOptions: {
    type: [String],
    required: true,
  },
  generatedResponse: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
const Query = mongoose.model('Query', QuerySchema);
module.exports = Query;
