import React, { useEffect, useState } from 'react';
import TicketService from '../services/TicketService'; // Adjust the path as necessary
import Navbar from '../component/navbar';

const CustomerDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const CusId = Number(sessionStorage.getItem('CusId'));
    const userName = sessionStorage.getItem('CusName');

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

    const handlePurchase = async (ticket) => {

       console.log(ticket.ticketID);
       console.log(ticket.eventName);
       console.log(ticket.dateTime);
       console.log(ticket.location);
       console.log(ticket.price);
       console.log(CusId);
       console.log(userName);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Navbar/>
            <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
            <h2 className="text-xl font-semibold mb-2">Available Tickets</h2>
            <ul className="space-y-4">
                {tickets.map(ticket => (
                    <li key={ticket.id} className="border p-4 rounded shadow">
                        Ticket ID: <span className="font-medium">{ticket.ticketID}</span> <br/>
                        Event Name: <span className="font-medium">{ticket.eventName}</span> <br/>
                        Location: <span className="font-medium">{ticket.location}</span> <br/>
                        Date And Time: <span className="font-medium">{new Date(ticket.dateTime).toLocaleString()}</span> <br/>
                        Price: <span className="font-medium">Rs. {ticket.price}</span> <br/>
                        <button 
                            onClick={() => handlePurchase(ticket)} 
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Purchase
                        </button>
                    </li>
                ))} 
            </ul>
        </div>
    );
};

export default CustomerDashboard;