// controllers/doctorController.js
const DoctorProfile = require("../model/docterProfile");
const Doctor = require("../model/docterModal");
const Patient = require("../model/patientModal");
const Medicallabs = require("../model/medicallabModal");
const MedicalLabProfile = require("../model/medicalLabProfile");
const Pharmacy = require("../model/pharmacyModal");
const Appointment = require("../model/Appointment");

// Handle doctor profile registration
exports.registerDoctorProfile = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const {
      username,
      specialty,
      bio,
      currentHospital,
      currentClinic,
      description,
      workingdays,
      account,
      fee,
    } = req.body;

    // Check if the doctor with the provided username exists
    let existingDoctor = await Doctor.findOne({ username });
    if (!existingDoctor) {
      return res.status(400).json({ error: "Doctor not found" });
    }
    existingDoctor.account = account;
    await existingDoctor.save();
    // Create a new doctor profile instance
    const newDoctorProfile = new DoctorProfile({
      fullName: existingDoctor.fullName,
      username,
      specialty,
      bio,
      currentHospital,
      currentClinic,
      description,
      workingdays,
      fee,
      personalInfo: existingDoctor._id, // Associate the doctor profile with the existing doctor
    });

    // Save the new doctor profile to the database
    const savedDoctorProfile = await newDoctorProfile.save();

    res.status(201).json(savedDoctorProfile);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.editDoctorProfile = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const {
      username,
      specialty,
      bio,
      currentHospital,
      currentClinic,
      description,
      workingdays,
      fee,
    } = req.body;

    // Check if the doctor with the provided username exists
    let existingDoctor = await Doctor.findOne({ username });
    let existingDoctorProfile = await DoctorProfile.findOne({ username });
    if (!existingDoctor) {
      return res.status(400).json({ error: "Doctor not found" });
    }
    if (!existingDoctorProfile) {
      return res.status(400).json({ error: "Doctor not found" });
    }
    existingDoctorProfile.specialty=specialty;
    existingDoctorProfile.bio=bio;
    existingDoctorProfile.currentClinic=currentClinic;
    existingDoctorProfile.currentHospital=currentHospital;
    existingDoctorProfile.description=description;
    existingDoctorProfile.workingdays=workingdays
    existingDoctorProfile.fee=fee

     await existingDoctorProfile.save();

    res.status(201).json({message:"successfull"});
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.registerMedicalProfile = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { username, test, address, workingdays, account } = req.body;

    // Check if the doctor with the provided username exists
    const existinglab = await Medicallabs.findOne({ username });

    if (!existinglab) {
      return res.status(400).json({ error: "Lab not found" });
    }
    existinglab.account = account;
    await existinglab.save();
    // Create a new doctor profile instance
    const newlabProfile = new MedicalLabProfile({
      username,
      test,
      address,
      workingdays,
      personalInfo: existinglab._id,
      labName: existinglab.labName,
    });

    // Save the new doctor profile to the database
    const savedlabProfile = await newlabProfile.save();
    res.status(201).json(savedlabProfile);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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

    res
      .status(200)
      .json({ doctorPersonalinfo: checkdoctor, docterMedicalinfo: doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.getDoctorProfileDocter = async (req, res) => {
  try {
    const username = req.params.username;

    // Find the doctor profile by username and populate the 'personalInfo' field with doctor details
    const doctorProfile = await DoctorProfile.findOne({ username }).populate(
      "personalInfo"
    );

    if (!doctorProfile) {
      const checkdoctor = await Doctor.findOne({ username });
      if (!checkdoctor) {
        return res.status(404).json({ error: "Doctor  not found" });
      }
      return res
        .status(422)
        .json({ error: "Doctor profile not found", doctor: checkdoctor });
    }

    res.status(200).json(doctorProfile);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDoctorProfilePatient = async (req, res) => {
  try {
    const username = req.params.username;

    // Find the doctor profile by username and populate the 'personalInfo' field with doctor details
    const patientProfile = await Patient.findOne({ username });

    if (!patientProfile) {
      return res.status(404).json({ error: "Patient profile not found" });
    }

    res.status(200).json(patientProfile);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDoctorProfileMedicallabs = async (req, res) => {
  try {
    const username = req.params.username;

    // Find the doctor profile by username and populate the 'personalInfo' field with doctor details
    const medicalProfile = await MedicalLabProfile.findOne({
      username,
    }).populate("personalInfo");

    if (!medicalProfile) {
      const checklab = await Medicallabs.findOne({ username });
      if (!checklab) {
        return res.status(404).json({ error: "Lab  not found" });
      }
      return res
        .status(422)
        .json({ error: "Lab profile not found", lab: checklab });
    }

    res.status(200).json(medicalProfile);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDoctorProfilePharmacy = async (req, res) => {
  try {
    const username = req.params.username;

    // Find the doctor profile by username and populate the 'personalInfo' field with doctor details
    const medicalProfile = await Pharmacy.findOne({ username });

    if (!medicalProfile) {
      return res.status(404).json({ error: "medicallab profile not found" });
    }

    res.status(200).json(medicalProfile);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const ITEMS_PER_PAGE = 10;

exports.getDoctorProfiles = async (req, res, next) => {
  try {
    const { fullName, specialty, page } = req.body;

    const parsedPage = +page || 1; // Convert page to a number or default to 1
    const totalItems = await DoctorProfile.countDocuments();

    let query = {};

    // Check if the user sent a full name
    if (fullName) {
      const fullNameRegex = new RegExp(fullName, "i");
      query.fullName = fullNameRegex;
    }

    // Check if the user sent a specialty
    if (specialty) {
      query.specialty = specialty;
    }

    const doctorProfiles = await DoctorProfile.find(query)
      .skip((parsedPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .exec();

    res.status(200).json({
      profiles: doctorProfiles,
      currentPage: parsedPage,
      totalItems,
      itemsPerPage: ITEMS_PER_PAGE,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getLabProfiles = async (req, res, next) => {
  try {
    const { fullName, specialty, page } = req.body;

    const parsedPage = +page || 1; // Convert page to a number or default to 1
    const totalItems = await MedicalLabProfile.countDocuments();

    let query = {};

    // Check if the user sent a full name
    if (fullName) {
      const fullNameRegex = new RegExp(fullName, "i");
      query.labName = fullNameRegex;
    }

    // Check if the user sent a specialty
    if (specialty) {
      const fullNameRegex = new RegExp(specialty, "i");
      query["test.name"] = fullNameRegex;
    }

    const doctorProfiles = await MedicalLabProfile.find(query)
      .populate("personalInfo")
      .skip((parsedPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .exec();

    res.status(200).json({
      profiles: doctorProfiles,
      currentPage: parsedPage,
      totalItems,
      itemsPerPage: ITEMS_PER_PAGE,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getDoctorProfile = async (req, res, next) => {
  try {
    const username = req.params.username;

    // Find the doctor profile by username and populate the 'personalInfo' field with doctor details
    const doctorProfile = await DoctorProfile.findOne({ username });

    if (!doctorProfile) {
      const checkdoctor = await Doctor.findOne({ username });
      return res
        .status(404)
        .json({ error: "Doctor profile not found", doctor: checkdoctor });
    }

    res.status(200).json(doctorProfile);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateTestList = async (req, res) => {
  const { username } = req.params;
  const { test } = req.body;

  try {
    // Find the medical lab profile by username
    let labProfile = await MedicalLabProfile.findOne({ username }).populate(
      "personalInfo"
    );

    if (!labProfile) {
      return res.status(404).json({ message: "Medical lab profile not found" });
    }

    // Update the test list with the new data
    labProfile.test = test;

    // Save the updated medical lab profile
    await labProfile.save();

    res.status(200).json(labProfile);
  } catch (error) {
    console.error("Error updating test list:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.ratingset = async (req, res) => {
  const { _id, value } = req.body;

  try {
    const appointment = await Appointment.findById(_id);

    if (!appointment) {
      return res.status(404).json({ message: "No appointment found" });
    }

    if (appointment.rate) {
      return res.status(400).json({ message: "Appointment already rated" });
    }

    // Update the appointment rate to true
    appointment.rate = true;
    await appointment.save();

    const doctorProfile = await DoctorProfile.findOne({
      username: appointment.doctorUsername
    });

    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // Update doctor's rating
    doctorProfile.rating.outof++;
    doctorProfile.rating.value =
      (doctorProfile.rating.value * (doctorProfile.rating.outof - 1) +
        parseFloat(value)) /
      doctorProfile.rating.outof;
    await doctorProfile.save();

    res.status(200).json({ message: "Rating updated successfully" ,d:doctorProfile});
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ message: "Server error" });
  }
};
