const mongoose = require('mongoose');
const validator = require('validator');


const ticketSchema = new mongoose.Schema({
    ticketType: {
        type: String,
        enum: ["Airplane", "Train"]
    },
    eventTitle: {
        type: String,
        required: [true, 'Please input the event']
    },
    eventDate: {
        type: Number
    },
    venue: {
        type: String,
        required: [true, 'Please provide your venue']
    },
    seatNumber: {
        type: Number
    },
    ticketPrice: {
        type: Number
    },
    purchaseNumber: {
        type: Number
    },
    Status: {
        type: String,
        enum: ["Available", "Not-available", "Filled"] //change enum to available, non available or filled
    }
}, {timestamps: true});



const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;