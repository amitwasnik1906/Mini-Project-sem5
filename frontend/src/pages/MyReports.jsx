import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyReports = ({ user }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
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
      console.log(error);
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

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 animate-fadeIn">
        <div className="p-8 transition-all duration-300 transform bg-white shadow-2xl rounded-xl hover:scale-105">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-5xl rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 animate-bounce">
            🔒
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-800 animate-slideDown">Access Restricted</h1>
          <p className="text-gray-600 animate-slideUp">Please sign in to view your reports</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 animate-fadeIn sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 transform animate-slideDown">
          <h1 className="mb-2 text-4xl font-bold text-center text-gray-900 transition-colors duration-300 hover:text-indigo-600">
            My Reports
          </h1>
          <p className="text-center text-gray-600">Track and manage your submitted reports</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3 animate-slideUp">
          <div className="p-6 transition-all duration-300 transform bg-white border border-gray-100 shadow-lg rounded-xl hover:scale-105">
            <div className="text-lg font-semibold text-gray-600">Total Reports</div>
            <div className="text-4xl font-bold text-indigo-600">{reports.length}</div>
          </div>
          <div className="p-6 transition-all duration-300 transform bg-white border border-gray-100 shadow-lg rounded-xl hover:scale-105">
            <div className="text-lg font-semibold text-gray-600">Resolved</div>
            <div className="text-4xl font-bold text-green-600">
              {reports.filter(r => r.status === 'Resolved').length}
            </div>
          </div>
          <div className="p-6 transition-all duration-300 transform bg-white border border-gray-100 shadow-lg rounded-xl hover:scale-105">
            <div className="text-lg font-semibold text-gray-600">Pending</div>
            <div className="text-4xl font-bold text-amber-600">
              {reports.filter(r => r.status !== 'Resolved').length}
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-lg rounded-xl animate-slideUp">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-16 h-16 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : reports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Victim Name
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Abuse Type
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report, index) => (
                    <tr 
                      key={report._id} 
                      className="transform hover:scale-[1.01] hover:bg-gray-50 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{report.victimName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{report.abuseType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{report.incidentLocation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300
                          ${report.status === 'Resolved'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : report.status === 'Under Investigation'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(report.incidentDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleViewReport(report._id)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-all duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-105"
                          >
                            View Details
                          </button>
                          <span className={`text-xs ${
                            report.seen 
                              ? 'text-green-600 animate-pulse' 
                              : 'text-gray-500'
                          }`}>
                            {report.seen ? '✓ Seen by Authority' : 'Pending Review'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="mb-4 text-6xl animate-bounce">📊</div>
              <h3 className="mb-1 text-xl font-medium text-gray-900">No Reports Found</h3>
              <p className="text-gray-500">You haven't submitted any reports yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReports;
