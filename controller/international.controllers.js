const International = require('../models/international.models');


exports.createInternational = async (req, res, next) => {
    try{
        const {
            name,
            destination,
            eventDate,
            planeNumber,
            seatNumber,
            eventTime,
            ticketType,
            returnDate,
            status 
        } = req.body;

        // check if international ticket already exists
        const existingInternational = await International.findOne({ name, planeNumber });
        if (existingInternational) {
            return next (new Error('International ticket already exists!', 400));
        }

        // create a new international ticket 
        const international = new International({
            name,
            destination,
            eventDate,
            planeNumber,
            seatNumber,
            eventTime,
            ticketType,
            returnDate,
            status 
        });


        const saveInternational = await international.save();
        res.status(201).json({
            message: "International ticket created successfully",
            international: saveInternational
        });
        } catch(error) {
            res.status(500).json({ error: error.message})
        }
}

exports.getAllInternational = async (req, res, next) => {
    try{
        const international = await International.find().sort({ createdAt: -1});
        res.status(200).json({
            success: true,
            international
        });
    }   catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getInternationalDetails = async (req, res, next) => {
    try{
        const { id } = req.params;
        const international = await International.findById(id);


        // if international ticket does not exist on the database, we should throw an error
        if (!international) {
            return res.status(404).json({ error: "International ticket not found!"});
        }
        res.status(200).json({
            success: true,
            international
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateInternational = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedInternational = await International.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedInternational) {
            return res.status(404).json({ error: "International ticket not found"});
        }

        res.status(200).json({
            success: true,
            message: "International ticket updated successfully",
            international: updatedInternational
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteInternational = async (req, res, next) => {
    try{
        const { id } = req.params;

        const international = await International.findByIdAndDelete(id);

        if(!international) {
            return res.status(404).json({ error: "International ticket not found"});
        } res.status(200).json({
            success: true,
            message: "International ticket deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}