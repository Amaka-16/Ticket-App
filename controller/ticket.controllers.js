const { trusted } = require('mongoose');
const Ticket = require('../models/ticket.models');


exports.createTicket = async (req,res, next) => {
    try{
    const {
        eventTitle,
        eventDate,
        venue,
        seatNumber,
        ticketPrice,
        purchaseNumber,
        Status
    } = req.body; 

    // check if ticket already exists
    const existingTicket = await Ticket.findOne({ eventTitle });
    if (existingTicket) {
        return next (new Error('Ticket already exists', 400));
    }

    // create a new ticket
    const ticket = new Ticket({
        eventTitle,
        eventDate,
        venue,
        seatNumber,
        ticketPrice,
        purchaseNumber,
        Status
    });
    
    const saveTicket = await ticket.save();
    res.status(201).json({
        message: "Ticket created successfully",
        ticket: saveTicket
    });
    }  catch(error) {
        res.status(500).json({ error: error.message})
    }
} 

exports.getAllTickets = async (req, res, next) => {
    try{
        const ticket = await Ticket.find().sort({ createdAt: -1});
        res.status(200).json({
            success: true,
            ticket
        });
    }  catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTicketDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);

        // if the ticket doesnot exist on the db, we should throw an error
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found"});
        }
        res.status(200).json({
            success: true,
            ticket
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateTicket = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found"});
        }

        res.status(200).json({
            success: true,
            message: "Ticket updated successfully",
            ticket: updatedTicket
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
},

exports.deleteTicket = async (req, res, next) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findByIdAndDelete(id);

        if(!ticket) {
            return res.status(404).json({ error: "Ticket Not Found"});
        } res.status(200).json({
            success: true,
            message: "Ticket Deleted Successfully"
        });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }  
}