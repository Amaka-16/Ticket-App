const mongoose = require('mongoose');
const validator = require('validator');


const internationalSchema = new mongoose.Schema({
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


const International = mongoose.model("International", internationalSchema);

module.exports = International;



//this is a file for international flights, i will need to add the destination, date, return ticket option too. two way or one way ticket.