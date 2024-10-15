import React, { useEffect, useState } from 'react';
import ReportData from '../components/Reportdata';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UpdatesAndCommits from '../components/UpdatesAndCommits';

function AuthorityViewReport({ user }) {
  // Initialize state for form data
  const [updates, setUpdates] = useState('');
  const {id} = useParams()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = {
      updates,
    };

    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      const { data } = await axios.post("http://localhost:4000/api/v1/authority/give-updates", {reportId: id, msg: updates}, config)

      alert("Updates Sent Successfully");
      setUpdates("")
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  useEffect(()=>{
    
  }, [])

  return (
    <div>
      <ReportData user={user} />

      <UpdatesAndCommits user = {user}/>

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <form className="space-y-6" onSubmit={handleSubmit}>

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
