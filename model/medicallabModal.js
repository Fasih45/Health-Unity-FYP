const mongoose = require('mongoose');

const medicalLabSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  labName: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  labLicense: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Example: FPHRA12345 (at least one digit after the alphabetic part)
        return /^FPHRA\d+$/i.test(value);
      },
      message: 'Medical Lab License must be in the format FPHRA12345',
    },
  },
  contactNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Example: +92 300 1234567 or 03001234567
        return /^(?:(\+92)|(0))?\d{10}$/.test(value);
      },
      message: 'Contact number must be a valid Pakistan phone number',
    },
  },
});

const PharmaceuticalLab = mongoose.model('MedicalLab', medicalLabSchema);

module.exports = PharmaceuticalLab;
