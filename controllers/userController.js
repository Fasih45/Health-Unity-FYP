const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const Patient=require('../model/patientModal')
const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET_patient;
const emailService = require('../services/emailservice');
const registerUserasPatient = async (req, res) => {
  try {
    const { username, email, password, fullName, cnic, nationality, dateOfBirth } = req.body;

    console.log(req.body)
    // Validate unique username
    const existingUsername = await User.findOne({ username});
    const existingUseremail = await User.findOne({ email});
    const existingUsercnic = await Patient.findOne({ cnic});
    if (existingUsername) {
      return res.status(400).json({ error: 'Username is already taken' });
    }
    if (existingUseremail) {
        return res.status(400).json({ error: 'email is already taken' });
      }
    if (existingUsercnic) {
        return res.status(400).json({ error: 'cnic is already taken' });
      }
      

    // Validate password
    if (password.length < 4 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 4 characters long and contain at least one special character' });
    }

    // Validate fullName
    if (typeof fullName !== 'string' || fullName.length < 4) {
      return res.status(400).json({ error: 'Full name must be at least four characters long' });
    }

    // Validate cnic
    if (typeof cnic !== 'number' || cnic.toString().length !== 13) {
      return res.status(400).json({ error: 'CNIC must be a 13-digit number' });
    }

    // Validate nationality
    if (typeof nationality !== 'string' || !nationality.trim()) {
      return res.status(400).json({ error: 'Nationality must be a non-empty string' });
    }

    // Validate dateOfBirth
    const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateOfBirth.match(dateOfBirthRegex)) {
      return res.status(400).json({ error: 'Invalid date of birth format. Use YYYY-MM-DD' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword});
    const patient= new Patient({username,fullName, cnic, nationality, dateOfBirth })

    await user.save();
    await patient.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('User registration error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUserasPatient = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ username });
  
      // If the user is not found or the password is incorrect
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // If the user is logging in for the first time (isEmailVerified is false)
      if (!user.isEmailVerified) {
        // Generate and send a 6-digit verification code
        const verificationNumber = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationNumber = verificationNumber;
        await user.save();
  
        // Send verification email
        emailService.sendVerificationEmail(user.email, verificationNumber);
  
        return res.status(401).json({ error: 'Email not verified. Check your email for verification code.' });
      }
  
       // Create JWT token
    console.log(key);
    const token = jwt.sign({ username: user.username }, key, {
      expiresIn: "1h",
    });

    console.log(token);
  
      res.status(200).json({ message: 'Login successful. User is verified.',token:token });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const verifyCodeAndLoginasPatient = async (req, res) => {
    try {
      const { username, verificationNumber } = req.body;
  
      // Find the user by email and verification code
      const user = await User.findOne({ username, verificationNumber });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid verification code' });
      }
  
      // Update the isEmailVerified field
      user.isEmailVerified = true;
      await user.save();
  
        // Create JWT token
    console.log(key);
    const token = jwt.sign({ username: user.username }, key, {
      expiresIn: "1h",
    });

    console.log(token);
  
      res.status(200).json({ message: 'Login successful. User is verified.',token:token });
    } catch (error) {
      console.error('Verification error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = { registerUserasPatient,loginUserasPatient,verifyCodeAndLoginasPatient};
