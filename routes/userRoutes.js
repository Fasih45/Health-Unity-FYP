const express = require('express');
const router = express.Router();
const authenticateToken=require('../middleware/authMiddlewarepatient')
const {registerUserasPatient, loginUserasPatient, verifyCodeAndLoginasPatient} = require('../controllers/userController');

router.post('/register', registerUserasPatient);
router.post('/login', loginUserasPatient);

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted! This route requires a valid token.' });
  });
  router.post('/verify', verifyCodeAndLoginasPatient)
    

module.exports = router;
