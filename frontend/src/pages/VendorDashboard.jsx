import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import Axios from 'axios';

const VendorDashboard = () => {
    const [totalTickets, setTotalTickets] = useState(0);
    const [ticketReleaseRate, setTicketReleaseRate] = useState(0);
    const [customerRetrievalRate, setCustomerRetrievalRate] = useState(0);
    const [maxTicketCapacity, setMaxTicketCapacity] = useState(0);
    const [maxTicketCapacityOld, setMaxTicketCapacityOld] = useState(0);
    const [currentCapacity, setCurrentCapacity] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [newTickets, setNewTickets] = useState(0);
    const [ticketID, setTicketID] = useState('');
    const [eventName, setEventName] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0.00);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            customerID: 6000,
            ticketCapacity: maxTicketCapacity,
        };

        try {
            // Check if there's existing data (you can adjust this logic as needed)
            if (maxTicketCapacityOld > 0) {
                // Update existing configuration
                const response = await Axios.put('http://localhost:5000/api/updateconfiguration/6000', payload);
                console.log('Configuration updated successfully:', response.data);
            } else {
                // Create new configuration
                const response = await Axios.post('http://localhost:5000/api/createconfiguration', payload);
                console.log('Configuration created successfully:', response.data);
            }
        } catch (error) {
            console.error('Axios Error: ', error);
        }
    };

    const toggleSystem = () => {
        setIsActive(!isActive);
        if (isActive) {
            setCurrentCapacity(0); // Reset capacity when stopping
        }
    };

    const addNewTickets = async () => {

        const payload = {
            ticketID: ticketID,
            eventName: eventName,
            dateTime: dateTime,
            location: location,
            price: price,
          };
      
          // Create new Client using url
          Axios.post('http://localhost:5000/api/createtickets', payload)
            .then((response) => {
              console.log('Ticket saved successfully:', response.data);
                setTicketID('');
                setEventName('');
                setDateTime('');
                setLocation('');
                setPrice(0);
            })
            .catch((error) => {
              console.error('Axios Error: ', error);
            });
    };

    useEffect(() => {
        const intervalId = setInterval(fetchMaxIdAndSetId, 1000); // Refresh every 5 seconds
    
        fetchMaxIdAndSetId();
        return () => clearInterval(intervalId);
      }, [totalTickets]);


    useEffect(() => {
        setTicketReleaseRate(maxTicketCapacity/totalTickets*100 || 0);
        fetchConfiguration();
    }, [maxTicketCapacity]);


    const fetchMaxIdAndSetId = async () => {
        try {
          const response = await Axios.get('http://localhost:5000/api/total-tickets');
          const maxId = response.data?.total || 0; 
          setTotalTickets(maxId);
        } catch (error) {
          console.error('Axios Error (getMaxId): ', error);
        }
      };

      const fetchConfiguration = async () => {
        try {
          const response = await Axios.get('http://localhost:5000/api/configuration/6000');
          const maxId = response.data?.ticketCapacity || 0; 
          setMaxTicketCapacityOld(maxId);
        } catch (error) {
          console.error('Axios Error (getMaxId): ', error);
        }
      };

    useEffect(() => {
        fetchConfiguration();
    }, []);

    useEffect(() => {
        setMaxTicketCapacity(maxTicketCapacityOld); // Set initial value to maxTicketCapacityOld
    }, [maxTicketCapacityOld]); // Update when maxTicketCapacityOld changes

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
                    <p className="text-2xl">{ticketReleaseRate.toFixed(2)}%</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <h2 className="text-xl font-semibold">Customer Retrieval Rate</h2>
                    <p className="text-2xl">{customerRetrievalRate}</p>
                </div>
               
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium">Maximum Ticket Capacity</label>
                    <p className="text-sm text-gray-500">Current: {maxTicketCapacityOld}</p>
                    <input
                        type="number"
                        value={maxTicketCapacity}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            // Automatically adjust maxTicketCapacity if it exceeds totalTickets
                            if (value > totalTickets) {
                                setMaxTicketCapacity(totalTickets);
                                setError('Maximum capacity has been adjusted to total tickets.');
                            } else {
                                setMaxTicketCapacity(value);
                                setError(''); // Clear error if the value is valid
                            }
                        }}
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
                                    value={price.toFixed(2)}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    pattern="[0-9]*([.,][0-9]{0,2})?"
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