const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authenticateTokenPatient=require('../middleware/authMiddlewarepatient');
const authenticateTokenDocter=require('../middleware/authMiddlewareDocter');
// Route to handle appointment registration
router.post(
  "/appointments/register",
  appointmentController.registerAppointment
); 
router.post(
  "/appointments/registerCheck",
  appointmentController.registerAppointmentcheck
); 

router.post(
  "/appointments/registerTiming",
  appointmentController.registerAppointmentTime
);
router.get(
  "/appointments/patient/:username",authenticateTokenPatient,
  appointmentController.getPatientAppointments
); //get user from auth
router.get(
  "/appointments/doctor/:username",authenticateTokenDocter,
  appointmentController.getDoctorAppointments
); //get user from auth

module.exports = router;
