const express = require("express");
const router = express.Router();
const listController = require("../controllers/PatientTrustedListController");
const listControllerLab = require("../controllers/PatientMedicalLabTrustedlist");
const authenticateTokenPatient = require("../middleware/authMiddlewarepatient");
const authenticateTokenDocter = require("../middleware/authMiddlewareDocter");

// Route to add a doctor to the trusted list for a patient
router.post("/add-doctor/:username", listController.addDoctorToList);
router.post(
  "/add-lab/:username/:medicalLabUsername",
  listControllerLab.addLabAndPatient
);
router.post(
  "/remove-lab/:username/:medicalLabUsername",
  listControllerLab.removeLabFromPatient
);

// Route to remove a doctor from the trusted list for a patient
router.post("/remove-doctor/:username", listController.removeDoctorFromList);

// Route to get the list of trusted doctors for a patient
router.get(
  "/get-trusted-doctors/:username",
  authenticateTokenPatient,
  listController.getTrustedDoctorsList
);
router.get(
  "/get-trusted-medicalLab/:username",
  authenticateTokenPatient,
  listControllerLab.getPatientByUsername
);
router.get(
  "/get-trusted-patients/:username",
  
  listControllerLab.getMedicalLabByUsername
);

module.exports = router;
