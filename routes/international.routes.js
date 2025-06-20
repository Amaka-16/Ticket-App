const express = require('express');
const InternationalController = require('../controller/international.controllers');
const Auth = require('../middleware/auth');
const router = express();

router.post("/createInternational", Auth.protect, InternationalController.createInternational);
router.get("/getAllInternational", Auth.protect, InternationalController.getAllInternational);
router.get("/getInternational/:id", Auth.protect, InternationalController.getInternationalDetails);
router.put("/updateInternational/:id", Auth.protect, InternationalController.updateInternational);
router.delete("/deleteInternational/:id", Auth.protect, InternationalController.deleteInternational);


module.exports = router;