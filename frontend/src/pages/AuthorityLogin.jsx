import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function AuthorityLogin() {
    // State variables for input fields
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: { "Content-Type": "application/json" },
            };

            const { data } = await axios.post("http://localhost:4000/api/v1/authority/login", { email, password }, config)
            const { refreshToken, ...restData } = data.authority;

            Cookies.set('refreshToken', refreshToken, { expires: 7 });
            navigate("/")
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Authority Login</h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* email/Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email number or email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            value={email} // Bind state to input value
                            onChange={(e) => setemail(e.target.value)} // Update state on change
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            value={password} // Bind state to input value
                            onChange={(e) => setPassword(e.target.value)} // Update state on change
                        />
                    </div>

                    {/* Login Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Login
                        </button>
                    </div>

                    {/* Optional Links */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <a href="/authority/signup" className="text-indigo-500 hover:underline">
                                Authority Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthorityLogin;
