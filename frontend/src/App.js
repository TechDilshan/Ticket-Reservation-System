import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <Link to="/singup">
                <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out">
                    Start
                </button>
            </Link>
        </div>
    );
};

export default App;