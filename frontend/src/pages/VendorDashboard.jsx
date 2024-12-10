import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';

const VendorDashboard = () => {
    const [totalTickets, setTotalTickets] = useState(0);
    const [ticketReleaseRate, setTicketReleaseRate] = useState(0);
    const [customerRetrievalRate, setCustomerRetrievalRate] = useState(0);
    const [maxTicketCapacity, setMaxTicketCapacity] = useState(0);
    const [currentCapacity, setCurrentCapacity] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [newTickets, setNewTickets] = useState(0);
    const [ticketID, setTicketID] = useState('');
    const [eventName, setEventName] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0);
    const [dateTime, setDateTime] = useState('');
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        let interval;
        if (isActive) {
            setLoading(true);
            interval = setInterval(() => {
                setCurrentCapacity((prev) => Math.min(prev + ticketReleaseRate, maxTicketCapacity));
            }, 1000);
        }
        return () => {
            clearInterval(interval);
            setLoading(false);
        };
    }, [isActive, ticketReleaseRate, maxTicketCapacity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validate inputs
        if (totalTickets <= 0 || ticketReleaseRate <= 0 || customerRetrievalRate <= 0 || maxTicketCapacity <= 0) {
            setError('All values must be positive numbers.');
            return;
        }
        if (maxTicketCapacity > totalTickets) {
            setError('Maximum capacity cannot exceed total tickets.');
            return;
        }

        // Reset current capacity if the system is started
        if (!isActive) {
            setCurrentCapacity(0);
        }
    };

    const toggleSystem = () => {
        setIsActive(!isActive);
        if (isActive) {
            setCurrentCapacity(0); // Reset capacity when stopping
        }
    };

    const addNewTickets = () => {
        if (newTickets > 0) {
            console.log({
                ticketID,
                eventName,
                time,
                location,
                price,
                quantity: newTickets
            });
            setTotalTickets((prev) => prev + newTickets);
            setNewTickets(0);
            setTicketID('');
            setEventName('');
            setTime('');
            setLocation('');
            setPrice(0);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
          <Navbar/>
            <div className="text-center pt-5">
                <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-xl font-semibold">Total Tickets Available</h2>
                    <p className="text-2xl">{totalTickets}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-xl font-semibold">Maximum Current Capacity</h2>
                    <p className="text-2xl">{maxTicketCapacity}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-xl font-semibold">Current Release Rate</h2>
                    <p className="text-2xl">{ticketReleaseRate}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-xl font-semibold">Customer Retrieval Rate</h2>
                    <p className="text-2xl">{customerRetrievalRate}</p>
                </div>
               
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium">Maximum Ticket Capacity</label>
                    <input
                        type="number"
                        value={maxTicketCapacity}
                        onChange={(e) => setMaxTicketCapacity(Number(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                        disabled={isActive}
                    />
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Update Configuration</button>
            </form>
            <button onClick={() => setOpenModal(true)} className="w-full bg-blue-500 text-white p-2 rounded-md">Add Tickets</button>
            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow">
                        <form onSubmit={(e) => { e.preventDefault(); addNewTickets(); }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Ticket ID</label>
                                <input
                                    type="text"
                                    value={ticketID}
                                    onChange={(e) => setTicketID(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Event Name</label>
                                <input
                                    type="text"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Date and Time</label>
                                <input
                                    type="datetime-local"
                                    value={dateTime}
                                    onChange={(e) => setDateTime(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Price</label>
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    pattern="[0-9]*([.,][0-9]+)?"
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Add Tickets</button>
                        </form>
                        <button onClick={() => setOpenModal(false)} className="mt-4 w-full bg-red-500 text-white p-2 rounded-md">Close</button>
                    </div>
                </div>
            )}
            
            {loading && <div className="mt-4">Loading...</div>}
        </div>
    );
};

export default VendorDashboard;