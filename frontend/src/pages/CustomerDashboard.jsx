import React, { useEffect, useState } from 'react';
import TicketService from '../services/TicketService'; // Adjust the path as necessary
import Navbar from '../component/navbar';

const CustomerDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await TicketService.getAllTickets();
                setTickets(response.data);
            } catch (err) {
                console.error('Error fetching tickets:', err); // Added logging for error
                setError('Failed to fetch tickets');
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    const handlePurchase = async (ticketId) => {
        try {
            await TicketService.purchaseTicket(ticketId);
            alert('Ticket purchased successfully!');
            // Optionally, refresh the ticket list or update state
        } catch (err) {
            alert('Failed to purchase ticket');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Navbar/>
            <h1>Customer Dashboard</h1>
            <h2>Available Tickets</h2>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket.id}>
                        {ticket.eventName} - ${ticket.price}
                        <button onClick={() => handlePurchase(ticket.id)}>Purchase</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerDashboard;