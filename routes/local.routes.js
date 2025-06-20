const express = require('express');
const LocalController = require('../controller/local.controllers');
const Auth = require('../middleware/auth');
const router = express();

router.post("/createLocal", Auth.protect, LocalController.createLocal);
router.get("/getAllLocal", Auth.protect, LocalController.getAllLocal);
router.get("/getLocal/:id", Auth.protect, LocalController.getLocalDetails);
router.put("/updateLocal/:id", Auth.protect, LocalController.updateLocal);
router.delete("/deleteLocal/:id", Auth.protect, LocalController.deleteLocal);


module.exports = router;