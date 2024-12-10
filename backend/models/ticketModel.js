// models/userModel.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/ticketdata.json');

const readData = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const getAllTickets = () => {
    const data = readData();
    return data.tickets;
};

const getTicketById = (id) => {
    const data = readData();
    return data.tickets.find(ticket => ticket.id === id);
};

const createTicket = (ticket) => {
    const data = readData();
    
    // Determine the next user ID
    const maxId = data.tickets.length > 0 ? Math.max(...data.tickets.map(u => u.id)) : 0;
    const newTicketId = maxId + 1; // Increment max ID by 1

    // Create the new user object with the new ID
    const newTicket = {
        id: newTicketId, // Assign the new ID
        eventName: ticket.eventName,
        eventDate: ticket.eventDate,
        eventTime: ticket.eventTime,
        eventLocation: ticket.eventLocation,
        eventPrice: ticket.eventPrice,
    };

    data.tickets.push(newTicket);
    writeData(data);
};

const updateTicket = (id, updatedTicket) => {
    const data = readData();
    const index = data.tickets.findIndex(ticket => ticket.id === id);
    
    // Check if the user exists
    if (index === -1) {
        throw new Error(`Ticket with ID ${id} not found.`);
    }

    // Check if updatedUser is valid
    if (!updatedTicket || typeof updatedTicket !== 'object') {
        throw new Error('Invalid ticket data provided for update.');
    }

    data.tickets[index] = { ...data.tickets[index], ...updatedTicket };
    writeData(data);
};

const deleteTicket = (id) => {
    const data = readData();
    const filteredTickets = data.tickets.filter(ticket => ticket.id !== id);
    writeData({ tickets: filteredTickets });
};

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
};