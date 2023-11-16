const express = require('express');
const router = express.Router();
const authenticateTokenPatient=require('../middleware/authMiddlewarepatient')
const authenticateTokenDocter=require('../middleware/authMiddlewareDocter')
const {registerUserasPatient, loginUserasPatient, verifyCodeAndLoginasPatient, registerUserasDoctor, loginUserasDocter, verifyCodeAndLoginasDocter} = require('../controllers/userController');

router.post('/patient/register', registerUserasPatient);
router.post('/patient/login', loginUserasPatient);
router.get('/patient/protected', authenticateTokenPatient, (req, res) => {
    res.json({ message: 'Access granted! This route requires a valid token.' });
  });
router.post('/patient/verify', verifyCodeAndLoginasPatient)

router.post('/docter/register', registerUserasDoctor);
router.post('/docter/login', loginUserasDocter);
router.post('/docter/verify', verifyCodeAndLoginasDocter)
router.get('/docter/protected', authenticateTokenDocter, (req, res) => {
  res.json({ message: 'Access granted! This route requires a valid token.' });
});

module.exports = router;
