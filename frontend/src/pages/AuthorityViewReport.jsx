import React, { useEffect, useState } from 'react';
import ReportData from '../components/Reportdata';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UpdatesAndCommits from '../components/UpdatesAndCommits';

function AuthorityViewReport({ user }) {
  const [updates, setUpdates] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      await axios.post(
        "http://localhost:4000/api/v1/authority/give-updates",
        { reportId: id, msg: updates },
        config
      );

      setShowSuccessMessage(true);
      setUpdates("");
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-900 animate-fade-in">
          Report Details &amp; Updates
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column - Report Data */}
          <div className="lg:col-span-7 space-y-6 transition-transform duration-500 ease-in-out transform hover:scale-[1.01]">
            <div className="overflow-hidden bg-white shadow-xl rounded-xl">
              <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
              <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Report Information</h2>
                <ReportData user={user} />
              </div>
            </div>
          </div>

          {/* Right Column - Updates and Form */}
          <div className="space-y-6 lg:col-span-5">
            {/* Updates & Commits Section */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform duration-500 ease-in-out transform hover:scale-[1.01]">
              <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
              <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Updates History</h2>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  <UpdatesAndCommits user={user} />
                </div>
              </div>
            </div>

            {/* Update Form */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform duration-500 ease-in-out transform hover:scale-[1.01]">
              <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-600" />
              <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Add Update</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <textarea
                      id="updates"
                      name="updates"
                      rows="4"
                      placeholder="Enter your updates here..."
                      value={updates}
                      onChange={(e) => setUpdates(e.target.value)}
                      className="w-full px-4 py-3 transition-all duration-300 ease-in-out border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <div className="absolute text-sm text-gray-400 bottom-3 right-3">
                      {updates.length} characters
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !updates.trim()}
                    className={`w-full px-6 py-3 rounded-lg font-medium text-white 
                      ${isSubmitting || !updates.trim() 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5'
                      } transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Submit Update'}
                  </button>
                </form>

                {/* Success Message */}
                <div className={`fixed bottom-4 right-4 transition-all duration-500 ease-in-out transform ${showSuccessMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className="px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg">
                    Update submitted successfully!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AuthorityViewReport;