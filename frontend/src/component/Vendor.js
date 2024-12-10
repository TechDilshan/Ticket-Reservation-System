import React from 'react';

const Vendor = ({ ticketPool, ticketsToRelease }) => {
    const releaseTickets = () => {
        // Simulate ticket release with a delay
        setTimeout(() => {
            ticketPool.addTickets(ticketsToRelease);
        }, Math.random() * 2000); // Random delay between 0 and 2 seconds
    };

    return (
        <div>
            <button onClick={releaseTickets} className="bg-blue-500 text-white p-2 rounded">
                Release {ticketsToRelease} Tickets
            </button>
        </div>
    );
};

export default Vendor;