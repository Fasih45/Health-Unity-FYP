// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/docter/register',profileController.registerDocterProfile );
router.get('/docter/:username', profileController.getDoctorProfile);

module.exports = router;
