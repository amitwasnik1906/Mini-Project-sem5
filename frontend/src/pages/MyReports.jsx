import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const MyReports = ({ user }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const navigate = useNavigate();

  const getMyReports = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4000/api/v1/user/submited-reports/${user?._id}`,
        config
      );
      setReports(data.reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getMyReports();
    }
  }, [user]);

  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  const filteredReports = selectedStatus === 'All' 
    ? reports 
    : reports.filter(report => report.status === selectedStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-300';
      case 'Under Investigation': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  if (!user) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      >
        <motion.div 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="p-8 bg-white rounded-lg shadow-md"
        >
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-4xl text-red-500 bg-red-100 rounded-full">🔒</div>
          <h1 className="mb-2 text-2xl font-bold text-center text-gray-800">Access Restricted</h1>
          <p className="mb-4 text-center text-gray-600">Please sign in to view your reports</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => navigate('/login')}
          >
            Sign In
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-8 bg-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-4xl font-bold text-gray-900">My Reports</h1>
          <p className="text-lg text-gray-600">Track and manage your submitted reports</p>
        </motion.div>

        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3"
        >
          {[
            { title: 'Total Reports', value: reports.length, color: 'text-blue-600' },
            { title: 'Resolved', value: reports.filter(r => r.status === 'Resolved').length, color: 'text-green-600' },
            { title: 'Pending', value: reports.filter(r => r.status !== 'Resolved').length, color: 'text-yellow-600' },
          ].map((stat, index) => (
            <motion.div 
              key={stat.title}
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
            >
              <h2 className="mb-2 text-xl font-semibold text-gray-700">{stat.title}</h2>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Report Details</h2>
            <motion.select 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Resolved">Resolved</option>
            </motion.select>
          </div>
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-64"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"
              ></motion.div>
            </motion.div>
          ) : filteredReports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Victim Name</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Abuse Type</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <AnimatePresence>
                  <motion.tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.map((report, index) => (
                      <motion.tr 
                        key={report._id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="transition duration-150 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">{report.victimName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.abuseType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{report.incidentLocation}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(report.incidentDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 text-sm font-medium text-white transition duration-150 bg-blue-500 rounded-md hover:bg-blue-600"
                            onClick={() => handleViewReport(report._id)}
                          >
                            View Details
                          </motion.button>
                          <div className="mt-1 text-xs">
                            {report.seen ? (
                              <span className="flex items-center text-green-600">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Seen by Authority
                              </span>
                            ) : (
                              <span className="flex items-center text-gray-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Pending Review
                              </span>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </AnimatePresence>
              </table>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-64"
            >
              <div className="mb-4 text-6xl">📊</div>
              <h3 className="mb-1 text-xl font-medium text-gray-900">No Reports Found</h3>
              <p className="text-gray-500">You haven't submitted any reports yet</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyReports;