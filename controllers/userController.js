const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const Patient=require('../model/patientModal')
const MedicalLab=require('../model/medicallabModal')
const Doctor=require('../model/docterModal')
const Pharmacy=require('../model/pharmacyModal')

const jwt = require("jsonwebtoken");
const Patientkey = process.env.JWT_SECRET_patient;
const Docterkey = process.env.JWT_SECRET_docter;
const Medicalkey = process.env.JWT_SECRET_lab;
const Phamacykey = process.env.JWT_SECRET_Plab;


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
      const patient = await Patient.findOne({username})
      // If the user is not found or the password is incorrect
      if (!patient ||!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(404).json({ error: 'Invalid email or password' });
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
    console.log(Patientkey);
    const token = jwt.sign({ username: user.username }, Patientkey, {
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
      const patient = await Patient.findOne({ username});
      if (!user||!patient) {
        return res.status(404).json({ error: 'Invalid verification code' });
      }
  
      // Update the isEmailVerified field
      user.isEmailVerified = true;
      await user.save();
  
        // Create JWT token
    console.log(Patientkey);
    const token = jwt.sign({ username: user.username }, Patientkey, {
      expiresIn: "1h",
    });

    console.log(token);
  
      res.status(200).json({ message: 'Login successful. User is verified.',token:token });
    } catch (error) {
      console.error('Verification error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const registerUserasDoctor = async (req, res) => {
    try {
      const { username, email, password, fullName, cnic, nationality, dateOfBirth, medicalLicenseNumber } = req.body;
  
      // Validate unique username
      const existingUsername = await User.findOne({ username });
      const existingUseremail = await User.findOne({ email });
      const existingUsercnic = await Doctor.findOne({ cnic });
      const existingMedicallisence = await Doctor.findOne({ medicalLicenseNumber });
      
      if (existingUsername) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
      if (existingUseremail) {
        return res.status(400).json({ error: 'Email is already taken' });
      }
      if (existingUsercnic) {
        return res.status(400).json({ error: 'CNIC is already taken' });
      }
      if (existingMedicallisence) {
        return res.status(400).json({ error: 'Medicallisence is already Registered' });
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
  
  
      // Validate medicalLicenseNumber
      const medicalLicenseNumberRegex = /^(MD\d+|\d+MD)$/;
      if (!medicalLicenseNumber.match(medicalLicenseNumberRegex)) {
        return res.status(400).json({ error: 'Medical License Number must be in the format MD12345 or 12345MD' });
      }
  
      ///here to check in govermentdb 


      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new doctor

      const user = new User({ username, email, password: hashedPassword});
      const doctor = new Doctor({ username,fullName, cnic, nationality, dateOfBirth, medicalLicenseNumber });
      await doctor.save();
      await user.save();
  
      res.status(201).json({ message: 'Doctor registered successfully.' });
    } catch (error) {
      console.error('Doctor registration error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const loginUserasDocter = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ username });
      const docter = await Doctor.findOne({username})
      // If the user is not found or the password is incorrect
      if (!docter || !user || !(await bcrypt.compare(password, user.password))) {
        return res.status(404).json({ error: 'Invalid email or password' });
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
    console.log(Docterkey);
    const token = jwt.sign({ username: user.username }, Docterkey, {
      expiresIn: "1h",
    });

    console.log(token);
  
      res.status(200).json({ message: 'Login successful. User is verified.',token:token });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const verifyCodeAndLoginasDocter = async (req, res) => {
    try {
      const { username, verificationNumber } = req.body;
  
      // Find the user by email and verification code
      const user = await User.findOne({ username, verificationNumber });
      const docter = await Doctor.findOne({ username });
  
      if (!user||!docter) {
        return res.status(404).json({ error: 'Invalid verification code' });
      }
  
      // Update the isEmailVerified field
      user.isEmailVerified = true;
      await user.save();
  
        // Create JWT token
    console.log(Docterkey);
    const token = jwt.sign({ username: user.username }, Docterkey, {
      expiresIn: "1h",
    });

    console.log(token);
  
      res.status(200).json({ message: 'Login successful. User is verified.',token:token });
    } catch (error) {
      console.error('Verification error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const registerMedicalLab = async (req, res) => {
    try {
      const { username, email, password,labName, labLicense, contactNumber } = req.body;
      const existingUsername = await User.findOne({ username });
      const existingUseremail = await User.findOne({ email });
      
      if (existingUsername) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
      if (existingUseremail) {
        return res.status(400).json({ error: 'Email is already taken' });
      }
      if (password.length < 4 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 4 characters long and contain at least one special character' });
      }
  
      // Validate labName, labLicense, and contactNumber for Pharmaceutical Lab
      const existingLabName = await MedicalLab.findOne({ labName });
      const existingLabLicense = await MedicalLab.findOne({ labLicense });

      if (existingLabName) {
          return res.status(400).json({ error: 'Lab name is already registered' });
      }
      if(labName.length < 4) {
        return res.status(400).json({ error: 'Labname must be at least 4 characters long' });
      }
      if (existingLabLicense) {
          return res.status(400).json({ error: 'Lab license is already registered' });
      }

      const medicalLicenseNumberRegex = /^(FPHRA\d+|\d+FPHRA)$/;
      if (!labLicense.match(medicalLicenseNumberRegex)) {
        return res.status(400).json({ error: 'Medical License Number must be in the format FPHRA12345 or 12345FPHRA' });
      }

      // Contact number validation for Pakistan
      const contactNumberRegex = /^(?:(\+92)|(0))?\d{10}$/;
      if (!contactNumber.match(contactNumberRegex)) {
          return res.status(400).json({ error: 'Contact number must be a valid Pakistan phone number' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new Pharmaceutical Lab
      const user = new User({ username, email, password: hashedPassword})
      const Lab = new MedicalLab({ username,labName, labLicense, contactNumber });
      await Lab.save();
      await user.save();

      res.status(201).json({ message: 'Pharmaceutical Lab registered successfully.' });
  } catch (error) {
      console.error('Lab registration error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }


    };


  const loginUserasMedicallab = async (req, res) => {
      try {
        const { username, password } = req.body;
    
        // Find the user by email
        const user = await User.findOne({ username });
        const medicallab = await MedicalLab.findOne({username})
        // If the user is not found or the password is incorrect
        if (!medicallab || !user || !(await bcrypt.compare(password, user.password))) {
          return res.status(404).json({ error: 'Invalid email or password' });
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
      console.log(Medicalkey);
      const token = jwt.sign({ username: user.username }, Medicalkey, {
        expiresIn: "1h",
      });
  
      console.log(token);
    
        res.status(200).json({ message: 'Login successful. User is verified.',token:token });
      } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };  
    
  const verifyCodeAndLoginasMedicallab = async (req, res) => {
      try {
        const { username, verificationNumber } = req.body;
    
        // Find the user by email and verification code
        const user = await User.findOne({ username, verificationNumber });
        const medicallab  = await MedicalLab.findOne({ username });
    
        if (!user||!medicallab ) {
          return res.status(404).json({ error: 'Invalid verification code' });
        }
    
        // Update the isEmailVerified field
        user.isEmailVerified = true;
        await user.save();
    
          // Create JWT token
      console.log(Medicalkey);
      const token = jwt.sign({ username: user.username }, Medicalkey, {
        expiresIn: "1h",
      });
  
      console.log(token);
    
        res.status(200).json({ message: 'Login successful. User is verified.',token:token });
      } catch (error) {
        console.error('Verification error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

    const registerPharmacy = async (req, res) => {
      try {
        const { username, email, password,labName, labLicense, contactNumber } = req.body;
        const existingUsername = await User.findOne({ username });
        const existingUseremail = await User.findOne({ email });
        
        if (existingUsername) {
          return res.status(400).json({ error: 'Username is already taken' });
        }
        if (existingUseremail) {
          return res.status(400).json({ error: 'Email is already taken' });
        }
        if (password.length < 4 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          return res.status(400).json({ error: 'Password must be at least 4 characters long and contain at least one special character' });
        }
    
        // Validate labName, labLicense, and contactNumber for Pharmaceutical Lab
        const existingLabName = await Pharmacy.findOne({ labName });
        const existingLabLicense = await Pharmacy.findOne({ labLicense });
  
        if (existingLabName) {
            return res.status(400).json({ error: 'Lab name is already registered' });
        }
        if(labName.length < 4) {
          return res.status(400).json({ error: 'Labname must be at least 4 characters long' });
        }
        if (existingLabLicense) {
            return res.status(400).json({ error: 'Lab license is already registered' });
        }
  
        const medicalLicenseNumberRegex = /^(FPHRA\d+|\d+FPHRA)$/;
        if (!labLicense.match(medicalLicenseNumberRegex)) {
          return res.status(400).json({ error: 'Medical License Number must be in the format FPHRA12345 or 12345FPHRA' });
        }
  
        // Contact number validation for Pakistan
        const contactNumberRegex = /^(?:(\+92)|(0))?\d{10}$/;
        if (!contactNumber.match(contactNumberRegex)) {
            return res.status(400).json({ error: 'Contact number must be a valid Pakistan phone number' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new Pharmaceutical Lab
        const user = new User({ username, email, password: hashedPassword})
        const Lab = new Pharmacy({ username,labName, labLicense, contactNumber });
        await Lab.save();
        await user.save();
  
        res.status(201).json({ message: 'Pharmaceutical Lab registered successfully.' });
    } catch (error) {
        console.error('Lab registration error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
  
      };
  
  
    const loginUserasPharmacy = async (req, res) => {
        try {
          const { username, password } = req.body;
      
          // Find the user by email
          const user = await User.findOne({ username });
          const medicallab = await Pharmacy.findOne({username})
          // If the user is not found or the password is incorrect
          if (!medicallab || !user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({ error: 'Invalid email or password' });
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
        console.log(Phamacykey);
        const token = jwt.sign({ username: user.username }, Phamacykey, {
          expiresIn: "1h",
        });
    
        console.log(token);
      
          res.status(200).json({ message: 'Login successful. User is verified.',token:token ,
          username:user.username});
        } catch (error) {
          console.error('Login error:', error.message);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };  
      
    const verifyCodeAndLoginasPhamacy = async (req, res) => {
        try {
          const { username, verificationNumber } = req.body;
      
          // Find the user by email and verification code
          const user = await User.findOne({ username, verificationNumber });
          const medicallab  = await Pharmacy.findOne({ username });
      
          if (!user||!medicallab ) {
            return res.status(404).json({ error: 'Invalid verification code' });
          }
      
          // Update the isEmailVerified field
          user.isEmailVerified = true;
          await user.save();
      
            // Create JWT token
        console.log(Phamacykey);
        const token = jwt.sign({ username: user.username }, Phamacykey, {
          expiresIn: "1h",
        });
    
        console.log(token);
          res.status(200).json({ message: 'Login successful. User is verified.',token:token,
          username:user.username });
        } catch (error) {
          console.error('Verification error:', error.message);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
module.exports = { registerUserasPatient,loginUserasPatient,verifyCodeAndLoginasPatient
  ,registerUserasDoctor,loginUserasDocter,verifyCodeAndLoginasDocter,registerMedicalLab
  ,loginUserasMedicallab,verifyCodeAndLoginasMedicallab,registerPharmacy,loginUserasPharmacy
,verifyCodeAndLoginasPhamacy};
