// routes/doctorRoutes.js
const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/doctor/register", profileController.registerDoctorProfile); //get user from auth
router.get("/doctor/:username", profileController.getDoctorProfileDocter); //get user from auth
router.get("/patient/:username", profileController.getDoctorProfilePatient); //get user from auth
router.get(
  "/medical_labs/:username",
  profileController.getDoctorProfileMedicallabs
); //get user from auth
router.get("/pharmacy/:username", profileController.getDoctorProfilePharmacy); //get user from auth
router.post("/doctorProfiles", profileController.getDoctorProfiles); //get user from auth

module.exports = router;
