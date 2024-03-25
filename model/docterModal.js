const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
  },
  cnic: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{13}$/.test(value);
      },
      message: 'CNIC must be a 13-digit number',
    },
  },
  nationality: {
    type: String,
    required: true,
  },
  account: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  medicalLicenseNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^(MD\d+|\d+MD)$/.test(value);
      },
      message: 'Medical License Number must be in the format MD12345 or 12345MD',
    },
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
