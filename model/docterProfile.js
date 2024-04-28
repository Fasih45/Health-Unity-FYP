// models/doctor.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
  },
  fullName: {
    type: String,
    required: true,
    minlength: 4,
  },
  specialty: {
    type: String,
    required: true,
  },
  rating: {
    value: {
      type: Number, // Assuming rating value is a number
      default: 0, // Default rating value
    },
    outof: {
      type: Number, // Assuming rating outof is a number
      default: 0, // Default outof value
    },
  },
  bio: {
    type: String,
  },
  currentHospital: {
    type: String,
  },
  currentClinic: {
    type: String,
  },
  description: {
    type: String,
  },
  workingdays: {
    type: [String], // This defines an array of strings
    required: true, // You can add other validation options as needed
  },
  personalInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
});

const DoctorProfile = mongoose.model("DoctorProfile", profileSchema);

module.exports = DoctorProfile;
