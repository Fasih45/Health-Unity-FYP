const mongoose = require("mongoose");

// Define the schema
const prescriptionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  writtenBydoctor: {
    type: String,
  },
  des: {
    type: String,
  },
  testbydoc: {
    type: [String],
  },
  date: {
    type: String,
  },
  pdf: {
    type: String, // Store the PDF data as a buffer
  },
  title: {
    type: String, // Store the PDF data as a buffer
  },
  predata: [
    {
      medcinename: {
        type: String,
      },
      doz: {
        type: String,
      },
      timing: {
        type: [String],
      },
    },
  ],
});

// Create a model using the schema
const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
