const PatientTrustedList = require("../model/PatientTrustedList");

async function addDoctorToList(req, res) {
  const { doctorName } = req.body;
  const { patientUsername } = req.params;

  try {
    let patientList = await PatientTrustedList.findOne({ patientUsername });

    if (!patientList) {
      patientList = new PatientTrustedList({
        patientUsername,
        trustedDoctors: [doctorName],
      });
    } else {
      if (patientList.trustedDoctors.includes(doctorName)) {
        return res
          .status(400)
          .json({ message: "Doctor already exists in the trusted list" });
      }
      patientList.trustedDoctors.push(doctorName);
    }

    await patientList.save();

    res
      .status(201)
      .json({ message: "Doctor added to the trusted list successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to remove a doctor's name from the list
async function removeDoctorFromList(req, res) {
  const { doctorName } = req.body;
  const { patientUsername } = req.params;

  try {
    const patientList = await PatientTrustedList.findOne({ patientUsername });

    if (!patientList) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const index = patientList.trustedDoctors.indexOf(doctorName);
    if (index !== -1) {
      patientList.trustedDoctors.splice(index, 1);
      await patientList.save();
      res.json({
        message: "Doctor removed from the trusted list successfully",
      });
    } else {
      res.status(404).json({ message: "Doctor not found in the trusted list" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getTrustedDoctorsList(req, res) {
  const { patientUsername } = req.params;

  try {
    const patientList = await PatientTrustedList.findOne({ patientUsername });

    if (!patientList) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ trustedDoctors: patientList.trustedDoctors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addDoctorToList,
  removeDoctorFromList,
  getTrustedDoctorsList,
};
