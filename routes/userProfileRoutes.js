// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/doctor/register',profileController.registerDoctorProfile );
router.get('/doctor/:username', profileController.getDoctorProfile);

module.exports = router;
