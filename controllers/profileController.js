// controllers/doctorController.js
const DoctorProfile = require('../model/docterProfile');
const Doctor = require('../model/docterModal');

// Handle doctor profile registration
exports.registerDoctorProfile = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { username, specialty, bio, currentHospital, currentClinic, description, workingdays } = req.body;

    // Check if the doctor with the provided username exists
    const existingDoctor = await Doctor.findOne({ username });
    if (!existingDoctor) {
      return res.status(400).json({ error: 'Doctor not found' });
    }

    // Create a new doctor profile instance
    const newDoctorProfile = new DoctorProfile({
      username,
      specialty,
      bio,
      currentHospital,
      currentClinic,
      description,
      workingdays,
      personalInfo: existingDoctor._id, // Associate the doctor profile with the existing doctor
    });

    // Save the new doctor profile to the database
    const savedDoctorProfile = await newDoctorProfile.save();

    res.status(201).json(savedDoctorProfile);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function getDoctorProfile(req, res) {
  try {
    const { username } = req.params;
    const doctor = await DoctorProfile.findOne({ username });
    const checkdoctor = await Doctor.findOne({ username });
    if (!checkdoctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }



    res.status(200).json({doctorPersonalinfo:checkdoctor,docterMedicalinfo:doctor});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.getDoctorProfile = async (req, res) => {
  try {
    const username = req.params.username;

    // Find the doctor profile by username and populate the 'personalInfo' field with doctor details
    const doctorProfile = await DoctorProfile.findOne({ username }).populate('personalInfo');

    if (!doctorProfile) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    res.status(200).json(doctorProfile);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
