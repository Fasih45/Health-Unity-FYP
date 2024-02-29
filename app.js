require("dotenv").config(); ///env
const express = require('express');
const connectDB = require('./connection/connectionstring'); 
const userRoutes = require('./routes/userRoutes');
const userAppointmentRoutes = require('./routes/userAppointment');
const profileRoutes=require('./routes/userProfileRoutes');
const patientTrustedListRoutes=require('./routes/PatientTrusedList');
const patientPrescription=require('./routes/Prescription');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;

// Connect to MongoDB
connectDB();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/',userAppointmentRoutes );
app.use('/list',patientTrustedListRoutes );
app.use('/patient',patientPrescription );

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);

    
   
});
// ... rest of your server setup
