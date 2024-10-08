import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AuthorityAllReports = () => {
  const [reports, setReports] = useState([]);

  // Fetch all reports when the component mounts
  useEffect(() => {
    // Simulate fetching data with dummy reports
    const dummyReports = [
      {
        id: 1,
        name: 'John Doe',
        abuseType: 'Physical Abuse',
        incidentDate: '2024-09-21',
        incidentLocation: 'Public Park',
        status: 'Under Investigation',
        createdAt: '2024-09-23 10:30 AM',
      },
      {
        id: 2,
        name: 'Jane Smith',
        abuseType: 'Verbal Abuse',
        incidentDate: '2024-09-15',
        incidentLocation: 'Office',
        status: 'Resolved',
        createdAt: '2024-09-15 02:15 PM',
      },
      {
        id: 3,
        name: 'Alice Johnson',
        abuseType: 'Cyberbullying',
        incidentDate: '2024-09-18',
        incidentLocation: 'Social Media',
        status: 'Pending',
        createdAt: '2024-09-18 05:45 PM',
      },
      {
        id: 4,
        name: 'Michael Brown',
        abuseType: 'Emotional Abuse',
        incidentDate: '2024-09-19',
        incidentLocation: 'School',
        status: 'Under Investigation',
        createdAt: '2024-09-19 08:30 AM',
      },
    ];

    // Setting the dummy data into state
    setReports(dummyReports);
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id} className="border-b" >
                  <td className="px-4 py-2">{report.name}</td>
                  <td className="px-4 py-2">{report.abuseType}</td>
                  <td className="px-4 py-2">{report.incidentDate}</td>
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
                  <td className="px-4 py-2">{report.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
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
