// controllers/doctorController.js
const DoctorProfile = require("../model/docterProfile");
const Doctor = require("../model/docterModal");
async function registerDocterProfile(req, res) {
  try {
    const { username, specialty, bio, currentHospital, currentClinic } =
      req.body;
    const checkdoctor = await Doctor.findOne({ username });
    if (!checkdoctor)
      return res
        .status(404)
        .json({ message: "no registered docter found with this username" });

    const doctor = new DoctorProfile({
      username,
      specialty,
      bio,
      currentHospital,
      currentClinic,
    });

    await doctor.save();
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDoctorProfile(req, res) {
  try {
    const { username } = req.params;
    const doctor = await DoctorProfile.findOne({ username });
    const checkdoctor = await Doctor.findOne({ username });
    if (!checkdoctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }


    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }


    res.status(200).json({doctorPersonalinfo:checkdoctor,docterMedicalinfo:doctor});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { registerDocterProfile ,getDoctorProfile};
