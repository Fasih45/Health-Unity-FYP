// models/doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  currentHospital: {
    name: {
      type: String,

    },
    startTime: {
      type: Date,
      
    },
    endTime: {
      type: Date,
      
    },
  },
  currentClinic: {
    name: {
      type: String,
      
    },
    startTime: {
      type: Date,
      
    },
    endTime: {
      type: Date,
      
    },
  },
});

const Doctor = mongoose.model('DoctorProfile', doctorSchema);

module.exports = Doctor;
