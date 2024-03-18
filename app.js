require("dotenv").config(); ///env
const express = require("express");
const connectDB = require("./connection/connectionstring");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const userAppointmentRoutes = require("./routes/userAppointment");
const profileRoutes = require("./routes/userProfileRoutes");
const patientTrustedListRoutes = require("./routes/PatientTrusedList");
const Prescription = require("./model/Prescription");
const patientPrescription = require("./routes/Prescription");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));

// Connect to MongoDB
connectDB();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});


const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const id = req.body.id;
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    const data = await Prescription.create({
      id: id,
      title: title,
      pdf: fileName,
    });
    res.status(201).send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.post("/get-files", async (req, res) => {
  try {
    
    const prescriptions = await Prescription.findOne({
      id: req.body.id,
      pdf: req.body.pdf,
    });
    if (!prescriptions) {
      res.status(404).send({ status: "not found" });
    }

    const filePath = path.join(__dirname, "files", prescriptions.pdf);
    res.status(200).sendFile(path.resolve(filePath));
  } catch (error) {
    res.status(400).send(error);
  }
});

// Routes
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.use("/", userAppointmentRoutes);
app.use("/list", patientTrustedListRoutes);
app.use("/patient", patientPrescription);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// ... rest of your server setup
