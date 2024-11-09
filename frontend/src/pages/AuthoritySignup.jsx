import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function AuthoritySignup() {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
    });

    // Fetch states when the component mounts
    useEffect(() => {
        const indianStates = State.getStatesOfCountry('IN');
        setStates(indianStates);
    }, []);

    // Fetch cities when a state is selected
    useEffect(() => {
        if (selectedState) {
            const stateCities = City.getCitiesOfState('IN', selectedState);
            setCities(stateCities);
        }
    }, [selectedState]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle state change
    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        setSelectedState(stateCode);
        setFormData({ ...formData, state: stateCode, city: '' });
    };

    // Handle city change
    const handleCityChange = (e) => {
        const cityName = e.target.value;
        setFormData({ ...formData, city: cityName });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        try {
            if (formData.password !== formData.confirmPassword) {
                throw error;
            }

            await axios.post(
                `http://localhost:4000/api/v1/authority/register`,
                formData,
                config
            )
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: '',
                city: '',
                state: '',
            })
            alert("User Register Successfully")
            navigate("/authority/login")
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-center">Authority Signup</h2>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />

                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />

                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <select
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                >
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                        </option>
                    ))}
                </select>

                <select
                    name="city"
                    value={formData.city}
                    onChange={handleCityChange}
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded" onClick={(e) => handleSubmit(e)}>
                    Signup
                </button>
            </form>
        </div>
    );
}

export default AuthoritySignup;
