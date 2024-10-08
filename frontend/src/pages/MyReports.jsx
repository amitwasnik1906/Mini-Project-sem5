import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyReports = ({ user }) => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate()

  const getMyReports = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/v1/user/submited-reports/${user?._id}`, config);
      console.log(data);

      setReports(data.reports);

    } catch (error) {
      console.log(error);
    }
  };

  // Fetch report data when the component mounts
  useEffect(() => {
    if (user) {
      getMyReports();
    }
  }, [user]);

  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`)
  };

  return (
    <>
      {
        !user ? <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-xl font-bold text-gray-700">Please sign in to access this page</h1>
        </div> :
          <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">My Reports</h1>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="w-1/5 px-4 py-2">Name</th>
                    <th className="w-1/5 px-4 py-2">Abuse Type</th>
                    <th className="w-2/5 px-4 py-2">Incident Location</th>
                    <th className="w-1/5 px-4 py-2">Status</th>
                    <th className="w-1/5 px-4 py-2">Timestamp</th>
                    <th className="w-1/5 px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length > 0 ? (
                    reports.map((report) => (
                      <tr key={report._id} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-2">{report.victimName}</td>
                        <td className="px-4 py-2">{report.abuseType}</td>
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
                        <td className="px-4 py-2">{new Date(report.incidentDate).toLocaleDateString()}</td>
                        <td className="px-4 py-2 text-center">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                            onClick={() => handleViewReport(report._id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">No reports found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      } </>
  );
};

export default MyReports;
