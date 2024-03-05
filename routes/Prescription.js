const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/PrescriptionController');

// Create a new prescription
router.post('/prescriptions', prescriptionController.createPrescription);

// Get prescription by ID
router.get('/prescriptions/:id/:page', prescriptionController.getAllPrescriptions);

// Update prescription by ID using POST
router.post('/prescriptions/:id', prescriptionController.updatePrescription);

// Delete prescription by ID
router.delete('/prescriptions/:id', prescriptionController.deletePrescription);

module.exports = router;
