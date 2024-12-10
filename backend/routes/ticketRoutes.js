// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/tickets', ticketController.getTickets);
router.get('/tickets/:id', ticketController.getTicket);
router.post('/createtickets', ticketController.createTicket);
router.put('/updatetickets/:id', ticketController.updateTicket);
router.delete('/deletetickets/:id', ticketController.deleteTicket);
router.get('/total-tickets', ticketController.getTotalTickets);

module.exports = router;