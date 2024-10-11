import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';

function Signup() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
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
      if(formData.password !== formData.confirmPassword){
        throw error;
      }

      await axios.post(
        `http://localhost:4000/api/v1/user/register`,
        formData,
        config
      )
      setFormData({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
      })
      alert("User Register Successfully")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-6 font-semibold text-center">User Signup</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
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
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" onClick={(e) => handleSubmit(e)}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
