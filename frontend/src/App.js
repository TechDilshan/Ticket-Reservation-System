import React, { useState } from 'react';
import TicketPool from './component/TicketPool';
import Vendor from './component/Vendor';
import Navbar from './component/navbar';

const App = () => {

    const [ticketPool] = useState(new TicketPool(100)); // Initialize TicketPool with 100 tickets
    const [availableTickets, setAvailableTickets] = useState(ticketPool.getAvailableTickets());

    // Update available tickets when tickets are added
    const updateAvailableTickets = (newAvailableTickets) => {
        setAvailableTickets(newAvailableTickets);
    };

    // Override the addTickets method to update state
    ticketPool.addTickets = (tickets) => {
        ticketPool.availableTickets += tickets;
        updateAvailableTickets(ticketPool.getAvailableTickets());
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
          <Navbar/>
            <h1 className="text-3xl font-bold mb-6">Ticket Pool System</h1>
            <h2 className="text-xl mb-4">Available Tickets: {availableTickets}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Vendor ticketPool={ticketPool} ticketsToRelease={10} />
                <Vendor ticketPool={ticketPool} ticketsToRelease={15} />
                <Vendor ticketPool={ticketPool} ticketsToRelease={20} />
                <Vendor ticketPool={ticketPool} ticketsToRelease={5} />
            </div>
        </div>
    );
};

export default App;