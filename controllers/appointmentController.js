const Appointment = require("../model/Appointment");

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
    } = req.body;

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
    });

    // Save the appointment to the database
    await newAppointment.save();

    res.status(201).json({ message: "Appointment registered successfully.", Appointment: newAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPatientAppointments = async (req, res) => {
  try {
    const patientUsername  = req.params.username;

    // Retrieve appointments for the specified patient
    const appointments = await Appointment.find({ patientUsername });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to retrieve appointments for doctors
exports.getDoctorAppointments = async (req, res) => {
  try {
    const  doctorUsername  = req.params.username;

    // Retrieve appointments for the specified doctor
    const appointments = await Appointment.find({ doctorUsername });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
