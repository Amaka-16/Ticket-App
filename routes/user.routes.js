const express = require('express');
const UserController = require('../controller/user.controllers');
const router = express();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

module.exports = router;