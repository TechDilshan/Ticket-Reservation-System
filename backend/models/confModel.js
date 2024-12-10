// models/userModel.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/ConfigurationData.json');

const readData = () => {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const getAllTickets = () => {
    const data = readData();
    return data.configuration;
};

const getTicketById = (id) => {
    const data = readData();
    return data.configuration.find(configuration => configuration.customerID === id);
};

const createTicket = (configuration) => {
    const data = readData();

    // Create the new user object with the new ID
    const newTicket = {
        configurationID: configuration.configurationID,
        customerID: configuration.customerID,
        ticketCapacity: configuration.ticketCapacity, // Assign the new ID
    };

    data.configuration.push(newTicket);
    writeData(data);
};

const updateTicket = (id, updatedTicket) => {
    const data = readData();
    const index = data.configuration.findIndex(configuration => configuration.customerID === id);
    
    // Check if the user exists
    if (index === -1) {
        throw new Error(`Ticket with ID ${id} not found.`);
    }

    // Check if updatedUser is valid
    if (!updatedTicket || typeof updatedTicket !== 'object') {
        throw new Error('Invalid ticket data provided for update.');
    }

    data.configuration[index] = { ...data.configuration[index], ...updatedTicket };
    writeData(data);
};



module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket
};