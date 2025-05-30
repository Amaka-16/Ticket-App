const express = require('express');
const TicketController = require('../controller/ticket.controllers');
const Auth = require('../middleware/auth');
const router = express();

router.post("/createTicket", Auth.protect, TicketController.createTicket);
router.get("/get-alltickets", Auth.protect, TicketController.getAllTickets);
router.get("/getticket/:id", Auth.protect, TicketController.getTicketDetails);
router.put("/updateTicket/:id", Auth.protect, TicketController.updateTicket);
router.delete("/deleteticket/:id", Auth.protect, TicketController.deleteTicket);


module.exports = router;