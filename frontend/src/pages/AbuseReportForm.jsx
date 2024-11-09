import React, { useState, useEffect } from 'react';
import { State, City } from 'country-state-city';
import axios from 'axios';

const AbuseReportForm = ({ user }) => {
  const [formData, setFormData] = useState({
    victimName: '',
    abuseType: '',
    gender: '',
    age: '',
    phoneNumber: '',
    incidentLocation: '',
    incidentState: '',
    incidentCity: '',
    incidentDate: '',
    description: '',
    evidence: null,
    consent: false,
    legalDisclaimer: false,
  });

  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false)

  // Fetch states for India when the component mounts
  useEffect(() => {
    const indianStates = State.getStatesOfCountry('IN');
    setStates(indianStates);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, evidence: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });

      // Update cities when state changes
      if (name === 'incidentState') {
        const stateCities = City.getCitiesOfState('IN', value);
        setCities(stateCities);
        setFormData({ ...formData, incidentState: value, incidentCity: '' });
      }
    }
  };

  // Validate the form
  const validateForm = () => {
    let formErrors = {};

    if (!formData.victimName) formErrors.victimName = 'Victim name is required';
    if (!formData.abuseType) formErrors.abuseType = 'Abuse type is required';
    if (!formData.gender) formErrors.gender = 'Gender is required';
    if (!formData.age) formErrors.age = 'Age is required';
    if (!formData.phoneNumber) formErrors.phoneNumber = 'phoneNumber number is required';
    if (!formData.incidentLocation) formErrors.incidentLocation = 'Incident location is required';
    if (!formData.incidentState) formErrors.incidentState = 'Incident state is required';
    if (!formData.incidentCity) formErrors.incidentCity = 'Incident city is required';
    if (!formData.incidentDate) formErrors.incidentDate = 'Incident date is required';
    if (!formData.description) formErrors.description = 'Incident description is required';
    if (!formData.consent) formErrors.consent = 'Consent is required';
    if (!formData.legalDisclaimer) formErrors.legalDisclaimer = 'You must accept the legal terms';

    setErrors(formErrors);

    // Return true if no errors, otherwise false
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      setLoading(true)
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${user?.refreshToken}`,
          },
        };

        const { data } = await axios.post("http://localhost:4000/api/v1/user/submit-abuse-report", formData, config)

        setFormData({
          victimName: '',
          abuseType: '',
          gender: '',
          age: '',
          phoneNumber: '',
          incidentLocation: '',
          incidentState: '',
          incidentCity: '',
          incidentDate: '',
          description: '',
          evidence: null,
          consent: false,
          legalDisclaimer: false,
        })
        setLoading(false)
        alert("Form Submitted Successfully");
      } catch (error) {
        setLoading(false)
        alert(error.response.data.message)
      }
    } else {
      alert("Form validation failed")
    }
  };

  return (
    <>
      {
        !user ?
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 animate-fadeIn">
        <div className="p-8 transition-all duration-300 transform bg-white shadow-2xl rounded-xl hover:scale-105">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-5xl rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 animate-bounce">
            🔒
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-800 animate-slideDown">Access Restricted</h1>
          <p className="text-gray-600 animate-slideUp">Please sign in to Fill the Form </p>
        </div>
      </div>
          :

          <form className="max-w-xl p-6 mx-auto mt-4 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
            {/* Victim's Info Section */}
            <h2 className="mb-4 text-xl font-semibold">Victim's Info</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="victimName" className="block mb-2">Victim's Name</label>
                <input
                  type="text"
                  name="victimName"
                  id="victimName"
                  value={formData.victimName}
                  onChange={handleChange}
                  placeholder="Name Of Victim"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.victimName && <span className="text-red-500">{errors.victimName}</span>}
              </div>
              <div>
                <label htmlFor="abuseType" className="block mb-2">Type of Abuse</label>
                <select
                  name="abuseType"
                  id="abuseType"
                  value={formData.abuseType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Abuse Type</option>
                  <option value="physical">Physical Abuse</option>
                  <option value="verbal">Verbal Abuse</option>
                  <option value="sexual">Sexual Abuse</option>
                  <option value="emotional">Emotional Abuse</option>
                </select>
                {errors.abuseType && <span className="text-red-500">{errors.abuseType}</span>}
              </div>
              <div>
                <label htmlFor="gender" className="block mb-2">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className="text-red-500">{errors.gender}</span>}
              </div>
              <div>
                <label htmlFor="age" className="block mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age Of Victim"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.age && <span className="text-red-500">{errors.age}</span>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phoneNumber number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
              </div>
            </div>

            {/* Incident Info Section */}
            <h2 className="mb-4 text-xl font-semibold">Incident Info</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="incidentLocation" className="block mb-2">Location of Incident</label>
                <input
                  type="text"
                  name="incidentLocation"
                  id="incidentLocation"
                  value={formData.incidentLocation}
                  onChange={handleChange}
                  placeholder="Location Of Incident"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.incidentLocation && <span className="text-red-500">{errors.incidentLocation}</span>}
              </div>
              <div>
                <label htmlFor="incidentState" className="block mb-2">State</label>
                <select
                  name="incidentState"
                  id="incidentState"
                  value={formData.incidentState}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.incidentState && <span className="text-red-500">{errors.incidentState}</span>}
              </div>
              <div>
                <label htmlFor="incidentCity" className="block mb-2">City</label>
                <select
                  name="incidentCity"
                  id="incidentCity"
                  value={formData.incidentCity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.incidentCity && <span className="text-red-500">{errors.incidentCity}</span>}
              </div>
              <div>
                <label htmlFor="incidentDate" className="block mb-2">Incident Date</label>
                <input
                  type="date"
                  name="incidentDate"
                  id="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.incidentDate && <span className="text-red-500">{errors.incidentDate}</span>}
              </div>
              <div>
                <label htmlFor="description" className="block mb-2">Incident Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the incident"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.description && <span className="text-red-500">{errors.description}</span>}
              </div>
            </div>

            {/* Consent Section */}
            <div className="mb-4">
              <input
                type="checkbox"
                name="consent"
                id="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="consent">I consent to sharing this information with the authorities</label>
              {errors.consent && <span className="block text-red-500">{errors.consent}</span>}
            </div>

            {/* Legal Disclaimer Section */}
            <div className="mb-6">
              <input
                type="checkbox"
                name="legalDisclaimer"
                id="legalDisclaimer"
                checked={formData.legalDisclaimer}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="legalDisclaimer">
                I accept the legal terms and conditions associated with filing this report
              </label>
              {errors.legalDisclaimer && <span className="block text-red-500">{errors.legalDisclaimer}</span>}
            </div>

            <button
              type="submit"
              className={`w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </form>
      }</>
  );
};

export default AbuseReportForm;
