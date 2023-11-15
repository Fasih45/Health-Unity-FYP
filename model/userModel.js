const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    validate: {
      validator: function (value) {
        // Check if the password contains at least one special character
        return /[!@#$%^&*(),.?":{}|<>]/.test(value);
      },
      message: 'Password must contain at least one special character',
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  verificationNumber: {
    type: Number,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
