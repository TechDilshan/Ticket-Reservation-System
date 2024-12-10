import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${email}`);

            if(response.data.password === password){
                const userType = response.data.type;
                const CusId = response.data.id;
                const CusName = response.data.name;
                sessionStorage.setItem('CusId', CusId);
                sessionStorage.setItem('CusName', CusName);
                
                if (userType === 'customer') {
                    navigate('/customer');
                } else if (userType === 'vendor') {
                    navigate('/vendors');
                }

            } else {
                alert('Login failed: Incorrect password');
                console.error('Login failed: Incorrect password');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: User not found');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>
                <div className="mt-4 text-center">
                <p>Don't have an account? Please <Link to="/singup" className="text-blue-500 hover:text-blue-700"> sign up</Link>.</p>
            </div>
            </form>
            
        </div>
    );
}

export default Login;
