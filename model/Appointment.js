const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorUsername: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientUsername: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timing: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  age: String, // Patient's Age
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
