const Train = require('../models/train.models');


exports.createTrain = async (req, res, next) => {
    try{
        const {
            name,
            destination,
            eventDate,
            trainNumber,
            seatNumber,
            eventTime,
            ticketType,
            returnDate,
            status 
        } = req.body;

        // check if train ticket already exists
        const existingTrain= await Train.findOne({ name, trainNumber });
        if (existingTrain) {
            return next (new Error('Train ticket already exists!', 400));
        }

        // create a new train ticket 
        const train = new Train({
            name,
            destination,
            eventDate,
            trainNumber,
            seatNumber,
            eventTime,
            ticketType,
            returnDate,
            status 
        });


        const saveTrain = await train.save();
        res.status(201).json({
            message: "Train ticket created successfully",
            train: saveTrain
        });
        } catch(error) {
            res.status(500).json({ error: error.message})
        }
}

exports.getAllTrain = async (req, res, next) => {
    try{
        const train = await Train.find().sort({ createdAt: -1});
        res.status(200).json({
            success: true,
            train
        });
    }   catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTrainDetails = async (req, res, next) => {
    try{
        const { id } = req.params;
        const local = await Train.findById(id);


        // if train ticket does not exist on the database, we should throw an error
        if (!train) {
            return res.status(404).json({ error: "Train ticket not found!"});
        }
        res.status(200).json({
            success: true,
            train
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateTrain = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedTrain = await Train.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedTrain) {
            return res.status(404).json({ error: "Train ticket not found"});
        }

        res.status(200).json({
            success: true,
            message: "Train ticket updated successfully",
            train: updatedTrain
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteTrain = async (req, res, next) => {
    try{
        const { id } = req.params;

        const train = await Train.findByIdAndDelete(id);

        if(!train) {
            return res.status(404).json({ error: "Train ticket not found"});
        } res.status(200).json({
            success: true,
            message: "Train ticket deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}