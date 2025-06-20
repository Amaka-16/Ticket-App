const express = require('express');
const TrainController = require('../controller/train.controllers');
const Auth = require('../middleware/auth');
const router = express();

router.post("/createTrain", Auth.protect, TrainController.createTrain);
router.get("/getAllTrain", Auth.protect, TrainController.getAllTrain);
router.get("/getTrain/:id", Auth.protect, TrainController.getTrainDetails);
router.put("/updateTrain/:id", Auth.protect, TrainController.updateTrain);
router.delete("/deleteTrain/:id", Auth.protect, TrainController.deleteTrain);


module.exports = router;