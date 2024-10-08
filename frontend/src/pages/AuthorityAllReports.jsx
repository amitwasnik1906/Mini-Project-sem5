import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthorityAllReports = ({ user }) => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate(); // React Router's useNavigate hook to navigate to other pages

  const getAllReports = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/v1/authority/all-reports`, config);
      setReports(data.reports);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllReports();
    }
  }, [user]);

  const handleViewReport = (reportId) => {
    // Navigate to a detailed page for the report
    navigate(`/authority/report/${reportId}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">All Submitted Reports</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Abuse Type</th>
              <th className="px-4 py-2">Incident Date</th>
              <th className="px-4 py-2">Incident Location</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report._id} className="border-b">
                  <td className="px-4 py-2">{report.victimName}</td>
                  <td className="px-4 py-2">{report.abuseType}</td>
                  <td className="px-4 py-2">{new Date(report.incidentDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{report.incidentLocation}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${report.status === 'Resolved'
                        ? 'bg-green-200 text-green-800'
                        : report.status === 'Under Investigation'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-red-200 text-red-800'
                        }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleViewReport(report._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuthorityAllReports;
