const Local = require('../models/local.models');


exports.createLocal = async (req, res, next) => {
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

        // check if local ticket already exists
        const existingLocal = await Local.findOne({ name, planeNumber });
        if (existingLocal) {
            return next (new Error('Local ticket already exists!', 400));
        }

        // create a new local ticket 
        const local = new Local({
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


        const saveLocal = await local.save();
        res.status(201).json({
            message: "Local ticket created successfully",
            local: saveLocal
        });
        } catch(error) {
            res.status(500).json({ error: error.message})
        }
}

exports.getAllLocal = async (req, res, next) => {
    try{
        const local = await Local.find().sort({ createdAt: -1});
        res.status(200).json({
            success: true,
            local
        });
    }   catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getLocalDetails = async (req, res, next) => {
    try{
        const { id } = req.params;
        const local = await Local.findById(id);


        // if local ticket does not exist on the database, we should throw an error
        if (!local) {
            return res.status(404).json({ error: "Local ticket not found!"});
        }
        res.status(200).json({
            success: true,
            local
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateLocal = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedLocal = await Local.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedLocal) {
            return res.status(404).json({ error: "Local ticket not found"});
        }

        res.status(200).json({
            success: true,
            message: "Local ticket updated successfully",
            local: updatedLocal
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteLocal = async (req, res, next) => {
    try{
        const { id } = req.params;

        const local = await Local.findByIdAndDelete(id);

        if(!local) {
            return res.status(404).json({ error: "Local ticket not found"});
        } res.status(200).json({
            success: true,
            message: "Local ticket deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}