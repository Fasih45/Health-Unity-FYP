const mongoose = require('mongoose');

// Define the schema
const prescriptionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    writtenBydoctor: {
        type: String,
        required:true
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
    
    predata: [
        {
            medcinename: {
                type: String,
                required: true
            },
            doz: {
                type: String,
                required: true
            },
            timing: {
                type: [String],
                required: true
            }
        }
    ]
});

// Create a model using the schema
const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
