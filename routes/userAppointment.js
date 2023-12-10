const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Route to handle appointment registration
router.post(
  "/appointments/register",
  appointmentController.registerAppointment
); //get patient user from auth
router.get(
  "/appointments/patient/:username",
  appointmentController.getPatientAppointments
); //get user from auth
router.get(
  "/appointments/doctor/:username",
  appointmentController.getDoctorAppointments
); //get user from auth

module.exports = router;
