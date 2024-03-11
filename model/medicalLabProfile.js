const mongoose = require("mongoose");

const medicalLabProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  labName: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  address: {
    type: String,
    required: true,
  },
  workingdays: {
    type: [String], // This defines an array of strings
    required: true, // You can add other validation options as needed
  },
  personalInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MedicalLab",
  },
  test: [//test data
    {
        name: {
            type: String,
            required: true
        },
        cost: {
            type: String,
            required: true
        }
      
    }
]


});

const MedicalLabProfile = mongoose.model("MedicalLabProfile", medicalLabProfileSchema);

module.exports = MedicalLabProfile;
