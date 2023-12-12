// routes/doctorRoutes.js
const express = require("express");
const router = express.Router();
const authenticateTokenPatient=require('../middleware/authMiddlewarepatient');
const profileController = require("../controllers/profileController");
const authenticateTokenDocter=require('../middleware/authMiddlewareDocter');
const authenticateTokenMedicallab=require('../middleware/authMiddlewareMedicallab');
const authenticateTokenPMedicallab=require('../middleware/authMiddlewarePharmacy');

router.post("/doctor/register", profileController.registerDoctorProfile); //get user from auth
router.get("/doctor/:username",authenticateTokenDocter,profileController.getDoctorProfileDocter); //get user from auth
router.get("/patient/:username",authenticateTokenPatient,profileController.getDoctorProfilePatient); //get user from auth
router.get(
  "/medical_labs/:username",authenticateTokenMedicallab,
  profileController.getDoctorProfileMedicallabs
); //get user from auth
router.get("/pharmacy/:username", authenticateTokenPMedicallab,profileController.getDoctorProfilePharmacy); //get user from auth
router.post("/doctorProfiles",authenticateTokenPatient, profileController.getDoctorProfiles); //get user from auth
router.get("/doctorProfile/:username", profileController.getDoctorProfile);
module.exports = router;
