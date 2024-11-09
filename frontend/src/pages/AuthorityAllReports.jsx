import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthorityAllReports = ({ user }) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const navigate = useNavigate();

  const getAllReports = async () => {
    setIsLoading(true);
    setError(null);
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
      console.error('Error fetching reports:', error);
      setError('Failed to fetch reports. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAllReports();
    }
  }, [user]);

  const handleViewReport = (reportId) => {
    navigate(`/authority/report/${reportId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReports = reports.filter(report =>
    report.victimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.abuseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.incidentLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedReports = useMemo(() => {
    let sortableReports = [...filteredReports];
    if (sortConfig.key !== null) {
      sortableReports.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableReports;
  }, [filteredReports, sortConfig]);

  const reportSummary = useMemo(() => {
    const totalReports = reports.length;
    const pendingReports = reports.filter(report => report.status !== 'Resolved').length;
    const resolvedReports = totalReports - pendingReports;
    return { totalReports, pendingReports, resolvedReports };
  }, [reports]);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative max-w-6xl p-6 px-4 py-3 mx-auto mt-10 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto mt-10 rounded-lg shadow-lg max-w-7xl bg-gradient-to-r from-blue-50 to-indigo-50">
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">Authority Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-2 text-2xl font-semibold text-blue-600">Total Reports</h2>
          <p className="text-4xl font-bold text-gray-800">{reportSummary.totalReports}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-2 text-2xl font-semibold text-yellow-600">Pending Reports</h2>
          <p className="text-4xl font-bold text-gray-800">{reportSummary.pendingReports}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-2 text-2xl font-semibold text-green-600">Resolved Reports</h2>
          <p className="text-4xl font-bold text-gray-800">{reportSummary.resolvedReports}</p>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search reports..."
          className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="sticky top-0 px-6 py-3 text-xs font-bold tracking-wider text-gray-600 uppercase border-b border-gray-200">
                  Name 
                  <button onClick={() => handleSort('victimName')} className="ml-2 focus:outline-none">
                    <SortIcon column="victimName" />
                  </button>
                </th>
                <th className="sticky top-0 px-6 py-3 text-xs font-bold tracking-wider text-gray-600 uppercase border-b border-gray-200">
                  Abuse Type
                  <button onClick={() => handleSort('abuseType')} className="ml-2 focus:outline-none">
                    <SortIcon column="abuseType" />
                  </button>
                </th>
                <th className="sticky top-0 px-6 py-3 text-xs font-bold tracking-wider text-gray-600 uppercase border-b border-gray-200">
                  Incident Date
                  <button onClick={() => handleSort('incidentDate')} className="ml-2 focus:outline-none">
                    <SortIcon column="incidentDate" />
                  </button>
                </th>
                <th className="sticky top-0 px-6 py-3 text-xs font-bold tracking-wider text-gray-600 uppercase border-b border-gray-200">
                  Location
                  <button onClick={() => handleSort('incidentLocation')} className="ml-2 focus:outline-none">
                    <SortIcon column="incidentLocation" />
                  </button>
                </th>
                <th className="sticky top-0 px-6 py-3 text-xs font-bold tracking-wider text-gray-600 uppercase border-b border-gray-200">
                  Status
                  <button onClick={() => handleSort('status')} className="ml-2 focus:outline-none">
                    <SortIcon column="status" />
                  </button>
                </th>
                <th className="sticky top-0 px-6 py-3 text-xs font-bold tracking-wider text-gray-600 uppercase border-b border-gray-200">
                  Created At
                  <button onClick={() => handleSort('createdAt')} className="ml-2 focus:outline-none">
                    <SortIcon column="createdAt" />
                  </button>
                </th>
                <th className="sticky top-0 px-6 py-3 text-xs font-bold tracking-wider text-gray-600 uppercase border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedReports.length > 0 ? (
                sortedReports.map((report) => (
                  <tr key={report._id} className="transition duration-150 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{report.victimName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{report.abuseType}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(report.incidentDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{report.incidentLocation}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'Resolved'
                            ? 'bg-green-100 text-green-800'
                            : report.status === 'Under Investigation'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleViewReport(report._id)}
                        className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        View
                      </button>
                      <div className={`mt-2 text-xs font-medium ${report.seen ? 'text-green-600' : 'text-red-600'}`}>
                        {report.seen ? "Seen" : "Not Seen"}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuthorityAllReports;