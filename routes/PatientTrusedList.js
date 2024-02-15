const express = require('express');
const router = express.Router();
const listController = require("../controllers/PatientTrustedListController");
const authenticateTokenPatient = require("../middleware/authMiddlewarepatient");
const authenticateTokenDocter = require("../middleware/authMiddlewareDocter");

// Route to add a doctor to the trusted list for a patient
router.post('/add-doctor/:patientUsername', listController.addDoctorToList);

// Route to remove a doctor from the trusted list for a patient
router.post('/remove-doctor/:patientUsername',listController.removeDoctorFromList);

// Route to get the list of trusted doctors for a patient
router.get('/get-trusted-doctors/:patientUsername',listController.getTrustedDoctorsList);

module.exports = router;
