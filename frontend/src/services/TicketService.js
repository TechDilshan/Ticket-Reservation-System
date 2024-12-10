// src/services/TicketService.js

import axios from 'axios';

const API_URL = 'http://your-api-url.com/api/tickets'; // Replace with your actual API URL

const TicketService = {
    getAllTickets: async () => {
        const response = await axios.get(API_URL);
        return response;
    },

    purchaseTicket: async (ticketId) => {
        const response = await axios.post(`${API_URL}/purchase`, { ticketId });
        return response;
    }
};

export default TicketService;