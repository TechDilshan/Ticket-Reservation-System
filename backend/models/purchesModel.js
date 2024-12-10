// models/userModel.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/purchesData.json');

const readData = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const getAllPurches = () => {
    const data = readData();
    return data.purches;
};

const getPurchesById = (id) => {
    const data = readData();
    return data.purches.find(purches => purches.id === id);
};

const createPurches = (purches) => {
    const data = readData();
    
    // Determine the next user ID
    const maxId = data.purches.length > 0 ? Math.max(...data.purches.map(u => u.purchesID)) : 0;
    const newTicketId = maxId + 1; // Increment max ID by 1

    // Create the new user object with the new ID
    const newTicket = {
        purchesID: purches.purchesID, // Assign the new ID
        customerID: purches.customerID,
        customerName: purches.customerName,
        ticketID: purches.ticketID,
        eventName: purches.eventName,
        dateTime: purches.dateTime,
        location: purches.location,
        price: purches.price,
    };

    data.purches.push(newTicket);
    writeData(data);
};

const updatePurches = (id, updatedPurches) => {
    const data = readData();
    const index = data.purches.findIndex(purches => purches.purchesID === id);
    
    // Check if the user exists
    if (index === -1) {
        throw new Error(`Ticket with ID ${id} not found.`);
    }

    // Check if updatedUser is valid
    if (!updatedTicket || typeof updatedTicket !== 'object') {
        throw new Error('Invalid ticket data provided for update.');
    }

    data.purches[index] = { ...data.purches[index], ...updatedTicket };
    writeData(data);
};

const deletePurches = (id) => {
    const data = readData();
    const filteredTickets = data.purches.filter(purches => purches.id !== id);
    writeData({ purches: filteredTickets });
};

const getTotalPurches = () => {
    const data = readData();
    return data.purches.length;
};

module.exports = {
    getAllPurches,
    getPurchesById,
    createPurches,
    updatePurches,
    deletePurches,
    getTotalPurches
};