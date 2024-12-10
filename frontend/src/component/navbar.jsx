import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white text-lg font-bold">Ticketing System</div>
                <div className="space-x-4">
                    <Link to="#" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/login" className="text-gray-300 hover:text-white">Logout</Link>
                    
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;