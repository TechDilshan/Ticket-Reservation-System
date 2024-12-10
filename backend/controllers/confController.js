// controllers/ticketController.js
const confModel = require('../models/confModel');

const getTickets = (req, res) => {
    const tickets = confModel.getAllTickets();
    res.json(tickets);
};

const getTicket = (req, res) => {
    const ticketId = Number(req.params.id);
    const ticket = confModel.getTicketById(ticketId);
    
    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).send('Ticket not found');
    }
};

const createTicket = (req, res) => {
    const newTicket = req.body;
    confModel.createTicket(newTicket);
    res.status(201).json(newTicket);
};

const updateTicket = (req, res) => {
    const updatedTicket = req.body;
    const ticketId = Number(req.params.id);
    console.log('Updating ticket with ID:', ticketId);
    try {
        confModel.updateTicket(ticketId, updatedTicket);
        res.sendStatus(204);
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};


module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket
};