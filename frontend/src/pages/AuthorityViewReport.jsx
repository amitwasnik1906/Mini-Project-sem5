import React, { useState } from 'react';
import ReportData from '../components/Reportdata';

function AuthorityViewReport({ user }) {
  // Initialize state for form data
  const [status, setStatus] = useState('Pending');
  const [updates, setUpdates] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = {
      status,
      updates,
    };

    console.log(formData);
    // Add logic here to handle form submission, like making a POST request to update the report.
  };

  return (
    <div>
      <ReportData user={user} />

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Status Selector */}
          <div className="flex flex-col space-y-4">
            <label className="text-lg font-semibold text-gray-700" htmlFor="status">
              Change Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Pending">Pending</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Updates Input */}
          <div className="flex flex-col space-y-4">
            <label className="text-lg font-semibold text-gray-700" htmlFor="updates">
              Updates
            </label>
            <textarea
              id="updates"
              name="updates"
              rows="4"
              placeholder="Enter your updates here"
              value={updates}
              onChange={(e) => setUpdates(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthorityViewReport;
