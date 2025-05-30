const mongoose = require('mongoose');
const validator = require('validator');


const ticketSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: [true, 'Please input the event']
    },
    eventDate: {
        date: Number
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
        enum: ["booked", "cancelled"] //change enum to available, non available or filled
    }
}, {timestamps: true});



const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;