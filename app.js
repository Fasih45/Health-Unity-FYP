require("dotenv").config(); ///env
const express = require('express');
const connectDB = require('./connection/connectionstring'); 
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

// Connect to MongoDB
connectDB();
app.use(express.json());
app.use(bodyParser.json());
// Routes
app.use('/users', userRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
   console.log(`tokken ${jwtSecret}`);
    
   
});
// ... rest of your server setup
