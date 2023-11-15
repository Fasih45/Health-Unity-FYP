
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  fullName: {
    type: String,
    required: true,
    minlength: 4,
    validate: {
        validator: function (value) {
          // Check if the full name contains only alphabetic characters
          return /^[a-zA-Z\s]+$/.test(value);
        },
        message: 'Full name must contain only alphabetic characters',
      },
  },
  cnic: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Check if the CNIC is a number and has a length of at least 13
        return /^\d{13}$/.test(value);
      },
      message: 'CNIC must be a number and have a length of at least 13',
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
