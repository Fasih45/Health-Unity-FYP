// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/doctor/register',profileController.registerDoctorProfile );
router.get('/doctor/:username', profileController.getDoctorProfileDocter);
router.get('/patient/:username', profileController.getDoctorProfilePatient);
router.get('/medical_labs/:username', profileController.getDoctorProfileMedicallabs);
router.get('/pharmacy/:username', profileController.getDoctorProfilePharmacy);
router.post('/doctorProfiles', profileController.getDoctorProfiles);


module.exports = router;
