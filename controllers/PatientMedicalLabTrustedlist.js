const {
  PatientTrustedLab,
  MedicalLabPatient,
} = require("../model/PatientMedicalLabTrustedlist");
const Patient = require("../model/patientModal");
const Medicallabs = require("../model/medicallabModal");

async function getPatientByUsername(req, res) {
  try {
    let patientUsername = null;
    const { username } = req.params;
    patientUsername = username;
    const patient = await PatientTrustedLab.findOne({
      username: patientUsername,
    });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error getting patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getMedicalLabByUsername(req, res) {
  try {
    let medicalLabUsername = null;
    const { username } = req.params;
    medicalLabUsername = username;
    const medicalLab = await MedicalLabPatient.findOne({
      username: medicalLabUsername,
    });
    if (!medicalLab) {
      return res.status(404).json({ error: "Medical lab not found" });
    }
    res.status(200).json(medicalLab);
  } catch (error) {
    console.error("Error getting medical lab:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function addLabAndPatient(req, res) {
  try {
    let patientUsername = null;
    const { username, medicalLabUsername } = req.params;
    patientUsername = username;
    // Find the patient
    const patientProfile = await Patient.findOne({ username: patientUsername });
    const existinglab = await Medicallabs.findOne({
      username: medicalLabUsername,
    });
    if (!existinglab) {
      return res.status(400).json({ error: "Lab not found" });
    }

    let patient = await PatientTrustedLab.findOne({
      username: patientUsername,
    });
    if (!patient) {
      patient = new PatientTrustedLab({ username: patientUsername });
      await patient.save();
    }

    // Find the lab
    let lab = await MedicalLabPatient.findOne({ username: medicalLabUsername });
    if (!lab) {
      lab = new MedicalLabPatient({ username: medicalLabUsername });
      await lab.save();
    }
    // Check if the lab is already in the patient's trusted lab list
    if (!patient.trustedLabList.includes(medicalLabUsername)) {
      patient.trustedLabList.push(medicalLabUsername);
      await patient.save();
    }

    // Check if the patient is already in the lab's patient list
    const patientExistsInLab = lab.patientList.some(
      (patient) => patient.patientUsername === patientUsername
    );
    if (!patientExistsInLab) {
      lab.patientList.push({
        patientUsername,
        patientName: patientProfile.fullName,
      });
      await lab.save();
    }

    res.status(200).json({ message: "Lab and patient added successfully" });
  } catch (error) {
    console.error("Error adding lab and patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function removeLabFromPatient(req, res) {
  try {
    let patientUsername = null;
    const { username, medicalLabUsername } = req.params;
    patientUsername = username;
    // Find the patient
    const patient = await PatientTrustedLab.findOne({
      username: patientUsername,
    });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Remove the lab from the patient's trusted lab list
    const index = patient.trustedLabList.indexOf(medicalLabUsername);
    if (index !== -1) {
      patient.trustedLabList.splice(index, 1);
      await patient.save();
    } else {
      return res
        .status(404)
        .json({ error: "Lab not found in patient's trusted list" });
    }

    // Remove the patient from the lab's patient list
    const lab = await MedicalLabPatient.findOne({
      username: medicalLabUsername,
    });
    if (!lab) {
      return res.status(404).json({ error: "Medical Lab not found" });
    }
    const patientIndex = lab.patientList.findIndex(
      (patient) => patient.patientUsername === patientUsername
    );
    if (patientIndex !== -1) {
      lab.patientList.splice(patientIndex, 1);
      await lab.save();
    } else {
      return res
        .status(404)
        .json({ error: "Patient not found in lab's patient list" });
    }

    res.status(200).json({
      message:
        "Lab removed from patient's trusted list and patient removed from lab's patient list successfully",
    });
  } catch (error) {
    console.error("Error removing lab from patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  addLabAndPatient,
  getPatientByUsername,
  getMedicalLabByUsername,
  removeLabFromPatient,
};
