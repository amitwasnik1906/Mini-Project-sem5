import React, { useState } from 'react'
import ReportData from '../components/Reportdata'
import UpdatesAndCommits from '../components/UpdatesAndCommits'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Report({user}) {
  const [commit, setCommit] = useState('');
  const {id} = useParams()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = {
      commit,
    };

    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      const { data } = await axios.post("http://localhost:4000/api/v1/user/give-commit", {reportId: id, msg: commit}, config)

      alert("commit Sent Successfully");
      setCommit("")
    } catch (error) {
      alert(error)
    }
  };
  return (
    <div>
      <ReportData user = {user}></ReportData>

      <UpdatesAndCommits user = {user}/>

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* commit Input */}
          <div className="flex flex-col space-y-4">
            <label className="text-lg font-semibold text-gray-700" htmlFor="commit">
              Commit
            </label>
            <textarea
              id="commit"
              name="commit"
              rows="4"
              placeholder="Enter your commit here"
              value={commit}
              onChange={(e) => setCommit(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Commit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Report
