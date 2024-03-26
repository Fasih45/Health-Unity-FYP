const Appointment = require("../model/Appointment");
const Patient = require("../model/patientModal");
const User = require("../model/userModel");
const DoctorProfile = require("../model/docterProfile");
const emailService = require("../services/emailservice");
// Function to get the next occurrence of a specific day of the week
const getNextDateForDay = (day) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const inputDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(); // Ensure the first letter is uppercase, the rest lowercase

  if (!daysOfWeek.includes(inputDay)) {
    throw new Error("Invalid day of the week. Please provide a valid day.");
  }

  const currentDayIndex = daysOfWeek.indexOf(inputDay);
  const todayIndex = today.getDay();

  let daysToAdd = currentDayIndex - todayIndex + 1; // Add 1 to move to the next week
  if (daysToAdd <= 0) {
    daysToAdd += 7; // Move to the next week
  }

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysToAdd);
  nextDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  return nextDate;
};
const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// Controller to handle appointment registration
exports.registerAppointment = async (req, res) => {
  let nextDate; // Declare nextDate outside the try block

  try {
    const {
      doctorName,
      doctorUsername,
      patientName,
      patientUsername,
      dayOfWeek,
      account,
    } = req.body;
    const patientProfile = await Patient.findOne({ username: patientUsername });
    const docterProfile = await DoctorProfile.findOne({ username: doctorUsername });


    if (!patientProfile.account) {
      patientProfile.account = account;
      await patientProfile.save();
    }
    const emailname = await User.findOne({ username: doctorUsername });

    if (!patientProfile) {
      return res.status(404).json({ error: "Patient profile not found" });
    }
    const age = calculateAge(patientProfile.dateOfBirth);

    // Validate dayOfWeek
    nextDate = getNextDateForDay(dayOfWeek);

    // Set the hours, minutes, seconds, and milliseconds to 0 AFTER setting the date
    nextDate.setHours(0, 0, 0, 0);

    // Check if the appointment already exists for the given date and doctor
    const existingAppointment = await Appointment.findOne({
      doctorUsername,
      patientUsername,
      date: nextDate,
    });

    if (existingAppointment) {
      return res.status(409).json({
        message: "Appointment already exists for this date and doctor.",
      });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      doctorName,
      doctorUsername,
      patientName,
      patientUsername,
      date: nextDate,
      age: age,
      fee:docterProfile.fee
    });

    // Save the appointment to the database
    await newAppointment.save();
    console.log(emailname.email);
    emailService.sendNotificationEmailtodoc(emailname.email);

    res.status(201).json({
      message: "Appointment registered successfully.",
      Appointment: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const ITEMS_PER_PAGE = 5;
exports.getPatientAppointments = async (req, res) => {
  try {
    const { name, status, page } = req.body;
    const patientUsername = req.params.username;
    let query = {};
    const parsedPage = +page || 1; // Convert page to a number or default to 1

    query.patientUsername = patientUsername;
    if (name) {
      const doctorNameRegex = new RegExp(name, "i");
      query.doctorName = doctorNameRegex;
    }

    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .sort({ createdAt: -1 })
      .skip((parsedPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .exec();

    const totalItems = appointments.length;

    res.status(200).json({
      appointments: appointments,
      currentPage: parsedPage,
      totalItems,
      itemsPerPage: ITEMS_PER_PAGE,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to retrieve appointments for doctors
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { name, status, page } = req.body;
    const doctorUsername = req.params.username;
    let query = {};
    const parsedPage = +page || 1; // Convert page to a number or default to 1

    query.doctorUsername = doctorUsername;
    if (name) {
      const patientNameRegex = new RegExp(name, "i");
      query.patientName = patientNameRegex;
    }

    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .sort({ createdAt: -1 })
      .skip((parsedPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .exec();

    const totalItems = appointments.length;

    res.status(200).json({
      appointments: appointments,
      currentPage: parsedPage,
      totalItems,
      itemsPerPage: ITEMS_PER_PAGE,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.registerAppointmentTime = async (req, res) => {
  try {
    const { _id, timing, status } = req.body;

    const existingAppointment = await Appointment.findById(_id);
    const emailname = await User.findOne({
      username: existingAppointment.patientUsername,
    });

    if (!existingAppointment) {
      return res.status(404).json({
        message: "Appointment not found!",
      });
    }
    existingAppointment.timing = timing;
    existingAppointment.status = status;
    await existingAppointment.save();
    emailService.sendNotificationEmailtopatient(emailname.email);

    res.status(201).json({
      message: "Appointment timing set successfully.",
      Appointment: existingAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.registerAppointmentcheck = async (req, res) => {
  let nextDate; // Declare nextDate outside the try block

  try {
    const {
      doctorName,
      doctorUsername,
      patientName,
      patientUsername,
      dayOfWeek,
    } = req.body;
    const patientProfile = await Patient.findOne({ username: patientUsername });

    if (!patientProfile) {
      return res.status(404).json({ error: "Patient profile not found" });
    }
    const age = calculateAge(patientProfile.dateOfBirth);

    // Validate dayOfWeek
    nextDate = getNextDateForDay(dayOfWeek);

    // Set the hours, minutes, seconds, and milliseconds to 0 AFTER setting the date
    nextDate.setHours(0, 0, 0, 0);

    // Check if the appointment already exists for the given date and doctor
    const existingAppointment = await Appointment.findOne({
      doctorUsername,
      patientUsername,
      date: nextDate,
    });

    if (existingAppointment) {
      return res.status(409).json({
        message: "Appointment already exists with this doctor in this week.",
      });
    }

    res.status(200).json({
      message: "Good to go",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.registerAppointmentTimeCheck = async (req, res) => {
  try {
    const { doctorUsername, dayOfWeek, timing } = req.body;

    // Check if the appointment already exists for the given date and doctor
    const existingAppointment = await Appointment.findOne({
      doctorUsername,
      date: dayOfWeek,
      timing: timing,
    });

    if (existingAppointment) {
      return res.status(409).json({
        message:
          "Appointment already exists for this date and time with doctor.",
      });
    }

    res.status(200).json({
      message: "Good to go",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
