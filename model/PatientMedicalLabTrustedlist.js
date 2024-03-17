const mongoose = require("mongoose");

// Define schema for Patient
const patientSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  trustedLabList: [String],
});

// Define schema for Lab
const labSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  patientList: [
    {
      patientUsername: { type: String },
      patientName: { type: String },
    },
  ],
});

// Create models based on the schemas
const PatientTrustedLab = mongoose.model("PatientTrustedLab", patientSchema);
const MedicalLabPatient = mongoose.model("MedicalLabPatient", labSchema);

module.exports = { PatientTrustedLab, MedicalLabPatient };
