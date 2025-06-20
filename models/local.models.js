const mongoose = require('mongoose');
const validator = require('validator');


const localSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    destination: {
        type: String,
        required: [true, 'Please put the destination']
    },
    eventDate: {
        type: Number
    },
     planeNumber: {
        type: Number,
        required: [true, "Please put in the number of the plane"]
    },
    seatNumber: {
        type: Number
    },
    eventTime: {
        type: Number,
        required: [true, 'Please put the time for departure']
    },
    ticketType: {
        type: String,
        enum: ["One-way", "Return"],
        required: [true, 'Please provide ticket type']
    },
    returnDate: {
        type: Number
    },
    status: {
        type: String,
        enum: ["Available", "Not-available", "Filled"]
    }
}, {timestamps: true});


const Local = mongoose.model("Local", localSchema);

module.exports = Local;


//this is a file for local flights, i will need to add the destination, date, return ticket option too. two way or one way ticket.