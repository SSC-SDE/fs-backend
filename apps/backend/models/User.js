const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['guest', 'premium'], // Define possible roles
      default: 'guest',          // Default to 'guest'
    },
    tokens: {
      normal: {
        type: Number,
        default: 3, // Default to 3 for guest users
      },
      premium: {
        type: Number,
        default: 1, // Default to 1 for guest users
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false, // Email is not verified by default
    },
  },
  {
    timestamps: true,
  }
);

// Hook to adjust tokens when email is verified
userSchema.methods.verifyEmail = async function () {
  this.isEmailVerified = true;

  // Add premium token for verified users
  if (this.role === 'guest') {
    this.tokens.normal = 3;
    this.tokens.premium = 1;
  }

  await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
