import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdatesAndCommits = ({ user }) => {
  const [updatesAndCommits, setUpdatesAndCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };
      const { data } = await axios.get(url, config);
      setUpdatesAndCommits(data.updatesAndCommites);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load updates and commits. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && id) {
      const url = user.isAuthority
        ? `http://localhost:4000/api/v1/authority/get-updates-and-commits/${id}`
        : `http://localhost:4000/api/v1/user/get-updates-and-commits/${id}`;
      fetchData(url);
    }
  }, [user, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-6 bg-white">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Updates and Commits</h2>
      {updatesAndCommits.map((unc) => (
        <div 
          key={unc._id} 
          className="p-4 mb-4 transition-shadow duration-300 rounded-lg shadow-md bg-gray-50 hover:shadow-lg"
        >
          <div className="flex items-center mb-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-2 ${unc.role === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}>
              {unc.role === 'user' ? '👤' : '🛡️'}
            </span>
            <span className="text-lg font-medium text-gray-800">
              {unc.role === "user" ? "You" : "Authority"}
            </span>
          </div>
          <p className="pl-10 mb-2 text-gray-700">{unc.msg}</p>
          <div className="pl-10 text-sm text-gray-500">
            {new Date(unc.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
      {updatesAndCommits.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          <p className="mb-4 text-4xl">💬</p>
          <p>No updates or commits yet. Stay tuned!</p>
        </div>
      )}
    </div>
  );
};

export default UpdatesAndCommits;