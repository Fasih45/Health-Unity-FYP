const mongoose = require('mongoose');

// Define the schema
const patientTrustedListSchema = new mongoose.Schema({
  patientUsername: {
    type: String,
    unique: true,
    required: true
  },
  trustedDoctors: {
    type: [String], // This defines an array of strings
    required: true
  }
});


const PatientTrustedList = mongoose.model('PatientTrustedList', patientTrustedListSchema);

module.exports = PatientTrustedList;
