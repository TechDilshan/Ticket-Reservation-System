import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-gray-200">
            <div className="bg-white bg-opacity-50 p-10 rounded-lg shadow-lg">
                <Link to="/login">
                    <button className="btn btn-primary text-black font-bold py-2 px-4 rounded">
                        Start
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default App;