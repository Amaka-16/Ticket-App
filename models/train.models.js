const mongoose = require('mongoose');
const validator = require('validator');


const trainSchema = new mongoose.Schema({
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
     trainNumber: {
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


const Train = mongoose.model("Train", trainSchema);

module.exports = Train;


//i need to add detination, time, date, seat number, two way or one way