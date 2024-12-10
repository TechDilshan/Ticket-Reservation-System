// controllers/ticketController.js
const ticketModel = require('../models/ticketModel');

const getTickets = (req, res) => {
    const tickets = ticketModel.getAllTickets();
    res.json(tickets);
};

const getTicket = (req, res) => {
    const ticketId = Number(req.params.id);
    const ticket = ticketModel.getTicketById(ticketId);
    
    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).send('Ticket not found');
    }
};

const createTicket = (req, res) => {
    const newTicket = req.body;
    ticketModel.createTicket(newTicket);
    res.status(201).json(newTicket);
};

const updateTicket = (req, res) => {
    const updatedTicket = req.body;
    const ticketId = Number(req.params.id);
    console.log('Updating ticket with ID:', ticketId);
    try {
        ticketModel.updateTicket(ticketId, updatedTicket);
        res.sendStatus(204);
    } catch (error) {
        if (error.message.includes('not found')) {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};

const deleteTicket = (req, res) => {
    const ticketId = Number(req.params.id);
    try {
        const ticketExists = ticketModel.getTicketById(ticketId);
        if (!ticketExists) {
            return res.status(404).send('Ticket not found');
        }
        ticketModel.deleteTicket(ticketId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getTotalTickets = (req, res) => {
    const totalTickets = ticketModel.getTotalTickets();
    res.json({ total: totalTickets });
};

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    getTotalTickets
};